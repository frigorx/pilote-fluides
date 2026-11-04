/* =====================================================================
   voyage-enthalpie2-scenes-a.js — édition « le diagramme enthalpique, niveau 2 » :
   scènes intro, cloche, isobares, isothermes, isotitres
   ---------------------------------------------------------------------
   MÊME CONTRAT que moteur/voyage-enthalpie-scenes-a.js : VOYAGE_SCENES[id](g, c) → maj(t)
   (c = { T, E, D, A(k, f) } ; maj(t) rend { temp, etat, humeur }). Fonction PURE de t.
   Les gestes sont accrochés au RANG des phrases du récit donnees/voyage-enthalpie2.js.
   ÉCRAN PARTAGÉ : la scène tient dans x 20 → 965, y 150 → 760 (en-tête x < 760, y < 140 ;
   carte « où je suis » et diagramme chiffré à droite).
   Niveau 2 : aucun chapitre n'a de carte d'identité, la scène se voit dès la phrase 0. La scène
   de gauche donne le SENS PHYSIQUE de la ligne (la molécule, une cuve, un piston, un bocal) ;
   le diagramme de droite montre la famille de lignes (calques du récit, rien à rendre ici).
   Couleurs des familles (comme le diagramme) : isobares bleu foncé, isenthalpes violet,
   isothermes rouge, isotitres bleu, isentropes vert, isochores ocre.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const POL = "Calibri, Arial, sans-serif";
  const OR = "#ff6b35", ROUGE = "#c0392b", ENCRE = "#10233c", GRIS = "#b9c3cf", VERT = "#1e7e54";
  const FAM = { isobares: "#1b3a63", isenthalpes: "#8e44ad", isothermes: "#c0392b", isotitres: "#2f6fb8", isentropes: "#1e7e54", isochores: "#b9770e" };
  const opa = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const fen = (e, t, a, b, du) => opa(e, D.fenetre(t, a, b, du === undefined ? 0.4 : du));
  const apres = (e, t, a, du) => opa(e, D.lisse((t - a) / (du === undefined ? 0.4 : du)));
  const f1 = v => v.toFixed(1);
  const pts = a => a.map(p => f1(p[0]) + "," + f1(p[1])).join(" ");

  /* texte posé (une ligne) dans son propre groupe, caché par défaut : on joue sur l'opacité du groupe */
  function lib(parent, x, y, texte, o) {
    o = o || {};
    const gr = D.el("g", { opacity: 0 }, parent);
    D.etiquette(gr, x, y, texte, { "text-anchor": o.ancre || "start", "font-size": o.taille || 32, fill: o.coul || ENCRE, "font-weight": 700 });
    return gr;
  }
  /* flèche à pointe, tracée jusqu'à la fraction f de sa longueur (f = 1 : complète) */
  function fleche(parent, coul, ep) {
    const gr = D.el("g", { opacity: 0 }, parent), l = D.el("line", { stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, gr), h = D.el("polygon", { fill: coul }, gr);
    return function (x1, y1, x2, y2, f) {
      if (f === undefined) f = 1;
      opa(gr, f > 0.002 ? 1 : 0);
      const a = Math.atan2(y2 - y1, x2 - x1), L = 5 * ep, xe = x1 + (x2 - x1) * f, ye = y1 + (y2 - y1) * f;
      l.setAttribute("x1", f1(x1)); l.setAttribute("y1", f1(y1)); l.setAttribute("x2", f1(xe - Math.cos(a) * L * 0.7)); l.setAttribute("y2", f1(ye - Math.sin(a) * L * 0.7));
      h.setAttribute("points", pts([[xe, ye], [xe - L * Math.cos(a - 0.45), ye - L * Math.sin(a - 0.45)], [xe - L * Math.cos(a + 0.45), ye - L * Math.sin(a + 0.45)]]));
    };
  }
  /* trajet de l'héroïne par repères [t, x, y, s] ; les temps sont remis dans l'ordre (une phrase courte ne casse rien) */
  function kf(K) {
    for (let i = 1; i < K.length; i++) if (K[i][0] < K[i - 1][0] + 0.01) K[i][0] = K[i - 1][0] + 0.01;
    return t => [1, 2, 3].map(j => D.courbe(K.map(k => [k[0], k[j]]), t));
  }
  const coche = (parent, x, y) => { // pastille verte cochée
    const gr = D.el("g", { opacity: 0, transform: "translate(" + x + " " + y + ")" }, parent);
    D.el("circle", { r: 22, fill: VERT, stroke: "#fff", "stroke-width": 3 }, gr);
    D.el("path", { d: "M -10 1 L -3 9 L 11 -8", fill: "none", stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, gr);
    return gr;
  };
  /* le tour du circuit : température et état de la molécule selon la position u sur D.CIRCUIT_PTS (2 → 17, en repartant du point 1) */
  const tempDe = u => D.courbe([[2, 0.12], [5, 0.75], [5.6, 0.75], [7.6, 0.55], [8.6, 0.45], [12.5, 0.45], [15, 0.05], [16.4, 0.05], [17, 0.12]], u, true);
  const etatDe = u => u < 7.1 ? "vapeur" : u < 7.9 ? "bout" : u < 13 ? "liquide" : u < 16.6 ? "bout" : "vapeur";
  /* une cuve de verre (ouverte en haut) */
  const cuve = (parent, x, y, w, h) => D.el("path", { d: "M " + x + " " + (y - 10) + " V " + (y + h - 12) + " Q " + x + " " + (y + h) + " " + (x + 12) + " " + (y + h) + " H " + (x + w - 12) + " Q " + (x + w) + " " + (y + h) + " " + (x + w) + " " + (y + h - 12) + " V " + (y - 10),
    fill: "rgba(230,242,252,.6)", stroke: ENCRE, "stroke-width": 6, "stroke-linejoin": "round" }, parent);

  /* =====================================================================
     INTRO — la molécule R134a, la chambre froide, la croix, le rappel du niveau 1, l'éventail des lignes, les relevés et les calculs
     ===================================================================== */
  S.intro = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    /* k0 : la porte de la chambre froide, avec un flocon */
    const porte = D.el("g", {}, g);
    D.el("rect", { x: 640, y: 250, width: 250, height: 350, rx: 12, fill: "#cfdcea", stroke: ENCRE, "stroke-width": 6 }, porte);
    D.el("rect", { x: 662, y: 272, width: 206, height: 328, rx: 6, fill: "#f4f8fc", stroke: ENCRE, "stroke-width": 4 }, porte);
    D.el("rect", { x: 676, y: 420, width: 14, height: 70, rx: 7, fill: GRIS, stroke: ENCRE, "stroke-width": 3 }, porte);
    [300, 520].forEach(y => D.el("rect", { x: 856, y: y, width: 10, height: 40, rx: 3, fill: GRIS, stroke: ENCRE, "stroke-width": 3 }, porte));
    const flocon = D.el("g", { transform: "translate(765 345)" }, porte);
    for (let a = 0; a < 6; a++) {
      const br = D.el("g", { transform: "rotate(" + a * 60 + ")" }, flocon);
      D.el("path", { d: "M 0 0 L 46 0 M 28 0 L 39 -10 M 28 0 L 39 10", fill: "none", stroke: D.BLEU, "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, br);
    }
    const lChambre = lib(porte, 765, 652, "chambre froide", { ancre: "middle", taille: 34, coul: D.BLEU });
    opa(lChambre, 1);
    const pR = D.pastille(g, 380, 640, "R134a", D.BLEU, 56, "middle");
    /* k1 : la croix du frigoriste en grand, les noms, la flèche vers le diagramme */
    const cir = D.circuit(g, 22, 165, 920, true);
    opa(cir.g, 0);
    const ec = (px, py) => cir.ecran(px, py);
    const flD = D.el("g", { opacity: 0 }, g);
    D.el("polygon", { points: "330,492 640,492 640,478 752,515 640,552 640,540 330,540", fill: OR, stroke: "#8f2f10", "stroke-width": 3, "stroke-linejoin": "round" }, flD);
    D.texte(flD, 485, 527, "le diagramme", { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#fff", "font-family": POL });
    const VIS = ["condenseur", "evaporateur", "compresseur", "detendeur"], FR = [0.1, 0.24, 0.38, 0.52];
    const P1 = [[620, 262], [520, 392], [760, 412], [250, 402]].map(p => ec(p[0], p[1]));
    /* k2 : rappel du niveau 1, trois vignettes cochées */
    const rappel = D.el("g", { opacity: 0 }, g);
    const pN1 = D.pastille(rappel, 492, 240, "rappel du niveau 1", D.BLEU, 38, "middle");
    const VX = [40, 360, 680], VY = 285, VW = 265, VH = 215;
    const vignettes = VX.map((x0, i) => {
      const v = D.el("g", { opacity: 0 }, g);
      D.el("rect", { x: x0, y: VY, width: VW, height: VH, rx: 18, fill: "#fffdf8", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, v);
      return v;
    });
    /* vignette 1 : les axes h et p */
    { const v = vignettes[0], x0 = VX[0];
      const a1 = fleche(v, ENCRE, 6), a2 = fleche(v, ENCRE, 6);
      a1(x0 + 50, VY + 170, x0 + 235, VY + 170); a2(x0 + 50, VY + 170, x0 + 50, VY + 40);
      D.etiquette(v, x0 + 232, VY + 142, "h", { "text-anchor": "end", "font-size": 34, fill: ENCRE, "font-weight": 700 });
      D.etiquette(v, x0 + 76, VY + 60, "p", { "font-size": 34, fill: ENCRE, "font-weight": 700 }); }
    /* vignette 2 : la cloche */
    { const v = vignettes[1], x0 = VX[1];
      D.el("path", { d: "M " + (x0 + 55) + " " + (VY + 175) + " C " + (x0 + 58) + " " + (VY + 110) + ", " + (x0 + 90) + " " + (VY + 45) + ", " + (x0 + 132) + " " + (VY + 40) + " C " + (x0 + 175) + " " + (VY + 46) + ", " + (x0 + 212) + " " + (VY + 115) + ", " + (x0 + 232) + " " + (VY + 175) + " Z", fill: "rgba(47,111,184,.14)", stroke: FAM.isotitres, "stroke-width": 6, "stroke-linejoin": "round" }, v); }
    /* vignette 3 : le cycle en quatre côtés */
    { const v = vignettes[2], x0 = VX[2], X0 = x0 + 62, X1 = x0 + 205, Y0 = VY + 55, Y1 = VY + 165;
      D.el("rect", { x: X0 - 8, y: Y0 - 8, width: X1 - X0 + 16, height: Y1 - Y0 + 16, rx: 10, fill: "none", stroke: "rgba(27,58,99,.15)", "stroke-width": 2 }, v);
      [[X0 + 6, Y1, X1 - 8, Y1], [X1, Y1 - 8, X1, Y0 + 8], [X1 - 6, Y0, X0 + 8, Y0], [X0, Y0 + 8, X0, Y1 - 8]].forEach(s => fleche(v, OR, 7)(s[0], s[1], s[2], s[3])); }
    const CAPT = ["axes h et p", "la cloche", "le cycle"].map((s, i) => lib(g, VX[i] + VW / 2, VY + VH + 52, s, { ancre: "middle", taille: 34, coul: D.BLEU }));
    const COCH = VX.map((x0, i) => coche(g, x0 + VW - 30, VY + 30));
    /* k3 : l'éventail des six familles de lignes */
    const PX = 215, PY = 640, FN = ["isobares", "isenthalpes", "isothermes", "isotitres", "isentropes", "isochores"];
    const eventail = FN.map((nom, i) => {
      const yf = 270 + i * 72, bend = (i - 2.5) * 16, cx = 460, cy = (PY + yf) / 2 + bend;
      const p = D.el("path", { d: "M " + PX + " " + PY + " Q " + cx + " " + cy + " 700 " + yf, pathLength: 1, fill: "none", stroke: FAM[nom], "stroke-width": 6, "stroke-linecap": "round", "stroke-dasharray": "1 1", "stroke-dashoffset": 1 }, g);
      return { p: p, l: lib(g, 718, yf + 11, nom, { taille: 34, coul: FAM[nom] }) };
    });
    const lToutes = lib(g, 492, 215, "toutes les lignes, une par une", { ancre: "middle", taille: 38, coul: D.BLEU });
    /* k4 : deux cartes (relevés, calculs) et la croix en petit, que la molécule parcourt */
    const cartes = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: 40, y: 165, width: 440, height: 315, rx: 20, fill: "#fffdf8", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, cartes);
    D.el("rect", { x: 505, y: 165, width: 440, height: 315, rx: 20, fill: "#fffdf8", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, cartes);
    D.etiquette(cartes, 260, 218, "relevés", { "text-anchor": "middle", "font-size": 40, fill: D.BLEU, "font-weight": 700 });
    D.etiquette(cartes, 725, 218, "calculs", { "text-anchor": "middle", "font-size": 40, fill: D.BLEU, "font-weight": 700 });
    D.image(cartes, "capteurPression", 100, 240, 102, 170);
    D.image(cartes, "sondeTemperature", 295, 285, 150, 100);
    D.etiquette(cartes, 151, 452, "manomètre", { "text-anchor": "middle", "font-size": 32, fill: ENCRE, "font-weight": 600 });
    D.etiquette(cartes, 370, 452, "pince", { "text-anchor": "middle", "font-size": 32, fill: ENCRE, "font-weight": 600 });
    { const k = D.el("g", {}, cartes); // la calculatrice
      D.el("rect", { x: 660, y: 240, width: 130, height: 170, rx: 14, fill: "#eef2f6", stroke: ENCRE, "stroke-width": 5 }, k);
      D.el("rect", { x: 676, y: 256, width: 98, height: 38, rx: 6, fill: "#cfe3f6", stroke: ENCRE, "stroke-width": 3 }, k);
      for (let r = 0; r < 3; r++) for (let q = 0; q < 3; q++) D.el("rect", { x: 678 + q * 33, y: 308 + r * 34, width: 24, height: 24, rx: 5, fill: q === 2 ? OR : "#fff", stroke: ENCRE, "stroke-width": 3 }, k);
      D.etiquette(cartes, 725, 452, "calculatrice", { "text-anchor": "middle", "font-size": 32, fill: ENCRE, "font-weight": 600 }); }
    const c4 = D.circuit(g, 280, 488, 420, false);
    opa(c4.g, 0);
    const ec4 = u => c4.ecran(...D.circuitPoint(u));
    /* l'héroïne */
    const mila = D.heroine(g, { r: 30 });
    const cle = kf([[0, 380, 440, 1.5], [T[1] - 0.4, 380, 440, 1.5]].concat(P1.map((p, i) => [A(1, FR[i]), p[0], p[1], 0.62]),
      [[A(1, 0.66), 470, 425, 0.62], [T[2] + 0.2, 470, 425, 0.62], [T[2] + 1.0, 492, 650, 0.8], [T[3], 492, 650, 0.8], [T[3] + 0.9, 110, 640, 0.9]]));
    return function (t) {
      /* k0 */
      opa(porte, 1 - D.lisse((t - (T[1] - 0.3)) / 0.5));
      opa(pR, D.lisse((t - (T[0] + 0.3)) / 0.5) * (1 - D.lisse((t - (T[1] - 0.3)) / 0.4)));
      /* k1 */
      opa(cir.g, D.lisse((t - (T[1] - 0.3)) / 0.7) * (1 - D.lisse((t - (T[2] - 0.1)) / 0.5)));
      VIS.forEach((nom, i) => cir.surligne(nom, t > A(1, FR[i]) - 0.2 && t < A(1, FR[i]) + 0.9 * (E[1] - T[1]) * 0.14 + 0.5));
      fen(flD, t, A(1, 0.68), T[2] + 0.2, 0.4);
      /* k2 */
      fen(rappel, t, T[2] + 0.1, T[3] + 0.1, 0.5);
      vignettes.forEach((v, i) => fen(v, t, A(2, 0.04 + 0.2 * i), T[3] + 0.1, 0.4));
      CAPT.forEach((l, i) => fen(l, t, A(2, 0.1 + 0.2 * i), T[3] + 0.1, 0.4));
      COCH.forEach((k, i) => fen(k, t, A(2, 0.2 + 0.24 * i), T[3] + 0.1, 0.3));
      /* k3 */
      fen(lToutes, t, T[3] + 0.1, T[4] + 0.1, 0.5);
      eventail.forEach((e, i) => {
        const a = A(3, 0.06 + 0.13 * i), f = D.lisse((t - a) / 0.6), sortie = 1 - D.lisse((t - T[4]) / 0.5);
        e.p.setAttribute("stroke-dashoffset", f1(1 - f).slice(0, 5)); e.p.setAttribute("opacity", sortie.toFixed(2));
        fen(e.l, t, a + 0.35, T[4] + 0.1, 0.4);
      });
      /* k4 */
      apres(cartes, t, T[4] + 0.1, 0.6);
      opa(c4.g, D.lisse((t - T[4]) / 0.6));
      /* l'héroïne */
      let [x, y, s] = cle(t), humeur = "sourire", temp = 0.1, etat = "liquide";
      if (t < T[1] - 0.4) y += Math.sin(t * 2.2) * 6;
      if (t >= T[4]) {
        const w = D.lisse((t - T[4]) / 0.7), f = D.borne((t - (T[4] + 0.7)) / Math.max(0.5, E[4] + 0.2 - T[4] - 0.7), 0, 1), u = D.lerp(2, 17, f), [px, py] = ec4(u);
        x = D.lerp(x, px, w); y = D.lerp(y, py, w); s = D.lerp(s, 0.38, w);
        temp = D.lerp(0.1, tempDe(u), w); etat = w > 0.5 ? etatDe(u) : "liquide";
        humeur = u > 3.2 && u < 6.8 ? "chaud" : "sourire";
      }
      mila({ x: x, y: y, s: s, t: t, temp: temp, etat: etat, humeur: humeur, regard: t >= T[3] && t < T[4] ? [1, 0] : [0, 0] });
      return { temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* =====================================================================
     CLOCHE — la cloche et le point critique
     ===================================================================== */
  S.cloche = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const GAUCHE = "M 210 700 C 218 580, 320 380, 500 350", DROITE = "M 840 700 C 770 558, 680 363, 500 350";
    const fond = D.el("path", { d: GAUCHE + " C 680 363, 770 558, 840 700 Z", fill: "#dce9f6", opacity: 0 }, g);
    const courbeG = D.el("path", { d: GAUCHE, pathLength: 1, fill: "none", stroke: "#0b6fd1", "stroke-width": 9, "stroke-linecap": "round", "stroke-dasharray": "1 1", "stroke-dashoffset": 1 }, g);
    const courbeD = D.el("path", { d: DROITE, pathLength: 1, fill: "none", stroke: "#d9480f", "stroke-width": 9, "stroke-linecap": "round", "stroke-dasharray": "1 1", "stroke-dashoffset": 1 }, g);
    /* k1 : la cuve de liquide saturé (à gauche), une seule bulle naît */
    const gL = D.el("g", { opacity: 0 }, g);
    cuve(gL, 40, 330, 160, 112);
    const lq = D.liquide(gL, { x0: 46, x1: 194, yh: 330, yb: 436, pas: 10, couleur: () => D.couleur(0.08, false), niveau: () => 0.5 });
    const bulle = D.el("circle", { fill: "#fff", "fill-opacity": 0.45, stroke: "#fff", "stroke-width": 3 }, gL);
    const lGa = lib(gL, 40, 262, "liquide saturé :", { taille: 34, coul: "#0b6fd1" }), lGb = lib(gL, 40, 300, "1re bulle", { taille: 34, coul: "#0b6fd1" });
    opa(lGa, 1); opa(lGb, 1);
    const ptG = D.el("g", { opacity: 0 }, g);
    D.trait(ptG, 200, 425, 296, 466, "#0b6fd1");
    D.el("circle", { cx: 306, cy: 471, r: 13, fill: "#0b6fd1", stroke: "#fff", "stroke-width": 4 }, ptG);
    /* k2 : la cuve de vapeur saturée (à droite), une dernière goutte disparaît */
    const gR = D.el("g", { opacity: 0 }, g);
    cuve(gR, 770, 330, 160, 112);
    const MOL = [], rnd = D.alea(9);
    for (let i = 0; i < 6; i++) MOL.push({ u: rnd(), v: rnd(), r: rnd(), m: D.mol(gR) });
    const goutte = D.el("circle", { cy: 428, cx: 805, fill: D.couleur(0.08, false), stroke: D.BLEU, "stroke-width": 2 }, gR);
    const lDa = lib(gR, 955, 262, "vapeur saturée :", { ancre: "end", taille: 34, coul: "#d9480f" }), lDb = lib(gR, 955, 300, "dernière goutte", { ancre: "end", taille: 34, coul: "#d9480f" });
    opa(lDa, 1); opa(lDb, 1);
    const ptD = D.el("g", { opacity: 0 }, g);
    D.trait(ptD, 770, 425, 706, 454, "#d9480f");
    D.el("circle", { cx: 694, cy: 456, r: 13, fill: "#d9480f", stroke: "#fff", "stroke-width": 4 }, ptD);
    /* k3 : le point critique */
    const sommet = D.el("g", { opacity: 0 }, g);
    const anneau = D.el("circle", { cx: 500, cy: 350, fill: "none", stroke: OR, "stroke-width": 6 }, sommet);
    D.el("circle", { cx: 500, cy: 350, r: 13, fill: ENCRE, stroke: "#fff", "stroke-width": 4 }, sommet);
    const lCrit = lib(g, 500, 300, "point critique", { ancre: "middle", taille: 38, coul: ENCRE });
    /* k4 : le brouillard au-dessus du sommet, la ligne de croisière sous le sommet */
    const brouillard = D.el("g", { opacity: 0 }, g), rb = D.alea(5), BR = [];
    for (let i = 0; i < 22; i++) BR.push({ x: 340 + rb() * 320, y: 205 + rb() * 90, r: 26 + rb() * 14, a: 8 + rb() * 14, p: rb() * 6, c: D.el("circle", { fill: "rgba(110,140,185,.30)" }, brouillard) });
    const pDiff = D.pastille(g, 500, 246, "plus de différence", D.BLEU, 34, "middle");
    opa(pDiff, 0);
    const croisAv = fleche(g, OR, 9), croisAr = fleche(g, OR, 9);
    const lCroi = lib(g, 500, 645, "le circuit travaille ici", { ancre: "middle", taille: 36, coul: "#8f2f10" });
    const mila = D.heroine(g, { r: 30 });
    const cle = kf([[0, 500, 600, 0.8], [T[1], 500, 600, 0.8], [T[1] + 0.9, 118, 392, 0.6], [T[2], 118, 392, 0.6], [T[2] + 0.9, 850, 385, 0.6], [T[3], 850, 385, 0.6], [T[3] + 0.9, 500, 440, 0.7],
      [T[4], 500, 440, 0.7], [T[4] + 0.9, 500, 296, 0.62], [A(4, 0.52), 500, 296, 0.62], [A(4, 0.52) + 1.0, 500, 520, 0.7]]);
    return function (t) {
      /* k0 : les deux courbes montent et se rejoignent */
      const fd = D.lisse((t - T[0] - 0.3) / Math.max(1, E[0] - T[0] - 0.8));
      courbeG.setAttribute("stroke-dashoffset", f1(1 - fd).slice(0, 5)); courbeD.setAttribute("stroke-dashoffset", f1(1 - fd).slice(0, 5));
      opa(fond, D.lisse((t - E[0] + 0.2) / 0.8));
      /* k1 */
      lq.maj(t);
      fen(gL, t, T[1], T[4], 0.5); fen(ptG, t, A(1, 0.1), T[4], 0.5);
      const fb = D.frac((t - A(1, 0.15)) / 2.2);
      bulle.setAttribute("cx", f1(D.lerp(166, 160, fb))); bulle.setAttribute("cy", f1(D.lerp(430, 408, fb))); bulle.setAttribute("r", f1(D.lerp(2, 11, fb)));
      opa(bulle, t > A(1, 0.15) ? D.fenetre(fb, 0, 1, 0.15) : 0);
      /* k2 */
      fen(gR, t, T[2], T[4], 0.5); fen(ptD, t, A(2, 0.1), T[4], 0.5);
      MOL.forEach(m => m.m(790 + D.frac(m.u + t * 0.03 * (0.6 + m.v)) * 120, 350 + m.r * 60 + Math.sin(t * 2 + m.u * 9) * 5, 0.1, true, 1));
      const fg = D.frac((t - A(2, 0.2)) / 2.4);
      goutte.setAttribute("r", f1(Math.max(0.01, 10 * (1 - fg)))); opa(goutte, t > A(2, 0.2) ? 1 : 0);
      /* k3 */
      fen(sommet, t, T[3], T[4] + 0.3, 0.4);
      anneau.setAttribute("r", f1(20 + 6 * Math.sin(t * 4)));
      fen(lCrit, t, A(3, 0.1), T[4], 0.4);
      /* k4 */
      fen(brouillard, t, T[4] + 0.1, A(4, 0.6), 0.6);
      BR.forEach(b => { b.c.setAttribute("cx", f1(b.x + Math.sin(t * 0.7 + b.p) * b.a)); b.c.setAttribute("cy", f1(b.y + Math.cos(t * 0.6 + b.p) * b.a * 0.5)); b.c.setAttribute("r", f1(b.r)); });
      fen(pDiff, t, T[4] + 0.3, A(4, 0.58), 0.4);
      const fl = D.lisse((t - A(4, 0.55)) / 0.8);
      croisAv(500, 575, 740, 575, fl); croisAr(500, 575, 275, 575, fl);
      apres(lCroi, t, A(4, 0.7), 0.5);
      /* l'héroïne */
      const [x, y, s] = cle(t);
      let etat = "bout", temp = 0.08, humeur = "sourire", regard = [0, 0];
      if (t >= T[1] + 0.5 && t < T[2] + 0.5) { etat = "liquide"; }
      else if (t >= T[2] + 0.5 && t < T[3] + 0.5) { etat = "vapeur"; temp = 0.3; }
      else if (t >= T[3] + 0.5 && t < T[4] + 0.5) { humeur = "surprise"; regard = [0, -1]; }
      else if (t >= T[4] + 0.5 && t < A(4, 0.56)) { etat = "vapeur"; temp = 0.7; humeur = "surprise"; }
      else if (t >= A(4, 0.56)) { etat = "bout"; temp = 0.08; humeur = "sourire"; }
      mila({ x: x, y: y + Math.sin(t * 2.2) * 3, s: s, t: t, temp: temp, etat: etat, humeur: humeur, regard: regard });
      return { temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* =====================================================================
     ISOBARES — même pression (horizontale), même énergie (verticale), puis sur la croix
     ===================================================================== */
  S.isobares = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    /* k0 : le manomètre dont l'aiguille ne bouge pas, la molécule avance à l'horizontale */
    const cad = D.el("g", { opacity: 0, transform: "translate(250 350)" }, g);
    D.el("circle", { r: 105, fill: "#fff", stroke: ENCRE, "stroke-width": 7 }, cad);
    for (let i = 0; i <= 10; i++) D.el("line", { x1: 0, y1: -80, x2: 0, y2: -94, stroke: ENCRE, "stroke-width": 4, transform: "rotate(" + (-120 + 24 * i) + ")" }, cad);
    D.el("line", { x1: 0, y1: 0, x2: 0, y2: -80, stroke: ROUGE, "stroke-width": 8, "stroke-linecap": "round", transform: "rotate(30)" }, cad);
    D.el("circle", { r: 11, fill: ENCRE }, cad);
    D.etiquette(cad, 0, 66, "p", { "text-anchor": "middle", "font-size": 40, fill: ENCRE, "font-weight": 700 });
    const lMemeP = lib(g, 395, 360, "même pression", { taille: 44, coul: FAM.isobares });
    const piste = fleche(g, FAM.isobares, 9);
    const lIso = lib(g, 490, 660, "une isobare", { ancre: "middle", taille: 36, coul: FAM.isobares });
    /* k1 : la ligne verticale, le sac d'énergie dont la taille ne change pas */
    const vert = fleche(g, FAM.isenthalpes, 9);
    const lMemeE = lib(g, 635, 450, "même énergie", { ancre: "end", taille: 44, coul: FAM.isenthalpes });
    const lIsen = lib(g, 700, 742, "une isenthalpe", { ancre: "middle", taille: 36, coul: FAM.isenthalpes });
    /* k2-k3 : la croix, les branches surlignées par un halo posé SOUS les tuyaux */
    const cir = D.circuit(g, 130, 175, 700, false);
    opa(cir.g, 0);
    const halo = (points, coul) => { const p = D.el("polyline", { points: points, fill: "none", stroke: coul, "stroke-width": 48, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, cir.g); cir.g.insertBefore(p, cir.g.firstChild); return p; };
    const hBas = halo("95,350 95,545 890,545 890,440", FAM.isobares), hHaut = halo("890,200 890,85 95,85 95,290", FAM.isobares), hDet = halo("95,250 95,390", FAM.isenthalpes);
    const bandeau = lib(g, 492, 665, "isobares : évaporateur, condenseur", { ancre: "middle", taille: 40, coul: FAM.isobares });
    const bandeau2 = lib(g, 492, 665, "isenthalpe : détendeur", { ancre: "middle", taille: 40, coul: FAM.isenthalpes });
    const mila = D.heroine(g, { r: 30 });
    const sac = D.el("g", { opacity: 0 }, g);
    D.el("path", { d: "M -6 -22 L -10 -32 L 10 -32 L 6 -22 Z", fill: "#a8670a", stroke: "#6e3f06", "stroke-width": 2.5, "stroke-linejoin": "round" }, sac);
    D.el("circle", { cx: 0, cy: 0, r: 24, fill: "#f2b134", stroke: "#6e3f06", "stroke-width": 3 }, sac);
    D.el("polygon", { points: "3,-14 -9,3 -1,3 -5,15 9,-3 1,-3", fill: "#fff", stroke: "#6e3f06", "stroke-width": 1.5, "stroke-linejoin": "round" }, sac);
    const ec = u => cir.ecran(...D.circuitPoint(u));
    const dep = ec(14.5);
    const cle = kf([[0, 120, 535, 0.85], [A(0, 0.2), 150, 535, 0.85], [E[0], 830, 535, 0.85], [T[1] + 0.2, 830, 535, 0.85], [T[1] + 1.1, 700, 270, 0.9], [E[1] - 0.3, 700, 640, 0.9], [T[2] + 0.2, 700, 640, 0.9], [T[2] + 1.0, dep[0], dep[1], 0.45]]);
    return function (t) {
      /* k0 */
      fen(cad, t, T[0], T[1] + 0.1, 0.5);
      fen(lMemeP, t, A(0, 0.3), T[1] + 0.1, 0.5); fen(lIso, t, A(0, 0.5), T[1] + 0.1, 0.5);
      piste(100, 575, 880, 575, D.lisse((t - T[0] - 0.2) / 1.0) * (t < T[1] + 0.1 ? 1 : 0));
      /* k1 */
      vert(700, 215, 700, 690, D.lisse((t - T[1] - 0.2) / 0.9) * (t < T[2] ? 1 : 0));
      fen(lMemeE, t, A(1, 0.3), T[2], 0.5); fen(lIsen, t, A(1, 0.5), T[2], 0.5);
      /* k2-k3 : la croix */
      opa(cir.g, D.lisse((t - (T[2] + 0.1)) / 0.6));
      opa(hBas, D.lisse((t - A(2, 0.1)) / 0.5) * (t < T[3] ? 1 : 0.35)); opa(hHaut, D.lisse((t - A(2, 0.55)) / 0.5) * (t < T[3] ? 1 : 0.35)); opa(hDet, D.lisse((t - A(3, 0.1)) / 0.5));
      cir.surligne("evaporateur", t > A(2, 0.1) && t < T[3]); cir.surligne("condenseur", t > A(2, 0.55) && t < T[3]); cir.surligne("detendeur", t > A(3, 0.1));
      fen(bandeau, t, A(2, 0.1), T[3], 0.4); apres(bandeau2, t, A(3, 0.1), 0.5);
      /* l'héroïne */
      let [x, y, s] = cle(t), etat = "bout", temp = 0.05, humeur = "sourire", ecart = 0;
      if (t < T[1] + 0.3) { etat = "bout"; temp = 0.05; }
      else if (t < T[2] + 0.5) { const f = D.borne((y - 270) / 370, 0, 1); etat = f < 0.45 ? "liquide" : "bout"; temp = D.lerp(0.45, 0.05, f); }
      else {
        let u;
        if (t < T[3]) u = D.courbe([[T[2] + 1.0, 14.5], [A(2, 0.35), 17.0], [A(2, 0.6), 20.0], [E[2], 23.5]], t, true); // évaporateur, compresseur, condenseur
        else u = D.courbe([[T[3], 23.5], [A(3, 0.15), 24.0], [A(3, 0.6), 27.3], [E[3], 28.6]], t, true);
        const v = u - 15;
        if (t > T[2] + 1.0) { const p = ec(u); x = p[0]; y = p[1]; }
        temp = D.courbe([[-0.5, 0.05], [2, 0.12], [5, 0.75], [5.6, 0.75], [7.6, 0.55], [8.6, 0.45], [14, 0.45], [14.5, 0.05]], v, true);
        etat = v < 1.2 ? "bout" : v < 6.2 ? "vapeur" : v < 7.4 ? "bout" : v < 12.3 ? "liquide" : "bout";
        if (v > 1.5 && v < 5.5) humeur = "chaud";
      }
      /* le sac d'énergie : même taille de haut en bas */
      sac.setAttribute("transform", "translate(" + f1(x + 52) + " " + f1(y + 4) + ") scale(1.15)");
      opa(sac, t >= T[1] + 0.9 && t < T[2] + 0.2 ? D.lisse((t - T[1] - 0.9) / 0.3) * (1 - D.lisse((t - T[2]) / 0.2)) : 0);
      mila({ x: x, y: y, s: s, t: t, temp: temp, etat: etat, humeur: humeur });
      return { temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* =====================================================================
     ISOTHERMES — trois cases (liquide, liquide + vapeur, vapeur), la règle des six graduations
     ===================================================================== */
  S.isothermes = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const CX0 = [35, 350, 665], CW = 290, CY = 330, CH = 320;
    const tM = Tc => D.borne(0.05 + (Tc + 10) / 50 * 0.5, 0, 1); // température -> échelle de couleur
    /* les trois cases */
    const cases = CX0.map((x0, i) => {
      const gc = D.el("g", { opacity: 0 }, g);
      D.el("rect", { x: x0, y: CY, width: CW, height: CH, rx: 20, fill: "rgba(255,253,248,.75)", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, gc);
      D.etiquette(gc, x0 + CW / 2, 372, ["liquide", "liquide + vapeur", "vapeur"][i], { "text-anchor": "middle", "font-size": 34, fill: D.BLEU, "font-weight": 700 });
      cuve(gc, x0 + 22, 420, 160, 205);
      return gc;
    });
    const lqs = [0, 1].map(i => D.liquide(cases[i], { x0: CX0[i] + 27, x1: CX0[i] + 177, yh: 420, yb: 619, pas: 10, couleur: () => D.couleur(0.55, false), niveau: () => i === 0 ? 0.7 : 0.4 }));
    /* case 1 : le piston qui serre le liquide */
    const piston = D.el("g", {}, cases[0]);
    D.el("rect", { x: CX0[0] + 28, y: 0, width: 148, height: 14, rx: 4, fill: "url(#vm-acier)", stroke: ENCRE, "stroke-width": 3 }, piston);
    D.el("rect", { x: CX0[0] + 95, y: -40, width: 14, height: 40, fill: "url(#vm-acier)", stroke: ENCRE, "stroke-width": 3 }, piston);
    D.el("rect", { x: CX0[0] + 73, y: -52, width: 58, height: 14, rx: 6, fill: ENCRE }, piston);
    /* case 2 : des bulles et un peu de vapeur au-dessus */
    const bulles = D.bulles(cases[1], 6, 4);
    const MV = [], rnd = D.alea(12);
    for (let i = 0; i < 4; i++) MV.push({ u: rnd(), v: rnd(), r: rnd(), m: D.mol(cases[1]) });
    /* case 3 : de la vapeur partout */
    const MV3 = [];
    for (let i = 0; i < 8; i++) MV3.push({ u: rnd(), v: rnd(), r: rnd(), m: D.mol(cases[2]) });
    /* les flèches d'isotherme de chaque case */
    const fl = [fleche(g, ROUGE, 9), fleche(g, ROUGE, 9), fleche(g, ROUGE, 9)];
    const FLC = [[CX0[0] + 252, 600, CX0[0] + 240, 440], [CX0[1] + 205, 520, CX0[1] + 278, 520], [CX0[2] + 205, 440, CX0[2] + 278, 600]];
    const lChange = lib(g, 492, 705, "change d'état, température fixe", { ancre: "middle", taille: 38, coul: ROUGE });
    /* le thermomètre (symbole) et son chiffre fixe */
    const th = D.el("g", { opacity: 0 }, g);
    D.image(th, "sondeTemperature", 0, 180, 105, 70);
    D.etiquette(th, 115, 242, "40 °C", { "font-size": 48, fill: ROUGE, "font-weight": 700 });
    /* k3 : l'isobare et l'isotherme se superposent */
    const panneau = D.el("g", { opacity: 0 }, g);
    const lIsb = lib(panneau, 315, 373, "isobare", { ancre: "end", taille: 38, coul: FAM.isobares }), lIst = lib(panneau, 315, 483, "isotherme", { ancre: "end", taille: 38, coul: ROUGE });
    opa(lIsb, 1); opa(lIst, 1);
    const pBleu = D.el("path", { d: "M 335 362 C 450 362, 470 417, 570 417 H 900", pathLength: 1, fill: "none", stroke: FAM.isobares, "stroke-width": 9, "stroke-linecap": "round", "stroke-dasharray": "1 1", "stroke-dashoffset": 1 }, panneau);
    const pRouge = D.el("path", { d: "M 335 472 C 450 472, 470 417, 570 417", pathLength: 1, fill: "none", stroke: ROUGE, "stroke-width": 9, "stroke-linecap": "round", "stroke-dasharray": "1 1", "stroke-dashoffset": 1 }, panneau);
    const pSur = D.el("line", { x1: 570, y1: 417, x2: 900, y2: 417, stroke: ROUGE, "stroke-width": 9, "stroke-dasharray": "22 18", opacity: 0 }, panneau);
    const lMeme = lib(g, 620, 560, "sous la cloche : même ligne", { ancre: "middle", taille: 40, coul: ENCRE });
    /* k5 : la règle des six graduations */
    const regle = D.el("g", { opacity: 0 }, g);
    const GX = [100, 252, 404, 556, 708, 860], GT = [-20, 0, 20, 40, 60, 80];
    for (let i = 0; i < 38; i++) D.el("rect", { x: 100 + i * (760 / 38), y: 430, width: 760 / 38 + 1, height: 52, fill: D.couleur(tM(D.lerp(-20, 80, i / 37)), false) }, regle);
    D.el("rect", { x: 100, y: 430, width: 760, height: 52, rx: 8, fill: "none", stroke: ENCRE, "stroke-width": 5 }, regle);
    const grad = GX.map((x, i) => {
      const gg = D.el("g", { opacity: 0 }, g);
      D.el("line", { x1: x, y1: 482, x2: x, y2: 520, stroke: ENCRE, "stroke-width": 6, "stroke-linecap": "round" }, gg);
      D.etiquette(gg, x, 568, (GT[i] < 0 ? "−" : "") + Math.abs(GT[i]), { "text-anchor": "middle", "font-size": 38, fill: GT[i] === 40 ? ROUGE : ENCRE, "font-weight": 700 });
      return gg;
    });
    const uC = lib(g, 892, 568, "°C", { taille: 38, coul: ENCRE });
    const mila = D.heroine(g, { r: 30 });
    const cle = kf([[0, 492, 255, 0.8], [T[1], 492, 255, 0.8], [T[1] + 1.0, CX0[0] + 102, 545, 0.65], [T[2], CX0[0] + 102, 545, 0.65], [T[2] + 1.0, CX0[1] + 102, 545, 0.65],
      [T[3], CX0[1] + 102, 545, 0.65], [T[3] + 1.0, 600, 372, 0.8], [E[3] - 0.2, 860, 372, 0.8], [T[4] + 0.2, 860, 372, 0.8], [T[4] + 1.1, CX0[2] + 102, 520, 0.65],
      [T[5] - 0.1, CX0[2] + 102, 520, 0.65]].concat(GX.map((x, i) => [A(5, 0.14 + 0.15 * i), x, 405, 0.7])));
    return function (t) {
      /* les cases : k0 elles arrivent, k3 elles s'effacent pour le panneau, k4 elles reviennent, k5 elles partent */
      const cache = D.lisse((t - T[3]) / 0.5) * (1 - D.lisse((t - T[4]) / 0.5)) + D.lisse((t - T[5]) / 0.5);
      cases.forEach((gc, i) => {
        const base = D.lisse((t - A(0, 0.1 + 0.25 * i)) / 0.5);
        const ret = t >= T[4] ? (i === 2 ? 1 : 0.35) : 1;
        opa(gc, base * (1 - D.borne(cache, 0, 1)) * (t >= T[4] && t < T[5] ? ret : 1));
      });
      lqs.forEach(l => l.maj(t));
      /* k1 : le piston serre */
      const fp = D.lisse((t - A(1, 0.1)) / (E[1] - A(1, 0.1) - 0.3));
      piston.setAttribute("transform", "translate(0 " + f1(D.lerp(452, 466, fp)) + ")");
      fl[0](...FLC[0], D.lisse((t - A(1, 0.45)) / 0.8) * (t < T[3] ? 1 : 0));
      /* k2 : bulles et flèche horizontale */
      bulles(t, (q, b) => [CX0[1] + 40 + q * 120, 600, 548, t > T[2] + 0.4 ? 1 : 0, "#fff"]);
      MV.forEach(m => m.m(CX0[1] + 45 + D.frac(m.u + t * 0.03 * (0.6 + m.v)) * 110, 440 + m.r * 70 + Math.sin(t * 2 + m.u * 9) * 5, 0.1, true, 1));
      fl[1](...FLC[1], D.lisse((t - A(2, 0.5)) / 0.8) * (t < T[3] ? 1 : 0));
      fen(lChange, t, A(2, 0.55), T[3] + 0.1, 0.4);
      /* k4 : vapeur */
      MV3.forEach(m => m.m(CX0[2] + 40 + D.frac(m.u + t * 0.03 * (0.6 + m.v)) * 120, 440 + m.r * 160 + Math.sin(t * 2 + m.u * 9) * 6, 0.12, true, t > T[0] ? 1 : 0));
      fl[2](...FLC[2], D.lisse((t - A(4, 0.45)) / 0.8) * (t < T[5] ? 1 : 0));
      /* le thermomètre suit la case de l'héroïne */
      const tx = D.courbe([[0, CX0[0] + 25], [T[1], CX0[0] + 25], [T[1] + 0.8, CX0[0] + 25], [T[2] + 0.8, CX0[1] + 25], [T[3], CX0[1] + 25], [T[3] + 0.8, 365], [T[4], 365], [T[4] + 0.8, CX0[2] + 25]], t);
      th.setAttribute("transform", "translate(" + f1(tx) + " 0)");
      apres(th, t, T[0] + 0.2, 0.5); if (t >= T[5]) opa(th, 1 - D.lisse((t - T[5]) / 0.4));
      /* k3 : le panneau */
      fen(panneau, t, T[3] + 0.2, T[4], 0.5);
      pBleu.setAttribute("stroke-dashoffset", f1(1 - D.lisse((t - A(3, 0.05)) / 1.0)).slice(0, 5));
      pRouge.setAttribute("stroke-dashoffset", f1(1 - D.lisse((t - A(3, 0.15)) / 1.0)).slice(0, 5));
      opa(pSur, D.lisse((t - A(3, 0.55)) / 0.5) * (t < T[4] ? 1 : 0));
      fen(lMeme, t, A(3, 0.55), T[4], 0.5);
      /* k5 : la règle */
      fen(regle, t, T[5] + 0.1, c.D + 1, 0.5);
      grad.forEach((gg, i) => apres(gg, t, A(5, 0.08 + 0.15 * i), 0.3));
      apres(uC, t, A(5, 0.85), 0.3);
      /* l'héroïne */
      const [x, y, s] = cle(t);
      let etat = "liquide", temp = tM(40), humeur = "sourire", ecrase = 0;
      if (t >= T[1] + 0.6 && t < T[2] + 0.4) { etat = "liquide"; ecrase = 0.7 * fp; humeur = ecrase > 0.2 ? "triste" : "sourire"; }
      else if (t >= T[2] + 0.4 && t < T[4] + 0.4) { etat = "bout"; }
      else if (t >= T[4] + 0.4 && t < T[5]) { etat = "vapeur"; temp = 0.6; }
      else if (t >= T[5]) {
        let Tc = 40;
        for (let i = 0; i < GX.length; i++) if (t >= A(5, 0.14 + 0.15 * i)) Tc = GT[i];
        if (t < A(5, 0.14)) Tc = 40;
        temp = tM(Tc); etat = Tc < 40 ? "liquide" : Tc === 40 ? "bout" : "vapeur"; humeur = Tc <= 0 ? "froid" : Tc >= 60 ? "chaud" : "sourire";
      }
      mila({ x: x, y: y + Math.sin(t * 2.2) * 3, s: s, t: t, temp: temp, etat: etat, humeur: humeur, ecrase: ecrase });
      return { temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* =====================================================================
     ISOTITRES — le bocal d'un kilo : la part de vapeur
     ===================================================================== */
  /* un bocal en repère local 240 × 340 (placé par transform) ; titre 0 = tout liquide, 1 = toute vapeur */
  function bocal(parent) {
    const gr = D.el("g", { opacity: 0 }, parent), st = { niv: 0.5 };
    D.el("rect", { x: 0, y: 0, width: 240, height: 340, rx: 18, fill: "rgba(230,242,252,.55)" }, gr);
    const lq = D.liquide(gr, { x0: 6, x1: 234, yh: 0, yb: 334, pas: 12, couleur: () => D.couleur(0.08, false), niveau: () => st.niv });
    const MOL = [], rnd = D.alea(21);
    for (let i = 0; i < 12; i++) MOL.push({ u: rnd(), v: rnd(), r: rnd(), m: D.mol(gr) });
    D.el("path", { d: "M 0 -8 V 320 Q 0 340 20 340 H 220 Q 240 340 240 320 V -8", fill: "none", stroke: ENCRE, "stroke-width": 8, "stroke-linejoin": "round" }, gr);
    return {
      g: gr,
      place: (x, y, s) => gr.setAttribute("transform", "translate(" + f1(x) + " " + f1(y) + ") scale(" + s + ")"),
      maj: function (titre, t) {
        st.niv = 0.88 * (1 - titre); lq.maj(t);
        const ys = lq.surface(120, t), n = 12 * titre;
        MOL.forEach((m, i) => {
          const haut = 22, bas = Math.max(haut, ys - 16);
          m.m(22 + D.frac(m.u + t * 0.025 * (0.6 + m.v)) * 196, D.lerp(haut, bas, m.r), 0.1, true, titre > 0 && bas - haut > 12 || titre >= 0.99 ? D.borne((n - i) * 2, 0, 1) : 0);
        });
      }
    };
  }

  S.isotitres = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    /* k0 : un bocal d'un kilo, mélange liquide + vapeur */
    const b0 = bocal(g); b0.place(372, 300, 1);
    const l1kg = lib(g, 492, 272, "1 kg", { ancre: "middle", taille: 46, coul: D.BLEU });
    const lVap = lib(g, 665, 380, "vapeur", { taille: 36, coul: D.BLEU }), lLiq = lib(g, 665, 560, "liquide", { taille: 36, coul: D.BLEU });
    const trV = D.el("g", { opacity: 0 }, g), trL = D.el("g", { opacity: 0 }, g);
    D.trait(trV, 655, 368, 590, 372, D.BLEU); D.trait(trL, 655, 548, 590, 548, D.BLEU);
    /* k1 : titre 0 et titre 1 */
    const bL = bocal(g); bL.place(150, 330, 0.85);
    const bR = bocal(g); bR.place(610, 330, 0.85);
    const lT0 = lib(g, 252, 298, "titre 0", { ancre: "middle", taille: 44, coul: D.BLEU }), lT1 = lib(g, 712, 298, "titre 1", { ancre: "middle", taille: 44, coul: D.BLEU });
    const lA0 = lib(g, 252, 672, "aucune vapeur", { ancre: "middle", taille: 34, coul: ENCRE }), lA1 = lib(g, 712, 672, "toute vapeur", { ancre: "middle", taille: 34, coul: ENCRE });
    /* k2 : la rangée des neuf petits bocaux */
    const PET = [], XP = i => 52 + i * 100.4;
    for (let i = 0; i < 9; i++) {
      const b = bocal(g); b.place(XP(i), 360, 0.36);
      PET.push({ b: b, l: lib(g, XP(i) + 43, 532, "0," + (i + 1), { ancre: "middle", taille: 34, coul: D.BLEU }) });
    }
    const aPlus = fleche(g, OR, 9), lPlus = lib(g, 492, 600, "plus de vapeur", { ancre: "middle", taille: 38, coul: "#8f2f10" });
    /* k3 : le bocal 0,3 en grand et la balance */
    const b3 = bocal(g); b3.place(80, 330, 0.85);
    const lT3 = lib(g, 182, 298, "titre 0,3", { ancre: "middle", taille: 44, coul: D.BLEU });
    const bal = D.el("g", { opacity: 0 }, g), PV = { x: 640, y: 410 };
    D.el("rect", { x: PV.x - 8, y: PV.y, width: 16, height: 182, fill: "#8a96a3", stroke: ENCRE, "stroke-width": 3 }, bal);
    D.el("rect", { x: PV.x - 72, y: 590, width: 144, height: 16, rx: 6, fill: "#8a96a3", stroke: ENCRE, "stroke-width": 3 }, bal);
    const poutre = D.el("line", { stroke: ENCRE, "stroke-width": 9, "stroke-linecap": "round" }, bal);
    D.el("circle", { cx: PV.x, cy: PV.y, r: 13, fill: OR, stroke: ENCRE, "stroke-width": 3 }, bal);
    const pans = [-1, 1].map(sg => {
      const p = D.el("g", {}, bal);
      D.el("path", { d: "M 0 -56 L -62 0 M 0 -56 L 62 0", fill: "none", stroke: ENCRE, "stroke-width": 3 }, p);
      D.el("ellipse", { cx: 0, cy: 0, rx: 70, ry: 10, fill: "#cfd8e2", stroke: ENCRE, "stroke-width": 4 }, p);
      return p;
    });
    const molsPan = [-24, 0, 24].map(dx => D.mol(pans[0])); // la vapeur : trois molécules sur le plateau
    D.el("ellipse", { cx: 0, cy: -16, rx: 58, ry: 20, fill: D.couleur(0.08, false), opacity: 0.85, stroke: D.BLEU, "stroke-width": 2 }, pans[1]); // le liquide : une flaque
    D.el("path", { d: "M -34 -22 Q 0 -30 34 -22", fill: "none", stroke: "#fff", "stroke-width": 3, "stroke-linecap": "round", opacity: 0.8 }, pans[1]);
    const lV3 = lib(g, 500, 652, "300 g de vapeur", { ancre: "middle", taille: 36, coul: ENCRE }), lL3 = lib(g, 800, 652, "700 g de liquide", { ancre: "middle", taille: 36, coul: ENCRE });
    const mila = D.heroine(g, { r: 30 });
    const cle = kf([[0, 492, 470, 1.0], [T[1], 492, 470, 1.0], [T[1] + 0.9, 252, 540, 0.8], [A(1, 0.5), 252, 540, 0.8], [A(1, 0.5) + 1.2, 712, 480, 0.8], [T[2], 712, 480, 0.8],
      [T[2] + 1.0, XP(0) + 43, 300, 0.55]].concat([0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => [A(2, 0.1 + 0.1 * i), XP(i) + 43, 300, 0.55]),
      [[T[3] + 0.2, XP(8) + 43, 300, 0.55], [T[3] + 1.2, 182, 450, 0.7]]));
    return function (t) {
      /* k0 */
      const f0 = 1 - D.lisse((t - (T[1] - 0.2)) / 0.5);
      opa(b0.g, D.lisse((t - T[0]) / 0.5) * f0); b0.maj(0.4, t);
      opa(l1kg, D.lisse((t - T[0] - 0.2) / 0.5) * f0);
      opa(lVap, D.lisse((t - A(0, 0.3)) / 0.5) * f0); opa(lLiq, D.lisse((t - A(0, 0.55)) / 0.5) * f0);
      opa(trV, D.lisse((t - A(0, 0.3)) / 0.5) * f0); opa(trL, D.lisse((t - A(0, 0.55)) / 0.5) * f0);
      /* k1 */
      const f1b = D.lisse((t - T[1]) / 0.5) * (1 - D.lisse((t - (T[2] - 0.2)) / 0.5));
      opa(bL.g, f1b); opa(bR.g, f1b); bL.maj(0, t); bR.maj(1, t);
      opa(lT0, f1b * D.lisse((t - A(1, 0.1)) / 0.4)); opa(lA0, f1b * D.lisse((t - A(1, 0.2)) / 0.4));
      opa(lT1, f1b * D.lisse((t - A(1, 0.55)) / 0.4)); opa(lA1, f1b * D.lisse((t - A(1, 0.65)) / 0.4));
      /* k2 */
      const f2 = 1 - D.lisse((t - (T[3] - 0.2)) / 0.5);
      PET.forEach((p, i) => {
        const a = D.lisse((t - A(2, 0.04 + 0.1 * i)) / 0.4) * f2;
        opa(p.b.g, a); opa(p.l, a); p.b.maj((i + 1) / 10, t);
      });
      aPlus(80, 628, 900, 628, D.lisse((t - A(2, 0.15)) / Math.max(0.8, (E[2] - A(2, 0.15)) * 0.8)) * f2);
      opa(lPlus, D.lisse((t - A(2, 0.3)) / 0.5) * f2);
      /* k3 */
      opa(b3.g, D.lisse((t - T[3] - 0.1) / 0.5)); b3.maj(0.3, t);
      apres(lT3, t, T[3] + 0.3, 0.5);
      apres(bal, t, A(3, 0.2), 0.5);
      const ang = 14 * D.lisse((t - A(3, 0.25)) / 0.8) + (t > A(3, 0.25) ? 4 * Math.exp(-(t - A(3, 0.25)) * 1.5) * Math.sin((t - A(3, 0.25)) * 7) : 0), ra = ang * Math.PI / 180;
      const ex = 150 * Math.cos(ra), ey = 150 * Math.sin(ra);
      poutre.setAttribute("x1", f1(PV.x - ex)); poutre.setAttribute("y1", f1(PV.y - ey)); poutre.setAttribute("x2", f1(PV.x + ex)); poutre.setAttribute("y2", f1(PV.y + ey));
      pans[0].setAttribute("transform", "translate(" + f1(PV.x - ex) + " " + f1(PV.y - ey + 56) + ")");
      pans[1].setAttribute("transform", "translate(" + f1(PV.x + ex) + " " + f1(PV.y + ey + 56) + ")");
      molsPan.forEach((m, i) => m(-24 + 24 * i + Math.sin(t * 1.5 + i) * 4, -22 + Math.sin(t * 2 + i * 2) * 5, 0.1, true, 1));
      apres(lV3, t, A(3, 0.5), 0.5); apres(lL3, t, A(3, 0.75), 0.5);
      /* l'héroïne */
      const [x, y, s] = cle(t);
      let etat = "bout", temp = 0.08, humeur = "sourire";
      if (t >= T[1] + 0.5 && t < A(1, 0.5) + 0.4) { etat = "liquide"; }
      else if (t >= A(1, 0.5) + 0.4 && t < T[2] + 0.5) { etat = "vapeur"; temp = 0.3; }
      mila({ x: x, y: y + Math.sin(t * 2.2) * 3, s: s, t: t, temp: temp, etat: etat, humeur: humeur });
      return { temp: temp, etat: etat, humeur: humeur };
    };
  };
})();
