/* Pressostat combiné HP/BP : données de la page (textes, valeurs, écrans, questions).
   Le moteur commun est dans ../_pressostats-commun/ (moteur.js, dessins.js, textes.js).
   Version suivie : BP automatique, HP à réarmement manuel (KP15, code européen 060-126466).
   Toute valeur vient de SOURCES-METIER.md. Ne pas changer une valeur ici sans y changer sa source. */
window.PRESSOSTAT_PAGE = {
  id: "pressostat-combine-kp15",
  modele: "combine",
  titre: "Pressostat combiné HP/BP : fonctionnement et réglage",
  exemple: "exemple : Danfoss KP15",
  lignePlan: "Plan thermo-techno",
  codes: ["1.01", "1.04", "3.01", "4.05", "6.03", "6.07", "7.04", "9.06"],
  revision: "13 novembre 2026",

  /* Valeurs de l'exemple suivi d'un bout à l'autre de la page (bar relatifs). */
  valeurs: {
    bp: { enclenchement: 1.4, differentiel: 1.2, coupure: 0.2, rearmement: "auto", plage: [-0.2, 7.5], diffPlage: [0.7, 4], tourPlage: 0.7, tourDiff: 0.15 },
    hp: { coupure: 14, differentiel: 4, retour: 10, rearmement: "manuel", plage: [8, 32], tourPlage: 2.3 }
  },

  ecrans: [
    {
      id: "role",
      court: "À quoi il sert",
      titre: "Un interrupteur commandé par deux pressions",
      dessin: { type: "circuit", prises: "deux" },
      legende: "Le côté BP est raccordé à l’aspiration du compresseur, le côté HP à son refoulement.",
      texte: [
        "Un pressostat est un interrupteur commandé par une pression. Le combiné en réunit deux dans le même boîtier.",
        "Le côté BP (basse pression) surveille l’aspiration. Il arrête le compresseur quand la pression descend trop bas.",
        "Le côté HP (haute pression) surveille le refoulement. Il arrête le compresseur quand la pression monte trop haut.",
        "Chaque côté est relié au circuit par un tube fin, le capillaire. Ce tube transmet la pression jusqu’à l’appareil."
      ],
      narration: "Un pressostat est un interrupteur. Il bascule quand une pression atteint la valeur réglée. Le combiné en réunit deux dans un seul boîtier. Le côté basse pression est raccordé à l'aspiration du compresseur : il coupe si la pression descend trop bas. Le côté haute pression est raccordé au refoulement : il coupe si la pression monte trop haut. L'exemple de ce cours est un Danfoss K P quinze. Les pressostats des autres marques fonctionnent sur le même principe."
    },
    {
      id: "appareil",
      court: "L’appareil",
      titre: "Reconnaître l’appareil et lire sa plaque",
      dessin: { type: "face", reperes: true },
      legende: "Les vis se tournent par le dessus. Les valeurs réglées se lisent sur la plaque graduée.",
      reperes: [
        { n: 1, nom: "Vis de plage BP", role: "règle l’enclenchement du côté BP" },
        { n: 2, nom: "Vis de différentiel BP", role: "règle l’écart entre enclenchement et coupure" },
        { n: 3, nom: "Vis de plage HP", role: "règle la coupure du côté HP" },
        { n: 4, nom: "Plaque graduée", role: "affiche les valeurs réglées, en bar" },
        { n: 5, nom: "Bouton de réarmement", role: "referme le contact après une coupure HP" },
        { n: 6, nom: "Raccord BP", role: "reçoit la pression d’aspiration" },
        { n: 7, nom: "Raccord HP", role: "reçoit la pression de refoulement" },
        { n: 8, nom: "Entrée du câble", role: "passage des fils vers les bornes" }
      ],
      texte: [
        "Les mots gravés sur la plaque sont en anglais. CUT IN ou START : l’enclenchement. CUT OUT ou STOP : la coupure. DIFF : le différentiel. RESET : le réarmement. La suite du cours emploie les mots français.",
        "Les pressions de la plaque sont des pressions relatives : celles qu’affiche un manomètre."
      ],
      narration: "L'appareil est vu de face. Les vis de réglage sont sur le dessus : elles se tournent au tournevis. La plaque graduée affiche ce que vous avez réglé. Sous le boîtier, deux raccords : celui de la basse pression et celui de la haute pression. Les mots de la plaque sont en anglais. Ils sont traduits à l'écran, une fois pour toutes."
    },
    {
      id: "interieur",
      court: "Dedans",
      titre: "Ce qu’il y a dans le boîtier",
      dessin: { type: "coupe", cote: "combine", reperes: true },
      legende: "Chaque côté a son soufflet, sa tige, son ressort et son contact.",
      texte: [
        "Le soufflet est une capsule de métal plissée. La pression du circuit entre dedans par le raccord et l’allonge.",
        "En face, un ressort s’oppose à cette poussée. La vis de plage le comprime plus ou moins : elle fixe la pression à laquelle le contact bascule.",
        "Entre les deux, une tige transmet le mouvement à la bascule, qui ouvre ou ferme le contact.",
        "Le soufflet BP est large et son ressort est souple : il réagit à de faibles pressions. Le soufflet HP est petit et son ressort est raide : il ne bouge qu’à forte pression.",
        "Les deux contacts sont montés en série. Il suffit qu’un côté s’ouvre pour arrêter le compresseur."
      ],
      narration: "De chaque côté, on trouve un soufflet, une tige et un ressort. La pression du circuit entre dans le soufflet et l'allonge. Le ressort pousse dans l'autre sens. Tant que le ressort gagne, le contact ne change pas. Quand la pression gagne, la tige soulève le bras, la bascule claque et le contact change de position. Regardez la taille des pièces : soufflet large et ressort souple pour la basse pression, soufflet petit et ressort raide pour la haute pression."
    },
    {
      id: "cote-bp",
      court: "Côté BP",
      titre: "Côté BP : la pression baisse, le contact s’ouvre",
      dessin: { type: "coupe", cote: "bp", curseur: { min: -0.2, max: 3, pas: 0.05, depart: 2.2 } },
      legende: "Faites descendre la pression d’aspiration : à 0,2 bar, la bascule claque et le contact s’ouvre.",
      texte: [
        "Dans cet exemple, le côté BP coupe à 0,2 bar et réenclenche à 1,4 bar.",
        "Quand la pression baisse, le soufflet se raccourcit et le ressort repousse la tige. À 0,2 bar, la bascule change de position d’un coup : le contact s’ouvre, le compresseur s’arrête.",
        "Le compresseur attend que la pression soit remontée à 1,4 bar pour repartir. Cet écart de 1,2 bar est le différentiel. Sans lui, le compresseur démarrerait et s’arrêterait sans cesse.",
        "Ce côté est à réarmement automatique : le contact se referme seul."
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
      id: "cote-hp",
      court: "Côté HP",
      titre: "Côté HP : la pression monte, le contact s’ouvre et reste ouvert",
      dessin: { type: "coupe", cote: "hp", curseur: { min: 6, max: 18, pas: 0.1, depart: 9 }, bouton: true },
      legende: "Faites monter la pression de refoulement : à 14 bar, le contact s’ouvre. Il ne se referme qu’au bouton.",
      texte: [
        "Dans cet exemple, le côté HP coupe à 14 bar.",
        "Quand la pression monte, le petit soufflet HP pousse la tige contre son ressort raide. À 14 bar, la bascule claque : le contact s’ouvre, le compresseur s’arrête.",
        "Sur cette version, le côté HP est à réarmement manuel. La pression peut redescendre, le contact reste ouvert tant que personne n’a appuyé sur le bouton.",
        "Une haute pression trop élevée vient souvent d’un condenseur encrassé ou d’un ventilateur de condenseur en panne."
      ],
      messages: {
        marche: "Refoulement à {p} bar. Contact fermé : le compresseur peut tourner.",
        coupe: "Refoulement à {p} bar. Le contact vient de s’ouvrir : le compresseur s’arrête.",
        attente: "Refoulement à {p} bar. Contact ouvert. Le bouton n’aura d’effet qu’à 10 bar ou moins.",
        pret: "Refoulement à {p} bar. Contact ouvert. La pression est assez basse : le bouton aura un effet.",
        refus: "Le bouton revient sans effet : la pression est encore à {p} bar.",
        rearme: "Vous avez réarmé à {p} bar. Contact fermé : le compresseur peut repartir."
      },
      narration: "Faites monter la pression. Le petit soufflet pousse contre un ressort raide. À quatorze bar, la bascule claque et le compresseur s'arrête. Faites redescendre la pression : le contact reste ouvert. Sur cette version, il faut appuyer sur le bouton de réarmement. Essayez d'appuyer trop tôt, puis à dix bar."
    },
    {
      id: "rearmement",
      court: "Réarmement",
      titre: "Le bouton de réarmement manuel",
      dessin: { type: "face", accent: "bouton" },
      legende: "Le bouton est sur le dessus du boîtier. Il referme le contact HP, une fois la pression redescendue à 10 bar ou moins.",
      texte: [
        "Le bouton de réarmement se pousse avec le doigt, sur le dessus du boîtier. Sur cette version, il agit sur le côté HP. Sur d’autres versions, il agit sur le côté BP ou sur les deux.",
        "Il oblige quelqu’un à venir voir la machine après une coupure HP. Si le compresseur repartait seul, le défaut se répéterait sans que personne le remarque.",
        "L’appui n’a d’effet que si la pression est redescendue de 4 bar sous la coupure : 14 − 4 = 10 bar."
      ],
      encadre: { genre: "attention", texte: "On ne réarme pas sans avoir cherché la cause de la coupure et l’avoir corrigée : condenseur encrassé, ventilateur arrêté, air qui ne circule plus." },
      narration: "Le bouton de réarmement sert à refermer le contact après une coupure haute pression. Il a une raison d'être : une coupure haute pression doit être vue par quelqu'un. Avant d'appuyer, cherchez la cause. Regardez le condenseur, son ventilateur, le passage de l'air. Corrigez le défaut. Ensuite seulement, réarmez. Si la pression est encore trop haute, le bouton n'a aucun effet."
    },
    {
      id: "versions",
      court: "Les versions",
      titre: "Quatre versions, quatre façons de repartir",
      dessin: { type: "versions" },
      legende: "La version se lit sur l’étiquette de l’appareil. Ce cours suit la deuxième : BP automatique, HP manuel.",
      tableaux: [
        {
          titre: "Les versions du KP15",
          colonnes: ["Version", "Après une coupure BP", "Après une coupure HP"],
          lignes: [
            ["BP automatique, HP automatique", "Le contact se referme seul", "Le contact se referme seul"],
            ["BP automatique, HP manuel", "Le contact se referme seul", "Il faut appuyer sur le bouton"],
            ["BP manuel, HP manuel", "Il faut appuyer sur le bouton", "Il faut appuyer sur le bouton"],
            ["Convertible", "Automatique ou manuel, au choix", "Automatique ou manuel, au choix"]
          ],
          surligner: 1
        },
        {
          titre: "Ce que règle la vis de plage",
          colonnes: ["Côté et réarmement", "La vis de plage règle", "L’autre valeur se calcule"],
          lignes: [
            ["BP automatique", "l’enclenchement", "coupure = enclenchement − différentiel"],
            ["HP automatique", "la coupure", "enclenchement = coupure − différentiel"],
            ["BP manuel", "la coupure", "réarmement possible à : coupure + différentiel"],
            ["HP manuel", "la coupure", "réarmement possible à : coupure − différentiel"]
          ]
        }
      ],
      texte: [
        "Sur le convertible, un disque placé dans l’appareil choisit le réarmement de chaque côté, automatique ou manuel. Il sort d’usine en manuel des deux côtés.",
        "Avant de régler, lisez la référence sur l’étiquette et cherchez sa version dans la notice : la vis de plage ne règle pas la même valeur sur toutes."
      ],
      narration: "Le combiné existe en plusieurs versions. Elles diffèrent par la façon de repartir après une coupure : seul, ou après un appui sur le bouton. Ce cours suit la deuxième version : automatique en basse pression, manuelle en haute pression. Avant tout réglage, lisez la référence sur l'étiquette de votre appareil."
    },
    {
      id: "bornes",
      court: "Les bornes",
      titre: "Le contact et les bornes du KP15",
      dessin: { type: "bornes", etats: ["marche", "defaut-bp", "defaut-hp"] },
      legendes: {
        "marche": "En marche normale, le courant entre par A et sort par C vers la bobine du contacteur.",
        "defaut-bp": "Aspiration trop basse : le contact quitte C. Le compresseur s’arrête et la borne B alimente le voyant de défaut BP.",
        "defaut-hp": "Refoulement trop haut : le contact quitte C. Le compresseur s’arrête et la borne D alimente le voyant de défaut HP."
      },
      boutons: { "marche": "Marche normale", "defaut-bp": "Défaut BP", "defaut-hp": "Défaut HP" },
      texte: [
        "Ce repérage est celui du KP15 de Danfoss, dans sa version à deux signaux. Il ne vaut pas pour une autre marque.",
        "A : arrivée du courant. C : départ vers le compresseur. B : signal de défaut BP. D : signal de défaut HP. La borne de terre reçoit le fil vert et jaune.",
        "La borne C alimente la bobine du contacteur du compresseur. La notice permet aussi d’alimenter directement un moteur monophasé de 2 kW au plus.",
        "Les bornes B et D servent à allumer un voyant. La borne D ne supporte pas plus de 50 VA.",
        "Il existe aussi une version à un seul signal : elle a les bornes A, B et C, sans la borne D."
      ],
      encadre: { genre: "attention", texte: "Avant de câbler, coupez et consignez l’alimentation. Vérifiez ensuite le repérage sur le schéma de votre appareil." },
      narration: "Le courant arrive par la borne A. En marche normale, il ressort par la borne C et alimente la bobine du contacteur : le compresseur tourne. Sur un défaut basse pression, le contact quitte C et la borne B allume le voyant basse pression. Sur un défaut haute pression, c'est la borne D qui allume le voyant haute pression. Ce repérage est celui du Danfoss K P quinze. Sur une autre marque, lisez le schéma de l'appareil."
    },
    {
      id: "regler-bp",
      court: "Régler la BP",
      titre: "Régler le côté BP",
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
        "Les graduations donnent un préréglage. Le réglage se contrôle ensuite au manomètre, installation en marche."
      ],
      tableaux: [
        {
          titre: "Exemples de réglage BP (procédure d’atelier de l’auteur)",
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
      id: "regler-hp",
      court: "Régler la HP",
      titre: "Régler le côté HP",
      dessin: { type: "plaque", cote: "hp" },
      legende: "La vis de plage HP déplace l’index de coupure. Il n’y a pas de vis de différentiel de ce côté.",
      etapes: [
        "Affichez la coupure sur l’échelle HP : ici 14 bar.",
        "Le différentiel HP est fixe : 4 bar sur tous les KP15.",
        "Calculez la pression de réarmement : coupure − différentiel = 14 − 4 = 10 bar."
      ],
      calcul: { type: "hp", formule: "réarmement possible à : coupure − différentiel" },
      texte: [
        "Un tour de la vis de plage HP change la coupure d’environ 2,3 bar.",
        "La coupure HP dépend du fluide, du type de condenseur et du lieu. Pour un condenseur à air, une méthode courante part de la température maximale de l’air du lieu. On ajoute 10 °C pour le réchauffement de l’air dans le condenseur, puis 10 °C pour l’écart entre l’air et le fluide.",
        "Par exemple, 35 + 10 + 10 = 55 °C. Au R134a, 55 °C correspond à 13,9 bar au manomètre. On règle la coupure à 14 bar.",
        "La coupure choisie reste toujours en dessous de la pression maximale de service de l’installation."
      ],
      narration: "La vis de plage règle la coupure. Affichez quatorze bar. De ce côté, le différentiel ne se règle pas : il vaut quatre bar. Le réarmement devient donc possible à dix bar. La valeur de quatorze bar vient de la température la plus chaude du lieu, à laquelle on ajoute deux fois dix degrés. On lit ensuite la pression du fluide à cette température."
    },
    {
      id: "verifier",
      court: "Vérifier",
      titre: "Vérifier les réglages, installation en marche",
      dessin: { type: "circuit", prises: "deux", manometres: true, essai: true },
      legende: "La vanne de départ liquide fait baisser l’aspiration. Le ventilateur du condenseur arrêté fait monter le refoulement.",
      blocs: [
        {
          titre: "Côté BP",
          etapes: [
            "Branchez le manomètre BP.",
            "Fermez la vanne de départ liquide. La pression d’aspiration descend.",
            "Notez la pression au moment où le compresseur s’arrête : c’est la coupure.",
            "Rouvrez la vanne. Notez la pression au moment où le compresseur repart : c’est l’enclenchement.",
            "Si une valeur ne convient pas, retouchez la vis et recommencez."
          ]
        },
        {
          titre: "Côté HP",
          etapes: [
            "Branchez le manomètre HP.",
            "Arrêtez le ventilateur du condenseur, ou obturez le passage de l’air. La pression de refoulement monte.",
            "Notez la pression au moment où le compresseur s’arrête : c’est la coupure.",
            "Remettez le ventilateur en marche, ou retirez ce qui obturait l’air, et attendez que la pression baisse.",
            "Réarmez. Si la coupure ne convient pas, retouchez la vis et recommencez."
          ]
        }
      ],
      encadre: { genre: "attention", texte: "Pendant chaque essai, gardez le manomètre sous les yeux et la main près de l’arrêt du compresseur. Si la pression dépasse la valeur prévue et que le compresseur tourne encore, arrêtez-le vous-même. Remettez ensuite le ventilateur en marche ou rouvrez la vanne." },
      releves: {
        titre: "Tableau de relevés",
        consigne: "Faites trois essais de chaque côté et notez vos mesures. Le différentiel BP se calcule seul.",
        essais: 3
      },
      narration: "Le réglage se vérifie sur l'installation en marche, manomètres branchés. Pour la basse pression, fermez la vanne de départ liquide. L'aspiration descend. Notez la pression à l'arrêt du compresseur, puis rouvrez la vanne et notez la pression au redémarrage. Pour la haute pression, arrêtez le ventilateur du condenseur. Le refoulement monte. Notez la pression à l'arrêt, sans quitter le manomètre des yeux. Si le compresseur ne s'arrête pas à la valeur prévue, arrêtez-le vous-même. Remettez le ventilateur, laissez la pression baisser, puis réarmez."
    },
    {
      id: "essai-main",
      court: "Essai à la main",
      titre: "Essayer le contact à la main",
      dessin: { type: "coupe", cote: "combine", accent: "levier" },
      legende: "Le levier d’essai fait basculer le contact sans toucher aux réglages.",
      texte: [
        "Le levier d’essai est en haut du boîtier. Il fait basculer le contact à la main, sans outil et sans faire varier la pression.",
        "Il sert à contrôler le câblage. Quand vous le poussez, le contact entre A et C s’ouvre : le contacteur doit retomber et le voyant de défaut doit s’allumer.",
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
          titre: "Pressostats combinés HP/BP : ce que disent les notices",
          colonnes: ["Fabricant et série", "Côté BP", "Côté HP", "Réarmement", "Bornes"],
          lignes: [
            ["Danfoss KP15", "−0,2 à 7,5 bar, différentiel 0,7 à 4 bar", "8 à 32 bar, différentiel fixe 4 bar", "Automatique, manuel ou convertible selon la version", "A, B, C, D"],
            ["Ranco O17", "−0,2 à 7,5 bar, différentiel 0,7 à 4 bar", "8 à 32 bar, différentiel fixe 4 bar", "Automatique ou manuel selon le modèle", "A, B, C, D"],
            ["Johnson Controls Penn P78", "−0,5 à 7 bar, différentiel 0,6 à 3 bar", "3 à 30 bar, différentiel fixe 3 bar", "Automatique ou manuel selon le modèle", "A, B, C, D"],
            ["Alco (Copeland) PS2", "−0,5 à 7 bar, différentiel réglable", "6 à 31 bar, différentiel fixe", "Automatique, manuel ou convertible selon le modèle", "11, 12, 14 et 21, 22, 24"]
          ]
        }
      ],
      texte: [
        "Le Ranco O17 et le Penn P78 emploient les mêmes lettres que le KP15 : A pour l’arrivée, C vers le compresseur, B pour le signal BP, D pour le signal HP.",
        "L’Alco PS2 numérote ses bornes : 11, 12 et 14 pour un contact, 21, 22 et 24 pour l’autre.",
        "Tous ces appareils se règlent par une plage et un différentiel.",
        "Dans une même série, les plages changent d’un modèle à l’autre. Lisez l’étiquette de l’appareil posé et sa notice avant de régler ou de câbler."
      ],
      narration: "Le K P quinze n'est qu'un exemple. Ranco, Alco, Johnson Controls et d'autres fabriquent des pressostats du même type. Le principe ne change pas. Les plages changent d'un fabricant à l'autre, et parfois le repérage des bornes. Le tableau donne les correspondances relevées dans les notices des fabricants."
    }
  ],

  quiz: [
    {
      question: "Le côté BP est réglé avec un enclenchement de 2,0 bar et un différentiel de 1,5 bar. À quelle pression coupe-t-il ?",
      choix: ["0,5 bar", "1,5 bar", "3,5 bar"],
      bonne: 0,
      explication: "Côté BP automatique : coupure = enclenchement − différentiel = 2,0 − 1,5 = 0,5 bar.",
      code: "4.05",
      revoir: "regler-bp"
    },
    {
      question: "Le côté HP a coupé à 16 bar. Il est à réarmement manuel, avec un différentiel fixe de 4 bar. En dessous de quelle pression le bouton a-t-il un effet ?",
      choix: ["20 bar", "16 bar", "12 bar"],
      bonne: 2,
      explication: "Réarmement possible à : coupure − différentiel = 16 − 4 = 12 bar.",
      code: "4.05",
      revoir: "rearmement"
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
      question: "Sur le KP15 à deux signaux, quelle borne alimente la bobine du contacteur en marche normale ?",
      choix: ["La borne B", "La borne C", "La borne D"],
      bonne: 1,
      explication: "Le courant arrive par A et repart par C vers la bobine. B et D servent aux voyants de défaut.",
      code: "3.01",
      revoir: "bornes"
    },
    {
      question: "Pourquoi le soufflet HP est-il plus petit que le soufflet BP ?",
      choix: ["Parce qu’il travaille à des pressions plus fortes", "Parce qu’il reçoit moins de fluide", "Parce qu’il est placé plus loin du compresseur"],
      bonne: 0,
      explication: "Une forte pression pousse fort, même sur une petite surface. Le soufflet BP doit être large pour réagir à de faibles pressions.",
      code: "1.04",
      revoir: "interieur"
    },
    {
      question: "Pour vérifier la coupure BP sur une installation en marche, quel geste fait baisser la pression d’aspiration ?",
      choix: ["Arrêter le ventilateur du condenseur", "Fermer la vanne de départ liquide", "Ouvrir la porte de la chambre froide"],
      bonne: 1,
      explication: "Vanne de départ liquide fermée, l’évaporateur n’est plus alimenté : l’aspiration descend jusqu’à la coupure.",
      code: "4.05",
      revoir: "verifier"
    }
  ],

  sources: [
    { titre: "Danfoss, fiche de données « Pressure switch, Type KP » (AI213186439478en-001203, 2022.09)", usage: "plages, différentiels, versions, réarmement, pouvoir de coupure, pressions maximales" },
    { titre: "Danfoss, guide d’installation KP 15, KP 17 (AN211686434433en-000701, 2021.05)", usage: "bornes A, B, C, D, valeur d’un tour de vis, essai du contact, réarmement" },
    { titre: "Notices Ranco (O17), Johnson Controls (Penn P78) et Copeland (PS2)", usage: "plages, réarmement et bornes des autres fabricants" },
    { titre: "Procédures d’atelier de l’auteur : réglage du pressostat BP de sécurité, réglage du pressostat HP de sécurité", usage: "essai par la vanne de départ liquide, essai par le ventilateur du condenseur, exemples de réglage, choix de la coupure HP" }
  ]
};
