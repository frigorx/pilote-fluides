/* T4 — Récupération d’énergie
   Ligne T · Centrale de traitement d’air
   CP10 · Réaliser l’étude d’une centrale de traitement d’air
   Correspondance : ligne V · VMC

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 sur le moule de la station pilote — voir CONTRAT-CONTENU.md.
   La station VMC double flux installe le système ; ici, on juge l'échangeur lui-même. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "T",
  id: "recuperation",
  title: "Récupération d’énergie",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Repère les deux flux qui se croisent dans le récupérateur.",
  bac: "Calcule une efficacité à partir de trois températures relevées au bon endroit.",
  bts: "Compare performance, pertes de charge, risque de givre et stratégie de dérivation.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Quatre températures, aux quatre coins de l’échangeur. L’air extérieur entre froid et ressort réchauffé vers le local. L’air extrait entre tiède et ressort refroidi vers le dehors. Personne n’a chauffé quoi que ce soit : la chaleur perdue d’un côté a servi de l’autre. Regarde les deux trajets se croiser dans le bloc — et vérifie qu’ils ne se rejoignent jamais. C’est exactement ce que doit garantir un récupérateur.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Un récupérateur ne produit pas de chaleur : il en déplace. L’air qu’on rejette sort du bâtiment à la température du bâtiment. Le jeter tel quel, c’est jeter tout le chauffage qu’il transporte. On le fait donc longer des parois minces, de l’autre côté desquelles circule l’air neuf. La chaleur traverse la paroi ; l’air, lui, ne la traverse pas.\n\nPour juger l’appareil, on utilise l’efficacité de température. Elle compare ce que l’air neuf a réellement gagné à ce qu’il aurait pu gagner au mieux. Ce qu’il a gagné, c’est l’écart entre l’air soufflé et l’air extérieur. Le maximum possible, c’est l’écart entre l’air extrait et l’air extérieur — au mieux, l’air neuf ressortirait à la température de l’air extrait, jamais au-delà. Le rapport des deux donne l’efficacité.\n\nTrois relevés suffisent donc, mais ils doivent être pris au bon endroit : l’air extérieur avant l’échangeur, l’air soufflé juste après lui, l’air extrait à son entrée. Une sonde placée après une batterie de chauffage mesure le chauffage, pas la récupération, et donne une efficacité flatteuse et fausse. Et si le calcul dépasse cent pour cent, ce n’est jamais l’appareil qui est exceptionnel : c’est un relevé qui est faux, ou une sonde mal placée.\n\nCe que l’efficacité ne dit pas, c’est le coût. Un récupérateur ajoute de la résistance au passage de l’air, des deux côtés — donc du travail pour les ventilateurs, donc de l’électricité. Une installation peut très bien récupérer beaucoup de chaleur et la payer en consommation. Le bilan se juge sur l’ensemble.\n\nDeux points enfin, qui se voient sur le terrain. En hiver rigoureux, l’air extrait, humide et refroidi dans l’échangeur, peut y déposer de la glace : le débit chute et l’appareil s’abîme. Les constructeurs prévoient une protection, qu’il faut vérifier plutôt que supposer. Et en été, quand l’air extérieur nocturne est plus frais que l’air intérieur, récupérer serait un contresens — on réchaufferait l’air neuf. Un contournement permet alors de sauter l’échangeur.",

  method: "Relève les trois températures aux bons points. Une efficacité au-dessus de cent pour cent ne signale pas un bon appareil, mais un relevé faux.",
  formula: "Efficacité = (T soufflé − T extérieur) ÷ (T extrait − T extérieur)",

  /* Manipuler — une action précise. */
  consigne: "Règle les trois températures et lis l’efficacité obtenue. Cherche volontairement à dépasser cent pour cent, puis explique quel relevé est devenu impossible. Compare ensuite deux hivers, l’un à cinq degrés et l’autre à moins cinq, avec la même efficacité : la chaleur récupérée n’est pas la même, alors que le chiffre affiché est identique.",
  lecture: "L’efficacité est un rapport, pas une quantité d’énergie. Un appareil à soixante-dix pour cent récupère beaucoup plus par grand froid qu’à la mi-saison, à efficacité rigoureusement égale. C’est pour cela qu’on ne compare jamais deux installations sur ce seul chiffre sans dire à quelles températures il a été obtenu.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Le calcul proposé ne porte que sur la température, sur de l’air sec, et ignore trois choses : l’humidité que certains échangeurs transfèrent également, l’électricité consommée par les deux ventilateurs, et l’encrassement qui dégrade la performance avec le temps. Le rendement annoncé par un constructeur est mesuré en conditions d’essai ; l’installation posée ne les retrouve pas.",

  activity: {"kind":"recovery","outdoor":2,"extract":22,"supply":17},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "Regardez les quatre températures, aux quatre coins de l’échangeur. L’air extérieur entre froid, et ressort réchauffé vers le local. L’air extrait entre tiède, et ressort refroidi vers le dehors. Pourtant, personne n’a chauffé quoi que ce soit. La chaleur perdue d’un côté a simplement servi de l’autre. Suivez les deux trajets qui se croisent à l’intérieur du bloc, et vérifiez une chose : ils ne se rejoignent jamais. C’est exactement ce qu’un récupérateur doit garantir.",

    comprendre: "Un récupérateur ne produit pas de chaleur, il en déplace. L’air qu’on rejette sort du bâtiment à la température du bâtiment : le jeter tel quel, c’est jeter le chauffage qu’il transporte. On le fait donc longer des parois très minces, de l’autre côté desquelles circule l’air neuf. La chaleur traverse la paroi ; l’air, lui, ne la traverse pas. Pour juger l’appareil, on compare ce que l’air neuf a réellement gagné à ce qu’il aurait pu gagner au mieux. Ce qu’il a gagné, c’est l’écart entre l’air soufflé et l’air extérieur. Le maximum possible, c’est l’écart entre l’air extrait et l’air extérieur : au mieux, l’air neuf ressortirait à la température de l’air extrait, jamais au-delà. Trois relevés suffisent, mais au bon endroit. Une sonde placée après une batterie de chauffage mesure le chauffage, pas la récupération. Et si le calcul dépasse cent pour cent, ce n’est jamais un appareil exceptionnel : c’est un relevé faux.",

    manipuler: "Réglez les trois températures et lisez l’efficacité obtenue. Essayez maintenant de dépasser cent pour cent, volontairement, puis demandez-vous quel relevé est devenu impossible. Comparez ensuite deux hivers : l’un à cinq degrés dehors, l’autre à moins cinq, avec la même efficacité affichée. La chaleur réellement récupérée n’est pas la même, alors que le chiffre, lui, est identique. Une efficacité est un rapport, jamais une quantité d’énergie.",

    verifier: "Deux questions, sans note. Trois choses à garder. La première : un récupérateur déplace de la chaleur, il n’en fabrique pas. La deuxième : l’efficacité ne se lit que si les trois températures ont été relevées aux bons points. La troisième, celle qu’on oublie : un récupérateur ajoute de la résistance au passage de l’air, donc du travail pour les ventilateurs. Une installation peut récupérer beaucoup de chaleur et la payer en électricité."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Poser un récupérateur ajoute au réseau…","une perte de charge à vaincre",["un débit disponible en plus","une perte de charge à vaincre","une source d’humidité permanente"]],
    ["L’efficacité d’un récupérateur se calcule à partir…","des températures relevées sur les bons flux",["de la seule température de rejet","des débits des deux ventilateurs","des températures relevées sur les bons flux"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Contrôler sur site l’efficacité annoncée d’un récupérateur, et juger si elle vaut ce qu’elle coûte.",
    acquis: {
      cap: ["Repère les quatre piquages d’un récupérateur", "Constate que l’air neuf ressort plus chaud qu’il n’est entré", "Vérifie que les deux flux ne se mélangent pas"],
      bac: ["Calcule une efficacité de température à partir de trois relevés", "Place correctement les trois points de mesure", "Explique pourquoi un résultat supérieur à cent pour cent est faux"],
      bts: ["Discute le gain thermique au regard de la consommation des ventilateurs", "Vérifie l’existence d’une protection contre le givre", "Justifie l’intérêt d’un contournement d’été"]
    },
    sources: [
      "6.5.1 Technologie (CTA) — architecture d’une centrale (Bac MFER)",
      "WA10 — CTA modulaire, architecture et potentiel pédagogique (machines ERM)"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "VMC double flux", pourquoi: "c’est le système dans lequel cet échangeur est installé"},
      {reseau: "AéroRézo", station: "Mesurer les pressions", pourquoi: "la perte de charge ajoutée par l’échangeur s’y relève"}
    ]
  }
});
