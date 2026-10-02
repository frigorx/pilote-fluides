/* AéroRézo 3D — famille « gaines » : deux modèles.
     gaines       un tronçon de réseau sous un faux plafond (stations « conduits » et « sections »)
     reseauPertes une branche de réseau avec ses prises de pression (stations « pertes-lineaires »
                  et « pertes-singulieres »)
   Unités : mm. Repère : X dans le sens de l'air, Y vers le haut, Z vers l'avant
   (+Z = le côté qu'on voit ; « Voir en coupe » retire la moitié avant, z > 0).
   Couleurs de l'air (communes à AéroRézo, toujours doublées d'un mot) : l'air des gaines de
   ce fichier est de l'air soufflé, bleu 0x2f7fd6. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  const AIR_SOUFFLE = 0x2f7fd6;
  const D2R = Math.PI / 180;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
  const air = (cle, mot) => '<b class="air air-' + cle + '">' + mot + '</b>';

  /* ================================================================ LES AIDES COMMUNES
     Recopiées de cta.js : matières double face, faces de coupe hachurées, grains qui
     suivent un chemin dont chaque tronçon a sa vitesse. */
  const aides = (T, K) => {
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; return c; };
    const boite = (x0, x1, y0, y1, z0, z1, mat, r) => {
      const g = r ? K.boite(x1 - x0, y1 - y0, z1 - z0, r) : new T.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
      return K.mesh(g, mat, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    };
    /* un cylindre d'axe X, Y ou Z, entre a0 et a1 ; ouvert = sans bouchons (un conduit) */
    const cyl = (axe, r, a0, a1, c1, c2, mat, seg, ouvert) => {
      const g = new T.CylinderGeometry(r, r, a1 - a0, seg || 24, 1, !!ouvert);
      if (axe === 'x') g.rotateZ(Math.PI / 2); else if (axe === 'z') g.rotateX(Math.PI / 2);
      const m = new T.Mesh(g, mat), c = (a0 + a1) / 2;
      if (axe === 'x') m.position.set(c, c1, c2); else if (axe === 'y') m.position.set(c1, c, c2); else m.position.set(c1, c2, c);
      return m;
    };
    const hachures = (fond, trait, pas, ep) => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = fond; x.fillRect(0, 0, 64, 64);
      x.strokeStyle = trait; x.lineWidth = ep || 5;
      for (let i = -64; i <= 64; i += 32) { x.beginPath(); x.moveTo(i, 64); x.lineTo(i + 64, 0); x.stroke(); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / pas, 1 / pas);
      return new T.MeshStandardMaterial({ map: t, roughness: 0.8, side: T.DoubleSide });
    };
    const rect = (x0, x1, y0, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    /* une face de coupe : polygones dans le plan z = 0 (posés à 0,5 mm devant) */
    const faceDe = (polys, mat, groupe) => {
      const g = new T.ShapeGeometry(polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1])))));
      const m = new T.Mesh(g, mat); m.position.z = 0.5; m.userData.sansOmbre = true; m.castShadow = false;
      groupe.add(m); return m;
    };
    /* vider un groupe en libérant les géométries (les matières, partagées, restent) */
    const vider = g => {
      for (let i = g.children.length - 1; i >= 0; i--) {
        const o = g.children[i]; g.remove(o);
        o.traverse(m => { if (m.geometry) m.geometry.dispose(); });
      }
    };
    /* des grains qui suivent un chemin dont chaque tronçon a sa vitesse. Le temps de passage
       d'un tronçon est longueur / vitesse : des grains lâchés à intervalles de temps égaux
       s'écartent donc là où l'air va vite et se serrent là où il va lentement — comme un
       traceur dans un vrai conduit. */
    const faireCourant = (couleur, rayon, N, dephasage) => {
      const geo = new T.SphereGeometry(rayon, 8, 6);
      const im = new T.InstancedMesh(geo, K.lumineux(couleur), N);
      im.userData.sansOmbre = true; im.castShadow = false; im.frustumCulled = false;
      const m4 = new T.Matrix4(), q = new T.Quaternion(), sc = new T.Vector3(1, 1, 1), p = new T.Vector3();
      let segs = [], total = 1, tau = dephasage || 0;
      const poser = () => {
        if (!segs.length) return;
        for (let i = 0; i < N; i++) {
          const th = (i / N * total + tau) % total;
          let j = 0; while (j < segs.length - 1 && segs[j].fin < th) j++;
          const s = segs[j], f = s.dur > 0 ? (th - s.debut) / s.dur : 0;
          p.lerpVectors(s.a, s.b, clamp(f, 0, 1));
          m4.compose(p, q, sc); im.setMatrixAt(i, m4);
        }
        im.instanceMatrix.needsUpdate = true;
      };
      return {
        objet: im,
        /* pts : [{ p: Vector3, v: vitesse à l'écran en mm/s }] */
        chemin(pts) {
          segs = []; let cumul = 0;
          for (let k = 0; k + 1 < pts.length; k++) {
            const a = pts[k].p, b = pts[k + 1].p, len = a.distanceTo(b);
            const v = Math.max(6, (pts[k].v + pts[k + 1].v) / 2), dur = len / v;
            segs.push({ a, b, debut: cumul, fin: cumul + dur, dur }); cumul += dur;
          }
          total = Math.max(0.001, cumul); tau %= total; poser();
        },
        avancer(dt) { tau = (tau + dt) % total; poser(); }
      };
    };
    return { V, C, boite, cyl, hachures, rect, faceDe, vider, faireCourant };
  };

  /* ================================================================ 1. GAINES
     Un tronçon de réseau de soufflage, au-dessus d'un faux plafond.
     De gauche à droite : un conduit rectangulaire isolé qui sort du mur, un conduit
     rectangulaire nu avec sa trappe de visite, le raccord rectangulaire / circulaire, un conduit
     circulaire spiralé avec son piquage (gaine souple vers une bouche), la réduction, puis le coude
     qui descend à la bouche.

     CE QUE L'ÉLÈVE DOIT VOIR : à même débit, une section plus petite fait aller l'air plus vite
     (les grains s'écartent et filent dans le rond) ; un rectangulaire plat passe là où le rond
     ne passe pas (hauteur libre de 350 mm) ; la section coupée : S = débit / vitesse.

     « Voir en coupe » retire la moitié avant : on voit l'intérieur des conduits (tôle noircie,
     isolant hachuré), la dalle du plafond et le plancher haut coupés. */
  Electro3D.definir('gaines', (T, K, ctx) => {
    const { V, C, boite, cyl, hachures, rect, faceDe, vider, faireCourant } = aides(T, K);
    const M = K.mat;
    const racine = new T.Group();

    /* ---------------------------------------------------------------- les cotes */
    const YC = 195;                         /* l'axe des conduits : au milieu du plénum */
    const H_DALLE = 20, H_HAUT = 370;       /* dessus du faux plafond, dessous du plancher haut */
    const LIBRE = H_HAUT - H_DALLE;         /* 350 mm de hauteur libre (la narration de la station dit « rarement trente centimètres ») */
    const SUSPENTE = 40;                    /* la place qu'il faut laisser aux suspentes */
    const RW = 300, RH = 125;               /* le rectangulaire 600 × 250 : demi-largeur (z), demi-hauteur (y) */
    const ZE = 4;                           /* tôle : 0,8 mm en vrai, 4 mm ici pour qu'on la voie en coupe */
    const ISO = 40;                         /* laine minérale */
    const XM0 = -800, XM1 = -600;           /* le mur */
    const XT0 = -760, XB = 300, XR1 = 900;  /* le rectangulaire : tronçon 1 jusqu'à XB, tronçon 2 jusqu'à XR1 */
    const XRAC1 = 1200, XROND1 = 3000, XRED1 = 3300;
    const XP = 1650, XMANCH = 2400, XE = 3900;   /* piquage, manchon, axe de la bouche de bout */
    const XFIN = 4200;
    const Z = 15;                           /* les grains courent un peu devant le plan de coupe */
    const XBOX = 2100, ZBOX = -600;         /* le caisson de la bouche reliée par la gaine souple */

    /* ---------------------------------------------------------------- matières */
    const beton = C(K.plastique(0xa9a396, 0.92));
    const platre = C(K.plastique(0xece9e0, 0.9));
    const galva = C(M.zingue, 0xbfc5c9);
    const galvaClair = C(M.zingue, 0xcdd2d5);
    const alu = C(M.aluminium, 0xc9ced3);
    const foil = C(M.aluminium, 0xd6dade); foil.roughness = 0.3;
    const laine = C(K.plastique(0xe2c75a, 0.95));
    const noir = C(M.plastiqueNoir);
    const caoutchouc = C(M.caoutchouc, 0x2a2d31);
    const blanc = C(K.plastique(0xf1efe8, 0.5));
    const marine = C(K.plastique(0x1b3a63, 0.5));
    const vis = C(M.acier, 0xaeb4b9);
    const flexMat = C(M.aluminium, 0xbfc4c9); flexMat.roughness = 0.42;
    const galvaCroix = (() => {
      const c = document.createElement('canvas'); c.width = c.height = 256;
      const x = c.getContext('2d'); x.fillStyle = '#c5cacd'; x.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 900; i++) { const g = 170 + Math.random() * 60 | 0; x.fillStyle = 'rgba(' + g + ',' + (g + 4) + ',' + (g + 8) + ',.5)'; x.fillRect(Math.random() * 256, Math.random() * 256, 3, 3); }
      x.strokeStyle = '#8d949a'; x.lineWidth = 3;
      x.beginPath(); x.moveTo(6, 6); x.lineTo(250, 250); x.moveTo(250, 6); x.lineTo(6, 250); x.stroke();
      const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4;
      return C(new T.MeshStandardMaterial({ map: t, roughness: 0.42, metalness: 0.85 }));
    })();
    const tuyauMat = C(M.zingue, 0xc6cbce);

    /* ================================================================ LE PLÉNUM : DALLE, FAUX PLAFOND, MUR */
    const plenum = new T.Group();
    const dalleHaute = boite(XM0, XFIN, H_HAUT, H_HAUT + 160, -900, 900, beton);
    const murG = new T.Group();
    /* le mur : une ouverture pour le conduit (680 × 330) */
    murG.add(boite(XM0, XM1, H_DALLE, YC - 165, -900, 900, beton), boite(XM0, XM1, YC + 165, H_HAUT, -900, 900, beton));
    murG.add(boite(XM0, XM1, YC - 165, YC + 165, -900, -340, beton), boite(XM0, XM1, YC - 165, YC + 165, 340, 900, beton));
    plenum.add(dalleHaute, murG);
    /* le faux plafond : des dalles de 600 sur une ossature en T (les deux dalles des bouches sont à part) */
    const dalles = new T.Group();
    const speciales = new Set(['4,-1', '7,0']);
    for (let i = 0; i < 8; i++) for (let j = -1; j <= 1; j++) {
      if (speciales.has(i + ',' + j)) continue;
      dalles.add(boite(-600 + i * 600 + 2, -600 + (i + 1) * 600 - 2, 0, H_DALLE, j * 600 - 298, j * 600 + 298, platre));
    }
    plenum.add(dalles);
    const ossature = new T.Group();
    for (let i = 0; i <= 8; i++) {
      ossature.add(boite(-600 + i * 600 - 12, -600 + i * 600 + 12, H_DALLE, H_DALLE + 3, -900, 900, alu));
      ossature.add(boite(-600 + i * 600 - 2, -600 + i * 600 + 2, H_DALLE + 3, H_DALLE + 33, -900, 900, alu));
    }
    for (const z of [-900, -300, 300, 900]) {
      ossature.add(boite(-600, XFIN, H_DALLE, H_DALLE + 3, z - 12, z + 12, alu));
      ossature.add(boite(-600, XFIN, H_DALLE + 3, H_DALLE + 33, z - 2, z + 2, alu));
    }
    plenum.add(ossature);
    racine.add(plenum);

    /* ================================================================ LE RECTANGULAIRE
       Tôle galvanisée 600 × 250 : une croix de pliures sur les grandes faces, des cadres de
       bride aux jonctions (cornières boulonnées avec un joint entre elles). */
    const gRect1 = new T.Group(), gRect2 = new T.Group(), gRect = new T.Group();
    const troncon = (g, x0, x1) => {
      g.add(boite(x0, x1, YC + RH, YC + RH + ZE, -RW - ZE, RW + ZE, galvaCroix));
      g.add(boite(x0, x1, YC - RH - ZE, YC - RH, -RW - ZE, RW + ZE, galvaCroix));
      g.add(boite(x0, x1, YC - RH, YC + RH, RW, RW + ZE, galva), boite(x0, x1, YC - RH, YC + RH, -RW - ZE, -RW, galva));
    };
    troncon(gRect1, XT0, XB); troncon(gRect2, XB, XR1);
    const geoBoulon = new T.CylinderGeometry(5, 5, 14, 10); geoBoulon.rotateZ(Math.PI / 2);
    const bride = (g, x) => {
      const e = 4, l = 30;
      g.add(boite(x - e, x + e, YC + RH, YC + RH + l, -RW - l, RW + l, galvaClair), boite(x - e, x + e, YC - RH - l, YC - RH, -RW - l, RW + l, galvaClair));
      g.add(boite(x - e, x + e, YC - RH - l, YC + RH + l, RW, RW + l, galvaClair), boite(x - e, x + e, YC - RH - l, YC + RH + l, -RW - l, -RW, galvaClair));
      /* les boulons, en haut, en bas et sur les côtés */
      const b = (y, z) => { const m = new T.Mesh(geoBoulon, vis); m.position.set(x, y, z); g.add(m); };
      for (let z = -250; z <= 250; z += 100) { b(YC + RH + l / 2, z); b(YC - RH - l / 2, z); }
      for (const y of [YC - 70, YC, YC + 70]) { b(y, RW + l / 2); b(y, -RW - l / 2); }
    };
    bride(gRect1, XB); bride(gRect2, XR1);
    /* le joint noir entre les deux brides de la jonction du milieu */
    {
      const j = 0.6, l = 30;   /* le joint : un cadre, comme les brides */
      gRect1.add(boite(XB - j, XB + j, YC + RH, YC + RH + l, -RW - l, RW + l, caoutchouc), boite(XB - j, XB + j, YC - RH - l, YC - RH, -RW - l, RW + l, caoutchouc));
      gRect1.add(boite(XB - j, XB + j, YC - RH, YC + RH, RW, RW + l, caoutchouc), boite(XB - j, XB + j, YC - RH, YC + RH, -RW - l, -RW, caoutchouc));
    }
    gRect.add(gRect1, gRect2);
    racine.add(gRect);
    /* la flèche de sens de l'air, collée sur le conduit (un marquage réel) */
    const fl = new T.Shape();
    [[-130, -20], [50, -20], [50, -48], [130, 0], [50, 48], [50, 20], [-130, 20]].forEach((p, i) => i ? fl.lineTo(p[0], p[1]) : fl.moveTo(p[0], p[1]));
    const fleche = K.mesh(new T.ShapeGeometry(fl), marine, -150, YC, RW + ZE + ISO + 2);

    /* ---------------------------------------------------------------- l'isolant : laine + pare-vapeur */
    const gIso = new T.Group();
    {
      const x0 = -600, x1 = XB - 20, a = RH + ZE, b = RW + ZE;
      gIso.add(boite(x0, x1, YC + a, YC + a + ISO, -b - ISO, b + ISO, laine), boite(x0, x1, YC - a - ISO, YC - a, -b - ISO, b + ISO, laine));
      gIso.add(boite(x0, x1, YC - a, YC + a, b, b + ISO, laine), boite(x0, x1, YC - a, YC + a, -b - ISO, -b, laine));
      const f = 1.5;
      gIso.add(boite(x0, x1, YC + a + ISO, YC + a + ISO + f, -b - ISO - f, b + ISO + f, foil), boite(x0, x1, YC - a - ISO - f, YC - a - ISO, -b - ISO - f, b + ISO + f, foil));
      gIso.add(boite(x0, x1, YC - a - ISO, YC + a + ISO, b + ISO, b + ISO + f, foil), boite(x0, x1, YC - a - ISO, YC + a + ISO, -b - ISO - f, -b - ISO, foil));
      /* le ruban d'aluminium qui ferme le joint de l'isolant, et la flèche */
      gIso.add(boite(x1 - 60, x1 - 10, YC - a - ISO - 2.5, YC + a + ISO + 2.5, -b - ISO - 2.5, b + ISO + 2.5, C(M.aluminium, 0xe2e5e8)));
      gIso.add(fleche);
    }
    racine.add(gIso);

    /* ---------------------------------------------------------------- la trappe de visite (sur le côté du conduit nu) */
    const trappe = new T.Group();
    trappe.add(boite(480, 720, YC - 95, YC + 95, RW + ZE, RW + ZE + 3, galvaClair));
    trappe.add(boite(490, 710, YC - 85, YC + 85, RW + ZE + 3, RW + ZE + 8, galva, 2));
    for (const [x, y] of [[500, YC - 70], [700, YC - 70], [500, YC + 70], [700, YC + 70]]) trappe.add(cyl('z', 6, RW + ZE + 8, RW + ZE + 16, x, y, vis, 12));
    trappe.add(boite(580, 620, YC - 8, YC + 8, RW + ZE + 8, RW + ZE + 24, noir, 3));
    racine.add(trappe);

    /* ---------------------------------------------------------------- suspentes du rectangulaire (fixes) */
    const suspFixes = new T.Group();
    const tige = (x, z, yBas) => suspFixes.add(cyl('y', 5, yBas, H_HAUT, x, z, vis, 8));
    const cornieres = (x, yBas, zb) => {
      for (const s of [-1, 1]) {
        suspFixes.add(boite(x - 25, x + 25, yBas - 6, yBas, s > 0 ? zb - 100 : -zb - 40, s > 0 ? zb + 40 : -zb + 100, galva));
        tige(x, s * zb, yBas);
      }
    };
    cornieres(-300, YC - RH - ZE - ISO - 1.5, RW + ZE + ISO + 22);
    cornieres(820, YC - RH - ZE, RW + ZE + 22);
    racine.add(suspFixes);

    /* ================================================================ LES PIÈCES QUI DÉPENDENT DU DIAMÈTRE
       Raccord, rond, piquage, réduction, coude : refaits à chaque coup de curseur (le diamètre
       change, tout le reste suit). Chaque pièce a un groupe qui dure, rempli à neuf. */
    const gRaccord = new T.Group(), gRond = new T.Group(), gRed = new T.Group(), gCoude = new T.Group();
    const gPiq = new T.Group(), gSusp = new T.Group(), gTranches = new T.Group();
    racine.add(gRaccord, gRond, gRed, gCoude, gPiq, gSusp, gTranches);

    /* les bouches : un caisson posé sur la dalle (relié par la gaine souple) et deux diffuseurs à cônes */
    const gBouches = new T.Group();
    const diffuseur = (cx, cz) => {
      const g = new T.Group();
      g.add(boite(cx - 298, cx + 298, 0, H_DALLE, cz - 298, cz + 298, platre));
      const cone = (r0, y0, r1, y1) => { const m = new T.Mesh(new T.LatheGeometry([new T.Vector2(r0, y0), new T.Vector2(r1, y1)], 40), blanc); m.position.set(cx, 0, cz); return m; };
      g.add(cone(210, 0, 105, -22), cone(160, 0, 80, -16), cone(110, 0, 60, -10));
      const centre = new T.Mesh(new T.CircleGeometry(58, 32), blanc); centre.rotation.x = Math.PI / 2; centre.position.set(cx, -22, cz); g.add(centre);
      return g;
    };
    const diff1 = diffuseur(XBOX, ZBOX), diff2 = diffuseur(XE, 0);
    const caisson = boite(XBOX - 200, XBOX + 200, H_DALLE, 180, ZBOX - 200, ZBOX + 200, galva, 3);
    gBouches.add(diff1, diff2, caisson);
    racine.add(gBouches);

    /* les faces de coupe (plan z = 0) */
    const H = {
      isolant: hachures('#efe2a8', '#9b8a45', 26, 4),
      beton: hachures('#b9b2a4', '#6d665a', 60, 6),
      platre: hachures('#ece8de', '#a8a193', 30, 3),
      tole: new T.MeshStandardMaterial({ color: 0x59636d, roughness: 0.5, side: T.DoubleSide }),
      foil: new T.MeshStandardMaterial({ color: 0xcfd4d8, roughness: 0.4, side: T.DoubleSide })
    };
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const fFixes = new T.Group(), fRaccord = new T.Group(), fRond = new T.Group(), fRed = new T.Group(), fCoude = new T.Group();
    faces.add(fFixes, fRaccord, fRond, fRed, fCoude);
    {
      const T_ = H.tole;
      faceDe([rect(XM0, XFIN, H_HAUT, H_HAUT + 160)], H.beton, fFixes);
      faceDe([rect(XM0, XM1, H_DALLE, YC - 165), rect(XM0, XM1, YC + 165, H_HAUT)], H.beton, fFixes);
      faceDe([rect(-600, XFIN, 0, H_DALLE)], H.platre, fFixes);
      /* le rectangulaire : tôle en haut et en bas, brides, isolant */
      faceDe([rect(XT0, XR1, YC + RH, YC + RH + ZE), rect(XT0, XR1, YC - RH - ZE, YC - RH)], T_, fFixes);
      for (const x of [XB, XR1]) faceDe([rect(x - 4, x + 4, YC + RH, YC + RH + 30), rect(x - 4, x + 4, YC - RH - 30, YC - RH)], T_, fFixes);
      faceDe([rect(-600, XB - 20, YC + RH + ZE, YC + RH + ZE + ISO), rect(-600, XB - 20, YC - RH - ZE - ISO, YC - RH - ZE)], H.isolant, fFixes);
      faceDe([rect(-600, XB - 20, YC + RH + ZE + ISO, YC + RH + ZE + ISO + 1.5), rect(-600, XB - 20, YC - RH - ZE - ISO - 1.5, YC - RH - ZE - ISO)], H.foil, fFixes);
    }

    /* ---------------------------------------------------------------- l'état */
    const E = { D: 315, V: 5, coupe: false, demonte: false };
    const P = {};                                         /* les cotes dérivées du diamètre */
    const ringRect = th => { const c = Math.cos(th), s = Math.sin(th); const k = Math.min(RW / Math.max(Math.abs(c), 1e-6), RH / Math.max(Math.abs(s), 1e-6)); return [s * k, c * k]; };
    const ringRond = r => th => [r * Math.sin(th), r * Math.cos(th)];
    /* une surface qui passe d'un anneau à l'autre (rectangle → cercle, cercle → cercle) */
    const loft = (x0, x1, ringA, ringB, mat, nR, nL) => {
      nR = nR || 48; nL = nL || 8;
      const pos = [], idx = [];
      for (let l = 0; l <= nL; l++) {
        const u = l / nL;
        for (let k = 0; k <= nR; k++) {
          const th = k / nR * 2 * Math.PI, a = ringA(th), b = ringB(th);
          pos.push(x0 + (x1 - x0) * u, YC + a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u);
        }
      }
      for (let l = 0; l < nL; l++) for (let k = 0; k < nR; k++) {
        const a = l * (nR + 1) + k, b = a + 1, c = a + nR + 1, d = c + 1;
        idx.push(a, c, b, b, c, d);
      }
      const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
      return new T.Mesh(g, mat);
    };
    /* un conduit rond d'axe X, avec un trou rond (le départ du piquage) du côté z < 0 */
    const rondTroue = (r, x0, x1, rc, mat) => {
      const nT = 96, nX = 24, pos = [], idx = [];
      for (let l = 0; l <= nX; l++) for (let k = 0; k <= nT; k++) {
        const th = k / nT * 2 * Math.PI;
        pos.push(x0 + (x1 - x0) * l / nX, YC + r * Math.sin(th), r * Math.cos(th));
      }
      for (let l = 0; l < nX; l++) for (let k = 0; k < nT; k++) {
        const th = (k + 0.5) / nT * 2 * Math.PI, x = x0 + (x1 - x0) * (l + 0.5) / nX, y = r * Math.sin(th), z = r * Math.cos(th);
        if (z < 0 && (x - XP) * (x - XP) + y * y < rc * rc) continue;
        const a = l * (nT + 1) + k, b = a + 1, c = a + nT + 1, d = c + 1;
        idx.push(a, c, b, b, c, d);
      }
      const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
      return new T.Mesh(g, mat);
    };
    /* une gaine souple : un tube ondulé le long d'une courbe */
    const tubeOndule = (courbe, rayon, pas, mat) => {
      const L = courbe.getLength(), n = Math.max(30, Math.round(L / 3)), nr = 14;
      const fr = courbe.computeFrenetFrames(n, false), pos = [], idx = [];
      for (let i = 0; i <= n; i++) {
        const p = courbe.getPointAt(i / n), N = fr.normals[i], B = fr.binormals[i];
        const rr = rayon * (1 + 0.06 * Math.sin(2 * Math.PI * (i / n * L) / pas));
        for (let j = 0; j <= nr; j++) {
          const a = j / nr * 2 * Math.PI;
          pos.push(p.x + (N.x * Math.cos(a) + B.x * Math.sin(a)) * rr, p.y + (N.y * Math.cos(a) + B.y * Math.sin(a)) * rr, p.z + (N.z * Math.cos(a) + B.z * Math.sin(a)) * rr);
        }
      }
      for (let i = 0; i < n; i++) for (let j = 0; j < nr; j++) { const a = i * (nr + 1) + j, b = a + 1, c = a + nr + 1, d = c + 1; idx.push(a, c, b, b, c, d); }
      const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
      return new T.Mesh(g, mat);
    };
    const helice = (r, x0, x1, pas, mat) => {
      const pts = [], n = Math.max(8, Math.round((x1 - x0) / pas * 20));
      for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n, th = 2 * Math.PI * (x - XRAC1) / pas; pts.push(V(x, YC + (r + 1.6) * Math.sin(th), (r + 1.6) * Math.cos(th))); }
      return new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), n, 2.4, 5, false), mat);
    };
    const eteindre = g => g.traverse(m => { if (m.isMesh && m.userData.allumee && ctx.element && ctx.element._eteindre) { try { ctx.element._eteindre(m); } catch (e) {} } });
    const bande = (geo, x, y, groupe) => { const m = new T.Mesh(geo, H.tole); m.position.set(x, y, 0.5); m.userData.sansOmbre = true; m.castShadow = false; groupe.add(m); };
    const quad = (groupe, pts, mat) => faceDe([pts], mat || H.tole, groupe);

    const construire = () => {
      const D = E.D, r = D / 2;
      const dT = clamp(5 * Math.round(0.8 * D / 5), 80, 250), rT = dT / 2;
      const R = Math.min(170, dT), XA = XE - R;
      const cD = clamp(5 * Math.round(0.64 * D / 5), 40, 200), rc = cD / 2;
      Object.assign(P, { r, dT, rT, R, XA, cD, rc });
      [gRaccord, gRond, gRed, gCoude, gPiq, gSusp, gTranches].forEach(eteindre);
      [gRaccord, gRond, gRed, gCoude, gPiq, gSusp, gTranches, fRaccord, fRond, fRed, fCoude].forEach(vider);

      /* le raccord rectangulaire / circulaire */
      gRaccord.add(loft(XR1, XRAC1, ringRect, ringRond(r), galva));
      quad(fRaccord, [[XR1, YC + RH], [XRAC1, YC + r], [XRAC1, YC + r + ZE], [XR1, YC + RH + ZE]]);
      quad(fRaccord, [[XR1, YC - RH], [XRAC1, YC - r], [XRAC1, YC - r - ZE], [XR1, YC - RH - ZE]]);

      /* le conduit circulaire spiralé : trois longueurs autour du piquage, la couture en hélice,
         un manchon à joint à lèvre */
      const xa1 = XP - rc - 40, xa2 = XP + rc + 40;
      gRond.add(cyl('x', r, XRAC1, xa1, YC, 0, galva, 64, true));
      gRond.add(rondTroue(r, xa1, xa2, rc - 3, galva));
      gRond.add(cyl('x', r, xa2, XROND1, YC, 0, galva, 64, true));
      gRond.add(helice(r, XRAC1, xa1, 150, galvaClair), helice(r, xa2, XROND1, 150, galvaClair));
      gRond.add(cyl('x', r + ZE, XMANCH - 55, XMANCH + 55, YC, 0, galvaClair, 64, true));
      for (const dx of [-45, 45]) { const t = new T.Mesh(new T.TorusGeometry(r + ZE + 1, 2.5, 6, 64), caoutchouc); t.rotation.y = Math.PI / 2; t.position.set(XMANCH + dx, YC, 0); gRond.add(t); }
      faceDe([rect(XRAC1, XROND1, YC + r, YC + r + ZE), rect(XRAC1, XROND1, YC - r - ZE, YC - r)], H.tole, fRond);
      faceDe([rect(XMANCH - 55, XMANCH + 55, YC + r + ZE, YC + r + 2 * ZE), rect(XMANCH - 55, XMANCH + 55, YC - r - 2 * ZE, YC - r - ZE)], H.tole, fRond);

      /* les colliers de suspension du rond : un feuillard autour du conduit, une tige vers la dalle */
      for (const x of [1350, 2650]) {
        const t = new T.Mesh(new T.TorusGeometry(r + ZE + 2, 3.5, 8, 64), galva); t.rotation.y = Math.PI / 2; t.position.set(x, YC, 0); gSusp.add(t);
        gSusp.add(boite(x - 22, x + 22, YC + r + ZE + 2, YC + r + ZE + 12, -52, -8, galva));
        if (YC + r + ZE + 12 < H_HAUT) gSusp.add(cyl('y', 5, YC + r + ZE + 12, H_HAUT, x, -30, vis, 8));
      }

      /* la tranche d'air : la section, vue en coupe (un voile bleu, il s'allume sans cacher) */
      const voile = () => { const m = new T.MeshStandardMaterial({ color: AIR_SOUFFLE, roughness: 0.4, transparent: true, opacity: 0.55, depthWrite: false, side: T.DoubleSide }); return m; };
      if (!P.voileMat) { P.voileMat = voile(); }
      const dr = new T.Mesh(new T.PlaneGeometry(2 * RW - 10, 2 * RH - 10), P.voileMat); dr.rotation.y = Math.PI / 2; dr.position.set(-300, YC, 0);
      const dd = new T.Mesh(new T.CircleGeometry(r - 3, 64), P.voileMat); dd.rotation.y = Math.PI / 2; dd.position.set(2000, YC, 0);
      [dr, dd].forEach(m => { m.userData.voile = true; m.userData.sansOmbre = true; m.castShadow = false; gTranches.add(m); });
      /* le contour de la tranche : un trait bleu foncé, pour qu'on la lise même quand elle est de profil */
      const trait = P.traitMat || (P.traitMat = C(new T.MeshStandardMaterial({ color: 0x1f5fb0, roughness: 0.5 })));
      const anneau = new T.Mesh(new T.TorusGeometry(r - 3, 2.5, 6, 64), trait); anneau.rotation.y = Math.PI / 2; anneau.position.set(2000, YC, 0); gTranches.add(anneau);
      gTranches.add(boite(-302, -298, YC + RH - 7, YC + RH - 2, -RW + 5, RW - 5, trait), boite(-302, -298, YC - RH + 2, YC - RH + 7, -RW + 5, RW - 5, trait));
      gTranches.add(boite(-302, -298, YC - RH + 2, YC + RH - 2, RW - 7, RW - 2, trait), boite(-302, -298, YC - RH + 2, YC + RH - 2, -RW + 2, -RW + 7, trait));

      /* le piquage : une collerette dans le trou du rond, puis la gaine souple jusqu'au caisson */
      const yTrou = Math.sqrt(Math.max(1, r * r - rc * rc));
      gPiq.add(cyl('z', rc, -(r + 80), -yTrou + 3, XP, YC, galva, 36, true));
      const bague = new T.Mesh(new T.TorusGeometry(rc + 2, 3, 8, 40), galvaClair); bague.position.set(XP, YC, -(r + 78)); gPiq.add(bague);
      const z0 = -(r + 75), z1 = Math.max(z0 - 100, -560);
      const courbe = new T.CatmullRomCurve3([V(XP, YC, z0), V(XP, YC - 25, z1), V(XP + 140, 118, ZBOX + 20), V(XBOX - 250, 112, ZBOX)], false, 'centripetal');
      P.courbeFlex = courbe;
      gPiq.add(tubeOndule(courbe, rc + 2, 15, flexMat));
      for (const u of [0.02, 0.98]) {
        const p = courbe.getPointAt(u), t = courbe.getTangentAt(u);
        const c = new T.Mesh(new T.CylinderGeometry(rc + 6, rc + 6, 24, 24, 1, true), noir); c.position.copy(p);
        c.quaternion.setFromUnitVectors(V(0, 1, 0), t); c.material = noir; gPiq.add(c);
      }
      gPiq.add(cyl('x', rc, XBOX - 250, XBOX - 200, 112, ZBOX, galva, 32, true));

      /* la réduction : un cône, et la tôle coupée */
      gRed.add(loft(XROND1, XRED1, ringRond(r), ringRond(rT), galva, 64, 4));
      quad(fRed, [[XROND1, YC + r], [XRED1, YC + rT], [XRED1, YC + rT + ZE], [XROND1, YC + r + ZE]]);
      quad(fRed, [[XROND1, YC - r], [XRED1, YC - rT], [XRED1, YC - rT - ZE], [XROND1, YC - r - ZE]]);

      /* le tronçon droit, le coude à 90° vers le bas, la descente jusqu'à la bouche */
      gCoude.add(cyl('x', rT, XRED1, XA, YC, 0, galva, 48, true));
      const tore = new T.Mesh(new T.TorusGeometry(R, rT, 24, 28, Math.PI / 2), galva); tore.position.set(XA, YC - R, 0); gCoude.add(tore);
      gCoude.add(cyl('y', rT, H_DALLE, YC - R, XE, 0, galva, 48, true));
      faceDe([rect(XRED1, XA, YC + rT, YC + rT + ZE), rect(XRED1, XA, YC - rT - ZE, YC - rT), rect(XE - rT - ZE, XE - rT, H_DALLE, YC - R), rect(XE + rT, XE + rT + ZE, H_DALLE, YC - R)], H.tole, fCoude);
      bande(new T.RingGeometry(R + rT, R + rT + ZE, 28, 1, 0, Math.PI / 2), XA, YC - R, fCoude);
      bande(new T.RingGeometry(Math.max(0, R - rT - ZE), R - rT, 28, 1, 0, Math.PI / 2), XA, YC - R, fCoude);

      /* ce qui vient d'être refait est sous la coupe : ses matières sont déjà réglées (partagées) */
      majFlux();
      majMesures();
      if (ctx.element && ctx.element._etatInit === 'pret' && ctx.element._choisie) { try { ctx.element._majSurbrillance(); } catch (e) {} }
    };

    /* ================================================================ L'AIR QUI CIRCULE
       Trois filets dans le plan de coupe + un filet qui part dans le piquage. Chaque tronçon
       a la vitesse que lui donne le débit : v = débit / section. */
    const Qs = () => E.V * Math.PI * Math.pow(E.D / 1000, 2) / 4;     /* m³/s : la formule de la station */
    const aff = v => 900 * Math.tanh(70 * v / 900);                   /* m/s → mm/s à l'écran (très ralenti) */
    const cercleSurface = h => Math.PI * h * h / 1e6;
    const SURF_RECT = 4 * RW * RH / 1e6;
    const cheminPrincipal = f => {
      const { r, rT, R, XA } = P, Q = Qs(), pts = [];
      const yy = h => YC + f * 0.72 * h;
      const add = (x, y, z, A, q) => pts.push({ p: V(x, y, z), v: aff(q * Q / A) });
      add(-740, yy(RH), Z, SURF_RECT, 1); add(XR1, yy(RH), Z, SURF_RECT, 1);
      const ar = cercleSurface(r), aT = cercleSurface(rT);
      for (let i = 1; i <= 6; i++) { const u = i / 6; add(XR1 + (XRAC1 - XR1) * u, yy(RH + (r - RH) * u), Z, SURF_RECT + (ar - SURF_RECT) * u, 1); }
      add(XP, yy(r), Z, ar, 1); add(XP, yy(r), Z, ar, 0.7); add(XROND1, yy(r), Z, ar, 0.7);
      for (let i = 1; i <= 5; i++) { const u = i / 5, h = r + (rT - r) * u; add(XROND1 + (XRED1 - XROND1) * u, yy(h), Z, cercleSurface(h), 0.7); }
      add(XA, yy(rT), Z, aT, 0.7);
      const rho = R + f * 0.72 * rT;
      for (let i = 1; i <= 10; i++) { const ph = i / 10 * Math.PI / 2; add(XA + rho * Math.sin(ph), YC - R + rho * Math.cos(ph), Z, aT, 0.7); }
      add(XE + f * 0.72 * rT, 14, Z, aT, 0.7);
      return pts;
    };
    const cheminPiquage = () => {
      const { r, rc } = P, Q = Qs(), pts = [];
      const base = cheminPrincipal(0.3).filter(q => q.p.x < XP - rc - 70);
      pts.push(...base);
      const ar = cercleSurface(r), aC = cercleSurface(rc), y0 = YC + 0.3 * 0.72 * r;
      const add = (x, y, z, A, q) => pts.push({ p: V(x, y, z), v: aff(q * Q / A) });
      add(XP - rc - 70, y0, Z, ar, 1);
      add(XP - rc * 0.5, YC + (y0 - YC) * 0.4, -r * 0.3, ar, 0.5);
      add(XP, YC, -Math.sqrt(Math.max(1, r * r - rc * rc)) + 4, aC, 0.3);
      for (let i = 0; i <= 24; i++) { const p = P.courbeFlex.getPointAt(i / 24); add(p.x, p.y, p.z, aC, 0.3); }
      add(XBOX - 200, 112, ZBOX, aC, 0.3);
      add(XBOX - 120, 112, ZBOX, aC, 0.3);
      return pts;
    };
    const flots = [-0.55, 0, 0.55].map((f, i) => ({ f, c: faireCourant(AIR_SOUFFLE, 14, 40, i * 1.7) }));
    const flotPiq = faireCourant(AIR_SOUFFLE, 14, 40, 0.9);
    const tousFlots = [...flots.map(x => x.c), flotPiq];
    tousFlots.forEach(c => racine.add(c.objet));
    const majFlux = () => { flots.forEach(x => x.c.chemin(cheminPrincipal(x.f))); flotPiq.chemin(cheminPiquage()); };

    /* ================================================================ LES MESURES */
    const rond = () => { const D = E.D; return { S: Math.PI * Math.pow(D / 1000, 2) / 4, Qh: Qs() * 3600 }; };
    const majMesures = () => {
      const { S, Qh } = rond(), vr = Qs() / SURF_RECT, D = E.D;
      const reste = LIBRE - SUSPENTE - D;
      const place = reste >= 0 ? 'passe (' + nb(LIBRE - D, 0) + ' mm de reste)' : D <= LIBRE ? 'passe à peine, sans place pour les suspentes' : 'ne passe pas';
      ctx.mesures([
        { libelle: 'Section du conduit', valeur: nb(S, 4) + ' m²' },
        { libelle: 'Vitesse moyenne', valeur: nb(E.V, 1) + ' m/s' },
        { libelle: 'Débit d’air', valeur: nb(Qh, 0) + ' m³/h' },
        { libelle: 'Vitesse dans le rectangulaire 600 × 250', valeur: nb(vr, 1) + ' m/s' },
        { libelle: 'Le rond de ' + nb(D, 0) + ' mm sous ' + nb(LIBRE, 0) + ' mm libres', valeur: place }
      ]);
    };
    const majTexte = () => {
      const { S, Qh } = rond(), vr = Qs() / SURF_RECT;
      ctx.dire('<strong>Rond de ' + nb(E.D, 0) + ' mm à ' + nb(E.V, 1) + ' m/s.</strong> Sa section de ' + nb(S, 4) + ' m² laisse passer ' + nb(Qh, 0) + ' m³/h d’' + air('souffle', 'air soufflé')
        + '. Dans le rectangulaire, plus large, le même débit va moins vite : ' + nb(vr, 1) + ' m/s. <em>À l’écran, l’air est très ralenti.</em>');
    };
    const ajuster = () => { majMesures(); majTexte(); };

    /* ================================================================ LA COUPE (plan z = 0) */
    const groupesFaces = [faces];
    const basculerCoupe = on => {
      E.coupe = on;
      const plan = on ? [new T.Plane(new T.Vector3(0, 0, -1), 0)] : null;
      const exclus = new Set();
      [faces, ...tousFlots.map(c => c.objet)].forEach(g => g.traverse(o => exclus.add(o)));
      P.plan = plan;
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.needsUpdate = true; } });
      });
      faces.visible = on;
    };
    /* les matières partagées portent le plan : les pièces refaites plus tard le prennent d'elles-mêmes */

    construire();
    ajuster();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'plenum', nom: 'Le faux plafond et la dalle', objets: [plenum], desc: 'Entre les dalles du faux plafond et le plancher du dessus, il reste 350 mm. Tout le réseau doit tenir là, avec ses suspentes : c’est cette hauteur qui décide de la forme des conduits.' },
      { id: 'rect', nom: 'Le conduit rectangulaire et ses brides', objets: [gRect], desc: 'De la tôle galvanisée, 600 mm de large pour 250 mm de haut : on l’aplatit pour passer sous la dalle. Deux cadres boulonnés, avec un joint entre eux, relient les tronçons.' },
      { id: 'isolant', nom: 'L’isolant : laine et pare-vapeur', objets: [gIso], desc: 'Une couche de laine minérale de 40 mm, sous un pare-vapeur en aluminium. Elle évite que le conduit transpire. Elle ajoute 80 mm à sa hauteur : il faut compter avec elle.' },
      { id: 'raccord', nom: 'Le raccord rectangulaire / circulaire', objets: [gRaccord], desc: 'Une pièce qui passe de la forme rectangulaire à la forme ronde, en douceur. Le débit ne change pas ; la section, elle, se resserre.' },
      { id: 'rond', nom: 'Le conduit circulaire spiralé', objets: [gRond], desc: 'Une bande de tôle enroulée en spirale : sa couture en hélice se voit sur toute la longueur. Un manchon avec deux joints à lèvre relie deux longueurs.' },
      { id: 'section', nom: 'La section : la tranche d’air', objets: [gTranches], desc: 'La surface de passage de l’air, coupée en travers. Débit = vitesse × section : à débit égal, plus la section est petite, plus l’air doit aller vite.' },
      { id: 'piquage', nom: 'Le piquage et la gaine souple', objets: [gPiq], desc: 'Un piquage prélève une partie de l’air. La gaine souple, tendue et la plus courte possible, l’amène au caisson de la bouche. Détendue ou pliée, elle freine fortement l’air.' },
      { id: 'reduction', nom: 'La réduction', objets: [gRed], desc: 'Un cône qui rétrécit le conduit. L’air y accélère. On le pose en pente douce, pour limiter les pertes.' },
      { id: 'coude', nom: 'Le coude et la descente', objets: [gCoude], desc: 'Le conduit tourne de 90° vers le bas pour rejoindre la bouche. Un coude à grand rayon freine moins l’air qu’un coude à angle vif.' },
      { id: 'bouche', nom: 'Les bouches et leur caisson', objets: [gBouches], desc: 'Le caisson posé sur la dalle et les bouches à cônes, encastrées dans le faux plafond. C’est par elles que l’air arrive dans le local.' },
      { id: 'suspentes', nom: 'Les suspentes et les colliers', objets: [suspFixes, gSusp], desc: 'Des tiges fixées au plancher haut portent le réseau. Une cornière porte le rectangulaire, un collier serre le conduit rond. Elles prennent aussi de la place en hauteur.' },
      { id: 'trappe', nom: 'La trappe de visite', objets: [trappe], desc: 'Une plaque amovible sur le conduit. Elle permet d’y passer la main pour contrôler et nettoyer. Sans trappe, un conduit ne s’entretient pas.' }
    ];

    const commandes = [
      { id: 'diametre', type: 'curseur', libelle: 'Diamètre', min: 80, max: 630, pas: 5, valeur: 315, unite: 'mm' },
      { id: 'vitesse', type: 'curseur', libelle: 'Vitesse', min: 0.5, max: 12, pas: 0.1, valeur: 5, unite: 'm/s' }
    ];

    const etapes = [
      { titre: 'Le tronçon, tel qu’on le pose', piece: 'isolant', voirDedans: false, eclate: false, actions: [['diametre', 315], ['vitesse', 5]],
        vue: { azimut: 20, elevation: 10, zoom: 1.35, cible: [1300, 230, 0] },
        texte: 'Sous le plancher, au-dessus du faux plafond, le conduit rectangulaire sort du mur. Il est enveloppé de laine minérale sous un pare-vapeur. Plus loin, il devient rond.' },
      { titre: 'La hauteur libre arrête le rond', piece: 'rond', voirDedans: false, eclate: false, actions: [['diametre', 500], ['vitesse', 5]],
        vue: { azimut: 14, elevation: -7, zoom: 1.7, cible: [2000, 140, 0] },
        texte: 'Il reste 350 mm entre le faux plafond et le plancher. Un rond de 500 mm est trop haut : il dépasse sous le faux plafond et bute contre le plancher. Le rectangulaire, plat, ne fait que 250 mm : il passe.' },
      { titre: 'Le raccord change la forme du conduit', piece: 'raccord', voirDedans: true, eclate: false, actions: [['diametre', 315], ['vitesse', 5]],
        vue: { azimut: 20, elevation: 14, zoom: 1.9, cible: [1050, 230, 0] },
        texte: 'Le raccord passe du rectangulaire au rond. Le débit ne change pas, la section se resserre : ' + air('souffle', 'l’air soufflé') + ' accélère. Les grains vont plus vite dans le rond.' },
      { titre: 'La section coupée : débit = vitesse × section', piece: 'section', voirDedans: true, eclate: false, actions: [['diametre', 315], ['vitesse', 5]],
        vue: { azimut: 62, elevation: 12, zoom: 1.7, cible: [2000, 220, 0] },
        texte: 'La tranche bleue est la section du rond de 315 mm : 0,0779 m². À 5 m/s, elle laisse passer 0,39 m³ chaque seconde, soit environ 1 400 m³/h.' },
      { titre: 'Un diamètre plus petit : l’air va plus vite', piece: 'rond', voirDedans: true, eclate: false, actions: [['diametre', 250], ['vitesse', 7.9]],
        vue: { azimut: 14, elevation: 12, zoom: 1.5, cible: [1900, 230, 0] },
        texte: 'Le plan impose toujours 1 400 m³/h. Dans un rond de 250 mm, la section est plus petite : il faut 7,9 m/s pour faire passer le même débit. Les grains filent.' },
      { titre: 'Le piquage prend une part de l’air', piece: 'piquage', voirDedans: false, eclate: false, actions: [['diametre', 315], ['vitesse', 5]],
        vue: { azimut: 170, elevation: 3, zoom: 1.8, cible: [1900, 190, -300] },
        texte: 'Vu de l’arrière : un piquage prélève une partie de ' + air('souffle', 'l’air soufflé') + '. La gaine souple, tendue et courte, le conduit au caisson de la bouche.' },
      { titre: 'La réduction et le coude mènent l’air à la bouche', piece: 'coude', voirDedans: true, eclate: false, actions: [['diametre', 315], ['vitesse', 5]],
        vue: { azimut: 18, elevation: 14, zoom: 1.7, cible: [3500, 190, 0] },
        texte: 'Après le piquage, la réduction resserre le conduit et l’air accélère. Le coude à 90° le fait ensuite tourner vers le bas, jusqu’à la bouche du faux plafond.' }
    ];

    const eclate = [
      { objets: [dalleHaute], vers: [0, 900, 0], debut: 0, fin: 0.4 },
      { objets: [dalles, ossature, diff2], vers: [0, -320, 0], debut: 0, fin: 0.4 },
      { objets: [caisson, diff1, gPiq], vers: [0, 0, -260], debut: 0.05, fin: 0.5 },
      { objets: [gCoude], vers: [900, 0, 0], debut: 0.1, fin: 0.6 },
      { objets: [gRed], vers: [700, 0, 0], debut: 0.2, fin: 0.7 },
      { objets: [gRond, gSusp], vers: [450, 0, 0], debut: 0.3, fin: 0.8 },
      { objets: [gRaccord], vers: [250, 0, 0], debut: 0.4, fin: 0.9 },
      { objets: [gRect2, trappe], vers: [120, 0, 0], debut: 0.5, fin: 1 }
    ];

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 20, elevation: 26, zoom: 0.8 },
      vue: { azimut: 22, elevation: 11, zoom: 1.2, cadre: [gRect, gIso, gRaccord, gRond, gRed, gCoude, gPiq, gBouches], marge: 0.7 },
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'diametre') { E.D = +v; ctx.regler('diametre', +v); construire(); }
        if (id === 'vitesse') { E.V = +v; ctx.regler('vitesse', +v); majFlux(); }
        ajuster();
      },
      surEclate(on) { E.demonte = on; gTranches.visible = !on; tousFlots.forEach(c => { c.objet.visible = !on; }); },
      animer(dt) { if (!E.demonte) tousFlots.forEach(c => c.avancer(dt)); return !E.demonte; }
    };
  }, { famille: 'gaines', titre: 'Un tronçon de réseau sous un faux plafond', stations: ['conduits', 'sections'] });

  /* ================================================================ 2. RÉSEAU DE PERTES
     Une branche de réseau posée sur des pieds : un caisson de ventilation, un conduit droit,
     deux coudes (un décalage vers le haut), un té de dérivation, une réduction, un registre,
     une bouche. Sept prises de pression, reliées par des tubes à sept colonnes de liquide,
     alignées devant un tableau gradué (en Pa).

     CE QUE L'ÉLÈVE DOIT VOIR : le niveau des colonnes baisse de gauche à droite. Doucement dans
     les conduits droits (le frottement), d'un coup dans les accidents (coude, té, réduction,
     registre) : une marche. Derrière un coude, l'air se décolle de la paroi et tourbillonne :
     des grains tournent en rond. Un coude serré fait un plus gros tourbillon qu'un coude à grand
     rayon.

     Les mesures reprennent l'activité « loss » des stations : perte du droit = (Pa/m) × longueur,
     plus les pertes singulières, et le total est ce que le ventilateur doit fournir.
     Les longueurs du dessin ne sont pas à l'échelle de la longueur annoncée (24 m ne tiendraient
     pas) : seule la répartition compte, proportionnelle aux longueurs de droit du dessin.

     « Voir en coupe » retire la moitié avant (z > 0) : on voit l'intérieur des conduits. Les
     colonnes, le tableau et les tubes sont derrière : ils restent entiers. */
  Electro3D.definir('reseauPertes', (T, K, ctx) => {
    const { V, C, boite, cyl, hachures, rect, faceDe, vider, faireCourant } = aides(T, K);
    const M = K.mat;
    const racine = new T.Group();
    const opt = ctx.options || {};

    /* ---------------------------------------------------------------- les cotes */
    const Y1 = 500, Y2 = 1000, DY = Y2 - Y1;     /* le droit bas, le droit haut */
    const r = 157.5, rT = 125, rb = 100;          /* conduit de 315, après la réduction 250, dérivation 200 */
    const ZE = 4;
    const RG = 250, RV = 165;                    /* rayon d'un coude à grand rayon, d'un coude serré (angle vif) */
    const XF0 = -1000, XF1 = -400, XC0 = -300, X1 = 1100;
    const TE0 = 2200, TE1 = 2600, XTE = 2400, RED0 = 2800, RED1 = 3100;
    const REG0 = 3450, REG1 = 3770, XEND = 4120;
    const PRISES = [{ x: -250, y: Y1 }, { x: 1050, y: Y1 }, { x: 1850, y: Y2 }, { x: 2700, y: Y2 }, { x: 3200, y: Y2 }, { x: 3860, y: Y2 }, { x: 4010, y: Y2 }];
    const YB = 1300, HC = 560, ZC = -470, ZP = -490;   /* base des colonnes, hauteur, plan des colonnes et du tableau */
    const Z = 15;
    const rayonA = x => (x > RED1 ? rT : r);

    /* ---------------------------------------------------------------- matières */
    const galva = C(M.zingue, 0xbfc5c9);
    const galvaClair = C(M.zingue, 0xcdd2d5);
    const prelaque = C(K.plastique(0xdcdeda, 0.55));
    const interieur = C(M.zingue, 0xc4c8cb);
    const noir = C(M.plastiqueNoir);
    const caoutchouc = C(M.caoutchouc, 0x2a2d31);
    const blanc = C(K.plastique(0xf1efe8, 0.5));
    const vis = C(M.acier, 0xaeb4b9);
    const laiton = C(M.laiton);
    const roueMat = C(M.plastiqueMarine);
    const roueTole = C(M.aluminium, 0xaab2ba);
    const verre = C(new T.MeshStandardMaterial({ color: 0xe9eef2, roughness: 0.1, transparent: true, opacity: 0.28, depthWrite: false }));
    const liquide = C(new T.MeshStandardMaterial({ color: 0xc23b22, roughness: 0.25 }));
    const tubeMat = C(new T.MeshStandardMaterial({ color: 0xdde4ea, roughness: 0.2, transparent: true, opacity: 0.75, depthWrite: false }));
    const tableauMat = C(K.plastique(0xfbfaf6, 0.7));
    const H = {
      tole: new T.MeshStandardMaterial({ color: 0x59636d, roughness: 0.5, side: T.DoubleSide })
    };

    /* ---------------------------------------------------------------- aides de forme */
    /* un conduit rond d'axe X troué (la dérivation du té, sur le dessus) */
    const rondTroue = (rad, yc, x0, x1, dedans, mat) => {
      const nT = 96, nX = 28, pos = [], idx = [];
      for (let l = 0; l <= nX; l++) for (let k = 0; k <= nT; k++) {
        const th = k / nT * 2 * Math.PI;
        pos.push(x0 + (x1 - x0) * l / nX, yc + rad * Math.sin(th), rad * Math.cos(th));
      }
      for (let l = 0; l < nX; l++) for (let k = 0; k < nT; k++) {
        const th = (k + 0.5) / nT * 2 * Math.PI, x = x0 + (x1 - x0) * (l + 0.5) / nX;
        if (dedans(x, rad * Math.sin(th), rad * Math.cos(th))) continue;
        const a = l * (nT + 1) + k, b = a + 1, c = a + nT + 1, d = c + 1;
        idx.push(a, c, b, b, c, d);
      }
      const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
      return new T.Mesh(g, mat);
    };
    /* une surface qui passe d'un cercle à un autre, d'axe X */
    const cone = (x0, x1, yc, rA, rB, mat) => {
      const nR = 64, nL = 4, pos = [], idx = [];
      for (let l = 0; l <= nL; l++) for (let k = 0; k <= nR; k++) {
        const th = k / nR * 2 * Math.PI, rr = rA + (rB - rA) * l / nL;
        pos.push(x0 + (x1 - x0) * l / nL, yc + rr * Math.sin(th), rr * Math.cos(th));
      }
      for (let l = 0; l < nL; l++) for (let k = 0; k < nR; k++) { const a = l * (nR + 1) + k, b = a + 1, c = a + nR + 1, d = c + 1; idx.push(a, c, b, b, c, d); }
      const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
      return new T.Mesh(g, mat);
    };
    /* une paroi pleine percée d'un trou rond : forme dans le plan (a, b), extrudée de ZE */
    const paroiTrouee = (a0, a1, b0, b1, ca, cb, rayon) => {
      const s = new T.Shape(); s.moveTo(a0, b0); s.lineTo(a1, b0); s.lineTo(a1, b1); s.lineTo(a0, b1); s.lineTo(a0, b0);
      const t = new T.Path(); t.absarc(ca, cb, rayon, 0, Math.PI * 2, true); s.holes.push(t);
      return new T.ExtrudeGeometry(s, { depth: ZE, bevelEnabled: false, curveSegments: 40 });
    };
    const bande = (geo, x, y, groupe) => { const m = new T.Mesh(geo, H.tole); m.position.set(x, y, 0.5); m.userData.sansOmbre = true; m.castShadow = false; groupe.add(m); };
    const aire = h => Math.PI * h * h / 1e6;

    /* ================================================================ LE CAISSON DE VENTILATION
       Une boîte en tôle prélaquée : l'air entre par l'arrière (l'ouïe), la roue le pousse vers
       le collet de droite. La roue reste entière en coupe, comme le moteur de la centrale. */
    const gFan = new T.Group();
    gFan.add(boite(XF0, XF1, Y1 + 250 - ZE, Y1 + 250, -300, 300, prelaque), boite(XF0, XF1, Y1 - 250, Y1 - 250 + ZE, -300, 300, prelaque));
    gFan.add(boite(XF0, XF0 + ZE, Y1 - 250, Y1 + 250, -300, 300, prelaque), boite(XF0, XF1, Y1 - 250, Y1 + 250, 300 - ZE, 300, prelaque));
    {
      const dos = new T.Mesh(paroiTrouee(XF0, XF1, Y1 - 250, Y1 + 250, -700, Y1, 125), prelaque); dos.position.z = -300; gFan.add(dos);
      const cote = new T.Mesh(paroiTrouee(-300, 300, Y1 - 250, Y1 + 250, 0, Y1, r), prelaque);
      cote.geometry.rotateY(-Math.PI / 2); cote.position.x = XF1; gFan.add(cote);
    }
    gFan.add(new T.Mesh(new T.TorusGeometry(132, 8, 8, 36), galva)); gFan.children[gFan.children.length - 1].position.set(-700, Y1, -300);
    gFan.add(cyl('x', r, XF1, XC0, Y1, 0, galva, 48, true));
    gFan.add(cyl('x', r + ZE, XF1 + 20, XF1 + 70, Y1, 0, galvaClair, 48, true));
    const roue = new T.Group();
    roue.add(cyl('z', 190, -60, -52, 0, 0, roueTole, 40), cyl('z', 42, -70, 44, 0, 0, roueMat, 24));
    for (let i = 0; i < 10; i++) {
      const a = i / 10 * 2 * Math.PI, b = boite(-52, 52, -2.5, 2.5, -52, 44, roueMat);
      b.position.set(Math.cos(a) * 142, Math.sin(a) * 142, 0); b.rotation.z = a + 0.6; roue.add(b);
    }
    roue.position.set(-700, Y1, 0);
    gFan.add(roue);
    for (const x of [XF0 + 50, XF1 - 50]) for (const z of [-250, 250]) gFan.add(boite(x - 20, x + 20, 0, Y1 - 250, z - 20, z + 20, galva));
    racine.add(gFan);

    /* ================================================================ LES CONDUITS DROITS ET LES ACCIDENTS FIXES */
    const gDroit = new T.Group(), gA = new T.Group(), gB = new T.Group(), gC = new T.Group(), gD = new T.Group();
    gDroit.add(gA, gB, gC, gD); racine.add(gDroit);
    gA.add(cyl('x', r, XC0, X1, Y1, 0, galva, 64, true));
    for (const x of [300, 700]) gA.add(cyl('x', r + ZE, x - 40, x + 40, Y1, 0, galvaClair, 64, true));
    gC.add(cyl('x', rT, RED1, REG0, Y2, 0, galva, 64, true));
    gC.add(cyl('x', r, TE1, RED0, Y2, 0, galva, 64, true));
    gD.add(cyl('x', rT, REG1, XEND, Y2, 0, galva, 64, true));
    gC.add(cyl('x', rT + ZE, 3250 - 40, 3250 + 40, Y2, 0, galvaClair, 64, true));

    /* le té de dérivation : le conduit principal troué sur le dessus, une branche de 200 vers le haut */
    const gTe = new T.Group();
    gTe.add(rondTroue(r, Y2, TE0, TE1, (x, dy, dz) => dy > 0 && (x - XTE) * (x - XTE) + dz * dz < (rb - 3) * (rb - 3), galva));
    const yTrou = Math.sqrt(r * r - rb * rb);
    gTe.add(cyl('y', rb, Y2 + yTrou - 3, Y2 + r + 260, XTE, 0, galva, 40, true));
    { const bague = new T.Mesh(new T.TorusGeometry(rb + 3, 4, 8, 40), galvaClair); bague.rotation.x = Math.PI / 2; bague.position.set(XTE, Y2 + r + 255, 0); gTe.add(bague); }
    racine.add(gTe);

    /* la réduction : un cône de 315 à 250 */
    const gRed = new T.Group();
    gRed.add(cone(RED0, RED1, Y2, r, rT, galva));
    racine.add(gRed);

    /* le registre : un corps court, un volet rond (ici ouvert, de chant), un axe et un levier dehors */
    const gReg = new T.Group();
    gReg.add(cyl('x', rT + 8, REG0, REG1, Y2, 0, galvaClair, 64, true));
    for (const x of [REG0 + 6, REG1 - 6]) { const t = new T.Mesh(new T.TorusGeometry(rT + 9, 5, 8, 48), galva); t.rotation.y = Math.PI / 2; t.position.set(x, Y2, 0); gReg.add(t); }
    const xm = (REG0 + REG1) / 2;
    gReg.add(new T.Mesh(new T.CylinderGeometry(rT - 5, rT - 5, 4, 48), roueTole));
    gReg.children[gReg.children.length - 1].position.set(xm, Y2, 0);
    gReg.add(cyl('z', 6, -rT - 30, rT + 50, xm, Y2, vis, 12));
    gReg.add(boite(xm - 60, xm + 60, Y2 - 8, Y2 + 8, rT + 30, rT + 40, noir, 3), boite(xm + 40, xm + 60, Y2 - 8, Y2 + 90, rT + 30, rT + 40, noir, 3));
    racine.add(gReg);

    /* la bouche : une collerette murale percée et une grille à ailettes */
    const gBouche = new T.Group();
    {
      const mur = new T.Mesh(paroiTrouee(-200, 200, Y2 - 200, Y2 + 200, 0, Y2, rT), blanc);
      mur.geometry.rotateY(-Math.PI / 2); mur.position.x = XEND + 12; gBouche.add(mur);
      for (let i = -4; i <= 4; i++) { const f = boite(-3, 3, -2, 2, -rT - 14, rT + 14, blanc); f.scale.y = 14; f.position.set(XEND + 18, Y2 + i * 28, 0); f.rotation.z = 0.35; gBouche.add(f); }
    }
    racine.add(gBouche);

    /* ---------------------------------------------------------------- les pieds */
    const gPieds = new T.Group();
    const pied = (x, yHaut) => {
      gPieds.add(boite(x - 90, x + 90, 0, 6, -150, 150, galva));
      for (const z of [-120, 120]) gPieds.add(cyl('y', 14, 6, yHaut, x, z, galva, 12));
      gPieds.add(boite(x - 25, x + 25, yHaut, yHaut + 8, -150, 150, galva));
    };
    pied(300, Y1 - r - 8); pied(800, Y1 - r - 8); pied(1950, Y2 - r - 8); pied(3300, Y2 - rT - 8);
    for (const x of [-450, 4250]) gPieds.add(boite(x - 20, x + 20, 0, 1950, ZP - 40, ZP - 10, galva), boite(x - 90, x + 90, 0, 6, ZP - 150, ZP + 100, galva));
    racine.add(gPieds);

    /* ================================================================ LES PRISES, LES TUBES, LES COLONNES */
    const gPrises = new T.Group(), gCol = new T.Group();
    PRISES.forEach(p => {
      const rr = rayonA(p.x);
      gPrises.add(cyl('z', 6, -rr - 18, -rr + 2, p.x, p.y, laiton, 12), cyl('z', 9, -rr - 24, -rr - 16, p.x, p.y, laiton, 6));
      const fil = K.fil([[p.x, p.y, -rr - 22], [p.x, p.y, -rr - 70], [p.x, p.y + 80, -290], [p.x, YB - 130, -400], [p.x, YB - 28, ZC]], 5, tubeMat, { pas: 6, radial: 8 });
      gPrises.add(fil.mesh);
    });
    racine.add(gPrises);

    /* le tableau : un fond gradué, adapté à l'échelle choisie ; les colonnes de verre devant */
    const LT = 4700, XT0 = -450, WTAB = 1280;
    const cad = document.createElement('canvas'); cad.width = 2048; cad.height = Math.round(2048 * (HC + 160) / LT);
    const texTab = new T.CanvasTexture(cad); texTab.colorSpace = T.SRGBColorSpace; texTab.anisotropy = 4;
    const tableau = new T.Mesh(new T.PlaneGeometry(LT, HC + 160), new T.MeshBasicMaterial({ map: texTab, toneMapped: false }));
    tableau.position.set(XT0 + LT / 2, YB - 50 + (HC + 160) / 2, ZP); tableau.userData.sansOmbre = true;
    gCol.add(tableau);
    gCol.add(boite(XT0, XT0 + LT, YB - 56, YB - 50, ZP - 10, ZP + 4, galva), boite(XT0, XT0 + LT, YB + HC + 104, YB + HC + 110, ZP - 10, ZP + 4, galva));
    const colonnes = PRISES.map(p => {
      const g = new T.Group();
      g.add(cyl('y', 15, YB - 12, YB + HC + 12, p.x, ZC, verre, 16, true));
      g.add(cyl('y', 19, YB - 26, YB - 6, p.x, ZC, laiton, 12), cyl('y', 19, YB + HC + 8, YB + HC + 22, p.x, ZC, laiton, 12));
      const liq = new T.Mesh(new T.CylinderGeometry(10.5, 10.5, 1, 14), liquide); liq.position.set(p.x, YB, ZC); g.add(liq);
      gCol.add(g);
      return { liq, h: 0 };
    });
    /* le trait qui relie les niveaux : la « ligne de pression » */
    const fil = new T.Group(); gCol.add(fil);
    const traitMat = C(new T.MeshStandardMaterial({ color: 0x1b3a63, roughness: 0.5 }));
    racine.add(gCol);

    const ECHELLES = [25, 50, 100, 150, 200, 300, 400, 500, 750];
    const dessinerTableau = rg => {
      const x = cad.getContext('2d'), W = cad.width, Hh = cad.height, k = W / LT;
      x.fillStyle = '#fbfaf6'; x.fillRect(0, 0, W, Hh);
      x.strokeStyle = '#1b3a63'; x.fillStyle = '#1b3a63'; x.font = '700 30px Calibri, Arial, sans-serif'; x.textBaseline = 'middle';
      const yDe = v => Hh - ((50 + v / rg * HC) * (Hh / (HC + 160)));
      for (let i = 0; i <= 5; i++) {
        const v = rg * i / 5, y = yDe(v);
        x.lineWidth = i ? 2 : 5; x.beginPath(); x.moveTo(60, y); x.lineTo(W - 60, y); x.globalAlpha = i ? 0.28 : 0.8; x.stroke(); x.globalAlpha = 1;
        x.textAlign = 'left'; x.fillText(String(v).replace('.', ','), 8, y - 14);
        x.textAlign = 'right'; x.fillText(String(v).replace('.', ','), W - 8, y - 14);
      }
      x.textAlign = 'left'; x.fillText('Pa', 8, 26); x.textAlign = 'right'; x.fillText('Pa', W - 8, 26);
      texTab.needsUpdate = true;
    };

    /* ================================================================ L'ÉTAT, LES PRESSIONS */
    const E = { taux: opt.rate !== undefined ? +opt.rate : 0.8, L: opt.length !== undefined ? +opt.length : 24, loc: opt.local !== undefined ? +opt.local : 0, coude: opt.coude === 'vif' ? 'vif' : 'rayon', coupe: false, demonte: false };
    const rayonCoude = () => (E.coude === 'vif' ? RV : RG);
    const P = { echelle: 25, cible: PRISES.map(() => 0) };

    const calculer = () => {
      const R = rayonCoude(), X2 = X1 + 2 * R;
      const s = [1300, (DY - 2 * R) + (1850 - X2), (TE0 - 1850) + (2700 - TE1), (RED0 - 2700) + (3200 - RED1), (REG0 - 3200) + (3860 - REG1), 4010 - 3860];
      const Ls = s.reduce((a, b) => a + b, 0), droit = E.taux * E.L, tot = droit + E.loc;
      const part = [0, 0.52, 0.22, 0.16, 0.10, 0];
      const p = [tot];
      for (let i = 0; i < 6; i++) p.push(Math.max(0, p[i] - droit * s[i] / Ls - E.loc * part[i]));
      p[6] = Math.max(0, p[6]);
      return { p, droit, tot };
    };

    /* ================================================================ CE QUI DÉPEND DU TYPE DE COUDE */
    const gCoudes = new T.Group(), fCoudes = new T.Group(), gB2 = gB, fB = new T.Group();
    racine.add(gCoudes);
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const fFixes = new T.Group(); faces.add(fFixes, fCoudes, fB);
    {
      /* les faces de coupe des parties fixes */
      faceDe([rect(XF0, XF1, Y1 + 250 - ZE, Y1 + 250), rect(XF0, XF1, Y1 - 250, Y1 - 250 + ZE), rect(XF0, XF0 + ZE, Y1 - 250, Y1 + 250), rect(XF1 - ZE, XF1, Y1 - 250, Y1 - r), rect(XF1 - ZE, XF1, Y1 + r, Y1 + 250)], H.tole, fFixes);
      faceDe([rect(XF1, X1, Y1 + r, Y1 + r + ZE), rect(XF1, X1, Y1 - r - ZE, Y1 - r)], H.tole, fFixes);
      faceDe([rect(TE1, RED0, Y2 + r, Y2 + r + ZE), rect(TE1, RED0, Y2 - r - ZE, Y2 - r), rect(RED1, REG0, Y2 + rT, Y2 + rT + ZE), rect(RED1, REG0, Y2 - rT - ZE, Y2 - rT), rect(REG1, XEND, Y2 + rT, Y2 + rT + ZE), rect(REG1, XEND, Y2 - rT - ZE, Y2 - rT)], H.tole, fFixes);
      faceDe([rect(REG0, REG1, Y2 + rT + 8, Y2 + rT + 8 + ZE), rect(REG0, REG1, Y2 - rT - 8 - ZE, Y2 - rT - 8), rect(xm - rT + 5, xm + rT - 5, Y2 - 2, Y2 + 2)], H.tole, fFixes);
      /* le té : dessus coupé de part et d'autre de la dérivation, dessous entier, branche */
      faceDe([rect(TE0, XTE - rb, Y2 + r, Y2 + r + ZE), rect(XTE + rb, TE1, Y2 + r, Y2 + r + ZE), rect(TE0, TE1, Y2 - r - ZE, Y2 - r), rect(XTE - rb - ZE, XTE - rb, Y2 + yTrou - 3, Y2 + r + 260), rect(XTE + rb, XTE + rb + ZE, Y2 + yTrou - 3, Y2 + r + 260)], H.tole, fFixes);
      faceDe([[[RED0, Y2 + r], [RED1, Y2 + rT], [RED1, Y2 + rT + ZE], [RED0, Y2 + r + ZE]], [[RED0, Y2 - r], [RED1, Y2 - rT], [RED1, Y2 - rT - ZE], [RED0, Y2 - r - ZE]]], H.tole, fFixes);
      /* les pieds : la selle sous le conduit, coupée */
      for (const [x, y] of [[300, Y1 - r - 8], [800, Y1 - r - 8], [1950, Y2 - r - 8], [3300, Y2 - rT - 8]]) faceDe([rect(x - 25, x + 25, y, y + 8)], H.tole, fFixes);
    }
    /* les cotes qui bougent avec le type de coude sont dans construire() */
    const eddies = [];
    const gEddies = (() => {
      const N = 40, geo = new T.SphereGeometry(11, 8, 6);
      const im = new T.InstancedMesh(geo, K.lumineux(AIR_SOUFFLE), N); im.userData.sansOmbre = true; im.castShadow = false; im.frustumCulled = false;
      return im;
    })();
    racine.add(gEddies);
    const m4 = new T.Matrix4(), qI = new T.Quaternion(), sc1 = new T.Vector3(1, 1, 1), p1 = new T.Vector3();
    let tE = 0;
    const poserTourbillons = () => {
      let i = 0;
      eddies.forEach(e => { for (let j = 0; j < e.n; j++) { const a = j / e.n * 2 * Math.PI + e.sens * tE * 2.2; p1.set(e.cx + e.rho * Math.cos(a), e.cy + e.rho * Math.sin(a), Z); m4.compose(p1, qI, sc1); gEddies.setMatrixAt(i++, m4); } });
      for (; i < 40; i++) { m4.compose(p1.set(0, -1000, 0), qI, new T.Vector3(0, 0, 0)); gEddies.setMatrixAt(i, m4); }
      gEddies.instanceMatrix.needsUpdate = true;
    };

    const VA = 5;                                                       /* m/s dans le 315 : « une gaine à 5 m/s » des stations */
    const Q = VA * aire(r);
    const aff = v => 900 * Math.tanh(70 * v / 900);
    const cheminPrincipal = f => {
      const R = rayonCoude(), pts = [], o = f * 0.72 * r;
      const add = (x, y, z, A, q) => pts.push({ p: V(x, y, z), v: aff(q * Q / A) });
      const aR = aire(r);
      add(XF1 - 10, Y1 + o, Z, aR, 1); add(X1, Y1 + o, Z, aR, 1);
      const rho1 = R - o;
      for (let i = 1; i <= 10; i++) { const ph = i / 10 * Math.PI / 2; add(X1 + rho1 * Math.sin(ph), Y1 + R - rho1 * Math.cos(ph), Z, aR, 1); }
      add(X1 + rho1, Y2 - R, Z, aR, 1);
      const rho2 = R + o, c2x = X1 + 2 * R, c2y = Y2 - R;
      for (let i = 1; i <= 10; i++) { const ph = i / 10 * Math.PI / 2; add(c2x - rho2 * Math.cos(ph), c2y + rho2 * Math.sin(ph), Z, aR, 1); }
      add(XTE, Y2 + o, Z, aR, 1); add(XTE, Y2 + o, Z, aR, 0.75); add(RED0, Y2 + o, Z, aR, 0.75);
      for (let i = 1; i <= 5; i++) { const u = i / 5, h = r + (rT - r) * u; add(RED0 + (RED1 - RED0) * u, Y2 + f * 0.72 * h, Z, aire(h), 0.75); }
      const oT = f * 0.72 * rT, aT = aire(rT);
      add(XEND, Y2 + oT, Z, aT, 0.75); add(XEND + 130, Y2 + oT, Z, aT, 0.75);
      return pts;
    };
    const cheminBranche = () => {
      const pts = [], base = cheminPrincipal(0.3), o = 0.3 * 0.72 * r, Qb = 0.25 * Q, aB = aire(rb);
      for (const q of base) { if (q.p.x >= XTE - rb - 70 && q.p.y > Y2 - 100 && q.p.x > X1 + RG) break; pts.push(q); }
      const add = (x, y, z, A, q) => pts.push({ p: V(x, y, z), v: aff(q / A) });
      add(XTE - rb - 70, Y2 + o, Z, aire(r), Q);
      add(XTE - rb * 0.5, Y2 + o + 50, Z, aB, Qb); add(XTE, Y2 + r * 0.75, Z, aB, Qb); add(XTE, Y2 + r + 150, Z, aB, Qb); add(XTE, Y2 + r + 300, Z, aB, Qb);
      return pts;
    };
    const flots = [-0.55, 0, 0.55].map((f, i) => ({ f, c: faireCourant(AIR_SOUFFLE, 14, 40, i * 1.9) }));
    const flotBranche = faireCourant(AIR_SOUFFLE, 14, 20, 0.7);
    const flotFan = faireCourant(AIR_SOUFFLE, 14, 8, 0.2);
    const tousFlots = [...flots.map(x => x.c), flotBranche, flotFan];
    tousFlots.forEach(c => racine.add(c.objet));
    {
      const a = aire(r);
      flotFan.chemin([[-700, Y1, -520], [-700, Y1, Z], [-640, Y1 + 120, Z], [-560, Y1 + 170, Z], [-470, Y1 + 110, Z], [-390, Y1, Z]].map(q => ({ p: V(q[0], q[1], q[2]), v: aff(Q / a) })));
    }

    const construire = () => {
      const R = rayonCoude(), X2 = X1 + 2 * R, vif = E.coude === 'vif';
      [gCoudes, gB2].forEach(g => g.traverse(m => { if (m.isMesh && m.userData.allumee && ctx.element && ctx.element._eteindre) { try { ctx.element._eteindre(m); } catch (e) {} } }));
      [gCoudes, gB2, fCoudes, fB].forEach(vider);
      const t1 = new T.Mesh(new T.TorusGeometry(R, r, 24, 28, Math.PI / 2), galva); t1.rotation.z = -Math.PI / 2; t1.position.set(X1, Y1 + R, 0); gCoudes.add(t1);
      if (DY - 2 * R > 1) gCoudes.add(cyl('y', r, Y1 + R, Y2 - R, X1 + R, 0, galva, 64, true));
      const t2 = new T.Mesh(new T.TorusGeometry(R, r, 24, 28, Math.PI / 2), galva); t2.rotation.z = Math.PI / 2; t2.position.set(X1 + 2 * R, Y2 - R, 0); gCoudes.add(t2);
      gB2.add(cyl('x', r, X2, TE0, Y2, 0, galva, 64, true));
      /* les faces de coupe : deux anneaux coupés par coude, le droit vertical, le droit horizontal */
      bande(new T.RingGeometry(R + r, R + r + ZE, 28, 1, -Math.PI / 2, Math.PI / 2), X1, Y1 + R, fCoudes);
      bande(new T.RingGeometry(Math.max(0, R - r - ZE), R - r, 28, 1, -Math.PI / 2, Math.PI / 2), X1, Y1 + R, fCoudes);
      bande(new T.RingGeometry(R + r, R + r + ZE, 28, 1, Math.PI / 2, Math.PI / 2), X1 + 2 * R, Y2 - R, fCoudes);
      bande(new T.RingGeometry(Math.max(0, R - r - ZE), R - r, 28, 1, Math.PI / 2, Math.PI / 2), X1 + 2 * R, Y2 - R, fCoudes);
      if (DY - 2 * R > 1) faceDe([rect(X1 + R - r - ZE, X1 + R - r, Y1 + R, Y2 - R), rect(X1 + R + r, X1 + R + r + ZE, Y1 + R, Y2 - R)], H.tole, fCoudes);
      faceDe([rect(X2, TE0, Y2 + r, Y2 + r + ZE), rect(X2, TE0, Y2 - r - ZE, Y2 - r)], H.tole, fB);
      /* les tourbillons : derrière chaque accident, sur la paroi du côté intérieur */
      const rho = vif ? 62 : 32;
      eddies.length = 0;
      eddies.push({ cx: X1 + R - r + rho + 4, cy: Y1 + R + rho + 24, rho, n: vif ? 10 : 7, sens: 1 });
      eddies.push({ cx: X2 + rho + 30, cy: Y2 - r + rho + 4, rho, n: vif ? 10 : 7, sens: -1 });
      eddies.push({ cx: XTE + rb + 50, cy: Y2 + r - 38, rho: 32, n: 7, sens: 1 });
      eddies.push({ cx: REG1 + 34, cy: Y2 + 52, rho: 20, n: 5, sens: -1 });
      eddies.push({ cx: REG1 + 34, cy: Y2 - 52, rho: 20, n: 5, sens: 1 });
      poserTourbillons();
      /* l'air : un chemin qui suit les coudes */
      flots.forEach(x => x.c.chemin(cheminPrincipal(x.f)));
      flotBranche.chemin(cheminBranche());
      if (ctx.element && ctx.element._etatInit === 'pret' && ctx.element._choisie) { try { ctx.element._majSurbrillance(); } catch (e) {} }
    };

    const majPressions = () => {
      const { p, tot } = calculer();
      P.echelle = ECHELLES.find(e => e >= tot * 1.1) || ECHELLES[ECHELLES.length - 1];
      dessinerTableau(P.echelle);
      P.cible = p.map(v => clamp(v / P.echelle, 0, 1) * HC);
    };
    const majFil = () => {
      vider(fil);
      const pts = colonnes.map((c, i) => V(PRISES[i].x, YB + c.h, ZC + 24));
      const ch = new T.CurvePath();
      for (let i = 1; i < pts.length; i++) ch.add(new T.LineCurve3(pts[i - 1], pts[i]));
      fil.add(new T.Mesh(new T.TubeGeometry(ch, 60, 4.5, 6, false), traitMat));
    };

    const majMesures = () => {
      const { droit, tot } = calculer();
      ctx.mesures([
        { libelle: 'Perte du droit', valeur: nb(E.taux, 1) + ' Pa/m × ' + nb(E.L, 0) + ' m = ' + nb(droit, 1) + ' Pa' },
        { libelle: 'Pertes singulières', valeur: nb(E.loc, 1) + ' Pa' },
        { libelle: 'Perte de la branche', valeur: nb(tot, 1) + ' Pa' },
        { libelle: 'Échelle des colonnes', valeur: '0 à ' + nb(P.echelle, 0) + ' Pa' }
      ]);
    };
    const majTexte = () => {
      const { droit, tot } = calculer();
      ctx.dire('<strong>Perte de la branche : ' + nb(tot, 1) + ' Pa.</strong> Le droit en use ' + nb(droit, 1) + ' (' + nb(E.taux, 1) + ' Pa/m sur ' + nb(E.L, 0) + ' m), les accidents ' + nb(E.loc, 1)
        + '. C’est ce que le ventilateur doit fournir à ' + air('souffle', 'l’air soufflé') + '. <em>Les colonnes baissent doucement dans le droit, d’un coup dans un accident. À l’écran, l’air est très ralenti.</em>');
    };
    const ajuster = () => { majPressions(); majMesures(); majTexte(); };

    /* ================================================================ LA COUPE (plan z = 0) */
    const basculerCoupe = on => {
      E.coupe = on;
      const plan = on ? [new T.Plane(new T.Vector3(0, 0, -1), 0)] : null;
      const exclus = new Set();
      [faces, roue, gEddies, ...tousFlots.map(c => c.objet)].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.needsUpdate = true; } });
      });
      faces.visible = on;
    };

    construire(); ajuster();
    colonnes.forEach((c, i) => { c.h = P.cible[i]; c.liq.scale.y = Math.max(0.5, c.h); c.liq.position.y = YB + Math.max(0.5, c.h) / 2; });
    majFil();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'ventilateur', nom: 'Le caisson de ventilation', objets: [gFan], desc: 'Il aspire l’air et le pousse dans le réseau. Il doit fournir la pression qui sera perdue tout au long de la branche : on la lit sur la première colonne.' },
      { id: 'droit', nom: 'Les conduits droits', objets: [gDroit], desc: 'De la tôle ronde de 315 mm. L’air frotte contre la paroi sur toute la longueur : la pression baisse doucement, à peu près la même valeur à chaque mètre.' },
      { id: 'coude', nom: 'Les deux coudes', objets: [gCoudes], desc: 'Ils décalent le conduit vers le haut. L’air se décolle de la paroi et tourbillonne derrière le coude : la pression tombe d’un coup. Un coude serré fait plus de tourbillons.' },
      { id: 'te', nom: 'Le té de dérivation', objets: [gTe], desc: 'Une branche part sur le dessus et emporte une partie de l’air. Le mélange des filets d’air fait des tourbillons : la pression tombe d’un coup.' },
      { id: 'reduction', nom: 'La réduction', objets: [gRed], desc: 'Un cône qui passe de 315 à 250 mm. Le conduit se resserre, l’air accélère, et la pression tombe.' },
      { id: 'registre', nom: 'Le registre', objets: [gReg], desc: 'Un volet rond qui tourne sur son axe. Ouvert, il ne gêne presque pas l’air ; en le fermant, on freine plus fort. Le levier est à l’extérieur.' },
      { id: 'bouche', nom: 'La bouche', objets: [gBouche], desc: 'La grille à ailettes par où l’air sort dans le local. Après elle, la pression est celle de la pièce : zéro sur les colonnes.' },
      { id: 'prises', nom: 'Les prises de pression et leurs tubes', objets: [gPrises], desc: 'Un petit raccord en laiton dans la paroi, relié par un tube souple à une colonne de liquide. Sept prises, du ventilateur jusqu’à la bouche.' },
      { id: 'colonnes', nom: 'Les colonnes de liquide', objets: [gCol], desc: 'Plus la pression est forte, plus le liquide monte dans le tube. Le trait relie les niveaux : c’est la courbe de pression du réseau.' },
      { id: 'pieds', nom: 'Les pieds et le tableau', objets: [gPieds], desc: 'Des pieds posés sur le sol portent la branche et le tableau gradué en pascals.' }
    ];

    const commandes = [
      { id: 'taux', type: 'curseur', libelle: 'Perte linéaire', min: 0.1, max: 3, pas: 0.1, valeur: E.taux, unite: 'Pa/m' },
      { id: 'longueur', type: 'curseur', libelle: 'Longueur', min: 1, max: 80, pas: 1, valeur: E.L, unite: 'm' },
      { id: 'locales', type: 'curseur', libelle: 'Pertes singulières', min: 0, max: 150, pas: 1, valeur: E.loc, unite: 'Pa' },
      { id: 'coude', type: 'choix', options: [['rayon', 'Coudes à grand rayon'], ['vif', 'Coudes à angle vif']], valeur: E.coude }
    ];

    const etapes = [
      { titre: 'Une prise par endroit, une colonne par prise', piece: 'prises', voirDedans: false, eclate: false, actions: [['taux', 0.8], ['longueur', 24], ['locales', 32], ['coude', 'rayon']],
        vue: { azimut: 14, elevation: 12, zoom: 1.0, cible: null },
        texte: 'Chaque prise de pression est reliée par un tube à une colonne de liquide. Plus la pression est forte à cet endroit du réseau, plus le liquide monte. Le niveau baisse de gauche à droite.' },
      { titre: 'Dans le droit, la pression baisse doucement', piece: 'droit', voirDedans: true, eclate: false, actions: [['taux', 0.8], ['longueur', 24], ['locales', 0], ['coude', 'rayon']],
        vue: { azimut: 12, elevation: 14, zoom: 1.5, cible: [450, 900, 0] },
        texte: 'Sans accident, ' + air('souffle', 'l’air soufflé') + ' frotte seulement contre la tôle : chaque mètre use la même petite part de pression. Les colonnes descendent en pente douce.' },
      { titre: 'Dans un coude, la pression tombe d’un coup', piece: 'coude', voirDedans: true, eclate: false, actions: [['taux', 0.8], ['longueur', 24], ['locales', 32], ['coude', 'rayon']],
        vue: { azimut: 8, elevation: 12, zoom: 1.8, cible: [1450, 750, 0] },
        texte: 'Derrière le coude, l’air se décolle de la paroi et tourbillonne : regardez les grains qui tournent en rond. Ces tourbillons usent la pression d’un coup, sans un mètre de plus : la colonne fait une marche.' },
      { titre: 'Un coude à angle vif tourbillonne davantage', piece: 'coude', voirDedans: true, eclate: false, actions: [['taux', 0.8], ['longueur', 24], ['locales', 60], ['coude', 'vif']],
        vue: { azimut: 8, elevation: 12, zoom: 1.8, cible: [1450, 750, 0] },
        texte: 'Avec un coude à angle vif, le tourbillon est plus gros : la perte monte à 60 Pa pour les accidents. La marche de la colonne est plus haute, pour des coudes moins chers à l’achat.' },
      { titre: 'Le té emporte une partie de l’air', piece: 'te', voirDedans: true, eclate: false, actions: [['taux', 0.8], ['longueur', 24], ['locales', 32], ['coude', 'rayon']],
        vue: { azimut: 10, elevation: 14, zoom: 2.0, cible: [2450, 1050, 0] },
        texte: 'Une partie de l’air monte dans la dérivation, le reste continue tout droit. Les filets d’air se mélangent et tourbillonnent derrière le té : nouvelle marche.' },
      { titre: 'La réduction accélère l’air', piece: 'reduction', voirDedans: true, eclate: false, actions: [['taux', 0.8], ['longueur', 24], ['locales', 32], ['coude', 'rayon']],
        vue: { azimut: 12, elevation: 14, zoom: 2.0, cible: [3050, 1050, 0] },
        texte: 'Le conduit passe de 315 à 250 mm : la section se resserre, l’air va plus vite (les grains s’écartent). Cette accélération coûte de la pression : la colonne baisse encore.' },
      { titre: 'Le ventilateur paie la somme de toutes les pertes', piece: 'ventilateur', voirDedans: false, eclate: false, actions: [['taux', 0.8], ['longueur', 24], ['locales', 32], ['coude', 'rayon']],
        vue: { azimut: 12, elevation: 12, zoom: 1.2, cible: [1300, 1000, 0] },
        texte: 'La première colonne est la plus haute : c’est la pression que le caisson doit fournir. À la bouche, plus rien : tout a été perdu en route. Perte de la branche = R × L + pertes singulières.' }
    ];

    const eclate = [
      { objets: [gBouche], vers: [350, 0, 0], debut: 0, fin: 0.5 },
      { objets: [gReg], vers: [250, 0, 0], debut: 0.1, fin: 0.6 },
      { objets: [gRed, gC], vers: [180, 0, 0], debut: 0.2, fin: 0.7 },
      { objets: [gTe], vers: [100, 0, 0], debut: 0.3, fin: 0.8 },
      { objets: [gFan], vers: [-350, 0, 0], debut: 0.4, fin: 0.9 }
    ];

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 14, elevation: 22, zoom: 0.8 },
      vue: { azimut: 14, elevation: 12, zoom: 1.15, cadre: [gFan, gDroit, gCoudes, gTe, gBouche, gCol], marge: 0.7 },
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'taux') { E.taux = +v; ctx.regler('taux', +v); }
        if (id === 'longueur') { E.L = +v; ctx.regler('longueur', +v); }
        if (id === 'locales') { E.loc = +v; ctx.regler('locales', +v); }
        if (id === 'coude') { E.coude = v; ctx.regler('coude', v); construire(); }
        ajuster();
      },
      surEclate(on) { E.demonte = on; gEddies.visible = !on; tousFlots.forEach(c => { c.objet.visible = !on; }); },
      animer(dt) {
        let bouge = false;
        if (!E.demonte) { tousFlots.forEach(c => c.avancer(dt)); tE += dt; poserTourbillons(); roue.rotation.z -= dt * 2.4; bouge = true; }
        colonnes.forEach((c, i) => {
          const h = K.vers(c.h, P.cible[i], 3.5, dt);
          if (Math.abs(h - P.cible[i]) < 0.05) { if (c.h !== P.cible[i]) bouge = true; c.h = P.cible[i]; } else { c.h = h; bouge = true; }
          c.liq.scale.y = Math.max(0.5, c.h); c.liq.position.y = YB + Math.max(0.5, c.h) / 2;
        });
        if (bouge) majFil();
        return bouge;
      }
    };
  }, { famille: 'gaines', titre: 'Une branche de réseau et ses prises de pression', stations: ['pertes-lineaires', 'pertes-singulieres'] });
})();
