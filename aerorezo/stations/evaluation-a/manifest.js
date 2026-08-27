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
  cap: "Réinvestis les gestes et les correspondances du parcours.",
  bac: "Résous les situations de mesure et de réglage rencontrées sur plusieurs lignes.",
  bts: "Justifie les calculs et les décisions dans une installation complète.",

  method: "Douze situations croisées. La note apparaît seulement à la fin.",
  formula: "12 réponses · note finale /20",

  activity: {"kind":"evaluation","line":"A"},

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [

  ]
});
