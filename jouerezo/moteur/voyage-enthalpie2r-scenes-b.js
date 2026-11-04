/* =====================================================================
   voyage-enthalpie2r-scenes-b.js — « Voyage dans tous ses états », édition « niveau 2 : je réalise » (R32) :
   placer les points 1, 2, 3 · placer le point 4 · tracer le cycle
   ---------------------------------------------------------------------
   Scènes : points (3), point4 (4), trace (5). Même contrat que voyage-enthalpie2-scenes-c.js (Découverte) :
   VOYAGE_SCENES[id](g, c) → maj(t). Écran partagé : la scène tient dans x 20 → 965, y 150 → 760.
   Récit : donnees/voyage-enthalpie2r.js (l'ORDRE des phrases porte les gestes). Brief : voyage-enthalpie2r/BRIEF-SCENES.md.
   CHAQUE chapitre : la phrase 0 est la CONSIGNE : pendant toute cette phrase, seul le panneau « À vous » (D.avous) est
   visible (fondu 0,4 s) ; le décor (groupe `corps`) apparaît ensuite, phrase par phrase.
   AIDES LOCALES : fleche, suite, morceaux, rond, coche, bocal, thermo, croix, consigne.
   Écarts au brief : trace — le panneau « À vous » montre aussi les deux isobares (état de la feuille à ce moment) ;
   points / point4 — la carte « où je suis » suit la molécule (points 1, 2, 3 ; détendeur) au lieu de rester à 0.
   TOUT EST FONCTION DE t : aucune animation CSS, aucun état gardé.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const SANS = "Calibri, Arial, sans-serif";
  const BLEU = "#2f6fb8", AMBRE = "#e8820c", AMBRE_F = "#b35f00", ROUGE = "#c0392b", VIOLET = "#8e44ad", VERT = "#1e7e54", NUIT = "#10233c", GRIS = "#637285";
  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const pts = l => l.map(q => q[0].toFixed(1) + "," + q[1].toFixed(1)).join(" ");
  const txt = (p, x, y, s, taille, fill, at) => D.texte(p, x, y, s, Object.assign({ "font-size": taille, fill: fill || NUIT, "font-family": SANS, "font-weight": 700 }, at || {}));
  const MID = { "text-anchor": "middle" }, FIN = { "text-anchor": "end" };
  /* apparition : 0 avant la phrase k, 1 un instant après son début */
  const vu = (c, t, k, delai) => k >= c.T.length ? 0 : D.borne((t - c.T[k] - (delai || 0) + 0.15) / 0.45, 0, 1);
  /* avancement dans la phrase k (0 → 1), sur la fraction `part` de sa durée */
  const prog = (c, t, k, part, debut) => D.lisse((t - c.T[k] - (debut || 0)) / ((c.E[k] - c.T[k]) * (part || 1)));
  /* sortie en fondu quand la phrase suivante commence */
  const sans = (c, t, k) => k + 1 < c.T.length ? 1 - vu(c, t, k + 1) : 1;
  /* une valeur qui avance phrase par phrase : tab[k] = [a, b], null = on garde la dernière */
  function suite(c, t, tab) {
    let k = -1;
    for (let m = 0; m < tab.length; m++) if (tab[m] && t >= c.T[m]) k = m;
    if (k < 0) return tab.find(q => q)[0];
    const f = D.lisse((t - c.T[k]) / (c.E[k] - c.T[k])), e = tab[k];
    return D.lerp(e[0], e[1], f);
  }
  /* une valeur par morceaux de la phrase : tab = [[f0, f1, v0, v1], …] (f = 0 à 1 dans la phrase), linéaire, on garde la dernière */
  function morceaux(f, tab) {
    for (const [a, b, v0, v1] of tab) if (f <= b) return D.lerp(v0, v1, D.borne((f - a) / (b - a), 0, 1));
    return tab[tab.length - 1][3];
  }
  const fk = (c, t, k) => D.borne((t - c.T[k]) / (c.E[k] - c.T[k]), 0, 1);

  function fleche(p, x1, y1, x2, y2, coul, ep) {
    ep = ep || 8;
    const g = D.el("g", {}, p), a = Math.atan2(y2 - y1, x2 - x1), L = ep * 2.6, l = ep * 1.5, bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
    D.el("line", { x1: x1, y1: y1, x2: bx, y2: by, stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, g);
    D.el("polygon", { points: pts([[x2, y2], [bx - l * Math.sin(a), by + l * Math.cos(a)], [bx + l * Math.sin(a), by - l * Math.cos(a)]]), fill: coul }, g);
    return g;
  }
  function rond(parent, cx, cy, n, r) {
    D.el("circle", { cx: cx, cy: cy, r: r || 22, fill: "#fff", stroke: NUIT, "stroke-width": 3 }, parent);
    txt(parent, cx, cy + (r ? r * 0.36 : 10), n, r ? r * 1.7 : 30, NUIT, MID);
  }
  function coche(parent, x, y, coul) { // une coche dessinée (pas de glyphe)
    D.el("polyline", { points: pts([[x, y], [x + 9, y + 10], [x + 25, y - 12]]), fill: "none", stroke: coul, "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, parent);
  }
  /* la consigne : le panneau « À vous » seul pendant la phrase 0 (fondu 0,4 s), puis le décor (groupe `corps`) */
  function consigne(g, c, o) {
    const pan = D.avous(g, o), corps = D.el("g", {}, g);
    corps.maj = t => {
      op(pan, D.borne((t - c.T[0] + 0.2) / 0.4, 0, 1) * D.borne((c.T[1] + 0.2 - t) / 0.4, 0, 1));
      op(corps, (t - c.T[1] - 0.2) / 0.4);
    };
    return corps;
  }
  const PLEIN = [0.08, 0.05, 0.94, 0.95]; // le diagramme, sur le recto de la feuille

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
  /* thermomètre dessiné : tube de y0 (haut) à y1 (bas), bulbe dessous ; renvoie maj(f 0..1) */
  function thermo(p, x, y0, y1, coul) {
    D.el("rect", { x: x - 14, y: y0, width: 28, height: y1 - y0, rx: 14, fill: "#fff", stroke: NUIT, "stroke-width": 3 }, p);
    const col = D.el("rect", { x: x - 7, width: 14, fill: coul }, p);
    D.el("circle", { cx: x, cy: y1 + 22, r: 27, fill: coul, stroke: NUIT, "stroke-width": 3 }, p);
    return f => { const h = 14 + (y1 - y0 - 24) * D.borne(f, 0, 1); col.setAttribute("y", (y1 + 4 - h).toFixed(1)); col.setAttribute("height", (h + 4).toFixed(1)); };
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

  /* ======================================================================
     3 — PLACER LES POINTS 1, 2, 3 : le tableau des relevés, trois cartes, la tolérance de lecture
     ====================================================================== */
  S.points = function (g, c) {
    const corps = consigne(g, c, { mots: "Placez 1, 2, 3", face: "recto", isobares: true, surligne: PLEIN });
    // le tableau des relevés (en absolu), à gauche
    D.el("rect", { x: 30, y: 168, width: 365, height: 270, rx: 16, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 2 }, corps);
    txt(corps, 212, 204, "les relevés", 30, BLEU, MID);
    const LIG = [["BP", "8,1 bar abs"], ["HP", "24,8 bar abs"], ["aspiration", "7 °C"], ["refoulement", "95 °C"], ["sortie condenseur", "34 °C"]];
    const surl = LIG.map((l, i) => D.el("rect", { x: 40, y: 220 + i * 44, width: 345, height: 40, rx: 8, fill: "#fde6c8", opacity: 0 }, corps));
    LIG.forEach((l, i) => { txt(corps, 52, 250 + i * 44, l[0], 28, NUIT); txt(corps, 375, 250 + i * 44, l[1], 28, i < 2 ? (i ? D.ORANGE : BLEU) : NUIT, FIN); });
    const ACTIF = [[0, 2], [1, 3], [1, 4]]; // lignes du tableau utilisées par la phrase k - 1
    // les trois cartes
    const CX = 410, CW = 550, CH = 132, Y = [168, 310, 452];
    const cs = [0, 1, 2].map(i => {
      const gc = D.el("g", {}, corps);
      D.el("rect", { x: CX, y: Y[i], width: CW, height: CH, rx: 16, fill: "#fff", stroke: NUIT, "stroke-width": 3 }, gc);
      rond(gc, CX + 44, Y[i] + CH / 2, String(i + 1), 26);
      return gc;
    });
    const TEXTE = [["8,1 bar + 7 °C", "→ 524 kJ/kg", "hors de la cloche", BLEU], ["24,8 bar + 95 °C", "→ 591 kJ/kg", "hors de la cloche", D.ORANGE], ["24,8 bar + 34 °C", "→ 263 kJ/kg", "dans le liquide", D.ORANGE]];
    const noyaux = TEXTE.map((q, i) => {
      const n = D.el("g", {}, cs[i]);
      txt(n, CX + 90, Y[i] + 42, q[0], 32, q[3]);
      txt(n, CX + 90, Y[i] + 88, q[1], 40, AMBRE_F);
      coche(n, CX + 94, Y[i] + 114, VERT);
      txt(n, CX + 134, Y[i] + 122, q[2], 28, VERT);
      return n;
    });
    // k4 : la règle de lecture, une zone grise de part et d'autre de 524
    const reg = D.el("g", {}, corps), RX = 500;
    D.el("rect", { x: 30, y: 596, width: 930, height: 156, rx: 16, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 2 }, reg);
    D.el("rect", { x: RX - 60, y: 654, width: 120, height: 46, fill: "rgba(99,114,133,.25)" }, reg);
    D.el("line", { x1: 90, y1: 700, x2: 910, y2: 700, stroke: NUIT, "stroke-width": 4 }, reg);
    for (let x = 90; x <= 910; x += 20) D.el("line", { x1: x, y1: 700, x2: x, y2: 700 - (x % 100 === 90 ? 24 : 14), stroke: NUIT, "stroke-width": 3 }, reg);
    D.el("line", { x1: RX, y1: 648, x2: RX, y2: 708, stroke: ROUGE, "stroke-width": 6, "stroke-linecap": "round" }, reg);
    txt(reg, RX, 642, "524 kJ/kg", 36, ROUGE, MID);
    txt(reg, RX, 742, "une lecture à quelques kJ/kg près est normale", 32, NUIT, MID);

    return function (t) {
      corps.maj(t);
      surl.forEach((r, i) => { let v = 0; for (let k = 0; k < 3; k++) if (ACTIF[k].indexOf(i) >= 0) v = Math.max(v, vu(c, t, k + 1) * sans(c, t, k + 1)); op(r, v); });
      noyaux.forEach((n, i) => op(n, vu(c, t, i + 1)));
      cs.forEach((q, i) => op(q, 0.3 + 0.7 * vu(c, t, i + 1)));
      op(reg, vu(c, t, 4));
      const temp = t >= c.T[3] ? 0.45 : t >= c.T[2] ? 0.75 : 0.12;
      return { temp: temp, etat: t >= c.T[3] ? "liquide" : "vapeur", humeur: t >= c.T[2] && t < c.T[3] ? "chaud" : "sourire", carte: suite(c, t, [[2, 2], [2, 2], [2, 5], [5, 11.5], [11.5, 11.5]]) };
    };
  };

  /* ======================================================================
     4 — PLACER LE POINT 4 : sous la cloche, h4 = h3, le titre
     ====================================================================== */
  S.point4 = function (g, c) {
    const corps = consigne(g, c, { mots: "Placez le point 4", face: "recto", isobares: true, surligne: PLEIN });
    const CX = 410, CW = 550, YA = 190, HA = 112, YB = 420, HB = 160;
    // la carte du point 3 (rappel), la carte du point 4
    const cA = D.el("g", {}, corps);
    D.el("rect", { x: CX, y: YA, width: CW, height: HA, rx: 16, fill: "#fff", stroke: NUIT, "stroke-width": 3 }, cA);
    rond(cA, CX + 44, YA + HA / 2, "3", 26);
    txt(cA, CX + 90, YA + 46, "24,8 bar + 34 °C", 32, D.ORANGE);
    txt(cA, CX + 90, YA + 92, "263 kJ/kg", 38, AMBRE_F);
    const cB = D.el("g", {}, corps);
    D.el("rect", { x: CX, y: YB, width: CW, height: HB, rx: 16, fill: "#fff", stroke: NUIT, "stroke-width": 3 }, cB);
    rond(cB, CX + 44, YB + HB / 2, "4", 26);
    // k1 : le point d'interrogation barré
    const n1 = D.el("g", {}, cB);
    txt(n1, CX + 90, YB + 46, "8,1 bar + ?", 32, BLEU);
    txt(n1, CX + 90, YB + 92, "sous la cloche :", 30, ROUGE);
    txt(n1, CX + 90, YB + 128, "p et T ne suffisent pas", 30, ROUGE);
    txt(n1, CX + CW - 60, YB + 100, "?", 80, GRIS, MID);
    D.el("line", { x1: CX + CW - 100, y1: YB + 108, x2: CX + CW - 20, y2: YB + 36, stroke: ROUGE, "stroke-width": 8, "stroke-linecap": "round" }, n1);
    // k2 : h4 = h3
    const n2 = D.el("g", {}, cB);
    txt(n2, CX + 90, YB + 46, "8,1 bar, h4 = h3", 32, BLEU);
    txt(n2, CX + 90, YB + 96, "263 kJ/kg", 40, AMBRE_F);
    const ver = D.el("g", {}, corps);
    fleche(ver, CX + 60, YA + HA + 6, CX + 60, YB - 6, VIOLET, 9);
    txt(ver, CX + 100, YA + HA + 68, "h4 = h3 = 263 kJ/kg", 34, VIOLET);
    // k3 : le titre, et le bocal de 1 kg à 20 % de vapeur
    const titre = D.el("g", {}, cB);
    txt(titre, CX + 90, YB + 140, "titre 0,2 : 20 % de vapeur", 32, VERT);
    const bo = bocal(corps, 50, 300, 150, 340, 0.8, 4, 7), bg = D.el("g", {}, corps);
    txt(bg, 125, 270, "1 kg de fluide", 30, NUIT, MID);
    txt(bg, 218, 344, "200 g", 38, AMBRE_F); txt(bg, 218, 378, "de vapeur", 30, GRIS);
    txt(bg, 218, 540, "800 g", 38, BLEU); txt(bg, 218, 574, "de liquide", 30, GRIS);

    return function (t) {
      corps.maj(t);
      op(cA, 0.3 + 0.7 * vu(c, t, 1)); op(cB, 0.3 + 0.7 * vu(c, t, 1));
      op(n1, vu(c, t, 1) * sans(c, t, 1)); op(n2, vu(c, t, 2, 0.45)); op(ver, vu(c, t, 2)); op(titre, vu(c, t, 3));
      op(bo.g, vu(c, t, 3)); op(bg, vu(c, t, 3, 0.3)); bo.maj(t);
      const f2 = t >= c.T[2] ? prog(c, t, 2, 0.8) : 0, dans = t >= c.T[2] && t < c.T[3];
      return { temp: D.lerp(0.45, 0.05, f2), etat: dans || t < c.T[2] ? "liquide" : "bout", humeur: "sourire", carte: D.lerp(11.5, 14.4, f2) };
    };
  };

  /* ======================================================================
     5 — TRACER LE CYCLE : la croix et le diagramme avancent ensemble
     ====================================================================== */
  S.trace = function (g, c) {
    const corps = consigne(g, c, { mots: "Tracez le cycle", face: "recto", isobares: true, cycle: 0, surligne: PLEIN });
    const cir = croix(corps, 24, 190, 560);
    txt(corps, 371, 184, "condenseur", 28, BLEU, MID); txt(corps, 310, 565, "évaporateur", 28, BLEU, MID);
    txt(corps, 468, 382, "compresseur", 28, BLEU, FIN); txt(corps, 118, 382, "détendeur", 28, BLEU);
    // les quatre cartes de points, en petit (colonne de droite de la scène)
    const CARTES = [["BP, 7 °C", "524 kJ/kg"], ["HP, 95 °C", "591 kJ/kg"], ["HP, 34 °C", "263 kJ/kg"], ["BP, titre 0,2", "263 kJ/kg"]];
    const cartes = D.el("g", {}, corps);
    const cs = CARTES.map((q, i) => {
      const gc = D.el("g", {}, cartes), y = 188 + i * 92;
      D.el("rect", { x: 655, y: y, width: 305, height: 80, rx: 14, fill: "#fff", stroke: NUIT, "stroke-width": 3 }, gc);
      rond(gc, 696, y + 40, String(i + 1), 22);
      txt(gc, 734, y + 34, q[0], 28, i % 3 === 0 ? BLEU : D.ORANGE); txt(gc, 734, y + 68, q[1], 30, AMBRE_F);
      return gc;
    });
    const SEUIL = [0.24, 0.38, 0.8, 0]; // fraction de la phrase 1 où le cycle atteint le point i + 1
    // k1 : surchauffe au bout de l'évaporateur, désurchauffe au début du condenseur
    const sur = D.el("g", {}, corps), des = D.el("g", {}, corps);
    D.trait(sur, 492, 548, 468, 503, GRIS); txt(sur, 505, 578, "surchauffe", 30, BLEU, MID);
    const [dx, dy] = cir.ecran(...D.CIRCUIT_PTS[5]);
    D.trait(des, dx - 30, dy + 16, dx - 115, dy + 52, GRIS); txt(des, dx - 195, dy + 72, "désurchauffe", 30, ROUGE, MID);
    // k2 : deux thermomètres, idéal 79 °C et vrai 95 °C, et l'écart
    const th = D.el("g", {}, corps), Y0 = 250, Y1 = 600, niv = [];
    [["idéal", 79, BLEU, 720], ["vrai", 95, ROUGE, 880]].forEach(([nom, v, coul, x]) => {
      txt(th, x, 215, nom, 36, coul, MID);
      niv.push([thermo(th, x, Y0, Y1, coul), v / 100]);
      D.pastille(th, x, 712, v + " °C", coul, 30, "middle");
    });
    const yI = Y1 + 4 - (14 + (Y1 - Y0 - 24) * 0.79), yV = Y1 + 4 - (14 + (Y1 - Y0 - 24) * 0.95);
    const ec = D.el("g", {}, th);
    fleche(ec, 800, yI, 800, yV - 4, AMBRE, 7);
    txt(ec, 800, yV - 20, "écart", 30, AMBRE_F, MID);

    return function (t) {
      corps.maj(t);
      const f = fk(c, t, 1), k1 = t >= c.T[1] - 0.15 && t < c.T[2] - 0.15, k2 = t >= c.T[2] - 0.15;
      cs.forEach((q, i) => op(q, (1 - vu(c, t, 2)) * (k1 ? 0.45 + 0.55 * D.borne((f - SEUIL[i]) * 10, 0, 1) : 1)));
      const fen = (a, b) => D.borne((f - a) * 12, 0, 1) * (1 - D.borne((f - b) * 12, 0, 1)); // allumé entre f = a et f = b
      const al = [fen(-1, 0.24), fen(0.2, 0.38), fen(0.34, 0.8), fen(0.76, 1.2)];
      NOM_BR.forEach((n, i) => cir.allume(n, k1 ? al[i] : k2 ? 0.35 : 0));
      op(sur, vu(c, t, 1) * D.borne((f - 0.16) * 12, 0, 1) * sans(c, t, 2));
      op(des, vu(c, t, 1) * D.borne((f - 0.4) * 12, 0, 1) * sans(c, t, 2));
      op(th, vu(c, t, 2));
      const p = prog(c, t, 2, 0.7);
      niv.forEach(([maj, v]) => maj(v * p));
      const carte = t < c.T[1] ? 14 : morceaux(f, [[0, 0.24, 14, 17], [0.24, 0.38, 2, 5], [0.38, 0.8, 5, 11.5], [0.8, 1, 11.5, 14.4]]);
      const temp = t < c.T[1] ? 0.05 : morceaux(f, [[0, 0.24, 0.05, 0.12], [0.24, 0.38, 0.12, 0.75], [0.38, 0.8, 0.75, 0.45], [0.8, 1, 0.45, 0.05]]);
      const etat = t < c.T[1] ? "bout" : f < 0.12 ? "bout" : f < 0.5 ? "vapeur" : f < 0.72 ? "bout" : f < 0.9 ? "liquide" : "bout";
      const humeur = t >= c.T[2] || (t >= c.T[1] && f >= 0.24 && f < 0.45) ? "chaud" : t >= c.T[1] && f >= 0.8 ? "froid" : "sourire";
      cir.mila(carte, t, { temp: temp, etat: etat, humeur: humeur });
      const r = { temp: temp, etat: etat, humeur: humeur, carte: carte, diag0: 5 };
      r.diag = t < c.T[1] ? null : t >= c.T[2] ? 12 : morceaux(f, [[0, 0.24, 5, 7], [0.24, 0.38, 7, 8], [0.38, 0.8, 8, 11], [0.8, 1, 11, 12]]);
      return r;
    };
  };
})();
