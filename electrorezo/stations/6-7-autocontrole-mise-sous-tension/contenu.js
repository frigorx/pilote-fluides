/* ÉlectroRézo 6.7 — Autocontrôle électrique avant mise sous tension.
   Modèle « geste de métier » : on apprend la SUITE des contrôles et à LIRE une mesure.
   Aucune valeur minimale n'est inventée : les limites d'isolement viennent de la fiche ou de
   la notice (donnée dans l'énoncé), les ordres de grandeur d'un moteur du cours cité.
   Sources : voir SOURCES.md. */

ModelePratique.construire({
  id: '6.7', ligne: 6,
  kicker: 'ÉlectroRézo · Ligne 6 Machines et conversion · Station 7',
  titre: "Autocontrôle électrique avant mise sous tension",
  narration: NARRATION,
  sansMp3: true,   /* aucun MP3 fabriqué (feu vert à part) : retirer cette ligne quand voix/ sera remplie */

  prerequis: [
    { id: '1.9', quoi: "mesurer" },
    { id: '2.6', quoi: "le champ tournant" },
    { id: '4.8', quoi: "la terre" },
    { id: '5.9', quoi: "lire un schéma" },
    { id: '6.3', quoi: "le moteur asynchrone triphasé" },
  ],

  codes: {
    referentiel: 'CAP IFCA — référentiel de certification',
    lignes: [
      ['Compétence', 'C3.7', "Contrôler la mise en œuvre des équipements électriques et fluidiques"],
      ['Tâche', 'T11', "Contrôler les circuits hors fonctionnement"],
      ['Tâche', 'T12', "Respecter les consignes de sécurité et protéger la zone de travail"],
      ['Savoir', 'S5.6', "Réseaux, matériels électriques et de régulation"],
      ['Savoir', 'S6.2', "Principaux risques et moyens de prévention"]
    ],
    note: 'Le lien précis entre une tâche et une compétence n’est pas tabulé au référentiel : les tâches sont rattachées par leur activité (Installation).'
  },

  photos: [
    { src: 'assets/biblio/mesure-continuite-enroulement.jpeg',
      alt: "Un multimètre jaune en position ohmmètre, dont les deux pointes touchent la connexion d’un enroulement de moteur.",
      titre: "Hors tension, on mesure.", sous: "Les pointes de l’ohmmètre sur les deux bouts d’un enroulement : l’écran dit s’il conduit." },
    { src: 'assets/biblio/raccordement-prise-boite.jpeg',
      alt: "Une prise murale ouverte dans sa boîte : fils rouge, bleu et vert et jaune raccordés, avec des flèches sur les vis à serrer.",
      titre: "Un raccordement qui se contrôle.", sous: "Vis serrée, fil tenu, aucun brin libre, chaque couleur à sa place. Les flèches du dessin montrent les vis à serrer." }
  ],
  creditPhoto: 'Photographies : base de connaissances inerWeb, documents de cours. Détail dans « Crédits ».',

  question: "Votre câblage est fini et tout a l’air bon : qu’est-ce qui sépare ce moment de la mise sous tension ?",
  aQuoiCaSert: "Trouver soi-même ses erreurs <strong>avant</strong> de fermer le disjoncteur : une vis desserrée, un repère faux, un conducteur de protection coupé, un isolement mauvais. Un défaut trouvé hors tension coûte une minute ; sous tension, il peut coûter l’appareil.",
  ouOnLeTrouve: "Au plateau technique, à la fin du câblage d’une platine ; chez le client, avant la première mise sous tension d’une installation neuve ou modifiée.",

  /* ---------------------------------------------------------------- temps 2 */
  scene: () => SchemasPratique.echelle({
    etapes: [
      { nom: 'Hors tension', photo: 'assets/biblio/verificateur-absence-tension.png', alt: 'Un vérificateur d’absence de tension.',  quand: 'Avant tout contrôle, et jusqu’au visa.',
        outil: 'le sectionneur ouvert, un blocage mécanique et une pancarte, un vérificateur d’absence de tension (contrôlé avant et après)',
        geste: 'Consignation, dans l’ordre : ' + ModelePratique.consignationEnUneLigne() + ' (la dernière opération seulement si elle est prescrite ; carte « Avant de toucher », au temps 3). Sur le plateau, la platine reste hors tension jusqu’au visa du professeur ; la mise sous tension est faite par lui seul.',
        verifie: 'que vous pouvez travailler sans risque.',
        neVerifiePas: 'que votre montage est correct : ce n’est pas un contrôle du câblage.' },
      { nom: 'Regarder et tirer', photo: 'assets/biblio/raccordement-prise-boite.jpeg', alt: 'Un raccordement : fils dans leurs bornes, vis à serrer.',  quand: 'Une fois le câblage terminé.',
        outil: 'vos yeux, un tournevis, vos doigts',
        geste: 'Fil par fil : dénudé à la bonne longueur, embout serti, un fil par borne, vis serrée, aucun brin libre. Un léger coup de traction : le fil ne bouge pas. Le couple de serrage est celui de la notice : par exemple 3 N·m au plus sur les vis de bornier d’un compresseur Maneurop (notice du constructeur).',
        verifie: 'que chaque contact est sûr et qu’aucun brin ne touche la borne voisine.',
        neVerifiePas: 'que le fil est au bon endroit : une vis bien serrée peut l’être à la mauvaise borne.' },
      { nom: 'Comparer au schéma', photo: 'assets/biblio/puissance-et-commande.jpeg', alt: 'Planche d’exercice de cours : le schéma de puissance et le schéma de commande d’un démarrage direct, avec leurs questions laissées vides.',  quand: 'Après l’aspect, avant les mesures.',
        outil: 'le schéma (5.9) et les repères (8.9)',
        geste: 'Du schéma vers la platine, fil par fil : le repère est identique, la borne est la bonne, la couleur est à sa place (bleu clair pour le neutre, vert et jaune pour la protection).',
        verifie: 'que le câblage est conforme au schéma.',
        neVerifiePas: 'que chaque fil conduit : un fil bien placé peut être coupé.' },
      { nom: 'Continuité', photo: 'assets/biblio/multimetre-et-ses-sondes.png', alt: 'Un multimètre et ses deux pointes.',  quand: 'Hors tension, chaque chemin de la puissance et de la commande.',
        outil: 'un multimètre en ohmmètre ou en continuité (1.9)',
        geste: 'Une pointe à chaque bout du fil ou du chemin. Une valeur proche de zéro : ça conduit. L’écran affiche OL, ou un 1 tout à gauche : le circuit est ouvert. Le conducteur de protection se contrôle jusqu’à chaque masse.',
        verifie: 'qu’il n’y a pas de coupure. La continuité des conducteurs de protection fait partie des vérifications d’une installation neuve (INRS, ED 6345, § 4.5.2).',
        neVerifiePas: 'que le fil supporte le courant (sa section) ni que le serrage tiendra en charge.' },
      { nom: 'Isolement', photo: 'assets/biblio/moteur-boite-a-bornes.jpeg', alt: 'Boîte à bornes ouverte d’un moteur : deux flèches désignent les barrettes de couplage.',  quand: 'Hors tension, après la continuité.',
        outil: 'un contrôleur d’isolement, qui applique environ 500 V continu (document de cours)',
        geste: 'Entre chaque conducteur actif et la terre (la carcasse), puis entre conducteurs : on veut une valeur énorme, en mégohms. <strong>Une seule règle pour la limite</strong> : celle de la notice du matériel ou de la procédure de l’entreprise ; au plateau, celle de la fiche du TP. On ne la devine pas.',
        verifie: 'qu’aucun conducteur ne touche la carcasse ni un autre conducteur (isolant abîmé, fil pincé).',
        neVerifiePas: 'la continuité : un fil coupé a un isolement parfait.',
        attention: 'jamais de contrôleur d’isolement sur un compresseur sous vide (notices Maneurop, Tandem, Blue Star). Les appareils électroniques (variateur, régulateur) se débranchent avant : lisez leur notice. Pendant la mesure, ne touchez ni les pointes ni les conducteurs : l’appareil envoie une tension ; après, laissez le circuit se décharger (notice du contrôleur).' },
      { arret: true, nom: 'Arrêt — le professeur vérifie', quand: 'Avant la mise sous tension.',
        geste: 'Vous avez fini vos contrôles. 1. Vous appelez le professeur. 2. Il regarde votre montage et vos relevés. 3. Il décide de la mise sous tension. Vous ne cochez le visa qu’après son accord : vous n’allez pas plus loin seul(e).',
        verifie: 'un deuxième regard, avant que le courant soit là.' },
      { nom: 'Mise sous tension, essai', photo: 'assets/biblio/platine-demarrage-direct.jpeg', alt: 'Une platine de démarrage direct.',  quand: 'Seulement après le visa.',
        outil: 'le professeur, vos yeux, le multimètre',
        geste: 'Première mise sous tension : on regarde tout de suite. Le contacteur colle-t-il ? La machine démarre-t-elle ? Dans quel sens tourne-t-elle ? Si le sens est faux : on coupe, on consigne, on échange deux phases, on recommence (2.6). La notice dit si le sens compte : une notice Maneurop accepte les deux sens, la notice Tandem exige le bon.',
        verifie: 'que ça fonctionne, et dans le bon sens.',
        neVerifiePas: 'ce qui était faux sans qu’on s’en aperçoive : d’où les contrôles d’avant.' }
    ]
  }),

  technologie: [
    ["Un autocontrôle", "ce n’est pas un contrôle pour la forme : c’est la dernière chance de trouver ses erreurs <strong>hors tension</strong>."],
    ["Du plus simple au plus fin", "on regarde, on compare au schéma, puis on mesure : d’abord la continuité, ensuite l’isolement. Chaque contrôle voit une chose que les autres ne voient pas."],
    ["Une mesure se lit en trois temps", "le <strong>nombre</strong>, l’<strong>unité</strong> (Ω, kΩ, MΩ) et la <strong>limite</strong> donnée par la fiche ou la notice. On ne devine jamais la limite."],
    ["Un arrêt, pas une formalité", "après les contrôles, le professeur vérifie, puis il décide de la mise sous tension. C’est le seul arrêt obligatoire."]
  ],

  variantes: [
    "<strong>Sur le plateau</strong> — la platine reste hors tension jusqu’au visa du professeur.",
    "<strong>Chez le client</strong> — mêmes contrôles avant la première mise sous tension, avec la consignation et l’habilitation de l’entreprise.",
    "<strong>Un moteur</strong> — on ajoute l’isolement des enroulements, hors tension, barrettes de couplage retirées (les petites plaques qui relient les bornes pour coupler le moteur), et le sens de rotation à l’essai.",
    "<strong>Un compresseur</strong> — la notice dit si le sens de rotation compte et interdit le contrôleur d’isolement sous vide."
  ],

  /* ---------------------------------------------------------------- temps 3 */
  titres: { objet: 'Sur le plateau', dedans: 'Les contrôles, dans l’ordre', variantes: 'Selon la situation', symboles: 'Les symboles de la mesure', plan: 'Le lire sur un plan', methode: 'La méthode, dans l’ordre' },

  exercices: {
    titre: 'Contrôler avant de fermer',
    consigne: 'Sept questions, sans note, et un arrêt. Les relevés sont ceux d’une platine fictive. Les premières questions disent où regarder et comment faire ; les dernières, non. La première est déjà résolue : imitez-la.',
    items: [
      { mode: 'exemple',
        enonce: "Continuité d’un fil de la commande : l’écran affiche 0,3 Ω. Ce fil conduit-il ?",
        figure: () => SchemasPratique.afficheur({ photo: 'assets/biblio/multimetre-et-ses-sondes.png', appareil: 'Multimètre', position: 'continuité · Ω', valeur: '0,3', unite: 'Ω' }),
        ou: "sur l’écran, le nombre et son unité, à droite.",
        comment: "une valeur proche de zéro ohm veut dire que le fil conduit. OL, ou un 1 tout à gauche, veut dire que le circuit est ouvert.",
        resolu: "0,3 Ω est proche de zéro : le fil conduit. Aucune coupure sur ce chemin." },

      { mode: 'guide',
        enonce: "Conducteur de protection d’un moteur : l’écran affiche OL. Que concluez-vous ?",
        figure: () => SchemasPratique.afficheur({ photo: 'assets/biblio/multimetre-et-ses-sondes.png', appareil: 'Multimètre', position: 'continuité · Ω', valeur: 'OL', unite: '' }),
        ou: "sur l’écran, la valeur affichée, comme dans l’exemple.",
        comment: "OL veut dire que l’appareil ne mesure aucun passage : le circuit est ouvert.",
        choix: [
          { texte: "Le conducteur de protection est parfait.", pourquoi: "OL veut dire le contraire : aucun passage du courant de mesure." },
          { texte: "Le conducteur de protection est coupé quelque part : je cherche (borne desserrée, fil coupé).", juste: true },
          { texte: "Je remets sous tension pour vérifier.", pourquoi: "Jamais : les contrôles de continuité se font hors tension, et c’est précisément le conducteur de protection qui doit être sûr avant." },
          { texte: "Peu importe : le PE ne sert qu’en cas de défaut.", pourquoi: "C’est justement pour le jour du défaut qu’il doit conduire." } ],
        confirmation: "OL : pas de continuité. Le PE est coupé quelque part, on le cherche avant d’aller plus loin." },

      { mode: 'guide',
        enonce: "La fiche de ce TP (fictive) demande un isolement d’au moins 1 MΩ. Entre une borne du moteur et sa carcasse, l’écran affiche 0,2 MΩ. Que faites-vous ?",
        ou: "dans l’énoncé : le nombre et l’unité lus sur l’écran du contrôleur (MΩ, mégohm, un million d’ohms), et la limite de la fiche.",
        comment: "comparez 0,2 à 1 : ici on veut une valeur <strong>grande</strong>, pas proche de zéro comme à la continuité.",
        choix: [
          { texte: "C’est bon : 0,2, c’est presque zéro, donc c’est isolé.", pourquoi: "C’est le raisonnement de la continuité. Pour l’isolement, un petit nombre veut dire que le courant passe un peu : c’est mauvais." },
          { texte: "C’est bon : 0,2 est plus grand que zéro.", pourquoi: "Ce n’est pas zéro qu’il faut dépasser, c’est la limite de la fiche : 1 MΩ." },
          { texte: "Trop faible : j’arrête, je ne présente pas le montage et je cherche le défaut.", juste: true },
          { texte: "Je refais la mesure sous tension.", pourquoi: "Jamais : l’isolement se mesure hors tension, et un défaut d’isolement sous tension est dangereux." } ],
        confirmation: "0,2 MΩ est sous la limite de 1 MΩ : isolement insuffisant, on cherche avant de continuer." },

      { mode: 'guide',
        enonce: "Même fiche : au moins 1 MΩ. Sur un autre circuit, l’écran affiche 850 kΩ. Conforme ou non ?",
        ou: "dans l’énoncé, l’unité à droite du nombre lu : c’est kΩ, pas MΩ.",
        comment: "1 MΩ = 1 000 kΩ : pour passer des kΩ aux MΩ, on divise par 1 000. Exemple résolu : 500 kΩ = 0,5 MΩ ; comparé à une limite de 1 MΩ, c’est insuffisant. Faites de même ici : même unité, puis comparez.",
        choix: [
          { texte: "Conforme : 850 est bien plus grand que 1.", pourquoi: "On ne compare pas 850 kΩ à 1 MΩ comme deux nombres de même unité : 1 MΩ vaut 1 000 kΩ." },
          { texte: "Conforme : 850 kΩ valent 850 MΩ.", pourquoi: "Un kΩ est mille fois plus petit qu’un MΩ, pas mille fois plus grand." },
          { texte: "Impossible de comparer deux unités différentes.", pourquoi: "On peut : il suffit de convertir. 850 kΩ = 0,85 MΩ." },
          { texte: "Non conforme : 850 kΩ = 0,85 MΩ, c’est sous la limite de 1 MΩ.", juste: true } ],
        confirmation: "850 kΩ = 0,85 MΩ : sous la limite. C’est une erreur d’unité fréquente." },

      { mode: 'seul',
        enonce: "Remettez vos contrôles dans l’ordre : touchez les six étiquettes l’une après l’autre.",
        methodeVue: "Revoyez la ligne des étapes du temps 2 : du plus simple au plus fin.",
        elements: ["Me mettre hors tension", "Regarder et tirer sur chaque fil", "Comparer au schéma", "Mesurer la continuité", "Mesurer l’isolement", "Appeler le professeur"],
        melange: [4, 2, 5, 0, 3, 1],
        pasJuste: ["Oui : on commence hors tension, et on y reste.", "Oui : l’aspect et le serrage d’abord.", "Oui : chaque fil contre le schéma.", "Oui : la continuité, hors tension.", "Oui : l’isolement après la continuité.", "Oui : l’arrêt, tout à la fin des contrôles."],
        pasFaux: ["Pas celui-là : qu’est-ce qui vient avant tout contrôle ?", "Pas celui-là : qu’est-ce qui se fait avant de comparer au schéma ?", "Pas celui-là : après l’aspect, que compare-t-on ?", "Pas celui-là : quelle mesure vient avant l’isolement ?", "Pas celui-là : quelle mesure vient après la continuité ?", "Pas celui-là : que fait-on quand tous les contrôles sont faits ?"],
        confirmation: "Hors tension, aspect, schéma, continuité, isolement, puis le professeur." },

      { mode: 'seul',
        enonce: "Tous vos contrôles sont bons : tout est serré, conforme au schéma, la continuité et l’isolement sont bons. Que faites-vous ?",
        methodeVue: "Revoyez l’arrêt de la ligne des étapes : c’est le seul arrêt obligatoire.",
        choix: [
          { texte: "J’appelle le professeur et j’attends son visa.", juste: true },
          { texte: "Je ferme le disjoncteur : tout est contrôlé.", pourquoi: "La mise sous tension n’est pas votre décision : le professeur vérifie d’abord, puis il décide." },
          { texte: "Je mets sous tension une seconde, juste pour voir.", pourquoi: "Une seconde suffit à abîmer un matériel ou à blesser. Il n’y a pas d’essai « juste pour voir »." },
          { texte: "Je demande à un camarade de fermer à ma place.", pourquoi: "Ce n’est pas plus autorisé : seul le professeur met sous tension." } ],
        confirmation: "On appelle le professeur : il vérifie le travail, puis il décide de la mise sous tension." },

      { type: 'arret',
        texte: "Les contrôles sont faits. <strong>Appelez le professeur</strong> : il regarde votre montage et vos relevés, puis il décide de la mise sous tension. <strong>Ne cochez la case qu’après son accord</strong> : la question suivante ne s’ouvre qu’avec ce visa." },

      { mode: 'seul',
        enonce: "À la première mise sous tension, avec le visa, le moteur tourne à l’envers. Que faites-vous ?",
        methodeVue: "La conduite est écrite au temps 2, à l’étape 7 ; le principe du sens de rotation est dans la station 2.6 (le champ tournant) ; la notice du matériel dit si le sens compte.",
        choix: [
          { texte: "Je continue : le sens n’a aucune importance.", pourquoi: "Cela dépend du matériel : la notice d’un compresseur dit si le sens compte, et certaines l’exigent." },
          { texte: "Je décale les trois fils d’une borne (L1 sur la borne de L2, L2 sur celle de L3, L3 sur celle de L1).", pourquoi: "Décaler les trois fils d’un cran ne change pas le sens de rotation : il faut échanger deux phases." },
          { texte: "Je coupe, je consigne, j’échange deux phases et je recommence.", juste: true },
          { texte: "Je change le neutre de place.", pourquoi: "Le neutre n’intervient pas dans le sens de rotation d’un moteur triphasé." } ],
        confirmation: "On coupe, on consigne, on échange deux phases, puis on refait l’essai." }
    ]
  },

  methode: {
    titre: 'La méthode, dans l’ordre',
    lignes: [
      "<strong>Hors tension</strong>, du début jusqu’au visa du professeur.",
      "<strong>Du plus simple au plus fin</strong> : regarder et tirer, comparer au schéma, mesurer la continuité, puis l’isolement.",
      "<strong>Chaque mesure se lit en trois temps</strong> : le nombre, l’unité, la limite donnée par la fiche ou la notice.",
      "<strong>Arrêt</strong> : le professeur vérifie, puis il décide de la mise sous tension."
    ],
    piege: "Un contrôle ne prouve que ce qu’il mesure. Un fil coupé a un isolement parfait ; un fil qui touche la carcasse a une continuité parfaite. Il faut les deux mesures."
  },
  securite: true,

  /* ---------------------------------------------------------------- temps 4 */
  figurePlan: () => SchemasPratique.mesureSurSchema({
    ohm: 'assets/ohmmetre-h.svg', moteur: 'assets/moteur_tri.svg', terre: 'assets/masse.svg',
    alt: "Schéma de mesure : un appareil dessiné avec le symbole de l’ohmmètre (faute de symbole propre au contrôleur d’isolement), dont une pointe rouge va à une borne du moteur et une pointe noire à la masse, la carcasse du moteur.",
    legende: "Pour la continuité, un ohmmètre, pointes aux deux bouts d’un même fil. Pour l’isolement, un contrôleur d’isolement, pointes sur une borne du moteur et sur sa carcasse (la masse). Ce schéma dessine le contrôleur avec le même cercle que l’ohmmètre, faute de symbole propre : c’est pourtant un autre appareil, qui applique une tension."
  }),

  symboles: [
    { src: 'assets/ohmmetre-h.svg', alt: "Symbole normalisé d’un ohmmètre : un cercle avec la lettre oméga.", legende: "L’ohmmètre : l’appareil qui mesure une résistance" },
    { src: 'assets/moteur_tri.svg', alt: "Symbole normalisé d’un moteur triphasé.", legende: "Le moteur triphasé" },
    { src: 'assets/masse.svg', alt: "Symbole normalisé de la masse, c’est-à-dire de la carcasse métallique.", legende: "La masse : la carcasse métallique" },
    { src: 'assets/terre.svg', alt: "Symbole normalisé de la prise de terre : trois traits de longueur décroissante.", legende: "La prise de terre" },
    { src: 'assets/sectionneur4.svg', alt: "Symbole normalisé d’un sectionneur tripolaire.", legende: "Le sectionneur : ce qu’on ouvre pour être hors tension" }
  ],
  lecturePlan: [
    "Les pointes de l’appareil se posent <strong>sur deux points du schéma</strong> : pour la continuité, les deux bouts d’un même fil ; pour l’isolement, une borne et la masse.",
    "<strong>La terre et la masse</strong> sont deux symboles voisins : trois traits décroissants pour la terre, la carcasse pour la masse (4.8). Ne les confondez pas.",
    "Le <strong>sectionneur ouvert</strong> est ce qui met la platine hors tension : on le retrouve en tête du schéma (3.2)."
  ],

  /* ---------------------------------------------------------------- temps 5 */
  recap: {
    titre: 'Les contrôles : avec quoi, et ce qu’ils ne disent pas',
    corps: () => {
      const lignes = [
        ['assets/biblio/verificateur-absence-tension.png', 'Hors tension', "sectionneur ouvert, absence de tension vérifiée", "que le montage est bon"],
        ['assets/biblio/raccordement-prise-boite.jpeg', 'Aspect et serrage', "yeux, tournevis, traction légère", "que le fil est à la bonne borne"],
        ['assets/biblio/puissance-et-commande.jpeg', 'Schéma et repères', "le schéma, les repères", "que le fil conduit"],
        ['assets/biblio/multimetre-et-ses-sondes.png', 'Continuité', "ohmmètre : proche de 0, OL = coupé", "s’il est bien isolé, ni s’il supporte le courant"],
        ['assets/biblio/moteur-boite-a-bornes.jpeg', 'Isolement', "contrôleur d’isolement : très grand, comparé à la limite", "que le fil conduit"],
        ['assets/biblio/platine-demarrage-direct.jpeg', 'Essai (après visa)', "le professeur, le sens de rotation", "ce qu’on n’a pas contrôlé avant"]
      ];
      const t = document.createElement('table');
      t.innerHTML = '<thead><tr><th></th><th>Contrôle</th><th>Avec quoi</th><th>Ce qu’il ne dit pas</th></tr></thead><tbody>'
        + lignes.map(l => '<tr><td><img src="' + l[0] + '" alt=""></td><td><strong>' + l[1] + '</strong></td><td>' + l[2] + '</td><td>' + l[3] + '</td></tr>').join('') + '</tbody>';
      const d = document.createElement('div'); d.className = 'recap'; d.appendChild(t); return d;
    }
  },

  quiz: [
    { question: "La continuité est parfaite. Pourquoi mesurer quand même l’isolement ?",
      confirmation: "Un fil peut conduire parfaitement et toucher la carcasse : la continuité ne le voit pas.",
      reponses: [
        { texte: "Pour faire plaisir au professeur.", pourquoi: "L’isolement voit un défaut que la continuité ne voit pas : ce n’est pas une formalité." },
        { texte: "Parce que l’appareil de mesure est le même.", pourquoi: "Ce n’est pas la raison : le contrôleur d’isolement est un autre appareil, qui applique une tension." },
        { texte: "Parce qu’un fil coupé a un isolement parfait.", pourquoi: "La continuité est parfaite : le fil n’est donc pas coupé. Ce n’est pas la raison de mesurer l’isolement." },
        { texte: "Parce qu’un fil peut conduire parfaitement et toucher la carcasse.", juste: true } ] },

    { question: "La fiche demande au moins 1 MΩ. Vous lisez 2 MΩ. Que concluez-vous ?",
      confirmation: "2 MΩ est supérieur à la limite de 1 MΩ : l’isolement est suffisant.",
      reponses: [
        { texte: "Insuffisant : 2 est trop loin de zéro.", pourquoi: "Pour l’isolement, on veut une valeur grande : 2 MΩ dépasse la limite." },
        { texte: "Suffisant : 2 MΩ est au-dessus de la limite de 1 MΩ.", juste: true },
        { texte: "Impossible à dire sans mesurer sous tension.", pourquoi: "Jamais sous tension : l’isolement se mesure hors tension." },
        { texte: "Suffisant seulement si c’est écrit en kΩ.", pourquoi: "L’unité ne change pas le verdict : 2 MΩ valent 2 000 kΩ." } ] },

    { question: "Quand fait-on les mesures de continuité et d’isolement ?",
      confirmation: "Hors tension, avant la mise sous tension.",
      reponses: [
        { texte: "Hors tension, avant la mise sous tension.", juste: true },
        { texte: "Sous tension, pour voir si le courant passe.", pourquoi: "Ces mesures envoient leur propre courant de mesure : sous tension, elles sont fausses et dangereuses." },
        { texte: "Pendant le fonctionnement, à chaque heure.", pourquoi: "Ce sont des contrôles hors fonctionnement." },
        { texte: "Seulement si la machine tombe en panne.", pourquoi: "Pas seulement : l’autocontrôle se fait avant la première mise sous tension, panne ou non." } ] },

    { question: "Au plateau technique, qui décide de la mise sous tension ?",
      confirmation: "Le professeur, après avoir vérifié le travail.",
      reponses: [
        { texte: "L’élève, dès qu’il a fini ses contrôles.", pourquoi: "Les contrôles de l’élève ne remplacent pas le regard du professeur." },
        { texte: "Le premier élève à avoir terminé.", pourquoi: "La mise sous tension ne se délègue pas à un camarade." },
        { texte: "Le professeur, après avoir vérifié le travail.", juste: true },
        { texte: "Personne : la platine se met sous tension toute seule.", pourquoi: "Rien ne se met sous tension sans qu’un responsable l’ait décidé." } ] }
  ],

  retenir: [
    "<strong>Hors tension</strong>, du début jusqu’au visa.",
    "On <strong>regarde, on compare au schéma, puis on mesure</strong> : continuité, puis isolement.",
    "Une mesure se lit avec <strong>son unité</strong> et se compare à <strong>la limite de la fiche</strong>.",
    "<strong>Arrêt</strong> : le professeur vérifie, puis il décide de la mise sous tension."
  ],

  liens: [
    { nom: "Câblage virtuel — l’essai de fonctionnement", href: 'https://inerweb.fr/cablage-virtuel/jouer.html?ex=cablage-1-commande', quoi: "S’entraîner à la mise sous tension, sur l’écran, avant la platine : l’exercice existe déjà." },
    { nom: "HoCourant — module M9 : la consignation", href: 'https://inerweb.fr/hocourant/?module=M9', quoi: "Hors tension : à prouver, jamais à supposer." },
    { nom: "Législation — Consigner : VAT, les étapes", href: 'https://inerweb.fr/legislation/stations/elec-consigner/', quoi: "Les cinq opérations : séparer, condamner, identifier, vérifier l’absence de tension, mettre à la terre et en court-circuit si c’est prescrit." },
    { nom: "Capsule « Consigner avant de toucher »", href: 'https://inerweb.fr/packs/fluides/res/capsules/?c=s5', quoi: "Cinq étapes pour ne pas toucher un conducteur sous tension." }
  ],

  objectifs: '<p><strong>Objectif.</strong> Dérouler un autocontrôle électrique avant la mise sous tension — aspect et serrage, conformité au schéma, continuité, isolement — lire une mesure avec son unité et sa limite, et s’arrêter pour le visa du professeur avant la mise sous tension.</p>'
    + '<p><strong>Limites.</strong> Aucune valeur minimale n’est donnée comme règle : la limite d’un isolement se lit sur la notice, dans la procédure de l’entreprise ou, au plateau, sur la fiche du TP (les exercices la fournissent). La consignation est rappelée dans l’ordre (carte « Avant de toucher ») ; sa formation complète est celle d’HoCourant ; l’essai sur l’écran est dans le Câblage virtuel.</p>',

  credits: [
    { quoi: 'Mesure de continuité sur un enroulement', source: 'document de cours « TP DOC TECH 01 »',
      detail: 'base de connaissances inerWeb, empreinte a4398b4fd78b' },
    { quoi: 'Raccordement d’une prise', source: 'document de cours « À faire ou ne pas faire »',
      detail: 'base de connaissances inerWeb, empreinte 012f1fb3fa77' },
    { quoi: 'Notices de compresseurs (sens de rotation, couple de serrage, pas de contrôleur d’isolement sous vide)', source: 'Maneurop, Tandem, Blue Star',
      detail: 'documents du fonds, cités, non reproduits' },
    { quoi: 'Photographies d’appareils (vérificateur d’absence de tension, multimètre, moteur, platine, sectionneur)', source: 'base de connaissances inerWeb et photographies des stations voisines',
      detail: 'documents de cours et catalogues indexés ; droits à confirmer' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/ — rien n’a été redessiné' } ],

  correspondances: [
    { ligne: 1, couleur: '#1b3a63', texte: "1.9 Mesurer", href: '../1-9-mesurer/index.html' },
    { ligne: 4, couleur: '#c0392b', texte: "4.8 La terre et la liaison équipotentielle", href: '../4-8-terre/index.html' },
    { ligne: 5, couleur: '#1e7e54', texte: "5.9 Lire un schéma", href: '../5-9-lire-un-schema/index.html' },
    { ligne: 2, couleur: '#0C4B88', texte: "2.6 Le champ tournant", href: '../2-6-champ-tournant/index.html' },
    { ligne: 8, couleur: '#7c3aed', texte: "8.9 Les repères", href: '../8-9-reperes/index.html' }
  ]
});
