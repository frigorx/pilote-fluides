/* ÉlectroRézo 6.2 — Le transformateur. */

ModeleAppareil.construire({
  id: '6.2', ligne: 6,
  kicker: 'ÉlectroRézo · Ligne 6 Machines · Station 2',
  titre: "Le transformateur",
  narration: NARRATION,

  prerequis: [
    { id: '6.1', quoi: "la bobine" },
    { id: '1.2', quoi: "la tension" },
  ],

  photos: [
    { src: 'assets/biblio/primaire-et-secondaire.png',
      alt: "Schéma d’un transformateur : le circuit magnétique en fer, le bobinage primaire à gauche, le bobinage secondaire à droite, et le flux qui circule dans le fer.",
      titre: "Deux bobinages, un fer.", sous: "Aucun fil ne relie les deux côtés." },
    { src: 'assets/biblio/transformateur-de-bruleur.png',
      alt: "Schéma électrique d’un transformateur alimenté en 240 volts alternatif, dont le secondaire alimente des électrodes.",
      titre: "Et un qui élève.", sous: "Sur un brûleur, il monte à plusieurs milliers de volts." }
  ],

  aQuoiCaSert: "À changer une tension. Vous entrez 230 volts, vous sortez 24. Ou l’inverse. Sans pièce mobile, sans usure, et sans aucune liaison électrique entre l’entrée et la sortie.",
  ouOnLeTrouve: "Dans le poste de transformation du quartier, dans chaque armoire qui a besoin de 24 volts pour sa commande, dans chaque chargeur, dans chaque brûleur. C’est peut-être la machine la plus répandue au monde.",

  scene: () => SchemasMachines.rapportDeTransformation(),

  technologie: [
    ["Le circuit magnétique", "un empilement de tôles de fer, isolées les unes des autres. Il guide le champ du primaire vers le secondaire — et l’empilement limite les pertes."],
    ["Le primaire", "le bobinage d’entrée. Alimenté en alternatif, il crée dans le fer un champ qui varie sans arrêt."],
    ["Le secondaire", "le bobinage de sortie. Le champ qui varie y fait naître une tension : c’est l’<strong>induction</strong>. Rien ne les relie électriquement."],
    ["Le rapport des spires", "tout est là. La tension de sortie est à la tension d’entrée ce que le nombre de spires du secondaire est à celui du primaire."]
  ],

  variantes: [
    "<strong>Abaisseur</strong> — moins de spires au secondaire. C’est le cas le plus fréquent : 230 vers 24 pour une commande.",
    "<strong>Élévateur</strong> — plus de spires au secondaire. Sur un brûleur, il monte à plusieurs milliers de volts pour faire l’étincelle.",
    "<strong>Transformateur d’isolement</strong> — rapport 1 pour 1. Il ne change rien à la tension : il sert uniquement à séparer deux circuits.",
    "<strong>Autotransformateur</strong> — un seul bobinage avec une prise intermédiaire. Moins cher, plus compact — mais il n’isole pas, et c’est un défaut sérieux."
  ],

  picto: SchemasMachines.pictoTrois,
  colonnes: SchemasMachines.COLONNES,
  consigneAptitudes: 'Les trois questions. Le transformateur est le seul de la ligne à répondre ainsi.',
  aptitudes: {
    mouvement: false, tension: true, alternatif: true,
    bonneReponse: 'Exact — et c’est le seul de la ligne dans ce cas. Rien ne bouge chez lui, il change la tension, et il lui faut absolument l’alternatif. Un transformateur alimenté en continu ne transforme rien : il chauffe, puis il brûle.',
    erreurs: {
      mouvement: 'Aucune pièce ne bouge. C’est même son grand avantage : il ne s’use pas.',
      tension: 'C’est précisément son métier, et le seul.',
      alternatif: 'C’est le point capital. Il faut que le champ VARIE pour qu’une tension naisse au secondaire. En continu, le champ est fixe, et il ne se passe plus rien.'
    }
  },

  cablage: [
    "Le <strong>primaire</strong> et le <strong>secondaire</strong> sont repérés séparément, souvent en chiffres romains ou par les lettres H et X selon les constructeurs.",
    "Un transformateur de commande porte une <strong>protection de chaque côté</strong> : un disjoncteur au primaire, un fusible au secondaire.",
    "Certains ont <strong>plusieurs primaires</strong> — 230 et 400 — qu’on sélectionne par un pontage. Vérifiez ce pontage avant de mettre sous tension.",
    "Le <strong>secondaire de commande</strong> a souvent un point relié à la terre. Ce n’est pas un défaut : c’est voulu, pour que le premier défaut d’isolement soit détecté."
  ],
  piege: "Un transformateur <strong>ne fabrique pas de puissance</strong>. Ce qu’il rend, il l’a pris — moins ses pertes. Baisser la tension fait monter le courant dans le même rapport : ne dimensionnez jamais le câble du secondaire sur l’intensité du primaire.",

  symboles: [
    { src: 'assets/transfo_mono.svg', alt: "Symbole normalisé d’un transformateur monophasé : deux cercles qui se recouvrent.", legende: "Monophasé" },
    { src: 'assets/transfo_tri.svg', alt: "Symbole normalisé d’un transformateur triphasé.", legende: "Triphasé" },
    { src: 'assets/tranfo230_400_12_24.svg', alt: "Symbole d’un transformateur à plusieurs primaires et plusieurs secondaires, 230 ou 400 volts vers 12 ou 24 volts.", legende: "Plusieurs tensions" }
  ],
  lecturePlan: [
    "Le symbole est fait de <strong>deux cercles qui se recouvrent</strong>. Ils figurent les deux bobinages, couplés sans se toucher.",
    "Regardez bien : les cercles ne sont pas reliés par un trait. Ce vide entre eux <strong>est</strong> l’information — il n’y a pas de liaison électrique.",
    "Un <strong>trait entre les deux</strong> désigne un écran de séparation, sur les transformateurs qui en portent un.",
    "Les tensions sont écrites de part et d’autre : <em>230 V</em> d’un côté, <em>24 V</em> de l’autre. Et le sens compte : c’est celui du plan qui dit lequel est le primaire."
  ],

  tableau: SchemasMachines.tableauMachines,
  tableauTitre: 'Les machines des lignes 6 et 7',

  quiz: [
    { question: "Un transformateur alimenté en courant continu : que se passe-t-il ?",
      confirmation: "Rien au secondaire. Et le primaire chauffe jusqu’à brûler.",
      reponses: [
        { texte: "Il transforme normalement.", pourquoi: "Sans champ variable, aucune tension ne naît au secondaire." },
        { texte: "Il sort du continu à la tension voulue.", pourquoi: "Il ne sort rien du tout." },
        { texte: "Il fonctionne, mais moins bien.", pourquoi: "Il ne fonctionne pas du tout : c’est l’induction qui manque." },
        { texte: "Rien au secondaire, et le primaire brûle.", juste: true } ] },

    { question: "Le secondaire a dix fois moins de spires. Que valent tension et courant ?",
      confirmation: "La tension est divisée par dix, le courant multiplié par dix.",
      reponses: [
        { texte: "Tension divisée par dix, courant multiplié par dix.", juste: true },
        { texte: "Les deux divisés par dix.", pourquoi: "La puissance serait divisée par cent : le transformateur n’en perd pas tant." },
        { texte: "Les deux multipliés par dix.", pourquoi: "Il créerait de la puissance, ce qui est impossible." },
        { texte: "Tension multipliée par dix, courant divisé par dix.", pourquoi: "C’est le cas inverse : moins de spires abaisse la tension." } ] },

    { question: "Pourquoi le circuit magnétique est-il fait de tôles empilées ?",
      confirmation: "Pour limiter les courants qui circuleraient dans une masse pleine.",
      reponses: [
        { texte: "Pour le rendre plus léger.", pourquoi: "L’empilement ne change pratiquement pas la masse." },
        { texte: "Pour limiter les courants induits dans le fer.", juste: true },
        { texte: "Pour mieux évacuer la chaleur.", pourquoi: "L’évacuation se fait par les faces extérieures, pleines ou non." },
        { texte: "Pour faciliter la fabrication.", pourquoi: "C’est au contraire plus long à assembler." } ] },

    { question: "Qu’est-ce qu’un transformateur d’isolement, de rapport 1 pour 1 ?",
      confirmation: "Il ne change pas la tension : il sépare deux circuits.",
      reponses: [
        { texte: "Un transformateur en panne.", pourquoi: "C’est un article normal, vendu comme tel." },
        { texte: "Un transformateur pour courant continu.", pourquoi: "Aucun transformateur ne fonctionne en continu." },
        { texte: "Un transformateur qui sépare deux circuits sans changer la tension.", juste: true },
        { texte: "Un autotransformateur.", pourquoi: "L’autotransformateur n’isole justement pas : c’est son défaut." } ] }
  ],

  retenir: [
    "<strong>Le rapport des spires</strong> décide de tout.",
    "<strong>La tension descend, le courant monte.</strong> La puissance ne bouge pas.",
    "<strong>Il lui faut l’alternatif.</strong> En continu, il brûle.",
    "<strong>Aucune liaison électrique</strong> entre entrée et sortie — sauf sur un autotransformateur."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre l’induction, employer le rapport des spires dans les deux sens, et savoir pourquoi un transformateur exige l’alternatif.</p><p><strong>Limite.</strong> Le rendement, les pertes fer et cuivre, et les couplages triphasés ne sont qu’évoqués.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 1, couleur: '#2e6f9e', texte: "1.5 Continu et alternatif" },
    { ligne: 2, couleur: '#7a4fb5', texte: "2.4 La tension simple" },
    { ligne: 6, couleur: '#c9451a', texte: "6.1 La bobine" } ]
});
