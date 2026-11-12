/* Socle pressostats : base commune des dessins SVG.
   Rôle : palette, petites fabriques SVG, filigrane, registre des types de dessin.
   Contrat : window.PressostatDessins.creer(type, options) rend { noeud, regler(etat) }.
     noeud  : élément <svg> prêt à poser dans la page (viewBox, largeur 100 %, role="img").
     regler : met le dessin dans l'état demandé (pressions, contacts, appui). Sans effet si le type est fixe.
   Les types sont déclarés par dessin-coupe.js et dessins-schemas.js avec enregistrer(type, fabrique).
   Règles : aucun texte sur un tracé (étiquettes sur fond crème, hors des traits), jamais de fond noir,
   pas d'image bitmap, pas de marque ni de logo de fabricant. */
window.PressostatDessins = (function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";

  /* Palette (charte inerWeb § 3.5, métaux en léger dégradé pour le relief). */
  var C = {
    marine: "#1b3a63",      /* trait et texte */
    creme: "#f7f1e7",       /* fond du panneau */
    papier: "#fffdf8",      /* fond des étiquettes et des plaques graduées */
    boitier: "#d5dbe2",     /* tôle du boîtier, vue en coupe */
    boitierFonce: "#aab4c0",
    interieur: "#eef2f6",   /* vide intérieur du boîtier */
    acier: "#8b96a3",       /* ressorts, tiges, leviers */
    acierClair: "#c3cad3",
    laiton: "#d6ab4c",      /* soufflets, raccords */
    laitonFonce: "#a8802a",
    cuivre: "#c7773a",      /* lames et plots de contact, tubes */
    bp: "#2f7fd1",          /* basse pression */
    bpPale: "#cfe3f7",
    hp: "#d9482b",          /* haute pression */
    hpPale: "#f8d6cc",
    accent: "#ff6b35",      /* la pièce qui agit, le courant qui passe */
    repos: "#9aa3ad",       /* conducteur sans courant */
    vert: "#2e8b57",        /* état normal, voyant marche */
    blanc: "#ffffff"
  };
  var POLICE = "Segoe UI, Calibri, Arial, sans-serif";

  function el(nom, attrs, parent) {
    var n = document.createElementNS(NS, nom), k;
    if (attrs) for (k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k) && attrs[k] != null) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  /* Racine d'un dessin : viewBox, étiquette lue par les lecteurs d'écran, fond crème arrondi. */
  function racine(largeur, hauteur, label) {
    var s = el("svg", { viewBox: "0 0 " + largeur + " " + hauteur, role: "img", "aria-label": label || "", class: "dessin-pressostat", preserveAspectRatio: "xMidYMid meet" });
    s.style.width = "100%";
    s.style.height = "auto";
    s.style.display = "block";
    if (label) el("title", null, s).textContent = label;
    el("rect", { x: 0, y: 0, width: largeur, height: hauteur, rx: 18, fill: C.creme }, s);
    return s;
  }

  function texte(parent, x, y, contenu, attrs) {
    var a = { x: x, y: y, fill: C.marine, "font-family": POLICE, "font-size": 18 }, k;
    if (attrs) for (k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) a[k] = attrs[k];
    var t = el("text", a, parent);
    t.textContent = contenu;
    return t;
  }

  /* Filigrane inerWeb : pâle (10 %), posé avant le dessin, un exemplaire au centre. points = [[x, y], ...]. */
  function filigrane(parent, points, largeur) {
    var g = el("g", { opacity: 0.1, "aria-hidden": "true" }, parent), k = (largeur || 400) / 400;
    points.forEach(function (p) {
      var m = el("g", { transform: "translate(" + p[0] + " " + p[1] + ") rotate(-12) scale(" + k + ") translate(-140 -66)" }, g);
      texte(m, 0, 80, "❄️", { "font-size": 56 });
      texte(m, 76, 75, "iner", { "font-size": 52, "font-weight": 700, "font-family": "Trebuchet MS, Trebuchet, sans-serif" });
      texte(m, 171, 75, "Web", { "font-size": 52, "font-family": "Segoe Script, Brush Script MT, cursive" });
      el("line", { x1: 76, x2: 276, y1: 80, y2: 80, stroke: "#e8914a", "stroke-width": 4 }, m);
      texte(m, 76, 122, "by inerweb.fr", { "font-size": 30, "font-weight": 700, "font-family": "Trebuchet MS, Trebuchet, sans-serif" });
    });
    return g;
  }

  /* Pastille numérotée : repère d'une pièce. La légende des numéros est écrite par le moteur, sous le dessin. */
  function pastille(parent, x, y, n) {
    var g = el("g", { class: "repere" }, parent);
    el("circle", { cx: x, cy: y, r: 15, fill: C.marine, stroke: C.blanc, "stroke-width": 2.5 }, g);
    texte(g, x, y + 6, String(n), { "text-anchor": "middle", "font-size": 17, "font-weight": 700, fill: C.blanc });
    return g;
  }

  /* Étiquette : texte sur fond papier bordé. À poser dans une zone libre, jamais sur un trait. */
  function etiquette(parent, x, y, contenu, options) {
    var o = options || {}, taille = o.taille || 17, larg = o.largeur || Math.round(contenu.length * taille * 0.56) + 18;
    var g = el("g", { class: "etiquette" }, parent), ancre = o.ancre || "middle";
    var x0 = ancre === "middle" ? x - larg / 2 : (ancre === "end" ? x - larg : x);
    el("rect", { x: x0, y: y - taille - 5, width: larg, height: taille + 14, rx: 7, fill: o.fond || C.papier, stroke: o.bord || C.marine, "stroke-width": 1.2 }, g);
    texte(g, x0 + larg / 2, y, contenu, { "text-anchor": "middle", "font-size": taille, "font-weight": o.gras ? 700 : 500, fill: o.couleur || C.marine });
    return g;
  }

  /* Dégradé linéaire vertical ou horizontal, pour le relief d'un métal. Rend l'adresse url(#id). */
  var compteur = 0;
  function degrade(svg, clair, fonce, horizontal) {
    var defs = svg.querySelector("defs") || el("defs", null, svg), id = "pd-g" + (++compteur);
    var g = el("linearGradient", horizontal ? { id: id, x1: 0, y1: 0, x2: 1, y2: 0 } : { id: id, x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    el("stop", { offset: "0", "stop-color": clair }, g);
    el("stop", { offset: "1", "stop-color": fonce }, g);
    return "url(#" + id + ")";
  }

  var types = {};
  function enregistrer(type, fabrique) { types[type] = fabrique; }

  function creer(type, options) {
    var f = types[type];
    if (!f) {
      var s = racine(600, 200, "Dessin à venir");
      texte(s, 300, 108, "Dessin « " + type + " » à venir", { "text-anchor": "middle", "font-size": 22 });
      return { noeud: s, regler: function () {} };
    }
    var d = f(options || {});
    if (!d.regler) d.regler = function () {};
    return d;
  }

  return { C: C, POLICE: POLICE, el: el, racine: racine, texte: texte, filigrane: filigrane, pastille: pastille, etiquette: etiquette, degrade: degrade, enregistrer: enregistrer, creer: creer, types: types };
})();
