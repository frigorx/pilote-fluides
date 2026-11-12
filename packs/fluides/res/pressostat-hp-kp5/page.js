/* Pressostat HP : données de la page (textes, valeurs, écrans, questions).
   Le moteur commun est dans ../_pressostats-commun/ (moteur.js, dessins, textes.js).
   Version suivie : HP à réarmement manuel, différentiel fixe 3 bar (Danfoss KP5).
   Toute valeur vient de SOURCES-METIER.md. Ne pas changer une valeur ici sans y changer sa source. */
window.PRESSOSTAT_PAGE = {
  id: "pressostat-hp-kp5",
  modele: "hp",
  titre: "Pressostat HP : fonctionnement et réglage",
  exemple: "exemple : Danfoss KP5",
  lignePlan: "Plan thermo-techno",
  codes: ["1.01", "1.04", "3.01", "4.05", "6.03", "6.07", "7.04", "9.06"],
  revision: "13 novembre 2026",

  /* Valeurs de l'exemple suivi d'un bout à l'autre de la page (bar relatifs). */
  valeurs: {
    hp: { coupure: 14, differentiel: 3, retour: 11, rearmement: "manuel", plage: [8, 32], tourPlage: 2.3 }
  },

  ecrans: [
    {
      id: "role",
      court: "À quoi il sert",
      titre: "Un interrupteur commandé par la pression de refoulement",
      dessin: { type: "circuit", prises: "hp" },
      legende: "Le pressostat HP est raccordé au refoulement du compresseur.",
      texte: [
        "Un pressostat est un interrupteur commandé par une pression. Le pressostat HP (haute pression) surveille le refoulement du compresseur.",
        "Il arrête le compresseur quand la pression de refoulement monte trop haut. C’est un organe de sécurité : il protège l’installation d’une pression qu’elle ne supporterait pas.",
        "Une haute pression trop élevée vient souvent d’un condenseur encrassé ou d’un ventilateur de condenseur en panne.",
        "Le même appareil sert aussi en régulation : il met en marche et arrête le ventilateur du condenseur selon la pression. Ce cours traite l’emploi de sécurité."
      ],
      narration: "Un pressostat est un interrupteur. Il bascule quand une pression atteint la valeur réglée. Le pressostat haute pression est raccordé au refoulement du compresseur. Quand la pression monte trop haut, il ouvre son contact et le compresseur s'arrête. C'est une sécurité. L'exemple de ce cours est un Danfoss K P cinq. Les pressostats des autres marques fonctionnent sur le même principe."
    },
    {
      id: "appareil",
      court: "L’appareil",
      titre: "Reconnaître l’appareil et lire sa plaque",
      dessin: { type: "face", reperes: true, differentiel: "fixe", rearmement: "manuel" },
      legende: "La vis se tourne par le dessus. La coupure réglée se lit sur la plaque graduée.",
      reperes: [
        { nom: "Vis de plage", role: "règle la coupure" },
        { nom: "Plaque graduée", role: "affiche la coupure réglée, en bar" },
        { nom: "Bouton de réarmement", role: "referme le contact après une coupure" },
        { nom: "Raccord", role: "reçoit la pression de refoulement" },
        { nom: "Entrée du câble", role: "passage des fils vers les bornes" }
      ],
      texte: [
        "Les mots gravés sur la plaque sont en anglais. CUT OUT ou STOP : la coupure. CUT IN ou START : l’enclenchement. DIFF : le différentiel. RESET : le réarmement. La suite du cours emploie les mots français.",
        "Les pressions de la plaque sont des pressions relatives : celles qu’affiche un manomètre."
      ],
      narration: "L'appareil est vu de face. La vis de réglage est sur le dessus : elle se tourne au tournevis. La plaque graduée affiche la coupure que vous avez réglée. Le bouton de réarmement est sur le dessus du boîtier. Sous le boîtier, le raccord reçoit la pression de refoulement. Les mots de la plaque sont en anglais. Ils sont traduits à l'écran, une fois pour toutes."
    },
    {
      id: "interieur",
      court: "Dedans",
      titre: "Ce qu’il y a dans le boîtier",
      dessin: { type: "coupe", cote: "hp", reperes: true },
      legende: "La pression pousse le soufflet vers le haut. Le ressort le repousse vers le bas.",
      texte: [
        "Le soufflet est une capsule de métal plissée. La pression du circuit entre dedans par le raccord et l’allonge.",
        "En face, le grand ressort s’oppose à cette poussée. La vis de plage le comprime plus ou moins : elle fixe la pression à laquelle le contact bascule.",
        "Entre les deux, une tige transmet le mouvement à la bascule, qui ouvre ou ferme le contact.",
        "Le soufflet HP est petit et son ressort est raide : il ne bouge qu’à forte pression."
      ],
      narration: "On trouve un soufflet, une tige et un ressort. La pression du circuit entre dans le soufflet et l'allonge. Le ressort pousse dans l'autre sens. Tant que le ressort gagne, le contact reste fermé. Quand la pression devient trop forte, elle prend le dessus : la tige monte, la bascule claque et le contact s'ouvre."
    },
    {
      id: "mouvement",
      court: "Le mouvement",
      titre: "La pression monte, le contact s’ouvre et reste ouvert",
      dessin: { type: "coupe", cote: "hp", curseur: { min: 6, max: 18, pas: 0.1, depart: 9 }, bouton: true },
      legende: "Faites monter la pression de refoulement : à 14 bar, le contact s’ouvre. Il ne se referme qu’au bouton.",
      texte: [
        "Dans cet exemple, le pressostat coupe à 14 bar.",
        "Quand la pression monte, le soufflet pousse la tige contre le ressort. À 14 bar, la bascule claque : le contact s’ouvre, le compresseur s’arrête.",
        "Cette version est à réarmement manuel. La pression peut redescendre, le contact reste ouvert tant que personne n’a appuyé sur le bouton.",
        "L’appui n’a d’effet que si la pression est redescendue de 3 bar sous la coupure : 14 − 3 = 11 bar."
      ],
      messages: {
        marche: "Refoulement à {p} bar. Contact fermé : le compresseur peut tourner.",
        coupe: "Refoulement à {p} bar. Le contact vient de s’ouvrir : le compresseur s’arrête.",
        attente: "Refoulement à {p} bar. Contact ouvert. Le bouton n’aura d’effet qu’à 11 bar ou moins.",
        pret: "Refoulement à {p} bar. Contact ouvert. La pression est assez basse : le bouton aura un effet.",
        refus: "Le bouton revient sans effet : la pression est encore à {p} bar.",
        rearme: "Vous avez réarmé à {p} bar. Contact fermé : le compresseur peut repartir."
      },
      narration: "Faites monter la pression avec le curseur. Le soufflet pousse contre un ressort raide. À quatorze bar, la bascule claque et le compresseur s'arrête. Faites redescendre la pression : le contact reste ouvert. Sur cette version, il faut appuyer sur le bouton de réarmement. Essayez d'appuyer trop tôt, puis à onze bar."
    },
    {
      id: "rearmement",
      court: "Réarmement",
      titre: "Le bouton de réarmement et les deux versions",
      dessin: { type: "face", accent: "bouton", differentiel: "fixe", rearmement: "manuel" },
      legende: "Le bouton est sur le dessus du boîtier. Il referme le contact, une fois la pression redescendue à 11 bar ou moins.",
      texte: [
        "Le bouton de réarmement se pousse avec le doigt. Il oblige quelqu’un à venir voir la machine après une coupure. Si le compresseur repartait seul, le défaut se répéterait sans que personne le remarque."
      ],
      encadre: { genre: "attention", texte: "On ne réarme pas sans avoir cherché la cause de la coupure et l’avoir corrigée : condenseur encrassé, ventilateur arrêté, air qui ne circule plus." },
      tableaux: [
        {
          titre: "Les deux versions du KP5",
          colonnes: ["Version", "Plage", "Différentiel", "La vis de plage règle", "Après une coupure"],
          lignes: [
            ["Réarmement manuel", "8 à 32 bar", "3 bar, fixe", "la coupure", "Il faut appuyer sur le bouton, pression redescendue de 3 bar"],
            ["Réarmement automatique", "8 à 32 bar", "1,8 à 6 bar, réglable", "la coupure", "Le contact se referme seul, pression redescendue du différentiel"]
          ],
          surligner: 0
        }
      ],
      narration: "Le bouton de réarmement sert à refermer le contact après une coupure. Il a une raison d'être : une coupure haute pression doit être vue par quelqu'un. Avant d'appuyer, cherchez la cause. Regardez le condenseur, son ventilateur, le passage de l'air. Corrigez le défaut. Ensuite seulement, réarmez. Si la pression est encore trop haute, le bouton n'a aucun effet. Il existe aussi une version automatique, qui se referme seule."
    },
    {
      id: "bornes",
      court: "Les bornes",
      titre: "Le contact et les bornes du KP5",
      dessin: { type: "bornes", etats: ["marche", "defaut"] },
      legendes: {
        "marche": "En marche normale, le courant entre par la borne 1 et sort par la borne 2 vers le compresseur.",
        "defaut": "Refoulement trop haut : le contact quitte la borne 2 et touche la borne 4. Le compresseur s’arrête, le voyant s’allume."
      },
      boutons: { "marche": "Marche normale", "defaut": "Pression trop haute" },
      texte: [
        "Ce repérage est celui du KP5 de Danfoss. Il ne vaut pas pour une autre marque.",
        "Borne 1 : arrivée du courant. Borne 2 : départ vers le compresseur. Borne 4 : signal de défaut, pour un voyant. La borne de terre reçoit le fil vert et jaune.",
        "Sur le pressostat BP de la même série, c’est l’inverse : le compresseur est sur la borne 4 et le voyant sur la borne 2."
      ],
      encadre: { genre: "attention", texte: "Avant de câbler, coupez et consignez l’alimentation. Vérifiez ensuite le repérage sur le schéma de votre appareil." },
      narration: "Le courant arrive par la borne un. En marche normale, il ressort par la borne deux : le compresseur tourne. Quand la pression de refoulement monte trop haut, le contact quitte la borne deux et touche la borne quatre. Le compresseur s'arrête et le voyant de défaut s'allume. Attention : sur le pressostat basse pression de la même série, les bornes deux et quatre sont inversées."
    },
    {
      id: "regler",
      court: "Régler",
      titre: "Régler la coupure",
      dessin: { type: "plaque", cote: "hp" },
      legende: "La vis de plage déplace l’index de coupure. Sur cette version, il n’y a pas de vis de différentiel.",
      etapes: [
        "Affichez la coupure sur l’échelle : ici 14 bar.",
        "Le différentiel est fixe sur cette version : 3 bar.",
        "Calculez la pression de réarmement : coupure − différentiel = 14 − 3 = 11 bar."
      ],
      calcul: { type: "hp", formule: "réarmement possible à : coupure − différentiel" },
      texte: [
        "Un tour de la vis de plage change la coupure d’environ 2,3 bar.",
        "La coupure dépend du fluide, du type de condenseur et du lieu. Pour un condenseur à air, une méthode courante part de la température maximale de l’air du lieu. On ajoute 10 °C pour le réchauffement de l’air dans le condenseur, puis 10 °C pour l’écart entre l’air et le fluide.",
        "Par exemple, 35 + 10 + 10 = 55 °C. Au R134a, 55 °C correspond à 13,9 bar au manomètre. On règle la coupure à 14 bar.",
        "La coupure choisie reste toujours en dessous de la pression maximale de service de l’installation.",
        "Les graduations donnent un préréglage. Le réglage se contrôle ensuite au manomètre, installation en marche."
      ],
      narration: "La vis de plage règle la coupure. Affichez quatorze bar. Sur cette version, le différentiel ne se règle pas : il vaut trois bar. Le réarmement devient donc possible à onze bar. La valeur de quatorze bar vient de la température la plus chaude du lieu, à laquelle on ajoute deux fois dix degrés. On lit ensuite la pression du fluide à cette température."
    },
    {
      id: "verifier",
      court: "Vérifier",
      titre: "Vérifier la coupure, installation en marche",
      dessin: { type: "circuit", prises: "hp", manometres: true, essai: true },
      legende: "Ventilateur du condenseur arrêté, le fluide cède mal sa chaleur à l’air : la pression de refoulement monte.",
      etapes: [
        "Branchez le manomètre HP.",
        "Arrêtez le ventilateur du condenseur, ou obturez le passage de l’air. La pression de refoulement monte.",
        "Notez la pression au moment où le compresseur s’arrête : c’est la coupure.",
        "Remettez le ventilateur en marche, ou retirez ce qui obturait l’air, et attendez que la pression baisse.",
        "Réarmez. Si la coupure ne convient pas, retouchez la vis et recommencez."
      ],
      encadre: { genre: "attention", texte: "Pendant l’essai, gardez le manomètre sous les yeux et la main près de l’arrêt du compresseur. Si la pression dépasse la coupure prévue et que le compresseur tourne encore, arrêtez-le vous-même, puis remettez le ventilateur en marche ou retirez ce qui obturait l’air." },
      releves: {
        titre: "Tableau de relevés",
        consigne: "Faites trois essais et notez la coupure mesurée. Les valeurs doivent se répéter.",
        essais: 3
      },
      narration: "Le réglage se vérifie sur l'installation en marche, manomètre branché. Arrêtez le ventilateur du condenseur. Le refoulement monte. Notez la pression à l'arrêt du compresseur, sans quitter le manomètre des yeux. Si le compresseur ne s'arrête pas à la valeur prévue, arrêtez-le vous-même. Remettez le ventilateur, laissez la pression baisser, puis réarmez. Faites trois essais. Les valeurs doivent se répéter."
    },
    {
      id: "essai-main",
      court: "Essai à la main",
      titre: "Essayer le contact à la main",
      dessin: { type: "coupe", cote: "hp", accent: "levier" },
      legende: "Le levier d’essai fait basculer le contact sans toucher au réglage.",
      texte: [
        "Le levier d’essai est en haut du boîtier. Il fait basculer le contact à la main, sans outil et sans faire varier la pression.",
        "Il sert à contrôler le câblage. Quand vous le poussez, le contact entre les bornes 1 et 2 s’ouvre : le contacteur doit retomber et le voyant de défaut doit s’allumer.",
        "Manœuvrez le levier avec les doigts, jamais avec un tournevis."
      ],
      encadre: { genre: "attention", texte: "Les bornes sont juste à côté du levier. Ne touchez jamais une borne sous tension, ni avec les doigts, ni avec un outil." },
      narration: "Il reste un contrôle, l'essai du contact à la main. Le levier d'essai fait basculer le contact à la main. Le contacteur doit retomber. Les bornes sont juste à côté : n'y touchez pas. Manœuvrez ce levier avec les doigts. Un tournevis abîmerait le mécanisme."
    },
    {
      id: "autres-marques",
      court: "Autres marques",
      titre: "Chez les autres fabricants",
      dessin: { type: "famille" },
      legende: "Le principe est le même chez tous les fabricants : un soufflet, un ressort, une bascule, un contact.",
      tableaux: [
        {
          titre: "Pressostats HP : ce que disent les notices",
          colonnes: ["Fabricant et série", "Plage", "Différentiel", "Réarmement", "Bornes"],
          lignes: [
            ["Danfoss KP5", "8 à 32 bar", "3 bar fixe (manuel), 1,8 à 6 bar réglable (automatique)", "Manuel ou automatique selon la version", "1, 2, 4"],
            ["Ranco O16 (modèles HP)", "8 à 32 bar", "2 bar fixe (manuel), 2 à 6 bar réglable (automatique)", "Manuel ou automatique selon le modèle", "Voir la notice du modèle"],
            ["Alco (Copeland) PS1", "6 à 31 bar, d’autres plages selon le modèle", "Réglable, fixe en réarmement manuel", "Automatique, manuel ou convertible selon le modèle", "1, 2, 4"]
          ]
        }
      ],
      texte: [
        "L’Alco PS1 emploie les mêmes numéros que le KP5 : 1, 2 et 4.",
        "Dans une même série, les plages changent d’un modèle à l’autre. Lisez l’étiquette de l’appareil posé et sa notice avant de régler ou de câbler."
      ],
      narration: "Le K P cinq n'est qu'un exemple. Ranco, Alco, Johnson Controls et d'autres fabriquent des pressostats du même type. Le principe ne change pas. Les plages et le différentiel changent d'un fabricant à l'autre, et parfois le repérage des bornes. Le tableau donne les correspondances relevées dans les notices des fabricants."
    }
  ],

  quiz: [
    {
      question: "Le pressostat a coupé à 16 bar. Il est à réarmement manuel, avec un différentiel fixe de 3 bar. En dessous de quelle pression le bouton a-t-il un effet ?",
      choix: ["19 bar", "16 bar", "13 bar"],
      bonne: 2,
      explication: "Réarmement possible à : coupure − différentiel = 16 − 3 = 13 bar.",
      code: "4.05",
      revoir: "mouvement"
    },
    {
      question: "Le compresseur s’est arrêté sur une coupure HP. Que faites-vous en premier ?",
      choix: ["J’appuie sur le bouton de réarmement", "Je cherche la cause et je la corrige : condenseur, ventilateur, passage de l’air", "Je remonte le réglage de la coupure"],
      bonne: 1,
      explication: "On ne réarme pas sans avoir cherché la cause et l’avoir corrigée. Remonter le réglage affaiblirait la protection.",
      code: "6.07",
      revoir: "rearmement"
    },
    {
      question: "Sur le KP5, quelle borne alimente le compresseur en marche normale ?",
      choix: ["La borne 2", "La borne 4", "La borne de terre"],
      bonne: 0,
      explication: "Le courant arrive par la borne 1 et repart par la borne 2. La borne 4 sert au voyant de défaut.",
      code: "3.01",
      revoir: "bornes"
    },
    {
      question: "Un condenseur à air, 30 °C au plus chaud de l’été. À quelle température lit-on la pression de coupure ?",
      choix: ["30 °C", "40 °C", "50 °C"],
      bonne: 2,
      explication: "On ajoute deux fois 10 °C à la température maximale de l’air : 30 + 10 + 10 = 50 °C.",
      code: "4.05",
      revoir: "regler"
    },
    {
      question: "Pour vérifier la coupure sur une installation en marche, quel geste fait monter la pression de refoulement ?",
      choix: ["Fermer la vanne de départ liquide", "Arrêter le ventilateur du condenseur", "Arrêter le ventilateur de l’évaporateur"],
      bonne: 1,
      explication: "Ventilateur arrêté, le condenseur évacue mal la chaleur : le refoulement monte jusqu’à la coupure.",
      code: "7.04",
      revoir: "verifier"
    }
  ],

  sources: [
    { titre: "Danfoss, fiche de données « Pressure switch, Type KP » (AI213186439478en-001203, 2022.09)", usage: "plage, différentiels, versions, réarmement, valeur d’un tour de vis, pouvoir de coupure" },
    { titre: "Danfoss, guide d’installation KP 1, 2, 4, 5, 6, 7 (AN211886440281en-000704, 2024.10)", usage: "bornes 1, 2, 4, essai du contact" },
    { titre: "Procédure d’atelier de l’auteur : réglage du pressostat HP de sécurité", usage: "essai par le ventilateur du condenseur, choix de la coupure" },
    { titre: "Notices Ranco (O16) et Copeland (PS1)", usage: "plages et bornes des autres fabricants" }
  ]
};
