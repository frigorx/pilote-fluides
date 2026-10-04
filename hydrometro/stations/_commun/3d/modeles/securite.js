/* HydroMétro 3D — famille « securite » : le vase d'expansion à membrane et la soupape de sécurité.
   Unités : mm. Repère : Y vers le haut (sol à y = 0), X le long de la tuyauterie, +Z = face avant.

   CE QUE L'ÉLÈVE DOIT VOIR (vase) : l'eau chauffe, elle se dilate, elle a besoin de place. Le vase
   la lui donne : l'eau entre, la membrane recule, le gaz (de l'azote) est serré, la pression
   monte un peu — le manomètre le montre — puis tout revient quand l'eau refroidit.
   « Voir en coupe » retire la moitié avant du vase (plan x-y) : faces coupées teintées et
   hachurées, eau colorée selon sa température (bleu froid, rouge chaud), gaz en points. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  /* ================================================================== aides communes */
  const outils = (T, K) => {
    const O = {}, D = Math.PI / 180;
    O.D = D;
    O.hachures = (fond, trait, pas) => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = fond; x.fillRect(0, 0, 64, 64);
      x.strokeStyle = trait; x.lineWidth = 5;
      for (let i = -64; i <= 64; i += 32) { x.beginPath(); x.moveTo(i, 64); x.lineTo(i + 64, 0); x.stroke(); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / pas, 1 / pas);
      return new T.MeshStandardMaterial({ map: t, roughness: 0.75, metalness: 0.05, side: T.DoubleSide });
    };
    O.uni = (couleur, extra) => new T.MeshStandardMaterial(Object.assign({ color: couleur, roughness: 0.6, side: T.DoubleSide }, extra || {}));
    O.rect = (x0, x1, y0, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    O.sym = (x0, x1, y0, y1) => [O.rect(x0, x1, y0, y1), O.rect(-x1, -x0, y0, y1)];
    /* une face de coupe dans le plan z = 0 (coordonnées x, y du monde) */
    O.faceDe = (polys, mat, z, groupe) => {
      const formes = polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1]))));
      const m = new T.Mesh(new T.ShapeGeometry(formes), mat);
      m.position.z = z; m.userData.sansOmbre = true; m.castShadow = false; if (mat.transparent) m.userData.voile = true;
      groupe.add(m); return m;
    };
    /* une bande entre deux lignes de N points (A et B), dessinée des deux côtés de l'axe (x et -x) :
       on la recalcule à volonté (la membrane bouge). yOff : décalage vertical de monde. */
    O.bande = (N, mat, z, yOff, groupe) => {
      const nV = N * 4, pos = new Float32Array(nV * 3), uv = new Float32Array(nV * 2), nor = new Float32Array(nV * 3);
      for (let i = 0; i < nV; i++) nor[i * 3 + 2] = 1;
      const idx = [];
      for (let s = 0; s < 2; s++) for (let i = 0; i < N - 1; i++) { const a = (s * N + i) * 2; idx.push(a, a + 1, a + 3, a, a + 3, a + 2); }
      const g = new T.BufferGeometry();
      g.setAttribute('position', new T.BufferAttribute(pos, 3)); g.setAttribute('uv', new T.BufferAttribute(uv, 2)); g.setAttribute('normal', new T.BufferAttribute(nor, 3));
      g.setIndex(idx); g.boundingSphere = new T.Sphere(new T.Vector3(0, yOff, 0), 420);
      const m = new T.Mesh(g, mat);
      m.position.z = z; m.frustumCulled = false; m.userData.sansOmbre = true; m.castShadow = false; if (mat.transparent) m.userData.voile = true;
      if (groupe) groupe.add(m);
      m.regler = (A, B) => {
        for (let s = 0; s < 2; s++) {
          const sg = s ? -1 : 1;
          for (let i = 0; i < N; i++) {
            const a = (s * N + i) * 2, xa = A[i][0] * sg, ya = A[i][1] + yOff, xb = B[i][0] * sg, yb = B[i][1] + yOff;
            pos[a * 3] = xa; pos[a * 3 + 1] = ya; pos[a * 3 + 2] = 0;
            pos[(a + 1) * 3] = xb; pos[(a + 1) * 3 + 1] = yb; pos[(a + 1) * 3 + 2] = 0;
            uv[a * 2] = xa; uv[a * 2 + 1] = ya; uv[(a + 1) * 2] = xb; uv[(a + 1) * 2 + 1] = yb;
          }
        }
        g.attributes.position.needsUpdate = true; g.attributes.uv.needsUpdate = true;
      };
      return m;
    };
    /* formes de révolution et tubes */
    O.cylY = (r, y0, y1, mat, seg) => K.mesh(K.cylindre(r, y1 - y0, seg || 32), mat, 0, (y0 + y1) / 2, 0);
    O.anneauY = (rE, rI, y0, y1, mat, seg) => K.mesh(K.anneau(rE, rI, y1 - y0, seg || 40), mat, 0, (y0 + y1) / 2, 0);
    O.anneauX = (rE, rI, x0, x1, y, mat, seg) => { const g = K.anneau(rE, rI, x1 - x0, seg || 40); g.rotateZ(Math.PI / 2); g.translate((x0 + x1) / 2, y, 0); return new T.Mesh(g, mat); };
    O.cylZ = (r, z0, z1, mat, seg) => { const g = K.cylindre(r, z1 - z0, seg || 32); g.rotateX(Math.PI / 2); g.translate(0, 0, (z0 + z1) / 2); return new T.Mesh(g, mat); };
    O.anneauZ = (rE, rI, z0, z1, mat, seg) => { const g = K.anneau(rE, rI, z1 - z0, seg || 40); g.rotateX(Math.PI / 2); g.translate(0, 0, (z0 + z1) / 2); return new T.Mesh(g, mat); };
    O.lathe = (pts, mat, seg) => new T.Mesh(new T.LatheGeometry(pts.map(p => new T.Vector2(p[0], p[1])), seg || 56), mat);
    /* un écrou six pans percé, axe Y */
    O.hex = (rHex, rTrou, y0, y1, mat) => {
      const s = new T.Shape();
      for (let k = 0; k < 6; k++) { const a = k * 60 * D; k ? s.lineTo(Math.cos(a) * rHex, Math.sin(a) * rHex) : s.moveTo(Math.cos(a) * rHex, Math.sin(a) * rHex); }
      const h = new T.Path(); h.absarc(0, 0, rTrou, 0, Math.PI * 2, true); s.holes.push(h);
      const g = new T.ExtrudeGeometry(s, { depth: y1 - y0, bevelEnabled: false, curveSegments: 24 });
      g.rotateX(-Math.PI / 2); g.translate(0, y0, 0);
      return new T.Mesh(g, mat);
    };
    /* un cadran de manomètre ou de thermomètre : graduations, chiffres, unité (marquages réels) */
    O.cadranMat = (max, majeur, mineur, unite, zone) => {
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
      g.fillStyle = '#1f2933'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '800 27px Calibri, "Segoe UI", Arial, sans-serif';
      for (let k = 0; k <= n; k++) {
        const v = k * mineur, grand = k % kM === 0, p0 = pt(v, 100), p1 = pt(v, grand ? 80 : 90);
        g.strokeStyle = '#1f2933'; g.lineWidth = grand ? 4 : 2; g.beginPath(); g.moveTo(p0[0], p0[1]); g.lineTo(p1[0], p1[1]); g.stroke();
        if (grand) { const q = pt(v, 62); g.fillText(String(Math.round(v * 100) / 100), q[0], q[1]); }
      }
      g.font = '800 26px Calibri, "Segoe UI", Arial, sans-serif'; g.fillText(unite, cx, cy + 56);
      const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4;
      return new T.MeshBasicMaterial({ map: t, toneMapped: false });
    };
    /* un instrument à cadran, face vers +Z, centré sur l'origine du groupe */
    O.jauge = (mats, max, majeur, mineur, unite, zone) => {
      const g = new T.Group();
      g.add(O.anneauZ(33, 29.5, -6, 9, mats.acier, 48), O.cylZ(33, -9, -6, mats.acier, 48));
      const face = new T.Mesh(new T.CircleGeometry(29.5, 48), O.cadranMat(max, majeur, mineur, unite, zone)); face.position.z = 8.4; g.add(face);
      const pivot = new T.Group(); pivot.position.z = 9.2; g.add(pivot);
      pivot.add(K.mesh(new T.BoxGeometry(2.4, 31, 0.8), mats.noir, 0, 9.5, 0));
      g.add(O.cylZ(3.4, 9.2, 11, mats.noir, 20));
      const verre = new T.Mesh(new T.CircleGeometry(29.8, 48), new T.MeshStandardMaterial({ color: 0xffffff, roughness: 0.05, transparent: true, opacity: 0.1, depthWrite: false }));
      verre.position.z = 10.4; verre.userData.sansOmbre = true; verre.userData.voile = true; g.add(verre);
      return { g, pivot, regler: v => { pivot.rotation.z = (135 - 270 * Math.max(0, Math.min(1.04, v / max))) * D; } };
    };
    return O;
  };

  const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });

  /* ================================================================== LE VASE D'EXPANSION */
  Electro3D.definir('vaseExpansion', (T, K, ctx) => {
    const O = outils(T, K), D = O.D, M = K.mat, N = HydroNappe(T, K);
    const racine = new T.Group();
    const C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; return c; };
    const peinture = C(M.fonte, 0xb5302a); peinture.roughness = 0.45;
    const dedans = C(M.fonte, 0xcfd2d6);
    const patte = C(M.acier, 0x5d6672), mur = C(M.fonte, 0xe6e2d8); mur.roughness = 0.9;
    const laiton = C(M.laiton), cuivre = C(M.cuivre), acier = C(M.acier, 0xd5dade);
    const noir = C(M.plastiqueNoir), caoutchouc = C(M.caoutchouc, 0x4a4f57), grip = C(M.plastiqueRouge);

    /* ---------------------------------------------------------------- la forme de la cuve (mm)
       Deux coques de révolution soudées à l'équateur (y = 0 dans le repère du vase) : un cylindre
       court et un fond bombé. Intérieur : rayon 140, hauteur 359, soit 18 litres. */
    const R = 140, ACYL = 79.5, DD = 100, TT = 3.5, Ro = R + TT;
    const NC = 4, ND = 22;
    const profil = (Rr, a, d) => {
      const p = [];
      for (let i = 0; i <= NC; i++) p.push([Rr, -a * i / NC]);
      for (let j = 1; j <= ND; j++) { const th = j / ND * Math.PI / 2; p.push([j === ND ? 0 : Rr * Math.cos(th), -a - d * Math.sin(th)]); }
      return p;
    };
    const P = profil(R, ACYL, DD), Po = profil(Ro, ACYL, DD + TT);
    const NP = P.length;
    const miroir = A => A.map(p => [p[0], -p[1]]);
    const YB = 150, Ye = YB + ACYL + DD + TT;       /* bas de la cuve, puis équateur, dans le monde */
    const PY = 60, GY = 134;                         /* axe de la tuyauterie ; centre des cadrans */
    const V_TOT = 18, VEAU0 = 2.16, DELTA = 4.5;     /* litres : cuve, eau à froid, eau en plus à chaud */
    const M_FROID = 1 - 2 * VEAU0 / V_TOT, M_CHAUD = 1 - 2 * (VEAU0 + DELTA) / V_TOT, M_PLAT = 0.03;
    const pression = mm => { const vw = (1 - mm) * V_TOT / 2; return 2.2 * (V_TOT - VEAU0) / (V_TOT - vw) - 1; };  /* bar : 1,2 à froid (comme la station), environ 2,1 à chaud */

    /* ================================================================ LA CUVE */
    const vase = new T.Group(); vase.position.y = Ye; racine.add(vase);
    const coqueHaute = new T.Group(), coqueBasse = new T.Group(); vase.add(coqueHaute, coqueBasse);
    const peauHaute = new T.Group(), peauBasse = new T.Group(); coqueHaute.add(peauHaute); coqueBasse.add(peauBasse);
    /* la coque basse reste ouverte au raccord (trou de 10 mm de rayon, tenu par le piquage) */
    peauBasse.add(O.lathe(Po.slice(0, NP - 1), peinture), O.lathe(P.slice(0, NP - 1), dedans));
    peauHaute.add(O.lathe(miroir(Po), peinture), O.lathe(miroir(P), dedans));
    const bourrelet = s => O.lathe([[R - 6, 0], [R - 6, -4 * s], [Ro + 4, -4 * s], [Ro + 6, -2 * s], [Ro + 6, 0], [R - 6, 0]], peinture, 64);
    peauBasse.add(bourrelet(1)); peauHaute.add(bourrelet(-1));
    /* la plaque : une étiquette courbe collée sur la cuve (marquages réels : contenance, pression maxi) */
    const etiq = (() => {
      const c = document.createElement('canvas'); c.width = 512; c.height = 240;
      const x = c.getContext('2d'); x.fillStyle = '#f1efe8'; x.fillRect(0, 0, 512, 240);
      x.strokeStyle = '#1b3a63'; x.lineWidth = 6; x.strokeRect(10, 10, 492, 220);
      x.fillStyle = '#1b3a63'; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.font = '800 110px Calibri, "Segoe UI", Arial, sans-serif'; x.fillText('18 L', 256, 90);
      x.font = '800 62px Calibri, "Segoe UI", Arial, sans-serif'; x.fillText('10 bar', 256, 184);
      const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4;
      return new T.MeshStandardMaterial({ map: t, roughness: 0.55 });
    })();
    const lenEt = 64 / Ro;
    const plaque = new T.Mesh(new T.CylinderGeometry(Ro + 0.5, Ro + 0.5, 30, 24, 1, true, -lenEt / 2, lenEt), etiq);
    plaque.position.y = 40; plaque.userData.sansOmbre = true; peauHaute.add(plaque);

    /* le piquage du raccord : un manchon d'acier soudé au fond (filetage 3/4") */
    const piquage = O.anneauY(13.4, 9.6, 128 - Ye, 154 - Ye, acier, 32); peauBasse.add(piquage);

    /* le mur et la console : le vase est accroché, par l'arrière, à une patte d'acier vissée au mur.
       Tout est en arrière du plan de coupe (z <= 0) : rien n'est coupé, rien ne gêne la vue. */
    const ZM = -170;                                  /* face avant du mur */
    const murG = new T.Group(); racine.add(murG);
    murG.add(K.mesh(K.boite(560, 640, 30, 0.5), mur, 0, 310, ZM - 15));
    const consoleG = new T.Group(); racine.add(consoleG);
    consoleG.add(K.mesh(K.boite(380, 44, 5, 1), patte, 0, 291, ZM + 2.5));      /* la patte : un rail vissé au mur */
    [-165, 165].forEach(x => { const vis = O.cylZ(6, ZM + 5, ZM + 9, acier, 6); vis.position.set(x, 291, 0); consoleG.add(vis); });
    consoleG.add(K.mesh(K.boite(60, 44, 20, 1), patte, 0, 291, ZM + 15));       /* le bras vers la cuve */
    const collier = new T.Mesh(new T.CylinderGeometry(Ro + 4, Ro + 4, 30, 40, 1, true, Math.PI - 0.9, 1.8), patte);
    collier.position.y = 291; consoleG.add(collier);
    /* deux supports sous le tube : il ne porte pas sur le vase */
    [-150, 150].forEach(x => consoleG.add(K.mesh(K.boite(16, 5, 170, 0.5), patte, x, 46.5, ZM / 2)));

    /* la valve de gonflage, comme celle d'un pneu, et son capuchon */
    const valveG = new T.Group(); coqueHaute.add(valveG);
    valveG.add(O.hex(11, 3.5, 183, 191, laiton), O.cylY(5.2, 191, 205, laiton, 24), O.cylY(3.5, 172, 191, laiton, 20), O.cylY(1.5, 205, 207, acier, 12));
    const capuchon = new T.Group(); valveG.add(capuchon);
    capuchon.add(O.anneauY(6.8, 5.6, 197, 221, noir, 28), O.cylY(6.8, 221, 224, noir, 28), O.anneauY(7.3, 6.2, 198, 200.5, noir, 28), O.anneauY(7.3, 6.2, 203, 205.5, noir, 28));

    /* ---------------------------------------------------------------- la membrane (EPDM)
       Même forme que la coque basse, mise à l'échelle en hauteur : à m = 1 elle épouse le fond
       (cuve pleine de gaz), à m = 0 elle est à plat. Le volume d'eau vaut (1 - m) × 9 litres. */
    const membraneG = new T.Group(); vase.add(membraneG);
    const NF = 48, gMem = new T.BufferGeometry();
    const posMem = new Float32Array(NP * (NF + 1) * 3);
    gMem.setAttribute('position', new T.BufferAttribute(posMem, 3));
    const idMem = [];
    for (let i = 0; i < NP - 1; i++) for (let j = 0; j < NF; j++) { const a = i * (NF + 1) + j, b = a + 1, c = a + NF + 1, d = c + 1; idMem.push(a, c, b, b, c, d); }
    gMem.setIndex(idMem); gMem.boundingSphere = new T.Sphere(new T.Vector3(0, 0, 0), 190);
    const membrane = new T.Mesh(gMem, caoutchouc); membrane.frustumCulled = false; membraneG.add(membrane);
    membraneG.add(O.lathe([[R - 9, -2.5], [R - 0.5, -2.5], [R - 0.5, 2.5], [R - 9, 2.5], [R - 9, -2.5]], caoutchouc, 64));

    /* ================================================================ LA TUYAUTERIE */
    const tubeG = new T.Group(); racine.add(tubeG);
    tubeG.add(O.anneauX(11, 9.6, -200, -24, PY, cuivre), O.anneauX(11, 9.6, 24, 200, PY, cuivre));
    tubeG.add(O.anneauX(14.5, 9.6, -24, 24, PY, laiton), O.anneauY(14, 9.6, 69.6, 82, laiton, 36));   /* le té */
    const robinetG = new T.Group(); racine.add(robinetG);
    robinetG.add(O.anneauY(16, 9.6, 82, 118, laiton, 40));
    const boss = O.cylZ(6, 0, 25, laiton, 20); boss.position.y = 100; robinetG.add(boss);
    const levier = K.mesh(K.boite(12, 58, 6, 2), grip, 0, 74, 26); robinetG.add(levier);
    robinetG.add(O.hex(19, 9.6, 118, 128, laiton), O.hex(19, 13.4, 128, 134, laiton));               /* l'écrou du raccord union */

    /* les deux instruments : thermomètre à gauche, manomètre à droite, sur un piquage de la tuyauterie */
    const cadrans = (x, max, majeur, mineur, unite, zone) => {
      const j = O.jauge({ acier, noir }, max, majeur, mineur, unite, zone);
      j.g.position.set(x, GY, 0);
      j.g.add(O.cylY(6, -63, -30, laiton, 20), O.cylY(9, -63, -53, laiton, 6));
      racine.add(j.g); return j;
    };
    const thermo = cadrans(-92, 120, 20, 5, '°C', null);
    const mano = cadrans(92, 4, 1, 0.2, 'bar', [3, 4]);

    /* ================================================================ LES FACES DE COUPE (plan z = 0) */
    const H = {
      mur: O.uni(0x56606b),
      acier: O.hachures('#aab3bc', '#59636e', 6),
      laiton: O.hachures('#b08f45', '#6a511c', 6),
      cuivre: O.uni(0xb8683c, { metalness: 0.3, roughness: 0.5 }),
      caout: O.uni(0x2c3035),
      plast: O.uni(0x3a4047),
      eau: new T.MeshStandardMaterial({ color: 0x2f7fd6, roughness: 0.3, transparent: true, opacity: 0.66, depthWrite: false, side: T.DoubleSide })
    };
    const pointsTex = (() => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = 'rgba(255,224,150,0.62)'; x.fillRect(0, 0, 64, 64);
      x.fillStyle = '#a35f00'; [[16, 16], [48, 48]].forEach(([u, v]) => { x.beginPath(); x.arc(u, v, 7, 0, 6.2832); x.fill(); });
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / 14, 1 / 14);
      return t;
    })();
    H.gaz = new T.MeshStandardMaterial({ map: pointsTex, roughness: 0.8, transparent: true, opacity: 0.95, depthWrite: false, side: T.DoubleSide });

    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const grp = () => { const g = new T.Group(); faces.add(g); return g; };
    const facesCoque = grp(), facesMembrane = grp(), facesGaz = grp(), facesEau = grp(), facesValve = grp(), facesRaccord = grp(), facesTube = grp();
    const rv = (x0, x1, y0, y1) => O.rect(x0, x1, y0 + Ye, y1 + Ye), sv = (x0, x1, y0, y1) => O.sym(x0, x1, y0 + Ye, y1 + Ye);
    /* la tôle de la cuve (mince : une teinte pleine), le bourrelet de soudure, le piquage */
    O.bande(NP - 1, H.mur, 0.04, Ye, facesCoque).regler(P.slice(0, NP - 1), Po.slice(0, NP - 1));
    O.bande(NP, H.mur, 0.04, Ye, facesCoque).regler(miroir(P), miroir(Po));
    O.faceDe([...sv(R - 6, Ro + 6, -4, 4)], H.acier, 0.07, facesCoque);
    O.faceDe([...O.sym(9.6, 13.4, 128, 154)], H.acier, 0.08, facesCoque);
    O.faceDe(sv(R - 9, R - 0.5, -2.5, 2.5), H.caout, 0.09, facesMembrane);
    /* la valve et son capuchon */
    O.faceDe([...sv(3.5, 11, 183, 191), rv(-5.2, 5.2, 191, 205), rv(-3.5, 3.5, 172, 191), rv(-1.5, 1.5, 205, 207)], H.laiton, 0.1, facesValve);
    O.faceDe([...sv(5.6, 6.8, 197, 221), rv(-6.8, 6.8, 221, 224)], H.plast, 0.1, facesValve);
    /* le té, les tubes, le robinet, l'écrou */
    O.faceDe([...O.sym(24, 200, 69.6, 71), ...O.sym(24, 200, 49, 50.4)], H.cuivre, 0.05, facesTube);
    O.faceDe([O.rect(-24, 24, 46, 50.4), O.rect(-24, -9.6, 69.6, 74), O.rect(9.6, 24, 69.6, 74), ...O.sym(9.6, 14, 74, 82)], H.laiton, 0.05, facesTube);
    O.faceDe([...O.sym(9.6, 16, 82, 118), ...O.sym(9.6, 19, 118, 128), ...O.sym(13.4, 19, 128, 134)], H.laiton, 0.05, facesRaccord);
    /* l'eau dans la tuyauterie et dans le raccord : un seul dessin, teinté selon la température */
    O.faceDe([[[-200, 50.4], [200, 50.4], [200, 69.6], [9.6, 69.6], [9.6, 153.8], [-9.6, 153.8], [-9.6, 69.6], [-200, 69.6]]], H.eau, 0.02, facesEau);

    /* les régions qui bougent avec la membrane : eau (entre la cuve et la membrane), gaz (au-dessus), la membrane en coupe */
    const bEau = O.bande(NP, H.eau, 0.02, Ye, facesEau);
    const bGaz = O.bande(NP, H.gaz, 0.02, Ye, facesGaz);
    const bMem = O.bande(NP, H.caout, 0.06, Ye, facesMembrane);
    const Phaut = miroir(P), EP = 2.2;

    const majMembrane = m => {
      const Mi = P.map(p => [0.975 * p[0], m * 0.975 * p[1]]);
      for (let i = 0; i < NP; i++) for (let j = 0; j <= NF; j++) {
        const a = j / NF * 2 * Math.PI;
        posMem[(i * (NF + 1) + j) * 3] = Mi[i][0] * Math.cos(a); posMem[(i * (NF + 1) + j) * 3 + 1] = Mi[i][1]; posMem[(i * (NF + 1) + j) * 3 + 2] = Mi[i][0] * Math.sin(a);
      }
      gMem.attributes.position.needsUpdate = true; gMem.computeVertexNormals();
      const A = [], B = [];
      for (let i = 0; i < NP; i++) {
        const p0 = Mi[Math.max(0, i - 1)], p1 = Mi[Math.min(NP - 1, i + 1)];
        let tx = p1[0] - p0[0], ty = p1[1] - p0[1], l = Math.hypot(tx, ty);
        if (l < 1e-4) { tx = 0; ty = -1; l = 1; }
        const nx = -ty / l, ny = tx / l;
        A.push([Mi[i][0] + nx * EP, Mi[i][1] + ny * EP]); B.push([Mi[i][0] - nx * EP, Mi[i][1] - ny * EP]);
      }
      bMem.regler(A, B); bEau.regler(P, A); bGaz.regler(B, Phaut);
    };

    /* ================================================================ L'EAU QUI ENTRE ET QUI SORT */
    const V = (x, y, z) => new T.Vector3(x, y, z), ZF = -3;
    const cB = new T.CatmullRomCurve3([V(-110, PY, ZF), V(-40, PY, ZF), V(-6, PY + 4, ZF), V(0, PY + 20, ZF), V(0, 110, ZF), V(0, Ye - 167, ZF)], false, 'centripetal');
    const lisiere = s => { const pts = []; for (let i = NP - 1; i >= NC; i--) pts.push(V(s * 0.93 * P[i][0], Ye + 0.93 * P[i][1], ZF)); return new T.CatmullRomCurve3(pts, false, 'centripetal'); };
    /* l'eau qui entre et sort : trois filets continus (jamais des grains), des bandes plus sombres y défilent dans le sens de l'eau */
    const flots = [N.filet(cB, { rayon: 5, couleur: 0x2f7fd6, vitesse: 70, pas: 40 }), ...[lisiere(1), lisiere(-1)].map(c => N.filet(c, { rayon: 2.6, couleur: 0x2f7fd6, vitesse: 70, pas: 40 }))];
    flots.forEach(f => { f.objet.visible = false; racine.add(f.objet); });

    /* ================================================================ L'ÉTAT */
    const E = { T: 0, D: 0, phase: 'froid', coupe: false, demonte: false };
    let Tm = 0, m = M_FROID, cle = '', mesuresTxt = '', rendreCoupe = false;
    const mCible = () => E.demonte ? M_PLAT : M_FROID + (M_CHAUD - M_FROID) * E.D;
    const cFroid = new T.Color(0x2f7fd6), cChaud = new T.Color(0xd9472b), cEau = new T.Color();
    const majTexte = () => {
      const mm = E.demonte ? M_FROID : m, p = pression(mm), tc = 20 + 60 * Tm, litres = (1 - mm) * V_TOT / 2;
      const txt = nb(tc, 0) + '|' + nb(p, 1) + '|' + nb(litres, 1);
      if (txt === mesuresTxt) return; mesuresTxt = txt;
      ctx.mesures([{ libelle: 'La température', valeur: nb(tc, 0) + ' °C' }, { libelle: 'La pression', valeur: nb(p, 1) + ' bar' }, { libelle: 'L’eau dans le vase', valeur: nb(litres, 1) + ' L' }]);
    };
    const phraseEtat = () => {
      if (E.D < 0.5 && E.T < 0.5) return '<strong>L’eau est froide.</strong> La membrane est près du fond : il y a peu d’eau dans le vase, et le gaz y est à l’aise.';
      if (E.D < 0.5) return '<strong>L’eau chauffe.</strong> Elle se dilate : elle prend plus de place et cherche où aller.';
      return '<strong>L’eau est chaude.</strong> Elle a pris plus de place : elle est entrée dans le vase, la membrane a reculé et le gaz s’est serré. La pression a monté un peu.';
    };
    const majFlots = () => {
      const mc = mCible(), mouv = !E.demonte && E.coupe && Math.abs(m - mc) > 0.004;
      flots.forEach(f => { f.objet.visible = mouv; if (mouv) f.regler({ sens: m > mc ? 1 : -1 }); });
    };
    const maj = () => {
      const mm = E.demonte ? M_FROID : m;
      cEau.copy(cFroid).lerp(cChaud, Tm); H.eau.color.copy(cEau);
      flots.forEach(f => f.objet.material.color.copy(cEau));
      majMembrane(m);
      thermo.regler(20 + 60 * Tm); mano.regler(pression(mm));
      majTexte();
    };
    maj();

    const basculerCoupe = on => {
      E.coupe = on;
      const plan = on ? [new T.Plane(new T.Vector3(0, 0, -1), 0)] : null;
      const exclus = new Set();
      [faces, thermo.g, mano.g, ...flots.map(f => f.objet)].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(mat => { if (mat) { mat.clippingPlanes = plan; mat.needsUpdate = true; } });
      });
      faces.visible = on && !E.demonte;
      majFlots();
    };

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'coque', nom: 'La cuve en acier peint', objets: [peauHaute, peauBasse, facesCoque], desc: 'Deux coques d’acier soudées autour de la membrane, peintes en rouge : le rouge dit « vase de chauffage ». Elle contient 18 litres. La plaque donne la contenance et la pression maximale.' },
      { id: 'membrane', nom: 'La membrane en caoutchouc', objets: [membraneG, facesMembrane], desc: 'Une feuille de caoutchouc souple (EPDM) qui sépare l’eau du gaz. Rien ne passe au travers, mais elle bouge : elle fait de la place à l’eau qui se dilate.' },
      { id: 'gaz', nom: 'Le gaz (azote)', objets: [facesGaz], desc: 'De l’azote, côté valve. On peut le serrer comme l’air d’une pompe à vélo : il joue le rôle de ressort. Il est gonflé avant la mise en eau : c’est la précharge.' },
      { id: 'eau', nom: 'L’eau de l’installation', objets: [facesEau], desc: 'L’eau du chauffage, côté raccord. Elle est bleue quand elle est froide, rouge quand elle est chaude. Elle ne touche jamais le gaz.' },
      { id: 'valve', nom: 'La valve de gonflage', objets: [valveG, facesValve], desc: 'Comme sur un pneu : elle sert à gonfler le gaz et à contrôler sa pression. Son capuchon la protège. On n’y touche pas sans y être autorisé : la mesure demande de vider d’abord le côté eau.' },
      { id: 'raccord', nom: 'Le robinet et l’écrou du raccord', objets: [robinetG, facesRaccord], desc: 'Un robinet d’arrêt et un écrou. Robinet fermé, on peut vider le vase et le dévisser sans vider tout le chauffage.' },
      { id: 'console', nom: 'La console murale en acier', objets: [consoleG], desc: 'Une patte d’acier vissée dans le mur, avec un bras et un collier qui tiennent la cuve par l’arrière. Le vase est accroché au mur : il ne pèse pas sur la tuyauterie.' },
      { id: 'mur', nom: 'Le mur', objets: [murG], desc: 'Le pan de mur qui porte le vase. Le raccord part du bas du vase : on le voit relié au tube de cuivre.' },
      { id: 'tuyauterie', nom: 'La tuyauterie et le té', objets: [tubeG, facesTube], desc: 'Un tube de cuivre de l’installation et un té en laiton. L’eau circule là, et le vase se branche sur le té.' },
      { id: 'manometre', nom: 'Le manomètre', objets: [mano.g], desc: 'Il donne la pression de l’eau, en bar. On y voit la pression monter quand l’eau chauffe. La zone rouge, c’est le seuil de la soupape.' },
      { id: 'thermometre', nom: 'Le thermomètre', objets: [thermo.g], desc: 'Il donne la température de l’eau, en degrés.' }
    ];

    const commandes = [
      { id: 'chauffage', type: 'choix', options: [['chauffer', 'Chauffer'], ['refroidir', 'Refroidir']], valeur: 'refroidir' }
    ];

    const PHASES = { froid: [0, 0, 'refroidir'], chauffe: [1, 0, 'chauffer'], entre: [1, 1, 'chauffer'], tient: [1, 1, 'chauffer'], refroidit: [0, 0, 'refroidir'] };
    const etapes = [
      { titre: 'À froid : le gaz attend derrière la membrane', piece: 'gaz', voirDedans: true, eclate: false, actions: [['phase', 'froid']],
        vue: { azimut: 14, elevation: 10, zoom: 1.12, cible: [0, 320, 0] },
        texte: 'De l’azote a été gonflé côté valve avant la mise en eau : c’est la précharge. À froid, la membrane reste près du fond et il y a peu d’eau dans le vase.' },
      { titre: 'On chauffe : l’eau se dilate', piece: 'thermometre', voirDedans: true, eclate: false, actions: [['phase', 'chauffe']],
        vue: { azimut: -12, elevation: 10, zoom: 1.55, cible: [-30, 175, 0] },
        texte: 'Le thermomètre monte, l’eau passe du bleu au rouge. Chaude, l’eau prend plus de place : sans vase, elle n’aurait nulle part où aller.' },
      { titre: 'L’eau en trop entre dans le vase', piece: 'membrane', voirDedans: true, eclate: false, ralenti: true, actions: [['phase', 'entre']],
        vue: { azimut: 12, elevation: 12, zoom: 1.35, cible: [0, 245, 0] },
        texte: 'Le té envoie l’eau en trop dans le vase. Elle appuie sur la membrane, qui recule : de l’autre côté, le gaz est comprimé.' },
      { titre: 'Le gaz serré tient la pression', piece: 'gaz', voirDedans: true, eclate: false, actions: [['phase', 'tient']],
        vue: { azimut: 14, elevation: 12, zoom: 1.08, cible: [0, 290, 0] },
        texte: 'Plus serré, le gaz pousse plus fort sur la membrane. La pression a monté un peu — regardez le manomètre — mais elle reste bien sous les 3 bar de la soupape.' },
      { titre: 'L’eau refroidit : tout revient', piece: 'membrane', voirDedans: true, eclate: false, ralenti: true, actions: [['phase', 'refroidit']],
        vue: { azimut: 12, elevation: 12, zoom: 1.35, cible: [0, 245, 0] },
        texte: 'L’eau se resserre et ressort du vase. Le gaz se détend et repousse la membrane vers le fond : la pression redescend.' },
      { titre: 'Démonté : deux coques, une membrane, une valve', piece: 'coque', voirDedans: false, eclate: true, actions: [['phase', 'froid']],
        texte: 'Robinet fermé et vase vidé, on dévisse l’écrou et on décroche le vase de sa console. En usine, la membrane est prise entre deux coques soudées : ici on les écarte pour la voir.' }
    ];

    const eclate = [
      { objets: [capuchon], vers: [0, 110, 0], debut: 0, fin: 0.3 },
      { objets: [coqueHaute], vers: [0, 240, 0], debut: 0.15, fin: 0.65 },
      { objets: [membraneG], vers: [0, 130, 0], debut: 0.3, fin: 0.85 },
      { objets: [coqueBasse], vers: [0, 40, 0], debut: 0.5, fin: 1 }
    ];

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 26, elevation: 20, zoom: 0.62, cible: [0, 420, 0] },
      vue: ctx.mode === 'decouvrir' ? { azimut: 28, elevation: 16, cadre: [vase], marge: 1.02 }
                                    : { azimut: 14, elevation: 11, cadre: [vase], marge: 1.0 },
      phrase: phraseEtat(),
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'phase') { const p = PHASES[v]; E.phase = v; E.T = p[0]; E.D = p[1]; ctx.regler('chauffage', p[2]); }
        else if (id === 'chauffage') { E.T = E.D = v === 'chauffer' ? 1 : 0; E.phase = v === 'chauffer' ? 'tient' : 'froid'; }
        majFlots(); ctx.dire(phraseEtat());
      },
      surEclate(on) {
        /* éclaté : les pièces entières se lisent mieux ; on rend la coupe en rassemblant */
        if (on && E.coupe) { rendreCoupe = true; basculerCoupe(false); }
        E.demonte = on; faces.visible = E.coupe && !on;
        if (!on && rendreCoupe) { rendreCoupe = false; basculerCoupe(true); }
        majFlots();
      },
      animer(dt) {
        const mc = mCible();
        Tm = K.vers(Tm, E.T, 1.3, dt); m = K.vers(m, mc, 2.0, dt);
        if (Math.abs(m - mc) < 0.0008) m = mc;
        if (Math.abs(Tm - E.T) < 0.0008) Tm = E.T;
        const k = m.toFixed(4) + '|' + Tm.toFixed(4);
        if (k !== cle) { cle = k; maj(); }
        majFlots();
        const mouv = !E.demonte && E.coupe && Math.abs(m - mc) > 0.004;
        if (mouv) flots.forEach(f => f.animer(dt));
        return m !== mc || Tm !== E.T || mouv;
      }
    };
  }, { famille: 'securite', titre: 'Le vase d’expansion à membrane', stations: ['vase'] });

  /* ================================================================== LA SOUPAPE DE SÉCURITÉ
     Soupape de chauffage 3 bar, en équerre : entrée en bas, sortie sur le côté, molette de
     contrôle en haut. Repère : l'axe de la soupape est x = 0, le bas du filetage est y = 0.
     CE QUE L'ÉLÈVE DOIT VOIR : le ressort tient le clapet sur son siège ; quand la pression de
     l'eau dépasse le tarage, elle soulève le clapet, l'eau s'échappe par la sortie vers l'entonnoir,
     la pression redescend et le ressort referme. */
  Electro3D.definir('soupape', (T, K, ctx) => {
    const O = outils(T, K), M = K.mat, N = HydroNappe(T, K);
    const racine = new T.Group();
    const C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; return c; };
    const laiton = C(M.laiton), cuivre = C(M.cuivre), acier = C(M.acier, 0xd5dade), noir = C(M.plastiqueNoir);
    const joint = C(M.caoutchouc, 0x2c3035), rouge = C(M.plastiqueRouge), pvc = C(M.plastique, 0xd7d9d4), blanc = C(M.plastiqueBlanc);
    const PY = -70, ZF = -3;
    const SEUIL = 3;                        /* bar : tarage */
    const LEV_MAX = 5;                      /* levée maximale du clapet, mm (exagérée pour qu'on la voie) */

    /* ---------------------------------------------------------------- le corps et le chapeau */
    const corps = new T.Group(); racine.add(corps);
    corps.add(O.anneauY(10.5, 7, -14, 16, laiton, 32), O.hex(16.5, 7, 16, 28, laiton));
    corps.add(O.anneauY(21, 16, 34, 62, laiton, 48), O.anneauY(21, 7, 28, 34, laiton, 48));
    corps.add(O.anneauX(14, 9, 18, 46, 48, laiton, 32));
    const tarage = K.gravure('3 bar', 4.4, { couleur: '#1f2933' }); tarage.position.set(0, 22, 14.4); corps.add(tarage);   /* le tarage, gravé sur un pan du six pans */
    const siege = O.anneauY(9, 7, 34, 36.5, acier, 32); racine.add(siege);
    const chapeau = new T.Group(); racine.add(chapeau);
    chapeau.add(O.anneauY(21, 17, 62, 96, laiton, 48), O.anneauY(21, 3.6, 96, 100, laiton, 48));
    /* ce qui monte et descend : joint, clapet, tige, plateau du ressort */
    const mobile = new T.Group(); racine.add(mobile);
    mobile.add(O.cylY(10.5, 36, 38, joint, 32), O.cylY(10, 38, 40, acier, 32), O.cylY(3.5, 40, 102, acier, 16), O.cylY(14, 70, 73, acier, 28));
    const ressort = K.ressort(11, 23, 8, 1.5, acier); ressort.position.y = 73; racine.add(ressort);
    /* la molette de contrôle : un capuchon rouge cannelé par-dessus le chapeau */
    const molette = new T.Group(); racine.add(molette);
    molette.add(O.anneauY(24, 21.5, 88, 118, rouge, 48), O.cylY(24, 118, 122, rouge, 48));
    for (let k = 0; k < 16; k++) { const a = k / 16 * 2 * Math.PI, c = K.mesh(K.boite(2.4, 20, 3, 0.6), rouge, Math.cos(a) * 24.4, 104, Math.sin(a) * 24.4); c.rotation.y = -a; molette.add(c); }
    molette.add(K.mesh(K.boite(3, 1.6, 14, 0.5), noir, 0, 122.6, 0));

    /* la sortie, le tube vers l'entonnoir, l'entonnoir et son tuyau d'évacuation (vide d'air entre les deux) */
    const sortie = new T.Group(); racine.add(sortie);
    sortie.add(O.anneauX(7.5, 6.5, 46, 82.5, 48, cuivre, 28));
    const coude = O.anneauY(7.5, 6.5, -18, 48, cuivre, 28); coude.position.x = 75; sortie.add(coude);
    const entonnoir = new T.Group(); racine.add(entonnoir);
    const cone = O.lathe([[34, -30], [14, -58], [14, -62], [12.5, -62], [12.5, -58], [32.5, -30], [34, -30]], blanc, 48); cone.position.x = 75; entonnoir.add(cone);
    const drain = O.anneauY(14, 12.5, -150, -62, pvc, 36); drain.position.x = 75; entonnoir.add(drain);

    /* la tuyauterie : tube de cuivre, té, col qui monte jusqu'à la soupape */
    const tuyauterie = new T.Group(); racine.add(tuyauterie);
    tuyauterie.add(O.anneauX(11, 9.6, -150, -24, PY, cuivre), O.anneauX(11, 9.6, 24, 46, PY, cuivre));
    tuyauterie.add(O.anneauX(14.5, 9.6, -24, 24, PY, laiton), O.anneauY(15, 10.6, -60.4, -4, laiton, 36));

    /* le manomètre de l'installation, sur un piquage du tube */
    const mano = O.jauge({ acier, noir }, 4, 1, 0.2, 'bar', [3, 4]);
    mano.g.position.set(-92, -8, 0);
    mano.g.add(O.cylY(6, -52, -30, laiton, 20), O.cylY(9, -52, -42, laiton, 6));
    racine.add(mano.g);

    /* ================================================================ LES FACES DE COUPE (plan z = 0) */
    const H = {
      laiton: O.hachures('#b08f45', '#6a511c', 6),
      acier: O.hachures('#aab3bc', '#59636e', 6),
      cuivre: O.uni(0xb8683c, { metalness: 0.3, roughness: 0.5 }),
      caout: O.uni(0x2c3035),
      plast: O.uni(0x8c2f26),
      blanc: O.uni(0xc9c7c0),
      eau: new T.MeshStandardMaterial({ color: 0xd9472b, roughness: 0.3, transparent: true, opacity: 0.68, depthWrite: false, side: T.DoubleSide })
    };
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const grp = () => { const g = new T.Group(); faces.add(g); return g; };
    const fCorps = grp(), fSiege = grp(), fChapeau = grp(), fMobile = grp(), fMolette = grp(), fSortie = grp(), fEntonnoir = grp(), fTuyau = grp(), fEau = grp(), fEauOuverte = grp();
    const { rect, sym, faceDe } = O;
    faceDe([...sym(7, 10.5, -14, 16), ...sym(7, 16, 16, 28), ...sym(7, 21, 28, 34), rect(-21, -16, 34, 62), rect(16, 21, 34, 39), rect(16, 21, 57, 62),
            rect(21, 46, 57, 62), rect(21, 46, 34, 39)], H.laiton, 0.05, fCorps);
    faceDe(sym(7, 9, 34, 36.5), H.acier, 0.06, fSiege);
    faceDe([...sym(17, 21, 62, 96), rect(-21, -3.6, 96, 100), rect(3.6, 21, 96, 100)], H.laiton, 0.05, fChapeau);
    faceDe([rect(-10.5, 10.5, 36, 38)], H.caout, 0.07, fMobile);
    faceDe([rect(-10, 10, 38, 40), rect(-3.5, 3.5, 40, 102), rect(-14, 14, 70, 73)], H.acier, 0.07, fMobile);
    faceDe([...sym(21.5, 24, 88, 118), rect(-24, 24, 118, 122)], H.plast, 0.06, fMolette);
    faceDe([rect(46, 82.5, 54.5, 55.5), rect(46, 67.5, 40.5, 41.5), rect(67.5, 68.5, -18, 41.5), rect(81.5, 82.5, -18, 55.5)], H.cuivre, 0.05, fSortie);
    faceDe([[[109, -30], [107.5, -30], [87.5, -58], [89, -58]], [[41, -30], [42.5, -30], [62.5, -58], [61, -58]],
            rect(87.5, 89, -150, -58), rect(61, 62.5, -150, -58)], H.blanc, 0.05, fEntonnoir);
    faceDe([rect(-150, -24, -60.4, -59), rect(-150, -24, -81, -79.6), rect(24, 46, -60.4, -59), rect(24, 46, -81, -79.6),
            rect(-24, 24, -84.5, -79.6), rect(-24, -10.6, -60.4, -55.5), rect(10.6, 24, -60.4, -55.5), rect(-15, -10.6, -55.5, -4), rect(10.6, 15, -55.5, -4)], H.laiton, 0.05, fTuyau);
    /* l'eau : toujours sous le clapet ; dans la chambre et la sortie seulement quand il est soulevé */
    faceDe([[[-150, -79.6], [46, -79.6], [46, -60.4], [10.6, -60.4], [10.6, -14], [7, -14], [7, 36], [-7, 36], [-7, -14], [-10.6, -14], [-10.6, -60.4], [-150, -60.4]]], H.eau, 0.02, fEau);
    faceDe([rect(-16, 16, 36, 57), rect(16, 46, 39, 57), rect(46, 68.5, 41.5, 54.5), rect(68.5, 81.5, -18, 54.5)], H.eau, 0.02, fEauOuverte);
    fEauOuverte.visible = false;

    /* ================================================================ L'EAU QUI S'ÉCHAPPE */
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const cFuite = new T.CatmullRomCurve3([V(0, 20, ZF), V(0, 33, ZF), V(8, 41, ZF), V(18, 48, ZF), V(46, 48, ZF), V(68, 48, ZF), V(75, 42, ZF), V(75, 0, ZF), V(75, -18, ZF), V(75, -46, ZF)], false, 'centripetal');
    const fuite = N.filet(cFuite, { rayon: 4, couleur: 0xd9472b, vitesse: 90, pas: 30 });     /* le jet : un filet continu, jamais des grains */
    fuite.objet.visible = false; racine.add(fuite.objet);

    /* ================================================================ L'ÉTAT */
    const E = { v: 80, phase: 'veille', coupe: false, demonte: false };
    let Pm = 80, mesuresTxt = '', rendreCoupe = false;
    const mob = K.mobile(0, 1100, 48);
    const levee = v => v >= 100 ? 1.6 + Math.min(1, (v - 100) / 10) * (LEV_MAX - 1.6) : 0;
    const phraseEtat = () => E.v < 100
      ? '<strong>La soupape est fermée.</strong> Le ressort tient le clapet sur son siège : l’eau reste dans l’installation.'
      : '<strong>La soupape est ouverte.</strong> La pression a vaincu le ressort : le clapet se soulève et l’eau s’échappe par la sortie, vers l’entonnoir.';
    const majTexte = () => {
      const p = SEUIL * Pm / 100, ouv = Pm >= 100;
      const txt = nb(p, 1) + '|' + ouv;
      if (txt === mesuresTxt) return; mesuresTxt = txt;
      ctx.mesures([{ libelle: 'La pression', valeur: nb(p, 1) + ' bar' }, { libelle: 'Le tarage de la soupape', valeur: nb(SEUIL, 1) + ' bar' }, { libelle: 'La soupape', valeur: ouv ? 'ouverte' : 'fermée' }]);
    };
    const majVue = () => {
      const l = mob.x;
      mobile.position.y = l; fMobile.position.y = l;
      ressort.position.y = 73 + l; ressort.longueur(Math.max(4, 23 - l));
      mano.regler(SEUIL * Pm / 100);
      const ouverte = l > 0.3;
      fEauOuverte.visible = ouverte && E.coupe && !E.demonte;
      fuite.objet.visible = ouverte && !E.demonte; if (ouverte) fuite.regler({ vitesse: 55 + 24 * l });
      majTexte();
    };
    mob.cible = levee(80); majVue();

    const basculerCoupe = on => {
      E.coupe = on;
      const plan = on ? [new T.Plane(new T.Vector3(0, 0, -1), 0)] : null;
      const exclus = new Set();
      [faces, mano.g, fuite.objet].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(mat => { if (mat) { mat.clippingPlanes = plan; mat.needsUpdate = true; } });
      });
      faces.visible = on && !E.demonte;
      majVue();
    };

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'corps', nom: 'Le corps en laiton', objets: [corps, fCorps], desc: 'La pièce en laiton vissée sur la tuyauterie. L’eau entre par le bas, sort par le côté. Le tarage, 3 bar, est gravé sur un des pans.' },
      { id: 'siege', nom: 'Le siège', objets: [siege, fSiege], desc: 'La petite bague sur laquelle le clapet vient s’appuyer. Fermée, elle ne laisse passer aucune goutte.' },
      { id: 'clapet', nom: 'Le clapet et son joint', objets: [mobile, fMobile], desc: 'Un disque d’acier avec un joint de caoutchouc. L’eau le pousse vers le haut ; le ressort le pousse vers le bas. Il monte avec sa tige.' },
      { id: 'ressort', nom: 'Le ressort taré', objets: [ressort], desc: 'Il appuie sur le clapet. Sa force est réglée en usine : c’est elle qui décide à quelle pression la soupape s’ouvre. On ne la règle jamais.' },
      { id: 'chapeau', nom: 'Le chapeau', objets: [chapeau, fChapeau], desc: 'Le haut du corps : il enferme le ressort et guide la tige.' },
      { id: 'molette', nom: 'La molette de contrôle', objets: [molette, fMolette], desc: 'Tournée à la main, elle soulève la tige : on vérifie ainsi que la soupape n’est pas collée. À faire seulement si l’on y est autorisé, avec un tuyau d’évacuation libre.' },
      { id: 'sortie', nom: 'La sortie et son tube', objets: [sortie, fSortie], desc: 'L’eau qui s’échappe passe par là. Le tube doit rester libre : jamais bouché, jamais fermé.' },
      { id: 'entonnoir', nom: 'L’entonnoir et l’évacuation', objets: [entonnoir, fEntonnoir], desc: 'L’eau tombe dans un entonnoir, avec un petit vide d’air au-dessus : on voit tout de suite qu’une soupape coule, et l’eau part vers l’évacuation.' },
      { id: 'tuyauterie', nom: 'La tuyauterie et le té', objets: [tuyauterie, fTuyau], desc: 'Le tube de l’installation et le té où la soupape est branchée. L’eau du chauffage est dedans, sous pression.' },
      { id: 'manometre', nom: 'Le manomètre', objets: [mano.g], desc: 'Il donne la pression de l’eau, en bar. La zone rouge commence au tarage de la soupape.' }
    ];

    const commandes = [
      { id: 'pression', type: 'curseur', libelle: 'Pression / seuil', min: 50, max: 120, pas: 5, unite: '%', valeur: 80 }
    ];
    const PHASES = { veille: 80, monte: 97, seuil: 103, ouvre: 112, redescend: 82 };
    const etapes = [
      { titre: 'Au repos : le ressort tient le clapet fermé', piece: 'ressort', voirDedans: true, eclate: false, actions: [['phase', 'veille']],
        vue: { azimut: 14, elevation: 8, zoom: 1.35, cible: [15, 25, 0] },
        texte: 'Le ressort appuie sur le clapet, qui reste collé sur son siège. L’eau du chauffage, sous le clapet, ne peut pas sortir.' },
      { titre: 'La pression monte sous le clapet', piece: 'manometre', voirDedans: true, eclate: false, actions: [['phase', 'monte']],
        vue: { azimut: 8, elevation: 8, zoom: 1.15, cible: [-30, -10, 0] },
        texte: 'Le manomètre monte : l’eau pousse de plus en plus fort sur le clapet. Le ressort résiste encore, la soupape reste fermée.' },
      { titre: 'Au seuil de 3 bar, le clapet se soulève', piece: 'clapet', voirDedans: true, eclate: false, ralenti: true, actions: [['phase', 'seuil']],
        vue: { azimut: 14, elevation: 8, zoom: 2.2, cible: [0, 50, 0] },
        texte: 'La poussée de l’eau devient plus forte que celle du ressort : le clapet monte et le ressort se comprime. Le passage s’ouvre.' },
      { titre: 'L’eau s’échappe vers l’entonnoir', piece: 'entonnoir', voirDedans: true, eclate: false, actions: [['phase', 'ouvre']],
        vue: { azimut: 12, elevation: 10, zoom: 1.35, cible: [40, 5, 0] },
        texte: 'L’eau passe sous le clapet, sort par le côté et tombe dans l’entonnoir. En s’échappant, elle emporte de la pression : c’est ce qui protège l’installation.' },
      { titre: 'La pression redescend : le clapet se referme', piece: 'clapet', voirDedans: true, eclate: false, ralenti: true, actions: [['phase', 'redescend']],
        vue: { azimut: 14, elevation: 8, zoom: 2.0, cible: [0, 50, 0] },
        texte: 'La pression est retombée sous le tarage : le ressort repousse le clapet sur son siège et l’écoulement s’arrête.' },
      { titre: 'Démontée : molette, ressort, clapet', piece: 'molette', voirDedans: false, eclate: true, actions: [['phase', 'veille']],
        texte: 'On retire la molette, puis le chapeau : le ressort et le clapet sortent. Sur l’installation, une soupape qui a coulé se remplace entière, on ne la règle pas.' }
    ];
    const eclate = [
      { objets: [molette], vers: [0, 150, 0], debut: 0, fin: 0.35 },
      { objets: [chapeau], vers: [0, 105, 0], debut: 0.2, fin: 0.65 },
      { objets: [ressort], vers: [0, 70, 0], debut: 0.4, fin: 0.85 },
      { objets: [mobile], vers: [0, 28, 0], debut: 0.55, fin: 1 }
    ];

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 28, elevation: 16, zoom: 0.9, cible: [0, 70, 0] },
      vue: ctx.mode === 'decouvrir' ? { azimut: 30, elevation: 16, cadre: [corps, chapeau, entonnoir, tuyauterie], marge: 1.0 }
                                    : { azimut: 14, elevation: 10, cadre: [corps, chapeau, entonnoir, tuyauterie], marge: 1.0 },
      phrase: phraseEtat(),
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'phase') { E.v = PHASES[v]; E.phase = v; ctx.regler('pression', E.v); }
        else if (id === 'pression') { E.v = +v; }
        mob.cible = levee(E.v); ctx.dire(phraseEtat());
      },
      surEclate(on) {
        /* éclaté : les pièces entières se lisent mieux ; on rend la coupe en rassemblant */
        if (on && E.coupe) { rendreCoupe = true; basculerCoupe(false); }
        E.demonte = on; faces.visible = E.coupe && !on;
        if (!on && rendreCoupe) { rendreCoupe = false; basculerCoupe(true); }
        majVue();
      },
      animer(dt) {
        const avant = Pm;
        Pm = K.vers(Pm, E.v, 4, dt); if (Math.abs(Pm - E.v) < 0.05) Pm = E.v;
        mob.cible = levee(Pm);
        const bouge = mob.pas(dt);
        majVue();
        if (fuite.objet.visible) fuite.animer(dt);
        return Pm !== avant || bouge || Pm !== E.v || fuite.objet.visible;
      }
    };
  }, { famille: 'securite', titre: 'La soupape de sécurité', stations: ['securite'] });
})();
