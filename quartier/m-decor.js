/* =====================================================================
   m-decor.js — LE DÉCOR DE LA RUE (zone null : rien n'est cliquable)

   Le cadre de toute la scène : la plaque de maquette et sa tranche, les
   terrains, les deux allées, les trottoirs, la chaussée et son marquage,
   le mobilier urbain, les arbres, le jardin de la maison et une voiture
   garée. Sobre et propre : tons crème, gris doux et verts pâles, très
   peu de couleurs vives, pour mettre en valeur les bâtiments sans les
   concurrencer.

   Niveaux : la chaussée, les allées et le gazon sont au sol fini y = 0 ;
   les trottoirs sont 0,15 plus haut (la hauteur de la bordure). Sous les
   bâtiments, une simple dalle grise un peu plus basse (y −0,03) : les
   planchers des autres modules se posent dessus sans se disputer une face.

   Couloirs de vue : rien de haut sur le trottoir devant le commerce ni
   devant la maison, car les caméras des zones y passent. Le premier
   lampadaire est à l'entrée de l'allée de gauche, le second sur le
   trottoir d'en face (derrière les caméras de zone).
   Cahier des charges : SPEC-3D.md.
   ===================================================================== */
export function decor(H) {
  const P = H.P, N = null;
  const bx = H.bx, bxr = H.bxr, cy = H.cy, cyv = H.cyv, tube = H.tube, canal = H.canal, sp = H.sp, ext = H.ext;
  const alea = H.alea;

  /* ---------- repères ---------- */
  const XG = -24, XD = 21, ZF = -8, ZA = 12;      /* bords de la plaque */
  const YB = -0.6, YP = -0.32, YT = 0.15;         /* bas du socle, dessus de la planche, dessus des trottoirs */
  const ZT = 3.0, ZTB = 5.05, ZC = 5.2;           /* trottoir : dallage 3,0..5,05 puis bordure 5,05..5,2 */
  const ZK0 = 5.5, ZK1 = 10.9, ZC2 = 11.2;        /* caniveaux 5,2..5,5 et 10,9..11,2, enrobé entre les deux */
  const ZTB2 = 11.35;                             /* trottoir d'en face : bordure 11,2..11,35, dallage jusqu'à 12 */
  const XP0 = 2.25, XP1 = 4.75, RP = 0.6;         /* passage piéton (vers x = 3,5) et rampes de l'abaissement */

  /* ---------- teintes du décor ---------- */
  const C = {
    gazon: "#d4e1c3", gazonB: "#cddbbb",
    beton: "#d8d3c6", corps: "#c9c3b6", bordure: "#c3c6ca", jointB: "#9ea4ab",
    dallePlate: "#dcd6ca", bev: "#efebe0", plot: "#e0dbcd",
    grave: "#b8b1a2", enrobe: "#878c92", caniveau: "#d0ccc3", peinture: "#f5f3ec",
    paveJ: "#b6ad9c", gravier: "#ddd5c3",
    fonte: "#3f4b5a", bois: "#7d5f43"
  };
  const _c = new H.THREE.Color();
  function nuance(hex, d) { _c.set(hex); _c.offsetHSL(0, 0, d); return "#" + _c.getHexString(); }
  const DALLES = [-0.03, -0.015, 0, 0.012].map(function (d) { return nuance("#e5e0d5", d); });
  const PAVES = [-0.04, -0.02, 0, 0.015].map(function (d) { return nuance("#cfc4b0", d); });

  /* =====================================================================
     1. LE SOCLE : la plaque de maquette et sa tranche
     ===================================================================== */
  /* un pied en retrait, plus sombre, qui fait « flotter » la plaque */
  bx(N, P.plaqueB, XG + 0.06, XD - 0.06, YB, YB + 0.1, ZF + 0.06, ZA - 0.06);
  bx(N, P.plaque, XG, XD, YB + 0.1, YP, ZF, ZA, { edge: 1 });

  /* =====================================================================
     2. LES TERRAINS : gazon partout où il n'y a ni bâtiment ni allée
     ===================================================================== */
  /* découpe d'un rectangle en une grille de cases qui évitent les trous (emprises,
     allées). Les cases ne sont PAS fusionnées : toutes partagent les mêmes lignes
     de grille, donc aucune fissure claire entre deux cases voisines. xPlus : lignes
     supplémentaires (bandes de tonte). Chaque case porte son numéro de colonne. */
  function grille(x0, x1, z0, z1, trous, xPlus) {
    const tri = function (a) { return a.sort(function (p, q) { return p - q; }).filter(function (v, i, t) { return !i || v - t[i - 1] > 1e-6; }); };
    const xs = [x0, x1].concat(xPlus.filter(function (v) { return v > x0 && v < x1; })), zs = [z0, z1];
    trous.forEach(function (t) {
      if (t[0] > x0 && t[0] < x1) xs.push(t[0]);
      if (t[1] > x0 && t[1] < x1) xs.push(t[1]);
      if (t[2] > z0 && t[2] < z1) zs.push(t[2]);
      if (t[3] > z0 && t[3] < z1) zs.push(t[3]);
    });
    const X = tri(xs), Z = tri(zs), out = [];
    for (let j = 0; j < Z.length - 1; j++) {
      const zm = (Z[j] + Z[j + 1]) / 2;
      for (let i = 0; i < X.length - 1; i++) {
        const xm = (X[i] + X[i + 1]) / 2;
        const plein = trous.some(function (t) { return xm > t[0] && xm < t[1] && zm > t[2] && zm < t[3]; });
        if (!plein) out.push([X[i], X[i + 1], Z[j], Z[j + 1], xm]);
      }
    }
    return out;
  }
  const EMPRISES = [
    [-22, -13.5, -5.5, 2.6],    /* immeuble */
    [-12, 2, -5, ZT],           /* commerce */
    [5.5, 15.5, -4.5, ZT]       /* maison */
  ];
  const ALLEES = [
    [-22, -13.5, 2.6, ZT],      /* parvis de l'immeuble */
    [-13.5, -12, -5.5, ZT],     /* allée de gauche, en pavés */
    [2, 5.5, -6.0, ZT]          /* allée de droite, en gravier */
  ];
  /* gazon : terre en dessous (visible sur la tranche), herbe au-dessus,
     avec de larges bandes de tonte à peine marquées. La couche d'herbe n'a que
     6 mm : les flancs des cases voisines restent invisibles (pas de lignes claires). */
  const TONTE = [];
  for (let x = -22.4; x < XD; x += 1.6) TONTE.push(x);
  grille(XG, XD, ZF, ZT, EMPRISES.concat(ALLEES), TONTE).forEach(function (r) {
    bx(N, P.terre, r[0], r[1], YP, -0.006, r[2], r[3]);
    bx(N, Math.round((r[4] + 22.4) / 1.6 - 0.5) % 2 ? C.gazonB : C.gazon, r[0], r[1], -0.006, 0, r[2], r[3]);
  });
  /* sur la tranche, la bande verte de l'herbe garde son épaisseur de maquette */
  bx(N, C.gazonB, XG - 0.003, XG, -0.05, 0, ZF, ZT);
  bx(N, C.gazonB, XD, XD + 0.003, -0.05, 0, ZF, ZT);
  bx(N, C.gazonB, XG, XD, -0.05, 0, ZF - 0.003, ZF);
  /* sous les bâtiments : une dalle grise un peu plus basse que le sol fini */
  EMPRISES.forEach(function (e) { bx(N, C.beton, e[0], e[1], YP, -0.03, e[2], e[3]); });
  /* une fine strate sur la tranche du terrain (comme le socle de la Législation) :
     une seule boîte noyée dans le sol, qui affleure de 3 mm sur les trois tranches */
  bx(N, P.strate, XG - 0.003, XD + 0.003, -0.2, -0.17, ZF - 0.003, ZT - 0.02);

  /* =====================================================================
     3. LES ALLÉES : pavés à gauche, gravier et pas japonais à droite,
        parvis dallé devant l'immeuble
     ===================================================================== */
  /* allée de gauche (x −13,5..−12) : pavés de pierre posés à joints décalés */
  bx(N, C.paveJ, -13.5, -12, YP, -0.012, -5.5, ZT);
  for (let j = 0, z = -5.5; z < ZT - 0.05; j++, z += 0.24) {
    const z1 = Math.min(ZT, z + 0.24);
    for (let x = -13.5 - (j % 2 ? 0.18 : 0); x < -12.02; x += 0.36) {
      const a = Math.max(x, -13.5), b = Math.min(x + 0.36, -12);
      if (b - a < 0.06) continue;
      bx(N, PAVES[Math.floor(alea() * PAVES.length)], a + 0.01, b - 0.01, -0.03, 0, z + 0.01, z1 - 0.01);
    }
  }
  /* allée de droite (x 2..5,5) : gravier clair, quelques grains plus sombres */
  bx(N, C.gravier, 2, 5.5, YP, 0, -6.0, ZT);
  const GRAINS = ["#c8bea8", "#ebe5d7", "#b9ae98", "#d2c8b2"];
  for (let k = 0; k < 260; k++) {
    const x = 2.05 + alea() * 3.4, z = -5.95 + alea() * 8.9, t = 0.025 + alea() * 0.035;
    bx(N, GRAINS[k % 4], x - t, x + t, -0.004, 0.007, z - t * 0.8, z + t * 0.8);
  }
  /* pas japonais vers le portillon du jardin */
  for (let k = 0; k < 12; k++) {
    const z = 2.55 - k * 0.74 - (k > 10 ? 0.1 : 0);
    bxr(N, nuance("#c7c2b8", (alea() - 0.5) * 0.04), 4.45 + (alea() - 0.5) * 0.12, 0.012, z, 0.52, 0.026, 0.38, 0, (alea() - 0.5) * 16, 0);
  }
  /* parvis de l'immeuble (z 2,6..3,0) : une rangée de grandes dalles */
  bx(N, C.corps, -22, -13.5, YP, -0.02, 2.6, ZT);
  for (let x = -22; x < -13.52; x += 0.85) {
    bx(N, DALLES[Math.floor(alea() * DALLES.length)], x + 0.012, Math.min(x + 0.85, -13.5) - 0.012, -0.03, 0, 2.612, ZT - 0.012);
  }

  /* =====================================================================
     4. LES TROTTOIRS : dallage, bordure de 0,15, abaissement au passage
        piéton avec sa bande d'éveil de vigilance
     ===================================================================== */
  function trottoir(zd0, zd1, zb0, zb1, rangs, bev) {
    /* les deux tronçons, de part et d'autre de l'abaissement */
    [[XG, XP0 - RP], [XP1 + RP, XD]].forEach(function (t) {
      bx(N, C.corps, t[0], t[1], YP, YT - 0.03, zd0, zd1, { edge: 1 });
      bx(N, C.corps, t[0], t[1], YP, -0.14, zb0, zb1);                 /* fondation de la bordure */
      bx(N, C.bordure, t[0], t[1], -0.14, YT, zb0, zb1, { edge: 1 });
      /* dalles 0,8 × 0,5 à joints décalés, teintes légèrement variées */
      rangs.forEach(function (r, j) {
        for (let x = t[0] - (j % 2 ? 0.4 : 0); x < t[1] - 0.05; x += 0.8) {
          const a = Math.max(x, t[0]), b = Math.min(x + 0.8, t[1]);
          if (b - a < 0.08) continue;
          bx(N, DALLES[Math.floor(alea() * DALLES.length)], a + 0.012, b - 0.012, YT - 0.03, YT, r[0] + 0.012, r[1] - 0.012);
        }
      });
      /* joints de la bordure, un par mètre */
      for (let x = t[0] + 1; x < t[1] - 0.2; x += 1) bx(N, C.jointB, x - 0.006, x + 0.006, 0, YT + 0.002, zb0 - 0.002, zb1 + 0.002);
    });
    /* l'abaissement : plateau au niveau de la chaussée, deux rampes, bordure basse */
    [[zd0, zd1, C.dallePlate], [zb0, zb1, C.bordure]].forEach(function (s) {
      bx(N, s[2], XP0, XP1, YP, 0.02, s[0], s[1]);
      ext(N, s[2], [[XP0 - RP, YP], [XP0, YP], [XP0, 0.02], [XP0 - RP, YT]], s[1] - s[0], 0, 0, s[0]);
      ext(N, s[2], [[XP1, YP], [XP1 + RP, YP], [XP1 + RP, YT], [XP1, 0.02]], s[1] - s[0], 0, 0, s[0]);
    });
    /* bande d'éveil de vigilance : bande claire semée de plots */
    bx(N, C.bev, XP0 + 0.05, XP1 - 0.05, 0.02, 0.03, bev[0], bev[1]);
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 3; j++) {
        cy(N, C.plot, XP0 + 0.13 + i * 0.12, 0.036, bev[0] + 0.07 + j * (bev[1] - bev[0] - 0.14) / 2, 0.022, 0.014, { seg: 6 });
      }
    }
  }
  trottoir(ZT, ZTB, ZTB, ZC, [[3.0, 3.5], [3.5, 4.0], [4.0, 4.5], [4.5, ZTB]], [4.28, 4.7]);
  trottoir(ZTB2, ZA, ZC2, ZTB2, [[ZTB2, ZA]], [11.5, 11.84]);

  /* =====================================================================
     5. LA CHAUSSÉE : enrobé, caniveaux, marquage, regards, avaloirs
     ===================================================================== */
  bx(N, C.grave, XG, XD, YP, -0.07, ZC, ZC2, { edge: 1 });
  bx(N, C.enrobe, XG, XD, -0.07, 0, ZK0, ZK1);
  bx(N, C.caniveau, XG, XD, -0.07, 0, ZC, ZK0);
  bx(N, C.caniveau, XG, XD, -0.07, 0, ZK1, ZC2);
  /* éléments de caniveau : un joint tous les mètres */
  for (let x = XG + 1; x < XD - 0.2; x += 1) {
    bx(N, "#bdb8ae", x - 0.005, x + 0.005, 0, 0.003, ZC, ZK0);
    bx(N, "#bdb8ae", x - 0.005, x + 0.005, 0, 0.003, ZK1, ZC2);
  }
  /* reprise d'enrobé (une ancienne tranchée de branchement, un peu plus sombre) */
  bx(N, "#7f848a", 11.6, 12.5, 0, 0.002, ZK0, 8.0);
  function peint(x0, x1, z0, z1) { bx(N, C.peinture, x0, x1, 0, 0.008, z0, z1); }
  /* ligne axiale tiretée, interrompue au passage piéton et sous la camionnette */
  for (let x = -21.7; x + 2.4 < XD; x += 4.5) {
    if (x + 2.4 > XP0 - 0.5 && x < XP1 + 0.5) continue;
    if (x + 2.4 > -10.2 && x < -3.8) continue;
    peint(x, x + 2.4, 8.14, 8.26);
  }
  /* passage piéton : cinq bandes de 0,5, parallèles à l'axe de la chaussée */
  [6.2, 7.2, 8.2, 9.2, 10.2].forEach(function (z) { peint(XP0, XP1, z - 0.25, z + 0.25); });
  /* deux places de stationnement le long du trottoir d'en face */
  peint(8.7, 18.9, 9.0, 9.1);
  [8.7, 13.75, 18.8].forEach(function (x) { peint(x, x + 0.1, 9.1, ZK1); });
  /* regards de fonte ronds sur la voie côté bâtiments */
  [[-17.5, 6.9], [11.2, 7.0]].forEach(function (p) {
    cy(N, "#6c747e", p[0], 0.004, p[1], 0.33, 0.008, { seg: 20 });
    cy(N, "#5d6570", p[0], 0.009, p[1], 0.27, 0.004, { seg: 20 });
    for (let k = -2; k <= 2; k++) bx(N, "#717a84", p[0] + k * 0.09 - 0.012, p[0] + k * 0.09 + 0.012, 0.009, 0.013, p[1] - 0.2, p[1] + 0.2);
  });
  /* avaloirs (grilles d'égout) dans les caniveaux */
  [[-15.8, ZC + 0.03, ZK0 - 0.02], [7.4, ZC + 0.03, ZK0 - 0.02], [-6.6, ZK1 + 0.02, ZC2 - 0.03], [19.3, ZK1 + 0.02, ZC2 - 0.03]].forEach(function (g) {
    bx(N, "#5f6773", g[0] - 0.34, g[0] + 0.34, 0, 0.006, g[1], g[2]);
    for (let k = 0; k < 6; k++) bx(N, "#2a313b", g[0] - 0.27 + k * 0.1, g[0] - 0.22 + k * 0.1, 0.006, 0.009, g[1] + 0.05, g[2] - 0.05);
  });

  /* =====================================================================
     6. LE MOBILIER URBAIN : lampadaires, potelets, banc, corbeille,
        poteau d'incendie
     ===================================================================== */
  /* lampadaire à tête LED : pied fonte, fût conique, crosse vers la chaussée */
  function lampadaire(x, z, sens) {
    cy(N, C.fonte, x, YT + 0.03, z, 0.17, 0.06, { seg: 12 });
    cyv(N, C.fonte, x, YT + 0.06, YT + 0.7, z, 0.12, { rt: 0.085, seg: 12 });
    cy(N, "#56636f", x, YT + 0.72, z, 0.1, 0.05, { seg: 12 });
    cy(N, "#56636f", x, YT + 0.3, z, 0.125, 0.04, { seg: 12 });
    /* trappe de visite du fût */
    bx(N, "#56636f", x - 0.04, x + 0.04, YT + 0.36, YT + 0.6, z + 0.11 * sens - 0.012, z + 0.11 * sens + 0.012);
    cyv(N, C.fonte, x, YT + 0.72, YT + 4.4, z, 0.07, { rt: 0.05, seg: 10 });
    canal(N, C.fonte, [[x, YT + 4.38, z], [x, YT + 4.62, z + 0.07 * sens], [x, YT + 4.74, z + 0.3 * sens], [x, YT + 4.78, z + 0.72 * sens]], 0.034);
    /* la tête : coque plate, diffuseur clair dessous */
    sp(N, C.fonte, x, YT + 4.78, z + 1.0 * sens, 0.2, 0.07, 0.38, { seg: 12, seg2: 6 });
    bx(N, "#f4efdf", x - 0.12, x + 0.12, YT + 4.715, YT + 4.73, z + 1.0 * sens - 0.24, z + 1.0 * sens + 0.24);
  }
  lampadaire(-12.75, 4.85, 1);       /* à l'entrée de l'allée de gauche */
  lampadaire(-17.2, 11.62, -1);      /* trottoir d'en face, en quinconce (hors des couloirs de vue) */

  /* potelets anti-stationnement aux deux bouts de chaque abaissement */
  function potelet(x, z) {
    cyv(N, C.fonte, x, 0, YT + 0.95, z, 0.05, { seg: 10 });
    cyv(N, "#eeeae0", x, YT + 0.78, YT + 0.84, z, 0.053, { seg: 10 });
    sp(N, C.fonte, x, YT + 0.95, z, 0.05, 0.03, 0.05, { seg: 10, seg2: 4 });
  }
  [[1.95, 4.95], [5.05, 4.95], [1.95, 11.5], [5.05, 11.5]].forEach(function (p) { potelet(p[0], p[1]); });

  /* banc à lattes de bois et pieds de fonte, à l'angle de l'immeuble */
  function banc(x0, x1, z0) {
    [x0 + 0.08, x1 - 0.13].forEach(function (x) {
      bx(N, C.fonte, x, x + 0.05, YT, YT + 0.42, z0 + 0.42, z0 + 0.47);           /* pied avant */
      bxr(N, C.fonte, x + 0.025, YT + 0.45, z0 + 0.1, 0.05, 0.9, 0.05, -8, 0, 0); /* montant arrière */
      bx(N, C.fonte, x, x + 0.05, YT + 0.4, YT + 0.43, z0 + 0.08, z0 + 0.47);     /* support d'assise */
      bx(N, C.fonte, x - 0.01, x + 0.06, YT + 0.62, YT + 0.65, z0 + 0.12, z0 + 0.5); /* accoudoir */
    });
    for (let k = 0; k < 4; k++) bx(N, k % 2 ? P.bois : P.boisF, x0, x1, YT + 0.43, YT + 0.47, z0 + 0.1 + k * 0.1, z0 + 0.18 + k * 0.1);
    [0.6, 0.74, 0.88].forEach(function (y, k) {
      bxr(N, k % 2 ? P.boisF : P.bois, (x0 + x1) / 2, YT + y, z0 + 0.09 - (y - 0.6) * 0.14, x1 - x0, 0.09, 0.03, -8, 0, 0);
    });
  }
  banc(-23.45, -22.05, 3.2);
  /* corbeille sur poteau */
  cyv(N, C.fonte, -21.55, YT, YT + 1.0, 3.32, 0.03, { seg: 8 });
  cyv(N, "#5a7363", -21.55, YT + 0.4, YT + 0.95, 3.55, 0.2, { seg: 14 });
  cyv(N, "#4b6153", -21.55, YT + 0.93, YT + 0.97, 3.55, 0.215, { seg: 14 });
  cy(N, "#2a313b", -21.55, YT + 0.972, 3.55, 0.175, 0.006, { seg: 14 });

  /* poteau d'incendie rouge, sur le trottoir d'en face */
  {
    const x = -13.4, z = 11.66, R = "#c63b2e", R2 = "#962d24";
    cyv(N, R2, x, YT, YT + 0.08, z, 0.16, { seg: 14 });
    cyv(N, R, x, YT + 0.08, YT + 0.9, z, 0.11, { seg: 14 });
    cyv(N, R2, x, YT + 0.6, YT + 0.66, z, 0.125, { seg: 14 });
    sp(N, R, x, YT + 0.9, z, 0.11, 0.08, 0.11, { seg: 12, seg2: 5 });
    cyv(N, R2, x, YT + 0.95, YT + 1.02, z, 0.035, { seg: 6 });
    [-1, 1].forEach(function (s) {
      cy(N, R, x + s * 0.15, YT + 0.74, z, 0.045, 0.1, { axe: "x", seg: 10 });
      cy(N, R2, x + s * 0.205, YT + 0.74, z, 0.055, 0.03, { axe: "x", seg: 10 });
    });
    cy(N, R, x, YT + 0.5, z - 0.15, 0.06, 0.1, { axe: "z", seg: 10 });
    cy(N, R2, x, YT + 0.5, z - 0.205, 0.07, 0.03, { axe: "z", seg: 10 });
    cyv(N, "#f5f3ec", x, YT + 0.3, YT + 0.34, z, 0.113, { seg: 14 });      /* bague blanche */
  }

  /* =====================================================================
     7. LES ARBRES : feuillus derrière et entre les bâtiments, un conifère
        derrière la maison, un arbre fastigié (étroit) à gauche de l'immeuble
     ===================================================================== */
  const FEUILLES = [P.feuille, P.feuilleF, "#9dbe8d", "#b2cfa3"];
  function feuillu(x, z, s) {
    cy(N, "#c4b496", x, 0.01, z, 0.5 * s, 0.02, { seg: 14 });                   /* cuvette de paillage */
    cyv(N, "#76593d", x, 0, 0.3 * s, z, 0.2 * s, { rt: 0.13 * s, seg: 8 });      /* empattement */
    cyv(N, C.bois, x, 0.3 * s, 2.2 * s, z, 0.13 * s, { rt: 0.085 * s, seg: 8 }); /* tronc */
    for (let k = 0; k < 3; k++) {                                                /* charpentières */
      const a = (k * 120 + alea() * 40) * Math.PI / 180;
      tube(N, C.bois, x, 1.7 * s, z, x + Math.cos(a) * 0.55 * s, 2.65 * s, z + Math.sin(a) * 0.55 * s, 0.05 * s, { seg: 5 });
    }
    /* le houppier : une masse centrale et six touffes autour */
    sp(N, P.feuille, x, 3.0 * s, z, 1.15 * s, 1.0 * s, 1.15 * s, { seg: 10, seg2: 7 });
    for (let k = 0; k < 6; k++) {
      const a = (k * 60 + alea() * 30) * Math.PI / 180, d = (0.62 + alea() * 0.15) * s, r = (0.55 + alea() * 0.15) * s;
      sp(N, FEUILLES[(k + 1) % 4], x + Math.cos(a) * d, (2.65 + alea() * 0.65) * s, z + Math.sin(a) * d, r, r * 0.85, r, { seg: 9, seg2: 6 });
    }
    sp(N, "#b8d4aa", x - 0.15 * s, 3.75 * s, z + 0.12 * s, 0.7 * s, 0.55 * s, 0.7 * s, { seg: 9, seg2: 6 });
  }
  function fastigie(x, z, s) {
    cy(N, "#c4b496", x, 0.01, z, 0.4 * s, 0.02, { seg: 14 });
    cyv(N, C.bois, x, 0, 1.2 * s, z, 0.11 * s, { rt: 0.08 * s, seg: 8 });
    sp(N, P.feuilleF, x, 3.3 * s, z, 0.82 * s, 2.4 * s, 0.82 * s, { seg: 10, seg2: 9 });
    sp(N, P.feuille, x + 0.22 * s, 2.7 * s, z + 0.18 * s, 0.62 * s, 1.5 * s, 0.62 * s, { seg: 9, seg2: 7 });
    sp(N, "#9dbe8d", x - 0.18 * s, 4.0 * s, z - 0.1 * s, 0.52 * s, 1.25 * s, 0.52 * s, { seg: 9, seg2: 7 });
  }
  /* conifère en étages de cônes : étroit en haut, il passe sous le débord du toit
     de la maison et dépasse du faîtage, vu de la rue */
  function conifere(x, z, h, r) {
    const V = "#6f9866";
    cy(N, "#c4b496", x, 0.01, z, 0.45, 0.02, { seg: 14 });
    cyv(N, C.bois, x, 0, 1.3, z, 0.14, { rt: 0.1, seg: 8 });
    for (let k = 0; k < 4; k++) {
      const y0 = 0.9 + k * (h - 1.2) / 4.6, rr = r * (1 - k * 0.2);
      cyv(N, k % 2 ? V : nuance(V, 0.04), x, y0, y0 + (h - 0.9) * 0.42, z, rr, { rt: rr * 0.16, seg: 10 });
    }
  }
  fastigie(-23.0, 1.9, 1.0);         /* bande gazonnée à gauche de l'immeuble, visible à l'angle */
  feuillu(4.0, -6.3, 1.15);          /* au bout de l'allée de droite */
  conifere(9.2, -6.25, 8.6, 1.25);   /* jardin de la maison, derrière la cuisine */
  feuillu(16.9, -6.0, 1.35);         /* jardin, côté droit (hors de l'aplomb de la maison) */
  feuillu(19.3, -2.2, 1.2);          /* bande gazonnée à droite de la maison, encadre la PAC */

  /* =====================================================================
     8. LE JARDIN DE LA MAISON : haie taillée au fond, clôture en lattes
        de bois sur les côtés, un portillon sur l'allée, quelques arbustes
     ===================================================================== */
  /* haie : un corps taillé net et un dessus bombé en touffes */
  function haie(x0, x1, z0, z1, h) {
    bx(N, P.feuilleF, x0, x1, 0, h - 0.12, z0, z1);
    const zm = (z0 + z1) / 2, e = (z1 - z0) / 2;
    for (let x = x0 + 0.28; x < x1 - 0.1; x += 0.52) {
      sp(N, alea() < 0.5 ? P.feuilleF : "#7fa673", x, h - 0.14, zm, 0.36, 0.17, e + 0.02, { seg: 8, seg2: 5 });
    }
  }
  haie(5.6, 18.6, -7.85, -7.25, 1.45);

  /* clôture en lattes : poteaux, deux lisses, lattes à pointe de diamant */
  function cloture(axe, a0, a1, b, porte) {
    const P2 = function (c, u0, u1, y0, y1, v0, v1) {
      if (axe === "x") bx(N, c, u0, u1, y0, y1, v0, v1); else bx(N, c, v0, v1, y0, y1, u0, u1);
    };
    const pointe = function (u) {
      if (axe === "x") bxr(N, P.bois, u, 0.93, b, 0.05, 0.05, 0.022, 0, 0, 45);
      else bxr(N, P.bois, b, 0.93, u, 0.022, 0.05, 0.05, 45, 0, 0);
    };
    const dansPorte = function (u) { return porte && u > porte[0] - 0.02 && u < porte[1] + 0.02; };
    /* poteaux */
    const nP = Math.max(1, Math.round((a1 - a0) / 1.5));
    for (let i = 0; i <= nP; i++) {
      const u = a0 + (a1 - a0) * i / nP;
      if (dansPorte(u)) continue;
      P2(P.boisF, u - 0.045, u + 0.045, 0, 1.05, b - 0.045, b + 0.045);
      P2(P.boisF, u - 0.055, u + 0.055, 1.05, 1.08, b - 0.055, b + 0.055);
    }
    if (porte) [porte[0] - 0.06, porte[1] + 0.06].forEach(function (u) {
      P2(P.boisF, u - 0.05, u + 0.05, 0, 1.15, b - 0.05, b + 0.05);
    });
    /* lisses (hors portillon) et lattes */
    const tron = porte ? [[a0, porte[0] - 0.06], [porte[1] + 0.06, a1]] : [[a0, a1]];
    tron.forEach(function (t) {
      [0.28, 0.72].forEach(function (y) { P2(P.boisF, t[0], t[1], y, y + 0.06, b - 0.035, b - 0.012); });
    });
    for (let u = a0 + 0.1; u < a1 - 0.05; u += 0.14) {
      if (dansPorte(u)) continue;
      P2(P.bois, u - 0.035, u + 0.035, 0.05, 0.93, b - 0.012, b + 0.012);
      pointe(u);
    }
    /* le portillon : mêmes lattes, une écharpe en Z et un loquet */
    if (porte) {
      const p0 = porte[0], p1 = porte[1];
      [0.28, 0.72].forEach(function (y) { P2(P.boisF, p0, p1, y, y + 0.07, b - 0.04, b - 0.012); });
      if (axe === "x") bxr(N, P.boisF, (p0 + p1) / 2, 0.53, b - 0.026, Math.hypot(p1 - p0, 0.44) - 0.05, 0.06, 0.028, 0, 0, Math.atan2(0.44, p1 - p0) * 180 / Math.PI);
      else bxr(N, P.boisF, b - 0.026, 0.53, (p0 + p1) / 2, 0.028, 0.06, Math.hypot(p1 - p0, 0.44) - 0.05, -Math.atan2(0.44, p1 - p0) * 180 / Math.PI, 0, 0);
      P2(C.fonte, p1 - 0.08, p1 - 0.02, 0.8, 0.84, b + 0.012, b + 0.03);
    }
  }
  cloture("z", -7.25, -4.55, 5.56, [-5.9, -5.06]);   /* côté allée, avec portillon */
  cloture("z", -7.25, -4.55, 18.6, null);            /* côté droit */
  cloture("x", 15.5, 18.6, -4.56, null);             /* retour vers la maison */
  /* arbustes ronds au pied de la clôture */
  [[6.3, -6.9, 0.55], [12.4, -6.95, 0.45], [18.1, -5.2, 0.5]].forEach(function (a) {
    sp(N, P.feuilleF, a[0], a[2] * 0.8, a[1], a[2], a[2] * 0.85, a[2], { seg: 9, seg2: 6 });
    sp(N, "#9dbe8d", a[0] + a[2] * 0.3, a[2] * 1.05, a[1] + a[2] * 0.2, a[2] * 0.6, a[2] * 0.5, a[2] * 0.6, { seg: 8, seg2: 5 });
  });

  /* =====================================================================
     9. LA VOITURE GARÉE, discrète, sur une des deux places d'en face
        (tournée vers +x, flanc droit vers le spectateur)
     ===================================================================== */
  function voiture(x0, z0, teinte) {
    const L = 3.95, W = 1.66;
    const b = function (c, u0, u1, y0, y1, v0, v1) { bx(N, c, x0 + u0, x0 + u1, y0, y1, z0 + v0, z0 + v1); };
    const fonce = nuance(teinte, -0.12);
    /* le noyau : sombre au droit des roues (passages de roue), pont de capot à la teinte */
    [[0.08, 0.32], [1.12, 2.78], [3.58, 3.87]].forEach(function (u) { b("#2f353d", u[0], u[1], 0.3, 0.82, 0.04, W - 0.04); });
    [[0.32, 1.12], [2.78, 3.58]].forEach(function (u) { b("#2f353d", u[0], u[1], 0.3, 0.82, 0.28, W - 0.28); });
    b(teinte, 0.08, 3.87, 0.82, 0.86, 0.02, W - 0.02);
    /* les flancs, découpés en arc au droit des roues */
    const fl = [[0.08, 0.3], [0.34, 0.3]];
    [0.72, 3.18].forEach(function (c, i) {
      for (let k = 0; k <= 8; k++) { const t = Math.PI - Math.PI * k / 8; fl.push([c + 0.38 * Math.cos(t), 0.3 + 0.38 * Math.sin(t)]); }
      fl.push(i ? [3.87, 0.3] : [2.8, 0.3]);
    });
    fl.push([3.87, 0.86], [0.08, 0.86]);
    const flanc = fl.map(function (p) { return [x0 + p[0], p[1]]; });
    ext(N, teinte, flanc, 0.04, 0, 0, z0);
    ext(N, teinte, flanc, 0.04, 0, 0, z0 + W - 0.04);
    /* boucliers, calandre, phares, feux, plaques (bandes bleues, sans texte) */
    b("#4f5862", 3.84, 3.96, 0.26, 0.52, 0.02, W - 0.02);
    b(teinte, 3.87, 3.91, 0.52, 0.84, 0.03, W - 0.03);
    b("#2a313b", 3.91, 3.915, 0.56, 0.66, 0.45, W - 0.45);
    b("#eef0ea", 3.9, 3.92, 0.68, 0.78, 0.1, 0.45);
    b("#eef0ea", 3.9, 3.92, 0.68, 0.78, W - 0.45, W - 0.1);
    b("#4f5862", -0.01, 0.1, 0.26, 0.52, 0.02, W - 0.02);
    b(teinte, 0.04, 0.08, 0.52, 0.84, 0.03, W - 0.03);
    b("#b53a3a", 0.03, 0.05, 0.62, 0.8, 0.06, 0.3);
    b("#b53a3a", 0.03, 0.05, 0.62, 0.8, W - 0.3, W - 0.06);
    [[3.96, 3.97], [-0.02, -0.01]].forEach(function (u) {
      b("#f4f4f0", u[0], u[1], 0.33, 0.44, W / 2 - 0.26, W / 2 + 0.26);
      b("#2f54a3", u[0] + (u[0] > 1 ? 0.004 : -0.004), u[1] + (u[0] > 1 ? 0.004 : -0.004), 0.33, 0.44, W / 2 - 0.26, W / 2 - 0.21);
      b("#2f54a3", u[0] + (u[0] > 1 ? 0.004 : -0.004), u[1] + (u[0] > 1 ? 0.004 : -0.004), 0.33, 0.44, W / 2 + 0.21, W / 2 + 0.26);
    });
    /* la serre vitrée (pare-brise et lunette inclinés), le pavillon, les montants */
    ext(N, "#5f7184", [[x0 + 0.3, 0.86], [x0 + 2.98, 0.86], [x0 + 2.42, 1.42], [x0 + 0.62, 1.42]], W - 0.24, 0, 0, z0 + 0.12);
    ext(N, teinte, [[x0 + 0.6, 1.42], [x0 + 2.44, 1.42], [x0 + 2.4, 1.47], [x0 + 0.66, 1.47]], W - 0.2, 0, 0, z0 + 0.1);
    [z0 + 0.105, z0 + W - 0.12].forEach(function (z) {
      ext(N, teinte, [[x0 + 2.9, 0.86], [x0 + 2.99, 0.86], [x0 + 2.43, 1.42], [x0 + 2.36, 1.42]], 0.015, 0, 0, z);
      ext(N, teinte, [[x0 + 1.6, 0.86], [x0 + 1.7, 0.86], [x0 + 1.68, 1.42], [x0 + 1.6, 1.42]], 0.015, 0, 0, z);
      ext(N, teinte, [[x0 + 0.3, 0.86], [x0 + 0.78, 0.86], [x0 + 0.92, 1.42], [x0 + 0.62, 1.42]], 0.015, 0, 0, z);
      ext(N, teinte, [[x0 + 0.62, 1.37], [x0 + 2.42, 1.37], [x0 + 2.42, 1.42], [x0 + 0.62, 1.42]], 0.015, 0, 0, z);
    });
    /* rétroviseurs */
    b(teinte, 2.8, 2.93, 0.92, 1.03, W - 0.02, W + 0.12);
    b(teinte, 2.8, 2.93, 0.92, 1.03, -0.12, 0.02);
    /* flanc visible : lignes d'ouvrants, poignées, baguette de protection */
    [[2.8, 0.32], [1.62, 0.32], [1.12, 0.32]].forEach(function (l) { b(fonce, l[0], l[0] + 0.012, l[1], 0.86, W, W + 0.003); });
    b("#3a424c", 2.42, 2.57, 0.76, 0.79, W, W + 0.014);
    b("#3a424c", 1.3, 1.45, 0.76, 0.79, W, W + 0.014);
    b("#4b525b", 1.13, 2.79, 0.46, 0.5, W, W + 0.006);
    /* roues : pneu, jante claire, moyeu */
    [0.72, 3.18].forEach(function (u) {
      [[0.16, -1], [W - 0.16, 1]].forEach(function (v) {
        cy(N, "#262b31", x0 + u, 0.31, z0 + v[0], 0.31, 0.2, { axe: "z", seg: 16 });
        cy(N, "#c5ccd4", x0 + u, 0.31, z0 + v[0] + v[1] * 0.106, 0.19, 0.012, { axe: "z", seg: 12 });
        cy(N, "#8d969f", x0 + u, 0.31, z0 + v[0] + v[1] * 0.114, 0.055, 0.01, { axe: "z", seg: 8 });
      });
    });
  }
  voiture(9.3, 9.24, "#93a5b8");     /* gris-bleu */
  /* une seule voiture : la seconde place reste libre (cadrage d'ensemble plus net) */

  return {};
}
