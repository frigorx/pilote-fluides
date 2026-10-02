/* AéroRézo 3D — famille « vmc » : le logement équipé d'une VMC simple flux (modèle logementVMC).
   Unités : mm. Repère : X le long de la façade (de gauche à droite), Y vers le haut, Z vers l'avant
   (+Z = le côté qu'on regarde : le mur de face, retiré en coupe). Le sol fini est à Y = 10.

   LE LOGEMENT (plain-pied, ~ 9,6 m x 7,2 m) :
     rangée du fond (Z < 0)  : chambre 1 · séjour · chambre 2     = les pièces de VIE, entrées d'air
                               posées en haut de leurs fenêtres (mur du fond)
     au milieu               : le couloir, qui se prolonge dans l'entrée à droite
     rangée de devant (Z > 0): cuisine · salle d'eau · WC · entrée = les pièces de SERVICE, bouches au plafond
   Chaque pièce ouvre sur le couloir par une porte détalonnée (un jour sous la porte).
   Dans les combles, au-dessus de la salle d'eau : le caisson d'extraction, ses gaines et la sortie de toit.

   CE QUE L'ÉLÈVE DOIT VOIR, pas à pas, cause → effet : le ventilateur aspire → le logement passe en
   légère dépression → l'air neuf entre seul par les entrées d'air → il passe sous les portes → il est
   extrait dans les pièces de service → les débits des bouches s'additionnent dans les gaines jusqu'au
   caisson → rejet en toiture.

   COULEURS DE L'AIR (communes à AéroRézo, toujours doublées d'un mot) :
     air neuf vert 0x2f9e5a · air qui traverse : teinte intermédiaire · air extrait jaune 0xd9a21b ·
     air rejeté brun 0x8a5a3c.

   « Voir en coupe » : la façade de devant est retirée, les cloisons sont coupées à 0,80 m, les murs
   extérieurs juste au-dessus des fenêtres (leurs faces de coupe sont hachurées) ; le toit, le plafond,
   les gaines et le caisson deviennent transparents pour qu'on voie l'air DEDANS. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('logementVMC', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const D = Math.PI / 180;
    const AIR = { neuf: 0x2f9e5a, repris: 0xd9a21b, rejete: 0x8a5a3c };
    
    /* ---------------------------------------------------------------- matières
       Chaque matière qui se coupe ou se rend transparente a son étiquette : planCoupe (le plan qui
       la coupe) ou opaCoupe (l'opacité qu'elle prend en coupe). Une matière partagée entre une pièce
       qu'on coupe et une pièce qu'on garde les traiterait pareil : on leur donne leurs propres matières. */
    const C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; return c; };
    const plan = (m, cle) => { m.userData.planCoupe = cle; return m; };
    const voile = (m, opa) => { m.userData.opaCoupe = opa; return m; };

    const crepi = plan(C(K.plastique(0xb4ac9b, 0.92)), 'ext');
    const cloisonMat = plan(C(K.plastique(0xada594, 0.88)), 'cloison');
    const cadrePorte = plan(C(K.plastique(0x8c8574, 0.6)), 'cloison');
    const porteMat = plan(C(K.plastique(0xc99a62, 0.55)), 'cloison');
    const pvcFen = plan(C(K.plastique(0xf4f2ec, 0.5)), 'ext');
    const verre = plan(C(new T.MeshStandardMaterial({ color: 0xcfe6f2, roughness: 0.05, metalness: 0, transparent: true, opacity: 0.3, depthWrite: false })), 'ext');
    const dalle = C(K.plastique(0x8f8a80, 0.9));
    const solVie = C(K.plastique(0xebdcb6, 0.7));
    const solService = C(K.plastique(0xcbe2ee, 0.45));
    const solCirc = C(K.plastique(0xe4ded0, 0.6));
    const mobBois = C(K.plastique(0xa88a60, 0.7));
    const drap = C(K.plastique(0xe9edf0, 0.9));
    const tissu = C(K.plastique(0x6f8aa3, 0.9));
    const blancSan = C(M.ceramique);
    const plan_ = C(K.plastique(0xf3f1ec, 0.5));
    const noirPlaque = C(K.plastique(0x2b3036, 0.4));
    const bois = C(K.plastique(0xc9a574, 0.8));
    const boisFermette = C(K.plastique(0xc9a574, 0.8));
    const galva = C(M.zingue, 0xbfc5c9);
    const alu = C(M.aluminium, 0xc9ced3);
    const blancBouche = C(K.plastique(0xdedbd3, 0.5));
    const fente = C(K.plastique(0x3b4148, 0.6));
    const cordon = C(K.plastique(0xd9d3c4, 0.8));
    /* ce qui devient transparent en coupe */
    const texTuile = (() => {
      const c = document.createElement('canvas'); c.width = c.height = 128;
      const x = c.getContext('2d'); x.fillStyle = '#9c4a33'; x.fillRect(0, 0, 128, 128);
      x.fillStyle = '#6f3322'; for (let j = 0; j < 128; j += 16) x.fillRect(0, j, 128, 3);
      x.fillStyle = '#b36146'; for (let j = 0; j < 128; j += 16) for (let i = (j / 16 % 2) * 16; i < 128; i += 32) x.fillRect(i, j + 3, 2, 13);
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; return t;
    })();
    texTuile.repeat.set(34, 14);
    const tuile = C(new T.MeshStandardMaterial({ map: texTuile, roughness: 0.8, metalness: 0 }));
    const pignon = C(K.plastique(0xe8e1d3, 0.92));
    const plafondMat = C(K.plastique(0xf6f4ee, 0.9));
    const gaineRigide = voile(C(M.zingue, 0xbfc5c9), 0.45);
    const gaineSouple = voile(C(K.plastique(0xdfe3e6, 0.6)), 0.45);
    const caissonMat = voile(C(M.zingue, 0xdfe3e5), 0.3);
    /* le caisson reste lisible en transparence : sa roue, son moteur et ses raccords sont à eux */
    const roueMat = C(M.aluminium, 0xaab2ba);
    const moteurMat = C(M.fonte, 0x4f6a86);
    const moteurNoir = C(M.plastiqueNoir);
    const acier = C(M.acier);
    const aretesMat = new T.LineBasicMaterial({ color: 0x1b3a63, transparent: true, opacity: 0.55, depthWrite: false });

    /* ---------------------------------------------------------------- aides de construction */
    const maison = new T.Group(); racine.add(maison);
    const avant = new T.Group(); maison.add(avant);               /* le mur de face : retiré en coupe */
    const box = (x0, x1, y0, y1, z0, z1, mat, g) => {
      const m = K.mesh(new T.BoxGeometry(x1 - x0, y1 - y0, z1 - z0), mat, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
      (g || maison).add(m); return m;
    };
    const cyl = (axe, r, a0, a1, c1, c2, mat, seg) => {
      const g = new T.CylinderGeometry(r, r, a1 - a0, seg || 24);
      if (axe === 'x') g.rotateZ(Math.PI / 2); else if (axe === 'z') g.rotateX(Math.PI / 2);
      const m = new T.Mesh(g, mat), c = (a0 + a1) / 2;
      if (axe === 'x') m.position.set(c, c1, c2); else if (axe === 'y') m.position.set(c1, c, c2); else m.position.set(c1, c2, c);
      return m;
    };
    const aretes = [];
    const contourMat = new T.LineBasicMaterial({ color: 0x2a2f36 });
    const contour = m => { const l = new T.LineSegments(new T.EdgesGeometry(m.geometry, 25), contourMat); l.raycast = () => {}; m.add(l); return m; };
    const avecAretes = m => { const l = new T.LineSegments(new T.EdgesGeometry(m.geometry, 20), aretesMat); l.visible = false; l.raycast = () => {}; m.add(l); aretes.push(l); return m; };

    /* ================================================================ LES COTES */
    const H = 2500;                       /* sous plafond */
    const YC = 800, YE = 2350;           /* hauteur de coupe : cloisons, murs extérieurs */
    const XD = 9400;                      /* axe du mur de droite */
    const YF = 10;                        /* le sol fini */
    const YA = 2730;                      /* l'axe des gaines dans les combles */
    const Z0 = -3500, Z1 = 3500;          /* axes des murs du fond et de face */
    const ZP1 = -450, ZP2 = 650;          /* axes des deux cloisons de part et d'autre du couloir */
    const DOORS_VIE = [2100, 4700, 7300];  /* portes des pièces de vie : chambre 1, séjour, chambre 2 */
    const DOORS_SERV = [2800, 4100, 6000]; /* portes des pièces de service : cuisine, salle d'eau, WC */
    const B_CUI = [1750, 2000], B_SE = [4400, 2100], B_WC = [6000, 2100]; /* bouches (x, z) */
    const CX = 4400, CZ = 560;            /* axe de la roue du caisson */

    /* ================================================================ LES MURS, LES CLOISONS, LES COUPES */
    const caps = { ext: [], cloison: [], bois: [] };
    const mur = (axe, c, a0, a1, ep, ouv, mat, g, cle) => {
      const o = (ouv || []).slice().sort((p, q) => p.a - q.a), Y = cle === 'ext' ? YE : YC;
      const bx = (u0, u1, y0, y1) => {
        if (u1 - u0 < 0.5 || y1 - y0 < 0.5) return;
        if (axe === 'x') box(u0, u1, y0, y1, c - ep / 2, c + ep / 2, mat, g); else box(c - ep / 2, c + ep / 2, y0, y1, u0, u1, mat, g);
      };
      const rect = (u0, u1) => { if (u1 - u0 < 0.5) return; caps[cle].push(axe === 'x' ? [u0, u1, c - ep / 2, c + ep / 2] : [c - ep / 2, c + ep / 2, u0, u1]); };
      let cur = a0, capCur = a0;
      o.forEach(q => {
        bx(cur, q.a, 0, H); bx(q.a, q.b, 0, q.yb); bx(q.a, q.b, q.yt, H); cur = q.b;
        if (q.yb < Y && Y < q.yt) { rect(capCur, q.a); capCur = q.b; }
      });
      bx(cur, a1, 0, H); rect(capCur, a1);
    };

    /* une fenêtre : cadre PVC, vitrage, meneau si large. int = face intérieure du mur, sg = sens vers dehors */
    const fenetre = (axe, int, sg, a, b, yb, yt, g) => {
      const p0 = Math.min(int, int + sg * 70), p1 = Math.max(int, int + sg * 70), e = 60;
      const bx = (u0, u1, y0, y1) => { if (axe === 'x') box(u0, u1, y0, y1, p0, p1, pvcFen, g); else box(p0, p1, y0, y1, u0, u1, pvcFen, g); };
      bx(a, b, yb, yb + e); bx(a, b, yt - e, yt); bx(a, a + e, yb, yt); bx(b - e, b, yb, yt);
      if (b - a > 1500) bx((a + b) / 2 - 25, (a + b) / 2 + 25, yb, yt);
      const m = (p0 + p1) / 2;
      if (axe === 'x') box(a + e, b - e, yb + e, yt - e, m - 3, m + 3, verre, g); else box(m - 3, m + 3, yb + e, yt - e, a + e, b - e, verre, g);
    };

    /* ---- les murs extérieurs */
    mur('z', 0, -3600, 3600, 200, [{ a: 1550, b: 2550, yb: 1050, yt: 2150 }], crepi, maison, 'ext');                    /* à gauche : fenêtre de la cuisine, SANS entrée d'air */
    mur('z', XD, -3600, 3600, 200, [], crepi, maison, 'ext');                                                          /* à droite */
    const fenVie = [{ a: 400, b: 1600 }, { a: 3500, b: 5900 }, { a: 7350, b: 8550 }];
    mur('x', Z0, 100, 9300, 200, fenVie.map(f => ({ a: f.a, b: f.b, yb: 900, yt: 2150 })), crepi, maison, 'ext'); /* le fond : fenêtres du séjour et des chambres */
    mur('x', Z1, 100, 9300, 200, [{ a: 4100, b: 4700, yb: 1300, yt: 1900 }, { a: 7500, b: 8400, yb: 0, yt: 2150 }], crepi, avant, 'ext'); /* la face */
    fenetre('z', 100, -1, 1550, 2550, 1050, 2150, maison);
    fenVie.forEach(f => fenetre('x', Z0 + 100, -1, f.a, f.b, 900, 2150, maison));
    fenetre('x', Z1 - 100, 1, 4100, 4700, 1300, 1900, avant);
    box(7500, 8400, 0, 2150, Z1 - 100, Z1 - 55, bois, avant);                                                             /* la porte d'entrée */

    /* ---- les cloisons */
    const ouvPortes = (xs) => xs.map(x => ({ a: x - (x === 6000 ? 400 : 450), b: x + (x === 6000 ? 400 : 450), yb: 0, yt: 2100 }));
    mur('x', ZP1, 100, 9300, 100, ouvPortes(DOORS_VIE), cloisonMat, maison, 'cloison');
    mur('x', ZP2, 100, 6550, 100, ouvPortes(DOORS_SERV), cloisonMat, maison, 'cloison');
    mur('z', 2800, -3400, -500, 100, [], cloisonMat, maison, 'cloison');
    mur('z', 6600, -3400, -500, 100, [], cloisonMat, maison, 'cloison');
    mur('z', 3400, 700, 3400, 100, [], cloisonMat, maison, 'cloison');
    mur('z', 5400, 700, 3400, 100, [], cloisonMat, maison, 'cloison');
    mur('z', 6600, 600, 3400, 100, [], cloisonMat, maison, 'cloison');

    /* ---- les portes : un dormant, un vantail posé à 140 mm du sol fini (le détalonnage, exagéré) */
    const JOUR = 140;
    const portes = [];
    const porte = (c, xc, larg) => {
      const a = xc - larg / 2 - 35, b = xc + larg / 2 + 35;
      const g = new T.Group(); maison.add(g);
      box(a, a + 35, 0, 2100, c - 50, c + 50, cadrePorte, g); box(b - 35, b, 0, 2100, c - 50, c + 50, cadrePorte, g);
      box(a + 35, b - 35, 2040, 2100, c - 50, c + 50, cadrePorte, g);
      box(a, b, 0, YF, c - 50, c + 50, solCirc, g);                                  /* le seuil : le sol continue sous la porte */
      const leaf = new T.Mesh(new T.BoxGeometry(larg, 1, 40), porteMat);
      leaf.position.set(xc, 0, c); g.add(leaf);
      caps.cloison.push([a, a + 35, c - 50, c + 50], [b - 35, b, c - 50, c + 50]);
      caps.bois.push([xc - larg / 2, xc + larg / 2, c - 20, c + 20]);
      portes.push({ leaf, g });
      return g;
    };
    DOORS_VIE.forEach(x => porte(ZP1, x, 830));
    DOORS_SERV.forEach(x => porte(ZP2, x, x === 6000 ? 730 : 830));
    const poigneeMat = C(M.acier);
    portes.forEach(p => { const x = p.leaf.position.x, c = p.leaf.position.z; p.g.add(box(x + 330, x + 370, 1000, 1030, c - 40, c + 40, poigneeMat, p.g)); });

    /* ---- les sols, la dalle */
    const groupeSols = (liste, mat, g) => liste.forEach(([x0, x1, z0, z1]) => box(x0, x1, 0, YF, z0, z1, mat, g));
    const gSolVie = new T.Group(), gSolServ = new T.Group(), gSolCirc = new T.Group(); maison.add(gSolVie, gSolServ, gSolCirc);
    groupeSols([[100, 2800, -3400, ZP1], [2800, 6600, -3400, ZP1], [6600, 9300, -3400, ZP1]], solVie, gSolVie);
    groupeSols([[100, 3400, ZP2, 3400], [3400, 5400, ZP2, 3400], [5400, 6600, ZP2, 3400]], solService, gSolServ);
    groupeSols([[100, 9300, ZP1, ZP2], [6600, 9300, ZP2, 3400]], solCirc, gSolCirc);
    box(-300, XD + 300, -200, 0, -3700, 3700, dalle, maison);
    box(-1800, XD + 1800, -230, -200, -5300, 4800, C(K.plastique(0xa9bb8c, 0.95)), maison);   /* le terrain : on voit qu'on est dehors */

    /* ---- un mobilier très sommaire : on reconnaît la pièce, c'est tout */
    const mobVie = new T.Group(), mobServ = new T.Group(); maison.add(mobVie, mobServ);
    box(150, 1550, YF, YF + 280, -3350, -1350, mobBois, mobVie); box(150, 1550, YF + 280, YF + 420, -3350, -1450, drap, mobVie);     /* lit, chambre 1 */
    box(7900, 9250, YF, YF + 280, -3350, -1350, mobBois, mobVie); box(7900, 9250, YF + 280, YF + 420, -3350, -1450, drap, mobVie);    /* lit, chambre 2 */
    box(2950, 3750, YF, YF + 420, -2800, -1000, tissu, mobVie); box(2950, 3100, YF + 420, YF + 850, -2800, -1000, tissu, mobVie);       /* canapé, séjour */
    box(100, 700, YF, 900, 1000, 3300, plan_, mobServ); box(160, 700, 900, 912, 1250, 1850, noirPlaque, mobServ);                          /* plan de travail et plaque, cuisine */
    box(4600, 5330, YF, 560, 1500, 3300, blancSan, mobServ); box(3550, 4100, YF, 850, 2950, 3350, blancSan, mobServ);                     /* baignoire et vasque, salle d'eau */
    box(5800, 6200, YF, 780, 3200, 3400, blancSan, mobServ); box(5820, 6180, YF, 420, 2740, 3200, blancSan, mobServ);                     /* WC */

    /* ================================================================ LE PLAFOND, LES COMBLES, LE TOIT */
    const plafond = new T.Group(); racine.add(plafond);
    plafond.add(K.mesh(new T.BoxGeometry(9200, 13, 6800), plafondMat, 4700, H - 6.5, 0));
    const fermettes = new T.Group(); racine.add(fermettes);
    for (let k = 0; k < 11; k++) box(600 + 800 * k - 22, 600 + 800 * k + 22, H, H + 100, -3400, 3400, boisFermette, fermettes);

    const toit = new T.Group(); racine.add(toit);
    const TG = Math.tan(30 * D), LONG = 4000 / Math.cos(30 * D);
    const ZR = 545, ZY = H + (3600 - ZR) * TG;                                                             /* le pied de la sortie de toit */
    [1, -1].forEach(s => {
      const dalleToit = new T.Mesh(new T.BoxGeometry(10300, 50, LONG), tuile);
      dalleToit.position.set(4700, (2269 + H + 3600 * TG) / 2 + 21.65, s * 2012.5);
      dalleToit.rotation.x = s * 30 * D; toit.add(dalleToit);
    });
    toit.add(K.mesh(new T.BoxGeometry(10300, 110, 240), tuile, 4700, H + 3600 * TG + 55, 0));
    [-100, 9300].forEach(x => {
      const s = new T.Shape(); s.moveTo(-3600, H); s.lineTo(3600, H); s.lineTo(0, H + 3600 * TG); s.lineTo(-3600, H);
      const g = new T.ExtrudeGeometry(s, { depth: 200, bevelEnabled: false }); g.rotateY(Math.PI / 2);
      const m = new T.Mesh(g, pignon); m.position.x = x; toit.add(m);
    });
    /* la tuile à douille : une platine à plat sur la pente, un collet vertical */
    const douille = new T.Group(); douille.position.set(CX, ZY + 58 + 4, ZR); douille.rotation.x = 30 * D;
    douille.add(new T.Mesh(K.anneau(235, 98, 12, 40), alu));
    toit.add(douille);
    const colletMat = voile(C(M.aluminium, 0xc9ced3), 0.45);
    const collet = cyl('y', 100, ZY - 40, ZY + 330, CX, ZR, colletMat, 28); collet.userData.voile = true;
    toit.add(collet);

    /* ================================================================ LE CAISSON D'EXTRACTION
       Un boîtier de tôle (transparent en coupe), une roue à aubes tournant autour d'un axe horizontal,
       un moteur derrière. L'air arrive par le raccord de devant, au centre de la roue, et repart par
       le haut vers la sortie de toit. */
    const caisson = new T.Group(); racine.add(caisson);
    [430, 760].forEach(z => box(4080, 4720, H, H + 100, z - 25, z + 25, boisFermette, caisson));   /* les cales sous le caisson */
    const shell = K.mesh(new T.BoxGeometry(640, 260, 420), caissonMat, CX, 2730, 600);
    caisson.add(avecAretes(shell));
    const roue = new T.Group(); roue.position.set(CX, 2730, CZ);
    roue.add(cyl('z', 105, -48, -42, 0, 0, roueMat, 40));
    roue.add(cyl('z', 30, -48, 12, 0, 0, moteurNoir, 20));
    const flasqueAv = new T.Mesh(K.anneau(105, 62, 6, 40), roueMat); flasqueAv.rotation.x = Math.PI / 2; flasqueAv.position.z = 45; roue.add(flasqueAv);
    for (let i = 0; i < 20; i++) {
      const a = i / 20 * 2 * Math.PI;
      const aube = new T.Mesh(new T.BoxGeometry(3, 44, 90), roueMat);
      aube.position.set(Math.cos(a) * 82, Math.sin(a) * 82, 0); aube.rotation.z = a - Math.PI / 2 + 0.45; roue.add(aube);
    }
    caisson.add(roue);
    const moteur = new T.Group();
    moteur.add(cyl('z', 56, 418, 508, CX, 2730, moteurMat, 32));
    moteur.add(cyl('z', 8, 506, 520, CX, 2730, acier, 12));
    moteur.add(box(CX - 60, CX + 60, 2670, 2790, 390, 420, acier, moteur));
    caisson.add(moteur);
    const raccordEntree = cyl('z', 90, 806, 850, CX, 2730, gaineRigide, 28);
    caisson.add(raccordEntree);
    const raccordSortie = cyl('y', 90, 2858, 2920, CX, CZ, gaineRigide, 28);
    caisson.add(raccordSortie);

    /* ================================================================ LES GAINES
       Tracées avec des coins arrondis (la gaine souple ne fait pas d'angle vif). Le même tracé guide les grains. */
    const trace = (pts, r) => {
      const P = pts.map(p => V(p[0], p[1], p[2]));
      const path = new T.CurvePath(); let cur = P[0].clone();
      for (let i = 1; i < P.length - 1; i++) {
        const a = P[i - 1], b = P[i], c = P[i + 1];
        const d1 = b.clone().sub(a), d2 = c.clone().sub(b);
        const rr = Math.min(r, d1.length() / 2.01, d2.length() / 2.01);
        const p1 = b.clone().addScaledVector(d1.normalize(), -rr), p2 = b.clone().addScaledVector(d2.normalize(), rr);
        if (cur.distanceTo(p1) > 0.5) path.add(new T.LineCurve3(cur.clone(), p1));
        path.add(new T.QuadraticBezierCurve3(p1, b.clone(), p2)); cur = p2;
      }
      path.add(new T.LineCurve3(cur.clone(), P[P.length - 1].clone()));
      return path;
    };
    const gaines = new T.Group(); racine.add(gaines);
    const tuyau = (path, R, mat) => {
      const segs = Math.max(8, Math.round(path.getLength() / 45));
      const m = new T.Mesh(new T.TubeGeometry(path, segs, R, 20, false), mat);
      m.userData.voile = true; gaines.add(m); return m;
    };
    const collier = (x, y, z, axe, R) => { const c = cyl(axe, R + 7, -14, 14, 0, 0, alu, 24); c.position.set(x, y, z); c.userData.voile = true; gaines.add(c); };
    const TR = {
      cui: trace([[B_CUI[0], 2487, B_CUI[1]], [B_CUI[0], YA, B_CUI[1]], [B_CUI[0], YA, 1400], [CX, YA, 1400]], 150),
      se: trace([[B_SE[0], 2487, B_SE[1]], [B_SE[0], YA, B_SE[1]]], 100),
      wc: trace([[B_WC[0], 2487, B_WC[1]], [B_WC[0], YA, B_WC[1]], [CX, YA, B_WC[1]]], 150),
      br: trace([[CX, YA, 2100], [CX, YA, 1400]], 100),
      tr: trace([[CX, YA, 1400], [CX, YA, 806]], 100)
    };
    tuyau(TR.cui, 84, gaineSouple);      /* souple isolée Ø 125 */
    tuyau(TR.se, 62, gaineSouple);       /* souple isolée Ø 80 */
    tuyau(TR.wc, 62, gaineSouple);
    tuyau(TR.br, 72, gaineSouple);       /* souple isolée Ø 100 : la branche salle d'eau + WC */
    tuyau(TR.tr, 84, gaineRigide);       /* le tronc, rigide, Ø 160 */
    collier(CX, YA, 1400, 'z', 84); collier(CX, YA, 2100, 'z', 72); collier(CX, YA, 850, 'z', 84);
    collier(B_CUI[0], 2540, B_CUI[1], 'y', 84); collier(B_SE[0], 2530, B_SE[1], 'y', 62); collier(B_WC[0], 2530, B_WC[1], 'y', 62);

    /* ================================================================ LA SORTIE DE TOIT */
    const sortie = new T.Group(); racine.add(sortie);
    const hautTube = ZY + 58 + 380;
    const tubeSortie = new T.Mesh(new T.TubeGeometry(trace([[CX, 2858, CZ], [CX, hautTube, CZ]], 10), 60, 84, 20, false), gaineRigide);
    tubeSortie.userData.voile = true; sortie.add(tubeSortie);
    [0, 120, 240].forEach(a => { const x = Math.cos(a * D) * 70, z = Math.sin(a * D) * 70; sortie.add(cyl('y', 5, hautTube - 5, hautTube + 130, CX + x, CZ + z, alu, 8)); });
    const chapeau = new T.Mesh(new T.ConeGeometry(190, 80, 36), alu); chapeau.position.set(CX, hautTube + 130 + 40, CZ); sortie.add(chapeau);

    /* ================================================================ LES BOUCHES D'EXTRACTION
       Une bague, un champignon tenu par trois branches : l'air passe dans l'espace entre les deux. */
    const bouches = new T.Group(); maison.add(bouches);
    /* un voile orange autour des entrées d'air et des bouches, allumé à l'étape qui en parle (le blanc ne s'allume pas bien) */
    const repMat = new T.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0.42, depthWrite: false, toneMapped: false });
    const repEntrees = [], repBouches = [];
    const voileRep = (geo, x, y, z, liste, g) => { const m = new T.Mesh(geo, repMat); m.position.set(x, y, z); m.visible = false; m.userData.sansOmbre = true; g.add(m); liste.push(m); };
    const bouche = (x, z, avecCordon) => {
      const g = new T.Group(); g.position.set(x, 0, z);
      const bague = contour(new T.Mesh(K.anneau(112, 80, 16, 40), blancBouche)); bague.position.y = H - 7 - 14; g.add(bague);
      const champignon = new T.Group(); g.add(champignon);
      const disque = contour(cyl('y', 90, -5, 5, 0, 0, blancBouche, 40)); disque.position.y = 2450; champignon.add(disque);
      for (let i = 0; i < 3; i++) { const a = i * 120 * D; champignon.add(cyl('y', 6, 2450, H - 14, Math.cos(a) * 64, Math.sin(a) * 64, blancBouche, 8)); }
      let cord = null;
      if (avecCordon) {
        cord = new T.Mesh(new T.CylinderGeometry(3, 3, 1, 8), cordon); cord.position.set(100, 0, 0); g.add(cord);
        const bille = new T.Mesh(new T.SphereGeometry(10, 12, 8), cordon); g.add(bille); cord.userData.bille = bille;
      }
      voileRep(new T.CylinderGeometry(140, 140, 110, 32), 0, 2440, 0, repBouches, g);
      bouches.add(g);
      return { g, champignon, cord };
    };
    const bCui = bouche(B_CUI[0], B_CUI[1], true), bSe = bouche(B_SE[0], B_SE[1]), bWc = bouche(B_WC[0], B_WC[1]);

    /* ================================================================ LES ENTRÉES D'AIR
       Posées en haut des fenêtres du séjour et des chambres : un capot dehors, une grille dedans. */
    const entrees = new T.Group(); maison.add(entrees);
    const texGrille = (() => {
      const c = document.createElement('canvas'); c.width = 256; c.height = 32;
      const x = c.getContext('2d'); x.fillStyle = '#f2efe8'; x.fillRect(0, 0, 256, 32);
      x.fillStyle = '#3b4148'; for (let i = 0; i < 14; i++) x.fillRect(10 + i * 17, 9, 11, 14);
      const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t;
    })();
    const matGrille = new T.MeshStandardMaterial({ map: texGrille, roughness: 0.5 });
    const entree = x => {
      const g = new T.Group();
      contour(box(x - 400, x + 400, 2080, 2150, Z0 - 100, Z0 + 100, blancBouche, g));
      contour(box(x - 440, x + 440, 2055, 2172, Z0 - 130, Z0 - 90, blancBouche, g));                         /* le capot, dehors */
      box(x - 380, x + 380, 2070, 2140, Z0 - 90, Z0 - 60, fente, g);                                /* sa bouche, sous le capot */
      contour(box(x - 420, x + 420, 2050, 2160, Z0 + 100, Z0 + 118, blancBouche, g));                       /* la platine, dedans */
      const grille = new T.Mesh(new T.PlaneGeometry(800, 90), matGrille); grille.position.set(x, 2105, Z0 + 118.6); g.add(grille);
      voileRep(new T.BoxGeometry(900, 150, 50), x, 2105, Z0 + 140, repEntrees, g);
      entrees.add(g); return g;
    };
    const entreesVie = [1000, 4100, 5300, 7950].map(entree);

    /* ================================================================ LE MANOMÈTRE
       Un cadran de ±50 Pa posé dans le couloir : l'aiguille passe côté négatif quand le logement est en dépression. */
    const manometre = new T.Group(); maison.add(manometre);
    const cad = document.createElement('canvas'); cad.width = cad.height = 256;
    {
      const x = cad.getContext('2d');
      x.fillStyle = '#fbfaf6'; x.beginPath(); x.arc(128, 128, 126, 0, 2 * Math.PI); x.fill();
      x.strokeStyle = '#1b3a63'; x.lineWidth = 4; x.stroke();
      x.fillStyle = '#1b3a63'; x.textAlign = 'center'; x.textBaseline = 'middle';
      for (let v = -50; v <= 50; v += 10) {
        const a = (-90 + v / 50 * 135) * D, l = v % 25 ? 12 : 22;
        x.lineWidth = v % 25 ? 2 : 4; x.beginPath();
        x.moveTo(128 + Math.cos(a) * 112, 128 + Math.sin(a) * 112); x.lineTo(128 + Math.cos(a) * (112 - l), 128 + Math.sin(a) * (112 - l)); x.stroke();
      }
      x.font = '700 26px Calibri, Arial, sans-serif';
      [[-50, '−50'], [0, '0'], [50, '+50']].forEach(([v, t]) => { const a = (-90 + v / 50 * 135) * D; x.fillText(t, 128 + Math.cos(a) * 74, 128 + Math.sin(a) * 74); });
      x.font = '700 24px Calibri, Arial, sans-serif'; x.fillText('Pa', 128, 190);
    }
    const texCad = new T.CanvasTexture(cad); texCad.colorSpace = T.SRGBColorSpace; texCad.anisotropy = 4;
    const GX = 3500, GY = 640, GZ = ZP1 + 50;
    manometre.add(cyl('z', 110, GZ, GZ + 40, GX, GY, C(K.plastique(0x2a2d31, 0.5)), 40));
    manometre.add(K.mesh(new T.CircleGeometry(100, 40), new T.MeshBasicMaterial({ map: texCad, toneMapped: false }), GX, GY, GZ + 40.5));
    const aiguille = new T.Group(); aiguille.position.set(GX, GY, GZ + 42);
    aiguille.add(K.mesh(new T.BoxGeometry(6, 88, 2), C(K.plastique(0xc9451a, 0.4)), 0, 38, 0));
    aiguille.add(cyl('z', 8, -1, 2, 0, 0, moteurNoir, 12));
    manometre.add(aiguille);

    /* ================================================================ LES FACES DE COUPE (plans y = 800 et 2 350)
       Les cloisons en plâtre hachuré, les murs extérieurs en béton hachuré, le bois des portes uni. */
    const hachures = (fond, trait, pas, ep) => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = fond; x.fillRect(0, 0, 64, 64);
      x.strokeStyle = trait; x.lineWidth = ep || 5;
      for (let i = -64; i <= 64; i += 32) { x.beginPath(); x.moveTo(i, 64); x.lineTo(i + 64, 0); x.stroke(); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / pas, 1 / pas);
      return new T.MeshStandardMaterial({ map: t, roughness: 0.8, side: T.DoubleSide });
    };
    const HM = {
      cloison: hachures('#ece4cf', '#2f2a20', 40, 7),
      ext: hachures('#d9d2c2', '#2f2a20', 50, 7),
      bois: new T.MeshStandardMaterial({ color: 0xb98a55, roughness: 0.6, side: T.DoubleSide })
    };
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const faceH = (rects, mat, y) => {
      if (!rects.length) return;
      const shapes = rects.map(([x0, x1, z0, z1]) => new T.Shape([new T.Vector2(x0, -z0), new T.Vector2(x1, -z0), new T.Vector2(x1, -z1), new T.Vector2(x0, -z1)]));
      const g = new T.ShapeGeometry(shapes); g.rotateX(-Math.PI / 2);
      const m = new T.Mesh(g, mat); m.position.y = y; m.userData.sansOmbre = true; m.castShadow = false; faces.add(m);
      const l = new T.LineSegments(new T.EdgesGeometry(g, 1), new T.LineBasicMaterial({ color: 0x4a4438 })); l.raycast = () => {}; m.add(l);
    };
    faceH(caps.ext, HM.ext, YE + 0.5);
    faceH(caps.cloison, HM.cloison, YC + 0.5);
    faceH(caps.bois, HM.bois, YC + 0.5);

    /* ================================================================ L'AIR QUI CIRCULE
       Un « ruisseau » de grains : comme K.courant, mais le débit est réparti régulièrement
       (un grain sur deux, sur trois…) au lieu d'un paquet, et seuls les grains vus sont dessinés. */
    const ruisseau = (courbe, o) => {
      const L = courbe.getLength(), N = Math.max(3, Math.round(L / o.pas));
      const im = new T.InstancedMesh(new T.SphereGeometry(o.rayon, 8, 6), K.lumineux(o.couleur), N);
      im.userData.sansOmbre = true; im.castShadow = false; im.frustumCulled = false;
      const etat = { d: 1, v: o.vitesse, s: 0 };
      const m4 = new T.Matrix4(), p = new T.Vector3(), q = new T.Quaternion(), un = new T.Vector3(1, 1, 1);
      const poser = () => {
        let n = 0;
        for (let i = 0; i < N; i++) {
          if (Math.floor((i + 1) * etat.d + 1e-9) > Math.floor(i * etat.d + 1e-9)) {
            let u = (i / N + etat.s / L) % 1; if (u < 0) u += 1;
            courbe.getPointAt(u, p); m4.compose(p, q, un); im.setMatrixAt(n++, m4);
          }
        }
        if (n === 0 && etat.d > 0.001) { courbe.getPointAt((etat.s / L % 1 + 1) % 1, p); m4.compose(p, q, un); im.setMatrixAt(n++, m4); }   /* un tout petit débit reste visible */
        im.count = n; im.instanceMatrix.needsUpdate = true;
      };
      poser();
      return { objet: im, etat, regler(x) { Object.assign(etat, x); poser(); }, animer(dt) { etat.s += dt * etat.v; poser(); } };
    };
    const courbe = pts => new T.CatmullRomCurve3(pts.map(p => V(p[0], p[1], p[2])), false, 'centripetal');
    const flots = [];
    const flot = (trajet, couleur, o, min, debit) => {
      const f = ruisseau(trajet.getPointAt ? trajet : courbe(trajet), Object.assign({ couleur }, o));
      f.min = min; f.debit = debit; f.base = o.vitesse; flots.push(f); racine.add(f.objet); return f;
    };

    /* Trajet lisible : entrée d'air (haut de fenêtre) → courte descente → traversée de la pièce à ~1,2 m
       → descente au ras du sol devant la porte → sous la porte → couloir → sous la porte de la pièce de
       service → montée à la bouche du plafond. Vert (air neuf) jusqu'à la bouche, jaune après (gaines). */
    const neuf = (xe, xd) => [[xe, 2122, -4300], [xe, 2122, -3640], [xe, 2122, -3420], [xe, 1700, -3260], [xe, 1250, -3080], [xe + (xd - xe) * 0.5, 1250, -2300], [xd, 1250, -1500], [xd, 850, -1050], [xd, 300, -820]];
    const parNeuf = { rayon: 100, pas: 150, vitesse: 380 };
    flot(neuf(1000, DOORS_VIE[0]), AIR.neuf, parNeuf, 3, (c) => c.Q / 4);
    flot(neuf(4100, DOORS_VIE[1]), AIR.neuf, parNeuf, 3, (c) => c.Q / 4);
    flot(neuf(5300, DOORS_VIE[1]), AIR.neuf, parNeuf, 3, (c) => c.Q / 4);
    flot(neuf(7950, DOORS_VIE[2]), AIR.neuf, parNeuf, 3, (c) => c.Q / 4);
    const trav = (xd, xs) => [[xd, 80, -700], [xd, 80, -560], [xd, 80, -470], [xd, 80, -340], [xd + (xs - xd) * 0.3, 100, -100], [xd + (xs - xd) * 0.7, 100, 350], [xs, 80, 540], [xs, 80, 640], [xs, 80, 760]];
    const parTrav = { rayon: 60, pas: 100, vitesse: 320 };
    [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2]].forEach(([i, j]) => flot(trav(DOORS_VIE[i], DOORS_SERV[j]), AIR.neuf, parTrav, 4, (c, A) => A[i][j]));
    const parExt = { rayon: 80, pas: 120, vitesse: 330 };
    flot([[2800, 95, 800], [2800, 100, 900], [2650, 700, 1100], [2400, 1200, 1400], [1950, 1250, 1800], [1750, 1800, 1990], [B_CUI[0], 2390, B_CUI[1]]], AIR.neuf, parExt, 5, c => c.qc);
    flot([[4100, 95, 800], [4100, 100, 900], [4150, 700, 1100], [4250, 1200, 1500], [4380, 1300, 1900], [4400, 1850, 2090], [B_SE[0], 2390, B_SE[1]]], AIR.neuf, parExt, 5, c => c.qs);
    flot([[6000, 95, 800], [6000, 100, 900], [6000, 800, 1200], [6000, 1250, 1600], [6000, 1500, 1900], [6000, 2000, 2090], [B_WC[0], 2390, B_WC[1]]], AIR.neuf, parExt, 5, c => c.qw);
    /* dans les gaines : l'air est extrait (jaune) ; les débits s'additionnent aux jonctions */
    const parG = r => ({ rayon: r, pas: Math.round(r * 2.3), vitesse: 650 });
    flot(TR.cui, AIR.repris, parG(52), 6, c => c.qc);
    flot(TR.se, AIR.repris, parG(38), 6, c => c.qs);
    flot(TR.wc, AIR.repris, parG(38), 6, c => c.qw);
    flot(TR.br, AIR.repris, parG(44), 6, c => c.qb);
    flot(TR.tr, AIR.repris, parG(56), 6, c => c.Q);
    /* dans le caisson : l'air entre au centre de la roue et sort par le haut */
    flot([[CX, YA, 1000], [CX, YA, 830], [CX, YA, 640], [CX, YA, 575], [CX + 65, YA + 15, 550], [CX + 100, YA + 70, 545], [CX + 55, YA + 118, 545], [CX, YA + 140, 545], [CX, 2960, 545]], AIR.repris, { rayon: 46, pas: 110, vitesse: 700 }, 1, c => c.Q);
    /* le rejet : en haut du tube, sous le chapeau, puis dehors */
    const parRej = { rayon: 60, pas: 130, vitesse: 700 };
    flot([[CX, 2960, CZ], [CX, 3500, CZ], [CX, 4200, CZ], [CX, hautTube + 10, CZ]], AIR.rejete, parRej, 7, c => c.Q);
    flot([[CX, hautTube + 10, CZ], [CX + 60, hautTube + 70, CZ], [CX + 260, hautTube + 90, CZ], [CX + 700, hautTube + 20, CZ], [CX + 1100, hautTube - 120, CZ]], AIR.rejete, parRej, 7, c => c.Q / 2);
    flot([[CX, hautTube + 10, CZ], [CX - 60, hautTube + 70, CZ], [CX - 260, hautTube + 90, CZ], [CX - 700, hautTube + 20, CZ], [CX - 1100, hautTube - 120, CZ]], AIR.rejete, parRej, 7, c => c.Q / 2);

    /* ================================================================ L'ÉTAT */
    const PHASES = ['ventil', 'depression', 'entree', 'portes', 'bouches', 'gaines', 'rejet', 'marche'];
    const E = { marche: false, cuisine: 'base', portes: 'detalonnees', phase: 'marche', coupe: false, demonte: false };
    const QMAX = 180;                    /* le tronc à la pointe : la densité de grains de référence */
    const nb = v => Math.round(v).toLocaleString('fr-FR', { maximumFractionDigits: 0 });
    /* Valeurs d'ILLUSTRATION (aucun débit réglementaire n'est figé par les stations) */
    const calc = () => {
      const k = E.portes === 'bloquees' ? 0.1 : 1;
      const qc = E.marche ? Math.round((E.cuisine === 'pointe' ? 135 : 90) * k) : 0;
      const qs = E.marche ? Math.round(30 * k) : 0, qw = E.marche ? Math.round(15 * k) : 0;
      return { qc, qs, qw, qb: qs + qw, Q: qc + qs + qw, k };
    };
    /* qui alimente qui : on remplit la cuisine d'abord, puis la salle d'eau, puis les WC */
    const repartir = c => {
      const S = [c.Q / 4, c.Q / 2, c.Q / 4], Dm = [c.qc, c.qs, c.qw], A = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      let i = 0, j = 0;
      while (i < 3 && j < 3) { const x = Math.min(S[i], Dm[j]); A[i][j] = x; S[i] -= x; Dm[j] -= x; if (S[i] < 1e-9) i++; else j++; }
      return A;
    };
    const air = (cle, mot) => '<b class="air air-' + cle + '">' + mot + '</b>';
    const majMesures = () => {
      const c = calc(), u = ' m³/h', v = c.Q / 3600 / (Math.PI * 0.08 * 0.08);
      ctx.mesures([
        { libelle: 'Bouche de la cuisine', valeur: nb(c.qc) + u },
        { libelle: 'Bouche de la salle d’eau', valeur: nb(c.qs) + u },
        { libelle: 'Bouche des WC', valeur: nb(c.qw) + u },
        { libelle: 'Salle d’eau + WC (une branche)', valeur: nb(c.qb) + u },
        { libelle: 'Total au caisson', valeur: nb(c.Q) + u + ' · tronc Ø 160 mm · ' + v.toFixed(1).replace('.', ',') + ' m/s' }
      ]);
    };
    const majTexte = () => {
      majMesures();
      if (!E.marche) { ctx.dire('<strong>À l’arrêt.</strong> Le ventilateur ne tourne pas : aucun air ne circule, ni dans le logement ni dans les gaines.'); return; }
      const c = calc();
      if (E.portes === 'bloquees') {
        ctx.dire('<strong>Sans passage sous les portes.</strong> ' + air('neuf', 'L’air neuf') + ' ne peut plus traverser le logement : les bouches aspirent dans le vide, l’air ne balaie plus les pièces. Il ne reste que ' + nb(c.Q) + ' m³/h au caisson.');
        return;
      }
      ctx.dire('<strong>' + (E.cuisine === 'pointe' ? 'Pointe en cuisine.' : 'Débit de base.') + '</strong> ' + air('neuf', 'L’air neuf') + ' entre par les pièces de vie, passe sous les portes et rejoint les bouches ; dans les gaines, c’est ' + air('repris', 'l’air extrait') + ' : '
        + nb(c.qc) + ' + ' + nb(c.qs) + ' + ' + nb(c.qw) + ' = ' + nb(c.Q) + ' m³/h au caisson, puis ' + air('rejete', 'rejeté') + ' en toiture. <em>À l’écran, l’air est très ralenti.</em>');
    };
    const rang = () => PHASES.indexOf(E.phase) + 1;
    const visibles = () => {
      const c = calc(), on = E.marche && !E.demonte, r = rang(), A = repartir(c);
      /* débit réglé AVANT la visibilité */
      gaines.visible = !(r >= 2 && r <= 4);   /* pour voir le sol et les portes sans le voile des gaines au-dessus */
      flots.forEach(f => { const q = f.debit(c, A); f.regler({ d: Math.min(1, q / QMAX) }); f.objet.visible = on && r >= f.min && q > 0.05; });
    };
    /* le jour sous les portes : 140 mm (exagéré ; en vrai 10 à 20 mm). Sans passage, le vantail touche le sol. */
    const hautPorte = j => 2040 - (YF + j);
    let jour = JOUR, cordon_ = 0, cordonCible = 0;
    const poserPortes = () => portes.forEach(p => { const h = hautPorte(jour); p.leaf.scale.y = h; p.leaf.position.y = 2040 - h / 2; });
    const poserBoucheCuisine = () => {
      bCui.champignon.position.y = -22 * cordon_;
      const L = 200 + 90 * cordon_, y1 = H - 20;
      bCui.cord.scale.y = L; bCui.cord.position.y = y1 - L / 2; bCui.cord.userData.bille.position.set(100, y1 - L - 8, 0);
    };
    let w = 0, angle = 0, dep = 0;
    const cibleDep = () => !E.marche || rang() < 2 ? 0 : (E.portes === 'bloquees' ? -30 : -10);

    /* ---------------------------------------------------------------- la coupe */
    const majRep = () => { repEntrees.forEach(m => { m.visible = E.phase === 'entree'; }); repBouches.forEach(m => { m.visible = E.phase === 'bouches'; }); };
    const majEnveloppe = () => { const cache = E.coupe && !E.demonte; toit.visible = plafond.visible = fermettes.visible = !cache; };
    const basculerCoupe = on => {
      E.coupe = on;
      const plans = { cloison: on ? [new T.Plane(new T.Vector3(0, -1, 0), YC)] : null, ext: on ? [new T.Plane(new T.Vector3(0, -1, 0), YE)] : null };
      racine.traverse(o => {
        if (!o.isMesh) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => {
          if (!m) return;
          if (m.userData.planCoupe) { m.clippingPlanes = plans[m.userData.planCoupe]; m.clipShadows = true; m.needsUpdate = true; }
          if (m.userData.opaCoupe !== undefined) { m.transparent = on; m.opacity = on ? m.userData.opaCoupe : 1; m.depthWrite = !on; m.needsUpdate = true; }
        });
        if (o.material && o.material.userData && o.material.userData.opaCoupe !== undefined) o.castShadow = !on;
      });
      avant.visible = !on; faces.visible = on; majEnveloppe();
      aretes.forEach(a => { a.visible = on; });
      visibles();
    };

    majTexte(); visibles(); poserPortes(); poserBoucheCuisine();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'caisson', nom: 'Le caisson d’extraction', objets: [roue, moteur, raccordEntree, raccordSortie], desc: 'Posé dans les combles. Un seul ventilateur : une roue à aubes entraînée par un moteur. Il aspire l’air des gaines et le pousse vers le toit. C’est lui qui fait tout marcher.' },
      { id: 'sortie', nom: 'La sortie de toit', objets: [sortie, douille], desc: 'Le tuyau qui traverse la toiture, avec un chapeau contre la pluie. L’air extrait sort ici, loin des entrées d’air.' },
      { id: 'gaines', nom: 'Les gaines', objets: [gaines], desc: 'Des gaines souples isolées et un tronc rigide en tôle. Elles ramènent l’air extrait vers le caisson. À chaque jonction, les débits s’ajoutent.' },
      { id: 'bouches', nom: 'Les bouches d’extraction', objets: [bouches], desc: 'Une par pièce de service : cuisine, salle d’eau, WC. Chacune aspire le débit prévu pour sa pièce. Celle de la cuisine a un cordon pour la pointe.' },
      { id: 'entrees', nom: 'Les entrées d’air', objets: [entrees], desc: 'Posées en haut des fenêtres du séjour et des chambres. L’air neuf y entre tout seul. On n’en met jamais dans une pièce de service.' },
      { id: 'portes', nom: 'Les portes détalonnées', objets: portes.map(p => p.leaf), desc: 'Un espace est laissé sous chaque porte (un à deux centimètres). C’est par là que l’air passe d’une pièce à l’autre. Ici le jour est agrandi pour qu’on le voie.' },
      { id: 'vie', nom: 'Les pièces de vie', objets: [gSolVie, mobVie], desc: 'Séjour et chambres. L’air neuf y arrive en premier : c’est là qu’on vit, l’air doit y être propre.' },
      { id: 'service', nom: 'Les pièces de service', objets: [gSolServ, mobServ], desc: 'Cuisine, salle d’eau, WC. L’air s’y charge d’humidité et d’odeurs : c’est là qu’on l’extrait.' },
      { id: 'manometre', nom: 'Le manomètre', objets: [manometre], desc: 'Il mesure la pression du logement par rapport au dehors, en pascals (Pa). Quand le ventilateur tourne, l’aiguille passe du côté négatif : c’est la dépression.' }
    ];

    const commandes = [
      { id: 'marche', type: 'choix', options: [['arret', 'Arrêt'], ['marche', 'En marche']], valeur: 'arret' },
      { id: 'cuisine', type: 'choix', options: [['base', 'Cuisine : débit de base'], ['pointe', 'Cuisine : débit de pointe']], valeur: 'base' },
      { id: 'portes', type: 'choix', options: [['detalonnees', 'Portes détalonnées'], ['bloquees', 'Portes sans passage d’air']], valeur: 'detalonnees' }
    ];

    const base = [['marche', 'marche'], ['cuisine', 'base'], ['portes', 'detalonnees']];
    const etapes = [
      { titre: 'Le ventilateur du caisson aspire', piece: 'caisson', voirDedans: true, eclate: false, actions: [...base, ['phase', 'ventil']],
        vue: { azimut: 22, elevation: 28, zoom: 6.5, cible: [4400, 2780, 640] },
        texte: 'Dans les combles, le caisson fait tourner son ventilateur. Il aspire ' + air('repris', 'l’air extrait') + ' de la gaine : c’est lui qui commande tout le reste.' },
      { titre: 'Le logement passe en légère dépression', piece: 'manometre', voirDedans: true, eclate: false, actions: [...base, ['phase', 'depression']],
        vue: { azimut: 8, elevation: 30, zoom: 4.6, cible: [3500, 700, -380] },
        texte: 'Le ventilateur retire de l’air sans en remettre : la pression baisse un peu dans le logement. Le manomètre le montre, l’aiguille passe du côté négatif.' },
      { titre: 'L’air neuf entre par les entrées d’air', piece: 'entrees', voirDedans: true, eclate: false, actions: [...base, ['phase', 'entree']],
        vue: { azimut: 16, elevation: 50, zoom: 3.2, cible: [1100, 1500, -3000] },
        texte: air('neuf', 'L’air du dehors') + ' est resté à la pression normale : il pousse et entre tout seul par les entrées d’air, en haut des fenêtres du séjour et des chambres.' },
      { titre: 'L’air passe sous les portes', piece: 'portes', voirDedans: true, eclate: false, actions: [...base, ['phase', 'portes']],
        vue: { azimut: 18, elevation: 30, zoom: 2.6, cible: [4100, 400, 700] },
        texte: 'Un espace est laissé sous chaque porte. ' + air('neuf', 'L’air') + ' traverse le logement par là, des pièces de vie vers le couloir, puis vers les pièces de service.' },
      { titre: 'L’air est extrait dans les pièces de service', piece: 'bouches', voirDedans: true, eclate: false, actions: [...base, ['phase', 'bouches']],
        vue: { azimut: 12, elevation: 32, zoom: 2.8, cible: [4300, 1400, 1700] },
        texte: 'Dans la cuisine, la salle d’eau et les WC, ' + air('neuf', 'l’air neuf') + ', chargé d’humidité et d’odeurs, est aspiré par les bouches. Chaque bouche prend son débit. Dans la gaine, c’est de ' + air('repris', 'l’air extrait') + '.' },
      { titre: 'Les débits s’additionnent jusqu’au caisson', piece: 'gaines', voirDedans: true, eclate: false, actions: [...base, ['phase', 'gaines']],
        vue: { azimut: 8, elevation: 34, zoom: 1.9, cible: [4000, 2700, 1600] },
        texte: 'Salle d’eau 30 + WC 15 = 45 m³/h dans la branche. Avec la cuisine (90) : 135 m³/h arrivent au caisson. À chaque jonction, on additionne.' },
      { titre: 'L’air est rejeté en toiture', piece: 'sortie', voirDedans: true, eclate: false, actions: [...base, ['phase', 'rejet']],
        vue: { azimut: 14, elevation: 22, zoom: 2.4, cible: [4400, 3700, 545] },
        texte: 'Le ventilateur pousse tout l’air extrait vers la sortie de toit, sous son chapeau. Il sort dehors : c’est ' + air('rejete', 'l’air rejeté') + '.' }
    ];

    /* l'éclaté : on démonte du haut vers le bas, dans l'ordre réel */
    const eclate = [
      { objets: [toit], vers: [0, 3800, 0], debut: 0, fin: 0.55 },
      { objets: [sortie], vers: [0, 2500, 0], debut: 0.05, fin: 0.6 },
      { objets: [caisson], vers: [0, 1600, 0], debut: 0.12, fin: 0.7 },
      { objets: [gaines], vers: [0, 950, 0], debut: 0.22, fin: 0.8 },
      { objets: [fermettes], vers: [0, 480, 0], debut: 0.32, fin: 0.9 },
      { objets: [plafond, bouches], vers: [0, 250, 0], debut: 0.42, fin: 1 }
    ];

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 22, elevation: 22, zoom: 0.62, cible: [4700, 2500, 0] },
      vue: ctx.mode === 'comprendre'
        ? { azimut: 14, elevation: 40, zoom: 1, cadre: [maison, toit], marge: 0.7 }
        : { azimut: 28, elevation: 20, zoom: 1, cadre: [maison, toit], marge: 0.7 },
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'phase') { E.phase = v; majRep(); }
        if (id === 'marche') { E.marche = v === 'marche'; ctx.regler('marche', v); }
        if (id === 'cuisine') { E.cuisine = v; ctx.regler('cuisine', v); cordonCible = v === 'pointe' ? 1 : 0; }
        if (id === 'portes') { E.portes = v; ctx.regler('portes', v); }
        visibles(); majTexte();
      },
      surEclate(on) { E.demonte = on; majEnveloppe(); visibles(); },
      animer(dt) {
        const cibleW = E.marche && !E.demonte ? 2 * Math.PI * (E.cuisine === 'pointe' ? 1.25 : 0.9) : 0;
        w = K.vers(w, cibleW, 1.6, dt); angle += w * dt; roue.rotation.z = angle;
        const r = w / (2 * Math.PI * 0.9);
        dep = K.vers(dep, cibleDep(), 3, dt); aiguille.rotation.z = -(dep / 50 * 135) * D;
        const jc = E.portes === 'bloquees' ? 0 : JOUR; jour = K.vers(jour, jc, 6, dt); if (Math.abs(jour - jc) < 0.3) jour = jc; poserPortes();
        cordon_ = K.vers(cordon_, cordonCible, 6, dt); if (Math.abs(cordon_ - cordonCible) < 0.01) cordon_ = cordonCible; poserBoucheCuisine();
        flots.forEach(f => { if (f.objet.visible && r > 0.01) { f.etat.v = f.base * r; f.animer(dt); } });
        return w > 0.002 || cibleW > 0 || Math.abs(dep - cibleDep()) > 0.05 || jour !== (E.portes === 'bloquees' ? 0 : JOUR) || cordon_ !== cordonCible;
      }
    };
  }, { famille: 'vmc', titre: 'Un logement équipé d’une VMC simple flux', stations: ['simple-flux', 'dimensionner-vmc'] });
})();
