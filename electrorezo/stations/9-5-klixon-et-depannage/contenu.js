/* ÉlectroRézo 9.5 — Le Klixon et le dépannage du compresseur.
   Modèle « geste de métier » : on apprend l'ORDRE d'un diagnostic et à LIRE une mesure
   (le Klixon, le condensateur). Aucun fait hors de la liste vérifiée du lot 2 (FAITS-LOT-2) :
   aucune durée de refroidissement du Klixon ; la mesure du Klixon interne ouvert est un
   raisonnement sur le schéma ; la mesure de capacité sous tension n'est pas décrite
   (la capacité relevée est donnée dans l'énoncé).
   Sources : voir SOURCES.md. */

ModelePratique.construire({
  id: '9.5', ligne: 9,
  vue3d: { modele: 'klixon', mode: 'comprendre' },   /* 3D */
  kicker: 'ÉlectroRézo · Ligne 9 Le moteur monophasé · Station 5',
  titre: "Le Klixon et le dépannage du compresseur",
  narration: NARRATION,

  prerequis: [
    { id: '9.2', quoi: "repérer C, S, R" },
    { id: '9.3', quoi: "le relais d’intensité" },
  ],

  codes: {
    referentiel: 'CAP IFCA — référentiel de certification',
    lignes: [
      ['Compétence', 'C5.1', "Remplacer des composants de l'installation"],
      ['Compétence', 'C4.5', "Mesurer, comparer des grandeurs"],
      ['Tâche', 'T16', "Assurer l'entretien d'une installation"],
      ['Tâche', 'T11', "Contrôler les circuits hors fonctionnement"],
      ['Savoir', 'S5.6', "Réseaux, matériels électriques et de régulation"],
      ['Savoir', 'S6.2', "Principaux risques et moyens de prévention"]
    ],
    note: 'Le lien précis entre une tâche et une compétence n’est pas tabulé au référentiel : les tâches sont rattachées par leur activité (T11 : Installation, T16 : Entretien).'
  },

  photos: [
    { src: 'assets/montage-rsir.svg',
      alt: "Schéma électrique d’un compresseur monophasé : la ligne L, le Klixon, la borne C, puis l’enroulement principal vers R et l’enroulement auxiliaire vers S.",
      titre: "Le Klixon est sur le chemin du courant.", sous: "Il est en série sur C : s’il s’ouvre, plus rien n’arrive aux enroulements." },
    { src: 'assets/biblio/multimetre-et-ses-sondes.png',
      alt: "Un multimètre et ses deux pointes.",
      titre: "Hors tension, on mesure.", sous: "L’ohmmètre lit l’état du Klixon, des enroulements et du condensateur." }
  ],
  creditPhoto: 'Photographie : base de connaissances inerWeb, documents de cours. Schéma construit dans QElectroTech. Détail dans « Crédits ».',

  question: "Un compresseur chaud ne démarre pas : par où commencez-vous ?",
  aQuoiCaSert: "Trouver pourquoi un compresseur ne démarre pas, dans un ordre qui évite les fausses pistes : l’alimentation, le Klixon, les enroulements, le relais ou la CTP, puis le condensateur. Un Klixon ouvert ressemble à deux enroulements coupés. L’ordre du diagnostic évite cette confusion.",
  ouOnLeTrouve: "Sur un groupe de condensation ou une unité extérieure, quand le compresseur ne démarre pas, ou coupe peu après le démarrage.",

  /* ---------------------------------------------------------------- temps 2 */
  scene: () => SchemasPratique.echelle({
    etapes: [
      { nom: 'La tension arrive-t-elle ?', photo: 'assets/biblio/multimetre-et-ses-sondes.png', alt: 'Un multimètre et ses deux pointes.', quand: 'En premier, avant toute ouverture du compresseur.',
        outil: 'un multimètre en voltmètre (station 1.9)',
        geste: 'Une mesure de tension à l’arrivée du compresseur. C’est la seule étape sous tension. Seul un travailleur habilité par son employeur intervient sur une installation électrique (HoCourant). Au plateau, le professeur décide.',
        verifie: 'que l’alimentation arrive jusqu’au compresseur.',
        neVerifiePas: 'que le courant arrive jusqu’aux enroulements : le Klixon est en série sur C, et s’il est ouvert il coupe le courant même quand la tension est présente à l’arrivée.' },
      { nom: 'Consigner', quand: 'Avant toute mesure hors tension, et jusqu’au visa du professeur.',
        outil: 'le sectionneur ouvert, un blocage mécanique et une pancarte, un vérificateur d’absence de tension (contrôlé avant et après)',
        geste: 'Dans l’ordre : ' + ModelePratique.consignationEnUneLigne() + ' (la dernière opération seulement si elle est prescrite ; carte « Avant de toucher », au temps 3). Toutes les étapes qui suivent se font hors tension.',
        verifie: 'que vous pouvez toucher le compresseur sans risque.',
        neVerifiePas: 'l’état du compresseur : la consignation ne mesure rien sur lui.' },
      { nom: 'Le Klixon est-il ouvert ?', quand: 'Hors tension, compresseur encore chaud. Si le Klixon est ouvert, attendez que le compresseur refroidisse, puis remesurez.',
        outil: 'un ohmmètre (station 1.9) et le schéma du constructeur',
        geste: 'Le Klixon est un contact sec, comme un interrupteur : fermé, il laisse passer le courant ; ouvert, il le coupe. Il s’ouvre quand l’intensité ou la température montent trop. Il se referme quand le bilame a refroidi. Sur un Klixon interne ouvert, l’ohmmètre lit l’infini entre C et S, et l’infini entre C et R, alors que la valeur entre S et R reste normale. C’est un raisonnement : un Klixon interne est dans la coque, entre la borne C et le point où les deux enroulements se rejoignent ; ouvert, il sépare la borne C des deux enroulements. Sur les schémas de cette station, le Klixon est externe, entre L et C. Vérifiez sur le schéma du constructeur.',
        verifie: 'si la coupure vient du Klixon et non des enroulements.',
        neVerifiePas: 'pourquoi il a coupé : il s’ouvre pour une intensité ou une température trop hautes, et la cause reste à chercher dans les étapes suivantes.' },
      { nom: 'Les enroulements', photo: 'assets/biblio/multimetre-et-ses-sondes.png', alt: 'Un multimètre et ses deux pointes.', quand: 'Hors tension, fils débranchés.',
        outil: 'un ohmmètre sur un petit calibre, par exemple 200 Ω (station 9.2)',
        geste: 'Mesurez entre C et S, entre C et R, puis entre S et R. Un enroulement coupé donne l’infini au lieu de la valeur normale. Puis mesurez entre chaque borne et la carcasse, au plus fort calibre, sur un point gratté : on doit lire l’infini. 0 Ω ou presque veut dire une masse franche.',
        verifie: 'qu’aucun enroulement n’est coupé et qu’aucun ne touche franchement la carcasse.',
        neVerifiePas: 'une masse peu franche : l’ohmmètre peut la manquer, et le différentiel déclenche alors sous tension. Il faut un contrôleur d’isolement.',
        attention: 'jamais de contrôleur d’isolement sur un compresseur sous vide (notices Maneurop et Tandem). Il applique 500 V continu : ne touchez ni les pointes ni les bornes pendant la mesure.' },
      { nom: 'Le relais ou la CTP', quand: 'Hors tension, après les enroulements.',
        outil: 'un ohmmètre et la notice du relais',
        geste: 'Relais d’intensité posé dans le bon sens : l’infini entre la borne de l’auxiliaire (A ou S) et celle du principal (P ou M), l’infini entre la borne de l’auxiliaire et L, et presque 0 Ω entre P ou M et L, c’est la bobine. Une CTP froide a une résistance de quelques ohms. Un relais ou une CTP se remplace par la même référence.',
        verifie: 'que le contact est ouvert au repos et que la bobine conduit.',
        neVerifiePas: 'que le contact colle au démarrage : cela se passe sous tension, quand le courant monte.' },
      { nom: 'Le condensateur', quand: 'Hors tension, en dernier.',
        outil: 'une résistance pour le décharger, puis un ohmmètre sur le calibre 20 kΩ ou 200 kΩ',
        geste: 'Après la décharge, posez les pointes sur les deux bornes. En bon état, l’affichage part vers 0 puis remonte lentement vers l’infini ; en inversant les pointes, cela recommence. Coupé : l’infini en permanence. En court-circuit : 0 ou presque en permanence. À la masse : entre une borne et l’enveloppe métallique, la mesure tend vers 0 ; testez les deux bornes. Une enveloppe gonflée est anormale. Ensuite, comparez la capacité à la valeur marquée et à sa tolérance.',
        verifie: 'que le condensateur n’est ni coupé, ni en court-circuit, ni à la masse.',
        neVerifiePas: 'sa capacité en microfarads : elle se compare au marquage et à sa tolérance.',
        attention: 'un condensateur reste chargé après la coupure. Déchargez-le avec une résistance avant d’y toucher. Certains ont une résistance de décharge d’environ 15 kΩ entre leurs bornes, mais la décharge n’est pas instantanée et peut prendre quelques minutes : on décharge quand même.' },
      { arret: true, nom: 'Arrêt : le professeur vérifie', quand: 'Avant toute remise sous tension.',
        geste: 'Vos mesures sont faites et le composant défectueux est remplacé. 1. Vous appelez le professeur. 2. Il regarde votre montage et vos relevés. 3. Il décide de la remise sous tension. Vous ne cochez le visa qu’après son accord : vous n’allez pas plus loin seul(e).',
        verifie: 'un deuxième regard, avant que le courant soit là.' }
    ]
  }),

  technologie: [
    ["Le Klixon", "c’est un protecteur thermique, branché en série sur la borne C. Il contient un bilame : il se déforme et coupe l’alimentation quand l’intensité ou la température montent trop. Il protège les deux enroulements."],
    ["Il se referme en refroidissant", "quand il a refroidi, le bilame reprend sa forme et le contact se referme. Un compresseur chaud dont le Klixon est ouvert ne démarre pas : on mesure, puis on attend qu’il refroidisse et on remesure."],
    ["Pourquoi il coupe", "des pannes finissent en coupure par le Klixon : un condensateur coupé ou en court-circuit (le moteur ne démarre pas ou mal), un relais de tension mal adapté (le moteur grogne et coupe), une CTP chaude. Quand le Klixon coupe, la cause reste à chercher."],
    ["Le condensateur et son marquage", "il porte sa capacité en µF (on lit aussi MF ou MFD) avec sa tolérance, et sa tension maximale. Exemple : 60 µF ± 10 % veut dire entre 54 et 66 µF. Une mesure de 42 µF est hors tolérance : on remplace."],
    ["L’ordre du diagnostic", "on va de l’alimentation vers le moteur : la tension, puis la consignation, puis le Klixon, les enroulements, le relais ou la CTP, et le condensateur en dernier. Tout est hors tension, après consignation, sauf la première mesure."],
    ["Après un compresseur grillé", "on cherche la cause, électrique, mécanique ou frigorifique. On change aussi le contacteur, le relais thermique, le système de démarrage et de sécurité (relais, condensateur, Klixon), le détendeur et le déshydrateur, et on rince l’installation."]
  ],

  variantes: [
    "<strong>Klixon interne</strong> : dans la coque, derrière la borne C. Une notice Maneurop l’appelle « protecteur interne température courant ». On ne le voit pas : on le repère par les mesures entre C, S et R.",
    "<strong>Klixon externe</strong> : monté sur le compresseur, entre la ligne L et la borne C, comme sur les schémas de cette station. C’est un contact sec, comme un interrupteur : hors tension, à l’ohmmètre entre ses deux bornes, presque 0 Ω s’il est fermé, l’infini s’il est ouvert (station 6.7).",
    "<strong>Condensateur de démarrage</strong> : électrolytique, de forte capacité, petit. Il ne doit pas rester sous tension, sinon il chauffe et risque d’exploser : 5 secondes au plus, 20 démarrages par heure au maximum.",
    "<strong>Condensateur permanent</strong> : il reste en service pendant la marche (station 9.1). On le décharge et on le contrôle de la même façon."
  ],

  /* ---------------------------------------------------------------- temps 3 */
  titres: { objet: 'Un compresseur chaud', dedans: 'Le diagnostic, dans l’ordre', variantes: 'Selon le matériel', symboles: 'Les symboles du dépannage', plan: 'Le lire sur un schéma', methode: 'La méthode, dans l’ordre' },

  exercices: {
    titre: 'Lire le Klixon et le condensateur',
    consigne: 'Huit questions, sans note, et un arrêt. Les relevés sont ceux d’un compresseur fictif. Les premières questions disent où regarder et comment faire ; les dernières, non. La première est déjà résolue : imitez-la.',
    items: [
      { mode: 'exemple',
        enonce: "Un condensateur de compresseur est déchargé. Vous le testez à l’ohmmètre, sur le calibre 20 kΩ. Vous posez les pointes : l’affichage part vers 0, puis remonte lentement vers l’infini. Vous inversez les pointes : cela recommence. Dans quel état est ce condensateur ?",
        ou: "sur l’écran du multimètre, pendant que les pointes restent posées sur les deux bornes, puis après l’inversion des pointes.",
        comment: "regardez trois choses : le départ de l’affichage, sa remontée, et ce qui se passe quand on inverse les pointes. Un condensateur en bon état part vers 0, remonte lentement vers l’infini, et recommence à l’inversion.",
        resolu: "L’affichage part vers 0, remonte vers l’infini et recommence quand on inverse les pointes : à l’ohmmètre, il se comporte comme un condensateur en bon état. Il reste à comparer sa capacité à la valeur marquée." },

      { mode: 'guide',
        enonce: "Un autre condensateur, déchargé, sur le même calibre. Vous posez les pointes : l’affichage reste à 0 ou presque. Vous inversez les pointes : il reste à 0. Que concluez-vous ?",
        figure: () => SchemasPratique.afficheur({ photo: 'assets/biblio/multimetre-et-ses-sondes.png', appareil: 'Multimètre', position: 'ohmmètre, 20 kΩ', valeur: '0,0', unite: 'kΩ' }),
        ou: "sur l’écran : la valeur ne bouge pas, avant comme après l’inversion des pointes.",
        comment: "comparez avec l’exemple. Un condensateur en bon état remonte vers l’infini. Ici l’affichage ne remonte pas.",
        choix: [
          { texte: "Il est en bon état : 0 est une bonne valeur.", pourquoi: "En bon état, l’affichage part vers 0 puis remonte vers l’infini. Un affichage qui reste à 0 ne remonte pas." },
          { texte: "Il est coupé.", pourquoi: "Coupé, l’affichage reste à l’infini en permanence. Vous lisez 0 ou presque." },
          { texte: "Il est en court-circuit : je le remplace.", juste: true },
          { texte: "Il faut attendre : il va remonter vers l’infini.", pourquoi: "L’affichage reste à 0 ou presque en permanence, même après l’inversion des pointes : c’est un court-circuit." } ],
        confirmation: "0 ou presque en permanence : le condensateur est en court-circuit. On le remplace." },

      { mode: 'guide',
        enonce: "Un troisième condensateur, déchargé. Dès que les pointes sont posées, l’écran affiche OL. Il y reste après l’inversion des pointes. Que concluez-vous ?",
        figure: () => SchemasPratique.afficheur({ photo: 'assets/biblio/multimetre-et-ses-sondes.png', appareil: 'Multimètre', position: 'ohmmètre, 20 kΩ', valeur: 'OL', unite: '' }),
        ou: "sur l’écran : OL, ou un 1 tout à gauche, veut dire l’infini.",
        comment: "même méthode que l’exemple. L’affichage part-il vers 0 ? Remonte-t-il ? Un affichage qui reste à l’infini en permanence indique un condensateur coupé.",
        choix: [
          { texte: "Il est coupé : je le remplace.", juste: true },
          { texte: "Il est en court-circuit.", pourquoi: "En court-circuit, l’affichage reste à 0 ou presque en permanence. Vous lisez l’infini." },
          { texte: "Il est en bon état.", pourquoi: "En bon état, l’affichage part vers 0 avant de remonter. Ici il ne part pas de 0." },
          { texte: "Il est à la masse.", pourquoi: "La masse se teste entre une borne et l’enveloppe métallique, et la mesure tend vers 0. Ce test ne porte pas sur la masse." } ],
        confirmation: "L’infini en permanence : le condensateur est coupé. On le remplace." },

      { mode: 'guide',
        enonce: "Un condensateur porte 100 µF ± 10 %. Entre quelles valeurs sa capacité est-elle bonne ?",
        ou: "sur le marquage du condensateur : la capacité en µF, puis la tolérance en %.",
        comment: "calculez 10 % de 100 µF : cela fait 10 µF. La plage va de 100 µF moins 10 µF à 100 µF plus 10 µF.",
        choix: [
          { texte: "De 99 à 101 µF.", pourquoi: "10 % de 100 µF font 10 µF, et non 1 µF." },
          { texte: "De 90 à 110 µF.", juste: true },
          { texte: "De 100 à 110 µF.", pourquoi: "Le ± compte dans les deux sens : 10 µF en plus, et 10 µF en moins." },
          { texte: "De 0 à 10 µF.", pourquoi: "Les 10 µF sont l’écart permis autour de 100 µF. La capacité visée reste 100 µF." } ],
        confirmation: "10 % de 100 µF font 10 µF : la plage va de 90 à 110 µF." },

      { mode: 'guide',
        enonce: "Même modèle de condensateur, 100 µF ± 10 %, donc de 90 à 110 µF. On relève la capacité de deux exemplaires : 95 µF pour l’un, 84 µF pour l’autre. Lequel faut-il remplacer ?",
        ou: "dans l’énoncé : la plage, de 90 à 110 µF, et les deux relevés.",
        comment: "comparez chaque relevé aux deux bornes de la plage, 90 et 110. Dans la plage, le condensateur est bon. Sous 90 ou au-dessus de 110, il est hors tolérance et on le remplace.",
        choix: [
          { texte: "Celui à 95 µF.", pourquoi: "95 µF est entre 90 et 110 µF : il est dans la tolérance." },
          { texte: "Les deux.", pourquoi: "Un seul des deux relevés sort de la plage." },
          { texte: "Aucun des deux.", pourquoi: "84 µF est sous 90 µF : il est hors tolérance." },
          { texte: "Celui à 84 µF.", juste: true } ],
        confirmation: "84 µF est sous 90 µF : hors tolérance, on remplace. 95 µF est dans la plage." },

      { mode: 'seul',
        enonce: "Un compresseur chaud ne démarre pas. Remettez les six étapes du diagnostic dans l’ordre : touchez les étiquettes l’une après l’autre.",
        methodeVue: "Revoyez la ligne des étapes du temps 2 : on va de l’alimentation vers le moteur.",
        elements: ["La tension arrive-t-elle ?", "Consigner", "Le Klixon est-il ouvert ?", "Les enroulements", "Le relais ou la CTP", "Le condensateur"],
        melange: [4, 0, 5, 2, 3, 1],
        pasJuste: ["Oui : on vérifie d’abord que la tension arrive au compresseur.", "Oui : avant toute mesure hors tension, on consigne.", "Oui : le Klixon, avant de mesurer les enroulements.", "Oui : les enroulements, une fois le Klixon écarté.", "Oui : le relais ou la CTP, l’organe de démarrage.", "Oui : le condensateur, en dernier."],
        pasFaux: ["Pas celui-là : qu’est-ce qui vient en premier, du côté de l’alimentation ?", "Pas celui-là : que fait-on avant toute mesure hors tension ?", "Pas celui-là : quel protecteur, en série sur C, peut couper tout le moteur ?", "Pas celui-là : après le Klixon, que mesure-t-on entre C, S et R ?", "Pas celui-là : après les enroulements, quel organe sert au démarrage ?", "Pas celui-là : quel est le dernier de la liste ?"],
        confirmation: "La tension, la consignation, le Klixon, les enroulements, le relais ou la CTP, puis le condensateur." },

      { mode: 'seul',
        enonce: "Un compresseur chaud ne démarre pas. Son Klixon est interne. Hors tension, fils débranchés, ohmmètre sur 200 Ω : l’infini entre C et S, l’infini entre C et R, et 14 Ω entre S et R, une valeur normale pour deux enroulements (exemple de la station 9.2). Que concluez-vous, et que faites-vous ?",
        methodeVue: "La mesure est expliquée au temps 2, à l’étape du Klixon : il est en série sur C.",
        choix: [
          { texte: "Les deux enroulements sont coupés : je remplace le compresseur.", pourquoi: "Entre S et R, les deux enroulements se suivent et l’ohmmètre lit la valeur normale : ils conduisent tous les deux." },
          { texte: "Le Klixon interne est probablement ouvert : C est coupé du reste. J’attends que le compresseur refroidisse, puis je remesure.", juste: true },
          { texte: "Je remets sous tension pour que le Klixon se referme.", pourquoi: "Il se referme quand le bilame a refroidi. La remise sous tension attend le visa du professeur." },
          { texte: "Le moteur est à la masse.", pourquoi: "La masse se cherche entre chaque borne et la carcasse. Ici, les mesures sont prises entre les bornes." } ],
        confirmation: "C est coupé du reste : le Klixon interne est probablement ouvert. On attend que le compresseur refroidisse, puis on remesure. Raisonnement sur le schéma : on le vérifie sur le schéma du constructeur." },

      { type: 'arret',
        texte: "Vos mesures sont faites et le composant défectueux est remplacé. <strong>Appelez le professeur</strong> : il regarde votre montage et vos relevés, puis il décide de la remise sous tension. <strong>Ne cochez la case qu’après son accord</strong> : la question suivante ne s’ouvre qu’avec ce visa." },

      { mode: 'seul',
        enonce: "Avec le visa, le professeur remet sous tension. Le compresseur démarre mal, puis le Klixon coupe. Le compresseur refroidit, le professeur remet sous tension, et le Klixon coupe encore. Que faites-vous ?",
        methodeVue: "Revoyez le temps 2 : ce qui finit en coupure par le Klixon, et l’ordre du diagnostic.",
        choix: [
          { texte: "Je demande de remettre sous tension jusqu’à ce que ça tienne.", pourquoi: "Chaque coupure vient d’une intensité ou d’une température trop hautes. Le Klixon protège les deux enroulements : insister les expose." },
          { texte: "Je retire le Klixon.", pourquoi: "Le Klixon protège les deux enroulements. Le retirer supprime cette protection." },
          { texte: "Je change le compresseur tout de suite.", pourquoi: "Rien ne le prouve. Le Klixon coupe aussi pour un condensateur coupé ou en court-circuit, un relais de tension mal adapté, ou une CTP chaude : la cause reste à chercher." },
          { texte: "Je coupe, je consigne, et je cherche la cause dans l’ordre : enroulements, relais ou CTP, condensateur.", juste: true } ],
        confirmation: "Le Klixon coupe à cause d’une panne : condensateur, relais, CTP. On consigne et on reprend l’ordre du diagnostic." }
    ]
  },

  methode: {
    titre: 'La méthode, dans l’ordre',
    lignes: [
      "<strong>Dans l’ordre</strong> : la tension, la consignation, le Klixon, les enroulements, le relais ou la CTP, le condensateur.",
      "<strong>Compresseur chaud</strong> : mesurez. Si le Klixon est ouvert, attendez qu’il refroidisse, puis remesurez : il se referme quand il a refroidi.",
      "<strong>Un condensateur se décharge</strong> avec une résistance avant qu’on y touche. Puis il se teste à l’ohmmètre, et sa capacité se compare à sa tolérance.",
      "<strong>Arrêt</strong> : le professeur vérifie avant toute remise sous tension."
    ],
    piege: "Un Klixon interne ouvert ressemble à deux enroulements coupés : l’infini entre C et S, l’infini entre C et R. Entre S et R, la valeur reste normale."
  },
  securite: true,

  /* ---------------------------------------------------------------- temps 4 */
  figurePlan: () => {
    const hote = document.createElement('div');
    [['assets/montage-rsir.svg',
      "Schéma d’un compresseur monophasé en RSIR : la ligne L, le Klixon, la borne C, le principal vers R, l’auxiliaire vers S, la bobine et le contact du relais d’intensité, le neutre N.",
      "Le montage RSIR : L, le Klixon, puis C. À partir de C, le principal va vers R et l’auxiliaire vers S."],
     ['assets/montage-csir.svg',
      "Schéma d’un compresseur monophasé en CSIR : comme le RSIR, avec le condensateur de démarrage Cd en série avec le contact et l’auxiliaire.",
      "Le montage CSIR : Cd est le condensateur de démarrage, en série avec l’auxiliaire."]
    ].forEach(([src, alt, legende]) => {
      const f = document.createElement('figure');
      f.className = 'mesure-schema';
      const i = document.createElement('img');
      i.src = src; i.alt = alt; i.loading = 'lazy';
      i.style.cssText = 'display:block;width:100%;max-width:420px;height:auto;margin:0 auto';
      const c = document.createElement('figcaption');
      c.className = 'legende'; c.textContent = legende;
      f.append(i, c);
      hote.appendChild(f);
    });
    return hote;
  },

  symboles: [
    { src: 'assets/clixon.svg', alt: "Symbole du protecteur thermique Klixon : un cercle traversé par un trait brisé.", legende: "Le Klixon : le protecteur thermique, en série sur C" },
    { src: 'assets/condensateur.svg', alt: "Symbole normalisé du condensateur : deux traits parallèles qui ne se touchent pas.", legende: "Le condensateur" },
    { src: 'assets/ohmmetre-h.svg', alt: "Symbole normalisé d’un ohmmètre : un cercle avec la lettre oméga.", legende: "L’ohmmètre : l’appareil qui mesure une résistance" },
    { src: 'assets/masse.svg', alt: "Symbole normalisé de la masse, c’est-à-dire de la carcasse métallique.", legende: "La masse : la carcasse ou l’enveloppe métallique" }
  ],
  lecturePlan: [
    "Cherchez le Klixon : un <strong>cercle traversé par le fil</strong>, entre L, la ligne, et la borne C. Tout le courant du compresseur le traverse.",
    "À partir de C, le courant se partage : le principal vers R, l’auxiliaire vers S. La bobine KA est en série avec le principal. Le contact KA, ouvert au repos, alimente l’auxiliaire (station 9.3).",
    "Sur le schéma du CSIR, <strong>Cd</strong> est le condensateur de démarrage. Il est en série avec l’auxiliaire.",
    "L’ohmmètre se pose entre deux bornes : C et S, C et R, S et R. Un Klixon interne ouvert donne l’infini entre C et S, et entre C et R."
  ],

  /* ---------------------------------------------------------------- temps 5 */
  recap: {
    titre: 'Ce que lit l’ohmmètre, ce que ça veut dire, ce qu’on fait',
    corps: () => {
      const lignes = [
        ['Condensateur : part vers 0, remonte lentement vers l’infini, recommence quand on inverse les pointes', "il est en bon état", "on compare sa capacité au marquage et à sa tolérance"],
        ['Condensateur : l’infini en permanence', "il est coupé", "on le remplace"],
        ['Condensateur : 0 ou presque en permanence', "il est en court-circuit", "on le remplace"],
        ['Condensateur : entre une borne et l’enveloppe métallique, la mesure tend vers 0', "il est à la masse (mesurez entre chaque borne et l’enveloppe)", "on le remplace"],
        ['Capacité sous la tolérance (par exemple 42 µF pour 60 µF ± 10 %)', "il est hors tolérance", "on le remplace"],
        ['Compresseur : l’infini entre C et S, l’infini entre C et R, la valeur normale entre S et R', "le Klixon interne est probablement ouvert (raisonnement sur le schéma)", "on attend que le compresseur refroidisse, puis on remesure"]
      ];
      const t = document.createElement('table');
      t.innerHTML = '<thead><tr><th>Ce que lit l’ohmmètre</th><th>Ce que ça veut dire</th><th>Ce qu’on fait</th></tr></thead><tbody>'
        + lignes.map(l => '<tr><td>' + l[0] + '</td><td><strong>' + l[1] + '</strong></td><td>' + l[2] + '</td></tr>').join('') + '</tbody>';
      const d = document.createElement('div'); d.className = 'recap'; d.appendChild(t); return d;
    }
  },

  quiz: [
    { question: "Un compresseur chaud ne démarre pas, et son Klixon interne est ouvert. Quand le contact se referme-t-il ?",
      confirmation: "Quand il a refroidi, le bilame reprend sa forme et le contact se referme.",
      reponses: [
        { texte: "Dès qu’on remet sous tension.", pourquoi: "Le bilame reprend sa forme quand il a refroidi. La remise sous tension attend le visa du professeur." },
        { texte: "Quand le bilame a refroidi.", juste: true },
        { texte: "Seulement quand on remplace le Klixon.", pourquoi: "Le bilame reprend sa forme en refroidissant, sans pièce neuve." },
        { texte: "Quand on décharge le condensateur.", pourquoi: "La décharge du condensateur n’agit pas sur le Klixon. Son contact suit la température et l’intensité." } ] },

    { question: "Un condensateur porte 20 µF ± 10 %. On relève 17 µF. Que concluez-vous ?",
      confirmation: "10 % de 20 µF font 2 µF : la plage va de 18 à 22 µF. 17 µF est sous 18 µF, donc hors tolérance : on remplace.",
      reponses: [
        { texte: "Il est conforme : 17 µF est proche de 20 µF.", pourquoi: "La plage va de 18 à 22 µF. 17 µF est sous 18 µF : hors tolérance." },
        { texte: "Il est conforme : une capacité plus faible ne gêne pas.", pourquoi: "Une capacité sous la tolérance veut dire qu’on remplace le condensateur." },
        { texte: "Il est hors tolérance : on le remplace.", juste: true },
        { texte: "On ne peut rien dire sans le tester à l’ohmmètre.", pourquoi: "Le test à l’ohmmètre dit s’il est coupé, en court-circuit ou à la masse. Ici le relevé de capacité suffit : il sort de la plage de 18 à 22 µF." } ] },

    { question: "Avant de toucher un condensateur, que faites-vous ?",
      confirmation: "On le décharge avec une résistance : il reste chargé après la coupure.",
      reponses: [
        { texte: "Je le décharge avec une résistance.", juste: true },
        { texte: "Je ne fais rien : il est vide dès que l’alimentation est coupée.", pourquoi: "Un condensateur reste chargé après la coupure." },
        { texte: "J’attends : certains se déchargent tout seuls.", pourquoi: "Certains ont une résistance de décharge d’environ 15 kΩ, mais la décharge peut prendre quelques minutes. On décharge quand même." },
        { texte: "Je commence par le test à l’ohmmètre.", pourquoi: "Le test à l’ohmmètre se fait sur un condensateur déjà déchargé." } ] },

    { question: "Où le Klixon est-il branché, et que protège-t-il ?",
      confirmation: "Il est en série sur la borne C et il protège les deux enroulements.",
      reponses: [
        { texte: "En parallèle sur le condensateur : il protège le condensateur.", pourquoi: "Le Klixon est en série sur C, et il protège les deux enroulements." },
        { texte: "Entre S et R : il protège l’auxiliaire seul.", pourquoi: "Il est sur la borne C. Il protège le principal et l’auxiliaire, c’est-à-dire les deux enroulements." },
        { texte: "Sur le relais : il protège le contact.", pourquoi: "Sur le schéma, le Klixon est entre L et C. Il protège les deux enroulements du moteur." },
        { texte: "En série sur la borne C : il protège les deux enroulements.", juste: true } ] }
  ],

  retenir: [
    "Le Klixon est un protecteur thermique <strong>en série sur C</strong>. Il s’ouvre quand l’intensité ou la température montent trop, et se referme quand il a refroidi.",
    "L’ordre du diagnostic : la tension, la consignation, le Klixon, les enroulements, le relais ou la CTP, puis le condensateur.",
    "Klixon interne ouvert : l’infini entre C et S, l’infini entre C et R, la valeur normale entre S et R. C’est un raisonnement à vérifier sur le schéma du constructeur.",
    "Un condensateur se <strong>décharge avec une résistance</strong> avant qu’on y touche. Puis il se teste à l’ohmmètre.",
    "Une capacité hors de la tolérance marquée : on remplace le condensateur."
  ],

  liens: [
    { nom: "HoCourant — module M9 : la consignation", href: 'https://inerweb.fr/hocourant/?module=M9', quoi: "Hors tension : à prouver, jamais à supposer." },
    { nom: "Législation — Consigner : VAT, les étapes", href: 'https://inerweb.fr/legislation/stations/elec-consigner/', quoi: "Les cinq opérations : séparer, condamner, identifier, vérifier l’absence de tension, mettre à la terre et en court-circuit si c’est prescrit." },
    { nom: "Législation — Protéger un circuit", href: 'https://inerweb.fr/legislation/stations/elec-proteger-un-circuit/', quoi: "La station voisine sur la protection d’un circuit électrique." }
  ],

  objectifs: '<p><strong>Objectif.</strong> Dérouler, dans l’ordre, le diagnostic d’un compresseur monophasé qui ne démarre pas ; lire le rôle du Klixon ; tester un condensateur à l’ohmmètre et comparer sa capacité à sa tolérance ; s’arrêter pour le visa du professeur avant toute remise sous tension.</p>'
    + '<p><strong>Limites.</strong> La station ne donne aucune durée de refroidissement du Klixon. La mesure du Klixon interne ouvert est un raisonnement sur le schéma, à vérifier sur le schéma du constructeur. La capacité relevée est donnée dans l’énoncé. Le repérage de C, S, R est à la station 9.2, le relais d’intensité à la station 9.3. La consignation est rappelée dans l’ordre ; sa formation complète est celle d’HoCourant.</p>',

  credits: [
    { quoi: 'Photographie d’un multimètre et de ses pointes', source: 'base de connaissances inerWeb et photographies des stations voisines',
      detail: 'documents de cours et catalogues indexés ; droits à confirmer' },
    { quoi: 'Le Klixon, le condensateur, les pannes qui finissent en coupure par le Klixon', source: 'cours « Moteurs monophasés » du fonds inerWeb',
      detail: 'document de cours cité, non reproduit' },
    { quoi: 'Le Klixon en série sur la borne C, qui protège les deux enroulements', source: 'correction CAP « compresseur hermétique »',
      detail: 'document du fonds, cité, non reproduit' },
    { quoi: 'Protecteur interne température courant', source: 'notice Maneurop',
      detail: 'document du fonds, cité, non reproduit' },
    { quoi: 'Klixon externe, montages RSIR et CSIR', source: 'Tecumseh Europe, annexes « Types de moteurs, appareillage électrique »',
      detail: 'document du fonds, cité, non reproduit' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/ : rien n’a été redessiné' },
    { quoi: 'Schémas du compresseur (montages RSIR et CSIR)', source: 'construits dans QElectroTech pour la ligne 9',
      detail: 'convertis en SVG, à valider par F. Henninot' } ],

  correspondances: [
    { ligne: 4, couleur: '#c0392b', texte: "4.7 Le relais thermique", href: '../4-7-relais-thermique/index.html' },
    { ligne: 9, couleur: '#a16207', texte: "9.2 Repérer C, S, R", href: '../9-2-reperer-c-s-r/index.html' },
    { ligne: 6, couleur: '#c9451a', texte: "6.7 Autocontrôle avant mise sous tension", href: '../6-7-autocontrole-mise-sous-tension/index.html' }
  ]
});
