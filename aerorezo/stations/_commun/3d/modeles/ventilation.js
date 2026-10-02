/* AéroRézo 3D — famille « ventilation » : le ventilateur centrifuge à volute, sur son châssis.
   Unités : mm. Repère : X dans le sens de l'air refoulé (de gauche à droite), Y vers le haut,
   Z vers l'avant (+Z = la face de l'ouïe d'aspiration, celle qu'on voit). Axe de la roue : Z.
   L'arbre est à YC = 470 mm du sol ; la bouche de refoulement sort à droite, en haut ; le moteur
   est à gauche, la courroie derrière.

   CE QUE L'ÉLÈVE DOIT VOIR : la roue tourne ; l'air arrive dans l'axe par l'ouïe, au centre ; les
   aubes le lancent vers le bord ; la volute, qui s'élargit tour après tour, le recueille et le
   ralentit : sa vitesse devient de la pression, qu'un manomètre lit au refoulement. Puis on ferme
   le registre dans la gaine : le réseau résiste plus, le débit baisse et la pression monte (le
   point de fonctionnement glisse). Puis on monte la commande du ventilateur : débit et pression
   montent ensemble.

   CHOIX : ventilateur à simple ouïe, roue à RÉACTION (dix aubes recourbées vers l'arrière, la plus
   courante en ventilation tertiaire), entraînement par POULIES ET COURROIE, moteur sur glissières,
   manchette souple, registre à lames opposées. Voir la fiche.

   COULEURS DE L'AIR (communes à AéroRézo) : tout l'air de ce ventilateur est de l'air SOUFFLÉ, bleu
   0x2f7fd6 (le texte le nomme toujours : la couleur ne porte jamais seule l'information).

   « Voir en coupe » retire la moitié avant (z > 0) : on lit la volute en spirale, les aubes, le
   bec, la bouche, la gaine et les lames du registre, tous coupés dans le plan z = 0. Seul le moteur
   reste entier (rien à y lire). */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('ventilateur', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const D = Math.PI / 180;
    const AIR = { souffle: 0x2f7fd6 };

    /* ---------------------------------------------------------------- matières
       Tout ce qui se coupe a sa matière propre, double face. */
    const C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; return c; };
    const tole = C(M.zingue, 0xb7c0c7);                    /* volute et gaine : tôle galvanisée */
    const alu = C(M.aluminium, 0xc9ced3);                  /* pavillon d'aspiration */
    const roueMat = C(M.plastiqueMarine);                  /* aubes peintes */
    const roueTole = C(M.aluminium, 0xaab2ba);             /* flasques de la roue */
    const acier = C(M.acier, 0xcfd5da);                    /* arbre, axes */
    const fonte = C(M.fonte, 0x586069);                    /* poulies, paliers : fonte grise */
    const peint = C(K.plastique(0x57616c, 0.6));           /* châssis : acier peint anthracite */
    const noir = C(M.plastiqueNoir);
    const souple = C(M.caoutchouc, 0x2a2d31);              /* manchette */
    const courroieMat = C(M.caoutchouc, 0x17191c);
    const lameMat = C(M.aluminium, 0xc9ced3);
    const quadMat = C(K.plastique(0x3a4047, 0.55));
    /* le moteur reste entier en coupe : ses matières ne servent à rien de ce qu'on coupe */
    const moteurMat = K.propre(M.fonte); moteurMat.color.setHex(0x4f6a86);
    const moteurNoir = K.propre(M.plastiqueNoir);
    const moteurAcier = K.propre(M.acier);
    const laitonP = K.propre(M.laiton);

    /* ---------------------------------------------------------------- briques */
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
    /* une forme de révolution autour de l'axe Z : points [rayon, z] (profil fermé) */
    const revZ = (pts, mat, seg) => {
      const g = new T.LatheGeometry(pts.map(([r, z]) => new T.Vector2(r, z)), seg || 56);
      g.rotateX(Math.PI / 2);
      return new T.Mesh(g, mat);
    };
    const shape = (pts, trous) => {
      const s = new T.Shape(pts.map(p => new T.Vector2(p[0], p[1])));
      (trous || []).forEach(t => { const h = new T.Path(); h.absarc(t[0], t[1], t[2], 0, Math.PI * 2, true); s.holes.push(h); });
      return s;
    };
    /* une plaque : un contour 2D (plan XY) épaissi de z0 à z1 */
    const plaque = (pts, z0, z1, mat, trous) => {
      const g = new T.ExtrudeGeometry(shape(pts, trous), { depth: z1 - z0, bevelEnabled: false, curveSegments: 32 });
      g.translate(0, 0, z0);
      return new T.Mesh(g, mat);
    };
    const rect = (x0, x1, y0, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    /* un disque (ou une bague) d'axe Z, de z0 à z1, percé de trous ronds [cx, cy, r] */
    const disque = (r, rInt, z0, z1, mat, trous) => {
      const s = new T.Shape(); s.absarc(0, 0, r, 0, Math.PI * 2, false);
      if (rInt > 0) { const h = new T.Path(); h.absarc(0, 0, rInt, 0, Math.PI * 2, true); s.holes.push(h); }
      (trous || []).forEach(t => { const h = new T.Path(); h.absarc(t[0], t[1], t[2], 0, Math.PI * 2, true); s.holes.push(h); });
      const g = new T.ExtrudeGeometry(s, { depth: z1 - z0, bevelEnabled: false, curveSegments: 40 });
      g.translate(0, 0, z0);
      return new T.Mesh(g, mat);
    };
    /* une polyligne décalée de e vers sa droite (l'intérieur de la volute est à gauche) */
    const decale = (pts, e) => pts.map((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      let tx = b[0] - a[0], ty = b[1] - a[1]; const l = Math.hypot(tx, ty) || 1; tx /= l; ty /= l;
      return [p[0] + ty * e, p[1] - tx * e];
    });
    const bande = (pts, e) => pts.concat(decale(pts, e).reverse());
    /* l'enveloppe convexe d'un nuage de points (la courroie autour de deux poulies) */
    const enveloppe = pts => {
      const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
      const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
      const bas = [], haut = [];
      for (const q of p) { while (bas.length >= 2 && cr(bas[bas.length - 2], bas[bas.length - 1], q) <= 0) bas.pop(); bas.push(q); }
      for (let i = p.length - 1; i >= 0; i--) { const q = p[i]; while (haut.length >= 2 && cr(haut[haut.length - 2], haut[haut.length - 1], q) <= 0) haut.pop(); haut.push(q); }
      haut.pop(); bas.pop(); return bas.concat(haut);                 /* sens trigonométrique */
    };
    const cercle = (c, r, n) => Array.from({ length: n }, (_, i) => [c[0] + r * Math.cos(i / n * 2 * Math.PI), c[1] + r * Math.sin(i / n * 2 * Math.PI)]);

    /* ================================================================ LES COTES */
    const YC = 470;                                  /* l'axe de l'arbre, au-dessus du sol */
    const RW = 250;                                  /* rayon de la roue (Ø 500) */
    const RT = 285;                                  /* rayon de la volute au bec (jeu de 35 mm) */
    const HB = 300;                                  /* hauteur de la bouche de refoulement */
    const ZV = 125;                                  /* demi-largeur de la volute (250) */
    const XB = 380;                                  /* la bouche */
    const E = 5;                                     /* épaisseur de tôle (2 à 3 mm en vrai, 5 pour qu'on la lise en coupe) */
    const YT = RT * Math.sin(30 * D);                /* le bec, par rapport à l'axe : 142,5 */
    const RMAX = YT + HB;                            /* le plus grand rayon de la volute : 442,5 */
    const Y0 = YC + YT, Y1 = YC + RMAX;              /* la gaine : de 612,5 à 912,5 */
    const XG0 = 470, XG1 = 1500, XR = 1000;          /* la gaine, le registre */
    const PM = { x: -545, y: 250 };                  /* l'axe du moteur */
    const RPM = 70, RPF = 100;                       /* rayons primitifs : poulie moteur Ø 140, poulie ventilateur Ø 200 */
    const RAPPORT = RPF / RPM;                       /* le moteur tourne 1,43 fois plus vite que la roue */
    const ZP = -320;                                 /* le plan de la courroie */

    /* ================================================================ LA SPIRALE DE LA VOLUTE
       Le rayon grandit en tournant dans le sens de la roue (horaire, vu de l'avant), du bec (à 30°)
       jusqu'au sommet (à 90°), où la tôle repart à l'horizontale vers la bouche. */
    const phiDe = s => (30 - 300 * s) * D;
    const rDe = s => RT + (RMAX - RT) * s;
    const pS = s => [rDe(s) * Math.cos(phiDe(s)), rDe(s) * Math.sin(phiDe(s))];
    const spirale = n => Array.from({ length: n + 1 }, (_, i) => pS(1 - i / n));
    const MUR = [[XB, RMAX]].concat(spirale(90));    /* la tôle : du dessus de la bouche au bec, intérieur à gauche */
    const basDe = x => Math.min(...spirale(400).filter(p => Math.abs(p[0] - x) < 6 && p[1] < 0).map(p => p[1]));

    /* ================================================================ LES FACES DE COUPE (plan z = 0) */
    const plat = c => new T.MeshStandardMaterial({ color: c, roughness: 0.55, side: T.DoubleSide });
    const H = { tole: plat(0x59636d), aube: plat(0x23466f), caout: plat(0x2f3338), acier: plat(0x7d8791) };
    const faces = [];
    const faceDe = (polys, mat, groupe) => {
      const g = new T.ShapeGeometry(polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1])))));
      const m = new T.Mesh(g, mat); m.position.z = 0.5; m.userData.sansOmbre = true; m.castShadow = false; m.visible = false;
      groupe.add(m); faces.push(m); return m;
    };

    /* ================================================================ LA VOLUTE */
    const volute = new T.Group(); volute.position.set(0, YC, 0); racine.add(volute);
    const contour = decale(MUR, E).concat([[XB, YT - E]]);          /* le contour extérieur, pour les flasques */
    volute.add(plaque(bande(MUR, E), -ZV, ZV, tole));
    volute.add(plaque(rect(RT * Math.cos(30 * D) - 2, XB, YT - E, YT), -ZV, ZV, tole));        /* le dessous de la bouche */
    volute.add(cyl('z', 7, -ZV, ZV, RT * Math.cos(30 * D), YT, tole, 16));                     /* le bec, arrondi */
    volute.add(plaque(contour, -ZV - E, -ZV, tole, [[0, 0, 40]]));                              /* flasque arrière */
    faceDe([bande(MUR, E), rect(RT * Math.cos(30 * D) - 2, XB, YT - E, YT)], H.tole, volute);
    faceDe([cercle([RT * Math.cos(30 * D), YT], 7, 16)], H.tole, volute);
    /* le flasque avant, avec son ouïe : il porte le pavillon, c'est un panneau de visite */
    const plaqueAv = plaque(contour, ZV, ZV + E, tole, [[0, 0, 192]]); plaqueAv.position.set(0, YC, 0); racine.add(plaqueAv);
    /* le pavillon : un entonnoir qui guide l'air sans le heurter, et qui plonge dans l'œil de la roue */
    const ouie = new T.Group(); ouie.position.set(0, YC, 0); racine.add(ouie);
    const PAV = [[173, 84], [173, 100], [178, 112], [190, 124], [206, 138], [228, 152], [256, 164]];
    ouie.add(revZ(PAV.concat(PAV.slice().reverse().map(([r, z]) => [r + 3, z])), alu, 64));
    /* les collerettes de la bouche (côté ventilateur) et de la gaine */
    const tube = (x0, x1, t0, t1, mat, g, mFace) => {
      g.add(boite(x0, x1, Y1 + t0, Y1 + t1, -ZV - t1, ZV + t1, mat), boite(x0, x1, Y0 - t1, Y0 - t0, -ZV - t1, ZV + t1, mat));
      g.add(boite(x0, x1, Y0 - t0, Y1 + t0, -ZV - t1, -ZV - t0, mat), boite(x0, x1, Y0 - t0, Y1 + t0, ZV + t0, ZV + t1, mat));
      if (mFace) faceDe([rect(x0, x1, Y1 + t0, Y1 + t1), rect(x0, x1, Y0 - t1, Y0 - t0)], mFace, g);
    };
    const brideV = new T.Group(); racine.add(brideV);
    tube(XB, XB + 12, 0, E + 28, peint, brideV, H.tole);

    /* ================================================================ LA ROUE À RÉACTION
       Dix aubes recourbées vers l'arrière, soudées entre un flasque arrière et un flasque d'entrée. */
    const rotor = new T.Group(); rotor.position.set(0, YC, 0); racine.add(rotor);
    const roueObj = new T.Group(); rotor.add(roueObj);
    const flasquesG = new T.Group(), aubesG = new T.Group(); roueObj.add(flasquesG, aubesG);
    flasquesG.add(cyl('z', RW, -85, -80, 0, 0, roueTole, 64));                       /* flasque arrière */
    flasquesG.add(cyl('z', 58, -118, -85, 0, 0, roueMat, 32));                       /* moyeu */
    const FL = [[176, 88], [182, 81], [192, 76.5], [215, 74.5], [250, 73]];          /* flasque d'entrée, évasé */
    flasquesG.add(revZ(FL.concat(FL.slice().reverse().map(([r, z]) => [r, z + 3])), roueTole, 64));
    const NA = 10, aubesPoly = [];
    for (let k = 0; k < NA; k++) {
      const phi0 = k * 360 / NA * D, c = [];
      for (let i = 0; i <= 10; i++) { const u = i / 10, r = 170 + 80 * u, a = phi0 + 40 * u * D; c.push([r * Math.cos(a), r * Math.sin(a)]); }
      const poly = decale(c, 2.5).concat(decale(c, -2.5).reverse());
      aubesPoly.push(poly);
      aubesG.add(plaque(poly, -80, 75, roueMat));
    }
    faceDe(aubesPoly, H.aube, aubesG);
    /* l'arbre : il traverse le flasque arrière de la volute et porte la poulie, derrière */
    const arbreObj = new T.Group(); rotor.add(arbreObj);
    arbreObj.add(cyl('z', 20, -352, 10, 0, 0, acier, 24));
    arbreObj.add(cyl('z', 50, -136, -131, 0, 0, acier, 32));
    arbreObj.add(cyl('z', 32, 8, 15, 0, 0, acier, 6));
    faceDe([cercle([0, 0], 20, 24)], H.acier, arbreObj);
    /* les poulies : deux flasques, un fond de gorge, un voile percé de cinq trous (pour voir tourner) */
    const poulie = (rp, rm) => {
      const g = new T.Group();
      g.add(disque(rp + 7, rp - 3, ZP - 20, ZP - 12, fonte), disque(rp + 7, rp - 3, ZP + 12, ZP + 20, fonte), disque(rp, rp - 3, ZP - 12, ZP + 12, fonte));
      const trous = []; for (let i = 0; i < 5; i++) trous.push([rp * 0.56 * Math.cos(i * 72 * D), rp * 0.56 * Math.sin(i * 72 * D), rp * 0.17]);
      g.add(disque(rp - 2, 0, ZP - 3, ZP + 3, fonte, trous));
      g.add(cyl('z', rm, ZP - 25, ZP + 25, 0, 0, fonte, 24));
      return g;
    };
    const poulieF = poulie(RPF, 30); rotor.add(poulieF);
    const poulieM = poulie(RPM, 22); poulieM.position.set(PM.x, PM.y, 0); racine.add(poulieM);

    /* ================================================================ LA COURROIE
       Une courroie trapézoïdale (11 mm de haut, 18 de large), tendue autour des deux poulies. */
    const ceinture = d => enveloppe(cercle([PM.x, PM.y], RPM + d, 48).concat(cercle([0, YC], RPF + d, 64)));
    const courroieG = new T.Group(); racine.add(courroieG);
    {
      const s = shape(ceinture(11)); const h = new T.Path(ceinture(0).map(p => new T.Vector2(p[0], p[1]))); s.holes.push(h);
      const g = new T.ExtrudeGeometry(s, { depth: 18, bevelEnabled: false }); g.translate(0, 0, ZP - 9);
      courroieG.add(new T.Mesh(g, courroieMat));
    }
    /* des traits de craie sur la courroie : ils font voir qu'elle avance, au rythme de la roue */
    const chemin = ceinture(5.5).reverse().map(p => V(p[0], p[1], ZP));
    const marques = K.courant(new T.CatmullRomCurve3(chemin, true, 'centripetal'), { nombre: 8, rayon: 9, couleur: 0xf6f3e8, vitesse: 300 });
    racine.add(marques.objet);

    /* ================================================================ LE MOTEUR (entier en coupe)
       Sur glissières, l'arbre vers l'arrière, la poulie derrière la volute. */
    const moteur = new T.Group(); racine.add(moteur);
    moteur.add(cyl('z', 130, -290, 90, PM.x, PM.y, moteurMat, 40));
    for (let z = -270; z < 80; z += 24) moteur.add(cyl('z', 136, z, z + 9, PM.x, PM.y, moteurMat, 40));
    moteur.add(cyl('z', 122, -300, -290, PM.x, PM.y, moteurMat, 40));
    moteur.add(cyl('z', 112, 90, 128, PM.x, PM.y, moteurNoir, 40));
    moteur.add(cyl('z', 19, -345, -290, PM.x, PM.y, moteurAcier, 16));
    moteur.add(boite(PM.x - 70, PM.x + 70, PM.y + 125, PM.y + 190, -190, -60, moteurMat, 6));
    [-100, -240].forEach(z => moteur.add(boite(PM.x - 95, PM.x + 95, 118, 160, z - 38, z + 38, moteurMat, 4)));

    /* ================================================================ LE PROTECTEUR DE COURROIE */
    const protecteur = new T.Group(); racine.add(protecteur);
    {
      const tex = (() => {
        const c = document.createElement('canvas'); c.width = c.height = 64;
        const x = c.getContext('2d'); x.fillStyle = '#a3abb2'; x.fillRect(0, 0, 64, 64);
        x.globalCompositeOperation = 'destination-out'; x.beginPath(); x.arc(32, 32, 22, 0, 2 * Math.PI); x.fill();
        const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(1 / 16, 1 / 16); t.colorSpace = T.SRGBColorSpace; return t;
      })();
      const perfore = new T.MeshStandardMaterial({ map: tex, alphaTest: 0.5, roughness: 0.5, metalness: 0.55, side: T.DoubleSide });
      const pl = new T.Mesh(new T.ShapeGeometry(shape(ceinture(40))), perfore); pl.position.z = -362; protecteur.add(pl);
      const s = shape(ceinture(40)); s.holes.push(new T.Path(ceinture(35).map(p => new T.Vector2(p[0], p[1]))));
      const g = new T.ExtrudeGeometry(s, { depth: 62, bevelEnabled: false }); g.translate(0, 0, -362);
      protecteur.add(new T.Mesh(g, C(M.zingue, 0xaeb6bd)));
      [-40, 40].forEach(x => protecteur.add(cyl('z', 6, -300, -130, x, 338, acier, 10)));
    }

    /* ================================================================ LES PALIERS ET LE CHÂSSIS */
    const paliers = new T.Group(); racine.add(paliers);
    [-205, -265].forEach(zc => {
      paliers.add(boite(-70, 70, 422, 442, zc - 30, zc + 30, fonte, 3));
      paliers.add(cyl('z', 48, zc - 30, zc + 30, 0, YC, fonte, 28));
      paliers.add(cyl('y', 6, YC + 46, YC + 62, 0, zc, laitonP, 10));
    });
    const chassis = new T.Group(); racine.add(chassis);
    [100, -100, -240].forEach(z => chassis.add(boite(-720, 340, 0, 100, z - 35, z + 35, peint, 2)));         /* longerons */
    [-100, -240].forEach(z => chassis.add(boite(-700, -390, 100, 118, z - 30, z + 30, peint, 2)));           /* glissières du moteur */
    chassis.add(boite(-110, 110, 100, 112, -300, -170, peint));                                              /* le support des paliers */
    chassis.add(boite(-110, 110, 410, 422, -300, -170, peint));
    [-85, 85].forEach(x => [-190, -280].forEach(z => chassis.add(boite(x - 18, x + 18, 112, 410, z - 18, z + 18, peint))));
    [-150, 150].forEach(x => [100, -100].forEach(z => chassis.add(boite(x - 22, x + 22, 100, YC + basDe(x) - E + 2, z - 20, z + 20, peint))));   /* les pieds de la volute */
    const supports = new T.Group(); racine.add(supports);
    [700, 1300].forEach(x => {
      [-150, 150].forEach(z => supports.add(boite(x - 20, x + 20, 0, Y0 - E, z - 20, z + 20, peint)));
      supports.add(boite(x - 30, x + 30, Y0 - E - 20, Y0 - E, -175, 175, peint));
      faceDe([rect(x - 30, x + 30, Y0 - E - 20, Y0 - E)], H.tole, supports);
    });

    /* ================================================================ LA MANCHETTE, LA GAINE */
    const manchetteG = new T.Group(); racine.add(manchetteG);
    tube(XB + 12, XG0 - 12, 0, E, souple, manchetteG, H.caout);
    [410, 430, 450].forEach(x => tube(x - 5, x + 5, E, E + 9, souple, manchetteG, H.caout));
    const gaineG = new T.Group(); racine.add(gaineG);
    tube(XG0 - 12, XG0, 0, E + 28, peint, gaineG, H.tole);
    tube(XG0, XG1, 0, E, tole, gaineG, H.tole);
    tube(XG1, XG1 + 12, 0, E + 28, peint, gaineG, H.tole);

    /* ================================================================ LE REGISTRE D'ÉQUILIBRAGE
       Quatre lames opposées liées par des engrenages, un levier et un secteur gradué. Angle 0 = ouvert. */
    const regG = new T.Group(); racine.add(regG);
    const lames = [], NL = 4, PAS = (Y1 - Y0) / NL;
    const dent = (() => {
      const pts = [], N = 16, P = 2 * Math.PI / N;
      for (let k = 0; k < N; k++) [[0, 35], [0.15, 40], [0.45, 40], [0.6, 35]].forEach(([f, r]) => pts.push([r * Math.cos((k + f) * P), r * Math.sin((k + f) * P)]));
      const g = new T.ExtrudeGeometry(shape(pts), { depth: 8, bevelEnabled: false }); g.translate(0, 0, 136); return g;
    })();
    for (let i = 0; i < NL; i++) {
      const g = new T.Group(); g.position.set(XR, Y0 + PAS * (i + 0.5), 0);
      g.add(K.mesh(new T.BoxGeometry(PAS + 1, 7, 2 * ZV - 6), lameMat));
      g.add(cyl('z', 5, -ZV - 10, i ? 146 : 164, 0, 0, acier, 10));
      const dg = new T.Mesh(dent, fonte); dg.rotation.z = (i % 2) * Math.PI / 16; g.add(dg);
      faceDe([rect(-PAS / 2, PAS / 2, -3.5, 3.5)], H.tole, g);
      regG.add(g); lames.push(g);
    }
    /* le levier, sur l'axe de la première lame, et son secteur gradué */
    {
      const lev = new T.Group();
      lev.add(boite(-20, 150, -6, 6, 146, 158, acier, 2), K.mesh(new T.SphereGeometry(10, 12, 8), noir, 150, 0, 152));
      lev.add(cyl('z', 9, 150, 164, 0, 0, acier, 6));
      lames[0].add(lev);
      const cv = document.createElement('canvas'); cv.width = cv.height = 512;
      const x = cv.getContext('2d'); x.fillStyle = '#e7e3d8'; x.beginPath(); x.moveTo(256, 256); x.arc(256, 256, 250, 0, -Math.PI / 2, true); x.closePath(); x.fill();
      x.strokeStyle = '#1b3a63'; x.fillStyle = '#1b3a63'; x.font = '700 30px Calibri, Arial, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
      for (let a = 0; a <= 90; a += 10) {
        const t = a * D, l = a % 30 ? 24 : 44; x.lineWidth = a % 30 ? 3 : 5;
        x.beginPath(); x.moveTo(256 + Math.cos(t) * 240, 256 - Math.sin(t) * 240); x.lineTo(256 + Math.cos(t) * (240 - l), 256 - Math.sin(t) * (240 - l)); x.stroke();
        if (!(a % 30)) x.fillText(String(a), 256 + Math.cos(t) * 168, 256 - Math.sin(t) * 168);
      }
      const tq = new T.CanvasTexture(cv); tq.colorSpace = T.SRGBColorSpace; tq.anisotropy = 4;
      const quad = new T.Mesh(new T.PlaneGeometry(300, 300), new T.MeshStandardMaterial({ map: tq, transparent: true, roughness: 0.6, side: T.DoubleSide }));
      quad.position.set(XR, Y0 + PAS * 0.5, ZV + E + 1.5); quad.userData.sansOmbre = true;
      const secteur = new T.Group(); secteur.add(quad); regG.add(secteur);
      regG.userData.secteur = secteur;
    }
    const poserLames = a => { lames.forEach((l, i) => { l.rotation.z = (i % 2 ? -1 : 1) * a; }); };

    /* ================================================================ LE MANOMÈTRE, AU REFOULEMENT (entier en coupe) */
    const manometre = new T.Group(); racine.add(manometre);
    const XM = 700, YD = 1085, ZD = -60;
    const cad = document.createElement('canvas'); cad.width = cad.height = 256;
    {
      const x = cad.getContext('2d');
      x.fillStyle = '#fbfaf6'; x.beginPath(); x.arc(128, 128, 126, 0, 2 * Math.PI); x.fill();
      x.strokeStyle = '#1b3a63'; x.lineWidth = 4; x.stroke();
      x.fillStyle = '#1b3a63'; x.font = '700 24px Calibri, Arial, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
      for (let v = 0; v <= 600; v += 50) {
        const a = (-225 + v / 600 * 270) * D, l = v % 100 ? 12 : 22;
        x.lineWidth = v % 100 ? 2 : 4; x.beginPath();
        x.moveTo(128 + Math.cos(a) * 112, 128 + Math.sin(a) * 112); x.lineTo(128 + Math.cos(a) * (112 - l), 128 + Math.sin(a) * (112 - l)); x.stroke();
        if (!(v % 200)) x.fillText(String(v), 128 + Math.cos(a) * 70, 128 + Math.sin(a) * 70);
      }
      x.font = '700 24px Calibri, Arial, sans-serif'; x.fillText('Pa', 128, 182);
    }
    const texCad = new T.CanvasTexture(cad); texCad.colorSpace = T.SRGBColorSpace; texCad.anisotropy = 4;
    manometre.add(cyl('z', 72, ZD - 20, ZD + 20, XM, YD, K.propre(M.plastiqueNoir), 40));
    manometre.add(K.mesh(new T.CircleGeometry(66, 40), new T.MeshBasicMaterial({ map: texCad, toneMapped: false }), XM, YD, ZD + 21));
    const aiguille = new T.Group(); aiguille.position.set(XM, YD, ZD + 23);
    aiguille.add(K.mesh(new T.BoxGeometry(4, 58, 2), K.propre(K.plastique(0xc9451a, 0.4)), 0, 26, 0));
    aiguille.add(cyl('z', 6, -1, 2, 0, 0, K.propre(M.plastiqueNoir), 12));
    manometre.add(aiguille);
    manometre.add(cyl('y', 8, Y1 + E, YD - 72, XM, ZD, laitonP, 12));                 /* la prise de pression, vissée dans la gaine */
    manometre.add(cyl('y', 14, Y1 + E, Y1 + E + 14, XM, ZD, laitonP, 6));

    /* ================================================================ L'AIR QUI CIRCULE
       Des grains qui courent dans le plan de coupe, un peu devant (z = 15) : on les voit par-dessus
       les faces coupées. Vitesses : la roue lance l'air vite, la volute le ralentit, la gaine plus encore.
       L'écart entre les grains est proportionnel à la vitesse (le débit se conserve). */
    const Z = 15;
    const P3 = (x, y, z) => V(x, YC + y, z === undefined ? Z : z);
    const flot = (pts, o) => K.courant(new T.CatmullRomCurve3(pts, false, 'centripetal'), Object.assign({ rayon: 10, couleur: AIR.souffle, pas: 70, vitesse: 400 }, o));
    const pol = (r, deg) => [r * Math.cos(deg * D), r * Math.sin(deg * D)];
    const grains = [];                                  /* { f, mult, rang, coupe } */
    const ajouter = (f, mult, rang, coupe) => { f.regler({ s: grains.length * 137.3 }); racine.add(f.objet); grains.push({ f, mult, rang, coupe }); return f; };
    /* en amont de l'ouïe : l'air arrive dans l'axe, tout droit vers le centre */
    [45, 135, 225, 315].forEach(a => {
      const [x, y] = pol(105, a);
      ajouter(flot([V(x, YC + y, 640), V(x, YC + y, 340), V(x, YC + y, 70)], { pas: 64 }), 0.65, 2, 'ferme');
    });
    const LIGNES = [{ t1: 25, e: 0.9 }, { t1: -45, e: 0.7 }, { t1: -115, e: 0.5 }, { t1: -190, e: 0.32 }, { t1: -250, e: 0.15 }, { t1: 60, e: 0 }];
    LIGNES.forEach(L => {
      const t0 = L.t1 + 25;
      /* l'œil, puis la roue : l'air part du centre et file entre les aubes vers le bord */
      const roue = [[45, t0], [100, t0], [150, t0 - 3], [190, t0 - 11], [225, t0 - 20], [252, L.t1]].map(([r, a]) => P3(...pol(r, a)));
      ajouter(flot(roue, { nombre: 3 }), 1.5, 3, 'tous');
      let yFin;
      if (L.e > 0) {
        /* la volute : le long de la spirale, jusqu'au sommet ; ceux qui sont partis les premiers finissent à l'extérieur */
        const Rl = (phi, e) => 255 + e * (RT + (RMAX - RT) * ((30 - phi) / 300) - 265);
        const n = Math.max(3, Math.ceil((L.t1 + 270) / 20)), pts = [];
        for (let i = 0; i <= n; i++) {
          const phi = L.t1 - (L.t1 + 270) * i / n, w = Math.min(1, (L.t1 - phi) / 50);
          pts.push(P3(...pol(252 * (1 - w) + Rl(phi, L.e) * w, phi)));
        }
        ajouter(flot(pts, { pas: 90 }), 1.0, 4, 'tous');
        yFin = Rl(-270, L.e);
        ajouter(flot([P3(0, yFin), P3(120, yFin), P3(260, yFin), P3(XB, yFin), P3(470, yFin), P3(700, yFin), P3(940, yFin)], { pas: 85 }), 0.7, 4, 'tous');
      } else {
        yFin = 232;
        ajouter(flot([P3(...pol(252, 60)), P3(215, 226), P3(330, 231), P3(470, yFin), P3(700, yFin), P3(940, yFin)], { pas: 85 }), 0.7, 4, 'tous');
      }
      /* après le registre : l'air passe par les fentes, puis sort de la gaine */
      ajouter(flot([P3(1060, yFin), P3(1300, yFin), P3(1560, yFin), P3(1720, yFin)], { pas: 85 }), 0.7, 4, 'tous');
    });

    /* ================================================================ L'ÉTAT */
    const PHASES = ['transmission', 'ouie', 'aubes', 'volute', 'marche'];
    const E_ = { marche: false, vit: 70, res: 55, phase: 'marche', coupe: false, demonte: false, protecteur: true };
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 });
    const air = (cle, mot) => '<b class="air air-' + cle + '">' + mot + '</b>';
    /* le point de fonctionnement : à vitesse n, pression du ventilateur = A·n² − B·Q² ; pression du réseau = R·Q² ;
       ils se croisent. Q en m³/h, pressions en Pa. Voir la fiche pour les coefficients. */
    const A = 600, QL = 8500, B = A / (QL * QL), Q0 = 3300, CC = A / (Q0 * Q0);
    const fr = r => (r + 40) / 140;
    const point = (s, r) => {
      const n = s / 100, Rr = Math.max(1e-7, CC * fr(r) * fr(r) - B), Q = n * Math.sqrt(A / (B + Rr));
      return { Q, P: Rr * Q * Q, n: 1015 * n, nMot: 1450 * n };
    };
    const rQ = q => Math.round(q / 10) * 10, rP = p => Math.round(p / 5) * 5, rN = n => Math.round(n / 10) * 10;
    const calc = () => point(E_.vit, E_.res);
    const verdict = () => {
      const d = E_.vit - E_.res;
      return d > 8 ? 'La pression disponible est forte : surveillez le débit et le bruit.'
        : d < -8 ? 'Le réseau est trop résistant pour cette commande : le débit risque d’être insuffisant.'
          : 'Zone d’équilibre : confirmez avec des mesures réelles.';
    };
    const majMesures = () => {
      const c = calc(), m = E_.marche;
      ctx.mesures([
        { libelle: 'Vitesse de rotation', valeur: (m ? nb(rN(c.n)) : '0') + ' tr/min' },
        { libelle: 'Débit', valeur: (m ? nb(rQ(c.Q)) : '0') + ' m³/h' },
        { libelle: 'Pression disponible', valeur: (m ? nb(rP(c.P)) : '0') + ' Pa' }
      ]);
    };
    const majTexte = () => {
      majMesures();
      if (!E_.marche) { ctx.dire('<strong>À l’arrêt.</strong> La roue ne tourne pas : ' + air('souffle', 'l’air') + ' ne circule pas dans le réseau.'); return; }
      const c = calc();
      ctx.dire('<strong>Commande à ' + E_.vit + ' %, résistance du réseau à ' + E_.res + ' %.</strong> La roue tourne à ' + nb(rN(c.n)) + ' tr/min et pousse '
        + air('souffle', 'l’air') + ' : ' + nb(rQ(c.Q)) + ' m³/h sous ' + nb(rP(c.P)) + ' Pa. ' + verdict() + ' <em>À l’écran, l’air est très ralenti.</em>');
    };
    const rang = () => PHASES.indexOf(E_.phase) + 1;
    const visibles = () => {
      const on = E_.marche && !E_.demonte, r = rang();
      grains.forEach(g => {
        let v = on && r >= g.rang;
        if (g.coupe === 'ferme') v = v && !E_.coupe;
        g.f.objet.visible = v;
      });
      marques.objet.visible = on;
      protecteur.visible = E_.protecteur;
    };
    const voirFaces = on => faces.forEach(m => { m.visible = on; });
    const basculerCoupe = on => {
      E_.coupe = on;
      const plan = on ? [new T.Plane(new T.Vector3(0, 0, -1), 0)] : null;
      const exclus = new Set();
      [moteur, manometre, marques.objet, ...grains.map(g => g.f.objet), ...faces].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.needsUpdate = true; } });
      });
      voirFaces(on && !E_.demonte);
      visibles();
    };

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'ouie', nom: 'L’ouïe d’aspiration et son pavillon', objets: [ouie, plaqueAv], desc: 'L’air entre ici, dans l’axe de la roue, au centre. Le pavillon, évasé comme un entonnoir, le guide sans le heurter. Le flasque qui le porte se dévisse pour visiter la roue.' },
      { id: 'roue', nom: 'La roue à aubes', objets: [aubesG], desc: 'Dix aubes recourbées vers l’arrière, soudées entre deux flasques. La roue tourne et lance l’air vers le bord, comme l’eau d’une essoreuse. C’est la roue la plus courante sur un caisson de ventilation.' },
      { id: 'volute', nom: 'La volute', objets: [volute, brideV], desc: 'Un carter de tôle en forme d’escargot. Il s’élargit tour après tour, jusqu’à la bouche de refoulement. Il recueille l’air lancé par la roue et le ralentit : sa vitesse devient de la pression. Le bec empêche l’air de tourner en rond.' },
      { id: 'arbre', nom: 'L’arbre, le moyeu et les paliers', objets: [flasquesG, arbreObj, paliers], desc: 'L’arbre porte la roue par son moyeu, entre deux flasques. Il tourne dans deux paliers graissés, boulonnés sur le châssis.' },
      { id: 'moteur', nom: 'Le moteur', objets: [moteur], desc: 'Un moteur électrique triphasé, sur glissières. À 100 % de commande, il tourne à 1 450 tr/min. Un variateur règle sa vitesse : c’est la commande du ventilateur, en pourcentage.' },
      { id: 'transmission', nom: 'Les poulies et la courroie', objets: [poulieM, poulieF, courroieG], desc: 'La petite poulie est sur le moteur, la grande sur l’arbre : la roue tourne plus lentement que le moteur (1,4 fois). La courroie doit rester tendue : on déplace le moteur sur ses glissières.' },
      { id: 'protecteur', nom: 'Le protecteur de courroie', objets: [protecteur], desc: 'Une tôle perforée qui couvre les poulies et la courroie : elle protège les mains. On ne la retire jamais machine en marche.' },
      { id: 'manchette', nom: 'La manchette souple', objets: [manchetteG], desc: 'Un manchon de toile ou de caoutchouc entre le ventilateur et la gaine. Il évite que les vibrations du ventilateur passent dans la gaine.' },
      { id: 'gaine', nom: 'La gaine de refoulement', objets: [gaineG], desc: 'Elle emmène l’air vers le réseau. Ici, elle est ouverte à son bout : le réseau continue plus loin.' },
      { id: 'registre', nom: 'Le registre d’équilibrage', objets: [regG], desc: 'Des lames qui tournent ensemble. Ouvertes, elles laissent passer l’air ; fermées, elles le freinent. Fermer le registre, c’est durcir le réseau. Le levier montre l’angle sur un secteur gradué.' },
      { id: 'manometre', nom: 'Le manomètre', objets: [manometre], desc: 'Il lit la pression de l’air dans la gaine, en pascals (Pa), par une prise percée avant le registre.' },
      { id: 'chassis', nom: 'Le châssis', objets: [chassis, supports], desc: 'Des profilés d’acier qui portent le ventilateur, le moteur, les paliers et la gaine. Le moteur glisse sur ses rails pour régler la tension de la courroie.' }
    ];

    const commandes = [
      { id: 'marche', type: 'choix', options: [['arret', 'Arrêt'], ['marche', 'En marche']], valeur: 'arret' },
      { id: 'vitesse', type: 'curseur', libelle: 'Commande ventilateur', min: 20, max: 100, pas: 1, unite: '%', valeur: 70 },
      { id: 'resistance', type: 'curseur', libelle: 'Résistance réseau', min: 20, max: 100, pas: 1, unite: '%', valeur: 55 }
    ];

    /* les nombres des étapes sortent du même calcul que les mesures */
    const p5 = point(70, 55), p6 = point(70, 85), p7 = point(85, 85);
    const etapes = [
      { titre: 'Le ventilateur, tel qu’on le pose', piece: null, voirDedans: false, eclate: false,
        actions: [['marche', 'arret'], ['vitesse', 70], ['resistance', 55], ['phase', 'marche'], ['protecteur', 'pose']],
        vue: { azimut: 28, elevation: 20, zoom: 1.0, cible: null },
        texte: 'Un ventilateur centrifuge sur son châssis. ' + air('souffle', 'L’air') + ' entre par l’ouïe, devant, et sort par la bouche, à droite, vers la gaine. Le moteur est à côté, la courroie est derrière.' },
      { titre: 'Le moteur entraîne la roue par la courroie', piece: 'transmission', voirDedans: false, eclate: false,
        actions: [['marche', 'marche'], ['vitesse', 70], ['resistance', 55], ['phase', 'transmission'], ['protecteur', 'ote']],
        vue: { azimut: 152, elevation: 22, zoom: 1.9, cible: [-250, 380, -320] },
        texte: 'À 70 % de commande, le moteur tourne à ' + nb(rN(p5.nMot)) + ' tr/min. La courroie passe de sa petite poulie à la grande, sur l’arbre : la roue tourne plus lentement, à ' + nb(rN(p5.n)) + ' tr/min. Le protecteur est ôté pour qu’on voie la courroie ; sur l’appareil, il reste en place.' },
      { titre: 'L’air entre par l’ouïe, au centre', piece: 'ouie', voirDedans: false, eclate: false,
        actions: [['marche', 'marche'], ['vitesse', 70], ['resistance', 55], ['phase', 'ouie'], ['protecteur', 'pose']],
        vue: { azimut: 78, elevation: 16, zoom: 1.5, cible: [0, 470, 250] },
        texte: 'La roue tourne et aspire. ' + air('souffle', 'L’air') + ' arrive dans l’axe, par l’entonnoir de l’ouïe, droit vers le centre de la roue.' },
      { titre: 'Les aubes lancent l’air vers le bord', piece: 'roue', voirDedans: true, eclate: false,
        actions: [['marche', 'marche'], ['vitesse', 70], ['resistance', 55], ['phase', 'aubes'], ['protecteur', 'pose']],
        vue: { azimut: 4, elevation: 5, zoom: 3.3, cible: [0, 470, 0] },
        texte: 'Au centre, ' + air('souffle', 'l’air') + ' est pris par les aubes. Elles tournent avec la roue et le lancent vers le bord : il file en spirale, de plus en plus vite.' },
      { titre: 'La volute recueille l’air et le ralentit', piece: 'volute', voirDedans: true, eclate: false,
        actions: [['marche', 'marche'], ['vitesse', 70], ['resistance', 55], ['phase', 'volute'], ['protecteur', 'pose']],
        vue: { azimut: 4, elevation: 6, zoom: 2.0, cible: [180, 700, 0] },
        texte: 'À la sortie de la roue, ' + air('souffle', 'l’air') + ' est très rapide. La volute s’élargit tour après tour : l’air ralentit et sa vitesse devient de la pression. Le manomètre, au refoulement, lit ' + nb(rP(p5.P)) + ' Pa.' },
      { titre: 'On ferme le registre : le réseau résiste plus', piece: 'registre', voirDedans: true, eclate: false,
        actions: [['marche', 'marche'], ['vitesse', 70], ['resistance', 85], ['phase', 'marche'], ['protecteur', 'pose']],
        vue: { azimut: 8, elevation: 8, zoom: 2.5, cible: [880, 790, 0] },
        texte: 'Les lames se referment : le réseau est plus dur à traverser. Le débit baisse (de ' + nb(rQ(p5.Q)) + ' à ' + nb(rQ(p6.Q)) + ' m³/h) et la pression monte (de ' + nb(rP(p5.P)) + ' à ' + nb(rP(p6.P)) + ' Pa) : le point de fonctionnement glisse.' },
      { titre: 'On augmente la vitesse : débit et pression montent', piece: 'moteur', voirDedans: true, eclate: false,
        actions: [['marche', 'marche'], ['vitesse', 85], ['resistance', 85], ['phase', 'marche'], ['protecteur', 'pose']],
        vue: { azimut: 14, elevation: 14, zoom: 1.1, cible: null },
        texte: 'La commande passe de 70 à 85 % : la roue tourne plus vite, de ' + nb(rN(p6.n)) + ' à ' + nb(rN(p7.n)) + ' tr/min. Le débit remonte à ' + nb(rQ(p7.Q)) + ' m³/h et la pression à ' + nb(rP(p7.P)) + ' Pa. C’est payé en électricité et en bruit.' }
    ];

    /* l'éclaté, dans l'ordre réel du démontage : protecteur, courroie, moteur et poulie, poulie de l'arbre,
       gaine et registre, manchette, flasque avant (avec son pavillon), roue */
    const eclate = [
      { objets: [protecteur], vers: [0, 0, -260], debut: 0, fin: 0.35 },
      { objets: [courroieG], vers: [0, 0, -160], debut: 0.1, fin: 0.45 },
      { objets: [moteur, poulieM], vers: [-260, 0, -60], debut: 0.2, fin: 0.6 },
      { objets: [poulieF], vers: [0, 0, -200], debut: 0.25, fin: 0.65 },
      { objets: [gaineG, regG, manometre, supports], vers: [420, 0, 0], debut: 0.1, fin: 0.55 },
      { objets: [manchetteG], vers: [170, 0, 0], debut: 0.3, fin: 0.7 },
      { objets: [ouie, plaqueAv], vers: [0, 0, 220], debut: 0.4, fin: 0.8 },
      { objets: [roueObj], vers: [0, 0, 460], debut: 0.55, fin: 1 }
    ];

    /* ---------------------------------------------------------------- départ */
    let angle = 0, w = 0, qv = 0, pv = 0, ang = (E_.res - 20) / 80 * 80 * D, aig = 0, coupeAvant = false;
    const WMAX = 2 * Math.PI * 0.55, BASE = 520;
    poserLames(ang);
    aiguille.rotation.z = 135 * D;
    basculerCoupe(false);
    majTexte();

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: -48, elevation: 20, zoom: 0.8, cible: [300, 450, -40] },
      vue: { azimut: 28, elevation: 20, cadre: [volute, plaqueAv, ouie, moteur, gaineG, supports, chassis], marge: 0.78 },
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'phase') E_.phase = v;
        if (id === 'protecteur') E_.protecteur = v !== 'ote';
        if (id === 'marche') { E_.marche = v === 'marche'; ctx.regler('marche', v); }
        if (id === 'vitesse') { E_.vit = +v; ctx.regler('vitesse', +v); }
        if (id === 'resistance') { E_.res = +v; ctx.regler('resistance', +v); }
        visibles(); majTexte();
      },
      /* l'éclaté se regarde sur l'appareil entier : on referme la coupe le temps de l'éclaté */
      surEclate(on) {
        E_.demonte = on;
        if (on) { coupeAvant = E_.coupe; if (E_.coupe) basculerCoupe(false); } else if (coupeAvant) { coupeAvant = false; basculerCoupe(true); }
        visibles();
      },
      animer(dt) {
        const actif = E_.marche && !E_.demonte, c = calc();
        w = K.vers(w, actif ? E_.vit / 100 * WMAX : 0, 1.6, dt); angle += w * dt;
        rotor.rotation.z = -angle; poulieM.rotation.z = -angle * RAPPORT;
        qv = K.vers(qv, actif ? c.Q : 0, 1.6, dt);
        pv = K.vers(pv, actif ? c.P : 0, 3, dt);
        const angCible = (E_.res - 20) / 80 * 80 * D;
        ang = K.vers(ang, angCible, 4, dt); poserLames(ang);
        aiguille.rotation.z = -(-135 + K.clamp(pv, 0, 620) / 600 * 270) * D;
        const kq = qv / 3000;
        grains.forEach(g => { g.f.regler({ vitesse: BASE * g.mult * kq }); if (kq > 0.01 && g.f.objet.visible) g.f.animer(dt); });
        marques.regler({ vitesse: w * (RPF + 5) }); if (w > 0.01 && marques.objet.visible) marques.animer(dt);
        return w > 0.002 || qv > 1 || Math.abs(ang - angCible) > 1e-3 || Math.abs(pv - (actif ? c.P : 0)) > 0.5 || actif;
      }
    };
  }, { famille: 'ventilation', titre: 'Le ventilateur centrifuge', stations: ['ventilateur-equilibrage'] });
})();
