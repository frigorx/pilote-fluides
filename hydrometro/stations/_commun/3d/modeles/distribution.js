/* HydroMétro 3D — famille « distribution » : le collecteur de plancher chauffant (3 départs), puis
   (plus bas dans ce fichier) le radiateur à panneaux et son robinet thermostatique.
   Unités : mm. Repère : X le long des barres (le départ entre à gauche), Y vers le haut,
   Z vers l'avant (+Z = devant ; le mur est en z = 0). Les deux barres sont à z = 50, au-dessus
   l'une de l'autre : le DÉPART en haut (y = +95), le RETOUR en bas (y = -95).

   CE QUE L'ÉLÈVE DOIT VOIR : l'eau chaude arrive dans la barre du haut, se partage ; dans chaque
   boucle elle monte dans un tube transparent et soulève un flotteur (plus de débit = flotteur plus
   haut) ; elle part sous le sol, se refroidit, revient dans la barre du bas. On règle une boucle
   avec sa vanne (le capuchon bleu) : le capuchon se visse, le débit change, le flotteur monte ou
   descend. Une boucle fermée ne chauffe plus.

   « Voir en coupe » enlève la moitié avant par le plan des axes des deux barres (z = 50) : les
   faces coupées sont hachurées, l'eau est teintée. Les flotteurs restent entiers. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('collecteur', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const D = Math.PI / 180;
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const { clamp } = K;

    /* ---------------------------------------------------------------- repères du modèle */
    const Y_S = 95, Y_R = -95, ZC = 50, RB = 17.5, RBI = 14.5;   /* axes des barres, tube Ø 35 × 3 */
    const XI = [-80, 0, 80];                                     /* les trois sorties (entraxe 80) */
    const BL = 118, DX = BL - 100, CX = 108;                     /* demi-longueur du corps de barre ; axe des consoles */
    const Lx = v => v - DX, Rx = v => v + DX;                    /* les pièces d'extrémité suivent la longueur de barre */
    const QECH = 3.5, FY0 = 46, FY1 = 108;                       /* échelle du débitmètre : 0 à 3,5 L/min */
    const Y_DALLE = -300;                                        /* dessus de la dalle */
    const BOUCLES = [
      { id: 'A', qmax: 2.0, o0: 55, xl: -250, xr: -130, n: 7 },  /* A : la plus longue, la plus freinée */
      { id: 'B', qmax: 2.4, o0: 50, xl: -60, xr: 60, n: 5 },
      { id: 'C', qmax: 3.2, o0: 25, xl: 130, xr: 230, n: 3 }     /* C : la plus courte, bridée par sa vanne */
    ];

    /* ---------------------------------------------------------------- matières à soi (coupables) */
    const coupables = [];
    const C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; coupables.push(c); return c; };
    const inox = C(M.acier, 0xcfd5da);
    const laiton = C(M.laiton);
    const cuivre = C(M.cuivre);
    const zingue = C(M.zingue);
    const bleu = C(M.plastiqueBleu);
    const rouge = C(M.plastiqueRouge);
    const blanc = C(M.plastiqueBlanc);
    const noir = C(M.plastiqueNoir);
    const marine = C(M.plastiqueMarine);
    const peint = C(M.plastique, 0xe9e7e0);
    const platre = C(M.plastique, 0xf0ebdf); platre.roughness = 0.9;
    const dalleMat = C(M.sable, 0xd2c9b4);
    const verre = new T.MeshStandardMaterial({ color: 0xe3edf4, roughness: 0.08, transparent: true, opacity: 0.2, depthWrite: false, side: T.DoubleSide });
    const eauTube = new T.MeshStandardMaterial({ color: 0xe7826a, roughness: 0.2, transparent: true, opacity: 0.34, depthWrite: false, side: T.DoubleSide });
    const eauRouge = new T.MeshStandardMaterial({ color: 0xee9d86, roughness: 0.25, transparent: true, opacity: 0.5, depthWrite: false, side: T.DoubleSide });
    const eauBleue = new T.MeshStandardMaterial({ color: 0x7fb1ea, roughness: 0.25, transparent: true, opacity: 0.5, depthWrite: false, side: T.DoubleSide });
    coupables.push(verre, eauTube, eauRouge, eauBleue);

    /* ---------------------------------------------------------------- aides de géométrie */
    const hexG = (r, h) => new T.CylinderGeometry(r, r, h, 6);
    const cylY = (r, y0, y1, mat, seg) => K.mesh(K.cylindre(r, y1 - y0, seg || 28), mat, 0, (y0 + y1) / 2, 0);
    const ringY = (rE, rI, y0, y1, mat, seg) => K.mesh(K.anneau(rE, rI, y1 - y0, seg || 28), mat, 0, (y0 + y1) / 2, 0);
    const hexY = (r, y0, y1, mat) => K.mesh(hexG(r, y1 - y0), mat, 0, (y0 + y1) / 2, 0);
    const surX = (g, x, y, z) => { g.rotateZ(Math.PI / 2); g.translate(x, y || 0, z || 0); return g; };
    const cylX = (r, x0, x1, mat, y, z, seg) => new T.Mesh(surX(K.cylindre(r, x1 - x0, seg || 28), (x0 + x1) / 2, y, z), mat);
    const ringX = (rE, rI, x0, x1, mat, y, z, seg) => new T.Mesh(surX(K.anneau(rE, rI, x1 - x0, seg || 36), (x0 + x1) / 2, y, z), mat);
    const hexX = (r, x0, x1, mat) => new T.Mesh(surX(hexG(r, x1 - x0), (x0 + x1) / 2), mat);
    const surZ = (g, z, x, y) => { g.rotateX(Math.PI / 2); g.translate(x || 0, y || 0, z); return g; };
    const cylZ = (r, z0, z1, mat, x, y, seg) => new T.Mesh(surZ(K.cylindre(r, z1 - z0, seg || 24), (z0 + z1) / 2, x, y), mat);
    const hexZ = (r, z0, z1, mat, x, y) => new T.Mesh(surZ(hexG(r, z1 - z0), (z0 + z1) / 2, x, y), mat);
    const A = (...objets) => { const g = new T.Group(); objets.forEach(o => o && g.add(o)); return g; };
    /* un marquage : « voile », pour que la surbrillance ne le noircisse pas */
    const grav = (t, h, o) => { const m = K.gravure(t, h, o); m.userData.voile = true; return m; };
    const calme = o => { o.userData.sansOmbre = true; o.castShadow = false; return o; };

    /* ================================================================ LE DÉCOR : mur et dalle */
    const mur = K.mesh(K.boite(700, 580, 20, 2), platre, 0, -10, -10);
    const dalle = K.mesh(K.boite(700, 40, 480, 3), dalleMat, 0, Y_DALLE - 20, 220);
    racine.add(mur, dalle);

    /* ================================================================ LES CONSOLES (deux, vissées au mur) */
    const consoles = new T.Group();
    [-1, 1].forEach(s => {
      const x = s * CX;
      consoles.add(K.mesh(K.boite(34, 290, 3, 1), peint, x, 0, 1.5));
      [[-1, 125], [1, 125]].forEach(([k, y]) => {
        const v = K.vis(3.6); v.rotation.x = Math.PI / 2; v.position.set(x, k * y, 3); consoles.add(v);
      });
      [Y_S, Y_R].forEach(y => {
        consoles.add(K.mesh(K.boite(18, 16, 27, 1.5), peint, x, y, 16.5));          /* le bras */
        consoles.add(ringX(21.5, RB, x - 7, x + 7, peint, y, ZC));                   /* le collier autour de la barre */
        const v = K.vis(3.2); v.position.set(x, y + 21.5, ZC); consoles.add(v);
      });
    });
    racine.add(consoles);

    /* ================================================================ LES BARRES */
    const barre = (y, bande, lettres) => {
      const g = new T.Group(); g.position.set(0, y, ZC);
      g.add(ringX(RB, RBI, -BL, BL, inox));
      g.add(ringX(RB + 0.9, RB - 0.2, -BL + 8, -BL + 16, bande));           /* bague colorée : rouge départ, bleu retour */
      XI.forEach((x, i) => {                                       /* l'étiquette de la boucle : A, B, C */
        g.add(K.mesh(K.boite(17, 10, 1.6, 0.6), blanc, x, 0, RB + 0.3));
        const t = grav(lettres[i], 7, { couleur: '#1b3a63' }); t.position.set(x, 0, RB + 1.2); g.add(t);
      });
      return g;
    };
    const barreDep = barre(Y_S, rouge, ['A', 'B', 'C']);
    const barreRet = barre(Y_R, bleu, ['A', 'B', 'C']);
    racine.add(barreDep, barreRet);

    /* la vanne d'arrêt (à boisseau sphérique, poignée dans le sens du tube : ouverte) et le raccord */
    const arret = (y, poignee) => {
      const g = new T.Group(); g.position.set(0, y, ZC);
      g.add(hexX(19, Lx(-112), Lx(-100), laiton));
      g.add(ringX(15, 12.5, Lx(-148), Lx(-112), laiton));
      g.add(K.mesh(K.sphere(12, 24), laiton, Lx(-130), 0, 0));
      const axe = cylY(4, 12, 27, zingue); axe.position.x = Lx(-130); g.add(axe);
      const levier = K.mesh(K.boite(62, 5, 12, 1.6), poignee, Lx(-130), 29.5, 0); g.add(levier);
      g.add(hexX(17, Lx(-160), Lx(-148), laiton));
      g.add(ringX(11, 9.8, Lx(-215), Lx(-160), cuivre));
      return g;
    };
    const arretDep = arret(Y_S, rouge), arretRet = arret(Y_R, bleu);
    racine.add(arretDep, arretRet);

    /* le bout de barre : le purgeur (dessus) et le robinet de remplissage-vidange (devant) */
    const fin = (y, bouchon) => {
      const g = new T.Group(); g.position.set(0, y, ZC);
      g.add(ringX(15, 12.5, Rx(100), Rx(126), laiton));
      g.add(cylX(15, Rx(126), Rx(128), laiton));
      const p = A(ringY(8.5, 5.5, 15, 40, laiton), cylY(5.8, 40, 47, noir), cylY(2.4, 47, 49.5, laiton));
      p.position.x = Rx(116); g.add(p);
      const r = A(cylZ(7, 12, 40, laiton), hexZ(9.2, 24, 33, laiton), cylZ(8.4, 40, 52, bouchon));
      r.position.x = Rx(116); g.add(r);
      return g;
    };
    const finDep = fin(Y_S, rouge), finRet = fin(Y_R, bleu);
    racine.add(finDep, finRet);

    /* ================================================================ LES DÉBITMÈTRES (sur la barre de départ)
       Un tube transparent gradué : l'eau le traverse de bas en haut et soulève la bille. */
    const FY = f => FY0 + clamp(f, 0, 1) * (FY1 - FY0);
    const debits = XI.map((x, i) => {
      const g = new T.Group(); g.position.set(x, Y_S, ZC);
      g.add(hexY(12.5, 14, 34, laiton), ringY(12, 9.2, 34, 38, laiton));
      const tube = ringY(11, 9.2, 38, 116, verre); tube.userData.voile = true; calme(tube); g.add(tube);
      const eau = cylY(9.1, 38, 116, eauTube); eau.userData.voile = true; calme(eau); g.add(eau);
      g.add(cylY(12.5, 116, 132, laiton));
      g.add(cylZ(8, 4, 24, laiton, 0, 124), hexZ(10.5, 14, 28, laiton, 0, 124));      /* la sortie vers le tube PER */
      /* la plaquette graduée, collée à gauche du tube, un peu en retrait */
      g.add(K.mesh(K.boite(16, 78, 1.6, 0.5), blanc, -19, 77, -1.0));
      for (let q = 0.5; q <= QECH + 0.01; q += 0.5) {
        const entier = Math.abs(q - Math.round(q)) < 0.01, y = FY(q / QECH);
        g.add(calme(K.mesh(new T.BoxGeometry(entier ? 7 : 4, 0.7, 0.5), noir, entier ? -14.5 : -13, y, -0.3)));
        if (entier) { const t = grav(String(Math.round(q)), 6, { couleur: '#10233c' }); t.position.set(-21.5, y, -0.1); g.add(t); }
      }
      const u = grav('L/min', 3, { couleur: '#10233c' }); u.position.set(-19, 112, -0.1); g.add(u);
      const flotteur = K.mesh(K.sphere(6.5, 22), marine, 0, FY(0), 0); g.add(flotteur);
      racine.add(g);
      return { g, flotteur, eau };
    });

    /* ================================================================ LES VANNES DE RÉGLAGE (sur la barre de retour)
       Le capuchon bleu se visse : vissé à fond, il pousse le clapet sur son siège (fermé) ;
       dévissé, le clapet remonte (ouvert). */
    const COURSE = 5;
    const vannes = XI.map((x, i) => {
      const g = new T.Group(); g.position.set(x, Y_R, ZC);
      g.add(hexY(12.5, 14, 24, laiton), ringY(10.5, 7.5, 24, 50, laiton), ringY(7.5, 4, 28, 31, laiton));
      g.add(ringY(12, 2.5, 50, 55, zingue), ringY(8, 2.5, 55, 70, zingue));
      g.add(cylZ(7.5, 4, 24, laiton, 0, 38), hexZ(10, 14, 28, laiton, 0, 38));        /* l'arrivée du tube PER */
      const tige = new T.Group();                                                      /* clapet + tige : ils suivent le capuchon */
      tige.add(cylY(2.5, 33, 62, inox, 16), K.mesh(K.cylindre(1.5, 6, 20, 4.8), inox, 0, 31, 0));
      g.add(tige);
      const cap = new T.Group();
      cap.add(K.mesh(K.cylindre(14.5, 22, 30, 12.8), bleu, 0, 11, 0));
      for (let k = 0; k < 14; k++) {
        const a = k / 14 * Math.PI * 2, nerv = K.mesh(new T.BoxGeometry(1.7, 14, 1.7), bleu, Math.cos(a) * 14.3, 8, Math.sin(a) * 14.3);
        nerv.rotation.y = -a; cap.add(nerv);
      }
      cap.add(K.mesh(new T.BoxGeometry(11, 0.7, 2.2), blanc, 0, 22.1, 0));             /* le repère du sens de rotation */
      g.add(cap);
      const eau = cylY(7.4, 10, 46, eauBleue); eau.userData.voile = true; calme(eau); eau.visible = false; g.add(eau);
      racine.add(g);
      return { g, cap, tige, eau };
    });
    const eauxCoupe = [];
    debits.forEach(d => {
      [cylY(8, 10, 38, eauRouge), cylY(8, 116, 130, eauRouge)].forEach(e => { e.userData.voile = true; calme(e); e.visible = false; d.g.add(e); eauxCoupe.push(e); });
    });
    vannes.forEach(v => eauxCoupe.push(v.eau));
    [[Y_S, eauRouge], [Y_R, eauBleue]].forEach(([y, mat]) => {
      const e = ringX(14.4, 0, -BL, BL, mat, y, ZC); e.userData.voile = true; calme(e); e.visible = false; racine.add(e); eauxCoupe.push(e);
    });

    /* ================================================================ LES TUBES PER DES BOUCLES
       Chaque boucle : sortie du débitmètre → descente en arc → serpentin dans la dalle → remontée → vanne.
       La couleur suit l'eau : rouge chaud à la sortie, bleu froid au retour ; plus le débit est faible,
       plus l'eau a refroidi tôt. Une boucle fermée est tout en bleu pâle. */
    const Z0 = 150, PAS = 32, RH = 16, YT = Y_DALLE + 8;
    const descente = (xi, x0, xe, zd, yDep) => {
      const zf = Z0 - RH, f = u => zd + (zf - zd) * u;
      return {
        pts: [V(xi, yDep, 74), V(xi, yDep, 92), V(xi + (x0 - xi) * 0.5, yDep - 14, 92 + (zd - 92) * 0.6), V(x0, yDep - 34, zd)],
        bas: [V(x0, -150, zd), V(x0, -205, zd), V(x0 + (xe - x0) * 0.32, -250, f(0.28)), V(x0 + (xe - x0) * 0.8, -278, f(0.62)), V(xe, YT + 2, f(0.9)), V(xe, YT, zf)]
      };
    };
    const arc = (cx, cz, r, a0, a1, n, y) => { const o = []; for (let k = 0; k <= n; k++) { const a = a0 + (a1 - a0) * k / n; o.push(V(cx + r * Math.cos(a), y, cz + r * Math.sin(a))); } return o; };
    const faireTrace = (b, i) => {
      const xi = XI[i], xeS = b.xr, xeR = b.xl - 40;
      const dS = descente(xi, xi + 22, xeS, 112, Y_S + 124);
      const dR = descente(xi, xi - 22, xeR, 96, Y_R + 38);
      const ser = [];
      /* quart de tour : de « vers l'avant » à « vers la gauche » */
      ser.push(...arc(b.xr - RH, Z0 - RH, RH, 0, Math.PI / 2, 6, YT).slice(1));
      for (let k = 0; k < b.n; k++) {
        const z = Z0 + k * PAS, versGauche = k % 2 === 0, xa = versGauche ? b.xl : b.xr;
        ser.push(V(xa, YT, z));
        if (k < b.n - 1) {                                          /* l'épingle, du côté où la passe s'arrête */
          const s = versGauche ? -1 : 1;
          for (let m = 1; m < 8; m++) { const t = m / 8 * Math.PI; ser.push(V(xa + s * RH * Math.sin(t), YT, z + RH * (1 - Math.cos(t)))); }
          ser.push(V(xa, YT, z + PAS));
        }
      }
      /* la dernière passe finit à gauche : grand virage, puis la jambe de retour vers la dalle */
      const zl = Z0 + (b.n - 1) * PAS;
      ser.push(...arc(b.xl, zl - 40, 40, Math.PI / 2, Math.PI, 8, YT).slice(1));
      ser.push(V(xeR, YT, (zl - 40 + Z0 - RH) / 2));
      const retour = [...dR.bas].reverse().concat([...dR.pts].reverse());
      return [...dS.pts, ...dS.bas, ...ser, ...retour];
    };
    const RADIAL = 8;
    const tubesG = new T.Group();
    const tubes = BOUCLES.map((b, i) => {
      const pts = faireTrace(b, i);
      const courbe = new T.CatmullRomCurve3(pts, false, 'centripetal', 0.5);
      const L = courbe.getLength();
      const segs = Math.max(60, Math.min(520, Math.round(L / 4.5)));
      const geo = new T.TubeGeometry(courbe, segs, 8, RADIAL, false);
      const col = new T.BufferAttribute(new Float32Array(geo.attributes.position.count * 3), 3);
      geo.setAttribute('color', col);
      const mat = new T.MeshStandardMaterial({ vertexColors: true, roughness: 0.42, metalness: 0.1, side: T.DoubleSide });
      coupables.push(mat);
      const mesh = new T.Mesh(geo, mat);
      tubesG.add(mesh);
      return { mesh, col, segs, L };
    });
    racine.add(tubesG);

    /* les zones chauffées : une plaque sur la dalle, qui se teinte quand l'eau passe */
    const zonesG = new T.Group();
    const ZONES = [[-306, -114, 'A'], [-112, 78, 'B'], [80, 250, 'C']];
    const zones = BOUCLES.map((b, i) => {
      const [x0, x1] = ZONES[i];
      const mat = C(M.sable, 0xd2c9b4);
      const zFin = Z0 + (b.n - 1) * PAS + 36;
      const m = K.mesh(K.boite(x1 - x0, 1.4, zFin - (Z0 - 40), 0.5), mat, (x0 + x1) / 2, Y_DALLE + 0.7, ((Z0 - 40) + zFin) / 2);
      zonesG.add(m);
      return { mesh: m, mat };
    });
    racine.add(zonesG);

    /* ================================================================ LES FACES DE COUPE
       Dans le plan z = 50 (coordonnées x, y). Hachures à 45° comme sur un plan. */
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
      inox: hachures('#a9b0b8', '#666e77', 6),
      laiton: hachures('#b08f45', '#6a511c', 6),
      zingue: hachures('#aeb4ba', '#6c737b', 5),
      bleu: hachures('#3a6fb3', '#14294a', 5),
      beton: hachures('#cfc7b4', '#8b8374', 9),
      cuivre: uni(0xb8683c, { metalness: 0.3, roughness: 0.5 }),
      acier: uni(0xa9b1b9, { metalness: 0.3, roughness: 0.4 }),
      noir: uni(0x33373c),
      verre: new T.MeshStandardMaterial({ color: 0xcfe0ec, roughness: 0.3, transparent: true, opacity: 0.55, depthWrite: false, side: T.DoubleSide }),
      eauR: new T.MeshStandardMaterial({ color: 0xd9472b, roughness: 0.3, transparent: true, opacity: 0.72, depthWrite: false, side: T.DoubleSide }),
      eauB: new T.MeshStandardMaterial({ color: 0x2f7fd6, roughness: 0.3, transparent: true, opacity: 0.72, depthWrite: false, side: T.DoubleSide })
    };
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const faceDe = (polys, mat, dz, groupe) => {
      const formes = polys.map(p => p instanceof T.Shape ? p : new T.Shape(p.map(q => new T.Vector2(q[0], q[1]))));
      const m = new T.Mesh(new T.ShapeGeometry(formes), mat);
      m.position.z = dz; m.userData.sansOmbre = true; m.castShadow = false; if (mat.transparent) m.userData.voile = true;
      groupe.add(m); return m;
    };
    const R = (x0, x1, y0, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    const sym = (xc, x0, x1, y0, y1) => [R(xc - x1, xc - x0, y0, y1), R(xc + x0, xc + x1, y0, y1)];   /* deux parois autour d'un axe */
    const groupeFaces = (y, parent) => { const g = new T.Group(); g.position.set(0, y, parent ? 0 : ZC); (parent || faces).add(g); return g; };
    const parentZ = () => { const g = new T.Group(); g.position.z = ZC; faces.add(g); return g; };

    /* le profil intérieur de l'eau le long d'une barre (de x = -215 à 126) */
    const PROFIL_EAU = [[-215, -160, 9.8], [-160, -148, 11.5], [-148, -142, 12.5], [-142, -118, 6], [-118, -100, 12.5]].map(([a, b, r]) => [Lx(a), Lx(b), r]).concat([[-BL, BL, 14.5]], [[Rx(100), Rx(126), 12.5]]);
    const polyEau = () => {
      const haut = [], bas = [];
      PROFIL_EAU.forEach(([a, b, r]) => { haut.push([a, r], [b, r]); });
      [...PROFIL_EAU].reverse().forEach(([a, b, r]) => { bas.push([b, -r], [a, -r]); });
      return [...haut, ...bas];
    };
    const trouees = XI;
    const facesDepart = groupeFaces(Y_S), facesRetour = groupeFaces(Y_R);
    const facesDebit = groupeFaces(Y_S), facesVannes = groupeFaces(Y_R);
    const facesArret = parentZ(), facesFin = parentZ();
    const fArrD = groupeFaces(Y_S, facesArret), fArrR = groupeFaces(Y_R, facesArret);
    const fFinD = groupeFaces(Y_S, facesFin), fFinR = groupeFaces(Y_R, facesFin);
    /* l'eau colorée vit à part : la surbrillance d'une pièce ne la teinte pas */
    const eDep = groupeFaces(Y_S), eRet = groupeFaces(Y_R), eDeb = groupeFaces(Y_S), eVan = groupeFaces(Y_R);
    const eauFin = parentZ(), eFinD = groupeFaces(Y_S, eauFin), eFinR = groupeFaces(Y_R, eauFin);

    /* la barre : parois (inox), sauf aux départs de branche où l'eau passe */
    const paroiBarre = g => {
      const haut = []; let x = -BL;
      trouees.forEach(c => { haut.push(R(x, c - 8, RBI, RB)); x = c + 8; });
      haut.push(R(x, BL, RBI, RB));
      faceDe([...haut, R(-BL, BL, -RB, -RBI)], H.inox, 0.03, g);
    };
    paroiBarre(facesDepart); paroiBarre(facesRetour);
    faceDe([polyEau()], H.eauR, -0.3, eDep);
    faceDe([polyEau()], H.eauB, -0.3, eRet);
    /* les branches : l'eau du départ monte dans chaque débitmètre */
    XI.forEach((x, i) => {
      faceDe([[[x - 8, 10], [x + 8, 10], [x + 8, 38], [x + 9.2, 38], [x + 9.2, 116], [x + 8, 116], [x + 8, 130], [x - 8, 130], [x - 8, 116], [x - 9.2, 116], [x - 9.2, 38], [x - 8, 38]]], H.eauR, -0.3, eDeb);
      faceDe([...sym(x, 8, 12.5, 14, 34), ...sym(x, 9.2, 12, 34, 38), ...sym(x, 8, 12.5, 116, 132), R(x - 12.5, x + 12.5, 130, 132)], H.laiton, 0.04, facesDebit);
      faceDe(sym(x, 9.2, 11, 38, 116), H.verre, 0.04, facesDebit);
      faceDe([R(x - 27, x - 11, 38, 116)], uni(0xf1efe8), 0.02, facesDebit);
      /* l'eau du retour descend dans chaque vanne ; le clapet et le capuchon suivent le réglage */
      faceDe([[[x - 7.5, 10], [x + 7.5, 10], [x + 7.5, 28], [x + 4, 28], [x + 4, 31], [x + 7.5, 31], [x + 7.5, 46], [x - 7.5, 46], [x - 7.5, 31], [x - 4, 31], [x - 4, 28], [x - 7.5, 28]]], H.eauB, -0.3, eVan);
      faceDe([...sym(x, 8, 12.5, 14, 24), ...sym(x, 7.5, 10.5, 24, 50), ...sym(x, 4, 7.5, 28, 31), ...sym(x, 2.5, 12, 50, 55), ...sym(x, 2.5, 8, 55, 70)], H.laiton, 0.04, facesVannes);
    });
    const faceVanne = XI.map(x => {
      const gt = new T.Group(); gt.position.x = x; facesVannes.add(gt);
      const gc = new T.Group(); gc.position.x = x; facesVannes.add(gc);
      faceDe([[[-1.5, 28], [1.5, 28], [4.8, 32], [4.8, 34], [2.5, 34], [2.5, 62], [-2.5, 62], [-2.5, 34], [-4.8, 34], [-4.8, 32]]], H.acier, 0.07, gt);
      faceDe([[[-14.5, 0], [14.5, 0], [12.8, 22], [-12.8, 22]]], H.bleu, 0.09, gc);
      return { gt, gc };
    });
    /* la vanne d'arrêt et son raccord */
    const arretFaces = g => {
      faceDe([R(Lx(-215), Lx(-160), 9.8, 11), R(Lx(-215), Lx(-160), -11, -9.8)], H.cuivre, 0.04, g);
      faceDe([R(Lx(-160), Lx(-148), 11.5, 17), R(Lx(-160), Lx(-148), -17, -11.5), R(Lx(-148), Lx(-112), 12.5, 15), R(Lx(-148), Lx(-112), -15, -12.5),
              R(Lx(-112), Lx(-100), 12.5, 19), R(Lx(-112), Lx(-100), -19, -12.5), R(Lx(-133), Lx(-127), 12, 27)], H.laiton, 0.04, g);
      const bille = new T.Shape(); bille.absarc(Lx(-130), 0, 12, 0, Math.PI * 2, false);
      const trou = new T.Path(); trou.moveTo(Lx(-142), -6); trou.lineTo(Lx(-118), -6); trou.lineTo(Lx(-118), 6); trou.lineTo(Lx(-142), 6); trou.lineTo(Lx(-142), -6);
      bille.holes.push(trou);
      faceDe([bille], H.laiton, 0.05, g);
    };
    arretFaces(fArrD); arretFaces(fArrR);
    const finFaces = (g, mat, ge) => {
      const c = Rx(116);
      faceDe([R(Rx(100), Rx(126), 12.5, 15), R(Rx(100), Rx(126), -15, -12.5), R(Rx(126), Rx(128), -15, 15), ...sym(c, 5.5, 8.5, 15, 40)], H.laiton, 0.04, g);
      faceDe([R(c - 5.8, c + 5.8, 40, 47), R(c - 1.2, c + 1.2, 47, 49.5)], H.noir, 0.05, g);
      faceDe([R(c - 5.5, c + 5.5, 10, 40)], mat, -0.3, ge);
    };
    finFaces(fFinD, H.eauR, eFinD); finFaces(fFinR, H.eauB, eFinR);
    /* les consoles : colliers coupés */
    const facesConsoles = parentZ();
    [-1, 1].forEach(s => [Y_S, Y_R].forEach(y => faceDe([R(s * CX - 7, s * CX + 7, y + RB, y + 21.5), R(s * CX - 7, s * CX + 7, y - 21.5, y - RB)], H.zingue, 0.04, facesConsoles)));
    /* la dalle, coupée */
    const facesDalle = parentZ();
    faceDe([R(-350, 350, Y_DALLE - 40, Y_DALLE)], H.beton, 0.03, facesDalle);

    /* ================================================================ L'EAU QUI CIRCULE (grains) */
    const ligne = (a, b) => new T.LineCurve3(a, b);
    const gS = ligne(V(Lx(-200), Y_S, ZC), V(BL - 4, Y_S, ZC)), gR = ligne(V(BL - 4, Y_R, ZC), V(Lx(-200), Y_R, ZC));
    const grainsBarreDep = K.courant(gS, { pas: 12, rayon: 2.5, couleur: 0xd9472b, vitesse: 20 });
    const grainsBarreRet = K.courant(gR, { pas: 12, rayon: 2.5, couleur: 0x2f7fd6, vitesse: 20 });
    const grainsDebit = XI.map(x => K.courant(ligne(V(x, Y_S + 6, ZC), V(x, Y_S + 128, ZC)), { pas: 10, rayon: 2.3, couleur: 0xd9472b, vitesse: 24 }));
    const grainsVanne = XI.map(x => K.courant(ligne(V(x, Y_R + 40, ZC), V(x, Y_R + 4, ZC)), { pas: 9, rayon: 2.2, couleur: 0x2f7fd6, vitesse: 24 }));
    const courants = [grainsBarreDep, grainsBarreRet, ...grainsDebit, ...grainsVanne];
    courants.forEach(c => { racine.add(c.objet); c.surCoupe = false; c.on = true; });
    [grainsBarreDep, grainsBarreRet, ...grainsVanne].forEach(c => { c.surCoupe = true; });   /* ils sont dans l'acier : on ne les voit qu'en coupe */

    /* ================================================================ L'ÉTAT */
    const E = { coupe: false, demonte: false, dernier: null };
    const ou = BOUCLES.map(b => K.mobile(b.o0 / 100, 170, 21));     /* l'ouverture de la vanne, 0 → 1 */
    const fl = BOUCLES.map(b => K.mobile(clamp(b.qmax * b.o0 / 100 / QECH, 0, 1), 110, 14));   /* la position du flotteur */
    const qCible = i => BOUCLES[i].qmax * ou[i].cible;
    const qNow = i => BOUCLES[i].qmax * ou[i].x;
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });

    const cChaud = new T.Color(0xd9472b), cFroid = new T.Color(0x2f7fd6), cMort = new T.Color(0xa9b9cb), cTmp = new T.Color();
    const zFroid = new T.Color(0xd2c9b4), zChaud = new T.Color(0xf0a67a);
    const colorier = (i, q) => {
      const t = tubes[i], arr = t.col.array, ring = RADIAL + 1;
      const h = clamp(q / 0.3, 0, 1), w = clamp(q / 2.4, 0, 1), lc = 0.14 + 0.7 * w;
      for (let k = 0; k <= t.segs; k++) {
        const u = k / t.segs, s = clamp(u / lc, 0, 1), tt = s * s * (3 - 2 * s);
        cTmp.copy(cChaud).lerp(cFroid, tt).lerp(cMort, 1 - h);
        for (let j = 0; j < ring; j++) { const n = (k * ring + j) * 3; arr[n] = cTmp.r; arr[n + 1] = cTmp.g; arr[n + 2] = cTmp.b; }
      }
      t.col.needsUpdate = true;
      zones[i].mat.color.copy(zFroid).lerp(zChaud, h * clamp(q / 2.2, 0, 1));
    };
    const poser = i => {
      const o = ou[i].x;
      vannes[i].cap.position.y = 53 + COURSE * o; vannes[i].cap.rotation.y = -o * Math.PI * 6;
      vannes[i].tige.position.y = COURSE * o;
      faceVanne[i].gt.position.y = COURSE * o; faceVanne[i].gc.position.y = 53 + COURSE * o;
      debits[i].flotteur.position.y = FY(fl[i].x);
    };
    const visibles = () => {
      courants.forEach(c => { c.objet.visible = c.on && !E.demonte && (!c.surCoupe || E.coupe); });
    };
    const reglerGrains = () => {
      let total = 0;
      for (let i = 0; i < 3; i++) {
        const q = qNow(i); total += q;
        const on = q > 0.02;
        grainsDebit[i].regler({ debit: on ? 1 : 0, vitesse: 8 + q * 22 }); grainsDebit[i].on = on;
        grainsVanne[i].regler({ debit: on ? 1 : 0, vitesse: 8 + q * 22 }); grainsVanne[i].on = on;
      }
      const onT = total > 0.02;
      grainsBarreDep.regler({ debit: onT ? 1 : 0, vitesse: 6 + total * 12 }); grainsBarreDep.on = onT;
      grainsBarreRet.regler({ debit: onT ? 1 : 0, vitesse: 6 + total * 12 }); grainsBarreRet.on = onT;
      visibles();
    };
    const majMesures = () => ctx.mesures(BOUCLES.map((b, i) => ({ libelle: 'La boucle ' + b.id, valeur: nb(qCible(i), 1) + ' L/min' })));
    const majTexte = () => {
      majMesures();
      const i = E.dernier, rappel = ' Le flotteur donne le débit de chaque boucle.';
      if (i === null) { ctx.dire('<strong>Le collecteur.</strong> Le débit de chaque boucle se lit sur son flotteur ; on le règle avec la vanne, sous le capuchon bleu.'); return; }
      const q = qCible(i), id = BOUCLES[i].id, o = Math.round(ou[i].cible * 100);
      if (q < 0.02) ctx.dire('<strong>Boucle ' + id + ' fermée.</strong> L’eau n’y passe plus : son flotteur est retombé, la boucle ne chauffe plus.' + rappel);
      else ctx.dire('<strong>Boucle ' + id + ' : ' + nb(q, 1) + ' L/min.</strong> Vanne ouverte à ' + o + ' %. Plus la vanne s’ouvre, plus le flotteur monte.' + rappel);
    };

    const basculerCoupe = on => {
      E.coupe = on;
      const plan = on ? [new T.Plane(new T.Vector3(0, 0, -1), ZC)] : null;
      const exclus = new Set();
      [faces, ...debits.map(d => d.flotteur), ...courants.map(c => c.objet)].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.needsUpdate = true; } });
      });
      faces.visible = on && !E.demonte;
      eauxCoupe.forEach(e => { e.visible = on; });
      visibles();
    };

    for (let i = 0; i < 3; i++) { poser(i); colorier(i, qNow(i)); }
    reglerGrains(); majTexte();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'depart', nom: 'La barre de départ (rouge)', objets: [barreDep, facesDepart], ancre: [30, Y_S, ZC + RB], desc: 'Le tube du haut. L’eau chaude y arrive et se partage entre les trois boucles. Chaque sortie porte la lettre de sa boucle : A, B, C.' },
      { id: 'debitmetres', nom: 'Les débitmètres et leur flotteur', objets: [...debits.map(d => d.g), facesDebit], ancre: [XI[1], Y_S + 77, ZC + 11], desc: 'Un tube transparent gradué en L/min. L’eau le traverse de bas en haut et soulève le flotteur : plus il passe d’eau, plus le flotteur monte. On lit au milieu de la bille.' },
      { id: 'retour', nom: 'La barre de retour (bleue)', objets: [barreRet, facesRetour], ancre: [30, Y_R, ZC + RB], desc: 'Le tube du bas. Il rassemble l’eau refroidie qui revient des trois boucles, puis la renvoie vers la chaufferie.' },
      { id: 'vannes', nom: 'Les vannes de réglage (capuchons bleus)', objets: [...vannes.map(v => v.g), facesVannes], ancre: [XI[1], Y_R + 65, ZC + 14], desc: 'Une vanne par boucle. Le capuchon bleu se visse : vissé à fond, il ferme ; dévissé, il ouvre. C’est ici qu’on règle le débit de la boucle.' },
      { id: 'arret', nom: 'Les vannes d’arrêt', objets: [arretDep, arretRet, facesArret], ancre: [Lx(-130), Y_R, ZC + 12], desc: 'Une à chaque barre, côté tuyauterie. Elles coupent tout le collecteur pour une intervention. Poignée dans le sens du tube : ouverte.' },
      { id: 'purge', nom: 'Le purgeur et le robinet de remplissage', objets: [finDep, finRet, facesFin], ancre: [Rx(116), Y_S + 30, ZC], desc: 'En bout de barre. Le purgeur évacue l’air qui gêne la circulation. Le robinet sert à remplir et à vidanger les boucles.' },
      { id: 'tubes', nom: 'Les tubes des boucles (PER multicouche)', objets: [tubesG], ancre: [XI[1] + 22, -100, 120], desc: 'Un tube part du départ, serpente dans la dalle et revient au retour. Sur l’écran, sa couleur suit l’eau : rouge chaud, bleu froid.' },
      { id: 'consoles', nom: 'Les consoles murales', objets: [consoles, facesConsoles], ancre: [CX, 50, 4], desc: 'Deux supports vissés au mur. Les colliers tiennent les deux barres.' },
      { id: 'dalle', nom: 'La dalle et les zones chauffées', objets: [dalle, zonesG, facesDalle], ancre: [-100, Y_DALLE, 260], desc: 'Les tubes sont noyés dans la dalle. Quand l’eau chaude passe, la zone de sa boucle chauffe : A, B et C chauffent trois pièces différentes.' }
    ];

    const commandes = BOUCLES.map(b => ({ id: b.id, type: 'curseur', libelle: 'Ouverture relative ' + b.id, min: 0, max: 100, pas: 5, unite: '%', valeur: b.o0 }));

    const RAZ = [['A', 55], ['B', 50], ['C', 25]];
    const etapes = [
      { titre: 'Le collecteur, tel qu’on le voit', piece: 'depart', voirDedans: false, eclate: false, actions: RAZ,
        vue: { azimut: -12, elevation: 15, zoom: 0.62, cible: [-15, -40, 100] },
        texte: 'Deux barres fixées au mur : celle du haut, rouge, est le départ ; celle du bas, bleue, est le retour. Trois tubes, A, B et C, partent sous le sol et reviennent.' },
      { titre: 'L’eau chaude remplit la barre de départ et se partage', piece: 'depart', voirDedans: true, eclate: false, actions: RAZ,
        vue: { azimut: -4, elevation: 8, zoom: 1.2, cible: [-45, 140, 50] },
        texte: 'Elle arrive par la vanne d’arrêt, à gauche, et remplit la barre. À chaque sortie, une partie de l’eau monte vers sa boucle.' },
      { titre: 'Dans chaque boucle, l’eau soulève un flotteur', piece: 'debitmetres', voirDedans: false, eclate: false, actions: RAZ,
        vue: { azimut: -9, elevation: 6, zoom: 1.75, cible: [-5, 155, 50] },
        texte: 'L’eau monte dans le tube transparent et pousse le flotteur. Plus l’eau passe, plus le flotteur monte : on lit le débit sur la graduation, en L/min.' },
      { titre: 'L’eau parcourt la boucle et se refroidit', piece: 'tubes', voirDedans: false, eclate: false, actions: RAZ,
        vue: { azimut: -24, elevation: 36, zoom: 0.82, cible: [-10, -160, 190] },
        texte: 'Le tube serpente dans la dalle et chauffe la pièce. L’eau donne sa chaleur : elle revient plus froide, vers la barre du bas. Sur l’écran, rouge = chaud, bleu = froid.' },
      { titre: 'Vous ouvrez la vanne de A : son débit monte', piece: 'vannes', voirDedans: true, eclate: false, actions: [['A', 90], ['B', 50], ['C', 25]],
        vue: { azimut: -4, elevation: 6, zoom: 1.0, cible: [-45, 55, 50] },
        texte: 'Vous dévissez le capuchon bleu de A : la vanne s’ouvre. Il passe plus d’eau dans A, et son flotteur monte de 1,1 à 1,8 L/min. B et C ne bougent pas.' },
      { titre: 'Vous fermez la vanne de C : elle ne chauffe plus', piece: 'vannes', voirDedans: false, eclate: false, actions: [['A', 90], ['B', 50], ['C', 0]],
        vue: { azimut: 18, elevation: 22, zoom: 0.7, cible: [40, 0, 110] },
        texte: 'Vous vissez le capuchon de C à fond : la vanne se ferme. L’eau n’entre plus dans C, son flotteur retombe à zéro et sa zone de dalle refroidit.' },
      { titre: 'Démonté : tout se dévisse', piece: 'consoles', voirDedans: false, eclate: true, actions: RAZ,
        texte: 'Les capuchons se dévissent, les vannes et les débitmètres se retirent des barres, les tubes se débranchent. Les barres restent sur leurs consoles.' }
    ];

    const eclate = [
      { objets: vannes.map(v => v.cap), vers: [0, 42, 0], debut: 0, fin: 0.4 },
      { objets: debits.map(d => d.g), vers: [0, 95, 0], debut: 0.1, fin: 0.55 },
      { objets: vannes.map(v => v.g), vers: [0, 18, 0], debut: 0.15, fin: 0.55 },
      { objets: [tubesG], vers: [0, 0, 85], debut: 0.35, fin: 0.8 },
      { objets: [arretDep, arretRet], vers: [-75, 0, 0], debut: 0.55, fin: 1 },
      { objets: [finDep, finRet], vers: [65, 0, 0], debut: 0.55, fin: 1 }
    ];

    const cadre = [barreDep, barreRet, ...debits.map(d => d.g), ...vannes.map(v => v.g), arretDep, finDep];
    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: -34, elevation: 20, zoom: 0.72, cible: [0, 0, 90] },
      vue: ctx.mode === 'decouvrir' ? { azimut: -20, elevation: 16, cadre, zoom: 0.6, cible: [-15, -40, 100], marge: 1.0 }
                                    : { azimut: -12, elevation: 15, cadre, zoom: 0.62, cible: [-15, -40, 100], marge: 1.0 },
      sansSol: true,
      phrase: undefined,
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: false,
      agir(id, v) {
        const i = BOUCLES.findIndex(b => b.id === id);
        if (i < 0) return;
        E.dernier = i;
        ou[i].cible = clamp(+v / 100, 0, 1);
        ctx.regler(id, +v);
        majTexte();
      },
      surEclate(on) {
        if (on && E.coupe && ctx.element && ctx.element.fantome) ctx.element.fantome(false);   /* on démonte la machine entière, pas sa coupe */
        E.demonte = on; faces.visible = E.coupe && !on; visibles();
      },
      animer(dt) {
        for (let i = 0; i < 3; i++) {
          const m1 = ou[i].pas(dt);
          fl[i].cible = clamp(qNow(i) / QECH, 0, 1);
          const m2 = fl[i].pas(dt);
          poser(i);
          if (m1 || m2) colorier(i, qNow(i));
        }
        reglerGrains();
        courants.forEach(c => { if (c.objet.visible) c.animer(dt); });
        return true;
      }
    };
  }, { famille: 'distribution', titre: 'Le collecteur de plancher chauffant', stations: ['plancher'] });

  /* ==================================================================== LE RADIATEUR
     Radiateur à panneaux en acier, type 21 (deux panneaux, un convecteur), 600 × 800.
     Unités : mm. X le long du radiateur, Y vers le haut, Z vers l'avant (le mur est en z = 0).
     En haut à gauche : le robinet thermostatique (le DÉPART) ; en bas à gauche : le coude de
     réglage (le RETOUR) ; en haut à droite : le purgeur ; en bas à droite : le bouchon.

     CE QUE L'ÉLÈVE DOIT VOIR : l'eau chaude entre en haut, descend dans les canaux verticaux en
     donnant sa chaleur (rouge → bleu) et ressort en bas. Et la pièce qui se réchauffe gonfle le
     soufflet de la tête thermostatique : il pousse le clapet sur son siège, l'eau n'entre plus.

     « Voir en coupe » retire la moitié avant du panneau avant (plan z = 81, qui passe aussi par
     l'axe du robinet) : on voit les canaux pleins d'eau et l'intérieur du robinet. */
  Electro3D.definir('radiateur', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const D = Math.PI / 180;
    const { clamp } = K;
    const V = (x, y, z) => new T.Vector3(x, y, z);

    const W = 800, NC = 24, PITCH = W / NC, CW = 26.5, PZ = 14;
    const ZR = 32, ZF = 81;                 /* axes des deux panneaux ; plan de coupe */
    const YB = 281;                         /* axe des collecteurs : +YB en haut, -YB en bas */
    const XV = -452;                        /* axe des tubes qui arrivent du mur */
    const CONSIGNE_BAS = 18, CONSIGNE_HAUT = 21;   /* ouvert en dessous de 18 °C, fermé à 21 °C */
    const YSOL = -400;

    const C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; return c; };
    const emaille = C(M.plastiqueBlanc, 0xf2f1ec); emaille.roughness = 0.38;
    const chrome = C(M.acier, 0xe4e7ea);
    const laiton = C(M.laiton);
    const cuivre = C(M.cuivre);
    const blancTete = C(M.plastiqueBlanc, 0xf8f7f2);
    const peint = C(M.plastique, 0xe9e7e0);
    const platre = C(M.plastique, 0xf0ebdf); platre.roughness = 0.9;
    const dalleMat = C(M.sable, 0xd2c9b4);
    const sombre = C(M.sombre);

    const grav = (t, h, o) => { const m = K.gravure(t, h, o); m.userData.voile = true; return m; };
    const surX = (g, x, y, z) => { g.rotateZ(Math.PI / 2); g.translate(x, y || 0, z || 0); return g; };
    const cylX = (r, x0, x1, mat, y, z, seg) => new T.Mesh(surX(K.cylindre(r, x1 - x0, seg || 28), (x0 + x1) / 2, y, z), mat);
    const ringX = (rE, rI, x0, x1, mat, y, z, seg) => new T.Mesh(surX(K.anneau(rE, rI, x1 - x0, seg || 36), (x0 + x1) / 2, y, z), mat);
    const hexX = (r, x0, x1, mat) => new T.Mesh(surX(new T.CylinderGeometry(r, r, x1 - x0, 6), (x0 + x1) / 2), mat);
    const surZ = (g, z, x, y) => { g.rotateX(Math.PI / 2); g.translate(x || 0, y || 0, z); return g; };
    const cylZ = (r, z0, z1, mat, x, y, seg) => new T.Mesh(surZ(K.cylindre(r, z1 - z0, seg || 24), (z0 + z1) / 2, x, y), mat);
    const cylY = (r, y0, y1, mat, seg) => K.mesh(K.cylindre(r, y1 - y0, seg || 20), mat, 0, (y0 + y1) / 2, 0);

    /* ================================================================ LE DÉCOR */
    const mur = K.mesh(K.boite(1300, 760, 20, 2), platre, -70, -20, -10);
    const sol = K.mesh(K.boite(1300, 40, 520, 3), dalleMat, -70, YSOL - 20, 240);
    racine.add(mur, sol);

    /* ================================================================ LES PANNEAUX
       Une tôle emboutie de canaux verticaux (pas de 33 mm) soudée à une tôle plane ; un collecteur
       horizontal en haut et en bas. Le panneau avant a ses canaux vers l'avant, l'arrière vers le mur. */
    const gCan = K.boite(CW, 530, PZ, 6), gBarre = K.boite(W, 38, PZ, 6), gPlane = K.boite(W, 600, 1.2, 0.4);
    const panneau = (zc, vers) => {
      const g = new T.Group();
      g.add(K.mesh(gBarre, emaille, 0, YB, zc), K.mesh(gBarre, emaille, 0, -YB, zc));
      for (let k = 0; k < NC; k++) g.add(K.mesh(gCan, emaille, -W / 2 + (k + 0.5) * PITCH, 0, zc));
      g.add(K.mesh(gPlane, emaille, 0, 0, zc - vers * (PZ / 2 - 0.6)));
      return g;
    };
    const panneauAV = panneau(ZF, 1), panneauAR = panneau(ZR, -1);
    racine.add(panneauAR, panneauAV);

    /* le convecteur : une tôle pliée en accordéon entre les deux panneaux */
    const ailettes = (() => {
      const pas = 12, haut = [], bas = [], n = Math.floor((W - 20) / pas) * 2;
      for (let i = 0; i <= n; i++) { const x = -W / 2 + 10 + i * pas / 2, z = i % 2 ? 73 : 40; haut.push(new T.Vector2(x + 0.4, -z)); bas.push(new T.Vector2(x - 0.4, -z)); }
      const sh = new T.Shape(haut); bas.reverse().forEach(p => sh.lineTo(p.x, p.y));
      const g = new T.ExtrudeGeometry(sh, { depth: 520, bevelEnabled: false, curveSegments: 1 });
      g.rotateX(-Math.PI / 2); g.translate(0, -260, 0);
      return K.mesh(g, C(M.aluminium, 0xdcdfe2), 0, 0, 0);
    })();
    racine.add(ailettes);

    /* la grille du dessus et les deux flancs */
    const grille = new T.Group();
    grille.add(K.mesh(K.boite(W, 5, 64, 1.5), emaille, 0, 302.5, 56.5));
    for (let x = -380; x <= 380; x += 12) grille.add(K.mesh(new T.BoxGeometry(5, 0.6, 46), sombre, x, 305.1, 56.5));
    const flancG = K.mesh(K.boite(3, 606, 64, 1), emaille, -401.5, 0, 56.5), flancD = K.mesh(K.boite(3, 606, 64, 1), emaille, 401.5, 0, 56.5);
    racine.add(grille, flancG, flancD);

    /* les fixations : deux consoles en haut, deux en bas, vissées au mur */
    const consoles = new T.Group();
    [-250, 250].forEach(x => [250, -250].forEach(y => {
      consoles.add(K.mesh(K.boite(30, 60, 3, 1), peint, x, y, 1.5));
      consoles.add(K.mesh(K.boite(20, 26, 22, 1.5), peint, x, y, 14));
      const v = K.vis(3.4); v.rotation.x = Math.PI / 2; v.position.set(x, y + 20, 3); consoles.add(v);
    }));
    racine.add(consoles);

    /* ================================================================ LES TUBES, LE ROBINET, LE COUDE, LE PURGEUR */
    const tubes = new T.Group();
    [YB, -YB].forEach(y => {
      tubes.add(cylZ(7, 0, ZF - 6, cuivre, XV, y));
      tubes.add(cylZ(17, 0, 4, emaille, XV, y));                        /* la rosace au mur */
    });
    racine.add(tubes);

    /* le robinet thermostatique : un corps équerre (arrivée par l'arrière, sortie vers le radiateur),
       un siège, un clapet porté par une tige que pousse le soufflet de la tête */
    const robinet = new T.Group(); robinet.position.set(0, YB, ZF);
    robinet.add(ringX(12, 9, -470, -434, chrome));
    robinet.add(hexX(15, -482, -470, chrome));
    robinet.add(ringX(7.5, 5.5, -434, -395, chrome));
    robinet.add(ringX(9, 3.5, -440, -436, laiton));
    const plugG = new T.Group();
    const conePlug = new T.Mesh(surX(new T.CylinderGeometry(5.2, 1.4, 8, 20), -451), laiton);   /* la pointe vers +X */
    plugG.add(conePlug, cylX(1.8, -496, -455, chrome));
    robinet.add(plugG);
    const eauChambre = cylX(8.6, -468, -440, new T.MeshStandardMaterial({ color: 0xee9d86, transparent: true, opacity: 0.5, depthWrite: false, side: T.DoubleSide }));
    eauChambre.userData.voile = true; eauChambre.userData.sansOmbre = true; eauChambre.visible = false; robinet.add(eauChambre);
    /* l'arrivée par le mur est un tube plein : la coupe ne l'ouvre pas */
    racine.add(robinet);

    /* la tête : coque, soufflet (cuivre) qui se dilate avec la chaleur, cadran gradué */
    const tete = new T.Group(); tete.position.set(0, YB, ZF);
    tete.add(ringX(20.5, 18.5, -560, -484, blancTete), cylX(20.5, -561.5, -560, blancTete));
    const profil = [new T.Vector2(0, 0)];
    for (let i = 0; i < 10; i++) { const r = i % 2 ? 10 : 14.5; profil.push(new T.Vector2(r, i * 3.2), new T.Vector2(r, i * 3.2 + 3.2)); }
    profil.push(new T.Vector2(10, 32), new T.Vector2(0, 32));
    const soufflet = new T.Mesh(new T.LatheGeometry(profil, 28), cuivre); soufflet.geometry.rotateZ(-Math.PI / 2);
    const souffletG = new T.Group(); souffletG.position.x = -526; souffletG.add(soufflet);
    tete.add(souffletG);
    [[-50, '1'], [-25, '2'], [0, '3'], [25, '4'], [50, '5']].forEach(([a, t]) => {
      const m = grav(t, 6, { couleur: '#1b3a63' }); const r = 20.8, ar = a * D;
      m.position.set(-548, r * Math.sin(ar), r * Math.cos(ar)); m.rotation.x = -ar; tete.add(m);
    });
    racine.add(tete);

    /* le coude de réglage (en bas) : réglé une fois pour toutes avec une clé, il équilibre le radiateur */
    const reglage = new T.Group(); reglage.position.set(0, -YB, ZF);
    reglage.add(ringX(12, 9, -470, -434, chrome));
    reglage.add(hexX(15, -482, -470, chrome));
    reglage.add(cylX(14, -500, -482, chrome));
    reglage.add(K.mesh(new T.BoxGeometry(2, 9, 9), sombre, -500.5, 0, 0));
    reglage.add(ringX(7.5, 5.5, -434, -395, chrome));
    reglage.add(ringX(9, 3.5, -440, -436, laiton));
    racine.add(reglage);

    /* le purgeur (en haut à droite) et le bouchon (en bas à droite) */
    const purgeur = new T.Group(); purgeur.position.set(0, YB, ZF);
    purgeur.add(ringX(7.5, 5.5, 395, 410, chrome), hexX(11, 400, 424, chrome));
    const vis = cylY(3.4, 11, 20, laiton); vis.position.x = 414; purgeur.add(vis);
    const tetePurge = cylY(5, 20, 24, chrome); tetePurge.position.x = 414; purgeur.add(tetePurge);
    const bouchon = new T.Group(); bouchon.position.set(0, -YB, ZF);
    bouchon.add(ringX(7.5, 5.5, 395, 410, chrome), hexX(11, 400, 414, emaille));
    racine.add(purgeur, bouchon);

    /* ================================================================ LES FACES DE COUPE (plan z = 81) */
    const hachures = (fond, trait, pas) => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = fond; x.fillRect(0, 0, 64, 64);
      x.strokeStyle = trait; x.lineWidth = 5;
      for (let i = -64; i <= 64; i += 32) { x.beginPath(); x.moveTo(i, 64); x.lineTo(i + 64, 0); x.stroke(); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / pas, 1 / pas);
      return new T.MeshStandardMaterial({ map: t, roughness: 0.75, metalness: 0.05, side: T.DoubleSide });
    };
    const Hh = {
      acier: hachures('#b9bec4', '#6b727a', 6),
      chrome: hachures('#c9ced3', '#7a838c', 5),
      laiton: hachures('#b08f45', '#6a511c', 4),
      plastique: hachures('#ece9e2', '#9d988c', 5),
      cuivre: hachures('#c9743f', '#6e3a18', 3),
      fer: new T.MeshStandardMaterial({ color: 0x36424f, roughness: 0.4, metalness: 0.3, side: T.DoubleSide })
    };
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const faceDe = (polys, mat, dz, groupe) => {
      const m = new T.Mesh(new T.ShapeGeometry(polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1]))))), mat);
      m.position.z = dz; m.userData.sansOmbre = true; m.castShadow = false; groupe.add(m); return m;
    };
    const R = (x0, x1, y0, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    const parent = y => { const g = new T.Group(); g.position.set(0, y, ZF); faces.add(g); return g; };
    const facesPan = parent(0), facesRobinet = parent(YB), facesTete = parent(YB), facesReglage = parent(-YB), facesPurge = parent(YB);
    /* l'eau colorée vit à part : la surbrillance d'une pièce ne la teinte pas */
    const ePan = parent(0), eRobinet = parent(YB), eReglage = parent(-YB), ePurge = parent(YB);

    const eauHaut = new T.MeshBasicMaterial({ color: 0xd9472b, side: T.DoubleSide }), eauBas = new T.MeshBasicMaterial({ color: 0x2f7fd6, side: T.DoubleSide });
    const eauCan = new T.MeshBasicMaterial({ vertexColors: true, side: T.DoubleSide });
    const eauAval = new T.MeshBasicMaterial({ color: 0xd9472b, side: T.DoubleSide }), eauChaude = new T.MeshBasicMaterial({ color: 0xd9472b, side: T.DoubleSide });
    const eauRetourMat = new T.MeshBasicMaterial({ color: 0x2f7fd6, side: T.DoubleSide });
    /* le panneau : la tôle (hachures) et, par-dessus, l'eau dans les collecteurs et les canaux */
    faceDe([R(-400, 400, -300, 300)], Hh.acier, 0.02, facesPan);
    faceDe([R(-398.8, 398.8, 264, 298.8)], eauHaut, 0.6, ePan);
    faceDe([R(-398.8, 398.8, -298.8, -264)], eauBas, 0.6, ePan);
    const gEau = new T.PlaneGeometry(CW - 2.5, 530, 1, 24);
    const colCan = new T.BufferAttribute(new Float32Array(gEau.attributes.position.count * 3), 3); gEau.setAttribute('color', colCan);
    for (let k = 0; k < NC; k++) { const m = new T.Mesh(gEau, eauCan); m.position.set(-W / 2 + (k + 0.5) * PITCH, 0, 0.6); m.userData.sansOmbre = true; m.castShadow = false; ePan.add(m); }
    /* le robinet */
    faceDe([R(-470, -434, 9, 12), R(-470, -434, -12, -9), R(-482, -470, 2.5, 15), R(-482, -470, -15, -2.5), R(-434, -395, 5.5, 7.5), R(-434, -395, -7.5, -5.5)], Hh.chrome, 0.3, facesRobinet);
    faceDe([R(-440, -436, 3.5, 9), R(-440, -436, -9, -3.5)], Hh.laiton, 0.35, facesRobinet);
    faceDe([[[-468, -9], [-440, -9], [-440, -3.5], [-436, -3.5], [-436, 3.5], [-440, 3.5], [-440, 9], [-468, 9]]], eauChaude, 0.1, eRobinet);
    faceDe([[[-436, -5.5], [-396, -5.5], [-396, 5.5], [-436, 5.5]]], eauAval, 0.1, eRobinet);
    const facesPlug = new T.Group(); facesRobinet.add(facesPlug);
    faceDe([[[-447, -1.4], [-447, 1.4], [-455, 5.2], [-455, -5.2]], R(-496, -455, -1.8, 1.8)], Hh.fer, 0.6, facesPlug);
    /* la tête et son soufflet */
    faceDe([R(-560, -484, 18.5, 20.5), R(-560, -484, -20.5, -18.5), R(-561.5, -560, -20.5, 20.5)], Hh.plastique, 0.3, facesTete);
    const facesSouf = new T.Group(); facesSouf.position.x = -526; facesTete.add(facesSouf);
    {
      const hautP = [], basP = [];
      for (let i = 0; i <= 10; i++) { const r = i % 2 ? 10 : 14.5; hautP.push([i * 3.2, r]); basP.push([i * 3.2, -r]); }
      faceDe([[...hautP, ...basP.reverse()]], Hh.cuivre, 0.6, facesSouf);
    }
    /* le coude de réglage et le purgeur */
    faceDe([R(-470, -434, 9, 12), R(-470, -434, -12, -9), R(-482, -470, 2.5, 15), R(-482, -470, -15, -2.5), R(-500, -482, 4, 14), R(-500, -482, -14, -4), R(-434, -395, 5.5, 7.5), R(-434, -395, -7.5, -5.5)], Hh.chrome, 0.3, facesReglage);
    faceDe([[[-468, -9], [-440, -9], [-440, -3.5], [-436, -3.5], [-436, 3.5], [-440, 3.5], [-440, 9], [-468, 9]]], eauRetourMat, 0.1, eReglage);
    faceDe([[[-436, -5.5], [-396, -5.5], [-396, 5.5], [-436, 5.5]]], eauRetourMat, 0.1, eReglage);
    faceDe([R(395, 410, 5.5, 7.5), R(395, 410, -7.5, -5.5), R(410, 424, 3, 11), R(410, 424, -11, -3), R(400, 410, 7.5, 11), R(400, 410, -11, -7.5)], Hh.chrome, 0.3, facesPurge);
    faceDe([R(395, 410, -5.5, 5.5)], eauAval, 0.1, ePurge);
    faceDe([R(411, 417, 11, 20), R(409, 419, 20, 24)], Hh.laiton, 0.35, facesPurge);

    /* ================================================================ L'EAU : grains dans les canaux (en coupe) */
    const grains = [];
    for (let k = 0; k < NC; k++) {
      const x = -W / 2 + (k + 0.5) * PITCH;
      const g = K.courant(new T.LineCurve3(V(x, 262, ZF + 0.3), V(x, -262, ZF + 0.3)), { pas: 17, rayon: 2.1, couleur: 0xfff3e0, vitesse: 40 });
      g.objet.visible = false; racine.add(g.objet); grains.push(g);
    }

    /* ================================================================ L'ÉTAT */
    const E = { T: 18, part: 35, coupe: false, demonte: false };
    const ou = K.mobile(1, 150, 19);
    const cible = () => clamp((CONSIGNE_HAUT - E.T) / (CONSIGNE_HAUT - CONSIGNE_BAS), 0, 1);
    const qNow = () => E.part / 100 * ou.x;      /* m³/h : le débit principal vaut 1,00 m³/h */
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
    const cChaud = new T.Color(0xd9472b), cFroid = new T.Color(0x2f7fd6), cMort = new T.Color(0xa9b9cb), cTmp = new T.Color();
    const teinte = (u, q) => {
      const h = clamp(q / 0.04, 0, 1), lc = 0.3 + 0.7 * clamp(q / 0.6, 0, 1), s = clamp(u / lc, 0, 1);
      return cTmp.copy(cChaud).lerp(cFroid, s * s * (3 - 2 * s)).lerp(cMort, 1 - h);
    };
    const colorier = q => {
      const a = colCan.array;
      for (let r = 0; r <= 24; r++) { const c = teinte(r / 24, q); for (let ix = 0; ix < 2; ix++) { const n = (r * 2 + ix) * 3; a[n] = c.r; a[n + 1] = c.g; a[n + 2] = c.b; } }
      colCan.needsUpdate = true;
      eauHaut.color.copy(teinte(0, q)); eauBas.color.copy(teinte(1, q));
      eauAval.color.copy(q > 0.02 ? cChaud : cMort);
      K.chaleur(emaille, 0.32 * clamp(q / 0.6, 0, 1.2));
    };
    const poser = () => {
      const f = 1 - ou.x;
      plugG.position.x = 8 * f; facesPlug.position.x = 8 * f;
      souffletG.scale.x = 1 + f * 8 / 32; facesSouf.scale.x = souffletG.scale.x;
    };
    const visibles = () => {
      const on = E.coupe && !E.demonte && qNow() > 0.02;
      grains.forEach(g => { g.objet.visible = on; });
    };
    const reglerGrains = () => { const q = qNow(); grains.forEach(g => g.regler({ debit: q > 0.02 ? 1 : 0, vitesse: 40 + 190 * q })); visibles(); };
    const majTexte = () => {
      const o = ou.cible, q = E.part / 100 * o, pct = Math.round(o * 100);
      ctx.mesures([
        { libelle: 'La pièce', valeur: nb(E.T, 1) + ' °C' },
        { libelle: 'Le robinet', valeur: pct > 0 ? 'ouvert à ' + pct + ' %' : 'fermé' },
        { libelle: 'Le débit dans le radiateur', valeur: nb(q, 2) + ' m³/h' }
      ]);
      if (o < 0.02) ctx.dire('<strong>Pièce à ' + nb(E.T, 1) + ' °C : le robinet est fermé.</strong> Le soufflet de la tête a poussé le clapet sur son siège. L’eau n’entre plus, le radiateur refroidit.');
      else if (o > 0.98) ctx.dire('<strong>Pièce à ' + nb(E.T, 1) + ' °C : le robinet est grand ouvert.</strong> L’eau chaude entre en haut, descend dans les canaux et ressort en bas : ' + nb(q, 2) + ' m³/h.');
      else ctx.dire('<strong>Pièce à ' + nb(E.T, 1) + ' °C : le robinet se referme.</strong> Le soufflet gonfle et pousse le clapet : il ne passe plus que ' + nb(q, 2) + ' m³/h.');
    };

    const basculerCoupe = on => {
      E.coupe = on;
      const plan = on ? [new T.Plane(new T.Vector3(0, 0, -1), ZF)] : null;
      const exclus = new Set();
      [faces, ...grains.map(g => g.objet)].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.needsUpdate = true; } });
      });
      faces.visible = on && !E.demonte; eauChambre.visible = on;
      visibles();
    };

    poser(); colorier(qNow()); reglerGrains(); majTexte();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'panneaux', nom: 'Les panneaux d’eau', objets: [panneauAV, panneauAR, facesPan], ancre: [200, 100, 88], desc: 'Deux panneaux en acier, creusés de canaux verticaux. L’eau chaude les remplit et chauffe l’acier ; l’acier chauffe l’air de la pièce.' },
      { id: 'ailettes', nom: 'Les ailettes (le convecteur)', objets: [ailettes], ancre: [250, -150, 56], desc: 'Une tôle pliée en accordéon entre les deux panneaux. Elle agrandit la surface chaude : l’air qui monte entre les ailettes se réchauffe plus vite.' },
      { id: 'robinet', nom: 'Le robinet thermostatique (départ)', objets: [robinet, facesRobinet], ancre: [-452, YB + 12, ZF], desc: 'Il arrive par le haut. Un clapet vient se poser sur un siège : posé, l’eau ne passe plus. C’est la tête qui le pousse.' },
      { id: 'tete', nom: 'La tête thermostatique', objets: [tete, facesTete], ancre: [-520, YB + 20, ZF], desc: 'Le soufflet qu’elle contient se dilate quand la pièce chauffe et pousse le clapet. Le cadran, de 1 à 5, choisit la température voulue.' },
      { id: 'reglage', nom: 'Le coude de réglage (retour)', objets: [reglage, facesReglage], ancre: [-452, -YB - 12, ZF], desc: 'Il se règle une fois, avec une clé, à l’installation : il freine l’eau pour équilibrer ce radiateur avec les autres.' },
      { id: 'purgeur', nom: 'Le purgeur et le bouchon', objets: [purgeur, facesPurge, bouchon], ancre: [414, YB + 20, ZF], desc: 'Le purgeur, en haut, laisse sortir l’air qui gêne la circulation de l’eau. Le bouchon ferme le raccord du bas.' },
      { id: 'grille', nom: 'La grille et les flancs', objets: [grille, flancG, flancD], ancre: [0, 306, 56], desc: 'Ils cachent le haut et les côtés du radiateur. L’air chaud sort par les fentes de la grille.' },
      { id: 'fixations', nom: 'Les fixations murales', objets: [consoles], ancre: [250, 250, 6], desc: 'Quatre consoles vissées au mur portent le radiateur.' },
      { id: 'tubes', nom: 'Les tubes d’arrivée et de retour', objets: [tubes], ancre: [XV, YB, 20], desc: 'Deux tubes en cuivre sortent du mur : celui du haut amène l’eau chaude, celui du bas la ramène au générateur.' }
    ];

    const commandes = [
      { id: 'piece', type: 'curseur', libelle: 'Température de la pièce', min: 16, max: 24, pas: 0.5, valeur: 18, format: v => nb(v, 1) + ' °C' },
      { id: 'part', type: 'curseur', libelle: 'Part dans l’émetteur', min: 20, max: 60, pas: 5, unite: '%', valeur: 35 }
    ];

    const etapes = [
      { titre: 'Le radiateur, tel qu’on le voit', piece: 'panneaux', voirDedans: false, eclate: false, actions: [['piece', 18], ['part', 35]],
        vue: { azimut: -22, elevation: 10, zoom: 1.45, cible: [-80, 0, 56] },
        texte: 'Un radiateur à panneaux en acier, accroché au mur. En haut à gauche, le robinet thermostatique ; en bas, le coude de réglage ; en haut à droite, le purgeur.' },
      { titre: 'Le robinet est ouvert : l’eau chaude entre', piece: 'robinet', voirDedans: true, eclate: false, actions: [['piece', 18], ['part', 35]],
        vue: { azimut: -3, elevation: 6, zoom: 5.2, cible: [-480, 281, 81] },
        texte: 'La pièce est froide : le clapet est loin de son siège. L’eau chaude, venue du mur, passe entre les deux et entre dans le panneau.' },
      { titre: 'Elle descend dans les canaux et se refroidit', voirDedans: true, eclate: false, actions: [['piece', 18], ['part', 35]],
        vue: { azimut: -4, elevation: 5, zoom: 1.7, cible: [-80, 0, 81] },
        texte: 'L’eau se répartit dans tous les canaux verticaux. Elle donne sa chaleur à l’acier : elle passe du rouge au bleu et sort en bas, par le coude de réglage.' },
      { titre: 'La pièce se réchauffe : le soufflet gonfle', piece: 'tete', voirDedans: true, eclate: false, actions: [['piece', 20], ['part', 35]],
        vue: { azimut: -3, elevation: 6, zoom: 5.2, cible: [-480, 281, 81] },
        texte: 'À 20 °C, le soufflet de la tête se dilate et pousse sur la tige. Le clapet avance vers son siège : le passage se rétrécit.' },
      { titre: 'Le clapet se pose : l’eau ne passe plus', piece: 'robinet', voirDedans: true, eclate: false, actions: [['piece', 22], ['part', 35]],
        vue: { azimut: -3, elevation: 6, zoom: 5.2, cible: [-480, 281, 81] },
        texte: 'À 22 °C, le soufflet a poussé le clapet sur son siège. L’eau chaude n’entre plus dans le radiateur.' },
      { titre: 'Sans eau chaude, le radiateur refroidit', voirDedans: true, eclate: false, actions: [['piece', 22], ['part', 35]],
        vue: { azimut: -4, elevation: 5, zoom: 1.7, cible: [-80, 0, 81] },
        texte: 'Plus d’eau chaude dans les canaux : ils passent au bleu pâle. La pièce cesse de chauffer. Quand elle refroidira, le soufflet se contractera et le robinet se rouvrira.' },
      { titre: 'Démonté : tête, grille, flancs, panneau avant', piece: 'ailettes', voirDedans: false, eclate: true, actions: [['piece', 18], ['part', 35]],
        texte: 'On dévisse la tête, on retire la grille, les flancs et le panneau avant : on découvre les ailettes, puis le panneau arrière, resté sur ses consoles.' }
    ];

    const eclate = [
      { objets: [tete], vers: [-80, 0, 0], debut: 0, fin: 0.35 },
      { objets: [grille], vers: [0, 100, 0], debut: 0.1, fin: 0.5 },
      { objets: [flancG, flancD], vers: [0, 0, 230], debut: 0.15, fin: 0.55 },
      { objets: [panneauAV], vers: [0, 0, 170], debut: 0.4, fin: 0.85 },
      { objets: [ailettes], vers: [0, 0, 70], debut: 0.6, fin: 1 }
    ];

    const cadre = [panneauAR, panneauAV, tete, purgeur];
    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: -42, elevation: 26, zoom: 0.95, cible: [-80, 0, 110] },
      vue: ctx.mode === 'decouvrir' ? { azimut: -26, elevation: 10, cadre, zoom: 1.5, cible: [-80, 0, 56], marge: 1.0 }
                                    : { azimut: -22, elevation: 10, cadre, zoom: 1.45, cible: [-80, 0, 56], marge: 1.0 },
      sansSol: true,
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: false,
      agir(id, v) {
        if (id === 'part') E.part = +v;
        else if (id === 'piece') E.T = +v;
        else return;
        ou.cible = cible();
        ctx.regler(id, +v);
        majTexte();
      },
      surEclate(on) {
        if (on && E.coupe && ctx.element && ctx.element.fantome) ctx.element.fantome(false);
        E.demonte = on; faces.visible = E.coupe && !on; visibles();
      },
      animer(dt) {
        const bouge = ou.pas(dt);
        poser();
        const q = qNow();
        if (bouge) colorier(q);
        reglerGrains();
        let vivant = false;
        grains.forEach(g => { if (g.objet.visible) { g.animer(dt); vivant = true; } });
        return bouge || vivant;
      }
    };
  }, { famille: 'distribution', titre: 'Le radiateur à panneaux et son robinet thermostatique', stations: ['monotube', 'bitube'] });
})();
