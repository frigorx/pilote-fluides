/* =====================================================================
   voyage-eau-glacee-scenes-c.js — « L'ennemi juré », tome 1 : la sentinelle,
   le gel, les armes du frigoriste, le résumé
   ---------------------------------------------------------------------
   RÔLE : les quatre dernières scènes du récit donnees/voyage-eau-glacee.js
   (sentinelle, gel, armes, resume). Même contrat que moteur/voyage-scenes-a.js :
   VOYAGE_SCENES[id](g, c) → maj(t), maj rendant { temp, etat, humeur, carte?,
   diag?, diag0? }. Fonction PURE de t : pas d'animation CSS, pas de SMIL, hasard
   par D.alea. Les gestes sont accrochés au RANG des phrases : ajouter une phrase
   au récit décale tout. Brief : voyage-eau-glacee/BRIEF-SCENES.md (section C).
   Ce fichier ne définit que ces quatre scènes ; chargé APRÈS -a.js et -b.js, il
   remplace le bouche-trou de -a.js pour elles.
   ÉCRAN PARTAGÉ : la scène tient dans x 20 → 965, y 150 → 760 (en-tête x < 760
   et y < 140 ; carte « où je suis » et diagramme à droite). Pastilles du bas à
   y = 740. Aucun texte sous 28 px, aucun chiffre sauf « 0 °C ».
   TABLEAUX : une scène enchaîne des tableaux qui se succèdent SANS se superposer
   (l'un s'efface avant que le suivant n'apparaisse).
   AIDES LOCALES (plaquesCoupe et grosPlan : le même dessin que dans -a.js, d'après
   le brief ; calés sur lui : canaux PAIRS = eau, IMPAIRS = fluide) :
   · plaquesCoupe() — l'évaporateur à plaques en coupe : bloc d'inox, 8 plaques
     embouties brasées, 7 canaux alternés (eau : nappe turquoise qui DESCEND ;
     fluide : nappe, bulles qui MONTENT), quatre raccords (fluide : entrée en bas
     à gauche, sortie en haut à droite ; eau : entrée en haut à gauche, sortie
     en bas à droite). Ici la glace peut pousser sur les parois des canaux d'eau.
   · grosPlan() — la frontière de près : une plaque emboutie au milieu, le
     canal du fluide à gauche (il monte), le canal de l'eau à droite (elle
     descend) ; la plaque peut se bomber et se fendre (scène « gel »).
   · controleur() — la sentinelle : coupe du contrôleur de débit sur un tuyau
     d'eau (boîtier, tige, palette, contact) ; pompe() — la pompe (symbole, puis
     volute et roue) ; cadran() — manomètre sans chiffre ; bidon(), pompeAVide(),
     thermoV(), gouttelette() — les pictogrammes des armes du frigoriste.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const NUIT = "#10233c", ROUGE = "#c0392b", BLEU = "#2f6fb8", VERT = "#1e7e54", CLAIR = "#f4f8fc";
  const GIVRE = "#f2f9fe", GLACE = "#6fa6c8", BRASURE = "#c57a45", HUILE = "#c98a1b", ACIDE = "#7d3c98";
  const PI = Math.PI;
  let nid = 0;
  const ident = p => "vec-" + p + "-" + (++nid);
  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const fen = (e, t, a, b, du) => op(e, D.fenetre(t, a, b, du === undefined ? 0.4 : du));
  const doux = (t, t0, du) => D.lisse((t - t0) / (du || 0.5)); // 0 → 1 à partir de t0
  const f1 = v => v.toFixed(1);
  const pts = l => l.map(q => f1(q[0]) + "," + f1(q[1])).join(" ");
  const rect = (p, x, y, w, h, at) => D.el("rect", Object.assign({ x: x, y: y, width: w, height: h }, at || {}), p);
  const cercle = (p, cx, cy, r, at) => D.el("circle", Object.assign({ cx: cx, cy: cy, r: r }, at || {}), p);
  const ligne = (p, x1, y1, x2, y2, at) => D.el("line", Object.assign({ x1: x1, y1: y1, x2: x2, y2: y2 }, at || {}), p);
  const pointille = (p, x1, y1, x2, y2, coul) => D.trait(p, x1, y1, x2, y2, coul);
  const plan = (maj, g) => { if (maj.g.parentNode !== g) g.appendChild(maj.g); };   // un personnage change de plan (sous / sur la nappe)
  /* pastilles du bas : [texte, couleur, début (s), fin (s)] ; fenêtre de 0,35 s */
  const pas = (parent, liste) => liste.map(([s, coul, a, b]) => ({ g: D.pastille(parent, 492, 740, s, coul, 30, "middle"), a: a, b: b }));
  const montrer = (liste, t) => liste.forEach(p => fen(p.g, t, p.a, p.b, 0.35));

  /* étiquette (une ou plusieurs lignes) et son trait pointillé : rend le groupe (opacité à régler) */
  function etiq(parent, x, y, texte, o) {
    o = o || {};
    const g = D.el("g", { opacity: 0 }, parent);
    (Array.isArray(texte) ? texte : [texte]).forEach((l, i) => D.etiquette(g, x, y + i * (o.pas || 36), l, { "text-anchor": o.ancre || "start", "font-size": o.taille || 32, fill: o.coul || NUIT, "font-weight": o.gras ? 700 : 600 }));
    if (o.trait) g.trait = D.trait(g, o.trait[0], o.trait[1], o.trait[2], o.trait[3], o.coulTrait);
    return g;
  }
  /* flèche pleine : la pointe est en (x2, y2) */
  function fleche(parent, x1, y1, x2, y2, coul, ep) {
    ep = ep || 8;
    const g = D.el("g", {}, parent), a = Math.atan2(y2 - y1, x2 - x1), L = ep * 2.6, l = ep * 1.5, bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
    ligne(g, x1, y1, bx, by, { stroke: coul, "stroke-width": ep, "stroke-linecap": "round" });
    D.el("polygon", { points: pts([[x2, y2], [bx - l * Math.sin(a), by + l * Math.cos(a)], [bx + l * Math.sin(a), by - l * Math.cos(a)]]), fill: coul }, g);
    return g;
  }
  /* point (et angle) à la fraction u (0..1) d'une ligne brisée */
  function suivre(l, u) {
    const L = [0];
    for (let i = 1; i < l.length; i++) L.push(L[i - 1] + Math.hypot(l[i][0] - l[i - 1][0], l[i][1] - l[i - 1][1]));
    const d = D.borne(u, 0, 1) * L[L.length - 1];
    let i = 1;
    while (i < l.length - 1 && d > L[i]) i++;
    const f = (d - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
    return [D.lerp(l[i - 1][0], l[i][0], f), D.lerp(l[i - 1][1], l[i][1], f), Math.atan2(l[i][1] - l[i - 1][1], l[i][0] - l[i - 1][0])];
  }
  /* tuyau suivant une ligne brisée : paroi, intérieur de la couleur du fluide (par défaut : un tuyau d'eau) */
  function tuyau(p, l, ep, coul, paroi) {
    const at = { fill: "none", "stroke-linejoin": "round" };
    D.el("polyline", Object.assign({ points: pts(l), stroke: paroi || D.CUIVRE_EAU, "stroke-width": ep + 14 }, at), p);
    return D.el("polyline", Object.assign({ points: pts(l), stroke: coul, "stroke-width": ep }, at), p);
  }
  /* reflets qui filent dans un tuyau plein (l'eau se voit couler) : f(phase, vitesse en tours de tuyau par seconde, visibilité) */
  function reflets(p, l, nb, graine) {
    const r = D.alea(graine), L = [];
    for (let i = 0; i < nb; i++) L.push({ s: r(), l: 0.03 + r() * 0.03, dy: (r() - 0.5) * 8, e: ligne(p, 0, 0, 0, 0, { stroke: "#fff", "stroke-width": 3.5, "stroke-linecap": "round", opacity: 0 }) });
    return function (ph, vit, vis) {
      L.forEach(q => {
        const u = D.frac(q.s + ph * vit), a = suivre(l, u), b = suivre(l, Math.min(1, u + q.l));
        q.e.setAttribute("x1", f1(a[0])); q.e.setAttribute("y1", f1(a[1] + q.dy)); q.e.setAttribute("x2", f1(b[0])); q.e.setAttribute("y2", f1(b[1] + q.dy));
        q.e.setAttribute("opacity", (0.6 * vis * D.fenetre(u, 0, 1, 0.06)).toFixed(2));
      });
    };
  }
  /* petite molécule de vapeur, de taille et de couleur choisies : f(x, y du CENTRE, opacité, échelle, couleur) */
  function molV(p, coul) {
    const u = D.el("use", { href: "#vm-mol", fill: coul }, p);
    return (x, y, o, k, c) => { u.setAttribute("transform", "translate(" + f1(x) + " " + f1(y) + ") scale(" + (k || 1) + ")"); if (c) u.setAttribute("fill", c); u.setAttribute("opacity", D.borne(o === undefined ? 1 : o, 0, 1).toFixed(2)); };
  }
  /* un symbole dans son cadre blanc (comme sur la carte du circuit) */
  function carte(parent, nom, x, y, l, h, marge) {
    const g = D.el("g", {}, parent), m = marge === undefined ? 10 : marge;
    rect(g, x, y, l, h, { rx: 14, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 });
    D.image(g, nom, x + m, y + m, l - 2 * m, h - 2 * m);
    return g;
  }
  /* position d'un point du symbole posé par D.image(parent, nom, x, y, l, h) : f(ux, uy) → [x, y, échelle] */
  function surSymbole(nom, x, y, l, h) {
    const [vx, vy, vw, vh] = D.ORGANES[nom].vb, k = Math.min(l / vw, h / vh), ox = x + (l - vw * k) / 2, oy = y + (h - vh * k) / 2;
    return (ux, uy) => [ox + (ux - vx) * k, oy + (uy - vy) * k, k];
  }
  /* grande flèche pleine horizontale, pointe à droite en (x + l, y) */
  function grosse(parent, x, y, l, h, coul) {
    return D.el("polygon", { points: pts([[x, y - h * 0.18], [x + l - h * 0.62, y - h * 0.18], [x + l - h * 0.62, y - h * 0.5], [x + l, y], [x + l - h * 0.62, y + h * 0.5], [x + l - h * 0.62, y + h * 0.18], [x, y + h * 0.18]]),
      fill: coul, stroke: "#1b3a63", "stroke-width": 3, "stroke-linejoin": "round" }, parent);
  }
  /* un flocon : six branches, deux barbes par branche */
  function flocon(parent, cx, cy, r, coul, ep) {
    const g = D.el("g", { transform: "translate(" + cx + " " + cy + ")", stroke: coul, "stroke-width": ep, "stroke-linecap": "round", fill: "none" }, parent);
    for (let k = 0; k < 6; k++) {
      const a = k * PI / 3, c = Math.cos(a), s = Math.sin(a);
      ligne(g, 0, 0, r * c, r * s);
      [0.45, 0.72].forEach(u => [-1, 1].forEach(m => ligne(g, u * r * c, u * r * s, u * r * c + 0.28 * r * Math.cos(a + m * 0.9), u * r * s + 0.28 * r * Math.sin(a + m * 0.9))));
    }
    return g;
  }
  /* manomètre à cadran SANS chiffre : zone basse (bleue), zone haute (orange), graduations, aiguille ; rend f(angle en degrés, −135 → 135) */
  function cadran(parent, cx, cy, R) {
    const pt = (a, r) => [cx + r * Math.sin(a * PI / 180), cy - r * Math.cos(a * PI / 180)];
    const arc = (a1, a2, r, coul) => { const [x1, y1] = pt(a1, r), [x2, y2] = pt(a2, r); D.el("path", { d: "M " + f1(x1) + " " + f1(y1) + " A " + r + " " + r + " 0 " + (a2 - a1 > 180 ? 1 : 0) + " 1 " + f1(x2) + " " + f1(y2), fill: "none", stroke: coul, "stroke-width": 11 }, parent); };
    cercle(parent, cx, cy, R + 6, { fill: "#fff", stroke: "#56636f", "stroke-width": 12 });
    arc(-125, -10, R - 24, D.BLEU); arc(-10, 125, R - 24, D.ORANGE);
    for (let a = -135; a <= 135; a += 27) { const [x1, y1] = pt(a, R - 2), [x2, y2] = pt(a, R - (a % 54 ? 9 : 15)); ligne(parent, x1, y1, x2, y2, { stroke: NUIT, "stroke-width": 3 }); }
    const ai = D.el("g", {}, parent);
    D.el("path", { d: "M " + (cx - 6) + " " + cy + " L " + cx + " " + (cy - (R - 20)) + " L " + (cx + 6) + " " + cy + " Z", fill: NUIT }, ai);
    cercle(parent, cx, cy, 9, { fill: NUIT });
    return a => ai.setAttribute("transform", "rotate(" + f1(a) + " " + cx + " " + cy + ")");
  }
  /* phase d'écoulement d'une eau qui s'arrête à ta et repart à tb (freinage et reprise de 0,8 s : vitesse lissée) */
  const marche = (t, ta, tb) => {
    const L = 0.8, s = u => u * u * u - u * u * u * u / 2;
    if (t < ta) return t;
    const u = D.borne((t - ta) / L, 0, 1), base = ta + L * (u - s(u));
    if (t < tb) return base;
    return ta + L * 0.5 + L * s(D.borne((t - tb) / L, 0, 1)) + Math.max(0, t - tb - L);
  };
  const vitesse = (t, ta, tb) => t < ta ? 1 : t < tb ? 1 - D.lisse((t - ta) / 0.8) : D.lisse((t - tb) / 0.8);

  /* =====================================================================
     L'ÉVAPORATEUR À PLAQUES EN COUPE (aide locale ; même dessin que -a.js : pairs = EAU, impairs = FLUIDE)
     o : { x, y, w, h, stub } — bloc d'inox (x, y, w, h), raccords de longueur `stub` au-dehors.
     8 plaques embouties (zigzag) brasées, 7 canaux : pairs = eau (nappe turquoise qui descend), impairs = fluide
     (nappe en bas, bulles qui montent, vapeur). Collecteurs : deux bandes en haut et deux en bas ; les canaux de
     l'eau, plus hauts, traversent les bandes du fluide. Raccords : eau entrée en haut à gauche, sortie en bas à
     droite ; fluide entrée en bas à gauche, sortie en haut à droite.
     Rend { g, ports: { eauIn, eauOut, fluIn, fluOut }, ws, canalX(c, y), px(i, y), y: { c0, c1 }, maj(t, p) }.
     maj(t, p) : p.phE / p.phF (secondes d'écoulement de l'eau / du fluide : constant = à l'arrêt), p.vE 0..1 (vitesse de
     l'eau, pour les flèches des raccords), p.glace 0..1 (cristaux sur les parois des canaux d'eau).
     ===================================================================== */
  function plaquesCoupe(parent, o) {
    const x0 = o.x, y0 = o.y, W = o.w, H = o.h, x1 = x0 + W, y1 = y0 + H;
    const N = 8, NC = N - 1;                                    // 8 plaques fines → 7 canaux (pairs : eau ; impairs : fluide)
    const EW = D.borne(W * 0.05, 14, 28), MARG = 7, MUR = 8, SH = D.borne(H * 0.062, 15, 26), GAP = 4, LS = o.stub === undefined ? 50 : o.stub, AMP = D.borne(W * 0.011, 3, 6.5);
    const xa = x0 + EW + MARG, xb = x1 - EW - MARG, pitch = (xb - xa) / (N - 1);
    const yPf = y0 + MUR + SH / 2, yQo = y0 + MUR + SH * 1.5 + GAP, yc0 = y0 + MUR + 2 * SH + 2 * GAP;   // collecteurs du haut : eau (entrée), fluide (sortie)
    const yPo = y1 - MUR - SH / 2, yQi = y1 - MUR - SH * 1.5 - GAP, yc1 = y1 - MUR - 2 * SH - 2 * GAP;   // collecteurs du bas : eau (sortie), fluide (entrée)
    const nz = 2 * Math.max(2, Math.round((yc1 - yc0) / 52)), Lz = (yc1 - yc0) / nz, ONDE = [0, 1, 0, -1]; // Lz : quart de période de l'emboutissage
    const tri = y => { if (y <= yc0 || y >= yc1) return 0; const u = (y - yc0) / Lz, j = Math.floor(u); return D.lerp(ONDE[j % 4], ONDE[(j + 1) % 4], u - j); };
    const px = (i, y) => xa + i * pitch + AMP * (i % 2 ? 1 : -1) * tri(y);               // les plaques voisines vont en sens contraires : chevrons
    const ys = [yc0]; for (let j = 1; j < nz; j++) ys.push(yc0 + j * Lz); ys.push(yc1);
    const bord = (i, ya, yb) => [[px(i, ya), ya]].concat(ys.map(y => [px(i, y), y])).concat([[px(i, yb), yb]]);
    const yA = yPf + SH / 2, yB = yPo - SH / 2;                                           // les plaques vont de la bande du haut à celle du bas
    const cL = D.couleur(0.08, false), cV = D.couleur(0.12, true);
    const g = D.el("g", {}, parent), defs = D.el("defs", {}, g);
    /* 1 · le bloc : cadre d'inox clair, plaques de bout plus épaisses */
    D.el("rect", { x: x0, y: y0, width: W, height: H, rx: 8, fill: "#d3dae2", stroke: "#56636f", "stroke-width": 3 }, g);
    [x0, x1 - EW].forEach(x => D.el("rect", { x: x, y: y0, width: EW, height: H, rx: 6, fill: "url(#vm-acier-h)", stroke: "#39424c", "stroke-width": 2.5 }, g));
    /* 2 · les collecteurs du fluide (sous les manchons de l'eau) */
    const bande = (y, coul) => rect(g, xa - MARG, y, xb - xa + 2 * MARG, SH, { fill: coul });
    bande(yQo - SH / 2, cV); bande(yQi - SH / 2, cL);
    /* 3 · les canaux : eau (nappe qui descend, rides, glace) / fluide (nappe en bas, bulles qui montent, vapeur) */
    const idP = ident("gp"), lgP = D.el("linearGradient", { id: idP, x1: 0, y1: yc0, x2: 0, y2: yc1, gradientUnits: "userSpaceOnUse" }, defs);
    D.el("stop", { offset: 0, "stop-color": D.EAU_TIEDE }, lgP); D.el("stop", { offset: 1, "stop-color": D.EAU }, lgP);
    const CN = [];
    for (let c = 0; c < NC; c++) {
      const P = c % 2 === 0, yt = P ? yPf : yQo, yb = P ? yPo : yQi, cid = ident("cl");
      D.el("polygon", { points: pts(bord(c, yt, yb).concat(bord(c + 1, yt, yb).reverse())) }, D.el("clipPath", { id: cid }, defs));
      const cg = D.el("g", { "clip-path": "url(#" + cid + ")" }, g), fy = P ? yt : yc0, fh = (P ? yb : yc1) - fy, n = { c: c, P: P, yt: yt, yb: yb };
      rect(cg, xa - MARG, fy, xb - xa + 2 * MARG, fh, { fill: CLAIR });
      if (P) {
        rect(cg, xa - MARG, yt, xb - xa + 2 * MARG, yb - yt, { fill: "url(#" + idP + ")", opacity: 0.72 });
        n.rip = [0, 1, 2, 3, 4, 5, 6].map(() => D.el("path", { fill: "none", stroke: "#fff", "stroke-width": 3, "stroke-linecap": "round", opacity: 0 }, cg));
        n.voile = rect(cg, xa - MARG, yt, xb - xa + 2 * MARG, yb - yt, { fill: GIVRE, opacity: 0 });
        const R = D.alea(31 + c * 7);
        n.cri = [];
        for (let s = 0; s < 2; s++) for (let j = 0; j < 9; j++)
          n.cri.push({ s: s ? -1 : 1, y: yc0 + 16 + (j + R() * 0.7) / 9 * (yc1 - yc0 - 32), l: 0.55 + R() * 0.45, a: (R() - 0.5) * 0.8, e: D.el("polygon", { fill: "#fff", stroke: GLACE, "stroke-width": 2, "stroke-linejoin": "round", opacity: 0 }, cg) });
      } else {
        n.nap = D.el("path", { fill: cL, opacity: 0.85 }, cg);
        n.surf = D.el("path", { fill: "none", stroke: "#fff", "stroke-width": 2.5, "stroke-linecap": "round", opacity: 0.8 }, cg);
        const R = D.alea(11 + c * 7);
        n.bul = [0, 1, 2, 3, 4, 5, 6, 7].map(() => ({ u0: R() * 0.85, rel: R() * 2 - 1, ph: R() * 3, per: 2.2 + R() * 1.6, e: D.el("circle", { fill: "#fff", "fill-opacity": 0.4, stroke: "#fff", "stroke-width": 2.2, opacity: 0 }, cg) }));
        n.vap = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => ({ ph: i / 9 + R() * 0.1, rel: R() * 2 - 1, thr: Math.pow(i / 9, 0.85) * 0.9, m: molV(cg, cV) }));
      }
      CN.push(n);
    }
    /* 4 · les collecteurs de l'eau (au-dessus des canaux) */
    bande(yPf - SH / 2, D.EAU_TIEDE); bande(yPo - SH / 2, D.EAU);
    /* 5 · les plaques : trait d'inox, reflet ; puis les brasures de cuivre, en haut et en bas de chaque plaque */
    const gp = D.el("g", {}, g);
    for (let i = 0; i < N; i++) {
      const l = pts(bord(i, yA, yB));
      D.el("polyline", { points: l, fill: "none", stroke: "#56636f", "stroke-width": 4.2, "stroke-linejoin": "round" }, gp);
      D.el("polyline", { points: l, fill: "none", stroke: "#eef2f6", "stroke-width": 1.4, "stroke-linejoin": "round" }, gp);
    }
    for (let i = 0; i < N; i++) [yA + 3, yB - 3].forEach(y => rect(gp, px(i, y) - 8, y - 5, 16, 10, { rx: 4, fill: BRASURE, stroke: "#8a4a24", "stroke-width": 1.6 }));
    /* 6 · les quatre raccords : tubes dont la paroi est de cuivre (fluide) ou turquoise foncé (eau) ; flèches de sens qui défilent */
    const ws = pitch - 6, cx = c => xa + (c + 0.5) * pitch;
    const STUB = [["eauIn", cx(0), y0 - LS, yPf, D.EAU_TIEDE, D.CUIVRE_EAU, 0, 1, true], ["fluOut", cx(5), y0 - LS, yQo, cV, "url(#vm-cuivre-h)", 180, -1, false],
      ["fluIn", cx(1), y1 + LS, yQi, cL, "url(#vm-cuivre-h)", 180, 1, false], ["eauOut", cx(6), y1 + LS, yPo, D.EAU, D.CUIVRE_EAU, 0, -1, true]]; // [nom, x, bout libre, bout dans le collecteur, couleur, paroi, angle du chevron (0 : vers le bas), sens (1 : vers le bloc), eau]
    const ports = {}, chevs = [];
    STUB.forEach(([nom, x, ya, yb, coul, paroi, ang, sens, eau]) => {
      const yh = Math.min(ya, yb), hh = Math.abs(yb - ya);
      rect(g, x - ws / 2, yh, ws, hh, { fill: paroi, rx: 3 });
      rect(g, x - ws / 2 + 7, yh, ws - 14, hh, { fill: coul });
      ports[nom] = [x, ya];
      for (let k = 0; k < 2; k++) chevs.push({ x: x, ya: ya, yb: yb, k: k, ang: ang, sens: sens, eau: eau, e: D.el("path", { d: "M -6 -4 L 0 4 L 6 -4", fill: "none", stroke: "#fff", "stroke-width": 3.4, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, g) });
    });
    const canalX = (c, y) => (px(c, y) + px(c + 1, y)) / 2;
    return {
      g: g, ports: ports, ws: ws, canalX: canalX, px: px, y: { c0: yc0, c1: yc1 },
      maj: function (t, p) {
        p = p || {};
        const phE = p.phE === undefined ? t : p.phE, phF = p.phF === undefined ? t : p.phF, vE = p.vE === undefined ? 1 : p.vE, glace = p.glace || 0, lv = 0.42;
        CN.forEach(n => {
          if (n.P) {                                            // l'eau : des rides qui défilent vers le bas ; la glace pousse sur les parois
            const Lc = n.yb - n.yt;
            n.rip.forEach((r, k) => {
              const u = D.frac(k / 7 + phE * 0.14), y = n.yt + u * Lc, a = px(n.c, y) + 3, b = px(n.c + 1, y) - 3;
              r.setAttribute("d", "M " + f1(a) + " " + f1(y) + " Q " + f1((a + b) / 2) + " " + f1(y + 8) + " " + f1(b) + " " + f1(y));
              op(r, 0.7 * D.fenetre(u, 0, 1, 0.06) * (1 - glace));
            });
            op(n.voile, glace * 0.3);
            n.cri.forEach(q => {
              const prof = 0.55 + 0.45 * D.borne((q.y - yc0) / (yc1 - yc0), 0, 1), L = glace * q.l * prof * pitch * 0.72;
              if (L < 1) { q.e.setAttribute("opacity", 0); return; }
              const wx = px(q.s > 0 ? n.c : n.c + 1, q.y), w = 0.42 * L + 2, tx = wx + q.s * L * Math.cos(q.a), ty = q.y + L * Math.sin(q.a);
              q.e.setAttribute("points", pts([[wx, q.y - w], [wx + q.s * L * 0.55, q.y - w * 0.55], [tx, ty], [wx + q.s * L * 0.5, q.y + w * 0.7], [wx, q.y + w]]));
              q.e.setAttribute("opacity", 1);
            });
          } else {                                              // le fluide : la nappe en bas, des bulles qui montent, de plus en plus de vapeur
            const ysf = yc1 - lv * (yc1 - yc0), a = px(n.c, ysf) - 8, b = px(n.c + 1, ysf) + 8, surf = [];
            for (let k = 0; k <= 6; k++) { const x = a + (b - a) * k / 6; surf.push([x, ysf + 2.6 * Math.sin(x / 11 - phF * 3.2 + n.c) + 1.6 * Math.sin(x / 5 + phF * 2.1)]); }
            n.nap.setAttribute("d", "M " + f1(a - 10) + " " + f1(yQi + 4) + " L " + surf.map(q => f1(q[0]) + " " + f1(q[1])).join(" L ") + " L " + f1(b + 10) + " " + f1(yQi + 4) + " Z");
            n.surf.setAttribute("d", "M " + surf.map(q => f1(q[0]) + " " + f1(q[1])).join(" L "));
            n.bul.forEach(bb => {
              const f = D.frac(phF / bb.per + bb.ph), yst = D.lerp(yQi - 6, ysf + 14, bb.u0), y = D.lerp(yst, ysf + 4, f), up = D.borne((yQi - y) / Math.max(1, yQi - ysf), 0, 1);
              const r = D.lerp(2.6, 8.4, up), xl = px(n.c, y) + 2, xr = px(n.c + 1, y) - 2, x = (xl + xr) / 2 + bb.rel * ((xr - xl) / 2 - r - 2);
              bb.e.setAttribute("cx", f1(x)); bb.e.setAttribute("cy", f1(y)); bb.e.setAttribute("r", f1(r)); op(bb.e, D.fenetre(f, 0, 1, 0.12));
            });
            n.vap.forEach(v => {                                // une molécule n'apparaît qu'au-dessus de son seuil : plus de vapeur en haut
              const f = D.frac(phF * 0.25 + v.ph), y = D.lerp(ysf - 6, yc0 - 4, f), xl = px(n.c, y) + 2, xr = px(n.c + 1, y) - 2;
              v.m((xl + xr) / 2 + v.rel * ((xr - xl) / 2 - 11), y, D.lisse((f - v.thr) / 0.15) * D.fenetre(f, 0, 1, 0.2) * D.borne((ysf - yc0) / 24, 0, 1), 0.75);
            });
          }
        });
        chevs.forEach(q => {                                    // des chevrons de sens dans les raccords
          const ph = q.eau ? phE : phF, f = D.frac(ph * 0.5 + q.k / 2), y = q.sens > 0 ? D.lerp(q.ya, q.yb, f) : D.lerp(q.yb, q.ya, f);
          q.e.setAttribute("transform", "translate(" + f1(q.x) + " " + f1(y) + ") rotate(" + q.ang + ")");
          op(q.e, (q.eau ? vE : 1) * 0.9 * D.fenetre(f, 0, 1, 0.2));
        });
      }
    };
  }

  /* =====================================================================
     LA SENTINELLE EN COUPE (aide locale) : le contrôleur de débit sur un tuyau d'eau.
     Repère LOCAL, origine = l'axe de la tige sur l'axe du tuyau : tuyau x −L → L (intérieur y −42 → 42),
     tige et boîtier au-dessus, palette plongée dans le courant (elle pend, ou elle est couchée par l'eau).
     o : { L } → { g, pt(lx, ly) → écran, maj({ tilt 0..1, ph (écoulement), flow 0..1 (reflets), efface 0..1 }) }
     ===================================================================== */
  function controleur(parent, x, y, k, o) {
    const L = (o && o.L) || 230, g = D.el("g", { transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, parent);
    const contours = [];
    const dessin = e => { contours.push(e); return e; };
    const zig = (xe, sens, dy) => [[xe, -dy], [xe + sens * 9, -dy * 0.66], [xe - sens, -dy * 0.33], [xe + sens * 9, 0], [xe - sens, dy * 0.33], [xe + sens * 9, dy * 0.66], [xe, dy]]; // bout du tuyau coupé en dents de scie
    const tube = (dy, coul, at) => D.el("polygon", Object.assign({ points: pts(zig(-L, 1, dy).concat(zig(L, -1, dy).reverse())), fill: coul }, at || {}), g);
    dessin(tube(49, D.CUIVRE_EAU, { stroke: "#0f4a52", "stroke-width": 3, "stroke-linejoin": "round" })); dessin(tube(42, D.EAU_TIEDE));
    const cid = ident("ct");
    rect(D.el("clipPath", { id: cid }, g), -L + 12, -41, 2 * L - 24, 82);
    const rf = D.el("g", { "clip-path": "url(#" + cid + ")" }, g), R = D.alea(5), RF = [];
    for (let i = 0; i < 8; i++) RF.push({ s: R(), y: -32 + R() * 64, l: 26 + R() * 24, e: ligne(rf, 0, 0, 0, 0, { stroke: "#fff", "stroke-width": 3.5, "stroke-linecap": "round", opacity: 0 }) });
    /* le boîtier, son raccord, sa cavité (coupe) et le contact */
    dessin(rect(g, -24, -66, 48, 20, { fill: "#8a96a4", stroke: "#39424c", "stroke-width": 3 }));
    dessin(rect(g, -80, -170, 160, 106, { rx: 14, fill: "#cfd8e3", stroke: D.BLEU, "stroke-width": 4 }));
    dessin(rect(g, -66, -156, 132, 78, { rx: 8, fill: "#fff", stroke: "#9aa7b5", "stroke-width": 2 }));
    ligne(g, 44, -108, 80, -108, { stroke: NUIT, "stroke-width": 5 }); ligne(g, -44, -108, -80, -108, { stroke: NUIT, "stroke-width": 5 });
    cercle(g, 44, -108, 7, { fill: NUIT }); cercle(g, -44, -108, 7, { fill: NUIT });
    const lame = D.el("g", { transform: "translate(-44 -108)" }, g);
    rect(lame, 0, -3.5, 88, 7, { rx: 3.5, fill: NUIT });
    const bague = cercle(g, 44, -108, 15, { fill: "none", stroke: VERT, "stroke-width": 4, opacity: 0 });
    /* la tige et la palette (articulée à 31 px au-dessus de l'axe) */
    ligne(g, 0, -31, 0, -78, { stroke: "#56636f", "stroke-width": 7, "stroke-linecap": "round" });
    const pal = D.el("g", { transform: "translate(0 -31)" }, g);
    dessin(rect(pal, -11, 0, 22, 72, { rx: 7, fill: "#eef2f6", stroke: "#39424c", "stroke-width": 3.5 }));
    cercle(g, 0, -31, 8, { fill: NUIT });
    return {
      g: g, k: k, pt: (lx, ly) => [x + lx * k, y + ly * k],
      maj: function (p) {
        const tilt = D.borne(p.tilt || 0, 0, 1), contact = D.lisse((tilt - 0.3) / 0.4), e = p.efface || 0;
        pal.setAttribute("transform", "translate(0 -31) rotate(" + f1(-54 * tilt) + ")");
        lame.setAttribute("transform", "translate(-44 -108) rotate(" + f1(-26 * (1 - contact)) + ")");
        op(bague, contact);
        RF.forEach(q => {
          const u = D.frac(q.s + (p.ph || 0) * 0.16), xx = -L + 14 + u * (2 * L - 28 - q.l), v = p.flow === undefined ? 1 : p.flow;
          q.e.setAttribute("x1", f1(xx)); q.e.setAttribute("x2", f1(xx + q.l)); q.e.setAttribute("y1", f1(q.y)); q.e.setAttribute("y2", f1(q.y)); q.e.setAttribute("opacity", (0.6 * v).toFixed(2));
        });
        contours.forEach(c => { c.setAttribute("stroke-dasharray", e > 0.03 ? "10 8" : "none"); c.setAttribute("fill-opacity", (1 - D.lisse(e * 1.6)).toFixed(2)); });
        op(g, 1 - D.lisse((e - 0.55) / 0.45));
      }
    };
  }

  /* LA POMPE : son symbole dans un cadre, puis la coupe (volute et roue) ; rend maj(angle de la roue, vue 0 = symbole … 1 = coupe) */
  function pompe(parent, cx, cy) {
    const g = D.el("g", {}, parent);
    rect(g, cx - 78, cy - 66, 156, 132, { rx: 16, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 });
    const sym = D.el("g", {}, g); D.image(sym, "pompe", cx - 70, cy - 58, 140, 116);
    const coupe = D.el("g", { opacity: 0 }, g);
    cercle(coupe, cx, cy, 54, { fill: "url(#vm-acier)", stroke: "#39424c", "stroke-width": 3 });
    cercle(coupe, cx, cy, 45, { fill: "#e6f4f4", stroke: "#56636f", "stroke-width": 2 });
    const roue = D.el("g", {}, coupe);
    for (let k = 0; k < 6; k++) D.el("path", { d: "M 0 0 C 10 -8 24 -20 40 -22", fill: "none", stroke: D.CUIVRE_EAU, "stroke-width": 7, "stroke-linecap": "round", transform: "rotate(" + k * 60 + ")" }, roue);
    cercle(roue, 0, 0, 10, { fill: NUIT });
    return function (angle, vue) {
      op(sym, 1 - vue); op(coupe, vue);
      roue.setAttribute("transform", "translate(" + cx + " " + cy + ") rotate(" + f1(angle) + ")");
    };
  }

  /* =====================================================================
     LA FRONTIÈRE DE PRÈS (aide locale ; même dessin que -a.js)
     o : { x, y, w, h, niv } — la vue (x, y, w, h) : UNE plaque emboutie au milieu (zigzag), entre deux parois droites (les
     plaques de bout) ; à gauche le canal du fluide (nappe + bulles qui montent + vapeur), à droite celui de l'eau (turquoise,
     rides qui descendent). « fluide frigorigène » et « eau » au-dessus des canaux. Les bords haut et bas s'estompent : on
     regarde un morceau de canal. Ici la plaque peut aussi se bomber (poussée par la glace) et se fendre (scène « gel »).
     Rend { g, fond (sous la nappe : la molécule qui flotte), dessus (sur tout : la goutte, la molécule hors du liquide), xg, xd
            (axes des canaux), xm, y0, y1, plaque(y), surface(t) (y de la nappe), maj(t, p) }.
     maj(t, p) : p.ph (secondes d'écoulement), p.phE (celles de l'eau, si elle s'arrête), p.flu / p.eau 0..1 (canaux visibles),
       p.bul / p.vap 0..1, p.halo 0..1 (la plaque du milieu surlignée), p.etiq 0..1 (étiquettes), p.glace 0..1 (la glace remplit le
       canal d'eau), p.bomb (px : la plaque se bombe vers le fluide), p.fiss 0..1 (la fissure rouge).
     ===================================================================== */
  function grosPlan(parent, o) {
    const x0 = o.x, y0 = o.y, W = o.w, H = o.h, y1 = y0 + H, k = D.borne(W / 780, 0.3, 1.3);
    const TH = 11 * k + 4, AMP = 20 * k + 4, WALL = 20 * k + 6, nz = 8, Lz = H / nz, ONDE = [0, 1, 0, -1], N = 64;
    const xL = x0 + WALL, xm = x0 + W / 2, xR = x0 + W - WALL;
    const xg = (xL + xm - AMP - TH / 2) / 2, xd = (xm + AMP + TH / 2 + xR) / 2;      // axes des canaux : au milieu de la place que le zigzag leur laisse
    const tri = y => { const u = D.borne((y - y0) / Lz, 0, nz - 1e-6), j = Math.floor(u); return D.lerp(ONDE[j % 4], ONDE[(j + 1) % 4], u - j); };
    const px = (y, b) => xm + AMP * tri(y) - (b ? b * Math.pow(Math.sin(PI * D.borne((y - y0) / H, 0, 1)), 1.4) : 0);   // la plaque : un zigzag autour de l'axe (et son bombement)
    const ys = Array.from({ length: N + 1 }, (_, j) => y0 + j * H / N);
    const polG = b => [[xL, y0]].concat(ys.map(y => [px(y, b) - TH / 2, y])).concat([[xL, y1]]);
    const polD = b => ys.map(y => [px(y, b) + TH / 2, y]).concat([[xR, y1], [xR, y0]]);
    const g = D.el("g", {}, parent), defs = D.el("defs", {}, g);
    const gm = ident("gm"), gg = ident("gmg"), gl = ident("glg");
    const lg = D.el("linearGradient", { id: gg, x1: 0, y1: y0, x2: 0, y2: y1, gradientUnits: "userSpaceOnUse" }, defs);
    [[0, 0], [0.09, 1], [0.91, 1], [1, 0]].forEach(([of, v]) => D.el("stop", { offset: of, "stop-color": "#fff", "stop-opacity": v }, lg));
    rect(D.el("mask", { id: gm, maskUnits: "userSpaceOnUse", x: x0 - 60, y: y0, width: W + 120, height: H }, defs), x0 - 60, y0, W + 120, H, { fill: "url(#" + gg + ")" });
    const lw = D.el("linearGradient", { id: gl, x1: 0, y1: y0, x2: 0, y2: y1, gradientUnits: "userSpaceOnUse" }, defs);
    D.el("stop", { offset: 0, "stop-color": D.EAU_TIEDE }, lw); D.el("stop", { offset: 1, "stop-color": D.EAU }, lw);
    const vue = D.el("g", { mask: "url(#" + gm + ")" }, g);
    /* le canal du fluide : fond, ce qui flotte, nappe, bulles, vapeur */
    const cidG = ident("cg"), cidD = ident("cd");
    const clG = D.el("polygon", { points: pts(polG(0)) }, D.el("clipPath", { id: cidG }, defs)), clD = D.el("polygon", { points: pts(polD(0)) }, D.el("clipPath", { id: cidD }, defs));
    const cG = D.el("g", { "clip-path": "url(#" + cidG + ")" }, vue), cD = D.el("g", { "clip-path": "url(#" + cidD + ")" }, vue);
    rect(cG, xL - 4, y0, xm - xL + AMP + 8, H, { fill: CLAIR }); rect(cD, xm - AMP - 4, y0, xR - xm + AMP + 8, H, { fill: CLAIR });
    const gFlu = D.el("g", {}, cG), gEau = D.el("g", {}, cD);
    const fond = D.el("g", {}, gFlu);
    const niv0 = o.niv === undefined ? 0.3 : o.niv;
    let niv = niv0;                                                                   // recalculé à chaque image par maj(t, p) : aucun état gardé
    const liq = D.liquide(gFlu, { x0: xL - 4, x1: xm + AMP + 4, yh: y0, yb: y1, niveau: () => niv, couleur: () => D.couleur(0.08, false), pas: 14 });
    const lb = (xm - AMP - TH / 2 - xL) / 2 - 16;                                    // demi-largeur sûre du canal (là où le zigzag le rétrécit)
    const R = D.alea(5), BUL = [], VAP = [];
    for (let i = 0; i < 14; i++) BUL.push({ s: R(), per: 1.5 + R() * 1.2, ph: R() * 3, rel: R() * 2 - 1, e: D.el("circle", { fill: "#fff", "fill-opacity": 0.38, stroke: "#fff", "stroke-width": 2 * k + 1.2, opacity: 0 }, gFlu), q: i / 14 });
    for (let i = 0; i < 12; i++) VAP.push({ ph: R(), rel: R() * 2 - 1, thr: i / 12 * 0.92, v: 0.04 + R() * 0.03, m: molV(gFlu, D.couleur(0.12, true)) });
    /* le canal de l'eau : turquoise, rides qui descendent, et la glace (blanche, facettes, cristaux sur les parois) */
    rect(gEau, xm - AMP - 4, y0, xR - xm + AMP + 8, H, { fill: "url(#" + gl + ")", opacity: 0.66 });
    const RIP = []; for (let i = 0; i < 9; i++) RIP.push({ s: i / 9, rel: R() * 2 - 1, e: D.el("path", { fill: "none", stroke: "#fff", "stroke-width": 2.4 * k + 1.4, "stroke-linecap": "round", opacity: 0 }, gEau) });
    const gGl = D.el("g", { opacity: 0 }, gEau), R2 = D.alea(19);
    rect(gGl, xm - AMP - 4, y0, xR - xm + AMP + 8, H, { fill: GIVRE });
    for (let j = 0; j < 16; j++) {                                                    // facettes de la glace : des cassures blanches et bleu pâle
      const ax = xm + AMP + R2() * (xR - xm - AMP), ay = y0 + R2() * H, bx = ax + (R2() - 0.5) * 190, by = ay + (R2() - 0.5) * 190, cx = bx + (R2() - 0.5) * 120, cy = by + (R2() - 0.5) * 120;
      D.el("polyline", { points: pts([[ax, ay], [bx, by], [cx, cy]]), fill: "none", stroke: j % 3 ? "#c4dcec" : "#fff", "stroke-width": j % 3 ? 2.5 : 4, "stroke-linejoin": "round" }, gGl);
    }
    const cri = [];
    for (let s = 0; s < 2; s++) for (let j = 0; j < 12; j++)
      cri.push({ s: s ? -1 : 1, y: y0 + 40 + (j + R2() * 0.7) / 12 * (H - 80), l: 0.5 + R2() * 0.5, a: (R2() - 0.5) * 0.8, e: D.el("polygon", { fill: "#fff", stroke: GLACE, "stroke-width": 2.5, "stroke-linejoin": "round", opacity: 0 }, gEau) });
    /* la plaque : halo (surlignage), trait d'inox, reflet ; la fissure ; et les deux parois droites */
    const lp0 = pts(ys.map(y => [px(y, 0), y]));
    const halo = D.el("polyline", { points: lp0, fill: "none", stroke: "#ff8a4c", "stroke-width": 26 * k + 12, "stroke-linejoin": "round", opacity: 0 }, vue);
    const plaque = D.el("polyline", { points: lp0, fill: "none", stroke: "#56636f", "stroke-width": TH, "stroke-linejoin": "round" }, vue);
    const reflet = D.el("polyline", { points: lp0, fill: "none", stroke: "#eef2f6", "stroke-width": TH * 0.34, "stroke-linejoin": "round" }, vue);
    const fiss = D.el("g", { opacity: 0 }, vue);
    const fOmbre = D.el("polyline", { fill: "none", stroke: "#4a0f08", "stroke-width": 14, "stroke-linejoin": "miter", "stroke-linecap": "round", pathLength: 100 }, fiss);
    const fRouge = D.el("polyline", { fill: "none", stroke: ROUGE, "stroke-width": 7, "stroke-linejoin": "miter", "stroke-linecap": "round", pathLength: 100 }, fiss);
    [x0, xR].forEach(x => D.el("rect", { x: x, y: y0, width: WALL, height: H, fill: "url(#vm-acier-h)", stroke: "#39424c", "stroke-width": 2.5 * k + 1 }, vue));
    const dessus = D.el("g", {}, g);
    /* les étiquettes, au-dessus des canaux */
    const lab = D.el("g", { opacity: 0 }, g), tl = Math.max(28, Math.round(32 * Math.min(1, k * 1.4)));
    D.etiquette(lab, xg, y0 - 14, "fluide frigorigène", { "text-anchor": "middle", "font-size": tl, "font-weight": 700, fill: BLEU });
    D.etiquette(lab, xd, y0 - 14, "eau", { "text-anchor": "middle", "font-size": tl, "font-weight": 700, fill: D.CUIVRE_EAU });
    return {
      g: g, fond: fond, dessus: dessus, xg: xg, xd: xd, xm: xm, y0: y0, y1: y1, k: k, plaque: y => px(y, 0), surface: t => liq.surface(xg, t),
      maj: function (t, p) {
        p = p || {};
        const ph = p.ph === undefined ? t : p.ph, phE = p.phE === undefined ? ph : p.phE, bul = p.bul === undefined ? 0.5 : p.bul, vap = p.vap === undefined ? 0.5 : p.vap;
        const b = p.bomb || 0, glace = p.glace || 0, fi = p.fiss || 0;
        niv = p.niv === undefined ? niv0 : p.niv;
        op(gFlu, p.flu === undefined ? 1 : p.flu); op(gEau, p.eau === undefined ? 1 : p.eau); op(halo, p.halo || 0); op(lab, p.etiq === undefined ? 1 : p.etiq);
        clG.setAttribute("points", pts(polG(b))); clD.setAttribute("points", pts(polD(b)));
        const lp = pts(ys.map(y => [px(y, b), y]));
        [halo, plaque, reflet].forEach(e => e.setAttribute("points", lp));
        liq.maj(t);
        BUL.forEach(q => {                                      // des bulles montent de la nappe vers sa surface
          const f = D.frac(ph / q.per + q.ph), x = xg + q.rel * lb, ys0 = liq.surface(x, t), y = D.lerp(y1 - 14, ys0 + 6, f), rr = (2.6 + 6.8 * f) * (1.1 * k + 0.45);
          q.e.setAttribute("cx", f1(x + Math.sin(ph * 2.3 + q.s * 9) * 4 * k)); q.e.setAttribute("cy", f1(y)); q.e.setAttribute("r", f1(rr)); op(q.e, (q.q < bul ? 1 : 0) * D.fenetre(f, 0, 1, 0.12));
        });
        VAP.forEach(m => {                                      // la vapeur monte, de plus en plus nombreuse vers le haut
          const f = D.frac(ph * m.v + m.ph), ys0 = liq.surface(xg, t), y = D.lerp(ys0 - 12, y0 + 14, f);
          m.m(xg + m.rel * lb + Math.sin(ph * 1.7 + m.ph * 9) * 6 * k, y, (m.thr < vap ? 1 : 0) * D.lisse((f - m.thr * 0.8) / 0.15) * D.fenetre(f, 0, 1, 0.18) * D.borne((y1 - ys0) / 30 + 0.3, 0, 1), 0.95 * k + 0.4);
        });
        RIP.forEach(r => {                                      // l'eau : des rides qui défilent vers le bas
          const f = D.frac(r.s + phE * 0.12), y = D.lerp(y0 + 8, y1 - 8, f), a = xd + r.rel * lb * 0.8 - 26 * k - 8, bb = a + 52 * k + 16;
          r.e.setAttribute("d", "M " + f1(a) + " " + f1(y) + " Q " + f1((a + bb) / 2) + " " + f1(y + 9 * k + 3) + " " + f1(bb) + " " + f1(y)); op(r.e, 0.75 * D.fenetre(f, 0, 1, 0.08) * (1 - glace));
        });
        op(gGl, glace * 0.88);
        cri.forEach(q => {                                      // des cristaux poussent sur la plaque et sur la paroi de droite
          const L = glace * q.l * 120 * k;
          if (L < 2) { q.e.setAttribute("opacity", 0); return; }
          const wx = q.s > 0 ? px(q.y, b) + TH / 2 : xR, w = 0.4 * L + 3;
          q.e.setAttribute("points", pts([[wx, q.y - w], [wx + q.s * L * 0.55, q.y - w * 0.55], [wx + q.s * L * Math.cos(q.a), q.y + L * Math.sin(q.a)], [wx + q.s * L * 0.5, q.y + w * 0.7], [wx, q.y + w]]));
          q.e.setAttribute("opacity", 1);
        });
        if (fi > 0) {                                           // la fissure : un zigzag rouge qui se trace de haut en bas
          const yc = y0 + H * 0.5, pl = [];
          for (let j = 0; j <= 12; j++) { const y = yc - 110 + j * 220 / 12; pl.push([px(y, b) + (j === 0 || j === 12 ? 0 : j % 2 ? 10 : -10), y]); }
          [fOmbre, fRouge].forEach(e => { e.setAttribute("points", pts(pl)); e.setAttribute("stroke-dasharray", f1(fi * 100) + " 100"); });
        }
        op(fiss, fi > 0 ? 1 : 0);
      }
    };
  }

  /* =====================================================================
     1 · LA SENTINELLE — le contrôleur de débit
     k0 : l'eau coule dans le tuyau et les canaux · k1 : la pompe s'arrête, la pression baisse (manomètre) ·
     k2 : la glace pousse sur les parois · k3 : la sentinelle (coupe, étiquettes), l'eau reprend ·
     k4 : deux états (débit : palette penchée, contact fermé, voyant vert ; pas de débit : palette pendante,
     contact ouvert, voyant rouge) · k5 : la pompe démarre avant et s'arrête après le compresseur ·
     k6 : le pressostat BP et la sonde antigel. Les calques `chute` (k1) et `gel` (k2) viennent du récit ;
     `carte` aussi (0 → 1,5) ; `diag` rendu ici.
     ===================================================================== */
  S.sentinelle = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    const TA = T[1] + 0.3, TB = T[3] + 0.5;                          // la pompe s'arrête, repart
    const BX = 540, BY = 305, BW = 330, BH = 300, YP = 250;           // le bloc d'inox ; l'axe du tuyau d'eau

    /* ----- tableau A : le bloc, le tuyau d'eau, la pompe, la sentinelle de près, le manomètre ----- */
    const gBloc = D.el("g", {}, g);
    const PC = plaquesCoupe(gBloc, { x: BX, y: BY, w: BW, h: BH, stub: BY - YP });
    const xIn = PC.ports.eauIn[0], ep = PC.ws - 14;
    const ROUTE = [[30, YP], [xIn, YP], [xIn, YP + 30]];
    tuyau(gBloc, ROUTE, ep, D.EAU_TIEDE);
    const rf = reflets(gBloc, ROUTE, 7, 3);
    const pomp = pompe(gBloc, 150, YP);
    const marque = D.pastille(gBloc, 150, YP + 112, "arrêt", ROUGE, 30, "middle");
    const mila = D.heroine(gBloc, { r: 30 });
    const anneau = D.el("g", { opacity: 0, "data-layout-allow-overlap": "" }, gBloc);   // l'anneau posé sur le tuyau, relié au cadre de la sentinelle : voulu
    cercle(anneau, 400, YP, 34, { fill: "none", stroke: D.ORANGE, "stroke-width": 5, "stroke-dasharray": "9 7" });
    pointille(anneau, 380, YP + 30, 300, 332, D.ORANGE); pointille(anneau, 416, YP + 28, 480, 332, D.ORANGE);

    const gMano = D.el("g", {}, g);
    const aiguille = cadran(gMano, 190, 515, 74);
    pointille(gMano, 268, 545, PC.ports.fluIn[0] - PC.ws / 2 - 4, PC.ports.fluIn[1] - 28);
    const eBas = etiq(gMano, 190, 640, "basse pression", { ancre: "middle" });

    const gZoom = D.el("g", { opacity: 0 }, g);                       // la sentinelle de près (k3)
    rect(gZoom, 30, 332, 490, 330, { rx: 18, fill: "#fffdf8", stroke: D.ORANGE, "stroke-width": 4 });
    const SE = controleur(gZoom, 300, 512, 1, { L: 200 });
    const eCtl = etiq(gZoom, 200, 386, ["contrôleur", "de débit"], { ancre: "end", coul: D.BLEU, gras: true });
    const ePal = etiq(gZoom, 300, 630, "palette", { ancre: "middle", coul: D.ORANGE, gras: true, trait: [300, 608, 300, 540], coulTrait: D.ORANGE });

    /* ----- tableau B (k4) : deux états de la sentinelle ----- */
    const gEtats = D.el("g", { opacity: 0 }, g);
    const PAN = [[160, "débit", true], [635, "pas de débit", false]].map(([ox, titre, oui]) => {
      const gp = D.el("g", { opacity: 0 }, gEtats), oy = 520;
      const ct = controleur(gp, ox, oy, 1, { L: 130 });
      D.etiquette(gp, ox + 110, 310, titre, { "text-anchor": "middle", fill: oui ? VERT : ROUGE, "font-weight": 700 });
      const cx0 = ox + 155, cy0 = 352, [ax, ay] = ct.pt(80, -108);
      carte(gp, "compresseur", cx0, cy0, 150, 110, 8);
      ligne(gp, ax, ay, cx0, cy0 + 55, { stroke: "#9aa7b5", "stroke-width": 5, "stroke-linecap": "round" });
      const vif = ligne(gp, ax, ay, cx0, cy0 + 55, { stroke: D.ORANGE, "stroke-width": 5, "stroke-linecap": "round", "stroke-dasharray": "14 10", opacity: 0 });
      cercle(gp, cx0 + 30, 520, 22, { fill: oui ? VERT : ROUGE, stroke: NUIT, "stroke-width": 3 });
      D.etiquette(gp, cx0 + 64, 532, oui ? "marche" : "arrêt", { fill: oui ? VERT : ROUGE, "font-weight": 700 });
      return { g: gp, ct: ct, oui: oui, vif: vif };
    });

    /* ----- tableau C (k5) : la pompe, avant et après le compresseur ----- */
    const gFrise = D.el("g", { opacity: 0 }, g);
    const X = { p0: 270, c0: 420, c1: 790, p1: 940 }, Y = { p: 310, c: 430 };
    D.etiquette(gFrise, 40, Y.p + 46, "pompe", { fill: D.CUIVRE_EAU, "font-weight": 700 });
    D.etiquette(gFrise, 40, Y.c + 46, "compresseur", { fill: D.BLEU, "font-weight": 700 });
    const bPompe = rect(gFrise, X.p0, Y.p, 0, 70, { rx: 14, fill: D.CUIVRE_EAU }), bComp = rect(gFrise, X.c0, Y.c, 0, 70, { rx: 14, fill: D.BLEU });
    [X.p0, X.c0, X.c1, X.p1].forEach(x => pointille(gFrise, x, 290, x, 560));
    const fAvant = D.el("g", { opacity: 0 }, gFrise), fApres = D.el("g", { opacity: 0 }, gFrise);
    fleche(fAvant, X.p0 + 4, 575, X.c0 - 6, 575, D.ORANGE, 8); D.etiquette(fAvant, (X.p0 + X.c0) / 2, 640, "avant", { "text-anchor": "middle", fill: D.ORANGE, "font-weight": 700 });
    fleche(fApres, X.c1 + 4, 575, X.p1 - 6, 575, D.ORANGE, 8); D.etiquette(fApres, (X.c1 + X.p1) / 2, 640, "après", { "text-anchor": "middle", fill: D.ORANGE, "font-weight": 700 });
    const curseur = ligne(gFrise, 0, 275, 0, 590, { stroke: NUIT, "stroke-width": 5, "stroke-linecap": "round", opacity: 0 });

    /* ----- tableau D (k6) : le pressostat BP et la sonde antigel ----- */
    const gGardes = D.el("g", { opacity: 0 }, g);
    const gPres = D.el("g", { opacity: 0 }, gGardes), gSonde = D.el("g", { opacity: 0 }, gGardes);
    carte(gPres, "pressostat", 120, 392, 170, 200, 14);
    pointille(gPres, 290, 500, PC.ports.fluIn[0] - PC.ws / 2 - 4, PC.ports.fluIn[1] - 24);
    D.etiquette(gPres, 205, 640, "pressostat BP", { "text-anchor": "middle", fill: D.BLEU, "font-weight": 700 });
    const xs = PC.ports.fluIn[0] + PC.ws / 2 + 14;                    // la sonde, entre les deux raccords du bas, reliée à la sortie d'eau
    carte(gSonde, "sonde", xs, 618, 136, 84, 8);
    pointille(gSonde, xs + 136, 660, PC.ports.eauOut[0] - PC.ws / 2 - 3, 660);
    D.etiquette(gSonde, xs, 740, "sonde antigel", { fill: D.CUIVRE_EAU, "font-weight": 700 });

    const pa = pas(g, [["l'eau doit passer, sans arrêt", D.CUIVRE_EAU, T[0] + 0.2, E[0] + 0.3], ["ma pression baisse", BLEU, T[1] + 0.3, E[1] + 0.3],
      ["sous 0 °C, l'eau gèle", ROUGE, T[2] + 0.2, E[2] + 0.3], ["la sentinelle", D.ORANGE, T[3] + 0.2, E[3] + 0.3],
      ["pas de débit : le compresseur s'arrête", ROUGE, A(4, 0.5), E[4] + 0.3], ["la pompe : avant et après", D.BLEU, T[5] + 0.2, E[5] + 0.3],
      ["d'autres gardes", VERT, T[6] + 0.2, DUR + 1]]);

    return function (t) {
      const phE = marche(t, TA, TB), vit = vitesse(t, TA, TB);
      /* tableau A (k0 → k3, puis k6) */
      op(gBloc, t < T[5] ? 1 - doux(t, T[4] - 0.45, 0.35) : doux(t, T[6] - 0.05, 0.35));
      PC.maj(t, { phE: phE, vE: vit, phF: t, glace: doux(t, T[2], E[2] - T[2] + 0.4) * (1 - doux(t, T[3] + 0.4, 1.2)) });
      rf(phE, 0.18, 1);
      pomp(phE * 520, doux(t, T[0] + 1.6, 0.8));
      op(marque, doux(t, TA + 0.5, 0.3) * (1 - doux(t, T[3] - 0.3, 0.3)));
      /* l'héroïne, petite, dans un canal du fluide */
      const yb = PC.y.c1 - 40, yh = PC.y.c0 + 60;
      const hy = D.courbe([[T[0], yb], [E[0], D.lerp(yb, yh, 0.4)], [T[3], D.lerp(yb, yh, 0.4)], [E[6], yh]], t);
      const temp = D.courbe([[T[1], 0.08], [A(1, 0.7), 0], [E[2], 0], [A(3, 0.4), 0.08]], t, true);
      const humeur = t < T[1] ? "sourire" : t < T[3] ? "froid" : t < A(3, 0.5) ? "surprise" : "sourire";
      mila({ x: PC.canalX(3, hy), y: hy, s: 0.4, t: t, temp: temp, etat: "bout", humeur: humeur, regard: [0, -0.6] });
      /* k1 : le manomètre */
      op(gMano, doux(t, T[1] + 0.4, 0.4) * (1 - doux(t, T[3] - 0.1, 0.35)));
      aiguille(D.lerp(70, -105, D.lisse((t - A(1, 0.3)) / (E[1] - A(1, 0.3) - 0.3))) + Math.sin(t * 13) * 1.5 * D.fenetre(t, A(1, 0.3), E[1], 0.3));
      fen(eBas, t, A(1, 0.55), T[3] - 0.1, 0.4);
      /* k3 : la sentinelle de près ; l'eau reprend, la palette se couche */
      const vz = D.fenetre(t, T[3] + 0.1, T[4] - 0.4, 0.4);
      op(gZoom, vz); op(anneau, vz);
      SE.maj({ tilt: vit * 0.92, ph: phE, flow: vit });
      const ang = -54 * vit * 0.92 * PI / 180;
      ePal.trait.setAttribute("x2", f1(300 - 40 * Math.sin(ang))); ePal.trait.setAttribute("y2", f1(481 + 40 * Math.cos(ang)));
      fen(eCtl, t, A(3, 0.3), T[4] - 0.4, 0.4); fen(ePal, t, A(3, 0.62), T[4] - 0.4, 0.4);
      /* k4 : deux états */
      op(gEtats, doux(t, T[4] - 0.1, 0.4) * (1 - doux(t, T[5] - 0.4, 0.35)));
      fen(PAN[0].g, t, T[4] + 0.1, T[5] - 0.4, 0.4); fen(PAN[1].g, t, A(4, 0.5), T[5] - 0.4, 0.4);
      PAN.forEach(p => {
        const fl = p.oui ? 1 : 0;
        p.ct.maj({ tilt: fl * 0.92, ph: t * fl, flow: fl });
        p.vif.setAttribute("opacity", fl * 0.9); p.vif.setAttribute("stroke-dashoffset", f1(-t * 40));
      });
      /* k5 : la frise */
      op(gFrise, doux(t, T[5] - 0.05, 0.35) * (1 - doux(t, E[5], 0.3)));
      const u = D.borne((t - A(5, 0.3)) / (E[5] - A(5, 0.3) - 0.2), 0, 1), xc = D.lerp(X.p0, X.p1, u);
      bPompe.setAttribute("width", f1(Math.max(0, xc - X.p0))); bComp.setAttribute("width", f1(D.borne(xc, X.c0, X.c1) - X.c0));
      curseur.setAttribute("x1", f1(xc)); curseur.setAttribute("x2", f1(xc)); op(curseur, u > 0 && u < 1 ? 1 : 0);
      op(fAvant, doux(t, A(5, 0.52), 0.4)); op(fApres, doux(t, A(5, 0.84), 0.4));
      /* k6 : les autres gardes */
      op(gGardes, doux(t, T[6] - 0.05, 0.35));
      op(gPres, doux(t, A(6, 0.3), 0.4)); op(gSonde, doux(t, A(6, 0.6), 0.4));
      montrer(pa, t);
      const diag = D.courbe([[T[0], 1], [E[0], 1.5], [T[1], 1.5], [E[1], 2], [DUR, 2]], t, true);
      return { temp: temp, etat: "bout", humeur: humeur, diag: diag, diag0: 1 };
    };
  };

  /* une goutte (eau, huile) : petite, d'une couleur choisie ; f(x, y, opacité, échelle) */
  function gouttelette(parent, coul) {
    const e = D.el("path", { d: "M 0 -12 Q 10 3 0 11 Q -10 3 0 -12 Z", fill: coul, stroke: D.BLEU, "stroke-width": 2.2, "stroke-linejoin": "round" }, parent);
    return (x, y, o, k) => { e.setAttribute("transform", "translate(" + f1(x) + " " + f1(y) + ") scale(" + (k || 1) + ")"); op(e, o); };
  }

  /* =====================================================================
     2 · LE GEL — si la frontière cède
     k0 : la sentinelle s'efface en pointillés · k1 : un bloc d'eau, un bloc de glace plus grand, qui pousse ·
     k2 : la frontière de près, la glace remplit le canal d'eau, la plaque se bombe puis se fend · k3 : par la
     fissure, deux sens opposés, un « ? », « selon les pressions » (aucun sens imposé) · k4 : l'eau et l'huile
     font des acides ; la glace bouche le détendeur · k5 : trois chantiers · k6 : la frontière intacte.
     Pas de `diag` ; `carte` : celle du récit (0 → 3).
     ===================================================================== */
  S.gel = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    const GP = { x: 120, y: 215, w: 780, h: 475, niv: 0.4 };

    /* ----- k0 : la sentinelle, qui s'efface en pointillés ----- */
    const gSe = D.el("g", {}, g);
    const SE = controleur(gSe, 480, 500, 1.3, { L: 230 });

    /* ----- k1 : un bloc d'eau (petit), un bloc de glace (plus grand : il pousse vers l'extérieur) ----- */
    const gBl = D.el("g", { opacity: 0 }, g);
    const bEau = D.el("g", { opacity: 0 }, gBl);
    rect(bEau, 110, 380, 190, 190, { rx: 14, fill: "#fff", stroke: D.BLEU, "stroke-width": 5 });
    const liq = D.liquide(bEau, { x0: 114, x1: 296, yh: 392, yb: 564, niveau: () => 0.8, couleur: () => D.EAU, pas: 14 });
    const eEau = etiq(gBl, 205, 625, "eau", { ancre: "middle", coul: D.CUIVRE_EAU, gras: true });
    const bGlace = D.el("g", { opacity: 0 }, gBl), gl = D.el("g", {}, bGlace), idg = ident("glb");  // repère local : centre-bas du bloc en (0, 0)
    rect(D.el("clipPath", { id: idg }, gl), -145, -290, 290, 290, { rx: 22 });
    rect(gl, -145, -290, 290, 290, { rx: 22, fill: GIVRE });
    const fa = D.el("g", { "clip-path": "url(#" + idg + ")" }, gl), Rg = D.alea(41);
    for (let k = 0; k < 15; k++) { // facettes blanches et bleu pâle
      const ax = (Rg() - 0.5) * 290, ay = -Rg() * 290, bx = ax + (Rg() - 0.5) * 200, by = ay + (Rg() - 0.5) * 200, cx = bx + (Rg() - 0.5) * 140, cy = by + (Rg() - 0.5) * 140;
      D.el("polyline", { points: pts([[ax, ay], [bx, by], [cx, cy]]), fill: "none", stroke: k % 3 ? "#c4dcec" : "#fff", "stroke-width": k % 3 ? 3 : 6, "stroke-linejoin": "round" }, fa);
    }
    D.el("polygon", { points: "-125,-268 -70,-268 -125,-205", fill: "#fff", opacity: 0.9 }, gl);
    rect(gl, -145, -290, 290, 290, { rx: 22, fill: "none", stroke: "#5a8fb5", "stroke-width": 6 });
    const eGlace = etiq(gBl, 645, 625, "glace", { ancre: "middle", coul: "#2f6f9c", gras: true });
    const gFl = D.el("g", { opacity: 0 }, gBl);                       // « elle gèle » : la grosse flèche et le flocon
    grosse(gFl, 330, 475, 150, 90, D.BLEU); flocon(gFl, 405, 392, 34, D.BLEU, 5);
    const gPousse = D.el("g", { opacity: 0 }, gBl);                   // la glace pousse vers l'extérieur
    [[505, 285, 452, 232], [785, 285, 838, 232], [785, 565, 838, 618], [505, 565, 452, 618]].forEach(([a, b, x, y]) => fleche(gPousse, a, b, x, y, ROUGE, 9));

    /* ----- k2, k3, k6 : la frontière de près, la molécule, la goutte ----- */
    const gGP = D.el("g", { opacity: 0 }, g);
    const GPo = grosPlan(gGP, GP);
    const eSel = etiq(gGP, GPo.xm, GP.y - 14, "selon les pressions", { ancre: "middle", coul: ROUGE, gras: true });
    const YC = GP.y + GP.h / 2;
    const gFl2 = D.el("g", { opacity: 0, "data-layout-allow-overlap": "" }, gGP);   // k3 : deux flèches de sens opposés qui traversent la plaque : voulu
    const aF = fleche(gFl2, GPo.xm - 105, YC - 26, GPo.xm + 105, YC - 26, D.couleur(0.12, false), 11);
    const aE = fleche(gFl2, GPo.xm + 105, YC + 28, GPo.xm - 105, YC + 28, D.EAU, 11);
    const gQ = D.el("g", { opacity: 0, "data-layout-allow-overlap": "" }, gGP);   // le « ? » posé sur la plaque : voulu
    cercle(gQ, GPo.xm, 292, 33, { fill: D.ORANGE, stroke: "#fff", "stroke-width": 4 });
    D.texte(gQ, GPo.xm, 308, "?", { "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: "#fff", "font-family": "Trebuchet MS, Arial, sans-serif" });
    const mila = D.heroine(GPo.fond, { r: 30 }), eau = D.goutte(GPo.dessus, { r: 30 });

    /* ----- k4 : dans le circuit, l'eau et l'huile font des acides ; la glace bouche le détendeur ----- */
    const gPo = D.el("g", { opacity: 0 }, g);
    D.tube(gPo, 30, 404, 530, 120, "cuivre", false, CLAIR);
    D.tube(gPo, 760, 404, 200, 120, "cuivre", false, CLAIR);
    const liq1 = D.liquide(gPo, { x0: 30, x1: 560, yh: 414, yb: 514, niveau: () => 0.92, couleur: () => D.couleur(0.45, false), pas: 10 });
    const refl1 = D.courant(gPo, 40, 550, 420, 508, 5, 9);
    const gDroite = D.el("g", {}, gPo);
    const liq2 = D.liquide(gDroite, { x0: 760, x1: 960, yh: 414, yb: 514, niveau: () => 0.7, couleur: () => D.couleur(0.08, false), pas: 10 });
    const bul2 = D.bulles(gDroite, 6, 5, false);
    carte(gPo, "detendeur", 560, 337, 200, 200, 10);
    const [pxo, pyo] = surSymbole("detendeur", 570, 347, 180, 180)(0, 0);       // l'orifice, au centre du pointeau
    const bouchon = D.el("g", { opacity: 0 }, gPo);
    D.el("polygon", { points: "-24,-7 -13,-24 4,-20 21,-12 25,4 12,21 -6,20 -21,11", fill: "#fff", stroke: GLACE, "stroke-width": 3.5, "stroke-linejoin": "round" }, bouchon);
    ligne(bouchon, -11, -14, 3, 6, { stroke: "#b5d2e6", "stroke-width": 3 }); ligne(bouchon, 6, -14, 9, 12, { stroke: "#b5d2e6", "stroke-width": 3 });
    const dEau = gouttelette(gPo, D.EAU), dHuile = gouttelette(gPo, HUILE);
    const nuage = D.el("g", { opacity: 0 }, gPo);
    [[-16, 5, 20], [8, -8, 22], [24, 8, 18], [-4, 15, 16], [6, -18, 15]].forEach(([x, y, r]) => cercle(nuage, x, y, r, { fill: ACIDE, "fill-opacity": 0.62 }));
    const eAcide = etiq(gPo, 340, 378, "acides", { ancre: "middle", coul: ACIDE, gras: true, trait: [340, 388, 340, 420], coulTrait: ACIDE });
    const eGlaceD = etiq(gPo, 660, 590, "glace au détendeur", { ancre: "middle", coul: "#2f6f9c", gras: true });
    const tMeet = A(4, 0.3);

    /* ----- k5 : trois chantiers ----- */
    const gTr = D.el("g", { opacity: 0 }, g);
    const CX = [176, 488, 800];
    const cartes5 = CX.map(cx => { const gc = D.el("g", { opacity: 0 }, gTr); rect(gc, cx - 148, 240, 296, 410, { rx: 22, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }); return gc; });
    { // 1 · l'évaporateur à plaques, barré
      const gc = cartes5[0], cx = CX[0];
      D.image(gc, "evaporateur", cx - 118, 275, 236, 236);
      ligne(gc, cx - 100, 292, cx + 100, 496, { stroke: ROUGE, "stroke-width": 18, "stroke-linecap": "round" }); ligne(gc, cx + 100, 292, cx - 100, 496, { stroke: ROUGE, "stroke-width": 18, "stroke-linecap": "round" });
      D.etiquette(gc, cx, 612, "à changer", { "text-anchor": "middle", fill: ROUGE, "font-weight": 700 });
    }
    { // 2 · un tube plein de boue d'acide, et sa brosse
      const gc = cartes5[1], cx = CX[1];
      D.tube(gc, cx - 130, 350, 260, 100, "cuivre", false, CLAIR);
      [[-100, 388, 17, 11], [-64, 418, 14, 8], [-30, 392, 18, 12], [8, 420, 13, 8], [44, 390, 16, 11], [78, 416, 17, 9], [104, 394, 12, 9]].forEach(([dx, y, rx, ry]) => D.el("ellipse", { cx: cx + dx, cy: y, rx: rx, ry: ry, fill: "#4b3b2f", opacity: 0.85 }, gc));
      for (let k = 0; k < 16; k++) { const a = k * PI / 8; ligne(gc, cx + 20, 400, cx + 20 + 32 * Math.cos(a), 400 + 32 * Math.sin(a), { stroke: "#6b7785", "stroke-width": 4.5, "stroke-linecap": "round" }); }
      ligne(gc, cx + 20, 400, cx + 140, 400, { stroke: "#39424c", "stroke-width": 10, "stroke-linecap": "round" });
      D.etiquette(gc, cx, 612, "à nettoyer", { "text-anchor": "middle", fill: ROUGE, "font-weight": 700 });
    }
    { // 3 · un bidon d'huile et un filtre déshydrateur
      const gc = cartes5[2], cx = CX[2];
      rect(gc, cx - 130, 360, 100, 124, { rx: 14, fill: HUILE, stroke: "#7a5210", "stroke-width": 5 });
      rect(gc, cx - 106, 336, 34, 26, { rx: 5, fill: "#7a5210" });
      D.el("path", { d: "M " + (cx - 60) + " 360 V 338 H " + (cx - 34) + " V 360", fill: "none", stroke: "#7a5210", "stroke-width": 8, "stroke-linejoin": "round" }, gc);
      rect(gc, cx - 120, 396, 80, 52, { rx: 7, fill: "#fff", opacity: 0.9 });
      D.el("path", { d: "M " + (cx - 80) + " 404 Q " + (cx - 64) + " 428 " + (cx - 80) + " 441 Q " + (cx - 96) + " 428 " + (cx - 80) + " 404 Z", fill: HUILE }, gc);
      D.image(gc, "filtre", cx - 20, 395, 134, 67);
      D.etiquette(gc, cx, 612, "à remplacer", { "text-anchor": "middle", fill: ROUGE, "font-weight": 700 });
    }

    const pa = pas(g, [["sans sentinelle…", ROUGE, T[0] + 0.2, E[0] + 0.3], ["la glace prend plus de place", BLEU, T[1] + 0.3, E[1] + 0.3],
      ["la plaque se fend", ROUGE, T[2] + 0.3, E[2] + 0.3], ["la frontière est percée", ROUGE, T[3] + 0.3, E[3] + 0.3],
      ["l'eau devient un poison", ACIDE, T[4] + 0.3, E[4] + 0.3], ["le pire des chantiers", ROUGE, T[5] + 0.3, E[5] + 0.3],
      ["de l'autre côté de la plaque, toujours", D.BLEU, T[6] + 0.2, DUR + 1]]);

    return function (t) {
      /* k0 : la sentinelle s'efface en pointillés */
      op(gSe, 1 - doux(t, T[1] - 0.35, 0.3));
      SE.maj({ tilt: 0.92, ph: t, flow: 1, efface: D.lisse((t - A(0, 0.35)) / (E[0] - A(0, 0.35) + 0.25)) });
      /* k1 : l'eau, la glace plus grande */
      op(gBl, D.fenetre(t, T[1] + 0.05, T[2] - 0.35, 0.4));
      op(bEau, doux(t, T[1] + 0.15, 0.4)); liq.maj(t);
      fen(eEau, t, T[1] + 0.4, T[2] - 0.35, 0.4); fen(eGlace, t, A(1, 0.5), T[2] - 0.35, 0.4);
      op(gFl, doux(t, A(1, 0.2), 0.4));
      op(bGlace, doux(t, A(1, 0.36), 0.35));
      bGlace.setAttribute("transform", "translate(645 570) scale(" + f1(D.lerp(190 / 290, 1, D.lisse((t - A(1, 0.4)) / 1.0))) + ")");
      op(gPousse, doux(t, A(1, 0.78), 0.4) * (0.7 + 0.3 * Math.sin(t * 6)));
      /* k2, k3, k6 : la frontière de près */
      const vGP = t < T[5] ? doux(t, T[2] - 0.3, 0.4) * (1 - doux(t, T[4] - 0.4, 0.35)) : doux(t, T[6] - 0.4, 0.4);
      op(gGP, vGP);
      const fin = t >= T[5];                                           // k6 : tout est intact
      const glace = fin ? 0 : doux(t, T[2] + 0.1, 1.6) * (1 - doux(t, T[3] + 0.3, 1.2));
      const bomb = fin ? 0 : 56 * doux(t, A(2, 0.3), (E[2] - A(2, 0.3)) * 0.6) * (1 - 0.6 * doux(t, A(2, 0.85), 1.5));
      const fiss = fin ? 0 : doux(t, A(2, 0.72), (E[2] - A(2, 0.72)) * 0.7);
      const etiqG = t < T[4] ? doux(t, T[2] - 0.1, 0.4) * (1 - doux(t, T[3] - 0.3, 0.25)) : fin ? doux(t, T[6] - 0.2, 0.4) : 0;
      GPo.maj(t, { glace: glace, bomb: bomb, fiss: fiss, halo: fin ? doux(t, T[6], 0.5) : 0, etiq: etiqG, bul: 0.6, vap: 0.6 });
      fen(eSel, t, T[3] + 0.4, T[4] - 0.4, 0.4);
      op(gFl2, D.fenetre(t, A(3, 0.2), T[4] - 0.4, 0.4));
      const pulse = Math.sin(t * 5) * 9;
      aF.setAttribute("transform", "translate(" + f1(pulse) + " 0)"); aE.setAttribute("transform", "translate(" + f1(-pulse) + " 0)");
      op(gQ, t >= A(3, 0.3) && t < T[4] - 0.45 ? 1 : 0);
      /* les deux personnages : la molécule flotte sur la nappe (sous elle, vue à travers) ; la goutte est dans le canal de l'eau */
      const surf = GPo.surface(t), rest = surf - 14 + Math.sin(t * 2) * 4;
      let hx, hy, hh = "sourire", gx, gy, gh = "sourire", ge = glace > 0.55 ? "glace" : "eau";
      if (t < T[3]) { hx = GPo.xg; hy = rest; hh = t < A(2, 0.45) ? "sourire" : "triste"; gx = GPo.xd; gy = 420; }
      else if (t < T[5]) { const k = doux(t, T[3], 0.8); hx = D.lerp(GPo.xg, GPo.xg - 30, k); hy = D.lerp(rest, 350, k); hh = "surprise"; gx = D.lerp(GPo.xd, GPo.xd + 50, k); gy = D.lerp(420, 350, k); gh = "surprise"; ge = "eau"; }
      else { hx = GPo.xg; hy = rest; gx = GPo.xd; gy = 455; ge = "eau"; }
      plan(mila, hy > surf - 96 ? GPo.fond : GPo.dessus);
      mila({ x: hx, y: hy, s: 1.7, t: t, temp: 0.08, etat: "bout", humeur: hh, regard: [1, 0] });
      eau({ x: gx, y: gy, s: 1.7, t: t, tiede: 0.5, etat: ge, humeur: gh, regard: [-1, 0] });
      /* k4 : l'eau et l'huile se rencontrent dans le circuit ; la glace bouche le détendeur */
      op(gPo, D.fenetre(t, T[4] - 0.1, T[5] - 0.4, 0.4));
      liq1.maj(t); refl1(t, 70);
      const bouche = doux(t, A(4, 0.62), 0.7);
      op(gDroite, 1 - bouche); liq2.maj(t);
      bul2(t, (q, b) => { const x = 780 + q * 170; return [x, 508, liq2.surface(x, t) + 4, 1 - bouche, "#fff"]; });
      const aller = D.lisse((t - (T[4] + 0.3)) / (tMeet - T[4] - 0.3)), fondu = 1 - doux(t, tMeet + 0.05, 0.25);
      dEau(D.lerp(70, 340, aller), 452, t < tMeet ? doux(t, T[4] + 0.2, 0.3) : fondu, 2.4);
      dHuile(D.lerp(230, 340, aller), 470, t < tMeet ? doux(t, T[4] + 0.2, 0.3) : fondu, 2.4);
      const nu = doux(t, tMeet, 0.5);
      nuage.setAttribute("transform", "translate(" + f1(340 + 40 * doux(t, tMeet, 3.5)) + " 462) scale(" + f1(0.25 + 1.0 * nu) + ")");
      op(nuage, nu * (0.85 + 0.15 * Math.sin(t * 4)));
      fen(eAcide, t, tMeet + 0.2, A(4, 0.7), 0.4);
      bouchon.setAttribute("transform", "translate(" + f1(pxo) + " " + f1(pyo) + ") scale(" + f1(0.2 + 0.8 * bouche) + ")"); op(bouchon, bouche);
      fen(eGlaceD, t, A(4, 0.66), T[5] - 0.4, 0.4);
      /* k5 : trois chantiers */
      op(gTr, D.fenetre(t, T[5] - 0.1, T[6] - 0.4, 0.4));
      op(cartes5[0], doux(t, T[5] + 0.3, 0.4)); op(cartes5[1], doux(t, A(5, 0.27), 0.4)); op(cartes5[2], doux(t, A(5, 0.52), 0.4));
      montrer(pa, t);
      const humeur = t < T[3] ? "triste" : t < T[4] ? "surprise" : t < T[6] ? "triste" : "sourire";
      return { temp: 0.08, etat: "bout", humeur: humeur };
    };
  };

  /* le bidon de glycol (rose, un flocon sur l'étiquette) : centre (cx, cy), échelle k */
  function bidon(parent, cx, cy, k, coul) {
    const g = D.el("g", { transform: "translate(" + cx + " " + cy + ") scale(" + k + ")" }, parent);
    rect(g, -50, -58, 100, 120, { rx: 14, fill: coul, stroke: NUIT, "stroke-width": 4 });
    rect(g, -26, -82, 34, 26, { rx: 5, fill: NUIT });
    D.el("path", { d: "M 18 -58 V -82 H 44 V -58", fill: "none", stroke: NUIT, "stroke-width": 8, "stroke-linejoin": "round" }, g);
    rect(g, -40, -22, 80, 52, { rx: 7, fill: "#fff", opacity: 0.92 });
    flocon(g, 0, 4, 20, coul, 3.5);
    return g;
  }
  /* la pompe à vide : socle, caisson, moteur à ailettes, vacuomètre sans chiffre (repère local : x −26 → 254, y −32 → 172 ;
     raccord d'aspiration à gauche, en (−26, 108)) → { g, aig(angle) } */
  function pompeAVide(parent, x, y, k) {
    const g = D.el("g", { transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, parent);
    rect(g, -8, 150, 270, 22, { rx: 7, fill: "#39424c" });
    rect(g, 0, 62, 178, 94, { rx: 16, fill: "url(#vm-marine-h)", stroke: "#0a1829", "stroke-width": 3 });
    rect(g, 170, 80, 84, 64, { rx: 10, fill: "#6b7a8c", stroke: "#39424c", "stroke-width": 3 });
    for (let i = 0; i < 6; i++) ligne(g, 184 + i * 12, 86, 184 + i * 12, 138, { stroke: "#39424c", "stroke-width": 3 });
    cercle(g, 90, 109, 24, { fill: "#9aa7b5", stroke: "#39424c", "stroke-width": 3 }); cercle(g, 90, 109, 8, { fill: "#39424c" });
    rect(g, -26, 96, 30, 24, { rx: 5, fill: "#8a96a4", stroke: "#39424c", "stroke-width": 3 });
    rect(g, 30, 46, 16, 20, { fill: "#56636f" });
    return { g: g, aig: cadran(g, 38, 6, 34) };
  }
  /* thermomètre en verre sans graduation : tube, boule, colonne rouge ; rend f(y du sommet de la colonne) */
  function thermoV(parent, x, yh, yb, rb) {
    const g = D.el("g", {}, parent), cid = ident("th");
    rect(D.el("clipPath", { id: cid }, g), x - 11, yh, 22, yb - yh + 6);
    cercle(g, x, yb + rb - 4, rb + 7, { fill: "#fff", stroke: D.BLEU, "stroke-width": 5 });
    rect(g, x - 19, yh - 4, 38, yb - yh + 14, { rx: 19, fill: "#fff", stroke: D.BLEU, "stroke-width": 5 });
    cercle(g, x, yb + rb - 4, rb, { fill: "#d64530" });
    const col = rect(D.el("g", { "clip-path": "url(#" + cid + ")" }, g), x - 9, yh, 18, yb - yh + 12, { fill: "#d64530" });
    return y => { col.setAttribute("y", f1(y)); col.setAttribute("height", f1(yb + 12 - y)); };
  }

  /* =====================================================================
     3 · LES ARMES DU FRIGORISTE — tenir l'eau à distance
     k0 : quatre pictogrammes, l'un après l'autre · k1 : le filtre à tamis (symbole, puis coupe) · k2 : le glycol
     (un thermomètre, « 0 °C », le bidon) · k3 : la pompe à vide et son flexible · k4 : le filtre déshydrateur
     (symbole, coupe) et le voyant (symbole, pastille d'indicateur). L'héroïne : `liquide`, 0,45, au filtre.
     Pas de `diag` ; `carte` : celle du récit (9 → 11).
     ===================================================================== */
  S.armes = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    const defs = D.el("defs", {}, g), idMaille = ident("maille");
    const pm = D.el("pattern", { id: idMaille, width: 9, height: 9, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs);
    rect(pm, 0, 0, 9, 9, { fill: "#f4f8fc" }); ligne(pm, 0, 0, 0, 9, { stroke: "#56636f", "stroke-width": 2.4 }); ligne(pm, 0, 0, 9, 0, { stroke: "#56636f", "stroke-width": 1.2 });

    /* ----- k0 : quatre pictogrammes ----- */
    const g0 = D.el("g", { opacity: 0 }, g), CX0 = [136, 371, 606, 841];
    const c0 = CX0.map(cx => { const gc = D.el("g", { opacity: 0 }, g0); rect(gc, cx - 112, 250, 224, 370, { rx: 22, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }); return gc; });
    D.image(c0[0], "filtreEau", CX0[0] - 94, 330, 188, 134);
    bidon(c0[1], CX0[1], 400, 1.0, "#d8527c");
    pompeAVide(c0[2], CX0[2] - 80, 365, 0.7);
    D.image(c0[3], "filtre", CX0[3] - 98, 360, 196, 98);
    [[["filtre", "à tamis"], 0], [["glycol"], 1], [["pompe", "à vide"], 2], [["filtre", "déshydrateur"], 3]].forEach(([lg, i]) => lg.forEach((l, j) => D.etiquette(c0[i], CX0[i], (lg.length === 1 ? 574 : 552) + j * 38, l, { "text-anchor": "middle", "font-size": 30, fill: D.BLEU, "font-weight": 700 })));

    /* ----- k1 : le filtre à tamis ----- */
    const g1 = D.el("g", { opacity: 0 }, g);
    const sym1 = D.el("g", { opacity: 0 }, g1);
    carte(sym1, "filtreEau", 322, 320, 340, 220, 18);
    const cut1 = D.el("g", { opacity: 0 }, g1), idRog = ident("rog");
    rect(D.el("clipPath", { id: idRog }, defs), 24, 150, 938, 610);
    const cutc = D.el("g", { "clip-path": "url(#" + idRog + ")" }, cut1);   // le tuyau continue de part et d'autre du cadre
    const YT = 450, PEAU = "M -30 " + (YT - 24) + " H 290 V 345 H 670 V " + (YT - 24) + " H 1000 V " + (YT + 24) + " H 670 V 555 H 290 V " + (YT + 24) + " H -30 Z";
    const idEau = ident("eau");
    D.el("path", { d: PEAU }, D.el("clipPath", { id: idEau }, defs));
    D.el("path", { d: PEAU, fill: "none", stroke: "#39424c", "stroke-width": 34, "stroke-linejoin": "round" }, cutc);
    D.el("path", { d: PEAU, fill: "none", stroke: "#8793a1", "stroke-width": 28, "stroke-linejoin": "round" }, cutc);
    D.el("path", { d: PEAU, fill: D.EAU_TIEDE }, cutc);
    const reflets1 = D.courant(D.el("g", { "clip-path": "url(#" + idEau + ")" }, cutc), 30, 960, 350, 550, 16, 17);
    rect(cutc, 466, 349, 26, 202, { fill: "url(#" + idMaille + ")", stroke: "#39424c", "stroke-width": 3 });
    const Rp = D.alea(23), PART = Array.from({ length: 11 }, (_, i) => ({ t0: T[1] + 1.8 + i * 0.17, xf: 456 - (i % 4) * 9 - Rp() * 6, yf: 362 + Rp() * 176, yp: YT + (Rp() - 0.5) * 24, r: 5 + Rp() * 4,
      e: D.el("polygon", { points: "-1,-8 7,-3 6,6 -3,8 -8,1", fill: "#3b3b3b", stroke: "#fff", "stroke-width": 1.5, "stroke-linejoin": "round", opacity: 0 }, cutc) }));
    const eTamis = etiq(g1, 479, 310, "tamis", { ancre: "middle", coul: D.BLEU, gras: true, trait: [479, 320, 479, 372], coulTrait: D.BLEU });

    /* ----- k2 : le glycol ----- */
    const g2 = D.el("g", { opacity: 0 }, g);
    const YH = 200, YB = 585, XT = 200, M1 = 345, M2 = 505;
    const colonne = thermoV(g2, XT, YH, YB, 30);
    const fl1 = D.el("g", { opacity: 0 }, g2), fl2 = D.el("g", { opacity: 0 }, g2);
    flocon(fl1, XT - 66, M1, 22, "#2f6f9c", 4); flocon(fl2, XT - 66, M2, 22, "#2f6f9c", 4);
    pointille(g2, XT + 22, M1, XT + 62, M1, ROUGE); pointille(g2, XT + 22, M2, XT + 62, M2, D.BLEU);
    const eM1 = etiq(g2, XT + 76, M1 + 11, "eau pure : gèle à 0 °C", { coul: ROUGE, gras: true }), eM2 = etiq(g2, XT + 76, M2 + 11, "eau glycolée : gèle plus bas", { coul: D.BLEU, gras: true });
    const gBid = D.el("g", { opacity: 0 }, g2);
    bidon(gBid, 830, 300, 1.25, "#d8527c");
    D.etiquette(gBid, 830, 430, "glycol", { "text-anchor": "middle", fill: "#b23a63", "font-weight": 700 });

    /* ----- k3 : la pompe à vide ----- */
    const g3 = D.el("g", { opacity: 0 }, g);
    const LOOP = [[70, 420], [70, 300], [340, 300], [340, 420], [340, 540], [70, 540], [70, 420]], PORT = [340, 420];
    tuyau(g3, LOOP, 24, CLAIR, "#9a5a2e");
    const hose = [];
    for (let i = 0; i <= 24; i++) {
      const u = i / 24, m = 1 - u, P = [PORT, [470, 420], [520, 466], [622, 466]];
      hose.push([m * m * m * P[0][0] + 3 * m * m * u * P[1][0] + 3 * m * u * u * P[2][0] + u * u * u * P[3][0], m * m * m * P[0][1] + 3 * m * m * u * P[1][1] + 3 * m * u * u * P[2][1] + u * u * u * P[3][1]]);
    }
    D.el("polyline", { points: pts(hose), fill: "none", stroke: "#39424c", "stroke-width": 24, "stroke-linecap": "round", "stroke-linejoin": "round" }, g3);
    D.el("polyline", { points: pts(hose), fill: "none", stroke: "#7b8794", "stroke-width": 14, "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": "5 7" }, g3);
    rect(g3, 340, 408, 26, 24, { rx: 5, fill: "#8a96a4", stroke: "#39424c", "stroke-width": 3 });   // le raccord, sur le circuit
    const PV = pompeAVide(g3, 650, 360, 1);
    D.etiquette(g3, 770, 628, "pompe à vide", { "text-anchor": "middle", fill: D.BLEU, "font-weight": 700 });
    D.etiquette(g3, 205, 270, "circuit", { "text-anchor": "middle", fill: D.BLEU, "font-weight": 700 });
    const ROUTES = [LOOP.slice(0, 4), [[70, 420], [70, 540], [340, 540], [340, 420]]].map(h => h.concat(hose.slice(1)));
    const Rh = D.alea(5), HUM = Array.from({ length: 16 }, (_, i) => ({ r: ROUTES[i % 2], s: Rh(), eau: i % 2 === 1, e: i % 2 ? gouttelette(g3, D.EAU) : cercle(g3, 0, 0, 6.5, { fill: "#9aa7b5", stroke: "#fff", "stroke-width": 2, opacity: 0 }) }));

    /* ----- k4 : le filtre déshydrateur et le voyant ----- */
    const g4 = D.el("g", { opacity: 0 }, g);
    D.el("polyline", { points: "30,430 960,430", fill: "none", stroke: "#8a4a24", "stroke-width": 50 }, g4);
    D.el("polyline", { points: "30,430 960,430", fill: "none", stroke: D.couleur(0.45, false), "stroke-width": 36 }, g4);
    const flux4 = D.courant(g4, 36, 954, 416, 444, 8, 31);
    const gFs = D.el("g", { opacity: 0 }, g4), gF = D.el("g", { opacity: 0 }, g4);        // le symbole d'abord, la coupe ensuite
    carte(gFs, "filtre", 40, 168, 140, 74, 8);
    D.etiquette(gFs, 196, 218, "filtre déshydrateur", { fill: D.BLEU, "font-weight": 700 });
    rect(gF, 100, 330, 320, 200, { rx: 56, fill: "url(#vm-noir)" });
    rect(gF, 126, 352, 268, 156, { rx: 28, fill: CLAIR });
    rect(gF, 126, 411, 268, 38, { fill: D.couleur(0.45, false), opacity: 0.55 });
    const Rg = D.alea(13), GR = [];
    for (let i = 0; i < 9; i++) for (let j = 0; j < 6; j++) GR.push([186 + i * 21 + (Rg() - 0.5) * 4, 366 + j * 25 + (Rg() - 0.5) * 4]);
    rect(gF, 176, 358, 196, 144, { rx: 10, fill: "#e8dcc2", opacity: 0.55 });
    GR.forEach(([x, y]) => cercle(gF, x, y, 9.5, { fill: "#efe3c6", stroke: "#b59b6a", "stroke-width": 1.5 }));
    ligne(gF, 384, 356, 384, 504, { stroke: "#6b7785", "stroke-width": 10, "stroke-dasharray": "7 6" });
    const GOUT = Array.from({ length: 7 }, (_, i) => ({ t0: T[4] + 1.4 + i * 0.28, f: GR[i * 7 + 3], e: gouttelette(gF, D.EAU) }));
    const gVs = D.el("g", { opacity: 0 }, g4), gV = D.el("g", { opacity: 0 }, g4);
    carte(gVs, "voyant", 520, 168, 140, 74, 8);
    D.etiquette(gVs, 676, 218, "voyant", { fill: D.BLEU, "font-weight": 700 });
    rect(gV, 628, 316, 204, 228, { rx: 38, fill: "url(#vm-laiton)", stroke: "#7c5c18", "stroke-width": 4 });
    cercle(gV, 730, 430, 92, { fill: "#6f5214" });
    const idVit = ident("vitre");
    cercle(D.el("clipPath", { id: idVit }, defs), 730, 430, 80);
    const vit = D.el("g", { "clip-path": "url(#" + idVit + ")" }, gV);
    rect(vit, 640, 340, 180, 180, { fill: D.couleur(0.45, false) });
    const fluxV = D.courant(vit, 646, 814, 352, 508, 7, 37);
    const indic = cercle(gV, 730, 430, 30, { fill: "#2e9e57", stroke: "#fff", "stroke-width": 5 });
    D.el("path", { d: "M 672 388 A 80 80 0 0 1 738 356", fill: "none", stroke: "#fff", "stroke-width": 7, opacity: 0.55, "stroke-linecap": "round" }, gV);
    cercle(gV, 666, 612, 14, { fill: "#2e9e57", stroke: NUIT, "stroke-width": 2.5 }); D.etiquette(gV, 690, 624, "sec", { fill: VERT, "font-weight": 700 });
    cercle(gV, 786, 612, 14, { fill: "#e3c21b", stroke: NUIT, "stroke-width": 2.5 }); D.etiquette(gV, 810, 624, "humide", { fill: "#8a6d00", "font-weight": 700 });
    const mila = D.heroine(g4, { r: 30 });

    const pa = pas(g, [["les armes du frigoriste", D.BLEU, T[0] + 0.2, E[0] + 0.3], ["côté eau : le filtre à tamis", D.CUIVRE_EAU, T[1] + 0.2, E[1] + 0.3],
      ["l'hiver dehors : eau glycolée", D.BLEU, T[2] + 0.2, E[2] + 0.3], ["côté fluide : on fait le vide", D.ORANGE, T[3] + 0.2, E[3] + 0.3],
      ["le voyant surveille", VERT, A(4, 0.5), DUR + 1]]);

    return function (t) {
      /* k0 : les pictogrammes, l'un après l'autre */
      op(g0, 1 - doux(t, T[1] - 0.4, 0.35));
      c0.forEach((gc, i) => op(gc, doux(t, T[0] + 0.15 + i * 0.7, 0.4)));
      /* k1 : le symbole, puis la coupe ; l'eau passe, les particules restent prises */
      op(g1, D.fenetre(t, T[1] - 0.05, T[2] - 0.4, 0.4));
      op(sym1, doux(t, T[1] + 0.1, 0.4) * (1 - doux(t, T[1] + 1.6, 0.5))); op(cut1, doux(t, T[1] + 1.8, 0.5));
      reflets1(t, 110);
      PART.forEach(q => {
        const dt = t - q.t0, x = Math.min(q.xf, 40 + dt * 220), k = D.lisse((x - 285) / 170), y = D.lerp(q.yp, q.yf, k);
        q.e.setAttribute("transform", "translate(" + f1(x) + " " + f1(y) + ") scale(" + f1(q.r / 7) + ") rotate(" + f1(dt < 0 ? 0 : x < q.xf ? dt * 90 : 0) + ")"); op(q.e, dt < 0 ? 0 : 1);
      });
      fen(eTamis, t, A(1, 0.5), T[2] - 0.4, 0.4);
      /* k2 : le thermomètre, « 0 °C », le glycol */
      op(g2, D.fenetre(t, T[2] - 0.05, T[3] - 0.4, 0.4));
      colonne(D.courbe([[T[2], 230], [A(2, 0.36), 230], [A(2, 0.6), M2]], t, false));
      op(fl1, doux(t, A(2, 0.62), 0.4)); op(fl2, doux(t, A(2, 0.58), 0.4));
      fen(eM1, t, A(2, 0.62), T[3] - 0.4, 0.4); fen(eM2, t, A(2, 0.56), T[3] - 0.4, 0.4); op(gBid, doux(t, A(2, 0.16), 0.5) * (1 - doux(t, T[3] - 0.4, 0.4)));
      /* k3 : le vide ; l'air et l'humidité s'en vont par le flexible */
      op(g3, D.fenetre(t, T[3] - 0.05, T[4] - 0.4, 0.4));
      PV.aig(D.lerp(70, -110, D.lisse((t - (T[3] + 0.8)) / (E[3] - T[3] - 1.4))) + Math.sin(t * 17) * 1.2 * D.fenetre(t, T[3] + 0.8, E[3], 0.3));
      const nv = D.lerp(16, 2, D.lisse((t - (T[3] + 0.6)) / (E[3] - T[3] - 1.2)));
      HUM.forEach((h, i) => {
        const u = D.frac(h.s + (t - T[3]) * 0.1), [x, y] = suivre(h.r, u), vis = D.borne(nv - i, 0, 1) * D.fenetre(u, 0, 1, 0.04);
        if (h.eau) h.e(x, y, vis, 1.1); else { h.e.setAttribute("cx", f1(x)); h.e.setAttribute("cy", f1(y)); op(h.e, vis); }
      });
      /* k4 : le filtre déshydrateur, le voyant */
      op(g4, D.fenetre(t, T[4] - 0.05, DUR + 1, 0.4));
      op(gFs, doux(t, T[4] + 0.05, 0.4)); op(gF, doux(t, T[4] + 1.0, 0.5)); op(gVs, doux(t, A(4, 0.48), 0.4)); op(gV, doux(t, A(4, 0.48) + 0.9, 0.5));
      flux4(t, 90); fluxV(t, 120);
      GOUT.forEach(q => {
        const dt = t - q.t0, f = D.borne(dt / 1.4, 0, 1), x = f < 1 ? D.lerp(60, q.f[0], D.lisse(f)) : q.f[0], y = f < 1 ? D.lerp(430, q.f[1], D.lisse(f)) : q.f[1];
        q.e(x, y, dt < 0 ? 0 : 1, f < 1 ? 1.5 : 1.0);
      });
      indic.setAttribute("fill", t < A(4, 0.78) ? "#2e9e57" : t < A(4, 0.78) + 0.6 ? "#9bb23b" : "#e3c21b");
      const px = D.courbe([[T[4] + 1.0, 60], [A(4, 0.42), 400], [A(4, 0.6), 520], [E[4] - 0.3, 610]], t, true);
      mila({ x: px, y: 430, s: 0.5, t: t, temp: 0.45, etat: "liquide", humeur: "sourire", regard: [1, 0], op: D.fenetre(t, T[4] + 1.0, E[4] - 0.2, 0.4) });
      montrer(pa, t);
      return { temp: 0.45, etat: "liquide", humeur: "sourire" };
    };
  };

  /* =====================================================================
     4 · LE RÉSUMÉ — refaisons le voyage (pas de carte « où je suis », pas de diagramme)
     La carte des deux circuits, comme à l'intro. k0 : on revient à l'évaporateur · k1 : l'évaporateur surligné,
     la molécule et la goutte de part et d'autre · k2 : la goutte va aux ventilo-convecteurs, la molécule au
     condenseur · k3 : la sentinelle (la carte s'efface, un cadre montre sa coupe ; un anneau la place près de
     l'évaporateur, sur le tuyau d'eau) · k4 : la molécule et la goutte en grand, côte à côte · k5 : la molécule
     entre deux gouttes (clin d'œil au tome suivant).
     ===================================================================== */
  S.resume = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    const cir = D.circuit(g, 66, 174, 840, true);
    const gSent = D.el("g", { opacity: 0, "data-layout-allow-overlap": "" }, g);   // k3 : la sentinelle de près, cadre opaque posé sur la carte estompée : voulu
    rect(gSent, 30, 215, 422, 420, { rx: 20, fill: "#fffdf8", stroke: D.ORANGE, "stroke-width": 4 });
    const SE = controleur(gSent, 241, 490, 0.95, { L: 190 });
    const eSent = etiq(gSent, 241, 276, "sentinelle", { ancre: "middle", coul: D.ORANGE, gras: true });
    const [ax, ay] = cir.ecran(503, 262);                             // le tuyau d'eau, juste avant l'évaporateur
    const anneau = D.el("g", { opacity: 0, "data-layout-allow-overlap": "" }, g);
    cercle(anneau, ax, ay, 24, { fill: "none", stroke: D.ORANGE, "stroke-width": 5, "stroke-dasharray": "8 6" });
    pointille(anneau, ax - 24, ay, 452, ay, D.ORANGE);
    const gPl = D.el("g", { opacity: 0 }, g);                         // k5 : deux plaques, l'eau de chaque côté
    [340, 644].forEach(x => rect(gPl, x, 240, 16, 410, { rx: 6, fill: "url(#vm-acier-h)", stroke: "#39424c", "stroke-width": 2.5 }));
    const mila = D.heroine(g, { r: 30 }), eau = D.goutte(g, { r: 30 }), eau2 = D.goutte(g, { r: 30, dephasage: 0.6 });
    const pa = pas(g, [["refaisons le voyage", D.BLEU, T[0] + 0.2, E[0] + 0.3], ["une plaque, deux camps", D.ORANGE, T[1] + 0.2, E[1] + 0.3],
      ["l'eau rafraîchit · je rejette dehors", D.CUIVRE_EAU, T[2] + 0.2, E[2] + 0.3], ["la sentinelle veille", D.ORANGE, T[3] + 0.2, E[3] + 0.3],
      ["ennemis… mais ensemble", VERT, T[4] + 0.2, E[4] + 0.3], ["au prochain voyage : l'eau des deux côtés", D.BLEU, T[5] + 0.2, DUR + 1]]);
    /* leurs trajets sur la carte : position du fluide (0 → 14, on reboucle) et de l'eau (0 → 13, on reboucle), « dépliées » */
    const wH = t => D.courbe([[T[0], 11.5], [E[0], 14.85], [T[2], 14.85], [E[2] - 0.4, 22]], t);
    const wE = t => D.courbe([[T[0], 10], [E[0], 14.9], [T[2], 14.9], [E[2] - 0.4, 19.5]], t);
    const tempH = w => D.courbe([[0, 0.08], [3, 0.12], [4.9, 0.15], [6, 0.62], [7.3, 0.62], [7.8, 0.5], [8.6, 0.45], [10.9, 0.45], [11.3, 0.08], [14, 0.08]], w, true);
    const etatH = w => w < 3 ? "bout" : w < 7.3 ? "vapeur" : w < 8.2 ? "bout" : w < 11 ? "liquide" : "bout";
    const tiede = w => D.courbe([[0, 1], [1, 1], [2, 0], [6, 0], [7, 1], [13, 1]], w, true);
    return function (t) {
      /* la carte : elle apparaît, recule pour la sentinelle (k3), s'efface pour les deux personnages */
      op(cir.g, doux(t, 0, 0.6) * (1 - 0.72 * doux(t, T[3] - 0.25, 0.3)) * (1 - doux(t, T[4] - 0.25, 0.45)));
      cir.surligne("evaporateur", t > T[1] - 0.1 && t < T[2] - 0.1);
      cir.surligne("ventilo", t > A(2, 0.62) && t < T[3]); cir.surligne("condenseur", t > A(2, 0.62) && t < T[3]);
      /* k3 : la sentinelle de près */
      op(gSent, D.fenetre(t, T[3] - 0.05, T[4] - 0.35, 0.4)); op(anneau, D.fenetre(t, T[3] - 0.05, T[4] - 0.35, 0.4));
      SE.maj({ tilt: 0.92, ph: t, flow: 1 }); op(eSent, D.fenetre(t, T[3] + 0.4, T[4] - 0.85, 0.3));
      /* les personnages : petits sur la carte, puis grands */
      const wh = wH(t), whm = ((wh % 14) + 14) % 14, we = wE(t), wem = ((we % 13) + 13) % 13;
      const [hx, hy] = cir.ecran(...D.circuitPoint(whm)), [gx, gy] = cir.ecran(...D.eauPoint(wem));
      const grand = doux(t, T[4] + 0.1, 0.7), k5 = doux(t, T[5] - 0.1, 0.9), bob = Math.sin(t * 2.2) * 3;
      const XH = D.lerp(350, 492, k5), XG = D.lerp(640, 800, k5);
      const humeur = whm > 4.8 && whm < 7.4 ? "chaud" : whm > 11.3 ? "froid" : "sourire";
      mila({ x: D.lerp(hx, XH, grand), y: D.lerp(hy + bob, 440, grand), s: D.lerp(0.5, 2.4, grand), t: t, temp: D.lerp(tempH(whm), 0.1, grand), etat: grand > 0.5 ? "liquide" : etatH(whm), humeur: grand > 0.5 ? "sourire" : humeur, regard: [grand * (1 - k5) + k5 * Math.sin(t * 1.4), 0], op: doux(t, T[0] - 0.4, 0.5) });
      eau({ x: D.lerp(gx, XG, grand), y: D.lerp(gy + bob, 450, grand), s: D.lerp(0.5, 2.1, grand), t: t, tiede: D.lerp(tiede(wem), 0.5, grand), humeur: "sourire", regard: [-1, 0], op: doux(t, T[0] - 0.4, 0.5) });
      eau2({ x: 190, y: 450, s: 2.1, t: t, tiede: 0.5, humeur: "sourire", regard: [1, 0], op: doux(t, T[5] + 0.2, 0.5) });
      op(gPl, doux(t, T[5] + 0.3, 0.5));
      montrer(pa, t);
      return { temp: tempH(whm), etat: etatH(whm), humeur: humeur };
    };
  };
})();
