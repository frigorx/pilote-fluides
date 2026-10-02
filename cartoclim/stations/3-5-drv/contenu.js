/* CartoClim 3.5 — Le DRV : un réseau de fluide à débit variable. Écrite le 02/10/2026 sur le moule de 3.2. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '3.5', ligne: 3,
  kicker: 'CartoClim · Ligne 3 Les familles · Station 5',
  titre: "Le DRV : un réseau de fluide à débit variable",
  narration: NARRATION,

  prerequis: [
    { id: '3.2', quoi: "le split : deux unités, un circuit" },
    { id: '2.5', quoi: "le détendeur électronique, qui règle le débit de fluide" }
  ],

  photos: [
    { src: 'assets/biblio/vrv-groupe-exterieur.jpg',
      alt: "Le côté d’un groupe extérieur de grande taille : une grande batterie d’ailettes protégée par une grille, sur un châssis robuste.",
      titre: "Le groupe extérieur, de près.", sous: "Une grande batterie : elle rejette la chaleur de tout l’immeuble. La photo est recadrée." }
  ],

  aQuoiCaSert: "À <strong>climatiser tout un bâtiment avec un seul réseau de fluide</strong>. DRV veut dire <strong>débit de réfrigérant variable</strong> — certains constructeurs disent VRV ou VRF. Un ou plusieurs groupes extérieurs, des dizaines d’unités intérieures, et entre eux un réseau de tubes de cuivre qui se ramifie. Dans le bâtiment, ce qui circule n’est ni de l’air ni de l’eau : c’est le <strong>fluide frigorigène lui-même</strong>, que chaque pièce prend selon son besoin.",
  ouOnLeTrouve: "Dans le <strong>tertiaire</strong> : bureaux, hôtels, commerces. Le groupe est en général posé en toiture, sans local technique. Les unités sont dans les faux-plafonds (cassettes, gainables) ou en allège, sous la fenêtre (consoles). C’est une installation qui se calcule, se pose et se met en service avec méthode.",

  scene: () => ScenesStation.reseauEnArbre(),

  technologie: [
    ["Le groupe extérieur", "en toiture, le plus souvent. Une grande <strong>batterie</strong> balayée par des ventilateurs, un <strong>compresseur à vitesse variable</strong> (Inverter) — et, quand la puissance l’exige, d’autres compresseurs en tout ou rien qui prennent le relais. Sa vitesse suit la demande de <strong>tout</strong> le réseau. Si le réseau est réversible, une <strong>vanne 4 voies</strong> inverse le cycle."],
    ["Le réseau de tubes", "des <strong>tubes de cuivre isolés, de petit diamètre</strong>, montés en <strong>arbre</strong> : une colonne qui descend, puis à chaque branche un <strong>joint Y</strong> ou un <strong>boîtier de répartition</strong>. Deux tubes (liquide et gaz) quand tout le réseau est dans le même mode ; trois tubes et un boîtier de répartition par zone quand on veut du froid et du chaud en même temps."],
    ["Les unités intérieures", "chacune est une petite machine : une <strong>batterie</strong>, un <strong>ventilateur</strong>, des sondes, et surtout un <strong>détendeur électronique</strong> qui règle en permanence le débit de fluide selon la charge de la pièce. Cassette de faux-plafond, gainable, console en allège : station 3.3."],
    ["Le bus de communication", "un câble qui relie le groupe et chaque unité. Chaque unité y porte son <strong>adresse</strong> : elle dit au groupe ce que sa pièce demande, et c’est elle qui rattache une télécommande à la bonne unité. Les unités savent aussi s’auto-diagnostiquer, ce qui aide au dépannage."]
  ],

  variantes: [
    "<strong>Deux tubes</strong> — tout le réseau est dans le même mode, froid ou chaud. La vanne 4 voies du groupe inverse le cycle pour tout le monde. Station 2.6.",
    "<strong>Récupération d’énergie</strong> — trois tubes, et un boîtier de répartition à l’entrée de chaque zone : chaque zone choisit chaud ou froid, et la chaleur retirée dans une pièce sert à chauffer sa voisine.",
    "<strong>Récupération à deux tubes</strong> — certains constructeurs y parviennent avec deux tubes seulement : le fluide circule en mélange de liquide et de gaz, que le boîtier de répartition sépare.",
    "<strong>Froid seul</strong> — la version la plus simple, de plus en plus rare : tous les étages refroidissent, jamais rien d’autre.",
    "<strong>Plusieurs groupes</strong> — quand un seul ne suffit pas. Des réseaux séparés fonctionnent côte à côte, sans échange entre eux ; des groupes raccordés ensemble demandent les précautions de la notice (placement, égalisation de l’huile).",
    "<strong>Le fluide</strong> — il se lit sur la plaque du groupe, et ce qu’il change à la pose et à l’intervention est dans la station 4.9."
  ],
  reglage: "Chaque pièce garde sa <strong>propre consigne</strong>, donnée depuis sa télécommande : mode, température, vitesse du ventilateur. Le débit de fluide, lui, se règle tout seul : le détendeur de chaque unité suit sa pièce, le compresseur suit l’ensemble. Sur le chantier, ce qui se règle, c’est la mise en service : la charge, puis l’adressage. Stations 5.1 et 2.5.",

  consigneAptitudes: 'Un DRV à récupération d’énergie, dans un immeuble de bureaux : cochez ce qu’il sait faire, puis validez.',
  titreAptitudes: 'Que sait faire un DRV ?',
  colonnes: [
    { id: 'desservir', libelle: 'Beaucoup de pièces', aide: 'desservir toutes les pièces d’un immeuble avec un seul groupe et un seul réseau de tubes',
      dessin: '<rect x="34" y="6" width="32" height="20" rx="4"/><path d="M50 26 V42 M18 42 H82 M18 42 V58 M50 42 V58 M82 42 V58"/><rect x="6" y="58" width="24" height="16" rx="3"/><rect x="38" y="58" width="24" height="16" rx="3"/><rect x="70" y="58" width="24" height="16" rx="3"/><path d="M18 74 V88 M50 74 V88 M82 74 V88"/>' },
    { id: 'melanger', libelle: 'Chaud et froid', aide: 'chauffer une pièce et en refroidir une autre en même temps — avec la récupération d’énergie',
      dessin: `<g transform="translate(-4 -4) scale(.55)">${SceneKit.pictos.DESSINS.froid}</g><g transform="translate(48 48) scale(.55)">${SceneKit.pictos.DESSINS.chaud}</g>` },
    { id: 'sansEtude', libelle: 'Pose sans étude', aide: 'se poser comme un split, sans étude : tubes et charge choisis au jugé',
      dessin: '<rect x="20" y="8" width="50" height="76" rx="6"/><path d="M32 28 H58 M32 44 H58 M32 60 H48"/><path d="M62 84 L84 44 L92 50 L70 90 Z"/>' }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    desservir: true, melanger: true, sansEtude: false,
    bonneReponse: 'Exact. Un seul réseau dessert beaucoup de pièces, et avec la récupération d’énergie il chauffe l’une pendant qu’il refroidit l’autre. Mais il ne se pose pas comme un split : les tubes se calculent tronçon par tronçon, et la charge aussi.',
    erreurs: {
      desservir: 'C’est sa raison d’être : un seul groupe en toiture et un seul réseau de tubes desservent beaucoup de pièces, chacune avec son unité et sa propre régulation.',
      melanger: 'Oui, mais seulement avec la récupération d’énergie : un troisième tube et des boîtiers de répartition laissent chaque zone choisir chaud ou froid. Avec deux tubes, tout le réseau est dans le même mode.',
      sansEtude: 'Non. Un DRV ne se pose pas comme un split : chaque tronçon a sa longueur et son diamètre, la charge se calcule, chaque unité s’adresse. Tout cela suppose une étude.'
    }
  },

  titreCablage: 'Le raccordement',
  cablage: [
    "<strong>Les tubes de cuivre</strong>, en arbre : colonne, puis un joint Y ou un boîtier à chaque branche. Le diamètre de chaque tronçon vient de l’étude et de la notice. Stations 4.2 pour les liaisons, CuivRézo pour le geste.",
    "<strong>Le brasage se fait sous azote</strong> : on balaie l’intérieur des tubes avec de l’azote pour qu’il ne s’oxyde pas. Un réseau est long, et les organes fins, comme les détendeurs électroniques, craignent les impuretés.",
    "<strong>Le bus de communication</strong> relie le groupe et chaque unité, en plus de l’alimentation de chacune. Station 4.5 pour l’alimentation.",
    "<strong>Les condensats</strong> de chaque unité intérieure, en pente continue — et ceux du groupe, quand le réseau est réversible. Station 4.4.",
    "<strong>La mise en service</strong> : tirage au vide et contrôle d’étanchéité (stations 4.7 et 4.6), chauffage du carter avant le premier démarrage, <strong>charge calculée puis pesée</strong>, enfin <strong>adressage</strong> de chaque unité."
  ],
  piege: "La <strong>charge additionnelle se calcule tronçon par tronçon</strong> : elle ne se devine pas, et elle se pèse à la balance. Un <strong>joint Y posé à l’envers</strong> ou hors de son plan répartit mal le fluide. Une <strong>unité mal adressée</strong> répond à la mauvaise télécommande : le client règle sa pièce, et c’est la pièce voisine qui change.",

  symboles: [
    { src: 'assets/vrv-exterior.svg', alt: "Symbole d’un groupe extérieur de DRV : un grand boîtier haut, avec son hélice dessinée sur le dessus, sa batterie quadrillée et ses raccords sur le côté.", legende: "Groupe extérieur" },
    { src: 'assets/caja-reparto-vrv.svg', alt: "Symbole d’un boîtier de répartition : un boîtier dessiné en perspective, avec ses raccords numérotés.", legende: "Boîtier de répartition" }
  ],
  titreLecturePlan: 'Le lire sur un plan',
  lecturePlan: [
    "Sur un plan, le <strong>groupe extérieur</strong> est en toiture ou sur une terrasse, les <strong>unités intérieures</strong> sont dessinées dans les pièces, et entre les deux court le <strong>réseau de tubes</strong>, avec ses dérivations ou ses boîtiers.",
    "Pour chaque tronçon, cherchez le <strong>diamètre</strong> et la <strong>longueur</strong>. Ce sont eux qui commandent la <strong>charge additionnelle</strong> : sans eux, on ne peut pas calculer.",
    "Cherchez aussi l’<strong>adresse</strong> de chaque unité. Elle relie le plan, l’unité posée au plafond et sa télécommande : c’est ce qu’on programme à la mise en service.",
    "Les repères courants : <strong>UE</strong> pour le groupe extérieur, <strong>UI</strong> pour chaque unité intérieure."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Ce qu’il faut maîtriser, du groupe à la dernière unité',

  quiz: [
    { question: "Que veut dire « débit variable » ?",
      confirmation: "Le débit de fluide envoyé à chaque unité s’ajuste en permanence à la demande de sa pièce.",
      reponses: [
        { texte: "La longueur des tubes change selon la saison.", pourquoi: "Les tubes sont posés une fois pour toutes. Ce qui varie, c’est la quantité de fluide qui y circule." },
        { texte: "Le fluide envoyé à chaque unité s’ajuste à la demande de sa pièce.", juste: true },
        { texte: "Le groupe extérieur change de place selon le besoin.", pourquoi: "Le groupe reste en toiture. C’est son compresseur qui change de vitesse." },
        { texte: "Chaque pièce reçoit toujours la même quantité de fluide.", pourquoi: "C’est l’inverse : une pièce très chaude en reçoit beaucoup, une pièce déjà fraîche presque plus." } ] },

    { question: "Qui règle le débit de fluide dans chaque pièce ?",
      confirmation: "Le détendeur électronique de l’unité intérieure, qui suit la charge de sa pièce.",
      reponses: [
        { texte: "La télécommande, qui ouvre une vanne à la main.", pourquoi: "La télécommande donne la consigne. C’est la régulation de l’unité, avec son détendeur électronique, qui ajuste le débit." },
        { texte: "Le joint Y, qui s’ouvre plus ou moins.", pourquoi: "Un joint Y est une simple pièce de cuivre qui partage le fluide. Il n’a aucun organe de réglage." },
        { texte: "Le détendeur électronique de l’unité intérieure.", juste: true },
        { texte: "Le compresseur, seul, pour toutes les unités.", pourquoi: "Le compresseur suit la demande totale, mais il ne répartit pas : sans le détendeur de chaque unité, toutes recevraient la même chose." } ] },

    { question: "Avec un réseau à deux tubes, que peut-on faire ?",
      confirmation: "Tout le réseau est dans le même mode : tout en froid, ou tout en chaud.",
      reponses: [
        { texte: "Faire du froid seulement.", pourquoi: "Non : la vanne 4 voies du groupe inverse le cycle, et tout le réseau passe en chaud." },
        { texte: "Refroidir la salle de réunion et chauffer le bureau voisin.", pourquoi: "Cela demande la récupération d’énergie : un troisième tube et des boîtiers de répartition (ou, chez certains constructeurs, des boîtiers sur deux tubes)." },
        { texte: "Choisir le mode de chaque pièce depuis sa télécommande.", pourquoi: "Le mode est décidé pour tout le réseau. Une télécommande règle la température, pas le mode du voisin." },
        { texte: "Tout le réseau en froid, ou tout le réseau en chaud.", juste: true } ] },

    { question: "À quoi sert un boîtier de répartition ?",
      confirmation: "À envoyer à chaque zone ce qui convient, gaz chaud ou liquide, selon qu’elle demande du chaud ou du froid.",
      reponses: [
        { texte: "À envoyer à sa zone le fluide qui convient, pour du chaud ou du froid.", juste: true },
        { texte: "À garder du fluide en réserve.", pourquoi: "Ce n’est pas un réservoir : il aiguille le fluide, il ne le stocke pas." },
        { texte: "À répartir l’air entre les pièces.", pourquoi: "Aucun air ne passe par lui : il est sur les tubes de fluide, pas sur une gaine." },
        { texte: "À remplacer la télécommande.", pourquoi: "Il reçoit la température et la consigne de la zone, mais la télécommande reste l’interface de l’occupant." } ] },

    { question: "Comment le groupe sait-il quelle unité répond à quelle télécommande ?",
      confirmation: "Chaque unité a son adresse sur le bus. Une mauvaise adresse envoie l’ordre à la mauvaise pièce.",
      reponses: [
        { texte: "Par la couleur des tubes qui y arrivent.", pourquoi: "La couleur d’un tube ne dit rien de l’unité. Ce sont des adresses sur le bus de communication qui les distinguent." },
        { texte: "Par l’adresse que chaque unité porte sur le bus.", juste: true },
        { texte: "Toutes les unités répondent ensemble à toutes les télécommandes.", pourquoi: "Non : chaque télécommande parle à l’unité qui porte son adresse. C’est justement pour cela qu’il faut les vérifier." },
        { texte: "Par la longueur du tube de chaque unité.", pourquoi: "La longueur sert à calculer la charge, pas à reconnaître une unité." } ] },

    { question: "Le réseau est monté, un peu plus long que prévu. Que fait-on pour la charge de fluide ?",
      confirmation: "On la calcule tronçon par tronçon d’après ce qui est posé, puis on la pèse. Elle ne se devine pas.",
      reponses: [
        { texte: "On en ajoute au jugé, jusqu’à ce que les pressions paraissent bonnes.", pourquoi: "Sans calcul, on risque de surcharger ou de manquer. Les capteurs de la régulation sont précis : ils n’acceptent pas l’approximation." },
        { texte: "On garde la charge d’usine du groupe, comme sur un split préchargé.", pourquoi: "La charge d’usine ne couvre pas un réseau sur mesure : chaque tronçon ajoute la sienne." },
        { texte: "On la calcule tronçon par tronçon, puis on la pèse.", juste: true },
        { texte: "On l’estime à l’œil sur la longueur totale.", pourquoi: "Une longueur totale ne suffit pas : chaque tronçon a son diamètre, donc sa part de fluide." } ] }
  ],

  retenir: [
    "<strong>Un groupe, un réseau en arbre, une unité par pièce</strong> : chacune règle son débit avec son détendeur électronique.",
    "<strong>Le bus donne une adresse à chaque unité</strong> : une unité mal adressée répond à la mauvaise télécommande.",
    "<strong>Deux tubes : tout le monde dans le même mode.</strong> Récupération d’énergie : du froid et du chaud en même temps.",
    "<strong>Un DRV ne se pose pas comme un split</strong> : charge calculée tronçon par tronçon, brasage sous azote, adressage."
  ],

  objectifs: '<p><strong>Objectif.</strong> Reconnaître un DRV — un groupe en toiture, un réseau de tubes en arbre, une unité par pièce, un bus —, suivre le fluide pas à pas, et distinguer le réseau à deux tubes de la récupération d’énergie.</p><p><strong>Limite.</strong> Aucune valeur de charge, de longueur, de diamètre ni de puissance n’est donnée ici : elles viennent de l’étude et de la notice du constructeur. Le brasage, le tirage au vide, la charge et l’adressage sont des gestes à part : stations 4.2, 4.7 et 5.6.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs : le dessin de l’étage vient de « 6.4 Technologie (VRV).pdf », la photo du groupe d’un dossier d’analyse de risques, recadrée — toute image signalée sera remplacée' },
    { quoi: 'Symboles', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' } ],

  correspondances: [
    { ligne: 2, couleur: '#3D7FCA', texte: "2.4 L’Inverter : la vitesse suit le besoin", url: lien('2.4') },
    { ligne: 2, couleur: '#3D7FCA', texte: "2.5 Détendre : capillaire et détendeur électronique", url: lien('2.5') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.4 Le multisplit : une unité extérieure, plusieurs pièces", url: lien('3.4') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.2 Les liaisons frigorifiques", url: lien('4.2') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.7 La chaîne de l’intervention : manifold, vide, ordre des vannes", url: lien('4.7') } ]
});
