/* =====================================================================
   voyage-nh3-scenes-b.js — NH₃ : le compresseur ouvert, le séparateur
   d'huile, le condenseur évaporatif, le réservoir haute pression
   ---------------------------------------------------------------------
   Même contrat que voyage-scenes-a.js : VOYAGE_SCENES[id] = function (g, c)
   → maj(t) (fonction PURE de t, aucun état gardé d'une image à l'autre).
   Récit : donnees/voyage-nh3.js ; briques : voyage-dessin.js et
   voyage-nh3-dessin.js (D.cuve, D.HUILE, D.AIR). Brief : voyage-nh3/BRIEF-SCENES.md.
   Zones interdites : en-tête (x < 760, y < 140), carte (x > 1200, y < 285).
   Les phrases 0 et 1 d'un organe sont la présentation (carte d'identité
   devant la coupe) : la coupe sert à partir de la phrase 2, mais elle est
   déjà dessinée à t = 0. ACIER partout ; le cuivre n'existe que dans le
   bobinage du moteur du compresseur, dehors.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const PI = Math.PI, TOUR = 2 * PI;
  const POLICE = "Calibri, Arial, sans-serif";

  /* ---------- outils privés ---------- */
  /* tuyau d'acier en coupe, suivant une ligne brisée : paroi sombre, intérieur teinté */
  function tuyau(parent, pts, w, teinte) {
    const l = pts.map(p => p.join(",")).join(" ");
    D.el("polyline", { points: l, fill: "none", stroke: "#4d5866", "stroke-width": w, "stroke-linejoin": "round" }, parent);
    D.el("polyline", { points: l, fill: "none", stroke: teinte, "stroke-width": w - 24, "stroke-linejoin": "round" }, parent);
  }
  /* petits traits qui filent le long d'une ligne brisée (un liquide qui circule, et dans quel sens) */
  function fil(parent, pts, nb, coul) {
    const lg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), tot = lg.reduce((a, b) => a + b, 0);
    const E = [];
    for (let i = 0; i < nb; i++) E.push(D.el("line", { stroke: coul || "#fff", "stroke-width": 5, "stroke-linecap": "round" }, parent));
    return function (t, vit, op) {
      E.forEach((e, i) => {
        let d = D.frac(i / nb + t * vit / tot) * tot, k = 0;
        while (k < lg.length - 1 && d > lg[k]) { d -= lg[k]; k++; }
        const a = pts[k], b = pts[k + 1], f = d / lg[k], ux = (b[0] - a[0]) / lg[k], uy = (b[1] - a[1]) / lg[k];
        const x = a[0] + (b[0] - a[0]) * f, y = a[1] + (b[1] - a[1]) * f, l = Math.min(14, lg[k] * (1 - f));
        e.setAttribute("x1", x.toFixed(1)); e.setAttribute("y1", y.toFixed(1));
        e.setAttribute("x2", (x + ux * l).toFixed(1)); e.setAttribute("y2", (y + uy * l).toFixed(1));
        e.setAttribute("opacity", (op * D.fenetre(D.frac(i / nb + t * vit / tot), 0, 1, 0.06)).toFixed(2));
      });
    };
  }
  const texteBleu = { "font-weight": 700, fill: "#2f6fb8" };
  /* chemin lisse (Catmull-Rom) passant par des repères : pos(s) = point à la distance s ; cum[i] = distance du repère i ;
     norm(s) = vecteur unitaire perpendiculaire (pour écarter une molécule de l'axe) ; l = longueur totale */
  function chemin(pts) {
    const P = [pts[0]].concat(pts, [pts[pts.length - 1]]), S = [], L = [], cum = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const [p0, p1, p2, p3] = [P[i], P[i + 1], P[i + 2], P[i + 3]];
      for (let k = 0; k < 10; k++) {
        const u = k / 10, u2 = u * u, u3 = u2 * u, f = j => 0.5 * (2 * p1[j] + (p2[j] - p0[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (3 * p1[j] - p0[j] - 3 * p2[j] + p3[j]) * u3);
        const q = [f(0), f(1)];
        L.push(S.length ? L[L.length - 1] + Math.hypot(q[0] - S[S.length - 1][0], q[1] - S[S.length - 1][1]) : 0);
        S.push(q);
        if (k === 0) cum.push(L[L.length - 1]);
      }
    }
    const fin = pts[pts.length - 1];
    L.push(L[L.length - 1] + Math.hypot(fin[0] - S[S.length - 1][0], fin[1] - S[S.length - 1][1])); S.push(fin); cum.push(L[L.length - 1]);
    const l = L[L.length - 1];
    function pos(s) {
      s = D.borne(s, 0, l);
      let i = 1; while (i < L.length - 1 && L[i] < s) i++;
      const f = L[i] > L[i - 1] ? (s - L[i - 1]) / (L[i] - L[i - 1]) : 0;
      return [D.lerp(S[i - 1][0], S[i][0], f), D.lerp(S[i - 1][1], S[i][1], f)];
    }
    function norm(s) {
      const a = pos(s - 4), b = pos(s + 4), d = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      return [-(b[1] - a[1]) / d, (b[0] - a[0]) / d];
    }
    return { pos: pos, norm: norm, cum: cum, l: l };
  }

  /* ---------- 4 · le compresseur ouvert (pistons, en coupe) ----------
     Le piston et le vilebrequin tournent à l'unisson (bielle-manivelle) ; l'arbre sort du carter par une
     garniture, passe un accouplement, et le moteur (bobinage de cuivre) est DEHORS.
     Le piston tourne au ralenti pendant les phrases 2 et 3, fait SON cycle (aspiration, compression)
     pendant les phrases 4 et 5, puis la vapeur chaude part dans le tube de refoulement. */
  S.compresseur = function (g, c) {
    const CX = 580, CY = 550, RV = 50, LB = 130, PIN = 44, XA = 520, XR = 640, BDC = 426;
    const FROID = "#e3eefa", CHAUD = "#fbe5d6";
    const dessus = th => CY - RV * Math.cos(th) - Math.sqrt(LB * LB - Math.pow(RV * Math.sin(th), 2)) - PIN; // haut du piston
    const tempDe = y => 0.1 + 0.85 * D.lisse((BDC - y) / 54);

    /* chemise d'eau (phrase 6) : derrière la culasse */
    const chemise = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: 400, y: 176, width: 360, height: 316, rx: 20, fill: "#bfe0f5", stroke: "#4d5866", "stroke-width": 6 }, chemise);
    const eauP = [[60, 450], [425, 450], [425, 200], [1000, 200]], eauB = [[735, 480], [735, 200]];
    tuyau(chemise, [[60, 450], [410, 450]], 36, "#8ec9ee");
    tuyau(chemise, [[740, 200], [1000, 200]], 36, "#8ec9ee");
    const filEau = [fil(chemise, eauP, 16), fil(chemise, eauB, 4)];

    /* tubes d'acier : aspiration (froide) et refoulement (chaude) */
    tuyau(g, [[60, 270], [460, 270]], 80, FROID);
    tuyau(g, [[700, 270], [1150, 270]], 80, CHAUD);
    D.el("rect", { x: 1148, y: 222, width: 22, height: 96, rx: 4, fill: "#4d5866" }, g);
    D.el("rect", { x: 60, y: 222, width: 22, height: 96, rx: 4, fill: "#4d5866" }, g);

    /* culasse : deux chambres (aspiration | refoulement), plaque à clapets */
    D.el("rect", { x: 450, y: 226, width: 260, height: 88, rx: 8, fill: "url(#vm-acier)" }, g);
    D.el("rect", { x: 464, y: 240, width: 106, height: 60, fill: FROID }, g);
    D.el("rect", { x: 590, y: 240, width: 106, height: 60, fill: CHAUD }, g);
    const chaud = D.el("rect", { x: 450, y: 226, width: 260, height: 88, rx: 8, fill: "#e2562c", opacity: 0 }, g); // la culasse chauffe
    D.el("rect", { x: 480, y: 300, width: 80, height: 14, fill: FROID }, g);
    D.el("rect", { x: 600, y: 300, width: 80, height: 14, fill: CHAUD }, g);

    /* cylindre, carter, huile au fond du carter */
    D.el("rect", { x: 470, y: 300, width: 220, height: 200, fill: "url(#vm-acier-h)" }, g);
    D.el("rect", { x: 400, y: 490, width: 360, height: 190, rx: 26, fill: "url(#vm-acier-h)" }, g);
    D.el("rect", { x: 414, y: 504, width: 332, height: 162, rx: 14, fill: "#f4f8fc" }, g);
    D.el("rect", { x: 414, y: 640, width: 332, height: 26, rx: 8, fill: D.HUILE, opacity: 0.75 }, g);
    D.el("rect", { x: 484, y: 314, width: 192, height: 196, fill: "#f4f8fc" }, g);
    const tint = D.el("rect", { x: 484, y: 314, width: 192, height: 196 }, g);
    const mols = D.el("g", {}, g);

    /* vilebrequin, bielle, piston, clapets */
    const bielle = [D.el("line", { stroke: "#3f4a55", "stroke-width": 22, "stroke-linecap": "round" }, g), D.el("line", { stroke: "#aab6c3", "stroke-width": 10, "stroke-linecap": "round" }, g)];
    const poids = D.el("circle", { r: 27, fill: "#6b7785", stroke: "#3f4a55", "stroke-width": 3 }, g);
    const bras = D.el("line", { x1: CX, y1: CY, stroke: "#7d8a98", "stroke-width": 22, "stroke-linecap": "round" }, g);
    D.el("circle", { cx: CX, cy: CY, r: 16, fill: "url(#vm-acier)", stroke: "#3f4a55", "stroke-width": 3 }, g);
    const manet = D.el("circle", { r: 11, fill: "#24384f", stroke: "#aab6c3", "stroke-width": 3 }, g);
    const piston = D.el("g", {}, g);
    D.el("rect", { x: 486, y: 0, width: 188, height: 66, rx: 6, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, piston);
    [12, 24].forEach(y => D.el("line", { x1: 486, y1: y, x2: 674, y2: y, stroke: "#5d6b7a", "stroke-width": 2 }, piston));
    D.el("circle", { cx: CX, cy: PIN, r: 10, fill: "#24384f", stroke: "#aab6c3", "stroke-width": 3 }, piston);
    const clapA = D.el("rect", { x: 484, y: 314, width: 72, height: 7, rx: 3, fill: "#24384f" }, g);
    const clapR = D.el("rect", { x: 604, y: 293, width: 72, height: 7, rx: 3, fill: "#24384f" }, g);

    /* l'arbre sort par la garniture, passe l'accouplement, entre dans le moteur (dehors) */
    D.el("rect", { x: CX, y: 540, width: 440, height: 20, fill: "url(#vm-acier)" }, g);
    const garn = D.el("g", {}, g);
    D.el("rect", { x: 752, y: 520, width: 48, height: 60, rx: 6, fill: "url(#vm-marine)", stroke: "#5d80ad", "stroke-width": 3 }, garn);
    [530, 570].forEach(y => D.el("circle", { cx: 776, cy: y, r: 4.5, fill: "#aab6c3" }, garn));
    const garnLum = D.el("rect", { x: 742, y: 508, width: 68, height: 84, rx: 12, fill: "none", stroke: "#ff6b35", "stroke-width": 7 }, g);
    D.el("rect", { x: 880, y: 520, width: 28, height: 60, rx: 4, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    D.el("rect", { x: 914, y: 520, width: 28, height: 60, rx: 4, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    const boulons = [0, 1, 2].map(() => D.el("circle", { cx: 928, r: 4.5, fill: "#24384f" }, g));
    D.el("rect", { x: 1000, y: 472, width: 360, height: 160, rx: 16, fill: "url(#vm-marine)", stroke: D.BLEU, "stroke-width": 4 }, g);
    D.el("rect", { x: 1016, y: 488, width: 328, height: 128, rx: 6, fill: "#eef2f6" }, g);
    D.el("rect", { x: 1016, y: 532, width: 328, height: 40, fill: "url(#vm-acier)" }, g);
    D.el("rect", { x: 1000, y: 540, width: 20, height: 20, fill: "url(#vm-acier)" }, g);
    [492, 576].forEach(y => { // le bobinage : des bobines de cuivre, en haut et en bas du rotor
      for (let i = 0; i < 6; i++) {
        D.el("rect", { x: 1026 + i * 54, y: y, width: 44, height: 36, rx: 10, fill: "url(#vm-cuivre)", stroke: "#6e3818", "stroke-width": 2 }, g);
        [10, 18, 26].forEach(d => D.el("line", { x1: 1032 + i * 54, y1: y + d, x2: 1064 + i * 54, y2: y + d, stroke: "#6e3818", "stroke-width": 2, opacity: 0.6 }, g));
      }
    });
    const bobLum = D.el("rect", { x: 1008, y: 480, width: 344, height: 144, rx: 10, fill: "none", stroke: "#ff6b35", "stroke-width": 7, "stroke-dasharray": "18 10" }, g);

    /* étiquettes : fixes, par phrase */
    D.etiquette(g, 60, 352, "aspiration", { "font-weight": 700 }); D.etiquette(g, 60, 390, "vapeur froide (BP)");
    D.etiquette(g, 790, 352, "refoulement", { "font-weight": 700 }); D.etiquette(g, 790, 390, "vapeur chaude (HP)");
    D.etiquette(g, 1180, 676, "moteur électrique", { "text-anchor": "middle", "font-weight": 700 });
    const labCu = D.el("g", {}, g);
    D.etiquette(labCu, 1180, 452, "bobinage en cuivre", { "text-anchor": "middle", fill: "#b0501f", "font-weight": 700 });
    const pCu = D.pastille(labCu, 1580, 726, "cuivre : jamais au contact de l'ammoniac", D.ORANGE, 30, "end");
    const labGa = D.el("g", {}, g);
    D.etiquette(labGa, 776, 730, "garniture d'étanchéité", { "font-weight": 700, "text-anchor": "middle" }); D.trait(labGa, 776, 700, 776, 592, "#ff6b35");
    D.etiquette(labGa, 900, 626, "accouplement", { "text-anchor": "middle", "font-size": 28 });
    const labMe = D.el("g", {}, g);
    D.etiquette(labMe, 60, 436, "clapet d'aspiration"); D.trait(labMe, 340, 430, 500, 322);
    D.etiquette(labMe, 790, 440, "clapet de refoulement"); D.trait(labMe, 800, 428, 668, 299);
    D.etiquette(labMe, 60, 540, "piston"); D.trait(labMe, 180, 532, 490, 470);
    const pHaut = D.pastille(g, 800, 726, "plus de 100 °C au refoulement", "#c0392b", 30);
    const labEau = D.el("g", {}, g);
    D.etiquette(labEau, 780, 162, "eau de refroidissement", texteBleu);

    /* les molécules : trois lots, un par tour de vilebrequin ; l'héroïne a son propre rang */
    const r = D.alea(51), M = 14, LOTS = [0, 1, 2].map(() => {
      const l = [];
      for (let j = 0; j < M; j++) l.push({ u: 0.06 + r() * 0.88, v: r(), e: r() * 0.6, w: r(), y0: 338, h: 14, maj: D.mol(mols) });
      return l;
    });
    const MOI = { u: 0.5, v: 0.35, e: 0.1, w: 0.5, y0: 344, h: 30 };
    const mila = D.heroine(g, { r: 30 });
    function place(m, L, top) { // position, température, opacité d'une molécule dont le cycle est à la phase L
      const cx = 498 + m.u * 164, cy = m.y0 + m.v * Math.max(4, top - m.y0 - m.h), yIn = 270 + (m.v - 0.5) * 28, yOut = 270 + (m.v - 0.5) * 28;
      if (L < 0) { const q = D.borne(1 + L / TOUR, 0, 1); return [D.lerp(80 + m.w * 300, 500, q * q), yIn, 0.1, D.borne((L + TOUR) / 0.9, 0, 1)]; }
      if (L < PI) {
        const k = D.lisse((L / PI - m.e) / 0.35), px = XA + (m.u - 0.5) * 40;
        return k < 0.5 ? [D.lerp(500, px, k * 2), D.lerp(yIn, 330, k * 2), 0.1, 1] : [D.lerp(px, cx, k * 2 - 1), D.lerp(330, cy, k * 2 - 1), 0.1, 1];
      }
      if (L < 1.62 * PI) return [cx, cy, tempDe(top), 1];
      if (L < TOUR) {
        const k = D.lisse(((L - 1.62 * PI) / (0.38 * PI) - m.w * 0.4) / 0.6), px = XR + (m.u - 0.5) * 40;
        return k < 0.5 ? [D.lerp(cx, px, k * 2), D.lerp(cy, 312, k * 2), 0.95, 1] : [D.lerp(px, 700 + m.u * 30, k * 2 - 1), D.lerp(312, yOut, k * 2 - 1), 0.95, 1];
      }
      const x = 700 + m.u * 30 + (L - TOUR) / TOUR * (430 + m.w * 140);
      return [x, yOut, 0.95, L < 2 * TOUR ? D.borne((1150 - x) / 50, 0, 1) : 0];
    }
    const tD = c.E[5] - 0.7; // la vapeur chaude part au refoulement
    return function (t) {
      const phi = t < tD ? D.courbe([[0, 0], [c.T[4], 4 * PI], [c.A(4, 0.5), 5 * PI], [tD, 6 * PI]], t, true) : 6 * PI + (t - tD) * TOUR / 3;
      const n = Math.floor(phi / TOUR), th = phi - n * TOUR, top = dessus(th);
      // piston, bielle, vilebrequin : un seul angle
      piston.setAttribute("transform", "translate(0 " + top.toFixed(1) + ")");
      const px = CX + RV * Math.sin(th), py = CY - RV * Math.cos(th), pinY = top + PIN;
      bielle.forEach(b => { b.setAttribute("x1", CX); b.setAttribute("y1", pinY.toFixed(1)); b.setAttribute("x2", px.toFixed(1)); b.setAttribute("y2", py.toFixed(1)); });
      manet.setAttribute("cx", px.toFixed(1)); manet.setAttribute("cy", py.toFixed(1));
      bras.setAttribute("x2", px.toFixed(1)); bras.setAttribute("y2", py.toFixed(1));
      poids.setAttribute("cx", (CX - 0.55 * RV * Math.sin(th)).toFixed(1)); poids.setAttribute("cy", (CY + 0.55 * RV * Math.cos(th)).toFixed(1));
      boulons.forEach((b, i) => b.setAttribute("cy", (550 + 22 * Math.sin(phi + i * TOUR / 3)).toFixed(1)));
      clapA.setAttribute("transform", "rotate(" + (th > 0.03 * TOUR && th < 0.48 * TOUR ? 26 : 0) + " 484 314)");
      clapR.setAttribute("transform", "rotate(" + (th > 1.62 * PI && th < 1.99 * PI ? 26 : 0) + " 676 300)");
      // la vapeur dans le cylindre prend la couleur de sa température
      const tb = th < PI ? 0.1 : 0.1 + (tempDe(top) - 0.1) * (1 - D.lisse((th - 1.75 * PI) / (0.25 * PI)));
      tint.setAttribute("fill", D.couleur(tb, true)); tint.setAttribute("fill-opacity", 0.3);
      for (let m = n - 1; m <= n + 1; m++) {
        const lot = LOTS[((m % 3) + 3) % 3], L = phi - m * TOUR;
        lot.forEach(mo => { const [x, y, temp, op] = place(mo, L, top); mo.maj(x, y, temp, true, op); });
      }
      // l'héroïne : dans le tube au ralenti, puis son cycle, puis le refoulement
      const L = phi - 4 * PI;
      let hx, hy, temp = 0.1, s = 0.58, serre = 0;
      if (L < 0) { hx = D.lerp(130, 500, D.lisse((L + 4 * PI) / (4 * PI))); hy = 270; s = 0.55; }
      else if (t < tD) { [hx, hy, temp] = place(MOI, L, top); s = L < PI ? 0.55 : 0.6; serre = L > PI && L < 1.75 * PI ? D.lisse((BDC - top) / 90) : 0; }
      else { hx = D.lerp(690, 1130, D.borne((t - tD) / (c.D - 0.9 - tD), 0, 1)); hy = 270; temp = 0.95; s = 0.55; }
      const humeur = t < c.T[4] ? "sourire" : L < PI ? "surprise" : temp > 0.55 ? "chaud" : "sourire";
      mila({ x: hx, y: hy, s: s, t: t, temp: temp, etat: "vapeur", humeur: humeur, ecrase: serre * 0.85, regard: [1, 0], op: D.borne((c.D - 0.25 - t) / 0.4, 0, 1) });
      // pièces repérées, phrase par phrase
      const pulse = 0.65 + 0.35 * Math.sin(t * 7);
      const f2 = D.fenetre(t, c.T[2] - 0.1, c.E[2] + 0.8, 0.5), f3 = D.fenetre(t, c.T[3] - 0.1, c.E[3] + 1.2, 0.5);
      labCu.setAttribute("opacity", f2.toFixed(2)); bobLum.setAttribute("opacity", (f2 * pulse).toFixed(2));
      labGa.setAttribute("opacity", f3.toFixed(2)); garnLum.setAttribute("opacity", (f3 * pulse).toFixed(2));
      labMe.setAttribute("opacity", D.fenetre(t, c.T[4] - 0.2, c.T[6] - 0.3, 0.5).toFixed(2));
      pHaut.setAttribute("opacity", D.lisse((t - c.T[5]) / 0.5).toFixed(2));
      const eau = D.lisse((t - c.T[6] + 0.2) / 0.6);
      chemise.setAttribute("opacity", eau.toFixed(2)); labEau.setAttribute("opacity", eau.toFixed(2));
      filEau[0](t, 150, eau); filEau[1](t, 110, eau);
      chaud.setAttribute("opacity", (0.4 * D.lisse((t - c.T[5]) / 2) * (1 - 0.75 * D.lisse((t - c.T[6]) / 2.5))).toFixed(2));
      return { carte: D.courbe([[0, 9], [c.T[4], 9.15], [tD, 9.9], [c.D - 0.2, 10.5]], t, true), temp: temp, etat: "vapeur", humeur: humeur };
    };
  };

  /* ---------- 5 · le séparateur d'huile (cuve verticale, déflecteur, flotteur de retour d'huile) ----------
     Le flux entre sur le côté, heurte un déflecteur suspendu, descend, contourne son bord bas, remonte
     vers la sortie du haut : les gouttes, trop lourdes pour virer, tombent dans la couche d'huile. Le
     flotteur monte avec l'huile et, par un levier, soulève le pointeau du retour d'huile (tube du bas). */
  S.huile = function (g, c) {
    const CHAUD = "#fbe5d6", PX = 885, PY = 668, LB = 125, GX = 840;
    const cu = D.cuve(g, { x: 700, y: 210, l: 260, h: 490, vertical: true }); // intérieur x 714-946, y 224-686
    D.el("rect", { x: 714, y: 224, width: 232, height: 462, fill: D.couleur(0.9, true), opacity: 0.1 }, cu.dedans);
    // déflecteur suspendu à la calotte
    D.el("rect", { x: 783, y: 226, width: 6, height: 70, fill: "#6b7785" }, cu.dedans);
    D.el("rect", { x: 780, y: 290, width: 12, height: 180, rx: 5, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, cu.dedans);
    const oil = D.liquide(cu.dedans, { x0: cu.x0, x1: cu.x1, yh: cu.yh, yb: cu.yb, niveau: () => nv, couleur: () => D.HUILE, opacite: 0.9 });
    let nv = 0.08;
    // flotteur, levier et pointeau (le pointeau soulevé ouvre le retour d'huile)
    const bras = D.el("line", { x1: PX, y1: PY, stroke: "#4d5866", "stroke-width": 9, "stroke-linecap": "round" }, cu.dedans);
    const tige = D.el("line", { x1: GX, x2: GX, stroke: "#4d5866", "stroke-width": 6 }, cu.dedans);
    const pointeau = D.el("path", { fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, cu.dedans);
    const boule = D.el("circle", { r: 20, fill: "url(#vm-acier)", stroke: "#4d5866", "stroke-width": 3 }, cu.dedans);
    D.el("circle", { cx: PX, cy: PY, r: 8, fill: "#24384f" }, cu.dedans);
    D.el("circle", { cx: GX, r: 5, fill: "#24384f" }, cu.dedans); // articulation, posée à chaque image
    const arti = cu.dedans.lastChild;
    // tubes : entrée (côté, en haut), sortie vapeur (en haut), retour d'huile (en bas)
    tuyau(g, [[60, 360], [716, 360]], 92, CHAUD);
    tuyau(g, [[850, 248], [850, 185], [1140, 185]], 80, CHAUD);
    tuyau(g, [[GX, 692], [GX, 738], [470, 738]], 44, "#f6eed8");
    D.el("rect", { x: 1138, y: 139, width: 22, height: 92, rx: 4, fill: "#4d5866" }, g);
    D.el("rect", { x: 58, y: 314, width: 22, height: 92, rx: 4, fill: "#4d5866" }, g);
    const filHuile = fil(g, [[GX, 700], [GX, 738], [470, 738]], 9, D.HUILE);

    // le chemin de l'héroïne (et des molécules de vapeur) : tube, déflecteur, remontée, sortie
    const ch = chemin([[130, 360], [430, 360], [690, 360], [736, 362], [750, 410], [758, 470], [790, 506], [835, 506], [866, 470], [872, 400], [862, 330], [852, 262], [851, 215], [858, 186], [920, 185], [1020, 185], [1120, 185]]);
    const cm = ch.cum;
    const r = D.alea(77), V = [];
    for (let i = 0; i < 16; i++) V.push({ s: r(), o: r() * 2 - 1, maj: D.mol(g) });
    const NG = 9, gouttes = [];
    for (let j = 0; j < NG; j++) gouttes.push({ a: j * TOUR / NG, r: 34 + 14 * D.frac(j * 0.37), tr: c.A(5, 0.1 + 0.6 * j / (NG - 1)), e: D.el("circle", { r: 3.5 + (j % 3), fill: D.HUILE, stroke: "#fff", "stroke-width": 1 }, g) });
    const tomb = D.bulles(D.el("g", {}, g), 8, 83, true);
    const mila = D.heroine(g, { r: 30 });
    const sPos = t => D.courbe([[0, 30], [c.T[2], 130], [c.E[2], 300], [c.E[3], 470], [c.E[4], 540], [c.T[5], 552],
      [c.A(5, 0.3), cm[4]], [c.A(5, 0.6), cm[6]], [c.E[5], cm[9]], [c.A(6, 0.2), cm[12]], [c.D - 0.5, ch.l]], t, true);

    // étiquettes, phrase par phrase
    D.etiquette(g, 60, 290, "vapeur chaude + huile", { "font-weight": 700 });
    D.etiquette(g, 880, 128, "vers le condenseur");
    const labHu = D.el("g", {}, g);
    D.etiquette(labHu, 560, 646, "huile"); D.trait(labHu, 650, 640, 745, 652);
    const labDef = D.el("g", {}, g);
    D.etiquette(labDef, 470, 262, "déflecteur"); D.trait(labDef, 640, 258, 780, 300);
    const labFlo = D.el("g", {}, g);
    D.etiquette(labFlo, 540, 566, "flotteur"); const traitFlo = D.trait(labFlo, 665, 560, 752, 612);
    const labCar = D.etiquette(g, 740, 696, "vers le carter du compresseur", { "text-anchor": "end" });
    // k3 : l'huile se mêle aux autres fluides, pas à l'ammoniac
    const enc3 = D.el("g", {}, g), enc4 = D.el("g", {}, g);
    [enc3, enc4].forEach(e => D.el("rect", { x: 1000, y: 312, width: 450, height: 290, rx: 18, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 3 }, e));
    const FL = D.couleur(0.05, false), re = D.alea(5);
    D.el("rect", { x: 1020, y: 336, width: 110, height: 110, rx: 12, fill: "#e4e8da", stroke: "#4d5866", "stroke-width": 4 }, enc3);
    for (let i = 0; i < 26; i++) D.el("circle", { cx: 1030 + re() * 90, cy: 346 + re() * 90, r: 3 + re() * 4, fill: i % 2 ? D.HUILE : FL, opacity: 0.85 }, enc3);
    D.el("rect", { x: 1020, y: 466, width: 110, height: 110, rx: 12, fill: "#f4f8fc", stroke: "#4d5866", "stroke-width": 4 }, enc3);
    D.el("rect", { x: 1024, y: 470, width: 102, height: 62, fill: FL, opacity: 0.85 }, enc3);
    D.el("rect", { x: 1024, y: 532, width: 102, height: 40, fill: D.HUILE }, enc3);
    D.lignes(enc3, 1150, 372, ["autres fluides :", "huile mêlée"], { "font-size": 32, "font-weight": 700, fill: "#10233c", "font-family": POLICE }, 38);
    D.lignes(enc3, 1150, 512, ["ammoniac :", "huile à part"], { "font-size": 32, "font-weight": 700, fill: "#10233c", "font-family": POLICE }, 38);
    // k4 : l'huile qui part avec le fluide s'étale sur la paroi des tubes
    D.etiquette(enc4, 1020, 358, "tube d'un échangeur", { "font-weight": 700 });
    D.el("rect", { x: 1020, y: 384, width: 410, height: 110, rx: 8, fill: "url(#vm-acier)" }, enc4);
    D.el("rect", { x: 1020, y: 398, width: 410, height: 82, fill: "#f4f8fc" }, enc4);
    D.el("rect", { x: 1020, y: 424, width: 410, height: 56, fill: FL, opacity: 0.85 }, enc4);
    [398, 468].forEach(y => D.el("rect", { x: 1020, y: y, width: 410, height: 12, fill: D.HUILE }, enc4));
    D.etiquette(enc4, 1020, 548, "huile collée à la paroi");
    const pCol = D.pastille(g, 60, 462, "elle se collerait dans les échangeurs", D.ORANGE, 30);

    return function (t) {
      // niveau d'huile, flotteur, pointeau
      const depth = D.courbe([[0, 66], [c.T[5], 66], [c.E[5], 74], [c.A(6, 0.4), 104], [c.D - 0.3, 88]], t);
      nv = depth / 462; oil.maj(t);
      const surf = oil.surface(800, t), by = surf - 10, sa = D.borne((PY - by) / LB, 0, 0.95), ca = Math.sqrt(1 - sa * sa);
      const bx = PX - LB * ca, ya = PY - (PX - GX) * sa / ca, tip = Math.min(684, ya + 44), ouvert = D.borne((684 - tip) / 22, 0, 1);
      boule.setAttribute("cx", bx.toFixed(1)); boule.setAttribute("cy", by.toFixed(1));
      bras.setAttribute("x2", bx.toFixed(1)); bras.setAttribute("y2", by.toFixed(1));
      traitFlo.setAttribute("x2", (bx - 24).toFixed(1)); traitFlo.setAttribute("y2", (by - 6).toFixed(1));
      arti.setAttribute("cy", (tip - 44).toFixed(1));
      tige.setAttribute("y1", (tip - 44).toFixed(1)); tige.setAttribute("y2", (tip - 18).toFixed(1));
      pointeau.setAttribute("d", "M " + (GX - 10) + " " + (tip - 18) + " L " + (GX + 10) + " " + (tip - 18) + " L " + GX + " " + tip + " Z");
      filHuile(t, 110, ouvert);
      // le flux de vapeur
      V.forEach(m => {
        const u = D.frac(m.s + t * 0.05), s = u * ch.l, p = ch.pos(s), n = ch.norm(s), o = m.o * (s < cm[3] ? 22 : 13);
        m.maj(p[0] + n[0] * o, p[1] + n[1] * o, 0.9, true, D.fenetre(u, 0, 1, 0.05));
      });
      // l'héroïne et ses gouttes d'huile
      const s = sPos(t), p = ch.pos(s), arrive = D.lisse((t - c.T[2] + 0.4) / 0.8);
      gouttes.forEach(o => {
        const off = tt => { const a = o.a + tt * 1.6, q = ch.pos(sPos(tt)); return [q[0] + o.r * Math.cos(a), q[1] + D.borne(0.6 * o.r * Math.sin(a), -26, 26)]; };
        let x, y, op = arrive;
        if (t < o.tr) [x, y] = off(t);
        else {
          const [x0, y0] = off(o.tr), dt = t - o.tr; x = x0; y = y0 + 650 * dt * dt;
          if (y > surf) op = 0;
        }
        o.e.setAttribute("cx", x.toFixed(1)); o.e.setAttribute("cy", y.toFixed(1)); o.e.setAttribute("opacity", op.toFixed(2));
      });
      tomb(t, q => [835 + q * 40, 520, surf + 4, D.fenetre(t, c.A(5, 0.2), c.E[6] - 1, 0.8), D.HUILE]);
      const humeur = t < c.A(5, 0.15) ? "chaud" : s < cm[10] ? "surprise" : "sourire";
      mila({ x: p[0], y: p[1], s: 0.55, t: t, temp: 0.9, etat: "vapeur", humeur: humeur, regard: [1, 0], op: D.borne((c.D - 0.2 - t) / 0.4, 0, 1) });
      // textes
      labDef.setAttribute("opacity", D.fenetre(t, c.T[5] - 0.1, c.E[5] + 0.6, 0.5).toFixed(2));
      enc3.setAttribute("opacity", D.fenetre(t, c.T[3] - 0.1, c.E[3] + 0.2, 0.5).toFixed(2));
      enc4.setAttribute("opacity", D.fenetre(t, c.T[4] - 0.1, c.E[4] + 0.5, 0.5).toFixed(2));
      pCol.setAttribute("opacity", D.fenetre(t, c.T[4] - 0.1, c.E[4] + 0.5, 0.5).toFixed(2));
      const k6 = D.lisse((t - c.T[6] + 0.2) / 0.5);
      labFlo.setAttribute("opacity", k6.toFixed(2)); labCar.setAttribute("opacity", k6.toFixed(2));
      return { carte: 10.5 + 1.8 * D.borne(s / ch.l, 0, 1), temp: 0.9, etat: "vapeur", humeur: humeur };
    };
  };

  /* ---------- 6 · le condenseur évaporatif (serpentin d'acier arrosé, ventilateur, bac, pompe) ----------
     Quatre rangées de tubes en zigzag : la vapeur entre en haut à gauche, elle ressort liquide en bas à
     gauche. L'eau des rampes ruisselle de rangée en rangée jusqu'au bac ; la pompe (à droite) la
     renvoie aux rampes ; l'air entre bas, monte par les côtés et à travers le serpentin, sort par le
     ventilateur avec des panaches de vapeur d'eau. */
  S.condenseur = function (g, c) {
    const Y = [372, 448, 524, 600], XL = 650, XR = 1050, RB = 38, EAU = "#4fb3c4", GAP = [[326, 342], [402, 418], [478, 494], [554, 570], [630, 652]];
    const pts = [[230, Y[0]], [430, Y[0]]];
    for (let i = 0; i < 4; i++) { // les rangées et leurs coudes
      const dir = i % 2 ? -1 : 1, xe = dir > 0 ? XR : XL, ym = (Y[i] + Y[i + 1]) / 2;
      pts.push([dir > 0 ? XL : XR, Y[i]], [(XL + XR) / 2, Y[i]], [xe, Y[i]]);
      if (i < 3) [-45, 0, 45].forEach(a => pts.push([xe + dir * RB * Math.cos(a * PI / 180), ym + RB * Math.sin(a * PI / 180)]));
    }
    pts.push([430, Y[3]], [230, Y[3]]);
    const ch = chemin(pts), SL = 420, SF = ch.l - 420; // SL : entrée du serpentin ; SF : sa sortie
    const ligne = (a, b) => { const o = []; for (let s = a; s < b; s += 5) o.push(ch.pos(s).map(v => v.toFixed(1)).join(",")); o.push(ch.pos(b).map(v => v.toFixed(1)).join(",")); return o.join(" "); };

    // la carcasse, le bac d'eau, la cheminée du ventilateur
    D.el("rect", { x: 500, y: 268, width: 700, height: 450, rx: 10, fill: "url(#vm-acier-h)" }, g);
    D.el("rect", { x: 514, y: 282, width: 672, height: 422, fill: "#eef6fb" }, g);
    [514, 1186].forEach(x => { D.el("rect", { x: x - 14, y: 626, width: 14, height: 28, fill: "#eef6fb" }, g); for (let k = 0; k < 3; k++) D.el("line", { x1: x - 14, y1: 630 + k * 10, x2: x, y2: 636 + k * 10, stroke: "#4d5866", "stroke-width": 3 }, g); });
    D.el("rect", { x: 780, y: 190, width: 200, height: 82, rx: 8, fill: "url(#vm-acier-h)" }, g);
    D.el("rect", { x: 794, y: 200, width: 172, height: 72, fill: "#fffdf8" }, g);
    const vent = D.ventilateur(g, 880, 236, 34);
    const bac = D.liquide(g, { x0: 514, x1: 1186, yh: 282, yb: 704, niveau: () => 50 / 422, couleur: () => EAU, opacite: 0.85 });
    D.etiquette(g, 530, 694, "bac d'eau", { fill: D.BLEU, "font-weight": 700 });

    // l'air : des chevrons montent dans les deux couloirs latéraux (derrière le serpentin)
    const air = D.el("g", {}, g), AIR = [];
    for (let k = 0; k < 7; k++) [550, 1150].forEach((x, j) => AIR.push({ x: x, f: D.frac(k / 7 + j * 0.31), maj: D.chevron(air) }));
    const entrees = [[0, -90, 400, 490, 640], [1, -90, 400, 490, 640], [2, 90, 1255, 1205, 640]].map(([k, a, x0, x1, y]) => ({ k: k, a: a, x0: x0, x1: x1, y: y, maj: D.chevron(air) }));
    const colAir = y => y > 520 ? "#3d7fca" : y > 420 ? "#6b92b8" : "#e8914a";

    // serpentin : pellicule d'eau, tube d'acier, intérieur
    const film = D.el("polyline", { points: ligne(SL, SF), fill: "none", stroke: "#79c3d6", "stroke-width": 66, "stroke-linejoin": "round", opacity: 0 }, g);
    D.el("polyline", { points: ligne(0, ch.l), fill: "none", stroke: "#4d5866", "stroke-width": 56, "stroke-linejoin": "round" }, g);
    D.el("polyline", { points: ligne(0, ch.l), fill: "none", stroke: "#f6ede4", "stroke-width": 38, "stroke-linejoin": "round" }, g);
    D.el("rect", { x: 200, y: 344, width: 22, height: 56, rx: 4, fill: "#4d5866" }, g); D.el("rect", { x: 200, y: 572, width: 22, height: 56, rx: 4, fill: "#4d5866" }, g);
    const vap = D.el("g", {}, g), perles = D.el("g", {}, g);
    const tL = D.couleur(0.6, false);
    const nap = [[Y[2], 0.12, 0.42, XL, XR], [Y[3], 0.5, 0.85, XR, XL]].map(([y, a, b, xa, xb]) => D.liquide(g, { x0: XL, x1: XR, yh: y - 19, yb: y + 19, niveau: x => D.lerp(a, b, Math.abs(x - xa) / (XR - XL)), couleur: () => tL, opacite: 0.88 }));
    D.el("rect", { x: 230, y: Y[3] - 19, width: 420, height: 38, fill: tL, opacity: 0.88 }, g);
    const filSortie = fil(g, [[640, Y[3]], [240, Y[3]]], 7, "#fff");
    const fond = D.el("g", {}, g); // l'héroïne, au-dessus des nappes (elle y flotte)
    // gouttelettes de condensation sur la paroi, dans la 2e rangée
    const rg = D.alea(19), PERLES = [];
    for (let i = 0; i < 16; i++) PERLES.push(D.el("circle", { cx: XL + 20 + rg() * (XR - XL - 40), cy: Y[1] + (i % 2 ? 14 : -14), r: 3 + rg() * 3, fill: tL, stroke: "#fff", "stroke-width": 1.5 }, perles));

    // les rampes d'arrosage, la pluie qui ruisselle de rangée en rangée
    D.el("polyline", { points: "1186,318 570,318", fill: "none", stroke: "#4d5866", "stroke-width": 14 }, g);
    for (let x = 600; x <= 1140; x += 60) D.el("path", { d: "M " + (x - 7) + " 324 L " + (x + 7) + " 324 L " + x + " 336 Z", fill: "#4d5866" }, g);
    const pluie = GAP.map((gp, i) => D.bulles(D.el("g", {}, g), 10, 90 + i, true));

    // la pompe et son tuyau (de l'eau du bac aux rampes)
    tuyau(g, [[1186, 680], [1264, 680]], 26, "#9fd3e0"); tuyau(g, [[1328, 680], [1480, 680], [1480, 318], [1186, 318]], 26, "#9fd3e0");
    D.el("circle", { cx: 1296, cy: 680, r: 32, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, g);
    D.el("path", { d: "M 1284 664 L 1314 680 L 1284 696 Z", fill: D.BLEU }, g);
    const filPompe = [fil(g, [[1190, 680], [1264, 680]], 3, "#fff"), fil(g, [[1328, 680], [1480, 680], [1480, 318], [1190, 318]], 14, "#fff")];

    // chaleur (flèches dans les intervalles), buées, panaches
    const chal = [];
    for (let i = 0; i < 3; i++) for (let k = 0; k < 8; k++) chal.push({ x: 690 + k * 48 + (i % 2) * 20, y: (Y[i] + Y[i + 1]) / 2, a: k % 2 ? 180 : 0, k: k + i * 3, e: D.el("path", { d: "M 0 -8 V 5 M -5 -1 L 0 7 L 5 -1", fill: "none", stroke: "#e2662c", "stroke-width": 4.5, "stroke-linecap": "round", "stroke-linejoin": "round" }, g) });
    const buees = D.bulles(D.el("g", {}, g), 10, 71, false);
    const puffs = [0, 1, 2, 3, 4, 5, 6].map(k => ({ k: k, e: D.el("ellipse", { fill: "#fff", stroke: "#c5d3e0", "stroke-width": 3 }, g) }));

    // étiquettes
    D.etiquette(g, 200, 336, "vapeur chaude (HP)", { "font-weight": 700 });
    D.etiquette(g, 200, 668, "liquide (HP)", { "font-weight": 700 });
    const labRa = D.el("g", {}, g);
    D.etiquette(labRa, 60, 270, "rampes d'arrosage"); D.trait(labRa, 360, 262, 572, 316);
    D.etiquette(labRa, 1215, 478, "serpentin"); D.trait(labRa, 1210, 470, 1112, 484);
    const labVe = D.el("g", {}, g);
    D.etiquette(labVe, 770, 236, "ventilateur", { "text-anchor": "end" });
    D.etiquette(labVe, 490, 716, "air frais", { "text-anchor": "end", fill: "#2f6fb8", "font-weight": 700 });
    const labZo = D.el("g", {}, g);
    [["vapeur", 380], ["gouttes", 456], ["nappe", 532]].forEach(([s, y]) => D.etiquette(labZo, 1215, y, s, { "font-weight": 700, fill: D.BLEU }));
    const labVa = D.etiquette(g, 1000, 150, "vapeur d'eau", { fill: "#637285", "font-weight": 700 });
    const labPo = D.etiquette(g, 1296, 744, "pompe", { "text-anchor": "middle" });
    const pChal = D.pastille(g, 60, 190, "l'eau qui s'évapore emporte la chaleur", D.ORANGE, 30);
    const pEau = D.pastille(g, 60, 190, "eau traitée et surveillée : tartre, bactéries", "#2f6fb8", 28);
    const mila = D.heroine(fond, { r: 30 });
    const loupe = D.el("g", {}, g); // la même héroïne, en grand, pendant qu'elle se condense
    D.el("circle", { cx: 1350, cy: 604, r: 58, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, loupe);
    const milaL = D.heroine(loupe, { r: 30 });
    const sPos = t => D.courbe([[0, 20], [c.T[2], 60], [c.E[3], 200], [c.T[4], 380], [c.T[4] + 1.5, 500], [c.E[4], 810], [c.T[5], 830], [c.E[5], 1920], [c.T[6], 1990], [c.E[6], 2380], [c.D - 0.4, ch.l - 40]], t, true);
    const V = []; for (let i = 0; i < 22; i++) V.push({ s: i / 22, o: rg() * 2 - 1, maj: D.mol(vap) });

    return function (t) {
      const rain = D.lisse((t - c.T[2] + 0.2) / 0.8), tm = D.lisse((t - c.T[4] + 0.2) / 0.8), ven = D.lisse((t - c.T[3] + 0.2) / 0.6);
      bac.maj(t); nap.forEach(n => n.maj(t));
      film.setAttribute("opacity", (0.55 * rain).toFixed(2));
      pluie.forEach((b, i) => b(t, q => [590 + q * 520, GAP[i][0], GAP[i][1], rain, EAU]));
      // le ventilateur, l'air
      const tf = Math.max(0, t - c.T[3]);
      vent(520 * (tf < 1.2 ? 1.2 * (D.lerp(0, 1, tf / 1.2) ** 3 - (tf / 1.2) ** 4 / 2) : tf - 0.6));
      AIR.forEach(a => { const f = D.frac(a.f + t * 0.12), y = 640 - f * 340; a.maj(a.x + Math.sin(a.f * 9) * 14, y, 180, colAir(y), ven * D.fenetre(f, 0, 1, 0.1) * 0.9); });
      entrees.forEach(e => { const f = D.frac(e.k / 3 + t * 0.35); e.maj(D.lerp(e.x0, e.x1, f), e.y, e.a, "#3d7fca", ven * D.fenetre(f, 0, 1, 0.2) * 0.9); });
      // chaleur, buées, panaches
      chal.forEach(h => { const o = tm * (0.45 + 0.55 * Math.sin(t * 4 + h.k) ** 2); h.e.setAttribute("transform", "translate(" + h.x + " " + h.y + ") rotate(" + h.a + ")"); h.e.setAttribute("opacity", o.toFixed(2)); });
      buees(t, q => { const x = q < 0.5 ? 520 + q * 90 : 1125 + (q - 0.5) * 90; return [x, 640, 300, tm * 0.8, "#9fb9cf"]; });
      puffs.forEach(p => {
        const f = D.frac(p.k / 7 + t * 0.22);
        p.e.setAttribute("cx", (880 + Math.sin(p.k * 2 + f * 3) * 22).toFixed(1)); p.e.setAttribute("cy", (198 - f * 124).toFixed(1));
        p.e.setAttribute("rx", (20 + f * 36).toFixed(1)); p.e.setAttribute("ry", (14 + f * 22).toFixed(1));
        p.e.setAttribute("opacity", (tm * D.fenetre(f, 0, 1, 0.25) * 0.95).toFixed(2));
      });
      // l'héroïne et la vapeur
      const s = sPos(t), p = ch.pos(s);
      const temp = D.courbe([[0, 0.95], [820, 0.85], [1300, 0.62], [1500, 0.58], [1980, 0.55]], s, true);
      const etat = s < 1250 ? "vapeur" : s < 1450 ? "bout" : "liquide";
      const humeur = s > 1180 && s < 1550 ? "surprise" : temp > 0.8 ? "chaud" : "sourire";
      mila({ x: p[0], y: p[1], s: 0.4, t: t, temp: temp, etat: etat === "bout" ? "liquide" : etat, humeur: humeur, regard: [1, 0], op: D.borne((c.D - 0.2 - t) / 0.4, 0, 1) });
      milaL({ x: 1350, y: 604, s: 1, t: t, temp: temp, etat: etat === "bout" ? "liquide" : etat, humeur: humeur, regard: [0, 0] });
      loupe.setAttribute("opacity", D.fenetre(t, c.T[5] - 0.1, c.E[5] + 0.6, 0.5).toFixed(2));
      V.forEach(m => {
        const u = D.frac(m.s + t * 0.055), sv = 60 + u * 1240, q = ch.pos(sv), n = ch.norm(sv);
        m.maj(q[0] + n[0] * m.o * 9, q[1] + n[1] * m.o * 9, D.courbe([[0, 0.95], [820, 0.85], [1300, 0.62]], sv, true), true, D.fenetre(u, 0, 1, 0.1));
      });
      const gt = D.lisse((t - c.T[5] + 0.3) / 0.8);
      PERLES.forEach(e => e.setAttribute("opacity", gt.toFixed(2)));
      filSortie(t, 90, D.lisse((t - c.T[5]) / 1.5));
      const po = D.lisse((t - c.T[6] + 0.3) / 0.6);
      filPompe.forEach(f => f(t, 120, po));
      // textes
      labRa.setAttribute("opacity", D.fenetre(t, c.T[2] - 0.1, c.E[2] + 0.8, 0.5).toFixed(2));
      labVe.setAttribute("opacity", D.fenetre(t, c.T[3] - 0.1, c.E[3] + 0.8, 0.5).toFixed(2));
      labZo.setAttribute("opacity", D.fenetre(t, c.T[5] - 0.1, c.E[5] + 1, 0.5).toFixed(2));
      labVa.setAttribute("opacity", D.fenetre(t, c.T[4] - 0.1, c.E[4] + 0.5, 0.5).toFixed(2));
      pChal.setAttribute("opacity", D.fenetre(t, c.T[4] - 0.1, c.E[4] + 0.5, 0.5).toFixed(2));
      labPo.setAttribute("opacity", D.fenetre(t, c.T[6] - 0.2, c.E[6] + 0.8, 0.5).toFixed(2));
      pEau.setAttribute("opacity", D.lisse((t - c.T[7] + 0.1) / 0.5).toFixed(2));
      return { carte: 12.3 + 1.2 * D.borne(s / ch.l, 0, 1), temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* ---------- 7 · le réservoir haute pression (cuve couchée, air, manomètre, purgeur) ----------
     Le liquide du condenseur tombe dans la nappe ; l'air (gris, plus gros que la vapeur) s'accumule
     dans la poche de gaz et fait monter la pression (manomètre) ; le purgeur l'envoie, par une ligne
     d'évent, dans une bouteille d'eau qui retient l'ammoniac entraîné ; le liquide repart par le tube
     plongeur, qui puise tout près du fond. */
  S.reservoir = function (g, c) {
    const LIQ = D.couleur(0.5, false), MX = 580, MY = 244, AX = 880, NA = 14;
    const cu = D.cuve(g, { x: 340, y: 360, l: 800, h: 290 }); // intérieur x 354-1126, y 374-636
    const nap = D.liquide(cu.dedans, { x0: cu.x0, x1: cu.x1, yh: cu.yh, yb: cu.yb, niveau: () => 0.55, couleur: () => LIQ, opacite: 0.86 });

    // tuyauterie : arrivée du condenseur (en haut à gauche), tube plongeur (à droite), manomètre, purgeur, ligne d'évent, bouteille d'eau
    const jet = D.el("rect", { x: 410, y: 392, width: 24, fill: LIQ, opacity: 0.85 }, g);
    const rides = [0, 1].map(() => D.el("ellipse", { cy: 492, ry: 4, fill: "none", stroke: "#fff", "stroke-width": 2.5 }, g));
    tuyau(g, [[60, 215], [420, 215], [420, 392]], 70, LIQ);
    D.el("rect", { x: 58, y: 180, width: 22, height: 70, rx: 4, fill: "#4d5866" }, g);
    tuyau(g, [[1080, 592], [1080, 445], [1330, 445]], 56, LIQ);
    D.el("rect", { x: MX - 7, y: 296, width: 14, height: 66, fill: "url(#vm-acier-h)" }, g);
    D.el("circle", { cx: MX, cy: MY, r: 56, fill: "url(#vm-acier)", stroke: "#4d5866", "stroke-width": 3 }, g);
    D.el("circle", { cx: MX, cy: MY, r: 46, fill: "#fffdf8" }, g);
    const arc = (a0, a1, coul) => {
      const p = a => [MX + 38 * Math.sin(a * PI / 180), MY - 38 * Math.cos(a * PI / 180)], A = p(a0), B = p(a1);
      D.el("path", { d: "M " + A[0].toFixed(1) + " " + A[1].toFixed(1) + " A 38 38 0 0 1 " + B[0].toFixed(1) + " " + B[1].toFixed(1), fill: "none", stroke: coul, "stroke-width": 8 }, g);
    };
    arc(-125, -30, "#3fa56a"); arc(-30, 40, "#e8a13a"); arc(40, 125, "#c0392b");
    const aiguille = D.el("line", { x1: MX, y1: MY, stroke: D.BLEU, "stroke-width": 5, "stroke-linecap": "round" }, g);
    D.el("circle", { cx: MX, cy: MY, r: 6, fill: D.BLEU }, g);
    D.texte(g, MX, MY + 38, "HP", { "text-anchor": "middle", "font-size": 26, "font-weight": 700, fill: D.BLEU, "font-family": POLICE });
    D.el("rect", { x: AX - 7, y: 296, width: 14, height: 66, fill: "url(#vm-acier-h)" }, g);
    D.el("rect", { x: 1025, y: 180, width: 130, height: 150, rx: 14, fill: "#f4f8fc", stroke: "#4d5866", "stroke-width": 5 }, g);
    D.el("rect", { x: 1029, y: 250, width: 122, height: 76, rx: 8, fill: "#7ec3d4", opacity: 0.8 }, g);
    tuyau(g, [[918, 262], [960, 262], [960, 205], [1000, 200], [1085, 200], [1090, 215], [1090, 300]], 44, "#eef2f6");
    tuyau(g, [[1155, 215], [1196, 215]], 30, "#eef2f6");
    D.el("rect", { x: AX - 38, y: 228, width: 76, height: 72, rx: 10, fill: "url(#vm-acier)", stroke: "#4d5866", "stroke-width": 3 }, g);
    D.el("rect", { x: AX - 24, y: 242, width: 48, height: 44, rx: 6, fill: "#eef2f6" }, g);
    const bouton = D.el("circle", { cx: AX, cy: 264, r: 12, fill: "#6b7785", stroke: "#24384f", "stroke-width": 3 }, g);
    const filArr = fil(g, [[70, 215], [420, 215], [420, 392]], 9, "#fff"), filOut = fil(g, [[1080, 590], [1080, 445], [1320, 445]], 6, "#fff");

    // les chemins : l'héroïne (tombe, flotte, plonge, repart) et l'air qui s'évacue
    const ch = chemin([[90, 215], [300, 215], [400, 217], [420, 255], [420, 330], [420, 392], [420, 445], [424, 490], [470, 503], [620, 500], [800, 502], [960, 508], [1040, 552], [1080, 590], [1080, 540], [1080, 480], [1104, 447], [1180, 445], [1330, 445]]);
    const cm = ch.cum;
    const vent = chemin([[AX, 380], [AX, 300], [AX, 266], [918, 262], [960, 262], [960, 215], [1000, 201], [1085, 201], [1090, 230], [1090, 300]]);
    const AIRS = [], r = D.alea(33);
    for (let i = 0; i < NA; i++) AIRS.push({ x: 520 + (i % 7) * 74 + (i > 6 ? 30 : 0) + (r() - 0.5) * 14, y: 398 + (i > 6 ? 34 : 0) + (r() - 0.5) * 8, e: D.el("circle", { r: 13, fill: D.AIR, stroke: "#5b646d", "stroke-width": 2 }, g) });
    AIRS.forEach(a => a.h = D.el("circle", { r: 3.5, fill: "#fff", opacity: 0.6 }, g));
    const NH = []; for (let j = 0; j < 6; j++) NH.push({ o: r() * 2 - 1, maj: D.mol(g) });
    const bulles = D.bulles(D.el("g", {}, g), 7, 61, false);
    const mila = D.heroine(g, { r: 30 });
    const sPos = t => D.courbe([[0, cm[0] + 40], [c.T[2] - 0.2, cm[2]], [c.A(2, 0.75), cm[7]], [c.E[2] + 0.4, cm[8]], [c.E[5], cm[11]], [c.A(6, 0.35), cm[13]], [c.D - 0.5, ch.l]], t, true);
    const tl = i => c.A(5, 0.04 + 0.55 * i / (NA - 1)), VIT = 190, T1 = 0.9, T2 = T1 + vent.l / VIT, T3 = T2 + 0.8, T4 = T3 + 0.9;
    function posAir(i, t) { // [x, y, opacité, fumée] d'une molécule d'air : arrive, attend en haut, part par le purgeur
      const a = AIRS[i], ta = c.T[3] + 0.3 + i * 0.45, d = tl(i);
      if (t < ta) return [0, 0, 0];
      if (t < d) {
        const u = t - ta;
        if (u < 2.3) { const p = ch.pos(cm[5] * u / 2.3); return [p[0], p[1], D.borne(u / 0.3, 0, 1)]; }
        if (u < 3.7) { const k = D.lisse((u - 2.3) / 1.4); return [D.lerp(420, a.x, k), D.lerp(392, a.y, k), 1]; }
        return [a.x + Math.sin(t * 1.6 + i) * 5, a.y + Math.cos(t * 1.3 + i * 2) * 4, 1];
      }
      const v = t - d, bx = a.x + Math.sin(d * 1.6 + i) * 5, by = a.y + Math.cos(d * 1.3 + i * 2) * 4;
      if (v < T1) { const k = D.lisse(v / T1); return [D.lerp(bx, AX, k), D.lerp(by, 380, k), 1]; }
      if (v < T2) { const p = vent.pos((v - T1) * VIT); return [p[0], p[1], 1]; }
      if (v < T3) return [1090, D.lerp(300, 258, D.lisse((v - T2) / 0.8)), 1];
      if (v < T4) { const k = (v - T3) / 0.9; return [D.lerp(1090, 1190, k), D.lerp(258, 215, k), 1 - k * k]; }
      return [0, 0, 0];
    }

    // étiquettes
    D.etiquette(g, 60, 166, "du condenseur", { "font-weight": 700 });
    const labLiq = D.el("g", {}, g); D.etiquette(labLiq, 60, 590, "liquide"); D.trait(labLiq, 200, 584, 360, 580);
    const labAir = D.el("g", {}, g);
    D.lignes(labAir, 60, 410, ["air :", "il ne se", "condense pas"], { "font-size": 32, "font-weight": 700, fill: "#5b646d", "font-family": POLICE }, 38); D.trait(labAir, 262, 420, 400, 420);
    const labMano = D.etiquette(g, MX, 168, "manomètre HP", { "text-anchor": "middle", "font-weight": 700 });
    const pHP = D.pastille(g, 60, 730, "HP qui monte : le compresseur consomme plus", "#c0392b", 30);
    const labPur = D.etiquette(g, 826, 268, "purgeur d'air", { "text-anchor": "end" });
    const labEau = D.etiquette(g, 1175, 322, "l'eau retient l'ammoniac", texteBleu);
    const labDeh = D.etiquette(g, 1190, 160, "dehors", { "text-anchor": "end" });
    const labPlo = D.el("g", {}, g); D.etiquette(labPlo, 980, 700, "tube plongeur"); D.trait(labPlo, 1080, 676, 1080, 604);
    const labFlo = D.etiquette(g, 1160, 512, "vers le flotteur", { "font-weight": 700 });

    return function (t) {
      nap.maj(t);
      const surf = nap.surface(424, t);
      jet.setAttribute("height", Math.max(0, surf - 392).toFixed(1));
      rides.forEach((e, k) => { const f = D.frac(t * 0.8 + k * 0.5); e.setAttribute("cx", 424); e.setAttribute("cy", surf.toFixed(1)); e.setAttribute("rx", (14 + f * 36).toFixed(1)); e.setAttribute("opacity", ((1 - f) * 0.9).toFixed(2)); });
      filArr(t, 130, 1); filOut(t, 80, 1);
      const p = D.courbe([[0, 0.12], [c.T[3] + 3, 0.14], [c.E[3], 0.3], [c.A(4, 0.15), 0.36], [c.E[4], 0.9], [c.T[5], 0.9], [c.A(5, 0.75), 0.3], [c.E[5] + 1, 0.18]], t);
      const ang = (-125 + 250 * p) * PI / 180 + Math.sin(t * 9) * 0.01;
      aiguille.setAttribute("x2", (MX + 36 * Math.sin(ang)).toFixed(1)); aiguille.setAttribute("y2", (MY - 36 * Math.cos(ang)).toFixed(1));
      const purge = D.fenetre(t, c.T[5], c.E[5] + 2.5, 0.4);
      bouton.setAttribute("fill", purge > 0.5 ? "#ff6b35" : "#6b7785");
      AIRS.forEach((a, i) => { const [x, y, op] = posAir(i, t); a.e.setAttribute("cx", x.toFixed(1)); a.e.setAttribute("cy", y.toFixed(1)); a.e.setAttribute("opacity", op.toFixed(2)); a.h.setAttribute("cx", (x - 4).toFixed(1)); a.h.setAttribute("cy", (y - 5).toFixed(1)); a.h.setAttribute("opacity", (op * 0.6).toFixed(2)); });
      NH.forEach((m, j) => { // l'ammoniac entraîné : il se dissout dans l'eau de la bouteille
        const v = t - (c.A(5, 0.2 + 0.5 * j / 5) + 0.6), s = v * VIT;
        if (v < 0 || s > vent.l + 60) { m.maj(0, 0, 0.5, true, 0); return; }
        const q = vent.pos(Math.min(s, vent.l)), n = vent.norm(Math.min(s, vent.l)), fade = D.borne(1 - (s - vent.l + 20) / 60, 0, 1);
        m.maj(q[0] + n[0] * m.o * 7, q[1] + n[1] * m.o * 7 + (s > vent.l ? (s - vent.l) * 0.3 : 0), 0.5, true, fade);
      });
      bulles(t, q => [1090 + (q - 0.5) * 18, 296, 256, D.fenetre(t, c.A(5, 0.3), c.E[5] + 3, 0.5), "#bcd0e2"]);
      // l'héroïne
      const s = sPos(t);
      let [hx, hy] = ch.pos(s);
      if (s > cm[7] && s < cm[12]) hy = nap.surface(hx, t) + 4 + Math.sin(t * 2) * 3;
      const humeur = s > cm[3] && s < cm[7] ? "surprise" : "sourire";
      mila({ x: hx, y: hy, s: 0.45, t: t, temp: 0.5, etat: "liquide", humeur: humeur, regard: [1, 0], op: D.borne((c.D - 0.2 - t) / 0.4, 0, 1) });
      // textes
      labLiq.setAttribute("opacity", D.lisse((t - c.T[2] + 0.2) / 0.5).toFixed(2));
      labAir.setAttribute("opacity", D.fenetre(t, c.T[3] - 0.1, c.E[3] + 1, 0.5).toFixed(2));
      labMano.setAttribute("opacity", D.fenetre(t, c.T[4] - 0.2, c.E[4] + 0.6, 0.5).toFixed(2));
      pHP.setAttribute("opacity", D.fenetre(t, c.T[4] - 0.1, c.E[4] + 0.5, 0.5).toFixed(2));
      labPur.setAttribute("opacity", D.fenetre(t, c.T[5] - 0.1, c.E[5] + 0.6, 0.5).toFixed(2));
      labEau.setAttribute("opacity", D.fenetre(t, c.A(5, 0.45), c.E[5] + 1.4, 0.5).toFixed(2));
      labDeh.setAttribute("opacity", D.fenetre(t, c.A(5, 0.35), c.E[5] + 1.4, 0.5).toFixed(2));
      labPlo.setAttribute("opacity", D.lisse((t - c.T[6] + 0.2) / 0.5).toFixed(2));
      labFlo.setAttribute("opacity", D.lisse((t - c.A(6, 0.4)) / 0.5).toFixed(2));
      return { carte: 13.5 + 1.1 * D.borne(s / ch.l, 0, 1), temp: 0.5, etat: "liquide", humeur: humeur };
    };
  };

  /* ==FIN== */
})();
