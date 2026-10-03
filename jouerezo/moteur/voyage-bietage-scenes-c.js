/* =====================================================================
   voyage-bietage-scenes-c.js — bi-étagé : le régulateur à flotteur, le
   liquide refroidi, le gain, ce que l'on surveille, le résumé
   ---------------------------------------------------------------------
   Même contrat que voyage-nh3-scenes-c.js : VOYAGE_SCENES[id](g, c) → maj(t).
   Phrases 0-1 des organes (flotteur) = carte d'identité posée par le théâtre,
   coupe utile à partir de la phrase 2. ÉCRAN PARTAGÉ : tout tient dans
   x 20 → 965, y 150 → 760 (la colonne de droite porte la carte et le
   diagramme). Récit : donnees/voyage-bietage.js (l'ORDRE des phrases porte
   les gestes). Brief : voyage-bietage/BRIEF-SCENES.md. ACIER : jamais de cuivre.
   LIQUIDE : nappe (D.liquide). VAPEUR : petites molécules séparées.
   TOUT EST FONCTION DE t. Ce fichier ne définit QUE : flotteur, liquide,
   gain, surveillance, resume.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const TOUR = 2 * Math.PI, NIV = 500; // NIV : niveau normal de la bouteille intermédiaire
  const SANS = "Calibri, Arial, sans-serif", TITRE = "Trebuchet MS, Arial, sans-serif";
  const CLAIR = "#f4f8fc", VERT = "#1e7e54", ROUGE = "#c0392b", BLEU = "#2f6fb8", ENCRE = "#10233c", GRIS = "#637285";

  /* ---------- petites aides locales ---------- */
  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const ap = (e, a) => { for (const k in a) e.setAttribute(k, typeof a[k] === "number" ? +a[k].toFixed(1) : a[k]); };
  const rect = (p, x, y, w, h, at) => D.el("rect", Object.assign({ x: x, y: y, width: w, height: h }, at || {}), p);
  const poly = (p, pts, at) => D.el("polygon", Object.assign({ points: pts.map(q => q.join(",")).join(" ") }, at || {}), p);
  const plan = (maj, g) => { if (maj.g.parentNode !== g) g.appendChild(maj.g); };
  const rampe = (t, a, du) => D.lisse((t - a) / (du || 0.5));
  const etiq = (p, x, y, s, at) => D.etiquette(p, x, y, s, Object.assign({ "font-size": 30 }, at || {}));
  const fluide = (p, r, fill, o) => rect(p, r[0], r[1], r[2], r[3], { fill: fill, opacity: o });
  /* petite molécule de vapeur (D.mol en gris-bleu) avec taille et couleur au choix */
  function mol(parent, coul) {
    const u = D.el("use", { href: "#vm-mol" }, parent);
    return (x, y, s, o, c) => {
      u.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") scale(" + (s || 1).toFixed(2) + ")");
      u.setAttribute("fill", c || coul); u.setAttribute("opacity", (o === undefined ? 1 : D.borne(o, 0, 1)).toFixed(2));
    };
  }
  /* point à la fraction u (0..1) d'une ligne brisée, à vitesse constante */
  function suivre(pts, u) {
    const L = [0];
    for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const d = D.borne(u, 0, 1) * L[L.length - 1];
    let i = 1;
    while (i < pts.length - 1 && d > L[i]) i++;
    const f = (d - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
    return [D.lerp(pts[i - 1][0], pts[i][0], f), D.lerp(pts[i - 1][1], pts[i][1], f)];
  }
  /* enceinte d'acier à angles peu arrondis : rend { dedans (découpé), x0, x1, yh, yb } */
  let nc = 0;
  function enceinte(parent, o) {
    const g = D.el("g", {}, parent), e = 14, cid = "vbc-enc-" + (++nc);
    rect(g, o.x, o.y, o.l, o.h, { rx: o.rx, fill: "url(#vm-acier-h)" });
    const dim = { x: o.x + e, y: o.y + e, width: o.l - 2 * e, height: o.h - 2 * e, rx: Math.max(2, o.rx - e) };
    D.el("rect", Object.assign({}, dim), D.el("clipPath", { id: cid }, g));
    D.el("rect", Object.assign({ fill: CLAIR }, dim), g);
    return { g: g, dedans: D.el("g", { "clip-path": "url(#" + cid + ")" }, g), x0: o.x + e, x1: o.x + o.l - e, yh: o.y + e, yb: o.y + o.h - e };
  }
  /* tuyau d'acier fait de tronçons : toutes les parois d'abord, puis les intérieurs (coudes ouverts). Tronçon = [x, y, l, h, vertical] */
  function tuyau(parent, murs, ints) {
    murs.forEach(([x, y, w, h, v]) => rect(parent, x, y, w, h, { rx: 3, fill: "url(#vm-acier" + (v ? "-h" : "") + ")" }));
    ints.forEach(([x, y, w, h]) => rect(parent, x, y, w, h, { fill: CLAIR }));
  }
  /* reflets qui filent dans un tube plein ; dist = distance parcourue (px), sens donné par son signe */
  function reflets(parent, o) { // o : { x0, x1, y0, y1, nb, graine }
    const r = D.alea(o.graine), L = [], long = o.x1 - o.x0;
    for (let i = 0; i < o.nb; i++) L.push({ s: r(), p: r(), l: 18 + r() * 22, e: D.el("line", { stroke: "#fff", "stroke-width": 3, "stroke-linecap": "round", opacity: 0 }, parent) });
    return function (dist, vis) {
      L.forEach(c => {
        const x = o.x0 + D.frac(c.s + dist / long) * long, y = o.y0 + 4 + c.p * (o.y1 - o.y0 - 8);
        ap(c.e, { x1: x, x2: Math.min(o.x1, x + c.l), y1: y, y2: y });
        c.e.setAttribute("opacity", (0.6 * vis).toFixed(2));
      });
    };
  }
  /* une rangée de pastilles centrée en cx : [[texte, fond], …] séparées par `sep` */
  function rangee(parent, cx, y, liste, sep, taille) {
    const w = D.el("g", {}, parent);
    let x = 0;
    liste.forEach(([s, fond], i) => {
      if (i) { D.texte(w, x + 22, y + 2, sep, { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: D.BLEU, "font-family": SANS }); x += 44; }
      x += D.pastille(w, x, y, s, fond, taille || 30, "start").largeur;
    });
    w.setAttribute("transform", "translate(" + (cx - x / 2).toFixed(1) + " 0)");
    return w;
  }
  /* pastilles empilées (une phrase longue sur deux lignes), centrées en cx */
  function pastilles(parent, cx, y, lignes, fond, taille) {
    const w = D.el("g", {}, parent);
    lignes.forEach((s, i) => D.pastille(w, cx, y + i * 46, s, fond, taille || 30, "middle"));
    return w;
  }
  /* la grande flèche orange vers la droite (le diagramme est à droite de la scène), texte au-dessus */
  function versDiagramme(parent, lignes, y) {
    const w = D.el("g", {}, parent);
    D.lignes(w, 955, y, lignes, { "text-anchor": "end", "font-size": 30, "font-weight": 700, fill: D.ORANGE, "font-family": SANS }, 36);
    const ya = y + 36 * (lignes.length - 1) + 44, f = D.el("g", {}, w);
    poly(f, [[690, ya - 15], [892, ya - 15], [892, ya - 32], [956, ya], [892, ya + 32], [892, ya + 15], [690, ya + 15]], { fill: D.ORANGE, stroke: "#8a2f10", "stroke-width": 2, "stroke-linejoin": "round" });
    w.fleche = f;
    return w;
  }
  const mix = (a, b, f) => "rgb(" + a.map((v, i) => Math.round(D.lerp(v, b[i], f))).join(",") + ")";
  /* thermomètre vertical : tube centré en x de yh à yb, ampoule dessous ; maj(niveau 0..1, couleur) */
  function thermo(parent, x, yh, yb) {
    const g = D.el("g", {}, parent);
    D.el("circle", { cx: x, cy: yb + 14, r: 26, fill: "#fff", stroke: "#4d5866", "stroke-width": 4 }, g);
    rect(g, x - 14, yh, 28, yb - yh + 10, { rx: 14, fill: "#fff", stroke: "#4d5866", "stroke-width": 4 });
    rect(g, x - 10, yb - 4, 20, 26, { fill: "#fff" });
    const bulbe = D.el("circle", { cx: x, cy: yb + 14, r: 19, fill: ROUGE }, g), col = rect(g, x - 8, yb, 16, 0, { fill: ROUGE });
    return { g: g, maj: (niveau, coul) => {
      const y = yb - D.borne(niveau, 0, 1) * (yb - yh - 8);
      ap(col, { y: y, height: yb + 6 - y }); col.setAttribute("fill", coul); bulbe.setAttribute("fill", coul);
    } };
  }

  /* ---------- le dessin commun 2 : la bouteille intermédiaire en coupe (mêmes cotes que l'agent B) ----------
     D.cuve x 360, y 210, l 240, h 520 ; nappe jusqu'à y 500 ; tube plongeur (paroi droite à y 270 → x 530 → descend
     jusqu'à y 650) ; sortie vapeur en haut au centre (x 480, jusqu'à y 160 puis à droite) ; entrée du liquide par la
     paroi gauche à y 300 ; sortie du liquide par la paroi gauche à y 690 ; boîtier « sécurité de niveau haut » à
     droite, y 420. o : { droite (fin du tube plongeur), vapeurFin, entree (début du tube d'entrée), sortie (idem) }.
     Rend { cuve, vap (vapeur, sous la nappe), fond (sous la nappe), liq, devant (sur la nappe), tubes, lampe, niveau(y) }. */
  function bouteille(g, o) {
    o = o || {};
    const cuve = D.cuve(g, { x: 360, y: 210, l: 240, h: 520, vertical: true });
    const vap = D.el("g", {}, cuve.dedans), fond = D.el("g", {}, cuve.dedans);
    let nv = (cuve.yb - NIV) / (cuve.yb - cuve.yh);
    const liq = D.liquide(cuve.dedans, { x0: cuve.x0, x1: cuve.x1, yh: cuve.yh, yb: cuve.yb, niveau: () => nv, couleur: () => D.couleur(0.22, false), pas: 12, opacite: 0.6 });
    const devant = D.el("g", {}, cuve.dedans), tubes = D.el("g", {}, g);
    const xd = o.droite || 700, xv = o.vapeurFin || 930;
    const murs = [[514, 254, xd - 514, 32], [514, 254, 32, 396, true], [464, 160, xv - 464, 32], [464, 160, 32, 74, true]];
    const ints = [[522, 262, xd - 522, 16], [522, 262, 16, 388], [472, 168, xv - 472, 16], [472, 168, 16, 70]];
    if (o.entree !== undefined) { murs.push([o.entree, 282, 400 - o.entree, 36]); ints.push([o.entree, 288, 400 - o.entree, 24]); }
    if (o.sortie !== undefined) { murs.push([o.sortie, 672, 424 - o.sortie, 36]); ints.push([o.sortie - 8, 678, 432 - o.sortie, 24]); }
    tuyau(tubes, murs, ints);
    rect(tubes, 596, 412, 12, 16, { fill: "url(#vm-acier-h)" });
    rect(tubes, 604, 394, 56, 52, { rx: 9, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 3 });
    const lampe = D.el("circle", { cx: 632, cy: 420, r: 9, fill: "#2ea66a", stroke: "#1b2733", "stroke-width": 2 }, tubes);
    return { cuve: cuve, vap: vap, fond: fond, liq: liq, devant: devant, tubes: tubes, lampe: lampe, niveau: y => { nv = (cuve.yb - y) / (cuve.yb - cuve.yh); } };
  }

  /* ---------- 8 · le régulateur à flotteur ----------
     À gauche, la chambre du flotteur : le liquide HP (tiède) arrive par le haut dans le corps du régulateur ; un
     pointeau (cône) ferme ou ouvre le siège. Le bras pivote à gauche, la boule suit le niveau, la tige du pointeau
     repose sur le bras : niveau qui baisse → bras qui descend → pointeau qui s'écarte du siège (ça ouvre). La sortie
     du siège entre dans la bouteille intermédiaire (paroi gauche, y 300), qui est à droite. Deux tubes d'équilibrage
     (vapeur en haut, liquide en bas) donnent le même niveau dans la chambre et dans la bouteille. */
  S.flotteur = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const FROID = D.couleur(0.22, false), TIEDE = D.couleur(0.5, false), VAPEUR = D.couleur(0.22, true);
    const LV0 = 500, LV1 = 530, PX = 80, PY = 470, LB = 140, XN = 164; // niveaux, pivot du bras, longueur du bras, axe du pointeau
    const lvAt = t => D.courbe([[0, LV0], [T[1] + 0.8, LV0], [T[2] - 0.4, LV1], [A(3, 0.55), LV1], [A(4, 0.9), LV0]], t);
    const phiAt = lv => Math.asin(D.borne((lv - PY) / LB, -0.95, 0.95));
    const TAN0 = Math.tan(phiAt(LV0)), MARCHE = (XN - PX) * (Math.tan(phiAt(LV1)) - TAN0);
    const ouvAt = t => D.borne(((XN - PX) * (Math.tan(phiAt(lvAt(t))) - TAN0) - 1.5) / (MARCHE - 1.5), 0, 1);

    // la chambre du flotteur : intérieur x 50 → 276, y 210 → 596
    const ch = enceinte(g, { x: 36, y: 196, l: 254, h: 414, rx: 24 });
    const vapC = D.el("g", {}, ch.dedans), fondC = D.el("g", {}, ch.dedans);
    let nvC = 0.5;
    const liqC = D.liquide(ch.dedans, { x0: ch.x0, x1: ch.x1, yh: ch.yh, yb: ch.yb, niveau: () => nvC, couleur: () => FROID, pas: 14, opacite: 0.6 });
    const bras = D.el("line", { stroke: "#6b7785", "stroke-width": 12, "stroke-linecap": "round" }, fondC);
    const brasC = D.el("line", { stroke: "#d4dce4", "stroke-width": 3.5, "stroke-linecap": "round" }, fondC);
    const boule = D.el("g", {}, fondC);
    D.el("circle", { r: 27, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 3 }, boule);
    D.el("circle", { r: 19, fill: "#e9eef3", stroke: "#8794a3", "stroke-width": 2 }, boule);
    D.el("ellipse", { cx: -9, cy: -10, rx: 8, ry: 4, fill: "#fff", opacity: 0.8, transform: "rotate(-30 -9 -10)" }, boule);
    rect(fondC, 50, 461, 30, 18, { fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 });
    D.el("circle", { cx: PX, cy: PY, r: 10, fill: "#3f4a55", stroke: "#1b2733", "stroke-width": 2 }, fondC);
    const MC = [[226, 360], [252, 408], [214, 440]].map(([x, y], i) => ({ x: x, y: y, ph: i * 2.1, maj: mol(vapC, VAPEUR) }));

    // la bouteille intermédiaire, à droite (dessin commun 2)
    const b = bouteille(g, { droite: 720, vapeurFin: 930 });
    const VP = [[430, 372], [468, 430], [412, 452], [492, 346], [440, 330]].map(([x, y], i) => ({ x: x, y: y, ph: i * 1.7, maj: mol(b.vap, VAPEUR) }));

    // le corps du régulateur, le siège, les tuyaux
    rect(g, 96, 216, 136, 108, { rx: 8, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 });
    const HPc = [108, 228, 112, 38], BPc = [108, 288, 112, 24];
    fluide(g, HPc, CLAIR, 1); fluide(g, BPc, CLAIR, 1);
    const orif = [[XN - 9, 266], [XN + 9, 266], [XN + 21, 288], [XN - 21, 288]];
    poly(g, orif, { fill: CLAIR, stroke: "#5d6b7a", "stroke-width": 2 });
    const HPp = [152, 150, 24, 86], OUTi = [220, 288, 180, 24];
    tuyau(g, [[146, 150, 36, 86, true], [220, 282, 180, 36], [270, 226, 156, 28], [270, 560, 112, 36]],
      [HPp, OUTi, [270, 232, 156, 16], [270, 566, 112, 24]]);
    fluide(g, HPp, TIEDE, 0.88); fluide(g, HPc, TIEDE, 0.88); fluide(g, [270, 566, 112, 24], FROID, 0.82);
    const orifF = poly(g, orif, { fill: TIEDE });
    const bpF = fluide(g, BPc, FROID, 0), outF = fluide(g, OUTi, FROID, 0);
    const fluxOut = reflets(g, { x0: 222, x1: 396, y0: 288, y1: 312, nb: 6, graine: 4 });
    const BUL = [0, 1, 2, 3, 4].map(i => ({ s: i / 5, r: 4 + (i % 3), e: D.el("circle", { fill: "#fff", "fill-opacity": 0.45, stroke: "#fff", "stroke-width": 2 }, g) }));
    // pointeau (cône sur le siège, tige sur le bras)
    const tige = rect(g, XN - 5, 0, 10, 10, { fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 1.5 });
    const cone = D.el("polygon", { fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);

    // la nappe de la bouteille : bulles qui naissent, ondes d'arrivée, molécules vertes de la vapeur de détente
    const bull = D.bulles(b.devant, 5, 33, false);
    const NVOIS = 6, XE = [420, 470, 440, 480, 455, 475], VOIS = [];
    const haut = D.el("g", {}, g); // tout ce qui passe devant : héroïne, voisines
    const posVois = (v, t) => {
      const u = D.borne((t - v.t0) / v.df, 0, 1), yl = b.liq.surface(v.xe, t) - 8;
      return [D.lerp(398, v.xe, D.lisse(u)) + 5 * Math.sin(t * 1.6 + v.i), D.lerp(300, yl, Math.pow(u, 1.5)) + 36 * rampe(t, v.t0 + v.df, 1.4)];
    };
    for (let i = 0; i < NVOIS; i++) {
      const t0 = A(3, 0.12 + 0.13 * i); // elles sortent du tuyau pendant la phrase 3 ; les liquides retombent dans la nappe pendant la phrase 4
      VOIS.push({ i: i, t0: t0, df: [6.4, 6.0, 5.6, 5.0, 4.6, 4.2][i], xe: XE[i], bout: i % 2 === 0, tv: t0 + 1.3, maj: D.heroine(haut, { r: 15, sansHalo: true, dephasage: i * 0.17 }) });
    }
    const ondes = D.el("g", {}, b.devant), RING = [];
    for (let i = 0; i <= NVOIS; i++) RING.push(D.el("ellipse", { fill: "none", stroke: "#fff", "stroke-width": 3, opacity: 0 }, ondes));
    const VERTS = [], vg = D.alea(7), gv = D.el("g", {}, g);
    VOIS.filter(v => v.bout).forEach(v => VERTS.push({ tb: v.tv, v: v }));
    for (let i = 0; i < 9; i++) VERTS.push({ tb: A(3, 0.62) + i * 1.05, x0: 416 + vg() * 70 });
    VERTS.forEach(m => { m.maj = mol(gv, VERT); m.ring = D.el("circle", { fill: "none", stroke: VERT, "stroke-width": 3, opacity: 0 }, gv); });
    const FLECHE = D.el("g", {}, g);
    poly(FLECHE, [[470, 488], [470, 296], [450, 296], [480, 240], [510, 296], [490, 296], [490, 488]], { fill: VERT, "fill-opacity": 0.85, stroke: "#14573a", "stroke-width": 2.5, "stroke-linejoin": "round" });
    const tete = D.el("polygon", { points: "930,152 930,200 962,176", fill: VERT, stroke: "#14573a", "stroke-width": 2, "stroke-linejoin": "round" }, g);
    const mila = D.heroine(haut, { r: 30 });

    // étiquettes, panneaux, pastilles
    const eHP = etiq(g, 196, 180, "liquide HP");
    const eFlot = etiq(g, 60, 656, "flotteur"), tFlot = D.trait(g, 120, 626, 190, 530, GRIS);
    const eBP = etiq(g, 626, 326, "du compresseur BP", { "font-size": 28, fill: GRIS, "font-weight": 600 });
    const eVHP = etiq(g, 955, 236, "vers le compresseur HP", { "text-anchor": "end" });
    function panneau(y, texte) {
      const w = D.el("g", {}, g);
      rect(w, 640, y, 312, 58, { rx: 14, fill: "#fffdf8", stroke: GRIS, "stroke-width": 3 });
      D.el("circle", { cx: 676, cy: y + 29, r: 21, fill: "none", stroke: ROUGE, "stroke-width": 6 }, w);
      D.el("line", { x1: 661, y1: y + 44, x2: 691, y2: y + 14, stroke: ROUGE, "stroke-width": 6, "stroke-linecap": "round" }, w);
      etiq(w, 712, y + 40, texte, { "font-size": 30 });
      return w;
    }
    const pEvap = panneau(472, "évaporateur"), pBP = panneau(546, "compresseur BP");
    const pHI = rangee(g, 782, 612, [["haute", D.ORANGE], ["intermédiaire", VERT]], "→", 28);
    const aDiag = versDiagramme(g, ["sur le diagramme :", "je tombe tout droit"], 540);

    return function (t) {
      const lv = lvAt(t), ouv = ouvAt(t), phi = phiAt(lv), tan = Math.tan(phi);
      nvC = (ch.yb - lv) / (ch.yb - ch.yh); b.niveau(lv); liqC.maj(t); b.liq.maj(t);
      // le bras, la boule, le pointeau
      const by = lv + 1.5 * Math.sin(t * 2.1), bx = PX + LB * Math.cos(phiAt(by));
      ap(bras, { x1: PX, y1: PY, x2: bx, y2: by }); ap(brasC, { x1: PX, y1: PY, x2: bx, y2: by });
      boule.setAttribute("transform", "translate(" + bx.toFixed(1) + " " + by.toFixed(1) + ")");
      const arm = PY + (XN - PX) * tan, apex = 238 + Math.max(0, (XN - PX) * (tan - TAN0) - 1.5);
      cone.setAttribute("points", [[XN, apex], [XN - 20, apex + 50], [XN + 20, apex + 50]].map(p => p.join(",")).join(" "));
      ap(tige, { y: apex + 50, height: Math.max(2, arm - apex - 50) });
      // le liquide : HP tiède en haut, froid après le siège
      op(orifF, ouv); op(bpF, Math.min(1, ouv * 2.5) * 0.85); op(outF, Math.min(1, ouv * 2.5) * 0.85);
      fluxOut(70 * t, ouv > 0.04 ? 1 : 0);
      const bv = D.fenetre(t, A(3, 0.0), E[4], 0.6) * (ouv > 0.3 ? 1 : 0);
      BUL.forEach(m => { const x = 238 + D.frac(m.s + t * 0.3) * 150; ap(m.e, { cx: x, cy: 300 + 5 * Math.sin(t * 3 + m.s * 9), r: m.r }); op(m.e, bv * D.fenetre(D.frac(m.s + t * 0.3), 0, 1, 0.15)); });
      // la vapeur au repos
      MC.forEach(m => m.maj(m.x + Math.sin(t * 0.9 + m.ph) * 8, m.y + Math.cos(t * 0.7 + m.ph) * 6, 1, 0.9));
      VP.forEach(m => m.maj(m.x + Math.sin(t * 0.7 + m.ph) * 9, Math.min(m.y + Math.cos(t * 0.6 + m.ph) * 8, lv - 30), 1, 0.9));
      // les bulles qui naissent dans la nappe (de la phrase 3 à la fin de la 5)
      const vb = D.fenetre(t, A(3, 0.5), E[5], 0.6);
      bull(t, (q, bb) => { const x = 400 + q * 100; return [x, 580 + 20 * q, b.liq.surface(x, t) + 3, vb, "#fff"]; });
      // l'héroïne : attend dans le tuyau HP, passe le pointeau, traverse la sortie, tombe dans la nappe
      const tA = A(2, 0.06), tB = A(2, 0.3), tC = A(2, 0.46), tD = A(2, 0.64), tE = E[2], tF = A(4, 0.05);
      let x, y, s, ec = 0, temp, humeur;
      if (t < tF) {
        x = D.courbe([[0, 164], [tB, 164], [tC, 164], [tD, 200], [tE - 0.4, 340], [tE, 398]], t, true);
        y = D.courbe([[0, 172], [tA, 172], [tB, 247], [tC, 278], [tD, 300], [tE, 300]], t, true);
        s = D.courbe([[0, 0.42], [tB, 0.4], [tC, 0.3], [tD, 0.4], [tE, 0.5]], t, true);
        ec = 0.6 * D.fenetre(t, tB + 0.15, tD, 0.3);
        if (t > tE) { const u = D.borne((t - tE) / (tF - tE), 0, 1), xl = 446, yl = b.liq.surface(xl, t) - 6; x = D.lerp(398, xl, D.lisse(u)); y = D.lerp(300, yl, Math.pow(u, 1.5)); s = D.lerp(0.5, 0.9, D.lisse(u)); ec = 0; }
      } else { x = 446 + 22 * Math.sin(t * 0.5); s = 0.9; y = b.liq.surface(x, t) - 6; }
      temp = D.courbe([[0, 0.5], [tC - 0.2, 0.5], [tD, 0.22]], t, true);
      humeur = t > tB && t < tD + 0.6 ? "surprise" : t > tD + 0.6 && t < tF + 0.8 ? "froid" : "sourire";
      plan(mila, t > tF ? b.fond : haut);
      mila({ x: x, y: y, s: s, t: t, temp: temp, etat: "liquide", humeur: humeur, ecrase: ec, regard: [1, 0] });
      // les voisines : une sur deux se met à bouillir
      VOIS.forEach(v => {
        const [vx, vy] = posVois(v, t);
        let o = rampe(t, v.t0, 0.3);
        o *= v.bout ? 1 - rampe(t, v.tv + 0.15, 0.35) : 1 - rampe(t, v.t0 + v.df + 1.2, 1.0);
        v.maj({ x: vx, y: vy, s: 1, t: t, temp: 0.22, etat: v.bout && t > v.tv - 0.3 ? "bout" : "liquide", humeur: "froid", regard: [0, 0], op: o });
        const r = RING[v.i], f = (t - (v.t0 + v.df)) / 0.9;
        ap(r, { cx: v.xe, cy: b.liq.surface(v.xe, t), rx: 6 + 34 * D.borne(f, 0, 1), ry: 2 + 7 * D.borne(f, 0, 1) }); op(r, f > 0 && f < 1 ? (1 - f) * 0.8 : 0);
      });
      { const r = RING[NVOIS], f = (t - tF) / 0.9; ap(r, { cx: 446, cy: b.liq.surface(446, t), rx: 6 + 40 * D.borne(f, 0, 1), ry: 2 + 8 * D.borne(f, 0, 1) }); op(r, f > 0 && f < 1 ? (1 - f) * 0.8 : 0); }
      // la vapeur de détente : naît à la surface, remonte, sort par le haut, part vers le compresseur HP
      VERTS.forEach(m => {
        const a = t - m.tb, u = a / 6.4;
        if (a < 0 || u >= 1) { m.maj(-60, -60, 1, 0); op(m.ring, 0); return; }
        const [x0, y0] = m.v ? posVois(m.v, m.tb) : [m.x0, b.liq.surface(m.x0, m.tb) - 14];
        const [px, py] = suivre([[x0, y0], [D.lerp(x0, 480, 0.55), 340], [480, 250], [480, 176], [930, 176]], u);
        m.maj(px, py, D.lerp(0.4, 1, D.borne(a / 0.4, 0, 1)) * D.lerp(1, 0.68, rampe(u, 0.3, 0.08)), D.fenetre(u, 0, 1, 0.05) * D.borne(a / 0.25, 0, 1));
        ap(m.ring, { cx: x0, cy: y0, r: 4 + 24 * D.borne(a / 0.5, 0, 1) }); op(m.ring, a < 0.5 ? (1 - a / 0.5) * 0.9 : 0);
      });
      // les étiquettes, les panneaux, les pastilles
      op(eHP, rampe(t, A(2, 0.0)));
      [eFlot, tFlot].forEach(e => op(e, D.fenetre(t, A(2, 0.1), A(2, 0.9), 0.5)));
      ap(tFlot, { x2: bx - 6, y2: by + 28 }); op(eBP, rampe(t, T[4], 0.6));
      op(pHI, D.fenetre(t, A(2, 0.3), T[3] + 1.2, 0.4));
      op(FLECHE, D.fenetre(t, A(5, 0.05), E[5], 0.5) * (0.75 + 0.25 * Math.sin(t * 5))); op(tete, rampe(t, A(5, 0.05), 0.5));
      op(eVHP, rampe(t, A(5, 0.3), 0.5));
      op(pEvap, D.fenetre(t, A(5, 0.5), E[5] + 0.2, 0.4)); op(pBP, D.fenetre(t, A(5, 0.7), E[5] + 0.2, 0.4));
      op(aDiag, rampe(t, T[6], 0.5)); aDiag.fleche.setAttribute("transform", "translate(" + (4 * Math.sin(t * 4)).toFixed(1) + " 0)");
      const carte = D.courbe([[0, 21.4], [tB, 22], [tD, 22.3], [tE, 24], [tF, 25]], t);
      return { carte: carte, temp: temp, etat: "liquide", humeur: humeur };
    };
  };

  /* ---------- 9 · le liquide refroidi, puis la deuxième détente ----------
     La bouteille intermédiaire (dessin commun 2), son liquide qui se refroidit (thermomètre de +35 °C à −5 °C), la
     grosse bulle du tube plongeur, la sortie par le bas, le détendeur (peu de bulles), la bouteille BP (petite cuve
     à gauche), puis deux barres de vapeur (un quart / un dixième). */
  S.liquide = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const FR = D.couleur(0.22, false), FBP = D.couleur(0.04, false), VAPEUR = D.couleur(0.22, true), NVBP = 0.55;
    // la bouteille BP (petite cuve à gauche) : intérieur x 44 → 186, y 654 → 726
    const bp = D.cuve(g, { x: 30, y: 640, l: 170, h: 100 });
    const vapBP = D.el("g", {}, bp.dedans), fondBP = D.el("g", {}, bp.dedans);
    const liqBP = D.liquide(bp.dedans, { x0: bp.x0, x1: bp.x1, yh: bp.yh, yb: bp.yb, niveau: () => NVBP, couleur: () => FBP, pas: 12 });
    const bullBP = D.bulles(bp.dedans, 4, 61, false);
    const VBP = [[84, 674], [128, 668], [160, 676]].map(([x, y], i) => ({ x: x, y: y, ph: i * 2, maj: mol(vapBP, D.couleur(0.04, true)) }));
    // la bouteille intermédiaire (dessin commun 2)
    const b = bouteille(g, { entree: 330, droite: 700, vapeurFin: 700, sortie: 190 });
    const VP = [[430, 372], [468, 430], [412, 452], [492, 346], [440, 330]].map(([x, y], i) => ({ x: x, y: y, ph: i * 1.7, maj: mol(b.vap, VAPEUR) }));
    // le tuyau de sortie : froid très bas à gauche du détendeur, intermédiaire à droite
    fluide(g, [182, 678, 80, 24], FBP, 0.85); fluide(g, [358, 678, 66, 24], FR, 0.85);
    const fluxG = reflets(g, { x0: 186, x1: 262, y0: 678, y1: 702, nb: 3, graine: 6 }), fluxD = reflets(g, { x0: 358, x1: 424, y0: 678, y1: 702, nb: 3, graine: 8 });
    rect(g, 258, 634, 104, 86, { rx: 14, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 });
    D.image(g, "detendeur", 264.4, 639.6, 96, 72);
    etiq(g, 310, 752, "détendeur", { "text-anchor": "middle" });
    const eBP = etiq(g, 30, 628, "bouteille BP");
    // les bulles autour d'elle (k1), la grosse bulle du tube plongeur (k2)
    const HX = 412, HY = 600;
    const bull = D.bulles(b.devant, 7, 17, false);
    const gc = D.el("g", {}, b.devant), HEAT = [0, 1, 2, 3, 4].map(() => D.chaleur(gc));
    const GROS = [0, 1, 2].map(() => ({ c: D.el("circle", { fill: "#fff", "fill-opacity": 0.4, stroke: "#fff", "stroke-width": 4 }, b.devant), m: [0, 1, 2].map(() => mol(b.devant, D.couleur(0.45, true))) }));
    // un thermomètre : de +35 °C à −5 °C
    const th = thermo(g, 140, 346, 520);
    const yHaut = 392, yBas = 500;
    const reperes = D.el("g", {}, g);
    [yHaut, yBas].forEach(y => D.el("line", { x1: 164, y1: y, x2: 182, y2: y, stroke: "#4d5866", "stroke-width": 4, "stroke-linecap": "round" }, reperes));
    const eT = etiq(g, 196, yHaut + 10, "+35 °C", { "font-size": 30 }), eT2 = etiq(g, 196, yBas + 10, "−5 °C", { "font-size": 30 });
    const eTemp = etiq(g, 140, 328, "ma température", { "text-anchor": "middle", "font-size": 28 });
    const eTube = etiq(g, 632, 672, "tube plongeur"), tTube = D.trait(g, 626, 662, 552, 652, GRIS);
    const pDeux = pastilles(g, 800, 380, ["la bouteille", "sert deux fois"], BLEU, 30);
    const eBulle = etiq(g, 348, 588, "très peu", { "text-anchor": "end", "font-size": 28 }), eBulle2 = etiq(g, 348, 622, "de bulles", { "text-anchor": "end", "font-size": 28 });
    // les deux barres de vapeur
    const barres = D.el("g", {}, g), VBAR = [];
    const barre = (y, titre, legende, part) => {
      etiq(barres, 672, y - 12, titre, { "font-size": 30 });
      rect(barres, 672, y, 280, 40, { rx: 8, fill: FR, "fill-opacity": 0.82, stroke: "#4d5866", "stroke-width": 3 });
      const v = rect(barres, 672 + 280 * (1 - part), y, 280 * part, 40, { rx: 8, fill: "#e8f1fa", stroke: "#4d5866", "stroke-width": 3 });
      etiq(barres, 672, y + 76, legende, { "font-size": 30, fill: ENCRE });
      VBAR.push({ v: v, part: part });
    };
    barre(400, "un seul étage", "un quart de vapeur", 0.25); barre(560, "deux étages", "un dixième de vapeur", 0.1);
    const aDiag = versDiagramme(g, ["sur le diagramme :", "loin vers la gauche"], 470);
    const pKilo = pastilles(g, 800, 700, ["chaque kilo fera", "plus de froid"], VERT, 30);
    const dessus = D.el("g", {}, g), mila = D.heroine(dessus, { r: 30 });
    // les bulles du détendeur : très peu (k4)
    const BV = [0, 1, 2].map(() => D.el("circle", { fill: "#fff", "fill-opacity": 0.45, stroke: "#fff", "stroke-width": 2.5 }, g));

    return function (t) {
      const lv = NIV; b.niveau(lv); b.liq.maj(t); liqBP.maj(t);
      // l'héroïne : dans la nappe, puis par le bas, le détendeur, la bouteille BP
      const tb = A(3, 0.28), tc = A(3, 0.4), td = A(3, 0.55), te = A(3, 0.72), tf = A(3, 0.85), tg = E[3];
      const tempE = D.courbe([[0, 0.5], [T[1] + 0.3, 0.5], [E[1] - 0.4, 0.22], [td, 0.22], [tf, 0.04]], t, true);
      let x, y, s, ec = 0, humeur = "sourire";
      if (t < tb) { x = HX + 8 * Math.sin(t * 0.5); y = HY + 6 * Math.sin(t * 0.8); s = 0.8; humeur = t > T[1] && t < E[1] ? "chaud" : "sourire"; }
      else {
        x = D.courbe([[tb, HX], [tc, 420], [td, 376], [te, 262], [tf, 214], [tg, 120]], t, true);
        y = D.courbe([[tb, HY], [tc, 690], [tf, 690], [tg, 690]], t, true);
        s = D.courbe([[tb, 0.8], [tc, 0.45], [te, 0.4], [tf, 0.45], [tg, 0.65]], t, true);
        ec = 0.5 * D.fenetre(t, td + 0.1, te + 0.1, 0.25);
        humeur = t < te + 0.2 ? "surprise" : "froid";
        if (t >= tg) { x = 120 + 14 * Math.sin(t * 0.6); y = liqBP.surface(x, t) - 6; s = 0.65; humeur = "sourire"; }
      }
      plan(mila, x > 420 ? b.fond : x > 192 ? dessus : fondBP);
      mila({ x: x, y: y, s: s, t: t, temp: tempE, etat: "liquide", humeur: humeur, ecrase: ec, regard: [1, 0] });
      // la vapeur au repos
      VP.forEach(m => m.maj(m.x + Math.sin(t * 0.7 + m.ph) * 9, Math.min(m.y + Math.cos(t * 0.6 + m.ph) * 8, lv - 30), 1, 0.9));
      VBP.forEach(m => m.maj(m.x + Math.sin(t * 0.8 + m.ph) * 8, m.y + Math.cos(t * 0.6 + m.ph) * 4, 0.8, 0.9));
      // k1 : petites bulles autour d'elle, flèches de chaleur d'elle vers les bulles ; le thermomètre descend
      const v1 = D.fenetre(t, T[1] + 0.2, E[1] + 0.8, 0.6), hx = tb > t ? x : HX, hy = tb > t ? y : HY;
      bull(t, (q, bb) => { const bx = hx - 34 + q * 92; return [bx, hy + 22 + 14 * Math.sin(q * 9), b.liq.surface(bx, t) + 4, v1, "#fff"]; });
      HEAT.forEach((h, i) => {
        const deg = [-120, -85, -50, -15, 25][i], phi = deg * Math.PI / 180, f = D.frac(t * 0.8 + i * 0.2);
        h(hx + Math.cos(phi) * 70, hy + Math.sin(phi) * 70, deg - 90, v1 * D.fenetre(f, 0, 1, 0.3) * 0.95);
      });
      const niv = D.borne((tempE - 0.22) / 0.28, 0, 1);
      const yMerc = D.lerp(yBas, yHaut, niv), col = niv > 0.5 ? mix([236, 150, 60], [214, 64, 43], (niv - 0.5) * 2) : mix([47, 111, 184], [236, 150, 60], niv * 2);
      th.maj((520 - yMerc) / (520 - 346 - 8), col);
      [th.g, reperes, eT, eT2, eTemp].forEach(e => op(e, rampe(t, T[1] - 0.2, 0.6) * (1 - rampe(t, T[3] + 1.2, 0.8))));
      // k2 : la grosse bulle de vapeur du tube plongeur réapparaît (même bain)
      GROS.forEach((o, i) => {
        const per = 2.3, a = t - (A(2, 0.1) + i * 1.5), f = D.borne(a / per, 0, 1), on = a >= 0 && a < per && t < E[2] + 0.4;
        const r = f < 0.3 ? D.lerp(5, 28, f / 0.3) : 28 - 4 * D.borne((f - 0.3) / 0.7, 0, 1), yy = f < 0.3 ? 654 : D.lerp(654, b.liq.surface(530, t) + 4, D.lisse((f - 0.3) / 0.7));
        const dx = f > 0.3 ? -44 * D.lisse((f - 0.3) / 0.2) + 5 * Math.sin(f * 9) : 0;
        ap(o.c, { cx: 530 + dx, cy: yy, r: r }); op(o.c, on ? D.fenetre(f, 0, 1, 0.08) : 0);
        o.m.forEach((m, j) => m(530 + dx + (j - 1) * 11, yy + (j % 2 ? 6 : -6), 0.55 * D.borne(r / 28, 0, 1), on ? 0.9 * D.fenetre(f, 0, 1, 0.08) : 0));
      });
      [eTube, tTube].forEach(e => op(e, D.fenetre(t, A(2, 0.0), E[2], 0.4)));
      op(pDeux, D.fenetre(t, A(2, 0.45), E[2] + 1.2, 0.4));
      // le tuyau de sortie, le détendeur
      const aval = D.fenetre(t, tc, E[5], 0.6);
      fluxG(-40 * t, aval); fluxD(-40 * t, aval);
      BV.forEach((e, i) => {
        const per = 2.4, a = t - (A(4, 0.15) + i * 0.9), f = D.borne(a / per, 0, 1), on = a >= 0 && a < per && t < E[4] + 0.6;
        ap(e, { cx: D.lerp(256, 206, f), cy: 690 + (i - 1) * 4, r: D.lerp(3, 6, f) }); op(e, on ? D.fenetre(f, 0, 1, 0.15) : 0);
      });
      bullBP(t, (q, bb) => [100 + q * 60, 712, liqBP.surface(100 + q * 60, t) + 3, D.fenetre(t, A(4, 0.3), E[4] + 1.5, 0.5) * (bb.p > 0.7 ? 1 : 0), "#fff"]);
      [eBulle, eBulle2].forEach(e => op(e, D.fenetre(t, A(4, 0.1), E[4] + 0.2, 0.4)));
      op(eBP, rampe(t, tf - 0.5, 0.6));
      // k5 : deux barres de vapeur proportionnées ; k6 : la flèche vers le diagramme
      op(barres, D.fenetre(t, T[5] + 0.3, T[6] + 0.1, 0.5));
      VBAR.forEach((o, i) => { const f = rampe(t, A(5, 0.2 + 0.3 * i), 0.9), w = 280 * o.part * f; ap(o.v, { x: 672 + 280 - w, width: Math.max(0.01, w) }); });
      op(aDiag, rampe(t, T[6], 0.5)); aDiag.fleche.setAttribute("transform", "translate(" + (4 * Math.sin(t * 4)).toFixed(1) + " 0)");
      op(pKilo, rampe(t, A(6, 0.5), 0.5));
      return { carte: D.courbe([[0, 25], [tb, 25.4], [tc, 26.4], [te, 28], [tf, 29.5], [tg, 30.6]], t), temp: tempE, etat: "liquide", humeur: humeur };
    };
  };

  /* ---------- petits dessins du tableau « gain » et du tableau de bord ---------- */
  const acier = { fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 };
  /* flèche pleine vers la droite : fût d'épaisseur sw, tête proportionnée */
  function fleche(parent, x1, x2, y, sw, coul) {
    const h = sw * 1.5 + 12, l = sw * 1.2 + 14;
    return poly(parent, [[x1, y - sw / 2], [x2 - l, y - sw / 2], [x2 - l, y - h / 2], [x2, y], [x2 - l, y + h / 2], [x2 - l, y + sw / 2], [x1, y + sw / 2]], { fill: coul, stroke: "#1b2733", "stroke-width": 2, "stroke-linejoin": "round" });
  }
  /* flèche pleine vers le haut (la montée en pression) */
  function flecheHaut(parent, x, yb, yh, coul) {
    return poly(parent, [[x - 5, yb], [x - 5, yh + 16], [x - 13, yh + 16], [x, yh], [x + 13, yh + 16], [x + 5, yh + 16], [x + 5, yb]], { fill: coul, stroke: "#8a2f10", "stroke-width": 2, "stroke-linejoin": "round" });
  }
  /* goutte d'huile avec un visage : souriante (ambre) ou triste (brûlée, brune) */
  function goutte(parent, triste) {
    const g = D.el("g", {}, parent);
    D.el("path", { d: "M 0 -34 C 8 -18 26 -4 26 12 A 26 26 0 0 1 -26 12 C -26 -4 -8 -18 0 -34 Z", fill: triste ? "#5a3b0e" : D.HUILE, stroke: triste ? "#2e1d05" : "#7a5410", "stroke-width": 3 }, g);
    D.el("ellipse", { cx: -10, cy: 0, rx: 5, ry: 9, fill: "#fff", opacity: 0.5, transform: "rotate(20 -10 0)" }, g);
    [-9, 9].forEach(x => D.el("circle", { cx: x, cy: 8, r: 3.4, fill: triste ? "#fff" : ENCRE }, g));
    D.el("path", { d: triste ? "M -9 25 Q 0 17 9 25" : "M -9 19 Q 0 29 9 19", fill: "none", stroke: triste ? "#fff" : ENCRE, "stroke-width": 3, "stroke-linecap": "round" }, g);
    return g;
  }
  /* clapet de refoulement en coupe : corps d'acier, passage, plaque articulée à gauche ; maj(angle) l'ouvre */
  function clapet(parent) {
    const g = D.el("g", {}, parent);
    rect(g, -24, 10, 48, 32, Object.assign({ rx: 4 }, acier)); rect(g, -8, 10, 16, 32, { fill: CLAIR });
    const plaque = D.el("g", {}, g);
    rect(plaque, -22, 0, 44, 8, Object.assign({ rx: 2 }, acier));
    return { g: g, maj: ang => plaque.setAttribute("transform", "rotate(" + (-ang).toFixed(1) + " -22 4)") };
  }
  /* un petit compresseur (le symbole) */
  const compr = (p, nom, x, y, l) => D.image(p, nom, x, y, l, l * 0.8);

  /* ---------- 10 · le gain : un tableau « un seul étage / deux étages » qui se remplit phrase par phrase ----------
     Colonne de gauche : un seul étage ; colonne de droite : deux étages. Quatre lignes : la marche, le refoulement,
     l'aspiration, le détendeur. L'héroïne descend le long de la colonne des titres de ligne. */
  S.gain = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const FBP = D.couleur(0.04, false), FR = D.couleur(0.22, false);
    const CX = [190, 580], CW = 372, RY = [216, 340, 464, 588], RH = 116;
    const COUL = [ROUGE, VERT], TIT = ["un seul étage", "deux étages"], LIG = ["la marche", "refoulement", "aspiration", "détendeur"];
    CX.forEach((x, i) => {
      rect(g, x, 158, CW, 48, { rx: 24, fill: COUL[i] });
      D.texte(g, x + CW / 2, 192, TIT[i], { "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#fff", "font-family": SANS });
    });
    RY.forEach((y, r) => {
      etiq(g, 30, y + 38, LIG[r], { "font-size": 28, fill: BLEU, "font-weight": 700 });
      CX.forEach(x => rect(g, x, y, CW, RH, { rx: 14, fill: "rgba(27,58,99,.04)", stroke: "rgba(27,58,99,.2)", "stroke-width": 2 }));
    });
    const cellule = () => D.el("g", { opacity: 0 }, g);
    const x0 = CX[0], x1 = CX[1];
    // ligne 1 : la marche (une grande / deux petites, même hauteur totale)
    const m1 = cellule(), m2 = cellule();
    const plat = (p, x, y, w) => rect(p, x, y, w, 14, Object.assign({ rx: 3 }, acier));
    const mont = (p, x, y, h) => rect(p, x, y, 14, h, { fill: "url(#vm-acier-h)", stroke: "#5d6b7a", "stroke-width": 2 });
    let ry = RY[0];
    plat(m1, x0 + 14, ry + 88, 130); mont(m1, x0 + 130, ry + 26, 76); plat(m1, x0 + 130, ry + 26, 222);
    flecheHaut(m1, x0 + 88, ry + 82, ry + 30, D.ORANGE);
    plat(m2, x1 + 14, ry + 88, 100); mont(m2, x1 + 100, ry + 57, 45); plat(m2, x1 + 100, ry + 57, 130); mont(m2, x1 + 216, ry + 26, 45); plat(m2, x1 + 216, ry + 26, 136);
    const bt = D.cuve(m2, { x: x1 + 120, y: ry + 3, l: 34, h: 54, vertical: true });
    rect(bt.dedans, bt.x0, bt.yb - 22, bt.x1 - bt.x0, 30, { fill: FR, opacity: 0.85 });
    flecheHaut(m2, x1 + 64, ry + 82, ry + 62, D.ORANGE); flecheHaut(m2, x1 + 196, ry + 50, ry + 30, D.ORANGE);
    // ligne 2 : le refoulement (thermomètres, puis goutte d'huile et clapet)
    ry = RY[1];
    const r1 = cellule(), r2 = cellule(), r1b = cellule(), r2b = cellule();
    const th1 = thermo(r1, x0 + 46, ry + 8, ry + 66), th2a = thermo(r2, x1 + 46, ry + 8, ry + 66), th2b = thermo(r2, x1 + 108, ry + 8, ry + 66);
    const gt1 = goutte(r1b, true), gt2 = goutte(r2b, false), cl1 = clapet(r1b), cl2 = clapet(r2b), fumee = D.el("g", {}, r1b);
    gt1.setAttribute("transform", "translate(" + (x0 + 168) + " " + (ry + 60) + ") scale(0.78)"); gt2.setAttribute("transform", "translate(" + (x1 + 210) + " " + (ry + 60) + ") scale(0.78)");
    cl1.g.setAttribute("transform", "translate(" + (x0 + 292) + " " + (ry + 40) + ")"); cl2.g.setAttribute("transform", "translate(" + (x1 + 310) + " " + (ry + 40) + ")");
    const FUM = [0, 1, 2].map(() => D.el("circle", { fill: "#8794a3" }, fumee));
    // ligne 3 : l'aspiration (flèches minces à gauche, épaisses à droite)
    ry = RY[2];
    const a1 = cellule(), a2 = cellule();
    fleche(a1, x0 + 20, x0 + 206, ry + 44, 5, "#5d6b7a"); fleche(a1, x0 + 20, x0 + 206, ry + 74, 5, "#5d6b7a"); compr(a1, "compresseurBP", x0 + 230, ry + 18, 112);
    fleche(a2, x1 + 14, x1 + 108, ry + 58, 18, "#5d6b7a"); compr(a2, "compresseurBP", x1 + 112, ry + 28, 92);
    fleche(a2, x1 + 214, x1 + 270, ry + 58, 18, "#5d6b7a"); compr(a2, "compresseurHP", x1 + 276, ry + 32, 78);
    // ligne 4 : le détendeur (beaucoup de bulles / peu de bulles)
    ry = RY[3];
    const d1 = cellule(), d2 = cellule(), BUL = [];
    [[x0, d1, 9], [x1, d2, 2]].forEach(([cx, p, n]) => {
      rect(p, cx + 14, ry + 46, 106, 28, Object.assign({ rx: 3 }, acier)); rect(p, cx + 14, ry + 52, 106, 16, { fill: FBP, opacity: 0.85 });
      rect(p, cx + 196, ry + 22, 160, 72, Object.assign({ rx: 14 }, acier)); rect(p, cx + 204, ry + 30, 144, 56, { rx: 8, fill: FBP, opacity: 0.8 });
      rect(p, cx + 112, ry + 18, 84, 80, { rx: 12, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 });
      D.image(p, "detendeur", cx + 120, ry + 22, 72, 54);
      for (let i = 0; i < n; i++) BUL.push({ cx: cx, i: i, e: D.el("circle", { fill: "#fff", "fill-opacity": 0.5, stroke: "#fff", "stroke-width": 2.5 }, p) });
    });
    const frame = rect(g, 574, 150, 384, 560, { rx: 20, fill: "none", stroke: VERT, "stroke-width": 7, opacity: 0 });
    const pEner = pastilles(g, 575, 744, ["plus de froid, même énergie"], BLEU, 30), pTres = pastilles(g, 771, 748, ["très froid → deux étages"], VERT, 30);
    const mila = D.heroine(g, { r: 30 });

    return function (t) {
      // les cellules s'allument à leur phrase
      op(m1, rampe(t, A(1, 0.1))); op(r1, rampe(t, A(1, 0.45))); op(m2, rampe(t, A(2, 0.1)));
      op(r2, rampe(t, A(3, 0.08))); op(r1b, rampe(t, A(3, 0.45))); op(r2b, rampe(t, A(3, 0.45)));
      op(a1, rampe(t, A(4, 0.08))); op(a2, rampe(t, A(4, 0.45)));
      op(d1, rampe(t, A(5, 0.08))); op(d2, rampe(t, A(5, 0.4)));
      // les thermomètres montent
      th1.maj(0.95 * rampe(t, A(1, 0.5), 1.4), "#d6402b");
      th2a.maj(0.5 * rampe(t, A(3, 0.15), 1.4), "#e8913a"); th2b.maj(0.66 * rampe(t, A(3, 0.3), 1.4), "#e0662c");
      // le clapet brûlant fume et claque ; l'autre travaille tranquille
      cl1.maj(26 + 10 * Math.sin(t * 9)); cl2.maj(8 + 4 * Math.sin(t * 2.2));
      FUM.forEach((e, i) => { const f = D.frac(t * 0.6 + i / 3); ap(e, { cx: x0 + 292 + 10 * Math.sin(f * 7 + i), cy: RY[1] + 34 - f * 34, r: 5 + 9 * f }); op(e, D.fenetre(f, 0, 1, 0.3) * 0.7); });
      // les bulles du détendeur
      BUL.forEach(o => {
        const p = (o.i * 0.37 + o.i * o.i * 0.011) % 1, f = D.frac(p + t * 0.2);
        ap(o.e, { cx: o.cx + 214 + 124 * f, cy: RY[3] + 58 + 17 * Math.sin(o.i * 2.7 + t * 1.8), r: 4 + (o.i % 3) * 1.6 });
      });
      op(frame, rampe(t, A(6, 0.1), 0.6));
      op(pEner, D.fenetre(t, A(5, 0.55), T[6] + 0.3, 0.4)); op(pTres, rampe(t, A(6, 0.35), 0.5));
      // l'héroïne : au centre, puis dans la colonne des titres de ligne, à la hauteur de la phrase
      const k = [1, 2, 3, 4, 5, 6].reduce((a, i) => t >= T[i] - 0.1 ? i : a, 0);
      const ty = D.courbe([[0, 450], [T[1] - 0.6, 450], [T[1] + 0.3, RY[0] + 84], [T[3] - 0.5, RY[0] + 84], [T[3] + 0.3, RY[1] + 84], [T[4] - 0.5, RY[1] + 84], [T[4] + 0.3, RY[2] + 84], [T[5] - 0.5, RY[2] + 84], [T[5] + 0.3, RY[3] + 84]], t);
      const px = D.courbe([[0, 575], [T[1] - 0.6, 575], [T[1] + 0.3, 106]], t), ps = D.courbe([[0, 1.5], [T[1] - 0.6, 1.5], [T[1] + 0.3, 0.6]], t);
      const humeur = k === 1 ? "chaud" : "sourire", temp = k === 1 ? 0.7 : 0.22;
      mila({ x: px, y: ty + 3 * Math.sin(t * 1.6), s: ps, t: t, temp: temp, etat: "liquide", humeur: humeur, regard: [1, 0] });
      return { temp: temp, etat: "liquide", humeur: humeur };
    };
  };

  /* ---------- 11 · ce que l'on surveille : le tableau de bord du technicien ----------
     Cinq vignettes qui s'allument une par une (phrases 1 à 5) : le niveau et la sécurité de niveau haut, la pression
     intermédiaire, les deux températures de refoulement, l'ordre de marche, l'huile au fond. La sixième case, en bas à
     droite, est la place de l'héroïne (casquette et loupe du technicien). */
  S.surveillance = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const FR = D.couleur(0.22, false);
    const CAR = [[28, 156], [500, 156], [28, 352], [500, 352], [28, 548]], W = 462, H = 188, SLOT = [731, 642];
    const cartes = CAR.map(([x, y]) => rect(g, x, y, W, H, { rx: 18, fill: "#fffdf8", stroke: "rgba(27,58,99,.25)", "stroke-width": 3 }));
    const ct = CAR.map(() => D.el("g", { opacity: 0 }, g));
    const titre = (p, x, y, s) => etiq(p, x, y, s, { "font-size": 32, fill: BLEU, "font-weight": 700, "font-family": TITRE });

    // ---- 1 · la bouteille intermédiaire : son niveau et la sécurité de niveau haut
    let [X, Y] = CAR[0];
    const cu = D.cuve(ct[0], { x: X + 22, y: Y + 6, l: 84, h: 126, vertical: true });
    let nv1 = 0.3;
    const liq1 = D.liquide(cu.dedans, { x0: cu.x0, x1: cu.x1, yh: cu.yh, yb: cu.yb, niveau: () => nv1, couleur: () => FR, pas: 8, opacite: 0.75 });
    rect(ct[0], X + 102, Y + 40, 8, 14, { fill: "url(#vm-acier-h)" });
    rect(ct[0], X + 108, Y + 26, 46, 40, Object.assign({ rx: 8 }, acier));
    const lampe = D.el("circle", { cx: X + 131, cy: Y + 46, r: 8, fill: "#2ea66a", stroke: "#1b2733", "stroke-width": 2 }, ct[0]);
    const eclair = D.el("g", {}, ct[0]);
    poly(eclair, [[0, -32], [-15, 4], [-2, 4], [-11, 34], [17, -9], [3, -9], [13, -32]].map(p => [p[0] + X + 176, p[1] + Y + 62]), { fill: ROUGE, stroke: "#6e1d14", "stroke-width": 2.5, "stroke-linejoin": "round" });
    titre(ct[0], X + 205, Y + 44, "le niveau"); etiq(ct[0], X + 205, Y + 88, "sécurité de"); etiq(ct[0], X + 205, Y + 120, "niveau haut");
    const pArret = pastilles(ct[0], X + 240, Y + 172, ["arrêt des compresseurs"], ROUGE, 28);
    const yNorm = Y + 98, yHaut = Y + 40, tMonte = A(1, 0.25), tAlerte = tMonte + 1.9;

    // ---- 2 · le manomètre de la pression intermédiaire, le compresseur HP barré
    [X, Y] = CAR[1];
    const cx2 = X + 86, cy2 = Y + 98, R2 = 64, pt = (v, r) => { const a = (135 + 270 * v) * Math.PI / 180; return [cx2 + r * Math.cos(a), cy2 + r * Math.sin(a)]; };
    D.el("circle", { cx: cx2, cy: cy2, r: R2 + 6, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, ct[1]);
    D.el("circle", { cx: cx2, cy: cy2, r: R2, fill: "#fff", stroke: "#4d5866", "stroke-width": 3 }, ct[1]);
    const arc = (v0, v1, coul) => { const [a, b] = pt(v0, 48), [d, e] = pt(v1, 48); D.el("path", { d: "M " + a.toFixed(1) + " " + b.toFixed(1) + " A 48 48 0 " + ((v1 - v0) * 270 > 180 ? 1 : 0) + " 1 " + d.toFixed(1) + " " + e.toFixed(1), fill: "none", stroke: coul, "stroke-width": 9 }, ct[1]); };
    arc(0.04, 0.58, VERT); arc(0.7, 0.96, ROUGE);
    for (let i = 0; i <= 10; i++) { const [a, b] = pt(i / 10, 54), [d, e] = pt(i / 10, 61); D.el("line", { x1: a, y1: b, x2: d, y2: e, stroke: "#4d5866", "stroke-width": 3 }, ct[1]); }
    const aig = D.el("line", { x1: cx2, y1: cy2, stroke: "#1b2733", "stroke-width": 6, "stroke-linecap": "round" }, ct[1]);
    D.el("circle", { cx: cx2, cy: cy2, r: 8, fill: "#1b2733" }, ct[1]);
    titre(ct[1], X + 176, Y + 44, "pression"); titre(ct[1], X + 176, Y + 82, "intermédiaire");
    compr(ct[1], "compresseurHP", X + 184, Y + 104, 62);
    const croix = D.el("g", {}, ct[1]);
    [[176, 98, 254, 158], [176, 158, 254, 98]].forEach(([a, b, d, e]) => D.el("line", { x1: X + a, y1: Y + b, x2: X + d, y2: Y + e, stroke: ROUGE, "stroke-width": 8, "stroke-linecap": "round" }, croix));
    etiq(ct[1], X + 262, Y + 146, "compresseur HP", { "font-size": 28 });

    // ---- 3 · les deux thermomètres de refoulement
    [X, Y] = CAR[2];
    const TH = [["refoulement BP", Y + 46, 0.45, "#e8913a"], ["refoulement HP", Y + 122, 0.62, "#d6402b"]].map(([nom, y, niv, coul]) => {
      etiq(ct[2], X + 22, y, nom, { "font-size": 30 });
      D.el("circle", { cx: X + 44, cy: y + 28, r: 21, fill: "#fff", stroke: "#4d5866", "stroke-width": 4 }, ct[2]);
      rect(ct[2], X + 44, y + 14, 390, 28, { rx: 14, fill: "#fff", stroke: "#4d5866", "stroke-width": 4 });
      rect(ct[2], X + 36, y + 10, 22, 36, { fill: "#fff" });
      D.el("circle", { cx: X + 44, cy: y + 28, r: 15, fill: coul }, ct[2]);
      return { barre: rect(ct[2], X + 44, y + 20, 0, 16, { fill: coul }), niv: niv, w0: 360 };
    });

    // ---- 4 · l'ordre de marche : deux boutons
    [X, Y] = CAR[3];
    titre(ct[3], X + 22, Y + 44, "l'ordre de marche");
    const bouton = (y, fond, texte) => {
      const b = D.el("g", {}, ct[3]);
      rect(b, X + 22, y, 418, 50, { rx: 25, fill: fond, stroke: "#1b2733", "stroke-width": 2 });
      D.texte(b, X + 231, y + 35, texte, { "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#fff", "font-family": SANS });
      return b;
    };
    const bDem = bouton(Y + 62, VERT, "démarrage : 1. HP · 2. BP"), bArr = bouton(Y + 124, ROUGE, "arrêt : 1. BP · 2. HP");

    // ---- 5 · le fond de la bouteille : l'huile, et le pot à huile dessous
    [X, Y] = CAR[4];
    const dents = []; for (let i = 0, x = X + 8; x <= X + 172; i++, x += 12) dents.push((i ? "L " : "M ") + x + " " + (Y + 12 + (i % 2 ? 5 : -5)));
    D.el("path", { d: dents.join(" ") + " L " + (X + 172) + " " + (Y + 136) + " L " + (X + 8) + " " + (Y + 136) + " Z" }, D.el("clipPath", { id: "vbc-coupe-s" }, ct[4]));
    const fond5 = D.cuve(ct[4], { x: X + 22, y: Y - 20, l: 130, h: 130, vertical: true });
    fond5.g.setAttribute("clip-path", "url(#vbc-coupe-s)");
    const liq5 = D.liquide(fond5.dedans, { x0: fond5.x0, x1: fond5.x1, yh: fond5.yh, yb: fond5.yb, niveau: () => 0.7, couleur: () => FR, pas: 10, opacite: 0.75 });
    const huile5 = D.el("path", { fill: D.HUILE, opacity: 0.95 }, fond5.dedans);
    D.el("path", { d: dents.join(" "), fill: "none", stroke: "#4d5866", "stroke-width": 4, "stroke-linejoin": "round" }, ct[4]);
    const pot = D.cuve(ct[4], { x: X + 52, y: Y + 128, l: 70, h: 52, vertical: true });
    rect(pot.dedans, pot.x0, pot.yb - 28, pot.x1 - pot.x0, 34, { fill: D.HUILE, opacity: 0.95 });
    rect(ct[4], X + 77, Y + 106, 20, 26, { fill: "url(#vm-acier-h)" }); rect(ct[4], X + 82, Y + 106, 10, 26, { fill: D.HUILE });
    titre(ct[4], X + 176, Y + 44, "l'huile au fond");
    etiq(ct[4], X + 176, Y + 98, "couche d'huile", { fill: "#7a5410", "font-weight": 700 }); D.trait(ct[4], X + 170, Y + 90, X + 132, Y + 84, "#7a5410");
    etiq(ct[4], X + 176, Y + 162, "pot à huile"); D.trait(ct[4], X + 170, Y + 154, X + 126, Y + 156, GRIS);

    // ---- l'héroïne du technicien : casquette et loupe
    const mila = D.heroine(g, { r: 30 }), tenue = D.el("g", {}, g);
    D.el("path", { d: "M -27 -23 C -27 -54 27 -54 27 -23 Z", fill: "#e8914a", stroke: "#8a4a14", "stroke-width": 3 }, tenue);
    D.el("rect", { x: -5, y: -50, width: 10, height: 26, fill: "#fff", opacity: 0.55 }, tenue);
    D.el("line", { x1: -37, y1: -22, x2: 37, y2: -22, stroke: "#8a4a14", "stroke-width": 7, "stroke-linecap": "round" }, tenue);
    D.el("line", { x1: -37, y1: -22, x2: 37, y2: -22, stroke: "#e8914a", "stroke-width": 3, "stroke-linecap": "round" }, tenue);
    const loupe = D.el("g", {}, g);
    D.el("line", { x1: 54, y1: 20, x2: 74, y2: 42, stroke: "#4d5866", "stroke-width": 9, "stroke-linecap": "round" }, loupe);
    D.el("circle", { cx: 42, cy: 8, r: 19, fill: "rgba(255,255,255,.4)", stroke: BLEU, "stroke-width": 5 }, loupe);

    return function (t) {
      // la vignette k s'allume à la phrase k ; son cadre est orange pendant qu'on en parle
      const k = [1, 2, 3, 4, 5].reduce((a, i) => t >= T[i] - 0.1 ? i : a, 0);
      CAR.forEach(([cx, cy], i) => {
        const kk = i + 1, on = rampe(t, A(kk, 0.04), 0.5), actif = t >= T[kk] - 0.1 && t < E[kk] + 0.6;
        op(ct[i], on); op(cartes[i], 0.5 + 0.5 * on);
        cartes[i].setAttribute("stroke", actif ? D.ORANGE : "rgba(27,58,99,.25)"); cartes[i].setAttribute("stroke-width", actif ? 6 : 3);
      });
      // 1 · le niveau monte jusqu'à la sécurité de niveau haut
      const yn = D.courbe([[tMonte, yNorm], [tMonte + 2.6, yHaut]], t), alerte = t > tAlerte;
      nv1 = (cu.yb - yn) / (cu.yb - cu.yh); liq1.maj(t);
      lampe.setAttribute("fill", alerte ? "#e5302a" : "#2ea66a");
      op(eclair, alerte ? 0.45 + 0.55 * (Math.sin(t * 9) > -0.2 ? 1 : 0) : 0); op(pArret, rampe(t, tAlerte + 0.2, 0.4));
      // 2 · l'aiguille monte, le compresseur HP est barré
      const v = D.courbe([[A(2, 0.12), 0.32], [A(2, 0.12) + 3.2, 0.88]], t) + (t > A(2, 0.12) ? 0.012 * Math.sin(t * 7) : 0), th = (135 + 270 * v) * Math.PI / 180;
      ap(aig, { x2: cx2 + 50 * Math.cos(th), y2: cy2 + 50 * Math.sin(th) }); op(croix, rampe(t, A(2, 0.12) + 2.4, 0.4));
      // 3 · les deux thermomètres se remplissent
      TH.forEach((h, i) => ap(h.barre, { width: 10 + h.w0 * h.niv * rampe(t, A(3, 0.1 + 0.35 * i), 1.5) }));
      // 4 · les deux boutons
      op(bDem, rampe(t, A(4, 0.2), 0.4)); op(bArr, rampe(t, A(4, 0.55), 0.4));
      // 5 · l'huile s'accumule au fond
      const hh = D.lerp(8, 30, rampe(t, A(5, 0.15), 3)), yo = fond5.yb - hh;
      let d = "M " + fond5.x0 + " " + (fond5.yb + 2) + " L " + fond5.x0 + " " + yo.toFixed(1);
      for (let i = 0; i <= 14; i++) { const x = fond5.x0 + i * (fond5.x1 - fond5.x0) / 14; d += " L " + x.toFixed(1) + " " + (yo + 1.2 * Math.sin(x / 14 + t * 1.3)).toFixed(1); }
      huile5.setAttribute("d", d + " L " + fond5.x1 + " " + (fond5.yb + 2) + " Z"); liq5.maj(t);
      // l'héroïne : au centre, puis dans sa case ; elle regarde la vignette en cours
      const px = D.courbe([[0, 495], [T[1] - 0.8, 495], [T[1] + 0.4, SLOT[0]]], t), py = D.courbe([[0, 446], [T[1] - 0.8, 446], [T[1] + 0.4, SLOT[1]]], t), ps = D.courbe([[0, 1.9], [T[1] - 0.8, 1.9], [T[1] + 0.4, 1.2]], t);
      const [ccx, ccy] = k ? [CAR[k - 1][0] + W / 2, CAR[k - 1][1] + H / 2] : [SLOT[0], SLOT[1]], dd = Math.hypot(ccx - px, ccy - py) || 1;
      const yy = py + 3 * Math.sin(t * 1.6), humeur = k === 1 && alerte ? "surprise" : "sourire";
      mila({ x: px, y: yy, s: ps, t: t, temp: 0.22, etat: "liquide", humeur: humeur, regard: k ? [(ccx - px) / dd, (ccy - py) / dd] : [0, 0] });
      tenue.setAttribute("transform", "translate(" + px.toFixed(1) + " " + yy.toFixed(1) + ") scale(" + ps.toFixed(3) + ")");
      loupe.setAttribute("transform", "translate(" + px.toFixed(1) + " " + yy.toFixed(1) + ") scale(" + ps.toFixed(3) + ") rotate(" + (8 * Math.sin(t * 1.3)).toFixed(1) + " 30 10)");
      return { temp: 0.22, etat: "liquide", humeur: humeur };
    };
  };

  /* ---------- le résumé : l'escalier à trois paliers ----------
     La carte « en escalier » en grand (D.circuit, repère 1000 × 620 posé en x 20 → 960) : basse pression en bas,
     pression intermédiaire au milieu, haute pression en haut ; les compresseurs montent à droite, les détentes
     descendent à gauche. Trois bandes colorées marquent les paliers. Chaque étape s'allume à sa phrase (organes
     entourés d'orange, nom écrit, trace orange du trajet) ; l'héroïne fait le trajet de D.CIRCUIT_PTS. Le diagramme
     (à droite) avance avec elle : phrase 1 → 0 à 1, 2 → 1 à 2, 3 → 2 à 3, 4 → 3 à 6, 5 → 6 à 10, 6 → le tour complet. */
  S.resume = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const K = 0.9, X0 = 30, Y0 = 150, sy = y => Y0 + K * y;
    // les trois paliers, en fond
    [[0, 150, "rgba(201,69,26,.09)"], [150, 400, "rgba(30,126,84,.10)"], [400, 620, "rgba(27,58,99,.09)"]].forEach(([a, b, f]) => rect(g, 22, sy(a), 916, K * (b - a) - 4, { rx: 16, fill: f }));
    const cir = D.circuit(g, X0, Y0, 900, false);
    // la trace orange du trajet, entre les tuyaux et les symboles
    const trace = D.el("polyline", { fill: "none", stroke: D.ORANGE, "stroke-width": 9, "stroke-linejoin": "round", "stroke-linecap": "round", opacity: 0.85 });
    cir.g.insertBefore(trace, cir.g.children[8]);
    const PTS = D.CIRCUIT_PTS, NB = PTS.length - 1;
    // la bouteille intermédiaire se remplit de sa nappe, avec ses bulles, à la phrase 3 (corps du symbole : x 436 → 488, y 356 → 439)
    const nappe = D.el("g", { opacity: 0 }, g);
    rect(nappe, 439, 384, 46, 53, { fill: D.couleur(0.22, false), opacity: 0.6 });
    const bullB = D.bulles(nappe, 6, 41, false);
    const petite = D.heroine(g, { r: 30 });
    // les noms des organes (28 px et plus), écrits à leur phrase
    const NOMS = {
      evaporateur: [606, 612, "évaporateur", "middle"], pompe: [408, 626, "pompe", "middle"], bouteilleBP: [276, 640, "bouteille BP", "end"],
      compresseurBP: [765, 480, "compresseur BP", "end"], bouteille: [516, 366, "bouteille|intermédiaire", "start"], compresseurHP: [712, 265, "compresseur HP", "start"],
      condenseur: [435, 285, "condenseur", "middle"], reservoir: [255, 272, "réservoir", "middle"], flotteur: [166, 330, "flotteur", "start"], detendeur: [160, 480, "détendeur", "start"] };
    const noms = {};
    for (const k in NOMS) { const [x, y, s, a] = NOMS[k]; noms[k] = D.el("g", {}, g); s.split("|").forEach((l, i) => etiq(noms[k], x, y + 34 * i, l, { "text-anchor": a, fill: BLEU, "font-weight": 700 })); }
    const PAR_PHRASE = { 1: ["evaporateur", "pompe", "bouteilleBP"], 2: ["compresseurBP"], 3: ["bouteille"], 4: ["compresseurHP", "condenseur", "reservoir"], 5: ["flotteur", "bouteille", "detendeur", "bouteilleBP"] };
    etiq(g, 955, 195, "haute pression", { "text-anchor": "end", fill: D.ORANGE, "font-weight": 700 });
    etiq(g, 160, 386, "pression", { fill: VERT, "font-weight": 700 }); etiq(g, 160, 420, "intermédiaire", { fill: VERT, "font-weight": 700 });
    etiq(g, 34, 692, "basse pression", { fill: D.BLEU, "font-weight": 700 });
    const pDeux = pastilles(g, 300, 744, ["deux marches au lieu d'une"], D.ORANGE, 30);

    // temps → position sur le circuit (rangs de D.CIRCUIT_PTS) et sur le diagramme
    const repW = [[0, 0]], repD = [];
    const ph = [
      [1, [[T[1], 0], [A(1, 0.5), 3], [E[1], 4.2]], 0, 1], [2, [[T[2], 4.2], [A(2, 0.4), 10], [E[2], 12]], 1, 2],
      [3, [[T[3], 12], [E[3], 15]], 2, 3], [4, [[T[4], 15], [A(4, 0.5), 17.5], [E[4], 20]], 3, 6],
      [5, [[T[5], 20], [A(5, 0.2), 22.2], [A(5, 0.4), 25], [A(5, 0.55), 26.3], [A(5, 0.75), 28], [E[5], 31]], 6, 10],
      [6, [[T[6], 0], [T[6] + 0.3, 0], [E[6] - 0.3, 31]], 0, 10]];
    ph.forEach(([k, pts]) => { if (k === 6) repW.push([T[6] - 0.07, 31], [T[6] - 0.04, 0]); pts.forEach(p => repW.push(p)); });
    const tempDe = D.courbe.bind(null, [[0, 0.04], [2.5, 0.04], [7, 0.06], [9, 0.06], [10, 0.45], [12, 0.45], [13.5, 0.22], [16.5, 0.22], [17.5, 0.62], [18.5, 0.62], [19.5, 0.5], [21.5, 0.5], [22.5, 0.22], [26.5, 0.22], [28.5, 0.04], [31, 0.04]]);
    const etatDe = w => w >= 3 && w < 5.5 ? "bout" : w >= 5.5 && w < 19 ? "vapeur" : "liquide";
    return function (t) {
      const k = [1, 2, 3, 4, 5, 6].reduce((a, i) => t >= T[i] - 0.05 ? i : a, 0);
      const w = k === 0 ? 0 : D.courbe(repW, t, true), wm = ((w % NB) + NB) % NB;
      // la trace et l'héroïne
      const pts = [];
      for (let v = 0; v < w && v < NB; v = Math.floor(v + 1)) pts.push(D.circuitPoint(v));
      pts.push(D.circuitPoint(w));
      trace.setAttribute("points", k === 0 ? "" : pts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" "));
      const [px, py] = cir.ecran(...D.circuitPoint(w)), temp = tempDe(wm), etat = etatDe(wm);
      const humeur = (wm > 10.4 && wm < 12.2) || (wm > 17.2 && wm < 18.8) ? "chaud" : wm > 26.5 ? "froid" : "sourire";
      petite({ x: px, y: py, s: 0.9, t: t, temp: temp, etat: etat, humeur: humeur });
      // les organes de la phrase en cours (tous à la dernière), leurs noms
      const on = {}, vus = {};
      if (k === 6) for (const n in NOMS) on[n] = vus[n] = true;
      else for (const q in PAR_PHRASE) if (+q <= k) PAR_PHRASE[q].forEach(n => { vus[n] = true; if (+q === k) on[n] = true; });
      for (const n in NOMS) { cir.surligne(n, !!on[n]); op(noms[n], vus[n] ? 1 : 0); }
      op(pDeux, rampe(t, A(6, 0.55), 0.5)); op(nappe, rampe(t, T[3] - 0.1, 0.5)); bullB(t, q => [446 + q * 32, 434, 388, 1, "#fff"]);
      // le diagramme : la trace avance étape par étape
      const r = { temp: temp, etat: etat, humeur: humeur, calques: { pi: true } };
      if (k >= 1) {
        const [, , a, b] = ph[k - 1], p0 = T[k] + 0.3, p1 = E[k] - 0.3;
        r.diag = D.lerp(a, b, D.borne((t - p0) / (p1 - p0), 0, 1)); r.diag0 = a;
      }
      return r;
    };
  };
})();
