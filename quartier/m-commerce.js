/* =====================================================================
   m-commerce.js — LE COMMERCE DE QUARTIER, EN COUPE.
   Le froid commercial, cœur du métier : chambre froide positive,
   meubles de vente, centrale CO₂ et son refroidisseur de gaz, armoire
   électrique du froid (avec l'électricien en EPI qui consigne),
   groupe de condensation et centrale de traitement d'air sur le toit.

   Emprise : x −12..2, z −5..3, y 0..6 (cahier des charges SPEC-3D.md).
   Façade avant ouverte au plan z = FZ = 3,0 : murs et dalle montrent
   leur tranche. Cloison x = −2 : boutique à gauche, local technique
   à droite. Repère : 1 unité = 1 m, x à droite, y en haut, z vers nous.
   ===================================================================== */
export function commerce(H) {
  const P = H.P, FZ = H.FZ;
  const bx = H.bx, bxr = H.bxr, cy = H.cy, cyv = H.cyv, tube = H.tube, canal = H.canal;
  const sp = H.sp, ext = H.ext, extX = H.extX, proxy = H.proxy, ancre = H.ancre, alea = H.alea;
  const Z = { cf: "chambre-froide", vi: "vitrine", sm: "salle-machines", ar: "armoire", gr: "groupe", cta: "cta" };

  /* teintes propres au commerce (en plus de la palette commune) */
  const C = {
    tole: "#f4f6f4", joint: "#d3d9da", inox: "#c9d0d6", inoxF: "#a9b2bb", carrelage: "#ebe5d8",
    jointSol: "#d4cbb9", resine: "#c9ced3", laiton: "#c8a24a", vertCo: "#3f7a5a", rouge: "#d63a2f",
    jaune: "#f5c518", marine: "#22324d", peau: "#f0d2b4", caoutchouc: "#1e2329", led: "#fff7dc"
  };

  /* ---------- petits outils du module ---------- */
  /* anneau fait de petits segments (grille de ventilateur, collier) ; axe = normale de l'anneau */
  function anneau(zn, c, x, y, z, r, ep, axe, n) {
    n = n || 16;
    const L = 2 * Math.PI * r / n * 1.08;
    for (let k = 0; k < n; k++) {
      const a = k * 2 * Math.PI / n, d = a * 180 / Math.PI;
      if (axe === "y") bxr(zn, c, x + r * Math.cos(a), y, z - r * Math.sin(a), L, ep, ep, 0, d + 90, 0);
      else if (axe === "x") bxr(zn, c, x, y + r * Math.cos(a), z + r * Math.sin(a), ep, L, ep, d, 0, 0);
      else bxr(zn, c, x + r * Math.cos(a), y + r * Math.sin(a), z, L, ep, ep, 0, 0, d + 90);
    }
  }
  /* ventilateur hélicoïde avec virole, pales, moyeu et grille de protection.
     axe 'z' : soufflage vers +z ; axe 'y' : soufflage vers le haut. */
  function ventilateur(zn, x, y, z, r, axe, coul) {
    const dark = "#1a2028", grille = "#3a424c";
    if (axe === "y") {
      cy(zn, coul || "#2a313b", x, y - 0.03, z, r + 0.05, 0.08, { seg: 24 });
      cy(zn, dark, x, y + 0.012, z, r, 0.01, { seg: 24 });
      for (let k = 0; k < 4; k++) {
        const a = k * Math.PI / 2 + 0.3;
        bxr(zn, "#8a94a1", x + Math.cos(a) * r * 0.48, y + 0.025, z - Math.sin(a) * r * 0.48, r * 0.78, 0.012, r * 0.34, 0, a * 180 / Math.PI, 0);
      }
      cy(zn, "#c9ced6", x, y + 0.04, z, r * 0.16, 0.05, { seg: 10 });
      for (let k = 1; k <= 4; k++) anneau(zn, grille, x, y + 0.075, z, r * k / 4.1, 0.012, "y", 10 + k * 4);
      bx(zn, grille, x - r, x + r, y + 0.07, y + 0.082, z - 0.008, z + 0.008);
      bx(zn, grille, x - 0.008, x + 0.008, y + 0.07, y + 0.082, z - r, z + r);
    } else {
      cy(zn, coul || "#2a313b", x, y, z - 0.02, r + 0.04, 0.05, { axe: "z", seg: 24 });
      cy(zn, dark, x, y, z + 0.008, r, 0.01, { axe: "z", seg: 24 });
      for (let k = 0; k < 4; k++) {
        const a = k * Math.PI / 2 + 0.3;
        bxr(zn, "#8a94a1", x + Math.cos(a) * r * 0.48, y + Math.sin(a) * r * 0.48, z + 0.02, r * 0.78, r * 0.34, 0.012, 0, 0, a * 180 / Math.PI);
      }
      cy(zn, "#c9ced6", x, y, z + 0.03, r * 0.16, 0.04, { axe: "z", seg: 10 });
      for (let k = 1; k <= 4; k++) anneau(zn, grille, x, y, z + 0.06, r * k / 4.1, 0.01, "z", 10 + k * 4);
      bx(zn, grille, x - r, x + r, y - 0.007, y + 0.007, z + 0.055, z + 0.067);
      bx(zn, grille, x - 0.007, x + 0.007, y - r, y + r, z + 0.055, z + 0.067);
    }
  }
  /* vanne à boisseau sphérique avec sa poignée (levier) */
  function vanne(zn, x, y, z, axe, poignee) {
    cy(zn, C.laiton, x, y, z, 0.035, 0.1, { axe: axe, seg: 10 });
    sp(zn, C.laiton, x, y, z, 0.045, 0.045, 0.045, { seg: 10, seg2: 6 });
    cyv(zn, "#5c6875", x, y + 0.04, y + 0.07, z, 0.01, { seg: 6 });
    if (axe === "x") bx(zn, poignee || C.rouge, x - 0.11, x + 0.01, y + 0.065, y + 0.08, z - 0.012, z + 0.012);
    else bx(zn, poignee || C.rouge, x - 0.012, x + 0.012, y + 0.065, y + 0.08, z - 0.01, z + 0.11);
  }
  /* manomètre à cadran, face vers +z (ou +x) */
  function manometre(zn, x, y, z, r, axe, aiguille) {
    if (axe === "x") {
      cy(zn, "#232a33", x, y, z, r, 0.035, { axe: "x", seg: 16 });
      cy(zn, "#fbfaf5", x + 0.02, y, z, r * 0.86, 0.01, { axe: "x", seg: 16 });
      bxr(zn, aiguille || C.rouge, x + 0.027, y + r * 0.2, z - r * 0.15, 0.004, r * 0.7, 0.008, 40, 0, 0);
    } else {
      cy(zn, "#232a33", x, y, z, r, 0.035, { axe: "z", seg: 16 });
      cy(zn, "#fbfaf5", x, y, z + 0.02, r * 0.86, 0.01, { axe: "z", seg: 16 });
      bxr(zn, aiguille || C.rouge, x + r * 0.15, y + r * 0.2, z + 0.027, 0.008, r * 0.7, 0.004, 0, 0, -40);
    }
  }

  /* =====================================================================
     1. LA COQUE : sol, murs, cloison, dalle de toit et acrotère (décor)
     ===================================================================== */
  const XG = -11.75, XD = 1.75, ZF = -4.75, HI = 4.0, HD = 4.35, HA = 4.8;
  /* sols : carrelage de la boutique, résine grise du local technique */
  bx(null, C.carrelage, XG, -2.05, 0, 0.02, ZF, FZ);
  for (let x = XG + 0.6; x < -2.05; x += 0.6) bx(null, C.jointSol, x - 0.006, x + 0.006, 0.02, 0.023, ZF, FZ);
  for (let z = ZF + 0.6; z < FZ; z += 0.6) bx(null, C.jointSol, XG, -2.05, 0.02, 0.023, z - 0.006, z + 0.006);
  bx(null, C.resine, -1.95, XD, 0, 0.02, ZF, FZ);
  /* murs extérieurs : fond, gauche, droite (acrotère compris) */
  bx(null, P.mur, -12, 2, 0, HA, -5, ZF, { edge: 1 });
  bx(null, P.mur, -12, XG, 0, HA, ZF, FZ, { edge: 1 });
  bx(null, P.mur, XD, 2, 0, HA, ZF, FZ, { edge: 1 });
  /* couvertines de l'acrotère */
  bx(null, "#f6f4ee", -12.04, 2.04, HA, HA + 0.06, -5.04, ZF + 0.04);
  bx(null, "#f6f4ee", -12.04, XG + 0.04, HA, HA + 0.06, ZF, FZ);
  bx(null, "#f6f4ee", XD - 0.04, 2.04, HA, HA + 0.06, ZF, FZ);
  /* la coupe des murs : parement, isolant, béton (bleu nuit) */
  [[-12, -11.95, P.murF], [-11.95, -11.83, P.isolant], [-11.83, XG, P.bleu],
   [1.95, 2, P.murF], [1.83, 1.95, P.isolant], [XD, 1.83, P.bleu]].forEach(function (c) {
    bx(null, c[2], c[0], c[1], 0, HA, FZ, FZ + 0.06);
  });
  /* plinthes intérieures */
  bx(null, "#d9d2c3", XG, XD, 0.02, 0.12, ZF, ZF + 0.015);
  bx(null, "#d9d2c3", XG, XG + 0.015, 0.02, 0.12, ZF, FZ);
  bx(null, "#d9d2c3", XD - 0.015, XD, 0.02, 0.12, ZF, FZ);
  /* dalle de toit en coupe : béton, isolant, étanchéité */
  bx(null, P.beton, XG, XD, HI, 4.2, ZF, FZ, { edge: 1 });
  bx(null, P.isolant, XG, XD, 4.2, 4.32, ZF, FZ, { edge: 1 });
  bx(null, "#8e96a0", XG, XD, 4.32, HD, ZF, FZ);
  bx(null, P.bleu, XG, XD, HI, 4.2, FZ, FZ + 0.06);
  bx(null, P.isolant, XG, XD, 4.2, 4.32, FZ, FZ + 0.06);
  bx(null, "#5c6875", XG, XD, 4.32, HD, FZ, FZ + 0.06);
  /* relevés d'étanchéité au pied de l'acrotère */
  bx(null, "#7d8794", XG, XD, HD, HD + 0.15, ZF, ZF + 0.03);
  bx(null, "#7d8794", XG, XG + 0.03, HD, HD + 0.15, ZF, FZ);
  bx(null, "#7d8794", XD - 0.03, XD, HD, HD + 0.15, ZF, FZ);
  /* cloison boutique / local technique (x = −2), porte z 0,6..1,6 */
  bx(null, P.murF, -2.05, -1.95, 0, HI, ZF, 0.6, { edge: 1 });
  bx(null, P.murF, -2.05, -1.95, 0, HI, 1.6, FZ, { edge: 1 });
  bx(null, P.murF, -2.05, -1.95, 2.1, HI, 0.6, 1.6, { edge: 1 });
  bx(null, P.bleu, -2.05, -1.95, 0, HI, FZ, FZ + 0.06);
  [0.6, 1.6].forEach(function (z) { bx(null, P.cadre, -2.07, -1.93, 0, 2.15, z - 0.03, z + 0.03); });
  bx(null, P.cadre, -2.07, -1.93, 2.1, 2.16, 0.57, 1.63);
  /* porte du local, rabattue à 180° contre la cloison côté boutique, pictogramme bleu rond */
  bx(null, "#d7dde3", -2.125, -2.08, 0.02, 2.08, 1.62, 2.48, { edge: 1 });
  bx(null, "#2a313b", -2.14, -2.125, 1.0, 1.04, 2.3, 2.42);
  cy(null, "#2f6db5", -2.13, 1.6, 2.05, 0.09, 0.01, { axe: "x", seg: 14 });
  /* luminaires : dalles LED de la boutique, réglettes du local technique */
  [-10.2, -6.8, -3.7].forEach(function (x) {
    [-2.6, 1.3].forEach(function (z) {
      bx(null, "#d9dde3", x - 0.62, x + 0.62, HI - 0.06, HI, z - 0.32, z + 0.32);
      bx(null, C.led, x - 0.58, x + 0.58, HI - 0.065, HI - 0.06, z - 0.28, z + 0.28, { lum: 1 });
    });
  });
  [-2.6, 0.9].forEach(function (z) {
    bx(null, "#d9dde3", -0.8, 0.8, HI - 0.08, HI, z - 0.07, z + 0.07);
    bx(null, C.led, -0.76, 0.76, HI - 0.085, HI - 0.08, z - 0.04, z + 0.04, { lum: 1 });
  });

  /* =====================================================================
     2. LA CHAMBRE FROIDE POSITIVE (chambre-froide)
        Panneaux sandwich de 0,12 : tôle blanche / mousse isolante / tôle.
        Façade avant (z = −0,4) coupée : on lit la tranche des panneaux.
     ===================================================================== */
  const X0 = -11.6, X1 = -7.6, Z0 = -4.6, Z1 = -0.4, YP = 3.0, E = 0.12, T = 0.012;
  /* panneau sandwich : ax = direction de l'épaisseur */
  function panneau(x0, x1, y0, y1, z0, z1, ax) {
    if (ax === "x") {
      bx(Z.cf, C.tole, x0, x0 + T, y0, y1, z0, z1, { edge: 1 });
      bx(Z.cf, P.isolant, x0 + T, x1 - T, y0, y1, z0, z1);
      bx(Z.cf, C.tole, x1 - T, x1, y0, y1, z0, z1, { edge: 1 });
    } else if (ax === "y") {
      bx(Z.cf, C.tole, x0, x1, y0, y0 + T, z0, z1, { edge: 1 });
      bx(Z.cf, P.isolant, x0, x1, y0 + T, y1 - T, z0, z1);
      bx(Z.cf, C.tole, x0, x1, y1 - T, y1, z0, z1, { edge: 1 });
    } else {
      bx(Z.cf, C.tole, x0, x1, y0, y1, z0, z0 + T, { edge: 1 });
      bx(Z.cf, P.isolant, x0, x1, y0, y1, z0 + T, z1 - T);
      bx(Z.cf, C.tole, x0, x1, y0, y1, z1 - T, z1, { edge: 1 });
    }
  }
  const YS = YP - E;                 /* sous-face du plafond */
  panneau(X0 + E, X1 - E, 0.02, 0.14, Z0 + E, Z1, "y");        /* sol isolé */
  bx(Z.cf, "#c9cfd3", X0 + E, X1 - E, 0.14, 0.15, Z0 + E, Z1);  /* revêtement antidérapant */
  panneau(X0, X0 + E, 0.02, YS, Z0, Z1, "x");                  /* paroi gauche */
  panneau(X1 - E, X1, 0.02, YS, Z0, Z1, "x");                  /* paroi droite */
  panneau(X0 + E, X1 - E, 0.02, YS, Z0, Z0 + E, "z");          /* paroi du fond */
  panneau(X0, X1, YS, YP, Z0, Z1, "y");                        /* plafond */
  /* façade avant : un trumeau avec l'huisserie de la porte, le reste coupé */
  const PX0 = -8.72, PX1 = -7.84, PY = 2.02;                    /* baie de la porte */
  panneau(-8.86, PX0, 0.02, YS, Z1 - E, Z1, "z");
  panneau(PX1, X1 - E, 0.02, YS, Z1 - E, Z1, "z");
  panneau(PX0, PX1, PY, YS, Z1 - E, Z1, "z");
  /* joints des panneaux : face extérieure droite, fond, plafond */
  [-3.45, -2.3, -1.15].forEach(function (z) {
    bx(Z.cf, C.joint, X1, X1 + 0.004, 0.02, YS, z - 0.006, z + 0.006);
    bx(Z.cf, C.joint, X0 + E - 0.004, X0 + E, 0.15, YS, z - 0.006, z + 0.006);
    bx(Z.cf, C.joint, X0, X1, YP, YP + 0.004, z - 0.006, z + 0.006);
  });
  [-10.45, -9.3, -8.15].forEach(function (x) {
    bx(Z.cf, C.joint, x - 0.006, x + 0.006, 0.15, YS, Z0 + E, Z0 + E + 0.004);
  });
  /* cornières d'angle extérieures et gorges sanitaires intérieures */
  bx(Z.cf, "#e2e7e8", X1 - 0.03, X1 + 0.02, 0.02, YP + 0.02, Z0 - 0.02, Z0 + 0.03);
  bx(Z.cf, "#e2e7e8", X0 - 0.02, X1 + 0.02, YP - 0.03, YP + 0.02, Z0 - 0.02, Z0 + 0.03);
  bx(Z.cf, "#e2e7e8", X1 - 0.03, X1 + 0.02, YP - 0.03, YP + 0.02, Z0, Z1);
  bx(Z.cf, "#e2e7e8", X0 - 0.02, X0 + 0.03, YP - 0.03, YP + 0.02, Z0, Z1);
  bx(Z.cf, "#e9eeee", X0 + E, X1 - E, 0.15, 0.2, Z0 + E, Z0 + E + 0.04);
  bx(Z.cf, "#e9eeee", X0 + E, X0 + E + 0.04, 0.15, 0.2, Z0 + E, Z1 - E);
  bx(Z.cf, "#e9eeee", X1 - E - 0.04, X1 - E, 0.15, 0.2, Z0 + E, Z1 - E);
  /* le seuil chauffant et le cadre de la baie */
  bx(Z.cf, C.inoxF, PX0, PX1, 0.02, 0.16, Z1 - E - 0.02, Z1 + 0.04);
  bx(Z.cf, "#dfe4e6", PX0 - 0.05, PX0, 0.14, PY + 0.05, Z1 - 0.01, Z1 + 0.025);
  bx(Z.cf, "#dfe4e6", PX1, PX1 + 0.05, 0.14, PY + 0.05, Z1 - 0.01, Z1 + 0.025);
  bx(Z.cf, "#dfe4e6", PX0 - 0.05, PX1 + 0.05, PY, PY + 0.05, Z1 - 0.01, Z1 + 0.025);

  /* la porte isotherme pivotante, grande ouverte (charnières côté x+) */
  {
    /* fermé, le battant part de la charnière vers −x ; ouvert de 108°, il pointe vers +z */
    const hx = PX1 + 0.06, hz = Z1 + 0.06, L = 0.98;
    const ouv = 108 * Math.PI / 180, ux = -Math.cos(ouv), uz = Math.sin(ouv);
    const mx = hx + ux * L / 2, mz = hz + uz * L / 2, ry = Math.atan2(-uz, ux) * 180 / Math.PI;
    bxr(Z.cf, C.tole, mx, 1.08, mz, L, 1.96, 0.1, 0, ry, 0);
    /* joint d'étanchéité gris sur le pourtour (côté intérieur) */
    const nx = uz, nz = -ux;                     /* normale du battant, côté baie */
    bxr(Z.cf, "#7d8794", mx - nx * 0.055, 1.08, mz - nz * 0.055, L - 0.04, 1.9, 0.012, 0, ry, 0);
    bxr(Z.cf, "#eef1f2", mx - nx * 0.062, 1.08, mz - nz * 0.062, L - 0.16, 1.78, 0.006, 0, ry, 0);
    /* tôle inox de bas de porte, poignée à levier extérieure, charnières */
    bxr(Z.cf, C.inox, mx + nx * 0.052, 0.3, mz + nz * 0.052, L - 0.04, 0.28, 0.006, 0, ry, 0);
    const fx = hx + ux * (L - 0.1), fz = hz + uz * (L - 0.1);
    bxr(Z.cf, "#b9c2ca", fx + nx * 0.07, 1.1, fz + nz * 0.07, 0.05, 0.3, 0.05, 0, ry, 0);
    bxr(Z.cf, "#8a94a1", fx + nx * 0.1 - ux * 0.12, 1.18, fz + nz * 0.1 - uz * 0.12, 0.28, 0.04, 0.04, 0, ry, 0);
    /* commande d'ouverture de secours (champignon rouge) côté intérieur */
    cy(Z.cf, C.rouge, fx - nx * 0.08, 1.1, fz - nz * 0.08, 0.04, 0.05, { seg: 10 });
    [0.35, 1.75].forEach(function (y) { cyv(Z.cf, "#b9c2ca", hx, y - 0.1, y + 0.1, hz, 0.03, { seg: 8 }); });
  }
  /* rideau à lanières PVC, côté intérieur de la baie */
  bx(Z.cf, C.inoxF, PX0 - 0.04, PX1 + 0.04, PY - 0.06, PY, Z1 - E - 0.06, Z1 - E - 0.02);
  for (let k = 0; k < 6; k++) {
    const x = PX0 + 0.02 + k * 0.145;
    bx(Z.cf, "#d6eef3", x, x + 0.16, 0.17, PY - 0.06, Z1 - E - 0.045 + (k % 2) * 0.008, Z1 - E - 0.04 + (k % 2) * 0.008, { t: 0.45 });
  }

  /* l'évaporateur ventilé (plafonnier), contre le fond */
  {
    const ex0 = -10.4, ex1 = -8.8, ey0 = 2.25, ey1 = 2.8, ez0 = -4.45, ez1 = -3.85;
    bx(Z.cf, "#eef1f2", ex0, ex1, ey1 - 0.05, ey1, ez0, ez1, { edge: 1 });           /* toit du caisson */
    bx(Z.cf, "#eef1f2", ex0, ex1, ey0 + 0.05, ey1 - 0.05, ez1 - 0.02, ez1, { edge: 1 }); /* façade ventilée */
    bx(Z.cf, "#e3e8ea", ex0, ex0 + 0.04, ey0 + 0.05, ey1, ez0, ez1, { edge: 1 });     /* flasques */
    bx(Z.cf, "#e3e8ea", ex1 - 0.04, ex1, ey0 + 0.05, ey1, ez0, ez1, { edge: 1 });
    /* batterie à ailettes visible entre flasques, sous le toit (côté reprise) */
    bx(Z.cf, "#9aa5b1", ex0 + 0.04, ex1 - 0.04, ey0 + 0.06, ey1 - 0.05, ez0, ez0 + 0.25);
    for (let x = ex0 + 0.07; x < ex1 - 0.05; x += 0.035) bx(Z.cf, "#c3cad3", x, x + 0.008, ey0 + 0.06, ey1 - 0.05, ez0 - 0.002, ez0 + 0.25);
    /* tiges de suspension filetées et écrous */
    [[ex0 + 0.1, ez0 + 0.1], [ex1 - 0.1, ez0 + 0.1], [ex0 + 0.1, ez1 - 0.1], [ex1 - 0.1, ez1 - 0.1]].forEach(function (p) {
      cyv(Z.cf, "#8a94a1", p[0], ey1, YS, p[1], 0.008, { seg: 5 });
      cyv(Z.cf, "#5c6875", p[0], ey1, ey1 + 0.015, p[1], 0.016, { seg: 6 });
    });
    /* deux ventilateurs en façade, soufflage vers la porte */
    [-10.0, -9.2].forEach(function (x) { ventilateur(Z.cf, x, 2.53, ez1, 0.19, "z"); });
    /* bac de dégivrage et son écoulement siphonné */
    bx(Z.cf, C.inox, ex0 - 0.05, ex1 + 0.05, ey0 - 0.04, ey0 + 0.04, ez0 - 0.01, ez1 + 0.04, { edge: 1 });
    bx(Z.cf, C.inoxF, ex0 - 0.02, ex1 + 0.02, ey0 + 0.03, ey0 + 0.045, ez0, ez1 + 0.02);
    canal(Z.cf, "#e8e8e8", [[ex0 + 0.12, ey0 - 0.04, ez0 + 0.05], [ex0 + 0.12, ey0 - 0.12, ez0 + 0.05], [ex0 + 0.12, ey0 - 0.12, Z0 + E + 0.05], [ex0 + 0.12, 0.55, Z0 + E + 0.05]], 0.02);
    canal(Z.cf, "#e8e8e8", [[ex0 + 0.12, 0.55, Z0 + E + 0.05], [ex0 + 0.12, 0.42, Z0 + E + 0.05], [ex0 + 0.28, 0.42, Z0 + E + 0.05], [ex0 + 0.28, 0.6, Z0 + E + 0.05], [ex0 + 0.28, 0.6, Z0 + 0.02]], 0.02);
    /* côté droit : coudes de la batterie, distributeur et détendeur thermostatique */
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
      cy(Z.cf, P.cuivre, ex1 + 0.012, 2.36 + r * 0.1, -4.35 + c * 0.12, 0.014, 0.025, { axe: "x", seg: 6 });
    }
    cyv(Z.cf, P.cuivre, ex1 + 0.04, 2.33, 2.74, -4.35, 0.022, { seg: 8 });           /* collecteur d'aspiration */
    cy(Z.cf, C.laiton, ex1 + 0.06, 2.55, -4.05, 0.035, 0.08, { seg: 8, rt: 0.012 });   /* distributeur (araignée) */
    for (let k = 0; k < 4; k++) tube(Z.cf, P.cuivre, ex1 + 0.06, 2.51, -4.05, ex1 + 0.015, 2.36 + k * 0.1, -4.23, 0.005, { seg: 4 });
    bx(Z.cf, C.laiton, ex1 + 0.03, ex1 + 0.09, 2.62, 2.7, -4.09, -4.01);               /* détendeur */
    cy(Z.cf, "#8a94a1", ex1 + 0.06, 2.73, -4.05, 0.03, 0.03, { seg: 10 });             /* élément thermostatique */
    tube(Z.cf, P.cuivre, ex1 + 0.06, 2.6, -4.05, ex1 + 0.06, 2.62, -4.05, 0.01);
    canal(Z.cf, "#b07a4a", [[ex1 + 0.06, 2.74, -4.05], [ex1 + 0.06, 2.77, -4.2], [ex1 + 0.04, 2.7, -4.3]], 0.003);  /* capillaire */
    cy(Z.cf, P.cuivre, ex1 + 0.04, 2.66, -4.33, 0.014, 0.07, { seg: 6 });             /* bulbe sur l'aspiration */
    /* liaisons vers le haut, point de raccordement (−9,6 ; 2,8 ; −4,15) */
    canal(Z.cf, P.cuivre, [[ex1 + 0.06, 2.7, -4.05], [ex1 + 0.06, ey1 + 0.03, -4.05], [-9.66, ey1 + 0.03, -4.1], [-9.66, YS, -4.1]], 0.009);
    canal(Z.cf, P.armaflex, [[ex1 + 0.04, 2.74, -4.35], [ex1 + 0.04, ey1 + 0.04, -4.35], [ex1 + 0.04, ey1 + 0.04, -4.2], [-9.55, ey1 + 0.04, -4.2], [-9.55, YS, -4.2]], 0.026);
    cyv(Z.cf, C.laiton, -9.6, ey1, ey1 + 0.02, -4.15, 0.05, { seg: 10 });
  }
  /* éclairage étanche au plafond */
  [[-10.4, -2.0], [-8.6, -2.6]].forEach(function (p) {
    cy(Z.cf, "#dfe4e6", p[0], YS - 0.03, p[1], 0.14, 0.05, { seg: 14 });
    cy(Z.cf, C.led, p[0], YS - 0.06, p[1], 0.11, 0.012, { seg: 14, lum: 1 });
  });

  /* rayonnage inox à quatre niveaux le long de la paroi gauche */
  {
    const rx0 = -11.45, rx1 = -10.9, rz0 = -4.35, rz1 = -0.7;
    [rz0 + 0.03, (rz0 + rz1) / 2, rz1 - 0.03].forEach(function (z) {
      [rx0 + 0.02, rx1 - 0.02].forEach(function (x) { bx(Z.cf, C.inoxF, x - 0.015, x + 0.015, 0.15, 2.05, z - 0.015, z + 0.015); });
    });
    const CAISSES = ["#3b82c4", "#4f9a5f", "#e8914a", "#d9dde3", "#3b82c4"];
    [0.32, 0.8, 1.28, 1.76].forEach(function (y, n) {
      for (let k = 0; k < 5; k++) bx(Z.cf, C.inox, rx0, rx1, y - 0.02, y, rz0 + k * 0.73 + 0.02, rz0 + k * 0.73 + 0.69);
      let z = rz0 + 0.06;
      while (z < rz1 - 0.45) {
        const w = 0.38 + alea() * 0.12, h = 0.16 + alea() * 0.12, c = CAISSES[Math.floor(alea() * CAISSES.length)];
        bx(Z.cf, c, rx0 + 0.04, rx1 - 0.04, y, y + h, z, z + w, { edge: 1 });
        /* contenu : salades, tomates, fromages, ou rien (caisse fermée) */
        const t = Math.floor(alea() * 4);
        if (t < 3 && n < 3) for (let i = 0; i < 3; i++) {
          const col = t === 0 ? "#7fbf5a" : (t === 1 ? "#d9443a" : "#f2d27a");
          sp(Z.cf, col, rx0 + 0.15 + (i % 2) * 0.2, y + h + 0.02, z + 0.1 + i * 0.1, 0.08, t === 2 ? 0.04 : 0.065, 0.08, { seg: 8, seg2: 5 });
        }
        z += w + 0.05;
      }
    });
  }
  /* palette de colis sous l'évaporateur */
  bx(Z.cf, P.boisF, -10.6, -9.4, 0.15, 0.28, -4.4, -3.6, { edge: 1 });
  [[-10.55, -9.98], [-9.97, -9.45]].forEach(function (c, i) {
    bx(Z.cf, "#c9a46e", c[0], c[1], 0.28, 0.72, -4.35, -3.95, { edge: 1 });
    bx(Z.cf, "#c9a46e", c[0], c[1], 0.28, 0.66 - i * 0.08, -3.93, -3.65, { edge: 1 });
    bx(Z.cf, "#c9a46e", c[0] + 0.05, c[1] - 0.05, 0.72, 1.05, -4.3, -4.0, { edge: 1 });
  });

  /* rail à viande et carcasses aux crochets */
  {
    /* le rail passe entre les deux ventilateurs, devant l'évaporateur */
    const rx = -9.6, ry = 2.4;
    tube(Z.cf, C.inoxF, rx, ry, -3.4, rx, ry, -0.75, 0.03, { seg: 8 });
    [-3.3, -0.85].forEach(function (z) { cyv(Z.cf, "#8a94a1", rx, ry, YS, z, 0.012, { seg: 5 }); });
    [[-2.85, "boeuf"], [-2.15, "porc"], [-1.45, "boeuf"]].forEach(function (c, i) {
      const z = c[0], boeuf = c[1] === "boeuf";
      const y0 = ry - 0.03;
      /* crochet en S et galet */
      cy(Z.cf, "#5c6875", rx, ry + 0.035, z, 0.03, 0.02, { axe: "z", seg: 8 });
      canal(Z.cf, "#b9c2ca", [[rx, y0, z], [rx, y0 - 0.12, z], [rx, y0 - 0.2, z + 0.05], [rx, y0 - 0.26, z]], 0.008);
      const yc = y0 - 0.95, hh = boeuf ? 0.66 : 0.58;
      const chair = boeuf ? "#b8423c" : "#e6a9a0", gras = boeuf ? "#ead2bf" : "#f4ddd2";
      sp(Z.cf, chair, rx, yc, z, 0.15, hh, 0.13, { seg: 12, seg2: 10 });
      sp(Z.cf, gras, rx + 0.03, yc + 0.05, z + 0.03, 0.13, hh * 0.92, 0.11, { seg: 12, seg2: 10 });
      sp(Z.cf, chair, rx - 0.02, yc + hh * 0.55, z, 0.11, 0.2, 0.1, { seg: 10, seg2: 8 });
      cyv(Z.cf, "#f3ede1", rx, yc + hh * 0.65, y0 - 0.25, z, 0.025, { seg: 6 });   /* os du jarret */
      sp(Z.cf, "#f3ede1", rx, y0 - 0.25, z, 0.035, 0.03, 0.035, { seg: 6, seg2: 4 });
      if (i % 2 === 0) for (let k = 0; k < 4; k++) bx(Z.cf, "#9c3530", rx + 0.1, rx + 0.13, yc - 0.3 + k * 0.14, yc - 0.28 + k * 0.14, z - 0.08, z + 0.08);
    });
  }
  /* bouton d'alarme intérieur « personne enfermée » (champignon rouge, socle jaune) */
  bx(Z.cf, C.jaune, X1 - E - 0.05, X1 - E, 1.0, 1.2, -0.95, -0.75);
  cy(Z.cf, C.rouge, X1 - E - 0.07, 1.1, -0.85, 0.06, 0.04, { axe: "x", seg: 12 });
  /* soupape d'équilibrage de pression sur la paroi droite */
  cy(Z.cf, "#dfe4e6", X1 + 0.03, 2.55, -2.9, 0.09, 0.06, { axe: "x", seg: 14 });
  for (let k = -2; k <= 2; k++) bx(Z.cf, "#8a94a1", X1 + 0.06, X1 + 0.065, 2.55 + k * 0.03 - 0.006, 2.55 + k * 0.03 + 0.006, -2.97, -2.83);
  /* à l'extérieur, sur la face avant du linteau, au-dessus de la porte :
     afficheur de température (écran vert, deux LED) et boîtier d'alarme rouge à flash */
  bx(Z.cf, "#2a313b", -8.62, -8.30, 2.30, 2.55, -0.40, -0.35, { edge: 1 });
  bx(Z.cf, "#56e07a", -8.58, -8.34, 2.38, 2.47, -0.35, -0.345, { lum: 1 });
  [-8.40, -8.36].forEach(function (x, i) { sp(Z.cf, i ? "#e34a3a" : "#39c77a", x, 2.335, -0.345, 0.012, 0.012, 0.012, { seg: 6, seg2: 4, lum: 1 }); });
  bx(Z.cf, C.rouge, -8.16, -7.92, 2.22, 2.47, -0.40, -0.33, { edge: 1 });
  cy(Z.cf, "#f7f5ef", -8.04, 2.34, -0.325, 0.05, 0.012, { axe: "z", seg: 12 });
  cyv(Z.cf, "#ff5a4a", -8.04, 2.47, 2.59, -0.365, 0.045, { seg: 10, lum: 1 });  /* flash */
  ancre(Z.cf, -9.6, 3.4, -0.4);
  proxy(Z.cf, X0, X1 + 0.1, 0, YP + 0.05, Z0, Z1 + 0.05);
  proxy(Z.cf, PX1, -7.1, 0, 2.1, Z1, 0.6);

  /* =====================================================================
     3. LES MEUBLES DE VENTE (vitrine)
        Meuble mural ouvert (multideck) au CO₂ contre le fond, vitrine
        bouchère à vitre bombée avec son groupe logé au R290.
     ===================================================================== */
  /* rangée de produits sur une tablette : un facing devant, le stock derrière */
  const PRODUITS = [
    { c: "#f7f5ef", k: "pot", h: 0.08, l: "#3b82c4" }, { c: "#f7f5ef", k: "pot", h: 0.08, l: "#d94f6a" },
    { c: "#f7f5ef", k: "bouteille", h: 0.22 }, { c: "#e8914a", k: "brique", h: 0.19 }, { c: "#f2c94c", k: "brique", h: 0.19 },
    { c: "#f2d27a", k: "fromage", h: 0.07 }, { c: "#e79aa6", k: "barquette", h: 0.04 }, { c: "#d4a017", k: "beurre", h: 0.05 },
    { c: "#8fb383", k: "brique", h: 0.15 }, { c: "#c0392b", k: "barquette", h: 0.05 }
  ];
  function rayon(zn, x0, x1, y, zA, zB, hmax) {
    let x = x0 + 0.02;
    while (x < x1 - 0.1) {
      const p = PRODUITS[Math.floor(alea() * PRODUITS.length)];
      const w = p.k === "fromage" ? 0.2 : (p.k === "barquette" ? 0.24 : 0.09 + alea() * 0.06);
      const n = p.k === "pot" || p.k === "bouteille" ? Math.max(1, Math.floor(w / 0.075)) : 1;
      const h = Math.min(p.h, hmax);
      if (x + w > x1 - 0.02) break;
      /* le stock en profondeur, un ton plus sombre */
      bx(zn, p.c, x, x + w, y, y + h * 0.96, zA, zB - 0.09);
      if (p.k === "pot") {
        for (let i = 0; i < n; i++) {
          cyv(zn, p.c, x + 0.035 + i * 0.075, y, y + h, zB - 0.045, 0.032, { seg: 8 });
          cyv(zn, p.l, x + 0.035 + i * 0.075, y + h, y + h + 0.008, zB - 0.045, 0.034, { seg: 8 });
        }
      } else if (p.k === "bouteille") {
        for (let i = 0; i < n; i++) {
          cyv(zn, p.c, x + 0.035 + i * 0.075, y, y + h * 0.7, zB - 0.045, 0.032, { seg: 8 });
          cyv(zn, p.c, x + 0.035 + i * 0.075, y + h * 0.7, y + h * 0.92, zB - 0.045, 0.032, { seg: 8, rt: 0.014 });
          cyv(zn, "#3b82c4", x + 0.035 + i * 0.075, y + h * 0.92, y + h, zB - 0.045, 0.015, { seg: 6 });
        }
      } else if (p.k === "fromage") {
        cy(zn, p.c, x + 0.1, y + h / 2, zB - 0.1, 0.095, h, { seg: 12 });
        bx(zn, "#e0b84f", x + 0.1, x + 0.19, y + 0.001, y + h + 0.001, zB - 0.11, zB - 0.01);
      } else if (p.k === "barquette") {
        bx(zn, "#f7f5ef", x, x + w, y, y + 0.015, zB - 0.09, zB - 0.01);
        sp(zn, p.c, x + w / 2, y + 0.02, zB - 0.05, w * 0.42, h * 0.6, 0.035, { seg: 8, seg2: 4 });
      } else {
        bx(zn, p.c, x, x + w, y, y + h, zB - 0.09, zB - 0.01, { edge: 1 });
        bx(zn, "#f7f5ef", x + 0.01, x + w - 0.01, y + h * 0.55, y + h * 0.75, zB - 0.009, zB - 0.006);
      }
      x += w + 0.012;
    }
  }

  /* --- le meuble mural ouvert (multideck) --- */
  {
    const mx0 = -7.2, mx1 = -3.4, mz0 = -4.7, mz1 = -3.7, CORPS = "#f2f2ee", JOUE = "#34557d";
    const profil = [[3.7, 0], [4.7, 0], [4.7, 2.1], [3.72, 2.1], [3.72, 1.86], [3.95, 1.82], [3.8, 0.62], [3.7, 0.6]];
    extX(Z.vi, JOUE, profil, 0.06, mx0, 0, 0);
    extX(Z.vi, JOUE, profil, 0.06, mx1 - 0.06, 0, 0);
    /* liserés clairs des joues */
    [mx0 + 0.061, mx1 - 0.062].forEach(function (x) {
      bx(Z.vi, "#cfd8e3", x, x + 0.001, 0.62, 1.8, -3.84, -3.8);
    });
    const ix0 = mx0 + 0.06, ix1 = mx1 - 0.06;
    /* socle, contre-plinthe, façade de la cuve avec son pare-chocs et son liseré bleu */
    bx(Z.vi, "#3a424c", ix0, ix1, 0, 0.1, mz0, mz1 - 0.06);
    bx(Z.vi, CORPS, ix0, ix1, 0.1, 0.58, mz1 - 0.08, mz1, { edge: 1 });
    bx(Z.vi, P.bleu, ix0, ix1, 0.4, 0.46, mz1 - 0.002, mz1 + 0.004);
    bx(Z.vi, "#5c6875", ix0, ix1, 0.24, 0.29, mz1, mz1 + 0.03);
    /* vitre frontale de la cuve */
    bx(Z.vi, P.verre, ix0, ix1, 0.58, 0.74, mz1 - 0.06, mz1 - 0.05, { t: 0.35 });
    /* grille de reprise du rideau d'air, en bas devant la cuve */
    bx(Z.vi, "#2a313b", ix0, ix1, 0.56, 0.585, mz1 - 0.18, mz1 - 0.07);
    for (let x = ix0 + 0.03; x < ix1 - 0.02; x += 0.05) bx(Z.vi, "#8a94a1", x, x + 0.018, 0.585, 0.59, mz1 - 0.175, mz1 - 0.075);
    /* fond perforé et cuve */
    bx(Z.vi, "#e8ecee", ix0, ix1, 0.5, 1.86, mz0, mz0 + 0.08, { edge: 1 });
    for (let y = 0.62; y < 1.82; y += 0.06) bx(Z.vi, "#cfd5da", ix0 + 0.02, ix1 - 0.02, y, y + 0.006, mz0 + 0.08, mz0 + 0.082);
    bx(Z.vi, "#e8ecee", ix0, ix1, 0.5, 0.56, mz0 + 0.08, mz1 - 0.18);
    rayon(Z.vi, ix0, ix1, 0.56, mz0 + 0.12, mz1 - 0.2, 0.12);
    /* quatre étagères, chacune avec porte-étiquettes et réglette LED */
    [[0.9, -3.92], [1.17, -3.98], [1.43, -4.04], [1.67, -4.1]].forEach(function (e) {
      const y = e[0], zf = e[1];
      bx(Z.vi, C.inox, ix0, ix1, y - 0.02, y, mz0 + 0.08, zf, { edge: 1 });
      bx(Z.vi, "#f7f5ef", ix0, ix1, y - 0.06, y + 0.012, zf, zf + 0.016);
      for (let x = ix0 + 0.15; x < ix1 - 0.1; x += 0.32 + alea() * 0.2) bx(Z.vi, alea() < 0.5 ? "#f2c94c" : "#ffffff", x, x + 0.06, y - 0.05, y - 0.01, zf + 0.016, zf + 0.019);
      bx(Z.vi, C.led, ix0, ix1, y - 0.03, y - 0.022, zf - 0.05, zf - 0.02, { lum: 1 });
      rayon(Z.vi, ix0, ix1, y, mz0 + 0.1, zf - 0.02, 0.22);
    });
    /* la casquette : nid d'abeille de soufflage, rampe lumineuse, rideau de nuit enroulé */
    bx(Z.vi, CORPS, ix0, ix1, 1.86, 2.1, mz0, -3.72, { edge: 1 });
    bx(Z.vi, "#2f6db5", ix0, ix1, 1.93, 2.03, -3.72, -3.715);
    bx(Z.vi, "#5c6875", ix0, ix1, 1.835, 1.86, -3.98, -3.76);
    for (let x = ix0 + 0.02; x < ix1; x += 0.04) bx(Z.vi, "#8a94a1", x, x + 0.006, 1.83, 1.835, -3.98, -3.76);
    bx(Z.vi, C.led, ix0, ix1, 1.84, 1.86, -4.2, -4.0, { lum: 1 });
    cy(Z.vi, "#d9dde3", (ix0 + ix1) / 2, 1.88, -3.75, 0.025, ix1 - ix0, { axe: "x", seg: 10 });
    /* piquage frigorifique sur le dessus, côté fond (−5,3 ; 2,1 ; −4,6) */
    bx(Z.vi, "#d9dde3", -5.5, -5.1, 2.1, 2.16, -4.68, -4.5);
    cyv(Z.vi, P.cuivre, -5.36, 2.1, 2.3, -4.6, 0.011, { seg: 8 });
    cyv(Z.vi, P.armaflex, -5.24, 2.1, 2.3, -4.6, 0.026, { seg: 10 });
    proxy(Z.vi, mx0, mx1, 0, 2.15, mz0, mz1 + 0.05);
  }

  /* --- la vitrine bouchère à vitre bombée --- */
  {
    const bx0 = -6.5, bx1 = -3.3, bz0 = 0.4, bz1 = 1.4, YT = 0.82;
    const FACE = "#f3efe6";
    /* socle en retrait */
    bx(Z.vi, "#2a313b", bx0 + 0.05, bx1 - 0.05, 0, 0.1, bz0 + 0.05, bz1 - 0.06);
    /* caisson : côté client (+z) avec l'ouverture de la grille du groupe logé */
    const gx0 = -4.5, gx1 = -3.55, gy0 = 0.14, gy1 = 0.46;
    bx(Z.vi, FACE, bx0, gx0, 0.1, YT, bz1 - 0.06, bz1, { edge: 1 });
    bx(Z.vi, FACE, gx1, bx1, 0.1, YT, bz1 - 0.06, bz1, { edge: 1 });
    bx(Z.vi, FACE, gx0, gx1, gy1, YT, bz1 - 0.06, bz1);
    bx(Z.vi, FACE, gx0, gx1, 0.1, gy0, bz1 - 0.06, bz1);
    bx(Z.vi, FACE, bx0, bx1, 0.1, YT, bz0, bz1 - 0.06, { edge: 1 });
    bx(Z.vi, "#8b2f2f", bx0, bx1, 0.66, 0.72, bz1, bz1 + 0.006);      /* bandeau rouge boucherie */
    bx(Z.vi, "#5c6875", bx0, bx1, YT - 0.03, YT, bz1, bz1 + 0.035);   /* pare-chocs */
    /* la grille : lames horizontales et cadre */
    bx(Z.vi, "#5c6875", gx0, gx1, gy0, gy0 + 0.02, bz1 - 0.01, bz1 + 0.01);
    bx(Z.vi, "#5c6875", gx0, gx1, gy1 - 0.02, gy1, bz1 - 0.01, bz1 + 0.01);
    for (let y = gy0 + 0.045; y < gy1 - 0.03; y += 0.045) bxr(Z.vi, "#5c6875", (gx0 + gx1) / 2, y, bz1 - 0.01, gx1 - gx0, 0.018, 0.035, -35, 0, 0);
    /* derrière la grille, le groupe logé : compresseur noir, condenseur, ventilateur */
    bx(Z.vi, "#1e2329", gx0 - 0.1, gx1 + 0.1, 0.1, 0.5, bz0 + 0.35, bz0 + 0.37);
    bx(Z.vi, "#3a424c", gx0 - 0.05, gx1 + 0.05, 0.1, 0.13, bz0 + 0.37, bz1 - 0.08);
    cyv(Z.vi, "#1a1d22", -4.25, 0.13, 0.33, 1.05, 0.085, { seg: 14 });
    sp(Z.vi, "#1a1d22", -4.25, 0.33, 1.05, 0.085, 0.05, 0.085, { seg: 14, seg2: 6 });
    bx(Z.vi, "#2a313b", -4.36, -4.3, 0.2, 0.28, 1.0, 1.1);
    canal(Z.vi, P.cuivre, [[-4.25, 0.36, 1.05], [-4.25, 0.42, 1.05], [-3.9, 0.42, 1.0]], 0.008);
    bx(Z.vi, "#7a838e", -3.95, -3.65, 0.14, 0.45, 0.85, 0.88);
    for (let x = -3.94; x < -3.66; x += 0.025) bx(Z.vi, "#b4bcc6", x, x + 0.006, 0.14, 0.45, 0.88, 0.9);
    cy(Z.vi, "#2a313b", -3.8, 0.3, 0.95, 0.11, 0.03, { axe: "z", seg: 12 });
    /* étiquette losange jaune « gaz inflammable » (R290) et sa flamme */
    ext(Z.vi, "#2a313b", [[0.1, 0], [0.2, 0.1], [0.1, 0.2], [0, 0.1]], 0.004, -4.85, 0.2, bz1);
    ext(Z.vi, C.jaune, [[0.1, 0.012], [0.188, 0.1], [0.1, 0.188], [0.012, 0.1]], 0.004, -4.85, 0.2, bz1 + 0.003);
    ext(Z.vi, "#2a313b", [[0.07, 0.055], [0.13, 0.055], [0.135, 0.09], [0.115, 0.125], [0.108, 0.15], [0.098, 0.128], [0.084, 0.135], [0.078, 0.104], [0.064, 0.085]], 0.003, -4.85, 0.2, bz1 + 0.006);
    bx(Z.vi, "#2a313b", -4.79, -4.71, 0.24, 0.247, bz1 + 0.006, bz1 + 0.009);
    /* bac d'exposition, barquettes et viandes */
    bx(Z.vi, "#dfe4e6", bx0 + 0.04, bx1 - 0.04, YT, YT + 0.04, bz0 + 0.12, bz1 - 0.08);
    const VIANDES = ["#b8323a", "#c9443c", "#e79aa6", "#d9727e", "#a8282f", "#f0b3ae"];
    for (let i = 0; i < 9; i++) {
      const x = bx0 + 0.12 + i * 0.34, c = VIANDES[i % VIANDES.length];
      [0.62, 1.0].forEach(function (z, r) {
        bx(Z.vi, "#f7f5ef", x, x + 0.3, YT + 0.04, YT + 0.07, z - 0.16, z + 0.16);
        bx(Z.vi, "#e9ecef", x + 0.02, x + 0.28, YT + 0.04, YT + 0.071, z - 0.14, z + 0.14);
        const t = (i + r) % 4;
        if (t === 0) for (let k = 0; k < 3; k++) sp(Z.vi, c, x + 0.15, YT + 0.085, z - 0.09 + k * 0.09, 0.12, 0.022, 0.05, { seg: 8, seg2: 4 });   /* steaks */
        else if (t === 1) cy(Z.vi, c, x + 0.15, YT + 0.12, z, 0.06, 0.24, { axe: "x", seg: 10 });                                        /* rôti ficelé */
        else if (t === 2) for (let k = 0; k < 5; k++) cy(Z.vi, "#9c2a2a", x + 0.15, YT + 0.09, z - 0.1 + k * 0.05, 0.016, 0.24, { axe: "x", seg: 6 });  /* saucisses */
        else for (let k = 0; k < 4; k++) cy(Z.vi, c, x + 0.08 + k * 0.045, YT + 0.076 + k * 0.004, z, 0.07, 0.006, { seg: 12 });           /* tranches de jambon en éventail */
        if (t === 1) [-0.07, 0, 0.07].forEach(function (d) { cy(Z.vi, "#f7f5ef", x + 0.15 + d, YT + 0.12, z, 0.062, 0.008, { axe: "x", seg: 10 }); });
        sp(Z.vi, "#5fae54", x + 0.27, YT + 0.08, z + 0.12, 0.03, 0.02, 0.03, { seg: 6, seg2: 4 });   /* persil */
      });
    }
    /* la vitre bombée, faite de facettes, et ses joues vitrées */
    const arc = [];
    for (let k = 0; k <= 7; k++) { const t = k / 7 * Math.PI / 2; arc.push([0.72 + 0.66 * Math.cos(t), YT + 0.04 + 0.39 * Math.sin(t)]); }
    for (let k = 1; k < arc.length; k++) {
      const a = arc[k - 1], b = arc[k], dz = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dz, dy);
      bxr(Z.vi, "#cfe8f2", bx0 + (bx1 - bx0) / 2, (a[1] + b[1]) / 2, (a[0] + b[0]) / 2, bx1 - bx0, L + 0.004, 0.012, Math.atan2(dz, dy) * 180 / Math.PI, 0, 0, { t: 0.32 });
    }
    const joue = [[-(bz0 + 0.02), YT + 0.04]].concat(arc.map(function (p) { return [-p[0], p[1]]; })).concat([[-(bz0 + 0.02), arc[arc.length - 1][1]]]);
    extX(Z.vi, "#cfe8f2", joue, 0.012, bx0, 0, 0, { t: 0.32 });
    extX(Z.vi, "#cfe8f2", joue, 0.012, bx1 - 0.012, 0, 0, { t: 0.32 });
    [bx0 + 0.006, bx1 - 0.006].forEach(function (x) {
      for (let k = 1; k < arc.length; k++) tube(Z.vi, "#5c6875", x, arc[k - 1][1], arc[k - 1][0], x, arc[k][1], arc[k][0], 0.012, { seg: 5 });
      cyv(Z.vi, "#5c6875", x, YT, YT + 0.43, bz0 + 0.03, 0.014, { seg: 5 });
    });
    /* tablette haute en inox, éclairage sous tablette, balance côté boucher */
    bx(Z.vi, C.inox, bx0, bx1, YT + 0.43, YT + 0.45, bz0, 0.74, { edge: 1 });
    bx(Z.vi, C.led, bx0 + 0.05, bx1 - 0.05, YT + 0.415, YT + 0.43, 0.5, 0.68, { lum: 1 });
    bx(Z.vi, "#f7f5ef", -3.95, -3.6, YT + 0.45, YT + 0.5, 0.45, 0.7, { edge: 1 });
    bx(Z.vi, C.inox, -3.93, -3.62, YT + 0.5, YT + 0.51, 0.47, 0.68);
    bx(Z.vi, "#2a313b", -3.9, -3.65, YT + 0.5, YT + 0.6, 0.69, 0.72);
    bx(Z.vi, "#7cf29a", -3.87, -3.68, YT + 0.53, YT + 0.57, 0.72, 0.722, { lum: 1 });
    /* côté boucher : tablette de travail et portes du stockage */
    bx(Z.vi, C.inox, bx0, bx1, YT, YT + 0.04, bz0 - 0.04, bz0 + 0.12, { edge: 1 });
    for (let k = 0; k < 4; k++) {
      const x = bx0 + 0.05 + k * 0.79;
      bx(Z.vi, "#e9ecef", x, x + 0.75, 0.14, YT - 0.06, bz0 - 0.01, bz0, { edge: 1 });
      bx(Z.vi, "#8a94a1", x + 0.3, x + 0.45, YT - 0.14, YT - 0.11, bz0 - 0.025, bz0 - 0.01);
    }
    proxy(Z.vi, bx0, bx1, 0, YT + 0.6, bz0 - 0.05, bz1 + 0.05);
  }
  ancre(Z.vi, -4.9, 1.75, 0.9);

  /* --- la boutique en décor : la caisse et deux gondoles sèches --- */
  const SEC = ["#d94f6a", "#3b82c4", "#f2c94c", "#8fb383", "#e8914a", "#f7f5ef", "#8a5cc8", "#c98254"];
  /* gondole murale : dos contre le mur (côté x0 si dosGauche, sinon côté x1), étagères garnies */
  function gondole(x0, x1, z0, z1, h, dosGauche) {
    const d0 = dosGauche ? x0 : x1 - 0.05, e0 = dosGauche ? x0 + 0.05 : x0, e1 = dosGauche ? x1 : x1 - 0.05;
    const fx = dosGauche ? x1 : x0, s = dosGauche ? -1 : 1;     /* fx : bord avant ; s : vers le fond */
    bx(null, "#3a424c", x0, x1, 0, 0.12, z0, z1);
    bx(null, "#d9dde3", d0, d0 + 0.05, 0.12, h, z0, z1, { edge: 1 });
    for (let y = 0.12; y < h - 0.2; y += 0.38) {
      bx(null, "#e9ecef", e0, e1, y, y + 0.02, z0, z1);
      bx(null, "#f7f5ef", Math.min(fx, fx - s * 0.01), Math.max(fx, fx - s * 0.01), y - 0.03, y + 0.02, z0, z1);
      let z = z0 + 0.02;
      while (z < z1 - 0.1) {
        const w = 0.1 + alea() * 0.14, hh = 0.14 + alea() * 0.16, c = SEC[Math.floor(alea() * SEC.length)];
        if (alea() < 0.3) cyv(null, c, fx + s * 0.1, y + 0.02, y + 0.02 + hh * 0.6, z + w / 2, Math.min(0.05, w / 2), { seg: 8 });
        else bx(null, c, e0 + 0.03, e1 - 0.03, y + 0.02, y + 0.02 + hh, z, z + w, { edge: 1 });
        z += w + 0.015;
      }
    }
    bx(null, "#2f6db5", x0, x1, h - 0.18, h, z0, z1);
  }
  gondole(-2.5, -2.05, -3.6, 0.3, 1.75, false);
  gondole(XG, XG + 0.42, 0.1, 2.6, 1.35, true);
  /* la caisse : comptoir, tapis, écran, terminal de paiement */
  bx(null, "#e4d1ad", -3.3, -2.6, 0, 0.88, 1.7, 2.8, { edge: 1 });
  bx(null, "#2a313b", -3.25, -2.95, 0.88, 0.9, 1.75, 2.75);
  bx(null, "#8a94a1", -2.95, -2.62, 0.88, 0.92, 1.75, 2.75);
  cyv(null, "#3a424c", -2.75, 0.92, 1.25, 2.5, 0.02, { seg: 6 });
  bxr(null, "#2a313b", -2.82, 1.33, 2.5, 0.03, 0.22, 0.3, 0, 0, -12);
  bxr(null, "#bcd8ee", -2.84, 1.33, 2.5, 0.005, 0.18, 0.26, 0, 0, -12, { lum: 1 });
  bx(null, "#2a313b", -2.95, -2.82, 0.92, 0.95, 2.05, 2.15);
  bx(null, "#7cf29a", -2.93, -2.84, 0.95, 0.952, 2.07, 2.13, { lum: 1 });
  bx(null, "#d9dde3", -2.85, -2.62, 0.6, 0.88, 1.72, 2.1);
  /* paniers empilés à l'entrée (bac ajouré, deux anses) */
  for (let k = 0; k < 3; k++) {
    const y = k * 0.07, x0 = -7.6, x1 = -7.18, z0 = 2.3, z1 = 2.6;
    bx(null, "#d63a2f", x0, x1, y, y + 0.02, z0, z1);
    bx(null, "#d63a2f", x0, x1, y, y + 0.2, z0, z0 + 0.015);
    bx(null, "#d63a2f", x0, x1, y, y + 0.2, z1 - 0.015, z1);
    bx(null, "#d63a2f", x0, x0 + 0.015, y, y + 0.2, z0, z1);
    bx(null, "#d63a2f", x1 - 0.015, x1, y, y + 0.2, z0, z1);
  }
  [2.36, 2.54].forEach(function (z) { canal(null, "#2a313b", [[-7.56, 0.34, z], [-7.5, 0.44, z], [-7.28, 0.44, z], [-7.22, 0.34, z]], 0.008); });

  /* =====================================================================
     4. LA SALLE DES MACHINES : centrale CO₂ (R744) transcritique
        Châssis contre le fond, trois compresseurs semi-hermétiques sur
        rail, séparateur d'huile, bouteille liquide, collecteurs, vannes ;
        coffret de la centrale et détecteur de CO₂ ; sur le toit, le
        refroidisseur de gaz en V.
     ===================================================================== */
  {
    const SM = Z.sm, ACIER = "#8a94a1", CP = "#546a7b", CPF = "#3f5263";
    const cx0 = -1.6, cx1 = 1.4, cz0 = -4.6, cz1 = -3.4;
    /* le châssis : longerons en U, poteaux, cadre haut, plots antivibratiles */
    [cz0 + 0.06, cz1 - 0.06].forEach(function (z) {
      bx(SM, P.acierF, cx0, cx1, 0.02, 0.14, z - 0.05, z + 0.05, { edge: 1 });
      bx(SM, P.acierF, cx0, cx1, 2.2, 2.26, z - 0.03, z + 0.03);
      bx(SM, P.acierF, cx0, cx1, 1.3, 1.35, z - 0.03, z + 0.03);
    });
    [cx0 + 0.03, -0.1, cx1 - 0.03].forEach(function (x, i) {
      [cz0 + 0.06, cz1 - 0.06].forEach(function (z) {
        if (i !== 1) bx(SM, P.acierF, x - 0.03, x + 0.03, 0.14, 2.26, z - 0.03, z + 0.03);
        bx(SM, C.caoutchouc, x - 0.06, x + 0.06, 0.0, 0.03, z - 0.06, z + 0.06);
      });
      bx(SM, P.acierF, x - 0.03, x + 0.03, 2.2, 2.26, cz0, cz1);
      bx(SM, P.acierF, x - 0.03, x + 0.03, 1.3, 1.35, cz0, cz1);
    });
    /* rails porte-compresseurs */
    [-4.28, -3.72].forEach(function (z) { bx(SM, "#3a424c", cx0 + 0.05, cx1 - 0.25, 0.14, 0.2, z - 0.035, z + 0.035); });

    /* trois compresseurs semi-hermétiques, vus de profil : moteur ailetté à gauche,
       carter et culasses à droite, vanne d'aspiration sur le flasque moteur */
    [-1.1, -0.25, 0.6].forEach(function (xc) {
      [[-0.28, -4.28], [0.26, -4.28], [-0.28, -3.72], [0.26, -3.72]].forEach(function (p) {
        bx(SM, C.caoutchouc, xc + p[0] - 0.04, xc + p[0] + 0.04, 0.2, 0.24, p[1] - 0.04, p[1] + 0.04);
      });
      [-0.28, 0.26].forEach(function (d) { bx(SM, CPF, xc + d - 0.05, xc + d + 0.05, 0.24, 0.3, -4.32, -3.68); });   /* pattes */
      bx(SM, CP, xc - 0.05, xc + 0.32, 0.28, 0.56, -4.16, -3.84, { edge: 1 });         /* carter */
      cy(SM, CP, xc - 0.2, 0.44, -4.0, 0.155, 0.32, { axe: "x", seg: 16 });            /* moteur */
      for (let k = 0; k < 6; k++) cy(SM, CPF, xc - 0.33 + k * 0.052, 0.44, -4.0, 0.166, 0.014, { axe: "x", seg: 16 });
      cy(SM, CPF, xc - 0.37, 0.44, -4.0, 0.165, 0.04, { axe: "x", seg: 16 });           /* flasque moteur */
      for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; cy(SM, "#c9ced6", xc - 0.392, 0.44 + Math.cos(a) * 0.13, -4.0 + Math.sin(a) * 0.13, 0.012, 0.02, { axe: "x", seg: 6 }); }
      /* deux culasses à ailettes */
      [0.05, 0.2].forEach(function (d) {
        bx(SM, CPF, xc + d - 0.06, xc + d + 0.06, 0.56, 0.68, -4.12, -3.88, { edge: 1 });
        for (let k = 0; k < 3; k++) bx(SM, CP, xc + d - 0.065, xc + d + 0.065, 0.585 + k * 0.03, 0.597 + k * 0.03, -4.13, -3.87);
        bx(SM, CP, xc + d - 0.05, xc + d + 0.05, 0.68, 0.71, -4.09, -3.91);
      });
      /* voyant d'huile et régulateur de niveau sur le carter, résistance de carter */
      cy(SM, "#c9ced6", xc + 0.22, 0.36, -3.835, 0.04, 0.012, { axe: "z", seg: 12 });
      cy(SM, "#e0a82e", xc + 0.22, 0.36, -3.827, 0.028, 0.006, { axe: "z", seg: 12, lum: 1 });
      cy(SM, C.laiton, xc + 0.08, 0.36, -3.82, 0.03, 0.06, { axe: "z", seg: 10 });
      bx(SM, "#2a313b", xc - 0.05, xc + 0.32, 0.3, 0.32, -4.17, -3.83);
      /* boîte à bornes sur le moteur et son câble vers le coffret */
      bx(SM, "#2a313b", xc - 0.28, xc - 0.12, 0.55, 0.64, -4.07, -3.9, { edge: 1 });
      canal(SM, "#2a313b", [[xc - 0.2, 0.64, -3.95], [xc - 0.2, 1.33, -3.95]], 0.012);
      /* vanne d'aspiration (flasque moteur) et vanne de refoulement (culasses) */
      cy(SM, CPF, xc - 0.33, 0.62, -4.0, 0.05, 0.1, { seg: 10 });
      vanne(SM, xc - 0.33, 0.69, -4.0, "y", "#2a313b");
      cyv(SM, ACIER, xc + 0.125, 0.71, 0.8, -4.0, 0.03, { seg: 8 });
      sp(SM, C.laiton, xc + 0.125, 0.82, -4.0, 0.04, 0.04, 0.04, { seg: 8, seg2: 6 });
      /* aspiration isolée vers le collecteur ; refoulement acier vers le collecteur HP */
      canal(SM, P.armaflex, [[xc - 0.33, 0.74, -4.0], [xc - 0.33, 0.95, -4.0], [xc - 0.33, 0.95, -4.45]], 0.035);
      canal(SM, ACIER, [[xc + 0.125, 0.84, -4.0], [xc + 0.125, 1.12, -4.0], [xc + 0.125, 1.12, -3.72]], 0.022);
      /* pressostat de sécurité HP sur la culasse */
      bx(SM, "#2a313b", xc + 0.27, xc + 0.33, 0.7, 0.79, -3.95, -3.88);
      cy(SM, C.rouge, xc + 0.3, 0.8, -3.915, 0.02, 0.02, { seg: 8 });
    });
    /* collecteur d'aspiration (isolé) et collecteur de refoulement (acier) */
    tube(SM, P.armaflex, -1.45, 0.95, -4.45, 1.0, 0.95, -4.45, 0.048, { seg: 12 });
    [-1.45, 1.0].forEach(function (x) { cy(SM, "#1e2329", x, 0.95, -4.45, 0.052, 0.04, { axe: "x", seg: 12 }); });
    tube(SM, ACIER, -1.2, 1.12, -3.72, 1.1, 1.12, -3.72, 0.032, { seg: 10 });
    /* transmetteurs de pression sur les collecteurs */
    [[-1.3, 1.0, -4.45], [-1.05, 1.16, -3.72]].forEach(function (p) {
      cyv(SM, ACIER, p[0], p[1], p[1] + 0.08, p[2], 0.01, { seg: 6 });
      cyv(SM, "#c9ced6", p[0], p[1] + 0.08, p[1] + 0.16, p[2], 0.022, { seg: 10 });
      cyv(SM, "#2a313b", p[0], p[1] + 0.16, p[1] + 0.2, p[2], 0.016, { seg: 8 });
    });
    /* séparateur d'huile vertical, entrée par le collecteur de refoulement */
    const sx = 1.15, sz = -4.0;
    cyv(SM, "#6f7d8a", sx, 0.35, 1.3, sz, 0.12, { seg: 16 });
    sp(SM, "#6f7d8a", sx, 0.35, sz, 0.12, 0.06, 0.12, { seg: 16, seg2: 6 });
    sp(SM, "#6f7d8a", sx, 1.3, sz, 0.12, 0.06, 0.12, { seg: 16, seg2: 6 });
    [[0.09, 0.09], [-0.09, 0.09], [0.09, -0.09], [-0.09, -0.09]].forEach(function (d) { tube(SM, P.acierF, sx + d[0], 0.14, sz + d[1], sx + d[0] * 0.8, 0.4, sz + d[1] * 0.8, 0.012, { seg: 5 }); });
    canal(SM, ACIER, [[1.1, 1.12, -3.72], [sx, 1.12, -3.72], [sx, 1.12, sz + 0.1]], 0.032);
    canal(SM, P.cuivre, [[sx, 0.3, sz], [sx, 0.24, sz], [0.98, 0.24, -3.83], [0.9, 0.4, -3.83]], 0.008);   /* retour d'huile */
    /* bouteille liquide horizontale (réservoir intermédiaire) sur berceaux, avec soupapes */
    const rz = -4.2, ry = 1.62;
    cy(SM, "#7f8d99", -0.3, ry, rz, 0.17, 1.6, { axe: "x", seg: 18 });
    sp(SM, "#7f8d99", -1.1, ry, rz, 0.07, 0.17, 0.17, { seg: 16, seg2: 8 });
    sp(SM, "#7f8d99", 0.5, ry, rz, 0.07, 0.17, 0.17, { seg: 16, seg2: 8 });
    [-0.9, 0.3].forEach(function (x) { bx(SM, P.acierF, x - 0.05, x + 0.05, 1.35, ry - 0.08, rz - 0.15, rz + 0.15); });
    cy(SM, C.jaune, -0.75, ry, rz, 0.172, 0.06, { axe: "x", seg: 18 });          /* bande de repérage */
    [-0.2, 0.05].forEach(function (x) {
      cyv(SM, ACIER, x, ry + 0.16, ry + 0.24, rz, 0.02, { seg: 6 });
      cyv(SM, C.rouge, x, ry + 0.24, ry + 0.38, rz, 0.04, { seg: 10 });
      cyv(SM, "#3a424c", x, ry + 0.38, ry + 0.44, rz, 0.028, { seg: 8 });
    });
    tube(SM, ACIER, -0.2, ry + 0.2, rz, 0.05, ry + 0.2, rz, 0.02, { seg: 6 });     /* inverseur des soupapes */
    manometre(SM, -0.6, ry + 0.3, rz + 0.12, 0.07, "z");
    tube(SM, ACIER, -0.6, ry + 0.17, rz, -0.6, ry + 0.3, rz + 0.08, 0.008, { seg: 5 });
    /* la vanne haute pression motorisée sur le retour du refroidisseur de gaz */
    canal(SM, ACIER, [[1.3, 2.26, -3.8], [1.3, 1.95, -3.8], [0.75, 1.95, -3.8], [0.6, 1.95, rz], [0.5, ry, rz]], 0.022);
    bx(SM, "#2a313b", 0.92, 1.08, 1.92, 2.12, -3.88, -3.72, { edge: 1 });
    cy(SM, "#c9ced6", 1.0, 1.95, -3.8, 0.045, 0.14, { axe: "x", seg: 10 });
    /* départ vers le meuble mural : sortie en haut du châssis (−0,2 ; 2,4 ; −4,4) */
    canal(SM, P.cuivre, [[-0.26, ry - 0.17, rz], [-0.26, 1.42, rz], [-0.26, 1.42, -4.4], [-0.26, 2.4, -4.4]], 0.012);
    canal(SM, P.armaflex, [[-0.12, 0.95, -4.45], [-0.12, 1.3, -4.45], [-0.12, 1.3, -4.4], [-0.12, 2.4, -4.4]], 0.03);
    vanne(SM, -0.26, 2.1, -4.4, "y", "#e8914a");
    vanne(SM, -0.12, 2.0, -4.4, "y", C.rouge);
    /* tableau de manomètres en façade du châssis : BP, HP, huile */
    bx(SM, "#d9dde3", -1.4, -0.75, 1.42, 1.72, cz1 - 0.03, cz1, { edge: 1 });
    [["#3b82c4", -1.3], [C.rouge, -1.08], ["#2a313b", -0.86]].forEach(function (g) { manometre(SM, g[1] + 0.02, 1.57, cz1 + 0.01, 0.075, "z", g[0]); });
    /* traversée de dalle : refoulement vers le refroidisseur, retour HP */
    canal(SM, ACIER, [[sx, 1.36, sz], [sx, 4.75, sz]], 0.03);
    cyv(SM, ACIER, 1.3, 2.26, 4.75, -3.8, 0.026, { seg: 8 });
    [[sx, sz], [1.3, -3.8]].forEach(function (p) {
      cyv(SM, "#b7bcc5", p[0], 3.9, 4.02, p[1], 0.06, { seg: 10 });            /* fourreau sous dalle */
      cyv(SM, "#7d8794", p[0], 4.35, 4.55, p[1], 0.065, { seg: 10 });          /* manchon d'étanchéité */
      cy(SM, "#5c6875", p[0], 4.56, p[1], 0.09, 0.03, { seg: 10, rt: 0.04 });
    });

    /* le coffret de la centrale, sur la cloison, face au local */
    bx(SM, "#d3d8de", -1.95, -1.77, 0.95, 1.95, -3.35, -2.45, { edge: 1 });
    bx(SM, "#e6e9ed", -1.77, -1.765, 1.0, 1.9, -3.3, -2.5);
    bx(SM, "#1e2630", -1.765, -1.76, 1.55, 1.75, -3.15, -2.85);
    bx(SM, "#8fe3ff", -1.76, -1.758, 1.58, 1.72, -3.12, -2.88, { lum: 1 });
    [["#39c77a", -2.75], ["#f2a03d", -2.65], ["#e34a3a", -2.55]].forEach(function (l) { sp(SM, l[0], -1.76, 1.65, l[1], 0.02, 0.02, 0.02, { seg: 8, seg2: 5, lum: 1 }); });
    bx(SM, C.jaune, -1.765, -1.755, 1.2, 1.36, -3.1, -2.94);
    cy(SM, C.rouge, -1.745, 1.28, -3.02, 0.045, 0.025, { axe: "x", seg: 10 });
    bx(SM, "#2a313b", -1.78, -1.76, 1.3, 1.42, -2.58, -2.54);
    bx(SM, "#9aa5b1", -1.9, -1.8, 1.95, 4.0, -3.0, -2.8);                       /* goulotte vers le plafond */
    bx(SM, "#9aa5b1", -1.9, 1.3, 3.9, 3.96, -3.0, -2.8);
    bx(SM, "#9aa5b1", 1.25, 1.35, 2.26, 3.96, -3.0, -2.8);
    bx(SM, "#9aa5b1", -1.6, 1.4, 2.26, 2.3, -3.0, -2.8);
    /* détecteur de CO₂ mural (jaune et noir) avec son flash, au ras du sol */
    bx(SM, C.jaune, 1.46, 1.7, 0.42, 0.68, -4.75, -4.68, { edge: 1 });
    bx(SM, "#2a313b", 1.46, 1.7, 0.42, 0.48, -4.68, -4.675);
    for (let k = 0; k < 4; k++) bx(SM, "#2a313b", 1.5 + k * 0.05, 1.52 + k * 0.05, 0.52, 0.62, -4.68, -4.675);
    cyv(SM, "#ff6a3d", 1.58, 0.75, 0.86, -4.71, 0.04, { seg: 10, lum: 1 });
    bx(SM, "#2a313b", 1.54, 1.62, 0.68, 0.75, -4.75, -4.7);

    /* --- le refroidisseur de gaz sur le toit : batterie en V, deux ventilateurs, plots --- */
    const gx0 = -1.6, gx1 = 1.4, gz0 = -4.4, gz1 = -2.6, gzc = (gz0 + gz1) / 2;
    [[gx0 + 0.15, gz0 + 0.15], [gx1 - 0.15, gz0 + 0.15], [gx0 + 0.15, gz1 - 0.15], [gx1 - 0.15, gz1 - 0.15], [-0.1, gz0 + 0.15], [-0.1, gz1 - 0.15]].forEach(function (p) {
      bx(SM, "#b7bcc5", p[0] - 0.14, p[0] + 0.14, HD, HD + 0.12, p[1] - 0.14, p[1] + 0.14, { edge: 1 });
      bx(SM, C.caoutchouc, p[0] - 0.08, p[0] + 0.08, HD + 0.12, HD + 0.15, p[1] - 0.08, p[1] + 0.08);
      bx(SM, P.acierF, p[0] - 0.04, p[0] + 0.04, HD + 0.15, 4.75, p[1] - 0.04, p[1] + 0.04);
    });
    [gz0 + 0.15, gz1 - 0.15].forEach(function (z) { bx(SM, P.acierF, gx0, gx1, 4.66, 4.75, z - 0.05, z + 0.05, { edge: 1 }); });
    /* les deux nappes de la batterie, inclinées en V */
    const yb = 4.78, yh = 5.45;
    [-1, 1].forEach(function (s) {
      const za = gzc + s * 0.06, zb = gzc + s * 0.82, dz = zb - za, dy = yh - yb, L = Math.hypot(dz, dy);
      const ang = Math.atan2(dz, dy) * 180 / Math.PI, mzz = (za + zb) / 2, myy = (yb + yh) / 2;
      bxr(SM, "#6f7a86", (gx0 + gx1) / 2, myy, mzz, gx1 - gx0 - 0.2, L, 0.1, ang, 0, 0);
      /* ailettes : la face extérieure de la nappe, décalée selon sa normale */
      const ox = Math.abs(Math.sin(ang * Math.PI / 180)) * 0.052, oz = s * Math.cos(ang * Math.PI / 180) * 0.052;
      for (let x = gx0 + 0.13; x < gx1 - 0.1; x += 0.04) bxr(SM, "#c3cad3", x, myy + ox, mzz + oz, 0.008, L, 0.006, ang, 0, 0);
    });
    /* flasques d'extrémité, capot supérieur et ventilateurs */
    [[gx0, gx0 + 0.1], [gx1 - 0.1, gx1]].forEach(function (e) { bx(SM, "#dfe3e8", e[0], e[1], 4.75, 5.5, gz0, gz1, { edge: 1 }); });
    bx(SM, "#dfe3e8", gx0, gx1, 5.45, 5.5, gz0, gz1, { edge: 1 });
    bx(SM, P.acierF, gx0, gx1, 4.75, 4.82, gzc - 0.1, gzc + 0.1);
    [-0.8, 0.6].forEach(function (x) { ventilateur(SM, x, 5.52, gzc, 0.52, "y"); });
    /* collecteurs d'entrée et de sortie, côté x+, reliés aux traversées */
    canal(SM, ACIER, [[sx, 4.75, sz], [sx, 4.9, sz], [gx1 + 0.05, 4.9, sz]], 0.028);
    canal(SM, ACIER, [[1.3, 4.75, -3.8], [1.3, 5.3, -3.8], [gx1 + 0.05, 5.3, -3.8]], 0.024);
    cyv(SM, ACIER, gx1 + 0.05, 4.85, 5.4, sz, 0.035, { seg: 8 });
    cyv(SM, ACIER, gx1 + 0.05, 4.85, 5.4, -3.8, 0.03, { seg: 8 });
    bx(SM, "#2a313b", gx1 - 0.02, gx1 + 0.08, 5.0, 5.2, -3.1, -2.9);           /* boîte de raccordement des moteurs */

    ancre(SM, -0.1, 2.75, -3.3);
    proxy(SM, cx0, cx1, 0, 2.45, cz0, cz1 + 0.05);
    proxy(SM, -1.95, -1.75, 0.95, 1.95, -3.35, -2.45);
    proxy(SM, 1.45, 1.72, 0.4, 0.9, -4.75, -4.65);
    proxy(SM, gx0, gx1 + 0.1, HD, 5.65, gz0, gz1);
  }

  /* =====================================================================
     5. L'ARMOIRE ÉLECTRIQUE DU FROID (armoire) et l'électricien en EPI
        Contre la cloison, face au local. Porte gauche grande ouverte :
        rails DIN, disjoncteurs, contacteurs et relais thermiques,
        bornier gris / bleu / vert-jaune, goulottes. Porte droite fermée :
        sectionneur rouge et jaune consigné au cadenas, voyants, triangle.
        Devant, l'électricien vérifie l'absence de tension au VAT.
     ===================================================================== */
  {
    const AR = Z.ar, TOLE = "#d3d8de", ax0 = -1.95, ax1 = -1.45, az0 = -1.6, az1 = 0.2, ay1 = 2.1;
    const XP = -1.9, XF = XP + 0.012;                  /* plaque de montage, face avant */
    /* socle, caisse (dos, flancs, toit, fond), montant central */
    bx(AR, "#3a424c", ax0 + 0.02, ax1 - 0.03, 0, 0.1, az0 + 0.02, az1 - 0.02);
    bx(AR, TOLE, ax0, ax0 + 0.03, 0.1, ay1, az0, az1, { edge: 1 });
    bx(AR, TOLE, ax0, ax1, 0.1, ay1, az0, az0 + 0.03, { edge: 1 });
    bx(AR, TOLE, ax0, ax1, 0.1, ay1, az1 - 0.03, az1, { edge: 1 });
    bx(AR, TOLE, ax0, ax1, ay1 - 0.03, ay1, az0, az1, { edge: 1 });
    bx(AR, TOLE, ax0, ax1, 0.1, 0.14, az0, az1);
    bx(AR, "#c3c9d0", ax1 - 0.04, ax1, 0.14, ay1 - 0.03, -0.72, -0.68);
    /* plaque de montage (teinte sombre : les appareils blancs ressortent) */
    bx(AR, "#6f7c8a", XP, XF, 0.18, 2.02, az0 + 0.05, az1 - 0.05);
    /* goulottes grises à couvercle : verticales et horizontales */
    const GOU = "#a9afb6", GOUc = "#c9ced3";
    [[-1.53, -1.47], [-0.66, -0.6], [0.08, 0.14]].forEach(function (g) {
      bx(AR, GOU, XF, XF + 0.07, 0.3, 1.98, g[0], g[1]);
      bx(AR, GOUc, XF + 0.07, XF + 0.075, 0.3, 1.98, g[0] - 0.004, g[1] + 0.004);
    });
    [1.92, 1.52, 1.1, 0.7].forEach(function (y) {
      bx(AR, GOU, XF, XF + 0.07, y, y + 0.06, az0 + 0.06, az1 - 0.06);
      bx(AR, GOUc, XF + 0.07, XF + 0.075, y - 0.004, y + 0.064, az0 + 0.06, az1 - 0.06);
    });
    /* rails DIN */
    const rail = function (y) { bx(AR, "#b9c2ca", XF, XF + 0.008, y - 0.0175, y + 0.0175, az0 + 0.08, az1 - 0.08); };
    /* rangée 1 : disjoncteur de tête tétrapolaire et disjoncteurs modulaires */
    rail(1.71);
    let z = -0.58;
    [4, 2, 2, 2, 1, 1, 2, 2, 1, 1].forEach(function (pol, i) {
      const w = 0.018 * pol;
      bx(AR, "#f4f4f0", XF + 0.008, XF + 0.075, 1.6, 1.82, z, z + w - 0.001, { edge: 1 });
      bx(AR, "#e6e6e0", XF + 0.075, XF + 0.085, 1.66, 1.76, z + 0.002, z + w - 0.003);
      bx(AR, i === 0 ? C.rouge : "#2a313b", XF + 0.085, XF + 0.1, 1.69, 1.73, z + 0.004, z + w - 0.005);
      for (let k = 0; k < pol; k++) {
        const zz = z + 0.009 + k * 0.018;
        tube(AR, ["#7a4b2a", "#2a313b", "#8a94a1", "#2f6db5"][k % 4], XF + 0.05, 1.82, zz, XF + 0.05, 1.92, zz, 0.0035, { seg: 4 });
      }
      z += w + 0.002;
    });
    bx(AR, "#2f6db5", XF + 0.008, XF + 0.075, 1.6, 1.82, z + 0.01, z + 0.055, { edge: 1 });      /* différentiel bleu */
    bx(AR, "#f4f4f0", XF + 0.075, XF + 0.09, 1.7, 1.73, z + 0.02, z + 0.045);
    /* rangée 2 : contacteurs et relais thermiques (bouton de réarmement bleu) */
    rail(1.38);
    [-0.56, -0.43, -0.3, -0.17, -0.04].forEach(function (zc, i) {
      bx(AR, "#b9c0c7", XF + 0.008, XF + 0.09, 1.31, 1.48, zc, zc + 0.11, { edge: 1 });
      bx(AR, "#5c6875", XF + 0.09, XF + 0.1, 1.36, 1.44, zc + 0.02, zc + 0.09);
      bx(AR, "#f4f4f0", XF + 0.1, XF + 0.102, 1.38, 1.42, zc + 0.035, zc + 0.075);
      bx(AR, "#9aa1a9", XF + 0.008, XF + 0.08, 1.2, 1.31, zc + 0.005, zc + 0.105);
      cy(AR, "#2f6db5", XF + 0.085, 1.27, zc + 0.03, 0.012, 0.012, { axe: "x", seg: 8 });
      cy(AR, "#f4f4f0", XF + 0.083, 1.24, zc + 0.075, 0.016, 0.006, { axe: "x", seg: 10 });
      bx(AR, "#e34a3a", XF + 0.08, XF + 0.083, 1.22, 1.23, zc + 0.07, zc + 0.08);
      [0.025, 0.055, 0.085].forEach(function (d) {
        tube(AR, i < 3 ? ["#7a4b2a", "#2a313b", "#8a94a1"][Math.round(d * 30) % 3] : "#2a313b", XF + 0.05, 1.48, zc + d, XF + 0.05, 1.52, zc + d, 0.0035, { seg: 4 });
        tube(AR, "#2a313b", XF + 0.05, 1.2, zc + d, XF + 0.05, 1.16, zc + d, 0.0035, { seg: 4 });
      });
    });
    /* rangée 3 : régulateur, alimentation 24 V, relais à LED */
    rail(0.92);
    bx(AR, "#2a313b", XF + 0.008, XF + 0.08, 0.82, 1.03, -0.58, -0.42, { edge: 1 });
    bx(AR, "#7cf29a", XF + 0.08, XF + 0.082, 0.93, 0.99, -0.56, -0.44, { lum: 1 });
    bx(AR, "#d9dde3", XF + 0.008, XF + 0.09, 0.82, 1.03, -0.4, -0.3, { edge: 1 });
    sp(AR, "#39c77a", XF + 0.09, 0.98, -0.32, 0.007, 0.007, 0.007, { seg: 6, seg2: 4, lum: 1 });
    for (let k = 0; k < 7; k++) {
      const zc = -0.27 + k * 0.032;
      bx(AR, "#e7e9ec", XF + 0.008, XF + 0.07, 0.84, 1.0, zc, zc + 0.028, { edge: 1 });
      bx(AR, "#e8914a", XF + 0.07, XF + 0.075, 0.9, 0.97, zc + 0.004, zc + 0.024);
      sp(AR, k % 3 ? "#f2a03d" : "#39c77a", XF + 0.076, 0.87, zc + 0.014, 0.004, 0.004, 0.004, { seg: 5, seg2: 3, lum: 1 });
    }
    /* rangée 4 : le bornier — gris (phases), bleu (neutre), vert-jaune (terre) */
    rail(0.53);
    for (let k = 0; k < 64; k++) {
      const zc = -0.56 + k * 0.0102;
      let c = k % 4 === 3 ? "#2f6db5" : "#8f969e";
      if (k >= 52) c = "#3d9a4a";
      bx(AR, c, XF + 0.008, XF + 0.06, 0.44, 0.62, zc, zc + 0.0092);
      if (k >= 52) bx(AR, C.jaune, XF + 0.06, XF + 0.062, 0.44, 0.62, zc + 0.002, zc + 0.006);
      bx(AR, "#f4f4f0", XF + 0.06, XF + 0.063, 0.55, 0.58, zc + 0.001, zc + 0.008);
      if (k % 2 === 0) tube(AR, k >= 52 ? "#3d9a4a" : (k % 4 === 0 ? "#7a4b2a" : "#2a313b"), XF + 0.03, 0.62, zc + 0.005, XF + 0.03, 0.7, zc + 0.005, 0.003, { seg: 4 });
    }
    bx(AR, "#2a313b", XF + 0.008, XF + 0.065, 0.43, 0.63, -0.575, -0.563);
    bx(AR, "#2a313b", XF + 0.008, XF + 0.065, 0.43, 0.63, 0.093, 0.105);
    /* câbles d'arrivée qui descendent vers le fond de l'armoire */
    [-0.5, -0.38, -0.22, -0.05].forEach(function (zc, i) {
      canal(AR, i === 0 ? "#2a313b" : "#3a424c", [[XF + 0.035, 0.44, zc], [XF + 0.035, 0.3, zc], [XF + 0.06, 0.16, zc + 0.02]], 0.012);
    });
    /* sortie de câbles par le haut (−1,7 ; 2,1 ; −0,7) : presse-étoupes et départs */
    bx(AR, "#9aa1a9", -1.86, -1.54, ay1, ay1 + 0.03, -0.86, -0.54);
    [[-1.76, -0.78], [-1.7, -0.7], [-1.64, -0.62]].forEach(function (p) {
      cyv(AR, "#2a313b", p[0], ay1 + 0.03, ay1 + 0.07, p[1], 0.025, { seg: 8 });
      cyv(AR, "#3a424c", p[0], ay1 + 0.07, ay1 + 0.3, p[1], 0.016, { seg: 8 });
    });

    /* la porte droite, fermée : sectionneur consigné, voyants, triangle de danger */
    const pd0 = az0 + 0.02, pd1 = -0.705, xd = ax1, xe = ax1 + 0.022;
    bx(AR, "#d9dee3", xd, xe, 0.12, 2.08, pd0, pd1, { edge: 1 });
    bx(AR, "#c3c9d0", xe, xe + 0.003, 0.2, 2.0, pd0 + 0.06, pd1 - 0.06);
    bx(AR, "#2a313b", xe, xe + 0.03, 1.0, 1.18, pd1 - 0.07, pd1 - 0.04);               /* poignée */
    [0.4, 1.8].forEach(function (y) { cyv(AR, "#8a94a1", xd + 0.01, y - 0.07, y + 0.07, pd0 - 0.005, 0.012, { seg: 6 }); });
    /* sectionneur rotatif : platine jaune, manette rouge en position 0 (horizontale) */
    const sy = 1.6, sz = -0.95;
    bx(AR, C.jaune, xe, xe + 0.006, sy - 0.08, sy + 0.08, sz - 0.08, sz + 0.08, { edge: 1 });
    cy(AR, C.rouge, xe + 0.025, sy, sz, 0.04, 0.04, { axe: "x", seg: 14 });
    bx(AR, C.rouge, xe + 0.02, xe + 0.06, sy - 0.02, sy + 0.02, sz - 0.075, sz + 0.075);
    /* cadenas de consignation et son étiquette rouge */
    bx(AR, "#d9dde3", xe + 0.006, xe + 0.03, sy - 0.07, sy - 0.035, sz - 0.008, sz + 0.008);
    canal(AR, "#c9ced6", [[xe + 0.03, sy - 0.1, sz - 0.015], [xe + 0.03, sy - 0.045, sz - 0.015], [xe + 0.03, sy - 0.045, sz + 0.015], [xe + 0.03, sy - 0.1, sz + 0.015]], 0.004);
    bx(AR, C.rouge, xe + 0.012, xe + 0.05, sy - 0.16, sy - 0.1, sz - 0.025, sz + 0.025, { edge: 1 });
    cy(AR, "#2a313b", xe + 0.051, sy - 0.14, sz, 0.007, 0.003, { axe: "x", seg: 6 });
    bxr(AR, C.rouge, xe + 0.045, sy - 0.24, sz + 0.03, 0.004, 0.11, 0.065, 0, 0, 0);
    bxr(AR, "#ffffff", xe + 0.048, sy - 0.25, sz + 0.03, 0.002, 0.05, 0.045, 0, 0, 0);
    canal(AR, "#2a313b", [[xe + 0.045, sy - 0.16, sz + 0.01], [xe + 0.045, sy - 0.19, sz + 0.03]], 0.002);
    /* voyants (éteints : l'armoire est consignée) */
    [["#2fa85a", -1.06], ["#e8914a", -0.96], [C.rouge, -0.86]].forEach(function (v) {
      cy(AR, "#c9ced6", xe + 0.008, 1.88, v[1], 0.022, 0.016, { axe: "x", seg: 12 });
      cy(AR, v[0], xe + 0.02, 1.88, v[1], 0.016, 0.012, { axe: "x", seg: 12 });
    });
    /* triangle de danger électrique (jaune, bord noir, éclair) */
    extX(AR, "#2a313b", [[0, 0], [0.22, 0], [0.11, 0.19]], 0.003, xe, 1.76, -1.26);
    extX(AR, C.jaune, [[0.018, 0.01], [0.202, 0.01], [0.11, 0.168]], 0.003, xe + 0.003, 1.76, -1.26);
    extX(AR, "#2a313b", [[0.1, 0.03], [0.125, 0.03], [0.118, 0.075], [0.135, 0.075], [0.105, 0.135], [0.11, 0.09], [0.093, 0.09]], 0.003, xe + 0.006, 1.76, -1.26);
    /* la porte gauche, grande ouverte (150°) : pochette à schémas sur sa face intérieure */
    {
      const L = 0.87, th = 150 * Math.PI / 180, ux = Math.sin(th), uz = -Math.cos(th);
      const hz = az1 - 0.02, mx = ax1 + ux * L / 2, mz = hz + uz * L / 2, ry = Math.atan2(-uz, ux) * 180 / Math.PI;
      const nx = uz, nz = -ux;                       /* normale de la face intérieure (vers l'électricien) */
      bxr(AR, "#d9dee3", mx, 1.1, mz, L, 1.96, 0.022, 0, ry, 0);
      bxr(AR, "#c3c9d0", mx + nx * 0.012, 1.1, mz + nz * 0.012, L - 0.1, 1.82, 0.003, 0, ry, 0);
      bxr(AR, "#7d8794", mx + nx * 0.02, 1.35, mz + nz * 0.02, 0.36, 0.42, 0.012, 0, ry, 0);
      bxr(AR, "#fbfaf5", mx + nx * 0.024, 1.5, mz + nz * 0.024, 0.3, 0.2, 0.006, 0, ry, 0);
      for (let k = 0; k < 4; k++) bxr(AR, "#9aa5b1", mx + nx * 0.028, 1.56 - k * 0.035, mz + nz * 0.028, 0.22 - k * 0.03, 0.008, 0.002, 0, ry, 0);
      bxr(AR, "#2a313b", ax1 + ux * (L - 0.06) + nx * 0.03, 1.1, hz + uz * (L - 0.06) + nz * 0.03, 0.03, 0.18, 0.03, 0, ry, 0);
      [0.4, 1.8].forEach(function (y) { cyv(AR, "#8a94a1", ax1 + 0.01, y - 0.07, y + 0.07, hz, 0.012, { seg: 6 }); });
    }

    /* --- l'électricien en EPI, tourné vers l'armoire (vers −x) --- */
    const px = -0.82, pz = -0.62, BLEU = C.marine, GANT = "#b8322a", REFL = "#d9e1e6";
    /* chaussures de sécurité (coque, semelle) */
    [-0.1, 0.1].forEach(function (d) {
      bx(AR, "#1e2329", px - 0.16, px + 0.12, 0.02, 0.1, pz + d - 0.055, pz + d + 0.055, { edge: 1 });
      bx(AR, "#3a424c", px - 0.17, px + 0.13, 0.0, 0.03, pz + d - 0.06, pz + d + 0.06);
      sp(AR, "#1e2329", px - 0.15, 0.07, pz + d, 0.05, 0.045, 0.055, { seg: 8, seg2: 5 });
      /* jambes du pantalon de travail, genouillère, bande réfléchissante */
      cyv(AR, BLEU, px, 0.1, 0.9, pz + d, 0.078, { seg: 10, rt: 0.09 });
      cyv(AR, REFL, px, 0.28, 0.32, pz + d, 0.081, { seg: 10 });
      bx(AR, "#2a313b", px - 0.1, px - 0.06, 0.42, 0.56, pz + d - 0.05, pz + d + 0.05);
    });
    /* bassin, ceinture porte-outils, buste penché vers l'armoire */
    bx(AR, BLEU, px - 0.11, px + 0.11, 0.84, 0.98, pz - 0.19, pz + 0.19);
    bx(AR, "#3a2a1e", px - 0.12, px + 0.12, 0.92, 0.97, pz - 0.2, pz + 0.2);
    bx(AR, "#5a4030", px - 0.02, px + 0.1, 0.8, 0.93, pz + 0.18, pz + 0.24);
    bxr(AR, BLEU, px - 0.03, 1.2, pz, 0.24, 0.5, 0.42, 0, 0, 10);
    bxr(AR, REFL, px - 0.03, 1.1, pz, 0.248, 0.035, 0.428, 0, 0, 10);
    bxr(AR, REFL, px - 0.075, 1.34, pz, 0.248, 0.035, 0.428, 0, 0, 10);
    bxr(AR, "#e8914a", px - 0.035, 1.22, pz, 0.25, 0.012, 0.43, 0, 0, 10);
    /* cou, tête, casque blanc et écran facial */
    cyv(AR, C.peau, px - 0.1, 1.44, 1.52, pz, 0.05, { seg: 8 });
    sp(AR, C.peau, px - 0.12, 1.62, pz, 0.1, 0.115, 0.1, { seg: 12, seg2: 8 });
    sp(AR, "#f7f5ef", px - 0.11, 1.69, pz, 0.135, 0.1, 0.13, { seg: 14, seg2: 8 });
    bx(AR, "#f7f5ef", px - 0.27, px - 0.2, 1.68, 1.7, pz - 0.11, pz + 0.11);
    bx(AR, "#3a424c", px - 0.28, px - 0.23, 1.67, 1.71, pz - 0.14, pz + 0.14);
    bxr(AR, "#8fd3c6", px - 0.27, 1.56, pz, 0.012, 0.22, 0.27, 0, 0, 10, { t: 0.45 });
    bx(AR, "#3a424c", px - 0.11, px - 0.07, 1.6, 1.7, pz - 0.13, pz - 0.115);
    bx(AR, "#3a424c", px - 0.11, px - 0.07, 1.6, 1.7, pz + 0.115, pz + 0.13);
    /* bras : épaules → coudes → mains gantées (gants isolants à manchette) */
    const vatG = [-1.36, 1.38, -0.42], vatD = [-1.36, 1.42, -0.2];
    [[pz - 0.2, vatG, [-1.08, 1.2, -0.62]], [pz + 0.2, vatD, [-1.08, 1.24, -0.32]]].forEach(function (b) {
      const ep = [px - 0.06, 1.4, b[0]], co = b[2], ma = b[1];
      canal(AR, BLEU, [ep, co, [co[0] + (ma[0] - co[0]) * 0.45, co[1] + (ma[1] - co[1]) * 0.45, co[2] + (ma[2] - co[2]) * 0.45]], 0.052);
      sp(AR, BLEU, ep[0], ep[1], ep[2], 0.065, 0.065, 0.065, { seg: 8, seg2: 6 });
      tube(AR, GANT, co[0] + (ma[0] - co[0]) * 0.4, co[1] + (ma[1] - co[1]) * 0.4, co[2] + (ma[2] - co[2]) * 0.4, ma[0] + 0.04, ma[1], ma[2], 0.046, { seg: 8 });
      sp(AR, GANT, ma[0] + 0.02, ma[1], ma[2], 0.045, 0.04, 0.045, { seg: 8, seg2: 6 });
    });
    /* le VAT jaune (écran allumé), sa pointe de touche, la seconde pointe et le cordon */
    {
      const a = vatG, tip = [-1.78, 1.47, -0.36];
      tube(AR, C.jaune, a[0] + 0.02, a[1] - 0.01, a[2], a[0] - 0.24, a[1] + 0.04, a[2] + 0.01, 0.042, { seg: 10 });
      bx(AR, "#2a313b", a[0] - 0.2, a[0] - 0.08, a[1] + 0.035, a[1] + 0.075, a[2] - 0.028, a[2] + 0.028);
      bx(AR, "#9ef0a8", a[0] - 0.19, a[0] - 0.09, a[1] + 0.075, a[1] + 0.078, a[2] - 0.022, a[2] + 0.022, { lum: 1 });
      tube(AR, "#2a313b", a[0] - 0.24, a[1] + 0.04, a[2] + 0.01, tip[0], tip[1], tip[2], 0.009, { seg: 5 });
      tube(AR, "#c9ced6", tip[0] + 0.03, tip[1] - 0.003, tip[2], tip[0], tip[1], tip[2], 0.003, { seg: 4 });
      const b = vatD, tip2 = [-1.78, 1.5, -0.14];
      tube(AR, C.jaune, b[0] + 0.04, b[1], b[2], b[0] - 0.1, b[1] + 0.03, b[2] + 0.01, 0.022, { seg: 8 });
      tube(AR, "#2a313b", b[0] - 0.1, b[1] + 0.03, b[2] + 0.01, tip2[0], tip2[1], tip2[2], 0.007, { seg: 5 });
      canal(AR, "#2a313b", [[a[0] + 0.06, a[1] - 0.01, a[2]], [a[0] + 0.1, a[1] - 0.2, a[2] + 0.08], [b[0] + 0.08, b[1] - 0.22, b[2] - 0.05], [b[0] + 0.04, b[1], b[2]]], 0.006);
    }
    /* sacoche d'outils posée au sol */
    bx(AR, "#2f6db5", -0.42, -0.12, 0.0, 0.22, -1.35, -1.15, { edge: 1 });
    bx(AR, "#2a313b", -0.42, -0.12, 0.22, 0.24, -1.3, -1.2);
    tube(AR, "#2a313b", -0.4, 0.24, -1.25, -0.27, 0.36, -1.25, 0.008, { seg: 4 });
    tube(AR, "#2a313b", -0.27, 0.36, -1.25, -0.14, 0.24, -1.25, 0.008, { seg: 4 });
    /* chaîne de balisage rouge et blanche, posée au sol, et deux potelets */
    {
      const pts = [[-1.45, -1.85], [-0.12, -1.85], [-0.12, 1.15], [-1.4, 1.15]];
      let n = 0;
      for (let i = 1; i < pts.length; i++) {
        const A = pts[i - 1], B = pts[i], L = Math.hypot(B[0] - A[0], B[1] - A[1]), m = Math.round(L / 0.08);
        for (let k = 0; k < m; k++) {
          const t0 = k / m, t1 = (k + 0.85) / m;
          tube(AR, n++ % 2 ? "#f7f5ef" : C.rouge, A[0] + (B[0] - A[0]) * t0, 0.015, A[1] + (B[1] - A[1]) * t0, A[0] + (B[0] - A[0]) * t1, 0.015, A[1] + (B[1] - A[1]) * t1, 0.012, { seg: 5 });
        }
      }
      [[-0.12, -1.85], [-0.12, 1.15]].forEach(function (p) {
        cy(AR, "#2a313b", p[0], 0.025, p[1], 0.13, 0.05, { seg: 12 });
        for (let k = 0; k < 4; k++) cyv(AR, k % 2 ? "#f7f5ef" : C.rouge, p[0], 0.05 + k * 0.2, 0.25 + k * 0.2, p[1], 0.022, { seg: 8 });
        sp(AR, C.rouge, p[0], 0.86, p[1], 0.03, 0.03, 0.03, { seg: 8, seg2: 5 });
      });
    }
    ancre(AR, -1.45, 2.5, -0.7);
    proxy(AR, ax0, ax1 + 0.05, 0, ay1 + 0.3, az0, az1);
    proxy(AR, ax1, -1.0, 0.1, 2.08, az1, 0.98);
    proxy(AR, -1.8, -0.55, 0, 1.85, -1.0, -0.1);
  }

  /* =====================================================================
     6. LE GROUPE DE CONDENSATION SUR LE TOIT (groupe)
        Il alimente la chambre froide. Deux ventilateurs en façade,
        batterie au dos et sur le flanc gauche ; le panneau de service
        du compartiment compresseur est déposé contre le flanc droit.
     ===================================================================== */
  {
    const GR = Z.gr, CAIS = "#e4e6e2", g0 = -6.0, g1 = -3.2, gz0 = -4.3, gz1 = -2.4, gyb = 4.6, gyh = 5.9, gs = -4.15;
    /* rails galvanisés sur plots caoutchouc */
    [-4.1, -2.6].forEach(function (z) {
      bx(GR, P.galva, g0 + 0.1, g1 - 0.1, HD + 0.03, gyb, z - 0.05, z + 0.05, { edge: 1 });
      [g0 + 0.25, g1 - 0.25].forEach(function (x) { bx(GR, C.caoutchouc, x - 0.08, x + 0.08, HD, HD + 0.03, z - 0.07, z + 0.07); });
    });
    /* bac de base, toit, montants */
    bx(GR, "#c9ced3", g0, g1, gyb, gyb + 0.08, gz0, gz1, { edge: 1 });
    bx(GR, CAIS, g0 - 0.02, g1 + 0.02, gyh - 0.05, gyh, gz0 - 0.02, gz1 + 0.02, { edge: 1 });
    [[g0, gz1], [gs, gz1], [g1, gz1], [g0, gz0], [g1, gz0]].forEach(function (p) {
      bx(GR, "#c9ced3", p[0] - (p[0] === g1 ? 0.05 : 0), p[0] + (p[0] === g1 ? 0 : 0.05), gyb + 0.08, gyh - 0.05, p[1] - (p[1] === gz1 ? 0.05 : 0), p[1] + (p[1] === gz1 ? 0 : 0.05));
    });
    /* section ventilée : façade à deux ventilateurs, batterie au dos et à gauche */
    bx(GR, CAIS, g0, gs, gyb + 0.08, gyh - 0.05, gz1 - 0.03, gz1, { edge: 1 });
    [-5.55, -4.6].forEach(function (x) { ventilateur(GR, x, 5.24, gz1, 0.4, "z"); });
    bx(GR, "#5c6875", g0, g0 + 0.04, gyb + 0.12, gyh - 0.1, gz0 + 0.05, gz1 - 0.08);
    for (let z = gz0 + 0.08; z < gz1 - 0.1; z += 0.035) bx(GR, "#c3cad3", g0 - 0.006, g0 + 0.002, gyb + 0.12, gyh - 0.1, z, z + 0.008);
    for (let y = gyb + 0.2; y < gyh - 0.12; y += 0.12) bx(GR, P.cuivre, g0 - 0.01, g0 - 0.004, y, y + 0.012, gz0 + 0.06, gz1 - 0.09);
    bx(GR, "#5c6875", g0 + 0.05, gs, gyb + 0.12, gyh - 0.1, gz0, gz0 + 0.04);
    /* flanc droit et dos du compartiment compresseur, cloison intérieure */
    bx(GR, CAIS, g1 - 0.03, g1, gyb + 0.08, gyh - 0.05, gz0, gz1, { edge: 1 });
    bx(GR, "#dfe2e0", gs, g1, gyb + 0.08, gyh - 0.05, gz0, gz0 + 0.03);
    bx(GR, "#dfe2e0", gs - 0.02, gs + 0.02, gyb + 0.08, gyh - 0.05, gz0, gz1 - 0.04);
    bx(GR, "#cfd3d1", gs, g1, gyb + 0.08, gyb + 0.1, gz0, gz1);
    /* le compresseur hermétique (dôme vert) sur silentblocs */
    const kx = -3.86, kz = -3.5;
    bx(GR, "#3a424c", kx - 0.2, kx + 0.2, gyb + 0.1, gyb + 0.13, kz - 0.2, kz + 0.2);
    [[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].forEach(function (d) { cyv(GR, C.caoutchouc, kx + d[0], gyb + 0.13, gyb + 0.17, kz + d[1], 0.03, { seg: 8 }); });
    cyv(GR, C.vertCo, kx, gyb + 0.15, gyb + 0.62, kz, 0.17, { seg: 18 });
    sp(GR, C.vertCo, kx, gyb + 0.62, kz, 0.17, 0.12, 0.17, { seg: 18, seg2: 8 });
    sp(GR, C.vertCo, kx, gyb + 0.17, kz, 0.17, 0.05, 0.17, { seg: 18, seg2: 4 });
    cyv(GR, "#2f5e45", kx, gyb + 0.36, gyb + 0.4, kz, 0.175, { seg: 18 });       /* cordon de soudure */
    bx(GR, "#2a313b", kx - 0.08, kx + 0.08, gyb + 0.36, gyb + 0.5, kz + 0.16, kz + 0.22, { edge: 1 });   /* boîte à bornes */
    /* vannes de service Rotalock (aspiration au flanc, refoulement en haut) */
    cy(GR, C.laiton, kx - 0.2, gyb + 0.45, kz, 0.04, 0.08, { axe: "x", seg: 6 });
    cy(GR, "#3b82c4", kx - 0.25, gyb + 0.45, kz, 0.025, 0.03, { axe: "x", seg: 8 });
    cyv(GR, C.laiton, kx, gyb + 0.73, gyb + 0.8, kz, 0.035, { seg: 6 });
    cyv(GR, C.rouge, kx + 0.05, gyb + 0.76, gyb + 0.8, kz, 0.018, { seg: 8 });
    /* aspiration isolée (vers le dos), refoulement cuivre vers la batterie */
    canal(GR, P.armaflex, [[kx - 0.27, gyb + 0.45, kz], [-4.08, gyb + 0.45, kz], [-4.08, gyb + 0.12, kz], [-4.08, gyb + 0.12, gz0 + 0.06]], 0.026);
    canal(GR, P.cuivre, [[kx, gyb + 0.8, kz], [kx, 5.6, kz], [-4.1, 5.6, kz], [-4.1, 5.6, gz0 + 0.1]], 0.012);
    /* la bouteille liquide verticale, le déshydrateur, le voyant, la vanne de sortie */
    const rx = -3.42, rz = -3.45;
    cyv(GR, "#8a94a1", rx, gyb + 0.15, gyb + 0.68, rz, 0.075, { seg: 14 });
    sp(GR, "#8a94a1", rx, gyb + 0.68, rz, 0.075, 0.04, 0.075, { seg: 14, seg2: 5 });
    bx(GR, "#5c6875", rx - 0.09, rx + 0.09, gyb + 0.1, gyb + 0.15, rz - 0.09, rz + 0.09);
    cyv(GR, C.laiton, rx, gyb + 0.71, gyb + 0.77, rz, 0.03, { seg: 6 });
    cyv(GR, C.rouge, rx, gyb + 0.77, gyb + 0.8, rz, 0.02, { seg: 8 });
    canal(GR, P.cuivre, [[rx, gyb + 0.77, rz + 0.03], [rx, gyb + 0.86, rz + 0.03], [rx, gyb + 0.86, -2.95]], 0.009);
    cy(GR, "#b5652d", rx, gyb + 0.86, -2.85, 0.035, 0.2, { axe: "z", seg: 10 });       /* déshydrateur */
    canal(GR, P.cuivre, [[rx, gyb + 0.86, -2.75], [rx, gyb + 0.86, -2.62], [-3.62, gyb + 0.86, -2.62]], 0.009);
    cy(GR, C.laiton, -3.66, gyb + 0.86, -2.62, 0.026, 0.07, { axe: "x", seg: 8 });     /* voyant liquide */
    cy(GR, "#56e07a", -3.66, gyb + 0.86, -2.59, 0.017, 0.012, { axe: "z", seg: 10, lum: 1 });
    canal(GR, P.cuivre, [[-3.7, gyb + 0.86, -2.62], [-4.05, gyb + 0.86, -2.62], [-4.05, gyb + 0.86, gz0 + 0.06]], 0.009);
    vanne(GR, -3.84, gyb + 0.86, -2.62, "x", "#3b82c4");
    /* pressostats HP (rouge) et BP (bleu) à soufflet, sur la cloison, et leurs capillaires */
    bx(GR, "#8a94a1", gs + 0.02, gs + 0.04, 5.28, 5.52, -3.2, -2.7);
    [["#d63a2f", -3.08], ["#3b82c4", -2.82]].forEach(function (p, i) {
      bx(GR, "#d9dde3", gs + 0.04, gs + 0.14, 5.33, 5.5, p[1] - 0.06, p[1] + 0.06, { edge: 1 });
      cyv(GR, p[0], gs + 0.09, 5.5, 5.55, p[1], 0.025, { seg: 10 });
      for (let k = 0; k < 4; k++) cyv(GR, "#b9c2ca", gs + 0.09, 5.24 + k * 0.022, 5.255 + k * 0.022, p[1], 0.035, { seg: 10 });
      canal(GR, "#b07a4a", [[gs + 0.09, 5.24, p[1]], [gs + 0.09, 5.1, p[1]], [kx + (i ? -0.3 : 0.05), 5.1, p[1]], [kx + (i ? -0.3 : 0.05), i ? gyb + 0.48 : 5.4, i ? kz + 0.05 : kz]], 0.0035);
    });
    /* petit coffret électrique (contacteur) en haut du compartiment */
    bx(GR, "#d3d8de", -3.75, -3.3, 5.45, 5.78, gz0 + 0.03, gz0 + 0.2, { edge: 1 });
    sp(GR, "#39c77a", -3.4, 5.7, gz0 + 0.205, 0.012, 0.012, 0.012, { seg: 6, seg2: 4, lum: 1 });
    /* le panneau de service déposé, appuyé contre le flanc droit */
    {
      const pcx = -3.02, pcy = 4.95, pcz = -3.35;
      bxr(GR, CAIS, pcx, pcy, pcz, 0.025, 1.18, 0.92, 0, 0, 15);
      for (let k = 0; k < 7; k++) {
        const yy = -0.4 + k * 0.1;
        bxr(GR, "#b9bfbd", pcx + 0.016 - yy * Math.sin(15 * Math.PI / 180), pcy + yy * Math.cos(15 * Math.PI / 180), pcz, 0.012, 0.03, 0.6, 0, 0, 15);
      }
      bx(GR, C.caoutchouc, -2.92, -2.82, HD, HD + 0.03, -3.85, -2.85);
    }
    /* sortie au dos vers la chambre froide (−4,6 ; 4,7 ; −4,3) : liquide et aspiration */
    canal(GR, P.cuivre, [[-4.05, gyb + 0.86, gz0 + 0.06], [-4.05, 4.72, gz0 + 0.06], [-4.66, 4.72, gz0 + 0.06], [-4.66, 4.72, gz0 - 0.12]], 0.009);
    canal(GR, P.armaflex, [[-4.08, gyb + 0.12, gz0 + 0.06], [-4.54, gyb + 0.12, gz0 + 0.06], [-4.54, 4.7, gz0 - 0.12]], 0.024);
    vanne(GR, -4.66, 4.72, gz0 - 0.06, "z", "#3b82c4");
    /* interrupteur de proximité sur son poteau */
    cyv(GR, P.acierF, -3.0, HD, 5.0, -2.15, 0.025, { seg: 6 });
    bx(GR, "#d3d8de", -3.1, -2.9, 4.95, 5.2, -2.12, -2.02, { edge: 1 });
    bx(GR, C.jaune, -3.06, -2.94, 5.02, 5.14, -2.02, -2.015);
    bx(GR, C.rouge, -3.01, -2.99, 5.03, 5.13, -2.015, -1.99);
    ancre(GR, -4.6, 6.35, -2.4);
    proxy(GR, g0 - 0.05, g1 + 0.05, HD, gyh + 0.05, gz0 - 0.15, gz1 + 0.1);
    proxy(GR, -3.2, -2.8, HD, 5.55, -3.85, -2.85);
  }

  /* =====================================================================
     7. LA CENTRALE DE TRAITEMENT D'AIR SUR LE TOIT (cta)
        Caisson en panneaux gris : mélange (air neuf à persiennes côté
        x −11,4, rejet sur le dessus), filtres, batterie, ventilateur.
        Trois portes d'accès ouvertes montrent les sections.
     ===================================================================== */
  {
    const CT = Z.cta, PAN = "#c9ced4", PROF = "#9aa3ad", INT = "#e3e7ec";
    const tx0 = -11.4, tx1 = -7.0, tz0 = -4.4, tz1 = -2.2, ty0 = 4.5, ty1 = 5.8;
    const S = [-11.4, -9.9, -9.3, -8.6, -7.0];          /* limites des sections */
    /* socle en profilés et plots */
    bx(CT, P.acierF, tx0, tx1, HD + 0.03, ty0, tz0, tz0 + 0.1, { edge: 1 });
    bx(CT, P.acierF, tx0, tx1, HD + 0.03, ty0, tz1 - 0.1, tz1, { edge: 1 });
    [tx0, -9.3, tx1 - 0.1].forEach(function (x) { bx(CT, P.acierF, x, x + 0.1, HD + 0.03, ty0, tz0, tz1); });
    [tx0 + 0.2, -9.25, tx1 - 0.2].forEach(function (x) { [tz0 + 0.05, tz1 - 0.05].forEach(function (z) { bx(CT, C.caoutchouc, x - 0.08, x + 0.08, HD, HD + 0.03, z - 0.05, z + 0.05); }); });
    /* fond, dos, toit et façade arrière ; intérieur clair */
    bx(CT, PAN, tx0, tx1, ty0, ty0 + 0.05, tz0, tz1, { edge: 1 });
    bx(CT, PAN, tx0, tx1, ty1 - 0.05, ty1, tz0, tz1, { edge: 1 });
    bx(CT, PAN, tx0, tx1, ty0, ty1, tz0, tz0 + 0.05, { edge: 1 });
    bx(CT, INT, tx0, tx1, ty0 + 0.05, ty1 - 0.05, tz0 + 0.05, tz0 + 0.052);
    bx(CT, PAN, tx1 - 0.05, tx1, ty0, ty1, tz0, tz1, { edge: 1 });
    /* profilés aux jonctions des sections, cloisons internes */
    S.forEach(function (x) {
      bx(CT, PROF, x - 0.03, x + 0.03, ty0, ty1 + 0.01, tz1 - 0.03, tz1 + 0.01);
      bx(CT, PROF, x - 0.03, x + 0.03, ty1 - 0.01, ty1 + 0.01, tz0, tz1);
    });
    bx(CT, PROF, tx0, tx1, ty1 - 0.01, ty1 + 0.01, tz1 - 0.03, tz1 + 0.01);
    bx(CT, PROF, tx0, tx1, ty0 - 0.01, ty0 + 0.03, tz1 - 0.03, tz1 + 0.01);
    /* porte d'accès : fermée (avec poignées) ou ouverte (charnière côté x+) */
    function porte(xa, xb, ouv) {
      const L = xb - xa - 0.06, h = ty1 - ty0 - 0.16, yc = (ty0 + ty1) / 2;
      if (!ouv) {
        bx(CT, PAN, xa + 0.03, xb - 0.03, ty0 + 0.08, ty1 - 0.08, tz1 - 0.04, tz1, { edge: 1 });
        [ty0 + 0.35, ty1 - 0.35].forEach(function (y) { bx(CT, "#2a313b", xa + 0.08, xa + 0.13, y - 0.05, y + 0.05, tz1, tz1 + 0.03); });
        return;
      }
      const th = ouv * Math.PI / 180, ux = -Math.cos(th), uz = Math.sin(th), hx = xb - 0.03, hz = tz1 + 0.02;
      const ry = Math.atan2(-uz, ux) * 180 / Math.PI;
      bxr(CT, PAN, hx + ux * L / 2, yc, hz + uz * L / 2, L, h, 0.04, 0, ry, 0);
      bxr(CT, INT, hx + ux * L / 2 - uz * 0.022, yc, hz + uz * L / 2 + ux * 0.022, L - 0.08, h - 0.08, 0.006, 0, ry, 0);   /* peau intérieure */
      bxr(CT, "#3a424c", hx + ux * 0.03 - uz * 0.024, yc, hz + uz * 0.03 + ux * 0.024, 0.02, h - 0.04, 0.006, 0, ry, 0);    /* joint côté charnière */
      bxr(CT, "#3a424c", hx + ux * (L - 0.03) - uz * 0.024, yc, hz + uz * (L - 0.03) + ux * 0.024, 0.02, h - 0.04, 0.006, 0, ry, 0);
      [ty0 + 0.35, ty1 - 0.35].forEach(function (y) {
        bxr(CT, "#2a313b", hx + ux * (L - 0.06) + uz * 0.03, y, hz + uz * (L - 0.06) - ux * 0.03, 0.05, 0.1, 0.03, 0, ry, 0);
        cyv(CT, "#5c6875", hx, y - 0.06, y + 0.06, hz, 0.015, { seg: 6 });
      });
    }
    /* section 1 : mélange — persiennes d'air neuf et auvent côté x −11,4, rejet sur le dessus */
    porte(S[0], S[1], 0);
    cy(CT, "#9fd0ee", -10.7, 5.15, tz1 + 0.005, 0.09, 0.01, { axe: "z", seg: 14, t: 0.6 });   /* hublot */
    bx(CT, PROF, tx0 - 0.03, tx0, ty0, ty1, tz0, tz1);
    bx(CT, "#5c6875", tx0 - 0.04, tx0 - 0.03, ty0 + 0.12, ty1 - 0.25, tz0 + 0.12, tz1 - 0.12);
    for (let y = ty0 + 0.16; y < ty1 - 0.28; y += 0.09) bxr(CT, "#b9c0c8", tx0 - 0.07, y, (tz0 + tz1) / 2, 0.11, 0.012, tz1 - tz0 - 0.26, 0, 0, -35);
    bxr(CT, PAN, tx0 - 0.22, ty1 - 0.14, (tz0 + tz1) / 2, 0.4, 0.03, tz1 - tz0 - 0.1, 0, 0, 30);         /* auvent pare-pluie */
    bx(CT, "#2a313b", tx0 - 0.12, tx0 - 0.03, ty0 + 0.12, ty0 + 0.3, tz1 - 0.35, tz1 - 0.15);             /* servomoteur du registre */
    bx(CT, PAN, -11.1, -10.2, ty1, ty1 + 0.18, -3.8, -2.8, { edge: 1 });
    for (let x = -11.05; x < -10.25; x += 0.08) bxr(CT, "#b9c0c8", x, ty1 + 0.09, -2.79, 0.012, 0.1, 0.02, 0, 0, 0);
    bx(CT, "#5c6875", -11.05, -10.25, ty1 + 0.03, ty1 + 0.16, -2.79, -2.785);
    /* section 2 : filtres — préfiltre plissé et filtres à poches jaunes ; manomètre différentiel */
    porte(S[1], S[2], 105);
    bx(CT, INT, S[1], S[2], ty0 + 0.05, ty0 + 0.06, tz0, tz1);
    bx(CT, "#eef0ea", -9.88, -9.84, ty0 + 0.08, ty1 - 0.08, tz0 + 0.08, tz1 - 0.06);
    for (let z = tz0 + 0.1; z < tz1 - 0.08; z += 0.05) bx(CT, "#c9ccbf", -9.84, -9.835, ty0 + 0.08, ty1 - 0.08, z, z + 0.01);
    bx(CT, "#8a94a1", -9.86, -9.82, ty0 + 0.1, ty1 - 0.1, tz0 + 0.08, tz1 - 0.06);
    for (let i = 0; i < 7; i++) sp(CT, i % 2 ? "#f2d27a" : "#f0c95e", -9.6, (ty0 + ty1) / 2, tz0 + 0.24 + i * 0.29, 0.24, 0.52, 0.11, { seg: 10, seg2: 8 });
    manometre(CT, -9.6, 5.5, tz1 + 0.01, 0.06, "z", "#2a313b");
    /* section 3 : batterie à ailettes, collecteurs cuivre, bac à condensats et siphon */
    porte(S[2], S[3], 100);
    bx(CT, "#8d98a4", -9.2, -9.0, ty0 + 0.12, ty1 - 0.1, tz0 + 0.06, tz1 - 0.06);
    for (let z = tz0 + 0.08; z < tz1 - 0.08; z += 0.03) bx(CT, "#c3cad3", -9.21, -8.99, ty0 + 0.12, ty1 - 0.1, z, z + 0.006);
    /* plaque tubulaire et coudes en épingle, côté porte */
    bx(CT, P.galva, -9.22, -8.98, ty0 + 0.12, ty1 - 0.1, tz1 - 0.1, tz1 - 0.08);
    for (let y = ty0 + 0.2; y < ty1 - 0.2; y += 0.1) [-9.16, -9.04].forEach(function (x) {
      cyv(CT, P.cuivre, x, y, y + 0.05, tz1 - 0.065, 0.011, { seg: 6 });
      sp(CT, P.cuivre, x, y + 0.025, tz1 - 0.06, 0.016, 0.034, 0.012, { seg: 8, seg2: 5 });
    });
    cyv(CT, P.cuivre, -8.95, ty0 + 0.15, ty1 - 0.12, tz1 - 0.15, 0.03, { seg: 8 });
    bx(CT, C.inox, -9.3, -8.65, ty0 + 0.05, ty0 + 0.11, tz0 + 0.05, tz1 - 0.05);
    canal(CT, "#e8e8e8", [[-8.9, ty0 + 0.06, tz1 - 0.05], [-8.9, ty0 + 0.06, tz1 + 0.1], [-8.9, ty0 - 0.1, tz1 + 0.1], [-8.78, ty0 - 0.1, tz1 + 0.1], [-8.78, ty0 + 0.0, tz1 + 0.1], [-8.66, ty0 + 0.0, tz1 + 0.1], [-8.66, HD + 0.02, tz1 + 0.1]], 0.02);
    /* section 4 : ventilateur à roue libre (pavillon, roue, moteur bleu sur ressorts) */
    porte(S[3], S[4] - 0.55, 110);
    bx(CT, PAN, S[4] - 0.55, S[4], ty0 + 0.08, ty1 - 0.08, tz1 - 0.04, tz1, { edge: 1 });
    bx(CT, "#2a313b", -7.45, -7.15, 5.1, 5.45, tz1, tz1 + 0.08, { edge: 1 });                       /* variateur */
    bx(CT, "#9ef0a8", -7.4, -7.2, 5.3, 5.38, tz1 + 0.08, tz1 + 0.082, { lum: 1 });
    bx(CT, INT, -8.62, -8.58, ty0 + 0.05, ty1 - 0.05, tz0, tz1);                                     /* cloison d'aspiration */
    const fy = 5.12, fz = -3.3;
    cy(CT, "#8a94a1", -8.5, fy, fz, 0.34, 0.16, { axe: "x", seg: 22, rt: 0.26, open: true });     /* pavillon */
    cy(CT, "#5c6875", -8.1, fy, fz, 0.42, 0.03, { axe: "x", seg: 22 });                            /* flasque de roue */
    cy(CT, "#8a94a1", -8.38, fy, fz, 0.42, 0.02, { axe: "x", seg: 22, open: true });
    for (let k = 0; k < 10; k++) {
      const a = k * Math.PI / 5;
      bxr(CT, "#aab3bd", -8.24, fy + Math.cos(a) * 0.34, fz + Math.sin(a) * 0.34, 0.26, 0.14, 0.01, a * 180 / Math.PI + 25, 0, 0);
    }
    cy(CT, "#2f6db5", -7.75, fy, fz, 0.15, 0.55, { axe: "x", seg: 16 });
    cy(CT, "#264f86", -7.45, fy, fz, 0.16, 0.06, { axe: "x", seg: 16 });
    bx(CT, "#2f6db5", -7.85, -7.65, fy + 0.13, fy + 0.25, fz - 0.08, fz + 0.08);
    bx(CT, P.acierF, -8.15, -7.35, ty0 + 0.08, ty0 + 0.14, fz - 0.4, fz + 0.4);
    bx(CT, P.acierF, -7.9, -7.6, ty0 + 0.14, fy - 0.12, fz - 0.06, fz + 0.06);
    [[-8.05, -0.35], [-7.45, -0.35], [-8.05, 0.35], [-7.45, 0.35]].forEach(function (p) {
      for (let k = 0; k < 4; k++) cy(CT, "#d6a53a", p[0], ty0 + 0.065 + k * 0.012, fz + p[1], 0.04, 0.008, { seg: 8, open: true });
    });
    /* piquages vers la dalle : soufflage (−8,0 ; −3,0) et reprise (−10,2 ; −3,0), manchettes souples */
    [[-8.0, -3.0], [-10.2, -3.0]].forEach(function (p) {
      bx(CT, "#9aa3ad", p[0] - 0.32, p[0] + 0.32, HD, HD + 0.06, p[1] - 0.27, p[1] + 0.27, { edge: 1 });   /* costière */
      bx(CT, "#2a313b", p[0] - 0.26, p[0] + 0.26, HD + 0.06, ty0 - 0.02, p[1] - 0.21, p[1] + 0.21);       /* manchette souple */
      for (let k = 0; k < 3; k++) bx(CT, "#4a525c", p[0] - 0.265, p[0] + 0.265, HD + 0.075 + k * 0.025, HD + 0.083 + k * 0.025, p[1] - 0.215, p[1] + 0.215);
    });
    ancre(CT, -9.2, 6.3, -2.2);
    proxy(CT, tx0 - 0.45, tx1, HD, ty1 + 0.2, tz0, tz1 + 0.15);
    proxy(CT, S[1], S[3] + 0.1, ty0, ty1, tz1, -1.55);
  }

  /* =====================================================================
     8. LE RESTE DU TOIT (décor) : lanterneau et crosse d'accès
     ===================================================================== */
  bx(null, "#b7bcc5", -6.0, -4.8, HD, HD + 0.3, -1.2, 0.0, { edge: 1 });
  bx(null, "#e6eef2", -6.04, -4.76, HD + 0.3, HD + 0.34, -1.24, 0.04, { edge: 1 });
  sp(null, "#dceef6", -5.4, HD + 0.34, -0.6, 0.6, 0.22, 0.6, { seg: 16, seg2: 6 });
  [-0.55, -0.05].forEach(function (z) {
    canal(null, C.jaune, [[1.15, HD, z], [1.15, 5.45, z], [1.85, 5.45, z], [1.85, HA + 0.06, z]], 0.025);
  });
  [4.75, 5.1].forEach(function (y) { tube(null, C.jaune, 1.15, y, -0.55, 1.15, y, -0.05, 0.02); });
  tube(null, C.jaune, 1.5, 5.45, -0.55, 1.5, 5.45, -0.05, 0.02);
  [-0.55, -0.05].forEach(function (z) { bx(null, P.acierF, 1.08, 1.22, HD, HD + 0.02, z - 0.07, z + 0.07); });

  return {
    "chambre-froide": { zoom: 0.32, az: [-14, -10], el: 8, interieur: true, foyer: [-9.6, 1.5, -2.2] },
    "vitrine": { zoom: 0.3, az: [-2, 8], el: 16, interieur: true, foyer: [-5.3, 1.0, -1.5] },
    "salle-machines": { zoom: 0.32, az: [-15, 6], el: 10, interieur: true, foyer: [-0.1, 2.3, -3.4] },
    "armoire": { zoom: 0.2, az: [28, 36], el: 8, interieur: true, foyer: [-1.5, 1.15, -0.6] },
    "groupe": { zoom: 0.3, az: [-20, 35], el: 22, foyer: [-4.6, 5.1, -3.3] },
    "cta": { zoom: 0.3, az: [-30, 25], el: 22, foyer: [-9.2, 5.1, -3.3] }
  };
}
