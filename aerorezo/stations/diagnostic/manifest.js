/* M5 — Diagnostiquer sans deviner
   Ligne M · Mesure & diagnostic
   Validation expérimentale et diagnostic · CP4, CP7, CP9, CP10

   Terminus de la ligne M, et station qui referme le réseau : c'est là que les
   mesures des autres lignes deviennent une décision.

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "M",
  id: "diagnostic",
  title: "Diagnostiquer sans deviner",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Croisez débit faible, bruit et état du filtre.",
  bac: "Classez les hypothèses puis choisissez le prochain contrôle.",
  bts: "Séparez symptômes, mesures, hypothèses, test discriminant et décision.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "En haut du schéma, un symptôme : le débit est trop faible à une bouche. En dessous, trois causes possibles, et sous chacune le contrôle qui lui correspond. Rien n’indique laquelle est la bonne, et c’est exactement la situation d’un dépannage. Regardez les trois branches avant de lire la suite : elles expliquent toutes le même symptôme, aussi bien l’une que l’autre.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Un symptôme n’est pas une cause. « Il n’y a pas assez d’air » décrit ce qu’on constate, pas ce qui se passe. Entre les deux, il y a un travail, et ce travail a un ordre.\n\nOn part des faits : le débit mesuré et le débit attendu, la date du dernier changement de filtre, ce que dit l’usager, ce qui a été touché récemment sur l’installation. Ces faits ouvrent des hypothèses — ici trois, et il pourrait y en avoir davantage : un filtre chargé, un registre refermé sur la branche, une gaine écrasée ou débranchée quelque part.\n\nVient alors la seule question qui compte : quel contrôle sépare ces hypothèses ? Le réflexe le plus courant est de choisir celui qui confirmerait la première idée. C’est le mauvais. Un contrôle qui confirme laisse toutes les autres causes debout ; un contrôle qui écarte fait tomber une branche entière.\n\nPrenons l’écart de pression aux bornes du filtre. S’il est élevé, le filtre freine l’air : la cause est là. S’il est faible alors que le débit manque toujours, l’information est encore plus utile — le filtre est hors de cause, et il ne reste que deux hypothèses. Un seul relevé, deux conclusions possibles, et dans les deux cas on a avancé. C’est cela, un contrôle qui départage.\n\nUne fois le filtre écarté, on continue de la même façon : la position d’un registre se vérifie à l’œil et coûte quelques minutes, tandis qu’une gaine écrasée demande de suivre le tracé, ce qui est bien plus long. On fait donc d’abord ce qui écarte le plus, pour le moins d’effort. Et on ne remplace jamais une pièce pour voir.",

  method: "Une valeur n’est pas une panne. Cherchez le contrôle qui départage deux hypothèses.",
  formula: "Symptôme → mesures → hypothèses → contrôle → décision",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Une question vous attend : débit faible à une bouche, quel contrôle vient en premier ? Avant de répondre, reprenez les trois hypothèses du schéma, et cherchez pour chaque proposition ce qu’elle permettrait d’écarter. Une action qui remplace une pièce n’écarte rien : elle change l’installation avant de l’avoir comprise. Une action qui ferme les autres bouches change le réseau lui-même, donc le symptôme. Choisissez celle qui laisse l’installation en l’état.",
  lecture: "La bonne réponse s’affiche, mais l’essentiel est ailleurs : demandez-vous ce que chaque proposition écartée aurait détruit. Remplacer le ventilateur efface la preuve et coûte cher pour rien si la cause était un registre. Fermer les autres bouches modifie le réseau, et la mesure suivante ne parlerait plus de la même installation. Mesurer d’abord ne change rien et ouvre la suite : c’est le seul geste réversible des trois.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Trois causes sont montrées : une installation réelle en offre davantage, et parfois deux à la fois — un filtre chargé et un registre refermé se cumulent, et le débit tombe deux fois. La démarche reste la même, mais un seul contrôle ne suffit plus à conclure. Aucune valeur de cette station ne vaut consigne : les seuils viennent du dossier de l’installation.",

  activity: {"kind":"diagnosis"},

  /* Ce que la voix dit — un texte à part, écrit pour l'oreille, jamais l'assemblage
     de ce qui est affiché. Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md. */
  narration: {
    decouvrir: "En haut, ce qu’on vous signale : il ne sort pas assez d’air à une bouche. En dessous, trois causes qui expliqueraient toutes très bien ce même symptôme. Un filtre chargé. Un registre qu’on a refermé et oublié. Une gaine écrasée derrière un faux plafond. Regardez-les bien : rien, absolument rien dans le symptôme ne permet de choisir entre elles. C’est exactement la situation dans laquelle on arrive sur un dépannage, et c’est le moment où l’on se trompe le plus, parce qu’on a déjà une idée en tête avant d’avoir mesuré quoi que ce soit.",

    comprendre: "Le cœur du métier tient dans une question, et une seule : quel contrôle va me permettre d’éliminer une hypothèse ? La nuance est fine, mais elle change tout. Le réflexe naturel, c’est de chercher ce qui confirmerait notre première idée. Le problème, c’est qu’un contrôle qui confirme laisse toutes les autres causes debout : on n’a rien gagné. Un contrôle qui élimine, lui, fait tomber une branche entière. Prenons un exemple concret, avec la pression aux bornes du filtre. Si l’écart est fort, le filtre freine l’air, et on tient la cause. Mais si l’écart est faible alors que le débit manque toujours, c’est encore mieux : on vient de prouver que le filtre n’y est pour rien, et il ne reste que deux pistes. Un seul relevé, deux conclusions possibles, et dans les deux cas on a avancé. Voilà pourquoi on mesure d’abord, et pourquoi on ne remplace jamais une pièce pour voir ce que ça donne.",

    manipuler: "Une question, trois propositions, et un piège dans chacune des mauvaises. La première remplace le ventilateur : coûteuse, et surtout elle efface la preuve, car si la cause était ailleurs, on ne le saura jamais. La deuxième ferme les autres bouches : on modifie le réseau, donc la mesure suivante ne parlera plus de la même installation. La troisième se contente de relever un débit et une pression : elle ne change rien, et elle ouvre la suite. C’est le seul geste qu’on peut annuler, et c’est pour cela qu’il vient en premier.",

    verifier: "Deux questions pour refermer, et pas seulement la station : c’est toute la ligne de la mesure qui s’achève ici. Elles ne portent pas sur une valeur à retenir, mais sur une façon de travailler. En cas d’erreur, l’explication accompagne la réponse, et elle mérite qu’on s’y arrête, car c’est le raisonnement qui se joue, pas le mot. Ce qu’il faut garder de toute la ligne tient en une phrase : on mesure avant de conclure, et le bon contrôle est celui qui élimine."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Un débit trop faible prouve-t-il un filtre colmaté ?","non, plusieurs causes sont possibles",["oui, c’est la cause la plus fréquente","non, plusieurs causes sont possibles","oui, dès que l’écart dépasse 10 %"]],
    ["Le bon contrôle suivant est celui qui…","permet d’écarter une hypothèse",["confirme l’hypothèse la plus probable","demande le moins de démontage","permet d’écarter une hypothèse"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Trouver la cause d’un défaut d’air sans démonter ni remplacer au hasard.",
    acquis: {
      cap: ["Décrit un symptôme sans le confondre avec une cause", "Repère l’état du filtre et la position d’un registre", "Rend compte avant de démonter quand la cause n’est pas établie"],
      bac: ["Énonce plusieurs hypothèses pour un même symptôme", "Choisit le contrôle qui élimine une hypothèse", "Consigne les mesures faites avant toute intervention"],
      bts: ["Sépare symptôme, mesure, hypothèse, contrôle et décision", "Ordonne les contrôles par ce qu’ils éliminent et par ce qu’ils coûtent", "Reprend le raisonnement quand deux causes se cumulent"]
    },
    sources: [
      "Démarche de diagnostic appliquée à un réseau d’air : elle reprend l’ordonnancement employé en dépannage frigorifique",
      "Aucun document interne inerWeb ne traite le diagnostic aéraulique au 27/08/2026 — les seuils de décision viennent du dossier de l’installation"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "Mesurer les pressions (M3)", pourquoi: "le contrôle qui départage la première hypothèse est l’écart aux bornes du filtre"},
      {reseau: "AéroRézo", station: "Mesurer un débit (M2)", pourquoi: "le symptôme lui-même n’existe que si le débit a été mesuré correctement"},
      {reseau: "AéroRézo", station: "Ventilateur et équilibrage (D5)", pourquoi: "un débit qui manque partout ne se traite pas comme un débit qui manque à une seule bouche"}
    ]
  }
});
