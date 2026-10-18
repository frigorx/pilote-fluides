/* A6 — Évaluation · Air & hygrométrie
   Ligne A · Air & hygrométrie
   Socle commun · appui CP8, CP9 et CP10

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "A",
  id: "evaluation-a",
  title: "Évaluation · Air & hygrométrie",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Réinvestissez les gestes et les correspondances du parcours.",
  bac: "Résolvez les situations de mesure et de réglage rencontrées sur plusieurs lignes.",
  bts: "Justifiez les calculs et les décisions dans une installation complète.",

  method: "Douze situations croisées. Le niveau apparaît seulement à la fin.",
  formula: "12 réponses · niveau final de 1 à 4",

  activity: {"kind":"evaluation","line":"A"},

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  /* Ce que la voix dit — texte à part, écrit pour l’oreille (chantier prof vocal, 17/10/2026).
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "Vous voici à l’évaluation de la ligne Air et hygrométrie. Elle réunit douze questions, puisées dans les stations de cette ligne. Pour chacune, lisez la situation, puis choisissez une réponse : la correction s’affiche aussitôt, et un bouton vous mène à la question suivante. Une fois les douze questions passées, un bilan vous dit ce qui est acquis et ce qui reste à reprendre. Prenez le temps de lire chaque proposition jusqu’au bout avant de choisir."
  },

  quiz: [

  ]
});
