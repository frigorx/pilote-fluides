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
  intro: "Un contrôle d'étanchéité chez un client, un détecteur qui sonne près d'un ventilateur en marche : fausse alerte, ou vraie fuite ? Cette capsule ne refait pas le cours sur les fuites, elle vous fait chercher.",
  codes: [
    { code: "4.02", libelle: "Exploiter le registre pour orienter le contrôle" },
    { code: "4.08", libelle: "Utiliser le détecteur dans de bonnes conditions" },
  ],

  visuelAccueil: {
    motif: "sequence",
    titre: "Une alerte à confirmer avant de conclure",
    etapes: [
      { titre: "La situation", texte: "un cas de terrain" },
      { titre: "Les indices", texte: "ce que vous observez" },
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
        pied: "Le registre parle avant même que vous sortiez le détecteur.",
      },
      texte: "<p>Vous faites un contrôle périodique d'étanchéité chez un client. Avant de sortir le détecteur, vous ouvrez le <b>registre</b> de la machine.</p><p>Il vous apprend qu'une fuite a été réparée il y a trois mois, sur un raccord flare de la ligne liquide. Qu'est-ce que ça change pour la suite de votre contrôle ?</p>",
      dire: "Cette enquête commence avant toute mesure, par la lecture d'un document. Vous arrivez chez un client pour le contrôle d'étanchéité régulier de sa machine. Votre premier geste n'est pas de prendre le détecteur, mais d'ouvrir le registre. Vous y découvrez une réparation de fuite, vieille de trois mois : elle se trouvait sur un raccord flare, côté ligne liquide. Gardez bien cette information en tête. Qu'est-ce que ça change pour la suite de votre contrôle ? Prenez trente secondes avant de passer à l'écran suivant.",
      reference: "Fiche x4 · G4 · parcours E",
    },

    {
      id: "quatre-indices",
      titre: "Ce que vous relevez, dans l'ordre",
      note: "Ce que vous observez",
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
      texte: "<p>Le contrôle visuel ne montre <b>rien</b> sur le raccord réparé.</p><p>Votre détecteur électronique <b>sonne</b> en passant près du condenseur — ventilateur en marche.</p><p>Et sur la machine, la plaque indique un fluide différent de celui noté au registre l'an dernier.</p>",
      dire: "Faisons le point sur ce que vous avez constaté. Le registre vous a appris qu'une fuite avait été réparée voici trois mois. À l'œil, l'endroit réparé paraît sain. Votre détecteur électronique, en revanche, se déclenche quand vous approchez du condenseur, alors que son ventilateur tourne. Enfin, la plaque fixée sur la machine annonce un fluide qui n'est pas celui inscrit au registre l'année passée. Quatre constats, donc, dont deux appellent une réaction de votre part : à vous de les repérer avant de passer à la suite.",
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
      dire: "Face à cette alerte, trois réactions viennent spontanément, et aucune des trois ne résiste à la réflexion. Conclure tout de suite à une fuite au condenseur, et l'écrire ? C'est trop tôt : avec le ventilateur en marche, l'air est brassé, et le fluide détecté a très bien pu arriver d'un autre endroit. Resserrer par sécurité tous les raccords ? Cela donne l'air consciencieux, mais rien ne justifie cette intervention, et ce contrôle se fait sans toucher au circuit. Faire comme si de rien n'était, en accusant l'air brassé de tromper le détecteur ? Pas davantage : l'alerte est peut-être réelle. Reste une seule voie, que montre l'écran suivant.",
      reference: "Code 4.08 · utiliser le détecteur",
    },

    {
      id: "on-confirme",
      titre: "On confirme, on ne conclut pas trop vite",
      note: "La réponse, et pourquoi",
      visuel: { svg: "balayage-detecteur.svg", alt: "La technique de balayage au détecteur électronique : la sonde longe le raccord lentement, au contact, et une alerte se confirme toujours par un second passage." },
      legende: "Ventilateur arrêté, passage lent, et on recontrôle aussi le raccord déjà réparé.",
      texte: "<p>Vous arrêtez le ventilateur, et vous refaites un passage lent au détecteur, au contact du raccord.</p><p>Vous recontrôlez aussi le point déjà réparé, même s'il semblait propre au premier passage visuel : un point réparé se vérifie toujours en priorité.</p>",
      dire: "Face à un résultat douteux, on ne conclut pas, on confirme. Le ventilateur s'arrête d'abord, parce que l'air qu'il brasse disperse le fluide et trompe le détecteur. On repasse ensuite lentement, au contact du raccord suspect. Et on revient sur le point déjà réparé, même s'il semblait propre à l'œil : une réparation ancienne est toujours la première suspecte, et sa présence au registre n'est pas un hasard. Cette rigueur évite de déclarer un circuit sain alors qu'il fuit encore.",
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
      dire: "Cette enquête se termine sur deux réflexes à emporter. Le premier, vous l'avez déjà vu : un endroit qui a été réparé passe en tête de liste au contrôle suivant, même si, à l'œil, il paraît impeccable. Le second est plus discret. Sur la machine, la plaque annonce un fluide, mais le registre de l'an passé en mentionne un autre. Ce décalage n'a rien d'anodin : selon le fluide, on ne lit pas la même table de saturation, et tout le reste du contrôle en dépend. Une telle contradiction ne s'ignore pas : on la signale. Plaque et registre doivent toujours s'accorder.",
      retenir: ["Un point réparé se recontrôle <b>en priorité</b>.", "Une incohérence plaque / registre se <b>signale</b> : elle change la table de saturation à utiliser."],
      reference: "Codes 4.02 · 4.08 · le réflexe",
    },
  ],

  motFin: "Vous pouvez revenir à la fiche pour revoir où fuit une installation, ou enchaîner sur la récupération sans émission.",
});
