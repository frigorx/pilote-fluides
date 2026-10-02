/* CartoClim 2.3 — Rotatif et scroll : les compresseurs de la clim. Écrite le 02/10/2026. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '2.3', ligne: 2,
  kicker: 'CartoClim · Ligne 2 La machine · Station 3',
  titre: "Rotatif et scroll : les compresseurs de la clim",
  narration: NARRATION,

  prerequis: [
    { id: '2.1', quoi: "le circuit frigorifique : où se trouve le compresseur, et ce qu’il y fait" }
  ],

  photos: [
    { src: 'assets/biblio/a3fdab605a.jpeg',
      alt: "Un compresseur rotatif de climatiseur : une coque noire cylindrique avec deux tubes de cuivre, et collée à elle une petite bouteille cylindrique noire.",
      titre: "Le rotatif : une coque noire, deux tubes.", sous: "À côté, la petite bouteille retient le liquide qui n’aurait pas fini de s’évaporer." },
    { src: 'assets/biblio/166fe7fd3f.jpeg',
      alt: "Un compresseur scroll ouvert en coupe : dans une coque ronde bleue, le moteur électrique et, au-dessus, les deux spirales.",
      titre: "Le scroll, ouvert en coupe.", sous: "Une seule coque soudée enferme le moteur et les deux spirales." }
  ],

  aQuoiCaSert: "À <strong>mettre le fluide en mouvement et en pression</strong> : le compresseur aspire le gaz froid qui sort de l’évaporateur et le refoule chaud, sous haute pression, vers le condenseur. Il <strong>ne fabrique pas le froid</strong>, mais sans lui rien ne circule. On rencontre surtout deux compresseurs, sans piston qui monte et descend : le <strong>rotatif</strong> et le <strong>scroll</strong>.",
  ouOnLeTrouve: "Le <strong>rotatif</strong> équipe le plus souvent les petits splits et les monoblocs. Le <strong>scroll</strong> équipe les splits de forte puissance, les DRV, les roof-top et les pompes à chaleur. Qu’il soit l’un ou l’autre, on ne voit de lui que sa coque noire et ses tubes : le mécanisme est caché dedans.",

  scene: () => ScenesStation.compresseurs(),

  technologie: [
    ["La coque", "une coque ronde <strong>soudée</strong> — on dit <strong>hermétique</strong> — enferme le moteur électrique et le mécanisme. Aucun arbre ne sort : il n’y a pas de joint tournant, donc pas de fuite à cet endroit. En contrepartie, la coque ne s’ouvre pas et le compresseur ne se répare pas."],
    ["L’huile", "au fond de la coque, le <strong>carter</strong> contient l’huile. Elle <strong>lubrifie</strong>, <strong>refroidit</strong> et ferme les petits jeux entre les pièces. Elle voyage un peu avec le gaz et doit <strong>revenir</strong> au carter : un retour d’huile défaillant use le compresseur."],
    ["Le rotatif", "un <strong>rouleau</strong>, monté sur un arbre excentré, roule le long de la paroi d’un <strong>cylindre</strong>. Une <strong>palette</strong>, poussée par un ressort, reste appuyée sur lui et sépare le côté aspiration du côté refoulement. Un <strong>clapet</strong> laisse sortir le gaz comprimé."],
    ["Le scroll", "deux <strong>spirales</strong> emboîtées : une <strong>fixe</strong>, une <strong>mobile</strong> qui orbite — son centre décrit un petit cercle, sans qu’elle tourne sur elle-même. Entre les deux, des poches de gaz glissent du pourtour vers le centre en rétrécissant ; le gaz sort par le centre."]
  ],

  variantes: [
    "<strong>Le rotatif</strong> — compact et économique en petite puissance, mais limité en puissance : on le trouve dans les petits splits et les monoblocs. La palette, qui frotte, est sa pièce d’usure.",
    "<strong>Le scroll</strong> — très silencieux, peu de vibrations, peu de pièces mobiles : il est très répandu en climatisation et en pompe à chaleur. En contrepartie, il est sensible aux coups de liquide.",
    "<strong>La vitesse variable</strong> — l’un comme l’autre peut tourner à vitesse variable : l’Inverter fait varier la vitesse au lieu d’arrêter et de relancer le compresseur. C’est la station 2.4.",
    "<strong>Le piston et la vis</strong> — les deux autres compresseurs du froid : le piston, très répandu en froid commercial, et la vis, pour les grandes puissances. La planche <a href=\"https://inerweb.fr/packs/fluides/res/svg/compresseurs-comparatif.svg\">« Quatre compresseurs, une même fonction »</a> les compare avec ces deux-là."
  ],
  reglage: "Le compresseur lui-même ne se règle pas : c’est la carte de l’appareil qui le démarre, l’arrête et, s’il est à vitesse variable, fixe sa vitesse (station 2.4). Ses protections se règlent selon la fiche du constructeur, jamais à l’estime.",

  consigneAptitudes: 'Un compresseur de climatiseur, rotatif ou scroll : cochez ce qu’il sait faire, puis validez.',
  titreAptitudes: 'Que sait faire un compresseur ?',
  colonnes: [
    { id: 'comprimer', libelle: 'Comprimer un gaz', aide: 'aspirer le gaz froid, le refouler chaud et sous pression',
      dessin: '<path d="M8 50 h26 M24 38 l12 12 l-12 12 M92 50 h-26 M76 38 l-12 12 l12 12"/><circle cx="50" cy="50" r="8"/>' },
    { id: 'liquide', libelle: 'Aspirer du liquide', aide: 'laisser entrer du fluide liquide, sans dommage',
      dessin: '<path d="M50 6 C 32 32, 24 48, 34 64 C 41 74, 59 74, 66 64 C 76 48, 68 32, 50 6 Z"/><path d="M14 88 q9 -8 18 0 t18 0 t18 0 t18 0"/>' },
    { id: 'vitesse', libelle: 'Régler sa vitesse', aide: 'accélérer ou ralentir tout seul, selon le besoin',
      dessin: '<path d="M12 74 A38 38 0 0 1 88 74"/><path d="M50 74 L70 40"/><path d="M26 52 l5 4 M50 36 v7 M74 52 l-5 4"/>' }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    comprimer: true, liquide: false, vitesse: false,
    bonneReponse: 'Exact. Il aspire un gaz froid et le refoule chaud, sous haute pression : c’est son seul métier. Il ne supporte pas le liquide, qui ne se comprime pas et fait casser les pièces. Et il ne change pas de vitesse tout seul : c’est la commande de l’appareil qui le décide, avec l’Inverter.',
    erreurs: {
      comprimer: 'C’est son seul métier : aspirer le gaz froid de l’évaporateur et le refouler chaud, sous haute pression, vers le condenseur.',
      liquide: 'Non : un gaz se laisse écraser, un liquide garde son volume. Du liquide à l’aspiration, c’est le coup de liquide, et le compresseur casse. Il ne doit recevoir que du gaz.',
      vitesse: 'Non : un compresseur ne règle pas sa vitesse tout seul. C’est la commande de l’appareil qui la fait varier, grâce à l’Inverter — station 2.4.'
    }
  },

  titreCablage: 'Le raccordement',
  cablage: [
    "<strong>Deux tubes</strong> : l’<strong>aspiration</strong>, par où le gaz froid arrive de l’évaporateur, et le <strong>refoulement</strong>, par où le gaz chaud repart vers le condenseur. On ne les intervertit pas.",
    "<strong>L’alimentation électrique</strong> du moteur, avec ses protections, réglées selon la fiche du constructeur : station 4.5 pour l’alimentation de l’appareil.",
    "<strong>L’huile</strong> : son niveau se contrôle au voyant, quand il y en a un, et son <strong>retour au carter</strong> se vérifie à chaque visite. Sur l’aspiration, la pente des tubes et les siphons y veillent.",
    "<strong>La pose</strong> : sur des plots antivibratiles, pour que le compresseur ne transmette pas ses vibrations aux tubes, qui ne doivent subir aucune contrainte."
  ],
  piege: "<strong>Le coup de liquide.</strong> Un liquide ne se comprime pas : s’il arrive à l’aspiration, les pièces encaissent le choc et cassent. Il vient d’un fluide qui n’a pas fini de s’évaporer ; on le prévient en surveillant la surchauffe (station 5.4). <br><strong>Et un compresseur chaud au toucher n’est pas forcément en défaut</strong> : il refoule un gaz chaud. On ne conclut pas avec la main, mais avec les mesures et la fiche du constructeur.",

  symboles: [
    { src: 'assets/compresseurrotatif.svg', alt: "Symbole d’un compresseur rotatif : un cercle traversé de deux traits obliques, avec un petit rond et un court trait à l’intérieur.", legende: "Compresseur rotatif" },
    { src: 'assets/compresseurscroll.svg', alt: "Symbole d’un compresseur scroll : un cercle traversé de deux traits obliques, avec une petite spirale à l’intérieur.", legende: "Compresseur scroll" }
  ],
  titreLecturePlan: 'Le lire sur un schéma',
  lecturePlan: [
    "Sur un schéma frigorifique, le compresseur est un <strong>cercle traversé de deux traits obliques</strong>. Ce cercle est le même pour toutes les technologies ; c’est le petit dessin à l’intérieur qui dit laquelle : un <strong>petit rond</strong> pour le rotatif, une <strong>spirale</strong> pour le scroll.",
    "Il se place <strong>entre les deux échangeurs</strong> : le gaz arrive de l’<strong>évaporateur</strong> à l’aspiration, et repart chaud vers le <strong>condenseur</strong> au refoulement. Station 2.1.",
    "Sur le compresseur lui-même, la <strong>plaque signalétique</strong> donne ses caractéristiques. On s’y réfère, jamais à un chiffre appris par cœur."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Rotatif ou scroll : deux mécanismes, un même rôle',

  quiz: [
    { question: "Que fait le compresseur dans un climatiseur ?",
      confirmation: "Il aspire le gaz froid qui sort de l’évaporateur et le refoule chaud, sous haute pression, vers le condenseur.",
      reponses: [
        { texte: "Il fabrique le froid.", pourquoi: "Le froid vient de l’évaporation du fluide dans l’évaporateur. Le compresseur met seulement le fluide en mouvement et en pression." },
        { texte: "Il aspire le gaz froid et le refoule chaud, sous haute pression.", juste: true },
        { texte: "Il transforme le gaz en liquide.", pourquoi: "C’est le travail du condenseur. Le compresseur comprime un gaz, et ce gaz en ressort chaud, toujours gazeux." },
        { texte: "Il règle la température de la pièce.", pourquoi: "C’est la carte de l’appareil, avec ses sondes, qui règle. Le compresseur obéit : il démarre, il s’arrête." } ] },

    { question: "Quel compresseur équipe le plus souvent un petit split ?",
      confirmation: "Un rotatif. Le scroll est plutôt pour les gros splits, les DRV, les roof-top et les pompes à chaleur.",
      reponses: [
        { texte: "Un compresseur à piston.", pourquoi: "On n’en trouve en général pas dans un climatiseur : ce sont le rotatif et le scroll qui y règnent." },
        { texte: "Un scroll de grande taille.", pourquoi: "Le scroll se trouve plutôt sur les splits de forte puissance, les DRV, les roof-top et les pompes à chaleur." },
        { texte: "Un rotatif.", juste: true },
        { texte: "Un moteur seul.", pourquoi: "Un moteur ne comprime rien : il entraîne le mécanisme du compresseur, rouleau ou spirales, enfermé avec lui dans la coque." } ] },

    { question: "Que fait la spirale mobile d’un scroll ?",
      confirmation: "Elle décrit un petit cercle sans tourner sur elle-même : c’est ce mouvement qui pousse les poches vers le centre.",
      reponses: [
        { texte: "Elle tourne sur elle-même, comme une hélice.", pourquoi: "Elle ne pivote pas : elle garde la même orientation, et c’est son centre qui décrit un petit cercle." },
        { texte: "Elle monte et descend, comme un piston.", pourquoi: "Il n’y a aucun va-et-vient dans un scroll : le mouvement est un petit cercle, continu, sans à-coup." },
        { texte: "Elle reste immobile, c’est la spirale fixe qui bouge.", pourquoi: "C’est l’inverse : la spirale fixe ne bouge pas, et la mobile orbite." },
        { texte: "Elle décrit un petit cercle sans tourner sur elle-même.", juste: true } ] },

    { question: "À quoi sert la palette d’un compresseur rotatif ?",
      confirmation: "Elle s’appuie sur le rouleau et sépare le côté aspiration du côté refoulement.",
      reponses: [
        { texte: "À séparer le côté aspiration du côté refoulement.", juste: true },
        { texte: "À faire tourner l’arbre.", pourquoi: "C’est le moteur qui fait tourner l’arbre. La palette coupe seulement l’espace en deux." },
        { texte: "À racler l’huile sur la paroi.", pourquoi: "L’huile est au fond de la coque, la palette n’y touche pas : elle appuie sur le rouleau, poussée par son ressort." },
        { texte: "À ouvrir le clapet de refoulement.", pourquoi: "Le clapet s’ouvre tout seul quand la pression du gaz comprimé est assez haute. La palette ne le commande pas." } ] },

    { question: "Un compresseur est chaud au toucher. Est-il en défaut ?",
      confirmation: "Pas forcément : il refoule un gaz chaud. On conclut avec les mesures et la fiche du constructeur, pas avec la main.",
      reponses: [
        { texte: "Oui : un compresseur sain reste froid.", pourquoi: "Il refoule un gaz chaud : même en marche normale, il est chaud. Le toucher ne dit rien d’un défaut." },
        { texte: "Pas forcément : il refoule un gaz chaud.", juste: true },
        { texte: "Oui, c’est toujours un manque d’huile.", pourquoi: "La chaleur seule ne prouve pas un manque d’huile. L’huile se vérifie à son niveau et à son retour au carter." },
        { texte: "Oui, il faut le remplacer tout de suite.", pourquoi: "On ne remplace pas un compresseur sur une impression de la main. On mesure, et on compare à la fiche du constructeur." } ] },

    { question: "Que provoque du liquide à l’aspiration d’un compresseur ?",
      confirmation: "Un coup de liquide : un liquide ne se comprime pas, et les pièces encaissent le choc.",
      reponses: [
        { texte: "Rien : il comprime aussi bien le liquide que le gaz.", pourquoi: "Un gaz se laisse écraser, un liquide non : il garde son volume. Le compresseur ne comprime que du gaz." },
        { texte: "Un meilleur rendement.", pourquoi: "Aucun gain : le liquide ne se comprime pas, et ce sont les pièces qui encaissent." },
        { texte: "Un coup de liquide : un liquide ne se comprime pas, la pièce casse.", juste: true },
        { texte: "Un peu de bruit, sans danger.", pourquoi: "Ce n’est pas sans danger : le liquide ne se comprime pas, et le compresseur peut casser." } ] }
  ],

  retenir: [
    "<strong>Un compresseur ne fabrique pas le froid</strong> : il aspire un gaz froid et le refoule chaud, sous haute pression.",
    "<strong>Rotatif : un rouleau et une palette. Scroll : deux spirales, une fixe, une qui orbite.</strong>",
    "<strong>Jamais de liquide à l’aspiration</strong> : un liquide ne se comprime pas.",
    "<strong>L’huile doit revenir au carter</strong>, et un compresseur chaud au toucher n’est pas forcément en défaut."
  ],

  objectifs: '<p><strong>Objectif.</strong> Reconnaître un compresseur rotatif et un compresseur scroll, comprendre comment chacun comprime le gaz, et savoir ce qu’il ne supporte pas.</p><p><strong>Limite.</strong> Le piston et la vis, la vitesse variable (Inverter) et la pose d’un compresseur sont traités ailleurs. Aucune valeur de pression, de température ou d’intensité n’est donnée ici : elles viennent de la plaque et de la fiche du constructeur.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'deux images de documents de cours indexés, trouvées par outils/chercher-images.mjs — toute image signalée sera remplacée' },
    { quoi: 'Symboles', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' },
    { quoi: 'Principes', source: 'module Compresseur frigorifique (Thermo-techno) et HabFluide, chapitre 9',
      detail: 'productions inerWeb ; les deux dessins du temps 2 sont tracés par le programme' } ],

  correspondances: [
    { ligne: 2, couleur: '#3D7FCA', texte: "2.1 Le circuit, organe par organe", url: lien('2.1') },
    { ligne: 2, couleur: '#3D7FCA', texte: "2.2 Pression et température", url: lien('2.2') },
    { ligne: 2, couleur: '#3D7FCA', texte: "2.4 L’Inverter : la vitesse suit le besoin", url: lien('2.4') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.2 Le split : deux unités, un circuit", url: lien('3.2') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.5 Le DRV : un réseau de fluide à débit variable", url: lien('3.5') } ]
});
