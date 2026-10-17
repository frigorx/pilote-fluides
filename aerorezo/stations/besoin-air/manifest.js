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
    decouvrir: "Ce logement a l’air calme, et pourtant son air se dégrade sans cesse. Les habitants y relâchent de l’eau toute la journée : en respirant, en se lavant, en cuisinant, en faisant sécher le linge. Ils y ajoutent du gaz carbonique, et les matériaux neufs, peintures, colles, meubles, libèrent leurs propres émanations. Rien de tout cela ne s’échappe tout seul : sans ventilation, tout s’accumule, comme dans une pièce qu’on n’aérerait jamais. C’est le point de départ de votre métier en ventilation : avant de parler de machines, on se demande ce que les occupants rejettent. Comprendre vous dira pourquoi c’est l’humidité qui coûte le plus cher.",

    comprendre: "Commençons par ce que la ventilation n’est pas : ni un chauffage, ni une climatisation. Son seul travail est de renouveler l’air, sans arrêt. Pourquoi est-ce si important ? Parce que l’eau produite par les occupants finit toujours par se poser quelque part, sur la surface la plus froide, et y installer des moisissures qu’on découvrira des mois plus tard. Parce qu’un air chargé de gaz carbonique fatigue ceux qui le respirent. Et parce que les bâtiments récents, très étanches, ne se ventilent plus tout seuls par leurs défauts. Pour vous, la conséquence est une méthode : on part toujours du local, de ce qu’on y fait et de qui l’occupe, avant de penser au matériel. C’est l’objet de la manipulation suivante.",

    manipuler: "C’est à vous de jouer, et l’enjeu est de retrouver l’ordre du métier. Une étude qui commence par le matériel est une étude qui finira mal : on aura acheté avant de savoir ce dont on avait besoin. L’ordre juste part toujours du local, de son usage et de ses occupants ; les débits en découlent, puis le réseau, et la machine vient en dernier. Pour chaque proposition écartée, cherchez le moment où elle se trompe : c’est en expliquant l’erreur à voix haute que la méthode s’installe. Cette station, d’ailleurs, parle du logement : un bureau ou une salle de classe obéissent à d’autres règles. Prenez le temps de choisir.",

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
