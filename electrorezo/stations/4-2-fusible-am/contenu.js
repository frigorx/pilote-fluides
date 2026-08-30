/* ÉlectroRézo 4.2 — Le fusible aM. */

ModeleAppareil.construire({
  id: '4.2', ligne: 4,
  kicker: 'ÉlectroRézo · Ligne 4 Protéger · Station 2',
  titre: "Le fusible aM",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/formats-de-cartouches.png', alt: "Les cinq formats de cartouche d’un catalogue constructeur : trois cylindriques de tailles croissantes, une à percuteur, et deux à couteaux.",
      titre: "Cinq formats, une même lettre.", sous: "Du petit cylindre au bloc à couteaux — la taille dit le calibre, pas la lettre." },
    { src: 'assets/biblio/cartouches-marquees-am.jpeg',
      alt: "Cinq cartouches posées côte à côte ; sur deux d’entre elles, la lettre aM est imprimée à côté du calibre.",
      titre: "La même apparence.", sous: "Rien ne distingue un aM d’un gG au premier coup d’œil, sauf ces deux lettres." },
    { src: 'assets/biblio/courbes-de-fusion.jpg',
      alt: "Les courbes de fusion des cartouches gG à gauche et aM à droite : à courant égal, la cartouche aM met bien plus longtemps à fondre.",
      titre: "Les deux, côte à côte.", sous: "Dans la zone du démarrage, le gG a déjà fondu. L’aM est encore intact." }
  ],
  creditPhoto: 'Photographies : base de connaissances inerWeb, documents de cours. Détail dans « Crédits ».',

  aQuoiCaSert: "Protéger un départ moteur contre le court-circuit, <strong>sans fondre au démarrage</strong>. La lettre <strong>aM</strong> veut dire : accompagnement moteur.",
  ouOnLeTrouve: "En tête d’un départ moteur, toujours accompagné d’un relais thermique — jamais seul.",

  scene: () => SchemasProtection.courbesFusion(),
  tableau: (id) => SchemasProtection.tableauDefauts(id),
  tableauTitre: 'Qui voit quel défaut ?',
  colonnes: SchemasProtection.COLONNES,
  consigneAptitudes: 'Trois défauts très différents. Cochez ceux que cet appareil sait voir, puis validez.',

  technologie: [
    ["La pointe de démarrage", "un moteur qui démarre appelle plusieurs fois son courant nominal, pendant quelques secondes. Ce n’est pas un défaut : c’est normal."],
    ["Le fil calibré, mais autrement", "l’aM est conçu pour <strong>ignorer</strong> cette pointe, et pour fondre très vite au-delà."],
    ["La conséquence", "il ne protège <strong>pas</strong> contre la surcharge lente. Un moteur qui force pendant une heure ne le fera pas fondre."],
    ["Donc il ne travaille jamais seul", "le relais thermique s’occupe de la surcharge, l’aM du court-circuit. Deux appareils, deux métiers."]
  ],

  variantes: [
    "<strong>Mêmes tailles que le gG</strong> — et c’est bien le problème : ils rentrent dans les mêmes logements.",
    "<strong>La lettre est écrite sur le corps</strong> : c’est le seul moyen de les distinguer.",
    "<strong>Avec percuteur</strong>, pour signaler la fusion et couper la commande.",
    "Le calibre d’un aM se choisit sur le <strong>courant du moteur</strong>, pas sur la section du câble."
  ],

  aptitudes: {
    surcharge: false, courtCircuit: true, defautIsolement: false,
    bonneReponse: "Le court-circuit, et lui seul. L’aM laisse volontairement passer la pointe de démarrage — donc il ne voit pas non plus la surcharge lente. C’est pour cela qu’il ne travaille jamais sans relais thermique.",
    erreurs: {
      surcharge: "⚠️ Il ne voit PAS la surcharge. C’est même sa raison d’être : ignorer les surintensités passagères du démarrage. Un moteur qui force pendant une heure ne le fera pas fondre.",
      courtCircuit: "Il voit le court-circuit, et très vite : c’est son unique métier.",
      defautIsolement: "Comme tout fusible, il ne voit rien d’un courant qui part à la terre."
    }
  },

  cablage: [
    "Sur les <strong>trois phases</strong> d’un départ moteur.",
    "<strong>Toujours avec un relais thermique</strong> en aval — jamais seul.",
    "Calibre choisi sur le <strong>courant nominal du moteur</strong>, lu sur sa plaque.",
    "Remplacement à l’identique, et <strong>les trois cartouches ensemble</strong> : une seule fondue déséquilibre le moteur."
  ],
  piege: "Poser un gG à la place d’un aM sur un départ moteur : il fondra au premier démarrage. Poser un aM à la place d’un gG sur un circuit de prises : la surcharge lente ne sera plus protégée du tout.",

  symboles: [
    { src: 'assets/pojistka3p.svg', alt: "Symbole normalisé de trois fusibles sur trois pôles.", legende: "Trois fusibles" },
    { src: 'assets/poj_odpinac_3p.svg', alt: "Symbole normalisé d’un sectionneur porte-fusible tripolaire.", legende: "En sectionneur porte-fusible" }
  ],
  lecturePlan: [
    "<strong>Le symbole est le même que celui du gG.</strong> Rien ne les distingue sur le dessin.",
    "C’est <strong>le texte à côté</strong> qui tranche : « 16 A aM ». Sans lui, on ne peut pas commander la bonne cartouche.",
    "Encore la règle générale : le dessin donne la fonction, <strong>le texte donne la valeur</strong>."
  ],

  quiz: [
    { question: "Pourquoi un fusible aM ne fond-il pas au démarrage d’un moteur ?",
      confirmation: "Il est fait pour ignorer les surintensités passagères.",
      reponses: [
        { texte: "Parce que le démarrage est trop court pour chauffer le fil.", pourquoi: "Le temps compte, mais c’est surtout la courbe de l’aM qui est conçue pour cela." },
        { texte: "Parce qu’il est conçu pour laisser passer la pointe de démarrage.", juste: true },
        { texte: "Parce que le relais thermique le protège.", pourquoi: "Le relais thermique protège le moteur, pas le fusible." },
        { texte: "Parce qu’il a un calibre très supérieur.", pourquoi: "Le calibre est choisi sur le moteur, il n’est pas surdimensionné n’importe comment." } ] },

    { question: "Un aM peut-il protéger seul un départ moteur ?",
      confirmation: "Il ne voit pas la surcharge : il lui faut un relais thermique.",
      reponses: [
        { texte: "Oui, avec un bon calibre.", pourquoi: "Aucun calibre ne lui donne la capacité de voir une surcharge lente." },
        { texte: "Oui, si le moteur est petit.", pourquoi: "La taille du moteur ne change rien à ce que l’aM sait voir." },
        { texte: "Non : il faut un relais thermique avec lui.", juste: true },
        { texte: "Oui, c’est son métier.", pourquoi: "Son métier est le court-circuit seulement." } ] },

    { question: "Comment distingue-t-on un aM d’un gG dans un tiroir ?",
      confirmation: "À ce qui est écrit sur le corps de la cartouche.",
      reponses: [
        { texte: "À la longueur de la cartouche.", pourquoi: "Les deux existent dans les mêmes tailles : c’est justement le piège." },
        { texte: "À la couleur du corps.", pourquoi: "Les couleurs varient d’un fabricant à l’autre et ne codent pas la lettre." },
        { texte: "Au poids.", pourquoi: "Rien ne se pèse dans un tiroir à fusibles." },
        { texte: "À la lettre écrite dessus.", juste: true } ] },

    { question: "On pose un gG à la place d’un aM sur un départ moteur. Que se passe-t-il ?",
      confirmation: "Le gG voit la pointe de démarrage comme une surcharge.",
      reponses: [
        { texte: "Il fond au premier démarrage.", juste: true },
        { texte: "La protection est meilleure.", pourquoi: "Elle est surtout inutilisable : la machine ne démarrera pas." },
        { texte: "Le moteur démarre plus lentement.", pourquoi: "Le fusible ne modifie pas le démarrage — il le subit." },
        { texte: "Rien, les deux sont équivalents.", pourquoi: "Ils ne le sont pas : leurs courbes sont très différentes." } ] }
  ],

  retenir: [
    "<strong>aM = accompagnement moteur.</strong> Il ne voit que le court-circuit.",
    "<strong>Il ignore la pointe de démarrage</strong> — c’est voulu.",
    "<strong>Donc il ne voit pas la surcharge</strong> : relais thermique obligatoire.",
    "Même symbole, même taille que le gG : <strong>seul le texte les distingue</strong>."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre pourquoi l’aM laisse passer la pointe de démarrage, ce qu’il ne protège pas, et pourquoi il ne travaille jamais seul.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/200_fuses_protective_gears/' } ],

  correspondances: [
    { ligne: 4, couleur: '#c0392b', texte: "4.1 Le fusible gG" },
    { ligne: 4, couleur: '#c0392b', texte: "4.7 Le relais thermique" },
    { ligne: 6, couleur: '#c9451a', texte: "6.3 Moteur asynchrone triphasé" } ]
});
