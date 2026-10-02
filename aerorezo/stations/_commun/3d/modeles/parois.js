/* AéroRézo 3D — famille « parois » : un modèle, `paroi`.
     paroi   un pan de mur extérieur et sa fenêtre à double vitrage, vus en coupe
             (station « transmission » : parois et écarts de température)
   Unités : mm. Repère : X dans le sens de la chaleur (de la pièce, à gauche, vers le dehors,
   à droite), Y vers le haut, Z vers l'avant (+Z = le côté qu'on voit ; « Voir en coupe » retire
   la moitié avant, z > 0, et ouvre le mur en plein milieu de la fenêtre).

   CE QUE L'ÉLÈVE DOIT VOIR : un mur n'est pas un bloc, c'est une pile de couches (plâtre,
   isolant, bloc béton, enduit). Dedans il fait chaud, dehors il fait froid : cet écart pousse
   la chaleur à traverser le mur du chaud vers le froid (des grains orange). L'isolant la freine
   fortement : la courbe des températures, tracée au-dessus de la coupe, descend presque
   entièrement dans l'isolant. Retirez-le : la chaleur passe 7 fois plus. Une fenêtre à double
   vitrage, même bonne, en laisse passer environ 9 fois plus qu'un mur isolé, mètre carré pour
   mètre carré. Au total, P = U × A × ΔT : le coefficient U de la paroi, sa surface A, l'écart ΔT.

   Chaleur : grains orange 0xe8711a (couleur commune d'AéroRézo pour un flux de chaleur à
   travers une paroi). Il n'y a pas d'air coloré ici : l'air du dehors et celui de la pièce ne
   sont que les deux côtés du mur.

   COMMENT LES GRAINS DISENT LE FLUX : le même flux traverse toutes les couches (la chaleur ne
   s'arrête nulle part). Le nombre de grains qui passent par seconde est donc proportionnel à
   P/A = U × ΔT, et c'est tout : un grain n'est pas plus lent dans l'isolant. Ce qui change d'une
   couche à l'autre, c'est la chute de température, pas le flux. Pour que ce nombre se lise,
   l'écart entre deux grains et leur vitesse varient tous deux avec la racine de U × ΔT
   (écart ∝ 1/√q, vitesse ∝ √q, cadence ∝ q), à l'écran très ralentie.

   VALEURS D'ILLUSTRATION (la station ne donne ni U ni surfaces, voir la fiche) :
     résistances superficielles : intérieure 0,13 — extérieure 0,04 m²·K/W
     plâtre 13 mm (λ 0,25) → 0,052 · isolant laine minérale (λ 0,035) · bloc béton 200 mm → 0,22
     enduit 15 mm (λ 1,0) → 0,015   ⇒ mur isolé 100 mm : U = 0,30 · sans isolant : U = 2,2
     double vitrage : U = 2,8 W/(m²·K) · pan de mur 1,4 × 1,2 m, fenêtre 0,8 × 0,6 m. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('paroi', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const clamp = K.clamp;
    const CHALEUR = 0xe8711a;
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d }).replace('-', '−');
    const uni = (v, d, u) => nb(v, d) + ' ' + u;

    /* ================================================================ LES COTES */
    const Z0 = 700, HM = 1200;                 /* le pan de mur : 1,4 m de large (z), 1,2 m de haut */
    const YF0 = 300, YF1 = 900, ZF = 400;      /* l'ouverture de la fenêtre : 0,8 m × 0,6 m */
    const XB1 = 200, XE1 = 215;                /* bloc de 0 à 200, enduit de 200 à 215 ; l'isolant et le plâtre se posent côté pièce */
    const FX0 = 90, FX1 = 160;                 /* le cadre : 70 mm de profondeur, dans l'épaisseur du bloc */
    const SM = 1.4 * 1.2 - 0.8 * 0.6, SV = 0.8 * 0.6;   /* surfaces : mur net 1,20 m², fenêtre 0,48 m² */
    const E_INT = 20;                          /* la pièce reste à 20 °C ; on règle le dehors */
    const UV = 2.8;                            /* double vitrage, fenêtre entière (cadre compris) */
    const RES = { si: 0.13, platre: 13 / 250, bloc: 0.22, enduit: 15 / 1000, se: 0.04 };
    const Z_GRAINS = 15;                       /* les grains courent un peu devant le plan de coupe */
    const TMIN = -10, TMAX = 40, YB = 1320, KY = 8;    /* la courbe : 8 mm par kelvin, de −10 à 40 °C */

    /* ================================================================ L'ÉTAT ET LE CALCUL */
    const E = { ext: 8, iso: 100, phase: 'tout', coupe: false, demonte: false };
    /* la température à chaque interface, du dedans vers le dehors, et les flux (valeurs signées : > 0 = la chaleur sort) */
    const calc = (ext, iso) => {
      const Ri = iso / 35;
      const Rm = RES.si + RES.platre + Ri + RES.bloc + RES.enduit + RES.se;
      const Um = 1 / Rm, dT = E_INT - ext, q = Um * dT, qv = UV * dT;
      const t = { air: E_INT };
      t.si = t.air - q * RES.si; t.pi = t.si - q * RES.platre; t.ib = t.pi - q * Ri;
      t.be = t.ib - q * RES.bloc; t.se = t.be - q * RES.enduit; t.ext = t.se - q * RES.se;
      const Pm = Um * SM * dT, Pv = UV * SV * dT;
      return { Ri, Um, dT, q, qv, t, Pm, Pv, P: Pm + Pv, chute: q * Ri };
    };

    /* ---------------------------------------------------------------- matières
       Tout ce qui se coupe a sa matière propre, double face (on voit l'intérieur des couches). */
    const C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; return c; };
    const platre = C(K.plastique(0xf2efe7, 0.9));
    const laine = C(K.plastique(0xe2c75a, 0.95));
    const bloc = C(K.plastique(0x9c9a94, 0.92));
    const enduit = C(K.plastique(0xd8cdb6, 0.96));
    const beton = C(K.plastique(0x9b958a, 0.92));
    const pvc = C(K.plastique(0xf3f2ee, 0.42));
    const inter = C(M.aluminium, 0xaab2ba);
    const verre = (() => { const c = K.propre(M.transparent); c.color.setHex(0xcfe7ec); c.opacity = 0.3; c.side = T.DoubleSide; return c; })();
    const voileLame = new T.MeshStandardMaterial({ color: 0xa9d3ee, roughness: 0.3, transparent: true, opacity: 0.25, depthWrite: false, side: T.DoubleSide });
    /* le panneau d'affichage de la courbe : il ne se coupe pas */
    const plaque = K.lumineux(0xfaf8f2);
    const bord = C(K.plastique(0x8c939a, 0.6));
    const poteau = C(M.aluminium, 0xaab2ba);
    const matLigne = K.lumineux(0x1b3a63), matGuide = K.lumineux(0xb4ad9c), matGrille = K.lumineux(0xdcd7ca), matGrille0 = K.lumineux(0x8f98a1);

    const boite = (x0, x1, y0, y1, z0, z1, mat, r) => {
      const g = r ? K.boite(x1 - x0, y1 - y0, z1 - z0, r) : new T.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
      return K.mesh(g, mat, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    };

    /* ---------------------------------------------------------------- les hachures, une par matière */
    const hach = (dessin, pas) => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      dessin(c.getContext('2d'));
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; t.repeat.set(1 / pas, 1 / pas);
      return new T.MeshStandardMaterial({ map: t, roughness: 0.85, side: T.DoubleSide });
    };
    const HACH = {
      /* plâtre : traits obliques fins sur fond blanc */
      platre: hach(x => { x.fillStyle = '#f7f4ea'; x.fillRect(0, 0, 64, 64); x.strokeStyle = '#8f8872'; x.lineWidth = 4; for (let i = -64; i <= 64; i += 16) { x.beginPath(); x.moveTo(i, 64); x.lineTo(i + 64, 0); x.stroke(); } }, 24),
      /* isolant (laine minérale) : lignes en zigzag, comme sur un plan */
      isolant: hach(x => { x.fillStyle = '#f4e8b0'; x.fillRect(0, 0, 64, 64); x.strokeStyle = '#98801f'; x.lineWidth = 3.4; for (let y = 8; y < 64; y += 16) { x.beginPath(); for (let k = 0; k <= 8; k++) { const px = k * 8, py = y + (k % 2 ? 5 : -5); if (k) x.lineTo(px, py); else x.moveTo(px, py); } x.stroke(); } }, 36),
      /* béton : des points et de petits traits */
      beton: hach(x => {
        x.fillStyle = '#c4bfb4'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#5f5a4e';
        [[10, 10], [42, 14], [26, 34], [54, 42], [10, 52], [36, 58], [58, 8], [20, 20]].forEach(([a, b]) => { x.beginPath(); x.arc(a, b, 2.6, 0, 2 * Math.PI); x.fill(); });
        x.strokeStyle = '#5f5a4e'; x.lineWidth = 2.6;
        [[30, 6, 38, 12], [6, 36, 14, 42], [46, 52, 54, 58], [50, 24, 58, 30]].forEach(([a, b, c, d]) => { x.beginPath(); x.moveTo(a, b); x.lineTo(c, d); x.stroke(); });
      }, 48),
      dalle: null,
      /* enduit : un semis fin de points sur fond sable */
      enduit: hach(x => { x.fillStyle = '#dccfb0'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#7d6e48'; for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) { x.beginPath(); x.arc(i * 8 + (j % 2 ? 4 : 0) + 2, j * 8 + 3, 1.7, 0, 2 * Math.PI); x.fill(); } }, 16)
    };
    HACH.dalle = hach(x => {
      x.fillStyle = '#bab5aa'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#5a554a';
      [[10, 10], [42, 14], [26, 34], [54, 42], [10, 52], [36, 58], [58, 8], [20, 20]].forEach(([a, b]) => { x.beginPath(); x.arc(a, b, 2.6, 0, 2 * Math.PI); x.fill(); });
    }, 80);
    const PLEIN = {
      pvc: new T.MeshStandardMaterial({ color: 0xf2f1ec, roughness: 0.6, side: T.DoubleSide }),
      chambre: new T.MeshStandardMaterial({ color: 0x868d94, roughness: 0.7, side: T.DoubleSide }),
      verre: new T.MeshStandardMaterial({ color: 0x8ec5d3, roughness: 0.4, side: T.DoubleSide }),
      alu: new T.MeshStandardMaterial({ color: 0x9aa3ab, roughness: 0.4, metalness: 0.5, side: T.DoubleSide })
    };

    /* ---------------------------------------------------------------- les groupes qui durent (la pièce reste, son contenu change) */
    const gEnduit = new T.Group(), gBloc = new T.Group(), gIsolant = new T.Group(), gPlatre = new T.Group();
    const gDalle = new T.Group(), gCadre = new T.Group(), gVitrage = new T.Group(), gLame = new T.Group();
    const gCourbe = new T.Group(), gCourbeDyn = new T.Group();
    racine.add(gDalle, gBloc, gEnduit, gIsolant, gPlatre, gCadre, gVitrage, gLame, gCourbe);
    gCourbe.add(gCourbeDyn);

    /* les faces de coupe (plan z = 0, posées 0,5 mm devant) : elles vivent dans le groupe de leur pièce */
    const caps = [];
    const rect = (x0, x1, y0, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    const faceDe = (polys, mat, groupe, z) => {
      const g = new T.ShapeGeometry(polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1])))));
      const m = new T.Mesh(g, mat); m.position.z = z || 0.5; m.userData.sansOmbre = true; m.castShadow = false; m.visible = E.coupe;
      caps.push(m); groupe.add(m); return m;
    };
    /* vider un groupe en libérant les géométries (les matières, partagées, restent) */
    const vider = g => {
      for (let i = g.children.length - 1; i >= 0; i--) {
        const o = g.children[i]; g.remove(o);
        o.traverse(m => { const k = caps.indexOf(m); if (k >= 0) caps.splice(k, 1); if (m.geometry && !m.userData.partage) m.geometry.dispose(); });
      }
    };
    const eteindre = g => g.traverse(m => { if (m.isMesh && m.userData.allumee && ctx.element && ctx.element._eteindre) { try { ctx.element._eteindre(m); } catch (e) {} } });
    const rallumer = () => { if (ctx.element && ctx.element._etatInit === 'pret' && ctx.element._choisie) { try { ctx.element._majSurbrillance(); } catch (e) {} } };

    /* une couche du mur : quatre pavés autour de l'ouverture de la fenêtre, et sa face de coupe */
    const couche = (g, x0, x1, mat, capMat) => {
      g.add(boite(x0, x1, 0, YF0, -Z0, Z0, mat), boite(x0, x1, YF1, HM, -Z0, Z0, mat));
      g.add(boite(x0, x1, YF0, YF1, -Z0, -ZF, mat), boite(x0, x1, YF0, YF1, ZF, Z0, mat));
      faceDe([rect(x0, x1, 0, YF0), rect(x0, x1, YF1, HM)], capMat, g);
    };

    /* ================================================================ LA DALLE, LE BLOC, L'ENDUIT (ne changent pas) */
    gDalle.add(boite(-560, 560, -220, 0, -800, 800, beton));
    faceDe([rect(-560, 560, -220, 0)], HACH.dalle, gDalle);
    couche(gBloc, 0, XB1, bloc, HACH.beton);
    couche(gEnduit, XB1, XE1, enduit, HACH.enduit);

    /* ================================================================ LA FENÊTRE
       Un cadre en PVC à chambres (trois pavés par traverse : le fond de la gorge et ses deux joues),
       deux vitres de 4 mm, une lame de 16 mm tenue par une barrette d'aluminium. Les vitres entrent de
       20 mm dans la gorge du cadre. */
    {
      const R = 2, YB0 = YF0, YB1 = YF0 + 70, YT0 = YF1 - 70, YT1 = YF1;        /* traverse basse et haute : 70 mm */
      const ZI = ZF - 70;                                                         /* l'arête intérieure des montants */
      const gy0 = YF0 + 50, gy1 = YF1 - 50, gz = ZF - 50;                         /* la vitre entre de 20 mm dans la gorge */
      const mir = y => YF0 + YF1 - y;
      gCadre.add(boite(FX0, 113, YB0, YB1, -ZF, ZF, pvc, R), boite(137, FX1, YB0, YB1, -ZF, ZF, pvc, R), boite(113, 137, YB0, gy0, -ZF, ZF, pvc));
      gCadre.add(boite(FX0, 113, YT0, YT1, -ZF, ZF, pvc, R), boite(137, FX1, YT0, YT1, -ZF, ZF, pvc, R), boite(113, 137, gy1, YT1, -ZF, ZF, pvc));
      [-1, 1].forEach(s => {
        const z0 = s < 0 ? -ZF : ZI, z1 = s < 0 ? -ZI : ZF;
        gCadre.add(boite(FX0, 113, YB1, YT0, z0, z1, pvc, R), boite(137, FX1, YB1, YT0, z0, z1, pvc, R), boite(113, 137, YB1, YT0, s < 0 ? -ZF : gz, s < 0 ? -gz : ZF, pvc));
      });
      faceDe([rect(FX0, 113, YB0, YB1), rect(137, FX1, YB0, YB1), rect(113, 137, YB0, gy0), rect(FX0, 113, YT0, YT1), rect(137, FX1, YT0, YT1), rect(113, 137, gy1, YT1)], PLEIN.pvc, gCadre);
      /* les chambres du profilé, en bas puis (symétriques) en haut */
      const ch = [[95, 108, YB0 + 8, YB1 - 8], [142, 155, YB0 + 8, YB1 - 8], [117, 133, YB0 + 7, gy0 - 7]];
      faceDe(ch.map(c => rect(c[0], c[1], c[2], c[3])).concat(ch.map(c => rect(c[0], c[1], mir(c[3]), mir(c[2])))), PLEIN.chambre, gCadre, 0.7);

      /* l'appui de fenêtre : une tôle d'aluminium en pente douce, avec son rebord, qui rejette l'eau hors du mur */
      gCadre.add(boite(FX1, XE1 + 40, YF0, YF0 + 4, -ZF, ZF, inter), boite(XE1 + 36, XE1 + 40, YF0 - 14, YF0 + 4, -ZF, ZF, inter));
      faceDe([rect(FX1, XE1 + 40, YF0, YF0 + 4), rect(XE1 + 36, XE1 + 40, YF0 - 14, YF0)], PLEIN.alu, gCadre, 0.7);

      const vitre = (x0, x1) => { const m = boite(x0, x1, gy0, gy1, -gz, gz, verre); m.userData.voile = true; m.userData.sansOmbre = true; m.castShadow = false; return m; };
      gVitrage.add(vitre(113, 117), vitre(133, 137));
      /* la barrette d'aluminium qui tient les deux vitres écartées : elle fait le tour, cachée dans la gorge */
      gVitrage.add(boite(117, 133, gy0, gy0 + 12, -gz, gz, inter), boite(117, 133, gy1 - 12, gy1, -gz, gz, inter));
      gVitrage.add(boite(117, 133, gy0 + 12, gy1 - 12, -gz, -gz + 12, inter), boite(117, 133, gy0 + 12, gy1 - 12, gz - 12, gz, inter));
      faceDe([rect(113, 117, gy0, gy1), rect(133, 137, gy0, gy1)], PLEIN.verre, gVitrage);
      faceDe([rect(117, 133, gy0, gy0 + 12), rect(117, 133, gy1 - 12, gy1)], PLEIN.alu, gVitrage, 0.7);
      const lame = boite(117, 133, gy0 + 12, gy1 - 12, -gz + 12, gz - 12, voileLame); lame.userData.voile = true; lame.userData.sansOmbre = true; lame.castShadow = false;
      gLame.add(lame);
    }

    /* ================================================================ L'ISOLANT ET LE PLÂTRE (refaits quand l'épaisseur change) */
    const construireIsolation = () => {
      const e = E.iso, xi = -e - 13;
      [gIsolant, gPlatre, gCourbeDyn].forEach(eteindre);
      [gIsolant, gPlatre].forEach(vider);
      if (e > 0) couche(gIsolant, -e, 0, laine, HACH.isolant);
      couche(gPlatre, xi, -e, platre, HACH.platre);
      /* le retour de plâtre dans l'ouverture : il cache l'isolant sur les quatre côtés de la fenêtre */
      gPlatre.add(boite(xi, 0, YF0, YF0 + 13, -ZF, ZF, platre), boite(xi, 0, YF1 - 13, YF1, -ZF, ZF, platre));
      gPlatre.add(boite(xi, 0, YF0 + 13, YF1 - 13, -ZF, -ZF + 13, platre), boite(xi, 0, YF0 + 13, YF1 - 13, ZF - 13, ZF, platre));
      faceDe([rect(xi, 0, YF0, YF0 + 13), rect(xi, 0, YF1 - 13, YF1)], HACH.platre, gPlatre);
      construireCourbe();
      majFlux();
      rallumer();
    };

    /* ================================================================ LA COURBE DES TEMPÉRATURES
       Un panneau d'affichage sur deux poteaux, au-dessus de la coupe : 8 mm par kelvin, graduée tous
       les 10 °C. Des traits fins la relient aux interfaces du mur. Elle ne se coupe pas. */
    const PX0 = -520, PX1 = 520, PY0 = 1260, PY1 = 1800;
    const yT = th => YB + (clamp(th, TMIN, TMAX) - TMIN) * KY;
    gCourbe.add(boite(PX0, PX1, PY0, PY1, -8, 0, plaque));
    gCourbe.add(boite(PX0, PX1, PY0, PY0 + 8, -8, 3, bord), boite(PX0, PX1, PY1 - 8, PY1, -8, 3, bord), boite(PX0, PX0 + 8, PY0, PY1, -8, 3, bord), boite(PX1 - 8, PX1, PY0, PY1, -8, 3, bord));
    gCourbe.add(boite(-505, -475, 0, PY1 - 10, -24, -8, poteau), boite(475, 505, 0, PY1 - 10, -24, -8, poteau));
    for (let th = TMIN; th <= TMAX; th += 10) {
      gCourbe.add(boite(-420, 500, yT(th) - 0.8, yT(th) + 0.8, 0, 3, th === 0 ? matGrille0 : matGrille));
      const g = K.gravure(nb(th, 0), 36, { couleur: '#3b4350' }); g.position.set(-465, yT(th), 4); gCourbe.add(g);
    }
    { const g = K.gravure('°C', 36, { couleur: '#3b4350' }); g.position.set(-465, 1768, 4); gCourbe.add(g); }
    const geoNoeud = new T.SphereGeometry(8, 12, 8), geoJoint = new T.SphereGeometry(4.6, 8, 6);
    const construireCourbe = () => {
      const c = calc(E.ext, E.iso), e = E.iso, xi = -e - 13;
      eteindre(gCourbeDyn); vider(gCourbeDyn);
      const noeuds = [[-400, c.t.air], [xi - 60, c.t.air], [xi, c.t.si], [-e, c.t.pi], [0, c.t.ib], [XB1, c.t.be], [XE1, c.t.se], [XE1 + 60, c.t.ext], [480, c.t.ext]];
      const pts = noeuds.filter((n, i) => i === 0 || n[0] !== noeuds[i - 1][0]).map(n => V(n[0], yT(n[1]), 8));
      for (let i = 0; i + 1 < pts.length; i++) {
        const a = pts[i], b = pts[i + 1], d = b.clone().sub(a), L = d.length();
        const m = new T.Mesh(new T.CylinderGeometry(4.6, 4.6, L, 8, 1), matLigne);
        m.position.copy(a).addScaledVector(d, 0.5); m.quaternion.setFromUnitVectors(V(0, 1, 0), d.normalize());
        m.userData.sansOmbre = true; m.castShadow = false; gCourbeDyn.add(m);
      }
      pts.forEach(p => { const j = new T.Mesh(geoJoint, matLigne); j.position.copy(p); j.userData.partage = true; j.userData.sansOmbre = true; j.castShadow = false; gCourbeDyn.add(j); });
      /* les traits qui relient la courbe aux interfaces, et un repère sur chacune */
      const xs = [xi, -e, 0, XB1, XE1].filter((x, i, t) => t.indexOf(x) === i);
      xs.forEach(x => {
        const g = boite(x - 1, x + 1, HM + 6, PY1 - 14, 3, 5, matGuide); g.userData.sansOmbre = true; g.castShadow = false; gCourbeDyn.add(g);
        const th = x === xi ? c.t.si : x === -e ? c.t.pi : x === 0 ? c.t.ib : x === XB1 ? c.t.be : c.t.se;
        if (x !== xi && x !== 0 && x !== XE1) return;
        const n = new T.Mesh(geoNoeud, matLigne); n.position.set(x, yT(th), 8); n.userData.partage = true; n.userData.sansOmbre = true; n.castShadow = false; gCourbeDyn.add(n);
      });
      rallumer();
    };

    /* ================================================================ LA CHALEUR QUI TRAVERSE
       Des grains orange sur des rangées horizontales, dans le plan de coupe. Trois rangées sous la
       fenêtre et trois au-dessus pour le mur ; six en travers de la vitre. Même écart entre rangées :
       la cadence (grains par seconde) lit le flux par mètre carré, U × ΔT. */
    const faireFlux = rangees => {
      const NMAX = 28;
      const im = new T.InstancedMesh(new T.SphereGeometry(13, 8, 6), K.lumineux(CHALEUR), rangees.length * NMAX);
      im.userData.sansOmbre = true; im.castShadow = false; im.frustumCulled = false;
      const m4 = new T.Matrix4(), qt = new T.Quaternion(), sc = new T.Vector3(), p = new T.Vector3();
      const e = { x0: 0, L: 800, espace: 1e9, vitesse: 60, sens: 1, s: 0 };
      const compte = () => e.espace > e.L * 1.6 ? 0 : Math.min(NMAX, Math.max(1, Math.round(e.L / e.espace)));
      const poser = () => {
        const n = compte(), pas = n ? e.L / n : 1;
        let k = 0;
        rangees.forEach((y, r) => {
          for (let i = 0; i < NMAX; i++, k++) {
            if (i >= n) { sc.setScalar(0); p.set(0, y, Z_GRAINS); }
            else {
              const s = (((i * pas + e.s + (r % 2) * 0.5 * pas) % e.L) + e.L) % e.L;
              sc.setScalar(K.lisse(clamp(Math.min(s, e.L - s) / 70, 0, 1)));
              p.set(e.sens > 0 ? e.x0 + s : e.x0 + e.L - s, y, Z_GRAINS);
            }
            m4.compose(p, qt, sc); im.setMatrixAt(k, m4);
          }
        });
        im.instanceMatrix.needsUpdate = true;
      };
      poser();
      return { objet: im, actif: () => compte() > 0, regler(o) { Object.assign(e, o); poser(); }, animer(dt) { e.s += dt * e.vitesse; poser(); } };
    };
    const fluxMur = faireFlux([60, 140, 220, 980, 1060, 1140]);
    const fluxVitre = faireFlux([410, 490, 570, 650, 730, 810]);
    racine.add(fluxMur.objet, fluxVitre.objet);
    /* écart et vitesse : cadence ∝ q (voir l'en-tête). Référence : le mur isolé à 12 K (3,6 W/m²). */
    const reglageFlux = q => ({ espace: q > 0.05 ? clamp(200 * Math.sqrt(3.6 / q), 36, 1e6) : 1e9, vitesse: clamp(70 * Math.sqrt(Math.max(q, 1e-4) / 3.6), 20, 260) });
    function majFlux() {
      const c = calc(E.ext, E.iso), xi = -E.iso - 13, x0 = xi - 200, L = (XE1 + 200) - x0, sens = c.dT >= 0 ? 1 : -1;
      fluxMur.regler(Object.assign({ x0, L, sens }, reglageFlux(Math.abs(c.q))));
      fluxVitre.regler(Object.assign({ x0, L, sens }, reglageFlux(Math.abs(c.qv))));
    }

    const visibles = () => {
      const on = !E.demonte, ph = E.phase;
      gCourbe.visible = on && ph !== 'objet';
      fluxMur.objet.visible = on && (ph === 'flux' || ph === 'tout');
      fluxVitre.objet.visible = on && ph === 'tout';
      caps.forEach(m => { m.visible = E.coupe; });
    };

    /* ================================================================ LES MESURES ET LES MOTS */
    const iso = () => E.iso > 0 ? 'isolé de ' + uni(E.iso, 0, 'mm') : 'sans isolant';
    const majMesures = c => {
      const a = Math.abs;
      ctx.mesures([
        { libelle: 'L’écart de température', valeur: uni(a(c.dT), 0, 'K') + ' (' + uni(E_INT, 0, '°C') + ' dedans, ' + uni(E.ext, 0, '°C') + ' dehors)' },
        { libelle: 'Le mur, ' + iso(), valeur: 'U = ' + nb(c.Um, 2) + ' · A = ' + nb(SM, 2) + ' m² · P = ' + uni(a(c.Pm), 1, 'W') },
        { libelle: 'Le vitrage, double', valeur: 'U = ' + nb(UV, 1) + ' · A = ' + nb(SV, 2) + ' m² · P = ' + uni(a(c.Pv), 1, 'W') },
        { libelle: 'Par mètre carré', valeur: 'mur ' + uni(a(c.q), 1, 'W') + ' · vitrage ' + uni(a(c.qv), 1, 'W') },
        { libelle: 'Le flux total', valeur: uni(a(c.P), 1, 'W') },
        { libelle: 'La chute dans l’isolant', valeur: E.iso > 0 ? uni(a(c.chute), 1, 'K') + ' sur ' + uni(a(c.dT), 0, 'K') + ' (de ' + nb(c.t.pi, 1) + ' à ' + uni(c.t.ib, 1, '°C') + ')' : 'pas d’isolant' },
        { libelle: 'Face intérieure / extérieure du mur', valeur: uni(c.t.si, 1, '°C') + ' / ' + uni(c.t.se, 1, '°C') }
      ]);
    };
    const majTexte = () => {
      const c = calc(E.ext, E.iso), a = Math.abs;
      majMesures(c);
      if (a(c.dT) < 0.5) { ctx.dire('<strong>Dedans ' + uni(E_INT, 0, '°C') + ', dehors ' + uni(E.ext, 0, '°C') + ' : aucun écart.</strong> Rien ne pousse la chaleur à passer : aucun grain ne bouge.'); return; }
      const sort = c.dT > 0;
      ctx.dire('<strong>Dedans ' + uni(E_INT, 0, '°C') + ', dehors ' + uni(E.ext, 0, '°C') + ' : écart de ' + uni(a(c.dT), 0, 'K') + '.</strong> '
        + (sort ? 'La chaleur va du chaud vers le froid : elle sort de la pièce. ' : 'Dehors est plus chaud : la chaleur entre dans la pièce. ')
        + 'Le mur ' + iso() + ' en laisse passer ' + uni(a(c.Pm), 1, 'W') + ', la fenêtre ' + uni(a(c.Pv), 1, 'W') + ' : ' + uni(a(c.P), 1, 'W') + ' en tout (P = U × A × ΔT). '
        + '<em>À l’écran, la chaleur est très ralentie.</em>');
    };

    /* ================================================================ LA COUPE (plan z = 0) */
    /* les matières de ce qui se coupe : réglées une fois pour toutes, même quand aucune pièce ne les porte
       (l'isolant à 0 mm n'existe plus : sa matière doit pourtant suivre le plan quand il revient) */
    const matieresCoupees = [platre, laine, bloc, enduit, beton, pvc, inter, verre, voileLame];
    const basculerCoupe = on => {
      E.coupe = on;
      const plan = on ? [new T.Plane(new T.Vector3(0, 0, -1), 0)] : null;
      matieresCoupees.forEach(m => { m.clippingPlanes = plan; m.needsUpdate = true; });
      const exclus = new Set();
      [...caps, gCourbe, fluxMur.objet, fluxVitre.objet].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.needsUpdate = true; } });
      });
      visibles();
    };

    construireIsolation();
    visibles(); majTexte();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'enduit', ancre: [208, 1080, 0], nom: 'L’enduit extérieur', objets: [gEnduit], desc: 'Une couche de 15 mm sur le bloc. Elle protège le mur de la pluie. Elle ne freine presque pas la chaleur.' },
      { id: 'bloc', ancre: [100, 1120, 0], nom: 'Le bloc béton', objets: [gBloc], desc: 'Le mur porteur, 200 mm. Il tient la maison, mais il laisse passer la chaleur assez facilement.' },
      { id: 'isolant', ancre: [-50, 1060, 0], nom: 'L’isolant (laine minérale)', objets: [gIsolant], desc: 'De la laine pleine d’air immobile. C’est elle qui freine la chaleur : la température y chute presque entièrement.' },
      { id: 'platre', ancre: [-107, 1140, 0], nom: 'La plaque de plâtre', objets: [gPlatre], desc: 'Une plaque de 13 mm côté pièce. Elle cache l’isolant et fait la finition intérieure.' },
      { id: 'dalle', ancre: [300, -110, 0], nom: 'La dalle', objets: [gDalle], desc: 'Le plancher en béton sur lequel le mur est posé.' },
      { id: 'cadre', ancre: [125, 335, 0], nom: 'Le cadre de la fenêtre', objets: [gCadre], desc: 'Un profilé en PVC à chambres : ses petites cases d’air isolent mieux qu’un cadre plein. Il tient le vitrage dans le mur.' },
      { id: 'vitrage', ancre: [135, 760, 0], nom: 'Les deux vitres', objets: [gVitrage], desc: 'Deux vitres de 4 mm, tenues écartées par une barrette d’aluminium cachée dans le cadre.' },
      { id: 'lame', ancre: [125, 520, 0], nom: 'La lame d’air entre les vitres', objets: [gLame], desc: 'Un espace de 16 mm rempli d’air ou de gaz. Il freine la chaleur, mais beaucoup moins qu’un isolant de 100 mm.' },
      { id: 'courbe', ancre: [-300, 1560, 0], nom: 'La courbe des températures', objets: [gCourbeDyn], desc: 'Elle donne la température à chaque endroit du mur, du dedans vers le dehors. Elle descend là où le mur freine la chaleur.' },
      { id: 'flux', ancre: [-150, 140, 0], nom: 'La chaleur qui traverse', objets: [fluxMur.objet, fluxVitre.objet], desc: 'Les grains orange. Plus ils sont nombreux et rapides, plus la chaleur qui passe est forte. Ils vont du chaud vers le froid.' }
    ];

    const commandes = [
      { id: 'ext', type: 'curseur', libelle: 'Température extérieure', min: -10, max: 40, pas: 1, valeur: 8, unite: '°C' },
      { id: 'isolant', type: 'curseur', libelle: 'Épaisseur d’isolant', min: 0, max: 200, pas: 20, valeur: 100, unite: 'mm' }
    ];

    /* les nombres des étapes : calculés avec les mêmes formules que l'affichage */
    const c12 = calc(8, 100), c12s = calc(8, 0), c24 = calc(-4, 100);
    const etapes = [
      { titre: 'Un mur extérieur et sa fenêtre', piece: null, voirDedans: false, eclate: false, actions: [['ext', 8], ['isolant', 100], ['phase', 'objet']],
        vue: { azimut: 45, elevation: 14, zoom: 1.5, cible: [50, 600, 0] },
        texte: 'Vu de dehors : un pan de mur et une fenêtre à double vitrage. Derrière, c’est la pièce, à ' + uni(E_INT, 0, '°C') + '. Un mur n’est pas un bloc plein : il est fait de plusieurs couches.' },
      { titre: 'Dedans chaud, dehors froid : un écart', piece: 'courbe', voirDedans: true, eclate: false, actions: [['ext', 8], ['isolant', 100], ['phase', 'ecart']],
        vue: { azimut: 5, elevation: 3, zoom: 2.6, cible: [0, 1500, 0] },
        texte: 'La coupe ouvre le mur. La courbe donne la température de chaque endroit : ' + uni(E_INT, 0, '°C') + ' côté pièce, ' + uni(8, 0, '°C') + ' côté dehors. L’écart est de ' + uni(12, 0, 'K') + '. C’est lui qui pousse la chaleur à passer.' },
      { titre: 'La chaleur traverse le mur, du chaud vers le froid', piece: 'flux', voirDedans: true, eclate: false, actions: [['ext', 8], ['isolant', 100], ['phase', 'flux']],
        vue: { azimut: 6, elevation: 4, zoom: 4.6, cible: [30, 180, 0] },
        texte: 'Chaque grain orange est de la chaleur. Elle avance de la pièce vers le dehors, à travers toutes les couches : plâtre, isolant, bloc, enduit.' },
      { titre: 'L’isolant freine la chaleur', piece: 'isolant', voirDedans: true, eclate: false, actions: [['ext', 8], ['isolant', 100], ['phase', 'flux']],
        vue: { azimut: 5, elevation: 3, zoom: 2.5, cible: [30, 1380, 0] },
        texte: 'Regardez la courbe : elle descend presque entièrement dans l’isolant, de ' + uni(c12.t.pi, 1, '°C') + ' à ' + uni(c12.t.ib, 1, '°C') + '. Il retient ' + uni(c12.chute, 1, 'K') + ' sur ' + uni(12, 0, 'K') + '. Le bloc n’en retient presque rien.' },
      { titre: 'Sans isolant, la chaleur passe bien plus', piece: 'flux', voirDedans: true, eclate: false, actions: [['ext', 8], ['isolant', 0], ['phase', 'flux']],
        vue: { azimut: 6, elevation: 4, zoom: 4.6, cible: [30, 180, 0] },
        texte: 'On retire l’isolant : les grains sont bien plus nombreux et plus rapides. Le mur laisse passer ' + uni(c12s.Pm, 1, 'W') + ' au lieu de ' + uni(c12.Pm, 1, 'W') + ', plus de 7 fois plus. Son coefficient U passe de ' + nb(c12.Um, 2) + ' à ' + nb(c12s.Um, 1) + '.' },
      { titre: 'Le vitrage en laisse passer bien plus que le mur isolé', piece: 'vitrage', voirDedans: true, eclate: false, actions: [['ext', 8], ['isolant', 100], ['phase', 'tout']],
        vue: { azimut: 6, elevation: 4, zoom: 2.3, cible: [40, 600, 0] },
        texte: 'Par mètre carré, le double vitrage laisse passer ' + uni(c12.qv, 1, 'W') + ', le mur isolé ' + uni(c12.q, 1, 'W') + ' : environ 9 fois plus. La fenêtre ne fait que ' + nb(100 * SV / (SM + SV), 0) + ' % de la surface, mais elle laisse passer ' + nb(100 * c12.Pv / c12.P, 0) + ' % de la chaleur.' },
      { titre: 'Le flux dépend de U, de la surface et de l’écart', piece: 'flux', voirDedans: true, eclate: false, actions: [['ext', -4], ['isolant', 100], ['phase', 'tout']],
        vue: { azimut: 6, elevation: 4, zoom: 1.3, cible: [20, 950, 0] },
        texte: 'Dehors passe de ' + uni(8, 0, '°C') + ' à ' + uni(-4, 0, '°C') + ' : l’écart double, de ' + uni(12, 0, 'K') + ' à ' + uni(24, 0, 'K') + '. Tous les flux doublent : ' + uni(c24.P, 1, 'W') + ' au lieu de ' + uni(c12.P, 1, 'W') + '. P = U × A × ΔT.' }
    ];

    /* l'ordre du démontage : on ôte l'enduit, les vitres, le cadre, puis le plâtre, puis l'isolant ; le bloc reste sur sa dalle */
    const eclate = [
      { objets: [gEnduit], vers: [420, 0, 0], debut: 0, fin: 0.45 },
      { objets: [gVitrage, gLame], vers: [-460, 0, 0], debut: 0.05, fin: 0.5 },
      { objets: [gCadre], vers: [300, 0, 0], debut: 0.15, fin: 0.6 },
      { objets: [gPlatre], vers: [-800, 0, 0], debut: 0.3, fin: 0.85 },
      { objets: [gIsolant], vers: [-400, 0, 0], debut: 0.4, fin: 1 }
    ];

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 34, elevation: 18, zoom: 0.85 },
      vue: ctx.mode === 'comprendre'
        ? { azimut: 8, elevation: 5, zoom: 1.0, cadre: [gDalle, gBloc, gCourbe], marge: 0.8 }
        : { azimut: 45, elevation: 14, zoom: 1.0, cadre: [gDalle, gBloc, gCourbe], marge: 0.8 },
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'phase') E.phase = v;
        if (id === 'ext') { E.ext = +v; ctx.regler('ext', +v); construireCourbe(); majFlux(); }
        if (id === 'isolant') { E.iso = +v; ctx.regler('isolant', +v); construireIsolation(); }
        visibles(); majTexte();
      },
      surEclate(on) { E.demonte = on; visibles(); },
      animer(dt) {
        const a = fluxMur.objet.visible && fluxMur.actif(), b = fluxVitre.objet.visible && fluxVitre.actif();
        if (a) fluxMur.animer(dt);
        if (b) fluxVitre.animer(dt);
        return a || b;
      }
    };
  }, { famille: 'parois', titre: 'Un mur extérieur et sa fenêtre', stations: ['transmission'] });
})();
