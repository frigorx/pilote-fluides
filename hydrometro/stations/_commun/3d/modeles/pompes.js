/* HydroMétro 3D — famille « pompes » : le circulateur à rotor noyé.
   Unités : mm. Repère : X le long de la tuyauterie (l'eau va de -X vers +X), Y vers le haut,
   Z l'axe du moteur (+Z = face avant, le module électronique). Entraxe 180 mm, comme un
   circulateur de chauffage courant.

   CE QUE L'ÉLÈVE DOIT VOIR : l'eau entre au CENTRE de la roue, la roue tourne et la projette
   vers l'extérieur, la volute la recueille et la renvoie, plus pressée, vers le refoulement.
   Et la particularité du rotor noyé : le rotor tourne DANS l'eau, séparé du bobinage par une
   chemise mince ; il n'y a aucun joint sur l'arbre.

   « Voir en coupe » tranche tout l'appareil par le plan des deux axes (le haut est retiré) :
   les faces coupées sont hachurées comme sur un dessin de définition, l'eau est teintée.
   La roue reste entière (convention des vues en coupe : on ne coupe pas ce qui tourne). */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('circulateur', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const D = Math.PI / 180;
    const N = HydroNappe(T, K);

    /* ---------------------------------------------------------------- matières à soi
       Tout ce qui se coupe a sa matière propre, double face (on voit l'intérieur des parois). */
    const coupables = [];
    const C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; coupables.push(c); return c; };
    const fonte = C(M.fonte, 0x3e454d);            /* corps en fonte, peint anthracite */
    const alu = C(M.aluminium, 0xc9ced4);          /* carter du moteur */
    const tole = C(M.tole);
    const bobine = K.bobinageMat(6); bobine.side = T.DoubleSide; coupables.push(bobine);
    const inox = C(M.acier, 0xd5dade);
    const ceram = C(M.ceramique);
    const graphite = C(M.plastiqueNoir, 0x2a2d31);
    const laiton = C(M.laiton);
    const cuivre = C(M.cuivre);
    const module = C(M.plastiqueMarine);
    const face = C(M.plastiqueBlanc);
    const noir = C(M.plastiqueNoir);
    const pcb = C(M.plastiqueVert, 0x1f6b3a);
    const eauCan = new T.MeshStandardMaterial({ color: 0x5fa6e6, roughness: 0.2, transparent: true, opacity: 0.4, depthWrite: false, side: T.DoubleSide });
    coupables.push(eauCan);
    /* la roue (non coupée) : plastique technique marine, flasque avant translucide pour voir les aubes */
    const roueMat = K.propre(M.plastiqueMarine);
    const flasqueAvant = new T.MeshStandardMaterial({ color: 0xb9cde3, roughness: 0.2, transparent: true, opacity: 0.16, depthWrite: false, side: T.DoubleSide });

    /* ---------------------------------------------------------------- géométries */
    const surZ = (g, z) => { g.rotateX(Math.PI / 2); g.translate(0, 0, z); return g; };
    const anneauZ = (rExt, rInt, z0, z1, mat, seg) => new T.Mesh(surZ(K.anneau(rExt, rInt, z1 - z0, seg || 48), (z0 + z1) / 2), mat);
    const cylZ = (r, z0, z1, mat, seg) => new T.Mesh(surZ(K.cylindre(r, z1 - z0, seg || 40), (z0 + z1) / 2), mat);
    const surX = (g, x, z) => { g.rotateZ(Math.PI / 2); g.translate(x, 0, z || 0); return g; };
    const anneauX = (rExt, rInt, x0, x1, z, mat, seg) => new T.Mesh(surX(K.anneau(rExt, rInt, x1 - x0, seg || 40), (x0 + x1) / 2, z), mat);
    const tubeX = (r, x0, x1, z, mat) => new T.Mesh(surX(new T.CylinderGeometry(r, r, x1 - x0, 36, 1, true), (x0 + x1) / 2, z), mat);
    const ZP = -14;   /* axe de la tuyauterie */

    /* ================================================================ LE CORPS DE POMPE */
    const corps = new T.Group();
    const bloc = K.mesh(K.boite(120, 52, 46, 9), fonte, 0, 0, -17);
    corps.add(bloc);
    /* la flèche de sens, venue de fonderie sur le dessus : l'eau va de gauche à droite */
    const fl = new T.Shape();
    [[-26, -4], [10, -4], [10, -10], [28, 0], [10, 10], [10, 4], [-26, 4]].forEach((p, i) => i ? fl.lineTo(p[0], p[1]) : fl.moveTo(p[0], p[1]));
    const fleche = new T.Mesh(K.extrusion(fl, 1.6, 0.4), fonte);
    fleche.rotation.x = -Math.PI / 2; fleche.position.set(0, 26.4, -17);
    corps.add(fleche);

    const volute = new T.Group();
    volute.add(anneauZ(56, 49, 0, 26, fonte, 64));      /* la chambre en colimaçon autour de la roue */
    volute.add(anneauZ(49, 14, 3, 7, fonte, 56));       /* sa paroi côté aspiration, percée de l'ouïe */
    volute.add(anneauZ(49, 6, 22, 26, fonte, 56));      /* sa paroi côté moteur */

    const aspiration = new T.Group(), refoulement = new T.Group();
    aspiration.add(anneauX(24, 17, -90, -45, ZP, fonte));
    aspiration.add(tubeX(17, -45, 20, ZP, fonte));
    const fondA = K.mesh(new T.CircleGeometry(17, 36), fonte, 20, 0, ZP); fondA.rotation.y = -Math.PI / 2; aspiration.add(fondA);
    refoulement.add(anneauX(24, 17, 45, 90, ZP, fonte));
    refoulement.add(tubeX(17, 28, 45, ZP, fonte));
    const fondR = K.mesh(new T.CircleGeometry(17, 36), fonte, 28, 0, ZP); fondR.rotation.y = Math.PI / 2; refoulement.add(fondR);
    racine.add(corps, volute, aspiration, refoulement);

    /* les raccords union (écrou laiton) et les tubes cuivre de l'installation */
    const raccords = new T.Group();
    [-1, 1].forEach(s => {
      /* l'écrou six pans : orienté autour de son axe AVANT d'être couché sur la tuyauterie */
      const gEcrou = new T.CylinderGeometry(30, 30, 22, 6); gEcrou.rotateY(Math.PI / 6);
      raccords.add(new T.Mesh(surX(gEcrou, s * 97, ZP), laiton));
      raccords.add(anneauX(14, 12.8, s > 0 ? 104 : -210, s > 0 ? 210 : -104, ZP, cuivre));
      raccords.add(anneauX(17, 12.8, s > 0 ? 104 : -112, s > 0 ? 112 : -104, ZP, laiton));
    });
    racine.add(raccords);

    /* ================================================================ LA TÊTE MOTEUR */
    const carter = new T.Group();
    carter.add(anneauZ(60, 27.5, 26, 32, alu, 64));                  /* la bride */
    for (let i = 0; i < 4; i++) {
      const a = (45 + i * 90) * D, x = Math.cos(a) * 53, y = Math.sin(a) * 53;
      const bossage = cylZ(7, 26, 34, alu, 20); bossage.position.x = x; bossage.position.y = y; carter.add(bossage);
      const v = K.vis(3.6, { croix: false }); v.rotation.x = Math.PI / 2; v.position.set(x, y, 34); carter.add(v);
    }
    carter.add(anneauZ(50, 44, 32, 120, alu, 64));
    for (let z = 40; z <= 112; z += 9) carter.add(anneauZ(53, 50, z, z + 2.4, alu, 64));   /* ailettes de refroidissement */
    racine.add(carter);

    const stator = new T.Group();
    stator.add(anneauZ(43, 29, 52, 98, tole, 56));
    [46, 104].forEach(z => { const t = new T.Mesh(K.tore(36, 6.5, 12, 48), bobine); t.position.z = z; stator.add(t); });
    racine.add(stator);

    const chemise = new T.Group();
    chemise.add(anneauZ(27.5, 26.5, 26, 117, inox, 56));
    chemise.add(cylZ(27.5, 117, 118.2, inox, 56));
    const eau = cylZ(26.4, 26, 117, eauCan, 40); eau.userData.sansOmbre = true; eau.userData.voile = true; eau.visible = false;
    chemise.add(eau);
    racine.add(chemise);

    const paliers = new T.Group();
    paliers.add(anneauZ(9, 5.2, 32, 40, graphite, 28), anneauZ(9, 5.2, 108, 116, graphite, 28));
    paliers.add(anneauZ(26.5, 9, 34, 37, inox, 48), anneauZ(26.5, 9, 110, 113, inox, 48));
    racine.add(paliers);

    /* ---------------------------------------------------------------- ce qui tourne : arbre, rotor, roue */
    const tournant = new T.Group();
    const arbre = cylZ(5, 16, 114, ceram, 24);
    const rotor = new T.Group();
    rotor.add(cylZ(24, 44, 106, tole, 48));
    rotor.add(anneauZ(24, 12, 41, 44, C(M.aluminium), 40), anneauZ(24, 12, 106, 109, C(M.aluminium), 40));
    const repere = K.mesh(K.boite(6, 5, 3.2, 1), M.plastiqueOrange, 0, -18, 108); rotor.add(repere);
    tournant.add(arbre, rotor);

    const roue = new T.Group();
    const flasque = anneauZ(42, 14, 8.4, 9.8, flasqueAvant, 56); flasque.userData.voile = true;
    roue.add(flasque);                                               /* flasque avant, translucide */
    roue.add(cylZ(42, 20.4, 22, roueMat, 56));                       /* flasque arrière */
    roue.add(cylZ(9, 14, 22, roueMat, 24));                          /* moyeu */
    /* six aubes recourbées vers l'arrière ; la roue tourne dans le sens horaire vue de face (côté module) :
       la moitié haute, la seule visible en coupe, file vers le refoulement comme l'eau */
    const aube = phi0 => {
      const N = 14, ep = 1.3, pts = [], bord = [];
      for (let i = 0; i <= N; i++) {
        const u = i / N, r = 12 + u * 29.5, a = phi0 + u * 58 * D;
        const p = new T.Vector2(Math.cos(a) * r, Math.sin(a) * r);
        const t = new T.Vector2(Math.cos(a + 1.25), Math.sin(a + 1.25));
        pts.push(p.clone().addScaledVector(t, ep)); bord.push(p.clone().addScaledVector(t, -ep));
      }
      const s = new T.Shape(pts); bord.reverse().forEach(p => s.lineTo(p.x, p.y));
      const g = new T.ExtrudeGeometry(s, { depth: 10.6, bevelEnabled: false, curveSegments: 4 });
      g.translate(0, 0, 9.8); g.computeVertexNormals();
      return new T.Mesh(g, roueMat);
    };
    for (let i = 0; i < 6; i++) roue.add(aube(i * 60 * D));
    tournant.add(roue);
    racine.add(tournant);

    /* ================================================================ LE MODULE ÉLECTRONIQUE */
    const moduleG = new T.Group();
    moduleG.add(K.mesh(K.boite(100, 100, 40, 14), module, 0, 0, 140));
    moduleG.add(K.mesh(K.boite(84, 84, 3, 10), face, 0, 0, 160));
    const bouton = new T.Group();
    bouton.add(cylZ(13, 161, 170, noir, 32));
    bouton.add(K.mesh(K.boite(3, 15, 2, 0.8), K.propre(M.plastiqueOrange), 0, 5, 170.6));
    bouton.position.set(-14, -8, 0);
    /* l'axe du bouton est en (-14, -8) : on tourne le groupe intérieur autour de lui */
    const pivot = new T.Group(); pivot.position.set(-14, -8, 0);
    bouton.position.set(0, 0, 0); pivot.add(bouton);
    moduleG.add(pivot);
    const MARQUES = [['I', 40], ['II', 0], ['III', -40]];
    MARQUES.forEach(([t, a]) => {
      const g = K.gravure(t, 6.5, { couleur: '#1b3a63' });
      g.position.set(-14 + Math.sin(-a * D) * 23, -8 + Math.cos(a * D) * 23, 161.8);
      moduleG.add(g);
    });
    const leds = [0, 1, 2].map(i => {
      const m = K.mesh(K.cylindre(2.4, 1.6, 16), K.propre(M.plastiqueSombre), 22, 18 - i * 9, 161.9); m.rotation.x = Math.PI / 2;
      moduleG.add(m); return m;
    });
    const ledMarche = new T.MeshBasicMaterial({ color: 0x2fd27a, toneMapped: false });
    const presse = K.mesh(K.cylindre(7, 14, 20), noir, -30, -54, 140);
    moduleG.add(presse);
    const cable = K.fil([[-30, -60, 140], [-36, -68, 136], [-70, -66, 124], [-130, -62, 110]], 4.2, K.plastique(0x8b9096, 0.55));
    moduleG.add(cable.mesh);
    /* dedans (vu en coupe) : la carte électronique */
    const carte = new T.Group();
    carte.add(K.mesh(new T.BoxGeometry(80, 80, 1.6), pcb, 0, 0, 136));
    [[-20, 14, 8, 6], [10, 20, 12, 8], [18, -14, 7, 7], [-12, -20, 10, 5]].forEach(([x, y, l, h]) => carte.add(K.mesh(K.boite(l, h, 3, 0.4), noir, x, y, 138.4)));
    [[-28, -6], [28, 6]].forEach(([x, y]) => { const c = cylZ(4.5, 137, 151, C(M.plastiqueBleu), 20); c.position.x = x; c.position.y = y; carte.add(c); });
    moduleG.add(carte);
    racine.add(moduleG);

    /* ================================================================ LES FACES DE COUPE
       Dessinées dans le plan y = 0 (coordonnées x, z) ; hachures à 45° comme sur un plan. */
    const hachures = (fond, trait, pas) => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = fond; x.fillRect(0, 0, 64, 64);
      x.strokeStyle = trait; x.lineWidth = 5;
      for (let i = -64; i <= 64; i += 32) { x.beginPath(); x.moveTo(i, 64); x.lineTo(i + 64, 0); x.stroke(); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / pas, 1 / pas);
      return new T.MeshStandardMaterial({ map: t, roughness: 0.75, metalness: 0.05, side: T.DoubleSide });
    };
    const uni = (couleur, extra) => new T.MeshStandardMaterial(Object.assign({ color: couleur, roughness: 0.6, side: T.DoubleSide }, extra || {}));
    const H = {
      fonte: hachures('#5b646e', '#262b31', 8),
      alu: hachures('#a9b0b8', '#666e77', 6),
      laiton: hachures('#b08f45', '#6a511c', 6),
      tole: hachures('#5f6872', '#2c3238', 3),
      cuivre: uni(0xb8683c, { metalness: 0.3, roughness: 0.5 }),
      inox: uni(0xa9b1b9, { metalness: 0.3, roughness: 0.4 }),
      ceram: uni(0xd9d3c7),
      graphite: uni(0x33373c),
      module: hachures('#3f5a80', '#14294a', 6),
      pcb: uni(0x1f6b3a),
      eau: new T.MeshStandardMaterial({ color: 0x3b8ad6, roughness: 0.3, transparent: true, opacity: 0.72, depthWrite: false, side: T.DoubleSide })
    };
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const faceDe = (polys, mat, y, groupe) => {
      const formes = polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1]))));
      const g = new T.ShapeGeometry(formes); g.rotateX(Math.PI / 2);
      const m = new T.Mesh(g, mat); m.position.y = y; m.userData.sansOmbre = true; m.castShadow = false; if (mat.transparent) m.userData.voile = true;
      (groupe || faces).add(m); return m;
    };
    const rect = (x0, x1, z0, z1) => [[x0, z0], [x1, z0], [x1, z1], [x0, z1]];
    const sym = (x0, x1, z0, z1) => [rect(x0, x1, z0, z1), rect(-x1, -x0, z0, z1)];
    /* le corps : quatre morceaux de paroi, sans trou (l'eau passe entre eux) */
    const facesCorps = new T.Group(); faces.add(facesCorps);
    faceDe([
      [[-90, -38], [-60, -38], [-60, -40], [60, -40], [60, -38], [90, -38], [90, -31], [-90, -31]],                 /* le fond */
      rect(20, 28, -31, 3),                                                                                          /* la cloison aspiration / refoulement */
      [[-90, 3], [-14, 3], [-14, 7], [-49, 7], [-49, 22], [49, 22], [49, 3], [90, 3], [90, 10], [56, 10], [56, 26],
       [27.5, 26], [-27.5, 26], [-56, 26], [-56, 10], [-90, 10]],                                                     /* le dessus et la volute */
      rect(14, 38, 3, 7)                                                                                             /* la paroi entre l'ouïe et la sortie */
    ], H.fonte, 0.02, facesCorps);
    /* l'eau, en coupe : aspiration, ouïe, volute, sortie, et dans les tubes */
    const facesEau = new T.Group(); faces.add(facesEau);
    faceDe([
      [[-90, -31], [20, -31], [20, 3], [14, 3], [14, 7], [38, 7], [38, 3], [28, 3], [28, -31], [90, -31], [90, 3], [49, 3], [49, 22], [-49, 22], [-49, 7], [-14, 7], [-14, 3], [-90, 3]],
      rect(-210, -90, ZP - 12.8, ZP + 12.8), rect(90, 210, ZP - 12.8, ZP + 12.8),
      rect(-26.5, 26.5, 26, 117)
    ], H.eau, -0.3, facesEau);
    const facesRaccords = new T.Group(); faces.add(facesRaccords);
    faceDe([...sym(86, 108, ZP - 26, ZP - 14), ...sym(86, 108, ZP + 14, ZP + 26), ...sym(104, 112, ZP - 17, ZP - 14), ...sym(104, 112, ZP + 14, ZP + 17)], H.laiton, 0.03, facesRaccords);
    faceDe([...sym(112, 210, ZP - 14, ZP - 12.8), ...sym(112, 210, ZP + 12.8, ZP + 14)], H.cuivre, 0.03, facesRaccords);
    const facesCarter = new T.Group(); faces.add(facesCarter);
    faceDe([...sym(27.5, 60, 26, 32), ...sym(44, 50, 32, 120)], H.alu, 0.03, facesCarter);
    const facesStator = new T.Group(); faces.add(facesStator);
    faceDe(sym(29, 43, 52, 98), H.tole, 0.03, facesStator);
    faceDe(sym(31, 41, 46, 104), H.cuivre, 0.05, facesStator);
    const facesChemise = new T.Group(); faces.add(facesChemise);
    faceDe([...sym(26.5, 27.5, 26, 117), rect(-27.5, 27.5, 117, 118.2)], H.inox, 0.06, facesChemise);
    const facesTournant = new T.Group(); faces.add(facesTournant);
    faceDe([rect(-24, 24, 44, 106)], H.tole, 0.04, facesTournant);
    faceDe([rect(-5, 5, 16, 114)], H.ceram, 0.07, facesTournant);
    const facesPaliers = new T.Group(); faces.add(facesPaliers);
    faceDe([...sym(5.2, 9, 32, 40), ...sym(5.2, 9, 108, 116)], H.graphite, 0.08, facesPaliers);
    faceDe([...sym(9, 26.5, 34, 37), ...sym(9, 26.5, 110, 113)], H.inox, 0.06, facesPaliers);
    const facesModule = new T.Group(); faces.add(facesModule);
    faceDe([...sym(46, 50, 120, 160), rect(-50, 50, 120, 123), rect(-42, 42, 158.5, 161.5)], H.module, 0.03, facesModule);
    faceDe([rect(-40, 40, 135.2, 136.8)], H.pcb, 0.04, facesModule);

    /* ================================================================ L'EAU QUI CIRCULE
       Bleu clair à l'aspiration, bleu soutenu dans la roue, marine au refoulement :
       plus la couleur est foncée, plus l'eau est pressée. */
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const cAsp = new T.CatmullRomCurve3([V(-210, 0, ZP), V(-60, 0, ZP), V(-18, 0, ZP), V(-6, 0, -10), V(0, 0, -2), V(0, 0, 12)], false, 'centripetal');
    const spirales = [];
    for (let i = 0; i < 5; i++) {
      const pts = [];
      for (let k = 0; k <= 24; k++) { const u = k / 24, r = 9 + u * 36, a = i * 72 * D - u * 115 * D; pts.push(V(Math.cos(a) * r, Math.sin(a) * r, 15.2)); }
      spirales.push(new T.CatmullRomCurve3(pts));
    }
    const ptsRef = [];
    for (let k = 0; k <= 30; k++) { const a = (180 - k / 30 * 180) * D; ptsRef.push(V(Math.cos(a) * 45.5, Math.sin(a) * 45.5, 15.2)); }
    ptsRef.push(V(44, 0, 6), V(43, 0, -4), V(56, 0, ZP), V(120, 0, ZP), V(210, 0, ZP));
    const cRef = new T.CatmullRomCurve3(ptsRef, false, 'centripetal');
    /* l'eau coule en filets continus (jamais des grains) : des bandes plus sombres y défilent, à la vitesse de l'eau */
    const flotAsp = N.filet(cAsp, { rayon: 4, couleur: 0x84b7ec, vitesse: 40, pas: 40 });
    const flotRoue = spirales.map(c => N.filet(c, { rayon: 2.4, couleur: 0x3d7fca, vitesse: 30, pas: 24 }));
    const flotRef = N.filet(cRef, { rayon: 4, couleur: 0x1b3a63, vitesse: 50, pas: 40 });
    const flots = [flotAsp, ...flotRoue, flotRef];
    flots.forEach(f => racine.add(f.objet));

    /* ================================================================ L'ÉTAT */
    const VITESSES = { 1: { tr: 1750, s: 0.62 }, 2: { tr: 2350, s: 0.81 }, 3: { tr: 2900, s: 1 } };
    const E = { marche: false, vitesse: 2, phase: 'marche', coupe: false, demonte: false };
    let w = 0, angle = 0;
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
    const point = () => { const s = VITESSES[E.vitesse].s, q = s * 2.97; return { q, h: 0.5 * q * q }; };
    const majMesures = () => {
      if (!E.marche) { ctx.mesures([{ libelle: 'La vitesse', valeur: '0 tr/min' }, { libelle: 'Le débit', valeur: '0 m³/h' }, { libelle: 'La hauteur', valeur: '0 mCE' }]); return; }
      const p = point();
      ctx.mesures([
        { libelle: 'La vitesse', valeur: nb(VITESSES[E.vitesse].tr, 0) + ' tr/min' },
        { libelle: 'Le débit', valeur: nb(p.q, 1) + ' m³/h' },
        { libelle: 'La hauteur', valeur: nb(p.h, 1) + ' mCE' }
      ]);
    };
    const ralenti = ' <em>À l’écran, la rotation est très ralentie.</em>';
    const majTexte = () => {
      majMesures();
      if (!E.marche) { ctx.dire('<strong>À l’arrêt.</strong> L’eau ne circule pas. Le circulateur est plein d’eau, jusque dans le moteur : le rotor baigne dedans.'); return; }
      const p = point();
      ctx.dire('<strong>Vitesse ' + ['', 'I', 'II', 'III'][E.vitesse] + '.</strong> L’eau entre au centre de la roue, en ressort par le bord, et repart plus pressée : '
        + nb(p.q, 1) + ' m³/h sous ' + nb(p.h, 1) + ' mCE. Plus la vitesse est grande, plus le débit et la hauteur montent.' + ralenti);
    };
    const visibles = () => {
      const on = E.marche && !E.demonte;
      flotAsp.objet.visible = on && ['aspiration', 'roue', 'marche'].includes(E.phase);
      flotRoue.forEach(f => f.objet.visible = on && ['roue', 'marche'].includes(E.phase));
      flotRef.objet.visible = on && E.phase === 'marche';
    };
    const majLeds = () => leds.forEach((m, i) => { m.material = E.marche && i < E.vitesse ? ledMarche : m.userData.matEteinte || (m.userData.matEteinte = m.material); });
    leds.forEach(m => { m.userData.matEteinte = m.material; });
    const majBouton = () => { pivot.rotation.z = [0, 40, 0, -40][E.vitesse] * D; };

    const basculerCoupe = on => {
      E.coupe = on;
      const plan = on ? [new T.Plane(new T.Vector3(0, -1, 0), 0)] : null;
      const exclus = new Set();
      [faces, roue, ...flots.map(f => f.objet)].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.needsUpdate = true; } });
      });
      faces.visible = on && !E.demonte; eau.visible = on;
    };

    majBouton(); majLeds(); visibles(); majTexte();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'corps', nom: 'Le corps de pompe', objets: [corps, facesCorps], desc: 'La pièce en fonte vissée sur la tuyauterie. La flèche moulée sur le dessus donne le sens de l’eau : on pose le circulateur dans ce sens.' },
      { id: 'aspiration', nom: 'L’aspiration', objets: [aspiration], desc: 'L’entrée de l’eau. Le canal la conduit sous la roue, jusqu’à son centre.' },
      { id: 'roue', nom: 'La roue à aubes', objets: [roue], desc: 'Elle tourne avec le moteur. Ses aubes recourbées attrapent l’eau au centre et la lancent vers le bord.' },
      { id: 'volute', nom: 'La volute', objets: [volute], desc: 'La chambre en colimaçon autour de la roue. Elle recueille l’eau lancée par la roue et la dirige vers la sortie.' },
      { id: 'refoulement', nom: 'Le refoulement', objets: [refoulement], desc: 'La sortie de l’eau, plus pressée qu’à l’entrée. Une cloison la sépare de l’aspiration.' },
      { id: 'raccords', nom: 'Les raccords union', objets: [raccords, facesRaccords], desc: 'Deux écrous et deux joints plats : on dépose le circulateur sans couper le tube.' },
      { id: 'rotor', nom: 'Le rotor noyé et son arbre', objets: [rotor, arbre, facesTournant], desc: 'La partie qui tourne dans le moteur. Il baigne dans l’eau de l’installation, qui le refroidit et lubrifie ses paliers.' },
      { id: 'chemise', nom: 'La chemise', objets: [chemise, facesChemise], desc: 'Un tube en inox très mince entre le rotor et le bobinage. L’eau reste dedans, le bobinage reste au sec : aucun joint sur l’arbre.' },
      { id: 'stator', nom: 'Le stator et son bobinage', objets: [stator, facesStator], desc: 'La partie fixe du moteur, au sec. Alimenté, son bobinage crée un champ qui tourne et entraîne le rotor à travers la chemise.' },
      { id: 'paliers', nom: 'Les paliers', objets: [paliers, facesPaliers], desc: 'Deux bagues en graphite ou en céramique tiennent l’arbre. C’est l’eau qui les lubrifie : un circulateur ne doit jamais tourner à sec.' },
      { id: 'carter', nom: 'Le carter et sa bride', objets: [carter, facesCarter], desc: 'L’enveloppe du moteur, à ailettes. Quatre vis la fixent au corps : on peut tourner la tête par quarts de tour.' },
      { id: 'module', nom: 'Le module de commande', objets: [moduleG, facesModule], desc: 'Il alimente le moteur. Le bouton choisit la vitesse I, II ou III ; les voyants la montrent.' }
    ];

    const commandes = [
      { id: 'marche', type: 'choix', options: [['arret', 'Arrêt'], ['marche', 'En marche']], valeur: 'arret' },
      { id: 'vitesse', type: 'choix', options: [['1', 'Vitesse I'], ['2', 'Vitesse II'], ['3', 'Vitesse III']], valeur: '2' }
    ];

    const etapes = [
      { titre: 'Le circulateur, tel qu’on le pose', piece: 'corps', voirDedans: false, eclate: false, actions: [['marche', 'arret']],
        vue: { azimut: 36, elevation: 40, zoom: 0.95, cible: [0, 0, 25] },
        texte: 'Un corps en fonte vissé entre deux tubes, un moteur, un module de commande. La flèche sur le corps donne le sens de l’eau.' },
      { titre: 'On le coupe : le rotor baigne dans l’eau', piece: 'chemise', voirDedans: true, eclate: false, actions: [['marche', 'arret']],
        vue: { azimut: 24, elevation: 64, zoom: 1.35, cible: [0, 0, 70] },
        texte: 'L’eau remplit le corps et entre jusque dans le moteur, autour du rotor. Une chemise en inox très mince la sépare du bobinage, qui reste au sec.' },
      { titre: 'Le courant arrive : le rotor tourne et entraîne la roue', piece: 'stator', voirDedans: true, eclate: false, actions: [['phase', 'arret'], ['marche', 'marche']],
        vue: { azimut: 30, elevation: 46, zoom: 1.2, cible: [0, 0, 55] },
        texte: 'Le bobinage crée un champ qui tourne. À travers la chemise, il entraîne le rotor ; l’arbre fait tourner la roue, au bout, dans la volute.' },
      { titre: 'L’eau est aspirée au centre de la roue', piece: 'aspiration', voirDedans: true, eclate: false, actions: [['marche', 'marche'], ['phase', 'aspiration']],
        vue: { azimut: -24, elevation: 60, zoom: 1.3, cible: [-45, 0, -2] },
        texte: 'La roue qui tourne crée un creux en son centre. L’eau de l’entrée y est attirée : elle passe sous la roue et remonte par l’ouïe, le trou du milieu.' },
      { titre: 'La roue la lance vers le bord : sa pression monte', piece: 'roue', voirDedans: true, eclate: false, ralenti: true, actions: [['marche', 'marche'], ['phase', 'roue']],
        vue: { azimut: 200, elevation: 38, zoom: 1.5, cible: [0, 0, 12] },
        texte: 'Les aubes entraînent l’eau et la lancent vers l’extérieur, en spirale. Arrivée au bord, l’eau va plus vite et pousse plus fort : c’est la roue qui lui a donné cette énergie.' },
      { titre: 'La volute la renvoie vers le refoulement', piece: 'volute', voirDedans: true, eclate: false, actions: [['marche', 'marche'], ['phase', 'marche']],
        vue: { azimut: 18, elevation: 58, zoom: 1.2, cible: [30, 0, 0] },
        texte: 'La volute recueille l’eau tout autour de la roue et la guide vers la sortie. L’eau repart plus pressée qu’elle n’est entrée : c’est la hauteur du circulateur.' },
      { titre: 'Démonté : quatre vis et la tête vient', piece: 'carter', voirDedans: false, eclate: true, actions: [['marche', 'arret'], ['phase', 'marche']],
        texte: 'Les quatre vis retirées, la tête moteur se sépare du corps, qui reste sur la tuyauterie. Le rotor et la roue sortent d’un bloc de la chemise.' }
    ];

    const eclate = [
      { objets: [moduleG], vers: [0, 0, 310], debut: 0, fin: 0.4 },
      { objets: [carter, stator, chemise, paliers], vers: [0, 0, 95], debut: 0.15, fin: 0.7 },
      { objets: [tournant], vers: [0, 0, 215], debut: 0.35, fin: 1 }
    ];

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 64, elevation: 22, zoom: 0.55, cible: [0, 0, 170] },
      vue: ctx.mode === 'decouvrir' ? { azimut: 36, elevation: 40, cadre: [corps, carter, moduleG], marge: 1.04 }
                                    : { azimut: 22, elevation: 56, cadre: [corps, carter, moduleG], marge: 1.0 },
      phrase: undefined,
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'phase') { E.phase = v; visibles(); return; }
        if (id === 'marche') { E.marche = v === 'marche'; ctx.regler('marche', v); }
        if (id === 'vitesse') { E.vitesse = +v; ctx.regler('vitesse', String(v)); majBouton(); }
        majLeds(); visibles(); majTexte();
      },
      surEclate(on) { E.demonte = on; faces.visible = E.coupe && !on; visibles(); },
      animer(dt) {
        const s = VITESSES[E.vitesse].s;
        const cible = E.marche && !E.demonte ? 2 * Math.PI * 0.32 * s : 0;
        w = K.vers(w, cible, 1.4, dt);
        angle += w * dt;
        tournant.rotation.z = -angle;
        const r = w / (2 * Math.PI * 0.32);
        flotAsp.regler({ vitesse: 46 * r }); flotRoue.forEach(f => f.regler({ vitesse: 34 * r })); flotRef.regler({ vitesse: 58 * r });
        if (w > 0.01) flots.forEach(f => f.animer(dt));
        return w > 0.002 || cible > 0;
      }
    };
  }, { famille: 'pompes', titre: 'Le circulateur à rotor noyé', stations: ['circulateur'] });
})();
