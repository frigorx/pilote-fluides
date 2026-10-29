/* ÉlectroRézo 9.2 — Repérer C, S, R à l'ohmmètre.
   Modèle « geste de métier » : on apprend la méthode des trois mesures, puis deux défauts
   (enroulement coupé, enroulement à la masse), tout hors tension.
   Aucune valeur n'est inventée : l'exemple résolu est celui du cours (11, 3, 14 Ω) ; les
   autres valeurs des exercices sont des relevés fictifs dont la somme est exacte.
   Sources : voir SOURCES.md. */

/* Trois écrans d'ohmmètre côte à côte : une ligne par paire de bornes. */
function troisMesures92(lignes) {
  const d = document.createElement('div');
  d.style.cssText = 'display:flex;flex-wrap:wrap;gap:.6rem;align-items:flex-start';
  lignes.forEach(([note, valeur]) => d.appendChild(SchemasPratique.afficheur({
    photo: 'assets/biblio/multimetre-et-ses-sondes.png', appareil: 'Multimètre', position: 'ohmmètre, calibre 200 Ω',
    valeur: valeur, unite: 'Ω', note: note })));
  return d;
}

ModelePratique.construire({
  id: '9.2', ligne: 9,
  vue3d: { modele: 'compresseurHermetique', mode: 'comprendre' },   /* 3D */
  kicker: 'ÉlectroRézo · Ligne 9 Le moteur monophasé · Station 2',
  titre: "Repérer C, S, R à l’ohmmètre",
  narration: NARRATION,

  prerequis: [
    { id: '9.1', quoi: "les trois bornes du compresseur et ses montages" },
    { id: '1.9', quoi: "mesurer" }
  ],

  codes: {
    referentiel: 'CAP IFCA — référentiel de certification',
    lignes: [
      ['Compétence', 'C3.7', "Contrôler la mise en œuvre des équipements électriques et fluidiques"],
      ['Compétence', 'C4.5', "Mesurer, comparer des grandeurs"],
      ['Tâche', 'T11', "Contrôler les circuits hors fonctionnement"],
      ['Savoir', 'S5.6', "Réseaux, matériels électriques et de régulation"],
      ['Savoir', 'S6.2', "Principaux risques et moyens de prévention"]
    ],
    note: 'Le lien précis entre une tâche et une compétence n’est pas tabulé au référentiel : les tâches sont rattachées par leur activité (Installation).'
  },

  photos: [
    { src: 'assets/biblio/mesure-continuite-enroulement.jpeg',
      alt: "Un multimètre jaune en position ohmmètre, dont les deux pointes touchent la connexion d’un enroulement de moteur.",
      titre: "Hors tension, on mesure.", sous: "Les pointes de l’ohmmètre sur deux bornes : l’écran donne la résistance de l’enroulement entre elles." },
    { src: 'assets/trois-bornes.svg',
      alt: "Schéma d’un compresseur monophasé : la borne C en haut, deux enroulements en dessous. À gauche l’enroulement principal, qui mène à la borne R. À droite l’enroulement auxiliaire, qui mène à la borne S.",
      titre: "Trois bornes, deux enroulements.", sous: "C est le commun. Le principal va à R, l’auxiliaire va à S. Trois mesures retrouvent chaque borne." }
  ],
  creditPhoto: 'Photographie : base de connaissances inerWeb, document de cours. Schéma construit dans QElectroTech. Détail dans « Crédits ».',

  question: "Les trois bornes d’un compresseur monophasé ne portent aucun repère lisible. Comment savoir laquelle est C, laquelle est R, laquelle est S ?",
  aQuoiCaSert: "Brancher chaque fil sur la bonne borne. Si on inverse l’enroulement principal et l’enroulement auxiliaire au câblage, le moteur grille en général peu après la mise sous tension. Trois mesures à l’ohmmètre retrouvent les bornes, et les mêmes mesures montrent un enroulement coupé ou à la masse.",
  ouOnLeTrouve: "Sur le bornier d’un compresseur hermétique monophasé, au plateau technique ou chez le client : avant de brancher un compresseur, et pour contrôler ses enroulements quand il ne démarre pas.",

  /* ---------------------------------------------------------------- temps 2 */
  scene: () => SchemasPratique.echelle({
    etapes: [
      { nom: 'Hors tension, fils débranchés', quand: 'Avant toute mesure.',
        outil: 'le sectionneur ouvert, un blocage mécanique et une pancarte, un vérificateur d’absence de tension',
        geste: 'Consignation, dans l’ordre : ' + ModelePratique.consignationEnUneLigne() + ' (la dernière opération seulement si elle est prescrite ; carte « Avant de toucher », au temps 3). Ensuite, débranchez les fils des bornes du compresseur : on mesure fils débranchés.',
        verifie: 'que vous pouvez toucher les bornes sans risque, et que rien d’autre n’est relié au compresseur.',
        neVerifiePas: 'l’état des enroulements : les mesures viennent après.' },
      { nom: 'L’ohmmètre, petit calibre', photo: 'assets/biblio/multimetre-et-ses-sondes.png', alt: 'Un multimètre et ses deux pointes.', quand: 'Une fois les fils débranchés.',
        outil: 'un multimètre en ohmmètre (station 1.9)',
        geste: 'Placez le sélecteur sur un petit calibre, par exemple 200 Ω. Ces enroulements font au plus quelques dizaines d’ohms : un petit calibre donne une lecture précise.',
        verifie: 'que l’écran pourra afficher la valeur d’un enroulement.' },
      { nom: 'Les trois mesures', photo: 'assets/biblio/mesure-continuite-enroulement.jpeg', alt: 'Un multimètre en ohmmètre, pointes sur un enroulement.', quand: 'Fils débranchés, sur les trois bornes.',
        outil: 'l’ohmmètre et ses deux pointes',
        geste: 'Numérotez les bornes 1, 2, 3 si elles n’ont aucun repère. Posez les pointes sur 1 et 2, et notez la valeur. Faites de même entre 1 et 3, puis entre 2 et 3. Trois paires de bornes, trois valeurs. Si l’écran affiche OL à la place d’une valeur, un enroulement est coupé.',
        verifie: 'la résistance de chaque paire de bornes.',
        neVerifiePas: 'quelle borne est C : pour cela, il faut comparer les trois valeurs (étapes suivantes).' },
      { nom: 'La plus forte donne C', quand: 'Une fois les trois valeurs notées.',
        outil: 'vos trois valeurs',
        geste: 'Cherchez la valeur la plus forte : elle est entre S et R. La borne qui reste est C. Exemple du cours : 14 Ω entre 2 et 3, donc la borne 1 est C.',
        verifie: 'quelle borne est C.',
        neVerifiePas: 'laquelle est R et laquelle est S.' },
      { nom: 'La plus faible donne R', quand: 'Une fois C trouvée.',
        outil: 'vos trois valeurs',
        geste: 'Parmi les deux valeurs qui restent, prenez la plus faible : c’est l’enroulement principal, entre C et R. Exemple : 3 Ω entre 1 et 3, donc la borne 3 est R. La borne qui reste est S : ici, la 2, avec 11 Ω entre 1 et 2. L’auxiliaire est en fil plus fin : sa résistance est plus élevée.',
        verifie: 'quelle borne est R (le principal) et quelle borne est S (l’auxiliaire).',
        neVerifiePas: 'que vos mesures sont justes : c’est l’étape suivante.' },
      { nom: 'Contrôler la somme', quand: 'Une fois C, R et S trouvées.',
        outil: 'vos trois valeurs, et le calcul',
        geste: 'Additionnez la valeur de C à S et la valeur de C à R. Vous retrouvez la valeur de S à R. Exemple : 11 + 3 = 14.',
        verifie: 'que les trois valeurs et le repérage vont ensemble.',
        neVerifiePas: 'qu’aucun enroulement ne touche la carcasse : c’est l’étape suivante.',
        attention: 'si la somme ne tombe pas juste, refaites les trois mesures. En cas de court-circuit entre enroulements, la valeur de S à R ne correspond plus à la somme (cours « Moteurs monophasés »).' },
      { nom: 'Chaque borne contre la carcasse', quand: 'Après le repérage, toujours hors tension.',
        outil: 'l’ohmmètre, sur le plus fort calibre',
        geste: 'Une pointe sur une borne, l’autre sur la carcasse. Grattez la peinture pour un bon contact. Faites-le pour chaque borne. On doit lire l’infini. Zéro ohm ou presque : masse franche, un enroulement touche la carcasse.',
        verifie: 'qu’aucun enroulement ne touche franchement la carcasse.',
        neVerifiePas: 'une masse peu franche : elle peut échapper à l’ohmmètre.',
        attention: 'une masse peu franche peut faire déclencher le différentiel sous tension alors que l’ohmmètre lit l’infini. Il faut alors un contrôleur d’isolement, qui applique 500 V continu ; la limite à respecter est celle de la notice ou de la fiche. Jamais de contrôleur d’isolement sur un compresseur sous vide (notices Maneurop, Tandem).' }
    ]
  }),

  technologie: [
    ["Les trois bornes", "C est le commun, R la marche (l’enroulement principal), S le démarrage (l’enroulement auxiliaire). Les cours français écrivent aussi C, P et A. Sur un relais, P/M désigne le principal, A/S l’auxiliaire, et L la ligne."],
    ["Deux enroulements, deux résistances", "l’auxiliaire est en fil plus fin que le principal : sa résistance est plus élevée. Ces enroulements font au plus quelques dizaines d’ohms, d’où le petit calibre."],
    ["Avant de mesurer", "lisez la plaque signalétique et regardez dans le couvercle du bornier : le schéma de raccordement s’y trouve souvent. Les trois mesures servent quand les bornes ne sont pas repérées."],
    ["Pourquoi tant de soin", "si on inverse le principal et l’auxiliaire au câblage, le moteur grille en général peu après la mise sous tension."],
    ["Un enroulement coupé", "l’ohmmètre indique une résistance très grande, l’infini, au lieu de la valeur normale. L’écran affiche OL."],
    ["Un enroulement à la masse", "on mesure entre chaque borne et la carcasse, au plus fort calibre. On doit lire l’infini. Zéro ohm ou presque veut dire une masse franche."]
  ],

  variantes: [
    "<strong>Bornes repérées</strong> : lisez la plaque signalétique et le schéma de raccordement sous le couvercle du bornier.",
    "<strong>Bornes sans lettre</strong> : numérotez-les 1, 2, 3 et faites les trois mesures.",
    "<strong>Un relais ou un autre cours</strong> : les lettres changent. C, P et A pour le compresseur ; P/M, A/S et L sur un relais.",
    "<strong>Un moteur triphasé</strong> donnerait trois résistances identiques. Un compresseur monophasé donne trois valeurs différentes.",
    "<strong>Une masse peu franche</strong> : l’ohmmètre ne la voit pas toujours. On utilise alors un contrôleur d’isolement."
  ],

  /* ---------------------------------------------------------------- temps 3 */
  titres: { objet: 'Sur le compresseur', dedans: 'La méthode des trois mesures', variantes: 'Selon la situation', symboles: 'Les symboles de la mesure', plan: 'Le lire sur un plan', methode: 'La méthode, dans l’ordre' },

  exercices: {
    titre: 'Repérer et contrôler',
    consigne: 'Dix questions, sans note. Les relevés sont ceux de compresseurs fictifs, hors tension, fils débranchés. Les premières questions disent où regarder et comment faire ; les dernières, non. La première est déjà résolue : imitez-la.',
    items: [
      { mode: 'exemple',
        enonce: "Exemple du cours. Bornes repérées 1, 2, 3. Entre 1 et 2, l’écran affiche 11 Ω. Entre 1 et 3, 3 Ω. Entre 3 et 2, 14 Ω. Quelles bornes sont C, R et S ?",
        figure: () => troisMesures92([['pointes sur 1 et 2', '11'], ['pointes sur 1 et 3', '3'], ['pointes sur 3 et 2', '14']]),
        ou: "sur les trois écrans, le nombre ; sous chaque écran, les deux bornes mesurées.",
        comment: "cherchez la valeur la plus forte : elle est entre S et R, la borne qui reste est C. Puis, entre les deux autres valeurs, la plus faible est l’enroulement principal : sa borne est R. La dernière borne est S. Contrôlez : C-S plus C-R doit donner S-R.",
        resolu: "La plus forte valeur est 14 Ω, entre 2 et 3 : la borne qui reste, 1, est C. La plus faible des deux autres est 3 Ω, entre 1 et 3 : le principal, donc 3 est R. Il reste la borne 2 : c’est S. Contrôle : 11 + 3 = 14, c’est bien la valeur entre S et R." },

      { mode: 'guide',
        enonce: "Un autre compresseur, bornes repérées 1, 2, 3. Entre 1 et 2, l’écran affiche 13 Ω. Entre 1 et 3, 9 Ω. Entre 2 et 3, 4 Ω. Quelle borne est C ?",
        figure: () => troisMesures92([['pointes sur 1 et 2', '13'], ['pointes sur 1 et 3', '9'], ['pointes sur 2 et 3', '4']]),
        ou: "sur les trois écrans : le nombre, et sous l’écran les deux bornes mesurées.",
        comment: "trouvez la valeur la plus forte : elle est entre S et R. La borne qui n’est pas dans cette paire est C. Faites comme dans l’exemple.",
        choix: [
          { texte: "La borne 1.", pourquoi: "La borne 1 fait partie de la paire de la valeur la plus forte, 13 Ω, entre 1 et 2. Cette paire est S et R, pas C." },
          { texte: "La borne 3.", juste: true },
          { texte: "La borne 2.", pourquoi: "La borne 2 fait partie de la paire de la valeur la plus forte, 13 Ω, entre 1 et 2. Cette paire est S et R, pas C." },
          { texte: "Impossible à dire sans le schéma du constructeur.", pourquoi: "Les trois mesures suffisent : la plus forte valeur désigne S et R, la borne qui reste est C." } ],
        confirmation: "La plus forte valeur, 13 Ω, est entre 1 et 2 : la borne qui reste, 3, est C." },

      { mode: 'guide',
        enonce: "Même compresseur : la borne 3 est C. Entre 1 et 3, vous avez lu 9 Ω. Entre 2 et 3, 4 Ω. Quelle borne est R, l’enroulement principal ?",
        ou: "dans l’énoncé : les deux valeurs qui touchent C, c’est-à-dire les paires 1 et 3, puis 2 et 3.",
        comment: "comparez les deux valeurs. L’auxiliaire est en fil plus fin : sa résistance est plus élevée. Le principal a donc la plus faible des deux. Sa borne est R.",
        choix: [
          { texte: "La borne 1.", pourquoi: "9 Ω est la plus forte des deux valeurs : c’est l’auxiliaire, donc la borne 1 est S." },
          { texte: "La borne 2.", juste: true },
          { texte: "La borne 3.", pourquoi: "La borne 3 est C, trouvée à la question précédente. R est une autre borne." },
          { texte: "Impossible à dire.", pourquoi: "On peut : le principal a la plus faible résistance des deux." } ],
        confirmation: "4 Ω est la plus faible des deux : le principal, entre C et R. La borne 2 est R, et la borne 1 est S." },

      { mode: 'guide',
        enonce: "Même compresseur : C est la borne 3, R la borne 2, S la borne 1. Vous avez lu 9 Ω entre C et S, et 4 Ω entre C et R. Que donne la somme, et avec quelle mesure doit-elle s’accorder ?",
        ou: "dans l’énoncé : les deux valeurs qui touchent C. La mesure de comparaison est celle de la question 2, entre 1 et 2.",
        comment: "additionnez les deux valeurs qui touchent C. Le résultat doit être égal à la valeur lue entre S et R. Si la somme ne tombe pas juste, refaites les trois mesures. Si l’écart reste, pensez à un court-circuit entre enroulements : les deux enroulements se touchent, et la valeur entre S et R ne correspond plus à la somme (étape 6 du temps 2).",
        choix: [
          { texte: "5 Ω : c’est la différence de 9 et 4.", pourquoi: "On additionne les deux enroulements, on ne les soustrait pas." },
          { texte: "9 Ω : c’est la valeur entre C et S.", pourquoi: "9 Ω contient seulement l’auxiliaire. On ajoute aussi le principal." },
          { texte: "36 Ω : c’est le produit de 9 et 4.", pourquoi: "On additionne les résistances des deux enroulements, on ne les multiplie pas." },
          { texte: "13 Ω : 9 plus 4, c’est la valeur lue entre 1 et 2, entre S et R.", juste: true } ],
        confirmation: "9 + 4 = 13 Ω, la valeur lue entre S et R : le repérage est bon." },

      { mode: 'guide',
        enonce: "Vous voulez savoir si l’enroulement principal conduit. Fils débranchés, ohmmètre sur le calibre 200 Ω, pointes sur C et R. L’écran affiche OL. Que concluez-vous ?",
        figure: () => SchemasPratique.afficheur({ photo: 'assets/biblio/multimetre-et-ses-sondes.png', appareil: 'Multimètre', position: 'ohmmètre, calibre 200 Ω', valeur: 'OL', unite: '', note: 'pointes sur C et R' }),
        ou: "sur l’écran : la valeur affichée, ici OL.",
        comment: "OL veut dire que l’ohmmètre lit une résistance très grande, l’infini. Un enroulement en bon état fait au plus quelques dizaines d’ohms.",
        choix: [
          { texte: "L’enroulement principal est en bon état : OL est une bonne valeur.", pourquoi: "OL veut dire l’infini. Un enroulement en bon état affiche quelques ohms." },
          { texte: "L’enroulement principal est coupé.", juste: true },
          { texte: "L’enroulement principal est à la masse.", pourquoi: "Une masse se cherche entre une borne et la carcasse. Entre deux bornes, on mesure un enroulement." },
          { texte: "Je remets sous tension pour vérifier.", pourquoi: "Jamais : toutes ces mesures se font hors tension, après consignation." } ],
        confirmation: "OL entre C et R : l’enroulement principal est coupé. Un enroulement coupé indique l’infini à la place de sa valeur normale." },

      { mode: 'guide',
        enonce: "Vous cherchez une masse. Ohmmètre sur le plus fort calibre, une pointe sur la borne S, l’autre sur la carcasse dont vous avez gratté la peinture. L’écran affiche 0,00 MΩ. Que concluez-vous ?",
        figure: () => SchemasPratique.afficheur({ photo: 'assets/biblio/multimetre-et-ses-sondes.png', appareil: 'Multimètre', position: 'ohmmètre, plus fort calibre', valeur: '0,00', unite: 'MΩ', note: 'pointes sur S et la carcasse' }),
        ou: "sur l’écran : le nombre et son unité. Sur ce calibre, l’appareil compte en mégohms (MΩ : un million d’ohms). 0,00 MΩ veut dire presque rien ; l’infini s’afficherait OL.",
        comment: "entre une borne et la carcasse, on doit lire l’infini. Zéro ohm ou presque veut dire que le courant de mesure passe : un enroulement touche la carcasse.",
        choix: [
          { texte: "Le compresseur est en bon état : presque zéro, c’est la valeur parfaite.", pourquoi: "C’est le raisonnement d’une continuité. Entre une borne et la carcasse, c’est l’infini qu’on veut." },
          { texte: "L’enroulement est coupé.", pourquoi: "Un enroulement coupé se lit entre ses deux bornes, et il donne l’infini. Ici, une pointe est sur la carcasse." },
          { texte: "Masse franche : un enroulement touche la carcasse.", juste: true },
          { texte: "Je ne conclus rien avant d’avoir mesuré les deux autres bornes.", pourquoi: "La mesure sur S dit déjà qu’il y a une masse. Les autres bornes se mesurent aussi, mais ce défaut est trouvé." } ],
        confirmation: "0,00 MΩ entre S et la carcasse : zéro ou presque, c’est une masse franche. Le compresseur a un enroulement à la masse." },

      { mode: 'seul',
        enonce: "Un troisième compresseur, bornes repérées 1, 2, 3. Entre 1 et 2, l’écran affiche 6 Ω. Entre 1 et 3, 15 Ω. Entre 2 et 3, 9 Ω. Quelle borne est S ?",
        figure: () => troisMesures92([['pointes sur 1 et 2', '6'], ['pointes sur 1 et 3', '15'], ['pointes sur 2 et 3', '9']]),
        methodeVue: "Revoyez les étapes 4 et 5 du temps 2 : la plus forte valeur donne C, la plus faible des deux autres donne R.",
        choix: [
          { texte: "La borne 1.", pourquoi: "La borne 1 est R : C est la borne 2 (la plus forte valeur, 15 Ω, est entre 1 et 3), et la plus faible valeur qui touche C, 6 Ω, est entre 1 et 2." },
          { texte: "La borne 2.", pourquoi: "La borne 2 est C : la plus forte valeur, 15 Ω, est entre 1 et 3, et la borne qui reste est la 2." },
          { texte: "La borne 3.", juste: true },
          { texte: "Impossible à dire sans le schéma du constructeur.", pourquoi: "Les trois mesures suffisent, comme dans l’exemple." } ],
        confirmation: "C est la borne 2 (15 Ω est entre 1 et 3). R est la borne 1 (6 Ω entre 1 et 2). S est la borne 3. Contrôle : 6 + 9 = 15." },

      { mode: 'seul',
        enonce: "Un quatrième compresseur, bornes repérées 1, 2, 3. Entre 1 et 2, 5 Ω. Entre 1 et 3, 8 Ω. Entre 2 et 3, 20 Ω. Vous trouvez C = 1, R = 2, S = 3, puis vous contrôlez la somme. Que faites-vous ?",
        methodeVue: "Revoyez la question 4 et l’étape 6 du temps 2 : ce que l’on fait quand la somme ne tombe pas juste.",
        choix: [
          { texte: "Je garde C = 1, R = 2, S = 3 : l’ordre des valeurs suffit.", pourquoi: "Le contrôle de la somme sert à repérer une erreur de mesure ou un défaut. Il ne faut pas l’ignorer." },
          { texte: "Je refais les trois mesures. Si l’écart reste, je pense à un court-circuit entre enroulements.", juste: true },
          { texte: "Je remplace le compresseur.", pourquoi: "Rien ne prouve encore qu’il est en cause : 5 + 8 = 13, et on lit 20. On refait d’abord les mesures." },
          { texte: "Je prends la plus forte valeur comme somme et je continue.", pourquoi: "La somme de C-S et C-R doit retrouver la valeur de S-R. Si elle ne la retrouve pas, une mesure ou le repérage est faux." } ],
        confirmation: "5 + 8 = 13 et on lit 20 : la somme ne tombe pas juste. On refait les mesures ; si l’écart reste, un court-circuit entre enroulements est possible." },

      { mode: 'seul',
        enonce: "Remettez les gestes dans l’ordre : touchez les six étiquettes l’une après l’autre.",
        methodeVue: "Revoyez la ligne des étapes du temps 2 : du repérage aux défauts.",
        elements: ["Consigner et débrancher les fils", "Mettre l’ohmmètre sur un petit calibre", "Mesurer les trois paires de bornes", "Trouver C, puis R et S", "Contrôler la somme", "Mesurer chaque borne contre la carcasse, au plus fort calibre"],
        melange: [3, 0, 5, 2, 4, 1],
        pasJuste: ["Oui : on commence hors tension, fils débranchés.", "Oui : un petit calibre, pour des enroulements de quelques dizaines d’ohms.", "Oui : trois paires de bornes, trois valeurs.", "Oui : la plus forte donne C, la plus faible donne R, l’autre est S.", "Oui : la somme contrôle le repérage.", "Oui : le dernier geste, la recherche d’une masse."],
        pasFaux: ["Pas celui-là : qu’est-ce qui vient avant toute mesure ?", "Pas celui-là : que règle-t-on avant de poser les pointes ?", "Pas celui-là : que fait-on avant de comparer les valeurs ?", "Pas celui-là : une fois les trois valeurs lues, que cherche-t-on ?", "Pas celui-là : que fait-on une fois C, R et S trouvées ?", "Pas celui-là : que fait-on en dernier, après le repérage ?"],
        confirmation: "Hors tension et fils débranchés, petit calibre, trois mesures, C puis R et S, contrôle de la somme, puis chaque borne contre la carcasse." },

      { mode: 'seul',
        enonce: "Le circuit frigorifique n’est pas sous vide (il n’a pas été tiré au vide, il est chargé). Entre chaque borne et la carcasse, l’ohmmètre lit l’infini. Pourtant, sous tension, le différentiel déclenche : c’est l’appareil du tableau qui coupe quand du courant fuit vers la terre (station 4.5). Que faites-vous ?",
        methodeVue: "Revoyez l’étape 7 du temps 2, et le message « Attention » qui l’accompagne.",
        choix: [
          { texte: "Je recommence la mesure à l’ohmmètre sur un autre calibre.", pourquoi: "Une masse peu franche peut échapper à l’ohmmètre : il faut un autre appareil." },
          { texte: "Je réarme le différentiel : l’ohmmètre a lu l’infini.", pourquoi: "Le différentiel a déclenché pour une raison. Une masse peu franche peut échapper à l’ohmmètre." },
          { texte: "Je remets sous tension pour voir si ça recommence.", pourquoi: "Jamais : le défaut se cherche hors tension, après consignation." },
          { texte: "Je consigne, puis je mesure avec un contrôleur d’isolement.", juste: true } ],
        confirmation: "Une masse peu franche peut faire déclencher le différentiel sans que l’ohmmètre la voie. Hors tension, le contrôleur d’isolement applique 500 V continu ; jamais sur un compresseur sous vide, et la limite est celle de la notice ou de la fiche." }
    ]
  },

  methode: {
    titre: 'La méthode, dans l’ordre',
    lignes: [
      "<strong>Hors tension</strong>, fils débranchés, ohmmètre sur un petit calibre.",
      "<strong>Trois mesures</strong> : une par paire de bornes. La plus forte valeur est entre S et R, la borne restante est C.",
      "La plus faible des deux autres donne R, la dernière borne est S. Contrôlez : C-S plus C-R doit donner S-R.",
      "<strong>Les défauts</strong> : OL sur un enroulement, il est coupé. Chaque borne contre la carcasse, au plus fort calibre : on doit lire l’infini."
    ],
    piege: "Si on inverse le principal et l’auxiliaire au câblage, le moteur grille en général peu après la mise sous tension. Prenez le temps de contrôler la somme."
  },
  securite: true,

  /* ---------------------------------------------------------------- temps 4 */
  figurePlan: () => SchemasPratique.mesureSurSchema({
    ohm: 'assets/ohmmetre-h.svg', moteur: 'assets/moteur_mono1.svg', terre: 'assets/masse.svg',
    alt: "Schéma de mesure : l’ohmmètre dessiné par son symbole, dont une pointe rouge va à une borne du moteur monophasé et une pointe noire à la masse, la carcasse du moteur.",
    legende: "Pour chercher une masse, un ohmmètre, une pointe sur une borne du moteur, l’autre sur la carcasse (la masse). On le fait pour chaque borne : on doit lire l’infini."
  }),

  symboles: [
    { src: 'assets/ohmmetre-h.svg', alt: "Symbole normalisé d’un ohmmètre : un cercle avec la lettre oméga.", legende: "L’ohmmètre : l’appareil qui mesure une résistance" },
    { src: 'assets/moteur_mono1.svg', alt: "Symbole normalisé d’un moteur monophasé : un rond avec M et 1 ~, deux fils qui arrivent.", legende: "Le moteur monophasé" },
    { src: 'assets/masse.svg', alt: "Symbole normalisé de la masse, c’est-à-dire de la carcasse métallique.", legende: "La masse : la carcasse métallique" },
    { src: 'assets/trois-bornes.svg', alt: "Schéma d’un compresseur monophasé : la borne C en haut, deux enroulements en dessous. À gauche le principal, qui mène à la borne R. À droite l’auxiliaire, qui mène à la borne S.", legende: "Le compresseur : C en haut, le principal vers R, l’auxiliaire vers S" }
  ],
  lecturePlan: [
    "Sur le schéma du compresseur, la borne <strong>C</strong> est en haut. Dessous, deux enroulements : à gauche le principal, qui mène à R, à droite l’auxiliaire, qui mène à S.",
    "Aller de C à R, c’est traverser le principal seul. Aller de C à S, c’est traverser l’auxiliaire seul. Aller de S à R, c’est traverser les deux enroulements : sa valeur est la somme des deux autres, et c’est la plus forte.",
    "Dans le schéma de mesure, les pointes de l’ohmmètre se posent <strong>sur deux points</strong> : une borne du moteur et la masse. On le fait pour chaque borne.",
    "Le moteur monophasé est un rond marqué M et 1 ~. La masse est la carcasse métallique."
  ],

  /* ---------------------------------------------------------------- temps 5 */
  recap: {
    titre: 'Les mesures et ce qu’elles disent',
    corps: () => {
      const lignes = [
        ['Entre 1 et 2', '11 Ω', "C à S, l’auxiliaire. Avec C = 1, la borne 2 est S."],
        ['Entre 1 et 3', '3 Ω', "C à R, le principal : la plus faible. Avec C = 1, la borne 3 est R."],
        ['Entre 3 et 2', '14 Ω', "S à R, la plus forte. La borne qui reste, 1, est C."],
        ['Contrôle', '11 + 3 = 14', "C-S plus C-R retrouve S-R : le repérage est bon."],
        ['Un enroulement', 'OL', "L’enroulement est coupé."],
        ['Une borne et la carcasse', 'plus fort calibre', "On doit lire l’infini. Zéro ohm ou presque : masse franche."]
      ];
      const t = document.createElement('table');
      t.innerHTML = '<thead><tr><th>Mesure</th><th>Ce que vous lisez</th><th>Ce que ça dit</th></tr></thead><tbody>'
        + lignes.map(l => '<tr><td><strong>' + l[0] + '</strong></td><td>' + l[1] + '</td><td>' + l[2] + '</td></tr>').join('') + '</tbody>';
      const d = document.createElement('div'); d.className = 'recap'; d.appendChild(t); return d;
    }
  },

  quiz: [
    { question: "Bornes repérées 1, 2, 3. Entre 1 et 2, vous lisez 12 Ω. Entre 1 et 3, 7 Ω. Entre 2 et 3, 19 Ω. Quelle borne est C ?",
      confirmation: "La plus forte valeur, 19 Ω, est entre 2 et 3 : la borne qui reste, 1, est C. Contrôle : 12 + 7 = 19.",
      reponses: [
        { texte: "La borne 2.", pourquoi: "La borne 2 fait partie de la paire de la plus forte valeur, 19 Ω. Cette paire est S et R." },
        { texte: "La borne 3.", pourquoi: "La borne 3 fait partie de la paire de la plus forte valeur, 19 Ω. Cette paire est S et R." },
        { texte: "Impossible sans le schéma du constructeur.", pourquoi: "Les trois mesures suffisent : la plus forte valeur désigne S et R, la borne qui reste est C." },
        { texte: "La borne 1.", juste: true } ] },

    { question: "Pourquoi la résistance de l’enroulement principal est-elle plus faible que celle de l’auxiliaire ?",
      confirmation: "L’auxiliaire est en fil plus fin que le principal : sa résistance est plus élevée.",
      reponses: [
        { texte: "Parce que le principal est branché sur C.", pourquoi: "Les deux enroulements partent de C. Ce n’est pas la raison." },
        { texte: "Parce que l’auxiliaire est en fil plus fin que le principal.", juste: true },
        { texte: "Parce que le principal est en fil plus fin que l’auxiliaire.", pourquoi: "C’est l’inverse : l’auxiliaire est en fil plus fin, donc sa résistance est plus élevée." },
        { texte: "Parce que le principal est à la masse.", pourquoi: "Un enroulement à la masse est un défaut. Il n’explique pas la valeur normale du principal." } ] },

    { question: "Entre une borne et la carcasse, l’ohmmètre affiche presque 0 Ω. Que concluez-vous ?",
      confirmation: "Entre une borne et la carcasse, on doit lire l’infini. Presque zéro : masse franche, un enroulement touche la carcasse.",
      reponses: [
        { texte: "Une masse franche : un enroulement touche la carcasse.", juste: true },
        { texte: "Tout est normal : on doit lire presque zéro.", pourquoi: "On doit lire l’infini entre une borne et la carcasse." },
        { texte: "Un enroulement coupé.", pourquoi: "Un enroulement coupé donne l’infini entre ses deux bornes. Ici, une pointe est sur la carcasse." },
        { texte: "Je remets sous tension pour confirmer.", pourquoi: "Jamais : toutes ces mesures se font hors tension, après consignation." } ] },

    { question: "Quand faut-il un contrôleur d’isolement ?",
      confirmation: "Quand une masse peu franche peut échapper à l’ohmmètre, par exemple si le différentiel déclenche sous tension alors que l’ohmmètre lit l’infini. Jamais sur un compresseur sous vide.",
      reponses: [
        { texte: "Pour repérer C, S et R.", pourquoi: "Le repérage se fait à l’ohmmètre. Le contrôleur d’isolement applique 500 V continu et sert à une autre mesure." },
        { texte: "Sur un compresseur sous vide, pour le vérifier.", pourquoi: "Jamais de contrôleur d’isolement sur un compresseur sous vide (notices Maneurop, Tandem)." },
        { texte: "Quand l’ohmmètre lit l’infini mais que le différentiel déclenche sous tension : une masse peu franche.", juste: true },
        { texte: "Sous tension, pour voir si le courant passe.", pourquoi: "Toute mesure se fait hors tension, après consignation." } ] }
  ],

  retenir: [
    "Trois mesures, une par paire de bornes, <strong>hors tension</strong> et fils débranchés.",
    "La plus forte valeur est entre S et R : la borne qui reste est C. La plus faible des deux autres donne R. Contrôlez : C-S plus C-R retrouve S-R.",
    "OL sur un enroulement : il est coupé. Chaque borne contre la carcasse : on doit lire l’infini.",
    "Une masse peu franche demande un contrôleur d’isolement, jamais sur un compresseur sous vide."
  ],

  liens: [
    { nom: "Station 6.7 : l’autocontrôle avant la mise sous tension", href: 'https://inerweb.fr/electrorezo/stations/6-7-autocontrole-mise-sous-tension/', quoi: "La suite des contrôles hors tension, la lecture d’une mesure et la limite d’isolement donnée par la notice." },
    { nom: "HoCourant, module M9 : la consignation", href: 'https://inerweb.fr/hocourant/?module=M9', quoi: "Hors tension : à prouver, jamais à supposer." }
  ],

  objectifs: '<p><strong>Objectif.</strong> Repérer les bornes C, S et R d’un compresseur monophasé avec trois mesures à l’ohmmètre, contrôler le repérage par la somme, reconnaître un enroulement coupé et un enroulement à la masse, et savoir quand il faut un contrôleur d’isolement.</p>'
    + '<p><strong>Limites.</strong> La station s’arrête au repérage des bornes et à ces deux défauts. Le relais, la CTP et le condensateur sont aux stations 9.3 et 9.5. Aucune limite d’isolement n’est donnée comme règle : elle se lit sur la notice ou sur la fiche. La consignation est rappelée dans l’ordre (carte « Avant de toucher ») ; sa formation complète est celle d’HoCourant.</p>',

  credits: [
    { quoi: 'Mesure sur un enroulement', source: 'document de cours « TP DOC TECH 01 »',
      detail: 'base de connaissances inerWeb, empreinte a4398b4fd78b' },
    { quoi: 'Photographie d’un multimètre et de ses pointes', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, repris de la station 1.2 ; droits à confirmer' },
    { quoi: 'Méthode des trois mesures, enroulement coupé, masse, contrôleur d’isolement', source: 'cours « Moteurs monophasés »',
      detail: 'cours du fonds inerWeb, cité, non reproduit' },
    { quoi: 'Symboles normalisés EN 60617 (ohmmètre, moteur monophasé, masse)', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'rien n’a été redessiné' },
    { quoi: 'Schéma du compresseur monophasé (trois bornes)', source: 'construit dans QElectroTech',
      detail: 'script schemas-ligne-9/construire-montages.py' } ],

  correspondances: [
    { ligne: 1, couleur: '#1b3a63', texte: "1.9 Mesurer", href: '../1-9-mesurer/index.html' },
    { ligne: 6, couleur: '#c9451a', texte: "6.7 Autocontrôle avant mise sous tension", href: '../6-7-autocontrole-mise-sous-tension/index.html' }
  ]
});
