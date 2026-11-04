/* =====================================================================
   voyage-enthalpie2-scenes-c.js — « Voyage dans tous ses états », édition « le diagramme enthalpique, niveau 2 » :
   placer les points, tracer le cycle, les calculs, le débit, le résumé
   ---------------------------------------------------------------------
   Scènes : points (9), trace (10), calculs (11), debit (12), resume. Même contrat que voyage-enthalpie-scenes-c.js :
   VOYAGE_SCENES[id](g, c) → maj(t). Écran partagé : la scène tient dans x 20 → 965, y 150 → 760.
   Récit : donnees/voyage-enthalpie2.js (l'ORDRE des phrases porte les gestes). Brief : voyage-enthalpie2/BRIEF-SCENES.md.
   AIDES LOCALES : croix() (circuit de base + branches qui s'allument + molécule), fleche(), rond(), rangee() (une ligne
   de formule : textes et pastilles mesurés l'un après l'autre), bocal() (liquide + vapeur), suite().
   Écarts au brief : trace — la molécule traverse le condenseur de la carte 5 à 11,5 (et non 5 à 8,5) pour ne pas sauter
   de 8,5 à 12 au début du détendeur ; calculs/debit rendent { diag: 12, diag0: 5 } (trace orange pleine).
   TOUT EST FONCTION DE t : aucune animation CSS, aucun état gardé.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const SANS = "Calibri, Arial, sans-serif";
  const BLEU = "#2f6fb8", AMBRE = "#e8820c", AMBRE_F = "#b35f00", ROUGE = "#c0392b", VIOLET = "#8e44ad", VERT = "#1e7e54", NUIT = "#10233c", GRIS = "#637285", CLAIR = "#9aa7b5";
  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const pts = l => l.map(q => q[0].toFixed(1) + "," + q[1].toFixed(1)).join(" ");
  const txt = (p, x, y, s, taille, fill, at) => D.texte(p, x, y, s, Object.assign({ "font-size": taille, fill: fill || NUIT, "font-family": SANS, "font-weight": 700 }, at || {}));
  const MID = { "text-anchor": "middle" }, FIN = { "text-anchor": "end" };
  /* apparition : 0 avant la phrase k, 1 un instant après son début */
  const vu = (c, t, k, delai) => D.borne((t - c.T[k] - (delai || 0) + 0.15) / 0.45, 0, 1);
  /* avancement dans la phrase k (0 → 1), sur la fraction `part` de sa durée */
  const prog = (c, t, k, part, debut) => D.lisse((t - c.T[k] - (debut || 0)) / ((c.E[k] - c.T[k]) * (part || 1)));
  /* sortie en fondu quand la phrase suivante commence */
  const sans = (c, t, k) => k + 1 < c.T.length ? 1 - vu(c, t, k + 1) : 1;

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
  function rond(parent, cx, cy, n, r) {
    D.el("circle", { cx: cx, cy: cy, r: r || 22, fill: "#fff", stroke: NUIT, "stroke-width": 3 }, parent);
    txt(parent, cx, cy + (r ? r * 0.36 : 10), n, r ? r * 1.7 : 30, NUIT, MID);
  }
  function coche(parent, x, y, coul) { // une coche dessinée (pas de glyphe)
    D.el("polyline", { points: pts([[x, y], [x + 9, y + 10], [x + 25, y - 12]]), fill: "none", stroke: coul, "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, parent);
  }
  /* une ligne de formule : items [texte, couleur, "p" (pastille) | "", taille?] posés l'un après l'autre (largeurs mesurées) */
  function rangee(parent, x, y, items, taille, ecart) {
    const g = D.el("g", {}, parent), ec = ecart === undefined ? 14 : ecart;
    let cx = x;
    items.forEach(it => {
      const tl = it[3] || taille;
      let w;
      if (it[2] === "p") w = D.pastille(g, cx, y, it[0], it[1], tl).largeur;
      else { const e = txt(g, cx, y, it[0], tl, it[1]); w = (e.getComputedTextLength && e.getComputedTextLength()) || it[0].length * tl * 0.52; }
      cx += w + ec;
    });
    g.fin = cx - ec;
    return g;
  }

  /* ---------- la croix du frigoriste : le circuit de base, ses quatre branches qui peuvent s'allumer, la molécule ---------- */
  const BR = { bas: [14, 15, 0, 1, 2], droite: [2, 3, 4, 5], haut: [5, 6, 7, 8, 9, 10, 11], gauche: [11, 12, 13, 14] };
  const CB = { bas: BLEU, droite: AMBRE, haut: ROUGE, gauche: VIOLET };
  const NOM_BR = ["bas", "droite", "haut", "gauche"];
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

  /* ---------- un bocal de 1 kg : la nappe de liquide, des molécules de vapeur au-dessus ---------- */
  function bocal(parent, x, y, w, h, niveau, nbMol, graine) {
    const g = D.el("g", {}, parent);
    D.el("rect", { x: x, y: y, width: w, height: h, rx: 18, fill: "rgba(255,255,255,.55)", stroke: NUIT, "stroke-width": 4 }, g);
    const liq = D.liquide(g, { x0: x + 4, x1: x + w - 4, yh: y + 4, yb: y + h - 4, niveau: () => niveau, couleur: () => "#6aa6dc", opacite: 0.8, pas: 10 });
    const ns = D.alea(graine), mols = [];
    for (let i = 0; i < nbMol; i++) mols.push({ mol: D.mol(g), cx: x + 24 + ns() * (w - 48), cy: y + 22 + ns() * Math.max(10, (h - 8) * (1 - niveau) - 46), ph: ns() * 6 });
    D.el("rect", { x: x - 6, y: y - 12, width: w + 12, height: 16, rx: 6, fill: "#8d99a6" }, g);
    return { g: g, maj: t => { liq.maj(t); mols.forEach(m => m.mol(m.cx + 6 * Math.sin(t * 1.7 + m.ph), m.cy + 5 * Math.cos(t * 1.3 + m.ph), 0.4, true)); } };
  }

  /* ======================================================================
     9 — PLACER LES POINTS : le tableau des relevés, quatre cartes qui se remplissent
     ====================================================================== */
  S.points = function (g, c) {
    // le tableau des relevés (en absolu), à gauche
    D.el("rect", { x: 30, y: 168, width: 365, height: 270, rx: 16, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 2 }, g);
    txt(g, 212, 204, "les relevés", 30, BLEU, MID);
    const LIG = [["BP", "2 bar abs"], ["HP", "10,2 bar abs"], ["aspiration", "−3 °C"], ["refoulement", "65 °C"], ["sortie condenseur", "35 °C"]];
    const surl = LIG.map((l, i) => D.el("rect", { x: 40, y: 220 + i * 44, width: 345, height: 40, rx: 8, fill: "#fde6c8", opacity: 0 }, g));
    LIG.forEach((l, i) => { txt(g, 52, 250 + i * 44, l[0], 28, NUIT); txt(g, 375, 250 + i * 44, l[1], 28, i < 2 ? (i ? D.ORANGE : BLEU) : NUIT, FIN); });
    const ACTIF = [[0, 2], [1, 3], [1, 4]]; // lignes du tableau utilisées par la phrase k
    // les quatre cartes
    const CX = 410, CW = 550, CH = 112, Y = [170, 296, 422, 598];
    const cs = [0, 1, 2, 3].map(i => {
      const gc = D.el("g", {}, g);
      D.el("rect", { x: CX, y: Y[i], width: CW, height: CH, rx: 16, fill: "#fff", stroke: NUIT, "stroke-width": 3 }, gc);
      rond(gc, CX + 44, Y[i] + CH / 2, String(i + 1), 26);
      return gc;
    });
    const TEXTE = [["BP + −3 °C", "h = 399 kJ/kg", "hors de la cloche", BLEU], ["HP + 65 °C", "h = 446 kJ/kg", "hors de la cloche", D.ORANGE], ["HP + 35 °C", "h = 249 kJ/kg", "liquide, hors cloche", D.ORANGE]];
    const noyaux = TEXTE.map((q, i) => {
      const n = D.el("g", {}, cs[i]);
      txt(n, CX + 90, Y[i] + 46, q[0], 32, q[3]);
      txt(n, CX + 90, Y[i] + 90, q[1], 38, AMBRE_F);
      const note = txt(n, CX + CW - 15, Y[i] + 48, q[2], 28, VERT, FIN);
      coche(n, CX + CW - 15 - ((note.getComputedTextLength && note.getComputedTextLength()) || q[2].length * 14.5) - 40, Y[i] + 40, VERT);
      return n;
    });
    // carte 4 : d'abord le point d'interrogation barré, puis h4 = h3
    const n4a = D.el("g", {}, cs[3]), n4b = D.el("g", {}, cs[3]);
    txt(n4a, CX + 90, Y[3] + 46, "BP + ?", 32, BLEU);
    txt(n4a, CX + 90, Y[3] + 90, "sous la cloche : p et T ne suffisent pas", 28, ROUGE);
    txt(n4a, CX + CW - 50, Y[3] + 58, "?", 64, GRIS, MID);
    D.el("line", { x1: CX + CW - 84, y1: Y[3] + 58, x2: CX + CW - 16, y2: Y[3] + 10, stroke: ROUGE, "stroke-width": 8, "stroke-linecap": "round" }, n4a);
    txt(n4b, CX + 90, Y[3] + 46, "BP + h4 = h3", 32, BLEU);
    txt(n4b, CX + 90, Y[3] + 90, "h = 249 kJ/kg", 38, AMBRE_F);
    const titre = D.el("g", {}, cs[3]);
    txt(titre, CX + CW - 15, Y[3] + 90, "titre 0,3", 32, VERT, FIN);
    // k4 : la flèche verticale entre les cartes 3 et 4
    const ver = D.el("g", {}, g);
    fleche(ver, CX + 60, Y[2] + CH + 4, CX + 60, Y[3] - 4, VIOLET, 8);
    txt(ver, CX + 90, Y[3] - 18, "h4 = h3 = 249", 34, VIOLET);
    // k5 : le bocal de 1 kg à 30 % de vapeur
    const bo = bocal(g, 44, 500, 170, 230, 0.7, 6, 7), bg = D.el("g", {}, g);
    txt(bg, 228, 540, "30 %", 40, AMBRE_F); txt(bg, 228, 574, "de vapeur", 28, GRIS);
    txt(bg, 228, 650, "70 %", 40, BLEU); txt(bg, 228, 684, "de liquide", 28, GRIS);

    return function (t) {
      surl.forEach((r, i) => { let v = 0; for (let k = 0; k < 3; k++) if (ACTIF[k].indexOf(i) >= 0) v = Math.max(v, vu(c, t, k) * sans(c, t, k)); op(r, v); });
      noyaux.forEach((n, i) => op(n, vu(c, t, i)));
      cs.forEach((q, i) => op(q, 0.3 + 0.7 * vu(c, t, i)));
      op(n4a, vu(c, t, 3) * sans(c, t, 3)); op(n4b, vu(c, t, 4)); op(ver, vu(c, t, 4)); op(titre, vu(c, t, 5));
      op(bo.g, vu(c, t, 5)); op(bg, vu(c, t, 5, 0.3)); bo.maj(t);
      return { temp: 0.12, etat: "vapeur", humeur: "sourire" };
    };
  };

  /* ======================================================================
     10 — TRACER LE CYCLE : la croix et le diagramme avancent ensemble
     ====================================================================== */
  S.trace = function (g, c) {
    const cir = croix(g, 24, 190, 560);
    txt(g, 371, 184, "condenseur", 28, BLEU, MID); txt(g, 310, 565, "évaporateur", 28, BLEU, MID);
    txt(g, 468, 382, "compresseur", 28, BLEU, FIN); txt(g, 118, 382, "détendeur", 28, BLEU);
    // les quatre cartes de points, en petit (colonne de droite de la scène)
    const CARTES = [["BP, −3 °C", "399 kJ/kg"], ["HP, 65 °C", "446 kJ/kg"], ["HP, 35 °C", "249 kJ/kg"], ["BP, −10 °C", "249 kJ/kg"]];
    const cs = CARTES.map((q, i) => {
      const gc = D.el("g", {}, g), y = 188 + i * 92;
      D.el("rect", { x: 655, y: y, width: 305, height: 80, rx: 14, fill: "#fff", stroke: NUIT, "stroke-width": 3 }, gc);
      rond(gc, 696, y + 40, String(i + 1), 22);
      txt(gc, 734, y + 34, q[0], 28, i % 3 === 0 ? BLEU : D.ORANGE); txt(gc, 734, y + 68, q[1], 30, AMBRE_F);
      return gc;
    });
    const ACTIF = [[0, 1, 2, 3], [3, 0], [0, 1], [1, 2], [2, 3]]; // cartes allumées par la phrase k
    // k1 : surchauffe au bout de l'évaporateur
    const sur = D.el("g", {}, g);
    D.trait(sur, 492, 548, 468, 503, GRIS); txt(sur, 505, 578, "surchauffe", 30, BLEU, MID);
    // k2 : deux thermomètres couchés, idéal 53 °C et vrai 65 °C
    const th = D.el("g", {}, g), TH = [["idéal", 53, BLEU, 640], ["vrai", 65, ROUGE, 702]], niv = [];
    TH.forEach(([nom, v, coul, y]) => {
      txt(th, 30, y + 10, nom, 30, NUIT);
      D.el("rect", { x: 130, y: y - 14, width: 480, height: 28, rx: 14, fill: "#e9eef4", stroke: GRIS, "stroke-width": 3 }, th);
      niv.push(D.el("rect", { x: 133, y: y - 11, width: 0, height: 22, rx: 11, fill: coul }, th));
      D.el("circle", { cx: 128, cy: y, r: 22, fill: coul, stroke: GRIS, "stroke-width": 3 }, th);
      D.pastille(th, 640, y + 10, v + " °C", coul, 30);
    });
    // k3 : trois mots qui s'allument
    const mots = D.el("g", {}, g), ml = rangee(mots, 40, 668, [["désurchauffe", ROUGE, "p"], ["condensation", ROUGE, "p"], ["sous-refroidissement", ROUGE, "p"]], 30, 16);
    const mg = Array.from(ml.children);
    // k4 : cycle fermé
    const fer = D.el("g", {}, g);
    D.pastille(fer, 490, 676, "cycle fermé", D.ORANGE, 44, "middle");

    return function (t) {
      cs.forEach((q, i) => { let v = 1; if (t >= c.T[1] - 0.15) { v = 0.45; for (let k = 1; k <= 4; k++) if (ACTIF[k].indexOf(i) >= 0) v = Math.max(v, vu(c, t, k) * sans(c, t, k)); } op(q, v); });
      NOM_BR.forEach((n, i) => cir.allume(n, vu(c, t, i + 1) * (i < 3 ? 1 - 0.5 * vu(c, t, i + 2) : 1)));
      op(sur, vu(c, t, 1) * sans(c, t, 1));
      op(th, vu(c, t, 2) * sans(c, t, 2));
      const p = prog(c, t, 2, 0.7);
      niv[0].setAttribute("width", (6 * 53 * p).toFixed(1)); niv[1].setAttribute("width", (6 * 65 * p).toFixed(1));
      op(mots, vu(c, t, 3) * sans(c, t, 3));
      mg.forEach((m, i) => op(m, 0.25 + 0.75 * D.borne((prog(c, t, 3, 1) - [0.1, 0.4, 0.7][i]) * 8, 0, 1)));
      op(fer, vu(c, t, 4));
      const carte = suite(c, t, [[14, 14], [14, 17], [2, 5], [5, 11.5], [11.5, 14.4]]);
      const temp = suite(c, t, [[0.05, 0.05], [0.05, 0.12], [0.12, 0.75], [0.75, 0.45], [0.45, 0.05]]);
      const etat = t < c.A(1, 0.65) ? "bout" : t < c.A(3, 0.3) ? "vapeur" : t < c.A(3, 0.85) ? "bout" : t < c.A(4, 0.55) ? "liquide" : "bout";
      const humeur = t >= c.T[4] ? "froid" : t >= c.T[2] && t < c.T[3] ? "chaud" : "sourire";
      cir.mila(carte, t, { temp: temp, etat: etat, humeur: humeur });
      return { temp: temp, etat: etat, humeur: humeur, carte: carte, diag: suite(c, t, [[5, 5], [5, 7], [7, 8], [8, 11], [11, 12]]), diag0: 5 };
    };
  };

  /* ======================================================================
     11 — LES CALCULS : trois barres de Δh à l'échelle, les COP, le taux de compression
     ====================================================================== */
  S.calculs = function (g, c) {
    const X0 = 60, SC = 3.5, LA = 150 * SC, LB = 47 * SC, LC = 197 * SC, H = 50, YA = 215, YC = 355;
    txt(g, X0, YA - 12, "évaporateur", 28, BLEU); txt(g, X0 + LA, YA - 12, "compresseur", 28, AMBRE_F);
    const rA = D.el("rect", { x: X0, y: YA, width: 0, height: H, rx: 6, fill: BLEU }, g), tA = txt(g, X0 + 18, YA + 36, "399 − 249 = 150 kJ/kg", 32, "#fff");
    const rB = D.el("rect", { x: X0 + LA, y: YA, width: 0, height: H, rx: 6, fill: AMBRE }, g), tB = txt(g, X0 + LA + LB, YA + H + 38, "446 − 399 = 47 kJ/kg", 32, AMBRE_F, FIN);
    const lC = txt(g, X0, YC - 12, "condenseur", 28, ROUGE);
    const rC = D.el("rect", { x: X0, y: YC, width: 0, height: H, rx: 6, fill: ROUGE }, g), tC = txt(g, X0 + 18, YC + 36, "446 − 249 = 197 kJ/kg", 32, "#fff");
    const nC = txt(g, X0, YC + H + 36, "197 = 150 + 47", 30, GRIS);
    // les quatre formules
    const R = [520, 590, 660, 735];
    const r1 = rangee(g, 40, R[0], [["COP froid =", NUIT], ["150", BLEU, "p"], ["÷", NUIT], ["47", AMBRE, "p"], ["≈ 3,2", ROUGE]], 38);
    const r2 = rangee(g, 40, R[1], [["COP chaud =", NUIT], ["197", ROUGE, "p"], ["÷", NUIT], ["47", AMBRE, "p"], ["≈ 4,2", ROUGE]], 38);
    const mais = D.el("g", {}, g); // k4 : la petite maison (pompe à chaleur)
    D.el("polygon", { points: pts([[825, 560], [875, 522], [925, 560]]), fill: ROUGE }, mais);
    D.el("rect", { x: 837, y: 560, width: 76, height: 44, fill: "#fde6c8", stroke: ROUGE, "stroke-width": 4 }, mais);
    D.el("rect", { x: 866, y: 574, width: 20, height: 30, fill: ROUGE }, mais);
    const r3 = rangee(g, 40, R[2], [["taux =", NUIT], ["10,2", D.ORANGE, "p"], ["÷", NUIT], ["2", BLEU, "p"], ["= 5,1", ROUGE]], 38);
    txt(r3, r3.fin + 24, R[2], "pressions absolues", 28, GRIS);
    const r4 = rangee(g, 40, R[3] - 8, [["9,2", D.ORANGE, "p"], ["÷", NUIT], ["1", BLEU, "p"], ["= 9,2", NUIT]], 38);
    const rat = r4.lastChild.getBBox(); // la rature ne barre que le texte « = 9,2 » (les pastilles restent nettes), à mi-hauteur des chiffres
    D.el("line", { x1: rat.x - 4, y1: R[3] - 8 - 14, x2: rat.x + rat.width + 4, y2: R[3] - 8 - 14, stroke: ROUGE, "stroke-width": 4, "stroke-linecap": "round", opacity: 0.7 }, r4);
    const cx = r4.fin + 34, cy = R[3] - 8 - 12; // et une croix rouge à côté de la ligne
    D.el("path", { d: "M " + (cx - 14) + " " + (cy - 14) + " L " + (cx + 14) + " " + (cy + 14) + " M " + (cx + 14) + " " + (cy - 14) + " L " + (cx - 14) + " " + (cy + 14), stroke: ROUGE, "stroke-width": 4, "stroke-linecap": "round", opacity: 0.7 }, r4);
    txt(r4, r4.fin + 70, R[3] - 8, "relatif : faux", 34, ROUGE);

    return function (t) {
      const a = prog(c, t, 0, 0.7), b = prog(c, t, 1, 0.7), k = prog(c, t, 2, 0.7);
      rA.setAttribute("width", (LA * a).toFixed(1)); op(tA, D.borne((a - 0.85) * 7, 0, 1));
      rB.setAttribute("width", (LB * b).toFixed(1)); op(tB, D.borne((b - 0.85) * 7, 0, 1));
      rC.setAttribute("width", (LC * k).toFixed(1)); op(tC, D.borne((k - 0.85) * 7, 0, 1)); op(lC, vu(c, t, 2)); op(nC, D.borne((k - 0.9) * 10, 0, 1));
      op(r1, vu(c, t, 3)); op(r2, vu(c, t, 4)); op(mais, vu(c, t, 4, 0.4)); op(r3, vu(c, t, 5)); op(r4, vu(c, t, 6));
      return { temp: 0.12, etat: "vapeur", humeur: "sourire", diag: 12, diag0: 5 };
    };
  };

  /* ======================================================================
     12 — DU KILO À L'INSTALLATION : le débit massique et les deux puissances
     ====================================================================== */
  S.debit = function (g, c) {
    // k0 : la chambre froide et ses 3 kW de froid
    txt(g, 140, 184, "chambre froide", 28, GRIS, MID);
    const ch = D.el("g", {}, g);
    D.el("rect", { x: 30, y: 194, width: 220, height: 142, rx: 10, fill: "#eaf3fb", stroke: BLEU, "stroke-width": 5 }, ch);
    D.el("rect", { x: 178, y: 222, width: 58, height: 114, fill: "#cfe3f5", stroke: BLEU, "stroke-width": 4 }, ch);
    D.el("circle", { cx: 187, cy: 282, r: 5, fill: BLEU }, ch);
    for (let a = 0; a < 3; a++) { const r = a * Math.PI / 3, dx = 36 * Math.cos(r), dy = 36 * Math.sin(r); D.el("line", { x1: 100 - dx, y1: 268 - dy, x2: 100 + dx, y2: 268 + dy, stroke: BLEU, "stroke-width": 6, "stroke-linecap": "round" }, ch); }
    const kw = D.pastille(g, 272, 276, "3 kW de froid", BLEU, 36);
    // k1 : le débit, le compteur
    const cp = D.el("g", {}, g);
    D.el("rect", { x: 570, y: 182, width: 385, height: 150, rx: 16, fill: NUIT }, cp);
    const l1 = txt(cp, 592, 228, "3 ÷ 150", 38, "#9fd0ff"), l2 = txt(cp, 592, 276, "0,02 kg par seconde", 36, "#c9e6c3"), l3 = txt(cp, 592, 320, "72 kg par heure", 34, "#c9e6c3");
    const tube = D.el("g", {}, g);
    D.tube(tube, 30, 350, 925, 64, "cuivre", false);
    const sacs = [0, 1, 2, 3, 4, 5].map(() => {
      const s = D.el("g", {}, tube);
      D.el("rect", { x: 0, y: 0, width: 72, height: 38, rx: 9, fill: "#f4d9a8", stroke: "#8a4a24", "stroke-width": 3 }, s);
      txt(s, 36, 28, "1 kg", 28, NUIT, MID);
      return s;
    });
    // k2 : débit massique, chronomètre
    const dm = D.el("g", {}, g);
    D.el("circle", { cx: 90, cy: 492, r: 36, fill: "#fff", stroke: NUIT, "stroke-width": 5 }, dm);
    D.el("rect", { x: 82, y: 446, width: 16, height: 10, rx: 3, fill: NUIT }, dm);
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; D.el("line", { x1: 90 + 28 * Math.sin(a), y1: 492 - 28 * Math.cos(a), x2: 90 + 33 * Math.sin(a), y2: 492 - 33 * Math.cos(a), stroke: NUIT, "stroke-width": 3 }, dm); }
    const main = D.el("line", { x1: 90, y1: 492, x2: 90, y2: 466, stroke: ROUGE, "stroke-width": 5, "stroke-linecap": "round" }, dm);
    txt(dm, 146, 504, "chaque seconde", 34, NUIT); txt(dm, 500, 504, "débit massique", 46, D.ORANGE);
    // k3 : au compresseur ; k4 : au condenseur, et les deux barres bout à bout
    const r3 = D.el("g", {}, g), r4 = D.el("g", {}, g), br = D.el("g", {}, g);
    D.image(r3, "compresseur", 30, 556, 76, 58);
    rangee(r3, 124, 598, [["au compresseur :", GRIS, "", 30], ["0,02 × 47 ≈ 0,94 kW", AMBRE_F, "", 38]], 38, 16);
    D.image(r4, "condenseur", 30, 624, 76, 58);
    rangee(r4, 124, 666, [["au condenseur :", GRIS, "", 30], ["0,02 × 197 ≈ 3,9 kW", ROUGE, "", 38]], 38, 16);
    const E = 150;
    D.el("rect", { x: 40, y: 698, width: 3 * E, height: 42, rx: 6, fill: BLEU }, br); D.el("rect", { x: 40 + 3 * E, y: 698, width: 0.94 * E, height: 42, rx: 6, fill: AMBRE }, br);
    txt(br, 58, 728, "3 kW", 30, "#fff"); txt(br, 40 + 3 * E + 8, 728, "0,94 kW", 28, NUIT);
    txt(br, 40 + 3.94 * E + 22, 730, "= 3 kW + 0,94 kW", 34, NUIT);

    return function (t) {
      op(ch, vu(c, t, 0)); op(kw, vu(c, t, 0, 0.2));
      op(cp, vu(c, t, 1)); op(l1, vu(c, t, 1)); op(l2, vu(c, t, 1, 0.9)); op(l3, vu(c, t, 1, 2.2)); op(tube, vu(c, t, 1));
      sacs.forEach((s, i) => { const x = 40 + ((i * 140 + 140 * t) % 840); s.setAttribute("transform", "translate(" + x.toFixed(1) + " 363)"); op(s, D.borne(Math.min(x - 40, 880 - x) / 40, 0, 1)); });
      op(dm, vu(c, t, 2)); main.setAttribute("transform", "rotate(" + (360 * D.frac(t)).toFixed(1) + " 90 492)");
      op(r3, vu(c, t, 3)); op(r4, vu(c, t, 4)); op(br, vu(c, t, 4, 0.5));
      return { temp: 0.12, etat: "vapeur", humeur: "sourire", diag: 12, diag0: 5 };
    };
  };

  /* ======================================================================
     RÉSUMÉ — les cinq gestes, un par un, avec leur petite icône ; la molécule fait le tour du cycle
     ====================================================================== */
  S.resume = function (g, c) {
    const TXT = [["Relever les deux pressions", "et les trois températures"], ["Ajouter 1 bar, tracer les isobares,", "lire évaporation et condensation"],
      ["Calculer la surchauffe et le", "sous-refroidissement"], ["Placer 1, 2 et 3 hors de la cloche,", "puis 4 à la verticale du point 3"], ["Lire les enthalpies", "et faire les calculs"]];
    const icone = [
      p => { // manifold et flexibles
        D.el("rect", { x: 0, y: 40, width: 110, height: 36, rx: 8, fill: "#3b4a5e" }, p);
        [[26, BLEU], [84, ROUGE]].forEach(([x, k]) => { D.el("circle", { cx: x, cy: 26, r: 22, fill: "#fff", stroke: k, "stroke-width": 6 }, p); D.el("line", { x1: x, y1: 26, x2: x + 11, y2: 15, stroke: NUIT, "stroke-width": 4, "stroke-linecap": "round" }, p); });
        D.el("path", { d: "M 22 76 C 22 90 6 90 6 100 M 88 76 C 88 90 104 90 104 100", fill: "none", stroke: NUIT, "stroke-width": 5 }, p);
      },
      p => { D.pastille(p, 4, 62, "+ 1 bar", AMBRE, 32); },
      p => { // réglette de températures
        D.el("rect", { x: 0, y: 28, width: 124, height: 46, rx: 6, fill: "#f6e08a", stroke: "#8a6d00", "stroke-width": 3 }, p);
        for (let i = 0; i < 8; i++) D.el("line", { x1: 10 + i * 14, y1: 28, x2: 10 + i * 14, y2: i % 2 ? 44 : 54, stroke: "#8a6d00", "stroke-width": 3 }, p);
        txt(p, 62, 68, "K", 28, NUIT, MID);
      },
      p => { for (let i = 0; i < 4; i++) rond(p, 18 + i * 38, 52, String(i + 1), 17); },
      p => { // calculatrice
        D.el("rect", { x: 28, y: 6, width: 68, height: 92, rx: 10, fill: "#3b4a5e" }, p);
        D.el("rect", { x: 36, y: 14, width: 52, height: 22, rx: 4, fill: "#c9e6c3" }, p);
        for (let i = 0; i < 9; i++) D.el("circle", { cx: 44 + (i % 3) * 18, cy: 52 + Math.floor(i / 3) * 16, r: 6, fill: "#e3e8ee" }, p);
      }];
    const lignes = TXT.map((q, k) => {
      const gl = D.el("g", {}, g), y = 172 + k * 117;
      const fond = D.el("rect", { x: 30, y: y, width: 930, height: 105, rx: 16, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, gl);
      const bad = D.el("circle", { cx: 84, cy: y + 52, r: 30, fill: CLAIR }, gl);
      txt(gl, 84, y + 66, String(k + 1), 40, "#fff", MID);
      icone[k](D.el("g", { transform: "translate(150 " + (y + 2) + ")" }, gl));
      txt(gl, 320, y + 46, q[0], 32, NUIT); txt(gl, 320, y + 86, q[1], 32, NUIT);
      return { g: gl, fond: fond, bad: bad };
    });
    return function (t) {
      lignes.forEach((l, k) => {
        const v = vu(c, t, k), cour = v * sans(c, t, k);
        op(l.g, 0.3 + 0.7 * v);
        l.bad.setAttribute("fill", cour > 0.5 ? D.ORANGE : v > 0.5 ? BLEU : CLAIR);
        l.fond.setAttribute("fill", cour > 0.5 ? "#fff1df" : "#fff"); l.fond.setAttribute("stroke", cour > 0.5 ? D.ORANGE : "rgba(27,58,99,.3)");
      });
      // un tour complet du cycle (5 → 12) sur toute la scène, comme la carte du coin
      const f = D.lisse(t / c.D);
      const temp = D.courbe([[0, 0.05], [0.2, 0.12], [0.29, 0.12], [0.43, 0.75], [0.6, 0.55], [0.857, 0.45], [1, 0.05]], f, true);
      const etat = f < 0.2 ? "bout" : f < 0.55 ? "vapeur" : f < 0.78 ? "bout" : f < 0.9 ? "liquide" : "bout";
      return { temp: temp, etat: etat, humeur: "sourire", diag: 5 + 7 * f, diag0: 5 };
    };
  };
})();
