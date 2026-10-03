/* =====================================================================
   voyage-scenes-a.js — le voyage, l'évaporateur, le compresseur,
   le condenseur
   ---------------------------------------------------------------------
   CONTRAT D'UNE SCÈNE : VOYAGE_SCENES[id] = function (g, c) → maj(t)
   g = groupe SVG vide (1600 × 770 utiles) ; c = { T, E, D, A(k, f) } où
   T[k]/E[k] bornent la phrase k du récit (donnees/voyage.js) : les gestes
   sont accrochés aux PHRASES. Les phrases 0 et 1 des organes sont la
   présentation (le théâtre montre l'organe en vrai) : la coupe commence
   à la phrase 2.
   maj(t) rend { carte, temp, etat, humeur } pour la petite molécule.
   ZONES INTERDITES : en-tête (x < 760, y < 140), carte (x > 1200, y < 285).
   LIQUIDE = une nappe (D.liquide), jamais des billes ; seule la vapeur est
   faite de petites molécules. L'héroïne flotte à moitié dans le liquide.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const TOUR = 2 * Math.PI;

  /* ---------- le voyage : les huit organes en vrai ---------- */
  S.intro = function (g, c) {
    const titre = D.el("g", {}, g), corps = D.el("g", {}, g);
    D.texte(titre, 800, 360, c.recit.titre, { "text-anchor": "middle", "font-size": 86, "font-weight": 700, fill: D.BLEU, "font-family": "Trebuchet MS, Arial, sans-serif" });
    D.texte(titre, 800, 440, c.recit.sousTitre, { "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: D.ORANGE, "font-family": "Calibri, Arial, sans-serif" });
    const grandeT = D.heroine(titre, { r: 54 });
    const cir = D.circuit(corps, 330, 150, 960, true);
    const petite = D.heroine(corps, { r: 30 }), grande = D.heroine(corps, { r: 60 });
    const MARQUES = [["evaporateur", 3, 0.42], ["compresseur", 3, 0.6], ["condenseur", 3, 0.76], ["detendeur", 3, 0.92],
      ["bouteille", 4, 0.55], ["filtre", 4, 0.7], ["voyant", 4, 0.82], ["electrovanne", 4, 0.93]];
    const tempDe = w => D.courbe([[0, 0.05], [2, 0.12], [4, 0.95], [6, 0.85], [7, 0.55], [12.5, 0.5], [13.3, 0.05], [15, 0.05]], w, true);
    const etatDe = w => w > 0.6 && w < 6.8 ? "vapeur" : w > 0.25 && w <= 0.6 ? "bout" : "liquide";
    return function (t) {
      const ft = 1 - D.lisse((t - (c.T[0] - 1.1)) / 0.8);
      titre.setAttribute("opacity", ft.toFixed(2));
      corps.setAttribute("opacity", (1 - ft).toFixed(2));
      grandeT({ x: 800, y: 560, t: t, humeur: "sourire", etat: "liquide", temp: 0.1 });
      MARQUES.forEach(([nom, k, f]) => cir.surligne(nom, t > c.A(k, f) && t < c.E[4] + 0.8));
      const w = D.courbe([[c.T[5], 0], [c.E[6], 15]], t, true), wm = ((w % 15) + 15) % 15;
      const [px, py] = cir.ecran(...D.circuitPoint(w));
      petite({ x: px, y: py, s: 0.85, t: t, temp: tempDe(wm), etat: etatDe(wm), humeur: wm > 3 && wm < 5 ? "chaud" : "sourire" });
      grande({ x: 160, y: 470 + Math.sin(t * 2.2) * 8, t: t, temp: 0.1, etat: "liquide", regard: [1, 0], humeur: t > c.T[5] && t < c.E[5] ? "surprise" : "sourire" });
      return {};
    };
  };

  /* ---------- échangeur : ailettes, tube coupé, air, chaleur, liquide, bulles, vapeur ----------
     o.sens : +1 (gauche → droite) ou −1 ; p = 0 à l'entrée, 1 à la sortie ;
     o.air : [couleur au-dessus, au-dessous] ; o.chaleur : +1 vers le tube, −1 vers les ailettes ;
     o.niveau(p) hauteur de liquide 0..1 ; o.tempLiq(p), o.tempVap(p) ; o.gouttes : condensation.
     rend { fond (groupe sous le liquide : ce qui y flotte), maj(t, chaleur), surface(x, t) } */
  const X0 = 60, X1 = 1540, YH = 400, YB = 560;
  function echangeur(g, o) {
    const pDe = x => o.sens > 0 ? (x - X0) / (X1 - X0) : (X1 - x) / (X1 - X0);
    const xDe = p => o.sens > 0 ? X0 + p * (X1 - X0) : X1 - p * (X1 - X0);
    for (let x = 280; x <= 1320; x += 26) D.el("rect", { x: x, y: 300, width: 7, height: 360, fill: "url(#vm-acier-h)", opacity: 0.55 }, g);
    const air = D.el("g", {}, g), chaud = D.el("g", {}, g);
    const chevrons = [];
    for (let k = 0; k < 6; k++) for (let j = 0; j < 3; j++) chevrons.push({ x: 362 + k * 190, f: j / 3, maj: D.chevron(air) });
    const vagues = [];
    for (let k = 0; k < 7; k++) [-1, 1].forEach(cote => vagues.push({ x: 330 + k * 160 + (cote > 0 ? 80 : 0), cote: cote, f: D.frac(k * 0.37), maj: D.chaleur(chaud) }));
    D.el("rect", { x: X0, y: YH - 16, width: X1 - X0, height: 16, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: X0, y: YB, width: X1 - X0, height: 16, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: X0, y: YH, width: X1 - X0, height: YB - YH, fill: "#f4f8fc" }, g);
    const vap = D.el("g", {}, g), fond = D.el("g", {}, g);
    const liq = D.liquide(g, { x0: X0, x1: X1, yh: YH, yb: YB, niveau: x => o.niveau(pDe(x)), couleur: x => D.couleur(o.tempLiq(pDe(x)), false) });
    const bul = D.bulles(D.el("g", {}, g), 54, o.graine + 1, o.gouttes);
    const r = D.alea(o.graine), V = [];
    for (let i = 0; i < 46; i++) V.push({ s: r(), ry: r(), ph: r() * TOUR, maj: D.mol(vap) });
    return {
      fond: fond, surface: liq.surface,
      maj: function (t, chaleurOp) {
        chevrons.forEach(ch => {
          const f = D.frac(ch.f + t * 0.16), y = 300 + f * 360;
          ch.maj(ch.x, y, 0, y < YH ? o.air[0] : o.air[1], D.fenetre(f, 0, 1, 0.12) * (y > YH - 26 && y < YB + 26 ? 0 : 0.9));
        });
        vagues.forEach(v => {
          const f = D.frac(v.f + t * 0.45), d = 40 * f;
          const y = v.cote < 0 ? (o.chaleur > 0 ? YH - 60 + d : YH - 20 - d) : (o.chaleur > 0 ? YB + 60 - d : YB + 20 + d);
          v.maj(v.x, y, (v.cote < 0) === (o.chaleur > 0) ? 0 : 180, chaleurOp * D.fenetre(f, 0, 1, 0.25));
        });
        liq.maj(t);
        bul(t, q => {
          const p = o.gouttes ? 0.2 + q * 0.62 : 0.02 + q * 0.74, x = xDe(p), surf = liq.surface(x, t), nv = o.niveau(p);
          if (o.gouttes) return [x, YH + 6, surf, nv > 0.02 && nv < 0.95 ? 0.95 : 0, D.couleur(o.tempLiq(p), false)];
          return [x, YB - 6, surf + 4, nv > 0.08 ? 1 : 0];
        });
        V.forEach(m => {
          const p = D.frac(m.s + t / 16), x = xDe(p), libre = liq.surface(x, t) - YH;
          const y = YH + 16 + m.ry * Math.max(0, libre - 32) + Math.sin(t * 3 + m.ph) * 5;
          m.maj(x, y, o.tempVap(p), true, D.borne((libre - 34) / 30, 0, 1));
        });
      }
    };
  }
  /* la molécule qui flotte (à moitié dans le liquide) ou qui vole dans la vapeur */
  function flotte(ech, x, t, vapeur) {
    const surf = ech.surface(x, t);
    return vapeur ? Math.min(YH + 54 + Math.sin(t * 2.5) * 8, surf - 46) : Math.max(surf + 4 + Math.sin(t * 2) * 4, YH + 40);
  }

  /* ---------- 1 · l'évaporateur ---------- */
  S.evaporateur = function (g, c) {
    const ech = echangeur(g, { graine: 11, sens: 1, air: ["#e8914a", "#3d7fca"], chaleur: 1,
      niveau: p => 0.82 * (1 - D.lisse(p / 0.78)), tempLiq: () => 0.05,
      tempVap: p => p > 0.85 ? 0.08 + (p - 0.85) / 0.15 * 0.2 : 0.08 });
    const vent = D.ventilateur(g, 130, 255, 42);
    D.etiquette(g, 190, 268, "air tiède de la chambre");
    D.etiquette(g, 280, 712, "air refroidi");
    D.etiquette(g, 60, 328, "entrée", { "font-weight": 700 }); D.etiquette(g, 60, 366, "mélange froid"); // liquide + un peu de vapeur, comme à la sortie du détendeur
    D.etiquette(g, 1540, 328, "sortie", { "font-weight": 700, "text-anchor": "end" }); D.etiquette(g, 1540, 366, "vapeur", { "text-anchor": "end" });
    const ebul = D.pastille(g, 800, 724, "ébullition : le liquide fait des bulles", "#2f6fb8", 30, "middle");
    const surch = D.pastille(g, 1430, 640, "surchauffe", D.ORANGE, 30, "middle");
    const mila = D.heroine(ech.fond, { r: 30 });
    const tb = c.A(5, 0.2), tv = c.A(6, 0.2);
    return function (t) {
      vent(t * 520);
      ech.maj(t, 0.35 + 0.65 * D.lisse((t - c.T[4]) / 0.8));
      ebul.setAttribute("opacity", D.fenetre(t, c.T[5], c.E[6] + 0.4).toFixed(2));
      surch.setAttribute("opacity", D.lisse((t - c.T[7]) / 0.4).toFixed(2));
      const p = D.courbe([[c.T[2], 0.03], [c.E[2], 0.15], [c.T[5], 0.4], [tv, 0.52], [c.E[6], 0.66], [c.E[7], 0.9], [c.D - 0.2, 1.06]], t);
      const x = X0 + p * (X1 - X0), envol = D.lisse((t - tv) / 1.4);
      const etat = t < tb ? "liquide" : t < tv + 0.6 ? "bout" : "vapeur", temp = D.courbe([[c.T[7], 0.06], [c.E[7], 0.28]], t);
      const humeur = t > tb && t < tv + 1.2 ? "surprise" : "sourire";
      mila({ x: x, y: D.lerp(flotte(ech, x, t, false), flotte(ech, x, t, true), envol), s: 0.9, t: t, temp: temp, etat: etat, humeur: humeur, regard: [1, 0] });
      return { carte: D.borne(p, 0, 1) * 2, temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* ---------- 2 · le compresseur (à piston, en coupe) ---------- */
  S.compresseur = function (g, c) {
    const YP0 = 424, COURSE = 196;
    D.el("rect", { x: 60, y: 308, width: 545, height: 74, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: 995, y: 308, width: 545, height: 74, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: 60, y: 320, width: 545, height: 50, fill: "#eef4fa" }, g);
    D.el("rect", { x: 995, y: 320, width: 545, height: 50, fill: "#fbefe6" }, g);
    D.el("rect", { x: 590, y: 290, width: 420, height: 112, rx: 10, fill: "url(#vm-acier)" }, g);
    D.el("rect", { x: 600, y: 300, width: 190, height: 100, fill: "#eef4fa" }, g);
    D.el("rect", { x: 810, y: 300, width: 190, height: 100, fill: "#fbefe6" }, g);
    D.el("rect", { x: 590, y: 320, width: 14, height: 50, fill: "#eef4fa" }, g);
    D.el("rect", { x: 996, y: 320, width: 14, height: 50, fill: "#fbefe6" }, g);
    D.el("rect", { x: 590, y: 418, width: 420, height: 272, fill: "url(#vm-acier-h)" }, g);
    D.el("rect", { x: 610, y: 418, width: 380, height: 272, fill: "#f3f6fa" }, g);
    const mols = D.el("g", {}, g);
    const bielle = D.el("rect", { x: 785, y: 0, width: 30, height: 10, fill: "url(#vm-acier-h)" }, g);
    const piston = D.el("g", {}, g);
    D.el("rect", { x: 612, y: 0, width: 376, height: 56, rx: 6, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, piston);
    [16, 30].forEach(y => D.el("line", { x1: 612, y1: y, x2: 988, y2: y, stroke: "#5d6b7a", "stroke-width": 2 }, piston));
    D.el("rect", { x: 590, y: 400, width: 60, height: 18, fill: "#6b7785" }, g);
    D.el("rect", { x: 720, y: 400, width: 160, height: 18, fill: "#6b7785" }, g);
    D.el("rect", { x: 950, y: 400, width: 60, height: 18, fill: "#6b7785" }, g);
    const clapA = D.el("rect", { x: 645, y: 418, width: 82, height: 8, rx: 3, fill: "#24384f" }, g);
    const clapR = D.el("rect", { x: 875, y: 392, width: 82, height: 8, rx: 3, fill: "#24384f" }, g);
    const carter = D.el("rect", { x: 540, y: 690, width: 520, height: 70, rx: 14, fill: "url(#vm-marine)", stroke: D.BLEU, "stroke-width": 6 }, g);
    D.el("path", { d: "M 600 700 L 584 730 L 598 730 L 588 752 L 616 722 L 602 722 L 614 700 Z", fill: "#ffd166" }, g);
    D.texte(g, 820, 736, "moteur électrique", { "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#fff", "font-family": "Calibri, Arial, sans-serif" });
    const lab = D.el("g", {}, g);
    D.etiquette(g, 60, 282, "aspiration : vapeur froide (BP)");
    D.etiquette(g, 1030, 432, "refoulement :", { "font-weight": 700 }); D.etiquette(g, 1030, 470, "vapeur très chaude (HP)");
    D.etiquette(lab, 150, 476, "clapet d'aspiration"); D.trait(lab, 440, 468, 660, 428);
    D.etiquette(g, 640, 250, "clapet de refoulement"); D.trait(g, 905, 260, 915, 388);
    D.etiquette(lab, 200, 610, "piston");
    const ligneP = D.trait(lab, 300, 600, 612, 600);
    const alerte = D.el("g", {}, g);
    D.el("rect", { x: 60, y: 500, width: 470, height: 150, rx: 16, fill: "#fff", stroke: "#c0392b", "stroke-width": 5, "stroke-dasharray": "16 10" }, alerte);
    D.lignes(alerte, 90, 560, ["Jamais de liquide ici :", "il ne se comprime pas."], { "font-size": 34, "font-weight": 700, fill: "#c0392b", "font-family": "Calibri, Arial, sans-serif" }, 46);
    const ralenti = D.pastille(g, 148, 186, "au ralenti", "#637285", 28);
    const r = D.alea(23), M = 24, LOTS = [0, 1, 2].map(() => {
      const l = [];
      for (let j = 0; j < M; j++) l.push({ u: 0.06 + r() * 0.88, v: 0.06 + r() * 0.88, e: r() * 0.6, w: r(), maj: D.mol(mols) });
      return l;
    });
    const MOI = { u: 0.45, v: 0.5, e: 0.12, w: 0.5 };
    const mila = D.heroine(g, { r: 30 });
    const yp = phi => YP0 + (1 - Math.cos(phi)) / 2 * COURSE;
    const tempDe = y => 0.1 + 0.85 * D.lisse((620 - y) / (620 - 452));
    function place(m, L, y) { // position, température, visibilité d'une molécule de phase locale L
      const cx = 612 + 14 + m.u * 348, cyc = 418 + 14 + m.v * Math.max(4, y - 418 - 28);
      if (L < 0) { const q = 1 + L / TOUR; return [D.lerp(80 + m.w * 500, 640, q * q), 345 + (m.v - 0.5) * 36, 0.1, 1]; }
      if (L < Math.PI) {
        const k = D.lisse((L / Math.PI - m.e) / 0.35);
        return k < 0.5 ? [D.lerp(640, 686, k * 2), D.lerp(345, 412, k * 2), 0.1, 1] : [D.lerp(686, cx, k * 2 - 1), D.lerp(412, cyc, k * 2 - 1), 0.1, 1];
      }
      if (L < 1.75 * Math.PI) return [cx, cyc, tempDe(y), 1];
      if (L < TOUR) {
        const k = D.lisse(((L - 1.75 * Math.PI) / (0.25 * Math.PI) - m.w * 0.4) / 0.6);
        return k < 0.5 ? [D.lerp(cx, 915, k * 2), D.lerp(cyc, 405, k * 2), 0.9, 1] : [D.lerp(915, 930 + m.u * 60, k * 2 - 1), D.lerp(405, 345 + (m.v - 0.5) * 36, k * 2 - 1), 0.92, 1];
      }
      const q = (L - TOUR) / TOUR, x = 930 + m.u * 60 + q * (640 + m.w * 260);
      return [x, 345 + (m.v - 0.5) * 36, 0.92, L < 2 * TOUR ? D.borne((1560 - x) / 60, 0, 1) : 0];
    }
    const t6 = c.E[6];
    return function (t) {
      const phi = t < t6 ? D.courbe([[c.T[2], 0], [c.T[3], TOUR], [c.E[3], 1.5 * TOUR], [c.T[6], 1.875 * TOUR], [t6, 2 * TOUR]], t, true)
        : 2 * TOUR + (t - t6) * TOUR / 1.3;
      const y = yp(phi), n = Math.floor(phi / TOUR), f = phi - n * TOUR;
      piston.setAttribute("transform", "translate(0 " + y.toFixed(1) + ")");
      bielle.setAttribute("y", (y + 50).toFixed(1)); bielle.setAttribute("height", (700 - y - 50).toFixed(1));
      ligneP.setAttribute("y2", (y + 28).toFixed(1));
      clapA.setAttribute("transform", "rotate(" + (f > 0.03 * TOUR && f < 0.48 * TOUR ? 28 : 0) + " 645 418)");
      clapR.setAttribute("transform", "rotate(" + (f > 0.875 * TOUR && f < 0.995 * TOUR ? 28 : 0) + " 957 400)");
      for (let m = n - 1; m <= n + 1; m++) {
        const lot = LOTS[((m % 3) + 3) % 3], L = phi - m * TOUR;
        lot.forEach(mo => { const [x, yy, temp, op] = place(mo, L, y); mo.maj(x, yy, temp, true, op); });
      }
      let mx, my, temp;
      if (t < t6) [mx, my, temp] = place(MOI, phi - TOUR, y);
      else { mx = D.lerp(930, 1640, D.borne((t - t6) / (c.D - t6 - 0.3), 0, 1)); my = 345; temp = 0.92; }
      const L = phi - TOUR, serre = L > Math.PI && L < 1.8 * Math.PI ? D.lisse((620 - y) / 168) : 0;
      const humeur = t < c.T[3] ? "sourire" : t < c.E[3] ? "surprise" : temp > 0.6 ? "chaud" : "sourire";
      mila({ x: mx, y: my, s: L > 0 && L < TOUR ? 0.68 : 0.62, t: t, temp: temp, etat: "vapeur", humeur: humeur, ecrase: serre * 0.8, regard: [1, 0] });
      ralenti.setAttribute("opacity", t < t6 ? 1 : 0);
      carter.setAttribute("stroke", t > c.T[7] && t < c.E[7] + 0.5 && D.frac(t * 1.5) < 0.5 ? "#ff6b35" : D.BLEU);
      const a = D.fenetre(t, c.T[8], c.D + 1, 0.4);
      alerte.setAttribute("opacity", a.toFixed(2)); lab.setAttribute("opacity", (1 - a).toFixed(2));
      const w = t < c.T[3] ? D.lerp(2, 3, D.borne((t - c.T[2]) / (c.T[3] - c.T[2]), 0, 1)) : t < t6 ? D.lerp(3, 4, (t - c.T[3]) / (t6 - c.T[3])) : D.lerp(4, 5, D.borne((t - t6) / (c.D - t6), 0, 1));
      return { carte: w, temp: temp, etat: "vapeur", humeur: humeur };
    };
  };

  /* ---------- 3 · le condenseur (le fluide va de droite à gauche, comme sur la croix) ---------- */
  S.condenseur = function (g, c) {
    const ech = echangeur(g, { graine: 37, sens: -1, air: ["#3d7fca", "#e8914a"], chaleur: -1, gouttes: true,
      niveau: p => D.lisse((p - 0.22) / 0.6),
      tempLiq: p => p < 0.8 ? 0.6 : D.lerp(0.6, 0.45, (p - 0.8) / 0.2),
      tempVap: p => p < 0.25 ? D.lerp(0.95, 0.62, p / 0.25) : 0.62 });
    const vent = D.ventilateur(g, 130, 255, 42);
    D.etiquette(g, 190, 268, "air extérieur, plus frais");
    D.etiquette(g, 280, 712, "air réchauffé");
    D.etiquette(g, 1540, 328, "entrée", { "font-weight": 700, "text-anchor": "end" }); D.etiquette(g, 1540, 366, "vapeur chaude", { "text-anchor": "end" });
    D.etiquette(g, 60, 328, "sortie", { "font-weight": 700 }); D.etiquette(g, 60, 366, "liquide");
    const etapes = [["1. elle refroidit", 4, 4], ["2. des gouttes : elle redevient liquide", 5, 5], ["3. sous-refroidissement", 6, 7]]
      .map(([s, a, b]) => ({ g: D.pastille(g, 1320, 724, s, D.ORANGE, 30, "end"), a: a, b: b }));
    const mila = D.heroine(ech.fond, { r: 30 });
    const tc = c.A(5, 0.5);
    return function (t) {
      vent(t * 520);
      ech.maj(t, 1);
      etapes.forEach(e => e.g.setAttribute("opacity", D.fenetre(t, c.T[e.a], (e.b + 1 < c.T.length ? c.T[e.b + 1] : c.D) - 0.1).toFixed(2)));
      const p = D.courbe([[c.T[2], 0.03], [c.E[3], 0.15], [c.E[4], 0.25], [tc, 0.5], [c.E[6], 0.88], [c.D - 0.2, 1.07]], t);
      const x = X1 - p * (X1 - X0), pose = D.lisse((t - tc) / 1.2);
      const etat = t < tc ? "vapeur" : "liquide", temp = D.courbe([[c.T[2], 0.95], [c.E[4], 0.62], [c.T[6], 0.6], [c.E[6], 0.45]], t);
      const humeur = t < c.E[3] ? "chaud" : t > tc - 0.2 && t < tc + 1.4 ? "surprise" : "sourire";
      mila({ x: x, y: D.lerp(flotte(ech, x, t, true), flotte(ech, x, t, false), pose), s: 0.9, t: t, temp: temp, etat: etat, humeur: humeur, regard: [-1, 0] });
      return { carte: 5 + D.borne(p, 0, 1) * 2.6, temp: temp, etat: etat, humeur: humeur };
    };
  };
})();
