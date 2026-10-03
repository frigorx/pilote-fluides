/* =====================================================================
   voyage-bietage-scenes-a.js — édition « installation bi-étagée », lot a :
   l'accueil, la marche trop haute, l'évaporateur, le compresseur BP
   ---------------------------------------------------------------------
   RÔLE : les scènes `intro`, `marche`, `evaporateur` et `compresseurBP` du
   récit donnees/voyage-bietage.js. Même contrat que moteur/voyage-nh3-scenes-*.js :
   VOYAGE_SCENES[id] = function (g, c) → maj(t) ; tout est fonction PURE de
   t (aucun état gardé, aucun SMIL, hasard par D.alea). Brief :
   voyage-bietage/BRIEF-SCENES.md.
   ÉCRAN PARTAGÉ : la scène tient dans x 20 → 965, y 150 → 760 (à droite : la
   carte « où je suis » et le diagramme). ACIER partout ; le cuivre n'existe
   que dans le bobinage du moteur (dehors).
   AIDES LOCALES (celles que le dessin commun n'a pas) :
     · compresseur(…)  le compresseur à pistons OUVERT, en coupe (recopié de
       voyage-nh3-scenes-b.js) : carter, huile, cylindre, piston, bielle,
       vilebrequin, tête à deux chambres, clapets, et — au choix — arbre,
       garniture, accouplement, moteur (bobinage de cuivre). Même dessin pour
       `marche` (gros, sans moteur, grand volume mort) et `compresseurBP`.
     · lot(…)          les molécules du cylindre (aspiration, compression,
       refoulement) et la vapeur restée dans le volume mort.
     · marches(…)      la marche, coupée en deux (intro k4 = marche k6).
   ÉCARTS AU BRIEF : étiquettes de la carte (intro) grossies à ≥ 28 px et trois d'entre elles
   décalées (le dessin commun les a à 23 px) ; la carte est posée à y = 200 pour laisser le
   bandeau de la flèche au-dessus ; « compresseur BP » est sous le carter (pas dessus : les
   pièces tournent dedans) ; une jauge « haute » et une étiquette « évaporateur » en plus.
   PIÈGES : le compresseur de `marche` a un volume mort exagéré (mort : 44) pour
   qu'on voie la vapeur restée au fond ; ses scènes partagent la même phase de
   vilebrequin (phi) : l'héroïne entre dans le cylindre quand le clapet
   d'aspiration s'ouvre (tDeL inverse la courbe de phase).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const el = D.el, PI = Math.PI, TOUR = 2 * PI;
  const FOND = "#f4f8fc", FROID = "#e3eefa", CHAUD = "#fbe5d6", CAL = "Calibri, Arial, sans-serif";
  const LIQ = D.couleur(0.05, false), OPL = 0.74; // OPL : opacité des liquides translucides
  const BLEUC = "#2f6fb8", ROUGE = "#c0392b", BRUN = "#4a2c0f";
  let nid = 0;
  const idf = p => "vm-bta-" + p + "-" + (++nid);
  const fen = (t, a, b, du) => D.fenetre(t, a, b, du);
  const entree = (t, a, du) => D.lisse((t - a) / (du || 0.5)); // 0 → 1 à partir de a
  const opa = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const mix = (a, b, f) => { // mélange de deux couleurs "#rrggbb"
    const h = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16)), A = h(a), B = h(b);
    return "rgb(" + A.map((v, i) => Math.round(D.lerp(v, B[i], f))).join(",") + ")";
  };

  /* ---------- petits outils privés ---------- */
  /* tuyau d'acier suivant une ligne brisée : paroi sombre, intérieur teinté (w : diamètre extérieur) */
  function tuyau(parent, pts, w, teinte) {
    const l = pts.map(p => p.join(",")).join(" ");
    el("polyline", { points: l, fill: "none", stroke: D.ACIER, "stroke-width": w, "stroke-linejoin": "round" }, parent);
    return el("polyline", { points: l, fill: "none", stroke: teinte, "stroke-width": w - 18, "stroke-linejoin": "round" }, parent);
  }
  /* position à la distance d le long d'une ligne brisée */
  function piste(pts) {
    const L = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), tot = L.reduce((a, b) => a + b, 0);
    return { l: tot, pos: function (d) {
      d = D.borne(d, 0, tot);
      for (let i = 0; i < L.length; i++) {
        if (d <= L[i] || i === L.length - 1) { const k = L[i] ? D.borne(d / L[i], 0, 1) : 0; return [D.lerp(pts[i][0], pts[i + 1][0], k), D.lerp(pts[i][1], pts[i + 1][1], k)]; }
        d -= L[i];
      }
    } };
  }
  /* des molécules qui filent le long d'un tube (le sens du fluide) : maj(t, vitesse px/s, opacité) */
  function flux(parent, pts, nb, temp) {
    const P = piste(pts), M = [];
    for (let i = 0; i < nb; i++) M.push({ s: i / nb, o: ((i * 7) % 5 - 2) * 5, maj: D.mol(parent) });
    return function (t, vit, opaque) {
      M.forEach(m => {
        const f = D.frac(m.s + t * vit / P.l), d = f * P.l, p = P.pos(d), a = P.pos(d - 4), b = P.pos(d + 4), n = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
        m.maj(p[0] - (b[1] - a[1]) / n * m.o, p[1] + (b[0] - a[0]) / n * m.o, temp, true, opaque * fen(f, 0, 1, 0.06));
      });
    };
  }
  /* de petits reflets qui filent le long d'une ligne brisée : le liquide coule ; maj(t, vitesse px/s, opacité) */
  function reflets(parent, pts, nb) {
    const P = piste(pts), E = [];
    for (let i = 0; i < nb; i++) E.push({ s: i / nb, o: ((i * 5) % 3 - 1) * 8, e: el("line", { stroke: "#fff", "stroke-width": 3, "stroke-linecap": "round" }, parent) });
    return function (t, vit, opaque) {
      E.forEach(m => {
        const f = D.frac(m.s + t * vit / P.l), d = f * P.l, a = P.pos(d), b = P.pos(d + 22), n = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, nx = -(b[1] - a[1]) / n * m.o, ny = (b[0] - a[0]) / n * m.o;
        m.e.setAttribute("x1", (a[0] + nx).toFixed(1)); m.e.setAttribute("y1", (a[1] + ny).toFixed(1)); m.e.setAttribute("x2", (b[0] + nx).toFixed(1)); m.e.setAttribute("y2", (b[1] + ny).toFixed(1));
        m.e.setAttribute("opacity", (0.6 * opaque * fen(f, 0, 1, 0.06)).toFixed(2));
      });
    };
  }
  /* flèche à trait (vers +x, tournée de ang) de longueur variable : maj(x, y, ang, len, op) */
  function fleche(p, coul, ep) {
    const e = el("path", { fill: "none", stroke: coul, "stroke-width": ep || 8, "stroke-linecap": "round", "stroke-linejoin": "round" }, p);
    return function (x, y, ang, len, o) {
      e.setAttribute("d", "M 0 0 H " + len.toFixed(1) + " M " + (len - 16).toFixed(1) + " -13 L " + len.toFixed(1) + " 0 L " + (len - 16).toFixed(1) + " 13");
      e.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + ang + ")");
      e.setAttribute("opacity", o.toFixed(2));
    };
  }
  /* grande flèche pleine vers la droite, texte blanc dedans ; (x, y) : coin haut gauche, l : longueur, h : hauteur */
  function flecheTexte(p, x, y, l, h, lignes, taille, fond) {
    const g = el("g", {}, p), hd = Math.round(h * 0.55), m = Math.round(h * 0.14);
    el("polygon", { points: [[x, y + m], [x + l - hd, y + m], [x + l - hd, y], [x + l, y + h / 2], [x + l - hd, y + h], [x + l - hd, y + h - m], [x, y + h - m]].map(q => q.join(",")).join(" "), fill: fond || D.ORANGE }, g);
    const pas = taille * (lignes.length > 2 ? 1.2 : 1.1);
    lignes.forEach((s, i) => D.texte(g, x + (l - hd) / 2, y + h / 2 + taille * 0.34 + (i - (lignes.length - 1) / 2) * pas, s, { "text-anchor": "middle", fill: "#fff", "font-size": taille, "font-weight": 700, "font-family": CAL }));
    return g;
  }
  /* thermomètre vertical (tube de y à y + h, bulbe dessous) : maj(niveau 0..1) */
  function thermo(p, x, y, h, coul) {
    const g = el("g", {}, p), cy = y + h + 32;
    el("rect", { x: x - 14, y: y, width: 28, height: h + 14, rx: 14, fill: "#fff", stroke: "#10233c", "stroke-width": 4 }, g);
    el("circle", { cx: x, cy: cy, r: 30, fill: "#fff", stroke: "#10233c", "stroke-width": 4 }, g);
    el("rect", { x: x - 10, y: cy - 36, width: 20, height: 40, fill: "#fff" }, g);
    el("circle", { cx: x, cy: cy, r: 26, fill: "#fff" }, g);
    for (let i = 1; i <= 5; i++) el("line", { x1: x + 14, y1: y + i * h / 6, x2: x + 26, y2: y + i * h / 6, stroke: "#10233c", "stroke-width": 3, "stroke-linecap": "round" }, g);
    el("circle", { cx: x, cy: cy, r: 21, fill: coul }, g);
    const hg = el("rect", { x: x - 7, width: 14, fill: coul }, g);
    const maj = function (niv) { const yt = y + 8 + (1 - D.borne(niv, 0, 1)) * (h - 14); hg.setAttribute("y", yt.toFixed(1)); hg.setAttribute("height", (cy - yt).toFixed(1)); };
    maj(0.5);
    return { g: g, maj: maj };
  }
  /* la phase inverse : l'instant où la phase L(t) (courbe linéaire K = [[t, L], …]) vaut Lv */
  function tDeL(K, Lv) {
    for (let i = 1; i < K.length; i++) if (Lv <= K[i][1]) return D.lerp(K[i - 1][0], K[i][0], (Lv - K[i - 1][1]) / (K[i][1] - K[i - 1][1]));
    return K[K.length - 1][0];
  }
  /* compression : 0 au bas de course, 1 quand le clapet de refoulement s'ouvre, puis retombe */
  const compr = L => L < PI ? 0 : L < 1.62 * PI ? (L - PI) / (0.62 * PI) : 1 - D.lisse((L - 1.62 * PI) / (0.3 * PI));

  /* =====================================================================
     le compresseur à pistons ouvert, en coupe (repère local : origine au
     centre du vilebrequin, y vers le bas)
     o : { x, y, s, W (alésage), mort (volume mort, px), moteur (arbre + moteur dehors) }
     rend { top(th), maj(th, ouvA, ouvR), mols, tint, huile, ecran(x, y), yh, W, pw, cw }
     ===================================================================== */
  const RV = 42, LB = 118, PIN = 40, PH = 66;
  function compresseur(parent, o) {
    const W = o.W, pw = Math.round(W * 0.42), cw = W / 2 + 54, s = o.s || 1, yh = -(RV + LB + PIN) - o.mort;
    const top = th => -RV * Math.cos(th) - Math.sqrt(LB * LB - Math.pow(RV * Math.sin(th), 2)) - PIN; // haut du piston
    const G = el("g", { transform: "translate(" + o.x + " " + o.y + ") scale(" + s + ")" }, parent);
    // carter, huile au fond
    el("rect", { x: -cw, y: -58, width: 2 * cw, height: 188, rx: 26, fill: "url(#vm-acier-h)" }, G);
    el("rect", { x: -cw + 14, y: -44, width: 2 * cw - 28, height: 160, rx: 14, fill: FOND }, G);
    const huile = el("rect", { x: -cw + 14, y: 90, width: 2 * cw - 28, height: 26, rx: 8, fill: D.HUILE, opacity: 0.75 }, G);
    // cylindre
    el("rect", { x: -W / 2 - 14, y: yh - 2, width: W + 28, height: -38 - (yh - 2), fill: "url(#vm-acier-h)" }, G);
    el("rect", { x: -W / 2, y: yh, width: W, height: -40 - yh, fill: FOND }, G);
    const tint = el("rect", { x: -W / 2, y: yh, width: W, height: -40 - yh, fill: FROID, "fill-opacity": 0.3 }, G);
    // tête : deux chambres (aspiration | refoulement), plaque à clapets
    el("rect", { x: -W / 2 - 36, y: yh - 88, width: W + 72, height: 88, rx: 8, fill: "url(#vm-acier)" }, G);
    el("rect", { x: -W / 2 - 22, y: yh - 74, width: W / 2 + 14, height: 60, fill: FROID }, G);
    el("rect", { x: 8, y: yh - 74, width: W / 2 + 14, height: 60, fill: CHAUD }, G);
    el("rect", { x: -W / 2 + 8, y: yh - 14, width: pw, height: 14, fill: FROID }, G);
    el("rect", { x: W / 2 - 8 - pw, y: yh - 14, width: pw, height: 14, fill: CHAUD }, G);
    const mols = el("g", {}, G);
    // vilebrequin, bielle, piston, clapets
    const bielle = [el("line", { stroke: "#3f4a55", "stroke-width": 22, "stroke-linecap": "round" }, G), el("line", { stroke: "#aab6c3", "stroke-width": 10, "stroke-linecap": "round" }, G)];
    const poids = el("circle", { r: 27, fill: "#6b7785", stroke: "#3f4a55", "stroke-width": 3 }, G);
    const bras = el("line", { x1: 0, y1: 0, stroke: "#7d8a98", "stroke-width": 22, "stroke-linecap": "round" }, G);
    el("circle", { cx: 0, cy: 0, r: 16, fill: "url(#vm-acier)", stroke: "#3f4a55", "stroke-width": 3 }, G);
    const manet = el("circle", { r: 11, fill: "#24384f", stroke: "#aab6c3", "stroke-width": 3 }, G);
    const piston = el("g", {}, G);
    el("rect", { x: -W / 2 + 2, y: 0, width: W - 4, height: PH, rx: 6, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, piston);
    [12, 24].forEach(y => el("line", { x1: -W / 2 + 2, y1: y, x2: W / 2 - 2, y2: y, stroke: "#5d6b7a", "stroke-width": 2 }, piston));
    el("circle", { cx: 0, cy: PIN, r: 10, fill: "#24384f", stroke: "#aab6c3", "stroke-width": 3 }, piston);
    const clapA = el("rect", { x: -W / 2 + 2, y: yh, width: pw - 4, height: 7, rx: 3, fill: "#24384f" }, G);
    const clapR = el("rect", { x: W / 2 - 6 - (pw - 4), y: yh - 21, width: pw - 4, height: 7, rx: 3, fill: "#24384f" }, G);
    const boulons = [];
    if (o.moteur) { // l'arbre sort par la garniture, passe l'accouplement, entre dans le moteur (dehors, bobinage de cuivre)
      const x0 = cw + 124;
      el("rect", { x: 0, y: -10, width: x0 + 6, height: 20, fill: "url(#vm-acier)" }, G);
      el("rect", { x: cw - 8, y: -30, width: 44, height: 60, rx: 6, fill: "url(#vm-marine)", stroke: "#5d80ad", "stroke-width": 3 }, G);
      [-18, 18].forEach(y => el("circle", { cx: cw + 14, cy: y, r: 4.5, fill: "#aab6c3" }, G));
      [cw + 60, cw + 92].forEach(x => el("rect", { x: x, y: -30, width: 24, height: 60, rx: 4, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, G));
      for (let i = 0; i < 3; i++) boulons.push(el("circle", { cx: cw + 104, r: 4, fill: "#24384f" }, G));
      el("rect", { x: x0, y: -74, width: 206, height: 148, rx: 14, fill: "url(#vm-marine)", stroke: D.BLEU, "stroke-width": 4 }, G);
      el("rect", { x: x0 + 14, y: -60, width: 178, height: 120, rx: 6, fill: "#eef2f6" }, G);
      el("rect", { x: x0 + 14, y: -18, width: 178, height: 36, fill: "url(#vm-acier)" }, G);
      el("rect", { x: x0 - 8, y: -10, width: 24, height: 20, fill: "url(#vm-acier)" }, G);
      [-58, 24].forEach(y => { for (let i = 0; i < 3; i++) {
        el("rect", { x: x0 + 22 + i * 56, y: y, width: 48, height: 34, rx: 10, fill: "url(#vm-cuivre)", stroke: "#6e3818", "stroke-width": 2 }, G);
        [9, 17, 25].forEach(d => el("line", { x1: x0 + 28 + i * 56, y1: y + d, x2: x0 + 62 + i * 56, y2: y + d, stroke: "#6e3818", "stroke-width": 2, opacity: 0.6 }, G));
      } });
    }
    function maj(th, ouvA, ouvR) { // th : angle du vilebrequin ; ouvA, ouvR : 0..1 (clapets)
      const tp = top(th), px = RV * Math.sin(th), py = -RV * Math.cos(th);
      piston.setAttribute("transform", "translate(0 " + tp.toFixed(1) + ")");
      bielle.forEach(b => { b.setAttribute("x1", 0); b.setAttribute("y1", (tp + PIN).toFixed(1)); b.setAttribute("x2", px.toFixed(1)); b.setAttribute("y2", py.toFixed(1)); });
      manet.setAttribute("cx", px.toFixed(1)); manet.setAttribute("cy", py.toFixed(1));
      bras.setAttribute("x2", px.toFixed(1)); bras.setAttribute("y2", py.toFixed(1));
      poids.setAttribute("cx", (-0.55 * RV * Math.sin(th)).toFixed(1)); poids.setAttribute("cy", (0.55 * RV * Math.cos(th)).toFixed(1));
      clapA.setAttribute("transform", "rotate(" + (26 * ouvA).toFixed(1) + " " + (-W / 2 + 2) + " " + yh + ")");
      clapR.setAttribute("transform", "rotate(" + (26 * ouvR).toFixed(1) + " " + (W / 2 - 6) + " " + (yh - 14) + ")");
      boulons.forEach((b, i) => b.setAttribute("cy", (22 * Math.sin(th * 3 + i * TOUR / 3)).toFixed(1)));
    }
    maj(0, 0, 0);
    return { G: G, top: top, maj: maj, mols: mols, tint: tint, huile: huile, yh: yh, W: W, pw: pw, cw: cw, ecran: (x, y) => [o.x + s * x, o.y + s * y] };
  }

  /* les molécules du cylindre, d'un tour à l'autre (un seul lot : même position à la même phase)
     o : { nbFrais, nbResid, ouvre (fraction de π avant laquelle le clapet d'aspiration reste fermé), graine }
     frais(m, L, top) → [x, y, opacité] ou null ; maj(phi, tempF, resOp) pose tout le lot */
  function lot(C, o) {
    const r = D.alea(o.graine || 51), nb = o.nbResid || 0;
    const FR = Array.from({ length: o.nbFrais }, () => ({ u: 0.06 + r() * 0.88, v: r(), e: r() * 0.6, w: r(), maj: D.mol(C.mols) }));
    const RS = Array.from({ length: nb }, (_, i) => ({ u: (i + 0.5) / nb, v: i % 2 ? 0.85 : 0.15, maj: D.mol(C.mols) }));
    const ax = -C.W / 2 + 8 + C.pw / 2, rx = C.W / 2 - 8 - C.pw / 2;
    const rest = (m, top) => [-C.W / 2 + 12 + m.u * (C.W - 24), C.yh + 13 + m.v * Math.max(4, top - C.yh - 26)];
    function frais(m, L, top) {
      const [cx, cy] = rest(m, top);
      if (L < PI) {
        const k = D.lisse((L / PI - o.ouvre - m.e * 0.5) / 0.3);
        if (k <= 0) return null;
        const a = [ax + (m.u - 0.5) * 20, C.yh - 38], b = [ax, C.yh + 6];
        return k < 0.5 ? [D.lerp(a[0], b[0], k * 2), D.lerp(a[1], b[1], k * 2), 1] : [D.lerp(b[0], cx, k * 2 - 1), D.lerp(b[1], cy, k * 2 - 1), 1];
      }
      if (L < 1.62 * PI) return [cx, cy, 1];
      const k = D.lisse(((L - 1.62 * PI) / (0.38 * PI) - m.w * 0.4) / 0.6), b = [rx + (m.u - 0.5) * 20, C.yh + 6], z = [rx + (m.u - 0.5) * 20, C.yh - 40];
      if (k >= 1) return null;
      return k < 0.5 ? [D.lerp(cx, b[0], k * 2), D.lerp(cy, b[1], k * 2), 1] : [D.lerp(b[0], z[0], k * 2 - 1), D.lerp(b[1], z[1], k * 2 - 1), 1 - D.lisse((k - 0.7) / 0.3)];
    }
    function maj(phi, tempF, resOp) {
      const th = ((phi % TOUR) + TOUR) % TOUR, tp = C.top(th);
      FR.forEach(m => { const p = frais(m, th, tp); if (p) m.maj(p[0], p[1], tempF(th), true, p[2]); else m.maj(-999, -999, 0, true, 0); });
      const chaud = 0.6 + 0.38 * D.borne(1 - (tp + (RV + LB + PIN)) / (2 * RV), 0, 1); // très chaude et serrée en haut, un peu détendue en bas : jamais bleue
      RS.forEach(m => { const p = rest(m, tp); m.maj(p[0], p[1], chaud, false, resOp); });
    }
    return { frais: frais, maj: maj, ax: ax, rx: rx };
  }

  /* =====================================================================
     la marche : un palier bas, un palier haut ; coupée en deux, un palier au milieu (la bouteille)
     rend { g, maj(f) } : f = 0 une seule grande marche, f = 1 deux marches (compresseurs en marchepieds)
     ===================================================================== */
  const ESC = { bas: 640, mil: 470, haut: 300 };
  function marches(parent) {
    const gg = el("g", {}, parent);
    const poly = el("polygon", { fill: "#dde8f4", stroke: D.BLEU, "stroke-width": 5, "stroke-linejoin": "round" }, gg);
    D.etiquette(gg, 190, 716, "−35 °C", { "text-anchor": "middle", "font-size": 46, fill: BLEUC, "font-weight": 700 });
    D.etiquette(gg, 800, 374, "+35 °C", { "text-anchor": "middle", "font-size": 46, fill: ROUGE, "font-weight": 700 });
    const deux = el("g", {}, gg);
    D.etiquette(deux, 485, 540, "bouteille", { "text-anchor": "middle", "font-size": 36, fill: D.BLEU, "font-weight": 700 });
    const carte = (x, y, w, h, nom, lettre, taille, img) => {
      el("rect", { x: x, y: y, width: w, height: h, rx: 12, fill: "#fff", stroke: D.BLEU, "stroke-width": 3 }, deux);
      D.image(deux, nom, x + 6, y + 4, w - 12, img);
      if (lettre) D.etiquette(deux, x + w / 2, y + h - 8, lettre, { "text-anchor": "middle", "font-size": taille, fill: D.BLEU, "font-weight": 700 });
    };
    carte(212, 530, 110, 110, "compresseurBP", "BP", 30, 76);
    carte(545, 380, 90, 90, "compresseurHP", "HP", 28, 58);
    carte(452, 322, 84, 148, "bouteille", "", 0, 136);
    return { g: gg, maj: function (f) {
      const xa = D.lerp(470, 330, f), xb = D.lerp(470, 640, f), ym = D.lerp(ESC.haut, ESC.mil, f);
      poly.setAttribute("points", [[30, 752], [30, ESC.bas], [xa, ESC.bas], [xa, ym], [xb, ym], [xb, ESC.haut], [950, ESC.haut], [950, 752]].map(q => q.map(v => v.toFixed(1)).join(",")).join(" "));
      opa(deux, D.lisse((f - 0.45) / 0.55));
    } };
  }

  /* =====================================================================
     intro — le titre, la marche, la carte, le diagramme
     ===================================================================== */
  S.intro = function (g, c) {
    const T = c.T, E = c.E;
    const titre = el("g", {}, g), corps = el("g", {}, g);
    D.texte(titre, 492, 330, c.recit.titre, { "text-anchor": "middle", "font-size": 62, "font-weight": 700, fill: D.BLEU, "font-family": "Trebuchet MS, Arial, sans-serif" });
    D.texte(titre, 492, 398, c.recit.sousTitre, { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: D.ORANGE, "font-family": CAL });
    const grandeT = D.heroine(titre, { r: 54 });
    D.pastille(titre, 492, 700, "édition " + c.recit.edition, D.BLEU, 34, "middle");

    // k0 → k2 : la molécule et les deux températures (le froid de l'usine, le chaud du dehors)
    const A = el("g", {}, corps);
    const p0 = D.pastille(A, 170, 612, "ammoniac : NH₃", D.BLEU, 32, "middle");
    const p1 = D.pastille(A, 470, 205, "usine de surgelés", BLEUC, 30, "middle");
    const th1 = thermo(A, 470, 250, 300, BLEUC), l1 = D.etiquette(A, 470, 665, "−35 °C", { "text-anchor": "middle", "font-size": 46, fill: BLEUC, "font-weight": 700 });
    const p2 = D.pastille(A, 800, 205, "condenser : +35 °C", ROUGE, 30, "middle");
    const th2 = thermo(A, 800, 250, 300, ROUGE), l2 = D.etiquette(A, 800, 665, "+35 °C", { "text-anchor": "middle", "font-size": 46, fill: ROUGE, "font-weight": 700 });

    // k3 et k4 : la marche très haute, puis coupée en deux
    const B = el("g", {}, corps), mar = marches(B);
    const dim = el("g", {}, B);
    el("path", { d: "M 420 628 V 312 M 404 346 L 420 312 L 436 346 M 404 594 L 420 628 L 436 594", fill: "none", stroke: D.ORANGE, "stroke-width": 8, "stroke-linecap": "round", "stroke-linejoin": "round" }, dim);
    D.etiquette(dim, 396, 482, "trop haute", { "text-anchor": "end", "font-size": 40, fill: D.ORANGE, "font-weight": 700 });

    // k5 : la carte du circuit (dans x 20 → 965) ; ses étiquettes grossies (≥ 28 px à l'écran)
    const C = el("g", {}, corps), cir = D.circuit(C, 60, 200, 850, true);
    cir.g.querySelectorAll("text").forEach(tx => { // 34 × 0,85 ≈ 29 px à l'écran ; trois étiquettes décalées pour ne rien toucher
      tx.setAttribute("font-size", 34);
      const dy = { "flotteur": [0, 12], "détendeur": [0, -32], "intermédiaire": [0, 10], "compresseur BP": [-10, 0] }[tx.textContent];
      if (dy) { tx.setAttribute("x", +tx.getAttribute("x") + dy[0]); tx.setAttribute("y", +tx.getAttribute("y") + dy[1]); }
    });
    // le tour se fait à vitesse constante le long du tuyau (distance cumulée) ; un organe s'allume quand la molécule arrive à son rang
    const CUM = [0]; D.CIRCUIT_PTS.forEach((q, i) => { if (i) CUM.push(CUM[i - 1] + Math.hypot(q[0] - D.CIRCUIT_PTS[i - 1][0], q[1] - D.CIRCUIT_PTS[i - 1][1])); });
    const wDeDist = d => { let i = 1; while (i < CUM.length - 1 && CUM[i] < d) i++; return (i - 1) + D.borne((d - CUM[i - 1]) / (CUM[i] - CUM[i - 1]), 0, 1); };
    const RANG = { evaporateur: 3, bouteilleBP: 7, compresseurBP: 10, bouteille: 14, compresseurHP: 17, condenseur: 19, reservoir: 20, flotteur: 22, detendeur: 28 };
    const wDe = t => wDeDist(D.courbe([[c.A(5, 0.02), 0], [E[5] + 0.2, CUM[CUM.length - 1]]], t, true));
    // k6 : la flèche vers le diagramme (bandeau du haut)
    const F = flecheTexte(el("g", {}, corps), 478, 152, 470, 50, ["à droite : le diagramme"], 32);
    const Fg = F.parentNode;

    const grande = D.heroine(corps, { r: 60 }), petite = D.heroine(corps, { r: 30 });
    const dep = cir.ecran(...D.circuitPoint(0));
    const tempDiag = w => D.courbe([[0, 0.04], [1, 0.04], [2, 0.45], [3, 0.22], [4, 0.62], [5, 0.5], [6, 0.5], [7, 0.22], [8, 0.22], [9, 0.04], [10, 0.04]], w, true);
    const etatDiag = w => w < 0.1 ? "liquide" : w < 1 ? "bout" : w < 5 ? "vapeur" : w < 6 ? "bout" : "liquide";
    const humDiag = w => (w > 1.6 && w < 2.4) || (w > 3.7 && w < 5) ? "chaud" : w > 8.2 ? "froid" : "sourire";
    return function (t) {
      const ft = 1 - D.lisse((t - (T[0] - 1.1)) / 0.8);
      opa(titre, ft); opa(corps, 1 - ft);
      grandeT({ x: 492, y: 560 + Math.sin(t * 2.2) * 6, t: t, humeur: "sourire", etat: "liquide", temp: 0.1 });
      // k0 → k2
      const sA = 1 - entree(t, T[3] - 0.5, 0.4);
      opa(p0, entree(t, T[0] + 0.3) * sA); opa(p1, entree(t, T[1]) * sA); opa(p2, entree(t, T[2]) * sA);
      opa(th1.g, entree(t, T[1] + 0.2) * sA); opa(l1, entree(t, T[1] + 0.2) * sA);
      opa(th2.g, entree(t, T[2] + 0.2) * sA); opa(l2, entree(t, T[2] + 0.2) * sA);
      th1.maj(D.lerp(0.5, 0.12, entree(t, T[1] + 0.4, 1.4))); th2.maj(D.lerp(0.5, 0.88, entree(t, T[2] + 0.4, 1.4)));
      // k3, k4
      opa(B, entree(t, T[3] - 0.1, 0.5) * (1 - entree(t, T[5] - 0.6, 0.35)));
      mar.maj(D.lisse((t - (T[4] + 0.3)) / 1.4));
      opa(dim, entree(t, T[3] + 0.4) * (1 - entree(t, T[4] + 0.1, 0.5)));
      // k5
      opa(C, entree(t, T[5] - 0.2, 0.4));
      const w = wDe(t), lum = nom => (t >= T[5] && t < E[5] + 0.4 && w >= RANG[nom] - 0.5) || (nom === "evaporateur" && t >= c.A(7, 0.4));
      Object.keys(RANG).forEach(nom => cir.surligne(nom, lum(nom)));
      // k6
      opa(Fg, fen(t, T[6] - 0.1, E[7] + 0.5, 0.5));
      F.setAttribute("transform", "translate(" + (6 * Math.sin(t * 3.2)).toFixed(1) + " 0)");
      // la grande héroïne (k0 → k2), qui rétrécit et descend sur la marche à k3
      const mv = D.lisse((t - (T[3] - 0.3)) / 0.8), bob = Math.sin(t * 2.2) * 8;
      const hum0 = t < T[1] ? "sourire" : t < T[2] ? "froid" : t < T[3] ? "chaud" : "triste";
      const k0f = 1 - D.lisse((t - (T[1] - 0.2)) / 0.8); // k0 : grande, au centre ; puis à gauche des thermomètres
      p0.setAttribute("transform", "translate(" + (310 * k0f).toFixed(1) + " " + (40 * k0f).toFixed(1) + ")");
      grande({ x: D.lerp(D.lerp(170, 150, mv), 480, k0f), y: D.lerp(D.lerp(470 + bob, 585, mv), 375 + bob, k0f), s: D.lerp(D.lerp(1, 0.6, mv), 1.9, k0f), t: t, temp: D.courbe([[T[0], 0.12], [T[1], 0.04], [E[1], 0.04], [T[2] + 0.6, 0.5], [E[2], 0.5], [T[3], 0.1]], t), etat: "liquide", humeur: hum0, regard: [t < T[3] ? 0.3 : 0.5, t < T[3] ? 0 : -1], op: 1 - entree(t, T[3] + 0.3, 0.3) });
      // la petite : sur la marche (k3, k4), puis sur la carte (k5 → k7)
      const hop = D.lisse((t - c.A(4, 0.55)) / (c.A(4, 0.9) - c.A(4, 0.55)));
      let px = D.lerp(150, 388, hop), py = D.lerp(585, 415, hop) - 90 * Math.sin(PI * hop) + Math.sin(t * 2.4) * 3, ps = 1.2;
      const aller = D.lisse((t - (T[5] - 0.6)) / 0.5);
      const pose = D.lisse((t - c.A(7, 0.1)) / (c.A(7, 0.85) - c.A(7, 0.1))); // k7 : elle se pose sur l'évaporateur
      let cx, cy;
      if (t < T[5]) { cx = dep[0]; cy = dep[1]; } else if (t < T[6]) { [cx, cy] = cir.ecran(...D.circuitPoint(w)); } else [cx, cy] = cir.ecran(...D.circuitPoint(3 * pose));
      const wm = D.borne(w, 0, 31);
      const tempC = D.courbe([[0, 0.04], [3, 0.04], [7, 0.06], [10, 0.45], [12, 0.22], [17, 0.62], [19, 0.5], [22, 0.5], [24, 0.22], [28, 0.22], [31, 0.04]], wm, true);
      const etatC = wm < 2.6 ? "liquide" : wm < 6.4 ? "bout" : wm < 19.4 ? "vapeur" : "liquide";
      const humC = t < T[4] ? "triste" : t > T[6] && t < E[6] ? "surprise" : wm > 9.4 && wm < 12.4 || wm > 16.4 && wm < 18.4 ? "chaud" : wm > 27 ? "froid" : "sourire";
      const surC = 1 - aller;
      petite({ x: D.lerp(cx, px, surC), y: D.lerp(cy, py, surC), s: D.lerp(0.62, ps, surC), t: t, temp: t < T[5] ? 0.1 : tempC, etat: t < T[5] ? "liquide" : etatC, humeur: humC,
        regard: t < T[4] ? [0.5, -1] : [1, 0], op: entree(t, T[3] + 0.3, 0.3) });
      const r = { temp: t < T[5] ? 0.1 : tempC, etat: etatC, humeur: humC };
      if (t >= T[6]) { // le diagramme : tour complet pendant k6 et k7
        const dw = 10 * D.borne((t - T[6]) / (E[7] - T[6]), 0, 1);
        r.diag = dw; r.diag0 = 0; r.calques = { pi: true }; r.temp = tempDiag(dw); r.etat = etatDiag(dw); r.humeur = humDiag(dw);
      }
      return r;
    };
  };

  /* =====================================================================
     marche — un seul compresseur imaginaire, et pourquoi il s'essouffle
     ===================================================================== */
  S.marche = function (g, c) {
    const T = c.T, E = c.E;
    const ancien = el("g", {}, g), cadre = el("g", {}, ancien), machine = el("g", {}, cadre); // `ancien` : tout ce qui s'efface à k6
    el("rect", { x: 30, y: 160, width: 930, height: 592, rx: 24, fill: "none", stroke: "#8a96a5", "stroke-width": 4, "stroke-dasharray": "14 10" }, cadre);
    // les tubes : basse pression (gros, en bas) → compresseur → haute pression (plus fin, en haut)
    const ASP = [[70, 760], [70, 272], [395, 272]], REF = [[600, 272], [850, 272], [850, 172]];
    tuyau(machine, ASP, 52, FROID); tuyau(machine, REF, 34, CHAUD);
    el("rect", { x: 832, y: 163, width: 36, height: 14, rx: 3, fill: D.ACIER }, machine);
    const filA = flux(machine, ASP, 6, 0.06), filR = flux(machine, REF, 4, 0.98);
    const cp = compresseur(machine, { x: 500, y: 560, s: 1, W: 190, mort: 44, moteur: false });
    const OUVRE = 0.55, lo = lot(cp, { nbFrais: 5, nbResid: 7, ouvre: OUVRE, graine: 61 });
    // phase du vilebrequin : un tour lent, puis l'héroïne entre (k0 → k1), est serrée (k1), sort (k2) ; ensuite, un tour par 3,8 s
    const K = [[0, -TOUR], [4.5, 0], [8.3, PI], [12.0, 1.62 * PI], [13.8, TOUR]];
    const phi = t => t < 13.8 ? D.courbe(K, t, true) : TOUR + (t - 13.8) * TOUR / 3.8;
    const MOI = { u: 0.5, v: 0.35, e: 0.05, w: 0.5 };
    const aPt = cp.ecran(lo.ax + (MOI.u - 0.5) * 20, cp.yh - 38), zPt = cp.ecran(lo.rx + (MOI.u - 0.5) * 20, cp.yh - 40);
    const entr = piste([[70, 748], [70, 272], [aPt[0], 272], aPt]), sort = piste([zPt, [850, 272]]);
    const tIn = tDeL(K, (OUVRE + MOI.e * 0.5) * PI), tOut = tDeL(K, 1.62 * PI + 0.38 * PI * (0.6 + MOI.w * 0.4));
    const mila = D.heroine(g, { r: 30 });
    const tempF = L => D.lerp(0.06, 0.98, D.lisse(compr(L)));
    // étiquettes
    const gBas = el("g", {}, ancien), gHaut = el("g", {}, ancien), gSeul = el("g", {}, ancien);
    D.etiquette(gBas, 112, 728, "basse pression", { "font-size": 30, "font-weight": 700, fill: D.BLEU });
    D.etiquette(gHaut, 815, 205, "haute pression", { "text-anchor": "end", "font-weight": 700, fill: D.ORANGE });
    D.etiquette(gSeul, 500, 732, "un seul compresseur", { "text-anchor": "middle", "font-weight": 700, fill: D.BLEU });
    const tab = D.pastille(cadre, 50, 190, "et si… ?", D.ORANGE, 34);
    // k1 : l'écart énorme
    const ecart = el("g", {}, ancien);
    el("path", { d: "M 720 646 V 330 M 704 366 L 720 330 L 736 366 M 704 610 L 720 646 L 736 610", fill: "none", stroke: D.ORANGE, "stroke-width": 9, "stroke-linecap": "round", "stroke-linejoin": "round" }, ecart);
    D.etiquette(ecart, 756, 470, "écart", { "font-size": 40, fill: D.ORANGE, "font-weight": 700 }); D.etiquette(ecart, 756, 516, "énorme", { "font-size": 40, fill: D.ORANGE, "font-weight": 700 });
    // k2 : le thermomètre au rouge
    const th = thermo(ancien, 905, 360, 230, ROUGE);
    const lTh = el("g", {}, ancien);
    D.etiquette(lTh, 868, 452, "plus de", { "text-anchor": "end", "font-size": 40, fill: ROUGE, "font-weight": 700 }); D.etiquette(lTh, 868, 498, "150 °C", { "text-anchor": "end", "font-size": 40, fill: ROUGE, "font-weight": 700 });
    // k3 : l'huile se dégrade, le clapet fume
    const goutte = el("g", {}, ancien);
    const dro = el("path", { d: "M 225 405 C 255 445 272 470 272 492 A 47 47 0 0 1 178 492 C 178 470 195 445 225 405 Z", fill: D.HUILE, stroke: BRUN, "stroke-width": 4 }, goutte);
    el("ellipse", { cx: 207, cy: 488, rx: 8, ry: 14, fill: "#fff", opacity: 0.55, transform: "rotate(20 207 488)" }, goutte);
    D.etiquette(goutte, 225, 574, "l'huile", { "text-anchor": "middle", "font-weight": 700 }); D.etiquette(goutte, 225, 612, "se dégrade", { "text-anchor": "middle", "font-weight": 700 });
    D.trait(goutte, 262, 520, 372, 656, "#ff6b35");
    const loupe = el("g", {}, ancien), LX = 800, LY = 470, LR = 84;
    const cid = idf("loupe");
    el("circle", { cx: LX, cy: LY, r: LR - 2 }, el("clipPath", { id: cid }, loupe));
    el("circle", { cx: LX, cy: LY, r: LR, fill: "#fff", stroke: ROUGE, "stroke-width": 5 }, loupe);
    const dedans = el("g", { "clip-path": "url(#" + cid + ")" }, loupe);
    const gl = idf("glow"), grd = el("radialGradient", { id: gl, cx: 0.5, cy: 0.62, r: 0.5 }, dedans);
    [[0, "#ff8a3d", 0.75], [1, "#ff8a3d", 0]].forEach(([o, c2, a]) => el("stop", { offset: o, "stop-color": c2, "stop-opacity": a }, grd));
    el("rect", { x: LX - LR, y: LY - LR, width: 2 * LR, height: 2 * LR, fill: "url(#" + gl + ")" }, dedans);
    el("rect", { x: LX - LR, y: LY + 26, width: 2 * LR, height: 18, fill: "url(#vm-acier)" }, dedans);
    el("rect", { x: LX - 36, y: LY + 26, width: 72, height: 18, fill: "#ffd9bd" }, dedans);
    const clap = el("rect", { x: LX - 36, y: LY + 14, width: 76, height: 9, rx: 3, fill: "#24384f", transform: "rotate(-16 " + (LX + 40) + " " + (LY + 23) + ")" }, dedans);
    const fumee = [0, 1, 2, 3].map(() => el("circle", { fill: "#6b7785" }, dedans));
    D.etiquette(loupe, LX, 590, "le clapet souffre", { "text-anchor": "middle", "font-weight": 700 });
    D.trait(loupe, 745, 408, 556, 300, "#ff6b35");
    // k4 : la vapeur restée au fond prend la place
    const k4 = el("g", {}, ancien), fl4 = [fleche(k4, BLEUC, 4), fleche(k4, BLEUC, 4)];
    D.etiquette(k4, 350, 432, "vapeur restée", { "text-anchor": "end", fill: D.ORANGE, "font-weight": 700 }); D.etiquette(k4, 350, 468, "au fond", { "text-anchor": "end", fill: D.ORANGE, "font-weight": 700 });
    D.trait(k4, 356, 440, 420, 340, "#ff6b35");
    D.etiquette(k4, 118, 346, "peu de vapeur", { fill: BLEUC, "font-weight": 700 }); D.etiquette(k4, 118, 382, "fraîche", { fill: BLEUC, "font-weight": 700 });
    // k5 : le diagramme ; k6 : la marche coupée en deux
    const f5 = flecheTexte(el("g", {}, ancien), 668, 388, 288, 104, ["regardez", "le diagramme"], 32), f5g = f5.parentNode;
    const sc = el("g", {}, g), mar = marches(sc);
    const pCouper = D.pastille(sc, 490, 232, "couper la marche en deux", D.ORANGE, 34, "middle");
    return function (t) {
      // la phase, les pistons, les molécules
      const ph = phi(t), th0 = ((ph % TOUR) + TOUR) % TOUR;
      const ouvA = th0 > OUVRE * PI && th0 < PI ? 1 : 0, ouvR = th0 > 1.62 * PI && th0 < 1.99 * PI ? 1 : 0;
      cp.maj(th0, ouvA, ouvR);
      const res = entree(t, T[4] - 0.3, 0.6);
      lo.maj(ph, tempF, res);
      cp.tint.setAttribute("fill", D.couleur(tempF(th0), true)); cp.tint.setAttribute("fill-opacity", 0.3);
      filA(t, 90, 1); filR(t, 90, entree(t, E[1], 0.6));
      // l'huile noircit (k3)
      const noir = D.lisse((t - T[3] - 0.4) / Math.max(0.5, E[3] - T[3] - 0.8));
      cp.huile.setAttribute("fill", mix(D.HUILE, BRUN, noir)); dro.setAttribute("fill", mix(D.HUILE, BRUN, noir));
      // l'héroïne
      let x, y, sH = 0.55, ec = 0, tH = 0.06, hum = "sourire";
      if (t < tIn) { const d = D.courbe([[T[0] - 0.3, 0], [tIn, entr.l]], t); [x, y] = entr.pos(d); sH = 0.62; }
      else if (t < tOut) { const p = lo.frais(MOI, ph, cp.top(th0)); [x, y] = cp.ecran(p[0], p[1]); ec = 0.7 * compr(ph); tH = tempF(ph); hum = ph > PI ? "surprise" : "sourire"; }
      else { [x, y] = sort.pos(D.courbe([[tOut, 0], [tOut + 1.6, sort.l]], t)); sH = 0.62; tH = 0.98; hum = "chaud"; }
      if (t >= tOut) hum = "chaud";
      const aller = fen(t, T[0] - 0.3, T[6] - 0.2, 0.3), plein = entree(t, T[6] - 0.1, 0.35); // k6 : elle réapparaît sur la marche
      // k6 : elle se retrouve sur la marche
      const hop = D.lisse((t - c.A(6, 0.4)) / (c.A(6, 0.85) - c.A(6, 0.4)));
      if (t >= T[6] - 0.1) { x = D.lerp(150, 388, hop); y = D.lerp(585, 415, hop) - 90 * Math.sin(PI * hop) + Math.sin(t * 2.4) * 3; sH = 1.2; ec = 0; tH = 0.1; hum = "sourire"; }
      mila({ x: x, y: y + (t >= tIn && t < tOut ? 0 : Math.sin(t * 2.4) * 2), s: sH, t: t, temp: tH, etat: "vapeur", humeur: hum, ecrase: ec, regard: [1, 0], op: t >= T[6] - 0.1 ? plein : aller * (1 - entree(t, T[6] - 0.4, 0.3)) });
      // étiquettes, phrase par phrase ; à k6 la machine s'efface et la marche se coupe en deux
      const m6 = 1 - entree(t, T[6] - 0.45, 0.4);
      opa(ancien, m6);
      opa(gBas, entree(t, T[0] + 0.2)); opa(gHaut, entree(t, T[0] + 1.2)); opa(gSeul, entree(t, T[0] + 0.2));
      opa(ecart, fen(t, T[1] - 0.1, E[1] + 0.8, 0.5));
      th.maj(D.lerp(0.45, 0.98, entree(t, T[2] + 0.3, 2.5))); opa(th.g, fen(t, T[2] - 0.1, E[2] + 0.8, 0.5)); opa(lTh, fen(t, T[2] + 0.4, E[2] + 0.8, 0.5));
      const e3 = fen(t, T[3] - 0.1, E[3] + 0.6, 0.5);
      opa(goutte, e3); opa(loupe, e3);
      clap.setAttribute("transform", "rotate(" + (-12 - 8 * Math.sin(t * 9)).toFixed(1) + " " + (LX + 40) + " " + (LY + 23) + ")");
      fumee.forEach((f, i) => { const q = D.frac(t * 0.5 + i / 4); f.setAttribute("cx", (LX - 10 + 18 * Math.sin(q * 5 + i * 2)).toFixed(1)); f.setAttribute("cy", (LY + 12 - q * 78).toFixed(1)); f.setAttribute("r", (8 + q * 16).toFixed(1)); f.setAttribute("opacity", (0.6 * (1 - q) * fen(q, 0, 1, 0.1) * 2).toFixed(2)); });
      opa(k4, fen(t, T[4] - 0.1, E[4] + 0.6, 0.5));
      fl4.forEach((f, i) => f(170 + i * 90, 272, 0, 60, ouvA * fen(t, T[4], E[4] + 0.2, 0.3)));
      opa(f5g, fen(t, T[5] - 0.1, E[5] + 0.6, 0.5));
      f5.setAttribute("transform", "translate(" + (6 * Math.sin(t * 3.2)).toFixed(1) + " 0)");
      opa(sc, entree(t, T[6] - 0.15, 0.4)); mar.maj(D.lisse((t - T[6] - 0.1) / 1.4)); opa(pCouper, entree(t, T[6] + 0.2));
      return { temp: tH, etat: "vapeur", humeur: hum };
    };
  };

  /* =====================================================================
     evaporateur — le tunnel de surgélation : bouteille BP, pompe, évaporateur à ailettes
     ---------------------------------------------------------------------
     À gauche, la bouteille BP (cuve horizontale, nappe bleue) ; dessous, la pompe ; à droite,
     l'évaporateur (deux tubes en échelle, ailettes, ventilateurs au-dessus) ; dessous, un tapis
     de cartons. Le tube du haut ramène le mélange à la bouteille ; la vapeur part par le haut.
     PILE DES COUCHES : parois et intérieurs des tubes → bouteille → héroïne (H) → liquides
     translucides (L) → bulles, molécules, héroïne fantôme (top) → étiquettes.
     ===================================================================== */
  S.evaporateur = function (g, c) {
    const T = c.T, E = c.E, TH = 64;
    const ROWS = [418, 506], XL = 418, XR = 888, YR = 250, XS = 230; // XS : le tube de retour entre dans la bouteille
    // fond : ailettes, air (derrière les tubes), tapis et cartons
    const ail = el("g", {}, g), air = el("g", {}, g), prod = el("g", {}, g);
    for (let x = 470; x <= 852; x += 18) el("rect", { x: x, y: 380, width: 6, height: 168, fill: "url(#vm-acier-h)", opacity: 0.55 }, ail);
    el("rect", { x: 440, y: 680, width: 510, height: 16, rx: 8, fill: "url(#vm-acier-h)" }, prod);
    [452, 938].forEach(x => el("circle", { cx: x, cy: 688, r: 11, fill: "#aab6c3", stroke: D.ACIER, "stroke-width": 3 }, prod));
    const CART = [0, 1, 2, 3, 4].map(i => {
      const k = el("g", {}, prod);
      el("rect", { x: 0, y: 0, width: 76, height: 62, rx: 5, fill: "#c9a36b", stroke: "#8a6a3a", "stroke-width": 3 }, k);
      el("line", { x1: 38, y1: 0, x2: 38, y2: 62, stroke: "#8a6a3a", "stroke-width": 3 }, k);
      const givre = el("g", {}, k); // le givre : bord blanc et petits cristaux
      el("rect", { x: 4, y: 4, width: 68, height: 54, rx: 3, fill: "none", stroke: "#fff", "stroke-width": 7 }, givre);
      [[14, 14], [56, 20], [24, 46], [62, 48], [44, 12]].forEach(([a, b]) => el("circle", { cx: a, cy: b, r: 3.5, fill: "#fff" }, givre));
      return { k: k, givre: givre, s: i / 5 };
    });
    // les tubes : parois, puis intérieurs (les jonctions se fondent)
    const PF = [[250, 430], [250, 640], [XL, 640], [XL, ROWS[0]]]; // bouteille → pompe → collecteur de gauche
    const PRET = [[XR, ROWS[1]], [XR, YR], [XS, YR], [XS, 292]];   // collecteur de droite → tube de retour → bouteille
    const A = el("g", {}, g);
    const COQ = [[PF, TH - 12], [[[XL, ROWS[0]], [XR, ROWS[0]]], TH], [[[XL, ROWS[1]], [XR, ROWS[1]]], TH], [PRET, TH + 4]];
    const poly = (p, w, st, parent, o) => el("polyline", Object.assign({ points: p.map(q => q.join(",")).join(" "), fill: "none", stroke: st, "stroke-width": w, "stroke-linejoin": "round" }, o || {}), parent);
    COQ.forEach(([p, w]) => poly(p, w, D.ACIER, A));
    COQ.forEach(([p, w]) => poly(p, w - 18, FOND, A));
    // la bouteille BP et ses buses (sortie vapeur en haut, retour par le haut, départ du liquide en bas)
    const cu = D.cuve(g, { x: 30, y: 290, l: 300, h: 140 });
    const N = el("g", {}, g), BUSES = [[[[110, 165], [110, 292]], 40], [[[250, 430], [250, 640]], TH - 12], [[[XS, 250], [XS, 292]], TH + 4]];
    BUSES.forEach(([p, w]) => poly(p, w, D.ACIER, N, { "stroke-linejoin": "miter" }));
    BUSES.forEach(([p, w]) => poly(p, w - 18, FOND, N, { "stroke-linejoin": "miter" }));
    [[99, 286, 22, 22], [237, 412, 26, 20], [205, 286, 50, 22]].forEach(([x, y, w, h]) => el("rect", { x: x, y: y, width: w, height: h, fill: FOND }, N)); // les ouvertures dans la paroi
    el("rect", { x: 92, y: 158, width: 36, height: 14, rx: 3, fill: D.ACIER }, N);
    // la pompe (symbole), sur le tube du bas
    const pomp = el("g", {}, g);
    el("rect", { x: 278, y: 598, width: 104, height: 84, rx: 12, fill: "#fff", stroke: D.BLEU, "stroke-width": 3 }, pomp);
    D.image(pomp, "pompe", 284, 604, 92, 72);
    // ventilateurs, air, flèches de chaleur
    const vents = [560, 680, 800].map(x => D.ventilateur(g, x, 322, 30));
    const CHEV = [];
    [470, 560, 650, 740, 830].forEach((x, k) => { for (let j = 0; j < 2; j++) CHEV.push({ x: x, f: j / 2 + k * 0.13, maj: D.chevron(air) }); });
    const AIRC = [150, 190, 235], AIRF = [61, 127, 202];
    const couleurAir = y => "rgb(" + AIRC.map((v, i) => Math.round(D.lerp(v, AIRF[i], D.borne((y - 360) / 240, 0, 1)))).join(",") + ")";
    const chal = el("g", {}, g), ARR = [515, 605, 695, 785].map((x, i) => ({ x: x, ph: i * 1.3, maj: D.chaleur(chal) }));
    // l'héroïne sous les liquides ; les liquides translucides ; molécules et bulles par-dessus
    const H = el("g", {}, g), L = el("g", {}, g), top = el("g", {}, g);
    const liqPoly = (p, w, o) => poly(p, w - 18, LIQ, L, { opacity: o, "stroke-linejoin": "miter" });
    liqPoly([[250, 430], [250, 640], [278, 640]], TH - 12, OPL); liqPoly([[382, 640], [XL, 640], [XL, ROWS[0]]], TH - 12, OPL); // la pompe reste visible
    ROWS.forEach(y => el("rect", { x: XL - 9, y: y - TH / 2 + 9, width: XR - XL + 18, height: TH - 18, fill: LIQ, opacity: OPL }, L));
    liqPoly([[XR, ROWS[1]], [XR, YR]], TH + 4, 0.5); // le collecteur de droite : mousse
    const refl = [reflets(L, [[250, 436], [250, 640], [278, 640]], 5), reflets(L, [[382, 640], [XL, 640], [XL, ROWS[0]]], 5), reflets(L, [[XL, ROWS[0]], [XR, ROWS[0]]], 8),
      reflets(L, [[XL, ROWS[1]], [XR, ROWS[1]]], 8), reflets(L, [[XR, ROWS[1]], [XR, YR + 20]], 4)];
    // le mélange s'éclaircit (k3) : voile blanc de plus en plus fort vers la droite
    const g1 = idf("mel"), gr = el("linearGradient", { id: g1, x1: 0, y1: 0, x2: 1, y2: 0 }, L);
    [[0, 0.0], [1, 0.55]].forEach(([o, a]) => el("stop", { offset: o, "stop-color": "#fff", "stop-opacity": a }, gr));
    const melange = el("g", {}, L);
    ROWS.forEach(y => el("rect", { x: XL - 9, y: y - TH / 2 + 9, width: XR - XL + 18, height: TH - 18, fill: "url(#" + g1 + ")" }, melange));
    // la nappe de la bouteille BP (découpée aux bouts arrondis)
    const NV = 0.55, clip = idf("cuve"), cc = el("clipPath", { id: clip }, L);
    el("rect", { x: cu.x0, y: cu.yh, width: cu.x1 - cu.x0, height: cu.yb - cu.yh, rx: 56 }, cc);
    const Lv = el("g", { "clip-path": "url(#" + clip + ")" }, L);
    const n = Math.max(2, Math.round((cu.x1 - cu.x0) / 20));
    const nappe = D.liquide(Lv, { x0: cu.x0, x1: cu.x1, yh: cu.yh, yb: cu.yb, niveau: () => NV, couleur: () => LIQ, opacite: OPL, pas: (cu.x1 - cu.x0) / n });
    // le tube de retour : nappe en bas, vapeur au-dessus
    const nappeR = D.liquide(L, { x0: XS + 25, x1: XR - 4, yh: YR - (TH + 4) / 2 + 9, yb: YR + (TH + 4) / 2 - 9, niveau: () => 0.4, couleur: () => LIQ, opacite: OPL, pas: 22 });
    // bulles : elles naissent dans les tubes (de plus en plus vers la droite), puis montent dans le collecteur
    const bulT = ROWS.map((y, i) => D.bulles(top, 12, 61 + i, false)), bulC = D.bulles(top, 14, 71, false), bulR = D.bulles(top, 8, 81, false);
    const gouttes = D.bulles(top, 6, 91, true);
    const ra = D.alea(31), MR = [], MV = [];
    for (let i = 0; i < 5; i++) MR.push({ s: ra(), u: ra(), maj: D.mol(top) });
    for (let i = 0; i < 6; i++) MV.push({ s: (i + ra() * 0.5) / 6, u: ra(), maj: D.mol(top) });
    const mila = (function () { const a = D.heroine(H, { r: 30 }), b = D.heroine(top, { r: 30, sansHalo: true }); return p => { a(p); b(Object.assign({}, p, { op: (p.op === undefined ? 1 : p.op) * 0.5 })); }; })();
    // étiquettes, pastilles, thermomètre
    const gBut = el("g", {}, g);
    D.etiquette(gBut, 36, 468, "bouteille BP", { "font-size": 30, "font-weight": 700, fill: D.BLEU });
    D.etiquette(gBut, 330, 724, "pompe", { "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: D.BLEU });
    D.etiquette(g, 715, 738, "produits à congeler", { "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#6b4a1a" });
    const gEv = el("g", {}, g); // « évaporateur » (k2 → k4), relié à l'ailette du haut par un pointillé
    D.etiquette(gEv, 420, 198, "évaporateur", { "font-weight": 700, fill: D.BLEU }); D.trait(gEv, 470, 212, 470, 386);
    const gSortie = el("g", {}, g), fSor = fleche(gSortie, D.ORANGE, 9);
    D.etiquette(gSortie, 150, 198, "vers le compresseur BP", { "font-weight": 700, fill: D.ORANGE });
    const pEtal = D.pastille(g, 480, 198, "vapeur très étalée", BLEUC, 30, "start");
    const thG = thermo(g, 100, 490, 130, BLEUC), lTh = D.etiquette(g, 100, 738, "−35 °C", { "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: BLEUC });
    const pPlus = D.pastille(g, 960, 190, "plus de liquide qu'il n'en faut", D.ORANGE, 28, "end");
    // le trajet de l'héroïne : bouteille → pompe → évaporateur → retour → bouteille → sortie par le haut
    const PATH = [[150, 352], [250, 392], [250, 640], [XL, 640], [XL, ROWS[1]], [XR, ROWS[1]], [XR, YR], [XS, YR], [XS, 330], [110, 336], [110, 170]], P = piste(PATH);
    const cum = [0]; for (let i = 1; i < PATH.length; i++) cum.push(cum[i - 1] + Math.hypot(PATH[i][0] - PATH[i - 1][0], PATH[i][1] - PATH[i - 1][1]));
    const dK = [[0, 0], [T[2], 0], [E[2], cum[3] + 110], [T[3], cum[4]], [E[3], cum[4] + 300], [E[4], cum[5]], [T[5], cum[5] + 20], [E[5], cum[7]], [T[6], cum[7] + 10], [T[6] + 1.0, cum[8]], [T[6] + 2.4, cum[9]], [E[6] - 0.3, cum[10]]];
    const etatDe = t => t < T[3] ? "liquide" : t < T[5] ? "bout" : "vapeur";
    return function (t) {
      vents.forEach((v, i) => v(t * 520 + i * 40));
      const aa = entree(t, T[3] - 0.2, 0.9), eb = entree(t, c.A(3, 0.1), 1.4);
      opa(air, aa);
      CHEV.forEach(ch => { const f = D.frac(ch.f + t * 0.12), y = 366 + f * 244; ch.maj(ch.x, y, 0, couleurAir(y), fen(f, 0, 1, 0.12) * 0.9); });
      // les cartons avancent ; ils givrent (k4)
      const gv = entree(t, T[4], 4);
      CART.forEach(k => { const f = D.frac(k.s + t * 0.05), x = 470 + f * 414; k.k.setAttribute("transform", "translate(" + x.toFixed(1) + " 618)"); opa(k.k, fen(f, 0, 1, 0.08)); opa(k.givre, gv); });
      const ac = fen(t, T[4] - 0.1, E[4] + 0.8, 0.5);
      ARR.forEach(a => a.maj(a.x, 574, 180, ac * (0.5 + 0.5 * Math.abs(Math.sin(t * 2.4 + a.ph)))));
      // liquides, bulles
      nappe.maj(t); nappeR.maj(t);
      [90, 90, 70, 70, 70].forEach((v, i) => refl[i](t, v, i < 2 ? entree(t, T[2] - 0.2, 0.6) : 1));
      opa(melange, eb);
      bulT.forEach((b, i) => b(t, q => [XL + 430 * Math.pow(q, 0.55), ROWS[i] + 18, ROWS[i] - 16, eb, null]));
      bulC(t, q => { const y0 = ROWS[1] + 14 - Math.sqrt(q) * 40; return [XR - 14 + D.frac(q * 9.1) * 28, y0, y0 - 130, eb, null]; });
      const rr = entree(t, T[5] - 0.2, 0.8);
      bulR(t, q => [XS + 40 + D.frac(q * 7.3) * 600, 272, 236, rr, null]);
      gouttes(t, q => [XS - 14 + q * 28, 280, nappe.surface(XS, t), rr * entree(t, T[6] - 0.4, 0.8), LIQ]);
      MR.forEach(m => { const f = D.frac(m.s + t / 6); m.maj(XR - 20 - f * 620, 238 + m.u * 6, 0.06, true, fen(f, 0, 1, 0.08) * rr); });
      const sp = entree(t, T[6] + 0.4, 0.8); // k6 : de la vapeur très espacée monte vers le compresseur
      MV.forEach(m => {
        const f = D.frac(m.s + t / 12), k = D.borne(f / 0.3, 0, 1);
        m.maj(110 + (m.u - 0.5) * (f < 0.3 ? 170 * (1 - k) : 8), f < 0.3 ? D.lerp(338, 300, k) : D.lerp(300, 175, (f - 0.3) / 0.7), 0.06, true, fen(f, 0, 1, 0.06) * sp);
      });
      // l'héroïne : flotte dans la nappe, puis suit son trajet
      const d = D.courbe(dK, t, true), [x, yp] = P.pos(d), surf = nappe.surface(x, t) - 4 + Math.sin(t * 2) * 2;
      const y = d < cum[1] ? D.lerp(surf, yp, d / cum[1]) : yp;
      const etat = etatDe(t), hum = etat === "bout" && t < E[3] ? "surprise" : "sourire";
      mila({ x: x, y: y, s: 0.62, t: t, temp: 0.04, etat: etat, humeur: hum, regard: [1, 0], op: 1 - entree(t, E[6] - 0.5, 0.4) });
      // étiquettes
      opa(gBut, entree(t, T[2] - 0.1));
      opa(gEv, fen(t, T[2] + 0.4, T[5] - 0.2, 0.5));
      opa(pEtal, entree(t, T[6] + 0.3));
      opa(gSortie, entree(t, T[6] + 0.3)); fSor(62, 270 - 10 * Math.sin(t * 4), -90, 90, 1);
      opa(thG.g, fen(t, T[3] - 0.1, E[4], 0.5)); opa(lTh, fen(t, T[3] - 0.1, E[4], 0.5)); thG.maj(0.18);
      opa(pPlus, fen(t, T[5] - 0.1, E[5] + 0.5, 0.5));
      return { carte: D.courbe([[T[2], 0], [E[2], 2.3], [T[3], 3], [E[4], 3.4], [E[5], 6], [T[6] + 1.5, 7], [E[6], 8]], t), temp: 0.04, etat: etat, humeur: hum };
    };
  };

  /* =====================================================================
     compresseurBP — le premier étage, le plus gros
     ---------------------------------------------------------------------
     Le compresseur ouvert en coupe (gros cylindre), le moteur dehors. k2 : le HP, en petit,
     à côté ; k3 : aspiration puis compression jusqu'à mi-chemin (la jauge) ; k4 : elle chauffe,
     raisonnablement ; k5 : le diagramme ; k6 : elle sort par le clapet de refoulement.
     ===================================================================== */
  S.compresseurBP = function (g, c) {
    const T = c.T, E = c.E;
    const ASP = [[30, 327], [345, 327]], REF = [[555, 327], [930, 327], [930, 170]];
    tuyau(g, ASP, 56, FROID); tuyau(g, REF, 56, CHAUD);
    el("rect", { x: 28, y: 297, width: 16, height: 60, rx: 3, fill: D.ACIER }, g); el("rect", { x: 900, y: 156, width: 60, height: 16, rx: 3, fill: D.ACIER }, g);
    const filA = flux(g, [[40, 327], [330, 327]], 5, 0.06), filR = flux(g, REF.map((q, i) => i ? q : [560, 327]), 4, 0.45);
    const C = compresseur(g, { x: 450, y: 585, s: 1, W: 190, mort: 14, moteur: true });
    const OUVRE = 0.08, lo = lot(C, { nbFrais: 12, nbResid: 0, ouvre: OUVRE, graine: 51 });
    // phase : un tour lent, l'aspiration (k3), la compression qui s'achève doucement, puis le refoulement (k6)
    const K = [[0, -TOUR], [T[3] - 0.8, 0], [c.A(3, 0.3), PI], [E[3] + 0.2, 1.45 * PI], [E[4], 1.58 * PI], [T[6] - 0.2, 1.62 * PI], [T[6] + 2.0, TOUR]];
    const phi = t => t < K[K.length - 1][0] ? D.courbe(K, t, true) : TOUR + (t - K[K.length - 1][0]) * TOUR / 3.8;
    const MOI = { u: 0.5, v: 0.35, e: 0.1, w: 0.5 };
    const aPt = C.ecran(lo.ax + (MOI.u - 0.5) * 20, C.yh - 38), zPt = C.ecran(lo.rx + (MOI.u - 0.5) * 20, C.yh - 40);
    const entr = piste([[90, 327], [aPt[0], 327], aPt]), sort = piste([zPt, [930, 327], [930, 205]]);
    const tIn = tDeL(K, (OUVRE + MOI.e * 0.5) * PI), tOut = tDeL(K, 1.62 * PI + 0.38 * PI * (0.6 + MOI.w * 0.4));
    const temp = t => 0.06 + 0.39 * D.lisse((compr(phi(t)) - 0.35) / 0.65); // « je chauffe, mais raisonnablement » : jusqu'à 0,45
    const tempF = L => 0.06 + 0.39 * D.lisse((compr(L) - 0.35) / 0.65);
    // le HP, en petit (k2), à gauche
    const inset = el("g", {}, g);
    el("rect", { x: 34, y: 452, width: 232, height: 262, rx: 16, fill: "#fffdf8", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, inset);
    const Ci = compresseur(inset, { x: 150, y: 640, s: 0.6, W: 190, mort: 14, moteur: false });
    D.etiquette(inset, 150, 748, "compresseur HP", { "text-anchor": "middle", "font-weight": 700, fill: D.BLEU });
    // étiquettes
    const gAsp = el("g", {}, g), gClA = el("g", {}, g), gClR = el("g", {}, g), gBP = el("g", {}, g);
    D.etiquette(gAsp, 40, 396, "aspiration", { "font-weight": 700 }); D.etiquette(gAsp, 40, 430, "vapeur très étalée", { "font-size": 30, fill: BLEUC, "font-weight": 700 });
    D.etiquette(gClA, 40, 480, "clapet d'aspiration", { "font-weight": 700 }); D.trait(gClA, 300, 470, 354, 376, "#ff6b35");
    D.etiquette(gClR, 600, 410, "clapet de refoulement", { "font-weight": 700 }); D.trait(gClR, 640, 392, 540, 356, "#ff6b35");
    D.etiquette(gBP, 450, 748, "compresseur BP", { "text-anchor": "middle", "font-weight": 700, fill: D.BLEU });
    const pGros = D.pastille(g, 450, 215, "le plus gros", D.BLEU, 34, "middle");
    const pMi = D.pastille(g, 160, 730, "jusqu'à mi-chemin", D.BLEU, 28, "middle");
    const pChaud = D.pastille(g, 450, 215, "chaude, mais raisonnablement", D.ORANGE, 34, "middle");
    const pBooster = D.pastille(g, 40, 215, "compresseur booster", D.BLEU, 34, "start");
    const gHaut = el("g", {}, g), fHaut = fleche(gHaut, D.ORANGE, 11);
    D.etiquette(gHaut, 892, 205, "vers l'étage du haut", { "text-anchor": "end", "font-weight": 700, fill: D.ORANGE });
    // la jauge : basse à gauche, haute à droite, l'aiguille s'arrête au milieu (intermédiaire)
    const jauge = el("g", {}, g), JX = 160, JY = 640, JR = 88;
    el("path", { d: "M " + (JX - JR) + " " + JY + " A " + JR + " " + JR + " 0 0 1 " + (JX + JR) + " " + JY + " Z", fill: "#fffdf8", stroke: "#10233c", "stroke-width": 4, "stroke-linejoin": "round" }, jauge);
    [0, 0.5, 1].forEach(f => { const a = PI * (1 - f); el("line", { x1: JX + (JR - 4) * Math.cos(a), y1: JY - (JR - 4) * Math.sin(a), x2: JX + (JR - 22) * Math.cos(a), y2: JY - (JR - 22) * Math.sin(a), stroke: "#10233c", "stroke-width": 5, "stroke-linecap": "round" }, jauge); });
    const aig = el("line", { x1: JX, y1: JY, stroke: D.ORANGE, "stroke-width": 7, "stroke-linecap": "round" }, jauge);
    el("circle", { cx: JX, cy: JY, r: 10, fill: "#10233c" }, jauge);
    D.etiquette(jauge, JX, 540, "intermédiaire", { "text-anchor": "middle", "font-weight": 700 }); D.etiquette(jauge, 62, 678, "basse", { "font-weight": 700 }); D.etiquette(jauge, 262, 678, "haute", { "text-anchor": "end", "font-weight": 700 });
    const fDiag = flecheTexte(el("g", {}, g), 596, 368, 362, 124, ["regardez le", "diagramme :", "la ligne du milieu"], 28), fDiagG = fDiag.parentNode;
    const mila = D.heroine(g, { r: 30 });
    return function (t) {
      const ph = phi(t), th0 = ((ph % TOUR) + TOUR) % TOUR;
      C.maj(th0, th0 > OUVRE * PI && th0 < PI ? 1 : 0, th0 > 1.62 * PI && th0 < 1.99 * PI ? 1 : 0);
      lo.maj(ph, tempF, 0);
      C.tint.setAttribute("fill", D.couleur(tempF(th0), true)); C.tint.setAttribute("fill-opacity", 0.3);
      filA(t, 70, 1); filR(t, 70, entree(t, T[6], 0.6));
      Ci.maj(t * 1.1, 0, 0);
      // l'héroïne : dans le tube, puis son cycle, puis le refoulement
      let x, y, sH = 0.55, ec = 0;
      const tH = temp(t);
      if (t < tIn) { [x, y] = entr.pos(D.courbe([[T[2] - 0.2, 0], [tIn, entr.l]], t)); sH = 0.58; }
      else if (t < tOut) { const p = lo.frais(MOI, ph, C.top(th0)); [x, y] = C.ecran(p[0], p[1]); ec = 0.4 * compr(ph); }
      else { [x, y] = sort.pos(D.courbe([[tOut, 0], [E[6] - 0.3, sort.l]], t)); sH = 0.58; }
      const hum = t < T[3] ? "sourire" : t < T[4] ? "surprise" : t < c.A(4, 0.8) ? "chaud" : "sourire";
      const hT = t >= tOut ? 0.45 : tH;
      mila({ x: x, y: y, s: sH, t: t, temp: hT, etat: "vapeur", humeur: hum, ecrase: ec, regard: [1, 0], op: entree(t, T[2] - 0.4, 0.4) * (1 - entree(t, E[6] - 0.4, 0.4)) });
      // pièces repérées, phrase par phrase
      opa(gAsp, fen(t, T[2] - 0.1, T[4], 0.5)); opa(gBP, entree(t, T[2] - 0.1));
      opa(inset, fen(t, T[2] - 0.1, E[2] + 0.6, 0.5)); opa(pGros, fen(t, T[2] + 0.2, E[2] + 0.6, 0.5));
      opa(gClA, fen(t, T[3] - 0.1, E[3] + 0.6, 0.5));
      const k3 = fen(t, T[3] - 0.1, E[3] + 0.8, 0.5);
      opa(jauge, fen(t, T[3] - 0.1, T[5] + 0.3, 0.5)); opa(pMi, k3);
      const f = 0.5 * D.lisse((t - T[3] - 0.3) / Math.max(0.5, E[3] - T[3] - 0.8)), a = PI * (1 - f);
      aig.setAttribute("x2", (JX + (JR - 16) * Math.cos(a)).toFixed(1)); aig.setAttribute("y2", (JY - (JR - 16) * Math.sin(a)).toFixed(1));
      opa(pChaud, fen(t, T[4] - 0.1, E[4] + 0.6, 0.5));
      opa(fDiagG, fen(t, T[5] - 0.1, E[5] + 0.6, 0.5)); fDiag.setAttribute("transform", "translate(" + (6 * Math.sin(t * 3.2)).toFixed(1) + " 0)");
      const k6 = entree(t, T[6] - 0.1);
      opa(gClR, k6); opa(pBooster, k6); opa(gHaut, k6); fHaut(930, 240 - 8 * Math.sin(t * 4), -90, 60, 1);
      return { carte: D.courbe([[0, 8], [T[3], 9], [c.A(3, 0.4), 10], [T[6], 10], [E[6], 11.5]], t), temp: hT, etat: "vapeur", humeur: hum };
    };
  };
})();
