/* CartoClim 2.5 — Détendre : le capillaire et le détendeur électronique. Écrite le 02/10/2026 sur le moule de la station étalon 3.2. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '2.5', ligne: 2,
  kicker: 'CartoClim · Ligne 2 La machine · Station 5',
  titre: "Détendre : capillaire et détendeur électronique",
  narration: NARRATION,

  prerequis: [
    { id: '2.1', quoi: "le circuit frigorifique, organe par organe" },
    { id: '2.2', quoi: "la pression et la température du fluide, liées entre elles" }
  ],

  photos: [
    { src: 'assets/biblio/ecb0d5a641.webp',
      alt: "Un tube de cuivre très fin, enroulé sur lui-même en couronne, dont les deux bouts sont libres.",
      titre: "Un simple tube de cuivre.", sous: "Très fin, assez long, sans aucune pièce qui bouge : c’est un tube capillaire." },
    { src: 'assets/biblio/cea7b00e02.webp',
      alt: "Un détendeur électronique : un corps de laiton avec deux raccords de cuivre, surmonté d’un cylindre de métal qui est le moteur, et un petit câble à connecteur qui en sort.",
      titre: "Le détendeur électronique.", sous: "Le moteur est au-dessus ; le câble va à la carte, qui le commande." }
  ],

  aQuoiCaSert: "À <strong>faire tomber la pression du liquide</strong>. À la sortie du condenseur, le fluide est liquide et sous haute pression. Pour aller prendre la chaleur de la pièce, il doit arriver dans l’évaporateur à <strong>basse pression</strong>, et <strong>froid</strong> : alors il bout. Le détendeur est le passage étroit où la pression tombe d’un coup. Un climatiseur en utilise deux sortes : le <strong>tube capillaire</strong>, tout simple, et le <strong>détendeur électronique</strong>, piloté par la carte.",
  ouOnLeTrouve: "Dans l’<strong>unité extérieure</strong>, sur le circuit du liquide, entre le condenseur et l’évaporateur. Le capillaire se voit sur les petits splits ; le détendeur électronique, sur l’Inverter et sur les machines réversibles. Un troisième détendeur, à bulbe, est expliqué dans Thermo-techno (lien en bas de page).",

  scene: () => ScenesStation.detendre(),

  titreDedans: 'Ce qui se passe dedans',
  technologie: [
    ["Le passage étroit", "dans les deux cas, le principe est le même : le liquide sous haute pression est forcé de passer par un <strong>passage très étroit</strong>. De l’autre côté, la pression est basse. À cette pression, le liquide est trop chaud pour rester liquide : <strong>une partie bout d’un coup</strong>, et pour bouillir elle prend de la chaleur au reste du liquide, qui se refroidit. Ce qui repart est un <strong>mélange froid</strong> de liquide et de bulles."],
    ["Le tube capillaire", "un tube de cuivre <strong>très fin et assez long</strong>, souvent enroulé pour tenir dans la machine. Sa longueur et sa finesse sont choisies une fois pour toutes : <strong>aucun réglage</strong>, le débit est celui du tube. Rien ne bouge, donc rien ne s’use. Mais il ne s’adapte à rien : trop de fluide ou pas assez, il laisse faire. La charge doit donc être <strong>exacte</strong> : on la compte au gramme."],
    ["Le détendeur électronique", "un corps de laiton avec, au centre, un passage étroit fermé par une <strong>aiguille</strong>. Un <strong>moteur pas à pas</strong>, qui tourne par petits pas précis, la pousse ou la relève. La <strong>carte électronique</strong> lit ses sondes de température, ouvre un peu, ferme un peu, sans arrêt. Son but : tenir la <strong>surchauffe</strong>."],
    ["La surchauffe", "c’est de <strong>combien le gaz sort plus chaud</strong> de l’évaporateur que le fluide qui bout dedans. Elle dit si l’évaporateur est bien alimenté. <strong>Trop forte</strong> : il manque de fluide, le détendeur ouvre. <strong>Trop faible</strong> : il en reçoit trop, du liquide risque de repartir vers le compresseur, le détendeur ferme. La mesurer est le travail de la station 5.4 ; aucune valeur n’est donnée ici."]
  ],

  variantes: [
    "<strong>Le détendeur à bulbe</strong> (thermostatique) — le même rôle, sans carte électronique : il est expliqué dans Thermo-techno, lien en bas de page.",
    "<strong>L’Inverter</strong> — le compresseur change de vitesse, donc le débit de fluide change tout le temps. Un capillaire ne peut pas le suivre ; le détendeur électronique, si. Station 2.4.",
    "<strong>La machine réversible</strong> — en mode chaud, le fluide circule dans l’autre sens, et c’est le plus souvent un détendeur électronique qui s’en charge. Station 2.6.",
    "<strong>La pression et la température</strong> — pourquoi le fluide est froid quand la pression est basse : station 2.2."
  ],
  reglage: "Un capillaire <strong>ne se règle pas</strong> : il se remplace, il ne se retouche pas. Sur un détendeur électronique, c’est la <strong>carte</strong> qui règle l’ouverture, toute seule ; la consigne est dans son programme, et la valeur vient de la notice du constructeur. Mesurer la surchauffe : station 5.4.",

  consigneAptitudes: 'Le détendeur électronique d’un split Inverter : cochez ce qu’il sait faire, puis validez.',
  titreAptitudes: 'Que sait faire un détendeur électronique ?',
  colonnes: [
    { id: 'chute', libelle: 'Faire chuter la pression', aide: 'ramener le liquide de la haute à la basse pression',
      dessin: '<path d="M6 22 H34 L50 42 H94 M6 78 H34 L50 58 H94"/><path d="M10 50 H30 M22 43 L30 50 L22 57"/>' },
    { id: 'surchauffe', libelle: 'Régler la surchauffe', aide: 'ouvrir ou fermer pour bien alimenter l’évaporateur',
      dessin: '<path d="M24 12 a12 12 0 0 1 24 0 V56 a20 20 0 1 1 -24 0 Z M36 34 V70"/><path d="M68 28 L80 16 L92 28 M80 16 V44 M68 72 L80 84 L92 72 M80 84 V56"/>' },
    { id: 'comprimer', libelle: 'Comprimer le fluide', aide: 'monter la pression du gaz',
      dessin: '<path d="M6 50 H34 M24 40 L34 50 L24 60 M94 50 H66 M76 40 L66 50 L76 60"/><path d="M40 34 H60 V66 H40 Z"/>' }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    chute: true, surchauffe: true, comprimer: false,
    bonneReponse: 'Exact. Il fait chuter la pression, et comme la carte le pilote, il règle la surchauffe. Mais il ne comprime rien : comprimer, c’est le travail du compresseur. Un capillaire, lui, fait chuter la pression mais ne règle rien.',
    erreurs: {
      chute: 'C’est le métier de tout détendeur : le liquide passe de la haute à la basse pression par un passage étroit.',
      surchauffe: 'Oui, pour un détendeur électronique : la carte lit ses sondes et fait ouvrir ou fermer l’aiguille pour tenir la surchauffe. (Un capillaire, lui, ne règle rien.)',
      comprimer: 'Non : le détendeur fait l’inverse du compresseur. Il ne monte pas la pression, il la fait tomber.'
    }
  },

  titreCablage: 'Le raccordement',
  cablage: [
    "<strong>Le capillaire</strong> est brasé dans le circuit. Il n’a aucun branchement électrique et aucun réglage.",
    "<strong>Le détendeur électronique</strong> est brasé sur le circuit du liquide, et sa <strong>bobine</strong> (le moteur) se branche à la carte par un petit câble à connecteur.",
    "<strong>Les sondes de la carte</strong> sont fixées sur les tubes. Une sonde mal plaquée donne une mesure fausse, et la carte règle sur cette mesure fausse.",
    "<strong>Tout ce qui touche au circuit</strong> reste le même : étanchéité (station 4.6) et tirage au vide (station 4.7)."
  ],
  piege: "Un <strong>capillaire bouché</strong> se reconnaît : du <strong>givre</strong> sur le capillaire, une <strong>basse pression très basse</strong>, et <strong>pas de froid</strong> dans la pièce. Sur un détendeur électronique, le <strong>bruit du moteur au démarrage est normal</strong>. Mais une <strong>bobine débranchée bloque l’aiguille</strong> : la carte commande, rien ne bouge. Avant de changer quoi que ce soit, regardez le câble.",

  symboles: [
    { src: 'assets/capillaire.svg', alt: "Symbole d’un tube capillaire : un trait horizontal avec un petit rond posé dessous.", legende: "Tube capillaire" },
    { src: 'assets/detendeurelectronique.svg', alt: "Symbole d’un détendeur électronique : deux triangles pointe contre pointe, surmontés d’un rond qui figure la commande électronique.", legende: "Détendeur électronique" }
  ],
  titreLecturePlan: 'Le lire sur un schéma',
  lecturePlan: [
    "Sur un <strong>schéma frigorifique</strong>, le détendeur est sur la <strong>ligne du liquide</strong>. Dans la croix du frigoriste, il est <strong>à gauche</strong>, entre le condenseur (en haut) et l’évaporateur (en bas).",
    "Le <strong>capillaire</strong> se dessine comme un simple trait avec un petit rond. Le <strong>détendeur électronique</strong> se dessine comme un détendeur surmonté d’un rond : c’est la commande, la carte pilote.",
    "Sur un split, les deux sont dans l’<strong>unité extérieure</strong> : le mélange froid part vers l’unité intérieure par le petit tube.",
    "Aucune valeur ne se lit sur le symbole : longueur du tube, ouverture, surchauffe viennent de la <strong>notice</strong> de la machine."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Capillaire ou électronique : ce qui change',

  quiz: [
    { question: "À quoi sert un détendeur ?",
      confirmation: "À ramener le liquide de la haute à la basse pression : c’est cette chute qui le refroidit.",
      reponses: [
        { texte: "À comprimer le gaz avant le condenseur.", pourquoi: "Comprimer, c’est le travail du compresseur. Le détendeur fait l’inverse : il fait tomber la pression." },
        { texte: "À stocker le fluide quand la machine s’arrête.", pourquoi: "Le détendeur ne stocke rien : c’est un passage, pas un réservoir." },
        { texte: "À refroidir le liquide avec l’air extérieur.", pourquoi: "C’est le condenseur qui échange avec l’air extérieur. Le détendeur refroidit autrement : en faisant tomber la pression." },
        { texte: "À faire tomber la pression du liquide avant l’évaporateur.", juste: true } ] },

    { question: "Pourquoi le fluide est-il froid à la sortie du détendeur ?",
      confirmation: "Une partie du liquide bout d’un coup quand la pression tombe, et prend sa chaleur au reste du liquide.",
      reponses: [
        { texte: "Une partie du liquide bout d’un coup et prend de la chaleur au reste.", juste: true },
        { texte: "L’hélice souffle dessus.", pourquoi: "L’hélice balaie le condenseur, de l’autre côté du circuit. Le détendeur n’est refroidi par rien : c’est le fluide qui se refroidit lui-même." },
        { texte: "Le moteur du détendeur le refroidit.", pourquoi: "Le moteur ne fait que déplacer l’aiguille : il ne produit aucun froid. Et le capillaire n’a même pas de moteur." },
        { texte: "Il se mélange à l’air de la pièce.", pourquoi: "Le circuit est fermé : aucun air ne s’y mêle." } ] },

    { question: "Que peut-on régler sur un capillaire ?",
      confirmation: "Rien : sa longueur et sa finesse sont choisies une fois pour toutes. C’est pour cela que la charge doit être exacte.",
      reponses: [
        { texte: "La surchauffe, avec la carte.", pourquoi: "C’est le détendeur électronique que la carte pilote. Le capillaire n’a ni moteur ni commande." },
        { texte: "Rien : le tube est fixe.", juste: true },
        { texte: "Le débit, avec la télécommande.", pourquoi: "La télécommande parle à la carte de l’unité intérieure, pas au tube : le capillaire ne reçoit aucun ordre." },
        { texte: "L’ouverture, avec une vis.", pourquoi: "Une vis de réglage se voit sur un détendeur à bulbe. Le capillaire n’est qu’un tube." } ] },

    { question: "Pourquoi un Inverter a-t-il besoin d’un détendeur électronique ?",
      confirmation: "Son compresseur change de vitesse, donc le débit de fluide change : il faut un détendeur qui suit.",
      reponses: [
        { texte: "Un capillaire est trop gros pour un Inverter.", pourquoi: "Au contraire, un capillaire est très fin. Son défaut est ailleurs : son débit est fixe, il ne peut pas suivre un compresseur qui change de vitesse." },
        { texte: "L’Inverter n’a pas de condenseur.", pourquoi: "Il en a un, comme toute machine frigorifique : le cycle est le même." },
        { texte: "Le compresseur change de vitesse : le débit change, le détendeur doit suivre.", juste: true },
        { texte: "Le détendeur électronique fait du bruit au démarrage.", pourquoi: "Ce bruit est normal, mais ce n’est pas une raison de le choisir : on le choisit parce qu’il suit le besoin." } ] },

    { question: "Un capillaire est bouché. Que constate-t-on ?",
      confirmation: "Du givre sur le capillaire, une basse pression très basse, et pas de froid : l’évaporateur manque de fluide.",
      reponses: [
        { texte: "Un bruit de moteur qui ne s’arrête pas.", pourquoi: "Un capillaire n’a pas de moteur : ce symptôme ne peut pas venir de lui." },
        { texte: "Un évaporateur noyé de liquide.", pourquoi: "C’est l’inverse. Bouché, le capillaire laisse passer trop peu de fluide : l’évaporateur en manque." },
        { texte: "Rien de visible : la machine refroidit comme d’habitude.", pourquoi: "Un capillaire bouché prive l’évaporateur de fluide : il n’y a pas de froid." },
        { texte: "Du givre sur le capillaire, une basse pression très basse, pas de froid.", juste: true } ] },

    { question: "La carte commande le détendeur électronique, mais l’aiguille ne bouge pas. Premier réflexe ?",
      confirmation: "Regarder la bobine : débranchée, elle bloque l’aiguille. Le câble se vérifie avant tout changement.",
      reponses: [
        { texte: "Regarder si la bobine est bien branchée.", juste: true },
        { texte: "Changer le détendeur, il faisait du bruit au démarrage.", pourquoi: "Ce bruit de moteur est normal : il ne prouve aucune panne. Et on ne change rien avant d’avoir regardé le câble." },
        { texte: "Ajouter du fluide.", pourquoi: "Ajouter du fluide ne débloque pas une aiguille. On cherche la cause avant d’intervenir sur la charge." },
        { texte: "Remplacer le capillaire.", pourquoi: "Il n’y a pas de capillaire sur une machine à détendeur électronique : c’est l’un ou l’autre." } ] }
  ],

  retenir: [
    "<strong>Le détendeur fait tomber la pression</strong> : une partie du liquide bout d’un coup, le mélange sort froid.",
    "<strong>Le capillaire : un tube fin, aucun réglage</strong> — donc une charge de fluide exacte.",
    "<strong>Le détendeur électronique : une aiguille, un moteur pas à pas, la carte et ses sondes</strong> — il tient la surchauffe.",
    "<strong>Capillaire bouché : givre, basse pression très basse, pas de froid.</strong> Électronique : bruit de moteur normal ; bobine débranchée, aiguille bloquée."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre pourquoi on fait tomber la pression du liquide, reconnaître un capillaire et un détendeur électronique, et savoir ce que chacun règle — ou ne règle pas.</p><p><strong>Limite.</strong> Le détendeur à bulbe est expliqué par Thermo-techno ; la mesure de la surchauffe est la station 5.4. Aucune valeur (pression, surchauffe, longueur ou diamètre de tube) n’est donnée ici : elles viennent de la notice de l’appareil.</p>',

  creditPhoto: 'Images : vues d’organes isolés du pack inerWeb « Technologie des organes ». Détail dans « Crédits ».',
  credits: [
    { quoi: 'Les deux images d’organes', source: 'pack inerWeb « Technologie des organes »',
      detail: 'vues d’un organe isolé, produites pour le site : elles aident à reconnaître, ce ne sont pas des plans constructeur' },
    { quoi: 'Symboles', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' } ],

  correspondances: [
    { ligne: 2, couleur: '#3D7FCA', texte: "2.2 Pression et température", url: lien('2.2') },
    { ligne: 2, couleur: '#3D7FCA', texte: "2.4 L’Inverter : la vitesse suit le besoin", url: lien('2.4') },
    { ligne: 5, couleur: '#B06A00', texte: "5.2 Le régulateur électronique", url: lien('5.2') },
    { ligne: 5, couleur: '#B06A00', texte: "5.4 Surchauffe et sous-refroidissement", url: lien('5.4') },
    { ligne: 2, couleur: '#3D7FCA', texte: "Thermo-techno · Le détendeur à bulbe", url: 'https://inerweb.fr/packs/fluides/res/detendeur-interactif/' }
  ]
});
