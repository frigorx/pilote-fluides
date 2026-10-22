/* =====================================================================
   jeux-mots.js — le vocabulaire : mots du métier, bon mot, anglais (J1 à J4)
   ---------------------------------------------------------------------
   RÔLE : la matière des quatre thèmes de vocabulaire, jouée par les
   moteurs memory.js (J1, J3) et trous.js (J2, J4). themes.js en dérive
   les thèmes (portes et codes du référentiel y sont posés).
   D'OÙ VIENT LE CONTENU — rien d'inventé :
     · J1 : les définitions de donnees/definitions.js (écrites d'après le
       livre HabFluide et les stations CuivRézo), RACCOURCIES à quelques
       mots pour tenir sur une carte ; le sectionneur vient de la
       banque ÉlectroRézo 3.2.
     · J2 : les mêmes définitions, les phrases de QUESTIONS_FLUIDES
       (themes.js), les séries « Peser la charge » et « Contrôler la tenue
       du vide » du jeu Le bon ordre ; le « côté refoulement / côté
       aspiration » vient des deux pressostats de definitions.js.
     · J3 : le LEXIQUE FRANCO-ANGLAIS de Franck, « traduction anglais.pdf »
       (fonds CAP : 02_CAP-IFCA/Froid-Frigorifique/), et le vocabulaire
       de la notice ALCO ci-dessous pour électrovanne, fluide frigorigène.
     · J4 : extraits mot pour mot de la notice ALCO CONTROLS (Emerson),
       « Operating Instructions, Solenoid Valve Series 110RB/200RB/240RA/
       540RA », document A6.5.057/03, 02/02/2004 (fonds de Franck :
       03_BAC-MFER/S1-Analyse/NL_IT_ES_DE_CZ_EN_SOL__65057.pdf). Les
       traductions françaises des explications sont écrites ici.
   FORMATS : J1/J3 = [mot ou terme, face B] ; J2/J4 = textes à trous
   (voir moteur/trous.js : {mot|explication}).
   PIÈGES : les faces B d'un Memory sont toutes différentes ; sur une carte
   de téléphone une face tient en 40 caractères au plus.
   ===================================================================== */
window.JR_JEUX_MOTS = {

  /* ---------- J1 — Les mots du métier : mot ↔ définition courte ---------- */
  metier: [
    ["compresseur", "aspire la vapeur BP, la refoule en HP"],
    ["condenseur", "la vapeur chaude y devient liquide"],
    ["évaporateur", "là où le froid se fabrique"],
    ["détendeur thermostatique", "baisse la pression, dose avec son bulbe"],
    ["filtre déshydrateur", "retient l'humidité et les impuretés"],
    ["séparateur d'huile", "renvoie l'huile au carter"],
    ["vacuomètre", "lit le vide, pompe arrêtée"],
    ["balance de charge", "pèse avant, pèse après"],
    ["dudgeonnière", "évase le bout du tube"],
    ["coupe-tube", "coupe net, sans copeaux"],
    ["mano-détendeur", "règle la pression de l'azote"],
    ["sectionneur", "sépare l'installation du réseau"]
  ],

  /* ---------- J2 — Le bon mot : replacer le mot qui manque ---------- */
  bonMot: [
    { titre: "Les quatre organes du circuit",
      texte: "Le {compresseur|il aspire la vapeur basse pression et la refoule à haute pression} met le fluide en mouvement. La vapeur chaude cède sa chaleur à l'air dans le {condenseur|c'est là que la vapeur devient liquide}. Le {détendeur|il abaisse la pression du liquide avant l'évaporateur} baisse la pression du liquide. Dans l'{évaporateur|le liquide s'y évapore en prenant la chaleur de l'air de la chambre : c'est là que le froid se fabrique}, le liquide s'évapore et le froid se fabrique.",
      leurres: ["séparateur", "voyant"] },
    { titre: "La ligne liquide",
      texte: "Sur la ligne liquide, le {filtre déshydrateur|il retient l'humidité et les impuretés avant qu'elles n'atteignent le détendeur} retient l'humidité. Le {voyant|une fenêtre sur la ligne liquide : on y observe le fluide qui passe, les bulles et la pastille d'humidité} permet de regarder passer le fluide. Une {électrovanne|une vanne ouverte ou fermée par une bobine : elle coupe la ligne liquide à l'arrêt} coupe la ligne liquide à l'arrêt.",
      leurres: ["pressostat", "capillaire"] },
    { titre: "Deux noms pour la même pression",
      texte: "La haute pression s'appelle aussi la pression de {refoulement|le compresseur refoule la vapeur à haute pression ; le pressostat HP surveille cette pression}. La basse pression s'appelle aussi la pression d'{aspiration|le compresseur aspire la vapeur à basse pression ; le pressostat BP surveille cette pression}. Le séparateur d'huile se monte côté {refoulement|il récupère l'huile entraînée au refoulement du compresseur}.",
      leurres: ["détente", "charge"] },
    { titre: "Tirer au vide",
      texte: "Une {pompe à vide|elle extrait l'air et l'humidité du circuit avant la charge} extrait l'air et l'humidité avant la charge. On lit le vide au {vacuomètre|c'est lui qui lit le vide poussé ; le manomètre du manifold ne suffit pas}, circuit isolé et pompe arrêtée. Si le vide remonte, on soupçonne d'abord une {fuite|une remontée signale d'abord une fuite ; elle peut aussi venir d'une humidité résiduelle}.",
      leurres: ["surcharge", "balance"] },
    { titre: "Peser la charge",
      texte: "On pèse la bouteille {avant|on note la masse de la bouteille avant de charger} et {après|on note la masse de la bouteille après avoir chargé}. La {différence|la soustraction donne la charge introduite} entre les deux pesées est la charge introduite. La {balance|elle dit combien de fluide est passé} dit combien ; le {manomètre|il dit comment la machine se comporte} dit comment la machine se comporte.",
      leurres: ["somme", "vacuomètre"] },
    { titre: "L'huile et le liquide",
      texte: "Au refoulement du compresseur, le {séparateur d'huile|il récupère l'huile entraînée par le fluide et la renvoie au carter} renvoie l'huile au carter. Sur l'aspiration, la {bouteille anti-coup de liquide|elle retient le liquide qui arriverait au compresseur} retient le liquide : un piston ne comprime pas un liquide.",
      leurres: ["réservoir de liquide", "filtre déshydrateur"] }
  ],

  /* ---------- J3 — English for the fridge : français ↔ anglais ---------- */
  anglais: [
    ["compresseur", "compressor"],
    ["ventilateur", "fan"],
    ["vide", "vacuum"],
    ["surchauffe", "superheat"],
    ["réservoir à liquide", "liquid receiver"],
    ["pression d'aspiration", "suction pressure"],
    ["pression de refoulement", "head pressure"],
    ["groupe de condensation", "condensing unit"],
    ["serrer", "to tighten"],
    ["desserrer", "to loosen"],
    ["électrovanne", "solenoid valve"],
    ["fluide frigorigène", "refrigerant"]
  ],

  /* ---------- J4 — Read it in English : extraits de la notice ALCO ---------- */
  notice: [
    { titre: "Safety instructions",
      texte: "Read installation instructions {thoroughly|thoroughly = à fond, attentivement : la notice se lit en entier avant de commencer}. Before any service {disconnect|to disconnect = débrancher, couper : avant toute intervention, on coupe l'alimentation de la bobine} power supply from coil. Do not {release|to release = relâcher, laisser échapper : on ne laisse jamais le fluide partir à l'air libre} any refrigerant into the atmosphere.",
      leurres: ["connect", "quickly"],
      fr: "Lisez la notice d'installation à fond. Avant toute intervention, coupez l'alimentation de la bobine. Ne relâchez aucun fluide frigorigène dans l'atmosphère." },
    { titre: "Before brazing",
      texte: "Before brazing {clean|to clean = nettoyer : on nettoie les tubes avant de braser} tubing. Direct {flame|flame = flamme : on l'éloigne du corps de la vanne} away from valve body. Use an inert gas such as {nitrogen|nitrogen = azote : un gaz inerte passe dans la vanne pour éviter la formation d'oxyde de cuivre} to pass through the valve to prevent copper oxide formation. Never use {oxygen|oxygen = oxygène : jamais d'oxygène, ni de gaz inflammable} or flammable gases.",
      leurres: ["hammer", "water"],
      fr: "Avant de braser, nettoyez les tubes. Dirigez la flamme loin du corps de la vanne. Utilisez un gaz inerte, comme l'azote, qui passe dans la vanne pour éviter la formation d'oxyde de cuivre. N'utilisez jamais d'oxygène ni de gaz inflammables." },
    { titre: "Mounting the valve",
      texte: "Direction of flow must match {arrow|arrow = flèche : le sens du fluide suit la flèche gravée sur le corps de la vanne} on body. Allow sufficient {clearance|clearance = dégagement, place libre : on laisse de la place au-dessus de la vanne pour retirer la bobine} above the valve for removal of coil. Valves may be mounted in {horizontal|horizontal = horizontal : la vanne se monte sur une ligne horizontale ou verticale} or vertical lines. Up-side down position is not {allowed|allowed = autorisé : la vanne ne se monte jamais à l'envers, elle risquerait de mal fonctionner}.",
      leurres: ["coil", "lever"],
      fr: "Le sens du fluide doit suivre la flèche du corps de la vanne. Laissez assez de place au-dessus de la vanne pour retirer la bobine. La vanne peut être montée sur une ligne horizontale ou verticale. La position à l'envers n'est pas autorisée." },
    { titre: "Service",
      texte: "Before any service {shut|shut down = arrêter : on arrête l'installation et on la débranche de la source d'énergie} down system and disconnect from power source. Fully {depressurize|to depressurize = mettre hors pression : on ne démonte jamais une vanne sous pression} valve. After reducing pressure to {atmospheric|atmospheric = atmosphérique : la vanne ne s'ouvre qu'une fois la pression redescendue à celle de l'air} the valve may be opened and internal parts removed and replaced. {Clean|to clean = nettoyer : on nettoie les pièces avant de les remonter} parts before re-installation.",
      leurres: ["pressurize", "weigh"],
      fr: "Avant toute intervention, arrêtez l'installation et débranchez-la de la source d'énergie. Mettez la vanne complètement hors pression. Une fois la pression ramenée à la pression atmosphérique, la vanne peut être ouverte et ses pièces internes retirées et remplacées. Nettoyez les pièces avant de les remonter." },
    { titre: "Warnings",
      texte: "WARNING: Do not use a solenoid valve as a safety {shut-off|shut-off = d'arrêt : une électrovanne n'est pas une vanne d'arrêt de sécurité} valve or for service purpose. WARNING: Do not {energize|to energize = mettre sous tension : jamais la bobine sous tension si elle n'est pas montée sur la vanne} coil unless it is {attached|attached = fixée, montée : la bobine doit être en place sur la vanne} to the valve.",
      leurres: ["remove", "open"],
      fr: "ATTENTION : n'utilisez pas une électrovanne comme vanne d'arrêt de sécurité ni pour une intervention. ATTENTION : ne mettez pas la bobine sous tension si elle n'est pas fixée à la vanne." }
  ],
  noticeSource: "Extrait de la notice ALCO CONTROLS (Emerson), Operating Instructions, Solenoid Valve Series 110RB/200RB/240RA/540RA (2004)."
};
