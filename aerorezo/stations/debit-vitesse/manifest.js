/* A3 — Débit, vitesse, section
   Ligne A · Air & hygrométrie
   Socle commun · appui CP8, CP9 et CP10

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   STATION PILOTE — elle sert de modèle aux vingt-neuf autres.
   Ce qu'elle contient et pourquoi : voir CONTRAT-CONTENU.md à la racine. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "A",
  id: "debit-vitesse",
  title: "Débit, vitesse, section",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Suivez l’air dans la gaine et lisez le débit affiché.",
  bac: "Calculez un débit à partir d’une vitesse et d’une section.",
  bts: "Dimensionnez une section pour un débit imposé, puis vérifiez la vitesse obtenue.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Voici la gaine coupée. L’air ne traverse pas la section à la même vitesse partout : il file au centre, et il traîne contre la paroi. Le trait rouge dessine ce profil. Retenez ce que vous voyez — une mesure prise au centre seul ne dit pas ce qui traverse vraiment la gaine. C’est de là que viennent la plupart des débits faux relevés sur un chantier.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Le débit, c’est le volume d’air qui passe à chaque seconde. Il ne dépend que de deux choses : la surface offerte à l’air, et la vitesse à laquelle il la traverse.\n\nD’abord la surface. Une gaine ronde de diamètre D offre une aire A = πD²/4. Attention à l’unité : le diamètre se lit en millimètres sur le plan, mais l’aire se calcule en mètres carrés. Un diamètre de 250 mm devient donc 0,250 m, et l’aire vaut 0,049 m².\n\nEnsuite la vitesse. Celle qu’on utilise est la vitesse moyenne sur toute la section — pas celle relevée au centre, qui est toujours la plus forte.\n\nLe débit vient alors seul. À 4 m/s dans cette gaine : Qv = 4 × 0,049 = 0,196 m³/s. Multipliez par 3 600 et vous obtenez 707 m³/h, l’unité qu’on lit sur les plans.\n\nLe contrôle de cohérence vient en dernier, et il est aussi important que le calcul. Dans un réseau de confort, la vitesse reste en général entre 3 et 6 m/s. Une vitesse de 15 m/s annonce du bruit dans les bouches ; une vitesse de 1 m/s annonce une gaine trop grosse, donc de la place et de l’argent perdus.",

  method: "Convertissez les unités, calculez la section utile, appliquez la relation — puis vérifiez que la vitesse obtenue est plausible.",
  formula: "Qᵥ = v × A  ·  A = πD²/4  ·  m³/s × 3600 = m³/h",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Une gaine ronde de 250 mm doit transporter 700 m³/h. Réglez la vitesse jusqu’à obtenir ce débit, et notez la valeur trouvée. Ensuite, sans toucher à la vitesse, ramenez le diamètre à 200 mm : regardez de combien le débit tombe. Enfin, retrouvez les 700 m³/h avec ce nouveau diamètre — et regardez ce que devient la vitesse.",
  lecture: "Le débit calculé s’affiche sous les curseurs. Comparez-le au débit demandé par le plan. Comparez ensuite la vitesse obtenue à la plage courante de 3 à 6 m/s : c’est elle qui dit si la gaine convient, pas le débit seul. Une gaine plus petite transporte le même débit, mais toujours plus vite — et le bruit suit.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Ce calcul suppose un écoulement établi et une section pleine. Une gaine écrasée, un flexible plié, un coude ou un registre juste en amont changent le résultat. Sur une installation réelle, la vitesse se mesure — elle ne se déduit pas.",

  activity: {"kind":"flowcalc","diameter":250,"velocity":4},

  /* Ce que la voix dit — un texte à part, écrit pour l'oreille, jamais l'assemblage
     de ce qui est affiché. Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md.

     Trois choses qu'on ne fait pas ici, et qui ont motivé la règle :
     — aucune formule prononcée en symboles (« Q indice v égale v croix A » est du bruit
       à l'oreille) ; on dit ce que la formule fait, elle reste à l'écran pour l'œil ;
     — aucune file d'impératifs : on raconte, on explique le pourquoi, puis on propose ;
     — rien de ce qui est déjà lisible n'est répété.

     Durées mesurées à 0,95× : 37 s · 67 s · 38 s · 33 s. L'écran d'explication est le
     seul qui a le droit d'être long. */
  narration: {
    decouvrir: "Voici une gaine, coupée net pour qu’on voie ce qui se passe dedans. L’air qui la traverse ne va pas à la même vitesse partout. Au milieu, il file. Contre la paroi, il freine, retenu par le métal. C’est ce que dessine la courbe rouge. Cette image explique une erreur qu’on voit tout le temps sur un chantier : on plante l’anémomètre au centre, on lit une belle vitesse, et on croit tenir le débit. En réalité, on vient de mesurer l’endroit où l’air va le plus vite.",

    comprendre: "Le débit, c’est le volume d’air qui passe chaque seconde. Deux choses le commandent, pas une de plus : la taille du passage, et la vitesse de l’air dedans. La taille du passage, c’est la surface du rond. On la calcule à partir du diamètre. Et là, un piège : sur un plan, le diamètre est écrit en millimètres, alors que la surface doit être en mètres carrés. Deux cent cinquante millimètres, ça fait zéro virgule vingt-cinq mètre. Oublier cette conversion, c’est se tromper d’un facteur un million. La vitesse, ensuite. C’est la vitesse moyenne de toute la section, pas celle du centre. On multiplie la surface par la vitesse, et on tient le débit. Reste le contrôle de bon sens, aussi important que le calcul. Dans un réseau de confort, l’air circule entre trois et six mètres par seconde. Beaucoup plus, ça sifflera dans les bouches. Beaucoup moins, la gaine est trop grosse, et on a payé pour rien.",

    manipuler: "À vous de manœuvrer. Une gaine ronde de deux cent cinquante doit transporter sept cents mètres cubes par heure. Cherchez la vitesse qui donne ce débit, et retenez-la. Gardez ensuite cette vitesse, et réduisez le diamètre à deux cents. Le débit va tomber — et bien plus fort que vous ne l’attendez, parce que la surface suit le carré du diamètre. Pour finir, retrouvez vos sept cents mètres cubes avec la petite gaine, et regardez ce que devient la vitesse. C’est exactement là que naît le bruit dans une installation.",

    verifier: "Deux questions, maintenant, pour voir si le raisonnement tient. Elles ne comptent dans aucune note : elles servent à repérer ce qui n’est pas encore clair, pendant qu’il est encore temps. En cas d’erreur, la bonne réponse s’affiche avec son explication — prenez le temps de la lire, c’est là que se joue l’essentiel. Et si les deux passent sans hésitation, vous savez maintenant d’où vient un débit, et pourquoi on ne le mesure pas au centre d’une gaine."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Quelle relation relie débit, vitesse et section ?","Qᵥ = v × A",["Qᵥ = v ÷ A","Qᵥ = v × A","Qᵥ = A ÷ v"]],
    ["À débit constant, si la section diminue, la vitesse…","augmente dans la même proportion",["diminue dans la même proportion","reste la même, seul le débit compte","augmente dans la même proportion"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Vérifier qu’une gaine posée transporte bien le débit prévu au plan.",
    acquis: {
      cap: ["Repère le diamètre d’une gaine sur un plan", "Lit un débit affiché en m³/h", "Suit le sens de l’air dans un conduit"],
      bac: ["Convertit un diamètre en mètres avant de calculer une aire", "Calcule un débit à partir d’une vitesse moyenne et d’une section", "Situe la vitesse obtenue dans la plage courante de 3 à 6 m/s"],
      bts: ["Dimensionne une section pour un débit imposé", "Justifie un choix de vitesse par le bruit et l’encombrement", "Distingue vitesse moyenne et vitesse au centre de la section"]
    },
    sources: ["inerWeb Aéraulique v5 — dimensionnement de gaines circulaires et rectangulaires"],
    correspondances: [
      {reseau: "HydroMétro", station: "Débit", pourquoi: "la même relation, avec un autre fluide : un débit d’eau se calcule de la même façon"}
    ]
  }
});
