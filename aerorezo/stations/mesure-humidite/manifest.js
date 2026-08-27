/* M4 — Mesurer température et humidité
   Ligne M · Mesure & diagnostic
   Validation expérimentale et diagnostic · CP4, CP7, CP9, CP10

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "M",
  id: "mesure-humidite",
  title: "Mesurer température et humidité",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Attends la stabilisation du capteur.",
  bac: "Compare température sèche, HR et point de rosée.",
  bts: "Place les points de mesure et interprète une transformation d’air.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Un air humide longe une paroi froide, et de la buée se forme. Rien n’a été ajouté : l’eau était déjà là, en vapeur, invisible. Deux nombres sont posés à côté du dessin, et tout se joue entre eux : la température de la paroi, et le point de rosée de l’air. Regarde lequel des deux est le plus bas. C’est cette comparaison, et elle seule, qui décide s’il y aura de l’eau.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Un hygromètre relève deux grandeurs à la fois : la température de l’air, dite température sèche, et son humidité relative, en pour cent. Le point de rosée, lui, n’est pas mesuré : il est calculé à partir des deux. C’est la température à laquelle cet air, refroidi sans qu’on lui ajoute ni ne lui retire d’eau, commencerait à en déposer.\n\nLe piège de cette mesure n’est ni dans l’appareil ni dans le calcul : il est dans le temps. Une sonde d’humidité ne donne pas sa valeur tout de suite. Elle doit se mettre à la température du lieu, et son élément sensible doit s’équilibrer avec l’air qui l’entoure. Cela prend plusieurs minutes, davantage encore si l’appareil sort d’un véhicule froid ou d’une poche chaude. Une valeur lue trop tôt est fausse, et rien à l’écran ne le signale : le chiffre s’affiche, net et rassurant. La parade est simple — on pose l’appareil, on fait autre chose, et on revient quand la valeur ne bouge plus.\n\nL’emplacement compte autant. Un relevé pris contre une paroi, dans un jet d’air soufflé, au-dessus d’une machine ou près d’une porte ne représente pas le local. On mesure dans l’air où se tiennent les occupants, à l’écart des sources chaudes et des courants directs.\n\nCe que le point de rosée permet ensuite, c’est de prévoir. Il annonce la température à ne pas franchir sur une surface : un conduit d’air froid mal isolé, une vitre, une paroi de chambre froide. Si cette surface descend au-dessous du point de rosée de l’air qui la longe, il y aura de l’eau — pas peut-être : il y en aura. C’est ainsi qu’on justifie une épaisseur d’isolant, ou qu’on explique une trace d’humidité au plafond.",

  method: "Une mesure d’air exige un emplacement représentatif et un temps de stabilisation.",
  formula: "T sèche (°C) + HR (%) → point de rosée (°C)",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Deux curseurs : la température sèche et l’humidité relative. Pose 27 degrés et 55 pour cent, et lis le point de rosée calculé. Sans toucher à l’humidité, descends la température à 20 degrés, et note de combien le point de rosée a suivi. Reviens à 27 degrés, puis monte l’humidité à 80 pour cent. Compare les deux déplacements : ils ne se produisent pas de la même façon.",
  lecture: "Le point de rosée s’affiche en degrés sous les curseurs : c’est lui qu’on compare à la température des surfaces du local, jamais l’humidité relative seule. La valeur inscrite sur le dessin est celle du réglage de départ : elle ne se recalcule pas quand tu déplaces les curseurs. Retiens l’ordre de grandeur du premier essai : un air de bureau ordinaire a un point de rosée autour de la quinzaine de degrés, et un conduit d’air froid non isolé passe largement au-dessous.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Le point de rosée affiché ici est une estimation, calculée à partir de deux valeurs supposées justes et prises à la pression atmosphérique ordinaire. Il ne remplace ni un diagramme de l’air humide, ni une note de calcul de condensation. Et il ne vaut que pour l’air réellement mesuré : un local n’est pas homogène, l’air d’un plafond n’est pas celui d’une plinthe.",

  activity: {"kind":"dew","temperature":27,"rh":55},

  /* Ce que la voix dit — un texte à part, écrit pour l'oreille, jamais l'assemblage
     de ce qui est affiché. Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md. */
  narration: {
    decouvrir: "Cette buée sur la paroi froide, personne ne l’a versée. L’eau était déjà là, dans l’air, sous forme de vapeur, et on ne la voyait pas. Elle réapparaît à un seul endroit : celui qui est plus froid que le reste. C’est toute l’histoire de la station. À côté du dessin, deux nombres sont posés l’un sous l’autre : la température de la paroi, et le point de rosée de l’air qui la longe. Dès que le premier passe sous le second, l’eau se dépose. Ce n’est pas un risque, c’est une certitude.",

    comprendre: "L’appareil qu’on utilise ici relève deux choses en même temps : la température de l’air, et son humidité relative. Le point de rosée, lui, n’est pas mesuré du tout : il est calculé à partir des deux. Il répond à une question précise. Jusqu’où peut-on refroidir cet air avant qu’il commence à rendre son eau ? Vient maintenant le piège de cette mesure, et il ne se voit pas. Une sonde d’humidité ne dit pas la vérité tout de suite. Elle doit se mettre à la température du lieu, et son élément sensible doit s’équilibrer avec l’air qui l’entoure. Cela demande plusieurs minutes. Pendant ce temps, l’écran affiche un chiffre, bien net, et parfaitement faux. Rien ne vous prévient. La seule parade est de laisser l’appareil en place et de revenir quand la valeur a cessé de bouger. L’endroit compte tout autant : mesurer dans un jet d’air soufflé ou collé contre une paroi, c’est mesurer autre chose que l’air du local.",

    manipuler: "À vous les curseurs. Commencez par les valeurs proposées, celles d’un bureau un jour d’été, et voyez où tombe le point de rosée. Ensuite, faites descendre la température sans toucher à l’humidité : le point de rosée suit, presque pas à pas. Revenez au point de départ, et cette fois montez l’humidité. Le point de rosée grimpe aussi, mais par grandes marches. Les deux grandeurs comptent donc, chacune à sa manière, et c’est pour cela qu’un hygromètre les relève ensemble, jamais l’une sans l’autre.",

    verifier: "Deux questions, sans note, pour vérifier que les deux idées de la station sont bien en place. La première porte sur le temps qu’il faut accorder à une sonde, la seconde sur ce que le point de rosée permet de prévoir. En cas d’erreur, l’explication s’affiche avec la réponse, et c’est là qu’on apprend, plus que dans les bonnes réponses. Ce qu’il faut emporter tient en une ligne : une valeur d’humidité lue trop vite ne vaut rien, même quand elle s’affiche parfaitement."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Une sonde d’humidité que l’on vient de placer…","demande un temps de stabilisation",["donne sa valeur immédiatement","doit être humidifiée avant lecture","demande un temps de stabilisation"]],
    ["Connaître le point de rosée permet de prévoir…","où la condensation va apparaître",["où la condensation va apparaître","quelle sera la vitesse de l’air","quel diamètre de gaine choisir"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Relever l’état de l’air d’un local et annoncer où l’eau risque de se déposer.",
    acquis: {
      cap: ["Attend la stabilisation de l’appareil avant de lire", "Relève une température et une humidité relative", "Repère les surfaces froides d’un local"],
      bac: ["Distingue température sèche, humidité relative et point de rosée", "Choisit un emplacement de mesure représentatif du local", "Compare le point de rosée à la température d’une paroi"],
      bts: ["Interprète un couple température-humidité comme un état d’air", "Déduit une exigence d’isolation d’un risque de condensation", "Écarte un relevé pris trop tôt ou dans un jet d’air soufflé"]
    },
    sources: [
      "Relation entre température, humidité relative et point de rosée — formule de Magnus, celle qu’emploie le calcul de la station",
      "Notices des hygromètres : le temps de réponse et l’incertitude changent selon le modèle et selon l’écart de température au départ"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "L’humidité relative (A4)", pourquoi: "la grandeur y est définie ; ici on la relève sur une installation, avec ce que cela coûte en temps"},
      {reseau: "AéroRézo", station: "Point de rosée et air humide (A5)", pourquoi: "la lecture du diagramme y est traitée ; cette station en fournit les deux valeurs d’entrée"}
    ]
  }
});
