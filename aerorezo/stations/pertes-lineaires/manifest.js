/* D3 — Pertes de charge linéaires
   Ligne D · Distribution
   CP7 · Réaliser l’étude d’une installation de ventilation d’un bâtiment tertiaire

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "D",
  id: "pertes-lineaires",
  title: "Pertes de charge linéaires",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Observe la pression diminuer tout au long d’une gaine droite.",
  bac: "Calcule la perte d’une portion droite à partir d’une valeur par mètre et d’une longueur relevée.",
  bts: "Relie vitesse, diamètre, rugosité et longueur à la perte de charge d’un tronçon.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Sous le tracé des gaines, une seconde courbe suit la pression le long du parcours. Elle ne fait que descendre, jamais remonter. Regarde comment elle descend : par endroits elle glisse doucement, régulièrement ; ailleurs elle tombe d’un coup, en marche d’escalier. Cette station ne s’occupe que de la pente douce. Les marches sont pour la station suivante.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "L’air frotte contre la tôle sur toute la longueur du conduit. C’est un impôt, et il se paie au mètre : on l’exprime en pascals par mètre de gaine.\n\nTrois choses font monter cette valeur, et elles ne pèsent pas le même poids. La vitesse d’abord, et de très loin : la perte suit à peu près le carré de la vitesse, si bien qu’une vitesse doublée multiplie la perte au mètre par près de quatre. Le diamètre ensuite : dans une gaine étroite, aucune veine d’air n’est loin de la paroi, donc tout freine. La rugosité enfin — entre une tôle spiralée neuve et un flexible laissé détendu, l’écart ne se compte pas en pourcentage, il se compte en multiples.\n\nCette valeur ne se devine pas et ne se calcule pas de tête : on la lit dans une abaque ou dans un logiciel de dimensionnement, à partir du débit et du diamètre du tronçon. Un réseau de confort se dimensionne souvent autour de 0,8 à 1,5 Pa/m — c’est un ordre de grandeur de conception, à vérifier sur le projet, pas une valeur à réciter.\n\nReste à multiplier par la longueur, et c’est là que se perdent les études. Un plan est à plat : la descente sous une poutre, le contournement d’un tableau, la remontée après un obstacle n’y apparaissent pas. Une antenne dessinée sur 24 m se pose parfois sur 32 m. On relève la longueur sur le tracé réel, tronçon par tronçon, puis on additionne.",

  method: "Une valeur en Pa/m doit être multipliée par la longueur réellement parcourue.",
  formula: "Δp linéaire = R × L  ·  R en Pa/m, lu dans l’abaque à partir du débit et du diamètre",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Laisse le troisième curseur à zéro : les accidents de parcours attendront la station suivante. Le plan annonce une antenne de 24 m à 0,8 Pa/m — lis la perte obtenue. Le métreur passe ensuite sur le chantier : la gaine contourne deux poutres et descend au tableau, elle mesure 32 m. Corrige la longueur et relis. Enfin, le faux plafond a imposé une gaine plus étroite : porte la perte au mètre à 1,6 Pa/m.",
  lecture: "Le total s’affiche en pascals sous les curseurs. De 19,2 à 25,6 Pa : huit mètres absents du plan ont coûté un tiers de perte en plus, sans que personne ne les ait dessinés. Le passage en gaine plus étroite, lui, double le total d’un coup. Compare toujours ce total à un ordre de grandeur : une antenne de bureau se chiffre en dizaines de pascals. Si tu trouves des centaines, c’est que la gaine est trop petite ou le métré faux.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "La perte au mètre n’est pas une constante du réseau. Elle change à chaque tronçon, dès qu’une dérivation emporte une partie du débit ou que le diamètre change. Un calcul sérieux découpe la branche en tronçons et les additionne ; le curseur de cette station n’en tient qu’un seul. Les fuites du réseau ne sont pas comptées non plus : une gaine mal étanchée perd de l’air, pas seulement de la pression.",

  activity: {"kind":"loss","rate":0.8,"length":24,"local":0},

  /* Ce que la voix dit — un texte à part, écrit pour l'oreille, jamais l'assemblage
     de ce qui est affiché. Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md. */
  narration: {
    decouvrir: "Sous le tracé des gaines, il y a une deuxième courbe, et c’est la plus intéressante des deux. Elle raconte la pression tout au long du parcours, et elle ne fait que descendre. Il y a d’ailleurs deux façons de descendre. Par moments elle glisse doucement, régulièrement, comme une route en pente : c’est l’air qui frotte contre la tôle, mètre après mètre, sans rien de spectaculaire. Et par moments elle tombe d’un coup, en marche d’escalier, chaque fois que le parcours change de direction. Nous allons regarder la pente aujourd’hui. Les marches viennent juste après.",

    comprendre: "Le frottement est un impôt, et il se paie au mètre : on l’exprime donc en pascals par mètre de gaine. Trois choses le font monter, et elles ne pèsent pas du tout le même poids. La vitesse d’abord, et c’est elle qui commande tout le reste. Quand elle double, la perte au mètre est multipliée par près de quatre. Le diamètre ensuite : dans une gaine étroite, aucune veine d’air n’est loin de la paroi, donc tout freine en même temps. La rugosité enfin, c’est-à-dire l’état de la surface. Entre une tôle spiralée neuve et un flexible laissé détendu, l’écart ne se compte pas en pourcentage, il se compte en multiples. Cette valeur au mètre ne se devine pas : on la lit dans une abaque ou dans un logiciel, à partir du débit et du diamètre. Puis on la multiplie par la longueur — la vraie, celle de la gaine posée, pas celle qu’on mesure sur un plan à plat.",

    manipuler: "Le troisième curseur reste à zéro, puisque les accidents de parcours attendent la station suivante. Le plan annonce une antenne de vingt-quatre mètres, à huit dixièmes de pascal par mètre : voyons ce que cela donne. Le métreur passe ensuite sur le chantier, et là, la gaine contourne deux poutres avant de redescendre au tableau. Elle fait trente-deux mètres pour de vrai. Corrigez la longueur, et la perte grimpe d’un tiers, pour des mètres que personne n’avait dessinés. Le faux plafond a imposé, pour finir, une gaine plus étroite, qui double la perte au mètre. Le total double avec elle.",

    verifier: "Deux questions sans note, avant de passer aux marches d’escalier. En cas d’erreur, la correction s’affiche avec son explication, et elle vaut souvent mieux qu’une bonne réponse trouvée au hasard. Ce qu’il faut emporter tient en une phrase : une perte au mètre ne dit rien tant qu’on ne l’a pas multipliée par la longueur réellement posée. Et cette longueur ne se lit pas sur un plan à plat. Elle se relève sur le tracé, avec ses descentes, ses contournements et ses remontées — ceux que le dessin ne montre jamais."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Une perte de charge linéaire s’exprime couramment en…","pascals par mètre de gaine",["pascals par mètre de gaine","mètres cubes par heure","pascals par mètre carré"]],
    ["À perte par mètre constante, doubler la longueur…","double la perte de la portion",["ne change pas la perte totale","double la perte de la portion","divise la perte par deux"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Chiffrer ce qu’une branche de gaine droite fait perdre en pression, à partir de la longueur réellement posée.",
    acquis: {
      cap: ["Suit la descente de pression le long d’un parcours de gaines", "Distingue une pente douce d’une chute brutale sur la courbe", "Dit qu’une gaine plus longue fait perdre davantage"],
      bac: ["Multiplie une perte au mètre par une longueur relevée", "Relève une longueur de gaine sur un tracé, descentes comprises", "Situe le résultat obtenu dans un ordre de grandeur plausible"],
      bts: ["Explique pourquoi la perte suit à peu près le carré de la vitesse", "Découpe une branche en tronçons de débit et de diamètre constants", "Recherche la perte au mètre dans une abaque ou un logiciel de dimensionnement"]
    },
    sources: [
      "inerWeb Aéraulique v5 — pertes de charge des réseaux de gaines",
      "Abaques de pertes de charge linéaires pour conduits circulaires — à utiliser dans l’édition fournie avec le logiciel ou le guide du projet"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "Sections circulaires et rectangulaires", pourquoi: "le diamètre retenu là-bas fixe la perte au mètre lue ici"},
      {reseau: "AéroRézo", station: "Accidents de parcours", pourquoi: "la pente et les marches s’additionnent sur la même branche : l’une sans l’autre ne donne rien"}
    ]
  }
});
