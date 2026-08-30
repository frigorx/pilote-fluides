/* ÉlectroRézo 8.3 — La barre du sectionnement. */

ModeleSigne.construire({
  id: '8.3',
  kicker: 'ÉlectroRézo · Ligne 8 L’écriture du schéma · Station 3',
  titre: "La barre du sectionnement",
  lettre: 'sectionnement',
  narration: NARRATION,

  ceQuelleDit: "Une barre de trois millimètres, posée au bout d’un contact. Elle dit : derrière cet appareil-là, on peut aller travailler.",
  ouOnLaVoit: "Sur les sectionneurs, les interrupteurs-sectionneurs, les disjoncteurs moteur. Jamais sur un simple interrupteur.",

  pourquoiCetteForme: [
    "<strong>Elle dessine la garantie d’écartement.</strong> Quand l’appareil est ouvert, la distance entre les pièces est calculée et vérifiée par le constructeur.",
    "Elle dit donc : <strong>l’ouverture n’est pas approximative, elle est certifiée</strong> — et l’appareil peut être condamné.",
    "<strong>Un contact sans barre coupe. Un contact avec la barre protège une vie.</strong> Confondre les deux n’est pas une faute de lecture : c’est un accident.",
    "Sur un plan imprimé petit, ou photocopié, elle peut presque disparaître. Quand un plan sert à préparer une intervention, on vérifie aussi sur l’appareil qu’il y a un trou de cadenas."
  ],

  motsOuOnLaTrouve: ['interrupteur', 'sectionneur', 'disjoncteurMoteur'],
  motVedette: 'disjoncteurMoteur',

  symbolesBiblio: [
    { src: 'assets/sectionneur_general.svg', alt: "Symbole normalisé d’un sectionneur, avec sa barre d’aptitude au sectionnement.", legende: "Un sectionneur" }
  ],
  duDessinAuPlan: [
    "Cherchez cette barre <strong>avant chaque intervention</strong>. C’est un réflexe de sécurité, pas un exercice de lecture.",
    "Elle est fine, discrète, souvent collée au contact. Un plan mal imprimé peut la manger.",
    "<strong>Le plan ne remplace jamais l’appareil</strong> : la présence du trou de cadenas se vérifie sur place."
  ],

  quiz: [
    { question: "Que dit la barre courte posée au bout d’un contact ?",
      confirmation: "Elle marque l’aptitude au sectionnement.",
      reponses: [
        { texte: "Que l’appareil est neuf ou conforme.", pourquoi: "Aucun signe de la norme ne parle de l’état ou de la conformité d’un matériel." },
        { texte: "Que l’appareil supporte un fort courant.", pourquoi: "Le courant admissible s’écrit en chiffres à côté, jamais par un signe." },
        { texte: "Que l’appareil est à commande manuelle.", pourquoi: "La commande manuelle a son propre signe : un trait horizontal sur le contact." },
        { texte: "Que l’appareil peut être condamné, et qu’on peut travailler derrière.", juste: true } ] },

    { question: "Un plan photocopié : la barre est illisible. Que faites-vous ?",
      confirmation: "Le plan ne remplace pas l’appareil.",
      reponses: [
        { texte: "Je vérifie sur l’appareil qu’il y a un trou de cadenas.", juste: true },
        { texte: "Je regarde la couleur de l’appareil.", pourquoi: "La couleur d’un appareil ne dit rien de son aptitude au sectionnement." },
        { texte: "Je considère qu’elle n’y est pas, c’est plus prudent.", pourquoi: "Ce serait prudent pour vous, mais vous vous priveriez d’un moyen de consignation légitime — et vous n’auriez toujours pas vérifié." },
        { texte: "Je considère qu’elle y est : la plupart des appareils de tête en ont une.", pourquoi: "« La plupart » n’est pas une garantie quand il s’agit de mettre les mains dans une armoire." } ] },

    { question: "Quel appareil ne porte jamais cette barre ?",
      confirmation: "Un interrupteur coupe, il n’isole pas.",
      reponses: [
        { texte: "Le disjoncteur moteur.", pourquoi: "Il la porte : il se condamne." },
        { texte: "L’interrupteur simple.", juste: true },
        { texte: "Le sectionneur porte-fusible.", pourquoi: "Il la porte : il descend du sectionneur." },
        { texte: "L’interrupteur-sectionneur.", pourquoi: "Il la porte : c’est justement ce qui le distingue de l’interrupteur simple." } ] },

    { question: "Pourquoi cette information est-elle dessinée, et pas seulement écrite ?",
      confirmation: "On lit un plan d’abord avec les yeux, en balayant.",
      reponses: [
        { texte: "Parce que le texte serait trop long à écrire.", pourquoi: "Trois lettres suffiraient : ce n’est pas une question de place." },
        { texte: "Parce que les plans sont souvent traduits en plusieurs langues.", pourquoi: "C’est un avantage réel du dessin, mais ce n’est pas la raison première ici." },
        { texte: "Pour que l’information se voie d’un coup d’œil, sur tout le plan à la fois.", juste: true },
        { texte: "Parce que la norme interdit d’écrire sur un schéma.", pourquoi: "La norme impose au contraire d’écrire les repères et les valeurs." } ] }
  ],

  retenir: [
    "<strong>La barre = aptitude au sectionnement.</strong> On peut condamner, et travailler derrière.",
    "Elle représente <strong>la distance d’ouverture garantie</strong>.",
    "Sans elle, l’appareil coupe seulement.",
    "Elle se vérifie <strong>aussi sur l’appareil</strong> : un trou de cadenas."
  ],

  objectifs: '<p><strong>Objectif.</strong> Repérer la barre d’aptitude au sectionnement sur un symbole, comprendre ce qu’elle garantit, et en faire un réflexe avant toute intervention.</p>',

  credits: [
    { quoi: 'Symboles normalisés EN 60617',
      source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/200_fuses_protective_gears/20_disconnecting_switches/' },
    { quoi: 'Dessins de décomposition des signes',
      source: 'tracés pour ÉlectroRézo dans stations/_commun/signes.js',
      detail: 'représentations pédagogiques inspirées de la norme, faites pour être décomposées' } ],

  correspondances: [
    { ligne: 3, couleur: '#5b4bd6', texte: "3.2 Le sectionneur" },
    { ligne: 3, couleur: '#5b4bd6', texte: "3.3 L’interrupteur-sectionneur" } ]
});
