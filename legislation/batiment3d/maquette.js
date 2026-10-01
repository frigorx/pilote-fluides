/* =====================================================================
   LA MAQUETTE — le bâtiment réglementaire, construit à la main en
   géométrie procédurale (aucun modèle à télécharger).

   Un bâtiment tertiaire EN COUPE : façade avant ouverte, sous-sol
   technique, trois niveaux, toiture. Chaque zone du bâtiment est le
   décor d'une sous-ligne du réseau Législation.

   Économie : toute la géométrie statique est FUSIONNÉE par zone (une
   seule surface opaque + une surface vitrée par zone, couleurs portées
   par les sommets) -> une quarantaine d'appels de dessin pour tout le
   bâtiment. La surbrillance d'une zone teinte sa matière de la couleur
   de sa sous-ligne.

   Repère : 1 unité = 1 m. x vers la droite, y vers le haut, z vers le
   spectateur (façade avant ouverte en z = +4,5).
   ===================================================================== */

const P = {
  bleu: "#1b3a63", papier: "#fffdf8",
  mur: "#f3eee3", murF: "#e4ddcd", beton: "#d6d2c6", betonF: "#b7bcc5",
  sol: "#dfe6d2", terre: "#cdbfa5", strate: "#b8a88a", plaque: "#efe9dc", plaqueB: "#cfc7b4",
  verre: "#a8cde3", cadre: "#4a5f78", acier: "#98a4b1", acierF: "#5c6875", gris: "#d9dde3",
  blanc: "#f7f5ef", noir: "#2a313b", cuivre: "#c98254", bois: "#dcc39a", boisF: "#b58f5e",
  feuille: "#a9c79a", feuilleF: "#86ad7a", isolant: "#f0cf6b", tuile: "#c9765a",
  or: "#d4a017"
};

/* Petit générateur pseudo-aléatoire : la maquette est identique à chaque chargement. */
function graine(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* defs : [{ id, lieu, couleur }] — les onze zones, fournies par batiment.js */
export function construireMaquette(THREE, defs) {
  const ZONES = defs, couleurs = {};
  defs.forEach(function (d) { couleurs[d.id] = d.couleur; });
  const { Vector3: V3, Color, Group, Mesh, BufferGeometry, BufferAttribute } = THREE;
  const racine = new Group();
  const alea = graine(20260930);

  /* ---------- registre des zones ---------- */
  const zones = {};
  ZONES.forEach(function (z) {
    zones[z.id] = {
      id: z.id, lieu: z.lieu, couleur: new Color(couleurs[z.id] || "#1b3a63"), glow: new Color(),
      mats: [], anims: [], proxies: [], ancre: new V3(), sceau: new V3(),
      hi: 0, cible: 0
    };
  });

  /* couleur d'éclairage : la couleur de la sous-ligne, éclaircie pour que la zone « s'allume » */
  ZONES.forEach(function (z) {
    const hsl = {};
    zones[z.id].couleur.getHSL(hsl);
    zones[z.id].glow.setHSL(hsl.h, hsl.s < 0.2 ? hsl.s : Math.max(hsl.s, 0.55), Math.min(0.62, Math.max(hsl.l, 0.46)));
  });

  /* ---------- fusion : seaux de sommets par (zone, type) ---------- */
  const seaux = new Map();
  const cc = new Map();
  function col(hex) {
    let c = cc.get(hex);
    if (!c) { c = new Color(hex); cc.set(hex, c); }
    return c;
  }
  const aretes = [];

  function pousser(zn, hex, g0, o) {
    o = o || {};
    const g = g0.index ? g0.toNonIndexed() : g0;
    const cle = (zn || "_") + "|" + (o.t || 1) + "|" + (o.lum ? "lum" : "");
    let b = seaux.get(cle);
    if (!b) { b = { zn: zn, t: o.t || 1, lum: !!o.lum, pos: [], nor: [], col: [] }; seaux.set(cle, b); }
    const p = g.attributes.position.array, n = g.attributes.normal.array, c = col(hex);
    for (let i = 0; i < p.length; i++) { b.pos.push(p[i]); b.nor.push(n[i]); }
    for (let i = 0; i < p.length / 3; i++) b.col.push(c.r, c.g, c.b);
    g.dispose();
    if (g0 !== g) g0.dispose();
  }

  function aretesBoite(x0, x1, y0, y1, z0, z1) {
    const s = [
      [x0, y0, z0, x1, y0, z0], [x0, y1, z0, x1, y1, z0], [x0, y0, z1, x1, y0, z1], [x0, y1, z1, x1, y1, z1],
      [x0, y0, z0, x0, y1, z0], [x1, y0, z0, x1, y1, z0], [x0, y0, z1, x0, y1, z1], [x1, y0, z1, x1, y1, z1],
      [x0, y0, z0, x0, y0, z1], [x1, y0, z0, x1, y0, z1], [x0, y1, z0, x0, y1, z1], [x1, y1, z0, x1, y1, z1]
    ];
    s.forEach(function (a) { aretes.push.apply(aretes, a); });
  }

  /* boîte définie par ses deux coins */
  function bx(zn, hex, x0, x1, y0, y1, z0, z1, o) {
    const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
    g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    pousser(zn, hex, g, o);
    if (o && o.edge) aretesBoite(x0, x1, y0, y1, z0, z1);
  }
  /* boîte tournée autour de son centre (angles en degrés, ordre X puis Y puis Z) */
  function bxr(zn, hex, cx, cy, cz, w, h, d, rx, ry, rz, o) {
    const g = new THREE.BoxGeometry(w, h, d);
    const e = new THREE.Euler((rx || 0) * Math.PI / 180, (ry || 0) * Math.PI / 180, (rz || 0) * Math.PI / 180);
    g.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(e));
    g.translate(cx, cy, cz);
    pousser(zn, hex, g, o);
  }
  /* cylindre centré, axe 'x' | 'y' | 'z' */
  function cy(zn, hex, x, y, z, r, h, o) {
    o = o || {};
    const g = new THREE.CylinderGeometry(o.rt == null ? r : o.rt, r, h, o.seg || 14, 1, !!o.open);
    if (o.axe === "x") g.rotateZ(Math.PI / 2); else if (o.axe === "z") g.rotateX(Math.PI / 2);
    g.translate(x, y, z);
    pousser(zn, hex, g, o);
  }
  /* cylindre vertical de y0 à y1 */
  function cyv(zn, hex, x, y0, y1, z, r, o) { cy(zn, hex, x, (y0 + y1) / 2, z, r, y1 - y0, o); }
  const _y = new V3(0, 1, 0);
  /* tube entre deux points (tuyaux, barres, câbles) */
  function tube(zn, hex, ax, ay, az, bx_, by, bz, r, o) {
    o = o || {};
    const d = new V3(bx_ - ax, by - ay, bz - az), L = d.length();
    const g = new THREE.CylinderGeometry(r, r, L, o.seg || 6, 1, false);
    g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(_y, d.normalize()));
    g.translate((ax + bx_) / 2, (ay + by) / 2, (az + bz) / 2);
    pousser(zn, hex, g, o);
  }
  /* ellipsoïde */
  function sp(zn, hex, x, y, z, rx, ry, rz, o) {
    const g = new THREE.SphereGeometry(1, (o && o.seg) || 12, (o && o.seg2) || 8);
    g.scale(rx, ry == null ? rx : ry, rz == null ? rx : rz);
    g.translate(x, y, z);
    pousser(zn, hex, g, o);
  }
  /* polygone extrudé (points [x,y] dans le plan XY, profondeur selon z) */
  function ext(zn, hex, pts, prof, x, y, z, o) {
    const s = new THREE.Shape();
    pts.forEach(function (p, i) { if (i) s.lineTo(p[0], p[1]); else s.moveTo(p[0], p[1]); });
    const g = new THREE.ExtrudeGeometry(s, { depth: prof, bevelEnabled: false });
    g.translate(x, y, z);
    pousser(zn, hex, g, o);
  }

  function proxy(zn, x0, x1, y0, y1, z0, z1) {
    const m = new Mesh(new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0),
      new THREE.MeshBasicMaterial({ visible: false }));
    m.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    m.userData.zone = zn;
    racine.add(m);
    zones[zn].proxies.push(m);
  }
  function ancre(zn, x, y, z) { zones[zn].ancre.set(x, y, z); zones[zn].sceau.set(x, y + 1.3, z); }

  const Z = { th: "regl-thermique", ac: "regl-acoustique", inc: "regl-incendie", el: "regl-electrique",
              fl: "regl-fluidique", de: "regl-desp", ce: "regl-certifs", tr: "regl-travail",
              ri: "secu-risques", dc: "secu-dechets", im: "secu-impact" };
  const cz = function (zn) { return couleurs[zn] || "#1b3a63"; };

  const FZ = 2.8;      /* plan de coupe : la façade avant ouverte */
  const ZB = -0.4;     /* fond de la trémie d'escalier (l'escalier se tient au plan de coupe) */

  /* =====================================================================
     1. LE SOCLE : plaque de maquette, terrain en coupe, sous-sol
     ===================================================================== */
  bx(null, P.plaque, -17, 16.6, -4.4, -3.7, -11.6, FZ + 0.9, { edge: 1 });
  bx(null, P.plaqueB, -17, 16.6, -4.4, -4.25, -11.6, FZ + 0.9);
  /* terrain : trois blocs autour de la fosse, coupés au plan z = 4,5 */
  [[-16, -8, -11, FZ], [8, 16, -11, FZ], [-8, 8, -11, -4.5]].forEach(function (b) {
    bx(null, P.terre, b[0], b[1], -3.7, -0.12, b[2], b[3], { edge: 1 });
    bx(null, P.sol, b[0], b[1], -0.12, 0, b[2], b[3], { edge: 1 });
  });
  /* strates du terrain sur la coupe */
  [-1.0, -1.9, -2.9].forEach(function (y, i) {
    [[-16, -8.3], [8.3, 16]].forEach(function (b) {
      bx(null, i === 1 ? "#a99a7d" : P.strate, b[0], b[1], y, y + 0.07, FZ, FZ + 0.03);
    });
  });
  /* dalle basse du sous-sol + murs du sous-sol */
  bx(null, P.beton, -8, 8, -3.7, -3.4, -4.5, FZ, { edge: 1 });
  bx(null, P.bleu, -8, 8, -3.7, -3.4, FZ, FZ + 0.06);
  bx(null, P.betonF, -8, 8, -3.4, 0, -4.5, -4.2);
  bx(null, P.betonF, -8, -7.7, -3.4, 0, -4.2, FZ);
  bx(null, P.betonF, 7.7, 8, -3.4, 0, -4.2, FZ);
  bx(null, P.bleu, -8, -7.7, -3.4, 0, FZ, FZ + 0.06);
  bx(null, P.bleu, 7.7, 8, -3.4, 0, FZ, FZ + 0.06);
  /* sol fini du sous-sol */
  bx(null, "#e3dfd3", -7.7, 7.7, -3.4, -3.37, -4.2, FZ);

  /* =====================================================================
     2. DALLES DES PLANCHERS (trémie d'escalier x -7,7..-4,1 / z -4,2..-1)
     ===================================================================== */
  const NIV = [0, 3.4, 6.8];               /* niveaux hors sol : rez-de-chaussée, N1, N2 */
  function dalle(y0, y1) {
    bx(null, P.beton, -7.7, 7.7, y0, y1, -4.2, ZB, { edge: 1 });
    bx(null, P.beton, -4.1, 7.7, y0, y1, ZB, FZ, { edge: 1 });
    bx(null, P.bleu, -4.1, 7.7, y0, y1, FZ, FZ + 0.06);        /* la coupe en bleu nuit */
    bx(null, "#ece7db", -7.7, 7.7, y1, y1 + 0.02, -4.2, ZB);
    bx(null, "#ece7db", -4.1, 7.7, y1, y1 + 0.02, ZB, FZ);
  }
  dalle(-0.3, 0); dalle(3.1, 3.4); dalle(6.5, 6.8);
  dalle(9.9, 10.2);

  /* =====================================================================
     3. L'ENVELOPPE (regl-thermique) : murs, vitrages, isolant, brise-soleil
     ===================================================================== */
  const YS = NIV;
  /* fenêtres par niveau : centres et largeurs le long du mur */
  const FEN_DROIT = [-3.35, -1.6, 0.15, 1.9].map(function (c) { return { c: c, w: 1.5 }; });
  const FEN_GAUCHE = [-2.6, 1.2].map(function (c) { return { c: c, w: 1.4 }; });
  const FEN_FOND = [
    [{ c: -5.8, w: 1.4 }, { c: -2.2, w: 2.2 }, { c: 1.5, w: 2.2 }, { c: 5.2, w: 2.2 }],
    [{ c: -5.8, w: 1.4 }, { c: -2.2, w: 2.0 }],
    [{ c: -5.8, w: 1.4 }, { c: 5.4, w: 2.4 }]
  ];
  function murV(axe, a0, a1, f0, f1, fen) {
    /* variante : vitrages en verre transparent, le reste en boîtes opaques */
    const R = axe === "x"
      ? function (h, u0, u1, y0, y1, ep, o) { bx(Z.th, h, u0, u1, y0, y1, ep ? ep[0] : f0, ep ? ep[1] : f1, o); }
      : function (h, u0, u1, y0, y1, ep, o) { bx(Z.th, h, ep ? ep[0] : f0, ep ? ep[1] : f1, y0, y1, u0, u1, o); };
    const centre = (f0 + f1) / 2;
    YS.forEach(function (y0, i) {
      const yA = y0 + 0.6, yB = y0 + 2.7, y1 = i === 2 ? 11.0 : y0 + 3.4;
      const liste = (fen[i] || []).slice().sort(function (p, q) { return p.c - q.c; });
      let cur = a0;
      liste.forEach(function (w) {
        const u0 = w.c - w.w / 2, u1 = w.c + w.w / 2;
        R(P.mur, cur, u0, y0, y1);
        R(P.mur, u0, u1, y0, yA);
        R(P.mur, u0, u1, yB, y1);
        R(P.verre, u0, u1, yA, yB, [centre - 0.02, centre + 0.02], { t: 0.42 });
        const e2 = [centre - 0.08, centre + 0.08];
        R(P.cadre, u0, u0 + 0.06, yA, yB, e2); R(P.cadre, u1 - 0.06, u1, yA, yB, e2);
        R(P.cadre, u0, u1, yA, yA + 0.06, e2); R(P.cadre, u0, u1, yB - 0.06, yB, e2);
        R(P.cadre, (u0 + u1) / 2 - 0.025, (u0 + u1) / 2 + 0.025, yA, yB, e2);
        cur = u1;
      });
      R(P.mur, cur, a1, y0, y1);
    });
  }
  const ident = function (l) { return [l, l, l]; };
  murV("x", -8, 8, -4.5, -4.2, FEN_FOND);
  murV("z", -4.2, FZ, -8, -7.7, ident(FEN_GAUCHE));
  murV("z", -4.2, FZ, 7.7, 8, ident(FEN_DROIT));

  /* bandeaux de plancher sur la façade de droite + couvertines */
  NIV.forEach(function (y) { bx(Z.th, P.murF, 8.0, 8.04, y - 0.3, y, -4.5, FZ); });
  bx(Z.th, "#f6f4ee", 7.65, 8.05, 11.0, 11.06, -4.55, FZ);
  bx(Z.th, "#f6f4ee", -8.05, -7.65, 11.0, 11.06, -4.55, FZ);
  bx(Z.th, "#f6f4ee", -8.05, 8.05, 11.0, 11.06, -4.55, -4.15);
  /* la coupe des murs montre leurs couches : béton (bleu), isolant (jaune), parement */
  [[-8, -7.95, P.murF], [-7.95, -7.8, P.isolant], [-7.8, -7.7, P.bleu]].forEach(function (c) {
    bx(Z.th, c[2], c[0], c[1], 0, 11.0, FZ, FZ + 0.06);
  });
  [[7.95, 8, P.murF], [7.8, 7.95, P.isolant], [7.7, 7.8, P.bleu]].forEach(function (c) {
    bx(Z.th, c[2], c[0], c[1], 0, 11.0, FZ, FZ + 0.06);
  });
  /* la toiture en coupe : dalle, isolant épais, étanchéité */
  function couche(hex, y0, y1, edge) {
    bx(Z.th, hex, -7.7, 7.7, y0, y1, -4.2, ZB, { edge: edge });
    bx(Z.th, hex, -4.1, 7.7, y0, y1, ZB, FZ, { edge: edge });
  }
  couche(P.isolant, 10.2, 10.45, 1);
  couche("#7d8794", 10.45, 10.5, 0);
  /* brise-soleil : lames horizontales fines au-dessus des fenêtres de la façade de droite */
  [0.15, 1.9].forEach(function (zc) {
    YS.forEach(function (y0) {
      const yB = y0 + 2.7;
      for (let k = 0; k < 3; k++) {
        bxr(Z.th, "#d9cfb8", 8.5, yB + 0.16 + k * 0.13, zc, 0.95, 0.03, 1.62, 0, 0, -14);
      }
      bx(Z.th, P.cadre, 8.0, 8.5, yB + 0.02, yB + 0.05, zc - 0.82, zc - 0.78);
      bx(Z.th, P.cadre, 8.0, 8.5, yB + 0.02, yB + 0.05, zc + 0.78, zc + 0.82);
    });
  });
  ancre(Z.th, 8.0, 5.4, 1.1);
  /* zones cliquables : mur de droite (extérieur), vitrages du fond et de gauche, tranche du toit */
  proxy(Z.th, 7.7, 8.7, 0, 11.0, -0.5, FZ);
  proxy(Z.th, -8.05, -7.65, 0, 11.0, -4.2, FZ);
  YS.forEach(function (y0) {
    FEN_FOND.forEach(function (lv, i) { if (i === YS.indexOf(y0)) lv.forEach(function (w) { proxy(Z.th, w.c - w.w / 2, w.c + w.w / 2, y0 + 0.6, y0 + 2.7, -4.5, -4.1); }); });
  });
  proxy(Z.th, -7.7, 7.7, 10.2, 10.6, -4.2, FZ);

  /* =====================================================================
     4. ESCALIER, DÉSENFUMAGE, CLAPETS, SPRINKLER (regl-incendie)
     ===================================================================== */
  const LV = [-3.4, 0, 3.4, 6.8, 10.2];
  const NB = 9, HAUT = 1.7 / NB, RUN = 0.26;
  const IC0 = cz(Z.inc), VITRE_R = "#e9b3b3", CAD_R = "#7f2a2a";
  function volee(y0, sens, zA, zB2) {
    /* volée de 9 marches ; sens +1 : monte vers +x depuis x = -6,9 ; sens -1 : monte vers -x depuis x = -4,56 */
    const xs = sens > 0 ? -6.9 : -4.56;
    const pts = [[0, 0]];
    for (let i = 0; i < NB; i++) {
      pts.push([sens * i * RUN, (i + 1) * HAUT]);
      pts.push([sens * (i + 1) * RUN, (i + 1) * HAUT]);
    }
    pts.push([sens * NB * RUN, NB * HAUT - 0.3]);
    ext(Z.inc, "#dcd7ca", pts, zB2 - zA, xs, y0, zA, { edge: 0 });
    /* main courante côté vide */
    const zr = sens > 0 ? zB2 : zA;
    const xa = xs, xb = xs + sens * NB * RUN;
    tube(Z.inc, IC0, xa, y0 + 1.0, zr, xb, y0 + 1.0 + NB * HAUT, zr, 0.03, { seg: 5 });
    for (let k = 0; k <= 4; k++) {
      const u = k / 4;
      tube(Z.inc, IC0, xa + (xb - xa) * u, y0 + u * NB * HAUT, zr, xa + (xb - xa) * u, y0 + 1.0 + u * NB * HAUT, zr, 0.018, { seg: 4 });
    }
  }
  for (let st = 0; st < 4; st++) {
    const y0 = LV[st], yh = y0 + 1.7;
    /* paliers d'étage et intermédiaire */
    bx(Z.inc, P.beton, -7.7, -6.9, y0 - 0.2, y0, ZB, FZ, { edge: 1 });
    bx(Z.inc, P.beton, -4.56, -4.1, yh - 0.2, yh, ZB, FZ, { edge: 1 });
    volee(y0, +1, ZB + 0.05, ZB + 1.05);
    volee(yh, -1, FZ - 1.25, FZ - 0.25);
  }
  bx(Z.inc, P.beton, -7.7, -6.9, 10.0, 10.2, ZB, FZ, { edge: 1 });
  /* gaine de l'escalier : vitrage coupe-feu à l'avant et à droite, mur plein derrière */
  bx(Z.inc, "#e6dfd0", -7.7, -4.1, -3.4, 10.2, ZB - 0.1, ZB);
  LV.slice(0, 4).forEach(function (y0) {
    bx(Z.inc, VITRE_R, -7.7, -4.1, y0, y0 + 3.4, FZ - 0.03, FZ + 0.03, { t: 0.3 });
    bx(Z.inc, VITRE_R, -4.13, -4.07, y0, y0 + 3.4, ZB, FZ, { t: 0.3 });
    [-7.7, -5.9, -4.1].forEach(function (x) { bx(Z.inc, CAD_R, x - 0.04, x + 0.04, y0, y0 + 3.4, FZ - 0.05, FZ + 0.05); });
    [ZB, (ZB + FZ) / 2, FZ].forEach(function (z) { bx(Z.inc, CAD_R, -4.15, -4.05, y0, y0 + 3.4, z - 0.04, z + 0.04); });
    bx(Z.inc, CAD_R, -7.7, -4.1, y0 + 3.3, y0 + 3.4, FZ - 0.05, FZ + 0.05);
    bx(Z.inc, CAD_R, -7.7, -4.1, y0 + 1.0, y0 + 1.06, FZ - 0.05, FZ + 0.05);
    bx(Z.inc, CAD_R, -4.15, -4.05, y0 + 3.3, y0 + 3.4, ZB, FZ);
    bx(Z.inc, CAD_R, -4.15, -4.05, y0 + 1.0, y0 + 1.06, ZB, FZ);
    /* porte coupe-feu et sortie de secours */
    bx(Z.inc, IC0, -7.5, -6.7, y0, y0 + 2.1, FZ - 0.06, FZ + 0.08);
    bx(Z.inc, "#f5d9d9", -7.4, -7.3, y0 + 1.2, y0 + 1.75, FZ + 0.08, FZ + 0.1);
    bx(Z.inc, "#2a313b", -6.85, -6.78, y0 + 1.0, y0 + 1.15, FZ + 0.08, FZ + 0.14);
    bx(Z.inc, "#39c77a", -7.28, -6.92, y0 + 2.25, y0 + 2.45, FZ - 0.04, FZ + 0.05, { lum: 1 });
    bx(Z.inc, "#ffffff", -7.14, -7.06, y0 + 2.29, y0 + 2.41, FZ + 0.05, FZ + 0.07, { lum: 1 });
  });
  /* sprinkler : colonne montante + rampes + têtes */
  tube(Z.inc, IC0, -3.7, -3.2, -1.55, -3.7, 10.0, -1.55, 0.07, { seg: 8 });
  [0, 1, 2].forEach(function (i) {
    const y = NIV[i] + 2.88;
    tube(Z.inc, IC0, -3.7, y, -1.55, 7.4, y, -1.55, 0.05, { seg: 7 });
    [-2.0, 0.6, 3.2, 5.8].forEach(function (x) {
      tube(Z.inc, IC0, x, y, -1.55, x, y - 0.14, -1.55, 0.022, { seg: 5 });
      cy(Z.inc, "#ffffff", x, y - 0.17, -1.55, 0.07, 0.015, { seg: 10 });
      sp(Z.inc, "#e34a3a", x, y - 0.12, -1.55, 0.03, 0.04, 0.03, { seg: 6, seg2: 5 });
    });
    /* détecteur de fumée */
    cy(Z.inc, "#f7f5ef", -1.0, y + 0.06, 0.4, 0.11, 0.05, { seg: 12 });
    cy(Z.inc, "#e34a3a", -1.0, y + 0.03, 0.4, 0.025, 0.02, { seg: 6 });
    /* déclencheur manuel + extincteur sur le mur de la gaine */
    bx(Z.inc, "#d63a2f", -3.95, -3.83, NIV[i] + 1.15, NIV[i] + 1.3, 2.0, 2.2);
    cyv(Z.inc, "#d63a2f", -3.6, NIV[i], NIV[i] + 0.55, 1.2, 0.09, { seg: 10 });
    cyv(Z.inc, "#2a313b", -3.6, NIV[i] + 0.55, NIV[i] + 0.62, 1.2, 0.05, { seg: 8 });
  });
  /* gaine de ventilation avec ses deux clapets coupe-feu (niveau 1) */
  bx(Z.inc, "#b4bcc6", -4.0, 7.4, 6.05, 6.45, -3.9, -3.3, { edge: 1 });
  [1.0, 7.2].forEach(function (x) {
    bx(Z.inc, IC0, x - 0.14, x + 0.14, 6.0, 6.5, -3.95, -3.25);
    bx(Z.inc, "#2a313b", x - 0.06, x + 0.06, 6.5, 6.62, -3.75, -3.45);
    bx(Z.inc, "#f2a03d", x - 0.2, x - 0.14, 6.05, 6.3, -3.75, -3.45);
  });
  /* cage d'escalier en toiture avec exutoire de désenfumage */
  bx(Z.inc, "#efe9dc", -7.7, -4.1, 10.2, 12.0, FZ - 0.1, FZ, { edge: 1 });
  bx(Z.inc, "#efe9dc", -4.2, -4.1, 10.2, 12.0, ZB, FZ);
  bx(Z.inc, "#efe9dc", -7.7, -7.6, 10.2, 12.0, ZB, FZ);
  bx(Z.inc, "#efe9dc", -7.7, -4.1, 10.2, 12.0, ZB, ZB + 0.1);
  bx(Z.inc, P.bleu, -7.75, -4.05, 12.0, 12.25, ZB - 0.05, FZ + 0.05, { edge: 1 });
  bx(Z.inc, IC0, -7.4, -6.6, 10.2, 11.9, FZ, FZ + 0.12);
  for (let k = 0; k < 6; k++) bx(Z.inc, "#5c6875", -6.3, -4.5, 11.2 + k * 0.14, 11.27 + k * 0.14, FZ, FZ + 0.1);
  /* exutoire : cadre + vantail ouvert */
  bx(Z.inc, "#5c6875", -6.7, -5.1, 12.25, 12.45, 0.0, 1.6);
  bxr(Z.inc, IC0, -5.9, 12.95, -0.15, 1.6, 0.07, 1.4, 55, 0, 0);
  ancre(Z.inc, -5.9, 3.4, FZ - 0.1); zones[Z.inc].sceau.set(-5.9, 14.6, 0.8);
  proxy(Z.inc, -7.7, -4.0, -3.4, 12.25, ZB, FZ + 0.1);
  proxy(Z.inc, -6.8, -5.0, 12.25, 13.9, -0.9, 1.7);
  NIV.forEach(function (y) { proxy(Z.inc, -3.95, 7.5, y + 2.6, y + 3.05, -1.85, -1.25); });
  proxy(Z.inc, -4.3, 7.5, 5.95, 6.65, -4.0, -3.2);

  /* =====================================================================
     5. LOCAL TECHNIQUE : groupe frigorifique + bouteilles (regl-fluidique)
     ===================================================================== */
  const YB = -3.4;
  /* groupe frigorifique : châssis, deux viroles, compresseurs, armoire */
  bx(Z.fl, P.acierF, -3.7, -0.4, YB, YB + 0.1, -4.05, -2.35, { edge: 1 });
  [[-3.6, -3.95], [-3.6, -2.45], [-0.5, -3.95], [-0.5, -2.45]].forEach(function (p) {
    cyv(Z.fl, P.acierF, p[0], YB, YB + 2.3, p[1], 0.04, { seg: 5 });
  });
  bx(Z.fl, P.acierF, -3.7, -0.4, YB + 2.3, YB + 2.36, -4.05, -2.35);
  cy(Z.fl, "#c3ccd5", -2.2, YB + 0.62, -3.2, 0.40, 2.6, { axe: "x", seg: 22 });
  cy(Z.fl, "#3a424c", -2.2, YB + 1.52, -3.2, 0.33, 2.6, { axe: "x", seg: 22 });
  [-3.5, -0.9].forEach(function (x) {
    cy(Z.fl, "#7c8794", x, YB + 0.62, -3.2, 0.46, 0.06, { axe: "x", seg: 22 });
    cy(Z.fl, "#7c8794", x, YB + 1.52, -3.2, 0.39, 0.06, { axe: "x", seg: 22 });
  });
  cy(Z.fl, cz(Z.fl), -2.2, YB + 0.62, -3.2, 0.415, 0.3, { axe: "x", seg: 22 });
  cy(Z.fl, cz(Z.fl), -1.4, YB + 0.62, -3.2, 0.415, 0.16, { axe: "x", seg: 22 });
  [-3.6, -2.8].forEach(function (z) {
    cyv(Z.fl, "#8a96a3", -0.65, YB + 0.1, YB + 0.85, z, 0.26, { seg: 14 });
  });
  bx(Z.fl, P.acierF, -0.85, -0.45, YB + 0.85, YB + 1.05, -4.0, -2.6);
  tube(Z.fl, P.cuivre, -0.9, YB + 1.52, -3.2, -0.65, YB + 0.95, -3.6, 0.04);
  tube(Z.fl, P.cuivre, -0.9, YB + 0.62, -3.0, -0.65, YB + 0.7, -2.8, 0.04);
  tube(Z.fl, "#232a33", -3.5, YB + 1.95, -3.2, -3.5, -0.5, -3.2, 0.09, { seg: 8 });
  tube(Z.fl, "#232a33", -3.5, -0.5, -3.2, 1.2, -0.5, -3.9, 0.09, { seg: 8 });
  bx(Z.fl, "#e8ecef", -3.7, -2.7, YB + 0.1, YB + 1.15, -2.75, -2.35, { edge: 1 });
  bx(Z.fl, "#1e2630", -3.6, -3.0, YB + 0.65, YB + 1.0, -2.36, -2.34);
  bx(Z.fl, "#7fe0d0", -3.55, -3.15, YB + 0.7, YB + 0.85, -2.34, -2.335, { lum: 1 });
  bx(Z.fl, cz(Z.fl), -3.7, -2.7, YB + 1.15, YB + 1.22, -2.75, -2.35);
  /* bouteilles de fluide sur leur râtelier */
  bx(Z.fl, P.acierF, -3.85, -2.15, YB, YB + 0.05, 0.35, 1.7, { edge: 1 });
  const CBOU = [cz(Z.fl), "#e8914a", "#3b82c4", "#d94f6a", "#8a9a3a", "#8a5cc8"];
  let nb = 0;
  [0.75, 1.3].forEach(function (z) {
    [-3.5, -3.0, -2.5].forEach(function (x) {
      cyv(Z.fl, "#e9edf0", x, YB + 0.05, YB + 1.02, z, 0.13, { seg: 12 });
      sp(Z.fl, CBOU[nb % 6], x, YB + 1.04, z, 0.13, 0.11, 0.13, { seg: 12, seg2: 6 });
      cyv(Z.fl, "#b89448", x, YB + 1.13, YB + 1.24, z, 0.03, { seg: 6 });
      cyv(Z.fl, CBOU[nb % 6], x, YB + 0.05, YB + 0.32, z, 0.135, { seg: 12 });
      nb++;
    });
  });
  tube(Z.fl, P.acier, -3.75, YB + 0.7, 0.5, -2.25, YB + 0.7, 0.5, 0.018);
  tube(Z.fl, P.acier, -3.75, YB + 0.7, 0.5, -3.75, YB + 0.7, 1.5, 0.018);
  /* balance et bouteille de récupération */
  bx(Z.fl, "#c9d0d8", -1.7, -1.0, YB, YB + 0.12, 0.6, 1.2, { edge: 1 });
  bx(Z.fl, "#1e2630", -1.55, -1.15, YB + 0.12, YB + 0.14, 0.75, 1.05);
  cyv(Z.fl, "#f2c94c", -1.35, YB + 0.14, YB + 0.62, 0.9, 0.11, { seg: 12 });
  ancre(Z.fl, -2.3, -1.7, -2.6);
  proxy(Z.fl, -3.75, -0.35, YB, YB + 2.4, -4.1, -2.3);
  proxy(Z.fl, -3.9, -2.1, YB, YB + 1.4, 0.3, 1.75);
  proxy(Z.fl, -1.8, -0.9, YB, YB + 0.7, 0.5, 1.3);

  /* =====================================================================
     6. RÉSERVOIRS ET SOUPAPES (regl-desp)
     ===================================================================== */
  const VB = "#a8bccd", VT = cz(Z.de);
  function soupape(x, y, z) {
    cyv(Z.de, "#8791a0", x, y, y + 0.12, z, 0.05, { seg: 8 });
    cyv(Z.de, "#c0392b", x, y + 0.12, y + 0.34, z, 0.11, { seg: 10 });
    cyv(Z.de, "#4b5563", x, y + 0.34, y + 0.5, z, 0.075, { seg: 8 });
    sp(Z.de, "#4b5563", x, y + 0.53, z, 0.08, 0.05, 0.08, { seg: 8, seg2: 5 });
    tube(Z.de, "#8791a0", x, y + 0.24, z, x + 0.26, y + 0.24, z, 0.045, { seg: 8 });
    cyv(Z.de, "#8791a0", x + 0.26, y + 0.24, y + 0.34, z, 0.045, { seg: 8 });
  }
  function manometre(x, y, z, ax) {
    tube(Z.de, "#8791a0", x, y, z - 0.18, x, y, z, 0.03, { seg: 6 });
    cy(Z.de, "#232a33", x, y, z + 0.04, 0.17, 0.06, { axe: "z", seg: 16 });
    cy(Z.de, "#fbfaf5", x, y, z + 0.075, 0.145, 0.02, { axe: "z", seg: 16 });
    bxr(Z.de, "#c0392b", x + 0.03, y + 0.03, z + 0.09, 0.012, 0.11, 0.008, 0, 0, -40);
    bx(Z.de, "#c0392b", x + 0.07, x + 0.12, y - 0.1, y - 0.05, z + 0.09, z + 0.095);
  }
  /* ballon vertical */
  const vx = 0.6, vz = -3.1;
  [[0.4, 0], [-0.2, 0.36], [-0.2, -0.36]].forEach(function (p) {
    tube(Z.de, P.acierF, vx + p[0], YB, vz + p[1], vx + p[0] * 0.9, YB + 0.55, vz + p[1] * 0.9, 0.04);
  });
  cyv(Z.de, VB, vx, YB + 0.5, YB + 2.15, vz, 0.6, { seg: 24 });
  sp(Z.de, VB, vx, YB + 0.5, vz, 0.6, 0.22, 0.6, { seg: 24, seg2: 8 });
  sp(Z.de, VB, vx, YB + 2.15, vz, 0.6, 0.22, 0.6, { seg: 24, seg2: 8 });
  cyv(Z.de, VT, vx, YB + 1.0, YB + 1.16, vz, 0.615, { seg: 24 });
  cyv(Z.de, VT, vx, YB + 1.7, YB + 1.86, vz, 0.615, { seg: 24 });
  soupape(vx, YB + 2.34, vz);
  manometre(vx - 0.1, YB + 1.35, vz + 0.78);
  bx(Z.de, "#b08d57", vx + 0.28, vx + 0.55, YB + 1.35, YB + 1.5, vz + 0.6, vz + 0.63);
  /* réservoir horizontal */
  const hx0 = 0.2, hx1 = 2.6, hy = YB + 0.62, hz = -1.0;
  [0.8, 2.0].forEach(function (x) { bx(Z.de, P.acierF, x - 0.12, x + 0.12, YB, YB + 0.32, hz - 0.36, hz + 0.36); });
  cy(Z.de, VB, (hx0 + hx1) / 2, hy, hz, 0.44, hx1 - hx0, { axe: "x", seg: 24 });
  sp(Z.de, VB, hx0, hy, hz, 0.2, 0.44, 0.44, { seg: 20, seg2: 8 });
  sp(Z.de, VB, hx1, hy, hz, 0.2, 0.44, 0.44, { seg: 20, seg2: 8 });
  cy(Z.de, VT, 0.55, hy, hz, 0.455, 0.14, { axe: "x", seg: 24 });
  cy(Z.de, VT, 2.25, hy, hz, 0.455, 0.14, { axe: "x", seg: 24 });
  soupape(1.4, hy + 0.42, hz);
  manometre(0.95, hy + 0.05, hz + 0.6);
  bx(Z.de, "#b08d57", 1.7, 1.97, hy - 0.2, hy - 0.05, hz + 0.44, hz + 0.47);
  tube(Z.de, P.cuivre, vx + 0.3, YB + 0.7, vz + 0.55, hx0 + 0.4, hy - 0.2, hz - 0.4, 0.045);
  ancre(Z.de, 1.3, -1.9, -1.0);
  proxy(Z.de, -0.05, 1.3, YB, YB + 2.9, vz - 0.7, vz + 0.85);
  proxy(Z.de, 0.0, 2.85, YB, YB + 1.6, hz - 0.5, hz + 0.75);

  /* cloison du local électrique */
  bx(null, P.verre, 3.08, 3.14, YB, -0.3, -4.2, 0.6, { t: 0.2 });
  [-4.2, -2.4, -0.6, 0.6].forEach(function (z) { bx(null, P.cadre, 3.04, 3.18, YB, -0.3, z - 0.03, z + 0.03); });
  bx(null, P.cadre, 3.04, 3.18, YB + 1.0, YB + 1.06, -4.2, 0.6);
  bx(null, P.cadre, 3.04, 3.18, -0.36, -0.3, -4.2, 0.6);

  /* =====================================================================
     7. TABLEAU ÉLECTRIQUE (regl-electrique)
     ===================================================================== */
  const ex = 3.9, EC = cz(Z.el);
  [0, 1, 2, 3].forEach(function (i) {
    const x0 = ex + i * 0.78, x1 = x0 + 0.74;
    bx(Z.el, "#d3d8de", x0, x1, YB, YB + 2.15, -4.15, -3.65, { edge: 1 });
    bx(Z.el, "#e6e9ed", x0 + 0.05, x1 - 0.05, YB + 0.1, YB + 2.05, -3.65, -3.62);
    bx(Z.el, EC, x0, x1, YB + 2.05, YB + 2.15, -3.66, -3.6);
    bx(Z.el, "#2a313b", x1 - 0.14, x1 - 0.1, YB + 1.0, YB + 1.3, -3.62, -3.57);
  });
  bx(Z.el, "#1e2630", ex + 0.1, ex + 0.6, YB + 1.55, YB + 1.85, -3.62, -3.6);
  bx(Z.el, "#8fe3ff", ex + 0.15, ex + 0.55, YB + 1.6, YB + 1.8, -3.6, -3.595, { lum: 1 });
  [["#39c77a", 0.0], ["#f2a03d", 0.14], ["#e34a3a", 0.28]].forEach(function (l) {
    sp(Z.el, l[0], ex + 0.9 + l[1], YB + 1.75, -3.6, 0.04, 0.04, 0.02, { seg: 8, seg2: 5, lum: 1 });
  });
  cy(Z.el, "#d63a2f", ex + 1.55 + 0.35, YB + 1.55, -3.6, 0.07, 0.06, { axe: "z", seg: 12 });
  /* pancarte danger électrique (triangle jaune) */
  ext(Z.el, "#f5c518", [[0, 0], [0.42, 0], [0.21, 0.36]], 0.02, ex + 2.5, YB + 1.15, -3.61);
  ext(Z.el, "#2a313b", [[0.17, 0.08], [0.25, 0.08], [0.22, 0.18], [0.27, 0.18], [0.16, 0.3], [0.19, 0.2], [0.14, 0.2]], 0.005, ex + 2.5, YB + 1.15, -3.585);
  /* chemins de câbles au plafond et descentes */
  bx(Z.el, "#9aa5b1", ex - 0.1, 7.5, -0.75, -0.7, -4.15, -3.55);
  bx(Z.el, "#9aa5b1", -2.9, ex, -0.75, -0.7, -4.15, -3.55);
  for (let k = 0; k < 20; k++) bx(Z.el, "#9aa5b1", -2.9 + k * 0.55, -2.9 + k * 0.55 + 0.04, -0.72, -0.7, -4.15, -3.55);
  bx(Z.el, "#9aa5b1", 7.4, 7.6, YB, -0.7, -4.15, -3.9);
  cyv(Z.el, EC, 4.4, -1.25, -0.72, -3.85, 0.04, { seg: 6 });
  cyv(Z.el, EC, 6.2, -1.25, -0.72, -3.85, 0.04, { seg: 6 });
  /* marquage au sol jaune et noir */
  for (let k = 0; k < 14; k++) bx(Z.el, k % 2 ? "#2a313b" : "#f5c518", ex + k * 0.22, ex + k * 0.22 + 0.22, YB + 0.03, YB + 0.05, -3.4, -3.15);
  ancre(Z.el, 5.5, -2.2, -3.6);
  proxy(Z.el, 3.85, 7.05, YB, -1.2, -4.2, -3.1);
  proxy(Z.el, -2.9, 7.6, -0.9, -0.6, -4.2, -3.5);

  /* =====================================================================
     8. LE BUREAU DU CHARGÉ D'AFFAIRES (regl-certifs) — niveau 1
     ===================================================================== */
  const Y1 = 3.4, CC = cz(Z.ce);
  /* cloison vitrée du bureau */
  bx(null, P.verre, 0.95, 1.0, Y1, Y1 + 3.1, -4.2, 1.6, { t: 0.3 });
  bx(null, P.cadre, 0.92, 1.03, Y1, Y1 + 0.05, -4.2, 1.6);
  bx(null, P.cadre, 0.92, 1.03, Y1 + 2.05, Y1 + 2.12, -4.2, 1.6);
  bx(null, "#ece6d8", 0.93, 1.05, Y1, Y1 + 3.1, -4.2, -3.0, { edge: 1 });
  [-4.2, -2.0, 0.0, 1.6].forEach(function (z) { bx(null, P.cadre, 0.92, 1.03, Y1, Y1 + 3.1, z - 0.03, z + 0.03); });
  /* bibliothèque avec ses classeurs */
  bx(Z.ce, P.boisF, 1.5, 4.1, Y1, Y1 + 2.25, -4.2, -3.75, { edge: 1 });
  const CLA = [CC, "#e8914a", "#3b82c4", "#d94f6a", "#f2c94c", "#8fb383", "#f7f5ef"];
  [0.35, 0.95, 1.55, 2.1].forEach(function (yy, r) {
    bx(Z.ce, "#e9dfc9", 1.55, 4.05, Y1 + yy - 0.03 + (r ? 0 : 0.0), Y1 + yy + 0.02, -4.19, -3.78);
  });
  [0.05, 0.65, 1.25, 1.8].forEach(function (yy, r) {
    let x = 1.6;
    while (x < 4.0) {
      const w = 0.07 + alea() * 0.07, h = 0.42 + alea() * 0.1;
      if (r === 3 && alea() < 0.3) { x += 0.18; continue; }
      bx(Z.ce, CLA[Math.floor(alea() * CLA.length)], x, Math.min(x + w, 4.02), Y1 + yy + 0.04, Y1 + yy + 0.04 + h, -4.16, -3.8);
      x += w + 0.01;
    }
  });
  /* diplômes et certificats encadrés au mur */
  [[4.5, 4.6], [5.5, 4.85], [6.5, 4.6]].forEach(function (f, i) {
    const x = f[0], y = Y1 + f[1] - 3.4 + 0.15 + 0.0;
    bx(Z.ce, "#9a6f2e", x, x + 0.85, y - 0.05, y + 0.65, -4.2, -4.15, { edge: 1 });
    bx(Z.ce, "#fffdf8", x + 0.06, x + 0.79, y + 0.02, y + 0.58, -4.15, -4.13);
    bx(Z.ce, CC, x + 0.12, x + 0.73, y + 0.46, y + 0.5, -4.13, -4.12);
    for (let k = 0; k < 3; k++) bx(Z.ce, "#c5c9d0", x + 0.12, x + 0.6 - k * 0.06, y + 0.34 - k * 0.07, y + 0.36 - k * 0.07, -4.13, -4.12);
    cy(Z.ce, P.or, x + 0.6, y + 0.15, -4.11, 0.07, 0.02, { axe: "z", seg: 14 });
    bxr(Z.ce, "#c0392b", x + 0.56, y + 0.05, -4.11, 0.03, 0.09, 0.01, 0, 0, 15);
    bxr(Z.ce, "#c0392b", x + 0.64, y + 0.05, -4.11, 0.03, 0.09, 0.01, 0, 0, -15);
  });
  /* bureau, écrans, chaise */
  bx(Z.ce, "#e4d1ad", 4.0, 6.6, Y1 + 0.70, Y1 + 0.76, -2.75, -1.75, { edge: 1 });
  bx(Z.ce, P.boisF, 4.05, 4.15, Y1, Y1 + 0.7, -2.7, -1.8);
  bx(Z.ce, P.boisF, 6.45, 6.55, Y1, Y1 + 0.7, -2.7, -1.8);
  bx(Z.ce, P.boisF, 4.05, 6.55, Y1 + 0.3, Y1 + 0.7, -2.75, -2.7);
  [4.75, 5.55].forEach(function (x) {
    bx(Z.ce, "#232a33", x - 0.28, x + 0.28, Y1 + 0.95, Y1 + 1.35, -2.42, -2.38);
    bx(Z.ce, "#bcd8ee", x - 0.25, x + 0.25, Y1 + 0.98, Y1 + 1.32, -2.38, -2.375, { lum: 1 });
    bx(Z.ce, "#232a33", x - 0.03, x + 0.03, Y1 + 0.76, Y1 + 0.95, -2.42, -2.38);
  });
  bx(Z.ce, "#3a424c", 4.9, 5.4, Y1 + 0.76, Y1 + 0.79, -2.15, -1.9);
  /* dossiers, tampon, lampe */
  [[6.0, 0.0], [6.0, 0.09], [6.0, 0.18]].forEach(function (d, i) {
    bx(Z.ce, CLA[i + 1], d[0], d[0] + 0.3, Y1 + 0.76 + d[1], Y1 + 0.76 + d[1] + 0.085, -2.65, -2.25);
  });
  cyv(Z.ce, "#f7f5ef", 6.32, Y1 + 0.76, Y1 + 0.98, -2.05, 0.05, { seg: 8 });
  cyv(Z.ce, "#c0392b", 6.32, Y1 + 0.98, Y1 + 1.06, -2.05, 0.06, { seg: 8 });
  cyv(Z.ce, P.or, 6.32, Y1 + 0.76, Y1 + 0.79, -2.05, 0.07, { seg: 10 });
  bx(Z.ce, "#e9ecef", 4.2, 4.65, Y1 + 0.76, Y1 + 0.98, -2.15, -1.95);
  bx(Z.ce, CC, 4.2, 4.65, Y1 + 0.76, Y1 + 0.8, -2.15, -1.95);
  cyv(Z.ce, "#2a313b", 6.5, Y1 + 0.76, Y1 + 1.15, -2.55, 0.015, { seg: 5 });
  tube(Z.ce, "#2a313b", 6.5, Y1 + 1.15, -2.55, 6.3, Y1 + 1.3, -2.4, 0.015, { seg: 5 });
  cy(Z.ce, CC, 6.28, Y1 + 1.28, -2.38, 0.09, 0.07, { seg: 12, rt: 0.03 });
  /* chaise et fauteuil visiteur */
  function chaise(x, z, sens, hex, ec) {
    bx(Z.ce, hex, x - 0.24, x + 0.24, Y1 + 0.42, Y1 + 0.5, z - 0.24, z + 0.24, ec);
    bx(Z.ce, hex, x - 0.24, x + 0.24, Y1 + 0.5, Y1 + 1.0, z + sens * 0.2, z + sens * 0.26);
    cyv(Z.ce, "#3a424c", x, Y1 + 0.08, Y1 + 0.42, z, 0.03, { seg: 6 });
    cy(Z.ce, "#3a424c", x, Y1 + 0.05, z, 0.24, 0.03, { seg: 5 });
  }
  chaise(5.2, -1.25, +1, "#3a424c");
  chaise(4.6, -3.0, -1, CC);
  /* meuble à tiroirs, plante */
  bx(Z.ce, "#c9d0d8", 6.85, 7.55, Y1, Y1 + 1.15, -3.3, -2.7, { edge: 1 });
  [0.06, 0.4, 0.74].forEach(function (yy) { bx(Z.ce, "#e3e7ec", 6.9, 7.5, Y1 + yy, Y1 + yy + 0.3, -2.7, -2.68); bx(Z.ce, "#2a313b", 7.05, 7.35, Y1 + yy + 0.24, Y1 + yy + 0.27, -2.68, -2.66); });
  cyv(Z.ce, "#e9e5db", 7.15, Y1 + 1.15, Y1 + 1.35, -3.0, 0.14, { seg: 10 });
  sp(Z.ce, P.feuilleF, 7.15, Y1 + 1.6, -3.0, 0.25, 0.28, 0.25, { seg: 8, seg2: 6 });
  ancre(Z.ce, 5.0, 4.6, -2.3);
  proxy(Z.ce, 1.45, 4.15, Y1, Y1 + 2.3, -4.2, -3.7);
  proxy(Z.ce, 4.4, 7.5, Y1 + 0.9, Y1 + 2.5, -4.2, -4.0);
  proxy(Z.ce, 3.95, 6.65, Y1, Y1 + 1.5, -2.8, -1.65);
  proxy(Z.ce, 6.8, 7.6, Y1, Y1 + 1.8, -3.35, -2.65);

  /* le reste du niveau 1 : plateau ouvert, en gris neutre */
  [-3.4, -0.9].forEach(function (x) {
    bx(null, "#e4e0d6", x - 0.7, x + 0.7, Y1 + 0.7, Y1 + 0.75, -2.7, -1.9, { edge: 1 });
    bx(null, "#b9bfc7", x - 0.65, x - 0.6, Y1, Y1 + 0.7, -2.65, -1.95);
    bx(null, "#b9bfc7", x + 0.6, x + 0.65, Y1, Y1 + 0.7, -2.65, -1.95);
    bx(null, "#232a33", x - 0.25, x + 0.25, Y1 + 0.93, Y1 + 1.3, -2.32, -2.28);
    bx(null, "#bcd8ee", x - 0.22, x + 0.22, Y1 + 0.96, Y1 + 1.27, -2.28, -2.275, { lum: 1 });
    bx(null, "#232a33", x - 0.03, x + 0.03, Y1 + 0.75, Y1 + 0.93, -2.32, -2.28);
    bx(null, "#8a94a1", x - 0.22, x + 0.22, Y1 + 0.42, Y1 + 0.48, -1.5, -1.05);
    bx(null, "#8a94a1", x - 0.22, x + 0.22, Y1 + 0.48, Y1 + 0.95, -1.05, -1.0);
    cyv(null, "#3a424c", x, Y1 + 0.05, Y1 + 0.42, -1.27, 0.03, { seg: 6 });
  });

  /* =====================================================================
     9. LA SALLE DE PAUSE ET SON PLANNING (regl-travail) — niveau 2
     ===================================================================== */
  const Y2 = 6.8, TC = cz(Z.tr);
  /* kitchenette au mur du fond */
  bx(Z.tr, "#f2efe6", -3.85, -1.0, Y2, Y2 + 0.9, -4.2, -3.6, { edge: 1 });
  bx(Z.tr, "#c9d0d8", -3.9, -0.95, Y2 + 0.9, Y2 + 0.96, -4.2, -3.55);
  bx(Z.tr, "#dfe4ea", -3.4, -2.8, Y2 + 0.96, Y2 + 0.99, -4.05, -3.7);
  bx(Z.tr, "#f2efe6", -3.85, -1.0, Y2 + 1.7, Y2 + 2.5, -4.2, -3.85, { edge: 1 });
  [-3.85, -3.0, -2.05].forEach(function (x) { bx(Z.tr, "#e0dbcd", x + 0.03, x + 0.9, Y2 + 1.73, Y2 + 2.47, -3.85, -3.83); });
  bx(Z.tr, "#2a313b", -1.85, -1.3, Y2 + 0.96, Y2 + 1.4, -4.05, -3.72, { edge: 1 });    /* machine à café */
  bx(Z.tr, TC, -1.85, -1.3, Y2 + 1.3, Y2 + 1.4, -4.05, -3.72);
  bx(Z.tr, "#e9ecef", -1.7, -1.45, Y2 + 0.99, Y2 + 1.1, -3.9, -3.8);
  bx(Z.tr, "#f7f5ef", -1.0, -0.3, Y2, Y2 + 1.95, -4.2, -3.55, { edge: 1 });            /* réfrigérateur */
  bx(Z.tr, "#c9d0d8", -0.35, -0.3, Y2 + 0.4, Y2 + 1.1, -3.6, -3.55);
  /* table et chaises */
  cyv(Z.tr, "#3a424c", -0.95, Y2, Y2 + 0.72, -1.4, 0.06, { seg: 8 });
  cy(Z.tr, "#3a424c", -0.95, Y2 + 0.02, -1.4, 0.4, 0.03, { seg: 14 });
  cy(Z.tr, "#f0e6d0", -0.95, Y2 + 0.74, -1.4, 0.95, 0.05, { seg: 28, edge: 0 });
  [[0, -0.85], [0, 0.85], [-0.85, 0], [0.85, 0]].forEach(function (d, i) {
    const x = -0.95 + d[0] * 1.15, z = -1.4 + d[1] * 1.15;
    cyv(Z.tr, "#3a424c", x, Y2, Y2 + 0.44, z, 0.025, { seg: 5 });
    bx(Z.tr, i % 2 ? TC : "#3a424c", x - 0.22, x + 0.22, Y2 + 0.44, Y2 + 0.5, z - 0.22, z + 0.22);
  });
  cy(Z.tr, "#ffffff", -1.1, Y2 + 0.8, -1.5, 0.07, 0.09, { seg: 10 });                   /* tasses */
  cy(Z.tr, TC, -0.75, Y2 + 0.8, -1.25, 0.07, 0.09, { seg: 10 });
  /* canapé */
  bx(Z.tr, TC, 0.6, 2.3, Y2 + 0.05, Y2 + 0.45, -3.75, -3.05, { edge: 1 });
  bx(Z.tr, TC, 0.6, 2.3, Y2 + 0.45, Y2 + 0.95, -4.05, -3.75);
  bx(Z.tr, TC, 0.5, 0.65, Y2 + 0.05, Y2 + 0.7, -4.05, -3.05);
  bx(Z.tr, TC, 2.25, 2.4, Y2 + 0.05, Y2 + 0.7, -4.05, -3.05);
  /* le planning : un tableau quadrillé et ses pense-bêtes */
  bx(Z.tr, "#8a94a1", 0.5, 3.6, Y2 + 1.15, Y2 + 2.55, -4.2, -4.13, { edge: 1 });
  bx(Z.tr, "#fbfaf5", 0.56, 3.54, Y2 + 1.21, Y2 + 2.49, -4.13, -4.11);
  for (let c = 0; c <= 5; c++) bx(Z.tr, "#9aa5b1", 0.56 + c * 0.596, 0.56 + c * 0.596 + 0.025, Y2 + 1.21, Y2 + 2.49, -4.11, -4.1);
  for (let r = 0; r <= 4; r++) bx(Z.tr, "#9aa5b1", 0.56, 3.54, Y2 + 1.21 + r * 0.32, Y2 + 1.21 + r * 0.32 + 0.025, -4.11, -4.1);
  const NOTES = [TC, "#f2c94c", "#8fb383", "#e8914a", "#6db3d8"];
  for (let c = 0; c < 5; c++) for (let r = 0; r < 4; r++) {
    if (alea() < 0.45) continue;
    const w = 0.4 + alea() * 0.12;
    bx(Z.tr, NOTES[Math.floor(alea() * NOTES.length)], 0.6 + c * 0.596 + 0.03, 0.6 + c * 0.596 + 0.03 + w, Y2 + 1.25 + r * 0.32 + 0.05, Y2 + 1.25 + r * 0.32 + 0.05 + 0.2, -4.1, -4.09);
  }
  /* horloge */
  cy(Z.tr, "#2a313b", 4.15, Y2 + 2.1, -4.13, 0.28, 0.05, { axe: "z", seg: 20 });
  cy(Z.tr, "#fbfaf5", 4.15, Y2 + 2.1, -4.1, 0.25, 0.02, { axe: "z", seg: 20 });
  bx(Z.tr, "#2a313b", 4.14, 4.16, Y2 + 2.1, Y2 + 2.3, -4.09, -4.08);
  bx(Z.tr, "#2a313b", 4.15, 4.3, Y2 + 2.09, Y2 + 2.11, -4.09, -4.08);
  ancre(Z.tr, 2.0, 8.5, -3.6);
  proxy(Z.tr, 0.45, 3.65, Y2 + 1.1, Y2 + 2.6, -4.2, -4.0);
  proxy(Z.tr, -3.9, -0.25, Y2, Y2 + 2.55, -4.25, -3.5);
  proxy(Z.tr, -2.2, 0.35, Y2, Y2 + 1.05, -2.6, -0.2);
  proxy(Z.tr, 0.45, 2.45, Y2, Y2 + 1.0, -4.1, -3.0);

  /* salle de réunion (neutre) niveau 2, hall (neutre) rez-de-chaussée */
  bx(null, "#e4e0d6", 4.0, 6.8, Y2 + 0.72, Y2 + 0.78, -2.6, -1.4, { edge: 1 });
  bx(null, "#8a94a1", 5.3, 5.5, Y2, Y2 + 0.72, -2.1, -1.9);
  bx(null, "#8a94a1", 4.3, 6.5, Y2, Y2 + 0.05, -2.3, -1.7);
  [4.5, 5.4, 6.3].forEach(function (x) {
    [-3.0, -1.0].forEach(function (z) { bx(null, "#8a94a1", x - 0.22, x + 0.22, Y2 + 0.42, Y2 + 0.48, z - 0.22, z + 0.22); cyv(null, "#5c6875", x, Y2, Y2 + 0.42, z, 0.025, { seg: 5 }); });
  });
  bx(null, "#232a33", 4.6, 6.6, Y2 + 1.2, Y2 + 2.35, -4.2, -4.15);
  bx(null, "#cfe6f5", 4.65, 6.55, Y2 + 1.25, Y2 + 2.3, -4.15, -4.145, { lum: 1 });
  bx(null, "#4a5f78", 4.85, 5.6, Y2 + 1.55, Y2 + 2.05, -4.145, -4.14, { lum: 1 });
  /* rez-de-chaussée : accueil */
  bx(null, "#e4e0d6", 2.0, 4.6, 0, 1.05, 1.0, 1.7, { edge: 1 });
  bx(null, "#8a94a1", 2.0, 4.6, 1.05, 1.1, 0.95, 1.75);
  bx(null, "#232a33", 3.0, 3.4, 1.1, 1.4, 1.2, 1.24);
  cyv(null, "#e9e5db", 7.1, 0, 0.5, 1.9, 0.28, { seg: 10 });
  sp(null, P.feuilleF, 7.1, 1.0, 1.9, 0.4, 0.5, 0.4, { seg: 8, seg2: 6 });
  bx(null, "#8a94a1", 5.0, 6.2, 0.32, 0.4, 1.9, 2.4, { edge: 1 });
  bx(null, "#5c6875", 5.05, 5.1, 0, 0.32, 1.95, 2.35);
  bx(null, "#5c6875", 6.1, 6.15, 0, 0.32, 1.95, 2.35);
  /* luminaires : barres lumineuses sous les dalles */
  [[0, 3.1], [3.4, 6.5], [6.8, 9.9]].forEach(function (lv) {
    [-2.0, 1.8, 5.5].forEach(function (x) { bx(null, "#fff7dc", x - 0.7, x + 0.7, lv[1] - 0.05, lv[1], 1.7, 1.85, { lum: 1 }); });
  });

  /* =====================================================================
     10. PAC EN TOITURE ET VOISINAGE (regl-acoustique)
     ===================================================================== */
  const AC = cz(Z.ac), YT = 10.5;
  function pac(x0) {
    const x1 = x0 + 2.5, z0 = -3.5, z1 = -1.3;
    [[x0 + 0.2, z0 + 0.2], [x1 - 0.2, z0 + 0.2], [x0 + 0.2, z1 - 0.2], [x1 - 0.2, z1 - 0.2]].forEach(function (p) {
      bx(Z.ac, P.acierF, p[0] - 0.1, p[0] + 0.1, YT, YT + 0.25, p[1] - 0.1, p[1] + 0.1);
    });
    bx(Z.ac, "#dfe3e8", x0, x1, YT + 0.25, YT + 1.75, z0, z1, { edge: 1 });
    bx(Z.ac, AC, x0, x1, YT + 0.25, YT + 0.4, z0 - 0.01, z1 + 0.01);
    /* batterie à ailettes en façade */
    bx(Z.ac, "#3a424c", x0 + 0.15, x1 - 0.15, YT + 0.55, YT + 1.55, z1, z1 + 0.05);
    for (let k = 0; k < 9; k++) bx(Z.ac, "#8a94a1", x0 + 0.15, x1 - 0.15, YT + 0.6 + k * 0.11, YT + 0.62 + k * 0.11, z1 + 0.05, z1 + 0.09);
    /* côté droit : ailettes aussi */
    bx(Z.ac, "#3a424c", x1, x1 + 0.05, YT + 0.55, YT + 1.55, z0 + 0.2, z1 - 0.2);
    /* ventilateur sur le dessus */
    cy(Z.ac, "#2a313b", (x0 + x1) / 2, YT + 1.78, (z0 + z1) / 2, 0.85, 0.06, { seg: 24 });
    cy(Z.ac, "#e9ecef", (x0 + x1) / 2, YT + 1.82, (z0 + z1) / 2, 0.8, 0.03, { seg: 24 });
    cy(Z.ac, "#1a2028", (x0 + x1) / 2, YT + 1.83, (z0 + z1) / 2, 0.72, 0.03, { seg: 24 });
    for (let k = 0; k < 3; k++) bxr(Z.ac, "#8a94a1", (x0 + x1) / 2, YT + 1.87, (z0 + z1) / 2, 0.6, 0.02, 0.2, 0, k * 60, 0);
    cy(Z.ac, "#e9ecef", (x0 + x1) / 2, YT + 1.9, (z0 + z1) / 2, 0.08, 0.06, { seg: 8 });
    for (let k = 1; k <= 3; k++) cy(Z.ac, "#c9ced6", (x0 + x1) / 2, YT + 1.845, (z0 + z1) / 2, 0.2 * k + 0.05, 0.005, { seg: 24, open: true });
    for (let k = 0; k < 4; k++) bx(Z.ac, "#c9ced6", (x0 + x1) / 2 - 0.8, (x0 + x1) / 2 + 0.8, YT + 1.84, YT + 1.86, (z0 + z1) / 2 - 0.85 + k * 0.5 + 0.0, (z0 + z1) / 2 - 0.85 + k * 0.5 + 0.02);
  }
  pac(1.4); pac(4.4);
  /* écran acoustique en lames derrière les unités */
  for (let k = 0; k < 16; k++) bx(Z.ac, k % 2 ? "#cfc6dd" : AC, 1.2 + k * 0.4, 1.2 + k * 0.4 + 0.34, YT, YT + 1.9, -4.05, -3.85);
  bx(Z.ac, P.acierF, 1.2, 7.6, YT + 1.9, YT + 1.98, -4.08, -3.82);
  /* ondes sonores : arcs qui rayonnent vers le voisin (animés plus bas) */
  const ondes = [];
  for (let k = 0; k < 5; k++) {
    const m = new Mesh(new THREE.TorusGeometry(3.2, 0.05, 5, 36, 1.5),
      new THREE.MeshBasicMaterial({ color: AC, transparent: true, opacity: 0.4, depthWrite: false }));
    m.rotation.z = Math.PI - 0.75;
    m.position.set(1.4, 12.1, -2.4);
    racine.add(m);
    ondes.push(m);
    zones[Z.ac].anims.push({ mat: m.material, base: new Color(AC), op: 0.5 });
  }
  /* le voisin : une maison, et un sonomètre sur trépied à la limite */
  const nx = -12.7, nz0 = -3.6, nz1 = 0.8;
  bx(Z.ac, "#f1eadb", nx, nx + 3.8, 0, 3.0, nz0, nz1, { edge: 1 });
  {
    ext(Z.ac, P.tuile, [[-0.2, 0], [4.0, 0], [1.9, 1.55]], nz1 - nz0 + 0.6, nx, 3.0, nz0 - 0.3, { edge: 0 });
  }
  bx(Z.ac, "#c9765a", nx + 2.5, nx + 2.85, 3.6, 4.4, nz0 + 0.3, nz0 + 0.65);
  bx(Z.ac, "#8fb0c9", nx + 0.5, nx + 1.5, 1.1, 2.2, nz1, nz1 + 0.04);
  bx(Z.ac, P.cadre, nx + 0.45, nx + 1.55, 1.05, 2.25, nz1 - 0.02, nz1 + 0.02);
  bx(Z.ac, "#8fb0c9", nx + 2.3, nx + 3.3, 1.1, 2.2, nz1, nz1 + 0.04);
  bx(Z.ac, "#7a5a3a", nx + 1.7, nx + 2.2, 0, 1.9, nz1, nz1 + 0.05);
  bx(Z.ac, "#8fb0c9", nx + 1.0, nx + 2.4, 3.05, 3.9, nz1 + 0.2, nz1 + 0.22);
  [[-9.3, 1.7]].forEach(function (p) {
    const x = p[0], z = p[1];
    [[0.3, 0], [-0.15, 0.26], [-0.15, -0.26]].forEach(function (d) { tube(Z.ac, P.acierF, x, 1.05, z, x + d[0], 0, z + d[1], 0.018); });
    cyv(Z.ac, "#2a313b", x, 1.05, 1.5, z, 0.03, { seg: 6 });
    sp(Z.ac, "#3a424c", x, 1.6, z, 0.11, 0.11, 0.11, { seg: 10, seg2: 8 });
    cyv(Z.ac, AC, x, 1.45, 1.5, z, 0.06, { seg: 10 });
  });
  ancre(Z.ac, 3.4, 12.4, -2.4);
  proxy(Z.ac, 1.3, 7.0, YT, YT + 2.1, -4.1, -1.2);
  proxy(Z.ac, nx - 0.3, nx + 4.1, 0, 4.4, nz0 - 0.4, nz1 + 0.4);
  proxy(Z.ac, -9.7, -8.9, 0, 1.75, 1.3, 2.1);

  /* toiture : équipements neutres (extracteur, trappe d'accès) */
  bx(null, "#c9ced6", 4.4, 5.6, YT, YT + 0.8, -3.5, -2.3, { edge: 1 });
  cy(null, "#8a94a1", 5.0, YT + 0.95, -2.9, 0.42, 0.3, { seg: 16, rt: 0.2 });
  cy(null, "#5c6875", 5.0, YT + 1.12, -2.9, 0.22, 0.06, { seg: 12 });
  bx(null, "#efe9dc", 6.0, 7.0, YT, YT + 1.0, -1.0, 0.0, { edge: 1 });
  bx(null, "#b9bfc7", 6.15, 6.85, YT + 1.0, YT + 1.06, -1.1, 0.1);
  bx(null, "#7d8794", 6.3, 6.7, YT, YT + 0.8, 0.0, 0.03);

  /* =====================================================================
     11. ÉCHAFAUDAGE ET NACELLE (secu-risques)
     ===================================================================== */
  const RC = cz(Z.ri), XI = 8.35, XO = 9.55, ZS = [-4.3, -3.03, -1.77, -0.5];
  ZS.forEach(function (z) {
    [XI, XO].forEach(function (x) { cyv(Z.ri, "#a9b3be", x, 0, 10.9, z, 0.03, { seg: 6 }); bx(Z.ri, "#a9b3be", x - 0.12, x + 0.12, 0, 0.03, z - 0.12, z + 0.12); });
    tube(Z.ri, "#a9b3be", XI, 4.3, z, XO, 4.3, z, 0.022);
    tube(Z.ri, "#a9b3be", XI, 8.3, z, XO, 8.3, z, 0.022);
    tube(Z.ri, "#a9b3be", XI, 0.3, z, XO, 0.3, z, 0.022);
    tube(Z.ri, "#a9b3be", XI, 2.3, z, XO, 2.3, z, 0.022);
    tube(Z.ri, "#a9b3be", XI, 6.3, z, XO, 6.3, z, 0.022);
    tube(Z.ri, "#a9b3be", XI, 10.3, z, XO, 10.3, z, 0.022);
    tube(Z.ri, "#a9b3be", XI, 4.3, z, 8.02, 4.3, z, 0.018);
  });
  [0.3, 2.3, 4.3, 6.3, 8.3, 10.3].forEach(function (y, k) {
    [XI, XO].forEach(function (x) { tube(Z.ri, "#a9b3be", x, y, ZS[0], x, y, ZS[3], 0.022); });
    /* platelage */
    bx(Z.ri, P.bois, XI - 0.05, XO + 0.05, y + 0.02, y + 0.08, ZS[0], ZS[3], { edge: 0 });
    if (k > 0) {
      /* garde-corps 2 lisses + plinthe */
      tube(Z.ri, RC, XO, y + 1.0, ZS[0], XO, y + 1.0, ZS[3], 0.026);
      tube(Z.ri, RC, XO, y + 0.5, ZS[0], XO, y + 0.5, ZS[3], 0.02);
      bx(Z.ri, "#f2c94c", XO - 0.02, XO + 0.02, y + 0.08, y + 0.23, ZS[0], ZS[3]);
    }
  });
  [0, 2].forEach(function (i) {
    /* croix de Saint-André en façade, deux travées */
    for (let h = 0; h < 5; h++) {
      const ya = 0.3 + h * 2.0, yb = ya + 2.0;
      tube(Z.ri, "#a9b3be", XO, ya, ZS[i], XO, yb, ZS[i + 1], 0.02);
    }
  });
  /* échelle d'accès */
  tube(Z.ri, "#a9b3be", XO + 0.25, 0.0, -3.9, XO + 0.25, 6.3, -3.9, 0.025);
  tube(Z.ri, "#a9b3be", XO + 0.25, 0.0, -3.4, XO + 0.25, 6.3, -3.4, 0.025);
  for (let k = 0; k < 20; k++) tube(Z.ri, "#a9b3be", XO + 0.25, 0.25 + k * 0.32, -3.9, XO + 0.25, 0.25 + k * 0.32, -3.4, 0.012, { seg: 4 });
  /* bâche de protection partielle */
  bx(Z.ri, RC, XO + 0.01, XO + 0.02, 0.35, 2.3, ZS[0], ZS[1], { t: 0.28 });
  bx(Z.ri, RC, XO + 0.01, XO + 0.02, 0.35, 2.3, ZS[2], ZS[3], { t: 0.28 });
  /* potence en toiture + nacelle suspendue */
  [0.6, 2.3].forEach(function (z) {
    cyv(Z.ri, "#a9b3be", 7.0, YT, 12.1, z, 0.07, { seg: 8 });
    bx(Z.ri, RC, 6.9, 9.75, 12.1, 12.24, z - 0.07, z + 0.07);
    tube(Z.ri, "#a9b3be", 7.0, 12.1, z, 9.25, 12.1, z, 0.015);
    tube(Z.ri, "#a9b3be", 6.8, YT, z, 7.4, 12.05, z, 0.03);
    tube(Z.ri, "#232a33", 9.65, 12.1, z, 9.65, 6.35, z, 0.012, { seg: 4 });
  });
    const NX0 = 9.15, NX1 = 10.05, NZ0 = 0.4, NZ1 = 2.6, NY = 5.4;
  bx(Z.ri, "#a9b3be", NX0, NX1, NY, NY + 0.1, NZ0, NZ1, { edge: 1 });
  bx(Z.ri, "#f2c94c", NX0 - 0.02, NX1 + 0.02, NY + 0.1, NY + 0.28, NZ0 - 0.02, NZ1 + 0.02);
  [[NX0, NZ0], [NX1, NZ0], [NX0, NZ1], [NX1, NZ1]].forEach(function (p) { cyv(Z.ri, RC, p[0], NY + 0.1, NY + 1.15, p[1], 0.03, { seg: 6 }); });
  tube(Z.ri, RC, NX1, NY + 1.15, NZ0, NX1, NY + 1.15, NZ1, 0.03);
  tube(Z.ri, RC, NX0, NY + 1.15, NZ0, NX0, NY + 1.15, NZ1, 0.03);
  tube(Z.ri, RC, NX0, NY + 1.15, NZ0, NX1, NY + 1.15, NZ0, 0.03);
  tube(Z.ri, RC, NX0, NY + 1.15, NZ1, NX1, NY + 1.15, NZ1, 0.03);
  tube(Z.ri, RC, NX1, NY + 0.6, NZ0, NX1, NY + 0.6, NZ1, 0.022);
  /* ouvrier en harnais : silhouette pleine, casque jaune, gilet orange */
  const wx = 9.6, wz = 1.5, wy = NY + 0.28;
  bx(Z.ri, "#2f3b4d", wx - 0.16, wx - 0.02, wy, wy + 0.52, wz - 0.07, wz + 0.07);
  bx(Z.ri, "#2f3b4d", wx + 0.02, wx + 0.16, wy, wy + 0.52, wz - 0.07, wz + 0.07);
  cyv(Z.ri, RC, wx, wy + 0.5, wy + 1.0, wz, 0.19, { seg: 12, rt: 0.17 });
  bx(Z.ri, "#f2c94c", wx - 0.19, wx + 0.19, wy + 0.72, wy + 0.78, wz - 0.19, wz + 0.19);
  cyv(Z.ri, "#f2c94c", wx - 0.2, wy + 0.5, wy + 0.95, wz, 0.045, { seg: 6 });
  sp(Z.ri, "#f0d2b4", wx, wy + 1.15, wz, 0.13, 0.14, 0.13, { seg: 12, seg2: 8 });
  sp(Z.ri, "#f2c94c", wx, wy + 1.19, wz, 0.155, 0.11, 0.155, { seg: 12, seg2: 6 });
  tube(Z.ri, "#f2c94c", wx + 0.05, wy + 0.95, wz, wx + 0.42, wy + 0.85, wz + 0.45, 0.04);
  tube(Z.ri, "#f2c94c", wx - 0.05, wy + 0.95, wz, wx - 0.42, wy + 0.85, wz - 0.45, 0.04);
  ancre(Z.ri, 9.55, 6.2, -2.4);
  proxy(Z.ri, 8.3, 10.35, 0, 10.95, -4.35, -0.45);
  proxy(Z.ri, 8.7, 10.15, 5.3, 6.9, 0.35, 2.65);
  proxy(Z.ri, 6.85, 9.8, 10.5, 12.3, 0.4, 2.6);

  /* =====================================================================
     12. AIRE DE DÉCHETS AU PIED DU BÂTIMENT (secu-dechets)
     ===================================================================== */
  const DC = cz(Z.dc);
  bx(Z.dc, "#c9ccd1", 10.2, 15.5, 0, 0.06, -3.7, 2.65, { edge: 1 });
  /* quatre bacs roulants */
  [["#e0b400", -1.95], ["#2e8b57", -1.25], ["#2f6db5", -0.55], [DC, 0.15]].forEach(function (b) {
    const z = b[1];
    bx(Z.dc, b[0], 10.7, 11.35, 0.06, 0.95, z, z + 0.6, { edge: 1 });
    bx(Z.dc, b[0], 10.66, 11.39, 0.95, 1.02, z - 0.03, z + 0.63);
    bx(Z.dc, "#1e2630", 11.35, 11.38, 0.6, 0.75, z + 0.2, z + 0.4);
    cy(Z.dc, "#1e2630", 10.9, 0.1, z + 0.05, 0.1, 0.06, { axe: "z", seg: 10 });
    cy(Z.dc, "#1e2630", 10.9, 0.1, z + 0.55, 0.1, 0.06, { axe: "z", seg: 10 });
  });
  /* benne ouverte, remplie de gravats */
  bx(Z.dc, "#3f7d58", 13.3, 15.3, 0.12, 1.1, -3.5, -0.3, { edge: 1 });
  bx(Z.dc, "#2c5a3f", 13.3, 15.3, 1.1, 1.18, -3.5, -0.3);
  bx(Z.dc, "#1e2630", 13.2, 15.4, 0, 0.14, -3.6, -0.2);
  for (let k = 0; k < 9; k++) sp(Z.dc, ["#9a8f7c", "#c9b89a", "#7a736a", "#a6634a"][k % 4], 13.6 + (k % 3) * 0.6, 1.25 + (k % 2) * 0.1, -3.1 + Math.floor(k / 3) * 0.95, 0.42, 0.22, 0.4, { seg: 6, seg2: 5 });
  /* fûts sur bac de rétention, armoire à produits dangereux */
  bx(Z.dc, "#f2c94c", 13.0, 14.7, 0.06, 0.26, 0.35, 2.6, { edge: 1 });
  [[13.35, 0.9], [14.0, 0.9], [13.7, 1.5], [13.35, 2.1], [14.15, 2.1]].forEach(function (d, i) {
    cyv(Z.dc, i % 2 ? "#c0392b" : DC, d[0], 0.26, 1.06, d[1], 0.27, { seg: 14 });
    cyv(Z.dc, "#232a33", d[0], 1.06, 1.1, d[1], 0.275, { seg: 14 });
    cyv(Z.dc, "#232a33", d[0], 0.6, 0.66, d[1], 0.275, { seg: 14 });
  });
  bx(Z.dc, "#d63a2f", 14.85, 15.5, 0.06, 1.9, 0.5, 2.2, { edge: 1 });
  bx(Z.dc, "#f7f5ef", 14.9, 15.45, 0.5, 1.6, 2.2, 2.23);
  ext(Z.dc, "#f5c518", [[0.25, 0], [0.5, 0.25], [0.25, 0.5], [0, 0.25]], 0.02, 14.92, 0.8, 2.23);
  ext(Z.dc, "#2a313b", [[0.22, 0.12], [0.27, 0.12], [0.26, 0.3], [0.23, 0.3]], 0.005, 14.92, 0.8, 2.25);
  /* big-bags */
  [[11.95, 0.95], [11.95, 2.0]].forEach(function (b) {
    bx(Z.dc, "#8a6a4a", b[0] - 0.5, b[0] + 0.5, 0.06, 0.2, b[1] - 0.5, b[1] + 0.5);
    bx(Z.dc, "#f2efe6", b[0] - 0.45, b[0] + 0.45, 0.2, 1.1, b[1] - 0.45, b[1] + 0.45, { edge: 1 });
  });
  /* panneau des sept flux de tri */
  cyv(Z.dc, P.acierF, 10.75, 0, 2.85, -2.85, 0.05, { seg: 6 });
  cyv(Z.dc, P.acierF, 12.75, 0, 2.85, -2.85, 0.05, { seg: 6 });
  bx(Z.dc, "#fbfaf5", 10.5, 13.0, 1.5, 2.85, -2.9, -2.82, { edge: 1 });
  bx(Z.dc, DC, 10.5, 13.0, 2.72, 2.85, -2.83, -2.8);
  ["#9a6f2e", "#8a94a1", "#f2c94c", "#3b82c4", "#e8e2d0", "#a8845c", "#d63a2f"].forEach(function (c, i) {
    const x = 10.62 + i * 0.34;
    bx(Z.dc, c, x, x + 0.28, 1.65, 2.15, -2.82, -2.8);
    bx(Z.dc, "#232a33", x + 0.04, x + 0.24, 2.25, 2.3, -2.82, -2.8);
    bx(Z.dc, "#232a33", x + 0.04, x + 0.2, 2.36, 2.4, -2.82, -2.8);
  });
  ancre(Z.dc, 12.6, 1.4, 0.6);
  proxy(Z.dc, 10.2, 15.5, 0, 2.95, -3.7, 2.65);

  /* =====================================================================
     13. LE PAYSAGE (arbres, haies) — décor neutre
     ===================================================================== */
  function arbre(x, z, s) {
    cyv(null, "#8a6a4a", x, 0, 1.5 * s, z, 0.13 * s, { seg: 6 });
    sp(null, P.feuille, x, 2.4 * s, z, 1.1 * s, 1.0 * s, 1.1 * s, { seg: 8, seg2: 6 });
    sp(null, P.feuilleF, x + 0.5 * s, 2.0 * s, z + 0.3 * s, 0.75 * s, 0.7 * s, 0.75 * s, { seg: 8, seg2: 6 });
  }
  [[-6.5, -8.5, 1.5], [3, -9, 1.9], [12.5, -8, 1.6], [-13.5, -7.5, 1.4], [-13.8, 1.8, 1.0], [15.0, -5.5, 1.2]].forEach(function (a) { arbre(a[0], a[1], a[2]); });
  bx(null, P.feuilleF, -9.0, -8.2, 0, 0.6, -3.5, 1.5);
  bx(null, P.feuilleF, 8.25, 8.95, 0, 0.5, 0.1, 2.5);

  /* =====================================================================
     14. LE CIEL ET LE CYCLE DU CARBONE (secu-impact)
     ===================================================================== */
  const IC = cz(Z.im);
  const ciel = new Group();
  ciel.position.set(0, 15.8, -3.5);
  racine.add(ciel);
  const anneau = new Group();
  anneau.rotation.x = -Math.PI / 2 + 0.42;
  ciel.add(anneau);
  function basique(color, op, dwrite) {
    const m = new THREE.MeshBasicMaterial({ color: color, transparent: op < 1, opacity: op, depthWrite: dwrite !== false, side: THREE.DoubleSide });
    zones[Z.im].anims.push({ mat: m, base: new Color(color), op: op });
    return m;
  }
  const tor = new Mesh(new THREE.TorusGeometry(6.6, 0.09, 8, 72), basique(IC, 0.95));
  anneau.add(tor);
  const tor2 = new Mesh(new THREE.TorusGeometry(5.6, 0.035, 6, 72), basique(IC, 0.5));
  anneau.add(tor2);
  const disque = new Mesh(new THREE.CircleGeometry(6.6, 48), basique(IC, 0.09, false));
  anneau.add(disque);
  /* flèches du cycle */
  [0.6, 2.7, 4.8].forEach(function (a) {
    const c = new Mesh(new THREE.ConeGeometry(0.34, 0.85, 12), basique(IC, 1));
    c.position.set(Math.cos(a) * 6.6, Math.sin(a) * 6.6, 0);
    c.rotation.z = a;
    anneau.add(c);
  });
  /* molécules qui circulent : un carbone (sphère foncée) entouré de deux oxygènes */
  const orbiteurs = [];
  for (let k = 0; k < 4; k++) {
    const g = new Group();
    const m1 = new Mesh(new THREE.SphereGeometry(0.34, 14, 10), basique("#20463a", 1));
    const m2 = new Mesh(new THREE.SphereGeometry(0.26, 12, 8), basique("#f7f5ef", 1));
    const m3 = new Mesh(new THREE.SphereGeometry(0.26, 12, 8), basique("#f7f5ef", 1));
    m2.position.x = -0.5; m3.position.x = 0.5;
    g.add(m1, m2, m3);
    anneau.add(g);
    orbiteurs.push({ g: g, ph: k * Math.PI / 2 + 0.3 });
  }
  /* nuages qui dérivent, feuilles */
  const nuages = [];
  [[-5.8, 0.3, 0], [5.4, -0.4, 1.5]].forEach(function (p, k) {
    const g = new Group();
    const mat = new THREE.MeshLambertMaterial({ color: "#ffffff", transparent: true, opacity: 0.94 });
    [[0, 0, 0, 0.8], [0.9, -0.1, 0.1, 0.65], [-0.9, -0.15, 0, 0.62], [0.35, 0.45, 0, 0.6], [-0.3, 0.35, 0.1, 0.5]].forEach(function (s) {
      const m = new Mesh(new THREE.SphereGeometry(s[3], 12, 8), mat);
      m.position.set(s[0], s[1], s[2]);
      g.add(m);
    });
    g.position.set(p[0], p[1] + 1.7, p[2]);
    ciel.add(g);
    nuages.push({ g: g, x0: p[0], ph: k * 3 });
  });
  const feuilles = [];
  for (let k = 0; k < 5; k++) {
    const m = new Mesh(new THREE.SphereGeometry(0.28, 8, 6), basique("#5fae74", 1));
    m.scale.set(1, 0.35, 0.6);
    ciel.add(m);
    feuilles.push({ m: m, ph: k * 1.3 });
  }
  const pDisque = new Mesh(new THREE.CylinderGeometry(7.6, 7.6, 3.6, 16), new THREE.MeshBasicMaterial({ visible: false }));
  pDisque.position.set(0, 15.8, -3.5);
  pDisque.userData.zone = Z.im;
  racine.add(pDisque);
  zones[Z.im].proxies.push(pDisque);
  ancre(Z.im, 0, 16.6, -3.5); 

  /* la fumée de l'exutoire (désenfumage) : bouffées grises qui montent */
  const fumee = [];
  for (let k = 0; k < 4; k++) {
    const m = new Mesh(new THREE.SphereGeometry(0.42, 10, 8), new THREE.MeshLambertMaterial({ color: "#858c97", transparent: true, opacity: 0.4, depthWrite: false }));
    racine.add(m);
    fumee.push({ m: m, ph: k / 4 });
    zones[Z.inc].anims.push({ mat: m.material, base: new Color("#858c97"), op: 0.4, fixe: true });
  }

  /* La teinte de surbrillance : on remplace la couleur de la matière par celle de la
     sous-ligne (en gardant le relief de la couleur d'origine) et on l'éclaire un peu. */
  function teinter(mat, z) {
    const u = { uZC: { value: z.glow }, uHi: { value: 0 } };
    mat.userData.u = u;
    mat.onBeforeCompile = function (sh) {
      sh.uniforms.uZC = u.uZC; sh.uniforms.uHi = u.uHi;
      sh.fragmentShader = sh.fragmentShader
        .replace("#include <common>", "#include <common>\nuniform vec3 uZC;\nuniform float uHi;")
        .replace("#include <color_fragment>", "#include <color_fragment>\nfloat lu = dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11));\ndiffuseColor.rgb = mix(diffuseColor.rgb, uZC * (0.5 + 0.95 * lu), uHi * 0.82);")
        .replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\ntotalEmissiveRadiance += uZC * uHi * 0.42;");
    };
    mat.customProgramCacheKey = function () { return "b3d-teinte"; };
  }

  /* =====================================================================
     ASSEMBLAGE : les seaux deviennent des surfaces fusionnées
     ===================================================================== */
  seaux.forEach(function (b) {
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(new Float32Array(b.pos), 3));
    g.setAttribute("normal", new BufferAttribute(new Float32Array(b.nor), 3));
    g.setAttribute("color", new BufferAttribute(new Float32Array(b.col), 3));
    let mat;
    if (b.lum) mat = new THREE.MeshBasicMaterial({ vertexColors: true });
    else if (b.t < 1) mat = new THREE.MeshLambertMaterial({ vertexColors: true, transparent: true, opacity: b.t, depthWrite: false });
    else mat = new THREE.MeshLambertMaterial({ vertexColors: true, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
    if (b.zn && !b.lum) teinter(mat, zones[b.zn]);
    const m = new Mesh(g, mat);
    if (b.t === 1 && !b.lum) { m.castShadow = true; m.receiveShadow = true; }
    if (b.t < 1) m.renderOrder = 2;
    racine.add(m);
    if (b.zn) zones[b.zn].mats.push({ mat: mat, op: b.t, lum: b.lum });
  });
  /* filet d'arêtes : un seul jeu de segments, bleu nuit très léger */
  const ga = new BufferGeometry();
  ga.setAttribute("position", new BufferAttribute(new Float32Array(aretes), 3));
  const lignes = new THREE.LineSegments(ga, new THREE.LineBasicMaterial({ color: P.bleu, transparent: true, opacity: 0.22 }));
  racine.add(lignes);

  /* les sceaux flottent au plan de coupe devant les zones intérieures, au-dessus des zones extérieures */
  const SCEAUX = {
    "regl-fluidique": [-2.3, -2.55, FZ + 0.7], "regl-desp": [1.5, -2.55, FZ + 0.7], "regl-electrique": [5.5, -2.55, FZ + 0.7],
    "regl-certifs": [5.0, 4.3, FZ + 0.7], "regl-travail": [0.5, 7.6, FZ + 0.7], "regl-incendie": [-5.9, 5.4, FZ + 0.9],
    "regl-thermique": [6.4, 11.9, 1.4], "regl-acoustique": [0.2, 14.0, -2.4], "secu-risques": [9.5, 11.9, -2.4],
    "secu-dechets": [12.6, 2.7, 0.6], "secu-impact": [0, 18.4, -3.5]
  };
  Object.keys(SCEAUX).forEach(function (id) { zones[id].sceau.set(SCEAUX[id][0], SCEAUX[id][1], SCEAUX[id][2]); });

  /* ---------- sceaux dorés (un par zone, visibles si toutes les stations sont tamponnées) ---------- */
  const sceaux = {};
  ZONES.forEach(function (z) {
    const g = new Group();
    const or = new THREE.MeshLambertMaterial({ color: P.or, emissive: "#6b4a00" });
    const disc = new Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.1, 28), or);
    disc.rotation.x = Math.PI / 2;
    const bord = new Mesh(new THREE.TorusGeometry(0.5, 0.05, 8, 28), new THREE.MeshLambertMaterial({ color: "#f0c84a", emissive: "#6b4a00" }));
    const etoile = new THREE.Shape();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 ? 0.16 : 0.37, a = Math.PI / 2 + i * Math.PI / 5;
      if (i) etoile.lineTo(Math.cos(a) * r, Math.sin(a) * r); else etoile.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    const et = new Mesh(new THREE.ExtrudeGeometry(etoile, { depth: 0.05, bevelEnabled: false }), new THREE.MeshLambertMaterial({ color: "#fff2b8", emissive: "#8a6a10" }));
    et.position.z = 0.05;
    g.add(disc, bord, et);
    g.position.copy(zones[z.id].sceau);
    g.visible = false;
    racine.add(g);
    sceaux[z.id] = g;
  });

  /* =====================================================================
     ANIMATION ET SURBRILLANCE
     ===================================================================== */
  const _c = new Color();
  function appliquer(z) {
    const h = z.hi, cible = z.couleur;
    z.mats.forEach(function (e) {
      if (e.lum) return;
      e.mat.userData.u.uHi.value = h;
      if (e.op < 1) e.mat.opacity = Math.min(1, e.op + 0.35 * h);
    });
    z.anims.forEach(function (e) {
      if (e.fixe) return;
      _c.copy(e.base).lerp(z.glow, 0.5 * h);
      e.mat.color.copy(_c).multiplyScalar(1 + 0.3 * h);
    });
  }

  function animer(t, dt, reduit) {
    /* surbrillance : chaque zone rejoint sa cible en douceur */
    let bouge = false;
    ZONES.forEach(function (d) {
      const z = zones[d.id];
      const diff = z.cible - z.hi;
      if (Math.abs(diff) > 0.002) {
        z.hi += diff * Math.min(1, dt * 9);
        appliquer(z);
        bouge = true;
      } else if (z.hi !== z.cible) { z.hi = z.cible; appliquer(z); bouge = true; }
    });
    const hAc = zones[Z.ac].hi, hIn = zones[Z.inc].hi, hIm = zones[Z.im].hi;
    /* ondes sonores */
    ondes.forEach(function (m, k) {
      const p = reduit ? 0.2 + k * 0.16 : ((t * 0.3 + k * 0.2) % 1);
      const s = 0.32 + p * 1.1;
      m.scale.set(s, s, 1);
      m.material.opacity = (1 - p) * (0.36 + 0.5 * hAc);
    });
    /* fumée d'exutoire */
    fumee.forEach(function (f) {
      const p = reduit ? 0.3 + f.ph * 0.4 : ((t * 0.16 + f.ph) % 1);
      f.m.position.set(-5.9 + Math.sin(p * 5 + f.ph * 6) * 0.25, 12.9 + p * 2.4, 0.5 + p * 0.5);
      const s = 0.5 + p * 1.1; f.m.scale.set(s, s, s);
      f.m.material.opacity = Math.sin(p * Math.PI) * (0.16 + 0.45 * hIn);
    });
    /* cycle du carbone */
    if (!reduit) {
      orbiteurs.forEach(function (o) {
        const a = o.ph + t * 0.22;
        o.g.position.set(Math.cos(a) * 6.6, Math.sin(a) * 6.6, 0);
        o.g.rotation.z = a + Math.PI / 2;
      });
      nuages.forEach(function (n) { n.g.position.x = n.x0 + Math.sin(t * 0.15 + n.ph) * 0.7; });
      feuilles.forEach(function (f) {
        const a = f.ph + t * 0.3;
        f.m.position.set(Math.cos(a) * 5.9, 0.6 + Math.sin(a * 1.7) * 0.7, Math.sin(a) * 5.9 * 0.55 - 3.0);
        f.m.rotation.set(a, a * 0.7, a * 0.4);
      });
      ciel.rotation.y = Math.sin(t * 0.1) * 0.12;
      ciel.position.y = 15.8 + Math.sin(t * 0.5) * 0.12;
    } else {
      orbiteurs.forEach(function (o) { o.g.position.set(Math.cos(o.ph) * 6.6, Math.sin(o.ph) * 6.6, 0); o.g.rotation.z = o.ph + Math.PI / 2; });
      feuilles.forEach(function (f) { f.m.position.set(Math.cos(f.ph) * 5.9, 0.6, Math.sin(f.ph) * 5.9 * 0.55 - 3.0); });
    }
    /* sceaux : tournent lentement, face au spectateur */
    if (!reduit) ZONES.forEach(function (d) { const s = sceaux[d.id]; if (s.visible) s.rotation.y = Math.sin(t * 0.8) * 0.4; });
    return bouge;
  }

  return { groupe: racine, zones: zones, sceaux: sceaux, animer: animer, appliquer: appliquer };
}
