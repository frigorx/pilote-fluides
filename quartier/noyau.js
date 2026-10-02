/* =====================================================================
   NOYAU — l'atelier de géométrie de la rue (repris du bâtiment
   Législation, legislation/batiment3d/maquette.js, rendu générique).

   Chaque bâtiment est un module qui reçoit l'atelier H et pose ses
   formes avec H.bx, H.cy, H.tube… dans une ZONE (identifiant de
   zones.mjs) ou dans le décor (zone null). À la fin, H.finir() fusionne
   tout par zone : une surface opaque + une surface vitrée par zone,
   couleurs portées par les sommets, une quarantaine d'appels de dessin.

   Repère : 1 unité = 1 m. x vers la droite, y vers le haut, z vers le
   spectateur. Les façades avant sont OUVERTES (coupe) au plan z = FZ.
   ===================================================================== */

export const P = {
  bleu: "#1b3a63", papier: "#fffdf8",
  mur: "#f3eee3", murF: "#e4ddcd", beton: "#d6d2c6", betonF: "#b7bcc5",
  sol: "#dfe6d2", terre: "#cdbfa5", strate: "#b8a88a", plaque: "#efe9dc", plaqueB: "#cfc7b4",
  verre: "#a8cde3", cadre: "#4a5f78", acier: "#98a4b1", acierF: "#5c6875", gris: "#d9dde3",
  blanc: "#f7f5ef", noir: "#2a313b", cuivre: "#c98254", bois: "#dcc39a", boisF: "#b58f5e",
  feuille: "#a9c79a", feuilleF: "#86ad7a", isolant: "#f0cf6b", tuile: "#c9765a",
  or: "#d4a017", chaud: "#d9573a", froidE: "#3b82c4", armaflex: "#2b2f36", galva: "#c3cad3"
};
export const FZ = 3.0;          /* plan de coupe commun : les façades avant ouvertes */

function graine(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* defs : [{ id, couleur }] — les zones cliquables ET les pseudo-zones de tracé
   (« trace-froid »…) qui s'allument avec leur calque. */
export function creerAtelier(THREE, defs) {
  const { Vector3: V3, Color, Group, Mesh, BufferGeometry, BufferAttribute } = THREE;
  const racine = new Group();
  const alea = graine(20261002);
  const zones = {};
  defs.forEach(function (d) {
    const z = zones[d.id] = {
      id: d.id, couleur: new Color(d.couleur || "#1b3a63"), glow: new Color(),
      mats: [], anims: [], proxies: [], ancre: new V3(), hi: 0, cible: 0, gr: 0, grCible: 0
    };
    const hsl = {};
    z.couleur.getHSL(hsl);
    z.glow.setHSL(hsl.h, hsl.s < 0.2 ? hsl.s : Math.max(hsl.s, 0.55), Math.min(0.62, Math.max(hsl.l, 0.46)));
  });

  const seaux = new Map(), cc = new Map(), aretes = [];
  function col(hex) { let c = cc.get(hex); if (!c) { c = new Color(hex); cc.set(hex, c); } return c; }
  function pousser(zn, hex, g0, o) {
    o = o || {};
    if (zn && !zones[zn]) throw new Error("zone inconnue : " + zn);
    const g = g0.index ? g0.toNonIndexed() : g0;
    const cle = (zn || "_") + "|" + (o.t || 1) + "|" + (o.lum ? "lum" : "");
    let b = seaux.get(cle);
    if (!b) { b = { zn: zn, t: o.t || 1, lum: !!o.lum, pos: [], nor: [], col: [] }; seaux.set(cle, b); }
    const p = g.attributes.position.array, n = g.attributes.normal.array, c = col(hex);
    for (let i = 0; i < p.length; i++) { b.pos.push(p[i]); b.nor.push(n[i]); }
    for (let i = 0; i < p.length / 3; i++) b.col.push(c.r, c.g, c.b);
    g.dispose(); if (g0 !== g) g0.dispose();
  }
  function aretesBoite(x0, x1, y0, y1, z0, z1) {
    [[x0, y0, z0, x1, y0, z0], [x0, y1, z0, x1, y1, z0], [x0, y0, z1, x1, y0, z1], [x0, y1, z1, x1, y1, z1],
     [x0, y0, z0, x0, y1, z0], [x1, y0, z0, x1, y1, z0], [x0, y0, z1, x0, y1, z1], [x1, y0, z1, x1, y1, z1],
     [x0, y0, z0, x0, y0, z1], [x1, y0, z0, x1, y0, z1], [x0, y1, z0, x0, y1, z1], [x1, y1, z0, x1, y1, z1]]
      .forEach(function (a) { aretes.push.apply(aretes, a); });
  }
  /* boîte par ses deux coins ; o.edge = filet d'arêtes ; o.t = opacité (vitrage) ; o.lum = éclairée */
  function bx(zn, hex, x0, x1, y0, y1, z0, z1, o) {
    const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
    g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    pousser(zn, hex, g, o);
    if (o && o.edge) aretesBoite(x0, x1, y0, y1, z0, z1);
  }
  /* boîte tournée autour de son centre (degrés, ordre X, Y, Z) */
  function bxr(zn, hex, cx, cy_, cz, w, h, d, rx, ry, rz, o) {
    const g = new THREE.BoxGeometry(w, h, d);
    g.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler((rx || 0) * Math.PI / 180, (ry || 0) * Math.PI / 180, (rz || 0) * Math.PI / 180)));
    g.translate(cx, cy_, cz);
    pousser(zn, hex, g, o);
  }
  /* cylindre centré ; o.axe 'x' | 'y' | 'z' ; o.rt rayon du haut ; o.seg ; o.open */
  function cy(zn, hex, x, y, z, r, h, o) {
    o = o || {};
    const g = new THREE.CylinderGeometry(o.rt == null ? r : o.rt, r, h, o.seg || 14, 1, !!o.open);
    if (o.axe === "x") g.rotateZ(Math.PI / 2); else if (o.axe === "z") g.rotateX(Math.PI / 2);
    g.translate(x, y, z);
    pousser(zn, hex, g, o);
  }
  function cyv(zn, hex, x, y0, y1, z, r, o) { cy(zn, hex, x, (y0 + y1) / 2, z, r, y1 - y0, o); }
  const _y = new V3(0, 1, 0);
  /* tube droit entre deux points */
  function tube(zn, hex, ax, ay, az, bx_, by, bz, r, o) {
    o = o || {};
    const d = new V3(bx_ - ax, by - ay, bz - az), L = d.length();
    if (L < 1e-6) return;
    const g = new THREE.CylinderGeometry(r, r, L, o.seg || 6, 1, false);
    g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(_y, d.normalize()));
    g.translate((ax + bx_) / 2, (ay + by) / 2, (az + bz) / 2);
    pousser(zn, hex, g, o);
  }
  /* tuyauterie : polyligne de points [[x,y,z],…], avec un nœud (sphère) à chaque coude */
  function canal(zn, hex, pts, r, o) {
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i];
      tube(zn, hex, a[0], a[1], a[2], b[0], b[1], b[2], r, o);
      if (i < pts.length - 1) sp(zn, hex, b[0], b[1], b[2], r, r, r, { seg: 8, seg2: 6 });
    }
  }
  /* gaine rectangulaire le long d'une polyligne orthogonale (segments parallèles aux axes) */
  function gaine(zn, hex, pts, w, h, o) {
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i];
      const x0 = Math.min(a[0], b[0]), x1 = Math.max(a[0], b[0]);
      const y0 = Math.min(a[1], b[1]), y1 = Math.max(a[1], b[1]);
      const z0 = Math.min(a[2], b[2]), z1 = Math.max(a[2], b[2]);
      const ax = x1 - x0 > 1e-6 ? "x" : (y1 - y0 > 1e-6 ? "y" : "z");
      bx(zn, hex,
        ax === "x" ? x0 - w / 2 : x0 - w / 2, ax === "x" ? x1 + w / 2 : x1 + w / 2,
        ax === "y" ? y0 - h / 2 : y0 - h / 2, ax === "y" ? y1 + h / 2 : y1 + h / 2,
        ax === "z" ? z0 - w / 2 : z0 - w / 2, ax === "z" ? z1 + w / 2 : z1 + w / 2, o);
    }
  }
  function sp(zn, hex, x, y, z, rx, ry, rz, o) {
    const g = new THREE.SphereGeometry(1, (o && o.seg) || 12, (o && o.seg2) || 8);
    g.scale(rx, ry == null ? rx : ry, rz == null ? rx : rz);
    g.translate(x, y, z);
    pousser(zn, hex, g, o);
  }
  /* polygone [x,y] du plan XY extrudé de prof selon +z, posé en (x,y,z) */
  function ext(zn, hex, pts, prof, x, y, z, o) {
    const s = new THREE.Shape();
    pts.forEach(function (p, i) { if (i) s.lineTo(p[0], p[1]); else s.moveTo(p[0], p[1]); });
    const g = new THREE.ExtrudeGeometry(s, { depth: prof, bevelEnabled: false });
    g.translate(x, y, z);
    pousser(zn, hex, g, o);
  }
  /* même chose mais extrudé selon x (profil [z,y]) : pignons, toitures vues de face */
  function extX(zn, hex, pts, prof, x, y, z, o) {
    const s = new THREE.Shape();
    pts.forEach(function (p, i) { if (i) s.lineTo(p[0], p[1]); else s.moveTo(p[0], p[1]); });
    const g = new THREE.ExtrudeGeometry(s, { depth: prof, bevelEnabled: false });
    g.rotateY(Math.PI / 2);   /* le profil (u, v) devient (z = -u, y = v), l'épaisseur part selon +x */
    g.translate(x, y, z);
    pousser(zn, hex, g, o);
  }
  /* surface de clic invisible (au moins une par zone) */
  function proxy(zn, x0, x1, y0, y1, z0, z1) {
    const m = new Mesh(new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0), new THREE.MeshBasicMaterial({ visible: false }));
    m.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    m.userData.zone = zn;
    racine.add(m);
    zones[zn].proxies.push(m);
  }
  /* point où se pose le repère rond de la zone */
  function ancre(zn, x, y, z) { zones[zn].ancre.set(x, y, z); }

  /* La surbrillance remplace la couleur par celle de la zone (relief gardé) ; le GRIS
     désature et éclaircit une zone hors du calque allumé. */
  function teinter(mat, z) {
    const u = { uZC: { value: z.glow }, uHi: { value: 0 }, uGr: { value: 0 } };
    mat.userData.u = u;
    mat.onBeforeCompile = function (sh) {
      sh.uniforms.uZC = u.uZC; sh.uniforms.uHi = u.uHi; sh.uniforms.uGr = u.uGr;
      sh.fragmentShader = sh.fragmentShader
        .replace("#include <common>", "#include <common>\nuniform vec3 uZC;\nuniform float uHi;\nuniform float uGr;")
        .replace("#include <color_fragment>", "#include <color_fragment>\nfloat lu = dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11));\ndiffuseColor.rgb = mix(diffuseColor.rgb, uZC * (0.5 + 0.95 * lu), uHi * 0.82);\ndiffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.86 + 0.12 * lu), uGr * 0.8);")
        .replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\ntotalEmissiveRadiance += uZC * uHi * 0.42;");
    };
    mat.customProgramCacheKey = function () { return "rue-teinte"; };
  }

  function finir() {
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
    const ga = new BufferGeometry();
    ga.setAttribute("position", new BufferAttribute(new Float32Array(aretes), 3));
    racine.add(new THREE.LineSegments(ga, new THREE.LineBasicMaterial({ color: P.bleu, transparent: true, opacity: 0.22 })));
  }

  function appliquer(z) {
    z.mats.forEach(function (e) {
      if (e.lum) return;
      e.mat.userData.u.uHi.value = z.hi;
      e.mat.userData.u.uGr.value = z.gr;
      if (e.op < 1) e.mat.opacity = Math.min(1, e.op + 0.35 * z.hi);
    });
  }
  /* chaque zone rejoint en douceur sa cible de surbrillance et de gris */
  function animer(t, dt) {
    let bouge = false;
    Object.keys(zones).forEach(function (id) {
      const z = zones[id];
      let a = false;
      if (Math.abs(z.cible - z.hi) > 0.002) { z.hi += (z.cible - z.hi) * Math.min(1, dt * 9); a = true; }
      else if (z.hi !== z.cible) { z.hi = z.cible; a = true; }
      if (Math.abs(z.grCible - z.gr) > 0.002) { z.gr += (z.grCible - z.gr) * Math.min(1, dt * 7); a = true; }
      else if (z.gr !== z.grCible) { z.gr = z.grCible; a = true; }
      if (a) { appliquer(z); bouge = true; }
    });
    return bouge;
  }

  return { THREE: THREE, P: P, FZ: FZ, racine: racine, zones: zones, alea: alea,
    bx: bx, bxr: bxr, cy: cy, cyv: cyv, tube: tube, canal: canal, gaine: gaine, sp: sp, ext: ext, extX: extX,
    proxy: proxy, ancre: ancre, finir: finir, animer: animer };
}
