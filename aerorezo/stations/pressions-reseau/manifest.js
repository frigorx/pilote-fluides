/* M3 — Mesurer les pressions
   Ligne M · Mesure & diagnostic
   Validation expérimentale et diagnostic · CP4, CP7, CP9, CP10

   Gare traversée par les lignes D, T et M : elle est écrite pour les trois —
   l'encrassement du filtre en centrale, la perte de charge d'une antenne de
   distribution, et le geste de mesure lui-même.

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "M",
  id: "pressions-reseau",
  title: "Mesurer les pressions",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Choisis une prise statique correcte.",
  bac: "Mesure une différence de pression aux bornes d’un organe.",
  bts: "Établis un bilan de pression et compare au point ventilateur/réseau.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Le dessin est le même qu’à la station des trois pressions, et c’est voulu : les prises ne changent pas quand on passe de l’étude au chantier. Ce qui change, c’est ce qu’on en fait. Ici, on ne cherche plus à comprendre une pression, on cherche un écart : entre l’amont et l’aval d’un filtre, entre le départ et l’extrémité d’une branche. Suis les deux liaisons qui rejoignent le manomètre — c’est leur différence qui parle.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Sur un réseau, presque tout se lit en écart. Un manomètre différentiel a deux entrées : la haute et la basse. On branche la haute en amont de l’organe, la basse en aval. Ce qu’il affiche est la pression perdue en traversant cet organe.\n\nAvant la première mesure, on fait le zéro : les deux entrées à l’air libre, dans le local où l’on va travailler, et on remet l’appareil à zéro. Un zéro décalé de quelques pascals ne se voit sur aucun écran et fausse toutes les valeurs de la journée. On le refait après un changement de gamme ou un déplacement important.\n\nLe filtre est l’organe qu’on surveille le plus. Neuf, il oppose déjà une résistance ; en se chargeant de poussière, il en oppose de plus en plus, et l’écart à ses bornes monte. C’est ce nombre qui commande son remplacement, pas le calendrier. La valeur à ne pas dépasser est donnée par le fabricant du filtre et reprise dans le dossier de l’installation. Les classes de filtres ont d’ailleurs changé de nom : les anciennes lettres ont laissé la place à des classes qui disent quelle taille de poussière le filtre arrête. On lit la classe exigée dans le dossier du projet, on ne la récite pas de mémoire.\n\nSur un réseau de distribution, la même mesure sert à autre chose : suivre la pression le long d’une antenne pour trouver où elle se perd. On relève au départ, après les accidents marquants, puis au pied de la bouche la plus éloignée. Le chemin qui consomme le plus est celui qui commande la pression du ventilateur : c’est lui, et lui seul, qu’il faut satisfaire.",

  method: "Repère les flexibles, le signe, le zéro et les prises avant de lire l’écran.",
  formula: "Δp organe = p amont − p aval (Pa)",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Les curseurs donnent ici la pression relevée en un point du réseau. Pose 180 pascals de statique et 70 de dynamique : c’est un départ de gaine, juste après le ventilateur. Descends ensuite la statique à 60 pascals, comme si tu mesurais au pied de la bouche la plus éloignée, sans toucher à la dynamique. Les 120 pascals d’écart entre tes deux relevés sont ce que le trajet a consommé.",
  lecture: "La totale affichée n’a d’intérêt qu’une fois comparée à une autre : un relevé seul ne dit rien, deux relevés encadrant un organe disent ce qu’il coûte. Sur un filtre, note la valeur au montage — c’est ta référence, et l’écart mesuré plus tard se lit par rapport à elle. Vérifie toujours le signe avant de conclure : deux flexibles inversés donnent la bonne valeur avec le mauvais signe, et le raisonnement part à l’envers.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Aucun seuil n’est figé ici. La perte de charge finale d’un filtre est propre à son modèle, la pression disponible d’un ventilateur est propre à sa courbe, et les deux se lisent dans les documents de l’installation. Cette station montre le geste et le raisonnement, pas les valeurs d’un chantier. Enfin, une pression relevée pendant que le débit varie ne se compare à rien : on attend que l’installation soit stable.",

  activity: {"kind":"pressure","static":180,"dynamic":70},

  /* Ce que la voix dit — un texte à part, écrit pour l'oreille, jamais l'assemblage
     de ce qui est affiché. Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md. */
  narration: {
    decouvrir: "Vous reconnaissez le dessin : ce sont les mêmes prises qu’à la station des trois pressions. Rien n’a changé dans le matériel, et c’est justement le message. Ce qui change, c’est la question qu’on pose. Tout à l’heure, on voulait comprendre d’où venait une pression. Maintenant, on est sur une installation en service, et on ne cherche plus une valeur : on cherche une différence. Combien coûte ce filtre. Combien se perd entre le ventilateur et la dernière bouche. Sur un réseau, presque rien ne se lit tout seul ; tout se lit en écart.",

    comprendre: "Commençons par le geste qu’on oublie le plus souvent : le zéro de l’appareil. Les deux entrées à l’air libre, dans le local où l’on va travailler, et on remet le manomètre à zéro. Un décalage de trois ou quatre pascals ne se voit sur aucun écran, et il pollue toutes les mesures de la journée. Ensuite, le branchement : l’entrée haute du côté où la pression est la plus forte, donc en amont, et l’entrée basse en aval. Inversez les deux flexibles, et vous obtenez la bonne valeur avec le mauvais signe. Le filtre, maintenant. Neuf, il freine déjà un peu l’air. Chargé de poussière, il freine beaucoup plus, et l’écart à ses bornes grimpe. C’est ce nombre qui décide de son remplacement, pas la date inscrite sur un planning. La limite à ne pas franchir vient du fabricant : elle se lit dans le dossier de l’installation, elle ne se retient pas par cœur, parce qu’elle change avec chaque modèle.",

    manipuler: "Les deux curseurs représentent cette fois un point précis du réseau. Prenez d’abord les valeurs proposées : c’est le départ de la gaine, juste à la sortie du ventilateur, là où la pression est la plus haute. Faites ensuite descendre la statique jusqu’à une soixantaine de pascals, comme si vous étiez allé mesurer au pied de la bouche la plus lointaine. Ce que vous venez de perdre en route, ce sont les frottements et les accidents de tout le trajet. C’est cette différence, et pas la valeur affichée, qui dit si le réseau tient.",

    verifier: "Deux questions pour refermer, toujours sans note. Elles portent sur les deux gestes qui font rater une mesure de pression : le zéro qu’on n’a pas fait, et le sens dans lequel on lit un écart. Si l’une tombe à côté, la bonne réponse arrive avec son explication, et c’est le meilleur moment pour la lire. Le fil à garder est simple : sur un réseau, une valeur seule ne prouve rien ; c’est la comparaison de deux relevés qui devient une information."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Aux bornes d’un filtre, l’écart de pression augmente quand…","le média du filtre s’encrasse",["le média du filtre s’encrasse","le filtre vient d’être changé","le débit d’air diminue"]],
    ["Le zéro d’un manomètre se contrôle…","avant de commencer la mesure",["après avoir noté les valeurs","avant de commencer la mesure","une fois par an à l’atelier"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Suivre l’état d’un filtre et repérer où un réseau perd sa pression.",
    acquis: {
      cap: ["Branche un manomètre différentiel dans le bon sens", "Fait le zéro de l’appareil avant de mesurer", "Lit un écart de pression en pascals"],
      bac: ["Mesure l’écart aux bornes d’un filtre et le compare à sa valeur de référence", "Relève une pression au départ et en extrémité d’une antenne", "Justifie le remplacement d’un filtre par une mesure, pas par une date"],
      bts: ["Établit le bilan de pression du chemin le plus défavorisé", "Situe le point de fonctionnement obtenu sur la courbe du ventilateur", "Cherche dans le dossier du projet la classe de filtration exigée"]
    },
    sources: [
      "Fiches produit des filtres : perte de charge initiale et perte de charge finale, propres à chaque modèle",
      "Dossier de l’installation : classe de filtration exigée et pression disponible du ventilateur",
      "Aucun document interne inerWeb ne traite la mesure aéraulique au 27/08/2026 — les seuils viennent du chantier, jamais de la station"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "Mélange et filtration (T2)", pourquoi: "l’écart de pression aux bornes du filtre y prend son sens dans la centrale"},
      {reseau: "AéroRézo", station: "Ventilateur et équilibrage (D5)", pourquoi: "la pression disponible se joue sur le chemin le plus défavorisé, celui qu’on relève ici"},
      {reseau: "AéroRézo", station: "Trois pressions (A2)", pourquoi: "les prises, les signes et la distinction statique/dynamique viennent de là"}
    ]
  }
});
