/* =====================================================================
   voyage-sous-refroidisseur-scenes-b.js — édition « sous-refroidisseur de
   liquide » : l'échangeur à plaques, le premier tour, les vis, le piquage,
   l'ébullition dans l'échangeur
   ---------------------------------------------------------------------
   MÊME CONTRAT que moteur/voyage-scenes-a.js : VOYAGE_SCENES[id](g, c) → maj(t)
   (c = { T, E, D, A(k, f), film, recit } ; T[k]/E[k] bornent la phrase k du
   récit donnees/voyage-sous-refroidisseur.js ; maj(t) rend { temp, etat,
   humeur, carte?, diag?, diag0? }). Fonction PURE de t. Les gestes sont
   accrochés au RANG des phrases : ajouter une phrase au récit décale tout.
   Ce fichier ne définit que cinq scènes : echangeur, premierTour, lesVis,
   piquage, ebullition (les autres : -a.js et -c.js).
   ÉCRAN PARTAGÉ : la scène tient dans x 20 → 965, y 150 → 760 (en-tête x < 760,
   y < 140 ; carte et diagramme à droite).
   AIDES LOCALES (même dessin que le fichier -c.js) :
   · echangeurCoupe() — l'échangeur à plaques en coupe : un bloc d'inox, 7
     plaques fines embouties (zigzag), 8 canaux alternés (pairs : liquide
     principal, qui DESCEND ; impairs : piquage, qui bout et MONTE). Quatre
     raccords : liquide principal entrée en haut à gauche, sortie en bas à
     droite ; piquage entrée en bas à gauche, sortie en haut à droite. Les
     collecteurs (deux bandes en haut, deux en bas) relient chaque canal à son
     raccord ; un manchon traverse la bande de l'autre fluide.
   · vueLongue() — le compresseur à vis en coupe le long des rotors
     (aspiration à gauche, refoulement à droite, mâle en haut, femelle en bas),
     avec l'orifice économiseur au milieu de la compression.
   TOUT EST FONCTION DE t : aucune animation CSS, aucun état gardé.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const SANS = "Calibri, Arial, sans-serif";
  const VERT = D.ECO, ROUGE = "#c0392b", BLEU = "#2f6fb8", NUIT = "#10233c", CLAIR = "#f4f8fc", ORANGE = "#ff6b35";
  let nid = 0;
  const ident = p => "vsb-" + p + "-" + (++nid);
  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const fen = (e, t, a, b, du) => op(e, D.fenetre(t, a, b, du === undefined ? 0.4 : du));
  const ap = (e, a) => { for (const k in a) e.setAttribute(k, typeof a[k] === "number" ? +a[k].toFixed(1) : a[k]); };
  const rect = (p, x, y, w, h, at) => D.el("rect", Object.assign({ x: x, y: y, width: w, height: h }, at || {}), p);
  const pts = l => l.map(q => q[0].toFixed(1) + "," + q[1].toFixed(1)).join(" ");

  /* ---------- petits outils ---------- */
  /* étiquette (une ou plusieurs lignes) + son trait en pointillés ; rend { g, mv(x2, y2) } */
  function etiq(parent, x, y, texte, o) {
    o = o || {};
    const g = D.el("g", { opacity: 0 }, parent);
    (Array.isArray(texte) ? texte : [texte]).forEach((l, i) => D.etiquette(g, x, y + i * 36, l, { "text-anchor": o.ancre || "start", "font-size": o.taille || 32, fill: o.coul || NUIT, "font-weight": o.gras ? 700 : 600 }));
    const tr = o.trait ? D.trait(g, o.trait[0], o.trait[1], o.trait[2], o.trait[3], o.coulTrait) : null;
    return { g: g, mv: (x2, y2) => { if (tr) { tr.setAttribute("x2", x2.toFixed(1)); tr.setAttribute("y2", y2.toFixed(1)); } } };
  }
  /* flèche pleine : la pointe est en (x2, y2) */
  function fleche(p, x1, y1, x2, y2, coul, ep) {
    ep = ep || 8;
    const g = D.el("g", {}, p), a = Math.atan2(y2 - y1, x2 - x1), L = ep * 2.6, l = ep * 1.5, bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
    D.el("line", { x1: x1, y1: y1, x2: bx, y2: by, stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, g);
    D.el("polygon", { points: pts([[x2, y2], [bx - l * Math.sin(a), by + l * Math.cos(a)], [bx + l * Math.sin(a), by - l * Math.cos(a)]]), fill: coul }, g);
    return g;
  }
  /* arc fléché dont les extrémités changent à chaque image : centre (cx, cy), rayon r ; f(a0, a1) en degrés (sens des aiguilles d'une montre si a1 > a0) */
  function arcVar(p, cx, cy, r, coul, ep) {
    const g = D.el("g", {}, p), tr = D.el("path", { fill: "none", stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, g), tete = D.el("polygon", { fill: coul }, g);
    const rad = a => a * Math.PI / 180, pt = a => [cx + r * Math.cos(rad(a)), cy + r * Math.sin(rad(a))];
    return function (a0, a1) {
      const [x0, y0] = pt(a0), [x1, y1] = pt(a1), sg = a1 > a0 ? 1 : -1, tx = -Math.sin(rad(a1)) * sg, ty = Math.cos(rad(a1)) * sg, L = ep * 2.8, l = ep * 1.6;
      tr.setAttribute("d", "M " + x0.toFixed(1) + " " + y0.toFixed(1) + " A " + r + " " + r + " 0 " + (Math.abs(a1 - a0) > 180 ? 1 : 0) + " " + (sg > 0 ? 1 : 0) + " " + x1.toFixed(1) + " " + y1.toFixed(1));
      tete.setAttribute("points", pts([[x1 + tx * L, y1 + ty * L], [x1 - ty * l, y1 + tx * l], [x1 + ty * l, y1 - tx * l]]));
    };
  }
  /* longueur d'une ligne brisée, et point à la distance s le long d'elle */
  function longueur(l) { let s = 0; for (let i = 1; i < l.length; i++) s += Math.hypot(l[i][0] - l[i - 1][0], l[i][1] - l[i - 1][1]); return s; }
  function suivre(l, u) { // point à la fraction u (0..1)
    const L = [0];
    for (let i = 1; i < l.length; i++) L.push(L[i - 1] + Math.hypot(l[i][0] - l[i - 1][0], l[i][1] - l[i - 1][1]));
    const d = D.borne(u, 0, 1) * L[L.length - 1];
    let i = 1;
    while (i < l.length - 1 && d > L[i]) i++;
    const f = (d - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
    return [D.lerp(l[i - 1][0], l[i][0], f), D.lerp(l[i - 1][1], l[i][1], f)];
  }
  /* tuyau suivant une ligne brisée : paroi de cuivre, intérieur de la couleur du fluide */
  function tuyauPoly(p, l, ep, coul) {
    D.el("polyline", { points: pts(l), fill: "none", stroke: "#9a5a2e", "stroke-width": ep + 10, "stroke-linejoin": "round" }, p);
    return D.el("polyline", { points: pts(l), fill: "none", stroke: coul, "stroke-width": ep, "stroke-linejoin": "round" }, p);
  }
  /* petite molécule de vapeur d'une couleur choisie (la vapeur du piquage est verte) : f(x, y du CENTRE, opacité, échelle) */
  function molC(p, coul) {
    const u = D.el("use", { href: "#vm-mol", fill: coul }, p);
    return (x, y, o, k) => { u.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") scale(" + (k || 1) + ")"); u.setAttribute("opacity", (o === undefined ? 1 : D.borne(o, 0, 1)).toFixed(2)); };
  }
  /* reflets qui filent dans un tuyau plein (le liquide se voit couler) : f(t, vitesse en tours de tuyau par seconde, visibilité) */
  function reflets(p, l, nb, graine) {
    const r = D.alea(graine), L = [];
    for (let i = 0; i < nb; i++) L.push({ s: r(), l: 0.03 + r() * 0.03, dy: (r() - 0.5) * 6, e: D.el("line", { stroke: "#fff", "stroke-width": 3.5, "stroke-linecap": "round", opacity: 0 }, p) });
    return function (t, vit, vis) {
      L.forEach(q => {
        const u = D.frac(q.s + t * vit), [x1, y1] = suivre(l, u), [x2, y2] = suivre(l, Math.min(1, u + q.l));
        ap(q.e, { x1: x1, y1: y1 + q.dy, x2: x2, y2: y2 + q.dy });
        q.e.setAttribute("opacity", (0.65 * vis * D.fenetre(u, 0, 1, 0.08)).toFixed(2));
      });
    };
  }

  /* =====================================================================
     L'ÉCHANGEUR À PLAQUES EN COUPE (aide locale ; même dessin dans -c.js)
     o : { x, y, w, h, stub } — bloc d'inox (x, y, w, h), raccords de longueur `stub` au-dehors.
     Rend { g, N, canalX(c, y), canalPt(c, u), y: { c0, c1, Pf, Qo, Qi, Po }, ports: { Pin, Pout, Qin, Qout } : [x, y du bout],
            pitch, maj(t, p) }.
     maj(t, p) : p.ph (secondes d'écoulement : 0 = à l'arrêt), p.tint 0..1 (les canaux se teintent un à un), p.fP / p.fQ 0..1 (liquide
     principal / piquage visibles), p.bleu 0..1 (le liquide principal bleuit), p.lv (niveau du piquage, nombre ou tableau par canal impair),
     p.halo 0..1 (les plaques surlignées), p.chev 0..1 (flèches de sens dans les raccords).
     ===================================================================== */
  function echangeurCoupe(parent, o) {
    const x0 = o.x, y0 = o.y, W = o.w, H = o.h, x1 = x0 + W, y1 = y0 + H;
    const N = 7, NC = N + 1;                                   // 7 plaques fines → 8 canaux (pairs : liquide principal ; impairs : piquage)
    const EW = 20, MUR = 8, SH = D.borne(H * 0.062, 15, 24), GAP = 4, LS = o.stub === undefined ? 52 : o.stub, AMP = 4.5;
    const xa = x0 + EW, pitch = (W - 2 * EW) / NC, xb = xa + NC * pitch;
    const yPf = y0 + MUR + SH / 2, yQo = y0 + MUR + SH * 1.5 + GAP, yc0 = y0 + MUR + 2 * SH + 2 * GAP;
    const yPo = y1 - MUR - SH / 2, yQi = y1 - MUR - SH * 1.5 - GAP, yc1 = y1 - MUR - 2 * SH - 2 * GAP;
    const nz = 2 * Math.max(2, Math.round((yc1 - yc0) / 52)), Lz = (yc1 - yc0) / nz; // quart de période de l'emboutissage
    const ONDE = [0, 1, 0, -1];
    const tri = y => { if (y <= yc0 || y >= yc1) return 0; const u = (y - yc0) / Lz, j = Math.floor(u); return D.lerp(ONDE[j % 4], ONDE[(j + 1) % 4], u - j); };
    const px = (i, y) => i === 0 ? xa : i === NC ? xb : xa + i * pitch + AMP * (i % 2 ? 1 : -1) * tri(y); // abscisse de la plaque i à la hauteur y
    const ys = [yc0]; for (let j = 1; j < nz; j++) ys.push(yc0 + j * Lz); ys.push(yc1);
    const bord = (i, ya, yb) => [[px(i, ya), ya]].concat(ys.map(y => [px(i, y), y])).concat([[px(i, yb), yb]]);
    const g = D.el("g", {}, parent), defs = D.el("defs", {}, g);
    const cuivre = "url(#vm-cuivre-h)", cP = t => D.couleur(t, false);
    const grad = (id, y0g, y1g, stops) => {
      const lg = D.el("linearGradient", { id: id, x1: 0, y1: y0g, x2: 0, y2: y1g, gradientUnits: "userSpaceOnUse" }, defs);
      return stops.map(([k, c]) => D.el("stop", { offset: k, "stop-color": c }, lg));
    };
    const idP = ident("gp"), idQ = ident("gq");
    const stP = grad(idP, yc0, yc1, [[0, cP(0.47)], [1, cP(0.24)]]);
    grad(idQ, yc0, yc1, [[0, "#c6e9d5"], [1, "#4aa878"]]);
    /* 1 · le bloc : cadre d'inox clair, plaques de bout plus épaisses */
    D.el("rect", { x: x0, y: y0, width: W, height: H, rx: 8, fill: "#d3dae2", stroke: "#56636f", "stroke-width": 3 }, g);
    D.el("rect", { x: x0, y: y0, width: EW, height: H, rx: 6, fill: "url(#vm-acier-h)", stroke: "#39424c", "stroke-width": 2.5 }, g);
    D.el("rect", { x: x1 - EW, y: y0, width: EW, height: H, rx: 6, fill: "url(#vm-acier-h)", stroke: "#39424c", "stroke-width": 2.5 }, g);
    /* 2 · les collecteurs du piquage (sous les manchons du liquide principal) */
    const bande = (y, coul) => rect(g, xa, y, xb - xa, SH, { fill: coul });
    bande(yQo - SH / 2, "#cfeadb"); bande(yQi - SH / 2, "#8fd0ad");
    /* 3 · les canaux : le fond, la teinte, le liquide (clippés au canal) */
    const canaux = D.el("g", {}, g), CN = [];
    for (let c = 0; c < NC; c++) {
      const P = c % 2 === 0, yt = P ? yPf : yQo, yb = P ? yPo : yQi;
      const poly = bord(c, yt, yb).concat(bord(c + 1, yt, yb).reverse());
      const cid = ident("cl");
      D.el("polygon", { points: pts(poly) }, D.el("clipPath", { id: cid }, defs));
      const cg = D.el("g", { "clip-path": "url(#" + cid + ")" }, canaux), fy = P ? yt : yc0, fh = (P ? yb : yc1) - fy;
      rect(cg, xa, fy, xb - xa, fh, { fill: CLAIR });
      const tint = rect(cg, xa, fy, xb - xa, fh, { fill: P ? "#f6c9a4" : "#a9dcc2", opacity: 0 });
      const o1 = { c: c, P: P, yt: yt, yb: yb, tint: tint };
      if (P) {
        o1.liq = rect(cg, xa, yt, xb - xa, yb - yt, { fill: "url(#" + idP + ")", opacity: 0 });
        o1.rip = [0, 1, 2, 3, 4, 5, 6].map(() => D.el("path", { fill: "none", stroke: "#fff", "stroke-width": 3, "stroke-linecap": "round", opacity: 0 }, cg));
      } else {
        o1.nap = D.el("path", { fill: "url(#" + idQ + ")", opacity: 0 }, cg);
        o1.surf = D.el("path", { fill: "none", stroke: "#fff", "stroke-width": 2.5, "stroke-linecap": "round", opacity: 0 }, cg);
        const R = D.alea(11 + c * 7);
        o1.bul = [0, 1, 2, 3, 4, 5, 6, 7].map(() => ({ u0: R() * 0.85, rel: R() * 2 - 1, ph: R() * 3, per: 2.2 + R() * 1.6,
          e: D.el("circle", { fill: "#fff", "fill-opacity": 0.4, stroke: "#fff", "stroke-width": 2.2, opacity: 0 }, cg) }));
        o1.vap = [0, 1, 2].map(i => ({ ph: i / 3 + R() * 0.2, rel: R() * 2 - 1, m: molC(cg, VERT) }));
      }
      CN.push(o1);
    }
    /* 4 · les collecteurs du liquide principal (au-dessus des canaux) */
    const sPf = bande(yPf - SH / 2, cP(0.47)), sPo = bande(yPo - SH / 2, cP(0.28));
    const brins = [yPf, yQo, yQi, yPo].map(y => D.el("line", { x1: xa, x2: xb, y1: y, y2: y, stroke: "#fff", "stroke-width": 3, "stroke-dasharray": "14 20", "stroke-linecap": "round", opacity: 0 }, g));
    /* 5 · les plaques : halo (surlignage), trait d'inox, reflet */
    const halo = D.el("g", { opacity: 0 }, g), yA = yPf + SH / 2, yB = yPo - SH / 2;
    for (let i = 1; i <= N; i++) {
      const l = bord(i, yA, yB);
      D.el("polyline", { points: pts(l), fill: "none", stroke: "#ff8a4c", "stroke-width": 16, "stroke-linejoin": "round", opacity: 0.95 }, halo);
      D.el("polyline", { points: pts(l), fill: "none", stroke: "#56636f", "stroke-width": 4.2, "stroke-linejoin": "round" }, g);
      D.el("polyline", { points: pts(l), fill: "none", stroke: "#eef2f6", "stroke-width": 1.4, "stroke-linejoin": "round" }, g);
    }
    /* 6 · les quatre raccords (tubes de cuivre, intérieur de la couleur du fluide) ; les deux du piquage traversent un collecteur */
    const ws = pitch - 6, cx = c => xa + (c + 0.5) * pitch;
    const STUB = [["Pin", cx(0), y0 - LS, yPf, cP(0.47), 0, 1], ["Qout", cx(NC - 1), y0 - LS, yQo, "#d2eddd", 180, -1],
      ["Qin", cx(1), y1 + LS, yQi, "#9fd8b9", 180, 1], ["Pout", cx(NC - 2), y1 + LS, yPo, cP(0.24), 0, -1]]; // [nom, x, bout libre, bout dans le collecteur, couleur, angle de la flèche (0 : vers le bas), sens (1 : vers le bloc)]
    const ports = {}, chevs = [];
    STUB.forEach(([nom, x, ya, yb, coul, ang, sens]) => {
      const yh = Math.min(ya, yb), hh = Math.abs(yb - ya);
      rect(g, x - ws / 2, yh, ws, hh, { fill: cuivre, rx: 3 });
      rect(g, x - ws / 2 + 7, yh, ws - 14, hh, { fill: coul });
      ports[nom] = [x, ya];
      for (let k = 0; k < 2; k++) chevs.push({ x: x, ya: ya, yb: yb, k: k, ang: ang, sens: sens, e: D.el("path", { d: "M -8 -5 L 0 5 L 8 -5", fill: "none", stroke: "#fff", "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, g) });
    });
    const canalX = (c, y) => (px(c, y) + px(c + 1, y)) / 2;
    return {
      g: g, N: N, NC: NC, pitch: pitch, ports: ports, canalX: canalX, px: px,
      y: { c0: yc0, c1: yc1, Pf: yPf, Qo: yQo, Qi: yQi, Po: yPo, SH: SH }, x: { a: xa, b: xb, x0: x0, x1: x1 }, y0: y0, y1: y1,
      canalPt: (c, u) => { const y = D.lerp(yc0, yc1, u); return [canalX(c, y), y]; },
      maj: function (t, p) {
        p = p || {};
        const ph = p.ph || 0, fP = p.fP || 0, fQ = p.fQ || 0, bleu = p.bleu || 0, tint = p.tint || 0;
        stP[0].setAttribute("stop-color", cP(D.lerp(0.47, 0.34, bleu))); stP[1].setAttribute("stop-color", cP(D.lerp(0.24, 0.1, bleu)));
        sPf.setAttribute("fill", cP(D.lerp(0.47, 0.4, bleu))); sPo.setAttribute("fill", cP(D.lerp(0.24, 0.12, bleu)));
        op(halo, p.halo || 0);
        const rb = ph * 22;                                     // décalage des brins dans les collecteurs
        brins.forEach(b => { b.setAttribute("stroke-dashoffset", (-rb).toFixed(1)); op(b, 0.55 * Math.max(fP, fQ)); });
        CN.forEach(n => {
          op(n.tint, D.borne(tint * (NC + 1.4) - n.c, 0, 1) * 0.9);
          if (n.P) {
            op(n.liq, fP * 0.9);
            const Lc = n.yb - n.yt;
            n.rip.forEach((r, k) => {
              const u = D.frac(k / 7 + ph * 0.14), y = n.yt + u * Lc, a = px(n.c, y) + 3, b = px(n.c + 1, y) - 3;
              r.setAttribute("d", "M " + a.toFixed(1) + " " + y.toFixed(1) + " Q " + ((a + b) / 2).toFixed(1) + " " + (y + 8).toFixed(1) + " " + b.toFixed(1) + " " + y.toFixed(1));
              op(r, fP * 0.7 * D.fenetre(u, 0, 1, 0.06));
            });
          } else {
            const lv = Array.isArray(p.lv) ? p.lv[(n.c - 1) / 2] : (p.lv === undefined ? 0.86 : p.lv);
            const ysf = yc1 - lv * (yc1 - yc0), a = px(n.c, ysf) - 8, b = px(n.c + 1, ysf) + 8;
            let d = "M " + (a - 10) + " " + (yQi + 4);
            const surf = [];
            for (let k = 0; k <= 6; k++) { const x = a + (b - a) * k / 6; surf.push([x, ysf + 2.6 * Math.sin(x / 11 - ph * 3.2 + n.c) + 1.6 * Math.sin(x / 5 + ph * 2.1)]); }
            d += " L " + surf.map(q => q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" L ") + " L " + (b + 10) + " " + (yQi + 4) + " Z";
            n.nap.setAttribute("d", d); op(n.nap, fQ * 0.85);
            n.surf.setAttribute("d", "M " + surf.map(q => q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" L ")); op(n.surf, fQ * 0.8);
            n.bul.forEach(bb => {
              const f = D.frac(ph / bb.per + bb.ph), yst = D.lerp(yQi - 6, ysf + 14, bb.u0), y = D.lerp(yst, ysf + 4, f), up = D.borne((yQi - y) / Math.max(1, yQi - ysf), 0, 1);
              const r = D.lerp(2.6, 8.4, up), xl = px(n.c, y) + 2, xr = px(n.c + 1, y) - 2, x = (xl + xr) / 2 + bb.rel * ((xr - xl) / 2 - r - 2);
              ap(bb.e, { cx: x, cy: y, r: r }); op(bb.e, fQ * D.fenetre(f, 0, 1, 0.12));
            });
            n.vap.forEach(v => {
              const f = D.frac(ph * 0.3 + v.ph), y = D.lerp(ysf - 4, yc0 - 6, f), xl = px(n.c, y) + 2, xr = px(n.c + 1, y) - 2;
              v.m((xl + xr) / 2 + v.rel * ((xr - xl) / 2 - 12), y, fQ * D.fenetre(f, 0, 1, 0.2) * D.borne((ysf - yc0) / 24, 0, 1), 0.8);
            });
          }
        });
        chevs.forEach(q => { // des flèches de sens dans les raccords
          const f = D.frac(ph * 0.5 + q.k / 2), y = q.sens > 0 ? D.lerp(q.ya, q.yb, f) : D.lerp(q.yb, q.ya, f);
          q.e.setAttribute("transform", "translate(" + q.x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + q.ang + ")");
          op(q.e, (p.chev === undefined ? 1 : p.chev) * Math.max(fP, fQ) * 0.8 * D.fenetre(f, 0, 1, 0.2));
        });
      }
    };
  }

  /* =====================================================================
     LE COMPRESSEUR À VIS EN COUPE LE LONG DES ROTORS (aide locale ; même dessin dans -c.js, recopié de l'édition vis)
     Repère LOCAL : x 20 → 740, y −34 → 292 (aspiration à gauche, refoulement à droite). o : { x, y, k, eco, nm }.
     Rend { g, k, pt(lx, ly) → écran, fond, dedans, devant, mur, maj(p) }.
     maj(p) : { t, phase (déplacement des lobes, px locaux), alv: { xL, W, ouverte, halo, op, nmol, temp },
                heroine: { s, temp, etat, humeur, ecrase, regard, dx, dy, op } }
     ===================================================================== */
  const G = { xI0: 212, xI1: 660, yH: 26, yB: 236, yM: 84, yF: 178, yV: 131, pas: 70, lobe: 36, pente: 0.55, xA: 300, Wmax: 120, Wmin: 40, xAsp: [215, 322], xEco: 520 };
  G.poche = u => ({ xL: G.xA + u * (G.xI1 - G.Wmin - G.xA), W: D.lerp(G.Wmax, G.Wmin, u) }); // u : 0 = alvéole juste fermée, 1 = au refoulement
  const chev = (xL, W) => { const d = G.pente * 87; return pts([[xL + d, 44], [xL + d + W, 44], [xL + W, G.yV], [xL + d + W, 218], [xL + d, 218], [xL, G.yV]]); };
  function bande(parent, o) { // o : { x, y, w, h, yRef, sens (−1 : lobes en « / », +1 : en « \ »), decal, fond } → maj(phase)
    const cid = ident("vcb"), g = D.el("g", {}, parent);
    rect(D.el("clipPath", { id: cid }, g), o.x, o.y, o.w, o.h);
    const c = D.el("g", { "clip-path": "url(#" + cid + ")" }, g), ext = Math.abs(G.pente * o.h) + G.pas;
    rect(c, o.x, o.y, o.w, o.h, { fill: o.fond || "#5d6975" });
    const lobes = D.el("g", {}, c);
    for (let j = Math.floor((o.x - ext - G.pas - G.xA) / G.pas); G.xA + j * G.pas < o.x + o.w + ext; j++)
      rect(lobes, G.xA + j * G.pas + (o.decal || 0), o.y, G.lobe, o.h, { fill: "url(#vm-acier-h)", stroke: "#3d4650", "stroke-width": 1.5 });
    const ang = (o.sens * Math.atan(G.pente) * 180 / Math.PI).toFixed(2);
    return function (phase) {
      const dx = ((phase % G.pas) + G.pas) % G.pas;
      lobes.setAttribute("transform", "translate(" + dx.toFixed(2) + " 0) translate(0 " + o.yRef + ") skewX(" + ang + ") translate(0 " + (-o.yRef) + ")");
    };
  }
  function vueLongue(parent, o) {
    const k = o.k || 1, uid = ident("vcl");
    const g = D.el("g", { transform: "translate(" + o.x + " " + o.y + ") scale(" + k + ")" }, parent);
    const defs = D.el("defs", {}, g);
    const gf = D.el("linearGradient", { id: uid + "f", x1: 0, y1: 0, x2: 0, y2: 1 }, defs); // fonte grise
    [[0, "#dfe2e6"], [0.5, "#b4bac1"], [1, "#8e959d"]].forEach(([f, cc]) => D.el("stop", { offset: f, "stop-color": cc }, gf));
    const ph = D.el("pattern", { id: uid + "h", width: 9, height: 9, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs); // hachures de coupe
    D.el("line", { x1: 0, y1: 0, x2: 0, y2: 9, stroke: "#4f565e", "stroke-width": 2, opacity: 0.8 }, ph);
    rect(D.el("clipPath", { id: uid + "c" }, defs), G.xI0, G.yH, G.xI1 - G.xI0, G.yB - G.yH);
    const fond = D.el("g", {}, g), rotG = D.el("g", {}, g), alvG = D.el("g", { "clip-path": "url(#" + uid + "c)" }, g), dedans = D.el("g", {}, g),
      moteur = D.el("g", {}, g), murs = D.el("g", {}, g), devant = D.el("g", {}, g);
    // les chambres (le gaz y circule) : moteur, galerie d'aspiration, vis, fenêtre de refoulement
    [[46, 26, 144, 124], [100, 0, 90, 26], [100, -20, 222, 20], [215, 0, 107, 26], [G.xI0, G.yH, G.xI1 - G.xI0, G.yB - G.yH], [660, 100, 80, 66]].forEach(([x, y, w, h]) => rect(fond, x, y, w, h, { fill: CLAIR }));
    if (o.eco) rect(fond, G.xEco - 28, 236, 56, 56, { fill: CLAIR });
    // les deux vis : mâle en haut (lobes bombés), femelle en bas (creux), lobes en diagonale opposée
    const mM = bande(rotG, { x: G.xI0, y: G.yH, w: G.xI1 - G.xI0, h: G.yV - G.yH, yRef: G.yV, sens: -1 });
    const mF = bande(rotG, { x: G.xI0, y: G.yV, w: G.xI1 - G.xI0, h: G.yB - G.yV, yRef: G.yV, sens: 1, decal: G.pas / 2, fond: "#667380" });
    D.el("line", { x1: G.xI0, x2: G.xI1, y1: G.yV, y2: G.yV, stroke: "#2c343d", "stroke-width": 2 }, rotG);
    // l'alvéole : zone claire bordée d'orange, avec des voisines (vapeur) et l'héroïne dedans
    const halo = D.el("polygon", { fill: "none", stroke: D.ORANGE, "stroke-width": 15, "stroke-linejoin": "round", opacity: 0 }, alvG);
    const poche = D.el("polygon", { fill: "#fff", "fill-opacity": 0.62, stroke: D.ORANGE, "stroke-width": 5, "stroke-linejoin": "round", opacity: 0 }, alvG);
    const nm = o.nm || 7, ra = D.alea(7), VM = [];
    for (let i = 0; i < nm; i++) VM.push({ fx: 0.14 + 0.72 * ra(), dy: (i % 2 ? 1 : -1) * (34 + 56 * ra()), ph: ra() * 6.28, maj: D.mol(dedans) });
    const mila = D.heroine(dedans, { r: 30 });
    // le moteur (bobinages de cuivre, rotor d'acier) et son arbre, sur l'axe du mâle ; la grille du filtre d'aspiration
    [[62, 30], [62, 108]].forEach(([x, y]) => {
      rect(moteur, x, y, 112, 30, { rx: 7, fill: "url(#vm-cuivre)", stroke: "#5a2c10", "stroke-width": 2 });
      for (let i = 0; i < 12; i++) D.el("line", { x1: x + 8 + i * 8.8, y1: y + 4, x2: x + 8 + i * 8.8, y2: y + 26, stroke: "#5a2c10", "stroke-width": 1.6, opacity: 0.5 }, moteur);
    });
    rect(moteur, 76, 66, 98, 36, { fill: "url(#vm-acier)", stroke: "#3d4650", "stroke-width": 2 });
    rect(moteur, 170, 77, 80, 14, { fill: "url(#vm-acier)", stroke: "#3d4650", "stroke-width": 2 });
    rect(moteur, 22, 50, 24, 70, { fill: "#e6edf4", stroke: "#56636f", "stroke-width": 2 });
    for (let i = 1; i < 6; i++) D.el("line", { x1: 22, x2: 46, y1: 50 + i * 11.7, y2: 50 + i * 11.7, stroke: "#8493a3", "stroke-width": 1.4 }, moteur);
    for (let i = 1; i < 4; i++) D.el("line", { x1: 22 + i * 6, x2: 22 + i * 6, y1: 50, y2: 120, stroke: "#8493a3", "stroke-width": 1.4 }, moteur);
    // la carcasse : fonte grise coupée (dégradé + hachures)
    const mur = (x, y, w, h) => { rect(murs, x, y, w, h, { fill: "url(#" + uid + "f)" }); rect(murs, x, y, w, h, { fill: "url(#" + uid + "h)", stroke: "#3b4249", "stroke-width": 2.5 }); };
    [[20, 0, 80, 26], [190, 0, 25, 26], [322, 0, 368, 26], [88, -34, 246, 14], [88, -20, 12, 20], [322, -20, 12, 20], // dessus + galerie d'aspiration
      [20, 26, 26, 24], [20, 120, 26, 30], [20, 150, 192, 26], [190, 26, 22, 51], [190, 91, 22, 145], // moteur et cloison
      [660, 26, 30, 74], [660, 166, 30, 70], [690, 84, 50, 16], [690, 166, 50, 16] // fond côté refoulement, tube de refoulement
    ].forEach(a => mur(...a));
    if (o.eco) [[190, 236, G.xEco - 28 - 190, 26], [G.xEco + 28, 236, 690 - G.xEco - 28, 26], [G.xEco - 40, 262, 12, 30], [G.xEco + 28, 262, 12, 30]].forEach(a => mur(...a));
    else mur(190, 236, 500, 26);
    return {
      g: g, k: k, fond: fond, dedans: dedans, devant: devant, mur: mur,
      pt: (x, y) => [o.x + x * k, o.y + y * k],
      maj: function (p) {
        const t = p.t || 0, a = p.alv;
        mM(p.phase || 0); mF(p.phase || 0);
        if (!a || a.op === 0) {
          [poche, halo].forEach(e => e.setAttribute("opacity", 0));
          VM.forEach(m => m.maj(-999, -999, 0.5, true, 0));
          mila({ x: -999, y: -999, s: 0.1, t: t, op: 0 });
          return;
        }
        const P = chev(a.xL, a.W), vis = a.op === undefined ? 1 : a.op;
        poche.setAttribute("points", P); halo.setAttribute("points", P);
        poche.setAttribute("opacity", vis.toFixed(2)); halo.setAttribute("opacity", ((a.halo || 0) * vis).toFixed(2));
        poche.setAttribute("stroke-dasharray", a.ouverte ? "16 10" : "none");
        const n = a.nmol === undefined ? nm : a.nmol, tm = a.temp === undefined ? 0.2 : a.temp;
        VM.forEach((m, i) => {
          const y = G.yV + m.dy + Math.sin(t * 2.3 + m.ph) * 4, x = a.xL + G.pente * Math.abs(y - G.yV) + m.fx * a.W + Math.cos(t * 1.9 + m.ph) * 4;
          m.maj(x, y, tm, true, D.borne(n - i, 0, 1) * vis);
        });
        const h = p.heroine;
        if (h) mila({ x: a.xL + a.W / 2 + (h.dx || 0), y: G.yV + (h.dy || 0), s: h.s === undefined ? 0.62 : h.s, t: t, temp: h.temp, etat: h.etat || "vapeur", humeur: h.humeur, ecrase: h.ecrase, regard: h.regard, op: (h.op === undefined ? 1 : h.op) * (a.opH === undefined ? vis : a.opH) });
        else mila({ x: -999, y: -999, s: 0.1, t: t, op: 0 });
      }
    };
  }

  /* =====================================================================
     1 · L'ÉCHANGEUR — la coupe d'un échangeur à plaques ; recul : le té et le piquage
     k0-k1 : la carte d'identité couvre la scène ; k2 : plaques ; k3 : un canal sur deux ; k4 : les deux fluides ;
     k5 : sens contraires, chaleur à travers une plaque ; k6 : la ligne liquide, le té, la branche.
     ===================================================================== */
  S.echangeur = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    const X0 = 262, Y0 = 214, W = 440, H = 380;
    const rec = D.el("g", {}, g);                       // la ligne liquide, le té, la branche (k6)
    const cg = D.el("g", {}, g);                        // la coupe (recule en k6)
    const EC = echangeurCoupe(cg, { x: X0, y: Y0, w: W, h: H });
    const dessus = D.el("g", {}, cg);                   // flèches qui suivent la coupe
    const xp = i => EC.px(i, Y0 + H / 2);               // abscisse de la plaque i à mi-hauteur
    /* flèches de chaleur à travers les plaques 3 et 4 (k5), des canaux 2 et 4 (liquide principal) vers le canal 3 (piquage) */
    const CH = [], ya = [EC.y.c0 + 60, EC.y.c0 + 130, EC.y.c0 + 200];
    ya.forEach((y, i) => [-1, 1].forEach(s => CH.push({ y: y, s: s, i: i, maj: D.chaleur(dessus) })));
    /* k5 : grandes flèches de sens contraires, à côté du bloc */
    const sens = D.el("g", { opacity: 0 }, g);
    fleche(sens, 238, 300, 238, 500, D.ORANGE, 11);
    fleche(sens, 726, 500, 726, 300, VERT, 11);
    /* étiquettes */
    const e1 = etiq(g, 244, 276, ["plaques d'acier", "inoxydable"], { ancre: "end", trait: [252, 298, xp(2), 330] });
    const e2 = etiq(g, 716, 276, ["embouties,", "brasées"], { trait: [710, 298, xp(5), 380] });
    const e3 = etiq(g, 244, 452, ["un canal", "sur deux"], { ancre: "end", trait: [252, 450, EC.canalX(1, 440), 440] });
    const e4 = etiq(g, 244, 276, ["liquide", "principal"], { ancre: "end", coul: "#b5431a", gras: true, trait: [252, 298, EC.canalX(2, 330), 330], coulTrait: "#b5431a" });
    const e5 = etiq(g, 716, 276, ["piquage :", "il bout"], { coul: VERT, gras: true, trait: [710, 298, EC.canalX(5, 330), 330], coulTrait: VERT });
    const e6 = etiq(g, 482, 694, "à contre-courant", { ancre: "middle", gras: true });
    /* k6 : la ligne liquide arrive par le haut, le té juste avant l'échangeur, la branche part vers l'entrée du bas */
    const SC = 0.6, CTR = [X0 + W / 2, Y0 + H / 2], CIB = [560, 440];                        // échelle du recul, centre du bloc → sa place finale
    const mapx = x => CIB[0] + (x - CTR[0]) * SC, mapy = y => CIB[1] + (y - CTR[1]) * SC;
    const xT = mapx(EC.ports.Pin[0]), yTe = 250, yPin = mapy(EC.ports.Pin[1]), xBL = mapx(EC.ports.Qin[0]), yBL = mapy(EC.ports.Qin[1]);
    const ligne = [[xT, 160], [xT, yPin + 4]], branche = [[xT, yTe], [330, yTe], [330, yBL + 36], [xBL, yBL + 36], [xBL, yBL - 4]];
    tuyauPoly(rec, branche, 18, "#a9dcc2");
    const tubeL = tuyauPoly(rec, ligne, 24, D.couleur(0.47, false));
    D.el("circle", { cx: xT, cy: yTe, r: 15, fill: "#9a5a2e" }, rec);
    D.el("circle", { cx: xT, cy: yTe, r: 8, fill: D.couleur(0.47, false) }, rec);
    const fl1 = reflets(rec, ligne, 5, 3), fl2 = reflets(rec, branche, 9, 4);
    const e7 = etiq(g, xT + 30, 200, "ligne liquide", {});
    const e8 = etiq(g, xT + 30, 276, "té", {});
    const e9 = etiq(g, 290, 470, "piquage", { ancre: "end", coul: VERT, gras: true, trait: [298, 460, 322, 460], coulTrait: VERT });
    return function (t) {
      const sRec = D.lisse((t - (T[6] - 0.2)) / 1.1), sc = D.lerp(1, SC, sRec);
      const cx = D.lerp(CTR[0], CIB[0], sRec), cy = D.lerp(CTR[1], CIB[1], sRec);
      cg.setAttribute("transform", "translate(" + (cx - CTR[0] * sc).toFixed(1) + " " + (cy - CTR[1] * sc).toFixed(1) + ") scale(" + sc.toFixed(3) + ")");
      op(rec, sRec);
      const ph = Math.max(0, t - T[4]);
      const fP = D.lisse((t - (T[4] + 0.2)) / 0.8), fQ = D.lisse((t - A(4, 0.45)) / 0.8);
      EC.maj(t, { ph: ph + 0.001, tint: D.borne((t - A(3, 0.12)) / (E[3] - A(3, 0.12) - 0.4), 0, 1), fP: fP, fQ: fQ, halo: D.fenetre(t, T[2] + 0.3, E[2] + 0.2, 0.5) * (0.75 + 0.25 * Math.sin(t * 5)) });
      fen(e1.g, t, A(2, 0.15), E[2] + 0.3); fen(e2.g, t, A(2, 0.55), E[2] + 0.3);
      fen(e3.g, t, A(3, 0.2), E[3] + 0.3);
      fen(e4.g, t, A(4, 0.1), E[4] + 0.2); fen(e5.g, t, A(4, 0.5), E[4] + 0.2);
      fen(sens, t, T[5] + 0.2, E[5] + 0.3); fen(e6.g, t, A(5, 0.15), E[5] + 0.3);
      CH.forEach(q => { // la chaleur sort du canal 2 (liquide principal) vers les canaux 1 et 3 (piquage)
        const f = D.frac(t * 0.8 + q.i * 0.33), xm = q.s < 0 ? xp(4) - 16 : xp(3) + 16; // le milieu de la flèche tombe sur la plaque
        q.maj(xm + q.s * (f * 6 - 3), q.y, q.s < 0 ? 90 : -90, D.fenetre(t, A(5, 0.4), E[5] + 0.2, 0.4) * D.fenetre(f, 0, 1, 0.25));
      });
      fl1(t, 0.45, sRec); fl2(t, 0.3, sRec);
      fen(e7.g, t, T[6] + 0.8, DUR, 0.4); fen(e8.g, t, A(6, 0.35), DUR, 0.4); fen(e9.g, t, A(6, 0.6), DUR, 0.4);
      return { temp: 0.45, etat: "liquide", humeur: "sourire" };
    };
  };
  /* =====================================================================
     3 · LES VIS — l'alvéole passe devant l'orifice économiseur, la vapeur du piquage y entre
     k0 : l'héroïne enfermée dans une alvéole ; k1 : l'alvéole arrive devant l'orifice ; k2 : des molécules vertes y entrent, la compression
     continue ; k3 : pression intermédiaire ; k4 : à l'aspiration, autant de molécules qu'avant ; k5 : refoulement, vers le séparateur.
     ===================================================================== */
  S.lesVis = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    const V = vueLongue(g, { x: 64, y: 244, k: 1.1, eco: true, nm: 5 }), dedans = V.dedans, P = V.pt, dessus = D.el("g", {}, g);
    const [xo, yo] = P(G.xEco, 292);                                          // le bas de l'orifice économiseur
    /* la ligne de l'économiseur (tube de cuivre, vapeur verte) : de la droite jusqu'au bas de l'orifice */
    const ligne = [[950, yo + 86], [xo, yo + 86], [xo, yo - 6]];
    const tube = D.el("g", { opacity: 0 }, g);
    tuyauPoly(tube, ligne, 58, "#cfeadb");
    const FL = [0, 1, 2, 3].map(() => D.el("path", { d: "M -9 5 L 0 -6 L 9 5", fill: "none", stroke: "#fff", "stroke-width": 4.5, "stroke-linecap": "round", "stroke-linejoin": "round" }, tube));
    g.appendChild(dessus);                                                     // les molécules vertes passent AU-DESSUS de la ligne
    const anneau = rect(V.devant, G.xEco - 40, 228, 80, 72, { rx: 14, fill: "none", stroke: VERT, "stroke-width": 6, opacity: 0 });
    /* la vapeur du piquage : des molécules vertes qui arrivent par la ligne, montent dans l'orifice et se logent dans l'alvéole */
    const LT = longueur(ligne), SV = longueur(ligne.slice(0, 2)) / LT, VIT = 110, ENV = 1.5;
    const GR = [[0.3, -62], [0.7, 48], [0.5, -22], [0.2, 66], [0.8, -48], [0.45, 24]].map(([fx, dy], i) => ({ fx: fx, dy: dy, te: A(2, 0.07 + 0.13 * i), m: molC(dessus, VERT) }));
    /* k4 : une autre alvéole se remplit à l'aspiration (autant de molécules qu'avant) */
    const nouv = D.el("g", { opacity: 0 }, dedans);
    D.el("polygon", { points: chev(236, 120), fill: "#fff", "fill-opacity": 0.62, stroke: "#6f8aa8", "stroke-width": 4, "stroke-linejoin": "round" }, nouv);
    const NB = [0, 1, 2, 3, 4].map(i => ({ x: 246 + G.pente * 87 * 0.5 + 18 + i * 20, y: G.yV + (i % 2 ? 1 : -1) * (24 + 14 * i), ph: i * 1.7, m: D.mol(nouv) }));
    const entree = D.el("g", { opacity: 0 }, g);                                // la flèche d'aspiration et ses molécules
    fleche(entree, 22, 338, 86, 338, BLEU, 10);
    const EN = [0, 1, 2].map(() => D.mol(entree));
    /* k5 : le train de molécules qui sort par le refoulement */
    const SO = [0, 1, 2, 3, 4, 5, 6, 7].map(i => ({ te: A(5, 0.5 + 0.05 * i), dy: (i % 4 - 1.5) * 15, m: i % 2 ? molC(dedans, VERT) : D.mol(dedans), v: i % 2 }));
    /* étiquettes et pastilles */
    const eAlv = etiq(g, 600, 222, "alvéole", { ancre: "middle", coul: D.ORANGE, gras: true, trait: [600, 232, 600, 292], coulTrait: D.ORANGE });
    const eOr = etiq(g, xo - 40, yo + 94, "orifice économiseur", { ancre: "end", coul: VERT, gras: true, trait: [xo - 32, yo + 82, xo - 34, yo + 2], coulTrait: VERT });
    const eAsp = etiq(g, 30, 500, "aspiration", { coul: BLEU, gras: true, trait: [52, 470, 52, 352], coulTrait: BLEU });
    const eRef = etiq(g, 960, 188, "vers le séparateur d'huile et le condenseur", { ancre: "end", coul: D.ORANGE, gras: true, trait: [940, 200, 940, 366], coulTrait: D.ORANGE });
    const aRef = D.el("g", { opacity: 0 }, g);
    fleche(aRef, 846, 390, 958, 390, D.ORANGE, 12);
    const pPi = D.pastille(g, 492, 742, "pression intermédiaire", VERT, 32, "middle");
    const pAsp = D.pastille(g, 492, 742, "aspiration : presque autant", BLEU, 32, "middle");
    const fv = D.el("g", { opacity: 0 }, g);                                    // flèches vertes qui montent dans l'orifice
    [-1, 1].forEach(s => fleche(fv, xo + s * 22, yo + 70, xo + s * 22, yo - 36, VERT, 7));
    /* le trajet de l'alvéole (u : 0 = fermée, 1 = au refoulement) et ce qui change dedans */
    const U = t => D.courbe([[T[0], 0.08], [E[0], 0.18], [T[1], 0.2], [E[1], 0.38], [T[2], 0.39], [E[2], 0.47], [T[3], 0.48], [E[3], 0.56], [T[4], 0.57], [E[4], 0.64], [T[5], 0.66], [E[5] + 0.2, 0.96]], t, true);
    const TEMP = t => D.courbe([[T[0], 0.2], [E[0], 0.3], [T[2], 0.3], [E[2], 0.4], [E[3], 0.42], [E[4], 0.47], [T[5], 0.5], [E[5], 0.62]], t, true);
    const ECR = t => D.courbe([[T[0], 0.15], [E[0], 0.2], [T[2], 0.3], [E[2], 0.5], [E[4], 0.55], [E[5], 0.62]], t, true);
    const DIAG = t => D.courbe([[T[0], 5], [E[0], 5.9], [T[1], 5.9], [E[1], 6], [T[2], 6], [E[2], 7], [T[3], 7], [E[4], 7.5], [T[5], 7.5], [E[5], 8]], t, true);
    return function (t) {
      const u = U(t), pc = G.poche(u), temp = TEMP(t);
      const surprise = t > T[2] - 0.2 && t < E[2] + 0.5, humeur = surprise ? "surprise" : t > A(5, 0.5) ? "chaud" : "sourire";
      const oa = 1 - D.lisse((u - 0.9) / 0.06);
      V.maj({ t: t, phase: 320 * u, alv: { xL: pc.xL, W: pc.W, temp: temp, op: oa, nmol: 5,
          halo: 0.5 * D.fenetre(t, T[1] + 0.3, E[1] + 0.6, 0.5) * (0.65 + 0.35 * Math.sin(t * 5)) },
        heroine: { s: 0.62, temp: temp, humeur: humeur, ecrase: ECR(t), regard: [1, 0] } });
      /* la ligne de l'économiseur, l'anneau vert de l'orifice (k1) */
      op(tube, D.lisse((t - (T[1] - 0.3)) / 0.8));
      FL.forEach((e, i) => { const f = D.frac(t * 0.5 + i / 4), [x, y] = suivre(ligne, f); e.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + (f > SV ? 0 : 270) + ")"); op(e, 0.85 * D.fenetre(f, 0, 1, 0.1)); });
      op(anneau, D.fenetre(t, T[1] + 0.2, E[2] + 0.4, 0.4) * (0.65 + 0.35 * Math.sin(t * 6)));
      /* k2 : les molécules vertes entrent dans l'alvéole et s'y logent */
      GR.forEach(q => {
        const dt = t - q.te;
        let x, y, o = 1;
        if (dt < 0) { const sd = LT + VIT * dt; if (sd < 0) o = 0; [x, y] = suivre(ligne, D.borne(sd / LT, 0, 1)); }
        else {
          const f = D.lisse(dt / ENV), yt = G.yV + q.dy, xt = pc.xL + G.pente * Math.abs(yt - G.yV) + q.fx * pc.W, [tx, ty] = P(xt, yt);
          x = D.lerp(xo, tx, f); y = D.lerp(yo - 6, ty, f);
          if (dt > ENV) { x += Math.cos(t * 1.9 + q.fx * 9) * 3; y += Math.sin(t * 2.3 + q.fx * 7) * 3; }
        }
        q.m(x, y, o * oa, 1.1);
      });
      fen(fv, t, T[2] + 0.2, E[2] + 0.3, 0.4);
      fen(eOr.g, t, T[1] + 0.4, E[2] + 0.4); fen(eAlv.g, t, T[0] + 0.3, E[1] + 0.2);
      eAlv.mv(V.pt(pc.xL + 48 + pc.W / 2, 44)[0], 246 + 1.1 * 44);
      /* k3-k4 */
      fen(pPi, t, T[3] + 0.2, E[3] + 0.5, 0.4);
      fen(entree, t, T[4] + 0.1, E[4] + 0.4, 0.4); fen(nouv, t, T[4] + 0.4, E[4] + 0.4, 0.4); fen(eAsp.g, t, T[4] + 0.2, E[4] + 0.4, 0.4); fen(pAsp, t, T[4] + 0.3, E[4] + 0.5, 0.4);
      EN.forEach((m, i) => { const f = D.frac(t * 0.6 + i / 3); m(D.lerp(30, 92, f), 338 + Math.sin(t * 3 + i * 2) * 9, 0.2, true, D.fenetre(f, 0, 1, 0.2)); });
      NB.forEach(q => { const [px, py] = [q.x + Math.cos(t * 1.7 + q.ph) * 4, q.y + Math.sin(t * 2.1 + q.ph) * 4]; q.m(px, py, 0.2, true, 1); });
      /* k5 : la sortie */
      fen(eRef.g, t, T[5] + 0.2, DUR, 0.4); fen(aRef, t, T[5] + 0.2, DUR, 0.4);
      SO.forEach(q => {
        const f = (t - q.te) / 1.7, x = D.lerp(676, 762, D.borne(f, 0, 1)), y = G.yV - 3 + q.dy;
        const o = f < 0 || f > 1 ? 0 : D.fenetre(f, 0, 1, 0.2);
        if (q.v) q.m(x, y, o, 0.95); else q.m(x, y, temp, true, o);
      });
      return { temp: temp, etat: "vapeur", humeur: humeur, diag: DIAG(t), diag0: 5 };
    };
  };

  /* =====================================================================
     2 · PREMIER TOUR — le liquide principal traverse l'échangeur, puis le détendeur et l'évaporateur
     k0 : devant l'entrée du haut, gros flot ; un petit flot vert part au té ; k1 : elle entre dans un canal ; k2 : sa chaleur passe au canal vert voisin ;
     k3 : elle sort en bas, sous-refroidie ; k4 : le détendeur ; k5 : l'évaporateur, plus de chaleur prise, puis vers les vis.
     ===================================================================== */
  S.premierTour = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    const X0 = 120, Y0 = 222, W = 440, H = 368;
    const EC = echangeurCoupe(g, { x: X0, y: Y0, w: W, h: H });
    const xPin = EC.ports.Pin[0], xQin = EC.ports.Qin[0], xPout = EC.ports.Pout[0], xC2 = EC.canalX(2, 400), c0 = EC.y.c0, c1 = EC.y.c1;
    const LIQ = D.couleur(0.47, false), FROID = D.couleur(0.24, false);
    /* les tuyaux : la ligne liquide arrive de la gauche, le té (x = 95), la branche du piquage, la sortie vers le détendeur */
    const tuy = D.el("g", {}, g);
    const arrivee = [[28, 188], [xPin, 188], [xPin, EC.y.Pf + 6]];
    const brT = [[95, 188], [95, 690], [xQin, 690], [xQin, EC.ports.Qin[1] - 6]];
    const sortie = [[xPout, EC.ports.Pout[1] - 8], [xPout, 672], [622, 672]];
    const serp = [[688, 672], [760, 672], [760, 565], [935, 565], [935, 495], [805, 495], [805, 425], [935, 425], [935, 355], [805, 355], [694, 355]];
    tuyauPoly(tuy, brT, 20, "#a9dcc2");
    tuyauPoly(tuy, arrivee, 30, LIQ);
    tuyauPoly(tuy, sortie, 30, FROID);
    D.el("circle", { cx: 95, cy: 188, r: 15, fill: "#9a5a2e" }, tuy);
    D.el("circle", { cx: 95, cy: 188, r: 9, fill: LIQ }, tuy);
    const rf = [reflets(tuy, arrivee, 3, 3), reflets(tuy, brT, 7, 4), reflets(tuy, sortie, 4, 5)];
    /* l'arrivée : un gros flot de voisines (liquide) ; la branche : un petit flot vert */
    const voi = [0, 1, 2, 3, 4, 5, 6].map(i => D.heroine(tuy, { r: 30, teinte: D.couleur(0.5, false), sansHalo: true, dephasage: i * 0.37 })), lA = longueur(arrivee), lB = longueur(brT);
    const vert = [0, 1, 2, 3].map(i => D.heroine(tuy, { r: 30, teinte: "#7cc49a", sansHalo: true, dephasage: i * 0.5 }));
    /* le détendeur et l'évaporateur (k4, k5) */
    const det = D.el("g", { opacity: 0 }, g);
    D.image(det, "detendeur", 598, 588, 120, 120);
    const eDet = etiq(g, 655, 566, "détendeur", { ancre: "middle", gras: true });
    const evap = D.el("g", { opacity: 0 }, g);
    rect(evap, 790, 318, 160, 280, { rx: 8, fill: "#eef4fa", stroke: "#6f8aa8", "stroke-width": 3 });
    for (let x = 800; x < 945; x += 12) D.el("line", { x1: x, y1: 324, x2: x, y2: 592, stroke: "#9fbfe0", "stroke-width": 4, opacity: 0.8 }, evap);
    tuyauPoly(evap, serp, 20, D.couleur(0.12, false));
    const rfe = reflets(evap, serp, 12, 6);
    const air = [0, 1, 2, 3].map(() => D.chevron(evap)), chal = [0, 1, 2, 3].map(() => D.chaleur(evap));
    const eAir = etiq(g, 960, 222, ["air de la", "chambre froide"], { ancre: "end", coul: BLEU, gras: true });
    const eEv = etiq(g, 870, 642, "évaporateur", { ancre: "middle", gras: true });
    const aVis = D.el("g", { opacity: 0 }, g);
    fleche(aVis, 694, 355, 590, 355, D.BLEU, 10);
    const eVis = etiq(g, 590, 318, "vers les vis", { coul: D.BLEU, gras: true });
    const pas = [D.pastille(g, 492, 742, "presque tout le fluide", D.ORANGE, 32, "middle"), D.pastille(g, 492, 742, "sous-refroidie", BLEU, 32, "middle"),
      D.pastille(g, 492, 742, "plus de chaleur prise", ROUGE, 32, "middle")];
    const CH = [0, 1, 2].map(() => D.chaleur(g));
    const mila = D.heroine(g, { r: 30 });
    /* son trajet : une seule ligne brisée, du té jusqu'aux vis */
    const route = [[62, 188], [xPin, 188], [xPin, EC.y.Pf], [xC2, EC.y.Pf], [xC2, c0], [xC2, c1], [xC2, EC.y.Po], [xPout, EC.y.Po], [xPout, EC.ports.Pout[1]], [xPout, 672], [622, 672], [688, 672]]
      .concat(serp.slice(1)).concat([[620, 355]]);
    const cum = [0]; for (let i = 1; i < route.length; i++) cum.push(cum[i - 1] + Math.hypot(route[i][0] - route[i - 1][0], route[i][1] - route[i - 1][1]));
    const LR = cum[cum.length - 1], FIN = route.length - 1; // rangs utiles de la route : 1 coude · 2 collecteur · 4-5 canal · 6-7 collecteur du bas · 9 coude de sortie · 10-11 détendeur · 12 évaporateur
    const S_ = t => D.courbe([[T[0], cum[0] + 12], [E[0], cum[1] - 20], [T[1], cum[1]], [A(1, 0.4), cum[2]], [E[1], cum[4] + 6], [T[2], cum[4] + 6], [E[2], cum[5] - 6], [T[3], cum[5]],
      [A(3, 0.3), cum[6]], [A(3, 0.55), cum[7]], [E[3], cum[9] - 10], [T[4], cum[9]], [A(4, 0.5), cum[10]], [A(4, 0.8), cum[11] + 12], [E[4], cum[12]], [T[5], cum[12] + 4], [E[5] - 0.3, cum[FIN]]], t, true);
    const echelle = s => D.courbe([[0, 0.55], [cum[1], 0.55], [cum[2] - 6, 0.46], [cum[2] + 10, 0.32], [cum[3] - 8, 0.32], [cum[3] + 12, 0.55], [cum[5] - 12, 0.55], [cum[5] + 14, 0.32], [cum[7] + 6, 0.32], [cum[8] + 12, 0.5], [cum[9], 0.55], [LR, 0.55]], s, true);
    return function (t) {
      const ph = t, s = S_(t), [x, y] = suivre(route, s / LR), sc = echelle(s);
      EC.maj(t, { ph: ph, fP: 1, fQ: 1, tint: 0 });
      rf[0](t, 0.5, 1); rf[1](t, 0.25, 1); rf[2](t, 0.4, 1);
      /* k0 : le gros flot et le petit flot vert */
      const vf = D.fenetre(t, 0, A(1, 0.5), 0.5);
      voi.forEach((m, i) => { const u = D.frac(i / 7 + t * 62 / lA), [vx, vy] = suivre(arrivee, u); m({ x: vx, y: vy, s: 0.29, t: t, humeur: "sourire", regard: [1, 0], op: vf * D.fenetre(u, 0, 1, 0.08) }); });
      vert.forEach((m, i) => { const u = D.frac(i / 4 + t * 55 / lB), [vx, vy] = suivre(brT, u); m({ x: vx, y: vy, s: 0.26, t: t, humeur: "sourire", regard: [0, 1], op: D.fenetre(u, 0, 1, 0.08) }); });
      /* k4 : le détendeur ; k5 : l'évaporateur */
      op(det, 0.2 + 0.8 * D.lisse((t - (T[4] - 0.4)) / 0.6)); fen(eDet.g, t, T[4] - 0.2, E[4] + 0.2, 0.4);
      op(evap, 0.2 + 0.8 * D.lisse((t - (T[5] - 0.4)) / 0.6)); rfe(t, 0.3, D.lisse((t - T[5]) / 0.6)); fen(eEv.g, t, T[5] - 0.2, DUR, 0.4); fen(eAir.g, t, T[5] + 0.2, DUR, 0.4);
      air.forEach((a, i) => { const f = D.frac(t * 0.7 + i / 4); a(826 + i * 36, 288 + f * 30, 0, D.BLEU, D.fenetre(f, 0, 1, 0.25) * D.fenetre(t, T[5] + 0.2, DUR, 0.4)); });
      chal.forEach((a, i) => { const f = D.frac(t * 0.8 + i / 4); a(826 + i * 36, 345 + f * 40, 0, 0.9 * D.fenetre(f, 0, 1, 0.3) * D.fenetre(t, A(5, 0.25), DUR, 0.4)); });
      fen(aVis, t, A(5, 0.6), DUR, 0.4); fen(eVis.g, t, A(5, 0.6), DUR, 0.4);
      /* k2 : la chaleur d'elle vers le canal vert voisin */
      CH.forEach((a, i) => { const f = D.frac(t * 0.8 + i / 3); a(EC.px(3, y) + 16 + (f * 12 - 6), y + (i - 1) * 40, -90, D.fenetre(t, A(2, 0.1), E[2] + 0.4, 0.4) * D.fenetre(f, 0, 1, 0.25)); });
      /* les pastilles */
      fen(pas[0], t, T[0] + 0.5, E[1] + 0.2, 0.4); fen(pas[1], t, T[3] + 0.3, E[3] + 0.5, 0.4); fen(pas[2], t, A(5, 0.3), DUR, 0.4);
      /* l'héroïne : liquide jusqu'au détendeur, puis elle bout, puis vapeur au bout de l'évaporateur */
      const temp = s < cum[4] ? 0.45 : s < cum[5] ? D.lerp(0.45, 0.3, D.lisse((s - cum[4]) / (cum[5] - cum[4]))) : s < cum[10] ? 0.3 : s < cum[12] ? D.lerp(0.3, 0.08, D.lisse((s - cum[10]) / (cum[12] - cum[10]))) : D.lerp(0.08, 0.2, D.lisse((s - cum[12]) / (LR - cum[12])));
      const etat = s < cum[11] - 10 ? "liquide" : s < cum[FIN] - 120 ? "bout" : "vapeur";
      const humeur = t < T[4] ? "sourire" : s > cum[10] - 10 && s < cum[11] + 40 ? "surprise" : s > cum[12] && s < cum[FIN] - 120 ? "froid" : "sourire";
      mila({ x: x, y: y, s: sc, t: t, temp: temp, etat: etat, humeur: humeur, regard: [1, 0.3], ecrase: sc < 0.35 ? 0.4 : 0 });
      const diag = D.courbe([[T[0], 0], [T[1], 0], [E[3], 1], [T[4], 1], [E[4], 2], [T[5], 2], [E[5], 4]], t, true);
      const carte = D.courbe([[T[0], 10.8], [E[0], 10.8], [T[1], 11], [E[3], 14], [T[4], 14], [E[4], 15], [T[5], 15], [E[5], 17.5]], t, true);
      return { temp: temp, etat: etat, humeur: humeur, diag: diag, diag0: 0, carte: carte };
    };
  };

  /* =====================================================================
     4 · LE PIQUAGE — second tour : la carte, le té, l'électrovanne, le petit détendeur, la détente
     k0 : du compresseur au té par la carte ; k1 : gros plan sur le té ; k2 : l'électrovanne (sa bobine s'allume quand le compresseur tourne) ;
     k3 : le petit détendeur et le manomètre (l'aiguille tombe de HP et s'arrête sur « intermédiaire ») ; k4 : nappe et bulles vertes après le
     petit détendeur ; k5 : tout droit jusqu'à la ligne intermédiaire, flèche vers le diagramme.
     ===================================================================== */
  S.piquage = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    const LIQ = D.couleur(0.47, false), VERTN = "#9ed3b8";
    /* ----- la carte (k0) ----- */
    const vCarte = D.el("g", {}, g);
    const cir = D.circuit(vCarte, 40, 152, 950, true);
    const wDe = t => D.courbe([[T[0] + 0.3, 4], [E[0] - 0.2, 10.35]], t, true);
    const tempDe = w => D.courbe([[4, 0.62], [7, 0.62], [7.3, 0.5], [8, 0.5], [8.7, 0.45], [10.35, 0.45]], w, true);
    /* ----- le gros plan sur le té (k1) : un tube horizontal coupé, la branche vers le bas ----- */
    const vTe = D.el("g", { opacity: 0 }, g);
    D.tube(vTe, 30, 304, 910, 100, "cuivre", false);
    const nappeTe = D.liquide(vTe, { x0: 40, x1: 930, yh: 314, yb: 394, niveau: () => 0.7, couleur: () => LIQ, pas: 14 });
    D.tube(vTe, 490, 394, 100, 296, "cuivre", true);
    rect(vTe, 500, 380, 80, 310, { fill: LIQ, opacity: 0.82 });
    const reflB = reflets(vTe, [[540, 392], [540, 680]], 6, 8);
    const VOI = [0, 1, 2, 3, 4, 5].map(i => { const y = 352 + [-6, 6, -2, 8, -8, 2][i] * 1.5; return { i: i, m: D.heroine(vTe, { r: 30, teinte: D.couleur(0.5, false), sansHalo: true, dephasage: i * 0.37 }), chemin: i === 2 || i === 4 ? [[40, y], [540, y], [540, 670]] : [[40, y], [930, y]] }; });
    const mFond = D.heroine(vTe, { r: 30 });
    const eLigne = etiq(g, 40, 290, "ligne liquide", {});
    const eTe = etiq(g, 540, 290, "té", { ancre: "middle", gras: true });
    const ePiq = etiq(g, 618, 560, "piquage", { coul: VERT, gras: true, trait: [612, 552, 594, 540], coulTrait: VERT });
    const pPart = D.pastille(g, 492, 742, "une petite part", D.ORANGE, 32, "middle");
    /* ----- la chaîne horizontale (k2 → k5) : électrovanne, petit détendeur, tube après la détente ----- */
    const vCh = D.el("g", { opacity: 0 }, g), YP = 440;
    tuyauPoly(vCh, [[30, YP], [150, YP]], 26, LIQ); tuyauPoly(vCh, [[260, YP], [440, YP]], 26, LIQ);
    const reflCh = reflets(vCh, [[30, YP], [440, YP]], 6, 12);
    D.image(vCh, "electrovanne", 110, 335, 200, 150);
    const bob = D.el("g", { opacity: 0 }, vCh);                                   // la bobine allumée
    D.el("circle", { cx: 205, cy: 380, r: 38, fill: "#ffd54a", opacity: 0.55 }, bob);
    rect(bob, 187.5, 362.5, 35, 35, { fill: "#ffd54a", stroke: "#e0a000", "stroke-width": 3 });
    D.el("line", { x1: 187.5, y1: 397.5, x2: 222.5, y2: 362.5, stroke: "#8a5a00", "stroke-width": 3 }, bob);
    const comp = D.el("g", { opacity: 0 }, vCh);
    D.image(comp, "compresseur", 560, 180, 250, 200);
    const tourne = arcVar(comp, 680, 280, 96, D.ORANGE, 9);                       // la flèche courbe qui tourne autour du petit compresseur
    const lien = D.trait(comp, 626, 336, 228, 384, D.ORANGE);
    const eEV = etiq(vCh, 30, 600, ["électrovanne :", "ouverte quand", "le compresseur tourne"], { trait: [150, 566, 190, 478] });
    const det = D.el("g", { opacity: 0 }, vCh);
    D.image(det, "detendeurEco", 400, 300, 200, 200);
    const eDet = etiq(det, 495, 322, "petit détendeur", { ancre: "middle", gras: true });
    const eMel = etiq(g, 750, 362, "liquide et vapeur", { ancre: "middle", gras: true });
    /* le manomètre : trois repères sans chiffre, une aiguille qui tombe de HP et s'arrête sur « intermédiaire » */
    const GX = 760, GY = 628, GR = 92, aBP = 150, aPI = 235, aHP = 390, rad = a => a * Math.PI / 180;
    const jauge = D.el("g", { opacity: 0 }, g);
    D.el("circle", { cx: GX, cy: GY, r: GR, fill: "#fff", stroke: D.BLEU, "stroke-width": 5 }, jauge);
    [[aBP, D.BLEU], [aPI, VERT], [aHP, D.ORANGE]].forEach(([a, coul]) => {
      D.el("line", { x1: GX + (GR - 20) * Math.cos(rad(a)), y1: GY + (GR - 20) * Math.sin(rad(a)), x2: GX + (GR - 4) * Math.cos(rad(a)), y2: GY + (GR - 4) * Math.sin(rad(a)), stroke: coul, "stroke-width": 7, "stroke-linecap": "round" }, jauge);
    });
    D.etiquette(jauge, GX + (GR + 14) * Math.cos(rad(aBP)) - 6, GY + (GR + 14) * Math.sin(rad(aBP)) + 12, "BP", { "text-anchor": "end", fill: D.BLEU, "font-weight": 700 });
    D.etiquette(jauge, GX + (GR + 14) * Math.cos(rad(aHP)) + 6, GY + (GR + 14) * Math.sin(rad(aHP)) + 12, "HP", { fill: D.ORANGE, "font-weight": 700 });
    D.etiquette(jauge, GX + (GR + 14) * Math.cos(rad(aPI)) - 4, GY + (GR + 14) * Math.sin(rad(aPI)) - 2, "intermédiaire", { "text-anchor": "end", fill: VERT, "font-weight": 700 });
    const aiguille = D.el("line", { x1: GX, y1: GY, stroke: NUIT, "stroke-width": 7, "stroke-linecap": "round" }, jauge);
    D.el("circle", { cx: GX, cy: GY, r: 9, fill: NUIT }, jauge);
    /* après le petit détendeur : un tube coupé, nappe et bulles vertes, vapeur verte au-dessus */
    const apres = D.el("g", { opacity: 0 }, vCh);
    D.tube(apres, 560, 378, 380, 124, "cuivre", false);
    const nappeA = D.liquide(apres, { x0: 568, x1: 932, yh: 388, yb: 492, niveau: () => 0.6, couleur: () => VERTN, pas: 14 });
    const bulA = D.bulles(apres, 9, 7);
    const vapA = [0, 1, 2, 3].map(() => molC(apres, VERT));
    /* k5 : la flèche vers le diagramme */
    const fl = D.el("g", { opacity: 0 }, g);
    D.el("polygon", { points: "300,598 800,598 800,568 958,628 800,688 800,658 300,658", fill: D.ORANGE, stroke: "#8f2f10", "stroke-width": 3, "stroke-linejoin": "round" }, fl);
    D.texte(fl, 550, 640, "à droite : le diagramme", { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#fff", "font-family": SANS });
    const pInt = D.pastille(g, 492, 742, "tout droit jusqu'à la ligne intermédiaire", VERT, 32, "middle");
    const mila = D.heroine(g, { r: 30 });
    const mFondA = D.heroine(apres, { r: 30 });
    return function (t) {
      const aCarte = D.fenetre(t, T[0] - 1, T[1] - 0.1, 0.5), aTe = D.fenetre(t, T[1] - 0.2, E[1] + 0.2, 0.45), aCh = D.lisse((t - (T[2] - 0.4)) / 0.6);
      op(vCarte, aCarte); op(vTe, aTe); op(vCh, aCh);
      /* ----- k0 : la carte ----- */
      const w = wDe(t), temp0 = tempDe(w), etat0 = w < 7 ? "vapeur" : w < 8.1 ? "bout" : "liquide", hum0 = w < 7.2 ? "chaud" : "sourire";
      cir.surligne("compresseur", w > 3 && w < 4.7); cir.surligne("separateurHuile", w > 5.6 && w < 6.6);
      cir.surligne("condenseur", w > 6.9 && w < 8.2); cir.surligne("bouteille", w > 8.6 && w < 9.6);
      /* ----- k1 : le té ----- */
      nappeTe.maj(t); reflB(t, 0.35, 1);
      const xh = D.courbe([[T[1], 60], [A(1, 0.5), 540], [E[1] + 0.2, 540]], t), yh = D.courbe([[T[1], 358], [A(1, 0.44), 358], [A(1, 0.6), 392], [E[1] + 0.2, 640]], t);
      VOI.forEach(q => {
        const u = D.frac(q.i / 6 + (t - T[1]) * 0.07 + 0.1), [vx, vy] = suivre(q.chemin, u);
        q.m({ x: vx, y: vy, s: 0.38, t: t, humeur: "sourire", regard: [1, 0], op: D.fenetre(u, 0, 1, 0.05) });
      });
      fen(eLigne.g, t, T[1] + 0.1, E[1], 0.4); fen(eTe.g, t, A(1, 0.3), E[1], 0.4); fen(ePiq.g, t, A(1, 0.6), E[1], 0.4); fen(pPart, t, A(1, 0.5), E[1] + 0.4, 0.4);
      /* ----- k2 → k5 : la chaîne ----- */
      reflCh(t, 0.2, 1);
      fen(comp, t, T[2], E[2] + 0.4, 0.4); fen(eEV.g, t, T[2] + 0.2, T[3] + 0.5, 0.5);
      const marche = D.lisse((t - A(2, 0.35)) / 0.4);
      const rot = marche * (t - A(2, 0.35)) * 150; tourne(rot, rot + 250);
      op(bob, marche * (0.8 + 0.2 * Math.sin(t * 7)));
      lien.setAttribute("opacity", marche.toFixed(2));
      fen(det, t, T[3] - 0.3, DUR, 0.5); fen(eDet.g, t, T[3] - 0.1, E[3] + 0.3, 0.4);
      fen(jauge, t, T[3] + 0.1, E[3] + 0.6, 0.5);
      const th = D.courbe([[0, aHP], [A(3, 0.5), aHP], [A(3, 0.7), aPI - 10], [A(3, 0.8), aPI + 5], [A(3, 0.9), aPI]], t);
      ap(aiguille, { x2: GX + 70 * Math.cos(rad(th)), y2: GY + 70 * Math.sin(rad(th)) });
      op(apres, D.lisse((t - (A(3, 0.5))) / 0.6));
      nappeA.maj(t);
      bulA(t, (q, b) => { const x = 580 + q * 340; return [x, 484, nappeA.surface(x, t) + 4, 1]; });
      vapA.forEach((m, i) => { const u = D.frac(i / 4 + t * 0.12), x = D.lerp(590, 920, u); m(x, nappeA.surface(x, t) - 18 + Math.sin(t * 2 + i) * 4, 0.9 * D.fenetre(u, 0, 1, 0.1), 0.9); });
      fen(eMel.g, t, T[4] + 0.2, E[4] + 0.2, 0.4);
      fen(fl, t, T[5] + 0.2, DUR, 0.5); fen(pInt, t, T[5] + 0.4, DUR, 0.4);
      /* ----- l'héroïne : trois vues (la carte, le té, la chaîne) ----- */
      const ecr = cir.ecran(...D.circuitPoint(w));
      const xc = D.courbe([[T[2], 60], [A(2, 0.6), 180], [E[2] - 0.2, 205], [E[2] + 0.4, 330], [T[3], 345], [A(3, 0.45), 420], [A(3, 0.62), 495], [A(3, 0.8), 590], [T[4], 610], [E[4], 800], [E[5], 920]], t);
      const dansTube = xc > 568, vCarteOn = t < T[1] - 0.3, vTeOn = !vCarteOn && t < T[2] - 0.2, vChOn = !vCarteOn && !vTeOn;
      const tempCh = t < A(3, 0.62) ? 0.45 : D.courbe([[A(3, 0.62), 0.45], [E[4], 0.25]], t, true);
      const etatCh = t < A(3, 0.66) ? "liquide" : "bout";
      const humCh = t > A(3, 0.55) && t < A(3, 0.85) ? "surprise" : t > A(3, 0.85) ? "froid" : "sourire";
      mila({ x: vCarteOn ? ecr[0] : xc, y: vCarteOn ? ecr[1] : YP, s: vCarteOn ? 0.62 : 0.5, t: t, temp: vCarteOn ? temp0 : tempCh, etat: vCarteOn ? etat0 : etatCh, humeur: vCarteOn ? hum0 : humCh,
        regard: [1, 0.2], op: vCarteOn ? aCarte : (vChOn && !dansTube ? aCh : 0) });
      mFond({ x: xh, y: yh, s: 0.62, t: t, temp: 0.45, etat: "liquide", humeur: "sourire", regard: [1, 0.2], op: vTeOn ? aTe : 0 });
      mFondA({ x: xc, y: nappeA.surface(xc, t) + 4, s: 0.55, t: t, temp: tempCh, etat: etatCh, humeur: humCh, regard: [1, 0.2], op: vChOn && dansTube ? aCh : 0 });
      const r = { temp: vCarteOn ? temp0 : vTeOn ? 0.45 : tempCh, etat: vCarteOn ? etat0 : vTeOn ? "liquide" : etatCh, humeur: vCarteOn ? hum0 : vTeOn ? "sourire" : humCh };
      r.diag = D.courbe([[T[0], 8], [E[0], 11], [T[3], 11], [E[3], 12], [DUR, 12]], t, true); r.diag0 = 8;
      r.carte = D.courbe([[T[0] + 0.3, 4], [E[0] - 0.2, 10.35], [E[0], 10.35], [T[1], 100], [E[1], 100.3], [T[2], 100.3], [E[2], 100.6], [T[3], 100.6], [E[3], 101], [T[4], 101], [DUR, 101.6]], t, true);
      return r;
    };
  };

  /* =====================================================================
     5 · JE BOUS DANS L'ÉCHANGEUR — vue du côté du piquage
     k0 : elle entre en bas dans un canal vert ; k1 : en face, à travers la plaque, le liquide principal plus chaud descend ; k2 : sa chaleur passe
     à travers la plaque, elle monte, ses bulles grossissent, la nappe de son canal baisse, le liquide principal bleuit ; k3 : sortie en haut à
     droite, vapeur un peu surchauffée ; k4 : le bulbe du petit détendeur sur le tube de sortie ; k5 : les voisines du liquide principal sourient.
     ===================================================================== */
  S.ebullition = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    const X0 = 262, Y0 = 214, W = 440, H = 380;
    const EC = echangeurCoupe(g, { x: X0, y: Y0, w: W, h: H });
    const xp = i => EC.px(i, Y0 + H / 2), CAN = 3, xq = EC.canalX(CAN, 400);          // le canal du piquage où elle bout
    const xIn = EC.ports.Qin[0], xOut = EC.ports.Qout[0], yQi = EC.y.Qi, yQo = EC.y.Qo, c0 = EC.y.c0, c1 = EC.y.c1;
    const dessus = D.el("g", {}, g);
    /* le bulbe du petit détendeur (k4) : un petit cylindre serré par deux colliers sur le tube de sortie, le capillaire jusqu'au petit détendeur */
    const bulbe = D.el("g", { opacity: 0 }, g);
    D.el("polyline", { points: pts([[698, 176], [698, 158], [884, 158], [884, 216]]), fill: "none", stroke: "#000", "stroke-width": 3, "stroke-linejoin": "round" }, bulbe);
    D.image(bulbe, "detendeurEco", 836, 196, 100, 100);
    rect(bulbe, 688, 172, 22, 62, { rx: 10, fill: "url(#vm-acier-h)", stroke: "#39424c", "stroke-width": 3 });
    [184, 220].forEach(y => rect(bulbe, 630, y - 4, 84, 8, { rx: 3, fill: "#39424c" }));
    const eBulbe = etiq(g, 730, 330, ["bulbe du petit", "détendeur"], { gras: true, trait: [728, 318, 708, 236] });
    const eFace = etiq(g, 244, 276, ["liquide principal,", "plus chaud"], { ancre: "end", coul: "#b5431a", gras: true, trait: [252, 298, EC.canalX(2, 330), 330], coulTrait: "#b5431a" });
    const eEntree = etiq(g, 300, 698, "entrée du piquage", { ancre: "end", coul: VERT, gras: true, trait: [308, 688, xIn - 6, EC.ports.Qin[1] + 2], coulTrait: VERT });
    const pSurch = D.pastille(g, 492, 742, "vapeur un peu surchauffée", VERT, 32, "middle");
    const pFroid = D.pastille(g, 492, 742, "je fais du froid pour les autres", BLEU, 32, "middle");
    /* la chaleur du liquide principal vers elle (k2) */
    const CH = [];
    [-1, 1].forEach(s => [0, 1].forEach(i => CH.push({ s: s, i: i, maj: D.chaleur(dessus) })));
    /* k5 : les voisines du liquide principal, plus froides, descendent dans leurs canaux en souriant */
    const VF = [[0, 0.1], [2, 0.55], [4, 0.3], [6, 0.8]].map(([cn, ph], i) => ({ cn: cn, ph: ph, m: D.heroine(dessus, { r: 30, teinte: "#d6e8fa", sansHalo: true, dephasage: i * 0.4 }) }));
    const mila = D.heroine(dessus, { r: 30 });
    /* son trajet : le raccord du bas, le collecteur, son canal, le collecteur du haut, le raccord de sortie */
    const route = [[xIn, EC.ports.Qin[1] + 4], [xIn, yQi], [xq, yQi], [xq, yQo], [xOut, yQo], [xOut, 198]];
    const cum = [0]; for (let i = 1; i < route.length; i++) cum.push(cum[i - 1] + Math.hypot(route[i][0] - route[i - 1][0], route[i][1] - route[i - 1][1]));
    const sDe = t => D.courbe([[T[0], 0], [E[0], cum[1]], [T[1], cum[1]], [A(1, 0.55), cum[2]], [E[1], cum[2] + 30], [T[2], cum[2] + 30], [E[2] - 0.2, cum[3] - 8], [T[3], cum[3]], [A(3, 0.45), cum[4]], [E[3] + 0.3, cum[5]], [DUR, cum[5]]], t, true);
    const echelle = s => D.courbe([[0, 0.5], [cum[1] - 10, 0.5], [cum[1] + 8, 0.3], [cum[2] - 12, 0.3], [cum[2] + 14, 0.45], [cum[3] - 20, 0.46], [cum[3] + 8, 0.3], [cum[4] - 8, 0.3], [cum[4] + 22, 0.45], [cum[5], 0.45]], s, true);
    return function (t) {
      const ph = t, bleu = D.lisse((t - A(2, 0.1)) / (E[2] - A(2, 0.1)));
      const niv = D.lerp(0.86, 0.5, D.lisse((t - A(2, 0.1)) / (E[2] - A(2, 0.1))));
      const lv = [0.86, 0.86, 0.86, 0.86]; lv[(CAN - 1) / 2] = niv;
      EC.maj(t, { ph: ph, fP: D.lisse((t - (T[1] + 0.3)) / 0.8), fQ: 1, bleu: bleu, lv: lv });
      const s = sDe(t), [x, y] = suivre(route, s / cum[cum.length - 1]), sc = echelle(s);
      /* k1 : étiquettes */
      fen(eEntree.g, t, T[0] + 0.3, E[1] - 0.5, 0.4); fen(eFace.g, t, T[1] + 0.5, E[1] + 0.3, 0.4);
      /* k2 : la chaleur */
      CH.forEach(q => {
        const f = D.frac(t * 0.8 + q.i * 0.5), yy = y + (q.i ? 38 : -38), xm = q.s < 0 ? xp(4) - 16 : xp(3) + 16;
        q.maj(xm + q.s * (f * 6 - 3), D.borne(yy, c0 + 20, c1 - 20), q.s < 0 ? 90 : -90, D.fenetre(t, A(2, 0.12), E[2] - 0.1, 0.4) * D.fenetre(f, 0, 1, 0.25));
      });
      /* k3 : la pastille ; k4 : le bulbe ; k5 : les voisines et la pastille */
      fen(pSurch, t, T[3] + 0.3, E[3] + 0.5, 0.4);
      fen(bulbe, t, T[4] + 0.2, DUR, 0.5); fen(eBulbe.g, t, A(4, 0.45), DUR, 0.4);
      VF.forEach(q => {
        const f = D.frac(t * 0.07 + q.ph), yy = c0 + 36 + f * (c1 - c0 - 72);
        q.m({ x: EC.canalX(q.cn, yy), y: yy, s: 0.42, t: t, humeur: "sourire", regard: [0, 0.4], op: D.fenetre(t, T[5] + 0.1, DUR, 0.5) * D.fenetre(f, 0, 1, 0.08) });
      });
      fen(pFroid, t, T[5] + 0.4, DUR, 0.4);
      /* l'héroïne : elle bout dans son canal, devient vapeur au-dessus de la nappe */
      const temp = D.courbe([[T[0], 0.25], [E[2], 0.25], [E[3], 0.28]], t, true), etat = s < cum[3] - 4 ? "bout" : "vapeur";
      const humeur = t < T[2] ? "froid" : "sourire";
      mila({ x: x, y: y, s: sc, t: t, temp: temp, etat: etat, humeur: humeur, regard: [0, -0.6], ecrase: sc < 0.35 ? 0.4 : 0 });
      const diag = D.courbe([[T[0], 12], [E[2], 12.9], [T[3], 12.9], [E[3], 13], [DUR, 13]], t, true);
      const carte = D.courbe([[T[0], 102], [E[3], 103], [DUR, 103]], t, true);
      return { temp: temp, etat: etat, humeur: humeur, diag: diag, diag0: 12, carte: carte };
    };
  };

})();
