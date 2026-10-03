/* =====================================================================
   voyage-booster-scenes-a.js — l'ouverture, l'évaporateur des surgelés, le
   compresseur basse température, « pourquoi booster ? », l'aspiration
   moyenne température (édition « centrale booster CO₂ »)
   ---------------------------------------------------------------------
   MÊME CONTRAT que moteur/voyage-co2-scenes-a.js : VOYAGE_SCENES[id](g, c) → maj(t)
   (g = groupe SVG de la scène ; c = { T, E, D, A(k, f), film, recit } où T[k]/E[k]
   bornent la phrase k du récit donnees/voyage-booster.js ; maj(t) rend
   { temp, etat, humeur, carte?, diag?, diag0?, calques? }).
   Les gestes sont accrochés au RANG des phrases : ajouter une phrase au récit décale
   tout. Les scènes avec organe (evaporateur-bt, compresseur-bt) commencent leur coupe
   à la phrase 2 (les phrases 0-1 : la carte d'identité, posée par le théâtre).
   ÉCRAN PARTAGÉ : la scène tient dans x 20 → 965, y 150 → 760 ; la colonne de droite
   porte la carte « où je suis » et le diagramme (jamais rien dedans). En-tête interdit
   (x < 760, y < 140).
   RECOPIÉ DE l'édition CO₂ (moteur/voyage-co2-scenes-a.js), recadré : l'échangeur, le
   compresseur à piston en coupe, les aides locales (étiquette, pastilles, instruments).
   LIQUIDE = nappe (D.liquide) ; VAPEUR = petites molécules (D.mol) ; SUPERCRITIQUE =
   volume plein sans surface (non utilisé ici : il paraît dans les scènes B).
   « BARRÉ » = un anneau rouge barré posé sur l'objet (icône, goutte, compresseur) ; le texte
   reste lisible dans son cadre rouge, à côté : jamais de texte sous un trait.
   LES TROIS CHEMINS (couleurs de la série) : orange = le froid négatif (l'héroïne), vert = le
   froid positif, violet = la vapeur de détente.
   PIÈGE : fonction pure de t — aucune variable gardée d'une image à l'autre.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const TOUR = 2 * Math.PI;
  const TITRE = "Trebuchet MS, Arial, sans-serif", CORPS = "Calibri, Arial, sans-serif";
  const VERT = "#1e7e54", VERT_C = "#4caf7d", VIOLET = "#8e44ad", VIOLET_C = "#9b7fd1", ORANGE_C = "#e8914a";
  const ROUGE = "#c0392b", BLEU2 = "#2f6fb8", GRIS = "#637285", ENCRE = "#10233c";
  const lis = D.lisse, fen = D.fenetre, bor = D.borne;
  const opa = (e, v) => e.setAttribute("opacity", bor(v, 0, 1).toFixed(2));
  const place = (e, x, y, s) => e.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ")" + (s === undefined ? "" : " scale(" + s.toFixed(3) + ")"));

  /* largeur d'un texte (page affichée) */
  function mesure(parent, s, taille) {
    const t = D.texte(parent, 0, 0, s, { "font-size": taille, "font-weight": 700, "font-family": CORPS, opacity: 0 });
    const l = t.getComputedTextLength ? t.getComputedTextLength() : 0;
    parent.removeChild(t);
    return l || s.length * taille * 0.5;
  }
  /* une étiquette (ou plusieurs lignes) avec son trait en pointillés, dans un groupe qu'on peut estomper */
  function etiquette(parent, x, y, lignes, at, trait) {
    const gr = D.el("g", { opacity: 0 }, parent);
    (Array.isArray(lignes) ? lignes : [lignes]).forEach((l, i) => D.etiquette(gr, x, y + i * 38, l, at));
    if (trait) D.trait(gr, ...trait);
    return gr;
  }
  /* une pastille posée dans un groupe qu'on peut déplacer et estomper : centre (0, 0) */
  function pastille(parent, s, fond, taille, ancre) {
    const gr = D.el("g", { opacity: 0 }, parent);
    D.pastille(gr, 0, 0, s, fond, taille, ancre || "middle");
    return gr;
  }
  /* un panneau : cadre arrondi + lignes de texte (≥ 28 px), cadre de la couleur donnée ; rend { g, l, h } */
  function panneau(parent, x, y, lignes, coul, taille, fond, retrait) {
    const gr = D.el("g", { opacity: 0 }, parent), pas = taille * 1.25, ret = retrait || 0;
    const l = Math.max(...lignes.map(s => mesure(gr, s, taille))) + 30 + ret, h = lignes.length * pas + 26;
    D.el("rect", { x: x, y: y, width: l, height: h, rx: 18, fill: fond || "#fff", stroke: coul, "stroke-width": 6 }, gr);
    lignes.forEach((s, i) => D.texte(gr, x + 15 + ret, y + 13 + taille * 0.9 + i * pas, s, { "font-size": taille, "font-weight": 700, fill: ENCRE, "font-family": CORPS }));
    return { g: gr, l: l, h: h };
  }
  /* « interdit » : anneau rouge barré, sur un objet (cx, cy, r) */
  function interdit(parent, cx, cy, r) {
    const gr = D.el("g", { opacity: 0 }, parent), d = r * 0.7071;
    D.el("circle", { cx: cx, cy: cy, r: r, fill: "none", stroke: ROUGE, "stroke-width": r * 0.2 }, gr);
    D.el("line", { x1: cx - d, y1: cy - d, x2: cx + d, y2: cy + d, stroke: ROUGE, "stroke-width": r * 0.2, "stroke-linecap": "round" }, gr);
    return gr;
  }
  /* « coché » : rond vert, coche blanche */
  function coche(parent, cx, cy, r) {
    const gr = D.el("g", { opacity: 0 }, parent);
    D.el("circle", { cx: cx, cy: cy, r: r, fill: VERT, stroke: "#fff", "stroke-width": 3 }, gr);
    D.el("path", { d: "M " + (cx - r * 0.45) + " " + cy + " L " + (cx - r * 0.1) + " " + (cy + r * 0.38) + " L " + (cx + r * 0.5) + " " + (cy - r * 0.38), fill: "none", stroke: "#fff", "stroke-width": r * 0.28, "stroke-linecap": "round", "stroke-linejoin": "round" }, gr);
    return gr;
  }
  function flocon(parent, cx, cy, r, coul) {
    const gr = D.el("g", { transform: "translate(" + cx + " " + cy + ")" }, parent);
    for (let k = 0; k < 6; k++) {
      const bras = D.el("g", { transform: "rotate(" + k * 60 + ")" }, gr), at = { stroke: coul, "stroke-width": r * 0.13, "stroke-linecap": "round" };
      D.el("line", Object.assign({ x1: 0, y1: 0, x2: 0, y2: -r }, at), bras);
      [-1, 1].forEach(s => D.el("line", Object.assign({ x1: 0, y1: -r * 0.55, x2: s * r * 0.26, y2: -r * 0.8 }, at), bras));
    }
    return gr;
  }
  /* une molécule d'une couleur donnée (les trois chemins) */
  function molC(parent) {
    const u = D.el("use", { href: "#vm-mol" }, parent);
    return function (x, y, coul, op) {
      u.setAttribute("x", x.toFixed(1)); u.setAttribute("y", y.toFixed(1)); u.setAttribute("fill", coul);
      u.setAttribute("opacity", op === undefined ? 1 : bor(op, 0, 1).toFixed(2));
    };
  };
  /* ligne brisée à coins arrondis, échantillonnée : at(d, décalage) → [x, y] */
  function trajet(pts, rayon) {
    const P = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
      const a = pts[i - 1], b = pts[i], c = pts[i + 1], lab = Math.hypot(b[0] - a[0], b[1] - a[1]), lbc = Math.hypot(c[0] - b[0], c[1] - b[1]);
      const r1 = Math.min(rayon, lab / 2), r2 = Math.min(rayon, lbc / 2);
      const p1 = [b[0] + (a[0] - b[0]) / lab * r1, b[1] + (a[1] - b[1]) / lab * r1], p2 = [b[0] + (c[0] - b[0]) / lbc * r2, b[1] + (c[1] - b[1]) / lbc * r2];
      for (let k = 0; k <= 10; k++) { const u = k / 10; P.push([(1 - u) * (1 - u) * p1[0] + 2 * u * (1 - u) * b[0] + u * u * p2[0], (1 - u) * (1 - u) * p1[1] + 2 * u * (1 - u) * b[1] + u * u * p2[1]]); }
    }
    P.push(pts[pts.length - 1]);
    const cum = [0];
    for (let i = 1; i < P.length; i++) cum.push(cum[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
    const L = cum[cum.length - 1];
    function at(d, dec) {
      d = bor(d, 0, L);
      let lo = 1, hi = P.length - 1;
      while (lo < hi) { const m = (lo + hi) >> 1; if (cum[m] < d) lo = m + 1; else hi = m; }
      const i = lo, a = P[i - 1], b = P[i], f = (d - cum[i - 1]) / ((cum[i] - cum[i - 1]) || 1), tx = b[0] - a[0], ty = b[1] - a[1], n = Math.hypot(tx, ty) || 1;
      return [D.lerp(a[0], b[0], f) - ty / n * (dec || 0), D.lerp(a[1], b[1], f) + tx / n * (dec || 0)];
    }
    return { L: L, at: at, trace: d => { let s = ""; for (let q = 0; q <= d; q += 10) { const [x, y] = at(q); s += (q ? " L " : "M ") + x.toFixed(1) + " " + y.toFixed(1); } return s || "M 0 0"; } };
  }

  /* ---------- les instruments (sans chiffre sur le cadran : les valeurs sont dites par les pastilles) ---------- */
  /* manomètre à aiguille ; f = 0..1 sur 270° ; rend maj(f) */
  function manometre(parent, cx, cy, R) {
    const th = f => -135 + 270 * f, pt = (a, r) => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)];
    D.el("circle", { cx: cx, cy: cy, r: R + 6, fill: "#fff", stroke: "#56636f", "stroke-width": 10 }, parent);
    const arc = (a1, a2, r, coul) => { const [x1, y1] = pt(a1, r), [x2, y2] = pt(a2, r); D.el("path", { d: "M " + x1.toFixed(1) + " " + y1.toFixed(1) + " A " + r + " " + r + " 0 " + (a2 - a1 > 180 ? 1 : 0) + " 1 " + x2.toFixed(1) + " " + y2.toFixed(1), fill: "none", stroke: coul, "stroke-width": 9 }, parent); };
    arc(th(0), th(0.55), R - 22, "#4aa36b"); arc(th(0.55), th(1), R - 22, "#d4562a");
    for (let k = 0; k <= 10; k++) { const [x1, y1] = pt(th(k / 10), R - 4), [x2, y2] = pt(th(k / 10), R - (k % 5 ? 12 : 17)); D.el("line", { x1: x1, y1: y1, x2: x2, y2: y2, stroke: D.BLEU, "stroke-width": k % 5 ? 2.5 : 4 }, parent); }
    const aig = D.el("g", {}, parent);
    D.el("path", { d: "M " + (cx - 5) + " " + cy + " L " + cx + " " + (cy - (R - 26)) + " L " + (cx + 5) + " " + cy + " Z", fill: ENCRE }, aig);
    D.el("circle", { cx: cx, cy: cy, r: 8, fill: ENCRE }, parent);
    return f => aig.setAttribute("transform", "rotate(" + th(bor(f, 0, 1)).toFixed(1) + " " + cx + " " + cy + ")");
  }
  /* thermomètre sans graduation chiffrée ; rend maj(f) (0 bas, 1 haut) ; la partie haute du tube est teintée en rouge */
  function thermometre(parent, x, yHaut, yBas) {
    const yBoule = yBas + 30, hg = f => yBas - f * (yBas - yHaut);
    D.el("rect", { x: x - 15, y: yHaut - 12, width: 30, height: yBas - yHaut + 44, rx: 15, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, parent);
    D.el("rect", { x: x - 11, y: yHaut - 6, width: 22, height: (yBas - yHaut) * 0.3, rx: 10, fill: "#f7d4cf" }, parent);
    D.el("circle", { cx: x, cy: yBoule, r: 30, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, parent);
    D.el("rect", { x: x - 11, y: yBoule - 38, width: 22, height: 20, fill: "#fff" }, parent);
    for (let k = 1; k <= 4; k++) D.el("line", { x1: x + 17, y1: hg(k / 5), x2: x + 30, y2: hg(k / 5), stroke: D.BLEU, "stroke-width": 3 }, parent);
    const mercure = D.el("rect", { x: x - 6, width: 12, fill: "#d64530" }, parent);
    D.el("circle", { cx: x, cy: yBoule, r: 21, fill: "#d64530" }, parent);
    return f => { mercure.setAttribute("y", hg(f).toFixed(1)); mercure.setAttribute("height", (yBoule - hg(f)).toFixed(1)); };
  }
  /* voyant : rond dont la couleur se change (vert / rouge / éteint) */
  function voyant(parent, cx, cy, r) {
    D.el("circle", { cx: cx, cy: cy, r: r + 5, fill: "#56636f" }, parent);
    const rond = D.el("circle", { cx: cx, cy: cy, r: r, fill: "#9aa7b5" }, parent);
    const reflet = D.el("ellipse", { cx: cx - r * 0.3, cy: cy - r * 0.35, rx: r * 0.3, ry: r * 0.18, fill: "#fff", opacity: 0.6 }, parent);
    return c => rond.setAttribute("fill", c);
  }
  /* flèche pleine (corps + pointe) de (x1, y) vers (x2, y), horizontale */
  function fleche(parent, x1, x2, y, ep, coul) {
    const s = x2 > x1 ? 1 : -1, tete = ep * 1.6, h = ep * 1.5;
    return D.el("path", { d: "M " + x1 + " " + (y - ep / 2) + " H " + (x2 - s * tete) + " V " + (y - h) + " L " + x2 + " " + y + " L " + (x2 - s * tete) + " " + (y + h) + " V " + (y + ep / 2) + " H " + x1 + " Z", fill: coul }, parent);
  }

  /* ---------- 0 · l'ouverture : l'héroïne, le supermarché, deux froids, une centrale, la carte, les trois chemins ---------- */
  const XC = 492; // milieu de la zone de la scène
  function supermarche(parent) {
    const g = D.el("g", { opacity: 0 }, parent);
    D.el("rect", { x: 40, y: 640, width: 905, height: 70, fill: "#e4ded1" }, g);
    D.el("rect", { x: 110, y: 330, width: 770, height: 310, fill: "#f4efe6", stroke: D.BLEU, "stroke-width": 5 }, g);
    D.el("rect", { x: 90, y: 292, width: 810, height: 44, rx: 6, fill: D.BLEU }, g);
    D.el("rect", { x: 300, y: 214, width: 390, height: 92, rx: 16, fill: D.ORANGE, stroke: "#fff", "stroke-width": 5 }, g);
    D.texte(g, 495, 280, "supermarché", { "text-anchor": "middle", "font-size": 52, "font-weight": 700, fill: "#fff", "font-family": TITRE });
    const vitre = (x0) => {
      D.el("rect", { x: x0, y: 372, width: 280, height: 230, rx: 8, fill: "#d3e8f6", stroke: "#56636f", "stroke-width": 5 }, g);
      const r = D.alea(x0), pal = ["#e8914a", "#4caf7d", "#d0453a", "#f2c94c", "#2f6fb8", "#8e44ad"];
      [452, 520, 588].forEach((y, j) => {
        D.el("rect", { x: x0 + 8, y: y, width: 264, height: 7, fill: "#8a96a3" }, g);
        for (let k = 0; k < 9; k++) D.el("rect", { x: x0 + 14 + k * 28.5, y: y - 24 - r() * 12, width: 22, height: 24 + r() * 12 + 0.01, rx: 3, fill: pal[Math.floor(r() * pal.length)] }, g);
      });
    };
    vitre(140); vitre(590);
    D.el("rect", { x: 430, y: 372, width: 130, height: 268, rx: 6, fill: "#d3e8f6", stroke: "#56636f", "stroke-width": 5 }, g);
    D.el("line", { x1: 495, y1: 372, x2: 495, y2: 640, stroke: "#56636f", "stroke-width": 5 }, g);
    [475, 515].forEach(x => D.el("rect", { x: x - 3, y: 480, width: 6, height: 70, rx: 3, fill: "#56636f" }, g));
    D.el("rect", { x: 415, y: 345, width: 160, height: 26, rx: 6, fill: D.ORANGE }, g);
    // le chariot, devant la façade
    const ch = D.el("g", { transform: "translate(780 678)" }, g);
    D.el("path", { d: "M -50 -46 H -34 L -22 -6 H 34 L 44 -36 H -30", fill: "none", stroke: ENCRE, "stroke-width": 5, "stroke-linejoin": "round", "stroke-linecap": "round" }, ch);
    D.el("path", { d: "M -28 -34 H 40 L 32 -8 H -20 Z", fill: "#e6edf4", stroke: ENCRE, "stroke-width": 3 }, ch);
    [-12, 28].forEach(x => D.el("circle", { cx: x, cy: 6, r: 8, fill: ENCRE }, ch));
    return g;
  }
  function vitrineFrais(parent) {
    const g = D.el("g", {}, parent);
    D.el("rect", { x: 0, y: 0, width: 400, height: 300, rx: 18, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 5 }, g);
    D.el("rect", { x: 16, y: 16, width: 368, height: 236, rx: 8, fill: "#f6fbff" }, g);
    D.el("rect", { x: 16, y: 16, width: 368, height: 9, fill: "#bfe3cf" }, g);
    [100, 176, 252].forEach(y => D.el("rect", { x: 16, y: y, width: 368, height: 8, fill: "#8a96a3" }, g));
    D.el("rect", { x: 16, y: 262, width: 368, height: 26, rx: 6, fill: "#6b7785" }, g);
    for (let k = 0; k < 10; k++) D.el("line", { x1: 40 + k * 34, y1: 268, x2: 40 + k * 34, y2: 282, stroke: "#4e5a66", "stroke-width": 4, "stroke-linecap": "round" }, g);
    [38, 128, 218].forEach(x => { // fromage : des parts
      D.el("polygon", { points: x + ",100 " + (x + 70) + ",100 " + (x + 70) + ",62", fill: "#f6d55c", stroke: "#b8901f", "stroke-width": 2.5, "stroke-linejoin": "round" }, g);
      D.el("polygon", { points: x + ",100 " + (x + 70) + ",62 " + (x + 84) + ",72 " + (x + 14) + ",108", fill: "#e3b93a", stroke: "#b8901f", "stroke-width": 2.5, "stroke-linejoin": "round" }, g);
      [[x + 48, 90], [x + 58, 78]].forEach(([cx, cy]) => D.el("circle", { cx: cx, cy: cy, r: 5, fill: "#d9aa26" }, g));
    });
    D.el("circle", { cx: 336, cy: 78, r: 22, fill: "#f4e3b0", stroke: "#b8901f", "stroke-width": 3 }, g);
    D.el("circle", { cx: 336, cy: 78, r: 11, fill: "none", stroke: "#b8901f", "stroke-width": 2 }, g);
    [70, 168, 266].forEach(cx => { // jambon
      D.el("ellipse", { cx: cx, cy: 160, rx: 44, ry: 20, fill: "#f09aa3", stroke: "#b85a66", "stroke-width": 3 }, g);
      D.el("ellipse", { cx: cx - 6, cy: 156, rx: 26, ry: 9, fill: "#f8c1c6" }, g);
      D.el("path", { d: "M " + (cx + 40) + " 160 q 12 -2 14 8", fill: "none", stroke: "#b85a66", "stroke-width": 3, "stroke-linecap": "round" }, g);
    });
    D.el("rect", { x: 320, y: 140, width: 56, height: 34, rx: 6, fill: "#f09aa3", stroke: "#b85a66", "stroke-width": 3 }, g);
    D.el("rect", { x: 328, y: 150, width: 40, height: 10, rx: 3, fill: "#fff" }, g);
    [[56, 232], [132, 232], [208, 232], [284, 232]].forEach(([cx, cy], k) => { // salade
      [[-14, 4, 17, "#5cb85c"], [14, 4, 17, "#4aa04a"], [0, -8, 19, "#7bd06b"]].forEach(([dx, dy, r, c]) => D.el("circle", { cx: cx + dx, cy: cy + dy, r: r, fill: c, stroke: "#2f7a2f", "stroke-width": 2 }, g));
      D.el("path", { d: "M " + cx + " " + (cy - 20) + " V " + (cy + 18), stroke: "#2f7a2f", "stroke-width": 2, fill: "none" }, g);
    });
    D.el("circle", { cx: 346, cy: 232, r: 16, fill: "#d0453a", stroke: "#8c241c", "stroke-width": 2.5 }, g);
    D.el("circle", { cx: 336, cy: 214, r: 5, fill: "#2f7a2f" }, g);
    return g;
  }
  function meubleSurgeles(parent) {
    const g = D.el("g", {}, parent);
    D.el("rect", { x: 0, y: 150, width: 400, height: 150, rx: 18, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 5 }, g);
    D.el("rect", { x: 14, y: 112, width: 372, height: 60, rx: 8, fill: "#e6f1fa", stroke: "#8fb3d1", "stroke-width": 3 }, g);
    for (let k = 0; k < 10; k++) D.el("line", { x1: 40 + k * 34, y1: 250, x2: 40 + k * 34, y2: 276, stroke: "#4e5a66", "stroke-width": 4, "stroke-linecap": "round" }, g);
    [[10, "#2f6fb8", 66], [96, "#e8914a", 74], [182, "#4caf7d", 62], [268, "#d0453a", 70]].forEach(([x, c, h]) => { // les bacs et leurs paquets givrés
      D.el("path", { d: "M " + (x - 2) + " 112 L " + (x + 6) + " 164 H " + (x + 70) + " L " + (x + 80) + " 112 Z", fill: "#fff", stroke: "#8fb3d1", "stroke-width": 3, "stroke-linejoin": "round" }, g);
      D.el("rect", { x: x + 6, y: 112 - h, width: 68, height: h, rx: 6, fill: c, stroke: "#1b3a63", "stroke-width": 3 }, g);
      D.el("rect", { x: x + 14, y: 112 - h * 0.62, width: 52, height: 16, rx: 3, fill: "#fff" }, g);
      D.el("ellipse", { cx: x + 40, cy: 112 - h + 3, rx: 36, ry: 9, fill: "#fff", opacity: 0.95 }, g);
      [[x + 14, 112 - h - 3], [x + 62, 112 - h - 4]].forEach(([cx, cy]) => D.el("circle", { cx: cx, cy: cy, r: 6, fill: "#fff" }, g));
    });
    flocon(g, 374, 44, 25, "#2f6fb8");
    return g;
  }

  S.intro = function (g, c) {
    const titre = D.el("g", {}, g);
    const t1 = D.texte(titre, XC, 262, c.recit.titre, { "text-anchor": "middle", "font-size": 56, "font-weight": 700, fill: D.BLEU, "font-family": TITRE });
    const t2 = D.texte(titre, XC, 322, c.recit.sousTitre, { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: D.ORANGE, "font-family": CORPS });
    [[t1, 56], [t2, 34]].forEach(([t, s]) => { const l = t.getComputedTextLength ? t.getComputedTextLength() : 0; if (l > 920) t.setAttribute("font-size", (s * 920 / l).toFixed(1)); });
    const pCO2 = pastille(g, "CO₂ · R744", D.BLEU, 46);
    place(pCO2, XC, 650);
    const mag = supermarche(g);
    // k2 : les deux meubles côte à côte ; k3 : ils rapetissent et se relient à la centrale
    const frais = D.el("g", { opacity: 0 }, g), surg = D.el("g", { opacity: 0 }, g);
    vitrineFrais(frais); meubleSurgeles(surg);
    const pFrais = pastille(g, "froid positif", VERT, 36), pNeg = pastille(g, "froid négatif", BLEU2, 36);
    const relie = D.el("g", { opacity: 0 }, g);
    [["M 199 396 V 570 H 372"], ["M 793 396 V 570 H 612"]].forEach(([d]) => {
      D.el("path", { d: d, fill: "none", stroke: "#8a4a24", "stroke-width": 20, "stroke-linejoin": "round" }, relie);
      D.el("path", { d: d, fill: "none", stroke: "#e7a978", "stroke-width": 8, "stroke-linejoin": "round" }, relie);
    });
    const centrale = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: 372, y: 516, width: 240, height: 108, rx: 16, fill: "url(#vm-marine)", stroke: D.BLEU, "stroke-width": 6 }, centrale);
    for (let k = 0; k < 6; k++) D.el("line", { x1: 396 + k * 34, y1: 530, x2: 396 + k * 34, y2: 540, stroke: "#5d80ad", "stroke-width": 5, "stroke-linecap": "round" }, centrale);
    D.texte(centrale, XC, 596, "centrale", { "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: "#fff", "font-family": TITRE });
    const pUn = pastille(g, "un seul fluide : la centrale booster", D.BLEU, 34);
    place(pUn, XC, 716);
    // k4 : la carte du circuit
    const cir = D.circuit(g, 40, 160, 900, true);
    opa(cir.g, 0);
    // les noms de la carte (≥ 30 px) s'effacent quand elle rétrécit (k5) : jamais de nom sous 28 px à l'écran (relecture du chat principal)
    const nomsCarte = Array.from(cir.g.querySelectorAll("text")).filter(e => Number(e.getAttribute("font-size")) >= 30);
    const grande = D.heroine(g, { r: 60 });
    // k5 : la grande flèche vers le diagramme
    const flDiag = D.el("g", { opacity: 0 }, g);
    fleche(flDiag, 740, 955, 442, 40, D.ORANGE);
    D.etiquette(flDiag, 848, 322, "à droite :", { "text-anchor": "middle", "font-weight": 700, fill: D.ORANGE });
    D.etiquette(flDiag, 848, 358, "le diagramme", { "text-anchor": "middle", "font-weight": 700, fill: D.ORANGE });
    const pAbs = pastille(g, "pression absolue ≈ manomètre + 1 bar", D.BLEU, 32);
    place(pAbs, 400, 712);
    // k6 : les trois chemins, partis ensemble de la bouteille
    const pP = D.BRANCHES, P = D.CIRCUIT_PTS, MEL = [890, 320];
    const trV = trajet(pP.MT.concat([MEL]), 0), trM = trajet(pP.flash.concat([MEL]), 0);
    const trO = trajet([P[11], P[12], P[13], P[14], P[15], P[1], P[2], P[3], P[4], MEL], 0);
    const pistes = D.el("g", { opacity: 0 }, cir.g); // dans le repère du circuit : la carte peut changer d'échelle
    const trVe = D.el("path", { fill: "none", stroke: VERT_C, "stroke-width": 13, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0.85 }, pistes);
    const trVi = D.el("path", { fill: "none", stroke: VIOLET_C, "stroke-width": 13, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0.85 }, pistes);
    const trOr = D.el("path", { fill: "none", stroke: ORANGE_C, "stroke-width": 13, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0.85 }, pistes);
    const ptV = D.el("circle", { r: 20, fill: VERT_C, stroke: "#fff", "stroke-width": 4 }, pistes), ptM = D.el("circle", { r: 20, fill: VIOLET_C, stroke: "#fff", "stroke-width": 4 }, pistes);
    const moi = D.heroine(pistes, { r: 30 });
    const pTrois = pastille(g, "trois chemins", D.BLEU, 38);
    place(pTrois, XC, 700);
    const lege = D.el("g", { opacity: 0 }, g);
    let lx = 30;
    [[ORANGE_C, "moi : le froid négatif"], [VERT_C, "froid positif"], [VIOLET_C, "vapeur de détente"]].forEach(([coul, s]) => {
      D.el("circle", { cx: lx + 14, cy: 736, r: 14, fill: coul, stroke: "#fff", "stroke-width": 3 }, lege);
      D.etiquette(lege, lx + 38, 747, s, { "font-size": 30, "font-weight": 700 });
      lx += 38 + mesure(lege, s, 30) + 44;
    });
    const pDep = pastille(g, "départ : les surgelés", BLEU2, 40);
    place(pDep, XC, 706);
    // la position de la petite molécule sur le diagramme : état et température selon l'endroit du cycle
    const tempW = w => D.courbe([[0, 0.03], [2, 0.06], [3, 0.35], [4, 0.25], [5, 0.95], [6, 0.5], [7, 0.3], [8.6, 0.3], [9, 0.03]], w, true);
    const etatW = w => w < 1 || (w >= 7 && w < 7.6) || w >= 8.8 ? "bout" : w < 4.7 ? "vapeur" : w < 6.95 ? "supercritique" : "liquide";
    return function (t) {
      const T = c.T, E = c.E, A = c.A;
      // titre, puis l'héroïne : grande au centre (k0), au pied du magasin (k1), en haut (k2-k3), absente (k4-k6), de retour (k7)
      opa(titre, 1 - lis((t - (T[0] - 1.4)) / 0.6));
      const hx = D.courbe([[0, XC], [T[0] + 0.6, XC], [E[0] + 0.1, XC], [T[1] + 0.9, 110], [E[1], 110], [T[2] + 0.9, XC], [T[7] - 0.4, XC], [T[7] + 0.1, 800], [T[7] + 0.9, 800], [E[7] + 0.2, 466]], t);
      const hy = D.courbe([[0, 540], [T[0] - 0.8, 540], [T[0] + 0.6, 410], [E[0] + 0.1, 410], [T[1] + 0.9, 668], [E[1], 668], [T[2] + 0.9, 215], [T[7] - 0.4, 215], [T[7] + 0.1, 330], [T[7] + 0.9, 592], [E[7] + 0.2, 592]], t);
      const hs = D.courbe([[0, 1], [T[0] - 0.8, 1], [T[0] + 0.6, 1.8], [E[0] + 0.1, 1.8], [T[1] + 0.9, 0.7], [E[1], 0.7], [T[2] + 0.9, 0.72], [T[7] - 0.4, 0.72], [T[7] + 0.1, 1.0], [T[7] + 0.9, 0.8], [E[7] + 0.2, 0.52]], t);
      const op = t < T[4] ? 1 - lis((t - (T[4] - 0.5)) / 0.4) : lis((t - (T[7] - 0.4)) / 0.5);
      const humeur = t > A(2, 0.3) && t < E[2] ? "surprise" : t > A(3, 0.1) && t < A(3, 0.5) ? "surprise" : "sourire";
      grande({ x: hx, y: hy + Math.sin(t * 2.2) * 8, s: hs, t: t, temp: 0.1, etat: "liquide", regard: [D.courbe([[T[1], 0], [T[2] + 1, 0.8], [T[3], 0]], t), 0], humeur: humeur, op: op });
      opa(pCO2, fen(t, A(0, 0.3), E[0] + 0.3));
      // k1 : le supermarché
      opa(mag, fen(t, T[1] - 0.5, E[1] + 0.55, 0.5));
      // k2 : deux meubles ; k3 : ils rapetissent et se relient à UNE centrale ; k4 : ils s'effacent devant la carte
      const m3 = lis((t - (T[3] - 0.2)) / 1), sortie = 1 - lis((t - (T[4] - 0.5)) / 0.4);
      opa(frais, lis((t - (T[2] - 0.2)) / 0.6) * sortie); opa(surg, lis((t - A(2, 0.5)) / 0.6) * sortie);
      frais.setAttribute("transform", "translate(" + D.lerp(40, 95, m3).toFixed(1) + " " + D.lerp(290, 240, m3).toFixed(1) + ") scale(" + D.lerp(1.05, 0.52, m3).toFixed(3) + ")");
      surg.setAttribute("transform", "translate(" + D.lerp(505, 689, m3).toFixed(1) + " " + D.lerp(290, 240, m3).toFixed(1) + ") scale(" + D.lerp(1.05, 0.52, m3).toFixed(3) + ")");
      place(pFrais, D.lerp(250, 199, m3), D.lerp(682, 205, m3)); place(pNeg, D.lerp(715, 793, m3), D.lerp(682, 205, m3));
      opa(pFrais, lis((t - A(2, 0.3)) / 0.4) * sortie); opa(pNeg, lis((t - A(2, 0.66)) / 0.4) * sortie);
      opa(relie, lis((t - A(3, 0.05)) / 0.7) * sortie); opa(centrale, lis((t - A(3, 0.15)) / 0.7) * sortie);
      opa(pUn, lis((t - A(3, 0.42)) / 0.5) * sortie);
      // k4 : la carte du circuit ; les organes s'allument tour à tour, dans l'ordre de la phrase
      const S0 = D.courbe([[0, 0.9], [T[5] - 0.3, 0.9], [T[5] + 0.6, 0.72]], t), ox = D.courbe([[0, 40], [T[5] - 0.3, 40], [T[5] + 0.6, 20]], t), oy = D.courbe([[0, 160], [T[5] - 0.3, 160], [T[5] + 0.6, 190]], t);
      cir.g.setAttribute("transform", "translate(" + ox.toFixed(1) + " " + oy.toFixed(1) + ") scale(" + S0.toFixed(3) + ")");
      opa(cir.g, lis((t - (T[4] - 0.1)) / 0.5));
      const vuNoms = 1 - lis((t - (T[5] - 0.3)) / 0.4);
      nomsCarte.forEach(e => e.setAttribute("opacity", vuNoms.toFixed(2)));
      const dans = (a, b) => t > a && t < b;
      cir.surligne("compBT", dans(A(4, 0.17), A(4, 0.43))); cir.surligne("compMT", dans(A(4, 0.17), A(4, 0.43)));
      cir.surligne("refroidisseur", dans(A(4, 0.43), A(4, 0.65)));
      cir.surligne("bouteille", dans(A(4, 0.65), A(4, 0.79)));
      cir.surligne("evapMT", dans(A(4, 0.79), E[4] + 0.5));
      cir.surligne("evapBT", dans(A(4, 0.79), E[4] + 0.5) || t > T[7] + 0.4);
      // k5 : la flèche vers le diagramme, la pastille « absolue » ; le diagramme fait le tour (k5-k6)
      opa(flDiag, fen(t, T[5] + 0.6, E[6] + 0.1, 0.5));
      opa(pAbs, fen(t, A(5, 0.42), E[5] + 0.3));
      const r = {};
      let w = 0;
      if (t >= T[5]) { w = 9 * bor((t - T[5]) / (E[6] - T[5]), 0, 1); r.diag = w; r.diag0 = 0; }
      // k6 : trois points partent ensemble de la bouteille et se retrouvent à l'aspiration moyenne température
      const u = lis((t - A(6, 0.3)) / (E[6] - 0.3 - A(6, 0.3)));
      opa(pistes, fen(t, A(6, 0.12), T[7] + 0.6, 0.4));
      trVe.setAttribute("d", trV.trace(u * trV.L)); trVi.setAttribute("d", trM.trace(u * trM.L)); trOr.setAttribute("d", trO.trace(u * trO.L));
      const [vx, vy] = trV.at(u * trV.L), [mx, my] = trM.at(u * trM.L), [ox2, oy2] = trO.at(u * trO.L);
      ptV.setAttribute("cx", vx.toFixed(1)); ptV.setAttribute("cy", (vy + u * 10).toFixed(1)); ptM.setAttribute("cx", mx.toFixed(1)); ptM.setAttribute("cy", (my - u * 10).toFixed(1));
      moi({ x: ox2, y: oy2, s: 0.62, t: t, temp: 0.3, etat: "liquide", humeur: "sourire", regard: [1, 0] });
      opa(pTrois, fen(t, A(6, 0.08), E[6] + 0.2)); opa(lege, fen(t, A(6, 0.3), E[6] + 0.4));
      // k7 : départ
      opa(pDep, lis((t - (T[7] + 0.2)) / 0.5));
      const wm = w % 9; r.temp = tempW(wm); r.etat = etatW(wm); r.humeur = r.temp > 0.6 ? "chaud" : "sourire";
      return r;
    };
  };

  /* ---------- 1 · l'évaporateur du meuble de surgelés ---------- */
  /* une rangée de bacs givrés au fond du meuble */
  function bacs(parent, y) {
    const pal = ["#2f6fb8", "#e8914a", "#4caf7d", "#d0453a", "#8e44ad", "#f2c94c", "#2f6fb8"], g = D.el("g", {}, parent);
    pal.forEach((c, i) => {
      const x = 40 + i * 130;
      D.el("rect", { x: x + 12, y: y + 8, width: 92, height: 26, rx: 5, fill: c, stroke: D.BLEU, "stroke-width": 2.5 }, g);
      D.el("rect", { x: x + 28, y: y + 17, width: 60, height: 10, rx: 3, fill: "#fff" }, g);
      D.el("path", { d: "M " + x + " " + (y + 24) + " H " + (x + 116) + " V " + (y + 56) + " H " + x + " Z", fill: "#fafdff", stroke: "#8fb3d1", "stroke-width": 3, "stroke-linejoin": "round" }, g);
      [[x + 8, y + 22, 9], [x + 40, y + 20, 7], [x + 74, y + 22, 10], [x + 106, y + 21, 7]].forEach(([cx, cy, r]) => D.el("circle", { cx: cx, cy: cy, r: r, fill: "#fff" }, g));
    });
    return g;
  }
  S["evaporateur-bt"] = function (g, c) {
    const X0 = 30, X1 = 950, YH = 450, YB = 590, FX0 = 330, FX1 = 650, CH0 = 300, CH1 = 690;
    D.el("rect", { x: 24, y: 158, width: 936, height: 596, rx: 22, fill: "#eef5fa", stroke: "#b7cbdc", "stroke-width": 4 }, g); // l'intérieur du meuble
    bacs(g, 694);
    flocon(g, 922, 196, 24, "#a9c8e2");
    for (let x = FX0; x <= FX1; x += 22) D.el("rect", { x: x, y: CH0, width: 7, height: CH1 - CH0, fill: "url(#vm-acier-h)", opacity: 0.55 }, g);
    const air = D.el("g", {}, g), chaud = D.el("g", {}, g), chevrons = [], vagues = [];
    [365, 440, 515, 590].forEach(x => { for (let j = 0; j < 3; j++) chevrons.push({ x: x, f: j / 3, maj: D.chevron(air) }); });
    for (let k = 0; k < 4; k++) [-1, 1].forEach(cote => vagues.push({ x: 402 + k * 75, cote: cote, f: D.frac(k * 0.37 + (cote > 0 ? 0.5 : 0)), maj: D.chaleur(chaud) }));
    D.el("rect", { x: X0, y: YH - 16, width: X1 - X0, height: 16, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: X0, y: YB, width: X1 - X0, height: 16, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: X0, y: YH, width: X1 - X0, height: YB - YH, fill: "#f4f8fc" }, g);
    const vap = D.el("g", {}, g), fond = D.el("g", {}, g);
    let pf = 1.5; // où la nappe s'arrête : elle se raccourcit pendant la phrase 5 (recalculé à chaque image)
    const pDe = x => (x - X0) / (X1 - X0), niv = p => 0.62 * (1 - lis(p / pf));
    const liq = D.liquide(g, { x0: X0, x1: X1, yh: YH, yb: YB, niveau: x => niv(pDe(x)), couleur: () => D.couleur(0.03, false) });
    const bul = D.bulles(D.el("g", {}, g), 40, 12, false);
    const r = D.alea(11), V = [];
    for (let i = 0; i < 46; i++) V.push({ s: r(), ry: r(), ph: r() * TOUR, maj: D.mol(vap) });
    const vent = D.ventilateur(g, 480, 245, 44);
    const lAir = etiquette(g, 548, 257, "air du meuble");
    const grMan = D.el("g", { opacity: 0 }, g);
    D.el("line", { x1: 100, y1: 330, x2: 100, y2: YH - 16, stroke: "#56636f", "stroke-width": 7 }, grMan);
    const man = manometre(grMan, 100, 288, 44);
    const pMoins = pastille(g, "−32 °C", BLEU2, 36, "start"); place(pMoins, 30, 652);
    const pBar = pastille(g, "≈ 13 bar", D.BLEU, 36, "start"); place(pBar, 168, 302);
    const lBasse = etiquette(g, 40, 212, "la plus basse de la centrale");
    const pEbul = pastille(g, "ébullition", BLEU2, 34, "end"); place(pEbul, 950, 270);
    // k6 : surchauffe, et la goutte qui ne doit pas partir au compresseur
    const goutte = D.el("g", { opacity: 0 }, g);
    D.el("path", { d: "M 700 328 Q 726 360 726 374 A 26 26 0 0 1 674 374 Q 674 360 700 328 Z", fill: "#8fc3f0", stroke: D.BLEU, "stroke-width": 3 }, goutte);
    const nonG = interdit(g, 700, 366, 44);
    const lPas = etiquette(g, 950, 352, ["pas de liquide", "au compresseur"], { "text-anchor": "end", "font-size": 30, "font-weight": 700, fill: ROUGE });
    const pSur = pastille(g, "surchauffe", D.ORANGE, 34, "end"); place(pSur, 950, 652);
    const mila = D.heroine(fond, { r: 30 });
    const tb = c.A(5, 0.15), tv = c.A(5, 0.72);
    return function (t) {
      const T = c.T, E = c.E, A = c.A;
      pf = D.courbe([[T[4], 1.5], [E[5], 0.74]], t);
      vent(t * 520);
      const chal = lis((t - (T[4] - 0.3)) / 0.8); // k4 : la chaleur de l'air du meuble vers le tube
      chevrons.forEach(ch => {
        const f = D.frac(ch.f + t * 0.16), y = CH0 + f * (CH1 - CH0);
        ch.maj(ch.x, y, 0, y < YH ? "#e8914a" : "#3d7fca", fen(f, 0, 1, 0.12) * (y > YH - 26 && y < YB + 26 ? 0 : 0.9));
      });
      vagues.forEach(v => {
        const f = D.frac(v.f + t * 0.45), d = 40 * f, y = v.cote < 0 ? YH - 60 + d : YB + 60 - d;
        v.maj(v.x, y, v.cote < 0 ? 0 : 180, chal * fen(f, 0, 1, 0.25));
      });
      liq.maj(t);
      const vis = lis((t - (T[5] - 0.3)) / 0.8); // k5 : les bulles
      bul(t, q => { const p = 0.02 + q * 0.72, x = X0 + p * (X1 - X0); return [x, YB - 6, liq.surface(x, t) + 4, niv(p) > 0.08 ? vis : 0]; });
      V.forEach(m => {
        const p = D.frac(m.s + t / 16), x = X0 + p * (X1 - X0), libre = liq.surface(x, t) - YH;
        m.maj(x, YH + 16 + m.ry * Math.max(0, libre - 32) + Math.sin(t * 3 + m.ph) * 5, p > 0.8 ? D.lerp(0.03, 0.09, (p - 0.8) / 0.2) : 0.03, true, bor((libre - 34) / 30, 0, 1));
      });
      // les repères
      opa(grMan, fen(t, A(3, 0.3), E[4] + 0.2)); man(0.13 * lis((t - A(3, 0.3)) / 0.8));
      opa(pMoins, fen(t, A(2, 0.55), E[3] + 0.4)); opa(pBar, fen(t, A(3, 0.3), E[4] + 0.2));
      opa(lBasse, fen(t, A(3, 0.62), E[3] + 0.5));
      opa(lAir, fen(t, T[4], E[4] + 0.5));
      opa(pEbul, fen(t, tb, E[5] + 0.4));
      opa(goutte, fen(t, A(6, 0.45), c.D, 0.5)); opa(nonG, fen(t, A(6, 0.55), c.D, 0.5)); opa(lPas, fen(t, A(6, 0.55), c.D, 0.5));
      opa(pSur, lis((t - T[6]) / 0.4));
      // l'héroïne : elle traverse le tube de la gauche vers la droite, `bout` puis `vapeur`
      const p = D.courbe([[T[2], 0.055], [E[2], 0.13], [E[3], 0.26], [T[5], 0.4], [tv, 0.55], [E[5], 0.66], [E[6], 0.86], [c.D - 0.2, 0.93]], t);
      const x = X0 + p * (X1 - X0), envol = lis((t - tv) / 1.4), surf = liq.surface(x, t);
      const yL = Math.max(surf + 4 + Math.sin(t * 2) * 4, YH + 40), yV = Math.min(YH + 54 + Math.sin(t * 2.5) * 8, surf - 46);
      const etat = t < tv + 0.6 ? "bout" : "vapeur", temp = D.courbe([[T[6], 0.03], [E[6], 0.06]], t);
      const humeur = t < tb ? "froid" : t < tv + 1.2 ? "surprise" : "sourire";
      mila({ x: x, y: D.lerp(yL, yV, envol), s: 1.1, t: t, temp: temp, etat: etat, humeur: humeur, regard: [1, 0] });
      return { diag: D.courbe([[T[2], 0], [E[5], 1], [T[6], 1], [E[6], 2]], t, true), diag0: 0, temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* ---------- 2 · le compresseur basse température (à piston, en coupe, dans un rack) ----------
     La coupe est celle de l'édition CO₂ (repère « CO₂ » 1600 × 770), posée dans un groupe réduit
     (× 0,9) : scène = 0,9 × repère − 250 en x, 0,9 × repère + 1 en y. Les textes sont hors du groupe. */
  S["compresseur-bt"] = function (g, c) {
    const K = 0.9, TX = -250, TY = 1, YP0 = 424, COURSE = 196;
    const sx = x => K * x + TX, sy = y => K * y + TY;
    const gc = D.el("g", { transform: "translate(" + TX + " " + TY + ") scale(" + K + ")" }, g);
    // les voisins du rack : d'autres compresseurs, pâles, sous la même ligne d'aspiration
    [306, 439].forEach(x => {
      const v = D.el("g", { opacity: 0.55 }, gc);
      D.el("rect", { x: x, y: 406, width: 122, height: 250, fill: "url(#vm-acier-h)", stroke: "#5d6b7a", "stroke-width": 3 }, v);
      D.el("rect", { x: x - 6, y: 382, width: 134, height: 28, rx: 6, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 3 }, v);
      D.el("rect", { x: x - 4, y: 656, width: 130, height: 44, rx: 10, fill: "url(#vm-marine)", stroke: D.BLEU, "stroke-width": 3 }, v);
    });
    D.el("rect", { x: 300, y: 308, width: 305, height: 74, fill: "url(#vm-cuivre)" }, gc);
    D.el("rect", { x: 995, y: 308, width: 338, height: 74, fill: "url(#vm-cuivre)" }, gc);
    D.el("rect", { x: 300, y: 320, width: 305, height: 50, fill: "#eef4fa" }, gc);
    D.el("rect", { x: 995, y: 320, width: 338, height: 50, fill: "#fbefe6" }, gc);
    D.el("rect", { x: 590, y: 290, width: 420, height: 112, rx: 10, fill: "url(#vm-acier)" }, gc);
    D.el("rect", { x: 600, y: 300, width: 190, height: 100, fill: "#eef4fa" }, gc);
    D.el("rect", { x: 810, y: 300, width: 190, height: 100, fill: "#fbefe6" }, gc);
    D.el("rect", { x: 590, y: 320, width: 14, height: 50, fill: "#eef4fa" }, gc);
    D.el("rect", { x: 996, y: 320, width: 14, height: 50, fill: "#fbefe6" }, gc);
    D.el("rect", { x: 590, y: 418, width: 420, height: 272, fill: "url(#vm-acier-h)" }, gc);
    D.el("rect", { x: 610, y: 418, width: 380, height: 272, fill: "#f3f6fa" }, gc);
    const mols = D.el("g", {}, gc);
    const bielle = D.el("rect", { x: 785, y: 0, width: 30, height: 10, fill: "url(#vm-acier-h)" }, gc);
    const piston = D.el("g", {}, gc);
    D.el("rect", { x: 612, y: 0, width: 376, height: 56, rx: 6, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, piston);
    [16, 30].forEach(y => D.el("line", { x1: 612, y1: y, x2: 988, y2: y, stroke: "#5d6b7a", "stroke-width": 2 }, piston));
    D.el("rect", { x: 590, y: 400, width: 60, height: 18, fill: "#6b7785" }, gc);
    D.el("rect", { x: 720, y: 400, width: 160, height: 18, fill: "#6b7785" }, gc);
    D.el("rect", { x: 950, y: 400, width: 60, height: 18, fill: "#6b7785" }, gc);
    const clapA = D.el("rect", { x: 645, y: 418, width: 82, height: 8, rx: 3, fill: "#24384f" }, gc);
    const clapR = D.el("rect", { x: 875, y: 392, width: 82, height: 8, rx: 3, fill: "#24384f" }, gc);
    D.el("rect", { x: 575, y: 690, width: 450, height: 70, rx: 14, fill: "url(#vm-marine)", stroke: D.BLEU, "stroke-width": 6 }, gc);
    D.el("path", { d: "M 625 700 L 609 730 L 623 730 L 613 752 L 641 722 L 627 722 L 639 700 Z", fill: "#ffd166" }, gc);
    D.texte(gc, 830, 736, "moteur électrique", { "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#fff", "font-family": CORPS });
    // les noms des pièces (phrase 2), avec leur trait
    const lab = D.el("g", {}, g);
    const lA = etiquette(lab, 40, 214, "clapet d'aspiration", null, [200, 226, sx(670), sy(412) - 8]);
    const lR = etiquette(lab, 560, 214, "clapet de refoulement", null, [610, 226, sx(915), sy(392) - 8]);
    const lP = etiquette(lab, 700, 500, "piston");
    const ligneP = D.trait(lab, 692, 488, sx(990), 500);
    opa(lA, 1); opa(lR, 1); opa(lP, 1);
    // k3 : deux manomètres, 13 bar puis 28 bar
    const jauges = D.el("g", { opacity: 0 }, g);
    [100, 730].forEach(x => D.el("line", { x1: x, y1: 268, x2: x, y2: 282, stroke: "#56636f", "stroke-width": 7 }, jauges));
    const mA = manometre(jauges, 100, 222, 44), mB = manometre(jauges, 730, 222, 44);
    D.etiquette(jauges, 164, 240, "13 bar", { "font-size": 36, "font-weight": 700, fill: D.BLEU });
    D.etiquette(jauges, 794, 240, "28 bar", { "font-size": 36, "font-weight": 700, fill: D.ORANGE });
    fleche(jauges, 270, 640, 222, 9, "#9aa7b5");
    // k5 : « vers le refroidisseur de gaz » (barré) ; k6 : « vers l'aspiration moyenne température » (coché)
    const pan5 = panneau(g, 700, 412, ["vers le", "refroidisseur", "de gaz"], ROUGE, 30);
    const non5 = interdit(g, 712, 394, 30);
    const pan6 = panneau(g, 666, 412, ["vers l'aspiration", "moyenne température"], VERT, 28);
    const ok6 = coche(g, 684, 394, 28);
    const pSecret = pastille(g, "le secret de la booster", D.BLEU, 36); place(pSecret, 470, 745);
    const pRal = pastille(g, "au ralenti", GRIS, 28, "start"); place(pRal, 30, 745);
    const r = D.alea(23), M = 24, LOTS = [0, 1, 2].map(() => {
      const l = [];
      for (let j = 0; j < M; j++) l.push({ u: 0.06 + r() * 0.88, v: 0.06 + r() * 0.88, e: r() * 0.6, w: r(), maj: D.mol(mols) });
      return l;
    });
    const MOI = { u: 0.45, v: 0.5, e: 0.12, w: 0.5 };
    const mila = D.heroine(gc, { r: 30 });
    const yp = phi => YP0 + (1 - Math.cos(phi)) / 2 * COURSE;
    const tempDe = y => 0.06 + 0.29 * lis((620 - y) / (620 - 452));
    function pos(m, L, y) { // position, température, visibilité d'une molécule de phase locale L (repère de la coupe)
      const cx = 612 + 14 + m.u * 348, cyc = 418 + 14 + m.v * Math.max(4, y - 418 - 28);
      if (L < 0) { const q = 1 + L / TOUR; return [D.lerp(322 + m.w * 240, 640, q * q), 345 + (m.v - 0.5) * 36, 0.06, 1]; }
      if (L < Math.PI) {
        const k = lis((L / Math.PI - m.e) / 0.35);
        return k < 0.5 ? [D.lerp(640, 686, k * 2), D.lerp(345, 412, k * 2), 0.06, 1] : [D.lerp(686, cx, k * 2 - 1), D.lerp(412, cyc, k * 2 - 1), 0.06, 1];
      }
      if (L < 1.75 * Math.PI) return [cx, cyc, tempDe(y), 1];
      if (L < TOUR) {
        const k = lis(((L - 1.75 * Math.PI) / (0.25 * Math.PI) - m.w * 0.4) / 0.6);
        return k < 0.5 ? [D.lerp(cx, 915, k * 2), D.lerp(cyc, 405, k * 2), 0.35, 1] : [D.lerp(915, 930 + m.u * 60, k * 2 - 1), D.lerp(405, 345 + (m.v - 0.5) * 36, k * 2 - 1), 0.35, 1];
      }
      const q = (L - TOUR) / TOUR, x = 930 + m.u * 60 + q * (640 + m.w * 260);
      return [x, 345 + (m.v - 0.5) * 36, 0.35, L < 2 * TOUR ? bor((1320 - x) / 40, 0, 1) : 0];
    }
    const t5 = c.E[5];
    return function (t) {
      const T = c.T, E = c.E, A = c.A;
      // un premier tour lent derrière la carte ; k2 : le piston descend (j'entre) puis remonte (on me serre) ; k3-k4 : il monte ; k5 : refoulement ; ensuite, régime normal
      const phi = t < t5 ? D.courbe([[0, 0], [T[2] - 0.2, TOUR], [A(2, 0.45), 1.5 * TOUR], [E[3], 1.76 * TOUR], [E[4], 1.86 * TOUR], [T[5] + 0.2, 1.88 * TOUR], [t5, 2 * TOUR]], t, true)
        : 2 * TOUR + (t - t5) * TOUR / 1.3;
      const y = yp(phi), n = Math.floor(phi / TOUR), f = phi - n * TOUR;
      piston.setAttribute("transform", "translate(0 " + y.toFixed(1) + ")");
      bielle.setAttribute("y", (y + 50).toFixed(1)); bielle.setAttribute("height", (700 - y - 50).toFixed(1));
      ligneP.setAttribute("y2", (sy(y + 28)).toFixed(1));
      clapA.setAttribute("transform", "rotate(" + (f > 0.03 * TOUR && f < 0.48 * TOUR ? 28 : 0) + " 645 418)");
      clapR.setAttribute("transform", "rotate(" + (f > 0.875 * TOUR && f < 0.995 * TOUR ? 28 : 0) + " 957 400)");
      for (let m = n - 1; m <= n + 1; m++) {
        const lot = LOTS[((m % 3) + 3) % 3], L = phi - m * TOUR;
        lot.forEach(mo => { const [x, yy, temp, op] = pos(mo, L, y); mo.maj(x, yy, temp, true, op); });
      }
      const temp = t < E[3] ? 0.06 : D.courbe([[E[3], 0.06], [E[4], 0.35]], t);
      let mx, my;
      if (t < t5) [mx, my] = pos(MOI, phi - TOUR, y);
      else { mx = D.lerp(957, 1250, bor((t - t5) / (c.D - t5 - 0.6), 0, 1)); my = 345; }
      const L = phi - TOUR, serre = L > Math.PI && L < 1.8 * Math.PI ? lis((620 - y) / 168) : 0;
      const etat = "vapeur", humeur = t < T[3] ? "sourire" : t < T[5] ? "surprise" : "chaud";
      mila({ x: mx, y: my, s: L > 0 && L < TOUR ? 0.8 : 0.76, t: t, temp: temp, etat: etat, humeur: humeur, ecrase: serre * 0.8, regard: [1, 0] });
      // les repères
      opa(pRal, t < t5 ? 1 : 0);
      opa(lab, 1 - lis((t - (T[3] - 0.2)) / 0.3));
      opa(jauges, fen(t, A(3, 0.12), E[4] + 0.5)); mA(0.13 * lis((t - A(3, 0.15)) / 0.6)); mB(0.28 * lis((t - A(3, 0.5)) / 0.8));
      opa(pan5.g, fen(t, T[5] + 0.3, E[5] + 0.45)); opa(non5, fen(t, A(5, 0.3), E[5] + 0.45));
      opa(pan6.g, lis((t - T[6]) / 0.5)); opa(ok6, lis((t - A(6, 0.12)) / 0.5));
      opa(pSecret, lis((t - A(6, 0.55)) / 0.5));
      return { diag: D.courbe([[T[2], 2], [E[4], 3]], t, true), diag0: 2, temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* ---------- 3 · « pourquoi booster ? » : un escalier de pressions ----------
     Une marche = le profil d'une conduite : le sol (13 bar), une contremarche où le compresseur pousse,
     le palier d'arrivée. L'héroïne marche sur le trait, monte la contremarche à gauche du compresseur. */
  S.booster = function (g, c) {
    const profil = (parent, d) => {
      D.el("path", { d: d, fill: "none", stroke: "#8a96a3", "stroke-width": 16, "stroke-linejoin": "round", "stroke-linecap": "round" }, parent);
      D.el("path", { d: d, fill: "none", stroke: "#dde5ee", "stroke-width": 7, "stroke-linejoin": "round", "stroke-linecap": "round" }, parent);
    };
    const boite = (parent, nom, cx, cy) => {
      D.el("rect", { x: cx - 44, y: cy - 44, width: 88, height: 88, rx: 14, fill: "#fff", stroke: "rgba(27,58,99,.45)", "stroke-width": 4 }, parent);
      D.image(parent, nom, cx - 36, cy - 36, 72, 72);
    };
    const gauche = D.el("g", { opacity: 0 }, g), droite = D.el("g", { opacity: 0 }, g);
    profil(gauche, "M 40 640 H 250 V 270 H 460"); profil(droite, "M 490 640 H 650 V 495 H 800 V 270 H 945");
    boite(gauche, "compBT", 250, 585);
    boite(droite, "compBT", 650, 590); boite(droite, "compMT", 800, 445);
    // k2 : le thermomètre sous le palier de la grande marche
    const thermo = D.el("g", { opacity: 0 }, gauche), lecture = thermometre(thermo, 330, 320, 520);
    const lDeg = etiquette(gauche, 376, 396, ["plus de", "150 °C"], { "font-size": 34, "font-weight": 700, fill: ROUGE });
    const nonUn = interdit(gauche, 250, 585, 56);
    const cocheUn = coche(droite, 690, 548, 24), cocheDeux = coche(droite, 840, 403, 24);
    // les pressions, posées sur les paliers
    const p13g = pastille(gauche, "13 bar", D.BLEU, 34); place(p13g, 140, 692);
    const p90g = pastille(gauche, "90 bar", D.ORANGE, 34); place(p90g, 355, 188);
    D.trait(p90g, 0, 20, 0, 74);
    const p13d = pastille(droite, "13 bar", D.BLEU, 34); place(p13d, 570, 692);
    const p28d = pastille(droite, "28 bar", D.BLEU, 34); place(p28d, 800, 584);
    const p90d = pastille(droite, "90 bar", D.ORANGE, 34); place(p90d, 872, 188);
    D.trait(p90d, 0, 20, 0, 74);
    const pTaux = pastille(g, "taux de compression : près de 7", ROUGE, 34); place(pTaux, 492, 744);
    const pBoost = pastille(g, "to boost : pousser, renforcer", D.BLEU, 34); place(pBoost, 492, 746);
    // k5 : le relais, de compresseur en compresseur
    const relais = D.el("g", { opacity: 0 }, g);
    const dRel = "M 700 560 Q 745 540 760 490";
    const fil = D.el("path", { d: dRel, fill: "none", stroke: D.ORANGE, "stroke-width": 10, "stroke-linecap": "round", "stroke-dasharray": "18 12", opacity: 0.9 }, relais);
    D.el("path", { d: "M 744 506 L 760 484 L 778 504", fill: "none", stroke: D.ORANGE, "stroke-width": 10, "stroke-linecap": "round", "stroke-linejoin": "round" }, relais);
    const balle = D.el("circle", { r: 13, fill: D.ORANGE, stroke: "#fff", "stroke-width": 4 }, relais);
    const ringUn = D.el("rect", { x: 606, y: 546, width: 88, height: 88, rx: 14, fill: "none", stroke: D.ORANGE, "stroke-width": 8, opacity: 0 }, g);
    const ringDeux = D.el("rect", { x: 756, y: 401, width: 88, height: 88, rx: 14, fill: "none", stroke: D.ORANGE, "stroke-width": 8, opacity: 0 }, g);
    // k0 : la question
    const pense = D.el("g", { opacity: 0 }, g);
    [[548, 468, 9], [580, 428, 14], [618, 384, 19]].forEach(([cx, cy, r]) => D.el("circle", { cx: cx, cy: cy, r: r, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, pense));
    D.el("ellipse", { cx: 700, cy: 300, rx: 112, ry: 76, fill: "#fff", stroke: D.BLEU, "stroke-width": 5 }, pense);
    D.texte(pense, 700, 338, "?", { "text-anchor": "middle", "font-size": 110, "font-weight": 700, fill: D.ORANGE, "font-family": TITRE });
    // k6 : le dépannage, deux fois deux étages
    const dep = D.el("g", { opacity: 0 }, g);
    const etage = (x, y, nom, img) => {
      D.el("rect", { x: x, y: y, width: 270, height: 120, rx: 18, fill: "#fff", stroke: D.BLEU, "stroke-width": 5 }, dep);
      D.image(dep, img, x + 14, y + 24, 72, 72);
      D.texte(dep, x + 98, y + 76, nom, { "font-size": 36, "font-weight": 700, fill: D.BLEU, "font-family": TITRE });
      return voyant(dep, x + 244, y + 28, 15);
    };
    const v1a = etage(100, 230, "étage MT", "compMT"), v1b = etage(590, 230, "étage BT", "compBT");
    const v2a = etage(100, 480, "étage BT", "compBT"), v2b = etage(590, 480, "étage MT", "compMT");
    const fl1 = fleche(dep, 392, 570, 290, 16, ROUGE), fl2 = fleche(dep, 392, 570, 540, 16, "#9aa7b5");
    const non2 = interdit(dep, 481, 540, 36);
    const cap = (x, y, s, coul) => { const e = D.etiquette(dep, x, y, s, { "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: coul }); e.setAttribute("opacity", 0); return e; };
    const c1a = cap(235, 392, "en défaut", ROUGE), c1b = cap(725, 392, "s'arrête aussi", ROUGE);
    const c2a = cap(235, 642, "en défaut", ROUGE), c2b = cap(725, 642, "continue", VERT);
    const pInv = pastille(g, "l'inverse n'est pas vrai", ROUGE, 38); place(pInv, 492, 735);
    // l'héroïne : son chemin sur la grande marche, puis sur les deux marches
    const mila = D.heroine(g, { r: 30 });
    const trA = trajet([[100, 610], [250, 610], [250, 243], [460, 243]], 42);
    const trB = trajet([[528, 610], [650, 610], [650, 468], [800, 468], [800, 243], [880, 243]], 42);
    return function (t) {
      const T = c.T, E = c.E, A = c.A;
      // les escaliers
      const dx = 220 * (1 - lis((t - A(3, 0.45)) / 1)); // la grande marche est d'abord au centre, puis laisse la place aux deux marches
      gauche.setAttribute("transform", "translate(" + dx.toFixed(1) + " 0)");
      opa(gauche, lis((t - (T[1] - 0.1)) / 0.6) * (1 - 0.65 * lis((t - (T[4] - 0.2)) / 0.6)) * (1 - lis((t - (T[6] - 0.3)) / 0.5)));
      opa(droite, lis((t - (T[4] - 0.2)) / 0.6) * (1 - lis((t - (T[6] - 0.3)) / 0.5)));
      opa(p13g, lis((t - A(1, 0.55)) / 0.4)); opa(p90g, lis((t - A(1, 0.8)) / 0.4));
      opa(p13d, lis((t - A(4, 0.2)) / 0.4)); opa(p28d, lis((t - A(4, 0.5)) / 0.4)); opa(p90d, lis((t - A(4, 0.8)) / 0.4));
      // la température de l'héroïne, et le thermomètre de la grande marche
      const temp = D.courbe([[0, 0.06], [A(2, 0.3), 0.06], [A(2, 0.8), 1], [E[3], 1], [T[4] + 0.4, 0.06], [A(4, 0.4), 0.06], [A(4, 0.58), 0.35], [A(4, 0.74), 0.35], [E[4] + 0.1, 0.8]], t, true);
      opa(thermo, lis((t - A(2, 0.15)) / 0.5)); lecture((temp - 0.06) / 0.94);
      opa(lDeg, lis((t - A(2, 0.62)) / 0.4));
      opa(nonUn, lis((t - A(3, 0.55)) / 0.4)); opa(pTaux, fen(t, A(3, 0.2), E[3] + 0.6));
      opa(cocheUn, lis((t - A(4, 0.6)) / 0.4)); opa(cocheDeux, lis((t - A(4, 0.92)) / 0.4));
      // k5 : le relais
      const rel = fen(t, T[5] + 0.3, E[5] + 0.3);
      opa(relais, rel); fil.setAttribute("stroke-dashoffset", (-(t * 40) % 30).toFixed(1));
      const u = D.frac((t - T[5]) / 1.6), bq = (1 - u) * (1 - u), b2 = 2 * u * (1 - u), b3 = u * u;
      balle.setAttribute("cx", (bq * 700 + b2 * 745 + b3 * 760).toFixed(1)); balle.setAttribute("cy", (bq * 560 + b2 * 540 + b3 * 490).toFixed(1));
      balle.setAttribute("opacity", (fen(u, 0, 1, 0.12)).toFixed(2));
      opa(ringUn, rel * (D.frac((t - T[5]) / 1.6) < 0.5 ? 1 : 0.25)); opa(ringDeux, rel * (D.frac((t - T[5]) / 1.6) < 0.5 ? 0.25 : 1));
      opa(pBoost, fen(t, A(5, 0.58), E[5] + 0.7, 0.5));
      // k0 : la question ; k6 : le dépannage
      opa(pense, fen(t, T[0] + 0.3, E[0] + 0.7, 0.5));
      opa(dep, lis((t - (T[6] - 0.1)) / 0.5));
      const ROUGE_V = "#d64530", VERT_V = "#2fa866", GRIS_V = "#9aa7b5";
      v1a(t > A(6, 0.12) ? ROUGE_V : VERT_V); v1b(t > A(6, 0.3) ? ROUGE_V : VERT_V);
      v2a(t > A(6, 0.52) ? ROUGE_V : VERT_V); v2b(VERT_V);
      opa(fl1, lis((t - A(6, 0.16)) / 0.4)); opa(c1a, lis((t - A(6, 0.14)) / 0.4)); opa(c1b, lis((t - A(6, 0.32)) / 0.4));
      opa(fl2, lis((t - A(6, 0.54)) / 0.4)); opa(non2, lis((t - A(6, 0.62)) / 0.4)); opa(c2a, lis((t - A(6, 0.54)) / 0.4)); opa(c2b, lis((t - A(6, 0.66)) / 0.4));
      opa(pInv, lis((t - A(6, 0.7)) / 0.5));
      // l'héroïne
      let x, y, s = 0.7, ecrase = 0;
      const dA = D.courbe([[T[1] + 0.5, 0], [A(2, 0.1), 0], [A(2, 0.25), 150], [A(2, 0.65), 517], [E[2] + 0.4, 600], [A(3, 0.75), 600], [E[3], 727]], t, true);
      if (t < T[1] + 0.5) {
        x = D.courbe([[T[1] - 0.3, 492], [T[1] + 0.5, 100 + dx]], t); y = D.courbe([[T[1] - 0.3, 520], [T[1] + 0.5, 610]], t);
        s = D.courbe([[T[1] - 0.3, 1.5], [T[1] + 0.5, 0.8]], t);
      } else if (t < E[3]) { [x, y] = trA.at(dA); x += dx; s = 0.8; }
      else if (t < T[4] + 0.4) { // elle tombe du bord, et retombe sur ses pieds au pied de la première marche
        const qf = (t - E[3]) / (T[4] + 0.4 - E[3]);
        x = D.lerp(460, 528, lis(qf)); y = D.lerp(243, 610, qf * qf); s = 0.8;
      } else {
        const dB = D.courbe([[T[4] + 0.4, 0], [A(4, 0.3), 122], [A(4, 0.4), 122], [A(4, 0.58), 264], [A(4, 0.66), 414], [A(4, 0.74), 414], [E[4] + 0.1, 639], [E[4] + 1, 719]], t, true);
        [x, y] = trB.at(dB); s = 0.8;
        ecrase = 0.6 * (1 - lis((t - (T[4] + 0.4)) / 0.3));
      }
      const humeur = t < T[1] ? "surprise" : t < A(2, 0.25) ? "sourire" : t < E[3] ? "chaud" : t < T[4] + 0.7 ? "surprise" : "sourire";
      const regard = t < T[1] ? [0.7, -1] : t < A(2, 0.8) ? [0, -1] : [0.5, 0];
      mila({ x: x, y: y + (t < T[1] + 0.5 ? Math.sin(t * 2.2) * 6 : 0), s: s, t: t, temp: temp, etat: "vapeur", humeur: humeur, regard: regard, ecrase: ecrase, op: 1 - lis((t - (T[6] - 0.2)) / 0.4) });
      return { temp: 0.35, etat: "vapeur", humeur: humeur === "chaud" ? "chaud" : "sourire" };
    };
  };

  /* ---------- 4 · l'aspiration moyenne température : trois chemins se rejoignent ----------
     Un gros tube horizontal vers le compresseur MT ; trois arrivées : le bas (refoulement BT, orange),
     la gauche (froid positif, vert), le haut (vapeur de détente, violet). Chaque chemin a ses
     molécules (flux continu) et, pour les deux voisines, son personnage. */
  S["aspiration-mt"] = function (g, c) {
    const YC = 435;
    const cuivre = (x, y, l, h) => D.el("rect", { x: x, y: y, width: l, height: h, fill: "url(#vm-cuivre)" }, g);
    cuivre(30, 379, 770, 112, false);
    D.el("rect", { x: 30, y: 395, width: 770, height: 80, fill: "#f4f8fc" }, g);
    D.el("rect", { x: 22, y: 371, width: 14, height: 128, rx: 4, fill: "url(#vm-acier-h)" }, g);
    // k1 : les deux piquages (le bas et le haut) ; l'arrivée par la gauche est le bout ouvert du tube
    const piquages = D.el("g", { opacity: 0 }, g);
    [[204, 491, 221, 220, 395, 317, 196, 700], [364, 162, 217, 380, 170, 305, 356, 162]].forEach(([x, y, h, xi, yi, hi, xf, yf]) => {
      D.el("rect", { x: x, y: y, width: 112, height: h, fill: "url(#vm-cuivre-h)" }, piquages);
      D.el("rect", { x: xi, y: yi, width: 80, height: hi, fill: "#f4f8fc" }, piquages);
      D.el("rect", { x: xf, y: yf, width: 128, height: 14, rx: 4, fill: "url(#vm-acier)" }, piquages);
    });
    // k0 : le sens du courant dans le gros tube
    const sens = D.el("g", {}, g), chev = [0, 1, 2, 3].map(i => ({ s: i / 4, e: D.el("path", { d: "M -9 -16 L 8 0 L -9 16", fill: "none", stroke: "#9aa7b5", "stroke-width": 8, "stroke-linecap": "round", "stroke-linejoin": "round" }, sens) }));
    // le compresseur MT, au bout du tube
    D.el("rect", { x: 800, y: 372, width: 145, height: 126, rx: 18, fill: "#fff", stroke: D.BLEU, "stroke-width": 5 }, g);
    D.image(g, "compMT", 812, 384, 121, 102);
    D.etiquette(g, 950, 536, "compresseur MT", { "text-anchor": "end", "font-weight": 700, fill: D.BLEU });
    // les flux de molécules : trois chemins, trois couleurs
    const flux = (tr, n, graine, coul) => {
      const r = D.alea(graine), parent = D.el("g", {}, g), L = [];
      for (let i = 0; i < n; i++) L.push({ s: (i + r() * 0.7) / n, dec: (r() - 0.5) * 52, m: molC(parent) });
      return (t, vitesse, op) => L.forEach(q => {
        const d = D.frac(q.s + t * vitesse / tr.L) * tr.L, [x, y] = tr.at(d, q.dec);
        q.m(x, y, coul, op * fen(d, 0, tr.L, 36));
      });
    };
    const trO = trajet([[260, 706], [260, YC], [800, YC]], 42), trV = trajet([[30, YC], [800, YC]], 0), trM = trajet([[420, 170], [420, YC], [800, YC]], 42);
    const fluxO = flux(trO, 11, 31, ORANGE_C), fluxV = flux(trV, 10, 32, VERT_C), fluxM = flux(trM, 10, 33, VIOLET_C);
    // les noms des trois arrivées et la pastille
    const lTube = etiquette(g, 490, 352, "aspiration moyenne température", { "font-weight": 700, fill: D.BLEU });
    const pTrois = pastille(g, "trois chemins", D.BLEU, 36, "start"); place(pTrois, 40, 236);
    const lBT = etiquette(g, 330, 650, "refoulement BT", { "font-weight": 700, fill: D.ORANGE });
    const lFP = etiquette(g, 44, 352, "froid positif", { "font-weight": 700, fill: VERT });
    const lGD = etiquette(g, 496, 236, "vapeur de détente", { "font-weight": 700, fill: VIOLET });
    // les personnages : l'héroïne (par le bas), la voisine verte (par la gauche), la voisine violette (par le haut)
    const vert = D.heroine(g, { r: 26, teinte: VERT_C, sansHalo: true, dephasage: 0.4 }), violette = D.heroine(g, { r: 26, teinte: VIOLET_C, sansHalo: true, dephasage: 0.7 });
    const mila = D.heroine(g, { r: 30 });
    // k6 : deux thermomètres côte à côte
    const therm = D.el("g", { opacity: 0 }, g);
    const lecA = thermometre(therm, 380, 515, 645), lecB = thermometre(therm, 650, 515, 645);
    const lT1 = etiquette(therm, 424, 586, ["froid positif", "seul"], { "font-size": 32, "font-weight": 700, fill: VERT });
    const lT2 = etiquette(therm, 694, 586, "mélange", { "font-size": 32, "font-weight": 700, fill: D.BLEU });
    opa(lT1, 1); opa(lT2, 1);
    const pDef = pastille(g, "pas forcément un défaut", D.BLEU, 36); place(pDef, 720, 742);
    return function (t) {
      const T = c.T, E = c.E, A = c.A;
      // k0 : le courant dans le tube
      chev.forEach(q => {
        const x = 70 + D.frac(q.s + t * 0.07) * 680;
        place(q.e, x, YC); opa(q.e, fen(x, 70, 750, 40) * (1 - lis((t - T[2]) / 0.5)) * lis((t - 0.4) / 0.5));
      });
      opa(lTube, lis((t - A(0, 0.2)) / 0.5));
      opa(piquages, lis((t - A(1, 0.1)) / 0.6));
      // k1 : trois arrivées
      opa(pTrois, fen(t, A(1, 0.2), E[1] + 0.5, 0.5));
      opa(lBT, lis((t - A(2, 0.2)) / 0.4) * (1 - lis((t - (T[5] + 1)) / 0.5)));
      opa(lFP, lis((t - A(3, 0.1)) / 0.4) * (1 - lis((t - (T[5] + 1)) / 0.5)));
      opa(lGD, lis((t - A(4, 0.1)) / 0.4) * (1 - lis((t - (T[5] + 1)) / 0.5)));
      // les flux
      const vit = 80;
      fluxO(t, vit, lis((t - T[2]) / 0.8)); fluxV(t, vit, lis((t - A(3, 0.05)) / 0.8)); fluxM(t, vit, lis((t - A(4, 0.05)) / 0.8));
      // l'héroïne : arrive par le bas (k2), attend, file à droite avec le mélange (k5)
      const dO = D.courbe([[T[2], 0], [A(2, 0.55), 262], [E[2], 520], [T[5] + 0.2, 520], [E[5] - 0.4, 730]], t, true);
      const [hx, hy] = trO.at(dO);
      const temp = D.courbe([[T[5] + 0.2, 0.35], [E[5], 0.25]], t, true);
      const humeur = t > A(5, 0.3) && t < E[5] + 0.5 ? "froid" : "sourire";
      mila({ x: hx, y: hy + Math.sin(t * 2.4) * 3, s: 0.75, t: t, temp: temp, etat: "vapeur", humeur: humeur, regard: [1, 0], op: lis((t - T[2]) / 0.5) });
      // la voisine verte : par la gauche (k3), le long du tube
      const dV = D.courbe([[T[3] + 0.2, 45], [A(3, 0.7), 300], [T[5] + 0.2, 300], [E[5] - 0.4, 515]], t, true);
      const [vx, vy] = trV.at(dV);
      vert({ x: vx, y: vy + Math.sin(t * 2.1 + 1) * 3, s: 0.8, t: t, humeur: "sourire", regard: [1, 0], op: lis((t - (T[3] + 0.2)) / 0.5) });
      // la voisine violette : par le haut (k4)
      const dM = D.courbe([[T[4] + 0.2, 0], [A(4, 0.7), 262], [T[5] + 0.2, 275], [E[5] - 0.4, 485]], t, true);
      const [mx, my] = trM.at(dM);
      violette({ x: mx, y: my + Math.sin(t * 1.9 + 2) * 3, s: 0.8, t: t, humeur: "sourire", regard: [0, 1], op: lis((t - (T[4] + 0.2)) / 0.5) });
      // k6 : les deux thermomètres
      opa(therm, lis((t - A(6, 0.08)) / 0.5)); lecA(0.34 * lis((t - A(6, 0.12)) / 0.8)); lecB(0.34 + 0.16 * lis((t - A(6, 0.35)) / 0.8) * (t > A(6, 0.35) ? 1 : 0));
      opa(pDef, lis((t - A(6, 0.6)) / 0.5));
      return {
        carte: D.courbe([[T[2], 3.6], [E[3], 4], [T[4], 4], [E[4], 5], [T[5], 5], [E[6], 5.6]], t, true),
        diag: D.courbe([[T[5], 3], [E[5], 4]], t, true), diag0: 3,
        calques: { MT: t >= T[3] - 0.15, flash: t >= T[4] - 0.15 },
        temp: D.courbe([[T[2], 0.35], [T[5] + 0.2, 0.35], [E[5], 0.25]], t, true), etat: "vapeur", humeur: humeur
      };
    };
  };
/*==FIN==*/
})();
