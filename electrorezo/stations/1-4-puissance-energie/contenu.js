/* ÉlectroRézo 1.4 — La puissance et l’énergie. */

ModeleGrandeur.construire({
  id: '1.4', ligne: 1,
  kicker: 'ÉlectroRézo · Ligne 1 Les grandeurs · Station 4',
  titre: "La puissance et l’énergie",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/compteur-kwh.jpeg',
      alt: "Photo d’un compteur électrique à totalisateur, affichant l’énergie consommée en kilowattheures.",
      titre: "Le totalisateur.", sous: "Il ne redescend jamais : il additionne." },
    { src: 'assets/biblio/compteur-kwh-2.jpeg',
      alt: "Photo d’un second compteur électrique monté sur son support, avec son affichage en kilowattheures.",
      titre: "C’est lui qui facture.", sous: "Deux relevés, une soustraction : voilà la consommation." }
  ],

  lIdee: "La puissance, c’est ce qu’un appareil demande à un instant donné. L’énergie, c’est ce qu’il a fini par consommer. Ce sont deux choses différentes, et les confondre coûte cher — au sens propre.",
  ouOnLaRencontre: "Les watts sont écrits sur tout : ampoules, radiateurs, moteurs, plaques de cuisson. Les kilowattheures, eux, ne sont écrits nulle part sur les appareils. Ils sont sur une seule chose : la facture.",

  scene: () => SchemasGrandeurs.puissanceEtEnergie(),

  ceQuiSePasse: [
    ["La puissance est un débit", "elle dit ce qui passe maintenant. Coupez l’appareil, elle tombe à zéro instantanément."],
    ["L’énergie est un total", "elle s’accumule. Une fois consommée, elle l’est pour de bon, et le compteur ne redescend pas."],
    ["Le lien entre les deux", "l’énergie, c’est la puissance multipliée par le temps. Un kilowatt pendant une heure fait un kilowattheure."],
    ["En courant alternatif", "tout ce qui est appelé ne travaille pas. La <strong>puissance active</strong>, en watts, est celle qui fait tourner et chauffer ; la <strong>puissance apparente</strong>, en voltampères, est celle que le réseau doit fournir. Le rapport entre les deux est le <strong>facteur de puissance</strong>."]
  ],
  aRetenir: [
    "La puissance se note <strong>P</strong> et se mesure en <strong>watts</strong>.",
    "L’énergie se note <strong>E</strong> et se compte en <strong>kilowattheures</strong>.",
    "<strong>P = U × I</strong> en continu et en monophasé résistif. En triphasé, il faut ajouter √3 et le cos φ.",
    "Un gros appareil allumé une minute consomme moins qu’un petit appareil allumé toute la nuit."
  ],

  mesure: () => SchemasGrandeurs.compteurEnergie(),
  instrument: [
    "Le <strong>wattmètre</strong>, ou un multimètre qui en fait office, donne la puissance <strong>à l’instant</strong>.",
    "Le <strong>compteur</strong> donne l’énergie <strong>depuis sa pose</strong>. Il ne redescend jamais.",
    "Pour connaître une consommation : deux relevés, et une soustraction. Il n’y a pas d’autre méthode.",
    "Pour estimer sans compteur : multipliez la puissance par le nombre d’heures. L’ordre de grandeur suffit presque toujours."
  ],

  ecriture: {
    symbole: 'P', unite: 'W', nomUnite: 'le watt',
    multiples: [
      ['1 W', 'l’unité — une veille d’appareil en consomme quelques-uns'],
      ['1 kW', 'mille watts — un radiateur, un petit moteur'],
      ['1 kWh', 'un kilowatt pendant une heure — c’est ce que compte le compteur']
    ]
  },
  surUnePlaque: [
    "Sur une <strong>plaque de moteur</strong>, la puissance écrite — par exemple 1,5 kW — est la puissance <strong>mécanique rendue sur l’arbre</strong>. Ce n’est pas celle absorbée au réseau, qui est plus grande.",
    "Sur une <strong>ampoule</strong> ou un <strong>radiateur</strong>, la puissance écrite est bien celle qui est absorbée.",
    "La différence tient au <strong>rendement</strong> : un moteur qui rend 1,5 kW en absorbe environ 1,8. La différence part en chaleur.",
    "Le <strong>cos φ</strong> écrit sur la plaque est le facteur de puissance. Il vaut typiquement 0,8 : il faut donc appeler bien plus que ce qui travaille."
  ],

  quiz: [
    { question: "Quelle est la différence entre un watt et un kilowattheure ?",
      confirmation: "Le watt dit ce qui passe maintenant ; le kilowattheure dit ce qui s’est accumulé.",
      reponses: [
        { texte: "Aucune : ce sont deux façons d’écrire la même chose.", pourquoi: "L’une est un débit, l’autre un total : ce sont deux grandeurs distinctes." },
        { texte: "Le watt est pour le continu, le kilowattheure pour l’alternatif.", pourquoi: "Les deux valent dans les deux régimes." },
        { texte: "Le kilowattheure vaut mille watts.", pourquoi: "Mille watts font un kilowatt : le kilowattheure ajoute une durée." },
        { texte: "Le watt est un débit, le kilowattheure est un total.", juste: true } ] },

    { question: "Un radiateur de 2000 W allumé un quart d’heure, ou une veille de 100 W allumée dix heures : lequel consomme le plus ?",
      confirmation: "500 Wh contre 1000 Wh : la veille consomme le double.",
      reponses: [
        { texte: "La veille : deux fois plus.", juste: true },
        { texte: "Les deux exactement pareil.", pourquoi: "500 wattheures contre 1000 : ce n’est pas la même chose." },
        { texte: "Impossible à dire sans connaître la tension.", pourquoi: "La puissance est déjà donnée : la tension n’est plus nécessaire." },
        { texte: "Le radiateur, il est bien plus puissant.", pourquoi: "La puissance ne suffit pas : il faut la multiplier par la durée." } ] },

    { question: "Une plaque de moteur annonce 1,5 kW. Que désigne ce nombre ?",
      confirmation: "La puissance mécanique rendue sur l’arbre, pas celle absorbée.",
      reponses: [
        { texte: "La puissance absorbée au réseau.", pourquoi: "Elle est plus grande : le moteur perd en route, par échauffement et par frottement." },
        { texte: "La puissance mécanique rendue sur l’arbre.", juste: true },
        { texte: "La puissance maximale au démarrage.", pourquoi: "La pointe de démarrage est bien supérieure et n’est pas écrite sur la plaque." },
        { texte: "L’énergie consommée en une heure.", pourquoi: "Ce serait un kilowattheure, une autre grandeur." } ] },

    { question: "Comment connaît-on l’énergie consommée par une installation sur un mois ?",
      confirmation: "Deux relevés du compteur, et une soustraction.",
      reponses: [
        { texte: "En lisant le compteur une fois.", pourquoi: "Un relevé unique donne un total depuis la pose, pas une consommation sur une période." },
        { texte: "En mesurant la puissance avec une pince.", pourquoi: "La pince donne l’instant, pas l’accumulation." },
        { texte: "En relevant le compteur deux fois et en soustrayant.", juste: true },
        { texte: "En additionnant les puissances de tous les appareils.", pourquoi: "Cela donnerait une puissance, et sans tenir compte des durées de marche." } ] }
  ],

  retenir: [
    "<strong>P</strong>, en <strong>watts</strong> : ce qui passe maintenant.",
    "<strong>E</strong>, en <strong>kilowattheures</strong> : ce qui s’est accumulé.",
    "<strong>L’énergie = la puissance × le temps.</strong>",
    "<strong>La plaque d’un moteur annonce ce qu’il REND</strong>, pas ce qu’il absorbe."
  ],

  objectifs: '<p><strong>Objectif.</strong> Distinguer puissance et énergie, savoir ce que compte un compteur, et lire la puissance écrite sur une plaque pour ce qu’elle est.</p><p><strong>Limite.</strong> Le calcul complet des puissances en triphasé et la compensation du facteur de puissance ne sont pas traités ici.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 1, couleur: '#2e6f9e', texte: "1.7 Lire une plaque signalétique" },
    { ligne: 2, couleur: '#7a4fb5', texte: "2.3 Le réseau triphasé" },
    { ligne: 6, couleur: '#c9451a', texte: "6.3 Le moteur asynchrone" } ]
});
