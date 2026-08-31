/* V7 — VMC double flux
   Ligne V · VMC
   CP4 · Réaliser l’étude d’une installation de VMC
   Correspondance : ligne T · Centrale de traitement d’air

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 sur le moule de la station pilote — voir CONTRAT-CONTENU.md.
   Le rendement de l'échangeur est traité à la station Récupération d'énergie : ici,
   on installe le système et on nomme ses quatre flux. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "V",
  id: "double-flux",
  title: "VMC double flux",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Distinguez les quatre flux : air neuf, soufflé, extrait, rejeté.",
  bac: "Expliquez ce que l’échangeur récupère, et pourquoi les flux ne se mélangent pas.",
  bts: "Calculez un rendement de récupération à partir de températures mesurées et analysez ses limites.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Ici, deux ventilateurs tournent au lieu d’un. Le premier extrait l’air des pièces de service, comme en simple flux. Le second, lui, souffle de l’air neuf dans les pièces de vie — l’air n’entre plus par les fenêtres. Entre les deux, un bloc que l’air traverse : l’échangeur. L’air extrait y passe, tiède, et ressort refroidi vers l’extérieur. L’air neuf y passe, froid, et ressort réchauffé vers le logement. Les deux se croisent dans ce bloc sans jamais se toucher.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Le mot double flux dit l’essentiel : deux ventilateurs, donc deux réseaux de gaines. On ne subit plus l’entrée d’air, on la maîtrise. Cela change quatre choses.\n\nD’abord, il faut nommer les flux, et ils sont quatre — c’est le premier réflexe à prendre. L’air neuf est celui qu’on prend dehors. L’air soufflé est ce même air une fois traversé l’échangeur et envoyé dans les pièces de vie. L’air extrait est celui qu’on retire des pièces de service. L’air rejeté est cet air extrait, une fois qu’il a cédé sa chaleur, renvoyé dehors. Les confondre rend tout schéma illisible, et toute mesure fausse.\n\nEnsuite, l’échangeur. L’air extrait sort du logement à la température du logement : le rejeter directement, c’est jeter tout le chauffage qu’il transporte. Dans l’échangeur, cet air tiède longe des parois minces de l’autre côté desquelles circule l’air neuf, froid. La chaleur traverse la paroi ; l’air, lui, ne la traverse pas. C’est tout l’enjeu, et c’est la question à se poser devant n’importe quel récupérateur : par où passerait l’air s’il y avait un défaut d’étanchéité ?\n\nTroisième changement, la filtration. Puisque l’air neuf entre par un point unique, on peut le filtrer avant de l’envoyer dans les chambres. C’est un vrai avantage en ville ou près d’un axe routier. Mais un filtre s’encrasse, et un filtre encrassé fait chuter le débit soufflé sans prévenir.\n\nEnfin, ce que ça coûte. Deux réseaux de gaines à faire passer, un caisson plus gros à loger, deux ventilateurs qui consomment, et un entretien qui ne se néglige pas. En hiver très froid, l’humidité de l’air extrait peut givrer dans l’échangeur : les appareils prévoient une protection, qu’il faut vérifier. En été, un contournement — le by-pass — permet de sauter l’échangeur quand l’air extérieur est plus frais que l’air intérieur : sans lui, on réchaufferait l’air neuf de la nuit, exactement l’inverse de ce qu’on cherche.",

  method: "Tracez séparément les quatre flux, et nommez-les. Vérifiez ensuite qu’aucun endroit du schéma ne les fait se rejoindre.",
  formula: "Efficacité = (T soufflé − T extérieur) / (T extrait − T extérieur)",

  /* Manipuler — une action précise. */
  consigne: "Faites varier la température extérieure, celle de l’air extrait et celle de l’air soufflé, et regardez l’efficacité changer. Cherchez d’abord un cas où elle dépasse cent pour cent : vous verrez qu’il correspond toujours à un relevé impossible. Comparez ensuite deux hivers, l’un doux et l’autre rigoureux, avec la même efficacité : l’écart de température récupéré n’est pas le même.",
  lecture: "L’efficacité se calcule sur trois températures, et chacune doit être relevée au bon endroit : l’air neuf avant l’échangeur, l’air soufflé après, l’air extrait à l’entrée. Une sonde placée après une batterie de chauffage donnerait une efficacité flatteuse et fausse : ce n’est plus l’échangeur qu’on mesure, c’est le chauffage.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Le calcul proposé est une efficacité de température, sur l’air sec. Il ignore la part d’humidité que certains échangeurs transfèrent aussi, et il ne dit rien de l’énergie consommée par les deux ventilateurs — une installation peut très bien récupérer beaucoup de chaleur et la payer en électricité. Le rendement réel se juge sur l’ensemble, pas sur le seul échangeur.",

  activity: {"kind":"recovery","outdoor":5,"extract":21,"supply":17},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "Regardez, au centre du dessin : ce bloc posé de biais, rayé de fines lignes obliques. Quatre gaines s’y branchent, deux du côté de la rue, deux du côté du logement, et chacune porte sa température. C’est là que tout se joue. L’air arrive à deux degrés et repart soufflé à seize, alors qu’aucun radiateur n’a chauffé quoi que ce soit : ces degrés-là ont été pris à l’air qui sortait, et qui repart dehors à sept. Sur un chantier, quatre piquages sur un caisson se confondent vite — deux tuyaux inversés, et l’installation rejette dehors l’air qu’elle venait de réchauffer.",

    comprendre: "Commençons par nommer les flux, parce qu’ils sont quatre et qu’on les confond tout le temps. L’air neuf, c’est celui qu’on prend dehors. L’air soufflé, c’est ce même air une fois passé dans l’échangeur et envoyé dans les chambres. L’air extrait, c’est celui qu’on retire de la cuisine et de la salle d’eau. Et l’air rejeté, c’est cet air extrait, une fois qu’il a cédé sa chaleur, renvoyé dehors. Venons-en à l’échangeur. L’air extrait sort du logement à la température du logement : le rejeter tel quel, c’est jeter le chauffage qu’il transporte. Alors on le fait longer des parois très minces, de l’autre côté desquelles circule l’air neuf, froid. La chaleur traverse la paroi. L’air, lui, ne la traverse pas. Et c’est la question à se poser devant n’importe quel récupérateur : par où passerait l’air s’il y avait un défaut d’étanchéité ?",

    manipuler: "Faites varier les trois températures et regardez l’efficacité changer. Cherchez d’abord un cas où elle dépasse cent pour cent : vous constaterez qu’il correspond toujours à un relevé impossible, jamais à un appareil miraculeux. Comparez ensuite deux hivers, un doux et un rigoureux, avec la même efficacité : la quantité de chaleur récupérée n’est pas la même. Et souvenez-vous d’où viennent ces trois températures : l’air neuf avant l’échangeur, l’air soufflé après, l’air extrait à l’entrée. Une sonde placée après une batterie de chauffage donnerait un résultat flatteur et faux.",

    verifier: "Deux questions, sans note. Deux choses à retenir avant de répondre. La première : les quatre flux se nomment, toujours, et ne se mélangent jamais — l’échangeur transmet de la chaleur, pas de l’air. La seconde : la double flux coûte deux réseaux de gaines, deux ventilateurs et un entretien réel. Elle se justifie par ce qu’elle récupère, pas par principe."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Dans un échangeur double flux, les deux flux…","échangent de la chaleur sans se mélanger",["se mélangent pour égaliser les températures","échangent de la chaleur sans se mélanger","circulent toujours dans le même sens"]],
    ["Combien de flux d’air repère-t-on sur une double flux ?","quatre : neuf, soufflé, extrait et rejeté",["deux : l’air soufflé et l’air extrait","trois : neuf, soufflé et rejeté","quatre : neuf, soufflé, extrait et rejeté"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Repérer et nommer les quatre flux sur une installation double flux, et contrôler l’efficacité annoncée.",
    acquis: {
      cap: ["Repère les deux ventilateurs d’une installation double flux", "Nomme les quatre flux sur un schéma", "Distingue une gaine de soufflage d’une gaine d’extraction"],
      bac: ["Explique ce que l’échangeur transmet, et ce qu’il ne transmet pas", "Justifie la présence d’un filtre sur l’air neuf", "Explique à quoi sert le contournement d’été"],
      bts: ["Calcule une efficacité de température à partir de trois relevés", "Situe correctement les points de mesure", "Discute le rendement global, ventilateurs compris"]
    },
    sources: [
      "VC_100198 — VMC, la maison respire (Bac MFER, collègues partagés)",
      "6.5.1 Technologie (CTA) — architecture d’une centrale (Bac MFER)"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "Récupération d’énergie", pourquoi: "le rendement de l’échangeur y est traité pour lui-même"},
      {reseau: "AéroRézo", station: "Lire une CTA", pourquoi: "la double flux est une centrale de traitement d’air, en petit"}
    ]
  }
});
