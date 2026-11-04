/* =====================================================================
   voyage-enthalpie2r-scenes-a.js — édition « le diagramme enthalpique, niveau 2 : je réalise » (R32) :
   scènes intro, releves, absolu
   ---------------------------------------------------------------------
   MÊME CONTRAT que moteur/voyage-enthalpie2-scenes-a.js / -b.js : VOYAGE_SCENES[id](g, c) → maj(t)
   (c = { T, E, D, A(k, f) } ; maj(t) rend { temp, etat, humeur }). Fonction PURE de t.
   Les gestes sont accrochés au RANG des phrases du récit donnees/voyage-enthalpie2r.js.
   ÉCRAN PARTAGÉ : la scène tient dans x 20 → 965, y 150 → 760.
   NOUVEAU : la phrase de CONSIGNE (releves k3, absolu k0) ne montre que le panneau « À vous » (D.avous, dessin
   de l'édition), fondu 0,4 s ; tout le reste de la scène (le « décor ») s'efface pendant ce temps.
   AIDES LOCALES (copiées du niveau 2 Découverte) : fleche(), multi(), cadran(), pince(), coche(), climatiseur(),
   traceur() (le cycle qui se trace sur la feuille A4 en petit, avec son crayon).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {}, el = D.el;
  const POL = "Calibri, Arial, sans-serif";
  const BLEU = "#2f6fb8", OR = "#ff6b35", AMBRE_T = "#b35f00", ROUGE = "#c0392b", NUIT = "#10233c", GRIS = "#637285", PALE = "#b9c3cf", VERT = "#1e7e54", AIR = "#2f6fb8";
  const opa = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const fen = (e, t, a, b, du) => opa(e, D.fenetre(t, a, b, du === undefined ? 0.4 : du));
  const apres = (e, t, a, du) => opa(e, D.lisse((t - a) / (du === undefined ? 0.4 : du)));
  const f1 = v => v.toFixed(1);
  const pts = a => a.map(p => f1(p[0]) + "," + f1(p[1])).join(" ");
  const txt = (p, x, y, s, taille, fill, at) => D.texte(p, x, y, s, Object.assign({ "font-size": taille, fill: fill || NUIT, "font-family": POL, "font-weight": 700 }, at || {}));
  const MID = { "text-anchor": "middle" }, FIN = { "text-anchor": "end" };
  /* apparition : 0 avant la phrase k, 1 un instant après son début */
  const vu = (c, t, k, delai) => k >= c.T.length ? 0 : D.borne((t - c.T[k] - (delai || 0) + 0.15) / 0.45, 0, 1);
  const seul = (c, t, k) => vu(c, t, k) * (1 - vu(c, t, k + 1));
  /* le panneau « À vous » pendant la phrase de consigne kc : fondu 0,4 s (sans fondu d'entrée si la consigne ouvre la scène) */
  const panneau = (c, t, kc) => kc === 0 ? D.borne((c.T[1] - t) / 0.4, 0, 1) : D.fenetre(t, c.T[kc], c.T[kc + 1], 0.4);
  /* texte posé (une ligne) dans son propre groupe, caché par défaut */
  function lib(parent, x, y, texte, o) {
    o = o || {};
    const gr = el("g", { opacity: 0 }, parent);
    D.etiquette(gr, x, y, texte, { "text-anchor": o.ancre || "start", "font-size": o.taille || 32, fill: o.coul || NUIT, "font-weight": 700 });
    return gr;
  }
  /* flèche à pointe, tracée jusqu'à la fraction f de sa longueur (f = 1 : complète) */
  function fleche(parent, coul, ep) {
    const gr = el("g", { opacity: 0 }, parent), l = el("line", { stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, gr), h = el("polygon", { fill: coul }, gr);
    return function (x1, y1, x2, y2, f) {
      if (f === undefined) f = 1;
      opa(gr, f > 0.002 ? 1 : 0);
      const a = Math.atan2(y2 - y1, x2 - x1), L = 5 * ep, xe = x1 + (x2 - x1) * f, ye = y1 + (y2 - y1) * f;
      l.setAttribute("x1", f1(x1)); l.setAttribute("y1", f1(y1)); l.setAttribute("x2", f1(xe - Math.cos(a) * L * 0.7)); l.setAttribute("y2", f1(ye - Math.sin(a) * L * 0.7));
      h.setAttribute("points", pts([[xe, ye], [xe - L * Math.cos(a - 0.45), ye - L * Math.sin(a - 0.45)], [xe - L * Math.cos(a + 0.45), ye - L * Math.sin(a + 0.45)]]));
    };
  }
  /* tronçons de texte de couleurs différentes : parts = [[texte, couleur], …] */
  function multi(p, x, y, parts, taille, ancre) {
    const t = el("text", { x: x, y: y, "font-size": taille, "font-weight": 700, "font-family": POL, "text-anchor": ancre || "start" }, p);
    parts.forEach(([s, coul]) => { const ts = el("tspan", { fill: coul }, t); ts.textContent = s; });
    return t;
  }
  /* trajet par repères [t, x, y, s] ; les temps sont remis dans l'ordre */
  function kf(K) {
    for (let i = 1; i < K.length; i++) if (K[i][0] < K[i - 1][0] + 0.01) K[i][0] = K[i - 1][0] + 0.01;
    return t => [1, 2, 3].map(j => D.courbe(K.map(k => [k[0], k[j]]), t));
  }
  function rep(K) { // repères [t, v] remis dans l'ordre
    for (let i = 1; i < K.length; i++) if (K[i][0] < K[i - 1][0] + 0.01) K[i][0] = K[i - 1][0] + 0.01;
    return t => D.courbe(K, t);
  }
  const coche = (parent, x, y, r) => { // pastille verte cochée
    const k = (r || 22) / 22, gr = el("g", { opacity: 0, transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, parent);
    el("circle", { r: 22, fill: VERT, stroke: "#fff", "stroke-width": 3 }, gr);
    el("path", { d: "M -10 1 L -3 9 L 11 -8", fill: "none", stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, gr);
    return gr;
  };
  /* un climatiseur : l'unité intérieure murale (blanche, volets en bas) et ses flèches d'air frais ; renvoie maj(t) */
  function climatiseur(parent, x, y, w) {
    const h = w * 0.32, gr = el("g", {}, parent);
    el("rect", { x: x, y: y, width: w, height: h, rx: 26, fill: "#f7fafd", stroke: NUIT, "stroke-width": 6 }, gr);
    for (let i = 0; i < 3; i++) el("line", { x1: x + w * 0.1, y1: y + h * (0.2 + 0.14 * i), x2: x + w * 0.62, y2: y + h * (0.2 + 0.14 * i), stroke: PALE, "stroke-width": 4, "stroke-linecap": "round" }, gr);
    el("rect", { x: x + 8, y: y + h - 28, width: w - 16, height: 20, rx: 8, fill: "#cfdcea", stroke: NUIT, "stroke-width": 3 }, gr);
    el("circle", { cx: x + w - 40, cy: y + 34, r: 8, fill: VERT, stroke: NUIT, "stroke-width": 2 }, gr);
    const A = [0.2, 0.5, 0.8].map((u, i) => ({ fl: fleche(gr, AIR, 7), x: x + w * u, dx: (u - 0.5) * 70, i: i }));
    return t => A.forEach(a => {
      const L = 100 + 14 * Math.sin(t * 2.4 + a.i * 1.3);
      a.fl(a.x, y + h + 14, a.x + a.dx * L / 100, y + h + 14 + L, 1);
    });
  }
  /* le cycle qui se trace sur une feuille A4 dessinée en petit (mêmes proportions que D.feuilleA4, recto) ; renvoie f(0..1) → pointe du crayon */
  function traceur(parent, x, y, h) {
    const DG = window.VOYAGE_DIAGRAMME, w = h / 1.414, bx = x + w * 0.1, by = y + h * 0.07, bw = w * 0.82, bh = h * 0.86;
    const X = hh => bx + (hh - DG.plage.h[0]) / (DG.plage.h[1] - DG.plage.h[0]) * bw;
    const Y = p => by + bh - Math.log(p / DG.plage.p[0]) / Math.log(DG.plage.p[1] / DG.plage.p[0]) * bh;
    const P = DG.chemin.map(q => [X(q[0]), Y(q[1])]), n = P.length - 1;
    const ligne = el("polyline", { fill: "none", stroke: OR, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round" }, parent);
    return function (f) {
      const w1 = D.borne(f, 0, 1) * n, i = Math.min(n - 1, Math.floor(w1)), u = w1 - i, q = P.slice(0, i + 1);
      const pt = [D.lerp(P[i][0], P[i + 1][0], u), D.lerp(P[i][1], P[i + 1][1], u)];
      q.push(pt);
      ligne.setAttribute("points", pts(q));
      return pt;
    };
  }
  /* la calculatrice dessinée (coin haut gauche en x, y, largeur l) */
  function calculatrice(parent, x, y, l) {
    const k = l / 130, g1 = el("g", { transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, parent);
    el("rect", { x: 0, y: 0, width: 130, height: 170, rx: 14, fill: "#eef2f6", stroke: NUIT, "stroke-width": 5 }, g1);
    el("rect", { x: 16, y: 16, width: 98, height: 38, rx: 6, fill: "#cfe3f6", stroke: NUIT, "stroke-width": 3 }, g1);
    for (let r = 0; r < 3; r++) for (let q = 0; q < 3; q++) el("rect", { x: 18 + q * 33, y: 68 + r * 34, width: 24, height: 24, rx: 5, fill: q === 2 ? OR : "#fff", stroke: NUIT, "stroke-width": 3 }, g1);
    return g1;
  }
  /* la règle dessinée : bande jaune graduée, longueur l, centrée en (cx, cy) */
  function regle(parent, cx, cy, l, ang) {
    const g1 = el("g", { transform: "translate(" + cx + " " + cy + ") rotate(" + (ang || 0) + ")" }, parent), hh = 62;
    el("rect", { x: -l / 2, y: -hh / 2, width: l, height: hh, rx: 6, fill: "#f2d98a", stroke: NUIT, "stroke-width": 4 }, g1);
    const n = 24;
    for (let i = 0; i <= n; i++) el("line", { x1: -l / 2 + 10 + (l - 20) * i / n, y1: -hh / 2, x2: -l / 2 + 10 + (l - 20) * i / n, y2: -hh / 2 + (i % 4 === 0 ? 30 : 17), stroke: NUIT, "stroke-width": 3 }, g1);
    return g1;
  }

  /* =====================================================================
     INTRO — la molécule R32 et son climatiseur ; la feuille et le crayon ; crayon, règle, calculatrice ; consigne, pause, correction
     ===================================================================== */
  S.intro = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    /* k0 : le climatiseur, la pastille R32 */
    const k0 = el("g", {}, g);
    const maClim = climatiseur(k0, 600, 262, 340);
    const lClim = lib(k0, 770, 226, "climatiseur", { ancre: "middle", taille: 38, coul: BLEU }); opa(lClim, 1);
    const lAir = lib(k0, 770, 550, "air frais", { ancre: "middle", taille: 36, coul: AIR }); opa(lAir, 1);
    const pR = D.pastille(g, 330, 640, "R32", BLEU, 56, "middle");
    /* k1 : la feuille A4 en grand et le crayon qui trace le cycle */
    const k1 = el("g", { opacity: 0 }, g);
    const SX = 92, SY = 180, SH = 520;
    D.feuilleA4(k1, SX, SY, SH, { face: "recto", isobares: true });
    const trace = traceur(k1, SX, SY, SH), crayon = D.crayon(k1, 0, 0, 250, -50);
    lib(k1, SX + SH / 1.414 / 2, 748, "votre feuille", { ancre: "middle", taille: 40, coul: BLEU }).setAttribute("opacity", 1);
    /* k2 : un crayon, une règle, une calculatrice */
    const k2 = el("g", { opacity: 0 }, g);
    const CX = [40, 345, 650], CY = 255, CW = 290, CH = 330;
    const cartes = CX.map(x0 => { const v = el("g", { opacity: 0 }, k2); el("rect", { x: x0, y: CY, width: CW, height: CH, rx: 20, fill: "#fffdf8", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, v); return v; });
    D.crayon(cartes[0], CX[0] + 45, CY + 250, 250, -42);
    regle(cartes[1], CX[1] + CW / 2, CY + CH / 2, 250, -16);
    calculatrice(cartes[2], CX[2] + CW / 2 - 65 * 1.25, CY + 40, 130 * 1.25);
    const noms = ["un crayon", "une règle", "une calculatrice"].map((s, i) => lib(k2, CX[i] + CW / 2, CY + CH + 56, s, { ancre: "middle", taille: 36, coul: NUIT }));
    /* k3 : la feuille, puis consigne → pause → correction */
    const k3 = el("g", {}, g);
    const feu3 = el("g", { opacity: 0 }, k3), F3H = 270;
    D.feuilleA4(feu3, 380, 168, F3H, { face: "recto", isobares: true });
    txt(feu3, 600, 300, "votre feuille", 38, BLEU);
    const BX = [40, 380, 720], BY = 470, BW = 240, BH = 235;
    const cases = BX.map(x0 => { const v = el("g", { opacity: 0 }, k3); el("rect", { x: x0, y: BY, width: BW, height: BH, rx: 20, fill: "#fffdf8", stroke: BLEU, "stroke-width": 4 }, v); return v; });
    D.crayon(cases[0], BX[0] + 40, BY + 140, 190, -38);
    el("rect", { x: BX[1] + 78, y: BY + 40, width: 28, height: 92, rx: 6, fill: NUIT }, cases[1]); el("rect", { x: BX[1] + 134, y: BY + 40, width: 28, height: 92, rx: 6, fill: NUIT }, cases[1]);
    const ck = coche(cases[2], BX[2] + BW / 2, BY + 86, 50); opa(ck, 1);
    const etiq = ["consigne", "pause", "correction"].map((s, i) => lib(k3, BX[i] + BW / 2, BY + BH - 30, s, { ancre: "middle", taille: 38, coul: BLEU }));
    const flB = [0, 1].map(() => fleche(k3, OR, 8));
    /* l'héroïne */
    const mila = D.heroine(g, { r: 30 });
    const cle = kf([[0, 330, 440, 1.5], [T[1] - 0.4, 330, 440, 1.5], [T[1] + 0.8, 735, 440, 1.0], [T[2] - 0.2, 735, 440, 1.0], [T[2] + 0.8, 880, 215, 0.55], [T[3] - 0.2, 880, 215, 0.55], [T[3] + 0.8, 880, 285, 0.6]]);
    return function (t) {
      /* k0 */
      opa(k0, 1 - D.lisse((t - (T[1] - 0.3)) / 0.5));
      maClim(t);
      opa(pR, D.lisse((t - (T[0] + 0.3)) / 0.5) * (1 - D.lisse((t - (T[1] - 0.3)) / 0.4)));
      /* k1 */
      fen(k1, t, T[1] - 0.3, T[2] - 0.1, 0.5);
      const fc = D.lisse((t - A(1, 0.12)) / Math.max(1, 0.72 * (E[1] - T[1]))), [px, py] = trace(fc);
      crayon.setAttribute("transform", "translate(" + f1(px) + " " + f1(py) + ") rotate(-50)");
      opa(crayon, fc > 0.002 && fc < 0.999 ? 1 : 0);
      /* k2 */
      fen(k2, t, T[2] - 0.1, T[3] - 0.1, 0.4);
      cartes.forEach((v, i) => fen(v, t, A(2, 0.04 + 0.22 * i), T[3] - 0.1, 0.4));
      noms.forEach((l, i) => fen(l, t, A(2, 0.1 + 0.22 * i), T[3] - 0.1, 0.4));
      /* k3 */
      apres(feu3, t, T[3] + 0.1, 0.5);
      cases.forEach((v, i) => apres(v, t, A(3, 0.12 + 0.24 * i), 0.4));
      etiq.forEach((l, i) => apres(l, t, A(3, 0.2 + 0.24 * i), 0.4));
      flB.forEach((fl, i) => fl(BX[i] + BW + 6, BY + BH / 2, BX[i + 1] - 8, BY + BH / 2, D.lisse((t - A(3, 0.3 + 0.24 * i)) / 0.5)));
      /* l'héroïne */
      let [x, y, s] = cle(t);
      if (t < T[1] - 0.4) y += Math.sin(t * 2.2) * 6;
      mila({ x: x, y: y, s: s, t: t, temp: 0.12, etat: "vapeur", humeur: "sourire" });
      return { temp: 0.12, etat: "vapeur", humeur: "sourire" };
    };
  };

  /* =====================================================================
     RELEVÉS — la croix, le manifold, la pince ; consigne (panneau) ; le tableau des cinq relevés
     ===================================================================== */
  function cadran(p, cx, cy, r, coul) { // un cadran de manomètre : renvoie maj(f 0..1)
    el("circle", { cx: cx, cy: cy, r: r + 7, fill: "#dfe5ec", stroke: PALE, "stroke-width": 4 }, p);
    el("circle", { cx: cx, cy: cy, r: r, fill: "#fff", stroke: coul, "stroke-width": 5 }, p);
    const ang = f => (135 + 270 * f) * Math.PI / 180;
    for (let i = 0; i <= 10; i++) {
      const a = ang(i / 10), maj = i % 5 === 0;
      el("line", { x1: cx + (r - (maj ? 15 : 9)) * Math.cos(a), y1: cy + (r - (maj ? 15 : 9)) * Math.sin(a), x2: cx + (r - 3) * Math.cos(a), y2: cy + (r - 3) * Math.sin(a), stroke: NUIT, "stroke-width": maj ? 4 : 2.4 }, p);
    }
    const aig = el("line", { x1: cx, y1: cy, stroke: NUIT, "stroke-width": 5, "stroke-linecap": "round" }, p);
    el("circle", { cx: cx, cy: cy, r: 7, fill: NUIT }, p);
    return f => { const a = ang(D.borne(f, 0, 1)); aig.setAttribute("x2", (cx + (r - 14) * Math.cos(a)).toFixed(1)); aig.setAttribute("y2", (cy + (r - 14) * Math.sin(a)).toFixed(1)); };
  }
  function pince(p, rx, ry, bx, by, valeur, t1, t2, nom) { // anneau posé sur le tube + afficheur relié par un trait
    const anneau = el("circle", { cx: rx, cy: ry, r: 19, fill: "none", stroke: OR, "stroke-width": 5, opacity: 0 }, p), b = el("g", { opacity: 0 }, p);
    D.trait(b, t1[0], t1[1], t2[0], t2[1], PALE);
    el("rect", { x: bx, y: by, width: 190, height: 62, rx: 12, fill: "#1f2d3d" }, b);
    el("rect", { x: bx + 8, y: by + 7, width: 174, height: 48, rx: 6, fill: "#c9e6c3" }, b);
    txt(b, bx + 95, by + 44, valeur, 40, NUIT, MID);
    if (nom) txt(b, nom[1], nom[2], nom[0], 28, NUIT, nom[3] ? { "text-anchor": nom[3] } : MID);
    return [anneau, b];
  }

  S.releves = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const deco = el("g", {}, g);
    const X0 = 20, Y0 = 205, L = 560, cir = D.circuit(deco, X0, Y0, L, false), EC = (x, y) => cir.ecran(x, y);
    txt(deco, EC(620, 85)[0], 322, "condenseur", 28, BLEU, MID);
    txt(deco, EC(520, 545)[0], 584, "évaporateur", 28, BLEU, MID);
    txt(deco, 468, 395, "compresseur", 28, BLEU, FIN);
    txt(deco, 116, 395, "détendeur", 28, BLEU);
    const S_ = EC(800, 545), R_ = EC(890, 160), L_ = EC(500, 85), BP = EC(700, 545), HP = EC(890, 300);
    const dBP = el("circle", { cx: BP[0], cy: BP[1], r: 10, fill: BLEU, stroke: "#fff", "stroke-width": 3, opacity: 0 }, deco);
    const dHP = el("circle", { cx: HP[0], cy: HP[1], r: 10, fill: ROUGE, stroke: "#fff", "stroke-width": 3, opacity: 0 }, deco);
    /* le manifold : deux cadrans, un bloc, deux flexibles */
    const man = el("g", { opacity: 0 }, deco);
    const hose = (d, coul) => { el("path", { d: d, fill: "none", stroke: NUIT, "stroke-width": 14, "stroke-linecap": "round" }, man); el("path", { d: d, fill: "none", stroke: coul, "stroke-width": 8, "stroke-linecap": "round" }, man); };
    hose("M 690 405 C 690 520 520 585 " + (BP[0] + 6) + " " + (BP[1] + 8), "#3d86d6");
    hose("M 850 405 C 850 450 600 445 " + (HP[0] + 8) + " " + (HP[1] + 6), "#e24b3b");
    el("rect", { x: 640, y: 362, width: 260, height: 44, rx: 10, fill: "#3b4a5e" }, man);
    el("circle", { cx: 690, cy: 384, r: 13, fill: "#3d86d6", stroke: NUIT, "stroke-width": 3 }, man); el("circle", { cx: 850, cy: 384, r: 13, fill: "#e24b3b", stroke: NUIT, "stroke-width": 3 }, man);
    const majB = cadran(man, 690, 305, 50, BLEU), majH = cadran(man, 850, 305, 50, ROUGE);
    const lect = el("g", { opacity: 0 }, deco);
    txt(lect, 690, 236, "7,1 bar", 40, BLEU, MID); txt(lect, 850, 236, "23,8 bar", 40, ROUGE, MID);
    D.pastille(lect, 770, 190, "relatif", D.BLEU, 30, "middle");
    /* le technicien (silhouette, tourné vers la gauche) et la pince au repos */
    const tec = el("g", { transform: "translate(1010 393) scale(-0.9 0.9)" }, deco);
    el("rect", { x: 74, y: 332, width: 20, height: 64, rx: 7, fill: "#3b4a5e" }, tec); el("rect", { x: 98, y: 332, width: 20, height: 64, rx: 7, fill: "#3b4a5e" }, tec);
    el("rect", { x: 66, y: 238, width: 60, height: 108, rx: 20, fill: "#4d7cb5" }, tec);
    el("line", { x1: 116, y1: 262, x2: 168, y2: 286, stroke: "#4d7cb5", "stroke-width": 16, "stroke-linecap": "round" }, tec);
    el("circle", { cx: 172, cy: 288, r: 9, fill: "#e8c5a0" }, tec); el("circle", { cx: 96, cy: 210, r: 24, fill: "#e8c5a0" }, tec);
    el("path", { d: "M 70 208 A 26 26 0 0 1 122 208 Z", fill: "#e8a317" }, tec); el("rect", { x: 64, y: 206, width: 64, height: 8, rx: 4, fill: "#e8a317" }, tec);
    const repos = el("g", {}, deco);
    el("circle", { cx: 770, cy: 620, r: 26, fill: "none", stroke: OR, "stroke-width": 7 }, repos);
    el("rect", { x: 790, y: 604, width: 54, height: 36, rx: 8, fill: "#3b4a5e" }, repos); el("rect", { x: 798, y: 611, width: 38, height: 22, rx: 4, fill: "#c9e6c3" }, repos);
    txt(repos, 800, 686, "pince", 30, NUIT, MID);
    /* les trois pinces : aspiration, refoulement, sortie du condenseur (posées l'une après l'autre dans la phrase 2) */
    const pS = pince(deco, S_[0], S_[1], 420, 548, "7 °C", [S_[0], S_[1] + 19], [S_[0], 548], ["aspiration", 515, 644]);
    const pR = pince(deco, R_[0], R_[1], 556, 262, "95 °C", [R_[0] + 19, R_[1]], [556, R_[1]], ["refoulement", 651, 356]);
    const pL = pince(deco, L_[0], L_[1], 120, 150, "34 °C", [L_[0], L_[1] - 19], [L_[0], 212], ["sortie du condenseur", 322, 192, "start"]);
    const QP = [0.04, 0.37, 0.7]; // instants (fraction de la phrase 2) où chaque pince se pose
    /* le tableau des cinq relevés (k4) */
    const tab = el("g", { opacity: 0 }, deco), LIG = [];
    el("rect", { x: 596, y: 205, width: 364, height: 340, rx: 16, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, tab);
    txt(tab, 778, 245, "les cinq relevés", 34, D.BLEU, MID);
    [["BP", "7,1 bar", BLEU, "dot", BP], ["HP", "23,8 bar", ROUGE, "dot", HP], ["aspiration", "7 °C", AMBRE_T, "ring", S_], ["refoulement", "95 °C", AMBRE_T, "ring", R_], ["sortie condenseur", "34 °C", AMBRE_T, "ring", L_]].forEach(([nom, val, coul, forme, pt], i) => {
      const y = 292 + i * 48, r = el("g", { opacity: 0 }, tab);
      if (forme === "dot") el("circle", { cx: 618, cy: y - 10, r: 10, fill: coul, stroke: "#fff", "stroke-width": 2 }, r);
      else el("circle", { cx: 618, cy: y - 10, r: 10, fill: "none", stroke: OR, "stroke-width": 5 }, r);
      txt(r, 636, y, nom, 28, NUIT); txt(r, 950, y, val, 30, coul, FIN);
      const echo = el("circle", { cx: pt[0], cy: pt[1], r: 28, fill: "none", stroke: OR, "stroke-width": 5, opacity: 0 }, deco);
      LIG.push({ r: r, echo: echo });
    });
    txt(tab, 778, 528, "BP, HP : pressions relatives", 28, GRIS, MID);
    const mila = D.heroine(deco, { r: 30 });
    /* le panneau « À vous » : la consigne (phrase 3) */
    const pan = D.avous(g, { mots: "Notez les relevés", face: "verso", surligne: [0.05, 0.04, 0.95, 0.49], rempli: 0 });
    /* trajet de l'héroïne sur la croix (indices de D.circuitPoint) : aspiration, refoulement, sortie du condenseur, puis le tour */
    const U = rep([[0, 14.5], [A(2, 0.02), 14.5], [A(2, 0.3), 16.35], [A(2, 0.5), 16.35], [A(2, 0.62), 19], [A(2, 0.78), 19], [A(2, 0.95), 22.5], [T[3], 22.5], [T[4] + 0.4, 22.5], [E[4] - 0.2, 29.5]]);
    const TP = rep([[0, 0.12], [A(2, 0.5), 0.12], [A(2, 0.62), 0.75], [A(2, 0.78), 0.75], [A(2, 0.95), 0.45], [A(4, 0.55), 0.45], [A(4, 0.85), 0.05], [E[4], 0.12]]);
    return function (t) {
      const pn = panneau(c, t, 3), vis = 1 - pn;
      opa(pan, pn); opa(deco, vis);
      const m0 = vu(c, t, 0), m1 = vu(c, t, 1), m2 = vu(c, t, 2);
      opa(man, m0 * (1 - m2)); opa(dBP, m0); opa(dHP, m0);
      opa(lect, m1 * (1 - m2));
      const fb = D.lisse((t - T[1] - 0.2) / ((E[1] - T[1]) * 0.5));
      majB(0.237 * fb + 0.01 * Math.sin(t * 40) * (1 - fb)); majH(0.793 * fb + 0.01 * Math.sin(t * 40) * (1 - fb));
      opa(repos, m0 * (1 - m2));
      [pS, pR, pL].forEach(([an, bo], i) => { const v = D.lisse((t - A(2, QP[i])) / 0.35), sorti = 1 - vu(c, t, 3); opa(an, v * sorti); opa(bo, v * sorti); });
      opa(tab, vu(c, t, 4));
      LIG.forEach((q, i) => {
        const d = A(4, 0.06 + 0.17 * i);
        opa(q.r, D.borne((t - d + 0.15) / 0.4, 0, 1));
        const e = (t - d) / 1.3;
        q.echo.setAttribute("r", (20 + 14 * D.borne(e, 0, 1)).toFixed(1)); opa(q.echo, e > 0 && e < 1 ? 1 - e : 0);
      });
      const u = U(t), temp = TP(t), [hx, hy] = EC(...D.circuitPoint(u));
      const etat = u < 22.6 ? "vapeur" : u < 28 ? "liquide" : "bout", humeur = t >= A(2, 0.55) && t < A(2, 0.85) ? "chaud" : "sourire";
      mila({ x: hx, y: hy, s: 0.7, t: t, temp: temp, etat: etat, humeur: humeur });
      return { temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* =====================================================================
     ABSOLU — consigne (panneau) ; +1 bar, les deux isobares, les températures de saturation, surchauffe, sous-refroidissement
     ===================================================================== */
  const CLOCHE_G = [[0.12, 0], [0.14, 0.18], [0.2, 0.4], [0.3, 0.62], [0.45, 0.86], [0.62, 0.97]];
  const CLOCHE_D = [[0.62, 0.97], [0.72, 0.88], [0.78, 0.68], [0.8, 0.42], [0.8, 0.2], [0.78, 0]];
  const coupe = (pl, v) => { // abscisse où la polyligne [[u, v]] croise la hauteur v
    for (let i = 1; i < pl.length; i++) {
      const a = pl[i - 1], b = pl[i];
      if ((a[1] - v) * (b[1] - v) <= 0 && a[1] !== b[1]) return D.lerp(a[0], b[0], (v - a[1]) / (b[1] - a[1]));
    }
    return pl[0][0];
  };
  S.absolu = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const deco = el("g", {}, g);
    /* le tableau des relevés, en petit, en haut à gauche */
    const tab = el("g", {}, deco);
    el("rect", { x: 28, y: 158, width: 296, height: 192, rx: 14, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 3 }, tab);
    const LIG = [["BP", "7,1 bar", BLEU, [1, 2]], ["HP", "23,8 bar", ROUGE, [1, 3]], ["aspiration", "7 °C", AMBRE_T, [4]], ["refoulement", "95 °C", AMBRE_T, []], ["condenseur", "34 °C", AMBRE_T, [5]]].map(([nom, val, coul, ph], i) => {
      const y = 196 + i * 34, lum = el("rect", { x: 34, y: y - 26, width: 284, height: 33, rx: 8, fill: "#ffe9a8", opacity: 0 }, tab);
      txt(tab, 44, y, nom, 28, NUIT); txt(tab, 312, y, val, 28, coul, FIN);
      return { lum: lum, ph: ph };
    });
    /* k1 : les deux additions (bande du haut) */
    const t1a = el("g", { opacity: 0 }, deco), t1b = el("g", { opacity: 0 }, deco);
    multi(t1a, 645, 258, [["7,1", BLEU], [" + 1", AMBRE_T], [" = 8,1 bar abs", BLEU]], 46, "middle");
    multi(t1b, 645, 336, [["23,8", ROUGE], [" + 1", AMBRE_T], [" = 24,8 bar abs", ROUGE]], 46, "middle");
    /* le repère (pression absolue en haut, enthalpie à droite), la mini-cloche, les deux isobares */
    const px0 = 80, py0 = 395, W = 450, H = 330, X = u => px0 + u * W, Y = v => py0 + H - v * H;
    const plan = el("g", { opacity: 0 }, deco), cloche = el("g", { opacity: 0 }, deco);
    el("path", { d: "M " + pts(CLOCHE_G.concat(CLOCHE_D.slice(1)).map(([u, v]) => [X(u), Y(v)])).replace(/ /g, " L "), fill: "rgba(47,111,184,.10)", stroke: BLEU, "stroke-width": 4 }, cloche);
    el("path", { d: "M " + px0 + " " + (py0 + H + 4) + " V " + (py0 - 10) + " m -8 13 l 8 -13 l 8 13", fill: "none", stroke: NUIT, "stroke-width": 4 }, plan);
    el("path", { d: "M " + (px0 - 4) + " " + (py0 + H) + " H " + (px0 + W + 12) + " m -13 -8 l 13 8 l -13 8", fill: "none", stroke: NUIT, "stroke-width": 4 }, plan);
    txt(plan, px0 + 16, 392, "pression absolue", 28, NUIT); txt(plan, px0 + W / 2, 752, "h : énergie de 1 kg", 28, NUIT, MID);
    const BPv = 0.26, HPv = 0.67; // 8,1 et 24,8 bar sur l'échelle log de 4 à 60 bar
    const uBPg = coupe(CLOCHE_G, BPv), uBPd = coupe(CLOCHE_D, BPv), uHPg = coupe(CLOCHE_G, HPv), uHPd = coupe(CLOCHE_D, HPv);
    const lBP = el("g", { opacity: 0 }, deco), lHP = el("g", { opacity: 0 }, deco);
    [[lBP, BPv, BLEU, "BP 8,1 bar abs", "0 °C", "évaporation", uBPg, uBPd, 0.2], [lHP, HPv, ROUGE, "HP 24,8 bar abs", "40 °C", "condensation", uHPg, uHPd, 0.85]].forEach(([gr, v, coul, nom, tmp, cap, ug, ud, niv]) => {
      el("line", { x1: px0, y1: Y(v), x2: 730, y2: Y(v), stroke: coul, "stroke-width": 4 }, gr);
      txt(gr, 452, Y(v) - 9, nom, 28, coul);
      const seg = el("g", { opacity: 0 }, deco);
      el("line", { x1: X(ug), y1: Y(v), x2: X(ud), y2: Y(v), stroke: coul, "stroke-width": 11, "stroke-linecap": "round", opacity: 0.55 }, seg);
      [ug, ud].forEach(u => el("circle", { cx: X(u), cy: Y(v), r: 9, fill: NUIT, stroke: "#fff", "stroke-width": 3 }, seg));
      const th = el("g", { opacity: 0 }, deco), ty = Y(v);
      el("rect", { x: 739, y: ty - 66, width: 18, height: 56, rx: 9, fill: "#fff", stroke: NUIT, "stroke-width": 3 }, th);
      el("rect", { x: 744, y: ty - 6 - 50 * niv, width: 8, height: 50 * niv + 6, fill: ROUGE }, th);
      el("circle", { cx: 748, cy: ty, r: 15, fill: ROUGE, stroke: NUIT, "stroke-width": 3 }, th);
      txt(th, 775, ty - 10, tmp, 46, coul); txt(th, 775, ty + 32, cap, 28, NUIT);
      gr.seg = seg; gr.th = th;
    });
    const mila = D.heroine(deco, { r: 30 });
    /* k4, k5 : les réglettes (bande du haut) */
    function reglette(a, b, haut, coul, gA, gB, sA, sB) {
      const r = el("g", { opacity: 0 }, deco), x0 = 420, x1 = 860, n = b - a;
      el("rect", { x: x0, y: 262, width: x1 - x0, height: 30, rx: 6, fill: "#fff", stroke: NUIT, "stroke-width": 4 }, r);
      el("rect", { x: x0 + 3, y: 265, width: x1 - x0 - 6, height: 24, rx: 4, fill: coul, opacity: 0.4 }, r);
      for (let i = 0; i <= n; i++) el("line", { x1: x0 + (x1 - x0) * i / n, y1: 262, x2: x0 + (x1 - x0) * i / n, y2: 292, stroke: NUIT, "stroke-width": 3 }, r);
      el("path", { d: "M " + x0 + " 250 V 232 H " + x1 + " V 250", fill: "none", stroke: coul, "stroke-width": 5, "stroke-linejoin": "round" }, r);
      txt(r, (x0 + x1) / 2, 206, haut, 42, coul, MID);
      txt(r, x0, 332, gA, 34, NUIT, MID); txt(r, x1, 332, gB, 34, NUIT, MID);
      txt(r, x0, 370, sA, 28, GRIS, MID); txt(r, x1, 370, sB, 28, GRIS, MID);
      return r;
    }
    const reg1 = reglette(0, 7, "7 K de surchauffe", AMBRE_T, "0 °C", "7 °C", "évaporation", "aspiration");
    const reg2 = reglette(34, 40, "6 K de sous-refroidissement", BLEU, "34 °C", "40 °C", "à la sortie", "condensation");
    /* le panneau « À vous » : la consigne (phrase 0) */
    const pan = D.avous(g, { mots: "Passez en absolu", face: "recto", isobares: false, surligne: [0.06, 0.05, 0.94, 0.95] });
    const apr = (t, a) => D.lisse((t - a) / 0.4);
    return function (t) {
      const pn = panneau(c, t, 0);
      opa(pan, pn); opa(deco, 1 - pn);
      LIG.forEach(q => opa(q.lum, q.ph.reduce((m, k) => Math.max(m, seul(c, t, k)), 0)));
      opa(t1a, apr(t, A(1, 0.04)) * (1 - vu(c, t, 4))); opa(t1b, apr(t, A(1, 0.5)) * (1 - vu(c, t, 4)));
      opa(plan, apr(t, A(1, 0.28))); opa(lBP, apr(t, A(1, 0.3))); opa(lHP, apr(t, A(1, 0.7)));
      opa(cloche, vu(c, t, 2));
      opa(lBP.seg, seul(c, t, 2) + vu(c, t, 3) * 0.45); opa(lBP.th, vu(c, t, 2));
      opa(lHP.seg, vu(c, t, 3)); opa(lHP.th, vu(c, t, 3));
      const mb = vu(c, t, 2), h4 = D.lisse((t - T[3]) / 0.9), temp = D.lerp(0.05, 0.55, h4);
      mila({ x: D.lerp(X(0.475), X(0.54), h4), y: D.lerp(Y(BPv), Y(HPv), h4), s: 0.72, t: t, temp: temp, etat: "bout", humeur: "sourire", op: mb });
      opa(reg1, seul(c, t, 4)); opa(reg2, seul(c, t, 5));
      return t < T[2] ? { temp: 0.12, etat: "vapeur", humeur: "sourire" } : { temp: temp, etat: "bout", humeur: "sourire" };
    };
  };
})();
