/* =====================================================================
   m-depannage.js — LE DÉPANNAGE DU GROUPE, SUR LE TOIT DU COMMERCE.
   Le voyant de défaut du groupe est allumé : un frigoriste est à
   genoux devant la baie de service, manifold à deux manomètres posé
   sur la dalle, flexibles bleu (BP) et rouge (HP) raccordés aux vannes
   de service, flexible jaune vers la bouteille de fluide sur sa balance.
   Mallette ouverte, plots et chevalet de balisage.

   Zone : depannage. Le corps du groupe reste à la zone « groupe »
   (m-commerce.js) ; ici on ne pose que ce qui l'entoure (z > −2,3),
   le petit coffret à voyant en léger débord sur sa face avant, et les
   flexibles qui entrent dans la baie de service.
   Repère : 1 unité = 1 m, x à droite, y en haut, z vers nous.
   ===================================================================== */
export function depannage(H) {
  const ZN = "depannage";
  const bx = H.bx, bxr = H.bxr, cy = H.cy, cyv = H.cyv, tube = H.tube, canal = H.canal;
  const sp = H.sp, proxy = H.proxy, ancre = H.ancre;
  const HD = 4.35;                    /* dalle de toit du commerce */
  const D2R = Math.PI / 180;

  const C = {
    marine: "#22324d", refl: "#d9e1e6", orange: "#e8914a", peau: "#f0d2b4", noir: "#2a313b",
    botte: "#1e2329", laiton: "#c8a24a", alu: "#c9ced6", acier: "#98a4b1", acierF: "#5c6875",
    bleu: "#2f6db5", rouge: "#d63a2f", jaune: "#f5c518", blanc: "#f7f5ef", cuir: "#3a2a1e"
  };

  /* =====================================================================
     1. LE TECHNICIEN — à genoux (genou droit au sol), buste penché vers
        la baie de service, face à −z. Repère local : u à sa droite (+x),
        v vers le haut, w devant lui (vers −z).
     ===================================================================== */
  const px = -4.45, pz = -1.65;
  const T = function (u, v, w) { return [px + u, HD + v, pz - w]; };
  const al = 32, sA = Math.sin(al * D2R), cA = Math.cos(al * D2R);
  /* point sur le buste : u en travers, s le long du dos depuis le bassin, d en arrière du buste */
  const tor = function (u, s, d) { return T(u, 0.5 + s * cA + d * sA, s * sA - d * cA); };

  /* chaussures de sécurité : la gauche à plat devant, la droite repliée (bout au sol, semelle vers nous) */
  {
    const bl = T(-0.11, 0.055, 0.48);
    bx(ZN, C.botte, bl[0] - 0.058, bl[0] + 0.058, HD + 0.015, HD + 0.11, bl[2] - 0.13, bl[2] + 0.13, { edge: 1 });
    bx(ZN, "#3a424c", bl[0] - 0.062, bl[0] + 0.062, HD, HD + 0.03, bl[2] - 0.135, bl[2] + 0.135);
    sp(ZN, C.botte, bl[0], HD + 0.055, bl[2] - 0.13, 0.058, 0.05, 0.04, { seg: 8, seg2: 5 });
    bx(ZN, "#9aa3ad", bl[0] - 0.04, bl[0] + 0.04, HD + 0.1, HD + 0.112, bl[2] + 0.02, bl[2] + 0.06);   /* languette */
    const br = T(0.10, 0.0, -0.36);
    bx(ZN, C.botte, br[0] - 0.058, br[0] + 0.058, HD + 0.01, HD + 0.21, br[2] - 0.07, br[2] + 0.04, { edge: 1 });
    bx(ZN, "#3a424c", br[0] - 0.062, br[0] + 0.062, HD, HD + 0.2, br[2] + 0.04, br[2] + 0.062);
    [0.04, 0.09, 0.14].forEach(function (y) { bx(ZN, C.botte, br[0] - 0.05, br[0] + 0.05, HD + y, HD + y + 0.02, br[2] + 0.062, br[2] + 0.076); });
    bx(ZN, C.botte, br[0] - 0.056, br[0] + 0.056, HD + 0.15, HD + 0.21, br[2] + 0.062, br[2] + 0.095);  /* talon */
  }
  /* jambes : cuisse, genou, tibia, bande réfléchissante sur le tibia, genouillère */
  function jambe(hip, knee, ankle) {
    tube(ZN, C.marine, hip[0], hip[1], hip[2], knee[0], knee[1], knee[2], 0.088, { seg: 10 });
    sp(ZN, C.marine, hip[0], hip[1], hip[2], 0.09, 0.09, 0.09, { seg: 10, seg2: 6 });
    sp(ZN, C.marine, knee[0], knee[1], knee[2], 0.088, 0.088, 0.088, { seg: 10, seg2: 6 });
    tube(ZN, C.marine, knee[0], knee[1], knee[2], ankle[0], ankle[1], ankle[2], 0.072, { seg: 10 });
    const p = function (t) { return [knee[0] + (ankle[0] - knee[0]) * t, knee[1] + (ankle[1] - knee[1]) * t, knee[2] + (ankle[2] - knee[2]) * t]; };
    const a = p(0.6), b = p(0.72);
    tube(ZN, C.refl, a[0], a[1], a[2], b[0], b[1], b[2], 0.075, { seg: 10 });
  }
  jambe(T(0.10, 0.5, 0), T(0.10, 0.08, 0.02), T(0.10, 0.2, -0.36));
  jambe(T(-0.10, 0.5, 0), T(-0.11, 0.5, 0.40), T(-0.11, 0.12, 0.42));
  {
    const k = T(0.10, 0.0, 0.02);
    bx(ZN, C.noir, k[0] - 0.07, k[0] + 0.07, HD, HD + 0.05, k[2] - 0.09, k[2] + 0.09, { edge: 1 });   /* genouillère au sol */
    const g = T(-0.11, 0.5, 0.465);
    sp(ZN, C.noir, g[0], g[1], g[2], 0.07, 0.085, 0.04, { seg: 8, seg2: 6 });                           /* genouillère devant */
  }
  /* bassin, ceinture porte-outils (pochettes dans le dos) */
  sp(ZN, C.marine, px, HD + 0.5, pz, 0.19, 0.12, 0.13, { seg: 10, seg2: 6 });
  {
    const b = tor(0, 0.06, 0);
    bxr(ZN, C.cuir, b[0], b[1], b[2], 0.43, 0.065, 0.25, -al, 0, 0);
    [[0.13, 0.11], [-0.11, 0.1]].forEach(function (q) {
      const c = tor(q[0], 0.05, 0.14);
      bxr(ZN, "#5a4030", c[0], c[1], c[2], q[1], 0.13, 0.06, -al, 0, 0);
    });
    const c = tor(-0.11, 0.13, 0.145);
    bxr(ZN, C.jaune, c[0], c[1], c[2], 0.022, 0.1, 0.02, -al, 0, 0);       /* manche d'une pince */
    const d = tor(0.13, 0.14, 0.15);
    bxr(ZN, C.rouge, d[0], d[1], d[2], 0.022, 0.09, 0.02, -al, 0, 0);      /* manche d'un tournevis */
  }
  /* buste : veste marine, bandes réfléchissantes en H dans le dos, empiècement orange aux épaules */
  {
    const t = tor(0, 0.27, 0);
    bxr(ZN, C.marine, t[0], t[1], t[2], 0.40, 0.52, 0.23, -al, 0, 0);
    [0.17, 0.33].forEach(function (s) {
      const c = tor(0, s, 0);
      bxr(ZN, C.refl, c[0], c[1], c[2], 0.408, 0.04, 0.238, -al, 0, 0);
    });
    [-0.12, 0.12].forEach(function (u) {
      const c = tor(u, 0.30, 0.118);
      bxr(ZN, C.refl, c[0], c[1], c[2], 0.04, 0.44, 0.008, -al, 0, 0);
    });
    const e = tor(0, 0.47, 0);
    bxr(ZN, C.orange, e[0], e[1], e[2], 0.406, 0.1, 0.236, -al, 0, 0);
    const p = tor(0.08, 0.09, 0.121);
    bxr(ZN, "#1b2a40", p[0], p[1], p[2], 0.13, 0.09, 0.008, -al, 0, 0);   /* poche plaquée */
    [-0.215, 0.215].forEach(function (u) {
      const s = tor(u, 0.47, 0);
      sp(ZN, C.marine, s[0], s[1], s[2], 0.075, 0.075, 0.075, { seg: 8, seg2: 6 });
    });
  }
  /* cou, tête penchée vers la baie, casquette, oreilles, lunettes */
  {
    const nt = tor(0, 0.55, -0.01);
    tube(ZN, C.peau, nt[0], nt[1] - 0.06, nt[2], nt[0], nt[1] + 0.05, nt[2], 0.046, { seg: 8 });
    const hc = [nt[0], nt[1] + 0.1, nt[2] - 0.045];
    sp(ZN, C.peau, hc[0], hc[1], hc[2], 0.092, 0.108, 0.1, { seg: 12, seg2: 8 });
    sp(ZN, "#1b3a63", hc[0], hc[1] + 0.035, hc[2] + 0.01, 0.105, 0.088, 0.112, { seg: 12, seg2: 8 });
    bxr(ZN, "#1b3a63", hc[0], hc[1] + 0.045, hc[2] - 0.125, 0.15, 0.014, 0.09, -12, 0, 0);
    bx(ZN, C.orange, hc[0] - 0.014, hc[0] + 0.014, hc[1] + 0.02, hc[1] + 0.085, hc[2] + 0.1, hc[2] + 0.112);
    [-1, 1].forEach(function (s) {
      sp(ZN, C.peau, hc[0] + s * 0.095, hc[1] - 0.012, hc[2] + 0.005, 0.014, 0.03, 0.022, { seg: 6, seg2: 4 });
      bxr(ZN, "#8fd3c6", hc[0] + s * 0.045, hc[1] - 0.005, hc[2] - 0.098, 0.075, 0.042, 0.01, 0, 0, 0, { t: 0.5 });
      bx(ZN, C.noir, hc[0] + s * 0.045 - 0.04, hc[0] + s * 0.045 + 0.04, hc[1] + 0.017, hc[1] + 0.024, hc[2] - 0.104, hc[2] - 0.094);
      tube(ZN, C.noir, hc[0] + s * 0.085, hc[1] - 0.003, hc[2] - 0.09, hc[0] + s * 0.098, hc[1] - 0.003, hc[2] + 0.0, 0.004, { seg: 4 });
    });
    bx(ZN, C.noir, hc[0] - 0.012, hc[0] + 0.012, hc[1] - 0.005, hc[1] + 0.005, hc[2] - 0.104, hc[2] - 0.094);
  }
  /* bras à deux segments (cinématique inverse), manche marine, gant orange à manchette */
  function bras(S, Hd, bend) {
    const a = 0.30, b = 0.28;
    let L = Math.hypot(Hd[0] - S[0], Hd[1] - S[1], Hd[2] - S[2]);
    const n = [(Hd[0] - S[0]) / L, (Hd[1] - S[1]) / L, (Hd[2] - S[2]) / L];
    if (L > a + b - 0.01) { L = a + b - 0.01; Hd = [S[0] + n[0] * L, S[1] + n[1] * L, S[2] + n[2] * L]; }
    const xx = (a * a - b * b + L * L) / (2 * L), hh = Math.sqrt(Math.max(0, a * a - xx * xx));
    const dot = bend[0] * n[0] + bend[1] * n[1] + bend[2] * n[2];
    const p = [bend[0] - n[0] * dot, bend[1] - n[1] * dot, bend[2] - n[2] * dot];
    const pl = Math.hypot(p[0], p[1], p[2]) || 1;
    const E = [S[0] + n[0] * xx + p[0] / pl * hh, S[1] + n[1] * xx + p[1] / pl * hh, S[2] + n[2] * xx + p[2] / pl * hh];
    const W = [E[0] + (Hd[0] - E[0]) * 0.78, E[1] + (Hd[1] - E[1]) * 0.78, E[2] + (Hd[2] - E[2]) * 0.78];
    tube(ZN, C.marine, S[0], S[1], S[2], E[0], E[1], E[2], 0.053, { seg: 8 });
    sp(ZN, C.marine, E[0], E[1], E[2], 0.054, 0.054, 0.054, { seg: 8, seg2: 6 });
    tube(ZN, C.marine, E[0], E[1], E[2], W[0], W[1], W[2], 0.047, { seg: 8 });
    const m = [E[0] + (W[0] - E[0]) * 0.5, E[1] + (W[1] - E[1]) * 0.5, E[2] + (W[2] - E[2]) * 0.5];
    tube(ZN, C.refl, m[0], m[1], m[2], m[0] + (W[0] - E[0]) * 0.18, m[1] + (W[1] - E[1]) * 0.18, m[2] + (W[2] - E[2]) * 0.18, 0.05, { seg: 8 });
    tube(ZN, C.noir, W[0], W[1], W[2], W[0] + (Hd[0] - W[0]) * 0.3, W[1] + (Hd[1] - W[1]) * 0.3, W[2] + (Hd[2] - W[2]) * 0.3, 0.052, { seg: 8 });
    tube(ZN, C.orange, W[0] + (Hd[0] - W[0]) * 0.3, W[1] + (Hd[1] - W[1]) * 0.3, W[2] + (Hd[2] - W[2]) * 0.3, Hd[0], Hd[1], Hd[2], 0.05, { seg: 8 });
    sp(ZN, C.orange, Hd[0], Hd[1], Hd[2], 0.056, 0.05, 0.058, { seg: 8, seg2: 6 });
  }
  /* la main droite tient le flexible bleu à l'entrée de la baie ; la gauche repose sur le genou */
  const prise = [-4.10, 5.0, -2.36];
  bras(tor(0.23, 0.47, 0), prise, [0.5, -0.3, 0.8]);
  bras(tor(-0.23, 0.47, 0), T(-0.10, 0.62, 0.52), [-1, -0.3, 0.4]);

  /* =====================================================================
     2. LE MANIFOLD À DEUX MANOMÈTRES, posé sur la dalle devant la baie
     ===================================================================== */
  const mx = -3.95, mz = -2.05;
  const me = 0.19;                    /* demi-largeur du corps */
  [-0.13, 0.13].forEach(function (u) {
    bx(ZN, C.noir, mx + u - 0.03, mx + u + 0.03, HD, HD + 0.06, mz - 0.03, mz + 0.03);        /* pieds caoutchouc */
  });
  bx(ZN, C.alu, mx - me, mx + me, HD + 0.06, HD + 0.14, mz - 0.04, mz + 0.04, { edge: 1 });   /* corps alu */
  bx(ZN, "#aab3bd", mx - me, mx + me, HD + 0.06, HD + 0.075, mz - 0.042, mz + 0.042);
  /* cadran : tour coloré, face claire, graduations, aiguille en fine boîte */
  function cadran(cx, coul, face, theta) {
    const cyy = HD + 0.215, r = 0.08;
    cy(ZN, coul, cx, cyy, mz, r, 0.05, { axe: "z", seg: 16 });
    cy(ZN, C.noir, cx, cyy, mz + 0.026, r * 0.92, 0.006, { axe: "z", seg: 16 });
    cy(ZN, face, cx, cyy, mz + 0.031, r * 0.8, 0.006, { axe: "z", seg: 16 });
    for (let k = 0; k <= 8; k++) {
      const a = (-135 + k * 33.75) * D2R;
      bxr(ZN, k % 4 === 0 ? coul : C.noir, cx + Math.sin(a) * r * 0.64, cyy + Math.cos(a) * r * 0.64, mz + 0.036, 0.0045, 0.016, 0.003, 0, 0, -(-135 + k * 33.75));
    }
    const L = 0.056, t = theta * D2R;
    bxr(ZN, C.noir, cx + Math.sin(t) * L / 2, cyy + Math.cos(t) * L / 2, mz + 0.04, 0.007, L, 0.004, 0, 0, -theta);
    bxr(ZN, C.noir, cx - Math.sin(t) * 0.012, cyy - Math.cos(t) * 0.012, mz + 0.04, 0.007, 0.02, 0.004, 0, 0, -theta);
    cy(ZN, C.acier, cx, cyy, mz + 0.043, 0.009, 0.006, { axe: "z", seg: 8 });
  }
  cadran(mx - 0.097, C.bleu, "#eef6fb", -105);      /* BP bleu : aiguille presque au minimum */
  cadran(mx + 0.097, C.rouge, "#fbefec", 62);       /* HP rouge */
  /* voyant liquide au centre, robinets (volants) bleu et rouge, raccords */
  cy(ZN, C.laiton, mx, HD + 0.1, mz + 0.042, 0.03, 0.012, { axe: "z", seg: 12 });
  cy(ZN, "#cfe8f2", mx, HD + 0.1, mz + 0.05, 0.022, 0.012, { axe: "z", seg: 12 });
  [[-0.115, C.bleu], [0.115, C.rouge]].forEach(function (v) {
    cy(ZN, C.acierF, mx + v[0], HD + 0.1, mz + 0.06, 0.011, 0.04, { axe: "z", seg: 8 });
    cy(ZN, v[1], mx + v[0], HD + 0.1, mz + 0.085, 0.034, 0.024, { axe: "z", seg: 10 });
    cy(ZN, C.blanc, mx + v[0], HD + 0.1, mz + 0.098, 0.012, 0.004, { axe: "z", seg: 8 });
  });
  cy(ZN, C.laiton, mx - me - 0.025, HD + 0.1, mz, 0.017, 0.05, { axe: "x", seg: 8 });
  cy(ZN, C.laiton, mx + me + 0.025, HD + 0.1, mz, 0.017, 0.05, { axe: "x", seg: 8 });
  cyv(ZN, C.laiton, mx, HD + 0.035, HD + 0.06, mz, 0.015, { seg: 8 });
  bx(ZN, C.noir, mx - 0.012, mx + 0.012, HD + 0.14, HD + 0.23, mz - 0.03, mz - 0.01);          /* crochet de suspension */

  /* ---------- les flexibles ---------- */
  const R = 0.013;
  function raccord(p, coul) {
    sp(ZN, C.laiton, p[0], p[1], p[2], 0.024, 0.024, 0.024, { seg: 8, seg2: 6 });
    sp(ZN, coul, p[0], p[1], p[2], 0.019, 0.019, 0.019, { seg: 8, seg2: 6 });
  }
  /* bleu (BP) : du robinet bleu jusqu'à la vanne d'aspiration (x −4,06 ; z −3,5), tenu à la main à l'entrée de la baie */
  const bleu = [[-4.21, HD + 0.1, mz], [-4.27, HD + 0.14, -2.1], [-4.27, 4.62, -2.15], [-4.25, 4.8, -2.22], [-4.19, 4.92, -2.3], prise,
    [-4.07, 5.01, -2.55], [-4.04, 4.95, -2.8], [-4.04, 4.93, -3.1], [-4.04, 4.99, -3.3], [-4.05, 5.05, -3.44]];
  canal(ZN, C.bleu, bleu, R, { seg: 6 });
  raccord(bleu[bleu.length - 1], C.bleu);
  /* rouge (HP) : du robinet rouge jusqu'à la vanne de refoulement sur le dôme du compresseur (x −3,86 ; z −3,5) */
  const rouge = [[-3.70, HD + 0.1, mz], [-3.64, HD + 0.12, -2.08], [-3.6, 4.6, -2.14], [-3.56, 4.9, -2.25], [-3.56, 5.1, -2.42],
    [-3.6, 5.2, -2.75], [-3.7, 5.27, -3.1], [-3.78, 5.36, -3.35], [-3.83, 5.43, -3.44]];
  canal(ZN, C.rouge, rouge, R, { seg: 6 });
  raccord(rouge[rouge.length - 1], C.rouge);

  /* =====================================================================
     3. LA BOUTEILLE DE FLUIDE sur sa balance de charge ; flexible jaune
     ===================================================================== */
  const bxx = -3.3, bz = -1.8, yb = HD + 0.04;
  bx(ZN, C.noir, bxx - 0.19, bxx + 0.19, HD, yb, bz - 0.19, bz + 0.19, { edge: 1 });
  bx(ZN, "#1a2028", bxx - 0.075, bxx + 0.075, HD + 0.008, HD + 0.034, bz + 0.19, bz + 0.21);
  bx(ZN, "#9ef0a8", bxx - 0.06, bxx + 0.06, HD + 0.014, HD + 0.028, bz + 0.21, bz + 0.212, { lum: 1 });
  cyv(ZN, "#6b727a", bxx, yb, yb + 0.03, bz, 0.126, { seg: 16 });                          /* pied */
  cyv(ZN, "#e8791e", bxx, yb + 0.03, yb + 0.5, bz, 0.12, { seg: 16 });                     /* fût orange */
  cyv(ZN, C.blanc, bxx, yb + 0.2, yb + 0.33, bz, 0.1215, { seg: 16 });                     /* bande blanche */
  sp(ZN, "#e8791e", bxx, yb + 0.5, bz, 0.12, 0.075, 0.12, { seg: 16, seg2: 6 });           /* ogive */
  cyv(ZN, C.acier, bxx, yb + 0.55, yb + 0.64, bz, 0.035, { seg: 10 });
  cyv(ZN, C.acierF, bxx, yb + 0.57, yb + 0.61, bz, 0.07, { seg: 12 });                     /* collerette */
  cyv(ZN, C.laiton, bxx, yb + 0.64, yb + 0.7, bz, 0.04, { seg: 10 });                      /* bloc robinet */
  cyv(ZN, C.rouge, bxx, yb + 0.7, yb + 0.715, bz, 0.046, { seg: 10 });                     /* volant */
  cy(ZN, C.laiton, bxx - 0.06, yb + 0.67, bz, 0.014, 0.07, { axe: "x", seg: 8 });          /* sortie */
  const jaune = [[bxx - 0.1, yb + 0.67, bz], [bxx - 0.17, yb + 0.66, bz + 0.02], [bxx - 0.23, yb + 0.5, bz + 0.05], [bxx - 0.27, yb + 0.25, bz + 0.1],
    [bxx - 0.3, HD + 0.012, bz + 0.18], [-3.5, HD + 0.012, -1.85], [-3.7, HD + 0.012, -1.88], [mx + 0.08, HD + 0.012, -1.97], [mx + 0.01, HD + 0.015, mz + 0.05], [mx, HD + 0.03, mz]];
  canal(ZN, C.jaune, jaune, R, { seg: 6 });
  raccord(jaune[0], C.jaune);

  /* =====================================================================
     4. LA MALLETTE À OUTILS, ouverte (couvercle relevé vers le groupe)
     ===================================================================== */
  {
    const cx = -5.4, cz = -1.8, hw = 0.25, hd = 0.17, hh = 0.12, ep = 0.018;
    bx(ZN, C.noir, cx - hw, cx + hw, HD, HD + 0.02, cz - hd, cz + hd, { edge: 1 });
    bx(ZN, C.noir, cx - hw, cx + hw, HD, HD + hh, cz + hd - ep, cz + hd, { edge: 1 });
    bx(ZN, C.noir, cx - hw, cx + hw, HD, HD + hh, cz - hd, cz - hd + ep, { edge: 1 });
    bx(ZN, C.noir, cx - hw, cx - hw + ep, HD, HD + hh, cz - hd, cz + hd, { edge: 1 });
    bx(ZN, C.noir, cx + hw - ep, cx + hw, HD, HD + hh, cz - hd, cz + hd, { edge: 1 });
    bx(ZN, "#3a424c", cx - hw + ep, cx + hw - ep, HD + 0.02, HD + 0.1, cz - hd + ep, cz + hd - ep);      /* mousse */
    [-0.12, 0.12].forEach(function (u) { bx(ZN, C.alu, cx + u - 0.025, cx + u + 0.025, HD + 0.07, HD + 0.115, cz + hd, cz + hd + 0.012); });
    bx(ZN, C.noir, cx - 0.06, cx + 0.06, HD + 0.07, HD + 0.085, cz + hd, cz + hd + 0.035);               /* poignée */
    /* couvercle : charnière au dos, ouvert à 105°, mousse et outils sur sa face intérieure */
    const ph = 105, sP = Math.sin(ph * D2R), cP = Math.cos(ph * D2R);
    const L = function (u, s, d) { return [cx + u, HD + hh + s * sP + d * -cP, cz - hd + s * cP + d * sP]; };
    const c0 = L(0, hd, -0.02);
    bxr(ZN, C.noir, c0[0], c0[1], c0[2], 2 * hw, 0.04, 2 * hd, -ph, 0, 0, { edge: 0 });
    const c1 = L(0, hd, 0.012);
    bxr(ZN, "#3a424c", c1[0], c1[1], c1[2], 2 * hw - 0.04, 0.024, 2 * hd - 0.04, -ph, 0, 0);
    [[-0.15, 0.08, C.orange], [-0.06, 0.1, C.jaune], [0.04, 0.09, C.rouge], [0.13, 0.1, C.bleu]].forEach(function (o) {
      const c = L(o[0], 0.17, 0.03);
      bxr(ZN, o[2], c[0], c[1], c[2], 0.035, 0.2, 0.025, -ph, 0, 0);       /* tournevis rangés dans leurs élastiques */
    });
    [0.1, 0.24].forEach(function (s) {
      const c = L(0, s, 0.026);
      bxr(ZN, "#5c6875", c[0], c[1], c[2], 0.44, 0.012, 0.008, -ph, 0, 0);
    });
    /* pince ampèremétrique : corps jaune, écran allumé, mâchoire en anneau */
    const y1 = HD + 0.1;
    bx(ZN, C.jaune, cx - 0.1, cx + 0.06, y1, y1 + 0.032, cz - 0.1, cz - 0.04, { edge: 1 });
    bx(ZN, "#b9f0c0", cx - 0.04, cx + 0.03, y1 + 0.032, y1 + 0.034, cz - 0.092, cz - 0.05, { lum: 1 });
    bx(ZN, C.noir, cx - 0.1, cx - 0.06, y1 + 0.004, y1 + 0.03, cz - 0.1, cz - 0.04);
    const jc = [cx - 0.145, y1 + 0.012, cz - 0.07], jr = 0.04, jp = [];
    for (let k = 0; k <= 10; k++) jp.push([jc[0] + Math.cos(k * 2 * Math.PI / 10) * jr, jc[1], jc[2] + Math.sin(k * 2 * Math.PI / 10) * jr]);
    canal(ZN, C.noir, jp, 0.011, { seg: 5 });
    /* détecteur de fuites, clé à cliquet, coupe-tube */
    tube(ZN, C.orange, cx + 0.1, y1 + 0.012, cz - 0.1, cx + 0.2, y1 + 0.012, cz - 0.02, 0.016, { seg: 8 });
    tube(ZN, C.noir, cx + 0.2, y1 + 0.012, cz - 0.02, cx + 0.225, y1 + 0.012, cz + 0.005, 0.006, { seg: 5 });
    tube(ZN, C.acier, cx + 0.04, y1 + 0.01, cz + 0.06, cx + 0.2, y1 + 0.01, cz + 0.1, 0.01, { seg: 6 });
    cy(ZN, C.acier, cx + 0.04, y1 + 0.01, cz + 0.06, 0.026, 0.02, { axe: "y", seg: 8 });
    cy(ZN, C.acier, cx - 0.1, y1 + 0.02, cz + 0.08, 0.03, 0.036, { axe: "y", seg: 10 });
    bx(ZN, C.rouge, cx - 0.13, cx - 0.07, y1 + 0.0, y1 + 0.016, cz + 0.12, cz + 0.14);
  }

  /* =====================================================================
     5. LE SIGNE DE LA PANNE : voyant rouge allumé sur un petit coffret
        posé en léger débord sur la face avant du groupe
     ===================================================================== */
  {
    const x0 = -5.78, x1 = -5.34, y0 = 5.69, y1 = 5.84, z0 = -2.4, z1 = -2.33;
    bx(ZN, "#d3d8de", x0, x1, y0, y1, z0, z1, { edge: 1 });
    bx(ZN, "#9aa3ad", x0 - 0.01, x1 + 0.01, y1 - 0.01, y1 + 0.004, z0, z1 + 0.004);
    [[x0 + 0.02, y0 + 0.02], [x1 - 0.02, y0 + 0.02], [x0 + 0.02, y1 - 0.02], [x1 - 0.02, y1 - 0.02]].forEach(function (v) {
      cy(ZN, C.acierF, v[0], v[1], z1 + 0.003, 0.007, 0.006, { axe: "z", seg: 6 });
    });
    [[-5.46, "#ff3b30", 1], [-5.58, "#9a6b1f", 0], [-5.7, "#2f6b3f", 0]].forEach(function (v) {
      cy(ZN, C.noir, v[0], 5.765, z1 + 0.004, 0.036, 0.012, { axe: "z", seg: 12 });
      cy(ZN, v[1], v[0], 5.765, z1 + 0.012, 0.028, 0.014, v[2] ? { axe: "z", seg: 12, lum: 1 } : { axe: "z", seg: 12 });
    });
    sp(ZN, "#ffd0cc", -5.46, 5.765, z1 + 0.02, 0.012, 0.012, 0.006, { seg: 6, seg2: 4, lum: 1 });
  }

  /* =====================================================================
     6. LE BALISAGE : deux plots orange et blancs, un chevalet jaune
        au pictogramme d'éclair dans un triangle (aucune lettre)
     ===================================================================== */
  function plot(x, z) {
    bx(ZN, C.noir, x - 0.17, x + 0.17, HD, HD + 0.025, z - 0.17, z + 0.17, { edge: 1 });
    const hs = [[0.025, 0.17, "#e8791e"], [0.17, 0.24, C.blanc], [0.24, 0.36, "#e8791e"], [0.36, 0.43, C.blanc], [0.43, 0.52, "#e8791e"]];
    const r = function (y) { return 0.11 - 0.08 * (y - 0.025) / 0.495; };
    hs.forEach(function (h) {
      cy(ZN, h[2], x, HD + (h[0] + h[1]) / 2, z, r(h[0]), h[1] - h[0], { rt: r(h[1]), seg: 12 });
    });
  }
  plot(-6.35, -0.75);
  plot(-2.75, -0.7);
  {
    const cx = -2.2, cz = -1.25, hy = HD + 0.62, th = 14, ln = 0.58;
    const sT = Math.sin(th * D2R), cT = Math.cos(th * D2R);
    const C0 = [cx, hy - ln / 2 * cT, cz + ln / 2 * sT];
    /* point du panneau avant : u en travers, v le long, d vers l'extérieur */
    const pan = function (u, v, d) { return [C0[0] + u, C0[1] + v * cT + d * sT, C0[2] - v * sT + d * cT]; };
    const f = pan(0, 0, -0.006);
    bxr(ZN, C.jaune, f[0], f[1], f[2], 0.34, ln, 0.012, -th, 0, 0);
    const r0 = [cx, hy - ln / 2 * cT, cz - ln / 2 * sT];
    bxr(ZN, C.jaune, r0[0], r0[1], r0[2], 0.34, ln, 0.012, th, 0, 0);
    bx(ZN, C.noir, cx - 0.17, cx + 0.17, hy - 0.012, hy + 0.012, cz - 0.012, cz + 0.012);
    [[-0.15, 1], [0.15, 1]].forEach(function (b) {
      bx(ZN, C.noir, cx + b[0] - 0.03, cx + b[0] + 0.03, HD, HD + 0.025, cz + ln * sT - 0.025, cz + ln * sT + 0.025);
      bx(ZN, C.noir, cx + b[0] - 0.03, cx + b[0] + 0.03, HD, HD + 0.025, cz - ln * sT - 0.025, cz - ln * sT + 0.025);
    });
    /* pictogramme : triangle noir, éclair noir, posés sur la face avant */
    function barre(u, v, long, ang, ep) {
      const c = pan(u, v, 0.01);
      bxr(ZN, C.noir, c[0], c[1], c[2], long, ep, 0.006, -th, 0, ang);
    }
    barre(0, -0.05, 0.27, 0, 0.022);
    barre(-0.0675, 0.06, 0.2555, 59.4, 0.022);
    barre(0.0675, 0.06, 0.2555, -59.4, 0.022);
    barre(0.0, 0.07, 0.105, 61, 0.022);
    barre(0.0, 0.03, 0.075, 0, 0.02);
    barre(0.005, -0.005, 0.085, 54, 0.022);
  }

  /* =====================================================================
     7. LA ZONE CLIQUABLE, SON REPÈRE ET SA CAMÉRA
        (le groupe garde son propre proxy : rien ici ne dépasse z −2,3)
     ===================================================================== */
  proxy(ZN, -4.8, -4.0, HD, 5.75, -2.28, -1.12);          /* le technicien */
  proxy(ZN, -4.2, -3.1, HD, 5.5, -2.28, -1.55);           /* manifold, flexibles et bouteille */
  proxy(ZN, -5.68, -5.12, HD, 5.2, -2.1, -1.6);           /* la mallette et son couvercle */
  proxy(ZN, -2.4, -2.0, HD, HD + 0.66, -1.42, -1.08);     /* le chevalet de balisage */
  /* au-dessus du technicien ; assez haut pour que le repère ne se superpose pas à celui du groupe
     (−4,6 ; 6,35 ; −2,4), même vu de face ou de la vue d'ensemble */
  ancre(ZN, -4.8, 7.5, -1.4);

  return {
    "depannage": { zoom: 0.26, az: [-15, 35], el: 20, foyer: [-4.4, 5.0, -2.2] }
  };
}
