/* ÉlectroRézo 4.3 — Le disjoncteur magnéto-thermique. */

ModeleAppareil.construire({
  id: '4.3', ligne: 4,
  kicker: 'ÉlectroRézo · Ligne 4 Protéger · Station 3',
  titre: "Le disjoncteur magnéto-thermique",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/disjoncteur-legrand-c16.png', alt: "Photo d’un disjoncteur modulaire blanc de calibre C16, avec sa manette noire.",
      titre: "Un disjoncteur modulaire.", sous: "La lettre et le nombre écrits dessus disent tout : C16." },
    { src: 'assets/biblio/disjoncteur-multipolaire.jpeg', alt: "Photo d’un disjoncteur multipolaire avec ses bornes en cuivre.",
      titre: "En plusieurs pôles.", sous: "Un boîtier, une manette, et autant de pôles que de fils à couper." }
  ],
  creditPhoto: 'Photographies : base de connaissances inerWeb, documents de cours. Détail dans « Crédits ».',

  aQuoiCaSert: "Protéger un circuit contre la surcharge <em>et</em> le court-circuit, avec un appareil qui se <strong>réarme</strong> au lieu d’être remplacé.",
  ouOnLeTrouve: "Dans tous les tableaux, en tête de chaque circuit. Il a remplacé le fusible dans presque toute l’installation moderne.",

  scene: () => SchemasProtection.deuxDeclencheurs(),
  tableau: (id) => SchemasProtection.tableauDefauts(id),
  tableauTitre: 'Qui voit quel défaut ?',
  colonnes: SchemasProtection.COLONNES,
  consigneAptitudes: 'Trois défauts très différents. Cochez ceux que cet appareil sait voir, puis validez.',

  technologie: [
    ["Le bilame", "deux métaux collés qui se courbent en chauffant. Il surveille la <strong>surcharge</strong> : lentement, sur des secondes ou des minutes."],
    ["La bobine", "quelques spires de gros fil. En court-circuit, elle devient un aimant et frappe le mécanisme. <strong>Instantanément.</strong>"],
    ["La chambre de coupure", "des cloisons métalliques qui découpent l’arc et le refroidissent. C’est elle qui donne le pouvoir de coupure."],
    ["Le mécanisme à accrochage", "il ouvre d’un coup, quelle que soit la vitesse de la main. Et il se réarme."]
  ],

  variantes: [
    "<strong>Courbe B</strong> — déclenchement magnétique de 3 à 5 fois le calibre. Circuits résistifs, longues lignes.",
    "<strong>Courbe C</strong> — de 5 à 10 fois. Le cas général, prises et éclairage.",
    "<strong>Courbe D</strong> — de 10 à 20 fois. Ce qui appelle une forte pointe : transformateurs, moteurs.",
    "Le nombre est le <strong>calibre</strong> en ampères, la lettre est la <strong>courbe</strong> : C16, c’est courbe C, seize ampères."
  ],

  aptitudes: {
    surcharge: true, courtCircuit: true, defautIsolement: false,
    bonneReponse: "Les deux surintensités, grâce à ses deux déclencheurs : le bilame pour la surcharge, la bobine pour le court-circuit. Mais il ne voit rien d’un courant qui part à la terre.",
    erreurs: {
      surcharge: "Il voit la surcharge : c’est le rôle du bilame, la partie « thermique » de son nom.",
      courtCircuit: "Il voit le court-circuit : c’est le rôle de la bobine, la partie « magnéto ».",
      defautIsolement: "Il ne voit pas le défaut d’isolement. Un disjoncteur ordinaire n’est pas un différentiel — sauf s’il porte aussi un tore, station 4.6."
    }
  },

  cablage: [
    "<strong>Amont en haut, aval en bas</strong> — le sens est marqué sur beaucoup de modèles.",
    "Autant de pôles que de conducteurs actifs à couper.",
    "<strong>Serrage au couple</strong> : une borne molle chauffe et fait vieillir l’appareil.",
    "Section du câble en aval <strong>cohérente avec le calibre</strong> — voir station 4.9."
  ],
  piege: "« Ça disjoncte souvent, je mets un calibre au-dessus. » Le calibre protège le <strong>câble</strong>, pas l’appareil branché. Augmenter le calibre sans changer la section, c’est laisser le câble chauffer sans protection.",

  symboles: [
    { src: 'assets/dis_mag_term_3f-1.svg', alt: "Symbole normalisé d’un disjoncteur magnéto-thermique à trois pôles.", legende: "Trois pôles" },
    { src: 'assets/dis_mag_term_2f-1.svg', alt: "Symbole normalisé d’un disjoncteur magnéto-thermique à deux pôles.", legende: "Deux pôles" }
  ],
  lecturePlan: [
    "Le symbole porte <strong>les deux signes</strong> : le crochet du thermique et le demi-cercle du magnétique. Voir stations 8.5 et 8.6.",
    "<strong>Leur présence est la fiche technique de l’appareil</strong> : ce qu’il voit, et ce qu’il ne voit pas.",
    "Repère <strong>Q</strong> ou <strong>F</strong> selon les écoles ; calibre et courbe écrits à côté."
  ],

  quiz: [
    { question: "Que veut dire « C16 » sur un disjoncteur ?",
      confirmation: "La lettre est la courbe, le nombre le calibre.",
      reponses: [
        { texte: "Courant de court-circuit de seize kiloampères.", pourquoi: "Le pouvoir de coupure s’écrit à part, en kA, dans un rectangle." },
        { texte: "Classe 16 de protection.", pourquoi: "Il n’existe pas de « classe » notée ainsi sur un disjoncteur." },
        { texte: "Courbe C, calibre seize ampères.", juste: true },
        { texte: "Seize circuits protégés.", pourquoi: "Un disjoncteur protège un circuit, pas seize." } ] },

    { question: "Quel déclencheur agit sur une surcharge lente ?",
      confirmation: "Le bilame chauffe et se courbe : c’est le thermique.",
      reponses: [
        { texte: "La bobine.", pourquoi: "La bobine est instantanée : elle ne réagit qu’aux courants énormes." },
        { texte: "Le mécanisme à accrochage.", pourquoi: "Il exécute l’ouverture, il ne détecte rien non plus." },
        { texte: "La chambre de coupure.", pourquoi: "La chambre éteint l’arc, elle ne détecte rien." },
        { texte: "Le bilame.", juste: true } ] },

    { question: "Un disjoncteur C16 protège-t-il contre un défaut d’isolement ?",
      confirmation: "Il ne mesure pas la différence entre l’aller et le retour.",
      reponses: [
        { texte: "Non : il faut un différentiel.", juste: true },
        { texte: "Oui, c’est inclus dans la courbe C.", pourquoi: "La courbe ne décrit que la sensibilité au court-circuit." },
        { texte: "Oui, si l’installation est bien reliée à la terre.", pourquoi: "Une bonne terre fait monter le courant de défaut, mais souvent pas assez pour un disjoncteur." },
        { texte: "Oui, en coupant plus vite.", pourquoi: "Il ne coupe que si le courant qui le traverse est excessif." } ] },

    { question: "Un disjoncteur déclenche souvent. Le bon geste ?",
      confirmation: "Le calibre protège le câble : on ne l’augmente pas sans revoir la section.",
      reponses: [
        { texte: "Passer au calibre supérieur.", pourquoi: "C’est laisser le câble chauffer sans protection : le calibre protège le conducteur, pas l’appareil branché." },
        { texte: "Chercher ce qui consomme trop, ou ce qui est en défaut.", juste: true },
        { texte: "Le remplacer par un fusible de même calibre.", pourquoi: "Même calibre, même problème : la cause n’a pas été traitée." },
        { texte: "Passer en courbe D.", pourquoi: "Changer de courbe ne règle pas une surcharge : cela ne touche qu’au magnétique." } ] }
  ],

  retenir: [
    "<strong>Deux déclencheurs</strong> : bilame lent, bobine instantanée.",
    "<strong>Il se réarme</strong> au lieu d’être remplacé.",
    "<strong>C16</strong> : courbe C, calibre 16 A.",
    "<strong>Il ne voit pas le défaut d’isolement.</strong>"
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre les deux déclencheurs d’un magnéto-thermique, lire un calibre et une courbe, et savoir ce que le calibre protège vraiment.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/200_fuses_protective_gears/' } ],

  correspondances: [
    { ligne: 8, couleur: '#7c3aed', texte: "8.5 Le déclencheur thermique" },
    { ligne: 8, couleur: '#7c3aed', texte: "8.6 Le déclencheur magnétique" },
    { ligne: 4, couleur: '#c0392b', texte: "4.9 Le câble et sa section" } ]
});
