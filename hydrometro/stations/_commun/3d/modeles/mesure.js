/* HydroMétro 3D — famille « mesure » : le compteur d'énergie thermique.
   Unités : mm. Repère : X le long des tuyaux, Y vers le haut, Z vers l'élève (+Z = face avant).

   ── compteurEnergie ───────────────────────────────────────────────────────────────────────
   Deux tuyaux de cuivre Ø22 : le DÉPART (eau chaude, rouge) en haut, à y = 165, où l'eau va de gauche
   à droite ; le RETOUR (eau refroidie, bleue) en bas, à y = 0, où l'eau va de DROITE À GAUCHE.
   Le compteur est posé sur le retour : un corps en laiton (débitmètre à jet : l'eau monte, tourne
   autour d'une petite roue à ailettes, redescend), la sonde de température du retour plongée dans
   l'eau à l'entrée du corps, et le calculateur à écran LCD posé dessus. La sonde du DÉPART est dans
   un doigt de gant vissé sur le tuyau du haut ; son câble va au calculateur.

   CE QUE L'ÉLÈVE DOIT VOIR :
   · le débit se lit sur la ROUE : plus l'eau passe, plus elle tourne vite ;
   · l'écart ΔT se lit sur les deux SONDES : 60 °C au départ, 60 − ΔT au retour (la couleur de
     l'eau du retour vire du bleu au rouge quand l'écart diminue) ;
   · le CALCULATEUR multiplie : puissance en kW ≈ 1,16 × débit en m³/h × ΔT en K ;
   · l'ÉNERGIE est cette puissance qui s'ajoute minute après minute : le compteur de kWh tourne
     d'autant plus vite que la puissance est grande (le temps est accéléré : 1 s = 1 min).

   « Voir en coupe » tranche tout par le plan z = 0 (la moitié avant est retirée) : faces hachurées
   comme sur un dessin de définition, eau teintée. Restent entiers (convention : on ne coupe pas ce
   qui tourne ni l'électronique) : la roue et son axe, le calculateur, la tête de la sonde de départ. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  const D = Math.PI / 180;
  const ROUGE = 0xd9472b, BLEU = 0x2f7fd6;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });

  /* ================================================================ aides communes à la famille
     (recopiées de pompes.js / vannes.js : matières propres double face, hachures, six pans) */
  const aides = (T, K) => {
    const A = {};
    A.C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; return c; };
    A.hachures = (fond, trait, pas) => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = fond; x.fillRect(0, 0, 64, 64);
      x.strokeStyle = trait; x.lineWidth = 5;
      for (let i = -64; i <= 64; i += 32) { x.beginPath(); x.moveTo(i, 64); x.lineTo(i + 64, 0); x.stroke(); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / pas, 1 / pas);
      return new T.MeshStandardMaterial({ map: t, roughness: 0.75, metalness: 0.05, side: T.DoubleSide });
    };
    A.uni = (couleur, extra) => new T.MeshStandardMaterial(Object.assign({ color: couleur, roughness: 0.6, side: T.DoubleSide }, extra || {}));
    A.eau = couleur => new T.MeshStandardMaterial({ color: couleur, roughness: 0.3, transparent: true, opacity: 0.9, depthWrite: false, side: T.DoubleSide });
    /* l'écrou à six pans : plats dessus et dessous, sommets de côté ; axe +X, de x0 à x0 + L */
    A.hexa = (RH, rInt, x0, L, mat) => {
      const s = new T.Shape();
      for (let k = 0; k < 6; k++) { const a = k * 60 * D; k ? s.lineTo(RH * Math.cos(a), RH * Math.sin(a)) : s.moveTo(RH * Math.cos(a), RH * Math.sin(a)); }
      const h = new T.Path(); h.absarc(0, 0, rInt, 0, Math.PI * 2, true); s.holes.push(h);
      const g = new T.ExtrudeGeometry(s, { depth: L, bevelEnabled: false, curveSegments: 20 });
      g.rotateY(Math.PI / 2); g.translate(x0, 0, 0);
      return new T.Mesh(g, mat);
    };
    return A;
  };

  /* ================================================================ LE COMPTEUR D'ÉNERGIE THERMIQUE */
  Electro3D.definir('compteurEnergie', (T, K, ctx) => {
    const M = K.mat;
    const A = aides(T, K);
    const C = A.C;
    const racine = new T.Group();

    /* ---------------------------------------------------------------- cotes */
    const YD = 165;          /* axe du tuyau de départ (le retour est à y = 0) */
    const XS = 185;          /* position de la sonde de départ */
    const XR = 42;           /* position de la sonde de retour (dans le corps, côté entrée) */
    const XT = 330;          /* bout visible des tuyaux */
    const HB = 66;           /* dessous du boîtier du calculateur */
    const DP = 24, DI = 20;  /* demi-épaisseur du corps, demi-épaisseur de la chambre */
    const TDEP = 60;         /* température de départ (°C), comme la station « puissance » */

    /* ---------------------------------------------------------------- matières */
    const laiton = C(M.laiton, 0xd9bb68);
    const laitonRelief = C(M.laiton, 0xb8913f);
    const cuivre = C(M.cuivre);
    const inox = C(M.acier, 0xd5dade);
    const gris = C(M.plastique);
    const sombre = C(M.plastiqueSombre);
    const noir = C(M.plastiqueNoir);
    const zingue = C(M.zingue);
    const roueMat = C(M.plastiqueBlanc, 0xe9e0c6);
    const roueRepere = C(M.plastiqueOrange);
    const pateMat = C(M.plastiqueBlanc, 0xf2dc8c);
    const cableMat = K.plastique(0x33373c, 0.55);

    /* ---------------------------------------------------------------- géométrie */
    const surX = (g, x, y) => { g.rotateZ(Math.PI / 2); g.translate(x, y || 0, 0); return g; };
    const anneauX = (rE, rI, x0, x1, mat, y, seg) => new T.Mesh(surX(K.anneau(rE, rI, x1 - x0, seg || 40), (x0 + x1) / 2, y), mat);
    const cylY = (r, y0, y1, mat, x, z, seg) => { const m = new T.Mesh(K.cylindre(r, y1 - y0, seg || 28), mat); m.position.set(x || 0, (y0 + y1) / 2, z || 0); return m; };
    const anneauY = (rE, rI, y0, y1, mat, x, z, seg) => { const m = new T.Mesh(K.anneau(rE, rI, y1 - y0, seg || 28), mat); m.position.set(x || 0, (y0 + y1) / 2, z || 0); return m; };
    /* un solide dont la section est un polygone du plan (x, y), de z0 à z1 */
    const prisme = (poly, z0, z1, mat) => {
      const g = new T.ExtrudeGeometry(new T.Shape(poly.map(q => new T.Vector2(q[0], q[1]))), { depth: z1 - z0, bevelEnabled: false });
      g.translate(0, 0, z0); return new T.Mesh(g, mat);
    };
    /* la bride d'extrémité : une plaque percée d'un trou rond de Ø20, perpendiculaire à X */
    const bride = (x0, ep, mat) => {
      const s = new T.Shape(); s.moveTo(-DP, -14); s.lineTo(DP, -14); s.lineTo(DP, 14); s.lineTo(-DP, 14);
      const h = new T.Path(); h.absarc(0, 0, 10, 0, Math.PI * 2, true); s.holes.push(h);
      const g = new T.ExtrudeGeometry(s, { depth: ep, bevelEnabled: false, curveSegments: 24 });
      g.rotateY(Math.PI / 2); g.translate(x0, 0, 0); return new T.Mesh(g, mat);
    };
    const V = (x, y, z) => new T.Vector3(x, y, z);

    /* ================================================================ LE CORPS DU DÉBITMÈTRE
       Profil dans le plan de la coupe : un socle (S1) avec un noyau central, deux parois (S2) autour de
       la chambre de la roue. L'eau entre à droite, monte à droite du noyau, tourne autour de la roue,
       redescend à gauche du noyau et sort à gauche. Deux plaques (avant, arrière) ferment le tout. */
    const S1 = [[-34, -14], [34, -14], [34, -10], [14, -10], [14, 22], [-14, 22], [-14, -10], [-34, -10]];
    const S2D = [[22, 10], [34, 10], [34, 14], [26, 14], [26, 42], [22, 42]];
    const S2G = S2D.map(([x, y]) => [-x, y]).reverse();
    const CONTOUR = [[-34, -14], [34, -14], [34, 14], [26, 14], [26, 42], [-26, 42], [-26, 14], [-34, 14]];
    const bloc = new T.Group();
    bloc.add(prisme(S1, -DI, DI, laiton), prisme(S2D, -DI, DI, laiton), prisme(S2G, -DI, DI, laiton));
    bloc.add(prisme(CONTOUR, DI, DP, laiton), prisme(CONTOUR, -DP, -DI, laiton));
    bloc.add(bride(30, 4, laiton), bride(-34, 4, laiton));
    /* la flèche moulée sur la face avant : elle suit l'eau du retour, de droite à gauche */
    {
      const f = new T.Shape();
      [[20, -3.5], [2, -3.5], [2, -8], [-22, 0], [2, 8], [2, 3.5], [20, 3.5]].forEach((p, i) => i ? f.lineTo(p[0], p[1]) : f.moveTo(p[0], p[1]));
      bloc.add(K.mesh(K.extrusion(f, 1.4, 0.3), laitonRelief, 0, 0, DP + 0.4));
    }
    racine.add(bloc);

    /* le couvercle de la chambre, qui porte l'axe de la roue */
    const couvercle = K.mesh(K.boite(52, 4, 2 * DP, 1.4), laiton, 0, 44, 0);

    /* ---------------------------------------------------------------- raccords à écrou et tuyaux */
    const raccords = new T.Group();
    [-1, 1].forEach(s => {
      const x0 = s > 0 ? 33 : -50, x1 = s > 0 ? 50 : -33;
      raccords.add(anneauX(14, 10, x0, x1, laiton));                                  /* le manchon fileté */
      raccords.add(A.hexa(21, 10, s > 0 ? 50 : -70, 20, laiton));                       /* l'écrou six pans */
    });
    racine.add(raccords);

    const tuyaux = new T.Group();
    tuyaux.add(anneauX(11, 10, 70, XT, cuivre, 0), anneauX(11, 10, -XT, -70, cuivre, 0));
    tuyaux.add(anneauX(11, 10, -XT, XT, cuivre, YD, 48));
    racine.add(tuyaux);

    /* ================================================================ LA ROUE ET SON AXE (non coupés) */
    const axe = cylY(2, 21, 43, inox, 0, 0, 16);
    const roue = new T.Group();
    roue.add(cylY(4.2, 25.5, 37.5, roueMat, 0, 0, 20));                                 /* le moyeu */
    roue.add(cylY(13.5, 25.5, 26.7, roueMat, 0, 0, 40));                                /* le plateau du dessous */
    for (let k = 0; k < 10; k++) {                                                      /* dix ailettes radiales */
      const pivot = new T.Group(); pivot.rotation.y = k * 36 * D;
      pivot.add(K.mesh(new T.BoxGeometry(9.8, 11, 1.5), k === 0 ? roueRepere : roueMat, 9, 32, 0));
      roue.add(pivot);
    }
    const cartouche = new T.Group();      /* ce qu'on sort d'un bloc par le haut : couvercle, axe, roue */
    cartouche.add(couvercle, axe, roue);
    racine.add(cartouche);

    /* ================================================================ LA SONDE DU RETOUR (dans le corps) */
    const sondeRetour = new T.Group();
    sondeRetour.add(cylY(6, 12, 24, laiton, XR, 0, 24));                                /* l'embase */
    sondeRetour.add(cylY(2.6, -2, 20, inox, XR, 0, 16));                                /* la sonde, plongée dans l'eau */
    const cableR = K.fil([[XR, 24, -2], [XR, 32, -8], [XR - 2, 52, -10], [XR - 2, HB + 1, -8]], 1.5, cableMat, { pas: 2 });
    racine.add(sondeRetour, cableR.mesh);

    /* ================================================================ LA SONDE DU DÉPART : doigt de gant, pâte, sonde */
    const doigt = new T.Group();
    doigt.add(anneauY(12, 5, YD + 10, YD + 20, laiton, XS, 0, 32));                     /* l'embase vissée sur le tuyau */
    doigt.add(anneauY(5, 3.6, YD - 2, YD + 24, inox, XS, 0, 24));                       /* le doigt de gant, fermé au fond */
    doigt.add(cylY(5, YD - 3.5, YD - 2, inox, XS, 0, 24));
    doigt.add(anneauY(3.6, 2.6, YD - 0.8, YD + 14, pateMat, XS, 0, 20));                /* la pâte thermique autour de la sonde */
    doigt.add(cylY(3.6, YD - 2, YD - 0.8, pateMat, XS, 0, 20));                         /* ... et sous son bout */
    racine.add(doigt);

    const sondeDepart = new T.Group();
    sondeDepart.add(cylY(2.6, YD - 0.8, YD + 34, inox, XS, 0, 16));                     /* la gaine de la sonde */
    const teteSonde = new T.Group();
    teteSonde.add(cylY(8, YD + 25, YD + 38, noir, XS, 0, 28), cylY(5.5, YD + 38, YD + 42, zingue, XS, 0, 24), cylY(3.2, YD + 42, YD + 46, noir, XS, 0, 16));
    sondeDepart.add(teteSonde);
    const cableD = K.fil([[XS, YD + 45, 0], [XS + 3, YD + 54, -14], [XS - 14, YD + 54, -38], [130, YD + 20, -44], [80, 128, -34], [62, 100, -12], [56, 92, -6]], 1.6, cableMat, { pas: 2.5 });
    racine.add(sondeDepart, cableD.mesh);

    /* ================================================================ LE CALCULATEUR (non coupé) */
    const tete = new T.Group();
    const boitier = new T.Group();
    boitier.add(cylY(15, 46, HB + 1.5, sombre, 0, 0, 32));                              /* le collier de fixation */
    boitier.add(K.mesh(K.boite(104, 58, 2 * 22, 6), gris, 0, HB + 29, 0));                  /* le boîtier, de y = 66 à 124 */
    boitier.add(K.mesh(K.boite(70, 36, 1.4, 2), sombre, 0, HB + 32, 22.5));                  /* le cadre de l'écran */
    boitier.add(K.mesh(K.cylindre(5.5, 2.4, 24), noir, 40, HB + 30, 23.4)).children[boitier.children.length - 1].rotation.x = Math.PI / 2;
    {
      const gl = new T.Mesh(surX(K.cylindre(5.5, 8, 20), 55), noir); gl.position.set(0, HB + 24, -6); boitier.add(gl);
    }
    tete.add(boitier);

    /* l'écran à cristaux liquides : une toile qu'on réécrit */
    const LW = 62, LH = 27;
    const toile = document.createElement('canvas'); toile.width = 992; toile.height = 432;
    const g2 = toile.getContext('2d');
    const texLcd = new T.CanvasTexture(toile); texLcd.colorSpace = T.SRGBColorSpace; texLcd.anisotropy = 4;
    const lcd = new T.Mesh(new T.PlaneGeometry(LW, LH), new T.MeshBasicMaterial({ map: texLcd, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2 }));
    lcd.position.set(0, HB + 32, 23.35); lcd.userData.sansOmbre = true; lcd.castShadow = false;
    /* un voile transparent par-dessus : c'est lui qui s'allume quand on survole « L'écran » */
    const voileEcran = new T.Mesh(new T.PlaneGeometry(LW, LH), new T.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0, depthWrite: false, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -4 }));
    voileEcran.position.set(0, HB + 32, 23.65); voileEcran.userData.sansOmbre = true; voileEcran.userData.voile = true; voileEcran.castShadow = false;
    tete.add(lcd, voileEcran);
    racine.add(tete);

    const ecrireLcd = page => {
      g2.fillStyle = '#c6d3ad'; g2.fillRect(0, 0, 992, 432);
      g2.strokeStyle = 'rgba(26,42,20,.22)'; g2.lineWidth = 6; g2.strokeRect(10, 10, 972, 412);
      g2.fillStyle = '#1a2a14'; g2.textBaseline = 'middle';
      const police = (px, gras) => (gras ? '700 ' : '600 ') + px + 'px Consolas, "Courier New", monospace';
      if (page.lignes) {
        page.lignes.forEach(([tag, val, unite], i) => {
          const y = 112 + i * 104;
          g2.textAlign = 'left'; g2.font = police(76, true); g2.fillText(tag, 52, y);
          g2.textAlign = 'right'; g2.font = police(104, true); g2.fillText(val, 700, y);
          g2.textAlign = 'left'; g2.font = police(72, true); g2.fillText(unite, 722, y + 6);
        });
      } else {
        g2.textAlign = 'left'; g2.font = police(92, true); g2.fillText(page.tag, 52, 96);
        let px = 220; g2.font = police(px, true);
        while (g2.measureText(page.val).width > 640 && px > 80) { px -= 8; g2.font = police(px, true); }
        g2.textAlign = 'right'; g2.fillText(page.val, 700, 250);
        g2.textAlign = 'left'; g2.font = police(104, true); g2.fillText(page.unite, 722, 290);
      }
      texLcd.needsUpdate = true;
    };

    /* ================================================================ LES FACES DE COUPE
       Dessinées dans le plan z = 0 (coordonnées x, y), hachures à 45° comme sur un plan. */
    const H = {
      laiton: A.hachures('#b08f45', '#6a511c', 6),
      inox: A.hachures('#8793a0', '#262e38', 2.4),
      cuivre: A.uni(0xb8683c, { metalness: 0.3, roughness: 0.5 }),
      sonde: A.uni(0xc3cad1, { metalness: 0.2, roughness: 0.4 }),
      pate: A.uni(0xf2dc8c),
      eauR: A.eau(0x8fb8ea), eauD: A.eau(0xe45a40)
    };
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const faceXY = (polys, mat, z, groupe) => {
      const m = new T.Mesh(new T.ShapeGeometry(polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1]))))), mat);
      m.position.z = z; m.userData.sansOmbre = true; m.castShadow = false; if (mat.transparent) m.userData.voile = true;
      (groupe || faces).add(m); return m;
    };
    const R = (x0, x1, y0, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    const MX = polys => polys.map(p => p.map(q => [-q[0], q[1]]));
    const groupeFaces = () => { const g = new T.Group(); faces.add(g); return g; };

    const facesCorps = groupeFaces();
    faceXY([S1, S2D, S2G], H.laiton, 0.03, facesCorps);
    const facesCouvercle = groupeFaces();
    faceXY([R(-26, 26, 42, 46)], H.laiton, 0.03, facesCouvercle);
    const facesRaccords = groupeFaces();
    {
      const d = [R(34, 50, 10, 14), R(34, 50, -14, -10), R(50, 70, 10, 18.19), R(50, 70, -18.19, -10)];
      faceXY([...d, ...MX(d)], H.laiton, 0.03, facesRaccords);
    }
    const facesTuyaux = groupeFaces();
    {
      const r = [R(70, XT, 10, 11), R(70, XT, -11, -10)];
      faceXY([...r, ...MX(r), R(-XT, XS - 12, YD + 10, YD + 11), R(XS + 12, XT, YD + 10, YD + 11), R(-XT, XT, YD - 11, YD - 10)], H.cuivre, 0.03, facesTuyaux);
    }
    const facesSondeRetour = groupeFaces();
    faceXY([R(XR - 6, XR + 6, 14, 24)], H.laiton, 0.03, facesSondeRetour);
    faceXY([R(XR - 2.6, XR + 2.6, -2, 20)], H.sonde, 0.05, facesSondeRetour);
    const facesDoigt = groupeFaces();
    faceXY([R(XS - 12, XS - 5, YD + 10, YD + 20), R(XS + 5, XS + 12, YD + 10, YD + 20)], H.laiton, 0.03, facesDoigt);
    faceXY([R(XS - 5, XS - 3.6, YD - 2, YD + 24), R(XS + 3.6, XS + 5, YD - 2, YD + 24), R(XS - 5, XS + 5, YD - 3.5, YD - 2)], H.inox, 0.04, facesDoigt);
    faceXY([R(XS - 3.6, XS - 2.6, YD - 0.8, YD + 14), R(XS + 2.6, XS + 3.6, YD - 0.8, YD + 14), R(XS - 3.6, XS + 3.6, YD - 2, YD - 0.8)], H.pate, 0.05, facesDoigt);
    const facesSondeDepart = groupeFaces();
    faceXY([R(XS - 2.6, XS + 2.6, YD - 0.8, YD + 28)], H.sonde, 0.06, facesSondeDepart);
    const facesCartouche = groupeFaces();      /* le couvercle (la roue et l'axe restent entiers) */
    facesCartouche.add(facesCouvercle); faces.remove(facesCouvercle);

    /* l'eau, en coupe : tout le trajet du retour d'un seul tenant, puis le tuyau du départ */
    const facesEau = groupeFaces();
    const eauRetour = faceXY([[[XT, -10], [14, -10], [14, 22], [-14, 22], [-14, -10], [-XT, -10], [-XT, 10], [-22, 10], [-22, 42], [22, 42], [22, 10], [XT, 10]]], H.eauR, -3.8, facesEau);
    faceXY([R(-XT, XT, YD - 10, YD + 10)], H.eauD, -3.8, facesEau);

    /* ================================================================ L'EAU QUI CIRCULE
       Grains rouges au départ ; au retour, la teinte suit l'écart ΔT (rouge quand il est petit, bleu quand il est grand). */
    const ligne = (x0, x1, y, pas) => { const p = [], n = Math.max(1, Math.round(Math.abs(x1 - x0) / pas)); for (let i = 0; i <= n; i++) p.push(V(x0 + (x1 - x0) * i / n, y, 0)); return p; };
    const RS = 17.5, NSP = 36;
    const ptsR = [...ligne(XT, 60, 0, 35), V(40, 0, 0), V(26, 0, 0), V(19, 3.5, 0), V(18, 13, 0), V(RS, 22, 0)];
    for (let k = 0; k <= NSP; k++) { const a = k / NSP * 3 * Math.PI; ptsR.push(V(RS * Math.cos(a), 31 - 5 * (k / NSP), -RS * Math.sin(a))); }
    ptsR.push(V(-RS, 20, 0), V(-18, 12, 0), V(-19, 3.5, 0), V(-26, 0, 0), V(-40, 0, 0), ...ligne(-60, -XT, 0, 35));
    const cRetour = new T.CatmullRomCurve3(ptsR, false, 'centripetal');
    const ptsD = [...ligne(-XT, XS - 30, YD, 40), V(XS - 17, YD - 1, 0), V(XS - 8, YD - 5.5, 0), V(XS, YD - 8, 0), V(XS + 8, YD - 5.5, 0), V(XS + 17, YD - 1, 0), ...ligne(XS + 30, XT, YD, 40)];
    const cDepart = new T.CatmullRomCurve3(ptsD, false, 'centripetal');
    const flotR = K.courant(cRetour, { pas: 14, rayon: 3.6, couleur: BLEU, vitesse: 70 });
    const flotD = K.courant(cDepart, { pas: 14, rayon: 3.6, couleur: 0xb83a20, vitesse: 70 });
    const flots = [flotR, flotD];
    flots.forEach(f => { f.objet.material.side = T.DoubleSide; });   /* un grain coupé en deux se voit de l'intérieur */
    flots.forEach(f => racine.add(f.objet));

    /* ================================================================ L'ÉTAT */
    const PAGES = ['energie', 'puissance', 'debit', 'temperatures'];
    const E = { Q: 1.2, dT: 6, aff: 'auto', page: 0, tPage: 0, tUI: 0, kwh: 0, min: 0, w: 0, angle: 0, coupe: false, demonte: false };
    const puissance = () => 1.16 * E.Q * E.dT;
    const pageCourante = () => E.aff === 'auto' ? PAGES[E.page] : E.aff;
    const majEcran = () => {
      const p = pageCourante();
      if (p === 'energie') ecrireLcd({ tag: 'E', val: nb(E.kwh, 2), unite: 'kWh' });
      else if (p === 'puissance') ecrireLcd({ tag: 'P', val: nb(puissance(), 1), unite: 'kW' });
      else if (p === 'debit') ecrireLcd({ tag: 'Q', val: nb(E.Q, 1), unite: 'm³/h' });
      else ecrireLcd({ lignes: [['T1', nb(TDEP, 1), '°C'], ['T2', nb(TDEP - E.dT, 1), '°C'], ['ΔT', nb(E.dT, 1), 'K']] });
    };
    const majMesures = () => ctx.mesures([
      { libelle: 'La puissance', valeur: nb(puissance(), 1) + ' kW' },
      { libelle: 'Le temps (accéléré)', valeur: nb(E.min, 0) + ' min' },
      { libelle: 'L’énergie comptée', valeur: nb(E.kwh, 2) + ' kWh' }
    ]);
    const majTexte = () => {
      const P = puissance();
      ctx.dire('<strong>Puissance : ' + nb(P, 1) + ' kW.</strong> Le débit est de ' + nb(E.Q, 1) + ' m³/h ; l’eau perd ' + nb(E.dT, 0) + ' K ('
        + nb(TDEP, 0) + ' °C au départ, ' + nb(TDEP - E.dT, 0) + ' °C au retour). Puissance en kW ≈ 1,16 × débit en m³/h × ΔT en K : 1,16 × '
        + nb(E.Q, 1) + ' × ' + nb(E.dT, 0) + ' = ' + nb(P, 1) + ' kW. Chaque minute, le compteur ajoute ' + nb(P / 60, 2) + ' kWh.'
        + ' <em>Le temps est accéléré : une seconde à l’écran = une minute réelle.</em>');
    };
    const majCouleurs = () => {
      /* l'écart ΔT donne la teinte du retour : 3 K (encore tiède, violacé) → 15 K (bien refroidi, bleu franc) */
      const c = new T.Color(ROUGE).lerp(new T.Color(BLEU), 0.65 + 0.35 * clamp((E.dT - 3) / 12, 0, 1));
      flotR.objet.material.color.copy(c).multiplyScalar(0.72); H.eauR.color.copy(c).lerp(new T.Color(0xffffff), 0.3);
    };
    const majFlots = () => {
      const v = 60 * E.Q;
      flotR.regler({ vitesse: v }); flotD.regler({ vitesse: v });
    };
    const visibilite = () => {
      const on = E.coupe && !E.demonte;
      flots.forEach(f => f.objet.visible = on);
      cableR.mesh.visible = cableD.mesh.visible = !E.demonte;
    };
    const entiers = [roue, axe, tete, teteSonde];
    const appliquerCoupe = actif => {
      const plan = actif ? [new T.Plane(new T.Vector3(0, 0, -1), 0)] : null;
      const exclus = new Set();
      [faces, ...entiers, ...flots.map(f => f.objet)].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.clipShadows = true; m.needsUpdate = true; } });
      });
      flots.forEach(f => { f.objet.material.clippingPlanes = plan; f.objet.material.needsUpdate = true; });
      faces.visible = actif; visibilite();
    };
    const basculerCoupe = on => { E.coupe = on; appliquerCoupe(on && !E.demonte); };

    majCouleurs(); majFlots(); majEcran(); majMesures(); majTexte(); visibilite();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'corps', nom: 'Le corps du débitmètre', objets: [bloc, couvercle, facesCorps, facesCouvercle], desc: 'La pièce en laiton posée sur le tuyau de retour. L’eau entre par la droite, monte dans la chambre, tourne autour de la roue, redescend et sort par la gauche. La flèche moulée sur la face donne le sens de l’eau : on pose le compteur dans ce sens.' },
      { id: 'roue', nom: 'La roue à ailettes', objets: [roue, axe], desc: 'Le jet d’eau la pousse : plus l’eau passe vite, plus elle tourne vite. Le calculateur compte ses tours et en déduit le débit.' },
      { id: 'raccords', nom: 'Les raccords à écrou', objets: [raccords, facesRaccords], desc: 'Deux écrous à six pans : on peut déposer le compteur sans couper le tube, par exemple pour le changer.' },
      { id: 'tuyaux', nom: 'Les tuyaux de cuivre', objets: [tuyaux, facesTuyaux], desc: 'Le départ, en haut : l’eau chaude va vers l’émetteur. Le retour, en bas : l’eau refroidie revient vers la production. Le compteur est posé sur le retour.' },
      { id: 'sondeRetour', nom: 'La sonde du retour', objets: [sondeRetour, cableR.mesh, facesSondeRetour], desc: 'Une petite sonde en inox plongée dans l’eau, à l’entrée du compteur. Elle mesure la température de l’eau qui revient, déjà refroidie.' },
      { id: 'doigt', nom: 'Le doigt de gant', objets: [doigt, facesDoigt], desc: 'Un petit tube en inox fermé au bout, vissé sur le tuyau de départ. L’eau chaude le touche mais ne sort pas : on change la sonde sans vider l’installation.' },
      { id: 'sondeDepart', nom: 'La sonde du départ', objets: [sondeDepart, cableD.mesh, facesSondeDepart], desc: 'Elle glisse jusqu’au fond du doigt de gant. Un peu de pâte thermique remplit le vide : la chaleur passe de l’eau à la sonde. Son câble va au calculateur.' },
      { id: 'calculateur', nom: 'Le calculateur', objets: [boitier], desc: 'Il reçoit les tours de la roue et les deux températures. Il calcule la puissance, puis l’ajoute minute après minute : c’est l’énergie.' },
      { id: 'ecran', nom: 'L’écran', objets: [voileEcran], desc: 'Il affiche tour à tour l’énergie en kWh, la puissance en kW, le débit en m³/h et les températures.' }
    ];

    const commandes = [
      { id: 'debit', type: 'curseur', libelle: 'Débit Q', min: 0.5, max: 4, pas: 0.1, valeur: 1.2, format: v => nb(v, 1) + ' m³/h' },
      { id: 'dt', type: 'curseur', libelle: 'Écart ΔT', min: 3, max: 15, pas: 1, valeur: 6, format: v => nb(v, 0) + ' K' },
      { id: 'affichage', type: 'choix', titre: 'Affichage du calculateur', options: [['auto', 'Défilement'], ['energie', 'kWh'], ['puissance', 'kW'], ['debit', 'm³/h'], ['temperatures', '°C']], valeur: 'auto' },
      { id: 'raz', type: 'action', libelle: 'Remettre le compteur à zéro' }
    ];

        const etapes = [
      { titre: 'Le compteur d’énergie, tel qu’on le pose', voirDedans: false, eclate: false,
        actions: [['debit', 1.2], ['dt', 6], ['affichage', 'auto']],
        vue: { azimut: 24, elevation: 16, zoom: 1.0, cible: [60, 90, 0] },
        texte: 'Sur le tuyau de retour, un corps en laiton avec une flèche, et un calculateur à écran. Un câble relie le calculateur à une sonde, sur le tuyau de départ, plus haut.' },
      { titre: 'On coupe : l’eau du retour fait tourner la roue', piece: 'roue', voirDedans: true, eclate: false,
        actions: [['debit', 1.2], ['dt', 6], ['affichage', 'debit']],
        vue: { azimut: 8, elevation: 20, zoom: 3.0, cible: [0, 30, 0] },
        texte: 'L’eau arrive par la droite, monte dans la chambre, tourne autour de la roue et repart par la gauche. En passant, elle pousse les ailettes : la roue tourne.' },
      { titre: 'La sonde du départ prend la température de l’eau chaude', piece: 'doigt', voirDedans: true, eclate: false,
        actions: [['debit', 1.2], ['dt', 6], ['affichage', 'temperatures']],
        vue: { azimut: 0, elevation: 8, zoom: 3.4, cible: [XS, YD + 8, 0] },
        texte: 'L’eau chaude (60 °C) touche le doigt de gant. La chaleur traverse sa paroi, puis la pâte thermique, et arrive à la sonde : elle mesure 60 °C sans toucher l’eau.' },
      { titre: 'La sonde du retour mesure l’eau refroidie : l’écart apparaît', piece: 'sondeRetour', voirDedans: true, eclate: false,
        actions: [['debit', 1.2], ['dt', 6], ['affichage', 'temperatures']],
        vue: { azimut: 0, elevation: 8, zoom: 1.9, cible: [24, 62, 0] },
        texte: 'Dans le compteur, la sonde plonge dans l’eau qui revient : 54 °C. L’eau a perdu 6 K (60 − 54) en cédant sa chaleur à l’émetteur. Cet écart s’appelle ΔT.' },
      { titre: 'Le calculateur multiplie : la puissance s’affiche', piece: 'ecran', voirDedans: true, eclate: false,
        actions: [['debit', 1.2], ['dt', 6], ['affichage', 'puissance']],
        vue: { azimut: 8, elevation: 10, zoom: 2.2, cible: [10, 94, 0] },
        texte: 'Il connaît le débit (1,2 m³/h) et l’écart (6 K). Puissance en kW ≈ 1,16 × 1,2 × 6 = 8,4 kW. Le résultat s’affiche sur l’écran.' },
      { titre: 'Le débit double : la roue tourne deux fois plus vite', piece: 'roue', voirDedans: true, eclate: false,
        actions: [['debit', 2.4], ['dt', 6], ['affichage', 'puissance']],
        vue: { azimut: 6, elevation: 14, zoom: 1.7, cible: [10, 70, 0] },
        texte: 'Avec 2,4 m³/h, il passe deux fois plus d’eau : la roue tourne deux fois plus vite. À écart égal (6 K), la puissance double : 1,16 × 2,4 × 6 = 16,7 kW.' },
      { titre: 'La puissance s’ajoute minute après minute : l’énergie s’accumule', piece: 'ecran', voirDedans: true, eclate: false,
        actions: [['debit', 1.2], ['dt', 6], ['raz', true], ['affichage', 'energie']],
        vue: { azimut: 8, elevation: 10, zoom: 2.2, cible: [10, 94, 0] },
        texte: 'Le calculateur ajoute la puissance au total, minute après minute. À 8,4 kW, il compte 0,14 kWh chaque minute : c’est l’énergie. Ici le temps est accéléré, une seconde vaut une minute.' }
    ];

    const eclate = [
      { objets: [tete], vers: [0, 150, 70], debut: 0, fin: 0.45 },
      { objets: [cartouche], vers: [0, 75, 0], debut: 0.3, fin: 0.85 },
      { objets: [sondeRetour, sondeDepart], vers: [0, 85, 0], debut: 0.5, fin: 1 }
    ];

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 30, elevation: 16, zoom: 0.8, cible: [60, 150, 30] },
      vue: ctx.mode === 'decouvrir' ? { azimut: 24, elevation: 16, cadre: [raccords, tete, doigt], marge: 0.95 }
                                    : { azimut: 0, elevation: 6, cadre: [raccords, tete, doigt], marge: 0.95 },
      phrase: undefined,
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'debit') { E.Q = +v; ctx.regler('debit', +v); }
        else if (id === 'dt') { E.dT = +v; ctx.regler('dt', +v); }
        else if (id === 'affichage') { E.aff = v; E.tPage = 0; ctx.regler('affichage', v); }
        else if (id === 'raz') { E.kwh = 0; E.min = 0; }
        majCouleurs(); majFlots(); majEcran(); majMesures(); majTexte();
      },
      surEclate(on) { E.demonte = on; appliquerCoupe(E.coupe && !on); },
      animer(dt) {
        const cible = E.demonte ? 0 : 2.2 * E.Q;
        E.w = K.vers(E.w, cible, 2.5, dt);
        E.angle += E.w * dt;
        roue.rotation.y = E.angle;
        if (!E.demonte) { E.kwh += puissance() * dt / 60; E.min += dt; }
        E.tPage += dt; E.tUI += dt;
        if (E.aff === 'auto' && E.tPage > 2.6) { E.tPage = 0; E.page = (E.page + 1) % PAGES.length; majEcran(); }
        if (E.tUI > 0.2) { E.tUI = 0; if (!E.demonte) { majMesures(); if (pageCourante() === 'energie') majEcran(); } }
        if (E.coupe && !E.demonte) flots.forEach(f => f.animer(dt));
        return true;
      }
    };
  }, { famille: 'mesure', titre: 'Le compteur d’énergie thermique', stations: ['energie', 'puissance'] });
  /* ================================================================ LES THERMOMÈTRES À PLONGEUR ET LE MANOMÈTRE
     ── thermometres ──────────────────────────────────────────────────────────────────────────
     Même repère que le compteur : X le long des tuyaux, Y en haut, +Z vers l'élève. Le DÉPART (eau chaude,
     rouge) est le tuyau du haut (y = 150), l'eau y va de gauche à droite ; le RETOUR (bleu) est le tuyau du
     bas (y = 0), l'eau y va de droite à gauche. Sur chaque tuyau, un doigt de gant (tube en inox fermé)
     vissé sur un piquage, et dedans la tige d'un thermomètre à cadran. Un manomètre est vissé sur le départ.

     CE QUE L'ÉLÈVE DOIT VOIR :
     · la tige plonge dans le doigt de gant, l'eau ne sort pas ; la PÂTE THERMIQUE remplit le vide autour de
       la tige : la chaleur traverse la paroi puis la pâte jusqu'à la tige (grains orange). Sans pâte, il
       reste de l'air, qui isole : la chaleur n'arrive plus à la tige, l'aiguille est lente et lit un peu bas ;
     · l'écart ΔT se lit sur les deux cadrans : départ − retour. À puissance d'émetteur constante
       (23,2 kW, comme la station « Puissance »), ΔT = 23,2 ÷ (1,16 × débit) : le débit baisse, ΔT monte ;
     · le manomètre lit la pression de l'eau du circuit (elle monte un peu quand l'eau chauffe).

     « Voir en coupe » tranche tout par le plan z = 0 (moitié avant retirée) ; les cadrans, aiguilles et grains
     de chaleur restent entiers. Cotes EXAGÉRÉES : le vide autour de la tige fait 2,5 mm (1 mm sur un vrai
     doigt de gant) pour qu'on le voie ; la tige fait Ø6. */
  Electro3D.definir('thermometres', (T, K, ctx) => {
    const M = K.mat;
    const A = aides(T, K);
    const C = A.C;
    const racine = new T.Group();

    const YD = 150, XT = 300, XTH = -70, XMA = 90;
    const PR = 7.5, PB = 5.5, SR = 3;                 /* doigt de gant : extérieur, alésage ; rayon de la tige */
    const PUISS = 23.2;                                /* kW, comme la station « Puissance » */
    const laiton = C(M.laiton, 0xd9bb68), cuivre = C(M.cuivre), inox = C(M.acier, 0xd5dade);
    const noir = C(M.plastiqueNoir), zingue = C(M.zingue);
    const boitierInox = C(M.acier, 0xd5dade);          /* le boîtier du thermomètre : à lui, il ne se coupe pas */
    const pateMat = C(M.plastiqueBlanc, 0xf2dc8c);

    const surX = (g, x, y) => { g.rotateZ(Math.PI / 2); g.translate(x, y || 0, 0); return g; };
    const anneauX = (rE, rI, x0, x1, mat, y, seg) => new T.Mesh(surX(K.anneau(rE, rI, x1 - x0, seg || 40), (x0 + x1) / 2, y), mat);
    const cylY = (r, y0, y1, mat, x, z, seg) => { const m = new T.Mesh(K.cylindre(r, y1 - y0, seg || 28), mat); m.position.set(x || 0, (y0 + y1) / 2, z || 0); return m; };
    const anneauY = (rE, rI, y0, y1, mat, x, z, seg) => { const m = new T.Mesh(K.anneau(rE, rI, y1 - y0, seg || 28), mat); m.position.set(x || 0, (y0 + y1) / 2, z || 0); return m; };
    /* un cylindre dont l'axe est Z (un boîtier de cadran), de z0 à z1, centré en (x, y) */
    const cylZ = (r, z0, z1, mat, x, y, seg) => { const g = K.cylindre(r, z1 - z0, seg || 48); g.rotateX(Math.PI / 2); const m = new T.Mesh(g, mat); m.position.set(x, y, (z0 + z1) / 2); return m; };
    const anneauZ = (rE, rI, z0, z1, mat, x, y, seg) => { const g = K.anneau(rE, rI, z1 - z0, seg || 48); g.rotateX(Math.PI / 2); const m = new T.Mesh(g, mat); m.position.set(x, y, (z0 + z1) / 2); return m; };
    const V = (x, y, z) => new T.Vector3(x, y, z);

    /* ---------------------------------------------------------------- les cadrans (toiles dessinées)
       Échelle sur 270° : le minimum en bas à gauche, le maximum en bas à droite. */
    const BALAYAGE = 270, CRAN0 = 135;
    const thetaDe = (v, vmax) => (CRAN0 - BALAYAGE * clamp(v / vmax, 0, 1)) * D;
    const faceCadran = (vmax, pasFin, pasNum, unite, zones) => {
      const c = document.createElement('canvas'); c.width = c.height = 512;
      const x = c.getContext('2d'); x.fillStyle = '#fbfaf4'; x.fillRect(0, 0, 512, 512);
      const pos = (v, r) => { const th = thetaDe(v, vmax); return [256 - Math.sin(th) * r, 256 - Math.cos(th) * r]; };
      (zones || []).forEach(([v0, v1, col]) => {
        x.strokeStyle = col; x.lineWidth = 16; x.beginPath();
        for (let i = 0; i <= 40; i++) { const [px, py] = pos(v0 + (v1 - v0) * i / 40, 214); i ? x.lineTo(px, py) : x.moveTo(px, py); }
        x.stroke();
      });
      x.strokeStyle = '#1b2430'; x.fillStyle = '#1b2430'; x.textAlign = 'center'; x.textBaseline = 'middle';
      for (let v = 0; v <= vmax + 1e-6; v += pasFin) {
        const gros = Math.abs(v / pasNum - Math.round(v / pasNum)) < 1e-6;
        const [x0, y0] = pos(v, 232), [x1, y1] = pos(v, gros ? 196 : 212);
        x.lineWidth = gros ? 7 : 3.5; x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.stroke();
        if (gros) { const [tx, ty] = pos(v, 158); x.font = '800 46px Calibri, "Segoe UI", Arial, sans-serif'; x.fillText(String(Math.round(v)), tx, ty); }
      }
      x.font = '800 54px Calibri, "Segoe UI", Arial, sans-serif'; x.fillText(unite, 256, 372);
      const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4;
      return t;
    };
    const aiguilleG = (mat) => {
      const g = new T.Group();
      const s = new T.Shape(); [[-1.6, -9], [1.6, -9], [0.7, 25], [-0.7, 25]].forEach((q, i) => i ? s.lineTo(q[0], q[1]) : s.moveTo(q[0], q[1]));
      const pointe = new T.Mesh(K.extrusion(s, 0.8, 0), mat); g.add(pointe);
      const moyeu = new T.Mesh(K.cylindre(3.4, 1.6, 20), mat); moyeu.rotation.x = Math.PI / 2; moyeu.position.z = 0.4; g.add(moyeu);
      return g;
    };
    const matAiguille = C(M.plastiqueNoir, 0x15191d);
    /* un cadran complet : boîtier, lunette, face, aiguille. Rend { groupe, pivot } ; l'axe du cadran est en (x, y), face vers +Z */
    const cadranG = (texture, boitierMat, x, y) => {
      const g = new T.Group();
      const enveloppe = new T.Group();           /* ce qui s'allume avec le nom : le boîtier, sans la face ni l'aiguille (elles restent lisibles) */
      enveloppe.add(cylZ(33, -12, 9, boitierMat, x, y), anneauZ(34, 29.5, 8, 13, boitierMat, x, y));
      g.add(enveloppe);
      const face = new T.Mesh(new T.CircleGeometry(29.6, 64), new T.MeshStandardMaterial({ map: texture, roughness: 0.6, metalness: 0 }));
      face.position.set(x, y, 9.1); face.userData.sansOmbre = true; g.add(face);
      const pivot = new T.Group(); pivot.position.set(x, y, 10.4); pivot.add(aiguilleG(matAiguille)); g.add(pivot);
      const verre = new T.Mesh(new T.CircleGeometry(29.6, 48), new T.MeshStandardMaterial({ color: 0xe6f0f6, roughness: 0.05, transparent: true, opacity: 0.1, depthWrite: false }));
      verre.position.set(x, y, 12.4); verre.userData.sansOmbre = true; verre.userData.voile = true; g.add(verre);
      return { groupe: g, pivot, enveloppe };
    };

    /* ================================================================ LES TUYAUX */
    const tuyaux = new T.Group();
    tuyaux.add(anneauX(11, 10, -XT, XT, cuivre, 0, 48), anneauX(11, 10, -XT, XT, cuivre, YD, 48));
    racine.add(tuyaux);

    /* ================================================================ LES FACES DE COUPE (plan z = 0) */
    const H = {
      laiton: A.hachures('#b08f45', '#6a511c', 6),
      inox: A.hachures('#8793a0', '#262e38', 2.6),
      cuivre: A.uni(0xb8683c, { metalness: 0.3, roughness: 0.5 }),
      sonde: A.uni(0xc3cad1, { metalness: 0.2, roughness: 0.4 }),
      pate: A.uni(0xf2dc8c), air: A.uni(0xe6ecf0),
      eauPetite: A.uni(0x8fb8ea),
      eauR: A.eau(0x8fb8ea), eauD: A.eau(0xe45a40)
    };
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const faceXY = (polys, mat, z, groupe) => {
      const m = new T.Mesh(new T.ShapeGeometry(polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1]))))), mat);
      m.position.z = z; m.userData.sansOmbre = true; m.castShadow = false; if (mat.transparent) m.userData.voile = true;
      (groupe || faces).add(m); return m;
    };
    const R = (x0, x1, y0, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    const groupeFaces = () => { const g = new T.Group(); faces.add(g); return g; };

    /* ================================================================ UN THERMOMÈTRE DANS SON DOIGT DE GANT
       (x0, y0) : l'axe du doigt de gant sur le tuyau dont l'axe est à la hauteur y0. */
    const flotsChaleur = [];
    const construireThermo = (x0, y0) => {
      const o = {};
      o.doigt = new T.Group();
      o.doigt.add(anneauY(14, PR, y0 + 10, y0 + 22, laiton, x0, 0, 32));                 /* le piquage vissé sur le tuyau */
      o.doigt.add(anneauY(PR, PB, y0 - 2.5, y0 + 30, inox, x0, 0, 28));                  /* le doigt de gant, fermé au fond */
      o.doigt.add(cylY(PR, y0 - 4.5, y0 - 2.5, inox, x0, 0, 28));
      o.pate = new T.Group();
      o.pate.add(anneauY(PB, SR, y0 - 0.5, y0 + 16, pateMat, x0, 0, 24), cylY(PB, y0 - 2.5, y0 - 0.5, pateMat, x0, 0, 24));
      o.thermo = new T.Group();
      o.tige = cylY(SR, y0 - 0.5, y0 + 48, inox, x0, 0, 16);                              /* la tige du thermomètre */
      o.thermo.add(o.tige);
      const cad = cadranG(faceCadran(120, 2, 20, '°C', [[80, 120, '#d9472b']]), boitierInox, x0, y0 + 80);
      cad.enveloppe.add(cylY(9, y0 + 30, y0 + 47, zingue, x0, 0, 6));                     /* l'écrou de serrage */
      o.thermo.add(cad.groupe); o.pivot = cad.pivot; o.enveloppe = cad.enveloppe;
      o.facesDoigt = groupeFaces(); o.facesPate = groupeFaces(); o.facesAir = groupeFaces(); o.facesTige = groupeFaces();
      faceXY([R(x0 - 14, x0 - PR, y0 + 10, y0 + 22), R(x0 + PR, x0 + 14, y0 + 10, y0 + 22)], H.laiton, 0.03, o.facesDoigt);
      faceXY([R(x0 - PR, x0 - PB, y0 - 2.5, y0 + 30), R(x0 + PB, x0 + PR, y0 - 2.5, y0 + 30), R(x0 - PR, x0 + PR, y0 - 4.5, y0 - 2.5)], H.inox, 0.04, o.facesDoigt);
      faceXY([R(x0 - PB, x0 - SR, y0 - 0.5, y0 + 16), R(x0 + SR, x0 + PB, y0 - 0.5, y0 + 16), R(x0 - PB, x0 + PB, y0 - 2.5, y0 - 0.5)], H.pate, 0.05, o.facesPate);
      faceXY([R(x0 - PB, x0 - SR, y0 - 0.5, y0 + 16), R(x0 + SR, x0 + PB, y0 - 0.5, y0 + 16), R(x0 - PB, x0 + PB, y0 - 2.5, y0 - 0.5)], H.air, 0.05, o.facesAir);
      faceXY([R(x0 - SR, x0 + SR, y0 - 0.5, y0 + 30)], H.sonde, 0.06, o.facesTige);
      o.thermo.userData.facesTige = o.facesTige;
      /* la chaleur : avec la pâte, elle va jusqu'à la tige ; sans pâte, elle s'arrête à la paroi du doigt de gant
         (grains placés devant le plan de coupe, pour qu'on les voie sur les faces hachurées) */
      const base = [V(x0 - 20, y0 + 4, 1.8), V(x0 - 13, y0 + 4, 1.8), V(x0 - 8.5, y0 + 4, 1.8)];
      o.chAvec = K.courant(new T.CatmullRomCurve3([...base, V(x0 - 4.2, y0 + 4, 1.8), V(x0 - 0.4, y0 + 4, 1.8)], false, 'centripetal'), { nombre: 5, rayon: 1.5, couleur: 0xff8a1f, vitesse: 14 });
      o.chSans = K.courant(new T.CatmullRomCurve3([...base, V(x0 - 5.2, y0 + 4, 1.8)], false, 'centripetal'), { nombre: 4, rayon: 1.5, couleur: 0xff8a1f, vitesse: 14 });
      flotsChaleur.push(o.chAvec, o.chSans);
      racine.add(o.doigt, o.pate, o.thermo, o.chAvec.objet, o.chSans.objet);
      return o;
    };
    const thD = construireThermo(XTH, YD), thR = construireThermo(XTH, 0);

    /* ================================================================ LE MANOMÈTRE (sur le départ) */
    const mano = new T.Group();
    const raccordMano = new T.Group();
    raccordMano.add(anneauY(7, 3, YD + 10, YD + 40, laiton, XMA, 0, 24));                  /* le raccord, percé d'un petit canal */
    raccordMano.add(anneauY(9, 7, YD + 28, YD + 38, laiton, XMA, 0, 6));                  /* sa collerette à six pans */
    mano.add(raccordMano);
    const cadMano = cadranG(faceCadran(4, 0.1, 1, 'bar', [[1, 3, '#2e9e5b'], [3, 4, '#d9472b']]), noir, XMA, YD + 73);
    mano.add(cadMano.groupe);
    racine.add(mano);
    const facesMano = groupeFaces();
    faceXY([R(XMA - 7, XMA - 3, YD + 10, YD + 40), R(XMA + 3, XMA + 7, YD + 10, YD + 40), R(XMA - 9, XMA - 7, YD + 28, YD + 38), R(XMA + 7, XMA + 9, YD + 28, YD + 38)], H.laiton, 0.03, facesMano);
    faceXY([R(XMA - 3, XMA + 3, YD + 10, YD + 40)], H.eauPetite, 0.04, facesMano);

    /* les parois de cuivre en coupe : le piquage et le raccord interrompent la paroi du haut */
    const facesTuyaux = groupeFaces();
    faceXY([R(-XT, XT, -11, -10), R(-XT, XTH - 14, 10, 11), R(XTH + 14, XT, 10, 11),
      R(-XT, XT, YD - 11, YD - 10), R(-XT, XTH - 14, YD + 10, YD + 11), R(XTH + 14, XMA - 3, YD + 10, YD + 11), R(XMA + 3, XT, YD + 10, YD + 11)], H.cuivre, 0.03, facesTuyaux);
    const facesEau = groupeFaces();
    const eauRetour = faceXY([R(-XT, XT, -10, 10)], H.eauR, -3.8, facesEau);
    faceXY([R(-XT, XT, YD - 10, YD + 10)], H.eauD, -3.8, facesEau);

    /* ================================================================ L'EAU QUI CIRCULE */
    const ligne = (x0, x1, y, pas) => { const p = [], n = Math.max(1, Math.round(Math.abs(x1 - x0) / pas)); for (let i = 0; i <= n; i++) p.push(V(x0 + (x1 - x0) * i / n, y, 0)); return p; };
    /* le départ contourne le bout du doigt de gant, le retour aussi (la pointe descend à y0 - 4,5) */
    const cDepart = new T.CatmullRomCurve3([...ligne(-XT, XTH - 34, YD, 40), V(XTH - 18, YD - 2, 0), V(XTH - 9, YD - 6.5, 0), V(XTH, YD - 8, 0), V(XTH + 9, YD - 6.5, 0), V(XTH + 18, YD - 2, 0), ...ligne(XTH + 34, XT, YD, 40)], false, 'centripetal');
    const cRetour = new T.CatmullRomCurve3([...ligne(XT, XTH + 34, 0, 40), V(XTH + 18, -2, 0), V(XTH + 9, -6.5, 0), V(XTH, -8, 0), V(XTH - 9, -6.5, 0), V(XTH - 18, -2, 0), ...ligne(XTH - 34, -XT, 0, 40)], false, 'centripetal');
    const flotD = K.courant(cDepart, { pas: 14, rayon: 3.4, couleur: 0xb83a20, vitesse: 70 });
    const flotR = K.courant(cRetour, { pas: 14, rayon: 3.4, couleur: BLEU, vitesse: 70 });
    const flotsEau = [flotD, flotR];
    const flots = [...flotsEau, ...flotsChaleur];
    flots.forEach(f => { f.objet.material.side = T.DoubleSide; });
    racine.add(flotD.objet, flotR.objet);

    /* ================================================================ L'ÉTAT */
    const E = { dep: 60, Q: 2, pate: 'avec', luD: 60, luR: 50, coupe: false, demonte: false, tUI: 0 };
    const dT = () => PUISS / (1.16 * E.Q);
    const retour = () => Math.max(20, E.dep - dT());
    const pression = () => 1 + 0.01 * (E.dep - 20);
    const lu = v => Math.round(v);
    const cibleLue = v => E.pate === 'avec' ? v : v - 0.04 * (v - 20);
    const majAiguilles = () => {
      thD.pivot.rotation.z = thetaDe(E.luD, 120); thR.pivot.rotation.z = thetaDe(E.luR, 120);
      cadMano.pivot.rotation.z = thetaDe(pression(), 4);
    };
    const majMesures = () => ctx.mesures([
      { libelle: 'Départ lu', valeur: nb(lu(E.luD), 0) + ' °C' },
      { libelle: 'Retour lu', valeur: nb(lu(E.luR), 0) + ' °C' },
      { libelle: 'Écart ΔT lu', valeur: nb(lu(E.luD) - lu(E.luR), 0) + ' K' }
    ]);
    const majTexte = () => {
      const d = lu(E.luD), r = lu(E.luR);
      ctx.dire('<strong>Départ ' + nb(d, 0) + ' °C, retour ' + nb(r, 0) + ' °C : ΔT = ' + nb(d, 0) + ' − ' + nb(r, 0) + ' = ' + nb(d - r, 0) + ' K.</strong> '
        + (E.pate === 'avec'
          ? 'La pâte thermique relie la tige au doigt de gant : les aiguilles suivent bien l’eau. '
          : 'Sans pâte, l’air isole la tige : les aiguilles sont lentes et lisent un peu bas. Attendez avant de lire. ')
        + 'Le manomètre lit ' + nb(pression(), 1) + ' bar. <em>À puissance d’émetteur constante (23,2 kW), plus le débit baisse, plus l’écart grandit.</em>');
    };
    const majCouleurs = () => {
      const c = new T.Color(ROUGE).lerp(new T.Color(BLEU), 0.7 + 0.3 * clamp((dT() - 5) / 15, 0, 1));
      flotR.objet.material.color.copy(c).multiplyScalar(0.72); H.eauR.color.copy(c).lerp(new T.Color(0xffffff), 0.3);
    };
    const majFlots = () => { const v = 35 * E.Q; flotD.regler({ vitesse: v }); flotR.regler({ vitesse: v }); };
    const visibilite = () => {
      const on = E.coupe && !E.demonte, avec = E.pate === 'avec';
      flotsEau.forEach(f => f.objet.visible = on);
      [thD, thR].forEach(t => {
        t.pate.visible = avec; t.facesPate.visible = avec; t.facesAir.visible = !avec;
        t.chAvec.objet.visible = on && avec; t.chSans.objet.visible = on && !avec;
      });
    };
    const entiers = [thD.thermo, thR.thermo, mano, thD.facesTige, thR.facesTige];
    const appliquerCoupe = actif => {
      const plan = actif ? [new T.Plane(new T.Vector3(0, 0, -1), 0)] : null;
      const exclus = new Set();
      [faces, ...entiers, ...flots.map(f => f.objet)].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.clipShadows = true; m.needsUpdate = true; } });
      });
      flotsEau.forEach(f => { f.objet.material.clippingPlanes = plan; f.objet.material.needsUpdate = true; });
      /* la tige et le raccord du manomètre se coupent ; leur cadran, lui, reste entier */
      [thD.tige, thR.tige, ...raccordMano.children].forEach(c => { const m = c.material; m.clippingPlanes = plan; m.clipShadows = true; m.needsUpdate = true; });
      faces.visible = actif; visibilite();
    };
    const basculerCoupe = on => { E.coupe = on; appliquerCoupe(on && !E.demonte); };

    majAiguilles(); majCouleurs(); majFlots(); majMesures(); majTexte(); visibilite();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'tuyaux', nom: 'Les tuyaux de cuivre', objets: [tuyaux, facesTuyaux], desc: 'Le départ, en haut : l’eau chaude va vers l’émetteur. Le retour, en bas : l’eau refroidie revient. Les deux thermomètres sont posés au même endroit sur chaque tuyau.' },
      { id: 'thermoDepart', nom: 'Le thermomètre du départ', objets: [thD.tige, thD.enveloppe], desc: 'Un cadran gradué en degrés Celsius, au bout d’une tige. L’aiguille tourne quand la tige chauffe. On lit la température de l’eau chaude.' },
      { id: 'doigtDepart', nom: 'Le doigt de gant du départ', objets: [thD.doigt, thD.facesDoigt], desc: 'Un petit tube en inox, fermé au bout, vissé sur le tuyau. L’eau le touche mais ne sort pas : on change le thermomètre sans vider l’installation.' },
      { id: 'thermoRetour', nom: 'Le thermomètre du retour', objets: [thR.tige, thR.enveloppe], desc: 'Le même thermomètre, sur le tuyau de retour. Son aiguille est moins haute : l’eau est plus froide.' },
      { id: 'doigtRetour', nom: 'Le doigt de gant du retour', objets: [thR.doigt, thR.facesDoigt], desc: 'Même doigt de gant, même hauteur dans le tuyau : les deux mesures sont comparables.' },
      { id: 'pate', nom: 'La pâte thermique', objets: [thD.pate, thR.pate, thD.facesPate, thR.facesPate], desc: 'Une pâte qui remplit le vide entre la tige et le doigt de gant. L’air isole ; la pâte conduit la chaleur. Sans elle, la mesure est lente et un peu fausse.' },
      { id: 'manometre', nom: 'Le manomètre', objets: [raccordMano, cadMano.enveloppe, facesMano], desc: 'Il mesure la pression de l’eau, en bar. L’eau monte dans le petit canal du raccord et pousse sur le mécanisme. C’est un autre instrument : il ne donne pas la température.' }
    ];

    const commandes = [
      { id: 'depart', type: 'curseur', libelle: 'Température de départ', min: 45, max: 80, pas: 1, valeur: 60, format: v => nb(v, 0) + ' °C' },
      { id: 'debit', type: 'curseur', libelle: 'Débit', min: 1, max: 4, pas: 0.1, valeur: 2, format: v => nb(v, 1) + ' m³/h' },
      { id: 'pate', type: 'choix', titre: 'La tige dans le doigt de gant', options: [['avec', 'Avec pâte thermique'], ['sans', 'Sans pâte thermique']], valeur: 'avec' }
    ];

    const etapes = [
      { titre: 'Les deux thermomètres et le manomètre, tels qu’on les pose', voirDedans: false, eclate: false,
        actions: [['depart', 60], ['debit', 2], ['pate', 'avec']],
        vue: { azimut: 22, elevation: 14, zoom: 1.0, cible: [10, 120, 0] },
        texte: 'Un thermomètre sur le tuyau de départ, un sur le retour, et un manomètre. Chacun a un cadran : on lit la valeur sur l’aiguille.' },
      { titre: 'On coupe : la tige plonge dans un doigt de gant', piece: 'doigtDepart', voirDedans: true, eclate: false,
        actions: [['depart', 60], ['debit', 2], ['pate', 'avec']],
        vue: { azimut: 0, elevation: 8, zoom: 3.2, cible: [XTH, YD + 12, 0] },
        texte: 'Le doigt de gant est un petit tube fermé au bout : l’eau chaude le touche mais ne sort pas. La tige du thermomètre glisse dedans.' },
      { titre: 'La pâte thermique fait passer la chaleur jusqu’à la tige', piece: 'pate', voirDedans: true, eclate: false, ralenti: true,
        actions: [['depart', 60], ['debit', 2], ['pate', 'avec']],
        vue: { azimut: 0, elevation: 8, zoom: 3.6, cible: [XTH, YD + 6, 0] },
        texte: 'La chaleur de l’eau traverse la paroi, puis la pâte, et arrive à la tige. L’aiguille indique 60 °C, comme l’eau.' },
      { titre: 'Sans pâte, il reste de l’air : la chaleur passe mal', piece: 'thermoDepart', voirDedans: true, eclate: false,
        actions: [['depart', 70], ['debit', 2], ['pate', 'sans']],
        vue: { azimut: 0, elevation: 8, zoom: 2.4, cible: [XTH, YD + 40, 0] },
        texte: 'L’air isole : la chaleur arrive à la paroi mais pas jusqu’à la tige. L’eau est à 70 °C, l’aiguille monte lentement et reste en retard : il faut attendre avant de lire.' },
      { titre: 'Le retour est plus froid : on lit l’écart', piece: 'thermoRetour', voirDedans: true, eclate: false,
        actions: [['depart', 60], ['debit', 2], ['pate', 'avec']],
        vue: { azimut: 0, elevation: 10, zoom: 1.05, cible: [10, 125, 0] },
        texte: 'Départ : 60 °C. Retour : 50 °C. L’écart ΔT est la différence entre les deux aiguilles : 60 − 50 = 10 K.' },
      { titre: 'Le débit baisse : l’écart grandit', piece: 'thermoRetour', voirDedans: true, eclate: false,
        actions: [['depart', 60], ['debit', 1], ['pate', 'avec']],
        vue: { azimut: 0, elevation: 10, zoom: 1.05, cible: [10, 125, 0] },
        texte: 'Avec 1 m³/h au lieu de 2, l’eau reste deux fois plus longtemps dans l’émetteur : elle sort à 40 °C. L’écart double : 60 − 40 = 20 K.' },
      { titre: 'Le manomètre lit la pression de l’eau', piece: 'manometre', voirDedans: true, eclate: false,
        actions: [['depart', 60], ['debit', 2], ['pate', 'avec']],
        vue: { azimut: 0, elevation: 10, zoom: 2.4, cible: [XMA, YD + 50, 0] },
        texte: 'L’eau monte dans le petit canal du raccord et pousse sur le mécanisme du manomètre : l’aiguille indique la pression, ici 1,4 bar. Ce n’est pas une température.' }
    ];

    const eclate = [
      { objets: [thD.thermo, mano], vers: [0, 105, 0], debut: 0, fin: 0.75 },
      { objets: [thR.thermo], vers: [0, 50, 120], debut: 0.25, fin: 1 }
    ];

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 30, elevation: 16, zoom: 0.62, cible: [10, 150, 30] },
      vue: ctx.mode === 'decouvrir' ? { azimut: 22, elevation: 14, cadre: [thD.thermo, thR.doigt, mano], marge: 0.95 }
                                    : { azimut: 0, elevation: 8, cadre: [thD.thermo, thR.doigt, mano], marge: 0.95 },
      phrase: undefined,
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'depart') { E.dep = +v; ctx.regler('depart', +v); }
        else if (id === 'debit') { E.Q = +v; ctx.regler('debit', +v); }
        else if (id === 'pate') {
          E.pate = v; ctx.regler('pate', v);
          /* on remonte la tige avec de la pâte : l'aiguille repart de la valeur juste ; sans pâte, elle dérive lentement */
          if (v === 'avec') { E.luD = E.dep; E.luR = retour(); }
        }
        majCouleurs(); majFlots(); majMesures(); majTexte(); visibilite(); majAiguilles();
      },
      surEclate(on) { E.demonte = on; appliquerCoupe(E.coupe && !on); },
      animer(dt) {
        const tau = E.pate === 'avec' ? 0.6 : 7;
        const k = 1 - Math.exp(-dt / tau);
        E.luD += (cibleLue(E.dep) - E.luD) * k;
        E.luR += (cibleLue(retour()) - E.luR) * k;
        majAiguilles();
        E.tUI += dt; if (E.tUI > 0.25) { E.tUI = 0; majMesures(); majTexte(); }
        if (E.coupe && !E.demonte) flots.forEach(f => f.animer(dt));
        return true;
      }
    };
  }, { famille: 'mesure', titre: 'Les thermomètres à plongeur et le manomètre', stations: ['delta-t', 'mesurer'] });
})();
