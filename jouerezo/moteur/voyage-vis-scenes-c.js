/* =====================================================================
   voyage-vis-scenes-c.js — compresseur à vis : l'économiseur, l'arrêt,
   ce que l'on surveille, le résumé
   ---------------------------------------------------------------------
   Même contrat que voyage-scenes-a.js : VOYAGE_SCENES[id](g, c) → maj(t).
   Écran partagé : la scène tient dans x 20 → 965, y 150 → 760 (la colonne de
   droite porte la carte du coin et le diagramme enthalpique). Récit :
   donnees/voyage-vis.js (l'ORDRE des phrases porte les gestes). Brief :
   voyage-vis/BRIEF-SCENES.md. Chargé en dernier : ces quatre scènes
   remplacent le bouche-trou de voyage-vis-scenes-a.js.
   AIDE LOCALE vueLongue() : le compresseur à vis en coupe le long des
   rotors (aspiration à gauche, refoulement à droite, mâle en haut, femelle
   en bas), même dessin que chez les autres scènes de l'édition.
   TOUT EST FONCTION DE t : aucune animation CSS, aucun état gardé.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const SANS = "Calibri, Arial, sans-serif";
  const CLAIR = "#f4f8fc", VERT = "#1e7e54", ROUGE = "#c0392b", BLEU = "#2f6fb8", NUIT = "#10233c", GRIS = "#637285";
  let nid = 0;
  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const ap = (e, a) => { for (const k in a) e.setAttribute(k, typeof a[k] === "number" ? +a[k].toFixed(1) : a[k]); };
  const rect = (p, x, y, w, h, at) => D.el("rect", Object.assign({ x: x, y: y, width: w, height: h }, at || {}), p);
  const pts = l => l.map(q => q[0].toFixed(1) + "," + q[1].toFixed(1)).join(" ");

  /* flèche pleine : la pointe est en (x2, y2) */
  function fleche(p, x1, y1, x2, y2, coul, ep) {
    ep = ep || 8;
    const g = D.el("g", {}, p), a = Math.atan2(y2 - y1, x2 - x1), L = ep * 2.6, l = ep * 1.5, bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
    D.el("line", { x1: x1, y1: y1, x2: bx, y2: by, stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, g);
    D.el("polygon", { points: pts([[x2, y2], [bx - l * Math.sin(a), by + l * Math.cos(a)], [bx + l * Math.sin(a), by - l * Math.cos(a)]]), fill: coul }, g);
    return g;
  }
  /* flèche dont les extrémités changent à chaque image → f(x1, y1, x2, y2, opacité) */
  function flecheVar(p, coul, ep) {
    const g = D.el("g", {}, p), l = D.el("line", { stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, g), h = D.el("polygon", { fill: coul }, g);
    return function (x1, y1, x2, y2, o) {
      const a = Math.atan2(y2 - y1, x2 - x1), L = ep * 2.6, w = ep * 1.5, bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
      ap(l, { x1: x1, y1: y1, x2: bx, y2: by }); h.setAttribute("points", pts([[x2, y2], [bx - w * Math.sin(a), by + w * Math.cos(a)], [bx + w * Math.sin(a), by - w * Math.cos(a)]]));
      g.setAttribute("opacity", D.borne(o, 0, 1).toFixed(2));
    };
  }
  /* arc fléché : centre (cx, cy), rayon r, de a0 à a1 (degrés ; sens des aiguilles d'une montre si a1 > a0) */
  function arc(p, cx, cy, r, a0, a1, coul, ep) {
    const g = D.el("g", {}, p), rad = a => a * Math.PI / 180, pt = a => [cx + r * Math.cos(rad(a)), cy + r * Math.sin(rad(a))];
    const [x0, y0] = pt(a0), [x1, y1] = pt(a1), sg = a1 > a0 ? 1 : -1;
    D.el("path", { d: "M " + x0.toFixed(1) + " " + y0.toFixed(1) + " A " + r + " " + r + " 0 " + (Math.abs(a1 - a0) > 180 ? 1 : 0) + " " + (sg > 0 ? 1 : 0) + " " + x1.toFixed(1) + " " + y1.toFixed(1), fill: "none", stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, g);
    const tx = -Math.sin(rad(a1)) * sg, ty = Math.cos(rad(a1)) * sg, L = ep * 2.8, l = ep * 1.6;
    D.el("polygon", { points: pts([[x1 + tx * L, y1 + ty * L], [x1 - ty * l, y1 + tx * l], [x1 + ty * l, y1 - tx * l]]), fill: coul }, g);
    return g;
  }
  /* point à la fraction u (0..1) d'une ligne brisée */
  function suivre(l, u) {
    const L = [0];
    for (let i = 1; i < l.length; i++) L.push(L[i - 1] + Math.hypot(l[i][0] - l[i - 1][0], l[i][1] - l[i - 1][1]));
    const d = D.borne(u, 0, 1) * L[L.length - 1];
    let i = 1;
    while (i < l.length - 1 && d > L[i]) i++;
    const f = (d - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
    return [D.lerp(l[i - 1][0], l[i][0], f), D.lerp(l[i - 1][1], l[i][1], f)];
  }
  /* tuyau suivant une ligne brisée : paroi de cuivre, intérieur de la couleur du fluide (rendu) */
  function tuyauPoly(p, l, ep, coul) {
    D.el("polyline", { points: pts(l), fill: "none", stroke: "#9a5a2e", "stroke-width": ep + 10, "stroke-linejoin": "round" }, p);
    return D.el("polyline", { points: pts(l), fill: "none", stroke: coul, "stroke-width": ep, "stroke-linejoin": "round" }, p);
  }
  /* reflets qui filent dans un tuyau plein (nb traits, graine) → f(t, vitesse en tours de tuyau par seconde, visibilité) */
  function reflets(p, l, nb, graine) {
    const r = D.alea(graine), L = [];
    for (let i = 0; i < nb; i++) L.push({ s: r(), l: 0.035 + r() * 0.03, dy: (r() - 0.5) * 6, e: D.el("line", { stroke: "#fff", "stroke-width": 3.5, "stroke-linecap": "round", opacity: 0 }, p) });
    return function (t, vit, vis) {
      L.forEach(c => {
        const u = D.frac(c.s + t * vit), [x1, y1] = suivre(l, u), [x2, y2] = suivre(l, Math.min(1, u + c.l));
        ap(c.e, { x1: x1, y1: y1 + c.dy, x2: x2, y2: y2 + c.dy });
        c.e.setAttribute("opacity", (0.65 * vis * D.fenetre(u, 0, 1, 0.08)).toFixed(2));
      });
    };
  }
  /* petite molécule de vapeur d'une couleur choisie (la vapeur de l'économiseur est verte) */
  function molC(p, coul) {
    const u = D.el("use", { href: "#vm-mol", fill: coul }, p);
    return (x, y, o) => { u.setAttribute("x", x.toFixed(1)); u.setAttribute("y", y.toFixed(1)); u.setAttribute("opacity", (o === undefined ? 1 : D.borne(o, 0, 1)).toFixed(2)); };
  }

  /* ---------- la vis vue de côté : un fond de creux, des lobes d'acier en diagonale qui défilent ---------- */
  const G = { xI0: 212, xI1: 660, yH: 26, yB: 236, yM: 84, yF: 178, yV: 131, pas: 70, lobe: 36, pente: 0.55, xA: 300, Wmax: 120, Wmin: 40, xAsp: [215, 322], xEco: 520 };
  G.poche = u => ({ xL: G.xA + u * (G.xI1 - G.Wmin - G.xA), W: D.lerp(G.Wmax, G.Wmin, u) }); // u : 0 = alvéole juste fermée, 1 = au refoulement
  const chev = (xL, W) => { const d = G.pente * 87; return pts([[xL + d, 44], [xL + d + W, 44], [xL + W, G.yV], [xL + d + W, 218], [xL + d, 218], [xL, G.yV]]); };
  function bande(parent, o) { // o : { x, y, w, h, yRef, sens (−1 : lobes en « / », +1 : en « \ »), decal, fond } → maj(phase)
    const cid = "vcb" + (++nid), g = D.el("g", {}, parent);
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

  /* ---------- le compresseur à vis en coupe le long des rotors ----------
     Repère LOCAL : x 20 → 740, y −34 → 292 (aspiration à gauche, refoulement à droite). o : { x, y, k, eco, nmol }.
     Rend { g, k, pt(lx, ly) → écran, fond, dedans, devant, mur(x, y, l, h), fonte, hach, maj(p) }.
     maj(p) : { t, phase (déplacement des lobes, px locaux), alv: { xL, W, ouverte, halo, op, nmol },
                heroine: { s, temp, etat, humeur, ecrase, regard, dx, dy, op } } */
  function vueLongue(parent, o) {
    const k = o.k || 1, uid = "vcl" + (++nid);
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
      g: g, k: k, fond: fond, dedans: dedans, devant: devant, mur: mur, fonte: "url(#" + uid + "f)", hach: "url(#" + uid + "h)",
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

  /* ---------- 9 · l'économiseur : une porte de plus ----------
     k0-k1 : la carte (la molécule refait le tour jusqu'à l'aspiration) ; k2 : la vue longue, l'orifice
     économiseur au milieu de la carcasse ; k3 : il débouche dans une alvéole fermée ; k4 : le
     sous-refroidisseur, vapeur verte ; k5 : le liquide ressort plus froid ; k6 : flèche verte ; k7 : « un autre voyage ». */
  S.economiseur = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    const cartG = D.el("g", {}, g), vueG = D.el("g", {}, g);
    // ----- la carte -----
    const cir = D.circuit(cartG, 40, 170, 880, true), petite = D.heroine(cartG, { r: 30 });
    const REP = [[T[0], 6], [E[0], 12.1], [T[1], 12.4], [E[1], 16.5]];
    const tempCarte = w => D.courbe([[6, 0.62], [7, 0.58], [7.8, 0.5], [10.9, 0.45], [11.3, 0.08], [14.2, 0.08], [15, 0.15], [16.5, 0.2]], w, true);
    const etatCarte = w => w < 7.5 ? "vapeur" : w < 11.2 ? "liquide" : w < 14.3 ? "bout" : "vapeur";
    const diagDe = w => D.courbe([[6, 5], [7.3, 6], [8, 7.9], [8.3, 8], [10.9, 8], [11.4, 9], [13, 9], [13.9, 10], [14.1, 10.1], [16.5, 12]], w, true);
    const ORG = [["separateurHuile", 5.9, 6.6], ["condenseur", 7, 8.1], ["bouteille", 8.7, 9.3], ["detendeur", 10.6, 11.5], ["evaporateur", 13, 14.1], ["compresseur", 15.6, 16.7]];
    // ----- la vue longue -----
    const V = vueLongue(vueG, { x: 40, y: 190, k: 0.9, eco: true });
    const anneau = rect(V.devant, G.xEco - 40, 228, 80, 70, { rx: 14, fill: "none", stroke: D.ORANGE, "stroke-width": 6, opacity: 0 });
    const etqOr = D.el("g", {}, vueG);
    D.etiquette(etqOr, 456, 484, "orifice économiseur", { "text-anchor": "end" });
    D.trait(etqOr, 466, 468, 498, 442, D.ORANGE);
    const etqAlv = D.el("g", {}, vueG), traitAlv = D.trait(etqAlv, 560, 192, 500, 230, D.ORANGE);
    D.etiquette(etqAlv, 560, 184, "alvéole", { "text-anchor": "middle", fill: D.ORANGE });
    // ----- le sous-refroidisseur, relié à l'orifice (k4) -----
    const ecoG = D.el("g", {}, vueG), BX = 408, BY = 520, BW = 200, BH = 90, CX = BX + BW / 2, YL = BY + BH / 2;
    D.tube(ecoG, CX - 22, 452, 44, BY - 452 + 4, "cuivre", true);
    const gid = "vcg" + (++nid), gr = D.el("linearGradient", { id: gid, x1: BX, x2: BX + BW, y1: 0, y2: 0, gradientUnits: "userSpaceOnUse" }, ecoG);
    [[0, D.couleur(0.5, false)], [1, D.couleur(0.14, false)]].forEach(([of, cc]) => D.el("stop", { offset: of, "stop-color": cc }, gr));
    rect(ecoG, BX, BY, BW, BH, { rx: 10, fill: "#e9eef3", stroke: "#56636f", "stroke-width": 4 });
    for (let i = 0; i < 9; i++) rect(ecoG, BX + 8 + i * 20.4 + 1.5, BY + 8, 17.4, BH - 16, { fill: i % 2 ? "#a9dcc2" : "url(#" + gid + ")" });
    D.etiquette(ecoG, CX, 650, "sous-refroidisseur", { "text-anchor": "middle" });
    const vapV = [0, 1, 2, 3, 4].map(() => molC(ecoG, VERT)), vapC = [1, 3, 5, 7].map(() => molC(ecoG, VERT));
    // ----- la ligne liquide (k5) -----
    const liqG = D.el("g", {}, vueG), L1 = [[60, YL], [BX, YL]], L2 = [[BX + BW, YL], [930, YL]];
    tuyauPoly(liqG, L1, 22, D.couleur(0.5, false));
    const sortie = tuyauPoly(liqG, L2, 22, D.couleur(0.5, false));
    const refl1 = reflets(liqG, L1, 5, 3), refl2 = reflets(liqG, L2, 7, 4);
    D.etiquette(liqG, 950, YL - 34, "vers le détendeur", { "text-anchor": "end" });
    // ----- k6 : la flèche verte, posée dans la scène -----
    const vertG = D.el("g", {}, vueG);
    D.etiquette(vertG, 955, 636, "sur le diagramme :", { "text-anchor": "end", fill: VERT });
    fleche(vertG, 955, 674, 775, 674, VERT, 14);
    D.etiquette(vertG, 955, 724, "vers la gauche", { "text-anchor": "end", fill: VERT });
    // ----- k7 : « un autre voyage » -----
    const cadreG = D.el("g", {}, vueG);
    rect(cadreG, BX - 50, BY - 22, BW + 100, 178, { rx: 18, fill: "none", stroke: D.ORANGE, "stroke-width": 5, "stroke-dasharray": "14 9" });
    D.etiquette(cadreG, CX, 712, "un autre voyage", { "text-anchor": "middle", fill: D.ORANGE });
    const pan = D.el("g", {}, cadreG);
    rect(pan, 596, 476, 104, 40, { rx: 10, fill: D.ORANGE, stroke: "#fff", "stroke-width": 3 });
    D.texte(pan, 648, 505, "bientôt", { "text-anchor": "middle", fill: "#fff", "font-size": 30, "font-weight": 700, "font-family": SANS });
    const p5 = D.pastille(vueG, 440, 742, "plus de froid, même compresseur", BLEU, 30, "middle"), p6 = D.pastille(vueG, 440, 742, "chaque kilo prend plus de chaleur", VERT, 30, "middle");
    return function (t) {
      const w = D.courbe(REP, t, true), carte = t < T[2];
      op(cartG, 1 - D.lisse((t - (E[1] + 0.05)) / 0.3)); op(vueG, D.lisse((t - (E[1] + 0.2)) / 0.5));
      ORG.forEach(([n, a, b]) => cir.surligne(n, w > a && w < b));
      const [px, py] = cir.ecran(...D.circuitPoint(w));
      const hCarte = w < 7.3 ? "chaud" : w > 11.2 && w < 13.6 ? "froid" : "sourire";
      petite({ x: px, y: py, s: 0.85, t: t, temp: tempCarte(w), etat: etatCarte(w), humeur: hCarte });
      // l'alvéole : elle avance avec les lobes jusqu'à l'orifice économiseur, puis presque au ralenti
      const u = D.courbe([[T[2], 0], [E[3], 0.34], [E[4], 0.46], [DUR, 0.52]], t, true), pc = G.poche(u);
      const temp = D.courbe([[T[2], 0.2], [E[3], 0.38], [A(4, 0.5), 0.38], [E[4], 0.33]], t, true);
      const humeur = t > A(3, 0.25) && t < E[3] + 0.4 ? "surprise" : "sourire";
      V.maj({ t: t, phase: 10.3 * (t - T[2]), alv: { xL: pc.xL, W: pc.W, temp: temp, halo: 0.55 * D.fenetre(t, A(3, 0.1), E[3] + 0.8, 0.5) * (0.65 + 0.35 * Math.sin(t * 5)) },
        heroine: { s: 0.62, temp: temp, humeur: humeur, ecrase: D.courbe([[T[2], 0.05], [E[3], 0.3]], t, true), regard: t < T[3] ? [0.8, 1] : [0, 0] } });
      op(anneau, D.fenetre(t, T[2] + 0.3, E[2], 0.4) * (0.6 + 0.4 * Math.sin(t * 6)));
      op(etqOr, D.lisse((t - (T[2] + 0.5)) / 0.5));
      op(etqAlv, D.fenetre(t, T[3], E[3] + 0.6, 0.4));
      ap(traitAlv, { x2: 40 + 0.9 * (pc.xL + 48 + pc.W / 2), y2: 232 });
      // k4 : le sous-refroidisseur, la vapeur verte qui entre dans l'alvéole
      op(ecoG, D.lisse((t - (T[4] - 0.1)) / 0.6));
      const fv = D.lisse((t - (T[4] + 0.3)) / 0.8);
      vapV.forEach((m, i) => { const q = D.frac(t * 0.32 + i / 5), y = D.lerp(508, 396, q); m(CX + Math.sin(t * 3 + i) * 7, y, fv * D.fenetre(q, 0, 1, 0.14)); });
      vapC.forEach((m, i) => { const q = D.frac(t * 0.28 + i * 0.27); m(BX + 8 + (2 * i + 1) * 20.4 + 10.2, BY + BH - 14 - q * (BH - 30), fv * 0.9 * D.fenetre(q, 0, 1, 0.2)); });
      // k5 : la ligne liquide, plus bleue en sortie
      op(liqG, D.lisse((t - (T[5] - 0.1)) / 0.5));
      sortie.setAttribute("stroke", D.couleur(D.lerp(0.5, 0.14, D.lisse((t - A(5, 0.15)) / 3)), false));
      refl1(t, 0.5, 1); refl2(t, 0.5, 1);
      op(p5, D.fenetre(t, A(5, 0.1), E[5] + 0.7, 0.4));
      // k6 : la flèche verte ; k7 : le cadre « un autre voyage »
      op(vertG, D.fenetre(t, T[6] + 0.2, DUR, 0.5));
      op(p6, D.fenetre(t, T[6], E[6] + 0.7, 0.4));
      op(cadreG, D.lisse((t - (T[7] - 0.1)) / 0.6));
      return { temp: carte ? tempCarte(w) : temp, etat: carte ? etatCarte(w) : "vapeur", humeur: carte ? hCarte : humeur,
        carte: carte ? w : 16.5, diag: carte ? diagDe(w) : D.courbe([[T[2], 12], [E[3], 13]], t, true), diag0: carte ? 5 : 12 };
    };
  };

  /* ---------- 10 · à l'arrêt : jamais à l'envers ----------
     Vue longue + tube de refoulement à droite (clapet anti-retour en coupe : un battant), qui mène au séparateur.
     k0 : les vis s'arrêtent ; k1 : la haute pression pousse depuis la droite ; k2 : vignette « sans clapet » ;
     k3 : le battant se ferme, les flèches s'arrêtent dessus ; k4 : contrôleur du sens de rotation ;
     k5 : résistance de carter sous la nappe d'huile. Pas de point sur le diagramme. */
  S.arret = function (g, c) {
    const T = c.T, E = c.E, A = c.A, YP = 290.8;
    const V = vueLongue(g, { x: 30, y: 195, k: 0.72 });
    // le carter d'huile sous la carcasse : nappe ambre (la résistance de carter s'y ajoute à k5)
    rect(V.fond, 304, 262, 242, 68, { fill: CLAIR });
    const huile = D.liquide(V.dedans, { x0: 304, x1: 546, yh: 262, yb: 330, niveau: () => 0.7, couleur: () => D.HUILE, pas: 15 });
    [[290, 262, 14, 82], [546, 262, 14, 82], [290, 330, 270, 14]].forEach(a => V.mur(...a));
    const zig = [], NZ = 18;
    for (let i = 0; i <= NZ; i++) zig.push([316 + i * (218 / NZ), 318 + (i % 2 ? -7 : 7)]);
    const resG = D.el("g", {}, V.devant);
    D.el("polyline", { points: pts(zig), fill: "none", stroke: ROUGE, "stroke-width": 5, "stroke-linejoin": "round", "stroke-linecap": "round" }, resG);
    const chal = [0, 1, 2, 3, 4].map(() => D.chaleur(resG));
    // le tube de refoulement, le clapet en coupe, le séparateur (la haute pression, derrière)
    const cloche = (x, y, w, h, fond) => rect(g, x, y, w, h, { rx: 22, fill: fond });
    D.tube(g, 562, 257, 42, 67.5, "cuivre", false); D.tube(g, 706, 257, 148, 67.5, "cuivre", false);
    cloche(600, 224, 110, 134, "url(#vm-cuivre)"); rect(g, 610, 236, 90, 110, { rx: 12, fill: CLAIR });
    rect(g, 598, 267, 16, 47.5, { fill: CLAIR }); rect(g, 696, 267, 16, 47.5, { fill: CLAIR });
    rect(g, 846, 196, 112, 204, { rx: 40, fill: "url(#vm-acier-h)" }); rect(g, 860, 210, 84, 176, { rx: 28, fill: CLAIR }); rect(g, 844, 267, 20, 47.5, { fill: CLAIR });
    const gaz = [0, 1, 2, 3, 4].map(() => D.mol(g)), fl = D.el("g", {}, g), flA = [0, 1, 2].map(() => fleche(fl, 60, 0, 0, 0, D.ORANGE, 11)), flB = D.el("g", {}, g);
    [672, 756].forEach(x => fleche(flB, x + 56, YP, x, YP, D.ORANGE, 11));
    rect(g, 645, 236, 10, 34, { fill: "url(#vm-acier-h)", stroke: "#3d4650", "stroke-width": 1.5 }); rect(g, 645, 312, 10, 34, { fill: "url(#vm-acier-h)", stroke: "#3d4650", "stroke-width": 1.5 });
    const battant = D.el("g", {}, g);
    rect(battant, -5, -3, 10, 61, { rx: 4, fill: "url(#vm-acier-h)", stroke: "#3d4650", "stroke-width": 2 });
    D.el("circle", { r: 7, fill: "#3d4650" }, battant);
    const mila = D.heroine(g, { r: 30 });
    const etqC = D.el("g", {}, g);
    D.etiquette(etqC, 655, 418, "clapet anti-retour", { "text-anchor": "middle" });
    D.trait(etqC, 655, 392, 655, 362, D.ORANGE);
    // k2 : « sans clapet » — les vis tourneraient à l'envers
    const vigG = D.el("g", {}, g);
    rect(vigG, 40, 472, 470, 270, { rx: 18, fill: "#fffdf8", stroke: ROUGE, "stroke-width": 4 });
    D.etiquette(vigG, 275, 516, "sans clapet", { "text-anchor": "middle", fill: ROUGE, "font-weight": 700 });
    const bM = bande(vigG, { x: 66, y: 540, w: 280, h: 50, yRef: 590, sens: -1 }), bF = bande(vigG, { x: 66, y: 590, w: 280, h: 50, yRef: 590, sens: 1, decal: 35, fond: "#667380" });
    arc(vigG, 430, 590, 44, -40, -320, ROUGE, 10);
    D.el("line", { x1: 490, y1: 490, x2: 60, y2: 726, stroke: ROUGE, "stroke-width": 12, "stroke-linecap": "round", opacity: 0.85 }, vigG);
    // k4 : le contrôleur du sens de rotation (trois phases L1 L2 L3, une flèche verte)
    const boiG = D.el("g", {}, g), WX = [78, 106, 134], WY = [568, 606, 644], WC = ["#6b4a2b", "#222", "#8a8f96"];
    WY.forEach((y, i) => D.el("polyline", { points: pts([[571, y], [WX[i], y], [WX[i], 326]]), fill: "none", stroke: WC[i], "stroke-width": 5, "stroke-linejoin": "round" }, boiG));
    rect(boiG, 560, 456, 380, 262, { rx: 18, fill: "#eef2f6", stroke: BLEU, "stroke-width": 4 });
    D.lignes(boiG, 750, 500, ["contrôleur du", "sens de rotation"], { "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: BLEU, "font-family": SANS }, 40);
    ["L1", "L2", "L3"].forEach((l, i) => { D.el("circle", { cx: 582, cy: WY[i], r: 11, fill: WC[i], stroke: "#fff", "stroke-width": 3 }, boiG); D.etiquette(boiG, 606, WY[i] + 10, l, { "font-size": 30 }); });
    arc(boiG, 810, 626, 46, -150, 130, VERT, 11);
    // k5 : « l'huile reste chaude »
    const etqH = D.el("g", {}, g);
    D.etiquette(etqH, 372, 500, "l'huile reste chaude", { "text-anchor": "middle", fill: ROUGE });
    D.trait(etqH, 372, 474, 372, 448, ROUGE);
    // vitesse des vis : régime, puis arrêt (intégrale en forme fermée : continue même à l'arrêt)
    const ts = T[0] + 0.5, dd = 1.4, V0 = 55;
    const phase = t => { const q = D.borne((t - ts) / dd, 0, 1); return V0 * (Math.min(t, ts) + dd * (q - q * q * q + q * q * q * q / 2)); };
    const tFerme = A(3, 0.08);
    return function (t) {
      const ph = phase(t), th = D.courbe([[tFerme, 68], [A(3, 0.45), 0]], t);
      V.maj({ t: t, phase: ph });
      // gaz refoulé vers le séparateur tant que ça tourne, puis il s'efface
      const og = 1 - D.lisse((t - (ts + 1)) / 1.2);
      gaz.forEach((m, i) => m(566 + ((i * 58 + 2.4 * ph) % 270 + 270) % 270, YP + Math.sin(i * 2 + t * (t < ts ? 3 : 0)) * 8, 0.62, true, og));
      battant.setAttribute("transform", "translate(661 262) rotate(" + (-th).toFixed(1) + ")");
      // k1 → k3 : la haute pression pousse vers les vis ; le battant ferme, les flèches restent plaquées dessus
      op(fl, D.fenetre(t, T[1], tFerme + 0.35, 0.4));
      flA.forEach((a, i) => a.setAttribute("transform", "translate(" + (836 - ((t * 110 + i * 95) % 285 + 285) % 285 - 60).toFixed(1) + " " + YP + ")"));
      op(flB, D.lisse((t - (tFerme + 0.1)) / 0.4));
      flB.setAttribute("transform", "translate(" + (Math.sin(t * 9) * 3 * D.lisse((t - tFerme - 0.5) / 0.4)).toFixed(1) + " 0)");
      op(etqC, D.lisse((t - (T[3] + 0.3)) / 0.5));
      op(vigG, D.fenetre(t, T[2] - 0.1, E[2] + 0.35, 0.4));
      const vp = -45 * (t - T[2]);
      bM(vp); bF(vp);
      op(boiG, D.lisse((t - (T[4] - 0.1)) / 0.5));
      op(resG, D.lisse((t - (T[5] - 0.1)) / 0.5));
      chal.forEach((h, i) => { const q = D.frac(t * 0.45 + i / 5); h(330 + i * 48, 312 - q * 40, 180, 0.9 * D.fenetre(q, 0, 1, 0.25)); });
      op(etqH, D.lisse((t - (A(5, 0.15))) / 0.5));
      huile.maj(t);
      const humeur = t < T[1] ? "surprise" : t < T[3] ? "triste" : "sourire";
      mila({ x: 904, y: YP, s: 0.8, t: t, temp: 0.62, etat: "vapeur", humeur: humeur });
      return { temp: 0.62, etat: "vapeur", humeur: humeur };
    };
  };

  /* ---------- 11 · ce que l'on surveille : le tableau de bord du technicien ----------
     Cinq vignettes qui s'allument une par une (k1 à k5) : voyant d'huile, filtre et contrôleur de débit,
     thermomètre au refoulement (le calque « sans huile » vient du récit, k3), sens de rotation et pince
     ampèremétrique, oreille et paliers. k0 : l'héroïne au centre, loupe de technicien. */
  S.surveillance = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const COL = [26, 344, 662], LIG = [168, 470], W = 292, H = 272, POS = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1]];
    const centre = i => [COL[POS[i][0]] + W / 2, LIG[POS[i][1]] + H / 2];
    const tuiles = POS.map(([cx, cy]) => {
      const tg = D.el("g", { transform: "translate(" + COL[cx] + " " + LIG[cy] + ")" }, g);
      return { cadre: rect(tg, 0, 0, W, H, { rx: 18, fill: "#fffdf8", stroke: "#c9d2dc", "stroke-width": 3 }), cont: D.el("g", {}, tg) };
    });
    const titre = (k, s) => D.etiquette(k, W / 2, 42, s, { "text-anchor": "middle", "font-weight": 700, fill: BLEU });
    const sous = (k, s) => D.etiquette(k, W / 2, 260, s, { "text-anchor": "middle", "font-size": 28 });
    // 1 · le voyant d'huile du séparateur : le niveau d'huile, le repère « mini »
    let nv0 = 0.62, huile0, bague0, mini0;
    { const k = tuiles[0].cont, cx = 112, cy = 154, cid = "vcs" + (++nid), ym = cy + 50 - 0.25 * 100;
      titre(k, "voyant d'huile");
      D.el("circle", { cx: cx, cy: cy, r: 50 }, D.el("clipPath", { id: cid }, k));
      D.el("circle", { cx: cx, cy: cy, r: 50, fill: CLAIR }, k);
      huile0 = D.liquide(D.el("g", { "clip-path": "url(#" + cid + ")" }, k), { x0: cx - 50, x1: cx + 50, yh: cy - 50, yb: cy + 50, niveau: () => nv0, couleur: () => D.HUILE, pas: 10 });
      bague0 = D.el("circle", { cx: cx, cy: cy, r: 56, fill: "none", stroke: "#56636f", "stroke-width": 13 }, k);
      D.el("path", { d: "M " + (cx - 36) + " " + (cy - 24) + " A 44 44 0 0 1 " + (cx - 12) + " " + (cy - 42), fill: "none", stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round", opacity: 0.7 }, k);
      D.el("line", { x1: cx - 64, x2: cx + 74, y1: ym, y2: ym, stroke: ROUGE, "stroke-width": 4, "stroke-dasharray": "9 6" }, k);
      mini0 = D.etiquette(k, cx + 82, ym + 10, "mini", { fill: ROUGE, "font-weight": 700 });
    }
    // 2 · le filtre d'huile et le contrôleur de débit d'huile
    let flot = 1, clog = 0, refl1, refl2, specks, led, paddle;
    { const k = tuiles[1].cont;
      titre(k, "filtre d'huile"); sous(k, "contrôleur de débit");
      D.tube(k, 8, 126, 280, 50, "cuivre", false, "#f0d089");
      rect(k, 104, 82, 80, 136, { rx: 14, fill: "url(#vm-acier-h)" }); rect(k, 112, 90, 64, 120, { rx: 8, fill: "#f6e3b0" });
      rect(k, 102, 136, 14, 30, { fill: "#f0d089" }); rect(k, 172, 136, 14, 30, { fill: "#f0d089" });
      rect(k, 126, 98, 36, 104, { rx: 4, fill: "#cfd8e1", stroke: "#8493a3", "stroke-width": 2 });
      for (let i = 1; i < 6; i++) D.el("line", { x1: 126 + i * 6, x2: 126 + i * 6, y1: 100, y2: 200, stroke: "#8493a3", "stroke-width": 1.5 }, k);
      const rs = D.alea(5); specks = [];
      for (let i = 0; i < 16; i++) specks.push(D.el("circle", { cx: 120 + rs() * 8, cy: 104 + rs() * 92, r: 3 + rs() * 2, fill: "#5b4a2a", opacity: 0 }, k));
      refl1 = reflets(k, [[14, 151], [100, 151]], 4, 5); refl2 = reflets(k, [[190, 151], [282, 151]], 4, 6);
      rect(k, 204, 64, 48, 46, { rx: 8, fill: "#dfe6ee", stroke: "#3d4650", "stroke-width": 3 });
      led = D.el("circle", { cx: 228, cy: 87, r: 11, fill: VERT, stroke: "#3d4650", "stroke-width": 2 }, k);
      D.el("line", { x1: 228, y1: 110, x2: 228, y2: 141, stroke: "#3d4650", "stroke-width": 6 }, k);
      paddle = D.el("g", { transform: "translate(228 141)" }, k);
      rect(paddle, -4, 0, 8, 22, { rx: 3, fill: "url(#vm-acier-h)", stroke: "#3d4650", "stroke-width": 1.5 });
      D.el("circle", { r: 5.5, fill: "#3d4650" }, paddle);
      D.trait(k, 228, 236, 228, 178, GRIS);
    }
    // 3 · le thermomètre au refoulement
    let merc, bulbe;
    { const k = tuiles[2].cont;
      titre(k, "température"); sous(k, "au refoulement");
      D.tube(k, 8, 186, 280, 44, "cuivre", false, "#f6d3a8");
      for (let i = 0; i < 7; i++) D.el("line", { x1: 118, x2: 130, y1: 74 + i * 19, y2: 74 + i * 19, stroke: GRIS, "stroke-width": 3 }, k);
      rect(k, 136, 62, 26, 134, { rx: 13, fill: "#fff", stroke: "#3d4650", "stroke-width": 3 });
      merc = rect(k, 142, 120, 14, 74, { fill: ROUGE });
      bulbe = D.el("circle", { cx: 149, cy: 202, r: 20, fill: ROUGE, stroke: "#3d4650", "stroke-width": 3 }, k);
    }
    // 4 · le sens de rotation et l'intensité (pince ampèremétrique)
    let pales, onde;
    { const k = tuiles[3].cont;
      titre(k, "sens de rotation"); sous(k, "intensité du moteur");
      D.el("circle", { cx: 80, cy: 150, r: 40, fill: "#eef3f8", stroke: "#3d4650", "stroke-width": 5 }, k);
      pales = D.el("g", { transform: "translate(80 150)" }, k);
      for (let a = 0; a < 3; a++) D.el("ellipse", { cx: 0, cy: -19, rx: 9, ry: 19, fill: "#9fbfe0", stroke: BLEU, "stroke-width": 2.5, transform: "rotate(" + a * 120 + ")" }, pales);
      D.el("circle", { cx: 80, cy: 150, r: 6, fill: BLEU }, k);
      arc(k, 80, 150, 62, -150, 130, VERT, 9);
      rect(k, 188, 132, 76, 98, { rx: 12, fill: "#f2c94c", stroke: "#8a6a1f", "stroke-width": 3 });
      D.el("circle", { cx: 226, cy: 104, r: 32, fill: "none", stroke: "#3d4650", "stroke-width": 13 }, k);
      D.el("circle", { cx: 226, cy: 104, r: 11, fill: "#8a4a24", stroke: "#3d4650", "stroke-width": 3 }, k);
      rect(k, 198, 144, 56, 38, { rx: 6, fill: "#cfe3d4", stroke: "#56636f", "stroke-width": 2 });
      onde = D.el("polyline", { fill: "none", stroke: VERT, "stroke-width": 3.5, "stroke-linejoin": "round" }, k);
      [212, 240].forEach(x => D.el("circle", { cx: x, cy: 208, r: 8, fill: "#3d4650" }, k));
    }
    // 5 · l'oreille : un palier qui fait du bruit
    let billes, ondes = [];
    { const k = tuiles[4].cont, bx = 66, by = 152;
      titre(k, "à l'oreille"); sous(k, "un bruit nouveau");
      D.el("circle", { cx: bx, cy: by, r: 44, fill: "#eef3f8", stroke: "#56636f", "stroke-width": 14 }, k);
      D.el("circle", { cx: bx, cy: by, r: 19, fill: "url(#vm-acier-h)", stroke: "#3d4650", "stroke-width": 3 }, k);
      billes = D.el("g", { transform: "translate(" + bx + " " + by + ")" }, k);
      for (let a = 0; a < 8; a++) D.el("circle", { cx: 31.5 * Math.cos(a * Math.PI / 4), cy: 31.5 * Math.sin(a * Math.PI / 4), r: 7, fill: "url(#vm-acier-h)", stroke: "#3d4650", "stroke-width": 2 }, billes);
      for (let i = 0; i < 3; i++) ondes.push(D.el("path", { fill: "none", stroke: ROUGE, "stroke-width": 6, "stroke-linecap": "round" }, k));
      const e = D.el("g", { transform: "translate(222 150) scale(0.92)" }, k);
      D.el("path", { d: "M -8 -58 C 30 -70 66 -38 58 6 C 54 36 30 44 22 72 C 16 96 -14 96 -24 76 L -24 -50 Z", fill: "#f3cfae", stroke: "#8a5a3a", "stroke-width": 5, "stroke-linejoin": "round" }, e);
      D.el("path", { d: "M 8 -30 C 30 -34 42 -10 32 12 C 26 24 14 28 12 44", fill: "none", stroke: "#8a5a3a", "stroke-width": 5, "stroke-linecap": "round" }, e);
      D.el("circle", { cx: 6, cy: 14, r: 6, fill: "#8a5a3a" }, e);
    }
    // l'héroïne et sa loupe de technicien
    const mila = D.heroine(g, { r: 30 }), loupe = D.el("g", {}, g);
    D.el("line", { x1: -28, y1: 0, x2: -56, y2: 0, stroke: "#8a5a2a", "stroke-width": 12, "stroke-linecap": "round" }, loupe);
    D.el("circle", { r: 31, fill: "rgba(190,225,245,.4)", stroke: "#3d4650", "stroke-width": 8 }, loupe);
    D.el("path", { d: "M -16 -12 A 19 19 0 0 1 -2 -20", fill: "none", stroke: "#fff", "stroke-width": 4, "stroke-linecap": "round", opacity: 0.8 }, loupe);
    const SLOT = [COL[2] + W / 2, 606], tl = i => T[i + 1] - 0.2;
    const unit = (a, b) => { const d = Math.hypot(b[0] - a[0], b[1] - a[1]); return [(b[0] - a[0]) / d, (b[1] - a[1]) / d]; };
    const VEC = [[-0.7, -0.7]].concat([0, 1, 2, 3, 4].map(i => unit(SLOT, centre(i))));
    const repV = d => { const r = [[0, VEC[0][d]]]; for (let i = 0; i < 5; i++) { r.push([tl(i), VEC[i][d]]); r.push([tl(i) + 0.6, VEC[i + 1][d]]); } return r; };
    const repX = repV(0), repY = repV(1);
    return function (t) {
      tuiles.forEach((tu, i) => {
        const lit = D.lisse((t - tl(i)) / 0.5), act = t >= tl(i) && t < (i < 4 ? tl(i + 1) : E[5] + 1.2);
        op(tu.cont, lit);
        tu.cadre.setAttribute("stroke", act ? D.ORANGE : lit > 0.5 ? BLEU : "#c9d2dc"); tu.cadre.setAttribute("stroke-width", act ? 7 : 3);
      });
      // 1 · voyant : le niveau baisse sous le repère « mini »
      nv0 = D.courbe([[T[1], 0.62], [A(1, 0.4), 0.62], [E[1] - 0.6, 0.14]], t, true); huile0.maj(t);
      bague0.setAttribute("stroke", nv0 < 0.25 ? ROUGE : "#56636f");
      // 2 · le filtre se bouche, le débit tombe, la palette retombe, le voyant passe au rouge
      flot = 1 - D.lisse((t - A(2, 0.45)) / 2.6); clog = D.lisse((t - A(2, 0.22)) / 3.6);
      specks.forEach((e, i) => op(e, D.borne(clog * 16 - i, 0, 1)));
      refl1(t, 0.5 * flot, 1); refl2(t, 0.5 * flot, flot > 0.15 ? 1 : 0);
      paddle.setAttribute("transform", "translate(228 141) rotate(" + (-38 * flot).toFixed(1) + ")");
      led.setAttribute("fill", flot > 0.4 ? VERT : ROUGE);
      // 3 · la colonne monte et rougit
      const p = D.courbe([[T[3], 0], [A(3, 0.3), 0.12], [E[3] - 0.5, 1]], t, true), hh = D.lerp(26, 118, p), cm = D.couleur(D.lerp(0.5, 0.98, p), false);
      ap(merc, { y: 194 - hh, height: hh + 4, fill: cm }); bulbe.setAttribute("fill", cm);
      // 4 · l'hélice tourne dans le bon sens, la pince lit l'intensité
      pales.setAttribute("transform", "translate(80 150) rotate(" + ((t * 110) % 360).toFixed(1) + ")");
      const w = []; for (let i = 0; i <= 14; i++) w.push([200 + i * 3.7, 166 + Math.sin(i * 0.9 - t * 7) * 11]);
      onde.setAttribute("points", pts(w));
      // 5 · le palier tourne, les ondes partent vers l'oreille
      billes.setAttribute("transform", "translate(66 152) rotate(" + ((t * 70) % 360).toFixed(1) + ")");
      ondes.forEach((o, i) => {
        const q = D.frac(t * 0.8 + i / 3), r = D.lerp(62, 128, q), a = 34 * Math.PI / 180;
        o.setAttribute("d", "M " + (66 + r * Math.cos(-a)).toFixed(1) + " " + (152 + r * Math.sin(-a)).toFixed(1) + " A " + r.toFixed(1) + " " + r.toFixed(1) + " 0 0 1 " + (66 + r * Math.cos(a)).toFixed(1) + " " + (152 + r * Math.sin(a)).toFixed(1));
        o.setAttribute("opacity", (0.9 * (1 - q) * (t > tl(4) ? 1 : 0)).toFixed(2));
      });
      // l'héroïne : au centre, puis dans l'emplacement libre ; la loupe vise la vignette en cours
      const mv = D.lisse((t - (E[0] - 0.3)) / 1.3), hx = D.lerp(494, SLOT[0], mv), hy = D.lerp(456, SLOT[1], mv), hs = D.lerp(1.9, 1.5, mv);
      const dx = D.courbe(repX, t), dy = D.courbe(repY, t), n = Math.hypot(dx, dy) || 1, ux = dx / n, uy = dy / n, d = 66 * hs + 26;
      const humeur = t > A(3, 0.4) && t < E[3] + 0.3 ? "surprise" : "sourire";
      mila({ x: hx, y: hy, s: hs, t: t, temp: 0.6, etat: "vapeur", humeur: humeur, regard: [ux * 1.2, uy * 1.2] });
      loupe.setAttribute("transform", "translate(" + (hx + ux * d).toFixed(1) + " " + (hy + uy * d).toFixed(1) + ") rotate(" + (Math.atan2(uy, ux) * 180 / Math.PI).toFixed(1) + ")");
      return { temp: 0.6, etat: "vapeur", humeur: humeur };
    };
  };

  /* ---------- le voyage en quatre temps ----------
     Quatre cases alignées : ASPIRER · ENFERMER · COMPRIMER · REFOULER, chacune avec sa petite vue de l'alvéole
     (une fenêtre sur la vue longue : ouverte qui grandit, fermée, qui rétrécit, fenêtre de refoulement ouverte).
     Chaque case s'allume à sa phrase (k1 à k4) ; k5 : le tiroir en petit sous les cases, jauge de puissance ;
     k6 : les quatre cases ensemble, pastille « sans clapet, sans à-coups ». Le diagramme suit (voir plus bas). */
  S.resume = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const CW = 212, CY = 196, CH = 384, XS = [26, 264, 502, 740], ZX = [195, 245, 372, 478], K = 0.8, NOM = ["ASPIRER", "ENFERMER", "COMPRIMER", "REFOULER"];
    const LEG = [["elle s'ouvre", "et se remplit"], ["elle se ferme", "sans clapet"], ["elle rétrécit", "on se serre"], ["la fenêtre", "est ouverte"]];
    const tl = i => T[i + 1] - 0.2;
    const cases = XS.map((x, i) => {
      const cadre = rect(g, x, CY, CW, CH, { rx: 18, fill: "#fffdf8", stroke: "#c9d2dc", "stroke-width": 3 }), cont = D.el("g", {}, g), cid = "vcr" + (++nid);
      D.etiquette(cont, x + CW / 2, CY + 42, NOM[i], { "text-anchor": "middle", fill: BLEU, "font-weight": 700 });
      rect(D.el("clipPath", { id: cid }, cont), x + 3, CY + 62, CW - 6, 240);
      const V = vueLongue(D.el("g", { "clip-path": "url(#" + cid + ")" }, cont), { x: x + 3 - ZX[i] * K, y: CY + 62 + 34 * K, k: K });
      const leg = D.el("g", {}, g);
      LEG[i].forEach((l, j) => D.etiquette(leg, x + CW / 2, CY + 338 + j * 34, l, { "text-anchor": "middle", "font-size": 28 }));
      return { cadre: cadre, cont: cont, V: V, leg: leg };
    });
    const fenetre4 = rect(cases[3].V.devant, 660, 100, 80, 66, { fill: "none", stroke: D.ORANGE, "stroke-width": 7, "stroke-dasharray": "14 8" });
    const suite = [0, 1, 2].map(i => D.el("polygon", { points: pts([[XS[i] + CW + 6, CY + CH / 2 - 13], [XS[i] + CW + 20, CY + CH / 2], [XS[i] + CW + 6, CY + CH / 2 + 13]]), fill: BLEU }, g));
    // l'alvéole de chaque case, selon l'avancement f (0 → 1) de sa phrase
    const pose = [
      f => ({ xL: D.lerp(215, 272, f), W: D.lerp(22, 120, f), ouverte: true, nmol: 7 * f, temp: 0.2 }),
      f => ({ xL: D.lerp(262, 304, f), W: 120, ouverte: f < 0.4, halo: 0.7 * D.fenetre(f, 0.25, 0.55, 0.15), temp: 0.2 }),
      f => { const p = G.poche(D.lerp(0.23, 0.74, f)); return { xL: p.xL, W: p.W, temp: D.lerp(0.2, 0.55, f) }; },
      f => { const p = G.poche(D.lerp(0.85, 1, D.borne(f / 0.6, 0, 1))); return { xL: p.xL, W: p.W, op: 1 - D.lisse((f - 0.6) / 0.25), opH: 1, temp: 0.62 }; }
    ];
    const hero = [
      f => ({ s: 0.62, op: D.lisse(f * 5), humeur: "sourire" }),
      f => ({ s: 0.62, humeur: f > 0.35 && f < 0.8 ? "surprise" : "sourire" }),
      f => ({ s: 0.62, ecrase: D.lerp(0.05, 0.65, f), humeur: f > 0.75 ? "chaud" : "sourire", temp: D.lerp(0.2, 0.55, f) }),
      f => ({ s: D.lerp(0.62, 0.5, D.lisse((f - 0.6) / 0.4)), ecrase: 0.7 * (1 - D.lisse((f - 0.6) / 0.3)), dx: D.lerp(0, 100, D.lisse((f - 0.6) / 0.4)), humeur: f > 0.85 ? "sourire" : "chaud", temp: 0.62 })
    ];
    // k5 : le tiroir, en petit sous les cases, et la jauge de puissance
    const tiroirG = D.el("g", {}, g), V2 = vueLongue(tiroirG, { x: 30, y: 603, k: 0.45 });
    rect(V2.devant, 236, 238, 420, 20, { fill: CLAIR, stroke: "#3b4249", "stroke-width": 3 });
    const piece = rect(V2.devant, 240, 241, 250, 14, { rx: 3, fill: "url(#vm-acier-h)", stroke: "#2c343d", "stroke-width": 3 });
    const retour = [0, 1].map(() => flecheVar(tiroirG, D.BLEU, 4));
    D.etiquette(tiroirG, 270, 752, "tiroir", { "text-anchor": "middle" });
    const jauge = D.el("g", {}, tiroirG);
    rect(jauge, 520, 632, 40, 124, { rx: 10, fill: "#fff", stroke: "#3d4650", "stroke-width": 4 });
    const niv = rect(jauge, 526, 638, 28, 112, { rx: 6, fill: D.ORANGE });
    D.etiquette(jauge, 566, 612, "puissance", { "text-anchor": "end" });
    [[638, "100 %"], [722, "¼"]].forEach(([y, s]) => { D.el("line", { x1: 560, x2: 574, y1: y, y2: y, stroke: "#3d4650", "stroke-width": 4 }, jauge); D.etiquette(jauge, 582, y + 11, s); });
    const mila0 = D.heroine(g, { r: 30 }), pastille = D.pastille(g, 495, 742, "sans clapet, sans à-coups", D.BLEU, 30, "middle");
    const tempT = w => D.courbe([[0, 0.08], [1, 0.08], [2, 0.12], [3, 0.2], [4, 0.4], [5, 0.62], [6, 0.6], [7, 0.5], [8, 0.45], [9, 0.08]], w, true);
    return function (t) {
      cases.forEach((cs, i) => {
        const k = i + 1, lit = D.lisse((t - tl(i)) / 0.5), act = (t >= tl(i) && t < tl(i + 1)) || t >= T[6] - 0.2 || (i === 3 && t >= tl(3) && t < T[5] - 0.1);
        op(cs.cont, D.lerp(0.28, 1, lit));
        cs.cadre.setAttribute("stroke", act ? D.ORANGE : lit > 0.5 ? BLEU : "#c9d2dc"); cs.cadre.setAttribute("stroke-width", act ? 7 : 3);
        const f = t < E[k] ? D.borne((t - T[k]) / (E[k] - T[k]), 0, 1) : D.frac((t - E[k]) / 5), a = pose[i](f);
        a.op = a.op === undefined ? 1 : a.op;
        const h = hero[i](f); h.op = (h.op === undefined ? 1 : h.op) * lit; if (a.opH === undefined) a.opH = a.op * lit;
        cs.V.maj({ t: t, phase: a.xL, alv: a, heroine: h });
        op(cs.leg, lit);
      });
      suite.forEach((e, i) => op(e, D.lisse((t - tl(i + 1)) / 0.5)));
      op(fenetre4, D.lisse((t - tl(3)) / 0.5) * (0.6 + 0.4 * Math.sin(t * 5)));
      // k5 : le tiroir recule, la fenêtre s'ouvre vers l'aspiration, la puissance baisse
      const vt = D.lisse((t - A(5, 0.2)) / (0.6 * (E[5] - T[5]))), xs = D.lerp(240, 400, vt), p = D.lerp(1, 0.25, vt), ft = D.fenetre(t, T[5] - 0.2, T[6] - 0.2, 0.5);
      op(tiroirG, ft);
      V2.maj({ t: t, phase: 14 * t });
      piece.setAttribute("x", xs.toFixed(1));
      const lg = xs - 250, y2 = V2.pt(0, 248)[1];
      retour.forEach((r, i) => { const [xa] = V2.pt(xs - 12 - i * 40, 0), [xb] = V2.pt(xs - 52 - i * 40, 0); r(xa, y2, Math.max(xb, V2.pt(250, 0)[0]), y2, lg > 52 + i * 40 ? 1 : 0); });
      ap(niv, { y: 750 - p * 112, height: p * 112 });
      // k6 : les quatre cases ensemble
      op(pastille, D.fenetre(t, T[6] + 0.2, c.D, 0.5));
      // le point sur le diagramme : k1 → 2,5-3 · k2 : 3 · k3 : 3-5 · k4 : 5-6 · k5 : 3 · k6 : le tour complet
      const r = {};
      const w12 = D.courbe([[T[1], 2.5], [E[1], 3], [T[3], 3], [E[3], 5], [T[4], 5], [E[4], 6]], t, true);
      let w = null;
      if (t >= T[6] - 0.1) { w = D.courbe([[T[6], 0], [E[6], 9]], t, true); r.diag = w; r.diag0 = 0; }
      else if (t >= T[5] - 0.1) { w = 3; r.diag = 3; }
      else if (t >= T[1] - 0.05) { w = w12; r.diag = w12; r.diag0 = 2.5; }
      const gd = t >= T[6] - 0.1;
      r.temp = gd ? tempT(w) : t >= T[5] - 0.1 ? 0.2 : D.courbe([[T[1], 0.2], [T[3], 0.2], [E[3], 0.55], [T[4], 0.62], [E[4], 0.62]], t, true);
      r.etat = gd ? (w < 1 ? "bout" : w < 6.5 ? "vapeur" : "liquide") : "vapeur";
      r.humeur = gd && w > 4.3 && w < 6.5 ? "chaud" : "sourire";
      // l'héroïne seule, au début
      mila0({ x: 495, y: 668, s: 1.5, t: t, temp: 0.2, etat: "vapeur", humeur: "sourire", regard: [0, -1], op: 1 - D.lisse((t - (T[1] - 0.2)) / 0.5) });
      return r;
    };
  };
})();
