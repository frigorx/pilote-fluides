/* Capsule s4 — « Ce qui éclate — la pression » (Sécurité · codes 11.03 · 3.01).
   Contenu repris SANS AJOUT de la fiche s4 de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. */
CAPSULE.declarer({
  id: "s4",
  fiche: "s4",
  titre: "Ce qui éclate — la pression",
  surtitre: "HABILITATION FLUIDES · SÉCURITÉ · CODES 11.03 · 3.01",
  duree: "environ 7 minutes",
  intro: "Une bouteille oubliée au soleil, un flexible fatigué, un tronçon isolé qu'on rouvre sans vérifier : la pression ne prévient jamais. Voici ce qui cède, et ce qui protège.",
  codes: [
    { code: "11.03", libelle: "Connaître les règles de sécurité applicables aux fluides nécessitant une pression de fonctionnement plus élevée" },
    { code: "3.01", libelle: "Réaliser une épreuve de pression à l'azote pour vérifier la résistance du circuit" },
  ],

  visuelAccueil: {
    motif: "jauge",
    titre: "La pression qui monte sans rien montrer",
    seuils: [
      { part: 0.15, titre: "Repos apparent", texte: "rien ne se voit, rien ne s'entend" },
      { part: 0.65, titre: "Seuil de la soupape", texte: "elle relâche un peu de fluide avant le danger" },
      { part: 1, titre: "Rupture", texte: "la paroi cède : déformation, fissure ou éclatement" },
    ],
    niveau: 0.5,
    bas: "repos",
    hautLibelle: "rupture",
    teinte: "danger",
  },

  ecrans: [
    {
      id: "bouteille-oubliee",
      titre: "Une bouteille oubliée dans le camion, en plein été",
      note: "La situation",
      visuel: {
        motif: "alerte",
        titre: "Ce qui arrive vraiment sur un chantier",
        vignettes: [
          { picto: "🚐", etiquette: "ce qui arrive", titre: "Une bouteille reste dans le véhicule", texte: "vitres fermées, en plein été" },
          { picto: "❓", etiquette: "ce qu'on ressent", titre: "Rien, de l'extérieur", texte: "ni bruit, ni mouvement, ni tiédeur ne signale ce qui monte à l'intérieur" },
          { picto: "🌡", etiquette: "ce qu'on fait", titre: "Jamais exposée à la chaleur", texte: "à l'abri, à la verticale, arrimée" },
        ],
      },
      texte: "<p>Sur un chantier, une bouteille de fluide oubliée dans un véhicule en plein été, vitres fermées, en est un exemple courant : l'habitacle chauffe fortement, la bouteille avec.</p><p>Une règle simple : plus la température monte, plus la pression à l'intérieur du circuit — ou de la bouteille — monte aussi.</p>",
      dire: "Imaginez le fourgon garé au soleil, un après-midi d'été, fenêtres remontées. À l'arrière, une bouteille de fluide a été oubliée. L'intérieur du véhicule devient une étuve, et la bouteille se réchauffe au même rythme. Or la règle est toujours la même : quand la température d'un circuit ou d'une bouteille grimpe, sa pression grimpe avec elle. Et rien ne trahit ce qui se passe à l'intérieur : la bouteille ne fait aucun bruit, ne bouge pas, ne tiédit même pas sous la main. C'est ce silence qui rend la situation dangereuse.",
      reference: "Codes 11.03 · 3.01 · la situation",
    },

    {
      id: "toujours-sous-pression",
      titre: "Une paroi résiste, jusqu'à un certain point",
      note: "Le mécanisme",
      visuel: {
        motif: "jauge",
        titre: "Ce qui se passe quand la pression monte",
        seuils: [
          { part: 0.15, titre: "Repos apparent", texte: "la pression existe même machine à l'arrêt" },
          { part: 0.65, titre: "Seuil de la soupape", texte: "elle relâche un peu de fluide avant le danger, si le circuit en a une" },
          { part: 1, titre: "Rupture", texte: "au-delà de ce qu'elle supporte, la paroi cède" },
        ],
        niveau: 0.55,
        bas: "repos",
        hautLibelle: "rupture",
        teinte: "danger",
      },
      texte: "<p>Un circuit frigorifique contient du fluide sous pression en permanence. Cette pression existe même quand la machine est à l'arrêt, et même quand il fait chaud dehors alors que rien ne fonctionne.</p><p>Une paroi — bouteille, flexible, raccord, tuyauterie — résiste à une certaine pression. Au-delà, elle cède : elle se déforme, se fissure, ou éclate d'un coup. Ce n'est pas une réaction chimique, c'est une question de force.</p>",
      dire: "Imaginez le circuit comme un ballon gonflé en permanence : même quand la machine dort, le fluide pousse sur les parois de l'intérieur, et la chaleur de l'été ne fait que l'aider. Chaque paroi, qu'il s'agisse d'une bouteille, d'un flexible, d'un raccord ou d'un tube, tient jusqu'à une certaine limite. Au-delà, elle se déforme, se fend ou éclate d'un coup. Il n'y a là aucune réaction chimique, seulement un rapport de force entre la pression et la paroi. Et ce rapport de force ne se voit jamais de l'extérieur.",
      retenir: ["Le circuit reste sous pression même à l'arrêt et même par forte chaleur : rien ne le montre de l'extérieur."],
      reference: "Code 11.03 · le mécanisme",
    },

    {
      id: "ce-qui-peut-ceder",
      titre: "Quatre choses à surveiller",
      note: "Les points faibles",
      visuel: {
        motif: "checklist",
        titre: "Ce qui peut céder",
        items: [
          { titre: "Une bouteille", texte: "qui a chauffé au soleil ou près d'une source de chaleur" },
          { titre: "Un flexible", texte: "fatigué par le temps, l'usure ou de mauvais pliages" },
          { titre: "Un raccord", texte: "mal serré ou abîmé" },
          { titre: "Un tronçon fermé des deux côtés", texte: "par des vannes, sans protection, alors qu'il reste rempli de fluide" },
        ],
      },
      texte: "<p>Ce qui peut céder : une <b>bouteille de fluide</b> qui a chauffé au soleil ou près d'une source de chaleur ; un <b>flexible</b> fatigué par le temps, l'usure ou de mauvais pliages ; un <b>raccord</b> mal serré ou abîmé ; un tronçon de circuit fermé des deux côtés par des vannes, sans aucune protection, alors qu'il reste rempli de fluide.</p>",
      dire: "Quand un circuit lâche, ce n'est presque jamais au hasard : la rupture se produit là où la paroi a été affaiblie ou trop sollicitée. Une bouteille restée en plein soleil, ou près d'une source de chaleur, voit sa pression grimper. Un flexible vieilli, usé ou plié de travers perd sa résistance. Un raccord mal serré ou abîmé devient le maillon faible. Et le cas le plus sournois : un tronçon de tuyauterie isolé entre deux vannes fermées, encore plein de fluide, sans rien pour évacuer une montée de pression. Sur le terrain, ce sont ces quatre endroits qu'on regarde en premier.",
      reference: "Codes 11.03 · 3.01 · les points faibles",
    },

    {
      id: "arret-pas-sans-danger",
      titre: "Un compresseur arrêté n'est pas sans danger",
      note: "L'idée reçue",
      visuel: {
        motif: "duo",
        titre: "Ce qu'on croit, et ce qui est vrai",
        cartes: [
          { titre: "CE QU'ON CROIT", picto: "😌", pour: "L'apparence", texte: "une machine arrêtée depuis longtemps, silencieuse, semble sans danger" },
          { titre: "CE QUI EST VRAI", picto: "⚠", pour: "La réalité", texte: "le circuit peut rester sous pression longtemps, sans qu'aucune fuite ne se produise" },
        ],
        lien: "≠",
        pied: "Un flexible ancien qui cède à l'ouverture d'une vanne, un tronçon de toiture isolé et resté en plein soleil : deux exemples réels de cette pression qu'on ne voit pas.",
      },
      texte: "<p>Un compresseur à l'arrêt n'est pas forcément une machine sans danger. Un circuit peut rester sous pression longtemps après l'arrêt d'une installation, sans qu'aucune fuite ne se produise. Rien à l'extérieur ne signale cette pression : ni bruit, ni mouvement, ni tiédeur.</p><p>Un technicien qui desserre un raccord en se disant « de toute façon, c'est arrêté depuis longtemps » peut se retrouver face à une projection de fluide et de pièces.</p>",
      dire: "Le silence d'une machine arrêtée est trompeur. Le fluide enfermé dans le circuit garde sa pression, parfois très longtemps, même sans la moindre fuite. Et rien ne vous en avertit : pas de bruit, pas de vibration, pas de chaleur au toucher. C'est exactement le piège du technicien qui se dit qu'une installation arrêtée depuis des semaines ne présente plus de risque. Il desserre un raccord, et reçoit un jet de fluide, parfois accompagné de pièces projetées. La seule façon de savoir, c'est de mesurer, jamais de supposer.",
      reference: "Code 11.03 · l'idée reçue",
      controle: {
        enonce: "Un compresseur est à l'arrêt depuis longtemps. Que peut-on en conclure sur la pression du circuit ?",
        choix: [
          "Rien : le circuit peut rester sous pression longtemps, sans qu'aucune fuite ne se produise",
          "Le circuit est forcément revenu à la pression de l'air ambiant",
          "La pression baisse automatiquement dès l'arrêt du compresseur",
          "Seul le bruit du compresseur indique s'il reste de la pression",
        ],
        bonne: 0,
        explication: "L'arrêt d'une installation ne fait pas disparaître la pression. Rien à l'extérieur ne la signale — ni bruit, ni mouvement, ni tiédeur. Seule une mesure au manomètre donne une information sûre, quelle que soit la durée d'arrêt.",
      },
    },

    {
      id: "jamais-a-ras",
      titre: "Une bouteille ne se remplit jamais à ras",
      note: "Pourquoi",
      visuel: { svg: "secu-bouteille.svg", alt: "À gauche, bouteille remplie à ras : le liquide n'a pas de place pour se dilater, la pression grimpe très vite. À droite, volume libre respecté. En bas, les gestes interdits." },
      legende: "À gauche, bouteille remplie à ras : la pression grimpe très vite. À droite, volume libre respecté.",
      texte: "<p>Un liquide qui chauffe se dilate. S'il n'a pas de volume libre au-dessus de lui, la pression grimpe très vite. C'est pourquoi une bouteille ne se remplit <b>jamais</b> à ras.</p><p>Le taux de remplissage à respecter figure sur la plaque de la bouteille ou dans la documentation du fournisseur ; les propriétés du fluide, dans sa fiche de données de sécurité.</p>",
      dire: "Comparez les deux bouteilles du schéma. Celle de gauche a été remplie jusqu'en haut : son liquide n'a plus aucune place. Qu'il fasse plus chaud, et ce liquide gonfle ; comme il ne peut aller nulle part, la pression monte en flèche. Celle de droite garde un espace au-dessus du liquide, qui laisse ce gonflement se faire sans danger. Voilà pourquoi on ne remplit jamais une bouteille au maximum. Jusqu'où aller ? C'est indiqué sur la plaque de chaque bouteille, ou dans la notice du fournisseur. Quant au fluide lui-même, son comportement est décrit dans la fiche de données de sécurité.",
      retenir: ["Une bouteille ne se remplit jamais à ras : le taux de remplissage figure sur sa plaque ou la documentation du fournisseur."],
      reference: "Codes 11.03 · 3.01 · le remplissage",
      controle: {
        enonce: "Pourquoi une bouteille de fluide frigorigène ne doit-elle jamais être remplie à ras ?",
        choix: [
          "Parce que cela fait perdre du fluide inutilement",
          "Parce que le liquide n'a plus de place pour se dilater si la température monte, et la pression grimpe très vite",
          "Parce que la bouteille devient plus difficile à transporter",
          "Parce que cela abîme la peinture de la bouteille",
        ],
        bonne: 1,
        explication: "Un liquide qui chauffe se dilate. S'il n'a pas de volume libre pour le faire, la pression à l'intérieur de la bouteille augmente très rapidement. C'est pour cela qu'un volume libre est toujours respecté, selon le taux de remplissage indiqué par le fabricant.",
      },
    },

    {
      id: "azote-seul",
      titre: "Pour mettre en pression : l'azote, et rien d'autre",
      note: "La règle absolue",
      visuel: { svg: "epreuve-azote.svg", alt: "Le mano-détendeur monté sur la bouteille d'azote sec, raccordé au manifold puis au circuit à éprouver, vanne par vanne — jamais d'oxygène ni d'air comprimé." },
      legende: "Toujours à l'azote, toujours au travers d'un mano-détendeur.",
      texte: "<p>Une <b>soupape de sécurité</b> s'ouvre automatiquement pour laisser échapper un peu de fluide avant que la pression n'atteigne un niveau dangereux ; son seuil de déclenchement est fixé par le fabricant. On vérifie sa présence et son bon état, sans jamais la démonter ni la bloquer.</p><p>Pour toute mise en pression du circuit — recherche de fuite, épreuve de pression — on utilise <b>uniquement de l'azote</b>, jamais de l'oxygène ni de l'air comprimé, toujours au travers d'un <b>mano-détendeur</b> réglé selon la documentation constructeur. Sans détendeur, la pression de la bouteille d'azote suffit à elle seule à faire éclater un circuit frigorifique.</p>",
      dire: "Deux protections encadrent la pression. La soupape de sécurité, d'abord : elle libère un peu de fluide avant que la pression ne devienne dangereuse, au seuil que le fabricant a fixé. Votre rôle est simple : vérifier qu'elle est là et en bon état, sans jamais la démonter ni la bloquer. La règle de l'azote, ensuite : pour une recherche de fuite ou une épreuve, on ne met un circuit sous pression qu'avec de l'azote, et toujours à travers un mano-détendeur réglé selon le constructeur. Une bouteille d'azote branchée sans détendeur suffit à faire éclater un circuit. L'oxygène et l'air comprimé sont exclus, sans exception.",
      reference: "Code 3.01 · la mise en pression",
    },

    {
      id: "final",
      titre: "Avant de toucher un raccord",
      note: "À emporter",
      visuel: {
        motif: "sequence",
        titre: "Ce qui protège, dans l'ordre",
        etapes: [
          { titre: "Jamais exposée à la chaleur", texte: "une bouteille ne se chauffe jamais et ne se remplit jamais à ras" },
          { titre: "Jamais à l'oxygène ni à l'air comprimé", texte: "toute mise en pression se fait à l'azote seul, avec un mano-détendeur", danger: true },
          { titre: "Toujours au manomètre avant de toucher", texte: "même sur une machine arrêtée depuis longtemps", danger: true },
        ],
        pied: "Rien à l'extérieur ne montre qu'un circuit est sous pression : seul le manomètre le dit.",
      },
      texte: "<p>On ne chauffe <b>jamais</b> une bouteille de fluide pour accélérer un transfert ou une charge. On ne met <b>jamais</b> un circuit sous pression avec de l'oxygène ou de l'air comprimé, et on n'utilise <b>jamais</b> une bouteille d'azote sans mano-détendeur.</p><p>Avant de desserrer quoi que ce soit sur un circuit à l'arrêt, on mesure sa pression au manomètre — même si l'installation semble arrêtée depuis longtemps.</p>",
      dire: "Trois gestes interdits résument toute cette capsule, parce qu'ils mènent aux éclatements les plus graves. Réchauffer une bouteille pour aller plus vite, que ce soit à la flamme, à l'eau chaude ou contre un radiateur, fait monter sa pression jusqu'à la rupture. Mettre un circuit sous pression avec de l'oxygène ou de l'air comprimé, ou ouvrir une bouteille d'azote sans mano-détendeur, peut le faire éclater. Et un circuit arrêté reste suspect tant que le manomètre n'a pas parlé : on mesure avant de desserrer, toujours. Ce sont ces trois réflexes qu'on attend de vous sur chaque chantier.",
      piege: "<p>On ne chauffe <b>jamais</b> une bouteille de fluide pour accélérer un transfert ou une charge — ni flamme, ni eau chaude, ni radiateur. On ne met <b>jamais</b> un circuit sous pression avec de l'oxygène ou de l'air comprimé, et on n'utilise <b>jamais</b> une bouteille d'azote sans mano-détendeur.</p><p>Conséquence : la bouteille ou le circuit peut éclater et projeter du fluide et des fragments sur la personne présente.</p>",
      reference: "Codes 11.03 · 3.01 · le geste interdit",
    },
  ],

  motFin: "Vous pouvez maintenant revenir à la fiche pour lire le texte complet, ou enchaîner sur la fiche suivante : consigner avant de toucher.",
});
