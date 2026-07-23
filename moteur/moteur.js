/* =====================================================================
   inerWeb Pilote — MOTEUR générique (vanilla JS, autonome / hors-ligne)
   Lit window.PILOTE_PACK et applique le MODE actif (matrice §3 du CDC).
   Options : window.PILOTE_MODE (mode forcé) · window.PILOTE_CONFIG.scoring_url
   Ne connaît ni le froid ni Fallout : tout le contenu vient du pack.
   ===================================================================== */
(function () {
  "use strict";
  var PACK = window.PILOTE_PACK;
  var CONFIG = window.PILOTE_CONFIG || {};
  if (!PACK) { document.body.innerHTML = "<p style='padding:24px'>Aucun pack chargé.</p>"; return; }

  /* --- Matrice de visibilité par mode (cf. cahier des charges) --- */
  var MODES = {
    auto:       { nom: "Auto-apprentissage", pilote:false, feedback:true,  remediation:true,  notation:false },
    pilotage:   { nom: "Pilotage formateur", pilote:true,  feedback:true,  remediation:false, notation:true  },
    test:       { nom: "Test blanc",         pilote:false, feedback:true,  remediation:true,  notation:false },
    evaluation: { nom: "Évaluation",         pilote:false, feedback:false, remediation:false, notation:true  }
  };
  var MDP_FORMATEUR = "prof"; // MVP — vraie protection = build élève séparé + scoring serveur

  /* --- Index --- */
  var idxCartes = {}; PACK.cartes.forEach(function (c) { idxCartes[c.id] = c; });
  var idxRes = {}; (PACK.ressources || []).forEach(function (r) { idxRes[r.id] = r; });
  var BANQUE = PACK.banque || [];

  /* --- État de session --- */
  var forced = window.PILOTE_MODE && MODES[window.PILOTE_MODE] ? window.PILOTE_MODE : null;
  var S = {
    modeId: forced || (new URLSearchParams(location.search).get("mode")) || "auto",
    verrouMode: !!forced,            // formateur.html verrouille le mode
    carteId: PACK.pack.carte_initiale,
    historique: [], criteres: {}, reponses: {},
    examen: null,                    // état d'un examen blanc en cours
    debut: nowSec(), chrono: null
  };
  if (!MODES[S.modeId]) S.modeId = "auto";

  var app = document.getElementById("app");
  render();

  /* ====================================================================
     RENDU
     ==================================================================== */
  function render() {
    var m = MODES[S.modeId];
    var c = idxCartes[S.carteId];
    if (!c) { app.innerHTML = "<p style='padding:24px'>Carte introuvable.</p>"; return; }
    if (c.examen) return renderExamen(c, m);
    if (c.type === "accueil" || c.type === "menu") return renderAccueil(c, m);

    var html = barre(m) + fil() + "<div class='scene'><div class='carte'>";
    if (c.illus) html += img(c.illus);
    html += "<div class='corps'>";
    if (c.dc) html += "<span class='dc'>" + esc(c.dc) + "</span>";
    html += "<h1>" + esc(c.titre) + "</h1>";
    if (c.corps) html += c.corps;
    (c.blocs || []).forEach(function (b) {
      html += "<div class='bloc " + (b.type || "") + "'><div class='t'>" + esc(b.t || "") + "</div>" + (b.html || "") + "</div>";
    });
    if (c.question) html += zoneQuestion(c.question, S.reponses[c.id], m, "rep");
    if (m.notation && c.criteres && c.criteres.length) html += zoneCriteres(c);
    if (m.pilote && c.notes_pilote) html += "<div class='pilote'><div class='t'>👁 NOTE PILOTE (formateur)</div>" + esc(c.notes_pilote) + "</div>";
    if (c.ressources && c.ressources.length) { html += "<div class='ressources'>"; c.ressources.forEach(function (rid) { html += lienRes(idxRes[rid]); }); html += "</div>"; }
    html += zoneLiens(c);
    html += "</div></div></div>" + pied(c) + voiles();

    app.innerHTML = html;
    brancher(c, m);
    lancerChrono(c);
    if (S.historique[S.historique.length - 1] !== c.id) S.historique.push(c.id);
  }

  /* ---- Page d'ACCUEIL / MENU (portail à tuiles) ---- */
  function renderAccueil(c, m) {
    var h = barre(m) + "<div class='accueil'>";
    h += "<div class='hero'>";
    if (c.illus) h += img(c.illus);
    h += "<div class='cap'><h1>" + esc(c.titre === "Accueil" ? PACK.pack.titre : c.titre) + "</h1>" + (c.corps || "") + "</div></div>";
    h += "<div class='sct'>" + esc(c.menu_titre || "Choisir une partie") + "</div><div class='tuiles'>";
    (c.liens || []).forEach(function (l) {
      if (!conditionVraie(l.condition)) return;
      var t = esc(l.titre || l.libelle), d = l.desc ? "<p>" + esc(l.desc) + "</p>" : "", ic = l.icone ? "<span class='ic'>" + esc(l.icone) + "</span>" : "";
      if (l.primaire) h += "<div class='tuile primaire' role='button' tabindex='0' data-go='" + l.vers + "'>" + ic + "<span class='txt'><h3>" + t + "</h3>" + d + "</span><span class='go'>Commencer ▸</span></div>";
      else h += "<div class='tuile' role='button' tabindex='0' data-go='" + l.vers + "'>" + ic + "<h3>" + t + "</h3>" + d + "<span class='go'>Ouvrir ▸</span></div>";
    });
    h += "</div>";
    if (m.pilote && c.notes_pilote) h += "<div class='pilote' style='margin-top:18px'><div class='t'>👁 NOTE PILOTE</div>" + esc(c.notes_pilote) + "</div>";
    var globs = (PACK.ressources || []).filter(function (r) { return r.global; });
    if (globs.length) { h += "<div class='sct'>Ressources utiles</div><div class='ressources'>"; globs.forEach(function (r) { h += lienRes(r); }); h += "</div>"; }
    h += "</div>" + pied({}) + voiles();
    app.innerHTML = h; nav(); commun();
    if (S.historique[S.historique.length - 1] !== c.id) S.historique.push(c.id);
  }

  /* ---- Carte EXAMEN BLANC (séquence de questions tirées de la banque) ---- */
  function renderExamen(c, m) {
    if (!S.examen || S.examen.carteId !== c.id) initExamen(c);
    var ex = S.examen;
    var html = barre(m) + fil() + "<div class='scene'><div class='carte'><div class='corps'>";
    html += "<span class='dc'>" + esc(c.dc || "Examen blanc") + "</span>";
    html += "<h1>" + esc(c.titre) + "</h1>";

    if (!ex.fini) {
      var q = ex.items[ex.i];
      var rep = ex.rep[ex.i];
      html += "<p style='color:var(--mut)'>Question " + (ex.i + 1) + " / " + ex.items.length + "</p>";
      html += zoneQuestion(q, rep, m, "exr");
      if (rep) {
        var dernier = (ex.i === ex.items.length - 1);
        html += "<div class='liens'><button id='ex-next'>" + (dernier ? "Voir mon résultat ▸" : "Question suivante ▸") + "</button></div>";
      }
    } else {
      html += renderResultat(c, ex, m);
    }
    html += "</div></div></div>" + pied({}) + voiles();
    app.innerHTML = html;
    brancherExamen(c, m);
  }

  function initExamen(c) {
    var pool = BANQUE.filter(function (q) { return (c.examen.dc || []).indexOf(q.dc) >= 0; });
    melange(pool);
    var n = Math.min(c.examen.n || 6, pool.length);
    S.examen = { carteId: c.id, items: pool.slice(0, n), i: 0, rep: [], fini: false, score: null };
  }

  function renderResultat(c, ex, m) {
    var bons = 0; ex.rep.forEach(function (r, i) { if (r && r.choix === ex.items[i].bonne) bons++; });
    var sur = ex.items.length;
    var pct = Math.round(100 * bons / sur);
    var seuil = c.examen.seuil || 70;
    var reussi = pct >= seuil;
    var h = "<div id='ex-result'>";
    if (m.feedback) {
      h += "<div class='retour " + (reussi ? "ok" : "ko") + "'><b>Score : " + bons + " / " + sur + " (" + pct + "%)</b> — seuil " + seuil + "%. " + (reussi ? "Réussi ✅" : "À retravailler.") + "</div>";
    } else {
      // évaluation : on n'affiche pas le détail des bonnes réponses
      h += "<div class='retour ok'>Examen terminé. Tes réponses sont enregistrées.</div>";
      if (CONFIG.scoring_url) h += "<div id='srv' style='margin-top:10px;color:var(--mut);font-size:13px'>Correction côté serveur…</div>";
    }
    h += "<div class='liens'><button data-go='c00' class='sec'>↺ Retour au sommaire</button>" +
         "<button id='ex-trace'>⬇ Exporter ma trace</button></div></div>";
    ex.score = { bons: bons, sur: sur, pct: pct, reussi: reussi };
    return h;
  }

  /* ====================================================================
     COMPOSANTS
     ==================================================================== */
  function barre(m) {
    return "<div class='barre'><span class='logo'>inerWeb <b>Pilote</b></span>" +
      "<span class='pack-titre'>" + esc(PACK.pack.titre) + "</span><span class='spacer'></span>" +
      "<button class='mode-tag' id='btn-mode'" + (S.verrouMode ? " disabled title='mode verrouillé'" : "") + ">Mode : " + esc(m.nom) + (S.verrouMode ? " 🔒" : " ▾") + "</button></div>";
  }
  function fil() {
    if (!S.historique.length) return "<div class='fil'>Début du parcours</div>";
    var h = "<div class='fil'>";
    S.historique.slice(-5).forEach(function (id, i) {
      var c = idxCartes[id]; if (i) h += "<span class='sep'>›</span>";
      h += "<a data-go='" + id + "'>" + esc(c ? c.titre : id) + "</a>";
    });
    return h + "</div>";
  }
  function zoneQuestion(q, rep, m, ns) {
    var h = "<div class='question'><div class='enonce'>❓ " + esc(q.enonce) + "</div><div class='choix'>";
    q.choix.forEach(function (txt, i) {
      var cls = "";
      if (rep && m.feedback) { if (i === q.bonne) cls = "bon"; else if (i === rep.choix) cls = "mauvais"; }
      h += "<button class='" + cls + "' " + (rep ? "disabled" : "") + " data-" + ns + "='" + i + "'>" + esc(txt) + "</button>";
    });
    h += "</div>";
    if (rep) {
      if (m.feedback) {
        var ok = rep.choix === q.bonne;
        h += "<div class='retour " + (ok ? "ok" : "ko") + "'>" + (ok ? "✅ Bonne réponse. " : "❌ Réponse incorrecte. ") + esc(q.explication || "") + "</div>";
        if (!ok && m.remediation && q.remediation_vers) h += "<div class='liens'><button class='sec' data-go='" + q.remediation_vers + "'>↩ Revoir la fiche</button></div>";
      } else {
        h += "<div class='retour ok'>Réponse enregistrée.</div>";
      }
    }
    return h + "</div>";
  }
  function zoneCriteres(c) {
    var h = "<div class='criteres'><div style='font-weight:700;color:var(--bleu);margin-bottom:6px'>Critères à positionner</div>";
    c.criteres.forEach(function (cr) {
      var etat = S.criteres[cr.code] || cr.etat || "a_evaluer";
      h += "<div class='crit'><span class='code'>" + esc(cr.code) + "</span><span class='lib'>" + esc(cr.libelle) + "</span><span class='etats'>" +
        btnEtat(cr.code, "acquis", "Acquis", etat) + btnEtat(cr.code, "cours", "En cours", etat) + btnEtat(cr.code, "non", "Non acquis", etat) + "</span></div>";
    });
    return h + "</div>";
  }
  function btnEtat(code, val, lib, etat) {
    var sel = (etat === val) ? "sel " + (val === "acquis" ? "acquis" : val === "non" ? "non" : "cours") : "";
    return "<button class='" + sel + "' data-crit='" + code + "' data-etat='" + val + "'>" + lib + "</button>";
  }
  function zoneLiens(c) {
    var liens = (c.liens || []).filter(function (l) { return conditionVraie(l.condition); });
    if (!liens.length) return "";
    var h = "<div class='liens'>";
    liens.forEach(function (l) { h += "<button class='" + (l.sec ? "sec" : "") + "' data-go='" + l.vers + "'>" + esc(l.libelle) + "</button>"; });
    return h + "</div>";
  }
  function pied(c) {
    var h = "<div class='pied'>";
    h += "<span class='chrono' id='chrono'>" + (c && c.minuteur_s ? "⏱ " + fmt(c.minuteur_s) : "") + "</span><span class='spacer'></span>";
    if (S.historique.length > 1) h += "<button id='btn-retour'>◂ Retour</button>";
    h += "<button class='docs-btn' id='btn-docs'>📂 Mes documents</button><button id='btn-secours'>Accès direct</button><button id='btn-trace'>⬇ Exporter ma trace</button></div>";
    return h;
  }
  function voiles() { return "<div class='voile' id='voile'><div class='modale'><button class='x' id='voile-x'>✕</button><div id='voile-contenu'></div></div></div>"; }
  function img(src) { return "<img class='illus' alt='' src='" + (PACK.pack.base_img || "") + src + "'>"; }

  /* ====================================================================
     INTERACTIONS
     ==================================================================== */
  function brancher(c, m) {
    nav();
    onAll("[data-rep]", function (el) { el.addEventListener("click", function () { repondre(c, +el.getAttribute("data-rep")); }); });
    onAll("[data-crit]", function (el) { el.addEventListener("click", function () { S.criteres[el.getAttribute("data-crit")] = el.getAttribute("data-etat"); render(); }); });
    commun();
  }
  function brancherExamen(c, m) {
    nav();
    onAll("[data-exr]", function (el) { el.addEventListener("click", function () { repondreExamen(+el.getAttribute("data-exr")); }); });
    var nx = document.getElementById("ex-next"); if (nx) nx.onclick = function () {
      if (S.examen.i >= S.examen.items.length - 1) S.examen.fini = true; else S.examen.i++; render(); };
    var tr = document.getElementById("ex-trace"); if (tr) tr.onclick = exporterTrace;
    if (S.examen && S.examen.fini && !MODES[S.modeId].feedback && CONFIG.scoring_url) soumettreServeur(c);
    commun();
  }
  function nav() { onAll("[data-go]", function (el) { el.addEventListener("click", function () { aller(el.getAttribute("data-go")); }); }); }
  function commun() {
    var b;
    if ((b = document.getElementById("btn-mode")) && !S.verrouMode) b.onclick = menuMode;
    if ((b = document.getElementById("btn-retour"))) b.onclick = retour;
    if ((b = document.getElementById("btn-docs"))) b.onclick = ouvrirDocs;
    if ((b = document.getElementById("btn-secours"))) b.onclick = ouvrirSecours;
    if ((b = document.getElementById("btn-trace"))) b.onclick = exporterTrace;
    if ((b = document.getElementById("voile-x"))) b.onclick = fermerVoile;
    var v = document.getElementById("voile"); if (v) v.addEventListener("click", function (e) { if (e.target.id === "voile") fermerVoile(); });
  }
  function onAll(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }

  function aller(id) { if (idxCartes[id]) { S.carteId = id; if (!idxCartes[id].examen) S.examen = null; window.scrollTo(0, 0); render(); } }
  function retour() { if (S.historique.length > 1) { S.historique.pop(); S.carteId = S.historique.pop(); S.examen = null; window.scrollTo(0, 0); render(); } }
  function repondre(c, choix) { if (S.reponses[c.id]) return; S.reponses[c.id] = { choix: choix, bonne: choix === c.question.bonne }; render(); }
  function repondreExamen(choix) {
    var ex = S.examen; if (ex.rep[ex.i]) return;
    ex.rep[ex.i] = { choix: choix };
    if (!MODES[S.modeId].feedback && ex.i >= ex.items.length - 1) ex.fini = true;
    render();
  }

  function menuMode() {
    var liste = (PACK.pack.modes_actifs || Object.keys(MODES));
    var h = "<h3>Choisir le mode</h3><div class='liens'>";
    liste.forEach(function (id) { if (MODES[id]) h += "<button data-mode='" + id + "'>" + esc(MODES[id].nom) + (id === "pilotage" ? " 🔒" : "") + "</button>"; });
    h += "</div><p style='color:var(--mut);font-size:13px;margin-top:10px'>Le mode <b>Pilotage formateur</b> affiche la couche pilote : réservé au formateur.</p>";
    ouvrirVoile(h);
    onAll("[data-mode]", function (el) { el.addEventListener("click", function () {
      var id = el.getAttribute("data-mode");
      if (id === "pilotage" && prompt("Mot de passe formateur :") !== MDP_FORMATEUR) { alert("Mot de passe incorrect."); return; }
      S.modeId = id; S.examen = null; fermerVoile(); window.scrollTo(0, 0); render();
    }); });
  }

  function ouvrirDocs() {
    var globs = (PACK.ressources || []).filter(function (r) { return r.global; });
    var carte = idxCartes[S.carteId];
    var loc = ((carte && carte.ressources) || []).map(function (id) { return idxRes[id]; }).filter(Boolean);
    var h = "<h3>📂 Mes documents</h3>";
    if (loc.length) { h += "<p style='color:var(--mut);font-size:13px'>Liés à cette étape</p><div class='ressources'>"; loc.forEach(function (r) { h += lienRes(r); }); h += "</div>"; }
    h += "<p style='color:var(--mut);font-size:13px;margin-top:12px'>Toujours accessibles</p><div class='ressources'>";
    globs.forEach(function (r) { h += lienRes(r); }); h += "</div>";
    ouvrirVoile(h);
  }
  function ouvrirSecours() {
    var h = "<h3>Accès direct</h3><div class='liens'>";
    PACK.cartes.forEach(function (c) { h += "<button class='sec' data-go2='" + c.id + "'>" + esc(c.titre) + "</button>"; });
    ouvrirVoile(h + "</div>");
    onAll("[data-go2]", function (el) { el.addEventListener("click", function () { fermerVoile(); aller(el.getAttribute("data-go2")); }); });
  }
  function lienRes(r) { if (!r) return ""; return "<a href='" + (r.url || r.src || "#") + "' target='_blank' rel='noopener'>" + esc(r.titre) + "</a>"; }
  function ouvrirVoile(h) { document.getElementById("voile-contenu").innerHTML = h; document.getElementById("voile").classList.add("on"); }
  function fermerVoile() { var v = document.getElementById("voile"); if (v) v.classList.remove("on"); }

  /* --- Trace --- */
  function traceObj() {
    return { pack: PACK.pack.id, version: PACK.pack.version, mode: S.modeId,
      debut: S.debut, fin: nowSec(), duree_s: nowSec() - S.debut,
      cartes_vues: S.historique.slice(), reponses: S.reponses, criteres: S.criteres,
      examen: S.examen ? { carte: S.examen.carteId, score: S.examen.score } : null };
  }
  function exporterTrace() {
    var blob = new Blob([JSON.stringify(traceObj(), null, 2)], { type: "application/json" });
    var a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "trace_" + PACK.pack.id + ".json"; document.body.appendChild(a); a.click(); a.remove();
  }

  /* --- Scoring serveur (phase 2 : correction côté serveur, corrigé jamais livré) --- */
  function soumettreServeur(c) {
    var ex = S.examen;
    var payload = { pack: PACK.pack.id, exam: c.id, mode: S.modeId,
      reponses: ex.items.map(function (q, i) { return { qid: q.id, choix: ex.rep[i] ? ex.rep[i].choix : null }; }) };
    fetch(CONFIG.scoring_url, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        var el = document.getElementById("srv");
        if (el) el.innerHTML = "<b style='color:var(--bleu)'>Résultat officiel : " + res.score + " / " + res.sur + " (" + res.pct + "%)</b>";
        ex.score = res;
      })
      .catch(function () { var el = document.getElementById("srv"); if (el) el.textContent = "Serveur de correction indisponible (score non officiel)."; });
  }

  /* --- Minuteur --- */
  function lancerChrono(c) {
    if (S.chrono) { clearInterval(S.chrono); S.chrono = null; }
    if (!c.minuteur_s) return;
    var reste = c.minuteur_s, el = document.getElementById("chrono");
    S.chrono = setInterval(function () { reste--; if (!el) return;
      el.textContent = "⏱ " + fmt(Math.max(0, reste));
      if (reste <= 0) { clearInterval(S.chrono); S.chrono = null; el.textContent = "⏱ temps indicatif écoulé"; } }, 1000);
  }

  /* --- utilitaires --- */
  function conditionVraie(cond) { if (!cond) return true; var m = /^critere:([\w.]+)=(\w+)$/.exec(cond); if (!m) return true; return (S.criteres[m[1]] || "") === m[2]; }
  function melange(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } }
  function nowSec() { return Math.floor(Date.now() / 1000); }
  function fmt(s) { var m = Math.floor(s / 60), r = s % 60; return m + ":" + (r < 10 ? "0" : "") + r; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]; }); }
})();
