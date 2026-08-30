/* ÉlectroRézo 2.3 — Le réseau triphasé. */

ModeleGrandeur.construire({
  id: '2.3', ligne: 2,
  kicker: 'ÉlectroRézo · Ligne 2 Les réseaux · Station 3',
  titre: "Le réseau triphasé",
  narration: NARRATION,

  prerequis: [
    { id: '2.2', quoi: "le monophasé" },
  ],

  photos: [
    { src: 'assets/biblio/trois-sinusoides-decalees.jpeg',
      alt: "Trois courbes sinusoïdales de même amplitude, décalées d’un tiers de période l’une par rapport à l’autre.",
      titre: "Trois, décalées.", sous: "Même valeur, même fréquence, un tiers de tour d’écart." },
    { src: 'assets/biblio/trois-phases-et-le-neutre.jpeg',
      alt: "Schéma montrant les trois phases L1, L2, L3 et le neutre, avec trois flèches V1, V2, V3 mesurant chaque tension simple.",
      titre: "Quatre conducteurs.", sous: "Trois phases, un neutre — et six mesures possibles." },
    { src: 'assets/biblio/du-transformateur-a-l-abonne.jpeg',
      alt: "Schéma de la distribution : le transformateur haute tension abaisse vers un réseau triphasé, dont chaque abonné reçoit une part.",
      titre: "D’où il vient.", sous: "Un transformateur de quartier, et une maison sur trois par phase." }
  ],

  lIdee: "Le triphasé, ce sont trois tensions au lieu d’une. Même valeur, même fréquence, mais décalées d’un tiers de tour. Ce décalage n’est pas une complication : c’est ce qui permet à un moteur de démarrer tout seul, et à un câble de transporter trois fois plus de puissance.",
  ouOnLaRencontre: "Dans tous les ateliers, toutes les armoires industrielles, toutes les machines de plus de quelques kilowatts. Et dans la rue : le réseau de distribution est triphasé de bout en bout.",

  scene: () => SchemasReseaux.troisSinusoides(),

  ceQuiSePasse: [
    ["Trois tensions identiques", "même valeur efficace, même fréquence. Ce qui les distingue, c’est uniquement le moment où chacune passe par son maximum."],
    ["Décalées d’un tiers de tour", "120 degrés. Ce décalage vient de la construction de l’alternateur : trois bobinages disposés à 120 degrés l’un de l’autre."],
    ["Leur somme est nulle", "à chaque instant, les trois s’annulent. C’est pour cela que, sur une installation équilibrée, le neutre ne ramène presque rien — et qu’il peut être plus fin que les phases."],
    ["Pourquoi c’est mieux", "à câble égal, on transporte bien plus de puissance. Et surtout, un moteur triphasé démarre <strong>seul</strong> : le décalage crée un champ tournant, et le rotor n’a qu’à le suivre."]
  ],
  aRetenir: [
    "Trois phases : <strong>L1, L2, L3</strong>. Plus, souvent, un <strong>neutre</strong>.",
    "Sur une même prise, deux valeurs cohabitent : <strong>400 V</strong> entre deux phases, <strong>230 V</strong> entre une phase et le neutre.",
    "Le neutre n’est pas toujours distribué. Une machine triphasée sans neutre est parfaitement normale."
  ],

  mesure: () => SchemasReseaux.sixMesures(),
  instrument: [
    "Sur une prise triphasée avec neutre, il y a <strong>six mesures</strong> possibles, et <strong>deux valeurs</strong> seulement.",
    "Les <strong>trois entre phases</strong> doivent donner 400 volts, à quelques volts près.",
    "Les <strong>trois vers le neutre</strong> doivent donner 230 volts, à quelques volts près.",
    "Une valeur qui sort du lot annonce un <strong>conducteur coupé</strong>, ou un neutre mal raccordé. C’est un diagnostic à part entière."
  ],
  dangerDeMesure: "Sur une même prise, il y a 230 et 400 volts selon les bornes choisies. Se tromper de paire, c’est envoyer 400 volts dans un appareil qui en attend 230.",

  ecriture: {
    symbole: '3 ~', unite: 'V', nomUnite: 'deux tensions, 230 et 400 V',
    multiples: [
      ['3 ~', 'triphasé sans neutre — trois conducteurs'],
      ['3 N ~', 'triphasé avec neutre — quatre conducteurs'],
      ['400 / 230 V', 'la façon d’écrire les deux tensions du réseau français']
    ]
  },
  surUnePlaque: [
    "Sur une <strong>plaque de moteur</strong> : <em>3 ~</em> et deux tensions. C’est ce que vous verrez presque toujours en atelier.",
    "Sur une <strong>notice</strong>, l’écriture <em>400 / 230 V</em> donne d’abord la composée, puis la simple. L’ordre est constant.",
    "Sur un <strong>plan de puissance</strong>, trois traits verticaux descendent en parallèle. C’est la signature du triphasé, et elle se voit d’un coup d’œil.",
    "Les repères sont <strong>L1, L2, L3</strong>. Sur du matériel ancien, vous trouverez encore <em>R, S, T</em> — c’est la même chose."
  ],

  quiz: [
    { question: "De combien sont décalées les trois tensions ?",
      confirmation: "D’un tiers de tour, soit 120 degrés.",
      reponses: [
        { texte: "De 90 degrés.", pourquoi: "Ce serait un quart de tour : il n’y aurait pas de place pour trois." },
        { texte: "De 180 degrés.", pourquoi: "Ce serait l’opposition, et deux suffiraient." },
        { texte: "Cela dépend de la charge.", pourquoi: "Le décalage vient de l’alternateur : la charge n’y change rien." },
        { texte: "De 120 degrés.", juste: true } ] },

    { question: "Pourquoi le neutre peut-il être plus fin que les phases ?",
      confirmation: "Parce que sur une installation équilibrée, les trois courants s’annulent.",
      reponses: [
        { texte: "Parce que sur une installation équilibrée, les trois courants s’annulent.", juste: true },
        { texte: "Parce qu’il est relié à la terre.", pourquoi: "Ce raccordement ne dit rien du courant qu’il ramène." },
        { texte: "Parce qu’il est moins dangereux.", pourquoi: "Le danger n’intervient pas dans le choix d’une section." },
        { texte: "Parce qu’il ne transporte jamais rien.", pourquoi: "Il transporte le déséquilibre, qui n’est jamais tout à fait nul." } ] },

    { question: "Sur une prise triphasée avec neutre, combien de valeurs différentes mesure-t-on ?",
      confirmation: "Deux : 400 entre phases, 230 vers le neutre.",
      reponses: [
        { texte: "Six, une par paire de bornes.", pourquoi: "Il y a bien six mesures, mais elles ne donnent que deux valeurs." },
        { texte: "Deux.", juste: true },
        { texte: "Une seule : 400 V.", pourquoi: "Les mesures vers le neutre donnent 230 volts." },
        { texte: "Quatre, une par conducteur.", pourquoi: "On ne mesure jamais « un conducteur » : une tension se mesure entre deux." } ] },

    { question: "Une machine triphasée n’a pas de neutre raccordé. Est-ce normal ?",
      confirmation: "Oui, tout à fait : le neutre n’est pas toujours distribué.",
      reponses: [
        { texte: "Non, il manque un fil.", pourquoi: "Beaucoup de machines n’en ont aucun besoin." },
        { texte: "Non, la protection ne fonctionnera pas.", pourquoi: "La protection s’appuie sur le PE, pas sur le neutre." },
        { texte: "Oui, tout à fait normal.", juste: true },
        { texte: "Oui, mais seulement en dessous de 1 kW.", pourquoi: "La puissance n’a aucun rapport avec la présence du neutre." } ] }
  ],

  retenir: [
    "<strong>Trois tensions</strong>, décalées de <strong>120 degrés</strong>.",
    "<strong>400 V entre phases</strong>, <strong>230 V vers le neutre</strong>, sur la même prise.",
    "<strong>Leur somme est nulle</strong> : le neutre ne ramène que le déséquilibre.",
    "<strong>Six mesures, deux valeurs.</strong> Une qui sort du lot est un diagnostic."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre ce que sont trois tensions décalées, connaître les deux tensions d’une même prise, et savoir contrôler un réseau par six mesures.</p><p><strong>Limite.</strong> Les calculs de puissance en triphasé équilibré et déséquilibré sont hors du champ de cette station.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 2, couleur: '#7a4fb5', texte: "2.4 La tension simple" },
    { ligne: 2, couleur: '#7a4fb5', texte: "2.6 Le champ tournant" },
    { ligne: 6, couleur: '#c9451a', texte: "6.4 Le couplage de la plaque à bornes" } ]
});
