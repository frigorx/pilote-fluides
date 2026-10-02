/* CartoClim 4.1 — Poser les deux unités : emplacement, supports, dégagements. Station-tâche, écrite le 02/10/2026. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '4.1', ligne: 4,
  kicker: 'CartoClim · Ligne 4 Installer · Station 1',
  titre: "Poser les deux unités : emplacement, supports, dégagements",
  narration: NARRATION,

  titres: { decouvrir: 'Le chantier', comprendre: 'Ce qu’il faut savoir', manipuler: 'Le geste', representer: 'Sur le plan' },

  prerequis: [
    { id: '3.2', quoi: "les deux unités du split, et ce qu’il y a dans chacune" }
  ],

  photos: [
    { src: 'assets/biblio/a8f687026b.jpg',
      alt: "Trois scènes de pose. À gauche, un technicien monte l’unité intérieure au mur d’une pièce. Au centre, un autre travaille sur une unité extérieure fixée à la façade sur ses supports. À droite, un troisième s’occupe d’une unité extérieure posée au sol sur des plots.",
      titre: "Trois gestes de pose.", sous: "Au mur dedans ; sur la façade ou sur des plots dehors." },
    { src: 'assets/biblio/723a7f8271.jpeg',
      alt: "Une unité extérieure blanche posée sur un châssis métallique, contre un mur de béton. Ses liaisons, protégées dans une gaine noire, descendent le long de l’unité puis courent au sol sur des supports.",
      titre: "Un support sous l’unité.", sous: "Elle ne repose pas sur le sol : un châssis la porte, et ses liaisons sont protégées." }
  ],

  titreSert: 'La situation',
  aQuoiCaSert: "Le client a choisi son split : il reste à <strong>le poser</strong>. Poser, c’est choisir <strong>deux emplacements</strong> et leur donner un <strong>support solide, de niveau</strong>. L’unité intérieure se fixe au mur de la pièce ; l’unité extérieure se pose dehors, sur la façade ou au sol. Entre les deux, un seul passage : un trou dans le mur, la <strong>carotte</strong>.",
  ouOnLeTrouve: "C’est le premier geste du chantier, avant les tubes, le câble et le tirage au vide. Un emplacement raté ne se rattrape pas avec une belle finition : bruit, panne en plein été, eau dans le mur. Il faut tout reprendre.",

  scene: () => ScenesStation.poseDesDeuxUnites(),

  titreDedans: 'Les deux emplacements',
  technologie: [
    ["L’unité intérieure", "se fixe sur une <strong>platine</strong>, vissée dans un <strong>mur qui porte</strong> : jamais une cloison légère sans renfort. Elle est <strong>de niveau</strong>, assez haute, avec de l’<strong>air libre autour</strong> de ses grilles ; le filtre doit pouvoir se retirer, et la place de la maintenance reste dégagée. Son <strong>jet</strong> ne doit tomber ni sur un lit ni sur un bureau."],
    ["La carotte", "c’est le trou rond percé dans le mur, par où passent les tubes, le câble et le tuyau de condensats. On la perce <strong>en pente vers l’extérieur</strong> : l’eau descend et sort. À contre-pente, elle reste dans le mur et le mouille."],
    ["Le support de l’unité extérieure", "une <strong>console murale</strong> fixée dans le mur, ou un <strong>sol rigide</strong>. L’unité repose sur des <strong>plots antivibratiles</strong>, <strong>de niveau</strong>, et elle est fixée fermement : sinon elle vibre et fait du bruit."],
    ["Les dégagements de l’unité extérieure", "l’air entre d’un côté et sort de l’autre. Rien ne doit gêner ni l’un ni l’autre, sinon l’air chaud soufflé est <strong>aspiré de nouveau</strong>. L’unité reste <strong>accessible</strong> pour l’entretien, <strong>loin de la chambre du voisin</strong>, à l’abri d’un vent violent, et <strong>au-dessus de la neige</strong>. Les distances exactes sont celles de la <strong>notice</strong> : on ne les invente pas."],
    ["Entre les deux", "la <strong>longueur</strong> de liaison et le <strong>dénivelé</strong> que l’appareil accepte sont écrits dans la notice. On les vérifie <strong>avant</strong> de percer : station 4.2."]
  ],

  titreVariantes: 'Les cas particuliers',
  variantes: [
    "<strong>L’unité extérieure au sol</strong> — sur un sol rigide, avec des plots antivibratiles. Le dessin montre la console murale ; le principe est le même : de niveau, solide, dégagée.",
    "<strong>Une cloison légère</strong> — on la renforce, ou on change de mur. On ne compte pas sur les vis seules.",
    "<strong>Deux unités extérieures côte à côte</strong> — l’air soufflé de l’une ne doit pas aller vers l’autre. Pour plusieurs unités intérieures sur une seule extérieure : station 3.4.",
    "<strong>Une autre forme d’unité intérieure</strong> — console, cassette de plafond, gainable : la pose change. Station 3.3.",
    "<strong>L’eau ne peut pas descendre</strong> — si la pente est impossible, une pompe de relevage prend le relais. Station 4.4.",
    "<strong>Neige et vent</strong> — dans une région enneigée, l’unité extérieure se place au-dessus du niveau de la neige ; en cas de vent violent, on la déplace ou on l’abrite."
  ],

  consigneAptitudes: 'Une pose bien faite : cochez ce qui est juste, puis validez.',
  titreAptitudes: 'Bien posé ?',
  colonnes: [
    { id: 'platine', libelle: 'Platine, de niveau', aide: 'l’unité intérieure se fixe au mur sur sa platine, bien horizontale',
      dessin: '<path d="M90 8 V92 M90 30 l9 -8 M90 54 l9 -8 M90 78 l9 -8"/><path d="M80 22 V70"/><path d="M80 28 H36 a10 10 0 0 0 -10 10 V52 a10 10 0 0 0 10 10 H80"/><path d="M36 50 H68"/>' },
    { id: 'partout', libelle: 'N’importe où dehors', aide: 'l’unité extérieure se pose là où elle tient, même dans un recoin',
      dessin: '<path d="M12 92 V14 H88 V92"/><path d="M30 44 h40 v38 h-40 z"/><path d="M39 63 a11 11 0 1 0 22 0 a11 11 0 1 0 -22 0"/>' },
    { id: 'carotte', libelle: 'Carotte en pente', aide: 'le trou dans le mur descend vers l’extérieur, pour que l’eau sorte',
      dessin: '<path d="M38 8 V92 M62 8 V92"/><path d="M16 38 L84 56"/><path d="M84 68 c-5 7 -5 11 0 11 c5 0 5 -4 0 -11 z"/>' }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    platine: true, partout: false, carotte: true,
    bonneReponse: 'Exact. L’unité intérieure tient sur sa platine, dans un mur qui porte, de niveau. L’unité extérieure ne se pose pas n’importe où : tenir ne suffit pas, il lui faut de l’air libre. Et la carotte descend vers l’extérieur, pour que l’eau sorte.',
    erreurs: {
      platine: 'L’unité intérieure se fixe au mur sur sa platine, et la platine est de niveau. C’est vrai : à cocher.',
      partout: 'Tenir ne suffit pas. Dans un recoin, l’air chaud soufflé est aspiré de nouveau et la haute pression monte l’été. Il lui faut de l’air libre, un support de niveau, et les dégagements de la notice.',
      carotte: 'La carotte descend vers l’extérieur : l’eau sort. À contre-pente, elle reste dans le mur. C’est vrai : à cocher.'
    }
  },

  titreCablage: 'Dans l’ordre',
  cablage: [
    "<strong>Avant de percer</strong> : lire dans la notice les dégagements, la longueur de liaison et le dénivelé admis. Station 4.2.",
    "<strong>La platine</strong> : repérer le mur qui porte, la fixer <strong>de niveau</strong> avec le niveau à bulle.",
    "<strong>La carotte</strong> : percer en <strong>pente vers l’extérieur</strong>, puis accrocher l’unité intérieure.",
    "<strong>Le support extérieur</strong> : le fixer <strong>de niveau</strong>, glisser les plots antivibratiles, puis poser et fixer l’unité.",
    "<strong>Les dégagements</strong> : vérifier l’air libre à l’aspiration et au soufflage, et l’accès pour l’entretien.",
    "<strong>Ensuite seulement</strong> : les tubes (4.2), les condensats (4.4), le câble (4.5)."
  ],
  piege: "Quatre erreurs coûtent cher. <strong>Carotte à contre-pente</strong> : l’eau reste dans le mur. <strong>Unité extérieure enfermée dans un recoin</strong> : l’été, la haute pression monte. <strong>Support pas de niveau</strong> : vibrations et bruit. <strong>Poser avant d’avoir vérifié la longueur et le dénivelé</strong> : il faudra déplacer une unité.",

  titreSymboles: 'Les symboles de la pose',
  symboles: [
    { src: 'assets/split-pared.svg', alt: "Symbole d’une unité intérieure murale de climatiseur : un boîtier allongé avec sa grille de soufflage.", legende: "Unité intérieure murale" },
    { src: 'assets/ud-exte-split.svg', alt: "Symbole d’une unité extérieure de climatiseur : un boîtier avec son hélice et ses raccords.", legende: "Unité extérieure" },
    { src: 'assets/soporte-ud-ext.svg', alt: "Symbole d’un support d’unité extérieure, vu de côté : une plaque verticale contre le mur et un bras horizontal qui porte l’unité.", legende: "Support de l’unité extérieure, vu de côté" }
  ],
  titreLecturePlan: 'Sur le plan',
  lecturePlan: [
    "Sur un plan de façade, l’<strong>unité extérieure</strong> est dessinée avec son <strong>support</strong>, et les <strong>dégagements</strong> sont indiqués autour d’elle.",
    "Ces cotes viennent de la <strong>notice</strong> de l’appareil. Si le plan n’en porte aucune, on les cherche avant de percer : on ne les devine pas.",
    "Le trait qui relie les deux unités traverse le mur à la <strong>carotte</strong>. Sa <strong>longueur</strong> et son <strong>dénivelé</strong> doivent rester dans ce que la notice autorise : station 4.2.",
    "Dans la pièce, le plan ne dit pas toujours où tombe le jet de l’<strong>unité intérieure</strong> : c’est au poseur d’y penser, loin des lits et des bureaux."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Une pose réussie, en un coup d’œil',

  quiz: [
    { question: "Sur quoi fixe-t-on la platine de l’unité intérieure ?",
      confirmation: "Sur un mur qui porte : c’est lui qui tient le poids de l’unité.",
      reponses: [
        { texte: "Sur une cloison légère, sans rien d’autre.", pourquoi: "Une cloison légère ne porte ni le poids de l’unité ni ses vibrations. Sans renfort, on change de mur." },
        { texte: "Sur un mur qui porte le poids de l’unité.", juste: true },
        { texte: "Sur le mur le plus proche de l’unité extérieure.", pourquoi: "La proximité de l’unité extérieure ne dit rien de la solidité du mur. On choisit d’abord un mur qui porte, et on vérifie la distance dans la notice." },
        { texte: "Sur n’importe quel mur, du moment que la platine est de niveau.", pourquoi: "De niveau est nécessaire, pas suffisant : si le mur ne porte pas, l’unité se décroche ou vibre." } ] },

    { question: "Dans quel sens la carotte est-elle en pente ?",
      confirmation: "Vers l’extérieur : l’eau descend et sort, elle ne reste pas dans le mur.",
      reponses: [
        { texte: "Elle n’a pas besoin de pente.", pourquoi: "Le trou est un passage, pas un tuyau étanche. Sans pente, l’eau ne trouve aucune raison de sortir." },
        { texte: "Vers l’intérieur : l’eau retourne vers l’unité.", pourquoi: "À contre-pente, l’eau reste dans le mur ou revient vers l’unité : au bout de quelques semaines, le mur est mouillé." },
        { texte: "Vers l’extérieur : l’eau descend et sort.", juste: true },
        { texte: "À l’horizontale, pour que ce soit propre.", pourquoi: "À l’horizontale, l’eau stagne. Elle ne part que si le passage descend vers l’extérieur." } ] },

    { question: "L’unité extérieure est enfermée dans un recoin. Que se passe-t-il l’été ?",
      confirmation: "L’air chaud soufflé revient dans la batterie : la haute pression monte.",
      reponses: [
        { texte: "Rien : l’air dehors est toujours frais.", pourquoi: "L’air soufflé par l’unité est chaud. Dans un recoin, il ne s’éloigne pas : il repasse dans la batterie." },
        { texte: "Le bac à condensats déborde.", pourquoi: "Le bac est dans l’unité intérieure : le recoin n’a rien à voir avec lui." },
        { texte: "Le compresseur tourne plus lentement.", pourquoi: "Au contraire : la batterie évacue moins bien la chaleur, la pression monte et la machine force. La sécurité haute pression peut même l’arrêter." },
        { texte: "L’air chaud soufflé est aspiré de nouveau : la haute pression monte.", juste: true } ] },

    { question: "Le support de l’unité extérieure n’est pas de niveau. Quelle conséquence ?",
      confirmation: "L’unité vibre et fait du bruit, qui se transmet au mur.",
      reponses: [
        { texte: "Des vibrations et du bruit.", juste: true },
        { texte: "Aucune : l’appareil tourne quand même.", pourquoi: "Il tourne, mais il vibre. Un support qui penche ou qui bouge fait du bruit, et le mur le transmet jusque dans la pièce." },
        { texte: "L’eau de la carotte coule à l’envers.", pourquoi: "La carotte a sa propre pente, sans lien avec le support. Ce sont deux réglages séparés." },
        { texte: "L’unité rejette moins de chaleur.", pourquoi: "La chaleur rejetée dépend de l’air qui passe dans la batterie, pas de l’horizontalité. Ce qui change, c’est le bruit et les vibrations." } ] },

    { question: "Quels dégagements laisser autour de l’unité extérieure ?",
      confirmation: "Ceux de la notice : chaque appareil a les siens, on ne les invente pas.",
      reponses: [
        { texte: "Ceux du dernier chantier : ils sont tous pareils.", pourquoi: "Chaque appareil a ses propres dégagements. On ne les devine pas, on lit la notice." },
        { texte: "Ceux de la notice de l’appareil.", juste: true },
        { texte: "Une main de chaque côté.", pourquoi: "Un dégagement n’est pas une approximation : c’est une cote écrite dans la notice." },
        { texte: "Aucun : l’air passe à travers le mur.", pourquoi: "L’air n’entre pas par le mur. Il est aspiré d’un côté et soufflé de l’autre : s’il bute, il revient." } ] },

    { question: "Que vérifie-t-on dans la notice avant de percer ?",
      confirmation: "La longueur de liaison et le dénivelé admis entre les deux unités.",
      reponses: [
        { texte: "Que le câble est assez long pour les relier.", pourquoi: "Le câble ne fixe pas la limite : ce sont les liaisons frigorifiques, station 4.2." },
        { texte: "Que les deux unités sont à la même hauteur.", pourquoi: "Elles ne le sont pas forcément. C’est le dénivelé qui compte, et la notice dit combien l’appareil en accepte." },
        { texte: "La longueur de liaison et le dénivelé admis.", juste: true },
        { texte: "Rien : on mesure une fois les unités posées.", pourquoi: "Trop tard : si la longueur ou le dénivelé dépasse ce que la notice autorise, il faut déplacer une unité." } ] }
  ],

  retenir: [
    "<strong>Dedans</strong> : un mur qui porte, une platine de niveau, de l’air libre autour, un jet loin du lit et du bureau.",
    "<strong>La carotte descend vers l’extérieur</strong> : l’eau sort, elle ne reste pas dans le mur.",
    "<strong>Dehors</strong> : un support de niveau, solide, avec des plots antivibratiles, et de l’air libre à l’aspiration comme au soufflage.",
    "<strong>Les dégagements, la longueur et le dénivelé sont ceux de la notice</strong> : on les lit, on ne les invente pas."
  ],

  objectifs: '<p><strong>Objectif.</strong> Choisir l’emplacement des deux unités, leur donner un support solide et de niveau, percer la carotte dans le bon sens, et reconnaître d’un coup d’œil une pose ratée.</p><p><strong>Limite.</strong> Les tubes, les condensats, le câble et le tirage au vide sont d’autres stations. Aucune cote n’est donnée ici : les dégagements, la longueur et le dénivelé admis viennent de la notice de l’appareil.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours et images du site, trouvés par outils/chercher-images.mjs — toute image signalée sera remplacée' },
    { quoi: 'Symboles', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' } ],

  correspondances: [
    { ligne: 3, couleur: '#6B5FB5', texte: "3.2 Le split : deux unités, un circuit", url: lien('3.2') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.3 Choisir l’unité intérieure", url: lien('3.3') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.2 Les liaisons : longueur, dénivelé, isolant", url: lien('4.2') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.4 Les condensats : pente, siphon, pompe", url: lien('4.4') },
    { ligne: 5, couleur: '#B06A00', texte: "5.3 L’entretien : filtres, batteries, bac", url: lien('5.3') } ]
});
