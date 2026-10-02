/* CartoClim 4.2 — Les liaisons frigorifiques : longueur, dénivelé, isolant. Station-tâche, écrite le 02/10/2026. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '4.2', ligne: 4,
  kicker: 'CartoClim · Ligne 4 Installer · Station 2',
  titre: "Les liaisons frigorifiques : longueur, dénivelé, isolant",
  narration: NARRATION,

  titres: { decouvrir: 'Le chantier', comprendre: 'Ce qu’il faut savoir', manipuler: 'Le geste', representer: 'Sur le plan' },

  prerequis: [
    { id: '3.2', quoi: "le split : deux unités reliées par deux tubes de cuivre" }
  ],

  photos: [
    { src: 'assets/biblio/f03082808e.jpeg',
      alt: "Une couronne de tube de cuivre, enroulée en cercle.",
      titre: "Du cuivre en couronne.", sous: "De qualité frigorifique : il arrive bouché aux deux bouts, et il le reste jusqu’au raccordement." },
    { src: 'assets/biblio/75b318c75b.jpeg',
      alt: "Trois tubes de cuivre de diamètres différents, posés côte à côte.",
      titre: "Chaque tube a son diamètre.", sous: "La notice dit lesquels : le petit pour le liquide, le gros pour le gaz." },
    { src: 'assets/biblio/c0a06653a0.jpeg',
      alt: "Un tube de cuivre dont l’extrémité dépasse d’une gaine isolante noire.",
      titre: "Et chacun son isolant.", sous: "Une gaine tout le long du tube, sans coupure." }
  ],

  titreSert: 'La situation',
  aQuoiCaSert: "Le split est posé : l’unité intérieure dans la pièce, l’unité extérieure dehors. Il reste à les <strong>relier</strong>. Le fluide fait l’aller-retour par <strong>deux tubes de cuivre</strong> : le petit porte le liquide, le gros porte le gaz. Chacun est enfermé dans son <strong>isolant</strong>. Et la <strong>notice</strong> de l’appareil dit tout ce qui ne se devine pas : les diamètres, la longueur minimale et maximale, le dénivelé maximal.",
  ouOnLeTrouve: "Sur tous les chantiers de split, entre la pose des unités et la mise en service. La liaison traverse le mur, longe la façade, parfois une goulotte. C’est le travail du frigoriste : un tube mal préparé ne se voit pas, et il se paie plus tard.",

  scene: () => ScenesStation.liaison(),

  titreDedans: 'Les deux tubes',
  technologie: [
    ["Le tube", "du cuivre de <strong>qualité frigorifique</strong> : propre et sec à l’intérieur, livré <strong>bouché</strong> aux deux bouts, en couronne ou en barre. On le débouche au dernier moment, et on rebouche tout ce qui attend."],
    ["Les deux diamètres", "imposés par la notice : le <strong>petit</strong> tube porte le liquide, le <strong>gros</strong> tube porte le gaz. On ne les devine pas, on ne les change pas."],
    ["L’isolant", "une gaine sur <strong>chaque</strong> tube, <strong>sans coupure</strong> du début à la fin, <strong>fermée aux raccords</strong>. Sans elle, le tube froid se couvre de gouttes, et l’eau coule sur le mur."],
    ["La longueur L et le dénivelé H", "la <strong>longueur L</strong> se mesure <strong>le long des tubes</strong>, détours compris. Le <strong>dénivelé H</strong> est la différence de hauteur entre les deux unités. La notice donne une longueur minimale, une longueur maximale et un dénivelé maximal."],
    ["Les raccords", "des <strong>dudgeons</strong> serrés au couple, ou des <strong>brasures sous azote</strong>. Le geste du dudgeon est chez CuivRézo (station 4.3). Avant de raccorder : on coupe, on <strong>ébavure</strong> sans laisser un copeau dans le tube, on <strong>cintre</strong> sans écraser."]
  ],

  titreVariantes: 'Les cas particuliers',
  variantes: [
    "<strong>Liaison courte</strong> — l’appareil est livré « préchargé » pour une longueur de liaison écrite dans la notice. Jusqu’à cette longueur, la précharge suffit : on ne touche pas à la charge.",
    "<strong>Liaison plus longue</strong> — au-delà, il faut un <strong>appoint de fluide</strong>, calculé d’après la notice et <strong>pesé</strong> sur une balance. Jamais au jugé.",
    "<strong>Au-delà de la notice</strong> — plus long que la longueur maximale, ou plus haut que le dénivelé maximal : l’appareil sort de ses limites. On change le tracé, ou l’appareil.",
    "<strong>Liaison pré-isolée</strong> — des tubes déjà gainés, vendus au rouleau : on gagne du temps, mais la gaine doit encore être fermée aux raccords.",
    "<strong>Dudgeon ou brasure</strong> — le dudgeon se serre au couple (station 4.3). La brasure se fait sous azote, pour que l’intérieur du tube ne s’oxyde pas."
  ],
  reglage: "Rien ne se règle sur une liaison : elle se <strong>choisit dans la notice</strong>, puis elle se pose. Ce qui se règle ensuite, c’est la <strong>charge de fluide</strong> : la précharge de l’appareil, complétée d’un appoint pesé si la liaison est plus longue. Stations 4.6 et 4.7 pour l’étanchéité et le vide.",

  consigneAptitudes: 'La liaison entre les deux unités : cochez ce qu’elle doit être ou faire, puis validez.',
  titreAptitudes: 'Bien raccordé ?',
  colonnes: [
    { id: 'transporter', libelle: 'Transporter le fluide', aide: 'le liquide par un tube, le gaz par l’autre, entre les deux unités',
      dessin: '<rect x="4" y="30" width="22" height="40" rx="4"/><rect x="74" y="30" width="22" height="40" rx="4"/><path d="M32 42 H68 M60 34 L68 42 L60 50 M68 60 H32 M40 52 L32 60 L40 68"/>' },
    { id: 'allonger', libelle: 'S’allonger à volonté', aide: 'autant qu’on veut : poser la longueur qui arrange, sans regarder la notice',
      dessin: '<rect x="6" y="36" width="88" height="28" rx="3"/><path d="M20 36 v12 M34 36 v8 M48 36 v12 M62 36 v8 M76 36 v12"/>' },
    { id: 'isoler', libelle: 'Être isolée', aide: 'sur les deux tubes : chacun dans son isolant, du début à la fin',
      dessin: '<rect x="6" y="34" width="88" height="32" rx="16"/><rect x="6" y="44" width="88" height="12" rx="6"/>' }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    transporter: true, allonger: false, isoler: true,
    bonneReponse: 'Exact. La liaison transporte le fluide entre les deux unités, et ses deux tubes sont isolés. Mais elle ne s’allonge pas à volonté : la notice fixe une longueur maximale et un dénivelé maximal, et au-delà d’une certaine longueur il faut un appoint de fluide, pesé.',
    erreurs: {
      transporter: 'C’est tout son travail : le fluide passe d’une unité à l’autre par ces deux tubes, le liquide d’un côté, le gaz de l’autre.',
      allonger: 'La longueur ne se choisit pas à l’envie : la notice donne un minimum, un maximum et un dénivelé maximal. Plus long que la précharge, il faut un appoint pesé ; au-delà du maximum, on ne pose pas.',
      isoler: 'Les deux tubes sont isolés, chacun dans sa gaine, sans coupure et fermée aux raccords. Sans isolant, le tube froid se couvre de gouttes.'
    }
  },

  titreCablage: 'Dans l’ordre',
  cablage: [
    "<strong>La notice d’abord</strong> : les deux diamètres, la longueur minimale et maximale, le dénivelé maximal. On les lit avant de couper quoi que ce soit.",
    "<strong>Le tube, bouché</strong> : qualité frigorifique, débouché au dernier moment, rebouché dès qu’il attend.",
    "<strong>On coupe, on ébavure, on cintre</strong> : l’ébavurage ne laisse aucun copeau dans le tube ; le cintrage n’écrase pas le tube.",
    "<strong>Les raccords</strong> : des dudgeons serrés au couple (station 4.3 pour le geste), ou des brasures sous azote.",
    "<strong>On contrôle avant d’isoler les raccords</strong> : étanchéité, puis tirage au vide. Stations 4.6 et 4.7.",
    "<strong>L’isolant</strong> : sur chaque tube, sans coupure, fermé aux raccords. Le fluide s’ajoute ensuite, avec un appoint pesé si la liaison dépasse la précharge."
  ],
  piege: "Cinq défauts qu’on découvre trop tard : un <strong>tube écrasé</strong> au cintrage, un <strong>copeau</strong> resté dans le tube, un <strong>isolant coupé</strong> qui laisse le tube goutter, un <strong>dudgeon fissuré</strong> qui fuit, une <strong>longueur hors notice</strong>. Les diamètres et les longueurs ne se devinent pas : on les lit.",

  symboles: [
    { src: 'assets/split-pared.svg', alt: "Symbole d’une unité intérieure murale de climatiseur : un boîtier allongé avec sa grille de soufflage.", legende: "Unité intérieure murale" },
    { src: 'assets/ud-exte-split.svg', alt: "Symbole d’une unité extérieure de climatiseur : un boîtier avec son hélice et ses deux raccords.", legende: "Unité extérieure" }
  ],
  titreSymboles: 'Les deux unités, au bout de la liaison',
  titreLecturePlan: 'La liaison sur le plan',
  lecturePlan: [
    "La bibliothèque n’a pas de symbole propre à la liaison : sur un plan, elle se lit comme les <strong>deux traits</strong> qui relient l’unité intérieure à l’unité extérieure. L’un est le tube liquide, l’autre le tube gaz.",
    "Deux cotes y sont portées : la <strong>longueur L</strong>, mesurée <strong>le long du tracé</strong> (chaque détour s’y ajoute), et le <strong>dénivelé H</strong>. Comparez-les à la notice avant de commencer.",
    "Le plan ne dit pas tout : les <strong>diamètres</strong>, la longueur maximale et le dénivelé maximal sont dans la <strong>notice de l’appareil</strong>.",
    "Les repères courants : <strong>UI</strong> pour l’unité intérieure, <strong>UE</strong> pour l’unité extérieure."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Ce qu’on vérifie sur une liaison',

  quiz: [
    { question: "Où lit-on le diamètre de chaque tube ?",
      confirmation: "Dans la notice de l’appareil : le constructeur l’impose, on ne le devine pas.",
      reponses: [
        { texte: "À l’œil, selon la longueur de la liaison.", pourquoi: "Les diamètres ne se devinent pas : le constructeur les impose, quelle que soit la longueur." },
        { texte: "On prend le plus gros qui rentre : ça passera mieux.", pourquoi: "Un tube plus gros n’arrange rien : le diamètre est choisi pour l’appareil, on ne le change ni en plus ni en moins." },
        { texte: "Dans la notice de l’appareil.", juste: true },
        { texte: "Sur le plan du bâtiment.", pourquoi: "Le plan montre où passent les tubes. Les diamètres sont dans la notice de l’appareil." } ] },

    { question: "Que mesure le dénivelé H ?",
      confirmation: "La différence de hauteur entre les deux unités : une limite de la notice, à côté de la longueur.",
      reponses: [
        { texte: "La longueur totale des tubes.", pourquoi: "C’est la longueur L, une autre limite de la notice. Le dénivelé H est une hauteur." },
        { texte: "Le nombre de coudes sur le trajet.", pourquoi: "Les coudes allongent le trajet, donc L. Le dénivelé ne compte que la hauteur." },
        { texte: "L’épaisseur du mur à traverser.", pourquoi: "Le mur n’entre pas dans H : on compare la hauteur des deux unités." },
        { texte: "La différence de hauteur entre les deux unités.", juste: true } ] },

    { question: "La liaison est plus longue que la précharge, mais dans la limite de la notice. Que fait-on ?",
      confirmation: "On ajoute un appoint de fluide, et on le pèse : il se calcule d’après la notice.",
      reponses: [
        { texte: "On ajoute un appoint de fluide, pesé.", juste: true },
        { texte: "Rien : l’appareil s’adapte.", pourquoi: "Des tubes plus longs contiennent plus de fluide : il en manque, et l’appareil ne marche pas comme prévu." },
        { texte: "On ajoute du fluide au jugé, jusqu’à ce que ça marche.", pourquoi: "Le fluide s’ajoute en poids, sur une balance, d’après la notice. Au jugé, on se trompe." },
        { texte: "On prend des tubes plus gros pour compenser.", pourquoi: "Les diamètres sont imposés par la notice. Un tube plus gros ne remplace pas l’appoint." } ] },

    { question: "Pourquoi ébavure-t-on le tube après la coupe ?",
      confirmation: "Pour qu’aucun copeau ne reste dans le tube : il partirait dans le circuit.",
      reponses: [
        { texte: "Pour que le tube soit plus joli.", pourquoi: "Ce n’est pas de l’esthétique : un copeau resté à l’intérieur part dans le circuit." },
        { texte: "Pour qu’aucun copeau ne reste dans le tube.", juste: true },
        { texte: "Pour que l’isolant glisse mieux.", pourquoi: "L’isolant est à l’extérieur. Ce qui compte, c’est ce qui reste à l’intérieur du tube." },
        { texte: "Pour raccourcir le tube de quelques millimètres.", pourquoi: "L’ébavurage retire seulement le bord coupant. La longueur se règle à la coupe." } ] },

    { question: "L’isolant du gros tube est coupé, ou mal fermé. Que se passe-t-il ?",
      confirmation: "Le tube froid se couvre de gouttes à cet endroit, et l’eau coule sur le mur ou le plafond.",
      reponses: [
        { texte: "Le fluide s’échappe par la coupure.", pourquoi: "L’isolant entoure le tube : il retient le froid, pas le fluide. Une fuite vient d’un raccord ou du tube." },
        { texte: "Le compresseur chauffe.", pourquoi: "Sans rapport : l’isolant protège le tube de l’air humide, pas le compresseur." },
        { texte: "Le tube froid se couvre de gouttes à cet endroit.", juste: true },
        { texte: "Rien : l’isolant n’est qu’une finition.", pourquoi: "Sans isolant, le tube froid se couvre de gouttes, et elles apparaissent justement là où il manque." } ] },

    { question: "Après le serrage, le dudgeon est fissuré. Que fait-on ?",
      confirmation: "On recoupe le tube, on ébavure, on refait le dudgeon.",
      reponses: [
        { texte: "On serre l’écrou un peu plus.", pourquoi: "Une fissure ne se ferme pas en serrant : le fluide fuira, et serrer davantage peut l’aggraver." },
        { texte: "On le garde : une petite fissure ne fuit pas.", pourquoi: "Une fissure fuit tôt ou tard, parfois seulement sous pression. On ne garde pas un dudgeon fissuré." },
        { texte: "On le recouvre d’isolant : il bouchera la fissure.", pourquoi: "L’isolant ne retient pas le fluide. Un dudgeon fissuré fuit, isolé ou non." },
        { texte: "On recoupe le tube et on refait le dudgeon.", juste: true } ] }
  ],

  retenir: [
    "<strong>Petit tube liquide, gros tube gaz</strong> : les deux diamètres sont dans la notice.",
    "<strong>L et H se lisent dans la notice</strong> : longueur minimale et maximale, dénivelé maximal.",
    "<strong>Plus long que la précharge ? Un appoint de fluide, pesé.</strong>",
    "<strong>Un isolant sur les deux tubes</strong>, sans coupure, fermé aux raccords.",
    "<strong>On bouche, on ébavure, on cintre sans écraser.</strong>"
  ],

  objectifs: '<p><strong>Objectif.</strong> Savoir ce qu’est une liaison frigorifique, ce que la notice impose (diamètres, longueur, dénivelé), pourquoi on isole les deux tubes, et ce qu’on vérifie avant et pendant le raccordement.</p><p><strong>Limite.</strong> Le geste du dudgeon est dans la station CuivRézo (4.3) ; l’étanchéité, le tirage au vide et la charge de fluide sont dans d’autres stations. Aucune valeur de diamètre, de longueur, de dénivelé ou de charge n’est donnée ici : elles viennent de la notice de l’appareil.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs — toute image signalée sera remplacée' },
    { quoi: 'Symboles', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' } ],

  correspondances: [
    { ligne: 1, couleur: '#C9451A', texte: "1.4 Point de rosée et air humide", url: lien('1.4') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.1 Poser les deux unités", url: lien('4.1') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.3 Le dudgeon", url: lien('4.3') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.6 L’étanchéité", url: lien('4.6') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.7 Le tirage au vide", url: lien('4.7') } ]
});
