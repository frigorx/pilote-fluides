/* C3 — Parois et écarts de température
   Ligne C · Climatisation & apports
   CP8 · Calculs d’apports thermiques · CP9 · Étude d’une installation de climatisation

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 sur le moule de la station pilote — voir CONTRAT-CONTENU.md.

   ⚠️ Réserve remontée au chat de fusion : l'activité `heat` affiche la scène de la
   batterie et deux curseurs débit-écart. Une station sur les parois demanderait une
   scène de paroi et un couple U-surface. Le texte le dit à l'élève au lieu de le taire :
   la manipulation sert ici à montrer la proportionnalité, pas à chiffrer un mur.
   Voir RAPPORT-LIGNE-C.md. */
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
  decouverte: "La scène montre une surface d’échange traversée par de la chaleur : l’air arrive d’un côté, ressort de l’autre à une température différente, et entre les deux il y a une paroi. Un mur, un vitrage, une toiture font la même chose, en beaucoup plus lent et sans qu’on le voie. Tant qu’il fait plus chaud dehors que dedans, la chaleur entre par toutes les parois du local, le jour comme la nuit. Elle ne demande la permission à personne : elle suit l’écart de température. Reste à savoir combien elle apporte, et par où.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Trois choses décident de ce qui traverse une paroi : sa surface, l’écart de température entre ses deux faces, et sa qualité. Cette qualité s’écrit avec un coefficient noté U — le nombre de watts qui traversent un mètre carré de cette paroi pour un degré d’écart. Plus il est petit, mieux la paroi isole.\n\nLe calcul se fait alors paroi par paroi, jamais en bloc. Chaque mur, chaque vitrage, chaque toiture a sa surface et son coefficient : on calcule sa part, puis on additionne. Prendre une valeur moyenne pour tout le bâtiment paraît plus rapide, mais cela efface précisément ce qui compte — un vitrage laisse passer plusieurs fois plus qu’un mur isolé de même surface, et c’est souvent lui qui décide de la puissance.\n\nEn climatisation, l’écart à retenir n’est pas toujours la simple différence entre l’air extérieur et l’air du local. Une paroi exposée au soleil monte bien au-delà de la température de l’air : on lui applique un écart corrigé, donné par les documents de calcul du projet. Une paroi lourde restitue de plus sa chaleur avec plusieurs heures de retard, et le maximum du bâtiment ne tombe pas à midi.\n\nToutes les parois ne donnent pas sur l’extérieur. Un mur qui sépare deux locaux climatisés à la même température ne transmet rien. Le même mur donnant sur un couloir non traité, un garage ou des combles transmet, et il faut alors connaître la température de l’autre côté.\n\nLe contrôle de cohérence porte sur les surfaces : additionnez celles que vous avez prises en compte et comparez-les au plan. Une paroi oubliée, une surface comptée deux fois, une hauteur sous plafond fausse — ce sont les erreurs les plus fréquentes, bien avant l’erreur de coefficient.",

  method: "Calculez chaque paroi avec ses données, puis additionnez les contributions.",
  formula: "P = U × A × ΔT  ·  U en W/(m²·K), A en m², ΔT en K  ·  P du local = somme de toutes les parois",

  /* Manipuler — une action précise, avec des valeurs concrètes.
     Le simulateur est partagé avec le calcul sur l'air : on le dit, on ne le cache pas. */
  consigne: "Attention, le simulateur de cette escale est celui du calcul sur l’air : il chiffre un débit, pas un mur. Ce qu’il montre vaut pourtant pour les deux. Laissez le premier curseur tranquille et faites varier seulement l’écart de température : passez de 6 à 12 K et regardez la puissance doubler. Revenez à 6 K, puis doublez cette fois la quantité avec le premier curseur : la puissance double encore. Pour une paroi, ce rôle-là est tenu par la surface.",
  lecture: "Ne reportez pas le nombre affiché dans un bilan de parois : il chiffre un débit d’air. Ce que la manipulation démontre, c’est la loi commune aux deux calculs — la puissance est proportionnelle à l’écart de température, et proportionnelle à la quantité en jeu. Pour une paroi, remplacez le débit par le produit du coefficient U et de la surface, et le raisonnement ne change pas. Comparez ensuite votre total aux apports solaires et internes : sur un bâtiment récent bien isolé, la transmission n’est plus la part dominante du bilan d’été.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Le simulateur de cette escale calcule la puissance d’un débit d’air, pas celle d’une paroi : il illustre la loi, il ne remplace pas le calcul. Les coefficients U dépendent de la composition réelle de la paroi et des textes applicables au projet : ils se lisent dans les documents, ils ne se retiennent pas par cœur. Le régime est supposé stable, alors qu’un bâtiment réel stocke la chaleur et la restitue avec du retard. Enfin, ni les ponts thermiques ni les entrées d’air parasites ne sont comptés ici.",

  activity: {"kind":"heat","flow":500,"delta":12,"mode":"wall"},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "Regardez cette surface d’échange, traversée par de la chaleur. L’air arrive d’un côté, il ressort de l’autre à une température différente, et entre les deux, il y a une paroi. Un mur, un vitrage, une toiture font exactement la même chose, en beaucoup plus lent, et sans qu’on puisse rien voir. Tant qu’il fait plus chaud dehors que dedans, la chaleur entre par toutes les parois du local, le jour comme la nuit. Elle ne demande la permission à personne : elle suit l’écart de température. Toute la question est de savoir combien elle apporte, et par où elle passe.",

    comprendre: "Trois choses décident de ce qui traverse une paroi. Sa surface, l’écart de température entre ses deux faces, et sa qualité. Cette qualité s’écrit avec un coefficient, qui dit combien de watts traversent un mètre carré de paroi pour un degré d’écart. Plus il est petit, mieux la paroi isole. Le calcul se mène ensuite paroi par paroi, jamais en bloc. Chaque mur, chaque fenêtre, chaque toiture a sa surface et son coefficient : on calcule sa part, et on additionne. Prendre une valeur moyenne pour tout le bâtiment semble plus rapide, mais cela efface justement ce qui compte. Un vitrage laisse passer plusieurs fois plus qu’un mur isolé de la même taille, et c’est très souvent lui qui décide de la puissance à installer. Dernier point, propre à la climatisation : une paroi au soleil devient bien plus chaude que l’air extérieur. On lui applique alors un écart corrigé, donné par les documents de calcul du projet.",

    manipuler: "Un avertissement avant de toucher aux curseurs. Le simulateur de cette escale est celui du calcul sur l’air : il chiffre un débit, pas un mur. Ce qu’il montre, en revanche, vaut pour les deux. Bougez le second curseur, celui de l’écart de température, en laissant le premier où il est. La puissance suit l’écart, exactement comme le fait une paroi : deux fois plus d’écart, deux fois plus de chaleur qui passe. Revenez ensuite à votre point de départ et bougez le premier curseur. La puissance double encore. Pour une paroi, ce rôle-là est tenu par la surface : deux fois plus grande, deux fois plus d’apport.",

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
