/* ÉlectroRézo 4.11 — Le tableau d'un logement : protections, circuits, différentiels.
   Modèle « geste de métier » : on apprend à LIRE un tableau existant avant d'y raccorder
   un appareil. Ni dimensionnement (4.10), ni câblage (Câblage virtuel), ni les fils d'un
   tableau (Sous tension TD2) : on renvoie. Sources : voir SOURCES.md. */

ModelePratique.construire({
  id: '4.11', ligne: 4,
  kicker: 'ÉlectroRézo · Ligne 4 Protéger · Station 11',
  titre: "Le tableau d’un logement : protections, circuits, différentiels",
  narration: NARRATION,
  sansMp3: true,   /* aucun MP3 fabriqué (feu vert à part) : retirer cette ligne quand voix/ sera remplie */

  prerequis: [
    { id: '2.7', quoi: "du compteur à l’appareil" },
    { id: '4.3', quoi: "le disjoncteur magnéto-thermique" },
    { id: '4.5', quoi: "l’interrupteur différentiel" },
    { id: '4.8', quoi: "la terre" },
  ],

  codes: {
    referentiel: 'Bac Pro MFER 2028 — référentiel de certification',
    lignes: [
      ['Savoir', 'S3.5.1', "Les circuits électriques du bâtiment"],
      ['Tâche', 'A1T2', "Analyser et exploiter les données techniques d’une installation"],
      ['Tâche', 'A2T4', "Câbler, raccorder les équipements électriques"]
    ],
    note: 'Le savoir S3.5.1 est l’objet de la station (il dépend de S3.5 « l’élaboration des plans et schémas électriques »). Les deux tâches sont celles qu’elle prépare : lire un tableau avant d’y raccorder un appareil.'
  },

  photos: [
    { src: 'assets/biblio/tableau-etiquete-cuisine.jpeg',
      alt: "Rangée de disjoncteurs d’un tableau, avec au-dessus des étiquettes illustrées : plaque cuisson, four, lave-vaisselle, réfrigérateur, prise de courant, éclairage. Sur chaque appareil, la courbe et le calibre sont gravés.",
      titre: "Un tableau qui se lit.", sous: "Au-dessus de chaque disjoncteur, l’usage ; sur l’appareil, la courbe et le calibre." },
    { src: 'assets/biblio/tableau-annote.jpeg',
      alt: "Tableau de logement ouvert, annoté : bornier de raccordement, départs vers le disjoncteur de branchement, peigne, interrupteur différentiel, disjoncteurs divisionnaires, rails, départs des circuits, bornier de terre.",
      titre: "Dans le coffret.", sous: "Chaque pièce a sa place : borniers, peignes, différentiels, disjoncteurs, rails, barrette de terre." }
  ],
  creditPhoto: 'Photographies et schémas : base de connaissances inerWeb, documents de cours. Détail dans « Crédits ».',

  question: "Vous devez raccorder un chauffe-eau ou une pompe à chaleur chez un client : que lisez-vous dans son tableau avant de brancher quoi que ce soit ?",
  aQuoiCaSert: "Lire un tableau existant avant d’y raccorder un appareil : <strong>quel circuit, quelle protection, quel différentiel</strong>. La station apprend à lire. Elle ne dimensionne pas (4.10) et ne refait pas le tableau.",
  ouOnLeTrouve: "Dans le logement du client : un coffret en plastique blanc avec une porte, dans le couloir, le garage ou un placard.",

  /* ---------------------------------------------------------------- temps 2 */
  scene: () => SchemasPratique.tableau({
    branchement: { nom: 'Le disjoncteur de branchement', ou: 'en tête, fourni par le distributeur', photo: 'assets/biblio/disjoncteur-differentiel-hager.jpeg',
                   alt: "Un disjoncteur différentiel, du type du disjoncteur de branchement." },
    rangees: [
      { id: { nom: 'Interrupteur différentiel 30 mA', photo: 'assets/biblio/differentiel-30ma.jpeg', alt: "Un interrupteur différentiel 30 mA avec son bouton test." },
        departs: [
          { id: 'eclairage', nom: 'Éclairage', photo: 'assets/biblio/plafonnier.png', alt: "Un plafonnier." },
          { id: 'prises', nom: 'Prises', photo: 'assets/biblio/prises-murales.jpeg', alt: "Une rangée de prises murales." },
          { id: 'congelateur', nom: 'Congélateur', photo: 'assets/biblio/congelateur-armoire.png', alt: "Une armoire congélatrice." } ] },
      { id: { nom: 'Interrupteur différentiel 30 mA', photo: 'assets/biblio/differentiel-30ma.jpeg', alt: "Un interrupteur différentiel 30 mA avec son bouton test." },
        departs: [
          { id: 'chauffe-eau', nom: 'Chauffe-eau', photo: 'assets/biblio/chauffe-eau.jpeg', alt: "Un chauffe-eau électrique." },
          { id: 'pac', nom: 'Pompe à chaleur', photo: 'assets/biblio/pompe-a-chaleur.jpeg', alt: "Une pompe à chaleur, unité extérieure et ballon." },
          { id: 'clim', nom: 'Climatiseur', photo: 'assets/biblio/climatiseur.jpg', alt: "Un climatiseur, unité intérieure et unité extérieure." } ] }
    ],
    etats: [
      { id: 'sain', libelle: 'Tout va bien',
        legende: 'Tout est alimenté. Chaque circuit a son disjoncteur ; chaque rangée a son interrupteur différentiel. Touchez un défaut pour voir ce qui s’éteint.',
        ouvre: { differentiels: [], departs: [] } },
      { id: 'cc', libelle: 'Court-circuit sur le chauffe-eau',
        legende: 'Seul le départ du chauffe-eau s’ouvre : le défaut est sur ce circuit, et rien d’autre ne s’éteint.',
        ouvre: { differentiels: [], departs: ['chauffe-eau'] } },
      { id: 'fuite', libelle: 'Fuite à la terre sur le congélateur',
        legende: 'C’est l’interrupteur différentiel de la rangée qui s’ouvre : tout ce qui est derrière lui s’éteint, l’éclairage et les prises compris. L’autre rangée reste alimentée.',
        ouvre: { differentiels: [0], departs: [] } }
    ]
  }),

  technologie: [
    ["Le disjoncteur de branchement", "en tête, fourni par le distributeur. Sa sensibilité est de 500 mA (document de cours) : il protège l’installation tout entière."],
    ["L’interrupteur différentiel", "il protège les personnes : il compare le courant qui part et celui qui revient, et coupe quand il en manque. Sur l’appareil, deux nombres : le <strong>calibre</strong> en ampères (A) et la <strong>sensibilité</strong> en milliampères (mA). Un <strong>bouton test</strong> simule un défaut."],
    ["Les disjoncteurs divisionnaires", "un par circuit. Sur l’appareil : la <strong>courbe</strong> (B, C ou D) et le <strong>calibre</strong> en ampères. Par exemple <strong>C 20</strong> : courbe C, 20 ampères (4.3)."],
    ["Les peignes et les borniers", "le peigne est la barrette qui distribue la phase aux modules ; un bornier pour le neutre, un bornier vert pour tous les fils vert et jaune (la terre)."],
    ["Les étiquettes", "chaque départ porte son usage (et un repère sur les plans). Un tableau sans étiquette est un tableau incomplet : il faut alors tout reconnaître soi-même."]
  ],

  variantes: [
    "<strong>Une rangée ou plusieurs</strong> — un logement plus grand a plusieurs rangées, chacune derrière son différentiel.",
    "<strong>Type AC ou type A</strong> — le type A détecte aussi les fuites continues pulsées (pas le continu lisse) ; le document de cours le prévoit pour la plaque de cuisson et le lave-linge.",
    "<strong>Disjoncteurs ou fusibles</strong> — un tableau ancien peut porter des fusibles (3.4) et pas de différentiel : cela se constate, et cela se signale.",
    "<strong>Les circuits dédiés</strong> — un appareil important (plaque, chauffe-eau, pompe à chaleur) a son circuit à lui."
  ],

  /* ---------------------------------------------------------------- temps 3 */
  titres: { objet: 'Un tableau, sur place', dedans: 'Qui s’éteint, quand ?', variantes: 'Ce que vous rencontrerez', symboles: 'Le tableau sur un plan', plan: 'Le lire sur un plan' },

  exercices: {
    titre: 'Lire le tableau d’un client',
    consigne: 'Six questions, la plupart sur photos, sans note. Les premières disent où regarder et comment faire ; les dernières, non. La première est déjà résolue : imitez-la.',
    items: [
      { mode: 'exemple',
        enonce: "Quel est le calibre du disjoncteur de la plaque de cuisson ?",
        figure: () => photo('assets/biblio/tableau-etiquete-cuisine.jpeg',
          "Rangée de disjoncteurs d’un tableau : au-dessus de chacun, une étiquette illustrée qui dit l’usage ; sur chaque appareil, la courbe et le calibre.",
          'Le tableau étiqueté. Touchez la photo pour l’agrandir.'),
        ou: "sur la photo, l’étiquette « plaque cuisson » tout à gauche, puis l’appareil juste en dessous.",
        comment: "lisez la lettre puis le nombre inscrits sur la face de l’appareil. La lettre est la courbe, le nombre est le courant en ampères (4.3).",
        resolu: "C 32 : courbe C, 32 ampères." },

      { mode: 'guide',
        enonce: "Quel est le calibre du disjoncteur du four ?",
        figure: () => photo('assets/biblio/tableau-etiquete-cuisine.jpeg',
          "Rangée de disjoncteurs d’un tableau : au-dessus de chacun, une étiquette illustrée qui dit l’usage ; sur chaque appareil, la courbe et le calibre.",
          'Le même tableau. Touchez la photo pour l’agrandir.'),
        ou: "sur la même photo, l’étiquette « four » (la deuxième) et l’appareil juste en dessous.",
        comment: "même geste que dans l’exemple : le nombre qui suit la lettre C.",
        choix: [
          { texte: "10 A.", pourquoi: "10 A est le calibre du dernier disjoncteur à droite, celui de l’éclairage." },
          { texte: "16 A.", pourquoi: "Aucun disjoncteur de cette rangée n’est en 16 A : le « 16AX » est la référence du dernier module, pas un calibre de four." },
          { texte: "20 A.", juste: true },
          { texte: "32 A.", pourquoi: "32 A est le calibre du premier disjoncteur, celui de la plaque de cuisson." } ],
        confirmation: "C 20 : courbe C, 20 ampères." },

      { mode: 'guide',
        enonce: "Quel circuit est protégé par le disjoncteur C 10 ?",
        figure: () => photo('assets/biblio/tableau-etiquete-cuisine.jpeg',
          "Rangée de disjoncteurs d’un tableau : au-dessus de chacun, une étiquette illustrée qui dit l’usage ; sur chaque appareil, la courbe et le calibre.",
          'Le même tableau. Touchez la photo pour l’agrandir.'),
        ou: "cherchez le disjoncteur où est écrit C 10, puis remontez à l’étiquette qui est juste au-dessus.",
        comment: "lisez l’image et le mot de l’étiquette : c’est l’usage du circuit.",
        choix: [
          { texte: "La plaque de cuisson.", pourquoi: "La plaque est au-dessus du C 32, tout à gauche." },
          { texte: "Le four.", pourquoi: "Le four est au-dessus d’un C 20." },
          { texte: "La prise de courant.", pourquoi: "La prise de courant est au-dessus d’un C 20." },
          { texte: "L’éclairage de l’entrée.", juste: true } ],
        confirmation: "Le C 10 est sous l’étiquette « éclairage » de l’entrée." },

      { mode: 'guide',
        enonce: "Sur cet interrupteur différentiel, quelle est la sensibilité, et quel est le calibre ?",
        figure: () => photo('assets/biblio/differentiel-a-lire.png',
          "Interrupteur différentiel annoté de flèches rouges, avec à sa droite trois disjoncteurs : deux nombres sont écrits sur la face du différentiel.",
          'Un interrupteur différentiel. Touchez la photo pour l’agrandir.'),
        ou: "sur la photo, la face de l’interrupteur différentiel (le plus large, à gauche) : deux nombres y sont écrits.",
        comment: "le nombre suivi de « mA » est la sensibilité ; le nombre suivi de « A » seul est le calibre (la photo l’appelle « intensité nominale » : c’est le même nombre).",
        choix: [
          { texte: "Sensibilité 40 mA, calibre 30 A.", pourquoi: "Inversé : « mA » suit le 30, « A » suit le 40." },
          { texte: "Sensibilité 30 mA, calibre 40 A.", juste: true },
          { texte: "Sensibilité 16 A, calibre 10 A.", pourquoi: "16 A et 10 A sont les calibres des disjoncteurs à côté, pas ceux du différentiel." },
          { texte: "Sensibilité 30 A, calibre 40 mA.", pourquoi: "Une sensibilité se compte en milliampères, pas en ampères." } ],
        confirmation: "30 mA de sensibilité, 40 A de calibre." },

      { mode: 'seul',
        enonce: "Un tableau a un seul interrupteur différentiel pour six circuits. Une fuite à la terre apparaît sur un seul appareil. Qu’arrive-t-il ?",
        methodeVue: "Revoyez la scène du temps 2 : « fuite à la terre sur le congélateur ».",
        choix: [
          { texte: "Le différentiel s’ouvre : les six circuits s’éteignent.", juste: true },
          { texte: "Seul le circuit de cet appareil s’éteint.", pourquoi: "C’est ce que ferait le disjoncteur d’un circuit en cas de court-circuit. Ici c’est le différentiel qui coupe, et il est en amont des six." },
          { texte: "Rien ne coupe : une fuite n’est pas dangereuse.", pourquoi: "C’est justement ce que le différentiel est chargé de voir : une fuite met des personnes en danger." },
          { texte: "Le disjoncteur de branchement s’ouvre.", pourquoi: "Sa sensibilité de 500 mA est bien plus haute : c’est le différentiel de 30 mA, plus bas, qui voit la fuite en premier." } ],
        confirmation: "Le différentiel s’ouvre, et tout ce qui est derrière lui s’éteint." },

      { mode: 'seul',
        enonce: "Vous devez raccorder un chauffe-eau. Quelle est la première chose à lire dans le tableau ?",
        methodeVue: "Vous savez lire un circuit (questions 1 à 3) et un différentiel (question 4). Ce qu’on lit d’abord est écrit au temps 1, « À quoi ça sert » : quel circuit, quelle protection, quel différentiel.",
        choix: [
          { texte: "Le plus gros calibre du tableau, pour brancher dessus.", pourquoi: "Un appareil ne se branche pas sur le plus gros calibre : sa protection protège son câble (4.10)." },
          { texte: "La marque du tableau, pour commander une pièce.", pourquoi: "La marque n’apprend rien sur le circuit ni sur la protection." },
          { texte: "S’il y a un circuit libre pour cet appareil, ce qui le protège, et si un différentiel 30 mA est en amont.", juste: true },
          { texte: "Le nombre de prises du salon.", pourquoi: "Un chauffe-eau a son propre circuit ; les prises du salon n’ont rien à voir." } ],
        confirmation: "Un circuit disponible, sa protection, le différentiel en amont : voilà ce qu’on lit d’abord." }
    ]
  },

  methode: {
    titre: 'La méthode, en trois lignes',
    lignes: [
      "<strong>L’étiquette</strong> dit l’usage. La lettre suivie du nombre, <strong>sur l’appareil</strong>, dit la courbe et le calibre.",
      "<strong>Deux nombres sur le différentiel</strong> : en mA, la sensibilité ; en A, le calibre.",
      "<strong>Un défaut, qui coupe ?</strong> Un court-circuit : le disjoncteur du circuit seul. Une fuite : le différentiel, et tout son groupe."
    ],
    piege: "Ne branchez rien sur un circuit dont vous ne savez pas lire la protection. Et pour travailler, ouvrir un disjoncteur ne suffit pas : consignation d’abord (carte « Avant de toucher », juste dessous)."
  },
  securite: true,

  /* ---------------------------------------------------------------- temps 4 */
  symboles: [
    { src: 'assets/ddr3.svg', alt: "Symbole normalisé d’un disjoncteur différentiel.", legende: "Le disjoncteur de branchement" },
    { src: 'assets/int_diff2.svg', alt: "Symbole normalisé d’un interrupteur différentiel : deux lames reliées par un trait pointillé et un ovale aplati qui entoure les deux conducteurs.", legende: "L’interrupteur différentiel" },
    { src: 'assets/dis_mag_term_2f-1.svg', alt: "Symbole normalisé d’un disjoncteur magnéto-thermique, phase et neutre.", legende: "Le disjoncteur d’un circuit" },
    { src: 'assets/prise_fiche.svg', alt: "Symbole d’une prise de courant.", legende: "Une prise" },
    { src: 'assets/plaque_cuisson.svg', alt: "Symbole d’une plaque de cuisson.", legende: "Une plaque de cuisson" },
    { src: 'assets/chauffe_eau.svg', alt: "Symbole d’un chauffe-eau.", legende: "Un chauffe-eau" }
  ],
  lecturePlan: [
    "Le tableau se dessine <strong>par ses protections, dans l’ordre</strong> : le disjoncteur de branchement, puis chaque interrupteur différentiel, puis les disjoncteurs.",
    "L’<strong>ovale aplati</strong> qui entoure les deux conducteurs est le signe du différentiel : il compare le courant qui part et celui qui revient.",
    "Chaque départ <strong>se termine par le symbole de ce qu’il alimente</strong>, avec son repère, qui l’identifie sur le plan (8.9)."
  ],

  /* ---------------------------------------------------------------- temps 5 */
  recap: {
    titre: 'Un tableau, de haut en bas : ce qu’on y lit',
    corps: () => {
      const lignes = [
        ['assets/biblio/disjoncteur-differentiel-hager.jpeg', 'Le disjoncteur de branchement', "sensibilité 500 mA (document de cours) : il protège l’installation"],
        ['assets/biblio/differentiel-30ma.jpeg', 'L’interrupteur différentiel', "calibre en A, sensibilité en mA, bouton test : il protège les personnes"],
        ['assets/biblio/disjoncteurs-modulaires.jpg', 'Le disjoncteur d’un circuit', "courbe et calibre : C 20, courbe C et 20 ampères"],
        ['assets/biblio/tableau-etiquete-cuisine.jpeg', 'Le circuit', "l’étiquette dit l’usage : plaque, four, prises, éclairage"],
        ['assets/biblio/piquet-de-terre.png', 'La terre', "tous les fils vert et jaune y arrivent"]
      ];
      const t = document.createElement('table');
      t.innerHTML = '<thead><tr><th></th><th>Pièce</th><th>Ce qu’on y lit</th></tr></thead><tbody>'
        + lignes.map(l => '<tr><td><img src="' + l[0] + '" alt=""></td><td><strong>' + l[1] + '</strong></td><td>' + l[2] + '</td></tr>').join('') + '</tbody>';
      const d = document.createElement('div'); d.className = 'recap'; d.appendChild(t); return d;
    }
  },

  quiz: [
    { question: "À quoi sert l’interrupteur différentiel 30 mA d’un tableau de logement ?",
      confirmation: "Il protège les personnes : il coupe quand une fuite à la terre apparaît.",
      reponses: [
        { texte: "À protéger les câbles contre la surcharge.", pourquoi: "C’est le travail du disjoncteur de chaque circuit." },
        { texte: "À mesurer la consommation du logement.", pourquoi: "C’est le compteur qui mesure, pas le différentiel." },
        { texte: "À protéger les personnes contre les fuites à la terre.", juste: true },
        { texte: "À empêcher les coupures de courant.", pourquoi: "Au contraire : il coupe, pour qu’un défaut ne blesse personne." } ] },

    { question: "Un seul circuit s’éteint, tous les autres restent alimentés. Quel appareil s’est ouvert ?",
      confirmation: "Le disjoncteur de ce circuit, sur surcharge ou court-circuit.",
      reponses: [
        { texte: "Le disjoncteur de ce circuit.", juste: true },
        { texte: "Le disjoncteur de branchement.", pourquoi: "S’il s’ouvrait, tout le logement s’éteindrait." },
        { texte: "L’interrupteur différentiel de la rangée.", pourquoi: "S’il s’ouvrait, tous les circuits de la rangée s’éteindraient, pas un seul." },
        { texte: "Le compteur.", pourquoi: "Le compteur ne coupe rien : il compte." } ] },

    { question: "Sur un disjoncteur, vous lisez C 20. Que veut dire le 20 ?",
      confirmation: "20 ampères : le courant assigné du disjoncteur ; le C est sa courbe.",
      reponses: [
        { texte: "20 milliampères de sensibilité.", pourquoi: "La sensibilité est une affaire de différentiel, et se compte en mA." },
        { texte: "20 mètres de câble.", pourquoi: "Aucune longueur n’est écrite sur un disjoncteur." },
        { texte: "20 volts.", pourquoi: "La tension du logement est de 230 V : le 20 est un courant." },
        { texte: "20 ampères.", juste: true } ] },

    { question: "À quoi sert le bouton test d’un interrupteur différentiel ?",
      confirmation: "Il simule un défaut : le différentiel doit déclencher quand on appuie.",
      reponses: [
        { texte: "À remettre le courant après une coupure.", pourquoi: "Pour rétablir le courant, on relève le levier, pas le bouton test." },
        { texte: "À simuler un défaut : le différentiel doit déclencher.", juste: true },
        { texte: "À mesurer la tension du réseau.", pourquoi: "Le différentiel n’a pas de fonction de mesure de tension." },
        { texte: "À couper le compteur.", pourquoi: "Le bouton test n’agit que sur le différentiel." } ] }
  ],

  retenir: [
    "<strong>Un disjoncteur par circuit</strong> : il protège le câble, et lui seul s’ouvre.",
    "<strong>Un différentiel par groupe de circuits</strong> : il protège les personnes, et coupe tout son groupe.",
    "Sur l’appareil : <strong>courbe et calibre</strong> (C 20) ; sur le différentiel : <strong>A et mA</strong>.",
    "Avant de brancher : <strong>un circuit disponible, sa protection, le différentiel en amont</strong>."
  ],

  liens: [
    { nom: "Sous tension — TD2 : le tableau électrique", href: 'https://inerweb.fr/sous-tension/sous-tension-TD2-tableau-electrique.html', quoi: "Les fils d’un tableau : rigide ou souple. On n’y refait pas la leçon : on y renvoie." },
    { nom: "Législation — NF C 15-100", href: 'https://inerweb.fr/legislation/stations/elec-nf-c-15-100/', quoi: "Ce que dit le texte et ce que dit la norme sur le tableau, les circuits et les différentiels." },
    { nom: "Législation — Terre et différentiel", href: 'https://inerweb.fr/legislation/stations/elec-terre-differentiel/', quoi: "Pourquoi 30 mA, et ce que compare un différentiel." },
    { nom: "Câblage virtuel", href: 'https://inerweb.fr/cablage-virtuel/', quoi: "Pour s’entraîner à câbler : l’exercice existe déjà." },
    { nom: "HoCourant — module M9 : la consignation", href: 'https://inerweb.fr/hocourant/?module=M9', quoi: "Mettre en sécurité avant de toucher." }
  ],

  objectifs: '<p><strong>Objectif.</strong> Lire le tableau d’un logement : l’usage de chaque départ, la courbe et le calibre de chaque disjoncteur, la sensibilité et le calibre d’un différentiel, et savoir ce qui s’éteint en cas de court-circuit ou de fuite.</p>'
    + '<p><strong>Limites.</strong> La station apprend à <em>lire</em> un tableau existant. Elle ne donne aucune règle de dimensionnement (4.10 et NF C 15-100), ne traite pas les fils d’un tableau (Sous tension, TD2) ni le câblage (Câblage virtuel). Les calibres de la photo sont des valeurs <em>lues</em>, pas des prescriptions. Elle rappelle seulement qui peut intervenir et dans quel ordre on consigne (carte « Avant de toucher ») ; la formation complète est dans HoCourant.</p>',

  credits: [
    { quoi: 'Tableau étiqueté (disjoncteurs)', source: 'base de connaissances inerWeb',
      detail: 'ressources de cours « Électricité », empreinte f8952e0ea94f' },
    { quoi: 'Tableau annoté (bornier, peigne, rails…)', source: 'document de cours « tableau électrique »',
      detail: 'base de connaissances inerWeb, empreinte 91aca4291604' },
    { quoi: 'Interrupteur différentiel annoté', source: 'document de cours « TP2 atelier élec »',
      detail: 'base de connaissances inerWeb, empreinte eb0971962524' },
    { quoi: 'Photographies d’appareils (disjoncteurs, différentiel, plafonnier, prises, congélateur, chauffe-eau, pompe à chaleur, climatiseur)', source: 'base de connaissances inerWeb',
      detail: 'documents de cours et catalogues indexés ; droits à confirmer' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/ — rien n’a été redessiné' } ],

  correspondances: [
    { ligne: 4, couleur: '#c0392b', texte: "4.3 Disjoncteur magnéto-thermique", href: '../4-3-disjoncteur-magneto-thermique/index.html' },
    { ligne: 4, couleur: '#c0392b', texte: "4.5 L’interrupteur différentiel", href: '../4-5-interrupteur-differentiel/index.html' },
    { ligne: 4, couleur: '#c0392b', texte: "4.10 Choisir la section", href: '../4-10-choisir-section/index.html' },
    { ligne: 2, couleur: '#0C4B88', texte: "2.7 Du compteur à l’appareil", href: '../2-7-du-compteur-a-l-appareil/index.html' }
  ]
});

/* Une photo reprise sous la question qui la lit (touchée, elle s'agrandit : station.js). */
function photo(src, alt, legende) {
  const f = document.createElement('figure');
  f.className = 'vignette vignette-ex';
  const i = document.createElement('img');
  i.src = src; i.alt = alt; i.loading = 'lazy';
  f.appendChild(i);
  const c = document.createElement('figcaption');
  c.textContent = legende;
  f.appendChild(c);
  return f;
}
