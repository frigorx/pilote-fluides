/* =====================================================================
   voyage-centrale-scenes-c.js — « les centrales frigorifiques » : le
   condenseur sur le toit, la bouteille et la ligne liquide, ce que l'on
   surveille, la centrale en un tour
   ---------------------------------------------------------------------
   Même contrat que voyage-scenes-a.js : VOYAGE_SCENES[id](g, c) → maj(t).
   Brief : voyage-centrale/BRIEF-SCENES.md (section C). Récit :
   donnees/voyage-centrale.js (l'ORDRE des phrases porte les gestes).
   ÉCRAN PARTAGÉ : la scène tient dans x 20 → 965, y 150 → 760 (la colonne
   de droite est prise par la carte et le diagramme enthalpique).
   LE TOIT : toit() dessine le condenseur à air une seule fois, pour
   `condenseur` et pour `resume` (même dessin, même couleurs).
   MÉLANGE : les molécules des autres fluides sont violette, verte, rose ;
   celles de la famille de l'héroïne gardent la couleur normale.
   TOUT EST FONCTION DE t : aucun état gardé d'une image à l'autre.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const TOUR = 2 * Math.PI;
  const BLEU = D.BLEU, ORANGE = D.ORANGE, VERT = "#1e7e54", ROUGE = "#c0392b", FROID = "#2f6fb8", CLAIR = "#f4f8fc";
  const VIOLET = "#8e44ad", VERTMOL = "#1e7e54", ROSE = "#c2185b";
  const SANS = "Calibri, Arial, sans-serif", TITRE = "Trebuchet MS, Arial, sans-serif";
  const plan = (maj, g) => { if (maj.g.parentNode !== g) g.appendChild(maj.g); };
  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const rect = (p, x, y, w, h, at) => D.el("rect", Object.assign({ x: x, y: y, width: w, height: h }, at || {}), p);
  const pastilles = (g, x, ancre, liste) => liste.map(([s, coul, a, b]) => ({ g: D.pastille(g, x, 746, s, coul, 30, ancre), a: a, b: b }));
  const montrer = (liste, c, t) => liste.forEach(p => op(p.g, D.fenetre(t, c.T[p.a], p.b + 1 < c.T.length ? c.T[p.b + 1] - 0.1 : c.D)));
  /* un phrase k à la fois : 1 quand t est dans [T[a], T[b+1]) (b+1 absent : fin de scène) */
  const dans = (c, t, a, b) => D.fenetre(t, c.T[a] - 0.05, b + 1 < c.T.length ? c.T[b + 1] - 0.05 : c.D + 1, 0.35);
  /* durée cumulée pendant laquelle un moteur a tourné : [[début, fin], …] (intégrale, jamais t × vitesse) */
  const tourne = (t, iv) => iv.reduce((a, [d, f]) => a + D.borne(t - d, 0, f - d), 0);

  /* molécule colorée (famille de l'héroïne : D.mol ; les autres fluides du mélange : couleur fixe) */
  const molecule = (parent, couleur) => {
    const u = D.el("use", { href: "#vm-mol", fill: couleur || "#999" }, parent);
    return (x, y, op, s, fill) => {
      u.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") scale(" + (s || 1) + ")");
      u.setAttribute("opacity", op === undefined ? 1 : op.toFixed(2));
      if (fill) u.setAttribute("fill", fill);
    };
  };
  /* un thermomètre de verre (sans chiffres) : le bulbe en bas, n = hauteur de la colonne 0..1 */
  function thermometre(parent, x, yBas, h, coul) {
    const g = D.el("g", {}, parent);
    rect(g, x - 11, yBas - h, 22, h, { rx: 11, fill: "#fff", stroke: BLEU, "stroke-width": 3.5 });
    for (let i = 1; i <= 4; i++) { const y = yBas - 22 - i * (h - 44) / 5; D.el("line", { x1: x + 11, x2: x + 24, y1: y, y2: y, stroke: BLEU, "stroke-width": 3 }, g); }
    const col = rect(g, x - 5.5, 0, 11, 0, { rx: 5, fill: coul });
    D.el("circle", { cx: x, cy: yBas, r: 18, fill: coul, stroke: BLEU, "stroke-width": 3.5 }, g);
    const maj = n => { const hh = 8 + D.borne(n, 0, 1) * (h - 36); col.setAttribute("y", (yBas - hh).toFixed(1)); col.setAttribute("height", hh.toFixed(1)); };
    maj.g = g;
    return maj;
  }
  /* un manomètre : cadran, graduations sans chiffres, aiguille (angle en degrés, 0 = vers le haut) */
  function manometre(parent, x, y, r) {
    const g = D.el("g", {}, parent);
    D.el("circle", { cx: x, cy: y, r: r, fill: "#fff", stroke: BLEU, "stroke-width": 5 }, g);
    for (let i = 0; i <= 8; i++) {
      const a = (-120 + i * 30) * Math.PI / 180;
      D.el("line", { x1: x + Math.sin(a) * r * 0.72, y1: y - Math.cos(a) * r * 0.72, x2: x + Math.sin(a) * r * 0.9, y2: y - Math.cos(a) * r * 0.9, stroke: BLEU, "stroke-width": 3 }, g);
    }
    const aig = D.el("line", { x1: x, y1: y, x2: x, y2: y - r * 0.68, stroke: ROUGE, "stroke-width": 5, "stroke-linecap": "round" }, g);
    D.el("circle", { cx: x, cy: y, r: 6, fill: BLEU }, g);
    const maj = a => aig.setAttribute("transform", "rotate(" + a.toFixed(1) + " " + x + " " + y + ")");
    maj.g = g;
    return maj;
  }
  /* le flocon : trois traits croisés */
  const flocon = (parent) => D.el("path", { d: "M -9 0 H 9 M 0 -9 V 9 M -6.5 -6.5 L 6.5 6.5 M -6.5 6.5 L 6.5 -6.5", stroke: "#fff", "stroke-width": 3.2, "stroke-linecap": "round", fill: "none" }, parent);

  /* ---------- le toit : le condenseur à air, vu de trois quarts ----------
     repère local : u vers la droite, v vers le bas ; (0, 0) = milieu du bas de la face avant ; le toit est à v = 70.
     rend { g, pt(u, v) → [x, y] dans la scène, ventilos[i](angle), x, tube : { x0, x1, yh, yb } (l'intérieur du tube coupé) } */
  function toit(parent, cx, yr, k) {
    const g = D.el("g", { transform: "translate(" + cx + " " + yr + ") scale(" + k + ") translate(0 -70)" }, parent);
    const pt = (u, v) => [cx + k * u, yr + k * (v - 70)];
    [-272, 250].forEach(u => rect(g, u, 0, 22, 70, { fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }));
    D.el("polygon", { points: "300,-150 340,-215 340,-65 300,0", fill: "#8d99a6", stroke: "#4e5a66", "stroke-width": 3, "stroke-linejoin": "round" }, g);
    rect(g, -300, -150, 600, 150, { fill: "#c4ced9", stroke: "#4e5a66", "stroke-width": 3 });
    let d = "";
    for (let u = -292; u < 300; u += 9) d += "M " + u + " -146 V -4 ";
    D.el("path", { d: d, stroke: "#8693a1", "stroke-width": 3 }, g);
    D.el("polygon", { points: "-300,-150 300,-150 340,-215 -260,-215", fill: "#e4eaf0", stroke: "#4e5a66", "stroke-width": 3, "stroke-linejoin": "round" }, g);
    const ventilos = [-180, 20, 220].map(u => {
      D.el("ellipse", { cx: u, cy: -170, rx: 76, ry: 30, fill: "#4e5a66" }, g);
      rect(g, u - 76, -182, 152, 12, { fill: "#4e5a66" });
      D.el("ellipse", { cx: u, cy: -182, rx: 76, ry: 30, fill: "#9aa7b5", stroke: "#4e5a66", "stroke-width": 3 }, g);
      const f = D.el("g", { transform: "translate(" + u + " -182) scale(1 0.4)" }, g);
      return D.ventilateur(f, 0, 0, 68);
    });
    // le tube de la batterie, coupé dans sa longueur : paroi de cuivre, intérieur clair
    rect(g, -300, -105, 600, 60, { fill: "url(#vm-cuivre)" });
    rect(g, -300, -95, 600, 40, { fill: CLAIR });
    return { g: g, pt: pt, ventilos: ventilos, x: ventilos.map((f, i) => pt([-180, 20, 220][i], -182)[0]), y: pt(0, -182)[1],
      tube: { x0: pt(-300, 0)[0], x1: pt(300, 0)[0], yh: pt(0, -95)[1], yb: pt(0, -55)[1] } };
  }

  /* ---------- le fluide d'un tube de condenseur : vapeur à droite, gouttes, nappe qui monte, liquide seul à gauche ----------
     o : { xe, xs (entrée à droite, sortie à gauche), yh, yb, dew, bulle (fractions de la longueur), nb, graine, rm (taille des molécules),
           temp(p), gouttes (nombre) } ; les molécules de la famille de l'héroïne se condensent les premières
     rend { fond (groupe où poser l'héroïne), surface(x, t), xDe(p), pDe(x), niveau(x), maj(t) } */
  function fluideTube(parent, o) {
    const L = o.xe - o.xs, xDe = p => o.xe - p * L, pDe = x => (o.xe - x) / L, rm = o.rm || 1;
    const niveau = x => { const p = pDe(x); return p < o.dew ? 0 : p >= o.bulle ? 1 : 0.06 + 0.91 * D.lisse((p - o.dew) / (o.bulle - o.dew)); };
    const vap = D.el("g", {}, parent), fond = D.el("g", {}, parent);
    const liq = D.liquide(parent, { x0: o.xs, x1: o.xe, yh: o.yh, yb: o.yb, niveau: niveau, couleur: x => D.couleur(o.temp(pDe(x)), false), pas: 14 });
    const chute = o.gouttes ? D.bulles(D.el("g", {}, parent), o.gouttes, o.graine + 1, true) : null;
    const dessus = D.el("g", {}, parent);
    const r = D.alea(o.graine), M = [];
    const COULS = [null, VIOLET, VERTMOL, ROSE], CONDENSE = [[0.1, 0.45], [0.7, 1], [0.7, 1], [0.4, 0.75]];
    for (let i = 0; i < o.nb; i++) {
      const cl = i % 4, [a, b] = CONDENSE[cl];
      M.push({ s: r(), ry: r(), ph: r() * TOUR, cl: cl, fin: o.dew + (o.bulle - o.dew) * (a + (b - a) * r()), maj: molecule(vap, COULS[cl]) });
    }
    return { fond: fond, dessus: dessus, surface: liq.surface, xDe: xDe, pDe: pDe, niveau: niveau, liq: liq,
      maj: function (t) {
        liq.maj(t);
        if (chute) chute(t, q => { const x = xDe(o.dew + 0.04 + q * (o.bulle - o.dew) * 0.9); return [x, o.yh + 4, liq.surface(x, t) + 2, niveau(x) < 0.95 ? 1 : 0, D.couleur(o.temp(pDe(x)), false)]; });
        M.forEach(m => {
          const p = D.frac(m.s + t / 13) * (o.bulle + 0.03), x = xDe(p), libre = liq.surface(x, t) - o.yh;
          const y = o.yh + 13 * rm + m.ry * Math.max(0, libre - 26 * rm) + Math.sin(t * 3 + m.ph) * 3 * rm;
          const vis = D.borne(p / 0.03, 0, 1) * D.borne((m.fin - p) / 0.03, 0, 1) * D.borne((libre - 16 * rm) / (10 * rm), 0, 1);
          m.maj(x, y, vis, 0.62 * rm, m.cl ? undefined : D.couleur(o.temp(p), true));
        });
      } };
  }

  /* ================= 9 · le condenseur sur le toit ================= */
  S.condenseur = function (g, c) {
    const CX = 372, YR = 690, K = 0.95, YT = 552, XD = 935, XL = 62; // le toit (cx, niveau du toit, échelle), la conduite de refoulement (hauteur, x)
    const HP = ORANGE;
    // ---- le ciel, les nuages, la neige (l'hiver arrive à la phrase 6) ----
    const ov = D.el("g", {}, g);
    rect(ov, 30, 158, 930, 532, { rx: 18, fill: "#dcebf8" });
    const hiver = rect(ov, 30, 158, 930, 532, { rx: 18, fill: "#b4bfcb", opacity: 0 });
    [[120, 220, 1], [610, 200, 0.8]].forEach(([x, y, s]) => [[0, 0, 50, 24], [44, -12, 44, 26], [80, 4, 46, 22], [38, 10, 70, 20]].forEach(([dx, dy, rx, ry]) =>
      D.el("ellipse", { cx: x + dx * s, cy: y + dy * s, rx: rx * s, ry: ry * s, fill: "#fff", opacity: 0.85 }, ov)));
    const neige = D.el("g", {}, ov), rn = D.alea(77), FL = [];
    for (let i = 0; i < 26; i++) FL.push({ x: 100 + rn() * 570, y: rn() * 520, v: 30 + rn() * 40, ph: rn() * TOUR, s: 0.7 + rn() * 0.8, e: flocon(neige) });
    // ---- le toit (dalle), les conduites ----
    rect(ov, 30, 690, 930, 22, { rx: 4, fill: "#7d8794" });
    rect(ov, 30, 690, 930, 5, { fill: "#a7b1bd" });
    const cuivre = (x, y, w, h, v) => rect(ov, x, y, w, h, { rx: 3, fill: "url(#vm-cuivre" + (v ? "-h" : "") + ")" });
    cuivre(XD - 9, YT - 9, 18, 690 - YT + 9, true); // refoulement : monte du local technique
    const unite = toit(ov, CX, YR, K);
    cuivre(unite.tube.x1, YT - 9, XD - unite.tube.x1 + 9, 18);
    cuivre(XL - 9, YT - 9, unite.tube.x0 - XL + 9 + 4, 18); cuivre(XL - 9, YT - 9, 18, 690 - YT + 9, true);
    rect(ov, unite.tube.x1 + 2, YT - 5, XD - 9 - unite.tube.x1 - 2, 10, { fill: CLAIR });
    rect(ov, XL, YT - 5, unite.tube.x0 - XL, 10, { fill: CLAIR }); rect(ov, XL - 5, YT - 5, 10, 690 - YT + 5, { fill: CLAIR });
    rect(ov, XD - 5, YT - 5, 10, 690 - YT + 5, { fill: CLAIR });
    // le fluide des conduites : liquide qui descend à gauche
    rect(ov, XL - 4, YT - 4, unite.tube.x0 - XL + 4, 8, { fill: D.couleur(0.45, false), opacity: 0.9 });
    rect(ov, XL - 4, YT - 4, 8, 690 - YT + 4, { fill: D.couleur(0.45, false), opacity: 0.9 });
    const tOv = fluideTube(ov, { xe: unite.tube.x1, xs: unite.tube.x0, yh: unite.tube.yh, yb: unite.tube.yb, dew: 0.3, bulle: 0.95, nb: 22, graine: 5, rm: 0.62, temp: p => D.lerp(0.62, 0.5, D.borne(p / 0.3, 0, 1)) });
    const air = D.el("g", {}, ov);
    // ---- l'air : frais en bas, chaud au-dessus des ventilateurs, flèches de chaleur dans la batterie ----
    const PL = [];
    unite.x.forEach((fx, i) => [0, 1, 2].forEach(j => PL.push({ i: i, f: j / 3, x: fx, maj: D.chevron(air) })));
    const FRAIS = [190, 270, 350, 430, 510].map((x, i) => ({ x: x, f: i / 5, maj: D.chevron(air) }));
    const CH = [];
    for (let i = 0; i < 6; i++) { const x = unite.pt(-250 + i * 100, 0)[0]; CH.push({ x: x, f: i / 6, haut: D.chaleur(air), bas: D.chaleur(air) }); }
    const yHaut = unite.pt(0, -150)[1] + 5, yBas = unite.pt(0, 0)[1] - 5; // les flèches de chaleur tiennent entre le tube et le bord de la batterie
    const labAir = D.el("g", {}, ov);
    D.etiquette(labAir, unite.x[1], 262, "air chaud", { "text-anchor": "middle", fill: "#c0662a" });
    D.etiquette(labAir, 770, 478, "air du dehors", { fill: FROID });
    const LAT = [0, 1].map(i => ({ f: i / 2, maj: D.chevron(labAir) }));
    // ---- phrase 5 : le capteur de haute pression, son boîtier, les ventilateurs un par un ----
    const capt = D.el("g", {}, ov);
    const SX = 790, BX = 760, BY = 292;
    rect(capt, SX - 3, YT + 9, 6, 16, { fill: "#4e5a66" });
    rect(capt, SX - 17, YT + 25, 34, 30, { rx: 6, fill: "url(#vm-marine)", stroke: BLEU, "stroke-width": 3 });
    const cable = D.el("path", { d: "M " + (SX + 17) + " " + (YT + 40) + " H 868 V " + (BY + 104), fill: "none", "stroke-width": 5, "stroke-linecap": "round", "stroke-dasharray": "12 9" }, capt);
    rect(capt, BX, BY, 175, 104, { rx: 12, fill: "url(#vm-marine)", stroke: BLEU, "stroke-width": 4 });
    rect(capt, BX + 14, BY + 12, 147, 40, { rx: 6, fill: "#eaf2f8" });
    rect(capt, BX + 22, BY + 26, 100, 12, { rx: 6, fill: "#c9d4e2" });
    const jauge = rect(capt, BX + 22, BY + 26, 40, 12, { rx: 6, fill: HP });
    const lampes = [0, 1, 2].map(i => D.el("circle", { cx: BX + 38 + i * 50, cy: BY + 80, r: 11, stroke: "#fff", "stroke-width": 2 }, capt));
    const fil = D.el("path", { d: "M " + (BX + 87) + " " + BY + " V 268 H " + (unite.x[0] + 45) + " V 428 M " + (unite.x[1] + 45) + " 268 V 428 M " + (unite.x[2] + 45) + " 268 V 428", fill: "none", "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": "12 9" }, capt);
    D.lignes(capt, 800, 638, ["capteur de", "haute pression"], { "text-anchor": "middle", "font-size": 32, "font-weight": 600, fill: "#10233c", "font-family": SANS }, 37);
    // ---- phrases 6 et 7 : la case de droite (hiver : le détendeur ; puis le compresseur qui souffle moins) ----
    const cadre = D.el("g", {}, ov);
    rect(cadre, 706, 300, 250, 200, { rx: 16, fill: "#fffdf8", stroke: BLEU, "stroke-width": 3 });
    const hv = D.el("g", {}, cadre), cp = D.el("g", {}, cadre);
    D.lignes(hv, 831, 345, ["détendeurs bien", "alimentés"], { "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: BLEU, "font-family": SANS }, 34);
    rect(hv, 722, 416, 150, 36, { rx: 4, fill: "url(#vm-cuivre)" });
    rect(hv, 722, 426, 150, 16, { fill: D.couleur(0.45, false), opacity: 0.9 });
    const flux = D.courant(hv, 722, 872, 426, 442, 5, 31);
    D.image(hv, "detendeur", 872, 392, 76, 84);
    // le compresseur qui souffle moins
    D.image(cp, "compresseur", 724, 340, 160, 84);
    const souffle = [0, 1, 2].map(i => D.el("path", { d: "M 0 0 q 14 -7 28 0", fill: "none", stroke: "#8d99a6", "stroke-width": 5, "stroke-linecap": "round" }, cp));
    D.el("path", { d: "M 836 436 V 466 M 824 454 L 836 468 L 848 454", fill: "none", stroke: HP, "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, cp);
    D.etiquette(cp, 770, 466, "HP", { "font-weight": 700, fill: HP });
    // ---- le tube en coupe (phrases 3 et 4) ----
    const zm = D.el("g", {}, g);
    rect(zm, 30, 158, 930, 532, { rx: 18, fill: "#fffdf8", stroke: "rgba(27,58,99,.25)", "stroke-width": 2 });
    const mini = toit(zm, 480, 292, 0.3); // le même toit, en petit : on regarde dans un tube de sa batterie
    D.el("rect", { x: mini.tube.x0 - 6, y: mini.tube.yh - 8, width: mini.tube.x1 - mini.tube.x0 + 12, height: mini.tube.yb - mini.tube.yh + 16, rx: 8, fill: "none", stroke: ORANGE, "stroke-width": 4 }, zm);
    const ZXE = 910, ZXS = 60, ZH = 456, ZB = 564;
    let ail = "";
    for (let x = 80; x < 900; x += 22) ail += "M " + x + " 410 V 612 ";
    D.el("path", { d: ail, stroke: "#aab6c3", "stroke-width": 7, opacity: 0.7 }, zm);
    rect(zm, 44, 440, 880, 140, { fill: "url(#vm-cuivre)" });
    rect(zm, 44, ZH, 880, ZB - ZH, { fill: CLAIR });
    const tZ = fluideTube(zm, { xe: ZXE, xs: ZXS, yh: ZH, yb: ZB, dew: 0.2, bulle: 0.72, nb: 56, graine: 41, rm: 1, gouttes: 14, temp: p => p < 0.2 ? 0.5 : D.lerp(0.5, 0.45, D.borne((p - 0.2) / 0.52, 0, 1)) });
    const xRosee = tZ.xDe(0.2), xBulle = tZ.xDe(0.72);
    const etiqZ = D.el("g", {}, zm);
    D.etiquette(etiqZ, 700, 372, "point de rosée", { "text-anchor": "middle", "font-weight": 700, fill: BLEU });
    D.trait(etiqZ, 712, 384, xRosee + 4, 450, BLEU);
    D.etiquette(etiqZ, 330, 372, "point de bulle", { "text-anchor": "middle", "font-weight": 700, fill: BLEU });
    D.trait(etiqZ, 318, 384, xBulle - 4, 450, BLEU);
    const zones = D.el("g", {}, zm);
    D.etiquette(zones, 735, 646, "vapeur", { "text-anchor": "middle", fill: "#637285" });
    D.etiquette(zones, 520, 646, "gouttes", { "text-anchor": "middle", fill: "#637285" });
    D.etiquette(zones, 205, 646, "liquide", { "text-anchor": "middle", fill: "#637285" });
    const thG = D.el("g", {}, zm);
    const thE = thermometre(thG, 880, 440, 160, ROUGE), thS = thermometre(thG, 100, 440, 160, FROID);
    const manE = manometre(thG, 880, 666, 36), manS = manometre(thG, 100, 666, 36);
    [880, 100].forEach(x => rect(thG, x - 5, 580, 10, 28, { fill: "#4e5a66" }));
    // ---- l'héroïne et les pastilles ----
    const mila = D.heroine(tOv.fond, { r: 30 });
    const pas = pastilles(g, 30, "start", [["le glissement, dans l'autre sens", HP, 4, 4], ["HP plus basse = moins de travail", HP, 7, 7]]);
    const t5 = [c.A(5, 0.3), c.A(5, 0.55), c.A(5, 0.8)], t6 = c.T[6], tZ0 = c.T[3] - 0.2;
    // quand chaque ventilateur tourne : tous à la phrase 2, puis un par un à la phrase 5 ; l'hiver, les deux premiers s'arrêtent
    const MARCHE = [[[c.T[2] - 1, tZ0], [t5[0], t6 + 0.8]], [[c.T[2] - 1, tZ0], [t5[1], t6 + 0.8]], [[c.T[2] - 1, tZ0], [t5[2], c.D + 5]]];
    const marche = (i, t) => MARCHE[i].some(([a, b]) => t >= a && t < b);
    // trajet de l'héroïne dans la scène du toit : la conduite montante, la conduite horizontale, puis le tube de la batterie
    const long1 = 128, long2 = XD - unite.tube.x1, long3 = unite.tube.x1 - unite.tube.x0;
    const surToit = d => d < long1 ? [XD, 676 - d] : d < long1 + long2 ? [XD - (d - long1), YT] : [unite.tube.x1 - (d - long1 - long2), (unite.tube.yh + unite.tube.yb) / 2];
    return function (t) {
      const zoom = D.fenetre(t, c.T[3] - 0.35, c.T[5] - 0.1, 0.35), hv6 = D.lisse((t - c.T[6] + 0.1) / 0.5), c7 = D.lisse((t - c.T[7] + 0.1) / 0.5);
      op(zm, zoom); ov.setAttribute("opacity", (1 - zoom).toFixed(3));
      zm.setAttribute("display", zoom > 0.01 ? "inline" : "none");
      op(hiver, hv6);
      // la neige
      neige.setAttribute("opacity", hv6.toFixed(2));
      FL.forEach(f => { const y = 172 + ((f.y + f.v * t) % 500), x = f.x + 14 * Math.sin(0.9 * t + f.ph); f.e.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") scale(" + f.s.toFixed(2) + ")"); op(f.e, Math.min(D.borne((650 - y) / 30, 0, 1), D.borne((y - 172) / 25, 0, 1))); });
      // les ventilateurs
      unite.ventilos.forEach((v, i) => v(tourne(t, MARCHE[i]) * 540 % 360));
      const ON = [0, 1, 2].map(i => marche(i, t) ? 1 : 0);
      // l'air
      const chaudOp = t < tZ0 ? D.lisse((t - c.T[2]) / 0.6) : t > t5[0] ? 1 - 0.5 * hv6 : 0;
      PL.forEach(p => {
        const f = D.frac(p.f + t * 0.4), y = 420 - f * 120, on = ON[p.i];
        p.maj(p.x + (f - 0.5) * 6, y, 180, "#e8914a", chaudOp * on * D.fenetre(f, 0, 1, 0.2) * 0.95);
      });
      FRAIS.forEach(p => { const f = D.frac(p.f + t * 0.4), y = 676 - f * 40; p.maj(p.x, y, 180, "#3d7fca", chaudOp * D.fenetre(f, 0, 1, 0.25) * (ON[1] ? 0.95 : 0.4)); });
      const chOp = D.fenetre(t, c.T[2] + 0.3, c.T[3] - 0.15, 0.4);
      CH.forEach(h => {
        const f = D.frac(h.f + t * 0.5), d = 7 * f, op0 = chOp * D.fenetre(f, 0, 1, 0.25);
        h.haut(h.x, yHaut - d, 180, op0);
        h.bas(h.x, yBas + d, 0, op0);
      });
      op(labAir, D.fenetre(t, c.T[2] + 0.2, c.T[3] - 0.15, 0.4));
      LAT.forEach((p, i) => { const f = D.frac(p.f + t * 0.4); p.maj(740 - 30 * f, 440 + i * 70, 90, "#3d7fca", D.fenetre(f, 0, 1, 0.25) * 0.95); });
      // le fluide
      tOv.maj(t); tZ.maj(t);
      // le capteur et son boîtier (phrase 5)
      const k5 = D.fenetre(t, c.T[5] - 0.1, c.T[6] - 0.15, 0.4);
      op(capt, k5);
      lampes.forEach((l, i) => l.setAttribute("fill", ON[i] ? "#2e9e57" : "#9aa7b5"));
      jauge.setAttribute("width", (30 + 40 * (0.5 + 0.5 * Math.sin(t * 1.3))).toFixed(1));
      [cable, fil].forEach(e => { e.setAttribute("stroke", t > c.T[5] ? "#ff6b35" : "#9aa7b5"); e.setAttribute("stroke-dashoffset", (-t * 40).toFixed(1)); });
      op(cadre, D.fenetre(t, c.T[6] - 0.1, c.D + 1, 0.4));
      op(hv, 1 - c7); op(cp, c7);
      flux(t, 90);
      souffle.forEach((s, i) => { const f = D.frac(t * 0.5 + i / 3); s.setAttribute("transform", "translate(" + (898 + f * 12).toFixed(1) + " " + (356 + i * 16).toFixed(1) + ")"); s.setAttribute("opacity", (0.7 * D.fenetre(f, 0, 1, 0.3)).toFixed(2)); });
      op(etiqZ, D.fenetre(t, c.T[3] + 0.4, c.T[5] - 0.1, 0.4)); op(zones, D.fenetre(t, c.T[3] + 0.3, c.T[5] - 0.1, 0.4));
      const k4 = D.lisse((t - c.T[4]) / 0.6);
      op(thG, k4 * (t < c.T[5] - 0.2 ? 1 : 0));
      thE(0.86 * D.lisse((t - c.T[4]) / 1.2)); thS(0.38 * D.lisse((t - c.T[4]) / 1.2));
      const ang = 38 + 2 * Math.sin(t * 5);
      manE(ang); manS(ang);
      montrer(pas, c, t);
      // l'héroïne
      const w = D.courbe([[0, 4], [c.T[2], 4], [c.E[2], 5], [c.T[3], 5], [c.E[3], 6], [c.T[4], 6], [c.E[4], 7], [c.D, 7]], t);
      const temp = D.courbe([[0, 0.62], [c.T[2], 0.62], [c.E[2], 0.5], [c.T[3], 0.5], [c.E[3], 0.45], [c.D, 0.45]], t);
      let x, y, s = 0.8, etat = "vapeur", humeur = "chaud";
      if (t < tZ0) {
        const d = D.courbe([[c.T[2], 0], [c.E[2], long1 + long2 + 0.28 * long3]], t);
        [x, y] = surToit(d); y = Math.min(y, 682); plan(mila, tOv.fond); s = 0.55;
        humeur = t < c.A(2, 0.55) ? "chaud" : "sourire";
      } else if (t < c.T[5] - 0.1) {
        const p = w < 6 ? 0.2 + 0.52 * (w - 5) : 0.72 + 0.2 * (w - 6);
        x = tZ.xDe(p); plan(mila, p > 0.5 ? tZ.dessus : tZ.fond);
        etat = p > 0.46 ? "liquide" : "vapeur";
        const surf = tZ.surface(x, t);
        y = etat === "vapeur" ? Math.min(ZH + 44 + Math.sin(t * 2.5) * 5, surf - 38) : Math.max(surf + 6 + Math.sin(t * 2) * 3, ZH + 40);
        y = Math.min(y, ZB - 30);
        humeur = etat === "vapeur" ? "surprise" : "sourire";
        s = 0.95;
      } else {
        etat = "liquide"; humeur = "sourire"; s = 0.62;
        plan(mila, ov);
        const q = D.courbe([[c.T[5], 0], [c.D - 0.3, 1]], t, true);
        x = XL; y = D.lerp(YT + 4, 662, q);
      }
      mila({ x: x, y: y, s: s, t: t, temp: temp, etat: etat, humeur: humeur, regard: [-1, 0] });
      return { temp: temp, etat: etat, humeur: humeur, diag: w, diag0: 4 };
    };
  };

  /* ---------- aides de dessin communes à la bouteille, à la surveillance et au résumé ---------- */
  let nclip = 0;
  /* tuyau fait de tronçons [x, y, l, h, vertical] : toutes les parois d'abord, puis les intérieurs (coudes ouverts), puis le liquide */
  function tuyau(parent, segs, liquide) {
    segs.forEach(([x, y, w, h, v]) => rect(parent, x, y, w, h, { rx: 3, fill: "url(#vm-cuivre" + (v ? "-h" : "") + ")" }));
    const ints = segs.map(([x, y, w, h, v]) => v ? [x + 7, y, w - 14, h] : [x, y + 7, w, h - 14]);
    ints.forEach(([x, y, w, h]) => rect(parent, x, y, w, h, { fill: CLAIR }));
    return liquide ? ints.map(([x, y, w, h]) => rect(parent, x, y, w, h, { fill: liquide, opacity: 0.85 })) : ints;
  }
  /* le meuble en petit : coupe de côté, façade ouverte à gauche (rideau d'air bleu), étagères garnies, ventilateur sous les produits.
     repère local 200 × 130 ; rend { g, maj(marche 0..1, angleVentilateur, t) } */
  function miniMeuble(parent, x, y, k) {
    const g = D.el("g", { transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, parent);
    rect(g, 24, 8, 176, 122, { rx: 8, fill: "#eef5fb", stroke: BLEU, "stroke-width": 4 });
    rect(g, 188, 12, 12, 118, { fill: "url(#vm-acier-h)" });
    rect(g, 14, 0, 186, 14, { rx: 6, fill: "url(#vm-marine)" });
    const COUL = ["#e8b34a", "#6aa3d8", "#d96b6b", "#8cc084"];
    [34, 60, 86].forEach((yy, r) => {
      rect(g, 30, yy, 156, 5, { rx: 2, fill: "#8d99a6" });
      for (let i = 0; i < 4; i++) {
        const h = 14 + ((i + r) % 3) * 4;
        if ((i + r) % 2) rect(g, 40 + i * 36, yy - h, 18, h, { rx: 4, fill: COUL[(i + r) % 4], stroke: "#fff", "stroke-width": 1.5 });
        else rect(g, 38 + i * 36, yy - 16, 24, 16, { rx: 3, fill: COUL[(i * 2 + r) % 4], stroke: "#fff", "stroke-width": 1.5 });
      }
    });
    rect(g, 24, 100, 164, 30, { rx: 4, fill: "url(#vm-acier)" });
    let d = ""; for (let u = 36; u < 150; u += 8) d += "M " + u + " 104 V 126 ";
    D.el("path", { d: d, stroke: "#6b7785", "stroke-width": 2 }, g);
    const vent = D.ventilateur(g, 160, 115, 12);
    const cache = rect(g, 14, 0, 186, 130, { rx: 8, fill: "#8d99a6", opacity: 0 });
    const led = D.el("circle", { cx: 40, cy: 7, r: 4, fill: "#2e9e57" }, g);
    const air = D.el("g", {}, g), ch = [0, 1].map(i => ({ f: i / 2, maj: D.chevron(air) }));
    return { g: g, maj: (marche, ang, t) => {
      op(cache, (1 - marche) * 0.5); led.setAttribute("fill", marche > 0.5 ? "#2e9e57" : "#c9d4e2"); vent(ang);
      ch.forEach(c => { const f = D.frac(c.f + t * 0.5); c.maj(26, 20 + f * 76, 0, "#3d7fca", marche * D.fenetre(f, 0, 1, 0.2) * 0.9); });
    } };
  }
  /* l'électrovanne sur un tuyau vertical (x, y = centre du corps) : le corps de laiton, la bobine à gauche ; rend maj(allumee 0..1) */
  function electrovanne(parent, x, y) {
    const g = D.el("g", {}, parent);
    const lueur = D.el("ellipse", { cx: x - 40, cy: y, rx: 44, ry: 42, fill: "#ff8a3d", opacity: 0 }, g);
    rect(g, x - 20, y - 32, 40, 64, { rx: 8, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 3 });
    const bob = rect(g, x - 62, y - 26, 44, 52, { rx: 8, fill: "url(#vm-marine-h)", stroke: BLEU, "stroke-width": 4 });
    for (let i = 0; i < 5; i++) D.el("line", { x1: x - 56, x2: x - 24, y1: y - 18 + i * 9, y2: y - 18 + i * 9, stroke: "#c57a45", "stroke-width": 4, "stroke-linecap": "round" }, g);
    return a => { op(lueur, a * 0.75); bob.setAttribute("stroke", a > 0.5 ? "#ff6b35" : BLEU); bob.setAttribute("stroke-width", a > 0.5 ? 7 : 4); };
  }

  /* ================= 10 · la bouteille et la ligne liquide ================= */
  S.bouteille = function (g, c) {
    const LIQ = D.couleur(0.45, false), TL = 0.45;
    const BX0 = 260, BX1 = 500, BY0 = 185, BY1 = 690, W = 16;
    const tOff = [1e9, c.A(1, 0.42), c.A(1, 0.14)]; // les meubles 2 et 3 s'arrêtent
    const tCoil = c.A(5, 0.3);
    // ---------- la bouteille en coupe (phrases 0, 1, début de 2) ----------
    const v1 = D.el("g", {}, g);
    rect(v1, BX0, BY0, BX1 - BX0, BY1 - BY0, { rx: 90, fill: "url(#vm-marine-h)" });
    rect(v1, BX0 + W, BY0 + W, BX1 - BX0 - 2 * W, BY1 - BY0 - 2 * W, { rx: 74, fill: CLAIR });
    const cid = "vm-c-bt-" + (++nclip);
    rect(D.el("clipPath", { id: cid }, v1), BX0 + W, BY0 + W, BX1 - BX0 - 2 * W, BY1 - BY0 - 2 * W, { rx: 74 });
    const dedans = D.el("g", { "clip-path": "url(#" + cid + ")" }, v1);
    const vap = D.el("g", {}, dedans), fond = D.el("g", {}, dedans);
    let nv = 0.4;
    const cuve = D.liquide(dedans, { x0: BX0 + W, x1: BX1 - W, yh: BY0 + W, yb: BY1 - W, niveau: () => nv, couleur: () => LIQ, pas: 13 });
    const r1 = D.alea(61), V = [], COULS = [null, VIOLET, VERTMOL, ROSE];
    for (let i = 0; i < 9; i++) V.push({ x: 296 + r1() * 100, y: 210 + r1() * 120, ph: r1() * TOUR, cl: i % 4, maj: molecule(vap, COULS[i % 4]) });
    // les conduites : arrivée du condenseur (à gauche), tube plongeur et sortie (en haut à droite), collecteur vers les trois meubles
    tuyau(v1, [[30, 238, 250, 48]], LIQ);
    rect(v1, BX0 + 4, 234, 14, 56, { fill: "url(#vm-marine-h)" }); // le passage de la paroi
    tuyau(v1, [[416, 208, 48, 456, true], [416, 208, 230, 48], [622, 208, 40, 436, true]], LIQ);
    const fluxA = D.courant(v1, 30, 270, 244, 280, 5, 12);
    const fluxS = D.courant(v1, 466, 650, 214, 250, 5, 13);
    D.etiquette(v1, 30, 182, "liquide", { fill: "#637285" }); D.etiquette(v1, 30, 219, "du condenseur", { fill: "#637285" });
    D.etiquette(v1, 30, 440, "bouteille", { "font-weight": 700, fill: BLEU }); D.trait(v1, 160, 432, BX0 - 6, 432, BLEU);
    // les trois meubles, chacun avec son électrovanne
    D.etiquette(v1, 745, 192, "meubles", { fill: "#637285" });
    const RANGS = [270, 440, 610];
    const meubles = RANGS.map((ym, i) => {
      const branche = tuyau(v1, [[660, ym - 16, 90, 32]], LIQ);
      D.image(v1, "electrovanne", 672, ym - 22, 56, 44);
      const croix = D.el("path", { d: "M 679 " + (ym - 14) + " L 721 " + (ym + 14) + " M 721 " + (ym - 14) + " L 679 " + (ym + 14), stroke: ROUGE, "stroke-width": 6, "stroke-linecap": "round" }, v1);
      return { m: miniMeuble(v1, 746, ym - 65, 1), apres: branche[0], croix: croix };
    });
    // ---------- le filtre déshydrateur (phrase 2) ----------
    const v2 = D.el("g", {}, g);
    tuyau(v2, [[30, 436, 250, 64], [700, 436, 255, 64]]);
    rect(v2, 220, 330, 540, 276, { rx: 60, fill: "url(#vm-noir)" });
    rect(v2, 256, 362, 468, 212, { rx: 30, fill: CLAIR });
    [[30, 446, 250, 44], [700, 446, 255, 44]].forEach(([x, y, w, h]) => rect(v2, x, y, w, h, { fill: LIQ, opacity: 0.85 }));
    rect(v2, 256, 362, 468, 212, { rx: 30, fill: LIQ, opacity: 0.45 });
    const flux2 = [D.courant(v2, 30, 280, 446, 490, 5, 21), D.courant(v2, 700, 950, 446, 490, 5, 22)];
    rect(v2, 322, 372, 244, 192, { rx: 12, fill: "#e8dcc2", opacity: 0.55 });
    const rg = D.alea(23);
    for (let i = 0; i < 11; i++) for (let j = 0; j < 9; j++)
      D.el("circle", { cx: 336 + i * 22 + (rg() - 0.5) * 5, cy: 384 + j * 21.5 + (rg() - 0.5) * 5, r: 9.2, fill: "#efe3c6", stroke: "#b59b6a", "stroke-width": 1.5 }, v2);
    D.el("line", { x1: 640, y1: 366, x2: 640, y2: 570, stroke: "#6b7785", "stroke-width": 12, "stroke-dasharray": "7 6" }, v2);
    const objets = D.el("g", {}, v2), dessus2 = D.el("g", {}, v2);
    const tA = c.T[2] + 2.2, EAU = [], SAL = [];
    for (let i = 0; i < 6; i++) EAU.push({ d: D.lerp(tA + 0.2, tA + 2.2, i / 5), x: 340 + rg() * 200, y: 394 + rg() * 160, e: D.el("path", { d: "M 0 -12 Q 9 2 0 9 Q -9 2 0 -12 Z", fill: "#3d9be9", stroke: "#fff", "stroke-width": 2 }, objets) });
    for (let i = 0; i < 5; i++) SAL.push({ d: D.lerp(tA + 1.4, tA + 3.2, i / 4), y: 388 + rg() * 172, e: D.el("path", { d: "M -7 -4 L -2 -8 L 6 -5 L 8 3 L 1 8 L -6 5 Z", fill: "#3f3f3f" }, objets) });
    D.etiquette(v2, 490, 304, "filtre déshydrateur", { "text-anchor": "middle", "font-weight": 700, fill: BLEU });
    D.etiquette(v2, 440, 664, "humidité", { "text-anchor": "middle", fill: "#3d9be9", "font-weight": 700 }); D.trait(v2, 440, 636, 440, 574, "#3d9be9");
    D.etiquette(v2, 720, 664, "saletés", { "text-anchor": "middle", fill: "#3f3f3f", "font-weight": 700 }); D.trait(v2, 700, 636, 646, 574, "#3f3f3f");
    // ---------- le voyant (phrase 3) : à gauche plein et clair, à droite avec des bulles ----------
    const v3 = D.el("g", {}, g);
    const VX = [250, 700], VY = 450, vb = [], rb = D.alea(33);
    VX.forEach((cx, i) => {
      tuyau(v3, [[cx - 215, VY - 32, 130, 64], [cx + 85, VY - 32, 130, 64]]);
      [[cx - 110, cx - 80], [cx + 80, cx + 110]].forEach(([a, b]) => D.el("polygon", { points: [a, VY - 50, b, VY - 50, b + 8, VY, b, VY + 50, a, VY + 50, a - 8, VY].join(" "), fill: "url(#vm-laiton)", stroke: "#7c5c18", "stroke-width": 2 }, v3));
      rect(v3, cx - 100, VY - 118, 200, 236, { rx: 40, fill: "url(#vm-laiton)", stroke: "#7c5c18", "stroke-width": 3 });
      D.el("circle", { cx: cx, cy: VY, r: 88, fill: "#6f5214" }, v3);
      const id = "vm-c-vy-" + (++nclip);
      D.el("circle", { cx: cx, cy: VY, r: 76 }, D.el("clipPath", { id: id }, v3));
      const vitre = D.el("g", { "clip-path": "url(#" + id + ")" }, v3);
      rect(vitre, cx - 80, VY - 80, 160, 160, { fill: CLAIR });
      rect(vitre, cx - 80, VY - 80, 160, 160, { fill: LIQ, opacity: 0.72 });
      const fl = D.courant(vitre, cx - 80, cx + 80, VY - 70, VY + 70, 8, 40 + i);
      const bu = [];
      if (i) for (let k = 0; k < 12; k++) bu.push({ s: rb(), y: VY - 66 + rb() * 132, r: 5 + rb() * 6, e: D.el("circle", { fill: "#fff", "fill-opacity": 0.35, stroke: "#fff", "stroke-width": 2.5 }, vitre) });
      D.el("circle", { cx: cx, cy: VY, r: 24, fill: "#2e9e57", stroke: "#fff", "stroke-width": 4 }, v3);
      D.el("path", { d: "M " + (cx - 52) + " " + (VY - 46) + " A 66 66 0 0 1 " + (cx + 12) + " " + (VY - 66), fill: "none", stroke: "#fff", "stroke-width": 7, opacity: 0.55, "stroke-linecap": "round" }, v3);
      vb.push({ cx: cx, fl: fl, bu: bu });
      // le verdict, sous le voyant
      if (!i) { D.el("circle", { cx: cx - 84, cy: 604, r: 24, fill: VERT }, v3); D.el("path", { d: "M " + (cx - 96) + " 604 l 9 10 l 17 -20", fill: "none", stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, v3); }
      else { D.el("circle", { cx: cx - 84, cy: 604, r: 24, fill: ROUGE }, v3); D.el("path", { d: "M " + (cx - 94) + " 594 l 20 20 M " + (cx - 74) + " 594 l -20 20", fill: "none", stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round" }, v3); }
      D.etiquette(v3, cx - 48, 614, i ? "avec bulles" : "sans bulles", { "font-weight": 700, fill: i ? ROUGE : VERT });
    });
    D.etiquette(v3, VX[0], 300, "voyant", { "text-anchor": "middle", "font-weight": 700, fill: BLEU }); D.trait(v3, VX[0], 312, VX[0], 326, BLEU);
    // ---------- la longue ligne liquide, vers le rayon frais (phrases 4 et 5) ----------
    const v4 = D.el("g", {}, g);
    rect(v4, 30, 160, 925, 40, { rx: 8, fill: "#c9d1da" });
    rect(v4, 168, 200, 24, 490, { fill: "#a7b1bd" }); // le mur du local technique
    rect(v4, 30, 690, 925, 18, { fill: "#c9d1da" });
    D.image(v4, "bouteille", 62, 330, 62, 116);
    D.lignes(v4, 30, 520, ["local", "technique"], { "font-size": 30, "font-weight": 600, fill: "#637285", "font-family": SANS }, 34);
    [215, 365, 515].forEach((x0, k) => {
      rect(v4, x0, 330, 130, 360, { rx: 6, fill: "#e3e9f0", stroke: "#c4cdd8", "stroke-width": 2 });
      [400, 470, 540, 610].forEach((yy, r) => {
        rect(v4, x0 + 8, yy, 114, 6, { rx: 2, fill: "#b9c3ce" });
        for (let i = 0; i < 4; i++) rect(v4, x0 + 14 + i * 27, yy - 24 + ((i + r + k) % 2) * 4, 20, 24 - ((i + r + k) % 2) * 4, { rx: 4, fill: ["#e8d3a6", "#b9cfe6", "#e6b9b9", "#c3dcb9"][(i + k + r) % 4], opacity: 0.9 });
      });
    });
    [235, 395, 565].forEach(x => rect(v4, x, 200, 8, 26, { fill: "#8d99a6" }));
    const XV = 730, YP = 250;
    tuyau(v4, [[69, YP - 24, XV + 24 - 69, 48], [XV - 24, YP - 24, 48, 120, true], [69, YP - 24, 48, 100, true]], LIQ);
    tuyau(v4, [[XV - 24, 360, 48, 80, true]], null);
    const avalV = rect(v4, XV - 17, 366, 34, 74, { fill: LIQ, opacity: 0.85 });
    const fluxL = D.courant(v4, 120, XV + 20, YP - 18, YP + 18, 8, 51);
    const evOn = electrovanne(v4, XV, 330);
    D.etiquette(v4, 770, 336, "électrovanne", { fill: "#10233c", "font-weight": 700 });
    const dessusV4 = D.el("g", {}, v4);
    const mMeuble = miniMeuble(v4, 650, 440, 1.2);
    D.etiquette(v4, 215, 312, "ligne liquide", { fill: "#637285", "font-weight": 700 });
    // ---------- l'héroïne, les pastilles ----------
    const mila = D.heroine(g, { r: 30 });
    const pas = pastilles(g, 30, "start", [["la réserve", FROID, 1, 1], ["le voyage recommence", ORANGE, 5, 5]]);
    const tx = c.T[2] + 2.3;
    const surfaceY = x => cuve.surface(x, 0);
    return function (t) {
      // les vues se succèdent
      const f1 = D.fenetre(t, -1, tx, 0.3), f2 = D.fenetre(t, tx, c.T[3] - 0.3, 0.3), f3 = D.fenetre(t, c.T[3] - 0.3, c.T[4] - 0.3, 0.3), f4 = D.fenetre(t, c.T[4] - 0.3, c.D + 1, 0.3);
      [[v1, f1], [v2, f2], [v3, f3], [v4, f4]].forEach(([v, f]) => { op(v, f); v.setAttribute("display", f > 0.01 ? "inline" : "none"); });
      // la bouteille : le niveau monte quand les meubles 2 et 3 s'arrêtent
      nv = 0.4 + 0.18 * D.lisse((t - tOff[2]) / 1.6) + 0.18 * D.lisse((t - tOff[1]) / 1.6);
      cuve.maj(t); fluxA(t, 80); fluxS(t, 80);
      V.forEach(m => { const s = cuve.surface(340, t); m.maj(m.x + Math.sin(t * 0.8 + m.ph) * 16, Math.min(m.y + Math.cos(t * 0.7 + m.ph) * 12, s - 22), D.borne((s - 40 - m.y) / 20, 0, 1) * 0.9, 0.62, m.cl ? undefined : D.couleur(0.55, true)); });
      meubles.forEach((m, i) => {
        const on = 1 - D.lisse((t - tOff[i]) / 0.5);
        m.m.maj(on, tourne(t, [[0, tOff[i] + 0.4]]) * 360, t);
        op(m.croix, 1 - on); m.apres.setAttribute("opacity", (0.85 * on).toFixed(2));
      });
      // le filtre : l'eau est retenue par les grains, les saletés par la grille
      flux2.forEach(f => f(t, 110));
      EAU.forEach(o => {
        const k = D.borne((t - o.d) / 2.4, 0, 1);
        const x = k < 0.55 ? D.lerp(40, 262, k / 0.55) : D.lerp(262, o.x, (k - 0.55) / 0.45), y = k < 0.55 ? 468 : D.lerp(468, o.y, (k - 0.55) / 0.45);
        o.e.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") scale(" + (k >= 1 ? 0.7 : 1) + ")"); op(o.e, t < o.d ? 0 : k >= 1 ? 0.8 : 1);
      });
      SAL.forEach(o => {
        const k = D.borne((t - o.d) / 2.2, 0, 1), x = D.lerp(40, 628, k), y = k < 0.45 ? 468 : D.lerp(468, o.y, D.borne((k - 0.45) / 0.35, 0, 1));
        o.e.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ")"); op(o.e, t < o.d ? 0 : 1);
      });
      // le voyant
      vb.forEach(v => {
        v.fl(t, 120);
        v.bu.forEach(b => { const x = v.cx - 80 + D.frac(b.s + t * 0.22) * 160; b.e.setAttribute("cx", x.toFixed(1)); b.e.setAttribute("cy", (b.y + Math.sin(t * 3 + b.s * 9) * 5).toFixed(1)); b.e.setAttribute("r", b.r); });
      });
      // la ligne liquide, la bobine
      fluxL(t, 150);
      const allume = D.lisse((t - tCoil) / 0.4);
      evOn(allume);
      op(avalV, D.lisse((t - tCoil - 0.3) / 0.5));
      mMeuble.maj(D.lisse((t - tCoil - 0.5) / 0.8), tourne(t, [[tCoil + 0.5, c.D + 5]]) * 360, t);
      montrer(pas, c, t);
      // ---- l'héroïne ----
      let x, y, s = 0.55, humeur = "sourire", regard = [1, 0], couche = dessusV4;
      const tFall = c.A(0, 0.5), tEntre = c.E[0] + 0.5, t1 = c.A(1, 0.86);
      if (t < tx) {
        // phase 1 : la conduite, la chute, la nappe, puis le tube plongeur et la sortie
        s = 0.55;
        if (t < tFall) { x = D.courbe([[c.T[0], 58], [tFall, 300]], t, true); y = 262; couche = v1; }
        else if (t < tEntre) { const k = D.borne((t - tFall) / (tEntre - tFall), 0, 1); x = D.lerp(300, 350, k); y = D.lerp(262, surfaceY(350) + 6, k * k); couche = v1; humeur = "surprise"; }
        else if (t < t1) { x = 350 + 22 * Math.sin(t * 0.7); y = cuve.surface(x, t) - 2 + Math.sin(t * 2) * 3; couche = fond; }
        else if (t < c.T[2] + 0.5) { const k = D.lisse((t - t1) / (c.T[2] + 0.5 - t1)); x = D.lerp(350, 440, k); y = D.lerp(cuve.surface(350, t) + 8, 640, k); couche = fond; humeur = "surprise"; }
        else { const k = D.lisse((t - c.T[2] - 0.5) / 1.5); [x, y] = k < 0.55 ? [440, D.lerp(640, 232, k / 0.55)] : [D.lerp(440, 630, (k - 0.55) / 0.45), 232]; couche = v1; }
      } else if (t < c.T[3] - 0.3) {
        // phase 2 : le filtre
        x = D.courbe([[tx, 40], [tA, 120], [c.T[3] - 0.5, 930]], t); couche = dessus2; s = 0.5;
        y = x > 250 && x < 700 ? 468 + 26 * Math.sin(Math.PI * (x - 250) / 450 * 3) * (x < 640 ? 1 : 0.4) : 468;
      } else if (t < c.T[4] - 0.3) {
        // phase 3 : le voyant (elle s'arrête dans la vitre, puis repart)
        s = 0.62; couche = v3;
        x = D.courbe([[c.T[3] - 0.4, 60], [c.A(3, 0.35), VX[0] - 4], [c.A(3, 0.8), VX[0] + 4], [c.T[4] - 0.3, VX[0] + 215]], t); y = 450 + 4 * Math.sin(t * 2.4);
      } else {
        // phases 4 et 5 : la longue ligne, puis la vanne
        s = 0.5; couche = dessusV4; regard = [0, 1];
        if (t < c.E[4] + 0.6) { x = D.courbe([[c.T[4] - 0.4, 93], [c.T[4] + 0.2, 93], [c.E[4] + 0.6, XV]], t); y = D.courbe([[c.T[4] - 0.4, 340], [c.T[4] + 0.2, YP]], t); }
        else {
          x = XV; y = D.courbe([[c.E[4] + 0.6, YP], [c.T[5], 300], [tCoil + 0.5, 300], [tCoil + 1.5, 330], [tCoil + 2.2, 420], [c.D - 0.3, 470]], t);
          humeur = t < tCoil ? "triste" : "sourire";
        }
      }
      plan(mila, couche);
      mila({ x: x, y: y, s: s, t: t, temp: TL, etat: "liquide", humeur: humeur, regard: regard });
      const carte = D.courbe([[c.T[0], 7.6], [c.E[0], 8], [c.T[2], 8.1], [c.A(2, 0.8), 9.3], [c.T[3], 9.45], [c.E[3], 9.7], [c.T[4], 9.85], [c.E[4], 10.6], [c.D, 10.7]], t);
      return { carte: carte, temp: TL, etat: "liquide", humeur: humeur };
    };
  };

  /* ================= 11 · ce que l'on surveille : le tableau de bord du technicien ================= */
  S.surveillance = function (g, c) {
    const CW = 300, CH = 225, COLS = [30, 345, 660], ROWS = [225, 463];
    const tableau = D.el("g", {}, g), fin = D.el("g", {}, g);
    const CARTES = [0, 1, 2, 3, 4, 5].map(i => {
      const gg = D.el("g", { transform: "translate(" + COLS[i % 3] + " " + ROWS[Math.floor(i / 3)] + ")" }, tableau);
      const cadre = rect(gg, 0, 0, CW, CH, { rx: 16, fill: "#fffdf8", stroke: BLEU, "stroke-width": 3 });
      return { cadre: cadre, k: D.el("g", {}, gg), x: COLS[i % 3], y: ROWS[Math.floor(i / 3)] };
    });
    const txt = (p, x, y, s, o) => D.etiquette(p, x, y, s, Object.assign({ "font-size": 30, "font-weight": 700 }, o || {}));
    const LIQ = D.couleur(0.45, false);
    const ANIM = []; // fonctions (t) propres à chaque vignette

    // ---- 1 · un compresseur et ses deux pressostats de sécurité, un éclair « arrêt » ----
    { const k = CARTES[0].k, m = D.el("g", { transform: "translate(0 -14)" }, k);
      rect(m, 8, 154, 60, 16, { rx: 3, fill: "url(#vm-cuivre)" });
      rect(m, 104, 66, 160, 14, { rx: 3, fill: "url(#vm-cuivre)" }); rect(m, 104, 66, 14, 56, { rx: 3, fill: "url(#vm-cuivre-h)" });
      rect(m, 62, 118, 150, 70, { rx: 12, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 3 });
      rect(m, 84, 100, 70, 24, { rx: 4, fill: "#6b7785", stroke: "#4e5a66", "stroke-width": 3 });
      rect(m, 212, 126, 56, 54, { rx: 10, fill: "url(#vm-marine)", stroke: BLEU, "stroke-width": 3 });
      rect(m, 76, 188, 30, 10, { fill: "#4e5a66" }); rect(m, 168, 188, 30, 10, { fill: "#4e5a66" });
      rect(k, 24, 6, 70, 42, { rx: 8, fill: BLEU, stroke: "#10233c", "stroke-width": 3 });
      rect(k, 200, 6, 70, 42, { rx: 8, fill: ORANGE, stroke: "#10233c", "stroke-width": 3 });
      txt(k, 59, 36, "BP", { "text-anchor": "middle", fill: "#fff" }); txt(k, 235, 36, "HP", { "text-anchor": "middle", fill: "#fff" });
      D.el("path", { d: "M 59 48 C 59 90 26 96 26 142", fill: "none", stroke: "#4e5a66", "stroke-width": 3 }, k);
      D.el("path", { d: "M 235 48 C 235 56 218 52 214 58", fill: "none", stroke: "#4e5a66", "stroke-width": 3 }, k);
      const eclair = D.el("g", {}, m);
      D.el("polygon", { points: "150,120 128,160 146,160 134,198 172,148 152,148 166,120", fill: "#ffd166", stroke: "#b8860b", "stroke-width": 3, "stroke-linejoin": "round" }, eclair);
      const arret = txt(k, 150, 212, "arrêt", { "text-anchor": "middle", fill: ROUGE });
      ANIM.push((t, a) => { op(eclair, a * (0.5 + 0.5 * Math.abs(Math.sin(t * 5)))); op(arret, a); });
    }
    // ---- 2 · le régulateur de centrale → une cloche d'alarme et un téléphone ----
    { const k = CARTES[1].k;
      rect(k, 10, 26, 92, 84, { rx: 10, fill: "url(#vm-marine)", stroke: BLEU, "stroke-width": 3 });
      rect(k, 19, 36, 74, 44, { rx: 6, fill: "#eaf2f8" });
      rect(k, 27, 52, 40, 10, { rx: 5, fill: BLEU }); D.el("line", { x1: 76, x2: 76, y1: 42, y2: 74, stroke: "#2e9e57", "stroke-width": 4 }, k);
      D.el("circle", { cx: 30, cy: 96, r: 6, fill: "#2e9e57" }, k); D.el("circle", { cx: 50, cy: 96, r: 6, fill: "#9aa7b5" }, k);
      const flech = D.el("path", { d: "M 108 68 H 130 M 122 58 L 132 68 L 122 78", fill: "none", stroke: ORANGE, "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, k);
      const cloche = D.el("g", {}, k);
      D.el("path", { d: "M 140 92 Q 142 52 162 46 Q 182 52 184 92 Z", fill: "#e6b800", stroke: "#10233c", "stroke-width": 3.5, "stroke-linejoin": "round" }, cloche);
      D.el("line", { x1: 134, x2: 190, y1: 92, y2: 92, stroke: "#10233c", "stroke-width": 4, "stroke-linecap": "round" }, cloche);
      D.el("circle", { cx: 162, cy: 100, r: 7, fill: "#10233c" }, cloche); D.el("circle", { cx: 162, cy: 42, r: 5, fill: "#10233c" }, cloche);
      rect(k, 222, 28, 50, 88, { rx: 10, fill: "#24384f", stroke: "#10233c", "stroke-width": 3 });
      rect(k, 228, 38, 38, 56, { rx: 3, fill: "#9fd0f0" }); D.el("circle", { cx: 247, cy: 105, r: 4.5, fill: "#9aa7b5" }, k);
      const ondes = D.el("g", {}, k);
      [0, 1].forEach(s => { const d = 8 + s * 9; D.el("path", { d: "M " + (222 - d) + " 52 q -8 20 0 40 M " + (272 + d) + " 52 q 8 20 0 40", fill: "none", stroke: ORANGE, "stroke-width": 4, "stroke-linecap": "round" }, ondes); });
      txt(k, 150, 164, "technicien", { "text-anchor": "middle" }); txt(k, 150, 198, "d'astreinte", { "text-anchor": "middle" });
      ANIM.push((t, a) => {
        cloche.setAttribute("transform", "rotate(" + (a * 12 * Math.sin(t * 9)).toFixed(1) + " 162 40)");
        op(ondes, a * (0.4 + 0.6 * Math.abs(Math.sin(t * 6)))); flech.setAttribute("opacity", (0.5 + 0.5 * a).toFixed(2));
      });
    }
    // ---- 3 · un magasin traversé de tubes, un nuage de fuite, une pièce de monnaie, la Terre ----
    { const k = CARTES[2].k;
      [[14, 100], [96, 100]].forEach(([x, y]) => { rect(k, x, y, 70, 90, { rx: 5, fill: "#e3e9f0", stroke: "#c4cdd8", "stroke-width": 2 });
        [126, 152].forEach((yy, r) => { rect(k, x + 6, yy + 12, 58, 5, { rx: 2, fill: "#b9c3ce" }); for (let i = 0; i < 3; i++) rect(k, x + 10 + i * 18, yy - 6 + ((i + r) % 2) * 4, 12, 18 - ((i + r) % 2) * 4, { rx: 3, fill: ["#e8d3a6", "#b9cfe6", "#e6b9b9"][i] }); }); });
      rect(k, 6, 86, 176, 14, { rx: 3, fill: "url(#vm-cuivre)" });
      rect(k, 6, 192, 176, 10, { fill: "#c9d1da" });
      const fuite = D.el("g", {}, k), PU = [];
      for (let i = 0; i < 6; i++) PU.push({ s: i / 6, dx: (i % 3 - 1) * 14, cl: i % 4, maj: molecule(fuite, [null, VIOLET, VERTMOL, ROSE][i % 4]) });
      D.el("circle", { cx: 232, cy: 66, r: 32, fill: "#f2c14e", stroke: "#b8860b", "stroke-width": 4 }, k);
      D.el("circle", { cx: 232, cy: 66, r: 21, fill: "none", stroke: "#b8860b", "stroke-width": 3 }, k);
      D.el("path", { d: "M 220 56 q 6 -8 14 -8", fill: "none", stroke: "#fff", "stroke-width": 4, "stroke-linecap": "round", opacity: 0.8 }, k);
      const terre = D.el("g", {}, k);
      D.el("circle", { cx: 232, cy: 156, r: 38, fill: "#4b8fd6", stroke: BLEU, "stroke-width": 4 }, terre);
      ["M 210 144 q 12 -16 24 -4 q 4 12 -10 18 q -16 0 -14 -14 Z", "M 238 162 q 14 -6 22 6 q -2 14 -16 16 q -10 -8 -6 -22 Z"].forEach(d => D.el("path", { d: d, fill: "#5aa469", stroke: "#2e6b3c", "stroke-width": 2.5 }, terre));
      ANIM.push((t, a) => {
        PU.forEach(p => { const f = D.frac(p.s + t * 0.5); p.maj(94 + p.dx * (0.3 + f) + Math.sin(t * 3 + p.s * 9) * 4, 84 - f * 62, a * D.fenetre(f, 0, 1, 0.3), 0.55, p.cl ? undefined : D.couleur(0.2, true)); });
      });
    }
    // ---- 4 · un détecteur de fuite mural et le carnet « contrôle d'étanchéité » ----
    { const k = CARTES[3].k;
      rect(k, 22, 24, 86, 118, { rx: 12, fill: "#e8edf3", stroke: "#637285", "stroke-width": 3.5 });
      for (let i = 0; i < 5; i++) rect(k, 36, 40 + i * 12, 58, 5, { rx: 2, fill: "#9aa7b5" });
      const led = D.el("circle", { cx: 65, cy: 118, r: 9, fill: "#2e9e57", stroke: "#fff", "stroke-width": 2 }, k);
      rect(k, 150, 12, 124, 116, { rx: 8, fill: "#fff", stroke: BLEU, "stroke-width": 4 });
      for (let i = 0; i < 4; i++) D.el("circle", { cx: 150, cy: 30 + i * 28, r: 6, fill: BLEU }, k);
      const coches = [0, 1, 2].map(i => {
        D.el("line", { x1: 190, x2: 260, y1: 44 + i * 30, y2: 44 + i * 30, stroke: "#c9d4e2", "stroke-width": 4, "stroke-linecap": "round" }, k);
        return D.el("path", { d: "M 168 " + (42 + i * 30) + " l 7 8 l 13 -16", fill: "none", stroke: VERT, "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, k);
      });
      txt(k, 212, 168, "contrôle", { "text-anchor": "middle" }); txt(k, 212, 202, "d'étanchéité", { "text-anchor": "middle" });
      ANIM.push((t, a) => { led.setAttribute("fill", D.frac(t * 0.8) < 0.5 ? "#2e9e57" : "#bfe3c9"); coches.forEach((e, i) => op(e, a * D.lisse((t - c.A(4, 0.35 + i * 0.2)) / 0.3))); });
    }
    // ---- 5 · une bouteille de fluide : prise en liquide (coche verte) ; prise en vapeur (barrée) ----
    { const k = CARTES[4].k;
      // à gauche : la bouteille retournée, le liquide sort par la vanne du bas
      rect(k, 48, 12, 62, 106, { rx: 24, fill: "#d3dde8", stroke: BLEU, "stroke-width": 4 });
      const niv = (x0, y0, w, h, n) => { // le liquide d'une bouteille : une nappe dont la surface ondule, découpée dans la bouteille
        const id = "vm-c-bo-" + (++nclip);
        rect(D.el("clipPath", { id: id }, k), x0, y0, w, h, { rx: 18 });
        return D.liquide(D.el("g", { "clip-path": "url(#" + id + ")" }, k), { x0: x0, x1: x0 + w, yh: y0, yb: y0 + h, niveau: () => n, couleur: () => LIQ, pas: 10 });
      };
      const liqG = niv(54, 18, 50, 94, 0.5);
      rect(k, 68, 118, 22, 20, { rx: 4, fill: "url(#vm-laiton)", stroke: "#7c5c18", "stroke-width": 2 });
      const gout = [0, 1, 2].map(i => ({ f: i / 3, e: D.el("path", { d: "M 0 -9 Q 7 2 0 7 Q -7 2 0 -9 Z", fill: LIQ, stroke: "#fff", "stroke-width": 1.5 }, k) }));
      D.el("circle", { cx: 79, cy: 192, r: 20, fill: VERT }, k); D.el("path", { d: "M 69 192 l 7 8 l 14 -16", fill: "none", stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, k);
      // à droite : la bouteille debout, la vapeur sort par le haut, les molécules les plus pressées d'abord
      rect(k, 190, 78, 62, 88, { rx: 24, fill: "#d3dde8", stroke: BLEU, "stroke-width": 4 });
      const liqD = niv(196, 84, 50, 76, 0.34);
      rect(k, 211, 58, 22, 22, { rx: 4, fill: "url(#vm-laiton)", stroke: "#7c5c18", "stroke-width": 2 });
      // les molécules violettes et vertes (les plus pressées) sortent les premières ; celles de la famille de l'héroïne restent dans la bouteille
      const SORT = [], rs = D.alea(8), COL5 = [VIOLET, VERTMOL, VIOLET, VERTMOL, VIOLET, VERTMOL];
      COL5.forEach((cl, i) => SORT.push({ d: i * 0.4, dx: (rs() - 0.5) * 28, maj: molecule(k, cl) }));
      const RESTE = [0, 1, 2].map(i => ({ x: 208 + i * 14, y: 106 + (i % 2) * 14, ph: i * 2, maj: molecule(k, null) }));
      D.el("circle", { cx: 221, cy: 194, r: 20, fill: ROUGE }, k); D.el("path", { d: "M 212 185 l 18 18 M 230 185 l -18 18", fill: "none", stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round" }, k);
      ANIM.push((t, a) => {
        liqG.maj(t); liqD.maj(t);
        gout.forEach(o => { const f = D.frac(o.f + t * 0.8); o.e.setAttribute("transform", "translate(79 " + (146 + f * 22).toFixed(1) + ")"); op(o.e, a * D.fenetre(f, 0, 1, 0.2)); });
        SORT.forEach(m => { const q = (t - c.T[5] - m.d) / 2.4, f = D.frac(q); if (q < 0) { m.maj(221, 56, 0); return; } m.maj(221 + m.dx * 1.6 * f, 56 - f * 48, a * D.fenetre(f, 0, 1, 0.25), 0.6); });
        RESTE.forEach(m => m.maj(m.x + Math.sin(t * 1.6 + m.ph) * 4, m.y + Math.cos(t * 1.9 + m.ph) * 4, a, 0.62, D.couleur(0.2, true)));
      });
    }
    // ---- 6 · « centrales neuves » → CO₂ ----
    { const k = CARTES[5].k;
      rect(k, 20, 18, 260, 56, { rx: 14, fill: "#fff", stroke: BLEU, "stroke-width": 4 });
      txt(k, 150, 56, "centrales neuves", { "text-anchor": "middle", fill: BLEU });
      const fl = D.el("path", { d: "M 150 82 V 124 M 134 110 L 150 128 L 166 110", fill: "none", stroke: ORANGE, "stroke-width": 9, "stroke-linecap": "round", "stroke-linejoin": "round" }, k);
      rect(k, 60, 138, 180, 74, { rx: 16, fill: "#e8f5ee", stroke: VERT, "stroke-width": 5 });
      D.texte(k, 150, 194, "CO₂", { "text-anchor": "middle", "font-size": 54, "font-weight": 700, fill: VERT, "font-family": TITRE });
      ANIM.push((t, a) => fl.setAttribute("transform", "translate(0 " + (a * 4 * Math.sin(t * 5)).toFixed(1) + ")"));
    }

    // ---- la fin : « un autre voyage », « bientôt » ----
    rect(fin, 50, 300, 660, 200, { rx: 28, fill: "#fffdf8", stroke: BLEU, "stroke-width": 5 });
    D.texte(fin, 380, 420, "un autre voyage", { "text-anchor": "middle", "font-size": 66, "font-weight": 700, fill: BLEU, "font-family": TITRE });
    const bientot = D.pastille(fin, 380, 560, "bientôt", ORANGE, 38, "middle");
    // ---- l'héroïne en technicien : une casquette et une loupe ----
    const mila = D.heroine(g, { r: 30 });
    const acc = D.el("g", {}, g);
    D.el("path", { d: "M -27 -28 A 27 24 0 0 1 27 -28 Z", fill: BLEU, stroke: "#10233c", "stroke-width": 2.5, "stroke-linejoin": "round" }, acc);
    D.el("path", { d: "M 6 -28 H 46 Q 48 -22 40 -22 H 6 Z", fill: "#10233c" }, acc);
    D.el("circle", { cx: 0, cy: -40, r: 4, fill: ORANGE }, acc);
    const loupe = D.el("g", {}, acc);
    D.el("line", { x1: 30, y1: 30, x2: 46, y2: 48, stroke: "#10233c", "stroke-width": 7, "stroke-linecap": "round" }, loupe);
    D.el("circle", { cx: 22, cy: 22, r: 19, fill: "rgba(180,220,255,.35)", stroke: ORANGE, "stroke-width": 6 }, loupe);
    const pas = pastilles(g, 30, "start", [["une fuite coûte cher", ROUGE, 3, 3], ["en phase liquide", VERT, 5, 5]]);
    return function (t) {
      // les vignettes s'allument une à une (phrases 1 à 6) ; celle qui est en cours est cerclée d'orange
      const bas = D.lisse((t - c.E[0] + 0.4) / 0.8), grille = 1 - D.lisse((t - c.T[7] + 0.5) / 0.4);
      op(tableau, grille); op(fin, D.lisse((t - c.T[7] + 0.05) / 0.5));
      CARTES.forEach((v, i) => {
        const k = i + 1, a = D.lisse((t - c.T[k] + 0.1) / 0.5), enCours = t > c.T[k] - 0.1 && t < c.T[k + 1] - 0.1;
        op(v.k, a); v.cadre.setAttribute("stroke", enCours ? "#ff6b35" : BLEU); v.cadre.setAttribute("stroke-width", enCours ? 7 : 3);
        v.cadre.parentNode.setAttribute("opacity", (0.28 + 0.72 * Math.max(a, bas * 0.4)).toFixed(2));
        ANIM[i](t, a);
      });
      montrer(pas, c, t);
      // l'héroïne : grande, au centre, avec sa loupe ; puis elle se met en haut à droite et regarde le tableau
      const p = D.lisse((t - c.E[0] + 0.6) / 1.2);
      const x = D.lerp(495, 886, p), y = D.lerp(463 + Math.sin(t * 2) * 6, 189, p), s = D.lerp(2.1, 0.72, p);
      const fini = D.lisse((t - c.T[7] + 0.1) / 0.6);
      const X = D.lerp(x, 830, fini), Y = D.lerp(y, 410, fini), SS = D.lerp(s, 1.3, fini);
      mila({ x: X, y: Y, s: SS, t: t, temp: 0.1, etat: "liquide", humeur: t > c.T[3] && t < c.E[3] ? "triste" : "sourire", regard: p < 0.5 ? [0, 0] : [-1, 1] });
      acc.setAttribute("transform", "translate(" + X.toFixed(1) + " " + Y.toFixed(1) + ") scale(" + SS.toFixed(3) + ")");
      return { temp: 0.2, etat: "vapeur", humeur: "sourire" };
    };
  };

  /* ================= la centrale en un tour : cinq cases, chacune avec sa petite vue ================= */
  S.resume = function (g, c) {
    const LIQ = D.couleur(0.45, false);
    const defs = [
      { x: 30, y: 162, w: 300, h: 270, titre: ["meubles"] },
      { x: 345, y: 162, w: 300, h: 270, titre: ["collecteur", "d'aspiration"] },
      { x: 660, y: 162, w: 300, h: 270, titre: ["compresseurs", "en parallèle"] },
      { x: 30, y: 444, w: 560, h: 268, titre: [] },
      { x: 605, y: 444, w: 355, h: 268, titre: ["glissement"] }
    ];
    const CASES = defs.map((o, i) => {
      const gg = D.el("g", { transform: "translate(" + o.x + " " + o.y + ")" }, g);
      const cadre = rect(gg, 0, 0, o.w, o.h, { rx: 16, fill: "#fffdf8", stroke: BLEU, "stroke-width": 3 });
      D.el("circle", { cx: 32, cy: 34, r: 20, fill: BLEU }, gg);
      D.texte(gg, 32, 44, String(i + 1), { "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: "#fff", "font-family": TITRE });
      o.titre.forEach((l, j) => D.etiquette(gg, 62, 42 + j * 34, l, { "font-size": 30, "font-weight": 700, fill: BLEU }));
      return { g: gg, cadre: cadre, v: D.el("g", {}, gg), x: o.x, y: o.y };
    });
    const A = (i, lx, ly) => [CASES[i].x + lx, CASES[i].y + ly]; // un point d'une case, dans la scène
    const BOITE = { rx: 12, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 2 };
    const fleche = (p, x1, y1, x2, y2) => D.el("path", { d: "M " + x1 + " " + y1 + " H " + x2 + " M " + (x2 - 9) + " " + (y2 - 9) + " L " + x2 + " " + y2 + " L " + (x2 - 9) + " " + (y2 + 9), fill: "none", stroke: ORANGE, "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, p);

    // ---- 1 · meubles : l'électrovanne, le détendeur, l'évaporateur ----
    { const v = CASES[0].v;
      [["electrovanne", 16], ["detendeur", 112], ["evaporateur", 208]].forEach(([nom, x]) => { rect(v, x, 112, 76, 100, BOITE); D.image(v, nom, x + 4, 120, 68, 84); });
      fleche(v, 94, 162, 110, 162); fleche(v, 190, 162, 206, 162);
    }
    // ---- 2 · collecteur d'aspiration : une seule basse pression ----
    const molsC = [], chevC = [];
    { const v = CASES[1].v;
      [50, 118, 186].forEach(x => rect(v, x - 9, 100, 18, 62, { rx: 3, fill: "#5d80ad", stroke: BLEU, "stroke-width": 2 }));
      rect(v, 16, 158, 224, 38, { rx: 8, fill: "#5d80ad", stroke: BLEU, "stroke-width": 3 });
      rect(v, 22, 164, 212, 26, { rx: 5, fill: CLAIR });
      rect(v, 240, 172, 20, 10, { fill: "#5d80ad" });
      const mn = manometre(v, 270, 177, 26);
      mn(24);
      D.etiquette(v, 270, 238, "BP", { "text-anchor": "middle", "font-weight": 700, fill: BLEU });
      const rm = D.alea(7);
      for (let i = 0; i < 9; i++) molsC.push({ s: rm(), y: 168 + rm() * 18, cl: i % 4, f: molecule(v, [null, VIOLET, VERTMOL, ROSE][i % 4]) });
      [50, 118, 186].forEach(x => rect(v, x - 5, 104, 10, 56, { fill: CLAIR }));
      [50, 118, 186].forEach((x, i) => chevC.push({ x: x, f: i / 3, maj: D.chevron(v) }));
    }
    // ---- 3 · compresseurs en parallèle (et le capteur de BP) ----
    const lampes3 = [], mn3 = [];
    { const v = CASES[2].v;
      rect(v, 14, 196, 272, 26, { rx: 8, fill: "#5d80ad", stroke: BLEU, "stroke-width": 3 }); rect(v, 20, 202, 260, 14, { rx: 4, fill: CLAIR });
      [14, 90, 166].forEach((x, i) => {
        rect(v, x + 28, 146, 14, 52, { fill: "#5d80ad", stroke: BLEU, "stroke-width": 2 });
        rect(v, x + 4, 108, 62, 38, { rx: 8, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 3 });
        rect(v, x + 18, 94, 30, 16, { rx: 4, fill: "#6b7785", stroke: "#4e5a66", "stroke-width": 3 });
        D.texte(v, x + 35, 136, String(i + 1), { "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: BLEU, "font-family": TITRE });
        lampes3.push(D.el("circle", { cx: x + 56, cy: 118, r: 6, stroke: "#fff", "stroke-width": 2 }, v));
      });
      rect(v, 260, 170, 12, 28, { fill: "#4e5a66" });
      const mn = manometre(v, 266, 148, 20); mn(20);
      D.etiquette(v, 266, 252, "BP", { "text-anchor": "middle", "font-weight": 700, fill: BLEU });
    }
    // ---- 4 · variateur · séparateur · condenseur ----
    const toit4 = [];
    { const v = CASES[3].v;
      D.texte(v, 178, 226, "·", { "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: BLEU, "font-family": SANS });
      D.texte(v, 368, 226, "·", { "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: BLEU, "font-family": SANS });
      rect(v, 42, 84, 108, 84, { rx: 12, fill: "url(#vm-marine)", stroke: BLEU, "stroke-width": 4 });
      rect(v, 54, 96, 84, 60, { rx: 6, fill: "#eaf2f8" });
      D.el("path", { d: "M 62 126 q 10 -26 20 0 t 20 0 t 20 0", fill: "none", stroke: BLEU, "stroke-width": 5, "stroke-linecap": "round" }, v);
      D.image(v, "separateurHuile", 224, 76, 96, 100);
      const t = toit(v, 470, 176, 0.2); t.ventilos.forEach(f => toit4.push(f));
      [[96, "variateur"], [272, "séparateur"], [470, "condenseur"]].forEach(([x, s]) => D.etiquette(v, x, 222, s, { "text-anchor": "middle", "font-weight": 700, fill: "#10233c" }));
    }
    // ---- 5 · glissement : le thermomètre qui monte côté BP, qui descend côté HP ----
    let thBP, thHP;
    { const v = CASES[4].v;
      thBP = thermometre(v, 96, 190, 130, ROUGE); thHP = thermometre(v, 262, 190, 130, FROID);
      D.el("path", { d: "M 132 168 V 104 M 120 118 L 132 102 L 144 118", fill: "none", stroke: ROUGE, "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, v);
      D.el("path", { d: "M 226 104 V 168 M 214 154 L 226 170 L 238 154", fill: "none", stroke: FROID, "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, v);
      D.etiquette(v, 96, 244, "BP", { "text-anchor": "middle", "font-weight": 700, fill: BLEU });
      D.etiquette(v, 262, 244, "HP", { "text-anchor": "middle", "font-weight": 700, fill: ORANGE });
    }
    // ---- l'héroïne et la pastille ----
    const mila = D.heroine(g, { r: 30 });
    const pas = pastilles(g, 30, "start", [["plusieurs compresseurs, une seule basse pression", BLEU, 6, 6]]);
    const tempDe = w => D.courbe([[0, 0.08], [1, 0.13], [2, 0.15], [3, 0.2], [4, 0.62], [5, 0.5], [6, 0.45], [7, 0.45], [8, 0.08]], ((w % 8) + 8) % 8, true);
    const etatDe = w => { const m = ((w % 8) + 8) % 8; return m < 1 ? "bout" : m < 5.5 ? "vapeur" : m < 7.7 ? "liquide" : "bout"; };
    // le tour complet de la dernière phrase : où se trouve l'héroïne dans les cinq cases selon w
    const TOUR_X = [[0, 70], [1, 170], [2, 270], [2.4, 400], [3, 560], [3.4, 785], [4, 785], [4.8, 126], [5.6, 302], [6.4, 500], [7, 500], [7.5, 783], [8, 70]];
    const PRS = [[0, A(0, 0, 162)[1]], [2, A(0, 0, 162)[1]], [2.4, A(1, 0, 177)[1]], [3, A(1, 0, 177)[1]], [3.4, A(2, 0, 122)[1]], [4, A(2, 0, 122)[1]], [4.8, 574], [6.4, 590], [7, 590], [7.5, 564], [8, A(0, 0, 162)[1]]];
    const DIAGS = [null, [8, 9], [9, 11], [3, 4], [4, 7], [7, 7], [0, 8]];
    const ALL = { isoFroidBP: true, isoChaudBP: true, isoChaudHP: true, isoFroidHP: true };
    return function (t) {
      let kk = -1;
      for (let k = 1; k <= 6; k++) if (t >= c.T[k] - 0.1) kk = k;
      CASES.forEach((v, i) => {
        const k = i + 1, a = D.lisse((t - c.T[k] + 0.1) / 0.5);
        const enCours = kk === 6 ? t > c.T[6] - 0.1 : t > c.T[k] - 0.1 && t < (k < 5 ? c.T[k + 1] : c.T[6]) - 0.1;
        v.cadre.setAttribute("stroke", enCours ? "#ff6b35" : BLEU); v.cadre.setAttribute("stroke-width", enCours ? 7 : 3);
        v.g.setAttribute("opacity", (0.3 + 0.7 * a).toFixed(2));
        op(v.v, a);
      });
      montrer(pas, c, t);
      // animations des vues
      molsC.forEach(m => { const f = D.frac(m.s + t * 0.12); m.f(16 + 12 + f * 200, m.y + Math.sin(t * 3 + m.s * 9) * 3, D.fenetre(f, 0, 1, 0.1), 0.5, m.cl ? undefined : D.couleur(0.18, true)); });
      chevC.forEach(h => { const f = D.frac(h.f + t * 0.5); h.maj(h.x, 112 + f * 40, 0, FROID, D.fenetre(f, 0, 1, 0.25) * 0.9); });
      lampes3.forEach((l, i) => l.setAttribute("fill", (i === 2 ? false : i === 1 ? true : D.frac(t * 0.25) < 0.6) ? "#2e9e57" : "#9aa7b5"));
      toit4.forEach(f => f((t - c.T[4]) * 360 % 360));
      const p5 = D.lisse((t - c.T[5]) / (c.E[5] - c.T[5]));
      thBP(0.3 + 0.4 * p5); thHP(0.8 - 0.4 * p5);
      // la position de l'héroïne dans la scène, selon la phrase
      let x, y, s = 0.6, etat = "liquide", humeur = "sourire", ecrase = 0, temp = 0.45, w, w0;
      const u = kk >= 1 ? D.lisse((t - c.T[kk]) / (c.E[kk] - c.T[kk])) : 0;
      if (kk >= 1 && kk <= 5) {
        const [a, b] = DIAGS[kk]; w = D.lerp(a, b, u); w0 = a;
        const R = [[A(0, 50, 162), A(0, 150, 162), A(0, 246, 162)], [A(1, 40, 177), A(1, 120, 177), A(1, 205, 177)], [A(2, 125, 122), A(2, 125, 122), A(2, 125, 122)],
          [A(3, 96, 130), A(3, 272, 130), A(3, 470, 124)], [A(4, 178, 118), A(4, 178, 118), A(4, 178, 118)]][kk - 1];
        const f = D.courbe([[c.T[kk], 0], [c.E[kk], 1]], t, true), seg = f < 0.5 ? 0 : 1, g2 = seg ? (f - 0.5) * 2 : f * 2;
        x = D.lerp(R[seg][0], R[seg + 1][0], D.lisse(g2)); y = D.lerp(R[seg][1], R[seg + 1][1], D.lisse(g2));
        if (kk === 1) { etat = f < 0.3 ? "liquide" : f < 0.85 ? "bout" : "vapeur"; temp = f < 0.3 ? 0.45 : D.lerp(0.08, 0.13, f); humeur = f > 0.3 && f < 0.6 ? "surprise" : "sourire"; }
        else if (kk === 2) { etat = "vapeur"; temp = D.lerp(0.13, 0.2, f); s = 0.42; }
        else if (kk === 3) { etat = "vapeur"; temp = D.lerp(0.2, 0.62, f); ecrase = 0.6 * D.lisse((f - 0.25) / 0.5); humeur = f > 0.3 ? "chaud" : "sourire"; s = 0.55; }
        else if (kk === 4) { etat = f > 0.75 ? "liquide" : "vapeur"; temp = D.lerp(0.62, 0.45, f); humeur = f < 0.5 ? "chaud" : "sourire"; s = 0.65; }
        else { etat = "liquide"; temp = 0.45; s = 0.7; humeur = "sourire"; }
      } else if (kk === 6) {
        w = D.lerp(0, 8, D.lisse((t - c.T[6]) / (c.E[6] - c.T[6]))); w0 = 0;
        x = D.courbe(TOUR_X, w, true); y = D.courbe(PRS, w, true);
        etat = etatDe(w); temp = tempDe(w); humeur = temp > 0.5 ? "chaud" : "sourire";
      } else { // avant la phrase 1 : elle attend dans la première case
        [x, y] = A(0, 50, 162); etat = "liquide"; temp = 0.45; humeur = "sourire";
      }
      mila({ x: x, y: y, s: s, t: t, temp: temp, etat: etat, humeur: humeur, ecrase: ecrase, regard: [1, 0] });
      const r = { temp: temp, etat: etat, humeur: humeur };
      if (kk >= 1) { r.diag = w; r.diag0 = w0; if (kk === 5 && t < c.T[6] - 0.1) r.calques = ALL; }
      return r;
    };
  };
})();
