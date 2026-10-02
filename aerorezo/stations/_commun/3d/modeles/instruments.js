/* AéroRézo 3D — famille « instruments » : le thermo-hygromètre devant une vitre froide (hygrometre),
   puis la mallette de mesure ouverte (mallette).
   Unités : mm. Repère de « hygrometre » : on voit le mur en COUPE. X traverse le mur (dehors à gauche, x < 0 ;
   la pièce à droite, x > 0), Y vers le haut, Z le long du mur (+Z = le côté qu'on voit). Le plan de coupe est
   z = 0 : « Voir en coupe » retire la moitié avant (z > 0).

   CE QUE L'ÉLÈVE DOIT VOIR (hygrometre) : tout se joue entre deux nombres. Un thermo-hygromètre posé loin de la
   vitre mesure l'air (température sèche + humidité relative) et CALCULE le point de rosée ; un thermomètre de
   surface, relié à un thermocouple collé sur la vitre, mesure la paroi. Si la paroi est plus froide que le
   point de rosée, l'air qui la touche se refroidit sous son point de rosée : la vapeur se dépose en gouttes
   (la buée). Sinon, rien. Le point de rosée est calculé comme la station : formule de Magnus, a = 17,62,
   b = 243,12 °C.

   COULEURS DE L'AIR (communes à AéroRézo) : air neuf vert 0x2f9e5a · repris jaune 0xd9a21b · soufflé bleu
   0x2f7fd6 · rejeté brun 0x8a5a3c. L'air d'une pièce, ici, est de l'air « repris » (jaune), toujours doublé d'un
   mot. Les gouttes d'eau sont d'un bleu très clair (0x8fd3f4), qui n'est aucune des quatre couleurs de l'air.

   « Voir en coupe » : le mur montre son bloc, son isolant et son plâtre hachurés, le cadre et l'appui en PVC,
   le double vitrage (deux verres, une lame d'air). Rien d'autre n'est coupé : les appareils, le thermocouple, le
   sol et les grains restent entiers. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  /* ====================================================================== LA TROUSSE COMMUNE */
  const trousse = (T, K) => {
    const M = K.mat;
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
    /* un nombre au format français : virgule, espace insécable avant l'unité (à la charge de l'appelant), vrai signe moins */
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d }).replace(/ /g, ' ').replace('-', '−');
    const deg = (v, d) => nb(v, d) + ' °C';
    const air = (cle, mot) => '<b class="air air-' + cle + '">' + mot + '</b>';
    const clamp = K.clamp;
    /* un nombre pour un afficheur à cristaux liquides : police à chasse fixe, signe moins ordinaire */
    const lcd = (v, d) => { const k = Math.pow(10, d), r = Math.round(v * k) / k; return (Object.is(r, -0) ? 0 : r).toFixed(d).replace('.', ','); };

    /* ---------- les faces de coupe (plan z = 0) : hachures de la CTA ---------- */
    const hachures = (fond, trait, pas, ep) => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = fond; x.fillRect(0, 0, 64, 64);
      x.strokeStyle = trait; x.lineWidth = ep || 5;
      for (let i = -64; i <= 64; i += 32) { x.beginPath(); x.moveTo(i, 64); x.lineTo(i + 64, 0); x.stroke(); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / pas, 1 / pas);
      return new T.MeshStandardMaterial({ map: t, roughness: 0.8, side: T.DoubleSide });
    };
    const uni = couleur => new T.MeshStandardMaterial({ color: couleur, roughness: 0.55, metalness: 0.1, side: T.DoubleSide });
    const H = {
      beton: hachures('#b9b2a4', '#6d665a', 60, 6),
      isolant: hachures('#efe2a8', '#9b8a45', 26, 4),
      platre: hachures('#f1efe8', '#aaa598', 30, 3),
      pvc: uni(0xdcded9),
      verre: uni(0x7fb9cc),
      alu: uni(0x8a929a)
    };
    const rect = (x0, x1, y0, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    const faceDe = (polys, mat, groupe, z) => {
      const g = new T.ShapeGeometry(polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1])))));
      const m = new T.Mesh(g, mat); m.position.z = z === undefined ? 0.5 : z; m.userData.sansOmbre = true; m.castShadow = false;
      groupe.add(m); return m;
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

    /* ---------- un afficheur à cristaux liquides : ecrire((g, w, h) => …) dessine sur le fond vert pâle.
       Sa matière est « transparente » (opacité 1) : le moteur la tient pour un marquage et ne la teinte pas
       quand la pièce s'allume — le chiffre reste lisible. */
    const ecranDe = (W, Hh, k) => {
      const cv = document.createElement('canvas'); cv.width = Math.round(W * k); cv.height = Math.round(Hh * k);
      const g = cv.getContext('2d');
      const tex = new T.CanvasTexture(cv); tex.colorSpace = T.SRGBColorSpace; tex.anisotropy = 4;
      const mesh = new T.Mesh(new T.PlaneGeometry(W, Hh), new T.MeshBasicMaterial({ map: tex, toneMapped: false, transparent: true }));
      mesh.userData.sansOmbre = true; mesh.castShadow = false;
      return { mesh, ecrire: f => { g.fillStyle = '#c9d6b3'; g.fillRect(0, 0, cv.width, cv.height); g.fillStyle = '#1a2a14'; g.textBaseline = 'alphabetic'; f(g, cv.width, cv.height); tex.needsUpdate = true; } };
    };
    const POLICE = '"Consolas", "Courier New", monospace';

    /* ---------- un appareil portable : botte de caoutchouc, façade, fenêtre, afficheur, touches (face vers +Z) ----------
       o = { w, h, d, botte, coque, fenetre: { w, h, y }, touches: [étiquettes], pasTouche, rTouche, yTouche }
       Le pied du boîtier est en y = 0, le milieu en x = 0 et z = 0. */
    const appareil = o => {
      const g = new T.Group();
      const botte = K.propre(M.caoutchouc); botte.color.setHex(o.botte);
      const coque = K.propre(K.plastique(o.coque, 0.5));
      const cadre = K.propre(M.plastiqueNoir);
      const touche = K.propre(K.plastique(o.touche || 0x4b535c, 0.55));
      const zf = o.d / 2;
      g.add(K.mesh(K.boite(o.w, o.h, o.d, 5), botte, 0, o.h / 2, 0));
      g.add(K.mesh(K.boite(o.w - 12, o.h - 16, 3, 2.5), coque, 0, o.h / 2 - 2, zf + 0.8));
      g.add(K.mesh(K.boite(o.fenetre.w + 4, o.fenetre.h + 4, 2.4, 1.2), cadre, 0, o.fenetre.y, zf + 2.6));
      const e = ecranDe(o.fenetre.w, o.fenetre.h, 14); e.mesh.position.set(0, o.fenetre.y, zf + 3.9); g.add(e.mesh);
      const n = o.touches.length;
      o.touches.forEach((lab, i) => {
        const dx = (i - (n - 1) / 2) * o.pasTouche;
        g.add(cyl('z', o.rTouche, zf + 2, zf + 5.5, dx, o.yTouche, touche, 20));
        const t = K.gravure(lab, 3.2, { couleur: '#2b3138' }); t.position.set(dx, o.yTouche - o.rTouche - 4.5, zf + 2.7); g.add(t);
      });
      return { g, ecran: e };
    };

    return { M, V, C, boite, cyl, nb, deg, air, clamp, lcd, H, rect, faceDe, coupeur, ecranDe, POLICE, appareil };
  };

  /* ====================================================================== LE THERMO-HYGROMÈTRE ET LA VITRE */
  Electro3D.definir('hygrometre', (T, K, ctx) => {
    const { M, V, C, boite, cyl, nb, deg, air, clamp, lcd, H, rect, faceDe, coupeur, POLICE, appareil } = trousse(T, K);
    const racine = new T.Group();
    const opt = ctx.options || {};

    /* ------------------------------------------------------------ les cotes */
    const XV = -36;                         /* la face intérieure du verre de la pièce */
    const YV0 = 338, YV1 = 1262;            /* le verre, dans le cadre */
    const ZV = 520;                         /* demi-largeur du verre visible (le verre entre de 12 mm dans le cadre) */
    const YS = 314;                         /* le dessus de l'appui de fenêtre */
    const XS = 700;                         /* le pied de mesure : loin de la vitre */
    const ZPIED = -36;                      /* l'axe du pied (le boîtier est devant, en z = 0) */
    const Z = 15;                           /* les grains courent dans le plan de coupe, un peu devant */
    const ZW = 780;                         /* demi-largeur du mur */
    const PX = -35, PY = 850, PZ = -60;     /* le morceau d'adhésif qui tient le thermocouple */
    const COUL_REPRIS = 0xd9a21b, COUL_EAU = 0x8fd3f4;

    /* ------------------------------------------------------------ matières */
    const blocMat = C(K.plastique(0xb4ac9e, 0.9)), isoMat = C(K.plastique(0xe6d890, 0.95)), platreMat = C(K.plastique(0xe3dccd, 0.9));
    const pvc = C(K.plastique(0xf4f3ee, 0.45));
    const verreInt = new T.MeshStandardMaterial({ color: 0xd6eaf2, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.24, depthWrite: false, side: T.DoubleSide });
    /* le verre extérieur est légèrement teinté : il fait un fond sur lequel la buée se lit */
    const verreExt = new T.MeshStandardMaterial({ color: 0x8fb6cc, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.45, depthWrite: false, side: T.DoubleSide });
    const solMat = K.propre(K.plastique(0xbdb6a8, 0.85));
    /* ce qui reste entier en coupe : matières à soi */
    const acierPied = K.propre(M.acierSombre), alu = K.propre(M.aluminium), noir = K.propre(M.plastiqueNoir);
    const inox = K.propre(K.plastique(0x4a525b, 0.45));
    const cableMat = K.propre(M.caoutchouc), aluAdh = K.propre(M.aluminium);
    const fiche = K.propre(K.plastique(0xf2c230, 0.5));
    const filtreMat = (() => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = '#868e96'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#2d3238';
      for (let i = 4; i < 64; i += 16) for (let j = 4; j < 64; j += 16) { x.beginPath(); x.arc(i, j, 3.2, 0, 6.283); x.fill(); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(6, 5);
      return new T.MeshStandardMaterial({ map: t, roughness: 0.5, metalness: 0.15 });
    })();

    /* ------------------------------------------------------------ le sol */
    const sol = new T.Group();
    sol.add(boite(-300, 1000, -40, 0, -800, 800, solMat));
    racine.add(sol);

    /* ------------------------------------------------------------ le mur : bloc, isolant, plâtre — percé par la baie (z de −580 à 580, y de 290 à 1310) */
    const mur = new T.Group();
    const couche = (x0, x1, mat) => {
      mur.add(boite(x0, x1, 0, 290, -ZW, ZW, mat), boite(x0, x1, 1310, 1480, -ZW, ZW, mat),
        boite(x0, x1, 290, 1310, -ZW, -580, mat), boite(x0, x1, 290, 1310, 580, ZW, mat));
    };
    couche(-300, -100, blocMat); couche(-100, -13, isoMat); couche(-13, 0, platreMat);
    racine.add(mur);
    const facesMur = new T.Group(); facesMur.visible = false; racine.add(facesMur);
    faceDe([rect(-300, -100, 0, 290), rect(-300, -100, 1310, 1480)], H.beton, facesMur);
    faceDe([rect(-100, -13, 0, 290), rect(-100, -13, 1310, 1480)], H.isolant, facesMur);
    faceDe([rect(-13, 0, 0, 290), rect(-13, 0, 1310, 1480)], H.platre, facesMur);

    /* ------------------------------------------------------------ le cadre en PVC et l'appui de fenêtre */
    const cadreG = new T.Group();
    cadreG.add(boite(-110, -4, 290, 350, -580, 580, pvc), boite(-110, -4, 1250, 1310, -580, 580, pvc),
      boite(-110, -4, 350, 1250, -580, -520, pvc), boite(-110, -4, 350, 1250, 520, 580, pvc));
    cadreG.add(boite(-4, 170, 290, YS, -620, 620, pvc));
    racine.add(cadreG);
    const facesCadre = new T.Group(); facesCadre.visible = false; cadreG.add(facesCadre);
    faceDe([rect(-110, -4, 290, 350), rect(-110, -4, 1250, 1310), rect(-4, 170, 290, YS)], H.pvc, facesCadre);
    faceDe([rect(-56, -40, YV0, 350), rect(-56, -40, 1250, YV1)], H.alu, facesCadre, 0.8);       /* l'intercalaire de la lame d'air */

    /* ------------------------------------------------------------ le double vitrage : deux verres, une lame d'air */
    const verreI = boite(-40, -36, YV0, YV1, -ZV - 12, ZV + 12, verreInt);
    const verreE = boite(-60, -56, YV0, YV1, -ZV - 12, ZV + 12, verreExt);
    const vitreI = new T.Group(), vitreE = new T.Group();
    vitreI.add(verreI); vitreE.add(verreE);
    racine.add(vitreI, vitreE);
    const facesI = new T.Group(), facesE = new T.Group(); facesI.visible = facesE.visible = false;
    vitreI.add(facesI); vitreE.add(facesE);
    faceDe([rect(-40, -36, YV0, YV1)], H.verre, facesI, 0.7);
    faceDe([rect(-60, -56, YV0, YV1)], H.verre, facesE, 0.7);

    /* ------------------------------------------------------------ la buée : un voile de fines gouttes, et des gouttes plus grosses */
    let graine = 20261002;
    const hasard = () => ((graine = (graine * 1664525 + 1013904223) >>> 0) / 4294967296);
    const texBuee = (() => {
      const c = document.createElement('canvas'); c.width = c.height = 256;
      const x = c.getContext('2d'); x.fillStyle = 'rgba(255,255,255,0.30)'; x.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 1600; i++) { x.fillStyle = 'rgba(255,255,255,' + (0.35 + hasard() * 0.5).toFixed(2) + ')'; x.beginPath(); x.arc(hasard() * 256, hasard() * 256, 0.8 + hasard() * 1.8, 0, 6.283); x.fill(); }
      const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t;
    })();
    const geoBuee = new T.PlaneGeometry(2 * ZV, YV1 - YV0); geoBuee.rotateY(Math.PI / 2);
    const voileBuee = new T.Mesh(geoBuee, new T.MeshBasicMaterial({ map: texBuee, transparent: true, opacity: 0, depthWrite: false, toneMapped: false, side: T.DoubleSide }));
    voileBuee.position.set(XV + 0.5, (YV0 + YV1) / 2, 0); voileBuee.userData.voile = true; voileBuee.userData.sansOmbre = true; voileBuee.castShadow = false;
    /* 96 gouttes réparties sur le verre, et 24 dans le plan de coupe, vues de profil (un peu grossies pour se lire) */
    const BN = 120, gouttes = [];
    for (let i = 0; i < BN; i++) {
      const profil = i >= 96;
      let y, zz;
      do {
        y = profil ? 380 + (i - 96) * 35 + (hasard() - 0.5) * 14 : 380 + hasard() * 840;
        zz = profil ? -(3 + hasard() * 9) : (hasard() - 0.5) * 2 * (ZV - 30);
      } while (Math.abs(y - PY) < 24 && Math.abs(zz - PZ) < 24);
      gouttes.push({ y, z: zz, r: profil ? 6.5 + hasard() * 5 : 3.5 + hasard() * 5.5, seuil: hasard() });
    }
    const matGoutte = new T.MeshStandardMaterial({ color: 0x8ccbea, roughness: 0.06, metalness: 0, emissive: 0x1f5d85, emissiveIntensity: 0.35, envMapIntensity: 1.5 });
    const buee = new T.InstancedMesh(new T.SphereGeometry(1, 10, 6), matGoutte, BN);
    buee.userData.sansOmbre = true; buee.castShadow = false; buee.frustumCulled = false;
    const poserBuee = c => {
      const m4 = new T.Matrix4(), q = new T.Quaternion(), sc = new T.Vector3(), p = new T.Vector3();
      gouttes.forEach((g, i) => {
        const u = clamp((c - g.seuil * 0.7) / 0.3, 0, 1), s = u > 0 ? g.r * (0.35 + 0.65 * u) : 0.0001;
        p.set(XV + 0.25 * s, g.y, g.z); sc.set(0.6 * s, s, s); m4.compose(p, q, sc); buee.setMatrixAt(i, m4);
      });
      buee.instanceMatrix.needsUpdate = true;
      voileBuee.material.opacity = 0.36 * c; voileBuee.visible = c > 0.01; buee.visible = c > 0.01;
    };
    vitreI.add(voileBuee, buee);

    /* ------------------------------------------------------------ la couche d'air refroidie contre la vitre (coupe seulement) */
    const coucheG = new T.Group(); coucheG.visible = false; racine.add(coucheG);
    const texCouche = (() => {
      const c = document.createElement('canvas'); c.width = 128; c.height = 4;
      const x = c.getContext('2d'), g = x.createLinearGradient(0, 0, 128, 0);
      g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.35, 'rgba(255,255,255,0.45)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = g; x.fillRect(0, 0, 128, 4);
      const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t;
    })();
    const couche3 = new T.Mesh(new T.PlaneGeometry(90, YV1 - YV0), new T.MeshBasicMaterial({ map: texCouche, color: 0x6fb8e6, transparent: true, opacity: 0, depthWrite: false, toneMapped: false, side: T.DoubleSide }));
    couche3.position.set(XV + 45, (YV0 + YV1) / 2, -1);        /* derrière le plan de coupe : les gouttes de profil passent devant */ couche3.userData.voile = true; couche3.userData.sansOmbre = true; couche3.castShadow = false;
    coucheG.add(couche3);

    /* ------------------------------------------------------------ le thermo-hygromètre sur son pied */
    const standG = new T.Group(); standG.position.set(XS, 0, ZPIED);
    {
      const profil = [[0, 0], [172, 0], [172, 9], [158, 14], [34, 21], [14, 36], [11, 40]].map(([r, y]) => new T.Vector2(r, y));
      standG.add(new T.Mesh(new T.LatheGeometry(profil, 56), acierPied));
      standG.add(cyl('y', 11, 36, 1000, 0, 0, alu, 24));
      standG.add(cyl('y', 13, 990, 1000, 0, 0, noir, 20));
    }
    racine.add(standG);
    const hygroG = new T.Group(); hygroG.position.set(XS, 0, ZPIED); hygroG.rotation.y = 0.38;
    const corpsG = new T.Group(), sondeG = new T.Group();
    const HY = 880;                                            /* le pied du boîtier */
    const hy = appareil({ w: 62, h: 146, d: 30, botte: 0x2d3238, coque: 0xe6e8e3, fenetre: { w: 44, h: 52, y: 104 }, touches: ['MODE', 'HOLD', 'MAX'], pasTouche: 17, rTouche: 5.4, yTouche: 38 });
    hy.g.position.set(0, HY, -ZPIED);
    corpsG.add(hy.g);
    /* le collier qui tient le boîtier au pied */
    corpsG.add(cyl('y', 16, HY + 52, HY + 108, 0, 0, noir, 24));
    corpsG.add(K.mesh(K.boite(36, 56, 14, 3), noir, 0, HY + 80, 16));
    /* la sonde d'humidité, en tête : un col, une tige, un capuchon fritté et percé */
    sondeG.add(cyl('y', 9, HY + 144, HY + 156, 0, -ZPIED, noir, 20), cyl('y', 6.2, HY + 156, HY + 206, 0, -ZPIED, inox, 18));
    sondeG.add(cyl('y', 9, HY + 206, HY + 211, 0, -ZPIED, inox, 18), cyl('y', 8, HY + 211, HY + 266, 0, -ZPIED, filtreMat, 22));
    { const bout = K.mesh(new T.SphereGeometry(8, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), filtreMat, 0, HY + 266, -ZPIED); sondeG.add(bout); }
    hygroG.add(corpsG, sondeG);
    racine.add(hygroG);

    /* ------------------------------------------------------------ le thermomètre de surface, sur l'appui, et son thermocouple */
    const thermoG = new T.Group(); thermoG.position.set(120, YS, -6); thermoG.rotation.y = 0.45;
    const th = appareil({ w: 56, h: 116, d: 24, botte: 0x1b3a63, coque: 0xdfe3e6, fenetre: { w: 42, h: 26, y: 80 }, touches: ['ON', 'HOLD'], pasTouche: 22, rTouche: 6.5, yTouche: 38 });
    th.g.position.y = 7;
    const pied = K.propre(M.caoutchouc);
    thermoG.add(th.g, K.mesh(K.boite(84, 7, 38, 2), pied, 0, 3.5, 0));
    [-1, 1].forEach(s => thermoG.add(K.mesh(K.boite(5, 38, 20, 1.5), pied, s * 31, 21, 0)));
    thermoG.add(cyl('y', 4.5, 7 + 116 - 1, 7 + 116 + 10, 0, 0, fiche, 14));
    racine.add(thermoG);
    const contactG = new T.Group();
    contactG.add(K.fil([[120, 7 + YS + 116 + 6, -6], [120, 500, -6], [104, 580, -16], [60, 690, -30], [0, 780, -48], [-26, 835, -58], [PX - 0.6, PY - 14, PZ]], 1.3, cableMat, { radial: 8 }).mesh);
    contactG.add(K.mesh(new T.BoxGeometry(0.8, 26, 26), aluAdh, PX, PY, PZ));
    racine.add(contactG);

    /* ------------------------------------------------------------ l'air de la pièce : deux boucles de convection (froid qui descend contre la vitre) */
    const boucle = k => {
      const x0 = -14 + 14 * k, xr = 360 + 70 * k;
      const pts = [[x0 + 140, 1290], [x0 + 34, 1262], [x0, 1170], [x0 - 2, 840], [x0, 560], [x0 + 20, 506], [x0 + 90, 486], [x0 + 190, 500], [xr - 40, 570], [xr, 780], [xr + 10, 1000], [xr - 40, 1200], [xr - 170, 1290]];
      return new T.CatmullRomCurve3(pts.map(p => V(p[0], p[1], Z)), true, 'centripetal');
    };
    const grains = (() => {
      const courbes = [boucle(0), boucle(1)], PAS = 85, RAYON = 7;
      const lg = courbes.map(c => c.getLength()), nb2 = lg.map(l => Math.round(l / PAS)), N = nb2[0] + nb2[1];
      const im = new T.InstancedMesh(new T.SphereGeometry(1, 8, 6), K.lumineux(0xffffff), N);
      im.userData.sansOmbre = true; im.castShadow = false; im.frustumCulled = false;
      const ci = [], s = [];
      for (let k = 0; k < 2; k++) for (let i = 0; i < nb2[k]; i++) { ci.push(k); s.push(((i / nb2[k]) + k * 0.31) % 1 * lg[k]); }
      const m4 = new T.Matrix4(), q = new T.Quaternion(), sc = new T.Vector3(), p = new T.Vector3();
      const jaune = new T.Color(COUL_REPRIS), eau = new T.Color(COUL_EAU), col = new T.Color();
      const etat = { vitesse: 0, cond: 0 };
      const poser = () => {
        for (let i = 0; i < N; i++) {
          courbes[ci[i]].getPointAt(Math.min(0.9999, s[i] / lg[ci[i]]), p);
          /* contre la vitre, si elle est assez froide, la vapeur devient de l'eau : le grain change de couleur */
          const zone = clamp((16 - p.x) / 8, 0, 1) * etat.cond;
          col.copy(jaune).lerp(eau, zone); im.setColorAt(i, col);
          sc.setScalar(RAYON * (1 + 0.3 * zone)); m4.compose(p, q, sc); im.setMatrixAt(i, m4);
        }
        im.instanceMatrix.needsUpdate = true; im.instanceColor.needsUpdate = true;
      };
      poser();
      return { objet: im, etat, regler(a) { Object.assign(etat, a); }, animer(dt) { for (let i = 0; i < N; i++) s[i] = (s[i] + etat.vitesse * dt) % lg[ci[i]]; poser(); } };
    })();
    racine.add(grains.objet);

    /* ------------------------------------------------------------ l'état */
    const rosee = (t, rh) => { const a = 17.62, b = 243.12, g = Math.log(rh / 100) + a * t / (b + t); return b * g / (a - g); };
    const E = { t: opt.temperature !== undefined ? +opt.temperature : 27, rh: opt.rh !== undefined ? +opt.rh : 55, paroi: opt.paroi !== undefined ? +opt.paroi : 12, mise: null, c: 0, demonte: false, coupe: false };
    const lire = () => { const td = rosee(E.t, E.rh); return { t: E.t, rh: E.rh, td, paroi: E.paroi, ecart: td - E.paroi }; };
    const cible = L => L.ecart > 0.05 ? clamp(L.ecart / 4, 0.1, 1) : 0;
    const ecrireHygro = L => hy.ecran.ecrire((g, w, h) => {
      g.textAlign = 'right'; g.font = '700 ' + Math.round(h * 0.2) + 'px ' + POLICE;
      g.fillText(lcd(L.t, 1), w * 0.64, h * 0.27); g.fillText(lcd(L.rh, 1), w * 0.64, h * 0.55);
      g.textAlign = 'left'; g.font = '700 ' + Math.round(h * 0.12) + 'px ' + POLICE;
      g.fillText('°C', w * 0.67, h * 0.27); g.fillText('%HR', w * 0.67, h * 0.55);
      /* la troisième ligne : le point de rosée, calculé (en vidéo inversée quand on le regarde) */
      if (E.mise === 'td') { g.fillStyle = '#1a2a14'; g.fillRect(0, h * 0.67, w, h * 0.3); g.fillStyle = '#c9d6b3'; }
      g.textAlign = 'left'; g.font = '700 ' + Math.round(h * 0.135) + 'px ' + POLICE;
      g.fillText('Td ' + lcd(L.td, 1) + ' °C', w * 0.07, h * 0.87);
    });
    const ecrireThermo = L => th.ecran.ecrire((g, w, h) => {
      g.textAlign = 'left'; g.font = '700 ' + Math.round(h * 0.2) + 'px ' + POLICE; g.fillText('T1', w * 0.05, h * 0.26);
      g.textAlign = 'right'; g.font = '700 ' + Math.round(h * 0.5) + 'px ' + POLICE; g.fillText(lcd(L.paroi, 1), w * 0.72, h * 0.84);
      g.textAlign = 'left'; g.font = '700 ' + Math.round(h * 0.22) + 'px ' + POLICE; g.fillText('°C', w * 0.75, h * 0.84);
    });
    const cNeutre = new T.Color(0xd6eaf2), cFroid = new T.Color(0x86bde8);
    const phrase = L => {
      const base = '<strong>Air : ' + deg(L.t, 1) + ' et ' + nb(L.rh, 0) + ' % d’humidité. Point de rosée : ' + deg(L.td, 1) + '. Paroi : ' + deg(L.paroi, 1) + '.</strong> ';
      const d = Math.abs(L.ecart);
      if (L.ecart > 0.05) return base + 'La paroi est ' + deg(d, 1) + ' plus froide que le point de rosée : contre la vitre, ' + air('repris', 'l’air de la pièce') + ' ne peut plus garder toute sa vapeur. Elle se dépose en gouttes : la buée apparaît.';
      if (L.ecart >= -0.05) return base + 'La paroi est juste au point de rosée : la buée est sur le point d’apparaître.';
      return base + 'La paroi est ' + deg(d, 1) + ' plus chaude que le point de rosée : la vapeur reste dans ' + air('repris', 'l’air de la pièce') + '. Pas de buée.';
    };
    const maj = () => {
      const L = lire();
      ecrireHygro(L); ecrireThermo(L);
      const tint = clamp((24 - L.paroi) / 18, 0, 1);
      verreInt.color.copy(cNeutre).lerp(cFroid, tint); verreInt.opacity = 0.22 + 0.16 * tint;
      couche3.material.opacity = clamp((L.t - L.paroi) / 14, 0, 1) * 0.75;
      grains.regler({ vitesse: clamp(14 + 7 * Math.max(0, L.t - L.paroi), 14, 120), cond: cible(L) > 0 ? 1 : 0 });
      ctx.mesures([
        { libelle: 'Température de l’air', valeur: deg(L.t, 1) },
        { libelle: 'Humidité relative', valeur: nb(L.rh, 0) + ' %' },
        { libelle: 'Point de rosée', valeur: deg(L.td, 1) },
        { libelle: 'Température de la paroi', valeur: deg(L.paroi, 1) },
        { libelle: 'Paroi, par rapport au point de rosée', valeur: L.ecart > 0.05 ? deg(L.ecart, 1) + ' plus froide : buée' : L.ecart >= -0.05 ? 'au point de rosée' : deg(-L.ecart, 1) + ' plus chaude : pas de buée' }
      ]);
      ctx.dire(phrase(L));
    };

    /* ------------------------------------------------------------ la coupe */
    const exclus = () => [facesMur, facesCadre, facesI, facesE, coucheG, grains.objet, standG, hygroG, thermoG, contactG, sol];
    const poserCoupe = coupeur(racine, exclus);
    const basculerCoupe = on => { E.coupe = on; poserCoupe(on); [facesMur, facesCadre, facesI, facesE, coucheG].forEach(g => { g.visible = on; }); };
    E.c = cible(lire()); poserBuee(E.c); maj();

    /* ------------------------------------------------------------ pièces */
    const pieces = [
      { id: 'air', nom: 'L’air de la pièce', objets: [grains.objet], ancre: [200, 800, Z], desc: 'Des grains jaunes : l’air du local. Contre la vitre froide, il se refroidit et descend ; il remonte plus loin, au chaud.' },
      { id: 'sonde', nom: 'La sonde d’humidité', objets: [sondeG], ancre: [XS + 8, HY + 250, 0], desc: 'Un capteur d’humidité sous un petit capuchon percé de trous : l’air entre et touche le capteur. Elle est loin de la vitre, dans l’air de la pièce.' },
      { id: 'hygro', nom: 'Le thermo-hygromètre', objets: [corpsG], ancre: [XS + 14, HY + 70, 14], desc: 'Il affiche la température de l’air, l’humidité relative et le point de rosée. Le point de rosée est calculé : l’appareil ne le mesure pas.' },
      { id: 'pied', nom: 'Le pied de mesure', objets: [standG], ancre: [XS, 400, ZPIED], desc: 'Un pied lourd tient l’appareil à hauteur d’occupant, loin des murs et des courants d’air.' },
      { id: 'contact', nom: 'La sonde de contact', objets: [contactG], ancre: [PX, PY, PZ], desc: 'Un fil de thermocouple tenu sur la vitre par un morceau d’adhésif. Il prend la température de la surface, côté pièce.' },
      { id: 'thermo', nom: 'Le thermomètre de surface', objets: [thermoG], ancre: [120, YS + 80, 8], desc: 'Il lit la température de la vitre, au bout du fil. Posé sur l’appui, il se lit sans toucher à la sonde.' },
      { id: 'vitre', nom: 'Le vitrage', objets: [verreI, verreE], ancre: [XV - 10, 600, -300], desc: 'Un double vitrage : deux verres, une lame d’air entre eux. Le verre côté pièce est la paroi froide.' },
      { id: 'buee', nom: 'La buée', objets: [buee, voileBuee], ancre: [XV, 1100, -250], desc: 'De fines gouttes d’eau déposées sur le verre. Elles apparaissent quand la vitre est plus froide que le point de rosée de l’air.' },
      { id: 'couche', nom: 'L’air refroidi contre la vitre', objets: [couche3], ancre: [XV + 20, 900, 0], desc: 'Une mince couche d’air, au contact du verre, prend la température du verre. C’est là que la vapeur peut se déposer.' },
      { id: 'cadre', nom: 'Le cadre et l’appui', objets: [cadreG], ancre: [60, YS, 400], desc: 'Un cadre en PVC tient le vitrage. L’appui de fenêtre sert de petite tablette pour le thermomètre.' },
      { id: 'mur', nom: 'Le mur', objets: [mur], ancre: [-150, 130, -400], desc: 'De dehors vers la pièce : le bloc, l’isolant, le plâtre. On le voit coupé : chaque matière a ses hachures.' }
    ];

    const commandes = [
      { id: 'temperature', type: 'curseur', libelle: 'Température sèche', min: -5, max: 40, pas: 0.5, unite: '°C', valeur: E.t },
      { id: 'rh', type: 'curseur', libelle: 'Humidité relative', min: 10, max: 100, pas: 1, unite: '%', valeur: E.rh },
      { id: 'paroi', type: 'curseur', libelle: 'Température de la paroi', min: -5, max: 30, pas: 0.5, unite: '°C', valeur: E.paroi }
    ];
    const T0 = E.t, R0 = E.rh, P0 = E.paroi;
    const sensDe = (t, rh, p) => [['temperature', t], ['rh', rh], ['paroi', p]];
    const tdTxt = (t, rh) => deg(rosee(t, rh), 1);
    const etapes = [
      { titre: 'De la buée sur une vitre froide', piece: 'buee', voirDedans: false, eclate: false, actions: [...sensDe(T0, R0, P0), ['mise', null]],
        vue: { azimut: 50, elevation: 12, zoom: 1.5, cible: [-30, 760, 0] },
        texte: 'Personne n’a versé d’eau sur la vitre : elle vient de ' + air('repris', 'l’air de la pièce') + ', où elle était invisible, en vapeur. Deux appareils vont dire pourquoi elle apparaît ici.' },
      { titre: 'On mesure l’air : température et humidité', piece: 'sonde', voirDedans: false, eclate: false, actions: [...sensDe(T0, R0, P0), ['mise', null]],
        vue: { azimut: 32, elevation: 10, zoom: 4.2, cible: [XS + 10, HY + 190, 0] },
        texte: 'La sonde est loin de la vitre, dans ' + air('repris', 'l’air de la pièce') + '. Elle relève la température (' + deg(T0, 1) + ') et l’humidité relative (' + nb(R0, 0) + ' %). On attend que les chiffres ne bougent plus.' },
      { titre: 'L’appareil calcule le point de rosée', piece: 'hygro', voirDedans: false, eclate: false, actions: [...sensDe(T0, R0, P0), ['mise', 'td']],
        vue: { azimut: 28, elevation: 8, zoom: 4.6, cible: [XS + 12, HY + 80, 0] },
        texte: 'Le point de rosée n’est pas mesuré : l’appareil le calcule avec les deux valeurs. Ici, ' + tdTxt(T0, R0) + ' : c’est la température à partir de laquelle cet air commence à déposer de l’eau.' },
      { titre: 'On mesure la paroi', piece: 'contact', voirDedans: false, eclate: false, actions: [...sensDe(T0, R0, P0), ['mise', null]],
        vue: { azimut: 44, elevation: 12, zoom: 2.3, cible: [40, 640, -20] },
        texte: 'Un fil de thermocouple, tenu par un adhésif, touche la vitre côté pièce. Le thermomètre de surface, posé sur l’appui, affiche ' + deg(P0, 1) + '.' },
      { titre: 'Paroi plus froide que le point de rosée : l’eau se dépose', piece: 'buee', voirDedans: true, eclate: false, actions: [...sensDe(T0, R0, P0), ['mise', null]],
        vue: { azimut: 22, elevation: 8, zoom: 6.5, cible: [-10, 700, 0] },
        texte: deg(P0, 1) + ' est moins que ' + tdTxt(T0, R0) + '. Contre la vitre, l’air se refroidit sous son point de rosée : ses grains deviennent bleu clair et la vapeur se dépose en gouttes sur le verre.' },
      { titre: 'Paroi plus chaude que le point de rosée : rien', piece: 'vitre', voirDedans: true, eclate: false, actions: [...sensDe(T0, R0, 20), ['mise', null]],
        vue: { azimut: 22, elevation: 8, zoom: 6.5, cible: [-10, 700, 0] },
        texte: 'À ' + deg(20, 1) + ', la vitre est plus chaude que ' + tdTxt(T0, R0) + '. L’air qui la touche ne se refroidit pas assez pour déposer sa vapeur : il n’y a plus d’eau, les gouttes disparaissent.' },
      { titre: 'Plus d’humidité : le point de rosée monte, la buée revient', piece: 'hygro', voirDedans: false, eclate: false, actions: [...sensDe(T0, 80, 20), ['mise', 'td']],
        vue: { azimut: 48, elevation: 12, zoom: 1.35, cible: [330, 640, 0] },
        texte: 'À ' + nb(80, 0) + ' % d’humidité, le point de rosée monte à ' + tdTxt(T0, 80) + '. La vitre, restée à ' + deg(20, 1) + ', est maintenant sous ce point : la buée revient, sans que la vitre ait changé.' }
    ];
    const eclate = [
      { objets: [thermoG, contactG], vers: [150, 380, 0], debut: 0, fin: 0.45 },
      { objets: [hygroG], vers: [0, 360, 0], debut: 0.15, fin: 0.6 },
      { objets: [standG], vers: [330, 0, 0], debut: 0.45, fin: 0.85 },
      { objets: [vitreI], vers: [200, 0, 0], debut: 0.5, fin: 1 },
      { objets: [vitreE], vers: [-200, 0, 0], debut: 0.5, fin: 1 }
    ];

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 38, elevation: 16, zoom: 0.8, cible: [250, 620, 0] },
      vue: { azimut: 50, elevation: 13, cadre: [mur, cadreG, standG, hygroG], marge: 0.76 },
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'temperature') E.t = +v;
        if (id === 'rh') E.rh = +v;
        if (id === 'paroi') E.paroi = +v;
        if (id === 'mise') E.mise = v;
        maj();
      },
      surEclate(on) { E.demonte = on; grains.objet.visible = !on; },
      animer(dt) {
        let bouge = false;
        const cb = cible(lire());
        if (Math.abs(E.c - cb) > 0.002) { E.c = K.vers(E.c, cb, 1.6, dt); poserBuee(E.c); bouge = true; }
        else if (E.c !== cb) { E.c = cb; poserBuee(E.c); }
        if (!E.demonte) { grains.animer(dt); bouge = true; }
        return bouge;
      }
    };
  }, { famille: 'instruments', titre: 'Le thermo-hygromètre et la vitre froide', stations: ['mesure-humidite'] });

  /* ====================================================================== LA MALLETTE DE MESURE
     Repère : X de gauche à droite, Y vers le haut, Z vers l'avant (+Z = le côté qu'on voit). La mallette est
     ouverte : la cuvette devant, le couvercle dressé derrière. Dans la cuvette, une mousse à deux couches : celle
     du dessus est creusée, un logement par appareil. Les appareils y sont couchés, afficheur vers le haut.
     « Sortir » un appareil = le monter tout droit de 240 mm au-dessus de la mallette (éclaté vertical) ; il
     s'allume, et son petit geste se voit (l'hélice tourne, les chiffres bougent, la canne se déploie).
     Rien n'est coupé : une mallette ouverte se lit sans coupe. */
  Electro3D.definir('mallette', (T, K, ctx) => {
    const { M, V, C, boite, cyl, nb, air, clamp, lcd, ecranDe, POLICE, appareil } = trousse(T, K);
    const racine = new T.Group();

    /* ------------------------------------------------------------ les cotes */
    const FL = 52, FT = 100, RIM = 125;          /* fond des logements · dessus de la mousse · bord de la cuvette */
    const IX = 388, IZ = 238;                    /* l'intérieur de la cuvette */
    const LIFT = 280;                            /* de combien un appareil sort */
    const D = Math.PI / 180;

    /* ------------------------------------------------------------ matières */
    const coque = K.propre(K.plastique(0x3b4148, 0.55)), alu = K.propre(M.aluminium), noir = K.propre(M.plastiqueNoir), acier = K.propre(M.acier);
    const mousseB = K.propre(K.plastique(0x1a1d21, 0.95)), mousseH = K.propre(K.plastique(0x262a30, 0.95)), mousseC = K.propre(K.plastique(0x30353b, 0.95));
    const sangle = K.propre(K.plastique(0x1f2226, 0.8)), pochette = K.propre(K.plastique(0x6b7280, 0.8));

    /* ------------------------------------------------------------ la cuvette */
    const cuvette = new T.Group();
    cuvette.add(boite(-400, 400, 0, 8, -270, 270, coque, 3), boite(-400, -388, 0, RIM, -270, 270, coque, 3), boite(388, 400, 0, RIM, -270, 270, coque, 3),
      boite(-388, 388, 0, RIM, -270, -258, coque, 3), boite(-388, 388, 0, RIM, 258, 270, coque, 3));
    /* le liseré d'aluminium au bord, les coins en caoutchouc, deux fermetures et la poignée, devant */
    cuvette.add(boite(-402, 402, RIM - 4, RIM + 3, -272, -254, alu), boite(-402, 402, RIM - 4, RIM + 3, 254, 272, alu),
      boite(-402, -384, RIM - 4, RIM + 3, -272, 272, alu), boite(384, 402, RIM - 4, RIM + 3, -272, 272, alu));
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => cuvette.add(boite(sx * 384 - 22, sx * 384 + 22, 0, 46, sz * 256 - 22, sz * 256 + 22, noir, 5)));
    [-220, 220].forEach(x => cuvette.add(boite(x - 28, x + 28, 62, 118, 270, 284, alu, 3), boite(x - 18, x + 18, 100, 108, 284, 288, noir, 1.5)));
    cuvette.add(boite(-70, 70, 66, 78, 271, 288, noir, 4), boite(-70, -58, 66, 112, 271, 284, noir, 3), boite(58, 70, 66, 112, 271, 284, noir, 3));
    racine.add(cuvette);

    /* ------------------------------------------------------------ le couvercle : dressé derrière, charnière sur le bord arrière */
    const LW = 400, LL = 540, LH = 60;
    const couvercle = new T.Group(); couvercle.position.set(0, RIM, -270); couvercle.rotation.x = -100 * D;
    couvercle.add(boite(-LW, LW, 48, LH, 0, LL, coque, 4), boite(-LW, -LW + 12, 0, LH, 0, LL, coque, 3), boite(LW - 12, LW, 0, LH, 0, LL, coque, 3),
      boite(-LW + 12, LW - 12, 0, LH, 0, 12, coque, 3), boite(-LW + 12, LW - 12, 0, LH, LL - 12, LL, coque, 3));
    couvercle.add(boite(-LW + 12, LW - 12, 22, 48, 12, LL - 12, mousseC));
    couvercle.add(boite(-340, 340, 14, 22, 170, 186, sangle), boite(-340, 340, 14, 22, 350, 366, sangle), boite(-320, -80, 18, 22, 230, 420, pochette));
    racine.add(couvercle);
    [-300, 300].forEach(x => cuvette.add(cyl('x', 9, x - 35, x + 35, RIM, -270, alu, 16)));

    /* ------------------------------------------------------------ la mousse : une couche pleine, une couche creusée */
    const rr = (x0, x1, z0, z1, r) => {
      const p = [], arc = (cx, cz, a0) => { for (let k = 0; k <= 6; k++) { const a = a0 + k * Math.PI / 12; p.push(new T.Vector2(cx + r * Math.cos(a), -(cz + r * Math.sin(a)))); } };
      arc(x1 - r, z1 - r, 0); arc(x0 + r, z1 - r, Math.PI / 2); arc(x0 + r, z0 + r, Math.PI); arc(x1 - r, z0 + r, 1.5 * Math.PI);
      return p;
    };
    const polyg = pts => pts.map(([x, z]) => new T.Vector2(x, -z));
    const cercle = (cx, cz, r) => { const p = []; for (let k = 0; k < 56; k++) { const a = k * Math.PI * 2 / 56; p.push(new T.Vector2(cx + r * Math.cos(a), -(cz + r * Math.sin(a)))); } return p; };
    const LOGEMENTS = [
      rr(-374, -146, -232, -138, 14),                                    /* l'anémomètre à hélice */
      rr(-124, 162, -222, -148, 12),                                     /* le thermo-hygromètre */
      rr(62, 376, -128, 16, 14),                                         /* l'anémomètre à fil chaud, sa canne et son câble */
      polyg([[56, 36], [348, 36], [348, 232], [316, 232], [316, 66], [56, 66]]),   /* le tube de Pitot */
      polyg([[-68, 84], [110, 84], [110, 100], [310, 100], [310, 232], [96, 232], [96, 156], [-68, 156]]),   /* le micromanomètre et ses tuyaux */
      cercle(-215, 75, 136)                                              /* le cône de mesure */
    ];
    const formeMousse = new T.Shape(rr(-IX, IX, -IZ, IZ, 10));
    LOGEMENTS.forEach(h => formeMousse.holes.push(new T.Path(h)));
    const geoMousse = new T.ExtrudeGeometry(formeMousse, { depth: FT - FL, bevelEnabled: false }); geoMousse.rotateX(-Math.PI / 2);
    const mousseHaut = new T.Mesh(geoMousse, mousseH); mousseHaut.position.y = FL;
    const mousseBas = boite(-IX, IX, 8, FL, -IZ, IZ, mousseB);
    racine.add(mousseBas, mousseHaut);

    /* ------------------------------------------------------------ les petites briques communes */
    const inox = K.propre(K.plastique(0xb4bbc2, 0.4));         /* clair : il se lit sur la mousse sombre */
    const filtreMat = (() => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = '#a9b0b7'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#4a525b';
      for (let i = 4; i < 64; i += 16) for (let j = 4; j < 64; j += 16) { x.beginPath(); x.arc(i, j, 3.2, 0, 6.283); x.fill(); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(6, 5);
      return new T.MeshStandardMaterial({ map: t, roughness: 0.5, metalness: 0.15 });
    })();
    /* un appareil couché : son pied vers l'arrière-gauche, sa face (afficheur) vers le haut.
       Le groupe rend le repère « debout » (pied en y = 0, face vers +Z) à poser dans la mousse. */
    const couche = (x, y, z, vers) => { const g = new T.Group(); g.rotation.set(-Math.PI / 2, vers, 0, 'YXZ'); g.position.set(x, y, z); return g; };
    const VERS_DROITE = -Math.PI / 2, VERS_GAUCHE = Math.PI / 2;
    const ecranOff = e => e.ecrire((g, w, h) => { g.fillStyle = '#9aa28f'; g.fillRect(0, 0, w, h); });
    /* une hélice : un moyeu, des pales vrillées ; son axe est Z (à tourner autour de Z) */
    const helice = (n, R, mat, matMoyeu) => {
      const g = new T.Group();
      g.add(cyl('z', 6, -7, 7, 0, 0, matMoyeu, 16));
      for (let k = 0; k < n; k++) {
        const b = new T.Group(); b.rotation.z = k * 2 * Math.PI / n;
        const p = K.mesh(new T.BoxGeometry(R - 6, 11, 1.6), mat, 6 + (R - 6) / 2, 0, 0); p.rotation.x = 0.5; b.add(p); g.add(b);
      }
      return g;
    };

    const items = {};            /* id → { g, lift, u, ecran, ecrire(), geste(dt) } */
    const E = { sorti: 'aucun', eclate: false, t: 0 };
    /* un appareil : « interieur » porte les pièces, posées à leur place dans la mousse ; « g » est ce qui monte
       (tout droit de LIFT) et se penche vers le spectateur autour de son centre, pour qu'on lise l'afficheur */
    /* « debout » : l'appareil couché se dresse (x → y → z : un tiers de tour autour de la diagonale), sa tête en haut
       et son afficheur tourné vers le spectateur ; sinon il se penche seulement de « penche » radians */
    const qDebout = new T.Quaternion().setFromAxisAngle(V(1, 1, 1).normalize(), 2 * Math.PI / 3);
    const item = (id, interieur, pivot, debout, penche, ecran, ecrire, geste) => {
      const g = new T.Group(); g.position.set(pivot[0], pivot[1], pivot[2]);
      interieur.position.set(-pivot[0], -pivot[1], -pivot[2]); g.add(interieur);
      items[id] = { g, pivot, debout, penche, ecran, ecrire, geste, u: 0 }; racine.add(g); return items[id];
    };
    const actif = id => E.sorti === id || E.eclate;

    /* ------------------------------------------------------------ 1. l'anémomètre à hélice : une hélice en tête, en cage */
    const heliceG = new T.Group();
    {
      const lie = couche(-366, FL + 14, -185, VERS_DROITE);
      const ap = appareil({ w: 60, h: 120, d: 28, botte: 0x2d3238, coque: 0xf2c230, fenetre: { w: 40, h: 34, y: 78 }, touches: ['MODE', 'HOLD'], pasTouche: 22, rTouche: 6, yTouche: 32 });
      lie.add(ap.g);
      lie.add(cyl('y', 13, 118, 134, 0, 0, noir, 20));
      const cage = K.mesh(K.anneau(40, 36, 20, 44), K.propre(M.plastiqueNoir), 0, 172, 0); cage.rotation.x = Math.PI / 2; lie.add(cage);
      lie.add(boite(-38, 38, 168, 176, -9, -5, K.propre(M.plastiqueNoir)), cyl('y', 9, 130, 168, 0, -7, noir, 12));
      const vane = helice(5, 33, K.propre(K.plastique(0xe8ebee, 0.4)), noir); vane.position.set(0, 172, 0); lie.add(vane);
      heliceG.add(lie);
      item('helice', heliceG, [-260, FL + 14, -185], true, 0, ap.ecran, () => {
        const on = actif('helice') && items.helice.u > 0.5, v = 7.8 + 0.25 * Math.sin(E.t * 2.1);
        if (!on) return ecranOff(ap.ecran);
        ap.ecran.ecrire((g, w, h) => {
          g.textAlign = 'left'; g.font = '700 ' + Math.round(h * 0.2) + 'px ' + POLICE; g.fillText('AVG', w * 0.06, h * 0.26);
          g.textAlign = 'right'; g.font = '700 ' + Math.round(h * 0.52) + 'px ' + POLICE; g.fillText(lcd(v, 1), w * 0.72, h * 0.8);
          g.textAlign = 'left'; g.font = '700 ' + Math.round(h * 0.2) + 'px ' + POLICE; g.fillText('m/s', w * 0.75, h * 0.8);
        });
      }, dt => { if (actif('helice')) vane.rotation.z -= 14 * dt * Math.min(1, items.helice.u * 1.5); });
    }

    /* ------------------------------------------------------------ 2. le thermo-hygromètre : une sonde capacitive en tête */
    const hygroG = new T.Group();
    {
      const lie = couche(-120, FL + 15, -185, VERS_DROITE);
      const ap = appareil({ w: 62, h: 146, d: 30, botte: 0x2d3238, coque: 0xe6e8e3, fenetre: { w: 44, h: 52, y: 104 }, touches: ['MODE', 'HOLD', 'MAX'], pasTouche: 17, rTouche: 5.4, yTouche: 38 });
      lie.add(ap.g, cyl('y', 9, 144, 156, 0, 0, noir, 20), cyl('y', 6.2, 156, 206, 0, 0, inox, 18), cyl('y', 9, 206, 211, 0, 0, inox, 18), cyl('y', 8, 211, 266, 0, 0, filtreMat, 22));
      lie.add(K.mesh(new T.SphereGeometry(8, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), filtreMat, 0, 266, 0));
      hygroG.add(lie);
      item('hygro', hygroG, [17, FL + 15, -185], true, 0, ap.ecran, () => {
        if (!(actif('hygro') && items.hygro.u > 0.5)) return ecranOff(ap.ecran);
        ap.ecran.ecrire((g, w, h) => {
          g.textAlign = 'right'; g.font = '700 ' + Math.round(h * 0.2) + 'px ' + POLICE;
          g.fillText('27,0', w * 0.64, h * 0.27); g.fillText('55,0', w * 0.64, h * 0.55);
          g.textAlign = 'left'; g.font = '700 ' + Math.round(h * 0.12) + 'px ' + POLICE; g.fillText('°C', w * 0.67, h * 0.27); g.fillText('%HR', w * 0.67, h * 0.55);
          g.font = '700 ' + Math.round(h * 0.135) + 'px ' + POLICE; g.fillText('Td 17,2 °C', w * 0.07, h * 0.87);
        });
      }, () => {});
    }

    /* ------------------------------------------------------------ 3. l'anémomètre à fil chaud : un boîtier, une canne télescopique, un câble */
    const filG = new T.Group();
    let poseCanne = () => {};
    {
      const lie = couche(70, FL + 13, -45, VERS_DROITE);
      const ap = appareil({ w: 58, h: 118, d: 26, botte: 0x1b3a63, coque: 0xdfe3e6, fenetre: { w: 42, h: 30, y: 80 }, touches: ['ZERO', 'HOLD', 'AVG'], pasTouche: 17, rTouche: 5.2, yTouche: 36 });
      ap.g.position.x = -48; lie.add(ap.g);
      const poignee = K.propre(M.plastiqueBleu), tige = K.propre(M.acier), tigeClaire = K.propre(M.acier); tigeClaire.color.setHex(0xdde2e6);
      const fil = K.propre(K.plastique(0xc9451a, 0.4)); fil.emissive.setHex(0xe8711a); fil.emissiveIntensity = 0.9;
      lie.add(cyl('y', 12.5, 0, 100, 40, 0, poignee, 24), cyl('y', 8, 100, 108, 40, 0, poignee, 16));
      for (let y = 12; y < 96; y += 14) lie.add(cyl('y', 13.1, y, y + 4, 40, 0, poignee, 24));
      const tA = new T.Mesh(new T.CylinderGeometry(6.5, 6.5, 1, 20), tigeClaire), tB = new T.Mesh(new T.CylinderGeometry(5, 5, 1, 20), tige), tC = new T.Mesh(new T.CylinderGeometry(3.2, 3.2, 1, 16), tige);
      lie.add(tA, tB, tC);
      const tete = new T.Group();
      tete.add(K.mesh(new T.SphereGeometry(4.2, 14, 10), noir, 0, 4.2, 0), cyl('y', 4.2, 4.2, 22, 0, 0, noir, 14));
      const bague = new T.Mesh(new T.TorusGeometry(4.5, 0.8, 6, 16), fil); bague.rotation.x = Math.PI / 2; bague.position.y = 12; tete.add(bague);
      lie.add(tete);
      /* la canne : rentrée à 300 mm (au repos), sortie à 440 mm quand l'appareil est sorti */
      const pose = (m, y0, y1) => { m.scale.y = Math.max(0.001, y1 - y0); m.position.set(40, (y0 + y1) / 2, 0); };
      poseCanne = e => {
        const L = 300 + 140 * e;
        pose(tA, 108, 208); pose(tB, 190, 190 + (L - 300) * 0.5 + 100); pose(tC, 190 + (L - 300) * 0.5 + 90, L);
        tete.position.set(40, L, 0);
        fil.emissiveIntensity = 0.5 + 0.5 * e;
      };
      poseCanne(0);
      /* le câble : de la prise latérale du boîtier au bas de la poignée */
      lie.add(K.fil([[-19, 38, 0], [-6, 30, 6], [10, 52, 8], [28, 36, 0]], 1.6, K.propre(M.caoutchouc), { radial: 8 }).mesh);
      filG.add(lie);
      item('filchaud', filG, [235, FL + 13, -60], true, 0, ap.ecran, () => {
        if (!(actif('filchaud') && items.filchaud.u > 0.5)) return ecranOff(ap.ecran);
        const v = 0.35 + 0.04 * Math.sin(E.t * 1.7);
        ap.ecran.ecrire((g, w, h) => {
          g.textAlign = 'left'; g.font = '700 ' + Math.round(h * 0.2) + 'px ' + POLICE; g.fillText('AVG', w * 0.06, h * 0.26);
          g.textAlign = 'right'; g.font = '700 ' + Math.round(h * 0.5) + 'px ' + POLICE; g.fillText(lcd(v, 2), w * 0.72, h * 0.84);
          g.textAlign = 'left'; g.font = '700 ' + Math.round(h * 0.2) + 'px ' + POLICE; g.fillText('m/s', w * 0.75, h * 0.84);
        });
      }, () => { poseCanne(clamp((items.filchaud.u - 0.3) / 0.7, 0, 1)); });
    }

    /* ------------------------------------------------------------ 4. le micromanomètre, son tube de Pitot et ses deux tuyaux */
    const manoG = new T.Group();
    {
      const lie = couche(-62, FL + 15, 120, VERS_DROITE);
      const ap = appareil({ w: 62, h: 140, d: 30, botte: 0x8a3a2c, coque: 0xe6e8e3, fenetre: { w: 44, h: 36, y: 94 }, touches: ['ZERO', 'HOLD', 'MODE'], pasTouche: 17, rTouche: 5.2, yTouche: 40 });
      lie.add(ap.g);
      [[-14, '+'], [14, '−']].forEach(([dx, rep]) => {
        lie.add(cyl('y', 3.6, 138, 152, dx, 0, acier, 14), cyl('y', 4.8, 146, 149, dx, 0, acier, 14));
        const t = K.gravure(rep, 7, { couleur: '#e8e6df' }); t.position.set(dx, 128, 15.4); lie.add(t);
      });
      manoG.add(lie);
      /* le tube de Pitot, couché dans son logement : une tige, un coude, une poignée à deux raccords crantés */
      const YP = FL + 11.5, XL = 332;
      const chemin = new T.CurvePath();
      chemin.add(new T.LineCurve3(V(60, YP, 51), V(XL - 16, YP, 51)));
      chemin.add(new T.QuadraticBezierCurve3(V(XL - 16, YP, 51), V(XL, YP, 51), V(XL, YP, 67)));
      chemin.add(new T.LineCurve3(V(XL, YP, 67), V(XL, YP, 165)));
      manoG.add(new T.Mesh(new T.TubeGeometry(chemin, 90, 5, 18, false), inox));
      manoG.add(K.mesh(new T.SphereGeometry(5, 14, 10), inox, 60, YP, 51));
      const poigneeMat = K.propre(M.plastiqueMarine), barbeRouge = K.propre(M.plastiqueRouge), barbeBleue = K.propre(M.plastiqueMarine);
      manoG.add(cyl('z', 11, 165, 195, XL, YP, poigneeMat, 24));
      [[XL - 7, barbeRouge], [XL + 7, barbeBleue]].forEach(([x, m]) => {
        manoG.add(cyl('z', 3.2, 195, 214, x, YP, m, 12));
        [201, 208].forEach(z => manoG.add(cyl('z', 4.4, z - 1.5, z + 1.5, x, YP, m, 12)));
      });
      /* les deux tuyaux : rouge (pression totale) de « + », bleu foncé (pression statique) de « − » */
      const tuyau = (pts, mat) => K.fil(pts, 3.6, mat, { radial: 10 }).mesh;
      const YT = FL + 6;
      manoG.add(tuyau([[91, FL + 15, 106], [112, YT + 4, 114], [160, YT, 140], [230, YT, 172], [300, YT, 198], [XL - 7, YP, 208], [XL - 7, YP, 214]], K.propre(K.plastique(0xc0392b, 0.4))));
      manoG.add(tuyau([[91, FL + 15, 134], [118, YT + 4, 150], [175, YT, 186], [240, YT, 214], [300, YT, 222], [XL + 7, YP, 224], [XL + 7, YP, 214]], K.propre(K.plastique(0x1b3a63, 0.4))));
      item('mano', manoG, [140, FL + 10, 140], true, 0, ap.ecran, () => {
        if (!(actif('mano') && items.mano.u > 0.5)) return ecranOff(ap.ecran);
        const pa = 45 + 1.6 * Math.sin(E.t * 2.3), v = Math.sqrt(2 * pa / 1.2);
        ap.ecran.ecrire((g, w, h) => {
          g.textAlign = 'right'; g.font = '700 ' + Math.round(h * 0.54) + 'px ' + POLICE; g.fillText(String(Math.round(pa)), w * 0.78, h * 0.62);
          g.textAlign = 'left'; g.font = '700 ' + Math.round(h * 0.23) + 'px ' + POLICE; g.fillText('Pa', w * 0.8, h * 0.62);
          g.font = '700 ' + Math.round(h * 0.2) + 'px ' + POLICE; g.fillText('v ' + lcd(v, 1) + ' m/s', w * 0.05, h * 0.92);
        });
      }, () => {});
    }

    /* ------------------------------------------------------------ 5. le cône de mesure : un entonnoir de toile, une hélice, un afficheur */
    const coneG = new T.Group();
    {
      const toile = C(K.plastique(0x2f3a4a, 0.85)), mousseJoint = K.propre(K.plastique(0x1f2226, 0.95));
      const cone = new T.Group(); cone.position.set(-215, FL, 75);
      cone.add(new T.Mesh(new T.LatheGeometry([[130, 10], [127, 12], [58, 78], [54, 82]].map(([r, y]) => new T.Vector2(r, y)), 56), toile));
      cone.add(K.mesh(K.anneau(134, 118, 10, 56), mousseJoint, 0, 5, 0));
      { const bague = new T.Mesh(new T.TorusGeometry(130, 4.5, 8, 64), alu); bague.rotation.x = Math.PI / 2; bague.position.y = 14; cone.add(bague); }
      cone.add(K.mesh(K.anneau(58, 52, 26, 40), K.propre(M.aluminium), 0, 91, 0));
      /* l'hélice dans le col, vue du dessus, sur son croisillon */
      const vane = new T.Group(); vane.position.y = 94; vane.rotation.x = -Math.PI / 2;
      const h = helice(5, 48, K.propre(K.plastique(0xe8ebee, 0.4)), noir); vane.add(h); cone.add(vane);
      cone.add(boite(-52, 52, 85, 89, -3, 3, noir), boite(-3, 3, 85, 89, -52, 52, noir));
      /* l'afficheur, à l'avant du col */
      const aff = appareil({ w: 64, h: 44, d: 20, botte: 0x2d3238, coque: 0xe6e8e3, fenetre: { w: 44, h: 22, y: 26 }, touches: ['HOLD'], pasTouche: 20, rTouche: 4.8, yTouche: 9 });
      aff.g.position.set(0, 62, 66); aff.g.rotation.x = -0.35; cone.add(aff.g);
      coneG.add(cone);
      item('cone', coneG, [-215, FL + 40, 75], false, 0.3, aff.ecran, () => {
        if (!(actif('cone') && items.cone.u > 0.5)) return ecranOff(aff.ecran);
        const q = 150 + 3 * Math.sin(E.t * 1.9);
        aff.ecran.ecrire((g, w, hh) => {
          g.textAlign = 'right'; g.font = '700 ' + Math.round(hh * 0.62) + 'px ' + POLICE; g.fillText(String(Math.round(q)), w * 0.66, hh * 0.76);
          g.textAlign = 'left'; g.font = '700 ' + Math.round(hh * 0.26) + 'px ' + POLICE; g.fillText('m³/h', w * 0.68, hh * 0.76);
        });
      }, dt => { if (actif('cone')) h.rotation.z -= 9 * dt * Math.min(1, items.cone.u * 1.5); });
    }
    const ordre = ['helice', 'hygro', 'filchaud', 'mano', 'cone'];

    /* ------------------------------------------------------------ l'état affiché */
    const FICHE = {
      aucun: null,
      helice: { nom: 'L’anémomètre à hélice', grandeur: 'La vitesse de l’air', unite: 'm/s', ou: 'Vitesses élevées : gaine principale, cône sur une bouche',
        texte: '<strong>Anémomètre à hélice : la vitesse de l’air, en m/s.</strong> L’air fait tourner la petite hélice : plus elle tourne vite, plus l’air va vite. Solide, il se choisit pour les vitesses élevées : dans une gaine principale, ou au bout d’un cône sur une bouche.' },
      filchaud: { nom: 'L’anémomètre à fil chaud', grandeur: 'La vitesse de l’air, surtout faible', unite: 'm/s', ou: 'Gaine calme, devant une bouche d’extraction',
        texte: '<strong>Anémomètre à fil chaud : la vitesse de l’air, en m/s, même très faible.</strong> Un fil très fin est chauffé ; l’air qui passe le refroidit, et l’appareil en déduit la vitesse. On le choisit pour une gaine calme ou devant une bouche d’extraction. Il est fragile et craint la poussière.' },
      mano: { nom: 'Le micromanomètre', grandeur: 'Un écart de pression', unite: 'Pa (pascal)', ou: 'Deux prises : aux bornes d’un filtre, gaine et local',
        texte: '<strong>Micromanomètre : un écart de pression, en pascals (Pa).</strong> Il compare deux prises : l’écart aux bornes d’un filtre, ou entre l’intérieur d’une gaine et le local. Avec un tube de Pitot et ses deux tuyaux, il donne aussi la vitesse de l’air. Pour une différence de pression, c’est lui.' },
      hygro: { nom: 'Le thermo-hygromètre', grandeur: 'La température et l’humidité de l’air', unite: '°C et % HR', ou: 'L’air d’un local, loin des parois et des courants d’air',
        texte: '<strong>Thermo-hygromètre : la température (°C) et l’humidité relative (%) de l’air.</strong> Il calcule aussi le point de rosée. On le choisit pour l’air d’un local. La sonde demande plusieurs minutes pour se stabiliser : on attend avant de lire.' },
      cone: { nom: 'Le cône de mesure', grandeur: 'Le débit d’une bouche', unite: 'm³/h', ou: 'Posé sur une bouche de soufflage ou d’extraction',
        texte: '<strong>Cône de mesure : le débit d’une bouche, en m³/h.</strong> Posé sur la bouche, il rassemble tout l’air dans un passage de section connue : l’hélice lit la vitesse, l’appareil en déduit le débit. On le choisit pour contrôler une bouche de soufflage ou d’extraction.' }
    };
    const maj = () => {
      const f = FICHE[E.sorti];
      if (!f) {
        ctx.mesures([
          { libelle: 'Dans la mallette', valeur: '5 appareils' },
          { libelle: 'On commence par', valeur: 'la grandeur et son unité' },
          { libelle: 'Puis', valeur: 'le point de mesure, et enfin l’appareil' }
        ]);
        ctx.dire('<strong>La mallette est ouverte : chaque appareil est rangé dans son logement.</strong> On ne choisit pas un appareil parce qu’il est là : on écrit d’abord ce qu’on cherche (vitesse, débit, écart de pression, température, humidité), puis où on le mesure.');
      } else {
        ctx.mesures([{ libelle: 'Il mesure', valeur: f.grandeur }, { libelle: 'Unité', valeur: f.unite }, { libelle: 'On le choisit pour', valeur: f.ou }]);
        ctx.dire(f.texte);
      }
      ordre.forEach(id => items[id].ecrire());
    };

    /* ------------------------------------------------------------ pièces */
    const pieces = [
      { id: 'mallette', nom: 'La mallette', objets: [cuvette, couvercle], ancre: [-400, 100, 100], desc: 'Une valise rigide, en plastique. La cuvette porte les appareils ; le couvercle, dressé derrière, garde une pochette et des sangles pour les papiers et les câbles.' },
      { id: 'mousse', nom: 'La mousse et ses logements', objets: [mousseBas, mousseHaut], ancre: [0, FT, 20], desc: 'Un logement creusé pour chaque appareil : il tient en place, ne se cogne pas, et on voit tout de suite s’il en manque un.' },
      { id: 'helice', nom: 'L’anémomètre à hélice', objets: [items.helice.g], ancre: [-270, FL + 28, -185], desc: 'Une hélice dans une cage. L’air la fait tourner : plus elle tourne vite, plus l’air va vite. Robuste, pour les vitesses élevées.' },
      { id: 'filchaud', nom: 'L’anémomètre à fil chaud', objets: [items.filchaud.g], ancre: [240, FL + 28, -45], desc: 'Un boîtier, un câble et une canne qui s’allonge. Au bout, un fil très fin chauffé : l’air le refroidit. Il lit les vitesses faibles, mais il est fragile.' },
      { id: 'mano', nom: 'Le micromanomètre et son tube de Pitot', objets: [items.mano.g], ancre: [20, FL + 28, 120], desc: 'Le micromanomètre lit un écart de pression entre ses deux entrées, + et −. Le tube de Pitot et ses deux tuyaux (rouge : pression totale, bleu foncé : pression statique) s’y branchent.' },
      { id: 'hygro', nom: 'Le thermo-hygromètre', objets: [items.hygro.g], ancre: [10, FL + 30, -185], desc: 'Il affiche la température de l’air, l’humidité relative et le point de rosée. Sa sonde, sous un capuchon percé, demande du temps pour se stabiliser.' },
      { id: 'cone', nom: 'Le cône de mesure', objets: [items.cone.g], ancre: [-215, FL + 60, 75], desc: 'Un entonnoir de toile, posé sur une bouche : il rassemble l’air dans un passage connu. Une hélice et un afficheur donnent le débit.' }
    ];

    const commandes = [
      { id: 'sortir', type: 'choix', titre: 'Sortir de la mallette', options: [['aucun', 'Tout rangé'], ['helice', 'Anémomètre à hélice'], ['filchaud', 'Anémomètre à fil chaud'], ['mano', 'Micromanomètre et Pitot'], ['hygro', 'Thermo-hygromètre'], ['cone', 'Cône de mesure']], valeur: 'aucun' }
    ];
    const vueEtape = (id, az, zoom) => { const p = items[id].pivot; return { azimut: az, elevation: 16, zoom, cible: [p[0], p[1] + LIFT * 0.9, p[2]] }; };
    const etapes = [
      { titre: 'Chaque appareil a son logement', piece: 'mousse', eclate: false, actions: [['sortir', 'aucun']],
        vue: { azimut: 6, elevation: 44, zoom: 1.0, cible: [0, 60, 0] },
        texte: 'Dans la mousse, un logement par appareil. Avant d’en sortir un, on dit ce qu’on cherche : une vitesse ? un débit ? un écart de pression ? une température ? une humidité ? L’appareil se choisit ensuite.' },
      { titre: 'L’anémomètre à hélice sort : il mesure la vitesse de l’air', piece: 'helice', eclate: false, actions: [['sortir', 'helice']],
        vue: vueEtape('helice', 8, 2.3), texte: FICHE.helice.texte },
      { titre: 'Le fil chaud sort : il mesure les petites vitesses', piece: 'filchaud', eclate: false, actions: [['sortir', 'filchaud']],
        vue: vueEtape('filchaud', 8, 1.45), texte: FICHE.filchaud.texte },
      { titre: 'Le micromanomètre sort : il mesure un écart de pression', piece: 'mano', eclate: false, actions: [['sortir', 'mano']],
        vue: vueEtape('mano', 8, 1.7), texte: FICHE.mano.texte },
      { titre: 'Le thermo-hygromètre sort : température et humidité', piece: 'hygro', eclate: false, actions: [['sortir', 'hygro']],
        vue: vueEtape('hygro', 8, 1.9), texte: FICHE.hygro.texte },
      { titre: 'Le cône sort : il mesure le débit d’une bouche', piece: 'cone', eclate: false, actions: [['sortir', 'cone']],
        vue: vueEtape('cone', 8, 1.6), texte: FICHE.cone.texte }
    ];
    const eclate = [
      { objets: [items.helice.g], vers: [0, 330, 0], debut: 0, fin: 0.5 },
      { objets: [items.hygro.g], vers: [0, 230, 0], debut: 0.1, fin: 0.6 },
      { objets: [items.filchaud.g], vers: [0, 400, 0], debut: 0.2, fin: 0.7 },
      { objets: [items.mano.g], vers: [0, 280, 0], debut: 0.3, fin: 0.8 },
      { objets: [items.cone.g], vers: [0, 180, 0], debut: 0.4, fin: 0.9 }
    ];

    maj();
    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 10, elevation: 30, zoom: 0.75, cible: [0, 260, 0] },
      vue: { azimut: 8, elevation: 36, cadre: [cuvette, couvercle], marge: 0.78 },
      agir(id, v) {
        if (id === 'sortir') E.sorti = v;
        maj();
      },
      surEclate(on) { E.eclate = on; maj(); },
      animer(dt) {
        E.t += dt;
        let bouge = false;
        /* les chiffres vivent : on les réécrit huit fois par seconde, seulement pour l'appareil sorti */
        E.rafraichi = (E.rafraichi || 0) + dt;
        const encore = E.rafraichi > 0.125; if (encore) E.rafraichi = 0;
        ordre.forEach(id => {
          const it = items[id], cible = E.sorti === id ? 1 : 0;
          let monte = false;
          if (Math.abs(it.u - cible) > 0.002) { it.u = K.vers(it.u, cible, 3.2, dt); monte = true; }
          else if (it.u !== cible) { it.u = cible; monte = true; }
          if (monte) {
            it.g.position.y = it.pivot[1] + LIFT * it.u;
            if (it.debout) it.g.quaternion.identity().slerp(qDebout, it.u); else it.g.rotation.x = it.penche * it.u;
          }
          if (actif(id) || monte) { it.geste(dt); bouge = true; }
          const on = actif(id) && it.u > 0.5;
          if (on !== it.allume || (on && encore)) { it.allume = on; it.ecrire(); }
        });
        return bouge;
      }
    };
  }, { famille: 'instruments', titre: 'La mallette de mesure', stations: ['instruments'] });
})();
