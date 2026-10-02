/* CartoClim 3.4 — Le multisplit : une unité extérieure, plusieurs pièces. Écrite le 02/10/2026.
   Le fonds est pauvre sur ce sujet : la station reste sur les principes, sans aucune valeur chiffrée. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '3.4', ligne: 3,
  kicker: 'CartoClim · Ligne 3 Les familles · Station 4',
  titre: "Le multisplit : une unité extérieure, plusieurs pièces",
  narration: NARRATION,

  prerequis: [
    { id: '3.2', quoi: "le split : deux unités, un circuit" }
  ],

  photos: [
    { src: 'assets/biblio/eb02058a14.jpg',
      alt: "Un multisplit : une seule unité extérieure blanche, posée sous deux unités intérieures murales.",
      titre: "Un seul boîtier dehors, deux unités dedans.", sous: "Une unité intérieure par pièce, toutes reliées au même groupe extérieur." },
    { src: 'assets/biblio/e5ee19c0e5.png',
      alt: "Au plafond d’un local, deux unités intérieures de type cassette, avec des spots lumineux autour.",
      titre: "Les unités intérieures ne sont pas toutes murales.", sous: "Ici, des cassettes de plafond. Mural, console, cassette ou gainable : c’est la station 3.3." }
  ],

  aQuoiCaSert: "À <strong>climatiser plusieurs pièces avec un seul groupe extérieur</strong>. Un split relie une unité intérieure à une unité extérieure ; le multisplit garde <strong>une seule unité extérieure</strong> et lui relie plusieurs unités intérieures, une par pièce. Dehors, un seul boîtier. Dedans, autant d’unités que de pièces à traiter. Entre les deux, <strong>un couple de tubes pour chaque pièce</strong>.",
  ouOnLeTrouve: "Dans un logement avec un séjour et des chambres, dans un petit commerce ou un cabinet qui a plusieurs pièces, partout où l’on veut éviter de poser un boîtier dehors par pièce. En contrepartie, il y a <strong>plus de tubes</strong> à tirer jusqu’aux pièces : moins de boîtiers dehors, plus de tubes dedans.",

  scene: () => ScenesStation.plusieursPieces(),

  technologie: [
    ["L’unité extérieure", "une seule pour toute l’installation : un <strong>compresseur Inverter</strong> dont la vitesse suit la demande de toutes les pièces, un condenseur balayé par une hélice, et un <strong>bloc de vannes de service</strong> où chaque pièce a ses deux raccords, repérés <strong>A, B, C</strong>. Si l’appareil est réversible, il n’a qu’<strong>une seule vanne 4 voies</strong>."],
    ["Les unités intérieures", "une par pièce, de la forme qui convient (station 3.3). Chacune a son évaporateur, sa turbine, son bac à condensats et ses sondes, et <strong>elle dit au groupe ce qu’elle demande</strong>."],
    ["Les liaisons", "pour chaque pièce, <strong>deux tubes de cuivre isolés</strong> (le petit pour le liquide, le gros pour le gaz) et un câble, tirés jusqu’au groupe. Le couple de la pièce A porte la lettre A aux deux bouts : c’est ce repère qui dit au groupe quelle pièce est au bout de quel raccord."],
    ["Le partage du fluide", "le fluide circule dans <strong>un seul circuit commun</strong>, le même cycle que le split (station 3.2). Chaque branche a son <strong>détendeur électronique</strong> (station 2.5), que la carte du groupe ouvre pour une pièce qui demande et ferme pour une pièce à l’arrêt. Selon le constructeur, ce détendeur est dans le groupe ou dans l’unité intérieure : la notice le dit."]
  ],

  variantes: [
    "<strong>Bi-split, tri-split, quadri-split</strong> — le nom compte les unités intérieures : deux, trois, quatre. Le nombre d’unités qu’un groupe accepte dépend du modèle : il est dans la notice.",
    "<strong>Mélanger les formes</strong> — une murale au séjour, une console ou un gainable ailleurs : souvent possible, dans la liste des unités compatibles que donne le constructeur. Station 3.3.",
    "<strong>Réversible ou froid seul</strong> — comme le split. Avec une seule vanne 4 voies pour tout le groupe, toutes les pièces sont <strong>dans le même mode</strong>. Station 2.6.",
    "<strong>Inverter</strong> — le compresseur adapte sa vitesse à la somme des demandes : il ralentit si une seule pièce travaille. Station 2.4.",
    "<strong>Pour un bâtiment avec beaucoup de pièces</strong> — on passe à un réseau de fluide à débit variable : le DRV, station 3.5."
  ],
  reglage: "Chaque pièce se règle depuis <strong>sa propre télécommande</strong> : température demandée, vitesse de la turbine. Mais le <strong>mode</strong>, froid ou chaud, est commun. Si deux pièces demandent des modes contraires, le groupe n’en suit qu’un : la règle, qui dépend du constructeur, est dans la notice. Station 5.1 pour la télécommande.",

  consigneAptitudes: 'Le multisplit du logement : cochez ce qu’il sait faire, puis validez.',
  titreAptitudes: 'Que sait faire un multisplit ?',
  colonnes: [
    { id: 'plusieurs', libelle: 'Plusieurs pièces', aide: 'les climatiser avec un seul groupe dehors, une unité par pièce',
      dessin: '<path d="M34 8 h32 v26 h-32 z M50 14 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M50 34 V50 M18 50 H82 M18 50 V64 M50 50 V64 M82 50 V64 M6 64 h24 v24 h-24 z M38 64 h24 v24 h-24 z M70 64 h24 v24 h-24 z"/>' },
    { id: 'oppose', libelle: 'Chaud ici, froid là', aide: 'chauffer une pièce et en refroidir une autre, en même temps',
      dessin: `<g transform="translate(-4,26) scale(.5)">${SceneKit.pictos.DESSINS.chaud}</g><g transform="translate(54,26) scale(.5)">${SceneKit.pictos.DESSINS.froid}</g>` },
    { id: 'une-seule', libelle: 'Une seule unité', aide: 'marcher avec une seule unité allumée, les autres pièces à l’arrêt',
      dessin: '<path d="M36 16 h28 v28 h-28 z M50 50 v26 M40 66 l10 10 l10 -10"/><path d="M4 16 h22 v28 h-22 z M74 16 h22 v28 h-22 z" stroke-dasharray="5 6"/>' }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    plusieurs: true, oppose: false, 'une-seule': true,
    bonneReponse: 'Exact. Un seul groupe sert plusieurs pièces, et il peut très bien travailler pour une seule : les autres branches sont fermées et le compresseur ralentit. Mais il ne chauffe pas une pièce pendant qu’il en refroidit une autre : le mode est le même pour toutes.',
    erreurs: {
      plusieurs: 'C’est sa raison d’être : un seul groupe dehors, une unité intérieure par pièce, chacune avec ses deux tubes.',
      oppose: 'Le fluide ne circule que dans un sens à la fois dans le groupe : une seule vanne 4 voies pour toutes les pièces. Toutes refroidissent, ou toutes chauffent.',
      'une-seule': 'Il le sait faire : les branches des pièces à l’arrêt sont fermées, et le compresseur Inverter ralentit pour ne servir que la pièce qui demande.'
    }
  },

  titreCablage: 'Le raccordement',
  cablage: [
    "<strong>Deux tubes de cuivre par pièce</strong> (le petit pour le liquide, le gros pour le gaz), de chaque unité intérieure jusqu’aux <strong>vannes de service du groupe</strong>. Plus de pièces, plus de tubes : station 4.2 pour les longueurs.",
    "<strong>Le repérage</strong> : les tubes et le câble de la pièce A portent la lettre A aux deux bouts. On repère avant de monter : une fois les tubes passés dans le mur, on ne les retrouve plus.",
    "<strong>Le câble de liaison de chaque unité intérieure</strong>, repéré comme ses tubes, plus l’alimentation du groupe, protégée par son disjoncteur : station 4.5.",
    "<strong>Un tuyau de condensats par unité intérieure</strong> : chaque pièce a son bac, et chaque tuyau sa pente. Station 4.4.",
    "<strong>Avant d’ouvrir les vannes</strong> : tirage au vide de toutes les liaisons et de toutes les unités intérieures, puis contrôle d’étanchéité. Stations 4.7 et 4.6."
  ],
  piege: "Trois erreurs reviennent. <strong>Inverser les liaisons de deux pièces</strong> au groupe : la pièce A reçoit alors la commande de B. <strong>Dépasser la longueur totale ou le dénivelé</strong> de la notice : le groupe est préchargé pour une longueur totale de liaisons, au-delà on ajoute du fluide en pesant. <strong>Oublier qu’une unité éteinte reste dans le circuit</strong> : ses tubes comptent, et une fuite chez elle vide tout le groupe. Aucune de ces limites ne se devine : elles sont dans la notice.",

  symboles: [
    { src: 'assets/ud-exte-split.svg', alt: "Symbole d’une unité extérieure de climatiseur : un boîtier avec son hélice et ses raccords.", legende: "Unité extérieure : une seule" },
    { src: 'assets/split-pared.svg', alt: "Symbole d’une unité intérieure murale de climatiseur : un boîtier allongé avec sa grille de soufflage.", legende: "Unité intérieure murale : une par pièce" }
  ],
  titreLecturePlan: 'Le lire sur un plan',
  lecturePlan: [
    "Sur un plan de multisplit, <strong>une seule unité extérieure</strong> (<strong>UE</strong>) sur la façade, au sol ou en toiture, et <strong>autant d’unités intérieures</strong> (<strong>UI</strong>) que de pièces traitées, chacune dans sa pièce.",
    "Les liaisons partent du groupe vers chaque pièce : <strong>un trait par pièce</strong>, avec son repère (A, B, C) et sa longueur. La <strong>longueur totale</strong> est la somme de ces traits : c’est elle que la notice limite, avec le dénivelé.",
    "Le repère du plan doit être <strong>le même sur les tubes et sur les câbles</strong> que l’on pose. C’est ce qui évite d’inverser deux pièces au groupe.",
    "Le <strong>tuyau de condensats</strong> est tracé pour chaque unité intérieure, jusqu’à son évacuation."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Ce qu’on raccorde pour chaque pièce',

  quiz: [
    { question: "Qu’est-ce qui distingue un multisplit d’un split ?",
      confirmation: "Une seule unité extérieure sert plusieurs unités intérieures, une par pièce.",
      reponses: [
        { texte: "Une seule unité extérieure pour plusieurs unités intérieures.", juste: true },
        { texte: "Plusieurs unités extérieures pour une seule unité intérieure.", pourquoi: "C’est l’inverse : un seul groupe dehors, plusieurs unités dedans." },
        { texte: "Un compresseur dans chaque pièce.", pourquoi: "Le compresseur est dans le groupe, dehors. Il n’y en a qu’un, et il sert toutes les pièces." },
        { texte: "Un seul tube pour toutes les pièces.", pourquoi: "Chaque pièce a ses deux tubes jusqu’au groupe : c’est ce qui fait qu’il y a plus de tubes qu’avec un split." } ] },

    { question: "Le séjour demande du chaud et la chambre du froid, au même moment. Que fait le multisplit ?",
      confirmation: "Un seul mode est servi pour tout le groupe ; la notice dit lequel.",
      reponses: [
        { texte: "Il chauffe le séjour et refroidit la chambre.", pourquoi: "Le groupe n’a qu’un sens de circulation du fluide à la fois, fixé par une seule vanne 4 voies. Les deux demandes contraires ne peuvent pas être servies ensemble." },
        { texte: "Un seul mode est servi ; la notice dit lequel.", juste: true },
        { texte: "Le froid gagne toujours.", pourquoi: "Aucune règle universelle : la priorité est fixée par le constructeur, dans la notice." },
        { texte: "Il partage sa puissance : une moitié chauffe, l’autre refroidit.", pourquoi: "La puissance ne se partage pas entre deux modes : le fluide va dans un seul sens à la fois." } ] },

    { question: "Une seule pièce est allumée. Que deviennent les tubes des deux autres ?",
      confirmation: "Ils restent raccordés au circuit : seule leur branche est fermée.",
      reponses: [
        { texte: "Ils ne comptent plus dans la longueur totale.", pourquoi: "La longueur totale additionne toutes les liaisons posées, qu’elles servent ou non." },
        { texte: "Ils sont débranchés du groupe.", pourquoi: "Rien ne se débranche : la carte ferme la branche, mais les tubes restent dans le circuit." },
        { texte: "Ils restent raccordés au circuit ; seule la branche est fermée.", juste: true },
        { texte: "Ils se remplissent d’air.", pourquoi: "Un circuit frigorifique reste fermé : on le tire au vide avant la mise en service, justement pour qu’il n’y ait pas d’air." } ] },

    { question: "À la pose, les tubes de A sont branchés sur le raccord B, et ceux de B sur le raccord A. Que se passe-t-il ?",
      confirmation: "La pièce A reçoit le froid que demande la pièce B, et inversement.",
      reponses: [
        { texte: "Rien : le groupe se corrige tout seul.", pourquoi: "Le groupe ne sait pas où vont les tubes : il ouvre le raccord que la pièce demande, quelle que soit la pièce au bout. L’erreur ne se corrige pas seule." },
        { texte: "Les pièces A et B chauffent au lieu de refroidir.", pourquoi: "Le mode n’a rien à voir avec les liaisons : c’est la vanne 4 voies du groupe qui le fixe." },
        { texte: "Le compresseur se bloque aussitôt.", pourquoi: "Le circuit est complet, il fonctionne : c’est le résultat qui est faux, la mauvaise pièce est servie." },
        { texte: "La pièce A reçoit le froid demandé par B, et inversement.", juste: true } ] },

    { question: "Le groupe est préchargé pour une longueur totale de liaisons, et les vôtres sont plus longues. Que faites-vous ?",
      confirmation: "Vous lisez la notice, et vous ajoutez le fluide en plus, en pesant.",
      reponses: [
        { texte: "Vous lisez la notice et vous ajoutez le fluide en plus, en pesant.", juste: true },
        { texte: "Vous retirez du fluide pour compenser.", pourquoi: "Plus de tube demande plus de fluide, pas moins : en retirer aggraverait le manque." },
        { texte: "Rien : un peu moins de fluide ne gêne pas.", pourquoi: "Il manquerait du fluide pour tout le circuit : toutes les pièces en pâtiraient, car elles partagent la même charge." },
        { texte: "Vous ajoutez du fluide jusqu’à ce que ça refroidisse.", pourquoi: "On ne devine pas la charge : on lit la notice, on pèse, et on ajoute ce qu’elle indique." } ] }
  ],

  retenir: [
    "<strong>Un groupe dehors, une unité par pièce</strong> : chacune avec ses deux tubes et son repère.",
    "<strong>Un seul mode pour toutes les pièces</strong> : froid ou chaud, jamais l’un et l’autre.",
    "<strong>Une unité éteinte reste dans le circuit</strong> : ses tubes comptent dans la charge.",
    "<strong>Préchargé pour une longueur totale</strong> : au-delà, on ajoute du fluide, selon la notice.",
    "<strong>On repère avant de monter</strong> : A dehors, A dedans."
  ],

  objectifs: '<p><strong>Objectif.</strong> Reconnaître un multisplit, comprendre comment un seul groupe sert plusieurs pièces, et savoir quelles erreurs de pose éviter.</p><p><strong>Limite.</strong> Le cycle, l’Inverter, la vanne 4 voies, le choix de l’unité intérieure et la pose des liaisons sont des stations à part. Aucune valeur de charge, de longueur, de dénivelé ni de nombre d’unités n’est donnée ici : elles viennent de la notice du constructeur.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs ; la première image est rognée en haut (le titre de la brochure est retiré) — toute image signalée sera remplacée' },
    { quoi: 'Symboles', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' } ],

  correspondances: [
    { ligne: 2, couleur: '#3D7FCA', texte: "2.4 L’Inverter : la vitesse suit le besoin", url: lien('2.4') },
    { ligne: 2, couleur: '#3D7FCA', texte: "2.6 La vanne 4 voies : froid ou chaud", url: lien('2.6') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.3 Choisir l’unité intérieure", url: lien('3.3') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.5 Le DRV : un réseau à débit variable", url: lien('3.5') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.2 Les liaisons frigorifiques", url: lien('4.2') } ]
});
