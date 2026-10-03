/* =====================================================================
   voyage-nh3-scenes-c.js — NH₃ : le régulateur à flotteur, le pot à huile,
   la fuite, le tour en entier
   ---------------------------------------------------------------------
   Même contrat que voyage-scenes-a.js : VOYAGE_SCENES[id](g, c) → maj(t),
   phrases 0-1 des organes = carte d'identité posée par le théâtre, coupe
   utile à partir de la phrase 2. Zones interdites : en-tête (x < 760,
   y < 140) et carte du coin (x > 1200, y < 285). Récit : donnees/voyage-nh3.js
   (l'ORDRE des phrases porte les gestes). Briques : voyage-dessin.js et
   voyage-nh3-dessin.js (D.cuve, D.HUILE, D.AIR).
   ACIER : jamais de cuivre. LIQUIDE : nappe (D.liquide) ou tube plein.
   TOUT EST FONCTION DE t : un débit qui change se mesure par son INTÉGRALE
   (intégrale() ci-dessous), jamais par t × vitesse, sinon les reflets sautent.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const TOUR = 2 * Math.PI;
  const SANS = "Calibri, Arial, sans-serif", TITRE = "Trebuchet MS, Arial, sans-serif";
  const CLAIR = "#f4f8fc", VERT = "#1e7e54", ROUGE = "#c0392b", BLEU = "#2f6fb8";
  const plan = (maj, g) => { if (maj.g.parentNode !== g) g.appendChild(maj.g); };
  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const ap = (e, a) => { for (const k in a) e.setAttribute(k, typeof a[k] === "number" ? +a[k].toFixed(1) : a[k]); };
  const rect = (p, x, y, w, h, at) => D.el("rect", Object.assign({ x: x, y: y, width: w, height: h }, at || {}), p);

  /* enceinte d'acier à angles peu arrondis (D.cuve est une gélule) : rend { dedans (découpé), x0, x1, yh, yb } */
  let nc = 0;
  function enceinte(parent, o) {
    const g = D.el("g", {}, parent), e = 14, cid = "vm-c-enc-" + (++nc);
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
  const fluide = (p, r, fill, o) => rect(p, r[0], r[1], r[2], r[3], { fill: fill, opacity: o });
  /* ∫₀ᵗ f : table calculée une fois (fonction pure de t, continue même quand le débit change) */
  function integrale(f, tmax, pas) {
    const n = Math.ceil(tmax / pas), tab = [0];
    for (let i = 1; i <= n; i++) tab.push(tab[i - 1] + 0.5 * (f((i - 1) * pas) + f(i * pas)) * pas);
    return t => { const u = D.borne(t / pas, 0, n), i = Math.min(n - 1, Math.floor(u)); return D.lerp(tab[i], tab[i + 1], u - i); };
  }
  /* point à la fraction u (0..1) d'une ligne brisée */
  function suivre(pts, u) {
    const L = [0];
    for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const d = D.borne(u, 0, 1) * L[L.length - 1];
    let i = 1;
    while (i < pts.length - 1 && d > L[i]) i++;
    const f = (d - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
    return [D.lerp(pts[i - 1][0], pts[i][0], f), D.lerp(pts[i - 1][1], pts[i][1], f)];
  }
  /* reflets qui filent dans un tube plein ; dist = distance parcourue (px, intégrée), sens donné par son signe */
  function reflets(parent, o) { // o : { x0, x1, y0, y1, nb, graine, vertical }
    const r = D.alea(o.graine), L = [], long = o.vertical ? o.y1 - o.y0 : o.x1 - o.x0;
    for (let i = 0; i < o.nb; i++) L.push({ s: r(), p: r(), l: 22 + r() * 26, e: D.el("line", { stroke: "#fff", "stroke-width": 3, "stroke-linecap": "round", opacity: 0 }, parent) });
    return function (dist, vis) {
      L.forEach(c => {
        const u = D.frac(c.s + dist / long) * long;
        if (o.vertical) { const y = o.y0 + u, x = o.x0 + 4 + c.p * (o.x1 - o.x0 - 8); ap(c.e, { x1: x, x2: x, y1: y, y2: Math.min(o.y1, y + c.l) }); }
        else { const x = o.x0 + u, y = o.y0 + 5 + c.p * (o.y1 - o.y0 - 10); ap(c.e, { x1: x, x2: Math.min(o.x1, x + c.l), y1: y, y2: y }); }
        c.e.setAttribute("opacity", (0.6 * vis).toFixed(2));
      });
    };
  }
  /* une rangée de pastilles centrée en cx : [[texte, fond], …] séparées par `sep` ; rend le groupe */
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

  /* ---------- 8 · le régulateur à flotteur (BP) ----------
     À gauche, le liquide HP (tiède) arrive dans le corps du régulateur : un pointeau (cône) ferme ou ouvre le siège.
     Le bras pivote sur le côté gauche de la chambre ; la boule, au bout, suit le niveau ; le pointeau repose sur
     le bras : boule en bas → bras qui descend → pointeau qui s'écarte du siège (ça ouvre). La sortie du siège
     débouche dans la bouteille (à droite, coupée par le cadre). Deux tubes d'équilibrage (vapeur en haut,
     liquide en bas) donnent le même niveau dans la chambre et la bouteille. */
  S.flotteur = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const LV0 = 470, LV1 = 550, PX = 300, PY = 462, LB = 172, XN = 380; // niveaux, pivot du bras, longueur du bras, axe du pointeau
    const FROID = D.couleur(0.05, false), TIEDE = D.couleur(0.5, false);
    /* le niveau commun, l'angle du bras, l'ouverture du pointeau (0 fermé → 1 grand ouvert) : tout dérive de t */
    const lvAt = t => D.courbe([[0, LV0], [T[3] + 0.4, LV0], [T[3] + 4.9, LV1], [A(6, 0.2), LV1], [E[6], 522], [T[7] + 0.4, 522], [T[7] + 4.6, LV0]], t);
    const phiAt = lv => Math.asin(D.borne((lv - PY) / LB, -0.95, 0.95));
    const TAN0 = Math.tan(phiAt(LV0)), MARCHE = (XN - PX) * (Math.tan(phiAt(LV1)) - TAN0);
    const ouvAt = t => D.borne(((XN - PX) * (Math.tan(phiAt(lvAt(t))) - TAN0) - 1.5) / (MARCHE - 1.5), 0, 1);
    const dist = integrale(t => 70 * ouvAt(t), c.D + 1, 0.05);          // distance parcourue par les reflets
    const distBas = integrale(t => 40 + 70 * D.fenetre(t, T[3], E[4], 1.2), c.D + 1, 0.05); // la descente vers les évaporateurs

    const bout = D.cuve(g, { x: 820, y: 300, l: 880, h: 310 });              // intérieur x 834 → 1686, y 314 → 596
    const ch = enceinte(g, { x: 250, y: 190, l: 360, h: 430, rx: 28 });      // intérieur x 264 → 596, y 204 → 606
    const vapC = D.el("g", {}, ch.dedans), fondC = D.el("g", {}, ch.dedans);
    const vapB = D.el("g", {}, bout.dedans), fondB = D.el("g", {}, bout.dedans);
    let nvC = 0.5, nvB = 0.5;
    const liqC = D.liquide(ch.dedans, { x0: ch.x0, x1: ch.x1, yh: ch.yh, yb: ch.yb, niveau: () => nvC, couleur: () => FROID, pas: (ch.x1 - ch.x0) / 16 });
    const liqB = D.liquide(bout.dedans, { x0: bout.x0, x1: bout.x1, yh: bout.yh, yb: bout.yb, niveau: () => nvB, couleur: () => FROID, pas: (bout.x1 - bout.x0) / 42 });
    const goutB = D.bulles(bout.dedans, 6, 71, true);
    // la boule creuse au bout du bras (sous le liquide : on voit sa moitié immergée à travers la nappe)
    const bras = D.el("line", { stroke: "#6b7785", "stroke-width": 14, "stroke-linecap": "round" }, fondC);
    const brasC = D.el("line", { stroke: "#d4dce4", "stroke-width": 4, "stroke-linecap": "round" }, fondC);
    const boule = D.el("g", {}, fondC);
    D.el("circle", { r: 40, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 3 }, boule);
    D.el("circle", { r: 29, fill: "#e9eef3", stroke: "#8794a3", "stroke-width": 2 }, boule);
    D.el("ellipse", { cx: -12, cy: -14, rx: 10, ry: 5, fill: "#fff", opacity: 0.8, transform: "rotate(-30 -12 -14)" }, boule);
    const vC = D.alea(5), VC = [], vB = D.alea(9), VB = [];
    for (let i = 0; i < 4; i++) VC.push({ x: 478 + vC() * 100, y: 268 + vC() * 66, ph: vC() * TOUR, maj: D.mol(vapC) });
    for (let i = 0; i < 9; i++) VB.push({ x: 900 + vB() * 560, y: 340 + vB() * 90, ph: vB() * TOUR, maj: D.mol(vapB) });

    // le corps du régulateur
    rect(g, 310, 226, 140, 188, { rx: 8, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 });
    const HPc = [324, 240, 112, 86], BPc = [324, 356, 112, 44];
    fluide(g, HPc, CLAIR, 1); fluide(g, BPc, CLAIR, 1);
    const orif = [[XN - 10.4, 326], [XN + 10.4, 326], [XN + 22.4, 356], [XN - 22.4, 356]].map(p => p.join(",")).join(" ");
    D.el("polygon", { points: orif, fill: CLAIR, stroke: "#5d6b7a", "stroke-width": 2 }, g);
    // les tuyaux : arrivée HP, équilibrage (vapeur en haut, liquide en bas), sortie du pointeau, vapeur vers le compresseur, descente
    const HPi = [-10, 256, 336, 56], OUTi = [426, 356, 484, 44], BASi = [584, 568, 356, 28], DESi = [1488, 596, 24, 104];
    tuyau(g, [[-10, 246, 324, 76], [584, 214, 460, 44], [1000, 214, 44, 120, true], [584, 558, 356, 48], [434, 346, 476, 64], [1078, 190, 44, 130, true], [1478, 596, 44, 104, true]],
      [HPi, [584, 224, 450, 24], [1010, 224, 24, 110], BASi, OUTi, [1088, 190, 24, 140], DESi]);
    fluide(g, HPi, TIEDE, 0.88); fluide(g, HPc, TIEDE, 0.88); fluide(g, BASi, FROID, 0.82); fluide(g, DESi, FROID, 0.82);
    const orifF = D.el("polygon", { points: orif, fill: TIEDE }, g);
    const bpF = fluide(g, BPc, FROID, 0), outF = fluide(g, OUTi, FROID, 0);
    const fluxHP = reflets(g, { x0: -10, x1: 320, y0: 256, y1: 312, nb: 7, graine: 3 });
    const fluxOut = reflets(g, { x0: 430, x1: 905, y0: 356, y1: 400, nb: 9, graine: 4 });
    const OM = [0, 1, 2].map(i => ({ s: i / 3 + 0.1, maj: D.mol(g) }));
    // pointeau (cône sur le siège, tige sur le bras), pivot du bras
    const tige = rect(g, XN - 5, 0, 10, 10, { fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 1.5 });
    const cone = D.el("polygon", { fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    rect(g, 264, 453, 38, 18, { fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 });
    D.el("circle", { cx: PX, cy: PY, r: 11, fill: "#3f4a55", stroke: "#1b2733", "stroke-width": 2 }, g);
    // la descente vers les évaporateurs
    const gc = D.el("g", { transform: "scale(0.6)" }, g), CH = [0, 1, 2, 3].map(i => ({ s: i / 4, maj: D.chevron(gc) }));
    const volG = D.el("g", {}, g), VV = [], vv = D.alea(17);
    for (let i = 0; i < 8; i++) VV.push({ per: 4.2 + vv() * 0.6, ph: vv() * 5, maj: D.mol(volG) });
    const ROUTE = [[900, 392], [955, 352], [1060, 334], [1100, 316], [1100, 212]];
    const dessus = D.el("g", {}, g);
    const mila = D.heroine(dessus, { r: 30 });

    // les six petites molécules après le pointeau
    const rang = D.el("g", {}, g), SIX = [0, 1, 2, 3, 4, 5].map(i => ({ x: 870 + i * 54, maj: D.heroine(rang, { r: 17, sansHalo: true, dephasage: i * 0.17 }) }));

    // la ligne de niveau commun, les repères, les étiquettes
    const niv0 = D.trait(g, 624, LV0, 816, LV0, "#b9c3cd"), niv = D.trait(g, 624, LV0, 816, LV0, D.ORANGE);
    const flecheN = D.el("path", { fill: "none", stroke: D.ORANGE, "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
    const same = D.etiquette(g, 630, LV0 - 14, "même niveau", { "font-size": 30 });
    D.lignes(g, 40, 194, ["liquide HP", "du réservoir"], { "font-size": 32, fill: "#10233c", "font-family": SANS, "font-weight": 600 }, 36);
    const eVap = D.etiquette(g, 636, 298, "vapeur", { "font-size": 30 }), eLiq = D.etiquette(g, 636, 642, "liquide", { "font-size": 30 });
    D.etiquette(g, 1052, 190, "vers le compresseur", { "text-anchor": "end", "font-size": 30 });
    D.el("polygon", { points: "1100,158 1074,190 1126,190", fill: D.BLEU }, g);
    const eDes = D.etiquette(g, 1455, 668, "aux évaporateurs", { "text-anchor": "end", "font-size": 30 });
    const eBoule = D.etiquette(g, 470, 668, "boule creuse", { "text-anchor": "middle", "font-size": 30 }), tBoule = D.trait(g, 470, 640, 470, 520, "#637285");
    const ePoint = D.lignes(g, 40, 405, ["pointeau", ""], { "font-size": 30, fill: "#10233c", "font-family": SANS, "font-weight": 700 }, 36);
    const etat = ePoint.lastChild; etat.setAttribute("fill", "#637285");
    const tPoint = D.trait(g, 176, 398, 376, 438, "#637285");
    const eBras = D.etiquette(g, 40, 548, "bras", { "font-size": 30 }), tBras = D.trait(g, 112, 536, 340, 470, "#637285");
    const pHPBP = rangee(g, 800, 748, [["haute pression", D.ORANGE], ["basse pression", D.BLEU]], "→");
    const p6 = D.pastille(g, 800, 748, "≈ 1 sur 6 (bien des fluides : ≈ 1 sur 3)", D.BLEU, 30, "middle");
    const pBoucle = D.pastille(g, 800, 748, "tour bouclé ✓", VERT, 34, "middle");

    const etatTxt = { v: "" };
    return function (t) {
      const lv = lvAt(t), ouv = ouvAt(t), phi = phiAt(lv), sn = ouv > 0.15 ? 1 : 0;
      nvC = (ch.yb - lv) / (ch.yb - ch.yh); nvB = (bout.yb - lv) / (bout.yb - bout.yh);
      liqC.maj(t); liqB.maj(t);
      // le bras, la boule, le pointeau
      const by = lv + 1.5 * Math.sin(t * 2.1), ph2 = phiAt(by), bx = PX + LB * Math.cos(ph2), tan = Math.tan(phi);
      ap(bras, { x1: PX, y1: PY, x2: bx, y2: by }); ap(brasC, { x1: PX, y1: PY, x2: bx, y2: by });
      boule.setAttribute("transform", "translate(" + bx.toFixed(1) + " " + by.toFixed(1) + ")");
      const arm = PY + (XN - PX) * tan, apex = 300 + Math.max(0, (XN - PX) * (tan - TAN0) - 1.5);
      cone.setAttribute("points", [[XN, apex], [XN - 20, apex + 50], [XN + 20, apex + 50]].map(p => p.join(",")).join(" "));
      ap(tige, { y: apex + 50, height: Math.max(2, arm - apex - 50) });
      // le liquide : HP tiède en haut, froid après le siège
      op(orifF, ouv); op(bpF, Math.min(1, ouv * 2.5) * 0.85); op(outF, Math.min(1, ouv * 2.5) * 0.85);
      fluxHP(dist(t), 0.4 + 0.6 * ouv); fluxOut(dist(t), ouv > 0.04 ? 1 : 0);
      OM.forEach(m => { const x = 440 + D.frac(m.s + dist(t) / 470) * 470; m.maj(x, 378, 0.08, true, ouv > 0.04 ? 0.9 : 0); });
      // la vapeur (idle) dans la chambre et dans la bouteille
      VC.forEach(m => m.maj(m.x + Math.sin(t * 0.9 + m.ph) * 10, m.y + Math.cos(t * 0.7 + m.ph) * 8, 0.08, true, 0.9));
      VB.forEach(m => { const y = Math.min(m.y + Math.cos(t * 0.6 + m.ph) * 12, lv - 36); m.maj(m.x + Math.sin(t * 0.5 + m.ph) * 22, y, 0.08, true, y > 330 ? 0.9 : 0); });
      // les gouttes qui sortent du tube, la vapeur de détente qui part vers le compresseur
      goutB(t, (q, b) => { const te = Math.floor((t + b.ph) / b.per) * b.per - b.ph, x = 886 + q * 26; return [x, 396, liqB.surface(x, t) + 3, ouvAt(te) > 0.05 ? 1 : 0, FROID]; });
      VV.forEach(m => {
        const cyc = Math.floor((t + m.ph) / m.per), u = D.frac((t + m.ph) / m.per), te = cyc * m.per - m.ph, [x, y] = suivre(ROUTE, u);
        m.maj(x, y, 0.08, true, ouvAt(te) > 0.05 ? D.fenetre(u, 0, 1, 0.08) : 0);
      });
      // la descente
      CH.forEach(m => { const y = 612 + D.frac(m.s + distBas(t) / 100) * 92; m.maj(1500 / 0.6, y / 0.6, 0, "#fff", D.fenetre((y - 612) / 92, 0, 1, 0.2) * 0.9); });
      // le niveau commun
      const yn = lv;
      ap(niv, { y1: yn, y2: yn }); op(niv, D.lisse((t - A(2, 0.3)) / 0.4)); op(niv0, D.lisse((t - T[3]) / 0.4) * 0.8);
      const dn = Math.abs(yn - LV0), sens = yn > LV0 ? 1 : -1;
      flecheN.setAttribute("d", dn > 8 ? "M 720 " + LV0 + " V " + (yn - sens * 4).toFixed(1) + " M 708 " + (yn - sens * 20).toFixed(1) + " L 720 " + (yn - sens * 4).toFixed(1) + " L 732 " + (yn - sens * 20).toFixed(1) : "");
      op(flecheN, D.lisse((t - T[3]) / 0.4));
      op(same, D.fenetre(t, A(2, 0.2), T[3] + 0.5, 0.4));
      op(eBoule, D.fenetre(t, A(2, 0.4), T[5], 0.5)); op(tBoule, D.fenetre(t, A(2, 0.4), T[5], 0.5));
      ap(tBoule, { x1: bx, y1: 640, x2: bx, y2: by + 40 }); ap(eBoule, { x: bx });
      const vis3 = D.fenetre(t, A(3, 0.15), T[5], 0.5);
      [eBras, tBras].forEach(e => op(e, vis3));
      [ePoint, tPoint].forEach(e => op(e, Math.max(vis3, D.fenetre(t, T[7], c.D, 0.5))));
      ap(tBras, { x2: 340, y2: PY + 40 * tan });
      if (etatTxt.v !== sn) { etatTxt.v = sn; etat.textContent = sn ? "ouvert" : "fermé"; etat.setAttribute("fill", sn ? D.ORANGE : "#637285"); }
      op(eDes, D.lisse((t - A(3, 0.1)) / 0.5));
      // l'héroïne : attend dans le tuyau HP, passe le pointeau, traverse la sortie, tombe dans la nappe
      const tA = A(4, 0.02), tB = A(4, 0.36), tC = A(4, 0.56), tD = A(4, 0.76), tE = E[4] + 0.3, tF = T[6] + 0.5, tG = T[6] + 1.9;
      let x, y, s, ec = 0, temp = 0.5, humeur = "sourire", haut = true;
      if (t < tF) {
        x = D.courbe([[0, 180], [tA, 180], [tB, 380], [tC, 380], [tD, 404], [tE, 430], [tF, 884]], t, true) + (t < tA ? 8 * Math.sin(t * 1.3) : 0);
        y = D.courbe([[0, 284], [tB, 284], [tC, 338], [tD, 366], [tE, 378], [tF, 378]], t, true);
        s = D.courbe([[0, 0.5], [tB, 0.5], [tC, 0.3], [tD, 0.4], [tE, 0.42]], t, true);
        ec = 0.6 * D.fenetre(t, tB + 0.1, tD, 0.25);
        temp = D.courbe([[0, 0.5], [tC - 0.2, 0.5], [tD, 0.05]], t, true);
        humeur = t > tC - 0.5 && t < tD + 0.6 ? "surprise" : t > tD + 0.6 ? "froid" : "sourire";
      } else if (t < tG) {
        const k = (t - tF) / (tG - tF), xe = 950, ye = liqB.surface(xe, t) - 6;
        x = D.lerp(884, xe, k); y = D.lerp(378, ye, k * k); s = D.lerp(0.42, 0.7, k); temp = 0.05; humeur = "surprise";
        if (k >= 1) haut = false;
      } else {
        x = D.courbe([[tG, 950], [E[7], 1060]], t, true); s = 0.7; temp = 0.05; haut = false;
        y = liqB.surface(x, t) - 6; humeur = t < T[7] ? "froid" : "sourire";
      }
      if (t >= tG) haut = false;
      plan(mila, haut ? dessus : fondB);
      mila({ x: x, y: y, s: s, t: t, temp: temp, etat: "liquide", humeur: humeur, ecrase: ec, regard: [1, 0] });
      // les six petites molécules : une sur six se vaporise
      const tv = A(5, 0.55), vap = D.lisse((t - tv) / 0.9);
      op(rang, D.fenetre(t, T[5], T[6] + 1, 0.5));
      SIX.forEach((m, i) => {
        const v = i === 2 ? vap : 0;
        m.maj({ x: m.x, y: 680 - 40 * v, s: 1, t: t, temp: 0.06 + 0.1 * v, etat: v > 0.3 ? "vapeur" : "liquide", humeur: i === 2 && v > 0 ? "surprise" : "froid", regard: [0, 0], op: i === 2 ? 1 - D.lisse((t - tv - 1.0) / 1.2) : 1 });
      });
      // les pastilles
      op(pHPBP, D.fenetre(t, A(4, 0.1), E[4] + 1, 0.4)); op(p6, D.fenetre(t, T[5] + 0.4, E[5] + 1.2, 0.4)); op(pBoucle, D.lisse((t - A(7, 0.6)) / 0.5));
      const carte = D.courbe([[0, 14.6], [T[3], 15.3], [tB, 15.9], [tC, 16.2], [tE, 17], [tF, 17.7], [tG, 18.5], [E[6], 18.9], [T[7] + 3, 19]], t);
      return { carte: carte, temp: temp, etat: "liquide", humeur: humeur };
    };
  };

  /* ---------- 9 · le pot à huile ----------
     En haut, le bas de la bouteille séparatrice (coupée par une cassure) : la nappe d'ammoniac, et au fond la couche
     d'huile (plus lourde, jamais mélangée). Dessous : un tube, la vanne d'isolement, le pot (avec son collier de
     réchauffage et son évent vers l'aspiration), la vanne de purge à ressort, le bidon. */
  S["pot-huile"] = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const FROID = D.couleur(0.05, false), OIL = D.HUILE, YS = 250, HMAX = 44, NG = 9;
    // la cassure : on ne garde que le bas de la bouteille (le tracé en dents de scie dit « coupé »)
    const dents = []; for (let i = 0, x = 40; x <= 1200; i++, x += 28) dents.push((i ? "L " : "M ") + x + " " + (160 + (i % 2 ? 5 : -5)));
    D.el("path", { d: dents.join(" ") + " L 1200 800 L 40 800 Z" }, D.el("clipPath", { id: "vm-c-coupe" }, g));
    const bout = D.cuve(g, { x: 60, y: -80, l: 1120, h: 440 });      // intérieur x 74 → 1166, y -66 → 346
    bout.g.setAttribute("clip-path", "url(#vm-c-coupe)");
    D.el("path", { d: dents.join(" "), fill: "none", stroke: "#4d5866", "stroke-width": 4, "stroke-linejoin": "round" }, g);
    const vapB = D.el("g", {}, bout.dedans), fondB = D.el("g", {}, bout.dedans);
    const nv = (bout.yb - YS) / (bout.yb - bout.yh);
    const liqB = D.liquide(bout.dedans, { x0: bout.x0, x1: bout.x1, yh: bout.yh, yb: bout.yb, niveau: () => nv, couleur: () => FROID, pas: (bout.x1 - bout.x0) / 54 });
    const huileB = D.el("path", { fill: OIL, opacity: 0.95 }, bout.dedans), filetB = D.el("path", { fill: "none", stroke: "#fff", "stroke-width": 2.5, opacity: 0.6 }, bout.dedans);
    const gouttes = D.el("g", {}, bout.dedans);
    // le pot (cuve verticale) et ses organes
    const pot = D.cuve(g, { x: 468, y: 440, l: 104, h: 160, vertical: true });  // intérieur x 482 → 558, y 454 → 586
    const nh3P = rect(pot.dedans, 482, 454, 76, 132, { fill: FROID, opacity: 0.82 }), huileP = rect(pot.dedans, 482, 586, 76, 0, { fill: OIL, opacity: 0.95 });
    const bullesP = D.bulles(pot.dedans, 12, 44, false);
    tuyau(g, [[498, 346, 44, 124, true], [506, 592, 28, 36, true], [506, 658, 28, 20, true], [150, 462, 332, 44], [108, 372, 44, 134, true]],
      [[508, 346, 24, 124], [512, 592, 16, 36], [512, 658, 16, 20], [150, 472, 340, 24], [118, 372, 24, 124]]);
    rect(g, 508, 346, 24, 124, { fill: FROID, opacity: 0.82 }); const tubeOr = rect(g, 508, 346, 24, 0, { fill: OIL, opacity: 0.95 });
    const fluxTube = reflets(g, { x0: 508, x1: 532, y0: 346, y1: 470, nb: 5, graine: 12, vertical: true });
    const purgeOr = rect(g, 512, 596, 16, 30, { fill: OIL, opacity: 0 });
    D.el("polygon", { points: "108,372 130,346 152,372", fill: D.BLEU }, g);
    // la vanne d'isolement (vert ouverte, rouge fermée) et son volant ; la vanne de purge et son ressort
    const vOuv = D.el("g", {}, g), vFer = D.el("g", {}, g);
    [[vOuv, VERT], [vFer, ROUGE]].forEach(([p, f]) => ["490,394 520,410 490,426", "550,394 520,410 550,426"].forEach(pts => D.el("polygon", { points: pts, fill: f, stroke: "#1b2733", "stroke-width": 2 }, p)));
    D.el("line", { x1: 520, y1: 394, x2: 520, y2: 378, stroke: "#3f4a55", "stroke-width": 5 }, g);
    const volant = D.el("line", { y1: 378, y2: 378, stroke: "#3f4a55", "stroke-width": 8, "stroke-linecap": "round" }, g);
    ["495,628 520,644 495,660", "545,628 520,644 545,660"].forEach(pts => D.el("polygon", { points: pts, fill: "#4d5866", stroke: "#1b2733", "stroke-width": 2 }, g));
    const levier = D.el("line", { stroke: "#3f4a55", "stroke-width": 7, "stroke-linecap": "round" }, g), ressort = D.el("path", { fill: "none", stroke: "#8a6a1f", "stroke-width": 3.5, "stroke-linejoin": "round" }, g);
    rect(g, 590, 690, 20, 8, { rx: 3, fill: "#3f4a55" });
    // le collier de réchauffage (deux blocs de part et d'autre du pot)
    const collier = [454, 554].map(x => rect(g, x, 520, 32, 55, { rx: 8, fill: "#4d5866", stroke: "#1b2733", "stroke-width": 2 }));
    const chauffe = [454, 554].map(x => rect(g, x, 520, 32, 55, { rx: 8, fill: "#ff4d2e", opacity: 0 }));
    const lueur = D.el("g", {}, g), vagues = [0, 1].map(() => D.chaleur(lueur));
    // le bidon
    rect(g, 470, 700, 100, 64, { rx: 10, fill: "#8a97a6", stroke: "#4d5866", "stroke-width": 3 });
    rect(g, 478, 708, 84, 48, { fill: CLAIR });
    const huileC = rect(g, 478, 756, 84, 0, { fill: OIL, opacity: 0.95 });
    const goutteC = D.bulles(g, 3, 8, true);
    // la vapeur de la bouteille ; les gouttes d'huile ; la molécule
    const vB = D.alea(21), VB = [];
    for (let i = 0; i < 8; i++) VB.push({ x: 470 + vB() * 620, y: 190 + vB() * 40, ph: vB() * TOUR, maj: D.mol(vapB) });
    const mila = D.heroine(fondB, { r: 30 });
    const GO = [];
    for (let i = 0; i < NG; i++) { const a = i * 2.4; GO.push({ dx: Math.cos(a) * (50 + (i % 3) * 22), dy: 12 + (i * 7) % 34, r: 6 + (i * 5) % 6, tf: T[3] + 0.3 + i * 0.5, e: D.el("g", {}, gouttes) }); }
    GO.forEach(o => { D.el("circle", { r: o.r, fill: OIL, stroke: "#7a5410", "stroke-width": 1.5 }, o.e); D.el("circle", { cx: -o.r * 0.3, cy: -o.r * 0.35, r: o.r * 0.28, fill: "#fff", opacity: 0.7 }, o.e); });
    // épaisseur de la couche d'huile dans la bouteille : chaque goutte arrivée en ajoute un neuvième
    const huileDe = t => HMAX * GO.reduce((s, o) => s + D.lisse((t - (o.tf + 1.25)) / 0.35), 0) / NG;
    // la vapeur de l'évent
    const volG = D.el("g", {}, g), VV = [], vv = D.alea(31), ROUTE = [[500, 482], [130, 484], [130, 380]];
    for (let i = 0; i < 7; i++) VV.push({ per: 3.8 + vv() * 0.6, ph: vv() * 5, maj: D.mol(volG) });
    const distTube = integrale(t => 90 * D.fenetre(t, T[5] + 0.2, T[5] + 3.3, 0.3), c.D + 1, 0.05);
    // l'encart : un tube d'évaporateur enduit d'huile
    const enc = D.el("g", {}, g);
    rect(enc, 940, 395, 630, 305, { rx: 18, fill: "#fffdf8", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 });
    D.etiquette(enc, 962, 436, "dans un évaporateur", { "font-size": 30 });
    rect(enc, 975, 480, 560, 148, { rx: 4, fill: "url(#vm-acier)" });
    rect(enc, 975, 496, 560, 116, { fill: CLAIR });
    rect(enc, 975, 520, 560, 68, { fill: FROID, opacity: 0.85 });
    const fluxE = reflets(enc, { x0: 975, x1: 1535, y0: 520, y1: 588, nb: 8, graine: 5 });
    const filmH = [rect(enc, 975, 496, 560, 0, { fill: OIL }), rect(enc, 975, 612, 560, 0, { fill: OIL })];
    const chal = D.el("g", {}, enc), HC = [[1260, 0], [1400, 0], [1520, 0], [1020, 180], [1120, 180], [1220, 180], [1320, 180], [1420, 180]].map(([x, a], i) => ({ x: x, a: a, f: i * 0.31, maj: D.chaleur(chal) }));
    D.etiquette(enc, 1330, 470, "huile", { "text-anchor": "middle", "font-size": 30, fill: "#7a5410", "font-weight": 700 });
    D.trait(enc, 1330, 478, 1330, 506, "#7a5410");
    // les étiquettes et les pastilles
    const eBout = D.etiquette(g, 100, 204, "bouteille séparatrice", { "font-size": 30 });
    const eAmm = D.etiquette(g, 1215, 320, "ammoniac liquide", { "font-size": 30 }), tAmm = D.trait(g, 1208, 312, 1090, 288, "#637285");
    const eHui = D.etiquette(g, 1215, 376, "huile, plus lourde", { "font-size": 30, fill: "#7a5410", "font-weight": 700 }), tHui = D.trait(g, 1208, 368, 1010, 336, "#637285");
    const ePot = D.etiquette(g, 606, 500, "pot à huile", { "font-size": 30 });
    const eIso = D.etiquette(g, 574, 416, "vanne d'isolement", { "font-size": 30 });
    const eCol = D.etiquette(g, 40, 560, "collier de réchauffage", { "font-size": 30 }), tCol = D.trait(g, 392, 552, 452, 546, "#637285");
    const eEvent = D.etiquette(g, 172, 408, "vers l'aspiration", { "font-size": 30 });
    const ePurge = D.etiquette(g, 452, 654, "vanne de purge", { "text-anchor": "end", "font-size": 30 }), tPurge = D.trait(g, 458, 648, 490, 645, "#637285");
    const eBidon = D.etiquette(g, 588, 746, "bidon", { "font-size": 30 });
    const pMoins = D.pastille(g, 1255, 748, "moins de froid", ROUGE, 30, "middle");
    const pLent = D.pastille(g, 830, 560, "lentement", BLEU, 30, "start"), pProt = D.pastille(g, 830, 620, "protégé", VERT, 30, "start"), pSeul = D.pastille(g, 830, 680, "jamais seul", ROUGE, 30, "start");

    let mot = -1;
    return function (t) {
      // ---- les grandeurs qui dérivent de t
      const q = D.lisse((t - (T[5] + 0.2)) / 2.6);                          // l'huile passe de la bouteille au pot
      const fermee = D.lisse((t - (T[5] + 3.2)) / 0.8);                      // vanne d'isolement
      const boil = D.lisse((t - (T[5] + 4.7)) / (E[5] - 0.2 - T[5] - 4.7));  // l'ammoniac du pot s'évapore
      const chaud = D.lisse((t - (T[5] + 4)) / 0.8) * (1 - D.lisse((t - (T[6] + 0.3)) / 0.8));
      const ouvP = D.fenetre(t, T[6] + 1, E[6] - 0.6, 0.6);                  // vanne de purge ouverte « un peu »
      const hB = huileDe(t) * (1 - q);
      const qp = D.lisse((t - (T[6] + 1.2)) / (E[6] - 0.8 - T[6] - 1.2));
      const hP = 78 * q - 56 * qp, hC = 36 * qp;
      // ---- la bouteille
      liqB.maj(t);
      const yo = bout.yb - hB;
      let d = "";
      if (hB > 0.5) { d = "M " + bout.x0 + " " + (bout.yb + 2) + " L " + bout.x0 + " " + yo.toFixed(1); for (let k = 0; k <= 28; k++) { const x = bout.x0 + k * (bout.x1 - bout.x0) / 28; d += " L " + x.toFixed(1) + " " + (yo + 1.2 * Math.sin(x / 70 + t * 1.3)).toFixed(1); } d += " L " + bout.x1 + " " + (bout.yb + 2) + " Z"; }
      huileB.setAttribute("d", d); filetB.setAttribute("d", hB > 0.5 ? "M " + bout.x0 + " " + yo.toFixed(1) + " H " + bout.x1 : "");
      VB.forEach(m => m.maj(m.x + Math.sin(t * 0.5 + m.ph) * 24, m.y + Math.cos(t * 0.7 + m.ph) * 8, 0.08, true, 0.9));
      const xh = 640 + 70 * Math.sin(t * 0.22), yh = liqB.surface(xh, t) - 4;
      mila({ x: xh, y: yh, s: 0.9, t: t, temp: 0.05, etat: "liquide", humeur: t > A(4, 0.3) && t < E[4] ? "triste" : t > A(2, 0.15) && t < A(2, 0.7) ? "surprise" : "sourire", regard: [1, 0] });
      GO.forEach((o, i) => {
        const f = D.borne((t - o.tf) / 1.25, 0, 1), tt = Math.min(t, o.tf), yEnd = bout.yb - HMAX * (i + 1) / NG - 2;
        const x = xh + o.dx + 8 * Math.sin(tt * 1.1 + i), y0 = YS + o.dy + 5 * Math.cos(tt * 0.9 + i);
        o.e.setAttribute("transform", "translate(" + x.toFixed(1) + " " + D.lerp(y0, yEnd, f * f).toFixed(1) + ")");
        op(o.e, D.lisse((t - A(2, 0.15)) / 0.5) * (f >= 1 ? 0 : 1));
      });
      // ---- le tube, le pot, la vidange
      const frontOr = D.lerp(346, 470, D.lisse((t - (T[5] + 0.2)) / 1.2)), dispOr = 1 - D.lisse((t - (T[5] + 3.1)) / 0.6);
      ap(tubeOr, { height: Math.max(0, frontOr - 346) }); op(tubeOr, dispOr * (t > T[5] ? 1 : 0));
      fluxTube(distTube(t), 0.7 * D.fenetre(t, T[5] + 0.2, T[5] + 3.3, 0.3));
      const yOilP = 586 - hP, yTopN = D.lerp(454, yOilP, boil);
      ap(huileP, { y: yOilP, height: Math.max(0, hP) });
      ap(nh3P, { y: yTopN, height: Math.max(0, yOilP - yTopN) });
      bullesP(t, (qq, b) => { const te = Math.floor((t + b.ph) / b.per) * b.per - b.ph, on = te > T[5] + 4.5 && te < E[5] - 0.2 ? 1 : 0; return [490 + qq * 60, yOilP - 3, yTopN + 3, on * (yOilP - yTopN > 14 ? 1 : 0), "#fff"]; });
      op(vOuv, 1 - fermee); op(vFer, fermee);
      const cv = Math.cos(fermee * Math.PI / 2) * 22; ap(volant, { x1: 520 - cv, x2: 520 + cv });
      op(purgeOr, hP > 3 ? 1 : 0);
      const ang = -26 * ouvP * Math.PI / 180, lx = 545 + 56 * Math.cos(ang), ly = 644 + 56 * Math.sin(ang);
      ap(levier, { x1: 545, y1: 644, x2: lx, y2: ly });
      let r = "M " + lx.toFixed(1) + " " + ly.toFixed(1);
      for (let k = 1; k <= 7; k++) r += " L " + (lx + (k % 2 ? -9 : 9)).toFixed(1) + " " + (ly + (690 - ly) * k / 7).toFixed(1);
      ressort.setAttribute("d", r + " L " + lx.toFixed(1) + " 690");
      collier.forEach(e => e.setAttribute("stroke", chaud > 0.1 ? "#ff4d2e" : "#1b2733")); chauffe.forEach(e => op(e, 0.75 * chaud));
      vagues.forEach((v, i) => { const f = D.frac(i / 2 + t * 0.7); v(676 - f * 56, 536 + i * 36, 90, chaud * D.fenetre(f, 0, 1, 0.25) * 0.9); });
      goutteC(t, (qq, b) => { const te = Math.floor((t + b.ph) / b.per) * b.per - b.ph; return [520, 680, 752 - hC - 4, D.fenetre(te, T[6] + 1, E[6] - 0.6, 0.6) > 0.3 ? 1 : 0, OIL]; });
      ap(huileC, { y: 756 - hC, height: hC });
      VV.forEach(m => {
        const cyc = Math.floor((t + m.ph) / m.per), u = D.frac((t + m.ph) / m.per), te = cyc * m.per - m.ph, [x, y] = suivre(ROUTE, u);
        m.maj(x, y, 0.08, true, te > T[5] + 4.7 && te < E[5] - 0.2 && boil < 0.97 ? D.fenetre(u, 0, 1, 0.1) : 0);
      });
      // ---- l'encart du tube d'évaporateur
      const film = D.lisse((t - A(4, 0.2)) / 2.6), th = 24 * film;
      op(enc, D.fenetre(t, T[4], T[5] + 0.3, 0.5));
      ap(filmH[0], { height: th }); ap(filmH[1], { y: 612 - th, height: th });
      fluxE(60 * t, 1);
      HC.forEach(h => { const f = D.frac(h.f + t * 0.45), y = h.a ? 666 - f * 32 : 440 + f * 30; h.maj(h.x, y, h.a, D.fenetre(f, 0, 1, 0.25) * (1 - 0.62 * film)); });
      // ---- les étiquettes et les pastilles
      op(eBout, D.lisse((t - T[2]) / 0.5)); op(ePot, D.lisse((t - T[2]) / 0.5));
      [eAmm, tAmm].forEach(e => op(e, D.lisse((t - A(2, 0.3)) / 0.5)));
      [eHui, tHui].forEach(e => op(e, D.lisse((t - A(3, 0.55)) / 0.5) * (1 - D.lisse((t - (T[5] + 3)) / 0.6))));
      op(eIso, D.lisse((t - A(5, 0.2)) / 0.5));
      [eCol, tCol, eEvent].forEach(e => op(e, D.lisse((t - A(5, 0.5)) / 0.5) * (1 - D.lisse((t - T[6]) / 0.6))));
      [ePurge, tPurge, eBidon].forEach(e => op(e, D.lisse((t - T[6]) / 0.5)));
      const m = t > T[7] ? 1 : 0;
      if (mot !== m) { mot = m; eBidon.textContent = m ? "recyclage" : "bidon"; eBidon.setAttribute("fill", m ? VERT : "#10233c"); eBidon.setAttribute("font-weight", m ? 700 : 600); }
      op(pMoins, D.fenetre(t, A(4, 0.5), T[5] + 0.3, 0.4));
      op(pLent, D.fenetre(t, T[6] + 0.8, T[7] - 0.2, 0.4)); op(pProt, D.fenetre(t, A(6, 0.42), T[7] - 0.2, 0.4)); op(pSeul, D.fenetre(t, A(6, 0.72), T[7] - 0.2, 0.4));
      return { carte: 0.55, temp: 0.05, etat: "liquide", humeur: "sourire" };
    };
  };

  /* ---------- 10 · la fuite : salle des machines ----------
     Un compresseur ouvert vu de côté, sa garniture qui fuit, un détecteur au plafond, un extracteur en haut du
     mur (il rejette dehors par un conduit), une tuyauterie basse avec une bride qui fuit en liquide.
     Vapeur : petites molécules qui MONTENT sous le plafond. Liquide : brouillard blanc qui reste au sol. */
  S.fuite = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const LIQ = D.couleur(0.45, false), GX = 279, GY = 586, FX = 1194;       // la garniture (sortie du jet), la bride
    const tRouge = A(4, 0.62), tExtrait = A(4, 0.8);
    // ---- le décor : mur, plinthe sombre, sol, plafond
    rect(g, 0, 160, 1600, 530, { fill: "#dde5ec" });
    for (let x = 200; x < 1600; x += 200) D.el("line", { x1: x, y1: 160, x2: x, y2: 690, stroke: "#cdd6df", "stroke-width": 3 }, g);
    rect(g, 0, 520, 1600, 170, { fill: "#b9c4cf" });
    rect(g, 0, 690, 1600, 80, { fill: "#a3adb9" }); rect(g, 0, 688, 1600, 5, { fill: "#7b8794" });
    // ---- la tuyauterie basse (elle part du carter du compresseur), ses pieds, sa bride
    tuyau(g, [[610, 598, 990, 64]], [[610, 608, 990, 44]]);
    const liqT = fluide(g, [610, 608, 990, 44], LIQ, 0.8), fluxT = reflets(g, { x0: 610, x1: 1600, y0: 608, y1: 652, nb: 14, graine: 7 });
    [900, 1450].forEach(x => { rect(g, x, 592, 36, 76, { rx: 6, fill: "#4d5866", stroke: "#1b2733", "stroke-width": 2 }); D.el("circle", { cx: x + 18, cy: 604, r: 4, fill: "#9aa7b5" }, g); D.el("circle", { cx: x + 18, cy: 656, r: 4, fill: "#9aa7b5" }, g); }); // colliers du tube
    [1176, 1198].forEach(x => rect(g, x, 586, 16, 88, { rx: 3, fill: "#4d5866", stroke: "#1b2733", "stroke-width": 2 }));
    [592, 668].forEach(y => [1184, 1206].forEach(x => D.el("circle", { cx: x, cy: y, r: 4, fill: "#9aa7b5" }, g)));
    const gO = D.el("g", {}, g); // les ondes d'odeur passent derrière la machine
    // ---- le compresseur ouvert, vu de côté : moteur, accouplement, garniture, carter, cylindre, culasse
    rect(g, 40, 676, 600, 14, { fill: "#4d5866" });
    rect(g, 60, 556, 130, 120, { rx: 10, fill: "url(#vm-marine)", stroke: D.BLEU, "stroke-width": 4 });
    [84, 104, 124, 144, 164].forEach(x => D.el("line", { x1: x, y1: 566, x2: x, y2: 580, stroke: "#5d80ad", "stroke-width": 4 }, g));
    D.texte(g, 125, 636, "moteur", { "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: "#fff", "font-family": SANS });
    rect(g, 190, 606, 76, 26, { fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }); rect(g, 208, 592, 22, 54, { rx: 4, fill: "#6b7785" });
    const gar = rect(g, 262, 586, 34, 70, { rx: 6, fill: "#3f4a55", stroke: "#1b2733", "stroke-width": 3 });
    rect(g, 296, 566, 330, 110, { rx: 14, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 3 });
    rect(g, 410, 478, 110, 92, { rx: 6, fill: "url(#vm-acier-h)", stroke: "#5d6b7a", "stroke-width": 3 }); rect(g, 398, 448, 134, 36, { rx: 8, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 3 });
    D.el("circle", { cx: 460, cy: 624, r: 26, fill: "#e9eef3", stroke: "#5d6b7a", "stroke-width": 3 }, g); D.el("circle", { cx: 460, cy: 624, r: 6, fill: "#5d6b7a" }, g);
    const anneau = D.el("circle", { cx: 279, cy: 621, r: 56, fill: "none", stroke: D.ORANGE, "stroke-width": 6, "stroke-dasharray": "14 10", opacity: 0 }, g);
    // ---- le plafond, le détecteur, l'extracteur et son conduit
    rect(g, 0, 142, 1600, 18, { fill: "url(#vm-acier)" });
    rect(g, 685, 154, 20, 10, { fill: "#3f4a55" });
    rect(g, 640, 160, 110, 54, { rx: 8, fill: "#e9eef3", stroke: "#5d6b7a", "stroke-width": 3 }); rect(g, 654, 172, 50, 26, { rx: 4, fill: "#1b2733" });
    const led = D.el("circle", { cx: 728, cy: 187, r: 9, fill: "#2ea66a", stroke: "#1b2733", "stroke-width": 2 }, g), lueurLed = D.el("circle", { cx: 728, cy: 187, r: 18, fill: "none", stroke: ROUGE, "stroke-width": 4, opacity: 0 }, g);
    rect(g, 1050, 90, 80, 62, { rx: 4, fill: "url(#vm-acier-h)", stroke: "#5d6b7a", "stroke-width": 3 }); rect(g, 1062, 90, 56, 62, { fill: CLAIR }); rect(g, 1040, 80, 100, 14, { rx: 4, fill: "#3f4a55" });
    rect(g, 1030, 162, 120, 120, { rx: 10, fill: "#eef2f6", stroke: "#5d6b7a", "stroke-width": 5 });
    const vent = D.ventilateur(g, 1090, 222, 48);
    const gc = D.el("g", {}, g), AIR = [0, 1, 2].map(i => ({ s: i / 3, maj: D.chevron(gc) }));
    // ---- la fuite en jets, les ondes d'odeur, la vapeur, le brouillard
    const gr = D.el("radialGradient", { id: "vm-c-brume" }, D.el("defs", {}, g));
    [[0, 0.95], [0.55, 0.7], [1, 0]].forEach(([o, a]) => D.el("stop", { offset: o, "stop-color": "#f6fbff", "stop-opacity": a }, gr));
    const jets = D.el("g", {}, g), r1 = D.alea(67), JT = [];
    for (let i = 0; i < 12; i++) JT.push({ a: -140 + r1() * 100, v: 50 + r1() * 70, ph: r1(), e: D.el("circle", { r: 4 + r1() * 4, fill: "#fff", stroke: BLEU, "stroke-width": 2 }, jets) });
    const SF = [0, 1, 2].map(i => ({ f0: i / 3, e: D.el("ellipse", { fill: "url(#vm-c-brume)" }, jets) }));
    const ondes = [0, 1, 2, 3].map(() => D.el("path", { fill: "none", stroke: "#6e8b1f", "stroke-width": 5, "stroke-dasharray": "16 12", "stroke-linecap": "round" }, gO));
    const mols = D.el("g", {}, g), r2 = D.alea(5), N = 30, V = [];
    for (let i = 0; i < N; i++) V.push({ te: T[4] + i * 0.2, dr: 2.4 + r2() * 0.9, yc: 180 + r2() * 52, xt: 330 + r2() * 790, ph: r2() * TOUR, ext: i % 2 === 0, tx: tExtrait + 1 + (i / 2) * 0.62, maj: D.mol(mols) });
    const brume = D.el("g", {}, g), r3 = D.alea(91), BR = [];
    for (let i = 0; i < 18; i++) BR.push({ dir: i % 2 ? 1 : -1, d: r3(), h: r3() * 40, k: r3(), e: D.el("ellipse", { fill: "url(#vm-c-brume)" }, brume) });
    const gel = D.el("ellipse", { cx: FX, cy: 686, rx: 230, ry: 11, fill: "#bfe0f7" }, g), nappeJet = D.el("polygon", { points: "1190,664 1200,664 1236,688 1154,688", fill: LIQ }, g);
    const gout = D.el("g", {}, g), r4 = D.alea(23), GL = [];
    for (let i = 0; i < 12; i++) GL.push({ a: -50 + r4() * 100, v: 30 + r4() * 40, ph: r4(), e: D.el("circle", { r: 4 + r4() * 3, fill: LIQ, stroke: "#fff", "stroke-width": 1.5 }, gout) });
    // ---- les personnages : la voisine qui s'échappe, l'héroïne à l'abri dans le tube
    const voisine = D.heroine(g, { r: 26, teinte: "#9b7fd1", sansHalo: true, dephasage: 0.4 });
    const mila = D.heroine(g, { r: 30 });
    // ---- étiquettes, pastilles, pictogramme, flèches
    const eGar = D.etiquette(g, 70, 516, "garniture", { "font-size": 30 }), tGar = D.trait(g, 190, 526, 266, 598, "#637285");
    const eComp = D.etiquette(g, 330, 740, "compresseur", { "text-anchor": "middle", "font-size": 30 });
    const eDet = D.etiquette(g, 695, 296, "détecteur", { "text-anchor": "middle", "font-size": 30 }), tDet = D.trait(g, 695, 266, 695, 220, "#637285");
    const eExt = D.etiquette(g, 1090, 330, "extracteur d'air", { "text-anchor": "middle", "font-size": 30 }), tExt = D.trait(g, 1090, 300, 1090, 284, "#637285");
    const eBr = D.lignes(g, 1190, 536, ["brouillard très froid", "il reste au ras du sol"], { "text-anchor": "middle", "font-size": 30, fill: "#10233c", "font-family": SANS, "font-weight": 700 }, 36);
    const pPRP = D.pastille(g, 760, 400, "PRP 0", VERT, 30, "start"), pTox = D.pastille(g, 760, 466, "toxique pour les personnes", ROUGE, 30, "start");
    const pic = D.el("g", {}, g);
    D.el("polygon", { points: "800,376 844,420 800,464 756,420", fill: ROUGE, stroke: "#8a1f14", "stroke-width": 4, "stroke-linejoin": "round" }, pic);
    D.texte(pic, 800, 438, "!", { "text-anchor": "middle", "font-size": 54, "font-weight": 700, fill: "#fff", "font-family": TITRE });
    const pB2L = D.pastille(g, 864, 432, "B2L : toxique, brûle lentement", ROUGE, 30, "start");
    const pOdeur = D.pastille(g, 760, 420, "l'odeur ne remplace pas le détecteur", "#6e8b1f", 30, "start");
    const pMonte = D.pastille(g, 760, 420, "plus légère que l'air : elle monte", BLEU, 30, "start");
    const pS = [["1 alerter", D.ORANGE, 345], ["2 évacuer en remontant le vent", VERT, 405], ["3 jamais seul, protection respiratoire", ROUGE, 465]].map(([s, f, y]) => D.pastille(g, 760, y, s, f, 30, "start"));
    const pFin = D.pastille(g, 760, 420, "frigoristes formés à l'ammoniac, et équipés", D.BLEU, 30, "start");
    function bloc(x0, x1, y, fond, texte) { // flèche pleine, corps de 40 de haut, pointe de 60 de large, texte dedans
      const s = x1 > x0 ? 1 : -1, xp = x1 - s * 64, w = D.el("g", {}, g);
      D.el("polygon", { points: [[x0, y - 16], [xp, y - 16], [xp, y - 26], [x1, y], [xp, y + 26], [xp, y + 16], [x0, y + 16]].map(p => p.join(",")).join(" "), fill: fond, stroke: "#1b2733", "stroke-width": 2, "stroke-linejoin": "round" }, w);
      D.texte(w, (x0 + xp) / 2, y + 9, texte, { "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: "#fff", "font-family": SANS });
      return w;
    }
    const aVent = bloc(1260, 900, 520, BLEU, "le vent"), aEvac = bloc(900, 1260, 574, VERT, "on évacue");
    const distBas = integrale(() => 16, c.D + 1, 0.5);
    const distV = integrale(t => 40 + 700 * D.lisse((t - tExtrait) / 1.5), c.D + 1, 0.05);

    return function (t) {
      // ---- le tube, les jets de la garniture
      fluxT(distBas(t), 0.8);
      JT.forEach(o => {
        const f = D.frac(o.ph + t * 0.8), a = o.a * Math.PI / 180, vis = t > T[0] ? D.lisse((t - T[0]) / 0.5) * (1 - f) : 0;
        ap(o.e, { cx: GX + Math.cos(a) * o.v * f, cy: GY - 6 + Math.sin(a) * o.v * f }); op(o.e, vis);
      });
      SF.forEach(o => { const f = D.frac(o.f0 + t * 0.45); ap(o.e, { cx: GX + 4 + f * 26 + 6 * Math.sin(t * 2 + o.f0 * 9), cy: 580 - f * 120, rx: 24 + 34 * f, ry: 18 + 26 * f }); op(o.e, t > T[0] ? D.lisse((t - T[0]) / 0.5) * (1 - f) * 0.95 * (t < T[4] + 4 ? 1 : 0.4) : 0); });
      op(anneau, D.fenetre(t, T[0], A(0, 0.7), 0.4) * (0.6 + 0.4 * Math.sin(t * 6)));
      // ---- la voisine s'échappe, puis monte avec la vapeur
      const tS = T[0] + 0.9, tM = T[4] + 0.3;
      let vx, vy;
      if (t < tS) { vx = GX + 6; vy = 600; }
      else if (t < tM) { const k = D.lisse((t - tS) / (E[0] - tS - 0.5)); vx = D.lerp(GX + 6, 420, k * k * k) + 22 * Math.sin(t * 0.55) * k; vy = D.lerp(600, 362, k) + 14 * Math.sin(t * 0.7) * k; }
      else { const k = D.lisse((t - tM) / 3.2), x0 = 420 + 22 * Math.sin(tM * 0.55), y0 = 362 + 14 * Math.sin(tM * 0.7); vx = D.lerp(x0, 560, k) + 14 * Math.sin(t * 0.8) * k; vy = D.lerp(y0, 205, k) + 4 * Math.sin(t * 1.1) * k; }
      voisine({ x: vx, y: vy, s: 1, t: t, humeur: t < tS ? "sourire" : t < T[3] ? "surprise" : t < tM ? "sourire" : "sourire", regard: [1, -1] });
      mila({ x: 800 + 0 * t, y: 630, s: 0.5, t: t, temp: 0.45, etat: "liquide", humeur: t > T[0] && t < E[1] ? "surprise" : t > T[4] && t < E[6] ? "triste" : "sourire", regard: [-1, -1] });
      // ---- les ondes d'odeur (phrase 3)
      ondes.forEach((o, j) => {
        const f = D.frac(j / 4 + (t - T[3]) * 0.28), r = 50 + f * 340, a0 = -165 * Math.PI / 180, a1 = -15 * Math.PI / 180, cx = GX, cy = GY - 10;
        o.setAttribute("d", "M " + (cx + r * Math.cos(a0)).toFixed(1) + " " + (cy + r * Math.sin(a0)).toFixed(1) + " A " + r.toFixed(1) + " " + r.toFixed(1) + " 0 0 1 " + (cx + r * Math.cos(a1)).toFixed(1) + " " + (cy + r * Math.sin(a1)).toFixed(1));
        op(o, D.fenetre(t, T[3], E[3] + 0.3, 0.4) * D.fenetre(f, 0, 1, 0.25) * 0.85);
      });
      // ---- la vapeur monte sous le plafond, l'extracteur la reprend
      V.forEach((m, i) => {
        const a = t - m.te;
        if (a < 0) { m.maj(-50, -50, 0.4, true, 0); return; }
        let x, y, vis = D.borne(a / 0.4, 0, 1);
        if (a < m.dr) { const u = D.lisse(a / m.dr); x = GX + 30 * Math.sin(a * 1.7 + i) * (1 - u) + 20 * u; y = D.lerp(586, m.yc, u); }
        else { const u = D.lisse((a - m.dr) / 3.6); x = D.lerp(GX + 20, m.xt, u); y = m.yc + Math.sin(a * 1.2 + m.ph) * 6; }
        if (m.ext && t > m.tx) {
          const px = x, py = y, [ex, ey] = suivre([[px, py], [1030, 222], [1090, 222], [1090, 150], [1090, 70]], D.borne((t - m.tx) / 3.4, 0, 1));
          x = ex; y = ey; vis *= 1 - D.lisse((t - m.tx - 2.6) / 0.8);
        }
        m.maj(x, y, 0.4, true, vis);
      });
      // ---- le détecteur et l'extracteur
      const rouge = t > tRouge;
      led.setAttribute("fill", rouge ? "#e5302a" : "#2ea66a"); op(lueurLed, rouge ? 0.35 + 0.35 * Math.sin(t * 8) : 0); lueurLed.setAttribute("r", (17 + (rouge ? 3 * Math.sin(t * 8) : 0)).toFixed(1));
      const sv = D.lisse((t - tExtrait) / 1.5);
      vent(distV(t));
      AIR.forEach(m => { const f = D.frac(m.s + t * 0.5); m.maj(1090, 70 - f * 56, 180, "#7a8ea3", D.fenetre(f, 0, 1, 0.2) * sv); });
      // ---- la fuite de liquide : jets, brouillard (phrase 5)
      const F = D.lisse((t - (T[5] + 0.6)) / 6), K = D.lisse((t - T[5]) / 0.4);
      GL.forEach(o => { const f = D.frac(o.ph + t * 0.9), a = o.a * Math.PI / 180; ap(o.e, { cx: FX + 4 + Math.sin(a) * o.v * f * 1.6, cy: 666 + f * f * 24 }); op(o.e, K * (1 - f * f)); });
      op(nappeJet, K * 0.55);
      BR.forEach(o => { ap(o.e, { cx: FX + o.dir * Math.pow(o.d, 0.8) * 360 * Math.pow(F, 0.7), cy: 674 - o.h * F, rx: (90 + 100 * o.k) * (0.4 + 0.6 * F), ry: (34 + 30 * o.k) * (0.5 + 0.5 * F) }); op(o.e, F * (0.97 - 0.3 * o.d)); });
      op(gel, F * 0.9);
      // ---- étiquettes et pastilles
      [eGar, tGar].forEach(e => op(e, D.fenetre(t, T[0], E[1], 0.5))); op(eComp, D.lisse((t - T[0]) / 0.6));
      [eDet, tDet, eExt, tExt].forEach(e => op(e, D.lisse((t - A(4, 0.5)) / 0.5)));
      op(eBr, D.fenetre(t, T[5] + 0.8, E[5] + 0.3, 0.5));
      op(pPRP, D.fenetre(t, T[1] + 0.3, T[2] - 0.2, 0.4)); op(pTox, D.fenetre(t, A(1, 0.5), T[2] - 0.2, 0.4));
      op(pic, D.fenetre(t, T[2] + 0.2, T[3] - 0.2, 0.4)); op(pB2L, D.fenetre(t, A(2, 0.15), T[3] - 0.2, 0.4));
      op(pOdeur, D.fenetre(t, A(3, 0.35), T[4] - 0.2, 0.4)); op(pMonte, D.fenetre(t, A(4, 0.08), T[5] - 0.2, 0.4));
      op(pS[0], D.fenetre(t, T[6] + 0.3, T[7] - 0.2, 0.4)); op(pS[1], D.fenetre(t, A(6, 0.3), T[7] - 0.2, 0.4)); op(pS[2], D.fenetre(t, A(6, 0.65), T[7] - 0.2, 0.4));
      op(aVent, D.fenetre(t, A(6, 0.34), T[7] - 0.2, 0.4)); op(aEvac, D.fenetre(t, A(6, 0.4), T[7] - 0.2, 0.4));
      op(pFin, D.lisse((t - T[7] - 0.2) / 0.5));
      return { carte: 9.5, temp: 0.45, etat: "liquide", humeur: "surprise" };
    };
  };

  /* ---------- le tour en entier : la carte en grand, la molécule fait le tour, puis les quatre verbes ----------
     Chemin de la molécule : rangs de D.CIRCUIT_PTS (0 bouteille … 19 = 0). Pas de carte du coin. */
  S.resume = function (g, c) {
    const T = c.T, E = c.E;
    const cir = D.circuit(g, 340, 132, 920, true);
    const petite = D.heroine(g, { r: 30 }), grande = D.heroine(g, { r: 60 });
    const tempDe = w => D.courbe([[0, 0.05], [5, 0.07], [8.8, 0.1], [9.5, 0.95], [12, 0.95], [12.4, 0.55], [15.6, 0.52], [16.4, 0.05], [19, 0.05]], w, true);
    const etatDe = w => w >= 3 && w < 5 ? "bout" : w >= 5 && w < 13 ? "vapeur" : "liquide";
    // une phrase (k) → les organes surlignés ; k6 : un verbe après l'autre, puis tous
    const PAR_PHRASE = { 1: ["separateur", "evaporateur"], 2: ["separateur"], 3: ["compresseur", "separateurHuile"], 4: ["condenseur", "reservoir"], 5: ["flotteur", "separateur"] };
    const VERBES = [["bouillir", BLEU, ["evaporateur", "separateur"], 0.1], ["comprimer", ROUGE, ["compresseur", "separateurHuile"], 0.95], ["condenser", D.ORANGE, ["condenseur", "reservoir"], 1.85], ["détendre", VERT, ["flotteur"], 2.75]];
    const NOMS = ["separateur", "evaporateur", "compresseur", "separateurHuile", "condenseur", "reservoir", "flotteur", "potHuile"];
    // quatre pastilles alignées sous la carte (chacune apparaît à son verbe)
    const rangee4 = D.el("g", {}, g);
    let x = 0;
    const PAST = VERBES.map(([s, fond, , dt], i) => {
      let sep = null;
      if (i) { sep = D.texte(rangee4, x + 22, 754, "·", { "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: D.BLEU, "font-family": SANS }); x += 44; }
      const p = D.pastille(rangee4, x, 750, s, fond, 30, "start"); x += p.largeur;
      return { p: p, sep: sep, dt: dt };
    });
    rangee4.setAttribute("transform", "translate(" + (800 - x / 2).toFixed(1) + " 0)");
    return function (t) {
      const rep = [[0, 0]];
      [[1, 0, 3.8], [2, 3.8, 9], [3, 9, 12.3], [4, 12.3, 14.6], [5, 14.6, 19]].forEach(([k, a, b]) => { rep.push([T[k], a]); rep.push([E[k], b]); });
      const w = D.courbe(rep, t, true), wm = ((w % 19) + 19) % 19;
      const on = {};
      for (const k in PAR_PHRASE) if (t > T[k] && t < E[k] + 0.3) PAR_PHRASE[k].forEach(n => on[n] = true);
      const tv = t - T[6];
      VERBES.forEach(([, , orgs, dt], i) => { if ((tv > dt && tv < dt + 0.95) || tv > 3.9) orgs.forEach(n => on[n] = true); });
      NOMS.forEach(n => cir.surligne(n, !!on[n]));
      const [px, py] = cir.ecran(...D.circuitPoint(w));
      petite({ x: px, y: py, s: 0.85, t: t, temp: tempDe(wm), etat: etatDe(wm), humeur: wm > 9.5 && wm < 12.2 ? "chaud" : wm > 16.2 ? "froid" : "sourire" });
      grande({ x: 160, y: 470 + Math.sin(t * 2.2) * 8, t: t, temp: 0.1, etat: "liquide", regard: [1, 0], humeur: "sourire" });
      PAST.forEach(o => { const v = D.lisse((tv - o.dt + 0.1) / 0.4); op(o.p, v); if (o.sep) op(o.sep, v); });
      return {};
    };
  };
})();
