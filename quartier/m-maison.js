/* =====================================================================
   m-maison.js — LA MAISON INDIVIDUELLE, EN COUPE
   Zones : frigo, tableau, pac, clim, vmc. Cahier des charges : SPEC-3D.md.

   La maison que M. Lambda reconnaît comme la sienne : la cuisine et son
   réfrigérateur, le séjour chauffé par des radiateurs (pompe à chaleur
   air-eau), la chambre climatisée par un split, la salle de bains
   ventilée par une VMC simple flux, et des combles isolés sous une
   toiture en tuiles ouverte en écorché sur la charpente.

   Repère : 1 unité = 1 m, sol fini à y = 0, façade avant ouverte au plan
   z = FZ = 3. Emprise : x 5,5..17,3 et z −4,5..3 ; seuls les débords du
   toit (rives et égout, en hauteur) dépassent de quelques décimètres.
   ===================================================================== */

export function maison(H) {
  const P = H.P, FZ = H.FZ, alea = H.alea;
  const bx = H.bx, bxr = H.bxr, cy = H.cy, cyv = H.cyv, tube = H.tube, canal = H.canal,
    sp = H.sp, ext = H.ext, extX = H.extX;
  const ZF = "frigo", ZT = "tableau", ZP = "pac", ZC = "clim", ZV = "vmc";

  /* =====================================================================
     1. REPÈRES ET OUTILS
     ===================================================================== */
  const XG = 5.5, XGI = 5.8, XD = 15.5, XDI = 15.2;      /* murs gauche et droit : face extérieure, face intérieure */
  const ZA = -4.5, ZAI = -4.2;                            /* mur du fond : face extérieure, face intérieure */
  const XC0 = 9.75, XC1 = 9.85;                           /* la cloison cuisine | séjour et salle de bains | chambre */
  const Y1 = 2.7, YE = 2.95, YC = 5.6, YG = 5.8;          /* plafond du rez-de-chaussée, sol de l'étage, plafond de l'étage, dessus du plancher des combles */
  /* la toiture : faîtage parallèle à x en z = ZR ; YR = dessus des chevrons au faîtage ; les tuiles
     ajoutent T (liteaux) + TT (tuile), si bien que le faîtage fini est à y = 8,0 */
  const ZR = -0.75, YR = 7.91, PENTE = 0.5227, EPC = 0.16, T = 0.03, TT = 0.06, NEZ = 0.035;
  const ANG = Math.atan(PENTE) * 180 / Math.PI;
  const XR0 = 5.3, XR1 = 15.7, ZEA = -4.8;               /* débords : rives gauche et droite, égout arrière */
  const toitY = function (z) { return YR - PENTE * Math.abs(z - ZR); };   /* dessus des chevrons */
  const zy = function (pts) { return pts.map(function (p) { return [-p[0], p[1]]; }); };   /* profil [z, y] -> [u, v] de H.extX */

  const C = {
    enduit: "#f2e9d8", soub: "#d6c9b0", platre: "#fbfaf6",
    carreau: "#e9e2d3", joint: "#cfc5b0", parquet: "#d9b88b", lame: "#c09b69",
    faience: "#dbe8ee", jointF: "#c0d1da", sdbSol: "#e3e6e4",
    blanc: "#f7f7f3", inox: "#c3cad3", chrome: "#e1e6ec",
    charpente: "#c9a475", charpenteF: "#ad8350", facade: "#9cb3c7", plan: "#c39a66",
    tuile: "#c9765a"
  };

  /* Mur percé de baies. axe "x" : le mur court le long de x (épaisseur en z, e0..e1) ;
     axe "z" : il court le long de z (épaisseur en x). baies : [[u0, u1, y0, y1], …] sans recouvrement. */
  function murPerce(hex, axe, a0, a1, y0, y1, e0, e1, baies) {
    const R = function (u0, u1, v0, v1) {
      if (u1 - u0 < 1e-4 || v1 - v0 < 1e-4) return;
      if (axe === "x") bx(null, hex, u0, u1, v0, v1, e0, e1); else bx(null, hex, e0, e1, v0, v1, u0, u1);
    };
    let cur = a0;
    baies.slice().sort(function (p, q) { return p[0] - q[0]; }).forEach(function (b) {
      R(cur, b[0], y0, y1); R(b[0], b[1], y0, b[2]); R(b[0], b[1], b[3], y1);
      cur = b[1];
    });
    R(cur, a1, y0, y1);
  }

  /* Boîte posée dans le repère d'un mur : u le long du mur, w dans son épaisseur. */
  function bw(zn, axe, hex, u0, u1, y0, y1, w0, w1, o) {
    const p0 = Math.min(w0, w1), p1 = Math.max(w0, w1);
    if (axe === "x") bx(zn, hex, u0, u1, y0, y1, p0, p1, o); else bx(zn, hex, p0, p1, y0, y1, u0, u1, o);
  }

  /* Anneau fait de n petites boîtes tangentes (grilles de ventilateur) ; axe = normale du disque. */
  function anneau(zn, c, axe, x, y, z, r, ep, n) {
    n = n || 20;
    const L = 2 * r * Math.sin(Math.PI / n) * 1.1;
    for (let k = 0; k < n; k++) {
      const t = 2 * Math.PI * k / n, d = t * 180 / Math.PI;
      if (axe === "z") bxr(zn, c, x + r * Math.cos(t), y + r * Math.sin(t), z, L, ep, ep, 0, 0, d + 90);
      else bxr(zn, c, x, y + r * Math.cos(t), z + r * Math.sin(t), ep, L, ep, d + 90, 0, 0);
    }
  }
  /* Ventilateur vu de face : fond sombre, trois pales, moyeu, grille en anneaux et rayons. */
  function ventilateur(zn, axe, x, y, z, R, cadre) {
    const D = function (o) { return axe === "z" ? [x, y, z + o] : [x + o, y, z]; };
    let p = D(-0.006);
    cy(zn, "#14181d", p[0], p[1], p[2], R, 0.01, { axe: axe, seg: 24 });
    for (let k = 0; k < 3; k++) {
      const a = k * 120 + 20, ar = a * Math.PI / 180, rr = R * 0.5;
      if (axe === "z") bxr(zn, "#56606b", x + rr * Math.cos(ar), y + rr * Math.sin(ar), z + 0.002, R * 0.78, R * 0.34, 0.006, 0, 0, a);
      else bxr(zn, "#56606b", x + 0.002, y + rr * Math.cos(ar), z + rr * Math.sin(ar), 0.006, R * 0.78, R * 0.34, a, 0, 0);
    }
    p = D(0.006);
    cy(zn, "#2a313b", p[0], p[1], p[2], R * 0.17, 0.02, { axe: axe, seg: 12 });
    p = D(0.022);
    [0.32, 0.56, 0.8].forEach(function (f) { anneau(zn, "#262c33", axe, p[0], p[1], p[2], R * f, 0.009, 22); });
    anneau(zn, cadre || "#3a424c", axe, p[0], p[1], p[2], R * 1.0, 0.022, 26);
    for (let k = 0; k < 4; k++) {
      const a = k * 45;
      if (axe === "z") bxr(zn, "#262c33", p[0], p[1], p[2], 2 * R, 0.009, 0.009, 0, 0, a);
      else bxr(zn, "#262c33", p[0], p[1], p[2], 0.009, 2 * R, 0.009, a, 0, 0);
    }
  }
  /* Courbe de Bézier cubique échantillonnée (conduits souples). */
  function bez(p0, p1, p2, p3, n) {
    const r = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, u = 1 - t;
      r.push([0, 1, 2].map(function (k) { return u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k]; }));
    }
    return r;
  }
  /* Conduit souple annelé (aluminium) le long d'une polyligne. */
  function flexible(zn, c, cAnneau, pts, r) {
    canal(zn, c, pts, r, { seg: 10 });
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i];
      const d = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], L = Math.hypot(d[0], d[1], d[2]);
      const nb = Math.max(1, Math.floor(L / 0.034));
      for (let k = 0; k < nb; k++) {
        const t0 = (k + 0.3) / nb, t1 = t0 + 0.01 / L;
        tube(zn, cAnneau, a[0] + d[0] * t0, a[1] + d[1] * t0, a[2] + d[2] * t0, a[0] + d[0] * t1, a[1] + d[1] * t1, a[2] + d[2] * t1, r * 1.13, { seg: 10 });
      }
    }
  }

  /* =====================================================================
     2. LES SOLS ET LES PLANCHERS (trémie d'escalier x 14,4..15,2 / z −0,15..3)
     ===================================================================== */
  /* cuisine : carrelage clair et ses joints */
  bx(null, C.carreau, XGI, XC0, 0, 0.02, ZAI, FZ);
  for (let x = XGI + 0.4; x < XC0 - 0.05; x += 0.4) bx(null, C.joint, x - 0.006, x + 0.006, 0.02, 0.023, ZAI, FZ);
  for (let z = ZAI + 0.4; z < FZ - 0.05; z += 0.4) bx(null, C.joint, XGI, XC0, 0.02, 0.023, z - 0.006, z + 0.006);
  /* séjour : parquet à lames décalées */
  bx(null, C.parquet, XC1, XDI, 0, 0.02, ZAI, FZ);
  for (let z = ZAI + 0.16, r = 0; z < FZ - 0.02; z += 0.16, r++) {
    bx(null, C.lame, XC1, XDI, 0.02, 0.022, z - 0.005, z + 0.003);
    for (let x = XC1 + 0.35 + (r % 3) * 0.42; x < XDI - 0.1; x += 1.25) bx(null, C.lame, x, x + 0.008, 0.02, 0.022, z - 0.16, z);
  }
  /* dalle entre rez-de-chaussée et étage, avec la trémie de l'escalier */
  bx(null, P.beton, XGI, 14.4, Y1, YE, ZAI, FZ, { edge: 1 });
  bx(null, P.beton, 14.4, XDI, Y1, YE, ZAI, -0.15, { edge: 1 });
  bx(null, P.bleu, XGI, 14.4, Y1, YE, FZ, FZ + 0.06);                 /* la coupe en bleu nuit */
  /* salle de bains : carrelage gris clair */
  bx(null, C.sdbSol, XGI, XC0, YE, YE + 0.02, ZAI, FZ);
  for (let x = XGI + 0.3; x < XC0 - 0.05; x += 0.3) bx(null, "#cdd2d1", x - 0.005, x + 0.005, YE + 0.02, YE + 0.023, ZAI, FZ);
  for (let z = ZAI + 0.3; z < FZ - 0.05; z += 0.3) bx(null, "#cdd2d1", XGI, XC0, YE + 0.02, YE + 0.023, z - 0.005, z + 0.005);
  /* chambre : parquet clair */
  bx(null, "#e0c69d", XC1, 14.4, YE, YE + 0.02, ZAI, FZ);
  bx(null, "#e0c69d", 14.4, XDI, YE, YE + 0.02, ZAI, -0.15);
  for (let z = ZAI + 0.16; z < FZ - 0.02; z += 0.16) bx(null, "#cbad80", XC1, z < -0.15 ? XDI : 14.4, YE + 0.02, YE + 0.022, z - 0.005, z + 0.003);
  /* plancher des combles (dalle du plafond de l'étage) */
  bx(null, P.beton, XGI, XDI, YC, YG, ZAI, FZ, { edge: 1 });
  bx(null, P.bleu, XGI, XDI, YC, YG, FZ, FZ + 0.06);

  /* =====================================================================
     3. LES MURS, LES FENÊTRES ET LA CLOISON
     ===================================================================== */
  const FEN_FOND_RDC = [[7.3, 8.3, 1.05, 2.15], [10.75, 12.05, 0.95, 2.25], [13.15, 14.45, 0.95, 2.25]];
  const FEN_FOND_ET = [[6.35, 7.05, 4.15, 4.95], [13.3, 14.5, 3.85, 5.1]];
  const FEN_GAUCHE = [[-1.9, -0.7, 0.95, 2.2]];
  const FEN_DROITE_RDC = [[-1.5, -0.5, 0.95, 2.2]], FEN_DROITE_ET = [[-1.5, -0.5, 3.85, 5.05]];
  /* mur du fond (entre les deux murs latéraux), par niveau */
  murPerce(C.enduit, "x", XGI, XDI, 0, Y1, ZA, ZAI, FEN_FOND_RDC);
  murPerce(C.enduit, "x", XGI, XDI, Y1, YE, ZA, ZAI, []);
  murPerce(C.enduit, "x", XGI, XDI, YE, YG, ZA, ZAI, FEN_FOND_ET);
  /* murs latéraux sur toute la profondeur */
  murPerce(C.enduit, "z", ZA, FZ, 0, Y1, XG, XGI, FEN_GAUCHE);
  murPerce(C.enduit, "z", ZA, FZ, Y1, YG, XG, XGI, []);
  murPerce(C.enduit, "z", ZA, FZ, 0, Y1, XDI, XD, FEN_DROITE_RDC);
  murPerce(C.enduit, "z", ZA, FZ, Y1, YE, XDI, XD, []);
  murPerce(C.enduit, "z", ZA, FZ, YE, YG, XDI, XD, FEN_DROITE_ET);
  /* les pignons : triangle sous les rampants, jusqu'au faîtage */
  const PIGNON = zy([[ZA, YG], [FZ, YG], [FZ, toitY(FZ)], [ZR, YR], [ZA, toitY(ZA)]]);
  extX(null, C.enduit, PIGNON, XGI - XG, XG, 0, 0);
  extX(null, C.enduit, PIGNON, XD - XDI, XDI, 0, 0);
  /* soubassement plus foncé au pied des murs, à l'extérieur */
  bx(null, C.soub, XG, XD, 0, 0.32, ZA - 0.015, ZA);
  bx(null, C.soub, XG - 0.015, XG, 0, 0.32, ZA, FZ);
  bx(null, C.soub, XD, XD + 0.015, 0, 0.32, ZA, FZ);
  /* bandeau d'étage en légère saillie sur les murs extérieurs */
  bx(null, "#e6dcc8", XG - 0.03, XG, Y1, YE, ZA, FZ);
  bx(null, "#e6dcc8", XD, XD + 0.03, Y1, YE, ZA, FZ);
  bx(null, "#e6dcc8", XG - 0.03, XD + 0.03, Y1, YE, ZA - 0.03, ZA);
  /* la coupe des murs extérieurs : enduit, maçonnerie (bleu), isolant, plaque de plâtre */
  [[XG, XG + 0.02, "#e6dcc8"], [XG + 0.02, XG + 0.2, P.bleu], [XG + 0.2, XGI - 0.013, P.isolant], [XGI - 0.013, XGI, C.platre]].forEach(function (c) {
    bx(null, c[2], c[0], c[1], 0, YG, FZ, FZ + 0.06);
  });
  [[XD - 0.02, XD, "#e6dcc8"], [XD - 0.2, XD - 0.02, P.bleu], [XDI + 0.013, XD - 0.2, P.isolant], [XDI, XDI + 0.013, C.platre]].forEach(function (c) {
    bx(null, c[2], c[0], c[1], 0, YG, FZ, FZ + 0.06);
  });

  /* Fenêtre à un ou deux vantaux posée dans un mur (menuiserie près de la face intérieure),
     avec appui extérieur, tablette intérieure, et l'entrée d'air de la VMC dans les pièces sèches. */
  function fenetre(axe, u0, u1, y0, y1, eE, eI, o) {
    o = o || {};
    const s = eI > eE ? 1 : -1, em = eI - s * 0.1, f = 0.055;
    const d0 = em - s * 0.035, d1 = em + s * 0.035;
    const W = function (h, a0, a1, b0, b1, w0, w1, opt) { bw(null, axe, h, a0, a1, b0, b1, w0, w1, opt); };
    W(P.cadre, u0, u0 + f, y0, y1, d0, d1); W(P.cadre, u1 - f, u1, y0, y1, d0, d1);
    W(P.cadre, u0, u1, y0, y0 + f, d0, d1); W(P.cadre, u0, u1, y1 - f, y1, d0, d1);
    const deux = u1 - u0 > 0.8, um = (u0 + u1) / 2;
    if (deux) W(P.cadre, um - 0.03, um + 0.03, y0, y1, d0, d1);
    W(o.givre ? "#dfeaf0" : P.verre, u0 + f, u1 - f, y0 + f, y1 - f, em - 0.006, em + 0.006, { t: o.givre ? 0.82 : 0.42 });
    const pu = deux ? um + 0.055 : u1 - 0.09, pm = (y0 + y1) / 2;
    W("#e9ecef", pu - 0.012, pu + 0.012, pm - 0.09, pm + 0.02, d1, d1 + s * 0.035);
    W("#d9d2c2", u0 - 0.06, u1 + 0.06, y0 - 0.05, y0, eE - s * 0.05, d0);           /* appui extérieur */
    W("#eadfc8", u0 - 0.04, u1 + 0.04, y0 - 0.035, y0, d1, eI + s * 0.045);         /* tablette intérieure */
    if (o.entreeAir) {
      /* entrée d'air autoréglable sur la traverse haute : l'air neuf entre ici, la VMC l'extrait plus loin */
      const a0 = u0 + 0.1, a1 = (deux ? um : u1) - 0.1;
      bw(ZV, axe, "#f4f5f3", a0, a1, y1 - f + 0.004, y1 - 0.004, d1, d1 + s * 0.028);
      bw(ZV, axe, "#3a424c", a0 + 0.02, a1 - 0.02, y1 - f + 0.016, y1 - f + 0.028, d1 + s * 0.028, d1 + s * 0.031);
    }
  }
  /* Rideaux de part et d'autre d'une fenêtre, sur leur tringle. */
  function rideaux(axe, u0, u1, yT, yB, eI, hex) {
    const s = axe === "x" ? 1 : (eI > 10 ? -1 : 1);
    const w = eI + s * 0.09;
    const Wt = function (a, b, c, d) { if (axe === "x") tube(null, "#5c6875", a, b, w, c, d, w, 0.012, { seg: 6 }); else tube(null, "#5c6875", w, b, a, w, d, c, 0.012, { seg: 6 }); };
    Wt(u0 - 0.25, yT + 0.08, u1 + 0.25, yT + 0.08);
    [[u0 - 0.24, u0 + 0.06], [u1 - 0.06, u1 + 0.24]].forEach(function (p) {
      for (let k = 0; k < 4; k++) {
        const a = p[0] + k * (p[1] - p[0]) / 4, b = a + (p[1] - p[0]) / 4 + 0.01;
        bw(null, axe, k % 2 ? hex : "#c98c4f", a, b, yB, yT + 0.06, w - s * 0.025 + (k % 2 ? 0 : s * 0.02), w + s * 0.015 + (k % 2 ? 0 : s * 0.02));
      }
    });
  }
  FEN_FOND_RDC.forEach(function (b, i) { fenetre("x", b[0], b[1], b[2], b[3], ZA, ZAI, { entreeAir: i > 0 }); });
  fenetre("x", FEN_FOND_ET[0][0], FEN_FOND_ET[0][1], FEN_FOND_ET[0][2], FEN_FOND_ET[0][3], ZA, ZAI, { givre: 1 });
  fenetre("x", FEN_FOND_ET[1][0], FEN_FOND_ET[1][1], FEN_FOND_ET[1][2], FEN_FOND_ET[1][3], ZA, ZAI, { entreeAir: 1 });
  FEN_GAUCHE.forEach(function (b) { fenetre("z", b[0], b[1], b[2], b[3], XG, XGI); });
  FEN_DROITE_RDC.concat(FEN_DROITE_ET).forEach(function (b) { fenetre("z", b[0], b[1], b[2], b[3], XD, XDI, { entreeAir: 1 }); });
  /* Volets battants ouverts à plat contre la façade, de part et d'autre d'une fenêtre d'un mur
     latéral (s : sens vers l'extérieur, −1 à gauche, +1 à droite) : lames, pentures noires. */
  function volets(u0, u1, y0, y1, eE, s) {
    const w = (u1 - u0) / 2, x1 = eE + s * 0.035;
    [[u0 - w - 0.03, u0 - 0.03], [u1 + 0.03, u1 + w + 0.03]].forEach(function (v) {
      bw(null, "z", "#7f9fb6", v[0], v[1], y0 - 0.02, y1 + 0.02, eE, x1, { edge: 1 });
      for (let u = v[0] + 0.1; u < v[1] - 0.04; u += 0.1) bw(null, "z", "#6a8aa2", u, u + 0.008, y0 - 0.02, y1 + 0.02, x1, x1 + s * 0.003);
      [y0 + 0.15, y1 - 0.15].forEach(function (y) { bw(null, "z", "#2a313b", v[0] + 0.02, v[1] - 0.02, y - 0.018, y + 0.018, x1, x1 + s * 0.006); });
      bw(null, "z", "#2a313b", v[0] - 0.05, v[0] - 0.02, (y0 + y1) / 2 - 0.02, (y0 + y1) / 2 + 0.02, eE, eE + s * 0.05);   /* arrêt de volet */
    });
  }
  volets(FEN_GAUCHE[0][0], FEN_GAUCHE[0][1], FEN_GAUCHE[0][2], FEN_GAUCHE[0][3], XG, -1);
  volets(FEN_DROITE_RDC[0][0], FEN_DROITE_RDC[0][1], FEN_DROITE_RDC[0][2], FEN_DROITE_RDC[0][3], XD, 1);
  volets(FEN_DROITE_ET[0][0], FEN_DROITE_ET[0][1], FEN_DROITE_ET[0][2], FEN_DROITE_ET[0][3], XD, 1);
  /* rideaux chauds dans le séjour et la chambre */
  rideaux("x", 10.75, 12.05, 2.25, 0.86, ZAI, "#e0a54e");
  rideaux("x", 13.15, 14.45, 2.25, 0.86, ZAI, "#e0a54e");
  rideaux("x", 13.3, 14.5, 5.1, YE + 0.05, ZAI, "#8fb0c9");

  /* la cloison (rez-de-chaussée et étage) et ses deux portes, z 0,6..1,5 */
  murPerce("#f6f1e6", "z", ZAI, FZ, 0, Y1, XC0, XC1, [[0.6, 1.5, 0, 2.05]]);
  murPerce("#f6f1e6", "z", ZAI, FZ, YE, YC, XC0, XC1, [[0.6, 1.5, YE, YE + 2.05]]);
  bx(null, P.bleu, XC0, XC1, 0, Y1, FZ, FZ + 0.06);
  bx(null, P.bleu, XC0, XC1, YE, YC, FZ, FZ + 0.06);
  [0, YE].forEach(function (y0) {
    const yh = y0 + 2.05;
    bx(null, "#e7dcc6", XC0 - 0.012, XC1 + 0.012, y0, yh + 0.05, 0.55, 0.6);           /* huisserie */
    bx(null, "#e7dcc6", XC0 - 0.012, XC1 + 0.012, y0, yh + 0.05, 1.5, 1.55);
    bx(null, "#e7dcc6", XC0 - 0.012, XC1 + 0.012, yh, yh + 0.05, 0.55, 1.55);
    bx(null, "#efe6d4", XC1 + 0.006, XC1 + 0.046, y0 + 0.01, yh - 0.01, 1.56, 2.38, { edge: 1 });   /* vantail ouvert à plat */
    cy(null, "#8a94a1", XC1 + 0.07, y0 + 1.0, 2.28, 0.018, 0.05, { axe: "x", seg: 8 });             /* poignée */
    bx(null, "#8a94a1", XC1 + 0.08, XC1 + 0.095, y0 + 0.99, y0 + 1.01, 2.2, 2.29);
  });
  /* plinthes le long des murs intérieurs */
  [[0, XGI, XC0], [0, XC1, XDI], [YE, XGI, XC0], [YE, XC1, XDI]].forEach(function (p) {
    bx(null, "#e9e1cf", p[1], p[2], p[0], p[0] + 0.07, ZAI, ZAI + 0.012);
  });

  /* =====================================================================
     4. LA CHARPENTE : chevrons, pannes, panne faîtière et deux fermes
     ===================================================================== */
  const XCH = [XR0];
  for (let k = 0; k < 19; k++) XCH.push(5.85 + k * 0.5);
  XCH.push(15.13, XR1 - 0.07);
  XCH.forEach(function (x) {
    /* chevron du pan avant (du faîtage au plan de coupe) et du pan arrière (jusqu'au débord) */
    extX(null, C.charpente, zy([[ZR, YR], [FZ, toitY(FZ)], [FZ, toitY(FZ) - EPC], [ZR, YR - EPC]]), 0.07, x, 0, 0);
    extX(null, C.charpente, zy([[ZEA, toitY(ZEA)], [ZR, YR], [ZR, YR - EPC], [ZEA, toitY(ZEA) - EPC]]), 0.07, x, 0, 0);
  });
  /* panne faîtière et pannes intermédiaires, portées par les pignons (leurs bouts dépassent sous les rives) */
  bx(null, C.charpenteF, XR0, XR1, YR - EPC - 0.25, YR - EPC - 0.045, ZR - 0.08, ZR + 0.08, { edge: 1 });
  function panne(zc) {
    const zb = zc + (zc > ZR ? 0.05 : -0.05), yt = toitY(zb) - EPC;
    bx(null, C.charpenteF, XR0, XR1, yt - 0.18, yt, zc - 0.05, zc + 0.05, { edge: 1 });
  }
  panne(1.55); panne(-2.65);
  /* les fermes : entrait, poinçon, arbalétriers sous les pannes, contrefiches */
  const DYA = EPC + 0.18;
  function ferme(xf) {
    const x0 = xf - 0.04;
    bx(null, C.charpenteF, x0, x0 + 0.08, YG, YG + 0.17, ZAI + 0.05, FZ - 0.1);
    bx(null, C.charpenteF, x0, x0 + 0.08, YG + 0.17, YR - EPC - 0.24, ZR - 0.07, ZR + 0.07);
    const pied = (YR - (YG + 0.17 + DYA + 0.16)) / PENTE;
    [ZR + pied, ZR - pied].forEach(function (zp) {
      const zt = zp > ZR ? ZR + 0.07 : ZR - 0.07;
      extX(null, C.charpenteF, zy([[zt, toitY(zt) - DYA], [zp, toitY(zp) - DYA], [zp, toitY(zp) - DYA - 0.16], [zt, toitY(zt) - DYA - 0.16]]), 0.08, x0, 0, 0);
      const zm = (zp + ZR) / 2 + (zp > ZR ? 0.1 : -0.1);
      tube(null, C.charpenteF, xf, YG + 0.55, zt, xf, toitY(zm) - DYA - 0.12, zm, 0.035, { seg: 4 });
    });
  }
  ferme(9.2); ferme(12.4);
  /* l'écran de sous-toiture posé sur les chevrons du pan arrière (vu d'en dessous par l'écorché), et ses recouvrements */
  extX(null, "#cfd6dc", zy([[ZEA, toitY(ZEA) + 0.004], [ZR, YR + 0.004], [ZR, YR + 0.009], [ZEA, toitY(ZEA) + 0.009]]), XR1 - XR0, XR0, 0, 0);
  [-1.9, -3.1, -4.3].forEach(function (z) { bx(null, "#b7c1ca", XR0, XR1, toitY(z) + 0.001, toitY(z) + 0.0035, z - 0.035, z + 0.035); });
  /* les joints des parpaings sur la face intérieure du pignon gauche, côté combles */
  for (let y = YG + 0.2; y < YR - 0.25; y += 0.2) {
    const d = (YR - y) / PENTE - 0.05;
    bx(null, "#d6ccb8", XGI, XGI + 0.004, y, y + 0.012, ZR - d, Math.min(ZR + d, FZ));
  }

  /* =====================================================================
     5. LA COUVERTURE EN TUILES : rangs, faîtage, rives, gouttière.
        Le pan avant est ouvert en écorché au-dessus de la salle de bains
        (x 5,9..9,8) : on y voit les chevrons, les liteaux, la laine et la VMC.
     ===================================================================== */
  const NAV = 12, NAR = 13;
  const DAV = (FZ - ZR) / NAV, DAR = (ZEA - ZR) / NAR;
  const TUI = ["#cf7d60", "#c46f53", "#d68a6b", "#bf6a4f", "#cb7759"];
  /* un rang de tuiles : profil en dent de scie (le nez du rang recouvre le suivant) */
  function rang(z0, z1) {
    return zy([[z0, toitY(z0) + T + TT], [z1, toitY(z1) + T + TT + NEZ], [z1, toitY(z1) + T], [z0, toitY(z0) + T]]);
  }
  /* les ondes des tuiles romanes, une par colonne, posées sur le rang */
  function ondes(z0, z1, xa, xb) {
    for (let x = XR0 + 0.11; x < XR1 - 0.05; x += 0.21) {
      if (x < xa + 0.05 || x > xb - 0.05) continue;
      tube(null, TUI[Math.floor(alea() * TUI.length)], x, toitY(z0) + T + TT + 0.004, z0, x, toitY(z1) + T + TT + NEZ + 0.004, z1, 0.034, { seg: 6 });
    }
  }
  /* pan arrière, entier */
  for (let i = 1; i <= NAR; i++) {
    const z0 = ZR + DAR * (i - 1), z1 = ZR + DAR * i;
    extX(null, C.tuile, rang(z0, z1), XR1 - XR0, XR0, 0, 0);
    ondes(z0, z1, XR0, XR1);
  }
  /* pan avant : le premier rang entier, les suivants ouverts entre xL et xR (bords irréguliers) */
  const ECO = [];
  for (let i = 1; i <= NAV; i++) {
    const z0 = ZR + DAV * (i - 1), z1 = ZR + DAV * i;
    if (i === 1) { extX(null, C.tuile, rang(z0, z1), XR1 - XR0, XR0, 0, 0); ondes(z0, z1, XR0, XR1); continue; }
    const xL = 5.92 + 0.12 * alea(), xR = 9.78 + 0.42 * alea();
    ECO.push({ z0: z0, z1: z1, xL: xL, xR: xR });
    extX(null, C.tuile, rang(z0, z1), xL - XR0, XR0, 0, 0); ondes(z0, z1, XR0, xL);
    extX(null, C.tuile, rang(z0, z1), XR1 - xR, xR, 0, 0); ondes(z0, z1, xR, XR1);
  }
  /* dans l'écorché : les liteaux encore en place dans le haut, et les tranches des tuiles coupées */
  ECO.forEach(function (r, i) {
    if (i < 4) bx(null, "#d9bc8c", r.xL, r.xR, toitY(r.z0 + 0.03) - 0.002, toitY(r.z0 + 0.03) + T, r.z0 + 0.01, r.z0 + 0.05);
  });
  /* le faîtage : faîtières demi-rondes scellées au mortier (embarrure) */
  bx(null, "#ddd5c5", XR0, XR1, YR + T + TT - 0.06, YR + T + TT + 0.03, ZR - 0.17, ZR + 0.17);
  for (let x = XR0; x < XR1 - 0.01; x += 0.4) {
    cy(null, "#c56f52", Math.min(x + 0.2, XR1 - 0.2), YR + T + TT + 0.01, ZR, 0.13, 0.4, { axe: "x", seg: 14 });
    cy(null, "#b8654a", x, YR + T + TT + 0.01, ZR, 0.138, 0.05, { axe: "x", seg: 14 });
  }
  /* les rives : tuiles de rive en équerre sur les deux pignons */
  const RIVE = zy([[ZEA, toitY(ZEA) - 0.02], [ZR, YR - 0.02], [FZ, toitY(FZ) - 0.02], [FZ, toitY(FZ) + 0.17], [ZR, YR + 0.17], [ZEA, toitY(ZEA) + 0.17]]);
  extX(null, "#b8654a", RIVE, 0.05, XR0 - 0.05, 0, 0);
  extX(null, "#b8654a", RIVE, 0.05, XR1, 0, 0);
  /* égout arrière : planche de rive, gouttière en zinc, descente au coin droit */
  bx(null, "#e7dfcf", XR0, XR1, toitY(ZEA) - 0.22, toitY(ZEA) + 0.04, ZEA - 0.025, ZEA);
  cy(null, "#9fa8b1", (XR0 + XR1) / 2, toitY(ZEA) - 0.16, ZEA - 0.1, 0.075, XR1 - XR0, { axe: "x", seg: 12 });
  canal(null, "#9fa8b1", [[15.3, toitY(ZEA) - 0.2, ZEA - 0.1], [15.3, toitY(ZEA) - 0.5, ZA - 0.06], [15.3, 0.2, ZA - 0.06], [15.45, 0.06, ZA - 0.06]], 0.045, { seg: 10 });
  [1.0, 2.5, 4.0].forEach(function (y) { bx(null, "#7d8794", 15.25, 15.35, y, y + 0.04, ZA - 0.11, ZA); });
  /* la coupe de la toiture au plan z = 3 : tranche bleu nuit des rangs coupés et des chevrons */
  const ECO_DER = ECO[ECO.length - 1];
  bx(null, P.bleu, XR0, ECO_DER.xL, toitY(FZ) - EPC, toitY(FZ) + T + TT + NEZ, FZ, FZ + 0.06);
  bx(null, P.bleu, ECO_DER.xR, XR1, toitY(FZ) - EPC, toitY(FZ) + T + TT + NEZ, FZ, FZ + 0.06);
  XCH.forEach(function (x) { if (x > ECO_DER.xL && x + 0.07 < ECO_DER.xR) bx(null, P.bleu, x, x + 0.07, toitY(FZ) - EPC, toitY(FZ), FZ, FZ + 0.06); });

  /* =====================================================================
     6. LES COMBLES ISOLÉS : laine jaune sur le plancher, pincée sous les
        rampants, dégagée autour du caisson de VMC
     ===================================================================== */
  const YI = 6.08;
  const dI = (YR - EPC - YI) / PENTE, dB = (YR - EPC - YG) / PENTE;
  const LAINE = zy([[ZAI, YG], [ZAI, toitY(ZAI) - EPC], [ZR - dI, YI], [ZR + dI, YI], [ZR + dB - 0.01, YG + 0.004]]);
  extX(null, P.isolant, LAINE, 7.25 - XGI, XGI, 0, 0);
  extX(null, P.isolant, LAINE, XDI - 8.55, 8.55, 0, 0);
  extX(null, P.isolant, zy([[ZAI, YG], [ZAI, toitY(ZAI) - EPC], [ZR - dI, YI], [-2.75, YI], [-2.75, YG]]), 1.3, 7.25, 0, 0);
  extX(null, P.isolant, zy([[-1.65, YG], [-1.65, YI], [ZR + dI, YI], [ZR + dB - 0.01, YG + 0.004]]), 1.3, 7.25, 0, 0);
  /* l'aspect floconneux de la laine, là où l'écorché la montre */
  const LAI = ["#f0cf6b", "#e8c35a", "#f5d983", "#ecc964"];
  for (let k = 0; k < 70; k++) {
    const x = 5.95 + alea() * 3.75, z = -3.8 + alea() * 6.0;
    if (x > 7.15 && x < 8.65 && z > -2.85 && z < -1.55) continue;
    if (z > ZR + dI - 0.2) continue;
    sp(null, LAI[k % 4], x, YI - 0.005, z, 0.18 + alea() * 0.22, 0.025 + alea() * 0.03, 0.16 + alea() * 0.2, { seg: 8, seg2: 4 });
  }
  /* plateau d'OSB sous le caisson de VMC */
  bx(null, "#d8bf92", 7.25, 8.55, YG, YG + 0.022, -2.75, -1.65, { edge: 1 });

  /* =====================================================================
     7. L'ESCALIER DROIT, le long du mur de droite du séjour
     ===================================================================== */
  const NM = 14, HM = YE / NM, GIR = 3.0 / 13, ZST = 2.85;
  for (let i = 1; i <= 13; i++) {
    const y = i * HM, z0 = ZST - i * GIR, z1 = ZST - (i - 1) * GIR + 0.03;
    bx(null, "#d3b07d", 14.45, 15.15, y - 0.045, y, z0, z1, { edge: 1 });
  }
  const PL = 0.913;   /* pente de la volée */
  const LIMON = zy([[ZST + 0.03, 0], [ZST + 0.03, 0.27], [-0.15, 0.27 + (ZST + 0.18) * PL], [-0.15, 0.27 + (ZST + 0.18) * PL - 0.3], [ZST + 0.03 - 0.03 / PL, 0]]);
  extX(null, "#b08452", LIMON, 0.05, 14.4, 0, 0);
  extX(null, "#b08452", LIMON, 0.05, 15.15, 0, 0);
  /* main courante et barreaux côté vide */
  tube(null, "#8a5f35", 14.425, 1.15, ZST, 14.425, 1.15 + (ZST + 0.15) * PL, -0.15, 0.024, { seg: 8 });
  for (let k = 0; k <= 6; k++) {
    const z = ZST - k * (ZST + 0.15) / 6, yb = 0.27 + (ZST + 0.03 - z) * PL;
    tube(null, "#5c6875", 14.425, yb, z, 14.425, yb + 0.88, z, 0.011, { seg: 5 });
  }
  /* garde-corps de la trémie à l'étage */
  tube(null, "#8a5f35", 14.38, YE + 0.95, -0.15, 14.38, YE + 0.95, FZ - 0.02, 0.026, { seg: 8 });
  for (let z = -0.15; z < FZ; z += 0.13) cyv(null, "#5c6875", 14.38, YE, YE + 0.95, z, 0.011, { seg: 5 });
  bx(null, "#8a5f35", 14.35, 14.41, YE, YE + 0.05, -0.15, FZ - 0.02);

  /* =====================================================================
     8. LA CUISINE ET SON RÉFRIGÉRATEUR (frigo) — rez-de-chaussée, x 5,8..9,75
     ===================================================================== */
  /* --- le réfrigérateur-congélateur combiné --- */
  const RB = "#f4f4f0", RP = "#fbfbf8";
  bx(ZF, RB, 6.02, 6.68, 0.3, 1.85, -4.06, -3.56, { edge: 1 });         /* caisse */
  bx(ZF, RB, 6.02, 6.68, 0.06, 0.3, -3.84, -3.56, { edge: 1 });         /* pied de caisse : le compresseur loge derrière */
  bx(ZF, "#3a424c", 6.03, 6.67, 0.0, 0.065, -3.6, -3.53);              /* grille de socle (aération) */
  for (let k = 0; k < 9; k++) bx(ZF, "#1b1f24", 6.07 + k * 0.064, 6.1 + k * 0.064, 0.015, 0.05, -3.531, -3.527);
  bx(ZF, RP, 6.02, 6.68, 0.07, 0.715, -3.56, -3.5, { edge: 1 });        /* porte du congélateur (en bas) */
  bx(ZF, RP, 6.02, 6.68, 0.735, 1.845, -3.56, -3.5, { edge: 1 });       /* porte du réfrigérateur (en haut) */
  bx(ZF, "#c9ced4", 6.025, 6.675, 0.715, 0.735, -3.555, -3.51);         /* joint entre les deux portes */
  /* poignées verticales côté droit (charnières côté mur) */
  [[0.42, 0.68], [0.8, 1.32]].forEach(function (h) {
    bx(ZF, C.inox, 6.6, 6.625, h[0], h[1], -3.475, -3.455);
    bx(ZF, C.inox, 6.603, 6.622, h[0] + 0.01, h[0] + 0.035, -3.5, -3.475);
    bx(ZF, C.inox, 6.603, 6.622, h[1] - 0.035, h[1] - 0.01, -3.5, -3.475);
  });
  /* charnières côté mur */
  [0.1, 0.73, 1.82].forEach(function (y) { bx(ZF, "#9aa3ad", 6.015, 6.03, y, y + 0.03, -3.53, -3.49); });
  /* afficheur de température sur la porte */
  bx(ZF, "#1e2630", 6.38, 6.55, 1.52, 1.6, -3.5, -3.494);
  bx(ZF, "#8fe3ff", 6.39, 6.54, 1.53, 1.59, -3.494, -3.491, { lum: 1 });
  /* le dessin de l'enfant et les magnets */
  bx(ZF, "#fffdf8", 6.09, 6.33, 1.1, 1.42, -3.5, -3.496);
  cy(ZF, "#f2c94c", 6.28, 1.37, -3.495, 0.028, 0.004, { axe: "z", seg: 10 });
  bx(ZF, "#7fae6a", 6.11, 6.31, 1.13, 1.16, -3.496, -3.493);
  bx(ZF, "#e8914a", 6.15, 6.25, 1.16, 1.25, -3.496, -3.493);
  ext(ZF, "#d9573a", [[0, 0], [0.14, 0], [0.07, 0.07]], 0.003, 6.13, 1.25, -3.496);
  [[6.11, 1.41, "#d94f6a"], [6.31, 1.41, P.froidE], [6.45, 1.0, "#f2c94c"], [6.2, 0.55, "#7fae6a"]].forEach(function (m) {
    cy(ZF, m[2], m[0], m[1], -3.49, 0.02, 0.014, { axe: "z", seg: 10 });
  });
  /* au dos : le condenseur à grille noire (serpentin + fils soudés), en léger débord */
  const CN = "#1b1f24";
  for (let k = 0; k < 19; k++) {
    const y = 0.33 + k * 0.081;
    tube(ZF, CN, 6.0, y, -4.125, 6.7, y, -4.125, 0.0065, { seg: 5 });
    if (k < 18) { const xb = k % 2 ? 6.0 : 6.7; tube(ZF, CN, xb, y, -4.125, xb, y + 0.081, -4.125, 0.0065, { seg: 5 }); }
  }
  for (let k = 0; k < 14; k++) {
    const x = 6.01 + k * 0.052;
    bx(ZF, CN, x - 0.003, x + 0.003, 0.31, 1.9, -4.14, -4.134);
    bx(ZF, CN, x - 0.003, x + 0.003, 0.31, 1.9, -4.116, -4.11);
  }
  [0.5, 1.7].forEach(function (y) { bx(ZF, CN, 6.06, 6.64, y - 0.01, y + 0.01, -4.11, -4.06); });
  /* le compresseur (dôme noir) dans son logement, le bac d'évaporation, les tubes de cuivre */
  bx(ZF, "#3a424c", 6.18, 6.48, 0.0, 0.035, -4.05, -3.88);
  cyv(ZF, "#23282e", 6.33, 0.035, 0.16, -3.965, 0.075, { seg: 14 });
  sp(ZF, "#23282e", 6.33, 0.16, -3.965, 0.075, 0.055, 0.075, { seg: 12, seg2: 6 });
  cy(ZF, "#3a424c", 6.33, 0.12, -3.885, 0.03, 0.03, { axe: "z", seg: 8 });       /* boîtier de démarrage */
  bx(ZF, "#9aa3ad", 6.44, 6.66, 0.2, 0.235, -4.05, -3.87);                       /* bac d'évaporation */
  tube(ZF, P.cuivre, 6.38, 0.17, -3.98, 6.66, 0.33, -4.12, 0.006);               /* refoulement vers le condenseur */
  tube(ZF, P.cuivre, 6.27, 0.18, -3.97, 6.06, 0.32, -4.06, 0.008);               /* aspiration */

  /* --- le plan de travail, l'évier et son robinet, la plaque, le four, la hotte --- */
  bx(ZF, "#ece7dc", 6.75, 9.72, 0.1, 0.86, -4.2, -3.63, { edge: 1 });          /* caissons bas */
  bx(ZF, "#4a535e", 6.75, 9.72, 0, 0.1, -4.15, -3.66);                         /* plinthe en retrait */
  [[6.77, 7.33, "p"], [7.36, 7.79, "p"], [7.81, 8.24, "p"], [8.27, 8.73, "t"], [9.37, 9.7, "p"]].forEach(function (p, i) {
    if (p[2] === "p") {
      bx(ZF, C.facade, p[0], p[1], 0.12, 0.84, -3.63, -3.605, { edge: 1 });
      const hx = i === 1 ? p[1] - 0.05 : p[0] + 0.05;
      bx(ZF, "#2a313b", hx - 0.008, hx + 0.008, 0.6, 0.8, -3.605, -3.59);
    } else {
      [[0.12, 0.36], [0.38, 0.6], [0.62, 0.84]].forEach(function (t) {
        bx(ZF, C.facade, p[0], p[1], t[0], t[1], -3.63, -3.605, { edge: 1 });
        bx(ZF, "#2a313b", p[0] + 0.12, p[1] - 0.12, t[1] - 0.05, t[1] - 0.035, -3.605, -3.59);
      });
    }
  });
  /* le four encastré : porte en verre noir, poignée, bandeau de commandes */
  bx(ZF, "#23282e", 8.77, 9.33, 0.14, 0.7, -3.63, -3.6, { edge: 1 });
  bx(ZF, "#3d4650", 8.83, 9.27, 0.22, 0.58, -3.6, -3.598);
  bx(ZF, C.inox, 8.8, 9.3, 0.62, 0.64, -3.58, -3.56);
  bx(ZF, "#2a313b", 8.77, 9.33, 0.72, 0.84, -3.63, -3.6);
  [8.86, 9.24].forEach(function (x) { cy(ZF, C.inox, x, 0.78, -3.59, 0.022, 0.02, { axe: "z", seg: 10 }); });
  bx(ZF, "#ffb347", 9.0, 9.1, 0.765, 0.795, -3.6, -3.597, { lum: 1 });
  /* le plan de travail en bois */
  bx(ZF, C.plan, 6.72, 9.74, 0.86, 0.9, -4.2, -3.57, { edge: 1 });
  /* l'évier inox : rebord, bac en creux, égouttoir rainuré, bonde */
  bx(ZF, C.inox, 7.42, 8.18, 0.9, 0.906, -4.12, -3.68);
  bx(ZF, "#8e98a3", 7.47, 7.92, 0.9, 0.908, -4.07, -3.73);
  bx(ZF, "#aab3bd", 7.95, 8.15, 0.906, 0.908, -4.07, -3.73);
  for (let k = 0; k < 5; k++) bx(ZF, "#8e98a3", 7.97, 8.13, 0.908, 0.91, -4.05 + k * 0.07, -4.04 + k * 0.07);
  cy(ZF, "#5c6875", 7.695, 0.909, -3.9, 0.025, 0.003, { seg: 10 });
  /* le mitigeur col de cygne et son levier */
  cyv(ZF, C.chrome, 7.695, 0.906, 0.95, -4.08, 0.026, { seg: 12 });
  cyv(ZF, C.chrome, 7.695, 0.95, 1.2, -4.08, 0.016, { seg: 10 });
  canal(ZF, C.chrome, [[7.695, 1.2, -4.08], [7.695, 1.27, -4.03], [7.695, 1.265, -3.95], [7.695, 1.17, -3.9]], 0.013, { seg: 8 });
  cy(ZF, C.chrome, 7.695, 1.16, -3.9, 0.017, 0.022, { seg: 8 });
  tube(ZF, C.chrome, 7.695, 0.96, -4.08, 7.695, 1.04, -4.16, 0.008, { seg: 6 });
  /* la plaque de cuisson vitrocéramique et sa casserole */
  bx(ZF, "#1e2228", 8.78, 9.38, 0.9, 0.91, -4.12, -3.66);
  [[8.92, -3.8, 0.09], [9.2, -3.8, 0.075], [8.92, -4.0, 0.07], [9.2, -4.0, 0.09]].forEach(function (f) {
    cy(ZF, "#4a535e", f[0], 0.911, f[1], f[2], 0.002, { seg: 16 });
    cy(ZF, "#1e2228", f[0], 0.912, f[1], f[2] - 0.012, 0.002, { seg: 16 });
  });
  cyv(ZF, "#b9c0c7", 8.92, 0.912, 1.03, -3.8, 0.085, { seg: 16 });
  cyv(ZF, "#8a94a1", 8.92, 1.03, 1.04, -3.8, 0.088, { seg: 16 });
  tube(ZF, "#2a313b", 8.92, 1.0, -3.715, 8.92, 1.0, -3.6, 0.01, { seg: 6 });
  /* la hotte : casquette inox et cheminée jusqu'au plafond */
  ext(ZF, C.inox, [[8.76, 0], [9.4, 0], [9.28, 0.12], [8.88, 0.12]], 0.48, 0, 1.58, -4.18);
  bx(ZF, "#8e98a3", 8.8, 9.36, 1.575, 1.585, -4.15, -3.72);
  bx(ZF, C.inox, 8.94, 9.22, 1.7, Y1, -4.2, -3.96, { edge: 1 });
  bx(ZF, "#fff3c4", 8.85, 8.9, 1.57, 1.575, -3.85, -3.8, { lum: 1 });
  bx(ZF, "#fff3c4", 9.26, 9.31, 1.57, 1.575, -3.85, -3.8, { lum: 1 });
  /* la crédence en faïence entre plan et meubles hauts */
  bx(ZF, "#e3ece8", 6.72, 7.3, 0.9, 1.45, ZAI, ZAI + 0.008);
  bx(ZF, "#e3ece8", 7.3, 8.3, 0.9, 1.01, ZAI, ZAI + 0.008);
  bx(ZF, "#e3ece8", 8.3, 9.74, 0.9, 1.58, ZAI, ZAI + 0.008);
  for (let y = 1.0; y < 1.56; y += 0.1) {
    bx(ZF, "#c9d6d1", 6.72, 7.3, y, y + 0.006, ZAI + 0.008, ZAI + 0.01);
    bx(ZF, "#c9d6d1", 8.3, 9.74, y, y + 0.006, ZAI + 0.008, ZAI + 0.01);
  }
  /* meubles hauts : au-dessus du réfrigérateur et à gauche de la fenêtre */
  bx(ZF, "#ece7dc", 6.0, 6.7, 1.98, 2.42, -4.2, -3.62, { edge: 1 });
  bx(ZF, C.facade, 6.01, 6.69, 2.0, 2.4, -3.62, -3.6, { edge: 1 });
  bx(ZF, "#2a313b", 6.25, 6.45, 2.02, 2.035, -3.6, -3.585);
  bx(ZF, "#ece7dc", 6.75, 7.25, 1.45, 2.25, -4.2, -3.88, { edge: 1 });
  bx(ZF, C.facade, 6.76, 7.24, 1.47, 2.23, -3.88, -3.86, { edge: 1 });
  bx(ZF, "#2a313b", 7.18, 7.195, 1.5, 1.68, -3.86, -3.845);
  /* étagère ouverte à droite de la hotte, avec ses bocaux */
  bx(ZF, C.plan, 9.42, 9.74, 1.62, 1.65, -4.2, -3.95);
  [[9.48, "#e8914a"], [9.57, "#f2c94c"], [9.66, "#a9c79a"]].forEach(function (b) {
    cyv(ZF, "#dfe9ee", b[0], 1.65, 1.8, -4.07, 0.035, { seg: 10 });
    cyv(ZF, b[1], b[0], 1.66, 1.75, -4.07, 0.03, { seg: 10 });
    cyv(ZF, "#8a94a1", b[0], 1.8, 1.82, -4.07, 0.037, { seg: 10 });
  });
  /* sur le plan : bouilloire, planche à découper et pain, basilic sur la fenêtre */
  cyv(ZF, "#d9573a", 7.0, 0.9, 1.1, -3.95, 0.075, { seg: 14, rt: 0.06 });
  cyv(ZF, "#2a313b", 7.0, 0.9, 0.92, -3.95, 0.08, { seg: 14 });
  tube(ZF, "#2a313b", 6.93, 1.08, -3.88, 6.93, 1.13, -3.95, 0.01, { seg: 5 });
  bx(ZF, "#c9a26a", 8.3, 8.66, 0.9, 0.92, -4.05, -3.8, { edge: 1 });
  sp(ZF, "#d9a35b", 8.48, 0.96, -3.92, 0.13, 0.045, 0.06, { seg: 10, seg2: 6 });
  cyv(ZF, "#c9765a", 7.95, 1.015, 1.12, -4.33, 0.05, { seg: 10 });
  sp(ZF, P.feuilleF, 7.95, 1.18, -4.33, 0.08, 0.07, 0.06, { seg: 8, seg2: 6 });

  /* --- la table de la cuisine et ses quatre chaises (décor) --- */
  bx(null, "#d3b07d", 7.0, 8.4, 0.72, 0.76, -2.0, -1.0, { edge: 1 });
  [[7.08, -1.92], [8.32, -1.92], [7.08, -1.08], [8.32, -1.08]].forEach(function (p) { bx(null, "#b08452", p[0] - 0.03, p[0] + 0.03, 0, 0.72, p[1] - 0.03, p[1] + 0.03); });
  bx(null, "#f4efe4", 7.3, 8.1, 0.76, 0.765, -1.75, -1.25);
  cy(null, "#e9e5db", 7.7, 0.79, -1.5, 0.13, 0.05, { seg: 14, rt: 0.15 });
  [["#e8914a", 7.66, -1.47], ["#d94f6a", 7.75, -1.53], ["#a9c79a", 7.7, -1.42], ["#f2c94c", 7.62, -1.55]].forEach(function (f) { sp(null, f[0], f[1], 0.84, f[2], 0.04, 0.04, 0.04, { seg: 8, seg2: 6 }); });
  function chaise(x, z, rot) {
    /* rot : côté du dossier, en x (±1) ou en z (±2) */
    bx(null, "#c8a374", x - 0.2, x + 0.2, 0.43, 0.47, z - 0.2, z + 0.2, { edge: 1 });
    [[-0.17, -0.17], [0.17, -0.17], [-0.17, 0.17], [0.17, 0.17]].forEach(function (d) { bx(null, "#a57a48", x + d[0] - 0.018, x + d[0] + 0.018, 0, 0.43, z + d[1] - 0.018, z + d[1] + 0.018); });
    if (Math.abs(rot) === 1) bx(null, "#a57a48", x + rot * 0.18 - 0.02, x + rot * 0.18 + 0.02, 0.47, 0.92, z - 0.19, z + 0.19);
    else bx(null, "#a57a48", x - 0.19, x + 0.19, 0.47, 0.92, z + Math.sign(rot) * 0.18 - 0.02, z + Math.sign(rot) * 0.18 + 0.02);
  }
  chaise(7.4, -2.25, -2); chaise(8.0, -2.25, -2); chaise(7.4, -0.75, 2); chaise(8.0, -0.75, 2);
  /* l'horloge sur la cloison, côté cuisine */
  cy(null, "#2a313b", XC0 - 0.02, 2.1, -2.6, 0.17, 0.03, { axe: "x", seg: 20 });
  cy(null, "#fbfaf5", XC0 - 0.04, 2.1, -2.6, 0.15, 0.01, { axe: "x", seg: 20 });
  bx(null, "#2a313b", XC0 - 0.05, XC0 - 0.045, 2.1, 2.22, -2.61, -2.59);
  bx(null, "#2a313b", XC0 - 0.05, XC0 - 0.045, 2.09, 2.11, -2.6, -2.5);

  /* =====================================================================
     9. LE TABLEAU ÉLECTRIQUE (tableau) — sur la cloison, face au séjour
     ===================================================================== */
  const XT = 9.97;                                   /* face avant du coffret */
  bx(ZT, "#f1f2f3", XC1, XT, 1.2, 2.1, -1.2, -0.5, { edge: 1 });
  bx(ZT, "#d5dae0", XT, XT + 0.004, 1.23, 2.07, -1.17, -0.53);     /* le fond du coffret, porte ouverte */
  const MW = 0.0345, ZM1 = -0.55;
  /* chaque rangée, lue de gauche à droite face au tableau (de +z vers −z) :
     D = interrupteur différentiel 30 mA (2 modules), d = disjoncteur divisionnaire,
     F = parafoudre, K = contacteur heures creuses (2 modules chacun), o = obturateur */
  const RANGS = [[1.95, "DDdddddddddoooooo"], [1.74, "DDddddddddooooooo"], [1.53, "DDdddddddddoooooo"], [1.32, "DDddFFKKdoooooooo"]];
  RANGS.forEach(function (rg) {
    const yc = rg[0], s = rg[1];
    bx(ZT, "#aab3bd", XT, XT + 0.012, yc - 0.018, yc + 0.018, -1.165, -0.535);     /* rail DIN */
    let k = 0, zFinPeigne = ZM1;
    while (k < s.length) {
      const t = s[k], large = t === "D" || t === "F" || t === "K", w = (large ? 2 : 1) * MW;
      const z0 = ZM1 - k * MW - w, zc = z0 + w / 2;
      if (t === "o") {
        bx(ZT, "#eceef0", XT, XT + 0.03, yc - 0.055, yc + 0.055, z0 + 0.001, z0 + w - 0.001);
      } else {
        bx(ZT, "#fbfbf8", XT, XT + 0.06, yc - 0.07, yc + 0.07, z0 + 0.0015, z0 + w - 0.0015);
        bx(ZT, "#eceef0", XT + 0.06, XT + 0.066, yc - 0.035, yc + 0.045, z0 + 0.004, z0 + w - 0.004);
        if (t === "D") {
          bx(ZT, "#2f6db5", XT + 0.06, XT + 0.067, yc + 0.048, yc + 0.064, z0 + 0.006, z0 + w - 0.006);   /* bandeau bleu */
          bx(ZT, "#f2c94c", XT + 0.066, XT + 0.074, yc - 0.03, yc - 0.012, zc + 0.012, zc + 0.026);       /* bouton test */
          bx(ZT, "#2a313b", XT + 0.066, XT + 0.082, yc + 0.0, yc + 0.03, zc - 0.022, zc + 0.004);          /* manette */
        } else if (t === "F") {
          bx(ZT, "#9aa3ad", XT + 0.06, XT + 0.067, yc - 0.06, yc + 0.06, z0 + 0.004, z0 + w - 0.004);
          bx(ZT, "#39c77a", XT + 0.067, XT + 0.07, yc + 0.01, yc + 0.03, zc - 0.012, zc + 0.012, { lum: 1 });
        } else if (t === "K") {
          bx(ZT, "#2a313b", XT + 0.066, XT + 0.078, yc - 0.005, yc + 0.02, zc - 0.012, zc + 0.012);
          bx(ZT, "#e34a3a", XT + 0.066, XT + 0.07, yc + 0.035, yc + 0.045, zc - 0.006, zc + 0.006, { lum: 1 });
        } else {
          bx(ZT, "#2a313b", XT + 0.066, XT + 0.082, yc + 0.0, yc + 0.03, zc - 0.007, zc + 0.007);          /* manette */
          bx(ZT, ["#7a4a2a", "#2f6db5", "#e34a3a", "#2a313b"][k % 4], XT + 0.066, XT + 0.068, yc - 0.06, yc - 0.045, zc - 0.007, zc + 0.007);
        }
        /* le fil qui descend de chaque appareil vers la nappe de la rangée */
        tube(ZT, t === "D" ? "#2f6db5" : "#7a4a2a", XT + 0.03, yc - 0.07, zc, XT + 0.03, yc - 0.09, zc, 0.0035, { seg: 4 });
        zFinPeigne = z0;
      }
      k += large ? 2 : 1;
    }
    /* le peigne d'alimentation sur le haut de la rangée, avec ses dents de cuivre */
    bx(ZT, "#8f98a3", XT + 0.008, XT + 0.045, yc + 0.072, yc + 0.088, zFinPeigne + 0.002, ZM1 - 0.002);
    for (let z = ZM1 - MW / 2; z > zFinPeigne; z -= MW) bx(ZT, P.cuivre, XT + 0.018, XT + 0.03, yc + 0.062, yc + 0.074, z - 0.004, z + 0.004);
    /* nappe de fils sous la rangée (phase marron, neutre bleu, terre vert-jaune) */
    [["#7a4a2a", 0.09], ["#2f6db5", 0.096], ["#8fbf3a", 0.102]].forEach(function (f) {
      tube(ZT, f[0], XT + 0.03, yc - f[1], zFinPeigne, XT + 0.03, yc - f[1], ZM1 - 0.01, 0.0035, { seg: 4 });
    });
  });
  /* bornier de terre vert-jaune et répartiteur de neutre bleu, en bas du coffret */
  for (let k = 0; k < 12; k++) bx(ZT, k % 2 ? "#3a9a4a" : "#e8c72e", XT, XT + 0.032, 1.232, 1.262, -1.12 + k * 0.03, -1.09 + k * 0.03);
  for (let k = 0; k < 6; k++) cy(ZT, "#c3cad3", XT + 0.033, 1.247, -1.105 + k * 0.06, 0.007, 0.004, { axe: "x", seg: 6 });
  bx(ZT, "#2f6db5", XT, XT + 0.032, 1.232, 1.262, -0.73, -0.56);
  tube(ZT, "#8fbf3a", XT + 0.02, 1.247, -1.13, XT + 0.02, 1.15, -1.13, 0.006, { seg: 5 });
  /* la porte, grande ouverte à angle droit (charnières côté z −1,2), et le schéma dans sa pochette */
  bx(ZT, "#f7f7f5", XT, XT + 0.69, 1.2, 2.1, -1.235, -1.21, { edge: 1 });
  bx(ZT, "#e7ebee", XT + 0.08, XT + 0.6, 1.3, 2.0, -1.21, -1.205);
  bx(ZT, "#fffdf8", XT + 0.12, XT + 0.56, 1.36, 1.94, -1.205, -1.2);
  for (let k = 0; k < 7; k++) bx(ZT, "#9aa5b1", XT + 0.16, XT + 0.5 - (k % 3) * 0.06, 1.85 - k * 0.07, 1.857 - k * 0.07, -1.2, -1.198);
  [1.3, 2.0].forEach(function (y) { cyv(ZT, "#9aa3ad", XT - 0.004, y - 0.04, y + 0.04, -1.215, 0.01, { seg: 6 }); });
  /* sortie des câbles par le haut (le reste du câblage est tiré par le calque électrique) */
  bx(ZT, "#d9dde3", XC1, 9.95, 2.1, 2.22, -0.95, -0.75, { edge: 1 });
  /* à côté : le disjoncteur de branchement (bouton rouge) et le compteur communicant vert */
  bx(ZT, "#e9ecef", XC1, 9.87, 1.35, 2.12, -0.44, -0.16);
  bx(ZT, "#c9ced4", 9.87, 9.95, 1.43, 1.66, -0.4, -0.2, { edge: 1 });
  bx(ZT, "#2a313b", 9.95, 9.975, 1.52, 1.6, -0.33, -0.27);
  cy(ZT, "#d63a2f", 9.96, 1.47, -0.24, 0.016, 0.02, { axe: "x", seg: 10 });
  bx(ZT, "#8fbf4a", 9.87, 9.94, 1.75, 2.06, -0.4, -0.2, { edge: 1 });
  bx(ZT, "#1e2630", 9.94, 9.943, 1.95, 2.02, -0.36, -0.24);
  bx(ZT, "#d8f5e1", 9.943, 9.945, 1.96, 2.01, -0.35, -0.25, { lum: 1 });
  [[-0.33, "#2a313b"], [-0.27, "#2a313b"]].forEach(function (b) { cy(ZT, b[1], 9.945, 1.88, b[0], 0.012, 0.01, { axe: "x", seg: 8 }); });
  cy(ZT, "#39c77a", 9.944, 1.82, -0.3, 0.006, 0.006, { axe: "x", seg: 6, lum: 1 });

  /* =====================================================================
     10. LE SÉJOUR ET SES RADIATEURS (pac) — rez-de-chaussée, x 9,85..15,2
     ===================================================================== */
  /* radiateur à panneaux (type 22) : panneaux cannelés, grille du dessus, consoles, raccords bas ;
     robinet thermostatique d'un côté (sens −1 : à gauche, +1 : à droite), té de réglage de l'autre */
  function radiateur(x0, x1, sens) {
    bx(ZP, "#f7f7f4", x0, x1, 0.2, 0.8, -4.17, -4.07, { edge: 1 });
    for (let x = x0 + 0.02; x < x1 - 0.03; x += 0.05) bx(ZP, "#fdfdfb", x, x + 0.03, 0.215, 0.785, -4.07, -4.055);
    bx(ZP, "#e6e8ea", x0, x1, 0.8, 0.806, -4.17, -4.07);
    for (let k = 0; k < 6; k++) bx(ZP, "#a7aeb6", x0 + 0.02, x1 - 0.02, 0.806, 0.808, -4.16 + k * 0.016, -4.153 + k * 0.016);
    bx(ZP, "#eef0f1", x0 - 0.008, x0, 0.2, 0.8, -4.17, -4.07);
    bx(ZP, "#eef0f1", x1, x1 + 0.008, 0.2, 0.8, -4.17, -4.07);
    [x0 + 0.15, x1 - 0.15].forEach(function (x) { bx(ZP, "#8a94a1", x - 0.02, x + 0.02, 0.7, 0.78, ZAI, -4.17); });
    cy(ZP, C.chrome, x1 + 0.02, 0.76, -4.12, 0.009, 0.03, { axe: "x", seg: 6 });            /* purgeur */
    const xa = sens < 0 ? x0 + 0.1 : x1 - 0.1, xb = sens < 0 ? x1 - 0.1 : x0 + 0.1, s = sens;
    /* robinet thermostatique : corps chromé sous le panneau, tête blanche tournée vers l'extérieur */
    cyv(ZP, C.chrome, xa, 0.07, 0.2, -4.12, 0.016, { seg: 8 });
    cy(ZP, C.chrome, xa + s * 0.04, 0.12, -4.12, 0.02, 0.08, { axe: "x", seg: 10 });
    cy(ZP, "#f7f7f4", xa + s * 0.135, 0.12, -4.12, 0.034, 0.11, { axe: "x", seg: 14 });
    [0.1, 0.13, 0.16].forEach(function (d) { cy(ZP, "#c9ced4", xa + s * d, 0.12, -4.12, 0.0355, 0.008, { axe: "x", seg: 14 }); });
    cy(ZP, "#3b82c4", xa + s * 0.192, 0.12, -4.12, 0.012, 0.004, { axe: "x", seg: 8 });
    /* té de réglage (retour), de l'autre côté */
    cyv(ZP, C.chrome, xb, 0.07, 0.2, -4.12, 0.016, { seg: 8 });
    cy(ZP, C.chrome, xb - s * 0.035, 0.12, -4.12, 0.019, 0.07, { axe: "x", seg: 10 });
    cy(ZP, "#c9ced4", xb - s * 0.08, 0.12, -4.12, 0.015, 0.025, { axe: "x", seg: 6 });
  }
  radiateur(10.8, 12.0, -1);
  radiateur(13.2, 14.4, -1);
  /* le thermostat d'ambiance sur la cloison, côté séjour : il pilote la pompe à chaleur */
  bx(ZP, "#f7f7f4", XC1, XC1 + 0.03, 1.42, 1.58, -2.24, -2.1, { edge: 1 });
  bx(ZP, "#1e2630", XC1 + 0.03, XC1 + 0.033, 1.5, 1.555, -2.21, -2.13);
  bx(ZP, "#ffb347", XC1 + 0.033, XC1 + 0.035, 1.51, 1.545, -2.2, -2.14, { lum: 1 });
  cy(ZP, "#c9ced4", XC1 + 0.035, 1.46, -2.17, 0.014, 0.008, { axe: "x", seg: 10 });

  /* --- le séjour en décor : canapé, table basse, meuble télé, tapis, plante, lampadaire --- */
  bx(null, "#d39b6a", 11.2, 14.0, 0.02, 0.03, -0.9, 1.75);
  bx(null, "#a8573d", 11.2, 14.0, 0.03, 0.032, -0.9, -0.82);
  bx(null, "#a8573d", 11.2, 14.0, 0.03, 0.032, 1.67, 1.75);
  /* canapé tourné vers la télévision (dossier vers nous) */
  const CAN = "#4f7f95", CANF = "#3f6a80";
  bx(null, CANF, 11.4, 13.8, 0.08, 0.4, 0.5, 1.5, { edge: 1 });
  bx(null, CAN, 11.6, 13.6, 0.4, 0.52, 0.52, 1.28, { edge: 1 });
  [[11.6, 12.6], [12.6, 13.6]].forEach(function (c) { bx(null, CAN, c[0] + 0.01, c[1] - 0.01, 0.4, 0.53, 0.52, 1.28); });
  bx(null, CAN, 11.4, 13.8, 0.4, 0.92, 1.28, 1.5, { edge: 1 });
  bx(null, CANF, 11.4, 11.6, 0.4, 0.66, 0.5, 1.5, { edge: 1 });
  bx(null, CANF, 13.6, 13.8, 0.4, 0.66, 0.5, 1.5, { edge: 1 });
  [[11.9, "#e0a54e"], [13.25, "#f2efe6"]].forEach(function (c) { bxr(null, c[1], c[0], 0.68, 1.18, 0.36, 0.34, 0.1, -12, 0, 0); });
  [[11.45, 0.55], [13.75, 0.55], [11.45, 1.45], [13.75, 1.45]].forEach(function (p) { cyv(null, "#2a313b", p[0], 0, 0.08, p[1], 0.025, { seg: 6 }); });
  /* table basse, livre et tasse */
  bx(null, "#c8a374", 12.1, 13.1, 0.36, 0.4, -0.45, 0.15, { edge: 1 });
  [[12.15, -0.4], [13.05, -0.4], [12.15, 0.1], [13.05, 0.1]].forEach(function (p) { bx(null, "#8a5f35", p[0] - 0.025, p[0] + 0.025, 0, 0.36, p[1] - 0.025, p[1] + 0.025); });
  bx(null, "#d94f6a", 12.3, 12.55, 0.4, 0.43, -0.3, -0.1);
  cyv(null, "#f7f5ef", 12.85, 0.4, 0.48, -0.1, 0.035, { seg: 10 });
  /* meuble télé et téléviseur entre les deux fenêtres */
  bx(null, "#c8a374", 12.1, 13.1, 0, 0.45, -4.2, -3.8, { edge: 1 });
  bx(null, "#b08452", 12.12, 12.6, 0.06, 0.4, -3.8, -3.79);
  bx(null, "#b08452", 12.62, 13.08, 0.06, 0.4, -3.8, -3.79);
  bx(null, "#1e2630", 12.18, 13.02, 0.7, 1.2, -4.2, -4.16, { edge: 1 });
  bx(null, "#2c3e57", 12.2, 13.0, 0.72, 1.18, -4.16, -4.158);
  bx(null, "#3d5675", 12.22, 12.55, 0.95, 1.16, -4.158, -4.157);
  /* plante verte près de l'escalier, lampadaire dans le coin du fond */
  cyv(null, "#c9765a", 10.4, 0, 0.35, 2.55, 0.16, { seg: 12, rt: 0.19 });
  sp(null, P.feuilleF, 10.4, 0.8, 2.55, 0.3, 0.42, 0.3, { seg: 8, seg2: 6 });
  sp(null, P.feuille, 10.5, 1.05, 2.5, 0.2, 0.25, 0.2, { seg: 8, seg2: 6 });
  cy(null, "#2a313b", 14.75, 0.015, -3.4, 0.14, 0.03, { seg: 12 });
  cyv(null, "#2a313b", 14.75, 0.03, 1.55, -3.4, 0.014, { seg: 6 });
  cy(null, "#f4e3c3", 14.75, 1.62, -3.4, 0.17, 0.2, { seg: 14, rt: 0.11 });
  cy(null, "#fff3c4", 14.75, 1.53, -3.4, 0.15, 0.01, { seg: 14, lum: 1 });
  /* cadre photo au mur de droite, horloge sur la cloison côté séjour */
  bx(null, "#8a5f35", XDI - 0.025, XDI, 1.4, 1.9, -2.7, -2.1, { edge: 1 });
  bx(null, "#bcd8ee", XDI - 0.027, XDI - 0.025, 1.45, 1.85, -2.65, -2.15);
  bx(null, "#a9c79a", XDI - 0.028, XDI - 0.027, 1.45, 1.6, -2.65, -2.15);

  /* =====================================================================
     11. LA POMPE À CHALEUR AIR-EAU MONOBLOC (pac) — dehors, à droite
     ===================================================================== */
  /* lit de gravier, dalle béton, plots antivibratiles, rails galvanisés */
  bx(null, "#d6cfc2", XD + 0.05, 17.28, 0, 0.03, -3.45, -1.35);
  for (let k = 0; k < 40; k++) {
    const x = XD + 0.12 + alea() * 1.7, z = -3.4 + alea() * 2.0;
    if (x > 15.88 && z > -3.22 && z < -1.58) continue;
    sp(null, ["#bdb4a5", "#cfc8bb", "#a99f90"][k % 3], x, 0.03, z, 0.035, 0.02, 0.03, { seg: 6, seg2: 4 });
  }
  bx(ZP, "#cfcac0", 15.9, 17.2, 0.03, 0.13, -3.2, -1.6, { edge: 1 });
  [-2.65, -2.12].forEach(function (z) {
    [16.05, 17.05].forEach(function (x) { cyv(ZP, "#23282e", x, 0.13, 0.19, z, 0.045, { seg: 10 }); });
    bx(ZP, P.galva, 15.98, 17.12, 0.19, 0.3, z - 0.04, z + 0.04, { edge: 1 });
  });
  /* la caisse et son couvercle */
  const PB = "#eceeed";
  bx(ZP, PB, 15.96, 17.14, 0.3, 1.27, -2.75, -2.02, { edge: 1 });
  bx(ZP, "#d9dcdf", 15.94, 17.16, 1.27, 1.3, -2.77, -2.0, { edge: 1 });
  /* face avant (+z) : le grand ventilateur à grille et le panneau de service */
  ventilateur(ZP, "z", 16.38, 0.8, -2.0, 0.37, "#c3c8cd");
  bx(ZP, "#e2e5e7", 16.86, 17.13, 0.33, 1.24, -2.02, -2.012, { edge: 1 });
  [[16.9, 0.38], [17.09, 0.38], [16.9, 1.19], [17.09, 1.19]].forEach(function (v) { cy(ZP, "#9aa3ad", v[0], v[1], -2.01, 0.006, 0.004, { axe: "z", seg: 6 }); });
  bx(ZP, "#2a313b", 16.94, 17.05, 0.92, 0.96, -2.012, -1.995);
  bx(ZP, P.froidE, 16.0, 16.2, 1.17, 1.23, -2.02, -2.016);
  /* côté droit : persiennes ; dos et côté mur : la batterie à ailettes derrière sa grille */
  for (let y = 0.4; y < 1.2; y += 0.055) bx(ZP, "#c3c8cd", 17.14, 17.152, y, y + 0.022, -2.7, -2.07);
  bx(ZP, "#4a535e", 15.98, 17.12, 0.34, 1.24, -2.77, -2.75);
  for (let x = 15.99; x < 17.11; x += 0.022) bx(ZP, "#9aa3ad", x, x + 0.006, 0.35, 1.23, -2.776, -2.77);
  for (let y = 0.42; y < 1.2; y += 0.12) tube(ZP, "#5c6875", 15.98, y, -2.785, 17.12, y, -2.785, 0.004, { seg: 4 });
  bx(ZP, "#4a535e", 15.94, 15.96, 0.62, 1.24, -2.73, -2.04);
  for (let z = -2.72; z < -2.05; z += 0.022) bx(ZP, "#9aa3ad", 15.934, 15.94, 0.63, 1.23, z, z + 0.006);
  /* raccords d'eau côté mur : départ (vanne rouge) et retour (vanne bleue), purge des condensats */
  [[-2.32, "#d63a2f"], [-2.48, P.froidE]].forEach(function (r) {
    cy(ZP, "#c8a24a", 15.93, 0.5, r[0], 0.022, 0.06, { axe: "x", seg: 10 });
    sp(ZP, "#c8a24a", 15.915, 0.5, r[0], 0.03, 0.03, 0.03, { seg: 10, seg2: 6 });
    bx(ZP, r[1], 15.905, 15.925, 0.53, 0.55, r[0] - 0.01, r[0] + 0.07);
  });
  tube(ZP, "#2a313b", 16.5, 0.3, -2.3, 16.5, 0.13, -2.3, 0.012, { seg: 6 });
  /* la sonde de température extérieure, à l'abri sur le mur : elle règle la loi d'eau de la PAC */
  bx(ZP, "#f7f7f4", XD, XD + 0.045, 1.95, 2.08, -3.92, -3.8, { edge: 1 });
  for (let k = 0; k < 3; k++) bx(ZP, "#9aa3ad", XD + 0.045, XD + 0.047, 1.97 + k * 0.03, 1.98 + k * 0.03, -3.9, -3.82);
  tube(ZP, "#d9dde3", XD + 0.02, 1.95, -3.86, XD + 0.02, 1.6, -3.86, 0.006, { seg: 5 });

  /* =====================================================================
     12. LA CHAMBRE ET SON SPLIT MURAL (clim) — étage, x 9,85..15,2
     ===================================================================== */
  /* l'unité intérieure : profil arrondi, grille d'aspiration dessus, volet de soufflage dessous */
  const SPL = "#f8f8f5";
  extX(ZC, SPL, zy([[ZAI, 4.77], [ZAI, 5.05], [-4.03, 5.05], [-3.975, 5.025], [-3.952, 4.97], [-3.952, 4.87], [-3.97, 4.81], [-4.02, 4.777], [-4.1, 4.768]]), 1.0, 11.6, 0, 0);
  bx(ZC, "#eef0f1", 11.598, 11.6, 4.775, 5.045, -4.19, -3.96);
  bx(ZC, "#eef0f1", 12.6, 12.602, 4.775, 5.045, -4.19, -3.96);
  bx(ZC, "#d9dde1", 11.62, 12.58, 4.905, 4.909, -3.954, -3.949);
  for (let k = 0; k < 7; k++) bx(ZC, "#b9c0c7", 11.65, 12.55, 5.05, 5.054, -4.17 + k * 0.022, -4.162 + k * 0.022);
  bx(ZC, "#3a424c", 11.66, 12.54, 4.762, 4.785, -4.1, -3.99);
  for (let x = 11.72; x < 12.52; x += 0.09) bx(ZC, "#c9ced4", x, x + 0.008, 4.765, 4.784, -4.08, -4.0);
  bxr(ZC, "#e9ebec", 12.1, 4.742, -3.962, 0.9, 0.012, 0.095, 38, 0, 0);       /* volet ouvert, bord avant vers le bas */
  bx(ZC, "#1e2630", 12.36, 12.5, 4.84, 4.875, -3.953, -3.947);
  bx(ZC, "#8fe3ff", 12.37, 12.43, 4.848, 4.867, -3.947, -3.945, { lum: 1 });
  cy(ZC, "#39c77a", 12.47, 4.857, -3.946, 0.005, 0.004, { axe: "z", seg: 6, lum: 1 });
  /* départ des liaisons côté droit, au dos (le reste est tiré par le calque clim) */
  tube(ZC, P.armaflex, 12.58, 4.83, -4.12, 12.7, 4.83, -4.12, 0.018, { seg: 8 });
  tube(ZC, P.armaflex, 12.58, 4.88, -4.12, 12.7, 4.88, -4.12, 0.014, { seg: 8 });
  /* la télécommande, posée sur la table de chevet */
  bx(ZC, "#f7f7f4", 10.1, 10.2, YE + 0.5, YE + 0.515, -0.86, -0.7, { edge: 1 });
  bx(ZC, "#1e2630", 10.12, 10.18, YE + 0.515, YE + 0.517, -0.84, -0.8);
  cy(ZC, P.froidE, 10.15, YE + 0.517, -0.75, 0.01, 0.004, { seg: 8 });

  /* --- la chambre en décor : armoire, lit double, chevets, bureau, tapis --- */
  const YS = YE + 0.02;
  bx(null, "#d6bf98", 9.9, 11.2, YS, YS + 2.15, -4.2, -3.6, { edge: 1 });
  bx(null, "#e2cfaa", 9.92, 10.54, YS + 0.08, YS + 2.1, -3.6, -3.585, { edge: 1 });
  bx(null, "#e2cfaa", 10.56, 11.18, YS + 0.08, YS + 2.1, -3.6, -3.585, { edge: 1 });
  [10.5, 10.6].forEach(function (x) { bx(null, "#8a5f35", x - 0.008, x + 0.008, YS + 0.95, YS + 1.25, -3.585, -3.57); });
  /* le lit, tête contre la cloison */
  bx(null, "#b08452", XC1 + 0.03, XC1 + 0.1, YS, YS + 1.05, -2.6, -1.0, { edge: 1 });
  bx(null, "#c8a374", 9.95, 11.95, YS + 0.12, YS + 0.36, -2.55, -1.05, { edge: 1 });
  [[9.98, -2.52], [11.92, -2.52], [9.98, -1.08], [11.92, -1.08]].forEach(function (p) { bx(null, "#8a5f35", p[0] - 0.025, p[0] + 0.025, YS, YS + 0.12, p[1] - 0.025, p[1] + 0.025); });
  bx(null, "#fbfaf6", 9.97, 11.93, YS + 0.36, YS + 0.55, -2.53, -1.07);
  bx(null, "#6f93b5", 10.55, 11.97, YS + 0.53, YS + 0.6, -2.57, -1.03, { edge: 1 });
  bx(null, "#6f93b5", 10.55, 11.97, YS + 0.32, YS + 0.6, -2.585, -2.57);
  bx(null, "#6f93b5", 10.55, 11.97, YS + 0.32, YS + 0.6, -1.03, -1.015);
  bx(null, "#6f93b5", 11.97, 11.985, YS + 0.32, YS + 0.6, -2.585, -1.015);
  bx(null, "#f4efe4", 10.45, 10.6, YS + 0.55, YS + 0.615, -2.56, -1.04);
  sp(null, "#fbfaf6", 10.2, YS + 0.63, -2.15, 0.17, 0.065, 0.3, { seg: 10, seg2: 6 });
  sp(null, "#fbfaf6", 10.2, YS + 0.63, -1.45, 0.17, 0.065, 0.3, { seg: 10, seg2: 6 });
  /* chevets et lampes de chevet */
  [[-3.0, -2.62], [-0.98, -0.6]].forEach(function (c) {
    bx(null, "#d6bf98", 9.9, 10.35, YS, YS + 0.5, c[0], c[1], { edge: 1 });
    bx(null, "#8a5f35", 10.06, 10.2, YS + 0.36, YS + 0.38, c[1], c[1] + 0.012);
  });
  cyv(null, "#c9765a", 10.12, YS + 0.5, YS + 0.72, -2.81, 0.04, { seg: 10 });
  cy(null, "#f4e3c3", 10.12, YS + 0.8, -2.81, 0.12, 0.16, { seg: 12, rt: 0.08 });
  cy(null, "#fff3c4", 10.12, YS + 0.725, -2.81, 0.1, 0.01, { seg: 12, lum: 1 });
  /* bureau sous la fenêtre, chaise, ordinateur */
  bx(null, "#e2cfaa", 13.3, 14.5, YS + 0.72, YS + 0.76, -4.2, -3.6, { edge: 1 });
  bx(null, "#b08452", 13.32, 13.37, YS, YS + 0.72, -4.15, -3.65);
  bx(null, "#b08452", 14.43, 14.48, YS, YS + 0.72, -4.15, -3.65);
  bx(null, "#2a313b", 13.7, 14.1, YS + 0.76, YS + 0.775, -3.95, -3.7);
  bxr(null, "#2a313b", 13.9, YS + 0.9, -3.96, 0.4, 0.27, 0.012, -12, 0, 0);
  bxr(null, "#bcd8ee", 13.9, YS + 0.9, -3.952, 0.37, 0.24, 0.004, -12, 0, 0, { lum: 1 });
  bx(null, "#3f6a80", 13.7, 14.1, YS + 0.44, YS + 0.49, -3.4, -3.0, { edge: 1 });
  bx(null, "#3f6a80", 13.7, 14.1, YS + 0.49, YS + 0.95, -3.0, -2.96);
  cyv(null, "#2a313b", 13.9, YS + 0.05, YS + 0.44, -3.2, 0.025, { seg: 6 });
  cy(null, "#2a313b", 13.9, YS + 0.03, -3.2, 0.22, 0.03, { seg: 5 });
  /* tapis et tableau au-dessus du lit (côté chambre de la cloison) */
  bx(null, "#d9c6a8", 10.4, 12.6, YS, YS + 0.008, -3.1, -0.5);
  bx(null, "#e8914a", 10.4, 12.6, YS + 0.008, YS + 0.01, -3.1, -3.0);
  bx(null, "#8a5f35", XC1, XC1 + 0.025, YE + 1.35, YE + 1.95, -2.2, -1.4, { edge: 1 });
  bx(null, "#f2c94c", XC1 + 0.025, XC1 + 0.027, YE + 1.4, YE + 1.9, -2.15, -1.45);
  bx(null, "#8fb0c9", XC1 + 0.027, XC1 + 0.029, YE + 1.4, YE + 1.62, -2.15, -1.45);

  /* =====================================================================
     13. L'UNITÉ EXTÉRIEURE DE LA CLIM (clim) — sur équerres, mur de droite
     ===================================================================== */
  [-3.0, -2.4].forEach(function (z) {
    bx(ZC, P.galva, XD, 16.4, 3.58, 3.63, z - 0.025, z + 0.025, { edge: 1 });        /* bras de l'équerre */
    bx(ZC, P.galva, XD, XD + 0.03, 3.08, 3.66, z - 0.035, z + 0.035);                /* platine murale */
    tube(ZC, P.galva, XD + 0.02, 3.14, z, 16.12, 3.6, z, 0.016, { seg: 4 });          /* jambe de force */
    [3.15, 3.55].forEach(function (y) { cy(ZC, "#5c6875", XD + 0.035, y, z, 0.012, 0.012, { axe: "x", seg: 6 }); });
    [15.85, 16.2].forEach(function (x) { cyv(ZC, "#23282e", x, 3.63, 3.68, z, 0.035, { seg: 10 }); });
  });
  const UE = "#eeefed";
  bx(ZC, UE, 15.72, 16.3, 3.68, 4.27, -3.15, -2.25, { edge: 1 });
  bx(ZC, "#dfe2e4", 15.7, 16.32, 4.27, 4.3, -3.17, -2.23, { edge: 1 });
  /* face avant (+x) : ventilateur à grille, et à côté le capot des vannes */
  ventilateur(ZC, "x", 16.3, 3.97, -2.83, 0.24, "#c3c8cd");
  bx(ZC, "#e2e5e7", 16.3, 16.308, 3.72, 4.22, -2.52, -2.28, { edge: 1 });
  for (let y = 3.78; y < 4.18; y += 0.05) bx(ZC, "#c3c8cd", 16.308, 16.312, y, y + 0.018, -2.49, -2.31);
  bx(ZC, P.froidE, 16.3, 16.305, 4.18, 4.22, -3.05, -2.9);
  /* côté gauche et dos : la batterie à ailettes */
  bx(ZC, "#4a535e", 15.74, 16.28, 3.7, 4.25, -3.17, -3.15);
  for (let x = 15.75; x < 16.27; x += 0.02) bx(ZC, "#9aa3ad", x, x + 0.006, 3.71, 4.24, -3.176, -3.17);
  bx(ZC, "#4a535e", 15.7, 15.72, 3.7, 4.25, -3.13, -2.27);
  /* les vannes de service et les liaisons calorifugées vers le mur (raccord en 15,55 ; 3,8 ; −2,7) */
  [[3.76, 0.02], [3.86, 0.014]].forEach(function (v) {
    cy(ZC, "#c8a24a", 15.69, v[0], -2.7, v[1] + 0.01, 0.04, { axe: "x", seg: 8 });
    tube(ZC, P.armaflex, 15.67, v[0], -2.7, XD + 0.05, v[0], -2.7, v[1] + 0.006, { seg: 8 });
  });
  tube(ZC, "#2a313b", 16.0, 3.68, -2.4, 16.0, 3.4, -2.4, 0.008, { seg: 5 });          /* évacuation des condensats */

  /* =====================================================================
     14. LA SALLE DE BAINS (décor) — étage, x 5,8..9,75
     ===================================================================== */
  /* faïence au mur du fond (sous la fenêtre) et au mur de gauche (côté baignoire) */
  bx(null, C.faience, XGI, XC0, YE, 4.12, ZAI, ZAI + 0.008);
  bx(null, C.faience, XGI, XGI + 0.008, YE, 4.6, ZAI, -3.3);
  for (let y = YE + 0.2; y < 4.12; y += 0.2) bx(null, C.jointF, XGI, XC0, y, y + 0.006, ZAI + 0.008, ZAI + 0.01);
  for (let x = XGI + 0.2; x < XC0; x += 0.2) bx(null, C.jointF, x, x + 0.006, YE, 4.12, ZAI + 0.008, ZAI + 0.01);
  /* la baignoire, son mitigeur, sa barre de douche et son pare-baignoire */
  bx(null, "#fbfbf8", XGI + 0.01, 7.55, YE, YE + 0.55, ZAI + 0.008, -3.45, { edge: 1 });
  bx(null, "#d7e7ef", 5.9, 7.45, YE + 0.53, YE + 0.555, -4.1, -3.55);
  cyv(null, C.chrome, 6.7, YE + 0.75, YE + 0.8, -4.17, 0.03, { seg: 10 });
  tube(null, C.chrome, 6.62, YE + 0.77, -4.17, 6.78, YE + 0.77, -4.17, 0.012, { seg: 6 });
  tube(null, C.chrome, 6.7, YE + 0.75, -4.17, 6.7, YE + 0.7, -4.08, 0.012, { seg: 6 });
  cyv(null, C.chrome, 6.15, YE + 0.8, YE + 1.95, -4.17, 0.012, { seg: 6 });
  canal(null, "#c9ced4", [[6.7, YE + 0.77, -4.15], [6.45, YE + 0.62, -4.08], [6.2, YE + 0.9, -4.1], [6.15, YE + 1.6, -4.12]], 0.008, { seg: 5 });
  cy(null, C.chrome, 6.15, YE + 1.66, -4.08, 0.055, 0.025, { seg: 12, axe: "z" });
  bx(null, P.verre, 6.85, 7.53, YE + 0.55, YE + 1.95, -3.47, -3.455, { t: 0.3 });
  bx(null, C.chrome, 6.85, 7.53, YE + 1.93, YE + 1.95, -3.475, -3.45);
  /* le meuble vasque, son miroir et sa réglette lumineuse */
  bx(null, C.plan, 8.15, 9.05, YE + 0.05, YE + 0.8, ZAI + 0.008, -3.7, { edge: 1 });
  bx(null, "#d3b07d", 8.17, 9.03, YE + 0.42, YE + 0.78, -3.7, -3.69);
  bx(null, "#d3b07d", 8.17, 9.03, YE + 0.07, YE + 0.4, -3.7, -3.69);
  [0.6, 0.25].forEach(function (y) { bx(null, "#2a313b", 8.45, 8.75, YE + y, YE + y + 0.015, -3.69, -3.68); });
  bx(null, "#fbfbf8", 8.15, 9.05, YE + 0.8, YE + 0.9, ZAI + 0.008, -3.68, { edge: 1 });
  bx(null, "#d7e7ef", 8.3, 8.9, YE + 0.88, YE + 0.905, -4.05, -3.78);
  cyv(null, C.chrome, 8.6, YE + 0.9, YE + 1.05, -4.1, 0.016, { seg: 8 });
  tube(null, C.chrome, 8.6, YE + 1.04, -4.1, 8.6, YE + 1.04, -3.98, 0.01, { seg: 6 });
  bx(null, "#8a94a1", 8.2, 9.0, YE + 1.08, YE + 1.82, ZAI + 0.008, ZAI + 0.025, { edge: 1 });
  bx(null, "#cfe3ee", 8.23, 8.97, YE + 1.11, YE + 1.79, ZAI + 0.025, ZAI + 0.028);
  bx(null, "#fff7dc", 8.3, 8.9, YE + 1.86, YE + 1.9, ZAI + 0.01, ZAI + 0.06, { lum: 1 });
  cyv(null, "#8fb6c9", 8.25, YE + 0.9, YE + 1.0, -3.9, 0.03, { seg: 8 });
  /* le WC au sol, réservoir contre le mur de gauche, plaque de commande sur le côté */
  bx(null, "#fbfbf8", XGI, XGI + 0.2, YE + 0.4, YE + 0.85, -2.35, -1.85, { edge: 1 });
  bx(null, "#c9ced4", XGI + 0.2, XGI + 0.205, YE + 0.72, YE + 0.8, -2.15, -2.05);
  cyv(null, "#fbfbf8", 6.2, YE, YE + 0.26, -2.1, 0.13, { seg: 14, rt: 0.15 });
  sp(null, "#fbfbf8", 6.24, YE + 0.33, -2.1, 0.25, 0.1, 0.19, { seg: 14, seg2: 6 });
  cy(null, "#f4f4f0", 6.26, YE + 0.43, -2.1, 0.205, 0.03, { seg: 16 });
  bx(null, "#f4f4f0", XGI + 0.2, XGI + 0.24, YE + 0.38, YE + 0.46, -2.25, -1.95);
  /* sèche-serviettes et serviette bleue */
  [-1.15, -0.7].forEach(function (z) { cyv(null, "#f7f7f3", XGI + 0.05, YE + 0.35, YE + 1.55, z, 0.016, { seg: 6 }); });
  for (let y = YE + 0.4; y < YE + 1.55; y += 0.09) tube(null, "#f7f7f3", XGI + 0.05, y, -1.15, XGI + 0.05, y, -0.7, 0.01, { seg: 5 });
  bx(null, "#6f93b5", XGI + 0.07, XGI + 0.1, YE + 0.7, YE + 1.3, -1.1, -0.75);
  /* tapis de bain */
  bx(null, "#8fb6c9", 6.2, 7.2, YE + 0.02, YE + 0.03, -3.3, -2.85);

  /* =====================================================================
     15. LA VMC SIMPLE FLUX (vmc) : bouche d'extraction, conduit souple,
         caisson dans les combles, conduit de rejet, sortie de toit
     ===================================================================== */
  /* la bouche d'extraction au plafond de la salle de bains */
  cy(ZV, "#f7f7f4", 8.6, 5.585, -2.5, 0.1, 0.03, { seg: 18 });
  cy(ZV, "#3a424c", 8.6, 5.565, -2.5, 0.08, 0.012, { seg: 18 });
  cy(ZV, "#fbfbf8", 8.6, 5.545, -2.5, 0.064, 0.02, { seg: 18, rt: 0.05 });
  /* le caisson, posé sur plots antivibratiles */
  [[7.48, -2.52], [8.32, -2.52], [7.48, -1.88], [8.32, -1.88]].forEach(function (p) { cyv(ZV, "#23282e", p[0], YG + 0.022, 5.86, p[1], 0.03, { seg: 8 }); });
  bx(ZV, "#eef0f1", 7.4, 8.4, 5.86, 6.25, -2.6, -1.8, { edge: 1 });
  bx(ZV, "#dfe3e6", 7.55, 8.25, 6.25, 6.27, -2.45, -1.95, { edge: 1 });
  [[7.45, -2.55], [8.35, -2.55], [7.45, -1.85], [8.35, -1.85]].forEach(function (p) { cy(ZV, "#9aa3ad", p[0], 6.252, p[1], 0.008, 0.004, { seg: 6 }); });
  bx(ZV, P.froidE, 7.6, 7.85, 6.0, 6.12, -1.8, -1.797);
  bx(ZV, "#2a313b", 7.43, 7.5, 5.95, 6.02, -1.8, -1.79);
  canal(ZV, "#d9dde3", [[7.465, 5.985, -1.79], [7.465, 5.985, -1.6], [7.3, YI + 0.02, -1.5]], 0.008, { seg: 5 });
  /* les piquages d'aspiration (côté +x) : un relié à la salle de bains, deux bouchés */
  cy(ZV, "#dfe3e6", 8.44, 6.05, -2.35, 0.046, 0.08, { axe: "x", seg: 12 });
  [-2.12, -1.94].forEach(function (z) {
    cy(ZV, "#dfe3e6", 8.43, 6.05, z, 0.04, 0.06, { axe: "x", seg: 12 });
    cy(ZV, "#2a313b", 8.465, 6.05, z, 0.043, 0.012, { axe: "x", seg: 12 });
  });
  /* le piquage de rejet (côté +z) */
  cy(ZV, "#dfe3e6", 7.75, 6.05, -1.75, 0.07, 0.1, { axe: "z", seg: 14 });
  /* conduit souple de la bouche au caisson */
  flexible(ZV, "#cfd4da", "#aab1b9", bez([8.6, YC + 0.02, -2.5], [8.6, 6.35, -2.5], [8.82, 6.06, -2.35], [8.48, 6.05, -2.35], 9), 0.045);
  /* conduit de rejet du caisson à la sortie de toit, entre deux chevrons */
  const YTR = toitY(-1.4);
  flexible(ZV, "#cfd4da", "#aab1b9", bez([7.75, 6.05, -1.7], [7.75, 6.05, -1.4], [7.6, 6.4, -1.4], [7.6, YTR - 0.05, -1.4], 10), 0.07);
  /* la sortie de toit : tuile à douille, conduit, chapeau pare-pluie */
  bxr(ZV, "#b8664a", 7.6, YTR + T + TT + 0.02, -1.4, 0.42, 0.03, 0.5, -ANG, 0, 0);
  cyv(ZV, "#b8664a", 7.6, YTR, YTR + 0.6, -1.4, 0.085, { seg: 14 });
  cyv(ZV, "#9a5540", 7.6, YTR + 0.58, YTR + 0.62, -1.4, 0.095, { seg: 14 });
  [0, 120, 240].forEach(function (a) {
    const r = a * Math.PI / 180;
    tube(ZV, "#2a313b", 7.6 + 0.07 * Math.cos(r), YTR + 0.62, -1.4 + 0.07 * Math.sin(r), 7.6 + 0.09 * Math.cos(r), YTR + 0.72, -1.4 + 0.09 * Math.sin(r), 0.008, { seg: 4 });
  });
  cy(ZV, "#2a313b", 7.6, YTR + 0.735, -1.4, 0.16, 0.025, { seg: 16 });
  cy(ZV, "#2a313b", 7.6, YTR + 0.8, -1.4, 0.16, 0.11, { seg: 16, rt: 0.02 });

  /* =====================================================================
     16. LES LUMINAIRES (éclairés), LES PRISES, LES INTERRUPTEURS, LE DAAF
     ===================================================================== */
  /* Plaque d'appareillage posée sur un mur : i = interrupteur (bascule), p = prise 2P+T.
     (nx, nz) est la normale du mur, tournée vers la pièce. */
  function plaque(type, nx, nz, x, y, z) {
    const B = function (h, e0, e1, hy, hw) {
      if (nx) bx(null, h, Math.min(x + nx * e0, x + nx * e1), Math.max(x + nx * e0, x + nx * e1), y - hy, y + hy, z - hw, z + hw);
      else bx(null, h, x - hw, x + hw, y - hy, y + hy, Math.min(z + nz * e0, z + nz * e1), Math.max(z + nz * e0, z + nz * e1));
    };
    B("#fbfbf8", 0, 0.012, 0.042, 0.042);
    if (type === "i") { B("#e6e9ec", 0.012, 0.018, 0.027, 0.022); return; }
    B("#d9dde1", 0.012, 0.014, 0.027, 0.027);
    [-0.011, 0.011].forEach(function (o) {
      if (nx) bx(null, "#2a313b", Math.min(x + nx * 0.014, x + nx * 0.015), Math.max(x + nx * 0.014, x + nx * 0.015), y - 0.004, y + 0.004, z + o - 0.004, z + o + 0.004);
      else bx(null, "#2a313b", x + o - 0.004, x + o + 0.004, y - 0.004, y + 0.004, Math.min(z + nz * 0.014, z + nz * 0.015), Math.max(z + nz * 0.014, z + nz * 0.015));
    });
  }
  plaque("p", 0, 1, 7.15, 1.15, ZAI + 0.008); plaque("p", 0, 1, 8.5, 1.15, ZAI + 0.008);   /* cuisine, au-dessus du plan */
  plaque("i", -1, 0, XC0, 1.1, 0.4);                                                         /* cuisine, près de la porte */
  plaque("i", 1, 0, XC1, 1.1, 0.4); plaque("p", 1, 0, XC1, 0.3, -2.8);                       /* séjour */
  plaque("p", 0, 1, 14.65, 0.3, ZAI);
  plaque("i", 1, 0, XC1, YE + 1.1, 0.4); plaque("p", 1, 0, XC1, YE + 0.3, -0.45);            /* chambre */
  plaque("p", 0, 1, 12.85, YE + 0.3, ZAI);
  plaque("i", -1, 0, XC0, YE + 1.1, 0.4);                                                    /* salle de bains */
  /* le détecteur de fumée (DAAF) au plafond de la chambre, près de l'escalier */
  cy(null, "#fbfbf8", 13.6, YC - 0.025, 0.6, 0.065, 0.05, { seg: 16 });
  cy(null, "#e34a3a", 13.6, YC - 0.052, 0.6, 0.008, 0.004, { seg: 6, lum: 1 });
  /* suspension au-dessus de la table de cuisine */
  cyv(null, "#2a313b", 7.7, 2.05, Y1, -1.5, 0.006, { seg: 4 });
  cy(null, "#e0a54e", 7.7, 2.0, -1.5, 0.2, 0.15, { seg: 16, rt: 0.05, open: true });
  sp(null, "#fff3c4", 7.7, 1.94, -1.5, 0.05, 0.05, 0.05, { seg: 8, seg2: 6, lum: 1 });
  /* plafonniers du séjour, de la salle de bains et de la chambre */
  cy(null, "#fff7dc", 12.5, Y1 - 0.02, -1.6, 0.22, 0.04, { seg: 18, lum: 1 });
  cy(null, "#fff7dc", 7.2, YC - 0.02, -2.0, 0.15, 0.04, { seg: 16, lum: 1 });
  cy(null, "#fff7dc", 12.5, YC - 0.02, -1.6, 0.2, 0.04, { seg: 18, lum: 1 });

  /* =====================================================================
     17. LE JARDIN CÔTÉ DROIT (décor)
     ===================================================================== */
  /* massif d'arbustes et pot de lavande devant, pas japonais vers la rue */
  sp(null, P.feuilleF, 16.6, 0.4, 1.4, 0.45, 0.42, 0.4, { seg: 8, seg2: 6 });
  sp(null, P.feuille, 16.95, 0.32, 0.9, 0.32, 0.3, 0.3, { seg: 8, seg2: 6 });
  cyv(null, "#c9765a", 16.1, 0, 0.32, 2.3, 0.15, { seg: 12, rt: 0.18 });
  for (let k = 0; k < 9; k++) sp(null, k % 2 ? "#9b7fc4" : "#8a6fb3", 16.1 + (alea() - 0.5) * 0.2, 0.42 + alea() * 0.08, 2.3 + (alea() - 0.5) * 0.2, 0.04, 0.12, 0.04, { seg: 6, seg2: 4 });
  [-0.8, 0.0, 0.8, 1.6, 2.4].forEach(function (z) { cy(null, "#cfc8bb", 15.95 + (z > 0.5 ? 0.15 : 0), 0.015, z, 0.22, 0.03, { seg: 10 }); });
  /* robinet de jardin sur le mur et son dévidoir de tuyau */
  bx(null, "#c8a24a", XD, XD + 0.06, 0.58, 0.62, 0.38, 0.42);
  cyv(null, "#c8a24a", XD + 0.06, 0.5, 0.6, 0.4, 0.015, { seg: 8 });
  bx(null, "#d63a2f", XD + 0.045, XD + 0.075, 0.64, 0.655, 0.34, 0.46);
  [0.2, 0.44].forEach(function (z) { bx(null, "#5c6875", 16.7, 17.1, 0, 0.5, z - 0.015, z + 0.015); });
  cy(null, "#3f8a4f", 16.9, 0.32, 0.32, 0.17, 0.2, { axe: "z", seg: 16 });
  for (let k = 0; k < 5; k++) cy(null, k % 2 ? "#357a44" : "#4a9a5a", 16.9, 0.32, 0.24 + k * 0.04, 0.175, 0.012, { axe: "z", seg: 16 });
  canal(null, "#3f8a4f", [[16.9, 0.15, 0.32], [16.4, 0.03, 0.45], [15.75, 0.03, 0.42], [XD + 0.06, 0.5, 0.4]], 0.012, { seg: 6 });
  /* la boîte aux lettres sur son poteau, côté rue */
  cyv(null, "#5c6875", 15.85, 0, 1.0, 2.75, 0.035, { seg: 8 });
  bx(null, "#4a5f78", 15.65, 16.05, 1.0, 1.34, 2.58, 2.92, { edge: 1 });
  bx(null, "#2a313b", 15.73, 15.97, 1.24, 1.26, 2.92, 2.93);
  bx(null, "#fffdf8", 15.76, 15.94, 1.07, 1.12, 2.92, 2.925);

  /* =====================================================================
     18. LES ZONES CLIQUABLES, LES REPÈRES ET LES CAMÉRAS
     ===================================================================== */
  H.proxy(ZF, 5.98, 6.72, 0, 1.92, -4.2, -3.44);
  H.proxy(ZF, 6.72, 9.75, 0, 2.7, -4.2, -3.55);
  H.ancre(ZF, 6.4, 1.1, -2.6);          /* devant le réfrigérateur, assez bas pour rester visible sous la dalle */

  H.proxy(ZT, XC1, 10.08, 1.2, 2.22, -1.22, -0.5);
  H.proxy(ZT, XT, 10.68, 1.2, 2.1, -1.24, -1.2);
  H.proxy(ZT, XC1, 9.98, 1.35, 2.12, -0.44, -0.16);
  H.ancre(ZT, 10.3, 1.65, -0.85);

  H.proxy(ZP, 10.62, 12.05, 0.05, 0.85, -4.2, -4.02);
  H.proxy(ZP, 13.02, 14.45, 0.05, 0.85, -4.2, -4.02);
  H.proxy(ZP, 15.85, 17.2, 0, 1.32, -3.2, -1.6);
  H.ancre(ZP, 16.55, 1.65, -1.9);

  H.proxy(ZC, 11.6, 12.7, 4.74, 5.06, -4.2, -3.94);
  H.proxy(ZC, XD, 16.42, 3.05, 4.32, -3.2, -2.2);
  H.ancre(ZC, 12.1, 4.2, -3.1);          /* sous le split, assez bas pour rester visible sous le plancher des combles */

  H.proxy(ZV, 8.45, 8.75, 5.5, 5.6, -2.65, -2.35);
  H.proxy(ZV, 7.35, 8.9, YG, 6.4, -2.65, -1.6);
  H.proxy(ZV, 7.45, 7.85, 6.0, YTR + 0.85, -1.75, -1.2);
  H.ancre(ZV, 7.9, 6.75, -1.5);

  /* Caméras. La PAC regarde presque de face (az ≤ 5) : au-delà, le mur de droite et l'escalier
     cachent les radiateurs du séjour ; l'unité extérieure reste visible à droite de la maison. */
  return {
    frigo: { zoom: 0.22, az: [-10, 8], el: 8, interieur: true, foyer: [7.2, 1.0, -3.0] },
    tableau: { zoom: 0.2, az: [35, 50], el: 6, interieur: true, foyer: [10.0, 1.6, -0.85] },
    pac: { zoom: 0.32, az: [0, 5], el: 10, foyer: [14.2, 1.1, -1.4] },
    clim: { zoom: 0.3, az: [0, 45], el: 8, interieur: true, foyer: [12.7, 4.1, -2.0] },
    vmc: { zoom: 0.28, az: [-15, 30], el: 14, interieur: true, foyer: [7.9, 5.4, -2.1] }
  };
}
