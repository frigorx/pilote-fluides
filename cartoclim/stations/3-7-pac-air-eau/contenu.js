/* CartoClim 3.7 — La PAC air/eau : haute, moyenne et basse température. Écrite le 02/10/2026. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '3.7', ligne: 3,
  kicker: 'CartoClim · Ligne 3 Les familles · Station 7',
  titre: "La PAC air/eau : haute, moyenne et basse température",
  narration: NARRATION,

  prerequis: [
    { id: '2.1', quoi: "le circuit frigorifique, organe par organe" },
    { id: '3.2', quoi: "le split : le même cycle, en deux unités" }
  ],

  photos: [
    { src: 'assets/biblio/e2e7fed2c7.jpeg',
      alt: "Une grande unité extérieure de pompe à chaleur air/eau, posée sur des plots au pied d’un bâtiment : une grille de batterie sur le côté, un ventilateur sur le dessus, un tuyau noir au sol.",
      titre: "Dehors, l’unité qui prend la chaleur de l’air.", sous: "Une batterie et un ventilateur, comme sur un split. Ce qui en sort est de l’eau chaude." }
  ],

  aQuoiCaSert: "À <strong>chauffer l’eau d’une maison</strong> avec la chaleur de l’air du dehors. C’est le même cycle qu’un split, mais l’échangeur intérieur ne chauffe plus de l’air : il chauffe de l’<strong>eau</strong>, qui part vers un <strong>plancher chauffant</strong>, des <strong>radiateurs</strong> ou un <strong>ballon d’eau chaude sanitaire</strong>.",
  ouOnLeTrouve: "Dans une maison neuve ou ancienne, à la place d’une chaudière — ou en <strong>relève de chaudière</strong> : la pompe à chaleur chauffe tant que son rendement est acceptable, la chaudière existante prend le relais quand il fait trop froid. Dehors, une unité qui ressemble à celle d’un split ; dedans, une chaufferie.",

  scene: () => ScenesStation.laPacAirEau(),

  technologie: [
    ["L’unité extérieure", "le même circuit qu’un split : un <strong>compresseur</strong>, une batterie à ailettes balayée par un <strong>ventilateur</strong> — c’est ici l’<strong>évaporateur</strong>, puisqu’on prend la chaleur de l’air —, un <strong>détendeur</strong>, et une <strong>vanne 4 voies</strong> qui inverse le cycle pour dégivrer (et pour rafraîchir sur une machine réversible)."],
    ["Le condenseur à plaques", "côté eau. Deux circuits côte à côte, séparés par des plaques de métal mince : d’un côté le <strong>fluide frigorigène</strong> qui se condense, de l’autre l’<strong>eau du chauffage</strong> qui s’échauffe. Rien ne se mélange, seule la chaleur passe. C’est le même objet que dans une chaufferie : voyez <a href=\"https://inerweb.fr/hydrometro/stations/echangeur/\">HydroMétro, Échangeur</a>."],
    ["Le module hydraulique", "tout ce qui fait circuler et protège l’eau : le <strong>circulateur</strong> (la pompe), le <strong>vase d’expansion</strong> qui absorbe la dilatation, un <strong>appoint électrique</strong> (une résistance) pour les grands froids, des purgeurs et des vannes. Sur un bibloc, il est <strong>dedans</strong> et contient le condenseur à plaques ; sur un monobloc, le condenseur à plaques est dans la machine, dehors. Souvent un <strong>ballon tampon</strong> s’y ajoute : un grand volume d’eau qui évite les cycles courts. <a href=\"https://inerweb.fr/hydrometro/stations/boucle/\">HydroMétro, Boucle</a> et <a href=\"https://inerweb.fr/hydrometro/stations/tampon/\">Volume tampon</a> détaillent ce côté."],
    ["Monobloc ou bibloc", "<strong>Monobloc</strong> : toute la machine est dehors, d’un seul bloc ; c’est de l’<strong>eau</strong> qui traverse le mur. <strong>Bibloc</strong> : l’unité extérieure dehors, le module hydraulique dedans, reliés par deux <strong>liaisons frigorifiques</strong>, comme un split."],
    ["Le cycle", "le même que dans toute machine frigorifique : le fluide <strong>s’évapore dehors</strong> en prenant la chaleur de l’air, le compresseur le comprime, il <strong>se condense dans le condenseur à plaques</strong> en chauffant l’eau, le détendeur le ramène à basse pression. Le dessin le déroule pas à pas."]
  ],

  titreVariantes: 'Les familles de température, et le reste',
  variantes: [
    "<strong>Basse température</strong> — l’eau part vers un <strong>plancher chauffant</strong>, qui chauffe sur toute la surface avec une eau tiède. C’est la famille où la machine est le plus à l’aise.",
    "<strong>Moyenne température</strong> — l’eau part vers des <strong>radiateurs dimensionnés</strong> pour une eau moins chaude qu’avec une chaudière : plus grands, ou plus nombreux. La machine travaille un peu plus.",
    "<strong>Haute température</strong> — l’eau part vers d’<strong>anciens radiateurs</strong>, en fonte par exemple, prévus pour l’eau d’une chaudière. C’est le cas du remplacement de chaudière sans toucher aux radiateurs : la machine monte la chaleur très haut, et l’appoint électrique risque de servir plus souvent.",
    "<strong>La règle derrière les trois</strong> — plus l’écart est grand entre l’air du dehors et l’eau demandée, moins la machine est efficace. Plus l’eau est chaude <em>et</em> plus il fait froid dehors, plus elle force.",
    "<strong>L’eau chaude sanitaire</strong> — avec un <strong>ballon</strong> raccordé, la machine chauffe aussi l’eau du robinet, par un serpentin ; une résistance électrique complète si besoin. C’est un circuit à part de celui du chauffage.",
    "<strong>Réversible</strong> — la vanne 4 voies permet aussi de rafraîchir l’eau l’été (plancher rafraîchissant, ventilo-convecteurs) : station 2.6. Pour un groupe qui ne fait que de l’eau glacée : station 3.8."
  ],
  reglage: "La régulation fait <strong>suivre à l’eau la température du dehors</strong> (on parle de loi d’eau) : plus il fait doux, plus l’eau demandée peut être basse. <strong>Plus la consigne d’eau est basse, mieux la machine travaille</strong> ; on règle aussi à partir de quel froid l’appoint électrique a le droit de démarrer. Les valeurs viennent de la notice de la machine et de l’étude du bâtiment : aucune n’est donnée ici.",

  consigneAptitudes: 'Une PAC air/eau, avec son ballon d’eau chaude : cochez ce qu’elle sait faire, puis validez.',
  titreAptitudes: 'Que sait faire une PAC air/eau ?',
  colonnes: [
    { id: 'radiateurs', libelle: 'Chauffer des radiateurs', aide: 'faire partir de l’eau chauffée vers des émetteurs',
      dessin: '<rect x="14" y="26" width="72" height="48" rx="8"/><path d="M34 26 V74 M50 26 V74 M66 26 V74 M26 74 V88 M74 74 V88"/>' },
    { id: 'tresChaud', libelle: 'Eau très chaude, sans effort', aide: 'demander la même eau qu’une chaudière, sans que la machine en souffre',
      dessin: '<path d="M44 10 H56 V58 A18 18 0 1 1 44 58 Z"/><path d="M50 30 V66"/><path d="M70 20 H84 M70 34 H84 M70 48 H84"/>' },
    { id: 'robinet', libelle: 'Eau chaude du robinet', aide: 'avec un ballon d’eau chaude sanitaire raccordé',
      dessin: '<rect x="26" y="10" width="48" height="80" rx="16"/><path d="M50 40 C40 52 38 58 42 66 C46 72 54 72 58 66 C62 58 60 52 50 40 Z"/>' }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    radiateurs: true, tresChaud: false, robinet: true,
    bonneReponse: 'Exact. Elle chauffe l’eau des radiateurs, et avec un ballon celle du robinet. Mais une eau très chaude se paie : plus l’eau demandée est chaude, plus la machine force, surtout par grand froid.',
    erreurs: {
      radiateurs: 'C’est son premier métier : l’eau chauffée par le condenseur à plaques part vers des radiateurs ou un plancher chauffant.',
      tresChaud: 'Plus l’eau demandée est chaude, plus la machine doit monter la chaleur : son efficacité baisse, et l’appoint électrique peut prendre le relais sans qu’on le voie. Une chaudière n’a pas ce défaut ; une pompe à chaleur, si.',
      robinet: 'Oui, avec un ballon d’eau chaude sanitaire raccordé : un serpentin y prend la chaleur de l’eau de la machine, et une résistance complète si besoin. Sans ballon, elle ne chauffe que l’eau du chauffage.'
    }
  },

  titreCablage: 'Le raccordement',
  cablage: [
    "<strong>Côté fluide (bibloc)</strong> : deux liaisons frigorifiques en cuivre entre l’unité extérieure et le module intérieur. Longueur, tirage au vide et charge comme pour un split : stations 4.2 et 4.7. Un monobloc n’en a pas : le tirage au vide ne se fait pas sur place.",
    "<strong>Côté eau</strong> : un départ et un retour, <strong>isolés</strong> sur toute leur longueur une fois le circuit mis en pression, avec les vannes d’arrêt, le vase d’expansion et le circulateur. Le geste et les schémas : <a href=\"https://inerweb.fr/hydrometro/stations/boucle/\">HydroMétro, Boucle</a>.",
    "<strong>Le ballon tampon</strong> se place sur le circuit entre la machine et les émetteurs : <a href=\"https://inerweb.fr/hydrometro/stations/tampon/\">HydroMétro, Volume tampon</a>.",
    "<strong>L’électricité</strong> : l’alimentation de la machine et celle de l’appoint, avec leur protection ; le raccordement à la régulation ; la mise à la terre des canalisations métalliques. Station 4.5."
  ],
  piege: "Un <strong>monobloc sans protection contre le gel</strong> : son eau passe dehors. Une coupure de courant par grand froid, et l’eau gèle dans les tuyaux, qui éclatent. On ajoute un antigel dans le circuit, on isole les tuyaux, et on laisse agir la fonction antigel de la régulation. Deux autres pièges : <strong>demander une eau trop chaude</strong> (l’appoint électrique tourne sans qu’on le voie) et <strong>oublier le volume tampon</strong> (le compresseur fait des cycles courts).",

  symboles: [
    { src: 'assets/ud-exte-split.svg', alt: "Symbole d’une unité extérieure : un boîtier avec son hélice et ses raccords.", legende: "Unité extérieure" },
    { src: 'assets/pac_air_eau_ui.svg', alt: "Symbole de l’unité intérieure d’une pompe à chaleur air/eau : un boîtier gris, haut, avec quatre raccords en partie basse.", legende: "Unité intérieure air/eau (module hydraulique)" }
  ],
  titreLecturePlan: 'Le lire sur un plan',
  lecturePlan: [
    "Sur un plan, l’<strong>unité extérieure</strong> est sur la façade, au sol ou en toiture ; le <strong>module hydraulique</strong> est dans la chaufferie ou le local technique, près du ballon tampon.",
    "Ce qui traverse le mur dit le type de machine : deux <strong>liaisons frigorifiques</strong>, cotées en longueur et en dénivelé, c’est un <strong>bibloc</strong> ; deux <strong>tuyaux d’eau</strong> isolés, c’est un <strong>monobloc</strong>.",
    "Sur le circuit d’eau, suivez l’ordre : le circulateur, le ballon tampon, le vase d’expansion, puis la vanne qui sépare le chauffage du ballon d’eau chaude sanitaire (ECS). L’ordre exact vient du schéma hydraulique.",
    "Cherchez pour <strong>quel émetteur</strong> l’eau est prévue : plancher, radiateurs adaptés, anciens radiateurs. C’est ce choix qui fixe la famille — basse, moyenne ou haute température.",
    "Les repères courants : <strong>UE</strong> pour l’unité extérieure, <strong>PAC</strong> pour la pompe à chaleur, <strong>ECS</strong> pour l’eau chaude sanitaire."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Trois familles, et ce qui traverse le mur',

  quiz: [
    { question: "Dans une PAC air/eau monobloc, qu’est-ce qui traverse le mur ?",
      confirmation: "Un départ et un retour d’eau : le circuit frigorifique reste tout entier dans la machine, dehors.",
      reponses: [
        { texte: "Deux liaisons frigorifiques.", pourquoi: "Ce sont celles d’un bibloc ou d’un split. Un monobloc garde son circuit frigorifique dehors, d’un seul bloc." },
        { texte: "Rien : tout reste dehors.", pourquoi: "Le circuit frigorifique reste dehors, mais l’eau chauffée doit entrer dans la maison, jusqu’aux radiateurs ou au plancher." },
        { texte: "De l’air chaud, par une gaine.", pourquoi: "La machine prend la chaleur de l’air du dehors et la donne à de l’eau, pas à de l’air : aucune gaine ne traverse le mur." },
        { texte: "Un départ et un retour d’eau.", juste: true } ] },

    { question: "Que risque-t-il de geler dans un monobloc, si on n’a rien prévu ?",
      confirmation: "L’eau des tuyaux qui passent dehors : une coupure de courant par grand froid peut les faire éclater.",
      reponses: [
        { texte: "L’eau des tuyaux qui passent dehors.", juste: true },
        { texte: "L’huile du compresseur.", pourquoi: "L’huile reste dans le compresseur, à l’abri. Ce qui craint le gel, c’est l’eau du circuit de chauffage qui passe dehors." },
        { texte: "L’air du ventilateur.", pourquoi: "L’air ne gèle pas : le danger vient de l’eau, qui se dilate en gelant et fait éclater les tuyaux." },
        { texte: "Le fluide frigorigène.", pourquoi: "Il reste dans son circuit fermé et ce n’est pas de l’eau : le risque d’éclatement, ce sont les tuyaux d’eau." } ] },

    { question: "Vous remplacez une chaudière et gardez les anciens radiateurs en fonte. Quelle famille ?",
      confirmation: "Haute température : ces radiateurs, prévus pour l’eau d’une chaudière, demandent une eau bien plus chaude.",
      reponses: [
        { texte: "Basse température.", pourquoi: "C’est la famille du plancher chauffant, dont l’eau est tiède : elle ne chaufferait pas assez d’anciens radiateurs prévus pour l’eau d’une chaudière." },
        { texte: "Haute température.", juste: true },
        { texte: "Moyenne température.", pourquoi: "Elle va avec des radiateurs dimensionnés pour une eau moins chaude. Les anciens, prévus pour une chaudière, demandent plus." },
        { texte: "Aucune : une PAC ne chauffe pas des radiateurs.", pourquoi: "Si : l’eau chauffée par le condenseur à plaques peut aller aux radiateurs. C’est même un cas courant, en relève de chaudière ou en remplacement." } ] },

    { question: "Pourquoi une eau plus chaude fait-elle baisser l’efficacité de la machine ?",
      confirmation: "L’écart à franchir entre l’air du dehors et l’eau grandit : le compresseur doit monter la chaleur plus haut.",
      reponses: [
        { texte: "Parce que l’eau chaude est plus difficile à pomper.", pourquoi: "Ce n’est pas le circulateur qui force : c’est le compresseur, qui doit monter la chaleur plus haut." },
        { texte: "Parce que le condenseur à plaques s’encrasse.", pourquoi: "Rien à voir avec la propreté : même neuve, la machine force davantage pour une eau plus chaude." },
        { texte: "Parce que l’écart à franchir avec l’air du dehors grandit.", juste: true },
        { texte: "Parce que le fluide change de nature.", pourquoi: "Le fluide reste le même. Il faut seulement le comprimer davantage pour qu’il devienne plus chaud que l’eau demandée." } ] },

    { question: "À quoi sert un ballon tampon sur une PAC ?",
      confirmation: "À éviter les cycles courts : un grand volume d’eau à chauffer empêche la machine de démarrer et de s’arrêter toutes les quelques minutes.",
      reponses: [
        { texte: "À produire l’eau chaude du robinet.", pourquoi: "Ça, c’est le ballon d’eau chaude sanitaire. Le tampon contient l’eau du chauffage, pas celle qu’on utilise à la douche." },
        { texte: "À chauffer l’air de la pièce.", pourquoi: "Un ballon tampon ne chauffe rien lui-même : il stocke de l’eau déjà chauffée par la machine." },
        { texte: "À remplacer le vase d’expansion.", pourquoi: "Le vase absorbe la dilatation de l’eau ; le tampon apporte du volume. Les deux ont leur place sur le circuit." },
        { texte: "À éviter les cycles courts du compresseur.", juste: true } ] },

    { question: "L’unité extérieure se met en dégivrage. Où la machine prend-elle la chaleur pour faire fondre la glace ?",
      confirmation: "Sur l’eau du chauffage : le cycle s’inverse quelques minutes, et la chaleur vient du côté eau.",
      reponses: [
        { texte: "Sur l’eau du chauffage.", juste: true },
        { texte: "Dans le ventilateur, qui chauffe en tournant.", pourquoi: "Un ventilateur brasse l’air, il ne produit pas la chaleur nécessaire pour faire fondre la glace de la batterie." },
        { texte: "Dans l’air du dehors, en faisant tourner le ventilateur plus fort.", pourquoi: "L’air est trop froid pour faire fondre la glace, et c’est justement la glace qui bloque son passage dans la batterie." },
        { texte: "Dans le sol, sous l’unité.", pourquoi: "Une PAC air/eau n’a aucun capteur dans le sol : elle ne connaît que l’air et l’eau." } ] }
  ],

  retenir: [
    "<strong>Même cycle qu’un split</strong> — mais le condenseur est un échangeur à plaques : il chauffe de l’<strong>eau</strong>.",
    "<strong>Monobloc : l’eau traverse le mur</strong> (il faut la protéger du gel). <strong>Bibloc : deux liaisons frigorifiques</strong>, comme un split.",
    "<strong>Basse, moyenne, haute température</strong> : plancher, radiateurs adaptés, anciens radiateurs. Plus l’eau est chaude, moins la machine est efficace.",
    "<strong>Le ballon tampon évite les cycles courts</strong> ; le dégivrage prend quelques minutes de chaleur sur l’eau."
  ],

  objectifs: '<p><strong>Objectif.</strong> Reconnaître les deux parties d’une PAC air/eau — l’unité extérieure et le côté eau —, suivre la chaleur de l’air jusqu’à l’émetteur, et savoir pourquoi la température de l’eau demandée change tout.</p><p><strong>Limite.</strong> Le côté eau — boucle, volume tampon, circulateur, échangeur — est chez HydroMétro. Aucune température, aucune puissance, aucun rendement chiffré n’est donné ici : ils viennent de la notice de la machine et de l’étude du bâtiment. Les qualifications d’installateur et le bruit des pompes à chaleur relèvent de la Législation.</p>',

  credits: [
    { quoi: 'Photographies', source: 'documents de cours du fonds inerWeb',
      detail: 'dossier d’installation d’un groupe air/eau d’atelier (PRWA1000005A). Toute image signalée sera remplacée.' },
    { quoi: 'Symboles', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' },
    { quoi: 'Textes', source: 'documents du fonds inerWeb',
      detail: 'guide de l’ADEME sur les pompes à chaleur de l’habitat individuel · notices d’une PAC air/eau (utilisation et manuel technique) · fiche d’un fabricant de ballons tampons · « Le fonctionnement PAC »' } ],

  correspondances: [
    { ligne: 2, couleur: '#3D7FCA', texte: "2.6 La vanne 4 voies : froid ou chaud", url: lien('2.6') },
    { ligne: 2, couleur: '#3D7FCA', texte: "2.7 Le dégivrage par inversion de cycle", url: lien('2.7') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.2 Le split : deux unités, un circuit", url: lien('3.2') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.8 Groupe d’eau glacée et ventilo-convecteurs", url: lien('3.8') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.2 Les liaisons frigorifiques", url: lien('4.2') },
    { ligne: 'H', couleur: '#176B73', texte: "HydroMétro — Production", url: 'https://inerweb.fr/hydrometro/stations/production/' },
    { ligne: 'H', couleur: '#176B73', texte: "HydroMétro — Volume tampon", url: 'https://inerweb.fr/hydrometro/stations/tampon/' },
    { ligne: 'L', couleur: '#92400E', texte: "Législation — PAC et voisinage", url: 'https://inerweb.fr/legislation/stations/acoustique-pac-voisinage/' },
    { ligne: 'L', couleur: '#92400E', texte: "Législation — RGE et QualiPAC", url: 'https://inerweb.fr/legislation/stations/certif-rge-qualipac/' }
  ]
});
