/* ÉlectroRézo 3.1 — L'interrupteur. Données de la station ; la forme vient de
   ../_commun/modele-appareil.js */

ModeleAppareil.construire({
  id: '3.1', ligne: 3,
  kicker: 'ÉlectroRézo · Ligne 3 Couper et isoler · Station 1',
  titre: 'L’interrupteur',
  narration: NARRATION,

  prerequis: [
    { id: '1.1', quoi: "le courant" },
  ],

  photos: [
    { src: 'assets/biblio/interrupteur.jpeg',
      alt: 'Photo d’un interrupteur électrique gris encastré dans un cadre blanc, avec deux barres de commande au centre.',
      titre: 'Un interrupteur.',
      sous: 'Deux pièces de métal, un ressort, et un boîtier. C’est tout.' }
  ],
  creditPhoto: 'Photographie : base de connaissances inerWeb, document de cours. Détail dans « Crédits ».',

  aQuoiCaSert: 'Ouvrir et fermer un circuit, souvent, pendant que le courant passe. C’est l’appareil de la manœuvre quotidienne : on l’actionne dix fois par jour sans y penser.',
  ouOnLeTrouve: 'Sur un mur, sur une machine, dans un tableau. Partout où quelqu’un doit allumer ou éteindre quelque chose.',

  scene: () => Schemas.coupeContact(),
  tableauLigne: true,

  technologie: [
    ['Deux pièces de métal', 'l’une fixe, l’autre mobile. Fermées, le courant passe ; écartées, il ne passe plus.'],
    ['Un ressort', 'il rend le mouvement <strong>brusque</strong>, quelle que soit la lenteur du doigt. C’est lui qui fait le claquement.'],
    ['L’arc électrique', 'à l’instant de la séparation, le courant continue un instant dans l’air, sous forme d’un petit éclair très chaud. S’il dure, il brûle le métal.'],
    ['Le boîtier', 'il tient les pièces à distance et protège les doigts. C’est lui qui porte l’indice de protection.']
  ],

  variantes: [
    '<strong>Simple allumage</strong> — un point de commande, le cas courant.',
    '<strong>Va-et-vient</strong> — deux points de commande pour le même circuit, un couloir, un escalier.',
    '<strong>Bipolaire</strong> — il coupe la phase <em>et</em> le neutre. Obligatoire dans certains locaux.',
    '<strong>Étanche</strong> — indice de protection renforcé, pour l’atelier ou l’extérieur.',
    'Deux nombres sont écrits dessus : le <strong>courant</strong> qu’il accepte de couper, et la <strong>tension</strong> sous laquelle il le fait. Les dépasser, c’est le tuer en quelques manœuvres.'
  ],

  aptitudes: {
    commander: true, couper: true, isoler: false,
    bonneReponse: 'Exactement. Un interrupteur commande et coupe en charge — c’est son métier. Mais il n’isole pas : il n’a ni la distance d’ouverture garantie, ni le moyen d’être condamné. On ne travaille jamais derrière un simple interrupteur.',
    erreurs: {
      commander: 'Il sait commander : c’est même sa raison d’être, on l’actionne tous les jours.',
      couper: 'Il sait couper en charge : le ressort et le pouvoir de coupure sont là pour ça.',
      isoler: 'Il n’isole pas. Rien ne garantit la distance entre les pièces ouvertes, et rien ne permet de le cadenasser. Pour isoler, il faut un sectionneur.'
    }
  },

  cablage: [
    'Deux bornes : l’arrivée et le départ. Sur un bipolaire, quatre.',
    'On coupe <strong>la phase</strong>, jamais le conducteur de protection.',
    'Serrage au couple : une borne mal serrée chauffe, noircit, puis lâche.',
    'Section du fil adaptée au courant — voir la station 4.9.'
  ],
  piege: 'Erreur classique : couper le neutre au lieu de la phase. Le circuit s’éteint, tout paraît normal… et l’installation reste sous tension.',

  symboles: [
    { src: 'assets/015_inter_2.svg', alt: 'Symbole normalisé d’un interrupteur unipolaire.', legende: 'Interrupteur, un pôle' },
    { src: 'assets/012_switch_dpst.svg', alt: 'Symbole normalisé d’un interrupteur bipolaire.', legende: 'Interrupteur, deux pôles' }
  ],
  lecturePlan: [
    'Un trait qui vient toucher un point, et un second trait incliné : la partie mobile. Ouvert ou fermé se lit d’un coup d’œil.',
    'Sur un schéma, un appareil est <strong>toujours dessiné au repos</strong> — tel qu’il est quand personne ne le touche. Ce n’est pas forcément l’état dans lequel vous le trouverez.'
  ],

  quiz: [
    { question: 'Pourquoi un interrupteur claque-t-il quand on l’actionne ?',
      confirmation: 'Le ressort sépare les pièces si vite que l’arc n’a pas le temps de s’installer.',
      reponses: [
        { texte: 'Pour prévenir l’utilisateur que le circuit est coupé.', pourquoi: 'Le bruit n’est pas un signal : il est la conséquence du ressort, qui existe pour une raison électrique.' },
        { texte: 'C’est un défaut de fabrication des modèles bon marché.', pourquoi: 'Au contraire : un interrupteur qui ne claquerait pas s’userait beaucoup plus vite.' },
        { texte: 'Les pièces de métal se dilatent et se détendent.', pourquoi: 'La dilatation existe dans un bilame de relais thermique, pas dans un interrupteur.' },
        { texte: 'Un ressort rend le mouvement brusque, pour écourter l’arc électrique.', juste: true } ] },

    { question: 'Que se passe-t-il à l’instant précis où les contacts se séparent ?',
      confirmation: 'Un arc très chaud, bref, qui abîme le métal s’il dure.',
      reponses: [
        { texte: 'Un arc électrique se forme entre les pièces, et il est très chaud.', juste: true },
        { texte: 'La tension monte brutalement dans tout le bâtiment.', pourquoi: 'Le réseau n’est pas modifié par l’ouverture d’un interrupteur.' },
        { texte: 'Le courant s’arrête net, sans rien d’autre.', pourquoi: 'Non : il continue un instant dans l’air, entre les deux pièces qui s’écartent.' },
        { texte: 'Rien de particulier : c’est un contact mécanique ordinaire.', pourquoi: 'S’il n’y avait rien, le ressort et le pouvoir de coupure n’auraient aucune raison d’exister.' } ] },

    { question: 'Peut-on travailler sur une machine après avoir ouvert son interrupteur ?',
      confirmation: 'Un interrupteur ne garantit ni la distance d’ouverture, ni la condamnation.',
      reponses: [
        { texte: 'Oui, du moment que le voyant est éteint.', pourquoi: 'Un voyant éteint prouve seulement que le voyant est éteint. Il ne prouve pas l’absence de tension.' },
        { texte: 'Non : il faut un appareil capable d’isoler et d’être condamné.', juste: true },
        { texte: 'Oui, un interrupteur ouvert est un sectionnement.', pourquoi: 'Justement pas. Le sectionnement exige une distance d’ouverture garantie et un moyen de condamnation.' },
        { texte: 'Oui, si on prévient un collègue.', pourquoi: 'Prévenir ne remplace pas la condamnation : n’importe qui peut refermer l’appareil.' } ] },

    { question: 'Un interrupteur porte l’indication 10 A · 250 V. Cela veut dire…',
      confirmation: 'Ce sont ses limites de coupure, pas une consigne de réglage.',
      reponses: [
        { texte: 'Qu’il protège le circuit jusqu’à 10 ampères.', pourquoi: 'Un interrupteur ne protège rien. Protéger, c’est le métier de la ligne 4.' },
        { texte: 'Qu’il faut l’alimenter en 250 volts exactement.', pourquoi: 'C’est une tension maximale admise, pas une tension exigée.' },
        { texte: 'Qu’il accepte de couper jusqu’à 10 A, sous 250 V au plus.', juste: true },
        { texte: 'Qu’il consomme 10 ampères.', pourquoi: 'Un interrupteur ne consomme rien : il laisse passer, ou il n’laisse pas passer.' } ] }
  ],

  retenir: [
    '<strong>Il commande.</strong> C’est l’appareil qu’on actionne tous les jours.',
    '<strong>Il coupe en charge</strong>, dans la limite des deux nombres écrits dessus.',
    '<strong>Il n’isole pas.</strong> On ne travaille jamais derrière un simple interrupteur.',
    'Le claquement, c’est le ressort qui écourte l’arc. Ce n’est pas un défaut.'
  ],

  objectifs: '<p><strong>Objectif.</strong> Savoir ce qu’un interrupteur sait faire — commander et couper en charge — et ce qu’il ne sait pas faire : isoler. Reconnaître son symbole et lire ses deux valeurs limites.</p>',

  credits: [
    { quoi: 'Photo « interrupteur »', source: 'base de connaissances inerWeb',
      detail: 'document de cours indexé dans la base — recherche « interrupteur électrique commande »' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: '380_signaling_operating/21_selector_switches/' } ],

  correspondances: [
    { ligne: 5, couleur: '#1e7e54', texte: '5.1 Le contact NO / NF' },
    { ligne: 3, couleur: '#5b4bd6', texte: '3.2 Le sectionneur' } ]
});
