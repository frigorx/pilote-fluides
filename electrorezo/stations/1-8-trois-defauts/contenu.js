/* ÉlectroRézo 1.8 — Surcharge, court-circuit, défaut d’isolement. */

ModeleGrandeur.construire({
  id: '1.8', ligne: 1,
  kicker: 'ÉlectroRézo · Ligne 1 Les grandeurs · Station 8',
  titre: "Les trois défauts",
  narration: NARRATION,

  prerequis: [
    { id: '1.1', quoi: "le courant" },
    { id: '1.3', quoi: "la résistance" },
  ],

  photos: [
    { src: 'assets/biblio/courbe-de-danger.jpeg',
      alt: "Courbe normalisée des zones temps-courant des effets du courant alternatif sur le corps humain, de la perception à la fibrillation cardiaque.",
      titre: "Ce qui est en jeu.", sous: "Quelques dizaines de milliampères, et quelques dixièmes de seconde." },
    { src: 'assets/biblio/tableau-des-sections.jpeg',
      alt: "Tableau donnant, pour chaque section de conducteur en cuivre et chaque type d’isolant, l’intensité admissible.",
      titre: "Ce qu’un câble supporte.", sous: "Au-delà, il chauffe — sans que rien ne se voie." }
  ],

  lIdee: "Une installation peut mal se comporter de trois façons, et de trois seulement. Trop de courant qui dure. Trop de courant d’un coup. Ou du courant qui part là où il ne devrait pas. Chacune a sa protection, et aucune protection ne les couvre toutes.",
  ouOnLaRencontre: "Ces trois mots reviendront à chaque station de la ligne 4. Ils y servent de fil rouge : pour chaque appareil, on demandera lequel des trois il sait voir.",

  scene: () => SchemasGrandeurs.troisDefauts(),

  ceQuiSePasse: [
    ["La surcharge", "le courant emprunte le bon chemin, mais il est un peu trop fort, et il <strong>dure</strong>. Le conducteur chauffe, l’isolant vieillit. Cela peut prendre des mois, et rien ne se voit."],
    ["Le court-circuit", "deux conducteurs se touchent. Il n’y a presque plus de résistance sur le chemin, donc plus rien pour freiner : des milliers d’ampères en quelques millièmes de seconde."],
    ["Le défaut d’isolement", "le courant quitte son chemin et part vers la terre — par une carcasse métallique, ou par une personne. Il n’est ni fort ni lent : il est <strong>ailleurs</strong>."],
    ["Trois défauts, trois protections", "un bilame pour la surcharge, une bobine ou un fusible pour le court-circuit, un différentiel pour le défaut d’isolement. Aucun appareil ne fait spontanément les trois."]
  ],
  aRetenir: [
    "Le <strong>plus discret</strong> est la surcharge : elle ne fait ni bruit ni étincelle.",
    "Le <strong>plus brutal</strong> est le court-circuit : il est fini avant qu’on ait compris.",
    "Le <strong>plus dangereux pour l’homme</strong> est le défaut d’isolement : quelques centièmes d’ampère suffisent."
  ],

  mesure: () => SchemasGrandeurs.quelInstrumentVoitQuoi(),
  instrument: [
    "La <strong>surcharge</strong> se constate à la pince, en comparant avec la plaque. C’est la seule des trois qu’on mesure facilement en service.",
    "Le <strong>court-circuit</strong> ne se mesure pas sur le moment : il est trop rapide et trop dangereux. On le constate après coup, par ce qui a fondu ou déclenché.",
    "Le <strong>défaut d’isolement</strong> se mesure au <strong>mégohmmètre</strong>, installation consignée et débranchée. Il envoie une haute tension d’essai et regarde ce qui fuit.",
    "Le bouton <strong>test</strong> d’un différentiel vérifie qu’il coupe encore. Deux fois par an, et cela ne remplace pas une mesure d’isolement."
  ],
  dangerDeMesure: "Un mégohmmètre envoie 500 volts, parfois 1000. On ne le branche jamais sur une installation en service, ni sur du matériel électronique qu’il détruirait.",

  ecriture: {
    symbole: 'I', unite: 'A', nomUnite: 'toujours des ampères — c’est le lieu et la durée qui changent',
    multiples: [
      ['+20 % pendant des minutes', 'la surcharge'],
      ['×1000 pendant des millisecondes', 'le court-circuit'],
      ['30 mA vers la terre', 'le défaut d’isolement — le seuil de la vie']
    ]
  },
  surUnePlaque: [
    "Sur un <strong>disjoncteur magnéto-thermique</strong>, deux signes annoncent deux protections : le crochet du thermique, le demi-cercle du magnétique.",
    "Sur un <strong>différentiel</strong>, la sensibilité est écrite en milliampères : <em>30 mA</em> pour la protection des personnes.",
    "Sur un <strong>relais thermique</strong>, un seul signe : le crochet. Il ne voit ni le court-circuit ni le défaut d’isolement, et son symbole le dit.",
    "Vous savez déjà lire ces signes si vous avez suivi la ligne 8. Sinon, elle vous y attend."
  ],

  quiz: [
    { question: "Quel défaut est le plus discret ?",
      confirmation: "La surcharge : ni bruit, ni étincelle, ni odeur. Juste de la chaleur.",
      reponses: [
        { texte: "Le court-circuit.", pourquoi: "Il est au contraire spectaculaire : bruit, arc, déclenchement immédiat." },
        { texte: "Les trois se voient aussi bien.", pourquoi: "Ils se manifestent très différemment." },
        { texte: "Le défaut d’isolement.", pourquoi: "Discret aussi, mais il fait généralement déclencher un différentiel." },
        { texte: "La surcharge.", juste: true } ] },

    { question: "Quel appareil voit un défaut d’isolement ?",
      confirmation: "Le différentiel, et lui seul.",
      reponses: [
        { texte: "Le différentiel.", juste: true },
        { texte: "Le relais thermique.", pourquoi: "Il ne surveille que l’échauffement dû au courant du moteur." },
        { texte: "Le disjoncteur magnéto-thermique.", pourquoi: "Ses deux déclencheurs ne regardent que le courant qui passe, pas celui qui s’échappe." },
        { texte: "Le fusible.", pourquoi: "Il ne voit que ce qui le traverse, et un courant de fuite ne le traverse pas." } ] },

    { question: "Comment mesure-t-on un défaut d’isolement ?",
      confirmation: "Au mégohmmètre, installation consignée et débranchée.",
      reponses: [
        { texte: "À la pince ampèremétrique, en service.", pourquoi: "La pince mesure un courant de charge, pas une qualité d’isolant." },
        { texte: "Au mégohmmètre, hors tension.", juste: true },
        { texte: "Au voltmètre, entre phase et terre.", pourquoi: "Cette mesure donne une tension, pas un état d’isolement." },
        { texte: "En appuyant sur le bouton test du différentiel.", pourquoi: "Ce bouton vérifie l’appareil, il ne mesure pas l’isolement de l’installation." } ] },

    { question: "Pourquoi le seuil de 30 mA a-t-il été choisi pour les différentiels ?",
      confirmation: "Parce qu’en dessous, le courant n’est pas encore mortel pour le cœur.",
      reponses: [
        { texte: "Parce que c’est un chiffre rond.", pourquoi: "Le choix vient des courbes d’effet du courant sur le corps." },
        { texte: "Parce que c’est le plus petit courant mesurable.", pourquoi: "On sait mesurer bien plus fin que cela." },
        { texte: "Parce qu’au-dessus, le courant devient mortel.", juste: true },
        { texte: "Parce que c’est le seuil de destruction des câbles.", pourquoi: "Un câble ne craint rien à 30 milliampères." } ] }
  ],

  retenir: [
    "<strong>Surcharge</strong> : bon chemin, trop fort, longtemps. Le bilame.",
    "<strong>Court-circuit</strong> : plus rien ne freine. La bobine, ou le fusible.",
    "<strong>Défaut d’isolement</strong> : le courant part ailleurs. Le différentiel, et lui seul.",
    "<strong>Aucun appareil ne fait spontanément les trois.</strong>"
  ],

  objectifs: '<p><strong>Objectif.</strong> Distinguer les trois défauts, savoir ce que chacun fait, et connaître l’appareil qui le voit.</p><p><strong>Limite.</strong> Le calcul des courants de court-circuit et les schémas de liaison à la terre relèvent d’un autre cours.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 4, couleur: '#c0392b', texte: "4.3 Le disjoncteur magnéto-thermique" },
    { ligne: 4, couleur: '#c0392b', texte: "4.5 L’interrupteur différentiel" },
    { ligne: 4, couleur: '#c0392b', texte: "4.8 La terre" } ]
});
