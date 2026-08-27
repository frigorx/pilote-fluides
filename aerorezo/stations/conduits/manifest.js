/* D1 — Choisir les conduits
   Ligne D · Distribution
   CP7 · Réaliser l’étude d’une installation de ventilation d’un bâtiment tertiaire

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "D",
  id: "conduits",
  title: "Choisir les conduits",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Reconnais une gaine circulaire, une gaine rectangulaire et un flexible sur une installation.",
  bac: "Choisis un conduit selon la place disponible, l’étanchéité, l’entretien et les pertes.",
  bts: "Argumente forme, matériau, classe d’étanchéité, isolation et accessibilité au regard du projet.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Le local est occupé. L’air entre par la façade, à gauche, et repart par le plafond, à droite. Entre les deux, le conduit n’est pas visible : il passe au-dessus du faux plafond, dans la hauteur qu’on lui a laissée. Cette hauteur est souvent arrêtée avant l’étude de ventilation. C’est pourtant elle qui commande la forme du conduit, bien avant le calcul.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Trois familles de conduits se posent en ventilation, et elles ne se valent pas.\n\nLe circulaire, en tôle spiralée, est le plus efficace. À section égale, c’est lui qui offre le moins de paroi au frottement de l’air : les pertes sont les plus faibles, et les raccords à joint à lèvre se montent vite et ferment bien. Son défaut est l’encombrement : un rond de 400 mm réclame 400 mm de hauteur libre, plus les suspentes.\n\nLe rectangulaire passe là où le rond ne passe pas. On peut l’aplatir : 600 × 200 mm tient dans un faux plafond bas. Mais à section égale il présente plus de paroi que le rond, donc plus de frottement, et ses grandes faces vibrent si elles ne sont pas raidies — c’est un bruit de tôle qu’on entend dans le bureau du dessous.\n\nLe flexible ne sert qu’au raccordement final, sur un mètre ou deux, et il se pose tendu. Un flexible détendu, plié, laissé en boucle au-dessus d’un plafond, c’est le fléau du métier : ses spires écrasées font perdre plusieurs fois ce que perdrait un rond de même diamètre. La bouche ne débite plus, et c’est le ventilateur qu’on accuse.\n\nRestent deux exigences qui ne se négocient pas. L’étanchéité d’abord : une gaine qui fuit à mi-parcours livre moins d’air en bout que ce que le plan annonce, et la classe exigée se lit dans les documents du projet. L’accessibilité ensuite : sans trappe de visite, une gaine ne se nettoie pas, et un conduit qui traverse une paroi coupe-feu porte un clapet qui doit rester atteignable pour être contrôlé.",

  method: "Le conduit le plus facile à poser n’est pas toujours le plus facile à équilibrer ou entretenir.",
  formula: "Choix = usage + encombrement + pertes + acoustique + maintenance",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Sous le dessin, une question à trois réponses. Avant de cliquer, projette-toi cinq ans plus tard : le faux plafond est refermé, personne ne se souvient du tracé, et une bouche débite mal. Demande-toi laquelle des trois réponses te laisse encore une chance de trouver la panne. Choisis, puis lis la correction.",
  lecture: "Une bonne réponse ne suffit pas : dis pourquoi les deux autres sont fausses. Cacher tous les organes donne un beau plafond et une installation muette — plus de trappe, plus de point de mesure, plus rien à régler le jour où ça va mal. Multiplier les flexibles fait gagner une heure à la pose et coûte des pascals tous les jours qui suivent.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Cette station donne des critères de choix, pas un catalogue. Les dimensions disponibles, les classes d’étanchéité et les degrés de résistance au feu se lisent dans les documents du projet et dans les fiches des fabricants — ils changent selon le texte applicable et sa version.",

  activity: {"kind":"choice","prompt":"Priorité de conception ?","answer":"Rester accessible et étanche","choices":["Cacher tous les organes","Rester accessible et étanche","Multiplier les flexibles"]},

  /* Ce que la voix dit — un texte à part, écrit pour l'oreille, jamais l'assemblage
     de ce qui est affiché. Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md. */
  narration: {
    decouvrir: "Un local, des gens dedans, de l’air qui entre en façade et qui ressort au plafond. Ce qui va décider de la forme du conduit n’est pourtant pas sur ce dessin. C’est la hauteur libre au-dessus du faux plafond, et sur un chantier de bureaux elle dépasse rarement trente centimètres. Beaucoup croient qu’un conduit se choisit sur catalogue, à partir du débit. En vérité il se choisit trois fois : une fois pour la place qu’il occupe, une fois pour l’air qu’il laisse passer sans siffler, et une fois pour le jour où quelqu’un devra le nettoyer.",

    comprendre: "Le rond, d’abord. À surface de passage égale, c’est la forme qui offre le moins de paroi à l’air. Moins de paroi, moins de frottement, moins de pression perdue : voilà pourquoi on le préfère partout où il tient. Son problème, c’est justement qu’il faut de la hauteur, et qu’un rond ne s’aplatit pas. Le rectangulaire répond à ce problème, et il le paie. Même surface, plus de paroi, donc plus de frottement. Et ses grandes faces plates vibrent comme une membrane si on ne les raidit pas : c’est ce ronflement de tôle qu’on entend parfois dans un bureau, une fois tout le monde parti. Le flexible, enfin. Il rend un vrai service sur le dernier mètre, celui qui rattrape le désalignement entre la gaine et la bouche. Mais posé détendu, en boucle au-dessus d’un plafond, il devient un frein. Ses spires écrasées avalent une pression énorme, la bouche ne débite plus, et l’installateur suivant remplacera un ventilateur qui n’avait rien.",

    manipuler: "La question posée sous le dessin ressemble à un piège, elle n’en est pas un. Elle demande ce qu’on met en premier quand tout ne rentre pas. Cacher les organes donne un beau plafond et une installation muette : aucune trappe, aucun point de mesure, rien à régler le jour où ça va mal. Multiplier les flexibles fait gagner une heure à la pose et coûte de la pression chaque jour pendant vingt ans. Ce qui reste, c’est ce qu’on peut atteindre et ce qui ne fuit pas. Répondez-vous à vous-même avant de cliquer.",

    verifier: "Deux questions pour finir, et elles ne comptent dans aucune note. Elles servent à repérer ce qui n’est pas encore en place, tant qu’il est temps d’y revenir. En cas d’erreur, la bonne réponse s’affiche avec son explication : c’est le moment le plus utile de la station. Et si les deux passent, gardez ceci pour le reste de la ligne : la forme d’un conduit se paie en pression tous les jours, alors que l’accès qu’on lui laisse ne se paie qu’une fois, à la pose."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Un flexible long, plié et mal tendu…","augmente fortement la perte de charge",["améliore l’équilibrage du réseau","réduit le bruit du ventilateur","augmente fortement la perte de charge"]],
    ["Le choix d’un conduit dépend…","de la place, du bruit et de l’entretien",["de la place, du bruit et de l’entretien","du seul prix d’achat au mètre","de la seule vitesse d’air visée"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Choisir les conduits d’un réseau de ventilation dans la hauteur disponible, sans sacrifier l’étanchéité ni l’accès à l’entretien.",
    acquis: {
      cap: ["Nomme les trois familles de conduits devant une installation", "Repère une trappe de visite et dit à quoi elle sert", "Signale un flexible détendu ou plié"],
      bac: ["Justifie le choix d’un rectangulaire par la hauteur disponible", "Explique pourquoi un flexible se pose court et tendu", "Situe les points où le réseau doit rester accessible"],
      bts: ["Compare rond et rectangulaire à débit imposé, pertes et encombrement à l’appui", "Recherche la classe d’étanchéité exigée dans les documents du projet", "Repère les traversées de parois coupe-feu et l’accès aux clapets"]
    },
    sources: [
      "inerWeb Aéraulique v5 — conduits, raccordements et étanchéité des réseaux",
      "NF EN 12237 (conduits circulaires) et NF EN 1507 (conduits rectangulaires) — à consulter dans la version applicable au projet"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "Pertes de charge linéaires", pourquoi: "la forme choisie ici se paie au mètre : c’est la station qui la chiffre"},
      {reseau: "Législation", station: "Incendie", pourquoi: "le clapet coupe-feu d’une traversée de paroi — correspondance à ouvrir quand la station existera"}
    ]
  }
});
