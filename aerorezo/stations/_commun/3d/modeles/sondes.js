/* AéroRézo 3D — famille « sondes » : le tube de Pitot et l'anémomètre, dans une gaine ronde Ø 250 coupée.
   Unités : mm. Repère : X dans le sens de l'air (de gauche à droite), Y vers le haut, Z vers l'avant
   (+Z = le côté qu'on voit). L'axe de la gaine est la droite y = 0, z = 0.

   COULEURS DE L'AIR (communes à AéroRézo) : air neuf vert 0x2f9e5a · repris jaune 0xd9a21b ·
   soufflé bleu 0x2f7fd6 · rejeté brun 0x8a5a3c. Ici la gaine est sur le soufflage : l'air est bleu,
   toujours doublé d'un mot dans les textes.
   Pressions : tuyau et flèche de la pression TOTALE en rouge, ceux de la pression STATIQUE en bleu marine.

   « Voir en coupe » retire la moitié avant (z > 0) : la gaine montre sa tôle coupée, le tube de Pitot ses
   deux canaux (le nez ouvert au centre, les petits trous du côté), l'anémomètre sa grille de relevé.
   Rien d'autre n'est coupé : les tuyaux, le manomètre, la canne et ses grains restent entiers. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  /* ====================================================================== LA TROUSSE COMMUNE
     Des briques que les deux modèles partagent : matières propres, cylindres, faces de coupe,
     grains d'air, flèches de pression, boîtier à afficheur. Un jeu par vue (T et K en dépendent). */
  const trousse = (T, K) => {
    const M = K.mat, D = Math.PI / 180;
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; return c; };
    const boite = (x0, x1, y0, y1, z0, z1, mat, r) => {
      const g = r ? K.boite(x1 - x0, y1 - y0, z1 - z0, r) : new T.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
      return K.mesh(g, mat, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    };
    const cyl = (axe, r, a0, a1, c1, c2, mat, seg) => {
      const g = new T.CylinderGeometry(r, r, a1 - a0, seg || 24);
      if (axe === 'x') g.rotateZ(Math.PI / 2); else if (axe === 'z') g.rotateX(Math.PI / 2);
      const m = new T.Mesh(g, mat), c = (a0 + a1) / 2;
      if (axe === 'x') m.position.set(c, c1, c2); else if (axe === 'y') m.position.set(c1, c, c2); else m.position.set(c1, c2, c);
      return m;
    };
    const tubeX = (r, x0, x1, mat, seg) => {
      const g = new T.CylinderGeometry(r, r, x1 - x0, seg || 64, 1, true); g.rotateZ(Math.PI / 2);
      const m = new T.Mesh(g, mat); m.position.set((x0 + x1) / 2, 0, 0); return m;
    };
    const revolutionX = (pts, mat, seg) => {
      const g = new T.LatheGeometry(pts.map(([r, x]) => new T.Vector2(r, x)), seg || 40);
      g.rotateZ(-Math.PI / 2);
      return new T.Mesh(g, mat);
    };
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d }).replace(/ /g, ' ').replace('-', '−');
    const air = (cle, mot) => '<b class="air air-' + cle + '">' + mot + '</b>';
    const clamp = K.clamp;

    /* ---------- les faces de coupe (plan z = 0) ---------- */
    const H = {
      tole: new T.MeshStandardMaterial({ color: 0x4a545e, roughness: 0.5, metalness: 0.2, side: T.DoubleSide }),
      laiton: new T.MeshStandardMaterial({ color: 0x9a7a35, roughness: 0.45, metalness: 0.3, side: T.DoubleSide }),
      caoutchouc: new T.MeshStandardMaterial({ color: 0x2a2d31, roughness: 0.8, side: T.DoubleSide })
    };
    const rect = (x0, x1, y0, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    const faceDe = (polys, mat, groupe) => {
      const g = new T.ShapeGeometry(polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1])))));
      const m = new T.Mesh(g, mat); m.position.z = 0.5; m.userData.sansOmbre = true; m.castShadow = false;
      groupe.add(m); return m;
    };
    /* les deux parois minces d'un tube qui suit un chemin plan (z = 0) : bandes entre rInt et rExt de chaque côté ;
       trous = [[s0, s1], …] distances (mm) le long du chemin où la paroi est percée */
    const paroisDe = (chem, rExt, rInt, trous) => {
      const L = chem.getLength(), n = Math.max(20, Math.round(L / 2.5));
      const pts = chem.getSpacedPoints(n);
      const nor = pts.map((p, i) => {
        const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n, i + 1)];
        const tx = b.x - a.x, ty = b.y - a.y, l = Math.hypot(tx, ty) || 1;
        return [-ty / l, tx / l];
      });
      const polys = [];
      for (let i = 0; i < n; i++) {
        const s = (i + 0.5) * L / n;
        if (trous && trous.some(t => s > t[0] && s < t[1])) continue;
        [1, -1].forEach(sg => {
          const A = pts[i], B = pts[i + 1], na = nor[i], nbb = nor[i + 1];
          polys.push([[A.x + sg * na[0] * rInt, A.y + sg * na[1] * rInt], [A.x + sg * na[0] * rExt, A.y + sg * na[1] * rExt],
            [B.x + sg * nbb[0] * rExt, B.y + sg * nbb[1] * rExt], [B.x + sg * nbb[0] * rInt, B.y + sg * nbb[1] * rInt]]);
        });
      }
      return polys;
    };
    /* le plan de coupe : tout ce qui n'est pas exclu est coupé ; les matières des pièces exclues sont à elles */
    const coupeur = (racine, exclus) => on => {
      const plan = on ? [new T.Plane(new T.Vector3(0, 0, -1), 0)] : null;
      const ex = new Set(); exclus().forEach(g => g.traverse(o => ex.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || ex.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.clipShadows = true; m.needsUpdate = true; } });
      });
    };

    /* ---------- l'air en grains : chaque grain suit sa courbe, à une vitesse qui peut dépendre de l'endroit ----------
       o = { pas, rayon, couleur, vit(x) → facteur, jitter(s) → amplitude (mm) } ; regler({ vitesse }) en mm/s */
    const geoGrain = new T.SphereGeometry(1, 8, 6);
    const flot = (courbe, o) => {
      const L = courbe.getLength();
      const N = o.nombre || Math.max(6, Math.round(L / o.pas));
      const im = new T.InstancedMesh(geoGrain, K.lumineux(o.couleur), N);
      im.userData.sansOmbre = true; im.castShadow = false; im.frustumCulled = false;
      const s = new Float32Array(N), px = new Float32Array(N);
      for (let i = 0; i < N; i++) s[i] = (((i / N) + (o.decal || 0)) % 1) * L;
      const m4 = new T.Matrix4(), q = new T.Quaternion(), sc = new T.Vector3(), p = new T.Vector3();
      const etat = { vitesse: 0, t: 0 };
      const poser = () => {
        for (let i = 0; i < N; i++) {
          courbe.getPointAt(Math.min(0.9999, s[i] / L), p);
          px[i] = p.x;
          if (o.jitter) {
            const a = o.jitter(s[i]);
            if (a > 0.01) { const ph = i * 2.399 + etat.t * 3.2; p.y += a * Math.sin(ph); p.z += a * Math.cos(ph * 1.3 + 1.1); }
          }
          sc.setScalar(o.rayon); m4.compose(p, q, sc); im.setMatrixAt(i, m4);
        }
        im.instanceMatrix.needsUpdate = true;
      };
      poser();
      return {
        objet: im, etat, longueur: L, facteur: o.facteur === undefined ? 1 : o.facteur,
        regler(a) { Object.assign(etat, a); },
        animer(dt) {
          etat.t += dt;
          for (let i = 0; i < N; i++) { const g = o.vit ? o.vit(px[i]) : 1; s[i] = (s[i] + etat.vitesse * g * dt) % L; }
          poser();
        }
      };
    };

    /* ---------- une flèche de pression : le pied en (x, y), la pointe à L mm dans la direction `angle`
       (0 = vers +Y, π = vers −Y, −π/2 = vers +X, π/2 = vers −X) ---------- */
    const fleche = mat => {
      const g = new T.Group();
      const hampe = new T.Mesh(new T.CylinderGeometry(1.6, 1.6, 1, 10), mat);
      const tete = new T.Mesh(new T.ConeGeometry(4.8, 10, 12), mat);
      [hampe, tete].forEach(m => { m.userData.sansOmbre = true; m.castShadow = false; });
      g.add(hampe, tete);
      g.poser = (x, y, z, angle, L) => {
        g.position.set(x, y, z); g.rotation.z = angle;
        const l = Math.max(L, 11);
        hampe.scale.y = l - 10; hampe.position.y = (l - 10) / 2; tete.position.y = l - 5;
      };
      return g;
    };

    /* ---------- un afficheur à cristaux liquides : ecrire((g, w, h) => …) dessine sur le fond vert pâle ---------- */
    const ecranDe = (W, Hh, k) => {
      const cv = document.createElement('canvas'); cv.width = Math.round(W * k); cv.height = Math.round(Hh * k);
      const g = cv.getContext('2d');
      const tex = new T.CanvasTexture(cv); tex.colorSpace = T.SRGBColorSpace; tex.anisotropy = 4;
      const mesh = new T.Mesh(new T.PlaneGeometry(W, Hh), new T.MeshBasicMaterial({ map: tex, toneMapped: false }));
      mesh.userData.sansOmbre = true; mesh.castShadow = false;
      return { mesh, ecrire: f => { g.fillStyle = '#c9d6b3'; g.fillRect(0, 0, cv.width, cv.height); g.fillStyle = '#1a2a14'; g.textBaseline = 'alphabetic'; f(g, cv.width, cv.height); tex.needsUpdate = true; } };
    };
    const POLICE = '"Consolas", "Courier New", monospace';

    /* ---------- un boîtier à afficheur posé sur la gaine : botte de caoutchouc, façade claire, fenêtre, trois touches ----------
       o = { entrees: [[dx, couleur, repere]], touches: ['ZERO', …] } ; rend { g, ecran } */
    const afficheur = (x, o) => {
      const g = new T.Group();
      const Y0 = 129, Ht = 154, ZF = 20;
      const botte = K.propre(M.caoutchouc); botte.color.setHex(0x2d3238);
      const coque = K.propre(K.plastique(0xe6e8e3, 0.5));
      const fenetre = K.propre(M.plastiqueNoir);
      const touche = K.propre(K.plastique(0x4b535c, 0.55));
      const laiton = K.propre(M.laiton);
      g.add(K.mesh(K.boite(84, Ht, 40, 7), botte, x, Y0 + Ht / 2, 0));
      g.add(K.mesh(K.boite(70, 132, 4, 3), coque, x, Y0 + 72, ZF + 1));
      g.add(K.mesh(K.boite(66, 42, 3, 2), fenetre, x, Y0 + 106, ZF + 3));
      const e = ecranDe(62, 38, 12); e.mesh.position.set(x, Y0 + 106, ZF + 4.7); g.add(e.mesh);
      [-24, 0, 24].forEach((dx, i) => {
        g.add(cyl('z', 7, ZF + 3, ZF + 6.5, x + dx, Y0 + 56, touche, 20));
        if (o.touches[i]) { const t = K.gravure(o.touches[i], 4.2, { couleur: '#2b3138' }); t.position.set(x + dx, Y0 + 40, ZF + 3.2); g.add(t); }
      });
      /* quatre petits pieds de caoutchouc : l'appareil repose sur la gaine */
      [-30, 30].forEach(dx => [-12, 12].forEach(dz => g.add(cyl('y', 5, Y0 - 3, Y0 + 3, x + dx, dz, botte, 12))));
      (o.entrees || []).forEach(([dx, couleur, repere]) => {
        const m = K.propre(couleur === 'laiton' ? M.laiton : M.acier);
        g.add(cyl('y', 3.6, Y0 + Ht - 2, Y0 + Ht + 14, x + dx, 0, m, 14), cyl('y', 4.8, Y0 + Ht + 6, Y0 + Ht + 9, x + dx, 0, m, 14));
        if (repere) { const t = K.gravure(repere, 7, { couleur: '#e8e6df' }); t.position.set(x + dx, Y0 + Ht - 10, ZF - 0.2); g.add(t); }
      });
      return { g, ecran: e, laiton };
    };

    /* ---------- un tréteau d'acier peint, sous la gaine (le dessus de la plaque touche la tôle en y = −129) ---------- */
    const treteau = (x, ySol, mat) => {
      const g = new T.Group();
      g.add(boite(x - 45, x + 45, -149, -129, -90, 90, mat));
      [-70, 70].forEach(z => {
        g.add(boite(x - 10, x + 10, ySol, -149, z - 10, z + 10, mat));
        g.add(boite(x - 28, x + 28, ySol, ySol + 8, z - 28, z + 28, mat));
      });
      g.add(boite(x - 8, x + 8, ySol + 120, ySol + 130, -70, 70, mat));
      return g;
    };

    return { M, D, V, C, boite, cyl, tubeX, revolutionX, nb, air, clamp, H, rect, faceDe, paroisDe, coupeur, flot, fleche, ecranDe, POLICE, afficheur, treteau };
  };

  /* ====================================================================== LE TUBE DE PITOT */
  Electro3D.definir('pitot', (T, K, ctx) => {
    const { M, D, V, C, boite, cyl, tubeX, revolutionX, nb, air, clamp, H, rect, faceDe, paroisDe, coupeur, flot, fleche, POLICE, afficheur, treteau } = trousse(T, K);
    const racine = new T.Group();
    const opt = ctx.options || {};

    /* ------------------------------------------------------------ les cotes */
    const R = 125, RO = 129;               /* gaine Ø 250, tôle de 4 mm */
    const X0 = -430, X1 = 470;
    const XN = -110;                        /* la pointe du nez */
    const XS = 50;                          /* l'axe de la tige */
    const XH = XN + 55;                     /* les trous statiques, 55 mm derrière la pointe */
    const XT = XN + 10;                     /* là où le nez a pris son plein diamètre */
    const FIL = 16, YH0 = 190;              /* rayon du coude, bas de la poignée */
    const XTAP = 170;                       /* la prise statique en paroi */
    const XM = 300;                         /* le manomètre */
    const Y_SOL = -330;
    const Z = 15;

    /* ------------------------------------------------------------ matières */
    const galva = C(M.zingue, 0xbfc5c9), galvaInt = C(M.zingue, 0xa9b0b6), alu = C(M.aluminium, 0xc9ced3);
    const inoxTube = C(M.acier, 0xd2d8dd);
    const inoxNez = C(M.acier, 0xdde2e6);
    const inoxInt = C(M.acier, 0xc3cacf);
    const trouMat = C(K.plastique(0x15181c, 0.8)); trouMat.polygonOffset = true; trouMat.polygonOffsetFactor = -2;
    const laitonC = C(M.laiton);
    const gomme = C(M.caoutchouc, 0x2a2d31);
    /* ce qui reste entier en coupe : matières à soi */
    const peint = K.propre(M.acierSombre);
    const poigneeMat = K.propre(M.plastiqueMarine);
    const barbeRouge = K.propre(M.plastiqueRouge), barbeBleue = K.propre(M.plastiqueMarine);
    const tuyauRouge = K.propre(K.plastique(0xc0392b, 0.4)), tuyauBleu = K.propre(K.plastique(0x1b3a63, 0.4));
    const flecheStat = K.lumineux(0x1b3a63), flecheTot = K.lumineux(0xc0392b);

    /* ------------------------------------------------------------ la gaine, ses colliers, ses tréteaux */
    const gaine = new T.Group();
    gaine.add(tubeX(RO, X0, X1, galva), tubeX(R, X0, X1, galvaInt));
    [X0, X1].forEach(x => { const g = new T.RingGeometry(R, RO, 64); g.rotateY(Math.PI / 2); gaine.add(K.mesh(g, galva, x, 0, 0)); });
    const colliers = [-300, 390];
    colliers.forEach(x => { const c = K.mesh(K.anneau(134, RO, 26, 64), alu, x, 0, 0); c.rotation.z = Math.PI / 2; gaine.add(c); });
    racine.add(gaine);
    const supports = new T.Group();
    supports.add(treteau(-330, Y_SOL, peint), treteau(400, Y_SOL, peint));
    racine.add(supports);

    /* ------------------------------------------------------------ le tube de Pitot : deux tubes l'un dans l'autre */
    const sonde = new T.Group();
    const chemin = x0 => {
      const p = new T.CurvePath();
      p.add(new T.LineCurve3(V(x0, 0, 0), V(XS - FIL, 0, 0)));
      p.add(new T.QuadraticBezierCurve3(V(XS - FIL, 0, 0), V(XS, 0, 0), V(XS, FIL, 0)));
      p.add(new T.LineCurve3(V(XS, FIL, 0), V(XS, YH0, 0)));
      return p;
    };
    const cheminExt = chemin(XT), cheminInt = chemin(XN + 0.2);
    const tubeExt = new T.Mesh(new T.TubeGeometry(cheminExt, 100, 5, 22, false), inoxTube);
    const tubeInt = new T.Mesh(new T.TubeGeometry(cheminInt, 100, 2, 14, false), inoxInt);
    /* le nez : une demi-ellipse qui ferme l'espace entre les deux tubes, et laisse l'âme ouverte au centre */
    const A_NEZ = 10, B_NEZ = 5, F0 = Math.asin(2 / B_NEZ);
    const profilNez = [];
    for (let k = 0; k <= 14; k++) { const f = F0 + (Math.PI / 2 - F0) * k / 14; profilNez.push([B_NEZ * Math.sin(f), XN + A_NEZ * (1 - Math.cos(f))]); }
    const nez = revolutionX(profilNez, inoxNez, 44);
    /* les huit trous statiques, percés sur le côté, 55 mm derrière la pointe */
    const trous = new T.Group();
    const geoTrou = new T.CircleGeometry(1.9, 14);
    for (let k = 0; k < 8; k++) {
      const a = k * Math.PI / 4, dir = V(0, Math.cos(a), Math.sin(a));
      const d = new T.Mesh(geoTrou, trouMat);
      d.quaternion.setFromUnitVectors(V(0, 0, 1), dir);
      d.position.set(XH, dir.y * 5.06, dir.z * 5.06);
      d.userData.sansOmbre = true; d.castShadow = false; trous.add(d);
    }
    /* le collier de passage dans la tôle (caoutchouc) */
    const passage = K.mesh(K.anneau(12, 5.2, 14, 40), gomme, XS, 136, 0);
    /* la poignée, entière : un corps, deux raccords crantés (rouge = pression totale, bleu foncé = pression statique) */
    const poignee = new T.Group();
    poignee.add(cyl('y', 11, YH0, YH0 + 28, XS, 0, poigneeMat, 28), cyl('y', 7.5, YH0 + 28, YH0 + 31, XS, 0, poigneeMat, 20));
    const barbe = (z, mat) => {
      const g = new T.Group();
      g.add(cyl('y', 3.2, YH0 + 28, YH0 + 46, XS, z, mat, 14));
      [YH0 + 36, YH0 + 43].forEach(y => g.add(cyl('y', 4.4, y - 1.5, y + 1.5, XS, z, mat, 14)));
      return g;
    };
    const barbeT = barbe(7, barbeRouge), barbeS = barbe(-7, barbeBleue);
    poignee.add(barbeT, barbeS);
    sonde.add(tubeExt, tubeInt, nez, trous, passage, poignee);
    racine.add(sonde);

    /* ------------------------------------------------------------ la prise statique en paroi : un raccord de laiton vissé dans un trou net */
    const prise = new T.Group();
    prise.add(K.mesh(K.anneau(7, 2.5, 16, 24), laitonC, XTAP, 137, 0), K.mesh(K.anneau(3.8, 2.5, 15, 20), laitonC, XTAP, 152.5, 0));
    [148.5, 155].forEach(y => prise.add(K.mesh(K.anneau(4.8, 2.5, 3, 20), laitonC, XTAP, y, 0)));
    racine.add(prise);

    /* ------------------------------------------------------------ le micromanomètre différentiel */
    const mano = afficheur(XM, { entrees: [[-17, 'acier', '+'], [17, 'acier', '−']], touches: ['ZERO', 'HOLD', 'MODE'] });
    const manoG = mano.g;
    racine.add(manoG);

    /* ------------------------------------------------------------ les tuyaux souples : cinq trajets, selon ce qui est branché */
    const tuyau = (pts, mat) => K.fil(pts, 3.6, mat, { radial: 10 }).mesh;
    const hT  = tuyau([[XS, 228, 7], [XS, 262, 7], [XS + 28, 300, 6], [170, 318, 4], [255, 312, 2], [XM - 17, 300, 0], [XM - 17, 289, 0]], tuyauRouge);
    const hSm = tuyau([[XS, 228, -7], [XS, 276, -7], [84, 326, -6], [200, 346, -4], [296, 340, -2], [XM + 17, 318, 0], [XM + 17, 289, 0]], tuyauBleu);
    const hSp = tuyau([[XS, 228, -7], [XS, 270, -7], [80, 314, -6], [190, 330, -3], [262, 322, -1], [XM - 17, 304, 0], [XM - 17, 289, 0]], tuyauBleu);
    const hWm = tuyau([[XTAP, 156, 0], [XTAP, 190, -6], [205, 260, -12], [255, 330, -12], [296, 350, -10], [XM + 17, 320, -2], [XM + 17, 289, 0]], tuyauBleu);
    const hWp = tuyau([[XTAP, 156, 0], [XTAP, 190, 0], [200, 262, 1], [255, 310, 1], [XM - 17, 304, 0], [XM - 17, 289, 0]], tuyauBleu);
    const tuyaux = new T.Group(); tuyaux.add(hT, hSm, hSp, hWm, hWp);
    racine.add(tuyaux);

    /* ------------------------------------------------------------ les faces de coupe */
    /* les faces de la sonde et de la prise voyagent avec elles (éclaté) ; celles de la tôle restent à la gaine */
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const facesSonde = new T.Group(); facesSonde.visible = false; sonde.add(facesSonde);
    const facesPrise = new T.Group(); facesPrise.visible = false; prise.add(facesPrise);
    const TROU_TIGE = [XS - 5.2, XS + 5.2], TROU_TAP = [XTAP - 2.5, XTAP + 2.5];
    const mur = [[X0, TROU_TIGE[0]], [TROU_TIGE[1], TROU_TAP[0]], [TROU_TAP[1], X1]].map(([a, b]) => rect(a, b, R, RO));
    mur.push(rect(X0, X1, -RO, -R));
    colliers.forEach(x => mur.push(rect(x - 13, x + 13, RO, 134), rect(x - 13, x + 13, -134, -RO)));
    faceDe(mur, H.tole, faces);
    faceDe([rect(XS - 12, XS - 5.2, RO, 143), rect(XS + 5.2, XS + 12, RO, 143)], H.caoutchouc, facesSonde);
    faceDe([rect(XTAP - 7, XTAP - 2.5, RO, 145), rect(XTAP + 2.5, XTAP + 7, RO, 145), rect(XTAP - 3.8, XTAP - 2.5, 145, 160), rect(XTAP + 2.5, XTAP + 3.8, 145, 160),
      rect(XTAP - 4.8, XTAP - 2.5, 147, 150), rect(XTAP + 2.5, XTAP + 4.8, 147, 150), rect(XTAP - 4.8, XTAP - 2.5, 153.5, 156.5), rect(XTAP + 2.5, XTAP + 4.8, 153.5, 156.5)], H.laiton, facesPrise);
    /* les parois des deux tubes, coupées dans leur axe : l'extérieur est percé de trous, l'âme reste pleine */
    const sTrou = XH - XT;
    const polysTube = paroisDe(cheminExt, 5, 4, [[sTrou - 1.9, sTrou + 1.9]]).concat(paroisDe(cheminInt, 2, 1.3));
    /* le nez coupé : la paroi du bout, de l'âme jusqu'au plein diamètre */
    const q0 = Math.asin(2 / (B_NEZ - 1)), ext = [], inte = [];
    for (let k = 0; k <= 12; k++) { const f = F0 + (Math.PI / 2 - F0) * k / 12; ext.push([XN + A_NEZ * (1 - Math.cos(f)), B_NEZ * Math.sin(f)]); }
    for (let k = 0; k <= 12; k++) { const f = Math.PI / 2 - (Math.PI / 2 - q0) * k / 12; inte.push([XN + A_NEZ - (A_NEZ - 1) * Math.cos(f), (B_NEZ - 1) * Math.sin(f)]); }
    [1, -1].forEach(sg => polysTube.push(ext.concat(inte).map(([x, y]) => [x, sg * y])));
    faceDe(polysTube, C(M.acier, 0x3a4048), facesSonde);
    /* les deux canaux, teintés comme leurs tuyaux : l'âme (rouge, ouverte au nez) et l'espace autour (bleu foncé, ouvert aux trous) */
    const remplir = (polys, couleur, op) => {
      const m = faceDe(polys, new T.MeshBasicMaterial({ color: couleur, transparent: true, opacity: op, depthWrite: false, side: T.DoubleSide, toneMapped: false }), facesSonde);
      m.position.z = 0.3; return m;
    };
    remplir(paroisDe(cheminInt, 1.3, 0), 0xc0392b, 0.8);
    remplir(paroisDe(cheminExt, 4, 2).concat([1, -1].map(sg => inte.concat([[XT, 2]]).map(([x, y]) => [x, sg * y]))), 0x1b3a63, 0.55);

    /* ------------------------------------------------------------ l'air, les flèches de pression */
    const air3 = new T.Group(); racine.add(air3);
    const COUL_AIR = 0x2f7fd6;
    const profil = y => Math.pow(Math.max(0.02, 1 - Math.abs(y) / R), 1 / 6);
    const ligne = (pts, o) => flot(new T.CatmullRomCurve3(pts.map(p => V(p[0], p[1], Z)), false, 'centripetal'), Object.assign({ pas: 26, rayon: 3.4, couleur: COUL_AIR }, o));
    const droites = [-105, -75, -48, 48, 75, 105].map((y, i) => ligne([[X0, y], [X1, y]], { facteur: profil(y), decal: (i * 0.37) % 1, pas: 44 }));
    const lisse = t => t * t * (3 - 2 * t);
    /* devant le nez, l'air ralentit presque jusqu'à l'arrêt ; il contourne le nez, puis reprend sa vitesse */
    const vitNez = x => {
      if (x < XN - 4) return 0.12 + 0.88 * lisse(Math.min(1, (XN - 4 - x) / 150));
      return 0.42 + 0.58 * lisse(Math.min(1, (x - XN) / 100));
    };
    const branche = sg => ligne([[X0, 0], [-300, 0], [-170, 0], [-124, 0.8 * sg], [-108, 9 * sg], [-94, 15 * sg], [-60, 17 * sg], [-10, 17 * sg], [40, 18 * sg], [120, 20 * sg], [250, 23 * sg], [X1, 27 * sg]],
      { vit: vitNez, decal: sg > 0 ? 0 : 0.5, pas: 24, rayon: 3 });
    const branches = [branche(1), branche(-1)];
    const flots = droites.concat(branches);
    flots.forEach(f => air3.add(f.objet));
    /* les flèches */
    const fleches = new T.Group(); air3.add(fleches);
    const flMur = [];
    [-340, -240, 130, 235, 340, 425].forEach(x => [1, -1].forEach(sg => { const f = fleche(flecheStat); flMur.push({ f, x, sg }); fleches.add(f); }));
    const flTrou = [1, -1].map(sg => { const f = fleche(flecheStat); fleches.add(f); return { f, sg }; });
    const flTot = fleche(flecheTot); fleches.add(flTot);

    /* ------------------------------------------------------------ l'état */
    const E = { mode: 'dynamique', source: 'pitot', ps: opt.statique !== undefined ? +opt.statique : 120, pd: opt.dynamique !== undefined ? +opt.dynamique : 45, demonte: false, coupe: false };
    const lire = () => { const pt = E.ps + E.pd; return { ps: E.ps, pd: E.pd, pt, v: Math.sqrt(2 * E.pd / 1.2), val: E.mode === 'statique' ? E.ps : E.mode === 'totale' ? pt : E.pd }; };
    const ecrireLCD = L => mano.ecran.ecrire((g, w, h) => {
      g.textAlign = 'right'; g.font = '700 ' + Math.round(h * 0.54) + 'px ' + POLICE;
      g.fillText(String(Math.round(L.val)), w * 0.78, h * 0.62);
      g.textAlign = 'left'; g.font = '700 ' + Math.round(h * 0.23) + 'px ' + POLICE; g.fillText('Pa', w * 0.8, h * 0.62);
      if (E.mode === 'dynamique') { g.font = '700 ' + Math.round(h * 0.2) + 'px ' + POLICE; g.fillText('v ' + nb(L.v, 1) + ' m/s', w * 0.05, h * 0.92); }
    });
    const phrase = L => {
      const pa = n => nb(n, 0) + ' Pa';
      if (E.mode === 'statique') return '<strong>Prise statique : ' + pa(L.ps) + '.</strong> Le manomètre est relié ' + (E.source === 'paroi' ? 'à la prise percée dans la paroi' : 'aux petits trous du côté du tube')
        + ' : il ne lit que la poussée de ' + air('souffle', 'l’air soufflé') + ' sur la paroi. ' + (L.ps < 0 ? 'Le signe moins veut dire que la gaine est du côté où le ventilateur aspire. ' : '') + '<em>À l’écran, l’air est très ralenti.</em>';
      if (E.mode === 'totale') return '<strong>Pression totale : ' + pa(L.pt) + '.</strong> Le manomètre est relié au nez du tube, face à ' + air('souffle', 'l’air soufflé') + ' : il lit la poussée sur la paroi (' + pa(L.ps) + ') plus celle de la vitesse (' + pa(L.pd) + '). <em>À l’écran, l’air est très ralenti.</em>';
      return '<strong>Pression dynamique : ' + pa(L.pd) + '.</strong> Le manomètre compare le nez (pression totale) et la prise statique : il affiche la différence. ' + air('souffle', 'L’air soufflé') + ' file à ' + nb(L.v, 1) + ' m/s. <em>À l’écran, l’air est très ralenti.</em>';
    };
    const maj = () => {
      const L = lire();
      const m = E.mode, src = E.source;
      hT.visible = m !== 'statique';
      hSm.visible = m === 'dynamique' && src === 'pitot';
      hSp.visible = m === 'statique' && src === 'pitot';
      hWm.visible = m === 'dynamique' && src === 'paroi';
      hWp.visible = m === 'statique' && src === 'paroi';
      /* les flèches : leur longueur suit la pression, leur sens aussi (une flèche qui s'éloigne de la paroi = aspiration) */
      const Lw = 10 + 55 * clamp(Math.abs(L.ps) / 500, 0, 1), Lh = clamp(Lw * 0.5, 8, 17), pos = L.ps >= 0;
      flMur.forEach(({ f, x, sg }) => {
        const yw = sg * R;
        if (pos) f.poser(x, yw - sg * Lw, Z - 3, sg > 0 ? 0 : Math.PI, Lw); else f.poser(x, yw, Z - 3, sg > 0 ? Math.PI : 0, Lw);
        f.visible = Math.abs(L.ps) > 2;
      });
      flTrou.forEach(({ f, sg }) => {
        if (pos) f.poser(XH, sg * (7 + Lh), Z - 3, sg > 0 ? Math.PI : 0, Lh); else f.poser(XH, sg * 7, Z - 3, sg > 0 ? 0 : Math.PI, Lh);
        f.visible = Math.abs(L.ps) > 2;
      });
      const Lt = 14 + 46 * clamp(Math.abs(L.pt) / 500, 0, 1);
      if (L.pt >= 0) flTot.poser(XN - 8 - Lt, 0, Z - 3, -Math.PI / 2, Lt); else flTot.poser(XN - 8, 0, Z - 3, Math.PI / 2, Lt);
      flTot.visible = m !== 'statique' && Math.abs(L.pt) > 2;
      const v = L.v;
      air3.visible = !E.demonte;
      flots.forEach(f => { f.objet.visible = v > 0.05; f.regler({ vitesse: 55 * v * f.facteur }); });
      ecrireLCD(L);
      ctx.mesures([
        { libelle: 'Pression statique', valeur: nb(L.ps, 0) + ' Pa' },
        { libelle: 'Pression dynamique', valeur: nb(L.pd, 0) + ' Pa' },
        { libelle: 'Pression totale', valeur: nb(L.pt, 0) + ' Pa' },
        { libelle: 'Vitesse de l’air', valeur: nb(L.v, 1) + ' m/s' }
      ]);
      ctx.dire(phrase(L));
    };

    /* ------------------------------------------------------------ la coupe */
    const exclus = () => [faces, facesSonde, facesPrise, manoG, tuyaux, poignee, supports, air3];
    const poserCoupe = coupeur(racine, exclus);
    const basculerCoupe = on => { E.coupe = on; poserCoupe(on); [faces, facesSonde, facesPrise].forEach(g => { g.visible = on; }); };
    maj();

    /* ------------------------------------------------------------ pièces */
    const pieces = [
      { id: 'gaine', nom: 'La gaine', objets: [gaine], ancre: [250, -118, 12], desc: 'Un tube de tôle galvanisée, Ø 250 mm, posé sur deux tréteaux. On la voit coupée en deux : la tôle ne fait que quelques millimètres.' },
      { id: 'pitot', nom: 'Le tube de Pitot', objets: [tubeExt, passage], ancre: [XS, 90, 0], desc: 'Deux tubes l’un dans l’autre, coudés en L. Il entre dans la gaine par un petit trou, nez face à l’air. Le collier de caoutchouc bouche le trou.' },
      { id: 'nez', nom: 'Le nez : la prise totale', objets: [nez, tubeInt], ancre: [-104, 0, 0], desc: 'L’âme du tube est ouverte au bout du nez, face à l’air. L’air bute dedans : c’est la pression totale.' },
      { id: 'prisesStatiques', nom: 'Les trous du côté : la prise statique', objets: [trous], ancre: [XH, 5, 0], desc: 'Huit petits trous percés sur le côté du tube. L’air passe devant sans les heurter : ils ne sentent que la poussée sur la paroi, la pression statique.' },
      { id: 'poignee', nom: 'La poignée et ses deux raccords', objets: [poignee], ancre: [XS, 204, 0], desc: 'Hors de la gaine. Le raccord rouge vient de l’âme (pression totale), le raccord bleu foncé vient de l’espace autour (pression statique).' },
      { id: 'tuyaux', nom: 'Les tuyaux souples', objets: [tuyaux], ancre: [200, 316, 3], desc: 'Rouge : pression totale. Bleu foncé : pression statique. Le manomètre est branché entre les deux, sans les inverser.' },
      { id: 'manometre', nom: 'Le micromanomètre', objets: [manoG], ancre: [XM, 185, 24], desc: 'Il compare ce qui arrive sur ses deux entrées, « + » et « − », et affiche l’écart en pascals. Avant de mesurer, on fait le zéro, les deux entrées à l’air libre.' },
      { id: 'priseParoi', nom: 'La prise statique en paroi', objets: [prise], ancre: [XTAP, 138, 7], desc: 'Un raccord vissé sur un trou net, percé à angle droit de la paroi, sans bavure. Il donne la même pression statique que les trous du tube.' }
    ];

    const commandes = [
      { id: 'mode', type: 'choix', titre: 'Le manomètre lit', options: [['statique', 'Prise statique'], ['dynamique', 'Pression dynamique'], ['totale', 'Pression totale']], valeur: 'dynamique' },
      { id: 'statique', type: 'curseur', libelle: 'Pression statique', min: -100, max: 500, pas: 1, unite: 'Pa', valeur: E.ps },
      { id: 'dynamique', type: 'curseur', libelle: 'Pression dynamique', min: 0, max: 250, pas: 1, unite: 'Pa', valeur: E.pd },
      { id: 'source', type: 'choix', titre: 'Prise statique branchée', options: [['pitot', 'Sur le côté du tube'], ['paroi', 'En paroi']], valeur: 'pitot' }
    ];
    const base = [['mode', 'dynamique'], ['source', 'pitot'], ['statique', E.ps], ['dynamique', E.pd]];
    const etapes = [
      { titre: 'Le tube de Pitot plonge dans la gaine', piece: 'pitot', voirDedans: false, eclate: false, actions: base,
        vue: { azimut: 24, elevation: 16, zoom: 1.2, cible: null },
        texte: 'Un tube en L entre par un petit trou. Son nez regarde ' + air('souffle', 'l’air soufflé') + ' qui arrive. Deux tuyaux souples le relient au manomètre, posé sur la gaine.' },
      { titre: 'L’air longe les trous du côté : pression statique', piece: 'prisesStatiques', voirDedans: true, eclate: false, ralenti: true,
        actions: [['mode', 'statique'], ['source', 'pitot'], ['statique', E.ps], ['dynamique', E.pd]],
        vue: { azimut: 8, elevation: 6, zoom: 7, cible: [-62, 0, 0] },
        texte: air('souffle', 'L’air') + ' glisse le long du tube sans le heurter. Les petits trous du côté ne sentent que la poussée sur la paroi : c’est la pression statique.' },
      { titre: 'L’air bute contre le nez : pression totale', piece: 'nez', voirDedans: true, eclate: false, ralenti: true,
        actions: [['mode', 'totale'], ['source', 'pitot'], ['statique', E.ps], ['dynamique', E.pd]],
        vue: { azimut: 8, elevation: 6, zoom: 9, cible: [-96, 0, 0] },
        texte: 'Face au courant, le nez arrête l’air : les grains ralentissent et s’entassent. Cette poussée de la vitesse s’ajoute à celle sur la paroi : le manomètre lit la pression totale.' },
      { titre: 'Entre les deux, le manomètre lit la différence', piece: 'manometre', voirDedans: true, eclate: false,
        actions: base,
        vue: { azimut: 12, elevation: 10, zoom: 1.9, cible: [170, 230, 0] },
        texte: 'Le tuyau rouge porte la pression totale, le tuyau bleu foncé la pression statique. Branché entre les deux, le manomètre fait la différence : c’est la pression dynamique.' },
      { titre: 'Plus l’air va vite, plus la pression dynamique monte', piece: 'manometre', voirDedans: true, eclate: false,
        actions: [['mode', 'dynamique'], ['source', 'pitot'], ['statique', E.ps], ['dynamique', 150]],
        vue: { azimut: 10, elevation: 8, zoom: 3.0, cible: [300, 230, 0] },
        texte: 'À 150 Pa de pression dynamique, l’air file à 15,8 m/s. On passe de la pression à la vitesse : v = √(2 × pression dynamique ÷ 1,2).' },
      { titre: 'La prise en paroi donne la même pression statique', piece: 'priseParoi', voirDedans: true, eclate: false,
        actions: [['mode', 'dynamique'], ['source', 'paroi'], ['statique', E.ps], ['dynamique', E.pd]],
        vue: { azimut: 12, elevation: 10, zoom: 2.1, cible: [210, 190, 0] },
        texte: 'On peut brancher, à la place des trous du tube, une prise percée à angle droit dans la paroi, sans bavure. Le tuyau bleu foncé en part : le manomètre affiche la même valeur.' }
    ];
    const eclate = [
      { objets: [manoG, tuyaux], vers: [160, 40, 0], debut: 0, fin: 0.5 },
      { objets: [sonde], vers: [0, 330, 0], debut: 0.2, fin: 0.8 },
      { objets: [prise], vers: [0, 170, 0], debut: 0.5, fin: 1 }
    ];

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 26, elevation: 20, zoom: 0.8, cible: [100, 130, 0] },
      vue: { azimut: 14, elevation: 14, cadre: [gaine, sonde, manoG, tuyaux, supports], marge: 0.72 },
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'mode') E.mode = v;
        if (id === 'source') E.source = v;
        if (id === 'statique') E.ps = +v;
        if (id === 'dynamique') E.pd = +v;
        maj();
      },
      surEclate(on) { E.demonte = on; maj(); },
      animer(dt) {
        if (E.demonte || lire().v <= 0.05) return false;
        flots.forEach(f => f.animer(dt));
        return true;
      }
    };
  }, { famille: 'sondes', titre: 'Le tube de Pitot et le manomètre', stations: ['pressions', 'pressions-reseau'] });

  /* ====================================================================== L'ANÉMOMÈTRE */
  Electro3D.definir('anemometre', (T, K, ctx) => {
    const { M, D, V, C, boite, cyl, tubeX, nb, air, clamp, H, rect, faceDe, coupeur, flot, POLICE, afficheur, treteau } = trousse(T, K);
    const racine = new T.Group();
    const opt = ctx.options || {};
    const profilVar = opt.variante === 'profil';

    /* ------------------------------------------------------------ les cotes */
    const R = 125, RO = 129;               /* gaine ronde Ø 250 */
    const RB = 250;                        /* rayon du coude (à l'axe) */
    const XS0 = -600, X1 = 450;            /* début de la longueur droite, fin de la gaine */
    const XM = 150;                        /* le plan de mesure */
    const XP = 300;                        /* le profil des vitesses, dessiné en aval */
    const XB = 330;                        /* l'afficheur */
    const Y_SOL = -410, YLEG = -400;
    const XLEG = XS0 - RB;                 /* axe de la jambe verticale */
    const Z = 15;

    /* ------------------------------------------------------------ matières (celles de la gaine sont coupées) */
    const galva = C(M.zingue, 0xbfc5c9), galvaInt = C(M.zingue, 0xa9b0b6), alu = C(M.aluminium, 0xc9ced3);
    const gomme = C(M.caoutchouc, 0x2a2d31);
    const peint = K.propre(M.acierSombre);
    const inox = K.propre(M.acier), inoxClair = K.propre(M.acier); inoxClair.color.setHex(0xdde2e6);
    const teteMat = K.propre(M.plastiqueNoir), poigneeMat = K.propre(M.plastiqueMarine);
    const fil = K.propre(K.plastique(0xc9451a, 0.4)); fil.emissive.setHex(0xe8711a); fil.emissiveIntensity = 0.9;
    const cableMat = K.propre(M.caoutchouc);
    const rougeProfil = K.lumineux(0xc0392b);
    const COUL_AIR = 0x2f7fd6;

    /* ------------------------------------------------------------ la gaine : coude, longueur droite, jambe verticale */
    const gaine = new T.Group(), coude = new T.Group();
    gaine.add(tubeX(RO, XS0, X1, galva), tubeX(R, XS0, X1, galvaInt));
    { const g = new T.RingGeometry(R, RO, 64); g.rotateY(Math.PI / 2); gaine.add(K.mesh(g, galva, X1, 0, 0)); }
    const torre = (r, mat) => { const g = new T.TorusGeometry(RB, r, 28, 40, Math.PI / 2); g.rotateZ(Math.PI / 2); g.translate(XS0, -RB, 0); return new T.Mesh(g, mat); };
    const tubeY = (r, y0, y1, mat) => { const g = new T.CylinderGeometry(r, r, y1 - y0, 56, 1, true); const m = new T.Mesh(g, mat); m.position.set(XLEG, (y0 + y1) / 2, 0); return m; };
    coude.add(torre(RO, galva), torre(R, galvaInt), tubeY(RO, YLEG, -RB, galva), tubeY(R, YLEG, -RB, galvaInt));
    { const g = new T.RingGeometry(R, RO, 64); g.rotateX(Math.PI / 2); coude.add(K.mesh(g, galva, XLEG, YLEG, 0)); }
    /* la bride du pied et les deux tréteaux */
    const supports = new T.Group();
    supports.add(boite(XLEG - 150, XLEG + 150, Y_SOL, YLEG, -150, 150, peint));
    supports.add(treteau(-300, Y_SOL, peint), treteau(310, Y_SOL, peint));
    racine.add(gaine, coude, supports);

    /* ------------------------------------------------------------ les deux colliers de passage (haut et avant), en caoutchouc */
    const collierH = K.mesh(K.anneau(12, 5.2, 14, 40), gomme, XM, 136, 0);
    const collierF = K.mesh(K.anneau(12, 5.2, 14, 40), gomme, XM, 0, 136); collierF.rotation.x = Math.PI / 2;
    const colliers = new T.Group(); colliers.add(collierH, collierF); racine.add(colliers);
    const facesCollier = new T.Group(); facesCollier.visible = false; colliers.add(facesCollier);

    /* ------------------------------------------------------------ la grille de relevé : un plan imaginaire en travers de la gaine, douze points */
    const grille = new T.Group();
    const disque = new T.CircleGeometry(R, 64); disque.rotateY(Math.PI / 2);
    const voile = new T.Mesh(disque, new T.MeshBasicMaterial({ color: 0x9ec3ea, transparent: true, opacity: 0.2, depthWrite: false, side: T.DoubleSide, toneMapped: false }));
    voile.position.x = XM; voile.userData.voile = true; voile.userData.sansOmbre = true; voile.castShadow = false;
    const anneauG = new T.TorusGeometry(R - 0.5, 1.1, 8, 72); anneauG.rotateY(Math.PI / 2);
    const bordGrille = new T.Mesh(anneauG, K.lumineux(0x1b3a63)); bordGrille.position.x = XM; bordGrille.userData.sansOmbre = true;
    grille.add(voile, bordGrille);
    /* douze points : deux diamètres perpendiculaires, trois points par rayon, chacun au milieu d'une couronne de même surface */
    const RAYONS = [1, 2, 3].map(i => R * Math.sqrt((2 * i - 1) / 6));          /* 51,0 · 88,4 · 114,1 mm */
    const ORDRE = [RAYONS[2], RAYONS[1], RAYONS[0], -RAYONS[0], -RAYONS[1], -RAYONS[2]];
    const POINTS = [{ th: 0, rho: 0, r: 0 }];                                     /* 0 = le centre, seul */
    [0, Math.PI / 2].forEach(th => ORDRE.forEach(rho => POINTS.push({ th, rho, r: Math.abs(rho) })));
    const profilV = r => Math.pow(Math.max(0.02, 1 - r / R), 1 / 6);               /* loi en puissance 1/6 */
    const M12 = POINTS.slice(1).reduce((a, p) => a + profilV(p.r), 0) / 12;      /* moyenne du profil sur les douze points */
    const geoPoint = new T.SphereGeometry(5.5, 14, 10);
    const points = POINTS.map((p, k) => {
      const mat = new T.MeshStandardMaterial({ color: 0xdfe6ee, roughness: 0.4, emissive: 0x000000 });
      const m = new T.Mesh(geoPoint, mat);
      m.position.set(XM, p.th === 0 ? p.rho : 0, p.th === 0 ? 0 : p.rho);
      if (k === 0) m.scale.setScalar(0.7);
      m.userData.sansOmbre = true; m.castShadow = false; grille.add(m); return m;
    });
    racine.add(grille);

    /* ------------------------------------------------------------ le profil des vitesses (flèches rouges, dessinées en aval) */
    const profilG = new T.Group();
    const QS = [-124, -117, -105, -90, -70, -45, -20, 0, 20, 45, 70, 90, 105, 117, 124];
    const LMAX = 170;
    const fl = (y, L) => {
      const g = new T.Group();
      const h = new T.Mesh(new T.CylinderGeometry(1.4, 1.4, 1, 8), rougeProfil), t = new T.Mesh(new T.ConeGeometry(4.2, 9, 10), rougeProfil);
      h.rotation.z = -Math.PI / 2; h.scale.y = Math.max(1, L - 9); h.position.x = Math.max(1, L - 9) / 2; t.rotation.z = -Math.PI / 2; t.position.x = L - 4.5;
      g.add(h, t); g.position.set(XP, y, 6); [h, t].forEach(m => { m.userData.sansOmbre = true; m.castShadow = false; }); return g;
    };
    QS.filter(q => Math.abs(q) <= 120 && q !== 124 && q !== -124).forEach(q => profilG.add(fl(q, LMAX * profilV(Math.abs(q)))));
    { const pts = []; for (let i = -125; i <= 125; i += 5) pts.push(V(XP + LMAX * profilV(Math.abs(i)), i, 6));
      const tube = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts, false, 'centripetal'), 80, 1.6, 6, false), rougeProfil); tube.userData.sansOmbre = true; tube.castShadow = false; profilG.add(tube);
      const base = new T.Mesh(new T.CylinderGeometry(1.1, 1.1, 2 * R, 8), K.lumineux(0x8a4a3c)); base.position.set(XP, 0, 6); base.userData.sansOmbre = true; profilG.add(base); }
    racine.add(profilG);

    /* ------------------------------------------------------------ la cote de la longueur droite (un vrai trait de cotation, sans texte) */
    const cote = new T.Group();
    const marine = K.lumineux(0x1b3a63);
    const YC = 168, ZC = -60;
    const barre = (x0, x1, y0, y1, e) => { const m = boite(x0, x1, y0, y1, ZC - e, ZC + e, marine); m.userData.sansOmbre = true; m.castShadow = false; return m; };
    cote.add(barre(XS0 + 8, XM - 8, YC - 1.2, YC + 1.2, 1.2));
    [XS0, XM].forEach(x => cote.add(barre(x - 1.2, x + 1.2, 128, YC + 18, 1.2)));
    [[XS0 + 4, 1], [XM - 4, -1]].forEach(([x, sg]) => { const c = new T.Mesh(new T.ConeGeometry(5, 18, 12), marine); c.rotation.z = -sg * Math.PI / 2; c.position.set(x + sg * 9, YC, ZC); c.userData.sansOmbre = true; c.castShadow = false; cote.add(c); });
    racine.add(cote);

    /* ------------------------------------------------------------ la canne : un manche, trois tubes qui coulissent, une tête à fil chaud
       Repère local : Y = vers l'extérieur de la gaine, depuis l'axe. La canne tourne autour de l'axe X de la gaine. */
    const canne = new T.Group(); canne.position.set(XM, 0, 0);
    const tige = (r, mat) => { const m = new T.Mesh(new T.CylinderGeometry(r, r, 1, 20), mat); canne.add(m); return m; };
    const tA = tige(6.5, inoxClair), tB = tige(5, inox), tC = tige(3.2, inox);
    const pose = (m, y0, y1) => { m.visible = y1 - y0 > 0.5; m.scale.y = Math.max(0.001, y1 - y0); m.position.y = (y0 + y1) / 2; };
    pose(tA, 150, 232);
    const manche = new T.Group();
    manche.add(cyl('y', 13, 232, 332, 0, 0, poigneeMat, 24), cyl('y', 8, 332, 340, 0, 0, poigneeMat, 16));
    for (let y = 245; y < 330; y += 14) manche.add(cyl('y', 13.6, y, y + 4, 0, 0, poigneeMat, 24));
    canne.add(manche);
    const tete = new T.Group();
    tete.add(K.mesh(new T.SphereGeometry(4.2, 14, 10), teteMat, 0, 4.2, 0), cyl('y', 4.2, 4.2, 22, 0, 0, teteMat, 14));
    const bague = new T.Mesh(new T.TorusGeometry(4.5, 0.8, 6, 16), fil); bague.rotation.x = Math.PI / 2; bague.position.y = 12; tete.add(bague);
    canne.add(tete);
    racine.add(canne);

    /* ------------------------------------------------------------ l'afficheur, posé sur la gaine, et son câble */
    const boit = afficheur(XB, { entrees: [], touches: ['ZERO', 'HOLD', 'AVG'] });
    boit.g.add(cyl('y', 5.5, 281, 293, XB, 0, K.propre(M.plastiqueNoir), 14));
    const cable = new T.Mesh(new T.BufferGeometry(), cableMat);
    racine.add(boit.g, cable);

    /* ------------------------------------------------------------ les faces de coupe (plan z = 0) */
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const TROU = [XM - 5.2, XM + 5.2];
    const mur = [rect(XS0, TROU[0], R, RO), rect(TROU[1], X1, R, RO), rect(XS0, X1, -RO, -R)];
    const arcB = (r0, r1) => { const p = [], n = 28; for (let i = 0; i < n; i++) { const f0 = i / n * Math.PI / 2, f1 = (i + 1) / n * Math.PI / 2; const P = (rho, f) => [XS0 - rho * Math.cos(f), -RB + rho * Math.sin(f)]; p.push([P(r0, f0), P(r1, f0), P(r1, f1), P(r0, f1)]); } return p; };
    mur.push(...arcB(RB + R, RB + RO), ...arcB(RB - RO, RB - R), rect(XLEG - RO, XLEG - R, YLEG, -RB), rect(XLEG + R, XLEG + RO, YLEG, -RB));
    faceDe(mur, H.tole, faces);
    faceDe([rect(XM - 12, XM - 5.2, RO, 143), rect(XM + 5.2, XM + 12, RO, 143)], H.caoutchouc, facesCollier);

    /* ------------------------------------------------------------ l'air : onze filets, plus vite au milieu, qui tourbillonnent après le coude */
    const air3 = new T.Group(); racine.add(air3);
    const QF = [-110, -75, -40, 0, 40, 75, 110];
    const trace = q => {
      const rho = RB + q, pts = [[XLEG - q, YLEG], [XLEG - q, -RB - 70], [XLEG - q, -RB]];
      for (let k = 1; k < 8; k++) { const f = k / 8 * Math.PI / 2; pts.push([XS0 - rho * Math.cos(f), -RB + rho * Math.sin(f)]); }
      pts.push([XS0, q], [XS0 + 60, q], [XS0 + 300, q], [XS0 + 700, q], [X1, q]);
      return pts;
    };
    const flots = QF.map((q, i) => {
      const rho = RB + q, sE = (-RB - YLEG) + rho * Math.PI / 2;      /* longueur du filet jusqu'à la sortie du coude */
      const jitter = s => s < (-RB - YLEG) ? 0 : s < sE ? 24 * (s - (-RB - YLEG)) / (sE - (-RB - YLEG)) : 24 * Math.exp(-(s - sE) / 230);
      const f = flot(new T.CatmullRomCurve3(trace(q).map(p => V(p[0], p[1], Z)), false, 'centripetal'), { pas: 52, rayon: 4.6, couleur: COUL_AIR, jitter, decal: (i * 0.29) % 1, facteur: profilV(Math.abs(q)) });
      air3.add(f.objet); return f;
    });

    /* ------------------------------------------------------------ l'état */
    const SECTION0 = profilVar ? 250 : 0.055;
    const E = { ubar: opt.vitesse !== undefined ? +opt.vitesse : (profilVar ? 4 : 4.2), grand: opt.section !== undefined ? +opt.section : SECTION0,
      k: 0, vus: new Array(13).fill(false), auto: false, attente: 0, arrive: false, demonte: false, coupe: false, sale: true };
    const aire = () => profilVar ? Math.PI * Math.pow(E.grand / 1000, 2) / 4 : E.grand;      /* m² */
    const umax = () => E.ubar / M12;
    const lectureAu = k => umax() * (k === 0 ? 1 : profilV(POINTS[k].r));
    const moyenne = () => { const l = []; for (let k = 1; k <= 12; k++) if (E.vus[k]) l.push(lectureAu(k)); return l.length ? { m: l.reduce((a, b) => a + b, 0) / l.length, n: l.length } : null; };

    const thetaM = K.mobile(0, 40, 12.6), rhoM = K.mobile(0, 90, 19);
    const cible = () => POINTS[E.k];
    const poserCanne = () => {
      const th = thetaM.x, rt = rhoM.x;
      canne.rotation.x = th;
      const topTete = rt + 22, bB = Math.max(topTete, -40);
      pose(tB, bB, 150); pose(tC, topTete, bB);
      tete.position.y = rt;
      /* le câble : du bout du manche à la prise de l'afficheur, en arc */
      const d = V(0, Math.cos(th), Math.sin(th)), G = V(XM, 0, 0).addScaledVector(d, 340), S = G.clone().addScaledVector(d, 36);
      const P = V(XB, 293, 0), Pu = V(XB, 330, 0);
      const mil = S.clone().add(Pu).multiplyScalar(0.5); mil.y += 70;
      const courbe = new T.CatmullRomCurve3([G, S, mil, Pu, P], false, 'centripetal');
      cable.geometry.dispose(); cable.geometry = new T.TubeGeometry(courbe, 60, 2.4, 8, false);
    };
    const poserPoints = () => {
      points.forEach((m, k) => {
        const mat = m.material, on = k === E.k && E.arrive;
        mat.color.setHex(on ? 0xff6b35 : (k > 0 && E.vus[k]) ? 0x1b3a63 : 0xdfe6ee);
        mat.emissive.setHex(on ? 0xff6b35 : 0x000000); mat.emissiveIntensity = on ? 0.7 : 0;
      });
    };
    const ecrireLCD = () => boit.ecran.ecrire((g, w, h) => {
      const mo = moyenne();
      /* les douze relevés faits : l'afficheur montre la moyenne (touche AVG), en grand */
      const fin = !!mo && mo.n === 12 && E.arrive;
      g.textAlign = 'left'; g.font = '700 ' + Math.round(h * 0.2) + 'px ' + POLICE;
      g.fillText(fin ? 'AVG 12/12' : E.k === 0 ? 'centre' : 'n° ' + E.k + '/12', w * 0.05, h * 0.24);
      g.textAlign = 'right'; g.font = '700 ' + Math.round(h * 0.52) + 'px ' + POLICE;
      g.fillText(fin ? nb(mo.m, 1) : E.arrive ? nb(lectureAu(E.k), 1) : '- - -', w * 0.72, h * 0.64);
      g.textAlign = 'left'; g.font = '700 ' + Math.round(h * 0.2) + 'px ' + POLICE; g.fillText('m/s', w * 0.75, h * 0.64);
      if (mo && mo.n > 1 && !fin) g.fillText('AVG ' + nb(mo.m, 1) + ' m/s', w * 0.05, h * 0.93);
    });
    const majTexte = () => {
      const mo = moyenne(), a = aire(), pct = Math.round((umax() / E.ubar - 1) * 100);
      const lect = nb(lectureAu(E.k), 1);
      const moy = mo ? mo.m : E.ubar;
      ctx.mesures([
        { libelle: 'Point de relevé', valeur: E.k === 0 ? 'au centre' : 'n° ' + E.k + ' sur 12' },
        { libelle: 'Vitesse lue à ce point', valeur: E.arrive ? lect + ' m/s' : 'sonde en mouvement' },
        { libelle: 'Moyenne des relevés', valeur: mo ? nb(mo.m, 1) + ' m/s (' + mo.n + ' sur 12)' : 'aucun relevé' },
        { libelle: profilVar ? 'Section (Ø ' + nb(E.grand, 0) + ' mm)' : 'Section', valeur: nb(a, profilVar ? 3 : 3) + ' m²' },
        { libelle: 'Débit calculé', valeur: nb((mo ? mo.m : E.ubar) * a * 3600, 0) + ' m³/h' },
        ...(E.k === 0 && E.arrive ? [{ libelle: 'Débit si l’on ne mesure qu’au centre', valeur: nb(umax() * a * 3600, 0) + ' m³/h, trop fort de ' + pct + ' %' }] : [])
      ]);
      let t;
      if (mo && mo.n === 12) t = '<strong>Douze relevés faits : moyenne ' + nb(mo.m, 1) + ' m/s.</strong> Débit = ' + nb(mo.m, 1) + ' × ' + nb(a, 3) + ' m² × 3 600 = ' + nb(mo.m * a * 3600, 0) + ' m³/h.';
      else if (!E.arrive) t = '<strong>La sonde se déplace.</strong> La mesure n’est lue qu’une fois la tête arrêtée.';
      else if (E.k === 0) t = '<strong>Au centre : ' + lect + ' m/s.</strong> C’est ' + pct + ' % de plus que la vitesse moyenne (' + nb(E.ubar, 1) + ' m/s). Un débit calculé avec cette seule valeur serait trop fort.';
      else t = '<strong>Point ' + E.k + ' sur 12 : ' + lect + ' m/s.</strong> ' + (POINTS[E.k].r > 100 ? 'Tout près de la paroi, ' + air('souffle', 'l’air soufflé') + ' traîne : la vitesse est faible.' : 'Plus près du centre, ' + air('souffle', 'l’air soufflé') + ' va plus vite.');
      ctx.dire(t + ' <em>À l’écran, l’air est très ralenti.</em>');
    };
    const maj = () => {
      poserPoints(); ecrireLCD(); majTexte();
      flots.forEach(f => f.regler({ vitesse: 80 * umax() * f.facteur }));
      air3.visible = !E.demonte;
      profilG.visible = E.coupe && !E.demonte;
    };
    const arrivee = () => {
      if (E.arrive) return;
      E.arrive = true;
      if (E.k > 0) E.vus[E.k] = true;
      E.attente = 0; E.sale = true;
    };

    /* ------------------------------------------------------------ la coupe */
    const exclus = () => [faces, facesCollier, grille, canne, boit.g, cable, supports, air3, profilG, cote];
    const poserCoupe = coupeur(racine, exclus);
    const basculerCoupe = on => { E.coupe = on; poserCoupe(on); faces.visible = on; facesCollier.visible = on; maj(); };
    poserCanne(); maj();

    /* ------------------------------------------------------------ pièces */
    const pieces = [
      { id: 'gaine', nom: 'La gaine droite', objets: [gaine], ancre: [-250, -118, 12], desc: 'Un tube de tôle galvanisée, Ø 250 mm. On la voit coupée en deux. La sonde mesure sur cette partie droite, loin du coude.' },
      { id: 'coude', nom: 'Le coude en amont', objets: [coude], ancre: [-777, -73, 12], desc: 'Après un coude, l’air tourbillonne : ses vitesses n’ont plus d’ordre. On ne mesure jamais juste derrière.' },
      { id: 'cote', nom: 'La longueur droite', objets: [cote], ancre: [-225, 168, -60], desc: 'Un trait de cote : la distance, en ligne droite, entre le coude et le plan de mesure. Elle se lit dans le texte du chantier, pas de mémoire.' },
      { id: 'colliers', nom: 'Les trous de mesure', objets: [colliers], ancre: [XM, 137, 0], desc: 'Deux trous percés dans la tôle, à angle droit l’un de l’autre, bouchés par un collier de caoutchouc. La canne y glisse sans fuite.' },
      { id: 'grille', nom: 'Le plan et les douze points', objets: [grille], ancre: [XM, -60, -70], desc: 'Un plan imaginaire en travers de la gaine. Douze points, sur deux diamètres : chacun est au milieu d’une zone de même surface.' },
      { id: 'profil', nom: 'Le profil des vitesses', objets: [profilG], ancre: [XP + 60, 0, 6], desc: 'Les flèches rouges ont la longueur de la vitesse : grande au centre, courte contre la paroi.' },
      { id: 'sonde', nom: 'La canne à fil chaud', objets: [canne], ancre: [XM, 260, 0], desc: 'Trois tubes qui coulissent, une petite tête au bout. Un fil chauffé s’y refroidit d’autant plus que l’air va vite : c’est ce qui mesure la vitesse.' },
      { id: 'boitier', nom: 'Le boîtier afficheur', objets: [boit.g, cable], ancre: [XB, 190, 24], desc: 'Il reçoit le signal de la canne et affiche la vitesse en m/s. La touche AVG garde la moyenne des relevés.' }
    ];

    const commandes = profilVar ? [
      { id: 'section', type: 'curseur', libelle: 'Diamètre', min: 80, max: 630, pas: 5, unite: 'mm', valeur: E.grand },
      { id: 'vitesse', type: 'curseur', libelle: 'Vitesse', min: 0.5, max: 12, pas: 0.1, unite: 'm/s', valeur: E.ubar },
      { id: 'point', type: 'curseur', libelle: 'Point de relevé', min: 0, max: 12, pas: 1, valeur: 0, format: v => v === 0 ? 'au centre' : v + ' sur 12' },
      { id: 'parcours', type: 'action', libelle: 'Faire les douze relevés', accent: true }
    ] : [
      { id: 'vitesse', type: 'curseur', libelle: 'Vitesse moyenne', min: 0.2, max: 12, pas: 0.1, unite: 'm/s', valeur: E.ubar },
      { id: 'section', type: 'curseur', libelle: 'Section', min: 0.01, max: 0.5, pas: 0.005, unite: 'm²', valeur: E.grand },
      { id: 'point', type: 'curseur', libelle: 'Point de relevé', min: 0, max: 12, pas: 1, valeur: 0, format: v => v === 0 ? 'au centre' : v + ' sur 12' },
      { id: 'parcours', type: 'action', libelle: 'Faire les douze relevés', accent: true }
    ];
    const sec0 = SECTION0;
    const calme = [['vitesse', E.ubar], ['section', sec0]];
    const etapes = [
      { titre: 'Une gaine, un trou de mesure, une longueur droite', piece: 'cote', voirDedans: false, eclate: false, actions: [['raz', true], ['point', 0], ...calme],
        vue: { azimut: 28, elevation: 16, zoom: 1.0, cible: null },
        texte: 'Après le coude, l’air tourbillonne. On mesure donc plus loin, sur une longueur droite : la cote la marque. La canne entre par un petit trou percé dans la gaine.' },
      { titre: 'L’air file au centre et traîne contre la paroi', piece: 'profil', voirDedans: true, eclate: false, actions: [['raz', true], ['point', 0], ...calme],
        vue: { azimut: 6, elevation: 8, zoom: 2.3, cible: [250, 0, 0] },
        texte: air('souffle', 'L’air soufflé') + ' va vite au milieu et ralentit contre le métal. Les flèches rouges ont la longueur de la vitesse, et les grains vont du même train.' },
      { titre: 'Au centre seul, la vitesse lue est trop forte', piece: 'sonde', voirDedans: true, eclate: false, actions: [['raz', true], ['point', 0], ...calme],
        vue: { azimut: 24, elevation: 14, zoom: 2.2, cible: [180, 100, 0] },
        get texte() { return 'La tête est au centre, là où l’air va le plus vite : elle lit ' + nb(umax(), 1) + ' m/s, alors que la vitesse moyenne est de ' + nb(E.ubar, 1) + ' m/s. Le débit serait trop fort.'; } },
      { titre: 'Près de la paroi, la même sonde lit beaucoup moins', piece: 'sonde', voirDedans: true, eclate: false, actions: [['raz', true], ['point', 1], ...calme],
        vue: { azimut: 24, elevation: 14, zoom: 2.2, cible: [180, 100, 0] },
        get texte() { return 'Poussée vers la paroi, la tête ne lit plus que ' + nb(lectureAu(1), 1) + ' m/s : l’air y traîne. Aucun point isolé ne donne la vitesse de toute la section.'; } },
      { titre: 'La sonde visite les douze points', piece: 'grille', voirDedans: true, eclate: false, duree: 18, actions: [['parcours', true]],
        vue: { azimut: 42, elevation: 20, zoom: 2.0, cible: [150, 0, 0] },
        texte: 'Sur deux diamètres, trois points par rayon : la sonde passe de l’un à l’autre. Chaque point devient bleu foncé quand son relevé est fait ; l’afficheur garde la moyenne.' },
      { titre: 'La moyenne des douze, multipliée par la section, donne le débit', piece: 'boitier', voirDedans: true, eclate: false, actions: [['tout', true]],
        vue: { azimut: 22, elevation: 12, zoom: 2.2, cible: [260, 200, 0] },
        get texte() { const a = aire(); return 'Moyenne des douze relevés : ' + nb(E.ubar, 1) + ' m/s. Multipliée par la section (' + nb(a, 3) + ' m²) puis par 3 600, elle donne ' + nb(E.ubar * a * 3600, 0) + ' m³/h.'; } }
    ];
    const eclate = [
      { objets: [canne], vers: [0, 360, 0], debut: 0, fin: 0.55 },
      { objets: [boit.g, cable], vers: [200, 60, 0], debut: 0.1, fin: 0.6 },
      { objets: [colliers], vers: [0, 150, 0], debut: 0.5, fin: 1 }
    ];

    let tCable = 0;
    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 30, elevation: 20, zoom: 0.8, cible: [-120, 90, 0] },
      vue: { azimut: 34, elevation: 18, cadre: [gaine, coude, canne, boit.g, supports], marge: 0.72 },
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'vitesse') E.ubar = +v;
        if (id === 'section') E.grand = +v;
        if (id === 'point') { E.k = Math.round(+v); E.arrive = false; E.auto = false; }
        if (id === 'parcours') { E.auto = true; E.vus.fill(false); E.k = 1; E.arrive = false; ctx.regler('point', 1); }
        if (id === 'raz') { E.auto = false; E.vus.fill(false); }
        if (id === 'tout') {
          /* les douze relevés sont faits : la canne est déjà au dernier point */
          E.auto = false; E.vus.fill(true); E.vus[0] = false; E.k = 12; ctx.regler('point', 12);
          const c = POINTS[12]; thetaM.x = thetaM.cible = c.th; rhoM.x = rhoM.cible = c.rho; poserCanne(); E.arrive = false;
        }
        maj();
      },
      surEclate(on) { E.demonte = on; maj(); },
      animer(dt) {
        const c = cible();
        /* d'abord retirer la canne, puis la tourner, puis l'enfoncer : on ne tourne jamais une canne plongée */
        const dTh = Math.abs(thetaM.x - c.th);
        if (dTh > 0.03) { rhoM.cible = 165; if (rhoM.x > 150) thetaM.cible = c.th; }
        else { thetaM.cible = c.th; rhoM.cible = c.rho; }
        const m1 = thetaM.pas(dt), m2 = rhoM.pas(dt);
        const ici = Math.abs(thetaM.x - c.th) < 0.03 && Math.abs(rhoM.x - c.rho) < 1.5;
        if (ici && !E.arrive) { arrivee(); maj(); }
        else if (!ici && E.arrive) { E.arrive = false; maj(); }
        if (m1 || m2) { poserCanne(); }
        let bouge = m1 || m2;
        /* le parcours automatique : une seconde et demie de pause à chaque point */
        if (E.auto && E.arrive) {
          E.attente += dt; bouge = true;
          if (E.attente > 1.5) {
            if (E.k < 12) { E.k++; E.arrive = false; ctx.regler('point', E.k); } else { E.auto = false; }
            maj();
          }
        }
        if (!E.demonte) { flots.forEach(f => f.animer(dt)); bouge = true; }
        return bouge;
      }
    };
  }, { famille: 'sondes', titre: 'L’anémomètre dans la gaine', stations: ['mesure-debit', 'debit-vitesse'] });
})();
