/* T2 — Mélange et filtration
   Ligne T · Centrale de traitement d’air
   CP10 · Réaliser l’étude d’une centrale de traitement d’air
   Correspondance : ligne M · Mesure & diagnostic

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 sur le moule de la station pilote — voir CONTRAT-CONTENU.md.
   Les deux premiers caissons du parcours, pour eux-mêmes : le mélange et le filtre.
   L'ordre général des caissons est traité à la station Lire une CTA. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "T",
  id: "melange-filtration",
  title: "Mélange et filtration",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Suis deux flux qui deviennent un air mélangé.",
  bac: "Calcule une température de mélange simple pour des débits comparables.",
  bts: "Réalise le bilan massique/énergétique et suit l’encrassement par pression différentielle.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Les deux gaines qui entrent n’ont pas la même épaisseur : le trait dit la proportion des débits. D’un côté 700 m³/h d’air extérieur, de l’autre 1 300 m³/h d’air repris. Lis la température qui sort du caisson, puis fais dans ta tête la moyenne des deux températures d’entrée. Les deux nombres ne sont pas les mêmes — et c’est le trait le plus épais qui explique l’écart.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Reprendre une partie de l’air déjà traité, c’est économiser. L’air neuf reste indispensable : il apporte l’oxygène et emporte ce que les occupants et les activités relâchent. Mais en hiver il arrive froid, en été chaud, et tout cet écart est à la charge des batteries. L’air repris, lui, est déjà à la température du local. Le caisson de mélange règle ce compromis, et ce sont les registres qui le commandent.\n\nLa température qui en sort ne se calcule pas comme une moyenne d’école. Chaque flux compte pour ce qu’il apporte réellement, donc en proportion de son débit. On multiplie chaque débit par sa température, on additionne les deux, on divise par le débit total. La moyenne simple n’est juste que dans un cas : quand les deux débits sont égaux.\n\nDeux contrôles disent si le résultat tient debout. Le premier : la température de mélange tombe toujours entre les deux températures d’entrée, jamais en dehors. Le second : elle penche du côté du plus gros débit. Un résultat hors de l’intervalle n’est pas un phénomène, c’est une erreur de calcul.\n\nJuste après le mélange vient le filtre. Son état ne se juge pas à l’œil : un média encore clair peut être chargé en profondeur, un média noirci peut très bien filtrer encore. Ce qu’on mesure, c’est l’écart de pression entre l’amont et l’aval, avec un manomètre différentiel branché sur les deux prises visibles à l’écran. Le constructeur donne l’écart auquel on remplace : on compare, et on décide.\n\nUn filtre encrassé ne prévient pas. Sur un ventilateur à vitesse fixe, c’est le débit qui tombe, et le local est mal ventilé sans que personne ne s’en aperçoive. Sur un ventilateur à débit constant, c’est la consommation qui grimpe pour tenir le même débit. Dans les deux cas, quelqu’un paie. Et un piège tout bête, qu’on retrouve après chaque entretien : un filtre se pose dans le sens de l’air, indiqué par une flèche sur son cadre.",

  method: "Pèse chaque température par son débit avant d’additionner. Le résultat tombe toujours entre les deux valeurs d’entrée, et penche du côté du plus gros débit.",
  formula: "T mélange = (Q₁T₁ + Q₂T₂) / (Q₁ + Q₂) — débits en m³/h, températures en °C",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Pars des valeurs affichées — 700 m³/h d’air extérieur à 5 °C, 1 300 m³/h d’air repris à 22 °C — et note la température de mélange obtenue. Échange ensuite les deux débits sans toucher aux températures, et regarde le résultat descendre de plusieurs degrés. Termine en réglant les deux débits à 1 000 m³/h : tu dois retrouver exactement la moyenne des deux températures.",
  lecture: "La température de mélange est celle que les batteries reçoivent. C’est donc à elle qu’on compare la température de soufflage visée, pour savoir ce qu’il reste à faire. Un mélange à 16 °C pour un soufflage à 20 °C demande peu de chauffage ; le même local en tout air neuf à 5 °C en demanderait bien davantage. C’est là que se lit l’intérêt du recyclage — et sa limite, puisque le débit d’air neuf ne se réduit pas librement.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Ce calcul ne porte que sur la température, sur de l’air sec. L’humidité des deux flux se mélange aussi, et un bilan complet passe par le diagramme de l’air humide. Il suppose de plus un mélange homogène : dans un caisson trop court, les deux flux se superposent sans se brasser, et une sonde mal placée lit une température qui n’existe nulle part ailleurs. Enfin, ni le débit d’air neuf minimal ni la classe du filtre ne se récitent : ils dépendent du local, du texte applicable au projet et de sa version.",

  activity: {"kind":"mix","q1":700,"t1":5,"q2":1300,"t2":22},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "Deux gaines arrivent dans le caisson, et elles n’ont pas la même épaisseur. Ce n’est pas un hasard de dessin : le trait est proportionnel au débit. La fine, c’est l’air extérieur. La large, c’est l’air repris du local, presque le double. Regardez maintenant la température qui ressort du caisson, puis faites de tête la moyenne des deux températures d’entrée. Vous n’obtenez pas le même nombre. L’écart n’est pas une erreur : il vient précisément de cette différence d’épaisseur. Dans un mélange, le flux le plus gros tire la température de son côté.",

    comprendre: "Pourquoi mélanger, d’abord. L’air neuf est indispensable : il apporte l’oxygène et emporte ce que les occupants relâchent. Seulement, en hiver il arrive froid, en été il arrive chaud, et tout cet écart est à la charge des batteries. L’air repris, lui, est déjà à la température du local : il ne coûte presque rien à traiter. Le caisson de mélange, c’est le compromis entre les deux, et ce sont les registres qui le règlent. Vient ensuite le calcul, qui n’a rien d’une moyenne d’école. Chaque flux compte pour ce qu’il apporte vraiment, donc en proportion de son débit. On pèse chaque température par son débit, on additionne, on divise par le débit total. La moyenne simple ne devient juste que dans un seul cas : quand les deux débits sont rigoureusement égaux. Deux contrôles disent alors si le résultat tient debout. Le mélange tombe toujours entre les deux températures d’entrée, jamais en dehors. Et il penche toujours du côté du plus gros débit.",

    manipuler: "Partez des valeurs affichées et retenez la température de mélange obtenue. Échangez ensuite les deux débits, sans toucher aux températures : le gros débit sur l’air extérieur, le petit sur l’air repris. Le résultat descend de plusieurs degrés, alors que les températures d’entrée n’ont pas bougé d’un dixième. Pour finir, égalisez les deux débits : vous retrouverez exactement la moyenne des deux valeurs. C’est la vérification la plus simple du principe. Un dernier mot sur le filtre, juste derrière le caisson. Son encrassement ne se voit pas, il se mesure : le manomètre différentiel branché sur les deux prises donne l’écart de pression, et c’est lui qu’on compare à la valeur du constructeur.",

    verifier: "Deux questions, sans note ; en cas d’erreur, la bonne réponse arrive avec son explication. Trois choses à garder de cette station. La première : dans un mélange, une température se pèse par son débit, jamais autrement. La deuxième : le résultat reste toujours entre les deux valeurs de départ, ce qui donne un contrôle immédiat, sans calculatrice. La troisième concerne le filtre posé juste après. Son état ne se juge pas à la couleur du média, mais à l’écart de pression entre son entrée et sa sortie. Un filtre qu’on ne mesure pas est un filtre qu’on remplace trop tôt, ou beaucoup trop tard."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["La moyenne simple de deux températures ne convient que si…","les deux débits sont égaux",["les deux débits sont égaux","les deux airs sont à la même humidité","le mélange se fait avant le filtre"]],
    ["L’encrassement d’un filtre se suit…","à l’écart de pression à ses bornes",["à l’aspect du média filtrant","à l’écart de pression à ses bornes","au débit lu sur la bouche la plus proche"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Régler la part d’air neuf d’une centrale et décider, sur mesure, quand un filtre doit être remplacé.",
    acquis: {
      cap: ["Repère les deux flux qui entrent dans le caisson de mélange", "Nomme l’air neuf, l’air repris et l’air mélangé", "Trouve les deux prises de pression du filtre"],
      bac: ["Calcule une température de mélange en tenant compte des débits", "Vérifie que le résultat tombe entre les deux températures d’entrée", "Relève un écart de pression au manomètre différentiel"],
      bts: ["Discute le taux d’air neuf au regard du besoin et de la dépense", "Compare l’écart de pression relevé à la valeur de remplacement du constructeur", "Explique l’effet d’un filtre encrassé selon le type de ventilateur"]
    },
    sources: [
      "6.5.1 Technologie (CTA) — architecture d’une centrale (Bac MFER)",
      "WA10 — CTA modulaire, architecture et potentiel pédagogique (machines ERM)"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "Mesurer les pressions", pourquoi: "l’écart de pression du filtre s’y relève, avec l’instrument et le branchement"},
      {reseau: "AéroRézo", station: "Lire une CTA", pourquoi: "ces deux caissons y prennent leur place dans l’ordre complet"}
    ]
  }
});
