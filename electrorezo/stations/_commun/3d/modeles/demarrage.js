/* ÉlectroRézo 3D — famille « demarrage » : la CTP et les condensateurs (démarrage et marche).
   Unités : millimètres. Repère : X largeur, Y hauteur, Z profondeur (+Z = face avant).

   CTP : un disque de céramique « pierreux » est pincé entre deux lames, en série avec l'auxiliaire.
   Froid, il laisse passer le courant (quelques ohms) : le moteur démarre. Ce courant le chauffe ; en une
   à deux secondes il dépasse 100 °C et 1 000 Ω, le courant de l'auxiliaire tombe à quelques milliampères.
   Il faut au moins 5 minutes d'arrêt pour qu'il refroidisse ; relancé trop tôt, le moteur ne démarre pas
   et le Klixon coupe. Panne courante : la connexion interne est coupée.
   Le temps de chauffe est allongé à l'écran (environ 3,5 s) pour qu'on le voie ; le refroidissement
   (5 minutes) est un curseur : on fait passer le temps à la main. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('ctp', (T, K, ctx) => {
    const M = K.mat;
    const PI = Math.PI;
    const racine = new T.Group();

    /* ---------------------------------------------------------------- cotes (à confirmer sur une CTP réelle) */
    const L = 34, H = 26, P = 22;                         /* boîtier : largeur, hauteur, profondeur */
    const Z_AR = -P / 2, Z_AV = P / 2, E_AR = 2, E_AV = 2.2, E_PAROI = 1.6;
    const Z_INT_AR = Z_AR + E_AR, Z_INT_AV = Z_AV - E_AV; /* -9 et 8,8 */
    const XB = 7;                                         /* x des deux bornes (côté neutre à gauche, côté S à droite) */
    const R_DISQUE = 7.5, E_DISQUE = 4.4, Z_DISQUE = 0.5;
    const X_LAME = E_DISQUE / 2 + 0.35;                   /* centre d'une lame : contre la face du disque */
    const Z_LIEN = Z_INT_AR + 0.6;                        /* le lien qui va de la lame à la borne, contre la plaque arrière */
    const VCHAUF = 1 / 3.5, VREFR = 1 / 6;                /* par seconde : chauffe (3,5 s à l'écran), refroidit (le « temps » du curseur) */

    /* ---------------------------------------------------------------- matières */
    const noir = K.plastique(0x2b2f34, 0.5);
    const texPierre = (() => {       /* un grain de pierre : des taches claires et sombres */
      const c = document.createElement('canvas'); c.width = c.height = 128;
      const x = c.getContext('2d'); x.fillStyle = '#d9ceb6'; x.fillRect(0, 0, 128, 128);
      for (let i = 0; i < 1100; i++) {
        const g = 150 + Math.random() * 100 | 0, s = 1 + Math.random() * 2.6;
        x.fillStyle = 'rgba(' + g + ',' + (g - 12) + ',' + (g - 34) + ',' + (0.35 + Math.random() * 0.4) + ')';
        x.fillRect(Math.random() * 128, Math.random() * 128, s, s);
      }
      for (let i = 0; i < 260; i++) { x.fillStyle = 'rgba(88,76,60,' + (0.12 + Math.random() * 0.25) + ')'; x.fillRect(Math.random() * 128, Math.random() * 128, 1 + Math.random() * 1.8, 1 + Math.random() * 1.8); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; return t;
    })();
    const matDisque = new T.MeshStandardMaterial({ color: 0xffffff, map: texPierre, roughness: 0.96, metalness: 0 });

    /* ---------------------------------------------------------------- le boîtier */
    const contour = (w, h, r) => K.formeArrondie(w, h, r);
    const fBague = contour(L, H, 3.4);
    fBague.holes.push(contour(L - 2 * E_PAROI, H - 2 * E_PAROI, 2));
    const bague = K.mesh(K.extrusion(fBague, Z_INT_AV - Z_INT_AR), noir);
    bague.position.z = (Z_INT_AV + Z_INT_AR) / 2;
    const capotFace = K.mesh(K.boite(L, H, E_AV, 3), noir, 0, 0, Z_AV - E_AV / 2);
    const fPlaque = contour(L, H, 3.4);
    [-XB, XB].forEach(x => { const t = new T.Path(); t.absarc(x, 0, 2.75, 0, PI * 2, true); fPlaque.holes.push(t); });
    const plaque = K.mesh(K.extrusion(fPlaque, E_AR), noir, 0, 0, Z_AR + E_AR / 2);
    /* trois fentes sur la face avant : l'air chaud sort */
    const fentes = new T.Group();
    [6.5, 2, -2.5].forEach(y => fentes.add(K.mesh(new T.BoxGeometry(18, 1.1, 0.7), M.sombre, 0, y, Z_AV - 0.05)));
    racine.add(bague, capotFace, plaque, fentes);

    /* ---------------------------------------------------------------- les deux bornes (fourreaux à embrocher) */
    const fourreau = x => {
      const g = new T.Group();
      g.add(K.cylZ(2.7, 6, M.laiton, x, 0, -12.1, 24));                /* z -15,1 → -9,1 */
      g.add(K.cylZ(1.7, 0.3, M.sombre, x, 0, -15.1, 20));              /* l'ouverture */
      return g;
    };
    const borneN = fourreau(-XB), borneS = fourreau(XB);
    racine.add(borneN, borneS);

    /* ---------------------------------------------------------------- le disque de céramique */
    const disque = K.cylX(R_DISQUE, E_DISQUE, matDisque, 0, 0, Z_DISQUE, 44);
    /* la chaleur du disque : une peau orange par-dessus, pour qu'elle se voie même quand la pièce est allumée */
    const matChaleur = new T.MeshBasicMaterial({ color: 0xff6a10, transparent: true, opacity: 0, depthWrite: false, toneMapped: false });
    const peau = K.cylX(R_DISQUE + 0.18, E_DISQUE + 0.12, matChaleur, 0, 0, Z_DISQUE, 44);
    peau.visible = false; peau.raycast = () => {}; peau.userData.decor = true; peau.userData.sansOmbre = true; peau.castShadow = false;
    racine.add(disque, peau);

    /* ---------------------------------------------------------------- les deux lames (un ressort contre chaque face) */
    const lame = s => {          /* s = -1 : côté neutre (gauche) ; +1 : côté S (droite) */
      const g = new T.Group();
      g.add(K.mesh(new T.BoxGeometry(0.7, 17, 5), M.cuivre, s * X_LAME, 0, Z_DISQUE));                         /* la lame, plaquée sur le disque */
      g.add(K.mesh(new T.BoxGeometry(0.7, 2.4, Z_DISQUE - 2 - Z_INT_AR), M.cuivre, s * X_LAME, 0, (Z_DISQUE - 2 + Z_INT_AR) / 2)); /* le bras vers l'arrière */
      return g;
    };
    const lienVers = s => K.mesh(new T.BoxGeometry(XB - 2.2, 2.4, 1.2), M.cuivre, s * (XB + 2.2) / 2, 0, Z_LIEN);   /* le lien vers la borne : il reste en place */
    const lameN = lame(-1), lameS = lame(1), lienN = lienVers(-1), lienS = lienVers(1);
    const pastille = s => { const m = K.mesh(K.sphere(2, 20), M.argent, s * (X_LAME + 0.2), 0, Z_DISQUE); m.scale.x = 0.38; return m; };   /* une pastille bombée, comme un rivet */
    const pastN = pastille(-1), pastS = pastille(1);
    const contacts = K.groupe(pastN, pastS);
    racine.add(lameN, lameS, lienN, lienS, contacts);

    /* ---------------------------------------------------------------- le courant (auxiliaire : de la borne N à la borne S) */
    const GX = 3.5, ZG = Z_LIEN + 1.2;
    const chemin = K.chemin([
      [-XB, 0, Z_INT_AR - 0.2], [-XB, 0, ZG], [-GX, 0, ZG], [-GX, 0, Z_DISQUE],
      [GX, 0, Z_DISQUE],
      [GX, 0, ZG], [XB, 0, ZG], [XB, 0, Z_INT_AR - 0.2]
    ]);
    const grains = K.courant(chemin, { pas: 4.2, rayon: 0.7, vitesse: 26 });
    grains.regler({ debit: 0, alternatif: true, frequence: 0.7 });
    racine.add(grains.objet);

    /* ---------------------------------------------------------------- l'état et le mouvement */
    let power = false, panne = false, klixon = false, hotStart = false, eclatee = false, pasAPas = false;
    let temp = 0, tCible = 0, vit = VCHAUF, tK = 0, tDecalee = 0;     /* temp : 0 froid → 1 chaud (plus de 100 °C) */
    let cleT = '', cleM = '', mAff = -1;
    const decalage = K.mobile(0, 420, 30);                            /* la lame côté neutre qui se détache (panne) */

    const gap = () => (panne ? 4 : 0);        /* un écart exagéré : sur une vraie CTP, il se compte en dixièmes */
    const courantActif = () => power && !panne && !klixon && !eclatee;
    const majGrains = () => {
      if (!courantActif()) { grains.regler({ debit: 0 }); return; }
      const f = Math.pow(1 - temp, 1.4);
      grains.regler({ debit: 0.14 + 0.86 * f, vitesse: 10 + 24 * f });
    };
    const chauffer = () => {
      K.chaleur(matDisque, temp * 1.15);
      peau.visible = temp > 0.03;
      matChaleur.opacity = 0.58 * Math.pow(temp, 1.1);
      matChaleur.color.setHex(0xc4301a).lerp(new T.Color(0xff7a1a), temp);
    };
    const placer = () => {
      lameN.position.x = -decalage.x; pastN.position.x = -(X_LAME + 0.2) - decalage.x;
    };

    const sens = () => (tCible > temp + 1e-3 ? 1 : tCible < temp - 1e-3 ? -1 : 0);
    const majMesures = () => {
      const froid = temp <= 0.05, chaud = temp >= 0.95, d = sens();
      const R = panne ? 'l’infini' : froid ? 'quelques ohms' : chaud ? 'plus de 1 000 Ω' : d > 0 ? 'elle monte' : d < 0 ? 'elle baisse' : 'encore élevée';
      const Tm = froid ? 'ambiante' : chaud ? 'plus de 100 °C' : d > 0 ? 'elle chauffe' : d < 0 ? 'elle refroidit' : 'encore chaude';
      const I = !power ? 'aucun' : panne ? 'aucun' : klixon ? 'coupé par le Klixon' : froid ? 'il passe, le moteur démarre' : chaud ? 'quelques mA' : 'il baisse';
      const liste = [
        { libelle: 'Résistance de la CTP', valeur: R },
        { libelle: 'Température du disque', valeur: Tm },
        { libelle: 'Courant de l’auxiliaire', valeur: I }
      ];
      const k = JSON.stringify(liste);
      if (k !== cleM) { cleM = k; ctx.mesures(liste); }
    };

    const PH = {
      froide: '<strong>Hors tension, la CTP est froide.</strong> Le disque de céramique est froid : sa résistance est très faible, quelques ohms.',
      demarre: '<strong>Mise sous tension.</strong> La CTP est froide : le courant passe dans l’auxiliaire et le moteur démarre.',
      chauffe: '<strong>La CTP chauffe.</strong> Le courant de l’auxiliaire traverse le disque et le chauffe : sa résistance monte. Sur une vraie CTP, cela dure une à deux secondes.',
      chaude: '<strong>La CTP est chaude.</strong> Plus de 100 °C, plus de 1 000 Ω : le courant de l’auxiliaire tombe à quelques milliampères, comme si un relais l’avait retiré. Ce petit courant la garde chaude.',
      refroidit: '<strong>Le moteur est arrêté : la CTP refroidit.</strong> Il faut au moins 5 minutes d’arrêt. Faites glisser le curseur : le temps passe.',
      relance: '<strong>Relance trop tôt.</strong> La CTP est encore chaude : elle ne laisse presque rien passer dans l’auxiliaire. Le moteur ne démarre pas et le courant du principal monte.',
      klixon: '<strong>Le Klixon a coupé.</strong> La CTP était encore chaude : le moteur n’a pas démarré, le courant du principal a monté et le Klixon a coupé. Il faut au moins 5 minutes d’arrêt avant de relancer.',
      panne: '<strong>Connexion interne coupée.</strong> Une lame ne touche plus le disque : le courant ne passe plus dans l’auxiliaire et le moteur ne démarre pas. À l’ohmmètre, entre les deux bornes, vous lisez l’infini.'
    };
    const texteEtat = () => panne ? PH.panne
      : !power ? (temp <= 0.05 ? PH.froide : PH.refroidit)
      : klixon ? PH.klixon
      : hotStart ? PH.relance
      : temp >= 0.95 ? PH.chaude : temp > 0.05 ? PH.chauffe : PH.demarre;
    const dire = () => { const t = texteEtat(); cleT = t; ctx.dire(t); };

    const syncCommandes = () => {
      ctx.regler('etat', power ? 'marche' : 'repos');
      ctx.regler('panne', panne ? 'coupee' : 'bon');
      mAff = Math.round(5 * (1 - temp) * 2) / 2;
      ctx.regler('arret', mAff, { desactive: power });
    };

    /* les temps du mouvement pas à pas : chacun fixe tout l'état, pour qu'on puisse y aller dans n'importe quel ordre */
    const phase = p => {
      pasAPas = true; klixon = false; tK = 0; hotStart = false; panne = false;
      const regle = (pw, t, tc, v) => { power = pw; temp = t; tCible = tc; if (v) vit = v; };
      if (p === 'froide')    regle(false, 0, 0);
      if (p === 'courant')   regle(true, 0, 0);                    /* sous tension, le disque encore froid : on voit le fort courant */
      if (p === 'chauffe')   regle(true, 0.28, 1, VCHAUF);
      if (p === 'chaude')    regle(true, 1, 1);
      if (p === 'refroidit') regle(false, 0.7, 0, VREFR);
      if (p === 'relance')   { regle(true, 1, 1); hotStart = true; }
      if (p === 'panne')     { regle(true, 0, 0); panne = true; }
      decalage.cible = gap();
      syncCommandes(); majGrains(); chauffer(); majMesures();
    };

    const agir = (id, val) => {
      if (id === 'phase') { phase(val); return; }
      pasAPas = false;
      if (id === 'etat') {
        if (val === 'repos') { power = false; tCible = temp; klixon = false; hotStart = false; tK = 0; }
        if (val === 'marche') {
          power = true; klixon = false; tK = 0;
          hotStart = temp > 0.05 && !panne;
          tCible = panne ? temp : 1; vit = hotStart ? VCHAUF * 0.5 : VCHAUF;
        }
      } else if (id === 'arret') {
        power = false; klixon = false; hotStart = false; tK = 0;
        temp = tCible = 1 - val / 5; mAff = val;
      } else if (id === 'panne') {
        panne = val === 'coupee'; decalage.cible = gap();
        if (power && panne) { tCible = temp; }
        if (power && !panne) { hotStart = temp > 0.05; tCible = 1; vit = hotStart ? VCHAUF * 0.5 : VCHAUF; }
      } else return;
      syncCommandes(); majGrains(); chauffer(); majMesures(); dire();
    };

    chauffer(); majMesures(); majGrains();
    ctx.regler('arret', 5, { desactive: false });

    return {
      racine,
      /* « comprendre » : de côté, là où l'on voit le disque entre ses deux lames ;
         « découvrir » : de trois quarts, avec la face qui porte les fentes */
      vue: ctx.mode === 'decouvrir' ? { azimut: -34, elevation: 22, zoom: 1.3, cadre: [bague, capotFace, plaque], marge: 1.15 }
                                    : { azimut: -32, elevation: 24, zoom: 1.35, cadre: [bague, capotFace, plaque], marge: 1.15 },
      fantome: [bague, capotFace, plaque, fentes],
      phrase: PH.froide,
      pieces: [
        { id: 'boitier', nom: 'Le boîtier', objets: [bague, capotFace, plaque, fentes], desc: 'Un petit boîtier en plastique noir, percé de fentes. « Voir dedans » le rend transparent.' },
        { id: 'disque', nom: 'Le disque de céramique', objets: [disque], desc: 'Un disque en matière pierreuse. Froid, il laisse passer le courant. Chaud, sa résistance devient très grande. C’est lui, la CTP.' },
        { id: 'lameN', nom: 'La lame côté neutre', objets: [lameN, lienN], desc: 'Une lame de cuivre plaquée contre une face du disque. Elle le relie à la borne côté neutre.' },
        { id: 'lameS', nom: 'La lame côté S', objets: [lameS, lienS], desc: 'Une lame de cuivre plaquée contre l’autre face du disque. Elle le relie à la borne côté S.' },
        { id: 'contacts', nom: 'Les pastilles de contact', objets: [contacts], desc: 'De petites pastilles d’argent sur les lames, à l’endroit où elles pressent le disque.' },
        { id: 'borneN', nom: 'La borne côté neutre', objets: [borneN], desc: 'Un fourreau en laiton. Le fil de l’auxiliaire revient ici vers le neutre.' },
        { id: 'borneS', nom: 'La borne côté S', objets: [borneS], desc: 'Un fourreau en laiton. Il part vers la borne S du compresseur : la CTP est en série avec l’auxiliaire.' }
      ],
      commandes: [
        { id: 'etat', type: 'choix', titre: 'Le moteur', options: [['repos', 'Hors tension'], ['marche', 'Mise sous tension']], valeur: 'repos' },
        { id: 'arret', type: 'curseur', libelle: 'Le temps d’arrêt', min: 0, max: 5, pas: 0.5, unite: 'min', valeur: 5 },
        { id: 'panne', type: 'choix', titre: 'La CTP', options: [['bon', 'En bon état'], ['coupee', 'Connexion coupée']], valeur: 'bon' }
      ],
      etapes: [
        { titre: 'Hors tension, la CTP est froide', piece: 'disque', voirDedans: true, actions: [['phase', 'froide']],
          vue: { azimut: -32, elevation: 24, zoom: 1.4 },
          texte: 'Le disque de céramique est froid. Sa résistance est très faible : quelques ohms.' },
        { titre: 'Mise sous tension : le courant passe', piece: 'lameN', voirDedans: true, actions: [['phase', 'courant']],
          vue: { azimut: -32, elevation: 24, zoom: 1.4 }, duree: 7,
          texte: 'Le courant de l’auxiliaire entre par une borne, traverse le disque et sort par l’autre. Suivez les grains : il passe, le moteur démarre.' },
        { titre: 'Le courant chauffe le disque', piece: 'disque', voirDedans: true, actions: [['phase', 'chauffe']],
          vue: { azimut: -36, elevation: 26, zoom: 1.45 }, duree: 7,
          texte: 'Le courant traverse le disque et le chauffe. Sa résistance monte. Sur une vraie CTP, cela dure une à deux secondes.' },
        { titre: 'Chaude : le courant tombe', piece: 'disque', voirDedans: true, actions: [['phase', 'chaude']],
          vue: { azimut: -36, elevation: 26, zoom: 1.45 }, duree: 8,
          texte: 'Le disque dépasse 100 °C et 1 000 Ω. Le courant de l’auxiliaire tombe à quelques milliampères, comme si un relais l’avait retiré. Ce petit courant garde le disque chaud.' },
        { titre: 'À l’arrêt : au moins 5 minutes pour refroidir', piece: 'disque', voirDedans: true, actions: [['phase', 'refroidit']],
          vue: { azimut: -36, elevation: 26, zoom: 1.45 }, duree: 8,
          texte: 'Moteur arrêté, le disque refroidit lentement. Il faut au moins 5 minutes. Ici, le temps est accéléré : regardez la couleur du disque.' },
        { titre: 'Relance trop tôt : le moteur ne démarre pas', piece: 'disque', voirDedans: true, actions: [['phase', 'relance']],
          vue: { azimut: -36, elevation: 26, zoom: 1.45 }, duree: 9,
          texte: 'Le disque est encore chaud. Il laisse presque rien passer dans l’auxiliaire : le moteur ne démarre pas, le courant du principal monte, et le Klixon coupe.' }
      ],
      /* l'éclaté, dans l'ordre du démontage : le capot sort vers l'avant, le disque monte, les lames s'écartent
         de chaque côté, puis la plaque et les bornes sortent par l'arrière */
      eclate: [
        { objets: [bague, capotFace, fentes], vers: [0, 0, 44], debut: 0, fin: 0.5 },
        { objets: [disque, peau], vers: [0, 34, 0], debut: 0.15, fin: 0.65 },
        { objets: [lameN, lienN, pastN], vers: [-24, 0, 0], debut: 0.3, fin: 0.8 },
        { objets: [lameS, lienS, pastS], vers: [24, 0, 0], debut: 0.3, fin: 0.8 },
        { objets: [plaque], vers: [0, 0, -18], debut: 0.5, fin: 0.9 },
        { objets: [borneN], vers: [-10, 0, -38], debut: 0.55, fin: 1 },
        { objets: [borneS], vers: [10, 0, -38], debut: 0.55, fin: 1 }
      ],
      eclateVue: { azimut: -48, elevation: 20, zoom: 0.5, cible: [0, 6, 0] },
      surEclate(on) { eclatee = on; majGrains(); },
      agir,
      detruire() { texPierre.dispose(); matDisque.dispose(); matChaleur.dispose(); },
      animer(dt) {
        let actif = false;
        /* la température du disque */
        if (temp !== tCible) {
          const d = tCible - temp;
          temp = Math.abs(d) <= vit * dt ? tCible : temp + Math.sign(d) * vit * dt;
          actif = true; chauffer(); majGrains();
          if (!power) {
            const m = Math.round(5 * (1 - temp) * 2) / 2;
            if (m !== mAff) { mAff = m; ctx.regler('arret', m); }
          }
        }
        /* relance à chaud : au bout d'un moment le Klixon coupe */
        if (power && hotStart && !klixon && !panne) {
          tK += dt; actif = true;
          if (tK >= 2.5) { klixon = true; majGrains(); }
        }
        /* la lame qui se détache */
        if (decalage.pas(dt)) { actif = true; placer(); } else placer();
        if (grains.animer(dt)) actif = true;
        majMesures();
        if (!pasAPas && texteEtat() !== cleT) dire();
        return actif;
      }
    };
  }, { famille: 'demarrage', titre: 'La CTP', stations: ['9.3'] });

  /* ====================================================================================================
     Les condensateurs : celui de démarrage (électrolytique, petit, noir) à gauche, celui de marche (au papier,
     grand) à droite. Unités : mm. +Z = face avant ; les cosses sont sur le dessus.

     Ce que l'élève doit VOIR : deux plaques très proches, qui se chargent sous tension (billes rouges et grises).
     Quand la tension est coupée, les billes RESTENT : le condensateur reste chargé. On le décharge avec une
     résistance (pinces posées sur les deux cosses, les billes s'écoulent). Le condensateur de démarrage chauffe s'il reste plus de 5 secondes sous tension, celui de
     marche est fait pour y rester. Les défauts se voient dedans : fil coupé, plaques qui se touchent, enveloppe
     gonflée. Les plaques sont dessinées en deux tubes (la vraie pièce est enroulée).
     L'alimentation n'est pas dessinée : on regarde le condensateur sur l'établi. */
  Electro3D.definir('condensateurs', (T, K, ctx) => {
    const M = K.mat;
    const PI = Math.PI;
    const racine = new T.Group();
    const libre = [];                        /* ce qu'il faudra libérer */
    const DEPART = 5;                        /* secondes sous tension au plus pour le condensateur de démarrage */
    const TAU = 1.8;                         /* la décharge par la résistance : durée accélérée à l'écran (en vrai : quelques minutes) */
    const NR = 3, NC = 12, NB = NR * NC;     /* les billes d'une plaque */

    /* ---------------------------------------------------------------- matières */
    const matCorpsD = K.plastique(0x1f2226, 0.5);
    const matCapD = K.plastique(0x363b42, 0.55);
    const matCorpsM = M.aluminium;
    const matCapM = K.plastique(0x1f2226, 0.5);
    const rouge = K.lumineux(0xe0452d), ardoise = K.lumineux(0x2e3742);
    const deuxFaces = m => { const c = K.propre(m); c.side = T.DoubleSide; return c; };
    /* les plaques sont dessinées à demi transparentes : on voit les billes à travers, comme sur une coupe */
    const matA = deuxFaces(M.aluminium), matB = deuxFaces(M.acier);
    [[matA, 0.14], [matB, 0.2]].forEach(([m, o]) => { m.transparent = true; m.opacity = o; m.depthWrite = false; });
    const papierMat = deuxFaces(M.sable); papierMat.transparent = true; papierMat.opacity = 0.16; papierMat.depthWrite = false;
    const geoBille = new T.SphereGeometry(1.4, 10, 8); libre.push(geoBille);

    /* un marquage imprimé sur le corps : une bande courbe, fond et lettres opaques */
    const etiquette = (lignes, r, h, arcDeg, fond, texte) => {
      const arc = arcDeg * PI / 180, larg = r * arc, pxmm = 12;
      const c = document.createElement('canvas'); c.width = Math.round(larg * pxmm); c.height = Math.round(h * pxmm);
      const x = c.getContext('2d');
      x.fillStyle = fond; x.fillRect(0, 0, c.width, c.height);
      x.strokeStyle = texte; x.lineWidth = 4; x.strokeRect(6, 6, c.width - 12, c.height - 12);
      x.fillStyle = texte; x.textAlign = 'center'; x.textBaseline = 'middle';
      lignes.forEach((l, i) => {
        let px = c.height / lignes.length * 0.62;
        x.font = '800 ' + px + 'px Calibri, "Segoe UI", Arial, sans-serif';
        while (x.measureText(l).width > c.width * 0.86 && px > 10) { px -= 2; x.font = '800 ' + px + 'px Calibri, "Segoe UI", Arial, sans-serif'; }
        x.fillText(l, c.width / 2, c.height * (i + 0.5) / lignes.length);
      });
      const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4;
      const geo = new T.CylinderGeometry(r + 0.08, r + 0.08, h, 40, 1, true, -arc / 2, arc);
      const mat = new T.MeshStandardMaterial({ map: t, roughness: 0.5, metalness: 0 });
      libre.push(t, geo, mat);
      return new T.Mesh(geo, mat);
    };

    /* ---------------------------------------------------------------- un condensateur, avec sa résistance de décharge */
    const condo = o => {
      const g = new T.Group(); g.position.x = o.x; racine.add(g);
      const { r, h, dx, rA } = o, rB = rA - 4;
      const yTop = h - 7, yBt = yTop - 6, y0 = 5, yC = h + 9.85;     /* haut des plaques, haut de la plaque intérieure, bas, centre des cosses */
      const k = { g, r, h, dx };

      /* le corps (entier, puis gonflé), le couvercle, l'évent */
      k.corps = K.cylY(r, h, o.matCorps, 0, h / 2, 0, 40);
      const profil = new T.SplineCurve([new T.Vector2(r * 0.99, 0), new T.Vector2(r + 0.9, h * 0.3), new T.Vector2(r + 3.4, h * 0.65), new T.Vector2(r + 2.6, h * 0.9), new T.Vector2(r * 0.7, h + 2)]).getPoints(20);
      profil.unshift(new T.Vector2(0, 0)); profil.push(new T.Vector2(0, h + 2.4));
      const geoG = new T.LatheGeometry(profil, 40); libre.push(geoG);
      k.corpsG = K.mesh(geoG, o.matCorps); k.corpsG.visible = false;
      k.cap = K.cylY(r * 0.88, 3, o.matCap, 0, h + 1.5, 0, 36);
      k.evt = K.cylY(1.3, 0.5, M.sombre, 0, h + 3.1, 0, 12);
      k.etiq = etiquette(o.lignes, r, o.labH, o.arc, o.fondEt, o.texteEt); k.etiq.position.y = o.labY;

      /* les deux cosses plates, sur un petit socle */
      k.pattes = new T.Group();
      [-1, 1].forEach(s => {
        k.pattes.add(K.cylY(3.4, 2.2, o.matCap, s * dx, h + 4.1, 0, 20));
        k.pattes.add(K.mesh(new T.BoxGeometry(6.3, 10.5, 0.8), M.zingue, s * dx, yC, 0));
        k.pattes.add(K.cylZ(0.9, 1.0, M.sombre, s * dx, h + 12.6, 0, 12));
      });

      /* les fils intérieurs : de chaque cosse à une plaque */
      const barre = (A, B) => K.barre(A, B, 0.8, M.cuivre, 10);
      k.fils = new T.Group();
      k.filBh = barre([dx, yBt + 0.6, 0], [rB, yBt + 0.6, 0]); k.filBh.userData.y0 = k.filBh.position.y;
      k.fils.add(barre([-dx, h + 0.3, 0], [-dx, yTop + 0.6, 0]), barre([-dx, yTop + 0.6, 0], [-rA, yTop + 0.6, 0]), barre([dx, h + 0.3, 0], [dx, yBt + 0.6, 0]), k.filBh);

      /* ce qui se lève avec le couvercle */
      k.haut = new T.Group(); k.haut.add(k.cap, k.evt, k.pattes, k.fils);

      /* la résistance de décharge intégrée (sur certains condensateurs de démarrage) : environ 15 kΩ, marron vert orange */
      if (o.resi) {
        k.resi = new T.Group(); const yR = h - 3.2;
        k.resi.add(K.cylX(1.9, 8.4, K.plastique(0xd8c9a0, 0.6), 0, yR, 0, 16));
        [[-2.6, 0x6b3a1e], [-0.9, 0x2f8a3e], [0.8, 0xe07a1a], [2.9, 0xc9a227]].forEach(([x, c]) => k.resi.add(K.cylX(1.98, 0.9, K.plastique(c, 0.5), x, yR, 0, 16)));
        [-1, 1].forEach(s => k.resi.add(K.cylX(0.35, dx - 0.6 - 4.2, M.cuivre, s * (4.2 + (dx - 0.6 - 4.2) / 2), yR, 0, 8)));
        k.haut.add(k.resi);
      }

      /* le rouleau : deux plaques, l'isolant entre elles, les billes d'électricité */
      k.interne = new T.Group();
      k.anneauA = K.mesh(K.anneau(rA + 0.4, rA - 0.4, yTop - y0, 40), matA, 0, (y0 + yTop) / 2, 0);
      k.anneauB = K.mesh(K.anneau(rB + 0.4, rB - 0.4, yBt - y0, 40), matB, 0, (y0 + yBt) / 2, 0);
      k.papier = K.mesh(K.anneau(rA - 0.4, rB + 0.4, yTop - 1.5 - y0, 40), papierMat, 0, (y0 + yTop - 1.5) / 2, 0);
      k.pont = K.mesh(new T.BoxGeometry(rA - rB - 0.4 + 0.8, 12, 6), M.plastiqueRouge, -(rA + rB) / 2, (y0 + yBt) / 2, 0); k.pont.visible = false;   /* les plaques se touchent */
      const posB = [];
      for (let i = 0; i < NR; i++) for (let j = 0; j < NC; j++) posB.push([(j + (i % 2) * 0.5) / NC * 2 * PI, y0 + 4 + i * (yBt - y0 - 8) / (NR - 1)]);
      k.iA = new T.InstancedMesh(geoBille, rouge, NB); k.iB = new T.InstancedMesh(geoBille, ardoise, NB);
      [k.iA, k.iB].forEach(m => { m.frustumCulled = false; m.userData.sansOmbre = true; m.castShadow = false; });
      const m4 = new T.Matrix4(), q = new T.Quaternion(), sc = new T.Vector3(), pp = new T.Vector3();
      k.poserCharges = n => {
        for (let i = 0; i < NB; i++) {
          const [a, y] = posB[(i * 17) % NB]; sc.setScalar(i < n ? 1 : 0);
          m4.compose(pp.set((rA - 1.2) * Math.sin(a), y, (rA - 1.2) * Math.cos(a)), q, sc); k.iA.setMatrixAt(i, m4);
          m4.compose(pp.set((rB + 1.2) * Math.sin(a + PI / NC), y, (rB + 1.2) * Math.cos(a + PI / NC)), q, sc); k.iB.setMatrixAt(i, m4);   /* décalées d'un demi-pas : elles se font face sans se toucher */
        }
        k.iA.instanceMatrix.needsUpdate = true; k.iB.instanceMatrix.needsUpdate = true;
      };
      k.poserCharges(0);
      k.interne.add(k.anneauA, k.anneauB, k.papier, k.pont, k.iA, k.iB);

      /* la chaleur du condensateur de démarrage : une peau orange par-dessus (elle reste visible quand le corps est fantôme ou allumé) */
      if (o.chaleur) {
        k.matChaleur = new T.MeshBasicMaterial({ color: 0xff6a10, transparent: true, opacity: 0, depthWrite: false, toneMapped: false }); libre.push(k.matChaleur);
        k.peau = K.cylY(r + 0.3, h + 0.4, k.matChaleur, 0, h / 2, 0, 40);
        k.peau.visible = false; k.peau.raycast = () => {}; k.peau.userData.decor = true; k.peau.userData.sansOmbre = true; k.peau.castShadow = false;
        g.add(k.peau);
      }

      /* le courant qui charge : dans chaque fil intérieur, il va et vient (alternatif) */
      const fil = (s, yBas, xFin) => K.courant(K.chemin([[s * dx, h + 14, 0.9], [s * dx, h + 3.6, 0.9], [s * dx, h + 3, 0], [s * dx, yBas, 0], [xFin, yBas, 0]]), { pas: 3.4, rayon: 0.75, vitesse: 22 });
      k.gA = fil(-1, yTop + 0.6, -(rA - 0.9)); k.gB = fil(1, yBt + 0.6, rB - 0.9);
      [k.gA, k.gB].forEach(c => { c.regler({ debit: 0, alternatif: true, frequence: 0.7 }); g.add(c.objet); });

      /* la résistance de décharge (l'outil), posée devant, et ses deux pinces : à l'emploi, les pinces montent sur les cosses et la résistance
         qu'elles portent se tient au-dessus de l'étiquette, jamais devant elle */
      const zT = r + 22, xE = 12.2;
      k.outil = new T.Group();
      const res = new T.Group();
      k.outilCorps = K.cylX(3.1, 20, M.ceramique, 0, 0, 0, 24);
      res.add(k.outilCorps, K.cylX(3.3, 2.2, M.laiton, -11.1, 0, 0, 16), K.cylX(3.3, 2.2, M.laiton, 11.1, 0, 0, 16));
      const resRepos = new T.Vector3(0, 3.1, zT), resPose = new T.Vector3(0, h + 10, r + 10);
      res.position.copy(resRepos);
      k.outil.add(res);
      const fil2 = c => K.mesh(K.cylindre(0.7, 1, 10), K.isolant(c));
      const pince = m => K.mesh(K.boite(6.6, 9, 5, 1), m);
      const filA = fil2('rouge'), filB2 = fil2('noir'), pinceA = pince(M.plastiqueRouge), pinceB = pince(M.plastiqueNoir);
      k.outil.add(filA, filB2, pinceA, pinceB);
      const reposA = new T.Vector3(-22, 4.5, zT + 3), reposB = new T.Vector3(22, 4.5, zT + 3);
      const posePinceA = new T.Vector3(-dx, h + 11, 2.9), posePinceB = new T.Vector3(dx, h + 11, 2.9);
      const yHaut = h + 26;
      const trajet = (rep, pose, s, sortie) => {
        if (s < 0.55) { const u = K.lisse(s / 0.55); return sortie.set(rep.x, rep.y + (yHaut - rep.y) * u, rep.z); }
        const v = K.lisse((s - 0.55) / 0.45);
        return sortie.set(rep.x + (pose.x - rep.x) * v, yHaut + (pose.y - yHaut) * v, rep.z + (pose.z - rep.z) * v);
      };
      k.placerOutil = s => {
        trajet(reposA, posePinceA, s, pinceA.position); trajet(reposB, posePinceB, s, pinceB.position); trajet(resRepos, resPose, s, res.position);
        K.tigeEntre(filA, [res.position.x - xE, res.position.y, res.position.z], pinceA.position);
        K.tigeEntre(filB2, [res.position.x + xE, res.position.y, res.position.z], pinceB.position);
      };
      k.placerOutil(0);
      g.add(k.outil);
      /* le courant de décharge : de la pince A à la pince B, par la résistance (il s'écoule dans un seul sens) */
      k.gR = K.courant(K.chemin([posePinceA, [-xE, resPose.y, resPose.z], [xE, resPose.y, resPose.z], posePinceB]), { pas: 7, rayon: 1.1, vitesse: 30 });
      k.gR.regler({ debit: 0, alternatif: false }); g.add(k.gR.objet);

      g.add(k.corps, k.corpsG, k.etiq, k.haut, k.interne);
      return k;
    };
    const D = condo({ x: -34, r: 17, h: 58, dx: 7, rA: 14, matCorps: matCorpsD, matCap: matCapD, lignes: ['60 µF ±10 %', '240 V'], labH: 22, labY: 26, arc: 100, fondEt: '#1f2226', texteEt: '#eef0f2', resi: true, chaleur: true });
    const R = condo({ x: 34, r: 22, h: 84, dx: 9, rA: 19, matCorps: matCorpsM, matCap: matCapM, lignes: ['20 µF', '360 V'], labH: 28, labY: 40, arc: 90, fondEt: '#c9ced3', texteEt: '#1b2430', resi: false, chaleur: false });
    const caps = [D, R];

    /* ---------------------------------------------------------------- l'état et le mouvement */
    let power = false, c = 0, dech = false, defaut = 'bon';       /* dech : on a déchargé avec la résistance */
    let cibleOutil = 0, uOutil = 0;
    let tDem = 0, hD = 0, tPol = 0, pol = 0, nVis = -1, message = '', eclatee = false, pasAPas = false, cEtat = '';
    let cleT = '', cleM = '';
    const peutCharger = () => defaut === 'bon' || defaut === 'gonfle';
    const vers = (a, b, d) => (a < b ? Math.min(b, a + d) : Math.max(b, a - d));

    const majVisuels = () => {
      const df = eclatee ? 'bon' : defaut, gon = df === 'gonfle';      /* l'éclaté montre toujours les pièces en bon état */
      caps.forEach(k => {
        k.corps.visible = !gon; k.corpsG.visible = gon; k.haut.position.y = gon ? 3.5 : 0;
        k.etiq.scale.set(gon ? 1.1 : 1, 1, gon ? 1.1 : 1);
        k.filBh.position.y = k.filBh.userData.y0 - (df === 'coupe' ? 7 : 0);
        k.pont.visible = df === 'court';
      });
    };
    const majChaleur = () => {
      const k = D;
      k.peau.visible = hD > 0.03;
      k.matChaleur.opacity = 0.38 * Math.pow(hD, 1.1);
      k.matChaleur.color.setHex(0xc4301a).lerp(new T.Color(0xff7a1a), hD);
    };
    const majGrains = () => {
      const flux = power && !eclatee && peutCharger();
      const relie = uOutil >= 0.999 && c > 0.03 && !eclatee && dech;
      caps.forEach(k => {
        k.gA.regler({ debit: flux ? 1 : 0 }); k.gB.regler({ debit: flux ? 1 : 0 });
        k.gR.regler({ debit: relie ? K.clamp(c * 1.3, 0.2, 1) : 0, vitesse: 14 + 26 * c });
      });
    };
    const majCharges = () => {
      const n = Math.ceil(NB * c - 1e-6);
      if (n !== nVis) { nVis = n; caps.forEach(k => k.poserCharges(n)); majGrains(); }
    };
    const razOutils = () => {
      cibleOutil = uOutil = 0;
      caps.forEach(k => k.placerOutil(0));
    };

    const majMesures = () => {
      const charge = power && !peutCharger() ? 'ne se chargent pas' : c > 0.97 ? 'chargés' : c < 0.03 ? 'déchargés' : 'se déchargent';
      const ohm = power ? 'jamais sous tension' : c > 0.03 ? 'déchargez d’abord'
        : defaut === 'bon' ? 'part vers 0, remonte vers l’infini' : defaut === 'coupe' ? 'l’infini en permanence'
        : defaut === 'court' ? '0 ou presque en permanence' : 'enveloppe gonflée : anormale';
      const liste = [
        { libelle: 'Charge des condensateurs', valeur: charge },
        { libelle: 'Condensateur de démarrage', valeur: power ? 'sous tension depuis ' + Math.floor(tDem) + ' s (5 s au plus)' : 'hors tension' },
        { libelle: 'Ohmmètre entre les deux cosses', valeur: ohm }
      ];
      const kk = JSON.stringify(liste);
      if (kk !== cleM) { cleM = kk; ctx.mesures(liste); }
    };

    const PH = {
      repos: '<strong>Hors tension, déchargés.</strong> À gauche, le condensateur de démarrage : petit et noir. À droite, le condensateur de marche : grand, au papier. Choisissez « Sous tension » pour voir les plaques se charger.',
      sous: '<strong>Sous tension.</strong> Les deux plaques se chargent : voyez les billes rouges et grises. Le condensateur de démarrage ne doit pas rester sous tension : 5 secondes au plus. Celui de marche reste sous tension.',
      long: '<strong>Plus de 5 secondes sous tension.</strong> Le condensateur de démarrage chauffe et risque d’exploser : il faut couper. Celui de marche est fait pour rester sous tension.',
      coupee: '<strong>Tension coupée : ils restent chargés.</strong> Les billes restent sur les plaques. Ne touchez pas les cosses : déchargez d’abord, avec une résistance.',
      decharge: '<strong>Décharge avec une résistance.</strong> Le courant s’écoule dans la résistance et les plaques se vident. La décharge n’est pas instantanée : elle peut prendre quelques minutes. Ici, le temps est accéléré.',
      decharges: '<strong>Déchargés.</strong> Les plaques sont vides : vous pouvez y toucher, et les tester à l’ohmmètre.',
      coupe: '<strong>Condensateur coupé.</strong> Un fil intérieur est coupé : la plaque n’est plus reliée à sa cosse et rien ne se charge. À l’ohmmètre : l’infini en permanence. On le remplace.',
      court: '<strong>Condensateur en court-circuit.</strong> Les deux plaques se touchent : rien ne reste chargé. À l’ohmmètre : 0 ou presque en permanence. On le remplace.',
      gonfle: '<strong>Enveloppe gonflée.</strong> C’est anormal : un condensateur dont l’enveloppe est gonflée n’est pas en bon état.',
      coupezDabord: '<strong>Coupez d’abord.</strong> On ne décharge jamais un condensateur sous tension. Choisissez « Tension coupée », puis « Décharger ».',
      dejaDecharge: '<strong>Déjà déchargés.</strong> Il n’y a plus rien à décharger.'
    };
    const texteEtat = () => defaut === 'coupe' ? PH.coupe : defaut === 'court' ? PH.court : defaut === 'gonfle' ? PH.gonfle
      : power ? (tDem > DEPART ? PH.long : PH.sous)
      : dech ? (c > 0.03 ? PH.decharge : PH.decharges)
      : c > 0.5 ? PH.coupee : PH.repos;
    const dire = () => { cleT = texteEtat(); ctx.dire(message || cleT); };
    const etatCmd = () => (power ? 'sous' : c > 0.03 ? 'coupe' : 'repos');
    const syncCommandes = () => {
      cEtat = etatCmd();
      ctx.regler('etat', cEtat); ctx.regler('defaut', defaut);
    };
    const toutMajour = () => { majVisuels(); majChaleur(); majCharges(); majGrains(); majMesures(); syncCommandes(); dire(); };

    /* les temps du mouvement pas à pas : chacun fixe tout l'état */
    const phase = p => {
      pasAPas = true; message = ''; defaut = 'bon'; razOutils();
      const regle = (pw, cc, td, dc) => { power = pw; c = cc; tDem = td; hD = td > DEPART ? 1 : 0; dech = dc; };
      if (p === 'sous')       regle(true, 0.15, 0, false);
      if (p === 'cinq')       regle(true, 1, 6.5, false);
      if (p === 'coupe')      regle(false, 1, 0, false);
      if (p === 'resistance') { regle(false, 0.8, 0, true); uOutil = 0.45; cibleOutil = 1; }
      if (p === 'decharge')   { regle(false, 0, 0, true); uOutil = cibleOutil = 1; }
      caps.forEach(k => k.placerOutil(uOutil));
      toutMajour();
    };

    const agir = (id, val) => {
      if (id === 'phase') { phase(val); return; }
      pasAPas = false; message = '';
      if (id === 'etat') {
        razOutils(); dech = false;
        if (val === 'repos') { power = false; c = 0; tDem = 0; }
        if (val === 'sous') { if (!power) tDem = 0; power = true; }
        if (val === 'coupe') { power = false; tDem = 0; if (c < 0.97 && peutCharger()) c = 1; }
      } else if (id === 'decharger') {
        if (power) message = PH.coupezDabord;
        else if (c < 0.03) message = PH.dejaDecharge;
        else { razOutils(); dech = true; cibleOutil = 1; }
      } else if (id === 'defaut') {
        defaut = val; razOutils(); dech = false;
        if (val === 'coupe' || val === 'court') c = 0;
      } else return;
      toutMajour();
    };

    majVisuels(); majChaleur(); majCharges(); majGrains(); majMesures(); cEtat = etatCmd();

    return {
      racine,
      /* « comprendre » : de face et un peu de dessus, là où l'on voit les plaques et les billes ;
         « découvrir » : de trois quarts, les deux condensateurs côte à côte */
      vue: ctx.mode === 'decouvrir' ? { azimut: -28, elevation: 18, zoom: 1.2, cadre: [D.corps, R.corps, D.outilCorps, R.outilCorps], marge: 1.1 }
                                    : { azimut: -20, elevation: 16, zoom: 1.2, cadre: [D.corps, R.corps, D.outilCorps, R.outilCorps], marge: 1.1 },
      fantome: [D.corps, D.corpsG, D.cap, R.corps, R.corpsG, R.cap],
      phrase: PH.repos,
      pieces: [
        { id: 'demarrage', nom: 'Le condensateur de démarrage', objets: [D.corps, D.corpsG, D.cap, D.evt], desc: 'Un électrolytique : petit, noir, de forte capacité (plus de 100 µF possible). Il ne doit pas rester sous tension : 5 secondes au plus, sinon il chauffe et risque d’exploser.' },
        { id: 'marche', nom: 'Le condensateur de marche', objets: [R.corps, R.corpsG, R.cap, R.evt], desc: 'Un condensateur au papier : grand, de faible capacité (une trentaine de µF au plus). Il est fait pour rester sous tension pendant la marche.' },
        { id: 'marquage', nom: 'Les marquages', objets: [D.etiq, R.etiq], desc: 'On y lit la capacité en µF (écrite aussi MF ou MFD) avec sa tolérance, et la tension maximale. Exemple : 60 µF ±10 %, 240 V.' },
        { id: 'bornes', nom: 'Les cosses et leurs fils', objets: [D.pattes, R.pattes, D.fils, R.fils], desc: 'Deux cosses plates sur le dessus. Chacune est reliée à une plaque par un fil, à l’intérieur.' },
        { id: 'plaques', nom: 'Les deux plaques', objets: [D.anneauA, D.anneauB, R.anneauA, R.anneauB], desc: 'Deux feuilles de métal très proches, qui ne se touchent pas. Ici, elles sont dessinées en deux tubes : dans la vraie pièce, elles sont enroulées.' },
        { id: 'isolant', nom: 'L’isolant entre les plaques', objets: [D.papier, R.papier], desc: 'Une couche isolante entre les deux plaques. Si les plaques se touchent, c’est le court-circuit.' },
        { id: 'charges', nom: 'L’électricité stockée', objets: [D.iA, D.iB, R.iA, R.iB], desc: 'Les billes rouges et grises montrent l’électricité stockée sur les plaques. Quand le courant est coupé, elles restent : le condensateur reste chargé.' },
        { id: 'resiInterne', nom: 'La résistance de décharge intégrée', objets: [D.resi], desc: 'Sur certains condensateurs, une résistance d’environ 15 kΩ relie les deux cosses. La décharge n’est pas instantanée : elle peut prendre quelques minutes. On décharge quand même.' },
        { id: 'outil', nom: 'La résistance de décharge, avec ses pinces', objets: [D.outil, R.outil], desc: 'On pose les deux pinces sur les deux cosses : le condensateur se décharge dans la résistance. À faire avant d’y toucher.' }
      ],
      commandes: [
        { id: 'etat', type: 'choix', titre: 'Les condensateurs', options: [['repos', 'Hors tension, déchargés'], ['sous', 'Sous tension'], ['coupe', 'Tension coupée']], valeur: 'repos' },
        { id: 'decharger', type: 'action', libelle: 'Décharger', accent: true },
        { id: 'defaut', type: 'choix', titre: 'L’état des condensateurs', options: [['bon', 'En bon état'], ['coupe', 'Coupés'], ['court', 'En court-circuit'], ['gonfle', 'Enveloppe gonflée']], valeur: 'bon' }
      ],
      etapes: [
        { titre: 'Sous tension : les plaques se chargent', piece: 'charges', voirDedans: true, actions: [['phase', 'sous']],
          vue: { azimut: -20, elevation: 16, zoom: 1.35, cible: [0, 38, 6] }, duree: 7,
          texte: 'Le courant arrive aux deux cosses et s’accumule sur les deux plaques : voyez les billes rouges et grises. Le courant change de sens : les couleurs s’inversent.' },
        { titre: 'Le condensateur de démarrage : 5 secondes au plus', piece: 'demarrage', voirDedans: true, actions: [['phase', 'cinq']],
          vue: { azimut: -20, elevation: 16, zoom: 1.35, cible: [0, 38, 6] }, duree: 8,
          texte: 'Il ne doit pas rester sous tension. Au-delà de 5 secondes, il chauffe et risque d’exploser. Le condensateur de marche, lui, est fait pour rester sous tension.' },
        { titre: 'La tension est coupée : ils restent chargés', piece: 'charges', voirDedans: true, actions: [['phase', 'coupe']],
          vue: { azimut: -20, elevation: 16, zoom: 1.35, cible: [0, 38, 6] }, duree: 8,
          texte: 'Plus de courant, mais les billes restent sur les plaques : les condensateurs restent chargés. Ne touchez pas les cosses.' },
        { titre: 'On décharge avec une résistance', piece: 'outil', voirDedans: true, actions: [['phase', 'resistance']],
          vue: { azimut: -26, elevation: 14, zoom: 1.7, cible: [-34, 48, 12] }, duree: 9,
          texte: 'On pose les deux pinces sur les deux cosses. Le courant s’écoule dans la résistance et les billes disparaissent. La décharge n’est pas instantanée : elle peut prendre quelques minutes.' },
        { titre: 'Déchargés : on peut y toucher', piece: 'plaques', voirDedans: true, actions: [['phase', 'decharge']],
          vue: { azimut: -26, elevation: 14, zoom: 1.7, cible: [-34, 48, 12] }, duree: 7,
          texte: 'Les plaques sont vides. Vous pouvez maintenant toucher les cosses et tester le condensateur à l’ohmmètre.' }
      ],
      /* l'éclaté : le couvercle avec ses cosses et ses fils se lève, puis le rouleau (plaques, isolant, billes) sort du corps */
      eclate: [
        { objets: [D.haut], vers: [0, 92, 0], debut: 0, fin: 0.5 },
        { objets: [D.interne], vers: [0, 62, 0], debut: 0.3, fin: 0.9 },
        { objets: [R.haut], vers: [0, 118, 0], debut: 0, fin: 0.5 },
        { objets: [R.interne], vers: [0, 88, 0], debut: 0.3, fin: 0.9 }
      ],
      eclateVue: { azimut: -30, elevation: 14, zoom: 0.6, cible: [0, 105, 6] },
      surEclate(on) { eclatee = on; majVisuels(); majGrains(); },
      agir,
      detruire() { libre.forEach(x => { try { x.dispose(); } catch (e) {} }); },
      animer(dt) {
        let actif = false;
        /* la charge : elle monte sous tension ; elle ne baisse que par la résistance */
        if (power && peutCharger() && c < 1) { c = K.vers(c, 1, 5, dt); if (c > 0.995) c = 1; actif = true; }
        if (!power && dech && uOutil >= 0.999 && c > 0) { c *= Math.exp(-dt / TAU); if (c < 0.02) c = 0; actif = true; }
        /* les pinces */
        if (uOutil !== cibleOutil) { uOutil = vers(uOutil, cibleOutil, dt / 1.1); caps.forEach(k => k.placerOutil(uOutil)); actif = true; majGrains(); }
        /* l'alternatif : les billes changent de couleur */
        if (power && peutCharger()) {
          tPol += dt; actif = true;
          if (tPol >= 0.7) { tPol = 0; pol ^= 1; caps.forEach(k => { k.iA.material = pol ? ardoise : rouge; k.iB.material = pol ? rouge : ardoise; }); }
        }
        /* le condensateur de démarrage chauffe au-delà de 5 secondes */
        if (power) { tDem += dt; actif = true; }
        const hC = power ? K.clamp((tDem - DEPART) / 2.5, 0, 1) : 0;
        if (Math.abs(hD - hC) > 0.002) { hD = K.vers(hD, hC, hC > hD ? 2.5 : 1.2, dt); majChaleur(); actif = true; } else if (hD !== hC) { hD = hC; majChaleur(); }
        majCharges();
        caps.forEach(k => { if (k.gA.animer(dt)) actif = true; if (k.gB.animer(dt)) actif = true; if (k.gR.animer(dt)) actif = true; });
        majMesures();
        if (etatCmd() !== cEtat) { syncCommandes(); }
        if (!pasAPas && !message && texteEtat() !== cleT) dire();
        return actif;
      }
    };
  }, { famille: 'demarrage', titre: 'Les condensateurs de démarrage et de marche', stations: ['9.1', '9.4', '9.5'] });
})();
