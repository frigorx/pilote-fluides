/* ÉlectroRézo 2.2 — Le réseau monophasé. */

ModeleGrandeur.construire({
  id: '2.2', ligne: 2,
  vue3d: { modele: 'circuit', options: { experience: 'monophase' } },   /* 3D */
  kicker: 'ÉlectroRézo · Ligne 2 Les réseaux · Station 2',
  titre: "Le réseau monophasé",
  narration: NARRATION,

  prerequis: [
    { id: '2.1', quoi: "phase, neutre et PE" },
  ],

  photos: [
    { src: 'assets/biblio/deux-fils-et-la-terre.png',
      alt: "Schéma de câblage d’un moteur monophasé avec sa phase, son neutre et sa terre.",
      titre: "Deux actifs, une protection.", sous: "C’est tout ce qu’il y a dans un circuit monophasé." },
    { src: 'assets/biblio/bornier-de-climatiseur.jpeg',
      alt: "Tableau de câblage d’un climatiseur split avec ses borniers numérotés et le repère N pour le neutre.",
      titre: "Un cas réel.", sous: "Le bornier d’un split : phase, neutre, et la liaison entre unités." }
  ],

  lIdee: "Le monophasé, c’est le réseau le plus simple : une phase, un neutre, une boucle. C’est ce qui arrive dans les maisons, et c’est ce qui alimente presque tout ce que vous branchez chez vous.",
  ouOnLaRencontre: "Toutes les prises domestiques, l’éclairage, les petits appareils. Et, en atelier, tout ce qui est commandé en 230 volts : les bobines de contacteur, les électrovannes, les régulations.",

  scene: () => SchemasReseaux.boucleMonophasee(),

  ceQuiSePasse: [
    ["Une seule tension", "230 volts entre la phase et le neutre. Il n’y a rien d’autre à mesurer : c’est la seule paire d’actifs."],
    ["Une seule boucle", "le courant part par la phase, traverse la charge, et revient par le neutre. Il s’inverse cent fois par seconde : cinquante allers-retours complets, c’est la fréquence de 50 Hz."],
    ["La puissance disponible est limitée", "la puissance qu’un branchement monophasé peut fournir est limitée : elle se compte en kilovoltampères (kVA, la puissance apparente de la station 1.4) et le distributeur la fixe. Quand le besoin dépasse cette limite, on demande un branchement triphasé — c’est une des raisons principales de le faire : pas pour la tension, pour la puissance."],
    ["Phase et neutre ne sont pas symétriques", "le neutre est relié à la terre en amont, la phase non. En marche normale, le neutre est proche du potentiel de la terre ; coupé en amont, il peut prendre la tension de la phase. On ne touche donc aucun conducteur sans avoir vérifié l’absence de tension. Ce n’est pas une question de couleur : c’est une question de raccordement au poste."]
  ],
  aRetenir: [
    "Un appareil monophasé se branche <strong>toujours</strong> sur une phase et un neutre — jamais entre deux phases.",
    "Le brancher entre deux phases lui appliquerait 400 volts au lieu de 230. Il ne survit pas.",
    "Le conducteur de protection s’ajoute aux deux actifs : il n’en fait pas partie."
  ],

  mesure: () => SchemasReseaux.monoOuTri(),
  instrument: [
    "<strong>Comptez les conducteurs actifs</strong> : deux, c’est du monophasé ; trois ou quatre, du triphasé. Le vert-jaune ne compte pas.",
    "Puis <strong>mesurez entre deux d’entre eux</strong>. 230 volts : phase et neutre. 400 volts : deux phases, vous êtes en triphasé.",
    "Ne concluez pas sur le nombre de fils seul : <strong>deux phases sans neutre</strong>, cela fait aussi deux fils — et 400 volts entre eux.",
    "Sur une machine, la <strong>plaque</strong> dit ce qu’elle attend. Comparez-la à ce que vous avez mesuré, avant de brancher."
  ],
  dangerDeMesure: "Une prise à deux trous n’est pas forcément du 230 volts. Sur certaines installations industrielles anciennes, on trouve deux phases sans neutre. On mesure toujours avant de brancher.",

  ecriture: {
    sansUnite: true, titre: 'Les écritures du monophasé', entetes: ['On lit', 'Cela veut dire'],
    multiples: [
      ['1 ~', 'monophasé, sur une plaque ou une notice'],
      ['230 V', 'la seule tension du réseau domestique français'],
      ['L + N', 'les deux conducteurs actifs, plus le PE']
    ]
  },
  surUnePlaque: [
    "Sur une <strong>plaque</strong>, le signe <em>1 ~</em> annonce un appareil monophasé. Une seule tension est écrite à côté.",
    "Sur un <strong>bornier</strong>, deux bornes actives : <em>L</em> et <em>N</em>, plus la terre.",
    "Sur un <strong>plan</strong>, un seul trait descend depuis la phase, et un seul remonte vers le neutre.",
    "Un appareil monophasé peut être branché dans une armoire triphasée : on prend une phase et le neutre. Mais <strong>jamais deux phases</strong>."
  ],

  quiz: [
    { question: "Combien de conducteurs actifs dans un circuit monophasé ?",
      confirmation: "Deux : une phase et un neutre. Le PE n’est pas un actif.",
      reponses: [
        { texte: "Un seul : la phase.", pourquoi: "Sans retour, aucun courant ne circule." },
        { texte: "Trois, avec la terre.", pourquoi: "Le conducteur de protection n’est pas un conducteur actif." },
        { texte: "Deux : une phase et un neutre.", juste: true },
        { texte: "Cela dépend de la puissance.", pourquoi: "Le nombre d’actifs définit le régime, pas la puissance." } ] },

    { question: "Que se passe-t-il si on branche un appareil 230 V entre deux phases ?",
      confirmation: "Il reçoit 400 volts. Il ne survit pas.",
      reponses: [
        { texte: "Il fonctionne, mais plus lentement.", pourquoi: "Une tension trop forte ne ralentit rien : elle détruit." },
        { texte: "Rien : deux phases donnent aussi 230 V.", pourquoi: "Entre deux phases, il y a 400 volts." },
        { texte: "Le différentiel déclenche.", pourquoi: "Rien ne fuit vers la terre : le différentiel ne voit rien." },
        { texte: "Il reçoit 400 V et il est détruit.", juste: true } ] },

    { question: "Vous comptez deux fils actifs. Est-ce forcément du monophasé ?",
      confirmation: "Non : deux phases sans neutre font aussi deux fils, avec 400 V entre elles.",
      reponses: [
        { texte: "Non : il faut mesurer entre les deux.", juste: true },
        { texte: "Oui, si le vert-jaune est présent.", pourquoi: "La présence du PE ne dit rien du régime." },
        { texte: "Oui, deux fils c’est du monophasé.", pourquoi: "Deux phases sans neutre font aussi deux fils." },
        { texte: "Non : il faut compter aussi le vert-jaune.", pourquoi: "Le PE n’entre jamais dans ce comptage." } ] },

    { question: "Pourquoi le neutre est-il, en marche normale, proche du potentiel de la terre ?",
      confirmation: "Parce qu’il est relié à la terre au poste. Mais coupé en amont, il peut prendre la tension de la phase : on ne touche aucun conducteur sans avoir vérifié l’absence de tension.",
      reponses: [
        { texte: "Parce qu’il ne transporte pas de courant.", pourquoi: "Il en transporte autant que la phase." },
        { texte: "Parce qu’il est relié à la terre en amont.", juste: true },
        { texte: "Parce qu’il est protégé par le différentiel.", pourquoi: "Le différentiel intervient après, pas avant." },
        { texte: "Parce qu’il est isolé en bleu.", pourquoi: "La couleur ne protège de rien." } ] }
  ],

  retenir: [
    "<strong>Deux actifs</strong> : une phase, un neutre. Plus le PE.",
    "<strong>230 V</strong>, et rien d’autre à mesurer.",
    "<strong>Jamais entre deux phases</strong> : ce serait 400 volts.",
    "<strong>Deux fils ne prouvent rien</strong> : on mesure entre eux."
  ],

  objectifs: '<p><strong>Objectif.</strong> Reconnaître un circuit monophasé, savoir où se branche un appareil 230 V, et ne jamais conclure sur le seul nombre de fils.</p><p><strong>Limite.</strong> Le calcul des puissances et le dimensionnement du branchement ne sont pas traités ici.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 2, couleur: '#7a4fb5', texte: "2.3 Le réseau triphasé" },
    { ligne: 6, couleur: '#c9451a', texte: "6.5 Le moteur monophasé" },
    { ligne: 1, couleur: '#2e6f9e', texte: "1.4 La puissance et l’énergie" } ]
});
