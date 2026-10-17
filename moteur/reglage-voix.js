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
      /* un réglage posé d'office à côté d'« Écouter » (voir plus bas) rejoint la place que la page lui donne */
      var poseDOffice = document.querySelector("[data-voix-reglage][data-voix-auto]");
      if (poseDOffice) { poseDOffice.removeAttribute("data-voix-auto"); conteneur.appendChild(poseDOffice); return poseDOffice; }
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

  /* Le réglage commun partout (Franck, 17/10/2026). Un module qui garde son ancien réglage propre (liste « Vitesse de la
     voix », « voice-rate », « Vitesse de lecture », boutons « Accélérer la voix »…) le voit remplacé par celui-ci, à la
     même place : l'ancien ne changeait plus le débit (défaut D6), et voix.js impose désormais cette vitesse à toute
     lecture. Ne visent que des réglages DE LA VOIX, nommés comme tels : un curseur « vitesse » de l'air ou d'une
     animation, un bouton « Accélérer » d'une simulation ou « Station 3 : Vitesse » restent. */
  var ANCIEN_BOUTON = /^\s*[⏩⏪»«+−-]?\s*(accélérer|ralentir)\s+la\s+voix\s*$/i;
  var ANCIEN_NOM = /^(voice-?rate|voicerate|speech-?rate|speechrate|voice-?speed|vitesse-?voix|vitesse-?lecture)$/i;
  var ANCIEN_LIBELLE = /vitesse (de (la )?)?(voix|lecture|narration)|débit de la voix/i;
  /* les boutons − / + d'un bloc de vitesse de la voix (#slower / #faster rangés dans un bloc « speed », « voice »…) */
  function boutonsDeVitesse(e) {
    return /^(slower|faster)$/.test(e.id || "") && !!e.parentElement && /speed|vitesse|rate|voice|voix/i.test(e.parentElement.className || "");
  }
  /* le bloc qui ne contient que l'ancien réglage (« .vitesse », « .speed »…, sans bouton Écouter) : on le masque entier */
  function blocDeVitesse(e) {
    var p = e.parentElement;
    if (!p || p === document.body) return null;
    var nomme = /speed|vitesse|rate/i.test((p.className || "") + " " + (p.getAttribute("aria-label") || ""));
    var sansEcoute = !Array.prototype.some.call(p.querySelectorAll("button"), function (b) { return /écouter|arrêter|stop|pause/i.test(b.textContent || ""); });
    return nomme && sansEcoute ? p : null;
  }
  function ancienReglage(e) {
    if (e.closest("[data-voix-reglage]") || e.closest("#pilote-prof-vocal")) return false;
    if (e.tagName === "BUTTON") return ANCIEN_BOUTON.test(e.textContent || "") || ANCIEN_BOUTON.test(e.getAttribute("aria-label") || "") || boutonsDeVitesse(e);
    if (ANCIEN_NOM.test(e.id || "") || ANCIEN_NOM.test(e.name || "")) return true;
    var etiquette = (e.labels && e.labels[0]) || e.closest("label");
    return !!etiquette && (ANCIEN_LIBELLE.test(etiquette.textContent || "") || ANCIEN_LIBELLE.test(etiquette.getAttribute("title") || ""));
  }
  function cacher(e) { e.hidden = true; e.style.display = "none"; e.setAttribute("aria-hidden", "true"); }
  function remplacerAnciens() {
    var anciens = Array.prototype.filter.call(document.querySelectorAll("select, input[type=range], button"), ancienReglage)
      .filter(function (e) { return e.style.display !== "none"; });
    if (!anciens.length) return;
    if (!document.querySelector("[data-voix-reglage]")) {
      var premier = anciens[0], enveloppe = premier.closest("label");
      var repere = blocDeVitesse(premier) || enveloppe || premier, hote = repere.parentNode;
      var bloc = hote && window.PILOTE_VOIX_REGLAGE.monter(hote);
      /* posé à côté de l'ancien bloc, jamais dedans (la page peut masquer ce bloc) ; marqué « d'office » pour qu'un
         monter() de la page le récupère à la place qu'elle choisit */
      if (bloc) { hote.insertBefore(bloc, repere); bloc.setAttribute("data-voix-auto", ""); }
    }
    anciens.forEach(function (e) {
      var enveloppe = e.closest("label"), blocAncien = blocDeVitesse(e);
      if (blocAncien) { cacher(blocAncien); return; }
      cacher(enveloppe && !enveloppe.querySelector("[data-voix-reglage]") ? enveloppe : e);
      if (e.labels) Array.prototype.forEach.call(e.labels, cacher);
    });
  }
  /* Une page qui parle (bouton « Écouter ») sans aucun réglage : le réglage commun se pose juste après ce bouton.
     Une page qui le monte elle-même plus tard le récupère (monter() ci-dessus) : jamais deux réglages. */
  var ECOUTER = "#listen, #listen-button, #speak, #play-button, #stationVoice, #formationListen, #pListen, #listenButton, #btVoix, #btn-ecouter, #st-ecouter, #voice-button, #speakButton, [data-prof-ecouter]";
  function poserDOffice() {
    if (document.querySelector("[data-voix-reglage]")) return;
    var visible = function (b) { var r = b.getBoundingClientRect(); return r.width > 0 && r.height > 0 && !b.closest("#pilote-prof-vocal"); };
    var bouton = Array.prototype.find.call(document.querySelectorAll(ECOUTER), visible)
      /* à défaut d'identifiant connu (pages React…), un bouton qui s'appelle « Écouter » */
      || Array.prototype.find.call(document.querySelectorAll("button"), function (b) {
        return /^\s*(▶|🔊|🔈|🔉|🎧)?\s*écouter\b/i.test(b.textContent || "") && visible(b);
      });
    if (!bouton || !bouton.parentNode) return;
    var bloc = window.PILOTE_VOIX_REGLAGE.monter(bouton.parentNode);
    if (!bloc) return;
    bloc.setAttribute("data-voix-auto", "");
    bouton.insertAdjacentElement("afterend", bloc);
  }
  var pret = false;
  function surveiller() {
    remplacerAnciens();
    var lancer = function () { window.setTimeout(function () { pret = true; remplacerAnciens(); poserDOffice(); }, 900); };
    if (document.readyState === "complete") lancer(); else window.addEventListener("load", lancer);
    if (!window.MutationObserver || !document.body) return;
    var attente = null;
    new window.MutationObserver(function () {
      if (attente) return;
      attente = window.setTimeout(function () { attente = null; remplacerAnciens(); if (pret) poserDOffice(); }, 120);
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", surveiller);
  else surveiller();
})();
