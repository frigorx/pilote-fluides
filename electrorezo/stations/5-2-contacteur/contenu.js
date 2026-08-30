/* ÉlectroRézo 5.2 — Le contacteur. */

ModeleAppareil.construire({
  id: '5.2', ligne: 5,
  kicker: 'ÉlectroRézo · Ligne 5 Commander · Station 2',
  titre: "Le contacteur",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/contacteur-lc1d09.png',
      alt: "Photo d’un contacteur Schneider LC1D09 TeSys, gris et blanc, avec ses bornes de raccordement.",
      titre: "L’appareil.", sous: "Le cœur de toute armoire de commande." },
    { src: 'assets/biblio/contacteur-en-coupe.jpeg',
      alt: "Vue éclatée d’un contacteur LC1-D : boîtier d’arc, contacts fixes et mobiles, porte-contacts, armature, ressort de rappel, bobine, circuit magnétique, socle.",
      titre: "Ouvert, pièce par pièce.", sous: "Chaque nom de cette planche va être expliqué." },
    { src: 'assets/biblio/contacteur-coupe-detaillee.jpeg',
      alt: "Coupe détaillée d’un contacteur LC1-D montrant l’empilement du boîtier d’arc, des contacts et de la bobine.",
      titre: "En coupe.", sous: "On voit la bobine en bas, les contacts en haut." }
  ],
  creditPhoto: 'Planches techniques issues de documents de cours indexés. Détail dans « Crédits ».',

  aQuoiCaSert: "À faire commander un gros courant par un tout petit. Vous alimentez une bobine avec quelques milliampères, et trois contacts capables de porter des dizaines d’ampères se ferment d’un coup.",
  ouOnLeTrouve: "Dans toute armoire où il y a un moteur, un compresseur, un ventilateur, une résistance de chauffage. Dès qu’une machine se commande à distance, il y a un contacteur.",

  scene: () => SchemasCommande.coupeContacteur(),

  technologie: [
    ["La bobine", "quelques milliers de spires de fil fin, entre les bornes <strong>A1</strong> et <strong>A2</strong>. Alimentée, elle devient un électro-aimant."],
    ["Le circuit magnétique", "deux blocs de tôles empilées : un fixe, un mobile. La bobine attire le mobile contre le fixe. On dit que le contacteur « colle »."],
    ["Le porte-contacts", "une barre isolante portée par l’armature mobile. Tous les contacts y sont accrochés — d’où le fait qu’ils bougent tous ensemble."],
    ["Le ressort de rappel", "il écarte l’armature dès que la bobine n’est plus alimentée. C’est lui qui garantit que le contacteur retombe."],
    ["Le boîtier d’arc", "des cloisons au-dessus des contacts de puissance. Elles découpent l’arc de coupure et le refroidissent."]
  ],

  variantes: [
    "<strong>Le calibre</strong> — un LC1D09 tient neuf ampères en service moteur, un LC1D65 en tient soixante-cinq. Il se choisit sur la puissance du moteur.",
    "<strong>La tension de bobine</strong> — 24 V, 48 V, 230 V, 400 V, en continu ou en alternatif. Elle est écrite sur la bobine, et elle n’a rien à voir avec la tension de puissance.",
    "<strong>La catégorie d’emploi</strong> — <strong>AC-3</strong> pour un moteur qui démarre et s’arrête normalement, <strong>AC-4</strong> pour un moteur qu’on inverse ou qu’on freine. À calibre égal, l’AC-4 est bien plus dur.",
    "<strong>Le contacteur-inverseur</strong> — deux contacteurs verrouillés l’un avec l’autre, pour faire tourner un moteur dans les deux sens sans jamais les coller ensemble."
  ],
  reglage: "Un contacteur ne se règle pas. Il se choisit : calibre selon le moteur, tension de bobine selon le circuit de commande, catégorie d’emploi selon le service. Une seule vérification a du sens sur le terrain : que la tension écrite sur la bobine soit bien celle que vous allez lui envoyer.",

  picto: SchemasCommande.pictoTrois,
  colonnes: SchemasCommande.COLONNES,
  consigneAptitudes: 'Les trois questions de la ligne. Cochez ce que le contacteur sait faire, puis validez.',
  aptitudes: {
    puissance: true, distance: true, maintien: false,
    bonneReponse: 'Exact. Le contacteur est le seul appareil de cette ligne à porter la puissance ET à obéir à distance. En revanche il ne garde rien : coupez sa bobine, il retombe. C’est pour cela qu’on lui ajoute un auto-maintien, à la station suivante.',
    erreurs: {
      puissance: 'Ses contacts principaux sont épais et logés dans un boîtier d’arc : ils sont faits pour le courant d’un moteur.',
      distance: 'C’est même sa raison d’être : une bobine, quelques milliampères, et trois gros contacts obéissent.',
      maintien: 'Un contacteur ne garde rien. Le ressort de rappel le fait retomber dès que la bobine n’est plus alimentée. C’est un défaut voulu : après une coupure de courant, une machine ne doit pas repartir toute seule.'
    }
  },

  cablage: [
    "La <strong>bobine</strong> se raccorde entre <strong>A1</strong> et <strong>A2</strong>. Ces deux bornes sont sur le circuit de commande, jamais sur la puissance.",
    "Les <strong>contacts de puissance</strong> portent 1/2, 3/4, 5/6. L’entrée en haut, la sortie en bas — toujours dans ce sens.",
    "Les <strong>contacts auxiliaires</strong> portent des repères à deux chiffres : 13-14, 21-22. Ce sont eux qui vont dans la commande.",
    "En amont, il faut toujours une protection : disjoncteur moteur ou fusible aM plus relais thermique. Le contacteur commande, il ne protège pas."
  ],
  piege: "Un contacteur n’est <strong>pas</strong> un appareil de sectionnement. Il n’a ni distance d’ouverture garantie, ni possibilité de cadenassage. Ouvrir un contacteur ne met personne en sécurité.",

  symboles: [
    { src: 'assets/bobine3.svg', alt: "Symbole normalisé de la bobine d’un contacteur : un rectangle traversé par le conducteur.", legende: "La bobine" },
    { src: 'assets/com_puiss1.svg', alt: "Symbole normalisé d’un contact de puissance de contacteur, avec son demi-cercle.", legende: "Un contact de puissance" },
    { src: 'assets/con_simple.svg', alt: "Symbole normalisé d’un contact auxiliaire normalement ouvert.", legende: "Un contact auxiliaire" }
  ],
  lecturePlan: [
    "Regardez de près le contact de puissance : il porte un <strong>petit demi-cercle</strong> sur la borne fixe, que le contact auxiliaire n’a pas.",
    "Ce demi-cercle n’est pas un ornement. Il dit : ce contact est équipé pour couper un courant important, il a un dispositif d’extinction d’arc.",
    "La <strong>bobine</strong>, elle, est ailleurs sur le plan : dans le circuit de commande, souvent une page plus loin. C’est le repère <strong>KM1</strong> qui fait le lien.",
    "Alors devant un plan complet, cherchez le même repère aux deux endroits. Ce n’est pas deux appareils : c’est le même, vu par ses deux moitiés."
  ],

  tableau: SchemasCommande.tableauCommande,
  tableauTitre: 'Les appareils de la ligne 5',

  quiz: [
    { question: "Que se passe-t-il quand on coupe l’alimentation de la bobine ?",
      confirmation: "Le ressort de rappel ramène l’armature : tous les contacts s’ouvrent.",
      reponses: [
        { texte: "Rien, tant que le moteur tourne.", pourquoi: "Le moteur ne maintient rien : c’est le contacteur qui l’alimente, pas l’inverse." },
        { texte: "Seuls les contacts auxiliaires s’ouvrent.", pourquoi: "Tous les contacts sont sur le même porte-contacts : ils bougent ensemble." },
        { texte: "Le ressort écarte l’armature et tous les contacts s’ouvrent.", juste: true },
        { texte: "Le contacteur reste collé jusqu’à ce qu’on le déverrouille.", pourquoi: "Sauf modèle à accrochage mécanique, un contacteur ordinaire retombe toujours." } ] },

    { question: "Les bornes A1 et A2 d’un contacteur, c’est quoi ?",
      confirmation: "Ce sont les deux bornes de la bobine, dans le circuit de commande.",
      reponses: [
        { texte: "L’entrée et la sortie de la première phase.", pourquoi: "La puissance porte 1/2, 3/4, 5/6." },
        { texte: "Les deux premiers contacts auxiliaires.", pourquoi: "Les auxiliaires portent des repères à deux chiffres : 13-14, 21-22." },
        { texte: "Les bornes de raccordement à la terre.", pourquoi: "La terre n’est pas raccordée sur le contacteur." },
        { texte: "Les deux bornes de la bobine.", juste: true } ] },

    { question: "Peut-on consigner une machine en ouvrant son contacteur ?",
      confirmation: "Un contacteur n’a ni distance garantie, ni cadenassage.",
      reponses: [
        { texte: "Non : ce n’est pas un appareil de sectionnement.", juste: true },
        { texte: "Oui, les contacts sont bien écartés.", pourquoi: "Écartés, oui — mais sans garantie constructeur ni condamnation possible." },
        { texte: "Oui, si on coupe aussi la commande.", pourquoi: "Couper la commande ne garantit pas la distance d’ouverture, et rien n’empêche un redémarrage." },
        { texte: "Oui, à condition de mettre un macaron.", pourquoi: "Un macaron ne remplace pas un cadenas sur un appareil condamnable." } ] },

    { question: "Un contacteur AC-3 de 9 A convient-il pour inverser un moteur toutes les dix secondes ?",
      confirmation: "L’inversion relève de la catégorie AC-4, beaucoup plus exigeante.",
      reponses: [
        { texte: "Oui, 9 A c’est 9 A.", pourquoi: "La catégorie d’emploi dit dans quelles conditions ces 9 A sont tenus." },
        { texte: "Non : il faut regarder la catégorie d’emploi, pas seulement le calibre.", juste: true },
        { texte: "Non, il faut un contacteur monophasé.", pourquoi: "Le nombre de phases n’a rien à voir avec le service demandé." },
        { texte: "Oui, si on ajoute un relais thermique.", pourquoi: "Le thermique protège le moteur, il n’aide pas les contacts du contacteur." } ] }
  ],

  retenir: [
    "<strong>Une bobine</strong> commande <strong>trois gros contacts</strong>. C’est tout le principe.",
    "<strong>A1 · A2</strong> pour la bobine, <strong>1/2 3/4 5/6</strong> pour la puissance.",
    "<strong>Il retombe</strong> dès que la bobine n’est plus alimentée. Voulu.",
    "<strong>Ce n’est pas un sectionneur.</strong> On ne consigne rien avec lui."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre comment une bobine ferme des contacts de puissance, savoir lire les repères d’un contacteur et choisir sa tension de bobine.</p><p><strong>Limite.</strong> Le calcul du calibre selon la puissance moteur et la catégorie d’emploi n’est qu’évoqué : il relève d’un cours de dimensionnement.</p>',

  credits: [
    { quoi: 'Vue éclatée du contacteur LC1-D', source: 'document de cours indexé dans la base inerWeb',
      detail: 'Activité 8 et 10 — Appareillages pour le câblage de moteurs' },
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/310_relays_contactors_contacts/' } ],

  correspondances: [
    { ligne: 6, couleur: '#c9451a', texte: "6.1 La bobine et l’électro-aimant" },
    { ligne: 5, couleur: '#0f7b6c', texte: "5.3 Le contact auxiliaire" },
    { ligne: 4, couleur: '#c0392b', texte: "4.7 Le relais thermique" } ]
});
