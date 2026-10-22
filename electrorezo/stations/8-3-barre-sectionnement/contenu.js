/* ÉlectroRézo 8.3 — La barre du sectionnement. */

ModeleSigne.construire({
  id: '8.3',
  vue3d: { modele: 'sectionneur', piece: 'lames' },   /* 3D */
  kicker: 'ÉlectroRézo · Ligne 8 L’écriture du schéma · Station 3',
  titre: "La barre du sectionnement",
  lettre: 'sectionnement',
  narration: NARRATION,

  prerequis: [
    { id: '3.2', quoi: "le sectionneur" },
    { id: '8.2', quoi: "le contact" },
  ],

  ceQuelleDit: "Une barre de trois millimètres, posée au bout d’un contact. Elle dit : cet appareil est capable d’isoler l’installation de son alimentation.",
  ouOnLaVoit: "Sur les sectionneurs, les interrupteurs-sectionneurs, les disjoncteurs moteur. Jamais sur un simple interrupteur.",

  pourquoiCetteForme: [
    "<strong>Elle dessine la garantie d’écartement.</strong> Quand l’appareil est ouvert, la distance entre les pièces est calculée et vérifiée par le constructeur.",
    "Elle dit donc : <strong>l’ouverture n’est pas approximative, elle est garantie par le constructeur</strong>. L’appareil est <strong>capable</strong> d’isoler.",
    "<strong>La barre dit seulement que l’appareil en est capable.</strong> Pour travailler derrière, il reste trois gestes : <strong>l’ouvrir, le condamner</strong> (un cadenas, pour que personne ne le referme) et <strong>vérifier l’absence de tension</strong>.",
    "<strong>Un contact sans barre coupe seulement. Un contact avec la barre peut isoler.</strong> Confondre les deux n’est pas une faute de lecture : c’est un accident qui attend.",
    "Sur un plan imprimé petit, ou photocopié, elle peut presque disparaître. Quand un plan sert à préparer une intervention, on lit le marquage de l’appareil et on vérifie qu’il se cadenasse."
  ],

  motsOuOnLaTrouve: ['interrupteur', 'sectionneur', 'disjoncteurMoteur'],
  motVedette: 'disjoncteurMoteur',

  symbolesBiblio: [
    { src: 'assets/sectionneur4.svg', alt: "Symbole normalisé d’un sectionneur à trois pôles : sur chaque pôle, une barre courte horizontale sur la borne du haut.", legende: "Un sectionneur à trois pôles : une barre courte sur chacun" }
  ],
  duDessinAuPlan: [
    "Cherchez cette barre <strong>avant chaque intervention</strong>. C’est un réflexe de sécurité, pas un exercice de lecture.",
    "Elle est fine, discrète, souvent collée au contact. Un plan mal imprimé peut la manger.",
    "<strong>Le plan ne remplace jamais l’appareil</strong> : l’aptitude au sectionnement se lit sur son marquage, et la possibilité de le cadenasser se vérifie sur place.",
    "<strong>La barre ne remplace pas la procédure.</strong> Avant de travailler derrière : ouvrir, condamner, vérifier l’absence de tension."
  ],

  quiz: [
    { question: "Que dit la barre courte posée au bout d’un contact ?",
      confirmation: "Elle marque l’aptitude au sectionnement.",
      reponses: [
        { texte: "Que l’appareil est neuf ou conforme.", pourquoi: "Aucun signe de la norme ne parle de l’état ou de la conformité d’un matériel." },
        { texte: "Que l’appareil supporte un fort courant.", pourquoi: "Le courant admissible s’écrit en chiffres à côté, jamais par un signe." },
        { texte: "Que l’appareil est à commande manuelle.", pourquoi: "La commande manuelle a son propre signe : un trait horizontal sur le contact." },
        { texte: "Que l’appareil est capable d’isoler l’installation : il peut être condamné.", juste: true } ] },

    { question: "Un plan photocopié : la barre est illisible. Que faites-vous ?",
      confirmation: "Le plan ne remplace pas l’appareil.",
      reponses: [
        { texte: "Je lis le marquage de l’appareil et je vérifie qu’il se cadenasse.", juste: true },
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

    { question: "Le plan montre un sectionneur avec sa barre. Que faites-vous avant de travailler derrière ?",
      confirmation: "La barre dit que l’appareil est capable d’isoler. Reste à l’ouvrir, le condamner, vérifier l’absence de tension.",
      reponses: [
        { texte: "Rien de plus : la barre garantit que c’est isolé.", pourquoi: "La barre dit seulement que l’appareil est capable d’isoler. Il faut encore l’ouvrir, le condamner et vérifier l’absence de tension." },
        { texte: "Je demande à un collègue de rester près de l’appareil.", pourquoi: "Un collègue peut s’éloigner ou se tromper. C’est le cadenas qui condamne." },
        { texte: "J’ouvre l’appareil, je le condamne avec un cadenas, puis je vérifie l’absence de tension.", juste: true },
        { texte: "Je l’ouvre, et je commence : ouvert, c’est isolé.", pourquoi: "Ouvert ne suffit pas : sans cadenas, quelqu’un peut le refermer ; sans vérification, vous ne savez pas si la tension a disparu." } ] }
  ],

  retenir: [
    "<strong>La barre = aptitude au sectionnement.</strong> L’appareil est capable d’isoler l’installation.",
    "Elle représente <strong>la distance d’ouverture garantie</strong>.",
    "Sans elle, l’appareil coupe seulement.",
    "Elle se vérifie <strong>aussi sur l’appareil</strong> : son marquage, et un trou de cadenas.",
    "Pour travailler derrière : <strong>ouvrir, condamner, vérifier l’absence de tension</strong>."
  ],

  objectifs: '<p><strong>Objectif.</strong> Repérer la barre d’aptitude au sectionnement sur un symbole, comprendre ce qu’elle garantit, et en faire un réflexe avant toute intervention. La barre ne remplace pas la consignation : ouvrir, condamner, vérifier l’absence de tension.</p>',

  credits: [
    { quoi: 'Symboles normalisés EN 60617',
      source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/200_fuses_protective_gears/20_disconnecting_switches/sectionneur4.svg' },
    { quoi: 'Dessins de décomposition des signes',
      source: 'tracés pour ÉlectroRézo dans stations/_commun/signes.js',
      detail: 'représentations pédagogiques inspirées de la norme, faites pour être décomposées' } ],

  correspondances: [
    { ligne: 3, couleur: '#5b4bd6', texte: "3.2 Le sectionneur" },
    { ligne: 3, couleur: '#5b4bd6', texte: "3.3 L’interrupteur-sectionneur" } ]
});
