/* C1 — Apport sensible
   Ligne C · Climatisation & apports
   CP8 · Calculs d’apports thermiques · CP9 · Étude d’une installation de climatisation

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 sur le moule de la station pilote — voir CONTRAT-CONTENU.md.
   Première gare de la ligne C : elle pose la relation dont vivent les quatre suivantes. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "C",
  id: "apport-sensible",
  title: "Apport sensible",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Associe une hausse de température à un apport sensible.",
  bac: "Calcule la puissance nécessaire pour changer la température d’un débit d’air.",
  bts: "Mène un bilan sensible avec débits massiques et conditions de calcul explicites.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "L’air entre dans la batterie par la gauche et en ressort par la droite. Regarde les deux étiquettes de température, à l’entrée et à la sortie. C’est le même air, le même débit, et exactement la même quantité de vapeur d’eau : une seule chose a changé au passage, sa température. Cette chaleur-là porte un nom — elle est dite sensible, parce qu’un thermomètre la sent. Toute la station tient dans une question : combien de watts faut-il pour obtenir ce changement, ou pour l’empêcher ?",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Changer la température d’un air coûte d’autant plus cher qu’il y a plus d’air à traiter et que l’écart demandé est grand. Trois grandeurs commandent le calcul : le débit qui traverse, l’écart de température entre l’entrée et la sortie, et l’énergie qu’il faut pour réchauffer un kilogramme d’air d’un degré.\n\nCette dernière ne bouge presque pas : environ 1 005 joules par kilogramme et par degré. Il reste à passer du volume à la masse, avec la masse volumique de l’air — environ 1,2 kg/m³ dans les conditions d’un local. Elle diminue quand l’air se réchauffe et quand on monte en altitude : à ce niveau de calcul on la prend constante, et on l’écrit dans les hypothèses.\n\nLe vrai piège est ailleurs. Le débit est écrit en m³/h sur les plans, alors que la relation le demande en m³/s. Il faut donc diviser par 3 600 avant de multiplier. Oublier cette division, c’est annoncer une puissance 3 600 fois trop grande.\n\nEn regroupant la masse volumique, la chaleur massique et cette division, on obtient le raccourci que tout le monde emploie sur le terrain : environ 0,34 W par m³/h et par degré d’écart. Un débit de 800 m³/h avec 8 K d’écart demande donc à peu près 2 150 W, soit un peu plus de 2 kW. Ce raccourci est commode, mais il ne dispense pas de savoir d’où il vient.\n\nLe contrôle de cohérence vient en dernier. En confort, l’écart entre l’air soufflé et l’air du local reste en général de 8 à 10 K : au-delà, le courant d’air froid se sent au poste de travail ; en deçà, il faut souffler beaucoup plus d’air pour la même puissance.",

  method: "Convertis le débit en mètres cubes par seconde, applique la relation, puis vérifie que l’écart de soufflage reste tenable en confort.",
  formula: "P = ρ × cₚ × Qᵥ × ΔT  ·  ρ ≈ 1,2 kg/m³, cₚ ≈ 1005 J/(kg·K), Qᵥ en m³/s  ·  raccourci : P(W) ≈ 0,34 × Qᵥ(m³/h) × ΔT",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Règle le débit sur 800 m³/h et l’écart sur 8 K, puis note la puissance affichée. Double ensuite le débit sans toucher à l’écart, et regarde de combien elle monte. Reviens à 800 m³/h et double cette fois l’écart : compare les deux résultats. Termine en cherchant le débit qu’il faudrait pour retrouver cette même puissance avec un écart de seulement 4 K.",
  lecture: "La puissance s’affiche en kilowatts sous les curseurs. C’est un besoin du local, pas une machine de catalogue. Regarde surtout le couple qui la produit : la même puissance s’obtient avec beaucoup d’air peu refroidi, ou avec peu d’air très refroidi. Le premier choix coûte des gaines et de la place, le second fait des courants d’air froid sur les gens. Le calcul ne tranche pas — c’est le projet qui tranche.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Ce calcul ne compte que la température. L’eau que l’air perd ou gagne au passage n’y figure pas : c’est la charge latente, et elle se calcule à part. La masse volumique est prise constante alors qu’elle dépend de la température et de l’altitude. Enfin, la puissance obtenue est celle qu’il faut à l’air : la machine devra fournir davantage, à cause des pertes des gaines et de la chaleur dégagée par le ventilateur.",

  activity: {"kind":"heat","flow":800,"delta":8},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "Voici une batterie, posée dans une gaine. L’air arrive par la gauche, il la traverse, et il ressort de l’autre côté à une température différente. Regardez les deux étiquettes, à l’entrée et à la sortie. Entre les deux, rien n’a changé sauf cela : même débit, même quantité de vapeur d’eau, seule la température a bougé. Cette chaleur-là, on l’appelle sensible, tout simplement parce qu’un thermomètre la sent. Et derrière ce mot se cache la question que se pose tout technicien devant un local à climatiser : combien de puissance faut-il pour obtenir ce changement, ou au contraire pour l’empêcher ?",

    comprendre: "Trois choses seulement commandent cette puissance. La quantité d’air qu’on traite, l’écart de température qu’on lui demande, et l’énergie nécessaire pour réchauffer un kilogramme d’air d’un degré. Cette dernière ne bouge presque pas : un peu plus de mille joules. Il faut ensuite passer du volume à la masse, parce qu’un débit se mesure en volume alors que la chaleur se calcule sur une masse. Un mètre cube d’air pèse environ un kilogramme deux cents grammes. Et là arrive le piège qui fait le plus de dégâts, sur une copie comme sur un chantier : sur un plan, un débit est écrit par heure, alors que la puissance se calcule par seconde. Il faut diviser par trois mille six cents. Oublier cette division, c’est annoncer une puissance trois mille six cents fois trop grande. En regroupant tout cela, les professionnels retiennent un raccourci : environ un tiers de watt par mètre cube et par heure, pour chaque degré d’écart.",

    manipuler: "À vous de manœuvrer. Le premier curseur donne le débit d’air, le second l’écart de température. Partez de huit cents mètres cubes par heure avec huit degrés d’écart, et gardez le chiffre en tête. Doublez ensuite le débit, sans rien changer d’autre. Puis revenez au débit de départ et doublez l’écart à la place. Vous allez retrouver le même résultat les deux fois, et c’est normal : la puissance suit l’un comme l’autre. Ce qui n’est pas pareil, en revanche, c’est le prix. Beaucoup d’air, ce sont de grosses gaines et de la place perdue. Un écart important, c’est un courant d’air froid sur les gens.",

    verifier: "Deux questions arrivent, sans note. En cas d’erreur, la bonne réponse s’affiche avec son explication : c’est là que se joue l’essentiel. Retenez surtout deux choses de cette escale. La première : cette puissance ne concerne que la température, elle ne dit rien de l’eau contenue dans l’air, et c’est l’objet de la station Apport latent. La seconde : le résultat obtenu est ce qu’il faut à l’air, pas ce qu’il faut demander à la machine. Entre les deux, il reste les pertes des gaines et la chaleur du ventilateur."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Un apport sensible fait varier…","la température de l’air",["la température de l’air","la teneur en eau de l’air","la pression du réseau"]],
    ["Dans P = ρ·c·Qᵥ·ΔT, le débit doit être exprimé en…","mètres cubes par seconde",["mètres cubes par heure","mètres cubes par seconde","litres par seconde"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Chiffrer la puissance nécessaire pour amener un débit d’air à la température voulue dans un local.",
    acquis: {
      cap: ["Associe une hausse de température à un apport de chaleur", "Lit un débit d’air et un écart de température sur un relevé", "Repère l’entrée et la sortie d’air d’une batterie"],
      bac: ["Convertit un débit de m³/h en m³/s avant de calculer", "Calcule une puissance sensible à partir d’un débit et d’un écart", "Situe un écart de soufflage courant en confort"],
      bts: ["Écrit les hypothèses de masse volumique et de chaleur massique retenues", "Arbitre un couple débit-écart en pesant encombrement et confort", "Distingue la puissance utile à l’air et celle à demander à la machine"]
    },
    sources: ["inerWeb Aéraulique v5 — bilans thermiques et traitement d’air"],
    correspondances: [
      {reseau: "AéroRézo", station: "Débit, vitesse, section", pourquoi: "le débit d’air qui entre dans ce calcul de puissance se détermine là-bas"},
      {reseau: "AéroRézo", station: "Apport latent", pourquoi: "la part de la charge que cette relation ne voit pas"}
    ]
  }
});
