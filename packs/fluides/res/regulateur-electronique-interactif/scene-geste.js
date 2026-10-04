/* =====================================================================
   scene-geste.js — regulateur-electronique-interactif : la main sur les
   touches du régulateur, et ce que le froid en fait
   ---------------------------------------------------------------------
   RÔLE (chantier « Animer les réseaux », 04/10/2026, d'après le pilote
   chaine-intervention-interactive/scene-geste.js) : le dessin vivant du
   module, en haut de chaque écran. À gauche, le geste en gros plan : le
   technicien (le bonhomme de HoCourant, repris de legislation/scenes/
   fluidique.js) a la main sur une touche du régulateur ; le gros plan
   glisse pour amener sous son doigt la touche qui agit. À droite, le
   montage où l'on voit la conséquence : la sonde dans la chambre, le
   régulateur (le même, en petit), le compresseur et la résistance de
   dégivrage. Tout nombre se lit sur l'afficheur, jamais ailleurs.
   Cinq étapes, dans l'ordre du cours : lire, consigne, différentiel, le
   froid (il s'arrête à la consigne, repart à la relance, et garde son
   état entre les deux), dégivrer (maintenir ▼ : la résistance chauffe,
   le givre fond, l'eau s'égoutte, le ventilateur attend). Chaque écran
   ouvre l'étape de son dossier (SCENE_GESTE.dossier, appelé par app.js).
   LE RÉGULATEUR n'est pas un nouveau dessin : c'est celui de la couverture
   (index.html, « Un régulateur électronique de froid, dessiné »), avec les
   mêmes cotes (boîtier 280 × 150, afficheur, trois voyants, quatre touches)
   et les mêmes couleurs. Seuls changent la taille des textes (au moins 22
   unités, pour rester lisibles) et l'unité, qui suit la valeur affichée.
   SYMBOLES, jamais redessinés : l'évaporateur (échangeur à air), la sonde
   de température, la résistance et le compresseur sont ceux de la
   bibliothèque curée (../symboles/). Le givre, les gouttes et l'air sont
   des effets, pas des organes.
   VALEURS : celles du cours (clavier à trois touches, écrans 10 à 12) :
   consigne 4 puis 2 °C, différentiel 2 puis 3 K, relance 5 °C ; la
   température lue 4,6 °C est celle de la couverture. Entre ces repères,
   l'afficheur suit la température de la chambre.
   RÉEMPLOI, en lecture : jouerezo/moteur/voyage-dessin.js (nappe de
   gouttes, chevrons d'air, pastilles, filigrane).
   RÈGLES TENUES : texte jamais sur un tracé (les chiffres de l'afficheur
   et les touches sont sur leur propre fond, comme une pastille) ; textes
   du dessin ≥ 22 unités (≥ 19 px à 956 px de large) ; filigrane R9 derrière
   le dessin ; le mouvement suit le temps de la page, sans autre condition
   (Pause le fige).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, hote = document.getElementById("scene-lecon");
  if (!hote) return;
  if (!D) { hote.hidden = true; return; } // moteur du Voyage absent : pas de cadre vide
  const NS = "http://www.w3.org/2000/svg";
  const C = { navy: "#1b3a63", bleu: "#3d7fca", vert: "#1e7e54", gris: "#637285", orange: "#ff6b35", brique: "#c9451a", papier: "#fffdf8" };
  const PEAU = "#f6d7bd", ENCRE = "#10233c", POLICE = "Calibri, 'Segoe UI', Arial, sans-serif", TITRE = "'Trebuchet MS', Calibri, Arial, sans-serif";
  const ecrire = (p, x, y, s, at) => D.texte(p, x, y, s, Object.assign({ "font-size": 22, "font-family": POLICE, "font-weight": 600, fill: ENCRE }, at || {}));
  const marquer = g => g.querySelectorAll("text").forEach(t => { if (t.textContent === "Studio") t.textContent = "Fluide"; }); // cartouche du produit (charte R9)
  const passe = (t, a, b) => D.lisse((t - a) / (b - a)); // 0 avant a, 1 après b
  const num = v => v.toFixed(1);

  /* ---------- les étapes (l'ordre du cours) ---------- */
  const ETAPES = [
    { nom: "Lire", duree: 5, dire: "la sonde mesure, l’afficheur donne la température." },
    { nom: "Consigne", duree: 6, dire: "elle dit où le froid s’arrête : ▼ la baisse." },
    { nom: "Différentiel", duree: 5.5, dire: "de combien la température remonte avant la relance." },
    { nom: "Le froid", duree: 8, dire: "il s’arrête à la consigne, repart à la relance." },
    { nom: "Dégivrer", duree: 9, dire: "▼ maintenu : la résistance chauffe, le givre fond." }
  ];
  const DOSSIER = { comprendre: 0, programmer: 1, degivrer: 4, cabler: 3, controler: 3 };
  const DEBUT = ETAPES.map((e, i) => ETAPES.slice(0, i).reduce((a, x) => a + x.duree, 0)), TOTAL = ETAPES.reduce((a, x) => a + x.duree, 0);

  /* ---------- le gros plan : le régulateur de la couverture à l'échelle 0,85, coin haut gauche en (84, 40) ---------- */
  const Z = 0.85, X0 = 84, Y0 = 40;
  const KX = { haut: 96, bas: 150, set: 204, prg: 272 };                       // x des touches dans la couverture
  const PAN = { haut: 0, bas: -(KX.bas - KX.haut) * Z, set: -(KX.set - KX.haut) * Z }; // le gros plan glisse : la touche visée vient sous le doigt
  const BRAS_REPOS = -15;
  const TECH = { x: 0, y: 106, k: 2.25 };
  const EPAULE_Y = TECH.y + 24 * TECH.k, LONG_BRAS = Math.hypot(10.5, 25) * TECH.k, BRAS_PENDANT = Math.atan2(25, 10.5) * 180 / Math.PI;
  const MAIN = [X0 + (KX.haut - 70) * Z + 9, Y0 + (172 - 40) * Z + 11];        // le bout du doigt : sous le coin bas gauche de la touche visée, sans cacher son nom
  TECH.x = MAIN[0] - Math.sqrt(LONG_BRAS * LONG_BRAS - (MAIN[1] - EPAULE_Y) * (MAIN[1] - EPAULE_Y)) - 2 * TECH.k; // bras tendu juste ce qu'il faut
  const BRAS_TOUCHE = Math.atan2(MAIN[1] - EPAULE_Y, MAIN[0] - (TECH.x + 2 * TECH.k)) * 180 / Math.PI - BRAS_PENDANT;

  /* gestes de chaque étape : fen = la main est sur la touche [touche, début, fin] ; app = la touche est enfoncée ;
     pan = où est le gros plan (il part d'où l'étape précédente l'a laissé : la boucle se referme) */
  const GESTES = [
    { fen: [], app: [], pan: [[0, PAN.bas]] },
    { fen: [["bas", 0.2, 3.0], ["set", 3.25, 4.6]], app: [["bas", 0.75, 1.05], ["bas", 1.3, 1.6], ["bas", 1.85, 2.15], ["bas", 2.4, 2.7], ["set", 3.7, 4.1]], pan: [[0, PAN.bas], [2.7, PAN.bas], [3.15, PAN.set]] },
    { fen: [["haut", 0.35, 2.2], ["set", 2.5, 3.9]], app: [["haut", 0.85, 1.15], ["haut", 1.4, 1.7], ["set", 2.95, 3.35]], pan: [[0, PAN.set], [0.5, PAN.haut], [2.25, PAN.haut], [2.7, PAN.set]] },
    { fen: [], app: [], pan: [[0, PAN.set], [0.6, PAN.bas]] },
    { fen: [["bas", 0.4, 3.1]], app: [["bas", 0.9, 3.0]], pan: [[0, PAN.bas]] }
  ];
  const appui = (app, tau) => { let r = [null, 0]; app.forEach(([t, a, b]) => { const v = D.fenetre(tau, a, b, 0.08); if (v > r[1]) r = [t, v]; }); return r; };
  function main(fen, tau) { // 0 : la main pend le long du corps ; 1 : sur la touche ; entre deux touches elle reste à demi levée
    if (!fen.length) return 0;
    let p = 0;
    fen.forEach(([, a, b]) => { p = Math.max(p, D.fenetre(tau, a, b, 0.25)); });
    return tau > fen[0][1] && tau < fen[fen.length - 1][2] ? Math.max(p, 0.72) : p;
  }
  const clignote = (tau, a, b) => tau >= a && tau < b && Math.floor((tau - a) / 0.15) % 2 ? 0.15 : 1; // « valider » : l'afficheur clignote

  /* l'état du plateau à l'étape k, au temps local τ (secondes) */
  function etat(k, tau) {
    const g = GESTES[k], [touche, enfonce] = appui(g.app, tau);
    const e = { T: 4.6, aff: "", unite: "°C", clig: 1, froid: 1, ventilo: 1, chauffe: 0, givre: 0, gouttes: 0, titre: "", mot: "", focus: [], p2: null,
      pan: D.courbe(g.pan, tau), main: main(g.fen, tau), touche: touche, enfonce: enfonce };
    if (k === 0) { // lire : l'afficheur suit la température de la chambre, la sonde envoie sa mesure
      e.T = D.lerp(4.6, 4.3, tau / 5); e.givre = D.lerp(0, 0.12, tau / 5);
      e.aff = num(e.T); e.titre = "température lue"; e.mot = "il lit"; e.focus = [["sonde", 0.3, 4.7]];
    }
    if (k === 1) { // consigne : ▼ quatre fois (4 → 2 °C), SET pour valider
      e.T = D.lerp(4.3, 4.1, tau / 6); e.givre = D.lerp(0.12, 0.25, tau / 6);
      const n = g.app.filter(a => a[0] === "bas" && tau >= a[1]).length, edite = tau >= 0.4 && tau < 4.7;
      e.aff = edite ? num(4 - 0.5 * n) : num(e.T); e.titre = edite ? "la consigne" : "température lue";
      e.clig = clignote(tau, 3.7, 4.6); e.mot = tau < 0.2 ? "" : tau < 3.1 ? "appui sur ▼" : tau < 4.7 ? "SET : valider" : "";
      e.focus = [["regul", 0.3, 4.6]];
    }
    if (k === 2) { // différentiel : ▲ deux fois (2 → 3 K), SET pour valider
      e.T = D.lerp(4.1, 4.0, tau / 5.5); e.givre = D.lerp(0.25, 0.35, tau / 5.5);
      const n = g.app.filter(a => a[0] === "haut" && tau >= a[1]).length, edite = tau >= 0.3 && tau < 4.0;
      e.aff = edite ? num(2 + 0.5 * n) : num(e.T); e.unite = edite ? "K" : "°C"; e.titre = edite ? "le différentiel" : "température lue";
      e.clig = clignote(tau, 2.95, 3.9); e.mot = tau < 0.35 ? "" : tau < 2.45 ? "appui sur ▲" : tau < 4.0 ? "SET : valider" : "";
      e.focus = [["regul", 0.3, 3.9]];
    }
    if (k === 3) { // le froid : arrêt à 2, relance à 5 (2 + 3 K), et entre les deux le contact garde son état
      e.T = D.courbe([[0, 4.0], [2.6, 2.0], [6.6, 5.0], [8, 3.9]], tau, true); e.givre = D.lerp(0.35, 0.65, tau / 8);
      e.froid = tau < 2.6 || tau >= 6.6 ? 1 : 0; e.aff = num(e.T);
      e.titre = tau < 2.6 ? "froid demandé" : tau < 3.8 ? "consigne atteinte" : tau < 6.6 ? "il garde son état" : "le froid repart";
      e.mot = e.froid ? "contact fermé" : "contact ouvert"; e.p2 = tau >= 3.4 && tau < 6.6 ? "garde" : null;
      e.focus = [["compresseur", 2.2, 3.6], ["compresseur", 6.3, 7.6]];
    }
    if (k === 4) { // dégivrer : ▼ maintenu, puis chauffe, égouttage, retard du ventilateur, reprise
      const lance = tau >= 3.0;
      e.T = lance ? D.lerp(3.15, 4.6, passe(tau, 3, 8.2)) : D.lerp(3.9, 3.15, tau / 3);
      e.chauffe = tau >= 3.0 && tau < 6.2 ? 1 : 0; e.froid = tau < 3.0 || tau >= 7.3 ? 1 : 0; e.ventilo = tau < 3.0 || tau >= 8.2 ? 1 : 0;
      e.givre = lance ? 0.9 * (1 - passe(tau, 3.0, 6.2)) : D.lerp(0.65, 0.9, tau / 3);
      e.gouttes = D.fenetre(tau, 3.4, 7.0, 0.5);
      e.aff = tau >= 8.2 ? num(e.T) : lance ? "dEF" : num(e.T);
      e.titre = tau < 0.9 ? "température lue" : tau < 3.0 ? "dégivrage manuel" : tau < 6.2 ? "la résistance chauffe" : tau < 7.3 ? "égouttage" : tau < 8.2 ? "retard ventilateur" : "reprise";
      e.mot = tau >= 0.4 && tau < 3.0 ? "▼ maintenu" : "";
      e.p2 = tau < 3.0 || tau >= 8.2 ? null : tau < 6.2 ? "deg" : tau < 7.3 ? "egout" : "retard";
      e.focus = [["resistance", 3.0, 6.2]];
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

  /* ---------- le régulateur de la couverture (index.html), reporté tel quel ----------
     o : { x, y (coin haut gauche du boîtier), z (échelle), etiquettes (le nom des touches) }.
     L'afficheur et chaque touche sont un groupe « fond + texte » : le texte est sur son propre fond. */
  function regulateur(parent, o) {
    const z = o.z, taille = px => +(px / z).toFixed(2); // taille de texte voulue (unités du dessin) → unités de la couverture
    const g = D.el("g", { transform: `translate(${(o.x - 70 * z).toFixed(2)} ${(o.y - 40 * z).toFixed(2)}) scale(${z})` }, parent);
    D.el("rect", { x: 70, y: 40, width: 280, height: 150, rx: 14, fill: "#e9eef3", stroke: C.navy, "stroke-width": 3 }, g);
    const ecran = D.el("g", {}, g);
    D.el("rect", { x: 96, y: 66, width: 150, height: 58, rx: 8, fill: "#132033", stroke: C.navy, "stroke-width": 2 }, ecran);
    const lecture = D.el("text", { x: 160, y: 110, "text-anchor": "middle", fill: "#ff8a5c", "font-size": 40, "font-weight": 900, "font-family": TITRE, "letter-spacing": 2 }, ecran);
    const chiffres = document.createTextNode(""); lecture.appendChild(chiffres);
    const unite = D.el("tspan", { x: 238, y: 86, "text-anchor": "end", "font-size": taille(22), "font-weight": 700, "letter-spacing": 0 }, lecture);
    const lampes = [76, 100, 124].map(y => D.el("circle", { cx: 276, cy: y, r: 7, fill: C.papier, stroke: C.navy, "stroke-width": 2 }, g));
    const touches = {};
    [["haut", 46, "▲"], ["bas", 46, "▼"], ["set", 60, "SET"], ["prg", 60, "PRG"]].forEach(([id, l, nom]) => {
      const t = D.el("g", {}, g);
      const fond = D.el("rect", { x: KX[id], y: 140, width: l, height: 32, rx: 7, fill: C.papier, stroke: C.navy, "stroke-width": 2 }, t);
      const mot = o.etiquettes ? D.el("text", { x: KX[id] + l / 2, y: 156 + 0.34 * taille(22), "text-anchor": "middle", fill: C.navy, "font-size": taille(22), "font-weight": 800, "font-family": TITRE }, t) : null;
      if (mot) mot.textContent = nom;
      touches[id] = { g: t, fond: fond, mot: mot, centre: KX[id] + l / 2, largeur: l };
    });
    return {
      afficher(texte, u, op) { if (chiffres.nodeValue !== texte) chiffres.nodeValue = texte; if (unite.textContent !== u) unite.textContent = u; lecture.setAttribute("opacity", op.toFixed(2)); },
      lampes(etats) { lampes.forEach((l, i) => l.setAttribute("fill", etats[i] ? C.orange : C.papier)); },
      toucher(id, v) { const t = touches[id]; t.g.setAttribute("transform", v > 0.01 ? `translate(0 ${(3 * v).toFixed(2)})` : ""); t.fond.setAttribute("fill", v > 0.5 ? "#cfe0f1" : C.papier); t.fond.setAttribute("stroke", v > 0.5 ? C.orange : C.navy); },
      touches: touches, lampesEl: lampes
    };
  }

  /* ---------- le dessin (repère 1060 × 276 : gros plan x 0-262, montage x 270-1060) ---------- */
  function image(parent, href, x, y, l, h) { return D.el("image", { href: href, x: x, y: y, width: l, height: h, preserveAspectRatio: "xMidYMid meet" }, parent); }
  function fil(parent, d, couleur, large, tirets) { return D.el("path", { d: d, fill: "none", stroke: couleur, "stroke-width": large, "stroke-linecap": "round", "stroke-dasharray": tirets || "none" }, parent); }
  function impulsions(parent, d, couleur) { // la mesure ou le courant qui file le long du fil : des points séparés
    return D.el("path", { d: d, fill: "none", stroke: couleur, "stroke-width": 6, "stroke-linecap": "round", "stroke-dasharray": "0.1 14", opacity: 0 }, parent);
  }
  function fleche(parent) { // le sens du geste : ▲ la valeur monte, ▼ elle baisse (flèche verticale, à côté de l'afficheur)
    const g = D.el("g", { opacity: 0 }, parent), f = D.el("g", {}, g);
    D.el("path", { d: "M0 -20 V8", stroke: C.orange, "stroke-width": 6, "stroke-linecap": "round" }, f);
    D.el("polygon", { points: "-11,6 11,6 0,24", fill: C.orange }, f);
    return (sens, op) => { g.setAttribute("opacity", op.toFixed(2)); f.setAttribute("transform", sens > 0 ? "scale(1 -1)" : ""); };
  }

  function dessiner(svg) {
    svg.setAttribute("viewBox", "0 0 1060 276");
    const defs = D.el("defs", {}, svg);
    D.el("rect", { x: 2, y: 33, width: 260, height: 142, rx: 16 }, D.el("clipPath", { id: "regulateur-fenetre" }, defs));
    const g = D.el("g", {}, svg);
    marquer(D.filigrane(g, [[132, 236], [880, 130]], 220));
    /* ===== le montage ===== */
    const m = D.el("g", {}, g);
    const chambre = D.el("rect", { x: 282, y: 66, width: 318, height: 196, rx: 14, fill: "#8fb7d9", "fill-opacity": 0.16, stroke: C.navy, "stroke-width": 3 }, m);
    // l'évaporateur (symbole), son givre, l'air qu'il souffle, ses gouttes
    image(m, "../symboles/echangeur_a_air.svg", 296, 104, 120, 120);
    const givre = D.el("g", { opacity: 0 }, m);
    D.el("rect", { x: 310, y: 114, width: 72, height: 96, rx: 6, fill: "#eaf5fd", "fill-opacity": 0.8, stroke: "#9cc3e4", "stroke-width": 2 }, givre);
    [[324, 130], [350, 140], [372, 124], [330, 166], [356, 178], [372, 156], [326, 196], [352, 200]].forEach(([x, y]) =>
      D.el("path", { d: `M${x - 6} ${y} H${x + 6} M${x} ${y - 6} V${y + 6} M${x - 4} ${y - 4} L${x + 4} ${y + 4} M${x - 4} ${y + 4} L${x + 4} ${y - 4}`, stroke: "#fff", "stroke-width": 2.2, "stroke-linecap": "round" }, givre));
    const chev = [0, 1, 2].map(() => D.chevron(D.el("g", {}, m)));
    const gouttes = D.bulles(D.el("g", {}, m), 6, 17, true);
    // la sonde (symbole), posée dans l'air de la chambre
    image(m, "../symboles/sonde_temperature.svg", 490, 121.6, 96, 64);
    // la résistance de dégivrage (symbole), qui rougit quand elle est alimentée
    const lueur = D.el("rect", { x: 404, y: 176, width: 108, height: 30, rx: 9, fill: "#ffb27a", opacity: 0 }, m);
    image(m, "../symboles/resistance_evaporation.svg", 400, 179.2, 112, 32);
    // les fils : mesure de la sonde (bleu, tireté, comme sur la couverture), commande du froid et du dégivrage (orange)
    const FS = "M570 144 H650", FF = "M874 184 H936", FD = "M650 200 H503";
    fil(m, FS, C.bleu, 2.5, "7 4");
    const filF = fil(m, FF, C.brique, 3), filD = fil(m, FD, C.brique, 3);
    const flS = impulsions(m, FS, C.navy), flF = impulsions(m, FF, "#fff"), flD = impulsions(m, FD, "#fff");
    // le compresseur (symbole)
    const comp = D.el("g", {}, m);
    image(comp, "../symboles/compresseur_general.svg", 920, 144, 100, 80);
    // le régulateur du montage : le même que le gros plan, en petit
    const R = regulateur(m, { x: 650, y: 96, z: 0.8, etiquettes: false });
    // la pièce qui agit s'allume
    const anneau = D.el("rect", { rx: 9, fill: "none", stroke: C.orange, "stroke-width": 4, opacity: 0 }, m);
    const CADRES = { sonde: [494, 122, 94, 44], regul: [642, 88, 240, 136], compresseur: [928, 150, 80, 68], resistance: [404, 174, 108, 36] };
    // légendes du montage (jamais sur un tracé)
    ecrire(m, 441, 54, "chambre froide", { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    ecrire(m, 352, 94, "évaporateur", { "text-anchor": "middle" });
    ecrire(m, 538, 112, "sonde", { "text-anchor": "middle" });
    ecrire(m, 470, 236, "résistance", { "text-anchor": "middle" });
    ecrire(m, 762, 76, "régulateur", { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    ecrire(m, 968, 248, "compresseur", { "text-anchor": "middle" });
    const p1 = { on: D.pastille(m, 1052, 34, "froid en marche", C.vert, 22, "end"), off: D.pastille(m, 1052, 34, "froid coupé", C.gris, 22, "end") };
    const p2 = { garde: D.pastille(m, 1052, 76, "il garde son état", C.navy, 22, "end"), deg: D.pastille(m, 1052, 76, "dégivrage", C.brique, 22, "end"),
      egout: D.pastille(m, 1052, 76, "égouttage", C.bleu, 22, "end"), retard: D.pastille(m, 1052, 76, "retard ventilateur", C.gris, 22, "end") };
    /* ===== le gros plan du geste ===== */
    const gp = D.el("g", {}, g);
    D.el("rect", { x: 2, y: 33, width: 260, height: 142, rx: 16, fill: "#f4efe5", stroke: C.navy, "stroke-opacity": 0.28, "stroke-width": 2 }, gp);
    const glisse = D.el("g", {}, D.el("g", { "clip-path": "url(#regulateur-fenetre)" }, gp));
    const Rz = regulateur(glisse, { x: X0, y: Y0, z: Z, etiquettes: true });
    const fleche1 = fleche(D.el("g", { transform: "translate(250 92)" }, gp));
    const tech = bonhomme(gp, { casquette: true, dephasage: 0.3 });
    const titre = ecrire(gp, 132, 24, "", { "font-weight": 700, fill: C.navy, "text-anchor": "middle" });
    const mot = ecrire(gp, 182, 266, "", { "font-weight": 700, "text-anchor": "middle" });
    const IDS = ["haut", "bas", "set", "prg"];

    return function (k, tau, t) {
      const e = etat(k, tau);
      /* montage */
      chambre.setAttribute("fill", D.couleur(D.borne((e.T - 2) / 12, 0, 1)));
      givre.setAttribute("opacity", e.givre.toFixed(2));
      chev.forEach((c, i) => { const f = D.frac(t * 0.42 + i / 3); c(394 + f * 88, 128 + i * 20, -90, "#7fa8d0", 0.85 * e.ventilo * D.fenetre(f, 0, 1, 0.25)); });
      gouttes(t, q => [318 + q * 58, 212, 250, e.gouttes, "#6fa8dc"]);
      lueur.setAttribute("opacity", (0.7 * e.chauffe).toFixed(2));
      filF.setAttribute("stroke", e.froid ? C.brique : "#9aa7b5"); filD.setAttribute("stroke", e.chauffe ? C.brique : "#9aa7b5");
      flS.setAttribute("opacity", "0.9"); flF.setAttribute("opacity", e.froid ? 0.95 : 0); flD.setAttribute("opacity", e.chauffe ? 0.95 : 0);
      [flS, flF, flD].forEach(p => p.setAttribute("stroke-dashoffset", (-t * 34).toFixed(1)));
      comp.setAttribute("transform", e.froid ? `translate(${(Math.sin(t * 61) * 0.9).toFixed(2)} ${(Math.cos(t * 47) * 0.6).toFixed(2)})` : "");
      const unite = e.aff === "dEF" ? "" : e.unite;
      R.afficher(e.aff, unite, e.clig); R.lampes([e.froid, e.ventilo, e.chauffe]);
      IDS.forEach(id => R.toucher(id, e.touche === id ? e.enfonce : 0));
      const voir = (pastille, oui) => pastille.setAttribute("display", oui ? "inline" : "none"); // une pastille cachée n'existe plus à l'écran
      voir(p1.on, e.froid); voir(p1.off, !e.froid);
      Object.keys(p2).forEach(c => voir(p2[c], e.p2 === c));
      let foc = [null, 0];
      e.focus.forEach(([cle, a, b]) => { const v = D.fenetre(tau, a, b, 0.3); if (v > foc[1]) foc = [cle, v]; });
      if (foc[0]) { const [x, y, l, h] = CADRES[foc[0]]; Object.entries({ x: x, y: y, width: l, height: h }).forEach(([a, v]) => anneau.setAttribute(a, v)); }
      anneau.setAttribute("opacity", foc[1].toFixed(2));
      /* gros plan : le boîtier glisse, la touche visée vient sous le doigt */
      glisse.setAttribute("transform", `translate(${e.pan.toFixed(2)} 0)`);
      Rz.afficher(e.aff, unite, e.clig); Rz.lampes([e.froid, e.ventilo, e.chauffe]);
      IDS.forEach(id => {
        Rz.toucher(id, e.touche === id ? e.enfonce : 0);
        const t = Rz.touches[id], x = X0 + (t.centre - 70) * Z + e.pan, moitie = t.largeur * Z / 2; // une touche que le bord de la fenêtre coupe s'efface en douceur, son nom avec
        t.g.setAttribute("opacity", D.borne((258 - (x + moitie)) / 30 + 1, 0, 1).toFixed(2));
        t.mot.setAttribute("display", x + moitie <= 258 && x - moitie >= 78 ? "inline" : "none"); // à gauche, le technicien est devant
      });
      Rz.lampesEl.forEach(l => l.setAttribute("opacity", D.borne((250 - (X0 + (276 - 70) * Z + e.pan + 7 * Z)) / 10 + 1, 0, 1).toFixed(2)));
      fleche1(e.touche === "haut" ? 1 : -1, e.touche === "haut" || e.touche === "bas" ? e.enfonce : 0);
      if (titre.textContent !== e.titre) titre.textContent = e.titre;
      if (mot.textContent !== e.mot) mot.textContent = e.mot;
      tech({ x: TECH.x, y: TECH.y, k: TECH.k, t: t, bras: D.lerp(BRAS_REPOS, BRAS_TOUCHE - 2.8 * e.enfonce, e.main) });
      return e;
    };
  }

  /* ---------- la pose : le dessin, les boutons pas à pas, la phrase de l'étape ---------- */
  const dessins = document.createElement("div");
  dessins.className = "scene-dessins";
  hote.appendChild(dessins);
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "scene-geste"); svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Animation pas à pas : à gauche, la main du technicien appuie sur les touches du régulateur, vu de près ; à droite, le montage : la sonde dans la chambre froide, le régulateur, le compresseur et la résistance de dégivrage. Le froid s’arrête à la consigne et repart à la relance ; le dégivrage fait fondre le givre.");
  dessins.appendChild(svg);
  const rendreDessin = dessiner(svg);
  const barre = document.createElement("div");
  barre.className = "scene-barre";
  barre.innerHTML = '<button type="button" class="scene-lecture" aria-pressed="true">⏸ Pause</button>' +
    ETAPES.map((e, i) => '<button type="button" class="scene-etape" data-etape="' + i + '" aria-label="Étape ' + (i + 1) + " : " + e.nom.toLowerCase() + '" title="' + e.nom + '">' + (i + 1) + "</button>").join("") +
    '<p class="scene-legende"></p>';
  hote.appendChild(barre);
  const legende = barre.querySelector(".scene-legende");
  const s = { u: 0, t: 0, joue: true, arret: null, etape: -1 }; // u : secondes dans le film (0 → TOTAL, puis il recommence)
  const etapeDe = u => { let k = 0; while (k < ETAPES.length - 1 && u >= DEBUT[k + 1]) k++; return k; };
  function boutons() {
    const b = barre.querySelector(".scene-lecture");
    b.textContent = s.joue ? "⏸ Pause" : "▶ Lecture"; b.setAttribute("aria-pressed", String(s.joue));
    barre.querySelectorAll(".scene-etape").forEach((x, i) => { if (i === s.etape) x.setAttribute("aria-current", "step"); else x.removeAttribute("aria-current"); });
  }
  function rendre() {
    const k = etapeDe(s.u);
    rendreDessin(k, s.u - DEBUT[k], s.t);
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
