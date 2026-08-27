/* V1 — Pourquoi ventiler ?
   Ligne V · VMC
   CP4 · Réaliser l’étude d’une installation de VMC

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 sur le moule de la station pilote — voir CONTRAT-CONTENU.md.
   ⚠️ Aucun débit ni aucune date de texte ne sont figés : la station apprend à chercher
   le texte applicable au projet, dans sa version en vigueur. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "V",
  id: "besoin-air",
  title: "Pourquoi ventiler ?",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Nomme ce qui salit l’air d’un logement occupé.",
  bac: "Relie l’occupation d’un local à son besoin de renouvellement d’air.",
  bts: "Traduis un usage en débits de projet, à vérifier dans le texte applicable.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Un logement fermé, avec des gens dedans. Rien ne se voit, et pourtant l’air change d’heure en heure. Quatre personnes rejettent chaque jour plusieurs litres d’eau par leur respiration, leurs douches, leur cuisine et leur linge qui sèche. Elles rejettent aussi du gaz carbonique. Les peintures, les colles et les meubles neufs dégagent leurs propres vapeurs, parfois pendant des mois. Rien de tout cela ne disparaît tout seul : ce qui entre dans l’air y reste, tant qu’on ne l’évacue pas.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Ventiler, ce n’est pas rafraîchir, et ce n’est pas chauffer. C’est remplacer en continu l’air usé par de l’air neuf. Trois raisons commandent ce remplacement, et elles ne se valent pas.\n\nLa première est l’humidité, et c’est la plus coûteuse. L’eau rejetée dans un logement occupé se dépose sur les surfaces froides : angles de murs, encadrements de fenêtres, arrière des meubles. Là où elle stagne, les moisissures s’installent, le bâti se dégrade, et l’isolant perd son efficacité. Une ventilation défaillante ne se voit pas tout de suite ; elle se lit sur les murs, un ou deux hivers plus tard.\n\nLa deuxième est la qualité de l’air respiré. Le gaz carbonique s’accumule dans une pièce occupée et fermée : il n’est pas toxique aux niveaux rencontrés, mais il mesure bien l’occupation, et un air chargé fatigue et endort. S’y ajoutent les composés dégagés par les matériaux et les produits d’entretien.\n\nLa troisième est le bâtiment lui-même. Plus il est étanche — et les bâtiments récents le sont beaucoup —, moins l’air se renouvelle par les défauts de construction. L’étanchéité fait gagner du chauffage et rend la ventilation mécanique indispensable : ce qui n’entre plus par les fuites doit entrer par un passage prévu.\n\nD’où la règle de méthode, qui vaut pour toute étude : on part du local, de son usage et de son occupation. On en déduit le débit nécessaire, en le cherchant dans le texte applicable au projet et dans sa version en vigueur. Le réseau se dessine ensuite, et la machine se choisit en dernier. Faire l’inverse — choisir un caisson puis chercher ce qu’on peut en tirer — conduit à une installation qui tourne sans faire son travail.",

  method: "Pars du local, de son usage et de son occupation. Le débit s’en déduit, le réseau vient après, la machine en dernier.",
  formula: "Usage du local → débits de projet → réseau → machine → contrôle",

  /* Manipuler — une action précise. */
  consigne: "Trois propositions te sont faites pour commencer une étude de ventilation. Une seule respecte l’ordre du métier. Choisis, puis explique à voix haute pourquoi les deux autres mènent à une installation qui ne fera pas son travail.",
  lecture: "Choisir le ventilateur d’abord, c’est fixer un débit avant de savoir lequel il faut. Dessiner les gaines d’abord, c’est figer un tracé avant de connaître ce qu’il doit transporter. Dans les deux cas, on découvre le besoin réel une fois le matériel commandé.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Cette station traite le logement. Un local tertiaire — bureau, salle de classe, atelier — relève d’une autre logique : les débits s’y calculent par occupant ou par surface, et la sécurité incendie impose ses propres contraintes. Par ailleurs, aucune valeur de débit n’est donnée ici volontairement : elles dépendent du texte applicable et de sa version, et se vérifient à chaque affaire.",

  activity: {"kind":"choice","prompt":"Quel est le premier travail ?","answer":"Identifier les besoins des locaux","choices":["Choisir un ventilateur","Identifier les besoins des locaux","Dessiner les gaines"]},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "Prenons un logement fermé, avec des gens à l’intérieur. En apparence, il ne s’y passe rien. Pourtant, l’air y change d’heure en heure. Quatre personnes rejettent chaque jour plusieurs litres d’eau : en respirant, en se douchant, en cuisinant, en faisant sécher du linge. Elles rejettent aussi du gaz carbonique. Et les peintures, les colles, les meubles neufs dégagent leurs propres vapeurs, parfois pendant des mois. Rien de tout cela ne s’en va tout seul. Ce qui entre dans l’air y reste, tant qu’on ne l’évacue pas.",

    comprendre: "Ventiler, ce n’est ni chauffer ni rafraîchir. C’est remplacer en continu l’air usé par de l’air neuf. Trois raisons le commandent, et la première est de loin la plus coûteuse : l’humidité. L’eau rejetée dans un logement se dépose sur les surfaces froides, les angles de murs, l’arrière des meubles. Là où elle stagne, les moisissures s’installent et le bâti se dégrade. Une ventilation qui ne fonctionne pas ne se voit pas tout de suite : elle se lit sur les murs, un ou deux hivers plus tard. Deuxième raison, l’air qu’on respire. Le gaz carbonique s’accumule dans une pièce fermée et occupée, et un air chargé fatigue. Troisième raison, le bâtiment lui-même : plus il est étanche, moins l’air se renouvelle par les défauts de construction. Ce qui n’entre plus par les fuites doit entrer par un passage prévu. D’où la règle de méthode, et elle vaut pour toute étude : on part du local et de son occupation, on en déduit le débit, le réseau vient ensuite, et la machine en dernier.",

    manipuler: "Trois façons de commencer une étude vous sont proposées. Une seule respecte l’ordre du métier. Prenez le temps de choisir, puis demandez-vous ce qui se passe avec les deux autres. Choisir le ventilateur en premier, c’est fixer un débit avant de savoir lequel il faut. Dessiner les gaines en premier, c’est figer un tracé avant de connaître ce qu’il doit transporter. Dans les deux cas, on découvre le besoin réel une fois le matériel commandé, et c’est trop tard.",

    verifier: "Deux questions pour voir si l’ordre est clair. Elles ne comptent dans aucune note. Retenez l’essentiel : le besoin vient du local, jamais de la machine. Et les débits à respecter ne se retiennent pas par cœur — ils dépendent du texte applicable au projet et de sa version. Un professionnel ne les récite pas, il les cherche, à chaque affaire."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Le débit d’air neuf d’un local se détermine d’abord…","d’après l’usage du local et son occupation",["d’après la puissance du ventilateur en place","d’après l’usage du local et son occupation","d’après le volume du local, seul critère"]],
    ["Les valeurs de débit réglementaires…","dépendent du texte applicable au projet",["sont les mêmes pour tous les bâtiments","se déduisent du diamètre des gaines","dépendent du texte applicable au projet"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Justifier la présence d’une ventilation dans un logement, et énoncer l’ordre d’une étude.",
    acquis: {
      cap: ["Cite trois sources qui salissent l’air d’un logement", "Explique que l’humidité rejetée ne disparaît pas seule", "Repère les pièces où l’humidité se produit"],
      bac: ["Relie l’étanchéité d’un bâtiment au besoin de ventilation mécanique", "Explique le lien entre humidité stagnante et dégradation du bâti", "Énonce l’ordre d’étude : local, débit, réseau, machine"],
      bts: ["Traduit un usage de local en débits de projet", "Recherche les débits applicables dans le texte en vigueur", "Justifie pourquoi le choix de la machine vient en dernier"]
    },
    sources: [
      "VC_100198 — VMC, la maison respire (Bac MFER, collègues partagés)",
      "Doc VMC — rôle et composants d’une VMC (Bac MFER, collègues partagés)"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "VMC simple flux", pourquoi: "le besoin établi ici devient un trajet d’air dans la station suivante"}
    ]
  }
});
