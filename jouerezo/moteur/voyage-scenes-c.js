/* =====================================================================
   voyage-scenes-c.js — le détendeur thermostatique, la fuite,
   la récupération, la famille
   ---------------------------------------------------------------------
   Même contrat que voyage-scenes-a.js. Zones interdites : en-tête
   (x < 760, y < 140) et carte (x > 1200, y < 285).
   DÉTENDEUR : disposition réelle d'un thermostatique — la membrane, en
   haut, pousse une tige vers le BAS ; le pointeau est SOUS le siège et
   s'en écarte en descendant (ça ouvre) ; un ressort le remonte (ça ferme).
   Le bulbe est montré en encart (il est en sortie d'évaporateur).
   FAMILLE : codes et familles seulement, aucun chiffre de PRP ici.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const TOUR = 2 * Math.PI;
  const plan = (maj, g) => { if (maj.g.parentNode !== g) g.appendChild(maj.g); };

  /* ---------- 8 · le détendeur thermostatique ---------- */
  S.detendeur = function (g, c) {
    const TIEDE = D.couleur(0.45, false), FROID = D.couleur(0.05, false);
    D.el("rect", { x: 60, y: 398, width: 600, height: 84, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: 940, y: 470, width: 600, height: 92, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: 640, y: 300, width: 320, height: 360, rx: 22, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 3 }, g);
    D.el("path", { d: "M 730 300 A 80 70 0 0 1 890 300 Z", fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 3 }, g);
    D.el("rect", { x: 60, y: 410, width: 770, height: 60, fill: "#f4f8fc" }, g);
    D.el("rect", { x: 760, y: 482, width: 780, height: 68, fill: "#f4f8fc" }, g);
    const fondHP = D.el("g", {}, g);
    D.el("rect", { x: 60, y: 410, width: 770, height: 60, fill: TIEDE, opacity: 0.82 }, g);
    const fluxHP = D.courant(g, 60, 820, 410, 470, 8, 21);
    D.el("rect", { x: 802, y: 470, width: 16, height: 14, fill: TIEDE, opacity: 0.9 }, g);
    const vapBP = D.el("g", {}, g), fondBP = D.el("g", {}, g);
    const bp = D.liquide(g, { x0: 760, x1: 1540, yh: 482, yb: 550, niveau: x => x < 830 ? 0.75 : 0.5, couleur: () => FROID });
    const bulBP = D.bulles(D.el("g", {}, g), 26, 31, false);
    const r = D.alea(29), V = [];
    for (let i = 0; i < 18; i++) V.push({ s: r(), y: r(), maj: D.mol(vapBP) });
    D.el("rect", { x: 760, y: 470, width: 40, height: 12, fill: "#8a6a1f" }, g);
    D.el("rect", { x: 820, y: 470, width: 40, height: 12, fill: "#8a6a1f" }, g);
    const tige = D.el("rect", { x: 808, y: 296, width: 4, height: 10, fill: "#3f4a55" }, g);
    const pointeau = D.el("path", { fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    const ressort = D.el("path", { fill: "none", stroke: "#5d6b7a", "stroke-width": 3.5 }, g);
    const membrane = D.el("path", { fill: "none", stroke: "#24384f", "stroke-width": 5, "stroke-linecap": "round" }, g);
    // l'encart du bulbe : sur le tube de sortie de l'évaporateur
    const capillaire = D.el("path", { d: "M 736 282 Q 600 270 600 380 V 580 Q 600 634 420 634", fill: "none", "stroke-width": 5, "stroke-linecap": "round" }, g);
    D.el("rect", { x: 80, y: 650, width: 480, height: 44, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: 80, y: 660, width: 480, height: 24, fill: "#e9f1fa" }, g);
    const bulbe = D.el("rect", { x: 260, y: 618, width: 160, height: 32, rx: 12, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, g);
    const chaudBulbe = D.el("rect", { x: 260, y: 618, width: 160, height: 32, rx: 12, fill: "#ff6b35" }, g);
    [292, 388].forEach(x => D.el("rect", { x: x, y: 612, width: 10, height: 44, rx: 3, fill: "#5d6b7a" }, g));
    const dessus = D.el("g", {}, g);
    D.etiquette(g, 60, 385, "haute pression · liquide tiède");
    D.etiquette(g, 1540, 455, "basse pression · très froide", { "text-anchor": "end" });
    D.etiquette(g, 900, 250, "membrane"); D.trait(g, 896, 258, 860, 294);
    D.etiquette(g, 980, 642, "pointeau"); D.trait(g, 976, 634, 828, 512);
    D.etiquette(g, 585, 604, "capillaire", { "text-anchor": "end" });
    D.etiquette(g, 245, 640, "bulbe", { "text-anchor": "end" });
    D.etiquette(g, 320, 730, "sortie de l'évaporateur", { "text-anchor": "middle" });
    const flash = D.lignes(g, 1300, 612, ["une partie bout :", "ça refroidit le reste"], { "text-anchor": "middle", "font-size": 32, fill: "#2f6fb8", "font-weight": 700, "font-family": "Calibri, Arial, sans-serif" }, 40);
    const ouvre = D.pastille(g, 1540, 724, "vapeur trop chaude : le détendeur ouvre plus", D.ORANGE, 28, "end");
    const mila = D.heroine(fondHP, { r: 30 });
    const tPousse = c.A(5, 0.45);
    return function (t) {
      const ecart = 8 + 8 * D.lisse((t - tPousse) / 0.8) - 4 * D.lisse((t - c.T[6]) / 1);
      const tip = 474 + ecart;
      tige.setAttribute("y", 300 + ecart * 0.8); tige.setAttribute("height", (tip - 300 - ecart * 0.8).toFixed(1));
      pointeau.setAttribute("d", "M 810 " + tip.toFixed(1) + " L 794 " + (tip + 26).toFixed(1) + " L 826 " + (tip + 26).toFixed(1) + " Z");
      let d = "M 810 " + (tip + 26).toFixed(1);
      for (let k = 1; k <= 6; k++) d += " L " + (k % 2 ? 800 : 820) + " " + (tip + 26 + (548 - tip - 26) * k / 6).toFixed(1);
      ressort.setAttribute("d", d);
      membrane.setAttribute("d", "M 736 297 Q 810 " + (297 + ecart * 1.6).toFixed(1) + " 884 297");
      const pousse = D.fenetre(t, c.T[5], c.E[5] + 0.6);
      chaudBulbe.setAttribute("opacity", (0.55 * pousse).toFixed(2));
      capillaire.setAttribute("stroke", pousse > 0.5 && D.frac(t * 1.6) < 0.6 ? "#ff6b35" : "#b06a3b");
      ouvre.setAttribute("opacity", pousse.toFixed(2));
      flash.setAttribute("opacity", D.lisse((t - c.T[4]) / 0.5).toFixed(2));
      const vit = 50 + ecart * 9;
      fluxHP(t, vit); bp.maj(t);
      bulBP(t, q => { const x = 830 + q * 330; return [x, 548, bp.surface(x, t) + 3, 1]; });
      V.forEach(m => { const x = 830 + D.frac(m.s + t * vit / 1400) * 710; m.maj(x, 494 + m.y * 10, 0.08, true, D.borne((1540 - x) / 40, 0, 1)); });
      // l'héroïne : immergée dans le liquide HP, puis le passage, puis la basse pression
      const p = D.courbe([[c.T[2], 0.08], [c.E[2], 0.42], [c.A(3, 0.35), 0.48], [c.A(3, 0.85), 0.56], [c.E[4], 0.64], [c.E[6], 0.74], [c.D - 0.2, 1.05]], t);
      let x, y, s = 0.52, ec = 0, temp = 0.45;
      if (p < 0.48) { plan(mila, dessus); x = D.lerp(110, 790, p / 0.48); y = 440; }
      else if (p < 0.56) { plan(mila, dessus); const k = (p - 0.48) / 0.08; x = D.lerp(790, 840, k); y = D.lerp(444, 512, k); s = 0.4; ec = 0.7; temp = D.lerp(0.45, 0.1, k); }
      else { plan(mila, fondBP); const k = (p - 0.56) / 0.49; x = D.lerp(840, 1640, k); y = bp.surface(x, t) + 2; temp = 0.05; }
      const humeur = p > 0.47 && p < 0.58 ? "surprise" : p >= 0.58 && t < c.E[5] ? "froid" : "sourire";
      mila({ x: x, y: y, s: s, t: t, temp: temp, etat: "liquide", humeur: humeur, ecrase: ec, regard: [1, 0] });
      return { carte: 12.5 + 2.5 * D.borne(p, 0, 1), temp: temp, etat: "liquide", humeur: humeur };
    };
  };

  /* ---------- 9 · la fuite : une voisine s'échappe, la Terre se couvre ---------- */
  S.fuite = function (g, c) {
    const TX = 1260, TY = 560, RH = 205, LIQ = D.couleur(0.45, false);
    D.el("circle", { cx: TX, cy: TY, r: RH + 24, fill: "#cfe6fb", opacity: 0.55 }, g);
    D.el("circle", { cx: TX, cy: TY, r: 140, fill: "#4b8fd6", stroke: D.BLEU, "stroke-width": 4 }, g);
    ["M 1190 470 q 40 -30 80 0 q 20 40 -20 60 q -50 10 -60 -60 Z", "M 1290 560 q 50 -20 70 20 q 0 50 -50 60 q -40 -20 -20 -80 Z", "M 1170 600 q 30 0 40 30 q -10 30 -40 20 Z"]
      .forEach(d => D.el("path", { d: d, fill: "#5aa469", stroke: "#2e6b3c", "stroke-width": 3 }, g));
    const ondes = D.el("g", {}, g);
    const vagues = [0, 1, 2, 3, 4].map(k => ({ a: -150 + k * 32, f: k * 0.21, maj: D.chaleur(ondes) }));
    D.el("rect", { x: 60, y: 466, width: 940, height: 148, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: 60, y: 480, width: 940, height: 120, fill: "#f4f8fc" }, g);
    const fond = D.el("g", {}, g);
    D.el("rect", { x: 60, y: 480, width: 940, height: 120, fill: LIQ, opacity: 0.8 }, g);
    const flux = D.courant(g, 60, 1000, 480, 600, 10, 41);
    D.el("polygon", { points: "440,446 560,446 580,540 560,634 440,634 420,540", fill: "url(#vm-acier)", stroke: D.BLEU, "stroke-width": 4 }, g);
    D.el("path", { d: "M 546 446 L 570 446 L 560 468 Z", fill: D.BLEU }, g);
    const jet = D.el("g", {}, g), dessus = D.el("g", {}, g);
    const r = D.alea(67), GOUTTES = [];
    for (let i = 0; i < 12; i++) GOUTTES.push({ a: -60 - r() * 60, v: 60 + r() * 60, ph: r(), e: D.el("circle", { r: 4 + r() * 3, fill: LIQ, stroke: "#fff", "stroke-width": 1 }, jet) });
    D.etiquette(g, 500, 676, "raccord desserré", { "text-anchor": "middle" });
    const moinsFroid = D.pastille(g, 60, 742, "la machine fait moins de froid", "#c0392b", 30);
    const controle = D.pastille(g, 60, 742, "contrôle d'étanchéité : on répare, puis on recharge", "#1e7e54", 30);
    const prp = D.el("g", {}, g);
    D.el("rect", { x: 380, y: 170, width: 740, height: 124, rx: 18, fill: "#fff", stroke: D.ORANGE, "stroke-width": 4 }, prp);
    D.lignes(prp, 750, 222, ["PRP : la chaleur retenue par un fluide,", "comparée à celle du CO2 (PRP = 1)"], { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: D.BLEU, "font-family": "Calibri, Arial, sans-serif" }, 44);
    const mols = D.el("g", {}, g), FUIT = [];
    for (let i = 0; i < 9; i++) FUIT.push({ d: D.lerp(c.E[1] + 0.5, c.E[5], i / 8), a: -168 + i * 9.5, maj: D.mol(mols) });
    const voisine = D.heroine(dessus, { r: 26, teinte: "#9b7fd1", sansHalo: true, dephasage: 0.4 });
    const mila = D.heroine(dessus, { r: 30 });
    function vol(q, a) {
      const cible = [TX + RH * Math.cos(a * Math.PI / 180), TY + RH * Math.sin(a * Math.PI / 180)];
      const k = D.lisse(q), mx = 760, my = 330;
      const x = (1 - k) * (1 - k) * 560 + 2 * (1 - k) * k * mx + k * k * cible[0];
      const y = (1 - k) * (1 - k) * 444 + 2 * (1 - k) * k * my + k * k * cible[1];
      return [x + Math.sin(q * 9) * 8 * (1 - k), y];
    }
    const surAnneau = a => [TX + RH * Math.cos(a * Math.PI / 180), TY + RH * Math.sin(a * Math.PI / 180)];
    return function (t) {
      flux(t, 90);
      const couvert = D.lisse((t - c.A(4, 0.3)) / 1.5);
      vagues.forEach(v => {
        const f = D.frac(v.f + t * 0.35), back = couvert > 0.5 && f > 0.5;
        const rv = back ? 150 + (1 - f) * 100 : 150 + f * (couvert > 0.5 ? 100 : 130), a = v.a * Math.PI / 180;
        v.maj(TX + rv * Math.cos(a), TY + rv * Math.sin(a), v.a - 90 + (back ? 180 : 0), D.fenetre(f, 0, 1, 0.2));
      });
      const fuit = t > c.T[1];
      GOUTTES.forEach(o => {
        const f = D.frac(o.ph + t * 0.8), a = o.a * Math.PI / 180;
        o.e.setAttribute("cx", (560 + Math.cos(a) * o.v * f).toFixed(1)); o.e.setAttribute("cy", (444 + Math.sin(a) * o.v * f).toFixed(1));
        o.e.setAttribute("opacity", fuit ? (1 - f).toFixed(2) : 0);
      });
      FUIT.forEach(m => {
        const q = (t - m.d) / 6;
        if (q < 0) { m.maj(-50, -50, 0, false, 0); return; }
        const [x, y] = q < 1 ? vol(q, m.a) : surAnneau(m.a + (q - 1) * 4);
        m.maj(x, y, 0.45, true, 1);
      });
      const tSort = c.A(1, 0.25), qv = D.borne((t - tSort) / (c.T[4] - tSort), 0, 1);
      let vx, vy;
      if (t < c.T[1]) { vx = 650; vy = 540; } // la voisine attend dans le tube, après le raccord
      else if (t < tSort) { const k = D.lisse((t - c.T[1]) / (tSort - c.T[1])); vx = D.lerp(650, 566, k); vy = D.lerp(540, 430, k); }
      else [vx, vy] = qv < 1 ? vol(qv, -128) : surAnneau(-128);
      voisine({ x: vx, y: vy, s: 0.9, t: t, humeur: t < c.T[1] ? "sourire" : qv < 1 ? "surprise" : "sourire", regard: [1, -1] });
      const mx = D.courbe([[0, 120], [c.E[0], 330]], t);
      mila({ x: mx, y: 540, s: 0.8, t: t, temp: 0.45, etat: "liquide", humeur: t > c.T[1] && t < c.T[3] ? "surprise" : t > c.T[3] && t < c.E[3] + 1 ? "triste" : "sourire", regard: t > c.T[1] ? [1, -1] : [1, 0] });
      moinsFroid.setAttribute("opacity", D.fenetre(t, c.T[3], c.T[6] - 0.2).toFixed(2));
      controle.setAttribute("opacity", D.lisse((t - c.T[6]) / 0.4).toFixed(2));
      prp.setAttribute("opacity", D.lisse((t - c.T[5]) / 0.5).toFixed(2));
      return { temp: 0.45, etat: "liquide", humeur: "surprise" };
    };
  };

  /* ---------- 10 · la récupération : de la machine à la bouteille ---------- */
  S.recuperation = function (g, c) {
    D.el("rect", { x: 60, y: 360, width: 270, height: 280, rx: 18, fill: "#e7edf4", stroke: D.BLEU, "stroke-width": 4 }, g);
    D.lignes(g, 195, 404, ["machine", "arrêtée"], { "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: D.BLEU, "font-family": "Calibri, Arial, sans-serif" }, 36);
    D.el("rect", { x: 330, y: 490, width: 50, height: 20, fill: "url(#vm-cuivre)" }, g);
    D.el("circle", { cx: 370, cy: 500, r: 16, fill: "#c0392b", stroke: D.BLEU, "stroke-width": 3 }, g);
    const route = "M 230 560 L 380 500 C 440 500 450 560 520 560 L 860 470 C 980 470 1010 300 1130 300 L 1130 420";
    D.el("path", { d: "M 380 500 C 440 500 450 560 520 560", fill: "none", stroke: "#d9a400", "stroke-width": 18, "stroke-linecap": "round" }, g);
    D.el("path", { d: "M 860 470 C 980 470 1010 300 1130 300", fill: "none", stroke: "#d9a400", "stroke-width": 18, "stroke-linecap": "round" }, g);
    D.el("rect", { x: 520, y: 400, width: 340, height: 240, rx: 20, fill: "url(#vm-marine)", stroke: D.BLEU, "stroke-width": 4 }, g);
    D.lignes(g, 690, 452, ["station de", "récupération"], { "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#fff", "font-family": "Calibri, Arial, sans-serif" }, 38);
    const vent = D.ventilateur(g, 690, 568, 44);
    D.el("path", { d: "M 1050 420 Q 1050 360 1130 356 Q 1210 360 1210 420 V 690 Q 1210 720 1180 720 H 1080 Q 1050 720 1050 690 Z", fill: "url(#vm-acier-h)", stroke: D.BLEU, "stroke-width": 4 }, g);
    D.el("path", { d: "M 1050 420 Q 1050 360 1130 356 Q 1210 360 1210 420 Z", fill: "#e6b800", stroke: D.BLEU, "stroke-width": 4 }, g);
    D.el("rect", { x: 1112, y: 312, width: 36, height: 46, rx: 6, fill: "url(#vm-acier-h)", stroke: D.BLEU, "stroke-width": 3 }, g);
    D.el("rect", { x: 1078, y: 450, width: 104, height: 244, rx: 16, fill: "#f3f6fa" }, g);
    const niveau = D.el("rect", { x: 1078, y: 694, width: 104, height: 0, rx: 12, fill: D.couleur(0.4, false), opacity: 0.85 }, g);
    D.etiquette(g, 1130, 756, "bouteille de récupération", { "text-anchor": "middle", "font-size": 30 });
    const mols = D.el("g", {}, g);
    const chemin = D.el("path", { d: route, fill: "none", stroke: "none" }, g);
    const LONG = chemin.getTotalLength();
    const att = D.pastille(g, 690, 366, "technicien avec son attestation d'aptitude", D.BLEU, 26, "middle");
    const fiche = D.el("g", {}, g);
    D.el("rect", { x: 1260, y: 330, width: 290, height: 290, rx: 10, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, fiche);
    D.texte(fiche, 1405, 376, "fiche d'intervention", { "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: D.BLEU, "font-family": "Calibri, Arial, sans-serif" });
    const coches = ["fluide", "kilos récupérés", "où il part"].map((s, k) => {
      D.etiquette(fiche, 1282, 440 + k * 56, s, { "font-size": 28 });
      return D.texte(fiche, 1528, 440 + k * 56, "✓", { "text-anchor": "end", "font-size": 34, "font-weight": 700, fill: "#1e7e54" });
    });
    const regen = D.el("g", {}, g), detruit = D.el("g", {}, g);
    D.el("rect", { x: 1260, y: 330, width: 300, height: 140, rx: 16, fill: "#e8f5ee", stroke: "#1e7e54", "stroke-width": 5 }, regen);
    D.texte(regen, 1410, 384, "régénérée", { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#1e7e54", "font-family": "Calibri, Arial, sans-serif" });
    D.texte(regen, 1410, 428, "nettoyée, elle repart", { "text-anchor": "middle", "font-size": 28, fill: "#10233c", "font-family": "Calibri, Arial, sans-serif" });
    D.el("path", { d: "M 1216 440 L 1252 410", stroke: "#1e7e54", "stroke-width": 6, "stroke-linecap": "round" }, regen);
    D.el("rect", { x: 1260, y: 520, width: 300, height: 140, rx: 16, fill: "#fdecea", stroke: "#c0392b", "stroke-width": 5 }, detruit);
    D.texte(detruit, 1410, 574, "détruite", { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#c0392b", "font-family": "Calibri, Arial, sans-serif" });
    D.texte(detruit, 1410, 618, "dans une usine spéciale", { "text-anchor": "middle", "font-size": 28, fill: "#10233c", "font-family": "Calibri, Arial, sans-serif" });
    D.el("path", { d: "M 1216 600 L 1252 590", stroke: "#c0392b", "stroke-width": 6, "stroke-linecap": "round" }, detruit);
    const jamais = D.pastille(g, 1000, 220, "jamais dans l'air ✓", "#1e7e54", 34, "middle");
    const r = D.alea(83), N = 30, P = [];
    for (let i = 0; i < N; i++) P.push({ d: D.lerp(c.T[2] + 1, c.E[3], i / (N - 1)), x0: 90 + r() * 200, y0: 470 + r() * 140, ph: r() * TOUR, maj: D.mol(mols) });
    const fond = k => [1092 + (k % 4) * 25 + (Math.floor(k / 4) % 2) * 12, 680 - Math.floor(k / 4) * 22];
    const mila = D.heroine(g, { r: 30 });
    const suivre = q => { const pt = chemin.getPointAtLength(D.borne(q, 0, 1) * LONG); return [pt.x, pt.y]; };
    return function (t) {
      vent(t > c.T[2] && t < c.E[4] ? t * 600 : 0);
      let arrivees = 0;
      P.forEach((m, k) => {
        const q = (t - m.d) / 4.5;
        if (q < 0) { m.maj(m.x0 + Math.sin(t * 2 + m.ph) * 4, m.y0, 0.45, true, 1); return; }
        if (q < 1) { const [x, y] = suivre(q); m.maj(x, y, 0.4, true, 1); return; }
        arrivees++;
        const [x, y] = fond(k); m.maj(x, y, 0.4, false, 0);
      });
      niveau.setAttribute("height", (arrivees * 7.4).toFixed(1)); niveau.setAttribute("y", (694 - arrivees * 7.4).toFixed(1));
      const qm = D.borne((t - c.T[3]) / (c.E[3] - c.T[3]), 0, 1);
      let mx, my;
      if (qm <= 0) { mx = 200; my = 520 + Math.sin(t * 2) * 5; } else if (qm < 1) [mx, my] = suivre(qm); else { mx = 1130; my = 620; }
      mila({ x: mx, y: my, s: 0.8, t: t, temp: 0.4, etat: qm > 0 && qm < 1 ? "vapeur" : "liquide", humeur: qm > 0 && qm < 1 ? "surprise" : "sourire", regard: [1, 0] });
      att.setAttribute("opacity", D.fenetre(t, c.T[2], c.T[4]).toFixed(2));
      fiche.setAttribute("opacity", D.fenetre(t, c.T[4], c.T[5]).toFixed(2));
      coches.forEach((x, k) => x.setAttribute("opacity", t > c.A(4, 0.3 + k * 0.25) ? 1 : 0));
      regen.setAttribute("opacity", D.lisse((t - c.T[5]) / 0.5).toFixed(2));
      detruit.setAttribute("opacity", D.lisse((t - c.T[6]) / 0.5).toFixed(2));
      jamais.setAttribute("opacity", D.lisse((t - c.T[7]) / 0.5).toFixed(2));
      return { temp: 0.4, etat: "liquide", humeur: "sourire" };
    };
  };

  /* ---------- la famille : d'hier à demain ---------- */
  S.famille = function (g, c) {
    const CADRES = [
      { x: 60, a: 1, l: ["Grand-mère", "R-12 · CFC", "abîmait l'ozone", "arrêtée (Montréal, 1987)"],
        gens: [[290, 430, 46, "#a9b8c9", { lunettes: true, chignon: true }]] },
      { x: 570, a: 3, l: ["Les parents", "R-134a, R-404A · HFC", "réchauffent la planète", "remplacés peu à peu"],
        gens: [[735, 432, 40, "#d98c5f", {}], [865, 432, 40, "#e0a65a", {}]] },
      { x: 1080, a: 5, l: ["Les nouveaux", "R-290 · R-744 · R-717 · HFO", "PRP faible", "chacun ses règles"],
        gens: [[1200, 448, 30, "#5aa469", {}], [1310, 418, 30, "#4b8fd6", {}], [1420, 448, 30, "#8e6fc8", {}]] }
    ].map((f, k) => {
      const cg = D.el("g", {}, g);
      const bord = D.el("rect", { x: f.x, y: 300, width: 460, height: 430, rx: 18, fill: "#fff", stroke: D.BLEU, "stroke-width": 3 }, cg);
      D.el("rect", { x: f.x + 20, y: 320, width: 420, height: 200, rx: 10, fill: "#eef4fa" }, cg);
      f.l.forEach((s, i) => D.etiquette(cg, f.x + 230, 566 + i * 42, s, { "text-anchor": "middle", "font-size": i ? 29 : 34, "font-weight": i ? 600 : 700, fill: i ? "#10233c" : D.BLEU }));
      const persos = f.gens.map(([x, y, rr, coul, opt]) => ({ x: x, y: y, maj: D.heroine(cg, Object.assign({ r: rr, teinte: coul, sansHalo: true, dephasage: k * 0.3 + x / 1000 }, opt)) }));
      return { g: cg, bord: bord, a: f.a, persos: persos };
    });
    const regle = D.texte(g, 760, 250, "Un fluide reste dans son circuit.", { "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: D.ORANGE, "font-family": "Trebuchet MS, Arial, sans-serif" });
    const mila = D.heroine(g, { r: 30 });
    return function (t) {
      CADRES.forEach((f, k) => {
        f.g.setAttribute("opacity", D.lisse((t - c.T[f.a]) / 0.6).toFixed(2));
        const fin = f.a + 2 < c.T.length ? c.T[f.a + 2] : c.D, actif = t > c.T[f.a] && t < fin;
        f.bord.setAttribute("stroke", actif ? "#ff6b35" : D.BLEU); f.bord.setAttribute("stroke-width", actif ? 7 : 3);
        f.persos.forEach((p, i) => p.maj({ x: p.x, y: p.y + Math.sin(t * 2 + i + k) * 4, t: t, humeur: "sourire", regard: [0, 0] }));
      });
      regle.setAttribute("opacity", D.lisse((t - c.T[7]) / 0.5).toFixed(2));
      mila({ x: 1420, y: 190 + Math.sin(t * 2.4) * 8, s: 1.2, t: t, temp: 0.1, etat: "liquide", humeur: "sourire", regard: [-1, 1] });
      return {};
    };
  };
})();
