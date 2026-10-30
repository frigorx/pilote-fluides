/* appareils.js — « PC ou tablette conseillé » : SOURCE UNIQUE (23/10/2026).
   ---------------------------------------------------------------------
   Audit téléphone du 23/10/2026 : l'avertissement existait en trois morceaux que personne ne voyait
   (SUPPORTS de plan-donnees.js → pictogramme dans la seule vue liste du Plan ; balise
   inerweb-support + support-appareil.js sur 15 cours ; modèle propre au Câblage virtuel).
   Ce fichier les remplace. Chargé par moteur/retour-accueil.js, donc présent sur toutes les pages.
   Il fait deux choses :
   1. SUR LA PAGE, sur un téléphone (≤ 760 px) : une fenêtre « Pensée pour un ordinateur ou une
      tablette » + « Continuer sur le téléphone » (rangée pour la session, page par page) ;
   2. SUR LES CARTES, partout et sur tout appareil : le pictogramme « PC ou tablette » sur chaque
      lien-carte qui mène à une page de la liste (accueil, catalogue, réseaux, Mon parcours, Plan),
      y compris les cartes dessinées après coup par un script.
   LA LISTE : chemin depuis la racine du site (un dossier vaut pour tout ce qu'il contient ;
     « =m/<n>/ » vaut pour la seule page m/<n>/, voir cle()).
     "avertir" = fenêtre sur la page + pictogramme sur les cartes ;
     "carte"   = pictogramme seulement (la page avertit déjà elle-même). */
(function () {
  "use strict";
  if (window.__inerwebAppareils) return;
  window.__inerwebAppareils = true;

  var LISTE = {
    // réseau Bureau d'études (30/10/2026) : stations de 2 h, tableaux et plans, double écran
    "bureau-etudes/": "avertir",
    // cours denses du pack fluides (ex-SUPPORTS de plan-donnees.js et balise inerweb-support)
    "packs/fluides/res/surchauffe-sous-refroidissement-interactif/": "avertir",
    "packs/fluides/res/diagramme-enthalpique/": "avertir",
    "packs/fluides/res/bilan-thermique-performance-interactif/": "avertir",
    "packs/fluides/res/module-compresseur/": "avertir",
    "packs/fluides/res/regulateur-electronique-interactif/": "avertir",
    "packs/fluides/res/pupitre-reglage-interactif/": "avertir",
    "packs/fluides/res/chaine-intervention-interactive/": "avertir",
    "packs/fluides/res/cours-classes-securite/": "avertir",
    "packs/fluides/res/etancheite-interactive/": "avertir",
    "packs/fluides/res/detecteurs-fuite-interactif/": "avertir",
    "packs/fluides/res/intervention-hydrocarbures-interactive/": "avertir",
    "packs/fluides/res/centrale-positive-interactif/": "avertir",
    "packs/fluides/res/postes-magasin-interactif/": "avertir",
    "packs/fluides/res/maintenance-centrale-interactif/": "avertir",
    // simulateurs denses (audit du 23/10)
    "simurezo/": "avertir",
    "aquiblue/": "avertir",
    // pages de l'enseignant, faites pour l'ordinateur de la classe
    "projection.html": "avertir",
    "formateur.html": "avertir",
    "matrice.html": "avertir",
    "planning.html": "avertir",
    // pages « Projeter » du livre MFER (m/<n>/), faites pour le vidéoprojecteur ; « = » : cette page
    // seule, pas les stations rangées dessous (m/<n>/g/), qui passent au téléphone
    "=m/<n>/": "avertir",
    // le Câblage virtuel a déjà sa fenêtre « Écran trop petit »
    "cablage-virtuel/": "carte"
  };
  window.INERWEB_APPAREILS = LISTE;

  var TEL = "(max-width: 760px)";
  var s = document.currentScript || document.querySelector('script[src*="appareils.js"]');
  var racine = s ? new URL("..", new URL(s.getAttribute("src"), location.href)).href : location.origin + "/";

  // chemin depuis la racine du site, sans ancre ni paramètres, « dossier/index.html » = « dossier/ »
  function chemin(h) {
    var u;
    try { u = new URL(h, location.href); } catch (e) { return null; }
    if (u.href.indexOf(racine) !== 0) return null;
    return u.href.slice(racine.length).split("#")[0].split("?")[0].replace(/index\.html$/, "");
  }
  function cle(c) {
    if (c === null) return null;
    if (/^m\/\d+\/$/.test(c)) return "=m/<n>/";
    for (var k in LISTE) if (c === k || (k.slice(-1) === "/" && c.indexOf(k) === 0)) return k;
    return null;
  }
  function statut(c) { var k = cle(c); return k ? LISTE[k] : null; }

  // taille posée EN LIGNE : certaines pages (le Plan) étirent tous leurs svg, même avec !important
  var PICTO = '<svg viewBox="0 0 30 20" width="22" height="15" aria-hidden="true" focusable="false" ' +
    'style="display:inline-block!important;width:1.6em!important;height:1.1em!important;min-width:0!important;max-width:none!important;position:static!important;flex:0 0 auto">' +
    '<rect x="1.5" y="2" width="17" height="11.5" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/>' +
    '<path d="M0 16.5h20" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>' +
    '<rect x="21" y="4" width="8" height="14" rx="1.5" fill="#fff" stroke="currentColor" stroke-width="2"/></svg>';

  var css =
    // balise propre (iw-pastille) : les feuilles des pages stylisent souvent toutes les span d'une carte
    "iw-pastille.iw-appareil{display:inline-flex!important;align-items:center;gap:5px;width:auto!important;height:auto!important;" +
    "max-width:100%;margin:4px 0 0;padding:2px 9px 2px 6px;" +
    "border:1.5px solid #2f5689;border-radius:999px;background:#eef3f9;color:#1b3a63;" +
    "font:700 14px/1.25 Calibri,'Segoe UI',system-ui,sans-serif;white-space:nowrap;vertical-align:middle}" +
    "iw-pastille.iw-appareil svg{display:inline-block!important;flex:0 0 auto;width:22px!important;height:15px!important}" +
    "#iw-appareil-fond{position:fixed;inset:0;z-index:10001;display:grid;place-items:center;padding:16px;" +
    "background:rgba(16,35,60,.45)}" +
    "#iw-appareil-fenetre{box-sizing:border-box;width:100%;max-width:420px;padding:18px 18px 16px;border:2px solid #2f5689;border-radius:16px;" +
    "background:#fffdf8;color:#10233c;box-shadow:0 12px 36px rgba(16,35,60,.3);" +
    "font:16px/1.4 Calibri,'Segoe UI',system-ui,sans-serif}" +
    "#iw-appareil-fenetre h2{display:flex;align-items:center;gap:10px;margin:0 0 8px;color:#1b3a63;" +
    "font:700 19px/1.2 'Trebuchet MS',Calibri,sans-serif}" +
    "#iw-appareil-fenetre h2 svg{flex:0 0 auto;width:34px;height:23px}" +
    "#iw-appareil-fenetre p{margin:0 0 14px}" +
    "#iw-appareil-fenetre button{width:100%;min-height:46px;border:0;border-radius:12px;background:#ff6b35;" +
    "color:#fff;font:700 17px/1.2 Calibri,sans-serif;cursor:pointer}" +
    "@media print{.iw-appareil,#iw-appareil-fond{display:none!important}}";

  function styles() {
    if (document.getElementById("iw-appareil-css")) return;
    var st = document.createElement("style");
    st.id = "iw-appareil-css";
    st.textContent = css;
    document.head.appendChild(st);
  }

  // 1. La fenêtre sur la page, au téléphone seulement
  function fenetre() {
    if (statut(chemin(location.href)) !== "avertir" || !window.matchMedia(TEL).matches) return;
    var cle = "iw_appareil_vu:" + chemin(location.href);
    try { if (sessionStorage.getItem(cle)) return; } catch (e) { /* tant pis */ }
    var ancien = document.getElementById("inerweb-support-appareil"); // ancien panneau : remplacé
    if (ancien) ancien.remove();
    var fond = document.createElement("div");
    fond.id = "iw-appareil-fond";
    fond.innerHTML = '<div id="iw-appareil-fenetre" role="dialog" aria-modal="true" aria-labelledby="iw-appareil-titre">' +
      '<h2 id="iw-appareil-titre">' + PICTO + "Pensée pour un ordinateur ou une tablette</h2>" +
      "<p>Sur un téléphone, vous pouvez lire cette activité, mais manipuler les schémas sera difficile. " +
      "Si vous le pouvez, ouvrez-la sur un ordinateur ou une tablette.</p>" +
      '<button type="button">Continuer sur le téléphone</button></div>';
    // calée sur la zone VISIBLE : une page plus large que l'écran élargit aussi le « fixed » ordinaire
    var vv = window.visualViewport;
    if (vv) {
      fond.style.inset = "auto";
      fond.style.left = vv.offsetLeft + "px"; fond.style.top = vv.offsetTop + "px";
      fond.style.width = vv.width + "px"; fond.style.height = vv.height + "px";
    }
    var bouton = fond.querySelector("button");
    bouton.addEventListener("click", function () {
      try { sessionStorage.setItem(cle, "1"); } catch (e) { /* tant pis */ }
      fond.remove();
    });
    document.body.appendChild(fond);
    bouton.focus();
  }

  // 2. Le pictogramme sur les cartes : liens « en bloc » (pas un mot dans une phrase), hors schémas
  function estCarte(a) {
    if (a.closest("svg") || a.closest("#inerweb-retour-accueil-barre")) return false;
    if (a.querySelector("h1,h2,h3,h4,img,svg,strong,b")) return true;
    var d = getComputedStyle(a).display;
    return d !== "inline" && d !== "contents";
  }
  function marquer() {
    var ici = cle(chemin(location.href));
    var liens = document.querySelectorAll("a[href]:not([data-iw-appareil])");
    for (var i = 0; i < liens.length; i++) {
      var a = liens[i];
      a.setAttribute("data-iw-appareil", "");
      var c = chemin(a.getAttribute("href"));
      // une PAGE de la liste (pas un fichier joint), vue depuis l'extérieur de cette page
      if (!statut(c) || !/(\/|\.html?)$|^[^.]*$/.test(c) || cle(c) === ici || !estCarte(a)) continue;
      // un seul pictogramme par carte (une carte a souvent trois liens : image, titre, « Ouvrir »)
      var carte = a.closest("article,li,[class*=carte],[class*=card]") || a.parentNode;
      if (carte && carte.querySelector(".iw-appareil")) continue;
      var pastille = document.createElement("iw-pastille");
      pastille.className = "iw-appareil";
      pastille.title = "Conçu pour un ordinateur ou une tablette ; sur téléphone, consultation seulement";
      pastille.innerHTML = PICTO + "PC ou tablette";
      // à la suite du titre, dans son propre bloc (sinon il devient une colonne de plus dans une carte en flex)
      var titre = a.querySelector("h2,h3,h4,strong,[class*=nom],[class*=titre],[class*=title]");
      if (titre && titre.parentNode) titre.parentNode.insertBefore(pastille, titre.nextSibling);
      else a.appendChild(pastille);
    }
  }

  function lancer() {
    styles();
    fenetre();
    marquer();
    // cartes dessinées plus tard (catalogue, Mon parcours, Plan) : on repasse, sans s'emballer
    var attente = null;
    new MutationObserver(function () {
      if (attente) return;
      attente = setTimeout(function () { attente = null; marquer(); }, 300);
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", lancer);
  else lancer();
})();
