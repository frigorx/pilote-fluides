/* =====================================================================
   voyage-eau-glacee-scenes-a.js — « L'ennemi juré », tome 1 : lot A, le
   voyage, la frontière, la rencontre
   ---------------------------------------------------------------------
   RÔLE : les trois premières scènes du récit donnees/voyage-eau-glacee.js
   (intro, frontiere, rencontre). Même contrat que moteur/voyage-scenes-a.js :
   VOYAGE_SCENES[id](g, c) → maj(t), maj rendant { temp, etat, humeur,
   carte?, diag?, diag0? }. Fonction PURE de t : pas d'animation CSS, pas de
   SMIL, hasard par D.alea. Les gestes sont accrochés au RANG des phrases :
   ajouter une phrase au récit décale tout. Brief : voyage-eau-glacee/BRIEF-SCENES.md.
   Ce fichier ne définit que ces trois scènes (voyageEau, pourquoiEau,
   tourGroupe : -b.js ; sentinelle, gel, armes, resume : -c.js).
   ÉCRAN PARTAGÉ : la scène tient dans x 20 → 965, y 150 → 760 (en-tête
   x < 760 et y < 140 ; carte « où je suis » et diagramme à droite). Les
   pastilles du bas sont posées à y = 740.
   Scène avec organe (`pres: 2` : frontiere) : le théâtre montre la carte
   d'identité pendant les phrases 0 et 1, la coupe s'anime à partir de la 2.
   AIDES LOCALES (même dessin que le fichier -c.js, d'après le brief) :
   · plaquesCoupe() — l'évaporateur à plaques en coupe : un bloc d'inox
     (cadre gris clair, deux plaques de bout épaisses), 8 plaques fines
     verticales embouties (zigzag), brasées (liseré cuivre en haut et en bas
     de chaque plaque), 7 canaux alternés (pairs : EAU, nappe turquoise qui
     descend ; impairs : FLUIDE, nappe froide en bas, bulles qui montent,
     de plus en plus de vapeur vers le haut). Quatre raccords : fluide
     entrée en bas à gauche, sortie en haut à droite ; eau entrée en haut à
     gauche, sortie en bas à droite. Mouvement : décalage (t × vitesse) mod pas.
   · grosPlan() — la frontière de près : UNE plaque emboutie au milieu, à
     gauche le canal du fluide (il monte), à droite celui de l'eau (elle
     descend) ; étiquettes en haut, hors des canaux.
   · thermo() — thermomètre sans chiffre.
   LA CARTE DU CIRCUIT de l'intro est posée en (66, 158, 860) : elle tient
   dans x 20 → 965 et au-dessus des pastilles ; ses noms (28 × 0,86) sont de
   la taille du dessin commun (voyage-eau-glacee-dessin.js).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const SANS = "Calibri, Arial, sans-serif", TITRE = "Trebuchet MS, Arial, sans-serif";
  const NUIT = "#10233c", GRIS = "#637285", ROUGE = "#c0392b", BLEU = "#2f6fb8", CLAIR = "#f4f8fc", ACIER = "#56636f", BRASURE = "#c57a45";
  let nid = 0;
  const ident = p => "vegA-" + p + "-" + (++nid);
  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const fen = (e, t, a, b, du) => op(e, D.fenetre(t, a, b, du === undefined ? 0.4 : du));
  const doux = (t, t0, du) => D.lisse((t - t0) / (du || 0.5)); // 0 → 1 à partir de t0
  const f1 = v => v.toFixed(1);
  const pts = l => l.map(q => f1(q[0]) + "," + f1(q[1])).join(" ");
  const ap = (e, a) => { for (const k in a) e.setAttribute(k, typeof a[k] === "number" ? +a[k].toFixed(1) : a[k]); };
  const rect = (p, x, y, w, h, at) => D.el("rect", Object.assign({ x: x, y: y, width: w, height: h }, at || {}), p);
  const plan = (maj, g) => { if (maj.g.parentNode !== g) g.appendChild(maj.g); }; // un personnage change de plan (sous / sur le liquide)
  /* pastilles du bas : [texte, couleur, début (s), fin (s)] ; fenêtre de 0,35 s */
  const pas = (parent, liste) => liste.map(([s, coul, a, b]) => ({ g: D.pastille(parent, 492, 740, s, coul, 30, "middle"), a: a, b: b }));
  const montrer = (liste, t) => liste.forEach(p => fen(p.g, t, p.a, p.b, 0.35));

  /* étiquette (une ou plusieurs lignes) et son trait pointillé (+ un point au bout si o.bout) : rend le groupe (opacité à régler) */
  function etiq(parent, x, y, texte, o) {
    o = o || {};
    const g = D.el("g", { opacity: 0 }, parent);
    (Array.isArray(texte) ? texte : [texte]).forEach((l, i) => D.etiquette(g, x, y + i * (o.pas || 36), l, { "text-anchor": o.ancre || "start", "font-size": o.taille || 32, "font-weight": o.gras ? 700 : 600, fill: o.coul || NUIT }));
    if (o.fond) {                                           // un fond blanc : le texte ne croise ni les rides ni les bulles
      const lignes = Array.from(g.querySelectorAll("text")), w = Math.max.apply(null, lignes.map(t => t.getComputedTextLength() || 160));
      const x0 = (o.ancre === "middle" ? x - w / 2 : o.ancre === "end" ? x - w : x) - 12;
      g.insertBefore(D.el("rect", { x: x0, y: y - 32, width: w + 24, height: (lignes.length - 1) * (o.pas || 36) + 46, rx: 14, fill: "#fff", opacity: 0.9 }), g.firstChild);
    }
    if (o.trait) {
      D.trait(g, o.trait[0], o.trait[1], o.trait[2], o.trait[3], o.coulTrait);
      if (o.bout) D.el("circle", { cx: o.trait[2], cy: o.trait[3], r: 6, fill: o.coulTrait || GRIS, stroke: "#fff", "stroke-width": 2 }, g);
    }
    return g;
  }
  /* flèche pleine : la pointe est en (x2, y2) */
  function fleche(parent, x1, y1, x2, y2, coul, ep) {
    ep = ep || 8;
    const g = D.el("g", {}, parent), a = Math.atan2(y2 - y1, x2 - x1), L = ep * 2.6, l = ep * 1.5, bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
    D.el("line", { x1: x1, y1: y1, x2: bx, y2: by, stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, g);
    D.el("polygon", { points: pts([[x2, y2], [bx - l * Math.sin(a), by + l * Math.cos(a)], [bx + l * Math.sin(a), by - l * Math.cos(a)]]), fill: coul }, g);
    return g;
  }
  /* grande flèche pleine horizontale, pointe à droite en (x + l, y) */
  function grosse(parent, x, y, l, h, coul) {
    return D.el("polygon", { points: pts([[x, y - h * 0.18], [x + l - h * 0.62, y - h * 0.18], [x + l - h * 0.62, y - h * 0.5], [x + l, y], [x + l - h * 0.62, y + h * 0.5], [x + l - h * 0.62, y + h * 0.18], [x, y + h * 0.18]]),
      fill: coul, stroke: "#8f2f10", "stroke-width": 3, "stroke-linejoin": "round" }, parent);
  }
  /* point (x, y, angle) à la fraction u (0..1) d'une ligne brisée */
  function suivre(l, u) {
    const L = [0];
    for (let i = 1; i < l.length; i++) L.push(L[i - 1] + Math.hypot(l[i][0] - l[i - 1][0], l[i][1] - l[i - 1][1]));
    const d = D.borne(u, 0, 1) * L[L.length - 1];
    let i = 1;
    while (i < l.length - 1 && d > L[i]) i++;
    const f = (d - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
    return [D.lerp(l[i - 1][0], l[i][0], f), D.lerp(l[i - 1][1], l[i][1], f), Math.atan2(l[i][1] - l[i - 1][1], l[i][0] - l[i - 1][0])];
  }
  /* flèche de chaleur à l'échelle k (comme D.chaleur : pointe vers le bas à angle 0) */
  function chaleurK(parent, k) {
    const p = D.el("path", { d: "M 0 -32 V -4 M -9 -14 L 0 -2 L 9 -14", fill: "none", stroke: "#e2662c", "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, parent);
    return function (x, y, ang, o) {
      p.setAttribute("transform", "translate(" + f1(x) + " " + f1(y) + ") rotate(" + ang + ") scale(" + k + ")");
      p.setAttribute("opacity", D.borne(o, 0, 1).toFixed(2));
    };
  }
  /* petite molécule de vapeur à l'échelle k : f(x, y du CENTRE, temp, opacité) */
  function molK(parent, k) {
    const u = D.el("use", { href: "#vm-mol" }, parent);
    return function (x, y, temp, o) {
      u.setAttribute("transform", "translate(" + f1(x) + " " + f1(y) + ") scale(" + k + ")");
      u.setAttribute("fill", D.couleur(temp, true)); u.setAttribute("opacity", D.borne(o, 0, 1).toFixed(2));
    };
  }
  /* petit chevron blanc pour les tuyaux : pointe vers le bas à angle 0 */
  const chevPetit = p => D.el("path", { d: "M -6 -4 L 0 4 L 6 -4", fill: "none", stroke: "#fff", "stroke-width": 3.4, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, p);
  /* thermomètre sans chiffre : verre, boule, colonne ; rend maj(niveau 0..1, couleur) — x : axe, yh/yb : haut et bas du tube */
  function thermo(parent, x, yh, yb, rBoule) {
    const g = D.el("g", {}, parent), cid = ident("th");
    rect(D.el("clipPath", { id: cid }, g), x - 14, yh, 28, yb - yh + 4);
    D.el("circle", { cx: x, cy: yb + rBoule - 6, r: rBoule + 7, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, g);
    rect(g, x - 17, yh - 4, 34, yb - yh + 12, { rx: 17, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 });
    const boule = D.el("circle", { cx: x, cy: yb + rBoule - 6, r: rBoule }, g);
    const col = rect(D.el("g", { "clip-path": "url(#" + cid + ")" }, g), x - 9, yh, 18, yb - yh + 12);
    for (let k = 1; k < 8; k++) D.el("line", { x1: x + 17, y1: yh + k * (yb - yh) / 8, x2: x + 31, y2: yh + k * (yb - yh) / 8, stroke: GRIS, "stroke-width": 3, "stroke-linecap": "round" }, g);
    const maj = function (niveau, coul) {
      const h = (yb - yh) * D.borne(niveau, 0, 1);
      col.setAttribute("y", f1(yb + 6 - h)); col.setAttribute("height", f1(h + 6)); col.setAttribute("fill", coul); boule.setAttribute("fill", coul);
    };
    maj.g = g; maj.y = niveau => yb - (yb - yh) * niveau; // y du sommet de la colonne
    return maj;
  }

  /* =====================================================================
     L'ÉVAPORATEUR À PLAQUES EN COUPE (aide locale ; même dessin dans -c.js)
     o : { x, y, w, h, stub } — bloc d'inox (x, y, w, h), raccords de longueur `stub` au-dehors.
     Rend { g, N, NC, pitch, ports, px(i, y), canalX(c, y), yA, yB, y: { c0, c1, Pf, Qo, Qi, Po }, x: { a, b, x0, x1 }, maj(t, p) }.
       px(i, y) : abscisse de la plaque i (0 → 7) à la hauteur y ; canalX(c, y) : milieu du canal c (0 → 6 ; pairs : eau, impairs : fluide).
     maj(t, p) : p.ph (secondes d'écoulement : 0 = tout est figé), p.fill 0..1 (les canaux se remplissent un à un, de gauche à droite :
       l'eau par le haut, le fluide par le bas), p.lv (niveau de la nappe du fluide), p.vap 0..1 (part de la vapeur visible),
       p.halo (nombre, ou tableau de 8 : plaques surlignées), p.braz 0..1 (les brasures surlignées), p.chev 0..1 (flèches de sens dans les raccords).
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
    D.el("rect", { x: x0, y: y0, width: W, height: H, rx: 8, fill: "#d3dae2", stroke: ACIER, "stroke-width": 3 }, g);
    [x0, x1 - EW].forEach(x => D.el("rect", { x: x, y: y0, width: EW, height: H, rx: 6, fill: "url(#vm-acier-h)", stroke: "#39424c", "stroke-width": 2.5 }, g));
    /* 2 · les collecteurs du fluide (sous les manchons de l'eau) */
    const bande = (y, coul) => rect(g, xa - MARG, y, xb - xa + 2 * MARG, SH, { fill: coul, opacity: 0 });
    const bQo = bande(yQo - SH / 2, cV), bQi = bande(yQi - SH / 2, cL);
    /* 3 · les canaux : le fond, puis le contenu, découvert par un rideau (l'eau tombe, le fluide monte) */
    const idP = ident("gp"), lgP = D.el("linearGradient", { id: idP, x1: 0, y1: yc0, x2: 0, y2: yc1, gradientUnits: "userSpaceOnUse" }, defs);
    D.el("stop", { offset: 0, "stop-color": D.EAU_TIEDE }, lgP); D.el("stop", { offset: 1, "stop-color": D.EAU }, lgP);
    const canaux = D.el("g", {}, g), CN = [];
    for (let c = 0; c < NC; c++) {
      const P = c % 2 === 0, yt = P ? yPf : yQo, yb = P ? yPo : yQi;
      const poly = bord(c, yt, yb).concat(bord(c + 1, yt, yb).reverse());
      const cid = ident("cl"), rid = ident("rv");
      D.el("polygon", { points: pts(poly) }, D.el("clipPath", { id: cid }, defs));
      const cg = D.el("g", { "clip-path": "url(#" + cid + ")" }, canaux), fy = P ? yt : yc0, fh = (P ? yb : yc1) - fy;
      rect(cg, xa - MARG, fy, xb - xa + 2 * MARG, fh, { fill: CLAIR });
      const rv = rect(D.el("clipPath", { id: rid }, defs), xa - MARG, yt, xb - xa + 2 * MARG, 0);
      const ig = D.el("g", { "clip-path": "url(#" + rid + ")" }, cg), n = { c: c, P: P, yt: yt, yb: yb, rv: rv };
      if (P) {
        n.liq = rect(ig, xa - MARG, yt, xb - xa + 2 * MARG, yb - yt, { fill: "url(#" + idP + ")", opacity: 0.72 });
        n.rip = [0, 1, 2, 3, 4, 5, 6].map(() => D.el("path", { fill: "none", stroke: "#fff", "stroke-width": 3, "stroke-linecap": "round", opacity: 0 }, ig));
      } else {
        n.nap = D.el("path", { fill: cL, opacity: 0.85 }, ig);
        n.surf = D.el("path", { fill: "none", stroke: "#fff", "stroke-width": 2.5, "stroke-linecap": "round", opacity: 0.8 }, ig);
        const R = D.alea(11 + c * 7);
        n.bul = [0, 1, 2, 3, 4, 5, 6, 7].map(() => ({ u0: R() * 0.85, rel: R() * 2 - 1, ph: R() * 3, per: 2.2 + R() * 1.6,
          e: D.el("circle", { fill: "#fff", "fill-opacity": 0.4, stroke: "#fff", "stroke-width": 2.2, opacity: 0 }, ig) }));
        n.vap = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => ({ ph: i / 9 + R() * 0.1, rel: R() * 2 - 1, thr: Math.pow(i / 9, 0.85) * 0.9, m: molK(ig, 0.75) }));
      }
      CN.push(n);
    }
    /* 4 · les collecteurs de l'eau (au-dessus des canaux) */
    const sPf = bande(yPf - SH / 2, D.EAU_TIEDE), sPo = bande(yPo - SH / 2, D.EAU);
    /* 5 · les plaques : halo (surlignage), trait d'inox, reflet ; puis les brasures de cuivre, en haut et en bas de chaque plaque */
    const HL = [], gp = D.el("g", {}, g);
    for (let i = 0; i < N; i++) HL.push(D.el("polyline", { points: pts(bord(i, yA, yB)), fill: "none", stroke: "#ff8a4c", "stroke-width": 16, "stroke-linejoin": "round", opacity: 0 }, gp));
    for (let i = 0; i < N; i++) {
      const l = pts(bord(i, yA, yB));
      D.el("polyline", { points: l, fill: "none", stroke: ACIER, "stroke-width": 4.2, "stroke-linejoin": "round" }, gp);
      D.el("polyline", { points: l, fill: "none", stroke: "#eef2f6", "stroke-width": 1.4, "stroke-linejoin": "round" }, gp);
    }
    const FIL = [], braz = D.el("g", { opacity: 0 }, g);
    for (let i = 0; i < N; i++) [yA + 3, yB - 3].forEach(y => {
      rect(gp, px(i, y) - 8, y - 5, 16, 10, { rx: 4, fill: BRASURE, stroke: "#8a4a24", "stroke-width": 1.6 });
      D.el("circle", { cx: px(i, y), cy: y, r: 13, fill: "none", stroke: "#ff8a4c", "stroke-width": 4 }, braz);
      FIL.push([px(i, y), y]);
    });
    /* 6 · les quatre raccords : tubes dont la paroi est de cuivre (fluide) ou turquoise foncé (eau) */
    const ws = pitch - 6, cx = c => xa + (c + 0.5) * pitch;
    const STUB = [["eauIn", cx(0), y0 - LS, yPf, D.EAU_TIEDE, D.CUIVRE_EAU, 0, 1], ["fluOut", cx(5), y0 - LS, yQo, cV, "url(#vm-cuivre-h)", 180, -1],
      ["fluIn", cx(1), y1 + LS, yQi, cL, "url(#vm-cuivre-h)", 180, 1], ["eauOut", cx(6), y1 + LS, yPo, D.EAU, D.CUIVRE_EAU, 0, -1]]; // [nom, x, bout libre, bout dans le collecteur, couleur, paroi, angle du chevron (0 : vers le bas), sens (1 : vers le bloc)]
    const ports = {}, chevs = [];
    STUB.forEach(([nom, x, ya, yb, coul, paroi, ang, sens]) => {
      const yh = Math.min(ya, yb), hh = Math.abs(yb - ya);
      rect(g, x - ws / 2, yh, ws, hh, { fill: paroi, rx: 3 });
      rect(g, x - ws / 2 + 7, yh, ws - 14, hh, { fill: coul });
      ports[nom] = [x, ya];
      for (let k = 0; k < 2; k++) chevs.push({ x: x, ya: ya, yb: yb, k: k, ang: ang, sens: sens, e: chevPetit(g) });
    });
    const canalX = (c, y) => (px(c, y) + px(c + 1, y)) / 2;
    return {
      g: g, N: N, NC: NC, pitch: pitch, ports: ports, px: px, canalX: canalX, yA: yA, yB: yB, filets: FIL,
      y: { c0: yc0, c1: yc1, Pf: yPf, Qo: yQo, Qi: yQi, Po: yPo, SH: SH }, x: { a: xa, b: xb, x0: x0, x1: x1 },
      maj: function (t, p) {
        p = p || {};
        const ph = p.ph || 0, fill = p.fill === undefined ? 1 : p.fill, lv = p.lv === undefined ? 0.42 : p.lv, vap = p.vap === undefined ? 1 : p.vap;
        const bandes = D.lisse(fill * 4);
        [bQo, bQi, sPf, sPo].forEach(e => op(e, bandes));
        HL.forEach((e, i) => op(e, (Array.isArray(p.halo) ? p.halo[i] : p.halo) || 0));
        op(braz, p.braz || 0);
        CN.forEach(n => {
          const r = D.lisse(D.borne((fill * 1.17 - n.c * 0.12) / 0.45, 0, 1)), Lc = n.yb - n.yt;
          n.rv.setAttribute("y", f1(n.P ? n.yt : n.yb - Lc * r - 2)); n.rv.setAttribute("height", f1(Lc * r + 2));
          if (r <= 0) return;
          if (n.P) {                                            // l'eau : des rides qui défilent vers le bas
            n.rip.forEach((e, k) => {
              const u = D.frac(k / 7 + ph * 0.14), y = n.yt + u * Lc, a = px(n.c, y) + 3, b = px(n.c + 1, y) - 3;
              e.setAttribute("d", "M " + f1(a) + " " + f1(y) + " Q " + f1((a + b) / 2) + " " + f1(y + 8) + " " + f1(b) + " " + f1(y));
              op(e, 0.7 * D.fenetre(u, 0, 1, 0.06));
            });
          } else {                                              // le fluide : la nappe en bas, des bulles qui montent, de plus en plus de vapeur
            const ysf = yc1 - lv * (yc1 - yc0), a = px(n.c, ysf) - 8, b = px(n.c + 1, ysf) + 8, surf = [];
            for (let k = 0; k <= 6; k++) { const x = a + (b - a) * k / 6; surf.push([x, ysf + 2.6 * Math.sin(x / 11 - ph * 3.2 + n.c) + 1.6 * Math.sin(x / 5 + ph * 2.1)]); }
            n.nap.setAttribute("d", "M " + f1(a - 10) + " " + f1(yQi + 4) + " L " + pts(surf).replace(/ /g, " L ") + " L " + f1(b + 10) + " " + f1(yQi + 4) + " Z");
            n.surf.setAttribute("d", "M " + pts(surf).replace(/ /g, " L "));
            n.bul.forEach(bb => {
              const f = D.frac(ph / bb.per + bb.ph), yst = D.lerp(yQi - 6, ysf + 14, bb.u0), y = D.lerp(yst, ysf + 4, f), up = D.borne((yQi - y) / Math.max(1, yQi - ysf), 0, 1);
              const rr = D.lerp(2.6, 8.4, up), xl = px(n.c, y) + 2, xr = px(n.c + 1, y) - 2, x = (xl + xr) / 2 + bb.rel * ((xr - xl) / 2 - rr - 2);
              ap(bb.e, { cx: x, cy: y, r: rr }); op(bb.e, D.fenetre(f, 0, 1, 0.12));
            });
            n.vap.forEach(v => {                                // une molécule n'apparaît qu'au-dessus de son seuil : plus de vapeur en haut
              const f = D.frac(ph * 0.25 + v.ph), y = D.lerp(ysf - 6, yc0 - 4, f), xl = px(n.c, y) + 2, xr = px(n.c + 1, y) - 2;
              v.m((xl + xr) / 2 + v.rel * ((xr - xl) / 2 - 11), y, 0.12, (v.thr < vap ? 1 : 0) * D.lisse((f - v.thr) / 0.15) * D.fenetre(f, 0, 1, 0.2) * D.borne((ysf - yc0) / 24, 0, 1));
            });
          }
        });
        chevs.forEach(q => {                                    // des chevrons de sens dans les raccords
          const f = D.frac(ph * 0.5 + q.k / 2), y = q.sens > 0 ? D.lerp(q.ya, q.yb, f) : D.lerp(q.yb, q.ya, f);
          q.e.setAttribute("transform", "translate(" + f1(q.x) + " " + f1(y) + ") rotate(" + q.ang + ")");
          op(q.e, (p.chev === undefined ? 0 : p.chev) * 0.9 * D.fenetre(f, 0, 1, 0.2));
        });
      }
    };
  }

  /* =====================================================================
     LA FRONTIÈRE DE PRÈS (aide locale ; même dessin dans -c.js)
     o : { x, y, w, h, etiqG, etiqD, niv } — la vue (x, y, w, h) : UNE plaque emboutie au milieu (zigzag), entre deux parois droites
     (les plaques de bout) ; à gauche le canal du fluide (nappe + bulles qui montent + vapeur), à droite celui de l'eau (turquoise,
     rides qui descendent). Étiquettes (« fluide frigorigène » et « eau » par défaut) au-dessus des canaux. Les bords haut et bas
     s'estompent : on regarde un morceau de canal.
     Rend { g, fond (sous la nappe : la molécule qui flotte), dessus (sur tout : la goutte, la molécule hors du liquide), xg, xd (axes des
            canaux), y0, y1, plaque(y), surface(t) (y de la nappe), maj(t, p) }.
     maj(t, p) : p.ph (secondes d'écoulement), p.flu / p.eau 0..1 (canaux visibles), p.niv (niveau de la nappe), p.bul 0..1 (bulles),
       p.vap 0..1 (vapeur), p.halo 0..1 (la plaque du milieu surlignée), p.etiq 0..1 (étiquettes).
     ===================================================================== */
  function grosPlan(parent, o) {
    const x0 = o.x, y0 = o.y, W = o.w, H = o.h, y1 = y0 + H, k = D.borne(W / 780, 0.3, 1.3);
    const TH = 11 * k + 4, AMP = 20 * k + 4, WALL = 20 * k + 6, nz = 8, Lz = H / nz, ONDE = [0, 1, 0, -1];
    const xL = x0 + WALL, xm = x0 + W / 2, xR = x0 + W - WALL;
    const xg = (xL + xm - AMP - TH / 2) / 2, xd = (xm + AMP + TH / 2 + xR) / 2;      // axes des canaux : au milieu de la place que le zigzag leur laisse
    const tri = y => { const u = D.borne((y - y0) / Lz, 0, nz - 1e-6), j = Math.floor(u); return D.lerp(ONDE[j % 4], ONDE[(j + 1) % 4], u - j); };
    const px = y => xm + AMP * tri(y);                                               // la plaque emboutie : un zigzag autour de l'axe
    const ys = []; for (let j = 0; j <= nz; j++) ys.push(y0 + j * Lz);
    const polG = [[xL, y0]].concat(ys.map(y => [px(y) - TH / 2, y])).concat([[xL, y1]]);
    const polD = ys.map(y => [px(y) + TH / 2, y]).concat([[xR, y1], [xR, y0]]);
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
    D.el("polygon", { points: pts(polG) }, D.el("clipPath", { id: cidG }, defs)); D.el("polygon", { points: pts(polD) }, D.el("clipPath", { id: cidD }, defs));
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
    for (let i = 0; i < 12; i++) VAP.push({ ph: R(), rel: R() * 2 - 1, thr: i / 12 * 0.92, v: 0.04 + R() * 0.03, m: molK(gFlu, 0.95 * k + 0.4) });
    rect(gEau, xm - AMP - 4, y0, xR - xm + AMP + 8, H, { fill: "url(#" + gl + ")", opacity: 0.66 });
    const RIP = []; for (let i = 0; i < 9; i++) RIP.push({ s: i / 9, rel: R() * 2 - 1, e: D.el("path", { fill: "none", stroke: "#fff", "stroke-width": 2.4 * k + 1.4, "stroke-linecap": "round", opacity: 0 }, gEau) });
    /* la plaque : halo (surlignage), trait d'inox, reflet ; et les deux parois droites */
    const lp = pts(ys.map(y => [px(y), y]));
    const halo = D.el("polyline", { points: lp, fill: "none", stroke: "#ff8a4c", "stroke-width": 26 * k + 12, "stroke-linejoin": "round", opacity: 0 }, vue);
    D.el("polyline", { points: lp, fill: "none", stroke: ACIER, "stroke-width": TH, "stroke-linejoin": "round" }, vue);
    D.el("polyline", { points: lp, fill: "none", stroke: "#eef2f6", "stroke-width": TH * 0.34, "stroke-linejoin": "round" }, vue);
    [x0, xR].forEach(x => D.el("rect", { x: x, y: y0, width: WALL, height: H, fill: "url(#vm-acier-h)", stroke: "#39424c", "stroke-width": 2.5 * k + 1 }, vue));
    const dessus = D.el("g", {}, g);
    /* les étiquettes, au-dessus des canaux */
    const lab = D.el("g", { opacity: 0 }, g), tl = Math.max(28, Math.round(32 * Math.min(1, k * 1.4)));
    D.etiquette(lab, xg, y0 - 14, o.etiqG || "fluide frigorigène", { "text-anchor": "middle", "font-size": tl, "font-weight": 700, fill: BLEU });
    D.etiquette(lab, xd, y0 - 14, o.etiqD || "eau", { "text-anchor": "middle", "font-size": tl, "font-weight": 700, fill: D.CUIVRE_EAU });
    return {
      g: g, fond: fond, dessus: dessus, xg: xg, xd: xd, y0: y0, y1: y1, k: k, plaque: px, surface: t => liq.surface(xg, t),
      maj: function (t, p) {
        p = p || {};
        const ph = p.ph || 0, bul = p.bul === undefined ? 0.5 : p.bul, vap = p.vap === undefined ? 0.5 : p.vap;
        niv = p.niv === undefined ? niv0 : p.niv;
        op(gFlu, p.flu === undefined ? 1 : p.flu); op(gEau, p.eau === undefined ? 1 : p.eau); op(halo, p.halo || 0); op(lab, p.etiq === undefined ? 1 : p.etiq);
        liq.maj(t);
        BUL.forEach(b => {                                      // des bulles montent de la nappe vers sa surface
          const f = D.frac(ph / b.per + b.ph), x = xg + b.rel * lb, ys0 = liq.surface(x, t), y = D.lerp(y1 - 14, ys0 + 6, f), rr = (2.6 + 6.8 * f) * (1.1 * k + 0.45);
          ap(b.e, { cx: x + Math.sin(ph * 2.3 + b.s * 9) * 4 * k, cy: y, r: rr }); op(b.e, (b.q < bul ? 1 : 0) * D.fenetre(f, 0, 1, 0.12));
        });
        VAP.forEach(m => {                                      // la vapeur monte, de plus en plus nombreuse vers le haut
          const f = D.frac(ph * m.v + m.ph), ys0 = liq.surface(xg, t), y = D.lerp(ys0 - 12, y0 + 14, f);
          m.m(xg + m.rel * lb + Math.sin(ph * 1.7 + m.ph * 9) * 6 * k, y, 0.12, (m.thr < vap ? 1 : 0) * D.lisse((f - m.thr * 0.8) / 0.15) * D.fenetre(f, 0, 1, 0.18) * D.borne((y1 - ys0) / 30 + 0.3, 0, 1));
        });
        RIP.forEach(r => {                                      // l'eau : des rides qui défilent vers le bas
          const f = D.frac(r.s + ph * 0.12), y = D.lerp(y0 + 8, y1 - 8, f), a = xd + r.rel * lb * 0.8 - 26 * k - 8, b = a + 52 * k + 16;
          r.e.setAttribute("d", "M " + f1(a) + " " + f1(y) + " Q " + f1((a + b) / 2) + " " + f1(y + 9 * k + 3) + " " + f1(b) + " " + f1(y)); op(r.e, 0.75 * D.fenetre(f, 0, 1, 0.08));
        });
      }
    };
  }

  /* =====================================================================
     0 · L'INTRO — titre, héroïne, l'immeuble et le groupe sur le toit, la
     chaleur prise puis rejetée, la boucle d'eau, la goutte (l'ennemie),
     la carte des deux circuits, le diagramme à droite, puis la frontière
     ===================================================================== */
  /* états de la molécule le long de la carte (position w 0 → 14 sur D.CIRCUIT_PTS) */
  const tempW = w => D.courbe([[0, 0.08], [2.2, 0.08], [3, 0.12], [5.15, 0.15], [6.85, 0.62], [7.7, 0.5], [8.7, 0.5], [9.5, 0.45], [11, 0.45], [11.4, 0.08], [14, 0.08]], w, true);
  const etatW = w => w < 2.4 ? "bout" : w < 7.9 ? "vapeur" : w < 8.6 ? "bout" : w < 11.8 ? "liquide" : "bout";
  const humeurW = w => w < 2.4 ? "froid" : w < 5.1 ? "sourire" : w < 7.7 ? "chaud" : w < 10.7 ? "sourire" : w < 11.5 ? "surprise" : "froid";
  /* la goutte le long de la boucle d'eau (position 0 → 13 pour 200 → 213) : tiède au retour, glacée au départ, tiède de nouveau au ventilo-convecteur */
  const tiedeW = w => D.courbe([[0, 1], [1, 1], [2, 0.1], [3, 0], [6.2, 0], [6.9, 1], [13, 1]], w, true);
  const humeurE = w => w > 2.4 && w < 6.1 ? "froid" : w >= 6.1 && w < 6.9 ? "chaud" : "sourire";
  /* le cycle du diagramme (0 sortie condenseur … 7 = 0, 8 = 1) → la position de la molécule sur la carte (non repliée : 11 = le détendeur, 14 = 0) */
  const DW = [[0, 11], [1, 14], [2, 16.2], [3, 17], [4, 20.7], [5, 21.7], [6, 22.7], [7, 25], [8, 28]];

  S.intro = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const titre = D.el("g", {}, g), ville = D.el("g", { opacity: 0 }, g);
    const [s1, s2] = c.recit.sousTitre.split(/ (?=raconté)/);
    D.texte(titre, 492, 330, c.recit.titre, { "text-anchor": "middle", "font-size": 58, "font-weight": 700, fill: D.BLEU, "font-family": TITRE });
    D.texte(titre, 492, 388, s1, { "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: D.ORANGE, "font-family": SANS });
    if (s2) D.texte(titre, 492, 432, s2, { "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: D.ORANGE, "font-family": SANS });

    /* k1 : l'immeuble de bureaux (façade, fenêtres en rangées, toit plat, gaine technique) */
    const BX = 252, BY = 392, BW = 480, BH = 308;
    D.el("line", { x1: 200, y1: 703, x2: 784, y2: 703, stroke: "#c9c2b4", "stroke-width": 4, "stroke-linecap": "round" }, ville);
    rect(ville, BX, BY, BW, BH, { fill: "#e9e2d6", stroke: D.BLEU, "stroke-width": 4 });
    rect(ville, BX - 8, BY - 10, BW + 16, 12, { rx: 3, fill: "#c9c2b4", stroke: D.BLEU, "stroke-width": 3 });
    rect(ville, 458, 404, 68, 288, { rx: 4, fill: "#d9d1c1", stroke: "rgba(27,58,99,.3)", "stroke-width": 2 });        // la gaine des tuyaux
    [416, 502, 588].forEach(y => [280, 362, 556, 638].forEach(x => {
      rect(ville, x, y, 66, 58, { rx: 3, fill: "#cfe3f5", stroke: D.BLEU, "stroke-width": 2.5 });
      D.el("line", { x1: x + 33, y1: y, x2: x + 33, y2: y + 58, stroke: D.BLEU, "stroke-width": 1.8 }, ville);
    }));
    /* le groupe d'eau glacée : caisson, persiennes, deux ventilateurs sur le dessus */
    const groupe = D.el("g", { opacity: 0 }, ville);
    D.el("polygon", { points: "372,294 398,266 638,266 612,294", fill: "#c7cfd7", stroke: D.BLEU, "stroke-width": 3.5, "stroke-linejoin": "round" }, groupe);
    D.el("polygon", { points: "612,294 638,266 638,358 612,384", fill: "#bcc4cc", stroke: D.BLEU, "stroke-width": 3.5, "stroke-linejoin": "round" }, groupe);
    rect(groupe, 372, 294, 240, 90, { fill: "#d9dee4", stroke: D.BLEU, "stroke-width": 4 });
    for (let i = 0; i < 11; i++) D.el("line", { x1: 392 + i * 20, y1: 306, x2: 392 + i * 20, y2: 372, stroke: "#aab6c3", "stroke-width": 3, "stroke-linecap": "round" }, groupe);
    const FANS = [450, 566].map(x => D.ventilateur(D.el("g", { transform: "translate(" + x + " 280) scale(1 0.3)" }, groupe), 0, 0, 40));
    /* k3 : la boucle d'eau dans la gaine : le départ (glacé) descend, le retour (tiède) remonte */
    const PD = [[474, 384], [474, 668], [492, 668]], PR = [[492, 668], [510, 668], [510, 384]];
    const mur = [PD, PR].map(l => D.el("polyline", { points: pts(l), fill: "none", stroke: D.CUIVRE_EAU, "stroke-width": 26, "stroke-linejoin": "round", pathLength: 100 }, ville));
    const coeur = [[PD, D.EAU], [PR, D.EAU_TIEDE]].map(([l, coul]) => D.el("polyline", { points: pts(l), fill: "none", stroke: coul, "stroke-width": 16, "stroke-linejoin": "round", pathLength: 100 }, ville));
    const chevD = [0, 1, 2, 3].map(() => chevPetit(ville)), chevR = [0, 1, 2, 3].map(() => chevPetit(ville));
    /* k2 : la chaleur prise à l'immeuble (elle monte vers le groupe), puis rejetée dehors (au-dessus des ventilateurs) */
    const chaud = D.el("g", {}, ville), PRIS = [], REJ = [];
    [378, 572].forEach((x, j) => [0, 1, 2].forEach(i => PRIS.push({ x: x, f: i / 3 + j * 0.17, maj: chaleurK(chaud, 1.15) })));
    [450, 566].forEach((x, j) => [0, 1].forEach(i => REJ.push({ x: x, f: i / 2 + j * 0.23, maj: chaleurK(chaud, 1.25) })));

    /* k5 : la carte des deux circuits ; k6 : la grande flèche vers le diagramme (dans le vide de la carte, sous le détendeur) */
    const cir = D.circuit(g, 66, 174, 840, true);
    op(cir.g, 0);
    const fl6 = D.el("g", { opacity: 0 }, g);
    grosse(fl6, 130, 548, 310, 84, D.ORANGE);

    /* k4 : l'étincelle rouge en zigzag entre les deux ennemies, et son étiquette */
    const etin = D.el("g", { opacity: 0 }, g);
    const zig = D.el("polyline", { fill: "none", stroke: ROUGE, "stroke-width": 11, "stroke-linejoin": "round", "stroke-linecap": "round" }, etin);
    const zig2 = D.el("polyline", { fill: "none", stroke: "#ff9a86", "stroke-width": 4, "stroke-linejoin": "round", "stroke-linecap": "round" }, etin);
    const eEnn = etiq(g, 495, 292, "l'ennemi juré", { ancre: "middle", taille: 40, gras: true, coul: ROUGE, trait: [495, 306, 495, 396], coulTrait: ROUGE });

    const dessus = D.el("g", {}, g);
    const mila = D.heroine(dessus, { r: 30 }), eau = D.goutte(dessus, { r: 30 });
    const pa = pas(g, [["fluide frigorigène", D.BLEU, T[0] + 0.2, E[0] + 0.3], ["groupe d'eau glacée · sur le toit", BLEU, T[1] + 0.2, E[1] + 0.3],
      ["prendre la chaleur · la rejeter dehors", D.ORANGE, T[2] + 0.2, E[2] + 0.3], ["l'eau descend dans les bureaux", D.CUIVRE_EAU, T[3] + 0.2, E[3] + 0.3],
      ["l'eau : l'ennemi juré du frigoriste", ROUGE, T[4] + 0.2, E[4] + 0.3], ["deux circuits · une seule frontière", D.BLEU, T[5] + 0.2, E[5] + 0.3],
      ["à droite : le diagramme", D.ORANGE, T[6] + 0.2, E[6] + 0.3], ["direction : la frontière", D.BLEU, T[7] + 0.1, c.D + 1]]);

    const t5a = T[5] + 0.9, t5b = E[5] - 0.05, tMid = (E[5] + T[6]) / 2;
    const DWf = d => D.courbe(DW, d, true);
    /* le point sur le cycle du diagramme (null avant k6) : 0 → 7 pendant k6, 7 → 8 pendant k7 */
    const dd = t => t < T[6] - 0.1 ? null : t < T[7] ? 7 * D.borne((t - (T[6] + 0.1)) / (E[6] - T[6] - 0.15), 0, 1) : 7 + D.lisse((t - (T[7] + 0.05)) / (E[7] - T[7] - 0.15));
    const wEau = t => D.courbe([[t5a + 1.0, 0], [E[5] - 0.05, 13], [E[7] - 0.1, 26]], t, true); // un tour en k5, un autre jusqu'à la fin : elle arrive en haut de l'évaporateur avec la molécule
    return function (t) {
      FANS.forEach(v => v(t * 520));
      op(titre, 1 - doux(t, T[0] - 0.9, 0.7));
      op(ville, doux(t, T[1] + 0.1, 0.8) * (1 - doux(t, T[4] - 0.25, 0.6)));
      const gm = doux(t, A(1, 0.3), 0.6); op(groupe, gm); groupe.setAttribute("transform", "translate(0 " + f1(-18 * (1 - gm)) + ")");
      /* k2 : la chaleur */
      op(chaud, D.fenetre(t, A(2, 0.25), E[2] + 0.3, 0.5));
      PRIS.forEach(q => { const f = D.frac(q.f + t * 0.3); q.maj(q.x, D.lerp(650, 414, f), 180, D.fenetre(f, 0, 1, 0.22) * D.fenetre(t, A(2, 0.3), E[2] + 0.3, 0.4)); });
      REJ.forEach(q => { const f = D.frac(q.f + t * 0.42); q.maj(q.x, D.lerp(228, 158, f), 180, D.fenetre(f, 0, 1, 0.25) * D.fenetre(t, A(2, 0.66), E[2] + 0.3, 0.4)); });
      /* k3 : les tuyaux se dessinent (le départ d'abord, puis le retour), l'eau circule */
      const rem = D.borne((t - A(3, 0.35)) / 2.8, 0, 1) * 2;
      [[mur[0], coeur[0], D.borne(rem, 0, 1)], [mur[1], coeur[1], D.borne(rem - 1, 0, 1)]].forEach(([a, b, r]) => [a, b].forEach(e => e.setAttribute("stroke-dasharray", f1(100 * r) + " 101")));
      chevD.forEach((e, i) => { const u = D.frac(t * 0.26 - i / 4), [x, y, an] = suivre(PD, u); e.setAttribute("transform", "translate(" + f1(x) + " " + f1(y) + ") rotate(" + f1(an * 180 / Math.PI - 90) + ")"); op(e, (rem > 1.97 ? 1 : 0) * D.fenetre(u, 0, 1, 0.1)); });
      chevR.forEach((e, i) => { const u = D.frac(t * 0.26 - i / 4), [x, y, an] = suivre(PR, u); e.setAttribute("transform", "translate(" + f1(x) + " " + f1(y) + ") rotate(" + f1(an * 180 / Math.PI - 90) + ")"); op(e, (rem > 1.97 ? 1 : 0) * D.fenetre(u, 0, 1, 0.1)); });
      /* k4 : l'étincelle */
      const ep = D.fenetre(t, T[4] + 1.0, T[5] + 0.0, 0.35), zp = [];
      for (let i = 0; i <= 8; i++) zp.push([D.lerp(425, 565, i / 8), 440 + (i % 2 ? 1 : -1) * (i === 0 || i === 8 ? 0 : 26) + Math.sin(t * 17 + i * 2.1) * 5]);
      zig.setAttribute("points", pts(zp)); zig2.setAttribute("points", pts(zp));
      op(etin, ep * (0.65 + 0.35 * Math.abs(Math.sin(t * 9))));
      op(eEnn, D.fenetre(t, A(4, 0.2), E[4] + 0.3, 0.4));
      /* k5-k7 : la carte */
      op(cir.g, doux(t, T[5] + 0.35, 0.5));
      cir.surligne("evaporateur", t > T[5] + 0.45);
      op(fl6, D.fenetre(t, T[6] + 0.1, E[6] + 0.3, 0.5)); fl6.setAttribute("transform", "translate(" + f1(Math.max(0, Math.sin(t * 3)) * 16) + " 0)");
      montrer(pa, t);

      /* la molécule */
      const d = dd(t), pre = D.courbe;
      const px0 = pre([[0, 492], [T[4] - 0.1, 492], [T[4] + 0.9, 320]], t), py0 = pre([[0, 560], [T[0] - 0.7, 560], [T[0] + 0.6, 440], [T[1] - 0.1, 440], [T[1] + 0.9, 337], [T[4] - 0.1, 337], [T[4] + 0.9, 440]], t);
      const ps0 = pre([[0, 1.8], [T[0] - 0.7, 1.8], [T[0] + 0.6, 2.6], [T[1] - 0.1, 2.6], [T[1] + 0.9, 1.0], [T[4] - 0.1, 1.0], [T[4] + 0.9, 2.3]], t);
      const m = doux(t, T[5] - 0.25, 0.9);                          // elles rapetissent et rejoignent leur départ AVANT que la carte n'apparaisse
      let w = t < tMid ? 14 * D.borne((t - t5a) / (t5b - t5a), 0, 1) : DWf(d === null ? 0 : d);
      const wm = ((w % 14) + 14) % 14, [cx, cy0] = cir.ecran(...D.circuitPoint(w)), cy = cy0 - 8 * D.fenetre(wm, 4.3, 5.2, 0.25); // elle passe un peu plus haut sous le nom « compresseur »
      const opM = t < tMid ? 1 - doux(t, E[5] - 0.08, 0.14) : doux(t, T[6] - 0.16, 0.14);
      let temp = 0.1, etat = "liquide", humeur = t > T[4] && t < T[5] ? "surprise" : "sourire";
      if (m > 0.5) { temp = tempW(wm); etat = etatW(wm); humeur = humeurW(wm); }
      const ecr = D.fenetre(wm, 5.15, 6.85, 0.5) * 0.7 * (t >= T[5] ? 1 : 0);
      mila({ x: D.lerp(px0, cx, m), y: D.lerp(py0 + Math.sin(t * 2.2) * 5 * (1 - m), cy, m), s: D.lerp(ps0, 0.58, m), t: t, temp: temp, etat: etat, humeur: humeur,
        regard: m > 0.5 ? [1, 0] : t > T[4] ? [1, 0] : [D.lisse((t - T[0]) / 1.4) * 0.6, 0], ecrase: ecr, op: opM });
      /* la goutte : elle apparaît face à l'héroïne (k4), puis suit la boucle d'eau */
      const gw = wEau(t), gwm = ((gw % 13) + 13) % 13, [ex, ey0] = cir.ecran(...D.circuitPoint(200 + gwm)), ey = ey0 + 16 * D.fenetre(gwm, 4.2, 6.1, 0.3); // et la goutte un peu plus bas sous « ventilo-convecteurs »
      const ge = doux(t, T[4] + 0.35, 0.8);
      eau({ x: D.lerp(670, ex, m), y: D.lerp(445 + Math.sin(t * 2.0 + 1) * 5 * (1 - m), ey, m), s: D.lerp(D.lerp(0.25, 2.3, ge), 0.56, m), t: t, tiede: m > 0.5 ? tiedeW(gwm) : 1,
        humeur: m > 0.5 ? humeurE(gwm) : "sourire", regard: m > 0.5 ? [1, 0] : [-1, 0], op: ge });
      const r = { temp: temp, etat: etat, humeur: humeur };
      if (d !== null) {                                       // le diagramme : la trace orange part de la sortie du condenseur
        r.diag = d; r.diag0 = 0;
        const ww = ((DWf(d) % 14) + 14) % 14;
        r.temp = tempW(ww); r.etat = etatW(ww); r.humeur = humeurW(ww);
      }
      return r;
    };
  };

  /* =====================================================================
     1 · LA FRONTIÈRE — l'évaporateur à plaques en coupe
     k0-k1 : la carte d'identité (théâtre) couvre la scène · k2 : les plaques
     d'inox embouties, brasées · k3 : un canal sur deux, fluide et eau ·
     k4 : en sens contraires · k5 : zoom sur la frontière (une plaque)
     ===================================================================== */
  S.frontiere = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    const X0 = 120, Y0 = 232, W = 500, H = 392;
    const PC = plaquesCoupe(g, { x: X0, y: Y0, w: W, h: H, stub: 46 });
    /* k2 : les étiquettes de la coupe (à droite du bloc), et leurs pointillés */
    const e1 = etiq(g, 656, 346, ["plaques d'inox", "embouties"], { trait: [650, 350, PC.px(7, 364) + 3, 364], coulTrait: GRIS, bout: true });
    const e2 = etiq(g, 656, 292, "brasées", { coul: "#9a4f22", gras: true, trait: [650, 284, PC.filets[14][0] + 8, PC.filets[14][1]], coulTrait: "#9a4f22", bout: true });
    /* k3 : un canal de chaque sorte */
    const e3 = etiq(g, 656, 448, "fluide frigorigène", { coul: BLEU, gras: true, trait: [650, 440, PC.canalX(5, 440), 440], coulTrait: BLEU, bout: true });
    const e4 = etiq(g, 656, 536, "eau", { coul: D.CUIVRE_EAU, gras: true, trait: [650, 528, PC.canalX(6, 528), 528], coulTrait: D.CUIVRE_EAU, bout: true });
    /* k4 : l'eau descend (à gauche du bloc), le fluide monte (à droite) */
    const sens = D.el("g", { opacity: 0 }, g);
    fleche(sens, 80, 270, 80, 596, D.EAU, 14); fleche(sens, 674, 596, 674, 270, BLEU, 14);
    D.etiquette(sens, 80, 252, "eau", { "text-anchor": "middle", "font-weight": 700, fill: D.CUIVRE_EAU });
    D.etiquette(sens, 674, 640, "fluide", { "text-anchor": "middle", "font-weight": 700, fill: BLEU });
    /* k5 : le zoom — la plaque entre les deux canaux, la molécule d'un côté, la goutte de l'autre */
    const PX = 650, PY = 262, PW = 300, PH = 392;
    const zoom = D.el("g", { opacity: 0 }, g);
    rect(zoom, PX, PY, PW, PH, { rx: 18, fill: "#fff", stroke: D.BLEU, "stroke-width": 3.5 });
    const GP = grosPlan(zoom, { x: PX + 10, y: PY + 70, w: PW - 20, h: PH - 90, etiqG: "fluide", etiqD: "eau", niv: 0.46 });
    const mila = D.heroine(GP.fond, { r: 30 }), eau = D.goutte(GP.dessus, { r: 30 });
    const lien = D.el("g", { opacity: 0 }, g), yL = 430, xL6 = PC.px(6, yL);
    D.trait(lien, xL6 + 20, yL, PX - 4, yL, D.ORANGE);
    D.el("circle", { cx: xL6, cy: yL, r: 17, fill: "none", stroke: D.ORANGE, "stroke-width": 5 }, lien);
    const eFr = etiq(g, PX + PW / 2, 242, "la frontière", { ancre: "middle", taille: 36, gras: true, coul: D.ORANGE, trait: [PX + PW / 2, 252, PX + PW / 2, PY + 94], coulTrait: D.ORANGE });
    const pa = pas(g, [["un canal sur deux", D.BLEU, T[3] + 0.3, E[3] + 0.3], ["à contre-courant", D.ORANGE, T[4] + 0.2, E[4] + 0.3], ["une plaque de métal, très mince", D.BLEU, T[5] + 0.3, DUR + 1]]);
    return function (t) {
      /* la coupe : vide en k2, elle se remplit en k3, l'écoulement commence, les raccords bougent en k4 */
      const fill = D.borne((t - (T[3] + 0.2)) / (E[3] - T[3] - 1.0), 0, 1), ph = Math.max(0, t - (T[3] + 0.4));
      const pulse = 0.75 + 0.25 * Math.sin(t * 5), k5 = doux(t, T[5] - 0.2, 0.6);
      const halo = D.fenetre(t, T[2] + 0.3, E[2] + 0.2, 0.5) * pulse;
      const hal = [0, 1, 2, 3, 4, 5, 6, 7].map(i => i === 6 ? Math.max(halo, D.fenetre(t, T[5] - 0.1, DUR, 0.5) * pulse) : halo);
      PC.maj(t, { ph: ph, fill: fill, halo: hal, braz: D.fenetre(t, A(2, 0.78), E[2] + 0.2, 0.4) * pulse, chev: D.fenetre(t, T[4] + 0.1, E[4] + 0.3, 0.4) * (fill >= 1 ? 1 : 0), vap: 0.9 });
      fen(e1, t, A(2, 0.22), E[2] + 0.25); fen(e2, t, A(2, 0.78), E[2] + 0.25);
      fen(e3, t, A(3, 0.55), E[3] + 0.25); fen(e4, t, A(3, 0.8), E[3] + 0.25);
      fen(sens, t, T[4] + 0.2, E[4] + 0.2, 0.4);
      op(zoom, k5); op(lien, k5); fen(eFr, t, A(5, 0.72), DUR, 0.4); montrer(pa, t);
      GP.maj(t, { ph: Math.max(0, t - T[5]) + 6, niv: 0.46, bul: 0.7, vap: 0.7, halo: D.fenetre(t, T[5] + 0.5, DUR, 0.5) * pulse, etiq: D.fenetre(t, T[5] + 0.2, DUR, 0.4) });
      /* les deux ennemies, de part et d'autre de la plaque, à la même hauteur */
      const yp = 494, surf = GP.surface(t), yMol = Math.max(surf - 12 + Math.sin(t * 2) * 3, yp - 24);
      plan(mila, GP.fond);
      const o5 = doux(t, T[5] + 0.1, 0.6);
      mila({ x: GP.xg, y: yMol, s: 0.95, t: t, temp: 0.08, etat: "bout", humeur: "sourire", regard: [1, 0], op: o5 });
      eau({ x: GP.xd, y: yp + 6 + Math.sin(t * 2 + 1) * 3, s: 0.95, t: t, tiede: 0.5, humeur: "sourire", regard: [-1, 0], op: o5 });
      return { temp: 0.08, etat: "bout", humeur: "sourire" };
    };
  };

  /* =====================================================================
     2 · LA RENCONTRE — tout en gros plan, de part et d'autre de la plaque
     k0 : la molécule entre en bas (liquide + bulles) · k1 : la goutte entre en haut (tiède) ·
     k2 : la chaleur passe à travers la plaque, elle bout · k3 : elle monte, l'eau descend et refroidit ·
     k4 : face à face, la plaque surlignée · k5 : deux thermomètres sans chiffre, la bande « gel »
     ===================================================================== */
  S.rencontre = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    const GX = 120, GY = 215, GW = 780, GH = 475;
    const vueG = D.el("g", {}, g);
    const GP = grosPlan(vueG, { x: GX, y: GY, w: GW, h: GH, niv: 0.3 });
    const xm = GX + GW / 2;
    const mila = D.heroine(GP.fond, { r: 30 }), eau = D.goutte(GP.dessus, { r: 30 });
    /* k2 : la chaleur traverse la plaque, de l'eau vers le fluide (flèches horizontales, vers la gauche) */
    const chal = D.el("g", {}, GP.dessus), CH = [];
    [296, 372, 448, 524, 600].forEach((y, i) => CH.push({ y: y, f: (i * 0.37) % 1, maj: chaleurK(chal, 1.55) }));
    /* étiquettes : l'eau tiède (k1), glacée (fin de k3) ; la vapeur (fin de k3) */
    const eTiede = etiq(g, GP.xd, 452, "eau tiède", { ancre: "middle", coul: NUIT, fond: true });
    const eGlace = etiq(g, GP.xd, 490, "eau glacée", { ancre: "middle", coul: NUIT, fond: true });
    const eVap = etiq(g, GP.xg, 432, "vapeur", { ancre: "middle", coul: NUIT, fond: true });
    /* k5 : deux thermomètres sans chiffre ; la bande rouge « gel » au bas de l'échelle, la colonne du fluide s'arrête juste au-dessus */
    const th = D.el("g", { opacity: 0 }, g), YH = 262, YB = 520, TXE = 330, TXF = 650;
    rect(th, 236, YB - 0.2 * (YB - YH), 508, 0.2 * (YB - YH), { rx: 6, fill: "rgba(192,57,43,.2)", stroke: ROUGE, "stroke-width": 3 });
    D.etiquette(th, 490, YB - 12, "gel", { "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: "#a93226" });
    const mE = thermo(th, TXE, YH, YB, 26), mF = thermo(th, TXF, YH, YB, 26), NE = 0.64, NF = 0.27;
    D.etiquette(th, TXE, 234, "eau", { "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: D.CUIVRE_EAU });
    D.etiquette(th, TXF, 234, "fluide", { "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: BLEU });
    const ecart = D.el("g", { opacity: 0 }, th);                   // l'écart : le fluide est plus bas que l'eau
    D.el("line", { x1: TXE + 36, y1: mE.y(NE), x2: TXF - 36, y2: mE.y(NE), stroke: GRIS, "stroke-width": 3, "stroke-dasharray": "2 7", "stroke-linecap": "round" }, ecart);
    fleche(ecart, 490, mE.y(NE) + 8, 490, mF.y(NF) - 6, BLEU, 9);
    const mol5 = D.heroine(th, { r: 30 }), eau5 = D.goutte(th, { r: 30 });
    const pa = pas(g, [["après le détendeur : liquide + bulles", D.BLEU, T[0] + 0.2, E[0] + 0.3], ["l'eau revient des bureaux", D.CUIVRE_EAU, T[1] + 0.2, E[1] + 0.3],
      ["je bous, à pression constante", BLEU, T[2] + 0.2, E[2] + 0.3], ["elle descend · je monte", D.ORANGE, T[3] + 0.2, E[3] + 0.3],
      ["jamais touchées", "#1e7e54", T[4] + 0.2, E[4] + 0.3], ["plus froid que l'eau… mais pas trop", D.ORANGE, T[5] + 0.2, DUR + 1]]);
    const MID = 440, TOPM = 300, BOTE = 600;
    return function (t) {
      const ph = t, haut = doux(t, T[5], 0.4), tr = 1 - doux(t, T[5] - 0.4, 0.4);   // le gros plan s'efface AVANT que les thermomètres n'apparaissent
      op(vueG, tr);
      /* le canal : le fluide et l'eau se remplissent avec les personnages ; bulles et vapeur croissent avec l'ébullition */
      const bul = D.courbe([[T[0], 0], [A(0, 0.5), 0.25], [E[0], 0.5], [T[2], 0.55], [E[2], 0.85], [T[3], 1]], t, true), vap = D.courbe([[T[0], 0], [E[1], 0], [E[2], 0.3], [A(3, 0.6), 1]], t, true);
      const pulse = 0.75 + 0.25 * Math.sin(t * 5);
      GP.maj(t, { ph: ph, flu: doux(t, T[0] - 0.4, 0.6), eau: doux(t, T[1] - 0.4, 0.6), bul: bul, vap: vap, halo: D.fenetre(t, T[4] + 0.3, E[4] + 0.2, 0.5) * pulse, etiq: doux(t, T[0], 0.5) });
      /* la molécule : elle entre en bas, bout, monte, devient vapeur ; la goutte entre en haut, descend, se glace */
      const surf = GP.surface(t), rest = surf - 14 + Math.sin(t * 2) * 4;
      const yMol = D.courbe([[T[0], GP.y1 + 50], [A(0, 0.5), rest], [T[3] + 0.2, rest], [E[3] - 1.2, TOPM], [T[4] + 0.1, TOPM], [A(4, 0.4), MID]], t);
      const yEau = D.courbe([[T[1], 296], [A(1, 0.5), 330], [T[3] + 0.2, 330], [E[3] - 1.2, BOTE], [T[4] + 0.1, BOTE], [A(4, 0.4), MID]], t);
      plan(mila, yMol > surf - 96 ? GP.fond : GP.dessus);      // sous la nappe tant qu'elle la touche ; plus haut, elle passe devant (sans que rien ne change à l'image)
      const montee = D.borne((rest - yMol) / (rest - TOPM), 0, 1);
      const temp = D.courbe([[0, 0.08], [A(3, 0.45), 0.08], [E[3], 0.12]], t, true), etat = t < A(2, 0.45) ? "liquide" : montee > 0.78 || t > E[3] - 1.0 ? "vapeur" : "bout";
      const humeur = t < T[1] ? "froid" : "sourire";
      mila({ x: GP.xg, y: yMol, s: 1.85, t: t, temp: temp, etat: etat, humeur: humeur, regard: t < T[1] + 0.8 ? [0, 0.2] : [1, -0.1], op: doux(t, T[0], 0.5) });
      const descente = D.borne((yEau - 330) / (BOTE - 330), 0, 1), tiede = 1 - D.lisse(descente);
      eau({ x: GP.xd, y: yEau, s: 1.85, t: t, tiede: tiede, humeur: descente > 0.7 ? (t < T[4] + 0.6 ? "froid" : "sourire") : t < T[2] ? "surprise" : "sourire", regard: [-1, 0.1], op: doux(t, T[1], 0.5) });
      /* k1, k3 : les étiquettes ; k2 : la chaleur */
      fen(eTiede, t, A(1, 0.68), E[1] + 0.2, 0.4); fen(eGlace, t, A(3, 0.78), E[3] + 0.2, 0.4); fen(eVap, t, A(3, 0.78), E[3] + 0.2, 0.4);
      [eTiede, eGlace, eVap].forEach(e => e.setAttribute("opacity", (parseFloat(e.getAttribute("opacity")) * tr).toFixed(2)));
      op(chal, D.fenetre(t, A(2, 0.05), E[2] + 0.3, 0.5));
      CH.forEach(q => { const f = D.frac(q.f + t * 0.45); q.maj(xm + 85 - 170 * f, q.y, 90, D.fenetre(f, 0, 1, 0.25)); });
      /* k5 : les thermomètres */
      op(th, haut);
      mE(NE * doux(t, T[5] + 0.2, 1.0), D.EAU); mF(NF * doux(t, T[5] + 0.6, 1.0), D.couleur(0.08, false));
      op(ecart, doux(t, T[5] + 2.0, 0.5));
      mol5({ x: 800, y: 420, s: 1.15, t: t, temp: 0.12, etat: "vapeur", humeur: "sourire", regard: [-1, 0] }); eau5({ x: 190, y: 420, s: 1.15, t: t, tiede: 0, humeur: "sourire", regard: [1, 0] });
      montrer(pa, t);
      const r = { temp: temp, etat: etat, humeur: humeur };
      r.diag = D.courbe([[0, 1], [E[1] + 0.3, 1], [E[2], 1.6], [E[3], 2.6], [E[4], 3], [DUR, 3]], t, true); r.diag0 = 1;
      r.carte = D.courbe([[0, 0], [E[1] + 0.3, 0], [E[3], 3], [DUR, 3]], t, true);
      return r;
    };
  };
})();
