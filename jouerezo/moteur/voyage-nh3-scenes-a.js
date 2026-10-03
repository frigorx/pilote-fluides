/* =====================================================================
   voyage-nh3-scenes-a.js — édition NH₃, lot a : l'accueil, la bouteille
   séparatrice, l'évaporateur noyé, le retour à la bouteille
   ---------------------------------------------------------------------
   RÔLE : les scènes `intro`, `separateur`, `evaporateur` et `retour` du
   récit donnees/voyage-nh3.js. Même contrat que moteur/voyage-scenes-a.js :
   VOYAGE_SCENES[id] = function (g, c) → maj(t) ; tout est fonction PURE de
   t (aucun état gardé, aucun SMIL, aucun hasard hors D.alea). Briques :
   moteur/voyage-dessin.js et moteur/voyage-nh3-dessin.js. Brief :
   voyage-nh3/BRIEF-SCENES.md.
   ZONES INTERDITES : en-tête (x < 760, y < 140) ; carte du coin
   (x > 1200, y < 285) — sauf `intro`, qui n'a pas de carte du coin.
   ACIER : tubes et cuves en acier (jamais de cuivre : l'ammoniac le ronge).
   LIQUIDE = une nappe translucide DESSINÉE PAR-DESSUS l'héroïne (elle flotte
   à moitié dedans) ; vapeur = petites molécules ; ébullition = bulles.
   PILE DES COUCHES (bouteille et évaporateur) : parois et intérieurs des
   tubes → héroïne (H) → liquides translucides (L) → molécules, bulles (top)
   → voiles et étiquettes. L'héroïne n'est jamais découpée : elle passe d'une
   cuve à un tube sans changer de groupe.
   PIÈGE : la bouteille de `separateur` et celle de `retour` ont les MÊMES
   cotes (BQ) : on ne change l'une qu'avec l'autre.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const el = D.el;
  const FOND = "#f4f8fc", LIQ = D.couleur(0.05, false), CAL = "Calibri, Arial, sans-serif", OP = 0.74; // OP : opacité des liquides translucides
  let nid = 0;
  const idf = p => "vm-nh3a-" + p + "-" + (++nid);
  const voile = (gs, op) => gs.forEach(g => g.setAttribute("opacity", op.toFixed(2)));
  const fen = (t, a, b, du) => D.fenetre(t, a, b, du);
  const entree = (t, a, du) => D.lisse((t - a) / (du || 0.5)); // 0 → 1 à partir de a

  /* ---------- petits outils privés ---------- */
  const coque = (p, x, y, l, h, v) => el("rect", { x: x, y: y, width: l, height: h, rx: 4, fill: "url(#vm-acier" + (v ? "-h" : "") + ")" }, p);
  const vide = (p, x, y, l, h) => el("rect", { x: x, y: y, width: l, height: h, fill: FOND }, p);
  const liq = (p, x, y, l, h) => el("rect", { x: x, y: y, width: l, height: h, fill: LIQ, opacity: OP }, p);
  /* une nappe (D.liquide) dont le pas tombe juste : elle finit proprement contre la paroi */
  function nappeDe(p, o) {
    const n = Math.max(2, Math.round((o.x1 - o.x0) / 20));
    return D.liquide(p, Object.assign({ pas: (o.x1 - o.x0) / n, opacite: OP }, o));
  }
  /* l'héroïne sous le liquide, plus un fantôme au-dessus : on la devine à travers la nappe sans qu'elle disparaisse */
  function heroineVue(H, top, o) {
    const a = D.heroine(H, o), b = D.heroine(top, Object.assign({}, o, { sansHalo: true }));
    return function (p) { a(p); b(Object.assign({}, p, { op: (p.op === undefined ? 1 : p.op) * 0.5 })); };
  }
  /* un voile de la couleur du fond : le tube se perd vers le haut (il continue hors de la scène) */
  function fondu(p, x, y, l, h) {
    const gid = idf("fondu"), gr = el("linearGradient", { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 }, p);
    el("stop", { offset: 0, "stop-color": D.CREME, "stop-opacity": 1 }, gr);
    el("stop", { offset: 1, "stop-color": D.CREME, "stop-opacity": 0 }, gr);
    return el("rect", { x: x, y: y, width: l, height: h, fill: "url(#" + gid + ")" }, p);
  }
  /* reflets qui filent dans un liquide plein, horizontalement ou verticalement ; v : px/s, signé */
  function reflets(p, x0, x1, y0, y1, nb, graine, vertical) {
    const r = D.alea(graine), L = vertical ? y1 - y0 : x1 - x0, E = [];
    for (let i = 0; i < nb; i++) E.push({ s: r(), p: D.lerp(8, (vertical ? x1 - x0 : y1 - y0) - 8, r()), l: 24 + r() * 30,
      e: el("line", { stroke: "#fff", "stroke-width": 3, "stroke-linecap": "round", opacity: 0.6 }, p) });
    return function (t, v) {
      E.forEach(c => {
        const a = D.frac(c.s + t * v / L) * L, b = Math.min(L, a + c.l);
        if (vertical) { c.e.setAttribute("x1", x0 + c.p); c.e.setAttribute("x2", x0 + c.p); c.e.setAttribute("y1", (y0 + a).toFixed(1)); c.e.setAttribute("y2", (y0 + b).toFixed(1)); }
        else { c.e.setAttribute("y1", y0 + c.p); c.e.setAttribute("y2", y0 + c.p); c.e.setAttribute("x1", (x0 + a).toFixed(1)); c.e.setAttribute("x2", (x0 + b).toFixed(1)); }
      });
    };
  }
  /* flèche pleine vers +x (tournée de `ang`), de longueur variable : maj(x, y, ang, len, op) */
  function fleche(p, coul, ep) {
    const e = el("path", { fill: "none", stroke: coul, "stroke-width": ep || 8, "stroke-linecap": "round", "stroke-linejoin": "round" }, p);
    return function (x, y, ang, len, op) {
      e.setAttribute("d", "M 0 0 H " + len.toFixed(1) + " M " + (len - 16).toFixed(1) + " -13 L " + len.toFixed(1) + " 0 L " + (len - 16).toFixed(1) + " 13");
      e.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + ang + ")");
      e.setAttribute("opacity", op.toFixed(2));
    };
  }
  /* position à la fraction f de la longueur d'une ligne brisée ; rend [x, y] */
  function chemin(pts, f) {
    const L = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), tot = L.reduce((a, b) => a + b, 0);
    let d = D.borne(f, 0, 1) * tot;
    for (let i = 0; i < L.length; i++) {
      if (d <= L[i] || i === L.length - 1) { const k = L[i] ? D.borne(d / L[i], 0, 1) : 0; return [D.lerp(pts[i][0], pts[i + 1][0], k), D.lerp(pts[i][1], pts[i + 1][1], k)]; }
      d -= L[i];
    }
  }
  const longueur = pts => pts.slice(1).reduce((a, p, i) => a + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
  /* une pastille centrée sur cx, réduite si elle dépasse maxL */
  function pastilleMax(p, cx, y, s, fond, taille, maxL) {
    let g = D.pastille(p, cx, y, s, fond, taille, "middle");
    if (g.largeur > maxL) { p.removeChild(g); g = D.pastille(p, cx, y, s, fond, Math.max(26, Math.floor(taille * maxL / g.largeur)), "middle"); }
    return g;
  }

  /* =====================================================================
     intro — le titre, puis la carte en grand et le tour de la molécule
     ===================================================================== */
  S.intro = function (g, c) {
    const titre = el("g", {}, g), corps = el("g", {}, g);
    D.texte(titre, 800, 340, c.recit.titre, { "text-anchor": "middle", "font-size": 86, "font-weight": 700, fill: D.BLEU, "font-family": "Trebuchet MS, Arial, sans-serif" });
    D.texte(titre, 800, 420, c.recit.sousTitre, { "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: D.ORANGE, "font-family": CAL });
    const grandeT = D.heroine(titre, { r: 54 });
    D.pastille(titre, 800, 690, "édition " + c.recit.edition, D.BLEU, 34, "middle");
    const cir = D.circuit(corps, 330, 150, 960, true);
    const petite = D.heroine(corps, { r: 30 }), grande = D.heroine(corps, { r: 60 });
    // à gauche, sous la grande héroïne : ce qu'elle dit d'elle-même, phrase après phrase
    const p1 = pastilleMax(corps, 165, 478, "1 azote + 3 hydrogènes", D.BLEU, 30, 300);
    const p2 = D.pastille(corps, 165, 538, "PRP 0", "#1e7e54", 34, "middle");
    const p5 = [["toxique", "#c0392b", 478], ["ronge le cuivre", D.ORANGE, 538], ["pas mêlée à l'huile", "#8a5a12", 598]]
      .map(([s, coul, y]) => pastilleMax(corps, 165, y, s, coul, 32, 300));
    const MARQUES = [["separateur", 4, 0.1, 5], ["evaporateur", 4, 0.55, 5], ["separateurHuile", 6, 0.3, null], ["condenseur", 6, 0.42, null], ["reservoir", 6, 0.54, null],
      ["flotteur", 6, 0.66, null], ["potHuile", 6, 0.8, null]]; // [organe, phrase d'allumage, fraction, phrase d'extinction (null : jusqu'à la fin)]
    const tempDe = w => D.courbe([[0, 0.05], [9.2, 0.05], [9.8, 0.95], [12, 0.95], [12.6, 0.55], [16.2, 0.55], [16.9, 0.05], [19, 0.05]], w, true);
    const etatDe = w => w < 3 ? "liquide" : w < 5 ? "bout" : w < 13 ? "vapeur" : "liquide";
    const T = c.T, E = c.E;
    return function (t) {
      const ft = 1 - D.lisse((t - (T[0] - 1.1)) / 0.8);
      titre.setAttribute("opacity", ft.toFixed(2));
      corps.setAttribute("opacity", (1 - ft).toFixed(2));
      grandeT({ x: 800, y: 560 + Math.sin(t * 2.2) * 6, t: t, humeur: "sourire", etat: "liquide", temp: 0.1 });
      MARQUES.forEach(([nom, k, f, k2]) => cir.surligne(nom, t > c.A(k, f) && (k2 === null || t < T[k2] + 0.3)));
      p1.setAttribute("opacity", fen(t, T[1], E[4], 0.5).toFixed(2));
      p2.setAttribute("opacity", fen(t, T[2], E[4], 0.5).toFixed(2));
      p5.forEach((p, i) => p.setAttribute("opacity", fen(t, c.A(5, 0.18 + i * 0.28), E[5] + 1.2, 0.5).toFixed(2)));
      const w = D.courbe([[T[6], 0], [E[7], 19]], t, true);
      const [px, py] = cir.ecran(...D.circuitPoint(w));
      const wm = D.borne(w, 0, 19);
      petite({ x: px, y: py, s: 0.85, t: t, temp: tempDe(wm), etat: etatDe(wm), humeur: wm > 9.4 && wm < 12.4 ? "chaud" : wm > 16.5 ? "froid" : "sourire" });
      grande({ x: 165, y: 310 + Math.sin(t * 2.2) * 8, t: t, temp: 0.1, etat: "liquide", regard: [1, 0], humeur: t > T[6] && t < E[6] ? "surprise" : "sourire" });
      return {};
    };
  };

  /* =====================================================================
     la bouteille séparatrice (commune à `separateur` et `retour`)
     ---------------------------------------------------------------------
     Une cuve horizontale BQ, un gros tube de descente en bas, la sortie
     vapeur en haut, le tube de retour qui monte à droite puis entre en haut,
     l'arrivée du liquide du flotteur à gauche ; en option, la chambre du
     flotteur à droite (deux tubes d'équilibrage).
     rend { H, L, top, fin, nappe, maj(t, niveau), niveauY(), x0, x1, yh, yb }
     ===================================================================== */
  const BQ = { x: 250, y: 330, l: 880, h: 330 }, NIV = 0.42;
  const OUT = { x: 815, l: 90 }, DESC = { x: 645, l: 110 };
  const RET = { y: 338, h: 90, v: 1384, x1: 1474 };
  const ENT = { y: 570, h: 44 };
  const CH = { x: 1190, y: 448, l: 150, h: 224 };

  /* abscisses [gauche, droite] de l'intérieur de la bouteille à la hauteur y (bouts arrondis) */
  function bord(y) {
    const cy = BQ.y + BQ.h / 2, ri = BQ.h / 2 - 14, d = Math.min(ri, Math.abs(y - cy)), w = Math.sqrt(ri * ri - d * d);
    return [BQ.x + BQ.h / 2 - w, BQ.x + BQ.l - BQ.h / 2 + w];
  }
  /* abscisse du bord de la paroi d'un bout arrondi : ext = bord extérieur, sinon bord intérieur ; cote −1 gauche, +1 droite */
  function xbout(cote, y, ext) {
    const ro = BQ.h / 2, r = ext ? ro : ro - 14, cx = cote < 0 ? BQ.x + ro : BQ.x + BQ.l - ro, dy = y - (BQ.y + ro);
    return cx + cote * Math.sqrt(Math.max(0, r * r - dy * dy));
  }
  /* ouverture dans la paroi d'un bout arrondi, sur la bande [ya, yb] : le tube débouche dans la cuve */
  function trou(cote, ya, yb, p) {
    const pts = [[xbout(cote, ya, true) + cote, ya], [xbout(cote, ya, false) - 2 * cote, ya], [xbout(cote, yb, false) - 2 * cote, yb], [xbout(cote, yb, true) + cote, yb]];
    return el("polygon", { points: pts.map(q => q.map(v => v.toFixed(1)).join(",")).join(" "), fill: FOND }, p);
  }

  function bouteille(g, o) {
    const b = BQ, R = {};
    // 1 · parois et intérieurs des tubes, derrière la cuve
    const A = el("g", {}, g), chS = el("g", {}, g);
    coque(A, OUT.x, 150, OUT.l, 190, true); coque(A, DESC.x, 640, DESC.l, 130, true);
    coque(A, 1000, RET.y, RET.x1 - 1000, RET.h); coque(A, RET.v, RET.y, RET.x1 - RET.v, 770 - RET.y, true);
    coque(A, 0, ENT.y, 300, ENT.h);
    vide(A, OUT.x + 10, 150, OUT.l - 20, 190); vide(A, DESC.x + 10, 640, DESC.l - 20, 130);
    vide(A, 1000, RET.y + 10, RET.x1 - 10 - 1000, RET.h - 20); vide(A, RET.v + 10, RET.y + 10, RET.x1 - RET.v - 20, 770 - RET.y - 10);
    vide(A, 0, ENT.y + 10, 300, ENT.h - 20);
    if (o.chambre) { // la chambre du flotteur et ses deux tubes d'équilibrage (haut : vapeur, bas : liquide)
      coque(chS, 1100, 458, 100, 40); coque(chS, 1060, 588, 140, 40);
      el("rect", { x: CH.x, y: CH.y, width: CH.l, height: CH.h, rx: 18, fill: "url(#vm-acier-h)" }, chS);
      el("rect", { x: CH.x + 14, y: CH.y + 14, width: CH.l - 28, height: CH.h - 28, rx: 8, fill: FOND }, chS);
      vide(chS, 1100, 468, 108, 20); vide(chS, 1060, 598, 148, 20);
    }
    // 2 · la cuve, puis les ouvertures dans sa paroi
    const cu = D.cuve(g, b);
    R.x0 = cu.x0; R.x1 = cu.x1; R.yh = cu.yh; R.yb = cu.yb;
    const O = el("g", {}, g), chO = el("g", {}, g);
    vide(O, OUT.x + 10, b.y - 1, OUT.l - 20, 16); vide(O, DESC.x + 10, b.y + b.h - 15, DESC.l - 20, 16);
    trou(1, RET.y + 10, RET.y + RET.h - 10, O); trou(-1, ENT.y + 10, ENT.y + ENT.h - 10, O);
    if (o.chambre) { trou(1, 468, 488, chO); trou(1, 598, 618, chO); }
    // 3 · l'héroïne et la boule du flotteur, SOUS les liquides
    R.H = el("g", {}, g);
    const chH = el("g", {}, R.H);
    // 4 · les liquides translucides
    const L = R.L = el("g", {}, g);
    const clip = el("clipPath", { id: idf("cuve") }, L);
    el("rect", { x: cu.x0, y: cu.yh, width: cu.x1 - cu.x0, height: cu.yb - cu.yh, rx: b.h / 2 - 14 }, clip);
    const Lv = el("g", { "clip-path": "url(#" + clip.getAttribute("id") + ")" }, L);
    let niv = NIV;
    const nappe = R.nappe = nappeDe(Lv, { x0: cu.x0, x1: cu.x1, yh: cu.yh, yb: cu.yb, niveau: () => niv, couleur: () => LIQ });
    liq(L, DESC.x + 10, b.y + b.h - 15, DESC.l - 20, 770 - (b.y + b.h - 15));
    el("polygon", { points: [[0, ENT.y + 10], [xbout(-1, ENT.y + 10, false), ENT.y + 10], [xbout(-1, ENT.y + ENT.h - 10, false), ENT.y + ENT.h - 10], [0, ENT.y + ENT.h - 10]].map(q => q.join(",")).join(" "), fill: LIQ, opacity: OP }, L);
    let chL = null, nappeC = null, bille = null, nivC = 0;
    if (o.chambre) {
      chL = el("g", {}, L);
      const cc = el("clipPath", { id: idf("chambre") }, chL);
      el("rect", { x: CH.x + 14, y: CH.y + 14, width: CH.l - 28, height: CH.h - 28, rx: 8 }, cc);
      const Lc = el("g", { "clip-path": "url(#" + cc.getAttribute("id") + ")" }, chL);
      nappeC = nappeDe(Lc, { x0: CH.x + 14, x1: CH.x + CH.l - 14, yh: CH.y + 14, yb: CH.y + CH.h - 14, niveau: () => nivC, couleur: () => LIQ });
      el("polygon", { points: [[xbout(1, 598, false), 598], [CH.x + 14, 598], [CH.x + 14, 618], [xbout(1, 618, false), 618]].map(q => q.join(",")).join(" "), fill: LIQ, opacity: OP }, chL);
      bille = el("g", {}, chH);
      el("circle", { r: 27, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 3 }, bille);
      el("ellipse", { cx: -9, cy: -10, rx: 8, ry: 4, fill: "#fff", opacity: 0.7, transform: "rotate(-30 -9 -10)" }, bille);
    }
    R.top = el("g", {}, g);
    // le tube de retour : montée (mélange mousseux, bulles, vapeur), puis partie horizontale (liquide en bas, vapeur en haut)
    const mousse = el("g", {}, L);
    el("rect", { x: RET.v + 10, y: RET.y + 10, width: RET.x1 - RET.v - 20, height: 770 - RET.y - 10, fill: LIQ, opacity: 0.5 }, mousse);
    const refl = reflets(mousse, RET.v + 10, RET.x1 - 10, RET.y + 10, 770, 6, 3, true);
    const napR = nappeDe(L, { x0: 1092, x1: RET.v + 10, yh: RET.y + 10, yb: RET.y + RET.h - 10, niveau: () => 0.4, couleur: () => LIQ });
    const bulR = D.bulles(R.top, 30, 41, false), ra = D.alea(31), MR = [], MH = [];
    for (let i = 0; i < 8; i++) MR.push({ s: ra(), u: ra(), maj: D.mol(R.top) });
    for (let i = 0; i < 6; i++) MH.push({ s: ra(), u: ra(), maj: D.mol(R.top) });
    // la vapeur qui naît de la nappe, monte doucement et part par le haut (o.sortie molécules)
    const rv = D.alea(37), MV = [];
    for (let i = 0; i < (o.sortie || 0); i++) MV.push({ s: rv(), u: rv(), ph: rv() * 6.28, maj: D.mol(R.top) });
    R.fin = el("g", {}, g);
    fondu(R.fin, OUT.x - 4, 150, OUT.l + 8, 72); // la sortie vapeur continue vers le compresseur
    R.chambre = o.chambre ? { groupes: [chS, chO, chH, chL], x: CH.x + CH.l / 2 } : null;
    R.niveauY = () => cu.yb - niv * (cu.yb - cu.yh);
    R.maj = function (t, n) {
      niv = n === undefined ? NIV : n;
      nappe.maj(t);
      refl(t, -150); napR.maj(t);
      MV.forEach(mo => {
        const f = D.frac(mo.s + t / 15), xs0 = 560 + mo.u * 520, ys0 = nappe.surface(xs0, t) - 8, xo = OUT.x + OUT.l / 2 + (mo.u - 0.5) * 40;
        let x, y;
        if (f < 0.55) { const k = D.lisse(f / 0.55); x = D.lerp(xs0, xo, k) + Math.sin(t * 1.3 + mo.ph) * 8 * (1 - k); y = D.lerp(ys0, 362, k); }
        else { const k = (f - 0.55) / 0.45; x = xo; y = D.lerp(362, 150, k); }
        mo.maj(x, y, 0.08, true, fen(f, 0, 1, 0.05));
      });
      bulR(t, q => { const u = Math.sqrt(q), y0 = 760 - u * 310; return [1404 + D.frac(q * 9.1) * 50, y0, y0 - 100, 1, null]; });
      MR.forEach(mo => { const f = D.frac(mo.s + t / 5.5); mo.maj(1409 + mo.u * 46, 760 - f * 398, 0.08, true, fen(f, 0, 1, 0.1)); });
      MH.forEach(mo => { const f = D.frac(mo.s + t / 4.5); mo.maj(1394 - f * 300, 366 + mo.u * 8 + Math.sin(t * 3 + mo.s * 9) * 3, 0.08, true, fen(f, 0, 1, 0.1)); });
      if (o.chambre) {
        nivC = D.borne((CH.y + CH.h - 14 - R.niveauY()) / (CH.h - 28), 0, 1);
        nappeC.maj(t);
        bille.setAttribute("transform", "translate(" + R.chambre.x + " " + (nappeC.surface(R.chambre.x, t) - 8).toFixed(1) + ")");
      }
    };
    return R;
  }

  /* =====================================================================
     separateur — la réserve de liquide, le niveau, le flotteur, la descente
     ===================================================================== */
  S.separateur = function (g, c) {
    const T = c.T, E = c.E;
    const B = bouteille(g, { chambre: true, sortie: 5 });
    const etq = el("g", {}, g);
    const gLiq = el("g", {}, etq), gVap = el("g", {}, etq), gNiv = el("g", {}, etq), gNivB = el("g", {}, etq), gOut = el("g", {}, etq),
      gEnt = el("g", {}, etq), gRet = el("g", {}, etq), gCh = el("g", {}, etq), gDesc = el("g", {}, etq);
    D.etiquette(gLiq, 620, 712, "liquide, −10 °C", { "text-anchor": "end" }); D.trait(gLiq, 540, 684, 540, 604);
    D.etiquette(gVap, 430, 308, "vapeur"); D.trait(gVap, 470, 320, 520, 420);
    const y0 = B.niveauY();
    const ligne = D.trait(gNiv, 240, y0, B.x1, y0), ligne2 = D.trait(gNiv, 240, y0, B.x1, y0), ligneB = D.trait(gNivB, 1120, y0, CH.x + CH.l - 14, y0);
    D.pastille(gNiv, 236, y0 + 10, "niveau", D.ORANGE, 30, "end");
    D.etiquette(gOut, 925, 196, "vers le"); D.etiquette(gOut, 925, 234, "compresseur");
    D.etiquette(gEnt, 24, 656, "liquide du"); D.etiquette(gEnt, 24, 694, "flotteur");
    D.etiquette(gRet, 1490, 640, "retour", { "font-size": 30 });
    D.etiquette(gCh, B.chambre.x, 714, "régulateur", { "text-anchor": "middle" }); D.etiquette(gCh, B.chambre.x, 752, "à flotteur", { "text-anchor": "middle" });
    D.etiquette(gDesc, 785, 712, "vers les évaporateurs");
    // la vapeur : de petites molécules qui flottent au-dessus de la nappe
    const ra = D.alea(19), V = [];
    for (let i = 0; i < 24; i++) V.push({ u: ra(), v: ra(), ph: ra() * 6.28, maj: D.mol(B.top) });
    const m = heroineVue(B.H, B.top, { r: 30 });
    return function (t) {
      const k4 = fen(t, T[4], E[4], 0.8), niv = NIV + 0.022 * k4 * Math.sin((t - T[4]) * 1.3); // les deux niveaux montent et descendent ensemble
      B.maj(t, niv);
      const yN = B.niveauY(), dy = yN - y0;
      V.forEach(mo => {
        const yTop = B.yh + 30, yy = yTop + mo.v * Math.max(10, yN - 30 - yTop) + Math.cos(t * 0.7 + mo.ph * 1.3) * 9, [xl, xr] = bord(yy);
        mo.maj(xl + 28 + mo.u * (xr - xl - 56) + Math.sin(t * 0.9 + mo.ph) * 12, yy, 0.08, true, D.borne((yN - yy - 16) / 16, 0, 1));
      });
      // la ligne du niveau s'interrompt autour de l'héroïne qui flotte
      const d5 = E[5] - T[5], xm = D.courbe([[0, 470], [T[5], 470], [T[5] + 0.5 * d5, 700], [E[5], 700]], t), trou = 56 * (1 - entree(t, T[5], 0.4));
      ligne.setAttribute("x2", (xm - trou).toFixed(1)); ligne2.setAttribute("x1", (xm + trou).toFixed(1));
      ligneB.setAttribute("y1", yN.toFixed(1)); ligneB.setAttribute("y2", yN.toFixed(1)); // (les deux autres suivent le groupe gNiv)
      gNiv.setAttribute("transform", "translate(0 " + dy.toFixed(1) + ")");
      gLiq.setAttribute("opacity", entree(t, T[2] - 0.1).toFixed(2));
      voile([gVap, gNiv, gOut], entree(t, T[3] - 0.1));
      voile([gNivB, gEnt, gRet, gCh].concat(B.chambre.groupes), entree(t, T[4] - 0.1));
      gDesc.setAttribute("opacity", entree(t, T[5] - 0.1).toFixed(2));
      // l'héroïne : elle flotte à moitié dans la nappe, puis glisse au fond et entre dans le tube de descente
      const flot = B.nappe.surface(xm, t) - 4 + Math.sin(t * 2) * 2;
      const ym = t < T[5] ? flot : D.courbe([[T[5], flot], [T[5] + 0.25 * d5, 585], [T[5] + 0.5 * d5, 585], [E[5] + 0.9, 800]], t);
      const humeur = t > T[5] ? "surprise" : "sourire";
      m({ x: xm, y: ym, s: 0.85, t: t, temp: 0.05, etat: "liquide", humeur: humeur, regard: [1, t > T[5] ? 1 : 0] });
      return { carte: D.courbe([[T[5], 0], [E[5] + 0.8, 1]], t), temp: 0.05, etat: "liquide", humeur: humeur };
    };
  };

  /* =====================================================================
     evaporateur — noyé, alimenté par gravité (thermosiphon)
     ---------------------------------------------------------------------
     À gauche, le tube de descente PLEIN de liquide (lourd) ; en bas, un
     collecteur ; un collecteur gauche qui monte ; trois tubes en échelle
     (ailettes en travers, air du haut vers le bas) ; à droite le tube de
     retour qui monte, plein d'un mélange de liquide et de bulles (léger).
     ===================================================================== */
  S.evaporateur = function (g, c) {
    const T = c.T, E = c.E;
    const RUNG = [238, 388, 538], CY = 656, XD = 100, XG = 548, XR = 1100, EP = 88;
    const ail = el("g", {}, g), air = el("g", {}, g), chaud = el("g", {}, g);
    for (let x = 660; x <= 1086; x += 22) el("rect", { x: x, y: 222, width: 7, height: 430, fill: "url(#vm-acier-h)", opacity: 0.55 }, ail);
    // coques et intérieurs de l'échelle
    const A = el("g", {}, g);
    coque(A, XD, 150, EP, 594, true); coque(A, XD, CY, XG + EP - XD, EP); coque(A, XG, 238, EP, 506, true);
    RUNG.forEach(y => coque(A, XG + EP, y, XR - XG - EP, EP));
    coque(A, XR, 150, EP, 476, true);
    vide(A, XD + 10, 150, EP - 20, CY + 10 - 150); vide(A, XD + 10, CY + 10, XG + EP - 10 - XD - 10, EP - 20);
    vide(A, XG + 10, 248, EP - 20, CY + 10 - 248);
    RUNG.forEach(y => vide(A, XG + EP - 10, y + 10, XR + 10 - XG - EP + 10, EP - 20));
    vide(A, XR + 10, 150, EP - 20, 466);
    const H = el("g", {}, g), L = el("g", {}, g), top = el("g", {}, g);
    // les liquides : descente, collecteur du bas, collecteur gauche, trois tubes, retour (aucun recouvrement)
    liq(L, XD + 10, 150, EP - 20, CY + 10 - 150); liq(L, XD + 10, CY + 10, XG + EP - 10 - XD - 10, EP - 20); liq(L, XG + 10, 248, EP - 20, CY + 10 - 248);
    RUNG.forEach(y => liq(L, XG + EP - 10, y + 10, XR + 10 - XG - EP + 10, EP - 20)); liq(L, XR + 10, 150, EP - 20, 466);
    // le mélange s'éclaircit quand les bulles naissent (k3) : voile blanc, plus fort vers la droite et vers le haut
    const gr1 = idf("mel"), gr2 = idf("mel");
    const g1 = el("linearGradient", { id: gr1, x1: 0, y1: 0, x2: 1, y2: 0 }, L), g2 = el("linearGradient", { id: gr2, x1: 0, y1: 1, x2: 0, y2: 0 }, L);
    [[0, 0.0], [1, 0.5]].forEach(([o, a]) => el("stop", { offset: o, "stop-color": "#fff", "stop-opacity": a }, g1));
    [[0, 0.1], [1, 0.62]].forEach(([o, a]) => el("stop", { offset: o, "stop-color": "#fff", "stop-opacity": a }, g2));
    const melange = el("g", {}, L);
    RUNG.forEach(y => el("rect", { x: XG + EP - 10, y: y + 10, width: XR + 20 - XG - EP, height: EP - 20, fill: "url(#" + gr1 + ")" }, melange));
    el("rect", { x: XR + 10, y: 150, width: EP - 20, height: 466, fill: "url(#" + gr2 + ")" }, melange);
    // reflets : le liquide coule ; vitesses signées (descente ↓, collecteur →, collecteur gauche ↑, tubes →, retour ↑)
    const fD = reflets(L, XD + 10, XD + EP - 10, 150, CY + 10, 6, 5, true), fC = reflets(L, XD + 10, XG + EP - 10, CY + 10, CY + EP - 10, 8, 6, false),
      fG = reflets(L, XG + 10, XG + EP - 10, 248, CY + 10, 4, 7, true), fR = RUNG.map((y, i) => reflets(L, XG + EP - 10, XR + 10, y + 10, y + EP - 10, 5, 8 + i, false)),
      fV = reflets(L, XR + 10, XR + EP - 10, 150, 616, 6, 12, true);
    // bulles : elles naissent dans les tubes (de plus en plus vers la droite), puis montent dans le retour (de plus en plus vers le haut)
    const bulT = RUNG.map((y, i) => D.bulles(top, 15 + i * 2, 61 + i, false)), bulR = D.bulles(top, 30, 71, false);
    // l'air : trois ventilateurs au-dessus, des chevrons du haut vers le bas, de plus en plus froids
    const vents = [760, 870, 980].map(x => D.ventilateur(g, x, 185, 36));
    const CHEV = [];
    [700, 830, 960, 1070].forEach((x, k) => { for (let j = 0; j < 3; j++) CHEV.push({ x: x, f: j / 3 + k * 0.11, maj: D.chevron(air) }); });
    const AIRC = [232, 145, 74], AIRF = [61, 127, 202];
    const couleurAir = y => "rgb(" + AIRC.map((v, i) => Math.round(D.lerp(v, AIRF[i], D.borne((y - 222) / 430, 0, 1)))).join(",") + ")";
    // flèches de chaleur dans les deux espaces entre les tubes : elles vont de l'air vers les tubes
    const ARR = [];
    [[326, 388], [476, 538]].forEach(([ya, yb]) => {
[[765, 0], [1015, 0], [895, 1]].forEach(([x, haut], i) => ARR.push({ x: x, y: haut ? ya + 4 : yb - 4, ang: haut ? 180 : 0, ph: i * 1.3, maj: D.chaleur(chaud) }));
    });
    // flèches de circulation (k4) : ↓ descente, → évaporateur, ↑ retour
    const circ = el("g", {}, top);
    const CIRC = [];
    for (let j = 0; j < 3; j++) {
      CIRC.push({ f: j / 3, a: 0, maj: D.chevron(circ), pos: f => [144, 190 + f * 450] });
      CIRC.push({ f: j / 3, a: -90, maj: D.chevron(circ), pos: f => [660 + f * 430, 432] });
      CIRC.push({ f: j / 3, a: 180, maj: D.chevron(circ), pos: f => [1144, 600 - f * 410] });
    }
    // k7 : « mouillé sur toute sa surface » — le contour intérieur de chaque tube s'allume
    const mouille = el("g", {}, top);
    RUNG.forEach(y => el("rect", { x: XG + EP - 10, y: y + 10, width: XR + 20 - XG - EP, height: EP - 20, fill: "none", stroke: "#2f6fb8", "stroke-width": 6 }, mouille));
    // les tubes se perdent vers le haut : ils continuent vers la bouteille
    const fin = el("g", {}, top);
    fondu(fin, XD - 6, 150, EP + 12, 72); fondu(fin, XR - 6, 150, EP + 12, 72);
    // étiquettes
    const etq = el("g", {}, g);
    const gHaut = el("g", {}, etq), gAir = el("g", {}, etq), gRef = el("g", {}, etq), leg = el("g", {}, etq), legB = el("g", {}, etq);
    D.etiquette(gHaut, 206, 252, "↓ de la bouteille"); D.etiquette(gRef, 1204, 332, "↑ vers la bouteille");
    D.etiquette(gAir, 700, 200, "air tiède de la chambre", { "text-anchor": "end" }); D.etiquette(gAir, 660, 742, "air refroidi");
    // la légende, dans la baie entre la descente et l'échelle : ce que veulent dire le bleu et les ronds
    liq(leg, 232, 296, 44, 28); D.etiquette(leg, 294, 322, "liquide", { "font-size": 30 });
    el("circle", { cx: 254, cy: 362, r: 10, fill: "#fff", "fill-opacity": 0.5, stroke: "#2f6fb8", "stroke-width": 3 }, legB); D.etiquette(legB, 294, 372, "bulles de vapeur", { "font-size": 30 });
    const pLourd = D.pastille(etq, 216, 470, "liquide : lourd", D.BLEU, 28, "start");
    const pLeger = D.pastille(etq, 1204, 404, "liquide + bulles : léger", D.ORANGE, 28, "start");
    const pPompe = [D.pastille(etq, 216, 560, "pas de pompe :", "#1e7e54", 28, "start"), D.pastille(etq, 216, 610, "thermosiphon", "#1e7e54", 28, "start")];
    const pMouille = D.pastille(etq, 870, 724, "mouillé sur toute sa surface", "#2f6fb8", 28, "middle");
    // k8 : l'encart du régime pompé (en bas à droite, hors tracé)
    const enc = el("g", {}, g);
    el("rect", { x: 1230, y: 540, width: 350, height: 205, rx: 18, fill: "#fffdf8", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, enc);
    D.etiquette(enc, 1405, 586, "régime pompé", { "text-anchor": "middle", "font-weight": 700, fill: D.BLEU });
    coque(enc, 1246, 612, 318, 60); vide(enc, 1246, 622, 318, 40); liq(enc, 1246, 622, 318, 40);
    const fP = reflets(enc, 1246, 1564, 622, 662, 5, 9, false);
    el("circle", { cx: 1405, cy: 642, r: 44, fill: "#fff", stroke: D.BLEU, "stroke-width": 5 }, enc);
    el("polygon", { points: "1390,622 1390,662 1426,642", fill: D.BLEU }, enc);
    D.etiquette(enc, 1405, 722, "vers les évaporateurs", { "text-anchor": "middle", "font-size": 28 });
    // l'héroïne : liquide de bout en bout, elle descend, attend au pied, puis traverse et remonte
    const mila = heroineVue(H, top, { r: 30 });
    const PATH = [[300, 700], [592, 700], [592, 582], [1144, 582], [1144, 190]], LP = longueur(PATH);
    const fRung = longueur(PATH.slice(0, 4)) / LP, tFin = E[6] - 0.4;
    return function (t) {
      vents.forEach((v, i) => v(t * 520 + i * 40));
      // air et chaleur : dès k3
      const aa = entree(t, T[3] - 0.2, 0.9);
      air.setAttribute("opacity", aa.toFixed(2));
      CHEV.forEach(ch => { const f = D.frac(ch.f + t * 0.12), y = 222 + f * 470; ch.maj(ch.x, y, 0, couleurAir(y), fen(f, 0, 1, 0.1) * 0.9); });
      ARR.forEach(a => a.maj(a.x, a.y, a.ang, aa * (0.45 + 0.55 * Math.abs(Math.sin(t * 2.4 + a.ph)))));
      // liquides qui coulent
      fD(t, 90); fC(t, 80); fG(t, -90); fR.forEach(f => f(t, 80)); fV(t, -120);
      // ébullition (k3) : les bulles apparaissent, le mélange s'éclaircit
      const eb = entree(t, c.A(3, 0.1), 1.4);
      melange.setAttribute("opacity", eb.toFixed(2));
      bulT.forEach((b, i) => b(t, (q, bb) => [660 + 440 * Math.pow(q, 0.55), RUNG[i] + 70, RUNG[i] + 24, eb, null]));
      bulR(t, q => { const u = Math.sqrt(q), y0 = 610 - u * 330; return [XR + 20 + D.frac(q * 9.1) * 48, y0, y0 - 120, eb, null]; });
      // circulation (k4 → k6)
      const ac = fen(t, T[4] - 0.2, T[6] + 0.2, 0.5);
      circ.setAttribute("opacity", ac.toFixed(2));
      CIRC.forEach(cc => { const f = D.frac(cc.f + t * 0.14), [x, y] = cc.pos(f); cc.maj(x, y, cc.a, D.ORANGE, fen(f, 0, 1, 0.15)); });
      mouille.setAttribute("opacity", (fen(t, T[7] - 0.2, E[7] + 0.6, 0.5) * (0.5 + 0.5 * Math.abs(Math.sin(t * 3)))).toFixed(2));
      // étiquettes
      voile([gHaut], entree(t, T[2] - 0.1));
      gAir.setAttribute("opacity", fen(t, T[3] - 0.1, T[7], 0.5).toFixed(2));
      gRef.setAttribute("opacity", entree(t, T[2] - 0.1).toFixed(2));
      leg.setAttribute("opacity", entree(t, T[2] - 0.1).toFixed(2)); legB.setAttribute("opacity", entree(t, T[3]).toFixed(2));
      pLourd.setAttribute("opacity", fen(t, T[4], T[6] - 0.2, 0.5).toFixed(2)); pLeger.setAttribute("opacity", fen(t, T[4] + 0.5, T[6] - 0.2, 0.5).toFixed(2));
      pPompe.forEach(p => p.setAttribute("opacity", fen(t, T[5], T[6] - 0.2, 0.5).toFixed(2)));
      pMouille.setAttribute("opacity", fen(t, T[7], E[7] + 0.6, 0.5).toFixed(2));
      const pe = fen(t, T[8] - 0.1, c.D + 1, 0.5);
      enc.setAttribute("opacity", pe.toFixed(2)); fP(t, 140 * pe);
      // l'héroïne
      let x, y, w, op = 1;
      if (t < E[2]) { // k2 : elle descend le tube jusqu'au collecteur du bas
        const p = D.lisse((t - T[2]) / (E[2] - T[2]));
        x = 144; y = D.lerp(206, 700, p); w = t < T[2] ? 1 : D.lerp(1, 2, p);
      } else if (t < T[6]) { // elle attend au pied, poussée doucement
        x = D.courbe([[E[2], 144], [T[6], 300]], t, true); y = 700; w = 2;
      } else { // k6 : collecteur, tube de l'échelle, puis retour — toujours liquide, portée par les bulles
        const f = D.borne((t - T[6]) / (tFin - T[6]), 0, 1), fe = D.lerp(f, D.lisse(f), 0.35);
        [x, y] = chemin(PATH, fe);
        w = fe < fRung ? 2 + 2 * fe / fRung : 4 + 2 * (fe - fRung) / (1 - fRung);
        op = 1 - entree(t, tFin + 0.1, 0.5);
        y -= 18 * D.lisse((t - tFin) / 0.6);
      }
      const hum = t > T[6] ? "surprise" : "sourire";
      mila({ x: x, y: y + Math.sin(t * 2.1) * 2.5, s: 0.72, t: t, temp: 0.05, etat: "liquide", humeur: hum, regard: [t > T[6] ? 1 : 0, 1], op: op });
      return { carte: w, temp: 0.05, etat: "liquide", humeur: hum };
    };
  };

  /* =====================================================================
     retour — la bouteille reçoit le mélange et le sépare
     ===================================================================== */
  S.retour = function (g, c) {
    const T = c.T, E = c.E;
    const B = bouteille(g, { sortie: 11 }), top = B.top;
    const chute = D.bulles(top, 9, 53, true), pluie = D.bulles(top, 14, 59, true);
    const fl = [0, 1, 2].map(() => fleche(top, D.ORANGE, 8));
    // k0 : la vignette — un tube de l'évaporateur où elle bout
    const Vg = el("g", {}, g);
    el("rect", { x: 40, y: 150, width: 560, height: 142, rx: 18, fill: "#fffdf8", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, Vg);
    D.etiquette(Vg, 60, 184, "dans un tube de l'évaporateur", { "font-size": 28 });
    coque(Vg, 56, 194, 528, 92); vide(Vg, 56, 204, 528, 72);
    const vH = el("g", {}, Vg), vL = el("g", {}, Vg);
    liq(vL, 56, 204, 528, 72);
    const vR = reflets(vL, 56, 584, 204, 276, 5, 17, false), vB = D.bulles(vL, 16, 77, false);
    const mv = heroineVue(vH, vL, { r: 30 });
    // étiquettes et pastilles
    const etq = el("g", {}, g);
    const gRet = el("g", {}, etq), gOut = el("g", {}, etq);
    D.etiquette(gRet, 1370, 640, "retour des", { "text-anchor": "end" }); D.etiquette(gRet, 1370, 678, "évaporateurs", { "text-anchor": "end" });
    D.etiquette(gOut, 925, 196, "vers le"); D.etiquette(gOut, 925, 234, "compresseur");
    const pSeche = D.pastille(etq, 925, 290, "vapeur sèche", "#1e7e54", 30, "start");
    const pSur = D.pastille(etq, 40, 220, "pas de surchauffe à régler", D.ORANGE, 30, "start");
    const pProt = D.pastille(etq, 40, 282, "la bouteille protège le compresseur", "#1e7e54", 30, "start");
    const m = heroineVue(B.H, top, { r: 30 });
    const xs = [[T[1], 1429], [c.A(1, 0.72), 1429], [E[1], 1250], [E[2], 980], [E[3], 870], [T[4], 860], [E[5], 860]];
    const ys = [[T[1], 760], [c.A(1, 0.72), 383], [E[2], 386], [E[3], 382], [T[4], 372], [E[4], 120]];
    return function (t) {
      B.maj(t);
      const surf = x => B.nappe.surface(x, t);
      // k2 : le mélange entre en haut à droite et ralentit (flèches qui raccourcissent) ; k3 : les gouttes retombent
      const fa = fen(t, T[2], E[2] + 0.6, 0.6);
      [[1070, 100], [960, 66], [868, 36]].forEach(([tx, len], i) => fl[i](tx + 6 * Math.sin(t * 3 - i), 455, 180, len, fa));
      const gt = entree(t, T[2] + 0.4, 0.8), bleu = D.couleur(0.05, false);
      chute(t, q => [1046 + q * 54, 422, surf(1070), gt, bleu]);
      pluie(t, (q, b) => { const x = 640 + D.frac(q * 7.7) * 420; return [x, 372 + D.frac(q * 3.3) * 70, surf(x), gt * entree(t, c.A(3, 0.1), 1), bleu]; });
      // k0 : la vignette
      const vo = 1 - entree(t, E[0] + 0.1, 0.7);
      Vg.setAttribute("opacity", vo.toFixed(2));
      const pv = D.borne((t - T[0]) / (E[0] - T[0]), 0, 1), etV = pv < 0.28 ? "liquide" : pv < 0.62 ? "bout" : "vapeur";
      vR(t, 60); vB(t, (q, b) => [70 + q * 500, 270, 214, entree(t, T[0], 1.5), null]);
      mv({ x: D.lerp(110, 530, pv), y: 242 + Math.sin(t * 2.2) * 3 - (etV === "vapeur" ? 5 : 0), s: 0.66, t: t, temp: 0.08, etat: etV, humeur: etV === "bout" ? "surprise" : "sourire", regard: [1, 0] });
      // k1 → k5 : l'héroïne (vapeur) remonte dans le tube de retour, entre dans la bouteille, sort par le haut
      const xm = D.courbe(xs, t), ym = D.courbe(ys, t) + Math.sin(t * 2.2) * 4;
      const om = entree(t, E[0] + 0.1, 0.5) * (1 - entree(t, E[4] - 0.5, 0.8));
      const hum = t > T[1] && t < E[1] ? "surprise" : "sourire";
      m({ x: xm, y: ym, s: 0.72, t: t, temp: 0.08, etat: "vapeur", humeur: hum, regard: [t > c.A(1, 0.72) ? -1 : 0, t < c.A(1, 0.72) ? -1 : 0], op: om });
      // étiquettes
      gRet.setAttribute("opacity", entree(t, T[1] - 0.1).toFixed(2));
      voile([gOut, pSeche], entree(t, T[4] - 0.1));
      pSur.setAttribute("opacity", entree(t, T[5] - 0.1).toFixed(2)); pProt.setAttribute("opacity", entree(t, c.A(5, 0.4)).toFixed(2));
      const etat = t < E[0] + 0.1 ? etV : "vapeur";
      return { carte: D.courbe([[0, 6], [T[2], 6], [E[2], 6.8], [E[3], 7.2], [E[4], 8.6], [E[5], 9]], t), temp: 0.08, etat: etat, humeur: hum };
    };
  };
})();
