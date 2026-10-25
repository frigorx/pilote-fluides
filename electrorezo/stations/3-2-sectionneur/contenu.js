/* ÉlectroRézo 3.2 — Le sectionneur. */

ModeleAppareil.construire({
  id: '3.2', ligne: 3,
  vue3d: { modele: 'sectionneur' },   /* 3D */
  kicker: 'ÉlectroRézo · Ligne 3 Couper et isoler · Station 2',
  titre: 'Le sectionneur',
  narration: NARRATION,

  prerequis: [
    { id: '3.1', quoi: "l’interrupteur" },
  ],

  photos: [
    { src: 'assets/biblio/condamnation-cadenas.png',
      alt: 'Photo de deux mains qui posent un dispositif de condamnation rouge, avec son cadenas, sur un appareil modulaire d’un tableau électrique.',
      titre: 'La condamnation.',
      sous: 'Un cadenas, une clé dans votre poche : personne ne referme derrière vous.' }
  ],
  creditPhoto: 'Photographies : base de connaissances inerWeb, documents de cours. Détail dans « Crédits ».',

  aQuoiCaSert: 'Séparer une installation du réseau, de façon sûre et vérifiable, pour que quelqu’un puisse travailler derrière. Ce n’est pas un appareil de commande : c’est un appareil de sécurité.',
  ouOnLeTrouve: 'En tête d’armoire, en amont d’une machine, partout où une intervention est prévue.',

  scene: () => Schemas.coupeSectionnement(),
  tableauLigne: true,

  technologie: [
    ['La distance garantie', 'ouvert, l’écart entre les pièces est calculé et vérifié par le constructeur. Il est suffisant pour tenir les surtensions prévues par le constructeur (tension de tenue aux chocs).'],
    ['La condamnation', 'un trou dans la poignée reçoit un cadenas. Vous gardez la clé, vous posez une étiquette à votre nom. Personne ne referme, même par erreur.'],
    ['La coupure visible', 'sur beaucoup de modèles, on <em>voit</em> les pièces séparées. On ne croit pas une poignée sur parole : on regarde. Mais seule la vérification d’absence de tension prouve qu’on peut travailler.'],
    ['Pas de pouvoir de coupure', 'en général, ni ressort, ni chambre d’extinction. <strong>Il n’est pas fait pour ouvrir pendant que le courant passe.</strong>']
  ],

  variantes: [
    '<strong>Unipolaire, bipolaire, tripolaire, tétrapolaire</strong> — selon le nombre de fils à séparer.',
    '<strong>Avec ou sans coupure visible</strong> — la coupure visible se voit à l’œil ; sans elle, un indicateur de position fiable dit où sont les contacts. Dans les deux cas, seule la vérification d’absence de tension, avec un vérificateur d’absence de tension (VAT), prouve qu’on peut travailler.',
    '<strong>À fusibles</strong> — il devient alors un sectionneur porte-fusible, station 3.5.',
    '<strong>De terre</strong> — il met à la terre ce qui est séparé. Surtout employé en haute tension.',
    'Un sectionneur porte un <strong>courant assigné</strong> : ce qu’il supporte de laisser passer, pas ce qu’il sait couper.'
  ],

  aptitudes: {
    commander: false, couper: false, isoler: true,
    bonneReponse: 'Voilà. Le sectionneur ne fait qu’une chose, mais il la fait vraiment : isoler et se laisser condamner. Il ne commande pas, et surtout il ne coupe pas en charge.',
    erreurs: {
      commander: 'Il ne commande pas. Ce n’est pas un appareil de manœuvre quotidienne — on l’ouvre pour intervenir, pas pour éteindre.',
      couper: '⚠️ Il ne coupe PAS en charge. Sans pouvoir de coupure, l’arc s’installe et ne s’éteint pas. C’est l’erreur qui envoie des gens à l’hôpital.',
      isoler: 'Il isole : c’est précisément sa raison d’être, avec la distance garantie et le cadenas.'
    }
  },

  cablage: [
    'Amont côté réseau, aval côté installation. Le sens compte pour l’intervention.',
    'On sépare <strong>tous les conducteurs actifs</strong> — phases et, selon le régime de neutre, le neutre.',
    'Le <strong>conducteur de protection n’est jamais coupé</strong>. Jamais.',
    'La poignée doit rester accessible et son trou de cadenas dégagé.'
  ],
  piege: 'L’erreur qui tue : ouvrir un sectionneur en charge. On coupe d’abord ailleurs — interrupteur (3.1), disjoncteur et contacteur (vus plus loin) — <strong>ensuite</strong> on ouvre le sectionneur.',

  symboles: [
    { src: 'assets/sectionneur4.svg', alt: 'Symbole normalisé d’un sectionneur à trois pôles : trois lames, chacune avec une petite barre au bout du contact fixe. La liaison entre les pôles n’est pas tracée dans ce dessin.', legende: 'Sectionneur, trois pôles' },
    { src: 'assets/sectionneur1.svg', alt: 'Symbole normalisé d’un sectionneur à un pôle : une lame, avec une petite barre au bout du contact fixe.', legende: 'Sectionneur, un pôle' }
  ],
  lecturePlan: [
    'Le détail qui distingue le sectionneur de l’interrupteur : une <strong>petite barre</strong> au bout du contact, côté fixe, là où la lame vient s’appuyer. Elle signifie « aptitude au sectionnement ».',
    'Cette barre dit que l’appareil est capable d’isoler. Pour le condamner, vérifiez sur l’appareil qu’il a un trou de cadenas. Pour travailler derrière : ouvrir, condamner, vérifier l’absence de tension. <strong>Cherchez la barre sur vos plans.</strong>',
    'Les trois lames du dessin à trois pôles forment un seul appareil : elles s’ouvrent ensemble. Dans ce dessin de la bibliothèque, la liaison entre les pôles (un pointillé, station 8.7) n’est pas tracée.'
  ],

  quiz: [
    { question: 'Sur un plan, comment reconnaît-on un sectionneur d’un simple interrupteur ?',
      confirmation: 'La petite barre au bout du contact, côté fixe, là où la lame vient s’appuyer : l’aptitude au sectionnement.',
      reponses: [
        { texte: 'Il est toujours dessiné fermé.', pourquoi: 'Tous les appareils sont dessinés au repos, cela ne distingue rien.' },
        { texte: 'Il est dessiné plus gros.', pourquoi: 'La taille d’un symbole ne porte jamais d’information : elle dépend de l’échelle du plan.' },
        { texte: 'Il porte un repère qui commence par Q.', pourquoi: 'Le repère aide, mais il désigne aussi disjoncteurs et interrupteurs-sectionneurs : il ne suffit pas.' },
        { texte: 'Une petite barre au bout du contact, côté fixe, là où la lame vient s’appuyer.', juste: true } ] },

    { question: 'Que se passe-t-il si on ouvre un sectionneur en charge ?',
      confirmation: 'Sans pouvoir de coupure, l’arc s’installe au lieu de s’éteindre.',
      reponses: [
        { texte: 'Rien de particulier, il s’ouvre comme un interrupteur.', pourquoi: 'Non : il n’a, en général, ni ressort ni chambre d’extinction. C’est exactement ce qui le différencie.' },
        { texte: 'Un arc s’installe, il ne s’éteint pas, et il projette.', juste: true },
        { texte: 'La machine redémarre toute seule.', pourquoi: 'Ce n’est pas un phénomène lié au sectionnement.' },
        { texte: 'Le fusible en amont fond immédiatement et tout va bien.', pourquoi: 'Rien ne garantit qu’un fusible fonde à cet instant : l’arc, lui, est déjà là.' } ] },

    { question: 'À quoi sert d’abord un sectionneur ?',
      confirmation: 'C’est un appareil de sécurité, pas de commande.',
      reponses: [
        { texte: 'À séparer l’installation du réseau pour intervenir en sécurité.', juste: true },
        { texte: 'À protéger le circuit contre les surintensités.', pourquoi: 'Protéger est le métier de la ligne 4. Un sectionneur ne protège rien tout seul.' },
        { texte: 'À éteindre une machine en fin de journée.', pourquoi: 'Ce serait l’ouvrir en charge, ce qu’il ne sait pas faire. Pour éteindre, on utilise l’interrupteur ou le contacteur.' },
        { texte: 'À faire varier la puissance du récepteur.', pourquoi: 'Un sectionneur est ouvert ou fermé. Il n’y a pas de position intermédiaire.' } ] },

    { question: 'Qu’est-ce que la condamnation ?',
      confirmation: 'Le cadenas, la clé dans votre poche, l’étiquette à votre nom.',
      reponses: [
        { texte: 'Le fait de couper l’alimentation générale du bâtiment.', pourquoi: 'Couper au général n’empêche personne de refermer. Ce n’est pas une condamnation.' },
        { texte: 'Une déclaration écrite au responsable.', pourquoi: 'Aucun papier n’empêche une main de remettre sous tension.' },
        { texte: 'Un verrouillage matériel — cadenas — dont vous gardez la clé.', juste: true },
        { texte: 'Une étiquette qui interdit la manœuvre.', pourquoi: 'L’étiquette informe, mais elle n’empêche rien. Il faut un dispositif matériel.' } ] }
  ],

  retenir: [
    '<strong>Il ne commande pas.</strong> Ce n’est pas un appareil de tous les jours.',
    '<strong>Il ne coupe pas en charge.</strong> On coupe ailleurs d’abord.',
    '<strong>Il isole, et il se condamne.</strong> C’est un des seuls de la ligne à savoir vraiment le faire, avec l’interrupteur-sectionneur et le sectionneur porte-fusible.',
    'La petite barre sur le symbole dit que l’appareil est capable d’isoler. Pour travailler derrière : ouvrir, condamner, vérifier l’absence de tension.'
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre que le sectionneur est un appareil de sécurité et non de commande : distance d’ouverture garantie, condamnation par cadenas, coupure visible — et surtout aucune aptitude à couper en charge.</p>',

  credits: [
    { quoi: 'Photo « condamnation par cadenas »', source: 'base de connaissances inerWeb',
      detail: 'document de cours indexé, même recherche' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: '200_fuses_protective_gears/20_disconnecting_switches/ (sectionneur4.svg, sectionneur1.svg)' } ],

  correspondances: [
    { ligne: 3, couleur: '#5b4bd6', texte: '3.3 L’interrupteur-sectionneur' },
    { ligne: 4, couleur: '#c0392b', texte: '4.8 La terre et la liaison équipotentielle' } ]
});
