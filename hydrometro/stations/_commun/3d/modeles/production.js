/* HydroMétro 3D — famille « production » : la pompe à chaleur air/eau monobloc, posée dehors.
   Unités : mm. Repère : X en largeur (le côté technique est à droite, +X), Y vers le haut, Z en profondeur :
   +Z = la face avant, avec la grille du ventilateur ; -Z = l'arrière, où se trouve la batterie à ailettes.
   Le dessus du châssis est à y = 100 (les tuyaux d'eau passent dessous, entre deux longerons).

   CE QUE L'ÉLÈVE DOIT VOIR : l'air dehors traverse la batterie (l'évaporateur) et lui cède sa chaleur ;
   le fluide frigorigène l'emporte, le compresseur le comprime (il s'échauffe), le condenseur à plaques le
   cède à l'EAU du chauffage, le détendeur ramène le fluide froid vers la batterie. L'eau entre au condenseur
   (retour, bleue) et en ressort plus chaude (départ, rouge). Quand le besoin baisse, le compresseur
   ralentit : l'écart départ / retour se réduit.

   « Capot retiré » (le bouton « Voir en coupe » du moteur) : le toit, la porte du compartiment technique
   et le côté droit s'enlèvent ; les ailettes, les tubes, la plaque du condenseur et le carter du compresseur
   deviennent transparents ; le fluide, les grains qui circulent et les couleurs se voient dedans.
   Pas de plan de coupe ici : aucun point du circuit ne doit être tranché.

   Couleurs du FLUIDE (un code d'écran, pas la couleur de l'appareil) : violet = basse pression (pâle : mélange
   liquide-vapeur sortant du détendeur ; plus soutenu : vapeur après la batterie), orange = haute pression
   (vif : gaz chaud ; ambre : liquide sous-refroidi). L'EAU garde les couleurs du réseau : retour bleu
   0x2f7fd6, départ rouge 0xd9472b, teinte intermédiaire entre les deux (la teinte suit l'écart réel). */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('pacAirEau', (T, K, ctx) => {
    const M = K.mat;
    const D = Math.PI / 180;
    const racine = new T.Group();
    const clamp = K.clamp;
    const B = 100, HC = 720, TOP = B + HC;                     /* dessus du châssis, hauteur du caisson */
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const P = (x, h, z) => V(x, B + h, z);                      /* h = hauteur au-dessus du châssis */
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });

    /* ---------------------------------------------------------------- matières à soi */
    const std = (c, r, m, extra) => new T.MeshStandardMaterial(Object.assign({ color: c, roughness: r, metalness: m }, extra || {}));
    const dual = [];                                            /* matières qui deviennent transparentes en « capot retiré » */
    const ghost = (mat, opaciteOuvert, couleurOuvert) => { mat.userData.opOuvert = opaciteOuvert; mat.userData.coul0 = mat.color.getHex(); mat.userData.colOuvert = couleurOuvert; dual.push(mat); return mat; };
    const peint = std(0xd5d9dc, 0.5, 0.2);                       /* tôle peinte gris clair (RAL 7035) */
    const peintFonce = std(0xaeb4ba, 0.55, 0.25);
    const socle = std(0x3b4046, 0.6, 0.55);
    const zinc = std(0x8e969e, 0.5, 0.7);
    const grilleMat = std(0x8d949b, 0.45, 0.5);
    const cuivre = K.propre(M.cuivre);
    const laiton = K.propre(M.laiton);
    const noirP = K.propre(M.plastiqueNoir);
    const sombreP = K.propre(M.plastiqueSombre);
    const caoutchouc = K.propre(M.caoutchouc);
    const isolant = std(0x30343a, 0.9, 0);
    const toleMat = K.propre(M.tole);
    const inoxMat = K.propre(M.acier);
    const bobine = K.bobinageMat(6);
    const orangeP = K.propre(M.plastiqueOrange);
    const aileMat = ghost(std(0xcfd9e2, 0.4, 0.75), 0.2);       /* ailettes en aluminium */
    const coqueCu = ghost(K.propre(M.cuivre), 0.22, 0xe9d2c4); coqueCu.side = T.DoubleSide;   /* paroi des tubes */
    const coqueComp = ghost(std(0x23272c, 0.5, 0.4, { side: T.DoubleSide }), 0.2);
    const coqueHX = ghost(K.propre(M.acier), 0.16);
    const lameMat = std(0x34414f, 0.55, 0.2);

    /* ---------------------------------------------------------------- aides de géométrie */
    const surZ = (g, z) => { g.rotateX(Math.PI / 2); g.translate(0, 0, z); return g; };
    const anneauZ = (rE, rI, z0, z1, mat, seg) => new T.Mesh(surZ(K.anneau(rE, rI, z1 - z0, seg || 48), (z0 + z1) / 2), mat);
    const cylZ = (r, z0, z1, mat, seg) => new T.Mesh(surZ(K.cylindre(r, z1 - z0, seg || 32), (z0 + z1) / 2), mat);
    const cylX = (r, x0, x1, mat, seg) => { const g = K.cylindre(r, x1 - x0, seg || 24); g.rotateZ(Math.PI / 2); g.translate((x0 + x1) / 2, 0, 0); return new T.Mesh(g, mat); };
    const plat = (w, h, d, x, y, z, mat) => K.mesh(new T.BoxGeometry(w, h, d), mat, x, y, z);
    const bloc = (w, h, d, x, y, z, mat, r) => K.mesh(K.boite(w, h, d, r === undefined ? 2 : r), mat, x, y, z);
    const grav = (t, h, o) => { const m = K.gravure(t, h, o); m.userData.voile = true; return m; };

    /* ================================================================ LES REPÈRES DE LA MACHINE */
    const FX = -200, FY = B + 370, FZ = 170;                    /* axe du ventilateur, plan des pales */
    const CX = 430, CZ = -40;                                   /* axe du compresseur */
    const PART = 165;                                           /* x de la cloison entre ventilateur et technique */
    const XG = -510, XD = 95, ZC = -185;                        /* la batterie : de XG à XD, tubes au milieu de son épaisseur */

    /* ================================================================ LE CHÂSSIS ET LA CARROSSERIE */
    const chassis = new T.Group();
    chassis.add(plat(1100, 6, 420, 0, B - 3, 0, zinc));                                    /* tôle de fond */
    [-470, 470].forEach(x => chassis.add(plat(60, B - 6, 440, x, (B - 6) / 2, 0, socle)));  /* deux longerons */
    [[530, -190]].forEach(([x, z]) => chassis.add(plat(40, HC - 6, 40, x, B + HC / 2, z, peintFonce)));
    chassis.add(plat(455, HC, 3, 322.5, B + HC / 2, -208.5, peint));                        /* arrière, côté technique */
    chassis.add(plat(39, HC, 3, -530.5, B + HC / 2, -208.5, peint));
    chassis.add(plat(606, 30, 3, -208, B + 705, -208.5, peint));                            /* arrière, au-dessus et au-dessous de la batterie */
    chassis.add(plat(606, 30, 3, -208, B + 15, -208.5, peint));
    chassis.add(plat(3, HC - 140, 420, PART, B + 140 + (HC - 140) / 2, 0, peintFonce));      /* la cloison (sous elle, un passage pour les tubes) */

    const toit = new T.Group();
    toit.add(plat(1106, 4, 446, 0, TOP + 2, 0, peint));
    const coteGauche = new T.Group();                                                      /* le côté gauche part aussi : on voit l'air traverser la machine, de profil */
    coteGauche.add(plat(3, HC, 420, -548.5, B + HC / 2, 0, peint));
    [-190, 190].forEach(z => coteGauche.add(plat(40, HC - 6, 40, -530, B + HC / 2, z, peintFonce)));
    const coteDroit = new T.Group();
    coteDroit.add(plat(3, HC, 420, 548.5, B + HC / 2, 0, peint));
    coteDroit.add(plat(40, HC - 6, 40, 530, B + HC / 2, 190, peintFonce));      /* le poteau d'angle avant droit part avec le côté */

    /* la porte du compartiment technique, avec les repères RETOUR / DÉPART au-dessus de chaque raccord */
    const porte = new T.Group();
    porte.add(plat(385, HC, 3, 357.5, B + HC / 2, 208.5, peint));
    [[285, 'RETOUR'], [385, 'DÉPART']].forEach(([x, t]) => {
      const g = grav(t, 20, { couleur: '#1b3a63' }); g.position.set(x, B + 60, 210.3); porte.add(g);
    });

    /* la face avant côté ventilateur : tôle percée d'un grand trou rond, avec un collier */
    const faceAvant = new T.Group();
    {
      const s = new T.Shape(); s.moveTo(-550, B); s.lineTo(PART, B); s.lineTo(PART, TOP); s.lineTo(-550, TOP); s.closePath();
      const trou = new T.Path(); trou.absarc(FX, FY, 212, 0, Math.PI * 2, true); s.holes.push(trou);
      const g = new T.ExtrudeGeometry(s, { depth: 3, bevelEnabled: false, curveSegments: 72 }); g.translate(0, 0, 207);
      faceAvant.add(new T.Mesh(g, peint));
      const col = anneauZ(228, 210, 210, 214, peintFonce, 72); col.position.set(FX, FY, 0); faceAvant.add(col);
    }

    racine.add(chassis, toit, coteGauche, coteDroit, porte, faceAvant);

    /* ================================================================ LA GRILLE DU VENTILATEUR */
    const grilleG = new T.Group(); grilleG.position.set(FX, FY, 0);
    grilleG.add(anneauZ(229, 215, 213, 219, grilleMat, 72));
    [60, 110, 160, 205].forEach(r => grilleG.add(anneauZ(r + 1.6, r - 1.6, 215, 219, grilleMat, 64)));
    grilleG.add(cylZ(40, 213, 220, grilleMat, 32));
    {
      const g = new T.BoxGeometry(176, 3.2, 3.6); g.translate(126, 0, 0);
      for (let k = 0; k < 12; k++) { const b = new T.Mesh(g, grilleMat); b.rotation.z = k * 30 * D; b.position.z = 217; grilleG.add(b); }
    }
    racine.add(grilleG);

    /* ================================================================ LE VENTILATEUR : hélice, moteur, support */
    const ventilo = new T.Group();
    const fanRot = new T.Group(); fanRot.position.set(FX, FY, FZ);
    fanRot.add(cylZ(38, -18, 20, sombreP, 28));                  /* le moyeu */
    fanRot.add(cylZ(14, 20, 24, noirP, 20));
    {
      const s = new T.Shape();
      s.moveTo(30, -12);
      s.bezierCurveTo(80, -26, 150, -44, 203, -32);              /* bord d'attaque */
      s.bezierCurveTo(212, -12, 212, 20, 200, 36);
      s.bezierCurveTo(150, 40, 80, 24, 30, 16);                  /* bord de fuite */
      s.closePath();
      const g = new T.ExtrudeGeometry(s, { depth: 2.8, bevelEnabled: false, curveSegments: 10 });
      g.translate(0, 0, -1.4); g.rotateX(-26 * D);                /* calage des pales */
      for (let i = 0; i < 7; i++) { const b = new T.Mesh(g, lameMat); b.rotation.z = i * 2 * Math.PI / 7; fanRot.add(b); }
    }
    ventilo.add(fanRot);
    const moteurV = cylZ(70, 62, 150, std(0x2d3238, 0.5, 0.5), 40); moteurV.position.set(FX, FY, 0); ventilo.add(moteurV);
    ventilo.add(plat(40, FY - B, 8, FX, B + (FY - B) / 2, 58, socle));                       /* le support du moteur */
    ventilo.add(plat(130, 6, 90, FX, B + 3, 70, socle));
    racine.add(ventilo);

    /* ================================================================ LA BATTERIE À AILETTES (l'évaporateur) */
    const coilG = new T.Group();
    {
      const pas = 3, n = Math.floor((XD - XG) / pas) + 1;
      const fins = new T.InstancedMesh(new T.BoxGeometry(0.6, 660, 50), aileMat, n);
      const m4 = new T.Matrix4();
      for (let i = 0; i < n; i++) { m4.makeTranslation(XG + i * pas, B + 360, ZC); fins.setMatrixAt(i, m4); }
      fins.instanceMatrix.needsUpdate = true; fins.userData.sansOmbre = true; fins.castShadow = false; fins.frustumCulled = false;
      coilG.add(fins);
      [XG - 2.5, XD + 2.5].forEach(x => coilG.add(plat(3, 660, 50, x, B + 360, ZC, std(0xa9b0b6, 0.5, 0.8))));   /* les flasques d'extrémité */
    }
    const coilShellG = new T.Group();
    const coilVoile = plat(XD - XG + 10, 680, 56, (XG + XD) / 2, B + 360, ZC, new T.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0, depthWrite: false, toneMapped: false }));
    coilVoile.userData.voile = true; coilVoile.userData.sansOmbre = true; coilVoile.castShadow = false;   /* un seul voile pour toute la batterie : 200 ailettes allumées s'empileraient */
    racine.add(coilG, coilShellG, coilVoile);

    /* ================================================================ LE COMPRESSEUR (scroll, axe vertical) */
    const compG = new T.Group(); compG.position.set(CX, B, CZ);
    const compCoque = new T.Group(); compG.add(compCoque);
    {
      const prof = [[0, 10], [48, 10], [78, 20], [88, 46], [88, 290], [78, 316], [48, 328], [0, 330]].map(p => new T.Vector2(p[0], p[1]));
      const coque = new T.Mesh(new T.LatheGeometry(prof, 44), coqueComp); coque.userData.voile = true; coque.userData.sansOmbre = true; coque.castShadow = false;
      compCoque.add(coque);
      [90, 210, 330].forEach(a => compCoque.add(K.mesh(K.cylindre(16, 10, 20), caoutchouc, Math.cos(a * D) * 60, 5, Math.sin(a * D) * 60)));   /* plots antivibratiles */
      compCoque.add(bloc(32, 46, 52, 98, 250, 0, noirP, 3));       /* le boîtier de raccordement électrique */
      compCoque.add(K.mesh(K.cylindre(12, 6, 20), laiton, 0, 333, 0));                       /* le raccord de refoulement, en haut */
    }
    const interieur = new T.Group(); compG.add(interieur);       /* ce qu'on voit à travers le carter : moteur et spirales */
    {
      interieur.add(K.mesh(K.anneau(74, 42, 75, 44), toleMat, 0, 177, 0));                /* le stator */
      [138, 217].forEach(h => { const t = new T.Mesh(K.tore(58, 9, 10, 36), bobine); t.rotation.x = Math.PI / 2; t.position.y = h; interieur.add(t); });
      [90, 210, 330].forEach(a => { const r = plat(14, 40, 10, Math.cos(a * D) * 80, 177, Math.sin(a * D) * 80, socle); r.rotation.y = -a * D; interieur.add(r); });   /* il est tenu par trois pattes */
      [30, 150, 270].forEach(a => { const r = plat(24, 10, 10, Math.cos(a * D) * 76, 274, Math.sin(a * D) * 76, socle); r.rotation.y = -a * D; interieur.add(r); });
      const plaqueFixe = K.mesh(K.anneau(66, 9, 8, 44), std(0xc2c7cc, 0.4, 0.5, { transparent: true, opacity: 0.28, depthWrite: false }), 0, 274, 0);   /* la plaque du scroll fixe, percée au centre ; transparente pour voir les spirales dessous */
      plaqueFixe.userData.voile = true; plaqueFixe.userData.sansOmbre = true; plaqueFixe.castShadow = false; interieur.add(plaqueFixe);
    }
    const rotorG = new T.Group(); interieur.add(rotorG);
    rotorG.add(K.mesh(K.cylindre(40, 72, 36), toleMat, 0, 178, 0));
    rotorG.add(K.mesh(K.cylindre(9, 172, 20), inoxMat, 0, 148, 0));
    rotorG.add(plat(7, 6, 4, 33, 215, 0, orangeP));              /* un repère, pour voir que ça tourne */
    const murSpirale = dep => {
      const th0 = 0.4 * Math.PI, th1 = 5.4 * Math.PI, n = 70, ext = [], int = [];
      for (let i = 0; i <= n; i++) {
        const th = th0 + (th1 - th0) * i / n, r = 8 + 20 * th / (2 * Math.PI), a = th + dep;
        ext.push(new T.Vector2((r + 1.9) * Math.cos(a), (r + 1.9) * Math.sin(a)));
        int.push(new T.Vector2((r - 1.9) * Math.cos(a), (r - 1.9) * Math.sin(a)));
      }
      const g = new T.ExtrudeGeometry(new T.Shape(ext.concat(int.reverse())), { depth: 34, bevelEnabled: false, curveSegments: 4 });
      g.rotateX(-Math.PI / 2); g.translate(0, 236, 0);
      return g;
    };
    const scrollFixe = new T.Mesh(murSpirale(0), std(0xc2c7cc, 0.4, 0.8));
    interieur.add(scrollFixe);
    const orbite = new T.Group(); interieur.add(orbite);
    orbite.add(new T.Mesh(murSpirale(Math.PI), std(0xd9b061, 0.35, 0.8)));
    orbite.add(K.mesh(K.cylindre(66, 6, 44), std(0xd9b061, 0.35, 0.8), 0, 233, 0));
    racine.add(compG);

    /* ================================================================ LE CONDENSEUR À PLAQUES */
    const hxG = new T.Group();
    const HXC = V(250, B + 200, 115);
    hxG.add(K.mesh(K.boite(120, 260, 60, 4), coqueHX, HXC.x, HXC.y, HXC.z));
    hxG.children[0].userData.voile = true; hxG.children[0].userData.sansOmbre = true; hxG.children[0].castShadow = false;
    [205, 295].forEach(x => chassis.add(plat(18, 70, 30, x, B + 35, HXC.z, socle)));            /* deux pieds sous la plaque */
    const hxAretes = new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(120, 260, 60)), new T.LineBasicMaterial({ color: 0x1b3a63, transparent: true, opacity: 0.55 }));
    hxAretes.position.copy(HXC); hxAretes.visible = false; hxAretes.userData.decor = true; hxAretes.raycast = () => {};
    hxG.add(hxAretes);
    [[215, 300, 'g'], [215, 100, 'g'], [285, 100, 'e'], [285, 300, 'e']].forEach(([x, h, t]) => {   /* les quatre piquages sur la face avant */
      const r = t === 'e' ? 17 : 12;
      const c = cylZ(r, 145, 152, inoxMat, 24); c.position.set(x, B + h, 0); hxG.add(c);
    });
    racine.add(hxG);

    /* ================================================================ LE DÉTENDEUR (électronique) */
    const eevG = new T.Group(); eevG.position.set(175, B + 60, 175);
    eevG.add(cylX(11, -25, 25, laiton, 24));
    eevG.add(K.mesh(K.cylindre(15, 44, 24), noirP, 0, 33, 0));
    eevG.add(K.mesh(K.cylindre(5, 10, 16), laiton, 0, 58, 0));
    racine.add(eevG);

    /* ================================================================ LES TUYAUX : trajets, parois, fluide */
    const arrondir = (pts, rc) => {
      const c = new T.CurvePath(); let prev = pts[0];
      for (let i = 1; i < pts.length - 1; i++) {
        const a = pts[i - 1], b = pts[i], d = pts[i + 1], l1 = b.distanceTo(a), l2 = b.distanceTo(d);
        const r = Math.min(rc, l1 / 2.001, l2 / 2.001);
        const p1 = b.clone().lerp(a, r / l1), p2 = b.clone().lerp(d, r / l2);
        if (prev.distanceTo(p1) > 1e-4) c.add(new T.LineCurve3(prev.clone(), p1));
        c.add(new T.QuadraticBezierCurve3(p1, b.clone(), p2)); prev = p2;
      }
      c.add(new T.LineCurve3(prev.clone(), pts[pts.length - 1].clone()));
      return c;
    };
    const tuyau = (pts, rc) => arrondir(pts.map(p => (p.isVector3 ? p : V(p[0], p[1], p[2]))), rc || 20);

    const COL = {
      vio: new T.Color(0xa586e0), vioPale: new T.Color(0xd6c6f4),
      orange: new T.Color(0xf08a1a), ambre: new T.Color(0xf6c066),
      bleu: new T.Color(0x2f7fd6), rouge: new T.Color(0xd9472b), blanc: new T.Color(0xffffff), neutre: new T.Color(0xc9c4d4)
    };

    /* le circuit frigorifique : UN seul trajet fermé, du carter du compresseur au carter (aspiration → compression →
       condenseur → détendeur → batterie → aspiration). Chaque tronçon : [nom, courbe, couleur début, couleur fin, rayon de paroi]. */
    const spiralePts = [];
    for (let i = 0; i <= 80; i++) {
      const th = 5 * Math.PI - 4.8 * Math.PI * i / 80, r = 13 + 20 * th / (2 * Math.PI);
      spiralePts.push(V(CX + r * Math.cos(th), B + 253, CZ - r * Math.sin(th)));
    }
    const serp = [P(137, 60, ZC)];
    {
      const R = 27, H0 = 60, PH = 54;
      for (let i = 0; i < 12; i++) {
        const h = H0 + PH * i, gauche = i % 2 === 0;
        serp.push(P(gauche ? XG : XD, h, ZC));
        if (i < 11) {
          for (let k = 1; k <= 11; k++) {
            const a = -Math.PI / 2 + Math.PI * k / 12;
            serp.push(P((gauche ? XG : XD) + (gauche ? -1 : 1) * R * Math.cos(a), h + R + R * Math.sin(a), ZC));
          }
        }
      }
    }
    const polyligne = pts => { const c = new T.CurvePath(); for (let i = 1; i < pts.length; i++) c.add(new T.LineCurve3(pts[i - 1].clone(), pts[i].clone())); return c; };
    const FRIGO = [
      ['cIn', tuyau([P(342, 118, CZ), P(350, 118, CZ), P(350, 253, CZ), spiralePts[0]], 8), COL.vio, COL.vio, 0],
      ['cSpi', polyligne(spiralePts), COL.vio, COL.orange, 0],
      ['cSortie', tuyau([spiralePts[80], P(CX, 253, CZ), P(CX, 330, CZ)], 6), COL.orange, COL.orange, 0],
      ['refoulement', tuyau([P(CX, 330, CZ), P(CX, 365, CZ), P(215, 365, CZ), P(215, 365, 175), P(215, 300, 175), P(215, 300, 145)], 22), COL.orange, COL.orange, 9],
      ['hxR', tuyau([P(215, 300, 145), P(215, 300, 115), P(215, 100, 115), P(215, 100, 145)], 8), COL.orange, COL.ambre, 0],
      ['liqHP', tuyau([P(215, 100, 145), P(215, 100, 175), P(215, 60, 175), P(200, 60, 175)], 14), COL.ambre, COL.ambre, 6.5],
      ['eev', tuyau([P(200, 60, 175), P(150, 60, 175)]), COL.ambre, COL.vioPale, 0],
      ['liqBP', tuyau([P(150, 60, 175), P(137, 60, 175), P(137, 60, ZC)], 14), COL.vioPale, COL.vioPale, 6.5],
      ['coil', polyligne(serp), COL.vioPale, COL.vio, 7],
      ['sortieBP', tuyau([P(XD, 654, ZC), P(140, 654, ZC), P(140, 654, -150), P(140, 118, -150), P(260, 118, -150), P(260, 118, CZ), P(342, 118, CZ)], 18), COL.vio, COL.vio, 12]
    ];
    /* l'eau : un trajet ouvert, de l'extérieur (retour) à l'extérieur (départ). f = part de l'échauffement : 0 = retour, 1 = départ */
    const EAU = [
      ['retExt', tuyau([P(285, -60, 360), P(285, -60, 170), P(285, 0, 170)], 30), 0, 0, 14],
      ['retInt', tuyau([P(285, 0, 170), P(285, 100, 170), P(285, 100, 145)], 25), 0, 0, 14],
      ['hxW', tuyau([P(285, 100, 145), P(285, 100, 131), P(285, 300, 131), P(285, 300, 145)], 8), 0, 1, 0],
      ['depInt', tuyau([P(285, 300, 145), P(285, 300, 180), P(385, 300, 180), P(385, 0, 180)], 25), 1, 1, 14],
      ['depExt', tuyau([P(385, 0, 180), P(385, -60, 180), P(385, -60, 360)], 30), 1, 1, 14]
    ];

    /* l'état du fluide et de l'eau (couleurs vivantes) */
    const E = { marche: false, besoin: 50, phase: 'tout', coupe: false, demonte: false };
    let angFan = 0, angOrb = 0, vComp = 0, vFan = 0, dEau = 0, kEau = 0, kFrigo = 0, kEauPose = -1, kFrigoPose = -1;
    const vitesseComp = () => (E.marche ? Math.max(0.3, E.besoin / 100) : 0);
    const dTcible = () => (E.marche ? 10 * vitesseComp() : 0);

    const circuit = (sections) => {
      let L = 0; const bornes = [];
      const glob = new T.CurvePath();
      sections.forEach(s => { s[1].curves.forEach(c => glob.add(c)); });
      sections.forEach(s => { const l = s[1].getLength(); bornes.push({ nom: s[0], u0: L, l, s }); L += l; });
      bornes.forEach(b => { b.u0 /= L; b.u1 = b.u0 + b.l / L; });
      glob.arcLengthDivisions = 2000;
      return { glob, L, bornes, de: u => { for (let i = 0; i < bornes.length; i++) if (u <= bornes[i].u1 + 1e-9) return i; return bornes.length - 1; } };
    };
    const cF = circuit(FRIGO), cE = circuit(EAU);
    const tmp = new T.Color();
    const couleurFrigo = (u, out) => {
      const i = cF.de(u), b = cF.bornes[i], t = clamp((u - b.u0) / (b.u1 - b.u0), 0, 1);
      out.copy(b.s[2]).lerp(b.s[3], t);
      return out.lerp(COL.neutre, 1 - kFrigo);
    };
    const couleurEau = (u, out) => {
      const i = cE.de(u), b = cE.bornes[i], t = clamp((u - b.u0) / (b.u1 - b.u0), 0, 1);
      return chauffe(b.s[2] + (b.s[3] - b.s[2]) * t, out);
    };
    const chauffe = (f, out) => out.copy(COL.bleu).lerp(COL.rouge, clamp(f * kEau, 0, 1));

    const tube = (courbe, r, radial, pasMm, mat) => {
      const segs = Math.max(8, Math.ceil(courbe.getLength() / pasMm));
      const g = new T.TubeGeometry(courbe, segs, r, radial, false);
      return { mesh: new T.Mesh(g, mat), geo: g, segs, radial };
    };
    const coloriser = (t, fcol) => {
      const n = t.geo.attributes.position.count;
      let col = t.geo.attributes.color; if (!col) { col = new T.BufferAttribute(new Float32Array(n * 3), 3); t.geo.setAttribute('color', col); }
      for (let i = 0; i <= t.segs; i++) { fcol(i / t.segs, tmp); for (let j = 0; j <= t.radial; j++) col.setXYZ(i * (t.radial + 1) + j, tmp.r, tmp.g, tmp.b); }
      col.needsUpdate = true;
    };

    /* les parois des tubes (en cuivre ; transparentes en « capot retiré »), rangées par pièce */
    const frigoTubes = new T.Group(), eauTubes = new T.Group();
    FRIGO.forEach(s => {
      if (!s[4]) return;
      const t = tube(s[1], s[4], 8, s[0] === 'coil' ? 24 : 14, coqueCu); t.mesh.userData.voile = true; t.mesh.userData.sansOmbre = true; t.mesh.castShadow = false;
      (s[0] === 'coil' ? coilShellG : frigoTubes).add(t.mesh);
    });
    EAU.forEach(s => {
      if (!s[4]) return;
      const t = tube(s[1], s[4], 10, 18, coqueCu); t.mesh.userData.voile = true; t.mesh.userData.sansOmbre = true; t.mesh.castShadow = false;
      eauTubes.add(t.mesh);
    });
    /* les tubes ne sortent pas du châssis sans passe-fil */
    [[285, 170], [385, 180]].forEach(([x, z]) => eauTubes.add(K.mesh(K.anneau(27, 15, 6, 28), caoutchouc, x, B + 3, z)));

    /* le fluide à l'intérieur : une âme colorée dans chaque tube, et des grains qui avancent */
    const fluides = new T.Group();
    const noyauMat = std(0xffffff, 0.45, 0.1, { vertexColors: true });
    const noyauF = tube(cF.glob, 3.2, 5, 22, noyauMat), noyauE = tube(cE.glob, 4.5, 6, 18, noyauMat);
    [noyauF, noyauE].forEach(t => { t.mesh.userData.sansOmbre = true; t.mesh.castShadow = false; fluides.add(t.mesh); });

    const bille = new T.IcosahedronGeometry(1, 1), bille0 = new T.IcosahedronGeometry(1, 0);
    const perles = (courbe, o) => {
      const L = courbe.getLength(), N = Math.max(3, Math.round(L / o.pas));
      if (courbe.arcLengthDivisions < 1000) courbe.arcLengthDivisions = 1000;
      const pts = courbe.getSpacedPoints(Math.max(40, Math.round(L / 6)));
      const im = new T.InstancedMesh(o.simple ? bille0 : bille, new T.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }), N);
      im.userData.sansOmbre = true; im.castShadow = false; im.frustumCulled = false;
      const m4 = new T.Matrix4(), q = new T.Quaternion(), sc = new T.Vector3(), p = new T.Vector3(), col = new T.Color();
      const et = { s: 0, on: true };
      const poser = () => {
        for (let i = 0; i < N; i++) {
          let u = (i / N + et.s / L) % 1; if (u < 0) u += 1;
          const f = u * (pts.length - 1), a = Math.floor(f), b = Math.min(a + 1, pts.length - 1);
          p.lerpVectors(pts[a], pts[b], f - a);
          let k = et.on ? o.echelle(u) : 0;
          if (o.ouvert) { const fondu = x => { const t = clamp(x / 0.06, 0, 1); return t * t * (3 - 2 * t); }; k *= fondu(u) * fondu(1 - u); }
          sc.setScalar(o.rayon * k); m4.compose(p, q, sc); im.setMatrixAt(i, m4);
          o.couleur(u, col); col.lerp(COL.blanc, o.clair === undefined ? 0.4 : o.clair); im.setColorAt(i, col);
        }
        im.instanceMatrix.needsUpdate = true; im.instanceColor.needsUpdate = true;
      };
      poser();
      return { objet: im, avancer(ds) { et.s += ds; poser(); }, regler(on) { et.on = on; poser(); }, poser };
    };

    /* quels tronçons le grain montre-t-il, selon l'étape */
    const PH_FRIGO = {
      tout: null,
      evap: ['liqBP', 'coil', 'sortieBP'],
      comp: ['sortieBP', 'cIn', 'cSpi', 'cSortie', 'refoulement'],
      cond: ['refoulement', 'hxR', 'liqHP', 'eev']
    };
    const frigoVisible = nom => { const l = PH_FRIGO[E.phase]; return !l || l.includes(nom) ? 1 : 0; };
    const grainsFrigo = perles(cF.glob, { pas: 95, rayon: 6, simple: true, couleur: couleurFrigo, echelle: u => frigoVisible(cF.bornes[cF.de(u)].nom) });
    const grainsEau = perles(cE.glob, { pas: 70, rayon: 8, couleur: couleurEau, echelle: () => 1, ouvert: true, clair: 0.3 });
    const eauVisible = () => E.phase === 'tout' || E.phase === 'cond';

    /* dans la plaque : trois couches (eau – fluide – eau), un ruban coloré par couche, et des grains dans le sens de chaque fluide */
    const rubans = [];
    const ruban = (x0, x1, h0, h1, z, fcol) => {
      const g = new T.BoxGeometry(x1 - x0, h1 - h0, 9, 1, 12, 1); g.translate((x0 + x1) / 2, B + (h0 + h1) / 2, z);
      const m = new T.Mesh(g, new T.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.5, depthWrite: false, side: T.DoubleSide, toneMapped: false }));
      m.userData.sansOmbre = true; m.castShadow = false; fluides.add(m);
      const r = { g, h0, h1, fcol, maj() {
        const pos = g.attributes.position; let col = g.attributes.color;
        if (!col) { col = new T.BufferAttribute(new Float32Array(pos.count * 3), 3); g.setAttribute('color', col); }
        for (let i = 0; i < pos.count; i++) { r.fcol(clamp((pos.getY(i) - B - h0) / (h1 - h0), 0, 1), tmp); col.setXYZ(i, tmp.r, tmp.g, tmp.b); }
        col.needsUpdate = true;
      } };
      rubans.push(r); return r;
    };
    const fcR = (f, out) => out.copy(COL.ambre).lerp(COL.orange, f).lerp(COL.neutre, 1 - kFrigo);
    const fcW = (f, out) => chauffe(f, out);
    ruban(200, 262, 80, 320, 115, fcR); ruban(238, 300, 80, 320, 131, fcW); ruban(238, 300, 80, 320, 99, fcW);
    const lanes = [];
    const lane = (x, z, bas, fcol) => {
      const c = new T.CurvePath(); c.add(new T.LineCurve3(P(x, bas ? 100 : 300, z), P(x, bas ? 300 : 100, z)));
      const p = perles(c, { pas: 52, rayon: 4, couleur: (u, out) => fcol(bas ? u : 1 - u, out), echelle: () => 1, ouvert: true, clair: 0.35, simple: true });
      lanes.push(p); fluides.add(p.objet); return p;
    };
    [215, 245].forEach(x => lane(x, 115, false, fcR));              /* le fluide descend (de h 300 à h 100) */
    [255].forEach(x => lane(x, 131, true, fcW));                /* l'eau monte */
    [255, 285].forEach(x => lane(x, 99, true, fcW));
    fluides.add(grainsFrigo.objet, grainsEau.objet);

    /* l'air : des grains qui entrent par l'arrière, traversent la batterie (ils se refroidissent), passent le ventilateur */
    const lignesAir = [[0, 180], [180, 180], [45, 130], [135, 130], [225, 130], [315, 130]];
    const grainsAir = lignesAir.map(([a, r]) => {
      const x = FX + r * Math.cos(a * D), y = FY + r * Math.sin(a * D);
      const c = new T.CurvePath(); c.add(new T.LineCurve3(V(x, y, -440), V(x, y, 330)));
      const chaud = new T.Color(0xf2a05a), froid = new T.Color(0x4a9be0);
      return perles(c, { pas: 60, rayon: 8, simple: true, ouvert: true, clair: 0.05, echelle: () => 1,
        couleur: (u, out) => { const z = -440 + 770 * u, t = clamp((z + 210) / 50, 0, 1); return out.copy(chaud).lerp(froid, t * t * (3 - 2 * t)); } });
    });
    grainsAir.forEach(g => fluides.add(g.objet));
    racine.add(fluides);

    /* les raccords en laiton et l'isolant, sous l'appareil */
    const raccordsG = new T.Group();
    [285, 385].forEach(x => {
      const hex = new T.Mesh(new T.CylinderGeometry(25, 25, 22, 6), laiton); hex.rotation.x = Math.PI / 2; hex.position.set(x, B - 60, 332); raccordsG.add(hex);
      const iso = new T.Mesh(surZ(K.anneau(23, 14.5, 80, 28), 262), isolant); iso.position.set(x, B - 60, 0); raccordsG.add(iso);
    });
    racine.add(eauTubes, frigoTubes, raccordsG);

    /* ================================================================ L'ÉTAT : couleurs, visibilités, textes */
    const majCouleurs = () => {
      if (Math.abs(kEau - kEauPose) > 0.004) { kEauPose = kEau; coloriser(noyauE, couleurEau); rubans.forEach(r => r.fcol === fcW && r.maj()); }
      if (Math.abs(kFrigo - kFrigoPose) > 0.01) { kFrigoPose = kFrigo; coloriser(noyauF, couleurFrigo); rubans.forEach(r => r.fcol === fcR && r.maj()); }
    };
    const majVisibilites = () => {
      const on = E.marche && !E.demonte;
      grainsFrigo.regler(on); grainsEau.regler(on && eauVisible());
      grainsAir.forEach(g => g.regler(on && (E.phase === 'tout' || E.phase === 'evap')));
      lanes.forEach(l => l.regler(on && (E.phase === 'tout' || E.phase === 'cond')));
    };
    const appliquerVue = () => {
      const ouvert = E.coupe && !E.demonte;
      toit.visible = !ouvert; porte.visible = !ouvert; coteDroit.visible = !ouvert; coteGauche.visible = !ouvert;
      dual.forEach(m => { m.transparent = ouvert; m.opacity = ouvert ? m.userData.opOuvert : 1; m.depthWrite = !ouvert; if (m.userData.colOuvert !== undefined) m.color.setHex(ouvert ? m.userData.colOuvert : m.userData.coul0); m.needsUpdate = true; });
      fluides.visible = !E.demonte;
      hxAretes.visible = ouvert;
    };
    const majTexte = () => {
      const s = vitesseComp(), dT = dTcible();
      ctx.mesures([
        { libelle: 'La température du départ', valeur: nb(35 + dT, 1) + ' °C' },
        { libelle: 'La température du retour', valeur: nb(35, 1) + ' °C' },
        { libelle: 'L’écart départ – retour', valeur: nb(dT, 1) + ' K' }
      ]);
      if (!E.marche) { ctx.dire('<strong>À l’arrêt.</strong> Le ventilateur et le compresseur sont arrêtés. Le départ et le retour sont à la même température.'); return; }
      ctx.dire('<strong>En marche.</strong> Le compresseur tourne à ' + nb(Math.round(7200 * s / 10) * 10, 0) + ' tr/min. L’eau entre à 35,0 °C et repart à ' + nb(35 + dT, 1) + ' °C : elle a gagné ' + nb(dT, 1) + ' K.'
        + (E.besoin < 30 ? ' <em>Le besoin est sous le minimum du compresseur : il s’arrêterait puis redémarrerait (cycles courts).</em>' : '')
        + ' <em>À l’écran, les mouvements sont ralentis.</em>');
    };
    const basculerCoupe = on => { E.coupe = on; appliquerVue(); majVisibilites(); };

    appliquerVue(); majVisibilites(); majTexte(); majCouleurs();

    /* ================================================================ LES PIÈCES */
    const pieces = [
      { id: 'carrosserie', nom: 'La carrosserie', objets: [chassis, toit, porte, coteGauche, coteDroit, faceAvant], desc: 'La tôle peinte protège l’appareil de la pluie. Le toit, la porte du compartiment technique et les côtés se retirent pour l’entretien.' },
      { id: 'ventilateur', nom: 'Le ventilateur et sa grille', objets: [ventilo, grilleG], desc: 'Il aspire l’air à travers la batterie et le souffle devant l’appareil. La grille protège les doigts. Sa vitesse suit celle du compresseur.' },
      { id: 'evaporateur', nom: 'La batterie à ailettes (évaporateur)', objets: [coilVoile, coilShellG], desc: 'Des tubes en cuivre dans des ailettes en aluminium. L’air passe entre les ailettes. Le fluide, plus froid que l’air, lui prend sa chaleur et s’évapore dans les tubes.' },
      { id: 'compresseur', nom: 'Le compresseur', objets: [compCoque], desc: 'Il aspire la vapeur froide et la refoule chaude, à haute pression. Un variateur règle sa vitesse : c’est lui qui suit le besoin de chaleur.' },
      { id: 'spirales', nom: 'Les spirales et le moteur du compresseur', objets: [interieur], desc: 'Un compresseur scroll : deux spirales, l’une fixe, l’autre qui tourne en cercle sans pivoter. Entre elles, le gaz est poussé vers le centre : son volume diminue, sa pression monte. Le moteur est sous les spirales.' },
      { id: 'condenseur', nom: 'Le condenseur à plaques', objets: [hxG], desc: 'Un paquet de plaques en inox brasées. Le fluide chaud passe d’un côté, l’eau du chauffage de l’autre, en sens contraire. Ils ne se mélangent pas : la chaleur passe à travers la plaque.' },
      { id: 'detendeur', nom: 'Le détendeur', objets: [eevG], desc: 'Il fait chuter la pression du liquide : le fluide devient très froid. Ici un détendeur électronique, commandé par un petit moteur.' },
      { id: 'circuitFrigo', nom: 'Le circuit frigorifique', objets: [frigoTubes], desc: 'Les tubes en cuivre du fluide : le refoulement (gaz chaud), le liquide, l’aspiration. Les couleurs n’existent qu’à l’écran : violet = basse pression, orange = haute pression.' },
      { id: 'circuitEau', nom: 'Le circuit d’eau', objets: [eauTubes], desc: 'Les tubes qui amènent l’eau du chauffage au condenseur et la ramènent. À l’écran : bleu = eau plus froide (retour), rouge = eau plus chaude (départ). Sur l’appareil réel, les tubes ne sont pas colorés.' },
      { id: 'raccords', nom: 'Les raccords départ et retour', objets: [raccordsG], desc: 'Deux raccords sous l’appareil : le retour entre, le départ sort. Les repères RETOUR et DÉPART sont sur la porte. Les écrous en laiton permettent de déposer l’appareil.' }
    ];

    const commandes = [
      { id: 'marche', type: 'choix', options: [['arret', 'À l’arrêt'], ['marche', 'En marche']], valeur: 'arret' },
      { id: 'besoin', type: 'curseur', libelle: 'Besoin relatif', min: 20, max: 100, pas: 5, unite: '%', valeur: 50 }
    ];

    const etapes = [
      { titre: 'La pompe à chaleur, telle qu’on la pose', piece: 'raccords', voirDedans: false, eclate: false, actions: [['marche', 'arret'], ['besoin', 50], ['phase', 'tout']],
        vue: { azimut: 38, elevation: 22, zoom: 0.95 },
        texte: 'Un caisson posé dehors. Devant, la grille du ventilateur. Derrière, la batterie à ailettes. Dessous, deux raccords d’eau : le retour entre, le départ sort.' },
      { titre: 'Capot retiré : deux circuits qui ne se mélangent pas', piece: 'circuitFrigo', voirDedans: true, eclate: false, actions: [['marche', 'marche'], ['besoin', 50], ['phase', 'tout']],
        vue: { azimut: 24, elevation: 55, zoom: 1.15 },
        texte: 'Le fluide frigorigène tourne en circuit fermé : violet côté basse pression, orange côté haute pression. L’eau du chauffage a son propre circuit. Elles ne se touchent que dans le condenseur, à travers les plaques. Ces couleurs n’existent qu’à l’écran.' },
      { titre: 'L’air cède sa chaleur à l’évaporateur', piece: 'evaporateur', voirDedans: true, eclate: false, actions: [['marche', 'marche'], ['besoin', 50], ['phase', 'evap']],
        vue: { azimut: -84, elevation: 24, zoom: 1.5, cible: [-200, B + 330, -50] },
        texte: 'Le ventilateur fait passer l’air dehors, à 7 °C, à travers la batterie. Le fluide, à environ − 3 °C, est plus froid que l’air : il lui prend sa chaleur et s’évapore. L’air ressort plus froid.' },
      { titre: 'Le compresseur monte la pression, et la température avec', piece: 'compresseur', voirDedans: true, eclate: false, ralenti: true, actions: [['marche', 'marche'], ['besoin', 50], ['phase', 'comp']],
        vue: { azimut: -12, elevation: 58, zoom: 2.3, cible: [CX, B + 200, CZ] },
        texte: 'Le compresseur aspire la vapeur froide et la comprime entre deux spirales. La pression monte, la température aussi : vers 75 °C à la sortie. La chaleur prise à l’air est maintenant assez chaude pour chauffer l’eau.' },
      { titre: 'Le condenseur cède la chaleur à l’eau', piece: 'condenseur', voirDedans: true, eclate: false, actions: [['marche', 'marche'], ['besoin', 50], ['phase', 'cond']],
        vue: { azimut: 14, elevation: 24, zoom: 2.3, cible: [255, B + 190, 120] },
        texte: 'Le fluide chaud descend dans les plaques et se condense. L’eau monte en sens contraire. Elle entre à 35 °C et ressort plus chaude : c’est le départ. Le fluide, refroidi, repart liquide vers le détendeur.' },
      { titre: 'Le besoin baisse : le compresseur ralentit', piece: 'compresseur', voirDedans: true, eclate: false, actions: [['marche', 'marche'], ['phase', 'tout'], ['besoin', 30]],
        vue: { azimut: 6, elevation: 32, zoom: 1.8, cible: [330, B + 190, 60] },
        texte: 'Il faut moins de chaleur : le compresseur tourne moins vite. L’eau s’échauffe moins dans le condenseur, et l’écart entre le départ et le retour se réduit.' },
      { titre: 'Démonté : le capot, le ventilateur, le compresseur', voirDedans: false, eclate: true, actions: [['marche', 'arret'], ['besoin', 50], ['phase', 'tout']],
        texte: 'On retire le toit et les panneaux, puis la face avant avec sa grille, puis le ventilateur. Le compresseur se soulève. Les tubes restent en place.' }
    ];

    const eclate = [
      { objets: [toit], vers: [0, 360, 0], debut: 0, fin: 0.4 },
      { objets: [coteDroit], vers: [320, 0, 0], debut: 0.05, fin: 0.45 },
      { objets: [coteGauche], vers: [-300, 0, 0], debut: 0.05, fin: 0.45 },
      { objets: [porte], vers: [380, 0, 300], debut: 0.05, fin: 0.45 },
      { objets: [faceAvant, grilleG], vers: [-60, 0, 330], debut: 0.25, fin: 0.7 },
      { objets: [ventilo], vers: [-60, 0, 130], debut: 0.4, fin: 0.8 },
      { objets: [compG], vers: [0, 340, 0], debut: 0.55, fin: 1 }
    ];

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 38, elevation: 24, zoom: 0.68, cible: [20, B + 320, 90] },
      vue: ctx.mode === 'decouvrir' ? { azimut: 36, elevation: 22, cadre: [chassis, faceAvant], marge: 1.0 }
                                    : { azimut: 32, elevation: 28, cadre: [chassis, faceAvant], marge: 1.0 },
      phrase: undefined,
      libellesFantome: ['◐ Capot retiré', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'phase') { E.phase = v; majVisibilites(); return; }
        if (id === 'marche') { E.marche = v === 'marche'; ctx.regler('marche', v); }
        if (id === 'besoin') { E.besoin = +v; ctx.regler('besoin', +v); }
        majVisibilites(); majTexte();
      },
      surEclate(on) { E.demonte = on; appliquerVue(); majVisibilites(); },
      animer(dt) {
        const s = vitesseComp();
        vComp = K.vers(vComp, s, 2.0, dt);
        vFan = K.vers(vFan, E.marche ? 0.55 + 0.45 * s : 0, 1.8, dt);
        dEau = K.vers(dEau, dTcible(), 1.2, dt);
        kEau = clamp(dEau / 8, 0, 1); kFrigo = clamp(vComp * 4, 0, 1);
        angFan += vFan * 6.0 * dt; angOrb += vComp * 8.0 * dt;
        fanRot.rotation.z = angFan;
        rotorG.rotation.y = angOrb;
        orbite.position.set(5.5 * Math.cos(angOrb), 0, 5.5 * Math.sin(angOrb));
        majCouleurs();
        const on = E.marche && !E.demonte;
        if (on && vComp > 0.01) {
          const vf = 40 + 150 * vComp;
          grainsFrigo.avancer(vf * dt); grainsEau.avancer(110 * dt);
          lanes.forEach((l, i) => l.avancer((i < 2 ? vf * 0.6 : 110 * 0.6) * dt));
        }
        if (on && vFan > 0.01) grainsAir.forEach(g => g.avancer(170 * vFan * dt));
        return vFan > 0.01 || vComp > 0.01 || Math.abs(dEau - dTcible()) > 0.01 || Math.abs(vComp - s) > 0.001;
      }
    };
  }, { famille: 'production', titre: 'La pompe à chaleur air/eau', stations: ['production'] });
})();
