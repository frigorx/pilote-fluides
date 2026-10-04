/* =====================================================================
   scene-geste.js — intervention-hydrocarbures-interactive : le geste, pas à
   pas, sur un circuit hydrocarbure (suite de « Mission 290 »)
   ---------------------------------------------------------------------
   RÔLE (chantier « Animer les réseaux », 04/10/2026, d'après le pilote de
   geste chaine-intervention-interactive) : le dessin vivant du module, en
   haut de chaque écran. À gauche, le geste en gros plan : le technicien (le
   bonhomme de HoCourant, repris de legislation/scenes/fluidique.js) a la
   main sur la pièce qui agit (le composant, une vanne du manifold, le
   mano-détendeur, le détecteur). À droite, le circuit et la conséquence
   visible : l'azote
   entre par le mano-détendeur, la pompe aspire l'air et l'humidité, la
   bouteille de R-290 se vide sur la balance, la vapeur qui fuit se voit.
   Six étapes, l'ordre du parcours : ouvrir, éprouver, tirer au vide,
   observer la tenue, charger, contrôler. Chaque écran ouvre l'étape de son
   dossier (SCENE_GESTE.dossier, appelé par app.js). À l'épreuve, la
   pression tient puis chute, une fois sur deux (à chaque départ de l'étape) :
   l'azote s'échappe alors par le raccord neuf, la vapeur se voit, STOP.
   SYMBOLES, jamais redessinés (voir SOURCES.md) : le manifold, les vannes
   de service, le filtre et le ventilateur sont ceux de la bibliothèque
   curée (../symboles/) ; la pompe à vide, le vacuomètre et le régulateur de
   pression à manomètre viennent de la collection QElectroTech (symboles/,
   copies sans retouche) ; la bouteille d'azote, la bouteille de fluide, la
   balance, le détecteur et le cône de balisage sont les pictogrammes du
   site (../bibliotheque/icones/, ceux du cours). Seul ajout sur un symbole :
   la vanne fermée est noircie (convention des schémas), sur sa propre forme.
   RÉEMPLOI, en lecture : jouerezo/moteur/voyage-dessin.js (tubes cuivre,
   nappe, bulles, pastilles, filigrane).
   RÈGLES TENUES : texte jamais sur un tracé ; textes du dessin >= 22 unités
   (>= 19 px à 956 px de large) ; filigrane R9 derrière le dessin ; le
   mouvement suit le temps de la page, sans autre condition (Pause le fige).
   Aucune valeur de pression, de vide, de durée ni de masse : la notice, la
   plaque et la procédure font foi (le cours n'en donne aucune non plus).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, hote = document.getElementById("scene-lecon");
  if (!hote) return;
  if (!D) { hote.hidden = true; return; } // moteur du Voyage absent : pas de cadre vide
  const NS = "http://www.w3.org/2000/svg";
  const C = { navy: "#1b3a63", bleu: "#3d7fca", rouge: "#c0392b", jaune: "#e2a72b", vert: "#1e7e54", gris: "#637285", orange: "#ff6b35", orangeF: "#c9451a", papier: "#fffdf8" };
  const PEAU = "#f6d7bd", ENCRE = "#10233c", POLICE = "Calibri, 'Segoe UI', Arial, sans-serif";
  const GAZ = { air: "#7d95ae", azote: "#3d7fca", r290: "#e2662c" }; // la couleur de ce qui circule : l'air, l'azote, le R-290 (inflammable)
  const ecrire = (p, x, y, s, at) => D.texte(p, x, y, s, Object.assign({ "font-size": 22, "font-family": POLICE, "font-weight": 600, fill: ENCRE }, at || {}));
  const marquer = g => g.querySelectorAll("text").forEach(t => { if (t.textContent === "Studio") t.textContent = "Fluide"; }); // cartouche du produit (charte R9)
  const passe = (t, a, b) => D.lisse((t - a) / (b - a)); // 0 avant a, 1 après b

  /* ---------- les étapes (l'ordre du parcours) ---------- */
  const ETAPES = [
    { nom: "Ouvrir", duree: 6, dire: "sous azote, zone ventilée : on remplace, on referme." },
    { nom: "Éprouver", duree: 8.5, dire: "l’azote passe par le mano-détendeur, jamais en direct." },
    { nom: "Tirer au vide", duree: 7, dire: "on ouvre, la pompe aspire l’air et l’humidité." },
    { nom: "Observer", duree: 7, dire: "on isole la pompe : le vacuomètre dit si le vide tient." },
    { nom: "Charger", duree: 8, dire: "la balance suit la masse : on ferme à la masse prévue." },
    { nom: "Contrôler", duree: 8.5, dire: "un signal répété suspend la remise en service." }
  ];
  const DOSSIER = { preparer: 0, ouvrir: 0, eprouver: 1, charger: 2, controler: 5, controle: 0 };
  const DEBUT = ETAPES.map((e, i) => ETAPES.slice(0, i).reduce((a, x) => a + x.duree, 0)), TOTAL = ETAPES.reduce((a, x) => a + x.duree, 0);
  const DEV = ["", "azote", "pompe", "pompe", "r290", ""]; // ce qui est branché sur le flexible jaune à chaque étape

  /* le détecteur : où est le bout de sa sonde (x), selon l'instant de l'étape 6 — 836 et 953 sont les deux raccords du composant */
  const DET_X = [[0, 836], [2.2, 836], [3.4, 953], [4.3, 953], [5.1, 895], [5.9, 953], [8.5, 953]];

  /* l'état du plateau à l'étape k, au temps local τ (secondes) ; vari : à l'épreuve, 0 = la pression tient, 1 = elle chute (une fois sur deux) */
  function etat(k, tau, vari) {
    const e = { vue: 1, ventil: 0, mB: 0, mA: 0, pompe: 0, gaz: "air", dir: 1, dB: 0, dA: 0, fB: 0, fA: 0, eau: 0, vacuo: 0,
      geste: null, anneau: null, titre: null, mot: null, s1: "", s2: "", comp: { ancien: 0, neuf: 1, haut: 0, bas: 0, ouvert: 0 }, fuite: 0, detecteur: 0, detX: 836, signal: 0 };
    if (k === 0) { // ouvrir : sous azote, en zone ventilée, on dépose le composant, on monte le neuf, on referme
      e.vue = 0; e.ventil = 1; e.detecteur = 1; e.gaz = "azote"; e.dB = e.dA = 0.4; e.s1 = "circuit sous azote";
      e.comp = tau < 1.2 ? { ancien: 1, neuf: 0, haut: 0, bas: 0, ouvert: 0 } : tau >= 4.8 ? { ancien: 0, neuf: 1, haut: 0, bas: 0, ouvert: 0 }
        : { ancien: 1 - passe(tau, 1.6, 2.4), neuf: passe(tau, 2.8, 3.4), haut: passe(tau, 1.2, 2.4), bas: 1 - passe(tau, 3.2, 4.6), ouvert: passe(tau, 1.2, 1.8) * (1 - passe(tau, 4.4, 4.8)) };
      e.geste = tau < 2.9 ? ["comp", -1, 0.8, 2.9] : tau < 5 ? ["comp", 1, 3, 5] : null;
      e.mot = tau < 1.4 ? "en place" : tau < 3.2 ? "déposé" : tau < 4.8 ? "neuf" : "monté";
      e.s2 = tau < 1.6 ? "" : tau < 4.8 ? "circuit ouvert" : "circuit refermé";
      if (tau >= 5) e.titre = ["circuit refermé", "complètement"];
    }
    if (k === 1) { // éprouver : l'azote sec passe par le mano-détendeur, la pression monte, puis elle tient — ou elle chute et l'azote s'échappe par le raccord neuf
      e.vue = passe(tau, 0.3, 0.6); e.ventil = 1 - passe(tau, 0, 0.3); e.detecteur = e.ventil; e.gaz = "azote"; e.dir = -1; e.s1 = "azote + mano-détendeur";
      e.mB = passe(tau, 0.9, 1.7); e.mA = passe(tau, 2.4, 3.2);
      e.geste = tau < 2 ? ["mB", -1, 0.5, 2] : tau < 3.4 ? ["mA", -1, 2, 3.4] : tau < 6.2 ? ["reg", 1, 3.4, 6.2] : null; // les deux vannes s'ouvrent, puis la main règle le mano-détendeur : l'azote ne passe que par lui
      const monte = passe(tau, 3.6, 6.2), reste = 1 - 0.92 * passe(tau, 4.6, 6.4), debit = passe(tau, 3.5, 3.9), perte = vari ? passe(tau, 5.4, 8.4) : 0;
      e.dB = 0.4 + 0.6 * (e.mB > 0.5 ? monte * (1 - 0.65 * perte) : 0); e.dA = 0.4 + 0.6 * (e.mA > 0.5 ? monte * (1 - 0.65 * perte) : 0);
      e.fB = e.mB * debit * reste; e.fA = e.mA * debit * reste; e.fuite = vari ? passe(tau, 5.2, 5.9) : 0;
      e.s2 = tau < 3.5 ? "" : tau < 6.2 ? "la pression monte" : vari ? "la pression chute" : "la pression tient"; e.mot = tau < 6 ? "on règle" : "réglé";
      if (tau >= 6.2) { e.anneau = ["manos", 6.2, 99]; e.titre = vari ? ["la pression chute :", "STOP, on localise"] : ["pression stable :", "on lit le manomètre"]; }
    }
    if (k === 2) { // tirer au vide : on ouvre, puis la pompe aspire l'air et l'humidité
      e.vacuo = passe(tau, 0.25, 0.55); e.eau = 0.6 - 0.48 * passe(tau, 3.4, 7);
      e.mB = passe(tau, 0.8, 1.6); e.mA = passe(tau, 2, 2.8); e.pompe = passe(tau, 3.2, 3.6);
      e.dB = e.dA = 1 - 0.8 * passe(tau, 3.4, 7);
      e.geste = tau < 1.8 ? ["mB", -1, 0.4, 1.8] : tau < 3 ? ["mA", -1, 1.8, 3] : null;
      e.s1 = e.pompe > 0.5 ? "pompe en marche" : "pompe arrêtée"; if (tau > 3.4) e.s2 = "le vide se creuse";
      if (tau >= 3) e.titre = ["chemin ouvert :", "la pompe aspire"];
      e.fB = e.pompe * e.mB; e.fA = e.pompe * e.mA;
    }
    if (k === 3) { // observer : on isole la pompe, on l'arrête, on lit le vacuomètre
      e.vacuo = 1; e.dB = e.dA = 0.2; e.eau = 0.12; e.pompe = 1 - passe(tau, 3.4, 3.8);
      e.mB = 1 - passe(tau, 0.6, 1.4); e.mA = 1 - passe(tau, 2, 2.8);
      e.geste = tau < 1.7 ? ["mB", 1, 0.2, 1.7] : tau < 3.1 ? ["mA", 1, 1.6, 3.1] : null;
      e.s1 = e.pompe > 0.5 ? "pompe en marche" : "pompe arrêtée";
      e.s2 = tau < 2.9 ? "le vide se creuse" : tau < 4.4 ? "circuit isolé" : "le vide tient";
      if (tau >= 3.1 && tau < 4.4) e.titre = ["circuit isolé :", "on peut arrêter"];
      if (tau >= 4.4) { e.anneau = ["vacuo", 4.4, 99]; e.titre = ["pompe arrêtée :", "on lit le vacuomètre"]; }
      e.fB = e.pompe * e.mB; e.fA = e.pompe * e.mA;
    }
    if (k === 4) { // charger : le R-290 passe de la bouteille posée sur la balance au circuit, on ferme à la masse prévue
      e.gaz = "r290"; e.dir = -1; e.vacuo = 1 - passe(tau, 0, 0.3); e.eau = 0.12 * (1 - passe(tau, 0, 0.6));
      e.mB = passe(tau, 0.8, 1.6) * (1 - passe(tau, 5.2, 6)); e.mA = 0;
      e.geste = tau < 1.8 ? ["mB", -1, 0.3, 1.8] : tau >= 4.7 && tau < 6.2 ? ["mB", 1, 4.7, 6.2] : null;
      e.dB = 0.9 * passe(tau, 1.2, 5.4); e.fB = e.mB;
      e.s1 = tau >= 1.2 ? "charge suivie par pesée" : ""; e.s2 = tau >= 5.6 ? "masse prévue : on ferme" : "";
      if (tau >= 1.8 && tau < 4.7) { e.anneau = ["balance", 1.8, 4.7]; e.titre = ["la balance suit", "la masse"]; }
      if (tau >= 6.2) e.titre = ["masse prévue :", "vanne fermée"];
    }
    if (k === 5) { // contrôler : le détecteur adapté passe aux raccords, la vapeur qui fuit se voit
      e.vue = 1 - passe(tau, 0, 0.3); e.ventil = passe(tau, 0.3, 0.6); e.detecteur = e.ventil; e.gaz = "r290"; e.dB = e.dA = 0.8; e.s1 = "détecteur adapté";
      e.detX = D.courbe(DET_X, tau); e.fuite = passe(tau, 3, 3.6);
      e.geste = ["det", tau > 4.6 && tau < 5.5 ? -1 : 1, 0.3, 8.3];
      const pres = e.detX > 940 && e.fuite > 0.5; // près du raccord qui fuit, le détecteur réagit
      e.signal = tau < 3 ? 0 : !pres ? 3 : tau < 5.5 ? 1 : 2; // 0 : rien encore, 1 : signal, 2 : signal répété, 3 : la sonde s'est écartée du raccord
      e.s2 = tau < 0.8 ? "" : e.signal === 0 ? "aucun signal" : e.signal === 1 ? "signal" : e.signal === 2 ? "signal répété : STOP" : "";
      if (tau >= 7) e.titre = ["signal répété :", "on suspend"];
    }
    return e;
  }

  /* ---------- le technicien : bonhomme « plein » de HoCourant (recopié de legislation/scenes/fluidique.js) ----------
     Repère : tête en haut (y 0), pieds à y 72, regard vers la droite ; bras tourné autour de l'épaule (2, 24). */
  function bonhomme(parent, o) {
    const g = D.el("g", {}, parent);
    D.el("ellipse", { cx: 0, cy: 73, rx: 13, ry: 2.5, fill: C.navy, opacity: 0.15 }, g);
    const corps = D.el("g", {}, g);
    D.el("path", { d: "M-2 25 L-10 46", stroke: C.navy, "stroke-width": 6, "stroke-linecap": "round" }, corps);
    D.el("circle", { cx: -10, cy: 47, r: 3.6, fill: PEAU, stroke: C.navy, "stroke-width": 1.8 }, corps);
    const jg = D.el("g", {}, corps), jd = D.el("g", {}, corps);
    D.el("path", { d: "M-2 48 L-9 71", stroke: C.navy, "stroke-width": 7, "stroke-linecap": "round" }, jg);
    D.el("path", { d: "M-10 72 H-3", stroke: "#0f2440", "stroke-width": 5, "stroke-linecap": "round" }, jg);
    D.el("path", { d: "M2 48 L9 71", stroke: C.navy, "stroke-width": 7, "stroke-linecap": "round" }, jd);
    D.el("path", { d: "M8 72 H15", stroke: "#0f2440", "stroke-width": 5, "stroke-linecap": "round" }, jd);
    D.el("path", { d: "M-8 24 Q-8 19 -3 19 H3 Q8 19 8 24 V49 H-8 Z", fill: "#84b7ec", stroke: C.navy, "stroke-width": 2 }, corps);
    D.el("path", { d: "M-8 38 H8", stroke: C.papier, "stroke-width": 3 }, corps);
    D.el("path", { d: "M0 20 V49", stroke: C.navy, "stroke-width": 1.2 }, corps);
    D.el("rect", { x: -2.5, y: 16, width: 5, height: 5, fill: PEAU }, corps);
    D.el("circle", { cx: 0, cy: 10, r: 9, fill: PEAU, stroke: C.navy, "stroke-width": 2.2 }, corps);
    D.el("path", { d: "M-9 9.5 Q-9.5 0.5 0 0.8 Q9 0.5 9 7 Q4 4 -1 4.8 Q-6 5.5 -9 9.5Z", fill: C.navy }, corps);
    if (o.casquette) D.el("path", { d: "M-9.6 8 Q-9.6 -1.2 0 -1 Q9 -0.8 9.4 6 L16 7.2 Q16.5 9 14 9 H-9.6 Z", fill: C.navy }, corps);
    D.el("circle", { cx: -4.5, cy: 11, r: 1.7, fill: PEAU, stroke: C.navy, "stroke-width": 1 }, corps);
    const yeux = [2.5, 6.3].map(x => D.el("ellipse", { cx: x, cy: 10, rx: 1.2, ry: 1.2, fill: ENCRE }, corps));
    D.el("path", { d: "M2.8 14 Q4.8 15.6 6.8 14", stroke: ENCRE, "stroke-width": 1.2, fill: "none", "stroke-linecap": "round" }, corps);
    const bras = D.el("g", {}, corps);
    D.el("path", { d: "M2 24 L12 48", stroke: C.navy, "stroke-width": 6, "stroke-linecap": "round" }, bras);
    D.el("circle", { cx: 12.5, cy: 49, r: 3.8, fill: PEAU, stroke: C.navy, "stroke-width": 1.8 }, bras);
    return function (p) { // p : { x, y, k, t, bras (degrés, 0 = bras pendant) }
      g.setAttribute("transform", `translate(${p.x} ${p.y}) scale(${p.k})`);
      corps.setAttribute("transform", `translate(0 ${(Math.sin(p.t * 2.1) * 0.35).toFixed(2)})`);
      bras.setAttribute("transform", `rotate(${p.bras.toFixed(1)} 2 24)`);
      const ferme = D.frac(p.t / 3.7 + (o.dephasage || 0)) < 0.035;
      yeux.forEach(e => e.setAttribute("ry", ferme ? 0.25 : 1.2));
    };
  }

  /* ---------- le dessin (repère 1060 × 276 : gros plan x 0-262, montage x 270-1060) ---------- */
  const MX = 600, MY = 112, MS = 4.2;                        // le manifold (repère du symbole manometres.svg)
  const SB = [470, 188], SA = [730, 188], SS = 1;           // les vannes de service, debout sur leurs piquages
  const TECH = { x: 66, y: 106, k: 2.25 }, MAIN = [127.6, 138.4], BRAS_VANNE = -87.9; // la main sur la poignée du gros plan
  const VANNES = { // triangles de la vanne fermée, dans le repère de chaque symbole
    mB: ["-13,-3 -13,4 -9,0.5", "-5,-3 -5,4 -9,0.5"], mA: ["4.7,-3 4.7,4 8.7,0.5", "12.7,-3 12.7,4 8.7,0.5"] };
  const TITRES = { mB: ["vanne BP", "du manifold"], mA: ["vanne HP", "du manifold"], reg: ["mano-détendeur", "valeur documentée"], comp: ["composant", "à remplacer"], det: ["détecteur", "hydrocarbures"] };
  /* le composant remplacé : le filtre déshydrateur du circuit (symbole de la bibliothèque), sur la ligne HP entre ses deux raccords */
  const CX0 = 836, CX1 = 953, CY = 232;
  /* les pictogrammes du site : fichier, puis cadre du contenu (x0, y0, x1, y1) dans l'image 512 × 512 */
  const PICT = { azote: ["azote", 203, 31, 310, 480], fluide: ["bouteille-fluide", 144, 32, 367, 480], balance: ["balance", 41, 147, 471, 365], detecteur: ["detecteur-fuite", 114, 42, 397, 471], cone: ["balisage", 79, 41, 433, 471] };
  const SONDE = [0.92, 0.86]; // le bout de la sonde du détecteur, dans le cadre de son contenu (fractions de la largeur et de la hauteur)
  function pict(parent, nom, x, y, h) { // pose le pictogramme : son contenu a la hauteur h, coin haut-gauche en (x, y)
    const [f, a, b, c, d] = PICT[nom], s = h / (d - b);
    return D.el("image", { href: "../bibliotheque/icones/ico-" + f + ".png", x: x - a * s, y: y - b * s, width: 512 * s, height: 512 * s }, parent);
  }
  const largeur = (nom, h) => { const [, a, b, c, d] = PICT[nom]; return (c - a) * h / (d - b); };

  function image(parent, href, x, y, l, h, multiplier) {
    const i = D.el("image", { href: href, x: x, y: y, width: l, height: h, preserveAspectRatio: "xMidYMid meet" }, parent);
    if (multiplier) i.setAttribute("style", "mix-blend-mode:multiply"); // le fond blanc du symbole s'efface sur le papier
    return i;
  }
  function noircir(parent, cle) { // la vanne fermée, noircie sur sa propre forme
    const g = D.el("g", { opacity: 0 }, parent);
    VANNES[cle].forEach(pts => D.el("polygon", { points: pts, fill: C.navy }, g));
    return g;
  }
  function flexible(parent, d, couleur) { // un flexible : gaine de couleur, âme claire
    const g = D.el("g", {}, parent);
    D.el("path", { d: d, fill: "none", stroke: couleur, "stroke-width": 11, "stroke-linecap": "round" }, g);
    D.el("path", { d: d, fill: "none", stroke: "#f4f8fc", "stroke-width": 4.5, "stroke-linecap": "round" }, g);
    return g;
  }
  function flux(parent, d) { // ce qui passe : des molécules séparées qui filent le long du chemin (couleur, densité et sens selon le gaz)
    return D.el("path", { d: d, fill: "none", stroke: GAZ.air, "stroke-width": 6, "stroke-linecap": "round", "stroke-dasharray": "0.1 15", opacity: 0 }, parent);
  }
  function fleche(parent, horaire) { // le sens du geste autour de la poignée : à droite on ferme, à gauche on ouvre
    const [cx, cy] = MAIN, r = 27, p = a => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
    const [a0, a1] = horaire ? [200, 340] : [340, 200], q0 = p(a0), q1 = p(a1), dir = (a1 + (horaire ? 90 : -90)) * Math.PI / 180;
    const g = D.el("g", { opacity: 0 }, parent), ux = Math.cos(dir), uy = Math.sin(dir);
    D.el("path", { d: `M${q0[0].toFixed(1)} ${q0[1].toFixed(1)} A${r} ${r} 0 0 ${horaire ? 1 : 0} ${q1[0].toFixed(1)} ${q1[1].toFixed(1)}`, fill: "none", stroke: C.orange, "stroke-width": 4.5, "stroke-linecap": "round" }, g);
    const pointe = [[q1[0] + ux * 9, q1[1] + uy * 9], [q1[0] - uy * 7 - ux * 3, q1[1] + ux * 7 - uy * 3], [q1[0] + uy * 7 - ux * 3, q1[1] - ux * 7 - uy * 3]];
    D.el("polygon", { points: pointe.map(q => q.map(v => v.toFixed(1)).join(",")).join(" "), fill: C.orange }, g);
    return g;
  }
  function droite(parent) { // le sens d'un geste qui ne tourne pas (on retire, on pose, on passe) : flèche droite, pointe en haut au repos
    const g = D.el("g", { opacity: 0 }, parent);
    D.el("path", { d: "M0 26 V-14", stroke: C.orange, "stroke-width": 4.5, "stroke-linecap": "round" }, g);
    D.el("polygon", { points: "0,-30 -10,-12 10,-12", fill: C.orange }, g);
    return g;
  }
  function panache(parent, nb, graine, trait, sens) { // une vapeur qui s'échappe : molécules qui s'écartent du point de fuite puis coulent (le R-290, plus lourd que l'air) ou montent (l'azote : sens -1)
    const r = D.alea(graine), P = [];
    for (let i = 0; i < nb; i++) P.push({ ph: r(), per: 2 + r() * 1.2, dx: (r() - 0.3) * 100, haut: 8 + r() * 14, chute: (34 + r() * 34) * (sens || 1), taille: 3.8 + r() * 2.8, c: D.el("circle", { opacity: 0, stroke: trait, "stroke-width": 1.2 }, parent) });
    return (t, x0, y0, couleur, intensite) => P.forEach(p => {
      const f = D.frac(t / p.per + p.ph);
      p.c.setAttribute("cx", (x0 + p.dx * f).toFixed(1)); p.c.setAttribute("cy", (y0 - p.haut * 4 * f * (1 - f) + p.chute * f * f).toFixed(1));
      p.c.setAttribute("r", (p.taille * (0.6 + 0.7 * f)).toFixed(1)); p.c.setAttribute("fill", couleur);
      const o = intensite * D.fenetre(f, 0, 1, 0.25); p.c.setAttribute("opacity", (0.85 * o).toFixed(2)); p.c.setAttribute("fill-opacity", 0.55); p.c.setAttribute("stroke-opacity", (0.7 * o).toFixed(2));
    });
  }

  function dessiner(svg) {
    svg.setAttribute("viewBox", "0 0 1060 276");
    const g = D.el("g", {}, svg);
    marquer(D.filigrane(g, [[132, 236], [880, 130]], 220));
    /* ===== le montage ===== */
    const m = D.el("g", {}, g);
    // la zone (vues « circuit ») : le ventilateur de la bibliothèque et l'air qui traverse, deux cônes qui balisent le poste
    const zone = D.el("g", {}, m);
    image(zone, "../symboles/ventilateur.svg", 277.2, 74, 110, 88);
    ecrire(zone, 332, 178, "ventilation", { "text-anchor": "middle" });
    pict(zone, "cone", 548, 150, 54); pict(zone, "cone", 1008, 150, 54);
    const chevrons = [0, 1, 2, 3, 4, 5].map(() => D.chevron(zone));
    // les deux lignes de l'installation (cuivre) : BP à gauche, HP à droite avec le composant remplacé ; l'eau restée dans la ligne BP, l'air dedans
    D.tube(m, 270, 212, 216, 40, "cuivre", false, "#f4f8fc");
    D.tube(m, 714, 212, CX0 - 714, 40, "cuivre", false, "#f4f8fc");
    D.tube(m, CX1, 212, 1060 - CX1, 40, "cuivre", false, "#f4f8fc");
    const eauG = D.el("g", {}, m), niveau = { v: 0.6 };
    const eau = D.liquide(eauG, { x0: 290, x1: 452, yh: 222, yb: 242, niveau: x => niveau.v * Math.max(0, 1 - Math.pow((x - 371) / 76, 2)), couleur: () => "#8fb7d9", opacite: 0.85, pas: 6 });
    const bulles = D.bulles(D.el("g", {}, m), 7, 41);
    const fcB = flux(m, "M276 232 H470 V172"), fcA1 = flux(m, `M1054 232 H${CX1}`), fcA2 = flux(m, `M${CX1} 232 H${CX0}`), fcA3 = flux(m, `M${CX0} 232 H730 V172`);
    // le composant (le filtre déshydrateur, symbole de la bibliothèque) : l'ancien, puis le neuf qui prend sa place
    const comps = [0, 1].map(() => {
      const c = D.el("g", {}, m);
      image(c, "../symboles/filtre_deshydrateur.svg", CX0 - 22, CY - 42, 160, 80);
      return c;
    });
    // piquages et vannes de service
    [SB, SA].forEach(([x]) => D.el("rect", { x: x - 8, y: 166, width: 16, height: 48, fill: "url(#vm-cuivre-h)" }, m));
    [SB, SA].forEach(([x, y]) => image(D.el("g", { transform: `translate(${x} ${y}) rotate(90) scale(${SS})` }, m), "../symboles/vanne_isolement.svg", -19, -10, 40, 20));
    // la vue « manifold » : tout ce qui se branche sur les deux piquages
    const vm = D.el("g", {}, m);
    // la pompe à vide entre les deux piquages, le vacuomètre côté circuit (au tirage au vide seulement)
    const pompe = D.el("g", {}, vm), pompeV = D.el("g", {}, pompe);
    image(pompeV, "symboles/bomba-vacio.svg", 569, 158.75, 105.4, 89.9, true);
    const vacuo = D.el("g", {}, vm); image(vacuo, "symboles/manometro.svg", 307.2, 153.2, 45.6, 81.6, true);
    // l'azote : la bouteille, le mano-détendeur (régulateur de pression à manomètre, tourné dans le sens du fluide)
    const azote = D.el("g", {}, vm);
    pict(azote, "azote", 681.5, 183, 84);
    const regul = D.el("g", { transform: "translate(645 178) rotate(-90) scale(1.25)" }, azote);
    image(regul, "symboles/50101322_pressure_regulator.svg", -39, -44, 78, 88, true);
    D.el("path", { d: "M682.5 190.5 H690", stroke: C.navy, "stroke-width": 5, "stroke-linecap": "round", fill: "none" }, azote);
    ecrire(azote, 628, 236, "mano-", { "text-anchor": "middle" }); ecrire(azote, 628, 262, "détendeur", { "text-anchor": "middle" });
    // le R-290 : la bouteille posée sur la balance
    const r290 = D.el("g", {}, vm);
    pict(r290, "balance", 561, 227, 39.6); pict(r290, "fluide", 583.5, 169, 66);
    ecrire(r290, 574, 199, "R-290", { "text-anchor": "end", "font-weight": 700, fill: C.orangeF });
    // les flexibles (le jaune dépend de ce qu'on branche), puis le manifold par-dessus (ses raccords cachent les bouts)
    flexible(vm, "M537 145.6 C537 162 470 152 470 168", C.bleu); flexible(vm, "M667.2 145.6 C667.2 162 730 152 730 168", C.rouge);
    const JAUNE = { pompe: "M600 145.6 V182", azote: "M600 145.6 V165 Q600 178 607.5 178", r290: "M600 145.6 V175" };
    const flexJ = {}, fy = {};
    Object.entries(JAUNE).forEach(([nom, d]) => { flexJ[nom] = flexible(vm, d, C.jaune); });
    const fhB = flux(vm, "M470 168 C470 152 537 162 537 145.6 V112 H600"), fhA = flux(vm, "M730 168 C730 152 667.2 162 667.2 145.6 V112 H600");
    Object.entries(JAUNE).forEach(([nom, d]) => { fy[nom] = flux(vm, d.replace("M600 145.6", "M600 112 V145.6")); });
    const man = D.el("g", { transform: `translate(${MX} ${MY}) scale(${MS})` }, vm);
    image(man, "../symboles/manometres.svg", -24, -25, 50, 40);
    const vanneM = { mB: noircir(man, "mB"), mA: noircir(man, "mA") };
    // la pièce qui agit s'allume
    const anneau = D.el("rect", { rx: 9, fill: "none", stroke: C.orange, "stroke-width": 4, opacity: 0 }, m);
    const CADRES = { mB: [540, 80, 45, 55], mA: [614, 80, 45, 55], comp: [CX0 - 4, 209, CX1 - CX0 + 8, 42],
      reg: [598, 154, 80, 46], manos: [511, 27, 185, 52], vacuo: [302, 157, 56, 83], balance: [556, 223, 88, 48] };
    // le détecteur (au repos près du composant, puis sa sonde longe les raccords), la vapeur qui fuit
    const detecteur = D.el("g", {}, m), detH = 72, detW = largeur("detecteur", detH);
    pict(detecteur, "detecteur", 0, 0, detH);
    const nuage = panache(m, 22, 77, C.orangeF), nuageN = panache(m, 16, 53, C.bleu, -1);
    // légendes du montage (jamais sur un tracé)
    ecrire(vm, MX, 18, "manifold", { "font-weight": 700, fill: C.navy, "text-anchor": "middle" });
    ecrire(vm, 509, 58, "BP", { "font-weight": 700, fill: C.bleu, "text-anchor": "end" });
    ecrire(vm, 700, 58, "HP", { "font-weight": 700, fill: C.rouge });
    ecrire(vm, 752, 195, "vannes de service");
    const legVacuo = D.el("g", {}, vm);
    ecrire(legVacuo, 330, 124, "vacuomètre", { "text-anchor": "middle" });
    ecrire(legVacuo, 330, 150, "côté circuit", { "text-anchor": "middle", fill: C.gris });
    ecrire(legVacuo, 371, 270, "humidité", { "text-anchor": "middle", fill: "#3f6b93" });
    const legAzote = ecrire(m, 371, 270, "azote", { "text-anchor": "middle", fill: C.bleu, "font-weight": 700 });
    const legCircuit = D.el("g", {}, m);
    ecrire(legCircuit, 895, 272, "composant", { "text-anchor": "middle" }); ecrire(legCircuit, 786, 196, "détecteur", { "text-anchor": "middle" });
    const pas = (y, s, fond) => D.pastille(m, 1052, y, s, fond, 22, "end");
    const P1 = {}, P2 = {};
    [["circuit sous azote", C.bleu], ["azote + mano-détendeur", C.bleu], ["pompe arrêtée", C.gris], ["pompe en marche", C.vert], ["charge suivie par pesée", C.bleu], ["détecteur adapté", C.bleu]].forEach(([s, f]) => { P1[s] = pas(34, s, f); });
    [["circuit ouvert", C.orangeF], ["circuit refermé", C.vert], ["la pression monte", C.bleu], ["la pression tient", C.vert], ["la pression chute", C.rouge], ["le vide se creuse", C.bleu], ["circuit isolé", C.navy], ["le vide tient", C.vert],
      ["masse prévue : on ferme", C.vert], ["aucun signal", C.vert], ["signal", C.orangeF], ["signal répété : STOP", C.rouge]].forEach(([s, f]) => { P2[s] = pas(76, s, f); });
    /* ===== le gros plan du geste ===== */
    const gp = D.el("g", {}, g);
    const zoomM = {}, zoomMgr = {};
    [["mB", -14], ["mA", 3.7]].forEach(([cle, x0]) => { // la vanne du manifold, vue de près (le même symbole, agrandi)
      const z = D.el("svg", { x: MAIN[0] - 45, y: MAIN[1] - 22.5, width: 103.5, height: 126, viewBox: `${x0} -8.5 11.5 14`, opacity: 0 }, gp);
      image(z, "../symboles/manometres.svg", -24, -25, 50, 40);
      zoomM[cle] = z; zoomMgr[cle] = noircir(z, cle);
    });
    // le mano-détendeur, vu de près (le même symbole, agrandi et retourné pour que son réglage soit du côté de la main) : tenu par son bouton de réglage
    const zR = D.el("g", { opacity: 0 }, gp), ZR = 2.3;
    image(D.el("g", { transform: `translate(${MAIN[0] + 22 * ZR} ${MAIN[1] + 12 * ZR}) scale(${-ZR} ${ZR})` }, zR), "symboles/50101322_pressure_regulator.svg", -39, -44, 78, 88, true);
    // le composant, vu de près (le même symbole, agrandi) : tenu par le dessus, au tiers de son corps
    const zC = D.el("g", { opacity: 0 }, gp), zCh = D.el("g", {}, zC), ZS = 3.6;
    const zCi = image(zCh, "../symboles/filtre_deshydrateur.svg", MAIN[0] - (-10 + 25) * ZS, MAIN[1] - (-5 + 10) * ZS, 40 * ZS, 20 * ZS);
    // le détecteur, vu de près (le même pictogramme, agrandi) : tenu par son corps
    const zD = D.el("g", { opacity: 0 }, gp), zDh = D.el("g", {}, zD), ZH = 150, ZW = largeur("detecteur", ZH);
    pict(zDh, "detecteur", MAIN[0] - 0.3 * ZW, MAIN[1] - 0.45 * ZH, ZH);
    const tech = bonhomme(gp, { casquette: true, dephasage: 0.3 });
    const ferme = fleche(gp, true), ouvre = fleche(gp, false);
    const dr = droite(gp);
    const titre1 = ecrire(gp, 131, 26, "", { "font-weight": 700, fill: C.navy, "text-anchor": "middle" });
    const titre2 = ecrire(gp, 131, 52, "", { "text-anchor": "middle", fill: C.gris });
    const mot = ecrire(gp, 150, 266, "", { "font-weight": 700, "text-anchor": "middle" });
    let vu = "mB", brasLisse = -15;
    const place = (el, a) => { const v = a.toFixed(2); if (el.dataset.a === v) return; el.dataset.a = v; el.setAttribute("opacity", v); el.style.display = a < 0.01 ? "none" : ""; }; // n'écrit que ce qui change

    return function (k, tau, t, vari) {
      const e = etat(k, tau, vari);
      /* les deux vues : le circuit seul (zone ventilée et balisée, détecteur) ou le circuit avec son montage */
      place(vm, e.vue); place(zone, e.ventil); place(legCircuit, k <= 1 ? e.ventil : 0); place(detecteur, e.detecteur);
      const aDev = nom => DEV[k] === nom ? (DEV[k - 1] === nom || !DEV[k - 1] ? 1 : passe(tau, 0.25, 0.55)) : DEV[k - 1] === nom ? 1 - passe(tau, 0, 0.25) : 0; // celui d'avant s'efface, puis l'appareil de l'étape arrive
      const devs = { pompe: pompe, azote: azote, r290: r290 };
      Object.keys(devs).forEach(nom => { const a = aDev(nom); place(devs[nom], a); place(flexJ[nom], a); });
      place(vacuo, e.vacuo); place(legVacuo, e.vacuo); place(legAzote, e.gaz === "azote" ? 1 : 0);
      /* la zone : l'air traverse le poste */
      chevrons.forEach((c, i) => { const x = 392 + D.frac(i / 6 + t * 0.07) * 640; c(x, 118, -90, "#9fb6cc", e.ventil * D.fenetre(x, 392, 1032, 40)); });
      /* l'eau, ce qui circule dans les lignes */
      niveau.v = e.eau; eau.maj(t); place(eauG, e.vacuo);
      bulles(t, q => { const x = 335 + q * 72; return [x, 240, eau.surface(x, t) + 3, e.fB > 0.5 && e.eau > 0.14 ? 1 : 0]; });
      const vit = 34, col = GAZ[e.gaz];
      const montrer = (p, dens, v, vue) => { // une file de molécules : couleur du gaz, plus serrées quand la pression monte, sens du courant ; immobile, elle frémit
        p.setAttribute("stroke", col); p.setAttribute("opacity", (vue === false || dens <= 0.01 ? 0 : e.gaz === "air" ? 0.12 + 0.78 * Math.min(1, dens) : 0.4 + 0.5 * Math.min(1, dens)).toFixed(2));
        p.setAttribute("stroke-dasharray", `0.1 ${(21 - 13 * Math.min(1, dens)).toFixed(1)}`);
        p.setAttribute("stroke-dashoffset", (-t * vit * v * e.dir + (v > 0.05 ? 0 : Math.sin(t * 2.4 + dens * 9) * 1.6)).toFixed(1));
      };
      const ferme_ = e.comp.ouvert < 0.5; // le circuit est fermé : les molécules traversent le composant
      montrer(fcB, e.dB, e.fB); montrer(fcA1, e.dA, e.fA); montrer(fcA3, e.dA, e.fA); montrer(fcA2, e.dA, e.fA, ferme_);
      const circuit = k === 0 || k === 5, flJ = Math.max(e.fB, e.fA);
      montrer(fhB, e.dB, e.fB, !circuit && e.fB > 0.02); montrer(fhA, e.dA, e.fA, !circuit && e.fA > 0.02);
      Object.keys(fy).forEach(nom => montrer(fy[nom], Math.max(e.fB > 0.02 ? e.dB : 0, e.fA > 0.02 ? e.dA : 0), flJ, !circuit && aDev(nom) > 0.5 && flJ > 0.02));
      vanneM.mB.setAttribute("opacity", (1 - e.mB).toFixed(2)); vanneM.mA.setAttribute("opacity", (1 - e.mA).toFixed(2));
      pompeV.setAttribute("transform", e.pompe > 0.5 ? `translate(${(Math.sin(t * 61) * 0.9).toFixed(2)} ${(Math.cos(t * 47) * 0.6).toFixed(2)})` : "");
      /* le composant : l'ancien monte et sort, le neuf descend et prend sa place */
      comps[0].setAttribute("transform", `translate(0 ${(-86 * e.comp.haut).toFixed(1)})`); place(comps[0], e.comp.ancien);
      comps[1].setAttribute("transform", `translate(0 ${(-86 * e.comp.bas).toFixed(1)})`); place(comps[1], e.comp.neuf);
      /* la vapeur qui fuit au raccord, le détecteur */
      nuage(t, CX1 + 2, 218, GAZ.r290, k === 5 ? e.fuite : 0); nuageN(t, CX1 + 2, 216, GAZ.azote, k === 1 ? e.fuite : 0);
      const dx = k === 5 ? e.detX - SONDE[0] * detW + Math.sin(t * 3.1) * 3 : 760, dy = k === 5 ? 203 - SONDE[1] * detH : 100;
      detecteur.setAttribute("transform", `translate(${dx.toFixed(1)} ${dy.toFixed(1)})`);
      /* les états (pastilles) */
      Object.entries(P1).forEach(([n, p]) => p.setAttribute("opacity", n === e.s1 ? 1 : 0)); Object.entries(P2).forEach(([n, p]) => p.setAttribute("opacity", n === e.s2 ? 1 : 0));
      /* le geste */
      if (e.geste) vu = e.geste[0];
      const [cle, sens, g0, g1] = e.geste || [vu, 0, 0, 0];
      const enMain = e.geste ? D.fenetre(tau, g0, g1, 0.3) : 0, tourne = e.geste ? D.fenetre(tau, g0 + 0.35, g1 - 0.35, 0.15) : 0;
      const valve = cle[0] === "m", tourneV = valve || cle === "reg"; // une vanne ou un bouton qui tourne (sinon : le composant ou le détecteur)
      const [cible, opa] = e.geste ? [cle === "det" ? null : cle, enMain] : e.anneau ? [e.anneau[0], D.fenetre(tau, e.anneau[1], e.anneau[2], 0.35)] : [null, 0];
      if (cible) { const [x, y, l, h] = CADRES[cible]; Object.entries({ x: x, y: y, width: l, height: h }).forEach(([a, v]) => anneau.setAttribute(a, v)); }
      anneau.setAttribute("opacity", (cible ? opa : 0).toFixed(2));
      const ouvert = cle === "mB" ? e.mB : cle === "mA" ? e.mA : 1;
      zoomM.mB.setAttribute("opacity", cle === "mB" ? 1 : 0); zoomM.mA.setAttribute("opacity", cle === "mA" ? 1 : 0);
      zC.setAttribute("opacity", cle === "comp" ? 1 : 0); zD.setAttribute("opacity", cle === "det" ? 1 : 0); zR.setAttribute("opacity", cle === "reg" ? 1 : 0);
      if (valve) zoomMgr[cle].setAttribute("opacity", (1 - ouvert).toFixed(2));
      ferme.setAttribute("opacity", (tourneV && sens > 0 ? tourne : 0).toFixed(2)); ouvre.setAttribute("opacity", (tourneV && sens < 0 ? tourne : 0).toFixed(2));
      /* le composant en main monte avec la main quand on le retire, descend quand on le pose ; le détecteur balaie */
      const leve = k === 0 && cle === "comp" ? (tau < 3 ? passe(tau, 1.2, 2.4) : 1 - passe(tau, 3.6, 4.8)) : 0;
      zCh.setAttribute("transform", `translate(0 ${(-12 * leve).toFixed(1)})`); zCi.setAttribute("opacity", k === 0 && tau >= 2.6 && tau < 3.2 ? (1 - passe(tau, 2.6, 3.2)).toFixed(2) : 1);
      dr.setAttribute("opacity", (tourneV ? 0 : tourne).toFixed(2));
      if (cle === "comp") dr.setAttribute("transform", `translate(222 150) rotate(${sens > 0 ? 180 : 0})`);
      if (cle === "det") dr.setAttribute("transform", `translate(${(MAIN[0] + 92).toFixed(1)} ${(MAIN[1] + 60).toFixed(1)}) rotate(${sens > 0 ? 90 : -90})`);
      zDh.setAttribute("transform", `translate(${(Math.sin(t * 3.1) * 3).toFixed(1)} 0)`);
      const titre = cle === "comp" && sens > 0 ? ["composant neuf", "compatible"] : e.geste || !e.titre ? TITRES[cle] : e.titre;
      if (titre1.textContent !== titre[0] || titre2.textContent !== titre[1]) { titre1.textContent = titre[0]; titre2.textContent = titre[1]; }
      let parole = ouvert > 0.5 ? "ouverte" : "fermée", teinte = ouvert > 0.5 ? C.vert : C.navy;
      if (cle === "comp") { parole = e.mot || "monté"; teinte = parole === "monté" || parole === "neuf" ? C.vert : C.navy; }
      if (cle === "reg") { parole = e.mot || "réglé"; teinte = parole === "réglé" ? C.vert : C.navy; }
      if (cle === "det") { parole = e.signal === 0 ? "aucun signal" : e.signal === 1 ? "signal" : e.signal === 2 ? "signal répété" : ""; teinte = e.signal === 0 ? C.vert : e.signal === 1 ? C.orangeF : C.rouge; }
      mot.textContent = parole; mot.setAttribute("fill", teinte); mot.setAttribute("x", cle === "det" ? 168 : 150);
      brasLisse = D.lerp(-15, BRAS_VANNE + (tourneV ? Math.sin(t * 9) * 2.5 * tourne : cle === "comp" ? -10 * leve : Math.sin(t * 3.1) * 1.2), enMain);
      tech({ x: TECH.x, y: TECH.y, k: TECH.k, t: t, bras: brasLisse });
      return e;
    };
  }

  /* ---------- la pose : le dessin, les boutons pas à pas, la phrase de l'étape ---------- */
  const dessins = document.createElement("div");
  dessins.className = "scene-dessins";
  hote.appendChild(dessins);
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "scene-geste"); svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Animation pas à pas : à gauche, la main du technicien en gros plan, sur le composant, sur une vanne du manifold ou sur le détecteur ; à droite, le circuit hydrocarbure et son montage, où l'azote passe par le mano-détendeur, où la pompe aspire l'air et l'humidité, où la bouteille de R-290 se vide sur la balance et où la vapeur qui fuit se voit.");
  dessins.appendChild(svg);
  const defs = document.createElementNS(NS, "svg"); // dégradés métal, une fois pour la page
  defs.setAttribute("width", "0"); defs.setAttribute("height", "0"); defs.setAttribute("aria-hidden", "true");
  defs.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden");
  D.defs(defs); document.body.appendChild(defs);
  const rendreDessin = dessiner(svg);
  const barre = document.createElement("div");
  barre.className = "scene-barre";
  barre.innerHTML = '<button type="button" class="scene-lecture" aria-pressed="true">⏸ Pause</button>' +
    ETAPES.map((e, i) => '<button type="button" class="scene-etape" data-etape="' + i + '" aria-label="Étape ' + (i + 1) + " : " + e.nom.toLowerCase() + '" title="' + e.nom + '">' + (i + 1) + "</button>").join("") +
    '<p class="scene-legende"></p>';
  hote.appendChild(barre);
  const legende = barre.querySelector(".scene-legende");
  const s = { u: 0, t: 0, joue: true, arret: null, etape: -1, vari: 1, kPrec: -1, uPrec: 0 }; // u : secondes dans le film (0 → TOTAL, puis il recommence) ; vari : l'épreuve alterne, la pression tient puis chute
  const etapeDe = u => { let k = 0; while (k < ETAPES.length - 1 && u >= DEBUT[k + 1]) k++; return k; };
  function boutons() {
    const b = barre.querySelector(".scene-lecture");
    b.textContent = s.joue ? "⏸ Pause" : "▶ Lecture"; b.setAttribute("aria-pressed", String(s.joue));
    barre.querySelectorAll(".scene-etape").forEach((x, i) => { if (i === s.etape) x.setAttribute("aria-current", "step"); else x.removeAttribute("aria-current"); });
  }
  function rendre() {
    const k = etapeDe(s.u);
    if (k === 1 && (s.kPrec !== 1 || s.u < s.uPrec - 0.3)) s.vari = 1 - s.vari; // à chaque départ de l'épreuve (suite du film, bouton de l'étape, écran du dossier) : la pression tient, puis chute, puis tient…
    s.kPrec = k; s.uPrec = s.u;
    rendreDessin(k, s.u - DEBUT[k], s.t, s.vari);
    if (k !== s.etape) { s.etape = k; legende.innerHTML = "<strong>" + ETAPES[k].nom + "</strong> — " + ETAPES[k].dire; boutons(); }
  }
  function aller(k, seule) { s.u = DEBUT[k]; s.arret = seule ? DEBUT[k] + ETAPES[k].duree - 0.01 : null; s.joue = true; boutons(); rendre(); }
  barre.querySelector(".scene-lecture").addEventListener("click", () => { s.joue = !s.joue; s.arret = null; boutons(); });
  barre.querySelectorAll(".scene-etape").forEach(b => b.addEventListener("click", () => aller(Number(b.dataset.etape), true))); // l'étape se joue, puis s'arrête sur sa fin
  let avant = 0;
  function boucle(now) {
    const dt = avant ? Math.min(0.1, (now - avant) / 1000) : 0;
    avant = now;
    if (hote.getClientRects().length && s.joue) {
      s.t += dt; s.u += dt;
      if (s.arret !== null && s.u >= s.arret) { s.u = s.arret; s.arret = null; s.joue = false; boutons(); }
      if (s.u >= TOTAL) s.u -= TOTAL; // le film recommence
      rendre();
    }
    requestAnimationFrame(boucle);
  }
  /* app.js appelle SCENE_GESTE.dossier(id) à chaque écran : le dessin ouvre l'étape de ce dossier (une fois par dossier) */
  let dernier = null;
  window.SCENE_GESTE = { dossier: id => { if (id === dernier || !(id in DOSSIER)) return; dernier = id; aller(DOSSIER[id], false); } };
  rendre();
  requestAnimationFrame(boucle);
})();
