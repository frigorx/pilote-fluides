/* =====================================================================
   voyage-enthalpie2r-scenes-c.js — « Voyage dans tous ses états », édition « le diagramme enthalpique, niveau 2 : je réalise » (R32)
   les calculs, le débit et les puissances, la fin
   ---------------------------------------------------------------------
   Scènes : calculs (6), debit (4), fin (3). Même contrat que voyage-enthalpie2-scenes-c.js :
   VOYAGE_SCENES[id](g, c) → maj(t). Écran partagé : la scène tient dans x 20 → 965, y 150 → 760.
   Récit : donnees/voyage-enthalpie2r.js (l'ORDRE des phrases porte les gestes). Brief : voyage-enthalpie2r/BRIEF-SCENES.md.
   CONSIGNE : calculs et debit commencent par la phrase de consigne (k0) : pendant toute cette phrase on ne voit QUE le panneau
   « À vous » (D.avous, fondu 0,4 s en entrée et en sortie) ; la correction se construit ensuite, phrase par phrase.
   AIDES LOCALES : fleche(), coche(), rangee() (une ligne de formule : textes et pastilles mesurés l'un après l'autre),
   clim() (unité intérieure murale + air frais, copie de celle de l'intro de la scène a), mini-cycle R134a (fin).
   Retour : calculs, debit et fin rendent { diag: 12, diag0: 5 } (trace orange pleine).
   TOUT EST FONCTION DE t : aucune animation CSS, aucun état gardé.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const SANS = "Calibri, Arial, sans-serif";
  const BLEU = "#2f6fb8", AMBRE = "#e8820c", AMBRE_F = "#b35f00", ROUGE = "#c0392b", VERT = "#1e7e54", NUIT = "#10233c", GRIS = "#637285";
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
  /* le panneau « À vous » : seul à l'écran pendant la phrase de consigne k0, fondu de 0,4 s de chaque côté */
  const consigne = (c, t) => D.fenetre(t, c.T[0], c.T[1], 0.4);

  function fleche(p, x1, y1, x2, y2, coul, ep) {
    ep = ep || 8;
    const g = D.el("g", {}, p), a = Math.atan2(y2 - y1, x2 - x1), L = ep * 2.6, l = ep * 1.5, bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
    D.el("line", { x1: x1, y1: y1, x2: bx, y2: by, stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, g);
    D.el("polygon", { points: pts([[x2, y2], [bx - l * Math.sin(a), by + l * Math.cos(a)], [bx + l * Math.sin(a), by - l * Math.cos(a)]]), fill: coul }, g);
    return g;
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
  /* une unité intérieure murale (blanche) et son air frais qui descend : { g, maj(t, op) } ; (x, y) = coin haut gauche, w = largeur */
  function clim(parent, x, y, w) {
    const h = w * 0.42, g = D.el("g", {}, parent);
    D.el("rect", { x: x, y: y, width: w, height: h, rx: h * 0.22, fill: "#fff", stroke: NUIT, "stroke-width": 5 }, g);
    for (let i = 0; i < 3; i++) D.el("line", { x1: x + w * 0.1, y1: y + h * (0.16 + i * 0.1), x2: x + w * 0.6, y2: y + h * (0.16 + i * 0.1), stroke: "#cfd8e2", "stroke-width": 4, "stroke-linecap": "round" }, g);
    D.el("rect", { x: x + w * 0.06, y: y + h * 0.66, width: w * 0.88, height: h * 0.2, rx: h * 0.08, fill: "#dfe6ee", stroke: NUIT, "stroke-width": 3 }, g);
    D.el("circle", { cx: x + w * 0.84, cy: y + h * 0.28, r: h * 0.06, fill: VERT }, g);
    const ch = [0, 1, 2].map(i => ({ c: D.chevron(g), x: x + w * (0.27 + i * 0.23), ph: i * 0.33 }));
    return { g: g, maj: function (t, o) {
      ch.forEach(q => { const f = D.frac(t * 0.8 + q.ph); q.c(q.x, y + h + 18 + 34 * f, 0, BLEU, Math.sin(Math.PI * f) * o); });
    } };
  }

  /* ======================================================================
     calculs — trois barres de Δh à l'échelle, les COP, le taux de compression
     ====================================================================== */
  S.calculs = function (g, c) {
    const pan = D.avous(g, { mots: "Faites les calculs", face: "verso", rempli: 5, surligne: [0.05, 0.515, 0.95, 0.965] });
    const X0 = 50, SC = 2.6, LA = 261 * SC, LB = 67 * SC, LC = 328 * SC, H = 50, YA = 215, YC = 360;
    const lA = txt(g, X0, YA - 12, "évaporateur", 28, BLEU), lB = txt(g, X0 + LA, YA - 12, "compresseur", 28, AMBRE_F);
    const rA = D.el("rect", { x: X0, y: YA, width: 0, height: H, rx: 6, fill: BLEU }, g), tA = txt(g, X0 + 18, YA + 36, "524 − 263 = 261 kJ/kg", 32, "#fff");
    const rB = D.el("rect", { x: X0 + LA, y: YA, width: 0, height: H, rx: 6, fill: AMBRE }, g), tB = txt(g, X0 + LA + LB, YA + H + 38, "591 − 524 = 67 kJ/kg", 32, AMBRE_F, FIN);
    const lC = txt(g, X0, YC - 12, "condenseur", 28, ROUGE);
    const rC = D.el("rect", { x: X0, y: YC, width: 0, height: H, rx: 6, fill: ROUGE }, g), tC = txt(g, X0 + 18, YC + 36, "591 − 263 = 328 kJ/kg", 32, "#fff");
    const nC = txt(g, X0, YC + H + 38, "328 = 261 + 67", 30, GRIS);
    // k4 : les deux COP ; k5 : le taux de compression
    const R = [545, 628, 712];
    const r1 = rangee(g, 40, R[0], [["COP froid =", NUIT], ["261", BLEU, "p"], ["÷", NUIT], ["67", AMBRE, "p"], ["≈ 3,9", ROUGE]], 38);
    const r2 = rangee(g, 40, R[1], [["COP chaud =", NUIT], ["328", ROUGE, "p"], ["÷", NUIT], ["67", AMBRE, "p"], ["≈ 4,9", ROUGE]], 38);
    const mais = D.el("g", {}, g); // la petite maison : le COP chaud, c'est la chaleur qu'on garde
    D.el("polygon", { points: pts([[815, 594], [865, 556], [915, 594]]), fill: ROUGE }, mais);
    D.el("rect", { x: 827, y: 594, width: 76, height: 44, fill: "#fde6c8", stroke: ROUGE, "stroke-width": 4 }, mais);
    D.el("rect", { x: 856, y: 608, width: 20, height: 30, fill: ROUGE }, mais);
    const r3 = rangee(g, 40, R[2], [["taux =", NUIT], ["24,8", D.ORANGE, "p"], ["÷", NUIT], ["8,1", BLEU, "p"], ["≈ 3,1", ROUGE]], 38);
    txt(r3, r3.fin + 28, R[2], "pressions absolues", 30, GRIS);

    return function (t) {
      op(pan, consigne(c, t));
      const a = prog(c, t, 1, 0.7), b = prog(c, t, 2, 0.7), k = prog(c, t, 3, 0.7);
      rA.setAttribute("width", (LA * a).toFixed(1)); op(tA, D.borne((a - 0.85) * 7, 0, 1)); op(lA, vu(c, t, 1));
      rB.setAttribute("width", (LB * b).toFixed(1)); op(tB, D.borne((b - 0.85) * 7, 0, 1)); op(lB, vu(c, t, 2));
      rC.setAttribute("width", (LC * k).toFixed(1)); op(tC, D.borne((k - 0.85) * 7, 0, 1)); op(lC, vu(c, t, 3)); op(nC, D.borne((k - 0.9) * 10, 0, 1));
      op(r1, vu(c, t, 4)); op(r2, vu(c, t, 4, 0.5)); op(mais, vu(c, t, 4, 0.9)); op(r3, vu(c, t, 5));
      return { temp: 0.12, etat: "vapeur", humeur: "sourire", diag: 12, diag0: 5 };
    };
  };

  /* ======================================================================
     debit — du kilo à l'installation : le débit massique et les deux puissances
     ====================================================================== */
  S.debit = function (g, c) {
    const pan = D.avous(g, { mots: "Calculez le débit", face: "verso", rempli: 6, surligne: [0.05, 0.515, 0.95, 0.965] });
    // k1 : le climatiseur et ses 3,5 kW de froid, le compteur, les sacs de 1 kg dans le tube
    const cl = D.el("g", {}, g), air = clim(cl, 30, 178, 215);
    const kw = D.pastille(g, 262, 240, "3,5 kW de froid", BLEU, 34);
    const cp = D.el("g", {}, g);
    D.el("rect", { x: 580, y: 180, width: 380, height: 156, rx: 16, fill: NUIT }, cp);
    const l1 = txt(cp, 598, 226, "3,5 ÷ 261", 38, "#9fd0ff"), l2 = txt(cp, 598, 276, "0,013 kg par seconde", 32, "#c9e6c3"), l3 = txt(cp, 598, 320, "48 kg par heure", 32, "#c9e6c3");
    const tube = D.el("g", {}, g);
    D.tube(tube, 30, 352, 925, 64, "cuivre", false);
    const sacs = [0, 1, 2, 3, 4, 5].map(() => {
      const s = D.el("g", {}, tube);
      D.el("rect", { x: 0, y: 0, width: 72, height: 38, rx: 9, fill: "#f4d9a8", stroke: "#8a4a24", "stroke-width": 3 }, s);
      txt(s, 36, 28, "1 kg", 28, NUIT, MID);
      return s;
    });
    // k2 : au compresseur ; k3 : au condenseur, puis les deux barres bout à bout
    const r2 = D.el("g", {}, g), r3 = D.el("g", {}, g), br = D.el("g", {}, g);
    D.image(r2, "compresseur", 30, 448, 76, 58);
    rangee(r2, 124, 490, [["au compresseur :", GRIS, "", 30], ["0,013 × 67 ≈ 0,9 kW", AMBRE_F, "", 38]], 38, 16);
    D.image(r3, "condenseur", 30, 524, 76, 58);
    rangee(r3, 124, 566, [["au condenseur :", GRIS, "", 30], ["0,013 × 328 ≈ 4,4 kW", ROUGE, "", 38]], 38, 16);
    const E = 190, BY = 612;
    D.el("rect", { x: 40, y: BY, width: 3.5 * E, height: 48, rx: 6, fill: BLEU }, br); D.el("rect", { x: 40 + 3.5 * E, y: BY, width: 0.9 * E, height: 48, rx: 6, fill: AMBRE }, br);
    txt(br, 58, BY + 35, "3,5 kW de froid", 30, "#fff"); txt(br, 40 + 3.5 * E + 85.5, BY + 35, "0,9 kW", 30, NUIT, MID);
    txt(br, 40, BY + 108, "4,4 kW = 3,5 kW + 0,9 kW", 40, ROUGE);

    return function (t) {
      op(pan, consigne(c, t));
      const v1 = vu(c, t, 1);
      op(cl, v1); op(kw, vu(c, t, 1, 0.2)); air.maj(t, v1);
      op(cp, v1); op(l1, v1); op(l2, vu(c, t, 1, 0.9)); op(l3, vu(c, t, 1, 2.2)); op(tube, v1);
      sacs.forEach((s, i) => { const x = 40 + ((i * 140 + 140 * t) % 840); s.setAttribute("transform", "translate(" + x.toFixed(1) + " 365)"); op(s, D.borne(Math.min(x - 40, 880 - x) / 40, 0, 1)); });
      op(r2, vu(c, t, 2)); op(r3, vu(c, t, 3)); op(br, vu(c, t, 3, 0.5));
      return { temp: 0.12, etat: "vapeur", humeur: "sourire", diag: 12, diag0: 5 };
    };
  };

  /* ======================================================================
     fin — la feuille complète, le même travail pour un autre fluide, la prochaine installation
     ====================================================================== */
  // le cycle R134a du film Découverte (constantes copiées de donnees/voyage-enthalpie2-diagramme.js) : p bar abs, h kJ/kg
  const CLOCHE = [[1, 165.4, 382.6], [1.37, 174.6, 387], [1.877, 184.5, 391.7], [2.572, 195.3, 396.5], [3.523, 207, 401.6], [4.827, 220, 406.9], [6.613, 234.3, 412.2],
    [9.06, 250.1, 417.5], [12.413, 268, 422.6], [17.006, 288.3, 426.8], [23.299, 311.9, 429], [31.92, 341.2, 425.9], [39.984, 375.4, 405.5]];
  const SOMMET = [40.593, 389.7];
  const CHEMIN = [[398.6, 2], [446.4, 10.2], [419.5, 10.2], [256.6, 10.2], [249, 10.2], [249, 2], [392.6, 2], [398.6, 2]];

  S.fin = function (g, c) {
    // la feuille R32 : dessinée une fois à l'origine, posée et réduite par transform
    const verso = D.el("g", {}, g);
    D.feuilleA4(verso, 0, 0, 500, { face: "verso", rempli: 5 });
    const feuille = D.el("g", {}, g);
    D.feuilleA4(feuille, 0, 0, 500, { face: "recto", cycle: 1, isobares: true });
    // k0 : la coche verte
    const ok = D.el("g", {}, g);
    D.el("circle", { cx: 850, cy: 400, r: 78, fill: VERT }, ok);
    D.el("polyline", { points: pts([[812, 402], [840, 432], [892, 366]]), fill: "none", stroke: "#fff", "stroke-width": 18, "stroke-linecap": "round", "stroke-linejoin": "round" }, ok);
    txt(ok, 850, 536, "complète", 44, VERT, MID);
    // k1 : le mini-cycle R134a, sans aucun chiffre
    const mini = D.el("g", {}, g), BX = 350, BY = 250, BW = 610, BH = 390, x0 = BX + 24, x1 = BX + BW - 24, y0 = BY + 24, y1 = BY + BH - 24;
    const X = h => x0 + (h - 150) / 330 * (x1 - x0), Y = p => y1 - Math.log(p) / Math.log(45) * (y1 - y0), P = r => X(r[0]).toFixed(1) + "," + Y(r[1]).toFixed(1);
    D.el("rect", { x: BX, y: BY, width: BW, height: BH, rx: 18, fill: "#fffdf8", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, mini);
    D.el("path", { d: "M " + x0 + " " + (y1 + 4) + " V " + (y0 - 4) + " m -8 12 l 8 -12 l 8 12", fill: "none", stroke: NUIT, "stroke-width": 3 }, mini);
    D.el("path", { d: "M " + (x0 - 4) + " " + y1 + " H " + (x1 + 4) + " m -12 -8 l 12 8 l -12 8", fill: "none", stroke: NUIT, "stroke-width": 3 }, mini);
    const cl = CLOCHE.map(r => [r[1], r[0]]).concat([[SOMMET[1], SOMMET[0]]], CLOCHE.slice().reverse().map(r => [r[2], r[0]]));
    D.el("polygon", { points: cl.map(P).join(" "), fill: "rgba(47,111,184,.14)", stroke: BLEU, "stroke-width": 4, "stroke-linejoin": "round" }, mini);
    const cyc = D.el("polyline", { points: CHEMIN.map(P).join(" "), pathLength: 1, fill: "none", stroke: D.ORANGE, "stroke-width": 7, "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-dasharray": "1 1", "stroke-dashoffset": 1 }, mini);
    CHEMIN.slice(0, 5).forEach(r => D.el("circle", { cx: X(r[0]), cy: Y(r[1]), r: 7, fill: NUIT }, mini));
    txt(mini, x0 + 18, y0 + 30, "p", 34, NUIT); txt(mini, x1 - 28, y1 - 14, "h", 34, NUIT);
    const p134 = D.pastille(g, BX + BW / 2, 225, "R134a", D.BLEU, 44, "middle"), p32 = D.pastille(g, 30 + 0.8 * 354 / 2, 225, "R32", D.BLEU, 44, "middle");
    const meme = txt(g, BX + BW / 2, 706, "même méthode, autre fluide", 42, D.BLEU, MID);
    // k2 : la flèche vers la prochaine installation
    const suite = D.el("g", {}, g), ins = clim(suite, 600, 330, 330);
    fleche(suite, 350, 440, 560, 440, D.ORANGE, 10);
    txt(suite, 765, 640, "votre prochaine", 44, D.BLEU, MID); txt(suite, 765, 692, "installation", 44, D.BLEU, MID);

    return function (t) {
      const p = D.lisse((t - c.T[1] + 0.1) / 0.8); // 0 : feuille grande au milieu ; 1 : feuille réduite à gauche
      feuille.setAttribute("transform", "translate(" + D.lerp(290, 30, p).toFixed(1) + " " + D.lerp(200, 250, p).toFixed(1) + ") scale(" + D.lerp(1, 0.8, p).toFixed(3) + ")");
      verso.setAttribute("transform", "translate(" + D.lerp(380, 30, p).toFixed(1) + " " + D.lerp(178, 250, p).toFixed(1) + ") scale(" + D.lerp(1, 0.8, p).toFixed(3) + ")");
      op(verso, vu(c, t, 0) * (1 - p)); op(feuille, 1);
      op(ok, vu(c, t, 0, 0.3) * (1 - p));
      const k1 = vu(c, t, 1) * sans(c, t, 1);
      op(mini, k1); op(p134, k1); op(p32, k1); op(meme, vu(c, t, 1, 0.8) * sans(c, t, 1));
      cyc.setAttribute("stroke-dashoffset", (1 - prog(c, t, 1, 0.7, 0.3)).toFixed(3));
      const k2 = vu(c, t, 2);
      op(suite, k2); ins.maj(t, k2);
      return { temp: 0.05, etat: "bout", humeur: "sourire", diag: 12, diag0: 5 };
    };
  };
})();
