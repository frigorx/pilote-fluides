/* CartoClim 3.3 — Mural, console, cassette, gainable : choisir l'unité intérieure. Écrite le 02/10/2026. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '3.3', ligne: 3,
  kicker: 'CartoClim · Ligne 3 Les familles · Station 3',
  titre: "Mural, console, cassette, gainable : choisir l’unité intérieure",
  narration: NARRATION,

  prerequis: [
    { id: '3.2', quoi: "le split : deux unités, un circuit" }
  ],

  photos: [
    { src: 'assets/biblio/71a01b35d0.png',
      alt: "Une unité intérieure murale blanche, fixée en haut d’un mur, près d’une fenêtre.",
      titre: "La murale : en haut du mur.", sous: "La forme que tout le monde connaît : elle souffle vers le bas, dans une seule pièce." },
    { src: 'assets/biblio/da01b9c33f.jpg',
      alt: "Une cassette de plafond vue d’en dessous, dans un faux plafond dont des dalles manquent : la dalle carrée blanche de soufflage, et au-dessus le boîtier, deux tubes de cuivre isolés et des câbles.",
      titre: "La cassette : dans le plafond.", sous: "D’habitude, on ne voit que la dalle. Ici des dalles manquent : on découvre le boîtier, les tubes et les câbles." },
    { src: 'assets/biblio/0987a8263b.png',
      alt: "Une unité gainable : un caisson plat, sans façade, avec quatre ouvertures rondes où se raccordent les gaines.",
      titre: "Le gainable : un caisson caché.", sous: "Pas de façade : il vit dans le faux plafond, et des gaines portent l’air jusqu’aux bouches." }
  ],

  titreSert: 'Pourquoi quatre formes ?',
  aQuoiCaSert: "À <strong>choisir la bonne forme</strong> d’unité intérieure. Dans un split, c’est la seule partie que les occupants voient et entendent. On la choisit selon la pièce, la hauteur, le faux plafond, <strong>où va l’eau</strong> et <strong>qui nettoiera les filtres</strong>. Murale, console, cassette, gainable : quatre visages pour la même machine.",
  ouOnLeTrouve: "La <strong>murale</strong> dans une chambre ou un petit bureau ; la <strong>console</strong> là où l’on veut chauffer depuis le sol ; la <strong>cassette</strong> dans une salle de réunion ou un bureau ouvert ; le <strong>gainable</strong> quand le plafond est fait pour tout cacher et que plusieurs bouches doivent servir la pièce.",

  scene: () => ScenesStation.lesQuatreVisages(),

  titreDedans: 'Quatre formes, la même machine',
  technologie: [
    ["Le dedans, toujours le même", "une batterie à ailettes (l’<strong>évaporateur</strong>), une <strong>turbine</strong>, un filtre, un <strong>bac à condensats</strong>, des sondes et la carte électronique. Ce qui change, c’est la <strong>place</strong> de l’unité et le <strong>chemin de l’air</strong>."],
    ["La murale", "fixée <strong>en haut d’un mur</strong>. Elle reprend l’air de la pièce et le souffle vers le bas, par une fente munie de volets. Pour <strong>une pièce</strong>."],
    ["La console", "posée <strong>au sol</strong>, contre un mur, comme un radiateur. Elle souffle vers le haut : l’air chaud monte. On la choisit surtout pour <strong>chauffer</strong>."],
    ["La cassette", "<strong>encastrée dans le plafond</strong> : seule la dalle carrée se voit. Elle reprend l’air au centre et souffle sur <strong>quatre côtés</strong> : une grande pièce, un bureau ouvert. Sa <strong>pompe à condensats</strong> est presque toujours intégrée."],
    ["Le gainable", "<strong>caché dans le faux plafond</strong>. Il souffle dans des <strong>gaines</strong>, vers plusieurs <strong>bouches</strong>. Il demande de la place, et une pression de turbine suffisante pour les gaines."]
  ],

  titreVariantes: 'Comment choisir : cinq questions',
  variantes: [
    "<strong>La pièce</strong> — de taille moyenne : la murale. Grande, ou un bureau ouvert : la cassette. Plusieurs bouches à servir : le gainable. Chauffer surtout : la console.",
    "<strong>La hauteur</strong> — la cassette et le gainable ont besoin de hauteur au-dessus du plafond. Le jet d’une murale ne porte pas à l’infini : plus la pièce est grande, plus le fond est loin.",
    "<strong>Le faux plafond</strong> — sans faux plafond, et sans place pour en faire un, on reste sur la murale ou la console.",
    "<strong>Où va l’eau</strong> — murale et console : un tuyau en pente jusqu’au mur. Cassette : sa pompe. Gainable : une pente, ou une pompe quand la pente manque. Station 4.4.",
    "<strong>Qui nettoiera les filtres</strong> — un filtre qu’on atteint d’un geste est un filtre nettoyé. Une murale s’ouvre d’un geste ; une cassette demande un escabeau ; un gainable, une trappe d’accès. Station 5.3."
  ],
  reglage: "Comme pour tout split : le mode, la consigne et la vitesse de la turbine, depuis la <strong>télécommande</strong> — ou depuis une commande murale quand l’unité est cachée. Sur une murale ou une cassette, on règle aussi l’<strong>orientation des volets</strong>, pour que le jet n’arrive pas droit sur les occupants. Station 5.1.",

  consigneAptitudes: 'La cassette de la salle de réunion : cochez ce qu’elle sait faire, puis validez.',
  titreAptitudes: 'Que sait faire une unité intérieure ?',
  colonnes: [
    { id: 'souffler', libelle: 'Souffler l’air', aide: 'prendre l’air de la pièce, le refroidir ou le chauffer, le renvoyer dans la pièce', dessin: SceneKit.pictos.DESSINS.air },
    { id: 'rejeter',  libelle: 'Rejeter la chaleur', aide: 'dehors : envoyer à l’air extérieur la chaleur prise dans la pièce', dessin: SceneKit.pictos.DESSINS.chaud },
    { id: 'plafond',  libelle: 'Se cacher au plafond', aide: 'se poser dans un faux plafond : il n’en reste que la dalle ou les bouches',
      dessin: '<path d="M8 50 H92 M26 50 V22 H74 V50 M36 66 V84 M36 84 l-6 -9 M36 84 l6 -9 M64 66 V84 M64 84 l-6 -9 M64 84 l6 -9"/>' }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    souffler: true, rejeter: false, plafond: true,
    bonneReponse: 'Exact. La cassette souffle l’air refroidi ou chauffé dans la pièce, et elle se pose dans le faux plafond. Mais elle ne rejette rien dehors : la chaleur prise dans la pièce part par les tubes vers l’unité extérieure.',
    erreurs: {
      souffler: 'C’est le métier de toute unité intérieure, quelle que soit sa forme : prendre l’air de la pièce, le refroidir ou le chauffer, le renvoyer.',
      rejeter: 'Non : rejeter la chaleur dehors, c’est le travail de l’unité extérieure. L’unité intérieure prend la chaleur de la pièce et la confie au fluide ; elle ne la jette nulle part.',
      plafond: 'Oui, pour la cassette comme pour le gainable : l’une s’encastre dans le plafond, l’autre se cache au-dessus. La murale et la console, elles, restent visibles dans la pièce.'
    }
  },

  titreCablage: 'Le raccordement',
  cablage: [
    "<strong>Deux tubes de cuivre</strong> isolés, vers l’unité extérieure : le petit pour le liquide, le gros pour le gaz. Pour une cassette ou un gainable, on les passe avant de refermer le plafond. Stations 3.2 et 4.2.",
    "<strong>Le tuyau de condensats</strong> : en pente jusqu’au mur pour une murale ou une console ; par la pompe pour une cassette ; par une pente ou une pompe pour un gainable. Station 4.4.",
    "<strong>Le câble entre les deux unités</strong>, et la commande : télécommande, ou commande murale quand l’unité est cachée. Station 4.5.",
    "<strong>Les gaines</strong>, pour un gainable : leur calcul, leurs raccords, leurs bouches. C’est le travail d’AéroRézo : station 3.9."
  ],
  piege: "Trois erreurs de choix. Une <strong>murale dans une grande pièce</strong> : le jet n’atteint pas le fond. Un <strong>gainable sans calcul des gaines</strong> : du bruit, et peu d’air aux bouches. Une <strong>cassette dont on ne peut pas atteindre la pompe</strong> : le jour où elle se bloque, il faut ouvrir le plafond.",

  titreSymboles: 'Trois formes, trois symboles',
  symboles: [
    { src: 'assets/split-pared.svg', alt: "Symbole d’une unité intérieure murale : un boîtier allongé, avec sa grille de soufflage en bas.", legende: "Unité intérieure murale" },
    { src: 'assets/cassette.svg', alt: "Symbole d’une cassette de plafond : le boîtier encastré, avec ses raccords sur le côté, posé sur la dalle carrée de soufflage.", legende: "Cassette de plafond" },
    { src: 'assets/split-suelo.svg', alt: "Symbole d’une unité de sol, la console : un boîtier haut posé au sol, avec sa grille sur le dessus et ses raccords en bas.", legende: "Console, posée au sol" }
  ],
  titreLecturePlan: 'Les lire sur un plan',
  lecturePlan: [
    "Sur un plan, l’<strong>unité intérieure</strong> est dessinée dans la pièce qu’elle traite, <strong>à sa vraie place</strong> : en haut d’un mur pour une murale, au sol pour une console, au plafond pour une cassette.",
    "Le <strong>gainable</strong> n’a pas de symbole propre dans la bibliothèque du réseau. On le reconnaît à ce qui l’accompagne : les <strong>gaines</strong> et les <strong>bouches de soufflage</strong> tracées au plafond. Leur calcul relève d’AéroRézo.",
    "Cherchez toujours le <strong>tuyau de condensats</strong> : tracé jusqu’à son évacuation, avec sa pompe si elle existe. S’il manque sur le plan, il manquera sur le chantier.",
    "Le repère courant est <strong>UI</strong>, pour unité intérieure."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Quatre visages, une seule machine',

  quiz: [
    { question: "Une grande salle ouverte, un faux plafond, aucune gaine prévue : quelle unité intérieure choisir ?",
      confirmation: "La cassette : encastrée dans le plafond, elle souffle sur quatre côtés, sans gaine.",
      reponses: [
        { texte: "Une murale.", pourquoi: "Son jet ne porte pas jusqu’au fond d’une grande salle : une partie de la pièce resterait mal servie." },
        { texte: "Une console.", pourquoi: "Posée au sol contre un mur, elle sert surtout à chauffer une zone proche. Elle ne répartit pas l’air dans toute une salle ouverte." },
        { texte: "Un gainable.", pourquoi: "Il faudrait créer et calculer tout un réseau de gaines, alors qu’aucune n’est prévue. La cassette souffle sur quatre côtés sans gaine." },
        { texte: "Une cassette.", juste: true } ] },

    { question: "Pourquoi une cassette a-t-elle presque toujours une pompe à condensats ?",
      confirmation: "Elle est loin du mur, tout en haut : l’eau n’a pas toujours de pente pour s’en aller. La pompe la refoule.",
      reponses: [
        { texte: "Pour refouler l’eau quand la pente manque.", juste: true },
        { texte: "Pour pousser l’air sur ses quatre côtés.", pourquoi: "L’air est brassé par la turbine. La pompe ne s’occupe que de l’eau du bac." },
        { texte: "Pour faire circuler le fluide dans les tubes.", pourquoi: "C’est le compresseur, dans l’unité extérieure, qui fait circuler le fluide." },
        { texte: "Pour refroidir la dalle.", pourquoi: "La dalle n’a rien à refroidir : la pompe évacue seulement l’eau du bac." } ] },

    { question: "Un gainable est posé sans que personne ait calculé les gaines. Que risque-t-on ?",
      confirmation: "Trop de résistance dans les gaines : peu d’air aux bouches, et du bruit.",
      reponses: [
        { texte: "Rien : la turbine s’adapte à toutes les gaines.", pourquoi: "Non : une turbine ne pousse l’air qu’avec une pression limitée. Des gaines trop longues ou trop étroites la dépassent." },
        { texte: "Un air faible aux bouches, et du bruit.", juste: true },
        { texte: "Une fuite de fluide frigorigène.", pourquoi: "Les gaines transportent de l’air, pas du fluide. Le circuit frigorifique n’est pas concerné." },
        { texte: "L’eau du bac ne s’évacue plus.", pourquoi: "L’évacuation de l’eau dépend de la pente ou de la pompe, pas du calcul des gaines." } ] },

    { question: "Pourquoi la console convient-elle bien au chauffage ?",
      confirmation: "Elle est au sol, comme un radiateur : l’air chaud, plus léger, monte et brasse la pièce.",
      reponses: [
        { texte: "Elle chauffe plus fort que les autres.", pourquoi: "Toutes les unités intérieures reçoivent la chaleur du même genre de circuit. Ce qui change, c’est leur place et le chemin de l’air." },
        { texte: "Elle n’a pas besoin d’unité extérieure.", pourquoi: "C’est un split comme les autres : elle a son unité extérieure et ses deux tubes de cuivre." },
        { texte: "Elle est au sol : l’air chaud monte.", juste: true },
        { texte: "Elle est cachée dans le faux plafond.", pourquoi: "Ce sont la cassette et le gainable qui se cachent. La console est posée au sol, bien visible." } ] },

    { question: "Laquelle de ces unités rejette la chaleur dehors ?",
      confirmation: "Aucune : une unité intérieure prend la chaleur de la pièce. C’est l’unité extérieure qui la rejette.",
      reponses: [
        { texte: "La cassette, avec sa pompe.", pourquoi: "La pompe ne s’occupe que de l’eau du bac. La chaleur, elle, part par les tubes de cuivre." },
        { texte: "Le gainable, par ses gaines.", pourquoi: "Les gaines portent l’air vers la pièce, pas la chaleur vers dehors." },
        { texte: "La console, parce qu’elle est au sol.", pourquoi: "Sa place ne change rien : elle prend la chaleur de la pièce, comme les autres." },
        { texte: "Aucune : c’est l’unité extérieure.", juste: true } ] },

    { question: "Une murale est posée dans une grande salle. Que constate-t-on ?",
      confirmation: "Le jet n’atteint pas le fond : une partie de la salle reste mal servie.",
      reponses: [
        { texte: "Le jet n’atteint pas le fond.", juste: true },
        { texte: "Le jet porte plus loin, la salle est grande.", pourquoi: "C’est l’inverse : plus la pièce est grande, plus le fond est loin, et le jet s’essouffle avant." },
        { texte: "L’eau ne sort plus du bac.", pourquoi: "L’eau suit son tuyau en pente : la taille de la salle n’y change rien." },
        { texte: "La murale souffle sur quatre côtés.", pourquoi: "Quatre côtés, c’est la cassette. Une murale souffle d’un seul côté, vers le bas." } ] }
  ],

  retenir: [
    "<strong>Même machine, quatre visages</strong> : ce qui change, c’est la place de l’unité et le chemin de l’air.",
    "<strong>Cinq questions décident</strong> : la pièce, la hauteur, le faux plafond, où va l’eau, qui nettoiera les filtres.",
    "<strong>Cassette et gainable se cachent</strong> dans le faux plafond ; la murale et la console restent dans la pièce.",
    "<strong>Une unité intérieure ne rejette rien dehors</strong> : c’est le travail de l’unité extérieure.",
    "<strong>L’eau doit pouvoir sortir</strong> : en pente, ou par une pompe qu’on peut atteindre."
  ],

  objectifs: '<p><strong>Objectif.</strong> Reconnaître les quatre formes de l’unité intérieure, savoir où chacune se pose, par où elle souffle et où va son eau, et choisir celle qui convient à une pièce.</p><p><strong>Limite.</strong> Aucune puissance, aucun débit, aucune dimension n’est donné ici : ils viennent de la notice de l’appareil et du calcul de l’installation. Le calcul des gaines relève d’AéroRézo.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs. Deux photographies ont été rognées ou retouchées (marque du fabricant estompée) ; toute image signalée sera remplacée.' },
    { quoi: 'Symboles', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' } ],

  correspondances: [
    { ligne: 3, couleur: '#6B5FB5', texte: "3.2 Le split : deux unités, un circuit", url: lien('3.2') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.4 Le multisplit : plusieurs pièces", url: lien('3.4') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.9 Lire une CTA : l’air et les conduits (AéroRézo)", url: lien('3.9') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.4 Les condensats : pente, siphon, pompe", url: lien('4.4') },
    { ligne: 5, couleur: '#B06A00', texte: "5.3 L’entretien : filtres, batteries, bac", url: lien('5.3') } ]
});
