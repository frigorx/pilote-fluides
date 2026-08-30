/* ÉlectroRézo 2.6 — Le champ tournant. */

ModeleGrandeur.construire({
  id: '2.6', ligne: 2,
  kicker: 'ÉlectroRézo · Ligne 2 Les réseaux · Station 6',
  titre: "Le champ tournant",
  narration: NARRATION,

  prerequis: [
    { id: '2.3', quoi: "le triphasé" },
    { id: '1.6', quoi: "la fréquence" },
  ],

  photos: [
    { src: 'assets/biblio/deux-contacteurs-pour-deux-sens.png',
      alt: "Schéma d’un moteur triphasé commandé par deux contacteurs K1 et K2, dont les raccordements diffèrent par l’échange de deux phases.",
      titre: "Deux sens, deux contacteurs.", sous: "Regardez bien : deux fils sont croisés entre les deux." },
    { src: 'assets/biblio/bornier-moteur-tri-et-terre.png',
      alt: "Schéma de raccordement des borniers d’un moteur triphasé, avec ses trois phases et sa terre.",
      titre: "L’ordre compte.", sous: "Ce sont les mêmes fils : seul leur ordre change le sens." }
  ],

  lIdee: "Voici pourquoi le triphasé a gagné. Trois bobines fixes, trois courants décalés — et il apparaît un champ magnétique qui tourne, sans qu’aucune pièce ne bouge. Le rotor d’un moteur n’a plus qu’à le suivre.",
  ouOnLaRencontre: "Dans tous les moteurs triphasés de l’atelier. Et sur le terrain, ce champ décide d’une chose très concrète : le sens dans lequel la machine va tourner.",

  scene: () => SchemasReseaux.champTournant(),

  ceQuiSePasse: [
    ["Trois bobines, fixes", "disposées à 120 degrés l’une de l’autre dans le stator. Elles ne bougent jamais."],
    ["Trois courants, décalés", "chacune reçoit une phase. Comme les trois courants sont décalés d’un tiers de tour, chaque bobine est à son maximum à un moment différent."],
    ["Leur effet combiné tourne", "additionnez les trois à chaque instant : vous obtenez un champ de valeur constante, dont la <strong>direction tourne</strong>. C’est le champ tournant."],
    ["Le rotor suit", "placé au milieu, il est entraîné. Il tourne un peu moins vite que le champ — cet écart s’appelle le glissement, et il est nécessaire au fonctionnement."]
  ],
  aRetenir: [
    "Le champ tourne à la <strong>vitesse de synchronisme</strong> : 3000 tr/min à 50 Hz pour deux pôles, 1500 pour quatre.",
    "<strong>Échanger deux phases inverse le sens.</strong> Deux, jamais trois : échanger les trois revient à ne rien changer.",
    "Un moteur triphasé n’a besoin d’aucun dispositif de démarrage. C’est l’avantage décisif sur le monophasé."
  ],

  mesure: () => SchemasReseaux.controlerLOrdre(),
  instrument: [
    "Le <strong>contrôleur d’ordre de phases</strong> se branche sur les trois conducteurs et affiche le sens. Le moteur n’a pas bougé.",
    "L’<strong>essai bref</strong> consiste à lancer une seconde et à regarder. C’est gratuit, et c’est risqué : sur une pompe ou un compresseur, une seconde à l’envers suffit parfois à casser quelque chose.",
    "Pour <strong>inverser</strong>, on échange deux phases sur le bornier. On note toujours lesquelles : le collègue suivant doit pouvoir revenir en arrière.",
    "Après toute intervention sur l’alimentation d’une machine tournante, <strong>on revérifie le sens</strong>. Un dépannage qui remet les fils dans le désordre est un dépannage raté."
  ],
  dangerDeMesure: "Certaines machines ne supportent pas une seule seconde de rotation inverse : compresseurs à vis, pompes à huile, ventilateurs à pales orientées. Sur celles-là, le contrôleur d’ordre de phases n’est pas un luxe.",

  ecriture: {
    symbole: 'ns', unite: 'tr/min', nomUnite: 'la vitesse de synchronisme',
    multiples: [
      ['3000 tr/min', 'deux pôles, à 50 Hz'],
      ['1500 tr/min', 'quatre pôles — le cas le plus courant'],
      ['1000 tr/min', 'six pôles']
    ]
  },
  surUnePlaque: [
    "La <strong>vitesse écrite</strong> sur la plaque est celle <em>en charge</em> : 1435 tr/min, et non 1500. La différence est le glissement.",
    "Sur un <strong>plan</strong>, le sens de rotation est indiqué par une <strong>flèche</strong> près du moteur. Quand elle y est, elle fait foi.",
    "Sur un <strong>bornier</strong>, les phases arrivent dans l’ordre L1, L2, L3. Cet ordre est une convention : le respecter, c’est permettre au suivant de comprendre.",
    "Sur une machine, une <strong>flèche est souvent peinte</strong> sur le carter. Cherchez-la avant de brancher : elle vous évitera l’essai."
  ],

  quiz: [
    { question: "Qu’est-ce qui tourne dans un champ tournant ?",
      confirmation: "Sa direction. Aucune pièce ne bouge.",
      reponses: [
        { texte: "Les bobines du stator.", pourquoi: "Elles sont fixes, encastrées dans le fer." },
        { texte: "Le neutre.", pourquoi: "Le neutre est un conducteur : il ne tourne pas." },
        { texte: "La direction du champ magnétique.", juste: true },
        { texte: "L’intensité, qui augmente et diminue.", pourquoi: "La valeur du champ résultant est justement constante : c’est sa direction qui tourne." } ] },

    { question: "Comment inverse-t-on le sens d’un moteur triphasé ?",
      confirmation: "En échangeant deux phases. Deux, jamais trois.",
      reponses: [
        { texte: "En changeant le couplage étoile-triangle.", pourquoi: "Le couplage change la tension vue par les bobinages, pas le sens." },
        { texte: "En échangeant les trois phases.", pourquoi: "Cela revient à ne rien changer : l’ordre est le même." },
        { texte: "En inversant le neutre et une phase.", pourquoi: "Ce serait un court-circuit, pas une inversion." },
        { texte: "En échangeant deux phases.", juste: true } ] },

    { question: "À 50 Hz, un moteur à quatre pôles a quelle vitesse de synchronisme ?",
      confirmation: "1500 tr/min : 3000 divisé par deux paires de pôles.",
      reponses: [
        { texte: "1500 tr/min.", juste: true },
        { texte: "3000 tr/min.", pourquoi: "C’est la valeur pour deux pôles." },
        { texte: "1435 tr/min.", pourquoi: "C’est une vitesse en charge, glissement compris — pas le synchronisme." },
        { texte: "750 tr/min.", pourquoi: "C’est la valeur pour huit pôles." } ] },

    { question: "Pourquoi préfère-t-on un contrôleur d’ordre de phases à l’essai bref ?",
      confirmation: "Parce qu’il ne fait rien tourner : certaines machines ne supportent pas une seconde à l’envers.",
      reponses: [
        { texte: "Parce qu’il est plus rapide.", pourquoi: "L’essai bref est au moins aussi rapide." },
        { texte: "Parce que le moteur ne tourne pas pendant la vérification.", juste: true },
        { texte: "Parce qu’il est obligatoire.", pourquoi: "Il n’est pas obligatoire : il est prudent." },
        { texte: "Parce qu’il mesure aussi la tension.", pourquoi: "Ce n’est pas sa fonction, et ce n’est pas la raison." } ] }
  ],

  retenir: [
    "<strong>Trois bobines fixes</strong>, trois courants décalés : un champ qui <strong>tourne</strong>.",
    "<strong>Le moteur démarre seul.</strong> C’est l’avantage décisif du triphasé.",
    "<strong>Deux phases échangées</strong> inversent le sens. Deux, jamais trois.",
    "<strong>Vérifier avant de lancer</strong> : certaines machines ne pardonnent pas une seconde."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre comment trois courants décalés créent un champ tournant, savoir comment inverser un sens de rotation, et vérifier l’ordre des phases avant de démarrer.</p><p><strong>Limite.</strong> Le calcul du glissement et le couple en fonction de la vitesse relèvent de la ligne 6.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 6, couleur: '#c9451a', texte: "6.3 Le moteur asynchrone triphasé" },
    { ligne: 1, couleur: '#2e6f9e', texte: "1.6 La fréquence" },
    { ligne: 5, couleur: '#0f7b6c', texte: "5.2 Le contacteur" } ]
});
