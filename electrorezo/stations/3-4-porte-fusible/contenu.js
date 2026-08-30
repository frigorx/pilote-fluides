/* ÉlectroRézo 3.4 — Le porte-fusible. */

ModeleAppareil.construire({
  id: '3.4', ligne: 3,
  kicker: 'ÉlectroRézo · Ligne 3 Couper et isoler · Station 4 · ⇄ ligne 4',
  titre: 'Le porte-fusible',
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/fusibles-anciens.png',
      alt: 'Photo de trois fusibles de types différents, dont un marqué 20 ampères.',
      titre: 'Des cartouches.',
      sous: 'Un tube, du sable, un fil de métal au milieu. C’est le fil qui travaille.' },
    { src: 'assets/biblio/fusibles-et-outil.jpeg',
      alt: 'Photo de plusieurs cartouches fusibles de tailles différentes, accompagnées d’un outil de mise en place.',
      titre: 'Un outil dédié.',
      sous: 'On ne retire pas une cartouche à la main, et jamais sous tension.' }
  ],
  creditPhoto: 'Photographies : base de connaissances inerWeb, documents de cours. Détail dans « Crédits ».',

  aQuoiCaSert: 'Porter la cartouche fusible, tenir le contact à ses deux bouts, et protéger les doigts. Le porte-fusible ne coupe rien lui-même : ce qui travaille, c’est le fil calibré à l’intérieur de la cartouche.',
  ouOnLeTrouve: 'En tête de circuit, souvent juste après un sectionneur — ou combiné avec lui, station 3.5.',

  scene: () => Schemas.coupeCartouche(),
  tableauLigne: true,

  technologie: [
    ['Le fil calibré', 'traversé par le courant. Au-delà d’un certain point, la chaleur le fait <strong>fondre</strong>, et le circuit s’ouvre.'],
    ['Le sable', 'ce n’est pas un remplissage : il <strong>absorbe l’arc</strong> et l’empêche de continuer dans le tube vide. C’est lui qui permet à un si petit objet de couper des courants énormes.'],
    ['Le logement', 'il maintient la cartouche et assure le contact. Un contact mou chauffe, et fait fondre un fusible sain.'],
    ['Le voyant', 'sur les modèles modernes, il s’allume quand la cartouche a fondu — de l’extérieur, on ne voit rien.']
  ],

  variantes: [
    '<strong>Cylindrique</strong> — 8×32, 10×38, 14×51, 22×58 mm : la taille fait partie du calibre.',
    '<strong>À couteaux</strong> — pour les forts courants, en tête d’installation.',
    '<strong>À broches, à visser</strong> — matériel ancien, encore rencontré.',
    'Une cartouche porte un <strong>courant</strong> et une <strong>lettre</strong>. La lettre change tout : voir les stations 4.1 et 4.2.',
    'Elle porte aussi un <strong>pouvoir de coupure</strong> : le courant de court-circuit maximal qu’elle sait interrompre.'
  ],

  aptitudes: {
    commander: false, couper: false, isoler: false,
    bonneReponse: 'Aucune des trois, et c’est tout l’intérêt de la question. Le porte-fusible ne commande pas, ne coupe pas à la demande, et n’isole pas. Il attend. C’est la cartouche qui agit, une seule fois, toute seule.',
    erreurs: {
      commander: 'Il ne commande pas : il n’y a rien à manœuvrer, et retirer une cartouche n’est pas une manœuvre de commande.',
      couper: 'Il ne coupe pas <em>à la demande</em>. La cartouche coupe d’elle-même, une seule fois, quand le courant devient trop fort.',
      isoler: '⚠️ Il n’isole pas. Un porte-fusible ouvert n’a ni distance garantie, ni condamnation. Retirer une cartouche ne remplace jamais un sectionnement.'
    }
  },

  cablage: [
    'Le fusible se place <strong>sur la phase</strong>, en tête du circuit protégé.',
    '<strong>Jamais sur le conducteur de protection.</strong> Jamais sur le neutre en régime TT domestique.',
    'On remplace <strong>à l’identique</strong> : même taille, même courant, même lettre.',
    'Contacts propres et bien serrés : un mauvais contact fait fondre une cartouche saine.'
  ],
  piege: 'Le geste dangereux : retirer une cartouche sous tension. Il faut <strong>d’abord</strong> ouvrir un appareil qui sait couper, ensuite seulement toucher au fusible. Et jamais de fil de fer, jamais de papier d’aluminium à la place d’une cartouche.',

  symboles: [
    { src: 'assets/porte_fusible_bi.svg', alt: 'Symbole normalisé d’un porte-fusible à deux pôles.', legende: 'Porte-fusible, deux pôles' },
    { src: 'assets/pojistka3p.svg', alt: 'Symbole normalisé de trois fusibles sur trois pôles.', legende: 'Trois pôles' }
  ],
  lecturePlan: [
    'Un <strong>petit rectangle traversé par le trait du circuit</strong> : un des symboles les plus anciens et les plus simples de la norme.',
    'Le rectangle ne dit pas ce qu’il y a dedans. À côté, le plan écrit le <strong>courant et la lettre</strong> — c’est cela qui compte pour remplacer juste.'
  ],

  quiz: [
    { question: 'Dans une cartouche fusible, à quoi sert le sable ?',
      confirmation: 'Il absorbe l’arc et l’empêche de continuer dans le tube.',
      reponses: [
        { texte: 'À alourdir la cartouche pour qu’elle tienne dans son logement.', pourquoi: 'Le maintien vient du logement lui-même, pas du poids.' },
        { texte: 'À ralentir la fusion pour laisser passer les pointes de courant.', pourquoi: 'Ce comportement vient de la lettre du fusible, pas du sable.' },
        { texte: 'À éteindre l’arc au moment où le fil fond.', juste: true },
        { texte: 'À isoler le fil du tube pour éviter les fuites.', pourquoi: 'Le fil n’a pas besoin d’être isolé du tube : c’est l’arc, au moment de la fusion, qu’il faut éteindre.' } ] },

    { question: 'Peut-on retirer une cartouche pour intervenir sur le circuit ?',
      confirmation: 'Sans distance garantie ni condamnation, ce n’est pas un sectionnement.',
      reponses: [
        { texte: 'Oui, si on garde la cartouche dans sa poche.', pourquoi: 'Rien n’empêche quelqu’un d’en poser une autre. La cartouche en poche ne condamne rien.' },
        { texte: 'Oui, à condition d’être seul dans le local.', pourquoi: 'La sécurité ne repose pas sur la solitude, mais sur un dispositif matériel.' },
        { texte: 'Oui, un porte-fusible ouvert vaut un sectionnement.', pourquoi: 'Non : ni distance d’ouverture garantie, ni moyen de condamnation. Ce n’est pas un sectionnement.' },
        { texte: 'Non, et le geste sous tension est en plus dangereux.', juste: true } ] },

    { question: 'Une cartouche a fondu. Que fait-on ?',
      confirmation: 'On cherche la cause, puis on remplace à l’identique.',
      reponses: [
        { texte: 'On cherche pourquoi, puis on remplace à l’identique.', juste: true },
        { texte: 'On la réarme après refroidissement.', pourquoi: 'Un fusible ne se réarme pas : le fil a fondu, il est détruit.' },
        { texte: 'On la remplace par la première qui rentre dans le logement.', pourquoi: 'La taille n’est pas le seul critère : le courant et la lettre doivent être les mêmes.' },
        { texte: 'On la remplace par un calibre supérieur pour éviter que ça recommence.', pourquoi: 'C’est l’erreur la plus grave : on supprime la protection au lieu de traiter la cause.' } ] },

    { question: 'Le porte-fusible, lui, sait…',
      confirmation: 'Il porte, il tient le contact, il protège les doigts. Il n’agit pas.',
      reponses: [
        { texte: 'Couper le courant à la demande.', pourquoi: 'Il n’y a rien à manœuvrer : ce n’est pas un appareil de coupure.' },
        { texte: 'Porter la cartouche et assurer le contact — rien de plus.', juste: true },
        { texte: 'Se réarmer après un défaut.', pourquoi: 'Rien ne se réarme : la cartouche est détruite et se remplace.' },
        { texte: 'Isoler pour travailler derrière.', pourquoi: 'Ni distance garantie, ni condamnation : il n’isole pas.' } ] }
  ],

  retenir: [
    '<strong>Le porte-fusible ne fait rien : la cartouche fait tout</strong>, et une seule fois.',
    'Le sable éteint l’arc. C’est ce qui rend un si petit objet si efficace.',
    'On remplace <strong>à l’identique</strong> : taille, courant, lettre.',
    'Retirer une cartouche n’est <strong>jamais</strong> un sectionnement.'
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre que le porte-fusible ne fait que porter, que c’est la cartouche qui coupe, une seule fois et d’elle-même — et qu’aucun de ces deux objets ne permet d’isoler.</p>',

  credits: [
    { quoi: 'Photos « cartouches fusibles »', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés — recherche « porte-fusible cartouche fusible »' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: '200_fuses_protective_gears/10_fuses/' } ],

  correspondances: [
    { ligne: 4, couleur: '#c0392b', texte: '4.1 Le fusible gG' },
    { ligne: 4, couleur: '#c0392b', texte: '4.2 Le fusible aM' },
    { ligne: 3, couleur: '#5b4bd6', texte: '3.5 Le sectionneur porte-fusible' } ]
});
