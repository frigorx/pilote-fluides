/* =====================================================================
   reseaux.js — LA LISTE DES RÉSEAUX D'INERWEB : une seule source
   ---------------------------------------------------------------------
   Rôle : dire, une fois pour toutes, quels réseaux de cours existent, où
   ils vivent, comment ils se présentent (couleur, phrase, niveaux, état),
   par quelle station on y entre et quels raccourcis on offre. L'accueil
   (build/accueil.mjs → vignettes, chiffres, carte des réseaux) le lit ;
   la barre commune des réseaux (phase 2 du chantier réseaux) le lira.
   Les COMPTES (stations, lignes) ne sont PAS ici : ils sont relevés au
   build dans docs/catalogue-2026-09/catalogue-stations.json, par le
   champ `catalogue` (les noms de réseau tels que le catalogue les écrit).
   Chargement : script classique, expose window.INERWEB_RESEAUX ; lisible
   aussi côté node par build/accueil.mjs (évaluation entre sentinelles).
   Pièges : (1) les adresses sont RELATIVES à la racine du site ; (2) pas
   de « prototype / brouillon » ici — l'état se dit « en relecture » quand
   le réseau lui-même porte un bandeau de chantier (décision F. Henninot
   attendue sur ces mentions, audit du 12/09 piste 10) ; (3) l'ordre du
   tableau est l'ordre d'affichage.
   Champs facultatifs : `accroche` (suite du titre après « — »),
   `stations` / `lignes` (comptes forcés quand le catalogue ne suit pas),
   `chiffres` (texte libre à la place de « N stations · N lignes », ex.
   « 11 modules · 4 paliers »), `pdf` ({ titre, href } : document à
   télécharger, ajouté après les raccourcis), `points` (nombre de ronds sur
   la carte des réseaux quand le réseau n'a pas de lignes, ex. les jeux).
   ===================================================================== */
/* RESEAUX DEBUT */
window.INERWEB_RESEAUX = [
  {
    id: "thermo-techno",
    nom: "Le réseau thermo-techno",
    court: "Thermo-techno",
    emoji: "❄️",
    adresse: "plan.html",
    couleur: "#0c4a6e",
    sousTitre: "Le métier de frigoriste : la chaleur, le circuit et ses organes, les gestes, les fluides, la régulation, l’huile, le CO₂.",
    niveaux: "CAP → BTS · habilitation fluides",
    etat: "",
    catalogue: ["Plan thermo-techno", "Plan — capsules"],
    lignes: 15, /* le catalogue ne porte pas la ligne des stations du plan : compte de build/plan-liste.mjs (« 15 lignes ») */
    vignette: "icones/reseaux/thermo-techno.svg",
    entree: { titre: "Du glaçon au circuit", href: "packs/fluides/res/chaleur-interactive/index.html" },
    raccourcis: [
      { titre: "Les organes", href: "plan.html#ligne=organes" },
      { titre: "Les gestes", href: "plan.html#ligne=gestes" },
      { titre: "La régulation", href: "plan.html#ligne=regules" },
      { titre: "Le CO₂", href: "plan.html#ligne=co2" }
    ]
  },
  {
    id: "legislation",
    nom: "Réseau Législation",
    court: "Législation",
    emoji: "📜",
    adresse: "legislation/index.html",
    couleur: "#1e40af",
    sousTitre: "Le cadre du métier : réglementation, sécurité, environnement. Onze sous-lignes, un bâtiment en 3D pour s’y orienter, et un carnet de missions de chargé d’affaires.",
    niveaux: "BTS",
    etat: "en relecture",
    catalogue: ["Législation"],
    stations: 57, /* le catalogue n'en relève encore que 29 : 57 dossiers dans legislation/stations */
    lignes: 11, /* deux lignes mères, onze sous-lignes (legislation/index.html) ; le catalogue ne porte pas la ligne */
    vignette: "icones/reseaux/legislation.svg",
    entree: { titre: "F-Gaz 3, le règlement 2024/573", href: "legislation/stations/fgaz-3/" },
    raccourcis: [
      { titre: "La DESP", href: "legislation/stations/desp-la-directive/" },
      { titre: "Les EPI", href: "legislation/stations/risques-epi/" },
      { titre: "PRP & ODP", href: "legislation/stations/impact-prp-odp/" }
    ]
  },
  {
    id: "hydrometro",
    nom: "HydroMétro",
    court: "HydroMétro",
    emoji: "💧",
    adresse: "hydrometro/index.html",
    couleur: "#3d7fca",
    sousTitre: "L’eau dans les circuits : principes, équipements, distribution, mesure et diagnostic.",
    niveaux: "CAP · Bac pro · BTS",
    etat: "",
    catalogue: ["HydroMétro"],
    vignette: "icones/reseaux/hydrometro.svg",
    entree: { titre: "Boucle", href: "hydrometro/stations/boucle/" },
    raccourcis: [
      { titre: "Débit", href: "hydrometro/stations/debit/" },
      { titre: "Circulateur", href: "hydrometro/stations/circulateur/" },
      { titre: "Équilibrage", href: "hydrometro/stations/equilibrage/" }
    ]
  },
  {
    id: "aerorezo",
    nom: "AéroRézo",
    court: "AéroRézo",
    emoji: "🌬️",
    adresse: "aerorezo/index.html",
    couleur: "#1b6e5a",
    sousTitre: "L’air dans les gaines : hygrométrie, VMC, distribution, climatisation, centrales de traitement d’air.",
    niveaux: "CAP · Bac pro · BTS",
    etat: "",
    catalogue: ["AéroRézo"],
    vignette: "icones/reseaux/aerorezo.svg",
    entree: { titre: "L’air se déplace", href: "aerorezo/stations/air-circule/" },
    raccourcis: [
      { titre: "Apport latent", href: "aerorezo/stations/apport-latent/" },
      { titre: "Air neuf", href: "aerorezo/stations/air-neuf-selection/" }
    ]
  },
  {
    id: "electrorezo",
    nom: "ÉlectroRézo",
    court: "ÉlectroRézo",
    emoji: "⚡",
    adresse: "electrorezo/index.html",
    couleur: "#7c3aed",
    sousTitre: "L’électrotechnique, de l’ampère au variateur de fréquence, et la lecture du schéma.",
    niveaux: "CAP · Bac pro",
    etat: "en relecture",
    catalogue: ["ÉlectroRézo"],
    vignette: "icones/reseaux/electrorezo.svg",
    entree: { titre: "Le courant et l’intensité", href: "electrorezo/stations/1-1-courant-intensite/" },
    raccourcis: [
      { titre: "La loi d’Ohm", href: "electrorezo/stations/1-3-resistance-loi-ohm/" },
      { titre: "Le contacteur", href: "electrorezo/stations/5-2-contacteur/" },
      { titre: "Lire un schéma", href: "electrorezo/stations/8-1-trait-et-point/" }
    ]
  },
  {
    id: "hocourant",
    nom: "HoCourant",
    court: "HoCourant",
    emoji: "🔋",
    adresse: "hocourant/index.html",
    couleur: "#b06a00",
    sousTitre: "Se préparer à l’habilitation électrique, de B0 à BR, palier par palier.",
    niveaux: "tous niveaux",
    etat: "",
    catalogue: ["HoCourant"],
    vignette: "icones/reseaux/hocourant.svg",
    entree: { titre: "Le danger électrique", href: "hocourant/?module=M1" },
    raccourcis: [
      { titre: "Les domaines de tension", href: "hocourant/?module=M4" },
      { titre: "La consignation", href: "hocourant/?module=M9" }
    ],
    pdf: { titre: "📕 Le livre — PDF disponible", href: "hocourant/livret/inerWeb.fr-HoCourant-Livret-eleve-A5.pdf?v=v3-5" }
  },
  {
    id: "r408",
    nom: "inerWeb R408",
    accroche: "Travail en hauteur",
    court: "inerWeb R408",
    emoji: "🪜",
    adresse: "r408/index.html",
    couleur: "#1b3a63",
    sousTitre: "Se préparer à la formation échafaudages de pied (R408), du socle au montage, palier par palier. Prototype en cours de relecture.",
    niveaux: "CAP",
    etat: "en relecture",
    catalogue: ["R408"],
    stations: 11, /* hors catalogue : 11 modules, 4 paliers (comme HoCourant, un module = une station, un palier = une ligne) */
    lignes: 4,
    chiffres: "11 modules · 4 paliers",
    vignette: "icones/reseaux/r408.svg",
    entree: { titre: "Le risque de chute", href: "r408/?module=M1" },
    raccourcis: [
      { titre: "Utiliser en sécurité", href: "r408/?module=M7" },
      { titre: "La vérification journalière", href: "r408/?module=M9" }
    ],
    pdf: { titre: "📕 Le livret — PDF disponible", href: "r408/livret/inerWeb.fr-R408-Livret-eleve-A5.pdf?v=v1" }
  },
  {
    id: "cuivrezo",
    nom: "CuivRézo",
    accroche: "Les gestes du cuivre",
    court: "CuivRézo",
    emoji: "🔥",
    adresse: "cuivrezo/index.html",
    couleur: "#b45309",
    sousTitre: "Les gestes du cuivre à votre poste d’atelier : couper, cintrer, évaser, braser, jusqu’aux pièces complexes. Prototype en cours de relecture.",
    niveaux: "CAP",
    etat: "en relecture",
    catalogue: [],
    stations: 14, /* pas encore au catalogue des stations : compte relevé dans l'atelier cuivrezo */
    lignes: 4,
    vignette: "cuivrezo/images/1-4-cintrette.webp",
    entree: { titre: "Mon poste de travail", href: "cuivrezo/stations/1-0/" },
    raccourcis: [
      { titre: "Cintrer à la cintrette", href: "cuivrezo/stations/1-4/" },
      { titre: "Le poste oxyacétylénique", href: "cuivrezo/stations/2-1/" },
      { titre: "📄 Les fiches de poste", href: "cuivrezo/papier/fiches-de-poste.html" } /* le PDF est exclu du dépôt (.gitignore) : 404 en ligne, 03/10 */
    ]
  },
  {
    id: "cartoclim",
    nom: "CartoClim",
    accroche: "La climatisation, station par station",
    court: "CartoClim",
    emoji: "🌡️",
    adresse: "cartoclim/index.html",
    couleur: "#0e7490" /* calque « Clim » de la rue 3D (maquette-entree-technique/zones.mjs) */,
    sousTitre: "Comprendre un climatiseur, du besoin à la panne : le split, le multisplit, le DRV, le roof-top, la PAC air/eau, le chauffe-eau thermodynamique, l’eau glacée — et ce qu’on pose, raccorde, règle et entretient. Relié aux autres réseaux, jamais recopié.",
    niveaux: "CAP · Bac pro · BTS",
    etat: "",
    catalogue: [],
    stations: 21, /* 39 gares dont 18 correspondances vers les autres réseaux */
    lignes: 5,
    vignette: "cartoclim/stations/3-2-split/assets/biblio/898384a2af.png",
    entree: { titre: "Climatiser, c’est quoi ?", href: "cartoclim/stations/1-1-climatiser/" },
    raccourcis: [
      { titre: "Le split : deux unités, un circuit", href: "cartoclim/stations/3-2-split/" },
      { titre: "La vanne 4 voies : froid ou chaud", href: "cartoclim/stations/2-6-vanne-4-voies/" }
    ]
  },
  /* Jeux, simulateur, films : rangés dans la grille des réseaux sur décision de
     F. Henninot (03/10/2026). Pas de stations au catalogue : `chiffres` dit ce
     qu'on y trouve, `points` pose les ronds de la carte des réseaux. */
  {
    id: "jouerezo",
    nom: "JouéRézo",
    accroche: "Les jeux du métier",
    court: "JouéRézo",
    emoji: "🎮",
    adresse: "jouerezo/index.html",
    couleur: "#15803d",
    sousTitre: "Dix jeux pour retenir le froid classique : Memory, le bon ordre, chrono vrai ou faux, QCM éclair, l’intrus, Nuit à l’atelier, compléter le schéma, Qui suis-je ?, le pendu du frigo, le circuit dont vous êtes le héros. Un code de partie à rendre en fin de jeu.",
    niveaux: "CAP · Bac pro",
    etat: "",
    catalogue: [],
    chiffres: "10 jeux",
    points: 10,
    vignette: "jouerezo/illustrations/accueil.webp",
    entree: { titre: "Memory", href: "jouerezo/memory.html" },
    raccourcis: [
      { titre: "Le circuit dont vous êtes le héros", href: "jouerezo/heros.html?t=froid" },
      { titre: "Compléter le schéma", href: "jouerezo/schema.html" },
      { titre: "Qui suis-je ?", href: "jouerezo/quisuisje.html" },
      { titre: "Le pendu du frigo", href: "jouerezo/pendu.html" }
    ]
  },
  {
    id: "simurezo",
    nom: "SimuRézo",
    accroche: "Le simulateur de panne",
    court: "SimuRézo",
    emoji: "🛠️",
    adresse: "simurezo/index.html",
    couleur: "#b91c1c",
    sousTitre: "Dépanner une chambre froide : relever les valeurs sur l’installation, voir le cycle se tracer sur le diagramme, puis conclure. Trois niveaux, de la Croix du frigoriste à l’atelier, en R-134a, R-449A ou R-290.",
    niveaux: "CAP → BTS",
    etat: "",
    catalogue: [],
    chiffres: "3 niveaux · 8 situations",
    points: 3,
    vignette: "icones/reseaux/simurezo.jpg",
    entree: { titre: "Commencer une partie", href: "simurezo/index.html" },
    raccourcis: [
      { titre: "Télécharger le simulateur (sans réseau)", href: "simurezo/simurezo.html" }
    ]
  },
  {
    id: "studio",
    nom: "inerWeb Studio",
    accroche: "Les films",
    court: "Studio",
    emoji: "🎬",
    adresse: "studio/index.html",
    couleur: "#be185d" /* le cinéma du quartier (quartier/index.html, app-cinema) */,
    sousTitre: "Tous les films du site dans une seule salle : le Voyage dans tous ses états, ses éditions à l’ammoniac et au CO₂, ses éditions « machines et régulations » (le glissement, le compresseur à vis, le sous-refroidisseur, les centrales frigorifiques et leur régulation, la centrale booster CO₂, le bi-étagé), les onze films de la régulation, les dix mini-films sécurité « Ça aurait pu mal finir », l’effet de serre et la couche d’ozone. Chaque film mène à son cours.",
    niveaux: "tous niveaux",
    etat: "",
    catalogue: [],
    chiffres: "33 films",
    points: 4,
    vignette: "voyage/videos/chapitre-00-mon-voyage.jpg",
    entree: { titre: "Voyage dans tous ses états", href: "voyage/index.html" },
    raccourcis: [
      { titre: "Les éditions du Voyage", href: "studio/index.html#t-editions" },
      { titre: "La régulation en films", href: "studio/index.html#t-regules" },
      { titre: "Ça aurait pu mal finir", href: "studio/index.html#t-securite" },
      { titre: "Effet de serre et ozone", href: "studio/index.html#t-climat" }
    ]
  }
];
/* RESEAUX FIN */
