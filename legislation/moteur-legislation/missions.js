/* =====================================================================
   missions.js — la couche « carnet du chargé d'affaires » d'une station
   ---------------------------------------------------------------------
   Chargé en relatif par chaque station qui a un mission.json (posé par
   outils/poser-les-missions.mjs). NE MODIFIE PAS app.js de la station :
   il lit seulement le DOM qu'il produit.

   1. Accueil : une carte « Votre mission » (mission.json, fetch relatif),
      sous la scène, repliable.
   2. Fin des questions : >= 3 bonnes réponses sur 4 -> coup de tampon,
      mémorisé dans localStorage « inerweb-legislation-tampons » ;
      sinon « Encore un essai pour le tampon ».
   Sans mission.json (ou en file://) : la station reste exactement
   ce qu'elle était. Tout reste sur l'appareil : aucun envoi.
   ===================================================================== */
(function () {
  "use strict";

  var CLE = "inerweb-legislation-tampons";
  var SEUIL = 3;
  var m = /\/stations\/([^\/]+)\//.exec(window.location.pathname);
  var slug = m ? m[1] : null;

  /* ---------- la mémoire de l'appareil ---------- */
  function lire() {
    try { return JSON.parse(window.localStorage.getItem(CLE) || "{}") || {}; } catch (e) { return {}; }
  }
  function ecrire(t) {
    try { window.localStorage.setItem(CLE, JSON.stringify(t)); return true; } catch (e) { return false; }
  }

  function el(nom, classe, texte) {
    var n = document.createElement(nom);
    if (classe) n.className = classe;
    if (texte != null) n.textContent = texte;
    return n;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var mission = null;

  /* ---------- 1. la carte « Votre mission » ---------- */
  function poserCarte() {
    var accueil = document.getElementById("accueil");
    if (!accueil || accueil.querySelector(".mission-carte")) return;

    var d = el("details", "mission-carte");
    d.open = true;
    var s = el("summary");
    s.appendChild(el("span", "mission-carte__etiquette", "Votre mission"));
    s.appendChild(el("span", "mission-carte__titre", String(mission.titre || "").replace(/^Mission\s*:\s*/i, "")));
    s.appendChild(el("span", "mission-carte__replier"));
    d.appendChild(s);

    var corps = el("div", "mission-carte__corps");
    var dl = el("dl");
    [["Le client", mission.client], ["La situation", mission.situation],
     ["La pièce à produire", mission.piece_a_produire]].forEach(function (p) {
      if (!p[1]) return;
      dl.appendChild(el("dt", null, p[0]));
      dl.appendChild(el("dd", null, p[1]));
    });
    corps.appendChild(dl);

    var pied = el("div", "mission-carte__pied");
    var gagne = !!(lire()[slug]);
    if (mission.badge) {
      pied.appendChild(el("span", "mission-carte__puce" + (gagne ? " mission-carte__puce--gagne" : ""),
        (gagne ? "✓ Quiz réussi : " : "Tampon à gagner : ") + mission.badge));
    }
    if (mission.duree_min) pied.appendChild(el("span", "mission-carte__puce", "Environ " + mission.duree_min + " min"));
    var lien = el("a", "mission-carte__lien", "Mon carnet →");
    lien.href = "../../carnet.html";
    pied.appendChild(lien);
    corps.appendChild(pied);
    d.appendChild(corps);

    /* Sous la scène ; à défaut sous le sous-titre ; à défaut en tête. */
    var ancre = accueil.querySelector("figure.scene") || accueil.querySelector(".sous-titre");
    if (ancre && ancre.parentNode) ancre.parentNode.insertBefore(d, ancre.nextSibling);
    else accueil.insertBefore(d, accueil.firstChild);

    /* À l'impression, une carte repliée sortirait vide. */
    window.addEventListener("beforeprint", function () { d.open = true; });
  }

  /* ---------- 2. le tampon ---------- */
  function arcTexte(id, texte) {
    return '<text font-size="15" font-weight="bold" letter-spacing="2.2" fill="currentColor" ' +
           'font-family="Trebuchet MS, Calibri, Arial, sans-serif"><textPath href="#' + id + '" startOffset="50%" ' +
           'text-anchor="middle">' + esc(texte) + "</textPath></text>";
  }
  function lignes(texte) {          /* coupe le nom du tampon en 2 lignes au plus */
    var mots = String(texte).split(/\s+/), a = [], b = [];
    var moitie = String(texte).length / 2, n = 0;
    mots.forEach(function (w) { (n < moitie ? a : b).push(w); n += w.length + 1; });
    return b.length ? [a.join(" "), b.join(" ")] : [a.join(" ")];
  }
  function dessinTampon(badge, date) {
    var uid = "mt" + Math.floor(Math.random() * 1e6);
    var l = lignes(badge || "Mission");
    var y0 = l.length === 1 ? 104 : 92;
    var noms = l.map(function (t, i) {
      return '<text x="100" y="' + (y0 + i * 24) + '" text-anchor="middle" font-size="21" font-weight="bold" ' +
             'fill="currentColor" font-family="Trebuchet MS, Calibri, Arial, sans-serif">' + esc(t) + "</text>";
    }).join("");
    return '<svg viewBox="0 0 200 200" role="img" aria-label="Tampon : ' + esc(badge || "mission validée") + '">' +
      '<defs><filter id="' + uid + 'f" x="-10%" y="-10%" width="120%" height="120%">' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="b"/>' +
      '<feColorMatrix in="b" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.5 1.7" result="t"/>' +
      '<feComposite in="SourceGraphic" in2="t" operator="in"/></filter>' +
      '<path id="' + uid + 'h" d="M 28 100 A 72 72 0 0 1 172 100"/>' +
      '<path id="' + uid + 'b" d="M 20 100 A 80 80 0 0 0 180 100"/></defs>' +
      '<g filter="url(#' + uid + 'f)">' +
      '<circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" stroke-width="6.5"/>' +
      '<circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" stroke-width="2.4"/>' +
      '<circle cx="100" cy="100" r="52" fill="none" stroke="currentColor" stroke-width="2.4"/>' +
      arcTexte(uid + "h", "CLIM'ÉTUDES SUD") + arcTexte(uid + "b", "QUIZ RÉUSSI") +
      noms +
      '<text x="100" y="' + (y0 + l.length * 24 - 2) + '" text-anchor="middle" font-size="13" fill="currentColor" ' +
      'font-family="Trebuchet MS, Calibri, Arial, sans-serif">' + esc(date) + "</text>" +
      "</g></svg>";
  }

  function dateDuJour() {
    var d = new Date();
    return ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
  }

  function bilan(bonnes, total) {
    var qs = document.querySelectorAll(".slide.question");
    var derniere = qs[qs.length - 1];
    if (!derniere) return;
    var ancien = derniere.querySelector(".mission-fin");
    if (ancien) ancien.remove();

    var bloc = el("div", "mission-fin");
    bloc.setAttribute("role", "status");
    var texte = el("div", "mission-fin__texte");
    var badge = mission && mission.badge ? mission.badge : "Mission validée";

    if (bonnes >= SEUIL) {
      var t = lire();
      var prec = t[slug];
      var date = prec && prec.date ? prec.date : dateDuJour();
      var meilleur = Math.max(bonnes, prec && prec.score ? prec.score : 0);
      if (slug) {
        t[slug] = { badge: badge, date: date, score: meilleur, sur: total };
        ecrire(t);
      }
      texte.appendChild(el("h3", null, "Quiz réussi : " + badge));
      texte.appendChild(el("p", null, bonnes + " bonnes réponses sur " + total + ". La mission reste à valider : rendez votre production et justifiez-la auprès du professeur."));
      var lien = el("a", null, "Voir mon carnet →");
      lien.href = "../../carnet.html";
      var p = el("p"); p.appendChild(lien); texte.appendChild(p);
      var tampon = el("div", "mission-tampon mission-tampon--pose");
      tampon.innerHTML = dessinTampon(badge, date);
      bloc.appendChild(texte);
      bloc.appendChild(tampon);
    } else {
      bloc.className += " mission-fin--essai";
      texte.appendChild(el("h3", null, "Encore un essai pour le tampon"));
      texte.appendChild(el("p", null, bonnes + " bonne" + (bonnes > 1 ? "s" : "") + " réponse" + (bonnes > 1 ? "s" : "") + " sur " + total + " : il en faut au moins " + SEUIL + ". Relisez les écrans signalés dans les explications, puis recommencez."));
      var b = el("button", "mission-fin__lien", "Refaire les questions");
      b.type = "button";
      b.addEventListener("click", function () {
        var nq = document.querySelectorAll(".slide.question").length;
        var nb = document.querySelectorAll(".slide").length;
        try { history.replaceState(null, "", "#ecran-" + (nb - nq + 1)); } catch (e) {}
        window.location.reload();
      });
      var p2 = el("p"); p2.appendChild(b); texte.appendChild(p2);
      bloc.appendChild(texte);
    }
    derniere.appendChild(bloc);
    /* Le tampon est le point d'arrivée : on le rend visible. */
    try { bloc.scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch (e) {}
  }

  /* app.js pose .choisi puis .juste sur le bouton cliqué. Les écouteurs des
     boutons passent AVANT celui du document (phase de remontée) : le DOM est
     donc à jour ici. */
  function surReponse(ev) {
    if (!ev.target.closest || !ev.target.closest(".quiz-options button")) return;
    var listes = document.querySelectorAll(".quiz-options");
    var total = listes.length, repondues = 0, bonnes = 0;
    listes.forEach(function (l) {
      var c = l.querySelector("button.choisi");
      if (c) { repondues++; if (c.classList.contains("juste")) bonnes++; }
    });
    if (total && repondues === total) bilan(bonnes, total);
  }

  /* ---------- démarrage ---------- */
  function demarrer() {
    if (!slug || !window.fetch) return;
    fetch("mission.json", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error("pas de mission"); return r.json(); })
      .then(function (j) {
        mission = j;
        poserCarte();
        document.addEventListener("click", surReponse);
      })
      .catch(function () { /* pas de mission.json (ou file://) : la station reste telle quelle */ });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
