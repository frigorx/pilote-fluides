/* HydroMétro 3D — famille « installations » : une petite installation de chauffage réelle.
   Unités : mm. Repère : X le long du mur (de gauche à droite), Y vers le haut (le sol est en y = 0),
   Z vers l'avant (+Z = vers l'élève ; le mur est en z = 0). Les tubes sont à z = 62.

   CE QUE L'ÉLÈVE DOIT VOIR : une chaudière murale (caisson blanc, quatre piquages dessous) ; le DÉPART
   en cuivre repéré d'un ruban rouge, qui passe par le circulateur et monte à deux branches ; chaque
   branche a un radiateur et une vanne d'équilibrage ; le RETOUR en cuivre repéré d'un ruban bleu, avec
   son filtre, ramène l'eau à la chaudière ; un vase d'expansion et, au point haut du départ, un purgeur
   automatique. « Voir l'eau » rend les tubes, la chaudière et les radiateurs transparents : des grains
   suivent l'eau — rouge au départ, bleue au retour — et l'eau du radiateur passe du rouge au bleu :
   c'est là qu'elle donne sa chaleur à la pièce (les flèches orange).

   UN CHOIX D'ÉTAT sert les trois stations (Boucle, Diagnostic, Mission) : Normal, Air en point haut,
   Vanne de la branche B fermée, Branche B mal réglée, Filtre encrassé, Circulateur à l'arrêt.
   ctx.options : { depart: 'normal' | 'branche-froide' } — « branche-froide » ouvre sur la vanne B fermée.

   Tout est fabriqué ici en version simplifiée (circulateur, radiateur, vases, vannes) : les modèles
   complets de ces appareils pèsent 25 000 à 37 000 triangles chacun, l'installation en tient 80 000. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('installation', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const D = Math.PI / 180;
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const { clamp } = K;
    const opts = ctx.options || {};
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });

    /* ---------------------------------------------------------------- repères du modèle */
    const ZP = 62;                                        /* l'axe des tubes, à 62 mm du mur */
    const YD = 880, YR = 130, YC = 1000;                  /* départ, retour, dessous de la chaudière */
    const XRET = -1040, XECS = -965, XEFS = -890, XDEP = -815;   /* les quatre piquages */
    const PX = -640, NUT = 110;                           /* centre du circulateur ; demi-longueur avec ses écrous */
    const XA = -380, XB = 260;                            /* bord gauche des radiateurs A et B */
    const LR = 500, HR = 560, Y0 = 250, Y1 = Y0 + HR;     /* un radiateur : 500 × 560 */
    const YT = Y1 - 40, YO = Y0 + 40;                     /* piquage haut (arrivée), piquage bas (sortie) */
    const XVENT = -150, FX = -740;                        /* le purgeur ; le filtre */
    const VX = -1230, VY = 530, VZ = 150;                 /* le vase : centre, dessous */
    const xi = xl => xl - 80, xo = xl => xl - 130;              /* tubes qui descendent : arrivée, sortie */
    const R_T = 11, R_E = 9.3;                            /* tube : Ø 22 ; l'eau dedans */

    /* ---------------------------------------------------------------- couleurs de l'eau */
    const ROUGE = 0xd9472b, BLEU = 0x2f7fd6;
    const cR = new T.Color(ROUGE), cB = new T.Color(BLEU), cW = new T.Color(0xffffff), tmp = new T.Color(), tmp2 = new T.Color();
    const teinte = (t, out) => (out || tmp).copy(cB).lerp(cR, clamp(t, 0, 1));

    /* ---------------------------------------------------------------- matières à soi */
    const C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; return c; };
    const cuivre = C(M.cuivre), laiton = C(M.laiton), zingue = C(M.zingue), chrome = C(M.acier, 0xe4e7ea);
    const blanc = C(M.plastiqueBlanc, 0xf3f2ed), emaille = C(M.plastiqueBlanc, 0xf2f1ec); emaille.roughness = 0.38;
    const fonte = C(M.fonte, 0x3e454d), alu = C(M.aluminium, 0xc9ced4), tole = C(M.tole), inox = C(M.acier, 0xd5dade);
    const marine = C(M.plastiqueMarine), noir = C(M.plastiqueNoir), sombre = C(M.sombre), caout = C(M.caoutchouc);
    const rougeVase = C(M.plastiqueRouge, 0xc23a2b), orange = C(M.plastiqueOrange);
    const platre = C(M.plastique, 0xf0ebdf); platre.roughness = 0.9;
    const dalleMat = C(M.sable, 0xd2c9b4), plinthe = C(M.plastique, 0xe4dfd3);
    const rubanR = C(M.plastiqueRouge, ROUGE), rubanB = C(M.plastiqueBleu, BLEU);
    const ledMarche = new T.MeshBasicMaterial({ color: 0x2fd27a, toneMapped: false });
    const ledEteinte = K.propre(M.plastiqueSombre);
    const eauMat = new T.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.4, depthWrite: false, side: T.DoubleSide, toneMapped: false });
    const eauBoite = new T.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.55, depthWrite: false, side: T.DoubleSide, toneMapped: false });
    const eauVase = new T.MeshBasicMaterial({ color: ROUGE, transparent: true, opacity: 0.62, depthWrite: false, toneMapped: false });
    const gazVase = new T.MeshStandardMaterial({ color: 0xe9eef2, roughness: 0.3, transparent: true, opacity: 0.2, depthWrite: false });
    const airMat = new T.MeshStandardMaterial({ color: 0xf2f8ff, emissive: 0x9fc5e8, emissiveIntensity: 0.5, roughness: 0.05, transparent: true, opacity: 0.85, depthWrite: false });
    const flammeMat = new T.MeshBasicMaterial({ color: 0xffa23a, toneMapped: false });
    const flecheMat = new T.MeshBasicMaterial({ color: 0xff7a35, transparent: true, opacity: 0.78, depthWrite: false, toneMapped: false });
    const tamisMat = new T.MeshStandardMaterial({ color: 0xaab2ba, roughness: 0.5, metalness: 0.6, transparent: true, opacity: 0.6, depthWrite: false, wireframe: true });
    const bouesMat = new T.MeshStandardMaterial({ color: 0x5a4a38, roughness: 0.95 });
    const matAretes = new T.LineBasicMaterial({ color: 0x1b3a63, transparent: true, opacity: 0.35, depthWrite: false });

    /* ---------------------------------------------------------------- aides de géométrie */
    const surX = (g, x, y, z) => { g.rotateZ(Math.PI / 2); g.translate(x, y || 0, z || 0); return g; };
    const surZ = (g, z, x, y) => { g.rotateX(Math.PI / 2); g.translate(x || 0, y || 0, z); return g; };
    const cylX = (r, x0, x1, mat, y, z, seg) => new T.Mesh(surX(K.cylindre(r, x1 - x0, seg || 24), (x0 + x1) / 2, y, z), mat);
    const cylZ = (r, z0, z1, mat, x, y, seg) => new T.Mesh(surZ(K.cylindre(r, z1 - z0, seg || 24), (z0 + z1) / 2, x, y), mat);
    const cylY = (r, y0, y1, mat, x, z, seg) => K.mesh(K.cylindre(r, y1 - y0, seg || 24), mat, x || 0, (y0 + y1) / 2, z || 0);
    const hexX = (r, x0, x1, mat, y, z) => new T.Mesh(surX(new T.CylinderGeometry(r, r, x1 - x0, 6), (x0 + x1) / 2, y, z), mat);
    const hexY = (r, y0, y1, mat, x, z) => K.mesh(new T.CylinderGeometry(r, r, y1 - y0, 6), mat, x || 0, (y0 + y1) / 2, z || 0);
    const ringX = (rE, rI, x0, x1, mat, y, z, seg) => new T.Mesh(surX(K.anneau(rE, rI, x1 - x0, seg || 28), (x0 + x1) / 2, y, z), mat);
    const ringY = (rE, rI, y0, y1, mat, x, z, seg) => K.mesh(K.anneau(rE, rI, y1 - y0, seg || 28), mat, x || 0, (y0 + y1) / 2, z || 0);
    const A = (...objets) => { const g = new T.Group(); objets.forEach(o => o && g.add(o)); return g; };
    const bx = (w, h, d, mat, x, y, z) => K.mesh(new T.BoxGeometry(w, h, d), mat, x, y, z);
    const calme = o => { o.userData.sansOmbre = true; o.castShadow = false; return o; };

    /* ---------------------------------------------------------------- la vue « voir l'eau » :
       les enveloppes (tubes, caisson, panneaux, cuve) deviennent des fantômes, l'eau se voit dedans.
       Un fantôme est un « voile » : la pièce allumée ne cache alors ni l'eau ni les grains. */
    const fantomes = [], cacheFantome = new Map(), aretes = [];
    const fantomable = (obj, opacite) => {
      obj.traverse(m => {
        if (!m.isMesh) return;
        const plein = m.material;
        let f = cacheFantome.get(plein);
        if (!f) { f = plein.clone(); f.transparent = true; f.opacity = opacite || 0.16; f.depthWrite = false; cacheFantome.set(plein, f); }
        fantomes.push({ m, plein, f });
      });
      return obj;
    };
    const boiteAretes = (w, h, d, x, y, z) => {
      const l = new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(w, h, d)), matAretes);
      l.position.set(x, y, z); l.visible = false; l.userData.decor = true; l.raycast = () => {}; aretes.push(l); return l;
    };

    /* ================================================================ LE DÉCOR : mur, plinthe, sol */
    const decor = new T.Group(); racine.add(decor);
    decor.add(bx(4000, 1960, 20, platre, -700, 880, -10));
    decor.add(bx(4000, 40, 440, dalleMat, -700, -20, 200));
    decor.add(bx(4000, 90, 12, plinthe, -700, 45, 6));

    /* ================================================================ LES TUBES
       Une polyligne aux coudes arrondis, rendue comme une courbe (longueur d'arc régulière) ; les
       grains et l'eau la suivent. */
    const Poly = class extends T.Curve {
      constructor(path) { super(); this.path = path; }
      getPoint(t, target) { return this.path.getPoint(t, target || new T.Vector3()); }
    };
    const chemin = (pts, rc) => {
      const P = pts.map(p => V(p[0], p[1], p[2] === undefined ? ZP : p[2]));
      const cp = new T.CurvePath(); let cur = P[0].clone();
      for (let i = 1; i < P.length - 1; i++) {
        const a = P[i - 1], b = P[i], c = P[i + 1];
        const d1 = b.clone().sub(a), l1 = d1.length(); d1.divideScalar(l1 || 1);
        const d2 = c.clone().sub(b), l2 = d2.length(); d2.divideScalar(l2 || 1);
        const k = Math.min(rc || 40, l1 / 2, l2 / 2);
        const p1 = b.clone().addScaledVector(d1, -k), p2 = b.clone().addScaledVector(d2, k);
        if (cur.distanceTo(p1) > 1e-3) cp.add(new T.LineCurve3(cur.clone(), p1));
        if (k > 1e-3) cp.add(new T.QuadraticBezierCurve3(p1, b.clone(), p2));
        cur = k > 1e-3 ? p2 : b.clone();
      }
      const last = P[P.length - 1];
      if (cur.distanceTo(last) > 1e-3) cp.add(new T.LineCurve3(cur.clone(), last));
      return new Poly(cp);
    };
    const partie = (c, u0, u1) => { const o = new T.Curve(); o.getPoint = (t, tg) => c.getPointAt(u0 + (u1 - u0) * t, tg); return o; };
    const tube = (courbe, r, mat) => new T.Mesh(new T.TubeGeometry(courbe, Math.max(6, Math.round(courbe.getLength() / 40)), r, 8, false), mat);
    /* la coque de cuivre, avec des « trous » (en mm depuis le départ) là où un appareil prend la place */
    const coque = (courbe, mat, trous) => {
      const g = new T.Group(), L = courbe.getLength();
      let iv = [[0, L]];
      (trous || []).forEach(([a, b]) => {
        const nv = [];
        iv.forEach(([s, e]) => { if (b <= s || a >= e) nv.push([s, e]); else { if (a > s) nv.push([s, a]); if (b < e) nv.push([b, e]); } });
        iv = nv;
      });
      iv.forEach(([s, e]) => { if (e - s < 2) return; g.add(tube(s === 0 && e === L ? courbe : partie(courbe, s / L, e / L), R_T, mat)); });
      return g;
    };
    /* l'eau dedans : un tube coloré (couleur par sommet), à régler de t0 à t1 le long du tube */
    const eauTube = courbe => {
      const n = Math.max(6, Math.round(courbe.getLength() / 45)), RAD = 6;
      const g = new T.TubeGeometry(courbe, n, R_E, RAD, false);
      g.setAttribute('color', new T.BufferAttribute(new Float32Array(g.attributes.position.count * 3), 3));
      const m = calme(new T.Mesh(g, eauMat)); m.renderOrder = 1; racine.add(m);
      let cle = '';
      const regler = (t0, t1) => {
        const k = Math.round(t0 * 200) + '/' + Math.round(t1 * 200); if (k === cle) return; cle = k;
        const col = g.attributes.color;
        for (let i = 0; i <= n; i++) {
          teinte(t0 + (t1 - t0) * i / n, tmp2);
          for (let j = 0; j <= RAD; j++) col.setXYZ(i * (RAD + 1) + j, tmp2.r, tmp2.g, tmp2.b);
        }
        col.needsUpdate = true;
      };
      return { m, regler };
    };

    /* ================================================================ L'ÉTAT : ce que chaque choix fait */
    const E = { etat: opts.depart === 'branche-froide' ? 'vanne-b' : 'normal', fantome: false, t: 0, vaseCible: 1, delaiVase: 0, ange: 0 };
    /* fA, fB : débit relatif de chaque branche ; tA, tB : chaleur de l'eau en haut et en bas du radiateur
       (0 = bleu froid, 1 = rouge chaud) ; preB : le réglage affiché sur la vanne B ; air, enc : de 0 à 1 */
    const CIBLES = {
      'normal':    { fA: 1,    fB: 1,    tA: [1, 0.1],    tB: [1, 0.1],    pompe: 1, air: 0, enc: 0, preB: 2.5, dep: 65, ret: '45 °C', bB: 'chaude' },
      'air':       { fA: 0.45, fB: 0.45, tA: [0.8, 0.04], tB: [0.8, 0.04], pompe: 1, air: 1, enc: 0, preB: 2.5, dep: 65, ret: '38 °C', bB: 'peu chaude' },
      'vanne-b':   { fA: 1.1,  fB: 0,    tA: [1, 0.1],    tB: [0.1, 0],    pompe: 1, air: 0, enc: 0, preB: 0,   dep: 65, ret: '45 °C', bB: 'froide' },
      'reglage-b': { fA: 1.05, fB: 0.12, tA: [1, 0.1],    tB: [0.45, 0],    pompe: 1, air: 0, enc: 0, preB: 0.5, dep: 65, ret: '44 °C', bB: 'à peine tiède' },
      'filtre':    { fA: 0.5,  fB: 0.5,  tA: [0.85, 0.03], tB: [0.85, 0.03], pompe: 1, air: 0, enc: 1, preB: 2.5, dep: 65, ret: '36 °C', bB: 'tiède' },
      'arret':     { fA: 0,    fB: 0,    tA: [0, 0],      tB: [0, 0],      pompe: 0, air: 0, enc: 0, preB: 2.5, dep: 80, ret: '20 °C', bB: 'froide' }
    };
    const c0 = CIBLES[E.etat];
    const S = { fA: c0.fA, fB: c0.fB, tA0: c0.tA[0], tA1: c0.tA[1], tB0: c0.tB[0], tB1: c0.tB[1], pw: c0.pompe, air: c0.air, enc: c0.enc, preB: c0.preB, vase: 1, vRate: 0, rot: 0 };

    /* ================================================================ LES GRAINS : l'eau qui circule */
    const flots = [];
    const flotsDe = (courbe, o) => {
      (o.parts || [[0, 1, () => 1]]).forEach(([u0, u1, fnT]) => {
        const f = K.courant(u0 === 0 && u1 === 1 ? courbe : partie(courbe, u0, u1), { pas: o.pas || 90, rayon: o.rayon || 6.2, couleur: 0xffffff, vitesse: 100 });
        f.objet.geometry = new T.SphereGeometry(o.rayon || 5, 6, 4);
        racine.add(f.objet); flots.push({ f, flow: o.flow, fnT });
      });
    };
    const debitDe = k => (k === 'tot' ? S.fA + S.fB : k === 'A' ? S.fA : k === 'B' ? S.fB : 0);

    /* ================================================================ LA CHAUDIÈRE */
    const chaudiere = new T.Group();
    const caisson = K.mesh(K.boite(400, 700, 300, 16), blanc, -900, 1350, 150);
    const coffre = new T.Group(); coffre.add(caisson, boiteAretes(400, 700, 300, -900, 1350, 150));
    fantomable(caisson, 0.09);
    chaudiere.add(coffre);
    /* la façade : un bandeau de commande, un afficheur, un bouton */
    chaudiere.add(bx(330, 70, 8, K.propre(M.plastiqueSombre), -900, 1045, 303));
    const afficheur = K.ecran(84, 32, { fond: '#0d2740', encre: '#7fe3ff' });
    afficheur.mesh.position.set(-985, 1045, 307.6);
    chaudiere.add(afficheur.mesh);
    chaudiere.add(cylZ(19, 304, 316, marine, -870, 1045, 28), cylZ(7, 304, 312, blanc, -795, 1060, 16), cylZ(7, 304, 312, blanc, -795, 1030, 16));
    chaudiere.add(bx(4, 22, 3, K.propre(M.plastiqueOrange), -870, 1054, 316.8));
    /* dedans : le corps de chauffe, la rampe et les flammes */
    const echangeur = bx(215, 200, 26, C(M.aluminium, 0xb7bcc2), -925, 1250, 118);
    chaudiere.add(echangeur);
    const rampe = cylX(8, -1010, -830, noir, 1090, 150, 16); chaudiere.add(rampe);
    const flammes = new T.Group();
    const geoFlamme = new T.ConeGeometry(8, 42, 8);
    for (let i = 0; i < 8; i++) { const f = calme(new T.Mesh(geoFlamme, flammeMat)); f.position.set(-1000 + i * 24, 1112, 150); flammes.add(f); }
    chaudiere.add(flammes);
    /* les piquages, dessous, de gauche à droite : retour, eau sanitaire (2), départ */
    [XRET, XDEP].forEach(x => chaudiere.add(hexY(16, 980, 1000, laiton, x, ZP)));
    [XECS, XEFS].forEach(x => {
      chaudiere.add(hexY(16, 980, 1000, laiton, x, ZP), cylY(10, 908, 984, cuivre, x, ZP, 16), hexY(15, 890, 910, laiton, x, ZP));
    });
    racine.add(chaudiere);

    /* le serpentin de l'échangeur, de la sortie du retour à l'arrivée du départ (dedans, au-dessus de la flamme) */
    const serpentin = chemin([[XRET, YC], [XRET, 1110], [-1010, 1150, 110], [-1005, 1180, 150], [-840, 1180, 150], [-840, 1250, 150], [-1005, 1250, 150],
      [-1005, 1320, 150], [-815, 1320, 150], [-815, 1100, 150], [-815, 1040, ZP], [XDEP, YC]], 34);
    const coqueSerp = coque(serpentin, cuivre); fantomable(coqueSerp, 0.2); chaudiere.add(coqueSerp);
    const eauSerp = eauTube(serpentin); eauSerp.regler(0.12, 1);
    flotsDe(serpentin, { flow: 'tot', rayon: 5.6, pas: 80, parts: [[0, 0.34, () => 0.12], [0.34, 0.68, () => 0.5], [0.68, 1, () => 1]] });

    /* ================================================================ LE DÉPART (rouge) */
    const depart = new T.Group();
    const tD0 = chemin([[XDEP, YC], [XDEP, YD], [PX - NUT, YD]], 40);
    const tDP = chemin([[PX - NUT, YD], [PX + NUT, YD]], 1);                       /* dans le circulateur */
    const tD1a = chemin([[PX + NUT, YD], [xi(XA), YD]], 1);
    const tD1b = chemin([[xi(XA), YD], [XVENT, YD]], 1);
    const tD2 = chemin([[XVENT, YD], [xi(XB), YD], [xi(XB), YT], [XB, YT]], 40);
    const tDA = chemin([[xi(XA), YD], [xi(XA), YT], [XA, YT]], 40);
    [tD0, tD1a, tD1b, tD2, tDA].forEach(c => depart.add(fantomable(coque(c, cuivre), 0.2)));
    [tD0, tDP, tD1a, tD1b, tD2, tDA].forEach(c => { const e = eauTube(c); e.regler(1, 1); });
    flotsDe(tD0, { flow: 'tot' }); flotsDe(tDP, { flow: 'tot', pas: 60 }); flotsDe(tD1a, { flow: 'tot', pas: 60 });
    flotsDe(tD1b, { flow: 'B' }); flotsDe(tD2, { flow: 'B' }); flotsDe(tDA, { flow: 'A' });
    /* repères de couleur : un ruban rouge, comme sur le chantier */
    [[-300, YD], [40, YD]].forEach(([x, y]) => depart.add(ringX(12.2, 10.6, x, x + 9, rubanR, y, ZP)));
    depart.add(ringY(12.2, 10.6, 930, 939, rubanR, XDEP, ZP));
    racine.add(depart);

    /* ================================================================ LE CIRCULATEUR (simplifié) */
    const pompe = new T.Group(); pompe.position.set(PX, YD, ZP);
    const pCorps = new T.Group();
    pCorps.add(K.mesh(K.boite(116, 54, 52, 9), fonte));
    [-1, 1].forEach(s => pCorps.add(cylX(17, s > 0 ? 58 : -92, s > 0 ? 92 : -58, fonte, 0, 0, 24)));
    pCorps.add(cylZ(48, 14, 40, fonte, 0, 0, 30));                                        /* la volute */
    pCorps.add(cylZ(52, 36, 44, alu, 0, 0, 30));                                          /* la bride */
    pCorps.add(cylZ(42, 44, 150, alu, 0, 0, 30));                                         /* le carter du moteur */
    for (let z = 54; z <= 138; z += 14) pCorps.add(cylZ(46, z, z + 5, alu, 0, 0, 30));    /* ailettes */
    const fl = new T.Shape();
    [[-24, -4], [8, -4], [8, -10], [26, 0], [8, 10], [8, 4], [-24, 4]].forEach((p, i) => i ? fl.lineTo(p[0], p[1]) : fl.moveTo(p[0], p[1]));
    const fleche = K.mesh(K.extrusion(fl, 1.6, 0.4), fonte); fleche.rotation.x = -Math.PI / 2; fleche.position.set(0, 27.4, 0);
    pCorps.add(fleche);
    pompe.add(fantomable(pCorps, 0.18));
    [-1, 1].forEach(s => pompe.add(hexX(21, s > 0 ? 92 : -110, s > 0 ? 110 : -92, laiton)));   /* les écrous union */
    for (let i = 0; i < 4; i++) { const a = (45 + i * 90) * D; pompe.add(cylZ(4.5, 44, 51, zingue, Math.cos(a) * 47, Math.sin(a) * 47, 12)); }
    /* le module de commande : bouton, trois voyants */
    pompe.add(K.mesh(K.boite(86, 86, 36, 10), marine, 0, 0, 168));
    pompe.add(bx(72, 72, 3, blanc, 0, 0, 187));
    pompe.add(cylZ(11, 188, 196, noir, -12, -8, 28));
    pompe.add(bx(3, 12, 1.5, orange, -12, -3, 196.6));
    const leds = [0, 1, 2].map(i => { const m = cylZ(3, 188, 190, ledEteinte, 24, 18 - i * 11, 14); pompe.add(m); return m; });
    /* dedans (vu quand on regarde l'eau) : le stator, le rotor, la roue */
    const stator = new T.Mesh(surZ(K.anneau(35, 26, 52, 28), 92), cuivre); pompe.add(stator);
    const tournant = new T.Group(); pompe.add(tournant);
    tournant.add(cylZ(20, 46, 122, tole, 0, 0, 24), bx(4, 9, 4, orange, 0, -14, 122));
    const roue = new T.Group(); roue.position.z = 27; pompe.add(roue);
    roue.add(cylZ(36, -4, 0, marine, 0, 0, 28));
    for (let i = 0; i < 6; i++) {
      const a = i * 60 * D, b = bx(24, 3, 12, marine, Math.cos(a) * 24, Math.sin(a) * 24, 6); b.rotation.z = a; roue.add(b);
    }
    racine.add(pompe);

    /* ================================================================ LES RADIATEURS (simplifiés, panneau acier) */
    const geoNerv = new T.BoxGeometry(22, HR - 90, 9);
    const consoleMat = C(M.plastique, 0xe4dfd3);
    const faireRadiateur = xl => {
      const g = new T.Group(), xc = xl + LR / 2, yc = (Y0 + Y1) / 2, xr = xl + LR;
      const corps = new T.Group();
      corps.add(K.mesh(K.boite(LR, HR, 46, 8), emaille, xc, yc, ZP));
      for (let k = 0; k < 14; k++) corps.add(K.mesh(geoNerv, emaille, xl + 20 + k * (LR - 40) / 13, yc, ZP + 23));
      corps.add(bx(LR - 24, 8, 40, emaille, xc, Y1 + 4, ZP + 4));        /* la grille */
      corps.add(boiteAretes(LR, HR, 46, xc, yc, ZP));
      g.add(fantomable(corps, 0.13));
      [YT, YO].forEach(y => g.add(cylX(8, xl - 26, xl + 2, chrome, y, ZP, 16)));
      g.add(hexY(9, Y1 + 8, Y1 + 20, laiton, xr - 30, ZP), cylY(4, Y1 + 20, Y1 + 26, chrome, xr - 30, ZP, 12));   /* le purgeur à clé */
      [xl + 90, xr - 90].forEach(x => g.add(bx(34, 50, 24, consoleMat, x, Y0 + 60, 27)));
      racine.add(g);
      /* l'eau dans le radiateur : une boîte, rouge en haut, bleue en bas */
      const geo = new T.BoxGeometry(LR - 26, HR - 36, 26);
      geo.setAttribute('color', new T.BufferAttribute(new Float32Array(geo.attributes.position.count * 3), 3));
      const eau = calme(new T.Mesh(geo, eauBoite)); eau.position.set(xc, yc, ZP); eau.renderOrder = 1; racine.add(eau);
      const regler = (tHaut, tBas) => {
        const col = geo.attributes.color, pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) { teinte(pos.getY(i) > 0 ? tHaut : tBas, tmp2); col.setXYZ(i, tmp2.r, tmp2.g, tmp2.b); }
        col.needsUpdate = true;
      };
      /* la chaleur qui part dans la pièce : des flèches qui avancent vers l'élève */
      /* une flèche (tige + pointe), qui monte vers l'avant */
      const geoF = (() => {
        const a = new T.CylinderGeometry(3.4, 3.4, 36, 8); a.translate(0, 18, 0);
        const b = new T.ConeGeometry(10, 26, 10); b.translate(0, 49, 0);
        const g = new T.BufferGeometry(), na = a.attributes.position.count;
        const pos = new Float32Array((na + b.attributes.position.count) * 3);
        pos.set(a.attributes.position.array, 0); pos.set(b.attributes.position.array, na * 3);
        g.setAttribute('position', new T.BufferAttribute(pos, 3));
        g.setIndex([...Array.from(a.index.array), ...Array.from(b.index.array, i => i + na)]);
        g.translate(0, -31, 0); g.rotateX(Math.PI / 4); return g;
      })();
      const fg = new T.Group(), items = [];
      for (let j = 0; j < 2; j++) for (let i = 0; i < 4; i++) {
        const m = calme(new T.Mesh(geoF, flecheMat)); fg.add(m);
        items.push({ m, x: xl + LR * (i + 0.5) / 4, y: Y0 + HR * (0.18 + j * 0.34), ph: ((i * 5 + j * 3) % 8) / 8 });
      }
      racine.add(fg);
      const fleches = k => items.forEach(o => {
        const u = (E.t * 0.45 + o.ph) % 1, s = k * Math.sin(Math.PI * u);
        o.m.visible = s > 0.06; o.m.scale.setScalar(Math.max(0.01, s * 1.35)); o.m.position.set(o.x, o.y + u * 120, 104 + u * 120);
      });
      return { g, regler, fleches };
    };
    const radA = faireRadiateur(XA), radB = faireRadiateur(XB);

    /* l'eau dans le radiateur (grains) : par le haut vers la droite, en bas par le canal de droite, retour vers la gauche */
    const interieur = xl => chemin([[xl, YT], [xl + LR - 45, YT], [xl + LR - 45, YO], [xl, YO]], 25);
    const iA = interieur(XA), iB = interieur(XB);
    flotsDe(iA, { flow: 'A', rayon: 5, pas: 80, parts: [[0, 0.33, () => S.tA0], [0.33, 0.67, () => (S.tA0 + S.tA1) / 2], [0.67, 1, () => S.tA1]] });
    flotsDe(iB, { flow: 'B', rayon: 5, pas: 80, parts: [[0, 0.33, () => S.tB0], [0.33, 0.67, () => (S.tB0 + S.tB1) / 2], [0.67, 1, () => S.tB1]] });

    /* ================================================================ LES VANNES D'ÉQUILIBRAGE (simplifiées) */
    const faireVanne = xc => {
      const g = new T.Group(); g.position.set(xc, YO, ZP);
      g.add(cylX(14, -31, 31, laiton, 0, 0, 24), hexX(18.5, -31, -20, laiton), hexX(18.5, 20, 31, laiton));
      g.add(cylZ(22, -22, 18, laiton, 0, 0, 20), cylZ(13, 10, 42, laiton, 0, 0, 16), cylZ(4.5, 38, 78, chrome, 0, 0, 8));
      const levee = new T.Group(); g.add(levee);                          /* le volant monte quand on ouvre */
      const volant = new T.Group(); levee.add(volant);
      volant.add(cylZ(35, 0, 12, marine, 0, 0, 24));
      [45, 135, 225, 315].forEach(a => volant.add(cylZ(5.5, 0, 12, marine, Math.cos(a * D) * 33, Math.sin(a * D) * 33, 8)));
      volant.add(bx(6, 18, 3, blanc, 0, 24, 13));        /* le repère du volant */
      levee.add(bx(46, 24, 3, blanc, 0, 0, 13.5));     /* la fenêtre du préréglage, qui ne tourne pas */
      const ecran = K.ecran(40, 18, { fond: '#f4f1ea', encre: '#1b3a63' }); ecran.mesh.position.set(0, 0, 15.2); levee.add(ecran.mesh);
      const poser = pre => { volant.rotation.z = -pre * 1.1; levee.position.z = 40 + pre * 6; };
      const ecrire = pre => ecran.ecrire([nb(pre, pre % 1 ? 1 : 0)], { aligne: 'center' });
      racine.add(g);
      return { g, poser, ecrire };
    };
    const vanA = faireVanne(XA - 55), vanB = faireVanne(XB - 55);
    vanA.ecrire(2.5);

    /* ================================================================ LE RETOUR (bleu) */
    const retour = new T.Group();
    const lSortie = 25, lVanne = 85;      /* la vanne occupe de 25 à 85 mm après le piquage du radiateur */
    const tRoA = chemin([[XA, YO], [xo(XA), YO], [xo(XA), YR]], 40);
    const tRoB = chemin([[XB, YO], [xo(XB), YO], [xo(XB), YR], [xo(XA), YR]], 40);
    const tR2 = chemin([[xo(XA), YR], [XRET, YR], [XRET, YC]], 40);
    const dFiltre = [-510 - (FX + 58), -510 - (FX - 58)];
    retour.add(fantomable(coque(tRoA, cuivre, [[lSortie, lVanne]]), 0.2));
    retour.add(fantomable(coque(tRoB, cuivre, [[lSortie, lVanne]]), 0.2));
    retour.add(fantomable(coque(tR2, cuivre, [dFiltre]), 0.2));
    const eRoA = eauTube(tRoA), eRoB = eauTube(tRoB), eR2 = eauTube(tR2);
    flotsDe(tRoA, { flow: 'A', parts: [[0, 1, () => S.tA1]] });
    flotsDe(tRoB, { flow: 'B', parts: [[0, 1, () => S.tB1]] });
    flotsDe(tR2, { flow: 'tot', parts: [[0, 1, () => tRet()]] });
    [[60, YR], [-250, YR], [-450, YR]].forEach(([x, y]) => retour.add(ringX(12.2, 10.6, x, x + 9, rubanB, y, ZP)));
    retour.add(ringX(12.2, 10.6, -620, -611, rubanB, YR, ZP), ringY(12.2, 10.6, 930, 939, rubanB, XRET, ZP));
    racine.add(retour);
    const tRet = () => { const q = S.fA + S.fB; return q > 0.03 ? (S.fA * S.tA1 + S.fB * S.tB1) / q : Math.min(S.tA1, S.tB1); };

    /* ================================================================ LE FILTRE (à tamis) */
    const filtre = new T.Group(); filtre.position.set(FX, YR, ZP);
    const fCorps = new T.Group();
    fCorps.add(cylX(24, -50, 50, laiton, 0, 0, 28), hexX(27, -58, -50, laiton), hexX(27, 50, 58, laiton));
    const branche = new T.Group(); branche.rotation.x = 135 * D; fCorps.add(branche);
    branche.add(cylY(20, 6, 70, laiton, 0, 0, 24), hexY(24, 70, 86, laiton, 0, 0));
    filtre.add(fantomable(fCorps, 0.2));
    const tamis = new T.Mesh(new T.CylinderGeometry(14, 14, 54, 16, 6, true), tamisMat); tamis.position.y = 36; tamis.userData.sansOmbre = true; branche.add(tamis);
    const boues = new T.Group(); boues.position.y = 46; branche.add(boues);
    [[0, 0, 10], [8, 5, 7], [-9, -4, 8], [4, 8, 6], [-4, -9, 7], [9, -7, 5]].forEach(([x, z, r], i) => {
      const s = K.mesh(K.sphere(r, 12), bouesMat, x, i * 3 - 6, z); s.userData.sansOmbre = true; boues.add(s);
    });
    racine.add(filtre);

    /* ================================================================ LE VASE D'EXPANSION (18 L) */
    const vase = new T.Group(); vase.position.set(VX, VY, VZ);
    const RV = 135, HV = 380, DOME = 46;
    const prof = [];
    for (let i = 0; i <= 8; i++) { const a = i / 8 * Math.PI / 2; prof.push(new T.Vector2(Math.sin(a) * RV, DOME - Math.cos(a) * DOME)); }
    for (let i = 0; i <= 8; i++) { const a = i / 8 * Math.PI / 2; prof.push(new T.Vector2(Math.cos(a) * RV, HV - DOME + Math.sin(a) * DOME)); }
    const cuve = new T.Mesh(new T.LatheGeometry(prof, 36), rougeVase);
    const vCorps = A(cuve, cylY(9, HV, HV + 14, noir, 0, 0, 16), cylY(14, -18, 0, laiton, 0, 0, 20), hexY(19, -30, -16, laiton, 0, 0));
    vase.add(fantomable(vCorps, 0.14));
    vase.add(ringY(139, 134, 210, 232, zingue, 0, 0, 44));
    [150, 300].forEach(y => vase.add(bx(90, 50, 15, zingue, 0, y, -142)));
    /* dedans : l'eau sous la membrane, le gaz au-dessus */
    const membrane = cylY(128, -2.5, 2.5, caout, 0, 0, 44); vase.add(membrane);
    const eauV = new T.Mesh(K.cylindre(126, 1, 40), eauVase); calme(eauV); vase.add(eauV);
    const gazV = new T.Mesh(K.cylindre(126, 1, 40), gazVase); calme(gazV); vase.add(gazV);
    racine.add(vase);
    const tVase = chemin([[XRET, 420], [-1180, 420], [VX, 470, VZ], [VX, VY, VZ]], 40);
    const coqueVase = fantomable(coque(tVase, cuivre), 0.2); vase.add(coqueVase); coqueVase.position.set(-VX, -VY, -VZ);
    const eVase = eauTube(tVase);
    flotsDe(tVase, { flow: 'vase', rayon: 5.6, pas: 60 });
    const poserVase = n => {
      const ym = 60 + 160 * n;
      membrane.position.y = ym;
      eauV.scale.y = ym - 36.5; eauV.position.y = 34 + (ym - 36.5) / 2;
      gazV.scale.y = 346 - ym - 2.5; gazV.position.y = ym + 2.5 + (346 - ym - 2.5) / 2;
      const t = 0.15 + 0.65 * n; eauVase.color.copy(teinte(t)); eVase.regler(t, t);
    };

    /* ================================================================ LE PURGEUR AUTOMATIQUE (point haut) */
    const purgeur = new T.Group();
    const tVent = chemin([[XVENT, YD], [XVENT, 1012]], 1);
    purgeur.add(fantomable(coque(tVent, cuivre), 0.2));
    const eVent = eauTube(tVent); eVent.regler(1, 1);
    const corpsVent = A(hexY(17, 1004, 1018, laiton, XVENT, ZP), cylY(27, 1018, 1100, laiton, XVENT, ZP, 24), cylY(11, 1100, 1116, noir, XVENT, ZP, 16));
    purgeur.add(fantomable(corpsVent, 0.22));
    racine.add(purgeur);
    /* l'air : une grosse bulle dans le purgeur, une poche sous le tube, trois bulles qui montent */
    const air = new T.Group(); racine.add(air);
    const bulle = (r, sx, sy, sz, x, y) => { const m = calme(new T.Mesh(K.sphere(r, 16), airMat)); m.scale.set(sx, sy, sz); m.position.set(x, y, ZP); air.add(m); return m; };
    const grosseBulle = bulle(1, 21, 34, 21, XVENT, 1060);
    const poche = bulle(1, 30, 5.5, 6.5, XVENT, YD + 3.6);
    const petites = [[4.5, 0], [3.4, 0.37], [2.8, 0.71]].map(([r, ph]) => ({ m: bulle(r, 1, 1, 1, XVENT, 900), ph, r }));

    /* ================================================================ LES COLLIERS (rien à dire, tout est tenu) */
    const colliers = new T.Group();
    const collierH = (x, y) => { colliers.add(ringX(14, 11, x - 4, x + 4, zingue, y, ZP, 16), bx(8, 10, ZP - 11, zingue, x, y, (ZP - 11) / 2)); };
    const collierV = (x, y) => { colliers.add(ringY(14, 11, y - 4, y + 4, zingue, x, ZP, 16), bx(10, 8, ZP - 11, zingue, x, y, (ZP - 11) / 2)); };
    [[-330, YD], [-70, YD], [100, YD], [-100, YR], [-340, YR], [-560, YR], [-900, YR]].forEach(([x, y]) => collierH(x, y));
    [[XRET, 300], [XRET, 640], [XRET, 860], [xo(XA), 200], [xo(XB), 200], [xi(XA), 825], [xi(XB), 825]].forEach(([x, y]) => collierV(x, y));
    racine.add(colliers);

    /* ================================================================ LES PIÈCES (11) */
    const pieces = [
      { id: 'chaudiere', nom: 'La chaudière', objets: [chaudiere], desc: 'Elle chauffe l’eau. Dessous, quatre piquages : le retour à gauche, d’où l’eau froide arrive, le départ à droite, d’où l’eau chaude repart. Les deux du milieu servent à l’eau sanitaire.' },
      { id: 'depart', nom: 'Le départ (ruban rouge)', objets: [depart], ancre: [-250, YD, ZP], desc: 'Le tube en cuivre qui emmène l’eau chaude vers les radiateurs. Un ruban rouge le repère : on ne confond jamais départ et retour.' },
      { id: 'circulateur', nom: 'Le circulateur', objets: [pompe], desc: 'Une petite pompe sur le départ. Elle ne chauffe pas l’eau : elle la pousse, pour qu’elle fasse le tour de la boucle.' },
      { id: 'radA', nom: 'Le radiateur de la branche A', objets: [radA.g], desc: 'Il donne la chaleur de l’eau à la pièce. L’eau entre en haut, chaude, et ressort en bas, plus froide.' },
      { id: 'vanneA', nom: 'La vanne d’équilibrage A', objets: [vanA.g], desc: 'Sur le tube de sortie du radiateur. Son réglage (le chiffre dans la fenêtre) limite le débit de la branche. Réglée une fois par le chauffagiste, on n’y touche plus.' },
      { id: 'radB', nom: 'Le radiateur de la branche B', objets: [radB.g], desc: 'Le deuxième radiateur, sur sa propre branche. S’il reste froid alors que l’autre chauffe, le problème est sur cette branche.' },
      { id: 'vanneB', nom: 'La vanne d’équilibrage B', objets: [vanB.g], desc: 'Même vanne que la A, sur la branche B. Fermée, le volant est vissé à fond et le chiffre indique 0 : plus d’eau dans la branche.' },
      { id: 'retour', nom: 'Le retour (ruban bleu)', objets: [retour], ancre: [-300, YR, ZP], desc: 'Le tube qui ramène l’eau refroidie vers la chaudière. Les deux branches s’y rejoignent. Un ruban bleu le repère.' },
      { id: 'filtre', nom: 'Le filtre', objets: [filtre], desc: 'Il retient les boues et la rouille pour protéger la chaudière et le circulateur. Un tamis dans le bouchon : on le nettoie de temps en temps.' },
      { id: 'vase', nom: 'Le vase d’expansion', objets: [vase], desc: 'L’eau chaude prend plus de place que l’eau froide. Le vase encaisse cet excès : une membrane sépare l’eau d’un coussin de gaz.' },
      { id: 'purgeur', nom: 'Le purgeur automatique', objets: [purgeur], desc: 'Posé au point le plus haut. L’air monte jusqu’à lui et sort. S’il reste de l’air dans les tubes, l’eau passe mal.' }
    ];

    /* ================================================================ LES TEXTES */
    const TEXTES = {
      'normal': '<strong>Tout fonctionne.</strong> L’eau part rouge de la chaudière, donne sa chaleur dans les deux radiateurs et revient bleue.',
      'air': '<strong>Air en point haut.</strong> Une poche d’air s’est installée dans le purgeur, en haut du circuit. L’eau passe mal : le débit baisse partout et les radiateurs chauffent moins. Il faut purger.',
      'vanne-b': '<strong>Vanne de la branche B fermée.</strong> L’eau ne passe plus dans la branche B : son radiateur reste froid. La branche A, elle, chauffe comme avant.',
      'reglage-b': '<strong>Branche B mal réglée.</strong> La vanne est presque fermée (0,5 au lieu de 2,5) : un filet d’eau passe, le radiateur B chauffe à peine.',
      'filtre': '<strong>Filtre encrassé.</strong> Les boues bouchent le tamis : l’eau passe plus difficilement dans tout le circuit. Le débit baisse dans les deux branches.',
      'arret': '<strong>Circulateur à l’arrêt.</strong> L’eau ne bouge plus nulle part. La chaudière chauffe toujours la même eau, et les radiateurs refroidissent peu à peu. <em>À l’écran, ce refroidissement est accéléré.</em>'
    };
    const majTexte = () => {
      const c = CIBLES[E.etat];
      ctx.dire(TEXTES[E.etat]);
      ctx.mesures([
        { libelle: 'Le départ', valeur: c.dep + ' °C' },
        { libelle: 'Le retour', valeur: c.ret },
        { libelle: 'Le radiateur B', valeur: c.bB }
      ]);
      afficheur.ecrire([c.dep + ' °C'], { aligne: 'center' });
      vanB.ecrire(c.preB);
    };

    /* ================================================================ POSER L'ÉTAT SUR LA SCÈNE */
    const poser = () => {
      eauSerp.regler(0.12, 1);
      eRoA.regler(S.tA1, S.tA1); eRoB.regler(S.tB1, S.tB1); eR2.regler(tRet(), tRet());
      radA.regler(S.tA0, S.tA1); radB.regler(S.tB0, S.tB1);
      vanA.poser(2.5); vanB.poser(S.preB);
      poserVase(S.vase);
      leds.forEach((m, i) => { m.material = S.pw > 0.5 && i === 0 ? ledMarche : ledEteinte; });
      flammes.visible = S.pw > 0.3;
      /* l'air */
      const on = E.fantome && S.air > 0.03;
      air.visible = on;
      grosseBulle.scale.set(21 * S.air, 34 * S.air, 21 * S.air);
      poche.scale.set(30 * S.air, 5.5 * S.air, 6.5 * S.air);
      petites.forEach(o => {
        const u = (E.t * 0.28 + o.ph) % 1;
        o.m.position.y = 892 + u * 110; o.m.scale.setScalar(Math.max(0.01, o.r * S.air));
      });
      /* l'eau qui circule : les grains ne se voient que quand les tubes sont transparents */
      flots.forEach(o => {
        let q, sens = 1;
        if (o.flow === 'vase') { q = Math.abs(S.vRate) * 2.2; sens = S.vRate >= 0 ? 1 : -1; if (q < 0.1) q = 0; }
        else q = debitDe(o.flow);
        const vu = E.fantome && q > 0.03;
        o.f.objet.visible = vu;
        if (!vu) return;
        o.f.regler({ debit: clamp(0.35 + 0.65 * q, 0, 1), vitesse: Math.min(190, 100 * q), sens });
        o.f.objet.material.color.copy(teinte(o.flow === 'vase' ? 0.15 + 0.65 * S.vase : o.fnT(), tmp2)).lerp(cW, 0.55);
      });
      radA.fleches(clamp((S.tA0 - 0.15) / 0.7, 0, 1));
      radB.fleches(clamp((S.tB0 - 0.15) / 0.7, 0, 1));
    };

    /* ---------------------------------------------------------------- la vue « voir l'eau » */
    const basculerFantome = on => {
      E.fantome = !!on;
      fantomes.forEach(o => { o.m.material = on ? o.f : o.plein; o.m.userData.voile = !!on; o.m.castShadow = !on; });
      aretes.forEach(l => { l.visible = !!on; });
      poser();
    };

    majTexte(); poser();

    /* ================================================================ LES ÉTAPES (7) */
    const vueBase = ctx.mode === 'decouvrir' ? { azimut: 16, elevation: 13 } : { azimut: 12, elevation: 10 };
    const etapes = [
      { titre: 'La chaudière chauffe l’eau', piece: 'chaudiere', voirDedans: true, actions: [['etat', 'normal']],
        vue: { azimut: 14, elevation: 8, zoom: 2.3, cible: [-905, 1250, 110] },
        texte: 'L’eau froide du retour entre dans la chaudière, passe dans l’échangeur au-dessus de la flamme et repart chaude : elle devient rouge.' },
      { titre: 'L’eau chaude part par le départ', piece: 'depart', voirDedans: true, actions: [['etat', 'normal']],
        vue: { azimut: 10, elevation: 10, zoom: 1.6, cible: [-280, 830, 90] },
        texte: 'Le départ, repéré en rouge, emmène l’eau chaude vers les deux radiateurs. À chaque branche, l’eau se partage.' },
      { titre: 'Le radiateur donne sa chaleur à la pièce', piece: 'radA', voirDedans: true, actions: [['etat', 'normal']],
        vue: { azimut: 18, elevation: 10, zoom: 2.8, cible: [-130, 520, 110] },
        texte: 'L’eau entre chaude en haut du radiateur et ressort en bas, plus froide. La chaleur qu’elle a perdue part dans la pièce : ce sont les flèches orange.' },
      { titre: 'L’eau refroidie revient par le retour', piece: 'retour', voirDedans: true, actions: [['etat', 'normal']],
        vue: { azimut: -6, elevation: 12, zoom: 1.7, cible: [-420, 400, 70] },
        texte: 'Les deux branches se rejoignent dans le retour, repéré en bleu. C’est la même eau qui revient à la chaudière pour être réchauffée.' },
      { titre: 'Le circulateur fait tourner l’eau', piece: 'circulateur', voirDedans: true, actions: [['etat', 'normal']],
        vue: { azimut: 42, elevation: 24, zoom: 4, cible: [-640, 900, 130] },
        texte: 'La roue du circulateur pousse l’eau dans le départ. Il ne la chauffe pas, il la fait circuler. Essayez « Circulateur à l’arrêt » : l’eau s’arrête partout.' },
      { titre: 'Le vase absorbe la dilatation', piece: 'vase', voirDedans: true, ralenti: true, actions: [['etat', 'normal'], ['vaseFroid', true]],
        vue: { azimut: -12, elevation: 8, zoom: 2.6, cible: [-1190, 700, 150] },
        texte: 'En chauffant, l’eau prend plus de place. Elle entre dans le vase et repousse la membrane, qui serre le gaz. Sans le vase, la pression monterait trop.' },
      { titre: 'Une branche reste froide', piece: 'vanneB', voirDedans: true, actions: [['etat', 'vanne-b']],
        vue: { azimut: 14, elevation: 10, zoom: 2.4, cible: [330, 520, 100] },
        texte: 'La vanne de la branche B est fermée : plus d’eau chaude dans le radiateur B. On le constate à la main : B est froid, A est chaud. Et sur la vanne : le volant est vissé, le chiffre est à 0.' }
    ];

    /* ================================================================ LES COMMANDES */
    const commandes = [
      { id: 'etat', type: 'choix', valeur: E.etat, options: [
        ['normal', 'Normal'], ['air', 'Air en point haut'], ['vanne-b', 'Vanne de la branche B fermée'],
        ['reglage-b', 'Branche B mal réglée'], ['filtre', 'Filtre encrassé'], ['arret', 'Circulateur à l’arrêt']] }
    ];

    const cadre = [chaudiere, vase, radB.g, radA.g, retour];
    const vueIni = Object.assign({ cadre, marge: 0.66 }, vueBase,
      opts.depart === 'branche-froide' ? { cible: [60, 560, 100], zoom: 1.4, azimut: 14, elevation: 10 } : {});

    return {
      racine, pieces, commandes, etapes,
      vue: vueIni,
      phrase: TEXTES[E.etat],
      libellesFantome: ['◐ Voir l’eau', '◑ Refermer'],
      basculerFantome,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'etat' && CIBLES[v]) {
          E.etat = v; ctx.regler('etat', v); majTexte();
        } else if (id === 'vaseFroid') {
          S.vase = 0; E.vaseCible = 0; E.delaiVase = 0.3;
        }
        poser(); ctx.reveiller();
      },
      animer(dt) {
        E.t += dt;
        const c = CIBLES[E.etat];
        S.fA = K.vers(S.fA, c.fA, 2.6, dt); S.fB = K.vers(S.fB, c.fB, 2.6, dt);
        S.tA0 = K.vers(S.tA0, c.tA[0], 1.3, dt); S.tA1 = K.vers(S.tA1, c.tA[1], 1.3, dt);
        S.tB0 = K.vers(S.tB0, c.tB[0], 1.3, dt); S.tB1 = K.vers(S.tB1, c.tB[1], 1.3, dt);
        S.pw = K.vers(S.pw, c.pompe, 2.2, dt); S.air = K.vers(S.air, c.air, 2.2, dt);
        S.enc = K.vers(S.enc, c.enc, 2.0, dt); S.preB = K.vers(S.preB, c.preB, 2.2, dt);
        if (E.delaiVase > 0) { E.delaiVase -= dt; if (E.delaiVase <= 0) E.vaseCible = 1; }
        const v0 = S.vase; S.vase = K.vers(S.vase, E.vaseCible, 1.3, dt);
        S.vRate = (S.vase - v0) / Math.max(dt, 1e-4);
        /* ce qui tourne : la roue du circulateur, le rotor ; ce qui brûle : les flammes ; ce qui s'encrasse */
        S.rot += S.pw * dt * 9;
        roue.rotation.z = -S.rot; tournant.rotation.z = -S.rot;
        flammes.children.forEach((f, i) => { f.scale.y = 0.75 + 0.35 * Math.sin(E.t * 11 + i * 1.7); });
        const e = Math.max(0.001, S.enc); boues.scale.setScalar(e);
        poser();
        const fini = Math.abs(S.fA - c.fA) + Math.abs(S.fB - c.fB) + Math.abs(S.tA0 - c.tA[0]) + Math.abs(S.tB0 - c.tB[0]) + Math.abs(S.tA1 - c.tA[1]) + Math.abs(S.tB1 - c.tB[1])
          + Math.abs(S.air - c.air) + Math.abs(S.enc - c.enc) + Math.abs(S.pw - c.pompe) + Math.abs(S.preB - c.preB) + Math.abs(S.vase - E.vaseCible) < 0.004 && E.delaiVase <= 0;
        const arrows = S.tA0 > 0.17 || S.tB0 > 0.17, rouleaux = E.fantome && (S.fA + S.fB > 0.03);
        return !fini || arrows || rouleaux || S.pw > 0.01 || S.air > 0.03;
      },
      detruire() { cacheFantome.forEach(m => m.dispose()); }
    };
  }, { famille: 'installations', titre: 'Une petite installation de chauffage', stations: ['boucle', 'mission', 'diagnostic'] });
})();
