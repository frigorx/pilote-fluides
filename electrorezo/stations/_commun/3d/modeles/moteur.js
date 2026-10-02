/* ÉlectroRézo 3D — le moteur asynchrone triphasé (modèle étalon des machines tournantes).
   Stations : 6.3 (le moteur, la charge), 1.7 (la plaque signalétique), 7.3 (piloté en fréquence).

   Unités : mm. L'arbre suit l'axe X (bout d'arbre côté +X), l'axe est à y = 0, les pattes
   posent en y = -90 (hauteur d'axe 90, comme un moteur de 1,5 kW). « Voir en coupe » retire
   le quart avant-haut de la carcasse, du stator et des flasques : on voit les tôles, les
   têtes de bobines, la cage du rotor, les roulements.

   CE QUE L'ÉLÈVE DOIT VOIR : les trois bobinages s'allument tour à tour — c'est le champ
   qui tourne ; le rotor, relié à rien, le suit un peu moins vite (le glissement) ; plus on
   charge l'arbre, plus il traîne, plus il tire de courant ; au-dessus de la plaque, le
   bobinage chauffe. À l'écran tout est ralenti, et l'écart du rotor est exagéré six fois
   pour se voir — la phrase le dit. Les valeurs affichées, elles, sont les vraies. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('moteurAsynchrone', (T, K, ctx) => {
    const M = K.mat;
    const opt = ctx.options || {};
    const racine = new T.Group();
    const D = Math.PI / 180;

    /* ---------------------------------------------------------------- matières à soi */
    const peinture = K.propre(M.fonte); peinture.side = T.DoubleSide;
    const alu = K.propre(M.aluminium); alu.color.setHex(0xc9ced4);
    alu.emissive = new T.Color(0xff5a10); alu.emissiveIntensity = 0;
    const cuivreBob = K.bobinageMat(10); cuivreBob.side = T.DoubleSide;

    /* deux versions des pièces coupées : entière (fermé) et en coupe ; on bascule l'une ou l'autre */
    const entier = new T.Group(), coupe = new T.Group();
    racine.add(entier, coupe);

    /* ---------------------------------------------------------------- le stator */
    const stator = { e: new T.Group(), c: new T.Group() };
    const STATOR = [48.6, 76, -62, 62];
    stator.e.add(new T.Mesh(K.anneauX(...STATOR, false), K.tolePile(2.5, 124)));
    stator.c.add(new T.Mesh(K.anneauX(...STATOR, true), K.tolePile(2.5, 124)));
    stator.c.add(K.facesCoupe(...STATOR, K.toleCoupe(124, 2.5)));
    /* le cuivre des encoches, tranché avec le reste sur les deux faces de coupe */
    [[52.5, 4], [58, 3]].forEach(([r, h]) => {
      stator.c.add(K.mesh(new T.BoxGeometry(124, h, 0.8), M.cuivreSombre, 0, r, 0.5));
      stator.c.add(K.mesh(new T.BoxGeometry(124, 0.8, h), M.cuivreSombre, 0, 0.5, r));
    });
    entier.add(stator.e); coupe.add(stator.c);

    /* ---------------------------------------------------------------- les têtes de bobines
       douze secteurs de 30° par côté (quatre pôles × trois phases) : U+, W-, V+, U-, W+, V-… */
    const SEQ = [[0, 1], [2, -1], [1, 1], [0, -1], [2, 1], [1, -1]];
    const tetes = { e: new T.Group(), c: new T.Group() };
    const secteurs = [];   /* { mats: [matE, matC], phase, signe } */
    const profilTete = (cote) => {
      const pts = [];
      for (let i = 0; i <= 18; i++) { const a = i / 18 * Math.PI * 2; pts.push([61 + Math.cos(a) * 10.5, cote * (70 + Math.sin(a) * 7.5)]); }
      return pts;
    };
    for (let k = 0; k < 12; k++) {
      const phiStart = k * 30 * D, [phase, signe] = SEQ[k % 6];
      const mat = cuivreBob.clone(); mat.emissive = new T.Color(0xff7a1a); mat.emissiveIntensity = 0;
      const entree = { mat, phase, signe };
      [-1, 1].forEach(cote => {
        const g = new T.LatheGeometry(profilTete(cote).map(p => new T.Vector2(p[0], p[1])), 8, phiStart + 0.02, 30 * D - 0.04);
        g.rotateZ(-Math.PI / 2);
        tetes.e.add(new T.Mesh(g, mat));
        /* en coupe, les secteurs du quart retiré (φ entre 270° et 360°) disparaissent */
        if (k < 9) tetes.c.add(new T.Mesh(g, mat));
      });
      secteurs.push(entree);
    }
    entier.add(tetes.e); coupe.add(tetes.c);

    /* ---------------------------------------------------------------- la carcasse et ses ailettes */
    const carcasse = { e: new T.Group(), c: new T.Group() };
    const CARC = [76, 86, -100, 100];
    carcasse.e.add(new T.Mesh(K.anneauX(...CARC, false), peinture));
    carcasse.c.add(new T.Mesh(K.anneauX(...CARC, true), peinture));
    carcasse.c.add(K.facesCoupe(...CARC, peinture));
    const A_PLAQUE = -0.30;
    const ailette = new T.BoxGeometry(186, 11, 3.2);
    for (let i = 0; i < 32; i++) {
      const a = i / 32 * Math.PI * 2 - Math.PI;
      const pres = (u, v, w) => Math.abs(Math.atan2(Math.sin(u - v), Math.cos(u - v))) < w;
      if (pres(a, -Math.PI / 2, 0.42)) continue;                 /* les pattes */
      if (pres(a, Math.PI / 2 + 0.55, 0.62)) continue;           /* sous la boîte à bornes */
      if (pres(a, A_PLAQUE, 0.37)) continue;                     /* la plaque signalétique */
      const m = new T.Mesh(ailette, peinture);
      m.rotation.x = Math.PI / 2 - a; m.position.set(0, 91 * Math.sin(a), 91 * Math.cos(a));
      carcasse.e.add(m);
      if (!(Math.sin(a) > 0.02 && Math.cos(a) > 0.02)) carcasse.c.add(m.clone());
    }
    /* les pattes, d'un seul bloc avec la carcasse */
    const pattes = new T.Group();
    [-62, 62].forEach(x => [-58, 58].forEach(z => {
      const p = K.mesh(K.boite(46, 26, 34, 2.5), peinture, x, -77, z); pattes.add(p);
      const t = K.mesh(K.cylindre(5, 27, 20), M.sombre, x, -77, z + Math.sign(z) * 6); pattes.add(t);
    }));
    const semelle = K.mesh(K.boite(170, 10, 60, 3), peinture, 0, -70, 0);
    pattes.add(semelle);
    /* l'anneau de levage */
    const levage = new T.Group();
    const oeil = K.mesh(K.tore(9, 2.6, 12, 32), M.acier, -48, 104, 0); oeil.rotation.y = Math.PI / 2;
    levage.add(oeil, K.mesh(K.cylindre(5, 12, 16), M.acier, -48, 92, 0));
    entier.add(carcasse.e); coupe.add(carcasse.c);
    racine.add(pattes, levage);

    /* ---------------------------------------------------------------- les flasques et les roulements */
    const flasques = { e: new T.Group(), c: new T.Group() };
    const flasqueCote = { '1': [], '-1': [] };
    const profilFlasque = [[14, 0], [86, 0], [86, 9], [44, 12], [32, 22], [14, 22], [14, 0]];
    [1, -1].forEach(cote => {
      [['e', false], ['c', true]].forEach(([k, cp]) => {
        const g = K.tourne(profilFlasque, cp, 64);
        const m = new T.Mesh(g, peinture);
        /* côté ventilateur : en miroir sur X (la coupe reste dans le même quart) */
        m.scale.x = cote; m.position.x = cote * 100;
        flasques[k].add(m); flasqueCote[cote].push(m);
      });
    });
    entier.add(flasques.e); coupe.add(flasques.c);
    /* les roulements, au cœur des flasques */
    const roulements = new T.Group();
    const roulement = { '1': new T.Group(), '-1': new T.Group() };
    roulements.add(roulement['1'], roulement['-1']);
    [1, -1].forEach(cote => {
      const x = cote * 112, g = roulement[cote];
      const bague = K.mesh(K.anneau(25, 20, 13, 40), M.acier); bague.rotation.z = Math.PI / 2; bague.position.x = x; g.add(bague);
      const int = K.mesh(K.anneau(16.5, 12.2, 13, 32), M.acier); int.rotation.z = Math.PI / 2; int.position.x = x; g.add(int);
      for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2; g.add(K.mesh(K.sphere(3.6, 12), M.argent, x, Math.sin(a) * 18.3, Math.cos(a) * 18.3)); }
    });
    racine.add(roulements);

    /* ---------------------------------------------------------------- ce qui tourne */
    const tournant = new T.Group(); racine.add(tournant);
    const arbre = K.cylX(12, 318, M.acier, 7, 0, 0, 32);
    const clavette = K.mesh(K.boite(36, 4, 6, 0.8), M.acierSombre, 146, 12.6, 0);
    tournant.add(arbre, clavette);
    /* le rotor : empilage de tôles, la cage d'aluminium (barres + anneaux), ses petites ailettes */
    const rotor = new T.Group();
    rotor.add(new T.Mesh(K.anneauX(12, 47.4, -62, 62, false, 64), K.tolePile(2.5, 124)));
    const cage = new T.Group();
    const barre = new T.BoxGeometry(128, 5.2, 4.2);
    for (let i = 0; i < 28; i++) {
      const a = i / 28 * Math.PI * 2;
      const b = new T.Mesh(barre, alu); b.rotation.x = Math.PI / 2 - a; b.position.set(0, 45.4 * Math.sin(a), 45.4 * Math.cos(a));
      cage.add(b);
    }
    [-1, 1].forEach(c => {
      const an = new T.Mesh(K.anneauX(30, 47.6, Math.min(c * 62, c * 71), Math.max(c * 62, c * 71), false, 48), alu); cage.add(an);
      for (let i = 0; i < 8; i++) {
        const a = i / 8 * Math.PI * 2;
        const ail = K.mesh(new T.BoxGeometry(9, 14, 2), alu, c * 76, 38 * Math.sin(a), 38 * Math.cos(a)); ail.rotation.x = Math.PI / 2 - a; cage.add(ail);
      }
    });
    /* un repère orange sur l'anneau : on suit la rotation du rotor */
    const repereRotor = K.mesh(K.boite(3, 6, 8, 1), M.plastiqueOrange, 72, 0, 41);
    rotor.add(cage, repereRotor);
    tournant.add(rotor);
    /* le ventilateur, en bout d'arbre côté opposé */
    const ventilateur = new T.Group();
    ventilateur.add(K.cylX(20, 22, M.plastiqueNoir, -137, 0, 0, 24));
    for (let i = 0; i < 9; i++) {
      const a = i / 9 * Math.PI * 2;
      const p = K.mesh(K.boite(26, 60, 2.6, 1), M.plastiqueNoir, -137, 48 * Math.sin(a), 48 * Math.cos(a));
      p.rotation.x = Math.PI / 2 - a; p.rotateY(0.35); ventilateur.add(p);
    }
    racine.add(ventilateur);

    /* le capot du ventilateur et sa grille */
    const capot = new T.Group();
    capot.add(new T.Mesh(K.anneauX(87, 90.5, -160, -112, false, 64), peinture));
    const grille = new T.Group();
    [30, 52, 74].forEach(r => { const t = K.mesh(K.tore(r, 1.6, 8, 64), peinture, -162, 0, 0); t.rotation.y = Math.PI / 2; grille.add(t); });
    for (let i = 0; i < 16; i++) {
      const a = i / 16 * Math.PI * 2;
      const b = K.mesh(new T.BoxGeometry(3, 62, 3.2), peinture, -162, 59 * Math.sin(a), 59 * Math.cos(a)); b.rotation.x = Math.PI / 2 - a; grille.add(b);
    }
    grille.add(K.mesh(K.cylindre(14, 3.4, 24), peinture, -162, 0, 0)); grille.children[grille.children.length - 1].rotation.z = Math.PI / 2;
    capot.add(grille);
    racine.add(capot);

    /* ---------------------------------------------------------------- la boîte à bornes */
    const BX = 18, BZ = -44;
    const boite = new T.Group();
    /* le socle descend jusqu'à la carcasse (il ne flotte pas) ; le caisson est creux */
    boite.add(K.mesh(K.boite(84, 54, 74, 3), peinture, BX, 67, BZ));
    const contour = K.formeArrondie(92, 82, 4); contour.holes.push(K.formeArrondie(84, 74, 2));
    const parois = new T.Mesh(K.extrusion(contour, 38), peinture); parois.rotation.x = -Math.PI / 2; parois.position.set(BX, 113, BZ);
    boite.add(parois, K.mesh(K.boite(86, 4, 76, 1), peinture, BX, 95, BZ));
    const couvercle = new T.Group();
    couvercle.add(K.mesh(K.boite(96, 7, 86, 3.5), peinture, BX, 135, BZ));
    [[-40, -36], [40, -36], [-40, 36], [40, 36]].forEach(([dx, dz]) => { const v = K.vis(2.8); v.position.set(BX + dx, 138.4, BZ + dz); couvercle.add(v); });
    racine.add(boite, couvercle);
    /* la plaquette à bornes : six goujons, rangée du haut W2 U2 V2, du bas U1 V1 W1, barrettes en étoile */
    const bornier = new T.Group();
    bornier.add(K.mesh(K.boite(66, 6, 46, 1.5), K.plastique(0x7a5a3a, 0.6), BX, 133.5 - 7 - 20, BZ));
    const GX = [-20, 0, 20], RANG = { haut: BZ - 11, bas: BZ + 11 };
    /* comme le cours (station 6.4) : U1 V1 W1 en haut, où arrive le réseau ; W2 U2 V2 en bas,
       décalés d'un cran — c'est là que se posent les barrettes */
    const NOMS = { haut: ['U1', 'V1', 'W1'], bas: ['W2', 'U2', 'V2'] };
    const goujons = {};
    Object.keys(RANG).forEach(r => GX.forEach((gx, i) => {
      const g = K.mesh(K.cylindre(2.6, 12, 16), M.laiton, BX + gx, 112, RANG[r]); bornier.add(g);
      const e = K.mesh(K.cylindre(4.4, 2.6, 6), M.laiton, BX + gx, 111.5, RANG[r]); bornier.add(e);
      const n = K.gravure(NOMS[r][i], 3.6, { couleur: '#f4ead8' }); n.rotation.x = -Math.PI / 2; n.position.set(BX + gx, 109.8, RANG[r] + (r === 'haut' ? -8.5 : 8.5)); bornier.add(n);
      goujons[NOMS[r][i]] = new T.Vector3(BX + gx, 114, RANG[r]);
    }));
    const barrettes = new T.Group();
    /* l'étoile : deux barrettes couchées relient W2, U2 et V2 */
    [[-20, 0], [0, 20]].forEach(([a, b]) => barrettes.add(K.mesh(K.boite(b - a + 9, 1.8, 8, 0.8), M.cuivre, BX + (a + b) / 2, 115.5, RANG.bas)));
    bornier.add(barrettes);
    racine.add(bornier);
    /* l'arrivée : le câble entre par le presse-étoupe du côté arbre, puis trois phases vers U1, V1, W1 */
    const presse = K.mesh(K.cylindre(9, 14, 24), M.plastiqueNoir, BX + 52, 112, BZ + 10); presse.rotation.z = Math.PI / 2;
    racine.add(presse);
    const gaine = K.fil([[BX + 58, 112, BZ + 10], [BX + 82, 108, BZ + 12], [BX + 98, 60, BZ + 2], [BX + 106, -40, BZ - 12], [BX + 112, -86, BZ - 44]], 5.2, K.plastique(0x8b9096, 0.55));
    racine.add(gaine.mesh);
    const conducteurs = [['L1', 'U1'], ['L2', 'V1'], ['L3', 'W1']].map(([c, b], i) => {
      const fin = goujons[b];
      const f = K.fil([[BX + 40, 112, BZ + 10 + (i - 1) * 3], [BX + 30, 117, BZ + 14 + (i - 1) * 4], [fin.x + 4, 119, fin.z + 9], [fin.x, 115, fin.z]], 1.5, c);
      racine.add(f.mesh); return f;
    });
    const pe = K.fil([[BX + 40, 110, BZ + 6], [BX + 34, 104, BZ - 18], [BX + 34, 103, BZ - 30]], 1.5, 'PE');
    racine.add(pe.mesh);
    /* les grains se voient dans la boîte ouverte, sur les trois conducteurs */
    const courantsBoite = conducteurs.map(f => { const c = K.courant(f.courbe, { pas: 5, rayon: 1.2, vitesse: 26 }); c.regler({ alternatif: true, frequence: 0.6, debit: 1 }); racine.add(c.objet); return c; });

    /* ---------------------------------------------------------------- la plaque signalétique */
    const plaque = new T.Group();
    const ech = 0.62;
    const plaqueCanvas = (() => {
      const c = document.createElement('canvas'); c.width = 900; c.height = 560;
      const x = c.getContext('2d');
      const g = x.createLinearGradient(0, 0, 900, 560); g.addColorStop(0, '#e8ebee'); g.addColorStop(1, '#c9ced4');
      x.fillStyle = g; x.fillRect(0, 0, 900, 560);
      x.strokeStyle = '#59616b'; x.lineWidth = 6; x.strokeRect(14, 14, 872, 532);
      [[34, 34], [866, 34], [34, 526], [866, 526]].forEach(([a, b]) => { x.fillStyle = '#9aa1a9'; x.beginPath(); x.arc(a, b, 12, 0, 7); x.fill(); });
      x.fillStyle = '#1d232a'; x.textBaseline = 'middle';
      x.font = '800 44px Calibri, Arial'; x.fillText('3 ~ MOT.', 60, 70);
      x.font = '700 30px Calibri, Arial'; x.fillText('IEC 60034-1', 600, 70);
      const L = [['Δ 230 V    Y 400 V'], ['6,65 A    3,84 A'], ['1,5 kW'], ['1435 tr/min'], ['cos φ 0,80'], ['50 Hz    IP 55']];
      const Y0 = 140, H = 66;
      L.forEach((l, i) => { x.font = '800 46px Calibri, Arial'; x.fillText(l[0], 70, Y0 + i * H); x.strokeStyle = 'rgba(40,46,54,.25)'; x.lineWidth = 2; x.beginPath(); x.moveTo(50, Y0 + i * H + 33); x.lineTo(850, Y0 + i * H + 33); x.stroke(); });
      return { c, Y0, H };
    })();
    const texPlaque = new T.CanvasTexture(plaqueCanvas.c); texPlaque.colorSpace = T.SRGBColorSpace; texPlaque.anisotropy = 8;
    const PW = 90 * ech / 0.62, PH = 56 * ech / 0.62;
    const support = K.mesh(K.boite(PW + 8, PH + 8, 12, 1.5), peinture, 0, 0, -4);
    const tole = new T.Mesh(new T.PlaneGeometry(PW, PH), new T.MeshStandardMaterial({ map: texPlaque, roughness: 0.42, metalness: 0.55 }));
    tole.position.z = 2.2;
    plaque.add(support, tole);
    /* six voiles, un par ligne : survoler la ligne dans la légende l'allume sur la plaque */
    const voiles = [];
    for (let i = 0; i < 6; i++) {
      const v = new T.Mesh(new T.PlaneGeometry(PW * 0.92, PH * plaqueCanvas.H / 560 * 0.95), new T.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0, depthWrite: false, toneMapped: false }));
      v.position.set(0, PH / 2 - (plaqueCanvas.Y0 + i * plaqueCanvas.H) / 560 * PH, 2.6);
      v.userData.voile = true; v.userData.sansOmbre = true;
      plaque.add(v); voiles.push(v);
    }
    const RP = 92.5;
    plaque.position.set(-6, RP * Math.sin(A_PLAQUE), RP * Math.cos(A_PLAQUE));
    plaque.rotation.x = -A_PLAQUE;
    racine.add(plaque);

    /* ---------------------------------------------------------------- l'état */
    const freqMode = opt.pilotage === 'frequence';
    const plaqueMode = opt.vue === 'plaque';
    const E = { charge: 100, f: 50, loi: 'suit', coupe: false, tension: true, bloque: false, demonte: false };
    let phaseChamp = 0, angleRotor = 0, wRotor = null, tMes = 0;
    const calcul = () => {
      if (!freqMode) {
        const g = 0.005 + (E.charge / 100) * 0.038;
        const ns = 1500, n = Math.round(ns * (1 - g)), I = 1.4 + (E.charge / 100) * 2.44;
        return { ns, n, g, I, U: 400, chauffe: Math.max(0, (I - 3.84) / 1.0) };
      }
      const U = E.loi === 'suit' ? 400 * E.f / 50 : 400;
      const rapport = U / E.f;
      const ns = 30 * E.f;
      const n = Math.max(0, Math.round(ns - 65));
      const sat = Math.max(0, rapport / 8 - 1);
      const I = 3.84 * (1 + 1.6 * sat);
      return { ns, n, g: ns ? (ns - n) / ns : 0, I, U, rapport, chauffe: Math.max(0, (I - 3.84) / 2.4) };
    };
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
    const majTexte = () => {
      const r = calcul();
      if (freqMode) {
        ctx.mesures([
          { libelle: 'La fréquence', valeur: E.f + ' Hz' },
          { libelle: 'La tension', valeur: Math.round(r.U) + ' V' },
          { libelle: 'Le rapport U/f', valeur: nb(r.rapport, 1) },
          { libelle: 'Le rotor', valeur: r.n + ' tr/min' }
        ]);
        ctx.dire(E.loi === 'suit'
          ? '<strong>La tension suit la fréquence.</strong> Le rapport U/f reste à 8 : le champ garde sa force, le couple est intact. Le moteur tourne simplement moins vite — ' + r.ns + ' tr/min pour le champ.'
          : (E.f < 50 ? '<strong>La tension reste à 400 V.</strong> La fréquence baisse, la tension non : le rapport monte à ' + nb(r.rapport, 1) + '. Le fer sature, le courant grimpe, le bobinage chauffe.'
                      : '<strong>À 50 Hz, les deux réglages se confondent :</strong> 400 V, rapport 8. Baissez la fréquence pour voir la différence.'));
      } else if (!plaqueMode) {
        ctx.mesures([
          { libelle: 'Le champ', valeur: r.ns + ' tr/min' },
          { libelle: 'Le rotor', valeur: r.n + ' tr/min' },
          { libelle: 'Le glissement', valeur: nb(r.g * 100, 1) + ' %' },
          { libelle: 'L’intensité', valeur: nb(r.I, 2) + ' A' }
        ]);
        const ralenti = ' <em>À l’écran tout est ralenti, et l’écart du rotor exagéré pour qu’on le voie.</em>';
        ctx.dire(E.charge <= 10
          ? '<strong>À vide.</strong> Les trois bobinages s’allument tour à tour : le champ tourne. Le rotor, relié à rien, le suit presque à la même vitesse — presque, jamais tout à fait.' + ralenti
          : E.charge <= 100
            ? '<strong>En charge.</strong> L’arbre résiste : le rotor traîne un peu plus derrière le champ, le glissement grandit, le moteur tire plus de courant. À 100 %, on lit la plaque : 1435 tr/min, 3,84 A.' + ralenti
            : '<strong>Au-dessus de la plaque.</strong> L’intensité dépasse 3,84 A : le bobinage chauffe. C’est exactement ce que le relais thermique surveille.' + ralenti);
      }
    };

    const basculerCoupe = on => {
      E.coupe = on;
      entier.visible = !on; coupe.visible = on;
      couvercle.visible = !on;
    };
    basculerCoupe(false);

    /* ---------------------------------------------------------------- commandes, pièces, vue */
    let commandes, pieces, phrase, vue;
    const piecesMachine = [
      { id: 'stator', nom: 'Le stator', objets: [stator.e, stator.c], desc: 'La partie fixe : un empilage de tôles d’acier, percé d’encoches où logent les bobinages.' },
      { id: 'bobinages', nom: 'Les trois bobinages', objets: [tetes.e, tetes.c], desc: 'Trois enroulements de cuivre décalés de 120°. Alimentés en triphasé, ils créent le champ tournant : regardez-les s’allumer tour à tour.' },
      { id: 'rotor', nom: 'Le rotor à cage', objets: [rotor], desc: 'La partie qui tourne. Des barres d’aluminium reliées par deux anneaux — une cage d’écureuil. Il n’est relié à aucun fil.' },
      { id: 'arbre', nom: 'L’arbre', objets: [arbre, clavette], desc: 'Il sort côté charge, avec sa clavette : c’est lui qui entraîne la pompe ou le ventilateur.' },
      { id: 'roulements', nom: 'Les roulements', objets: [roulements], desc: 'Deux roulements à billes tiennent l’arbre. C’est presque toujours eux qui lâchent les premiers.' },
      { id: 'flasques', nom: 'Les flasques', objets: [flasques.e, flasques.c], desc: 'Les deux couvercles d’extrémité. Ils portent les roulements et centrent le rotor dans le stator.' },
      { id: 'ventilateur', nom: 'Le ventilateur et son capot', objets: [ventilateur, capot], desc: 'Calé en bout d’arbre, il souffle l’air le long des ailettes pour refroidir le moteur.' },
      { id: 'carcasse', nom: 'La carcasse à ailettes', objets: [carcasse.e, carcasse.c, pattes, levage], desc: 'L’enveloppe en fonte ou en aluminium. Les ailettes évacuent la chaleur ; les pattes fixent le moteur.' },
      { id: 'boite', nom: 'La boîte à bornes', objets: [boite, couvercle, bornier, presse], desc: 'Six bornes U1 V1 W1 et W2 U2 V2 : le couplage se fait avec les barrettes (station 6.4). Ici, en étoile.' },
      { id: 'plaque', nom: 'La plaque signalétique', objets: [plaque], desc: 'La carte d’identité du moteur : tensions, intensités, puissance, vitesse. On la lit avant tout branchement.' }
    ];
    if (plaqueMode) {
      const LIGNES = [
        ['Δ 230 V   Y 400 V', 'Les deux couplages possibles, et sous quelle tension chacun.'],
        ['6,65 A   3,84 A', 'L’intensité absorbée, dans le même ordre que les tensions.'],
        ['1,5 kW', 'La puissance MÉCANIQUE rendue sur l’arbre, pas celle absorbée.'],
        ['1435 tr/min', 'La vitesse en charge — un peu en dessous des 1500 du champ.'],
        ['cos φ 0,80', 'Le facteur de puissance : ce qui travaille sur ce qui est appelé.'],
        ['50 Hz   IP 55', 'La fréquence prévue, et la protection contre la poussière et l’eau.']
      ];
      /* le trait de repère arrive au bord gauche de la ligne : il ne traverse pas le texte */
      plaque.updateMatrix();
      pieces = LIGNES.map((l, i) => {
        const a = new T.Vector3(-PW * 0.47, voiles[i].position.y, 2.6).applyMatrix4(plaque.matrix);
        return { id: 'ligne' + i, nom: l[0], objets: [voiles[i]], desc: l[1], ancre: [a.x, a.y, a.z] };
      });
      commandes = [];
      phrase = '<strong>Tout ce qu’il faut savoir tient sur cette étiquette.</strong> Survolez une ligne dans la liste : elle s’allume sur la plaque.';
      vue = { azimut: 2, elevation: -10, cadre: [plaque], marge: 1.15 };
    } else if (freqMode) {
      pieces = piecesMachine;
      commandes = [
        { id: 'freq', type: 'curseur', libelle: 'La fréquence de sortie', min: 10, max: 50, pas: 1, valeur: 50, unite: 'Hz' },
        { id: 'loi', type: 'choix', options: [['suit', 'La tension suit la fréquence'], ['fixe', 'La tension reste à 400 V']], valeur: 'suit' }
      ];
      vue = { azimut: 38, elevation: 20, cadre: [carcasse.e, capot], marge: 1.06 };
    } else {
      pieces = piecesMachine;
      commandes = [{ id: 'charge', type: 'curseur', libelle: 'La charge sur l’arbre', min: 0, max: 140, pas: 5, valeur: 100, format: v => v + ' %' }];
      vue = ctx.mode === 'decouvrir' ? { azimut: 34, elevation: 16, cadre: [carcasse.e, capot, boite], marge: 1.02 }
                                     : { azimut: 30, elevation: 26, cadre: [carcasse.e, capot], marge: 1.0 };
    }

    /* pendant un démarrage (ou rotor bloqué), les vraies valeurs ne sont pas celles du régime */
    const majMesuresTransitoire = (r, ratio) => {
      if (freqMode || plaqueMode) return;
      if (!E.tension || E.demonte) {
        ctx.mesures([{ libelle: 'Le champ', valeur: '0 tr/min' }, { libelle: 'Le rotor', valeur: '0 tr/min' }, { libelle: 'Le glissement', valeur: '—' }, { libelle: 'L’intensité', valeur: '0 A' }]);
        return;
      }
      const n = Math.round(r.n * ratio), g = 1 - n / r.ns, I = r.I + (23 - r.I) * Math.pow(Math.max(0, 1 - ratio), 0.7);
      ctx.mesures([
        { libelle: 'Le champ', valeur: r.ns + ' tr/min' },
        { libelle: 'Le rotor', valeur: n + ' tr/min' },
        { libelle: 'Le glissement', valeur: nb(g * 100, 1) + ' %' },
        { libelle: 'L’intensité', valeur: nb(I, I > 10 ? 0 : 2) + ' A' + (ratio < 0.97 ? ' (démarrage)' : '') }
      ]);
    };

    majTexte();
    let chaleur = 0;

    let etapes;
    if (plaqueMode) {
      /* la plaque se lit dans l'ordre : une ligne par étape */
      etapes = pieces.map(p => ({ titre: p.nom, texte: p.desc, piece: p.id }));
    } else if (freqMode) {
      etapes = [
        { titre: 'Sur le réseau : 50 Hz, 400 V', piece: 'bobinages', voirDedans: true, eclate: false, actions: [['freq', 50], ['loi', 'suit']],
          texte: 'Le champ tourne à 1500 tr/min, le rotor un peu moins vite. Le rapport U/f vaut 400 ÷ 50 = 8.' },
        { titre: 'Le variateur baisse la fréquence, et la tension avec', piece: 'rotor', eclate: false, actions: [['freq', 25], ['loi', 'suit']],
          texte: 'À 25 Hz, le champ ne tourne plus qu’à 750 tr/min : le rotor suit, deux fois moins vite. La tension descend à 200 V : le rapport reste 8, le couple est intact.' },
        { titre: 'Et si la tension restait à 400 V ?', piece: 'bobinages', eclate: false, actions: [['freq', 25], ['loi', 'fixe']],
          texte: 'Même fréquence, mais 400 V : le rapport double. Le fer sature, le courant grimpe, le bobinage chauffe. C’est pour cela que le variateur baisse les deux ensemble.' }
      ];
    } else {
      etapes = [
        { titre: 'Hors tension', piece: 'boite', voirDedans: false, eclate: false, actions: [['charge', 60], ['phase', 'arret']],
          vue: { azimut: 34, elevation: 18, zoom: 1 },
          texte: 'Rien ne tourne. Le courant n’arrive que par la boîte à bornes, dans le stator. Le rotor, lui, n’est relié à aucun fil.' },
        { titre: 'Sous tension : le champ tourne', piece: 'bobinages', voirDedans: true, eclate: false, actions: [['phase', 'champ']],
          vue: { azimut: 62, elevation: 30, zoom: 1.3 },
          texte: 'Bloquons un instant le rotor pour ne regarder que le stator. Les trois bobinages reçoivent les trois phases, décalées d’un tiers de période : ils s’allument tour à tour. Le champ magnétique tourne, à 1500 tr/min.' },
        { titre: 'On lâche le rotor : il démarre', piece: 'rotor', voirDedans: true, eclate: false, ralenti: true, actions: [['phase', 'demarrer']], duree: 9,
          vue: { azimut: 30, elevation: 26, zoom: 1.45 },
          texte: 'Le champ qui tourne fait naître des courants dans les barres de la cage — elles rougissent — et ces courants l’entraînent. Au démarrage, le moteur tire cinq à huit fois son courant normal.' },
        { titre: 'Il ne rattrape jamais le champ', piece: 'rotor', voirDedans: true, eclate: false, actions: [['charge', 100]],
          vue: { azimut: 78, elevation: 14, zoom: 1.5, cible: [60, 0, 0] },
          texte: 'Le rotor tourne un peu moins vite que le champ : 1435 tr/min contre 1500. C’est ce retard, le glissement, qui fait naître les courants dans la cage : sans lui, plus de couple. L’écart est exagéré à l’écran pour qu’on le voie.' },
        { titre: 'On charge l’arbre', piece: 'arbre', voirDedans: true, eclate: false, actions: [['charge', 140]],
          vue: { azimut: 40, elevation: 20, zoom: 1.1 },
          texte: 'La machine entraînée résiste davantage : le rotor ralentit un peu, le glissement grandit, le courant dépasse la plaque. Le bobinage chauffe — c’est ce que surveille le relais thermique.' },
        { titre: 'Démonté : la mécanique', piece: 'roulements', voirDedans: false, eclate: true, actions: [['charge', 100]],
          texte: 'Deux flasques portent deux roulements, qui tiennent l’arbre ; côté opposé, le ventilateur et son capot. Ce sont les roulements qui lâchent le plus souvent.' }
      ];
    }
    /* l'éclaté le long de l'arbre, dans l'ordre du démontage */
    const eclate = plaqueMode ? [] : [
      { objets: [couvercle], vers: [0, 62, 0], debut: 0, fin: 0.35 },
      { objets: [capot], vers: [-235, 0, 0], debut: 0, fin: 0.45 },
      { objets: [ventilateur], vers: [-150, 0, 0], debut: 0.15, fin: 0.6 },
      { objets: [...flasqueCote['-1'], roulement['-1']], vers: [-92, 0, 0], debut: 0.3, fin: 0.75 },
      { objets: [...flasqueCote['1'], roulement['1']], vers: [105, 0, 0], debut: 0.3, fin: 0.75 },
      { objets: [tournant], vers: [132, 0, 0], debut: 0.5, fin: 1 }
    ];

    return {
      racine, vue, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 22, elevation: 18, zoom: 0.62, cible: [-20, 10, 0] },
      phrase: phrase || undefined,
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: plaqueMode ? undefined : basculerCoupe,
      reperesCote: plaqueMode ? 'gauche' : undefined,
      fantomeAuDepart: !plaqueMode && ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'phase') {
          if (v === 'arret') { E.tension = false; E.bloque = false; }
          if (v === 'champ') { E.tension = true; E.bloque = true; }
          if (v === 'demarrer') { E.tension = true; E.bloque = false; wRotor = 0; }
          if (v === 'marche') { E.tension = true; E.bloque = false; }
          majMesuresTransitoire(calcul(), wRotor === null ? 1 : 0);
          return;
        }
        if (id === 'charge') { E.charge = +v; E.tension = true; E.bloque = false; }
        if (id === 'freq') { E.f = +v; E.tension = true; E.bloque = false; }
        if (id === 'loi') E.loi = v;
        majTexte();
      },
      surEclate(on) { E.demonte = on; courantsBoite.forEach(c => c.objet.visible = !on); },
      animer(dt) {
        if (plaqueMode) return false;
        const r = calcul();
        const alimente = E.tension && !E.demonte;
        /* le champ : 1500 tr/min réels → 0,3 tour par seconde à l'écran (ralenti × 80) */
        const wChamp = alimente ? 2 * Math.PI * 0.3 * (r.ns / 1500) : 0;
        const gVu = Math.min(0.6, r.g * 6);
        const cible = alimente && !E.bloque ? wChamp * (1 - gVu) : 0;
        if (wRotor === null) wRotor = cible;
        wRotor = K.vers(wRotor, cible, alimente ? 0.8 : 0.6, dt);   /* l'inertie : il lui faut du temps */
        phaseChamp += wChamp * dt;
        angleRotor += wRotor * dt;
        tournant.rotation.x = angleRotor; ventilateur.rotation.x = angleRotor;
        /* la cage : courants induits d'autant plus forts que le rotor glisse */
        const gEff = wChamp > 0 ? 1 - wRotor / wChamp : 0;
        alu.emissiveIntensity = alimente ? K.clamp((gEff - gVu) / Math.max(0.05, 1 - gVu), 0, 1) * 1.1 : 0;
        const ratio = cible > 0 ? K.clamp(wRotor / cible, 0, 1) : (E.bloque && alimente ? 0 : 1);
        tMes += dt;
        if (tMes > 0.25 && !freqMode && !plaqueMode && (ratio < 0.995 || !alimente)) { tMes = 0; majMesuresTransitoire(r, ratio); }
        /* les secteurs s'allument selon le courant de leur phase (quatre pôles : deux périodes par tour) */
        const elec = phaseChamp * 2;
        chaleur = K.vers(chaleur, alimente ? Math.min(1.2, r.chauffe) : 0, 1.2, dt);
        secteurs.forEach(s => {
          const i = Math.cos(elec - s.phase * 2 * Math.PI / 3) * s.signe;
          s.mat.emissive.setHex(0xff7a1a);
          s.mat.emissiveIntensity = (alimente ? Math.max(0, i) * 0.85 : 0) + chaleur * 0.6;
        });
        courantsBoite.forEach(c => { c.regler({ debit: alimente ? 1 : 0, frequence: 0.6 * r.ns / 1500 + 0.05, vitesse: 14 + 12 * r.I / 3.84 }); c.animer(dt); });
        return alimente || wRotor > 0.005 || chaleur > 0.01;
      }
    };
  }, { famille: 'moteur', titre: 'Le moteur asynchrone triphasé', stations: ['6.3', '1.7', '7.3'] });
})();
