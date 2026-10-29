/* ÉlectroRézo 3D — famille « hermetique » : le compresseur hermétique monophasé (modèle compresseurHermetique).
   Unités : millimètres. Repère : X largeur, Y hauteur (axe vertical du compresseur), Z profondeur
   (+Z = face avant, celle qui porte le bornier C, S, R ; −Z = arrière).

   Ce que l'élève doit VOIR : un moteur enfermé dans une coque soudée, dont seules trois bornes sortent, sous un
   capot. Hors tension, fils débranchés, on pose les pointes d'un ohmmètre : le courant de mesure s'allume dans
   l'enroulement traversé. C–R passe par le principal seul (3 Ω), C–S par l'auxiliaire seul (11 Ω), S–R par les deux
   l'un derrière l'autre en passant par C (14 Ω). Un enroulement coupé donne OL ; une pointe sur une borne et l'autre
   sur la carcasse donne OL sans défaut, presque 0 Ω avec une masse franche.

   Rien ne tourne ici : le compresseur est hors tension. Le « mouvement » est celui du capot qui s'écarte, des
   pointes qui se déplacent, du courant de mesure qui suit les enroulements, de la molette de l'ohmmètre. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('compresseurHermetique', (T, K, ctx) => {
    const M = K.mat;
    const PI = Math.PI, D = K.D2R;
    const opt = ctx.options || {};
    const decouvrir = ctx.mode === 'decouvrir';
    const racine = new T.Group();

    /* ---------------------------------------------------------------- cotes (à confirmer sur un compresseur réel) */
    const R = 90, EP = 2.5;                                  /* la coque : rayon, épaisseur */
    const Y_BAS = -92, Y_SOUDURE = 12, Y_SOL = -100;
    const Y_B = -8, Z_PLAQUE = 96, Z_STUB = 74, Z_POINTE = 124;   /* le bornier : centre, face de l'embase, bout intérieur et bout extérieur des broches */
    const BROCHES = { C: [0, Y_B + 12], R: [-14, Y_B - 7.5], S: [14, Y_B - 7.5] };
    const Y_S0 = -17, Y_S1 = 21, RC = 40.5;                  /* le stator : bas, haut ; rayon moyen des têtes de bobine */
    const YG1 = 31.3, YG2 = 29.5;                            /* hauteur des grains sur le principal et sur l'auxiliaire */
    const THP = 35, THF = 100, YP = -2;                      /* le point gratté sur la coque ; l'angle du défaut de masse */
    const ANGLES_RESSORTS = [10, 100, 190, 280];
    const THETA_COUPURE = [48, 80];                          /* la coupure de l'auxiliaire */

    const pt = (r, deg, y) => new T.Vector3(r * Math.sin(deg * D), y, r * Math.cos(deg * D));
    const arc = (r, a0, a1, y, pas) => {
      const n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / (pas || 6))), o = [];
      for (let i = 0; i <= n; i++) o.push(pt(r, a0 + (a1 - a0) * i / n, y));
      return o;
    };
    const lathe = (pts, seg) => new T.LatheGeometry(pts.map(p => new T.Vector2(p[0], p[1])), seg || 56);

    /* ---------------------------------------------------------------- matières */
    const peinture = K.propre(M.fonte); peinture.color.setHex(0x30363d); peinture.metalness = 0.2; peinture.roughness = 0.55; peinture.side = T.DoubleSide;
    const soudureMat = K.propre(M.acierSombre);
    const gaine = K.isolant(0x33373b);                       /* les fils de liaison : gaine sombre */
    const matAux = K.propre(M.bobinage); matAux.color.setHex(0x5f8a58);   /* l'auxiliaire : un émail d'une autre couleur, pour le distinguer du principal et des grains dorés */
    const matCapot = M.plastiqueSombre;

    /* ---------------------------------------------------------------- la coque : deux demi-coques soudées */
    const profilBas = [[0, Y_BAS]];
    for (let i = 0; i <= 8; i++) { const a = i / 8 * PI / 2; profilBas.push([(R - 20) + 20 * Math.sin(a), Y_BAS + 20 - 20 * Math.cos(a)]); }
    profilBas.push([R, Y_SOUDURE]);
    const profilHaut = [[R, Y_SOUDURE], [R, 40]];
    for (let i = 1; i <= 14; i++) { const a = i / 14 * PI / 2; profilHaut.push([i === 14 ? 0 : R * Math.cos(a), 40 + 52 * Math.sin(a)]); }
    const coqueBasse = K.mesh(lathe(profilBas), peinture);
    const coqueHaute = K.mesh(lathe(profilHaut), peinture);
    const soudure = K.mesh(K.tore(R + 0.3, 2.0, 8, 72), soudureMat, 0, Y_SOUDURE, 0); soudure.rotation.x = PI / 2;
    const coqueBasseG = new T.Group(); coqueBasseG.add(coqueBasse, soudure);
    const coqueHauteG = new T.Group(); coqueHauteG.add(coqueHaute);

    /* quatre pattes soudées, sur des plots en caoutchouc */
    const pieds = new T.Group();
    [45, 135, 225, 315].forEach(a => {
      const g = new T.Group(); g.rotation.y = a * D;
      g.add(K.mesh(K.boite(26, 4, 30, 1.2), peinture, 0, -86, 95));
      g.add(K.cylY(8, 12, M.caoutchouc, 0, -94, 100, 20));
      g.add(K.cylY(3.5, 4, M.zingue, 0, -82, 100, 6));
      pieds.add(g);
    });

    /* le point gratté sur la carcasse (la peinture est enlevée pour un bon contact) : visible pendant cette mesure */
    const gratte = new T.Group(); gratte.position.copy(pt(90.1, THP, YP)); gratte.rotation.y = THP * D;
    gratte.add(K.cylZ(7, 0.6, M.acier, 0, 0, 0, 24));

    /* trois tubes de cuivre soudés sur la coque (circuit frigorifique) */
    const tubesBas = new T.Group(), tubeHaut = new T.Group();
    const tubeCuivre = pts => K.fil(pts, 3, M.cuivre, { pas: 2, radial: 10 }).mesh;
    [[-100, -30, 38], [-132, -58, 8]].forEach(([a, y0, h]) => {
      tubesBas.add(tubeCuivre([pt(86, a, y0), pt(103, a, y0), pt(113, a, y0 + 12), pt(113, a, y0 + 12 + h)]));
      const bout = K.mesh(K.cylindre(2.3, 0.8, 12), M.sombre); bout.position.copy(pt(113, a, y0 + 12 + h + 0.2)); tubesBas.add(bout);
    });
    tubeHaut.add(tubeCuivre([new T.Vector3(28.2, 87, 10.3), new T.Vector3(28.2, 100, 10.3), new T.Vector3(28.2, 114, 10.3)]));
    tubeHaut.add(K.mesh(K.boite(9, 7, 1.8, 0.6), M.cuivreSombre, 28.2, 117, 10.3));
    coqueHauteG.add(tubeHaut);

    /* ---------------------------------------------------------------- le bornier : trois broches sur une embase soudée */
    const bornierG = new T.Group();
    const plaque = K.cylZ(30, 14, M.zingue, 0, Y_B, 89, 40);
    const perles = [], broches = [], stubs = [];
    Object.keys(BROCHES).forEach(n => {
      const [x, y] = BROCHES[n];
      perles.push(K.cylZ(5.2, 5, M.ceramique, x, y, Z_PLAQUE + 2.5, 20));       /* l'isolant de verre autour de la broche */
      broches.push(K.cylZ(2.4, Z_POINTE - Z_PLAQUE, M.acier, x, y, (Z_POINTE + Z_PLAQUE) / 2, 16));
      stubs.push(K.cylZ(2.4, Z_PLAQUE - Z_STUB, M.acier, x, y, (Z_PLAQUE + Z_STUB) / 2, 16));   /* le bout qui entre dans la coque */
    });
    bornierG.add(plaque, ...perles, ...broches, ...stubs);
    const marquesBornes = [['C', 0, Y_B + 22.5], ['R', -22, Y_B - 12.5], ['S', 22, Y_B - 12.5]];
    marquesBornes.forEach(([t, x, y]) => { const g = K.gravure(t, 5.4, { couleur: '#222a31' }); g.position.set(x, y, Z_PLAQUE + 0.06); bornierG.add(g); });

    /* le capot : un couvercle de plastique, ouvert côté coque. Origine = le centre de sa face avant. */
    const capotG = new T.Group();
    const fCapot = K.formeArrondie(70, 70, 17); fCapot.holes.push(K.formeArrondie(64, 64, 14));
    const bague = K.mesh(K.extrusion(fCapot, 50), matCapot); bague.position.z = -27;
    const face = K.mesh(K.extrusion(K.formeArrondie(70, 70, 17), 4, 1), matCapot);
    capotG.add(bague, face);
    const CAPOT_SUR = new T.Vector3(0, Y_B, 134), CAPOT_HORS = new T.Vector3(-150, Y_SOL + 2, 50);
    const capotU = K.mobile(0, 90, 18);
    const placerCapot = () => {
      const u = K.clamp(capotU.x, 0, 1);
      capotG.position.lerpVectors(CAPOT_SUR, CAPOT_HORS, u);
      capotG.position.y += 45 * Math.sin(PI * u); capotG.position.z += 40 * Math.sin(PI * u);
      capotG.rotation.x = u * PI / 2;                         /* posé face contre le sol, l'ouverture en l'air */
    };

    /* ---------------------------------------------------------------- l'intérieur : le bloc sur ses ressorts */
    const blocG = new T.Group();
    blocG.add(K.cylY(56, 30, M.fonte, 0, -47, 0, 48));                 /* le corps du bloc */
    blocG.add(K.cylY(46, 15, M.fonte, 0, -24.5, 0, 48));               /* l'assise du stator */
    blocG.add(K.cylX(16, 24, M.fonte, 66, -47, 0, 28));                /* le cylindre de compression, sur le côté */
    blocG.add(K.cylX(18, 4, M.acierSombre, 80, -47, 0, 28));
    const ressortsG = new T.Group();
    ANGLES_RESSORTS.forEach(a => {
      const r = K.ressort(8, 28, 5, 1.2, M.acier);
      r.position.copy(pt(57, a, -89.5)); ressortsG.add(r);
    });

    const rotorG = new T.Group();
    rotorG.add(K.cylY(29, 32, M.acierSombre, 0, 3, 0, 40));
    rotorG.add(K.cylY(29.3, 3, M.aluminium, 0, 20.5, 0, 40), K.cylY(29.3, 3, M.aluminium, 0, -14.5, 0, 40));
    rotorG.add(K.cylY(6, 96, M.acier, 0, -14, 0, 20));                  /* l'arbre : de y = −62 à 34 */

    /* ---------------------------------------------------------------- le stator et ses deux enroulements */
    const statorG = new T.Group();
    const stack = K.mesh(lathe([[31, Y_S0], [50, Y_S0], [50, Y_S1], [31, Y_S1], [31, Y_S0]]), K.tolePile(1.2, 38));
    statorG.add(stack);

    const mainG = new T.Group(), auxG = new T.Group();
    /* un faisceau de fils côte à côte, en arc, au-dessus de l'empilage : des fils gros pour le principal, fins pour l'auxiliaire */
    const faisceau = (groupe, mat, rFil, decal, a0, a1) => {
      decal.forEach(([dr, y]) => {
        const pts = arc(RC + dr, a0, a1, y, 7);
        groupe.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), pts.length * 2, rFil, 6, false), mat));
      });
    };
    const decalP = [[-2.3, 23.2], [2.3, 23.2], [-2.3, 27.8], [2.3, 27.8]];
    const decalA = []; [-2.4, 0, 2.4].forEach(dr => [22.2, 24.6, 27.0].forEach(y => decalA.push([dr, y])));
    const ruban = (groupe, a, yc, w, h) => {                           /* un ruban de maintien autour du faisceau */
      const g = new T.Group(); g.position.copy(pt(RC, a, yc)); g.rotation.y = a * D;
      g.add(K.mesh(K.boite(2.4, h, w, 0.8), M.sable)); groupe.add(g);
    };
    /* le principal : moitié gauche, de −22° (devant) à −158° (derrière) */
    faisceau(mainG, M.bobinage, 2.2, decalP, -158, -22);
    [-158, -90, -22].forEach(a => ruban(mainG, a, 25.5, 10.6, 10.4));
    /* l'auxiliaire : moitié droite, de 22° à 158°, en trois morceaux (le morceau du milieu manque quand il est coupé) */
    faisceau(auxG, matAux, 1.2, decalA, 22, THETA_COUPURE[0]);
    faisceau(auxG, matAux, 1.2, decalA, THETA_COUPURE[1], 158);
    const pontAux = new T.Group(); faisceau(pontAux, matAux, 1.2, decalA, THETA_COUPURE[0], THETA_COUPURE[1]); auxG.add(pontAux);
    [22, 158].forEach(a => ruban(auxG, a, 24.6, 8.4, 8.4));
    ruban(auxG, 120, 24.6, 8.4, 8.4);
    /* les bouts dénudés de la coupure */
    const boutsCoupes = new T.Group();
    [THETA_COUPURE[0] + 1.1, THETA_COUPURE[1] - 1.1].forEach(a => {
      const g = new T.Group(); g.position.copy(pt(RC, a, 24.6)); g.rotation.y = a * D;
      g.add(K.mesh(K.boite(1.8, 9.6, 9.6, 0.5), M.cuivre)); boutsCoupes.add(g);
    });
    auxG.add(boutsCoupes);
    /* le point commun : une cosse sur le stator, devant, où se rejoignent les deux enroulements et le fil de C */
    const cosse = K.cylY(3.4, 3, M.cuivre, 0, 22.5, RC, 20);
    const JH = new T.Vector3(0, 25.2, RC);
    mainG.add(K.fil([pt(RC, -22, 25.5), new T.Vector3(-8, 26.6, 39), new T.Vector3(0, 24.9, RC)], 1.6, M.bobinage, { pas: 1.5, radial: 6 }).mesh);
    auxG.add(K.fil([pt(RC, 22, 24.6), new T.Vector3(8, 25.6, 39), new T.Vector3(0, 24.9, RC)], 1.6, matAux, { pas: 1.5, radial: 6 }).mesh);
    /* le défaut de masse : un point d'isolant abîmé, où l'auxiliaire touche le stator */
    const fauteMarq = K.mesh(K.sphere(2.6, 12), K.lumineux(0xff4a1c), ...pt(RC + 6, THF, 23.6).toArray());
    statorG.add(mainG, auxG, cosse, fauteMarq);

    /* ---------------------------------------------------------------- les fils de liaison : bornes → enroulements */
    const liaisonsG = new T.Group();
    const filC = K.fil([[0, BROCHES.C[1], Z_STUB], [0, 6, 66], [0, 14, 58], [0, 23, 52], [0, 25.5, 46], [0, 24.9, RC]], 1.1, gaine, { pas: 2, radial: 8 });
    /* R et S : le fil monte contre le flanc du stator, qu'il contourne jusqu'au bout libre de son enroulement, derrière */
    const filLateral = (nom, s, yFin) => {
      const [x, y] = BROCHES[nom];
      const pts = [[x, y, Z_STUB], [x + s * 6, y + 6, 64]];
      for (let k = 0; k <= 5; k++) pts.push(pt(51.4, s * (26 + k * 27), -4 + k / 5 * 26));
      pts.push(pt(47, s * 161, 25.5), pt(RC, s * 160, yFin));
      return K.fil(pts, 1.1, gaine, { pas: 2, radial: 8 });
    };
    const filR = filLateral('R', -1, 27), filS = filLateral('S', 1, 26);
    liaisonsG.add(filC.mesh, filR.mesh, filS.mesh);

    /* ---------------------------------------------------------------- l'ohmmètre : un multimètre appuyé sur son pied */
    const meter = new T.Group(); meter.rotation.order = 'YXZ';
    meter.position.set(155, -39.5, 30); meter.rotation.set(-0.7, -0.35, 0);
    meter.add(K.mesh(K.boite(72, 140, 27, 7), M.plastiqueJaune, 0, 0, 0));
    meter.add(K.mesh(K.boite(60, 126, 2.4, 3), M.plastiqueSombre, 0, -2, 13.4));
    const ecran = K.ecran(52, 21, { fond: '#c9d6b3', encre: '#1a2a14' });
    ecran.mesh.position.set(0, 44, 14.75); meter.add(ecran.mesh);
    meter.add(K.cylZ(21, 2.4, M.plastiqueBlanc, 0, -18, 15.8, 32));
    const molette = new T.Group(); molette.position.set(0, -18, 17); meter.add(molette);
    molette.add(K.cylZ(14, 6, M.plastiqueNoir, 0, 0, 3.5, 32));
    molette.add(K.mesh(K.boite(2.6, 11, 1.4, 0.5), M.plastiqueBlanc, 0, 8, 6.9));
    [['200', -19.5], ['MΩ', 19.5]].forEach(([t, x]) => { const g = K.gravure(t, 3.4, { couleur: '#e6e8ea' }); g.position.set(x, 2.5, 14.75); meter.add(g); });
    const prises = [[16, M.plastiqueRouge], [-16, M.plastiqueNoir]];
    prises.forEach(([x, m]) => { meter.add(K.cylZ(5.4, 2.4, m, x, -58, 15.8, 20)); meter.add(K.cylZ(3.2, 1, M.sombre, x, -58, 17.1, 16)); });
    meter.updateMatrix();
    const mondeM = v => v.clone().applyMatrix4(meter.matrix);
    const normaleM = mondeM(new T.Vector3(0, 0, 1)).sub(mondeM(new T.Vector3(0, 0, 0))).normalize();
    /* le pied qui retient le multimètre */
    const hautPied = mondeM(new T.Vector3(0, 30, -13.5)), basPied = hautPied.clone(); basPied.y = Y_SOL + 2; basPied.z -= 55;
    const pied = K.barre(hautPied, basPied, 2.2, M.acierSombre, 10);

    const faireSonde = mat => {
      const g = new T.Group();
      const pointe = K.cylindre(0.5, 24, 12, 2.0); pointe.rotateX(PI / 2);       /* la pointe fine côté −Z : c'est elle qui touche */
      g.add(K.mesh(pointe, M.acier, 0, 0, 12));
      g.add(K.cylZ(5.4, 4, M.acierSombre, 0, 0, 27, 16));
      g.add(K.cylZ(4.4, 54, mat, 0, 0, 58, 20));
      g.add(K.cylZ(3, 12, M.caoutchouc, 0, 0, 91, 12));
      return g;
    };
    const sondes = [
      { g: faireSonde(M.plastiqueRouge), prise: mondeM(new T.Vector3(16, -58, 17)), rangee: new T.Vector3(128, Y_SOL + 5, 88), fil: new T.Mesh(new T.BufferGeometry(), K.isolant('rouge')) },
      { g: faireSonde(M.plastiqueNoir), prise: mondeM(new T.Vector3(-16, -58, 17)), rangee: new T.Vector3(160, Y_SOL + 5, 96), fil: new T.Mesh(new T.BufferGeometry(), K.isolant('noir')) }
    ];
    sondes.forEach(s => { s.pos = s.rangee.clone(); s.cible = s.rangee.clone(); s.yaw = 0; s.yawCible = 0; s.fil.userData.sansOmbre = true; });
    const refaireFil = s => {
      const b = new T.Vector3(Math.sin(s.yaw) * 97, 0, Math.cos(s.yaw) * 97).add(s.g.position);
      const d = new T.Vector3(Math.sin(s.yaw), 0, Math.cos(s.yaw));
      const bas = y => Math.max(Y_SOL + 1.6, y);
      const p3 = b.clone().addScaledVector(d, 30); p3.y = bas(b.y - 55);
      const p2 = new T.Vector3((s.prise.x + p3.x) / 2, Y_SOL + 1.8, (s.prise.z + p3.z) / 2 + 20);
      const pts = [s.prise.clone(), s.prise.clone().addScaledVector(normaleM, 14).add(new T.Vector3(0, -6, 0)), p2, p3, b.clone().addScaledVector(d, 12), b];
      const g = new T.TubeGeometry(new T.CatmullRomCurve3(pts, false, 'centripetal', 0.5), 48, 1.4, 6, false);
      s.fil.geometry.dispose(); s.fil.geometry = g;
    };

    /* ---------------------------------------------------------------- le courant de mesure */
    const feuille = (nom, lead) => { const [x, y] = BROCHES[nom]; return [new T.Vector3(x, y + 2.2, Z_POINTE), new T.Vector3(x, y + 2.2, Z_PLAQUE + 1), new T.Vector3(x, y, Z_STUB), ...lead.courbe.getSpacedPoints(24)]; };
    const ptsC = feuille('C', filC), ptsR = feuille('R', filR), ptsS = feuille('S', filS);
    const arcP = arc(RC, -22, -158, YG1, 6), arcA = arc(RC, 22, 158, YG2, 6);
    const rev = a => a.slice().reverse();
    const THF_P = THP;
    const masse = [
      ...ptsS, ...arc(RC, 158, THF, YG2, 6),
      pt(RC + 6, THF, 23.6), pt(51.3, THF, 21.6), pt(51.3, THF, -16), pt(47.2, THF, -18.5), pt(47.2, THF, -31.1),
      pt(57.2, THF, -31.1), pt(57.2, THF, -88.6), pt(70, THF, -88.8)
    ];
    for (let i = 1; i <= 6; i++) { const f = i / 6 * PI / 2; masse.push(pt(70 + 16.7 * Math.sin(f), THF, -72 - 16.7 * Math.cos(f))); }
    masse.push(pt(86.7, THF, YP), ...arc(86.7, THF, THF_P, YP, 6), pt(90.6, THF_P, YP));
    const CHEMINS = {
      CR: [...ptsC, JH, ...arcP, ...rev(ptsR)],
      CS: [...ptsC, JH, ...arcA, ...rev(ptsS)],
      SR: [...ptsS, ...rev(arcA), JH, ...arcP, ...rev(ptsR)],
      MASSE: masse
    };
    const grains = {};
    const grainsG = new T.Group();
    Object.keys(CHEMINS).forEach(k => {
      const g = K.courant(K.chemin(CHEMINS[k]), { pas: 6.5, rayon: 1.6, vitesse: 46 });
      g.regler({ debit: 0, alternatif: false });
      grains[k] = g; grainsG.add(g.objet);
    });

    /* ---------------------------------------------------------------- l'état */
    let pointes = opt.pointes !== undefined ? opt.pointes : (decouvrir ? '' : 'CR');
    let etat = opt.etat || 'bon';
    let eclatee = false, arrivee = false, cleM = '', cleT = '';
    let angleM = 0;
    const CIBLES = { CR: ['C', 'R'], CS: ['C', 'S'], SR: ['S', 'R'], CARC: ['S', 'PATCH'] };
    const capotOuvert = () => pointes !== '' && !eclatee;
    const posBroche = n => new T.Vector3(BROCHES[n][0], BROCHES[n][1], Z_POINTE + 0.3);
    const posPatch = pt(90.3, THP, YP);

    const mesure = () => {
      const coupe = etat === 'auxCoupe', mas = etat === 'masse';
      const OL = { ecran: 'OL', lit: 'OL (l’infini)', chemin: null };
      if (pointes === 'CR') return { ecran: '3 Ω', lit: '3 Ω', chemin: 'CR', dit: coupe ? 'le principal est bon' : 'le principal seul', sur: 'C et R' };
      if (pointes === 'CS') return coupe ? Object.assign({ dit: 'enroulement coupé', sur: 'C et S' }, OL) : { ecran: '11 Ω', lit: '11 Ω', chemin: 'CS', dit: 'l’auxiliaire seul', sur: 'C et S' };
      if (pointes === 'SR') return coupe ? Object.assign({ dit: 'enroulement coupé', sur: 'S et R' }, OL) : { ecran: '14 Ω', lit: '14 Ω', chemin: 'SR', dit: 'les deux enroulements', sur: 'S et R' };
      if (pointes === 'CARC') return mas ? { ecran: '0.00 MΩ', lit: 'presque 0 Ω', chemin: 'MASSE', dit: 'masse franche', sur: 'la borne S et la carcasse' }
                                        : Object.assign({ dit: 'pas de masse', sur: 'la borne S et la carcasse' }, OL);
      return Object.assign({ lit: '–', dit: '–', sur: 'aucune borne' }, { ecran: 'OL', chemin: null });
    };

    const PH = {
      ferme: '<strong>Un compresseur hermétique.</strong> Le moteur est enfermé dans une coque d’acier soudée. Seules trois bornes en sortent, sous un capot. Choisissez où poser les pointes de l’ohmmètre : le capot est retiré.',
      eclate: '<strong>Le compresseur éclaté.</strong> La coque est soudée : à l’atelier, on ne l’ouvre pas. Dedans se trouvent le rotor, le stator avec ses deux enroulements, puis le bloc sur ses ressorts. Les trois bornes traversent la coque, face avant.',
      coupeSans: '<strong>L’enroulement auxiliaire est coupé.</strong> De l’extérieur, rien ne se voit. Posez les pointes sur C et S : l’ohmmètre affiche OL.',
      masseSans: '<strong>Un enroulement touche la carcasse.</strong> De l’extérieur, rien ne se voit. Posez une pointe sur une borne et l’autre sur la carcasse pour le trouver.',
      cr: '<strong>Pointes sur C et R.</strong> Hors tension, fils débranchés. Le courant de mesure traverse l’enroulement principal seul. L’écran affiche 3 Ω.',
      cs: '<strong>Pointes sur C et S.</strong> Le courant de mesure traverse l’enroulement auxiliaire seul. Son fil est plus fin : la résistance est plus élevée. L’écran affiche 11 Ω.',
      sr: '<strong>Pointes sur S et R.</strong> Le courant traverse l’auxiliaire, passe par C, puis traverse le principal. Les deux résistances s’ajoutent : 11 + 3 = 14 Ω, la plus forte valeur.',
      csCoupe: '<strong>Pointes sur C et S.</strong> L’auxiliaire est coupé : le courant de mesure ne passe pas. L’écran affiche OL, l’infini, à la place de 11 Ω.',
      srCoupe: '<strong>Pointes sur S et R.</strong> Le chemin passe par l’auxiliaire, qui est coupé : le courant ne passe pas. L’écran affiche OL, l’infini, à la place de 14 Ω.',
      carcBon: '<strong>Une pointe sur la borne S, l’autre sur la carcasse.</strong> Plus fort calibre, peinture grattée. Aucun courant ne passe : l’écran affiche OL, l’infini. Aucun enroulement ne touche la carcasse. Faites de même avec chaque borne.',
      carcMasse: '<strong>Une pointe sur la borne S, l’autre sur la carcasse.</strong> Le courant passe de l’enroulement à la carcasse : l’écran affiche presque 0 Ω. C’est une masse franche : un enroulement touche la carcasse.'
    };
    const texteEtat = () => {
      const coupe = etat === 'auxCoupe', mas = etat === 'masse';
      if (eclatee) return PH.eclate;
      if (!pointes) return coupe ? PH.coupeSans : mas ? PH.masseSans : PH.ferme;
      if (pointes === 'CR') return PH.cr + (coupe ? ' L’auxiliaire est coupé, mais cela ne change pas cette mesure.' : mas ? ' Une masse ne se voit pas entre deux bornes : elle se cherche entre une borne et la carcasse.' : '');
      if (pointes === 'CS') return coupe ? PH.csCoupe : PH.cs + (mas ? ' Une masse ne se voit pas entre deux bornes.' : '');
      if (pointes === 'SR') return coupe ? PH.srCoupe : PH.sr + (mas ? ' Une masse ne se voit pas entre deux bornes.' : '');
      return mas ? PH.carcMasse : PH.carcBon + (coupe ? ' L’auxiliaire est coupé : cela ne change rien à cette mesure.' : '');
    };

    const majGrains = () => {
      const m = mesure();
      Object.keys(grains).forEach(k => grains[k].regler({ debit: arrivee && !eclatee && m.chemin === k ? 1 : 0 }));
    };
    const majEcran = () => { const m = mesure(); ecran.ecrire([arrivee && !eclatee ? m.ecran : 'OL']); };
    const majMesures = () => {
      const m = mesure();
      const liste = pointes ? [
        { libelle: 'Les pointes sur', valeur: m.sur },
        { libelle: 'L’ohmmètre affiche', valeur: m.lit },
        { libelle: 'Ce que cela dit', valeur: m.dit }
      ] : [
        { libelle: 'Les pointes sur', valeur: 'aucune borne' },
        { libelle: 'Le capot du bornier', valeur: 'en place' }
      ];
      const k = JSON.stringify(liste);
      if (k !== cleM) { cleM = k; ctx.mesures(liste); }
    };
    const viser = () => {
      const par = eclatee || !pointes ? null : CIBLES[pointes];
      sondes.forEach((s, i) => {
        if (!par) { s.cible.copy(s.rangee); s.yawCible = 0; return; }
        const n = par[i];
        if (n === 'PATCH') { s.cible.copy(posPatch); s.yawCible = THP * D; } else { s.cible.copy(posBroche(n)); s.yawCible = 0; }
      });
    };
    const majVisibilites = () => {
      pontAux.visible = etat !== 'auxCoupe';
      boutsCoupes.visible = etat === 'auxCoupe';
      fauteMarq.visible = etat === 'masse';
      gratte.visible = pointes === 'CARC' && !eclatee;
      liaisonsG.visible = !eclatee;
      grainsG.visible = !eclatee;
    };
    /* « Voir dedans » : la coque devient transparente (les arêtes restent visibles) ; pendant l'éclaté elle est pleine */
    const aretesMat = new T.LineBasicMaterial({ color: 0x1b3a63, transparent: true, opacity: 0.2, depthWrite: false });
    const aretes = [coqueBasse, coqueHaute].map(m => { const a = new T.LineSegments(new T.EdgesGeometry(m.geometry, 24), aretesMat); a.raycast = () => {}; a.userData.decor = true; a.visible = false; m.add(a); return a; });
    let fantomeActif = false;
    const appliquerFantome = () => {
      const on = fantomeActif && !eclatee;
      peinture.transparent = on; peinture.opacity = on ? 0.22 : 1; peinture.depthWrite = !on; peinture.needsUpdate = true;
      soudureMat.transparent = on; soudureMat.opacity = on ? 0.3 : 1; soudureMat.depthWrite = !on; soudureMat.needsUpdate = true;
      [coqueBasse, coqueHaute].forEach(m => { m.castShadow = !on; });
      aretes.forEach(a => { a.visible = on; });
    };
    const rafraichir = () => {
      viser(); majVisibilites();
      capotU.cible = capotOuvert() ? 1 : 0;
      arrivee = false;
      majGrains(); majEcran(); majMesures();
      ctx.regler('pointes', pointes); ctx.regler('etat', etat);
      const t = texteEtat(); cleT = t; ctx.dire(t);
    };
    const agir = (id, v) => {
      if (id === 'pointes') pointes = v === true || v == null ? '' : v;
      else if (id === 'etat') {
        etat = v;
        /* choisir un défaut pose les pointes là où il se voit */
        if (v === 'auxCoupe' && pointes !== 'CS' && pointes !== 'SR') pointes = 'CS';
        if (v === 'masse') pointes = 'CARC';
      }
      else return;
      rafraichir();
    };

    /* état de départ : tout est déjà en place (rien ne voyage au premier affichage) */
    viser(); majVisibilites();
    capotU.x = capotU.cible = capotOuvert() ? 1 : 0; placerCapot();
    sondes.forEach(s => { s.pos.copy(s.cible); s.yaw = s.yawCible; s.g.position.copy(s.pos); s.g.rotation.y = s.yaw; refaireFil(s); });
    angleM = pointes === 'CARC' ? PI / 4 : -PI / 4; molette.rotation.z = -angleM;
    arrivee = true; majGrains(); majEcran(); majMesures();

    /* ---------------------------------------------------------------- l'assemblage */
    racine.add(coqueBasseG, coqueHauteG, pieds, gratte, tubesBas, bornierG, capotG,
      blocG, ressortsG, rotorG, statorG, liaisonsG, grainsG, meter, pied, sondes[0].g, sondes[1].g, sondes[0].fil, sondes[1].fil);
    const cadre = [coqueBasse, coqueHaute, meter];

    return {
      racine,
      /* « comprendre » : un peu de dessus et plus près de la face avant, pour voir les enroulements à travers la coque ;
         « découvrir » : de trois quarts, le bornier bien en face */
      vue: decouvrir ? { azimut: -30, elevation: 20, zoom: 1.2, cadre, marge: 1.08 }
                     : { azimut: -24, elevation: 28, zoom: 1.2, cadre, marge: 1.08 },
      basculerFantome(on) { fantomeActif = on; appliquerFantome(); },
      phrase: texteEtat(),
      pieces: [
        { id: 'coque', nom: 'La coque soudée (la carcasse)', objets: [coqueBasse, coqueHaute, soudure, pieds, gratte], ancre: pt(90, -50, 40).toArray(),
          desc: 'Une enveloppe d’acier, soudée : le moteur et le compresseur sont enfermés dedans. On ne l’ouvre pas à l’atelier. C’est la carcasse : on y pose une pointe pour chercher une masse, après avoir gratté la peinture.' },
        { id: 'tubes', nom: 'Les tubes de cuivre', objets: [tubesBas, tubeHaut], ancre: pt(113, -100, 40).toArray(),
          desc: 'Soudés sur la coque, ils servent au circuit frigorifique. Ils ne comptent pas dans les mesures électriques.' },
        { id: 'bornier', nom: 'Le bornier : C, S, R', objets: [plaque, ...perles, ...broches, ...stubs],
          desc: 'Trois bornes traversent la coque. C est le commun, R la marche, S le démarrage. Elles sont parfois sans repère lisible : trois mesures à l’ohmmètre les retrouvent.' },
        { id: 'capot', nom: 'Le capot du bornier', objets: [capotG],
          desc: 'Un couvercle de plastique qui protège les trois bornes. Retirez-le pour mesurer. Regardez dedans : le schéma de raccordement s’y trouve souvent.' },
        { id: 'stator', nom: 'Le stator', objets: [stack, fauteMarq], ancre: [-17, 0, 47],
          desc: 'Un empilage de tôles d’acier, fixé dans la coque. Les deux enroulements y sont bobinés. Ici, chacun est dessiné sur une moitié pour que vous les distinguiez.' },
        { id: 'principal', nom: 'L’enroulement principal (C – R)', objets: [mainG], ancre: pt(RC, -90, 31).toArray(),
          desc: 'La marche. Un fil plus gros, donc la plus faible résistance : 3 Ω dans l’exemple. Il relie C à R.' },
        { id: 'auxiliaire', nom: 'L’enroulement auxiliaire (C – S)', objets: [auxG], ancre: pt(RC, 90, 29.5).toArray(),
          desc: 'Le démarrage. Un fil plus fin, donc une résistance plus élevée : 11 Ω dans l’exemple. Il relie C à S.' },
        { id: 'liaisons', nom: 'Le point commun et les fils de liaison', objets: [liaisonsG, cosse], ancre: [0, 18, 52],
          desc: 'Trois fils relient les bornes aux enroulements. Le fil de C arrive au point commun des deux enroulements : de C à R, on traverse le principal seul ; de C à S, l’auxiliaire seul.' },
        { id: 'rotor', nom: 'Le rotor', objets: [rotorG], ancre: [0, 21, 0],
          desc: 'La partie qui tourne, sur son arbre, au milieu du stator. Hors tension, il ne bouge pas : il n’intervient pas dans ces mesures.' },
        { id: 'bloc', nom: 'Le bloc de compression et ses ressorts', objets: [blocG, ressortsG], ancre: pt(56, -60, -47).toArray(),
          desc: 'En bas, la partie mécanique que le moteur entraîne. Des ressorts la suspendent dans la coque.' },
        { id: 'ohmmetre', nom: 'L’ohmmètre', objets: [meter, pied],
          desc: 'Un multimètre sur la position ohmmètre, calibre 200 Ω pour les enroulements. Pour chercher une masse, on prend le plus fort calibre. OL veut dire l’infini.' },
        { id: 'pointes', nom: 'Les pointes et leurs fils', objets: [sondes[0].g, sondes[1].g, sondes[0].fil, sondes[1].fil],
          desc: 'La rouge et la noire. Elles se posent sur deux bornes, ou sur une borne et la carcasse. On mesure hors tension, fils débranchés.' }
      ],
      commandes: [
        { id: 'pointes', type: 'choix', titre: 'Les pointes sur', options: [['CR', 'C – R'], ['CS', 'C – S'], ['SR', 'S – R'], ['CARC', 'Borne – carcasse']], valeur: pointes },
        { id: 'etat', type: 'choix', titre: 'L’état du moteur', options: [['bon', 'Bon'], ['auxCoupe', 'Auxiliaire coupé'], ['masse', 'À la masse']], valeur: etat }
      ],
      etapes: [
        { titre: 'Trois bornes sous le capot', piece: 'capot', voirDedans: false, actions: [['pointes', ''], ['etat', 'bon']],
          vue: { azimut: -26, elevation: 18, zoom: 1.6, cible: [0, 0, 70] },
          texte: 'Le moteur est enfermé dans la coque. Seules trois bornes en sortent, protégées par un capot. Pour mesurer, il faut d’abord retirer le capot.' },
        { titre: 'Pointes sur C et R : le principal', piece: 'principal', voirDedans: true, actions: [['pointes', 'CR'], ['etat', 'bon']],
          vue: { azimut: -24, elevation: 40, zoom: 1.9, cible: [-6, 6, 50] }, duree: 7,
          texte: 'Capot retiré, hors tension, fils débranchés. Les pointes touchent C et R. Le courant de mesure traverse l’enroulement principal seul, un fil plus gros. L’écran affiche 3 Ω.' },
        { titre: 'Pointes sur C et S : l’auxiliaire', piece: 'auxiliaire', voirDedans: true, actions: [['pointes', 'CS'], ['etat', 'bon']],
          vue: { azimut: -6, elevation: 40, zoom: 1.9, cible: [8, 6, 50] }, duree: 7,
          texte: 'La pointe de R passe sur S. Le courant traverse maintenant l’auxiliaire seul. Son fil est plus fin : sa résistance est plus élevée. L’écran affiche 11 Ω.' },
        { titre: 'Pointes sur S et R : les deux enroulements', piece: 'liaisons', voirDedans: true, actions: [['pointes', 'SR'], ['etat', 'bon']],
          vue: { azimut: -14, elevation: 44, zoom: 1.6, cible: [0, 8, 34] }, duree: 8,
          texte: 'Entre S et R, le courant passe par l’auxiliaire, par le point commun C, puis par le principal. Les deux résistances s’ajoutent : 11 + 3 = 14 Ω. C’est la plus forte valeur, et la borne qui reste, C, est le commun.' },
        { titre: 'Un enroulement coupé : l’écran affiche OL', piece: 'auxiliaire', voirDedans: true, actions: [['pointes', 'CS'], ['etat', 'auxCoupe']],
          vue: { azimut: 52, elevation: 42, zoom: 3.4, cible: [35, 24, 15] }, duree: 8,
          texte: 'L’auxiliaire est coupé en un point. Le courant de mesure ne peut plus passer entre C et S : l’écran affiche OL, l’infini, à la place de 11 Ω.' },
        { titre: 'Une borne contre la carcasse : la masse', piece: 'stator', voirDedans: true, actions: [['pointes', 'CARC'], ['etat', 'masse']],
          vue: { azimut: 22, elevation: 26, zoom: 1.7, cible: [30, -8, 30] }, duree: 9,
          texte: 'Un enroulement touche le stator, donc la carcasse. Une pointe sur la borne S, l’autre sur la carcasse, plus fort calibre : le courant passe par l’enroulement et par l’acier. L’écran affiche presque 0 Ω. Sans défaut, il affiche OL, l’infini.' }
      ],
      /* l'éclaté, dans l'ordre du démontage : le capot sort, la coque se lève, le rotor monte, puis le stator */
      eclate: [
        { objets: [capotG], vers: [0, 0, 120], debut: 0, fin: 0.5 },
        { objets: [bornierG], vers: [0, 0, 62], debut: 0.25, fin: 0.7 },
        { objets: [coqueHauteG], vers: [0, 150, 0], debut: 0.1, fin: 0.6 },
        { objets: [rotorG], vers: [0, 105, 0], debut: 0.35, fin: 0.85 },
        { objets: [statorG], vers: [0, 52, 0], debut: 0.5, fin: 1 }
      ],
      eclateVue: { azimut: -46, elevation: 20, zoom: 0.85, cible: [20, 55, 40] },
      surEclate(on) { eclatee = on; appliquerFantome(); rafraichir(); },
      agir,
      animer(dt) {
        let actif = false;
        capotU.cible = capotOuvert() ? 1 : 0;
        if (capotU.pas(dt)) { placerCapot(); actif = true; }
        const cibleAngle = pointes === 'CARC' ? PI / 4 : -PI / 4;
        if (angleM !== cibleAngle) {
          angleM = K.vers(angleM, cibleAngle, 8, dt);
          if (Math.abs(angleM - cibleAngle) < 0.003) angleM = cibleAngle;
          molette.rotation.z = -angleM; actif = true;
        }
        let bouge = false;
        sondes.forEach(s => {
          const reste = s.pos.distanceTo(s.cible), dy = s.yawCible - s.yaw;
          if (reste > 0.02 || Math.abs(dy) > 0.002) {
            const k = 1 - Math.exp(-9 * dt);
            s.pos.lerp(s.cible, k); s.yaw += dy * k;
            if (s.pos.distanceTo(s.cible) < 0.02) s.pos.copy(s.cible);
            if (Math.abs(s.yawCible - s.yaw) < 0.002) s.yaw = s.yawCible;
            bouge = true;
          }
          const r = s.pos.distanceTo(s.cible);
          s.g.position.copy(s.pos); s.g.position.z += Math.min(26, r * 0.5); s.g.rotation.y = s.yaw;
        });
        if (bouge) { sondes.forEach(refaireFil); actif = true; }
        const pose = sondes.every(s => s.pos.distanceTo(s.cible) < 0.6 && Math.abs(s.yawCible - s.yaw) < 0.02) && Math.abs(capotU.x - capotU.cible) < 0.02;
        if (pose !== arrivee) { arrivee = pose; majGrains(); majEcran(); actif = true; }
        Object.keys(grains).forEach(k => { if (grains[k].animer(dt)) actif = true; });
        return actif;
      }
    };
  }, { famille: 'hermetique', titre: 'Le compresseur hermétique', stations: ['9.2', '9.1'] });
})();
