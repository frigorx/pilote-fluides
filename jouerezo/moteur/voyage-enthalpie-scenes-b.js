/* =====================================================================
   voyage-enthalpie-scenes-b.js — édition « le diagramme enthalpique », lot B :
   le compresseur, le condenseur, le détendeur
   ---------------------------------------------------------------------
   RÔLE : les scènes `compresseur`, `condenseur`, `detendeur` du récit
   donnees/voyage-enthalpie.js. Même contrat que moteur/voyage-vis-scenes-b.js :
   VOYAGE_SCENES[id] = function (g, c) → maj(t) ; tout est fonction PURE de t
   (aucun état gardé, aucun SMIL, hasard par D.alea). Brief : voyage-enthalpie/BRIEF-SCENES.md.
   ÉCRAN PARTAGÉ : tout tient dans x 20 → 965, y 150 → 760. À gauche en haut,
   la croix du frigoriste réduite (x 20 → 330) avec la molécule qui y circule ;
   le reste de la scène est le gros plan de l'organe : symbole normalisé, puis
   coupe dessinée (tuyau, nappe de liquide, molécules de vapeur).
   Les calques et le point du diagramme viennent du récit : on ne rend que
   temp, etat, humeur et carte.
   PIÈGE : les gestes sont accrochés au RANG des phrases (c.A(k, f)) ; ajouter
   une phrase au récit décale tout.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const el = D.el, SANS = "Calibri, Arial, sans-serif", BLEU = D.BLEU, ORANGE = D.ORANGE;
  const ROUGE = "#c0392b", VIOLET = "#8e44ad", JAUNE = "#e8a800", ENCRE = "#10233c", FROID = "#2f6fb8";
  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const doux = (t, t0, t1) => D.lisse((t - t0) / Math.max(0.01, t1 - t0)); // 0 → 1 entre t0 et t1
  const sym = n => (window.VOYAGE_SYM_DATA && window.VOYAGE_SYM_DATA[n]) || D.SYM + n + ".svg";
  const lg = pts => pts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");

  /* ---------- petits outils ---------- */
  /* la croix du frigoriste réduite (coin haut gauche, x 20 → 330) : maj(w, t, r) place la molécule */
  function croix(g, organe) {
    el("rect", { x: 20, y: 152, width: 310, height: 200, rx: 16, fill: "#fffdf8", stroke: "rgba(27,58,99,.25)", "stroke-width": 2 }, g);
    const cir = D.circuit(g, 32, 162, 286, false), m = D.heroine(g, { r: 30 });
    cir.surligne(organe, true);
    return function (w, t, r) {
      const [x, y] = cir.ecran(...D.circuitPoint(w));
      m({ x: x, y: y, s: 0.42, t: t, temp: r.temp, etat: r.etat, humeur: r.humeur });
    };
  }
  /* flèche pleine de (x1,y1) vers (x2,y2) : maj(x1, y1, x2, y2, opacité) */
  function fleche(parent, coul, ep) {
    const e = el("path", { fill: "none", stroke: coul, "stroke-width": ep, "stroke-linecap": "round", "stroke-linejoin": "round" }, parent);
    return function (x1, y1, x2, y2, o) {
      const a = Math.atan2(y2 - y1, x2 - x1), h = ep * 2.6, w = ep * 1.7, bx = x2 - Math.cos(a) * h, by = y2 - Math.sin(a) * h;
      e.setAttribute("d", "M " + x1.toFixed(1) + " " + y1.toFixed(1) + " L " + x2.toFixed(1) + " " + y2.toFixed(1) +
        " M " + (bx - Math.sin(a) * w).toFixed(1) + " " + (by + Math.cos(a) * w).toFixed(1) + " L " + x2.toFixed(1) + " " + y2.toFixed(1) +
        " L " + (bx + Math.sin(a) * w).toFixed(1) + " " + (by - Math.cos(a) * w).toFixed(1));
      op(e, o);
    };
  }
  /* chevron qui pointe vers +x, tourné de ang degrés : maj(x, y, ang, opacité) */
  function chev(parent, coul, ep) {
    const p = el("path", { d: "M -10 -10 L 8 0 L -10 10", fill: "none", stroke: coul, "stroke-width": ep || 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, parent);
    return function (x, y, ang, o, c2) { p.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + ang + ")"); if (c2) p.setAttribute("stroke", c2); op(p, o); };
  }
  /* ligne brisée mesurée : at(d) → [x, y] */
  function chemin(pts) {
    const L = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), tot = L.reduce((a, b) => a + b, 0);
    return { tot: tot, at: function (d) {
      d = D.borne(d, 0, tot); let k = 0;
      while (k < L.length - 1 && d > L[k]) { d -= L[k]; k++; }
      const f = d / L[k], a = pts[k], b = pts[k + 1];
      return [D.lerp(a[0], b[0], f), D.lerp(a[1], b[1], f)];
    } };
  }
  /* tuyau de cuivre (comme sur la croix) le long d'une ligne brisée */
  function tuyau(parent, pts, ep) {
    el("polyline", { points: lg(pts), fill: "none", stroke: "#8a4a24", "stroke-width": ep, "stroke-linejoin": "round", "stroke-linecap": "butt" }, parent);
    el("polyline", { points: lg(pts), fill: "none", stroke: "#e7a978", "stroke-width": ep * 0.55, "stroke-linejoin": "round", "stroke-linecap": "butt" }, parent);
  }
  /* thermomètre vertical : tube de y0 à y1, boule dessous ; maj(f) f ∈ 0..1 */
  function thermo(parent, x, y0, y1) {
    el("rect", { x: x - 14, y: y0, width: 28, height: y1 - y0, rx: 14, fill: "#fff", stroke: ENCRE, "stroke-width": 3 }, parent);
    const col = el("rect", { x: x - 7, width: 14, fill: ROUGE }, parent);
    el("circle", { cx: x, cy: y1 + 22, r: 27, fill: ROUGE, stroke: ENCRE, "stroke-width": 3 }, parent);
    return function (f) {
      const h = 14 + (y1 - y0 - 24) * D.borne(f, 0, 1);
      col.setAttribute("y", (y1 + 4 - h).toFixed(1)); col.setAttribute("height", (h + 4).toFixed(1));
    };
  }
  /* des panneaux de texte qui se relaient : defs = [{ k0, k1, dessin(parent) }] ; maj(t) */
  function panneaux(parent, c, defs) {
    const L = defs.map(d => { const gr = el("g", { opacity: 0 }, parent); d.dessin(gr); return { gr: gr, a: c.T[d.k0] - 0.1, b: d.k1 === undefined ? 1e9 : c.T[d.k1 + 1] - 0.1 }; });
    return function (t) { L.forEach(p => op(p.gr, Math.min((t - p.a) / 0.35, (p.b - t) / 0.35))); };
  }
  const ligne = (parent, x, y, s, coul, taille, ancre) => D.texte(parent, x, y, s, { "text-anchor": ancre || "start", "font-size": taille || 34, "font-weight": 700, fill: coul || ENCRE, "font-family": SANS });

  /* =====================================================================
     COMPRESSEUR — l'aspiration à gauche, le refoulement en haut
     ===================================================================== */
  S.compresseur = function (g, c) {
    const A = c.A;
    const miniCroix = croix(g, "compresseur");
    const CX = 470, CY = 560, K = 9;
    const P = chemin([[70, CY], [CX, CY], [690, CY], [690, 200]]); // le trajet : aspiration → cercle → refoulement
    const S_ = (k0, f0, k1, f1) => t => doux(t, A(k0, f0), A(k1, f1));
    const sk2 = S_(2, 0.05, 2, 0.95), sk4 = S_(4, 0.05, 4, 0.95), sk3 = S_(3, 0.3, 4, 0.8), arrive = S_(0, 0.2, 1, 0.9);
    tuyau(g, [[70, CY], [CX, CY], [690, CY], [690, 200]], 40);
    el("image", { href: sym("compresseur_general"), x: CX - 24 * K, y: CY - 20 * K, width: 50 * K, height: 40 * K }, g);
    /* étiquettes fixes (jamais sur un tracé) */
    ligne(g, 70, 625, "aspiration", BLEU, 32); ligne(g, 70, 662, "basse pression", BLEU, 32);
    ligne(g, 650, 222, "refoulement", ORANGE, 32, "end");
    /* le moteur, au-dessus du cercle */
    const moteur = el("g", {}, g);
    el("line", { x1: CX, y1: 360, x2: CX, y2: CY - 15 * K, stroke: ENCRE, "stroke-width": 10 }, moteur);
    el("rect", { x: CX - 80, y: 290, width: 160, height: 70, rx: 14, fill: "#dfe6ee", stroke: ENCRE, "stroke-width": 4 }, moteur);
    ligne(moteur, CX, 336, "moteur", ENCRE, 32, "middle");
    const eclair = el("polygon", { points: "0,-26 -14,4 -2,4 -8,28 16,-8 3,-8 10,-26", fill: JAUNE, stroke: ENCRE, "stroke-width": 2.5 }, g);
    eclair.setAttribute("transform", "translate(" + (CX + 112) + " 325)"); // à côté du moteur, jamais dessus
    const gEner = el("g", {}, g), ener = [0, 1, 2].map(() => chev(gEner, JAUNE, 8));
    const nomEner = ligne(g, CX, 262, "énergie du moteur", "#9a6b00", 30, "middle");
    /* les molécules de vapeur qui défilent : resserrées après le cercle */
    const N = 16, mols = [], alea = D.alea(7);
    for (let i = 0; i < N; i++) mols.push({ m: D.mol(g), dy: (alea() - 0.5) * 22, ph: i / N });
    /* pastilles */
    const pBP = D.pastille(g, 70, 722, "9,5 bar abs", BLEU, 28), pHP = D.pastille(g, 770, 270, "28 bar abs", ORANGE, 28);
    const pDeux = D.pastille(g, 560, 748, "point 2 · 71 °C · 567 kJ/kg", ROUGE, 30, "middle");
    /* flèche « la pression monte » */
    const fP = fleche(g, ORANGE, 9);
    const tP = el("g", {}, g); ligne(tP, 805, 470, "la pression", ORANGE, 30); ligne(tP, 805, 506, "monte", ORANGE, 30);
    /* thermomètre */
    const gT = el("g", {}, g), maj_T = thermo(gT, 905, 330, 640);
    ligne(gT, 872, 360, "71 °C", ROUGE, 28, "end"); ligne(gT, 872, 636, "10 °C", BLEU, 28, "end");
    /* panneau « pas de liquide » devant l'aspiration */
    const gS = el("g", {}, g);
    el("line", { x1: 80, y1: 485, x2: 80, y2: CY - 20, stroke: "#637285", "stroke-width": 8 }, gS);
    el("path", { d: "M 80 392 C 64 418 60 428 60 440 C 60 452 69 461 80 461 C 91 461 100 452 100 440 C 100 428 96 418 80 392 Z", fill: "#4f9bd8", stroke: BLEU, "stroke-width": 3 }, gS);
    el("circle", { cx: 80, cy: 438, r: 48, fill: "none", stroke: ROUGE, "stroke-width": 9 }, gS);
    el("line", { x1: 46, y1: 404, x2: 114, y2: 472, stroke: ROUGE, "stroke-width": 9, "stroke-linecap": "round" }, gS);
    const pJamais = D.pastille(g, 150, 418, "jamais de liquide", ROUGE, 28);
    const mila = D.heroine(g, { r: 30 });

    return function (t) {
      const dEnt = 40 + 360 * arrive(t), d = dEnt + 460 * sk4(t);
      const tmp = 0.2 + 0.5 * sk3(t), compr = sk2(t);
      const [hx, hy] = P.at(d);
      const r = { temp: tmp, etat: "vapeur", humeur: t >= A(3, 0) && t < A(5, 0) ? "chaud" : t >= A(2, 0) && t < A(3, 0) ? "surprise" : "sourire", carte: 2 + 3 * D.borne((d - 400) / 460, 0, 1) };
      /* molécules : espacement uniforme, puis resserré après le cercle (a = taux de compression) */
      mols.forEach(q => {
        const s = D.frac(q.ph + t * 0.045), a = 0.22 * compr;
        const u = s < 0.5 ? s * (1 + 2 * a) : 0.5 + a + (s - 0.5) * (1 - 2 * a);
        const [x, y] = P.at(u * P.tot);
        const horiz = u * P.tot < 620, apres = s > 0.5;
        q.m(horiz ? x : x + q.dy * 0.6, horiz ? y + q.dy * 0.6 : y, apres ? tmp : 0.2, true, 0.9);
      });
      mila({ x: hx, y: hy, s: 0.8, t: t, temp: tmp, etat: "vapeur", humeur: r.humeur, ecrase: 0.7 * compr - 0.25 * sk4(t) });
      miniCroix(r.carte, t, r);
      /* pastilles */
      const pu = doux(t, A(1, 0.2), A(1, 0.6));
      op(pBP, pu); op(pHP, pu);
      op(pDeux, doux(t, A(4, 0.7), A(4, 0.95)));
      /* la pression monte (k2), s'efface avant le thermomètre */
      const fa = Math.min(doux(t, A(2, 0.1), A(2, 0.4)), 1 - doux(t, A(3, 0.5), A(3, 0.9)));
      fP(770, 640, 770, 340, fa); op(tP, fa);
      /* énergie du moteur (k3-k4) : chevrons jaunes qui descendent la bielle */
      const ea = Math.min(doux(t, A(3, 0.05), A(3, 0.3)), 1 - doux(t, A(5, 0), A(5, 0.5)));
      ener.forEach((e, i) => e(CX + 28, 372 + D.frac(i / 3 + t * 0.7) * 50, 90, ea * D.fenetre(D.frac(i / 3 + t * 0.7), 0, 1, 0.2)));
      op(nomEner, ea); op(eclair, 1);
      /* thermomètre (k4) */
      op(gT, doux(t, A(3, 0.6), A(4, 0.0)));
      maj_T(sk3(t));
      /* panneau « pas de liquide » (k5) */
      const sa = doux(t, A(5, 0), A(5, 0.25));
      op(gS, sa); op(pJamais, sa);
      return r;
    };
  };

  /* =====================================================================
     CONDENSEUR — le tuyau, les ailettes, le ventilateur, l'air frais
     ===================================================================== */
  S.condenseur = function (g, c) {
    const A = c.A, E = c.E;
    const miniCroix = croix(g, "condenseur");
    /* le symbole couché (comme sur la croix), en haut */
    const gs = el("g", { transform: "translate(470 255) rotate(90) scale(4)" }, g);
    el("image", { href: sym("echangeur_a_air_eduscol"), x: -22, y: -32, width: 44, height: 64 }, gs);
    /* la coupe : ailettes, puis tuyau par-dessus */
    const YC = 600, X0 = 50, X1 = 940;
    for (let i = 0; i < 11; i++) el("rect", { x: 247 + 50 * i, y: 482, width: 7, height: 238, rx: 2, fill: "#b9d2ea", stroke: FROID, "stroke-width": 1.5 }, g);
    D.tube(g, X0, YC - 55, X1 - X0, 110, "cuivre", false, "#f4f8fc");
    const fan = D.ventilateur(g, 500, 435, 42);
    const air = [], chal = [];
    for (let m = 0; m < 10; m++) air.push(chev(g, FROID, 7));
    for (let m = 0; m < 5; m++) chal.push(D.chaleur(g));
    /* liquide dans le tuyau */
    const xf = { v: 940 };
    const prof = x => x >= 760 ? 0 : 0.9 * D.lisse((760 - x) / 380);
    const liq = D.liquide(g, { x0: X0 + 4, x1: X1 - 4, yh: YC - 45, yb: YC + 45, pas: 18,
      niveau: x => x < xf.v ? 0 : prof(x) * D.lisse((x - xf.v) / 50 + 0.02), couleur: x => x < 380 ? "#3f8fd6" : "#5aa8e4" });
    const N = 16, mols = [], alea = D.alea(11);
    for (let i = 0; i < N; i++) mols.push({ m: D.mol(g), v: alea(), ph: i / N });
    const mila = D.heroine(g, { r: 30 });
    /* textes : un panneau par phrase, à droite du symbole */
    const pan = panneaux(g, c, [
      { k0: 2, k1: 2, dessin: p => { D.pastille(p, 640, 262, "désurchauffe", ROUGE, 32); ligne(p, 640, 312, "71 → 45 °C", ROUGE, 36); } },
      { k0: 3, k1: 3, dessin: p => { D.pastille(p, 640, 262, "condensation", ORANGE, 32); ligne(p, 640, 312, "toujours 45 °C", ORANGE, 36); } },
      { k0: 4, k1: 4, dessin: p => { D.pastille(p, 640, 262, "tout liquide", FROID, 32); ligne(p, 640, 312, "sortie de la cloche", FROID, 32); } },
      { k0: 5, k1: 5, dessin: p => { D.pastille(p, 640, 262, "sous-refroidissement", FROID, 28); ligne(p, 640, 312, "45 → 40 °C", FROID, 36); } },
      { k0: 6, dessin: p => { D.pastille(p, 640, 262, "point 3", BLEU, 32); ligne(p, 640, 306, "40 °C", BLEU, 34); ligne(p, 640, 342, "276 kJ/kg", BLEU, 32); } }
    ]);
    const pHP = D.pastille(g, 640, 205, "28 bar abs", ORANGE, 28);
    ligne(g, X1 - 10, YC - 70, "entrée", ROUGE, 30, "end"); ligne(g, X0 + 10, YC - 70, "sortie", FROID, 30);

    return function (t) {
      /* trajet de l'héroïne dans le tuyau, de droite à gauche */
      const x = 905 - 795 * (doux(t, A(2, 0.05), A(2, 0.95)) * 0.18 + doux(t, A(3, 0.05), A(3, 0.95)) * 0.48 + doux(t, A(4, 0.05), A(4, 0.95)) * 0.07 + doux(t, A(5, 0.05), A(5, 0.95)) * 0.27);
      xf.v = Math.max(X0, x - 30);
      const sTmp = 0.7 - 0.2 * doux(t, A(2, 0.1), E[2]);
      const sub = doux(t, A(5, 0.1), E[5]);
      const tmp = t < A(5, 0) ? sTmp : D.lerp(0.5, 0.15, sub);
      const etat = t < A(3, 0.3) ? "vapeur" : t < A(4, 0.5) ? "bout" : "liquide";
      const humeur = t < A(3, 0) ? "chaud" : t < A(5, 0) ? "sourire" : t < A(6, 0) ? "froid" : "sourire";
      const r = { temp: tmp, etat: etat, humeur: humeur, carte: 5 + 2.6 * D.borne((905 - x) / 795, 0, 1) };
      liq.maj(t);
      /* vapeur : seulement là où il y a de la place au-dessus de la nappe */
      mols.forEach(q => {
        const mx = 930 - D.frac(q.ph + t * 0.03) * 560, nv = x < mx ? 0 : prof(mx);
        const ys = YC + 45 - nv * 90, haut = YC - 40, bas = ys - 16;
        const ok = mx > x - 10 && bas > haut + 6 && mx > 80;
        q.m(mx, haut + (bas - haut) * q.v, mx > 760 ? 0.7 - 0.2 * doux(t, A(2, 0.1), E[2]) : 0.5, true, ok ? 0.9 : 0);
      });
      const ya = YC - 8 - 14 * Math.max(0, 1 - Math.abs(x - 600) / 400) * (t < A(4, 0) ? 1 : 0);
      mila({ x: x, y: etat === "liquide" ? YC + 4 : ya, s: 0.78, t: t, temp: tmp, etat: etat, humeur: humeur });
      miniCroix(r.carte, t, r);
      /* ventilateur et air : frais au-dessus, réchauffé au-dessous */
      fan(t * 420);
      const aa = doux(t, A(2, 0), A(2, 0.4));
      air.forEach((a, m) => {
        const f = D.frac(t * 0.5 + (m % 5) * 0.2 + (m >= 5 ? 0.1 : 0)), y = 492 + f * 226, dedans = y > YC - 66 && y < YC + 66;
        a(272 + 100 * (m % 5), y, 90, dedans ? 0 : aa * D.fenetre(f, 0, 1, 0.1), y > YC ? "#e2662c" : FROID);
      });
      const ha = t < A(3, 0) ? 0.75 : t < A(4, 0) ? 1 : t < A(5, 0) ? 0.35 : 0.5;
      chal.forEach((h, m) => {
        const f = D.frac(t * 0.6 + m * 0.2);
        h(322 + 100 * m + 3, 664 + f * 40, 0, aa * ha * D.fenetre(f, 0, 1, 0.2));
      });
      pan(t);
      op(pHP, doux(t, A(1, 0.2), A(1, 0.6)) * (t < A(6, 0) ? 1 : 0.0));
      return r;
    };
  };

  /* =====================================================================
     DÉTENDEUR — le passage étroit, deux manomètres, h3 = h4
     ===================================================================== */
  S.detendeur = function (g, c) {
    const A = c.A, E = c.E;
    const miniCroix = croix(g, "detendeur");
    const YC = 590;
    /* le symbole (en haut) */
    el("image", { href: sym("detendeur_thermo_ext"), x: 350, y: 150, width: 240, height: 240 }, g);
    /* le tuyau en coupe : large, goulet étroit, large */
    const intr = "M 40 " + (YC - 40) + " H 440 L 482 " + (YC - 6) + " H 498 L 540 " + (YC - 40) + " H 940 V " + (YC + 40) + " H 540 L 498 " + (YC + 6) + " H 482 L 440 " + (YC + 40) + " H 40 Z";
    el("path", { d: intr, fill: "#f4f8fc", stroke: "#8a4a24", "stroke-width": 14, "stroke-linejoin": "round" }, g);
    /* la nappe : pleine à l'amont, plus basse à l'aval une fois la vapeur formée */
    const dv = { v: 0 };
    const liq = D.liquide(g, { x0: 46, x1: 934, yh: YC - 40, yb: YC + 40, pas: 16,
      niveau: x => x < 440 ? 0.95 : x < 540 ? D.lerp(0.95, 0.85 - 0.35 * dv.v, D.lisse((x - 440) / 100)) * (x > 470 && x < 510 ? 0.35 : 1) : 0.85 - 0.35 * dv.v,
      couleur: x => x < 500 ? "#4f9bd8" : "#2f7fc8" });
    const bul = D.bulles(g, 8, 5);
    const N = 9, mols = [], alea = D.alea(3);
    for (let i = 0; i < N; i++) mols.push({ m: D.mol(g), ph: i / N, dy: alea() * 6 });
    /* manomètres (symbole capteur_pression, tête vers le tuyau) et leurs pastilles */
    const jauge = x => {
      el("line", { x1: x, y1: 530, x2: x, y2: YC - 46, stroke: "#8a4a24", "stroke-width": 8 }, g);
      const gj = el("g", { transform: "translate(" + x + " 450) rotate(180) scale(4)" }, g);
      el("image", { href: sym("capteur_pression"), x: -12 + 5, y: -20, width: 14, height: 40 }, gj);
    };
    jauge(190); jauge(780);
    const pAm = D.pastille(g, 232, 470, "28 bar abs", ORANGE, 28), pAv = D.pastille(g, 740, 470, "9,5 bar abs", BLEU, 28, "end");
    ligne(g, 40, 690, "haute pression", ORANGE, 30); ligne(g, 940, 690, "basse pression", BLEU, 30, "end");
    /* h3 = h4 : ligne violette dans l'orifice, et le bilan nul */
    const gH = el("g", {}, g);
    el("line", { x1: 490, y1: 410, x2: 490, y2: 730, stroke: VIOLET, "stroke-width": 7, "stroke-dasharray": "14 8" }, gH);
    ligne(gH, 512, 722, "h3 = h4", VIOLET, 40);
    const fIn = fleche(g, JAUNE, 8), fOut = fleche(g, ORANGE, 8), gBil = el("g", {}, g);
    el("line", { x1: 128, y1: 696, x2: 200, y2: 758, stroke: ROUGE, "stroke-width": 9, "stroke-linecap": "round" }, gBil);
    ligne(gBil, 280, 738, "bilan = 0", ENCRE, 34);
    /* textes à droite du symbole */
    const pan = panneaux(g, c, [
      { k0: 2, k1: 2, dessin: p => { D.pastille(p, 640, 255, "passage étroit", BLEU, 32); ligne(p, 640, 306, "28 → 9,5 bar abs", ENCRE, 34); } },
      { k0: 4, k1: 4, dessin: p => { D.pastille(p, 640, 255, "mélange", FROID, 32); ligne(p, 640, 306, "5 °C", FROID, 38); ligne(p, 640, 345, "une partie se vaporise", ENCRE, 30); } },
      { k0: 5, dessin: p => { D.pastille(p, 640, 255, "point 4", BLEU, 32); ligne(p, 640, 306, "5 °C · 9,5 bar abs", BLEU, 32); ligne(p, 640, 345, "le tour est bouclé", ORANGE, 32); } }
    ]);
    const mila = D.heroine(g, { r: 30 });

    return function (t) {
      /* trajet : k0-k1 jusqu'au goulet, k2 la traversée, k4 vers la droite */
      const x = 70 + 350 * doux(t, A(0, 0.2), E[1]) + 180 * doux(t, A(2, 0.05), A(2, 0.9)) + 200 * doux(t, A(4, 0.1), A(4, 0.95));
      const pince = Math.exp(-Math.pow((x - 490) / 50, 2));
      const apres = x > 505;
      const vap = doux(t, A(4, 0.05), A(4, 0.8));
      dv.v = vap;
      const tmp = D.lerp(0.15, 0.08, doux(t, A(4, 0.1), A(4, 0.9)));
      const etat = apres && t >= A(4, 0.05) ? "bout" : "liquide";
      const humeur = t >= A(3, 0) && t < A(4, 0) ? "sourire" : t >= A(4, 0) && t < A(5, 0) ? "froid" : "sourire";
      const r = { temp: tmp, etat: etat, humeur: humeur, carte: 12.5 + 2.5 * D.borne((x - 70) / 780, 0, 1) };
      liq.maj(t);
      bul(t, q => [580 + q * 340, YC + 32, YC - 8, vap, "#ffffff"]);
      mols.forEach(q => {
        const mx = 570 + D.frac(q.ph + t * 0.04) * 350;
        q.m(mx, YC - 31 + q.dy, 0.08, true, vap * 0.9);
      });
      mila({ x: x, y: YC + (etat === "bout" ? -4 : 6), s: 0.8 - 0.42 * pince, t: t, temp: tmp, etat: etat, humeur: humeur, ecrase: 0.65 * pince });
      miniCroix(r.carte, t, r);
      op(pAm, doux(t, A(2, 0), A(2, 0.3))); op(pAv, doux(t, A(2, 0), A(2, 0.3)));
      pan(t);
      /* k3 : h3 = h4, deux flèches égales qui s'annulent */
      const ha = Math.min(doux(t, A(3, 0.05), A(3, 0.3)), 1 - doux(t, A(4, 0.2), A(4, 0.5)));
      op(gH, ha); op(gBil, ha);
      fIn(100, 710, 250, 710, ha); fOut(250, 744, 100, 744, ha);
      return r;
    };
  };
})();
