/* C3 — Parois et écarts de température
   Ligne C · Climatisation & apports
   CP8 · Calculs d’apports thermiques · CP9 · Étude d’une installation de climatisation

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 sur le moule de la station pilote — voir CONTRAT-CONTENU.md.

   ✅ Réserve de fusion levée le 04/10/2026 : l'activité `heat` en mode `wall` ne dessine plus
   une batterie. Le schéma est une paroi en coupe avec sa fenêtre (scenes.js, fonction `paroi`),
   la chaîne des repères de Découvrir est propre à la paroi (app.js), et le texte et la
   narration de Découvrir décrivent ce dessin. Le simulateur chiffre une paroi : P = U × A × ΔT
   (réécrit le 02/10/2026). Historique : RAPPORT-LIGNE-C.md. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "C",
  id: "transmission",
  title: "Parois et écarts de température",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Repérez mur, vitrage, toiture et plancher.",
  bac: "Calculez un apport par transmission avec U, surface et écart de température.",
  bts: "Établissez les hypothèses et séparez les zones et régimes pertinents.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "La scène montre un mur en coupe et sa fenêtre. À gauche, le dedans, chaud ; à droite, le dehors, plus froid. La chaleur traverse la paroi sans qu’on la voie : de fines flèches à travers le mur isolé, de grosses flèches à travers la fenêtre, qui laisse passer bien plus. Ici elle sort ; l’été, c’est l’inverse. Tant qu’il fait plus chaud dehors que dedans, la chaleur entre par toutes les parois du local, le jour comme la nuit. Elle ne demande la permission à personne : elle suit l’écart de température. Reste à savoir combien elle apporte, et par où.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Trois choses décident de ce qui traverse une paroi : sa surface, l’écart de température entre ses deux faces, et sa qualité. Cette qualité s’écrit avec un coefficient noté U — le nombre de watts qui traversent un mètre carré de cette paroi pour un degré d’écart. Plus il est petit, mieux la paroi isole.\n\nLe calcul se fait alors paroi par paroi, jamais en bloc. Chaque mur, chaque vitrage, chaque toiture a sa surface et son coefficient : on calcule sa part, puis on additionne. Prendre une valeur moyenne pour tout le bâtiment paraît plus rapide, mais cela efface précisément ce qui compte — un vitrage laisse passer plusieurs fois plus qu’un mur isolé de même surface, et c’est souvent lui qui décide de la puissance.\n\nEn climatisation, l’écart à retenir n’est pas toujours la simple différence entre l’air extérieur et l’air du local. Une paroi exposée au soleil monte bien au-delà de la température de l’air : on lui applique un écart corrigé, donné par les documents de calcul du projet. Une paroi lourde restitue de plus sa chaleur avec plusieurs heures de retard, et le maximum du bâtiment ne tombe pas à midi.\n\nToutes les parois ne donnent pas sur l’extérieur. Un mur qui sépare deux locaux climatisés à la même température ne transmet rien. Le même mur donnant sur un couloir non traité, un garage ou des combles transmet, et il faut alors connaître la température de l’autre côté.\n\nLe contrôle de cohérence porte sur les surfaces : additionnez celles que vous avez prises en compte et comparez-les au plan. Une paroi oubliée, une surface comptée deux fois, une hauteur sous plafond fausse — ce sont les erreurs les plus fréquentes, bien avant l’erreur de coefficient.",

  method: "Calculez chaque paroi avec ses données, puis additionnez les contributions.",
  formula: "P = U × A × ΔT  ·  U en W/(m²·K), A en m², ΔT en K  ·  P du local = somme de toutes les parois",

  /* Manipuler — une action précise, avec des valeurs concrètes.
     Le simulateur calcule une paroi : P = U × A × ΔT (réécrit le 02/10/2026 ; il chiffrait un débit d'air). */
  consigne: "Commencez par un mur isolé : réglez U sur 0,3, la surface sur 10 m² et l’écart sur 12 K, puis notez la puissance qui traverse (36 W). Doublez l’écart à 24 K : la puissance double. Revenez à 12 K et doublez cette fois la surface, à 20 m² : elle double encore. Revenez à 10 m² et passez U à 2,8, la valeur d’un double vitrage : à surface et écart égaux, la puissance est plus de neuf fois plus grande.",
  lecture: "Le nombre affiché est la part d’une seule paroi. Pour un local, on refait le calcul pour chaque mur, chaque vitrage, chaque toiture, puis on additionne. Retenez les deux proportions — deux fois plus d’écart ou deux fois plus de surface, deux fois plus de chaleur — et surtout le poids du coefficient U : quelques mètres carrés de vitrage pèsent souvent plus lourd que tout un mur isolé. Comparez ensuite votre total aux apports solaires et internes : sur un bâtiment récent bien isolé, la transmission n’est plus la part dominante du bilan d’été.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Les coefficients U proposés ici sont des ordres de grandeur : les vrais dépendent de la composition de la paroi et des textes applicables au projet, et ils se lisent dans les documents. L’écart est pris entre l’air de dehors et l’air de dedans, alors qu’une paroi au soleil demande un écart corrigé. Le régime est supposé stable, alors qu’un bâtiment réel stocke la chaleur et la restitue avec du retard. Enfin, ni les ponts thermiques ni les entrées d’air parasites ne sont comptés ici.",

  activity: {"kind":"heat","mode":"wall","u":0.3,"area":10,"delta":12},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "Regardez ce mur vu en coupe, avec sa fenêtre. D’un côté, le dedans, chaud. De l’autre, le dehors, plus froid. La chaleur traverse la paroi, et on ne la voit pas : ici, ce sont des flèches. Fines à travers le mur isolé, bien plus grosses à travers la fenêtre. Sur ce dessin, la chaleur sort. En été, c’est l’inverse : tant qu’il fait plus chaud dehors que dedans, elle entre par toutes les parois du local, le jour comme la nuit. Elle ne demande la permission à personne : elle suit l’écart de température. Toute la question est de savoir combien elle apporte, et par où elle passe.",

    comprendre: "Trois choses décident de ce qui traverse une paroi. Sa surface, l’écart de température entre ses deux faces, et sa qualité. Cette qualité s’écrit avec un coefficient, qui dit combien de watts traversent un mètre carré de paroi pour un degré d’écart. Plus il est petit, mieux la paroi isole. Le calcul se mène ensuite paroi par paroi, jamais en bloc. Chaque mur, chaque fenêtre, chaque toiture a sa surface et son coefficient : on calcule sa part, et on additionne. Prendre une valeur moyenne pour tout le bâtiment semble plus rapide, mais cela efface justement ce qui compte. Un vitrage laisse passer plusieurs fois plus qu’un mur isolé de la même taille, et c’est très souvent lui qui décide de la puissance à installer. Dernier point, propre à la climatisation : une paroi au soleil devient bien plus chaude que l’air extérieur. On lui applique alors un écart corrigé, donné par les documents de calcul du projet.",

    manipuler: "Trois curseurs, trois grandeurs : le coefficient U de la paroi, sa surface, et l’écart de température entre ses deux faces. Partez d’un mur isolé, avec U à zéro virgule trois, dix mètres carrés et douze kelvins d’écart. Doublez l’écart : la chaleur qui passe double. Revenez, et doublez la surface : elle double encore. Remettez dix mètres carrés, puis passez U à deux virgule huit, comme un double vitrage. Même surface, même écart, et pourtant plus de neuf fois plus de chaleur. C’est souvent le vitrage qui décide.",

    verifier: "Deux questions, sans note. Ce qu’il faut emporter tient en deux idées. La première : on calcule paroi par paroi, avec les données propres à chacune, puis on additionne. Une valeur moyenne pour tout un bâtiment ne dit rien d’utile. La seconde est moins attendue. L’erreur la plus fréquente ne porte pas sur le coefficient d’isolation, mais sur les surfaces : une paroi oubliée, un mur compté deux fois, une hauteur sous plafond fausse. Avant de discuter d’un coefficient, on vérifie les mètres carrés sur le plan."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Dans P = U × A × ΔT, la lettre A désigne…","la surface de la paroi",["le débit d’air neuf","la surface de la paroi","l’écart de température"]],
    ["Les apports par les parois se calculent…","paroi par paroi, puis on additionne",["avec une valeur moyenne pour tout le bâtiment","sans tenir compte de l’écart de température","paroi par paroi, puis on additionne"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Chiffrer ce qui entre dans un local par son enveloppe, paroi par paroi, avec les données du projet.",
    acquis: {
      cap: ["Repère mur, vitrage, toiture et plancher sur un plan", "Constate qu’un vitrage laisse passer plus qu’un mur isolé", "Relie un écart de température à un apport par les parois"],
      bac: ["Calcule l’apport d’une paroi à partir de son coefficient, de sa surface et de l’écart", "Additionne les parois au lieu d’appliquer une moyenne", "Vérifie les surfaces relevées avant de discuter les coefficients"],
      bts: ["Écrit la température retenue de chaque côté de chaque paroi", "Applique un écart corrigé aux parois exposées au soleil", "Explique le décalage entre le maximum d’apport et le milieu de journée"]
    },
    sources: ["inerWeb Aéraulique v5 — bilans thermiques et traitement d’air"],
    correspondances: [
      {reseau: "AéroRézo", station: "Occupants, équipements et soleil", pourquoi: "l’autre moitié du bilan : ce qui naît dans le local et ce qui entre par les vitrages"},
      {reseau: "AéroRézo", station: "Apport sensible", pourquoi: "la même proportionnalité à l’écart de température, appliquée cette fois à un débit d’air"}
    ]
  }
});
