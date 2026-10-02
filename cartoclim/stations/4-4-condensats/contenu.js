/* CartoClim 4.4 — Les condensats : pente, siphon, pompe de relevage. Station-tâche, écrite le 02/10/2026. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '4.4', ligne: 4,
  kicker: 'CartoClim · Ligne 4 Installer · Station 4',
  titre: "Les condensats : pente, siphon, pompe de relevage",
  titres: { decouvrir: 'Le chantier', comprendre: 'Ce qu’il faut savoir', manipuler: 'Le geste', representer: 'Sur le plan' },
  narration: NARRATION,

  prerequis: [
    { id: '1.4', quoi: "le point de rosée : pourquoi l’air lâche de l’eau" },
    { id: '3.2', quoi: "le split : deux unités, deux tubes, un tuyau d’eau" }
  ],

  photos: [
    { src: 'assets/biblio/cfaf6a5176.jpeg',
      alt: "Deux mains ouvrent la façade d’une unité intérieure murale : on voit les filtres, et derrière eux la batterie.",
      titre: "Derrière les filtres, la batterie froide.", sous: "C’est là que l’eau se forme." },
    { src: 'assets/biblio/e2e7fed2c7.jpeg',
      alt: "Une grosse unité extérieure grise posée sur des plots devant la façade d’un bâtiment ; un tuyau noir part du bas de l’unité.",
      titre: "Dehors, l’unité extérieure.", sous: "L’hiver, quand l’appareil chauffe, c’est elle qui fait de l’eau." }
  ],

  titreSert: 'La situation',
  aQuoiCaSert: "Un climatiseur qui refroidit <strong>fabrique de l’eau</strong> : l’air de la pièce, refroidi par la batterie, y dépose son humidité. Cette eau tombe dans un bac, et c’est <strong>à vous de la faire sortir</strong>. Tuyau bien posé, personne n’y pense. Tuyau mal posé, le mur du client se tache, ou le faux plafond coule.",
  ouOnLeTrouve: "Sur <strong>toutes les machines qui refroidissent</strong> : murale, cassette, gainable. Elles produisent toutes de l’eau, donc on <strong>prévoit toujours son évacuation</strong> avant de poser.",

  scene: () => ScenesStation.cheminDeLeau(),

  titreDedans: 'Le chemin de l’eau',
  technologie: [
    ["La batterie froide", "les ailettes de l’évaporateur sont plus froides que le <strong>point de rosée</strong> de l’air de la pièce — la température sous laquelle l’air ne peut plus garder son humidité. Le surplus se dépose en gouttes."],
    ["Le bac", "il recueille les gouttes sous la batterie. Sa sortie est le point de départ de votre tuyau."],
    ["Le tuyau", "il emmène l’eau jusqu’à dehors ou jusqu’à une évacuation. Il doit <strong>descendre sur toute sa longueur</strong> : ni point bas, ni contre-pente. D’après la fiche de montage du split, la pente est de <strong>3 cm par mètre au moins</strong>."],
    ["Le siphon", "un coude en U qui garde toujours un peu d’eau. Ce <strong>bouchon d’eau</strong> laisse passer l’eau du bac et arrête les odeurs qui voudraient remonter de l’évacuation. Il sert quand le tuyau finit sur un réseau d’eaux usées."],
    ["La pompe de relevage", "quand la pente est impossible, une petite pompe reprend l’eau du bac et la pousse vers le haut dans un fin tuyau. Un <strong>flotteur</strong> la fait démarrer. Un <strong>contact de sécurité</strong> coupe le froid, ou déclenche une alarme, si l’eau monte trop."]
  ],

  titreVariantes: 'Les cas particuliers',
  variantes: [
    "<strong>Évacuation vers dehors</strong> — le cas le plus simple : la pente suffit, sans pompe. C’est la solution à préférer.",
    "<strong>Évacuation vers un réseau d’eaux usées</strong> — le tuyau se raccorde sur une évacuation : on ajoute un <strong>siphon</strong>, sinon les odeurs remontent.",
    "<strong>Pente impossible</strong> — cassette, gainable, ou unité murale dont la sortie est plus haute que le bac : une <strong>pompe de relevage</strong>, posée dans la goulotte ou sur le trajet du tuyau. Les formes d’unités intérieures : station 3.3.",
    "<strong>Tuyau dans un local chaud et humide</strong> — faux plafond, gaine : l’eau du tuyau est froide, et le tuyau non isolé se couvre de gouttes. On l’isole.",
    "<strong>Mode chaud</strong> — le bac intérieur reste sec, mais l’<strong>unité extérieure</strong> fait de l’eau, surtout quand elle dégivre (station 2.7). On prévoit où elle s’écoule, surtout l’hiver."
  ],

  consigneAptitudes: 'Un climatiseur réversible et son tuyau d’eau : cochez ce qui est vrai, puis validez.',
  titreAptitudes: 'Bien évacué ?',
  colonnes: [
    { id: 'gravite', libelle: 'Évacuer par gravité', aide: 'laisser l’eau descendre toute seule, par la pente du tuyau',
      dessin: '<path d="M10 24 L74 56 M10 42 L74 74"/><path d="M84 66 C80 74 78 78 78 82 A6 6 0 0 0 90 82 C90 78 88 74 84 66 Z"/>' },
    { id: 'monter', libelle: 'Monter sans pompe', aide: 'faire remonter l’eau d’un tuyau, par exemple jusqu’au-dessus d’un faux plafond',
      dessin: '<path d="M40 90 V34 M60 90 V34"/><path d="M28 36 L50 10 L72 36"/>' },
    { id: 'chaud', libelle: 'Eau en mode chaud', aide: 'l’hiver, de l’eau se forme aussi, mais dehors',
      dessin: '<rect x="12" y="12" width="76" height="52" rx="8"/><circle cx="50" cy="38" r="15"/><path d="M50 23 V53 M35 38 H65"/><path d="M50 72 C45 80 43 84 43 88 A7 7 0 0 0 57 88 C57 84 55 80 50 72 Z"/>' }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    gravite: true, monter: false, chaud: true,
    bonneReponse: 'Exact. L’eau descend toute seule si le tuyau descend partout : c’est la solution à préférer. Elle ne remonte jamais sans pompe. Et quand l’appareil chauffe, de l’eau se forme aussi, mais sur l’unité extérieure : il faut prévoir où elle va.',
    erreurs: {
      gravite: 'C’est la première solution : un tuyau qui descend sur toute sa longueur, et l’eau part seule. Pas de pompe, pas de courant, pas de panne.',
      monter: 'L’eau ne remonte jamais seule. Si la sortie est plus haute que le bac, il faut une pompe de relevage, avec sa sécurité.',
      chaud: 'En mode chaud, la batterie extérieure est froide : elle peut givrer, et le givre fond au dégivrage. De l’eau coule donc dehors, sous l’unité extérieure.'
    }
  },

  titreCablage: 'Dans l’ordre',
  cablage: [
    "<strong>Repérez la sortie</strong> avant de poser : dehors, ou une évacuation d’eaux usées. Le trou dans le mur se perce déjà en pente vers l’extérieur : station 4.1.",
    "<strong>Raccordez le bac</strong> et posez le tuyau <strong>en pente continue</strong> jusqu’à la sortie : 3 cm par mètre au moins d’après la fiche de montage du split, sans point bas ni contre-pente.",
    "<strong>Sur une évacuation d’eaux usées</strong> : un <strong>siphon</strong> avant le raccordement, pour arrêter les odeurs.",
    "<strong>Si la pente est impossible</strong> : une <strong>pompe de relevage</strong>, dans la goulotte ou sur le trajet du tuyau. Son <strong>contact de sécurité</strong> se raccorde sur la commande, d’après la notice de la pompe ; son alimentation : station 4.5.",
    "<strong>Isolez le tuyau</strong> là où il traverse un local chaud et humide, un faux plafond par exemple.",
    "<strong>Essayez</strong> : versez de l’eau dans le bac et regardez-la sortir. Avec une pompe, vérifiez que le flotteur la fait démarrer."
  ],
  piege: "<strong>La pose « à peu près droite ».</strong> Un seul point bas suffit : l’eau s’y arrête, remplit le tuyau, remonte dans le bac, et le bac déborde sur le mur du client. On vérifie la descente sur <strong>toute la longueur</strong>, pas seulement au départ. Même piège avec une pompe sans sécurité : le jour où elle s’arrête, rien ne coupe le froid.",

  symboles: [
    { src: 'assets/bomba-condensados.svg', alt: "Symbole de la pompe de relevage des condensats : un boîtier à gauche, relié par un tuyau coudé à un second boîtier posé sur un réservoir allongé, à droite.", legende: "Pompe de relevage des condensats" },
    { src: 'assets/split-pared.svg', alt: "Symbole d’une unité intérieure murale de climatiseur : un boîtier allongé avec sa grille de soufflage.", legende: "Unité intérieure murale" }
  ],
  titreLecturePlan: 'Le lire sur un plan',
  lecturePlan: [
    "Sur un plan de climatisation, l’<strong>unité intérieure</strong> est dessinée dans la pièce, et le <strong>tuyau de condensats</strong> est tracé depuis elle jusqu’à sa sortie.",
    "Regardez <strong>où il se termine</strong> : dehors, ou sur une évacuation d’eaux usées. Dans ce cas, le <strong>siphon</strong> est-il prévu ?",
    "Si la <strong>pompe de relevage</strong> est dessinée, cherchez aussi son <strong>alimentation</strong> et la liaison de son <strong>contact de sécurité</strong> : sans elles, la pompe n’est pas protégée.",
    "Un plan qui ne dit pas où va l’eau laisse la question au chantier. Si vous ne trouvez pas la réponse, demandez avant de poser."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Chaque situation, sa réponse',

  quiz: [
    { question: "Pourquoi de l’eau se forme-t-elle sur la batterie de l’unité intérieure ?",
      confirmation: "L’air de la pièce, refroidi à son contact, ne peut plus garder toute son humidité : elle se dépose en gouttes.",
      reponses: [
        { texte: "Le circuit perd du fluide.", pourquoi: "Le fluide frigorigène n’est pas de l’eau. Une fuite se voit au manque de froid, pas à l’eau du bac." },
        { texte: "Le filtre est sale.", pourquoi: "Un filtre sale gêne le passage de l’air, mais ce n’est pas lui qui fait l’eau : même propre, la batterie froide en produit." },
        { texte: "La pluie entre par l’unité extérieure.", pourquoi: "L’eau du bac se forme dedans, sur la batterie intérieure. Elle n’a aucun lien avec la pluie." },
        { texte: "L’air de la pièce, refroidi, ne peut plus garder son humidité.", juste: true } ] },

    { question: "Quelle pose permet à l’eau de sortir toute seule ?",
      confirmation: "Un tuyau qui descend sur toute sa longueur, sans aucun point bas.",
      reponses: [
        { texte: "Un tuyau qui descend partout, sans point bas.", juste: true },
        { texte: "Un tuyau bien horizontal, bien droit.", pourquoi: "Sans pente, l’eau n’a aucune raison d’avancer : elle reste dans le tuyau. La fiche de montage du split demande 3 cm de pente par mètre au moins." },
        { texte: "Un tuyau qui remonte un peu avant la sortie.", pourquoi: "C’est une contre-pente : l’eau reste au point bas, remplit le tuyau, remonte dans le bac, et le bac déborde." },
        { texte: "Un tuyau qui s’affaisse au milieu.", pourquoi: "Ce creux est un point bas : l’eau s’y arrête. Un seul suffit à faire déborder le bac." } ] },

    { question: "Le tuyau de condensats finit sur une évacuation d’eaux usées. Que faut-il poser ?",
      confirmation: "Un siphon : son bouchon d’eau laisse passer l’eau du bac et arrête les odeurs.",
      reponses: [
        { texte: "Rien : l’évacuation est faite pour ça.", pourquoi: "Elle est faite pour l’eau, mais les odeurs de l’égout peuvent remonter par le tuyau jusque dans la pièce. Le siphon les arrête." },
        { texte: "Un siphon.", juste: true },
        { texte: "Un robinet d’arrêt.", pourquoi: "Un robinet couperait l’écoulement : le bac déborderait. Ce qu’il faut, c’est laisser passer l’eau et arrêter les odeurs." },
        { texte: "Une pompe de relevage.", pourquoi: "La pompe sert quand la pente est impossible. Elle n’arrête pas les odeurs." } ] },

    { question: "Vous posez une pompe de relevage. Que doit-elle avoir en plus ?",
      confirmation: "Un contact de sécurité : si l’eau monte trop, il coupe le froid, ou déclenche une alarme, avant que le bac ne déborde.",
      reponses: [
        { texte: "Rien : une pompe ne tombe jamais en panne.", pourquoi: "Elle peut s’arrêter, ou le tuyau peut se boucher. Sans sécurité, l’eau monte jusqu’à déborder : c’est l’inondation." },
        { texte: "Un second tuyau en contre-pente pour l’aider.", pourquoi: "Une contre-pente retient l’eau, elle n’aide pas la pompe. Ce qui protège, c’est la sécurité." },
        { texte: "Un contact de sécurité relié à la commande du froid.", juste: true },
        { texte: "Un siphon à son entrée.", pourquoi: "Le siphon arrête les odeurs, il ne protège pas d’un débordement." } ] },

    { question: "Le tuyau de condensats traverse un faux plafond chaud et humide, sans isolant. Que risque-t-il ?",
      confirmation: "L’eau qu’il porte est froide : le tuyau se couvre de gouttes, qui tombent dans le faux plafond.",
      reponses: [
        { texte: "Rien : c’est de l’eau, pas du fluide frigorigène.", pourquoi: "L’eau du bac est froide. Dans un local chaud et humide, l’air dépose son humidité sur le tuyau, comme sur un verre sorti du frigo." },
        { texte: "Il se bouche.", pourquoi: "L’isolant ne change rien à l’intérieur du tuyau. Le risque, c’est l’eau qui perle sur sa paroi." },
        { texte: "Il gèle.", pourquoi: "Dans un local chaud, non. Le problème est l’inverse : un tuyau froid dans un air chaud et humide." },
        { texte: "Il se couvre de gouttes qui tombent dans le faux plafond.", juste: true } ] },

    { question: "En hiver, l’appareil chauffe. Où y a-t-il de l’eau à évacuer ?",
      confirmation: "Sous l’unité extérieure : sa batterie est froide, elle peut givrer, et le givre fond au dégivrage.",
      reponses: [
        { texte: "Sous l’unité extérieure, surtout au dégivrage.", juste: true },
        { texte: "Dans le bac de l’unité intérieure.", pourquoi: "En mode chaud, la batterie intérieure est chaude : elle ne fait plus d’eau." },
        { texte: "Nulle part : sans froid dans la pièce, il n’y a plus d’eau.", pourquoi: "Dehors, la batterie de l’unité extérieure est froide : elle fait de l’eau, et du givre qui fond." },
        { texte: "Dans les tubes de cuivre.", pourquoi: "Les tubes transportent le fluide frigorigène, pas de l’eau." } ] }
  ],

  retenir: [
    "<strong>Toute machine qui refroidit fait de l’eau</strong> : on prévoit son évacuation avant de poser.",
    "<strong>L’eau descend toute seule si le tuyau descend partout</strong> : aucun point bas, aucune contre-pente.",
    "<strong>Sur une évacuation d’eaux usées, un siphon.</strong> Pente impossible : une pompe, <strong>avec son contact de sécurité</strong>.",
    "<strong>En mode chaud, l’eau se forme dehors</strong> : on prévoit où elle va."
  ],

  objectifs: '<p><strong>Objectif.</strong> Suivre le chemin de l’eau de condensation, du bac jusqu’à la sortie, et savoir ce qu’on pose selon le cas : pente, siphon, pompe de relevage avec sa sécurité.</p><p><strong>Limite.</strong> La seule valeur chiffrée est la pente de 3 cm par mètre au moins, tirée de la fiche de montage du split. Le diamètre du tuyau, la hauteur de refoulement de la pompe et le branchement de son contact viennent de la notice de l’appareil et de celle de la pompe.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs — toute image signalée sera remplacée' },
    { quoi: 'Pente de 3 cm par mètre au moins', source: 'fiche « Montage climatiseur split » du fonds de cours',
      detail: 'la notice de l’appareil fait foi' },
    { quoi: 'Contact de sécurité de la pompe (ouverture ou alarme)', source: 'document de cours « Alimentation d’une pompe de relevage »',
      detail: 'schéma de branchement du fonds ; rien n’a été repris tel quel' },
    { quoi: 'Symboles', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' } ],

  correspondances: [
    { ligne: 1, couleur: '#C9451A', texte: "1.4 Point de rosée et air humide", url: lien('1.4') },
    { ligne: 2, couleur: '#3D7FCA', texte: "2.7 Le dégivrage par inversion de cycle", url: lien('2.7') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.3 Choisir l’unité intérieure", url: lien('3.3') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.1 Poser les deux unités", url: lien('4.1') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.5 Alimenter et relier les deux unités", url: lien('4.5') } ]
});
