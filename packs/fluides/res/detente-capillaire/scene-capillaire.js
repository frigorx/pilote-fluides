/* =====================================================================
   scene-capillaire.js — gare 5 « La détente par tube capillaire » : les dessins qui vivent
   ---------------------------------------------------------------------
   RÔLE : une fonction par écran qui dessine. app.js les appelle dans render() :
     CAPILLAIRE_SCENES.accueil(hote)        le dessin du sommaire
     CAPILLAIRE_SCENES.identite(hote)       écran 1 : carte d'identité (visite : filtre, capillaire, évaporateur)
     CAPILLAIRE_SCENES.detente(hote)        écran 2 : la détente le long du tube (pas à pas, manomètres le long du tube)
     CAPILLAIRE_SCENES.aspiration(hote)     écran 3 : brasé contre la conduite d'aspiration (pas à pas, 4 thermomètres)
     CAPILLAIRE_SCENES.arret(hote)          écran 4 : et si on arrête le compresseur ? (pas à pas, pressions qui se rejoignent)
     CAPILLAIRE_SCENES.bouche(hote)         écran 5 : et si le capillaire se bouche ? (pas à pas)
     CAPILLAIRE_SCENES.exo(hote, etat)      écran 6 : charger la machine (etat.g = la charge en grammes, lue à chaque image)
   BRIQUES AJOUTÉES (absentes de DETENDEURS_SCENES) :
     · « construireA » : le tube capillaire en situation : conduite haute pression, filtre déshydrateur, capillaire (fin
       et long), plaque d'extrémité percée, évaporateur (nappe de liquide), prises de pression avec manomètres le long du
       tube, bulles qui naissent avant la sortie, bouchon de glace avec son givre, jauge d'effort du moteur ;
     · « construireB » : le capillaire brasé contre la conduite d'aspiration (contre-courant) avec ses 4 thermomètres ;
     · de petits outils : polyligne aux coins arrondis (un coude est une courbe), cristaux de givre.
   Les briques communes (DS.bande, DS.manometre, DS.thermometre, DS.jouer, DS.animer, DS.fond, DS.svg) viennent de
   ../_detendeurs-commun/scenes-detendeurs.js ; le dessin de base, de VOYAGE_DESSIN.
   RÈGLES TENUES : valeurs QUALITATIVES (aucune valeur de chantier ; la charge est un « exemple ») ; texte jamais sur un
   tracé (légendes en HTML, pastilles dans des espaces libres) ; le liquide se voit liquide (nappe, bulles qui naissent
   avant la sortie) ; FLUIDE CONTINU : un tube = une paroi + un intérieur d'un seul tenant, les murs d'abord et les vides
   ensuite, le vide du capillaire TRAVERSE la paroi du filtre et la plaque d'extrémité de l'évaporateur, les prises de
   pression traversent la paroi du tube et le bord du manomètre ; filigrane inerWeb (R9) derrière chaque dessin ; rien
   n'est animé en CSS.
   MODÈLE (qualitatif) : pression le long du tube s ∈ [0,1] : liquide seul jusqu'en SF (baisse douce), puis mélange
   liquide + vapeur (baisse plus raide) ; la nappe de l'évaporateur finit en xf = 0,8 · q² (q = charge / charge de la
   plaque, jusqu'à 1) puis 0,8 + 2,4 · (q − 1) : trop peu, nappe courte ; juste, avant la sortie ; trop, le liquide sort.
   ===================================================================== */
(function () {
  "use strict";
  const DS = window.DETENDEURS_SCENES, D = window.VOYAGE_DESSIN;
  const G = window.CAPILLAIRE_SCENES = {};
  if (!DS || !D) { console.warn("scene-capillaire.js : DETENDEURS_SCENES absent."); return; }
  const el = D.el, lerp = D.lerp, bn = D.borne, lisse = D.lisse, frac = D.frac;
  const KM = 0.7, CLAIR = "#f4f8fc", CUIVRE = "#a9672f", NAVY = "#1b3a63", ROUGE = "#c9451a";
  const NOMINAL = 120;                                // la charge de la plaque signalétique : un EXEMPLE
  G.NOMINAL = NOMINAL;

  /* ---------- le modèle qualitatif ---------- */
  const SF = 0.7;                                     // où naissent les premières bulles (fraction de la longueur du tube)
  const SP = 0.82;                                    // où se forme le bouchon : près de la sortie, là où c'est froid
  const profil = s => s < SF ? 0.92 - 0.32 * (s / SF) : 0.60 - 0.42 * (s - SF) / (1 - SF);
  G.xfCharge = g => { const q = g / NOMINAL; return bn(q <= 1 ? 0.8 * q * q : 0.8 + 2.4 * (q - 1), 0, 1.3); };

  /* ---------- outils : polyligne aux coins arrondis, chemin, mélange après l'orifice, anneaux ---------- */
  function arrondi(pts, r) {                          // un coude est une courbe : on arrondit chaque coin et on échantillonne
    const out = [pts[0].slice()];
    for (let i = 1; i < pts.length - 1; i++) {
      const a = pts[i - 1], b = pts[i], c = pts[i + 1];
      const l1 = Math.hypot(b[0] - a[0], b[1] - a[1]), l2 = Math.hypot(c[0] - b[0], c[1] - b[1]), k = Math.min(r, l1 / 2, l2 / 2);
      const p1 = [b[0] + (a[0] - b[0]) * k / l1, b[1] + (a[1] - b[1]) * k / l1], p2 = [b[0] + (c[0] - b[0]) * k / l2, b[1] + (c[1] - b[1]) * k / l2];
      for (let s = 0; s <= 8; s++) { const u = s / 8, w = 1 - u; out.push([w * w * p1[0] + 2 * w * u * b[0] + u * u * p2[0], w * w * p1[1] + 2 * w * u * b[1] + u * u * p2[1]]); }
    }
    out.push(pts[pts.length - 1].slice());
    return out;
  }
  function chemin(pts) {
    const L = [0];
    for (let i = 1; i < pts.length; i++) L[i] = L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    const len = L[L.length - 1];
    return { len: len, pts: pts, at: function (s) {
      s = bn(s, 0, len); let i = 1;
      while (i < L.length - 1 && s > L[i]) i++;
      const f = (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
      return [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f), pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]];
    }, tronc: function (s0, s1) {
      const o = [this.at(s0).slice(0, 2)];
      for (let i = 1; i < pts.length - 1; i++) if (L[i] > s0 && L[i] < s1) o.push(pts[i].slice(0, 2));
      o.push(this.at(s1).slice(0, 2)); return o;
    } };
  }
  const dstr = pp => "M " + pp.map(q => q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" L ");
  /* le mélange liquide + vapeur qui sort du capillaire : gouttes froides et petites molécules */
  function melange(g, ch, n, graine, ecart, rg) {
    const r = D.alea(graine), P = [], gg = el("g", {}, g), gm = el("g", { transform: "scale(" + KM + ")" }, g);
    for (let i = 0; i < n; i++) {
      const vap = i % 3 === 0;
      P.push({ ph: i / n, vap: vap, dy: (r() - 0.5) * (ecart || 14), e: vap ? D.mol(gm) : el("circle", { r: (3.2 + r() * 2) * (rg || 1), fill: D.couleur(0.1, false), stroke: "#fff", "stroke-width": 1.2 }, gg) });
    }
    return function (t, dens, vit) {
      P.forEach((p, i) => {
        const q = frac(p.ph + t * vit), a = ch.at(q * ch.len), h = Math.hypot(a[2], a[3]) || 1;
        const x = a[0] - a[3] / h * p.dy, y = a[1] + a[2] / h * p.dy, vis = (i / n) < dens ? D.fenetre(q, 0, 1, 0.1) : 0;
        if (p.vap) p.e(x / KM, y / KM, 0.1, true, vis * 0.9);
        else { p.e.setAttribute("cx", x.toFixed(1)); p.e.setAttribute("cy", y.toFixed(1)); p.e.setAttribute("opacity", vis.toFixed(2)); }
      });
    };
  }
  function anneau(g) {
    const r = el("rect", { rx: 12, fill: "none", stroke: "#ff6b35", "stroke-width": 5, opacity: 0 }, g);
    return function (zone, t) {
      if (!zone) { r.setAttribute("opacity", 0); return; }
      r.setAttribute("x", zone[0]); r.setAttribute("y", zone[1]); r.setAttribute("width", zone[2]); r.setAttribute("height", zone[3]);
      r.setAttribute("opacity", (0.65 + 0.35 * Math.sin(t * 5)).toFixed(2));
    };
  }
  /* deux anneaux au plus : une pièce qui agit, ou deux ; `agit` est un nom, une liste de noms ou rien */
  function anneaux(g, ZONES) {
    const A = [anneau(g), anneau(g)];
    return function (agit, t) {
      const liste = (agit == null ? [] : Array.isArray(agit) ? agit : [agit]).map(k => ZONES[k]).filter(Boolean);
      A.forEach((a, i) => a(liste[i] || null, t));
    };
  }
  /* une dent de givre : une petite crête de glace posée sur la paroi (dir = 1 vers le haut, -1 vers le bas) ; plusieurs dents côte à côte font le givre */
  function dent(g, x, y, dir, h) {
    const p = [[x, y], [x + 2.5, y - dir * h], [x + 4.8, y - dir * h * 0.45], [x + 6.8, y - dir * h * 0.9], [x + 9.5, y]];
    return el("polygon", { points: p.map(q => q[0].toFixed(1) + "," + q[1].toFixed(1)).join(" "), fill: "#e6f4fd", stroke: "#8fc0e8", "stroke-width": 1.5, "stroke-linejoin": "round" }, g);
  }
  const accumuler = () => { let tp = 0; return function (t) { const dt = bn(t - tp, 0, 0.1); tp = t; return dt; }; };

  /* =====================================================================
     A. LE CAPILLAIRE EN SITUATION : conduite HP → filtre → capillaire → évaporateur, manomètres le long du tube
     état (tout 0..1 sauf xf) :
       fall    jusqu'où le profil de pression est montré (dernier manomètre visible quand fall ≥ sa position)
       bulles  les premières bulles dans le tube (et le tube qui se refroidit après)
       run     le compresseur tourne (le fluide coule)           eq    les pressions se rejoignent (arrêt)
       mot     l'effort du moteur (jauge « moteur »)             bouche  un bouchon de glace dans le tube (+ givre)
       chute   la basse pression s'effondre derrière le bouchon  vide   l'évaporateur se vide (nappe, givre)
       xf      où finit la nappe (0..1,3)          dh, db  décalage de la HP / de la BP (exercice de charge)
     ===================================================================== */
  function construireA(svg, W, H, opt) {
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    const g = el("g", {}, svg);
    const etiq = !opt.accueil, deux = opt.jauges === "deux", narrow = W < 760;
    const cy = 206, wo = 24, wi = 12, R = narrow ? 26 : 30, yD = 78;
    const taps = deux ? [0.07, 0.97] : narrow ? [0.1, 0.55, 0.95] : [0.07, 0.4, 0.72, 0.97];
    const xF0 = 28, xF1 = 100, xc0 = xF1 - 8, xe0 = Math.round(W - Math.max(230, W * 0.40)), xk = xe0 - 10, Lc = xk - xc0, xe1 = W + 30;
    const xt = s => xc0 + s * Lc, tx = taps.map(xt), xP = xt(SP), xM = W - 58;
    const chaud = D.couleur(0.62, false);

    // ----- 1. les murs : prises de pression, conduite HP, filtre, capillaire, plaque d'extrémité de l'évaporateur -----
    const murPrise = tx.map(x => el("g", {}, g));
    tx.forEach((x, k) => el("line", { x1: x, x2: x, y1: yD + R - 8, y2: cy - wo / 2 + 1, stroke: CUIVRE, "stroke-width": 9 }, murPrise[k]));
    const mur = (x, y, w, h) => el("rect", { x: x, y: y, width: w, height: h, fill: "url(#vm-cuivre)" }, g);
    mur(-10, cy - 20, xF0 + 24, 40);                                                   // la conduite HP, jusque dans le filtre
    el("rect", { x: xF0, y: cy - 38, width: xF1 - xF0, height: 76, rx: 12, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, g);   // le filtre déshydrateur
    mur(xc0, cy - wo / 2, xe0 - xc0, wo);                                              // le capillaire
    mur(xk, cy - 28, 10, 56);                                                          // la plaque d'extrémité de l'évaporateur (le capillaire la traverse)

    // ----- 2. l'évaporateur : la nappe, les bulles qui naissent au fond, la vapeur -----
    const bandeE = DS.bande(g, { x0: xe0, x1: xe1, yh: cy - 18, yb: cy + 18, graine: 11, nbMols: Math.max(8, Math.round((xe1 - xe0) / 40)), nbBulles: Math.max(10, Math.round((xe1 - xe0) / 22)), prof: [0.8, 0.2], vapSurNappe: 0.2 });
    const givre = [], nG = Math.floor((xe1 - xe0 - 16) / 9.5);
    for (let i = 0; i < nG; i++) { const x = xe0 + 8 + i * 9.5, h = 5 + ((i * 7) % 4) * 1.7; givre.push({ x: x, e: [dent(g, x, cy - 28, 1, h), dent(g, x, cy + 28, -1, h + 0.8)] }); }

    // ----- 3. les manomètres (un par prise), le moteur, les pastilles -----
    const mans = tx.map(x => DS.manometre(g, x, yD, R));
    let mMot = null;
    if (opt.moteur) { mMot = DS.manometre(g, xM, yD, R); el("path", { d: "M " + (xM + R) + " " + yD + " H " + (W + 10), fill: "none", stroke: "#637285", "stroke-width": 3, "stroke-dasharray": "2 7", "stroke-linecap": "round" }, g); }
    const pHP = etiq ? D.pastille(g, tx[0], 33, "HP", ROUGE, 22, "middle") : null, pBP = etiq ? D.pastille(g, tx[tx.length - 1], 33, "BP", NAVY, 22, "middle") : null;
    if (etiq && mMot) D.pastille(g, xM, 33, "moteur", NAVY, 22, "middle");

    // ----- 4. les vides, TOUS après les murs : jamais un trait de paroi dans le passage du fluide -----
    el("rect", { x: -10, y: cy - 12, width: xF0 + 28, height: 24, fill: CLAIR }, g);                       // le vide de la conduite HP traverse la paroi du filtre
    el("rect", { x: xF0 + 8, y: cy - 30, width: xF1 - xF0 - 16, height: 60, rx: 5, fill: CLAIR }, g);      // l'intérieur du filtre
    el("rect", { x: xc0, y: cy - wi / 2, width: xe0 + 1 - xc0, height: wi, fill: CLAIR }, g);               // le vide du capillaire traverse la plaque d'extrémité
    const videPrise = tx.map(x => { const gg = el("g", {}, g); el("line", { x1: x, x2: x, y1: yD + R - 12, y2: cy - wi / 2, stroke: CLAIR, "stroke-width": 4 }, gg); return gg; });

    // ----- 5. le fluide : liquide HP (conduite + filtre), grains du filtre, capillaire coloré, reflets, bulles, mélange -----
    el("path", { d: "M -10 " + (cy - 12) + " H " + (xF0 + 8) + " V " + (cy - 30) + " H " + (xF1 - 8) + " V " + (cy + 30) + " H " + (xF0 + 8) + " V " + (cy + 12) + " H -10 Z", fill: chaud, opacity: 0.88 }, g);
    for (let i = 0; i < 6; i++) for (let j = 0; j < 7; j++) el("circle", { cx: xF0 + 15 + i * 8.4 + (j % 2) * 4, cy: cy - 27 + j * 9, r: 2.3, fill: "#8d99a6", opacity: 0.45 }, g);
    const fluxHP = D.courant(g, -10, xF1 - 12, cy - 8, cy + 8, 5, 31);
    const N = 36, seg = [];
    for (let k = 0; k < N; k++) seg.push(el("line", { x1: (xc0 + Lc * k / N).toFixed(1), x2: (xc0 + Lc * (k + 1) / N + 0.8).toFixed(1), y1: cy, y2: cy, "stroke-width": wi, stroke: chaud }, g));
    const rn = D.alea(5), fle = [], bub = [];
    for (let i = 0; i < 9; i++) fle.push({ ph: i / 9, dy: (rn() - 0.5) * 4, e: el("line", { stroke: "#fff", "stroke-width": 2.2, "stroke-linecap": "round", opacity: 0 }, g) });
    for (let i = 0; i < 16; i++) bub.push({ ph: i / 16, dy: (rn() - 0.5) * 1.3, e: el("circle", { fill: "rgba(255,255,255,.5)", stroke: "#fff", "stroke-width": 1.4, opacity: 0 }, g) });
    const trou = el("rect", { x: xk - 2, y: cy - wi / 2, width: 13, height: wi, fill: D.couleur(0.1, false), opacity: 0.9 }, g);   // le mélange traverse la plaque
    const mel = melange(g, chemin([[xk + 2, cy], [xe0 + 70, cy]]), 12, 17, 9, 0.7);

    // ----- 6. le bouchon (glace ou saleté) et le givre autour -----
    const gP = el("g", {}, g);
    el("rect", { x: xP - 13, y: cy - wi / 2 - 1, width: 26, height: wi + 2, rx: 5, fill: "#e4f2fc", stroke: "#4f86b8", "stroke-width": 2.2 }, gP);
    el("path", { d: "M " + (xP - 6) + " " + (cy - 3) + " l 4 6 l 4 -6 l 4 6", fill: "none", stroke: "#7db3de", "stroke-width": 1.8, "stroke-linecap": "round", "stroke-linejoin": "round" }, gP);
    const givreP = [-18, -9, 0, 9].map((dx, i) => [dent(g, xP + dx, cy - wo / 2, 1, 5 + (i % 2) * 2), dent(g, xP + dx, cy + wo / 2, -1, 6 - (i % 2) * 1.5)]);

    // ----- 7. les prises de pression passent au-dessus du fluide : les vides ont déjà été posés ; l'anneau en dernier -----
    const zone = (nom) => ({
      filtre: [xF0 - 6, cy - 46, xF1 - xF0 + 12, 92], tube: [xc0 - 4, cy - 22, Lc + 8, 44], capillaire: [xc0 - 4, cy - 22, Lc + 8, 44],
      entree: [xc0 - 8, cy - 26, Lc * 0.22 + 14, 52], fin: [xc0 + Lc * 0.62, cy - 26, Lc * 0.38 + 24, 52], sortie: [xk - 36, cy - 36, 96, 72],
      evaporateur: [xe0 - 4, cy - 40, xe1 - xe0 + 8, 80], pressions: [tx[0] - R - 6, yD - R - 6, tx[tx.length - 1] - tx[0] + 2 * R + 12, 2 * R + 12],
      hp: [tx[0] - R - 6, yD - R - 6, 2 * R + 12, 2 * R + 12], bp: [tx[tx.length - 1] - R - 6, yD - R - 6, 2 * R + 12, 2 * R + 12],
      moteur: [xM - R - 6, yD - R - 6, 2 * R + 12, 2 * R + 12], bouchon: [xP - 26, cy - 34, 52, 68]
    })[nom];
    const voirZones = (function () { const A = [anneau(el("g", {}, g)), anneau(el("g", {}, g))]; return function (agit, t) { const l = (agit == null ? [] : Array.isArray(agit) ? agit : [agit]).map(zone).filter(Boolean); A.forEach((a, i) => a(l[i] || null, t)); }; })();

    // ----- l'état, image par image -----
    const dt_ = accumuler();
    let phi = 0, phB = 0, phM = 0;
    const dp = (s, e) => {                                // la pression qualitative d'un point du tube
      const base = profil(s) + (s < SF ? (e.dh || 0) : (e.db || 0));
      const pb = s < SP ? lerp(base, 0.95, e.bouche || 0) : lerp(base, 0.06, e.chute || 0);
      return bn(lerp(pb, 0.52, e.eq || 0), 0.03, 0.98);
    };
    function maj(e, t, info) {
      e = e || {};
      const dt = dt_(t);
      const fall = e.fall === undefined ? 1 : e.fall, bulles = e.bulles === undefined ? 1 : e.bulles, run = e.run === undefined ? 1 : e.run;
      const bouche = e.bouche || 0, vide = e.vide || 0, flux = run * (1 - bouche), froidEff = bulles * run;   // à l'arrêt, plus de bulles : le tube est plein de liquide
      const xf = e.xf === undefined ? lerp(0.8, 0, vide) : e.xf;
      phi += dt * 60 * flux; phB += dt * 0.24 * flux; phM += dt * (0.1 + 0.05 * bulles) * flux;
      // les manomètres
      mans.forEach((m, k) => {
        const s = taps[k], op = k === 0 ? 1 : bn((fall - s) / 0.1 + 1, 0, 1);
        m.maj(dp(s, e)); m.g.setAttribute("opacity", op.toFixed(2)); murPrise[k].setAttribute("opacity", op.toFixed(2)); videPrise[k].setAttribute("opacity", op.toFixed(2));
        if (k === taps.length - 1 && pBP) pBP.setAttribute("opacity", op.toFixed(2));
      });
      if (mMot) mMot.maj(bn(e.mot === undefined ? 0.5 : e.mot, 0, 1));
      // le tube : couleur le long du tube (chaud tant que le liquide est seul, froid après les premières bulles)
      seg.forEach((l, k) => {
        const s = (k + 0.5) / N, froid = lisse((s - SF) / 0.2);
        l.setAttribute("stroke", D.couleur(lerp(0.62, lerp(0.62, 0.08, froid), froidEff), false));
        l.setAttribute("opacity", s > SP ? (1 - bouche).toFixed(2) : 1);
      });
      fluxHP(phi, 1);
      fle.forEach(f => {
        const q = frac(f.ph + phi / 700), x = xc0 + q * Lc, s = q;
        f.e.setAttribute("x1", x.toFixed(1)); f.e.setAttribute("x2", Math.min(xk, x + 14).toFixed(1)); f.e.setAttribute("y1", (cy + f.dy).toFixed(1)); f.e.setAttribute("y2", (cy + f.dy).toFixed(1));
        f.e.setAttribute("opacity", ((s > SP ? 1 - bouche : 1) * 0.6 * (1 - 0.7 * froidEff * lisse((s - SF) / 0.1)) * D.fenetre(q, 0, 1, 0.05)).toFixed(2));
      });
      bub.forEach(b => {                                   // les premières bulles naissent en SF, grossissent, filent vers la sortie
        const q = frac(b.ph + phB), s = SF + (0.985 - SF) * q, r = lerp(0.9, 3.7, q);
        b.e.setAttribute("cx", xt(s).toFixed(1)); b.e.setAttribute("cy", (cy + b.dy * (wi / 2 - r - 0.4)).toFixed(1)); b.e.setAttribute("r", r.toFixed(1));
        b.e.setAttribute("opacity", (froidEff * (s > SP ? 1 - bouche : 1) * D.fenetre(q, 0, 1, 0.1)).toFixed(2));
      });
      trou.setAttribute("fill", D.couleur(lerp(0.62, 0.08, froidEff), false)); trou.setAttribute("opacity", (0.9 * (1 - bouche)).toFixed(2));
      mel(phM, (0.15 + 0.85 * bulles) * run * (1 - bouche), 1);
      // l'évaporateur
      bandeE.maj({ xf: xf, flash: (0.25 + 0.75 * run) * (1 - 0.6 * vide), froid: 1, sortie: DS.sortie(xf) }, t);
      const front = xe0 + Math.min(bandeE.st.xf, 1) * (xe1 - xe0);
      givre.forEach(c => { const op = bn((front - c.x) / 10 + 0.5, 0, 1).toFixed(2); c.e.forEach(x => x.setAttribute("opacity", op)); });
      // le bouchon
      gP.setAttribute("opacity", bouche.toFixed(2)); givreP.forEach(p => p.forEach(x => x.setAttribute("opacity", bouche.toFixed(2))));
      let agit = info && info.agit; if (deux && agit === "pressions") agit = ["hp", "bp"];
      voirZones(agit, t);
    }
    return { maj: maj };
  }

  /* =====================================================================
     B. LE CAPILLAIRE BRASÉ CONTRE LA CONDUITE D'ASPIRATION : le liquide va vers l'évaporateur, la vapeur revient
     état : liq (le liquide se refroidit, 0..1) · vap (la vapeur se réchauffe, 0..1)
     ===================================================================== */
  function construireB(svg, W, H, opt) {
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    const g = el("g", {}, svg);
    const ySu = 236, wS = 52, yTouch = 199, yLibre = 140, wo = 22, wi = 11, cx0 = 136, cx1 = W - 136;
    const hot = D.couleur(0.62, false);
    const ch = chemin(arrondi([[-10, yLibre], [cx0 - 26, yLibre], [cx0 + 8, yTouch], [cx1 - 8, yTouch], [cx1 + 26, yLibre], [W + 10, yLibre]], 28));
    const trait = (st, w, extra) => el("path", Object.assign({ d: dstr(ch.pts), fill: "none", "stroke-linejoin": "round", "stroke-linecap": "butt", stroke: st, "stroke-width": w }, extra || {}), g);

    // ----- les murs : la conduite d'aspiration, le capillaire (relief), la brasure -----
    D.tube(g, -10, ySu - wS / 2, W + 20, wS, "cuivre", false, CLAIR);                // l'aspiration : paroi + intérieur clair
    trait("#6e3818", wo + 3); trait("#bd7a44", wo); trait("#e7a978", wo - 9, { opacity: 0.5 });
    el("rect", { x: cx0 + 8, y: ySu - wS / 2 - 3.5, width: cx1 - cx0 - 16, height: 7, rx: 3, fill: "#cfd5db", stroke: "#8a95a1", "stroke-width": 1.5 }, g);   // la brasure
    // ----- les vides : celui du capillaire d'un seul tenant, après tous les murs -----
    trait(CLAIR, wi);

    // ----- le fluide : le liquide dans le capillaire (reflets), la vapeur dans l'aspiration (petites molécules) -----
    const N = 44, seg = [];
    for (let k = 0; k < N; k++) {
      const a = ch.len * k / N, b = Math.min(ch.len, ch.len * (k + 1) / N + 1.2);
      seg.push({ x: ch.at((a + b) / 2)[0], e: el("path", { d: dstr(ch.tronc(a, b)), fill: "none", "stroke-width": wi, "stroke-linecap": "butt", "stroke-linejoin": "round", stroke: hot }, g) });
    }
    const rn = D.alea(9), fle = [];
    for (let i = 0; i < 10; i++) fle.push({ ph: i / 10, e: el("line", { stroke: "#fff", "stroke-width": 2.2, "stroke-linecap": "round", opacity: 0.6 }, g) });
    const gm = el("g", { transform: "scale(" + KM + ")" }, g), mols = [];
    for (let i = 0; i < 14; i++) mols.push({ ph: i / 14, ry: rn(), wob: rn() * 6.28, maj: D.mol(gm) });

    // ----- les 4 thermomètres : liquide (au-dessus, à l'air libre) ; vapeur (en dessous, retournés) -----
    const xT1 = 62, xT2 = W - 62, yR1 = yLibre - wo / 2 - 10, yR2 = ySu + wS / 2 + 78;
    const tL1 = DS.thermometre(g, xT1, yR1, 64), tL2 = DS.thermometre(g, xT2, yR1, 64);
    [xT1, xT2].forEach(x => el("rect", { x: x - 9, y: ySu + wS / 2 - 1, width: 18, height: 15, rx: 3, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 1.5 }, g));   // la pince de la sonde sur le tube d'aspiration
    const tV1 = DS.thermometre(g, xT1, yR2, 62), tV2 = DS.thermometre(g, xT2, yR2, 62);
    D.pastille(g, W / 2, 112, "liquide →", ROUGE, 22, "middle");
    D.pastille(g, W / 2, 326, "← vapeur", NAVY, 22, "middle");

    const ZONES = {
      contact: [cx0 - 6, yTouch - wo / 2 - 8, cx1 - cx0 + 12, wS + wo + 14], tl1: [xT1 - 30, 46, 60, 110], tl2: [xT2 - 30, 46, 60, 110],
      tv1: [xT1 - 30, ySu + wS / 2 + 14, 60, 78], tv2: [xT2 - 30, ySu + wS / 2 + 14, 60, 78]
    };
    const voirZones = anneaux(el("g", {}, g), ZONES), dt_ = accumuler();
    let phL = 0, phV = 0;
    function maj(e, t, info) {
      e = e || {};
      const dt = dt_(t), liq = bn(e.liq || 0, 0, 1), vap = bn(e.vap || 0, 0, 1);
      phL += dt * 0.07; phV += dt * 0.085;
      seg.forEach(s => { const f = lisse(bn((s.x - cx0) / (cx1 - cx0), 0, 1)); s.e.setAttribute("stroke", D.couleur(0.62 - 0.2 * liq * f, false)); });
      fle.forEach(f => {
        const q = frac(f.ph + phL), a = ch.at(q * ch.len), b = ch.at(q * ch.len + 12);
        f.e.setAttribute("x1", a[0].toFixed(1)); f.e.setAttribute("y1", a[1].toFixed(1)); f.e.setAttribute("x2", b[0].toFixed(1)); f.e.setAttribute("y2", b[1].toFixed(1));
        f.e.setAttribute("opacity", (0.6 * D.fenetre(q, 0, 1, 0.04)).toFixed(2));
      });
      mols.forEach(m => {                                  // la vapeur revient de droite à gauche ; elle se réchauffe au contact
        const q = frac(m.ph + phV), x = W + 6 - q * (W + 12), y = ySu - 9 + m.ry * 18 + Math.sin(t * 3 + m.wob) * 1.5, f = bn((cx1 - x) / (cx1 - cx0), 0, 1);
        m.maj(x / KM, y / KM, 0.1 + 0.34 * vap * lisse(f), true, 0.9 * D.fenetre(q, 0, 1, 0.04));
      });
      tL1.maj(0.62); tL2.maj(0.62 - 0.2 * liq); tV2.maj(0.1); tV1.maj(0.1 + 0.34 * vap);
      voirZones(info && info.agit, t);
    }
    return { maj: maj };
  }

  /* ---------- monter : un <svg> qui se redessine selon la largeur disponible (W = 480 à 1000, hauteur fixe) ---------- */
  function monter(hote, build, H, opt) {
    const svg = DS.svg(hote, "ds-svg cp-svg", opt.aria);
    let W = 0, inst = null, e = {}, t = 0, info = null;
    const bati = () => {
      const r = svg.getBoundingClientRect();
      const ratio = r.width > 40 && r.height > 40 ? r.width / r.height : 2.4;
      const w = Math.round(bn(H * ratio, 480, 1000) / 20) * 20;
      if (w === W) return;
      W = w; svg.textContent = ""; inst = build(svg, W, H, opt); inst.maj(e, t, info);
    };
    if (window.ResizeObserver) new ResizeObserver(bati).observe(svg);
    bati();
    return { svg: svg, maj: function (ee, tt, ii) { e = ee; t = tt; info = ii; if (inst) inst.maj(ee, tt, ii); } };
  }
  G.monter = monter;
  const HA = 268, HB = 360;
  const ARIA_A = "Coupe d’un circuit à tube capillaire : la conduite de liquide haute pression, le filtre déshydrateur, le tube capillaire très fin et très long, puis l’évaporateur plus gros, où le fluide bout. Des manomètres sont posés le long du tube.";
  const ARIA_B = "Le tube capillaire brasé contre la conduite d’aspiration : le liquide du capillaire va vers l’évaporateur, la vapeur froide revient en sens inverse, quatre thermomètres montrent leurs températures.";

  /* ---------- le sommaire : le capillaire en situation, qui tourne seul ---------- */
  G.accueil = function (hote) {
    DS.fond(hote);
    const sc = monter(hote, construireA, HA, { accueil: true, jauges: "deux", aria: ARIA_A });
    const etat = { fall: 1, bulles: 1, run: 1 };
    DS.animer(hote, t => sc.maj(etat, t, null));
  };

  /* ---------- écran 1 : la carte d'identité, avec sa visite guidée (filtre, capillaire, évaporateur) ---------- */
  const VISITE = [
    ["filtre", "Le filtre déshydrateur, juste avant : il retient l’humidité et la saleté."],
    ["capillaire", "Le tube capillaire : très fin et très long. En vrai, il est enroulé."],
    ["evaporateur", "L’évaporateur : à la sortie du tube, le fluide bout et devient froid."]
  ];
  G.identite = function (hote, symbole) {
    const carte = document.createElement("div"); carte.className = "cp-carte";
    carte.innerHTML = '<div class="ds-cel-tete"><img src="' + symbole + '" alt="Symbole du tube capillaire"><b>Le tube capillaire</b></div>' +
      '<div class="ds-dessin"></div><p class="ds-explic" aria-live="off"></p>' +
      '<p class="ds-regle">il règle : <strong>rien</strong> — sa longueur et son diamètre font tout<br>on le trouve sur : <strong>les réfrigérateurs ménagers et les petits meubles</strong><br>En climatisation : <a class="ds-lien" href="../../../../cartoclim/stations/2-5-detendre/index.html">la station CartoClim 2.5 « Détendre »</a></p>';
    hote.appendChild(carte);
    const dessin = carte.querySelector(".ds-dessin"), explic = carte.querySelector(".ds-explic");
    DS.fond(dessin);
    const sc = monter(dessin, construireA, HA, { jauges: "deux", aria: ARIA_A });
    const etat = { fall: 1, bulles: 1, run: 1 };
    let dernier = -1;
    DS.animer(hote, t => {
      const i = Math.floor(t / 3.6) % VISITE.length;
      if (i !== dernier) { dernier = i; explic.innerHTML = "<strong>" + (i + 1) + ".</strong> " + VISITE[i][1]; }
      sc.maj(etat, t, { agit: VISITE[i][0] });
    });
  };

  /* ---------- écran 2 : la détente le long du tube, pas à pas ---------- */
  G.detente = function (hote) {
    return DS.jouer(hote, {
      init: { fall: 0.1, bulles: 0, run: 1 },
      etapes: [
        { nom: "Le liquide entre", dire: "Le liquide chaud, sous haute pression, entre dans le tube capillaire. Le premier manomètre le montre.", cible: { fall: 0.1, bulles: 0 }, agit: "entree", duree: 2.8 },
        { nom: "La pression baisse", dire: "Le tube est très fin et très long : le liquide frotte, sa pression baisse mètre après mètre.", cible: { fall: 0.78 }, agit: "tube", duree: 3.6 },
        { nom: "Les premières bulles", dire: "La pression est devenue assez basse : le liquide commence à bouillir, avant la sortie.", cible: { bulles: 1 }, agit: "fin", duree: 3.4 },
        { nom: "Un mélange froid", dire: "À la sortie, la pression est basse : un mélange de liquide et de vapeur, froid, entre dans l’évaporateur.", cible: { fall: 1 }, agit: ["sortie", "evaporateur"], duree: 3.4 }
      ],
      construire: function (dessin) { return monter(dessin, construireA, HA, { aria: ARIA_A }).maj; }
    });
  };

  /* ---------- écran 3 : brasé contre l'aspiration, pas à pas ---------- */
  G.aspiration = function (hote) {
    return DS.jouer(hote, {
      init: { liq: 0, vap: 0 },
      etapes: [
        { nom: "Brasé contre l’aspiration", dire: "Souvent, le capillaire est brasé le long du tube d’aspiration. Le liquide va d’un côté, la vapeur froide revient de l’autre.", cible: { liq: 0, vap: 0 }, agit: "contact", duree: 2.8 },
        { nom: "Le liquide se refroidit", dire: "Le liquide cède de la chaleur à la vapeur froide : il arrive plus froid au bout du tube.", cible: { liq: 1 }, agit: ["tl1", "tl2"], duree: 3.6 },
        { nom: "La vapeur se réchauffe", dire: "La vapeur reprend cette chaleur : elle repart plus chaude vers le compresseur.", cible: { vap: 1 }, agit: ["tv2", "tv1"], duree: 3.6 }
      ],
      construire: function (dessin) { return monter(dessin, construireB, HB, { aria: ARIA_B }).maj; }
    });
  };

  /* ---------- écran 4 : et si on arrête le compresseur ? ---------- */
  G.arret = function (hote) {
    return DS.jouer(hote, {
      init: { run: 1, eq: 0, mot: 0.5 },
      etapes: [
        { nom: "En marche", dire: "La haute pression d’un côté, la basse pression de l’autre : le tube les sépare, le fluide passe.", cible: { run: 1, eq: 0, mot: 0.5 }, agit: "pressions", duree: 2.8 },
        { nom: "Le compresseur s’arrête", dire: "Plus rien ne pousse le fluide. Le tube capillaire, lui, reste ouvert : il n’a aucune pièce qui bouge.", cible: { run: 0, mot: 0 }, agit: "tube", duree: 3 },
        { nom: "Les pressions se rejoignent", dire: "Le fluide passe à travers le tube : la haute pression baisse, la basse pression monte, jusqu’à se rejoindre.", cible: { eq: 1 }, agit: "pressions", duree: 5 },
        { nom: "Le redémarrage est facile", dire: "Les pressions sont égales : le moteur ne pousse pas contre la haute pression. Un petit effort suffit.", cible: { mot: 0.2 }, agit: "moteur", duree: 3 }
      ],
      construire: function (dessin) { return monter(dessin, construireA, HA, { jauges: "deux", moteur: true, aria: ARIA_A + " Une jauge montre l’effort du moteur du compresseur." }).maj; }
    });
  };

  /* ---------- écran 5 : et si le capillaire se bouche ? ---------- */
  G.bouche = function (hote) {
    return DS.jouer(hote, {
      init: { bouche: 0, chute: 0, vide: 0 },
      etapes: [
        { nom: "Un bouchon se forme", dire: "De l’humidité qui gèle, ou de la saleté : le tube si fin se bouche. Du givre se forme sur le tube.", cible: { bouche: 1 }, agit: "bouchon", duree: 3.2 },
        { nom: "La basse pression chute", dire: "Le compresseur aspire, mais plus rien n’arrive : la basse pression devient très basse.", cible: { chute: 1 }, agit: "pressions", duree: 3.4 },
        { nom: "L’évaporateur se vide", dire: "Plus de liquide dans l’évaporateur, plus de froid : son givre disparaît.", cible: { vide: 1 }, agit: "evaporateur", duree: 4.4 }
      ],
      construire: function (dessin) { return monter(dessin, construireA, HA, { jauges: "deux", aria: ARIA_A + " Un bouchon de glace peut se former dans le tube." }).maj; }
    });
  };

  /* ---------- écran 6 : charger la machine ; `etat.g` (grammes, exemple) est lu à chaque image ---------- */
  G.exo = function (hote, etat) {
    DS.fond(hote);
    const sc = monter(hote, construireA, HA, { jauges: "deux", aria: "Le circuit à tube capillaire pendant la charge. Plus on ajoute de fluide, plus la nappe de liquide s’allonge dans l’évaporateur ; trop de fluide, et le liquide sort de l’évaporateur." });
    let xf = G.xfCharge(etat.g), tp = 0;
    DS.animer(hote, t => {
      const dt = bn(t - tp, 0, 0.1); tp = t;
      xf += (G.xfCharge(etat.g) - xf) * Math.min(1, dt * 3);
      const q = etat.g / NOMINAL;
      sc.maj({ fall: 1, bulles: 1, run: etat.g < 8 ? 0 : 1, xf: xf, dh: bn(0.9 * (q - 1), -0.6, 0.06), db: bn(0.8 * (q - 1), -0.6, 0.4) }, t, { agit: null });
    });
    return sc;
  };
})();
