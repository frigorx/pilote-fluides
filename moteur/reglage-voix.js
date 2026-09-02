/* =====================================================================
   reglage-voix.js — le réglage de débit, une fois pour tout le site
   ---------------------------------------------------------------------
   § 5 de VOIX-ET-NARRATION.md : plage 0,6× à 1,4×, défaut 0,95×, conservé
   pendant la session, et le changement ARRÊTE la lecture en cours — le
   moteur de synthèse ignore un changement de débit en pleine phrase, et
   laisser croire le contraire est un faux réglage.

   Ce module ne parle pas. Il donne la vitesse, le bouton, et l'arrêt.
   Il s'appuie sur voix.js quand il est présent, sans en dépendre.

   Emploi :
     PILOTE_VOIX_REGLAGE.monter(document.querySelector(".top-actions"));
     utterance.rate = PILOTE_VOIX_REGLAGE.vitesse();
   ===================================================================== */
(function () {
  "use strict";

  var CLE = "pilote-voix-vitesse";
  var PAS = [0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4];
  var DEFAUT = 0.95;

  function lire() {
    try {
      var brut = Number(window.sessionStorage.getItem(CLE));
      if (PAS.indexOf(brut) !== -1) return brut;
    } catch (_) { /* navigation privée : on garde le défaut */ }
    return DEFAUT;
  }

  var vitesse = lire();
  var affichages = [];

  function ecrire(valeur) {
    vitesse = valeur;
    try { window.sessionStorage.setItem(CLE, String(valeur)); } catch (_) { /* sans mémoire, le réglage vaut pour l'écran */ }
    affichages.forEach(rafraichir);
    arreter();
    try {
      document.dispatchEvent(new window.CustomEvent("pilotevoix:vitesse", { detail: { vitesse: valeur } }));
    } catch (_) { /* anciens navigateurs : le réglage s'applique quand même à la lecture suivante */ }
  }

  function arreter() {
    if (window.speechSynthesis) { try { window.speechSynthesis.cancel(); } catch (_) {} }
  }

  function libelle(valeur) {
    return valeur.toFixed(2).replace(/0+$/, "").replace(/\.$/, "").replace(".", ",") + "×";
  }

  function rafraichir(bloc) {
    var sortie = bloc.querySelector("output");
    if (sortie) sortie.textContent = libelle(vitesse);
    var moins = bloc.querySelector("[data-voix-moins]");
    var plus = bloc.querySelector("[data-voix-plus]");
    if (moins) moins.disabled = vitesse <= PAS[0];
    if (plus) plus.disabled = vitesse >= PAS[PAS.length - 1];
  }

  function deplacer(sens) {
    var i = PAS.indexOf(vitesse);
    if (i === -1) i = PAS.indexOf(DEFAUT);
    var cible = Math.min(PAS.length - 1, Math.max(0, i + sens));
    if (PAS[cible] !== vitesse) ecrire(PAS[cible]);
  }

  /* Le repli navigateur : classer les voix neuronales D'ABORD. Un filtre qui
     accepte « microsoft » retient la plus ancienne — piège déjà payé deux fois. */
  function meilleureVoixFrancaise() {
    if (!window.speechSynthesis) return null;
    var voix = window.speechSynthesis.getVoices().filter(function (v) {
      return /^fr(-|_|$)/i.test(v.lang || "");
    });
    if (!voix.length) return null;   // jamais voices[0] : ce serait une voix anglaise
    return voix.sort(function (a, b) { return note(b) - note(a); })[0];
  }

  function note(v) {
    var nom = ((v.name || "") + " " + (v.voiceURI || "")).toLowerCase();
    var n = /^fr-fr$/i.test(v.lang || "") ? 10 : 4;
    if (/natural|neural|nuage|online|multilingual/.test(nom)) n += 40;   // neuronales d'abord
    if (/denise|henri|vivienne|remy|rémy|eloise|jerome|jérôme|yves|josephine/.test(nom)) n += 20;
    if (/hortense|julie|paul/.test(nom)) n -= 10;                        // les trois anciennes du poste
    return n;
  }

  function habiller() {
    if (document.getElementById("style-reglage-voix")) return;
    var style = document.createElement("style");
    style.id = "style-reglage-voix";
    style.textContent =
      ".reglage-voix{display:inline-flex;align-items:center;gap:.35rem;border:2px solid currentColor;"
      + "border-radius:999px;padding:.15rem .5rem;font:inherit;line-height:1}"
      + ".reglage-voix button{min-width:2rem;min-height:2rem;border:0;background:transparent;color:inherit;"
      + "font:inherit;font-size:1.15em;font-weight:700;cursor:pointer;border-radius:50%}"
      + ".reglage-voix button:hover:not(:disabled){background:rgba(0,0,0,.08)}"
      + ".reglage-voix button:disabled{opacity:.35;cursor:default}"
      + ".reglage-voix button:focus-visible{outline:3px solid currentColor;outline-offset:2px}"
      + ".reglage-voix output{min-width:3.2em;text-align:center;font-variant-numeric:tabular-nums;font-weight:600}";
    document.head.appendChild(style);
  }

  window.PILOTE_VOIX_REGLAGE = {
    vitesse: function () { return vitesse; },
    definir: function (valeur) { if (PAS.indexOf(valeur) !== -1) ecrire(valeur); },
    voix: meilleureVoixFrancaise,

    /* Applique débit et voix à une utterance, avant de la faire parler. */
    appliquer: function (utterance) {
      if (!utterance) return utterance;
      utterance.rate = vitesse;
      utterance.lang = "fr-FR";
      utterance.pitch = 1;
      var v = meilleureVoixFrancaise();
      if (v) utterance.voice = v;
      return utterance;
    },

    /* Insère le réglage dans un conteneur. Le style minimal vient avec lui : les
       105 modules du site n'ont pas la même feuille, et le réglage doit être
       lisible partout sans retoucher chacune. */
    monter: function (conteneur) {
      if (!conteneur || conteneur.querySelector("[data-voix-reglage]")) return null;
      habiller();
      var bloc = document.createElement("div");
      bloc.className = "reglage-voix";
      bloc.setAttribute("data-voix-reglage", "");
      bloc.setAttribute("role", "group");
      bloc.setAttribute("aria-label", "Débit de la voix");
      bloc.innerHTML =
        '<button type="button" data-voix-moins aria-label="Parler moins vite">−</button>'
        + '<output aria-live="off">' + libelle(vitesse) + "</output>"
        + '<button type="button" data-voix-plus aria-label="Parler plus vite">+</button>';
      bloc.querySelector("[data-voix-moins]").addEventListener("click", function () { deplacer(-1); });
      bloc.querySelector("[data-voix-plus]").addEventListener("click", function () { deplacer(1); });
      conteneur.appendChild(bloc);
      affichages.push(bloc);
      rafraichir(bloc);
      return bloc;
    }
  };
})();
