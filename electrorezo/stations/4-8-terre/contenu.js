/* ÉlectroRézo 4.8 — La terre et la liaison équipotentielle. */

ModeleAppareil.construire({
  id: '4.8', ligne: 4,
  kicker: 'ÉlectroRézo · Ligne 4 Protéger · Station 8',
  titre: "La terre et la liaison équipotentielle",
  narration: NARRATION,

  prerequis: [
    { id: '2.1', quoi: "le conducteur de protection" },
    { id: '1.8', quoi: "le défaut d’isolement" },
  ],

  photos: [
    { src: 'assets/biblio/piquet-de-terre.png', alt: "Schéma d’installation d’un piquet de terre pour une installation électrique.",
      titre: "Le piquet.", sous: "Enfoncé dans le sol, relié au tableau par un conducteur vert et jaune." },
    { src: 'assets/biblio/terre-partagee-batiment.jpeg', alt: "Schéma de l’installation de la terre dans un bâtiment résidentiel.",
      titre: "Dans le bâtiment.", sous: "La terre relie les masses métalliques entre elles, et à la prise de terre." }
  ],
  creditPhoto: 'Photographies : base de connaissances inerWeb, documents de cours. Détail dans « Crédits ».',

  aQuoiCaSert: "Donner au courant de défaut un chemin de retour, pour que le différentiel puisse le voir. <strong>La terre ne protège pas : elle rend la protection possible.</strong>",
  ouOnLeTrouve: "Un piquet ou une boucle à fond de fouille, un conducteur vert et jaune jusqu’au tableau, puis vers chaque masse métallique.",

  scene: () => SchemasProtection.boucleDefaut(),
  tableau: (id) => SchemasProtection.tableauDefauts(id),
  tableauTitre: 'Qui voit quel défaut ?',
  colonnes: SchemasProtection.COLONNES,
  consigneAptitudes: 'Trois défauts très différents. Cochez ceux que cet appareil sait voir, puis validez.',

  technologie: [
    ["La prise de terre", "un piquet, ou une boucle enterrée. Sa qualité se mesure en ohms — plus c’est bas, mieux c’est."],
    ["Le conducteur de protection", "le fil <strong>vert et jaune</strong>, qui relie chaque masse métallique au tableau. Ces deux couleurs sont réservées : jamais autre chose."],
    ["La liaison équipotentielle", "elle relie entre elles toutes les masses d’un local — canalisations, huisseries métalliques — pour qu’elles soient <strong>toutes au même potentiel</strong>."],
    ["Ce qu’elle fait vraiment", "elle offre au courant de défaut un chemin franc. Le différentiel le voit passer, et coupe. Sans elle, le seul chemin possible serait un corps humain."]
  ],

  variantes: [
    "<strong>Piquet</strong> — le plus simple, en rénovation.",
    "<strong>Boucle à fond de fouille</strong> — posée au moment de la construction, la meilleure.",
    "<strong>Liaison équipotentielle principale</strong> — au tableau, sur toutes les canalisations entrantes.",
    "<strong>Liaison équipotentielle supplémentaire</strong> — dans les locaux mouillés, salle d’eau notamment."
  ],

  aptitudes: {
    surcharge: false, courtCircuit: false, defautIsolement: false,
    bonneReponse: "Aucun des trois — et c’est tout le sens de cette station. La terre ne <em>détecte</em> rien. Elle ne coupe rien. Elle offre un chemin de retour au courant de défaut, pour que le différentiel, lui, puisse le voir et couper. Sans elle, ce chemin serait un corps humain.",
    erreurs: {
      surcharge: "La terre ne détecte pas la surcharge : elle ne mesure rien du tout.",
      courtCircuit: "Elle ne détecte pas le court-circuit non plus. Ce n’est pas un appareil de mesure.",
      defautIsolement: "Attention, c’est le piège de cette station. La terre ne <em>détecte</em> pas le défaut d’isolement : c’est le différentiel qui le détecte. La terre lui donne seulement le moyen de le voir."
    }
  },

  cablage: [
    "<strong>Vert et jaune, et rien d’autre.</strong> Ces couleurs sont réservées au conducteur de protection dans le monde entier.",
    "<strong>Le conducteur de protection ne se coupe jamais</strong> : aucun appareil de coupure ne s’intercale dessus.",
    "Section au moins égale à celle des conducteurs actifs, selon les règles de l’installation.",
    "Continuité <strong>à vérifier à l’ohmmètre</strong>, pas à l’œil : une vis desserrée ne se voit pas."
  ],
  piege: "« La terre protège les gens. » Non. La terre ne coupe rien. C’est le différentiel qui coupe. Une installation avec une terre parfaite et sans différentiel laisse une carcasse sous tension indéfiniment.",

  symboles: [
    { src: 'assets/ground1.svg', alt: "Symbole normalisé de la prise de terre.", legende: "La prise de terre" },
    { src: 'assets/masse.svg', alt: "Symbole normalisé de la masse.", legende: "La masse" }
  ],
  lecturePlan: [
    "Deux symboles voisins qu’il ne faut pas confondre : <strong>la terre</strong>, trois traits de longueur décroissante, et <strong>la masse</strong>, qui désigne une carcasse métallique.",
    "Le conducteur de protection est repéré <strong>PE</strong>, et il se dessine jusqu’à chaque masse.",
    "Aucun appareil de coupure ne doit apparaître sur ce conducteur — si vous en voyez un, c’est une erreur de plan."
  ],

  quiz: [
    { question: "La terre protège-t-elle les personnes ?",
      confirmation: "Elle donne un chemin au courant de défaut. C’est le différentiel qui coupe.",
      reponses: [
        { texte: "Oui, si elle est de bonne qualité.", pourquoi: "Une bonne terre aide, mais sans appareil de coupure rien ne s’arrête." },
        { texte: "Oui, elle évacue le courant.", pourquoi: "Elle l’évacue, mais évacuer ne coupe pas : la carcasse resterait sous tension." },
        { texte: "Non, elle ne sert à rien en basse tension.", pourquoi: "Elle est au contraire indispensable : sans elle, le différentiel ne verrait souvent rien." },
        { texte: "Non, pas seule : elle permet au différentiel de couper.", juste: true } ] },

    { question: "Quelle couleur pour le conducteur de protection ?",
      confirmation: "Vert et jaune, réservés à lui seul.",
      reponses: [
        { texte: "Vert et jaune.", juste: true },
        { texte: "Vert seul.", pourquoi: "Le vert seul n’est pas admis : c’est bien la combinaison vert et jaune qui est réservée." },
        { texte: "Bleu clair.", pourquoi: "Le bleu clair est réservé au neutre." },
        { texte: "Noir ou marron.", pourquoi: "Ces couleurs désignent des conducteurs de phase." } ] },

    { question: "Peut-on installer un disjoncteur sur le conducteur de protection ?",
      confirmation: "Couper le PE, c’est supprimer la protection sans que rien ne le signale.",
      reponses: [
        { texte: "Oui, pour pouvoir le déconnecter en essai.", pourquoi: "Les essais se font en déconnectant la borne, pas en installant un organe de coupure permanent." },
        { texte: "Non, jamais.", juste: true },
        { texte: "Oui, s’il est bipolaire.", pourquoi: "Le nombre de pôles ne change rien : le PE ne se coupe pas." },
        { texte: "Oui, en tête d’installation seulement.", pourquoi: "Nulle part, pas même en tête." } ] },

    { question: "À quoi sert la liaison équipotentielle dans une salle d’eau ?",
      confirmation: "Mettre toutes les masses au même potentiel, pour qu’il n’y ait pas de différence entre deux points touchés.",
      reponses: [
        { texte: "À réduire la consommation électrique.", pourquoi: "Aucun rapport avec la consommation." },
        { texte: "À améliorer la mise à la terre du bâtiment.", pourquoi: "Elle y contribue, mais son but est l’égalité des potentiels entre masses accessibles." },
        { texte: "À mettre toutes les masses au même potentiel.", juste: true },
        { texte: "À éviter la corrosion des canalisations.", pourquoi: "C’est un autre sujet, traité par d’autres moyens." } ] }
  ],

  retenir: [
    "<strong>La terre ne coupe rien</strong> : elle offre un chemin.",
    "<strong>C’est le différentiel qui coupe</strong> — les deux vont ensemble.",
    "<strong>Vert et jaune, et jamais coupé.</strong>",
    "La continuité se vérifie <strong>à l’ohmmètre</strong>."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre que la terre rend la protection possible sans protéger elle-même, et que terre et différentiel forment un couple indissociable.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/' } ],

  correspondances: [
    { ligne: 2, couleur: '#0C4B88', texte: "2.1 Phase, neutre, PE" },
    { ligne: 4, couleur: '#c0392b', texte: "4.5 L’interrupteur différentiel" },
    { ligne: 1, couleur: '#1b3a63', texte: "1.9 Mesurer" } ]
});
