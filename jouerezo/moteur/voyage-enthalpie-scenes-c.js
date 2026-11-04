/* =====================================================================
   voyage-enthalpie-scenes-c.js — « Voyage dans tous ses états », édition « le diagramme enthalpique » :
   les écarts d'enthalpie, la croix et le diagramme côte à côte, les relevés, le résumé
   ---------------------------------------------------------------------
   Scènes : energies (6), parallele (7), releves (8), resume. Même contrat que voyage-vis-scenes-c.js :
   VOYAGE_SCENES[id](g, c) → maj(t). Écran partagé : la scène tient dans x 20 → 965, y 150 → 760
   (la colonne de droite porte la carte du coin et le diagramme chiffré). Récit : donnees/voyage-enthalpie.js
   (l'ORDRE des phrases porte les gestes). Brief : voyage-enthalpie/BRIEF-SCENES.md.
   AIDES LOCALES : croix() (le circuit de base + branches qui s'allument + molécule), fleche(),
   miniDiag() (cloche schématique, hors échelle), suite() (une valeur qui avance phrase par phrase).
   Écarts au brief : resume fait le tour du diagramme de 5 à 12 (et non de 0 à 7) pour que le point
   suive l'ordre des verbes (bas, droite, haut, gauche).
   TOUT EST FONCTION DE t : aucune animation CSS, aucun état gardé.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const SANS = "Calibri, Arial, sans-serif";
  const BLEU = "#2f6fb8", AMBRE = "#e8820c", ROUGE = "#c0392b", VIOLET = "#8e44ad", NUIT = "#10233c", GRIS = "#637285", CLAIR = "#9aa7b5";
  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const pts = l => l.map(q => q[0].toFixed(1) + "," + q[1].toFixed(1)).join(" ");
  const txt = (p, x, y, s, taille, fill, at) => D.texte(p, x, y, s, Object.assign({ "font-size": taille, fill: fill || NUIT, "font-family": SANS, "font-weight": 700 }, at || {}));
  const MID = { "text-anchor": "middle" }, FIN = { "text-anchor": "end" };
  /* apparition : 0 avant la phrase k, 1 un instant après son début */
  const vu = (c, t, k, delai) => D.borne((t - c.T[k] - (delai || 0) + 0.15) / 0.45, 0, 1);
  /* avancement dans la phrase k (0 → 1), sur la fraction `part` de sa durée */
  const prog = (c, t, k, part, debut) => D.lisse((t - c.T[k] - (debut || 0)) / ((c.E[k] - c.T[k]) * (part || 1)));

  /* flèche pleine : la pointe est en (x2, y2) */
  function fleche(p, x1, y1, x2, y2, coul, ep) {
    ep = ep || 8;
    const g = D.el("g", {}, p), a = Math.atan2(y2 - y1, x2 - x1), L = ep * 2.6, l = ep * 1.5, bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
    D.el("line", { x1: x1, y1: y1, x2: bx, y2: by, stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, g);
    D.el("polygon", { points: pts([[x2, y2], [bx - l * Math.sin(a), by + l * Math.cos(a)], [bx + l * Math.sin(a), by - l * Math.cos(a)]]), fill: coul }, g);
    return g;
  }

  /* une valeur qui avance phrase par phrase : tab[k] = [a, b] (ou une fonction de f), null = on garde la dernière */
  function suite(c, t, tab) {
    let k = -1;
    for (let m = 0; m < tab.length; m++) if (tab[m] && t >= c.T[m]) k = m;
    if (k < 0) { const e = tab.find(q => q); return Array.isArray(e) ? e[0] : e(0); }
    const f = D.lisse((t - c.T[k]) / (c.E[k] - c.T[k])), e = tab[k];
    return Array.isArray(e) ? D.lerp(e[0], e[1], f) : e(f);
  }

  /* ---------- la croix du frigoriste : le circuit de base, ses quatre branches qui peuvent s'allumer, la molécule ---------- */
  const BR = { bas: [14, 15, 0, 1, 2], droite: [2, 3, 4, 5], haut: [5, 6, 7, 8, 9, 10, 11], gauche: [11, 12, 13, 14] };
  const CB = { bas: BLEU, droite: AMBRE, haut: ROUGE, gauche: VIOLET };
  function croix(parent, x, y, l) {
    const cir = D.circuit(parent, x, y, l, false), premier = cir.g.children[2], halo = {};
    for (const n in BR) { // sous les symboles : seule la tuyauterie s'allume
      halo[n] = D.el("polyline", { points: BR[n].map(i => D.CIRCUIT_PTS[i].join(",")).join(" "), fill: "none", stroke: CB[n], "stroke-width": 34, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 });
      cir.g.insertBefore(halo[n], premier);
    }
    const mila = D.heroine(parent, { r: 30 });
    cir.allume = (n, v) => op(halo[n], v);
    cir.mila = (w, t, p) => { const [px, py] = cir.ecran(...D.circuitPoint(w)); mila({ x: px, y: py, s: Math.max(0.45, l / 800), t: t, temp: p.temp, etat: p.etat, humeur: p.humeur, op: p.op }); };
    return cir;
  }

  /* ---------- un diagramme schématique (la cloche n'est pas à l'échelle) : repère (u, v) de 0 à 1, v vers le haut ---------- */
  const CLOCHE_G = [[0.12, 0], [0.14, 0.18], [0.2, 0.4], [0.3, 0.62], [0.45, 0.86], [0.62, 0.97]];
  const CLOCHE_D = [[0.62, 0.97], [0.72, 0.88], [0.78, 0.68], [0.8, 0.42], [0.8, 0.2], [0.78, 0]];
  function miniDiag(parent, x, y, w, h, titreP, titreH) {
    const g = D.el("g", {}, parent), X = u => x + u * w, Y = v => y + h - v * h;
    D.el("path", { d: "M " + pts(CLOCHE_G.concat(CLOCHE_D.slice(1)).map(([u, v]) => [X(u), Y(v)])).replace(/ /g, " L "), fill: "rgba(47,111,184,.10)", stroke: BLEU, "stroke-width": 3 }, g);
    D.el("path", { d: "M " + x + " " + (y + h + 4) + " V " + (y - 8) + " m -7 12 l 7 -12 l 7 12", fill: "none", stroke: NUIT, "stroke-width": 3 }, g);
    D.el("path", { d: "M " + (x - 4) + " " + (y + h) + " H " + (x + w + 10) + " m -12 -7 l 12 7 l -12 7", fill: "none", stroke: NUIT, "stroke-width": 3 }, g);
    if (titreP) txt(g, x + 14, y + 6, titreP, 22);
    if (titreH) txt(g, x + w * 0.5, y + h + 32, titreH, 22, NUIT, MID);
    return { g: g, X: X, Y: Y };
  }
  function rond(parent, cx, cy, n) {
    D.el("circle", { cx: cx, cy: cy, r: 15, fill: "#fff", stroke: NUIT, "stroke-width": 3 }, parent);
    txt(parent, cx, cy + 6.5, n, 18, NUIT, MID);
  }

  /* ======================================================================
     6 — LIRE LES ÉNERGIES : trois barres à l'échelle des Δh, puis le COP
     ====================================================================== */
  S.energies = function (g, c) {
    const X0 = 60, SC = 2.5, H = 52, LA = 247 * SC, LB = 44 * SC, YA = 340, YB = 460, YC = 580;
    // k0 : un kilo, une double flèche
    const haut = D.el("g", {}, g);
    txt(haut, 150, 240, "h1", 28, NUIT, MID); txt(haut, 900, 240, "h2", 28, NUIT, MID);
    fleche(haut, 525, 232, 190, 232, NUIT, 7); fleche(haut, 525, 232, 862, 232, NUIT, 7);
    txt(haut, 525, 196, "Δh = h2 − h1", 38, D.BLEU, MID);
    txt(haut, 525, 278, "l'énergie que 1 kg gagne ou perd (kJ/kg)", 24, GRIS, MID);
    const pk = D.el("g", {}, g);
    D.pastille(pk, 14, 165, "1 kg", D.BLEU, 26);
    const mila = D.heroine(g, { r: 30 });
    // les trois barres
    const lab = (y, s) => txt(g, X0, y - 18, s, 28, NUIT);
    const lA = lab(YA, "évaporateur : le froid produit"), lB = lab(YB, "compresseur : l'énergie du moteur"), lC = lab(YC, "condenseur : la chaleur rendue dehors");
    const rA = D.el("rect", { x: X0, y: YA, width: 0, height: H, rx: 6, fill: BLEU }, g), tA = txt(g, X0 + 18, YA + 37, "523 − 276 = 247 kJ/kg", 32, "#fff");
    const rB = D.el("rect", { x: X0, y: YB, width: 0, height: H, rx: 6, fill: AMBRE }, g), tB = txt(g, X0 + LB + 22, YB + 37, "567 − 523 = 44 kJ/kg", 32, NUIT);
    const cB = D.el("rect", { x: X0, y: YA, width: LA, height: H, rx: 6, fill: BLEU, stroke: "#fff", "stroke-width": 3, opacity: 0 }, g);
    const cA = D.el("rect", { x: X0, y: YB, width: LB, height: H, rx: 6, fill: AMBRE, stroke: "#fff", "stroke-width": 3, opacity: 0 }, g);
    const nB = txt(g, X0 + 20, YC + 37, "247", 32, "#fff"), nA = txt(g, X0 + LA + LB / 2, YC + 37, "44", 32, "#fff", MID);
    const cadre = D.el("rect", { x: X0 - 4, y: YC - 4, width: LA + LB + 8, height: H + 8, rx: 9, fill: "none", stroke: ROUGE, "stroke-width": 5 }, g);
    const tC = txt(g, X0, YC + H + 44, "567 − 276 = 291 kJ/kg, soit 247 + 44", 32, NUIT);
    // k4 : le COP
    const cop = D.el("g", {}, g);
    txt(cop, 40, 738, "COP =", 38, D.BLEU);
    let x = 150;
    const p1 = D.pastille(cop, x, 735, "froid produit : 247", BLEU, 28); x += p1.largeur + 14;
    txt(cop, x + 14, 738, "÷", 44, NUIT, MID); x += 42;
    const p2 = D.pastille(cop, x, 735, "énergie du moteur : 44", AMBRE, 28); x += p2.largeur + 16;
    txt(cop, x, 738, "≈ 5,6", 44, ROUGE);

    return function (t) {
      op(haut, vu(c, t, 0)); op(pk, vu(c, t, 0));
      const hx = 80, hy = 224 + 4 * Math.sin(t * 2.4);
      mila({ x: hx, y: hy, s: 1, t: t, temp: 0.12, etat: "liquide", humeur: t > c.T[3] ? "chaud" : "sourire", op: 1 });
      const a = prog(c, t, 1, 0.6), b = prog(c, t, 2, 0.6), p3 = prog(c, t, 3, 0.35), p4 = prog(c, t, 3, 0.35, 0.35 * (c.E[3] - c.T[3]));
      rA.setAttribute("width", (LA * a).toFixed(1)); op(lA, vu(c, t, 1)); op(tA, D.borne((a - 0.85) * 7, 0, 1));
      rB.setAttribute("width", (LB * b).toFixed(1)); op(lB, vu(c, t, 2)); op(tB, D.borne((b - 0.85) * 7, 0, 1));
      op(lC, vu(c, t, 3));
      cB.setAttribute("y", D.lerp(YA, YC, p3).toFixed(1)); op(cB, p3 > 0.001 ? 1 : 0);
      cA.setAttribute("x", D.lerp(X0, X0 + LA, p4).toFixed(1)); cA.setAttribute("y", D.lerp(YB, YC, p4).toFixed(1)); op(cA, p4 > 0.001 ? 1 : 0);
      const fin = D.borne((p4 - 0.9) * 10, 0, 1);
      op(nB, fin); op(nA, fin); op(cadre, fin); op(tC, fin);
      op(cop, vu(c, t, 4));
      // le point descend le long du cycle : évaporateur (k1), compresseur (k2), condenseur (k3)
      return {
        temp: suite(c, t, [[0.1, 0.1], [0.1, 0.2], [0.2, 0.7], [0.7, 0.15], [0.15, 0.15]]),
        etat: t < c.A(1, 0.6) ? "bout" : t < c.A(3, 0.6) ? "vapeur" : t < c.A(3, 0.95) ? "bout" : "liquide",
        humeur: t < c.T[2] ? "sourire" : t < c.T[4] ? "chaud" : "sourire",
        carte: suite(c, t, [[0, 0], [0, 2], [2, 5], [5, 8.5], [8.5, 8.5]]),
        diag: suite(c, t, [[5, 5], [5, 7], [7, 8], [8, 11], [11, 11]]), diag0: 5
      };
    };
  };

  /* ======================================================================
     7 — LA CROIX ET LE DIAGRAMME CÔTE À CÔTÉ : chaque branche s'allume avec le côté du cycle
     ====================================================================== */
  S.parallele = function (g, c) {
    const cir = croix(g, 20, 215, 500);
    txt(g, 262, 205, "condenseur", 26, D.BLEU, MID); txt(g, 262, 556, "évaporateur", 26, D.BLEU, MID);
    txt(g, 108, 392, "détendeur", 26, D.BLEU); txt(g, 410, 340, "compresseur", 26, D.BLEU, FIN);
    // le cycle en quatre flèches, qui reprend la forme du diagramme
    const R = { x0: 600, x1: 940, y0: 270, y1: 470 };
    const AR = {
      bas: [R.x0 + 12, R.y1, R.x1 - 12, R.y1], droite: [R.x1, R.y1 - 12, R.x1, R.y0 + 12],
      haut: [R.x1 - 12, R.y0, R.x0 + 12, R.y0], gauche: [R.x0, R.y0 + 12, R.x0, R.y1 - 12]
    };
    const fond = D.el("g", {}, g), lum = {};
    for (const n in AR) { fleche(fond, ...AR[n], "#d3dbe4", 8); lum[n] = fleche(g, ...AR[n], CB[n], 14); op(lum[n], 0); }
    txt(g, 770, 247, "haute pression", 22, GRIS, MID); txt(g, 770, 506, "basse pression", 22, GRIS, MID);
    txt(g, 770, 318, "condenseur", 22, ROUGE, MID); txt(g, 770, 438, "évaporateur", 22, BLEU, MID);
    txt(g, 636, 384, "détendeur", 22, VIOLET); txt(g, 906, 384, "compresseur", 22, "#b35f00", FIN);
    const NOM = ["bas", "droite", "haut", "gauche"];
    const LEG = ["la croix et le diagramme : les mêmes quatre côtés", "en bas : je prends de l'énergie, vers la droite", "à droite : on me serre, je monte",
      "en haut : je rends de l'énergie, vers la gauche", "à gauche : la pression chute, je descends"];
    const cap = LEG.map((s, k) => txt(g, 492, 628, s, 34, k ? CB[NOM[k - 1]] === AMBRE ? "#b35f00" : CB[NOM[k - 1]] : NUIT, MID));

    return function (t) {
      NOM.forEach((n, i) => {
        const k = i + 1, v = vu(c, t, k) * (k < 4 ? 1 - 0.5 * vu(c, t, k + 1) : 1);
        cir.allume(n, v); op(lum[n], v);
      });
      cap.forEach((e, k) => op(e, vu(c, t, k) * (k < 4 ? 1 - vu(c, t, k + 1) : 1)));
      const carte = suite(c, t, [[0, 0], [0, 2], [2, 5], f => D.courbe([[0, 5], [0.7, 8.5], [1, 12]], f, true), [12, 15]]);
      cir.mila(carte, t, { temp: 0.2, etat: "vapeur" });
      return {
        temp: suite(c, t, [[0.08, 0.08], [0.08, 0.2], [0.2, 0.7], [0.7, 0.15], [0.15, 0.08]]),
        etat: t < c.A(1, 0.5) ? "bout" : t < c.A(3, 0.6) ? "vapeur" : t < c.A(3, 0.95) ? "bout" : t < c.A(4, 0.5) ? "liquide" : "bout",
        humeur: "sourire",
        carte: carte,
        diag: suite(c, t, [[5, 5], [5, 7], [7, 8], [8, 11], [11, 12]]), diag0: 5
      };
    };
  };

  /* ======================================================================
     8 — DU MANOMÈTRE AU DIAGRAMME : manomètre BP, pince thermométrique, placer le point 1
     ====================================================================== */
  S.releves = function (g, c) {
    const cir = croix(g, 30, 500, 410);
    // le technicien (silhouette)
    const tec = D.el("g", {}, g);
    D.el("rect", { x: 74, y: 332, width: 20, height: 64, rx: 7, fill: "#3b4a5e" }, tec); D.el("rect", { x: 98, y: 332, width: 20, height: 64, rx: 7, fill: "#3b4a5e" }, tec);
    D.el("rect", { x: 66, y: 238, width: 60, height: 108, rx: 20, fill: "#4d7cb5" }, tec);
    D.el("line", { x1: 116, y1: 262, x2: 168, y2: 286, stroke: "#4d7cb5", "stroke-width": 16, "stroke-linecap": "round" }, tec);
    D.el("circle", { cx: 172, cy: 288, r: 9, fill: "#e8c5a0" }, tec);
    D.el("circle", { cx: 96, cy: 210, r: 24, fill: "#e8c5a0" }, tec);
    D.el("path", { d: "M 70 208 A 26 26 0 0 1 122 208 Z", fill: "#e8a317" }, tec); D.el("rect", { x: 64, y: 206, width: 64, height: 8, rx: 4, fill: "#e8a317" }, tec);
    // le manomètre basse pression
    const CX = 305, CY = 268, RA = 88, dial = D.el("g", {}, g);
    const ang = v => (135 + 270 * v / 30) * Math.PI / 180, au = (v, r) => [CX + r * Math.cos(ang(v)), CY + r * Math.sin(ang(v))];
    D.el("circle", { cx: CX, cy: CY, r: RA + 10, fill: "#dfe5ec", stroke: GRIS, "stroke-width": 5 }, dial);
    D.el("circle", { cx: CX, cy: CY, r: RA, fill: "#fff", stroke: "#b5c0cc", "stroke-width": 2 }, dial);
    for (let i = 0; i <= 12; i++) {
      const v = i * 2.5, maj = i % 4 === 0, [x1, y1] = au(v, RA - (maj ? 20 : 11)), [x2, y2] = au(v, RA - 3);
      D.el("line", { x1: x1, y1: y1, x2: x2, y2: y2, stroke: NUIT, "stroke-width": maj ? 4 : 2.4 }, dial);
    }
    [0, 10, 20, 30].forEach(v => { const [x, y] = au(v, RA + 28); txt(dial, x, y + 7, String(v), 22, NUIT, MID); });
    txt(dial, CX + 40, CY - 30, "BP", 26, D.BLEU, MID); txt(dial, CX, CY + 54, "bar", 22, GRIS, MID);
    const aig = D.el("line", { x1: CX, y1: CY, stroke: ROUGE, "stroke-width": 6, "stroke-linecap": "round" }, dial);
    D.el("circle", { cx: CX, cy: CY, r: 9, fill: NUIT }, dial);
    const lect = D.el("g", {}, g);
    D.el("rect", { x: 175, y: 398, width: 260, height: 48, rx: 12, fill: "#fff", stroke: NUIT, "stroke-width": 3 }, lect);
    txt(lect, 305, 432, "8,5 bar relatif", 30, NUIT, MID);
    const add = D.el("g", {}, g);
    txt(add, 30, 484, "8,5 + 1 ≈ 9,5 bar abs", 34, NUIT);
    fleche(add, 402, 480, 500, 398, ROUGE, 6);
    // le diagramme schématique de la scène
    const mn = miniDiag(g, 645, 205, 300, 280, "p (bar abs)", "h (énergie de 1 kg)");
    const P = { u: 0.93, v: 0.37 }, px = mn.X(P.u), py = mn.Y(P.v);
    const gp = D.el("g", {}, g);
    D.el("line", { x1: mn.X(0), y1: py, x2: px, y2: py, stroke: ROUGE, "stroke-width": 3, "stroke-dasharray": "2 7", "stroke-linecap": "round" }, gp);
    txt(gp, 630, py + 8, "9,5 bar abs", 22, ROUGE, FIN);
    const gt = D.el("g", {}, g);
    D.el("path", { d: "M " + mn.X(0.82) + " " + mn.Y(0.46) + " C " + mn.X(0.87) + " " + mn.Y(0.42) + " " + mn.X(0.91) + " " + mn.Y(0.39) + " " + px + " " + py + " S " + mn.X(0.98) + " " + mn.Y(0.24) + " " + mn.X(0.985) + " " + mn.Y(0.18), fill: "none", stroke: ROUGE, "stroke-width": 3, "stroke-dasharray": "2 7", "stroke-linecap": "round" }, gt);
    txt(gt, 948, 470, "10 °C", 22, ROUGE, FIN);
    const g1 = D.el("g", {}, g), anneau = D.el("circle", { cx: px, cy: py, r: 14, fill: "none", stroke: D.ORANGE, "stroke-width": 4 }, g1);
    D.el("circle", { cx: px, cy: py, r: 8, fill: NUIT }, g1);
    rond(g1, px - 24, py - 24, "1");
    const gq = D.el("g", {}, g), qx = mn.X(0.5), qy = mn.Y(0.58);
    txt(gq, qx, qy + 24, "?", 72, GRIS, MID);
    D.el("line", { x1: qx - 36, y1: qy + 32, x2: qx + 36, y2: qy - 38, stroke: ROUGE, "stroke-width": 7, "stroke-linecap": "round" }, gq);
    const mention = txt(g, 795, 556, "hors cloche seulement", 26, D.BLEU, MID);
    // la pince thermométrique sur le tube d'aspiration
    const pz = D.el("g", {}, g), [ax, ay] = cir.ecran(790, 545);
    D.el("circle", { cx: ax, cy: ay, r: 17, fill: "none", stroke: D.ORANGE, "stroke-width": 4 }, pz);
    D.trait(pz, ax + 19, ay - 3, 516, 692, GRIS);
    D.el("rect", { x: 520, y: 678, width: 445, height: 24, fill: "#e7a978", stroke: "#8a4a24", "stroke-width": 3 }, pz);
    D.el("rect", { x: 780, y: 652, width: 60, height: 26, rx: 8, fill: "#3b4a5e" }, pz); D.el("rect", { x: 780, y: 702, width: 60, height: 26, rx: 8, fill: "#3b4a5e" }, pz);
    D.el("rect", { x: 834, y: 652, width: 14, height: 76, rx: 6, fill: "#3b4a5e" }, pz);
    D.el("path", { d: "M 800 652 C 800 626 790 630 762 630", fill: "none", stroke: "#3b4a5e", "stroke-width": 5 }, pz);
    D.el("rect", { x: 560, y: 596, width: 202, height: 70, rx: 12, fill: "#1f2d3d" }, pz);
    D.el("rect", { x: 570, y: 606, width: 182, height: 50, rx: 6, fill: "#c9e6c3" }, pz);
    txt(pz, 661, 645, "10 °C", 44, NUIT, MID);
    txt(pz, 545, 750, "aspiration", 24, GRIS); txt(pz, 810, 750, "pince thermométrique", 24, GRIS, MID);

    return function (t) {
      op(dial, vu(c, t, 1)); op(lect, vu(c, t, 1, 0.55 * (c.E[1] - c.T[1])));
      const v = 8.5 * D.lisse((t - c.T[1] - 0.2) / ((c.E[1] - c.T[1]) * 0.55)) + 0.35 * Math.sin(t * 40) * (t > c.T[1] && t < c.T[1] + 0.9 ? 1 : 0);
      const [nx, ny] = au(Math.max(0, v), 68);
      aig.setAttribute("x2", nx.toFixed(1)); aig.setAttribute("y2", ny.toFixed(1));
      op(add, vu(c, t, 1, 0.6 * (c.E[1] - c.T[1])));
      op(mn.g, vu(c, t, 1, 0.5 * (c.E[1] - c.T[1]))); op(gp, vu(c, t, 1, 0.75 * (c.E[1] - c.T[1])));
      op(pz, vu(c, t, 2)); op(gt, vu(c, t, 2, 0.6 * (c.E[2] - c.T[2])));
      op(g1, vu(c, t, 3)); anneau.setAttribute("r", (14 + 4 * Math.sin(t * 5)).toFixed(1));
      op(mention, vu(c, t, 3, 0.3 * (c.E[3] - c.T[3]))); op(gq, vu(c, t, 3, 0.5 * (c.E[3] - c.T[3])));
      cir.mila(2, t, { temp: 0.2, etat: "vapeur", humeur: "sourire" });
      return { temp: 0.2, etat: "vapeur", humeur: "sourire" };
    };
  };

  /* ======================================================================
     RÉSUMÉ — la croix et ses quatre verbes, puis la croix et le diagramme
     ====================================================================== */
  S.resume = function (g, c) {
    // k0 : la croix en grand, un verbe par côté
    const g0 = D.el("g", {}, g), cir = croix(g0, 250, 310, 450);
    const BLOC = [
      ["bas", "évaporateur", "je prends la chaleur", 475, 622, 658, MID], ["droite", "compresseur", "on me serre", 712, 442, 478, {}],
      ["haut", "condenseur", "je la rends", 475, 262, 298, MID], ["gauche", "détendeur", "je me détends", 238, 442, 478, FIN]];
    const verbes = BLOC.map(([n, nom, verbe, x, y1, y2, at]) => {
      txt(g0, x, y1, nom, 30, D.BLEU, at);
      return txt(g0, x, y2, verbe, 30, CLAIR, at);
    });
    // k1 : la croix et un petit diagramme côte à côte
    const g1 = D.el("g", {}, g), cir1 = croix(g1, 30, 300, 400);
    for (const n in BR) cir1.allume(n, 0.85);
    const mn = miniDiag(g1, 575, 285, 360, 250, "", "");
    const Q = { 1: [0.9, 0.35], 2: [0.97, 0.72], 3: [0.27, 0.72], 4: [0.27, 0.35] }, E = n => [mn.X(Q[n][0]), mn.Y(Q[n][1])];
    [["bas", 4, 1], ["droite", 1, 2], ["haut", 2, 3], ["gauche", 3, 4]].forEach(([n, a, b]) => fleche(mn.g, ...E(a), ...E(b), CB[n], 7));
    [1, 2, 3, 4].forEach(n => { const [x, y] = E(n); rond(mn.g, x + (n === 1 || n === 2 ? 26 : -26), y + (n === 2 || n === 3 ? -14 : 18), String(n)); });
    txt(g1, 230, 626, "la croix : où je passe", 26, D.BLEU, MID);
    txt(g1, 745, 626, "le diagramme : ce que je deviens", 26, D.ORANGE, MID);
    // les verbes sont dits dans cet ordre, à peu près au rythme des mots
    const DEB = [0.1, 0.38, 0.6, 0.8], ordre = ["bas", "droite", "haut", "gauche"];

    return function (t) {
      const f = D.borne((t - c.T[0]) / (c.E[0] - c.T[0]), 0, 1), bascule = vu(c, t, 1);
      op(g0, 1 - bascule); op(g1, bascule);
      ordre.forEach((n, i) => {
        const dans = f >= DEB[i], dernier = i < 3 && f >= DEB[i + 1];
        const v = D.borne((f - DEB[i] + 0.02) / 0.06, 0, 1) * (dernier ? 0.55 : 1);
        cir.allume(n, v);
        verbes[i].setAttribute("fill", dans ? (CB[n] === AMBRE ? "#b35f00" : CB[n]) : CLAIR);
      });
      const w = bascule > 0 ? 12 : D.courbe([[0, 5], [0.1, 5], [0.38, 7], [0.6, 8], [0.8, 11], [0.98, 12]], f, true);
      const humeur = f < 0.38 ? "sourire" : f < 0.6 ? "surprise" : f < 0.8 ? "chaud" : "froid";
      cir.mila(bascule > 0 ? 14.5 : D.courbe([[0, 14.5], [0.1, 14.5], [0.38, 2], [0.6, 5], [0.8, 11.5], [0.98, 15]], f, true), t, { temp: D.courbe([[0, 0.08], [0.38, 0.2], [0.6, 0.7], [0.8, 0.15], [1, 0.08]], f, true), etat: f < 0.38 ? "bout" : f < 0.8 ? "vapeur" : "liquide", humeur: humeur, op: 1 - bascule });
      cir1.mila(14.5, t, { temp: 0.08, etat: "bout", humeur: "sourire", op: bascule });
      return { temp: 0.1, etat: "bout", humeur: humeur, diag: w, diag0: 5 };
    };
  };
})();
