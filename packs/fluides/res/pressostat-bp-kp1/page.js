/* Pressostat BP : données de la page (textes, valeurs, écrans, questions).
   Le moteur commun est dans ../_pressostats-commun/ (moteur.js, dessins, textes.js).
   Version suivie : BP à réarmement automatique, différentiel réglable (Danfoss KP1).
   Toute valeur vient de SOURCES-METIER.md. Ne pas changer une valeur ici sans y changer sa source. */
window.PRESSOSTAT_PAGE = {
  id: "pressostat-bp-kp1",
  modele: "bp",
  titre: "Pressostat BP : fonctionnement et réglage",
  exemple: "exemple : Danfoss KP1",
  lignePlan: "Plan thermo-techno",
  codes: ["1.01", "1.04", "3.01", "4.05", "6.03", "6.07", "9.06"],
  revision: "13 novembre 2026",

  /* Valeurs de l'exemple suivi d'un bout à l'autre de la page (bar relatifs). */
  valeurs: {
    bp: { enclenchement: 1.4, differentiel: 1.2, coupure: 0.2, rearmement: "auto", plage: [-0.2, 7.5], diffPlage: [0.7, 4], tourPlage: 0.7, tourDiff: 0.15 }
  },

  ecrans: [
    {
      id: "role",
      court: "À quoi il sert",
      titre: "Un interrupteur commandé par la pression d’aspiration",
      dessin: { type: "circuit", prises: "bp" },
      legende: "Le pressostat BP est raccordé à l’aspiration du compresseur.",
      texte: [
        "Un pressostat est un interrupteur commandé par une pression. Le pressostat BP (basse pression) surveille l’aspiration du compresseur.",
        "Il arrête le compresseur quand la pression d’aspiration descend trop bas. Il le laisse repartir quand la pression est remontée.",
        "Il est relié au circuit par un tube fin, le capillaire. Ce tube transmet la pression jusqu’à l’appareil.",
        "Le même appareil sert de deux façons. En sécurité, il protège le compresseur d’une aspiration trop basse. En régulation, il arrête et relance le compresseur selon la pression d’aspiration."
      ],
      narration: "Un pressostat est un interrupteur. Il bascule quand une pression atteint la valeur réglée. Le pressostat basse pression est raccordé à l'aspiration du compresseur. Quand la pression descend trop bas, il ouvre son contact et le compresseur s'arrête. Quand la pression est remontée, il referme son contact et le compresseur peut repartir. L'exemple de ce cours est un Danfoss K P un. Les pressostats des autres marques fonctionnent sur le même principe."
    },
    {
      id: "appareil",
      court: "L’appareil",
      titre: "Reconnaître l’appareil et lire sa plaque",
      dessin: { type: "face", reperes: true, differentiel: "reglable", rearmement: "auto" },
      legende: "Les deux vis se tournent par le dessus. Les valeurs réglées se lisent sur la plaque graduée.",
      reperes: [
        { nom: "Vis de plage", role: "règle l’enclenchement" },
        { nom: "Vis de différentiel", role: "règle l’écart entre enclenchement et coupure" },
        { nom: "Plaque graduée", role: "affiche les valeurs réglées, en bar" },
        { nom: "Raccord", role: "reçoit la pression d’aspiration" },
        { nom: "Entrée du câble", role: "passage des fils vers les bornes" }
      ],
      texte: [
        "Les mots gravés sur la plaque sont en anglais. CUT IN ou START : l’enclenchement. CUT OUT ou STOP : la coupure. DIFF : le différentiel. RESET : le réarmement. La suite du cours emploie les mots français.",
        "Les pressions de la plaque sont des pressions relatives : celles qu’affiche un manomètre."
      ],
      narration: "L'appareil est vu de face. Les deux vis de réglage sont sur le dessus : elles se tournent au tournevis. La plaque graduée affiche ce que vous avez réglé. Sous le boîtier, le raccord reçoit la pression d'aspiration. Les mots de la plaque sont en anglais. Ils sont traduits à l'écran, une fois pour toutes."
    },
    {
      id: "interieur",
      court: "Dedans",
      titre: "Ce qu’il y a dans le boîtier",
      dessin: { type: "coupe", cote: "bp", reperes: true },
      legende: "La pression pousse le soufflet vers le haut. Le ressort le repousse vers le bas.",
      texte: [
        "Le soufflet est une capsule de métal plissée. La pression du circuit entre dedans par le raccord et l’allonge.",
        "En face, le grand ressort s’oppose à cette poussée. La vis de plage le comprime plus ou moins : elle fixe la pression à laquelle le contact bascule.",
        "Entre les deux, une tige transmet le mouvement à la bascule, qui ouvre ou ferme le contact.",
        "Le soufflet BP est large et son ressort est souple : il réagit à de faibles pressions."
      ],
      narration: "On trouve un soufflet, une tige et un ressort. La pression du circuit entre dans le soufflet et l'allonge. Le ressort pousse dans l'autre sens. Tant que la pression gagne, le contact reste fermé. Quand la pression baisse, le ressort reprend le dessus : la tige descend, la bascule claque et le contact s'ouvre."
    },
    {
      id: "mouvement",
      court: "Le mouvement",
      titre: "La pression baisse, le contact s’ouvre",
      dessin: { type: "coupe", cote: "bp", curseur: { min: -0.2, max: 3, pas: 0.05, depart: 2.2 } },
      legende: "Faites descendre la pression d’aspiration : à 0,2 bar, la bascule claque et le contact s’ouvre.",
      texte: [
        "Dans cet exemple, le pressostat coupe à 0,2 bar et réenclenche à 1,4 bar.",
        "Quand la pression baisse, le soufflet se raccourcit et le ressort repousse la tige. À 0,2 bar, la bascule change de position d’un coup : le contact s’ouvre, le compresseur s’arrête.",
        "Le compresseur attend que la pression soit remontée à 1,4 bar pour repartir. Cet écart de 1,2 bar est le différentiel. Sans lui, le compresseur démarrerait et s’arrêterait sans cesse.",
        "Cette version est à réarmement automatique : le contact se referme seul."
      ],
      messages: {
        marche: "Aspiration à {p} bar. Contact fermé : le compresseur peut tourner.",
        coupe: "Aspiration à {p} bar. Le contact vient de s’ouvrir : le compresseur s’arrête.",
        arret: "Aspiration à {p} bar. Contact ouvert. Il se refermera à 1,4 bar.",
        repart: "Aspiration à {p} bar. Le contact vient de se refermer : le compresseur peut repartir."
      },
      narration: "Faites descendre la pression avec le curseur. Le soufflet se raccourcit, le ressort repousse la tige. À zéro virgule deux bar, la bascule claque : le contact s'ouvre et le compresseur s'arrête. Faites maintenant remonter la pression. Le contact reste ouvert jusqu'à un virgule quatre bar. L'écart entre les deux valeurs, un virgule deux bar, s'appelle le différentiel."
    },
    {
      id: "versions",
      court: "Les versions",
      titre: "Deux versions : automatique ou manuelle",
      dessin: { type: "face", accent: "bouton", differentiel: "fixe", rearmement: "manuel" },
      legende: "La version à réarmement manuel se reconnaît à son bouton, sur le dessus du boîtier.",
      tableaux: [
        {
          titre: "Les deux versions du KP1",
          colonnes: ["Version", "Plage", "Différentiel", "La vis de plage règle", "Après une coupure"],
          lignes: [
            ["Réarmement automatique", "−0,2 à 7,5 bar", "0,7 à 4 bar, réglable", "l’enclenchement", "Le contact se referme seul"],
            ["Réarmement manuel", "−0,9 à 7 bar", "0,7 bar, fixe", "la coupure", "Il faut appuyer sur le bouton"]
          ],
          surligner: 0
        }
      ],
      texte: [
        "Ce cours suit la version à réarmement automatique.",
        "Sur la version manuelle, l’appui sur le bouton n’a d’effet que si la pression est remontée de 0,7 bar au-dessus de la coupure. Pour une coupure à 0,2 bar : 0,2 + 0,7 = 0,9 bar.",
        "On ne réarme pas sans avoir cherché la cause de la coupure et l’avoir corrigée.",
        "Avant de régler, lisez la référence sur l’étiquette et cherchez sa version dans la notice : la vis de plage ne règle pas la même valeur sur les deux."
      ],
      narration: "Le pressostat basse pression existe en deux versions. La première se referme seule quand la pression est remontée : c'est celle de ce cours. La seconde attend un appui sur le bouton de réarmement. Avant tout réglage, lisez la référence sur l'étiquette de votre appareil. La vis de plage ne règle pas la même valeur sur les deux versions."
    },
    {
      id: "bornes",
      court: "Les bornes",
      titre: "Le contact et les bornes du KP1",
      dessin: { type: "bornes", etats: ["marche", "defaut"] },
      legendes: {
        "marche": "En marche normale, le courant entre par la borne 1 et sort par la borne 4 vers le compresseur.",
        "defaut": "Aspiration trop basse : le contact quitte la borne 4 et touche la borne 2. Le compresseur s’arrête, le voyant s’allume."
      },
      boutons: { "marche": "Marche normale", "defaut": "Pression trop basse" },
      texte: [
        "Ce repérage est celui du KP1 de Danfoss. Il ne vaut pas pour une autre marque.",
        "Borne 1 : arrivée du courant. Borne 4 : départ vers le compresseur. Borne 2 : signal de défaut, pour un voyant. La borne de terre reçoit le fil vert et jaune.",
        "La borne 4 alimente la bobine du contacteur du compresseur. La notice permet aussi d’alimenter directement un moteur monophasé de 2 kW au plus."
      ],
      encadre: { genre: "attention", texte: "Avant de câbler, coupez et consignez l’alimentation. Vérifiez ensuite le repérage sur le schéma de votre appareil." },
      narration: "Le courant arrive par la borne un. En marche normale, il ressort par la borne quatre : le compresseur tourne. Quand la pression d'aspiration descend trop bas, le contact quitte la borne quatre et touche la borne deux. Le compresseur s'arrête et le voyant de défaut s'allume. Ce repérage est celui du Danfoss K P un. Sur une autre marque, lisez le schéma de l'appareil."
    },
    {
      id: "regler",
      court: "Régler",
      titre: "Régler l’enclenchement et le différentiel",
      dessin: { type: "plaque", cote: "bp" },
      legende: "La vis de plage déplace l’index d’enclenchement. La vis de différentiel déplace l’index de différentiel.",
      etapes: [
        "Affichez l’enclenchement sur l’échelle de plage : ici 1,4 bar.",
        "Affichez le différentiel sur son échelle : ici 1,2 bar.",
        "Calculez la coupure : enclenchement − différentiel = 1,4 − 1,2 = 0,2 bar."
      ],
      calcul: { type: "bp", formule: "coupure = enclenchement − différentiel" },
      texte: [
        "Un tour de la vis de plage change l’enclenchement d’environ 0,7 bar. Un tour de la vis de différentiel change le différentiel d’environ 0,15 bar.",
        "La coupure doit rester au-dessus de −1 bar, le vide complet.",
        "L’enclenchement se choisit d’après la température d’évaporation : c’est la pression du fluide à cette température.",
        "Les graduations donnent un préréglage. Le réglage se contrôle ensuite au manomètre, installation en marche."
      ],
      tableaux: [
        {
          titre: "Exemples de réglage (procédure d’atelier de l’auteur)",
          colonnes: ["Température d’évaporation", "Fluide", "Coupure", "Différentiel", "Enclenchement"],
          lignes: [
            ["−5 °C", "R134a", "0,2 bar", "1,2 bar", "1,4 bar"],
            ["−5 °C", "R404A", "0,2 bar", "3,8 bar", "4,0 bar"],
            ["−25 °C", "R404A", "0,2 bar", "1,3 bar", "1,5 bar"]
          ]
        }
      ],
      narration: "Sur cette version, la vis de plage règle l'enclenchement. Affichez un virgule quatre bar. La vis de différentiel règle l'écart : affichez un virgule deux bar. La coupure se calcule : un virgule quatre moins un virgule deux, soit zéro virgule deux bar. La plaque donne un préréglage. Vous le contrôlerez au manomètre, installation en marche."
    },
    {
      id: "verifier",
      court: "Vérifier",
      titre: "Vérifier le réglage, installation en marche",
      dessin: { type: "circuit", prises: "bp", manometres: true, essai: true },
      legende: "Vanne de départ liquide fermée, l’évaporateur n’est plus alimenté : la pression d’aspiration descend.",
      etapes: [
        "Branchez le manomètre BP.",
        "Fermez la vanne de départ liquide. La pression d’aspiration descend.",
        "Notez la pression au moment où le compresseur s’arrête : c’est la coupure.",
        "Rouvrez la vanne. Notez la pression au moment où le compresseur repart : c’est l’enclenchement.",
        "Calculez le différentiel : enclenchement − coupure.",
        "Si une valeur ne convient pas, retouchez la vis et recommencez."
      ],
      encadre: { genre: "attention", texte: "Pendant l’essai, gardez le manomètre sous les yeux et la main près de l’arrêt du compresseur. Si la pression descend sous la coupure prévue et que le compresseur tourne encore, arrêtez-le vous-même, puis rouvrez la vanne." },
      releves: {
        titre: "Tableau de relevés",
        consigne: "Faites trois essais et notez vos mesures. Le différentiel se calcule seul.",
        essais: 3
      },
      narration: "Le réglage se vérifie sur l'installation en marche, manomètre branché. Fermez la vanne de départ liquide. L'évaporateur n'est plus alimenté et l'aspiration descend. Notez la pression à l'arrêt du compresseur : c'est la coupure. Si le compresseur ne s'arrête pas à la valeur prévue, arrêtez-le vous-même. Rouvrez la vanne et notez la pression au redémarrage : c'est l'enclenchement. Faites trois essais. Les valeurs doivent se répéter."
    },
    {
      id: "essai-main",
      court: "Essai à la main",
      titre: "Essayer le contact à la main",
      dessin: { type: "coupe", cote: "bp", accent: "levier" },
      legende: "Le levier d’essai fait basculer le contact sans toucher aux réglages.",
      texte: [
        "Le levier d’essai est en haut du boîtier. Il fait basculer le contact à la main, sans outil et sans faire varier la pression.",
        "Il sert à contrôler le câblage. Quand vous le poussez, le contact entre les bornes 1 et 4 s’ouvre : le contacteur doit retomber et le voyant de défaut doit s’allumer.",
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
          titre: "Pressostats BP : ce que disent les notices",
          colonnes: ["Fabricant et série", "Plage", "Différentiel", "Réarmement", "Bornes"],
          lignes: [
            ["Danfoss KP1, version automatique", "−0,2 à 7,5 bar", "0,7 à 4 bar, réglable", "Automatique", "1, 2, 4"],
            ["Ranco O16 (modèle BP)", "−0,2 à 8 bar", "0,7 à 4 bar, réglable", "Automatique", "Voir la notice du modèle"],
            ["Alco (Copeland) PS1", "−0,5 à 7 bar, d’autres plages selon le modèle", "Réglable, fixe en réarmement manuel", "Automatique, manuel ou convertible selon le modèle", "1, 2, 4"]
          ]
        }
      ],
      texte: [
        "L’Alco PS1 emploie les mêmes numéros que le KP1 : 1, 2 et 4.",
        "Johnson Controls (Penn) propose la série P70. Son modèle à contact inverseur numérote ses bornes 1, 2 et 3.",
        "Dans une même série, les plages changent d’un modèle à l’autre. Lisez l’étiquette de l’appareil posé et sa notice avant de régler ou de câbler."
      ],
      narration: "Le K P un n'est qu'un exemple. Ranco, Alco, Johnson Controls et d'autres fabriquent des pressostats du même type. Le principe ne change pas. Les plages changent d'un fabricant à l'autre, et parfois le repérage des bornes. Le tableau donne les correspondances relevées dans les notices des fabricants."
    }
  ],

  quiz: [
    {
      question: "L’enclenchement est réglé à 2,0 bar et le différentiel à 1,5 bar. À quelle pression le pressostat coupe-t-il ?",
      choix: ["0,5 bar", "1,5 bar", "3,5 bar"],
      bonne: 0,
      explication: "Version automatique : coupure = enclenchement − différentiel = 2,0 − 1,5 = 0,5 bar.",
      code: "4.05",
      revoir: "regler"
    },
    {
      question: "Sur la version à réarmement automatique, le pressostat a coupé à 0,2 bar. La pression remonte à 0,9 bar. Avec un enclenchement réglé à 1,4 bar, que fait le compresseur ?",
      choix: ["Il repart tout de suite", "Il reste arrêté jusqu’à 1,4 bar", "Il repart à 1,2 bar"],
      bonne: 1,
      explication: "Le contact se referme à l’enclenchement, ici 1,4 bar. Entre 0,2 et 1,4 bar, il reste ouvert.",
      code: "6.03",
      revoir: "mouvement"
    },
    {
      question: "Sur le KP1, quelle borne alimente le compresseur en marche normale ?",
      choix: ["La borne 2", "La borne 4", "La borne de terre"],
      bonne: 1,
      explication: "Le courant arrive par la borne 1 et repart par la borne 4. La borne 2 sert au voyant de défaut.",
      code: "3.01",
      revoir: "bornes"
    },
    {
      question: "Pour vérifier la coupure sur une installation en marche, quel geste fait baisser la pression d’aspiration ?",
      choix: ["Arrêter le ventilateur du condenseur", "Fermer la vanne de départ liquide", "Ouvrir la porte de la chambre froide"],
      bonne: 1,
      explication: "Vanne de départ liquide fermée, l’évaporateur n’est plus alimenté : l’aspiration descend jusqu’à la coupure.",
      code: "4.05",
      revoir: "verifier"
    },
    {
      question: "Sur la version à réarmement automatique, que règle la vis de plage ?",
      choix: ["La coupure", "L’enclenchement", "Le différentiel"],
      bonne: 1,
      explication: "En automatique, la vis de plage règle l’enclenchement. La coupure se calcule en retirant le différentiel.",
      code: "4.05",
      revoir: "versions"
    }
  ],

  sources: [
    { titre: "Danfoss, fiche de données « Pressure switch, Type KP » (AI213186439478en-001203, 2022.09)", usage: "plages, différentiels, versions, réarmement, pouvoir de coupure" },
    { titre: "Danfoss, guide d’installation KP 1, 2, 4, 5, 6, 7 (AN211886440281en-000704, 2024.10)", usage: "bornes 1, 2, 4, valeur d’un tour de vis, essai du contact" },
    { titre: "Procédure d’atelier de l’auteur : réglage du pressostat BP de sécurité", usage: "essai par la vanne de départ liquide, exemples de réglage" },
    { titre: "Notices Ranco (O16), Copeland (PS1) et Johnson Controls (P70)", usage: "plages et bornes des autres fabricants" }
  ]
};
