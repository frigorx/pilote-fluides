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
    sousTitre: "Le cadre du métier : réglementation, sécurité, environnement. Deux lignes mères, onze sous-lignes.",
    niveaux: "BTS",
    etat: "en construction",
    catalogue: ["Législation"],
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
    etat: "en relecture",
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
    etat: "en relecture",
    catalogue: ["HoCourant"],
    vignette: "icones/reseaux/hocourant.svg",
    entree: { titre: "Le danger électrique", href: "hocourant/?module=M1" },
    raccourcis: [
      { titre: "Les domaines de tension", href: "hocourant/?module=M4" },
      { titre: "La consignation", href: "hocourant/?module=M9" }
    ]
  }
];
/* RESEAUX FIN */
