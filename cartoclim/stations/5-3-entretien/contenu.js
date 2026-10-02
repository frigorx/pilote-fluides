/* CartoClim 5.3 — L'entretien : filtres, batteries, bac à condensats. Écrite le 02/10/2026 sur le moule de la
   station étalon 3.2. Station-TÂCHE : on suit une visite d'entretien, point par point, plutôt qu'un objet.
   Aucun rythme d'entretien, aucune pression, aucune température : tout cela vient de la notice et de la
   réglementation. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '5.3', ligne: 5,
  kicker: 'CartoClim · Ligne 5 Exploiter · Station 3',
  titre: "L’entretien : filtres, batteries, bac à condensats",
  narration: NARRATION,

  prerequis: [
    { id: '3.2', quoi: "le split : les deux unités et ce qu’il y a dedans" },
    { id: '4.4', quoi: "les condensats : d’où vient l’eau, et où elle part" }
  ],

  titres: { decouvrir: 'La visite', comprendre: 'Ce qu’il faut savoir', manipuler: 'Le geste', representer: 'Sur la fiche' },

  creditPhoto: 'Photographie : base de connaissances inerWeb. Détail dans « Crédits ».',
  photos: [
    { src: 'assets/biblio/200d7774b1.jpg',
      alt: "Deux mains gantées ouvrent la façade d’une unité intérieure murale blanche. Deux filtres en grille sombre apparaissent derrière, et l’une des mains tient un flacon pulvérisateur.",
      titre: "On ouvre la façade.", sous: "Derrière, les filtres : le seul point que l’utilisateur nettoie lui-même. Plus loin, la batterie." }
  ],

  titreSert: 'La situation',
  aQuoiCaSert: "Un client appelle : « ça refroidit moins », « ça givre devant », « ça coule au plafond ». Presque toujours, la machine n’est pas cassée : elle est <strong>encrassée</strong>. Un climatiseur brasse de l’air, et l’air porte de la poussière. Tout ce qui passe se dépose quelque part : sur le <strong>filtre</strong>, sur les <strong>batteries</strong>, dans le <strong>bac</strong> où l’eau doit s’écouler. <strong>Entretenir</strong>, c’est garder ces points propres et ouverts, pour que la machine garde son air, son échange de chaleur et son écoulement d’eau.",
  ouOnLeTrouve: "Sur tout split : chez le particulier, au bureau, dans un petit commerce. Deux personnes s’en occupent. <strong>L’utilisateur</strong> lave ses filtres. <strong>Le technicien</strong> fait tout le reste, pendant une visite dont le rythme est écrit dans la notice, dans la réglementation ou dans le contrat d’entretien — jamais au hasard.",

  scene: () => ScenesStation.lesSixPoints(),

  titreDedans: 'Les six points',
  technologie: [
    ["1 · Le filtre", "une grille à l’entrée de l’unité intérieure : elle arrête la poussière de la pièce avant la batterie. C’est le <strong>seul point que l’utilisateur nettoie lui-même</strong>. Bouché, il étouffe le débit d’air : la batterie reçoit moins de chaleur et <strong>givre</strong>."],
    ["2 · La batterie intérieure", "l’<strong>évaporateur</strong>, juste derrière le filtre. Ce que le filtre laisse passer se colle entre ses ailettes : l’air passe mal et l’échange de chaleur baisse. Le technicien la nettoie, <strong>sans écraser les ailettes</strong>."],
    ["3 · Le bac et le tuyau de condensats", "l’eau de l’air tombe dans le bac et part par le tuyau, jusqu’à dehors. Bouchés, ils débordent : <strong>l’eau coule au plafond</strong> du client. Le technicien verse de l’eau dans le bac et regarde si elle sort ; s’il y a une pompe de relevage, il vérifie qu’elle démarre."],
    ["4 · La turbine", "la roue qui aspire l’air de la pièce et le pousse à travers la batterie. Poussiéreuse, elle brasse moins d’air, fait du bruit et vibre. Le technicien la nettoie et vérifie sa fixation."],
    ["5 · La batterie extérieure", "le <strong>condenseur</strong>, balayé par l’hélice. Feuilles, poussière, pollen : l’air ne passe plus, la <strong>haute pression monte</strong>, la machine consomme plus et finit par se mettre en sécurité. On la nettoie à l’eau à basse pression ou au peigne à ailettes, <strong>jamais au jet puissant droit sur les ailettes</strong>."],
    ["6 · Les liaisons et les fixations", "l’isolant des deux tubes doit être entier, les unités bien fixées, les câbles bien serrés sur leurs borniers, les points d’oxydation traités. Et l’unité extérieure doit avoir de l’air libre autour d’elle, avec un accès qui permette encore de la nettoyer."]
  ],

  titreVariantes: 'Les cas particuliers',
  variantes: [
    "<strong>Pompe de relevage</strong> — quand l’eau ne peut pas s’écouler par la pente, une pompe la relève : elle se contrôle aussi. Station 4.4.",
    "<strong>Une autre forme d’unité intérieure</strong> — cassette, gainable, console : le filtre ne se trouve pas au même endroit que sur un mural. La notice dit où. Station 3.3.",
    "<strong>Les sondes</strong> — la carte lit l’air et la batterie par des sondes : elles doivent être bien raccordées et bien en contact avec l’échangeur, au besoin avec de la pâte de contact, sinon la machine lit faux. Station 5.2.",
    "<strong>Plus grand qu’un split</strong> — sur une centrale de traitement d’air, ce sont les mêmes points en plus grand. Voyez, chez AéroRézo, la station « Mélange et filtration »."
  ],

  consigneAptitudes: 'Un split posé depuis un an. Cochez ce qu’il peut être, puis validez.',
  titreAptitudes: 'Bien entretenu ?',
  colonnes: [
    { id: 'filtres', libelle: 'Entretien partagé', aide: 'être entretenu en partie par l’utilisateur, qui lave les filtres à poussière', dessin: ScenesStation.icones.filtre },
    { id: 'sans',    libelle: 'Sans entretien', aide: 'se passer d’entretien, tourner des années sans que personne n’y touche', dessin: ScenesStation.icones.duree },
    { id: 'ouvert',  libelle: 'Ouvert à tous', aide: 'être ouvert côté fluide par n’importe qui, sans attestation', dessin: ScenesStation.icones.cadenas }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    filtres: true, sans: false, ouvert: false,
    bonneReponse: 'Exact. L’utilisateur lave ses filtres ; tout le reste — batteries, bac, turbine, mesures — revient au technicien. Et la machine ne se passe pas d’entretien : sans lui, elle consomme plus et refroidit moins, puis finit par givrer, couler ou se couper. Quant au circuit du fluide, il ne s’ouvre pas sans attestation.',
    erreurs: {
      filtres: 'Si : les filtres à poussière sont la part de l’utilisateur. Il les lave, ou les change si c’est nécessaire ; la notice dit comment.',
      sans: 'Aucune machine ne tourne longtemps sans entretien. Elle ne tombe pas en panne tout de suite, et c’est le piège : la poussière étouffe l’air, l’eau finit par déborder, la machine consomme de plus en plus.',
      ouvert: 'Toucher au circuit du fluide demande une attestation : ce n’est pas l’affaire de l’utilisateur. Les gestes décrits ici ne l’ouvrent pas. Voyez la Législation.'
    }
  },

  titreCablage: 'Dans l’ordre',
  cablage: [
    "<strong>On arrête l’appareil et on coupe son alimentation</strong> avant d’ouvrir un capot. La procédure suit la réglementation en vigueur sur le site.",
    "<strong>On regarde avant de nettoyer</strong> : filtres, ailettes, bac, isolant des liaisons. Ce qu’on voit est déjà un résultat à écrire.",
    "<strong>Dedans, d’abord</strong> : les filtres, la batterie, la turbine, puis le bac et son tuyau. On verse de l’eau dans le bac et on regarde si elle sort ; avec une pompe de relevage, on la fait démarrer.",
    "<strong>Dehors, ensuite</strong> : on dégage l’unité, on nettoie la batterie à l’eau à basse pression ou au peigne à ailettes, on vérifie les fixations, le serrage des câbles et les points d’oxydation.",
    "<strong>On remet en marche et on mesure</strong> : température de l’air à la reprise et au soufflage, surchauffe, sous-refroidissement, intensité. <strong>Chaque mesure s’écrit avec ses conditions</strong>, la température extérieure en premier : sans elles, on ne la compare à rien. Les deux mesures du fluide : station 5.4.",
    "<strong>Lire une pression, c’est brancher un manomètre sur le circuit</strong> : seule une personne attestée le fait. Quand la réglementation l’impose, le contrôle d’étanchéité vient en plus : station 4.6.",
    "<strong>On écrit la fiche et le carnet</strong> : ce qu’on a vu, mesuré et fait. Le rythme des prochaines visites vient de la notice et de la réglementation, pas de l’habitude."
  ],
  piege: "<strong>Nettoyer n’est pas décaper.</strong> Les ailettes sont en aluminium, fines : un jet puissant droit dessus les couche, un produit agressif les ronge, et l’air passe encore plus mal qu’avant. Eau à basse pression, peigne à ailettes, produit prévu par la notice et rincé : on nettoie sans abîmer. Et les points oubliés se reconnaissent à leur signe : <strong>givre et air faible</strong> (filtre), <strong>haute pression élevée</strong> (batterie extérieure), <strong>eau au plafond</strong> (bac ou tuyau).",

  titreSymboles: 'Les symboles de la fiche d’entretien',
  symboles: [
    { src: 'assets/split-pared.svg', alt: "Symbole d’une unité intérieure murale de climatiseur : un boîtier allongé avec sa grille de soufflage.", legende: "Unité intérieure : filtre, batterie, turbine, bac" },
    { src: 'assets/ud-exte-split.svg', alt: "Symbole d’une unité extérieure de climatiseur : un boîtier avec son hélice et ses deux raccords.", legende: "Unité extérieure : batterie, hélice, fixations" }
  ],
  titreLecturePlan: 'Lire une fiche d’entretien',
  lecturePlan: [
    "Une fiche d’entretien reprend les <strong>deux unités</strong>, et pour chacune la liste des points à regarder : filtres, batterie, bac et turbine pour l’<strong>unité intérieure</strong> ; batterie, hélice et fixations pour l’<strong>unité extérieure</strong>. Les repères courants : <strong>UI</strong> et <strong>UE</strong>.",
    "À côté de chaque point, on écrit <strong>ce qu’on a vu et ce qu’on a fait</strong> : encrassé, nettoyé, rien à signaler.",
    "Une fiche vaut par ses <strong>mesures et leurs conditions</strong> : l’air à la reprise et au soufflage, la surchauffe, le sous-refroidissement, l’intensité, avec la température extérieure du moment. D’une visite à la suivante, un écart qui grandit annonce l’encrassement bien avant la panne.",
    "La <strong>périodicité n’est pas sur le dessin</strong> : elle vient de la notice, du contrat et de la réglementation. Le contrôle d’étanchéité, quand il est imposé, a sa propre fiche : station 4.6."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Qui fait quoi, et ce que l’on voit quand on l’oublie',

  quiz: [
    { question: "Que fait l’utilisateur lui-même, sans le technicien ?",
      confirmation: "Il lave les filtres de l’unité intérieure : c’est sa part. Tout le reste revient au technicien.",
      reponses: [
        { texte: "Il nettoie la batterie extérieure au jet.", pourquoi: "Dehors, la batterie demande de la méthode : un jet puissant couche les ailettes. C’est le travail du technicien." },
        { texte: "Il contrôle la charge en fluide.", pourquoi: "Le circuit du fluide ne s’ouvre pas sans attestation : ce n’est pas l’affaire de l’utilisateur." },
        { texte: "Il lave les filtres de l’unité intérieure.", juste: true },
        { texte: "Il resserre les câbles sur les borniers.", pourquoi: "Ce geste est électrique : il faut couper et ouvrir la machine. Il revient au technicien." } ] },

    { question: "Une batterie intérieure est couverte de givre alors que la machine refroidit, et l’air sort faiblement. Que regardez-vous en premier ?",
      confirmation: "Le filtre : un givre complet vient d’abord d’un manque d’air.",
      reponses: [
        { texte: "Le tuyau de condensats.", pourquoi: "S’il est bouché, c’est de l’eau qui déborde, pas du givre. Le givre vient d’abord d’un manque d’air." },
        { texte: "La télécommande.", pourquoi: "La télécommande envoie un ordre ; elle ne fait pas givrer la batterie." },
        { texte: "L’isolant des liaisons.", pourquoi: "Il habille les tubes entre les deux unités : il n’a aucun rapport avec l’air qui traverse la batterie intérieure." },
        { texte: "Le filtre.", juste: true } ] },

    { question: "La haute pression est élevée et la machine consomme plus que d’habitude. Où regardez-vous d’abord ?",
      confirmation: "La batterie extérieure : feuilles et poussière l’étouffent, l’air ne passe plus et la chaleur ne part plus.",
      reponses: [
        { texte: "La batterie extérieure.", juste: true },
        { texte: "Les filtres de l’unité intérieure.", pourquoi: "Un filtre bouché prive la batterie intérieure d’air : il donne du givre et un faible débit, pas une haute pression." },
        { texte: "La télécommande.", pourquoi: "Elle n’agit sur aucune pression : elle envoie seulement un ordre." },
        { texte: "Le bac à condensats.", pourquoi: "Un bac plein donne de l’eau au plafond, pas une haute pression." } ] },

    { question: "De l’eau coule au plafond, sous l’unité intérieure. Quel point est en cause ?",
      confirmation: "Le bac ou le tuyau de condensats : l’eau de l’air ne sort plus.",
      reponses: [
        { texte: "La batterie extérieure.", pourquoi: "Elle est dehors et ne produit pas d’eau côté pièce." },
        { texte: "Le bac ou le tuyau de condensats.", juste: true },
        { texte: "La turbine.", pourquoi: "Encrassée, elle brasse moins d’air et vibre ; elle ne fait pas couler d’eau." },
        { texte: "Les fixations de l’unité extérieure.", pourquoi: "Elles tiennent l’unité dehors ; elles n’ont aucun lien avec l’eau du plafond." } ] },

    { question: "Comment nettoie-t-on les ailettes de la batterie extérieure ?",
      confirmation: "À l’eau à basse pression ou au peigne à ailettes : les ailettes sont fines et ne supportent ni le jet puissant ni le produit agressif.",
      reponses: [
        { texte: "Au jet haute pression, de près, pour aller vite.", pourquoi: "Un jet puissant droit sur les ailettes les couche : l’air passe encore plus mal." },
        { texte: "Avec un produit décapant puissant.", pourquoi: "Les ailettes sont en aluminium, fines : un produit agressif les ronge. On emploie ce que la notice prévoit." },
        { texte: "À l’eau à basse pression ou au peigne à ailettes.", juste: true },
        { texte: "On ne les nettoie pas : le vent s’en charge.", pourquoi: "Feuilles et poussière s’y collent : sans nettoyage, l’air ne passe plus et la haute pression monte." } ] },

    { question: "Qui peut ouvrir le circuit du fluide pendant une visite d’entretien ?",
      confirmation: "Une personne qui a l’attestation : toute intervention sur le circuit du fluide lui est réservée.",
      reponses: [
        { texte: "Personne : on n’y touche jamais.", pourquoi: "Le technicien attesté y intervient quand il le faut, pour lire une pression par exemple. L’attestation encadre l’intervention, elle ne l’interdit pas à tous." },
        { texte: "L’utilisateur, si l’appareil est à lui.", pourquoi: "Être propriétaire ne suffit pas : il faut l’attestation pour toucher au circuit." },
        { texte: "N’importe qui, avec le bon outil.", pourquoi: "L’outil ne remplace pas l’attestation : sans elle, on ne touche pas au circuit." },
        { texte: "Une personne qui a l’attestation.", juste: true } ] }
  ],

  retenir: [
    "<strong>Le filtre, c’est l’utilisateur</strong> ; les batteries, le bac, la turbine et les mesures, c’est le technicien.",
    "<strong>Chaque point oublié a son signe</strong> : givre et air faible (filtre), haute pression élevée (batterie extérieure), eau au plafond (bac ou tuyau).",
    "<strong>Nettoyer sans abîmer</strong> : eau à basse pression ou peigne à ailettes, jamais de jet puissant droit sur les ailettes.",
    "<strong>On mesure, on écrit, on compare</strong> : une mesure sans ses conditions ne se compare à rien.",
    "<strong>Le rythme des visites vient de la notice et de la réglementation</strong> ; le circuit du fluide ne s’ouvre pas sans attestation."
  ],

  objectifs: '<p><strong>Objectif.</strong> Nommer les six points d’entretien d’un split, dire ce que chacun provoque quand on l’oublie, savoir qui fait quoi, et suivre une visite dans l’ordre.</p><p><strong>Limite.</strong> Aucun rythme d’entretien, aucune pression, aucune température n’est donné ici : ils viennent de la notice, du contrat et de la réglementation. L’attestation, le contrôle d’étanchéité et les deux mesures du fluide (surchauffe et sous-refroidissement) ont leurs propres stations.</p>',

  credits: [
    { quoi: 'Photographie', source: 'base de connaissances inerWeb',
      detail: 'document de cours indexé, trouvé par outils/chercher-images.mjs — toute image signalée sera remplacée' },
    { quoi: 'Symboles', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' },
    { quoi: 'Dessin des six points et pictogrammes', source: 'dessins originaux inerWeb', detail: 'schéma de principe écrit pour cette station : ce ne sont pas des symboles de la bibliothèque' } ],

  correspondances: [
    { ligne: 3, couleur: '#6B5FB5', texte: "3.2 Le split : deux unités, un circuit", url: lien('3.2') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.4 Les condensats : pente, siphon, pompe", url: lien('4.4') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.6 L’étanchéité — de l’indice à la preuve", url: lien('4.6') },
    { ligne: 5, couleur: '#B06A00', texte: "5.2 Le régulateur électronique", url: lien('5.2') },
    { ligne: 5, couleur: '#B06A00', texte: "5.4 Surchauffe et sous-refroidissement", url: lien('5.4') } ]
});
