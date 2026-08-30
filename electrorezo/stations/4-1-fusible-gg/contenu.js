/* ÉlectroRézo 4.1 — Le fusible gG. */

ModeleAppareil.construire({
  id: '4.1', ligne: 4,
  kicker: 'ÉlectroRézo · Ligne 4 Protéger · Station 1',
  titre: "Le fusible gG",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/fusibles-et-outil.jpeg',
      alt: "Cinq cartouches fusibles de formats différents posées côte à côte : une petite à culot, deux cylindriques, une grande cylindrique de 22 sur 58 et une à couteaux de 125 ampères. Le calibre et la lettre sont imprimés sur le corps de chacune.",
      titre: "Tout est écrit sur le corps.", sous: "Le calibre en ampères, la tension, et la lettre. C’est là qu’on lit, jamais sur le dessin." },
    { src: 'assets/biblio/courbes-de-fusion.jpg',
      alt: "Les courbes de fusion normalisées : à gauche les cartouches de type gG, à droite celles de type aM, en temps de fusion selon l’intensité.",
      titre: "Sa carte d’identité.", sous: "À gauche, le gG. Chaque courbe est un calibre : elle dit en combien de temps il fond." },
    { src: 'assets/biblio/fusibles-anciens.png',
      alt: "Photo d’anciens fusibles dits « à broches », en porcelaine, tels qu’on en trouve encore sur de vieilles installations.",
      titre: "Les anciens.", sous: "Vous en rencontrerez encore. Même principe, un autre siècle." }
  ],
  creditPhoto: 'Photographies : base de connaissances inerWeb, documents de cours. Détail dans « Crédits ».',

  aQuoiCaSert: "Protéger un circuit et ses conducteurs contre les surintensités, quelles qu’elles soient : la surcharge lente comme le court-circuit brutal. La lettre <strong>gG</strong> veut dire : protection générale, sur toute la plage.",
  ouOnLeTrouve: "En tête d’un départ éclairage, prises, chauffage — partout où il n’y a pas de moteur.",

  scene: () => SchemasProtection.courbesFusion(),
  tableau: (id) => SchemasProtection.tableauDefauts(id),
  tableauTitre: 'Qui voit quel défaut ?',
  colonnes: SchemasProtection.COLONNES,
  consigneAptitudes: 'Trois défauts très différents. Cochez ceux que cet appareil sait voir, puis validez.',

  technologie: [
    ["Le fil calibré", "il fond quand le courant dépasse son calibre assez longtemps. C’est un objet à usage unique."],
    ["Le sable", "il éteint l’arc au moment de la fusion. C’est lui qui permet à un si petit objet de couper des courants énormes."],
    ["La plage de protection", "le gG protège <strong>sur toute la plage</strong> : de la petite surcharge jusqu’au court-circuit franc."],
    ["Le pouvoir de coupure", "le courant de court-circuit maximal qu’il sait interrompre sans exploser. Écrit sur la cartouche."]
  ],

  variantes: [
    "<strong>Tailles cylindriques</strong> — 8×32, 10×38, 14×51, 22×58 mm. La taille fait partie du calibre.",
    "<strong>À couteaux</strong> — pour les forts courants, en tête d’installation.",
    "<strong>Avec percuteur</strong> — un téton sort quand la cartouche a fondu, et peut actionner un contact.",
    "<strong>Ne jamais confondre avec l’aM</strong> : même apparence, comportement très différent — station 4.2."
  ],

  aptitudes: {
    surcharge: true, courtCircuit: true, defautIsolement: false,
    bonneReponse: "Le gG voit la surcharge et le court-circuit : c’est la protection générale. En revanche il ne voit rien d’un défaut d’isolement — un courant qui part à la terre peut être bien trop faible pour le faire fondre.",
    erreurs: {
      surcharge: "Il voit la surcharge : c’est ce que « g » veut dire, protection sur toute la plage.",
      courtCircuit: "Il voit le court-circuit, et c’est même là qu’il est le plus rapide.",
      defautIsolement: "Il ne voit pas le défaut d’isolement. Un courant de fuite de quelques dizaines de milliampères est mortel pour un corps humain, et parfaitement invisible pour un fusible."
    }
  },

  cablage: [
    "Sur <strong>la phase</strong>, en tête du circuit protégé.",
    "<strong>Jamais sur le conducteur de protection</strong>, jamais sur le neutre en régime TT domestique.",
    "Remplacement <strong>à l’identique</strong> : même taille, même calibre, même lettre.",
    "Contacts propres et bien serrés : un mauvais contact fait fondre une cartouche saine."
  ],
  piege: "Le calibre supérieur « pour que ça ne recommence pas » : c’est supprimer la protection au lieu de traiter la cause. Et jamais de fil de fer à la place d’une cartouche.",

  symboles: [
    { src: 'assets/pojistka1p.svg', alt: "Symbole normalisé d’un fusible sur un pôle.", legende: "Un fusible" },
    { src: 'assets/pojistka3p.svg', alt: "Symbole normalisé de trois fusibles sur trois pôles.", legende: "Trois fusibles" }
  ],
  lecturePlan: [
    "Le rectangle traversé d’un trait, c’est la lettre du fusible — voir la <strong>station 8.4</strong>.",
    "À côté du symbole, le plan écrit <strong>le calibre et la lettre</strong> : 16 A gG.",
    "Le repère commence par <strong>F</strong> : F1, F2. C’est la lettre des protections."
  ],

  quiz: [
    { question: "Que veut dire la lettre g dans gG ?",
      confirmation: "Protection sur toute la plage, de la surcharge au court-circuit.",
      reponses: [
        { texte: "Qu’il protège sur toute la plage de surintensité.", juste: true },
        { texte: "Qu’il est de grande taille.", pourquoi: "La taille se lit aux dimensions en millimètres, pas à la lettre." },
        { texte: "Qu’il est garanti par le fabricant.", pourquoi: "Aucune lettre de calibre ne parle de garantie commerciale." },
        { texte: "Qu’il est réservé au triphasé.", pourquoi: "gG et aM existent en monophasé comme en triphasé." } ] },

    { question: "Un fusible gG protège-t-il une personne contre l’électrisation ?",
      confirmation: "Un courant de fuite mortel est bien trop faible pour le faire fondre.",
      reponses: [
        { texte: "Oui, s’il est bien calibré.", pourquoi: "Aucun calibre de fusible ne descend au niveau des courants dangereux pour le corps." },
        { texte: "Non : il faut un différentiel.", juste: true },
        { texte: "Oui, si la terre est bonne.", pourquoi: "Une bonne terre aide, mais c’est le différentiel qui coupe." },
        { texte: "Oui, en régime TT.", pourquoi: "Le régime de neutre change la protection des personnes, mais pas la sensibilité du fusible." } ] },

    { question: "Une cartouche a fondu. Le bon geste ?",
      confirmation: "On cherche la cause, puis on remplace à l’identique.",
      reponses: [
        { texte: "Ponter provisoirement pour finir la journée.", pourquoi: "Un pont supprime toute protection : le câble devient le fusible." },
        { texte: "Réarmer après refroidissement.", pourquoi: "Un fusible ne se réarme pas : le fil a fondu, il est détruit." },
        { texte: "Chercher pourquoi, puis remplacer à l’identique.", juste: true },
        { texte: "Remplacer par un calibre supérieur.", pourquoi: "C’est l’erreur la plus grave : on supprime la protection au lieu de traiter la cause." } ] },

    { question: "Où se place un fusible gG ?",
      confirmation: "Sur la phase, en tête du circuit qu’il protège.",
      reponses: [
        { texte: "Indifféremment, cela revient au même.", pourquoi: "Cela ne revient pas au même du tout : le circuit resterait sous tension." },
        { texte: "Sur le conducteur de protection.", pourquoi: "Jamais : couper le PE supprimerait la protection des personnes." },
        { texte: "Sur le neutre uniquement.", pourquoi: "En régime TT domestique, on ne protège pas le neutre par fusible." },
        { texte: "Sur la phase, en tête du circuit.", juste: true } ] }
  ],

  retenir: [
    "<strong>gG = protection générale</strong> : surcharge et court-circuit.",
    "<strong>Il ne voit pas le défaut d’isolement</strong> — c’est le métier du différentiel.",
    "Il ne se répare pas : on remplace <strong>à l’identique</strong>.",
    "Calibre supérieur = protection supprimée."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre ce que protège un fusible gG et ce qu’il ne protège pas, et savoir remplacer une cartouche correctement.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/200_fuses_protective_gears/' } ],

  correspondances: [
    { ligne: 3, couleur: '#5b4bd6', texte: "3.4 Le porte-fusible" },
    { ligne: 4, couleur: '#c0392b', texte: "4.2 Le fusible aM" },
    { ligne: 8, couleur: '#7c3aed', texte: "8.4 Le rectangle" } ]
});
