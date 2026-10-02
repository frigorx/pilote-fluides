/* =====================================================================
   ANIMATIONS — les animations du cours jouent sur toutes les machines.
   ---------------------------------------------------------------------
   POURQUOI : beaucoup de pages coupent leurs animations quand le système
   annonce prefers-reduced-motion. Or ce réglage est actif sans que
   personne ne l'ait choisi : effets d'animation de Windows désactivés
   (PC de F. Henninot, PC du lycée), « Supprimer les animations »
   d'Android (constaté sur un Pixel 10, 02/10/2026). Le cours se figeait.
   Une animation qui porte le cours n'est pas un ornement.

   CONTRAT : script autonome, à charger SANS defer, en tête de <head>,
   avant tout autre script ou feuille de style :
     <script src=".../moteur/animations.js"></script>
   Il remplace le réglage du système par l'interrupteur du site
   « Animations » (panneau Aa de lisibilite.js, clé localStorage
   inerweb_animations = "non" pour les couper, sur les vieux PC) :
     · window.matchMedia répond à toute requête prefers-reduced-motion
       selon l'interrupteur ;
     · les règles @media (prefers-reduced-motion…) des feuilles de style
       sont réécrites selon l'interrupteur, au fil de leur chargement.
   Interrupteur coupé : les pages se comportent exactement comme avec
   le réglage « réduire les animations » du système.

   POSÉ PAR : node build/animations.mjs (pages du site) et par les
   livrer.mjs des ateliers aerorezo, hydrometro, electrorezo, cartoclim.
   PIÈGE : une feuille d'une autre origine (CDN) reste illisible, donc
   telle quelle. Le Shadow DOM n'est pas parcouru (matchMedia, lui, l'est).
   ===================================================================== */
(function () {
  "use strict";
  if (window.inerwebAnimations) return; // double inclusion : inoffensive

  var CLE = "inerweb_animations";
  var actives = true;
  try { actives = localStorage.getItem(CLE) !== "non"; } catch (e) { /* sans mémoire : animations actives */ }

  // (prefers-reduced-motion), (prefers-reduced-motion: reduce), (… : no-preference)
  var REQUETE = /\(\s*prefers-reduced-motion\s*(?::\s*(reduce|no-preference)\s*)?\)/gi;
  var VRAI = "(min-width: 0px)";
  var FAUX = "(max-width: 0px) and (min-width: 1px)";

  function concerne(texte) {
    REQUETE.lastIndex = 0;
    return REQUETE.test(String(texte));
  }

  function traduire(texte) {
    return String(texte).replace(REQUETE, function (_, valeur) {
      var reduire = !valeur || valeur.toLowerCase() === "reduce";
      return (reduire ? !actives : actives) ? VRAI : FAUX;
    });
  }

  /* ---- 1. Les scripts : matchMedia répond selon l'interrupteur ---- */
  var origine = window.matchMedia;
  if (origine) {
    window.matchMedia = function (requete) {
      return origine.call(window, concerne(requete) ? traduire(requete) : requete);
    };
  }

  /* ---- 2. Les feuilles de style : @media réécrites au chargement ---- */
  function retoucher(regles) {
    if (!regles) return;
    for (var i = 0; i < regles.length; i++) {
      var r = regles[i];
      if (r.media && r.cssRules && concerne(r.media.mediaText)) r.media.mediaText = traduire(r.media.mediaText);
      if (r.styleSheet) feuille(r.styleSheet); // @import
      if (r.cssRules) retoucher(r.cssRules);   // @media, @supports, @layer imbriqués
    }
  }

  function feuille(f) {
    if (!f) return;
    try {
      if (f.media && concerne(f.media.mediaText)) f.media.mediaText = traduire(f.media.mediaText);
      retoucher(f.cssRules);
    } catch (e) { /* feuille d'une autre origine ou pas encore chargée */ }
  }

  function tout() {
    for (var i = 0; i < document.styleSheets.length; i++) feuille(document.styleSheets[i]);
  }

  // Une <link> se charge après ce script : on la reprend à son arrivée.
  document.addEventListener("load", function (ev) {
    var el = ev.target;
    if (el && el.tagName === "LINK") feuille(el.sheet);
  }, true);

  // Les <style> posés par les scripts des pages (quartier, lisibilité…).
  if (window.MutationObserver) {
    new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var ajouts = mutations[i].addedNodes;
        for (var j = 0; j < ajouts.length; j++) {
          var n = ajouts[j];
          if (n.tagName === "STYLE" || n.tagName === "LINK") feuille(n.sheet);
        }
      }
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  document.addEventListener("DOMContentLoaded", tout);
  window.addEventListener("load", tout);
  tout();

  window.inerwebAnimations = {
    actives: actives,
    regler: function (oui) {
      try { localStorage.setItem(CLE, oui ? "oui" : "non"); } catch (e) { /* tant pis */ }
      location.reload();
    }
  };
})();
