/* =====================================================================
   voyage-regulation-scenes-b.js — scènes 5 à 9 de « la régulation d'une
   centrale » : tempo, journee, permutation, delestage, ventilateurs
   ---------------------------------------------------------------------
   CONTRAT : voyage-regulation/BRIEF-SCENES.md. Chaque scène : S[id](g, c)
   pose le décor une fois, rend maj(t) = fonction pure de t. Zone de la
   scène : x 20 → 965, y 150 → 760 (la colonne de droite appartient aux
   courbes). Les compresseurs et ventilateurs dessinés suivent
   D.regul(w).marche, avec le MÊME w que celui rendu en `diag` : ils
   démarrent à l'instant où la courbe le montre.
   PIÈGE 1 : D.regul(w, w0) — donner w0 (début de l'épisode) pour que
   w = 40 ou 50 (frontière) reste dans le bon épisode.
   PIÈGE 2 : les vignettes (« scène seule ») sont des principes dessinés à
   part, avec leurs propres mini-compresseurs : elles ne touchent jamais
   aux compresseurs de la centrale, qui restent ceux des courbes.
   PIÈGE 3 (permutation) : le brief donne D.temps(c, t, 10, 40, 0, 3) ;
   avec ce calage C3 démarre dans la phrase 0 et C2 s'arrête dans la
   phrase 3, alors que le récit les place en 1 et en 2. Le calage est donc
   posé par repères, accrochés aux phrases (voir S.permutation).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const el = D.el, cl = D.borne;
  const BP = "#2f6fb8", OR = D.ORANGE, ROUGE = "#e74c3c", ROUGEF = "#c0392b", VERT = "#2ecc71", VERTF = "#1e7e54", GRIS = "#637285", ENCRE = "#10233c", HEURES = "#e8914a";
  let nid = 0;
  const uid = p => "rb-" + p + "-" + (++nid);

  /* ---------- petites aides locales ---------- */
  const txt = (p, x, y, s, at) => D.etiquette(p, x, y, s, Object.assign({ "font-weight": 700 }, at || {}));
  const op = (e, v) => e.setAttribute("opacity", v.toFixed(2));
  /* fenêtre de visibilité : de la phrase a jusqu'au début de la phrase b + 1 */
  const fen = (c, t, a, b, du) => D.fenetre(t, c.T[a], b + 1 < c.T.length ? c.T[b + 1] - 0.1 : c.D, du);
  /* pastilles du bas (y 748) : [texte, couleur, phrase a, phrase b, x?, ancre?] */
  const past = (g, liste, x, ancre) => liste.map(([s, coul, a, b, px, an]) => ({ g: D.pastille(g, px === undefined ? x : px, 748, s, coul, 30, an || ancre || "middle"), a, b }));
  const montrer = (c, t, liste) => liste.forEach(p => op(p.g, fen(c, t, p.a, p.b)));
  /* un temps w par tronçons : [phrase début, phrase fin, w début, w fin] ; entre deux tronçons, w reste où il est */
  const suite = (c, segs) => t => {
    let w = segs[0][2];
    for (const [k0, k1, a, b] of segs) { if (t < c.T[k0]) return w; w = D.temps(c, t, a, b, k0, k1); if (t < c.E[k1]) return w; }
    return w;
  };
  /* l'instant où une fonction croissante de t atteint x (bissection) */
  const quand = (f, x, fin) => { let a = 0, b = fin; for (let i = 0; i < 40; i++) { const m = (a + b) / 2; if (f(m) < x) a = m; else b = m; } return b; };
  const densite = v => cl((v + 2.1) / 4, 0, 1);

  function fleche(p, x1, y1, x2, y2, coul, ep) {
    ep = ep || 10;
    const a = Math.atan2(y2 - y1, x2 - x1), L = ep * 2.6, q = el("g", {}, p), pt = d => [x2 - L * Math.cos(a + d), y2 - L * Math.sin(a + d)];
    el("line", { x1: x1, y1: y1, x2: x2 - Math.cos(a) * L * 0.6, y2: y2 - Math.sin(a) * L * 0.6, stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, q);
    const [ax, ay] = pt(0.5), [bx, by] = pt(-0.5);
    el("path", { d: "M " + x2 + " " + y2 + " L " + ax.toFixed(1) + " " + ay.toFixed(1) + " L " + bx.toFixed(1) + " " + by.toFixed(1) + " Z", fill: coul, stroke: coul, "stroke-width": 2, "stroke-linejoin": "round" }, q);
    return q;
  }
  const croix = (p, x, y, r, coul, ep) => {
    const q = el("g", { opacity: 0 }, p);
    [[-1, -1, 1, 1], [-1, 1, 1, -1]].forEach(([a, b, c2, d]) => el("line", { x1: x + a * r, y1: y + b * r, x2: x + c2 * r, y2: y + d * r, stroke: coul || ROUGE, "stroke-width": ep || 9, "stroke-linecap": "round" }, q));
    return q;
  };
  const anneau = (p, x, y, rx, ry, coul) => el("ellipse", { cx: x, cy: y, rx: rx, ry: ry, fill: "none", stroke: coul, "stroke-width": 7, opacity: 0 }, p);
  /* un symbole de D.ORGANES posé par son axe (même pose que moteur/voyage-regulation-dessin.js) */
  function sym(p, nom, x, y, s, rot) {
    const o = D.ORGANES[nom], [vx, vy, vl, vh] = o.vb, [ax, ay] = o.axe;
    const q = el("g", { transform: "translate(" + x + " " + y + ") rotate(" + (rot || 0) + ") scale(" + s + ") translate(" + (-ax) + " " + (-ay) + ")" }, p);
    D.image(q, nom, vx, vy, vl, vh);
    return q;
  }
  function tuyau(p, pts, large) {
    const d = pts.map(q => q.join(",")).join(" ");
    el("polyline", { points: d, fill: "none", stroke: "#8a4a24", "stroke-width": large ? 16 : 13, "stroke-linejoin": "round" }, p);
    el("polyline", { points: d, fill: "none", stroke: "#e7a978", "stroke-width": large ? 6 : 5, "stroke-linejoin": "round" }, p);
  }
  /* anneau autour du compresseur i d'une vueCentrale (x0, y0, k) */
  const autour = (p, vc, k, i, coul) => { const [x, y] = vc.ou.compresseur(i); return anneau(p, x, y - 15 * k, 92 * k, 84 * k, coul); };

  /* LA COLONNE : jauge verticale (basse pression en bleu, haute pression en orange), bande de la zone neutre,
     traits nommés, niveau qui monte et descend avec D.regul. o : { x, y, l, h, lo, hi, coul, titre, bande: [bas, haut], traits: [[v, nom|null, tirets]] } */
  function colonne(g, o) {
    const Y = v => o.y + o.h - (cl(v, o.lo, o.hi) - o.lo) / (o.hi - o.lo) * o.h, cid = uid("col");
    el("clipPath", { id: cid }, g).appendChild(el("rect", { x: o.x + 3, y: o.y + 3, width: o.l - 6, height: o.h - 6, rx: 13 }));
    el("rect", { x: o.x, y: o.y, width: o.l, height: o.h, rx: 16, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, g);
    const dedans = el("g", { "clip-path": "url(#" + cid + ")" }, g);
    el("rect", { x: o.x, y: Y(o.bande[1]), width: o.l, height: Y(o.bande[0]) - Y(o.bande[1]), fill: o.coul, opacity: 0.2 }, dedans);
    const niveau = el("rect", { x: o.x, width: o.l, fill: o.coul, opacity: 0.5 }, dedans);
    const surf = el("line", { x1: o.x, x2: o.x + o.l, stroke: o.coul, "stroke-width": 4 }, dedans);
    const traits = el("g", {}, g);
    o.traits.forEach(([v, nom, tirets]) => {
      el("line", { x1: o.x - 8, y1: Y(v), x2: o.x + o.l + 8, y2: Y(v), stroke: o.coul, "stroke-width": 3.5, "stroke-dasharray": tirets }, traits);
      if (nom) txt(traits, o.x + o.l + 16, Y(v) + 10, nom, { "font-size": 28, fill: o.coul });
    });
    txt(g, o.x, o.y - 14, o.titre, { "font-size": 30, fill: o.coul });
    const pt = el("circle", { cx: o.x + o.l / 2, r: 12, fill: OR, stroke: "#fff", "stroke-width": 3 }, g);
    return { traits: traits, Y: Y, maj: v => {
      const y = Y(v);
      niveau.setAttribute("y", y.toFixed(1)); niveau.setAttribute("height", Math.max(0, o.y + o.h - y).toFixed(1));
      surf.setAttribute("y1", y.toFixed(1)); surf.setAttribute("y2", y.toFixed(1)); pt.setAttribute("cy", y.toFixed(1));
    } };
  }

  /* LA GRANDE HORLOGE : cadran, secteur orange qui se remplit (f de 0 à 1), aiguille */
  function horloge(p, cx, cy, r) {
    const q = el("g", {}, p), e = Math.max(3, r * 0.06);
    el("circle", { cx: cx, cy: cy, r: r, fill: "#fff", stroke: D.BLEU, "stroke-width": e }, q);
    const secteur = el("path", { fill: "rgba(201,69,26,.8)" }, q);
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6, l = i % 3 ? r * 0.12 : r * 0.2;
      el("line", { x1: cx + Math.sin(a) * (r - 4), y1: cy - Math.cos(a) * (r - 4), x2: cx + Math.sin(a) * (r - 4 - l), y2: cy - Math.cos(a) * (r - 4 - l), stroke: D.BLEU, "stroke-width": i % 3 ? 2 : 3.5 }, q);
    }
    const aig = el("line", { x1: cx, y1: cy, x2: cx, y2: cy - r * 0.75, stroke: D.BLEU, "stroke-width": e, "stroke-linecap": "round" }, q);
    el("circle", { cx: cx, cy: cy, r: Math.max(4, r * 0.08), fill: D.BLEU }, q);
    return { g: q, maj: f => {
      f = cl(f, 0, 1);
      const a = f * 2 * Math.PI, rr = r - 3;
      secteur.setAttribute("d", f < 0.002 ? "" : f > 0.998
        ? "M " + cx + " " + (cy - rr) + " A " + rr + " " + rr + " 0 1 1 " + cx + " " + (cy + rr) + " A " + rr + " " + rr + " 0 1 1 " + cx + " " + (cy - rr) + " Z"
        : "M " + cx + " " + cy + " L " + cx + " " + (cy - rr) + " A " + rr + " " + rr + " 0 " + (a > Math.PI ? 1 : 0) + " 1 " + (cx + rr * Math.sin(a)).toFixed(1) + " " + (cy - rr * Math.cos(a)).toFixed(1) + " Z");
      aig.setAttribute("x2", (cx + Math.sin(a) * r * 0.75).toFixed(1)); aig.setAttribute("y2", (cy - Math.cos(a) * r * 0.75).toFixed(1));
    } };
  }

  /* UN SABLIER : f de 0 à 1 = part du sable tombée */
  function sablier(p, cx, cy) {
    const q = el("g", { transform: "translate(" + cx + " " + cy + ")" }, p), i1 = uid("sa"), i2 = uid("sb");
    el("clipPath", { id: i1 }, q).appendChild(el("path", { d: "M -20 -30 H 20 L 3 0 L -3 0 Z" }));
    el("clipPath", { id: i2 }, q).appendChild(el("path", { d: "M -3 0 L 3 0 L 20 30 H -20 Z" }));
    const haut = el("rect", { x: -20, width: 40, fill: "#e0b050", "clip-path": "url(#" + i1 + ")" }, q);
    const bas = el("rect", { x: -20, width: 40, fill: "#e0b050", "clip-path": "url(#" + i2 + ")" }, q);
    const fil = el("line", { x1: 0, x2: 0, y1: 0, stroke: "#e0b050", "stroke-width": 3 }, q);
    el("path", { d: "M -20 -30 H 20 L 3 0 L 20 30 H -20 L -3 0 Z", fill: "rgba(159,191,224,.25)", stroke: D.BLEU, "stroke-width": 4, "stroke-linejoin": "round" }, q);
    el("rect", { x: -26, y: -37, width: 52, height: 8, rx: 3, fill: "url(#vm-laiton)", stroke: D.BLEU, "stroke-width": 2 }, q);
    el("rect", { x: -26, y: 29, width: 52, height: 8, rx: 3, fill: "url(#vm-laiton)", stroke: D.BLEU, "stroke-width": 2 }, q);
    return f => {
      f = cl(f, 0, 1);
      haut.setAttribute("y", (-30 + 30 * f).toFixed(1)); haut.setAttribute("height", (30 - 30 * f).toFixed(1));
      bas.setAttribute("y", (30 - 30 * f).toFixed(1)); bas.setAttribute("height", (30 * f).toFixed(1));
      fil.setAttribute("y2", f > 0.01 && f < 0.99 ? 30 : 0);
    };
  }

  /* LE COUPEUR : une boîte de sécurité (pressostat) à part, un fil rouge, un interrupteur, un petit compresseur
     (symbole + flèche qui tourne). maj(t, ouvert 0-1, marche) : l'interrupteur s'ouvre, le compresseur s'arrête.
     Largeur totale : lb + 172. Vignette : jamais relié à la centrale. */
  function coupeur(p, x, y, nom, lb) {
    const q = el("g", {}, p), ym = y + 25, xs = x + lb + 30, xe = xs + 46;
    el("rect", { x: x, y: y, width: lb, height: 50, rx: 10, fill: "#fff", stroke: ROUGEF, "stroke-width": 4 }, q);
    txt(q, x + lb / 2, y + 35, nom, { "font-size": 28, "text-anchor": "middle", fill: ROUGEF });
    el("line", { x1: x + lb, y1: ym, x2: xs, y2: ym, stroke: ROUGEF, "stroke-width": 4 }, q);
    el("circle", { cx: xs, cy: ym, r: 5, fill: ROUGEF }, q);
    const lame = el("line", { x1: xs, y1: ym, stroke: ROUGEF, "stroke-width": 4, "stroke-linecap": "round" }, q);
    el("circle", { cx: xe, cy: ym, r: 5, fill: ROUGEF }, q);
    el("line", { x1: xe, y1: ym, x2: xe + 28, y2: ym, stroke: ROUGEF, "stroke-width": 4 }, q);
    D.image(q, "compresseur", xe + 28, ym - 27, 68, 54);
    const tourne = el("path", { d: "M 14 0 A 14 14 0 1 1 0 -14 m -6 -5 l 6 5 l -6 5", fill: "none", "stroke-width": 4, "stroke-linecap": "round" }, q);
    return { g: q, maj: (t, ouvert, marche) => {
      const a = ouvert * 0.62;
      lame.setAttribute("x2", (xs + 46 * Math.cos(a)).toFixed(1)); lame.setAttribute("y2", (ym - 46 * Math.sin(a)).toFixed(1));
      tourne.setAttribute("transform", "translate(" + (xe + 62) + " " + (ym - 44) + ") rotate(" + (marche ? t * 300 % 360 : 0).toFixed(1) + ")");
      tourne.setAttribute("stroke", marche ? VERT : "#9aa7b5");
    } };
  }

  /* UN MEUBLE (vitrine) : étagères de produits qui se remplissent, porte vitrée qui s'ouvre, rideau de nuit qui descend.
     o : { produits: [couleurs], graine, porte: bool } → { maj({ remplissage 0-1, porte 0-1, rideau 0-1 }) } */
  function meuble(g, x, y, l, h, o) {
    const m = el("g", {}, g), fx = x + 8, fy = y + 14, fl = l - 16, fh = h - 24, rangs = h > 90 ? 3 : 2, A = D.alea(o.graine || 3), prods = [];
    el("rect", { x: x, y: y, width: l, height: h, rx: 8, fill: "url(#vm-acier)" }, m);
    el("rect", { x: fx, y: fy, width: fl, height: fh, rx: 4, fill: "#eaf4fb", stroke: "#56636f", "stroke-width": 2 }, m);
    const nb = Math.max(3, Math.floor(fl / 28)), ph = Math.min(24, fh / rangs - 9);
    for (let r = 0; r < rangs; r++) {
      const yy = fy + (r + 1) * fh / rangs;
      for (let i = 0; i < nb; i++) prods.push({ th: A(), e: el("rect", { x: fx + 3 + i * (fl - 6) / nb, y: yy - 4 - ph, width: (fl - 6) / nb - 4, height: ph, rx: 3, fill: o.produits[(i + r) % o.produits.length], stroke: "rgba(0,0,0,.25)", "stroke-width": 1.5 }, m) });
      el("line", { x1: fx, y1: yy - 2, x2: fx + fl, y2: yy - 2, stroke: "#56636f", "stroke-width": 3 }, m);
    }
    const porte = o.porte ? el("polygon", { fill: "rgba(150,200,230,.38)", stroke: "#56636f", "stroke-width": 3, "stroke-linejoin": "round" }, m) : null;
    const cid = uid("rid"), cr = el("rect", { x: fx, y: fy, width: fl, height: 0 }, el("clipPath", { id: cid }, m));
    const rideau = el("g", { "clip-path": "url(#" + cid + ")" }, m);
    el("rect", { x: fx, y: fy, width: fl, height: fh, fill: "#5b6b82" }, rideau);
    for (let yy = fy + 8; yy < fy + fh; yy += 11) el("line", { x1: fx, y1: yy, x2: fx + fl, y2: yy, stroke: "#3d4b61", "stroke-width": 2.5 }, rideau);
    return { maj: p => {
      const rem = p.remplissage === undefined ? 1 : p.remplissage;
      prods.forEach(q => q.e.setAttribute("opacity", D.lisse((0.35 + 0.65 * rem - q.th) / 0.12).toFixed(2)));
      if (porte) {
        const a = p.porte || 0, cx = Math.cos(a * 1.15), e = a * 9;
        porte.setAttribute("points", [[fx, fy], [fx + fl * cx, fy - e], [fx + fl * cx, fy + fh + e], [fx, fy + fh]].map(q => q[0].toFixed(1) + "," + q[1].toFixed(1)).join(" "));
      }
      cr.setAttribute("height", (fh * (p.rideau || 0)).toFixed(1));
    } };
  }

  /* UN CLIENT et UN CHARIOT (dessinés, pas des bâtons) */
  function client(g, coul) {
    const q = el("g", {}, g);
    const jg = el("rect", { x: -7, y: 14, width: 6, height: 15, rx: 3, fill: "#2b3a55" }, q), jd = el("rect", { x: 1, y: 14, width: 6, height: 15, rx: 3, fill: "#2b3a55" }, q);
    el("rect", { x: -11, y: -8, width: 22, height: 27, rx: 9, fill: coul, stroke: ENCRE, "stroke-width": 1.5 }, q);
    el("circle", { cx: 0, cy: -17, r: 9, fill: "#f2c9a0", stroke: ENCRE, "stroke-width": 1.5 }, q);
    el("rect", { x: 9, y: 3, width: 15, height: 12, rx: 2, fill: "#c9a15b", stroke: "#8a6a2c", "stroke-width": 1.5 }, q);
    return (x, y, sens, ph) => {
      q.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") scale(" + (1.3 * sens) + " 1.3)");
      jg.setAttribute("y", (14 + Math.sin(ph) * 3).toFixed(1)); jd.setAttribute("y", (14 - Math.sin(ph) * 3).toFixed(1));
    };
  }
  function chariot(g) {
    const q = el("g", {}, g);
    el("rect", { x: -26, y: -20, width: 52, height: 22, rx: 4, fill: "#c9a15b", stroke: "#8a6a2c", "stroke-width": 2 }, q);
    ["#e8914a", "#2f6fb8", "#e8914a"].forEach((cl2, i) => el("rect", { x: -22 + i * 15, y: -34, width: 13, height: 14, rx: 2, fill: cl2, stroke: "rgba(0,0,0,.3)", "stroke-width": 1.5 }, q));
    [-15, 15].forEach(cx => el("circle", { cx: cx, cy: 8, r: 6, fill: ENCRE }, q));
    el("path", { d: "M 26 -14 L 38 -36", fill: "none", stroke: "#56636f", "stroke-width": 4, "stroke-linecap": "round" }, q);
    return (x, y) => q.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ")");
  }

  const mol = D.couleur;
  const MIL = () => window.VOYAGE_DIAGRAMME.episodes[1];

  /* =====================================================================
     5 · les temporisations
     ===================================================================== */
  S.tempo = function (g, c) {
    const k = 0.72, X0 = 318, Y0 = 178;
    const col = colonne(g, { x: 56, y: 222, l: 100, h: 490, lo: -2, hi: 2, coul: BP, titre: "basse pression", bande: [-1, 1],
      traits: [[1, "seuil haut", "3 5"], [0, "consigne", "10 7"], [-1, "seuil bas", "3 5"]] });
    const vc = D.vueCentrale(g, X0, Y0, k);
    const bague = autour(g, vc, k, 2, VERT);
    const horl = horloge(g, 404, 640, 86);
    txt(g, 404, 546, "temporisation", { "text-anchor": "middle", "font-size": 30, fill: OR });
    el("rect", { x: 510, y: 528, width: 450, height: 178, rx: 18, fill: "#fffdf8", stroke: "rgba(27,58,99,.25)", "stroke-width": 2 }, g);

    /* k0-k1 : la chaîne « seuil franchi → on attend → un compresseur de plus » (s'allume avec les courbes) */
    const chaine = el("g", {}, g), BX = [522, 672, 822], boites = BX.map((bx, i) => {
      const b = el("g", {}, chaine), cadre = el("rect", { x: bx, y: 540, width: 120, height: 156, rx: 14, fill: "#fff", "stroke-width": 4 }, b);
      [["seuil", "franchi"], ["on", "attend"], ["un", "de plus"]][i].forEach((s, j) => txt(b, bx + 60, 652 + j * 33, s, { "text-anchor": "middle", "font-size": 28, fill: ENCRE }));
      return { b: b, cadre: cadre };
    });
    [0, 1].forEach(i => fleche(chaine, BX[i] + 126, 590, BX[i + 1] - 6, 590, GRIS, 6));
    el("rect", { x: 570, y: 552, width: 24, height: 64, rx: 6, fill: "#fff", stroke: D.BLEU, "stroke-width": 3 }, boites[0].b);
    const niv1 = el("rect", { x: 573, width: 18, fill: BP, opacity: 0.6 }, boites[0].b);
    el("line", { x1: 564, y1: 568, x2: 600, y2: 568, stroke: BP, "stroke-width": 3, "stroke-dasharray": "3 4" }, boites[0].b);
    const hp = horloge(boites[1].b, 732, 590, 34);
    D.image(boites[2].b, "compresseur", 846, 562, 72, 58);

    /* k2 et k3 : « rien démarré pour rien », « avant d'arrêter, aussi » : un niveau qui dépasse, puis redescend, l'horloge s'arrête à moitié */
    function vignetteSeuil(sens, nom) {
      const q = el("g", { opacity: 0 }, g), base = sens > 0 ? 650 : 592, thr = sens > 0 ? 600 : 638, amp = 84, Yc = s => base - sens * amp * Math.pow(Math.sin(Math.PI * s), 2);
      el("rect", { x: 524, y: 546, width: 180, height: 144, rx: 8, fill: "#fff", stroke: GRIS, "stroke-width": 2 }, q);
      el("line", { x1: 524, y1: thr, x2: 704, y2: thr, stroke: BP, "stroke-width": 3.5, "stroke-dasharray": "3 5" }, q);
      txt(q, 714, thr + 10, nom, { "font-size": 28, fill: BP });
      const s1 = Math.asin(Math.sqrt(Math.abs(base - thr) / amp)) / Math.PI, s2 = 1 - s1;
      const trace = el("path", { fill: "none", stroke: D.BLEU, "stroke-width": 4.5, "stroke-linejoin": "round", "stroke-linecap": "round" }, q);
      const pt = el("circle", { r: 9, fill: OR, stroke: "#fff", "stroke-width": 3 }, q), hv = horloge(q, 904, 618, 34);
      return { g: q, maj: u => {
        let d = "";
        for (let i = 0; i <= 48; i++) { const s = u * i / 48; d += (i ? " L " : "M ") + (534 + 160 * s).toFixed(1) + " " + Yc(s).toFixed(1); }
        trace.setAttribute("d", d); pt.setAttribute("cx", (534 + 160 * u).toFixed(1)); pt.setAttribute("cy", Yc(u).toFixed(1));
        hv.maj(0.5 * cl((u - s1) / (s2 - s1), 0, 1));
      } };
    }
    const v2 = vignetteSeuil(1, "seuil haut"), v3 = vignetteSeuil(-1, "seuil bas");

    /* k4 : après le démarrage, une seconde horloge : « laisser réagir » */
    const v4 = el("g", { opacity: 0 }, g);
    D.image(v4, "compresseur", 524, 566, 72, 58);
    txt(v4, 560, 664, "C3", { "text-anchor": "middle", "font-size": 30, fill: VERTF });
    fleche(v4, 616, 596, 700, 596, GRIS, 8);
    const h2 = horloge(v4, 800, 598, 52);
    txt(v4, 800, 684, "laisser réagir", { "text-anchor": "middle", "font-size": 28, fill: OR });

    /* k5 : sur C4, deux sabliers : marche mini, arrêt mini */
    const v5 = el("g", { opacity: 0 }, g), bagueC4 = autour(g, vc, k, 3, OR);
    D.image(v5, "compresseur", 698, 560, 72, 58);
    txt(v5, 734, 664, "C4", { "text-anchor": "middle", "font-size": 30, fill: OR });
    const sa = sablier(v5, 600, 596), sb = sablier(v5, 878, 596);
    D.trait(v5, 690, 590, 646, 590); D.trait(v5, 778, 590, 826, 590);
    txt(v5, 600, 674, "marche mini", { "text-anchor": "middle", "font-size": 28, fill: ENCRE });
    txt(v5, 878, 674, "arrêt mini", { "text-anchor": "middle", "font-size": 28, fill: ENCRE });

    /* k6 : flèche vers la droite : la petite horloge (celle des courbes) */
    const v6 = el("g", { opacity: 0 }, g);
    txt(v6, 745, 606, "la petite horloge", { "text-anchor": "middle", fill: OR });
    fleche(v6, 540, 650, 946, 650, OR, 14);

    const pas = past(g, [["rien démarré pour rien", BP, 2, 2], ["avant d'arrêter, aussi", BP, 3, 3], ["un à la fois", OR, 4, 4]], 735);
    const W = suite(c, [[0, 0, 13.5, 14.8], [1, 1, 14.8, 16.2], [2, 5, 16.2, 17], [6, 6, 15.0, 16.2]]);
    const tDem = quand(t => (t < c.T[6] ? W(t) : 0), 15.9, c.T[6]), tDem6 = c.T[6] + (c.E[6] - c.T[6]) * (15.9 - 15) / 1.2;
    return function (t) {
      const w = W(t), r = D.regul(w, 10), v = r.valeur;
      col.maj(v);
      vc.maj({ t: t, marche: r.marche, defaut: null, densite: densite(v), temp: 0.15 });
      horl.maj(r.tempo);
      op(bague, Math.max(D.fenetre(t, tDem - 0.2, tDem + 2.6, 0.3), D.fenetre(t, tDem6 - 0.2, tDem6 + 2.2, 0.3)));
      op(chaine, fen(c, t, 0, 1));
      const lit = [D.lisse((v - 0.95) / 0.1), r.tempo > 0 && r.tempo < 1 ? 1 : 0, r.marche[2] ? 1 : 0];
      boites.forEach((b, i) => { b.cadre.setAttribute("stroke", lit[i] > 0.5 ? OR : "rgba(27,58,99,.3)"); op(b.b, 0.45 + 0.55 * lit[i]); });
      niv1.setAttribute("y", (616 - 64 * (cl(v, -2, 2) + 2) / 4).toFixed(1)); niv1.setAttribute("height", (64 * (cl(v, -2, 2) + 2) / 4).toFixed(1));
      hp.maj(r.tempo);
      op(v2.g, fen(c, t, 2, 2)); v2.maj(cl((t - c.T[2] - 0.6) / (c.E[2] - c.T[2] - 1.4), 0, 1));
      op(v3.g, fen(c, t, 3, 3)); v3.maj(cl((t - c.T[3] - 0.6) / (c.E[3] - c.T[3] - 1.4), 0, 1));
      op(v4, fen(c, t, 4, 4)); h2.maj((t - c.T[4] - 1) / (c.E[4] - c.T[4] - 2.2));
      op(v5, fen(c, t, 5, 5)); op(bagueC4, fen(c, t, 5, 5));
      const u5 = (t - c.T[5]) / 3.2; sa(D.frac(u5)); sb(D.frac(u5 + 0.5));
      op(v6, fen(c, t, 6, 6));
      montrer(c, t, pas);
      return { temp: 0.15, etat: "vapeur", humeur: "sourire", diag: w, diag0: 13.5 };
    };
  };

  /* =====================================================================
     6 · une journée au rayon frais
     ===================================================================== */
  S.journee = function (g, c) {
    const k = 0.72, X0 = 70, Y0 = 258;
    const W = t => D.courbe([[c.T[0], 10], [c.A(2, 0.5), 15.9], [c.E[3], 22.9], [c.T[5], 34], [c.A(5, 0.8), 36], [c.E[6], 40]], t, true);
    const tC3 = quand(W, 15.9, c.D), tC1 = quand(W, 22.7, c.D), tC2 = quand(W, 36.3, c.D), tC3f = quand(W, 36.9, c.D);
    const heure = w => { const h = 6 + (w - 10) * 16 / 30; return h; };
    const texteHeure = w => { const h = heure(w); let hh = Math.floor(h), mm = Math.round((h - hh) * 6) * 10; if (mm === 60) { hh++; mm = 0; } return hh + " h" + (mm ? " " + mm : ""); };

    /* la frise : le ciel de la journée, le soleil qui se lève puis la lune */
    const fx = h => 50 + (h - 6) * 55, gid = uid("ciel"), gr = el("linearGradient", { id: gid, x1: 50, x2: 930, y1: 0, y2: 0, gradientUnits: "userSpaceOnUse" }, g);
    [[0, "#f3b46b"], [0.1, "#f9e08b"], [0.45, "#bfe3f5"], [0.7, "#f0a35e"], [0.85, "#5a6b9e"], [1, "#1d2a52"]].forEach(([o, col]) => el("stop", { offset: o, "stop-color": col }, gr));
    el("rect", { x: 50, y: 172, width: 880, height: 18, rx: 9, fill: "url(#" + gid + ")", stroke: "rgba(27,58,99,.35)", "stroke-width": 2 }, g);
    [6, 9, 12, 15, 18, 21].forEach(h => { el("line", { x1: fx(h), y1: 192, x2: fx(h), y2: 201, stroke: GRIS, "stroke-width": 3 }, g); txt(g, fx(h), 234, h + " h", { "text-anchor": "middle", "font-size": 28, fill: GRIS }); });
    const astre = el("g", {}, g), soleil = el("g", {}, astre), lune = el("g", {}, astre);
    el("circle", { r: 15, fill: "#f6c445", stroke: "#e0a31f", "stroke-width": 3 }, soleil);
    for (let a = 0; a < 8; a++) el("line", { x1: 20 * Math.cos(a * 0.785), y1: 20 * Math.sin(a * 0.785), x2: 25 * Math.cos(a * 0.785), y2: 25 * Math.sin(a * 0.785), stroke: "#e0a31f", "stroke-width": 4, "stroke-linecap": "round" }, soleil);
    el("path", { d: "M 0 -17 A 17 17 0 1 0 15 9 A 13 13 0 1 1 0 -17 Z", fill: "#f4f6ff", stroke: "#6b78b0", "stroke-width": 3, "stroke-linejoin": "round" }, lune);

    /* la centrale (au milieu), l'heure écrite et la flèche des marches à sa droite */
    const vc = D.vueCentrale(g, X0, Y0, k);
    const bagues = [autour(g, vc, k, 2, VERT), autour(g, vc, k, 0, VERT), autour(g, vc, k, 1, ROUGE), autour(g, vc, k, 2, ROUGE), autour(g, vc, k, 3, OR)];
    el("rect", { x: 745, y: 262, width: 210, height: 84, rx: 16, fill: "#fffdf8", stroke: "rgba(27,58,99,.25)", "stroke-width": 2 }, g);
    const heureTxt = txt(g, 850, 322, "6 h", { "text-anchor": "middle", "font-size": 58, fill: D.BLEU });
    const marches = el("g", { opacity: 0 }, g);
    txt(marches, 845, 636, "les marches", { "text-anchor": "middle", fill: D.BLEU });
    fleche(marches, 740, 668, 950, 668, D.BLEU, 14);
    const marche4 = [0, 1, 2, 3].map(i => el("rect", { x: 766 + i * 44, y: 520 - 30 * (i + 1) + (i ? 0 : 0), width: 38, height: 30 * (i + 1), rx: 4, stroke: "#56636f", "stroke-width": 3 }, g));
    txt(g, 851, 558, "en marche", { "text-anchor": "middle", "font-size": 28, fill: GRIS });

    /* les trois meubles, leurs tuyaux, les chariots et les clients */
    const XM = [100, 311, 522], YM = 606, LM = 190, HM = 108, ms = [];
    XM.forEach(x => tuyau(g, [[x + LM / 2, Y0 + 456 * k - 2], [x + LM / 2, YM + 4]], false));
    ms.push(meuble(g, XM[0], YM, LM, HM, { produits: ["#f4f1e6", "#7fb6e0", "#ffffff", "#f2c14e"], graine: 5, porte: true }));
    ms.push(meuble(g, XM[1], YM, LM, HM, { produits: ["#e07a7a", "#f5b5b5", "#c0504d", "#f1d3a1"], graine: 9, porte: true }));
    ms.push(meuble(g, XM[2], YM, LM, HM, { produits: ["#8fbf6a", "#f7e07a", "#e8914a", "#cfe8f6"], graine: 13, porte: true }));
    const chars = [chariot(g), chariot(g)], cls = ["#2f6fb8", "#c9451a", "#1e7e54", "#7a4fa0", "#d49a1f", "#2f6fb8"].map(co => client(g, co));
    const pas = past(g, [["on remplit les rayons", OR, 1, 1], ["forte chaleur", ROUGEF, 7, 7, 482, "end"], ["panne d'un autre", BP, 7, 7, 502, "start"]], 492);
    const dens = D.alea(4);
    return function (t) {
      const w = W(t), r = D.regul(w, 10), h = heure(w);
      vc.maj({ t: t, marche: r.marche, defaut: null, densite: densite(r.valeur), temp: 0.15 });
      astre.setAttribute("transform", "translate(" + fx(h).toFixed(1) + " 181)");
      op(soleil, 1 - D.lisse((h - 18.8) / 1.2)); op(lune, D.lisse((h - 19.6) / 1.2));
      heureTxt.textContent = texteHeure(w);
      /* anneaux : C3 démarre (k2), C1 démarre (k3-k4), C2 puis C3 s'arrêtent (k6), C4 entouré (k7) */
      op(bagues[0], D.fenetre(t, tC3 - 0.2, tC3 + 2.8, 0.3)); op(bagues[1], D.fenetre(t, tC1 - 0.2, tC1 + 2.8, 0.3));
      op(bagues[2], D.fenetre(t, tC2 - 0.2, tC2 + 2.4, 0.3)); op(bagues[3], D.fenetre(t, tC3f - 0.2, tC3f + 2.4, 0.3));
      op(bagues[4], fen(c, t, 7, 7));
      op(marches, fen(c, t, 4, 4));
      const nb = r.marche.filter(Boolean).length;
      marche4.forEach((m, i) => m.setAttribute("fill", i < nb ? VERT : "#e3e8ee"));
      /* les meubles : rayons remplis (k1), portes ouvertes (k1 à k4), rideaux de nuit (k5) */
      const rem = D.lisse((t - c.T[1] - 0.4) / 5.5), porte = D.lisse((t - c.T[1] - 0.3) / 1.4) * (1 - D.lisse((t - c.T[5]) / 1.2)), rid = D.lisse((t - c.A(5, 0.25)) / 3.5);
      ms.forEach(m => m.maj({ remplissage: rem, porte: porte, rideau: rid }));
      /* chariots (k1) et clients (k3-k4) */
      const vch = fen(c, t, 1, 1), u = (t - c.T[1]) / (c.E[1] - c.T[1]);
      chars.forEach((f, i) => { f(D.lerp(i ? 760 : 60, i ? 240 : 560, cl(u, 0, 1)), 690); });
      chars.forEach((f, i) => { /* masqués hors de k1 : on les parque hors cadre */ if (vch < 0.02) f(-200, 690); });
      const vcl = fen(c, t, 3, 4);
      cls.forEach((f, i) => { if (vcl < 0.02) { f(-200, 690, 1, 0); return; } const s = Math.sin(t * 0.5 + i * 1.9); f(150 + i * 110 + 60 * s, 688, Math.cos(t * 0.5 + i * 1.9) > 0 ? 1 : -1, t * 6 + i); });
      montrer(c, t, pas);
      return { temp: 0.15, etat: "vapeur", humeur: "sourire", diag: w, diag0: 10 };
    };
  };

  /* =====================================================================
     7 · chacun son tour (la permutation)
     ===================================================================== */
  S.permutation = function (g, c) {
    const k = 0.8, X0 = 90, Y0 = 178, CX = [190, 370, 550, 730].map(x => X0 + x * k);
    /* le calage : accroché aux phrases (voir PIÈGE 3) — C3 puis C1 démarrent dans k1, C2 puis C3 s'arrêtent dans k2 */
    const W = t => D.courbe([[c.T[0], 10], [c.E[0], 14.5], [c.T[1], 14.5], [c.A(1, 0.2), 15.9], [c.A(1, 0.8), 22.7], [c.E[1], 23.4],
      [c.T[2], 23.4], [c.A(2, 0.55), 36.3], [c.A(2, 0.85), 36.9], [c.E[2], 37.4], [c.T[3], 37.4], [c.E[3], 40]], t, true);
    const tC3 = quand(W, 15.9, c.D), tC1 = quand(W, 22.7, c.D), tC2 = quand(W, 36.3, c.D);
    const ep = MIL(), cum = [0, 1, 2, 3].map(i => { const a = []; let hh = ep.heures.debut[i]; ep.ech.forEach(s => { if (s[1] & (1 << i)) hh += 0.1 * 16 / 30; a.push(hh); }); return a; });
    const heures = (i, w) => cum[i][Math.round((cl(w, 10, 40) - 10) * 10)];
    const vc = D.vueCentrale(g, X0, Y0, k);

    /* un compteur d'heures sous chaque compresseur */
    const barres = CX.map(cx => {
      el("rect", { x: cx - 62, y: 556, width: 124, height: 94, rx: 10, fill: "#fff", stroke: "rgba(27,58,99,.35)", "stroke-width": 3 }, g);
      txt(g, cx, 588, "heures", { "text-anchor": "middle", "font-size": 28, fill: GRIS });
      el("rect", { x: cx - 52, y: 602, width: 104, height: 30, rx: 6, fill: "#eef1f5", stroke: "rgba(27,58,99,.25)", "stroke-width": 2 }, g);
      return el("rect", { x: cx - 52, y: 602, height: 30, rx: 6, fill: HEURES }, g);
    });
    const cadre = el("rect", { x: 118, y: 546, width: 634, height: 114, rx: 16, fill: "none", stroke: OR, "stroke-width": 5, "stroke-dasharray": "14 8", opacity: 0 }, g);

    /* k1 : flèches vertes « le moins d'heures » ; k2 : flèche rouge « le plus d'heures » */
    const fl = (cx, coul, nom) => { const q = el("g", { opacity: 0 }, g); fleche(q, cx, 712, cx, 662, coul, 12); txt(q, cx, 744, nom, { "text-anchor": "middle", fill: coul }); return q; };
    const vC3 = fl(CX[2], VERTF, "le moins d'heures"), vC1 = fl(CX[0], VERTF, "le moins d'heures"), rC2 = fl(CX[1], ROUGEF, "le plus d'heures");

    /* k4 : C3 en défaut, la boîte « sécurité » coupe, C4 démarre à sa place */
    const secu = el("g", { opacity: 0 }, g);
    el("line", { x1: CX[2], y1: 202, x2: CX[2], y2: Y0 + 200 * k, stroke: ROUGEF, "stroke-width": 4 }, secu);
    el("rect", { x: CX[2] - 72, y: 154, width: 144, height: 48, rx: 10, fill: "#fff", stroke: ROUGEF, "stroke-width": 4 }, secu);
    txt(secu, CX[2], 188, "sécurité", { "text-anchor": "middle", "font-size": 28, fill: ROUGEF });
    const coupe = croix(secu, CX[2], 282, 16, ROUGEF, 7);
    const bagueC4 = autour(g, vc, k, 3, VERT);

    /* k5 : le capteur BP barré, la petite armoire qui sonne */
    const [cbx, cby] = vc.ou.capteurBP, armG = el("g", { opacity: 0 }, g), ar = D.armoire(armG, 832, 250, 0.38), alarmeG = el("g", { opacity: 0 }, g);
    D.trait(alarmeG, cbx + 12, cby - 6, 872, 412, ROUGEF);
    txt(alarmeG, 889, 450, "alarme", { "text-anchor": "middle", "font-size": 28, fill: ROUGEF });
    const barre = croix(g, cbx, cby, 24, ROUGE, 9);
    const pas = past(g, [["nombre réglé d'avance", D.BLEU, 5, 5]], 492);
    return function (t) {
      const w = W(t), r = D.regul(w, 10);
      let marche = r.marche, defaut = null, rate = [0, 0, 0, 0];
      const tA = c.A(4, 0.1), tB = c.A(4, 0.38), tC = c.A(4, 0.62);
      if (t >= c.T[5]) marche = [true, true, false, false];
      else if (t >= c.T[4]) { marche = [true, false, t >= tA && t < tB, t >= tC]; defaut = t >= tB ? 2 : null; rate = [0, 0, 0.5 * (cl(t, tA, tB) - tA), 0.5 * Math.max(0, t - tC)]; }
      vc.maj({ t: t, marche: marche, defaut: defaut, densite: densite(r.valeur), temp: 0.15 });
      CX.forEach((cx, i) => { const h = heures(i, w) + rate[i]; barres[i].setAttribute("width", Math.max(3, 104 * cl(h / 28, 0, 1)).toFixed(1)); });
      op(cadre, fen(c, t, 3, 3));
      op(vC3, D.fenetre(t, tC3 - 0.3, tC3 + 3.4, 0.3)); op(vC1, D.fenetre(t, tC1 - 0.3, tC1 + 3.4, 0.3)); op(rC2, D.fenetre(t, tC2 - 0.3, c.E[2] + 0.6, 0.3));
      op(secu, fen(c, t, 4, 4)); op(coupe, t >= tB ? 1 : 0); op(bagueC4, D.fenetre(t, tC - 0.2, tC + 2.4, 0.3));
      const k5 = fen(c, t, 5, 5);
      ar.maj({ t: t, marche: marche, alarme: t >= c.T[5] + 0.6 }); op(armG, k5); op(alarmeG, k5); op(barre, k5);
      montrer(c, t, pas);
      return { temp: 0.15, etat: "vapeur", humeur: t >= c.T[5] ? "surprise" : "sourire", diag: w, diag0: 10 };
    };
  };

  /* =====================================================================
     8 · le garde-fou (délestage)
     ===================================================================== */
  S.delestage = function (g, c) {
    const k = 0.72, X0 = 312, Y0 = 240, YC = Y0 + 424 * k, CXs = [190, 370, 550, 730].map(x => X0 + x * k);
    const W = suite(c, [[0, 0, 40, 43], [1, 1, 43, 43.6], [2, 4, 43.6, 50]]);
    const tDel = quand(t => (t < c.T[1] ? 0 : W(t)), 43.2, c.E[1]);
    /* les trois départs de meubles : meuble, électrovanne, collecteur d'aspiration */
    const RANGS = [310, 410, 510], elec = [];
    tuyau(g, [[272, RANGS[0]], [272, YC], [X0 + 36, YC]], false);
    RANGS.forEach((y, i) => {
      tuyau(g, [[94, y], [272, y]], false);
      meuble(g, 24, y - 28, 70, 56, { produits: [["#f4f1e6", "#7fb6e0", "#f2c14e"], ["#e07a7a", "#f5b5b5", "#f1d3a1"], ["#8fbf6a", "#f7e07a", "#cfe8f6"]][i], graine: 3 + i * 4 });
      el("rect", { x: 160, y: y - 29, width: 62, height: 58, rx: 8, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, g);
      sym(g, "electrovanne", 191, y, 1.4);
      elec.push(croix(g, 191, y, 24, ROUGE, 8));
    });
    txt(g, 190, 270, "électrovannes", { "text-anchor": "middle" });
    const vc = D.vueCentrale(g, X0, Y0, k);
    /* k1 : l'éclair rouge */
    const eclair = el("polygon", { points: "636,152 612,204 630,204 618,250 664,190 644,190 660,152", fill: ROUGE, stroke: "#fff", "stroke-width": 3, "stroke-linejoin": "round", opacity: 0 }, g);
    /* k3 : sur chaque compresseur une boîte « pressostats », fil rouge à part (deux rangées pour tenir) */
    const press = el("g", { opacity: 0 }, g);
    CXs.forEach((cx, i) => {
      const y = i % 2 ? 206 : 158;
      el("line", { x1: cx, y1: y + 40, x2: cx, y2: Y0 + 200 * k, stroke: ROUGEF, "stroke-width": 4 }, press);
      el("rect", { x: cx - 72, y: y, width: 144, height: 40, rx: 10, fill: "#fff", stroke: ROUGEF, "stroke-width": 4 }, press);
      txt(press, cx, y + 29, "pressostats", { "text-anchor": "middle", "font-size": 28, fill: ROUGEF });
    });
    /* k4 : l'armoire en panne, un pressostat qui coupe quand même */
    const v4 = el("g", { opacity: 0 }, g), ar = D.armoire(v4, 340, 588, 0.3), pan = croix(v4, 385, 651, 40, ROUGE, 10), co = coupeur(v4, 580, 616, "pressostat", 170);
    txt(v4, 440, 662, "en panne", { "font-size": 30, fill: ROUGEF });
    /* k5 : l'héroïne monte vers le haut, par le tuyau du collecteur de refoulement */
    const toit = el("g", { opacity: 0 }, g);
    tuyau(toit, [[X0 + 100 * k, Y0 + 72 * k], [X0 + 100 * k, 156]], true);
    txt(toit, X0 + 100 * k + 28, 214, "vers le toit", { fill: OR });
    const mila = D.heroine(g, { r: 30 });
    const pas = past(g, [["délestage rapide", ROUGEF, 1, 1], ["comme un pressostat BP", BP, 2, 2], ["la sécurité d'abord", VERTF, 4, 4]], 640);
    const piste = [[X0 + 770 * k, Y0 + 72 * k], [X0 + 100 * k, Y0 + 72 * k], [X0 + 100 * k, 176]], long = [0, 1].map(i => Math.hypot(piste[i + 1][0] - piste[i][0], piste[i + 1][1] - piste[i][1])), tot = long[0] + long[1];
    const place = u => { let d = u * tot; if (d <= long[0]) return [D.lerp(piste[0][0], piste[1][0], d / long[0]), piste[0][1]]; d -= long[0]; return [piste[1][0], D.lerp(piste[1][1], piste[2][1], d / long[1])]; };
    return function (t) {
      const w = W(t), r = D.regul(w, 40);
      vc.maj({ t: t, marche: r.marche, defaut: null, densite: cl((r.valeur + 2.6) / 5, 0, 1), temp: 0.15 });
      /* les électrovannes se ferment l'une après l'autre (la dernière à 42,3) */
      elec.forEach((e, i) => op(e, w >= 41.5 + i * 0.4 ? 1 : 0));
      op(eclair, D.fenetre(t, tDel - 0.1, tDel + 1.6, 0.12) * (Math.sin(t * 22) > -0.4 ? 1 : 0.55));
      op(press, fen(c, t, 3, 4));
      op(v4, fen(c, t, 4, 4));
      const u = cl((t - c.T[4] - 0.5) / 5.6, 0, 1), ouv = D.lisse((t - c.T[4] - 4.2) / 0.5);
      pan.setAttribute("opacity", t > c.T[4] + 2 ? 1 : 0);
      co.maj(t, ouv, ouv < 0.5);
      op(toit, fen(c, t, 5, 5));
      const q = D.lisse(cl((t - c.T[5] - 0.2) / (c.E[5] - c.T[5] - 1), 0, 1)), [mx, my] = place(q);
      mila({ x: mx, y: my, s: 0.62, t: t, temp: 0.6, etat: "vapeur", humeur: "sourire", regard: [0, -1], op: fen(c, t, 5, 5) });
      montrer(c, t, pas);
      return { temp: 0.6, etat: "vapeur", humeur: "sourire", diag: w, diag0: 40 };
    };
  };

  /* =====================================================================
     9 · les ventilateurs du condenseur
     ===================================================================== */
  S.ventilateurs = function (g, c) {
    const k = 0.7, X0 = 24, Y0 = 190;
    const col = colonne(g, { x: 690, y: 214, l: 90, h: 490, lo: 26, hi: 48, coul: OR, titre: "haute pression", bande: [38, 42],
      traits: [[42, null, "3 5"], [40, "consigne", "10 7"], [38, null, "3 5"]] });
    op(col.traits, 0);
    const vt = D.vueToit(g, X0, Y0, k);
    const W = D.temps, air = w => D.courbe([[50, 14], [52.5, 21], [55.6, 30], [58.1, 23], [60, 16]], w, true);
    const mila = D.heroine(g, { r: 30 });
    /* le trajet dans la batterie : en haut, descente dans l'interstice, en bas, remontée... jusqu'à la sortie du liquide */
    const P = [[60, 159], [305, 159], [305, 285], [455, 285], [455, 159], [605, 159], [605, 285], [745, 285], [820, 285]].map(([x, y]) => [X0 + x * k, Y0 + y * k]);
    const L = P.slice(1).map((p, i) => Math.hypot(p[0] - P[i][0], p[1] - P[i][1])), TOT = L.reduce((a, b) => a + b, 0);
    const place = u => { let d = u * TOT; for (let i = 0; i < L.length; i++) { if (d <= L[i] || i === L.length - 1) { const f = cl(d / L[i], 0, 1); return [D.lerp(P[i][0], P[i + 1][0], f), D.lerp(P[i][1], P[i + 1][1], f)]; } d -= L[i]; } };

    /* k2 : plus d'air → la haute pression baisse (principe : un ventilateur qui accélère, une jauge qui descend) */
    const v2 = el("g", { opacity: 0 }, g);
    el("rect", { x: 44, y: 476, width: 580, height: 230, rx: 18, fill: "#fffdf8", stroke: "rgba(27,58,99,.25)", "stroke-width": 2 }, v2);
    const vent = D.ventilateur(v2, 150, 606, 52), chev = [0, 1, 2].map(() => D.chevron(v2));
    txt(v2, 150, 692, "plus d'air", { "text-anchor": "middle", fill: ENCRE });
    fleche(v2, 250, 606, 350, 606, GRIS, 10);
    el("rect", { x: 440, y: 508, width: 44, height: 150, rx: 12, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, v2);
    const niv2 = el("rect", { x: 445, width: 34, fill: OR, opacity: 0.55 }, v2);
    txt(v2, 462, 692, "haute pression", { "text-anchor": "middle", fill: OR });
    /* k4 : variateur, un bouton qui tourne */
    const v4 = el("g", { opacity: 0 }, g);
    el("rect", { x: 80, y: 520, width: 250, height: 148, rx: 14, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, v4);
    txt(v4, 205, 558, "variateur", { "text-anchor": "middle", fill: D.BLEU });
    el("circle", { cx: 205, cy: 622, r: 30, fill: "#e9edf1", stroke: D.BLEU, "stroke-width": 4 }, v4);
    for (let a = -120; a <= 120; a += 40) el("line", { x1: 205 + 36 * Math.sin(a * Math.PI / 180), y1: 622 - 36 * Math.cos(a * Math.PI / 180), x2: 205 + 43 * Math.sin(a * Math.PI / 180), y2: 622 - 43 * Math.cos(a * Math.PI / 180), stroke: GRIS, "stroke-width": 3, "stroke-linecap": "round" }, v4);
    const aiguille = el("line", { x1: 205, y1: 622, stroke: OR, "stroke-width": 6, "stroke-linecap": "round" }, v4);
    /* k5 : trop haute — le pressostat HP, rouge, qui coupe */
    const v5 = el("g", { opacity: 0 }, g);
    txt(v5, 70, 520, "trop haute", { fill: ROUGEF });
    const co = coupeur(v5, 70, 548, "pressostat HP", 190);
    /* k6 : trop basse — le détendeur ne reçoit presque plus rien : quelques gouttes */
    const v6 = el("g", { opacity: 0 }, g);
    txt(v6, 70, 520, "trop basse", { fill: BP });
    D.tube(v6, 237, 602, 195, 40, "cuivre", false, "#f4f8fc");
    sym(v6, "detendeur", 170, 622, 3.2);
    D.image(v6, "evaporateur", 440, 571, 70, 102);
    txt(v6, 170, 702, "détendeur", { "text-anchor": "middle", "font-size": 30, fill: BP });
    txt(v6, 475, 702, "évaporateur", { "text-anchor": "middle", "font-size": 30, fill: BP });
    const gouttes = [0, 1, 2].map(() => el("path", { d: "M 0 -10 Q 8 2 0 8 Q -8 2 0 -10 Z", fill: "#3d9be9", stroke: "#fff", "stroke-width": 2 }, v6));
    const pas = past(g, [["plus d'air, HP ↓", OR, 2, 2], ["ou la vitesse", D.BLEU, 4, 4]], 330);
    return function (t) {
      const w = W(c, t, 50, 60, 2, 6), r = D.regul(w, 50), vent4 = r.marche.map(Number), a = air(w) / 32;
      col.maj(r.valeur);
      op(col.traits, fen(c, t, 3, 6));
      vt.maj({ t: t, vent: vent4, air: a });
      /* l'héroïne : de ou.entree (k2) à ou.sortie (k6), vapeur puis liquide */
      const u = cl((t - c.T[2]) / (c.E[6] - c.T[2]), 0, 1), [mx, my] = place(u), liquide = u > 0.58;
      const humeur = t >= c.T[6] ? "triste" : t >= c.T[5] ? "chaud" : "sourire", temp = D.lerp(0.6, 0.45, D.lisse((u - 0.45) / 0.25));
      mila({ x: mx, y: my, s: 0.55, t: t, temp: temp, etat: liquide ? "liquide" : "vapeur", humeur: humeur, regard: [1, 0.5] });
      /* k2 */
      op(v2, fen(c, t, 2, 2));
      const u2 = Math.max(0, t - c.T[2]), spd = 180 * u2 + 70 * u2 * u2, f2 = cl(u2 / 4.5, 0, 1);
      vent(spd); chev.forEach((ch, j) => { const f = (u2 * 0.8 + j / 3) % 1; ch(150, 538 - f * 34, 180, "#e2662c", 0.9 * cl(u2 / 2.5, 0, 1) * D.fenetre(f, 0, 1, 0.25)); });
      const hN = 150 * D.lerp(0.8, 0.3, D.lisse(f2)); niv2.setAttribute("y", (658 - hN - 5).toFixed(1)); niv2.setAttribute("height", hN.toFixed(1));
      /* k4 */
      op(v4, fen(c, t, 4, 4));
      const ang = (-120 + 240 * D.lisse(0.5 + 0.5 * Math.sin((t - c.T[4]) * 1.1 - 1.2))) * Math.PI / 180;
      aiguille.setAttribute("x2", (205 + 24 * Math.sin(ang)).toFixed(1)); aiguille.setAttribute("y2", (622 - 24 * Math.cos(ang)).toFixed(1));
      /* k5 */
      op(v5, fen(c, t, 5, 5));
      const ouv = D.lisse((t - c.T[5] - 3.4) / 0.5);
      co.maj(t, ouv, ouv < 0.5);
      /* k6 */
      op(v6, fen(c, t, 6, 6));
      gouttes.forEach((q, j) => { const f = (((t - c.T[6]) / 3.4 + j / 3) % 1); q.setAttribute("transform", "translate(" + (252 + f * 168).toFixed(1) + " 622)"); });
      montrer(c, t, pas);
      return { temp: temp, etat: liquide ? "liquide" : "vapeur", humeur: humeur, diag: w, diag0: 50 };
    };
  };
})();
