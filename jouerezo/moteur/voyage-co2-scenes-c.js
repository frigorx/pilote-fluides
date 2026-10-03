/* =====================================================================
   voyage-co2-scenes-c.js — à l'arrêt, la fuite, la neige carbonique,
   le résumé (édition CO₂ de « Voyage dans tous ses états »)
   ---------------------------------------------------------------------
   Même contrat que voyage-scenes-a.js : VOYAGE_SCENES[id] = (g, c) → maj(t).
   Récit : donnees/voyage-co2.js. L'ORDRE des phrases porte les gestes
   (c.T[k] / c.E[k] / c.A(k, f)) : ajouter une phrase décale tout.
   Zones interdites : en-tête (x < 760, y < 140), carte (x > 1200, y < 285),
   rien sous y = 760. Aucun texte ne chevauche un tracé : les étiquettes en
   zone chargée sont posées sur une plaque opaque.
   ARRÊT : local machine, la nuit (fond à 14 %, bande de ciel plus sombre au-dessus
     du toit pour la lune et l'évent), la centrale réduite, un grand manomètre
     (graduations rouges = tarage des soupapes), le groupe de maintien (présent
     dès le début, éteint ; il démarre à la phrase 3), la soupape et son évent
     vers l'extérieur, ventilation + détecteur (présents, éteints ; vivants à la 5).
   FUITE : coupe d'un local (murs, sol). Le CO₂ qui s'échappe est PLUS LOURD que
     l'air : un voile (jamais une nappe : pas de surface qui ondule) monte depuis
     le sol et chasse les molécules d'air (blanches) vers le haut.
   NEIGE : vidange trop vive → sous 5,18 bar le CO₂ devient solide (flocons
     hexagonaux), le tube se bouche, la vanne givre ; puis la bonne manière
     (second cadran, paliers). Le levier de la vanne tourne : fermé = debout.
     Le thermomètre suit la pression (table de saturation du CO₂, SAT).
   RÉSUMÉ : le tour de la carte, une étape par phrase (quatre verbes à gauche,
     l'état de la molécule en grand sous eux), puis les quatre états en cartes.
   PIÈGE : fonctions pures de t — aucun état gardé d'une image à l'autre.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const TOUR = 2 * Math.PI;
  const SANS = "Calibri, Arial, sans-serif", TITRE = "Trebuchet MS, Arial, sans-serif";
  let nid = 0;
  const ident = p => "c3-" + p + "-" + (++nid);
  const rad = d => d * Math.PI / 180;
  const doux = (t, t0, du) => D.lisse((t - t0) / (du || 0.5)); // 0 → 1 à partir de t0
  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const pos = (e, x, y) => { e.setAttribute("cx", x.toFixed(1)); e.setAttribute("cy", y.toFixed(1)); };

  /* pastilles du bas (y = 748, comme les autres chapitres) : [texte, couleur, [k, f] début, [k, f] fin | "fin"] */
  const pastilles = (g, c, x, ancre, liste) => liste.map(([s, coul, a, b]) => ({ g: D.pastille(g, x, 748, s, coul, 30, ancre),
    t0: c.A(a[0], a[1]), t1: b === "fin" ? c.D : c.A(b[0], b[1]) }));
  const montrer = (liste, t) => liste.forEach(p => op(p.g, D.fenetre(t, p.t0, p.t1, 0.35)));

  /* chemin en ligne brisée : at(s) = point à la distance s */
  function parcours(pts) {
    const L = [0];
    for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const long = L[L.length - 1];
    return { long: long, at: s => {
      s = D.borne(s, 0, long);
      let i = 1;
      while (i < pts.length - 1 && L[i] < s) i++;
      const f = (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
      return [D.lerp(pts[i - 1][0], pts[i][0], f), D.lerp(pts[i - 1][1], pts[i][1], f)];
    } };
  }
  const polyligne = (parent, pts, coul, ep, at) => D.el("polyline", Object.assign({ points: pts.map(p => p.join(",")).join(" "), fill: "none", stroke: coul, "stroke-width": ep, "stroke-linejoin": "round", "stroke-linecap": "round" }, at || {}), parent);
  const tuyauCuivre = (parent, pts, ep) => { polyligne(parent, pts, "#8a4a24", ep); polyligne(parent, pts, "#e7a978", ep * 0.36); };
  const etoile = (parent, x, y, r) => D.el("path", { d: "M 0 " + -r + " L " + r * 0.28 + " " + -r * 0.28 + " L " + r + " 0 L " + r * 0.28 + " " + r * 0.28 + " L 0 " + r + " L " + -r * 0.28 + " " + r * 0.28 + " L " + -r + " 0 L " + -r * 0.28 + " " + -r * 0.28 + " Z",
    fill: "#fff6bf", transform: "translate(" + x + " " + y + ")" }, parent);

  /* un pan de mur en coupe (béton hachuré) : x, y0 → y1, largeur l */
  function mur(parent, x, y0, y1, l) {
    D.el("rect", { x: x, y: y0, width: l, height: y1 - y0, fill: "#8d97a4" }, parent);
    for (let y = y0 + 8; y < y1 - 10; y += 28) D.el("line", { x1: x + 4, y1: y + 18, x2: x + l - 4, y2: y, stroke: "#6b7785", "stroke-width": 3 }, parent);
  }

  /* étiquette sur plaque opaque (zone chargée) : x, y = centre ; renvoie le groupe, .cadre = [x, y, l, h] */
  function plaque(parent, x, y, lignes, o) {
    o = o || {};
    const taille = o.taille || 30, pas = taille * 1.22, g = D.el("g", {}, parent);
    const fond = D.el("rect", { rx: 12, fill: o.fond || "#fffdf8", stroke: o.bord || D.BLEU, "stroke-width": 3 }, g);
    let l = 0;
    lignes.forEach((s, i) => {
      const t = D.texte(g, x, y + (i - (lignes.length - 1) / 2) * pas + taille * 0.34, s, { "text-anchor": "middle", "font-size": taille, "font-weight": 700, fill: o.coul || "#10233c", "font-family": SANS });
      l = Math.max(l, (t.getComputedTextLength && t.getComputedTextLength()) || s.length * taille * 0.5);
    });
    const w = l + 30, h = lignes.length * pas + 16;
    fond.setAttribute("x", (x - w / 2).toFixed(1)); fond.setAttribute("y", (y - h / 2).toFixed(1)); fond.setAttribute("width", w.toFixed(1)); fond.setAttribute("height", h.toFixed(1));
    g.cadre = [x - w / 2, y - h / 2, w, h];
    return g;
  }

  /* cadran de pression : 150° → 390° (de bas gauche à bas droite par le haut). De l'extérieur vers le centre :
     nombres, graduations, bande de couleur, aiguille (courte : elle ne touche jamais un nombre).
     o : { cx, cy, R, max, pas, nombres, bandes: [[a, b, couleur]], fmt(v) } → { g, pt(v, r), maj(v, tremblement) } */
  function cadran(parent, o) {
    const g = D.el("g", {}, parent), cx = o.cx, cy = o.cy, R = o.R;
    const ang = v => rad(150 + 240 * D.borne(v / o.max, 0, 1));
    const pt = (v, r) => [cx + r * Math.cos(ang(v)), cy + r * Math.sin(ang(v))];
    const bz = Math.max(6, R * 0.05), rn = R - bz / 2 - 17, rt = rn - 19, rb = rt - R * 0.1 - 6, lw = R * 0.075, ln = rb - lw / 2 - 4; // rayons : nombres, graduations, bande, aiguille
    const teinte = (v, defaut) => { const b = (o.bandes || []).find(([x, y]) => v >= x - 1e-6 && v <= y + 1e-6); return b ? b[2] : defaut; };
    D.el("circle", { cx: cx, cy: cy, r: R, fill: "#fffdf8", stroke: "#4e5a66", "stroke-width": bz }, g);
    (o.bandes || []).forEach(([a, b, coul]) => {
      const r = rb, [x1, y1] = pt(a, r), [x2, y2] = pt(b, r);
      D.el("path", { d: "M " + x1.toFixed(1) + " " + y1.toFixed(1) + " A " + r + " " + r + " 0 " + (ang(b) - ang(a) > Math.PI ? 1 : 0) + " 1 " + x2.toFixed(1) + " " + y2.toFixed(1),
        fill: "none", stroke: coul, "stroke-width": lw }, g);
    });
    for (let v = 0; v <= o.max + 1e-6; v += o.pas) {
      const grand = o.nombres.some(n => Math.abs(n - v) < 1e-6), [x1, y1] = pt(v, rt - R * (grand ? 0.1 : 0.07)), [x2, y2] = pt(v, rt);
      D.el("line", { x1: x1.toFixed(1), y1: y1.toFixed(1), x2: x2.toFixed(1), y2: y2.toFixed(1), stroke: teinte(v, "#24384f"), "stroke-width": grand ? 4 : 2.4, "stroke-linecap": "round" }, g);
    }
    o.nombres.forEach(v => { const [x, y] = pt(v, rn); D.texte(g, x, y + 10, String(v), { "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: teinte(v, "#24384f"), "font-family": SANS }); });
    const aig = D.el("g", {}, g);
    D.el("path", { d: "M " + -R * 0.1 + " 0 L 0 " + -R * 0.045 + " L " + ln + " 0 L 0 " + R * 0.045 + " Z", fill: "#c0392b", stroke: "#7a1f14", "stroke-width": 1.5 }, aig);
    D.el("circle", { cx: cx, cy: cy, r: R * 0.075, fill: "#2a3440" }, g);
    const lecture = D.texte(g, cx, cy + R * 0.7, "", { "text-anchor": "middle", "font-size": Math.max(28, Math.round(R * 0.23)), "font-weight": 700, fill: "#10233c", "font-family": SANS });
    return { g: g, pt: pt, ang: ang, maj: (v, trem) => {
      aig.setAttribute("transform", "translate(" + cx + " " + cy + ") rotate(" + (ang(v) * 180 / Math.PI + (trem || 0)).toFixed(2) + ")");
      lecture.textContent = o.fmt(v);
    } };
  }

  /* ---------- 9 · à l'arrêt : le local machine, la nuit ---------- */
  S.arret = function (g, c) {
    const TY = 338;                                   // niveau du tube du groupe de maintien
    const nuit = D.el("rect", { x: 0, y: 0, width: 1600, height: 770, fill: "#0b1f3a" }, g); // jamais plus de 15 %
    D.el("rect", { x: 0, y: 140, width: 1600, height: 98, fill: "#1b3a63", opacity: 0.34 }, g); // le ciel (la nuit du fond reste à 14 %)
    const astres = D.el("g", {}, g);
    const lune = D.el("path", { d: "M 0 -32 A 32 32 0 0 0 0 32 A 40 40 0 0 1 0 -32 Z", fill: "#fbefb0", stroke: "#d9bd5c", "stroke-width": 2 }, astres);
    const etoiles = [[1135, 166], [1182, 214], [985, 212], [300, 182], [190, 218], [405, 168], [120, 168]].map(([x, y]) => etoile(astres, x, y, 9));
    D.el("rect", { x: 0, y: 238, width: 1600, height: 10, fill: "#55616f" }, g);   // le toit
    D.el("rect", { x: 0, y: 708, width: 1600, height: 8, fill: "#55616f" }, g);    // le sol

    /* le thermomètre du local */
    const TH = D.el("g", {}, g), yT = v => 600 - (v - 10) * 8;
    D.etiquette(TH, 1100, 326, "local", { "text-anchor": "middle" });
    D.el("rect", { x: 1086, y: 340, width: 28, height: 270, rx: 14, fill: "#f4f8fc", stroke: "#4e5a66", "stroke-width": 4 }, TH);
    [10, 20, 30, 40].forEach(v => D.el("line", { x1: 1062, x2: 1080, y1: yT(v), y2: yT(v), stroke: "#4e5a66", "stroke-width": 3, "stroke-linecap": "round" }, TH));
    const mercure = D.el("rect", { x: 1094, width: 12, fill: "#c0392b" }, TH);
    D.el("circle", { cx: 1100, cy: 626, r: 28, fill: "#c0392b", stroke: "#4e5a66", "stroke-width": 4 }, TH);
    const valT = D.texte(TH, 1100, 694, "", { "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: "#10233c", "font-family": SANS });

    /* le grand manomètre ; le secteur rouge = tarage des soupapes, à 50 bar : SOUS les 57 bar d'un local à 20 °C,
       c'est pourquoi il faut le groupe de maintien (Franck, 03/10). Le secteur n'apparaît qu'avec le groupe (phrase 3). */
    const CX = 1385, CY = 522, RC = 172, TARAGE = 50;
    const cad = cadran(g, { cx: CX, cy: CY, R: RC, max: 80, pas: 5, nombres: [0, 20, 40, 60, 80], bandes: [], fmt: v => Math.round(v) + " bar" });
    const tarage = D.el("g", {}, g);
    { const rb = RC - Math.max(6, RC * 0.05) / 2 - 36 - RC * 0.1 - 6, [x1, y1] = cad.pt(TARAGE, rb), [x2, y2] = cad.pt(80, rb); // = rayon de bande de cadran()
      D.el("path", { d: "M " + x1.toFixed(1) + " " + y1.toFixed(1) + " A " + rb + " " + rb + " 0 0 1 " + x2.toFixed(1) + " " + y2.toFixed(1), fill: "none", stroke: "#d6402a", "stroke-width": RC * 0.075 }, tarage); }
    D.etiquette(tarage, CX, 330, "tarage des soupapes", { "text-anchor": "middle", fill: "#b0301d" });
    const [rx, ry] = cad.pt(65, RC * 1.02);
    D.trait(tarage, CX + 112, 342, rx, ry, "#b0301d");

    /* le groupe de maintien : petit caisson, ventilateur, tube vers la bouteille */
    const gm = D.el("g", {}, g), gmEt = D.el("g", {}, g);
    D.etiquette(gmEt, 180, 286, "groupe de maintien", { "text-anchor": "middle" });
    D.el("rect", { x: 60, y: 298, width: 240, height: 110, rx: 14, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 4 }, gm);
    D.el("circle", { cx: 130, cy: 353, r: 42, fill: "#2a3440" }, gm);
    const vent = D.ventilateur(gm, 130, 353, 37);
    for (let k = 0; k < 4; k++) D.el("line", { x1: 192, x2: 270, y1: 344 + k * 14, y2: 344 + k * 14, stroke: "#4e5a66", "stroke-width": 4, "stroke-linecap": "round" }, gm);
    const lampe = D.el("circle", { cx: 272, cy: 322, r: 9, stroke: "#2a3440", "stroke-width": 2 }, gm);

    /* la centrale réduite ; la bouteille est en haut à gauche */
    const cir = D.circuit(g, 460, 316, 560, false);
    const TX = Math.round(cir.ecran(210, 85)[0]);
    const TUBE = [[300, TY], [TX, TY], [TX, TY + 18]];
    tuyauCuivre(gm, TUBE, 10);
    const froid = parcours(TUBE), gFroid = D.el("g", {}, g), MF = [0, 1, 2, 3, 4, 5].map(i => ({ s: i / 6, maj: D.mol(gFroid) }));

    /* le courant coupé : câble, prise, éclair barré */
    D.el("path", { d: "M 120 408 V 462 Q 120 478 136 478 H 188", fill: "none", stroke: "#2a3440", "stroke-width": 5, "stroke-linecap": "round" }, gm);
    D.el("rect", { x: 188, y: 460, width: 36, height: 36, rx: 6, fill: "#fff", stroke: "#4e5a66", "stroke-width": 3 }, gm);
    [200, 212].forEach(x => D.el("circle", { cx: x, cy: 478, r: 3.5, fill: "#2a3440" }, gm));
    const eclair = D.el("g", {}, g);
    D.el("polygon", { points: "10,-44 -26,6 -4,6 -14,44 26,-10 4,-10", fill: "#f2c200", stroke: D.BLEU, "stroke-width": 3, "stroke-linejoin": "round" }, eclair);
    D.el("circle", { r: 54, fill: "none", stroke: "#c0392b", "stroke-width": 8 }, eclair);
    D.el("line", { x1: -38, y1: -38, x2: 38, y2: 38, stroke: "#c0392b", "stroke-width": 8, "stroke-linecap": "round" }, eclair);

    /* la soupape sur le tube de la bouteille ; son évent (gros tube) monte vers l'extérieur */
    const SC = 2.8, sv = D.el("g", {}, g);
    D.etiquette(sv, 600, 212, "l'extérieur", { "text-anchor": "end", fill: "#fffdf8" });
    const VENT = [[TX + 28, TY - 31], [662, TY - 31], [662, 200]];
    polyligne(sv, VENT, "#8a4a24", 30, { "stroke-linecap": "butt" }); polyligne(sv, VENT, "#f4f8fc", 20, { "stroke-linecap": "butt" });
    D.el("rect", { x: 644, y: 186, width: 36, height: 14, rx: 4, fill: "#55616f" }, sv);
    D.image(sv, "soupape", TX - 7 * SC, TY - 31 * SC, 20 * SC, 40 * SC);
    const anneau = D.el("circle", { cx: TX, cy: TY - 30, r: 40, fill: "none", stroke: "#e2662c", "stroke-width": 6 }, sv);
    D.etiquette(sv, TX - 52, 300, "soupape", { "text-anchor": "end" });
    const evt = parcours(VENT), gEvent = D.el("g", {}, g);
    const MV = [0, 1, 2, 3, 4, 5, 6, 7].map(i => ({ s: i / 8, maj: D.mol(gEvent) }));
    const rb = D.alea(5), BF = [];
    for (let i = 0; i < 20; i++) BF.push({ b: i % 4, j: rb(), dy: rb() - 0.5, dx: rb() - 0.5, maj: D.mol(gEvent) });

    /* ventilation + détecteur, posés en bas du mur (phrase 5) */
    const fin = D.el("g", {}, g), finEt = D.el("g", {}, g);
    D.etiquette(finEt, 100, 580, "ventilation", { "text-anchor": "middle" });
    D.el("rect", { x: 50, y: 592, width: 100, height: 100, rx: 10, fill: "#e7edf4", stroke: "#4e5a66", "stroke-width": 4 }, fin);
    const vent2 = D.ventilateur(fin, 100, 642, 38);
    const chev = [0, 1, 2].map(() => D.chevron(fin));
    D.etiquette(finEt, 425, 580, "détecteur", { "text-anchor": "middle" });
    D.el("rect", { x: 380, y: 592, width: 90, height: 100, rx: 10, fill: "#fff", stroke: "#4e5a66", "stroke-width": 4 }, fin);
    const voyant = D.el("circle", { cx: 425, cy: 624, r: 10, stroke: "#2a3440", "stroke-width": 2 }, fin);
    D.texte(fin, 425, 672, "CO₂", { "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: D.BLEU, "font-family": SANS });

    const eBout = plaque(g, 385, 470, ["bouteille"], { taille: 30 });
    const trBout = D.trait(g, 432, 460, 556, 412, "#637285");
    const mila = D.heroine(g, { r: 30 });
    const pas = pastilles(g, c, 800, "middle", [
      ["même éteinte : sous pression", D.ORANGE, [2, 0], [2, 1.0]],
      ["le groupe garde la pression sous le rouge", "#2f6fb8", [3, 0.1], [3, 1.0]],
      ["coupure de courant", "#c0392b", [4, 0.04], [4, 0.4]],
      ["la soupape s'ouvre : c'est prévu", "#1e7e54", [4, 0.46], [4, 1.0]],
      ["le local : ventilé et surveillé", D.BLEU, [5, 0.05], "fin"]]);

    const tCut = c.T[4] + 0.3, tOuvre = c.A(4, 0.5), tOn = c.T[3] + 0.2;
    // 57 bar à 20 °C ; le groupe la tient sous le tarage ; à la coupure elle remonte jusqu'au tarage et la soupape s'ouvre (elle ne dépasse pas)
    const bar = t => D.courbe([[0, 26], [c.A(1, 0.1), 26], [c.A(1, 0.85), 57], [c.A(3, 0.35), 57], [c.A(3, 0.9), 45], [tCut + 0.5, 45], [tOuvre, TARAGE + 0.6], [tOuvre + 1.2, TARAGE + 0.9]], t);
    const tLocal = () => 20; // le local reste à 20 °C (le texte le dit)
    return function (t) {
      op(nuit, 0.14 * doux(t, 0.3, 2.5));
      astres.setAttribute("opacity", doux(t, 0.3, 2.5).toFixed(2));
      lune.setAttribute("transform", "translate(1060 " + D.lerp(236, 190, doux(t, 0.3, 3)).toFixed(1) + ")");
      etoiles.forEach((e, i) => op(e, 0.55 + 0.45 * Math.sin(t * 1.7 + i * 1.9)));
      // les instruments
      const ouvert = doux(t, tOuvre - 0.05, 0.5);
      const trem = Math.sin(t * 9) * 0.35 + ouvert * Math.sin(t * 5.5) * 1.6;
      const v = bar(t) + ouvert * Math.sin((t - tOuvre) * 5.5) * 0.7;
      cad.maj(v, trem);
      op(tarage, doux(t, c.T[3] - 0.2, 0.6));
      const tl = tLocal(t);
      op(TH, doux(t, c.T[1] - 0.2, 0.6));
      mercure.setAttribute("y", yT(tl).toFixed(1)); mercure.setAttribute("height", (630 - yT(tl)).toFixed(1));
      valT.textContent = Math.round(tl) + " °C";
      // le groupe de maintien
      op(gmEt, doux(t, c.T[3] - 0.3, 0.6));
      const marche = t > tOn && t < tCut, a0 = (tCut - tOn) * 640, tau = 0.5;
      vent(t < tCut ? Math.max(0, t - tOn) * 640 : a0 + 640 * tau * (1 - Math.exp(-(t - tCut) / tau)));
      lampe.setAttribute("fill", marche ? "#2fa35b" : "#5b6573");
      cir.surligne("bouteille", t > c.T[3] + 0.2 && t < c.E[4]);
      const bo = D.fenetre(t, c.T[3] + 0.1, c.E[3] + 0.3, 0.5); op(eBout, bo); op(trBout, bo);
      gFroid.setAttribute("opacity", D.fenetre(t, tOn + 0.2, tCut, 0.4).toFixed(2));
      MF.forEach(m => { const [x, y] = froid.at(D.frac(m.s + (t - tOn) * 150 / froid.long) * froid.long); m.maj(x, y, 0.08, true, 1); });
      // le courant coupé
      const e = doux(t, tCut, 0.3), clig = t < tCut + 1 ? (Math.floor((t - tCut) * 9) % 2 ? 0.35 : 1) : 1;
      op(eclair, e * clig);
      eclair.setAttribute("transform", "translate(330 468) scale(" + (0.55 + 0.45 * e).toFixed(3) + ")");
      // la soupape, l'évent et les bouffées
      op(sv, doux(t, c.T[4] - 0.3, 0.6));
      op(anneau, ouvert * (0.5 + 0.5 * Math.sin((t - tOuvre) * 11)));
      sv.setAttribute("transform", ouvert > 0.5 ? "translate(" + (Math.sin(t * 40) * 1.3).toFixed(1) + " 0)" : "");
      op(gEvent, ouvert);
      MV.forEach(m => { const [x, y] = evt.at(D.frac(m.s + t * 0.9) * evt.long); m.maj(x, y, 0.3, true, 1); });
      BF.forEach(m => {
        const a = D.frac((t + m.b * 0.4) / 1.6 + m.j * 0.06);
        m.maj(666 + a * 250 + m.dx * 70 * (0.3 + a), D.borne(176 - 6 * a + m.dy * 78 * (0.3 + a), 154, 226), 0.3, true, Math.pow(1 - a, 0.7) * D.lisse(a * 8));
      });
      // ventilation et détecteur
      const f = doux(t, c.T[5] - 0.3, 0.6);
      op(finEt, f);
      vent2(Math.max(0, t - c.T[5]) * 600);
      chev.forEach((ch, i) => { const a = D.frac(t * 0.5 + i / 3); ch(320 - a * 150, 642, 90, "#2f6fb8", D.fenetre(a, 0, 1, 0.2) * f); });
      const alerte = t > c.A(5, 0.35);
      voyant.setAttribute("fill", alerte ? (D.frac(t * 1.1) < 0.65 ? "#2fa35b" : "#b9c4d0") : "#9aa7b5");
      // les pastilles et l'héroïne
      montrer(pas, t);
      const humeur = t > c.A(4, 0.05) && t < c.E[4] + 0.5 ? "surprise" : "sourire";
      mila({ x: 780, y: 445 + Math.sin(t * 2) * 4, s: 1.1, t: t, temp: 0.4, etat: "liquide", humeur: humeur, regard: [1, -0.2] });
      return { temp: 0.4, etat: "liquide", humeur: humeur };
    };
  };

  /* ---------- 10 · la fuite : le CO₂ est plus lourd que l'air ---------- */
  S.fuite = function (g, c) {
    const SOL = 708, RX = 700, LIQ = D.couleur(0.3, false), HMAX = 150;
    D.el("rect", { x: 0, y: SOL, width: 1600, height: 8, fill: "#55616f" }, g);
    mur(g, 0, 150, SOL, 30); mur(g, 1570, 290, SOL, 30);                      // les murs, que le tube traverse
    D.tube(g, 0, 290, 1600, 110, "cuivre");                                   // intérieur y 300 → 390
    const liq = D.liquide(g, { x0: 0, x1: 1600, yh: 300, yb: 390, niveau: () => 0.62, couleur: () => LIQ });
    const flux = D.courant(g, 0, 1600, 300, 390, 14, 41);
    // le raccord : deux collerettes et un écrou
    D.el("rect", { x: 646, y: 282, width: 108, height: 126, rx: 8, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 3 }, g);
    D.el("rect", { x: 668, y: 274, width: 64, height: 142, rx: 8, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 3 }, g);
    [296, 345, 394].forEach(y => D.el("line", { x1: 668, x2: 732, y1: y, y2: y, stroke: "#7c5c18", "stroke-width": 2 }, g));

    /* le voile de CO₂ : dégradé vertical doux + fondu sur les côtés (masque) ; AUCUNE surface qui ondule */
    const defs = D.el("defs", {}, g), gv = ident("voile"), gh = ident("bord"), mk = ident("masque");
    const grad = D.el("linearGradient", { id: gv, gradientUnits: "userSpaceOnUse", x1: 0, x2: 0, y1: SOL, y2: SOL - HMAX }, defs);
    [[0, 0.62], [0.55, 0.36], [1, 0]].forEach(([o, a]) => D.el("stop", { offset: o, "stop-color": "#6f8fd6", "stop-opacity": a }, grad));
    const lat = D.el("linearGradient", { id: gh, x1: 0, x2: 1, y1: 0, y2: 0 }, defs);
    [[0, 0], [0.16, 1], [0.84, 1], [1, 0]].forEach(([o, a]) => D.el("stop", { offset: o, "stop-color": "#fff", "stop-opacity": a }, lat));
    const masque = D.el("mask", { id: mk, maskUnits: "userSpaceOnUse", x: -200, y: 0, width: 2000, height: 770 }, defs);
    const mrect = D.el("rect", { y: 0, height: 770, fill: "url(#" + gh + ")" }, masque);
    const voile = D.el("rect", { x: -20, width: 1640, fill: "url(#" + gv + ")", mask: "url(#" + mk + ")" }, g);
    const H = t => D.courbe([[c.T[2], 0], [c.A(2, 0.95), 80], [c.E[3], 142], [c.A(4, 0.5), 142], [c.E[4], 100], [c.E[5], 35]], t);
    const SP = t => D.courbe([[c.T[2], 40], [c.A(2, 0.9), 1200]], t);

    /* les molécules d'air (blanches) : chassées vers le haut par le voile ; aucune dans la bande du tube */
    const ra = D.alea(19), AIR = [], gAir = D.el("g", {}, g);
    const mkAir = () => { const e = D.el("circle", { r: 7, fill: "#fff", stroke: "#7f8da0", "stroke-width": 2.2 }, gAir); return (x, y, o) => { pos(e, x, y); op(e, o); }; };
    const INTERDIT = [[610, 205, 180, 75], [1085, 395, 215, 75], [995, 580, 275, 95], [1395, 515, 190, 75], [15, 515, 170, 75], [1425, 585, 130, 120], [25, 585, 130, 120]];
    const dedans = (x, y) => INTERDIT.some(([a, b, w, h]) => x > a - 12 && x < a + w + 12 && y > b - 12 && y < b + h + 12);
    for (let i = 0; i < 60;) {
      const haut = i < 10, x = haut ? 40 + ra() * 1120 : 40 + ra() * 1520, y = haut ? 160 + ra() * 100 : 430 + ra() * 250, gg = ra() * 100, ph = ra() * TOUR;
      if (dedans(x, y)) continue;
      AIR.push({ x: x, y: y, g: gg, ph: ph, maj: mkAir() }); i++;
    }
    const TEMOIN = { x: 1010, y: 520, g: 40, ph: 1.3, maj: mkAir() };
    AIR.push(TEMOIN);

    /* les molécules de CO₂ du voile, au repos dans le sol ; le jet sort du raccord */
    const rv = D.alea(31), gCo = D.el("g", {}, g), CO = [], JET = [], gJet = D.el("g", {}, g);
    for (let i = 0; i < 80; i++) CO.push({ x: 20 + rv() * 1560, y: SOL - 14 - rv() * (HMAX - 24), ph: rv() * TOUR, maj: D.mol(gCo) });
    for (let i = 0; i < 16; i++) JET.push({ dx: -160 + rv() * 340, ph: i / 16, maj: D.mol(gJet) });

    /* le détecteur (droite) et la ventilation qui aspire en bas (gauche) : phrase 4 */
    const bas = D.el("g", {}, g);
    D.el("rect", { x: 1455, y: 596, width: 100, height: 96, rx: 10, fill: "#fff", stroke: "#4e5a66", "stroke-width": 4 }, bas);
    const voyant = D.el("circle", { cx: 1505, cy: 628, r: 11, stroke: "#2a3440", "stroke-width": 2 }, bas);
    D.texte(bas, 1505, 676, "CO₂", { "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: D.BLEU, "font-family": SANS });
    const ondes = [0, 1].map(() => D.el("circle", { cx: 1505, cy: 628, fill: "none", stroke: "#c0392b", "stroke-width": 4 }, bas));
    D.el("rect", { x: 45, y: 596, width: 100, height: 96, rx: 10, fill: "#e7edf4", stroke: "#4e5a66", "stroke-width": 4 }, bas);
    const vent = D.ventilateur(bas, 95, 644, 38);
    const chev = [0, 1, 2, 3].map(() => D.chevron(bas));

    const dessus = D.el("g", {}, g);
    const voisine = D.heroine(dessus, { r: 26, teinte: "#9b7fd1", sansHalo: true, dephasage: 0.4 });
    const autour = [0, 1, 2, 3, 4].map(() => D.mol(dessus));
    const mila = D.heroine(dessus, { r: 30 });

    /* étiquettes sur plaques (zone chargée : le sol et les molécules passent derrière) */
    const eRacc = plaque(g, RX, 246, ["raccord"], { taille: 32 });
    const eLourd = plaque(g, 1130, 624, ["CO₂ : plus lourd", "que l'air"], { taille: 30, bord: "#6f8fd6" });
    const eAir = plaque(g, 1190, 430, ["l'air"], { taille: 30, bord: "#7f8da0" });
    const traitAir = D.trait(g, 1190, 456, 1010, 520, "#7f8da0");
    const eDet = plaque(g, 1480, 548, ["détecteur"], { taille: 30 });
    const eVen = plaque(g, 105, 548, ["ventilation"], { taille: 30 });
    const pas = pastilles(g, c, 800, "middle", [
      ["PRP = 1", "#1e7e54", [1, 0.0], [1, 1.0]],
      ["sans odeur, ne brûle pas : A1", D.ORANGE, [3, 0.1], [3, 1.0]]]);
    // « chercher la cause → réparer → recharger », en suite
    const SUITE = [["chercher la cause", D.BLEU, 0.04], ["réparer", D.ORANGE, 0.36], ["recharger", "#1e7e54", 0.68]].map(([s, coul, f]) => ({ g: D.pastille(g, 0, 748, s, coul, 30, "start"), f: f }));
    const FL = D.texte(g, 0, 748, "→", { "font-size": 36, "font-weight": 700, fill: D.BLEU, "font-family": SANS }), FL2 = D.texte(g, 0, 748, "→", { "font-size": 36, "font-weight": 700, fill: D.BLEU, "font-family": SANS });
    const largeur = SUITE.reduce((a, p) => a + p.g.largeur, 0) + 2 * 64;
    let xx = 800 - largeur / 2;
    SUITE.forEach((p, i) => {
      p.g.setAttribute("transform", "translate(" + xx.toFixed(1) + " 0)"); p.x = xx; xx += p.g.largeur;
      if (i < 2) { (i ? FL2 : FL).setAttribute("x", (xx + 32).toFixed(1)); (i ? FL2 : FL).setAttribute("text-anchor", "middle"); xx += 64; }
    });

    const tSort = c.A(0, 0.5), tFin = tSort + 3.4;
    const CH = (a, b, c1, d) => (k => { // cubique de Bézier : P0 → P3
      const u = 1 - k;
      return [u * u * u * a[0] + 3 * u * u * k * b[0] + 3 * u * k * k * c1[0] + k * k * k * d[0], u * u * u * a[1] + 3 * u * u * k * b[1] + 3 * u * k * k * c1[1] + k * k * k * d[1]];
    });
    const route = CH([480, 350], [690, 350], [712, 440], [810, 668]);
    return function (t) {
      flux(t, 90);
      const h = H(t), sp = SP(t), haut = SOL - h;
      // le voile
      voile.setAttribute("y", (haut - 4).toFixed(1)); voile.setAttribute("height", (h + 4 + 10).toFixed(1));
      grad.setAttribute("y2", (haut - 4).toFixed(1));
      mrect.setAttribute("x", (RX - sp).toFixed(1)); mrect.setAttribute("width", (2 * sp).toFixed(1));
      op(voile, h > 1 ? 1 : 0);
      CO.forEach(m => {
        const vu = D.lisse((sp * 0.9 - Math.abs(m.x - RX)) / 140) * D.lisse((m.y - haut) / 26);
        m.maj(m.x + Math.sin(t * 0.8 + m.ph) * 9, m.y + Math.cos(t * 1.1 + m.ph) * 5, 0.34, true, vu);
      });
      // l'air chassé vers le haut
      AIR.forEach(a => {
        const atteint = D.lisse((sp - Math.abs(a.x - RX)) / 220), cible = Math.min(a.y, haut - 16 - a.g * 0.9);
        const y = a.y > 420 ? D.lerp(a.y, cible, atteint) : a.y;
        a.maj(a.x + Math.sin(t * 0.9 + a.ph) * 7, y + Math.cos(t * 1.2 + a.ph) * 5, 1);
      });
      const yT = TEMOIN.y > 420 ? D.lerp(TEMOIN.y, Math.min(TEMOIN.y, haut - 16 - TEMOIN.g * 0.9), D.lisse((sp - Math.abs(TEMOIN.x - RX)) / 220)) : TEMOIN.y;
      traitAir.setAttribute("x2", (TEMOIN.x + Math.sin(t * 0.9 + TEMOIN.ph) * 7).toFixed(1)); traitAir.setAttribute("y2", (yT + Math.cos(t * 1.2 + TEMOIN.ph) * 5 - 9).toFixed(1));
      // le jet qui sort du raccord
      const jet = doux(t, c.A(0, 0.2), 0.4) * (1 - doux(t, c.A(5, 0.5), 0.8));
      JET.forEach(m => {
        const q = D.frac(m.ph + t * 0.62), k = Math.pow(q, 1.5);
        m.maj(RX + m.dx * q + Math.sin(q * 9 + m.ph * 6) * 6, 406 + (SOL - 18 - 406) * k, 0.34, true, jet * D.fenetre(q, 0, 1, 0.1));
      });
      // la voisine s'échappe ; l'héroïne reste dans le tube
      const q = D.borne((t - tSort) / (tFin - tSort), 0, 1), kq = D.lisse(q);
      let vx, vy;
      if (t < tSort) { vx = D.courbe([[0, 470], [tSort, 480]], t); vy = 348 + Math.sin(t * 2) * 3; } else [vx, vy] = route(kq);
      voisine({ x: vx, y: vy + (q >= 1 ? Math.sin(t * 1.6) * 5 : 0), s: 0.9, t: t, humeur: q > 0 && q < 1 ? "surprise" : "sourire", regard: [1, -0.5] });
      autour.forEach((m, i) => {
        const a = t * 1.5 + i * TOUR / 5, o = D.lisse((t - tSort - 0.6) / 0.8);
        m(vx + Math.cos(a) * 46, vy + Math.sin(a) * 40, 0.34, true, o);
      });
      const mx = D.courbe([[0, 120], [c.E[0], 330]], t), triste = t > c.A(0, 0.4) && t < c.E[3];
      mila({ x: mx, y: liq.surface(mx, t) + 2 + Math.sin(t * 2) * 3, s: 0.8, t: t, temp: 0.4, etat: "liquide", regard: [1, t > c.A(0, 0.2) ? -0.6 : 0],
        humeur: t > c.A(0, 0.2) && t < c.A(0, 0.4) ? "surprise" : triste ? "triste" : "sourire" });
      liq.maj(t);
      // étiquettes
      op(eRacc, doux(t, 0.3, 0.6) * (1 - doux(t, c.T[2], 0.6)));
      op(eLourd, D.fenetre(t, c.A(2, 0.5), c.E[3], 0.5));
      const air = D.fenetre(t, c.A(3, 0.15), c.E[3] + 1.0, 0.5);
      op(eAir, air); op(traitAir, air);
      // détecteur et ventilation
      const b = doux(t, c.T[4] - 0.2, 0.6), alarme = D.lisse((t - c.A(4, 0.2)) / 0.3) * D.lisse((h - 52) / 18); // rouge tant que le voile atteint le détecteur
      op(bas, b); op(eDet, b); op(eVen, doux(t, c.A(4, 0.4), 0.6));
      voyant.setAttribute("fill", alarme > 0.5 ? (D.frac(t * 1.6) < 0.6 ? "#d6402a" : "#7a1f14") : "#2fa35b");
      ondes.forEach((o, i) => { const a = D.frac(t * 0.9 + i / 2); o.setAttribute("r", (14 + a * 12).toFixed(1)); op(o, alarme * (1 - a) * 0.8); });
      const marche = doux(t, c.A(4, 0.45), 0.5);
      vent(Math.max(0, t - c.A(4, 0.45)) * 620 * marche);
      chev.forEach((ch, i) => { const a = D.frac(t * 0.45 + i / 4); ch(410 - a * 220, 644, 90, "#2f6fb8", D.fenetre(a, 0, 1, 0.2) * marche); });
      // pastilles
      montrer(pas, t);
      SUITE.forEach(p => op(p.g, doux(t, c.A(5, p.f), 0.35)));
      op(FL, doux(t, c.A(5, 0.2), 0.3)); op(FL2, doux(t, c.A(5, 0.52), 0.3));
      return { temp: 0.4, etat: "liquide", humeur: t > c.A(0, 0.4) && t < c.E[3] ? "triste" : "sourire" };
    };
  };

  /* ---------- 11 · la neige carbonique ---------- */
  S.neige = function (g, c) {
    const TC = 495, PX = 900, PY = 400, LV = 112;           // axe du tube ; pivot du levier ; sa longueur
    const defs = D.el("defs", {}, g), FLO = ident("flocon");
    const fl = D.el("g", { id: FLO }, defs);
    const hexa = [0, 1, 2, 3, 4, 5].map(k => [Math.cos(k * Math.PI / 3) * 10, Math.sin(k * Math.PI / 3) * 10]);
    D.el("polygon", { points: hexa.map(p => p.map(v => v.toFixed(1)).join(",")).join(" "), fill: "#fff", stroke: "#8fb4dc", "stroke-width": 1.8 }, fl);
    [0, 1, 2].forEach(k => D.el("line", { x1: -(hexa[k][0]), y1: -(hexa[k][1]), x2: hexa[k][0], y2: hexa[k][1], stroke: "#8fb4dc", "stroke-width": 1.6 }, fl));
    const flocon = (parent, x, y, a, s) => D.el("use", { href: "#" + FLO, transform: "translate(" + x + " " + y + ") rotate(" + a + ") scale(" + s + ")" }, parent);

    /* l'extérieur : mur et zone teintée ; le tuyau traverse */
    D.el("rect", { x: 1264, y: 290, width: 336, height: 418, fill: "#bcd9f0", opacity: 0.35 }, g);
    mur(g, 1236, 290, 708, 28);
    D.el("rect", { x: 0, y: 708, width: 1600, height: 8, fill: "#55616f" }, g);
    D.etiquette(g, 1432, 348, "l'extérieur", { "text-anchor": "middle" });

    /* le tube (coupe) et la vanne de vidange */
    D.tube(g, 0, 430, 850, 130, "cuivre");                                   // intérieur y 440 → 550
    const liqG = D.el("g", {}, g);
    let niv = 0.62;
    const liq = D.liquide(liqG, { x0: 0, x1: 850, yh: 440, yb: 550, niveau: () => niv, couleur: () => D.couleur(0.3, false) });
    const gB = D.el("g", {}, g), bul = D.bulles(gB, 34, 31, false);
    const gV = D.el("g", {}, g), rv = D.alea(29), VAP = [];
    for (let i = 0; i < 20; i++) VAP.push({ x: 40 + rv() * 770, y: 452 + rv() * 90, ph: rv() * TOUR, maj: D.mol(gV) });
    const brume = D.el("rect", { x: 0, y: 440, width: 850, height: 110, fill: "#b9d2ea" }, g);
    const gF = D.el("g", {}, g), FLO_L = [], rf = D.alea(77), tD = c.A(3, 0.18), tF = c.E[4] - 0.3;
    for (let col = 0; col < 19; col++) for (let rw = 0; rw < 4; rw++) {
      const x = 834 - col * 21 + (rw % 2 ? 9 : 0) + (rf() - 0.5) * 5, y = 461 + rw * 24 + (rw % 2 ? 4 : 0) + (rf() - 0.5) * 3, s = 1.0 + rf() * 0.3, a = rf() * 60;
      FLO_L.push({ s: s, a: a, ta: tD + col / 18 * (tF - tD) + rf() * 0.7, e: flocon(gF, x, y, a, 0.01), x: x, y: y });
    }
    D.el("rect", { x: 850, y: 438, width: 100, height: 114, rx: 10, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 3 }, g);
    D.el("rect", { x: 888, y: 404, width: 24, height: 36, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    D.el("circle", { cx: PX, cy: PY, r: 15, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 3 }, g);
    D.tube(g, 950, 462, 392, 66, "noir");                                   // le tuyau vers l'extérieur
    const levier = D.el("g", {}, g);
    D.el("line", { x1: 0, y1: 0, x2: LV, y2: 0, stroke: "#c0392b", "stroke-width": 14, "stroke-linecap": "round" }, levier);
    D.el("circle", { cx: LV, cy: 0, r: 16, fill: "#a22c1d", stroke: "#6b1a10", "stroke-width": 3 }, levier);
    D.el("circle", { cx: PX, cy: PY, r: 8, fill: "#2a3440" }, g);
    // le givre de la vanne (phrase 4)
    const givre = D.el("g", {}, g);
    D.el("rect", { x: 846, y: 434, width: 108, height: 122, rx: 14, fill: "#fff", opacity: 0.86 }, givre);
    [[858, 560], [884, 566], [915, 562], [940, 558]].forEach(([x, y], i) => D.el("polygon", { points: (x - 7) + "," + (y - 6) + " " + (x + 7) + "," + (y - 6) + " " + x + "," + (y + 14 + (i % 2) * 8), fill: "#e3f1ff", stroke: "#8fb4dc", "stroke-width": 2 }, givre));
    [[846, 440], [954, 446], [848, 548], [952, 550], [900, 436]].forEach(([x, y]) => flocon(givre, x, y, x, 0.9));

    /* la sortie : molécules de vapeur dans le tuyau puis dehors */
    const GAZ = parcours([[958, TC], [1330, TC], [1590, TC - 40]]), gG = D.el("g", {}, g), MG = [];
    for (let i = 0; i < 26; i++) MG.push({ s: i / 26, dy: (rv() - 0.5), maj: D.mol(gG) });

    /* les deux cadrans (0 → 60 bar) : la bande bleue = sous 5,18 bar, plus de liquide possible */
    const fmt = v => (v < 10 ? v.toFixed(1).replace(".", ",") : String(Math.round(v))) + " bar";
    const optC = cx => ({ cx: cx, cy: 268, R: 104, max: 60, pas: 5, nombres: [0, 30, 60], bandes: [[0, 5.18, "#7fb4e6"]], fmt: fmt });
    const gA = D.el("g", {}, g), cA = cadran(gA, optC(340));
    const gB2 = D.el("g", {}, g), cB = cadran(gB2, optC(640));
    [cA, cB].forEach(cd => { const [x1, y1] = cd.pt(5.18, 104 * 0.58), [x2, y2] = cd.pt(5.18, 104 * 0.98); D.el("line", { x1: x1.toFixed(1), y1: y1.toFixed(1), x2: x2.toFixed(1), y2: y2.toFixed(1), stroke: "#e2662c", "stroke-width": 5, "stroke-linecap": "round" }, cd.g); });
    const triple = D.el("g", {}, g);
    D.etiquette(triple, 216, 262, "5,18 bar", { "text-anchor": "end", "font-size": 30, "font-weight": 700, fill: "#b0501c" });
    D.etiquette(triple, 216, 296, "point triple", { "text-anchor": "end", "font-size": 30, "font-weight": 700, fill: "#b0501c" });
    /* le thermomètre du tube : la neige carbonique, c'est jusqu'à −78,5 °C */
    const TT = D.el("g", {}, g), yTh = v => 380 - (v + 80) * 1.6;
    D.etiquette(TT, 800, 168, "température", { "text-anchor": "middle", "font-size": 28 });
    const valTh = D.texte(TT, 800, 204, "", { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#10233c", "font-family": SANS });
    D.el("rect", { x: 788, y: 214, width: 24, height: 176, rx: 12, fill: "#f4f8fc", stroke: "#4e5a66", "stroke-width": 4 }, TT);
    [-80, -60, -40, -20, 0, 20].forEach(v => D.el("line", { x1: 764, x2: 782, y1: yTh(v), y2: yTh(v), stroke: "#4e5a66", "stroke-width": 3, "stroke-linecap": "round" }, TT));
    const merc = D.el("rect", { x: 794, width: 12, fill: "#2f6fb8" }, TT);
    D.el("circle", { cx: 800, cy: 398, r: 20, fill: "#2f6fb8", stroke: "#4e5a66", "stroke-width": 4 }, TT);
    const capA = D.etiquette(g, 340, 414, "trop vite", { "text-anchor": "middle", fill: "#c0392b" });
    const capB = D.etiquette(g, 640, 414, "lentement", { "text-anchor": "middle", fill: "#1e7e54" });
    const bouche = D.etiquette(g, 650, 414, "tube bouché", { "text-anchor": "middle", fill: "#c0392b" });

    /* étiquettes sous le tube */
    const vanne1 = D.lignes(g, 905, 640, ["vanne de", "vidange"], { "text-anchor": "middle", "font-size": 32, fill: "#10233c", "font-family": SANS, "font-weight": 600 }, 36);
    const vanne2 = D.lignes(g, 905, 640, ["vanne", "givrée"], { "text-anchor": "middle", "font-size": 32, fill: "#c0392b", "font-family": SANS, "font-weight": 700 }, 36);
    const neige = D.el("g", {}, g);
    D.lignes(neige, 450, 636, ["neige carbonique,", "jusqu'à −78,5 °C"], { "font-size": 32, fill: "#10233c", "font-family": SANS, "font-weight": 700 }, 38);
    D.trait(neige, 600, 600, 600, 556, "#637285");

    /* le pictogramme « froid » (phrase 4) */
    const pict = D.el("g", {}, g);
    D.el("rect", { x: 40, y: 592, width: 350, height: 108, rx: 16, fill: "#fff4e5", stroke: "#d9731a", "stroke-width": 5 }, pict);
    const main = D.el("g", { transform: "translate(100 650) scale(0.82)" }, pict);
    [[-27, -18], [-9, -30], [9, -34], [27, -24]].forEach(([x, y]) => D.el("rect", { x: x - 7, y: y, width: 14, height: 14 - y + 8, rx: 7, fill: "#f1c7a0", stroke: D.BLEU, "stroke-width": 3 }, main));
    D.el("rect", { x: -34, y: -2, width: 68, height: 44, rx: 16, fill: "#f1c7a0", stroke: D.BLEU, "stroke-width": 3 }, main);
    D.el("ellipse", { cx: -38, cy: 22, rx: 9, ry: 18, fill: "#f1c7a0", stroke: D.BLEU, "stroke-width": 3, transform: "rotate(-30 -38 22)" }, main);
    const fla = D.el("g", { transform: "translate(108 664)" }, pict);
    [0, 1, 2].forEach(k => D.el("line", { x1: 0, y1: -26, x2: 0, y2: 26, stroke: "#2f6fb8", "stroke-width": 5, "stroke-linecap": "round", transform: "rotate(" + k * 60 + ")" }, fla));
    D.el("circle", { r: 5, fill: "#2f6fb8" }, fla);
    D.lignes(pict, 150, 640, ["brûle la peau", "par le froid"], { "font-size": 32, fill: "#8a3a05", "font-family": SANS, "font-weight": 700 }, 38);

    /* le technicien : un gantelet au bout d'un bras qui descend du haut */
    const tech = D.el("g", {}, g);
    D.el("rect", { x: -22, y: -700, width: 44, height: 666, fill: "#2a4f86", stroke: D.BLEU, "stroke-width": 3 }, tech);
    D.el("rect", { x: -27, y: -50, width: 54, height: 22, rx: 5, fill: D.BLEU }, tech);
    D.el("rect", { x: -30, y: -32, width: 60, height: 70, rx: 22, fill: "#e8a23a", stroke: D.BLEU, "stroke-width": 3 }, tech);
    D.el("ellipse", { cx: -33, cy: 4, rx: 10, ry: 18, fill: "#e8a23a", stroke: D.BLEU, "stroke-width": 3, transform: "rotate(25 -33 4)" }, tech);
    [-8, 8].forEach(x => D.el("path", { d: "M " + x + " 18 q 0 14 0 22", stroke: "#a86d16", "stroke-width": 3, fill: "none", "stroke-linecap": "round" }, tech));

    const mila = D.heroine(g, { r: 30 });
    const pas = pastilles(g, c, 800, "middle", [["vider lentement : procédure du constructeur", "#1e7e54", [5, 0.1], "fin"]]);

    // la température du tube suit la pression (saturation du CO₂ : 34,8 bar ≈ 0 °C ; 5,18 bar ≈ −56,6 °C ; 1 bar ≈ −78,5 °C)
    const SAT = [[1, -78.5], [2, -69], [3, -63], [5.18, -56.6], [6.8, -50], [10, -40], [14.3, -30], [19.7, -20], [26.5, -10], [34.8, 0]];
    const tSat = p => D.courbe(SAT, p, true);
    // temps clés
    const T5 = c.T[5], tS = [T5 + 0.9, T5 + 1.9, T5 + 2.9, T5 + 3.8];
    const bar = t => D.courbe([[0, 30], [c.A(0, 0.85), 30], [c.E[1], 14], [c.A(2, 0.25), 8], [c.A(2, 0.55), 4.2], [c.E[2], 2.4], [c.E[3], 1.0], [c.D, 1.0]], t);
    const barB = t => D.courbe([[T5 - 0.2, 30], [tS[0] + 0.1, 30], [tS[0] + 0.5, 25], [tS[1] + 0.1, 25], [tS[1] + 0.5, 20], [tS[2] + 0.1, 20], [tS[2] + 0.5, 15], [tS[3] + 0.1, 15], [tS[3] + 0.5, 10]], t);
    const theta = t => D.courbe([[0, -90], [c.A(0, 0.62), -90], [c.A(0, 0.86), 0], [c.A(4, 0.7), 0], [c.A(4, 0.78), -90], [tS[0], -90], [tS[0] + 0.4, -75], [tS[1], -75], [tS[1] + 0.4, -60],
      [tS[2], -60], [tS[2] + 0.4, -45], [tS[3], -45], [tS[3] + 0.4, -30]], t);
    const haut = t => D.courbe([[0, -480], [c.A(0, 0.08), -480], [c.A(0, 0.5), 0], [c.A(4, 0.2), 0], [c.A(4, 0.5), -480], [T5 - 0.1, -480], [T5 + 0.6, 0]], t);
    const debit = t => D.courbe([[0, 0], [c.A(0, 0.78), 0], [c.A(0, 0.95), 1], [c.A(2, 0.5), 1], [c.E[3], 0.45], [c.A(4, 0), 0.1], [c.A(4, 0.2), 0], [T5 + 1.0, 0], [T5 + 1.4, 0.35], [c.D, 0.35]], t);
    return function (t) {
      // le levier, le technicien
      const th = theta(t), tx = PX + LV * Math.cos(rad(th)), ty = PY + LV * Math.sin(rad(th));
      levier.setAttribute("transform", "translate(" + PX + " " + PY + ") rotate(" + th.toFixed(1) + ")");
      tech.setAttribute("transform", "translate(" + tx.toFixed(1) + " " + (ty + haut(t) + 4).toFixed(1) + ")");
      // la pression
      const reset = doux(t, T5 - 0.3, 0.7);
      const bA = bar(t);
      cA.maj(bA, Math.sin(t * 8) * 0.5); cB.maj(t < T5 - 0.2 ? 30 : barB(t), Math.sin(t * 8) * 0.4);
      op(gB2, doux(t, T5 - 0.1, 0.5)); op(capB, doux(t, T5, 0.5)); op(capA, doux(t, T5, 0.5));
      gA.setAttribute("opacity", (1 - 0.55 * doux(t, T5 - 0.1, 0.5)).toFixed(2));
      op(triple, doux(t, c.T[2], 0.5));
      op(bouche, D.fenetre(t, c.A(4, 0.35), T5 - 0.3, 0.4));
      const tp = D.lerp(tSat(bA), tSat(t < T5 - 0.2 ? 30 : barB(t)), reset);
      merc.setAttribute("y", yTh(tp).toFixed(1)); merc.setAttribute("height", (400 - yTh(tp)).toFixed(1));
      valTh.textContent = (tp < -0.5 ? "−" : "") + Math.abs(Math.round(tp)) + " °C";
      // le liquide, l'ébullition, la vapeur
      niv = D.courbe([[0, 0.62], [c.T[1], 0.62], [c.E[1], 0.46], [c.E[2], 0.12], [c.A(3, 0.12), 0], [T5 - 0.3, 0], [T5 + 0.7, 0.62]], t);
      liq.maj(t);
      const boil = D.fenetre(t, c.T[1], c.A(2, 0.85), 0.5);
      bul(t, (q, b) => { const x = 40 + q * 770; return [x, 546, liq.surface(x, t) + 3, boil * (niv > 0.1 ? 1 : 0)]; });
      VAP.forEach(m => {
        const surf = liq.surface(m.x, t), libre = surf - 446, vu = D.borne((libre - 24) / 20, 0, 1) * (1 - doux(t, c.A(3, 0.15), 1.0) * (1 - doux(t, T5 + 0.2, 0.8)));
        m.maj(m.x + Math.sin(t * 1.6 + m.ph) * 6, Math.min(m.y, surf - 14) + Math.cos(t * 1.9 + m.ph) * 4, 0.1, true, vu * D.borne(m.y / 500, 0.4, 1));
      });
      // les flocons : ils se forment en place et s'accumulent vers la vanne (phrases 3 et 4)
      FLO_L.forEach(f => {
        const k = doux(t, f.ta, 0.6) * (1 - reset);
        f.e.setAttribute("transform", "translate(" + f.x.toFixed(1) + " " + f.y.toFixed(1) + ") rotate(" + (f.a + (1 - k) * 40).toFixed(0) + ") scale(" + (f.s * k + 0.001).toFixed(3) + ")");
      });
      op(brume, 0.6 * doux(t, c.A(3, 0.05), 1.5) * (1 - reset));
      // la vanne givre, puis redevient nette
      op(givre, doux(t, c.T[4], 1.2) * (1 - reset));
      // le gaz qui sort
      const d = debit(t);
      MG.forEach((m, i) => {
        const [x, y] = GAZ.at(D.frac(m.s + t * 0.4) * GAZ.long), dehors = D.borne((x - 1340) / 250, 0, 1);
        m.maj(x, y + m.dy * (10 + 70 * dehors), 0.1, true, i / 26 < d ? D.fenetre(D.frac(m.s + t * 0.4), 0, 1, 0.04) : 0);
      });
      // étiquettes
      op(vanne1, 1 - doux(t, c.T[4], 0.5) + doux(t, T5, 0.5)); op(vanne2, doux(t, c.T[4], 0.5) * (1 - doux(t, T5 - 0.3, 0.5)));
      op(neige, doux(t, c.A(3, 0.3), 0.6) * (1 - doux(t, T5 - 0.3, 0.5)));
      op(pict, doux(t, c.A(4, 0.3), 0.6) * (1 - doux(t, T5 - 0.3, 0.5)));
      // l'héroïne
      const solide = t >= c.A(3, 0.2) && t < T5 - 0.3;
      const humeur = t < c.A(1, 0.2) ? "sourire" : solide || (t > c.A(2, 0.3) && t < T5 - 0.3) ? "froid" : t < T5 ? "surprise" : "sourire";
      const temp = solide ? 0 : D.borne(0.22 + tp * 0.014, 0, 0.5);
      mila({ x: 250, y: TC + Math.sin(t * 2) * 4, s: 1, t: t, temp: temp, etat: solide ? "solide" : "liquide", humeur: humeur, regard: [1, 0] });
      montrer(pas, t);
      return { temp: temp, etat: solide ? "solide" : "liquide", humeur: humeur };
    };
  };

  /* ---------- le tour en quatre étapes, puis les quatre états ---------- */
  S.resume = function (g, c) {
    const cir = D.circuit(g, 330, 150, 960, true);
    const VERBES = [["evaporateur", "1. bouillir", 1, "#2f6fb8"], ["compresseur", "2. comprimer", 2, "#c0392b"], ["refroidisseur", "3. refroidir", 3, D.ORANGE], ["detendeurHP", "4. détendre", 4, "#1e7e54"]];
    const gTxt = D.el("g", {}, g);
    const lignes = VERBES.map(([, mot, k, coul], i) => ({ k: k, t: D.texte(gTxt, 40, 215 + i * 56, mot, { "font-size": 42, "font-weight": 700, fill: coul, "font-family": TITRE }) }));
    const gEtat = D.el("g", {}, g), nomEtat = D.texte(gEtat, 175, 668, "", { "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: D.BLEU, "font-family": TITRE });
    const petite = D.heroine(g, { r: 30 }), grande = D.heroine(g, { r: 60 });

    /* l'état de la molécule selon sa place w sur la carte (0 → 15, puis le tour recommence) */
    const etatDe = w => w < 0.4 ? "liquide" : w < 1.2 ? "bout" : w < 3.5 ? "vapeur" : w < 8.05 ? "supercritique" : w < 9.3 ? "bout" : w < 13.3 ? "liquide" : "bout";
    const tempDe = w => D.courbe([[0, 0.08], [2, 0.14], [3, 0.16], [4.4, 0.95], [5.2, 0.95], [7.6, 0.5], [8, 0.45], [8.2, 0.22], [13, 0.22], [13.4, 0.08], [15.8, 0.08]], w, true);
    const humeurDe = w => w > 3.8 && w < 6.5 ? "chaud" : w > 8 && w < 8.8 ? "surprise" : w > 13.4 ? "froid" : "sourire";
    const nomDe = (etat, w) => etat === "bout" ? (w % 15 < 2 ? "je bous" : "liquide et vapeur") : etat;

    /* les quatre états (phrase 6) : quatre cartes, une par mot */
    const panneau = D.el("rect", { x: 118, y: 306, width: 1364, height: 356, rx: 30, fill: "#efe7d8" }, g);
    const CARTES = [
      { nom: "vapeur", etat: "vapeur", temp: 0.14, humeur: "sourire", cue: ["sortie de", "l'évaporateur"], f: 0.0 },
      { nom: "supercritique", etat: "supercritique", temp: 0.6, humeur: "chaud", cue: ["au-dessus de 31 °C", "et 73,8 bar"], f: 0.14 },
      { nom: "liquide", etat: "liquide", temp: 0.22, humeur: "sourire", cue: ["au fond de", "la bouteille"], f: 0.3 },
      { nom: "solide", etat: "solide", temp: 0, humeur: "froid", cue: ["neige carbonique,", "si on me vide", "trop vite"], f: 0.46 }].map((e, i) => {
      const cx = 144 + 158 + i * 332, cg = D.el("g", { "data-layout-allow-overlap": "" }, g); // cartes opaques posées sur la carte estompée : voulu
      D.el("rect", { x: cx - 158, y: 318, width: 316, height: 332, rx: 24, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, cg);
      const nom = D.texte(cg, cx, 522, e.nom, { "text-anchor": "middle", "font-size": 42, "font-weight": 700, fill: D.BLEU, "font-family": TITRE });
      const l = nom.getComputedTextLength ? nom.getComputedTextLength() : 0;
      if (l > 286) nom.setAttribute("font-size", (42 * 286 / l).toFixed(1));
      D.lignes(cg, cx, 562, e.cue, { "text-anchor": "middle", "font-size": 28, fill: "#10233c", "font-family": SANS, "font-weight": 600 }, 34);
      return { e: e, cx: cx, g: cg, maj: D.heroine(cg, { r: 52 }) };
    });
    const w0 = [[c.T[1], 0], [c.E[1], 2], [c.T[2], 2], [c.E[2], 5], [c.T[3], 5], [c.E[3], 7.6], [c.T[4], 7.6], [c.E[4], 10.4], [c.T[5], 10.4], [c.E[5] - 0.3, 15.8]];
    return function (t) {
      const w = D.courbe(w0, t, true), etat = etatDe(w), temp = tempDe(w), humeur = humeurDe(w);
      const fondu = 1 - doux(t, c.T[6] - 0.2, 0.8);
      cir.g.setAttribute("opacity", (0.25 + 0.75 * fondu).toFixed(2));
      op(panneau, doux(t, c.T[6] - 0.2, 0.8) * 0.94);
      op(gTxt, fondu); op(gEtat, fondu);
      // les organes de l'étape en cours
      const HL = { evaporateur: (t > c.T[1] && t < c.E[1] + 0.3) || (t > c.A(5, 0.55) && t < c.E[5] + 0.3), compresseur: t > c.T[2] && t < c.E[2] + 0.3,
        refroidisseur: t > c.T[3] && t < c.E[3] + 0.3, detendeurHP: t > c.T[4] && t < c.A(4, 0.5), bouteille: t > c.A(4, 0.45) && t < c.E[4] + 0.3,
        detendeur: t > c.T[5] && t < c.A(5, 0.55) };
      for (const nom in HL) cir.surligne(nom, HL[nom] && t < c.T[6]);
      lignes.forEach(l => op(l.t, t > c.T[l.k] - 0.1 ? 1 : 0.14));
      const [px, py] = cir.ecran(...D.circuitPoint(w));
      petite({ x: px, y: py, s: 0.85, t: t, temp: temp, etat: etat, humeur: humeur, ecrase: D.fenetre(w, 3.0, 3.9, 0.4) * 0.7, op: fondu });
      grande({ x: 175, y: 535 + Math.sin(t * 2.2) * 8, t: t, temp: temp, etat: etat, humeur: humeur, regard: [1, 0], op: fondu });
      nomEtat.textContent = nomDe(etat, w);
      // k6 : les quatre états
      CARTES.forEach(k => {
        const a = doux(t, c.A(6, k.e.f), 0.5), s = 0.7 + 0.3 * a;
        op(k.g, a);
        k.g.setAttribute("transform", "translate(" + k.cx + " 484) scale(" + s.toFixed(3) + ") translate(" + -k.cx + " -484)");
        k.maj({ x: k.cx, y: 414 + Math.sin(t * 2 + k.cx) * 5, t: t, temp: k.e.temp, etat: k.e.etat, humeur: k.e.humeur, regard: [0, 0] });
      });
      return {};
    };
  };
})();
