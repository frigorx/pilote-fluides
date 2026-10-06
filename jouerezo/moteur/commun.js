/* =====================================================================
   commun.js — le socle des jeux de JouéRézo
   ---------------------------------------------------------------------
   RÔLE : tout ce qu'un jeu partage — barre du haut, choix du thème,
   mélange, tirage, sons synthétisés, code de partie, panneau de fin,
   chargement des banques de questions déjà en ligne (HoCourant, R408).
   ENTRÉES : window.JR_JEUX et window.JR_THEMES (donnees/themes.js),
   le paramètre ?t=<thème> de l'adresse.
   SORTIE : window.JR. Un jeu appelle JR.lancer("memory", demarrer) ;
   demarrer(theme, main) reçoit l'objet thème et l'élément <main>.
   PIÈGES : (1) les banques externes déclarent `const QUESTIONS` : on les
   évalue dans une Function, jamais par <script> (collision). (2) Le code
   de partie est un contrôle d'intégrité léger, pas une preuve.
   (3) Aucune dépendance : fonctionne hors ligne une fois la page chargée.
   ===================================================================== */
(function () {
  "use strict";
  const JR = {};
  window.JR = JR;

  /* ---------- utilitaires ---------- */
  JR.esc = function (s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  };
  JR.melanger = function (tab) {
    const t = tab.slice();
    for (let i = t.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [t[i], t[j]] = [t[j], t[i]]; }
    return t;
  };
  JR.tirer = function (tab, n) { return JR.melanger(tab).slice(0, n); };
  JR.param = function (nom) { return new URLSearchParams(location.search).get(nom); };
  JR.el = function (html) { const d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstElementChild; };
  JR.img = function (id, alt) {
    return '<img src="../symboles/svg/' + JR.esc(id) + '.svg" alt="' + JR.esc(alt || "") + '" loading="lazy">';
  };

  /* ---------- sons : trois formes d'onde, aucun fichier ---------- */
  const CLE_SONS = "jouerezo_sons";
  let ctx = null;
  function actif() { try { return localStorage.getItem(CLE_SONS) !== "non"; } catch (e) { return true; } }
  function note(freq, debut, duree, type, gain) {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; } }
    if (ctx.state === "suspended") ctx.resume();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || "sine"; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, ctx.currentTime + debut);
    g.gain.exponentialRampToValueAtTime(gain || 0.18, ctx.currentTime + debut + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + debut + duree);
    o.connect(g).connect(ctx.destination);
    o.start(ctx.currentTime + debut); o.stop(ctx.currentTime + debut + duree + 0.02);
  }
  JR.sons = {
    tap: () => actif() && note(880, 0, 0.05, "square", 0.05),
    ok: () => actif() && (note(660, 0, 0.12), note(990, 0.1, 0.16)),
    nok: () => actif() && note(160, 0, 0.3, "sawtooth", 0.12),
    fin: () => actif() && [523, 659, 784, 1047].forEach((f, i) => note(f, i * 0.12, 0.25)),
    basculer: function () {
      const v = actif() ? "non" : "oui";
      try { localStorage.setItem(CLE_SONS, v); } catch (e) { /* stockage indisponible : réglage de session seulement */ }
      JR.sons.rafraichir();
      if (v === "oui") JR.sons.ok();
    },
    rafraichir: function () {
      const b = document.querySelector(".bouton-son");
      if (!b) return;
      const on = actif();
      b.textContent = on ? "🔊" : "🔇";
      b.setAttribute("aria-label", on ? "Couper les sons" : "Remettre les sons");
      b.title = b.getAttribute("aria-label");
    }
  };

  /* ---------- code de partie (alphabet sans O/0 ni I/L/1, comme HoCourant) ---------- */
  const ALPHA = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  function condense(texte) {
    let h = 5381;
    for (let i = 0; i < texte.length; i++) h = ((h * 33) ^ texte.charCodeAt(i)) >>> 0;
    let s = "", n = h % (ALPHA.length ** 3);
    do { s = ALPHA[n % ALPHA.length] + s; n = Math.floor(n / ALPHA.length); } while (n > 0);
    return s.padStart(3, ALPHA[0]);
  }
  JR.code = function (jeu, theme, score, total) {
    const lettre = (window.JR_JEUX[jeu] || {}).lettre || jeu[0].toUpperCase();
    const corps = lettre + "-" + theme + "-" + score + "/" + total;
    return "JR-" + corps + "-" + condense(corps);
  };

  /* ---------- barre du haut ---------- */
  JR.enTete = function (titre, sousTitre) {
    const h = document.getElementById("haut");
    if (!h) return;
    h.className = "haut";
    h.innerHTML =
      '<a href="../">← inerweb.fr</a>' +
      '<a class="marque" href="./">Joué<span>Rézo</span></a>' +
      (titre ? '<span class="sr">·</span><span>' + JR.esc(titre) + (sousTitre ? ' · ' + JR.esc(sousTitre) : "") + '</span>' : "") +
      '<div class="droite"><button type="button" class="bouton-son"></button></div>';
    h.querySelector(".bouton-son").addEventListener("click", JR.sons.basculer);
    JR.sons.rafraichir();
  };

  /* ---------- lancement d'un jeu ---------- */
  JR.lancer = function (jeu, demarrer) {
    const meta = window.JR_JEUX[jeu];
    const themes = window.JR_THEMES[jeu] || [];
    const main = document.getElementById("jeu");
    const id = JR.param("t");
    const theme = themes.find(t => t.id === id);
    document.title = meta.nom + (theme ? " — " + theme.nom : "") + " — JouéRézo inerWeb";
    if (!theme) {
      JR.enTete(meta.nom);
      main.innerHTML =
        '<h1>' + JR.esc(meta.emoji + " " + meta.nom) + '</h1>' +
        '<p class="chapo">' + JR.esc(meta.regle) + '</p>' +
        '<h2>Choisissez un thème</h2>' +
        '<div class="choix-theme">' +
        themes.map(t => '<a class="theme-carte" href="?t=' + JR.esc(t.id) + '">' + JR.esc(t.emoji + " " + t.nom) + '</a>').join("") +
        '</div>';
      return;
    }
    JR.enTete(meta.nom, theme.nom);
    main.innerHTML = "";
    JR.jeuCourant = jeu; JR.themeCourant = theme;
    demarrer(theme, main);
  };

  /* ---------- panneau de fin ---------- */
  JR.fin = function (o) {
    const jeu = o.jeu || JR.jeuCourant, theme = o.theme || JR.themeCourant;
    const ratio = o.total ? o.score / o.total : 1;
    const mot = ratio >= 0.9 ? "Sans faute, ou presque : c'est acquis." :
      ratio >= 0.6 ? "C'est en place, encore une partie et c'est solide." :
      "Allez revoir la station, puis rejouez : la deuxième partie est toujours meilleure.";
    const code = JR.code(jeu, theme.id, o.score, o.total);
    let record = null;
    try {
      const cle = "jouerezo_record_" + jeu + "_" + theme.id;
      const ancien = Number(localStorage.getItem(cle) || -1);
      record = ancien;
      if (o.score > ancien) { localStorage.setItem(cle, String(o.score)); record = o.score; }
    } catch (e) { /* pas de stockage : pas de record */ }
    const portes = (theme.portes || []).map(p => '<li><a href="' + JR.esc(p.h) + '">' + JR.esc(p.t) + '</a></li>').join("");
    const panneau = JR.el(
      '<section class="carte fin" aria-live="polite">' +
      '<h2>Partie terminée</h2>' +
      '<p class="score">' + JR.esc(o.score + " / " + o.total) + (o.unite ? " " + JR.esc(o.unite) : "") + '</p>' +
      (o.texte ? '<p>' + JR.esc(o.texte) + '</p>' : "") +
      '<p>' + JR.esc(mot) + '</p>' +
      (record !== null && record > o.score ? '<p class="legende">Votre meilleur score sur cet appareil : ' + record + '.</p>' : "") +
      '<p>Code de partie à donner à votre enseignant : <span class="code">' + code + '</span></p>' +
      (portes ? '<h3>Pour revoir avant de rejouer</h3><ul class="portes">' + portes + '</ul>' : "") +
      '<div class="actions"><button type="button" class="btn rejouer">Rejouer</button>' +
      '<a class="btn sec" href="./' + JR.esc(jeu) + '.html">Autre thème</a>' +
      '<a class="btn sec" href="./">Tous les jeux</a></div>' +
      '</section>');
    panneau.querySelector(".rejouer").addEventListener("click", function () { JR.sons.tap(); o.rejouer(); });
    const main = document.getElementById("jeu");
    main.innerHTML = "";
    main.appendChild(panneau);
    JR.sons.fin();
    panneau.querySelector("h2").setAttribute("tabindex", "-1");
    panneau.querySelector("h2").focus();
  };

  /* ---------- banques de questions ---------- */
  const cache = {};
  function normaliser(q) {
    return { q: q.q, ok: q.ok, nok: (q.nok || []).slice(0, 2), exp: q.exp || "" };
  }
  JR.chargerQuestions = function (theme) {
    const sources = theme.sources || [];
    const locales = (theme.questions || []).map(normaliser);
    return Promise.all(sources.map(function (url) {
      if (cache[url]) return cache[url];
      cache[url] = fetch(url, { cache: "no-cache" })
        .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
        .then(txt => new Function(txt + "\n;return QUESTIONS;")())
        .then(tab => tab.filter(q => q && q.q && q.ok && q.nok && q.nok.length).map(normaliser))
        .catch(() => []);
      return cache[url];
    })).then(listes => locales.concat.apply(locales, listes));
  };

  /* ---------- accueil du réseau ---------- */
  JR.accueil = function () {
    const zone = document.getElementById("liste-jeux");
    if (!zone) return;
    zone.innerHTML = Object.keys(window.JR_JEUX).filter(id => !window.JR_JEUX[id].station).map(function (id) {
      const m = window.JR_JEUX[id], lien = m.lien || id + '.html';
      const themes = (window.JR_THEMES[id] || []).map(t =>
        '<li><a href="' + id + '.html?t=' + JR.esc(t.id) + '">' + JR.esc(t.emoji + " " + t.nom) + '</a></li>').join("");
      return '<section class="carte jeu" aria-labelledby="j-' + id + '">' +
        '<div class="entete"><img src="illustrations/' + id + '.svg" alt="" width="64" height="64">' +
        '<div><h2 id="j-' + id + '"><a href="' + lien + '">' + JR.esc(m.nom) + '</a></h2><p class="phrase">' + JR.esc(m.phrase) + '</p></div></div>' +
        '<ul class="themes">' + themes + '</ul></section>';
    }).join("");
  };

  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("liste-jeux")) { JR.enTete(); JR.accueil(); }
    /* Le filigrane (../moteur/marque.js) choisit « fixe » ou « en flux » en
       mesurant la page au chargement, puis seulement sur `resize`. Un jeu
       change de hauteur à chaque écran : on lui signale chaque changement
       pour qu'il ne recouvre jamais le panneau de fin. */
    const zone = document.getElementById("jeu");
    if (zone && window.MutationObserver) {
      let minuteur = null;
      new MutationObserver(function () {
        clearTimeout(minuteur);
        minuteur = setTimeout(function () { window.dispatchEvent(new Event("resize")); }, 200);
      }).observe(zone, { childList: true, subtree: true });
    }
  });
})();
