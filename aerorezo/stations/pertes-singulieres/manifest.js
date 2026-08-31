/* D4 — Accidents de parcours
   Ligne D · Distribution
   CP7 · Réaliser l’étude d’une installation de ventilation d’un bâtiment tertiaire

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "D",
  id: "pertes-singulieres",
  title: "Accidents de parcours",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Repérez un coude, un té, une réduction et un registre sur un réseau.",
  bac: "Additionnez les pertes linéaires et les pertes singulières d’une même branche.",
  bts: "Calculez une perte singulière à partir d’un coefficient et de la pression dynamique.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "La même courbe de pression, regardée autrement. Cette fois, laissez la pente de côté et suivez les marches : ces endroits où la pression tombe d’un coup, sans avoir parcouru le moindre mètre. Chacune tient sous un repère du dessin — un coude, un té où le réseau se sépare, une réduction. Trois accidents ici, bien alignés. Dans un faux plafond réel, il y en a quinze.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Une pièce de trente centimètres peut coûter plus cher que dix mètres de gaine droite. La raison est simple : il ne s’agit plus de frottement. Dans un coude, la veine d’air ne suit pas sagement la paroi — elle se décolle, tourbillonne, se recolle plus loin. Ces tourbillons prennent de l’énergie à l’écoulement, et ils ne la rendent jamais.\n\nOn chiffre cette perte avec un coefficient sans unité, noté ζ et lu « zêta », qui ne dépend que de la forme de la pièce. On le multiplie par la pression dynamique de l’air, ρv²/2, c’est-à-dire par ce que coûterait d’arrêter cet air complètement.\n\nUn exemple à retenir. Dans une gaine où l’air va à 5 m/s, la pression dynamique vaut 0,5 × 1,2 × 5² = 15 Pa. Un coude à grand rayon, ζ ≈ 0,25, coûte donc 3,75 Pa. Le même coude à angle vif, ζ ≈ 1,2, en coûte 18 — soit autant que 22 m de gaine droite à 0,8 Pa/m. Un seul coude mal choisi efface tout le soin apporté au reste de la branche.\n\nLa vitesse tranche encore, comme partout sur cette ligne : puisque la perte suit le carré de la vitesse, une vitesse doublée quadruple ce que coûte chaque accident.\n\nEnfin, on additionne le tout sur la branche étudiée — celle du chemin le plus défavorisé, pas toutes les singularités du réseau. La perte totale de cette branche, c’est ce que le ventilateur devra fournir.",

  method: "Chaque changement de direction ou de section doit être compté sur le chemin étudié.",
  formula: "Δp singulière = ζ × ρv²/2  ·  Δp branche = R × L + somme des Δp singulières",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "La branche affichée fait 18 m de droit à 0,7 Pa/m. Mettez d’abord les pertes singulières à zéro et lisez ce que coûte le droit seul. Remontez-les ensuite à 32 Pa : deux coudes à grand rayon, un té de dérivation et une réduction, dans une gaine à 5 m/s. Comparez les deux totaux. Le poseur remplace enfin les deux coudes à grand rayon par des coudes à angle vif, moins chers à l’achat : portez les pertes singulières à 60 Pa.",
  lecture: "12,6 Pa pour 18 m de droit ; 44,6 Pa une fois les accidents comptés. Quatre pièces qui tiennent dans un mètre coûtent deux fois et demie ce que coûtent les dix-huit mètres. Avec les coudes à angle vif, le total monte à 72,6 Pa : 28 Pa de plus, à fournir par le ventilateur à chaque heure de fonctionnement, pendant toute la vie du bâtiment. Le prix d’achat des deux coudes, lui, s’oublie le jour de la livraison.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Les coefficients cités sont des ordres de grandeur. La valeur réelle dépend de la géométrie exacte de la pièce, de son rayon de courbure et, pour un té, de la façon dont le débit se partage : elle se lit dans la documentation du fabricant. Deux méthodes coexistent par ailleurs — les coefficients ζ, ou les longueurs équivalentes qui remplacent chaque accident par des mètres de gaine fictifs. On emploie l’une ou l’autre, jamais les deux, sinon on compte deux fois.",

  activity: {"kind":"loss","rate":0.7,"length":18,"local":32},

  /* Ce que la voix dit — un texte à part, écrit pour l'oreille, jamais l'assemblage
     de ce qui est affiché. Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md. */
  narration: {
    decouvrir: "Reprenons la courbe de pression du bas, et lisons-la autrement. Nous avons parlé de la pente, à la station d’avant. Ce sont les marches, maintenant, qui nous intéressent : ces endroits où la pression tombe d’un coup, sans que l’air ait parcouru le moindre mètre. Chacune correspond à un accident du parcours. Un coude, un té où le réseau se sépare en deux, un rétrécissement. Sur ce dessin, ils sont trois, bien alignés et bien propres. Dans un faux plafond réel, il y en a quinze, et personne ne les a comptés.",

    comprendre: "Pourquoi une pièce de trente centimètres coûte-t-elle plus cher que dix mètres de gaine ? Parce qu’il ne s’agit plus de frottement. Dans un coude, la veine d’air ne suit pas sagement la paroi : elle se décolle, elle tourbillonne, elle se recolle plus loin. Ces tourbillons prennent de l’énergie à l’écoulement, et ils ne la rendent jamais. On chiffre cela avec un coefficient sans unité, qui ne dépend que de la forme de la pièce, et qu’on multiplie par la pression dynamique de l’air — autrement dit par ce que coûterait d’arrêter cet air complètement. Un ordre de grandeur, pour bien voir. Dans une gaine où l’air file à cinq mètres par seconde, un coude à grand rayon coûte moins de quatre pascals. Le même coude, mais à angle vif, en coûte dix-huit. Dix-huit pascals, c’est ce que perdent vingt-deux mètres de gaine droite. Un seul coude mal choisi efface tout le soin apporté au reste de la branche.",

    manipuler: "La branche affichée fait dix-huit mètres de droit. Mettez d’abord le troisième curseur à zéro, pour voir ce que coûte le droit tout seul : douze pascals et demi, à peine. Remontez-le maintenant à trente-deux, ce qui correspond à deux coudes à grand rayon, un té de dérivation et une réduction, dans une gaine à cinq mètres par seconde. Quatre pièces qui tiennent dans un mètre viennent de coûter deux fois et demie le prix des dix-huit mètres. Le poseur remplace ensuite les coudes à grand rayon par des coudes vifs, moins chers à l’achat. Montez alors à soixante, et jugez.",

    verifier: "Deux questions sans note pour refermer les pertes de charge. Ce qu’il faut emporter n’est pas une formule, c’est un réflexe. Sur un plan, on compte les mètres, et on oublie les pièces. Or dans un faux plafond encombré, ce sont les pièces qui font la facture. Et comme tout suit le carré de la vitesse, une gaine trop petite paie deux fois : une fois au mètre, une fois à chaque coude. Plus loin sur la ligne, la station Ventilateur et équilibrage montrera à qui cette facture est présentée."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Un coude, un té ou une réduction ajoutent…","une perte de charge singulière",["une longueur utile de gaine","un gain de pression au passage","une perte de charge singulière"]],
    ["La perte totale d’une branche vaut…","la somme des pertes de ses éléments",["la somme des pertes de ses éléments","la plus grande perte rencontrée","la perte du coude le plus serré"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Additionner les pertes d’une branche, accidents compris, pour établir la pression que le ventilateur devra fournir.",
    acquis: {
      cap: ["Nomme un coude, un té, une réduction et un registre sur une installation", "Montre sur une courbe de pression où se situe un accident de parcours", "Dit qu’un coude fait perdre de la pression"],
      bac: ["Additionne pertes linéaires et pertes singulières sur une même branche", "Compare le poids des accidents à celui de la longueur droite", "Justifie le choix d’un coude à grand rayon plutôt qu’à angle vif"],
      bts: ["Calcule une perte singulière à partir d’un coefficient et de la pression dynamique", "Relève les coefficients dans la documentation du fabricant", "N’emploie qu’une méthode à la fois, coefficients ou longueurs équivalentes"]
    },
    sources: [
      "inerWeb Aéraulique v5 — pertes de charge singulières et accessoires de réseau",
      "Coefficients de pertes singulières des accessoires aérauliques — documentation des fabricants, à l’édition en vigueur"
    ],
    correspondances: [
      {reseau: "HydroMétro", station: "Pertes de charge", pourquoi: "les singularités d’un réseau d’eau obéissent à la même logique, avec un autre fluide et une autre masse volumique"},
      {reseau: "AéroRézo", station: "Ventilateur et équilibrage", pourquoi: "la perte totale calculée ici devient la courbe du réseau, celle qui croise la courbe du ventilateur"}
    ]
  }
});
