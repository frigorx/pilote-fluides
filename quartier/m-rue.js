/* =====================================================================
   m-rue.js — LA RUE DU FRIGORISTE : la camionnette, l'établi, l'échafaudage

   Trois zones, trois vitrines du métier :
   - « camionnette » : le fourgon blanc à bande bleue, garé sur la
     chaussée, porte latérale ouverte côté spectateur. Dedans, rangés :
     manifold à deux manomètres, pompe à vide, station de récupération,
     bouteilles (fluide, récupération, azote), mallettes. Devant la porte,
     l'ordinateur portable (courbe + symbole Bluetooth) et les deux sondes
     Bluetooth pincées sur un tube de cuivre ;
   - « etabli » : le cuivre et la flamme, sur le trottoir. Étau tenant la
     dudgeonnière, cintreuse à levier, tubes, couronne, poste
     oxyacétylénique sur son chariot, chalumeau, extincteur, lunettes ;
   - « echafaudage » : l'échafaudage de pied contre le mur droit du
     commerce, planchers à trappe, garde-corps, et un ouvrier en harnais
     qui monte.

   Niveaux du décor : chaussée et allée à y = 0, trottoir à y = 0,15.
   Repère : 1 unité = 1 m ; x à droite, y en haut, z vers le spectateur.
   Cahier des charges : SPEC-3D.md. Modèle de style : maquette-legislation.js.
   ===================================================================== */
export function rue(H) {
  const P = H.P;
  const bx = H.bx, bxr = H.bxr, cy = H.cy, cyv = H.cyv, tube = H.tube, canal = H.canal, sp = H.sp, ext = H.ext;
  const ZC = "camionnette", ZE = "etabli", ZF = "echafaudage";
  const D = 180 / Math.PI;

  /* ---------- teintes communes ---------- */
  const BLANC = "#f8f8f5", JOINT = "#c4cad2", PNEU = "#24282f", NOIRP = "#2a2f36";
  const ORANGE = "#e8914a", LAITON = "#b89448", INOX = "#c9d0d8", ALU = "#a9b3be", GALVA = "#a9b3be";
  const BLEU_BP = "#2f6db5", ROUGE_HP = "#c0392b", JAUNE = "#f2c94c", BT = "#1a6fe0";

  /* ---------- petits outils de dessin ---------- */
  /* manomètre : cadran tourné vers +z, centre (x, y), face avant au plan z ; ang = aiguille (degrés) */
  function mano(zn, x, y, z, r, bague, ang) {
    cy(zn, bague, x, y, z - 0.012, r, 0.024, { axe: "z", seg: 16 });
    cy(zn, "#fbfaf5", x, y, z + 0.0015, r * 0.84, 0.003, { axe: "z", seg: 16 });
    for (let k = 0; k < 5; k++) {
      const a = (210 - k * 60) / D;
      bxr(zn, "#5c6875", x + Math.cos(a) * r * 0.7, y + Math.sin(a) * r * 0.7, z + 0.0035, r * 0.16, r * 0.04 + 0.001, 0.001, 0, 0, a * D);
    }
    const a = ang / D;
    bxr(zn, "#1e2630", x + Math.cos(a) * r * 0.3, y + Math.sin(a) * r * 0.3, z + 0.004, r * 0.62, Math.max(0.004, r * 0.07), 0.002, 0, 0, ang);
    cy(zn, "#1e2630", x, y, z + 0.004, r * 0.12, 0.004, { axe: "z", seg: 6 });
  }
  /* bouteille de gaz debout : corps, ogive colorée (code NF EN 1089-3), col ; rend le haut du col */
  function bouteille(zn, x, z, y0, r, h, corps, ogive) {
    cyv(zn, corps, x, y0, y0 + h, z, r, { seg: 16 });
    cyv(zn, "#3a3f47", x, y0, y0 + 0.025, z, r + 0.003, { seg: 16 });                 /* pied */
    sp(zn, ogive, x, y0 + h, z, r, r * 0.78, r, { seg: 16, seg2: 8 });
    cyv(zn, ogive, x, y0 + h - 0.045, y0 + h + 0.001, z, r + 0.002, { seg: 16 });      /* l'ogive descend sur l'épaule */
    cyv(zn, LAITON, x, y0 + h + r * 0.72, y0 + h + r * 0.72 + 0.04, z, 0.022, { seg: 8 });
    return y0 + h + r * 0.72 + 0.04;
  }
  /* robinet double d'une bouteille de fluide : volant bleu (vapeur), volant rouge (liquide) */
  function robinetDouble(zn, x, z, y) {
    cyv(zn, LAITON, x, y, y + 0.045, z, 0.02, { seg: 8 });
    tube(zn, LAITON, x - 0.045, y + 0.03, z, x + 0.045, y + 0.03, z, 0.011);
    [[-1, BLEU_BP], [1, ROUGE_HP]].forEach(function (v) {
      cyv(zn, LAITON, x + v[0] * 0.045, y + 0.03, y + 0.06, z, 0.006, { seg: 6 });
      cyv(zn, v[1], x + v[0] * 0.045, y + 0.06, y + 0.072, z, 0.024, { seg: 12 });
    });
  }
  /* détendeur à deux manomètres monté sur le robinet, cadrans vers +z ; rend le bas de la sortie */
  function detendeur(zn, x, y, z, bague, clapet) {
    cyv(zn, LAITON, x, y - 0.06, y + 0.02, z, 0.02, { seg: 8 });                      /* robinet de la bouteille */
    cy(zn, LAITON, x, y, z + 0.035, 0.014, 0.07, { axe: "z", seg: 8 });               /* raccord d'entrée */
    cy(zn, "#9aa5b1", x, y, z + 0.09, 0.036, 0.05, { axe: "z", seg: 14 });            /* corps */
    cy(zn, bague, x, y, z + 0.117, 0.037, 0.006, { axe: "z", seg: 14 });               /* bague de couleur du gaz */
    cy(zn, "#2a313b", x, y, z + 0.14, 0.02, 0.04, { axe: "z", seg: 10 });             /* vis de réglage */
    [-1, 1].forEach(function (s) {
      tube(zn, LAITON, x, y + 0.02, z + 0.09, x + s * 0.052, y + 0.055, z + 0.09, 0.007);
      mano(zn, x + s * 0.056, y + 0.07, z + 0.115, 0.03, bague, s < 0 ? 140 : 65);
    });
    cyv(zn, LAITON, x, y - 0.08, y - 0.03, z + 0.09, 0.009, { seg: 8 });               /* sortie */
    cyv(zn, clapet, x, y - 0.13, y - 0.08, z + 0.09, 0.013, { seg: 8 });               /* clapet anti-retour */
    return [x, y - 0.13, z + 0.09];
  }
  /* mallette rigide : coque, joint d'ouverture, poignée et deux fermoirs sur la face +z */
  function mallette(zn, x0, x1, y0, y1, z0, z1, c) {
    bx(zn, c, x0, x1, y0, y1, z0, z1, { edge: 1 });
    const ym = (y0 + y1) / 2, xm = (x0 + x1) / 2;
    bx(zn, "#2a313b", x0, x1, ym - 0.005, ym + 0.005, z1, z1 + 0.003);
    bx(zn, "#2a313b", xm - 0.06, xm + 0.06, y1 - 0.04, y1 - 0.024, z1 + 0.003, z1 + 0.03);
    [x0 + 0.06, x1 - 0.06].forEach(function (x) { bx(zn, "#c3cad3", x - 0.016, x + 0.016, ym - 0.03, ym + 0.012, z1, z1 + 0.012); });
  }
  /* tuyau souple qui pend entre a et b, point bas à yb (courbe de Bézier échantillonnée) */
  function flexible(zn, c, a, b, yb, r, n) {
    const k = [(a[0] + b[0]) / 2, 2 * yb - (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, u = 1 - t;
      pts.push([u * u * a[0] + 2 * u * t * k[0] + t * t * b[0], u * u * a[1] + 2 * u * t * k[1] + t * t * b[1], u * u * a[2] + 2 * u * t * k[2] + t * t * b[2]]);
    }
    canal(zn, c, pts, r);
  }
  /* flocon (pictogramme du froid) posé à plat sur une face verticale z = zf */
  function flocon(zn, cx, cy0, zf, r, c) {
    for (let k = 0; k < 3; k++) bxr(zn, c, cx, cy0, zf + 0.003, 2 * r, 0.035, 0.006, 0, 0, k * 60);
    for (let k = 0; k < 6; k++) {
      const a = k * Math.PI / 3, px = cx + 0.6 * r * Math.cos(a), py = cy0 + 0.6 * r * Math.sin(a);
      [-1, 1].forEach(function (s) {
        const b = a + s * Math.PI / 4;
        bxr(zn, c, px + 0.15 * r * Math.cos(b), py + 0.15 * r * Math.sin(b), zf + 0.003, 0.32 * r, 0.03, 0.006, 0, 0, b * D);
      });
    }
  }

  /* =====================================================================
     1. LA CAMIONNETTE — la carrosserie (fourgon blanc, cabine côté +x)
     ===================================================================== */
  const VX0 = -9.5, VX1 = -4.5, VZ0 = 6.2, VZ1 = 8.2, VZM = (VZ0 + VZ1) / 2;
  const YC = 0.32, YP = 0.58, YT = 2.3, RR = 0.36;       /* bas de caisse, plancher de chargement, toit, rayon de roue */
  const XAV = -5.3, XAR = -8.6;                          /* essieux avant et arrière */
  const PX0 = -7.95, PX1 = -6.45, PY1 = 2.14;            /* baie de la porte latérale (côté +z) */
  const XB = -6.35;                                      /* montant B : la cabine devant, la caisse derrière */

  /* l'arche de roue, de l'arrière vers l'avant */
  function arche(xc) {
    const p = [];
    for (let k = 0; k <= 10; k++) { const a = Math.PI * (1 - k / 10); p.push([xc + 0.47 * Math.cos(a), 0.36 + 0.47 * Math.sin(a)]); }
    return p;
  }
  /* flanc de la caisse en profil (x, y), de l'arrière jusqu'à xFin, avec l'arche de la roue arrière */
  function flancCaisse(xFin) {
    return [[VX0, YC + 0.08], [VX0 + 0.06, YC], [XAR - 0.47, YC]].concat(arche(XAR),
      [[XAR + 0.47, YC], [xFin, YC], [xFin, YT], [VX0 + 0.08, YT], [VX0, YT - 0.08]]);
  }
  ext(ZC, BLANC, flancCaisse(XB), 0.05, 0, 0, VZ0);               /* flanc gauche (côté -z), plein */
  ext(ZC, BLANC, flancCaisse(PX0), 0.05, 0, 0, VZ1 - 0.05);       /* flanc droit, derrière la baie */
  bx(ZC, BLANC, PX0, XB, PY1, YT, VZ1 - 0.05, VZ1);               /* linteau au-dessus de la baie */
  bx(ZC, BLANC, PX0, XB, YC, YP - 0.03, VZ1 - 0.05, VZ1);         /* bas de caisse sous la baie */
  bx(ZC, BLANC, PX1, XB, YP - 0.03, PY1, VZ1 - 0.05, VZ1);        /* montant B */
  bx(ZC, BLANC, VX0 + 0.05, XB, YT - 0.05, YT, VZ0 + 0.05, VZ1 - 0.05, { edge: 1 });   /* toit */
  bx(ZC, BLANC, VX0, VX0 + 0.05, YC + 0.08, YT, VZ0 + 0.05, VZ1 - 0.05);             /* face arrière */
  for (let k = 0; k < 6; k++) {                                   /* nervures du toit */
    const x = -9.2 + k * 0.52;
    bx(ZC, "#eeeeea", x - 0.035, x + 0.035, YT, YT + 0.012, VZ0 + 0.12, VZ1 - 0.12);
  }
  /* soubassement, plancher, passages de roue */
  bx(ZC, NOIRP, VX0 + 0.12, VX1 - 0.2, 0.22, YP - 0.03, VZ0 + 0.3, VZ1 - 0.3);
  bx(ZC, "#5b4b3b", VX0 + 0.05, XB, YP - 0.03, YP, VZ0 + 0.05, VZ1 - 0.05);
  bx(ZC, "#4a4f57", XAR - 0.46, XAR + 0.46, 0.4, 0.85, VZ1 - 0.3, VZ1 - 0.05);
  bx(ZC, "#cdbb94", XAR - 0.47, XAR + 0.47, 0.4, 0.86, VZ0 + 0.05, VZ0 + 0.3, { edge: 1 });   /* coffre sur le passage de roue */
  /* la cabine : caisse pleine jusqu'à la ceinture de caisse (y 1,38), capot court ; au-dessus,
     montants, pavillon et vitres claires laissent voir le poste de conduite */
  const YCe = 1.38;
  const AV = function (y) { return -5.2 - 0.907 * (y - 1.3); };         /* ligne du pare-brise */
  const profilCab = [[XB, YC], [XAV - 0.47, YC]].concat(arche(XAV), [[XAV + 0.47, YC], [VX1 - 0.1, YC], [VX1, YC + 0.14],
    [VX1, 0.98], [VX1 - 0.08, 1.13], [-5.02, 1.25], [-5.2, 1.3], [AV(YCe), YCe], [XB, YCe]]);
  ext(ZC, BLANC, profilCab, VZ1 - VZ0, 0, 0, VZ0);
  bx(ZC, "#1c2026", XAV - 0.46, XAV + 0.46, 0.42, 0.85, VZ0 + 0.04, VZ1 - 0.04);       /* passages de roue avant */
  ext(ZC, BLANC, [[AV(2.06), 2.06], [-5.98, 2.16], [-6.14, YT], [XB, YT], [XB, 2.06]], VZ1 - VZ0, 0, 0, VZ0);   /* pavillon */
  [VZ0, VZ1 - 0.05].forEach(function (z) {
    ext(ZC, BLANC, [[AV(YCe), YCe], [AV(YCe) - 0.11, YCe], [AV(2.06) - 0.11, 2.06], [AV(2.06), 2.06]], 0.05, 0, 0, z);   /* montant A */
    ext(ZC, BLANC, [[XB, YCe], [-6.27, YCe], [-6.27, 2.06], [XB, 2.06]], 0.05, 0, 0, z);                                /* montant B */
  });
  /* pare-brise : glace claire entre deux joints noirs, posée sur la pente */
  const aPB = 42.2, nx = Math.cos(aPB / D), ny = Math.sin(aPB / D);
  const PBx = (AV(YCe) + AV(2.06)) / 2, PBy = (YCe + 2.06) / 2, PBl = Math.hypot(AV(YCe) - AV(2.06), 2.06 - YCe);
  bxr(ZC, "#a8c3d8", PBx + nx * 0.004, PBy + ny * 0.004, VZM, 0.006, PBl, VZ1 - VZ0 - 0.1, 0, 0, aPB, { t: 0.32 });
  [VZ0 + 0.04, VZ1 - 0.04].forEach(function (z) { bxr(ZC, "#1c2026", PBx + nx * 0.006, PBy + ny * 0.006, z, 0.012, PBl, 0.03, 0, 0, aPB); });
  bx(ZC, "#1c2026", AV(YCe) - 0.04, AV(YCe) + 0.01, YCe - 0.02, YCe + 0.02, VZ0 + 0.03, VZ1 - 0.03);
  bx(ZC, "#1c2026", AV(2.06) - 0.03, AV(2.06) + 0.02, 2.04, 2.075, VZ0 + 0.03, VZ1 - 0.03);
  bxr(ZC, "#ffffff", PBx + nx * 0.009, PBy + ny * 0.009, VZM + 0.45, 0.002, PBl * 0.7, 0.05, 0, 0, aPB, { t: 0.35 });   /* reflet */
  [VZM - 0.45, VZM + 0.35].forEach(function (z) { bx(ZC, "#1c2026", -5.3, -5.24, 1.3, 1.33, z - 0.32, z + 0.32); });   /* essuie-glaces */
  /* vitres des portières, des deux côtés, et leur joint bas */
  const fenCab = [[-6.27, YCe], [AV(YCe) - 0.11, YCe], [AV(2.06) - 0.11, 2.06], [-6.27, 2.06]];
  ext(ZC, "#a8c3d8", fenCab, 0.01, 0, 0, VZ1 - 0.03, { t: 0.32 });
  ext(ZC, "#a8c3d8", fenCab, 0.01, 0, 0, VZ0 + 0.02, { t: 0.32 });
  [[VZ1 - 0.052, VZ1 + 0.003], [VZ0 - 0.003, VZ0 + 0.052]].forEach(function (z) { bx(ZC, "#1c2026", -6.27, AV(YCe) - 0.1, YCe - 0.012, YCe + 0.012, z[0], z[1]); });
  /* le poste de conduite (conducteur côté -z) : planche de bord, volant, sièges, rétroviseur, pare-soleil */
  bx(ZC, "#3a3f47", XB, AV(YCe) - 0.01, YCe, YCe + 0.004, VZ0 + 0.05, VZ1 - 0.05);
  bx(ZC, "#2a2f36", -5.68, -5.4, YCe, 1.47, VZ0 + 0.06, VZ1 - 0.06, { edge: 1 });
  bx(ZC, "#4a5563", -5.5, -5.42, 1.47, 1.472, VZ0 + 0.2, VZ0 + 0.6);
  bx(ZC, "#fbfaf5", -5.62, -5.48, 1.47, 1.476, 7.6, 7.84);                             /* bon d'intervention sur la planche */
  const VCx = -5.8, VCy = 1.62, VCz = 6.72, an = 35 / D;
  tube(ZC, "#2a2f36", VCx, VCy, VCz, -5.6, 1.46, VCz, 0.022, { seg: 8 });              /* colonne de direction */
  for (let k = 0; k < 14; k++) {
    const a0 = k * 2 * Math.PI / 14, a1 = (k + 1) * 2 * Math.PI / 14, r = 0.18;
    tube(ZC, "#1c2026", VCx + r * Math.sin(a0) * Math.sin(an), VCy + r * Math.sin(a0) * Math.cos(an), VCz + r * Math.cos(a0),
      VCx + r * Math.sin(a1) * Math.sin(an), VCy + r * Math.sin(a1) * Math.cos(an), VCz + r * Math.cos(a1), 0.016, { seg: 6 });
  }
  [[6.45, 6.97, [[6.58, 6.84]]], [7.2, 8.08, [[7.3, 7.56], [7.74, 8.0]]]].forEach(function (s) {
    bxr(ZC, "#4a5563", -6.24, 1.66, (s[0] + s[1]) / 2, 0.12, 0.56, s[1] - s[0], 0, 0, -8);   /* dossier */
    s[2].forEach(function (t) { bx(ZC, "#4a5563", -6.3, -6.2, 1.97, 2.12, t[0], t[1]); cyv(ZC, "#8a94a1", -6.25, 1.92, 1.97, (t[0] + t[1]) / 2, 0.008, { seg: 5 }); });
  });
  bx(ZC, "#1c2026", AV(2.0) - 0.06, AV(2.0) - 0.02, 1.95, 2.01, VZM - 0.11, VZM + 0.11);
  [[6.35, 6.95], [7.4, 8.0]].forEach(function (z) { bx(ZC, "#d9d2bf", -6.06, AV(2.04) - 0.03, 2.03, 2.055, z[0], z[1]); });
  /* face avant : pare-chocs, calandre, phares, antibrouillards, plaque sans inscription */
  bx(ZC, "#3a3f47", VX1 - 0.06, VX1 + 0.05, YC - 0.03, 0.6, VZ0 + 0.03, VZ1 - 0.03, { edge: 1 });
  [[VZ1 - 0.02, VZ1 + 0.02], [VZ0 - 0.02, VZ0 + 0.02]].forEach(function (z) { bx(ZC, "#3a3f47", VX1 - 0.42, VX1 - 0.05, YC - 0.03, 0.56, z[0], z[1]); });
  bx(ZC, "#23272e", VX1, VX1 + 0.012, 0.64, 0.95, VZ0 + 0.45, VZ1 - 0.45);
  for (let k = 0; k < 4; k++) bx(ZC, "#9aa3ad", VX1 + 0.012, VX1 + 0.02, 0.67 + k * 0.075, 0.685 + k * 0.075, VZ0 + 0.48, VZ1 - 0.48);
  [VZ0 + 0.06, VZ1 - 0.42].forEach(function (z) {
    bx(ZC, "#dfe6ee", VX1 - 0.02, VX1 + 0.015, 0.78, 0.97, z, z + 0.36);
    bx(ZC, "#9aa5b1", VX1 + 0.015, VX1 + 0.018, 0.84, 0.93, z + 0.05, z + 0.2);
    bx(ZC, "#fff4cf", VX1 + 0.015, VX1 + 0.02, 0.785, 0.81, z + 0.03, z + 0.33, { lum: 1 });   /* feux de jour */
    cy(ZC, "#e9eef3", VX1 + 0.055, 0.42, z + 0.18, 0.04, 0.012, { axe: "x", seg: 10 });
  });
  bx(ZC, "#fbfaf5", VX1 + 0.05, VX1 + 0.056, 0.4, 0.52, VZM - 0.26, VZM + 0.26);
  bx(ZC, "#2f4fa0", VX1 + 0.056, VX1 + 0.058, 0.4, 0.52, VZM + 0.2, VZM + 0.26);
  /* rétroviseurs : bras, coque noire, glace côté arrière */
  [[VZ1, 1], [VZ0, -1]].forEach(function (c) {
    const zb = c[0], s = c[1], za = zb + s * 0.1, zc = zb + s * 0.24;
    tube(ZC, "#23272e", -5.42, 1.42, zb, -5.5, 1.47, za, 0.018);
    bx(ZC, "#23272e", -5.62, -5.46, 1.4, 1.72, Math.min(za, zc), Math.max(za, zc));
    bx(ZC, "#a8cde3", -5.625, -5.62, 1.43, 1.69, Math.min(za, zc) + 0.02, Math.max(za, zc) - 0.02);
    bx(ZC, ORANGE, -5.48, -5.46, 1.42, 1.46, Math.min(za, zc) + 0.02, Math.max(za, zc) - 0.02);   /* répétiteur */
  });
  /* poignées et joints de portières, répétiteur d'aile */
  [[VZ1, VZ1 + 0.02], [VZ0 - 0.02, VZ0]].forEach(function (z) {
    bx(ZC, "#23272e", -6.2, -6.04, 1.22, 1.27, z[0], z[1]);
    bx(ZC, ORANGE, -4.98, -4.9, 0.97, 1.01, z[0], z[1]);
  });
  [[VZ1, VZ1 + 0.004], [VZ0 - 0.004, VZ0]].forEach(function (z) {
    bx(ZC, JOINT, XB + 0.01, XB + 0.03, YC + 0.06, 2.2, z[0], z[1]);
    bx(ZC, JOINT, -5.29, -5.27, 0.87, 1.33, z[0], z[1]);
  });
  /* face arrière : deux portes, poignée, feux verticaux, troisième feu stop, pare-chocs */
  bx(ZC, JOINT, VX0 - 0.004, VX0, YC + 0.12, YT - 0.1, VZM - 0.01, VZM + 0.01);
  bx(ZC, "#23272e", VX0 - 0.02, VX0, 1.12, 1.18, VZM - 0.17, VZM - 0.03);
  [VZ0 + 0.04, VZ1 - 0.2].forEach(function (z) {
    bx(ZC, "#c8372d", VX0 - 0.025, VX0, 0.62, 1.12, z, z + 0.16);
    bx(ZC, ORANGE, VX0 - 0.028, VX0 - 0.025, 0.96, 1.06, z + 0.02, z + 0.14);
    bx(ZC, "#f1f1ee", VX0 - 0.028, VX0 - 0.025, 0.66, 0.75, z + 0.02, z + 0.14);
  });
  bx(ZC, "#c8372d", VX0 - 0.02, VX0, YT - 0.07, YT - 0.035, VZM - 0.16, VZM + 0.16);
  bx(ZC, "#3a3f47", VX0 - 0.1, VX0 + 0.05, YC - 0.03, 0.55, VZ0 + 0.03, VZ1 - 0.03, { edge: 1 });
  /* les quatre roues : pneu, jante grise, moyeu, rayons */
  function roue(x, s) {
    const z = s > 0 ? VZ1 - 0.13 : VZ0 + 0.13, zf = z + s * 0.11;
    cy(ZC, PNEU, x, RR, z, RR, 0.22, { axe: "z", seg: 22 });
    cy(ZC, "#c3cad3", x, RR, zf, 0.22, 0.012, { axe: "z", seg: 18 });
    cy(ZC, "#7c8794", x, RR, zf + s * 0.007, 0.16, 0.004, { axe: "z", seg: 16 });
    for (let k = 0; k < 5; k++) bxr(ZC, "#c3cad3", x, RR, zf + s * 0.01, 0.4, 0.04, 0.006, 0, 0, k * 36);
    cy(ZC, "#5c6875", x, RR, zf + s * 0.013, 0.06, 0.01, { axe: "z", seg: 10 });
  }
  [XAV, XAR].forEach(function (x) { roue(x, 1); roue(x, -1); });
  /* galerie de toit, échelle et porte-tubes (les barres de cuivre voyagent dedans) */
  [VZ0 + 0.25, VZ1 - 0.25].forEach(function (z) {
    tube(ZC, "#8a94a1", -9.35, YT + 0.12, z, -6.25, YT + 0.12, z, 0.02, { seg: 8 });
    [-9.25, -7.8, -6.35].forEach(function (x) { bx(ZC, "#3a3f47", x - 0.04, x + 0.04, YT, YT + 0.12, z - 0.04, z + 0.04); });
  });
  for (let k = 0; k < 6; k++) { const x = -9.3 + k * 0.6; tube(ZC, "#8a94a1", x, YT + 0.12, VZ0 + 0.25, x, YT + 0.12, VZ1 - 0.25, 0.014); }
  [VZM - 0.6, VZM - 0.18].forEach(function (z) { tube(ZC, "#c3cad3", -9.6, YT + 0.17, z, -6.1, YT + 0.17, z, 0.022, { seg: 8 }); });
  for (let x = -9.48; x < -6.1; x += 0.3) tube(ZC, "#c3cad3", x, YT + 0.17, VZM - 0.6, x, YT + 0.17, VZM - 0.18, 0.012);
  cy(ZC, "#9aa3ad", -7.85, YT + 0.23, VZM + 0.45, 0.085, 3.3, { axe: "x", seg: 14 });
  cy(ZC, "#4a5563", -9.52, YT + 0.23, VZM + 0.45, 0.092, 0.06, { axe: "x", seg: 14 });
  cy(ZC, "#4a5563", -6.18, YT + 0.23, VZM + 0.45, 0.092, 0.06, { axe: "x", seg: 14 });
  /* la livrée : bande bleue, filet orange, flocons */
  function bande(x0, x1, zf, s) {
    const z0 = s > 0 ? zf : zf - 0.006, z1 = s > 0 ? zf + 0.006 : zf;
    bx(ZC, P.bleu, x0, x1, 0.96, 1.2, z0, z1);
    bx(ZC, ORANGE, x0, Math.min(x1, -5.1), 1.23, 1.28, z0, z1);
  }
  bande(VX0, PX0, VZ1, 1);
  bande(PX1, -4.9, VZ1, 1);
  bande(VX0, -4.9, VZ0, -1);
  bx(ZC, P.bleu, VX0 - 0.006, VX0, 0.96, 1.2, VZ0, VZ1);
  bx(ZC, ORANGE, VX0 - 0.006, VX0, 1.23, 1.28, VZ0, VZ1);
  flocon(ZC, -8.0, 1.72, VZ0 - 0.012, 0.3, P.bleu);   /* sur le flanc gauche (il regarde vers -z : posé à l'extérieur) */
  /* la porte coulissante, ouverte : glissée vers l'arrière, à l'extérieur du flanc */
  const DX0 = PX0 - 1.47, DX1 = PX0 + 0.03, DZ = VZ1 + 0.012;
  bx(ZC, BLANC, DX0, DX1, 0.62, PY1 + 0.02, DZ, DZ + 0.045, { edge: 1 });
  bx(ZC, P.bleu, DX0, DX1, 0.96, 1.2, DZ + 0.045, DZ + 0.051);
  bx(ZC, ORANGE, DX0, DX1, 1.23, 1.28, DZ + 0.045, DZ + 0.051);
  bx(ZC, "#23272e", DX1 - 0.17, DX1 - 0.05, 1.4, 1.45, DZ + 0.045, DZ + 0.065);
  bx(ZC, "#9aa5b1", DX1 - 0.02, DX1 + 0.01, 0.7, 1.95, DZ - 0.01, DZ + 0.03);          /* chant de porte */
  flocon(ZC, (DX0 + DX1) / 2, 1.66, DZ + 0.045, 0.25, P.bleu);
  bx(ZC, "#23272e", PX0, PX1, YP - 0.07, YP - 0.04, VZ1, VZ1 + 0.02);                 /* rail bas de la porte */
  bx(ZC, "#23272e", PX0, PX1 + 0.1, PY1 - 0.02, PY1, VZ1 - 0.05, VZ1 + 0.01);          /* rail haut */
  /* plots de signalisation : deux à l'arrière, un devant la mallette posée sur la chaussée,
     pour baliser le matériel dans la voie de circulation */
  [[-10.05, 7.6], [-10.05, 6.6], [-9.3, 8.9]].forEach(function (p) {
    bx(ZC, "#2a313b", p[0] - 0.13, p[0] + 0.13, 0, 0.03, p[1] - 0.13, p[1] + 0.13);
    cyv(ZC, "#e8642c", p[0], 0.03, 0.5, p[1], 0.11, { rt: 0.03, seg: 12 });
    cyv(ZC, "#f7f5ef", p[0], 0.2, 0.28, p[1], 0.082, { rt: 0.066, seg: 12 });
    cyv(ZC, "#f7f5ef", p[0], 0.36, 0.42, p[1], 0.06, { rt: 0.048, seg: 12 });
  });

  /* =====================================================================
     2. LA CAMIONNETTE — l'aménagement intérieur, vu par la porte ouverte
        La baie ne laisse voir le fond que sur 1,5 m : les outils qui
        comptent (manifold, pompe à vide, station, bouteilles) sont rangés
        entre x −8,6 et −7,3, la fenêtre visible de face comme de trois quarts.
     ===================================================================== */
  const ZI = VZ0 + 0.065;                     /* face de l'habillage du fond (z 6,265) */
  const ZE1 = ZI + 0.4;                       /* profondeur des étagères */
  bx(ZC, "#ddd0b0", VX0 + 0.05, XB, YP, YT - 0.05, VZ0 + 0.05, ZI);                   /* habillage contreplaqué */
  bx(ZC, "#cfd4da", XB - 0.06, XB, YP, YT - 0.05, VZ0 + 0.05, VZ1 - 0.05);            /* cloison de cabine */
  bx(ZC, "#ddd0b0", PX0 - 0.02, PX0, YP, YT - 0.05, VZ1 - 0.07, VZ1 - 0.05);          /* tranche de la baie */
  bx(ZC, "#fff6d8", -9.2, -6.6, YT - 0.07, YT - 0.055, VZM - 0.06, VZM + 0.06, { lum: 1 });   /* réglette LED */
  bx(ZC, "#2a313b", PX0, PX1, YP - 0.035, YP + 0.004, VZ1 - 0.12, VZ1 + 0.02);        /* seuil antidérapant */
  /* montants d'étagère en aluminium et tablette haute sur toute la longueur */
  [-9.38, -8.79, -7.235, -6.475].forEach(function (x) { bx(ZC, ALU, x - 0.015, x + 0.015, YP, 2.2, ZI, ZE1); });
  function tablette(x0, x1, y) {
    bx(ZC, "#8a94a1", x0, x1, y - 0.02, y, ZI, ZE1);
    bx(ZC, ALU, x0, x1, y, y + 0.04, ZE1 - 0.015, ZE1);                              /* rebord anti-chute */
  }
  tablette(-9.365, -6.49, 1.94);
  [1.1, 1.52].forEach(function (y) { tablette(-9.365, -8.805, y); tablette(-7.22, -6.49, y); });
  /* les mallettes : sur la tablette haute, au fond (baie A, sur le coffre de roue) et à droite (baie C) */
  [[-9.33, -8.83, BLEU_BP], [-8.76, -8.3, ORANGE], [-8.27, -7.8, "#3a424c"], [-7.77, -7.3, BLEU_BP], [-7.2, -6.75, ORANGE]].forEach(function (m) {
    mallette(ZC, m[0], m[1], 1.94, 2.14, ZI + 0.02, ZE1 - 0.02, m[2]);
  });
  bx(ZC, "#e9e2cf", -6.72, -6.52, 1.94, 2.12, ZI + 0.05, ZE1 - 0.05, { edge: 1 });
  mallette(ZC, -9.34, -8.83, 0.86, 1.08, ZI + 0.02, ZE1 - 0.02, "#7c8794");
  mallette(ZC, -9.34, -8.83, 1.1, 1.3, ZI + 0.02, ZE1 - 0.02, BLEU_BP);
  mallette(ZC, -9.34, -8.83, 1.52, 1.72, ZI + 0.02, ZE1 - 0.02, ORANGE);
  mallette(ZC, -7.2, -6.5, YP, YP + 0.26, ZI + 0.02, ZE1 - 0.02, "#3a424c");
  mallette(ZC, -7.2, -6.82, 1.1, 1.3, ZI + 0.02, ZE1 - 0.02, ORANGE);
  bx(ZC, "#e9e2cf", -6.8, -6.52, 1.1, 1.24, ZI + 0.05, ZE1 - 0.05, { edge: 1 });     /* boîte de raccords */
  cy(ZC, "#2a313b", -6.95, 1.64, ZI + 0.2, 0.11, 0.2, { axe: "z", seg: 16 });         /* couronne de flexible */
  cy(ZC, "#ddd0b0", -6.95, 1.64, ZI + 0.2, 0.05, 0.205, { axe: "z", seg: 12 });
  mallette(ZC, -6.8, -6.5, 1.52, 1.7, ZI + 0.02, ZE1 - 0.02, BLEU_BP);
  /* baie B en bas, à gauche : la bouteille de fluide (R32, ogive rouge : inflammable) sur la balance
     électronique, et la bouteille d'azote (ogive noire) avec son détendeur */
  const ZBt = ZI + 0.37;                      /* devant le coffre de roue */
  bx(ZC, "#3a424c", -8.66, -8.38, YP, YP + 0.045, ZBt - 0.14, ZBt + 0.14, { edge: 1 });
  bx(ZC, "#c3cad3", -8.64, -8.4, YP + 0.045, YP + 0.05, ZBt - 0.12, ZBt + 0.12);
  bx(ZC, "#2a313b", -8.66, -8.5, 0.86, 0.9, ZI + 0.05, ZI + 0.2);                      /* afficheur sur le coffre */
  bx(ZC, "#9fe3c9", -8.65, -8.51, 0.9, 0.903, ZI + 0.07, ZI + 0.15, { lum: 1 });
  robinetDouble(ZC, -8.52, ZBt, bouteille(ZC, -8.52, ZBt, YP + 0.05, 0.11, 0.42, "#dfe3e8", ROUGE_HP));
  const yN2 = bouteille(ZC, -8.27, ZBt, YP, 0.085, 0.64, "#7d8794", "#1f242b");
  const sN2 = detendeur(ZC, -8.27, yN2 + 0.06, ZBt, "#3a424c", "#3a424c");
  flexible(ZC, "#2a313b", sN2, [-8.74, 1.32, ZE1], 0.95, 0.009, 8);
  bx(ZC, ORANGE, -8.775, -8.18, 0.96, 1.0, ZBt + 0.11, ZBt + 0.125);                 /* sangle d'arrimage */
  /* le panneau perforé du porte-outils */
  bx(ZC, "#d5dbe2", -8.15, -7.27, 1.0, 1.9, ZI, ZI + 0.02, { edge: 1 });
  for (let i = 0; i < 9; i++) for (let j = 0; j < 10; j++) {
    const x = -8.12 + i * 0.096, y = 1.04 + j * 0.092;
    bx(ZC, "#9aa5b1", x, x + 0.012, y, y + 0.012, ZI + 0.02, ZI + 0.022);
  }
  /* le manifold à deux manomètres, suspendu : basse pression en bleu, haute pression en rouge */
  const MX = -7.72, MY = 1.58, MZ = ZI + 0.1;
  tube(ZC, "#5c6875", MX, 1.85, ZI + 0.02, MX, 1.85, MZ, 0.008);
  tube(ZC, "#5c6875", MX, 1.85, MZ, MX, MY + 0.2, MZ - 0.03, 0.006);
  bx(ZC, INOX, MX - 0.13, MX + 0.13, MY - 0.035, MY + 0.035, MZ - 0.04, MZ + 0.04, { edge: 1 });
  bx(ZC, "#2a313b", MX - 0.11, MX + 0.11, MY - 0.012, MY + 0.012, MZ + 0.04, MZ + 0.045);   /* regard du corps */
  cy(ZC, BLEU_BP, MX - 0.17, MY, MZ, 0.034, 0.07, { axe: "x", seg: 12 });
  cy(ZC, ROUGE_HP, MX + 0.17, MY, MZ, 0.034, 0.07, { axe: "x", seg: 12 });
  [[-0.075, BLEU_BP, 150], [0.075, ROUGE_HP, 40]].forEach(function (g) {
    const gx = MX + g[0], gy = MY + 0.125;
    tube(ZC, LAITON, gx, MY + 0.035, MZ, gx, gy - 0.05, MZ, 0.011);
    mano(ZC, gx, gy, MZ + 0.05, 0.068, g[1], g[2]);
  });
  [[-0.08, BLEU_BP, -0.13, 1.05, 0.0], [0, JAUNE, -0.02, 0.99, 0.025], [0.08, ROUGE_HP, 0.13, 1.1, -0.012]].forEach(function (f) {
    const x = MX + f[0];
    cyv(ZC, LAITON, x, MY - 0.075, MY - 0.035, MZ, 0.012, { seg: 8 });
    flexible(ZC, f[1], [x, MY - 0.075, MZ + f[4]], [MX + f[2], MY - 0.02, MZ - 0.05 + f[4]], f[3], 0.012, 12);
  });
  /* à gauche du manifold : la pince ampèremétrique ; à droite : le détecteur de fuites à col de cygne */
  const PA = -8.05;
  bx(ZC, JAUNE, PA - 0.04, PA + 0.04, 1.14, 1.34, ZI + 0.03, ZI + 0.065, { edge: 1 });
  bx(ZC, "#2a313b", PA - 0.035, PA + 0.035, 1.16, 1.32, ZI + 0.065, ZI + 0.068);
  bx(ZC, "#cfe9d9", PA - 0.025, PA + 0.025, 1.27, 1.305, ZI + 0.068, ZI + 0.07, { lum: 1 });
  cy(ZC, ROUGE_HP, PA, 1.2, ZI + 0.072, 0.014, 0.008, { axe: "z", seg: 10 });
  for (let k = 0; k < 11; k++) {
    const a0 = (-60 + k * 30) / D, a1 = (-30 + k * 30) / D;
    tube(ZC, k < 10 ? ROUGE_HP : "#2a313b", PA + 0.045 * Math.cos(a0), 1.39 + 0.045 * Math.sin(a0), ZI + 0.05, PA + 0.045 * Math.cos(a1), 1.39 + 0.045 * Math.sin(a1), ZI + 0.05, 0.011);
  }
  const DF = -7.38;
  bx(ZC, "#cfd4da", DF - 0.035, DF + 0.035, 1.32, 1.52, ZI + 0.03, ZI + 0.07, { edge: 1 });
  bx(ZC, "#2a313b", DF - 0.03, DF + 0.03, 1.46, 1.5, ZI + 0.07, ZI + 0.073);
  sp(ZC, "#e34a3a", DF, 1.42, ZI + 0.072, 0.008, 0.008, 0.004, { seg: 6, seg2: 4, lum: 1 });
  canal(ZC, "#5c6875", [[DF, 1.52, ZI + 0.05], [DF - 0.005, 1.6, ZI + 0.06], [DF + 0.005, 1.68, ZI + 0.07], [DF + 0.035, 1.73, ZI + 0.08]], 0.006);
  /* bande haute du panneau : coupe-tube, ébavureur, clé à cliquet */
  bx(ZC, ROUGE_HP, -8.12, -8.06, 1.78, 1.9, ZI + 0.03, ZI + 0.06);
  cy(ZC, "#c3cad3", -8.09, 1.82, ZI + 0.075, 0.02, 0.01, { axe: "z", seg: 10 });
  cyv(ZC, ROUGE_HP, -8.09, 1.7, 1.78, ZI + 0.045, 0.012, { seg: 8 });
  cyv(ZC, JAUNE, -7.98, 1.76, 1.88, ZI + 0.045, 0.014, { seg: 8 });
  tube(ZC, "#c3cad3", -7.98, 1.76, ZI + 0.045, -7.98, 1.7, ZI + 0.045, 0.004);
  bx(ZC, "#8a94a1", -7.47, -7.43, 1.72, 1.86, ZI + 0.03, ZI + 0.045);
  bx(ZC, "#5c6875", -7.49, -7.41, 1.84, 1.88, ZI + 0.03, ZI + 0.05);
  /* au sol, sous le panneau : la station de récupération, la pompe à vide, la bouteille de récupération */
  const SX0 = -8.12, SX1 = -7.76;
  bx(ZC, "#3a424c", SX0, SX1, YP, YP + 0.31, ZI + 0.02, ZI + 0.32, { edge: 1 });
  bx(ZC, JAUNE, SX0 + 0.01, SX1 - 0.01, YP + 0.04, YP + 0.29, ZI + 0.32, ZI + 0.326);
  mano(ZC, SX0 + 0.09, YP + 0.21, ZI + 0.34, 0.036, BLEU_BP, 120);
  mano(ZC, SX1 - 0.09, YP + 0.21, ZI + 0.34, 0.036, ROUGE_HP, 60);
  cy(ZC, "#2a313b", (SX0 + SX1) / 2, YP + 0.1, ZI + 0.335, 0.032, 0.02, { axe: "z", seg: 12 });   /* sélecteur */
  bx(ZC, "#c3cad3", (SX0 + SX1) / 2 - 0.005, (SX0 + SX1) / 2 + 0.005, YP + 0.1, YP + 0.13, ZI + 0.345, ZI + 0.35);
  [SX0 + 0.05, SX1 - 0.05].forEach(function (x) { cy(ZC, LAITON, x, YP + 0.08, ZI + 0.335, 0.01, 0.03, { axe: "z", seg: 8 }); });
  bx(ZC, "#39c77a", SX1 - 0.04, SX1 - 0.02, YP + 0.27, YP + 0.28, ZI + 0.326, ZI + 0.33, { lum: 1 });
  canal(ZC, "#2a313b", [[SX0 + 0.05, YP + 0.31, ZI + 0.17], [SX0 + 0.05, YP + 0.38, ZI + 0.17], [SX1 - 0.05, YP + 0.38, ZI + 0.17], [SX1 - 0.05, YP + 0.31, ZI + 0.17]], 0.012);
  for (let k = 0; k < 5; k++) bx(ZC, "#5c6875", SX1 + 0.001, SX1 + 0.004, YP + 0.08 + k * 0.04, YP + 0.095 + k * 0.04, ZI + 0.06, ZI + 0.28);
  /* la pompe à vide : moteur à ailettes, carter noir, voyant d'huile, poignée */
  const VP0 = -7.73, VP1 = -7.47;
  bx(ZC, "#2a313b", VP0, VP1, YP, YP + 0.025, ZI + 0.05, ZI + 0.27);
  cy(ZC, "#8a94a1", VP0 + 0.075, YP + 0.13, ZI + 0.16, 0.085, 0.15, { axe: "x", seg: 16 });
  for (let k = 0; k < 4; k++) cy(ZC, "#7c8794", VP0 + 0.015 + k * 0.035, YP + 0.13, ZI + 0.16, 0.09, 0.008, { axe: "x", seg: 16 });
  bx(ZC, "#2a313b", VP0 + 0.15, VP1, YP + 0.025, YP + 0.24, ZI + 0.06, ZI + 0.26, { edge: 1 });
  cy(ZC, "#e8c46a", VP1 - 0.055, YP + 0.09, ZI + 0.262, 0.022, 0.008, { axe: "z", seg: 12 });
  cyv(ZC, JAUNE, VP1 - 0.07, YP + 0.24, YP + 0.27, ZI + 0.2, 0.014, { seg: 8 });         /* aspiration 1/4" SAE */
  cyv(ZC, "#5c6875", VP1 - 0.03, YP + 0.24, YP + 0.29, ZI + 0.1, 0.02, { seg: 8 });      /* échappement */
  canal(ZC, "#e0a422", [[VP0 + 0.02, YP + 0.2, ZI + 0.16], [VP0 + 0.02, YP + 0.3, ZI + 0.16], [VP1 - 0.02, YP + 0.3, ZI + 0.16], [VP1 - 0.02, YP + 0.24, ZI + 0.16]], 0.011);
  robinetDouble(ZC, -7.355, ZI + 0.2, bouteille(ZC, -7.355, ZI + 0.2, YP, 0.105, 0.44, "#8f99a5", JAUNE));

  /* =====================================================================
     3. LA CAMIONNETTE — l'ordinateur portable et les sondes Bluetooth,
        sur une mallette posée devant la porte ouverte
     ===================================================================== */
  const CK0 = -7.95, CK1 = -7.05, CKY = 0.34;
  bx(ZC, "#2a313b", CK0, CK1, 0, CKY, 8.27, 8.58, { edge: 1 });
  bx(ZC, ALU, CK0 - 0.005, CK1 + 0.005, 0.165, 0.18, 8.265, 8.585);
  [CK0, CK1 - 0.04].forEach(function (x) { bx(ZC, ALU, x - 0.003, x + 0.043, 0, CKY, 8.58, 8.585); });
  [CK0 + 0.25, CK1 - 0.25].forEach(function (x) { bx(ZC, "#c3cad3", x - 0.02, x + 0.02, 0.12, 0.2, 8.585, 8.595); });
  /* l'ordinateur : socle, clavier, pavé tactile, écran incliné de 15° vers l'arrière */
  const LX = -7.71, LY = CKY, LZ = 8.425;
  bx(ZC, "#3d4651", LX - 0.2, LX + 0.2, LY, LY + 0.018, LZ - 0.125, LZ + 0.125, { edge: 1 });
  bx(ZC, "#1e2530", LX - 0.17, LX + 0.17, LY + 0.018, LY + 0.021, LZ - 0.105, LZ + 0.005);
  for (let k = 0; k < 4; k++) bx(ZC, "#4a5563", LX - 0.165, LX + 0.165, LY + 0.021, LY + 0.022, LZ - 0.095 + k * 0.026, LZ - 0.085 + k * 0.026);
  bx(ZC, "#4a5563", LX - 0.055, LX + 0.055, LY + 0.018, LY + 0.021, LZ + 0.03, LZ + 0.105);
  const T = 15 / D, ct = Math.cos(T), st = Math.sin(T), HY = LY + 0.018, HZ = LZ - 0.125;
  /* pose une plaque dans le plan de l'écran : u en largeur, v en hauteur, d en avant de la dalle */
  function ecran(c, u, v, w, h, ang, d, lum) {
    bxr(ZC, c, LX + u, HY + v * ct + d * st, HZ - v * st + d * ct, w, h, 0.003, -15, 0, ang || 0, lum ? { lum: 1 } : undefined);
  }
  bxr(ZC, "#3d4651", LX, HY + 0.14 * ct - 0.007 * st, HZ - 0.14 * st - 0.007 * ct, 0.4, 0.28, 0.012, -15, 0, 0);
  ecran("#f2f7fc", 0, 0.142, 0.372, 0.242, 0, 0.0015, 1);                              /* la dalle lumineuse */
  ecran(P.bleu, 0, 0.25, 0.372, 0.026, 0, 0.0045, 1);                                  /* barre de titre */
  /* une courbe : la descente du vide (exponentielle) et une température qui monte */
  ecran("#9aa5b1", -0.165, 0.135, 0.004, 0.18, 0, 0.0045, 1);
  ecran("#9aa5b1", -0.07, 0.045, 0.19, 0.004, 0, 0.0045, 1);
  function courbe(c, f, ep) {
    let u0 = -0.165, v0 = f(u0);
    for (let i = 1; i <= 12; i++) {
      const u1 = -0.165 + i * 0.016, v1 = f(u1), du = u1 - u0, dv = v1 - v0;
      ecran(c, (u0 + u1) / 2, (v0 + v1) / 2, Math.hypot(du, dv) + ep, ep, Math.atan2(dv, du) * D, 0.006, 1);
      u0 = u1; v0 = v1;
    }
  }
  courbe("#d9573a", function (u) { return 0.055 + 0.15 * Math.exp(-(u + 0.165) * 22); }, 0.008);
  courbe("#1b6e5a", function (u) { return 0.06 + 0.09 * (1 - Math.exp(-(u + 0.165) * 14)); }, 0.006);
  /* le symbole Bluetooth : la rune ᛒ en bleu, sur une pastille claire */
  const RU = 0.11, RV = 0.135, RS = 0.068;
  ecran("#dbe8fb", RU, RV, 0.1, 0.17, 0, 0.0045, 1);
  function trait(a, b) {
    const du = b[0] - a[0], dv = b[1] - a[1];
    ecran(BT, RU + (a[0] + b[0]) / 2 * RS, RV + (a[1] + b[1]) / 2 * RS, Math.hypot(du, dv) * RS + 0.011, 0.011, Math.atan2(dv, du) * D, 0.0075, 1);
  }
  trait([0, -1], [0, 1]);
  trait([0, 1], [0.52, 0.5]); trait([0.52, 0.5], [-0.52, -0.5]);
  trait([0, -1], [0.52, -0.5]); trait([0.52, -0.5], [-0.52, 0.5]);
  /* à côté de l'ordinateur : un tube de cuivre et ses deux sondes Bluetooth (pinces de température) */
  const TY = CKY + 0.016, TZ = 8.45;
  tube(ZC, P.cuivre, -7.46, TY, TZ, -6.92, TY, TZ, 0.016, { seg: 10 });
  bx(ZC, "#2a313b", -7.47, -7.455, TY - 0.016, TY + 0.016, TZ - 0.016, TZ + 0.016);
  [-7.36, -7.14].forEach(function (x) {
    cy(ZC, "#4a5563", x, TY, TZ, 0.026, 0.04, { axe: "x", seg: 10 });                /* la pince */
    bx(ZC, "#4a5563", x - 0.02, x + 0.02, TY, TY + 0.05, TZ - 0.012, TZ + 0.012);
    cyv(ZC, "#e4e8ec", x, TY + 0.04, TY + 0.19, TZ, 0.022, { seg: 12 });               /* le corps */
    cyv(ZC, BT, x, TY + 0.19, TY + 0.22, TZ, 0.023, { seg: 12 });                      /* le bout bleu */
    sp(ZC, BT, x, TY + 0.22, TZ, 0.023, 0.012, 0.023, { seg: 12, seg2: 5 });
    sp(ZC, "#6fb6ff", x, TY + 0.15, TZ + 0.021, 0.006, 0.006, 0.003, { seg: 6, seg2: 4, lum: 1 });   /* voyant */
  });
  H.proxy(ZC, VX0 - 0.15, VX1 + 0.1, 0, YT + 0.35, VZ0 - 0.3, VZ1 + 0.42);
  H.proxy(ZC, -10.2, -9.9, 0, 0.5, 6.45, 7.75);
  H.proxy(ZC, -9.45, -9.15, 0, 0.5, 8.75, 9.05);
  H.ancre(ZC, -7.0, 3.05, 7.2);

  /* =====================================================================
     4. L'ÉTABLI — le meuble (plateau hêtre, piètement acier, tiroirs)
     ===================================================================== */
  const EX0 = -3.8, EX1 = -1.8, EZ0 = 3.6, EZ1 = 4.5, EY = 0.95, YS = 0.15;   /* YS : dessus du trottoir */
  const CADRE = "#3a5577";
  bx(ZE, P.bois, EX0, EX1, EY - 0.05, EY, EZ0, EZ1, { edge: 1 });
  bx(ZE, P.boisF, EX0, EX1, EY - 0.05, EY - 0.044, EZ0, EZ1);
  [[EX0 + 0.06, EZ0 + 0.06], [EX1 - 0.06, EZ0 + 0.06], [EX0 + 0.06, EZ1 - 0.06], [EX1 - 0.06, EZ1 - 0.06]].forEach(function (p) {
    bx(ZE, CADRE, p[0] - 0.025, p[0] + 0.025, YS + 0.02, EY - 0.05, p[1] - 0.025, p[1] + 0.025);
    bx(ZE, "#2a313b", p[0] - 0.035, p[0] + 0.035, YS, YS + 0.02, p[1] - 0.035, p[1] + 0.035);
  });
  bx(ZE, CADRE, EX0 + 0.04, EX1 - 0.04, EY - 0.12, EY - 0.05, EZ1 - 0.07, EZ1 - 0.04);
  bx(ZE, CADRE, EX0 + 0.04, EX1 - 0.04, EY - 0.12, EY - 0.05, EZ0 + 0.04, EZ0 + 0.07);
  [EX0 + 0.06, EX1 - 0.06].forEach(function (x) { bx(ZE, CADRE, x - 0.02, x + 0.02, YS + 0.12, YS + 0.16, EZ0 + 0.06, EZ1 - 0.06); });
  bx(ZE, "#8a94a1", EX0 + 0.06, EX1 - 0.06, YS + 0.16, YS + 0.18, EZ0 + 0.06, EZ1 - 0.06, { edge: 1 });   /* tablette basse */
  /* bloc de trois tiroirs sous la droite du plateau */
  const TIR = [YS + 0.18, 0.43, 0.63, EY - 0.12];
  bx(ZE, "#c9ced6", -2.55, EX1 - 0.09, YS + 0.18, EY - 0.12, EZ0 + 0.08, EZ1 - 0.06, { edge: 1 });
  for (let k = 0; k < 3; k++) {
    bx(ZE, "#dde1e6", -2.53, EX1 - 0.11, TIR[k] + 0.012, TIR[k + 1] - 0.012, EZ1 - 0.06, EZ1 - 0.05);
    bx(ZE, "#2a313b", -2.27, -2.09, (TIR[k] + TIR[k + 1]) / 2 + 0.02, (TIR[k] + TIR[k + 1]) / 2 + 0.035, EZ1 - 0.05, EZ1 - 0.03);
  }

  /* =====================================================================
     5. L'ÉTABLI — le travail du cuivre : étau et dudgeonnière, coupe-tube,
        cintreuse, tubes droits, caisse à outils, couronne
     ===================================================================== */
  /* l'étau, au bord avant gauche ; il serre la barre de la dudgeonnière */
  const VXc = -3.52, VZc = 4.34, ET = "#3b6aa0";
  bx(ZE, ET, VXc - 0.11, VXc + 0.11, EY, EY + 0.035, VZc - 0.19, VZc - 0.02);         /* semelle */
  [-1, 1].forEach(function (s) { cyv(ZE, "#5c6875", VXc + s * 0.085, EY + 0.035, EY + 0.048, VZc - 0.15, 0.014, { seg: 6 }); });
  bx(ZE, ET, VXc - 0.06, VXc + 0.06, EY + 0.035, EY + 0.13, VZc - 0.17, VZc - 0.035);  /* corps fixe */
  bx(ZE, ET, VXc - 0.045, VXc + 0.045, EY + 0.04, EY + 0.1, VZc + 0.03, VZc + 0.18);   /* coulisseau */
  bx(ZE, ET, VXc - 0.1, VXc + 0.1, EY + 0.1, EY + 0.18, VZc - 0.075, VZc - 0.027);     /* mors fixe */
  bx(ZE, ET, VXc - 0.1, VXc + 0.1, EY + 0.1, EY + 0.18, VZc + 0.027, VZc + 0.075);     /* mors mobile */
  bx(ZE, "#5c6875", VXc - 0.095, VXc + 0.095, EY + 0.11, EY + 0.18, VZc - 0.027, VZc - 0.022);
  bx(ZE, "#5c6875", VXc - 0.095, VXc + 0.095, EY + 0.11, EY + 0.18, VZc + 0.022, VZc + 0.027);
  bx(ZE, ET, VXc - 0.04, VXc + 0.04, EY + 0.13, EY + 0.155, VZc - 0.18, VZc - 0.08);   /* enclume */
  cy(ZE, "#c3cad3", VXc, EY + 0.07, VZc + 0.21, 0.014, 0.07, { axe: "z", seg: 8 });
  cy(ZE, "#c3cad3", VXc, EY + 0.07, VZc + 0.235, 0.009, 0.28, { axe: "x", seg: 8 });  /* levier de serrage */
  [-0.14, 0.14].forEach(function (u) { sp(ZE, "#c3cad3", VXc + u, EY + 0.07, VZc + 0.235, 0.016, 0.016, 0.016, { seg: 8, seg2: 6 }); });
  /* la dudgeonnière : barre à évaser (deux mâchoires) serrée dans l'étau, tube dressé, étrier et cône */
  bx(ZE, "#c3cad3", VXc - 0.16, VXc + 0.16, EY + 0.14, EY + 0.2, VZc - 0.022, VZc - 0.001);
  bx(ZE, "#c3cad3", VXc - 0.16, VXc + 0.16, EY + 0.14, EY + 0.2, VZc + 0.001, VZc + 0.022);
  [-0.13, -0.08, 0.08, 0.13].forEach(function (u, i) { cy(ZE, "#5c6875", VXc + u, EY + 0.201, VZc, 0.005 + i * 0.0015, 0.002, { seg: 8 }); });
  [-0.175, 0.175].forEach(function (u) {
    cy(ZE, "#8a94a1", VXc + u, EY + 0.17, VZc, 0.007, 0.075, { axe: "z", seg: 6 });
    bx(ZE, "#8a94a1", VXc + u - 0.007, VXc + u + 0.007, EY + 0.15, EY + 0.19, VZc + 0.037, VZc + 0.047);   /* écrou papillon */
  });
  cyv(ZE, P.cuivre, VXc, EY + 0.06, EY + 0.212, VZc, 0.01, { seg: 10 });
  cyv(ZE, "#e0a06a", VXc, EY + 0.203, EY + 0.214, VZc, 0.015, { rt: 0.01, seg: 10 });  /* l'évasement */
  const YK = "#4a5563";
  [-1, 1].forEach(function (s) { bx(ZE, YK, VXc - 0.03, VXc + 0.03, EY + 0.18, EY + 0.34, VZc + s * 0.036 - 0.009, VZc + s * 0.036 + 0.009); });
  bx(ZE, YK, VXc - 0.03, VXc + 0.03, EY + 0.32, EY + 0.355, VZc - 0.045, VZc + 0.045);
  cyv(ZE, "#c3cad3", VXc, EY + 0.23, EY + 0.42, VZc, 0.009, { seg: 8 });
  cyv(ZE, "#c3cad3", VXc, EY + 0.213, EY + 0.235, VZc, 0.016, { rt: 0.005, seg: 10 }); /* cône (pointe en bas) */
  tube(ZE, "#c3cad3", VXc - 0.08, EY + 0.42, VZc, VXc + 0.08, EY + 0.42, VZc, 0.007);  /* poignée en T */
  [-0.08, 0.08].forEach(function (u) { cy(ZE, "#2a313b", VXc + u, EY + 0.42, VZc, 0.013, 0.05, { axe: "x", seg: 8 }); });
  /* le coupe-tube, monté sur une chute de tube */
  tube(ZE, P.cuivre, -3.36, EY + 0.012, 4.4, -3.08, EY + 0.012, 4.4, 0.012, { seg: 8 });
  bx(ZE, ROUGE_HP, -3.24, -3.19, EY + 0.0, EY + 0.06, 4.33, 4.44);
  cy(ZE, "#c3cad3", -3.215, EY + 0.03, 4.375, 0.022, 0.012, { axe: "x", seg: 12 });     /* molette de coupe */
  cy(ZE, ROUGE_HP, -3.215, EY + 0.03, 4.28, 0.016, 0.1, { axe: "z", seg: 8 });           /* vis de serrage */
  /* la cintreuse à levier, posée à plat, et son tube cintré à 90° */
  const CX = -2.88, CZ = 4.08, CYb = EY + 0.014, RF = 0.09;
  cy(ZE, "#c3cad3", CX, CYb + 0.006, CZ, RF, 0.028, { seg: 22 });
  cy(ZE, "#8a94a1", CX, CYb + 0.006, CZ, RF + 0.005, 0.01, { seg: 22 });                 /* la gorge */
  cy(ZE, "#5c6875", CX, CYb + 0.026, CZ, 0.016, 0.016, { seg: 8 });
  bx(ZE, "#c3cad3", CX - 0.44, CX, CYb - 0.008, CYb + 0.014, CZ - 0.02, CZ + 0.02);     /* bras fixe */
  cy(ZE, ROUGE_HP, CX - 0.37, CYb + 0.004, CZ, 0.024, 0.15, { axe: "x", seg: 10 });
  bx(ZE, "#c3cad3", CX + RF + 0.016, CX + RF + 0.06, CYb - 0.008, CYb + 0.02, CZ - 0.2, CZ + 0.02);   /* sabot */
  bx(ZE, "#c3cad3", CX + RF + 0.022, CX + RF + 0.052, CYb - 0.008, CYb + 0.012, CZ - 0.36, CZ - 0.2); /* bras mobile */
  cy(ZE, ROUGE_HP, CX + RF + 0.037, CYb + 0.004, CZ - 0.3, 0.024, 0.12, { axe: "z", seg: 10 });
  const cint = [[CX - 0.42, CYb, CZ + RF + 0.002]];
  for (let k = 0; k <= 6; k++) { const a = (90 - k * 15) / D; cint.push([CX + (RF + 0.002) * Math.cos(a), CYb, CZ + (RF + 0.002) * Math.sin(a)]); }
  cint.push([CX + RF + 0.002, CYb, CZ - 0.28]);
  canal(ZE, P.cuivre, cint, 0.012, { seg: 8 });
  /* la caisse à outils (au fond à gauche) */
  bx(ZE, ROUGE_HP, -3.76, -3.3, EY, EY + 0.17, 3.63, 3.87, { edge: 1 });
  bx(ZE, "#9a2e22", -3.76, -3.3, EY + 0.17, EY + 0.19, 3.63, 3.87);
  bx(ZE, "#c3cad3", -3.56, -3.5, EY + 0.12, EY + 0.16, 3.87, 3.88);
  tube(ZE, "#2a313b", -3.66, EY + 0.19, 3.75, -3.66, EY + 0.25, 3.75, 0.01, { seg: 6 });
  tube(ZE, "#2a313b", -3.4, EY + 0.19, 3.75, -3.4, EY + 0.25, 3.75, 0.01, { seg: 6 });
  tube(ZE, "#2a313b", -3.66, EY + 0.25, 3.75, -3.4, EY + 0.25, 3.75, 0.012, { seg: 6 });
  /* tubes de cuivre droits le long du fond, la boîte de baguettes de brasure */
  [[-3.25, -2.0, 3.64, 0.012], [-3.2, -2.2, 3.665, 0.009], [-3.22, -2.1, 3.69, 0.0105]].forEach(function (t) {
    tube(ZE, P.cuivre, t[0], EY + t[3], t[2], t[1], EY + t[3], t[2], t[3], { seg: 8 });
  });
  cy(ZE, ORANGE, -2.12, EY + 0.025, 3.79, 0.025, 0.32, { axe: "x", seg: 10 });
  [[0.0, 0.0], [0.007, 0.009], [-0.007, 0.007]].forEach(function (o) {
    tube(ZE, "#d4c27a", -1.96, EY + 0.025 + o[0], 3.79 + o[1], -1.84, EY + 0.025 + o[0], 3.79 + o[1], 0.0035, { seg: 4 });
  });
  /* sur la tablette basse : la couronne de cuivre et deux manchons isolants noirs */
  const KX = -3.25, KZ = 4.05;
  for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) {
    const R = 0.19 + i * 0.023, y = YS + 0.191 + j * 0.022;
    for (let k = 0; k < 18; k++) {
      const a0 = k * Math.PI / 9, a1 = (k + 1) * Math.PI / 9;
      tube(ZE, P.cuivre, KX + R * Math.cos(a0), y, KZ + R * Math.sin(a0), KX + R * Math.cos(a1), y, KZ + R * Math.sin(a1), 0.011);
    }
  }
  [0.4, 2.5, 4.6].forEach(function (a) { bxr(ZE, BLEU_BP, KX + 0.213 * Math.cos(a), YS + 0.202, KZ + 0.213 * Math.sin(a), 0.03, 0.065, 0.1, 0, -a * D, 0); });
  [3.73, 3.8].forEach(function (z) { cy(ZE, P.armaflex, -2.95, YS + 0.205, z, 0.025, 0.9, { axe: "x", seg: 10 }); });

  /* =====================================================================
     6. L'ÉTABLI — la flamme : briques de brasage, chalumeau, chariot
        oxyacétylénique, lunettes de soudeur, extincteur
     ===================================================================== */
  /* courbe lissée (Catmull-Rom) passant par des points de passage : les tuyaux souples */
  function lisse(pts, n) {
    const out = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      for (let k = 1; k <= n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1, 2].map(function (c) {
          return 0.5 * (2 * p1[c] + (-p0[c] + p2[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3);
        }));
      }
    }
    return out;
  }
  /* deux briques réfractaires et une pièce brasée : tube, coude, tube, joints d'argent */
  bx(ZE, "#e3d7bf", -2.5, -2.27, EY, EY + 0.065, 3.9, 4.12, { edge: 1 });
  bx(ZE, "#ddd0b5", -2.26, -2.03, EY, EY + 0.065, 3.9, 4.12, { edge: 1 });
  const YBr = EY + 0.065 + 0.012;
  tube(ZE, P.cuivre, -2.46, YBr, 4.06, -2.2, YBr, 4.06, 0.012, { seg: 8 });
  canal(ZE, "#b8743f", [[-2.2, YBr, 4.06], [-2.17, YBr, 4.055], [-2.155, YBr, 4.04], [-2.15, YBr, 4.01]], 0.016, { seg: 8 });
  tube(ZE, P.cuivre, -2.15, YBr, 4.01, -2.15, YBr, 3.92, 0.012, { seg: 8 });
  cy(ZE, "#e2dccb", -2.2, YBr, 4.06, 0.017, 0.012, { axe: "x", seg: 10 });
  cy(ZE, "#e2dccb", -2.15, YBr, 4.01, 0.017, 0.012, { axe: "z", seg: 10 });
  /* la boîte de raccords à braser : coudes et manchons en cuivre */
  bx(ZE, "#e2d3b1", -2.0, -1.84, EY, EY + 0.05, 3.92, 4.1, { edge: 1 });
  bx(ZE, "#c9b48c", -1.99, -1.85, EY + 0.04, EY + 0.045, 3.93, 4.09);
  [[-1.96, 3.96], [-1.89, 3.98], [-1.95, 4.05], [-1.88, 4.06]].forEach(function (p, i) {
    canal(ZE, P.cuivre, [[p[0] - 0.025, EY + 0.06, p[1]], [p[0], EY + 0.06, p[1]], [p[0], EY + 0.06, p[1] + (i % 2 ? 0.025 : -0.025)]], 0.011, { seg: 8 });
  });
  /* le chalumeau posé devant : poignée laiton moletée, deux robinets, lance coudée, buse */
  const TX0 = -2.02, TYb = EY + 0.02, TZb = 4.33;
  tube(ZE, LAITON, TX0, TYb, TZb, TX0 - 0.26, TYb, TZb - 0.03, 0.02, { seg: 10 });
  for (let k = 0; k < 5; k++) { const x = TX0 - 0.07 - k * 0.032; tube(ZE, "#8a6d33", x, TYb, TZb - 0.008 - k * 0.0037, x - 0.014, TYb, TZb - 0.01 - k * 0.0037, 0.0215, { seg: 10 }); }
  [[0.018, BLEU_BP], [-0.018, ROUGE_HP]].forEach(function (v) {
    cyv(ZE, LAITON, TX0 - 0.025, TYb + 0.015, TYb + 0.03, TZb + v[0], 0.006, { seg: 6 });
    cyv(ZE, v[1], TX0 - 0.025, TYb + 0.03, TYb + 0.048, TZb + v[0], 0.016, { seg: 10 });
  });
  cy(ZE, LAITON, TX0 - 0.28, TYb, TZb - 0.032, 0.016, 0.04, { axe: "x", seg: 10 });
  tube(ZE, "#b07a45", TX0 - 0.3, TYb, TZb - 0.034, TX0 - 0.52, TYb, TZb - 0.065, 0.008);
  tube(ZE, "#b07a45", TX0 - 0.52, TYb, TZb - 0.065, TX0 - 0.58, TYb, TZb - 0.12, 0.008);
  cy(ZE, P.cuivre, TX0 - 0.59, TYb, TZb - 0.13, 0.011, 0.035, { axe: "x", seg: 8 });
  /* le chariot : plaque, deux roues, dossier et poignée, berceau */
  const TXc = -1.57, TZc = 4.08;
  bx(ZE, "#3a424c", TXc - 0.21, TXc + 0.21, YS + 0.04, YS + 0.07, TZc - 0.12, TZc + 0.14, { edge: 1 });
  [-1, 1].forEach(function (s) {
    cy(ZE, PNEU, TXc + s * 0.225, YS + 0.08, TZc - 0.14, 0.08, 0.035, { axe: "x", seg: 14 });
    cy(ZE, "#c3cad3", TXc + s * 0.245, YS + 0.08, TZc - 0.14, 0.035, 0.008, { axe: "x", seg: 10 });
    tube(ZE, "#3a424c", TXc + s * 0.2, YS + 0.07, TZc - 0.13, TXc + s * 0.2, 1.06, TZc - 0.16, 0.014);
  });
  tube(ZE, "#3a424c", TXc - 0.2, YS + 0.08, TZc - 0.14, TXc + 0.2, YS + 0.08, TZc - 0.14, 0.01);
  tube(ZE, "#3a424c", TXc - 0.2, 1.06, TZc - 0.16, TXc + 0.2, 1.06, TZc - 0.16, 0.016);
  [0.45, 0.7].forEach(function (y) { tube(ZE, "#3a424c", TXc - 0.2, y, TZc - 0.13, TXc + 0.2, y, TZc - 0.13, 0.01); });
  /* bouteille d'oxygène (ogive blanche) et d'acétylène (ogive marron), chaînes, détendeurs */
  const XO2 = TXc - 0.105, XAC = TXc + 0.105;
  const yO2 = bouteille(ZE, XO2, TZc, YS + 0.07, 0.085, 0.74, "#2f353d", "#f7f5ef");
  const yAC = bouteille(ZE, XAC, TZc, YS + 0.07, 0.1, 0.6, "#7a3b2a", "#5e2a1c");
  [[XO2, 0.086], [XAC, 0.101]].forEach(function (b) { cyv(ZE, "#5c6875", b[0], 0.68, 0.7, TZc, b[1] + 0.004, { seg: 14 }); });
  const sO2 = detendeur(ZE, XO2, yO2 + 0.06, TZc, BLEU_BP, BLEU_BP);
  const sAC = detendeur(ZE, XAC, yAC + 0.06, TZc, ROUGE_HP, ROUGE_HP);
  /* les tuyaux jumelés : bleu (oxygène) et rouge (acétylène), NF EN 559 ; ils descendent devant
     les bouteilles, courent au sol et remontent par le pied de l'établi jusqu'au chalumeau */
  function tuyauGaz(c, s, d) {
    canal(ZE, c, lisse([[s[0], s[1], s[2]], [s[0], s[1] - 0.06, s[2] + 0.05], [s[0] + d * 0.3, 0.5, 4.3], [s[0] - 0.03, YS + 0.06, 4.46],
      [-1.74, YS + 0.012, 4.62 + d * 0.4], [-1.83 + d, YS + 0.06, 4.6], [-1.85 + d, 0.55, 4.56], [-1.86 + d, EY - 0.03, 4.53],
      [-1.9 + d, EY + 0.012, 4.46], [-1.97, EY + 0.012, 4.38 + d], [TX0 + 0.04, TYb, TZb + d]], 4), 0.011);
  }
  tuyauGaz(BLEU_BP, sO2, -0.014);
  tuyauGaz(ROUGE_HP, sAC, 0.014);
  /* les lunettes de soudeur (verres teintés), accrochées au bord de l'établi */
  const GX = -2.2, GY = 0.74, GZ = 4.53;
  [-1, 1].forEach(function (s) {
    cy(ZE, "#2a313b", GX + s * 0.042, GY, GZ, 0.034, 0.03, { axe: "z", seg: 14 });
    cy(ZE, "#1d5a44", GX + s * 0.042, GY, GZ + 0.016, 0.027, 0.004, { axe: "z", seg: 14 });
    tube(ZE, "#2a313b", GX + s * 0.076, GY, GZ - 0.01, GX, 0.865, 4.495, 0.005, { seg: 4 });
  });
  bx(ZE, "#2a313b", GX - 0.012, GX + 0.012, GY - 0.006, GY + 0.006, GZ - 0.008, GZ + 0.008);
  tube(ZE, "#5c6875", GX, 0.865, EZ1 - 0.04, GX, 0.865, 4.5, 0.006, { seg: 6 });
  /* l'extincteur, au pied de l'établi */
  const FXc = -3.92, FZc = 4.22;
  cyv(ZE, "#d63a2f", FXc, YS + 0.03, YS + 0.48, FZc, 0.075, { seg: 14 });
  sp(ZE, "#d63a2f", FXc, YS + 0.48, FZc, 0.075, 0.05, 0.075, { seg: 14, seg2: 6 });
  cyv(ZE, "#2a313b", FXc, YS, YS + 0.03, FZc, 0.078, { seg: 14 });
  cyv(ZE, "#2a313b", FXc, YS + 0.52, YS + 0.58, FZc, 0.022, { seg: 8 });
  bx(ZE, "#2a313b", FXc - 0.02, FXc + 0.08, YS + 0.585, YS + 0.6, FZc - 0.015, FZc + 0.015);
  bx(ZE, "#2a313b", FXc - 0.02, FXc + 0.07, YS + 0.55, YS + 0.565, FZc - 0.015, FZc + 0.015);
  cy(ZE, "#fbfaf5", FXc - 0.025, YS + 0.56, FZc + 0.024, 0.012, 0.008, { axe: "z", seg: 10 });
  canal(ZE, "#2a313b", [[FXc + 0.015, YS + 0.55, FZc + 0.015], [FXc + 0.05, YS + 0.5, FZc + 0.07], [FXc + 0.06, YS + 0.32, FZc + 0.085], [FXc + 0.055, YS + 0.2, FZc + 0.085]], 0.008);
  cyv(ZE, "#2a313b", FXc + 0.055, YS + 0.13, YS + 0.2, FZc + 0.085, 0.014, { seg: 8 });
  bx(ZE, "#fbfaf5", FXc - 0.035, FXc + 0.035, YS + 0.18, YS + 0.36, FZc + 0.064, FZc + 0.077);
  H.proxy(ZE, EX0 - 0.25, -1.3, YS, EY + 0.45, EZ0 - 0.05, 4.7);
  H.ancre(ZE, -2.3, 1.4, 4.45);

  /* =====================================================================
     7. L'ÉCHAFAUDAGE DE PIED — calage, cadres, planchers à trappe,
        garde-corps, croix de contreventement, amarrages, échelles
     ===================================================================== */
  const XI = 2.2, XO = 3.2, ZS = [-4.5, -2.43, -0.36, 1.71], NIV = [0.2, 2.2, 4.2], YH = 5.3;
  /* calage, socles réglables, montants et traverses de chaque cadre */
  ZS.forEach(function (z) {
    bx(ZF, P.boisF, 2.08, 3.32, 0, 0.045, z - 0.11, z + 0.11, { edge: 1 });
    [XI, XO].forEach(function (x) {
      bx(ZF, "#8a94a1", x - 0.075, x + 0.075, 0.045, 0.055, z - 0.075, z + 0.075);
      cyv(ZF, "#6b7682", x, 0.055, 0.17, z, 0.016, { seg: 6 });
      cyv(ZF, "#c0392b", x, 0.1, 0.125, z, 0.034, { seg: 6 });
      cyv(ZF, GALVA, x, 0.15, YH, z, 0.024, { seg: 8 });
    });
    NIV.forEach(function (y) { tube(ZF, GALVA, XI, y - 0.03, z, XO, y - 0.03, z, 0.022); });
    tube(ZF, GALVA, XI, 1.2, z, XO, 1.2, z, 0.018);
    tube(ZF, GALVA, XI, 3.2, z, XO, 3.2, z, 0.018);
  });
  [XI, XO].forEach(function (x) { NIV.forEach(function (y) { tube(ZF, GALVA, x, y - 0.03, ZS[0], x, y - 0.03, ZS[3], 0.02); }); });
  /* manchons d'emboîtement des cadres et colliers des lisses */
  ZS.forEach(function (z) {
    [XI, XO].forEach(function (x) { [2.17, 4.17].forEach(function (y) { cyv(ZF, "#8a94a1", x, y - 0.06, y + 0.04, z, 0.031, { seg: 8 }); }); });
    [3.2, 3.7, 5.27].forEach(function (y) { bx(ZF, "#6b7682", XO + 0.01, XO + 0.065, y - 0.03, y + 0.03, z - 0.035, z + 0.035); });
  });
  /* planchers : trois platelages acier par travée ; dans la travée avant, planchers à trappe */
  const TRAPPE = { 1: [2.28, 2.72], 2: [2.68, 3.12] };          /* niveau → trou de trappe en x (z 0..0,75) */
  for (let i = 0; i < 3; i++) {
    const za = ZS[i] + 0.03, zb = ZS[i + 1] - 0.03;
    NIV.forEach(function (y, n) {
      if (i === 2 && TRAPPE[n]) {
        const t = TRAPPE[n];
        bx(ZF, "#c9a36a", XI + 0.02, XO - 0.02, y - 0.01, y + 0.04, 0.75, zb, { edge: 1 });
        bx(ZF, "#c9a36a", XI + 0.02, XO - 0.02, y - 0.01, y + 0.04, za, 0.0, { edge: 1 });
        bx(ZF, "#c9a36a", XI + 0.02, t[0], y - 0.01, y + 0.04, 0.0, 0.75);
        bx(ZF, "#c9a36a", t[1], XO - 0.02, y - 0.01, y + 0.04, 0.0, 0.75);
        bx(ZF, "#b8915a", t[0] + 0.01, t[1] - 0.01, y + 0.045, y + 0.07, 0.77, 1.5, { edge: 1 });   /* volet rabattu vers l'avant */
        [t[0] + 0.06, t[1] - 0.06].forEach(function (x) { cy(ZF, "#5c6875", x, y + 0.05, 0.76, 0.012, 0.06, { axe: "x", seg: 6 }); });
      } else {
        [[2.22, 2.53], [2.545, 2.855], [2.87, 3.18]].forEach(function (p) {
          bx(ZF, "#c3cad3", p[0], p[1], y - 0.01, y + 0.04, za, zb, { edge: 1 });
          for (let k = 1; k < 4; k++) { const x = p[0] + k * (p[1] - p[0]) / 4; bx(ZF, "#9aa5b1", x - 0.006, x + 0.006, y + 0.04, y + 0.043, za + 0.05, zb - 0.05); }
        });
      }
    });
  }
  /* garde-corps : deux lisses et une plinthe jaune, en façade (x = XO) et aux deux bouts */
  [2.2, 4.2].forEach(function (y) {
    const yl = y === 4.2 ? YH - 0.03 : y + 1.0;
    tube(ZF, GALVA, XO + 0.035, yl, ZS[0], XO + 0.035, yl, ZS[3], 0.024);
    tube(ZF, GALVA, XO + 0.035, y + 0.5, ZS[0], XO + 0.035, y + 0.5, ZS[3], 0.02);
    bx(ZF, JAUNE, XO - 0.03, XO - 0.005, y + 0.04, y + 0.19, ZS[0], ZS[3]);
    [ZS[0] - 0.035, ZS[3] + 0.035].forEach(function (z) {
      tube(ZF, GALVA, XI, yl, z, XO + 0.035, yl, z, 0.024);
      tube(ZF, GALVA, XI, y + 0.5, z, XO + 0.035, y + 0.5, z, 0.02);
    });
    bx(ZF, JAUNE, XI, XO, y + 0.04, y + 0.19, ZS[0] + 0.005, ZS[0] + 0.03);
    bx(ZF, JAUNE, XI, XO, y + 0.04, y + 0.19, ZS[3] - 0.03, ZS[3] - 0.005);
  });
  /* croix de contreventement en façade, travées 1 et 3 */
  [0, 2].forEach(function (i) {
    [[0.2, 2.2], [2.2, 4.2]].forEach(function (h) {
      tube(ZF, GALVA, XO + 0.06, h[0] + 0.05, ZS[i] + 0.05, XO + 0.06, h[1] - 0.05, ZS[i + 1] - 0.05, 0.016);
      tube(ZF, GALVA, XO + 0.06, h[0] + 0.05, ZS[i + 1] - 0.05, XO + 0.06, h[1] - 0.05, ZS[i] + 0.05, 0.016);
    });
  });
  /* amarrages au mur du commerce : tube, collier, piton */
  [[3.7, -4.5], [3.7, -0.36], [1.7, -2.43], [1.7, 1.71]].forEach(function (a) {
    tube(ZF, GALVA, XI, a[0], a[1], 2.0, a[0], a[1], 0.018);
    cy(ZF, "#c0392b", XI, a[0], a[1], 0.034, 0.05, { axe: "x", seg: 8 });
    cy(ZF, "#5c6875", 2.01, a[0], a[1], 0.03, 0.02, { axe: "x", seg: 8 });
  });
  /* échelles d'accès inclinées, d'un plancher à l'autre par les trappes */
  function echelle(x0, x1, y0) {
    [x0, x1].forEach(function (x) { tube(ZF, "#c3cad3", x, y0 + 0.04, 1.15, x, y0 + 2.08, -0.02, 0.018); });
    for (let k = 1; k <= 7; k++) {
      const y = y0 + 0.04 + k * 0.28, z = 1.15 - k * 0.28 * 0.575;
      tube(ZF, "#c3cad3", x0, y, z, x1, y, z, 0.012, { seg: 5 });
    }
  }
  echelle(2.3, 2.7, 0.2);
  echelle(2.7, 3.1, 2.2);
  /* une caisse à outils posée en haut, au bord du toit */
  bx(ZF, BLEU_BP, 2.55, 2.95, 4.245, 4.45, -3.9, -3.62, { edge: 1 });
  canal(ZF, "#2a313b", [[2.62, 4.45, -3.76], [2.62, 4.52, -3.76], [2.88, 4.52, -3.76], [2.88, 4.45, -3.76]], 0.01);

  /* =====================================================================
     8. L'ÉCHAFAUDAGE — l'ouvrier en harnais qui monte, sacoche à outils
     ===================================================================== */
  const WX = 2.5, TENUE = "#2f3b4d", HARN = "#e8914a", PEAU = "#f0d2b4", REFL = "#d9dde3";
  /* jambes : le pied gauche sur le premier barreau, le droit sur le deuxième */
  function membre(c, pts, r) {
    for (let i = 1; i < pts.length; i++) tube(ZF, c, pts[i - 1][0], pts[i - 1][1], pts[i - 1][2], pts[i][0], pts[i][1], pts[i][2], r, { seg: 8 });
    for (let i = 0; i < pts.length; i++) sp(ZF, c, pts[i][0], pts[i][1], pts[i][2], r, r, r, { seg: 8, seg2: 6 });
  }
  const jambes = [
    [[WX - 0.1, 1.38, 1.08], [WX - 0.1, 0.98, 0.95], [WX - 0.1, 0.62, 1.07]],
    [[WX + 0.1, 1.38, 1.08], [WX + 0.1, 1.28, 0.72], [WX + 0.1, 0.9, 0.92]]
  ];
  jambes.forEach(function (j) {
    membre(TENUE, j, 0.062);
    tube(ZF, REFL, j[1][0], j[1][1] + (j[2][1] - j[1][1]) * 0.55, j[1][2] + (j[2][2] - j[1][2]) * 0.55, j[1][0], j[1][1] + (j[2][1] - j[1][1]) * 0.7, j[1][2] + (j[2][2] - j[1][2]) * 0.7, 0.065, { seg: 8 });
    const a = j[0], b = j[1];
    tube(ZF, HARN, a[0], a[1] + (b[1] - a[1]) * 0.3, a[2] + (b[2] - a[2]) * 0.3, a[0], a[1] + (b[1] - a[1]) * 0.42, a[2] + (b[2] - a[2]) * 0.42, 0.072, { seg: 8 });   /* sangle de cuisse */
  });
  bx(ZF, "#1c2026", WX - 0.15, WX - 0.05, 0.53, 0.6, 0.92, 1.17);       /* chaussures de sécurité */
  bx(ZF, "#1c2026", WX + 0.05, WX + 0.15, 0.81, 0.88, 0.77, 1.01);
  bx(ZF, "#f2c94c", WX - 0.15, WX - 0.05, 0.525, 0.535, 0.92, 1.17);
  bx(ZF, "#f2c94c", WX + 0.05, WX + 0.15, 0.805, 0.815, 0.77, 1.01);
  /* bassin et buste, penchés de 15° vers l'échelle */
  const TA = -15, ca = Math.cos(TA / D), sa = Math.sin(TA / D);
  const BX = WX, BY = 1.62, BZ = 1.02;                                   /* centre du buste */
  bxr(ZF, TENUE, WX, 1.36, 1.09, 0.36, 0.16, 0.24, TA, 0, 0);
  bxr(ZF, TENUE, BX, BY, BZ, 0.38, 0.5, 0.24, TA, 0, 0);
  /* point du dos du buste : u en largeur, v le long du buste, d en avant du dos */
  function dos(u, v, d) { return [BX + u, BY + v * ca - (0.12 + d) * sa, BZ + v * sa + (0.12 + d) * ca]; }
  function sangle(c, a, b, ep) {
    const p = dos(a[0], a[1], 0.006), q = dos(b[0], b[1], 0.006);
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * D;
    bxr(ZF, c, (p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2, Math.hypot(b[0] - a[0], b[1] - a[1]) + ep, ep, 0.01, TA, 0, ang);
  }
  sangle(REFL, [-0.19, -0.04], [0.19, -0.04], 0.04);                      /* bande réfléchissante */
  sangle(HARN, [-0.12, 0.25], [0, 0.1], 0.045);                           /* bretelles en X */
  sangle(HARN, [0.12, 0.25], [0, 0.1], 0.045);
  sangle(HARN, [0, 0.1], [-0.11, -0.2], 0.045);
  sangle(HARN, [0, 0.1], [0.11, -0.2], 0.045);
  bxr(ZF, HARN, BX, BY - 0.2 * ca, BZ - 0.2 * sa, 0.4, 0.05, 0.26, TA, 0, 0);   /* ceinture */
  const anneau = dos(0, 0.1, 0.02);
  cy(ZF, "#c3cad3", anneau[0], anneau[1], anneau[2], 0.026, 0.012, { axe: "z", seg: 10 });   /* anneau dorsal */
  /* la longe double avec absorbeur, accrochée en haut de l'échelle */
  bx(ZF, "#2a313b", anneau[0] - 0.04, anneau[0] + 0.04, anneau[1] + 0.04, anneau[1] + 0.13, anneau[2] - 0.02, anneau[2] + 0.03);
  flexible(ZF, HARN, [anneau[0] - 0.02, anneau[1] + 0.13, anneau[2]], [2.31, 2.12, 0.04], 1.85, 0.01, 10);
  flexible(ZF, HARN, [anneau[0] + 0.02, anneau[1] + 0.13, anneau[2]], [2.69, 2.12, 0.04], 1.9, 0.01, 10);
  [2.31, 2.69].forEach(function (x) { bx(ZF, "#c3cad3", x - 0.012, x + 0.012, 2.08, 2.16, 0.02, 0.06); });
  /* bras : les mains sur les montants et un barreau de l'échelle */
  membre(TENUE, [[WX - 0.2, 1.82, 0.95], [WX - 0.22, 1.6, 0.66], [WX - 0.2, 1.74, 0.33]], 0.045);
  membre(TENUE, [[WX + 0.2, 1.82, 0.95], [WX + 0.21, 1.66, 0.62], [WX + 0.12, 1.93, 0.24]], 0.045);
  sp(ZF, "#3a3f47", WX - 0.2, 1.74, 0.31, 0.045, 0.045, 0.045, { seg: 8, seg2: 6 });   /* gants */
  sp(ZF, "#3a3f47", WX + 0.12, 1.93, 0.22, 0.045, 0.045, 0.045, { seg: 8, seg2: 6 });
  [[WX - 0.21, 1.73, 0.83], [WX + 0.205, 1.76, 0.82]].forEach(function (p) { sp(ZF, REFL, p[0], p[1], p[2], 0.05, 0.05, 0.05, { seg: 8, seg2: 6 }); });
  /* tête et casque à jugulaire */
  cyv(ZF, PEAU, WX, 1.86, 1.93, 0.92, 0.045, { seg: 8 });
  sp(ZF, PEAU, WX, 1.99, 0.9, 0.1, 0.11, 0.1, { seg: 12, seg2: 8 });
  sp(ZF, "#f7f5ef", WX, 2.03, 0.9, 0.118, 0.085, 0.13, { seg: 14, seg2: 7 });
  cy(ZF, "#f7f5ef", WX, 2.0, 0.89, 0.128, 0.012, { seg: 14 });
  bx(ZF, "#2a313b", WX - 0.105, WX + 0.105, 1.9, 1.99, 0.895, 0.905);
  /* la sacoche à outils sur la hanche droite */
  bx(ZF, "#6b4a2e", WX + 0.19, WX + 0.27, 1.12, 1.32, 0.98, 1.18, { edge: 1 });
  bx(ZF, "#5a3e26", WX + 0.27, WX + 0.275, 1.18, 1.3, 1.0, 1.16);
  cyv(ZF, ROUGE_HP, WX + 0.23, 1.32, 1.42, 1.03, 0.012, { seg: 6 });
  cyv(ZF, JAUNE, WX + 0.215, 1.32, 1.4, 1.11, 0.012, { seg: 6 });
  bx(ZF, "#8a94a1", WX + 0.24, WX + 0.255, 1.3, 1.45, 1.13, 1.16);
  H.proxy(ZF, 2.05, 3.35, 0, YH + 0.05, ZS[0] - 0.12, ZS[3] + 0.12);
  H.ancre(ZF, 2.75, 5.75, 1.2);

  /* =====================================================================
     9. LES CAMÉRAS DES TROIS ZONES
     ===================================================================== */
  return {
    camionnette: { zoom: 0.3, az: [-20, 30], el: 10, foyer: [-7.0, 1.25, 7.2] },
    etabli: { zoom: 0.18, az: [-20, 30], el: 12, foyer: [-2.7, 0.95, 4.05] },
    echafaudage: { zoom: 0.32, az: [10, 60], el: 12, foyer: [2.7, 2.6, -1.3] }
  };
}
