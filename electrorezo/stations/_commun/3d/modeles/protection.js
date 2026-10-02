/* ÉlectroRézo 3D — famille « protection » : disjoncteur, disjoncteurMoteur, differentiel,
   relaisThermique, cartouche.
   Unités : mm. Repère : X largeur, Y hauteur, Z profondeur (0 = rail, +Z = face avant).

   Ce que l'élève doit VOIR : le bilame qui chauffe et se courbe LENTEMENT (surcharge), la
   bobine qui claque INSTANTANÉMENT (court-circuit), la manette qui retombe sur O, l'arc
   poussé dans la chambre de coupure ; le tore qui compare l'aller et le retour ; la lame
   du fusible qui fond à ses encoches. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  /* ================================================================ briques locales
     (le boîtier modulaire et sa borne à cage sont au kit : K.boitierModulaire, K.cageModulaire) */

  /* le « focus » d'une étape : ce qui ne sert pas à l'évènement disparaît, puis revient.
     jeux = { nom: [objets à cacher] } ; voir(nom) cache ce jeu-là et rend tout le reste ;
     voir('tout') rend tout. Un courant (grains) se cache par un groupe qui l'enveloppe. */
  const focus = jeux => {
    const tous = new Set([].concat(...Object.values(jeux)).filter(Boolean));
    return nom => { tous.forEach(o => { o.visible = true; }); (jeux[nom] || []).forEach(o => { if (o) o.visible = false; }); };
  };

  /* tourner un point (dy, dz) autour de l'axe X */
  const tourner = (dy, dz, a) => [dy * Math.cos(a) - dz * Math.sin(a), dy * Math.sin(a) + dz * Math.cos(a)];

  /* une biellette : un pavé qui relie deux points qui bougent ; m.relier([x,y,z], [x,y,z]) */
  const biellette = (T, K, mat, section) => {
    const m = new T.Mesh(new T.BoxGeometry(section, 1, section), mat);
    m.relier = (p, q) => K.tigeEntre(m, p, q);
    return m;
  };

  /* un bilame : deux lames collées en n tronçons, dressé vers +Y depuis (x, y0, z0).
     plier(theta) le courbe vers +Z·sens (le laiton, qui s'allonge plus, passe à l'extérieur) ;
     chauffer(n) le colore ; bout() rend la position de son extrémité. */
  const bilame = (T, K, o) => {
    const g = new T.Group();
    const mA = K.propre(K.mat.laiton), mB = K.propre(K.mat.acier);
    const n = o.n || 8, l = o.longueur / n, s = o.sens || 1, segs = [];
    for (let i = 0; i < n; i++) {
      const q = new T.Group();
      q.add(K.mesh(new T.BoxGeometry(o.largeur, l * 1.06, o.epaisseur || 1.1), mA, 0, 0, -(o.epaisseur || 1.1) / 2 * s));
      q.add(K.mesh(new T.BoxGeometry(o.largeur, l * 1.06, o.epaisseur || 1.1), mB, 0, 0, (o.epaisseur || 1.1) / 2 * s));
      g.add(q); segs.push(q);
    }
    let fin = [o.x, o.y0 + o.longueur, o.z0];
    const plier = theta => {
      let y = o.y0, z = o.z0, a = 0;
      const pas = theta / n * s;
      segs.forEach(q => {
        const am = a + pas / 2;
        q.position.set(o.x, y + Math.cos(am) * l / 2, z + Math.sin(am) * l / 2);
        q.rotation.x = am;
        y += Math.cos(am) * l; z += Math.sin(am) * l; a += pas;
      });
      fin = [o.x, y, z];
    };
    plier(0);
    return { groupe: g, plier, chauffer: v => { K.chaleur(mA, v); K.chaleur(mB, v); }, bout: () => fin };
  };

  /* une manette de modulaire (axe X en (0, yP, zP)) : I en haut, O en bas */
  const manetteModulaire = (T, K, largeur, yP, zP, mat) => {
    const g = new T.Group(); g.position.set(0, yP, zP);
    g.add(K.mesh(K.boite(largeur, 7, 20, 1.6), mat, 0, 0, 10));
    const moyeu = K.mesh(K.cylindre(4, largeur, 24), mat); moyeu.rotation.z = Math.PI / 2; g.add(moyeu);
    g.add(K.mesh(K.boite(largeur - 4, 1.2, 0.6, 0.3), K.mat.plastiqueBlanc, 0, 0, 20.1));
    return g;
  };
  const ANGLE_I = -0.42, ANGLE_O = 0.42;

  /* un pôle de contact : pastille fixe en (x, 0.45, 20), bras mobile qui pivote en (x, -10, 28) ;
     ouvert : le bras tourne de -0,62 rad, sa pastille descend vers la chambre de coupure */
  const PIVOT = [-10, 28], BOUT = [9, -8], OUVERTURE = -0.62;
  const poleContact = (T, K, x) => {
    const fixe = new T.Group();
    fixe.add(K.mesh(new T.BoxGeometry(3.4, 0.8, 3.4), K.mat.argent, x, 0.45, 20));
    const bras = new T.Group(); bras.position.set(x, PIVOT[0], PIVOT[1]);
    const L = Math.hypot(BOUT[0], BOUT[1]);
    const lame = K.mesh(new T.BoxGeometry(3, L, 1.6), K.mat.cuivre, 0, BOUT[0] / 2, BOUT[1] / 2);
    lame.rotation.x = Math.atan2(BOUT[1], BOUT[0]);
    bras.add(lame);
    bras.add(K.mesh(new T.BoxGeometry(3.4, 0.8, 3.4), K.mat.argent, 0, BOUT[0] - 0.35, BOUT[1]));
    const moyeu = K.mesh(K.cylindre(2.2, 4, 16), K.mat.plastiqueMarine); moyeu.rotation.z = Math.PI / 2; bras.add(moyeu);
    return { fixe, bras, bout: a => { const p = tourner(BOUT[0], BOUT[1], a); return [x, PIVOT[0] + p[0], PIVOT[1] + p[1]]; } };
  };

  /* la chambre de coupure : des plaquettes d'acier empilées, tenues par deux joues */
  const chambreCoupure = (T, K, x) => {
    const g = new T.Group();
    const m = K.mat.acierSombre;
    for (let i = 0; i < 8; i++) g.add(K.mesh(new T.BoxGeometry(7, 0.7, 11), m, x, -3.5 - i * 2, 8));
    g.add(K.mesh(K.boite(9, 19, 1.4, 0.3), K.mat.plastiqueSombre, x, -10.5, 1.9));
    /* la corne qui guide l'arc depuis le contact fixe */
    g.add(K.fil([[x, 0.6, 18.2], [x, -0.8, 15], [x, -2.6, 13.6]], 0.6, K.mat.cuivreSombre).mesh);
    return g;
  };

  /* le courant dans une bobine d'axe Z : une hélice de points */
  const helice = (T, x, y, r, z0, z1, a0, tours) => {
    const pts = [];
    for (let i = 0; i <= 90; i++) {
      const u = i / 90, a = a0 + u * tours * Math.PI * 2;
      pts.push(new T.Vector3(x + r * Math.cos(a), y + r * Math.sin(a), z0 + (z1 - z0) * u));
    }
    return pts;
  };

  /* ================================================================ le disjoncteur
     Le mécanisme d'un pôle protégé (bobine, contacts, chambre, bilame, barre, serrure),
     écrit une fois : le disjoncteur (4.3) et le disjoncteur différentiel (4.6) s'en servent. */
  const polePhase = (T, K, x) => {
    const M = K.mat;
    const P = {};
    /* la bobine du déclencheur magnétique (axe Z) et son noyau plongeur */
    P.bobine = new T.Group();
    const enroul = K.mesh(K.anneau(6, 3.2, 14, 32), K.bobinageMat(4), x, 18, 22); enroul.rotation.x = Math.PI / 2;
    const support = K.mesh(K.boite(11, 6, 14, 0.8), M.plastiqueSombre, x, 18, 7.5);
    P.bobine.add(enroul, support);
    P.noyau = K.mesh(K.cylindre(2.6, 17, 24), M.acier, x, 18, 22.5); P.noyau.rotation.x = Math.PI / 2;
    /* les conducteurs de cuivre du pôle */
    P.conducteurs = new T.Group();
    P.conducteurs.add(K.fil([[x, 30, 33], [x, 27, 31], [x, 24.6, 29]], 1, M.cuivre).mesh);
    P.conducteurs.add(K.fil([[x, 11.6, 15], [x, 6, 15], [x, 2.2, 18], [x, 1.2, 20]], 1, M.cuivre).mesh);
    P.conducteurs.add(K.fil([[x, -30, 36], [x, -32, 35], [x, -33, 33.5]], 1, M.cuivre).mesh);
    /* le contact */
    P.contact = poleContact(T, K, x);
    P.chambre = chambreCoupure(T, K, x);
    /* le bilame (déclencheur thermique), et la tresse souple qui le relie au bras mobile */
    P.bilame = bilame(T, K, { x, y0: -30, z0: 36, longueur: 18, largeur: 6, epaisseur: 1.35, n: 8, sens: 1 });
    P.socleBilame = K.mesh(K.boite(7, 3, 6, 0.5), M.plastiqueSombre, x, -31.5, 36);
    P.tresse = K.fil([[x, -10, 28], [x, -10.5, 31], [x - 0.5, -11.5, 34], [x, -12, 35.5]], 0.75, M.cuivreSombre).mesh;
    /* la barre de déclenchement, que le noyau et le bilame poussent vers l'avant */
    P.barre = K.mesh(K.boite(3, 35, 3, 0.6), M.plastiqueMarine, x, 2.5, 41.8);
    P.guide = K.mesh(K.boite(6, 2, 6, 0.4), M.plastiqueSombre, x, -16.6, 41.8);
    /* la serrure : le verrou bascule quand la barre avance, le crochet lâche la manette */
    P.verrou = new T.Group(); P.verrou.position.set(x, 27, 44.8);
    P.verrou.add(K.mesh(K.boite(4, 7, 3, 0.5), M.plastiqueMarine, 0, -3.5, 0));
    const axeV = K.mesh(K.cylindre(1.2, 6, 12), M.acier); axeV.rotation.z = Math.PI / 2; P.verrou.add(axeV);
    P.crochet = biellette(T, K, M.plastiqueMarine, 1.8);
    P.bielle = biellette(T, K, M.plastiqueMarine, 2.2);
    P.ressort = K.ressort(1.2, 15, 6, 0.28, M.acier); P.ressort.position.set(x + 2.9, -22, 24.6);
    return P;
  };

  Electro3D.definir('disjoncteur', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const L = 36, XN = -9, XL = 9;

    const rail = K.railDIN(70); racine.add(rail);
    const { socle, nez, griffe } = K.boitierModulaire(L, M.plastiqueBlanc);
    const fente = K.mesh(K.boite(28, 21, 0.8, 0.3), M.sombre, 0, 4, 69.9);
    racine.add(socle, nez, griffe, fente);

    /* marquages réels : I / O, C16, repères N, 1, 2 */
    const marquages = new T.Group();
    const grave = (t, h, x, y, z) => { const m = K.gravure(t, h, { couleur: '#2b3138' }); m.position.set(x, y, z); marquages.add(m); };
    grave('I', 3, 0, 18.6, 70.05); grave('O', 3, 0, -10.6, 70.05); grave('C16', 3.4, 0, -17.6, 70.05);
    grave('N', 3, XN, 27, 44.05); grave('1', 3, XL, 27, 44.05); grave('N', 3, XN, -27, 44.05); grave('2', 3, XL, -27, 44.05);
    racine.add(marquages);

    /* les bornes à cage : neutre à gauche, phase à droite */
    const bornes = new T.Group();
    [[XN, 33, 1], [XL, 33, 1], [XN, -33, -1], [XL, -33, -1]].forEach(([x, y, s]) => bornes.add(K.cageModulaire(x, y, s)));
    racine.add(bornes);

    /* le pôle protégé (phase) */
    const P = polePhase(T, K, XL);
    racine.add(P.bobine, P.noyau, P.conducteurs, P.contact.fixe, P.contact.bras, P.chambre,
      P.bilame.groupe, P.socleBilame, P.tresse, P.barre, P.guide, P.verrou, P.crochet, P.bielle, P.ressort);

    /* le pôle neutre : coupé en même temps, mais sans déclencheur */
    const neutre = new T.Group();
    neutre.add(K.fil([[XN, 30, 33], [XN, 26, 30], [XN, 10, 24], [XN, 2.2, 20.6], [XN, 1.2, 20]], 1, M.cuivre).mesh);
    neutre.add(K.fil([[XN, -10, 28], [XN, -18, 31], [XN, -28, 33.5], [XN, -33, 33.5]], 0.75, M.cuivreSombre).mesh);
    const CN = poleContact(T, K, XN);
    racine.add(neutre, CN.fixe, CN.bras);
    /* l'axe commun : les deux bras s'ouvrent ensemble */
    const axe = K.mesh(K.cylindre(1.2, 26, 16), M.acier, 0, PIVOT[0], PIVOT[1]); axe.rotation.z = Math.PI / 2;
    racine.add(axe);

    /* la manette */
    const manette = manetteModulaire(T, K, 24, 4, 60, M.plastiqueMarine);
    racine.add(manette);

    /* les fils : neutre bleu à gauche, phase marron à droite */
    const fils = new T.Group();
    const fH = x => [[x, 74, 18], [x, 62, 28], [x, 50, 33], [x, 37, 33]];
    const fB = x => [[x, -37, 33], [x, -50, 33], [x, -62, 28], [x, -74, 18]];
    const fNh = K.fil(fH(XN), 1.6, 'N'), fNb = K.fil(fB(XN), 1.6, 'N');
    const fLh = K.fil(fH(XL), 1.6, 'L1'), fLb = K.fil(fB(XL), 1.6, 'L1');
    fils.add(fNh.mesh, fNb.mesh, fLh.mesh, fLb.mesh);
    racine.add(fils);

    /* le courant : phase par la bobine puis le bilame ; neutre tout droit */
    const cheminL = K.chemin([fLh.courbe, [XL, 33, 33], [XL, 28, 31], [XL, 24.4, 29],
      ...helice(T, XL, 18, 6.4, 29, 15, Math.PI / 2, 3.5), [XL, 6, 15], [XL, 2.2, 18], [XL, 0.8, 20], [XL, -1, 20],
      [XL, -10, 28], [XL, -11, 32], [XL, -12, 36.2], [XL, -30, 36.2], [XL, -33, 33.5], fLb.courbe]);
    const cheminN = K.chemin([fNh.courbe, [XN, 33, 33], [XN, 26, 30], [XN, 10, 24], [XN, 0.8, 20], [XN, -1, 20],
      [XN, -10, 28], [XN, -18, 31], [XN, -28, 33.5], [XN, -33, 33.5], fNb.courbe]);
    const grains = [cheminL, cheminN].map(c => {
      const g = K.courant(c, { pas: 6, rayon: 1, vitesse: 30 });
      g.regler({ debit: 1, alternatif: true, frequence: 0.7 }); racine.add(g.objet); return g;
    });

    /* l'arc, à l'ouverture : entre les pastilles, puis poussé dans la chambre */
    const arc = K.arc(new T.Vector3(XL, 0.4, 20), new T.Vector3(XL, -1, 20), { rayon: 0.45, halo: 0.8 });
    const arcChambre = K.arc(new T.Vector3(XL, -2.5, 14.6), new T.Vector3(XL, -15, 14.1), { rayon: 0.55, halo: 0.9 });
    racine.add(arc.objet, arcChambre.objet);

    /* ---------------------------------------------------------------- l'état */
    const ouvert = K.mobile(0, 420, 22);     /* 0 fermé (I) → 1 ouvert (O) */
    const noyau = K.mobile(0, 1600, 45);     /* course du noyau plongeur, mm */
    const barre = K.mobile(0, 900, 32);      /* 0 → 1 : la barre avance de 2,5 mm */
    let etat = 'repos', chaleur = 0.12, declenche = false, cause = '', tArc = 0, tRetour = 0, tDecl = 0, initialise = false;
    /* pas à pas : les déclenchements automatiques sont suspendus, chaque étape pose son évènement */
    let pasAPas = false, plafond = 9, arcLong = false, eclatee = false, tArc0 = 0;
    const SEUIL = 0.38;                       /* courbure (rad) qui fait toucher la barre */
    const courbure = () => 0.62 * K.clamp((chaleur - 0.12) / 1.1, 0, 1);

    const placer = () => {
      const a = OUVERTURE * K.clamp(ouvert.x, -0.1, 1.05);
      P.contact.bras.rotation.x = a; CN.bras.rotation.x = a;
      const am = ANGLE_I + (ANGLE_O - ANGLE_I) * K.clamp(ouvert.x, -0.1, 1.1);
      manette.rotation.x = am;
      P.noyau.position.z = 22.5 + noyau.x;
      P.barre.position.z = 41.8 + 3.5 * barre.x;
      P.verrou.rotation.x = -0.5 * barre.x;
      const pm = tourner(-6, -3, am), pa = tourner(4.5, -4, a), ph = tourner(3, -4, am);
      P.bielle.relier([6, 4 + pm[0], 60 + pm[1]], [6, PIVOT[0] + pa[0], PIVOT[1] + pa[1]]);
      const pv = tourner(0, 0, 0);
      P.crochet.relier([12, 27 + pv[0], 44.8], [12, 4 + ph[0], 60 + ph[1]]);
      P.ressort.longueur(Math.max(4, PIVOT[0] + pa[0] + 22));
      P.bilame.plier(courbure());
      P.bilame.chauffer(chaleur > 0.2 ? chaleur : 0);
    };

    const ferme = () => !declenche && ouvert.x < 0.5;
    const courantA = () => !ferme() ? 0 : etat === 'surcharge' ? 24 : etat === 'court' ? 1000 : 10;
    let dernieresMesures = '';
    const majMesures = () => {
      let temps;
      if (declenche) temps = cause === 'magnetique' ? 'moins de 10 ms' : 'quelques secondes (accéléré)';
      else if (etat === 'surcharge') temps = 'dans ≈ ' + Math.max(1, Math.ceil((SEUIL - courbure()) / 0.44 * 1.1 / 0.3)) + ' s';
      else if (etat === 'court') temps = 'moins de 10 ms';
      else temps = 'jamais : courant normal';
      const I = courantA();
      const liste = [
        { libelle: 'Courant (calibre C16)', valeur: I >= 1000 ? '≈ 1 000 A' : I + ' A' },
        { libelle: 'Temps avant déclenchement', valeur: declenche ? 'déclenché' : temps },
        { libelle: 'Manette', valeur: declenche ? 'O — ouvert' : 'I — fermé' }
      ];
      const cle = JSON.stringify(liste);
      if (cle !== dernieresMesures) { dernieresMesures = cle; ctx.mesures(liste); }
    };
    const majGrains = () => {
      const on = ferme() && !eclatee;
      grains.forEach(g => g.regler({ debit: on ? 1 : 0, vitesse: etat === 'surcharge' ? 46 : etat === 'court' ? 120 : 30 }));
    };

    const PHRASES = {
      repos: '<strong>Au repos.</strong> Le courant entre en haut, traverse la bobine puis le bilame, et ressort en bas. Ni l’un ni l’autre ne bouge.',
      surcharge: '<strong>Surcharge.</strong> Un peu trop de courant, longtemps. Le bilame chauffe et se courbe <em>lentement</em>, jusqu’à pousser la barre de déclenchement.',
      thermique: '<strong>Déclenché par le bilame.</strong> Il a poussé la barre : la serrure lâche, la manette retombe sur O, les contacts s’ouvrent. Ici le temps est accéléré : en vrai, des secondes ou des minutes.',
      magnetique: '<strong>Court-circuit.</strong> Le courant devient énorme d’un coup : la bobine attire le noyau, qui frappe la barre <em>instantanément</em>. L’arc part dans la chambre de coupure et s’éteint. Le bilame n’a pas eu le temps de bouger.',
      rearme: '<strong>Réarmé.</strong> On remonte la manette sur I : la serrure s’accroche de nouveau. Avant de réarmer, on cherche toujours la cause du défaut.'
    };

    const declencher = (c, muet) => {
      if (declenche) return;
      declenche = true; cause = c; tDecl = 0;
      barre.cible = 1; ouvert.cible = 1; tArc = tArc0 = arcLong ? 2.6 : 0.42; tRetour = pasAPas ? 0 : 0.45;
      majGrains(); majMesures();
      if (!muet) ctx.dire(PHRASES[c]);
      ctx.regler('rearmer', null, { desactive: false });
    };
    const rearmer = () => {
      declenche = false; cause = ''; ouvert.cible = 0; barre.cible = 0; noyau.cible = 0;
      chaleur = Math.min(chaleur, 0.35);
      ctx.regler('rearmer', null, { desactive: true });
    };

    /* le mouvement découpé pour la leçon (étapes) : un évènement à la fois */
    const phase = v => {
      pasAPas = true; arcLong = false; plafond = 9;
      const remettre = (e, ch) => { declenche = false; cause = ''; ouvert.cible = 0; barre.cible = 0; noyau.cible = 0; tArc = 0; arc.regler(false); arcChambre.regler(false); etat = e; chaleur = ch; ctx.regler('rearmer', null, { desactive: true }); };
      if (v === 'repos') remettre('repos', 0.12);
      if (v === 'chauffe') { remettre('surcharge', 0.45); plafond = 0.74; }
      if (v === 'pousse') { remettre('surcharge', Math.max(chaleur, 0.74)); plafond = 0.98; }
      if (v === 'ouvre') { if (declenche) remettre('surcharge', 0.98); etat = 'surcharge'; chaleur = Math.max(chaleur, 0.98); declencher('thermique', true); }
      if (v === 'noyau') { remettre('court', 0.12); noyau.cible = 10; }
      if (v === 'arc') { if (declenche) remettre('court', 0.12); etat = 'court'; noyau.x = 10; noyau.cible = 10; arcLong = true; declencher('magnetique', true); }
      ctx.regler('etat', etat);
      majGrains(); majMesures();
    };

    const agir = (id, v) => {
      if (id === 'phase') { phase(v); return; }
      pasAPas = false; plafond = 9; arcLong = false;
      if (id === 'rearmer') {
        if (!declenche) return;
        rearmer(); etat = 'repos'; ctx.regler('etat', 'repos');
        majGrains(); majMesures(); ctx.dire(PHRASES.rearme); return;
      }
      if (id !== 'etat') return;
      if (declenche) rearmer();
      etat = v;
      noyau.cible = 0;
      majGrains(); majMesures();
      ctx.dire(PHRASES[v === 'court' ? 'magnetique' : v] || PHRASES.repos);
      if (v === 'court') noyau.cible = 10;
    };

    placer(); majMesures();

    return {
      racine,
      /* comprendre : du côté de la phase, là où l'on voit le mécanisme ; découvrir : de trois quarts face */
      vue: ctx.mode === 'decouvrir' ? { azimut: 26, elevation: 14, cadre: [socle, nez], marge: 1.12 }
                                    : { azimut: 66, elevation: 14, cadre: [socle, nez], marge: 1.08 },
      fond: 'platine',
      fantome: [socle, nez, griffe, fente],
      phrase: PHRASES.repos,
      pieces: [
        { id: 'boitier', nom: 'Le boîtier (2 modules)', objets: [socle, nez, griffe, fente], desc: 'Deux modules de 18 mm. Il porte le calibre et la courbe : C16. « Voir dedans » le rend transparent.' },
        { id: 'manette', nom: 'La manette I / O', objets: [manette], desc: 'En haut sur I : fermé. Quand le disjoncteur déclenche, elle retombe seule sur O.' },
        { id: 'bornes', nom: 'Les bornes à cage', objets: [bornes], desc: 'Neutre à gauche, phase à droite. L’arrivée en haut, le départ en bas.' },
        { id: 'bobine', nom: 'La bobine et son noyau', objets: [P.bobine, P.noyau], desc: 'Le déclencheur magnétique. En court-circuit, elle devient un aimant et lance le noyau : instantané.' },
        { id: 'bilame', nom: 'Le bilame', objets: [P.bilame.groupe, P.socleBilame, P.tresse], desc: 'Le déclencheur thermique : deux métaux collés qui se courbent en chauffant. Lent, pour la surcharge.' },
        { id: 'meca', nom: 'La barre et la serrure', objets: [P.barre, P.guide, P.verrou, P.crochet, P.bielle, P.ressort, axe], desc: 'Le bilame ou le noyau pousse la barre ; la serrure lâche et le ressort ouvre les contacts d’un coup.' },
        { id: 'contacts', nom: 'Les contacts', objets: [P.contact.fixe, P.contact.bras, CN.fixe, CN.bras], desc: 'Un contact fixe et un contact mobile, avec des pastilles d’argent. Les deux pôles s’ouvrent ensemble.' },
        { id: 'chambre', nom: 'La chambre de coupure', objets: [P.chambre], desc: 'Des plaquettes d’acier empilées. L’arc y est poussé, découpé, refroidi : il s’éteint.' },
        { id: 'cuivre', nom: 'Les conducteurs internes', objets: [P.conducteurs, neutre], desc: 'Des pièces de cuivre. Le neutre va tout droit ; la phase passe par la bobine puis par le bilame.' },
        { id: 'rail', nom: 'Le rail DIN', objets: [rail], desc: 'Le disjoncteur s’y clipse, comme tout l’appareillage modulaire.' }
      ],
      commandes: [
        { id: 'etat', type: 'choix', options: [['repos', 'Au repos'], ['surcharge', 'Surcharge'], ['court', 'Court-circuit']], valeur: 'repos' },
        { id: 'rearmer', type: 'action', libelle: 'Réarmer', accent: true }
      ],
      etapes: [
        { titre: 'Au repos', piece: 'cuivre', voirDedans: true, actions: [['phase', 'repos']],
          vue: { azimut: 52, elevation: 14, zoom: 1.0 },
          texte: 'Le courant entre en haut, tourne dans la bobine, passe les contacts, descend dans le bilame et ressort en bas. Rien ne bouge : la manette est sur I.' },
        { titre: 'Surcharge : le bilame chauffe et se courbe', actions: [['phase', 'chauffe']],
          vue: { azimut: 58, elevation: 8, zoom: 1.75, cible: [9, -17, 36] }, duree: 7,
          texte: 'Un peu trop de courant, longtemps. Le bilame chauffe — il rougit — et se courbe peu à peu vers la barre. C’est lent : des secondes ou des minutes.' },
        { titre: 'Le bilame pousse la barre de déclenchement', piece: 'meca', actions: [['phase', 'pousse']],
          vue: { azimut: 56, elevation: 10, zoom: 1.3, cible: [9, -2, 38] },
          texte: 'Assez courbé, le bilame touche la barre et la pousse vers l’avant. En haut, la barre fait basculer le verrou de la serrure.' },
        { titre: 'La serrure lâche : la manette tombe sur O', piece: 'manette', ralenti: true, actions: [['phase', 'ouvre']],
          vue: { azimut: 48, elevation: 14, zoom: 1.0 }, duree: 7,
          texte: 'Le ressort ouvre les contacts d’un coup, les deux pôles ensemble, et la manette retombe sur O. Le courant ne passe plus.' },
        { titre: 'Court-circuit : la bobine lance le noyau', piece: 'bobine', ralenti: true, actions: [['phase', 'noyau']],
          vue: { azimut: 58, elevation: 10, zoom: 1.35, cible: [9, 10, 30] },
          texte: 'On a réarmé. Deux fils se touchent : le courant devient énorme. La bobine devient un aimant et lance son noyau contre la barre, en quelques millièmes de seconde. Le bilame n’a pas bougé.' },
        { titre: 'L’arc part dans la chambre de coupure', piece: 'chambre', ralenti: true, actions: [['phase', 'arc']],
          vue: { azimut: 60, elevation: 8, zoom: 1.4, cible: [9, -5, 20] }, duree: 7,
          texte: 'Les contacts s’ouvrent sous un courant énorme : un arc jaillit. Il est poussé dans les plaquettes d’acier, découpé, refroidi, et s’éteint.' }
      ],
      /* l'éclaté : la face avant sort vers l'avant ; le pôle phase s'ouvre comme une demi-coquille */
      eclate: [
        { objets: [nez, fente, marquages, manette], vers: [0, 0, 62], debut: 0, fin: 0.45 },
        { objets: [P.barre, P.guide, P.verrou, P.crochet, P.bielle], vers: [0, 0, 30], debut: 0.2, fin: 0.6 },
        { objets: [P.bobine, P.noyau], vers: [34, 14, 0], debut: 0.35, fin: 0.8 },
        { objets: [P.bilame.groupe, P.socleBilame, P.tresse], vers: [34, -14, 0], debut: 0.35, fin: 0.8 },
        { objets: [P.chambre], vers: [26, 0, -4], debut: 0.45, fin: 0.9 },
        { objets: [P.contact.bras, CN.bras, axe, P.ressort], vers: [0, -6, 22], debut: 0.5, fin: 1 }
      ],
      eclateVue: { azimut: 50, elevation: 18, zoom: 0.62, cible: [12, 0, 40] },
      surEclate(on) { eclatee = on; if (on) { tArc = 0; arc.regler(false); arcChambre.regler(false); } majGrains(); },
      agir,
      animer(dt) {
        if (!initialise) { initialise = true; ctx.regler('rearmer', null, { desactive: true }); }
        let actif = false;
        /* la chaleur du bilame : elle monte lentement en surcharge, retombe hors courant */
        const cible = !ferme() ? (pasAPas ? chaleur : 0) : etat === 'surcharge' ? Math.min(1.4, plafond) : 0.12;
        const avant = chaleur;
        if (chaleur < cible) chaleur = Math.min(cible, chaleur + dt * 0.3);
        else chaleur = Math.max(cible, chaleur - dt * 0.12);
        if (Math.abs(chaleur - avant) > 1e-5) actif = true;
        if (pasAPas) {
          /* étapes : la barre avance, mais la serrure attend l'étape suivante */
          if (!declenche && etat === 'surcharge' && courbure() >= SEUIL) barre.cible = 1;
          if (!declenche && etat === 'court' && noyau.x > 8) barre.cible = 1;
        } else {
          if (!declenche && etat === 'surcharge' && ferme() && courbure() >= SEUIL) declencher('thermique');
          if (!declenche && etat === 'court' && noyau.x > 8) declencher('magnetique');
        }
        if (declenche) { tDecl += dt; if (tRetour > 0) { tRetour -= dt; if (tRetour <= 0) { barre.cible = 0; noyau.cible = 0; } } }
        if (ouvert.pas(dt)) actif = true;
        if (noyau.pas(dt)) actif = true;
        if (barre.pas(dt)) actif = true;
        placer();
        /* l'arc : d'abord entre les pastilles, puis poussé dans les plaquettes */
        if (tArc > 0) {
          tArc -= dt;
          const auxPastilles = tArc0 - tArc < 0.2;
          if (auxPastilles) arc.placer(new T.Vector3(XL, 0.4, 20), new T.Vector3(...P.contact.bout(P.contact.bras.rotation.x)));
          arc.regler(tArc > 0 && auxPastilles); arcChambre.regler(tArc > 0 && !auxPastilles);
        }
        if (arc.animer(dt)) actif = true;
        if (arcChambre.animer(dt)) actif = true;
        grains.forEach(g => { if (g.animer(dt)) actif = true; });
        if (etat === 'surcharge' && !declenche) majMesures();
        return actif || tArc > 0;
      }
    };
  }, { famille: 'protection', titre: 'Le disjoncteur magnéto-thermique', stations: ['4.3'] });

  /* ================================================================ le disjoncteur moteur (4.4)
     Trois pôles protégés : un bilame ET une bobine par phase, une molette qui règle le
     thermique sur l'intensité de la plaque du moteur, une manette rotative O / I / Trip. */
  Electro3D.definir('disjoncteurMoteur', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const L = 45, XS = [-15, 0, 15], COUL = ['L1', 'L2', 'L3'], ZF = 52, ZA = 80;

    const rail = K.railDIN(80); racine.add(rail);
    const socle = K.mesh(K.boite(L, 89, ZF, 2.2), M.plastique, 0, 0, ZF / 2);
    const avant = K.mesh(K.boite(L, 60, ZA - ZF + 1, 3), M.plastique, 0, 0, (ZF + ZA - 1) / 2);
    const griffe = K.mesh(K.boite(14, 6, 5, 1), M.plastiqueSombre, 0, -43.5, 2.5);
    racine.add(socle, avant, griffe);

    /* marquages réels : repères de bornes, O / I / Trip, graduations de la molette */
    const marquages = new T.Group();
    const grave = (t, h, x, y, z) => { const m = K.gravure(t, h, { couleur: '#2b3138' }); m.position.set(x, y, z); marquages.add(m); return m; };
    ['1/L1', '3/L2', '5/L3'].forEach((t, i) => grave(t, 2.6, XS[i], 26.5, ZF + 0.05));
    ['2/T1', '4/T2', '6/T3'].forEach((t, i) => grave(t, 2.6, XS[i], -26.5, ZF + 0.05));
    grave('I', 3.2, 0, 25.2, ZA + 0.05); grave('O', 3.2, -17.5, 8, ZA + 0.05); grave('Trip', 2.5, -13.5, 21.5, ZA + 0.05);
    const XM = 11, YM = -18;
    const angleReglage = v => (210 - (v - 6) / 4 * 240) * K.D2R;
    [6, 7, 8, 9, 10].forEach(v => { const a = angleReglage(v); grave(String(v), 2.5, XM + Math.cos(a) * 9.6, YM + Math.sin(a) * 9.6, ZA + 0.05); });
    grave('A', 2.5, XM + 9.5, YM - 8.5, ZA + 0.05);
    racine.add(marquages);

    const bornes = new T.Group();
    XS.forEach(x => { bornes.add(K.cageModulaire(x, 33, 1, ZF, 44.5)); bornes.add(K.cageModulaire(x, -33, -1, ZF, 44.5)); });
    racine.add(bornes);

    /* trois pôles protégés, chacun son bilame et sa bobine */
    const poles = XS.map(x => polePhase(T, K, x));
    const gBobines = new T.Group(), gBilames = new T.Group(), gMeca = new T.Group(), gContacts = new T.Group(), gChambres = new T.Group(), gCuivre = new T.Group();
    poles.forEach(P => {
      gBobines.add(P.bobine, P.noyau);
      gBilames.add(P.bilame.groupe, P.socleBilame, P.tresse);
      gMeca.add(P.barre, P.guide, P.verrou, P.ressort);
      gContacts.add(P.contact.fixe, P.contact.bras);
      gChambres.add(P.chambre); gCuivre.add(P.conducteurs);
    });
    const axe = K.mesh(K.cylindre(1.2, 40, 16), M.acier, 0, PIVOT[0], PIVOT[1]); axe.rotation.z = Math.PI / 2;
    /* la barre commune : elle relie les trois verrous, un seul pôle suffit à tout ouvrir */
    const barreCommune = K.mesh(K.boite(38, 3, 3, 0.6), M.plastiqueMarine, 0, 29, 46);
    gMeca.add(axe, barreCommune);
    racine.add(gBobines, gBilames, gMeca, gContacts, gChambres, gCuivre);

    /* la manette rotative et son arbre */
    const manette = new T.Group(); manette.position.set(0, 8, ZA);
    const disque = K.mesh(K.cylindre(12.5, 2.4, 40), M.plastiqueNoir, 0, 0, 1.2); disque.rotation.x = Math.PI / 2;
    const poignee = K.mesh(K.boite(8, 25, 9, 2.4), M.plastiqueMarine, 0, 0, 6.5);
    const repereM = K.mesh(K.boite(1.6, 8, 0.6, 0.2), M.plastiqueBlanc, 0, 7.5, 11.1);
    const arbre = K.mesh(K.cylindre(2.5, ZA - 47, 16), M.plastiqueSombre, 0, 0, -(ZA - 47) / 2); arbre.rotation.x = Math.PI / 2;
    manette.add(disque, poignee, repereM, arbre);
    racine.add(manette);

    /* la molette de réglage du thermique, et la came qu'elle déplace */
    const molette = new T.Group(); molette.position.set(XM, YM, ZA);
    const corpsM = K.mesh(K.cylindre(5.5, 2.2, 32), M.plastiqueBlanc, 0, 0, 1); corpsM.rotation.x = Math.PI / 2;
    const fenteM = K.mesh(new T.BoxGeometry(1, 7, 0.8), M.sombre, 0, 0, 2.2);
    const fleche = K.mesh(new T.BoxGeometry(1.2, 3, 0.6), M.plastiqueOrange, 0, 3.6, 2.3);
    molette.add(corpsM, fenteM, fleche);
    const came = K.mesh(K.boite(6, 4, 10, 0.8), M.plastiqueMarine, XM, YM + 6, 47);
    const tigeM = K.mesh(K.cylindre(1.2, ZA - 52, 12), M.acier, XM, YM, (ZA + 52) / 2); tigeM.rotation.x = Math.PI / 2;
    const reglage = new T.Group(); reglage.add(molette, came, tigeM);
    racine.add(reglage);

    /* les fils : trois phases en haut (réseau), trois en bas (vers le moteur) */
    const fils = new T.Group(), fh = [], fb = [];
    XS.forEach((x, i) => {
      const h = K.fil([[x, 80, 22], [x, 68, 30], [x, 54, 33], [x, 39, 33]], 1.6, COUL[i]);
      const b = K.fil([[x, -39, 33], [x, -54, 33], [x, -68, 30], [x, -80, 22]], 1.6, COUL[i]);
      fils.add(h.mesh, b.mesh); fh.push(h); fb.push(b);
    });
    racine.add(fils);
    const grains = XS.map((x, i) => {
      const c = K.chemin([fh[i].courbe, [x, 33, 33], [x, 28, 31], [x, 24.4, 29],
        ...helice(T, x, 18, 6.4, 29, 15, Math.PI / 2, 3.5), [x, 6, 15], [x, 2.2, 18], [x, 0.8, 20], [x, -1, 20],
        [x, -10, 28], [x, -11, 32], [x, -12, 36.2], [x, -30, 36.2], [x, -33, 33.5], fb[i].courbe]);
      const g = K.courant(c, { pas: 6, rayon: 1, vitesse: 30 });
      g.regler({ debit: 1, alternatif: true, frequence: 0.7 }); racine.add(g.objet); return g;
    });
    const arcs = XS.map(x => {
      const a = K.arc(new T.Vector3(x, -2.5, 14.6), new T.Vector3(x, -15, 14.1), { rayon: 0.5, halo: 0.8 });
      racine.add(a.objet); return a;
    });

    /* ---------------------------------------------------------------- l'état */
    const IN = 8;                                  /* intensité de la plaque du moteur */
    const ouvert = K.mobile(0, 420, 22), noyau = K.mobile(0, 1600, 45), barre = K.mobile(0, 900, 32);
    const tourne = K.mobile(0, 260, 20);           /* angle de la manette : 0 = I, 0,6 = Trip, 1,57 = O */
    const regl = K.mobile(8, 120, 22);             /* la molette, en ampères */
    let etat = 'repos', Ir = 8, chaleur = 0.6, declenche = false, cause = '', tArc = 0, tRetour = 0, tO = 0;
    let pasAPas = false, plafond = 9, eclatee = false, initialise = false;
    const SEUIL = 0.38;
    const courbure = () => K.clamp(1.9 * (chaleur - 0.55), 0, 0.62);
    const ferme = () => !declenche && ouvert.x < 0.5;
    const courant = () => !ferme() ? 0 : etat === 'surcharge' ? 10.4 : etat === 'court' ? 1000 : IN;

    const placer = () => {
      const a = OUVERTURE * K.clamp(ouvert.x, -0.1, 1.05);
      poles.forEach(P => {
        P.contact.bras.rotation.x = a;
        P.noyau.position.z = 22.5 + noyau.x;
        P.barre.position.z = 41.8 + 3.5 * barre.x;
        P.verrou.rotation.x = -0.5 * barre.x;
        P.ressort.longueur(Math.max(4, PIVOT[0] + tourner(4.5, -4, a)[0] + 22));
        P.bilame.plier(courbure());
        P.bilame.chauffer(K.clamp((chaleur - 0.55) * 4, 0, 1.5));
      });
      barreCommune.position.z = 46 + 1.5 * barre.x;
      manette.rotation.z = tourne.x;
      molette.rotation.z = angleReglage(regl.x) - Math.PI / 2;
      came.position.y = YM + 6 + (regl.x - 8) * 0.9;
    };

    let dern = '';
    const majMesures = () => {
      const I = courant();
      let temps = 'jamais : courant normal';
      if (declenche) temps = cause === 'magnetique' ? 'moins de 10 ms' : 'déclenché';
      else if (etat === 'court') temps = 'moins de 10 ms';
      else if (I / Ir > 1.12) temps = 'quelques secondes (accéléré)';
      else if (I > IN) temps = 'jamais : réglé trop haut';
      const liste = [
        { libelle: 'Courant du moteur (plaque : 8 A)', valeur: I >= 1000 ? '≈ 1 000 A' : String(I).replace('.', ',') + ' A' },
        { libelle: 'Molette réglée sur', valeur: String(Ir).replace('.', ',') + ' A' },
        { libelle: 'Temps avant déclenchement', valeur: temps }
      ];
      const k = JSON.stringify(liste); if (k !== dern) { dern = k; ctx.mesures(liste); }
    };
    const majGrains = () => grains.forEach(g => g.regler({ debit: ferme() && !eclatee ? 1 : 0, vitesse: etat === 'surcharge' ? 42 : etat === 'court' ? 120 : 30 }));

    const PHRASES = {
      repos: '<strong>Au repos.</strong> Le moteur tire 8 A, l’intensité de sa plaque ; la molette est réglée sur 8 A. Les bilames tiédissent et restent droits.',
      surcharge: '<strong>Surcharge.</strong> Le moteur force : 10,4 A au lieu de 8. Les trois bilames chauffent et se courbent <em>lentement</em> vers la barre.',
      thermique: '<strong>Déclenché par les bilames.</strong> Ils ont poussé la barre : la serrure lâche, la manette tourne sur <em>Trip</em>, les trois pôles s’ouvrent ensemble. Temps accéléré : en vrai, des secondes ou des minutes.',
      magnetique: '<strong>Court-circuit.</strong> Le courant devient énorme : les bobines lancent leurs noyaux <em>instantanément</em>, la manette tourne sur <em>Trip</em>, l’arc s’éteint dans les chambres de coupure.',
      haut: '<strong>Réglé trop haut.</strong> Avec la molette au-dessus de l’intensité de la plaque, la surcharge ne fait plus déclencher : le moteur n’est plus protégé.',
      bas: '<strong>Réglé trop bas.</strong> La molette est sous l’intensité de la plaque : il déclenchera sans défaut. On règle sur la plaque, ni plus ni moins.',
      rearme: '<strong>Réarmé.</strong> On tourne la manette sur O, puis sur I : la serrure s’accroche de nouveau. Avant, on cherche pourquoi il a déclenché.'
    };

    const declencher = (c, muet) => {
      if (declenche) return;
      declenche = true; cause = c;
      barre.cible = 1; ouvert.cible = 1; tourne.cible = 0.6; tArc = 0.42; tRetour = pasAPas ? 0 : 0.45;
      majGrains(); majMesures();
      if (!muet) ctx.dire(PHRASES[c]);
      ctx.regler('rearmer', null, { desactive: false });
    };
    const remettre = (e, ch) => {
      declenche = false; cause = ''; ouvert.cible = 0; barre.cible = 0; noyau.cible = 0; tourne.cible = 0;
      tArc = 0; arcs.forEach(a => a.regler(false)); etat = e; if (ch !== undefined) chaleur = ch;
      ctx.regler('rearmer', null, { desactive: true });
    };
    const phrase = () => {
      if (etat === 'court') return PHRASES.magnetique;
      if (Ir < IN) return PHRASES.bas;
      if (etat === 'surcharge' && 10.4 / Ir <= 1.12) return PHRASES.haut;
      return PHRASES[etat];
    };
    const phase = v => {
      pasAPas = true; plafond = 9;
      const regler = a => { Ir = a; regl.cible = a; ctx.regler('reglage', a); };
      if (v === 'repos') { remettre('repos', 0.6); regler(8); }
      if (v === 'molette') { remettre('repos', 0.6); regl.x = 10; regler(8); }
      if (v === 'chauffe') { remettre('surcharge', 0.6); regler(8); plafond = 0.72; }
      if (v === 'pousse') { remettre('surcharge', Math.max(chaleur, 0.72)); regler(8); plafond = 0.9; }
      if (v === 'ouvre') { if (declenche) remettre('surcharge', 0.9); etat = 'surcharge'; chaleur = Math.max(chaleur, 0.9); declencher('thermique', true); }
      if (v === 'court') { remettre('court', 0.6); noyau.x = 10; noyau.cible = 10; declencher('magnetique', true); tArc = 2.6; }
      ctx.regler('etat', etat); majGrains(); majMesures();
    };

    const agir = (id, v) => {
      if (id === 'focus') { voir(v); return; }
      if (id === 'phase') { phase(v); return; }
      voir('tout');
      pasAPas = false; plafond = 9;
      if (id === 'reglage') { Ir = v; regl.cible = v; majMesures(); if (!declenche) ctx.dire(phrase()); return; }
      if (id === 'rearmer') {
        if (!declenche) return;
        remettre('repos'); chaleur = Math.min(chaleur, 0.62); tourne.cible = 1.57; tO = 0.5;
        ctx.regler('etat', 'repos'); majGrains(); majMesures(); ctx.dire(PHRASES.rearme); return;
      }
      if (id !== 'etat') return;
      if (declenche) { remettre(v); chaleur = Math.min(chaleur, 0.62); }
      etat = v; noyau.cible = v === 'court' ? 10 : 0;
      majGrains(); majMesures(); ctx.dire(phrase());
    };

    /* focus des étapes : la manette, la molette et leurs arbres traversent la vue de côté */
    const voir = focus({ meca: [manette, reglage] });

    placer(); majMesures();

    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: 24, elevation: 14, cadre: [socle, avant], marge: 1.1 }
                                    : { azimut: 62, elevation: 14, cadre: [socle, avant], marge: 1.06 },
      fond: 'platine',
      fantome: [socle, avant, griffe],
      phrase: PHRASES.repos,
      pieces: [
        { id: 'boitier', nom: 'Le boîtier (45 mm)', objets: [socle, avant, griffe], desc: 'Trois pôles dans un boîtier de 45 mm, clipsé sur le rail. « Voir dedans » le rend transparent.' },
        { id: 'manette', nom: 'La manette O / I / Trip', objets: [manette], desc: 'Tournée sur I : le moteur est alimenté. Quand il déclenche, elle tourne seule sur Trip. Pour réarmer : O, puis I.' },
        { id: 'molette', nom: 'La molette de réglage (A)', objets: [reglage], desc: 'Graduée en ampères. On la règle sur l’intensité écrite sur la plaque du moteur : ni plus, ni moins.' },
        { id: 'bornes', nom: 'Les bornes', objets: [bornes], desc: '1/L1, 3/L2, 5/L3 en haut : le réseau. 2/T1, 4/T2, 6/T3 en bas : vers le moteur.' },
        { id: 'bilames', nom: 'Les trois bilames', objets: [gBilames], desc: 'Un par phase. Ils chauffent avec le courant du moteur et se courbent : c’est la protection contre la surcharge.' },
        { id: 'bobines', nom: 'Les trois bobines', objets: [gBobines], desc: 'Une par phase. En court-circuit, elles lancent leur noyau : instantané. Calées haut pour laisser passer le démarrage.' },
        { id: 'meca', nom: 'Les barres et la serrure', objets: [gMeca], desc: 'Un seul pôle qui pousse sa barre suffit : la barre commune fait ouvrir les trois pôles ensemble.' },
        { id: 'contacts', nom: 'Les contacts', objets: [gContacts], desc: 'Trois contacts mobiles sur un même axe : ils s’ouvrent ensemble.' },
        { id: 'chambres', nom: 'Les chambres de coupure', objets: [gChambres], desc: 'Des plaquettes d’acier où l’arc est découpé et s’éteint.' },
        { id: 'cuivre', nom: 'Les conducteurs internes', objets: [gCuivre], desc: 'Dans chaque pôle, le courant passe par la bobine, les contacts, puis le bilame.' },
        { id: 'rail', nom: 'Le rail DIN', objets: [rail], desc: 'Le disjoncteur moteur s’y clipse, en tête du départ moteur.' }
      ],
      commandes: [
        { id: 'etat', type: 'choix', options: [['repos', 'Au repos'], ['surcharge', 'Surcharge'], ['court', 'Court-circuit']], valeur: 'repos' },
        { id: 'reglage', type: 'curseur', libelle: 'La molette de réglage', min: 6, max: 10, pas: 0.5, unite: 'A', valeur: 8 },
        { id: 'rearmer', type: 'action', libelle: 'Réarmer', accent: true }
      ],
      etapes: [
        { titre: 'Au repos', piece: 'cuivre', voirDedans: true, actions: [['focus', 'tout'], ['phase', 'repos']],
          vue: { azimut: 50, elevation: 14, zoom: 1.0 },
          texte: 'Le courant du moteur traverse les trois pôles : bobine, contacts, bilame. 8 A, l’intensité de la plaque. Rien ne bouge.' },
        { titre: 'On règle la molette sur la plaque', piece: 'molette', voirDedans: false, actions: [['focus', 'tout'], ['phase', 'molette']],
          vue: { azimut: 8, elevation: 8, zoom: 1.5, cible: [6, -8, 80] },
          texte: 'La plaque du moteur dit 8 A : on tourne la molette sur 8. Elle déplace la came, donc le point où les bilames feront déclencher.' },
        { titre: 'Surcharge : les bilames chauffent et se courbent', voirDedans: true, actions: [['focus', 'meca'], ['phase', 'chauffe']],
          vue: { azimut: 52, elevation: 8, zoom: 1.6, cible: [5, -16, 38] }, duree: 7,
          texte: 'Le moteur force et tire 10,4 A. Les trois bilames rougissent et se courbent lentement vers leur barre.' },
        { titre: 'Les bilames poussent la barre', piece: 'meca', actions: [['focus', 'meca'], ['phase', 'pousse']],
          vue: { azimut: 52, elevation: 12, zoom: 1.12, cible: [6, 0, 40] },
          texte: 'Assez courbés, les bilames touchent la barre et la poussent vers l’avant. La barre commune bascule les verrous de la serrure.' },
        { titre: 'La serrure lâche : la manette tourne sur Trip', piece: 'manette', ralenti: true, actions: [['focus', 'tout'], ['phase', 'ouvre']],
          vue: { azimut: 36, elevation: 14, zoom: 1.0 }, duree: 7,
          texte: 'Les trois contacts s’ouvrent ensemble et la manette tourne seule sur Trip. Le moteur s’arrête.' },
        { titre: 'Court-circuit : les bobines frappent', piece: 'bobines', ralenti: true, actions: [['focus', 'meca'], ['phase', 'court']],
          vue: { azimut: 56, elevation: 10, zoom: 1.25, cible: [8, 2, 26] }, duree: 7,
          texte: 'On a réarmé. Un court-circuit : le courant devient énorme. Les bobines lancent leurs noyaux, les contacts s’ouvrent en quelques millièmes de seconde, l’arc part dans les chambres de coupure.' }
      ],
      eclate: [
        { objets: [avant, marquages, manette, reglage], vers: [0, 0, 70], debut: 0, fin: 0.5 },
        { objets: [socle, griffe, rail], vers: [0, 0, -70], debut: 0.2, fin: 0.7 },
        { objets: [gBobines], vers: [0, 26, 0], debut: 0.5, fin: 1 },
        { objets: [gBilames], vers: [0, -22, 6], debut: 0.5, fin: 1 },
        { objets: [gMeca], vers: [0, 0, 22], debut: 0.4, fin: 0.9 }
      ],
      eclateVue: { azimut: 52, elevation: 16, zoom: 0.6, cible: [0, 0, 30] },
      surEclate(on) { eclatee = on; if (on) { voir('tout'); tArc = 0; arcs.forEach(a => a.regler(false)); } majGrains(); },
      agir,
      animer(dt) {
        if (!initialise) { initialise = true; ctx.regler('rearmer', null, { desactive: true }); }
        let actif = false;
        const r = courant() / Ir;
        const cible = !ferme() ? (pasAPas ? chaleur : 0.3) : Math.min(etat === 'court' ? chaleur : 0.6 * r * r, plafond, 1.4);
        const avant0 = chaleur;
        if (chaleur < cible) chaleur = Math.min(cible, chaleur + dt * 0.08);
        else chaleur = Math.max(cible, chaleur - dt * 0.06);
        if (Math.abs(chaleur - avant0) > 1e-5) actif = true;
        if (pasAPas) {
          if (!declenche && courbure() >= SEUIL) barre.cible = 1;
        } else {
          if (!declenche && ferme() && courbure() >= SEUIL) declencher('thermique');
          if (!declenche && etat === 'court' && noyau.x > 8) declencher('magnetique');
        }
        if (tRetour > 0) { tRetour -= dt; if (tRetour <= 0) { barre.cible = 0; noyau.cible = 0; } }
        if (tO > 0) { tO -= dt; if (tO <= 0) tourne.cible = 0; }
        [ouvert, noyau, barre, tourne, regl].forEach(m => { if (m.pas(dt)) actif = true; });
        placer();
        if (tArc > 0) { tArc -= dt; arcs.forEach(a => a.regler(tArc > 0 && !eclatee)); }
        arcs.forEach(a => { if (a.animer(dt)) actif = true; });
        grains.forEach(g => { if (g.animer(dt)) actif = true; });
        if (!declenche) majMesures();
        return actif || tArc > 0 || tO > 0;
      }
    };
  }, { famille: 'protection', titre: 'Le disjoncteur moteur', stations: ['4.4'] });

  /* ================================================================ le relais thermique (4.7)
     Vu de face, boîtier fantôme : trois bilames (un par phase) se courbent vers la droite,
     poussent la réglette, qui fait basculer le levier : 95-96 s'ouvre, 97-98 se ferme.
     Le relais ne coupe pas la puissance : c'est le contacteur qui retombe. */
  Electro3D.definir('relaisThermique', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const XS = [-8.5, 0, 8.5], COUL = ['L1', 'L2', 'L3'], ZA = 70;
    const GAP = 2, COURSE = 3, ZB = 40;            /* jeu bilame → dent, course de la réglette */
    const LB = 22.5;                               /* longueur des bilames : la réglette passe SOUS les contacts */

    const socle = K.mesh(K.boite(45, 66, 46, 2), M.plastique, 0, 0, 23);
    const capot = K.mesh(K.boite(45, 66, 25, 2.5), M.plastique, 0, 0, 57.5);
    racine.add(socle, capot);

    /* les trois broches de puissance : elles entrent dans les bornes 2, 4, 6 du contacteur */
    const broches = new T.Group();
    XS.forEach(x => {
      const b = K.mesh(K.cylindre(2.2, 16, 20), M.cuivre, x, 40, 48); broches.add(b);
      broches.add(K.mesh(K.boite(7, 3, 8, 0.8), M.plastiqueSombre, x, 34, 48));
    });
    racine.add(broches);

    /* marquages réels */
    const marquages = new T.Group();
    const grave = (t, h, x, y, z) => { const m = K.gravure(t, h, { couleur: '#2b3138' }); m.position.set(x, y, z); marquages.add(m); return m; };
    const XAUX = { 97: 3, 98: 9.5, 95: 16, 96: 22.5 - 1 };
    Object.keys(XAUX).forEach(k => grave(k, 2.3, XAUX[k], 21.2, ZA + 0.05));
    ['2/T1', '4/T2', '6/T3'].forEach((t, i) => grave(t, 2.3, XS[i] * 1.6, -30, ZA + 0.05));
    const XM = -11, YM = 4;
    const angleReglage = v => (210 - (v - 7) / 3 * 240) * K.D2R;
    [7, 8, 9, 10].forEach(v => { const a = angleReglage(v); grave(String(v), 2.4, XM + Math.cos(a) * 10.2, YM + Math.sin(a) * 10.2, ZA + 0.05); });
    grave('A', 2.4, XM + 8.5, YM - 9, ZA + 0.05);
    grave('Reset', 2.2, 11, 10.5, ZA + 0.05);
    racine.add(marquages);

    /* les bornes : puissance en bas (vers le moteur), contacts 95-96 / 97-98 en haut à droite */
    const bornes = new T.Group(), bornesAux = new T.Group();
    XS.forEach(x => bornes.add(K.cageModulaire(x * 1.6, -24, -1, ZA, 33, 60)));
    Object.keys(XAUX).forEach(k => bornesAux.add(K.cageModulaire(XAUX[k], 27, 1, ZA, 33, 62, 0.62)));
    racine.add(bornes, bornesAux);

    /* les trois bilames, dressés, qui se courbent vers +X ; derrière chacun, l'élément chauffant */
    const bilames = [], gBilames = new T.Group(), gChauffe = new T.Group();
    const matChauffe = K.propre(M.cuivre);
    XS.forEach(x => {
      const porte = new T.Group(); porte.rotation.y = Math.PI / 2;   /* (x, y, z) local → (z, y, -x) */
      const b = bilame(T, K, { x: -ZB, y0: -10, z0: x, longueur: LB, largeur: 5, n: 9, sens: 1 });
      porte.add(b.groupe); gBilames.add(porte); bilames.push(b);
      gBilames.add(K.mesh(K.boite(6, 3, 7, 0.5), M.plastiqueSombre, x, -11.5, ZB));
      gChauffe.add(K.mesh(new T.BoxGeometry(3, LB + 0.5, 1), matChauffe, x, LB / 2 - 9.75, 35.6));
      gChauffe.add(K.fil([[x, 33, 48], [x, 27, 40], [x, LB - 9.5, 35.6]], 0.9, M.cuivre).mesh);
      gChauffe.add(K.fil([[x, -10, 35.6], [x, -16, 46], [x * 1.6, -24, 56]], 0.9, M.cuivre).mesh);
    });
    racine.add(gBilames, gChauffe);

    /* la réglette : une barre à trois dents, que les bilames poussent vers la droite ;
       son bout droit pousse le bras vertical du levier */
    const reglette = new T.Group();
    const YR = 15;                                 /* hauteur de la barre, sous le bloc de contacts */
    reglette.add(K.mesh(K.boite(32.6, 3.2, 3, 0.5), M.plastiqueMarine, 2.3, YR, 39));
    XS.forEach(x => reglette.add(K.mesh(K.boite(1.6, 5, 3, 0.3), M.plastiqueMarine, x + 1.1 + GAP + 0.8, YR - 3.5, 39)));
    racine.add(reglette);

    /* le levier : une équerre pleine qui pivote sur son axe ; la réglette pousse son bras
       vertical, son bras horizontal appuie sur le poussoir des contacts */
    const levier = new T.Group(); levier.position.set(21, 27.5, 40.5);
    const fL = new T.Shape();
    fL.moveTo(1.2, 1.4); fL.lineTo(-7.6, 1.4); fL.lineTo(-7.6, -1.3); fL.lineTo(-3.2, -1.3);
    fL.lineTo(-1.4, -3.1); fL.lineTo(-1.4, -13.5); fL.lineTo(1.2, -13.5); fL.closePath();
    levier.add(K.mesh(K.extrusion(fL, 2.6, 0.25), M.plastiqueMarine));
    const axeL = K.mesh(K.cylindre(1.1, 5.2, 16), M.acier); axeL.rotation.x = Math.PI / 2; levier.add(axeL);
    racine.add(levier);

    /* le bloc de contacts, à droite des bilames : 95-96 (NF) en haut, 97-98 (NO) en bas.
       Le poussoir porte le pont NF ; il pousse le pont NO en fin de course. */
    const fixes = new T.Group(), filsAux = new T.Group();
    const XC = [10.75, 18.25], XP = (XC[0] + XC[1]) / 2, YNF = 25, YNO = 17.7, ZC = 44;
    const pastille = (x, y, dessous) => {
      fixes.add(K.mesh(K.boite(2.6, 1.2, 2.8, 0.2), M.cuivre, x, y, ZC));
      fixes.add(K.mesh(new T.BoxGeometry(2.4, 0.5, 2.2), M.argent, x, y + (dessous ? -0.85 : 0.85), ZC));
    };
    XC.forEach(x => { pastille(x, YNF, true); pastille(x, YNO, false); });
    [[XC[0], YNF, 16], [XC[1], YNF, 21.5], [XC[0], YNO, 3], [XC[1], YNO, 9.5]].forEach(([x, y, xb]) =>
      filsAux.add(K.fil([[x, y, ZC - 1], [x, y + 1.5, 52], [xb, 27, 58]], 0.45, M.cuivre).mesh));
    const poussoir = new T.Group();
    poussoir.add(K.mesh(K.boite(2.4, 7.5, 4.6, 0.4), M.plastiqueMarine, XP, 22.25, 43.5));
    const pontNF = K.mesh(K.boite(10, 1.2, 2.8, 0.2), M.cuivre, XP, 23.3, ZC);
    poussoir.add(pontNF);
    const pontNO = K.mesh(K.boite(10, 1.2, 2.8, 0.2), M.cuivre, XP, 20.6, ZC);
    racine.add(fixes, filsAux, poussoir, pontNO);
    const ressortP = K.ressort(1, 7.5, 5, 0.22, M.acier); ressortP.position.set(XP, 11, 43.5);
    racine.add(ressortP);

    /* la molette de réglage et sa came */
    const molette = new T.Group(); molette.position.set(XM, YM, ZA);
    const corpsM = K.mesh(K.cylindre(7, 2.4, 32), M.plastiqueBleu, 0, 0, 1.1); corpsM.rotation.x = Math.PI / 2;
    molette.add(corpsM, K.mesh(new T.BoxGeometry(1.2, 9, 0.8), M.sombre, 0, 0, 2.4), K.mesh(new T.BoxGeometry(1.4, 3.4, 0.7), M.plastiqueBlanc, 0, 4.8, 2.5));
    const came = K.mesh(K.cylindre(5, 3, 24), M.plastiqueMarine, XM, YM, 50); came.rotation.x = Math.PI / 2;
    const tigeM = K.mesh(K.cylindre(1.2, ZA - 50, 12), M.acier, XM, YM, (ZA + 50) / 2); tigeM.rotation.x = Math.PI / 2;
    const reglage = K.groupe(molette, came, tigeM);
    racine.add(reglage);

    /* le bouton de réarmement bleu et le témoin de déclenchement */
    const bouton = K.mesh(K.cylindre(4.2, 5, 28), M.plastiqueBleu, 11, 4, ZA + 1); bouton.rotation.x = Math.PI / 2;
    const fenetre = K.mesh(K.boite(7, 4, 0.8, 0.3), M.sombre, 11, -8, ZA - 0.2);
    const temoin = K.mesh(K.boite(5.4, 3, 1.4, 0.3), M.plastiqueOrange, 11, -12, ZA - 1.2);
    racine.add(bouton, fenetre, temoin);

    /* les fils : moteur en bas ; commande (95-96) et signalisation (97-98) en haut, rouges */
    const fils = new T.Group();
    const fm = XS.map((x, i) => { const f = K.fil([[x * 1.6, -36, 60], [x * 1.6, -50, 58], [x * 1.6, -64, 48]], 1.6, COUL[i]); fils.add(f.mesh); return f; });
    const fa = {}, filsCmd = new T.Group();
    Object.keys(XAUX).forEach(k => { const x = XAUX[k]; fa[k] = K.fil([[x, 36, 62], [x, 46, 62], [x + 2, 58, 54]], 0.9, 'rouge'); filsCmd.add(fa[k].mesh); });
    racine.add(fils, filsCmd);

    const grains = XS.map((x, i) => {
      const c = K.chemin([[x, 48, 48], [x, 33, 48], [x, 27, 40], [x, LB - 9.5, 35.6], [x, -10, 35.6], [x, -16, 46], [x * 1.6, -24, 56], [x * 1.6, -24, 60], fm[i].courbe]);
      const g = K.courant(c, { pas: 5.5, rayon: 0.95, vitesse: 26 }); g.regler({ debit: 1, alternatif: true, frequence: 0.7 }); racine.add(g.objet); return g;
    });
    const circuit = (a, b, y, xa, xb) => K.chemin([K.inverse(fa[a]), [XAUX[a], 27, 58], [xa, y + 1.5, 52], [xa, y, ZC], [xb, y, ZC], [xb, y + 1.5, 52], [XAUX[b], 27, 58], fa[b].courbe]);
    const grNF = K.courant(circuit(95, 96, YNF - 1.1, XC[0], XC[1]), { pas: 4.5, rayon: 0.6, vitesse: 20 });
    const grNO = K.courant(circuit(97, 98, YNO + 1.1, XC[0], XC[1]), { pas: 4.5, rayon: 0.6, vitesse: 20 });
    const grAux = new T.Group();     /* une enveloppe : le focus des étapes peut les cacher */
    [grNF, grNO].forEach(g => { g.regler({ debit: 0, alternatif: true, frequence: 0.7 }); grAux.add(g.objet); });
    racine.add(grAux);

    /* ---------------------------------------------------------------- l'état */
    const IN = 8;
    let etat = 'repos', Ir = 8, chaleur = 0.6, verrou = false, moteur = true, pasAPas = false, plafond = 9, eclatee = false;
    const regl = K.mobile(8, 120, 22), appui = K.mobile(0, 500, 26);
    let reg = 0, phi = 0, d = 0, tAppui = 0;
    const theta = () => K.clamp(1.35 * (chaleur - 0.55), 0, 0.45);
    /* au déclenchement, le levier « claque » : le poussoir descend d'un coup de 2,5 mm */
    const D_VERROU = 2.5, REG_DECLIC = 2.7;

    const placer = () => {
      bilames.forEach(b => { b.plier(theta()); b.chauffer(K.clamp((chaleur - 0.55) * 4, 0, 1.5)); });
      K.chaleur(matChauffe, K.clamp((chaleur - 0.5) * 3, 0, 1.2));
      const defl = bilames[2].bout()[2] - XS[2];
      reg = K.clamp(defl - GAP, 0, COURSE);
      /* la réglette touche le bras vertical à 12,5 mm sous l'axe, après 0,75 mm de jeu ;
         le bras horizontal appuie sur le poussoir à 6,5 mm de l'axe */
      phi = Math.asin(K.clamp((reg - 0.75) / 12.5, 0, 0.6));
      d = 6.5 * Math.sin(phi);
      if (verrou) { d = Math.max(d, D_VERROU); phi = Math.max(phi, Math.asin(D_VERROU / 6.5)); }
      reglette.position.x = reg;
      levier.rotation.z = phi;
      poussoir.position.y = -d;
      pontNO.position.y = 20.6 - K.clamp(d - 1.2, 0, 1.2);
      ressortP.longueur(Math.max(1.5, 7.5 - d));
      temoin.position.y = verrou ? -8 : -12;
      bouton.position.z = ZA + 1 - 2 * appui.x;
      molette.rotation.z = angleReglage(regl.x) - Math.PI / 2;
      came.rotation.z = molette.rotation.z;
    };
    const nfFerme = () => d < 0.5;
    const noFerme = () => d >= 2.4;

    let dern = '';
    const majMesures = () => {
      const I = moteur ? (etat === 'surcharge' ? 10.4 : IN) : 0;
      const liste = [
        { libelle: 'Courant du moteur (plaque : 8 A)', valeur: String(I).replace('.', ',') + ' A' },
        { libelle: 'Contact 95-96', valeur: nfFerme() ? 'fermé' : 'ouvert' },
        { libelle: 'Contact 97-98', valeur: noFerme() ? 'fermé' : 'ouvert' }
      ];
      const k = JSON.stringify(liste); if (k !== dern) { dern = k; ctx.mesures(liste); }
    };
    const majGrains = () => {
      grains.forEach(g => g.regler({ debit: moteur && !eclatee ? 1 : 0, vitesse: etat === 'surcharge' ? 36 : 26 }));
      grNF.regler({ debit: nfFerme() && !eclatee ? 1 : 0 });
      grNO.regler({ debit: noFerme() && !eclatee ? 1 : 0 });
    };

    const PHRASES = {
      repos: '<strong>Au repos.</strong> Le courant du moteur traverse les trois bilames : ils tiédissent et restent droits. Le contact 95-96 est fermé : la bobine du contacteur reste alimentée.',
      surcharge: '<strong>En surcharge.</strong> Le moteur force : 10,4 A au lieu de 8. Les bilames chauffent et se courbent <em>lentement</em> ; ils poussent la réglette.',
      declenche: '<strong>Déclenché.</strong> La réglette a fait basculer le levier : 95-96 s’ouvre, 97-98 se ferme. La bobine du contacteur retombe — et c’est le contacteur qui coupe le moteur, pas le relais.',
      froid: '<strong>Pas encore.</strong> Les bilames sont encore chauds : on attend qu’ils refroidissent avant de réarmer.',
      rearme: '<strong>Réarmé.</strong> On appuie sur le bouton bleu : 95-96 se referme. Avant, on cherche pourquoi le moteur a forcé.',
      haut: '<strong>Réglé trop haut.</strong> La molette est au-dessus de l’intensité de la plaque : la surcharge ne le fait plus déclencher.',
      bas: '<strong>Réglé trop bas.</strong> La molette est sous l’intensité de la plaque : il déclenchera sans défaut.'
    };
    const phrase = () => Ir < IN ? PHRASES.bas : (etat === 'surcharge' && 10.4 / Ir < 1.2) ? PHRASES.haut : PHRASES[etat];

    const rearmer = () => {
      appui.cible = 1; tAppui = 0.35;
      if (theta() * LB / 2 > GAP + 1.5 && !pasAPas) { ctx.dire(PHRASES.froid); return false; }
      verrou = false; moteur = true; etat = 'repos';
      ctx.regler('etat', 'repos'); ctx.regler('rearmer', null, { desactive: true });
      return true;
    };
    const phase = v => {
      pasAPas = true; plafond = 9;
      const poser = (e, ch, p) => { etat = e; verrou = false; moteur = true; chaleur = ch; plafond = p; Ir = 8; regl.cible = 8; ctx.regler('reglage', 8); ctx.regler('rearmer', null, { desactive: true }); };
      if (v === 'repos') poser('repos', 0.6, 9);
      if (v === 'chauffe') poser('surcharge', 0.6, 0.66);
      if (v === 'pousse') poser('surcharge', Math.max(0.66, Math.min(chaleur, 0.73)), 0.73);
      if (v === 'bascule') { poser('surcharge', Math.max(chaleur, 0.73), 1.0); }
      if (v === 'contacteur') { poser('surcharge', 0.9, 0.9); verrou = true; moteur = false; ctx.regler('rearmer', null, { desactive: false }); }
      if (v === 'rearme') { poser('repos', 0.62, 0.62); appui.cible = 1; tAppui = 0.35; }
      ctx.regler('etat', etat); majGrains(); majMesures();
    };
    const agir = (id, v) => {
      if (id === 'focus') { voir(v); return; }
      if (id === 'phase') { phase(v); return; }
      voir('tout');
      pasAPas = false; plafond = 9;
      if (id === 'reglage') { Ir = v; regl.cible = v; majMesures(); if (!verrou) ctx.dire(phrase()); return; }
      if (id === 'rearmer') { if (verrou && rearmer()) { majGrains(); majMesures(); ctx.dire(PHRASES.rearme); } return; }
      if (id !== 'etat') return;
      if (verrou) { verrou = false; moteur = true; ctx.regler('rearmer', null, { desactive: true }); }
      etat = v; majGrains(); majMesures(); ctx.dire(phrase());
    };

    /* focus des étapes : la molette et le bouton, opaques, cachent les bilames ; les petites
       bornes 95 à 98 et leurs fils passent devant le bloc de contacts */
    const voir = focus({ dedans: [reglage, bouton], meca: [reglage, bouton, bornesAux, filsAux, filsCmd, grAux] });

    placer(); majMesures(); majGrains();
    let initialise = false;

    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: 28, elevation: 16, cadre: [socle, capot], marge: 1.12 }
                                    : { azimut: 14, elevation: 10, cadre: [socle, capot], marge: 1.06 },
      fond: 'platine',
      /* seul le boîtier (et ce qui est gravé ou moulé dessus) devient transparent ; ce qui
         gêne la vue du mécanisme, les étapes le cachent (focus) */
      fantome: [socle, capot, fenetre, marquages],
      phrase: PHRASES.repos,
      pieces: [
        { id: 'boitier', nom: 'Le boîtier', objets: [socle, capot], desc: 'Il se clipse sous le contacteur. « Voir dedans » le rend transparent.' },
        { id: 'broches', nom: 'Les trois broches', objets: [broches], desc: 'Elles entrent dans les bornes 2, 4, 6 du contacteur : le relais suit ses trois phases.' },
        { id: 'bilames', nom: 'Les trois bilames', objets: [gBilames], desc: 'Un par phase. Deux métaux collés qui se courbent en chauffant.' },
        { id: 'chauffe', nom: 'Les éléments chauffants', objets: [gChauffe], desc: 'Le courant du moteur les traverse et chauffe les bilames : plus de courant, plus de chaleur.' },
        { id: 'reglette', nom: 'La réglette', objets: [reglette], desc: 'Une barre à trois dents. Les bilames la poussent vers la droite.' },
        { id: 'levier', nom: 'Le levier et le poussoir', objets: [levier, poussoir, ressortP], desc: 'La réglette fait basculer le levier, qui enfonce le poussoir des contacts.' },
        { id: 'contacts', nom: 'Les contacts 95-96 et 97-98', objets: [fixes, filsAux, pontNO], desc: '95-96 est fermé au repos et s’ouvre au déclenchement : il coupe la commande. 97-98 se ferme : il signale le défaut.' },
        { id: 'molette', nom: 'La molette de réglage (A)', objets: [reglage], desc: 'Graduée en ampères. On la règle sur l’intensité de la plaque du moteur.' },
        { id: 'reset', nom: 'Le bouton de réarmement', objets: [bouton], desc: 'Le bouton bleu. Il remet les contacts au repos, une fois les bilames refroidis.' },
        { id: 'temoin', nom: 'Le témoin', objets: [temoin, fenetre], desc: 'Un volet orange apparaît dans la fenêtre quand le relais a déclenché.' },
        { id: 'bornes', nom: 'Les bornes vers le moteur', objets: [bornes], desc: '2/T1, 4/T2, 6/T3 : les trois phases repartent vers le moteur.' },
        { id: 'bornesAux', nom: 'Les bornes 95-96 et 97-98', objets: [bornesAux], desc: '95-96 va dans le circuit de commande, en série avec la bobine du contacteur. 97-98 va vers un voyant.' }
      ],
      commandes: [
        { id: 'etat', type: 'choix', options: [['repos', 'Au repos'], ['surcharge', 'En surcharge']], valeur: 'repos' },
        { id: 'reglage', type: 'curseur', libelle: 'La molette de réglage', min: 7, max: 10, pas: 0.5, unite: 'A', valeur: 8 },
        { id: 'rearmer', type: 'action', libelle: 'Réarmer', accent: true }
      ],
      etapes: [
        { titre: 'Au repos', piece: 'contacts', voirDedans: true, actions: [['focus', 'dedans'], ['phase', 'repos']],
          vue: { azimut: 12, elevation: -8, zoom: 1.0 },
          texte: 'Le courant du moteur traverse les trois éléments chauffants. Les bilames restent droits. Le contact 95-96 est fermé : la bobine du contacteur est alimentée.' },
        { titre: 'Surcharge : les bilames chauffent et se courbent', voirDedans: true, actions: [['focus', 'meca'], ['phase', 'chauffe']],
          vue: { azimut: 6, elevation: 6, zoom: 1.1, cible: [3, 2, 40] }, duree: 7,
          texte: 'Le moteur force et tire 10,4 A. Les éléments chauffants rougissent, les bilames chauffent et se courbent lentement vers la droite.' },
        { titre: 'Les bilames poussent la réglette', piece: 'reglette', actions: [['focus', 'meca'], ['phase', 'pousse']],
          vue: { azimut: 8, elevation: 8, zoom: 1.45, cible: [6, 12, 40] },
          texte: 'Assez courbés, les bilames touchent les dents de la réglette et la poussent vers la droite, jusqu’au levier.' },
        { titre: 'Le levier bascule : 95-96 s’ouvre, 97-98 se ferme', piece: 'levier', ralenti: true, actions: [['focus', 'meca'], ['phase', 'bascule']],
          vue: { azimut: 10, elevation: 6, zoom: 2.5, cible: [14, 20, 42] }, duree: 7,
          texte: 'Le levier enfonce le poussoir : le pont du haut quitte 95-96, le pont du bas ferme 97-98. Un volet orange apparaît dans la fenêtre.' },
        { titre: 'Le contacteur retombe : le moteur s’arrête', piece: 'contacts', actions: [['focus', 'dedans'], ['phase', 'contacteur']],
          vue: { azimut: 14, elevation: -8, zoom: 1.0 },
          texte: '95-96 ouvert, la bobine du contacteur n’est plus alimentée : le contacteur s’ouvre et coupe le moteur. Le relais n’a fait que donner l’ordre. Les bilames refroidissent.' },
        { titre: 'On réarme avec le bouton bleu', piece: 'reset', actions: [['focus', 'tout'], ['phase', 'rearme']],
          vue: { azimut: 22, elevation: 10, zoom: 1.2, cible: [6, 4, 56] },
          texte: 'Une fois les bilames refroidis, on appuie sur le bouton bleu : 95-96 se referme. Avant, on cherche pourquoi le moteur a forcé.' }
      ],
      eclate: [
        { objets: [capot, marquages, reglage, bouton, fenetre, temoin, bornesAux], vers: [0, 0, 64], debut: 0, fin: 0.5 },
        { objets: [socle], vers: [0, 0, -60], debut: 0.2, fin: 0.7 },
        { objets: [poussoir, pontNO, fixes, filsAux, levier, ressortP], vers: [0, 26, 16], debut: 0.45, fin: 0.95 },
        { objets: [reglette], vers: [0, 10, 14], debut: 0.4, fin: 0.9 },
        { objets: [broches], vers: [0, 20, 0], debut: 0.5, fin: 1 }
      ],
      eclateVue: { azimut: 34, elevation: 16, zoom: 0.62, cible: [0, 6, 40] },
      surEclate(on) { eclatee = on; if (on) voir('tout'); majGrains(); },
      agir,
      animer(dt) {
        if (!initialise) { initialise = true; ctx.regler('rearmer', null, { desactive: true }); }
        let actif = false;
        const I = moteur ? (etat === 'surcharge' ? 10.4 : IN) : 0;
        const r = I / Ir;
        const cible = Math.min(moteur ? 0.6 * r * r : 0.3, plafond, 1.3);
        const avant = chaleur;
        if (chaleur < cible) chaleur = Math.min(cible, chaleur + dt * 0.1);
        else chaleur = Math.max(cible, chaleur - dt * (pasAPas ? 0.03 : 0.06));
        if (Math.abs(chaleur - avant) > 1e-5) actif = true;
        if (regl.pas(dt)) actif = true;
        if (tAppui > 0) { tAppui -= dt; if (tAppui <= 0) appui.cible = 0; actif = true; }
        if (appui.pas(dt)) actif = true;
        const avantNF = nfFerme(), avantNO = noFerme();
        placer();
        if (!verrou && reg >= REG_DECLIC) {
          verrou = true; placer();
          ctx.regler('rearmer', null, { desactive: false });
          if (!pasAPas) { moteur = false; ctx.dire(PHRASES.declenche); }
        }
        if (nfFerme() !== avantNF || noFerme() !== avantNO) majGrains();
        [...grains, grNF, grNO].forEach(g => { if (g.animer(dt)) actif = true; });
        majMesures();
        return actif;
      }
    };
  }, { famille: 'protection', titre: 'Le relais thermique', stations: ['4.7'] });

  /* ================================================================ le différentiel (4.5 / 4.6)
     options.variante : 'ID' interrupteur différentiel (36 mm : tore + relais, aucun déclencheur
     de surintensité) ou 'DD' disjoncteur différentiel (54 mm : tore + relais + bobine + bilame).
     Défaut : 'DD', la variante la plus riche.
     Le tore est traversé par la phase ET le neutre : tant que l'aller égale le retour, rien ;
     une fuite à la terre, et le tore voit la différence (flux bleu), le relais fait tout ouvrir. */
  Electro3D.definir('differentiel', (T, K, ctx) => {
    const M = K.mat;
    const DD = ((ctx.options || {}).variante || 'DD') !== 'ID';
    const racine = new T.Group();
    const L = DD ? 54 : 36, XN = DD ? -18 : -9, XL = DD ? 18 : 9;
    const XR = DD ? -9 : 0;                         /* le relais de déclenchement */
    const BX = L / 2 - 6;                           /* le bouton test */
    const TORE = { y: 21, z: 24, R: 7, r: 2.2 };

    const rail = K.railDIN(L + 30); racine.add(rail);
    const { socle, nez, griffe } = K.boitierModulaire(L, M.plastiqueBlanc);
    const fente = K.mesh(K.boite(L - 8, 21, 0.8, 0.3), M.sombre, 0, 4, 69.9);
    racine.add(socle, nez, griffe, fente);

    const marquages = new T.Group();
    const grave = (t, h, x, y, z) => { const m = K.gravure(t, h, { couleur: '#2b3138' }); m.position.set(x, y, z); marquages.add(m); };
    grave('I', 3, 0, 18.6, 70.05); grave('O', 3, 0, -10.6, 70.05);
    grave(DD ? 'C16   30 mA   type A' : '40 A   30 mA', 3.2, 0, -15.2, 70.05);
    grave('T', 3, BX - 6.2, 18.4, 70.05);
    grave('N', 3, XN, 27, 44.05); grave('1', 3, XL, 27, 44.05); grave('N', 3, XN, -27, 44.05); grave('2', 3, XL, -27, 44.05);
    racine.add(marquages);

    const bornes = new T.Group();
    [[XN, 33, 1], [XL, 33, 1], [XN, -33, -1], [XL, -33, -1]].forEach(([x, y, s]) => bornes.add(K.cageModulaire(x, y, s)));
    racine.add(bornes);

    /* ---------------- le tore et son enroulement secondaire */
    const tore = new T.Group();
    const anneau = K.mesh(K.tore(TORE.R, TORE.r, 14, 48), K.metal(0x40454c, 0.55), 0, TORE.y, TORE.z); anneau.rotation.x = Math.PI / 2;
    const secondaire = K.mesh(K.tore(TORE.R, TORE.r + 0.55, 12, 20, 1.1), K.bobinageMat(6), 0, TORE.y, TORE.z);
    secondaire.rotation.x = Math.PI / 2; secondaire.rotation.z = Math.PI - 0.55;
    tore.add(anneau, secondaire);
    const filsSec = new T.Group();
    const fs1 = K.fil([[-TORE.R - 1.5, TORE.y + 1, TORE.z - 1.5], [XR - 3, 16, 30], [XR - 2.5, 13.5, 34]], 0.35, M.bobinage);
    const fs2 = K.fil([[-TORE.R - 1.5, TORE.y - 1, TORE.z + 1.5], [XR - 1, 15, 33], [XR - 0.5, 13.5, 34]], 0.35, M.bobinage);
    filsSec.add(fs1.mesh, fs2.mesh);
    tore.add(filsSec);
    racine.add(tore);
    const fluxTore = K.flux(new T.CatmullRomCurve3(Array.from({ length: 48 }, (_, i) => {
      const a = i / 48 * Math.PI * 2; return new T.Vector3(Math.cos(a) * TORE.R, TORE.y + 2.8, TORE.z + Math.sin(a) * TORE.R);
    }), true), { rayon: 0.55, pas: 5, vitesse: 0.9, ferme: true });
    fluxTore.regler({ intensite: 0 }); racine.add(fluxTore.objet);
    const courantSec = K.courant(K.chemin([fs1.courbe, K.inverse(fs2)]), { pas: 3, rayon: 0.45, vitesse: 14 });
    courantSec.regler({ debit: 0, alternatif: true, frequence: 0.7 }); racine.add(courantSec.objet);

    /* ---------------- le relais de déclenchement et sa serrure */
    const relais = new T.Group();
    relais.add(K.mesh(K.boite(9, 7, 8, 0.8), M.plastiqueNoir, XR, 10, 37));
    relais.add(K.mesh(K.boite(9.6, 2, 8.6, 0.4), K.metal(0x8a6a3a, 0.4), XR, 13.8, 37));
    const poussoir = K.mesh(K.cylindre(1.6, 6, 16), M.acier, XR, 10, 43); poussoir.rotation.x = Math.PI / 2;
    const levierD = new T.Group(); levierD.position.set(XR, 16, 49);
    levierD.add(K.mesh(K.boite(4, 8, 2.4, 0.5), M.plastiqueMarine, 0, -4, 0));
    const axeLD = K.mesh(K.cylindre(1, 6, 12), M.acier); axeLD.rotation.z = Math.PI / 2; levierD.add(axeLD);
    const crochetD = biellette(T, K, M.plastiqueMarine, 1.8);
    racine.add(relais, poussoir, levierD, crochetD);

    /* ---------------- les pôles : contacts, conducteurs (les deux passent DANS le tore) */
    const cuivre = new T.Group();
    const conducteur = (x, sx) => K.fil([[x, 30, 33], [x, 27, 28], [sx, 25.5, TORE.z], [sx, 16.5, TORE.z], [x, 10, 22], [x, 2.2, 20.6], [x, 1.2, 20]], 1, M.cuivre);
    const cN = conducteur(XN, -2.4); cuivre.add(cN.mesh);
    cuivre.add(K.fil([[XN, -10, 28], [XN, -18, 31], [XN, -28, 33.5], [XN, -33, 33.5]], 0.75, M.cuivreSombre).mesh);
    const CN = poleContact(T, K, XN);
    let P = null, CL, cL;
    if (DD) {
      P = polePhase(T, K, XL);
      P.conducteurs.remove(P.conducteurs.children[0]);   /* l'arrivée passe d'abord par le tore */
      cL = K.fil([[XL, 30, 33], [XL, 27, 28], [2.4, 25.5, TORE.z], [2.4, 15, TORE.z], [9.6, 15, 24], [11, 26, 31], [XL, 26, 30], [XL, 24.6, 29]], 1, M.cuivre);
      cuivre.add(cL.mesh);
      CL = P.contact;
      racine.add(P.bobine, P.noyau, P.conducteurs, P.chambre, P.bilame.groupe, P.socleBilame, P.tresse, P.barre, P.guide, P.verrou, P.ressort);
    } else {
      cL = conducteur(XL, 2.4); cuivre.add(cL.mesh);
      cuivre.add(K.fil([[XL, -10, 28], [XL, -18, 31], [XL, -28, 33.5], [XL, -33, 33.5]], 0.75, M.cuivreSombre).mesh);
      CL = poleContact(T, K, XL);
    }
    racine.add(cuivre, CN.fixe, CN.bras, CL.fixe, CL.bras);
    const axe = K.mesh(K.cylindre(1.2, XL - XN + 8, 16), M.acier, (XN + XL) / 2, PIVOT[0], PIVOT[1]); axe.rotation.z = Math.PI / 2;
    const bielle = biellette(T, K, M.plastiqueMarine, 2.2);
    racine.add(axe, bielle);

    /* ---------------- le bouton test et sa résistance */
    const test = new T.Group();
    const boutonT = K.mesh(K.cylindre(3.2, 5, 24), M.plastiqueBleu, BX, 18, 70.5); boutonT.rotation.x = Math.PI / 2;
    const tigeT = K.mesh(K.cylindre(0.9, 12, 10), M.acier, BX, 18, 62); tigeT.rotation.x = Math.PI / 2;
    const resistance = K.mesh(K.cylindre(1.4, 7, 16), K.plastique(0xd9c39a), BX - 7.5, 18, 50); resistance.rotation.z = Math.PI / 2;
    [-2, 0, 2].forEach((d, i) => { const b = K.mesh(K.cylindre(1.5, 0.8, 16), K.plastique([0x7a4a2c, 0x26282b, 0xc0392b][i]), BX - 7.5 + d, 18, 50); b.rotation.z = Math.PI / 2; test.add(b); });
    const filT1 = K.fil([[2.4, 15, TORE.z], [Math.min(BX - 3, 12), 12, 38], [BX, 17, 55.5]], 0.4, M.cuivre);
    const filT2 = K.fil([[BX - 0.8, 19, 55.5], [BX - 2, 19, 52], [BX - 4, 18, 50]], 0.4, M.cuivre);
    const filT3 = K.fil([[BX - 11, 18, 50], [XN + 2, 26, 36], [XN + 0.5, 27.5, 30]], 0.4, M.cuivre);
    test.add(boutonT, tigeT, resistance, filT1.mesh, filT2.mesh, filT3.mesh);
    racine.add(test);

    /* ---------------- la manette */
    const manette = manetteModulaire(T, K, L - 12, 4, 60, M.plastiqueMarine);
    racine.add(manette);

    /* ---------------- dehors : le récepteur, sa carcasse reliée à la terre (vert-jaune) */
    const dehors = new T.Group();
    const fH = x => [[x, 74, 18], [x, 62, 28], [x, 50, 33], [x, 37, 33]];
    const fB = x => [[x, -37, 33], [x, -54, 33], [x, -70, 27], [x * 0.5, -82, 22]];
    const fNh = K.fil(fH(XN), 1.6, 'N'), fNb = K.fil(fB(XN), 1.6, 'N'), fLh = K.fil(fH(XL), 1.6, 'L1'), fLb = K.fil(fB(XL), 1.6, 'L1');
    dehors.add(fNh.mesh, fNb.mesh, fLh.mesh, fLb.mesh);
    const recepteur = K.mesh(K.boite(L + 6, 12, 22, 2), M.acierSombre, 0, -88, 22);
    const XT = -L / 2 - 16;
    const pe = K.fil([[-L / 2 - 2, -88, 22], [XT + 4, -86, 16], [XT, -74, 8], [XT, -64, 6]], 1.4, 'PE');
    const barrette = K.mesh(K.boite(9, 6, 7, 0.8), M.zingue, XT, -61, 5);
    dehors.add(recepteur, pe.mesh, barrette);
    racine.add(dehors);

    /* ---------------- le courant : aller (phase), retour (neutre), fuite (PE), test */
    const cheminL = DD
      ? K.chemin([fLh.courbe, [XL, 33, 33], cL.courbe, ...helice(T, XL, 18, 6.4, 29, 15, Math.PI / 2, 3.5), [XL, 6, 15], [XL, 2.2, 18], [XL, 0.8, 20], [XL, -1, 20],
          [XL, -10, 28], [XL, -11, 32], [XL, -12, 36.2], [XL, -30, 36.2], [XL, -33, 33.5], fLb.courbe])
      : K.chemin([fLh.courbe, [XL, 33, 33], cL.courbe, [XL, -1, 20], [XL, -10, 28], [XL, -18, 31], [XL, -28, 33.5], [XL, -33, 33.5], fLb.courbe]);
    const cheminN = K.chemin([fNh.courbe, [XN, 33, 33], cN.courbe, [XN, -1, 20], [XN, -10, 28], [XN, -18, 31], [XN, -28, 33.5], [XN, -33, 33.5], fNb.courbe]);
    const grL = K.courant(cheminL, { pas: 6, rayon: 1, vitesse: 30 }), grN = K.courant(cheminN, { pas: 6, rayon: 1, vitesse: 30 });
    const grPE = K.courant(K.chemin([[XL * 0.5, -82.5, 33.4], [0, -86, 33.4], [-L / 2 + 2, -86, 33.4], pe.courbe]), { pas: 5, rayon: 1.9, vitesse: 22 });
    const grT = K.courant(K.chemin([filT1.courbe, filT2.courbe, [BX - 11, 18, 50], filT3.courbe]), { pas: 3.5, rayon: 0.6, vitesse: 16 });
    [grL, grN, grPE, grT].forEach(g => { g.regler({ debit: 0, alternatif: true, frequence: 0.7 }); racine.add(g.objet); });
    const arc = K.arc(new T.Vector3(XL, -2.5, 14.6), new T.Vector3(XL, -15, 14.1), { rayon: 0.5, halo: 0.8 });
    if (DD) racine.add(arc.objet);

    /* ---------------------------------------------------------------- l'état */
    const ouvert = K.mobile(0, 420, 22), coup = K.mobile(0, 1300, 40), appui = K.mobile(0, 500, 26);
    const noyau = K.mobile(0, 1600, 45), barre = K.mobile(0, 900, 32);
    let etat = 'normal', declenche = false, cause = '', tDiff = -1, tTest = 0, enTest = false, tRetour = 0, tArc = 0;
    let chaleur = 0.12, pasAPas = false, plafond = 9, sansRelais = false, eclatee = false, initialise = false;
    const SEUIL = 0.38;
    const courbure = () => 0.62 * K.clamp((chaleur - 0.12) / 1.1, 0, 1);
    const ferme = () => !declenche && ouvert.x < 0.5;
    const desequilibre = () => ferme() && (etat === 'defaut' || enTest);

    const placer = () => {
      const a = OUVERTURE * K.clamp(ouvert.x, -0.1, 1.05);
      CN.bras.rotation.x = a; CL.bras.rotation.x = a;
      const am = ANGLE_I + (ANGLE_O - ANGLE_I) * K.clamp(ouvert.x, -0.1, 1.1);
      manette.rotation.x = am;
      const pm = tourner(-6, -3, am), pa = tourner(4.5, -4, a), ph = tourner(3, -4, am);
      bielle.relier([XL - 3, 4 + pm[0], 60 + pm[1]], [XL - 3, PIVOT[0] + pa[0], PIVOT[1] + pa[1]]);
      poussoir.position.z = 43 + 4 * coup.x;
      levierD.rotation.x = -0.55 * coup.x;
      crochetD.relier([XR + 3, 16, 49], [XR + 3, 4 + ph[0], 60 + ph[1]]);
      boutonT.position.z = 70.5 - 1.8 * appui.x; tigeT.position.z = 62 - 1.8 * appui.x;
      if (P) {
        P.noyau.position.z = 22.5 + noyau.x; P.barre.position.z = 41.8 + 3.5 * barre.x; P.verrou.rotation.x = -0.5 * barre.x;
        P.ressort.longueur(Math.max(4, PIVOT[0] + pa[0] + 22));
        P.bilame.plier(courbure()); P.bilame.chauffer(chaleur > 0.2 ? chaleur : 0);
      }
    };

    const IA = () => !ferme() ? 0 : etat === 'surcharge' ? 24 : etat === 'court' ? 1000 : 10;
    let dern = '';
    const majMesures = () => {
      const I = IA(), fuite = !ferme() ? 0 : etat === 'defaut' ? 50 : enTest ? 40 : 0;
      const txt = v => v >= 1000 ? '≈ 1 000 A' : (Math.round(v * 100) / 100).toString().replace('.', ',') + ' A';
      const liste = [
        { libelle: 'Ce qui part (phase)', valeur: txt(I) },
        { libelle: 'Ce qui revient (neutre)', valeur: txt(etat === 'defaut' && ferme() ? I - 0.05 : I) },
        { libelle: 'Différence vue par le tore', valeur: fuite + ' mA' + (fuite >= 30 ? ' → coupe' : '') }
      ];
      const k = JSON.stringify(liste); if (k !== dern) { dern = k; ctx.mesures(liste); }
    };
    const majCourant = () => {
      const on = ferme() && !eclatee, d = desequilibre() && !eclatee;
      const v = etat === 'surcharge' ? 44 : etat === 'court' ? 120 : 30;
      grL.regler({ debit: on ? 1 : 0, vitesse: v });
      grN.regler({ debit: on ? (etat === 'defaut' ? 0.68 : 1) : 0, vitesse: v });
      grPE.regler({ debit: on && etat === 'defaut' ? 1 : 0 });
      grT.regler({ debit: on && enTest ? 1 : 0 });
      fluxTore.regler({ intensite: d && !sansRelais ? 1 : 0 });
      courantSec.regler({ debit: d && !sansRelais ? 1 : 0 });
    };

    const PHRASES = {
      normal: '<strong>Fonctionnement normal.</strong> Tout le courant qui part par la phase revient par le neutre. Les deux traversent le tore : leurs effets s’annulent, le tore ne voit rien.',
      defaut: '<strong>Défaut d’isolement.</strong> Une partie du courant s’échappe par la carcasse et le conducteur vert-jaune, vers la terre. Il manque au retour : le tore le sent, le relais fait couper.',
      diff: '<strong>Déclenché par le tore.</strong> 50 mA manquaient au retour, plus que les 30 mA du réglage : le relais a frappé la serrure, la manette est tombée sur O.',
      test: '<strong>Bouton test.</strong> Il fait passer un petit courant, par une résistance, à côté du tore : un faux défaut. Le différentiel doit couper. À faire deux fois par an.',
      surcharge: '<strong>Surcharge.</strong> Le bilame chauffe et se courbe lentement : c’est la partie disjoncteur. Le tore, lui, ne voit rien : l’aller égale le retour.',
      thermique: '<strong>Déclenché par le bilame.</strong> La surcharge a duré : le bilame a poussé la barre, la manette est tombée sur O.',
      court: '<strong>Court-circuit.</strong> La bobine lance son noyau instantanément ; l’arc s’éteint dans la chambre de coupure. Le tore ne voit rien : c’est la bobine qui coupe.',
      rearme: '<strong>Réarmé.</strong> On remonte la manette sur I. Avant, on cherche le défaut : une fuite à la terre peut être un corps humain.'
    };

    const declencher = (c, muet) => {
      if (declenche) return;
      declenche = true; cause = c; ouvert.cible = 1; enTest = false;
      if (c === 'diff') coup.cible = 1; else barre.cible = 1;
      if (c !== 'diff' && DD) tArc = 0.42;
      tRetour = pasAPas ? 0 : 0.45;
      majCourant(); majMesures();
      if (!muet) ctx.dire(PHRASES[c === 'diff' ? 'diff' : c === 'thermique' ? 'thermique' : 'court']);
      ctx.regler('rearmer', null, { desactive: false });
    };
    const remettre = (e, ch) => {
      declenche = false; cause = ''; ouvert.cible = 0; coup.cible = 0; barre.cible = 0; noyau.cible = 0; enTest = false; tTest = 0;
      tDiff = -1; tArc = 0; arc.regler(false); etat = e; if (ch !== undefined) chaleur = ch;
      ctx.regler('rearmer', null, { desactive: true });
    };
    const lancer = e => {
      etat = e; noyau.cible = e === 'court' ? 10 : 0;
      tDiff = e === 'defaut' ? 0.5 : -1;
    };

    const phase = v => {
      pasAPas = true; plafond = 9; sansRelais = false;
      if (v === 'normal') remettre('normal', 0.12);
      if (v === 'fuite') { remettre('defaut', 0.12); sansRelais = true; }
      if (v === 'tore') remettre('defaut', 0.12);
      if (v === 'coupe') { if (declenche) remettre('defaut', 0.12); etat = 'defaut'; declencher('diff', true); }
      if (v === 'test') { remettre('normal', 0.12); enTest = true; tTest = 5; appui.cible = 1; }
      if (v === 'court') { remettre('court', 0.12); noyau.x = 10; noyau.cible = 10; declencher('magnetique', true); tArc = 2.6; }
      ctx.regler('etat', etat); majCourant(); majMesures();
    };

    const agir = (id, v) => {
      if (id === 'focus') { voir(v); return; }
      if (id === 'phase') { phase(v); return; }
      voir('tout');
      pasAPas = false; plafond = 9; sansRelais = false;
      if (id === 'rearmer') {
        if (!declenche) return;
        remettre('normal'); chaleur = Math.min(chaleur, 0.35);
        ctx.regler('etat', 'normal'); majCourant(); majMesures(); ctx.dire(PHRASES.rearme); return;
      }
      if (id === 'test') {
        if (declenche) return;
        enTest = true; tTest = 0.9; appui.cible = 1; tDiff = 0.45;
        majCourant(); majMesures(); ctx.dire(PHRASES.test); return;
      }
      if (id !== 'etat') return;
      if (declenche) { remettre(v); chaleur = Math.min(chaleur, 0.35); }
      lancer(v); majCourant(); majMesures(); ctx.dire(PHRASES[v] || PHRASES.normal);
    };

    /* focus des étapes : la manette et le bouton test passent devant le tore et le relais */
    const mecaDD = P ? [P.bobine, P.noyau, P.barre, P.guide, P.verrou, P.ressort] : [];
    const voir = focus({ tore: [manette, test, bielle], relais: [test, ...mecaDD], test: [manette, bielle] });

    placer(); majCourant(); majMesures();

    const options = [['normal', 'Fonctionnement normal'], ['defaut', 'Défaut d’isolement']];
    if (DD) options.push(['surcharge', 'Surcharge'], ['court', 'Court-circuit']);
    const piecesDD = DD ? [
      { id: 'bobine', nom: 'La bobine et son noyau', objets: [P.bobine, P.noyau], desc: 'Comme dans le disjoncteur : en court-circuit, elle lance son noyau, instantanément.' },
      { id: 'bilame', nom: 'Le bilame et la chambre', objets: [P.bilame.groupe, P.socleBilame, P.tresse, P.chambre, P.conducteurs], desc: 'Le bilame surveille la surcharge, lentement. La chambre de coupure éteint l’arc.' }
    ] : [];

    const etapes = [
      { titre: 'Fonctionnement normal : ce qui part revient', piece: 'tore', voirDedans: true, actions: [['focus', 'tout'], ['phase', 'normal']],
        vue: { azimut: 28, elevation: 24, zoom: 0.95 },
        texte: 'Le courant part par la phase (marron) et revient par le neutre (bleu). Les deux traversent le tore : autant à l’aller qu’au retour, leurs effets s’annulent.' },
      { titre: 'Défaut : une partie du courant part à la terre', piece: 'terre', actions: [['focus', 'tout'], ['phase', 'fuite']],
        vue: { azimut: 20, elevation: 12, zoom: 0.82, cible: [-6, -26, 24] }, duree: 7,
        texte: 'L’isolant du récepteur a lâché : une partie du courant passe par la carcasse et le conducteur vert-jaune, vers la terre. Il en manque au retour, dans le neutre.' },
      { titre: 'Le tore sent la différence', piece: 'tore', actions: [['focus', 'tore'], ['phase', 'tore']],
        vue: DD ? { azimut: 26, elevation: 36, zoom: 1.75, cible: [-1, 18, 28] } : { azimut: 18, elevation: 16, zoom: 1.75, cible: [0, 19, 28] }, duree: 7,
        texte: 'Aller et retour ne s’annulent plus : un flux tourne dans l’anneau (les tirets bleus). L’enroulement autour du tore envoie un petit courant au relais.' },
      { titre: 'Le relais frappe : la manette tombe sur O', piece: 'relais', ralenti: true, actions: [['focus', 'relais'], ['phase', 'coupe']],
        vue: { azimut: -52, elevation: 14, zoom: 1.3, cible: [XR, 10, 44] }, duree: 7,
        texte: 'Le relais lance son poussoir contre le levier de la serrure : elle lâche, la phase ET le neutre s’ouvrent, la manette tombe sur O. Plus rien ne fuit.' },
      { titre: 'Le bouton test crée un faux défaut', piece: 'test', actions: [['focus', 'test'], ['phase', 'test']],
        vue: { azimut: 24, elevation: 22, zoom: 1.3, cible: [BX - 9, 17, 44] }, duree: 7,
        texte: 'On a réarmé. Appuyer sur le bouton bleu fait passer un petit courant par une résistance, à côté du tore : il manque au retour, le tore le voit, et le différentiel doit couper.' }
    ];
    if (DD) etapes.push({ titre: 'Court-circuit : c’est la bobine qui coupe', piece: 'bobine', ralenti: true, actions: [['focus', 'tout'], ['phase', 'court']],
      vue: { azimut: 58, elevation: 10, zoom: 1.3, cible: [XL, 6, 28] }, duree: 7,
      texte: 'Le disjoncteur différentiel a aussi une bobine et un bilame. En court-circuit, la bobine lance son noyau en quelques millièmes de seconde. Le tore, lui, ne voit rien : l’aller égale le retour.' });

    const eclate = [
      { objets: [nez, fente, marquages, manette, test], vers: [0, 0, 64], debut: 0, fin: 0.45 },
      { objets: [socle, griffe, rail], vers: [0, 0, -64], debut: 0.15, fin: 0.6 },
      { objets: [relais, poussoir, levierD, crochetD], vers: [0, 18, 26], debut: 0.4, fin: 0.85 },
      { objets: [tore], vers: [0, 36, 0], debut: 0.5, fin: 1 }
    ];
    if (DD) eclate.push({ objets: [P.bobine, P.noyau], vers: [30, 12, 0], debut: 0.5, fin: 0.95 }, { objets: [P.bilame.groupe, P.socleBilame, P.tresse], vers: [30, -12, 0], debut: 0.5, fin: 0.95 });

    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: 22, elevation: 14, cadre: [socle, nez], marge: 1.12 }
                                    : { azimut: 30, elevation: 16, cadre: [socle, nez], marge: 1.08 },
      fond: 'platine',
      fantome: [socle, nez, griffe, fente],
      phrase: PHRASES.normal,
      pieces: [
        { id: 'boitier', nom: DD ? 'Le boîtier (3 modules)' : 'Le boîtier (2 modules)', objets: [socle, nez, griffe, fente], desc: DD ? 'Un peu plus large qu’un disjoncteur : il y a un tore en plus. Il porte un calibre, une sensibilité et un type (ici A).' : 'Il porte le courant qu’il supporte et sa sensibilité : 30 mA.' },
        { id: 'manette', nom: 'La manette I / O', objets: [manette], desc: 'Elle tombe sur O quand il déclenche. Elle coupe la phase ET le neutre.' },
        { id: 'tore', nom: 'Le tore', objets: [tore], desc: 'Un anneau que traversent la phase et le neutre. Son enroulement prévient le relais dès qu’il manque du courant au retour.' },
        { id: 'relais', nom: 'Le relais de déclenchement', objets: [relais, poussoir, levierD, crochetD], desc: 'Réveillé par le tore, il lance son poussoir contre la serrure.' },
        { id: 'test', nom: 'Le bouton test (T)', objets: [test], desc: 'Il crée un vrai petit défaut, par une résistance qui contourne le tore. À presser deux fois par an.' },
        { id: 'contacts', nom: 'Les contacts', objets: [CN.fixe, CN.bras, CL.fixe, CL.bras, axe, bielle], desc: 'Deux pôles, phase et neutre, qui s’ouvrent ensemble.' },
        { id: 'cuivre', nom: 'Les conducteurs internes', objets: [cuivre], desc: 'Neutre à gauche, phase à droite. Les deux se rapprochent pour passer ensemble dans le tore.' },
        ...piecesDD,
        { id: 'bornes', nom: 'Les bornes', objets: [bornes], desc: 'N à gauche, phase à droite. L’arrivée en haut, le départ en bas. Le conducteur de protection ne passe jamais dedans.' },
        { id: 'terre', nom: 'Le récepteur et la terre', objets: [recepteur, pe.mesh, barrette], desc: 'La carcasse du récepteur est reliée à la terre par le vert-jaune. C’est par là que part le courant de fuite.' },
        { id: 'rail', nom: 'Le rail DIN', objets: [rail], desc: 'Il se clipse sur le rail, en tête de rangée (interrupteur) ou en tête d’un circuit (disjoncteur différentiel).' }
      ],
      commandes: [
        { id: 'etat', type: 'choix', options, valeur: 'normal' },
        { id: 'test', type: 'action', libelle: 'Appuyer sur le bouton test' },
        { id: 'rearmer', type: 'action', libelle: 'Réarmer', accent: true }
      ],
      etapes,
      eclate,
      eclateVue: { azimut: 40, elevation: 18, zoom: 0.55, cible: [0, 10, 30] },
      surEclate(on) { eclatee = on; if (on) { voir('tout'); tArc = 0; arc.regler(false); } majCourant(); },
      agir,
      animer(dt) {
        if (!initialise) { initialise = true; ctx.regler('rearmer', null, { desactive: true }); }
        let actif = false;
        if (DD) {
          const cible = !ferme() ? (pasAPas ? chaleur : 0) : etat === 'surcharge' ? Math.min(1.4, plafond) : 0.12;
          const av = chaleur;
          if (chaleur < cible) chaleur = Math.min(cible, chaleur + dt * 0.3); else chaleur = Math.max(cible, chaleur - dt * 0.12);
          if (Math.abs(chaleur - av) > 1e-5) actif = true;
          if (!pasAPas && !declenche && etat === 'surcharge' && ferme() && courbure() >= SEUIL) declencher('thermique');
          if (!pasAPas && !declenche && etat === 'court' && noyau.x > 8) declencher('magnetique');
        }
        if (tDiff >= 0 && !declenche && !sansRelais) { tDiff -= dt; actif = true; if (tDiff < 0 && desequilibre()) declencher('diff', pasAPas); }
        if (tTest > 0) { tTest -= dt; actif = true; if (tTest <= 0) { appui.cible = 0; if (!declenche) { enTest = false; majCourant(); } } }
        if (tRetour > 0) { tRetour -= dt; if (tRetour <= 0) { coup.cible = 0; barre.cible = 0; noyau.cible = 0; } }
        [ouvert, coup, appui, noyau, barre].forEach(m => { if (m.pas(dt)) actif = true; });
        placer();
        if (tArc > 0) { tArc -= dt; arc.regler(tArc > 0 && !eclatee); }
        if (arc.animer(dt)) actif = true;
        [grL, grN, grPE, grT, courantSec].forEach(g => { if (g.animer(dt)) actif = true; });
        if (fluxTore.animer(dt)) actif = true;
        majMesures();
        return actif || tArc > 0;
      }
    };
  }, { famille: 'protection', titre: 'Le différentiel', stations: ['4.5', '4.6'] });

  /* ================================================================ la cartouche fusible (4.1 / 4.2)
     Cartouche cylindrique 10 × 38, coupée en deux dans sa longueur : tube de céramique,
     capsules de laiton, lame à encoches (sections réduites), sable de silice.
     options.type : 'gG' ou 'aM' (une seule cartouche) ; sans option : les deux, côte à côte,
     traversées par le même courant — c'est là qu'on voit la différence.
     Temps de fusion : ordres de grandeur pédagogiques (gG : jamais sous 1,3 × In ; aM : jamais
     sous 4 × In), pas une courbe constructeur. Le temps de l'animation est compressé. */
  const tempsFusion = (type, k) => {
    if (type === 'gG') return k <= 1.3 ? Infinity : 100 / Math.pow(k - 1.3, 3);
    return k <= 4 ? Infinity : 60 / Math.pow((k - 4) / 2.3, 4);
  };
  const ecrireTemps = t => !isFinite(t) ? 'jamais' : t < 0.1 ? 'moins de 0,1 s' : t < 60 ? '≈ ' + String(Math.round(t * 10) / 10).replace('.', ',') + ' s'
    : t < 3600 ? '≈ ' + Math.round(t / 60) + ' min' : '≈ 1 h ou plus';

  Electro3D.definir('cartouche', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const opt = ctx.options || {};
    const seul = opt.type === 'gG' ? 'gg' : opt.type === 'aM' ? 'am' : null;
    const DEMI = [Math.PI / 2, Math.PI];                  /* la moitié arrière (z < 0) */
    const tour = (profil, demi, mat, seg) => {
      const g = new T.LatheGeometry(profil.map(p => new T.Vector2(p[0], p[1])), seg || 40, demi ? DEMI[0] : 0, demi ? DEMI[1] : Math.PI * 2);
      const m = new T.Mesh(g, mat); m.rotation.z = -Math.PI / 2; return m;   /* axe Y → axe X */
    };
    const matCoupe = K.propre(M.ceramique); matCoupe.color.setHex(0xddd3c0);
    const matVerre = new T.MeshStandardMaterial({ color: 0x9c8a5e, roughness: 0.3, transparent: true, opacity: 0.8 });

    /* une cartouche et son support (deux pinces sur un socle isolant) */
    const fabriquer = (type) => {
      const C = { type, groupe: new T.Group(), entier: new T.Group(), coupe: new T.Group() };
      const g = C.groupe;
      /* tube de céramique et capsules de laiton : entiers, et coupés */
      const PT = [[3.6, -16], [5, -16], [5, 16], [3.6, 16], [3.6, -16]];
      const PC = s => s > 0 ? [[5, 13], [5.25, 13], [5.25, 19], [0, 19], [0, 18.4], [5, 18.4], [5, 13]]
                           : [[5, -18.4], [0, -18.4], [0, -19], [5.25, -19], [5.25, -13], [5, -13], [5, -18.4]];
      C.tubeE = tour(PT, false, M.ceramique); C.tubeC = tour(PT, true, M.ceramique);
      C.capsE = K.groupe(tour(PC(1), false, M.laiton), tour(PC(-1), false, M.laiton));
      C.capsC = K.groupe(tour(PC(1), true, M.laiton), tour(PC(-1), true, M.laiton));
      /* les faces de coupe */
      [-1, 1].forEach(s => {
        C.tubeC.add(K.mesh(new T.BoxGeometry(1.4, 32, 0.05), matCoupe, s * 4.3, 0, 0));      /* repère du tour : avant rotation */
        C.capsC.add(K.mesh(new T.BoxGeometry(0.25, 6, 0.05), M.laiton, 5.12, s * 16, 0), K.mesh(new T.BoxGeometry(0.25, 6, 0.05), M.laiton, -5.12, s * 16, 0));
        C.capsC.add(K.mesh(new T.BoxGeometry(10.5, 0.6, 0.05), M.laiton, 0, s * 18.7, 0));
      });
      C.capsC.children.forEach(m => { if (m.geometry.type === 'BoxGeometry') { m.position.set(-m.position.y, m.position.x, m.position.z); m.rotation.z = Math.PI / 2; } });
      C.capsC.rotation.z = 0;
      /* le sable : la moitié arrière, et sa face coupée, où la lame est posée */
      C.sable = new T.Group();
      C.sable.add(tour([[0, -16], [3.6, -16], [3.6, 16], [0, 16]], true, M.sable, 24));
      const face = K.mesh(new T.PlaneGeometry(32, 7.2), M.sable, 0, 0, 0.01); C.sable.add(face);
      const grainM = K.propre(M.sable); grainM.color.setHex(0xcbb98f);
      for (let i = 0; i < 46; i++) C.sable.add(K.mesh(K.sphere(0.22, 6), grainM, -15.5 + Math.random() * 31, (Math.random() - 0.5) * 6.6, 0.06));
      /* la lame à encoches */
      const ENC = type === 'gG' ? [-9, -3, 3, 9] : [-10, -6, -2, 2, 6, 10];
      const LARG = type === 'gG' ? 2.6 : 3.2, EP = 0.28, ZL = 0.2;
      C.matLame = K.propre(M.cuivre); C.matCol = K.propre(M.cuivre);
      C.lame = new T.Group(); C.cols = [];
      const bords = [-17.6, ...ENC.flatMap(x => [x - 0.7, x + 0.7]), 17.6];
      for (let i = 0; i < bords.length; i += 2) C.lame.add(K.mesh(new T.BoxGeometry(bords[i + 1] - bords[i], LARG, EP), C.matLame, (bords[i] + bords[i + 1]) / 2, 0, ZL));
      ENC.forEach(x => {
        const col = K.mesh(new T.BoxGeometry(1.45, LARG * 0.28, EP), C.matCol, x, 0, ZL);
        const gouttes = K.groupe(K.mesh(K.sphere(0.5, 10), C.matCol, x - 0.75, 0, ZL + 0.2), K.mesh(K.sphere(0.5, 10), C.matCol, x + 0.75, 0, ZL + 0.2));
        const verre = K.mesh(K.sphere(1.5, 12), matVerre, x, 0, 0.1); verre.scale.set(1.5, 1.1, 0.5);
        gouttes.visible = false; verre.visible = false;
        const arc = K.arc(new T.Vector3(x - 0.75, 0, ZL + 0.3), new T.Vector3(x + 0.75, 0, ZL + 0.3), { rayon: 0.35, halo: 0.55 });
        C.lame.add(col, gouttes, verre, arc.objet);
        C.cols.push({ x, col, gouttes, verre, arc });
      });
      if (type === 'gG') C.lame.add(K.mesh(K.cylindre(0.9, 0.5, 16), K.metal(0xb9bcb4, 0.35), 0, 0, ZL + 0.35));  /* le point d'étain */
      C.lame.children.forEach(o => { if (o.rotation) o.rotation.x = o.geometry && o.geometry.type === 'CylinderGeometry' ? Math.PI / 2 : o.rotation.x; });
      /* les marquages réels, sur le corps entier */
      C.marques = new T.Group();
      const m1 = K.gravure('16 A  ' + type + '  500 V', 2.1, { couleur: '#2b3138' }); m1.position.set(0, 0.6, 5.04); C.marques.add(m1);
      const m2 = K.gravure('10 × 38', 1.9, { couleur: '#5a6068' }); m2.position.set(0, -5.04 * Math.sin(0.62), 5.04 * Math.cos(0.62)); m2.rotation.x = 0.62; C.marques.add(m2);
      C.entier.add(C.tubeE, C.capsE, C.marques);
      C.coupe.add(C.tubeC, C.capsC, C.sable);
      /* le support : socle isolant et deux pinces */
      C.support = new T.Group();
      C.support.add(K.mesh(K.boite(46, 4, 14, 1), M.plastiqueSombre, 0, -8.6, 0));
      [-1, 1].forEach(s => {
        C.support.add(K.mesh(K.boite(5, 1, 11, 0.3), M.zingue, s * 16, -5.75, 0));
        C.support.add(K.mesh(K.boite(5, 7, 0.8, 0.3), M.zingue, s * 16, -2.6, -5.9));
      });
      const fG = K.fil([[-46, -4, 5], [-34, -6, 5], [-22, -6.6, 3.5], [-16, -6.6, 2]], 1.3, 'L1');
      const fD = K.fil([[16, -6.6, 2], [22, -6.6, 3.5], [34, -6, 5], [46, -4, 5]], 1.3, 'L1');
      C.support.add(fG.mesh, fD.mesh);
      g.add(C.entier, C.coupe, C.lame, C.support);
      C.grains = K.courant(K.chemin([fG.courbe, [-17, -5.2, 0.6], [-18, 0, 0.6], [-17.4, 0, ZL + 0.3], [17.4, 0, ZL + 0.3], [18, 0, 0.6], [17, -5.2, 0.6], fD.courbe]), { pas: 4, rayon: 0.55, vitesse: 22 });
      C.grains.regler({ debit: 1, alternatif: true, frequence: 0.7 }); g.add(C.grains.objet);
      /* l'état */
      C.k = 1; C.t = 0; C.D = Infinity; C.chaleur = 0; C.fondu = ''; C.tArc = 0; C.gel = -1; C.tPointe = 0;
      return C;
    };
    /* le tour (LatheGeometry) est tourné de -90° autour de Z : ses faces de coupe, posées dans le
       repère du tour, suivent ; on les recale ici une fois pour toutes */
    const CG = fabriquer('gG'), CA = fabriquer('aM');
    [CG, CA].forEach(C => {
      C.tubeC.children.forEach(m => { m.rotation.z = 0; });
      racine.add(C.groupe);
    });

    let mode = seul || 'deux', coupe = ctx.mode !== 'decouvrir', eclatee = false, pasAPas = false;
    const visibles = () => mode === 'gg' ? [CG] : mode === 'am' ? [CA] : [CG, CA];
    const poser = () => {
      CG.groupe.visible = mode !== 'am'; CA.groupe.visible = mode !== 'gg';
      CG.groupe.position.y = mode === 'deux' ? 13 : 0; CA.groupe.position.y = mode === 'deux' ? -13 : 0;
      [CG, CA].forEach(C => { C.entier.visible = !coupe; C.coupe.visible = coupe; C.lame.visible = coupe; });
    };
    const dureeReelle = tf => !isFinite(tf) ? Infinity : K.clamp(0.6 + 1.2 * Math.log10(tf + 1), 0.25, 5);

    const remplacer = C => {
      C.fondu = ''; C.t = 0; C.chaleur = 0; C.tArc = 0; C.gel = -1; C.tPointe = 0;
      C.cols.forEach(c => { c.col.visible = true; c.gouttes.visible = false; c.verre.visible = false; c.arc.regler(false); });
    };
    const fondre = (C, tous, arcLong) => {
      if (C.fondu) return;
      C.fondu = tous ? 'tous' : 'un';
      const liste = tous ? C.cols : [C.cols[C.type === 'gG' ? 2 : 3]];
      liste.forEach(c => { c.col.visible = false; c.gouttes.visible = true; });
      C.tArc = arcLong ? 4 : 0.5; C.arcs = liste;
      C.grains.regler({ debit: 0 });
    };
    const lancer = (C, k) => {
      C.k = k; C.t = 0;
      C.D = dureeReelle(tempsFusion(C.type, k));
    };

    let dern = '';
    const majMesures = () => {
      const k = CG.k, liste = [{ libelle: 'Le courant (calibre 16 A)', valeur: String(k).replace('.', ',') + ' × 16 A = ' + Math.round(k * 16) + ' A' }];
      visibles().forEach(C => liste.push({ libelle: 'Cartouche ' + C.type, valeur: C.fondu ? 'fondue' : isFinite(tempsFusion(C.type, C.k)) ? 'fond en ' + ecrireTemps(tempsFusion(C.type, C.k)) : 'ne fond pas' }));
      const s = JSON.stringify(liste); if (s !== dern) { dern = s; ctx.mesures(liste); }
    };
    const PHRASES = {
      gg: '<strong>gG seul.</strong> Le gG protège tout : câbles, prises, éclairage. Il fond dès que le courant dépasse durablement son calibre.',
      am: '<strong>aM seul.</strong> L’aM laisse passer la pointe du démarrage d’un moteur. En revanche il ne protège pas contre les petites surcharges.',
      deux: '<strong>Les deux.</strong> Même tube, même sable, même taille : seules deux lettres les distinguent. Faites monter le courant et comparez.',
      intacte: '<strong>Cartouche intacte.</strong> La lame laisse passer le courant. Elle chauffe un peu, sans conséquence.',
      fondue: '<strong>Après un défaut.</strong> La lame a fondu à ses encoches ; le sable a étouffé l’arc et s’est changé en verre. La cartouche ne se répare pas : on la remplace à l’identique.'
    };
    const phraseCourant = k => {
      if (k >= 10) return '<strong>Court-circuit.</strong> Le courant est énorme : plusieurs encoches fondent d’un coup. Des arcs naissent, le sable les étouffe.';
      if (k >= 5 && k <= 8) return '<strong>La pointe de démarrage d’un moteur.</strong> Quelques secondes à plusieurs fois le calibre : le gG fond, l’aM attend.';
      if (k > 1.3) return '<strong>Surcharge.</strong> Les encoches chauffent les premières : c’est là que la lame est la plus fine. Le gG fond au bout d’un moment ; l’aM n’est pas fait pour ça.';
      return '<strong>Courant normal.</strong> La lame laisse passer le courant, sans fondre.';
    };

    const phase = v => {
      pasAPas = true; mode = 'deux'; ctx.regler('type', 'deux');
      [CG, CA].forEach(remplacer);
      const k = { repos: 1, chauffe: 2.5, fond: 2.5, sable: 2.5, demarrage: 6, court: 20 }[v] || 1;
      [CG, CA].forEach(C => lancer(C, k));
      ctx.regler('courant', k); ctx.regler('etat', 'intacte');
      if (v === 'chauffe') { CG.gel = 0.8; CA.gel = 0.25; }
      if (v === 'fond') { CA.gel = 0.25; CG.chaleur = 1; fondre(CG, false, true); }
      if (v === 'sable') { CA.gel = 0.25; CG.chaleur = 0.3; fondre(CG, false, false); CG.tArc = 0; CG.cols[2].verre.visible = true; }
      if (v === 'demarrage') { CG.tPointe = CA.tPointe = 2.2; }
      if (v === 'court') { [CG, CA].forEach(C => { C.chaleur = 1; fondre(C, true, true); }); }
      poser(); majMesures();
    };

    const agir = (id, v) => {
      if (id === 'phase') { phase(v); return; }
      pasAPas = false;
      if (id === 'type') { mode = v; poser(); majMesures(); ctx.dire(PHRASES[v]); return; }
      if (id === 'courant') {
        [CG, CA].forEach(C => { remplacer(C); lancer(C, v); });
        ctx.regler('etat', 'intacte'); majMesures(); ctx.dire(phraseCourant(v)); return;
      }
      if (id === 'etat') {
        if (v === 'intacte') { [CG, CA].forEach(C => { remplacer(C); lancer(C, 1); }); ctx.regler('courant', 1); }
        else visibles().forEach(C => { remplacer(C); C.k = 12; C.chaleur = 0.2; fondre(C, false, false); C.tArc = 0; C.cols[C.type === 'gG' ? 2 : 3].verre.visible = true; });
        majMesures(); ctx.dire(PHRASES[v]);
      }
    };

    poser(); [CG, CA].forEach(C => lancer(C, 1)); majMesures();

    const tous = (cle) => [CG[cle], CA[cle]];
    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: 22, elevation: 18, cadre: tous('support'), marge: 0.9 }
                                    : { azimut: 10, elevation: 14, cadre: tous('support'), marge: 0.85 },
      fond: 'platine',
      basculerFantome(on) { coupe = !!on; poser(); ctx.reveiller(); },
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      fantomeAuDepart: ctx.mode !== 'decouvrir',
      phrase: seul ? PHRASES[seul] : PHRASES.deux,
      pieces: [
        { id: 'tube', nom: 'Le tube en céramique', objets: [CG.tubeE, CG.tubeC, CA.tubeE, CA.tubeC], desc: 'Il tient la chaleur de l’arc sans brûler. Le calibre et la lettre sont écrits dessus.' },
        { id: 'capsules', nom: 'Les capsules de laiton', objets: [CG.capsE, CG.capsC, CA.capsE, CA.capsC], desc: 'Les deux bouts métalliques : le courant entre par l’une et sort par l’autre.' },
        { id: 'lame', nom: 'La lame à encoches', objets: [CG.lame, CA.lame], desc: 'Une lame de métal trouée d’encoches : aux encoches, elle est plus fine, donc elle chauffe et fond là en premier.' },
        { id: 'sable', nom: 'Le sable de silice', objets: [CG.sable, CA.sable], desc: 'Il remplit le tube. Quand la lame fond, il refroidit l’arc et l’éteint ; il fond lui-même en un petit morceau de verre.' },
        { id: 'marques', nom: 'Les marquages', objets: [CG.marques, CA.marques], desc: 'Le calibre (16 A), la lettre (gG ou aM), la tension, la taille 10 × 38. Seule la lettre distingue les deux.' },
        { id: 'support', nom: 'Les pinces et le socle', objets: [CG.support, CA.support], desc: 'Les pinces serrent les capsules et amènent le courant. En vrai, c’est le porte-fusible.' }
      ],
      commandes: [
        { id: 'type', type: 'choix', options: [['gg', 'gG seul'], ['am', 'aM seul'], ['deux', 'Les deux']], valeur: mode },
        { id: 'courant', type: 'curseur', libelle: 'Le courant qui traverse', min: 1, max: 20, pas: 0.5, valeur: 1, format: v => String(v).replace('.', ',') + ' × le calibre' },
        { id: 'etat', type: 'choix', options: [['intacte', 'Cartouche intacte'], ['fondue', 'Après un défaut']], valeur: 'intacte' }
      ],
      etapes: [
        { titre: 'Dans la cartouche', piece: 'lame', voirDedans: true, actions: [['phase', 'repos']],
          vue: { azimut: 8, elevation: 12, zoom: 1.0 },
          texte: 'Coupée en deux : un tube de céramique, deux capsules de laiton, une lame à encoches, et du sable tout autour. En haut le gG, en bas l’aM : mêmes pièces.' },
        { titre: 'Surcharge : la lame chauffe aux encoches', voirDedans: true, actions: [['phase', 'chauffe']],
          vue: { azimut: 4, elevation: 8, zoom: 1.6, cible: [0, 13, 0] }, duree: 7,
          texte: 'Deux fois et demie le calibre, longtemps. Aux encoches, la lame est plus fine : c’est là qu’elle chauffe le plus. L’aM, en bas, reste tiède : il n’est pas fait pour ça.' },
        { titre: 'La lame fond à une encoche : l’arc naît', ralenti: true, actions: [['phase', 'fond']],
          vue: { azimut: 4, elevation: 8, zoom: 2.4, cible: [3, 13, 0] }, duree: 7,
          texte: 'Une encoche fond : la lame est coupée. Mais le courant saute encore l’écart : c’est l’arc, très chaud.' },
        { titre: 'Le sable étouffe l’arc', piece: 'sable', actions: [['phase', 'sable']],
          vue: { azimut: 4, elevation: 8, zoom: 2.4, cible: [3, 13, 0] },
          texte: 'Le sable refroidit l’arc et l’éteint. Il fond lui-même en un petit morceau de verre. Le circuit est ouvert : la cartouche est morte, on la remplace.' },
        { titre: 'La pointe de démarrage : le gG fond, l’aM tient', piece: 'lame', actions: [['phase', 'demarrage']],
          vue: { azimut: 6, elevation: 10, zoom: 1.0 }, duree: 7,
          texte: 'Un moteur démarre : six fois le calibre pendant deux secondes. Le gG fond. L’aM chauffe, mais la pointe est finie avant : il tient.' },
        { titre: 'Court-circuit : plusieurs encoches fondent d’un coup', ralenti: true, actions: [['phase', 'court']],
          vue: { azimut: 6, elevation: 10, zoom: 1.15 }, duree: 7,
          texte: 'Vingt fois le calibre : les deux cartouches fondent à toutes leurs encoches en même temps. Plusieurs arcs, que le sable étouffe.' }
      ],
      eclate: [
        { objets: [CG.capsC, CA.capsC], vers: [0, 0, 16], debut: 0, fin: 0.5 },
        { objets: [CG.lame, CA.lame], vers: [0, 0, 9], debut: 0.3, fin: 0.8 },
        { objets: [CG.sable, CA.sable], vers: [0, 0, 4], debut: 0.4, fin: 0.9 }
      ],
      eclateVue: { azimut: 34, elevation: 14, zoom: 0.95 },
      surEclate(on) { eclatee = on; if (on && !coupe) { coupe = true; poser(); } },
      agir,
      animer(dt) {
        let actif = false;
        [CG, CA].forEach(C => {
          if (!C.groupe.visible) return;
          if (C.tPointe > 0) { C.tPointe -= dt; if (C.tPointe <= 0 && !C.fondu) { C.k = 1; C.D = Infinity; } }
          if (!C.fondu) {
            const eq = K.clamp(0.5 * Math.pow(C.k / (C.type === 'gG' ? 1.3 : 4), 2), 0, 0.85);
            if (C.gel >= 0) C.chaleur = K.vers(C.chaleur, C.gel, 2.5, dt);
            else if (isFinite(C.D)) { C.t += dt; C.chaleur = Math.min(1, Math.max(C.chaleur, C.t / C.D)); if (C.t >= C.D) fondre(C, tempsFusion(C.type, C.k) < 0.05, false); }
            else C.chaleur = K.vers(C.chaleur, C.tPointe > 0 ? 0.7 : eq, 1.5, dt);
            C.grains.regler({ debit: eclatee ? 0 : 1, vitesse: 22 + C.k * 4 });
            actif = true;
          } else if (!pasAPas || C.tArc <= 0) C.chaleur = Math.max(0, C.chaleur - dt * 0.25);
          K.chaleur(C.matCol, C.chaleur * 1.45);
          K.chaleur(C.matLame, C.chaleur * 0.55);
          if (C.tArc > 0) {
            C.tArc -= dt; actif = true;
            C.arcs.forEach(c => c.arc.regler(C.tArc > 0 && coupe));
            if (C.tArc <= 0) C.arcs.forEach(c => { c.verre.visible = true; });
          }
          C.cols.forEach(c => { if (c.arc.animer(dt)) actif = true; });
          if (C.grains.animer(dt)) actif = true;
          if (C.chaleur > 0.01) actif = true;
        });
        majMesures();
        return actif;
      }
    };
  }, { famille: 'protection', titre: 'La cartouche fusible', stations: ['4.1', '4.2'] });
})();
