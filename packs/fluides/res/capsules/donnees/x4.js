/* Capsule x4 — « Détective, le contrôle qui tourne mal » (G4 · parcours E).
   Contenu repris SANS AJOUT de la fiche x4 de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. C'est un
   exercice : la capsule fait chercher, elle ne refait pas le cours. */
CAPSULE.declarer({
  id: "x4",
  fiche: "x4",
  titre: "Détective — le contrôle qui tourne mal",
  surtitre: "HABILITATION FLUIDES · G4 · PARCOURS E",
  duree: "environ 6 minutes",
  intro: "Un contrôle d'étanchéité chez un client, un détecteur qui sonne près d'un ventilateur en marche : fausse alerte, ou vraie fuite ? Cette capsule ne refait pas le cours sur les fuites, elle te fait chercher.",
  codes: [
    { code: "4.02", libelle: "Exploiter le registre pour orienter le contrôle" },
    { code: "4.08", libelle: "Utiliser le détecteur dans de bonnes conditions" },
  ],

  visuelAccueil: {
    motif: "sequence",
    titre: "Une alerte à confirmer avant de conclure",
    etapes: [
      { titre: "La situation", texte: "un cas de terrain" },
      { titre: "Les indices", texte: "ce que tu observes" },
      { titre: "Le raisonnement", texte: "on élimine les fausses pistes" },
      { titre: "La réponse", texte: "et ce qu'elle apprend" },
    ],
  },

  ecrans: [
    {
      id: "le-registre-parle-avant-toi",
      titre: "Un contrôle chez un client, un registre à lire d'abord",
      note: "Le point de départ",
      visuel: {
        motif: "frise",
        titre: "Ce que le registre raconte",
        jalons: [
          { date: "Il y a trois mois", texte: "une fuite réparée sur un raccord" },
          { date: "L'an dernier", texte: "le registre note un fluide" },
          { date: "Aujourd'hui", texte: "le contrôle, registre en main", fort: true },
        ],
        pied: "Le registre parle avant même que tu sortes le détecteur.",
      },
      texte: "<p>Tu fais un contrôle périodique d'étanchéité chez un client. Avant de sortir le détecteur, tu ouvres le <b>registre</b> de la machine.</p><p>Il t'apprend qu'une fuite a été réparée il y a trois mois, sur un raccord flare de la ligne liquide. Qu'est-ce que ça change pour la suite de ton contrôle ?</p>",
      dire: "Tu es chez un client, pour un contrôle périodique d'étanchéité. Avant même de sortir le détecteur, tu ouvres le registre de la machine. Il t'apprend qu'une fuite a été réparée il y a trois mois, sur un raccord flare de la ligne liquide. Cette seule information, avant d'avoir mesuré quoi que ce soit, devrait déjà changer ta façon de faire le contrôle. Qu'est-ce que ça change, à ton avis ? Prenez trente secondes avant de passer à l'écran suivant.",
      reference: "Fiche x4 · G4 · parcours E",
    },

    {
      id: "quatre-indices",
      titre: "Ce que tu relèves, dans l'ordre",
      note: "Ce que tu observes",
      visuel: {
        motif: "checklist",
        titre: "Quatre observations, deux alertes",
        items: [
          { titre: "Le registre", texte: "fuite réparée il y a trois mois", refus: false },
          { titre: "Le contrôle visuel", texte: "rien à voir sur le point réparé", refus: false },
          { titre: "Le détecteur électronique", texte: "il sonne près du condenseur", refus: true },
          { titre: "La plaque signalétique", texte: "un fluide différent du registre", refus: true },
        ],
        pied: "Deux alertes. Chacune appelle un réflexe précis.",
      },
      texte: "<p>Le contrôle visuel ne montre <b>rien</b> sur le raccord réparé.</p><p>Ton détecteur électronique <b>sonne</b> en passant près du condenseur — ventilateur en marche.</p><p>Et sur la machine, la plaque indique un fluide différent de celui noté au registre l'an dernier.</p>",
      dire: "Passons en revue ce que tu relèves. Le contrôle visuel ne montre rien sur le raccord déjà réparé, il a l'air propre. Ton détecteur électronique, lui, sonne en passant près du condenseur, ventilateur en marche. Et en regardant la plaque signalétique de la machine, tu remarques qu'elle indique un fluide différent de celui noté au registre l'année dernière. Quatre observations, et deux d'entre elles demandent une vraie réaction.",
      reference: "Codes 4.02 · 4.08 · les observations",
    },

    {
      id: "trois-reflexes-a-tester",
      titre: "Trois réactions possibles, une seule qui tient",
      note: "On élimine, une par une",
      visuel: {
        motif: "sequence",
        titre: "Ce qu'on ne fait pas, ce qu'on fait",
        etapes: [
          { titre: "Fuite au condenseur ?", texte: "le nuage a pu venir d'ailleurs, brassé", danger: true },
          { titre: "Resserrer les raccords ?", texte: "intervention non justifiée ici", danger: true },
          { titre: "Ignorer l'alerte ?", texte: "elle peut aussi être vraie", danger: true },
          { titre: "Confirmer, à l'arrêt", texte: "passage lent, et on recontrôle le point réparé" },
        ],
        pied: "Le registre avait déjà désigné un suspect : le point réparé.",
      },
      texte: "<p>Consigner tout de suite « fuite au condenseur » ? Trop vite : le ventilateur brasse l'air, le nuage de fluide a pu venir d'ailleurs.</p><p>Resserrer tous les raccords « par précaution » ? Ça paraît sérieux, mais c'est une intervention non justifiée : sur ce contrôle, on ne touche pas au circuit.</p><p>Ignorer l'alerte, en se disant que l'air brassé fausse toujours le détecteur ? Non plus : l'alerte peut être vraie.</p>",
      dire: "Trois réactions viennent à l'esprit, regardons-les une par une. Consigner tout de suite « fuite au condenseur » ? Si c'était vraiment le condenseur, tu retrouverais le signal au même endroit une fois l'air calmé. Mais pour l'instant, rien ne le prouve : le ventilateur brasse l'air, le nuage a pu venir d'ailleurs. Resserrer tous les raccords du condenseur, par précaution ? Ça paraît professionnel, mais c'est une intervention non justifiée, et sur ce genre de contrôle, on ne touche pas au circuit sans raison. Ignorer l'alerte, en se disant que l'air brassé fausse toujours le détecteur ? Non plus, l'alerte peut très bien être vraie. Il reste une seule chose à faire : confirmer, dans de bonnes conditions.",
      reference: "Code 4.08 · utiliser le détecteur",
    },

    {
      id: "on-confirme",
      titre: "On confirme, on ne conclut pas trop vite",
      note: "La réponse, et pourquoi",
      visuel: { svg: "balayage-detecteur.svg", alt: "La technique de balayage au détecteur électronique : la sonde longe le raccord lentement, au contact, et une alerte se confirme toujours par un second passage." },
      legende: "Ventilateur arrêté, passage lent, et on recontrôle aussi le raccord déjà réparé.",
      texte: "<p>Tu arrêtes le ventilateur, et tu refais un passage lent au détecteur, au contact du raccord.</p><p>Tu recontrôles aussi le point déjà réparé, même s'il semblait propre au premier passage visuel : un point réparé se vérifie toujours en priorité.</p>",
      dire: "La bonne réponse : tu arrêtes le ventilateur, pour que l'air ne brasse plus rien. Tu refais un passage lent au détecteur, au contact du raccord, près du condenseur. Et tu recontrôles aussi le point déjà réparé, même s'il semblait propre au premier passage visuel : un point réparé se vérifie toujours en priorité, ce n'est jamais un hasard s'il figure au registre.",
      reference: "Codes 4.02 · 4.08 · la réponse",
      controle: {
        enonce: "Le détecteur a sonné près du condenseur, ventilateur en marche. Quelle est la suite correcte ?",
        choix: [
          "Consigner « fuite au condenseur » dans le registre",
          "Arrêter le ventilateur, refaire un passage lent, et recontrôler aussi le raccord réparé",
          "Resserrer tous les raccords du condenseur par précaution",
          "Ignorer l'alerte : l'air brassé fausse toujours le détecteur",
        ],
        bonne: 1,
        explication: "L'air brassé disperse le nuage de fluide : l'appareil peut sonner loin de la fuite réelle. On confirme ventilateur à l'arrêt, et le registre a déjà désigné le suspect n° 1 : le point réparé.",
      },
    },

    {
      id: "la-plaque-et-le-registre",
      titre: "Le détail que presque personne ne relève",
      note: "Le réflexe à emporter",
      visuel: { svg: "lecture-table.svg", alt: "La lecture croisée : la pression relevée au manomètre, la température de saturation lue dans la table du fluide, comparée à la température mesurée sur le tube." },
      legende: "Se tromper de fluide, c'est se tromper de table : la plaque et le registre doivent raconter la même histoire.",
      piege: "<p>La plaque indique un fluide différent de celui noté au registre l'an dernier. Presque personne ne relève ce détail — pourtant il <b>change la table de saturation</b> à utiliser pour toute la suite du contrôle.</p>",
      texte: "<p>Un point réparé se recontrôle toujours en priorité, même s'il semble propre au visuel.</p><p>Et une incohérence entre la plaque et le registre ne se laisse jamais passer : elle se <b>signale</b>.</p>",
      dire: "Deux réflexes à garder pour la suite de ta carrière. D'abord : un point réparé se recontrôle toujours en priorité, même s'il semble parfaitement propre au visuel. Ensuite, et c'est le détail que presque personne ne relève : la plaque de la machine indique un fluide différent de celui noté au registre l'an dernier. Ce n'est pas un détail sans conséquence, ça change la table de saturation à utiliser pour toute la suite du contrôle. Une incohérence comme celle-là, on ne la laisse jamais passer : on la signale.",
      retenir: ["Un point réparé se recontrôle <b>en priorité</b>.", "Une incohérence plaque / registre se <b>signale</b> : elle change la table de saturation à utiliser."],
      reference: "Codes 4.02 · 4.08 · le réflexe",
    },
  ],

  motFin: "Vous pouvez revenir à la fiche pour revoir où fuit une installation, ou enchaîner sur la récupération sans émission.",
});
