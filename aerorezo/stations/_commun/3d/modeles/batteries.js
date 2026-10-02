/* AéroRézo 3D — famille « batteries » : la batterie à eau (chaude ou froide) d'une centrale.
   Unités : mm. Repère : X dans le sens de l'air (de gauche à droite), Y vers le haut, Z vers
   l'avant (+Z = la porte de visite et le côté raccordements, celui qu'on voit).

   CE QUE L'ÉLÈVE DOIT VOIR : une batterie n'est pas un bloc coloré. C'est un faisceau de fines
   ailettes d'aluminium enfilées sur des tubes de cuivre. L'eau circule DANS les tubes ; les
   ailettes prennent sa température ; l'air passe ENTRE les ailettes et ne touche jamais l'eau ;
   il ressort plus chaud (ou plus froid). En froid, la vapeur de l'air se condense sur les
   ailettes plus froides que son point de rosée : l'eau coule au bac, puis au siphon.

   « Voir en coupe » retire la moitié avant (z > 0) : on voit la plaque d'une ailette percée de ses
   tubes (cuivre + eau), le bac et le siphon. À droite, devant, un AGRANDISSEMENT (environ ×6) :
   un tube coupé dans sa longueur et dix ailettes vues par la tranche — c'est là qu'on voit l'eau
   dans le tube et l'air entre les ailettes (une texture suffit pour les ailettes de la batterie
   elle-même, comme dans cta.js).

   Couleurs de l'air (communes à AéroRézo, toujours doublées d'un mot) :
     air repris (à l'entrée) jaune 0xd9a21b      air soufflé (traité, en sortie) bleu 0x2f7fd6
   Eau dans un tube : chaude rouge 0xd9472b, glacée bleu 0x2f7fd6.
   La vapeur d'eau de l'air : points clairs (la même avant et après en chaud ; moins après en froid).

   Options (ctx.options), toutes facultatives :
     mode 'chaude' | 'froide' (défaut chaude) · debit m³/h (défaut 2 500) · ecart K (défaut 9)
     temperature °C de l'air entrant (défaut 26) · rh % d'humidité relative de l'air entrant (défaut 65) */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('batterie', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const D = Math.PI / 180;
    const AIR = { repris: 0xd9a21b, souffle: 0x2f7fd6 };
    const EAU = { chaude: 0xd9472b, froide: 0x2f7fd6 };
    const opt = ctx.options || {};
    const num = (v, d) => (v === undefined || v === null || v === '' || isNaN(+v)) ? d : +v;

    /* ---------------------------------------------------------------- matières
       Tout ce qui se coupe a sa matière propre, double face. Ce qui reste entier en coupe
       (sondes, siphon, agrandissement) a SES matières : le plan de coupe se règle par matière. */
    const C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; return c; };
    const panneau = C(K.plastique(0xdcdeda, 0.55));
    const profil = C(M.aluminium, 0xb7bdc4);
    const galva = C(M.zingue, 0xbfc5c9);
    const alu = C(M.aluminium, 0xaeb5bc);
    const cuivre = C(M.cuivre);
    const plaqueBat = C(M.zingue, 0xb9bfc4);
    const capMat = C(M.zingue, 0xb9bfc4);
    const tuyauMat = C(K.plastique(0xc0392b, 0.42));
    const laiton = C(M.laiton);
    const servo = C(K.plastique(0x3a4047, 0.5));
    const noir = C(M.plastiqueNoir);
    const inox = C(M.acier, 0xcfd5da);
    const marine = C(K.plastique(0x1b3a63, 0.5));
    const eauBacMat = new T.MeshStandardMaterial({ color: 0x5fa6e6, roughness: 0.2, transparent: true, opacity: 0.55, depthWrite: false });
    const stripesMat = (() => {
      const c = document.createElement('canvas'); c.width = c.height = 16;
      const x = c.getContext('2d'); x.fillStyle = '#d3d8dc'; x.fillRect(0, 0, 16, 16);
      x.fillStyle = '#8c949c'; x.fillRect(0, 0, 4, 16);
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(200, 1); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4;
      return C(new T.MeshStandardMaterial({ map: t, roughness: 0.5, metalness: 0.55 }));
    })();
    /* hors coupe */
    const sondeMat = C(K.plastique(0xf1efe8, 0.5));
    const tigeMat = C(M.acier, 0xcfd5da);
    const pvcOpaque = C(K.plastique(0xe9ece9, 0.45));
    const trapMat = C(M.transparent);
    const eauTrapMat = C(K.plastique(0x2f7fd6, 0.2));
    const avaloirMat = C(M.acier, 0x9aa3ab);
    const ailL = C(M.aluminium, 0xd5dade);
    const baseL = C(K.plastique(0x5b6570, 0.6));
    const cuivreL = C(M.cuivre);
    const eauInt = C(K.plastique(0x7a2a1c, 0.55));

    const boite = (x0, x1, y0, y1, z0, z1, mat, r) => {
      const g = r ? K.boite(x1 - x0, y1 - y0, z1 - z0, r) : new T.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
      return K.mesh(g, mat, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    };
    const cyl = (axe, r, a0, a1, c1, c2, mat, seg) => {
      const g = new T.CylinderGeometry(r, r, a1 - a0, seg || 20);
      if (axe === 'x') g.rotateZ(Math.PI / 2); else if (axe === 'z') g.rotateX(Math.PI / 2);
      const m = new T.Mesh(g, mat), c = (a0 + a1) / 2;
      if (axe === 'x') m.position.set(c, c1, c2); else if (axe === 'y') m.position.set(c1, c, c2); else m.position.set(c1, c2, c);
      return m;
    };
    const bille = (x, y, z, r, mat) => K.mesh(new T.SphereGeometry(r, 14, 10), mat, x, y, z);

    /* ================================================================ LES COTES */
    const Y0 = 300, YF = 325, YT = 940, Y1 = 965;         /* dessous, plancher, plafond intérieur, dessus */
    const ZC = 500, ZI = 475;                             /* demi-largeur extérieure et intérieure du caisson */
    const PX0 = 300, PX1 = 400, PZ = 400, PY0 = 400, PY1 = 900;   /* le faisceau d'ailettes : 100 × 800 × 500 */
    const ROWX = [312.5, 337.5, 362.5, 387.5];            /* quatre rangs, de l'amont à l'aval */
    const NK = 19, yA = k => 412.5 + 25 * k, yB = k => 425 + 25 * k;
    const XIN = 440, XOUT = 260, ZCOL = 445;              /* collecteurs : l'eau entre côté aval (contre-courant) */
    const ZP = 406;                                       /* face extérieure des plaques d'extrémité */

    const caisson = new T.Group(), capot = new T.Group(), batterie = new T.Group(), bac = new T.Group(), siphon = new T.Group(), tuyauterie = new T.Group();
    racine.add(caisson, capot, batterie, bac, siphon, tuyauterie);

    /* ================================================================ LE CAISSON */
    const chassis = new T.Group();
    [50, 650].forEach(x => [[425, 475], [-475, -425]].forEach(([a, b]) => chassis.add(boite(x - 25, x + 25, 0, 300, a, b, galva))));
    [[440, 460], [-460, -440]].forEach(([a, b]) => chassis.add(boite(25, 675, 250, 300, a, b, galva)));
    [50, 650].forEach(x => chassis.add(boite(x - 20, x + 20, 255, 300, -475, 475, galva)));
    caisson.add(chassis);
    caisson.add(boite(0, 700, Y0, YF, -ZC, ZC, panneau, 3));                 /* le dessous */
    caisson.add(boite(0, 700, YF, YT, -ZC, -ZI, panneau, 3));                /* le fond */
    capot.add(boite(0, 700, YT, Y1, -ZC, ZC, panneau, 3));                   /* le dessus */
    /* la porte de visite : percée pour l'arrivée et le retour d'eau */
    const sf = new T.Shape();
    sf.moveTo(0, YF); sf.lineTo(700, YF); sf.lineTo(700, YT); sf.lineTo(0, YT); sf.lineTo(0, YF);
    [[XIN, 410], [XOUT, 905]].forEach(([x, y]) => { const h = new T.Path(); h.absarc(x, y, 26, 0, Math.PI * 2, true); sf.holes.push(h); });
    const avant = new T.Mesh(new T.ExtrudeGeometry(sf, { depth: 25, bevelEnabled: false, curveSegments: 24 }), panneau);
    avant.position.z = ZI;
    caisson.add(avant);
    const poignee = (x, y) => {
      const g = new T.Group();
      g.add(boite(-14, 14, -14, 14, 0, 14, noir, 3), boite(-10, 10, -70, 10, 14, 30, noir, 4));
      g.position.set(x, y, ZC); return g;
    };
    caisson.add(poignee(640, 640), poignee(640, 480));
    [440, 820].forEach(y => caisson.add(cyl('y', 9, y - 40, y + 40, 30, ZC + 4, profil, 12)));
    /* la flèche de sens de l'air, collée sur la porte (un marquage réel) */
    const fl = new T.Shape();
    [[-130, -20], [50, -20], [50, -50], [130, 0], [50, 50], [50, 20], [-130, 20]].forEach((p, i) => i ? fl.lineTo(p[0], p[1]) : fl.moveTo(p[0], p[1]));
    caisson.add(K.mesh(new T.ShapeGeometry(fl), marine, 350, 700, ZC + 0.6));
    /* les tronçons de gaine de part et d'autre, avec leurs brides */
    const gaineX = (x0, x1) => {
      const g = new T.Group();
      g.add(boite(x0, x1, YT, YT + 8, -ZI - 8, ZI + 8, galva), boite(x0, x1, YF - 8, YF, -ZI - 8, ZI + 8, galva));
      g.add(boite(x0, x1, YF, YT, -ZI - 8, -ZI, galva), boite(x0, x1, YF, YT, ZI, ZI + 8, galva));
      return g;
    };
    caisson.add(gaineX(-250, 0), gaineX(700, 950));
    const BRIDES = [-250, 0, 700, 950];
    BRIDES.forEach(x => {
      const x0 = x - 6, x1 = x + 6;
      caisson.add(boite(x0, x1, YT, YT + 20, -ZI - 35, ZI + 35, profil), boite(x0, x1, YF - 20, YF, -ZI - 35, ZI + 35, profil));
      caisson.add(boite(x0, x1, YF, YT, ZI, ZI + 35, profil), boite(x0, x1, YF, YT, -ZI - 35, -ZI, profil));
    });

    /* ================================================================ LE FAISCEAU D'AILETTES ET SES PLAQUES */
    const packBloc = boite(PX0, PX1, PY0, PY1, -PZ, PZ, alu);
    batterie.add(packBloc);
    const stripes = new T.Group();
    [PX0 - 0.3, PX1 + 0.3].forEach((x, i) => {
      const p = new T.Mesh(new T.PlaneGeometry(2 * PZ, PY1 - PY0), stripesMat);
      p.rotation.y = (i ? 1 : -1) * Math.PI / 2; p.position.set(x, (PY0 + PY1) / 2, 0); stripes.add(p);
    });
    batterie.add(stripes);
    const plaques = new T.Group();
    plaques.add(boite(PX0, PX1, PY0 - 15, PY1 + 15, PZ, ZP, plaqueBat), boite(PX0, PX1, PY0 - 15, PY1 + 15, -ZP, -PZ, plaqueBat));
    plaques.add(boite(PX0, PX1, PY0 - 15, PY0, -ZP, ZP, plaqueBat), boite(PX0, PX1, PY1, PY1 + 15, -ZP, ZP, plaqueBat));
    /* les tôles d'obturation : l'air doit passer entre les ailettes, pas à côté */
    const tole = x => {
      const s = new T.Shape();
      s.moveTo(-ZI, 380); s.lineTo(ZI, 380); s.lineTo(ZI, YT); s.lineTo(-ZI, YT); s.lineTo(-ZI, 380);
      const h = new T.Path(); h.moveTo(-PZ, PY0); h.lineTo(-PZ, PY1); h.lineTo(PZ, PY1); h.lineTo(PZ, PY0); h.lineTo(-PZ, PY0);
      s.holes.push(h);
      const g = new T.ExtrudeGeometry(s, { depth: 4, bevelEnabled: false });
      g.rotateY(Math.PI / 2);
      const m = new T.Mesh(g, plaqueBat); m.position.x = x; return m;
    };
    plaques.add(tole(PX0 - 4), tole(PX1));
    batterie.add(plaques);

    /* les tubes en épingle : seuls leurs bouts dépassent des plaques (le reste est dans le faisceau) */
    const R_COUDE = Math.hypot(25, 12.5) / 2;
    const geoCoude = new T.TorusGeometry(R_COUDE, 8, 6, 10, Math.PI);
    const coudes = (liste, zc, s) => {
      const im = new T.InstancedMesh(geoCoude, cuivre, liste.length);
      liste.forEach(([P, Q], i) => {
        const ex = V(Q[0] - P[0], Q[1] - P[1], 0).normalize(), ey = V(0, 0, s), ez = new T.Vector3().crossVectors(ex, ey);
        const m = new T.Matrix4().makeBasis(ex, ey, ez); m.setPosition((P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2, zc);
        im.setMatrixAt(i, m);
      });
      im.instanceMatrix.needsUpdate = true; return im;
    };
    const arriere = [], retour = [];
    for (let k = 0; k < NK; k++) {
      arriere.push([[ROWX[3], yB(k)], [ROWX[2], yA(k)]], [[ROWX[1], yB(k)], [ROWX[0], yA(k)]]);
      retour.push([[ROWX[2], yA(k)], [ROWX[1], yB(k)]]);
    }
    const tubes = new T.Group(), tubesAr = new T.Group(), tubesAv = new T.Group();
    tubesAr.add(coudes(arriere, -ZP, -1));
    tubesAv.add(coudes(retour, ZP, 1));
    const geoBout = new T.CylinderGeometry(8, 8, 34, 8); geoBout.rotateX(Math.PI / 2);
    const geoBranche = new T.CylinderGeometry(8, 8, 52.5, 8); geoBranche.rotateZ(Math.PI / 2);
    const bouts = new T.InstancedMesh(geoBout, cuivre, 2 * NK), branches = new T.InstancedMesh(geoBranche, cuivre, 2 * NK);
    for (let k = 0; k < NK; k++) {
      bouts.setMatrixAt(2 * k, new T.Matrix4().makeTranslation(ROWX[0], yA(k), (ZP + 440) / 2));
      bouts.setMatrixAt(2 * k + 1, new T.Matrix4().makeTranslation(ROWX[3], yB(k), (ZP + 440) / 2));
      branches.setMatrixAt(2 * k, new T.Matrix4().makeTranslation((ROWX[0] + XOUT) / 2, yA(k), 440));
      branches.setMatrixAt(2 * k + 1, new T.Matrix4().makeTranslation((ROWX[3] + XIN) / 2, yB(k), 440));
    }
    bouts.instanceMatrix.needsUpdate = true; branches.instanceMatrix.needsUpdate = true;
    tubesAv.add(bouts, branches);
    tubes.add(tubesAr, tubesAv);
    batterie.add(tubes);
    /* les collecteurs : l'eau arrive en bas, côté aval, et repart en haut, côté amont */
    const collecteurs = new T.Group();
    [XIN, XOUT].forEach(x => {
      collecteurs.add(cyl('y', 21, 392, 908, x, ZCOL, cuivre, 20));
      collecteurs.add(cyl('y', 25, 386, 394, x, ZCOL, capMat, 20), cyl('y', 25, 906, 914, x, ZCOL, capMat, 20));
    });
    batterie.add(collecteurs);

    /* ================================================================ LA TUYAUTERIE, LA VANNE, LE PURGEUR, LA VIDANGE */
    const pipes = new T.Group(), vanne = new T.Group(), purgVid = new T.Group();
    const R = 24, ZT = 560;
    pipes.add(cyl('z', R, 450, 524, XIN, 410, tuyauMat));                       /* de la vanne au collecteur d'arrivée */
    pipes.add(cyl('y', R, 60, 350, XIN, ZT, tuyauMat), bille(XIN, 60, ZT, R + 2, tuyauMat));
    pipes.add(cyl('x', R, XIN, 700, 60, ZT, tuyauMat), cyl('x', 34, 700, 712, 60, ZT, laiton, 20));
    pipes.add(cyl('x', R, XOUT, 404, 410, ZT, tuyauMat));                         /* le contournement */
    pipes.add(cyl('z', R, 450, ZT, XOUT, 905, tuyauMat), bille(XOUT, 905, ZT, R + 2, tuyauMat));
    pipes.add(cyl('y', R, 60, 905, XOUT, ZT, tuyauMat), bille(XOUT, 60, ZT, R + 2, tuyauMat));
    pipes.add(cyl('x', R, -40, XOUT, 60, ZT, tuyauMat), cyl('x', 34, -52, -40, 60, ZT, laiton, 20));
    /* la vanne trois voies : un corps de laiton, trois piquages, un servomoteur dessus */
    vanne.add(cyl('y', 34, 380, 440, XIN, ZT, laiton, 24));
    vanne.add(cyl('z', 26, 520, ZT, XIN, 410, laiton), cyl('z', 34, 522, 532, XIN, 410, laiton, 20));
    vanne.add(cyl('y', 26, 350, 380, XIN, ZT, laiton));
    vanne.add(cyl('x', 26, 404, XIN, 410, ZT, laiton));
    vanne.add(cyl('y', 20, 440, 490, XIN, ZT, laiton, 16));
    vanne.add(boite(XIN - 60, XIN + 60, 490, 580, ZT - 45, ZT + 45, servo, 8));
    vanne.add(cyl('y', 10, 580, 596, XIN, ZT, noir, 12));
    /* le purgeur en haut (point haut), la vidange en bas (point bas) */
    purgVid.add(cyl('y', 14, 905, 950, XOUT, ZT, laiton, 14), cyl('y', 22, 950, 1000, XOUT, ZT, laiton, 20), cyl('y', 14, 1000, 1020, XOUT, ZT, noir, 14));
    purgVid.add(cyl('y', 10, 350, 410, XIN, 512, laiton, 12), cyl('y', 16, 326, 350, XIN, 512, laiton, 16));
    purgVid.add(cyl('z', 7, 512, 548, XIN, 336, laiton, 10), cyl('x', 4, XIN - 22, XIN + 22, 346, 512, noir, 8));
    tuyauterie.add(pipes, vanne, purgVid);

    /* ================================================================ LE BAC À CONDENSATS */
    const sb = new T.Shape(); sb.moveTo(200, 338); sb.lineTo(560, 330); sb.lineTo(560, 334); sb.lineTo(200, 342); sb.lineTo(200, 338);
    const gb = new T.ExtrudeGeometry(sb, { depth: 940, bevelEnabled: false }); gb.translate(0, 0, -470);
    bac.add(new T.Mesh(gb, inox));
    bac.add(boite(200, 560, 330, 380, 466, 470, inox), boite(200, 560, 330, 380, -470, -466, inox));
    bac.add(boite(200, 204, 338, 380, -470, 470, inox), boite(556, 560, 330, 380, -470, 470, inox));
    bac.add(cyl('y', 22, 334, 342, 545, 0, inox, 20), cyl('y', 15, 341.2, 341.9, 545, 0, noir, 20));
    const eauBac = boite(206, 554, 335, 351, -464, 464, eauBacMat);
    eauBac.userData.voile = true; eauBac.userData.sansOmbre = true; eauBac.visible = false;
    bac.add(eauBac);

    /* ================================================================ LE SIPHON ET L'ÉVACUATION */
    const pointsTrap = [[545, 260, 0], [545, 200, 0], [560, 150, 0], [595, 122, 0], [630, 122, 0], [662, 150, 0], [675, 200, 0], [675, 226, 0]];
    siphon.add(cyl('y', 16, 255, 336, 545, 0, pvcOpaque, 16));
    const trap = K.fil(pointsTrap, 17, trapMat, { pas: 4 });
    siphon.add(trap.mesh);
    const niveau = 178;
    const enEau = trap.courbe.getSpacedPoints(120).filter(p => p.y <= niveau);
    siphon.add(K.fil(enEau, 14.5, eauTrapMat, { pas: 3 }).mesh);
    siphon.add(bille(675, 226, 0, 18, pvcOpaque), cyl('x', 16, 675, 800, 226, 0, pvcOpaque, 16), bille(800, 226, 0, 18, pvcOpaque));
    siphon.add(cyl('y', 16, 10, 226, 800, 0, pvcOpaque, 16));
    siphon.add(boite(740, 860, 0, 10, -60, 60, avaloirMat), cyl('y', 22, 9, 11, 800, 0, noir, 16));

    /* ================================================================ LES SONDES (hors coupe : derrière le plan) */
    const sondes = new T.Group();
    const faireSonde = x => {
      const g = new T.Group();
      g.add(boite(x - 50, x + 50, Y1 + 8, Y1 + 72, -172, -128, sondeMat, 6));
      g.add(cyl('y', 14, Y1, Y1 + 8, x, -150, tigeMat, 16), cyl('y', 5, 700, Y1, x, -150, tigeMat, 10));
      const e = K.ecran(78, 36, { texte: ['--', '--'] });
      e.mesh.position.set(x, Y1 + 40, -127.6); g.add(e.mesh);
      sondes.add(g); return e;
    };
    const ecranIn = faireSonde(100), ecranOut = faireSonde(600);
    capot.add(sondes);

    /* ================================================================ L'AGRANDISSEMENT (hors coupe, devant, à droite)
       Même orientation que la batterie : l'air va de gauche à droite, le tube court le long de Z.
       Un plan de coupe horizontal passe par l'axe du tube : le demi-tube montre l'eau, les
       ailettes sont vues par la tranche (épaissies pour qu'on les voie). Vu de dessus. */
    const loupe = new T.Group(); loupe.position.set(900, 130, 720); racine.add(loupe);
    const RT = 48, RI = 43, PAS = 27, NF = 8, TH = 3, HP = 90;      /* échelle ≈ ×6 : tube Ø 16 mm → 96 mm */
    const baseLmesh = boite(-135, 135, -130, -HP, -140, 140, baseL, 3);
    loupe.add(baseLmesh);
    const plaquesL = new T.Group();
    {
      const s = new T.Shape();
      s.moveTo(-115, -HP); s.lineTo(115, -HP); s.lineTo(115, 0); s.lineTo(RT, 0); s.absarc(0, 0, RT, 0, -Math.PI, true); s.lineTo(-115, 0); s.lineTo(-115, -HP);
      const g = new T.ExtrudeGeometry(s, { depth: TH, bevelEnabled: false, curveSegments: 20 });
      for (let i = 0; i < NF; i++) { const p = new T.Mesh(g, ailL); p.position.z = (i - (NF - 1) / 2) * PAS - TH / 2; plaquesL.add(p); }
    }
    loupe.add(plaquesL);
    const tubeL = new T.Group();
    const demi = (r, mat) => { const g = new T.CylinderGeometry(r, r, 300, 32, 1, true, -Math.PI / 2, Math.PI); g.rotateX(Math.PI / 2); return new T.Mesh(g, mat); };
    tubeL.add(demi(RT, cuivreL), demi(RI, eauInt));
    tubeL.add(boite(-RT, -RI, -1, 0, -150, 150, cuivreL), boite(RI, RT, -1, 0, -150, 150, cuivreL));
    loupe.add(tubeL);
    /* l'eau dans le tube : des grains qui avancent le long de Z */
    const eauFlot = K.courant(new T.CatmullRomCurve3([V(0, -20, 145), V(0, -20, -145)], false, 'centripetal'), { pas: 60, rayon: 12, couleur: EAU.chaude, vitesse: 160 });
    loupe.add(eauFlot.objet);
    /* l'air entre les ailettes : il contourne le tube par en dessous (jaune avant, bleu après) */
    const trajet = new T.CatmullRomCurve3([[-125, -28], [-90, -32], [-64, -50], [-32, -64], [0, -70], [32, -64], [64, -50], [90, -32], [125, -28]].map(p => V(p[0], p[1], 0)), false, 'centripetal');
    const NG = 5, GAPS = NF - 1;
    const geoGrain = new T.SphereGeometry(7, 8, 6);
    const grainsJ = new T.InstancedMesh(geoGrain, K.lumineux(AIR.repris), GAPS * NG), grainsB = new T.InstancedMesh(geoGrain, K.lumineux(AIR.souffle), GAPS * NG);
    [grainsJ, grainsB].forEach(g => { g.userData.sansOmbre = true; g.frustumCulled = false; loupe.add(g); });
    let phaseL = 0;
    const m4 = new T.Matrix4(), pt = new T.Vector3(), qI = new T.Quaternion(), un = new T.Vector3(1, 1, 1);
    const poserGrainsLoupe = () => {
      let nj = 0, nb = 0;
      for (let g = 0; g < GAPS; g++) {
        const z = (g - (GAPS - 1) / 2) * PAS;
        for (let i = 0; i < NG; i++) {
          let u = (i / NG + (g % 2) * 0.1 + phaseL) % 1; if (u < 0) u += 1;
          trajet.getPointAt(u, pt); pt.z = z; m4.compose(pt, qI, un);
          if (u < 0.5) grainsJ.setMatrixAt(nj++, m4); else grainsB.setMatrixAt(nb++, m4);
        }
      }
      grainsJ.count = nj; grainsB.count = nb;
      grainsJ.instanceMatrix.needsUpdate = true; grainsB.instanceMatrix.needsUpdate = true;
    };
    poserGrainsLoupe();

    /* ================================================================ LES FACES DE COUPE (plan z = 0) */
    const hachures = (fond, trait, pas, ep) => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = fond; x.fillRect(0, 0, 64, 64);
      x.strokeStyle = trait; x.lineWidth = ep || 5;
      for (let i = -64; i <= 64; i += 32) { x.beginPath(); x.moveTo(i, 64); x.lineTo(i + 64, 0); x.stroke(); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / pas, 1 / pas);
      return new T.MeshStandardMaterial({ map: t, roughness: 0.8, side: T.DoubleSide });
    };
    const H = {
      isolant: hachures('#efe2a8', '#9b8a45', 26, 4),
      tole: new T.MeshStandardMaterial({ color: 0x59636d, roughness: 0.5, side: T.DoubleSide })
    };
    const rect = (x0, x1, y0, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    const faceDe = (polys, mat, groupe) => {
      const g = new T.ShapeGeometry(polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1])))));
      const m = new T.Mesh(g, mat); m.position.z = 0.5; m.userData.sansOmbre = true; m.castShadow = false;
      groupe.add(m); return m;
    };
    const groupeFaces = parent => { const g = new T.Group(); g.visible = false; parent.add(g); return g; };
    const facesCaisson = groupeFaces(caisson), facesCapot = groupeFaces(capot), facesBat = groupeFaces(batterie), facesBac = groupeFaces(bac);
    faceDe([rect(0, 700, Y0, YF)], H.isolant, facesCaisson);
    faceDe([rect(0, 700, YT, Y1)], H.isolant, facesCapot);
    faceDe([rect(-250, 0, YT, YT + 8), rect(-250, 0, YF - 8, YF), rect(700, 950, YT, YT + 8), rect(700, 950, YF - 8, YF),
            rect(30, 70, 255, 300), rect(630, 670, 255, 300)], H.tole, facesCaisson);
    faceDe(BRIDES.flatMap(x => [rect(x - 6, x + 6, YT, YT + 20), rect(x - 6, x + 6, YF - 20, YF)]), H.tole, facesCaisson);
    faceDe([rect(PX0 - 4, PX0, 380, PY0), rect(PX0 - 4, PX0, PY1, YT), rect(PX1, PX1 + 4, 380, PY0), rect(PX1, PX1 + 4, PY1, YT),
            rect(PX0, PX1, PY0 - 15, PY0), rect(PX0, PX1, PY1, PY1 + 15)], H.tole, facesBat);
    faceDe([[[200, 338], [560, 330], [560, 334], [200, 342]], rect(200, 204, 338, 380), rect(556, 560, 330, 380)], H.tole, facesBac);
    /* la plaque d'une ailette, percée de ses tubes : cuivre + eau (deux dessins, un par mode) */
    const dessinPlaque = couleurEau => {
      const k = 2, W = (PX1 - PX0) * k, Hh = (PY1 - PY0) * k;
      const c = document.createElement('canvas'); c.width = W; c.height = Hh;
      const x = c.getContext('2d'); x.fillStyle = '#c7ccd1'; x.fillRect(0, 0, W, Hh);
      ROWX.forEach((tx, r) => { for (let i = 0; i < NK; i++) {
        const ty = r % 2 ? yB(i) : yA(i), cx = (tx - PX0) * k, cy = (PY1 - ty) * k;
        x.beginPath(); x.arc(cx, cy, 10.5 * k, 0, 2 * Math.PI); x.fillStyle = '#a9afb5'; x.fill();
        x.beginPath(); x.arc(cx, cy, 8.4 * k, 0, 2 * Math.PI); x.fillStyle = '#b8683c'; x.fill();
        x.beginPath(); x.arc(cx, cy, 6.8 * k, 0, 2 * Math.PI); x.fillStyle = couleurEau; x.fill();
      } });
      const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; return t;
    };
    const texPlaque = { chaude: dessinPlaque('#d9472b'), froide: dessinPlaque('#2f7fd6') };
    const matPlaque = new T.MeshStandardMaterial({ map: texPlaque.chaude, roughness: 0.5, metalness: 0.3, side: T.DoubleSide });
    const quad = K.mesh(new T.PlaneGeometry(PX1 - PX0, PY1 - PY0), matPlaque, (PX0 + PX1) / 2, (PY0 + PY1) / 2, 0.5);
    quad.userData.sansOmbre = true; facesBat.add(quad);
    /* le repère de l'agrandissement : un cercle sur la plaque, un fil jusqu'à lui (coupe seulement) */
    const lien = new T.Group(); lien.visible = false; racine.add(lien);
    const bague = K.mesh(new T.TorusGeometry(36, 1.6, 6, 40), marine, 350, 470, 1.5); bague.userData.sansOmbre = true;
    lien.add(bague, K.fil([[386, 462, 1.5], [560, 300, 300], [885, 140, 705]], 1.3, marine, { pas: 6 }).mesh);

    /* ================================================================ L'AIR, LA VAPEUR, L'EAU */
    const Z = 15;
    const courbe = (pts, z) => new T.CatmullRomCurve3(pts.map(p => V(p[0], p[1], z === undefined ? Z : z)), false, 'centripetal');
    const LIGNES = [450, 580, 710, 840], LIGNES_V = [515, 645, 775];
    const flot = (pts, couleur, o, z) => K.courant(courbe(pts, z), Object.assign({ pas: 52, rayon: 7, couleur, vitesse: 260 }, o || {}));
    const airIn = LIGNES.map(y => flot([[-260, y], [296, y], [350, y]], AIR.repris));
    const airOut = LIGNES.map(y => flot([[350, y], [404, y], [960, y]], AIR.souffle));
    const VAP = 0x7fd0e8;
    const vapIn = LIGNES_V.map(y => flot([[-260, y], [296, y], [350, y]], VAP, { pas: 70, rayon: 5 }, 24));
    const vapOut = LIGNES_V.map(y => flot([[350, y], [404, y], [960, y]], VAP, { pas: 70, rayon: 5 }, 24));
    const tousAir = [...airIn, ...airOut], tousVap = [...vapIn, ...vapOut];
    /* des départs décalés : sans cela, les grains forment une grille */
    [airIn, airOut, vapIn, vapOut].forEach((l, j) => l.forEach((f, i) => f.regler({ s: (i * 19 + j * 7) % 52 })));
    [...tousAir, ...tousVap].forEach(f => racine.add(f.objet));
    /* l'eau de condensation : des gouttes sur la plaque, qui ruissellent puis tombent au bac */
    const gouttes = (() => {
      /* une goutte = un fond marine et un cœur clair : elle se lit sur les tubes bleus comme sur les tubes rouges */
      const N = 36, geo = new T.SphereGeometry(1, 8, 6), grp = new T.Group();
      const fond = new T.InstancedMesh(geo, K.lumineux(0x1b3a63), N), coeur = new T.InstancedMesh(geo, K.lumineux(0xbfe9ff), N);
      [fond, coeur].forEach(im => { im.userData.sansOmbre = true; im.frustumCulled = false; grp.add(im); });
      const g = Array.from({ length: N }, (_, i) => ({ u: i / N, x: 306 + (i * 37) % 88, v: 0.28 + ((i * 13) % 7) * 0.05 }));
      const q = new T.Quaternion(), p = new T.Vector3(), m = new T.Matrix4();
      const sF = new T.Vector3(8, 11, 4), sC = new T.Vector3(5, 7.5, 4), s0 = new T.Vector3(0, 0, 0);
      return { objet: grp, animer(dt, n) { g.forEach((d, i) => {
        if (i < n) d.u = (d.u + dt * d.v) % 1;
        p.set(d.x, 880 - d.u * 535, 3); m.compose(p, q, i < n ? sF : s0); fond.setMatrixAt(i, m);
        p.z = 5; m.compose(p, q, i < n ? sC : s0); coeur.setMatrixAt(i, m); });
        fond.instanceMatrix.needsUpdate = true; coeur.instanceMatrix.needsUpdate = true; } };
    })();
    racine.add(gouttes.objet); gouttes.animer(0, 0);
    /* l'eau qui part : du bac, par le siphon, jusqu'à l'avaloir */
    const fEvac = K.courant(courbe([[545, 334], [545, 262], [545, 200], [560, 150], [595, 122], [630, 122], [662, 150], [675, 200], [680, 226], [715, 226], [800, 226], [802, 190], [802, 30]], 0),
      { pas: 55, rayon: 7, couleur: 0x2f7fd6, vitesse: 150 });
    siphon.add(fEvac.objet);

    /* ================================================================ L'ÉTAT */
    const PHASES = ['pose', 'eau', 'ailettes', 'air', 'vapeur', 'bac'];
    const E = {
      marche: true, mode: opt.mode === 'froide' ? 'froide' : 'chaude',
      debit: num(opt.debit, 2500), ecart: num(opt.ecart, 9), tin: num(opt.temperature, 26), rh: num(opt.rh, 65),
      phase: 'bac', reperes: false, coupe: false, demonte: false, coupeAvant: false
    };
    const mode0 = E.mode, debit0 = E.debit, ecart0 = E.ecart;   /* les étapes remettent ces réglages : l'histoire se raconte toujours avec les mêmes nombres */
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
    /* l'air humide, comme la station (mêmes constantes pour le point de rosée) */
    const psat = t => 6.112 * Math.exp(17.62 * t / (243.12 + t));
    const wDe = (t, rh) => { const pv = rh / 100 * psat(t); return 0.622 * pv / (1013.25 - pv); };
    const rhDe = (t, w) => { const pv = w * 1013.25 / (0.622 + w); return Math.min(100, 100 * pv / psat(t)); };
    const rosee = (t, rh) => { const a = 17.62, b = 243.12, g = Math.log(rh / 100) + a * t / (b + t); return b * g / (a - g); };
    const calc = () => {
      const q = E.debit, d = E.ecart, froid = E.mode === 'froide', tin = E.tin;
      const win = wDe(tin, E.rh), tout = froid ? tin - d : tin + d;
      const r = { q, d, tin, rh: E.rh, tout, win, wout: win, adp: tin, cond: 0, plat: 0, rosee: rosee(tin, E.rh),
        p: 1.2 * 1005 * (q / 3600) * d };            /* la formule de la station : ρ × cₚ × Qᵥ × ΔT, Qᵥ en m³/s */
      if (froid) {
        r.adp = Math.max(3, tin - d / 0.7);          /* surface moyenne des ailettes : le contact de la batterie vaut ≈ 70 % */
        const ws = wDe(r.adp, 100), e = Math.min(1, d / Math.max(0.1, tin - r.adp));
        r.wout = win > ws ? Math.min(ws + (win - ws) * (1 - e), wDe(tout, 100)) : win;
        const gs = 1.2 * (q / 3600) * (win - r.wout) * 1000;        /* g/s */
        r.cond = Math.max(0, gs * 3.6);                              /* L/h */
        r.plat = Math.max(0, gs * 2.5);                              /* 1 g/s ≈ 2,5 kW */
      }
      r.rhOut = rhDe(tout, r.wout);
      r.vapeurRestante = win > 0 ? r.wout / win : 1;
      return r;
    };
    const air = (cle, mot) => '<b class="air air-' + cle + '">' + mot + '</b>';
    const rang = () => PHASES.indexOf(E.phase) + 1;

    const majMesures = () => {
      const c = calc(), m = E.marche, froid = E.mode === 'froide';
      const liste = [
        { libelle: 'Le débit d’air', valeur: (m ? nb(c.q, 0) : '0') + ' m³/h' },
        { libelle: 'L’air à l’entrée', valeur: nb(c.tin, 1) + ' °C · ' + nb(c.rh, 0) + ' % HR' },
        { libelle: 'L’air à la sortie', valeur: (m ? nb(c.tout, 1) + ' °C · ' + nb(c.rhOut, 0) : nb(c.tin, 1) + ' °C · ' + nb(c.rh, 0)) + ' % HR' },
        { libelle: 'La puissance sensible', valeur: (m ? nb(c.p / 1000, 2) : '0,00') + ' kW' }
      ];
      if (froid) {
        liste.push({ libelle: 'L’eau condensée', valeur: (m ? nb(c.cond, 1) : '0,0') + ' L/h' });
        liste.push({ libelle: 'La puissance latente', valeur: (m ? nb(c.plat, 1) : '0,0') + ' kW' });
      }
      ctx.mesures(liste);
      ecranIn.ecrire([nb(c.tin, 1) + ' °C', nb(c.rh, 0) + ' % HR']);
      ecranOut.ecrire(m ? [nb(c.tout, 1) + ' °C', nb(c.rhOut, 0) + ' % HR'] : [nb(c.tin, 1) + ' °C', nb(c.rh, 0) + ' % HR']);
    };
    const majTexte = () => {
      majMesures();
      if (!E.marche) { ctx.dire('<strong>À l’arrêt.</strong> L’air ne circule pas : la batterie ne change plus rien à sa température.'); return; }
      const c = calc(), froid = E.mode === 'froide';
      let t = '<strong>' + (froid ? 'Batterie froide' : 'Batterie chaude') + ', ' + nb(c.q, 0) + ' m³/h.</strong> ' + air('repris', 'L’air repris') + ' entre à ' + nb(c.tin, 1)
        + ' °C ; ' + air('souffle', 'l’air traité') + ' sort à ' + nb(c.tout, 1) + ' °C. ';
      if (!froid) t += 'La vapeur d’eau reste la même : seule la température change. ';
      else if (c.cond > 0.05) t += 'Les ailettes (≈ ' + nb(c.adp, 1) + ' °C) sont plus froides que le point de rosée de l’air (' + nb(c.rosee, 1) + ' °C) : la vapeur se condense, ' + nb(c.cond, 1) + ' L d’eau par heure partent au bac. ';
      else t += 'Les ailettes (≈ ' + nb(c.adp, 1) + ' °C) restent plus chaudes que le point de rosée (' + nb(c.rosee, 1) + ' °C) : pas d’eau, seule la température change. ';
      ctx.dire(t + '<em>À l’écran, l’air est très ralenti.</em>');
    };

    const matsTeintes = [alu, stripesMat, matPlaque, ailL];
    const majTeinte = () => {
      const on = E.marche && rang() >= 3, froid = E.mode === 'froide', f = Math.min(1, E.ecart / 25);
      matsTeintes.forEach(m => {
        if (!on) { m.emissive.setHex(0x000000); m.emissiveIntensity = 0; }
        else if (froid) { m.emissive.setHex(0x1f5fb0); m.emissiveIntensity = 0.15 + 0.35 * f; }
        else K.chaleur(m, 0.25 + 0.65 * f);
      });
    };
    const majCouleurs = () => {
      const froid = E.mode === 'froide', c = EAU[E.mode];
      tuyauMat.color.setHex(froid ? 0x2f6db5 : 0xc0392b);
      eauFlot.objet.material.color.setHex(c);
      eauInt.color.setHex(froid ? 0x1d4a82 : 0x7a2a1c);
      matPlaque.map = texPlaque[E.mode]; matPlaque.needsUpdate = true;
    };
    const visibles = () => {
      const on = E.marche && !E.demonte, r = rang(), froid = E.mode === 'froide', c = calc();
      const cond = froid && c.cond > 0.05;
      const debitAir = 0.4 + 0.6 * Math.min(1, E.debit / 5000);
      /* le débit se règle AVANT la visibilité : le kit rallume les grains qu'il avait lui-même éteints */
      tousAir.forEach(f => f.regler({ debit: debitAir }));
      vapIn.forEach(f => f.regler({ debit: debitAir }));
      vapOut.forEach(f => f.regler({ debit: debitAir * c.vapeurRestante }));
      eauFlot.regler({ debit: 0.4 + 0.6 * Math.min(1, E.debit / 5000) });
      tousAir.forEach(f => { f.objet.visible = on && r >= 4; });
      tousVap.forEach(f => { f.objet.visible = on && r >= 4; });
      eauFlot.objet.visible = on && r >= 2;
      grainsJ.visible = grainsB.visible = on && r >= 4;
      gouttes.objet.visible = on && cond && r >= 5;
      eauBac.visible = E.coupe && cond && r >= 6;
      fEvac.objet.visible = on && cond && r >= 6;
      [tuyauterie, collecteurs, tubesAv].forEach(g => { g.visible = !E.coupe || E.reperes; });
      loupe.visible = E.coupe && !E.demonte;
      lien.visible = E.coupe && !E.demonte;
      majTeinte();
    };

    const groupesFaces = [facesCaisson, facesCapot, facesBat, facesBac];
    const voirFaces = on => groupesFaces.forEach(g => { g.visible = on; });
    const fantomes = [cuivre, tuyauMat, laiton, servo, noir, capMat];
    const basculerCoupe = on => {
      E.coupe = on;
      const plan = on ? [new T.Plane(new T.Vector3(0, 0, -1), 0)] : null;
      const exclus = new Set();
      [...groupesFaces, sondes, loupe, lien, siphon, gouttes.objet, tuyauterie, collecteurs, tubesAv, ...tousAir.map(f => f.objet), ...tousVap.map(f => f.objet)].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.needsUpdate = true; } });
      });
      /* le côté raccordements, en avant du plan : il reste en place, en transparence */
      fantomes.forEach(m => { m.transparent = on; m.opacity = on ? 0.16 : 1; m.depthWrite = !on; m.needsUpdate = true; });
      voirFaces(on);
      visibles();
    };

    majCouleurs(); visibles(); majTexte();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'caisson', ancre: [150, 700, -488], nom: 'Le caisson et les gaines', objets: [caisson], desc: 'Une boîte de tôle isolée, sur un châssis, entre deux tronçons de gaine. L’air entre d’un côté et sort de l’autre. La porte de visite est devant.' },
      { id: 'tubes', ancre: [337.5, 640, 1], nom: 'Les tubes de cuivre en épingle', objets: [tubes, tubeL], desc: 'Des tubes pliés en U, enfilés dans les ailettes. L’eau y circule d’un collecteur à l’autre. L’air touche leur paroi, jamais l’eau.' },
      { id: 'ailettes', ancre: [375, 800, 1], nom: 'Les ailettes d’aluminium', objets: [packBloc, stripes, quad, plaquesL], desc: 'Des centaines de plaques fines et serrées. Elles prennent la température de l’eau et la passent à l’air : sans elles, l’air toucherait trop peu de métal.' },
      { id: 'plaques', ancre: [350, 907, 1], nom: 'Les plaques et les tôles d’obturation', objets: [plaques], desc: 'Elles tiennent les tubes et les ailettes, et bouchent les vides autour de la batterie : l’air doit passer entre les ailettes, pas à côté.' },
      { id: 'collecteurs', ancre: [260, 650, 445], nom: 'Les collecteurs', objets: [collecteurs], desc: 'Deux gros tubes verticaux. L’eau arrive dans l’un, se partage entre les tubes en épingle, puis repart par l’autre. Elle entre du côté où l’air sort.' },
      { id: 'vanne', ancre: [440, 535, 560], nom: 'La vanne trois voies motorisée', objets: [vanne], desc: 'Un servomoteur ouvre plus ou moins la vanne : l’eau passe dans la batterie, ou revient directement au retour par le contournement. C’est elle qui règle la puissance.' },
      { id: 'tuyauterie', ancre: [440, 200, 560], nom: 'La tuyauterie d’eau', objets: [pipes], desc: 'L’arrivée et le retour, vers la production. Peinte en rouge pour l’eau chaude, en bleu pour l’eau glacée.' },
      { id: 'purgeur', ancre: [260, 985, 560], nom: 'Le purgeur et la vidange', objets: [purgVid], desc: 'Le purgeur, tout en haut, chasse l’air qui gênerait l’eau. La vidange, tout en bas, sert à vider la batterie, par exemple avant l’hiver.' },
      { id: 'bac', ancre: [450, 360, -467], nom: 'Le bac à condensats', objets: [bac], desc: 'En inox, sous la batterie froide. Il recueille l’eau qui goutte des ailettes. Son fond est en pente vers le départ du tuyau.' },
      { id: 'siphon', ancre: [620, 122, 0], nom: 'Le siphon et l’évacuation', objets: [siphon], desc: 'Une boucle qui reste pleine d’eau. Elle empêche l’air d’être aspiré par le tuyau : l’eau peut s’écouler. Le tuyau doit finir quelque part (ici, un avaloir).' },
      { id: 'sondes', ancre: [100, 1000, -150], nom: 'Les sondes de température', objets: [sondes], desc: 'Une avant la batterie, une après. Leur écran donne la température et l’humidité de l’air. L’écart sert à calculer la puissance.' },
      { id: 'loupe', ancre: [900, 60, 720], nom: 'L’agrandissement', objets: [baseLmesh], desc: 'Une tranche de batterie agrandie environ six fois : un tube coupé dans sa longueur, des ailettes vues par la tranche. Elle n’existe pas sur l’appareil réel.' }
    ];

    const commandes = [
      { id: 'mode', type: 'choix', options: [['chaude', 'Batterie chaude'], ['froide', 'Batterie froide']], valeur: E.mode },
      { id: 'debit', type: 'curseur', libelle: 'Débit d’air', min: 100, max: 5000, pas: 50, valeur: E.debit, unite: 'm³/h' },
      { id: 'ecart', type: 'curseur', libelle: 'Écart de température', min: 1, max: 25, pas: 0.5, valeur: E.ecart, unite: 'K' },
      { id: 'marche', type: 'choix', options: [['arret', 'Arrêt'], ['marche', 'En marche']], valeur: 'marche' }
    ];

    /* ---------------------------------------------------------------- le mouvement, pas à pas */
    const eauMot = m => m === 'froide' ? 'glacée' : 'chaude';
    const etapes = [
      { titre: 'La batterie, telle qu’on la pose', piece: 'caisson', voirDedans: false, eclate: false, actions: [['mode', mode0], ['marche', 'marche'], ['debit', debit0], ['ecart', ecart0], ['phase', 'pose']],
        faire: () => ctx.element.fantome(false),
        vue: { azimut: 32, elevation: 18, zoom: 1.0, cible: null },
        texte: 'Une boîte de tôle entre deux gaines. Devant : l’arrivée et le retour d’eau, la vanne motorisée, le purgeur en haut, la vidange en bas. L’air passe de gauche à droite.' },
      { titre: 'L’eau ' + eauMot(mode0) + ' circule dans les tubes', piece: 'tubes', voirDedans: true, eclate: false, actions: [['mode', mode0], ['marche', 'marche'], ['debit', debit0], ['ecart', ecart0], ['phase', 'eau']],
        vue: { azimut: 0, elevation: 74, zoom: 3.6, cible: [900, 90, 720] },
        texte: 'À droite, un tube de la batterie agrandi, coupé dans sa longueur. L’eau ' + eauMot(mode0) + ' arrive par la vanne et le remplit : elle avance d’un bout à l’autre du tube.' },
      { titre: 'Les ailettes prennent la température de l’eau', piece: 'ailettes', voirDedans: true, eclate: false, actions: [['mode', mode0], ['marche', 'marche'], ['debit', debit0], ['ecart', ecart0], ['phase', 'ailettes']],
        vue: { azimut: 0, elevation: 74, zoom: 3.6, cible: [900, 90, 720] },
        texte: 'Le cuivre du tube passe sa température aux ailettes d’aluminium qui l’entourent. Elles deviennent ' + (mode0 === 'froide' ? 'froides' : 'chaudes') + ' : on le voit à leur couleur.' },
      { titre: 'L’air passe entre les ailettes, sans toucher l’eau', piece: 'ailettes', voirDedans: true, eclate: false, actions: [['mode', mode0], ['marche', 'marche'], ['debit', debit0], ['ecart', ecart0], ['phase', 'air']],
        vue: { azimut: 0, elevation: 74, zoom: 3.6, cible: [900, 90, 720] },
        texte: air('repris', 'L’air repris') + ' se glisse dans les intervalles entre les ailettes et contourne le tube. Il touche le métal, jamais l’eau : le tube est une paroi. Il repart plus ' + (mode0 === 'froide' ? 'frais' : 'chaud') + ' : c’est ' + air('souffle', 'l’air traité') + '.' },
      { titre: 'L’air ressort à une autre température', piece: 'sondes', voirDedans: true, eclate: false, actions: [['mode', mode0], ['marche', 'marche'], ['debit', debit0], ['ecart', ecart0], ['phase', 'air']],
        vue: { azimut: 8, elevation: 12, zoom: 1.5, cible: [350, 700, 0] },
        texte: 'Les deux sondes donnent la température avant et après la batterie. Même débit, et autant de points clairs (la vapeur d’eau) des deux côtés : seule la température a changé. La puissance se calcule avec le débit et cet écart.' },
      { titre: 'En froid, la vapeur de l’air se condense sur les ailettes', piece: 'ailettes', voirDedans: true, eclate: false, actions: [['mode', 'froide'], ['marche', 'marche'], ['debit', debit0], ['ecart', Math.max(ecart0, 12)], ['phase', 'vapeur']],
        vue: { azimut: 4, elevation: 10, zoom: 2.4, cible: [350, 620, 0] },
        texte: 'Les ailettes sont plus froides que le point de rosée de l’air : la vapeur d’eau (points clairs) s’y dépose en gouttes. Il en reste moins à la sortie, et l’air sort plus sec.' },
      { titre: 'L’eau coule au bac et part par le siphon', piece: 'bac', voirDedans: true, eclate: false, actions: [['mode', 'froide'], ['marche', 'marche'], ['debit', debit0], ['ecart', Math.max(ecart0, 12)], ['phase', 'bac']],
        vue: { azimut: 10, elevation: 14, zoom: 2.0, cible: [480, 330, 0] },
        texte: 'Les gouttes ruissellent le long des ailettes et tombent dans le bac. Il est en pente : l’eau rejoint le tuyau, passe le siphon et sort. C’est la part latente : de l’eau en continu, tant que la batterie fonctionne.' }
    ];

    /* le démontage, dans l'ordre : on coupe l'eau et on déconnecte la tuyauterie, on retire le
       dessus, on sort la batterie, puis le bac (le siphon reste en place) */
    const eclate = [
      { objets: [tuyauterie], vers: [0, 0, 330], debut: 0, fin: 0.4 },
      { objets: [capot], vers: [0, 560, 0], debut: 0.2, fin: 0.7 },
      { objets: [batterie], vers: [0, 360, 0], debut: 0.4, fin: 1 },
      { objets: [bac], vers: [0, 130, 0], debut: 0.55, fin: 1 }
    ];

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 30, elevation: 22, zoom: 0.85, cible: [350, 620, 120] },
      vue: { azimut: ctx.mode === 'comprendre' ? 12 : 32, elevation: 18, zoom: ctx.mode === 'comprendre' ? 1.35 : 1.0, cible: ctx.mode === 'comprendre' ? [520, 500, 280] : null, cadre: [caisson, capot, tuyauterie, siphon, loupe], marge: 0.78 },
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'phase') E.phase = v;
        if (id === 'marche') { E.marche = v === 'marche'; ctx.regler('marche', v); }
        if (id === 'mode') { E.mode = v; ctx.regler('mode', v); majCouleurs(); }
        if (id === 'debit') { E.debit = +v; ctx.regler('debit', +v); }
        if (id === 'ecart') { E.ecart = +v; ctx.regler('ecart', +v); }
        visibles(); majTexte();
      },
      surEclate(on) {
        if (on === E.demonte) return;
        E.demonte = on;
        if (on) { E.coupeAvant = E.coupe; if (E.coupe) ctx.element.fantome(false); }
        else { if (E.coupeAvant) ctx.element.fantome(true); E.coupeAvant = false; }
        visibles();
      },
      animer(dt) {
        /* les repères numérotés : le côté raccordements réapparaît (en transparence) pour qu'ils pointent quelque part */
        const r = !!ctx.element._reperesVisibles;
        if (r !== E.reperes) { E.reperes = r; visibles(); }
        if (!E.marche || E.demonte) return false;
        const k = Math.max(0.25, E.debit / 2500), v = 260 * k, c = calc();
        [...tousAir, ...tousVap].forEach(f => { f.regler({ vitesse: v }); if (f.objet.visible) f.animer(dt); });
        if (eauFlot.objet.visible) { eauFlot.regler({ vitesse: 160 }); eauFlot.animer(dt); }
        if (grainsJ.visible) { phaseL = (phaseL + dt * 0.1 * k) % 1; poserGrainsLoupe(); }
        if (gouttes.objet.visible) gouttes.animer(dt, Math.round(36 * Math.max(0.15, Math.min(1, c.cond / 20))));
        if (fEvac.objet.visible) fEvac.animer(dt);
        return true;
      }
    };
  }, { famille: 'batteries', titre: 'La batterie à eau d’une centrale', stations: ['batteries', 'apport-sensible', 'apport-latent'] });
})();
