/* M2 — Mesurer un débit
   Ligne M · Mesure & diagnostic
   Validation expérimentale et diagnostic · CP4, CP7, CP9, CP10

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "M",
  id: "mesure-debit",
  title: "Mesurer un débit",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Place correctement un appareil dans le flux.",
  bac: "Transforme une vitesse moyenne et une section en débit.",
  bts: "Réalise un profil ou une traversée et estime la qualité de la mesure.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "La gaine est traversée par une grille de points de relevé : douze, répartis dans la section, et pas un seul au milieu. En amont, une cote marque la longueur droite exigée avant le point de mesure. L’anémomètre entre par un seul trou et se déplace de point en point. Regarde la place que prennent ces douze relevés — c’est le prix d’un débit auquel on peut se fier.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "À la station Débit, vitesse, section, on a établi que l’air ne va pas à la même vitesse partout : rapide au centre, freiné contre la paroi. Mesurer un débit, c’est donc mesurer une vitesse moyenne, pas une vitesse.\n\nLa méthode s’appelle la traversée. On découpe la section en zones de même surface, on relève une vitesse au centre de chacune, et on fait la moyenne de ces relevés — chaque zone pèse ainsi le même poids. Douze points sur une gaine ronde de taille courante est un ordre de grandeur habituel ; le nombre exact et la position des points sont donnés par la méthode retenue pour le chantier, et ils changent avec la forme et la taille de la gaine. On multiplie ensuite cette moyenne par l’aire de la section, et on obtient le débit.\n\nRien de tout cela ne vaut si l’air arrive tordu. Un coude, un registre, un piquage juste en amont laissent un écoulement en tourbillon, où les vitesses n’ont plus aucun ordre. On cherche donc une longueur droite avant le point de mesure, de l’ordre de plusieurs fois le diamètre de la gaine, et une longueur plus courte après. La valeur exacte se lit dans le texte applicable au chantier ; elle ne s’invente pas.\n\nAux bouches, on ne traverse rien : on applique un cône qui ramasse tout l’air vers l’appareil. Trois pièges y attendent. Un cône mal plaqué laisse fuir de l’air sur le pourtour et fait chuter la valeur. Un cône de forme inadaptée à la bouche perturbe le jet. Et le cône lui-même ajoute une résistance qui freine un peu le débit qu’on cherche à mesurer : les appareils récents corrigent cet effet, les autres non.",

  method: "Une vitesse locale n’est pas automatiquement la vitesse moyenne de toute la section.",
  formula: "Qᵥ = v moyenne × A  ·  m³/s × 3600 = m³/h",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Deux curseurs : la vitesse moyenne relevée et la section de la gaine. Pose 4,2 mètres par seconde sur 0,055 mètre carré, et note le débit obtenu. Imagine maintenant que tu n’aies relevé qu’un seul point, au centre : la vitesse y dépasse la moyenne d’environ un quart. Monte donc le curseur à 5,3 mètres par seconde, sans toucher à la section, et regarde le débit annoncé.",
  lecture: "Le débit s’affiche en mètres cubes par heure : compare-le à celui que demande le plan, et pas à celui que tu espérais trouver. Un écart de quelques pour cent se discute ; un écart de vingt pour cent a une cause, et cette cause se cherche. L’écart entre tes deux essais est exactement l’erreur que commet une mesure prise au centre. Regarde son sens : elle gonfle toujours le résultat, et fait croire qu’une installation débite alors qu’elle est en dessous.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Le calcul suppose que la vitesse affichée est bien une moyenne, et que la section est pleine et connue. Il ne dit rien de l’incertitude du relevé, qui vient de l’appareil, du nombre de points et de la stabilité de l’air. Sur une installation en service, un débit se donne toujours avec la méthode qui l’a produit : sans elle, la valeur n’est pas vérifiable.",

  activity: {"kind":"measure","velocity":4.2,"area":0.055},

  /* Ce que la voix dit — un texte à part, écrit pour l'oreille, jamais l'assemblage
     de ce qui est affiché. Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md. */
  narration: {
    decouvrir: "Voici une gaine, vue de côté, et cette grille de petits points est le vrai sujet de la station. Douze relevés, répartis dans toute la section, alors qu’un seul suffirait à faire tourner un calcul. Pourquoi douze ? Parce que l’air ne traverse pas la gaine à la même vitesse partout : il file au milieu et il traîne le long du métal. Un seul point pris au centre donne donc une valeur trop forte, et le débit qu’on en tire est faux — toujours dans le même sens, toujours à la hausse.",

    comprendre: "La méthode s’appelle une traversée, et elle est plus simple qu’elle n’en a l’air. On découpe la section en zones qui ont toutes la même surface, on relève une vitesse au milieu de chacune, et on fait la moyenne de ces relevés. Chaque zone pèse alors le même poids, ce qui est exactement ce qu’on veut. Cette moyenne, multipliée par la surface de la gaine, donne le débit. Mais tout cela s’écroule si l’air arrive de travers. Après un coude ou un registre, il tourbillonne, et les vitesses ne veulent plus rien dire. C’est pourquoi on cherche une longueur droite avant le point de mesure, de l’ordre de plusieurs fois le diamètre de la gaine. La valeur exacte dépend du texte qu’on applique sur le chantier : elle se vérifie, elle ne se récite pas. Aux bouches, enfin, on change de méthode : un cône ramasse tout l’air vers l’appareil, à condition d’être bien plaqué sur son pourtour.",

    manipuler: "À vous d’essayer, avec les deux curseurs. Posez d’abord la vitesse moyenne et la section proposées, et gardez le débit annoncé en mémoire. Puis faites semblant de n’avoir mesuré qu’au centre de la gaine : la vitesse y dépasse la moyenne d’environ un quart. Montez le curseur d’autant, sans toucher à la section. L’écart de débit qui apparaît est précisément l’erreur que commet celui qui plante son anémomètre au milieu et rentre chez lui. Sur une réception d’installation, cette erreur fait passer un réseau qui ne le mérite pas.",

    verifier: "Deux questions pour finir, sans note, comme partout. Ce qui compte ici n’est pas d’avoir juste, c’est de repérer tout de suite ce qui n’est pas encore installé dans la tête, pendant qu’on peut y revenir. Une erreur affiche la bonne réponse et son explication : elle mérite d’être lue, même quand la faute paraît évidente. Et le fil de la station se résume ainsi : un débit ne sort pas d’un point de mesure, il sort d’une moyenne, prise dans un air qui arrive droit."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Un débit se calcule à partir…","d’une vitesse moyenne et d’une aire",["d’une vitesse relevée au centre","d’une vitesse moyenne et d’une aire","d’une pression relevée en paroi"]],
    ["Une traversée de gaine sert à…","relever le profil des vitesses",["vérifier l’étanchéité du conduit","repérer l’emplacement du filtre","relever le profil des vitesses"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Vérifier le débit réellement transporté par une gaine ou soufflé par une bouche.",
    acquis: {
      cap: ["Repère les points de relevé sur une section", "Place l’anémomètre dans le sens du flux", "Lit un débit en mètres cubes par heure"],
      bac: ["Calcule une vitesse moyenne à partir de plusieurs relevés", "Transforme cette moyenne et une section en débit", "Vérifie la longueur droite disponible avant de mesurer"],
      bts: ["Choisit un nombre et une répartition de points adaptés à la section", "Estime le sens et l’ampleur de l’erreur d’une mesure prise au centre", "Consigne la méthode employée avec la valeur trouvée"]
    },
    sources: [
      "Méthodes de traversée de gaine : le nombre et la position des points dépendent de la méthode retenue et de la forme de la section — la règle applicable se lit dans le document du chantier",
      "Notices des cônes de mesure : la correction de contre-pression n’existe pas sur tous les appareils"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "Débit, vitesse, section (A3)", pourquoi: "le profil des vitesses y est établi ; c’est lui qui impose la traversée plutôt qu’un relevé unique"},
      {reseau: "HydroMétro", station: "Débit", pourquoi: "la même démarche avec un autre fluide : on mesure une moyenne, jamais un point"}
    ]
  }
});
