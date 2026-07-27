/* =====================================================================
   sons.js — l'habillage sonore des planches animées
   ---------------------------------------------------------------------
   CE QU'IL FAIT
   Quand une planche animée démarre (ouverture d'une fiche, clic sur
   « ↻ Rejouer », diapositive de projection), il programme les sons de
   cette planche aux instants relevés dans packs/fluides/sons.js.

   POURQUOI PAR MINUTERIE ET NON PAR ÉVÉNEMENT
   Nos planches sont des <img> : le navigateur n'expose ni leur DOM ni leur
   horloge SMIL. Aucun événement d'animation n'est atteignable depuis la
   page. La seule voie fiable est donc de partir du même instant que
   l'animation et de compter le temps — exactement ce que fait l'image.
   L'alternative (injecter le SVG en ligne pour l'écouter) a été essayée le
   27/07 : elle a vidé les planches. Elle ne sera pas reprise.

   TROIS RÈGLES TENUES, reprises de la note d'intention du pack sonore
   1. Rien ne se joue tant que le lecteur n'a pas activé le son. Le réglage
      est mémorisé sur l'appareil, et il est COUPÉ par défaut.
   2. Un son ne se charge que lorsqu'on le joue (`preload="none"`) : le
      pack s'ouvre en 4G exactement comme avant.
   3. Le son n'est jamais porteur d'information : tout ce qu'il souligne est
      déjà visible et écrit. Une planche muette reste complète.

   DÉGRADATION — si `sons.js` du pack est absent, si un fichier audio
   manque, ou si le navigateur refuse de lire, la page fonctionne
   normalement et sans erreur visible. Le son est un supplément.
   ===================================================================== */
(function () {
  "use strict";

  var CLE = "pilote_son";
  var T = window.PILOTE_SONS || null;
  var minuteries = [];
  var enCours = [];
  var cache = {};

  function dispo() { return !!(T && T.planches); }

  /* ---- le choix du lecteur, mémorisé sur SON appareil ---- */
  function actif() {
    try {
      var v = localStorage.getItem(CLE);
      if (v === null) return !!(T && T.actif_par_defaut);
      return v === "1";
    } catch (e) { return false; }
  }
  function poser(v) {
    try { localStorage.setItem(CLE, v ? "1" : "0"); } catch (e) {}
    if (!v) stop();
    majBoutons();
  }

  /* ---- lecture ---- */
  function element(nom) {
    if (cache[nom]) return cache[nom].cloneNode();
    var a = new Audio();
    a.preload = "none";
    // OGG d'abord quand il existera (dix fois plus léger), WAV en repli.
    a.src = T.dossier + nom + ".wav";
    cache[nom] = a;
    return a.cloneNode();
  }

  function jouer(nom, volume) {
    if (!actif()) return;
    try {
      var a = element(nom);
      a.volume = typeof volume === "number" ? Math.max(0, Math.min(1, volume)) : 1;
      // Un refus de lecture (fichier absent, geste utilisateur manquant,
      // format non supporté) ne doit RIEN casser : on laisse tomber ce son.
      var p = a.play();
      if (p && p.catch) p.catch(function () {});
      enCours.push(a);
    } catch (e) { /* pas de son, pas de drame */ }
  }

  function stop() {
    minuteries.forEach(clearTimeout);
    minuteries = [];
    enCours.forEach(function (a) { try { a.pause(); a.currentTime = 0; } catch (e) {} });
    enCours = [];
  }

  /* ---- programmer la bande-son d'une planche ----
     `fichier` est le nom du SVG, tel qu'il apparaît dans le src de l'<img>. */
  function jouerPlanche(fichier) {
    if (!dispo() || !actif()) return;
    var seq = T.planches[fichier];
    if (!seq || !seq.length) return;
    stop();
    seq.forEach(function (e) {
      var t = e[0] * 1000, nom = e[1], vol = e[2];
      minuteries.push(setTimeout(function () { jouer(nom, vol); }, t));
    });
  }

  /* ---- le bouton, posé dans la barre du haut ou à côté d'une planche ---- */
  function majBoutons() {
    var on = actif();
    var l = document.querySelectorAll("[data-son-bouton]");
    for (var i = 0; i < l.length; i++) {
      l[i].textContent = on ? "🔊 Son" : "🔇 Son coupé";
      l[i].setAttribute("aria-pressed", on ? "true" : "false");
      l[i].title = on
        ? "Couper l'habillage sonore des animations"
        : "Activer l'habillage sonore des animations (rien n'est joué sans votre accord)";
    }
  }

  function brancherBoutons(racine) {
    if (!dispo()) return;
    var l = (racine || document).querySelectorAll("[data-son-bouton]:not([data-son-branche])");
    for (var i = 0; i < l.length; i++) {
      (function (b) {
        b.setAttribute("data-son-branche", "1");
        b.addEventListener("click", function () { poser(!actif()); });
      })(l[i]);
    }
    majBoutons();
  }

  /* Un bouton prêt à insérer, pour les pages qui n'en ont pas déjà un. */
  function html(classe) {
    if (!dispo()) return "";
    return '<button type="button" data-son-bouton class="' + (classe || "") +
      '" aria-pressed="false">🔇 Son coupé</button>';
  }

  window.PiloteSons = {
    disponible: dispo,
    actif: actif,
    jouerPlanche: jouerPlanche,
    jouer: jouer,
    stop: stop,
    brancher: brancherBoutons,
    html: html,
    /* le nom de planche à partir d'un src d'image, « ?r=3 » compris */
    nom: function (src) { return String(src || "").split("?")[0].split("/").pop(); },
  };

  if (document.readyState !== "loading") brancherBoutons();
  else document.addEventListener("DOMContentLoaded", function () { brancherBoutons(); });
})();
