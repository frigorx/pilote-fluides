/* D2 — Sections circulaires et rectangulaires
   Ligne D · Distribution
   CP7 · Réaliser l’étude d’une installation de ventilation d’un bâtiment tertiaire

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "D",
  id: "sections",
  title: "Sections circulaires et rectangulaires",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Comparez deux ouvertures et dites laquelle laisse passer le plus d’air.",
  bac: "Calculez la section qu’exige un débit imposé, puis contrôlez la vitesse obtenue.",
  bts: "Comparez une solution ronde et une solution rectangulaire à section utile et diamètre équivalent cohérents.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "La cote sous la gaine annonce 315 mm. Ce nombre n’a pas été choisi en premier : il est arrivé en dernier, après un débit imposé par le plan et une vitesse décidée par le concepteur. Regardez la section coupée — c’est elle, la vraie inconnue de cette station. Le diamètre n’est que la façon de la commander chez le fournisseur.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Ici le calcul se retourne. Sur un plan, on ne connaît pas la vitesse : on connaît un débit, imposé par les occupants et par l’usage du local. La vitesse, c’est le concepteur qui la choisit — c’est le seul endroit de la chaîne où quelqu’un décide.\n\nLa section s’en déduit seule : A = Qᵥ / v, avec le débit ramené à la seconde. Pour 1 400 m³/h à 5 m/s : 1 400 ÷ 3 600 = 0,389 m³/s, puis 0,389 ÷ 5 = 0,0778 m². Le diamètre suit : D = √(4A/π) = 0,315 m, soit 315 mm.\n\nLe résultat tombe rarement aussi rond. Les conduits circulaires se vendent dans une série fixe — 100, 125, 160, 200, 250, 315, 400, 500, 630 mm. On prend le diamètre juste au-dessus du calcul, puis on revient calculer la vitesse réelle dans ce diamètre-là, parce qu’elle a changé. C’est ce retour qui valide le choix, pas le calcul de départ.\n\nLe rectangulaire réserve un piège. À section égale, il ne se comporte pas comme un rond : il perd davantage, parce qu’il offre plus de paroi à l’air. On le dimensionne donc avec un diamètre équivalent — le diamètre du rond qui perdrait autant au mètre, au même débit. Un 500 × 160 mm a la section d’un rond de 319 mm, mais se comporte comme un rond de 298 mm. La section sert à la vitesse réelle, le diamètre équivalent sert aux pertes de charge : ce sont deux nombres différents, et on ne les échange pas.\n\nDernier piège, celui des unités : le plan est coté en millimètres, le calcul se mène en mètres et en mètres carrés. Un diamètre de 315 mm devient 0,315 m avant toute chose.",

  method: "Partez du débit imposé et de la vitesse choisie pour trouver la section — puis revenez vérifier la vitesse réelle du diamètre que vous posez.",
  formula: "A = Qᵥ / v  ·  A cercle = πD²/4  ·  D = √(4A/π)  ·  A rectangle = largeur × hauteur",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Le plan demande 1 400 m³/h dans cette gaine. Laissez le diamètre sur 315 et cherchez la vitesse qui donne ce débit. Le faux plafond ne laisse finalement passer qu’un 250 : sans toucher au débit demandé, ramenez le diamètre à 250 et retrouvez les 1 400 m³/h. Notez la vitesse obtenue. Cherchez enfin le plus petit diamètre qui garderait la vitesse sous 6 m/s — puis regardez s’il existe dans la série du commerce.",
  lecture: "Le débit s’affiche sous les curseurs, mais c’est la vitesse qu’il faut surveiller. À 315 mm elle vaut environ 5 m/s : le réseau est calme. À 250 mm elle approche 8 m/s : la gaine tiendrait, mais elle sifflerait, et chaque coude du réseau coûterait deux fois et demie plus de pression, parce que la perte suit le carré de la vitesse. Entre 250 et 315, le curseur propose des diamètres que personne ne fabrique.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Une section calculée n’est pas une section posée. Le curseur avance de cinq en cinq millimètres, le commerce non. Cette station ignore aussi l’isolant, qui s’ajoute autour du conduit et mange encore de la hauteur disponible. Les vitesses citées sont des ordres de grandeur de confort : la valeur retenue dépend de l’usage du local et des documents du projet.",

  activity: {"kind":"flowcalc","diameter":315,"velocity":5},

  /* Ce que la voix dit — un texte à part, écrit pour l'oreille, jamais l'assemblage
     de ce qui est affiché. Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md. */
  narration: {
    decouvrir: "Cette gaine ressemble à celle de la station du débit, mais la question s’est retournée. Là-bas, on connaissait la taille du conduit et la vitesse de l’air, et on cherchait ce qui passait dedans. Ici, c’est le débit qui est donné. Il vient du plan, il vient du nombre de personnes dans le local, et il ne se négocie pas. Ce qu’on cherche, c’est la taille du passage qui va le laisser filer. Entre les deux, il reste un choix, et un seul : celui de la vitesse. C’est le seul endroit de toute la chaîne où quelqu’un décide vraiment.",

    comprendre: "On part du débit, on choisit une vitesse, et la surface se déduit toute seule : on divise l’un par l’autre. Un piège d’unité attend là. Le débit arrive en mètres cubes par heure, la vitesse en mètres par seconde ; il faut donc ramener le débit à la seconde, c’est-à-dire le diviser par trois mille six cents. De la surface, on remonte ensuite au diamètre. Et c’est là que commence le vrai travail du concepteur, parce que le nombre trouvé n’existe pas au catalogue. Les conduits ronds se vendent dans une série fixe : cent, cent vingt-cinq, cent soixante, deux cents, deux cent cinquante, trois cent quinze. On prend celui juste au-dessus, et surtout on revient calculer la vitesse réelle dedans, puisqu’elle vient de changer. Le rectangulaire, enfin, réserve une surprise. À surface égale, il ne perd pas autant qu’un rond : il perd davantage, parce qu’il présente plus de tôle à l’air.",

    manipuler: "Le plan demande mille quatre cents mètres cubes par heure. Avec le diamètre affiché, cherchez la vitesse qui les donne : vous devriez tomber tout près de cinq. C’est une vitesse de bureau, calme, sans sifflement dans les bouches. Arrive alors l’imprévu de chantier : le faux plafond ne laisse passer qu’un deux cent cinquante. Le débit, lui, ne bouge pas, puisque c’est celui des occupants. Retrouvez-le avec la petite gaine, et suivez la vitesse qui grimpe vers huit. Ce n’est pas qu’une question de confort : chaque coude du réseau vient de coûter deux fois et demie plus de pression.",

    verifier: "Deux questions, sans note, pour voir si le sens du calcul est bien passé. En cas d’erreur, la correction s’affiche avec son explication, et c’est là que la station sert vraiment. Ce qu’il faut emporter tient en deux phrases. Une section se calcule à partir d’un débit imposé et d’une vitesse choisie, jamais l’inverse. Et le conduit qu’on pose n’est presque jamais celui qu’on a calculé, parce qu’on prend celui du commerce juste au-dessus. La suite de la ligne va chiffrer ce que ce choix coûte, mètre après mètre."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Avant de calculer une aire en m², un diamètre en mm doit être…","divisé par 1000",["multiplié par 100","divisé par 1000","laissé tel quel"]],
    ["Doubler le diamètre d’une gaine circulaire multiplie l’aire par…","quatre",["deux","trois","quatre"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Déterminer la section des conduits d’un réseau à partir des débits du plan, puis vérifier la vitesse réelle des diamètres retenus.",
    acquis: {
      cap: ["Lit un diamètre coté sur un plan et le dit en millimètres", "Compare deux sections et désigne la plus grande", "Repère la différence entre un conduit rond et un conduit rectangulaire"],
      bac: ["Convertit un débit en mètres cubes par seconde avant de calculer", "Calcule la section exigée par un débit et une vitesse choisie", "Retient le diamètre normalisé au-dessus et recalcule la vitesse réelle"],
      bts: ["Justifie une vitesse de conception au regard du bruit et de l’encombrement", "Détermine un diamètre équivalent pour un conduit rectangulaire", "Distingue section géométrique et diamètre équivalent dans un calcul de pertes"]
    },
    sources: [
      "inerWeb Aéraulique v5 — dimensionnement de gaines circulaires et rectangulaires",
      "Diamètre équivalent d’un conduit rectangulaire — relation de Huebscher, reprise dans les guides de dimensionnement aéraulique"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "Débit, vitesse, section", pourquoi: "c’est la même relation, prise dans l’autre sens : là le débit était cherché, ici il est imposé"},
      {reseau: "AéroRézo", station: "Pertes de charge linéaires", pourquoi: "le diamètre retenu ici commande la perte au mètre calculée là-bas"}
    ]
  }
});
