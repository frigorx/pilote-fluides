/* Capsule x3 — « Détective, la bouteille de récupération » (G5 · parcours D).
   Contenu repris SANS AJOUT de la fiche x3 de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. C'est un
   exercice : la capsule fait chercher, elle ne refait pas le cours. */
CAPSULE.declarer({
  id: "x3",
  fiche: "x3",
  titre: "Détective — la bouteille de récupération",
  surtitre: "HABILITATION FLUIDES · G5 · PARCOURS D",
  duree: "environ 6 minutes",
  intro: "Une récupération en cours, une bouteille qui approche de sa limite, et deux bouteilles qui attendent sur l'étagère : laquelle choisir, et pourquoi ? Cette capsule ne refait pas le cours sur la récupération, elle vous fait chercher.",
  codes: [
    { code: "5.02", libelle: "Gérer le remplissage des cylindres en sécurité" },
    { code: "5.06", libelle: "Peser à chaque étape" },
  ],

  visuelAccueil: {
    motif: "sequence",
    titre: "Un choix à faire, sous la pression du temps",
    etapes: [
      { titre: "La situation", texte: "un cas de terrain" },
      { titre: "Les indices", texte: "ce que vous observez" },
      { titre: "Le raisonnement", texte: "on élimine les fausses pistes" },
      { titre: "La réponse", texte: "et ce qu'elle apprend" },
    ],
  },

  ecrans: [
    {
      id: "recuperation-en-cours",
      titre: "Une récupération qui n'est pas finie",
      note: "Le point de départ",
      visuel: { svg: "recuperation.svg", alt: "Le montage de récupération : l'installation isolée, le groupe de récupération, et la bouteille posée sur une balance. Le fluide circule vers la bouteille." },
      legende: "La bouteille est sur la balance depuis le début : c'est elle qui donne le poids récupéré.",
      texte: "<p>Vous récupérez le fluide d'une chambre froide, avant de remplacer un composant. Bon réflexe : vous avez pesé la bouteille <b>avant</b> de commencer.</p><p>La récupération avance normalement. Sur un chantier, qu'est-ce qui pourrait vous obliger à vous arrêter avant d'avoir vidé tout le circuit ?</p>",
      dire: "Cette enquête commence en pleine récupération. Sur une chambre froide, vous devez changer une pièce, et vous retirez d'abord le fluide du circuit. Vous avez bien fait les choses : la bouteille a été pesée avant le début, et elle n'a pas quitté la balance depuis. C'est cette pesée qui vous dira combien de fluide vous avez retiré. Pour l'instant, tout se passe sans souci. Voici la question : sur un chantier, qu'est-ce qui pourrait vous obliger à vous arrêter avant d'avoir vidé tout le circuit ? Prenez trente secondes avant de passer à l'écran suivant.",
      reference: "Fiche x3 · G5 · parcours D",
    },

    {
      id: "la-balance-approche",
      titre: "Ce que vous constatez",
      note: "Ce que vous observez",
      visuel: {
        motif: "checklist",
        titre: "L'état des lieux, avant de choisir",
        items: [
          { titre: "La balance", texte: "proche du niveau maximal", refus: true },
          { titre: "Le circuit", texte: "il reste du fluide dedans", refus: true },
          { titre: "Sur l'étagère", texte: "une bouteille vide", refus: false },
          { titre: "Et aussi sur l'étagère", texte: "une bouteille entamée, autre fluide", refus: true },
        ],
        pied: "Deux bouteilles disponibles. Une seule est la bonne.",
      },
      texte: "<p>La balance approche du <b>niveau maximal admissible</b> de la bouteille. Il reste pourtant visiblement du fluide dans le circuit.</p><p>Sur l'étagère du fourgon : une bouteille de récupération <b>vide</b>, et une bouteille <b>entamée</b> qui contient déjà un autre fluide.</p>",
      dire: "Faisons le point. La balance indique que la bouteille arrive à sa limite de remplissage, alors que le circuit contient encore du fluide : la récupération n'est pas terminée. Dans le fourgon, deux bouteilles sont disponibles : l'une est vide, l'autre a déjà servi pour un autre fluide. La tentation de faire simple est grande. Avant de décider, posez-vous la question du risque qu'entraîne chaque choix : c'est tout l'objet de cette enquête.",
      reference: "Codes 5.02 · 5.06 · l'état des lieux",
    },

    {
      id: "trois-pistes",
      titre: "Trois idées qui semblent raisonnables",
      note: "On élimine, une par une",
      visuel: {
        motif: "sequence",
        titre: "Une seule piste ne met rien en danger",
        etapes: [
          { titre: "Compléter au-delà ?", texte: "la bouteille devient dangereuse en chauffant", danger: true },
          { titre: "Bouteille entamée ?", texte: "un mélange part en destruction", danger: true },
          { titre: "Laisser dans le circuit ?", texte: "il finira à l'atmosphère", danger: true },
          { titre: "Changer de bouteille", texte: "la peser avant de continuer" },
        ],
        pied: "Trois pistes qui semblent raisonnables. Une seule ne met rien en danger.",
      },
      texte: "<p>Trois idées viennent à l'esprit, et chacune semble raisonnable sur le moment.</p><p>Compléter un peu au-delà du niveau maximal ? Le taux de remplissage protège contre la <b>dilatation du liquide</b> : dépassé, la bouteille devient dangereuse dès qu'elle chauffe un peu.</p><p>Terminer dans la bouteille entamée de l'autre fluide ? Un <b>mélange de fluides</b> ne se recycle ni ne se régénère : tout le lot part en destruction.</p><p>Arrêter là, et laisser le fluide dans le circuit qu'on va ouvrir ? Il finira à l'atmosphère.</p>",
      dire: "Chacune de ces trois idées a l'air pratique, et chacune cache un problème. Remplir un peu au-delà du maximum supprime la marge laissée au liquide pour se dilater : au premier coup de chaleur, la bouteille devient dangereuse. Finir dans la bouteille qui contient un autre fluide crée un mélange que personne ne pourra recycler ni régénérer, et tout part en destruction. Laisser le reste dans le circuit qu'on va ouvrir revient à le relâcher dans l'air. Quand toutes les options faciles échouent, c'est le signe qu'une solution plus rigoureuse existe : à vous de la trouver.",
      retenir: ["Le taux de remplissage maximal protège contre la <b>dilatation du liquide</b>.", "Un mélange de deux fluides est <b>impossible à recycler ou régénérer</b> : il part en destruction."],
      reference: "Code 5.02 · ce qui ne se négocie pas",
    },

    {
      id: "on-change-de-bouteille",
      titre: "On change de bouteille, on pèse avant",
      note: "La réponse, et pourquoi",
      visuel: {
        motif: "jauge",
        titre: "La bouteille approche de sa limite",
        seuils: [{ part: 1, titre: "NIVEAU MAXIMAL ADMISSIBLE", texte: "la limite à ne pas dépasser" }],
        niveau: 0.92,
        bas: "bouteille en cours",
        hautLibelle: "pleine",
        teinte: "danger",
      },
      texte: "<p>Vous basculez le flexible sur la bouteille vide, et vous la <b>pesez avant</b> de continuer, exactement comme la première.</p><p>Vous terminez la récupération dans cette seconde bouteille, jusqu'à ce que le circuit soit vide.</p>",
      dire: "Une bouteille de récupération pleine ne se force pas : on passe à la suivante. Le geste est simple, mais il se fait dans l'ordre. Le flexible change de bouteille, et la nouvelle passe sur la balance avant de recevoir quoi que ce soit, exactement comme la première. Peser d'abord, c'est savoir à tout moment ce qu'on a récupéré, et ne jamais dépasser ce que la bouteille peut accepter. On poursuit ensuite la récupération dans cette seconde bouteille, jusqu'à ce que le circuit soit vide.",
      reference: "Codes 5.02 · 5.06 · la réponse",
      controle: {
        enonce: "La bouteille atteint son niveau maximal et il reste du fluide à récupérer. Que faites-vous ?",
        choix: [
          "Je complète un peu au-delà du niveau : quelques centaines de grammes ne changent rien",
          "Je bascule sur la bouteille vide, et je pèse celle-ci avant de continuer",
          "Je termine dans la bouteille entamée de l'autre fluide, elle a de la place",
          "J'arrête là : le fluide restant peut rester dans le circuit ouvert",
        ],
        bonne: 1,
        explication: "On change de bouteille, on pèse la nouvelle avant, et on continue. Dépasser le niveau est un risque mécanique réel ; mélanger deux fluides condamne le lot ; laisser du fluide dans un circuit qu'on va ouvrir finit à l'atmosphère.",
      },
    },

    {
      id: "jamais-a-ras",
      titre: "Le bon sens qui trompe",
      note: "Le réflexe à emporter",
      visuel: { svg: "secu-bouteille.svg", alt: "Pourquoi une bouteille ne se remplit jamais à ras : à gauche, remplie à ras, la dilatation du liquide fait grimper la pression jusqu'à la rupture ; à droite, le taux de remplissage respecté laisse un volume libre qui absorbe la dilatation." },
      legende: "Une bouteille pleine se ferme, s'étiquette, et se consigne au registre — avant de repartir avec vous.",
      piege: "<p>« Quelques centaines de grammes, ça ne change rien » ressemble à du bon sens de chantier. C'est pourtant le geste qui met la bouteille en danger : dépasser le niveau maximal la rend dangereuse dès la première montée en température.</p>",
      texte: "<p>Le réflexe à garder : on pèse <b>avant</b> chaque bouteille, pas seulement la première de la journée.</p><p>Une bouteille pleine se ferme, s'étiquette, et se consigne au registre.</p>",
      dire: "La phrase la plus dangereuse de cette histoire, c'est celle qui sonne comme du bon sens : quelques centaines de grammes de plus, ça ne change rien. En réalité, c'est précisément ce surplus qui rend la bouteille dangereuse dès qu'elle se réchauffe. D'où une habitude à prendre pour toute votre carrière : chaque bouteille se pèse avant usage, pas seulement la première de la journée. Et une bouteille pleine se ferme, reçoit son étiquette et passe au registre avant de repartir dans le fourgon.",
      retenir: ["On pèse <b>avant</b> chaque bouteille, pas seulement la première.", "Une bouteille pleine se ferme, s'étiquette, se consigne au registre."],
      reference: "Codes 5.02 · 5.06 · le réflexe",
    },
  ],

  motFin: "Vous pouvez revenir à la fiche pour revoir comment récupérer sans émettre, ou enchaîner sur le compresseur.",
});
