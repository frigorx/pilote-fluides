/* ÉlectroRézo 3D — famille « reseaux » : cablePrise, cable5G, etoile, champTournant.
   Unités : millimètres. Repère : X largeur, Y hauteur, Z profondeur (+Z = face avant).

   La ligne 2 apprend la distribution : phase, neutre, PE ; triphasé ; tension simple et
   composée ; champ tournant. Ce qu'on doit VOIR : qui porte le courant (grains dorés qui
   vont et viennent), qui ne porte rien (le PE), et d'où vient le 400 V (la géométrie). */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  const PI = Math.PI;

  /* ================================================================== 2.1 — le câble 3G et la prise */
  Electro3D.definir('cablePrise', (T, K, ctx) => {
    const M = K.mat, V = (x, y, z) => new T.Vector3(x, y, z);
    const racine = new T.Group();
    const YC = -6, ZC = 17;                       /* l'axe du câble : y, z */
    const gaineMat = K.plastique(0x9aa0a6, 0.6);
    const R_FIL = 2.1;                            /* conducteur isolé (un peu gros pour qu'on le voie) */

    /* ---------------------------------------------------------------- la prise (socle en saillie) */
    const socle = K.mesh(K.boite(70, 80, 38, 3), M.plastiqueBlanc, -90, 0, 19);
    const facade = new T.Group();
    facade.add(K.cylZ(27, 2, M.plastique, -90, 0, 39, 40));
    [-99.5, -80.5].forEach(x => facade.add(K.cylZ(2.4, 1.2, M.sombre, x, -4, 40, 16)));   /* N à gauche, phase à droite */
    const broche = K.cylZ(2.5, 42, M.laiton, -90, 14, 31, 16);                            /* la broche de terre */
    const eclips = new T.Group();
    [-1, 1].forEach(sx => [-1, 1].forEach(sy => eclips.add(K.mesh(K.boite(3, 10, 5, 0.6), M.zingue, -90 + sx * 36, sy * 24, 30))));
    const bornesPrise = new T.Group();
    [[-99.5, -4, 12], [-80.5, -4, 12], [-90, 14, 12]].forEach(([x, y, z]) => {
      bornesPrise.add(K.mesh(K.boite(8, 7, 7, 0.6), M.laiton, x, y, z));
      const v = K.vis(2.2); v.position.set(x, y + 3.5, z); bornesPrise.add(v);
    });
    [-99.5, -80.5].forEach(x => bornesPrise.add(K.cylZ(1.4, 22, M.cuivre, x, -4, 26.5, 12)));   /* les contacts, derrière les trous */

    /* ---------------------------------------------------------------- la machine : carcasse et boîte à bornes ouverte */
    const carcasse = K.mesh(K.boite(100, 90, 60, 3), M.fonte, 130, 0, 30);
    const boite = new T.Group();
    boite.add(K.mesh(K.boite(1.5, 44, 34, 0.4), M.fonte, 35.75, -5, 17));
    boite.add(K.mesh(K.boite(45, 1.5, 34, 0.4), M.fonte, 57.5, 16.25, 17));
    boite.add(K.mesh(K.boite(45, 1.5, 34, 0.4), M.fonte, 57.5, -26.25, 17));
    boite.add(K.mesh(K.boite(35, 39, 4, 1), M.plastiqueBlanc, 62.5, -4.5, 3.5));     /* la platine isolante du bornier */
    const bornier = new T.Group(), reperesBornier = new T.Group();
    const XB = { N: 52, L: 63, PE: 74 };
    ['N', 'L', 'PE'].forEach(k => {
      bornier.add(K.mesh(K.boite(8, 7, 7, 0.6), M.laiton, XB[k], 0, 9));
      const v = K.vis(2.2); v.rotation.x = PI / 2; v.position.set(XB[k], 0, 12.5); bornier.add(v);
      const g = K.gravure(k, 3.2, { couleur: '#2b3138' }); g.position.set(XB[k], 12.2, 5.6); reperesBornier.add(g);
    });
    bornier.add(K.cylZ(2.2, 7.5, M.zingue, XB.PE, 0, 5.25, 16));
    bornier.add(K.mesh(K.boite(7, 4, 4, 0.6), M.zingue, 77.5, 0, 9));                 /* la liaison de terre jusqu'à la carcasse */                   /* la borne de terre est vissée sur la carcasse */
    const presse = new T.Group();                                                    /* passe-fils des câbles */
    const col = (x, y, z, rExt) => { const a = K.mesh(K.anneau(rExt, 2.1, 2.6, 24), M.caoutchouc, x, y, z); a.rotation.z = PI / 2; return a; };
    presse.add(col(79.2, 10.5, 7, 4.6), col(79.2, 8, 17, 4.6));
    const colliers = new T.Group();
    [-42, 22].forEach(x => {
      const a = K.mesh(K.anneau(6.9, 5.4, 4, 24), M.plastiqueBlanc, x, YC, ZC); a.rotation.z = PI / 2;
      colliers.add(a, K.mesh(K.boite(5, 5, ZC - 6.9 + 0.4, 0.8), M.plastiqueBlanc, x, YC, (ZC - 6.9) / 2));
    });

    /* ---------------------------------------------------------------- le récepteur : un enroulement de moteur */
    const recepteur = new T.Group();
    recepteur.add(K.cylZ(20, 18, K.bobinageMat(2), 135, 0, 30, 36));
    [20.8, 39.2].forEach(z => recepteur.add(K.cylZ(23, 1.6, M.plastiqueNoir, 135, 0, z, 36)));
    recepteur.add(K.cylZ(3.5, 44, M.acier, 135, 0, 24, 16));                         /* l'arbre, tenu au fond de la carcasse */

    /* ---------------------------------------------------------------- le câble 3G 2,5 mm² */
    const DANS = { PE: [2.1, 0], L: [-1.05, 1.8], N: [-1.05, -1.8] };
    const ECART = { PE: [8.5, -0.5], L: [0, 6.5], N: [-8.5, -0.5] };
    const XS = [-60, -30, -20, -10, 0, 6, 10, 40], FA = [0, 0, 0.55, 1, 0.7, 0.3, 0, 0];
    const dansCable = k => XS.map((x, i) => [x, YC + DANS[k][0] + FA[i] * (ECART[k][0] - DANS[k][0]), ZC + DANS[k][1] + FA[i] * (ECART[k][1] - DANS[k][1])]);
    const COTE_PRISE = {
      L: [[-80.5, -13, 12], [-80.5, -15, 12], [-74, -15, 12.5], [-66, -12, 15]],
      N: [[-99.5, -13, 12], [-99.5, -19.5, 12], [-88, -19.5, 12], [-74, -19.5, 12.5], [-66, -14, 15]],
      PE: [[-82, 14, 12], [-72, 14, 12], [-66, 10, 14]]
    };
    const COTE_MACHINE = {
      N: [[46, -8, 11], [49, -12.5, 9], [52, -12.5, 9], [52, -9, 9]],
      L: [[46, -12.5, 11], [50, -17, 9], [63, -17, 9], [63, -9, 9]],
      PE: [[46, -17, 11], [52, -21.5, 9], [74, -21.5, 9], [74, -9, 9]]
    };
    const cond = k => K.fil([...COTE_PRISE[k], ...dansCable(k), ...COTE_MACHINE[k]], R_FIL, k === 'L' ? 'L1' : k);
    const filL = cond('L'), filN = cond('N'), filPE = cond('PE');
    const gaine = new T.Group();
    gaine.add(K.cylX(5.5, 30, gaineMat, -45, YC, ZC, 28), K.cylX(5.5, 30, gaineMat, 25, YC, ZC, 28));
    gaine.add(K.mesh(K.anneau(7.2, 5.5, 3, 24), M.caoutchouc, -53.5, YC, ZC), K.mesh(K.anneau(7.2, 5.5, 3, 24), M.caoutchouc, 33.5, YC, ZC));
    gaine.children[2].rotation.z = PI / 2; gaine.children[3].rotation.z = PI / 2;
    gaine.add(colliers);
    /* les âmes de cuivre, mises à nu au bout de chaque conducteur */
    const amesL = new T.Group(), amesN = new T.Group(), amesPE = new T.Group();
    amesN.add(K.cylY(1.1, 5.5, M.cuivre, -99.5, -10.25, 12, 16), K.cylY(1.1, 5.5, M.cuivre, 52, -6.25, 9, 16));
    amesL.add(K.cylY(1.1, 5.5, M.cuivre, -80.5, -10.25, 12, 16), K.cylY(1.1, 5.5, M.cuivre, 63, -6.25, 9, 16));
    amesPE.add(K.cylX(1.1, 4, M.cuivre, -84, 14, 12, 12), K.cylY(1.1, 5.5, M.cuivre, 74, -6.25, 9, 16));

    /* les fils dans la machine, de la borne vers l'enroulement */
    const F = V(97, 10.5, 56.5);                                                       /* là où l'isolant va lâcher */
    const filL1 = K.fil([[63, 3.5, 9], [63, 9, 9], [70, 10.5, 8.5], [80, 10.5, 7], [88, 10.5, 22], [94, 10.5, 42], F], R_FIL, 'L1');
    const filL2 = K.fil([F, [105, 10.5, 50], [110, 9, 38], [113.8, 3.7, 21]], R_FIL, 'L1');
    const filN2 = K.fil([[113.8, -3.7, 39], [108, -2, 34], [101, 5, 26], [92, 8, 19], [82, 8, 17], [70, 8, 17], [52, 8, 16], [52, 5.5, 11], [52, 3.5, 9]], R_FIL, 'N');
    const phase = new T.Group(); phase.add(filL.mesh, filL1.mesh, filL2.mesh);
    const neutre = new T.Group(); neutre.add(filN.mesh, filN2.mesh);
    const pe = new T.Group(); pe.add(filPE.mesh);
    racine.add(socle, facade, broche, eclips, bornesPrise, carcasse, boite, bornier, reperesBornier, presse, recepteur, gaine, amesL, amesN, amesPE, phase, neutre, pe);

    /* le défaut : un point nu, une étincelle */
    const bavure = K.cylZ(0.9, 2.6, M.cuivre, 97, 10.5, 59, 12); bavure.visible = false;
    const arc = K.arc(V(97, 10.5, 58.3), V(99.5, 12, 59.8), { rayon: 0.5, halo: 1.8 });
    racine.add(bavure, arc.objet);

    /* ---------------------------------------------------------------- le courant */
    const spires = [];
    for (let i = 0; i <= 110; i++) {
      const u = i / 110, a = (170 + u * 740) * PI / 180;
      spires.push(V(135 + 21.5 * Math.cos(a), 21.5 * Math.sin(a), 21 + u * 18));
    }
    const cA = K.chemin([filL.courbe, filL1.courbe]);                                  /* la prise → le point F */
    const cB = K.chemin([filL2.courbe]);                                               /* F → l'enroulement */
    const cC = K.chemin(spires);
    const cD = K.chemin([filN2.courbe, K.inverse(filN)]);                              /* l'enroulement → la prise, par le neutre */
    const cE = K.chemin([[99.5, 12, 58.5], [84, 9, 58.5], [81.2, 7, 44], [81.2, 3, 22], [81.2, 0, 9], [77, 0, 9], [74, 0, 9], [74, -5, 9], K.inverse(filPE)]);
    const FREQ = 0.6;
    const mk = c => { const g = K.courant(c, { pas: 8, rayon: 2.5, vitesse: 70 }); g.regler({ debit: 0, alternatif: true, frequence: FREQ }); racine.add(g.objet); return g; };
    const gA = mk(cA), gB = mk(cB), gC = mk(cC), gD = mk(cD), gE = mk(cE);
    const grains = [gA, gB, gC, gD, gE];
    let tG = 0, niveau = 2, eclatee = false;
    /* niveau 0 hors tension · 1 la phase seule · 2 marche normale · 3 le défaut apparaît (étincelle) · 4 le courant part par le PE */
    const regler = (g, d) => g.regler({ debit: eclatee ? 0 : d, t: tG });
    const MESURES = [['0 A', '0 A', '0 A'], ['10 A', '0 A', '0 A'], ['10 A', '10 A', '0 A'], ['10 A', '10 A', '0 A'], ['16 A', '10 A', '6 A']];
    const majEtat = () => {
      const n = niveau, charge = n === 4 ? 0.62 : 1;
      regler(gA, n >= 1 ? 1 : 0); regler(gB, n >= 1 ? charge : 0);
      regler(gC, n >= 2 ? charge : 0); regler(gD, n >= 2 ? charge : 0);
      regler(gE, n === 4 ? 0.38 : 0);
      bavure.visible = n >= 3; arc.regler(n >= 3 && !eclatee);
      const m = MESURES[n];
      ctx.mesures([{ libelle: 'Phase (marron)', valeur: m[0] }, { libelle: 'Neutre (bleu)', valeur: m[1] }, { libelle: 'PE (vert et jaune)', valeur: m[2] }]);
      ctx.regler('etat', n === 2 ? 'normal' : n === 4 ? 'defaut' : '');
      ctx.reveiller();
    };
    const PHRASES = {
      normal: '<strong>Marche normale.</strong> Le courant part par la phase (marron) et revient par le neutre (bleu). Le conducteur de protection (vert et jaune) ne transporte rien : c’est exactement ce qu’on lui demande.',
      defaut: '<strong>Un défaut d’isolement.</strong> L’isolant a lâché : la phase touche la carcasse. Le courant part par le vert-jaune vers la terre, et il manque au retour par le neutre — c’est ce que le différentiel détecte.'
    };
    const agir = (id, v) => {
      if (id === 'etat') { niveau = v === 'defaut' ? 4 : 2; majEtat(); ctx.dire(PHRASES[v === 'defaut' ? 'defaut' : 'normal']); }
      else if (id === 'phase') { niveau = v; majEtat(); }
    };
    majEtat();

    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: -24, elevation: 14, zoom: 1.4, cadre: [socle, carcasse], marge: 1.05 }
                                    : { azimut: -18, elevation: 16, zoom: 1.4, cadre: [socle, carcasse], marge: 1.05 },
      fond: 'platine',
      fantome: [socle, carcasse],
      phrase: PHRASES.normal,
      pieces: [
        { id: 'prise', nom: 'La prise (le socle)', objets: [socle, facade], desc: 'Un socle 2P+T : deux trous pour la phase et le neutre, et une broche pour la terre. Le neutre est à gauche, la phase à droite.' },
        { id: 'eclips', nom: 'Les éclips', objets: [eclips], desc: 'Des petits crochets en métal qui tiennent la prise dans son boîtier.' },
        { id: 'broche', nom: 'La broche de terre', objets: [broche], desc: 'Elle dépasse de la prise : la fiche touche d’abord la terre, avant la phase et le neutre. Elle est reliée au conducteur vert et jaune.' },
        { id: 'bornesPrise', nom: 'Les bornes de la prise', objets: [bornesPrise], desc: 'Chaque conducteur est serré sous une vis : le neutre (N) à gauche, la phase (L) à droite, la terre (PE) en haut.' },
        { id: 'gaine', nom: 'La gaine grise', objets: [gaine], desc: 'Elle réunit les trois conducteurs et les protège. Ici on l’a retirée au milieu pour voir ce qu’il y a dedans.' },
        { id: 'phase', nom: 'La phase (marron)', objets: [phase], desc: 'Elle amène le courant. Entre elle et la terre, il y a 230 V : c’est elle qui est dangereuse.' },
        { id: 'neutre', nom: 'Le neutre (bleu)', objets: [neutre], desc: 'Il ramène le courant. Le bleu clair lui est réservé.' },
        { id: 'pe', nom: 'Le PE (vert et jaune)', objets: [pe], desc: 'Le conducteur de protection. En marche normale il ne transporte rien : il attend le défaut. Le vert et jaune lui est réservé.' },
        { id: 'ames', nom: 'Les âmes en cuivre', objets: [amesL, amesN, amesPE], desc: 'Le métal qui conduit. L’isolant est enlevé juste ce qu’il faut pour serrer la vis.' },
        { id: 'bornier', nom: 'Le bornier de la machine', objets: [bornier, boite], desc: 'Même ordre que la prise : N, L, et la borne de terre PE vissée directement sur la carcasse.' },
        { id: 'carcasse', nom: 'La carcasse métallique', objets: [carcasse, presse], desc: 'Le boîtier de la machine, en métal. Si on le touche pendant un défaut, on prend le courant : c’est pour cela qu’il est relié au PE.' },
        { id: 'recepteur', nom: 'Le moteur (l’enroulement)', objets: [recepteur], desc: 'Ce que la machine utilise : le courant entre par la phase, traverse l’enroulement, et ressort par le neutre.' }
      ],
      commandes: [
        { id: 'etat', type: 'choix', options: [['normal', 'Marche normale'], ['defaut', 'Un défaut d’isolement']], valeur: 'normal' }
      ],
      etapes: [
        { titre: 'Un câble, trois conducteurs', piece: 'gaine', actions: [['phase', 0]], voirDedans: false,
          texte: 'Le câble 3G 2,5 contient trois fils de cuivre (le « G » veut dire : avec un fil vert et jaune). La couleur de l’isolant donne le rôle : marron la phase, bleu le neutre, vert et jaune le PE. Rien ne passe encore.',
          vue: { azimut: -14, elevation: 18, zoom: 1.9, cible: [-10, -6, 17] } },
        { titre: 'On met sous tension : la phase amène le courant', piece: 'phase', actions: [['phase', 1]], voirDedans: true,
          texte: 'Le courant part de la prise et monte par la phase (marron) jusqu’à la machine. Entre la phase et la terre, il y a 230 V : c’est elle qui est dangereuse.',
          vue: { azimut: -18, elevation: 16, zoom: 1.4, cible: null } },
        { titre: 'Il traverse la machine et revient par le neutre', piece: 'neutre', actions: [['phase', 2]], voirDedans: true,
          texte: 'Dans la machine, le courant passe dans l’enroulement du moteur, puis repart par le neutre (bleu) vers la prise. Il va et vient : il change de sens 50 fois par seconde.',
          vue: { azimut: -18, elevation: 16, zoom: 1.4, cible: null } },
        { titre: 'Le PE ne transporte rien', piece: 'pe', actions: [['phase', 2]], voirDedans: true,
          texte: 'Le fil vert et jaune est relié à la broche de terre et à la carcasse. En marche normale, aucun courant n’y passe : il attend.',
          vue: { azimut: -14, elevation: 18, zoom: 1.5, cible: [10, -4, 14] } },
        { titre: 'Un isolant lâche : la phase touche la carcasse', piece: 'phase', actions: [['phase', 3]], voirDedans: true, ralenti: true,
          texte: 'Le fil marron a usé son isolant. Le cuivre touche le métal de la carcasse : une étincelle jaillit. La carcasse est maintenant sous tension, comme la phase.',
          vue: { azimut: -6, elevation: 8, zoom: 3.4, cible: [97, 10, 50] } },
        { titre: 'Le courant part par le vert et jaune', piece: 'pe', actions: [['phase', 4]], voirDedans: true,
          texte: 'Le courant de défaut prend le chemin facile : la carcasse, la borne de terre, puis le fil vert et jaune. Il manque au retour par le neutre : le différentiel le voit et coupe.',
          vue: { azimut: -14, elevation: 18, zoom: 1.5, cible: [27, -2, 20] } }
      ],
      /* l'éclaté : la façade et les contacts sortent de la prise, la gaine se lève, les trois fils s'écartent, la carcasse monte */
      eclate: [
        { objets: [facade, broche], vers: [0, 0, 60] },
        { objets: [bornesPrise], vers: [0, 0, 30] },
        { objets: [gaine], vers: [0, 36, 10] },
        { objets: [pe, amesPE], vers: [0, 16, 24] },
        { objets: [phase, amesL], vers: [0, 0, 24] },
        { objets: [neutre, amesN], vers: [0, -16, 24] },
        { objets: [carcasse, presse], vers: [0, 78, 0] }
      ],
      eclateVue: { azimut: -30, elevation: 22, zoom: 1.15, cible: [20, 20, 25] },
      surEclate(on) { eclatee = on; majEtat(); },
      agir,
      animer(dt) {
        tG += dt;
        let actif = false;
        grains.forEach(g => { if (g.animer(dt)) actif = true; });
        if (arc.animer(dt)) actif = true;
        return actif;
      }
    };
  }, { famille: 'reseaux', titre: 'Le câble 3G et la prise', stations: ['2.1'] });

  /* ================================================================== 2.3 — le câble 5G et les trois tensions */
  Electro3D.definir('cable5G', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const YC = -28, ZC = -4.5;                    /* l'axe du câble */
    const YA = 58, AMP = 30, LAMBDA = 110, LARG = 222, ZR = { L1: 8, L2: 0, L3: -8 };

    /* ---------------------------------------------------------------- le câble dénudé en éventail */
    const gaine = new T.Group();
    gaine.add(K.cylX(7, 66, K.plastique(0x7d838a, 0.62), -78, YC, ZC, 32));
    const CONDS = [
      { id: 'L1', mat: 'L1', fin: [22, 4], ring: [4.1, 0], rep: 'L1' },
      { id: 'L2', mat: 'L2', fin: [11, 0], ring: [1.27, 3.9], rep: 'L2' },
      { id: 'L3', mat: 'L3', fin: [0, -4], ring: [1.27, -3.9], rep: 'L3' },
      { id: 'N', mat: 'N', fin: [-11, 0], ring: [-3.3, 2.4], rep: 'N' },
      { id: 'PE', mat: 'PE', fin: [-22, -4], ring: [-3.3, -2.4], rep: 'PE' }
    ];
    const fils = {}, reperes = {};
    CONDS.forEach(c => {
      const ys = YC + c.ring[0], zs = ZC + c.ring[1], ye = YC + c.fin[0], ze = ZC + c.fin[1];
      const L = (u, x) => [x, ys + u * (ye - ys), zs + u * (ze - zs)];
      const f = K.fil([[-52, ys, zs], L(0.25, -38), L(0.8, -10), [30, ye, ze], [62, ye, ze], [70, ye, ze]], 2.4, c.mat);
      const g = new T.Group(); g.add(f.mesh);
      g.add(K.cylX(1.3, 14, M.cuivre, 77, ye, ze, 14));                              /* l'âme de cuivre, mise à nu */
      const t = K.gravure(c.rep, 6.5, { couleur: '#2b3138' }); t.position.set(100, ye, 0); racine.add(t); reperes[c.id] = t;
      fils[c.id] = g; racine.add(g);
    });
    racine.add(gaine);

    /* ---------------------------------------------------------------- les trois rubans et leur somme */
    const NS = 150, H = 2.4, W = 7;
    const rubans = {};
    const fabriquerRuban = (id, nom, zc, phi) => {
      const pos = new Float32Array(NS * 4 * 3), idx = [];
      for (let i = 0; i < NS - 1; i++) for (let f = 0; f < 4; f++) { const a = i * 4, b = (i + 1) * 4, f2 = (f + 1) % 4; idx.push(a + f, b + f, b + f2, a + f, b + f2, a + f2); }
      const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(pos, 3)); geo.setIndex(idx);
      const mat = K.propre(K.isolant(nom)); mat.side = T.DoubleSide;
      const mesh = new T.Mesh(geo, mat); mesh.frustumCulled = false;
      const bille = K.mesh(K.sphere(4, 20), mat, 0, YA, zc);
      const barre = K.mesh(K.cylindre(0.9, 1, 12), mat, 0, YA, zc);
      const g = new T.Group(); g.add(mesh, bille, barre); g.visible = false; racine.add(g);
      const poser = th => {
        for (let i = 0; i < NS; i++) {
          const x = -LARG / 2 + i / (NS - 1) * LARG, y = YA + AMP * Math.sin(2 * PI * x / LAMBDA + th - phi);
          pos.set([x, y + H / 2, zc - W / 2, x, y + H / 2, zc + W / 2, x, y - H / 2, zc + W / 2, x, y - H / 2, zc - W / 2], i * 12);
        }
        geo.attributes.position.needsUpdate = true; geo.computeVertexNormals();
        const v = AMP * Math.sin(th - phi);
        bille.position.y = YA + v; barre.position.y = YA + v / 2; barre.scale.y = Math.max(0.01, Math.abs(v));
      };
      rubans[id] = { g, poser };
      return g;
    };
    const gL1 = fabriquerRuban('L1', 'L1', ZR.L1, 0);
    const gL2 = fabriquerRuban('L2', 'L2', ZR.L2, 2 * PI / 3);
    const gL3 = fabriquerRuban('L3', 'L3', ZR.L3, 4 * PI / 3);
    /* le zéro et la ligne de lecture : l'instant où l'on regarde */
    const lecture = new T.Group();
    lecture.add(K.cylX(0.55, LARG + 14, M.plastiqueMarine, 0, YA, 0, 10));
    lecture.add(K.mesh(new T.BoxGeometry(0.8, 2 * AMP + 22, 30), K.lumineux(0x1b3a63, 0.16), 0, YA, 0));
    lecture.visible = false;
    const somme = new T.Group();
    somme.add(K.cylX(1.3, LARG, M.plastiqueRouge, 0, YA, 16, 12), K.mesh(K.sphere(4, 20), M.plastiqueRouge, 0, YA, 16));
    somme.visible = false;
    racine.add(lecture, somme);

    /* ---------------------------------------------------------------- le temps et l'état */
    let t = 0, niveau = 3, eclatee = false, tM = 0;
    const theta = () => 2 * PI * 0.25 * t + 0.6;
    const ecrire = () => {
      const th = theta(), a = Math.round(325 * Math.sin(th)), b = Math.round(325 * Math.sin(th - 2 * PI / 3)), c = -a - b;
      const f = x => (x > 0 ? '+' : x < 0 ? '−' : '') + Math.abs(x) + ' V';
      const liste = [];
      if (niveau >= 1) liste.push({ libelle: 'Tension de L1', valeur: f(a) });
      if (niveau >= 2) liste.push({ libelle: 'Tension de L2', valeur: f(b) });
      if (niveau >= 3) liste.push({ libelle: 'Tension de L3', valeur: f(c) });
      if (niveau >= 4) liste.push({ libelle: 'Leur somme', valeur: '0 V' });
      ctx.mesures(liste);
    };
    const poserTout = () => { const th = theta(); ['L1', 'L2', 'L3'].forEach(k => rubans[k].poser(th)); };
    const majEtat = () => {
      const vis = !eclatee;
      gL1.visible = vis && niveau >= 1; gL2.visible = vis && niveau >= 2; gL3.visible = vis && niveau >= 3;
      lecture.visible = vis && niveau >= 1; somme.visible = vis && niveau >= 4;
      ctx.regler('vue', niveau === 3 ? 'trois' : niveau === 4 ? 'somme' : '');
      ecrire(); ctx.reveiller();
    };
    const PHRASES = {
      trois: '<strong>Les trois tensions.</strong> Même valeur, même fréquence, mais décalées d’un tiers de tour. Ce décalage vient de la construction de l’alternateur : trois bobinages à 120 degrés l’un de l’autre.',
      somme: '<strong>Leur somme.</strong> À chaque instant, les trois s’annulent. Sur une installation équilibrée, le neutre ne ramène donc presque rien — c’est pour cela qu’il peut être plus fin que les phases.'
    };
    const agir = (id, v) => {
      if (id === 'vue') { niveau = v === 'somme' ? 4 : 3; majEtat(); ctx.dire(PHRASES[v === 'somme' ? 'somme' : 'trois']); }
      else if (id === 'ruban') { niveau = v; majEtat(); }
    };
    poserTout(); majEtat();

    const VUE_COURBES = { azimut: -4, elevation: 8, zoom: 1.35, cible: [0, 22, 0] };
    return {
      racine,
      vue: { azimut: -6, elevation: 12, zoom: 1.35, cadre: [gaine, fils.L1, fils.PE, gL1], marge: 1.05 },
      fond: 'platine',
      phrase: PHRASES.trois,
      pieces: [
        { id: 'gaine', nom: 'La gaine grise', objets: [gaine], desc: 'Elle réunit les cinq fils du câble 5G. Ici on l’a retirée au bout pour les voir.' },
        { id: 'l1', nom: 'La phase L1 (marron)', objets: [fils.L1, gL1], desc: 'La première phase. Sa tension monte, redescend, passe en négatif, remonte : 50 fois par seconde. Ici, très au ralenti.' },
        { id: 'l2', nom: 'La phase L2 (noir)', objets: [fils.L2, gL2], desc: 'La deuxième phase. Sa courbe est la même que celle de L1, un tiers de tour plus tard.' },
        { id: 'l3', nom: 'La phase L3 (gris)', objets: [fils.L3, gL3], desc: 'La troisième phase. La même courbe encore, deux tiers de tour plus tard.' },
        { id: 'neutre', nom: 'Le neutre (bleu)', objets: [fils.N], desc: 'Le fil commun : le bleu clair lui est réservé.' },
        { id: 'pe', nom: 'Le PE (vert et jaune)', objets: [fils.PE], desc: 'Le conducteur de protection. Il ne compte pas parmi les fils actifs.' },
        { id: 'lecture', nom: 'La ligne de lecture et le zéro', objets: [lecture], desc: 'La barre verticale marque l’instant que l’on regarde. Les billes donnent la valeur de chaque tension à cet instant.' },
        { id: 'somme', nom: 'La somme des trois', objets: [somme], desc: 'La ligne rouge reste à zéro : à tout instant, les trois tensions s’annulent.' }
      ],
      commandes: [
        { id: 'vue', type: 'choix', options: [['trois', 'Les trois tensions'], ['somme', 'Leur somme']], valeur: 'trois' }
      ],
      etapes: [
        { titre: 'Un câble à cinq fils', piece: 'gaine', actions: [['ruban', 0]],
          texte: 'Le câble 5G contient cinq fils : trois phases (L1 marron, L2 noir, L3 gris), le neutre (bleu) et le PE (vert et jaune). On a retiré la gaine pour les voir.',
          vue: { azimut: -6, elevation: 10, zoom: 1.75, cible: [-6, -28, 0] } },
        { titre: 'La phase L1 porte une tension qui varie', piece: 'l1', actions: [['ruban', 1]],
          texte: 'La courbe marron montre la tension de L1 : elle monte, redescend, passe en négatif, puis remonte. La bille donne sa valeur à cet instant.',
          vue: VUE_COURBES },
        { titre: 'L2 fait pareil, un tiers de tour plus tard', piece: 'l2', actions: [['ruban', 2]],
          texte: 'La courbe noire est la même que la marron, mais en retard d’un tiers de période. Quand L1 est au sommet, L2 est déjà plus bas.',
          vue: VUE_COURBES },
        { titre: 'L3 complète le trio', piece: 'l3', actions: [['ruban', 3]],
          texte: 'La courbe grise est encore décalée d’un tiers de tour. Trois tensions identiques, à 120 degrés l’une de l’autre : c’est le triphasé.',
          vue: VUE_COURBES },
        { titre: 'À chaque instant, la somme est zéro', piece: 'somme', actions: [['ruban', 4]],
          texte: 'Regardez les billes : quand l’une monte, les deux autres descendent. Additionnées, elles donnent toujours zéro : la ligne rouge reste plate.',
          vue: VUE_COURBES }
      ],
      /* l'éclaté : on tire la gaine, les cinq fils se dégagent. Les courbes se cachent, elles n'ont plus de sens ici. */
      eclate: [
        { objets: [gaine], vers: [-70, 0, 0] },
        { objets: [fils.L1, reperes.L1], vers: [0, 16, 0] },
        { objets: [fils.L2, reperes.L2], vers: [0, 8, 0] },
        { objets: [reperes.L3], vers: [0, 0, 0] },
        { objets: [fils.N, reperes.N], vers: [0, -8, 0] },
        { objets: [fils.PE, reperes.PE], vers: [0, -16, 0] }
      ],
      eclateVue: { azimut: -20, elevation: 16, zoom: 1.35, cible: [-12, -28, 0] },
      surEclate(on) { eclatee = on; majEtat(); },
      agir,
      animer(dt) {
        if (eclatee || niveau < 1) return false;
        t += dt; tM += dt;
        poserTout();
        if (tM > 0.2) { tM = 0; ecrire(); }
        return true;
      }
    };
  }, { famille: 'reseaux', titre: 'Le câble 5G et les trois tensions', stations: ['2.3'] });

  /* ================================================================== 2.4 / 2.5 — l'étoile et le voltmètre */
  Electro3D.definir('etoile', (T, K, ctx) => {
    const M = K.mat, V = (x, y, z) => new T.Vector3(x, y, z), D = PI / 180;
    const racine = new T.Group();
    const ANG = { L1: 90, L2: -30, L3: 210 }, RT = 108, ZB = 18;   /* les trois branches à 120°, les bornes à 108 mm du centre */

    /* ---------------------------------------------------------------- les trois enroulements du secondaire */
    const bobines = [], sorties = [], moyeu = new T.Group(), reperes = new T.Group();
    const bornePos = {};
    ['L1', 'L2', 'L3'].forEach(k => {
      const arm = new T.Group(); arm.rotation.z = (ANG[k] - 90) * D; arm.position.z = ZB;     /* son axe local Y part du centre */
      const bob = new T.Group();
      bob.add(K.mesh(K.cylindre(14, 62, 32), K.bobinageMat(3), 0, 57, 0));
      [26.5, 87.5].forEach(y => bob.add(K.mesh(K.cylindre(17.5, 2, 32), M.plastiqueNoir, 0, y, 0)));
      bob.add(K.mesh(K.cylindre(15.2, 5, 32), K.isolant(k), 0, 80, 0));                          /* la bague à la couleur de la phase */
      const sortie = new T.Group();
      sortie.add(K.mesh(K.cylindre(2.1, 15, 16), K.isolant(k), 0, 95.5, 0));
      sortie.add(K.mesh(K.boite(10, 10, 10, 0.8), M.laiton, 0, RT, 0));
      const v = K.vis(3); v.rotation.x = PI / 2; v.position.set(0, RT, 5); sortie.add(v);
      arm.add(bob, sortie); racine.add(arm);
      bobines.push(bob); sorties.push(sortie);
      const rg = new T.Group(); rg.rotation.z = (ANG[k] - 90) * D; rg.position.z = ZB;
      rg.add(K.mesh(K.cylindre(2, 17, 12), M.cuivre, 0, 17.5, 0)); moyeu.add(rg);               /* le départ vers le point commun */
      const a = ANG[k] * D;
      bornePos[k] = V(RT * Math.cos(a), RT * Math.sin(a), ZB);
      const g = K.gravure(k, 9, { couleur: '#2b3138' }); g.position.set(130 * Math.cos(a), 130 * Math.sin(a), 0.8); reperes.add(g);
    });
    /* le point commun et le conducteur neutre */
    moyeu.add(K.cylZ(10, 14, M.laiton, 0, 0, ZB, 28));
    const fileN = new T.Group();
    fileN.add(K.mesh(K.cylindre(2.1, 93, 16), K.isolant('N'), 0, -56.5, ZB));
    const bornN = new T.Group();
    bornN.add(K.mesh(K.boite(10, 10, 10, 0.8), M.laiton, 0, -RT, ZB));
    { const v = K.vis(3); v.rotation.x = PI / 2; v.position.set(0, -RT, ZB + 5); bornN.add(v); }
    bornePos.N = V(0, -RT, ZB);
    { const g = K.gravure('N', 9, { couleur: '#2b3138' }); g.position.set(0, -130, 0.8); reperes.add(g); }
    racine.add(moyeu, fileN, bornN, reperes);

    /* le triangle des extrémités et le rayon : des guides lumineux, au-dessus des enroulements */
    const ZG = 40, PG = k => V(bornePos[k].x, bornePos[k].y, ZG);
    const rouge = K.lumineux(0xc0392b, 0.92), marine = K.lumineux(0x1b3a63, 0.92);
    /* le rayon se lit comme une cote de dessin : un trait à côté de la bobine, deux repères aux bouts */
    const rayon = new T.Group(); rayon.visible = false;
    rayon.add(K.barre(V(-30, 0, ZG), V(-30, RT, ZG), 1.8, marine), K.barre(V(-38, 0, ZG), V(-22, 0, ZG), 1.8, marine), K.barre(V(-38, RT, ZG), V(-22, RT, ZG), 1.8, marine));
    const cote12 = K.barre(PG('L1'), PG('L2'), 1.8, rouge);
    const autresCotes = new T.Group(); autresCotes.add(K.barre(PG('L2'), PG('L3'), 1.8, rouge), K.barre(PG('L3'), PG('L1'), 1.8, rouge));
    const triangle = new T.Group(); triangle.add(cote12, autresCotes); triangle.visible = false;
    racine.add(rayon, triangle);

    /* ---------------------------------------------------------------- le voltmètre */
    const meter = new T.Group(); meter.position.set(215, -8, 14);
    meter.add(K.mesh(K.boite(72, 126, 22, 7), M.plastiqueSombre, 0, 0, -3), K.mesh(K.boite(64, 118, 26, 5), M.plastiqueJaune));
    const ecran = K.ecran(46, 20, { fond: '#c9d6b3', encre: '#1a2a14', texte: ['230.6', 'V AC'] });
    ecran.mesh.position.set(0, 38, 13.15); meter.add(ecran.mesh);
    meter.add(K.cylZ(17, 4, M.plastiqueNoir, 0, -4, 14.6, 32), K.mesh(K.boite(2.6, 14, 1.4, 0.4), M.plastiqueBlanc, 0, 2, 16.8));
    const J = { R: V(12, -48, 13.4), N: V(-12, -48, 13.4) };
    meter.add(K.cylZ(4.8, 1.8, M.plastiqueRouge, J.R.x, J.R.y, 13.4, 24), K.cylZ(4.8, 1.8, M.plastiqueNoir, J.N.x, J.N.y, 13.4, 24));
    meter.add(K.cylZ(2.4, 2, M.sombre, J.R.x, J.R.y, 13.6, 16), K.cylZ(2.4, 2, M.sombre, J.N.x, J.N.y, 13.6, 16));
    const repMeter = new T.Group();            /* les marquages réels : hors pièce, pour ne pas noircir à la surbrillance */
    [['V~', 0, 20, 4.5], ['V', 12, -57, 3.2], ['COM', -12, -57, 3.2]].forEach(([t, x, y, h]) => {
      const g = K.gravure(t, h, { couleur: '#2b3138' }); g.position.set(215 + x, -8 + y, 27.2); repMeter.add(g);
    });
    const JR = V(215 + J.R.x, -8 + J.R.y, 27.4), JN = V(215 + J.N.x, -8 + J.N.y, 27.4);
    /* les pointes : tenues par la main, la pointe d'acier posée sur la borne */
    const DIR = V(0.42, 0.08, 0.9).normalize(), LONG = 66;
    const sonde = mat => {
      const g = new T.Group();
      g.add(K.mesh(K.cylindre(0.4, 16, 12, 2), M.acier, 0, 8, 0), K.mesh(K.cylindre(4.2, 50, 20), mat, 0, 41, 0), K.mesh(K.cylindre(5.6, 3, 20), M.plastiqueNoir, 0, 17, 0));
      g.quaternion.setFromUnitVectors(V(0, 1, 0), DIR); return g;
    };
    const sondeR = sonde(M.plastiqueRouge), sondeN = sonde(M.plastiqueNoir);
    const cordR = new T.Mesh(new T.BufferGeometry(), M.plastiqueRouge), cordN = new T.Mesh(new T.BufferGeometry(), M.plastiqueNoir);
    const refaire = (m, jack, tip) => {
      const dos = tip.clone().addScaledVector(DIR, LONG), mid = jack.clone().lerp(dos, 0.5).add(V(0, -22, 22));
      m.geometry.dispose();
      m.geometry = new T.TubeGeometry(new T.CatmullRomCurve3([jack, jack.clone().add(V(0, -14, 12)), mid, dos]), 40, 1.5, 8, false);
    };
    const pointes = new T.Group(); pointes.add(sondeR, sondeN, cordR, cordN);
    const instrument = new T.Group(); instrument.add(meter, repMeter, pointes);
    racine.add(instrument);
    const ZP = ZB + 7.5;                                         /* sur la tête de vis de la borne */
    const cible = (k) => V(bornePos[k].x, bornePos[k].y, ZP);
    const tipR = cible('L1'), tipN = cible('N'), cibR = tipR.clone(), cibN = tipN.clone();
    const poserSondes = () => { sondeR.position.copy(tipR); sondeN.position.copy(tipN); refaire(cordR, JR, tipR); refaire(cordN, JN, tipN); };

    /* ---------------------------------------------------------------- l'état : 0 le montage, 1 simple, 2 deux phases, 3 le triangle */
    let niveau = 1, eclatee = false, enRoute = false;
    const LIRE = { 1: ['230.6', 'L1 et N', '230 V'], 2: ['399.4', 'L1 et L2', '400 V'], 3: ['399.4', 'L1 et L2', '400 V'] };
    const finir = () => {
      enRoute = false;
      if (niveau >= 1) { ecran.ecrire([LIRE[niveau][0], 'V AC']); ctx.mesures([{ libelle: 'Entre', valeur: LIRE[niveau][1] }, { libelle: 'Le voltmètre lit', valeur: LIRE[niveau][2] }]); }
    };
    const majEtat = (saut) => {
      const mesure = niveau >= 1 && !eclatee;
      instrument.visible = mesure;
      rayon.visible = !eclatee && (niveau === 1 || niveau === 3); triangle.visible = !eclatee && niveau >= 2;
      autresCotes.visible = niveau >= 3; cote12.visible = true;
      if (niveau >= 1) { cibR.copy(cible('L1')); cibN.copy(cible(niveau === 1 ? 'N' : 'L2')); }
      if (saut || !mesure) { tipR.copy(cibR); tipN.copy(cibN); poserSondes(); finir(); }
      else { enRoute = true; ecran.ecrire(['- - -', 'V AC']); }
      if (niveau < 1) ctx.mesures([]);
      ctx.regler('mesure', niveau === 1 ? 'simple' : niveau === 3 ? 'composee' : '');
      ctx.reveiller();
    };
    const PHRASES = {
      simple: '<strong>La tension simple.</strong> Entre une phase et le neutre : 230 volts. Sur le dessin, c’est une branche de l’étoile, qui part du centre.',
      composee: '<strong>La tension composée.</strong> Entre deux phases : 400 volts. Sur le dessin, c’est un côté du triangle. Il est plus long que le rayon, et le rapport vaut 1,73 — c’est-à-dire racine de trois.'
    };
    const agir = (id, v) => {
      if (id === 'mesure') { const avant = niveau; niveau = v === 'composee' ? 3 : 1; majEtat(avant < 1); ctx.dire(PHRASES[v === 'composee' ? 'composee' : 'simple']); }
      else if (id === 'niveau') { const avant = niveau; niveau = v; majEtat(avant < 1 || v < 1); }
    };
    poserSondes(); majEtat(true);

    return {
      racine,
      vue: { azimut: -8, elevation: 12, zoom: 1.12, cadre: [...bobines, meter, bornN], marge: 1.05 },
      fond: 'platine',
      phrase: PHRASES.simple,
      pieces: [
        { id: 'enroulements', nom: 'Les trois enroulements', objets: bobines, desc: 'Le secondaire du transformateur de quartier : trois bobines de fil de cuivre, à 120 degrés l’une de l’autre. La bague colorée donne la phase.' },
        { id: 'point', nom: 'Le point commun (le neutre)', objets: [moyeu], desc: 'Les trois enroulements sont reliés ensemble ici. Ce point est le neutre : le zéro à partir duquel on compte.' },
        { id: 'fileN', nom: 'Le conducteur N (bleu)', objets: [fileN], desc: 'Un simple fil, pas un quatrième enroulement : il sort du point commun et va à la borne N.' },
        { id: 'bornes', nom: 'Les quatre bornes L1, L2, L3, N', objets: [...sorties, bornN], desc: 'Là où l’on raccorde les fils du réseau. Entre deux de ces bornes, on pose le voltmètre.' },
        { id: 'voltmetre', nom: 'Le voltmètre', objets: [meter], desc: 'Il mesure une tension entre ses deux pointes, ici en alternatif (V AC).' },
        { id: 'pointes', nom: 'Les pointes et leurs cordons', objets: [pointes], desc: 'Rouge sur la phase, noire sur le neutre ou sur l’autre phase.' },
        { id: 'rayon', nom: 'Une branche de l’étoile', objets: [rayon], desc: 'Du centre à une borne : un seul enroulement. C’est la tension simple, 230 V.' },
        { id: 'triangle', nom: 'Le triangle des extrémités', objets: [triangle], desc: 'En reliant les trois bornes, on trace un triangle. Chaque côté est une tension composée, 400 V.' }
      ],
      commandes: [
        { id: 'mesure', type: 'choix', options: [['simple', 'La tension simple'], ['composee', 'La tension composée']], valeur: 'simple' }
      ],
      etapes: [
        { titre: 'Trois enroulements, un point commun', piece: 'point', actions: [['niveau', 0]],
          texte: 'Dans le transformateur de quartier, trois enroulements partent d’un même point, à 120 degrés l’un de l’autre. Ce point commun est le neutre. Il n’y a pas de quatrième enroulement.',
          vue: { azimut: -6, elevation: 10, zoom: 1.4, cible: [0, 2, 18] } },
        { titre: 'Entre une phase et le neutre : 230 V', piece: 'rayon', actions: [['niveau', 1]],
          texte: 'On pose les pointes sur L1 et sur le neutre. On mesure un seul enroulement : le voltmètre lit 230 V. C’est la tension simple, celle de nos prises.',
          vue: { azimut: -8, elevation: 12, zoom: 1.12, cible: null } },
        { titre: 'Entre deux phases : 400 V', piece: 'pointes', actions: [['niveau', 2]],
          texte: 'On déplace la pointe noire sur L2. Cette fois on mesure entre deux enroulements : le voltmètre lit 400 V, et pas 460. C’est la tension composée.',
          vue: { azimut: -8, elevation: 12, zoom: 1.12, cible: null } },
        { titre: 'Le triangle : un côté plus long que le rayon', piece: 'triangle', actions: [['niveau', 3]],
          texte: 'En reliant les trois bornes, on trace un triangle. Chaque côté est une tension composée. Il est 1,73 fois plus long que le rayon de l’étoile : 230 × 1,73 donne 400.',
          vue: { azimut: -4, elevation: 22, zoom: 1.15, cible: [0, 0, 18] } }
      ],
      /* l'éclaté : les enroulements s'écartent du centre, les bornes plus loin encore */
      eclate: [
        { objets: [bobines[0]], vers: [0, 28, 0] }, { objets: [bobines[1]], vers: [0, 28, 0] }, { objets: [bobines[2]], vers: [0, 28, 0] },
        { objets: [sorties[0]], vers: [0, 52, 0] }, { objets: [sorties[1]], vers: [0, 52, 0] }, { objets: [sorties[2]], vers: [0, 52, 0] },
        { objets: [bornN, fileN], vers: [0, -40, 0] }
      ],
      eclateVue: { azimut: -10, elevation: 24, zoom: 1.05, cible: [0, 0, 18] },
      surEclate(on) { eclatee = on; majEtat(true); },
      agir,
      animer(dt) {
        if (!enRoute) return false;
        const k = 1 - Math.exp(-7 * dt);
        tipR.lerp(cibR, k); tipN.lerp(cibN, k);
        if (tipR.distanceTo(cibR) < 0.05 && tipN.distanceTo(cibN) < 0.05) { tipR.copy(cibR); tipN.copy(cibN); poserSondes(); finir(); return true; }
        poserSondes();
        return true;
      }
    };
  }, { famille: 'reseaux', titre: 'L’étoile et les deux tensions', stations: ['2.4', '2.5'] });

  /* ================================================================== 2.6 — le champ tournant */
  Electro3D.definir('champTournant', (T, K, ctx) => {
    const M = K.mat, D = PI / 180;
    const racine = new T.Group();
    const wrap = x => Math.atan2(Math.sin(x), Math.cos(x));
    const ZS = 22, LONG_STATOR = 44;                       /* le stator : 44 mm de long, centré en z = 22 */
    const POS = [90, -30, 210];                            /* les axes des trois paires de bobines : U, V, W, à 120° */
    const NOMS = ['U', 'V', 'W'];
    const ISO = ['L1', 'L2', 'L3'].map(n => K.isolant(n));

    /* ---------------------------------------------------------------- l'anneau de tôles du stator */
    const anneau = new T.Group();
    const geoTole = K.anneau(100, 62, 1.8, 64);
    for (let j = 0; j < 20; j++) {
      const m = K.mesh(geoTole, j % 2 ? M.zingue : M.acier, 0, 0, 1.1 + 2.2 * j); m.rotation.x = PI / 2; anneau.add(m);
    }
    racine.add(anneau);

    /* ---------------------------------------------------------------- les six bobines : trois paires, chacune sur son axe */
    const matPaire = NOMS.map(() => { const m = K.propre(K.bobinageMat(3)); m.emissive = new T.Color(0xffb21a); m.emissiveIntensity = 0; return m; });
    const matBague = NOMS.map(() => K.propre(ISO[0]));
    const bobines = [];
    NOMS.forEach((nom, i) => [0, 180].forEach(h => {
      const arm = new T.Group(); arm.rotation.z = (POS[i] + h - 90) * D; arm.position.z = ZS;
      const b = new T.Group();
      b.add(K.mesh(K.cylindre(12.5, 20, 28), matPaire[i], 0, 51, 0));
      [40.8, 61.2].forEach(y => b.add(K.mesh(K.cylindre(15.5, 1.6, 28), M.plastiqueNoir, 0, y, 0)));
      b.add(K.mesh(K.cylindre(13.6, 3.2, 28), matBague[i], 0, 56, 0));          /* la bague : la phase qui l'alimente */
      arm.add(b); racine.add(arm); bobines.push(b);
    }));
    const reperes = new T.Group();                 /* U, V, W gravés sur l'anneau, comme sur un vrai moteur */
    NOMS.forEach((nom, i) => [0, 180].forEach(h => {
      const a = (POS[i] + h) * D, g = K.gravure(nom, 9, { couleur: '#10233c' });
      g.position.set(81 * Math.cos(a), 81 * Math.sin(a), 44.1); reperes.add(g);
    }));
    racine.add(reperes);

    /* ---------------------------------------------------------------- le rotor et l'aiguille aimantée */
    const rotor = new T.Group();
    rotor.add(K.cylZ(28, 30, M.aluminium, 0, 0, ZS, 48), K.cylZ(4.5, 8, M.acier, 0, 0, 3.5, 16));
    const aiguille = new T.Group(); aiguille.position.z = 40;
    aiguille.add(K.mesh(K.boite(15, 28, 6, 2), M.plastiqueRouge, 0, 14, 0), K.mesh(K.boite(15, 28, 6, 2), M.plastiqueBlanc, 0, -14, 0));
    racine.add(rotor, aiguille);

    /* ---------------------------------------------------------------- les flèches : les trois courants, et leur somme (le champ) */
    const fleche = (rS, rT, lT, mat) => {
      const g = new T.Group();
      const tige = K.mesh(K.cylindre(rS, 1, 14), mat), tete = K.mesh(K.cylindre(rT, lT, 20, 0.01), mat);
      g.add(tige, tete);
      g.poser = (ang, L) => {
        g.visible = L > lT * 0.7;
        const ls = Math.max(0.01, L - lT);
        tige.scale.y = ls; tige.position.y = ls / 2; tete.position.y = ls + lT / 2;
        g.rotation.z = ang - PI / 2;
      };
      return g;
    };
    const L0 = 40;                                  /* longueur d'une flèche fine pour un courant de 1 ; la somme vaut 1,5 fois cela */
    const composantes = new T.Group(), fines = NOMS.map((n, i) => { const f = fleche(1.7, 4.4, 8, matBague[i]); composantes.add(f); return f; });
    const champ = fleche(2.4, 6, 14, K.lumineux(0xc0392b)); champ.position.z = 53;
    racine.add(composantes, champ);

    /* ---------------------------------------------------------------- le temps */
    let a = 0, ordre = 'direct', marche = true, eclatee = false, tM = 0, dernierCurseur = -1;
    let angF = Math.PI / 2, angR = Math.PI / 2, cibleF = angF;
    const cablage = () => (ordre === 'inverse' ? [0, 2, 1] : [0, 1, 2]);
    const f2 = v => (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(2).replace('.', ',');
    const calculer = () => {
      const c = cablage(), A = a * D, vals = [0, 1, 2].map(i => Math.cos(A - c[i] * 2 * PI / 3));
      let sx = 0, sy = 0, cx = 0, cy = 0;
      vals.forEach((v, i) => {
        const p = POS[i] * D; sx += v * Math.cos(p); sy += v * Math.sin(p);
        matPaire[i].emissiveIntensity = 1.15 * Math.abs(v);
        matBague[i].color.copy(ISO[c[i]].color);
        /* les trois flèches fines sont mises bout à bout : la dernière pointe là où pointe la grande flèche */
        fines[i].position.set(cx, cy, 60); fines[i].poser(p + (v < 0 ? PI : 0), Math.abs(v) * L0);
        cx += v * L0 * Math.cos(p); cy += v * L0 * Math.sin(p);
      });
      cibleF = Math.atan2(sy, sx);
      return { vals, c };
    };
    const majMesures = () => {
      const { vals, c } = calculer();
      ctx.mesures(NOMS.map((n, i) => ({ libelle: 'Bobine ' + n + ' (L' + (c[i] + 1) + ')', valeur: f2(vals[i]) })));
    };
    const majCurseur = () => {
      const deg = (((Math.round(a / 5) * 5) % 360) + 360) % 360;
      if (deg !== dernierCurseur) { dernierCurseur = deg; ctx.regler('temps', deg); }
    };
    const majCommandes = () => {
      ctx.regler('ordre', ordre);
      ctx.regler('lecture', undefined, { libelle: marche ? 'Arrêter' : 'Faire tourner' });
    };
    const PHRASES = {
      direct: '<strong>Ordre L1 · L2 · L3.</strong> Trois bobines fixes, trois courants décalés d’un tiers de tour : le champ, la flèche rouge, tourne. Le rotor n’a qu’à le suivre.',
      inverse: '<strong>Deux phases échangées.</strong> Les bobines n’ont pas bougé : seules les phases qui les alimentent ont changé de place. Le champ tourne dans l’autre sens.'
    };
    const agir = (id, v) => {
      if (id === 'temps') { a = v; marche = false; }
      else if (id === 'ordre') { ordre = v === 'inverse' ? 'inverse' : 'direct'; ctx.dire(PHRASES[ordre]); }
      else if (id === 'lecture') { marche = !marche; }
      else if (id === 'pas') {
        ordre = v === 'inverse' ? 'inverse' : 'direct';
        if (v === 'U') { a = 0; marche = false; } else if (v === 'V') { a = 120; marche = false; } else if (v === 'W') { a = 240; marche = false; }
        else marche = true;
      }
      majMesures(); majCurseur(); majCommandes(); ctx.reveiller();
    };
    majMesures(); majCurseur(); majCommandes();
    champ.poser(angF, 1.5 * L0); rotor.rotation.z = 0; aiguille.rotation.z = angR - PI / 2;

    const VUE = { azimut: -6, elevation: 10, zoom: 1.1, cible: null };
    return {
      racine,
      vue: { azimut: -6, elevation: 10, zoom: 1.1, cadre: [anneau], marge: 1.05 },
      fond: 'platine',
      phrase: PHRASES.direct,
      pieces: [
        { id: 'anneau', nom: 'L’anneau de tôles (le stator)', objets: [anneau], desc: 'Des tôles d’acier empilées, qui canalisent le champ. Il est fixe : il ne tourne jamais.' },
        { id: 'bobinesU', nom: 'Les bobines U', objets: [bobines[0], bobines[1]], desc: 'Une paire de bobines, face à face. Elle brille d’autant plus que son courant est fort. La bague donne la phase qui l’alimente.' },
        { id: 'bobinesV', nom: 'Les bobines V', objets: [bobines[2], bobines[3]], desc: 'La deuxième paire, à 120 degrés de la première. Même fonctionnement, un tiers de tour plus tard.' },
        { id: 'bobinesW', nom: 'Les bobines W', objets: [bobines[4], bobines[5]], desc: 'La troisième paire, à 120 degrés des deux autres.' },
        { id: 'composantes', nom: 'Les trois petites flèches', objets: [composantes], desc: 'Chacune montre l’effet d’une paire de bobines : sa longueur suit le courant, son sens dépend du signe du courant. Mises bout à bout, elles arrivent au bout de la grande flèche.' },
        { id: 'fleche', nom: 'Le champ (la grande flèche rouge)', objets: [champ], desc: 'L’effet des trois paires ensemble. Elle a toujours la même longueur : le champ tourne, il ne pulse pas.' },
        { id: 'rotor', nom: 'Le rotor', objets: [rotor], desc: 'La pièce du milieu. Il est libre de tourner : il n’a qu’à suivre le champ.' },
        { id: 'aiguille', nom: 'L’aiguille aimantée', objets: [aiguille], desc: 'Comme une boussole : le bout rouge se tourne vers le champ et le suit. Elle montre ce que fera le rotor.' }
      ],
      commandes: [
        { id: 'temps', type: 'curseur', libelle: 'Avancer dans le temps', min: 0, max: 360, pas: 5, unite: '°', valeur: 0, format: v => v + '°' },
        { id: 'ordre', type: 'choix', options: [['direct', 'Ordre L1 · L2 · L3'], ['inverse', 'Deux phases échangées']], valeur: 'direct' },
        { id: 'lecture', type: 'action', libelle: 'Arrêter' }
      ],
      etapes: [
        { titre: 'Le courant est maximal dans U : le champ pointe vers U', piece: 'bobinesU', actions: [['pas', 'U']],
          texte: 'Les bobines sont fixes. À cet instant, la paire U reçoit le courant le plus fort : elle brille le plus. Le champ (la flèche rouge) pointe vers elle, et l’aiguille s’y aligne.', vue: VUE },
        { titre: 'Un tiers de tour plus tard, V prend le relais', piece: 'bobinesV', actions: [['pas', 'V']],
          texte: 'Le courant maximal passe dans la paire V. La flèche rouge a tourné d’un tiers de tour, et l’aiguille l’a suivie. Aucune pièce n’a bougé : seul le courant a changé.', vue: VUE },
        { titre: 'Puis W : encore un tiers de tour', piece: 'bobinesW', actions: [['pas', 'W']],
          texte: 'C’est au tour de la paire W. Le champ a encore tourné d’un tiers de tour. Dans l’ordre : U, V, W, puis on recommence.', vue: VUE },
        { titre: 'Les trois à la suite : il tourne sans arrêt', piece: 'fleche', actions: [['pas', 'tourne']],
          texte: 'Le maximum passe de bobine en bobine, et les bobines sont réparties en cercle : le champ tourne en continu. Sa longueur ne change pas. L’aiguille le suit.', vue: VUE },
        { titre: 'On échange deux phases : il tourne à l’envers', piece: 'aiguille', actions: [['pas', 'inverse']],
          texte: 'On croise deux fils. Les bobines sont au même endroit, mais l’ordre des courants a changé : le champ tourne dans l’autre sens, et l’aiguille avec lui.', vue: VUE }
      ],
      /* l'éclaté : les bobines s'écartent vers l'extérieur, le rotor et l'aiguille sortent par l'avant */
      eclate: [
        ...bobines.map(b => ({ objets: [b], vers: [0, 30, 55] })),
        { objets: [rotor], vers: [0, 0, 100] },
        { objets: [aiguille], vers: [0, 0, 125] }
      ],
      eclateVue: { azimut: -34, elevation: 24, zoom: 0.8, cible: [0, 0, 55] },
      surEclate(on) { eclatee = on; champ.visible = !on; composantes.visible = !on; if (!on) calculer(); ctx.reveiller(); },
      agir,
      animer(dt) {
        if (eclatee) return false;
        if (marche) { a = (a + 40 * dt) % 360; majCurseur(); }
        calculer();
        const k = 1 - Math.exp(-12 * dt), kr = 1 - Math.exp(-3.5 * dt);
        const dF = wrap(cibleF - angF); angF += dF * k;
        const dR = wrap(angF - angR); angR += dR * kr;
        champ.poser(angF, 1.5 * L0); aiguille.rotation.z = angR - PI / 2;
        tM += dt; if (tM > 0.2) { tM = 0; majMesures(); }
        return marche || Math.abs(dF) > 1e-3 || Math.abs(dR) > 1e-3;
      }
    };
  }, { famille: 'reseaux', titre: 'Le champ tournant', stations: ['2.6'] });
})();
