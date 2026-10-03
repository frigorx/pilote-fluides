/* =====================================================================
   m-arcade.js — LA SALLE D'ARCADE DE QUARTIER
   Zone : arcade. Cahier des charges : SPEC-3D.md et consigne de l'atelier.

   Un petit pavillon moderne de plain-pied, au bout de la rue à droite de
   la maison : façade anthracite, bandeau bleu nuit, grande vitrine sur la
   face avant (+z) ET sur le côté droit (+x), porte vitrée sur l'avant.
   Dehors : un liseré néon autour des vitrines, une manette de jeu en néon
   sur le bandeau et sur une enseigne en drapeau. Dedans, visibles à
   travers le verre : un sol sombre, des suspensions lumineuses, cinq
   bornes d'arcade et la grande borne du simulateur de panne (SimuRézo).

   Repère : 1 unité = 1 m, sol fini à y = 0. Emprise : x 17,95..20,75 et
   z −2,6..2,7 (seuls l'enseigne en drapeau et le parvis avancent vers la
   rue). Aucune lettre : tout est en boîtes, cylindres et tubes.
   ===================================================================== */

export function arcade(H) {
  const P = H.P, alea = H.alea;
  const bx = H.bx, bxr = H.bxr, cy = H.cy, cyv = H.cyv, tube = H.tube, sp = H.sp;
  const Z = "arcade";
  const LUM = { lum: 1 };

  /* ---------- repères ---------- */
  const X0 = 17.95, X1 = 20.75, ZB = -2.6, ZF = 2.7, E = 0.15;     /* emprise, épaisseur des murs */
  const YP = 0.07, YS = 0.075;                                      /* dessus du socle, dessus du sol intérieur */
  const YV0 = 0.35, YV1 = 2.85;                                     /* bas et haut des vitrines */
  const YC = 3.05, YT = 3.4, YA = 3.62;                             /* dessous du plafond, toit, haut de l'acrotère */
  const ZG0 = -1.8, ZG1 = ZF - E;                                   /* vitrine latérale : z −1,8..2,55 */

  const C = {
    mur: "#2a323f", murF: "#1c222c", cadre: "#12161d", sol: "#14181f", plaf: "#0e1218",
    toit: "#2f3640", coping: "#c9ced6", beton: "#b7bbc3", parvis: "#c9ccd2",
    verre: "#9cc2da", chrome: "#c3cad3",
    rose: "#be185d", roseC: "#ff8cc0", cyan: "#22d3ee", cyanC: "#c4f6ff"
  };

  /* ---------- un plan de façade : u vers la droite vu de dehors, v vers le haut,
     d vers l'extérieur. face "z" : façade avant (u = x) ; face "x" : côté droit (u = u0 − z) ---------- */
  function F(face, u0, y0, d0) {
    const X = face === "z"
      ? function (u, v, d) { return [u0 + u, y0 + v, d0 + d]; }
      : function (u, v, d) { return [d0 + d, y0 + v, u0 - u]; };
    return {
      pt: X,
      box: function (c, ua, ub, va, vb, da, db, o) {
        const a = X(ua, va, da), b = X(ub, vb, db);
        bx(Z, c, Math.min(a[0], b[0]), Math.max(a[0], b[0]), Math.min(a[1], b[1]), Math.max(a[1], b[1]),
          Math.min(a[2], b[2]), Math.max(a[2], b[2]), o);
      },
      tube: function (c, u1, v1, d1, u2, v2, d2, r, o) {
        const a = X(u1, v1, d1), b = X(u2, v2, d2);
        tube(Z, c, a[0], a[1], a[2], b[0], b[1], b[2], r, o);
      },
      disc: function (c, u, v, d, r, h, seg) {
        const a = X(u, v, d);
        cy(Z, c, a[0], a[1], a[2], r, h, { axe: face === "z" ? "z" : "x", seg: seg || 12, lum: 1 });
      }
    };
  }

  /* ligne de néon : un tube de couleur et un filet clair en avant ; les coudes sont arrondis */
  function neon(f, pts, d, c, cc, r, ferme) {
    const n = pts.length, segs = ferme ? n : n - 1;
    for (let i = 0; i < segs; i++) {
      const a = pts[i], b = pts[(i + 1) % n];
      f.tube(c, a[0], a[1], d, b[0], b[1], d, r, { lum: 1, seg: 6 });
      f.tube(cc, a[0], a[1], d + r * 0.6, b[0], b[1], d + r * 0.6, r * 0.42, { lum: 1, seg: 5 });
    }
    pts.forEach(function (p) {
      const q = f.pt(p[0], p[1], d);
      sp(Z, c, q[0], q[1], q[2], r * 1.05, r * 1.05, r * 1.05, { lum: 1, seg: 8, seg2: 5 });
    });
  }

  /* la manette de jeu : contour framboise, croix directionnelle et boutons cyan (aucune lettre) */
  const MANETTE = [[-0.30, 0.17], [0.30, 0.17], [0.41, 0.12], [0.47, -0.04], [0.46, -0.17], [0.38, -0.20], [0.30, -0.14],
    [0.20, -0.07], [-0.20, -0.07], [-0.30, -0.14], [-0.38, -0.20], [-0.46, -0.17], [-0.47, -0.04], [-0.41, 0.12]];
  function manette(f, uc, vc, d, s) {
    neon(f, MANETTE.map(function (p) { return [uc + p[0] * s, vc + p[1] * s]; }), d, C.rose, C.roseC, 0.017 * s, true);
    const U = function (a) { return uc + a * s; }, V = function (b) { return vc + b * s; };
    f.box(C.cyan, U(-0.305), U(-0.175), V(0.015), V(0.055), d - 0.012, d + 0.012, LUM);
    f.box(C.cyan, U(-0.26), U(-0.22), V(-0.03), V(0.10), d - 0.012, d + 0.012, LUM);
    f.disc(C.cyan, U(0.20), V(0.02), d, 0.038 * s, 0.024);
    f.disc(C.roseC, U(0.31), V(0.075), d, 0.038 * s, 0.024);
    f.box(C.cyanC, U(-0.075), U(-0.015), V(0.012), V(0.028), d - 0.008, d + 0.008, LUM);
    f.box(C.cyanC, U(0.015), U(0.075), V(0.012), V(0.028), d - 0.008, d + 0.008, LUM);
  }

  /* =====================================================================
     1. LE SOCLE, LE SOL SOMBRE ET LE PARVIS
     ===================================================================== */
  bx(Z, C.beton, X0 - 0.04, X1 + 0.04, 0, YP, ZB - 0.04, ZF + 0.04, { edge: 1 });
  bx(Z, C.sol, X0 + E, X1 - E, YP, YS, ZB + E, ZF - E);
  /* parvis devant la porte, entre le pavillon et le trottoir */
  bx(Z, C.parvis, X0 - 0.04, X1 + 0.04, 0, 0.1, ZF + 0.04, 3.0, { edge: 1 });
  bx(Z, "#232830", 19.64, 20.5, 0.1, 0.115, ZF + 0.08, 2.98);                 /* tapis d'entrée */
  /* le sol du salon : une poussière d'étoiles lumineuses (moquette d'arcade) */
  const ETOILES = [C.rose, C.cyan, "#facc15", "#a78bfa"];
  for (let k = 0; k < 44; k++) {
    const x = X0 + E + 0.08 + alea() * (X1 - X0 - 2 * E - 0.16), z = ZB + E + 0.08 + alea() * (ZF - ZB - 2 * E - 0.16);
    bx(Z, ETOILES[k % 4], x - 0.02, x + 0.02, YS, YS + 0.004, z - 0.02, z + 0.02, LUM);
  }
  /* liserés au sol, le long des vitrines */
  bx(Z, C.cyan, X0 + E + 0.04, X1 - E - 0.04, YS, YS + 0.012, ZF - E - 0.12, ZF - E - 0.09, LUM);
  bx(Z, C.rose, X1 - E - 0.12, X1 - E - 0.09, YS, YS + 0.012, ZG0 + 0.1, ZG1 - 0.1, LUM);

  /* =====================================================================
     2. LES MURS : gauche et fond pleins, avant et droit vitrés
     ===================================================================== */
  bx(Z, C.mur, X0, X0 + E, YP, YT, ZB, ZF, { edge: 1 });                          /* mur gauche */
  bx(Z, C.mur, X0, X1, YP, YT, ZB, ZB + E, { edge: 1 });                          /* mur du fond */
  bx(Z, "#232b45", X0 + E, X1 - E, YS, YC, ZB + E, ZB + E + 0.01);                /* fond intérieur sombre */
  bx(Z, "#2a3350", X0 + E, X0 + E + 0.01, YS, YC, ZB + E, ZF - E);                /* côté gauche intérieur */
  bx(Z, C.plaf, X0 + E, X1 - E, YC - 0.02, YC, ZB + E, ZF - E);                   /* plafond */

  /* --- face avant (+z) : soubassement, vitrine, porte, imposte --- */
  bx(Z, C.murF, X0 + E, X1 - E, YP, YV0, ZF - E, ZF, { edge: 1 });
  bx(Z, C.mur, X0 + E, X1 - E, YV1, YT, ZF - E, ZF);
  bx(Z, C.mur, X1 - E, X1, YP, YV1, ZF - E, ZF);                                  /* pilier d'angle */
  bx(Z, C.verre, X0 + E, 19.56, YV0, YV1, ZF - 0.09, ZF - 0.05, { t: 0.22 });     /* grande vitre à gauche de la porte */
  bx(Z, C.cadre, 19.56, 19.64, YV0, YV1, ZF - E, ZF);                             /* montant entre vitre et porte */
  bx(Z, C.cadre, X0 + E, 19.56, YV1 - 0.03, YV1, ZF - E, ZF);                     /* traverse haute */
  /* la porte vitrée (vantail 19,64..20,5) et son imposte */
  bx(Z, C.cadre, 19.64, 19.7, YP, 2.3, ZF - 0.12, ZF - 0.03);
  bx(Z, C.cadre, 20.44, 20.6, YP, 2.3, ZF - 0.12, ZF - 0.03);
  bx(Z, C.cadre, 19.64, 20.6, YP, 0.2, ZF - 0.12, ZF - 0.03);
  bx(Z, C.cadre, 19.64, 20.6, 2.2, 2.3, ZF - 0.12, ZF - 0.03);
  bx(Z, C.verre, 19.7, 20.44, 0.2, 2.2, ZF - 0.095, ZF - 0.06, { t: 0.2 });
  bx(Z, C.verre, 19.64, 20.6, 2.3, YV1, ZF - 0.09, ZF - 0.05, { t: 0.22 });       /* imposte */
  cyv(Z, C.chrome, 20.36, 0.9, 1.5, ZF + 0.03, 0.012, { seg: 8 });                /* poignée verticale */
  [0.95, 1.45].forEach(function (y) { cy(Z, C.chrome, 20.36, y, ZF - 0.005, 0.008, 0.07, { axe: "z", seg: 6 }); });
  bx(Z, "#3a4250", 19.99, 20.02, 0.2, 2.2, ZF - 0.1, ZF - 0.05);                  /* joint central (porte à un vantail visible) */

  /* --- côté droit (+x) : soubassement, quatre vitres, panneau plein à l'arrière --- */
  bx(Z, C.murF, X1 - E, X1, YP, YV0, ZB, ZF, { edge: 1 });
  bx(Z, C.mur, X1 - E, X1, YV1, YT, ZB, ZF);
  bx(Z, C.mur, X1 - E, X1, YV0, YV1, ZB, ZG0);
  const NP = 4, MU = 0.06, PW = (ZG1 - ZG0 - (NP - 1) * MU) / NP;
  for (let i = 0; i < NP; i++) {
    const za = ZG0 + i * (PW + MU), zb = za + PW;
    bx(Z, C.verre, X1 - 0.09, X1 - 0.05, YV0, YV1, za, zb, { t: 0.22 });
    if (i < NP - 1) bx(Z, C.cadre, X1 - E, X1, YV0, YV1, zb, zb + MU);
  }
  bx(Z, C.cadre, X1 - E, X1, YV1 - 0.03, YV1, ZG0, ZG1);

  /* =====================================================================
     3. LE TOIT PLAT, L'ACROTÈRE ET LE BANDEAU BLEU NUIT
     ===================================================================== */
  bx(Z, C.toit, X0, X1, YT - 0.03, YT, ZB, ZF);                                    /* membrane d'étanchéité */
  bx(Z, C.mur, X0, X0 + 0.1, YT, YA, ZB, ZF, { edge: 1 });                         /* acrotère gauche */
  bx(Z, C.mur, X0, X1, YT, YA, ZB, ZB + 0.1, { edge: 1 });                         /* acrotère du fond */
  bx(Z, P.bleu, X0, X1 + 0.06, YV1, YA, ZF, ZF + 0.06, { edge: 1 });               /* bandeau avant */
  bx(Z, P.bleu, X1, X1 + 0.06, YV1, YA, ZB, ZF, { edge: 1 });                      /* bandeau côté droit */
  bx(Z, C.mur, X0, X1, YT, YA, ZF - 0.06, ZF);                                      /* doublage de l'acrotère avant et droit */
  bx(Z, C.mur, X1 - 0.06, X1, YT, YA, ZB, ZF);
  /* couvertine : un cadre clair sur le dessus de l'acrotère (le toit reste visible au milieu) */
  bx(Z, C.coping, X0 - 0.015, X1 + 0.075, YA, YA + 0.025, ZF - 0.06, ZF + 0.075, { edge: 1 });
  bx(Z, C.coping, X1 - 0.06, X1 + 0.075, YA, YA + 0.025, ZB - 0.015, ZF + 0.075, { edge: 1 });
  bx(Z, C.coping, X0 - 0.015, X0 + 0.1, YA, YA + 0.025, ZB - 0.015, ZF + 0.075, { edge: 1 });
  bx(Z, C.coping, X0 - 0.015, X1 + 0.075, YA, YA + 0.025, ZB - 0.015, ZB + 0.1, { edge: 1 });
  /* le petit groupe de climatisation du pavillon, sur le toit */
  bx(Z, "#e6e9ec", 18.75, 19.65, YT, YT + 0.46, -1.6, -1.0, { edge: 1 });
  cy(Z, "#262c33", 19.2, YT + 0.465, -1.3, 0.2, 0.012, { seg: 14 });
  for (let k = 0; k < 2; k++) bxr(Z, "#4a535e", 19.2, YT + 0.475, -1.3, 0.4, 0.01, 0.012, 0, k * 90, 0);
  cy(Z, "#4a535e", 19.2, YT + 0.48, -1.3, 0.04, 0.02, { seg: 8 });
  bx(Z, "#c3cad3", 19.7, 19.76, YT, YT + 0.2, -1.5, -1.45);
  bx(Z, "#d9dde3", 19.95, 20.55, YT, YT + 0.14, 0.3, 0.95, { edge: 1 });                /* lanterneau */
  bx(Z, C.verre, 20.0, 20.5, YT + 0.14, YT + 0.17, 0.35, 0.9, { t: 0.45 });
  [[18.35, -2.0], [18.5, -1.7]].forEach(function (a) { cyv(Z, "#9aa3ad", a[0], YT, YT + 0.34, a[1], 0.035, { seg: 8 }); cy(Z, "#c3cad3", a[0], YT + 0.36, a[1], 0.055, 0.03, { seg: 8 }); });
  bx(Z, "#9aa3ad", 19.65, 19.9, YT, YT + 0.04, -1.55, -1.4);

  /* =====================================================================
     4. LES NÉONS DE FAÇADE
     ===================================================================== */
  /* liseré autour de la vitrine avant : framboise dehors, cyan juste devant la vitre */
  const fa = F("z", 0, 0, ZF);
  neon(fa, [[X0 + E - 0.02, YV0 - 0.03], [X1 - E + 0.02, YV0 - 0.03], [X1 - E + 0.02, YV1 + 0.03], [X0 + E - 0.02, YV1 + 0.03]],
    0.02, C.rose, C.roseC, 0.017, true);
  neon(fa, [[X0 + E + 0.08, YV0 + 0.08], [X1 - E - 0.08, YV0 + 0.08], [X1 - E - 0.08, YV1 - 0.08], [X0 + E + 0.08, YV1 - 0.08]],
    -0.03, C.cyan, C.cyanC, 0.011, true);
  /* liseré autour de la vitrine latérale (u = 2,7 − z) */
  const fd = F("x", ZF, 0, X1);
  const U0 = ZF - ZG1, U1 = ZF - ZG0;
  neon(fd, [[U0 - 0.02, YV0 - 0.03], [U1 + 0.02, YV0 - 0.03], [U1 + 0.02, YV1 + 0.03], [U0 - 0.02, YV1 + 0.03]],
    0.02, C.rose, C.roseC, 0.017, true);
  neon(fd, [[U0 + 0.08, YV0 + 0.08], [U1 - 0.08, YV0 + 0.08], [U1 - 0.08, YV1 - 0.08], [U0 + 0.08, YV1 - 0.08]],
    -0.03, C.cyan, C.cyanC, 0.011, true);
  /* la manette sur le bandeau avant, et sur le bandeau du côté */
  const fb = F("z", 0, 0, ZF + 0.06), fbd = F("x", ZF, 0, X1 + 0.06);
  manette(fb, 19.35, 3.25, 0.02, 1.0);
  manette(fbd, ZF - 0.35, 3.25, 0.02, 1.0);
  /* filet cyan sous le chapeau du bandeau */
  fb.box(C.cyan, X0 + 0.1, X1 - 0.1, 3.52, 3.535, 0.004, 0.016, LUM);
  fbd.box(C.cyan, 0.1, ZF - ZB - 0.1, 3.52, 3.535, 0.004, 0.016, LUM);

  /* l'enseigne en drapeau : perpendiculaire à la façade, au coin gauche, au-dessus du trottoir
     (vue de la droite, elle se détache du pavillon et ne cache pas la vitrine) */
  const SZ0 = 2.82, SZ1 = 4.07, SY0 = 1.9, SY1 = 3.0, SX0 = 17.99, SX1 = 18.07;
  bx(Z, "#141923", SX0, SX1, SY0, SY1, SZ0, SZ1, { edge: 1 });
  [2.0, 2.8].forEach(function (y) { bx(Z, C.chrome, 18.01, 18.05, y, y + 0.035, ZF + 0.06, SZ0, { edge: 1 }); });
  const fs = F("x", SZ1, 0, SX1);
  neon(fs, [[0.05, SY0 + 0.05], [SZ1 - SZ0 - 0.05, SY0 + 0.05], [SZ1 - SZ0 - 0.05, SY1 - 0.05], [0.05, SY1 - 0.05]],
    0.015, C.cyan, C.cyanC, 0.012, true);
  manette(fs, (SZ1 - SZ0) / 2, 2.46, 0.02, 1.12);

  /* deux bacs de plantes encadrent la devanture */
  [[18.4, 2.88], [20.55, 2.95]].forEach(function (a) {
    cyv(Z, "#2a313b", a[0], 0.1, 0.42, a[1], 0.15, { rt: 0.13, seg: 12 });
    cyv(Z, "#3b4452", a[0], 0.42, 0.45, a[1], 0.16, { seg: 12 });
    sp(Z, P.feuilleF, a[0], 0.62, a[1], 0.17, 0.2, 0.17, { seg: 9, seg2: 6 });
    sp(Z, "#7fa673", a[0] + 0.06, 0.78, a[1] - 0.03, 0.11, 0.14, 0.11, { seg: 8, seg2: 5 });
  });

  /* =====================================================================
     5. L'ÉCLAIRAGE D'AMBIANCE : trois suspensions lumineuses
     ===================================================================== */
  [[1.15, C.cyan], [-0.55, C.rose], [-2.0, C.cyan]].forEach(function (s) {
    bx(Z, s[1], 18.25, 20.5, 2.58, 2.62, s[0] - 0.02, s[0] + 0.02, LUM);
    [18.5, 20.25].forEach(function (x) { cyv(Z, "#2b3340", x, 2.62, YC, s[0], 0.004, { seg: 4 }); });
  });

  /* sur le mur de gauche : deux filets lumineux et un envahisseur en pixels (pas une lettre) */
  const XM = X0 + E + 0.012;
  bx(Z, C.rose, XM, XM + 0.012, 2.6, 2.64, ZB + E + 0.1, ZF - E - 0.1, LUM);
  bx(Z, C.cyan, XM, XM + 0.012, 2.5, 2.53, ZB + E + 0.1, ZF - E - 0.1, LUM);
  const INV = ["00100000100", "00010001000", "00111111100", "01101110110", "11111111111", "10111111101", "10100000101", "00011011000"];
  INV.forEach(function (ligne, j) {
    for (let i = 0; i < 11; i++) {
      if (ligne.charAt(i) !== "1") continue;
      const z = -0.05 + (i - 5) * 0.06, y = 2.3 - j * 0.06;
      bx(Z, C.cyanC, XM, XM + 0.012, y, y + 0.056, z - 0.028, z + 0.028, LUM);
    }
  });

  /* =====================================================================
     6. LES BORNES D'ARCADE
        Repère local d'une borne : u de gauche à droite, v vers le joueur
        (devant), y absolu. yaw : rotation autour de la verticale (degrés).
     ===================================================================== */
  function borne(cx, cz, yaw, o) {
    const w = o.w, dd = o.d / 2, hw = w / 2, yD = o.yD, yM = o.yM, yT = o.yT;
    const th = yaw * Math.PI / 180, cs = Math.cos(th), sn = Math.sin(th);
    const wx = function (u, v) { return cx + u * cs + v * sn; };
    const wz = function (u, v) { return cz - u * sn + v * cs; };
    const B = function (c, u0, u1, y0, y1, v0, v1, op) {
      if (!yaw) { bx(Z, c, cx + u0, cx + u1, y0, y1, cz + v0, cz + v1, op); return; }
      const um = (u0 + u1) / 2, vm = (v0 + v1) / 2;
      bxr(Z, c, wx(um, vm), (y0 + y1) / 2, wz(um, vm), u1 - u0, y1 - y0, v1 - v0, 0, yaw, 0, op);
    };
    const CY = function (c, u, y, v, r, h, seg) { cy(Z, c, wx(u, v), y, wz(u, v), r, h, { seg: seg || 10 }); };
    const SP = function (c, u, y, v, r) { sp(Z, c, wx(u, v), y, wz(u, v), r, r, r, { seg: 8, seg2: 6 }); };
    const f = YS;
    const vDeck = dd - 0.5, vSide = dd - 0.36, vMar = dd - 0.2, vScr = dd - 0.505;
    const yDt = yD + 0.07;

    /* caisson, flancs et baguettes lumineuses (t-molding) */
    B(o.corps, -(hw - 0.02), hw - 0.02, f, yD, -dd, dd - 0.04);
    [-1, 1].forEach(function (s) {
      const u0 = s < 0 ? -hw : hw - 0.02, u1 = u0 + 0.02;
      B(o.flanc, u0, u1, f, yD, -dd, dd);
      B(o.flanc, u0, u1, yD, yM, -dd, vSide);
      B(o.flanc, u0, u1, yM, yT, -dd, vMar);
      const m0 = s < 0 ? -hw - 0.004 : hw - 0.004, m1 = m0 + 0.008;
      B(o.accent, m0, m1, f + 0.02, yD, dd - 0.014, dd, LUM);
      B(o.accent, m0, m1, yD + 0.07, yM, vSide - 0.014, vSide, LUM);
      B(o.accent, m0, m1, yM, yT, vMar - 0.014, vMar, LUM);
    });
    /* plinthe sombre, bandeau lumineux, porte des pièces */
    B("#0b0d12", -(hw - 0.02), hw - 0.02, f, f + 0.07, -dd, dd - 0.02);
    B(o.accent, -(hw - 0.05), hw - 0.05, f + 0.1, f + 0.13, dd - 0.046, dd - 0.04, LUM);
    B("#59626f", -0.16, 0.16, 0.3, 0.6, dd - 0.046, dd - 0.036);
    [-0.065, 0.065].forEach(function (u) {
      B("#14171c", u - 0.032, u + 0.032, 0.42, 0.53, dd - 0.036, dd - 0.03);
      B("#fde047", u - 0.004, u + 0.004, 0.44, 0.51, dd - 0.03, dd - 0.026, LUM);
      B("#ef4444", u - 0.015, u + 0.015, 0.34, 0.37, dd - 0.036, dd - 0.031);
    });
    /* pupitre, avec sa lèvre lumineuse */
    B("#1a1d24", -hw, hw, yD, yDt, vDeck, dd);
    B(o.accent, -hw, hw, yD + 0.02, yD + 0.05, dd, dd + 0.006, LUM);
    /* commandes : le plus souvent un manche et des boutons ronds de couleur */
    if (o.commandes) o.commandes({ B: B, CY: CY, SP: SP, hw: hw, dd: dd, y: yDt });
    else {
      CY("#0b0c10", -hw * 0.45, yDt + 0.006, dd - 0.19, 0.034, 0.012, 12);
      cy(Z, "#9aa3ad", wx(-hw * 0.45, dd - 0.19), yDt + 0.05, wz(-hw * 0.45, dd - 0.19), 0.007, 0.08, { seg: 6 });
      SP(o.ball, -hw * 0.45, yDt + 0.1, dd - 0.19, 0.026);
      const BT = [["#ef4444", 0.0, 0.17], ["#facc15", 0.09, 0.155], ["#22c55e", 0.18, 0.14], ["#3b82f6", 0.04, 0.26], ["#f8fafc", 0.13, 0.245]];
      BT.forEach(function (b) { CY(b[0], b[1] * (w / 0.7), yDt + 0.007, dd - b[2], 0.021, 0.014, 10); });
    }
    /* le haut du caisson derrière l'écran */
    B(o.corps, -(hw - 0.02), hw - 0.02, yDt, yM, -dd, vDeck - 0.03);
    /* écran : glace noire, puis l'image allumée */
    B("#0b0c10", -(hw - 0.03), hw - 0.03, yDt + 0.02, yM - 0.02, vScr - 0.012, vScr);
    const sy0 = yDt + 0.045, sy1 = yM - 0.045, sw = w - 0.13;
    B(o.fond, -sw / 2, sw / 2, sy0, sy1, vScr, vScr + 0.003, LUM);
    let k = 0;
    const S = {
      w: sw, h: sy1 - sy0,
      r: function (c, a0, a1, b0, b1) { k++; B(c, a0, a1, sy0 + b0, sy0 + b1, vScr + 0.003 * k, vScr + 0.003 * k + 0.003, LUM); },
      plan: function () { k++; return vScr + 0.003 * k + 0.0015; },
      sy0: sy0, B: B
    };
    o.ecran(S);
    /* le fronton lumineux */
    B(o.corps, -hw, hw, yM, yT, -dd, vMar);
    B(o.corps, -hw - 0.005, hw + 0.005, yT, yT + 0.015, -dd - 0.005, vMar + 0.005);
    B(o.mar, -(hw - 0.035), hw - 0.035, yM + 0.03, yT - 0.03, vMar, vMar + 0.005, LUM);
    o.fronton(S, { B: B, hw: hw, vMar: vMar, yM: yM, yT: yT });
  }

  /* ---- les images d'écran ---- */
  function ecranTir(S) {                        /* envahisseurs en pixels */
    [[0.47, "#a3e635"], [0.37, "#f472b6"], [0.27, "#22d3ee"]].forEach(function (r) {
      [-0.2, -0.07, 0.06, 0.19].forEach(function (a) {
        S.r(r[1], a - 0.003, a + 0.075, r[0], r[0] + 0.05);
        S.r("#0a1030", a + 0.012, a + 0.022, r[0] + 0.012, r[0] + 0.03);
        S.r("#0a1030", a + 0.045, a + 0.055, r[0] + 0.012, r[0] + 0.03);
      });
    });
    S.r("#22d3ee", -0.05, 0.05, 0.05, 0.085);
    S.r("#22d3ee", -0.015, 0.015, 0.085, 0.12);
    S.r("#fde047", 0.1, 0.112, 0.15, 0.2);
    [[-0.22, 0.58], [0.14, 0.6], [0.24, 0.54], [-0.1, 0.1], [0.2, 0.12]].forEach(function (p) { S.r("#f8fafc", p[0], p[0] + 0.01, p[1], p[1] + 0.01); });
  }
  function ecranCourse(S) {                     /* route en perspective */
    S.r("#38bdf8", -S.w / 2, S.w / 2, 0.34, S.h);
    S.r("#fb923c", 0.07, 0.19, 0.4, 0.52);
    S.r("#16a34a", -S.w / 2, S.w / 2, 0.22, 0.34);
    [[0.0, 0.5, 0.08], [0.08, 0.4, 0.16], [0.16, 0.3, 0.24], [0.24, 0.2, 0.32], [0.32, 0.1, 0.4]].forEach(function (t) {
      S.r("#4b5563", -t[1] / 2 - 0.05, t[1] / 2 + 0.05, t[0] * 0.55, t[2] * 0.55 + 0.01);
    });
    S.r("#facc15", -0.012, 0.012, 0.0, 0.05);
    S.r("#facc15", -0.01, 0.01, 0.08, 0.12);
    S.r("#ef4444", -0.06, 0.06, 0.04, 0.09);
    S.r("#fecaca", -0.035, 0.035, 0.09, 0.115);
  }
  function ecranCombat(S) {                     /* deux combattants et leurs barres de vie */
    S.r("#f97316", -S.w / 2, S.w / 2, 0.3, S.h);
    S.r("#7c2d12", -S.w / 2, S.w / 2, 0.0, 0.3);
    S.r("#fde68a", -0.05, 0.05, 0.42, 0.52);
    S.r("#22c55e", -0.25, -0.02, S.h - 0.07, S.h - 0.04);
    S.r("#eab308", 0.02, 0.18, S.h - 0.07, S.h - 0.04);
    S.r("#3b82f6", -0.2, -0.12, 0.1, 0.3);
    S.r("#fcd34d", -0.185, -0.135, 0.3, 0.36);
    S.r("#3b82f6", -0.12, -0.04, 0.2, 0.24);
    S.r("#ef4444", 0.09, 0.17, 0.1, 0.3);
    S.r("#fcd34d", 0.105, 0.155, 0.3, 0.36);
    S.r("#ef4444", 0.01, 0.09, 0.17, 0.21);
  }
  function ecranPuzzle(S) {                     /* blocs qui tombent */
    S.r("#2e1065", -0.18, 0.18, 0.0, S.h - 0.02);
    [["#22d3ee", -0.18, 0.0, 4], ["#facc15", -0.03, 0.0, 2], ["#f472b6", 0.045, 0.0, 3], ["#a3e635", -0.18, 0.075, 2],
      ["#fb923c", 0.0, 0.075, 3], ["#818cf8", -0.105, 0.15, 3]].forEach(function (b) {
      S.r(b[0], b[1] + 0.003, b[1] + b[3] * 0.075 - 0.003, b[2] + 0.003, b[2] + 0.072);
    });
    S.r("#f8fafc", -0.075, 0.075, 0.5, 0.57);
    S.r("#f8fafc", -0.0375, 0.0375, 0.57, 0.64);
  }
  function ecranLabyrinthe(S) {                 /* labyrinthe, gloutons et fantôme */
    S.r("#2563eb", -0.24, 0.24, 0.0, 0.015);
    S.r("#2563eb", -0.24, 0.24, S.h - 0.015, S.h);
    S.r("#2563eb", -0.24, -0.225, 0.0, S.h);
    S.r("#2563eb", 0.225, 0.24, 0.0, S.h);
    S.r("#2563eb", -0.14, 0.1, 0.45, 0.465);
    S.r("#2563eb", -0.1, 0.14, 0.18, 0.195);
    S.r("#2563eb", -0.14, -0.125, 0.18, 0.32);
    S.r("#2563eb", 0.125, 0.14, 0.32, 0.45);
    for (let i = 0; i < 6; i++) S.r("#fde68a", -0.19 + i * 0.07, -0.175 + i * 0.07, 0.08, 0.095);
    S.r("#facc15", -0.17, -0.1, 0.33, 0.4);
    S.r("#ef4444", 0.06, 0.12, 0.26, 0.33);
    S.r("#f8fafc", 0.07, 0.085, 0.29, 0.305);
  }

  /* ---- les frontons : des motifs simples, jamais de lettres ---- */
  function frontonBandes(S, g) {
    g.B("#fde047", -g.hw + 0.07, g.hw - 0.07, g.yM + 0.085, g.yM + 0.1, g.vMar + 0.005, g.vMar + 0.01, LUM);
    g.B("#0b0d12", -0.14, 0.14, g.yM + 0.045, g.yT - 0.045, g.vMar + 0.005, g.vMar + 0.01, LUM);
    [-0.07, 0, 0.07].forEach(function (a, i) { g.B(["#22d3ee", "#facc15", "#f472b6"][i], a - 0.022, a + 0.022, g.yM + 0.11, g.yT - 0.07, g.vMar + 0.01, g.vMar + 0.015, LUM); });
  }
  function frontonDamier(S, g) {
    for (let i = 0; i < 6; i++) g.B(i % 2 ? "#0b0d12" : "#f8fafc", -g.hw + 0.05 + i * 0.1, -g.hw + 0.15 + i * 0.1, g.yT - 0.08, g.yT - 0.045, g.vMar + 0.005, g.vMar + 0.01, LUM);
    g.B("#0b0d12", -0.2, 0.2, g.yM + 0.05, g.yM + 0.15, g.vMar + 0.005, g.vMar + 0.01, LUM);
    g.B("#fde047", -0.12, 0.12, g.yM + 0.075, g.yM + 0.125, g.vMar + 0.01, g.vMar + 0.015, LUM);
  }

  /* ---- les cinq bornes ordinaires ---- */
  const SMALL = { w: 0.7, d: 0.8, yD: 0.8, yM: 1.62, yT: 1.9 };
  function petite(cx, cz, yaw, s) {
    borne(cx, cz, yaw, Object.assign({}, SMALL, s));
  }
  petite(19.2, 0.1, 8, { corps: "#1b2547", flanc: "#27408a", accent: "#22d3ee", mar: "#f43f5e", fond: "#0a1030", ball: "#ef4444", ecran: ecranTir, fronton: frontonBandes });
  petite(20.15, -0.15, 14, { corps: "#35123a", flanc: "#5b1a6b", accent: "#f472b6", mar: "#facc15", fond: "#0e5aa8", ball: "#22c55e", ecran: ecranCourse, fronton: frontonDamier });
  petite(18.55, -1.95, 0, { corps: "#3a1d10", flanc: "#7c3410", accent: "#fb923c", mar: "#a78bfa", fond: "#7c2d12", ball: "#3b82f6", ecran: ecranCombat, fronton: frontonBandes });
  petite(19.4, -1.95, 0, { corps: "#2b1c4d", flanc: "#4c1d95", accent: "#a3e635", mar: "#fb7185", fond: "#2e1065", ball: "#facc15", ecran: ecranPuzzle, fronton: frontonDamier });
  petite(20.25, -1.95, 0, { corps: "#10302b", flanc: "#0f5a4c", accent: "#34d399", mar: "#38bdf8", fond: "#000814", ball: "#ef4444", ecran: ecranLabyrinthe, fronton: frontonBandes });

  /* ---- la grande borne : le simulateur de panne (SimuRézo) ---- */
  function ecranSimu(S) {
    const m = S.plan;
    S.r("#0e4a63", -S.w / 2 + 0.02, S.w / 2 - 0.02, S.h - 0.06, S.h - 0.03);
    [["#ef4444", -0.5], ["#22c55e", -0.45], ["#facc15", -0.4]].forEach(function (l) { S.r(l[0], l[1], l[1] + 0.03, S.h - 0.055, S.h - 0.035); });
    /* la boucle du circuit, en cyan */
    const a0 = -0.54, a1 = -0.04, b0 = 0.16, b1 = 0.58, e = 0.024;
    S.r("#22d3ee", a0, a1, b0, b0 + e);
    S.r("#22d3ee", a0, a1, b1 - e, b1);
    S.r("#22d3ee", a0, a0 + e, b0, b1);
    S.r("#22d3ee", a1 - e, a1, b0, b1);
    /* composants : compresseur (bas), évaporateur (haut), condenseur (droite), détendeur (gauche) */
    S.r("#e0fbff", -0.34, -0.24, b0 - 0.03, b0 + 0.055);
    S.r("#e0fbff", -0.40, -0.18, b1 - 0.045, b1 + 0.02);
    S.r("#e0fbff", a1 - 0.04, a1 + 0.015, 0.28, 0.46);
    S.r("#e0fbff", a0 - 0.015, a0 + 0.04, 0.32, 0.4);
    /* deux petits cadrans : manomètre BP (bleu) et HP (rouge) */
    const pl = m();
    [[0.17, "#3b82f6"], [0.43, "#ef4444"]].forEach(function (c) {
      cy(Z, "#e5e7eb", cxBig + c[0], S.sy0 + 0.37, czBig + pl, 0.108, 0.004, { axe: "z", seg: 20, lum: 1 });
      cy(Z, c[1], cxBig + c[0], S.sy0 + 0.37, czBig + pl + 0.004, 0.09, 0.004, { axe: "z", seg: 20, lum: 1 });
      for (let t = 0; t < 7; t++) {
        const ang = (-60 + t * 20) * Math.PI / 180;
        bxr(Z, "#f8fafc", cxBig + c[0] + 0.072 * Math.sin(ang), S.sy0 + 0.37 + 0.072 * Math.cos(ang), czBig + pl + 0.009, 0.008, 0.018, 0.003, 0, 0, -(-60 + t * 20), LUM);
      }
      const aig = c[1] === "#ef4444" ? 38 : -22;
      bxr(Z, "#ffffff", cxBig + c[0] + 0.03 * Math.sin(aig * Math.PI / 180), S.sy0 + 0.37 + 0.03 * Math.cos(aig * Math.PI / 180), czBig + pl + 0.012, 0.012, 0.075, 0.004, 0, 0, -aig, LUM);
      cy(Z, "#f8fafc", cxBig + c[0], S.sy0 + 0.37, czBig + pl + 0.014, 0.012, 0.006, { axe: "z", seg: 8, lum: 1 });
    });
    /* le relevé : un petit histogramme sous la boucle */
    [0.04, 0.07, 0.05, 0.1, 0.08, 0.12, 0.09, 0.06].forEach(function (h, i) { S.r("#22d3ee", -0.54 + i * 0.075, -0.49 + i * 0.075, 0.02, 0.02 + h); });
    S.r("#0e4a63", 0.12, 0.54, 0.05, 0.065);
    S.r("#0e4a63", 0.12, 0.54, 0.09, 0.105);
  }
  function commandesSimu(g) {
    const y = g.y;
    [[-0.44, "#2563eb"], [-0.26, "#dc2626"]].forEach(function (v) {         /* deux volants de vanne */
      g.CY(v[1], v[0], y + 0.008, g.dd - 0.2, 0.065, 0.016, 14);
      g.B("#f1f5f9", v[0] - 0.055, v[0] + 0.055, y + 0.016, y + 0.024, g.dd - 0.205, g.dd - 0.195);
      g.B("#f1f5f9", v[0] - 0.005, v[0] + 0.005, y + 0.016, y + 0.024, g.dd - 0.255, g.dd - 0.145);
      g.CY("#1a1d24", v[0], y + 0.03, g.dd - 0.2, 0.014, 0.02, 8);
    });
    g.CY("#0b0c10", 0.02, y + 0.006, g.dd - 0.22, 0.036, 0.012, 12);        /* un manche */
    g.CY("#9aa3ad", 0.02, y + 0.05, g.dd - 0.22, 0.008, 0.08, 6);
    g.SP("#ef4444", 0.02, y + 0.105, g.dd - 0.22, 0.027);
    const BT = ["#ef4444", "#facc15", "#22c55e", "#3b82f6", "#f8fafc", "#a78bfa"];
    BT.forEach(function (c, i) { g.CY(c, 0.18 + (i % 3) * 0.1, y + 0.007, g.dd - 0.14 - Math.floor(i / 3) * 0.1, 0.022, 0.014, 10); });
    g.CY("#22d3ee", 0.5, y + 0.005, g.dd - 0.2, 0.012, 0.01, 8);
  }
  const cxBig = 18.9, czBig = 1.75;
  borne(cxBig, czBig, 0, {
    w: 1.3, d: 0.9, yD: 0.84, yM: 1.78, yT: 2.1,
    corps: "#10263f", flanc: "#1b3a63", accent: "#22d3ee", mar: "#be185d", fond: "#06202e", ball: "#ef4444",
    ecran: ecranSimu, commandes: commandesSimu,
    fronton: function (S, g) {
      g.B("#22d3ee", -g.hw + 0.07, g.hw - 0.07, g.yM + 0.045, g.yM + 0.06, g.vMar + 0.005, g.vMar + 0.01, LUM);
      g.B("#22d3ee", -g.hw + 0.07, g.hw - 0.07, g.yT - 0.06, g.yT - 0.045, g.vMar + 0.005, g.vMar + 0.01, LUM);
      g.B("#0a1a2c", -0.3, 0.3, g.yM + 0.075, g.yT - 0.075, g.vMar + 0.005, g.vMar + 0.01, LUM);
      manette(F("z", cxBig, 0, czBig + g.vMar + 0.012), 0, (g.yM + g.yT) / 2 + 0.005, 0, 0.36);
    }
  });

  /* =====================================================================
     7. LA ZONE CLIQUABLE, LE REPÈRE ET LA CAMÉRA
     ===================================================================== */
  H.proxy(Z, X0, X1 + 0.06, 0, YA + 0.03, ZB, ZF + 0.06);
  H.proxy(Z, 17.97, 18.1, 1.9, 3.0, ZF + 0.06, 4.07);
  H.ancre(Z, 18.6, 4.2, 3.0);

  return { "arcade": { zoom: 0.28, az: [-10, 40], el: 8, foyer: [19.3, 1.6, 0.5] } };
}
