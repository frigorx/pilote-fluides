/* CartoClim 4.5 — Alimenter et relier les deux unités. Station-tâche, écrite le 02/10/2026.
   Aucun calibre, aucune section : « ceux de la notice ». Les protections et la section de câble
   sont expliquées par ÉlectroRézo, la consignation par HoCourant : on y renvoie, on ne les réécrit pas. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '4.5', ligne: 4,
  kicker: 'CartoClim · Ligne 4 Installer · Station 5',
  titre: "Alimenter et relier les deux unités",
  narration: NARRATION,
  titres: { decouvrir: 'Le chantier', comprendre: 'Ce qu’il faut savoir', manipuler: 'Le geste', representer: 'Sur le schéma' },

  prerequis: [
    { id: '3.2', quoi: "le split : deux unités, un circuit" },
    { id: '4.1', quoi: "où poser les deux unités" }
  ],

  photos: [
    { src: 'assets/biblio/38209cca50.jpeg',
      alt: "Une unité extérieure de climatiseur fixée à un mur en pierre, en cours de mise en service : un manifold avec ses flexibles, une pompe à vide posée dessus, une échelle et un dévidoir de câble à gauche.",
      titre: "Dehors, un chantier en cours.", sous: "L’unité extérieure est fixée au mur ; il a fallu lui amener le courant et la relier à l’unité intérieure." },
    { src: 'assets/biblio/96c264b646.png',
      alt: "Une couronne de câble rond sous gaine noire ; en médaillon, l’extrémité dénudée montre quatre fils de couleurs différentes.",
      titre: "Quatre fils sous une même gaine.", sous: "Chacun a son rôle et son repère sur le bornier. Le câble à poser est celui que la notice indique." }
  ],

  titreSert: 'La situation',
  aQuoiCaSert: "Un split fixe ne démarre que si ses <strong>deux unités sont alimentées</strong> et <strong>reliées entre elles</strong>. Le plus souvent, le courant arrive à l’<strong>unité extérieure</strong>, et c’est elle qui alimente l’unité intérieure par un <strong>câble d’interconnexion</strong> : phase, neutre, terre, et un fil de communication. Mais le sens varie selon le constructeur : c’est le schéma de la notice qui commande.",
  ouOnLeTrouve: "On intervient à trois endroits : au <strong>tableau</strong>, qui porte la protection de la machine ; à côté de l’unité extérieure, où se trouve l’<strong>interrupteur de proximité</strong> ; et sous les capots des deux unités, devant les <strong>borniers</strong>. C’est le travail de l’installateur.",

  scene: () => ScenesStation.alimenterEtRelier(),

  titreDedans: 'Les quatre fils',
  technologie: [
    ["La phase et le neutre", "ils apportent l’énergie : celle du compresseur, du ventilateur, des cartes électroniques. Chacun va à son repère ; une erreur de repère abîme l’appareil."],
    ["La terre", "elle protège les personnes : si une pièce métallique se retrouve sous tension, le courant s’écoule par la terre au lieu de passer par vous. Elle est <strong>obligatoire</strong>."],
    ["Le fil de communication", "il ne porte pas d’énergie, il porte des <strong>messages</strong> entre la carte de l’unité intérieure et celle de l’unité extérieure. Sans lui, les deux unités ne se comprennent pas."],
    ["La protection, au tableau", "un <strong>disjoncteur réservé à cette machine</strong>, au calibre donné par la notice, et un <strong>différentiel</strong>. Aucune autre prise, aucun autre appareil sur la même ligne. Ces appareils sont expliqués dans ÉlectroRézo, station 4.3 pour le disjoncteur, station 4.5 pour le différentiel."],
    ["Le moyen de couper et le câble", "un <strong>interrupteur de proximité</strong>, à portée de main de l’unité extérieure, qui coupe tous les pôles. Et un câble d’une <strong>section adaptée</strong> à la puissance et à la distance — la notice la donne, ÉlectroRézo (station 4.10) explique comment — d’un type <strong>prévu pour l’extérieur</strong> sur la partie qui reste dehors."]
  ],

  titreVariantes: 'Les cas particuliers',
  variantes: [
    "<strong>Qui alimente qui ?</strong> Le plus souvent, l’unité extérieure reçoit le courant et alimente l’unité intérieure. Sur certains appareils, c’est l’inverse : on ne devine pas, on lit le schéma de la notice.",
    "<strong>Un ou deux fils de communication.</strong> Selon l’appareil, les messages passent par un fil ou par deux. La notice et le bornier disent combien : on compte les bornes.",
    "<strong>Un petit appareil à fiche.</strong> Il en existe, livrés avec une fiche pour une prise. Ce n’est pas le cas d’un split posé à demeure, qui a sa propre ligne depuis le tableau.",
    "<strong>Plusieurs unités intérieures.</strong> Sur un multisplit ou un DRV, il y a plusieurs câbles et plus de repères à respecter. Stations 3.4 et 3.5."
  ],
  reglage: "Ici rien ne se règle, tout se lit : le <strong>calibre</strong> du disjoncteur, le <strong>type et la section</strong> du câble, les <strong>repères</strong> du bornier. Ces trois choses sont dans la notice de l’appareil, jamais dans la mémoire de l’installateur.",

  consigneAptitudes: 'L’unité extérieure d’un split fixe, posé à demeure : cochez ce qu’elle doit avoir, puis validez.',
  titreAptitudes: 'Bien alimenté ?',
  colonnes: [
    { id: 'disjoncteur', libelle: 'Disjoncteur dédié', aide: 'une protection réservée à cette machine, au tableau',
      dessin: '<path d="M50 8 L84 22 V50 C84 72 68 86 50 92 C32 86 16 72 16 50 V22 Z"/><path d="M34 52 L46 64 L68 38"/>' },
    { id: 'communication', libelle: 'Fil de communication', aide: 'un fil qui porte les messages entre les deux unités',
      dessin: '<path d="M8 32 h22 v36 h-22 z M70 32 h22 v36 h-22 z"/><path d="M36 44 H64 M57 37 L64 44 L57 51 M64 58 H36 M43 51 L36 58 L43 65"/>' },
    { id: 'prise', libelle: 'Prise de la pièce', aide: 'se brancher comme une lampe, sur la prise d’une pièce',
      dessin: '<path d="M36 6 V28 M64 6 V28"/><path d="M22 28 H78 V52 C78 70 66 80 50 80 C34 80 22 70 22 52 Z"/><path d="M50 80 V96"/>' }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    disjoncteur: true, communication: true, prise: false,
    bonneReponse: 'Exact. L’unité extérieure a sa propre protection au tableau, et un fil de communication la relie à l’unité intérieure. Mais elle ne se branche pas sur une prise de la pièce : un split fixe a sa propre ligne, depuis le tableau.',
    erreurs: {
      disjoncteur: 'Elle doit être protégée par un disjoncteur qui ne sert qu’à elle, au tableau, avec le calibre que donne la notice.',
      communication: 'Le câble entre les deux unités contient un fil de communication : c’est lui qui permet aux deux cartes de se parler.',
      prise: 'Un split fixe n’est pas une lampe : il a sa propre ligne depuis le tableau, sans autre appareil dessus. Une prise de la pièce n’est pas faite pour cela, et elle partagerait le circuit avec autre chose.'
    }
  },

  titreCablage: 'Dans l’ordre',
  cablage: [
    "<strong>Consigner d’abord.</strong> Avant d’ouvrir un bornier : on coupe, on condamne, on vérifie qu’il n’y a plus de tension. La méthode complète est dans HoCourant, le module « Mettre en sécurité : la consignation ».",
    "<strong>Poser la ligne.</strong> Au tableau, un disjoncteur réservé à la machine et un différentiel, au calibre de la notice (ÉlectroRézo, station 4.3) ; puis un câble de la section de la notice (ÉlectroRézo, station 4.10), prévu pour l’extérieur sur la partie qui sort.",
    "<strong>Placer l’interrupteur de proximité</strong> à portée de main de l’unité extérieure.",
    "<strong>Raccorder l’unité extérieure</strong> : phase, neutre et terre, chacun à son repère. Le câble fait une boucle avant d’entrer dans l’unité, pour que l’eau ne coule pas jusqu’au bornier.",
    "<strong>Relier les deux unités</strong> : un câble à quatre fils, chaque fil au <strong>même repère des deux côtés</strong> — 1 avec 1, N avec N, 2 avec 2, la terre avec la terre.",
    "<strong>Contrôler avant de remettre sous tension</strong> : terre en place, repères un à un, capots refermés."
  ],
  piege: "Quatre pièges. Les <strong>repères inversés</strong> : au premier démarrage, l’appareil affiche un défaut de communication. La <strong>terre oubliée</strong>. Un <strong>câble de maison laissé dehors</strong>, qui vieillit au soleil. Une <strong>protection partagée</strong> avec autre chose. Et jamais un calibre ni une section de mémoire : ceux de la notice.",

  titreSymboles: 'Les symboles du schéma',
  symboles: [
    { src: 'assets/ud-exte-split.svg', alt: "Symbole d’une unité extérieure de climatiseur : un boîtier avec son hélice et ses deux raccords.", legende: "Unité extérieure" },
    { src: 'assets/split-pared.svg', alt: "Symbole d’une unité intérieure murale de climatiseur : un boîtier allongé avec sa grille de soufflage.", legende: "Unité intérieure" },
    { src: 'assets/disjonct-m_1fn.svg', alt: "Symbole d’un disjoncteur à deux pôles, phase et neutre, reliés par un trait pointillé.", legende: "Disjoncteur, phase et neutre" },
    { src: 'assets/interrupteur_sectionneur_biphase.svg', alt: "Symbole d’un interrupteur-sectionneur : des lames qui s’ouvrent, reliées par un trait pointillé.", legende: "Interrupteur de proximité" },
    { src: 'assets/bornier5x.svg', alt: "Symbole d’un bornier : une rangée de bornes rondes.", legende: "Bornier, une borne par fil" },
    { src: 'assets/terre.svg', alt: "Symbole de la terre : un trait vertical qui finit par trois traits horizontaux de plus en plus courts.", legende: "Terre" }
  ],
  titreLecturePlan: 'Le lire sur le schéma de la notice',
  lecturePlan: [
    "Cherchez d’abord le <strong>schéma de câblage</strong> dans la notice. Il dit <strong>qui alimente qui</strong> : c’est lui qui commande, pas l’habitude.",
    "Repérez le <strong>bornier de chaque unité</strong>. Les repères y sont les mêmes : un fil relie toujours un repère à son jumeau, de l’autre côté.",
    "Suivez les <strong>quatre fils</strong> : phase, neutre, terre, communication. Un fil qui change de repère entre les deux unités, sur le schéma, c’est une erreur.",
    "Relevez le <strong>calibre de la protection</strong> et le <strong>type de câble</strong> demandés : ils sont dans la notice, jamais dans votre mémoire.",
    "Sur un plan d’installation, l’<strong>interrupteur de proximité</strong> est dessiné entre le tableau et l’unité extérieure. S’il manque sur le plan, il manquera sur le chantier."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Ce qu’on alimente et ce qu’on relie',

  quiz: [
    { question: "Dans la plupart des splits, qui reçoit le courant du tableau ?",
      confirmation: "L’unité extérieure, qui alimente l’unité intérieure par le câble d’interconnexion. Mais le schéma de la notice commande.",
      reponses: [
        { texte: "L’unité extérieure, qui alimente l’unité intérieure par le câble.", juste: true },
        { texte: "L’unité intérieure, seule.", pourquoi: "Le plus souvent, le courant arrive à l’unité extérieure, là où se trouve le compresseur. L’unité intérieure est alimentée par le câble qui les relie." },
        { texte: "Les deux, chacune par sa propre ligne.", pourquoi: "C’est rare. En général une seule ligne arrive, et le câble d’interconnexion porte le courant à l’autre unité." },
        { texte: "Une prise de la pièce.", pourquoi: "Un split posé à demeure a sa propre ligne, depuis le tableau, avec sa protection." } ] },

    { question: "Que contient le câble d’interconnexion ?",
      confirmation: "Quatre fils : phase, neutre, terre, et un fil de communication.",
      reponses: [
        { texte: "Phase et neutre seulement.", pourquoi: "Il manquerait la terre, obligatoire, et le fil par lequel les deux cartes se parlent." },
        { texte: "Phase, neutre, terre et un fil de communication.", juste: true },
        { texte: "Le fluide frigorigène.", pourquoi: "Le fluide circule dans les deux tubes de cuivre, jamais dans le câble." },
        { texte: "Un fil de communication seulement.", pourquoi: "Il faut aussi apporter le courant à l’autre unité, et la relier à la terre." } ] },

    { question: "Au premier démarrage, l’appareil affiche un défaut de communication. Que contrôler d’abord ?",
      confirmation: "Les repères des fils aux deux bornes, après avoir consigné : un fil croisé empêche les deux cartes de se parler.",
      reponses: [
        { texte: "La pente du tuyau de condensats.", pourquoi: "La pente joue sur l’évacuation de l’eau, pas sur les messages entre les cartes." },
        { texte: "Le niveau de fluide.", pourquoi: "Un défaut de communication parle de fils et de cartes, pas du circuit frigorifique." },
        { texte: "Les repères des fils aux deux bornes.", juste: true },
        { texte: "Le calibre du disjoncteur.", pourquoi: "Un calibre inadapté fait déclencher le disjoncteur ; il ne brouille pas la communication." } ] },

    { question: "Pourquoi la terre est-elle obligatoire ?",
      confirmation: "C’est une protection des personnes : en cas de défaut, le courant s’écoule par la terre et non par vous.",
      reponses: [
        { texte: "Pour faire tourner le compresseur.", pourquoi: "Le compresseur fonctionne avec la phase et le neutre ; la terre ne porte aucun courant en marche normale." },
        { texte: "Pour que les deux cartes se parlent.", pourquoi: "C’est le rôle du fil de communication, pas de la terre." },
        { texte: "Pour mesurer la température.", pourquoi: "Aucun rapport : la terre protège les personnes, elle ne mesure rien." },
        { texte: "Pour que le courant d’un défaut s’écoule par elle, pas par vous.", juste: true } ] },

    { question: "Un câble de maison est laissé dehors, sur la partie qui sort du mur. Quel est le problème ?",
      confirmation: "Sa gaine n’est pas faite pour le soleil et la pluie : elle vieillit. Dehors, il faut un câble prévu pour l’extérieur.",
      reponses: [
        { texte: "Il vieillit au soleil et à la pluie : il faut un câble prévu pour l’extérieur.", juste: true },
        { texte: "Il est trop long.", pourquoi: "La longueur n’est pas en cause ici : c’est le type de câble." },
        { texte: "Il ne conduit plus le courant.", pourquoi: "Il conduit toujours ; c’est sa gaine qui se dégrade dehors, et avec elle la protection." },
        { texte: "Aucun : un câble est un câble.", pourquoi: "Non : la gaine d’un câble d’intérieur n’est pas faite pour rester dehors, elle se dégrade avec le temps." } ] },

    { question: "Sur quelle ligne branche-t-on l’unité extérieure ?",
      confirmation: "Une ligne réservée à la machine, avec son disjoncteur : un disjoncteur partagé déclencherait pour l’un ou pour l’autre.",
      reponses: [
        { texte: "La ligne des prises de la pièce.", pourquoi: "Un autre appareil sur la même ligne, et le disjoncteur déclenche pour l’un ou pour l’autre, sans dire lequel." },
        { texte: "Une ligne réservée à elle, avec son disjoncteur.", juste: true },
        { texte: "N’importe laquelle : un disjoncteur protège de tout.", pourquoi: "Un disjoncteur ne choisit pas : s’il est partagé, il déclenche pour tous. La notice demande une ligne réservée à l’appareil." },
        { texte: "La ligne de l’éclairage.", pourquoi: "Même raison : une protection commune avec autre chose est à éviter." } ] }
  ],

  retenir: [
    "<strong>Le courant arrive le plus souvent à l’unité extérieure</strong>, qui alimente l’intérieure par le câble — mais le schéma de la notice commande.",
    "<strong>Quatre fils</strong> : phase, neutre, terre, communication. <strong>Le même repère des deux côtés</strong> : 1 avec 1, N avec N, 2 avec 2.",
    "<strong>Une ligne à elle</strong> : disjoncteur réservé, différentiel, interrupteur de proximité, câble prévu pour l’extérieur, terre obligatoire.",
    "<strong>On consigne avant d’ouvrir un bornier</strong>, et on lit le calibre et la section dans la notice."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre comment un split est alimenté et comment ses deux unités sont reliées : le chemin du courant, les quatre fils, les repères du bornier, les protections, et les pièges d’un premier démarrage.</p><p><strong>Limite.</strong> Aucun calibre, aucune section de câble n’est donné ici : ils viennent de la notice de l’appareil. Les protections et la section sont expliquées dans ÉlectroRézo (stations 4.3 et 4.10), la consignation dans HoCourant, les condensats dans la station 4.4.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'un chantier réel (unité extérieure sur un mur de pierre) et un visuel de câble à quatre fils, trouvés par outils/chercher-images.mjs dans des documents de cours indexés — toute image signalée sera remplacée' },
    { quoi: 'Symboles', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné ; seul le fond blanc est remplacé par le fond crème de la charte' } ],

  correspondances: [
    { ligne: 4, couleur: '#1E7E54', texte: "4.1 Poser les deux unités", url: lien('4.1') },
    { ligne: 5, couleur: '#B06A00', texte: "5.6 Les codes défauts : lire ce que dit la machine", url: lien('5.6') },
    { ligne: 4, couleur: '#c0392b', texte: "ÉlectroRézo 4.3 — Le disjoncteur magnéto-thermique", url: 'https://inerweb.fr/electrorezo/stations/4-3-disjoncteur-magneto-thermique/' },
    { ligne: 4, couleur: '#c0392b', texte: "ÉlectroRézo 4.10 — Choisir la section d’un câble", url: 'https://inerweb.fr/electrorezo/stations/4-10-choisir-section/' },
    { ligne: 'H', couleur: '#637285', texte: "HoCourant — Mettre en sécurité : la consignation (module M9)", url: 'https://inerweb.fr/hocourant/?module=M9' } ]
});
