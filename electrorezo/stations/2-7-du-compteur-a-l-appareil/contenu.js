/* ÉlectroRézo 2.7 — Les réseaux électriques d'un site : du compteur à l'appareil.
   Modèle « geste de métier » : on ne présente pas un appareil, on apprend à RECONNAÎTRE
   sur place la chaîne qui amène le courant. Sources : voir SOURCES.md. */

ModelePratique.construire({
  id: '2.7', ligne: 2,
  kicker: 'ÉlectroRézo · Ligne 2 Les réseaux · Station 7',
  titre: "Les réseaux électriques d’un site : du compteur à l’appareil",
  narration: NARRATION,

  prerequis: [
    { id: '1.2', quoi: "la tension" },
    { id: '2.1', quoi: "phase, neutre et protection" },
    { id: '2.3', quoi: "le réseau triphasé" },
  ],

  codes: {
    referentiel: 'CAP IFCA — référentiel de certification',
    lignes: [
      ['Compétence', 'C3.2', "Identifier sur site les réseaux d’alimentation"],
      ['Tâche', 'T10', "Repérer, raccorder, assembler les réseaux fluidiques, aérauliques et électriques"],
      ['Savoir', 'S5.6', "Réseaux, matériels électriques et de régulation"]
    ],
    note: 'Le lien précis entre une tâche et une compétence n’est pas tabulé au référentiel : la tâche est rattachée par son activité (Installation).'
  },

  photos: [
    { src: 'assets/biblio/distribution-logement.png',
      alt: "Schéma de la distribution d’énergie dans une habitation : le compteur, le disjoncteur de branchement, le tableau de répartition avec ses circuits, et la prise de terre.",
      titre: "Du compteur à la prise de terre.", sous: "Un compteur, un disjoncteur de branchement, un tableau, des circuits : le courant passe par là, dans cet ordre." },
    { src: 'assets/biblio/coffret-etiquete.jpg',
      alt: "Coffret électrique ouvert : une rangée d’appareils modulaires, chacun portant une petite étiquette blanche ; deux longues étiquettes sont posées au-dessus.",
      titre: "Sur place, tout porte une étiquette.", sous: "Q1, KM1, S1, H1… Chaque appareil du coffret a son repère, le même que sur le schéma." }
  ],
  creditPhoto: 'Schéma : document de cours. Coffret : photographie de la base de connaissances inerWeb. Détail dans « Crédits ».',

  question: "Un groupe de condensation ne démarre plus, au fond de la cour : par où le courant arrive-t-il jusqu’à lui ?",
  aQuoiCaSert: "Remonter l’alimentation d’un appareil, <strong>de l’appareil jusqu’au compteur</strong>, sans se perdre : savoir quel tableau, quel départ, quel câble. C’est le premier geste avant de brancher, de contrôler ou de dépanner.",
  ouOnLeTrouve: "Chez le client : un compteur et un disjoncteur près de l’entrée, un tableau dans le logement ou le local technique, un coffret à côté du groupe.",

  /* ---------------------------------------------------------------- temps 2 */
  scene: () => SchemasPratique.chaine({
    cas: {
      logement: {
        libelle: 'Un logement',
        legende: 'Dans un logement, en général un seul tableau répartit tout le courant. Touchez chaque étage pour lire son rôle.',
        maillons: [
          { nom: 'Le réseau du distributeur', ou: 'dans la rue, puis un câble qui entre dans le bâtiment',
            quoi: "Il amène l’énergie jusqu’au client. Ce qui est avant le compteur n’est pas à vous : on n’y touche pas.",
            photo: 'assets/biblio/poste-de-distribution.jpeg', alt: "Un poste de distribution sur pylône : le réseau du distributeur arrive par là." },
          { nom: 'Le compteur', ou: 'souvent à l’extérieur du logement',
            quoi: "Il compte l’énergie consommée, en kilowattheures. Il est fourni par le distributeur d’électricité.",
            photo: 'assets/biblio/compteur-linky.jpg', alt: "Un compteur d’énergie électrique." },
          { nom: 'Le disjoncteur de branchement', ou: 'juste après le compteur, en général dans le logement',
            quoi: "Il coupe tout, d’un coup : en cas de court-circuit, ou pour intervenir sur l’installation. Il est lui aussi fourni par le distributeur.",
            photo: 'assets/biblio/disjoncteur-differentiel-hager.jpeg', alt: "Un disjoncteur différentiel, du type du disjoncteur de branchement." },
          { nom: 'Le tableau de répartition', ou: 'dans le logement, dans un placard ou un couloir',
            quoi: "Il répartit l’arrivée entre les circuits du logement. Chaque circuit part d’une protection qui lui est propre. Sa lecture détaillée est en station 4.11.",
            photo: 'assets/biblio/tableau-annote.jpeg', alt: "Un tableau de répartition ouvert, avec ses rangées d’appareils." },
          { nom: 'Le circuit', ou: 'un câble qui part du tableau',
            quoi: "Un départ, une protection, un usage : l’éclairage, les prises, le congélateur. Le câble qui part du tableau porte sa désignation, par exemple 3G2,5.",
            photo: 'assets/biblio/disj-differentiel-c16.png', alt: "Un disjoncteur modulaire : la protection d’un circuit." },
          { nom: 'L’appareil', ou: 'au bout du circuit',
            quoi: "Un congélateur, un chauffe-eau, un climatiseur. Sa plaque donne sa tension et sa puissance (station 1.7).",
            photo: 'assets/biblio/chauffe-eau.jpeg', alt: "Un chauffe-eau électrique." }
        ]
      },
      pro: {
        libelle: 'Un local professionnel',
        legende: 'Dans un grand local, le tableau général est suivi de tableaux divisionnaires : c’est l’étage en plus. Le reste ne change pas.',
        maillons: [
          { nom: 'Le réseau du distributeur', ou: 'câble triphasé, depuis la rue',
            quoi: "Trois phases et un neutre arrivent. Comme chez le particulier, ce qui est avant le compteur n’est pas à vous.",
            photo: 'assets/biblio/poste-de-distribution.jpeg', alt: "Un poste de distribution sur pylône : le réseau triphasé du distributeur." },
          { nom: 'Le compteur', ou: 'dans un coffret ou un local technique',
            quoi: "Il compte l’énergie ; il est fourni par le distributeur.",
            photo: 'assets/biblio/compteur-linky.jpg', alt: "Un compteur d’énergie électrique." },
          { nom: 'L’appareil général', ou: 'en tête de l’installation, juste après le compteur',
            quoi: "Un disjoncteur ou un interrupteur-sectionneur : il coupe toute l’installation du local. C’est le premier endroit où l’on peut tout arrêter.",
            photo: 'assets/biblio/interrupteur-sectionneur-rotatif.jpeg', alt: "Un interrupteur-sectionneur à poignée rotative." },
          { nom: 'Le tableau général', ou: 'local technique, près de l’arrivée',
            quoi: "Il reçoit toute l’arrivée et la distribue : vers des circuits, et vers des tableaux plus petits.",
            photo: 'assets/biblio/tableau-electrique-technicien.png', alt: "Un technicien devant un tableau électrique ouvert." },
          { nom: 'Le tableau divisionnaire', ou: 'plus près de l’usage : l’atelier, la zone froid, un étage',
            quoi: "Un tableau plus petit, alimenté par le tableau général. Il dessert une partie du site seulement. Un groupe froid peut être alimenté depuis un tableau de ce type.",
            photo: 'assets/biblio/coffret-etiquete.jpg', alt: "Un coffret plus petit, alimenté par le tableau général." },
          { nom: 'Le départ', ou: 'un câble qui va du tableau à la machine',
            quoi: "Une protection au tableau, un câble jusqu’à la machine. Le départ est repéré sur le tableau, par exemple Q3, et sur le schéma.",
            photo: 'assets/biblio/disj-differentiel-c16.png', alt: "Un disjoncteur modulaire : la protection du départ." },
          { nom: 'La machine', ou: 'au bout du départ',
            quoi: "Le groupe de condensation, un compresseur, un ventilateur. Sa plaque signalétique donne sa tension et son courant.",
            photo: 'assets/biblio/groupe-froid-condenseur.jpeg', alt: "Un groupe de condensation." }
        ]
      }
    },
    terre: { nom: 'La terre, en parallèle de toute la chaîne',
             quoi: 'Une prise de terre, la borne de terre du tableau, puis un fil vert et jaune jusqu’à la carcasse de chaque appareil. Il ne transporte rien en marche normale (2.1, 4.8).',
             photo: 'assets/biblio/piquet-de-terre.png', alt: "Un piquet de terre enfoncé dans le sol, relié par un fil vert et jaune." }
  }),

  technologie: [
    ["Le branchement", "ce qui amène le courant depuis le réseau du distributeur jusqu’au disjoncteur de branchement, en passant par le compteur. Le compteur et le disjoncteur de branchement sont fournis par le distributeur."],
    ["Le tableau", "un coffret qui reçoit une arrivée et la partage entre des départs. Dans un grand local, un <strong>tableau général</strong> en alimente des <strong>divisionnaires</strong>."],
    ["Le circuit", "un départ, <strong>une protection</strong>, un usage. Chaque circuit a la sienne : c’est ce qui permet de n’en couper qu’un."],
    ["La terre", "elle suit toute la chaîne, jusqu’à la carcasse de chaque appareil, par le fil <strong>vert et jaune</strong>."]
  ],

  variantes: [
    "<strong>Un logement</strong> — un compteur, un disjoncteur de branchement, un tableau de répartition.",
    "<strong>Un petit local professionnel</strong> — même chaîne, souvent en triphasé : trois phases, un neutre, la terre.",
    "<strong>Un grand site</strong> — un tableau général, puis des tableaux divisionnaires, parfois un par zone.",
    "<strong>Un coffret de machine</strong> — tout en bas de la chaîne : l’armoire du groupe froid, avec ses propres repères."
  ],

  /* ---------------------------------------------------------------- temps 3 */
  titres: { objet: 'Sur place', dedans: 'Suivre le courant', variantes: 'Les cas que vous rencontrerez', symboles: 'Les symboles de la chaîne', plan: 'Le lire sur un plan' },

  exercices: {
    titre: 'Reconnaître sur place',
    consigne: 'Un exemple résolu, puis six questions (2 à 7), sans note. Les premières disent où regarder et comment faire ; les dernières, non. Imitez l’exemple.',
    items: [
      { mode: 'exemple',
        enonce: "Sur le coffret, de quelle famille est l’appareil repéré Q1 ?",
        figure: () => photoCoffret(),
        ou: "sur la photo, le petit rectangle blanc collé sur l’appareil tout à gauche.",
        comment: "lisez la lettre, pas le chiffre. Q veut dire « un appareil qui coupe la puissance » (vu en 8.9). Le chiffre ne fait que numéroter.",
        resolu: "Q1 est un disjoncteur : c’est lui qui coupe, en tête du coffret." },

      { mode: 'guide',
        enonce: "Quel repère porte le contacteur ?",
        figure: () => photoCoffret(),
        ou: "sur la même photo, les rectangles blancs collés sur chaque appareil.",
        comment: "cherchez la famille « KM » : c’est la lettre des contacteurs. Vous l’avez vue en 8.9.",
        choix: [
          { texte: "S1", pourquoi: "S est la lettre d’une commande manuelle. S1 est ici un interrupteur ou un sélecteur." },
          { texte: "KM1", juste: true },
          { texte: "H1", pourquoi: "H est la lettre d’un voyant. H1 est une lampe de signalisation." },
          { texte: "P1", pourquoi: "P1 est collé sur l’horloge ronde, pas sur un contacteur." } ],
        confirmation: "KM est la lettre des contacteurs : le repère est KM1." },

      { mode: 'guide',
        enonce: "Quel repère porte le voyant « DEFAUT » ?",
        figure: () => photoCoffret(),
        ou: "au-dessus des voyants, les deux longues étiquettes blanches.",
        comment: "lisez le mot sur l’étiquette longue, puis descendez jusqu’au repère H qui est juste en dessous.",
        choix: [
          { texte: "Q1", pourquoi: "Q1 est le disjoncteur : il n’a pas d’étiquette longue au-dessus." },
          { texte: "H1", pourquoi: "H1 est sous l’étiquette « SOUS TENSION », pas sous « DEFAUT »." },
          { texte: "H2", juste: true },
          { texte: "S2", pourquoi: "S2 est une commande, à droite : aucun mot ne la surmonte." } ],
        confirmation: "H2 est sous l’étiquette « DEFAUT »." },

      { mode: 'guide',
        enonce: "Un câble arrive au groupe froid. Il porte l’inscription 5G2,5. Quel numéro est le neutre ?",
        figure: () => SchemasPratique.coupeCable({
          alt: "Coupe d’un câble à cinq conducteurs : n° 1 marron, n° 2 noir, n° 3 gris, n° 4 bleu clair, n° 5 vert et jaune.",
          legende: "Les cinq conducteurs, numérotés : 1 marron · 2 noir · 3 gris · 4 bleu clair · 5 vert et jaune.",
          conducteurs: [
            { couleur: '#8a5a2b' }, { couleur: '#222b36' }, { couleur: '#8c97a3' },
            { couleur: '#7ec8ee' }, { couleur: '#2f9a4a', rayure: '#f2d21b' } ] }),
        ou: "sur le dessin du câble coupé, les cinq ronds numérotés et leur légende.",
        comment: "« 5G2,5 » veut dire cinq conducteurs de 2,5 mm². Le neutre est le seul <strong>bleu clair</strong> (vu en 2.1).",
        choix: [
          { texte: "Le n° 1, marron.", pourquoi: "Le marron est une couleur de phase." },
          { texte: "Le n° 5, vert et jaune.", pourquoi: "Le vert et jaune est le conducteur de protection, jamais le neutre." },
          { texte: "Le n° 3, gris.", pourquoi: "Le gris est une couleur de phase." },
          { texte: "Le n° 4, bleu clair.", juste: true } ],
        confirmation: "Le bleu clair est réservé au neutre : c’est le n° 4." },

      { mode: 'seul',
        enonce: "Dans ce même câble 5G2,5, combien y a-t-il de conducteurs de phase ?",
        methodeVue: "Vous avez reconnu le neutre (question 4) et le vert et jaune (question 4 et station 2.1).",
        choix: [
          { texte: "Trois.", juste: true },
          { texte: "Deux.", pourquoi: "Deux phases laisseraient un conducteur inexpliqué : avec le neutre et le vert et jaune, il y en a trois." },
          { texte: "Quatre.", pourquoi: "Quatre ne laisserait pas de place au neutre et à la protection : cinq conducteurs au total." },
          { texte: "Cinq.", pourquoi: "Les cinq comprennent aussi le neutre et le conducteur de protection." } ],
        confirmation: "Cinq conducteurs, moins le neutre, moins le vert et jaune : il reste trois phases, le marron, le noir et le gris." },

      { mode: 'seul',
        enonce: "Remettez dans l’ordre, du réseau vers l’appareil : touchez les cinq étiquettes l’une après l’autre.",
        methodeVue: "Suivez le courant, comme sur la scène du temps 2.",
        elements: ["Le compteur", "Le disjoncteur de branchement", "Le tableau", "Le circuit (le départ)", "L’appareil"],
        melange: [3, 0, 4, 2, 1],
        pasJuste: ["Oui : le compteur est la première chose qu’on rencontre après la rue.", "Oui : il coupe tout, juste après le compteur.", "Oui : le tableau répartit l’arrivée.", "Oui : un départ du tableau, avec sa protection.", "Oui : l’appareil est tout au bout."],
        pasFaux: ["Pas celui-là : par quoi le courant passe-t-il d’abord, juste après la rue ?", "Pas celui-là : qu’est-ce qui coupe tout, juste après le compteur ?", "Pas celui-là : qu’est-ce qui répartit l’arrivée entre les circuits ?", "Pas celui-là : qu’est-ce qui part du tableau vers l’appareil ?", "Pas celui-là : qu’y a-t-il tout au bout ?"],
        confirmation: "Compteur, disjoncteur de branchement, tableau, circuit, appareil : c’est l’ordre du courant." },

      { mode: 'seul',
        enonce: "Vous devez travailler sur le groupe froid. L’étiquette « groupe froid » est collée sur le départ Q3. Que faites-vous d’abord ?",
        methodeVue: "Une étiquette se contrôle (message du temps 3). La consignation est décrite dans la carte « Avant de toucher ».",
        choix: [
          { texte: "J’ouvre Q3 et je commence : l’étiquette est claire.", pourquoi: "Une étiquette peut être fausse, et ouvrir un disjoncteur ne prouve rien : il faut contrôler au schéma, puis consigner." },
          { texte: "Je coupe le compteur, comme ça je suis tranquille.", pourquoi: "Le compteur n’est pas à vous : couper l’arrivée du distributeur n’est pas le geste prévu pour travailler sur un départ." },
          { texte: "Je demande au client lequel est le bon.", pourquoi: "Le client n’a pas le schéma. Le contrôle se fait sur le plan de l’installation." },
          { texte: "Je vérifie Q3 sur le schéma, puis je consigne (séparer, condamner, identifier, vérifier l’absence de tension) avant de toucher.", juste: true } ],
        confirmation: "On repère avec l’étiquette, on contrôle au schéma, on consigne dans l’ordre avant de toucher." }
    ]
  },

  methode: {
    titre: 'La méthode, en trois lignes',
    lignes: [
      "<strong>Lire l’étiquette</strong> : la lettre dit la famille de l’appareil, le chiffre le numérote.",
      "<strong>Compter et nommer les conducteurs</strong> : bleu clair, le neutre ; vert et jaune, la protection ; les autres, les phases.",
      "<strong>Suivre le courant</strong> : compteur, disjoncteur de branchement, tableau, circuit, appareil. Toujours dans cet ordre."
    ],
    piege: "Une étiquette peut être fausse. On repère avec elle, on contrôle au schéma, et on consigne avant de toucher (carte « Avant de toucher », juste dessous)."
  },
  securite: true,

  /* ---------------------------------------------------------------- temps 4 */
  symboles: [
    { src: 'assets/compteur_energie.svg', alt: "Symbole normalisé d’un compteur d’énergie.", legende: "Le compteur d’énergie" },
    { src: 'assets/dis_mag_term_3f-1.svg', alt: "Symbole normalisé d’un disjoncteur tripolaire.", legende: "Le disjoncteur" },
    { src: 'assets/coffret_de_repartition1.svg', alt: "Symbole d’un tableau de répartition.", legende: "Le tableau et ses départs" },
    { src: 'assets/moteur_tri.svg', alt: "Symbole normalisé d’un moteur triphasé.", legende: "Le moteur (la machine)" },
    { src: 'assets/terre.svg', alt: "Symbole normalisé de la prise de terre.", legende: "La prise de terre" }
  ],
  lecturePlan: [
    "Sur un plan, <strong>chaque appareil porte un repère</strong> : Q pour ce qui coupe, KM pour un contacteur, M pour un moteur. C’est le même repère que sur l’étiquette du coffret (8.9).",
    "La chaîne se lit <strong>de haut en bas</strong> : l’arrivée en haut, l’appareil en bas.",
    "La terre se dessine à part, et <strong>aucun appareil de coupure</strong> ne se trouve sur le fil de protection (4.8)."
  ],

  /* ---------------------------------------------------------------- temps 5 */
  recap: {
    titre: 'Du compteur à l’appareil : ce qu’on y lit',
    corps: () => {
      const lignes = [
        ['assets/biblio/compteur-linky.jpg', 'Le compteur', "l’énergie, en kWh ; il est fourni par le distributeur"],
        ['assets/biblio/disjoncteur-differentiel-hager.jpeg', 'Le disjoncteur de branchement', "il coupe tout ; en tête de l’installation"],
        ['assets/biblio/tableau-annote.jpeg', 'Le tableau', "les étiquettes : repère + usage de chaque départ"],
        ['assets/biblio/disj-differentiel-c16.png', 'Le circuit', "le calibre sur l’appareil, la désignation sur le câble (3G2,5)"],
        ['assets/biblio/chauffe-eau.jpeg', 'L’appareil', "la plaque : tension, puissance (1.7)"],
        ['assets/biblio/piquet-de-terre.png', 'La terre', "le fil vert et jaune, la barrette de terre du tableau"]
      ];
      const t = document.createElement('table');
      t.innerHTML = '<thead><tr><th></th><th>Étage</th><th>Ce qu’on y lit</th></tr></thead><tbody>'
        + lignes.map(l => '<tr><td><img src="' + l[0] + '" alt=""></td><td><strong>' + l[1] + '</strong></td><td>' + l[2] + '</td></tr>').join('') + '</tbody>';
      const d = document.createElement('div'); d.className = 'recap'; d.appendChild(t); return d;
    }
  },

  quiz: [
    { question: "Qui fournit le compteur d’électricité d’un logement ?",
      confirmation: "Le compteur est fourni par le distributeur d’électricité.",
      reponses: [
        { texte: "L’électricien qui a fait l’installation.", pourquoi: "L’électricien installe le tableau et les circuits, pas le compteur." },
        { texte: "Le distributeur d’électricité.", juste: true },
        { texte: "Le propriétaire du logement.", pourquoi: "Le compteur sert à facturer l’énergie : il n’appartient pas à celui qui la consomme." },
        { texte: "Le fabricant du chauffe-eau.", pourquoi: "Aucun rapport : le compteur est en amont de tous les appareils." } ] },

    { question: "Un câble porte l’inscription 5G2,5. Que lisez-vous ?",
      confirmation: "Cinq conducteurs de 2,5 mm², dont un vert et jaune.",
      reponses: [
        { texte: "Cinq phases de 2,5 ampères.", pourquoi: "2,5 est une section en millimètres carrés, pas un courant ; et le câble contient aussi un neutre et un vert et jaune." },
        { texte: "Deux conducteurs de 5 mm².", pourquoi: "Le premier chiffre compte les conducteurs : cinq ici." },
        { texte: "Un câble de 2,5 mètres, cinq brins.", pourquoi: "Le 2,5 est une section, jamais une longueur." },
        { texte: "Cinq conducteurs de 2,5 mm², dont un vert et jaune.", juste: true } ] },

    { question: "Vous voulez couper le groupe froid. Le départ Q3 porte l’étiquette « groupe froid ». Qu’en concluez-vous ?",
      confirmation: "L’étiquette indique le départ probable : elle se contrôle au schéma avant de travailler.",
      reponses: [
        { texte: "C’est probablement le bon départ, mais je le contrôle au schéma.", juste: true },
        { texte: "C’est certainement le bon : une étiquette ne se trompe jamais.", pourquoi: "Un tableau modifié, un appareil remplacé : l’étiquette peut ne plus suivre." },
        { texte: "Aucun intérêt : un disjoncteur ouvert suffit.", pourquoi: "Ouvrir un disjoncteur ne prouve pas que l’appareil est hors tension." },
        { texte: "Je dois couper le compteur à la place.", pourquoi: "On ne travaille pas sur l’arrivée du distributeur : c’est le départ qu’on repère." } ] },

    { question: "Quelle différence entre un tableau général et un tableau divisionnaire ?",
      confirmation: "Le général reçoit toute l’arrivée ; le divisionnaire, plus petit, dessert une partie du site.",
      reponses: [
        { texte: "Aucune : ce sont deux noms du même coffret.", pourquoi: "Dans un grand local ils sont bien deux : l’un alimente l’autre." },
        { texte: "Le divisionnaire est celui du distributeur.", pourquoi: "Les deux appartiennent à l’installation du client." },
        { texte: "Le général reçoit l’arrivée ; le divisionnaire est alimenté par lui et dessert une partie du site.", juste: true },
        { texte: "Le général ne sert que dans un logement.", pourquoi: "C’est l’inverse : un logement n’a en général qu’un tableau." } ] }
  ],

  retenir: [
    "<strong>Du compteur à l’appareil, dans l’ordre</strong> : compteur, disjoncteur de branchement, tableau, circuit, appareil.",
    "Un tableau <strong>général</strong> en alimente des <strong>divisionnaires</strong>.",
    "Une étiquette <strong>se contrôle au schéma</strong> avant qu’on travaille.",
    "Le fil <strong>vert et jaune</strong> suit toute la chaîne jusqu’à la carcasse."
  ],

  liens: [
    { nom: "Sous tension — TD2 : le tableau électrique", href: 'https://inerweb.fr/sous-tension/sous-tension-TD2-tableau-electrique.html', quoi: "Les fils qu’on trouve à l’intérieur d’un tableau : rigide ou souple, lesquels et pourquoi." },
    { nom: "Législation — NF C 15-100", href: 'https://inerweb.fr/legislation/stations/elec-nf-c-15-100/', quoi: "Ce que dit le texte, et ce que dit la norme, pour le tableau et les circuits." },
    { nom: "HoCourant — module M9 : la consignation", href: 'https://inerweb.fr/hocourant/?module=M9', quoi: "Mettre en sécurité avant de toucher : la procédure complète." },
    { nom: "Capsule « Consigner avant de toucher »", href: 'https://inerweb.fr/packs/fluides/res/capsules/?c=s5', quoi: "Cinq étapes pour ne pas toucher un conducteur sous tension." }
  ],

  objectifs: '<p><strong>Objectif.</strong> Reconnaître, sur un site, la chaîne qui amène le courant jusqu’à un appareil — compteur, disjoncteur de branchement, tableau(x), circuit, terre — et lire les repères, les étiquettes et les couleurs de conducteurs.</p>'
    + '<p><strong>Limites.</strong> La station apprend à <em>reconnaître</em>, pas à dimensionner ni à consigner : le choix de la section est en 4.10, le tableau d’un logement en 4.11. Elle rappelle seulement qui peut intervenir et dans quel ordre on consigne (carte « Avant de toucher ») ; la formation complète est dans HoCourant. Aucune valeur réglementaire n’y est donnée.</p>',

  credits: [
    { quoi: 'Schéma de distribution d’énergie', source: 'document de cours',
      detail: 'base de connaissances inerWeb, « Capture inst.PNG »' },
    { quoi: 'Photographie du coffret étiqueté', source: 'base de connaissances inerWeb',
      detail: 'archives de cours, coffret de commande avec repères Q1, KM1, S1, H1' },
    { quoi: 'Couleurs des conducteurs', source: 'station ÉlectroRézo 2.1',
      detail: 'assets/biblio/couleurs-des-conducteurs.png' },
    { quoi: 'Photographies d’appareils (poste, compteur, disjoncteurs, tableau, sectionneur, chauffe-eau, groupe de condensation, piquet de terre)', source: 'base de connaissances inerWeb et photographies des stations voisines',
      detail: 'documents de cours et catalogues indexés ; droits à confirmer' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/ — rien n’a été redessiné' } ],

  correspondances: [
    { ligne: 2, couleur: '#0C4B88', texte: "2.1 Phase, neutre, PE", href: '../2-1-phase-neutre-pe/index.html' },
    { ligne: 4, couleur: '#c0392b', texte: "4.8 La terre et la liaison équipotentielle", href: '../4-8-terre/index.html' },
    { ligne: 8, couleur: '#7c3aed', texte: "8.9 Les repères", href: '../8-9-reperes/index.html' },
    { ligne: 4, couleur: '#c0392b', texte: "4.11 Le tableau d’un logement", href: '../4-11-tableau-logement/index.html' }
  ]
});

/* La photo du coffret, reprise sous chaque question qui la lit. */
function photoCoffret() {
  const f = document.createElement('figure');
  f.className = 'vignette vignette-ex';
  const i = document.createElement('img');
  i.src = 'assets/biblio/coffret-etiquete.jpg';
  i.alt = "Coffret ouvert : une rangée d’appareils modulaires, chacun portant une petite étiquette blanche ; deux longues étiquettes sont posées au-dessus de certains appareils.";
  f.appendChild(i);
  const c = document.createElement('figcaption');
  c.textContent = 'Le coffret étiqueté. Touchez la photo pour l’agrandir.';
  f.appendChild(c);
  return f;
}
