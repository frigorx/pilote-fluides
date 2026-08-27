/* C5 — Air neuf et sélection
   Ligne C · Climatisation & apports
   CP8 · Calculs d’apports thermiques · CP9 · Étude d’une installation de climatisation

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 sur le moule de la station pilote — voir CONTRAT-CONTENU.md.
   Terminus de la ligne C : elle assemble les quatre stations précédentes, puis marque
   la frontière entre un besoin calculé et une machine choisie. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "C",
  id: "air-neuf-selection",
  title: "Air neuf et sélection",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Vois que l’air extérieur doit être traité.",
  bac: "Calcule une puissance sensible de renouvellement d’air.",
  bts: "Croise bilan total, conditions d’air et sélection d’une solution sans confondre calcul et catalogue.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "La gaine amène ici de l’air pris dehors. En été, il arrive plus chaud et plus humide que l’air du local ; en hiver, plus froid et plus sec. Dans les deux cas, il doit être ramené aux conditions voulues avant d’être soufflé sur les gens. Regarde les deux températures, à l’entrée et à la sortie de la batterie : tout cet écart est payé par la machine. Et cet air-là n’est pas une option — c’est lui qui rend le local respirable.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "L’air neuf est souvent la plus grosse charge d’une installation, et la plus oubliée. Contrairement à l’air repris, qui est déjà aux conditions du local, il arrive avec la température et l’humidité du dehors.\n\nIl apporte donc deux charges à la fois. Une charge sensible, liée à l’écart de température : elle se calcule exactement comme dans la première station de cette ligne. Et une charge latente, liée à l’écart de teneur en eau : en été, l’air extérieur porte souvent plus d’eau que celui du local, et cette eau devra être condensée.\n\nPour ne pas séparer les deux, on travaille sur l’enthalpie — la chaleur totale que porte un kilogramme d’air, sa température et son eau réunies. On lit celle de l’air extérieur et celle de l’air du local sur un diagramme de l’air humide ou dans une table, on fait la différence, et on multiplie par le débit massique d’air neuf. Le résultat couvre le sensible et le latent d’un seul coup.\n\nVient ensuite l’assemblage. Le bilan additionne les charges compatibles entre elles : transmission, solaire, apports internes, air neuf — chacune à l’heure retenue, et chacune gardée en deux parts, sensible et latente. On obtient un besoin, avec sa proportion.\n\nUn besoin n’est pas une machine. La puissance annoncée dans un catalogue vaut à des conditions d’essai précises, qui ne sont presque jamais celles du projet : dès que la température de l’air entrant ou celle du fluide change, la puissance réelle change, et sa répartition entre sensible et latent aussi. La sélection se vérifie donc sur les tables du constructeur, aux conditions du projet. Quant à majorer pour être tranquille, cela se paie : une machine trop grande fait des cycles courts, déshumidifie mal, et coûte plus cher à l’achat comme à l’usage.",

  method: "Additionne les charges compatibles, garde les conditions de calcul visibles, puis vérifie la sélection constructeur.",
  formula: "P air neuf = qₘ × Δh  ·  qₘ en kg/s, Δh en kJ/kg  ·  part sensible seule : P = ρ × cₚ × Qᵥ × ΔT",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Règle le débit d’air neuf sur 1 200 m³/h et l’écart sur 10 K, puis note la puissance. Ramène ensuite l’écart à 6 K, celui d’une journée d’été ordinaire entre 32 °C dehors et 26 °C dans le local. Descends enfin à 3 K, comme si un récupérateur avait déjà repris la moitié du travail. Compare les trois valeurs obtenues.",
  lecture: "Le résultat affiché n’est que la part sensible de l’air neuf. En été, la part latente est du même ordre, parfois davantage : le nombre lu sous-estime donc la charge réelle. Compare-le au reste du bilan — dans un local peu occupé mais fortement ventilé, l’air neuf pèse souvent plus que toutes les parois réunies. C’est exactement là que se décide l’intérêt d’un récupérateur.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Le simulateur ne calcule que le sensible : la part latente demande la teneur en eau de l’air extérieur et celle du local, qui ne se déduisent pas d’un écart de température. Les conditions extérieures de calcul dépendent du lieu et des textes applicables au projet. Le débit d’air neuf lui-même n’est pas libre : il découle de l’usage du local et de la réglementation en vigueur, pas du confort thermique. Enfin, le résultat reste un besoin — aucune sélection ne se fait sans les tables du constructeur, lues aux conditions réelles.",

  activity: {"kind":"heat","flow":1200,"delta":10},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "Cette gaine amène de l’air pris dehors. En été, il arrive plus chaud et plus humide que l’air du local ; en hiver, plus froid et plus sec. Dans les deux cas, avant d’être soufflé sur les gens, il doit être ramené aux bonnes conditions. Et tout cet écart, entre ce qu’il est dehors et ce qu’on veut dedans, est payé par la machine. On ne peut pas s’en passer : c’est cet air-là qui rend le local respirable. Ce qui explique un fait qui surprend souvent les débutants : sur beaucoup d’installations, l’air neuf est la plus grosse charge de tout le bilan.",

    comprendre: "L’air neuf apporte deux charges à la fois, et c’est pour cela qu’on l’étudie à part. La première tient à la température : c’est le calcul de la première station de cette ligne, rien de nouveau. La seconde tient à l’eau que l’air transporte. En été, l’air du dehors en porte souvent plus que l’air du local, et cette eau devra être condensée quelque part. Pour ne pas séparer les deux, les professionnels travaillent sur une seule grandeur, l’enthalpie : la chaleur totale que porte un kilogramme d’air, sa température et son eau réunies. On lit celle de l’air extérieur, celle de l’air du local, on fait la différence, et on multiplie par la quantité d’air neuf. Vient alors le moment décisif, et le plus souvent bâclé. Le besoin calculé n’est pas une machine. La puissance d’un catalogue est annoncée à des conditions d’essai qui ne sont presque jamais celles du chantier.",

    manipuler: "À vous de manœuvrer. Le premier curseur donne le débit d’air neuf, le second l’écart de température à rattraper. Partez de mille deux cents mètres cubes par heure avec dix degrés d’écart. Ramenez ensuite l’écart à six degrés : c’est celui d’une journée d’été ordinaire, trente-deux dehors, vingt-six dans le local. Pour finir, descendez à trois degrés, comme si un récupérateur avait déjà repris la moitié du travail. Ces trois nombres racontent à eux seuls pourquoi on installe des récupérateurs, et pourquoi on ne souffle jamais d’air neuf en excès.",

    verifier: "Deux questions, sans note, et deux idées à emporter. La première : le nombre affiché tout à l’heure ne comptait que la température. L’eau apportée par l’air extérieur en été pèse souvent autant, et elle ne se voit pas sur un écart de degrés. La seconde vaut pour toute la ligne : un bilan donne un besoin, jamais une machine. Entre les deux, il y a les tables du constructeur, lues aux conditions réelles du projet. Et majorer par précaution ne met à l’abri de rien : une machine trop grande déshumidifie mal, et elle coûte plus cher deux fois."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["L’air neuf introduit dans un local apporte…","une charge sensible et une charge latente",["uniquement une charge sensible","aucune charge s’il est filtré","une charge sensible et une charge latente"]],
    ["Une fois le bilan fait, la sélection de la machine…","se vérifie sur les données du constructeur",["se vérifie sur les données du constructeur","se déduit du seul volume du local","se majore systématiquement de 30 %"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Chiffrer la charge apportée par le renouvellement d’air, puis vérifier une sélection sur les données du constructeur.",
    acquis: {
      cap: ["Comprend que l’air pris dehors doit être traité avant d’être soufflé", "Repère l’entrée d’air neuf sur une installation", "Constate qu’un écart de température se paie en puissance"],
      bac: ["Calcule la part sensible d’une charge d’air neuf", "Distingue air neuf et air repris dans un bilan", "Explique l’intérêt d’un récupérateur par la réduction de l’écart à traiter"],
      bts: ["Calcule une charge d’air neuf sur un écart d’enthalpie", "Garde visibles les conditions de calcul retenues", "Vérifie une sélection sur les tables du constructeur au lieu de la déduire du bilan"]
    },
    sources: ["inerWeb Aéraulique v5 — bilans thermiques et traitement d’air"],
    correspondances: [
      {reseau: "Thermo-techno", station: "La machine frigorifique", pourquoi: "la puissance calculée ici est celle qu’une machine frigorifique devra produire, à ses propres conditions de fonctionnement"},
      {reseau: "AéroRézo", station: "Récupération d’énergie", pourquoi: "reprendre une part de l’écart avant traitement réduit directement cette charge"}
    ]
  }
});
