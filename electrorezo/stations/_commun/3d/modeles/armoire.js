/* ÉlectroRézo — l'ARMOIRE : la porte d'entrée du réseau, en 3D.

   Un coin d'atelier : l'arrivée du réseau au mur, l'armoire de démarrage ouverte (sa porte
   montre la pochette du schéma), la boîte à boutons, le moteur sur son socle, l'étagère des
   autres moteurs, l'établi de mesure. Chaque ZONE est une pièce : on la survole, elle
   s'allume ; on la choisit, la page (armoire.html) ouvre ses stations.

   Ce n'est PAS un assemblage des modèles détaillés (plus de 500 000 triangles) : ce sont des
   silhouettes légères et fidèles ; l'appareil détaillé est dans sa station, à un clic.
   Les zones et leurs stations : chantier-armoire/zones.mjs (source unique). */
(() => {
  'use strict';

  Electro3D.definir('armoire', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const V = (x, y, z) => new T.Vector3(x, y, z);
    /* un pavé simple (12 triangles) ; un pavé arrondi quand ça se voit */
    const P = (w, h, d, mat, x, y, z) => K.mesh(K.boite(w, h, d, 0), mat, x, y, z);
    const Pr = (w, h, d, r, mat, x, y, z) => K.mesh(K.boite(w, h, d, r), mat, x, y, z);
    const G = (...o) => K.groupe(...o);
    const ici = (g, x, y, z) => { g.position.set(x, y, z); return g; };

    const mMur = K.plastique(0xefe7da, 0.95), mTole = K.propre(M.plastique), mBois = K.plastique(0xb08968, 0.8);
    const mBoisClair = K.plastique(0xd9bf98, 0.8), mGoulotte = K.plastique(0x9aa3ad, 0.7);
    const mVoyantVert = K.propre(M.plastiqueVert), mVoyantBlanc = K.plastique(0xe8e4da, 0.4), mLampe = K.propre(M.ceramique);

    /* ---------------------------------------------------------------- le mur */
    const mur = P(3400, 2100, 10, mMur, 0, 1050, -5);
    mur.userData.sansOmbre = false;
    racine.add(mur);

    /* ---------------------------------------------------------------- 1. l'arrivée du réseau */
    const coffret = G(
      Pr(300, 400, 150, 6, mTole, 0, 0, 75),
      P(240, 120, 4, K.lumineux(0xffffff), 0, 90, 151),
      ...[0x7a4a2c, 0x26282b, 0x8d9298, 0x2f6db5].map((c, i) => P(26, 70, 6, K.plastique(c, 0.5), -60 + i * 40, 90, 154))
    );
    ici(coffret, -1000, 1450, 0);
    const cMonte = K.fil([V(-1000, 2100, 60), V(-1000, 1650, 60)], 14, 'noir', { pas: 30, radial: 10 }).mesh;
    const cVersArmoire = K.fil([V(-940, 1250, 70), V(-940, 1180, 70), V(-560, 1170, 70), V(-330, 1330, 120)], 11, 'noir', { pas: 25, radial: 10 }).mesh;
    racine.add(coffret, cMonte, cVersArmoire);

    /* ---------------------------------------------------------------- 2. la prise et l'interrupteur */
    const prise = G(
      Pr(90, 90, 40, 6, M.plastiqueBlanc, 0, 0, 20),
      K.cylZ(30, 6, M.plastique, 0, 0, 43, 32),
      K.cylZ(4, 4, M.sombre, -10, 0, 46, 12), K.cylZ(4, 4, M.sombre, 10, 0, 46, 12)
    );
    const inter = G(Pr(90, 90, 40, 6, M.plastiqueBlanc, 0, 0, 20), Pr(46, 56, 10, 3, M.plastique, 0, 0, 44));
    ici(prise, -1200, 1080, 0); ici(inter, -1090, 1080, 0);
    racine.add(prise, inter);

    /* ---------------------------------------------------------------- l'armoire : caisse, platine, rails, goulottes */
    const ZP = 9;                                              /* devant de la platine : dos des appareils */
    const caisse = G(
      P(600, 800, 4, mTole, 0, 1050, 2),
      P(4, 800, 250, mTole, -298, 1050, 125), P(4, 800, 250, mTole, 298, 1050, 125),
      P(600, 4, 250, mTole, 0, 1448, 125), P(600, 4, 250, mTole, 0, 652, 125)
    );
    const platine = P(560, 760, 3, M.zingue, 0, 1050, 6);
    const goulottes = G(
      P(540, 40, 40, mGoulotte, 0, 1285, ZP + 20), P(540, 40, 40, mGoulotte, 0, 1130, ZP + 20), P(540, 34, 40, mGoulotte, 0, 950, ZP + 20),
      P(36, 700, 40, mGoulotte, -262, 1050, ZP + 20), P(36, 700, 40, mGoulotte, 262, 1050, ZP + 20)
    );
    const rail = y => ici(K.railDIN(480), 0, y, ZP);
    racine.add(caisse, platine, goulottes, rail(1355), rail(1215), rail(1045), rail(700));

    /* un appareil modulaire : socle + nez, à poser sur un rail */
    const modulaire = (L, mat, x, y) => { const b = K.boitierModulaire(L, mat); return ici(G(b.socle, b.nez), x, y, ZP); };
    const manette = (x, y) => Pr(7, 18, 12, 2, M.plastiqueMarine, x, y, ZP + 76);

    /* rail 1 — la tête : sectionneur porte-fusible 3 pôles + interrupteur-sectionneur à poignée */
    const spf = modulaire(53, M.plastique, -190, 1355);
    [-17.7, 0, 17.7].forEach(dx => spf.add(Pr(15, 40, 8, 2, M.plastiqueSombre, dx, 0, 72)));
    const isec = modulaire(70, M.plastiqueSombre, -110, 1355);
    const plaque = P(48, 48, 3, M.plastiqueJaune, 0, 0, 72); isec.add(plaque);
    const poignee = G(Pr(12, 46, 16, 4, M.plastiqueRouge, 0, 0, 0)); poignee.position.set(0, 0, 82); isec.add(poignee);
    const tete = [spf, isec];

    /* rail 2 — les protections : trois disjoncteurs, un différentiel */
    const protections = [];
    [-215, -197, -179].forEach(x => protections.push(G(modulaire(18, M.plastiqueBlanc, x, 1215), manette(x, 1215))));
    const dd = modulaire(54, M.plastiqueBlanc, -120, 1215); dd.add(K.cylZ(4, 6, M.plastiqueJaune, 18, 14, 72, 12));
    protections.push(G(dd, manette(-128, 1215)));
    const id = modulaire(36, M.plastiqueBlanc, -66, 1215); id.add(K.cylZ(4, 6, M.plastiqueJaune, 10, 14, 72, 12));
    protections.push(G(id, manette(-70, 1215)));

    /* rail 3 — le départ moteur : disjoncteur moteur, contacteur, relais thermique dessous */
    const dm = modulaire(45, M.plastiqueSombre, -205, 1045);
    dm.add(K.cylZ(14, 10, M.plastiqueNoir, 0, 8, 75, 24), P(4, 22, 4, M.plastiqueJaune, 0, 8, 81));
    const contacteur = G(Pr(45, 85, 80, 4, M.plastiqueSombre, 0, 0, 40), P(24, 14, 3, M.plastique, 0, 12, 81));
    const temoin = P(10, 8, 3, M.plastiqueBlanc, 0, 12, 83); contacteur.add(temoin);
    ici(contacteur, -150, 1045, ZP);
    const rth = G(Pr(45, 48, 70, 4, M.plastiqueSombre, 0, 0, 35), K.cylZ(5, 6, M.plastiqueBleu, -10, 6, 72, 12), K.cylZ(7, 4, M.plastique, 10, 6, 71, 16));
    ici(rth, -150, 977, ZP);
    const depart = [dm, contacteur, rth];

    /* rail 3, à droite — les relais de commande et le relais temporisé */
    const commande = [0, 26, 52].map(x => { const r = modulaire(22, M.plastiqueSombre, x, 1045); r.add(P(14, 30, 3, M.plastique, 0, 6, 72)); return r; });
    const tempo = modulaire(36, M.plastique, 110, 1045);
    tempo.add(K.cylZ(10, 6, M.plastiqueBlanc, 0, 6, 74, 20), P(2, 8, 2, M.plastiqueRouge, 0, 12, 78));
    commande.push(tempo);

    /* en bas — le transformateur de commande, le variateur, le gradateur */
    const transfo = G(P(110, 100, 80, M.tole, 0, 0, 40), Pr(74, 70, 96, 6, M.bobinage, 0, 0, 48), P(96, 10, 16, M.plastiqueSombre, 0, 56, 60));
    ici(transfo, -175, 840, ZP);
    const variateur = G(Pr(150, 180, 110, 8, M.plastiqueNoir, 0, 0, 55), P(80, 36, 3, K.lumineux(0x9fe0b0), -10, 50, 111),
      K.cylZ(12, 8, M.plastique, 40, -20, 112, 20), P(110, 12, 3, M.plastiqueSombre, 0, -70, 111));
    ici(variateur, 170, 830, ZP);
    const gradateur = modulaire(36, M.plastiqueBlanc, 50, 845); gradateur.add(K.cylZ(12, 10, M.plastique, 0, 4, 76, 20));
    const variation = [variateur, gradateur];

    /* tout en bas — le bornier et la barre de terre */
    const bornier = [];
    for (let i = 0; i < 16; i++) {
      const c = i >= 13 ? K.isolant('PE', 40) : i >= 10 ? M.plastiqueBleu : M.plastique;
      bornier.push(P(6, 46, 42, c, -220 + i * 7.2, 700, ZP + 21));
    }
    const barreTerre = G(P(130, 12, 10, M.laiton, 0, 0, 0), ...[-50, -25, 0, 25, 50].map(x => K.cylZ(4, 6, M.zingue, x, 0, 8, 10)));
    ici(barreTerre, 150, 700, ZP + 20);
    bornier.push(barreTerre);

    /* les câbles : de l'armoire au moteur, de la boîte à boutons à l'armoire */
    const cMoteur = K.fil([V(-100, 680, 60), V(-100, 640, 60), V(-100, 300, 50), V(-60, 40, 120), V(380, 30, 330), V(600, 60, 420), V(660, 330, 420)], 12, 'noir', { pas: 30, radial: 10 }).mesh;
    const cBoutons = K.fil([V(470, 1060, 45), V(470, 1000, 45), V(330, 990, 100), V(300, 1000, 130)], 9, 'noir', { pas: 25, radial: 10 }).mesh;
    racine.add(cMoteur, cBoutons);

    racine.add(...tete, ...protections, ...depart, ...commande, transfo, ...variation, ...bornier);

    /* ---------------------------------------------------------------- la porte, ouverte : la pochette du schéma */
    const charniere = new T.Group(); charniere.position.set(-300, 1050, 252);
    const porte = P(600, 800, 18, mTole, 300, 0, 0);
    const pochette = G(P(230, 300, 4, K.plastique(0xc9cdd3, 0.6), 0, 0, 0), P(210, 290, 2, K.plastique(0xfdf3d0, 0.9), 0, 8, -3));
    [-60, -30, 0, 30, 60].forEach(dy => pochette.add(P(150, 3, 1, K.plastique(0x8a7a52, 0.9), 0, dy + 30, -4.5)));
    ici(pochette, 300, -150, -13);
    charniere.add(porte, pochette);
    charniere.rotation.y = -118 * Math.PI / 180;
    racine.add(charniere);

    /* ---------------------------------------------------------------- la boîte à boutons, au mur */
    const ab = G(Pr(120, 220, 90, 8, M.plastique, 0, 0, 45),
      K.cylZ(14, 14, M.plastiqueVert, 0, 70, 96, 24), K.cylZ(14, 14, M.plastiqueNoir, 0, 30, 96, 24),
      P(62, 62, 3, M.plastiqueJaune, 0, -30, 91), K.cylZ(24, 18, M.plastiqueRouge, 0, -30, 100, 28));
    const vBlanc = K.cylZ(9, 10, mVoyantBlanc, -30, -88, 94, 16), vVert = K.cylZ(9, 10, mVoyantVert, 0, -88, 94, 16), vOrange = K.cylZ(9, 10, M.plastiqueOrange, 30, -88, 94, 16);
    ab.add(vBlanc, vVert, vOrange);
    ici(ab, 470, 1180, 0);
    racine.add(ab);

    /* ---------------------------------------------------------------- le moteur, sur son socle */
    const moteur = new T.Group();
    moteur.add(P(440, 50, 280, M.acierSombre, 0, 25, 0), P(70, 90, 230, M.fonte, -110, 95, 0), P(70, 90, 230, M.fonte, 110, 95, 0));
    const corps = K.cylX(125, 330, M.fonte, 0, 230, 0, 32); moteur.add(corps);
    for (let i = 0; i < 12; i++) {
      const a = i / 12 * Math.PI * 2, ail = P(300, 7, 22, M.fonte, 0, 230 + Math.sin(a) * 130, Math.cos(a) * 130);
      ail.rotation.x = -a; moteur.add(ail);
    }
    moteur.add(K.cylX(128, 18, M.fonte, 170, 230, 0, 32), K.cylX(120, 70, M.fonte, -200, 230, 0, 32));
    const arbre = K.cylX(16, 90, M.acier, 220, 230, 0, 20); moteur.add(arbre);
    const clavette = P(20, 6, 6, M.acierSombre, 230, 246, 0); arbre.add(clavette); clavette.position.set(10, 16, 0);
    moteur.add(Pr(110, 70, 110, 6, M.fonte, 30, 385, 0), P(80, 46, 1.5, M.aluminium, -40, 230, 131));
    ici(moteur, 730, 0, 420);
    racine.add(moteur);

    /* ---------------------------------------------------------------- l'étagère : les autres moteurs */
    const etagere = G(P(640, 24, 300, mBois, 0, 0, 150), P(24, 140, 24, mBois, -280, -70, 30), P(24, 140, 24, mBois, 280, -70, 30));
    ici(etagere, 760, 1500, 0);
    const compresseur = G(K.cylY(80, 150, M.plastiqueNoir, 0, 87, 0, 28), K.mesh(K.sphere(80, 24), M.plastiqueNoir, 0, 162, 0), K.cylX(10, 50, M.cuivre, 80, 120, 0, 12));
    ici(compresseur, 600, 1512, 150);
    const machineCC = G(K.cylX(70, 200, M.fonte, 0, 70, 0, 28), K.cylX(46, 40, M.cuivre, 120, 70, 0, 24), K.cylX(10, 50, M.acier, 160, 70, 0, 12));
    ici(machineCC, 820, 1512, 150);
    racine.add(etagere, compresseur, machineCC);

    /* ---------------------------------------------------------------- l'établi de mesure */
    const etabli = G(P(900, 40, 500, mBois, 0, 880, 0), ...[[-410, -210], [410, -210], [-410, 210], [410, 210]].map(([x, z]) => P(40, 860, 40, mBois, x, 430, z)));
    ici(etabli, -1100, 0, 720);
    const multimetre = G(Pr(100, 28, 190, 8, M.plastiqueJaune, 0, 14, 0), P(70, 2, 50, K.lumineux(0xd7ecd6), 0, 29, -45), K.cylY(20, 6, M.plastiqueNoir, 0, 30, 25, 24));
    ici(multimetre, -1380, 900, 720);
    const pince = G(K.mesh(K.tore(42, 9, 10, 32, Math.PI * 1.55), M.plastiqueRouge, 0, 120, 0), Pr(40, 90, 26, 6, M.plastiqueRouge, 0, 45, 0));
    pince.children[0].rotation.z = -0.27 * Math.PI;
    ici(pince, -1240, 900, 680);
    const planche = G(P(280, 18, 170, mBoisClair, 0, 9, 0), P(36, 60, 26, M.plastiqueNoir, -90, 48, 0), K.cylY(16, 24, M.plastique, 70, 30, 0, 16), K.mesh(K.sphere(24, 20), mLampe, 70, 64, 0));
    planche.add(K.fil([V(-80, 78, 0), V(-20, 60, 0), V(60, 30, 0)], 3, 'rouge', { pas: 6, radial: 8 }).mesh);
    ici(planche, -980, 900, 740);
    racine.add(etabli, multimetre, pince, planche);

    /* ---------------------------------------------------------------- les zones (chantier-armoire/zones.mjs) */
    const pieces = [
      { id: 'arrivee', nom: 'L’arrivée du réseau', objets: [coffret, cMonte, cVersArmoire], ancre: [-1000, 1450, 150], desc: 'D’où vient le courant : la centrale, les trois phases, le neutre, la terre.' },
      { id: 'prise', nom: 'La prise et l’éclairage', objets: [prise, inter], ancre: [-1145, 1080, 40], desc: 'Le monophasé de tous les jours : une phase, un neutre, un fil vert-jaune.' },
      { id: 'tete', nom: 'La tête d’armoire', objets: tete, ancre: [-150, 1355, 90], desc: 'Isoler toute l’armoire avant d’y mettre les mains, et la protéger par des fusibles.' },
      { id: 'protections', nom: 'La rangée des protections', objets: protections, ancre: [-140, 1215, 90], desc: 'Couper quand ça va mal : surcharge, court-circuit, défaut d’isolement.' },
      { id: 'depart', nom: 'Le départ moteur', objets: depart, ancre: [-170, 1020, 90], desc: 'Les trois appareils qui font tourner un moteur en sécurité : protéger, commander, surveiller.' },
      { id: 'commande', nom: 'Les relais de commande', objets: commande, ancre: [55, 1045, 90], desc: 'La logique de l’armoire : des contacts qui s’ouvrent, se ferment, attendent.' },
      { id: 'transfo', nom: 'Le transformateur de commande', objets: [transfo], ancre: [-175, 840, 100], desc: 'Abaisser la tension pour que la commande soit sans danger.' },
      { id: 'variation', nom: 'Le variateur et le gradateur', objets: variation, ancre: [150, 840, 120], desc: 'Faire varier la vitesse d’un moteur ou la lumière d’une lampe.' },
      { id: 'bornier', nom: 'Le bornier, les câbles, la terre', objets: [...bornier, cMoteur, cBoutons], ancre: [0, 700, 60], desc: 'Ce qui relie tout : des câbles de bonne section, des repères, une barre de terre.' },
      { id: 'porte', nom: 'La boîte à boutons', objets: [ab], ancre: [470, 1180, 100], desc: 'Ce que l’opérateur touche et voit : marche, arrêt, arrêt d’urgence, voyants.' },
      { id: 'schema', nom: 'Le schéma dans la pochette', objets: [pochette], ancre: [-420, 900, 420], desc: 'Lire le plan de l’armoire : chaque symbole, chaque trait, chaque repère.' },
      { id: 'moteur', nom: 'Le moteur', objets: [moteur], ancre: [730, 230, 560], desc: 'Ce que toute l’armoire fait tourner : sa plaque, son couplage, son champ tournant.' },
      { id: 'machines', nom: 'Les autres moteurs', objets: [compresseur, machineCC], ancre: [710, 1590, 200], desc: 'Le compresseur monophasé et la machine à courant continu.' },
      { id: 'etabli', nom: 'L’établi de mesure', objets: [etabli, multimetre, pince, planche], ancre: [-1100, 930, 720], desc: 'Voir l’invisible : courant, tension, résistance, puissance — en mesurant.' }
    ];

    /* ---------------------------------------------------------------- les états : hors tension, sous tension, en marche */
    const ETATS = {
      arret:   { poignee: 0, blanc: false, vert: false, colle: false, tourne: false, lampe: false },
      tension: { poignee: 1, blanc: true, vert: false, colle: false, tourne: false, lampe: true },
      marche:  { poignee: 1, blanc: true, vert: true, colle: true, tourne: true, lampe: true }
    };
    const PHRASES = {
      arret: 'L’armoire est <strong>hors tension</strong> : la poignée est sur O. Cliquez sur ce que vous reconnaissez — chaque zone ouvre ses stations.',
      tension: 'La poignée est sur I : l’armoire est <strong>sous tension</strong>, le voyant blanc s’allume. Rien ne tourne encore.',
      marche: 'On a appuyé sur Marche : le contacteur <strong>colle</strong>, le voyant vert s’allume, le moteur tourne.'
    };
    let etat = ETATS.arret, angle = 0, vitesse = 0;
    const allume = (m, on, c) => { m.emissive = new T.Color(on ? c : 0x000000); m.emissiveIntensity = on ? 0.9 : 0; };
    const appliquer = nom => {
      etat = ETATS[nom];
      poignee.rotation.z = etat.poignee ? -Math.PI / 2 : 0;
      allume(mVoyantBlanc, etat.blanc, 0xfff6dc); allume(mVoyantVert, etat.vert, 0x2bd36b); allume(mLampe, etat.lampe, 0xffd27a);
      temoin.position.z = etat.colle ? 79 : 83;
      ctx.regler('etat', nom);
      ctx.dire(PHRASES[nom]);
      ctx.reveiller();
    };
    const agir = (idc, v) => { if ((idc === 'etat' || idc === 'phase') && ETATS[v]) appliquer(v); };

    const animer = dt => {
      const cible = etat.tourne ? 9 : 0;
      vitesse += (cible - vitesse) * Math.min(1, dt * 1.5);
      if (vitesse > 0.01) { angle += vitesse * dt; arbre.rotation.x = angle; return true; }
      return false;
    };

    const VUE = { azimut: 14, elevation: 10, zoom: 1.45, cible: [-180, 1020, 300] };
    appliquer('arret');

    return {
      racine, pieces,
      legendeTitre: 'Les zones',
      commandes: [{ id: 'etat', type: 'choix', options: [['arret', 'Hors tension'], ['tension', 'Sous tension'], ['marche', 'Moteur en marche']], valeur: 'arret' }],
      agir, animer, fantome: [],
      vue: Object.assign({ cadre: [coffret, caisse, charniere, moteur, etagere, etabli, ab] }, VUE),
      reperesCote: null,
      phrase: PHRASES.arret,
      etapes: [
        { titre: 'Le courant arrive', texte: 'Il vient du réseau par le câble du coffret : trois phases, le neutre, la terre. Il descend jusqu’à l’armoire.',
          actions: [['phase', 'arret']], piece: 'arrivee', vue: { azimut: 4, elevation: 8, zoom: 1.9, cible: [-800, 1350, 100] } },
        { titre: 'On met l’armoire sous tension', texte: 'La poignée de l’interrupteur-sectionneur passe de O à I : le courant entre dans l’armoire, le voyant blanc s’allume.',
          actions: [['phase', 'tension']], piece: 'tete', vue: { azimut: 10, elevation: 6, zoom: 3.2, cible: [-150, 1300, 80] } },
        { titre: 'Les protections veillent', texte: 'Avant chaque départ, un disjoncteur ou un fusible : il coupera si un câble chauffe ou si le courant s’échappe.',
          actions: [['phase', 'tension']], piece: 'protections', vue: { azimut: 10, elevation: 6, zoom: 3.2, cible: [-140, 1200, 80] } },
        { titre: 'Marche : le contacteur colle', texte: 'On appuie sur Marche : la bobine du contacteur est alimentée, il colle, le voyant vert s’allume.',
          actions: [['phase', 'marche']], piece: 'depart', vue: { azimut: 10, elevation: 6, zoom: 3, cible: [-150, 1020, 80] } },
        { titre: 'Le moteur tourne', texte: 'Le courant suit le câble jusqu’au moteur : l’arbre tourne. Toute l’armoire existe pour ce moment-là.',
          actions: [['phase', 'marche']], piece: 'moteur', vue: { azimut: 28, elevation: 10, zoom: 2, cible: [700, 260, 420] } }
      ]
    };
  }, { titre: 'L’armoire de l’atelier' });
})();
