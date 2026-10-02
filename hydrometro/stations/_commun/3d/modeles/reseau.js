/* HydroMétro 3D — famille « reseau » : le banc de pertes de charge (pertesCharge) et le débitmètre (debitmetre).
   Unités : mm. Y vers le haut, +Z = vers l'élève.

   ── pertesCharge ──────────────────────────────────────────────────────────────────────────
   Repère : un banc en L posé sur un panneau. L'eau entre à gauche (-X), suit un tube de cuivre droit,
   tourne dans un coude (en X = 0), puis file vers l'élève (+Z) : prise de pression, vanne à boule,
   prise, filtre à tamis, prise, sortie. Cinq manomètres (cadran, bar) mesurent la pression à chaque
   endroit : le 1er à l'entrée, le 2e après le tube droit, le 3e après le coude, le 4e après la vanne,
   le 5e après le filtre.

   CE QUE L'ÉLÈVE DOIT VOIR : la pression BAISSE le long du trajet. Un peu dans le tube droit
   (perte régulière, le frottement), beaucoup à chaque obstacle (pertes singulières : coude, vanne,
   filtre). Plus de débit, bien plus de perte (à peu près le carré). Un filtre encrassé coûte très cher.

   « Voir en coupe » tranche tout par le plan horizontal de l'axe des tubes (le dessus est retiré) :
   on voit de dessus le tube, le coude, la boule percée de la vanne, le tamis ; les faces coupées sont
   hachurées, l'eau est teintée (bleu foncé = pression forte, bleu clair = pression faible) et ses grains
   vont plus vite dans les étranglements. Les manomètres restent entiers (on ne coupe pas un instrument).

   Valeurs d'EXEMPLE, comme celles de la station (Δp = K × Q², K en bar par (m³/h)²) : exagérées par
   rapport à un banc réel pour que les aiguilles bougent à l'œil. À confirmer avec les relevés de l'atelier. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  const D = Math.PI / 180;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });

  /* ================================================================ aides communes à la famille
     (recopiées de pompes.js, vannes.js et securite.js : matières propres double face, hachures,
     faces de coupe, cadran de manomètre, formes de révolution) */
  const aides = (T, K) => {
    const A = {};
    A.C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; return c; };
    A.hachures = (fond, trait, pas) => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = fond; x.fillRect(0, 0, 64, 64);
      x.strokeStyle = trait; x.lineWidth = 5;
      for (let i = -64; i <= 64; i += 32) { x.beginPath(); x.moveTo(i, 64); x.lineTo(i + 64, 0); x.stroke(); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / pas, 1 / pas);
      return new T.MeshStandardMaterial({ map: t, roughness: 0.75, metalness: 0.05, side: T.DoubleSide });
    };
    /* le tamis en coupe : de petits carrés alternés, comme une grille vue de près */
    A.damier = (c1, c2, pas) => {
      const c = document.createElement('canvas'); c.width = c.height = 32;
      const x = c.getContext('2d');
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? c1 : c2; x.fillRect(i * 8, j * 8, 8, 8); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / pas, 1 / pas);
      return new T.MeshStandardMaterial({ map: t, roughness: 0.6, side: T.DoubleSide });
    };
    A.uni = (couleur, extra) => new T.MeshStandardMaterial(Object.assign({ color: couleur, roughness: 0.6, side: T.DoubleSide }, extra || {}));
    A.rect = (x0, x1, z0, z1) => [[x0, z0], [x1, z0], [x1, z1], [x0, z1]];
    /* un rectangle et son symétrique (x → -x) */
    A.sym = (x0, x1, z0, z1) => [A.rect(x0, x1, z0, z1), A.rect(-x1, -x0, z0, z1)];
    /* un arc épais (polygone dans le plan x, z) : x = cx + r cos, z = cz + r sin */
    A.arc = (cx, cz, r0, r1, th0, th1) => {
      const n = Math.max(2, Math.ceil(Math.abs(th1 - th0) / 4)), p = [];
      for (let i = 0; i <= n; i++) { const a = (th0 + (th1 - th0) * i / n) * D; p.push([cx + r1 * Math.cos(a), cz + r1 * Math.sin(a)]); }
      for (let i = n; i >= 0; i--) { const a = (th0 + (th1 - th0) * i / n) * D; p.push([cx + r0 * Math.cos(a), cz + r0 * Math.sin(a)]); }
      return p;
    };
    A.translate = (poly, dx, dz) => poly.map(q => [q[0] + dx, q[1] + dz]);
    /* une face de coupe dans le plan y = 0 (coordonnées x, z du monde) */
    A.faceDe = (polys, mat, y, groupe) => {
      const g = new T.ShapeGeometry(polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1])))));
      g.rotateX(Math.PI / 2);
      const m = new T.Mesh(g, mat); m.position.y = y; m.userData.sansOmbre = true; m.castShadow = false; if (mat.transparent) m.userData.voile = true;
      groupe.add(m); return m;
    };
    /* formes de révolution : axe Z (profil en [rayon, z]) ou axe Y */
    A.lathZ = (pts, mat, seg) => { const g = new T.LatheGeometry(pts.map(p => new T.Vector2(p[0], p[1])), seg || 48); g.rotateX(Math.PI / 2); return new T.Mesh(g, mat); };
    A.cylZ = (r, z0, z1, mat, seg) => { const g = K.cylindre(r, z1 - z0, seg || 32); g.rotateX(Math.PI / 2); g.translate(0, 0, (z0 + z1) / 2); return new T.Mesh(g, mat); };
    A.anneauZ = (rE, rI, z0, z1, mat, seg) => { const g = K.anneau(rE, rI, z1 - z0, seg || 40); g.rotateX(Math.PI / 2); g.translate(0, 0, (z0 + z1) / 2); return new T.Mesh(g, mat); };
    A.anneauX = (rE, rI, x0, x1, mat, seg) => { const g = K.anneau(rE, rI, x1 - x0, seg || 40); g.rotateZ(Math.PI / 2); g.translate((x0 + x1) / 2, 0, 0); return new T.Mesh(g, mat); };
    A.cylY = (r, y0, y1, mat, seg) => K.mesh(K.cylindre(r, y1 - y0, seg || 32), mat, 0, (y0 + y1) / 2, 0);
    A.anneauY = (rE, rI, y0, y1, mat, seg) => K.mesh(K.anneau(rE, rI, y1 - y0, seg || 40), mat, 0, (y0 + y1) / 2, 0);
    /* un écrou six pans percé, axe Y */
    A.hexY = (rHex, rTrou, y0, y1, mat) => {
      const s = new T.Shape();
      for (let k = 0; k < 6; k++) { const a = k * 60 * D; k ? s.lineTo(Math.cos(a) * rHex, Math.sin(a) * rHex) : s.moveTo(Math.cos(a) * rHex, Math.sin(a) * rHex); }
      if (rTrou > 0) { const h = new T.Path(); h.absarc(0, 0, rTrou, 0, Math.PI * 2, true); s.holes.push(h); }
      const g = new T.ExtrudeGeometry(s, { depth: y1 - y0, bevelEnabled: false, curveSegments: 24 });
      g.rotateX(-Math.PI / 2); g.translate(0, y0, 0);
      return new T.Mesh(g, mat);
    };
    /* l'écrou six pans de l'union : axe +X, de x0 à x0 + L ; plats dessus et dessous */
    A.hexX = (RH, rInt, x0, L, mat) => {
      const s = new T.Shape();
      for (let k = 0; k < 6; k++) { const a = k * 60 * D; k ? s.lineTo(RH * Math.cos(a), RH * Math.sin(a)) : s.moveTo(RH * Math.cos(a), RH * Math.sin(a)); }
      const h = new T.Path(); h.absarc(0, 0, rInt, 0, Math.PI * 2, true); s.holes.push(h);
      const g = new T.ExtrudeGeometry(s, { depth: L, bevelEnabled: false, curveSegments: 20 });
      g.rotateY(Math.PI / 2); g.translate(x0, 0, 0);
      return new T.Mesh(g, mat);
    };
    /* un cadran de manomètre : graduations, chiffres, unité, zone rouge (marquages réels) */
    A.cadranMat = (max, majeur, mineur, unite, zone) => {
      const c = document.createElement('canvas'); c.width = c.height = 256;
      const g = c.getContext('2d');
      g.fillStyle = '#f6f4ee'; g.fillRect(0, 0, 256, 256);
      const A0 = 225, SW = 270, cx = 128, cy = 128;
      const pt = (v, r) => { const a = (A0 - SW * v / max) * D; return [cx + r * Math.cos(a), cy - r * Math.sin(a)]; };
      if (zone) {
        g.strokeStyle = '#c0392b'; g.lineWidth = 9; g.beginPath();
        for (let k = 0; k <= 24; k++) { const p = pt(zone[0] + (zone[1] - zone[0]) * k / 24, 112); k ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]); }
        g.stroke();
      }
      const n = Math.round(max / mineur), kM = Math.round(majeur / mineur);
      g.fillStyle = '#1f2933'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '800 30px Calibri, "Segoe UI", Arial, sans-serif';
      for (let k = 0; k <= n; k++) {
        const v = k * mineur, grand = k % kM === 0, p0 = pt(v, 100), p1 = pt(v, grand ? 80 : 90);
        g.strokeStyle = '#1f2933'; g.lineWidth = grand ? 4 : 2; g.beginPath(); g.moveTo(p0[0], p0[1]); g.lineTo(p1[0], p1[1]); g.stroke();
        if (grand) { const q = pt(v, 62); g.fillText(String(Math.round(v * 100) / 100), q[0], q[1]); }
      }
      g.font = '800 30px Calibri, "Segoe UI", Arial, sans-serif'; g.fillText(unite, cx, cy + 56);
      const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4;
      /* transparent : la surbrillance de la pièce ne repeint pas le cadran (il resterait illisible) */
      return new T.MeshBasicMaterial({ map: t, toneMapped: false, transparent: true });
    };
    /* un instrument à cadran, face vers +Z, origine au centre du fond du boîtier */
    A.jauge = (mats, max, majeur, mineur, unite, zone) => {
      const g = new T.Group();
      g.add(A.anneauZ(33, 29.5, -6, 9, mats.acier, 48), A.cylZ(33, -9, -6, mats.acier, 48));
      const face = new T.Mesh(new T.CircleGeometry(29.5, 48), A.cadranMat(max, majeur, mineur, unite, zone)); face.position.z = 8.4; g.add(face);
      const pivot = new T.Group(); pivot.position.z = 9.2; g.add(pivot);
      pivot.add(K.mesh(new T.BoxGeometry(2.4, 31, 0.8), mats.noir, 0, 9.5, 0));
      g.add(A.cylZ(3.4, 9.2, 11, mats.noir, 20));
      /* pas de verre : une vitre allumée voilerait le cadran */
      return { g, pivot, regler: v => { pivot.rotation.z = (135 - 270 * clamp(v / max, 0, 1.04)) * D; } };
    };
    return A;
  };

  /* ================================================================ LE BANC DE PERTES DE CHARGE */
  Electro3D.definir('pertesCharge', (T, K, ctx) => {
    const M = K.mat;
    const A = aides(T, K), C = A.C;
    const racine = new T.Group();
    const V = (x, y, z) => new T.Vector3(x, y, z);

    /* ---------------------------------------------------------------- cotes (mm) */
    const RE = 14, RI = 12.5;                 /* tube de cuivre 28 × 1,5 (paroi exagérée : 1,2 en vrai) */
    const RC = 40, CX = RC;                   /* rayon du coude ; le tube d'après est à x = 40 */
    const X0 = -435;                          /* début du tube (entrée, côté union) */
    const XG1 = -355, XG2 = -105;             /* prises 1 et 2, sur le tube droit */
    const ZG3 = 100, ZV = 180, ZG4 = 240, ZF = 350, ZG5 = 450, ZU = 475;
    const Y_PAN = -52;                        /* dessus du panneau */
    const P0 = 5.0;                           /* pression d'entrée, bar */
    const COUDE_LONG = RC * Math.PI / 2;

    /* ---------------------------------------------------------------- matières */
    const cuivre = C(M.cuivre), laiton = C(M.laiton, 0xd9bb68), bronze = C(M.laiton, 0xc49a4a);
    const inox = C(M.acier, 0xd5dade), noir = C(M.plastiqueNoir), zingue = C(M.zingue);
    const caout = C(M.caoutchouc), rouge = C(M.plastiqueRouge), ptfe = C(M.plastiqueBlanc);
    const panneauMat = C(M.plastiqueBlanc, 0xdcd6c8); panneauMat.roughness = 0.8;
    const grisColl = C(M.plastique, 0xb9bec5);
    const boue = C(M.sable, 0x6d4b2c); boue.roughness = 0.95;
    /* le tamis : une tôle perforée (trous vraiment ouverts) */
    const alphaTamis = (() => {
      const c = document.createElement('canvas'); c.width = c.height = 16;
      const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, 16, 16);
      x.fillStyle = '#000'; x.beginPath(); x.arc(8, 8, 4.2, 0, Math.PI * 2); x.fill();
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(52, 22); return t;
    })();
    const tamisMat = new T.MeshStandardMaterial({ color: 0xc9d0d8, metalness: 0.8, roughness: 0.4, alphaMap: alphaTamis, alphaTest: 0.5, side: T.DoubleSide });

    /* ---------------------------------------------------------------- aides de forme */
    const tubeX = (x0, x1, mat) => A.anneauX(RE, RI, x0, x1, mat, 40);
    const tubeZ = (z0, z1, mat) => { const m = A.anneauZ(RE, RI, z0, z1, mat, 40); m.position.x = CX; return m; };
    /* le coude : deux coques (extérieur et intérieur du tube) sur un quart de cercle */
    const arcPts = n => { const p = []; for (let i = 0; i <= n; i++) { const th = i / n * 90 * D; p.push(V(RC * Math.sin(th), 0, RC - RC * Math.cos(th))); } return p; };

    /* ================================================================ LE PANNEAU ET LES COLLIERS */
    const support = new T.Group();
    support.add(K.mesh(K.boite(665, 16, 685, 4), panneauMat, -207.5, Y_PAN - 8, 257.5));
    const collier = (axe, p) => {
      const g = new T.Group();
      g.add(K.mesh(K.boite(axe === 'x' ? 26 : 30, 37, axe === 'x' ? 30 : 26, 2), grisColl, 0, -33.5, 0));
      const s = axe === 'x' ? A.anneauX(17, 14.4, -4, 4, zingue, 32) : A.anneauZ(17, 14.4, -4, 4, zingue, 32);
      g.add(s);
      if (axe === 'x') g.position.set(p, 0, 0); else g.position.set(CX, 0, p);
      return g;
    };
    [-250, -35].forEach(x => support.add(collier('x', x)));
    [115, 268, 430].forEach(z => support.add(collier('z', z)));
    racine.add(support);

    /* ================================================================ LES TUBES (régulière) */
    const tubes = new T.Group();
    tubes.add(tubeX(X0, 0, cuivre));
    tubes.add(tubeZ(RC, ZV - 28, cuivre), tubeZ(ZV + 28, ZF - 46, cuivre), tubeZ(ZF + 46, ZU + 10, cuivre));
    racine.add(tubes);

    /* ================================================================ LE COUDE (singulière) */
    const coude = new T.Group();
    coude.add(K.fil(arcPts(14), RE, cuivre, { radial: 28, pas: 3 }).mesh);
    coude.add(K.fil(arcPts(14), RI, cuivre, { radial: 28, pas: 3 }).mesh);
    racine.add(coude);

    /* ================================================================ LES RACCORDS UNION ET LES FLEXIBLES */
    const raccords = new T.Group();
    const union = (x0, sens) => {
      const g = new T.Group();
      g.add(A.anneauX(17.5, RI + 1.5, 0, 30, laiton, 36), A.hexX(20.5, RI + 1.5, 6, 14, laiton));
      g.add(A.anneauX(10, 6, -12, 0, laiton, 20));
      if (sens === 'x') { g.position.set(x0, 0, 0); } else { g.rotation.y = -Math.PI / 2; g.position.set(CX, 0, x0); }
      raccords.add(g); return g;
    };
    union(X0, 'x'); union(ZU, 'z');
    raccords.add(K.fil([[X0 - 12, 0, 0], [X0 - 50, -3, 0], [X0 - 90, -9, 0]], 8, caout, { radial: 16, pas: 4 }).mesh);
    raccords.add(K.fil([[CX, 0, ZU + 42], [CX, -3, ZU + 80], [CX, -9, ZU + 120]], 8, caout, { radial: 16, pas: 4 }).mesh);
    racine.add(raccords);

    /* ================================================================ LA VANNE À BOULE */
    const vanne = new T.Group(); vanne.position.set(CX, 0, ZV); racine.add(vanne);
    const RB = 19, RBORE = 10, RCH = 21.5;
    {
      /* le corps : une coupe de révolution (rayon, z) : parois d'extrémité percées, chambre, deux manchons à souder */
      const prof = [[10, -22], [10, -28], [14, -28], [14, -48], [18, -48], [18, -28], [24.5, -28], [24.5, 28], [18, 28], [18, 48], [14, 48], [14, 28], [10, 28], [10, 22], [RCH, 22], [RCH, -22], [10, -22]];
      vanne.add(A.lathZ(prof, laiton, 56));
      /* les sièges en PTFE : un coin qui épouse la boule */
      const siege = s => {
        const pts = []; for (let x = 10; x <= 16.5; x += 1.1) pts.push([x, s * Math.sqrt(19.4 * 19.4 - x * x)]);
        pts.push([16.5, s * Math.sqrt(19.4 * 19.4 - 16.5 * 16.5)], [16.5, s * 22], [10, s * 22]);
        return A.lathZ(pts, ptfe, 40);
      };
      vanne.add(siege(1), siege(-1));
      /* le col, vers le haut (au-dessus du plan de coupe) et l'écrou de presse-étoupe */
      vanne.add(A.cylY(11, 16, 36, laiton, 28), A.hexY(14, 4.6, 36, 41, laiton));
    }
    /* la boule : une zone de sphère (sans les deux calottes) + le tube de son trou, tourne autour de l'axe Y */
    const bille = new T.Group(); bille.position.set(CX, 0, ZV); racine.add(bille);
    {
      const th0 = Math.asin(RBORE / RB);
      const gs = new T.SphereGeometry(RB, 40, 22, 0, Math.PI * 2, th0, Math.PI - 2 * th0); gs.rotateX(Math.PI / 2);
      bille.add(new T.Mesh(gs, inox));
      const L = 2 * Math.sqrt(RB * RB - RBORE * RBORE) + 0.4, gt = new T.CylinderGeometry(RBORE, RBORE, L, 28, 1, true); gt.rotateX(Math.PI / 2);
      bille.add(new T.Mesh(gt, inox));
      bille.add(A.cylY(4.5, 14, 37, inox, 20));
    }
    /* la poignée : tige, levier d'acier gainé de rouge, écrou ; parallèle au tube = ouverte */
    const poignee = new T.Group(); poignee.position.set(CX, 0, ZV); racine.add(poignee);
    poignee.add(A.cylY(4.5, 36, 58, inox, 20));
    poignee.add(K.mesh(K.boite(15, 3, 126, 1.2), zingue, 0, 49.5, 36));
    poignee.add(K.mesh(K.boite(19, 9, 80, 3), rouge, 0, 49.5, 62));
    poignee.add(A.hexY(7.5, 0, 51.5, 58, zingue));

    /* ================================================================ LE FILTRE À TAMIS */
    const filtre = new T.Group(); filtre.position.set(CX, 0, ZF); racine.add(filtre);
    const couvercle = new T.Group(); couvercle.position.set(CX, 0, ZF); racine.add(couvercle);
    const panier = new T.Group(); panier.position.set(CX, 0, ZF); racine.add(panier);
    const RF_I = 38, RF_E = 44, RP_I = 24.5, RP_E = 26;
    {
      filtre.add(A.anneauY(RF_E, RF_I, -46, 34, bronze, 56));
      filtre.add(A.cylY(RF_E, -46, -40, bronze, 56));
      [-1, 1].forEach(s => {
        filtre.add(A.anneauZ(18, 14, s > 0 ? 36 : -64, s > 0 ? 64 : -36, bronze, 28));
        filtre.add(A.anneauZ(20.5, 18, s > 0 ? 52 : -64, s > 0 ? 64 : -52, bronze, 6));
      });
      couvercle.add(A.cylY(50, 34, 46, bronze, 56), A.cylY(14, 46, 52, bronze, 28));
      for (let i = 0; i < 6; i++) { const a = i * 60 * D, v = K.vis(3.8, { croix: false, matiere: zingue }); v.position.set(Math.cos(a) * 41, 46, Math.sin(a) * 41); couvercle.add(v); }
      /* le panier : tôle perforée ouverte du côté de l'entrée (-Z), fond plein, collerette en haut */
      const prof = [new T.Vector2(RP_I, -34), new T.Vector2(RP_E, -34), new T.Vector2(RP_E, 32), new T.Vector2(RP_I, 32), new T.Vector2(RP_I, -34)];
      panier.add(new T.Mesh(new T.LatheGeometry(prof, 56, -149 * D, 298 * D), tamisMat));
      panier.add(A.cylY(RP_E, -36, -34, inox, 48), A.anneauY(36, RP_I, 30, 34, inox, 56));
    }
    /* les saletés : des petits cailloux bruns collés au tamis, du côté où le jet arrive (visibles si encrassé) */
    const saletes = new T.Group(); panier.add(saletes);
    {
      let g = 7;
      const alea = () => { g = (g * 16807) % 2147483647; return g / 2147483647; };
      for (let i = 0; i < 26; i++) {
        const th = (38 + alea() * 104) * D, r = 22.8 - alea() * 3, y = -3 - alea() * 28, s = 2.6 + alea() * 2.4;
        const m = new T.Mesh(new T.IcosahedronGeometry(s, 0), boue);
        m.position.set(Math.cos(th) * r, y, Math.sin(th) * r); m.rotation.set(alea() * 3, alea() * 3, alea() * 3);
        m.scale.set(1, 0.7 + alea() * 0.5, 1); m.userData.sansOmbre = true; m.castShadow = false;
        saletes.add(m);
      }
    }

    /* ================================================================ LES PRISES ET LES MANOMÈTRES */
    const prises = new T.Group(), jauges = new T.Group();
    racine.add(prises, jauges);
    const PRISES = [
      { nom: 'G1', px: XG1, pz: 0, o: 0 }, { nom: 'G2', px: XG2, pz: 0, o: 0 },
      { nom: 'G3', px: CX, pz: ZG3, o: Math.PI / 2 }, { nom: 'G4', px: CX, pz: ZG4, o: Math.PI / 2 }, { nom: 'G5', px: CX, pz: ZG5, o: Math.PI / 2 }
    ];
    PRISES.forEach(p => {
      const g = new T.Group(); g.position.set(p.px, 0, p.pz); g.rotation.y = p.o;
      g.add(A.cylZ(9, 12.5, 20, laiton, 24), A.anneauZ(6, 3.5, 20, 38, laiton, 20));
      prises.add(g);
      const jg = new T.Group(); jg.position.set(p.px, 0, p.pz); jg.rotation.y = p.o;
      const j = A.jauge({ acier: inox, noir }, 6, 1, 0.2, 'bar', [5.5, 6]);
      j.g.scale.setScalar(1.3); j.g.position.z = 38 + 9 * 1.3; jg.add(j.g);
      jauges.add(jg); p.regler = j.regler;
      p.tr = (lx, lz) => p.o === 0 ? [p.px + lx, p.pz + lz] : [p.px + lz, p.pz - lx];
    });
    /* position de chaque prise sur le trajet (abscisse curviligne) : pour lire la pression */

    /* ================================================================ LES FACES DE COUPE
       Dessinées dans le plan y = 0 (coordonnées x, z du monde), hachures à 45° comme sur un plan. */
    const H = {
      laiton: A.hachures('#b08f45', '#6a511c', 6),
      bronze: A.hachures('#a07a35', '#5a4216', 6),
      inox: A.hachures('#2f3944', '#0d1217', 2.4),
      cuivre: A.uni(0xb8683c, { metalness: 0.3, roughness: 0.5 }),
      ptfe: A.uni(0xf1efe8),
      tamis: A.damier('#a9b3be', '#3a4551', 1.2),
      boue: A.uni(0x6d4b2c, { transparent: true, opacity: 1 })
    };
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const grp = (parent) => { const g = new T.Group(); (parent || faces).add(g); return g; };
    const R = A.rect, S = A.sym, TR = A.translate;

    /* le tube droit : quatre filets (parois), l'un d'eux interrompu devant les prises */
    const facesTube = grp();
    {
      const strips = [];
      const coupe = (a, b, trous) => { let cur = a; const out = []; trous.sort((u, v) => u - v).forEach(t => { if (t - 3.5 > cur) out.push([cur, t - 3.5]); cur = t + 3.5; }); if (b > cur) out.push([cur, b]); return out; };
      /* tube d'entrée : côté +Z interrompu en G1 et G2 */
      coupe(X0, 0, [XG1, XG2]).forEach(([a, b]) => strips.push(R(a, b, RI, RE)));
      strips.push(R(X0, 0, -RE, -RI));
      /* tubes d'après : côté +X interrompu en G3, G4, G5 */
      [[RC, ZV - 28, [ZG3]], [ZV + 28, ZF - 46, [ZG4]], [ZF + 46, ZU + 10, [ZG5]]].forEach(([a, b, t]) => {
        coupe(a, b, t).forEach(([u, w]) => strips.push(R(CX + RI, CX + RE, u, w)));
        strips.push(R(CX - RE, CX - RI, a, b));
      });
      A.faceDe(strips, H.cuivre, 0.12, facesTube);
    }
    /* le coude : deux bandes sur le quart de cercle */
    const facesCoude = grp();
    {
      const bande = (r0, r1) => {
        const n = 16, p = [];
        for (let i = 0; i <= n; i++) { const a = i / n * 90 * D; p.push([r1 * Math.sin(a), RC - r1 * Math.cos(a)]); }
        for (let i = n; i >= 0; i--) { const a = i / n * 90 * D; p.push([r0 * Math.sin(a), RC - r0 * Math.cos(a)]); }
        return p;
      };
      A.faceDe([bande(RC + RI, RC + RE), bande(RC - RE, RC - RI)], H.cuivre, 0.12, facesCoude);
    }
    /* les raccords union (repère local : x le long de l'écoulement) */
    const facesRaccords = grp();
    {
      const un = (poly, o) => poly.map(q => o === 'x' ? [X0 + q[0], q[1]] : [CX + q[1], ZU + q[0]]);
      const loc = [R(0, 30, RE, 17.5), R(0, 30, -17.5, -RE), R(6, 20, 17.5, 20.5), R(6, 20, -20.5, -17.5)];
      const mapped = [];
      ['x', 'z'].forEach(o => loc.forEach(p => mapped.push(un(p, o))));
      A.faceDe(mapped, H.laiton, 0.12, facesRaccords);
    }
    /* la vanne : corps, sièges, boule (qui tourne) */
    const facesVanne = new T.Group(); facesVanne.position.set(CX, 0, ZV); faces.add(facesVanne);
    const facesCorpsV = grp(facesVanne), facesBille = grp(facesVanne);
    {
      const murs = [...S(RCH, 24.5, -28, 28), ...S(10, 24.5, 22, 28), ...S(10, 24.5, -28, -22), ...S(14, 18, 28, 48), ...S(14, 18, -48, -28)];
      A.faceDe(murs, H.laiton, 0.12, facesCorpsV);
      A.faceDe(S(RI, RE, 28, 48).concat(S(RI, RE, -48, -28)), H.cuivre, 0.12, facesCorpsV);
      const siege = s => { const p = []; for (let x = 10; x <= 16.5 + 1e-6; x += 1.1) p.push([x, s * Math.sqrt(19.4 * 19.4 - x * x)]); p.push([16.5, s * 22], [10, s * 22]); return p; };
      const sg = [siege(1), siege(-1)]; sg.push(...sg.map(p => p.map(q => [-q[0], q[1]])));
      A.faceDe(sg, H.ptfe, 0.14, facesCorpsV);
      /* les deux calottes de la boule (le trou est entre elles) */
      const cap = (s) => {
        const u = Math.sqrt(RB * RB - RBORE * RBORE), a0 = Math.asin(u / RB), p = [[s * RBORE, -u]];
        for (let i = 0; i <= 24; i++) { const a = -a0 + 2 * a0 * i / 24; p.push([s * RB * Math.cos(a), RB * Math.sin(a)]); }
        p.push([s * RBORE, u]); return p;
      };
      A.faceDe([cap(1), cap(-1)], H.inox, 0.16, facesBille);
    }
    /* le filtre : paroi, manchons, conduit d'entrée, tamis, gâteau de saletés (repère local, centré sur le filtre) */
    const facesFiltre = new T.Group(); facesFiltre.position.set(CX, 0, ZF); faces.add(facesFiltre);
    const facesCorpsF = grp(facesFiltre), facesPanier = grp(facesFiltre);
    const ZI = -Math.sqrt(RP_I * RP_I - RI * RI);      /* où le panier rencontre le conduit : -21,07 */
    {
      A.faceDe([A.arc(0, 0, RF_I, RF_E, -70.8, 70.8), A.arc(0, 0, RF_I, RF_E, 109.2, 250.8)], H.bronze, 0.12, facesCorpsF);
      const man = [...S(14, 18, 36, 64), ...S(14, 18, -64, -36), ...S(RI, 14, 36, 46), ...S(RI, 14, -46, -36), ...S(RI, 14, -36, ZI)];
      A.faceDe(man, H.bronze, 0.12, facesCorpsF);
      A.faceDe([...S(RI, RE, 46, 64), ...S(RI, RE, -64, -46)], H.cuivre, 0.14, facesCorpsF);
      A.faceDe([A.arc(0, 0, RP_I, RP_E, -59.3, 239.3)], H.tamis, 0.14, facesPanier);
    }
    const facesBoue = grp(facesFiltre); facesBoue.visible = false;
    A.faceDe([A.arc(0, 0, 20.5, RP_I, 40, 140)], H.boue, 0.18, facesBoue);
    /* les prises : parois (laiton) */
    const facesPrises = grp();
    {
      const polys = [];
      PRISES.forEach(p => { [...S(3.5, 9, 12.5, 20), ...S(3.5, 6, 20, 38)].forEach(q => polys.push(q.map(v => p.tr(v[0], v[1])))); });
      A.faceDe(polys, H.laiton, 0.12, facesPrises);
    }

    /* ================================================================ LA PRESSION, LE LONG DU TRAJET
       s = abscisse sur l'axe des tubes depuis l'entrée. Le modèle est celui de la station : Δp = K × Q². */
    const sLeg2 = z => -X0 + COUDE_LONG + (z - RC);
    const sOf = (x, z) => {
      if (x < 0) return x - X0;
      if (z > RC) return sLeg2(z);
      return -X0 + RC * clamp(Math.atan2(x, RC - z), 0, Math.PI / 2);
    };
    const E = { q: 2, c: 20, d: 0, coupe: false, demonte: false };
    const cur = { q: 2, c: 20, d: 0 };
    const chutes = (q, c, d) => {
      let dt = 0.03 * q * q, dc = 0.06 * q * q, dv = (0.04 + 0.2 * Math.pow(c / 90, 2)) * q * q, df = (0.06 + 0.24 * d) * q * q;
      const tot = dt + dc + dv + df, lim = P0 - 0.3;
      if (tot > lim) { const k = lim / tot; dt *= k; dc *= k; dv *= k; df *= k; }
      return { dt, dc, dv, df, tot: dt + dc + dv + df };
    };
    let noeuds = [];
    const pS = s => {
      if (s <= noeuds[0][0]) return noeuds[0][1];
      for (let i = 1; i < noeuds.length; i++) if (s <= noeuds[i][0]) { const a = noeuds[i - 1], b = noeuds[i], t = (s - a[0]) / (b[0] - a[0] || 1); return a[1] + (b[1] - a[1]) * t; }
      return noeuds[noeuds.length - 1][1];
    };
    let pAprVanne = P0, pAprFiltre = P0;      /* pression juste avant et juste après le tamis */
    const majNoeuds = () => {
      const f = chutes(cur.q, cur.c, cur.d);
      const p1 = P0 - f.dt, p2 = p1 - f.dc, p3 = p2 - f.dv, p4 = p3 - f.df;
      noeuds = [[0, P0], [XG1 - X0, P0], [XG2 - X0, p1], [-X0, p1], [-X0 + COUDE_LONG, p2],
        [sLeg2(ZV - 22), p2], [sLeg2(ZV + 22), p3], [sLeg2(ZF - 60), p3], [sLeg2(ZF + 60), p4], [sLeg2(ZU + 10), p4]];
      pAprVanne = p3; pAprFiltre = p4;
      return f;
    };
    const pAt = (x, z) => pS(sOf(x, z));
    const pTap = p => pS(sOf(p.px, p.pz));       /* la prise lit la pression de son tube */

    /* ================================================================ L'EAU EN COUPE : des cellules à sommets colorés */
    const cells = [];
    const addCell = (pts, pf) => cells.push({ pts, pf });
    const rectCells = (x0, x1, z0, z1, pf, axe, cuts) => {
      const lo = axe === 'x' ? x0 : z0, hi = axe === 'x' ? x1 : z1;
      const br = [lo, ...(cuts || []).filter(c => c > lo && c < hi), hi];
      for (let i = 0; i < br.length - 1; i++) addCell(axe === 'x' ? R(br[i], br[i + 1], z0, z1) : R(x0, x1, br[i], br[i + 1]), pf);
    };
    const pConst = f => () => f();
    /* le tube d'entrée, le coude, le tube d'après */
    rectCells(X0, 0, -RI, RI, pAt, 'x', [XG1, XG2]);
    for (let i = 0; i < 6; i++) {
      const a0 = i * 15 * D, a1 = (i + 1) * 15 * D, p = [];
      for (let k = 0; k <= 4; k++) { const a = a0 + (a1 - a0) * k / 4, r = RC + RI; p.push([r * Math.sin(a), RC - r * Math.cos(a)]); }
      for (let k = 4; k >= 0; k--) { const a = a0 + (a1 - a0) * k / 4, r = RC - RI; p.push([r * Math.sin(a), RC - r * Math.cos(a)]); }
      addCell(p, pAt);
    }
    rectCells(CX - RI, CX + RI, RC, ZV - 28, pAt, 'z', [ZG3]);
    /* la vanne : la chambre et ses deux passages en une seule forme */
    {
      const yy = Math.sqrt(RCH * RCH - 100), a0 = Math.atan2(-yy, 10);
      const p = [[CX - 10, ZV - 28], [CX + 10, ZV - 28]];
      for (let i = 0; i <= 28; i++) { const a = a0 - 2 * a0 * i / 28; p.push([CX + RCH * Math.cos(a), ZV + RCH * Math.sin(a)]); }
      p.push([CX + 10, ZV + 28], [CX - 10, ZV + 28]);
      const b0 = Math.atan2(yy, -10);
      for (let i = 0; i <= 28; i++) { const a = b0 + (2 * Math.PI - 2 * b0) * i / 28; p.push([CX + RCH * Math.cos(a), ZV + RCH * Math.sin(a)]); }
      addCell(p, pAt);
    }
    rectCells(CX - RI, CX + RI, ZV + 28, ZF - 46, pAt, 'z', []);
    /* le filtre : avant le tamis (dans le panier et son conduit) et après (autour, et la sortie) */
    {
      const a = [[CX + RI, ZF - 46], [CX + RI, ZF + ZI]];
      for (let i = 0; i <= 40; i++) { const t = (-59.3 + (239.3 + 59.3) * i / 40) * D; a.push([CX + RP_I * Math.cos(t), ZF + RP_I * Math.sin(t)]); }
      a.push([CX - RI, ZF + ZI], [CX - RI, ZF - 46]);
      addCell(a, pConst(() => pAprVanne));
      const yO = Math.sqrt(RF_I * RF_I - 14 * 14), yI = Math.sqrt(RP_E * RP_E - 14 * 14), th = ang => ang * D;
      const o0 = -Math.acos(14 / RF_I) / D, o1 = Math.asin(RI / RF_I) / D;                 /* -68,4 ; 19,2 → 70,8 = 90 - 19,2 */
      const b = [[CX + 14, ZF - yI], [CX + 14, ZF - yO]];
      for (let i = 0; i <= 24; i++) { const t = th(o0 + (70.8 - o0) * i / 24); b.push([CX + RF_I * Math.cos(t), ZF + RF_I * Math.sin(t)]); }
      b.push([CX + RI, ZF + 46], [CX - RI, ZF + 46]);
      for (let i = 0; i <= 24; i++) { const t = th(109.2 + (248.4 - 109.2) * i / 24); b.push([CX + RF_I * Math.cos(t), ZF + RF_I * Math.sin(t)]); }
      b.push([CX - 14, ZF - yI]);
      for (let i = 0; i <= 40; i++) { const t = th(237.4 + (-57.4 - 237.4) * i / 40); b.push([CX + RP_E * Math.cos(t), ZF + RP_E * Math.sin(t)]); }
      void o1;
      addCell(b, pConst(() => pAprFiltre));
    }
    rectCells(CX - RI, CX + RI, ZF + 46, ZU + 10, pAt, 'z', []);
    /* les canaux des prises */
    PRISES.forEach(p => addCell([[-3.5, 12.5], [3.5, 12.5], [3.5, 38], [-3.5, 38]].map(q => p.tr(q[0], q[1])), pConst(() => pTap(p))));

    /* l'eau (la coupe) : bleu moyen clair → bleu soutenu ; les grains, plus sombres, pour qu'on les suive */
    const cClair = new T.Color(0x9ccbf2), cMarine = new T.Color(0x2c6fc2), gClair = new T.Color(0xeaf5ff), gMarine = new T.Color(0x0c2a5e), cTmp = new T.Color();
    const tP = p => clamp((p - (P0 - 3)) / 3, 0, 1);
    const couleurP = p => cTmp.copy(cClair).lerp(cMarine, tP(p));
    const couleurG = p => cTmp.copy(gClair).lerp(gMarine, tP(p));
    let eauMesh = null, eauXZ = null, eauPf = null, eauCol = null;
    {
      const pos = [], idx = [], xs = [], zs = [], pfs = [];
      cells.forEach(c => {
        const g = new T.ShapeGeometry(new T.Shape(c.pts.map(q => new T.Vector2(q[0], q[1]))));
        const p = g.attributes.position, base = xs.length;
        for (let i = 0; i < p.count; i++) { xs.push(p.getX(i)); zs.push(p.getY(i)); pfs.push(c.pf); pos.push(p.getX(i), 0, p.getY(i)); }
        Array.from(g.index.array).forEach(k => idx.push(base + k));
        g.dispose();
      });
      const geo = new T.BufferGeometry();
      geo.setAttribute('position', new T.BufferAttribute(new Float32Array(pos), 3));
      eauCol = new T.BufferAttribute(new Float32Array(xs.length * 3), 3); geo.setAttribute('color', eauCol);
      geo.setIndex(idx); geo.computeVertexNormals();
      const mat = new T.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.82, depthWrite: false, toneMapped: false, side: T.DoubleSide });
      eauMesh = new T.Mesh(geo, mat); eauMesh.position.y = -0.3; eauMesh.userData.sansOmbre = true; eauMesh.userData.voile = true; eauMesh.castShadow = false;
      faces.add(eauMesh);
      eauXZ = { xs, zs }; eauPf = pfs;
    }
    const recolorerEau = () => {
      const { xs, zs } = eauXZ;
      for (let i = 0; i < xs.length; i++) { const c = couleurP(eauPf[i](xs[i], zs[i])); eauCol.setXYZ(i, c.r, c.g, c.b); }
      eauCol.needsUpdate = true;
    };

    /* ================================================================ LES GRAINS D'EAU
       Trois files de grains suivent le trajet : le tube, le coude, la vanne (dans le trou de la boule,
       à l'angle réel), le filtre (à travers le tamis). Ils vont plus vite là où le passage se rétrécit. */
    const LANES = [{ a: 6, psi: 160 }, { a: 0, psi: 100 }, { a: -6, psi: 20 }];
    const NG = 40, NT = LANES.length * NG, YG = -3.5;
    const thetaBille = () => 0.689 * cur.c * D;        /* 90 % de fermeture : 62 °, où le trou ne laisse plus qu'un filet */
    const trajet = (l) => {
      const a = l.a, pts = [];
      for (let x = X0 + 15; x <= -50; x += 70) pts.push(V(x, YG, a));
      const r = RC - a;
      for (let th = 0; th <= 90; th += 15) pts.push(V(r * Math.sin(th * D), YG, RC - r * Math.cos(th * D)));
      pts.push(V(CX - a, YG, 115), V(CX - a, YG, ZV - 42));
      const tb = thetaBille(), sn = Math.sin(tb), cs = Math.cos(tb);
      pts.push(V(CX - a * 0.6, YG, ZV - 28), V(CX - 9 * sn, YG, ZV - 11 * cs), V(CX + 9 * sn, YG, ZV + 11 * cs), V(CX - a * 0.6, YG, ZV + 28));
      pts.push(V(CX - a, YG, ZV + 50), V(CX - a, YG, ZF - 70), V(CX - a * 0.7, YG, ZF - 44), V(CX - a * 0.4, YG, ZF - 30));
      const cp = Math.cos(l.psi * D), sp = Math.sin(l.psi * D);
      pts.push(V(CX + 10 * cp, YG, ZF + 10 * sp), V(CX + 20 * cp, YG, ZF + 20 * sp), V(CX + 31 * cp, YG, ZF + 31 * sp));
      const n = Math.max(1, Math.round(Math.abs(l.psi - 90) / 20));
      for (let i = 1; i <= n; i++) { const t = (l.psi + (90 - l.psi) * i / n) * D; pts.push(V(CX + 32 * Math.cos(t), YG, ZF + 32 * Math.sin(t))); }
      pts.push(V(CX - a * 0.4, YG, ZF + 46), V(CX - a, YG, ZF + 75), V(CX - a, YG, ZU + 20));
      return new T.CatmullRomCurve3(pts, false, 'centripetal');
    };
    let courbes = [], longueurs = [];
    const majTrajets = () => { courbes = LANES.map(trajet); longueurs = courbes.map(c => c.getLength()); };
    const grains = new T.InstancedMesh(new T.SphereGeometry(3, 8, 6), new T.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }), NT);
    grains.userData.sansOmbre = true; grains.castShadow = false; grains.frustumCulled = false; grains.visible = false;
    racine.add(grains);
    const U = new Float32Array(NT); for (let i = 0; i < NT; i++) U[i] = ((i % NG) + 0.35 * Math.floor(i / NG)) / NG;
    const mult = p => {
      let m = 1;
      const dv = Math.hypot(p.x - CX, p.z - ZV);
      const kv = 1 + 5 * Math.pow(cur.c / 90, 2);
      m += (kv - 1) * Math.exp(-Math.pow(dv / 17, 2));
      const rf = Math.hypot(p.x - CX, p.z - ZF);
      if (rf < RF_I + 2) { m = 0.7; if (rf > 24 && rf < 28.5) m = 1 + 1.6 * cur.d; }
      return m;
    };
    const posG = V(0, 0, 0), m4 = new T.Matrix4(), qI = new T.Quaternion(), scG = new T.Vector3(), coG = new T.Color();
    const poserGrains = dt => {
      const v0 = 70 * cur.q / 2;
      for (let l = 0; l < LANES.length; l++) {
        const c = courbes[l], L = longueurs[l];
        for (let i = 0; i < NG; i++) {
          const k = l * NG + i;
          let u = U[k]; u -= Math.floor(u);
          c.getPointAt(u, posG);
          u += v0 * mult(posG) * dt / L; U[k] = u - Math.floor(u);
          scG.setScalar(Math.min(1, u / 0.015, (1 - u) / 0.015));
          m4.compose(posG, qI, scG); grains.setMatrixAt(k, m4);
          const rf = Math.hypot(posG.x - CX, posG.z - ZF);
          let pp;
          if (rf < RF_I + 2) { const avant = rf < RP_E - 0.5 || (posG.z < ZF + ZI + 2 && Math.abs(posG.x - CX) < 14); pp = avant ? pAprVanne : pAprFiltre; }
          else pp = pAt(posG.x, posG.z);
          coG.copy(couleurG(pp)); grains.setColorAt(k, coG);
        }
      }
      grains.instanceMatrix.needsUpdate = true; if (grains.instanceColor) grains.instanceColor.needsUpdate = true;
    };

    /* ================================================================ L'ÉTAT : débit, fermeture et encrassement gouvernent tout */
    let tbPrec = -1;
    const aiguilles = () => PRISES.forEach(p => p.regler(pTap(p)));
    const appliquer = () => {
      majNoeuds();
      aiguilles();
      const tb = thetaBille();
      bille.rotation.y = tb; facesBille.rotation.y = tb; poignee.rotation.y = tb;
      saletes.scale.setScalar(Math.max(0.001, cur.d)); saletes.visible = cur.d > 0.02;
      facesBoue.visible = cur.d > 0.02; H.boue.opacity = cur.d;
      recolorerEau();
      if (Math.abs(tb - tbPrec) > 1e-4 || !courbes.length) { majTrajets(); tbPrec = tb; }
    };
    const majTexte = () => {
      const f = chutes(E.q, E.c, E.d), pf = P0 - f.tot;
      const plus = [['le tube droit', f.dt], ['le coude', f.dc], ['la vanne', f.dv], ['le filtre', f.df]].sort((u, v) => v[1] - u[1])[0];
      ctx.mesures([
        { libelle: 'Le débit', valeur: nb(E.q, 1) + ' m³/h' },
        { libelle: 'La pression perdue sur tout le banc', valeur: nb(f.tot, 2) + ' bar' },
        { libelle: 'Ce qui freine le plus', valeur: plus[0][0].toUpperCase() + plus[0].slice(1) + ' (' + nb(plus[1], 2) + ' bar)' }
      ]);
      ctx.dire('<strong>Débit ' + nb(E.q, 1) + ' m³/h.</strong> La pression passe de ' + nb(P0, 2) + ' bar à l’entrée à ' + nb(pf, 2) + ' bar à la sortie. '
        + 'Le tube droit en prend ' + nb(f.dt, 2) + ' bar, le coude ' + nb(f.dc, 2) + ', la vanne ' + nb(f.dv, 2) + ' et le filtre ' + nb(f.df, 2) + '. <em>Valeurs d’exemple.</em>');
    };

    const appliquerCoupe = actif => {
      const plan = actif ? [new T.Plane(new T.Vector3(0, -1, 0), 0)] : null;
      const exclus = new Set();
      [faces, grains, jauges, saletes].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.clipShadows = true; m.needsUpdate = true; } });
      });
      faces.visible = actif;
      poignee.visible = !actif;
      const bb = new T.Box3();
      racine.traverse(o => { if (o.isMesh && !exclus.has(o) && !o.userData.sansOmbre) { bb.setFromObject(o); if (bb.min.y > 0.5) o.castShadow = !actif; } });
    };
    const majVisibilite = () => { grains.visible = E.coupe && !E.demonte; };
    const basculerCoupe = on => { E.coupe = on; appliquerCoupe(on && !E.demonte); majVisibilite(); };

    appliquer(); majTexte(); majVisibilite(); poserGrains(0);

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'tube', nom: 'Le tube de cuivre droit', objets: [tubes, facesTube], desc: 'Un tube droit de 28 mm. L’eau frotte contre sa paroi sur toute la longueur : plus il est long, plus la pression baisse. C’est la perte régulière.' },
      { id: 'coude', nom: 'Le coude', objets: [coude, facesCoude], desc: 'L’eau doit tourner à angle droit. Elle se bouscule dans le virage et perd de la pression d’un coup : c’est une perte singulière.' },
      { id: 'vanne', nom: 'La vanne à boule', objets: [vanne, bille, facesVanne], desc: 'Une boule percée d’un trou tourne dans le corps. Trou dans l’axe du tube : l’eau passe. Boule tournée : le trou se décale et le passage se réduit.' },
      { id: 'poignee', nom: 'La poignée de la vanne', objets: [poignee], desc: 'Elle tourne avec la boule. Poignée dans le sens du tube : vanne ouverte. Poignée de travers : vanne fermée en partie.' },
      { id: 'filtre', nom: 'Le filtre à tamis', objets: [filtre, couvercle, facesFiltre], desc: 'Un corps en bronze avec un couvercle vissé. L’eau entre dans le panier, le traverse, puis repart. On dévisse le couvercle pour le nettoyer.' },
      { id: 'panier', nom: 'Le tamis', objets: [panier], desc: 'Un panier à petits trous : il laisse passer l’eau et retient les saletés. S’il s’encrasse, l’eau passe mal et la perte monte beaucoup.' },
      { id: 'manometres', nom: 'Les cinq manomètres', objets: [prises, jauges, facesPrises], desc: 'Chacun mesure la pression à son endroit, en bar. Du premier au dernier, l’aiguille descend : l’eau perd de la pression le long du trajet.' },
      { id: 'raccords', nom: 'Les raccords union et les flexibles', objets: [raccords, facesRaccords], desc: 'Ils relient le banc au reste de l’installation. L’eau entre à gauche et sort vers vous.' },
      { id: 'support', nom: 'Le panneau et les colliers', objets: [support], desc: 'Le banc est posé sur un panneau. Des colliers tiennent le tube bien horizontal.' },
      { id: 'eau', nom: 'L’eau', objets: [grains, eauMesh], desc: 'En coupe, elle est teintée : bleu foncé là où la pression est forte, bleu clair là où elle est faible. Ses grains vont plus vite dans les passages étroits.' }
    ];

    const commandes = [
      { id: 'debit', type: 'curseur', libelle: 'Débit Q', min: 0.5, max: 3, pas: 0.5, unite: 'm³/h', valeur: 2, format: v => nb(v, 1) + ' m³/h' },
      { id: 'filtre', type: 'choix', titre: 'État du filtre', options: [['propre', 'Filtre propre'], ['encrasse', 'Filtre encrassé']], valeur: 'propre' },
      { id: 'ferm', type: 'curseur', libelle: 'Fermeture relative', min: 0, max: 90, pas: 10, unite: '%', valeur: 20 }
    ];

    const ETAT = (q, c, d) => [['debit', q], ['ferm', c], ['filtre', d]];
    const etapes = [
      { titre: 'Le banc d’essai, tel qu’on le monte', piece: 'tube', voirDedans: false, eclate: false, actions: ETAT(2, 20, 'propre'),
        vue: { azimut: 42, elevation: 42, zoom: 1.05, cible: [-200, 0, 270] },
        texte: 'Un tube de cuivre, un coude, une vanne et un filtre. Cinq manomètres mesurent la pression à chaque endroit du trajet. L’eau entre à gauche et sort vers vous.' },
      { titre: 'On coupe : l’eau frotte contre le tube droit', piece: 'tube', voirDedans: true, eclate: false, actions: ETAT(2, 20, 'propre'),
        vue: { azimut: 6, elevation: 58, zoom: 1.7, cible: [-230, 0, 40] },
        texte: 'Dans le tube droit, l’eau frotte contre la paroi sur toute la longueur. La pression baisse un peu : la deuxième aiguille est un tout petit peu plus bas que la première.' },
      { titre: 'Au coude, l’eau tourne : la pression chute d’un coup', piece: 'coude', voirDedans: true, eclate: false, actions: ETAT(2, 20, 'propre'),
        vue: { azimut: 38, elevation: 60, zoom: 1.9, cible: [-40, 0, 50] },
        texte: 'L’eau est bousculée dans le virage. En quelques centimètres, elle perd plus de pression que sur toute la longueur du tube droit.' },
      { titre: 'On ferme la vanne à moitié : le passage se réduit', piece: 'vanne', voirDedans: true, eclate: false, ralenti: true, actions: ETAT(2, 60, 'propre'),
        vue: { azimut: 52, elevation: 64, zoom: 3.0, cible: [CX + 10, 0, ZV] },
        texte: 'La poignée tourne, la boule aussi : son trou se décale et le passage se rétrécit. L’eau s’y engouffre plus vite, et la pression chute fort juste après la vanne.' },
      { titre: 'Le filtre s’encrasse : le tamis se bouche', piece: 'panier', voirDedans: true, eclate: false, ralenti: true, actions: ETAT(2, 60, 'encrasse'),
        vue: { azimut: 52, elevation: 62, zoom: 2.2, cible: [CX + 15, 0, ZF + 30] },
        texte: 'Les saletés se collent sur le tamis et bouchent les trous. L’eau a du mal à passer : la pression tombe d’un coup entre l’avant et l’arrière du filtre.' },
      { titre: 'On augmente le débit : la perte monte bien plus vite', piece: 'manometres', voirDedans: true, eclate: false, actions: ETAT(3, 60, 'encrasse'),
        vue: { azimut: 40, elevation: 58, zoom: 1.05, cible: [-200, 0, 270] },
        texte: 'Le débit passe de 2,0 à 3,0 m³/h : une fois et demie plus d’eau. La perte, elle, est multipliée par plus de deux. Elle grandit à peu près comme le carré du débit.' },
      { titre: 'Démonté : on sort le tamis pour le nettoyer', piece: 'panier', voirDedans: false, eclate: true, actions: ETAT(2, 20, 'encrasse'),
        texte: 'La poignée et le couvercle s’enlèvent, puis le tamis sort par le haut avec ses saletés. Rincé, il remet le filtre à neuf.' }
    ];

    const eclate = [
      { objets: [poignee], vers: [0, 130, 0], debut: 0, fin: 0.4 },
      { objets: [couvercle], vers: [0, 210, 0], debut: 0.2, fin: 0.65 },
      { objets: [panier], vers: [0, 110, 0], debut: 0.5, fin: 1 }
    ];

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 52, elevation: 24, zoom: 1.3, cible: [CX, 100, 330] },
      vue: ctx.mode === 'decouvrir' ? { azimut: 42, elevation: 40, zoom: 1.05, cible: [-200, 0, 270], cadre: [tubes, coude, vanne, filtre, jauges], marge: 1.0 }
                                    : { azimut: 40, elevation: 56, zoom: 1.05, cible: [-200, 0, 270], cadre: [tubes, coude, vanne, filtre, jauges], marge: 1.0 },
      phrase: undefined,
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'debit') { E.q = +v; ctx.regler('debit', +v); }
        if (id === 'ferm') { E.c = +v; ctx.regler('ferm', +v); }
        if (id === 'filtre') { E.d = v === 'encrasse' ? 1 : 0; ctx.regler('filtre', v); }
        majTexte();
      },
      surEclate(on) { E.demonte = on; appliquerCoupe(E.coupe && !on); majVisibilite(); },
      animer(dt) {
        const pas = (c, e, k, eps) => { const n = K.vers(c, e, k, dt); return Math.abs(n - e) > eps ? n : e; };
        const n = { q: pas(cur.q, E.q, 6, 0.002), c: pas(cur.c, E.c, 5, 0.05), d: pas(cur.d, E.d, 3.5, 0.004) };
        const bouge = n.q !== cur.q || n.c !== cur.c || n.d !== cur.d;
        if (bouge) { Object.assign(cur, n); appliquer(); }
        const visible = E.coupe && !E.demonte;
        if (visible) poserGrains(dt);
        return bouge || visible;
      }
    };
  }, { famille: 'reseau', titre: 'Le banc de pertes de charge', stations: ['pertes'] });

  /* ================================================================ LE DÉBITMÈTRE À TURBINE
     ── debitmetre ────────────────────────────────────────────────────────────────────────────
     Choix : un débitmètre à TURBINE en ligne, avec afficheur, plutôt qu'un modèle à ultrasons à pince.
     Pourquoi : la station veut qu'on comprenne que « le débit, c'est un volume qui passe par unité de
     temps ». Avec une turbine, l'élève VOIT l'eau pousser une petite roue : plus il passe d'eau, plus
     elle tourne vite, et l'appareil compte les tours. Les ultrasons, eux, ne montrent rien à l'œil.
     Repère : l'eau va de -X vers +X, Y vers le haut, +Z vers l'élève. Le débitmètre est au centre ;
     la vanne d'étranglement (l'ouverture du réseau de la station) est à droite.

     « Voir en coupe » tranche tout par le plan vertical z = 0 (la moitié avant est retirée) : on voit
     la roue de profil dans le corps, l'eau teintée en tranches claires et foncées (un « tronçon » d'eau =
     un petit volume) qui défilent. La roue, l'afficheur, le capteur et la vanne restent entiers
     (on ne coupe pas ce qui tourne, ni un instrument).
     Le débit suit la station : Q = √(h0 ÷ (h0 ÷ Qmax² + k)), h0 = 6 s², Qmax = 4 s, k = 0,4 + 3,5 (1 - ouverture)². */
  Electro3D.definir('debitmetre', (T, K, ctx) => {
    const M = K.mat;
    const A = aides(T, K), C = A.C;
    const racine = new T.Group();
    const V = (x, y, z) => new T.Vector3(x, y, z);

    const RE = 14, RI = 12.5, X0 = -260, X1 = 235, XV = 150, Y_PAN = -52;
    const cuivre = C(M.cuivre), laiton = C(M.laiton, 0xd9bb68), bronze = C(M.laiton, 0xc49a4a);
    const inox = C(M.acier, 0xd5dade), noir = C(M.plastiqueNoir), zingue = C(M.zingue), caout = C(M.caoutchouc);
    const marine = C(M.plastiqueMarine), rouge = C(M.plastiqueRouge), orange = C(M.plastiqueOrange);
    const panneauMat = C(M.plastiqueBlanc, 0xdcd6c8); panneauMat.roughness = 0.8;
    const grisColl = C(M.plastique, 0xb9bec5);
    const surXg = (g, x) => { g.rotateZ(-Math.PI / 2); g.translate(x, 0, 0); return g; };
    const lathX = (pts, mat, seg) => new T.Mesh(surXg(new T.LatheGeometry(pts.map(p => new T.Vector2(p[0], p[1])), seg || 48), 0), mat);
    const cylX = (r, x0, x1, mat, seg) => new T.Mesh(surXg(K.cylindre(r, x1 - x0, seg || 24), (x0 + x1) / 2), mat);
    const tubeX = (x0, x1) => A.anneauX(RE, RI, x0, x1, cuivre, 40);

    /* ---------------------------------------------------------------- panneau et colliers */
    const support = new T.Group();
    support.add(K.mesh(K.boite(760, 16, 190, 4), panneauMat, 0, Y_PAN - 8, 0));
    [-150, 85, 205].forEach(x => {
      support.add(K.mesh(K.boite(26, 37, 30, 2), grisColl, x, -33.5, 0), A.anneauX(17, 14.4, x - 4, x + 4, zingue, 32));
    });
    racine.add(support);

    /* ---------------------------------------------------------------- tubes, raccords */
    const tubes = new T.Group();
    tubes.add(tubeX(X0, -46), tubeX(46, XV - 28), tubeX(XV + 28, X1 + 10));
    racine.add(tubes);
    const raccords = new T.Group();
    const union = x0 => {
      const g = new T.Group();
      g.add(A.anneauX(17.5, 14, 0, 30, laiton, 36), A.hexX(20.5, 14, 6, 14, laiton), A.anneauX(10, 6, -12, 0, laiton, 20));
      g.position.set(x0, 0, 0); raccords.add(g);
    };
    union(X0); union(X1);
    raccords.add(K.fil([[X0 - 12, 0, 0], [X0 - 50, -3, 0], [X0 - 90, -9, 0]], 8, caout, { radial: 16, pas: 4 }).mesh);
    raccords.add(K.fil([[X1 + 42, 0, 0], [X1 + 80, -3, 0], [X1 + 120, -9, 0]], 8, caout, { radial: 16, pas: 4 }).mesh);
    racine.add(raccords);

    /* ---------------------------------------------------------------- le corps du débitmètre : bronze, deux manchons à souder */
    const corps = new T.Group();
    corps.add(lathX([[RI, -46], [14, -46], [14, -65], [19, -65], [19, -46], [22, -46], [22, 46], [19, 46], [19, 65], [14, 65], [14, 46], [RI, 46], [RI, -46]], bronze, 56));
    corps.add(A.hexX(25.5, 20, -44, 14, bronze), A.hexX(25.5, 20, 30, 14, bronze));
    {
      const fl = new T.Shape();
      [[-26, -4], [8, -4], [8, -10], [26, 0], [8, 10], [8, 4], [-26, 4]].forEach((p, i) => i ? fl.lineTo(p[0], p[1]) : fl.moveTo(p[0], p[1]));
      const fleche = new T.Mesh(K.extrusion(fl, 1.6, 0.4), bronze);       /* la flèche de sens, venue de fonderie : l'eau va vers +X */
      fleche.rotation.x = -Math.PI / 2; fleche.position.set(-4, 22.7, 0); fleche.scale.setScalar(0.62);
      corps.add(fleche);
    }
    racine.add(corps);

    /* ---------------------------------------------------------------- la cartouche : axe, ailettes, roue à pales */
    const cartouche = new T.Group(); racine.add(cartouche);
    const redresseur = new T.Group(), turbine = new T.Group();
    cartouche.add(redresseur, turbine);
    redresseur.add(cylX(1.5, -30, 30, inox, 14));
    [-28, 28].forEach(x => {
      redresseur.add(cylX(4.6, x - 5, x + 5, inox, 20));
      for (let i = 0; i < 4; i++) {
        const ailette = new T.Group(); ailette.rotation.x = i * 90 * D;
        ailette.add(K.mesh(new T.BoxGeometry(8, 8.2, 1.4), inox, x, 8.7, 0));
        redresseur.add(ailette);
      }
    });
    turbine.add(cylX(3.8, -9, 9, marine, 20));
    for (let i = 0; i < 6; i++) {
      const bras = new T.Group(); bras.rotation.x = i * 60 * D;
      const pale = K.mesh(K.boite(9, 8.4, 1.3, 0.4), i === 0 ? orange : marine, 0, 7.8, 0); pale.rotation.y = 50 * D;
      bras.add(pale); turbine.add(bras);
    }

    /* ---------------------------------------------------------------- le capteur et la tête (instrument entier, jamais coupé) */
    const capteur = new T.Group(), tete = new T.Group();
    capteur.add(A.cylY(7, 9.5, 40, zingue, 24), A.hexY(11, 0, 22, 30, zingue));
    tete.add(K.mesh(K.boite(88, 44, 60, 6), marine, 0, 58, 0));
    const ecran = K.ecran(62, 26, { fond: '#cfdcc0', encre: '#16231a', texte: ['0,00 m³/h', '0,0 L/min'] });
    ecran.mesh.position.set(0, 60, 30.15); ecran.mesh.material.transparent = true;
    tete.add(ecran.mesh);
    const ledOff = K.propre(M.plastiqueSombre), ledOn = new T.MeshBasicMaterial({ color: 0x2fd27a, toneMapped: false });
    const led = K.mesh(K.cylindre(2.6, 1.6, 18), ledOff, 33, 44, 30.5); led.rotation.x = Math.PI / 2;
    tete.add(led);
    [-22, -4].forEach(x => { const b = K.mesh(K.cylindre(4.2, 2.2, 22), noir, x, 44, 30.6); b.rotation.x = Math.PI / 2; tete.add(b); });
    tete.add(K.mesh(K.cylindre(6, 10, 20), noir, -34, 50, -34));
    tete.add(K.fil([[-34, 50, -39], [-34, 50, -52], [-62, 26, -66], [-120, -30, -76], [-200, -49.5, -80]], 3.6, K.plastique(0x8b9096, 0.55), { radial: 10, pas: 3 }).mesh);
    racine.add(capteur, tete);

    /* ---------------------------------------------------------------- la vanne d'étranglement (l'ouverture du réseau) */
    const vanne = new T.Group(); vanne.position.set(XV, 0, 0); vanne.rotation.y = Math.PI / 2; racine.add(vanne);
    const levier = new T.Group();
    {
      const prof = [[10, -22], [10, -28], [14, -28], [14, -48], [18, -48], [18, -28], [24.5, -28], [24.5, 28], [18, 28], [18, 48], [14, 48], [14, 28], [10, 28], [10, 22], [21.5, 22], [21.5, -22], [10, -22]];
      const g = new T.LatheGeometry(prof.map(p => new T.Vector2(p[0], p[1])), 48); g.rotateX(Math.PI / 2);
      vanne.add(new T.Mesh(g, laiton), A.cylY(11, 16, 36, laiton, 28), A.hexY(14, 4.6, 36, 41, laiton));
      levier.add(A.cylY(4.5, 36, 58, inox, 20), K.mesh(K.boite(15, 3, 126, 1.2), zingue, 0, 49.5, 36), K.mesh(K.boite(19, 9, 80, 3), rouge, 0, 49.5, 62), A.hexY(7.5, 0, 51.5, 58, zingue));
      vanne.add(levier);
    }

    /* ---------------------------------------------------------------- faces de coupe : plan z = 0, coordonnées (x, y) */
    const H = {
      bronze: A.hachures('#a07a35', '#5a4216', 6),
      cuivre: A.uni(0xb8683c, { metalness: 0.3, roughness: 0.5 }),
      inox: A.uni(0xa9b1b9, { metalness: 0.3, roughness: 0.4 })
    };
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const faceXY = (polys, mat, z, groupe) => {
      const m = new T.Mesh(new T.ShapeGeometry(polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1]))))), mat);
      m.position.z = z; m.userData.sansOmbre = true; m.castShadow = false; if (mat.transparent) m.userData.voile = true;
      groupe.add(m); return m;
    };
    const Rr = (x0, x1, y0, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    const grp = () => { const g = new T.Group(); faces.add(g); return g; };
    const facesTube = grp(), facesCorps = grp(), facesRaccords = grp(), facesCartouche = grp();
    faceXY([Rr(X0, -46, RI, RE), Rr(X0, -46, -RE, -RI), Rr(46, XV - 28, RI, RE), Rr(46, XV - 28, -RE, -RI), Rr(XV + 28, X1 + 10, RI, RE), Rr(XV + 28, X1 + 10, -RE, -RI),
      Rr(-65, -46, RI, 14), Rr(-65, -46, -14, -RI), Rr(46, 65, RI, 14), Rr(46, 65, -14, -RI)], H.cuivre, 0.14, facesTube);
    /* le corps : parois (le dessus est interrompu devant le capteur), manchons, écrous */
    faceXY([Rr(-46, -7, RI, 22), Rr(7, 46, RI, 22), Rr(-46, 46, -22, -RI), Rr(-65, -46, 14, 19), Rr(-65, -46, -19, -14), Rr(46, 65, 14, 19), Rr(46, 65, -19, -14),
      Rr(-44, -30, 22, 25.5), Rr(30, 44, 22, 25.5), Rr(-44, -30, -25.5, -22), Rr(30, 44, -25.5, -22)], H.bronze, 0.12, facesCorps);
    /* raccords union : manchon et écrou, de chaque côté */
    {
      const loc = [[0, 30, RE, 17.5], [0, 30, -17.5, -RE], [6, 20, 17.5, 20.5], [6, 20, -20.5, -17.5]];
      faceXY([...loc.map(([a, b, c, d]) => Rr(X0 + a, X0 + b, c, d)), ...loc.map(([a, b, c, d]) => Rr(X1 + a, X1 + b, c, d))], H.bronze, 0.12, facesRaccords);
    }
    /* l'axe de la cartouche (en coupe) ; la roue et les ailettes sont entières */
    faceXY([Rr(-30, 30, -1.5, 1.5)], H.inox, 0.16, facesCartouche);

    /* l'eau : une bande qui défile, en tranches claires et foncées (des « tronçons ») */
    const texTr = (() => {
      const c = document.createElement('canvas'); c.width = 128; c.height = 8;
      const x = c.getContext('2d'); x.fillStyle = '#7db2ea'; x.fillRect(0, 0, 128, 8); x.fillStyle = '#2f6fbd'; x.fillRect(64, 0, 64, 8);
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / 240, 1 / 600); return t;
    })();
    const eauMat = new T.MeshBasicMaterial({ map: texTr, transparent: true, opacity: 0.85, depthWrite: false, toneMapped: false, side: T.DoubleSide });
    const facesEau = grp();
    faceXY([Rr(X0 - 10, XV - 28, -RI, RI), Rr(XV + 28, X1 + 10, -RI, RI)], eauMat, -0.3, facesEau);

    /* des grains d'eau, par-dessus (trois files, dans la moitié arrière du tube) */
    const LIG = [[7, -3], [-7, -3], [0, -8]];
    const flots = [
      ...LIG.map(([y, z]) => K.courant(new T.LineCurve3(V(X0, y, z), V(XV - 30, y, z)), { pas: 26, rayon: 2.4, couleur: 0x0f3f86, vitesse: 60 })),
      ...LIG.map(([y, z]) => K.courant(new T.LineCurve3(V(XV + 30, y, z), V(X1 + 10, y, z)), { pas: 26, rayon: 2.4, couleur: 0x0f3f86, vitesse: 60 }))
    ];
    flots.forEach(f => { f.objet.visible = false; racine.add(f.objet); });

    /* ---------------------------------------------------------------- l'état : commande pompe et ouverture du réseau donnent le débit (formule de la station) */
    const E = { pompe: 70, reseau: 60, coupe: false, demonte: false };
    const cur = { pompe: 70, reseau: 60 };
    const debit = (p, o) => { const s = p / 100, op = o / 100, h0 = 6 * s * s, qm = 4 * s, k = 0.4 + 3.5 * Math.pow(1 - op, 2); return Math.sqrt(h0 / (h0 / (qm * qm) + k)); };
    let angle = 0, eclair = 0, tourPrec = 0;
    const majAffichage = () => { const q = debit(cur.pompe, cur.reseau); ecran.ecrire([nb(q, 2) + ' m³/h', nb(q * 1000 / 60, 1) + ' L/min']); };
    const majMesures = () => {
      const q = debit(E.pompe, E.reseau);
      ctx.mesures([
        { libelle: 'Le débit', valeur: nb(q, 2) + ' m³/h' },
        { libelle: 'En litres par minute', valeur: nb(q * 1000 / 60, 1) + ' L/min' },
        { libelle: 'La roue fait', valeur: nb(q * 0.95, 1) + ' tours par seconde' }
      ]);
      ctx.dire('<strong>Débit ' + nb(q, 2) + ' m³/h.</strong> C’est ' + nb(q * 1000 / 60, 1) + ' litres qui passent chaque minute. La roue tourne d’autant plus vite qu’il passe d’eau, et l’écran donne le résultat dans les deux unités.');
    };
    const majVanne = () => { levier.rotation.y = (100 - cur.reseau) * 0.9 * D; };

    const appliquerCoupe = actif => {
      const plan = actif ? [new T.Plane(new T.Vector3(0, 0, -1), 0)] : null;
      const exclus = new Set();
      [faces, ...flots.map(f => f.objet), cartouche, capteur, tete, vanne].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.clipShadows = true; m.needsUpdate = true; } });
      });
      faces.visible = actif;
    };
    const majVisibilite = () => { const on = E.coupe && !E.demonte; flots.forEach(f => { f.objet.visible = on; }); };
    const basculerCoupe = on => { E.coupe = on; appliquerCoupe(on && !E.demonte); majVisibilite(); };
    majAffichage(); majMesures(); majVanne(); majVisibilite();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'corps', nom: 'Le corps du débitmètre', objets: [corps, facesCorps], desc: 'Un morceau de tube épais en bronze, avec un manchon à souder à chaque bout. La flèche moulée dessus donne le sens de l’eau.' },
      { id: 'turbine', nom: 'La roue à pales', objets: [turbine], desc: 'Une petite roue posée sur un axe. L’eau pousse les pales : plus il passe d’eau, plus elle tourne vite. La pale orange porte un petit aimant.' },
      { id: 'redresseur', nom: 'L’axe et les ailettes', objets: [redresseur, facesCartouche], desc: 'L’axe tient la roue. Les ailettes de chaque côté le fixent au tube et calment l’eau avant la roue.' },
      { id: 'capteur', nom: 'Le capteur', objets: [capteur], desc: 'Il est vissé dans le corps, au-dessus de la roue. À chaque fois que l’aimant passe devant lui, il envoie une impulsion.' },
      { id: 'tete', nom: 'Le boîtier et son écran', objets: [tete], desc: 'Il compte les impulsions, calcule le débit et l’affiche en m³/h et en L/min. Le voyant vert clignote à chaque tour de roue.' },
      { id: 'tube', nom: 'Le tube de cuivre', objets: [tubes, facesTube], desc: 'Un tube de 28 mm : l’eau arrive de la gauche et repart vers la droite.' },
      { id: 'vanne', nom: 'La vanne à boule', objets: [vanne], desc: 'Elle représente le réseau : plus on la ferme, plus il passe peu d’eau. Poignée dans le sens du tube : ouverte.' },
      { id: 'raccords', nom: 'Les raccords union et les flexibles', objets: [raccords, facesRaccords], desc: 'Ils relient le banc au reste de l’installation.' },
      { id: 'support', nom: 'Le panneau et les colliers', objets: [support], desc: 'Le banc est posé sur un panneau, tube bien horizontal.' },
      { id: 'eau', nom: 'L’eau', objets: [facesEau, ...flots.map(f => f.objet)], desc: 'En coupe, elle est teintée en tranches claires et foncées. Chaque tranche est un petit volume d’eau : on les voit défiler devant la roue.' }
    ];

    const commandes = [
      { id: 'pompe', type: 'curseur', libelle: 'Commande pompe', min: 50, max: 100, pas: 5, unite: '%', valeur: 70 },
      { id: 'reseau', type: 'curseur', libelle: 'Ouverture réseau', min: 30, max: 100, pas: 5, unite: '%', valeur: 60 }
    ];

    const COUPE = { azimut: 24, elevation: 22, zoom: 3.2, cible: [0, 14, 0] };
    const ETAT = (p, o) => [['pompe', p], ['reseau', o]];
    const etapes = [
      { titre: 'Le débitmètre, tel qu’on le pose', piece: 'corps', voirDedans: false, eclate: false, actions: ETAT(70, 60),
        vue: { azimut: 30, elevation: 26, zoom: 1.5, cible: [20, 20, 0] },
        texte: 'Un corps en bronze soudé sur le tube, et un boîtier avec un écran. L’écran donne le débit en m³/h et en L/min. La flèche sur le corps donne le sens de l’eau.' },
      { titre: 'On coupe : une petite roue est posée dans l’eau', piece: 'turbine', voirDedans: true, eclate: false, actions: ETAT(50, 100),
        vue: COUPE,
        texte: 'Dans le corps, une petite roue à pales tient sur un axe. Elle est placée en plein milieu du passage : toute l’eau qui arrive la rencontre.' },
      { titre: 'L’eau passe : elle pousse les pales, la roue tourne', piece: 'turbine', voirDedans: true, eclate: false, ralenti: true, actions: ETAT(70, 60),
        vue: COUPE,
        texte: 'Les tranches d’eau, claires et foncées, arrivent sur les pales et les poussent. La roue tourne : chaque tour correspond à un petit volume d’eau passé.' },
      { titre: 'Plus d’eau passe : la roue tourne plus vite', piece: 'turbine', voirDedans: true, eclate: false, ralenti: true, actions: ETAT(100, 100),
        vue: COUPE,
        texte: 'La pompe pousse plus fort, la vanne est grande ouverte : plus de tranches d’eau passent chaque seconde. La roue tourne plus vite : c’est cela, un débit plus grand.' },
      { titre: 'Le capteur compte les tours, l’écran affiche le débit', piece: 'tete', voirDedans: true, eclate: false, ralenti: true, actions: ETAT(100, 100),
        vue: { azimut: 22, elevation: 22, zoom: 2.4, cible: [0, 38, 0] },
        texte: 'À chaque tour, l’aimant de la pale orange passe devant le capteur : le voyant vert clignote. Le boîtier compte ces tours et affiche le débit en m³/h et en L/min.' },
      { titre: 'On ferme la vanne : moins d’eau passe, la roue ralentit', piece: 'vanne', voirDedans: true, eclate: false, ralenti: true, actions: ETAT(70, 30),
        vue: { azimut: 22, elevation: 24, zoom: 1.9, cible: [80, 22, 0] },
        texte: 'La vanne se ferme : le passage se réduit et il passe moins d’eau. La roue tourne plus lentement et l’écran affiche un débit plus petit.' },
      { titre: 'Démonté : le capteur, puis la roue et son axe', piece: 'turbine', voirDedans: false, eclate: true, actions: ETAT(70, 60),
        texte: 'On dévisse le capteur, puis on sort la roue et son axe de leur logement. Le corps reste soudé sur le tube : on peut nettoyer la roue sans toucher à l’installation.' }
    ];

    const eclate = [
      { objets: [tete, capteur], vers: [0, 210, 0], debut: 0, fin: 0.45 },
      { objets: [cartouche], vers: [0, 105, 0], debut: 0.35, fin: 1 }
    ];

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 28, elevation: 18, zoom: 1.1, cible: [0, 90, 0] },
      vue: ctx.mode === 'decouvrir' ? { azimut: 30, elevation: 26, zoom: 1.3, cible: [20, 20, 0], cadre: [tubes, corps, tete, vanne], marge: 1.0 }
                                    : { azimut: 14, elevation: 18, zoom: 1.3, cible: [20, 20, 0], cadre: [tubes, corps, tete, vanne], marge: 1.0 },
      phrase: undefined,
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'pompe') { E.pompe = +v; ctx.regler('pompe', +v); }
        if (id === 'reseau') { E.reseau = +v; ctx.regler('reseau', +v); }
        majMesures();
      },
      surEclate(on) { E.demonte = on; appliquerCoupe(E.coupe && !on); majVisibilite(); },
      animer(dt) {
        const pas = (c, e, k, eps) => { const n = K.vers(c, e, k, dt); return Math.abs(n - e) > eps ? n : e; };
        const n = { pompe: pas(cur.pompe, E.pompe, 5, 0.3), reseau: pas(cur.reseau, E.reseau, 5, 0.3) };
        const bouge = n.pompe !== cur.pompe || n.reseau !== cur.reseau;
        if (bouge) { Object.assign(cur, n); majAffichage(); majVanne(); }
        const q = debit(cur.pompe, cur.reseau), w = 2 * Math.PI * 0.95 * q;
        const tourne = !E.demonte;
        if (tourne) {
          angle += w * dt; turbine.rotation.x = angle;
          const tours = Math.floor(angle / (2 * Math.PI));
          if (tours !== tourPrec) { eclair = 0.14; tourPrec = tours; }
          eclair = Math.max(0, eclair - dt); led.material = eclair > 0 ? ledOn : ledOff;
          const v = 50 * q / 2.4;
          texTr.offset.x -= dt * v / 240;
          if (E.coupe) flots.forEach(f => { f.regler({ vitesse: v * 1.3 }); f.animer(dt); });
        }
        return bouge || tourne;
      }
    };
  }, { famille: 'reseau', titre: 'Le débitmètre à turbine', stations: ['debit'] });
})();
