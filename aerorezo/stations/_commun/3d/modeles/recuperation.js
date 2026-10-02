/* AéroRézo 3D — famille « recuperation » : le caisson de VMC double flux et son échangeur.
   Unités : mm. Repère : X le long du caisson (1 000), Y vers le haut (300), Z vers l'avant
   (+Z = la face qu'on voit ; profondeur 600). Les quatre piquages Ø 160 sont sur le dessus.

   CE QUE L'ÉLÈVE DOIT VOIR : deux airs qui se croisent dans un bloc de plaques SANS se toucher.
   L'air neuf entre à gauche, traverse le filtre, glisse entre deux plaques (de gauche à droite) ;
   l'air extrait entre à l'avant, traverse son filtre, glisse entre les plaques voisines (d'avant
   en arrière), à angle droit. La chaleur passe à travers la plaque, l'air non. Chaque air a son
   ventilateur et sa sortie. L'été, un volet fait passer l'air neuf par-dessus l'échangeur.

   CHOIX : échangeur à FLUX CROISÉS (plaques posées à plat). C'est celui que la station dessine
   (« les deux trajets se croisent ») et le seul où une seule coupe montre les deux airs sans
   cacher la moitié des pièces. Les appareils récents à contre-courant (plaques hexagonales) sont
   plus efficaces : voir la fiche, doute métier n° 1.

   COULEURS DE L'AIR (communes à AéroRézo) : air neuf vert 0x2f9e5a · air repris / extrait jaune
   0xd9a21b · air soufflé bleu 0x2f7fd6 · air rejeté brun 0x8a5a3c. Un mélange prend la teinte
   intermédiaire. La couleur ne porte jamais seule l'information : le texte nomme l'air.

   DEUX COUPES (le bouton « Voir en coupe » les ouvre, une commande interne choisit laquelle) :
   · coupe Z : on retire la moitié avant → l'air neuf d'un bout à l'autre ;
   · coupe X : on retire la moitié droite → l'air extrait d'un bout à l'autre.
   Les entrées-sorties des deux autres airs restent visibles dans la moitié gardée.
   Les moteurs restent entiers (rien à y lire). */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('caissonDoubleFlux', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const D = Math.PI / 180;
    const AIR = { neuf: 0x2f9e5a, repris: 0xd9a21b, souffle: 0x2f7fd6, rejete: 0x8a5a3c };
    const num = (v, d) => (typeof v === 'number' && isFinite(v)) ? v : d;
    const opt = ctx.options || {};
    /* les trois températures de la station (activité « recovery ») : réglables par les options */
    const DEPART = { out: num(opt.outdoor, 5), ext: num(opt.extract, 21), sup: num(opt.supply, 17) };

    /* ---------------------------------------------------------------- matières
       Tout ce qui se coupe a sa matière propre, double face. */
    const C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; return c; };
    const tole = C(K.plastique(0xe4e6e3, 0.45));            /* tôle prélaquée blanche, extérieur */
    const ppe = C(K.plastique(0x6f7378, 0.92));             /* polypropylène expansé, gris foncé */
    const galva = C(M.zingue, 0xbfc5c9);
    const alu = C(M.aluminium, 0x9fa9b3);                   /* plaques de l'échangeur */
    const joint = C(K.plastique(0xe9e7df, 0.5));            /* joints d'étanchéité des plaques */
    const media = C(K.plastique(0xf0e9d2, 0.92));           /* le média plissé du filtre */
    const cadreFiltre = C(K.plastique(0x4a5058, 0.6));
    const carter = C(K.plastique(0x9aa0a6, 0.55));          /* plaques du caisson de ventilateur */
    const pvc = C(K.plastique(0x8d9298, 0.5));
    const volet = C(M.aluminium, 0xc9ced3);
    const roueMat = C(M.plastiqueMarine);
    const roueTole = C(M.aluminium, 0xaab2ba);
    const bande = k => C(K.plastique(AIR[k], 0.5));         /* la bande de couleur de chaque piquage */
    /* les moteurs restent entiers en coupe : leurs matières ne servent à rien d'autre */
    const moteurMat = K.propre(M.fonte); moteurMat.color.setHex(0x4f6a86);
    const moteurAcier = K.propre(M.acier);

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
    /* une forme de révolution autour de l'axe X : points [rayon, x] */
    const revolutionX = (pts, mat, y, z, seg) => {
      const g = new T.LatheGeometry(pts.map(([r, x]) => new T.Vector2(r, x)), seg || 40);
      g.rotateZ(-Math.PI / 2);
      const m = new T.Mesh(g, mat); m.position.set(0, y, z); return m;
    };
    /* une dalle horizontale (x0..x1, z0..z1) d'épaisseur y0..y1, percée de trous ronds [cx, cz, r] */
    const dalle = (x0, x1, z0, z1, y0, y1, trous, mat) => {
      const s = new T.Shape();
      s.moveTo(x0, -z0); s.lineTo(x1, -z0); s.lineTo(x1, -z1); s.lineTo(x0, -z1); s.lineTo(x0, -z0);
      trous.forEach(([cx, cz, r]) => { const p = new T.Path(); p.absarc(cx, -cz, r, 0, Math.PI * 2, true); s.holes.push(p); });
      const g = new T.ExtrudeGeometry(s, { depth: y1 - y0, bevelEnabled: false, curveSegments: 28 });
      g.rotateX(-Math.PI / 2); g.translate(0, y0, 0);
      return new T.Mesh(g, mat);
    };

    /* ================================================================ LES COTES */
    const XO = 500, ZO = 300;                  /* le boîtier : 1 000 × 600 × 300 */
    const YF = 20, YL = 280;                   /* dessus du plancher, dessous du couvercle */
    const EX = 150, EZ = 90;                   /* l'échangeur : 300 (X) × 180 (Z) */
    const NP = 11, PE = 1.6, VO = 17.4;        /* 11 plaques de 1,6 mm, 10 voies de 17,4 mm (exagérées : en vrai ~ 5 mm) */
    const Y0E = 24, PAS = PE + VO, YTOP = Y0E + PAS * (NP - 1) + PE;   /* dessus de l'échangeur : 215,6 */
    const COL = {                              /* les quatre piquages Ø 160, en ligne sur le dessus */
      neuf: { x: -345, z: 0 }, souffle: { x: 275, z: 0 }, repris: { x: 0, z: 198 }, rejete: { x: 0, z: -181 }
    };
    const G_ZIG = -6;                          /* les grains de l'air neuf courent juste derrière le plan de coupe Z */
    const X_ZIG = -6;                          /* ceux de l'air extrait, juste derrière le plan de coupe X */

    /* ================================================================ LE BOÎTIER */
    const corps = new T.Group();
    const couvercle = new T.Group();
    const trousLid = Object.values(COL).map(c => [c.x, c.z, 80.5]);
    /* plancher, couvercle : EPP (18,8 mm) sous une peau de tôle (1,2 mm) */
    /* l'EPP est en retrait de 1,2 mm de la peau : aucune face ne se superpose à une autre */
    corps.add(dalle(-XO + 1.2, XO - 1.2, -ZO + 1.2, ZO - 1.2, 1.2, YF, [[100, 0, 10.5]], ppe), dalle(-XO, XO, -ZO, ZO, 0, 1.2, [[100, 0, 10.5]], tole));
    couvercle.add(dalle(-XO + 1.2, XO - 1.2, -ZO + 1.2, ZO - 1.2, YL, 298.8, trousLid, ppe), dalle(-XO, XO, -ZO, ZO, 298.8, 300, trousLid, tole));
    corps.add(couvercle);
    /* les quatre parois : peau pleine devant et derrière, peau entre elles sur les côtés */
    [-1, 1].forEach(s => {
      corps.add(boite(s > 0 ? XO - 20 : -XO + 1.2, s > 0 ? XO - 1.2 : -XO + 20, YF, YL, -ZO + 1.2, ZO - 1.2, ppe), boite(s > 0 ? XO - 1.2 : -XO, s > 0 ? XO : -XO + 1.2, 1.2, 298.8, -ZO + 1.2, ZO - 1.2, tole));
      corps.add(boite(-XO + 20, XO - 20, YF, YL, s > 0 ? ZO - 20 : -ZO + 1.2, s > 0 ? ZO - 1.2 : -ZO + 20, ppe), boite(-XO, XO, 1.2, 298.8, s > 0 ? ZO - 1.2 : -ZO, s > 0 ? ZO : -ZO + 1.2, tole));
    });
    /* les cloisons d'EPP de 8 mm : elles séparent les quatre bras autour de l'échangeur */
    [-1, 1].forEach(s => {
      const z0 = s > 0 ? EZ : -EZ - 8, z1 = z0 + 8;
      corps.add(boite(-XO + 20, -EX, YF, YL, z0, z1, ppe), boite(EX, XO - 20, YF, YL, z0, z1, ppe));      /* bras gauche et droit */
      corps.add(boite(-EX, EX, YTOP, YL, z0, z1, ppe));                                                 /* le conduit de by-pass au-dessus du bloc */
      const x0 = s > 0 ? EX : -EX - 8;
      corps.add(boite(x0, x0 + 8, YF, YL, EZ, ZO - 20, ppe), boite(x0, x0 + 8, YF, YL, -ZO + 20, -EZ, ppe)); /* bras avant et arrière */
    });
    racine.add(corps);

    /* ================================================================ LES PIQUAGES Ø 160 */
    const piquages = new T.Group();
    Object.entries(COL).forEach(([air, p]) => {
      const g = new T.Group();
      const tube = new T.Mesh(new T.CylinderGeometry(80, 80, 118, 40, 1, true), galva); tube.position.set(p.x, 321, p.z); g.add(tube);
      const rebord = new T.Mesh(new T.TorusGeometry(80, 2.8, 8, 40), galva); rebord.rotation.x = Math.PI / 2; rebord.position.set(p.x, 378, p.z); g.add(rebord);
      const col = new T.Mesh(new T.CylinderGeometry(82, 82, 14, 40, 1, true), bande(air)); col.position.set(p.x, 346, p.z); g.add(col);
      const bride = new T.Mesh(K.anneau(92, 80, 3, 40), galva); bride.position.set(p.x, 301.5, p.z); g.add(bride);
      piquages.add(g);
    });
    racine.add(piquages);

    /* ================================================================ L'ÉCHANGEUR À PLAQUES
       Onze plaques d'aluminium posées à plat, dix voies entre elles. Voies paires : l'air neuf,
       de gauche à droite, fermées devant et derrière. Voies impaires : l'air extrait, d'avant en
       arrière, fermées à gauche et à droite. Les joints sont les petites bandes claires. */
    const echangeur = new T.Group();
    const yPlaque = k => Y0E + PAS * k;
    const yVoie0 = i => yPlaque(i) + PE, yVoie1 = i => yPlaque(i) + PE + VO, yVoieC = i => yPlaque(i) + PE + VO / 2;
    for (let k = 0; k < NP; k++) echangeur.add(boite(-EX, EX, yPlaque(k), yPlaque(k) + PE, -EZ, EZ, alu));
    for (let i = 0; i < NP - 1; i++) {
      if (i % 2) { echangeur.add(boite(-EX, -EX + 6, yVoie0(i), yVoie1(i), -EZ, EZ, joint), boite(EX - 6, EX, yVoie0(i), yVoie1(i), -EZ, EZ, joint)); }
      else { echangeur.add(boite(-EX, EX, yVoie0(i), yVoie1(i), -EZ, -EZ + 6, joint), boite(-EX, EX, yVoie0(i), yVoie1(i), EZ - 6, EZ, joint)); }
    }
    racine.add(echangeur);

    /* ================================================================ LES FILTRES (média plissé en zigzag) */
    const filtre = long => {
      const g = new T.Group(), pts = [];
      for (let y = 24; y <= 276.01; y += 9) pts.push([(pts.length % 2) ? 9 : -9, y]);
      const s = new T.Shape();
      pts.forEach((p, i) => i ? s.lineTo(p[0], p[1]) : s.moveTo(p[0], p[1]));
      for (let i = pts.length - 1; i >= 0; i--) s.lineTo(pts[i][0] + 1.5, pts[i][1]);
      const geo = new T.ExtrudeGeometry(s, { depth: 2 * (long - 3), bevelEnabled: false });
      geo.translate(0, 0, -(long - 3));
      g.add(new T.Mesh(geo, media));
      g.add(boite(-13, 13, 22, 26, -long, long, cadreFiltre), boite(-13, 13, 274, 278, -long, long, cadreFiltre));
      g.add(boite(-13, 13, 26, 274, -long, -long + 3, cadreFiltre), boite(-13, 13, 26, 274, long - 3, long, cadreFiltre));
      g.userData.zigzag = pts.map(p => [p[0], p[1]]).concat(pts.slice().reverse().map(p => [p[0] + 1.5, p[1]]));
      return g;
    };
    const filtreNeuf = filtre(EZ); filtreNeuf.position.set(-241, 0, 0);
    const filtreExtrait = filtre(EX); filtreExtrait.rotation.y = Math.PI / 2; filtreExtrait.position.set(0, 0, 109);
    racine.add(filtreNeuf, filtreExtrait);

    /* ================================================================ LES VENTILATEURS
       Roue à réaction (aubes recourbées vers l'arrière), moteur à rotor extérieur dans le moyeu,
       logée dans un petit caisson : l'air entre par l'ouïe de face et sort par le haut, vers le piquage.
       Repère local : x = sens de l'air, de l'ouïe (x = 5) vers le fond (x = 169). */
    const plaque = (W, x0, ep, ouie) => {
      const s = new T.Shape();
      s.moveTo(-W, YF); s.lineTo(W, YF); s.lineTo(W, YL); s.lineTo(-W, YL); s.lineTo(-W, YF);
      if (ouie) { const p = new T.Path(); p.absarc(0, 150, 70, 0, Math.PI * 2, true); s.holes.push(p); }
      const g = new T.ExtrudeGeometry(s, { depth: ep, bevelEnabled: false, curveSegments: 28 });
      g.rotateY(Math.PI / 2); g.translate(x0, 0, 0);
      return new T.Mesh(g, carter);
    };
    const aube = phi0 => {
      const N = 8, pts = [], bord = [];
      for (let i = 0; i <= N; i++) {
        const u = i / N, r = 56 + u * 26, a = phi0 - u * 36 * D;
        const p = new T.Vector2(Math.cos(a) * r, Math.sin(a) * r), t = new T.Vector2(Math.cos(a + 1.2), Math.sin(a + 1.2));
        pts.push(p.clone().addScaledVector(t, 1.2)); bord.push(p.clone().addScaledVector(t, -1.2));
      }
      const s = new T.Shape(pts); bord.reverse().forEach(p => s.lineTo(p.x, p.y));
      const g = new T.ExtrudeGeometry(s, { depth: 38, bevelEnabled: false, curveSegments: 3 });
      g.applyMatrix4(new T.Matrix4().makeBasis(V(0, 1, 0), V(0, 0, 1), V(1, 0, 0)));
      g.translate(62, 0, 0);
      return new T.Mesh(g, roueMat);
    };
    const PAV = [[70, 9], [66, 20], [62, 34], [58, 50], [56, 58]];          /* l'ouïe : [rayon, x] */
    const ventilateur = W => {
      const g = new T.Group(), roue = new T.Group(), moteur = new T.Group();
      g.add(plaque(W, 5, 4, true), plaque(W, 165, 4, false));
      g.add(revolutionX(PAV.concat(PAV.slice().reverse().map(([r, x]) => [r - 2, x])), carter, 150, 0, 40));
      roue.add(revolutionX([[56, 60], [82, 60], [82, 63], [56, 63], [56, 60]], roueTole, 0, 0, 40));
      roue.add(cyl('x', 82, 100, 105, 0, 0, roueTole, 40), cyl('x', 30, 98, 112, 0, 0, roueMat, 24));
      for (let i = 0; i < 9; i++) roue.add(aube(i * 40 * D));
      roue.position.set(0, 150, 0);
      moteur.add(cyl('x', 34, 112, 165, 150, 0, moteurMat, 32), cyl('x', 7, 100, 114, 150, 0, moteurAcier, 12));
      for (let x = 122; x < 160; x += 9) moteur.add(cyl('x', 37, x, x + 3, 150, 0, moteurMat, 32));
      g.add(roue, moteur);
      return { g, roue, moteur };
    };
    const ventNeuf = ventilateur(EZ); ventNeuf.g.position.set(190, 0, 0);          /* ventilateur de soufflage (air neuf → soufflé) */
    const ventExtrait = ventilateur(EX); ventExtrait.g.rotation.y = Math.PI / 2; ventExtrait.g.position.set(0, 0, -96);   /* ventilateur d'extraction (extrait → rejeté) */
    racine.add(ventNeuf.g, ventExtrait.g);

    /* ================================================================ LE BY-PASS D'ÉTÉ
       Deux volets liés : l'un ferme l'entrée de l'échangeur, l'autre ferme le conduit du dessus.
       Jamais ouverts ensemble : l'air passe par l'un OU par l'autre. */
    const volets = new T.Group();
    const lameEch = [], lameBy = [];
    const lame = (yc, L) => {
      const g = new T.Group();
      g.add(boite(-L / 2, L / 2, -1, 1, -EZ + 4, EZ - 4, volet), cyl('z', 2.6, -EZ - 2, EZ + 2, 0, 0, galva, 10));
      g.position.set(-190, yc, 0); volets.add(g); return g;
    };
    for (let i = 0; i < 4; i++) lameEch.push(lame(Y0E + 24 + i * 48, 46));
    lameBy.push(lame(247, 60));
    racine.add(volets);

    /* ================================================================ LE BAC À CONDENSATS ET SON ÉVACUATION */
    const bac = new T.Group();
    bac.add(dalle(-148, 148, -88, 88, YF, 22, [[100, 0, 10.5]], galva));
    bac.add(boite(-148, 148, 22, 24, 65, 75, joint), boite(-148, 148, 22, 24, -75, -65, joint));   /* deux rails qui portent le bloc */
    bac.add(cyl('y', 10, -30, 20, 100, 0, pvc, 20));                                              /* l'évacuation, Ø 20 */
    const eauBac = boite(-146, 146, 22, 23.4, -86, 86, new T.MeshStandardMaterial({ color: 0x5fa6e6, roughness: 0.2, transparent: true, opacity: 0.6, depthWrite: false, side: T.DoubleSide }));
    eauBac.userData.voile = true; eauBac.userData.sansOmbre = true; eauBac.visible = false;
    bac.add(eauBac);
    racine.add(bac);

    /* ================================================================ LES FACES DE COUPE
       Plan z = 0 (coupe Z, coordonnée u = x) ou plan x = 0 (coupe X, coordonnée u = −z). */
    const hachures = (fond, trait, pas, ep) => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = fond; x.fillRect(0, 0, 64, 64);
      x.strokeStyle = trait; x.lineWidth = ep || 5;
      for (let i = -64; i <= 64; i += 32) { x.beginPath(); x.moveTo(i, 64); x.lineTo(i + 64, 0); x.stroke(); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / pas, 1 / pas);
      return new T.MeshStandardMaterial({ map: t, roughness: 0.8, side: T.DoubleSide });
    };
    const plat = c => new T.MeshStandardMaterial({ color: c, roughness: 0.55, side: T.DoubleSide });
    const H = {
      ppe: hachures('#e4dcc4', '#9b8f6f', 26, 4),
      tole: plat(0x4e5862), alu: plat(0x8d98a3), joint: plat(0xcfc9b6), media: plat(0xd9cfa8), cadre: plat(0x3a4046)
    };
    const faces = {};
    ['z', 'x'].forEach(a => {
      const g = new T.Group(); g.visible = false;
      if (a === 'x') { g.rotation.y = Math.PI / 2; g.position.x = 0.5; } else g.position.z = 0.5;
      racine.add(g); faces[a] = g;
    });
    const rect = (u0, u1, y0, y1) => [[u0, y0], [u1, y0], [u1, y1], [u0, y1]];
    const faceDe = (polys, mat, groupe) => {
      if (!polys.length) return;
      const m = new T.Mesh(new T.ShapeGeometry(polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1]))))), mat);
      m.userData.sansOmbre = true; m.castShadow = false; groupe.add(m);
    };
    /* un segment [a, b] privé de trous [t0, t1] */
    const sans = (a, b, trous) => {
      const res = []; let p = a;
      trous.slice().sort((m, n) => m[0] - n[0]).forEach(([t0, t1]) => { if (t0 > p) res.push([p, t0]); p = Math.max(p, t1); });
      if (p < b) res.push([p, b]);
      return res;
    };
    const faceFiltre = (zig, du) => zig.map(p => [p[0] + du, p[1]]);
    const pavFaces = u0 => {                                  /* l'ouïe, coupée en son milieu : deux lèvres */
      const haut = PAV.map(([r, x]) => [u0 + x, 150 + r]).concat(PAV.slice().reverse().map(([r, x]) => [u0 + x, 150 + r - 2]));
      const bas = PAV.map(([r, x]) => [u0 + x, 150 - r]).concat(PAV.slice().reverse().map(([r, x]) => [u0 + x, 150 - r + 2]));
      return [haut, bas];
    };
    const sections = axe => {
      const g = faces[axe], z = axe === 'z';
      const E = z ? XO : ZO;                                            /* demi-longueur du plan de coupe */
      const cu = c => z ? c.x : -c.z;                                   /* position d'un piquage dans le plan */
      const traversant = Object.values(COL).filter(c => (z ? c.z === 0 : c.x === 0));
      const lidTrous = traversant.map(c => [cu(c) - 80.5, cu(c) + 80.5]);
      const floorTrous = z ? [[89.5, 110.5]] : [];
      const ppeR = [], toleR = [], aluR = [], jointR = [];
      sans(-E, E, floorTrous).forEach(([a, b]) => { ppeR.push(rect(a, b, 1.2, YF)); toleR.push(rect(a, b, 0, 1.2)); });
      sans(-E, E, lidTrous).forEach(([a, b]) => { ppeR.push(rect(a, b, YL, 298.8)); toleR.push(rect(a, b, 298.8, 300)); });
      [-1, 1].forEach(s => { ppeR.push(rect(s > 0 ? E - 20 : -E + 1.2, s > 0 ? E - 1.2 : -E + 20, YF, YL)); toleR.push(rect(s > 0 ? E - 1.2 : -E, s > 0 ? E : -E + 1.2, 1.2, 298.8)); });
      traversant.forEach(c => { const u = cu(c); toleR.push(rect(u - 80, u - 77.5, 262, 380), rect(u + 77.5, u + 80, 262, 380)); });
      const hl = z ? EX : EZ;
      for (let k = 0; k < NP; k++) aluR.push(rect(-hl, hl, yPlaque(k), yPlaque(k) + PE));
      for (let i = 0; i < NP - 1; i++) {
        if (z ? i % 2 : !(i % 2)) jointR.push(rect(-hl, -hl + 6, yVoie0(i), yVoie1(i)), rect(hl - 6, hl, yVoie0(i), yVoie1(i)));
      }
      sans(-148, 148, floorTrous.length ? [[89.5, 110.5]] : []).forEach(([a, b]) => toleR.push(rect(z ? a : -88, z ? b : 88, YF, 22)));
      if (z) toleR.push(rect(90, 92, -30, YF), rect(108, 110, -30, YF));
      else { ppeR.push(rect(-98, -90, YTOP, YL), rect(90, 98, YTOP, YL)); jointR.push(rect(-75, -65, 22, 24), rect(65, 75, 22, 24)); }
      /* le filtre de cette coupe, son cadre et le caisson de son ventilateur */
      const zig = z ? faceFiltre(filtreNeuf.userData.zigzag, -241) : faceFiltre(filtreExtrait.userData.zigzag, -109);
      const dx = z ? -254 : -122;
      const cadreR = [rect(dx, dx + 26, 22, 26), rect(dx, dx + 26, 274, 278)];
      const u0 = z ? 190 : 96;
      toleR.push(rect(u0 + 5, u0 + 9, YF, 80), rect(u0 + 5, u0 + 9, 220, YL), rect(u0 + 165, u0 + 169, YF, YL));
      faceDe(ppeR, H.ppe, g); faceDe(toleR, H.tole, g); faceDe(aluR, H.alu, g); faceDe(jointR, H.joint, g);
      faceDe([zig], H.media, g); faceDe(cadreR, H.cadre, g); faceDe(pavFaces(u0), H.tole, g);
    };
    sections('z'); sections('x');

    /* ================================================================ L'AIR QUI CIRCULE
       Des grains qui courent juste derrière le plan de coupe, dans les voies, les chambres et les
       piquages. Peu, gros, espacés. Ils sont coupés par le même plan que le reste. */
    const COL_NS = new T.Color(AIR.neuf).lerp(new T.Color(AIR.souffle), 0.5).getHex();
    const COL_ER = new T.Color(AIR.repris).lerp(new T.Color(AIR.rejete), 0.5).getHex();
    const courbe = pts => new T.CatmullRomCurve3(pts.map(p => V(p[0], p[1], p[2])), false, 'centripetal');
    const flot = (pts, couleur, o) => K.courant(courbe(pts), Object.assign({ pas: 34, rayon: 4, couleur, vitesse: 150 }, o || {}));
    const lignes = [];
    const ajouter = (ch, part, rang, f) => { racine.add(f.objet); lignes.push({ ch, part, rang, f }); return f; };
    const YA = [0, 2, 4, 6, 8].map(i => yVoieC(i)), YB = [1, 3, 5, 7, 9].map(i => yVoieC(i)), YP = [236, 250, 264];
    const mi = (y0, k) => 150 + (y0 - 150) * k;
    /* après l'échangeur : l'air converge vers l'ouïe, traverse la roue, sort par le haut vers le piquage */
    const apresX = (y0, off) => [[150, y0, G_ZIG], [172, mi(y0, 0.72), G_ZIG], [205, mi(y0, 0.42), G_ZIG], [252, mi(y0, 0.2), G_ZIG], [271, 152, G_ZIG], [275 + off * 0.5, 225, G_ZIG], [275 + off, 285, G_ZIG], [275 + off, 370, G_ZIG]];
    const apresZ = (y0, off) => [[X_ZIG, y0, -90], [X_ZIG, mi(y0, 0.72), -110], [X_ZIG, mi(y0, 0.42), -130], [X_ZIG, mi(y0, 0.2), -158], [X_ZIG, 152, -177], [X_ZIG, 225, -181 + off * 0.5], [X_ZIG, 285, -181 + off], [X_ZIG, 370, -181 + off]];
    YA.forEach((y, j) => {                                /* l'air neuf : une ligne par voie */
      const xs = -415 + 20 * j;
      ajouter('A', 'pre', 1, flot([[xs, 370, G_ZIG], [xs, y + 48, G_ZIG], [xs + 14, y + 12, G_ZIG], [-262, y, G_ZIG], [-150, y, G_ZIG]], AIR.neuf));
      ajouter('A', 'v1', 3, flot([[-150, y, G_ZIG], [-50, y, G_ZIG]], AIR.neuf));
      ajouter('A', 'v2', 3, flot([[-50, y, G_ZIG], [50, y, G_ZIG]], COL_NS));
      ajouter('A', 'v3', 3, flot([[50, y, G_ZIG], [150, y, G_ZIG]], AIR.souffle));
      ajouter('A', 'post', 5, flot(apresX(y, -48 + 24 * j), AIR.souffle));
    });
    YP.forEach((y, j) => {                                /* l'été : l'air neuf passe par le conduit du dessus */
      const xs = -315 + 15 * j;
      ajouter('P', 'pre', 1, flot([[xs, 370, G_ZIG], [xs, y + 34, G_ZIG], [xs + 10, y + 8, G_ZIG], [-262, y, G_ZIG], [-150, y, G_ZIG]], AIR.neuf));
      ajouter('P', 'duct', 3, flot([[-150, y, G_ZIG], [150, y, G_ZIG]], AIR.neuf, { pas: 40 }));
      ajouter('P', 'post', 5, flot(apresX(y, (j - 1) * 30), AIR.souffle));
    });
    YB.forEach((y, j) => {                                /* l'air extrait : une ligne par voie, d'avant en arrière */
      const zs = 250 - 20 * j;
      ajouter('B', 'pre', 2, flot([[X_ZIG, 370, zs], [X_ZIG, y + 48, zs], [X_ZIG, y + 12, zs - 14], [X_ZIG, y, 130], [X_ZIG, y, 92]], AIR.repris));
      ajouter('B', 'v1', 3, flot([[X_ZIG, y, 90], [X_ZIG, y, 30]], AIR.repris));
      ajouter('B', 'v2', 3, flot([[X_ZIG, y, 30], [X_ZIG, y, -30]], COL_ER));
      ajouter('B', 'v3', 3, flot([[X_ZIG, y, -30], [X_ZIG, y, -90]], AIR.rejete));
      ajouter('B', 'post', 5, flot(apresZ(y, -48 + 24 * j), AIR.rejete));
    });
    /* la chaleur : des grains orange qui traversent chaque plaque, de la voie chaude vers la voie froide */
    const XCH = [-90, -25, 75];
    for (let p = 1; p < NP - 1; p++) {
      const iB = (p - 1) % 2 ? p - 1 : p, iA = iB === p ? p - 1 : p;
      XCH.forEach(xh => ajouter('C', '', 4, K.courant(courbe([[xh, yVoieC(iB), -30], [xh, yVoieC(iA), -30]]), { nombre: 3, rayon: 3.6, couleur: 0xe8711a, vitesse: 18 })));
    }

    /* ================================================================ L'ÉTAT */
    const PHASES = ['neuf', 'extrait', 'echange', 'chaleur', 'sortie', 'marche'];
    const E = { marche: false, saison: 'hiver', out: DEPART.out, ext: DEPART.ext, sup: DEPART.sup, phase: 'marche', coupe: false, axe: 'z', demonte: false };
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
    const air = (cle, mot) => '<b class="air air-' + cle + '">' + mot + '</b>';
    const calc = () => {
      const by = E.saison === 'ete';
      const ts = by ? E.out : E.sup;                                    /* le by-pass : l'air neuf n'est pas réchauffé */
      const tr = by ? E.ext : E.ext + E.out - ts;                       /* mêmes débits : ce que l'air neuf gagne, l'air extrait le perd */
      const den = E.ext - E.out;
      const eta = den ? 100 * (ts - E.out) / den : 0;
      const impossible = !by && (eta > 100 || eta < 0);
      return { by, ts, tr, eta, impossible, cond: !by && tr < 12 };    /* condensation : sous le point de rosée d'un air de logement (~ 12 °C) */
    };
    const majMesures = () => {
      const c = calc();
      ctx.mesures([
        { libelle: 'Air neuf (extérieur)', valeur: nb(E.out, 0) + ' °C' },
        { libelle: 'Air soufflé', valeur: nb(c.ts, 0) + ' °C' },
        { libelle: 'Air extrait', valeur: nb(E.ext, 0) + ' °C' },
        { libelle: 'Air rejeté', valeur: nb(c.tr, 0) + ' °C' },
        { libelle: 'Efficacité', valeur: nb(c.eta, 0) + ' %' }
      ]);
    };
    const majTexte = () => {
      majMesures();
      if (!E.marche) { ctx.dire('<strong>À l’arrêt.</strong> Les deux ventilateurs ne tournent pas : aucun air ne circule dans le caisson.'); return; }
      const c = calc();
      if (c.by) {
        ctx.dire('<strong>Été, by-pass ouvert.</strong> ' + air('neuf', 'L’air neuf') + ', à ' + nb(E.out, 0) + ' °C, est plus frais que ' + air('repris', 'l’air extrait') + ' (' + nb(E.ext, 0) + ' °C). Un volet l’envoie au-dessus de l’échangeur : il n’est pas réchauffé. '
          + air('souffle', 'L’air soufflé') + ' sort à ' + nb(c.ts, 0) + ' °C, ' + air('rejete', 'l’air rejeté') + ' à ' + nb(c.tr, 0) + ' °C. Efficacité : 0 %. <em>À l’écran, l’air est très ralenti.</em>');
        return;
      }
      ctx.dire('<strong>Hiver.</strong> ' + air('neuf', 'L’air neuf') + ' entre à ' + nb(E.out, 0) + ' °C. ' + air('repris', 'L’air extrait') + ', à ' + nb(E.ext, 0) + ' °C, lui cède sa chaleur à travers les plaques. '
        + air('souffle', 'L’air soufflé') + ' sort à ' + nb(c.ts, 0) + ' °C, ' + air('rejete', 'l’air rejeté') + ' à ' + nb(c.tr, 0) + ' °C. Efficacité : ' + nb(c.eta, 0) + ' %. '
        + (c.impossible ? '<strong>Ce relevé est impossible :</strong> l’air soufflé ne peut pas être plus chaud que l’air extrait, ni plus froid que l’air neuf. ' : '')
        + (c.cond ? 'L’air rejeté est assez froid pour que l’eau de l’air extrait condense : elle coule dans le bac. ' : '')
        + '<em>À l’écran, l’air est très ralenti.</em>');
    };
    const rang = () => PHASES.indexOf(E.phase) + 1;
    const visibles = () => {
      const on = E.marche && !E.demonte && E.coupe, r = rang(), c = calc();
      lignes.forEach(L => {
        /* réglé AVANT la visibilité : le kit rallume les grains qu'il avait lui-même éteints */
        if (L.ch === 'C') L.f.regler({ debit: K.clamp(Math.abs(c.eta) / 100, 0.35, 1), sens: E.ext >= E.out ? 1 : -1 });
        if (L.ch === 'B' && L.part === 'v2') L.f.objet.material.color.setHex(c.by ? AIR.repris : COL_ER);
        if (L.ch === 'B' && L.part === 'v3') L.f.objet.material.color.setHex(c.by ? AIR.repris : AIR.rejete);
        let v = on && r >= L.rang;
        if (L.ch === 'A' || L.ch === 'C') v = v && !c.by;
        if (L.ch === 'P') v = v && c.by;
        L.f.objet.visible = v;
      });
      eauBac.visible = E.coupe && c.cond && E.marche;
    };
    /* le by-pass : les deux volets se croisent (0 = lame dans le sens de l'air = ouvert, 90° = fermé) */
    let aEch = 0, aBy = 90;
    const poserVolets = () => { lameEch.forEach(l => { l.rotation.z = aEch * D; }); lameBy.forEach(l => { l.rotation.z = aBy * D; }); };
    poserVolets();

    const voirFaces = () => { faces.z.visible = E.coupe && E.axe === 'z' && !E.demonte; faces.x.visible = E.coupe && E.axe === 'x' && !E.demonte; };
    /* en coupe X, le ventilateur de droite est retiré : son moteur (resté entier) ne doit pas flotter */
    const voirMoteurs = () => { ventNeuf.moteur.visible = !(E.coupe && E.axe === 'x'); };
    const plans = { z: new T.Plane(new T.Vector3(0, 0, -1), 0), x: new T.Plane(new T.Vector3(-1, 0, 0), 0) };
    const basculerCoupe = on => {
      E.coupe = on;
      const plan = on ? [plans[E.axe]] : null;
      const exclus = new Set();
      [faces.z, faces.x, ventNeuf.moteur, ventExtrait.moteur, ...lignes.map(l => l.f.objet)].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.needsUpdate = true; } });
      });
      lignes.forEach(l => { const m = l.f.objet.material; m.clippingPlanes = plan; m.needsUpdate = true; });
      voirMoteurs(); voirFaces(); visibles();
    };

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'boitier', nom: 'Le caisson', objets: [corps], desc: 'Un boîtier de tôle d’environ 1 000 × 600 × 300 mm, doublé de polypropylène expansé (PPE). Il isole, évite le bruit et tient chaque pièce en place. Les cloisons séparent les airs.' },
      { id: 'piquages', nom: 'Les quatre piquages Ø 160', objets: [piquages], desc: 'Quatre sorties rondes sur le dessus. L’air neuf et l’air rejeté vont vers le dehors ; l’air soufflé et l’air extrait vers le logement. Chaque bande de couleur nomme son air.' },
      { id: 'filtres', nom: 'Les deux filtres', objets: [filtreNeuf, filtreExtrait], desc: 'Un filtre sur l’air neuf : il retient poussières et pollens avant les pièces de vie. Un filtre sur l’air extrait : il protège l’échangeur. Un filtre encrassé freine l’air.' },
      { id: 'echangeur', nom: 'L’échangeur à plaques', objets: [echangeur], desc: 'Des plaques d’aluminium posées à plat. Entre deux plaques passe l’air neuf, entre les deux suivantes l’air extrait, à angle droit. La chaleur traverse la plaque ; l’air, non.' },
      { id: 'ventilateurs', nom: 'Les deux ventilateurs', objets: [ventNeuf.g, ventExtrait.g], desc: 'Un par flux. La roue aspire l’air au centre et le pousse par le bord vers le piquage. Le moteur est dans le moyeu. Le premier souffle l’air neuf, le second rejette l’air extrait.' },
      { id: 'volets', nom: 'Le by-pass d’été', objets: [volets], desc: 'Deux volets liés. L’hiver, l’air neuf passe dans l’échangeur. L’été, quand l’air du dehors est plus frais que celui du logement, il passe par le conduit du dessus : il n’est pas réchauffé.' },
      { id: 'bac', nom: 'Le bac à condensats', objets: [bac], desc: 'Quand l’air extrait se refroidit, l’eau qu’il contient condense sur les plaques. Elle tombe dans ce bac et part par un tube Ø 20 vers une évacuation.' }
    ];

    const commandes = [
      { id: 'marche', type: 'choix', options: [['arret', 'Arrêt'], ['marche', 'En marche']], valeur: 'arret' },
      { id: 'saison', type: 'choix', options: [['hiver', 'Hiver'], ['ete', 'Été (by-pass)']], valeur: 'hiver' },
      { id: 'outdoor', type: 'curseur', libelle: 'Air extérieur', min: -10, max: 20, pas: 1, unite: '°C', valeur: DEPART.out },
      { id: 'extract', type: 'curseur', libelle: 'Air extrait', min: 15, max: 30, pas: 1, unite: '°C', valeur: DEPART.ext },
      { id: 'supply', type: 'curseur', libelle: 'Air soufflé', min: 0, max: 28, pas: 1, unite: '°C', valeur: DEPART.sup }
    ];

    const etapes = [
      { titre: 'Le caisson, tel qu’on le pose', piece: null, voirDedans: false, eclate: false, actions: [['marche', 'arret'], ['saison', 'hiver'], ['phase', 'marche']],
        vue: { azimut: 22, elevation: 26, zoom: 1.0, cible: null },
        texte: 'Un boîtier plat, avec quatre piquages Ø 160 sur le dessus. Chaque bande de couleur nomme son air : ' + air('neuf', 'air neuf') + ', ' + air('souffle', 'air soufflé') + ', ' + air('repris', 'air extrait') + ', ' + air('rejete', 'air rejeté') + '.' },
      { titre: 'L’air neuf entre et traverse son filtre', piece: 'filtres', voirDedans: true, eclate: false, actions: [['coupe', 'z'], ['saison', 'hiver'], ['marche', 'marche'], ['phase', 'neuf']],
        vue: { azimut: 14, elevation: 20, zoom: 1.9, cible: [-300, 150, 0] },
        texte: 'Le ventilateur aspire ' + air('neuf', 'l’air du dehors') + ' par son piquage. Il traverse le filtre plissé : les poussières restent dedans.' },
      { titre: 'L’air extrait arrive par un autre piquage', piece: 'filtres', voirDedans: true, eclate: false, actions: [['coupe', 'x'], ['marche', 'marche'], ['phase', 'extrait']],
        vue: { azimut: 76, elevation: 20, zoom: 1.7, cible: [0, 150, 120] },
        texte: air('repris', 'L’air extrait') + ' des pièces de service entre par un autre piquage et traverse son propre filtre. Les deux airs ne se rencontrent pas : chacun a son trajet.' },
      { titre: 'Les deux airs se croisent sans se toucher', piece: 'echangeur', voirDedans: true, eclate: false, actions: [['coupe', 'z'], ['marche', 'marche'], ['phase', 'echange']],
        vue: { azimut: 42, elevation: 9, zoom: 2.3, cible: [0, 120, 0] },
        texte: 'Entre deux plaques, ' + air('neuf', 'l’air neuf') + ' va de gauche à droite. Entre les deux plaques voisines, ' + air('repris', 'l’air extrait') + ' va d’avant en arrière. Les plaques sont étanches : les airs se croisent sans se mélanger.' },
      { titre: 'La chaleur traverse la plaque', piece: null, voirDedans: true, eclate: false, ralenti: true, actions: [['coupe', 'z'], ['marche', 'marche'], ['phase', 'chaleur']],
        vue: { azimut: 34, elevation: 12, zoom: 2.6, cible: [0, 120, 0] },
        texte: 'L’air extrait est tiède, l’air neuf est froid : la chaleur passe de l’un à l’autre à travers la plaque (grains orange). L’air neuf se réchauffe, l’air extrait se refroidit.' },
      { titre: 'Les deux ventilateurs poussent les airs dehors et dedans', piece: 'ventilateurs', voirDedans: true, eclate: false, actions: [['coupe', 'z'], ['marche', 'marche'], ['phase', 'sortie']],
        vue: { azimut: 16, elevation: 22, zoom: 1.9, cible: [275, 150, 0] },
        texte: 'À la sortie de l’échangeur, chaque roue aspire son air en son centre et le pousse par le bord vers son piquage : ' + air('souffle', 'l’air soufflé') + ' vers les pièces de vie, ' + air('rejete', 'l’air rejeté') + ' vers le dehors.' },
      { titre: 'L’été, le by-pass évite l’échangeur', piece: 'volets', voirDedans: true, eclate: false, actions: [['coupe', 'z'], ['saison', 'ete'], ['marche', 'marche'], ['phase', 'marche']],
        vue: { azimut: 14, elevation: 20, zoom: 2.1, cible: [-60, 190, 0] },
        texte: 'Le volet de l’échangeur se ferme, celui du conduit s’ouvre : ' + air('neuf', 'l’air neuf') + ' passe au-dessus du bloc et n’est pas réchauffé. On ne veut pas chauffer un air déjà frais.' }
    ];

    /* l'éclaté, dans l'ordre réel du démontage : couvercle (avec ses piquages), filtres, volets, ventilateurs, échangeur */
    const eclate = [
      { objets: [couvercle], vers: [0, 360, 0], debut: 0, fin: 0.45 },
      { objets: [piquages], vers: [0, 560, 0], debut: 0, fin: 0.55 },
      { objets: [filtreNeuf, filtreExtrait], vers: [0, 260, 0], debut: 0.12, fin: 0.6 },
      { objets: [volets], vers: [0, 200, 0], debut: 0.22, fin: 0.7 },
      { objets: [ventNeuf.g], vers: [200, 140, 0], debut: 0.3, fin: 0.8 },
      { objets: [ventExtrait.g], vers: [0, 140, -200], debut: 0.3, fin: 0.8 },
      { objets: [echangeur], vers: [0, 130, 0], debut: 0.4, fin: 0.95 }
    ];
    /* la peau de tôle (1,2 mm) ne porte ni ne reçoit d'ombre : sinon elle moire sur ses arêtes */
    racine.traverse(o => { if (o.isMesh && o.material === tole) o.userData.sansOmbre = true; });

    let w = 0, angle = 0, rPrec = -1, coupeAvant = false;
    const WMAX = 2 * Math.PI * 0.6;

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 24, elevation: 20, zoom: 0.6, cible: [0, 300, 0] },
      vue: { azimut: 22, elevation: 26, zoom: 1.2, cadre: [corps, piquages], marge: 0.85 },
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'phase') E.phase = v;
        if (id === 'coupe') { E.axe = v; if (E.coupe) basculerCoupe(true); }
        if (id === 'marche') { E.marche = v === 'marche'; ctx.regler('marche', v); }
        if (id === 'saison') {
          E.saison = v; ctx.regler('saison', v);
          const ete = v === 'ete';
          /* l'été : une nuit à 18 °C dehors, 26 °C dedans ; l'hiver : les relevés de la station */
          E.out = ete ? 18 : DEPART.out; E.ext = ete ? 26 : DEPART.ext; E.sup = ete ? 18 : DEPART.sup;
          ctx.regler('outdoor', E.out); ctx.regler('extract', E.ext); ctx.regler('supply', E.sup, { desactive: ete });
        }
        if (id === 'outdoor') { E.out = +v; ctx.regler('outdoor', E.out); if (E.saison === 'ete') { E.sup = E.out; ctx.regler('supply', E.sup, { desactive: true }); } }
        if (id === 'extract') { E.ext = +v; ctx.regler('extract', E.ext); }
        if (id === 'supply' && E.saison !== 'ete') { E.sup = +v; ctx.regler('supply', E.sup); }
        visibles(); majTexte();
      },
      /* l'éclaté se regarde sur le caisson entier : on referme la coupe le temps de l'éclaté */
      surEclate(on) {
        E.demonte = on;
        if (on) { coupeAvant = E.coupe; if (E.coupe) basculerCoupe(false); } else if (coupeAvant) { coupeAvant = false; basculerCoupe(true); }
        voirFaces(); visibles();
      },
      animer(dt) {
        const ciblew = E.marche && !E.demonte ? WMAX : 0;
        w = K.vers(w, ciblew, 1.6, dt); angle += w * dt;
        ventNeuf.roue.rotation.x = -angle; ventExtrait.roue.rotation.x = -angle;
        const r = w / WMAX;
        if (Math.abs(r - rPrec) > 0.002) { lignes.forEach(L => L.f.regler({ vitesse: (L.ch === 'C' ? 18 : 150) * r })); rPrec = r; }
        if (r > 0.01) lignes.forEach(L => { if (L.f.objet.visible) L.f.animer(dt); });
        const by = E.saison === 'ete', tEch = by ? 90 : 0, tBy = by ? 0 : 90;
        const bouge = Math.abs(aEch - tEch) > 0.3 || Math.abs(aBy - tBy) > 0.3;
        if (bouge) { aEch = K.vers(aEch, tEch, 4, dt); aBy = K.vers(aBy, tBy, 4, dt); poserVolets(); }
        return w > 0.002 || ciblew > 0 || bouge;
      }
    };
  }, { famille: 'recuperation', titre: 'Le caisson de VMC double flux', stations: ['double-flux', 'recuperation'] });
})();
