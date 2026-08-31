/* V9 — Étudier un réseau VMC
   Ligne V · VMC
   CP4 · Réaliser l’étude d’une installation de VMC

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 sur le moule de la station pilote — voir CONTRAT-CONTENU.md.
   Dernière station formative de la ligne V : elle rassemble le balayage, les débits et
   la relation débit-vitesse-section vues en amont. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "V",
  id: "dimensionner-vmc",
  title: "Étudier un réseau VMC",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Placez les bouches et suivez chaque branche jusqu’au caisson.",
  bac: "Additionnez les débits branche par branche et vérifiez la vitesse obtenue.",
  bts: "Dimensionnez le réseau, évaluez les pertes de charge et situez le point de fonctionnement.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Un réseau de VMC ressemble à un arbre, mais on le lit à l’envers. Les feuilles sont les bouches, chacune dans sa pièce, chacune avec son petit débit. Les branches se rejoignent, et à chaque jonction les débits s’additionnent. Le tronc, lui, arrive au caisson : il transporte tout ce que les bouches ont demandé. Regardez une jonction : ce qui sort n’est jamais plus grand que la somme de ce qui entre, et jamais plus petit non plus.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Étudier un réseau, c’est répondre à deux questions dans l’ordre : quel débit passe où, et quelle taille de gaine pour le transporter.\n\nLe débit d’abord, et il se construit du bout vers la source. Chaque bouche porte le débit exigé pour sa pièce — cuisine, salle d’eau, WC —, débit qu’on cherche dans le texte applicable au projet, jamais de mémoire. On remonte ensuite branche par branche : à chaque jonction, le tronçon aval transporte la somme des débits qui le rejoignent. Arrivé au caisson, on connaît le débit total de l’installation. Une erreur classique consiste à reporter le débit d’une bouche sur tout un tronc, ou à additionner deux fois la même branche : le contrôle est simple, la somme des bouches doit se retrouver au tronc.\n\nLa taille de gaine ensuite. Elle ne se choisit pas au hasard, ni sur ce qui reste au magasin : elle découle du débit et de la vitesse qu’on s’autorise. C’est exactement la relation vue à la station Débit, vitesse, section — on multiplie la surface par la vitesse pour obtenir le débit, et on la retourne pour trouver la surface. En VMC de logement, on reste sur des vitesses modestes : trop vite, la gaine siffle et l’occupant coupe l’installation ; trop lentement, on encombre les combles et on paie de la gaine pour rien.\n\nReste ce qui décide vraiment du ventilateur : la résistance du réseau. Chaque mètre de gaine, chaque coude, chaque bouche et chaque filtre coûtent de la pression. Toutes les branches ne coûtent pas pareil : il y en a une qui coûte plus que les autres — la plus longue, ou la plus tortueuse. C’est elle, et elle seule, qui fixe la pression que le ventilateur doit fournir : si le chemin le plus difficile est desservi, les autres le sont d’office. On l’appelle le chemin le plus défavorisé.\n\nEt c’est là que l’ordre du métier se referme. Débits, puis sections, puis pertes de charge du chemin le plus défavorisé — alors seulement on choisit le caisson, en vérifiant qu’il fournit ce débit à cette pression. L’inverse est une installation qui tourne sans faire son travail.",

  method: "Travaillez branche par branche, du bout vers le caisson. Identifiez ensuite le chemin le plus défavorisé : c’est lui qui commande le ventilateur.",
  formula: "Débits des bouches additionnés → débit du tronc ; surface × vitesse → section ; perte du chemin le plus défavorisé → ventilateur",

  /* Manipuler — une action précise. */
  consigne: "Une branche doit transporter le débit de deux bouches. Réglez le diamètre et la vitesse jusqu’à obtenir ce débit, puis regardez la vitesse obtenue : est-elle raisonnable pour un logement ? Réduisez ensuite le diamètre d’un cran, comme si vous n’aviez que cette gaine en stock, et observez la vitesse grimper. Demandez-vous enfin ce que l’occupant entendra la nuit.",
  lecture: "Une gaine trop petite transporte le bon débit — mais plus vite, donc plus bruyamment, et en coûtant plus de pression au ventilateur. Le débit affiché ne dit donc pas si le réseau est correct : c’est la vitesse qui tranche. Deux réseaux au même débit peuvent être l’un silencieux, l’autre insupportable.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Le calcul proposé porte sur un tronçon isolé et suppose une gaine droite, propre et de section pleine. Un réseau réel additionne les coudes, les tés et les longueurs de flexible, et c’est cette accumulation qui décide du ventilateur. La station apprend la démarche ; une note de calcul complète, ou un logiciel de sélection du fabricant, restent nécessaires sur une affaire.",

  activity: {"kind":"flowcalc","diameter":160,"velocity":3},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "Tout en haut, une bouche : ce qu’une seule pièce réclame. Suivez la gaine qui en part. Vous ne quittez jamais le réseau, et chaque fois qu’une autre gaine vous rejoint, ce que vous transportez grossit. L’air ne disparaît pas : tout ce qui entre ressort plus loin. D’où l’erreur qui coûte cher sur un chantier : dimensionner un tronc comme s’il ne desservait qu’une pièce. Le caisson tourne, et pourtant le miroir de la salle d’eau reste embué, l’odeur de cuisine monte dans les chambres. Rien n’est en panne : le tronc est trop petit pour tout ce qui le traverse.",

    comprendre: "Étudier un réseau, c’est répondre à deux questions, dans cet ordre. Quel débit passe où, et quelle taille de gaine pour le transporter. Le débit se construit du bout vers la source. Chaque bouche porte le débit exigé pour sa pièce, débit qu’on cherche dans le texte applicable au projet, jamais de mémoire. On remonte ensuite branche par branche : à chaque jonction, on additionne. Arrivé au caisson, on connaît le total. Vient alors la taille de gaine. Elle ne se choisit pas sur ce qui reste au magasin : elle découle du débit et de la vitesse qu’on s’autorise. Trop vite, la gaine siffle et l’occupant coupe l’installation. Trop lentement, on encombre les combles et on paie de la gaine pour rien. Reste enfin ce qui décide vraiment du ventilateur : toutes les branches ne coûtent pas la même pression, et il y en a une qui coûte plus que les autres. C’est elle, et elle seule, qui fixe ce que le ventilateur doit fournir. Si le chemin le plus difficile est desservi, les autres le sont d’office.",

    manipuler: "Une branche doit transporter le débit de deux bouches. Réglez le diamètre et la vitesse jusqu’à obtenir ce débit, puis regardez la vitesse que vous avez obtenue. Est-elle raisonnable pour un logement ? Réduisez ensuite le diamètre d’un cran, comme si vous n’aviez que cette gaine en stock. Le débit, vous pouvez le retrouver. Mais regardez ce qu’est devenue la vitesse, et demandez-vous ce que l’occupant entendra la nuit, dans sa chambre, avec cette gaine au-dessus du plafond.",

    verifier: "Deux questions pour finir, sans note. Retenez l’ordre, c’est lui qui compte : les débits d’abord, en partant des bouches ; les sections ensuite, à partir de la vitesse qu’on s’autorise ; la résistance du chemin le plus défavorisé enfin. Et seulement là, le choix du caisson. Un ventilateur choisi en premier est un ventilateur choisi au hasard."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Le débit d’un tronc commun vaut…","la somme des débits qu’il transporte",["la somme des débits qu’il transporte","le débit de la bouche la plus éloignée","le plus grand débit des branches"]],
    ["Le chemin le plus défavorisé est celui qui…","demande la plus forte pression disponible",["comporte le plus grand nombre de bouches","demande la plus forte pression disponible","présente la plus grande longueur droite"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Établir les débits d’un réseau de VMC branche par branche, et dire ce qui commande le choix du ventilateur.",
    acquis: {
      cap: ["Repère les bouches et suit une branche jusqu’au caisson", "Constate que les débits s’additionnent à une jonction", "Lit un débit sur un plan de réseau"],
      bac: ["Additionne les débits du bout vers le caisson sans double comptage", "Déduit une section d’un débit et d’une vitesse admise", "Relie une vitesse trop élevée au bruit perçu par l’occupant"],
      bts: ["Identifie le chemin le plus défavorisé d’un réseau", "Évalue les pertes de charge de ce chemin", "Vérifie qu’un caisson fournit le débit voulu à la pression voulue"]
    },
    sources: [
      "inerWeb Aéraulique v5 — dimensionnement de gaines et pertes de charge",
      "Calculateur Gaines / VMC — inerWeb Outils"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "Débit, vitesse, section", pourquoi: "la relation utilisée ici pour choisir une section y est établie"},
      {reseau: "AéroRézo", station: "Ventilateur et équilibrage", pourquoi: "le chemin le plus défavorisé y devient le point de fonctionnement"}
    ]
  }
});
