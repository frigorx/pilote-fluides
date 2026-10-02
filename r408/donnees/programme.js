/* ============================================================
   inerWeb R408 — le programme
   Paliers, filières, modules, ancrage référentiel (R408 + CAP).

   VOCABULAIRE (non négociable) : l'application mesure une
   PRÉPARATION à la formation « échafaudages de pied » (recommandation
   R408). Elle ne délivre rien : l'attestation appartient à l'organisme
   qui forme et évalue, l'autorisation d'utiliser, de vérifier ou de
   monter appartient à l'employeur (Code du travail, R4323-69 et s.).
   Jamais le mot « habilitation » ici : il appartient à l'électricité.

   Source des domaines et des codes : document de référence INRS
   « Échafaudages de pied R408 », V07, janvier 2023 — copie structurée
   dans donnees/referentiel-r408.json (lecture seule).
   ============================================================ */

/* `sigle` = la cible telle qu'un enseignant l'accorde dans un code de
   mission (voir restitution.js, tableau CIBLES — même ordre). */
const PALIERS = [
  {
    id: "P0",
    sigle: "S0",
    nom: "Socle — ne pas tomber",
    symboles: "avant tout échafaudage",
    resume: "Le risque de chute, les acteurs et leurs responsabilités, l'ordre des protections, signaler et réagir.",
    domaine: "DC1",
    modules: ["M1", "M2", "M3", "M4"],
  },
  {
    id: "P1",
    sigle: "UT",
    nom: "Utiliser un échafaudage de pied",
    symboles: "utilisateur",
    resume: "Reconnaître les familles d'échafaudages, lire la notice et l'étiquette, monter dessus et y travailler sans se mettre en danger.",
    domaine: "DC4",
    modules: ["M5", "M6", "M7"],
  },
  {
    id: "P2",
    sigle: "VJ",
    nom: "Vérifier chaque jour",
    symboles: "utilisateur et vérificateur journalier",
    resume: "Le cadre des vérifications et qui en répond, puis l'examen quotidien de l'état de conservation avant de monter.",
    domaine: "DC3",
    modules: ["M8", "M9"],
  },
  {
    id: "P3",
    sigle: "MO",
    nom: "Monter et démonter",
    symboles: "monteur – utilisateur",
    resume: "Préparer le montage (sol, appuis, implantation, amarrages), puis monter et démonter une structure simple selon la notice.",
    domaine: "DC2",
    modules: ["M10", "M11"],
  },
];

/* Au-delà du CAP : nommé, jamais enseigné ici. */
const HORS_CIBLE = {
  domaine: "DC5",
  nom: "Vérificateur interne",
  resume: "Examens d'adéquation, de montage et d'installation, vérifications trimestrielles : le vérificateur interne de l'entreprise, formation F2 de la R408.",
};

/* Les deux filières. Une même banque, un bornage différent.
   Les codes CAP sont ceux des référentiels officiels — libellés exacts,
   lus dans les annexes des arrêtés (CAP MPI : arrêté du 15 avril 2019 ·
   CAP Étancheur : arrêté du 29 août 2022), voir
   docs/REFERENTIELS-MPI-ETANCHEUR.md. Trois listes : `taches` (RAP),
   `codes` (compétences), `savoirs` (savoirs associés) — toutes trois
   s'affichent à l'écran et dans le livret (règle : codes des tâches ET
   des savoirs explicites). Seuls les savoirs qui touchent la prévention
   et le travail en hauteur sont retenus. */
const FILIERES = [
  {
    id: "mpi",
    nom: "CAP MPI",
    long: "CAP Métiers du Plâtre et de l'Isolation",
    palierCible: "P3",
    formationR408: "F1",
    profilR408: "monteur – utilisateur (et vérificateur journalier)",
    objectif: "Monter, démonter et utiliser des échafaudages de pied : c'est la compétence C3.13 du référentiel, évaluée en EP3 (coefficient 2).",
    taches: [
      { code: "T17", libelle: "Monter et utiliser un échafaudage de pied et roulant" },
    ],
    codes: [
      { code: "C3.13", libelle: "Monter, démonter et utiliser des échafaudages" },
      { code: "C3.2",  libelle: "Sécuriser son intervention" },
      { code: "C1.2",  libelle: "Échanger, rendre compte oralement" },
    ],
    savoirs: [
      { code: "S7.1",  libelle: "Les acteurs de la prévention des risques" },
      { code: "S7.2",  libelle: "Les documents de la prévention des risques" },
      { code: "S7.3",  libelle: "L'identification des dangers, l'analyse des risques, les mesures de prévention" },
      { code: "S7.4",  libelle: "Les mesures de prévention adaptées au métier" },
      { code: "S7.6",  libelle: "L'application des principes de sécurité physique et d'économie d'effort adaptés au métier" },
      { code: "S7.7",  libelle: "Le champ d'intervention du sauveteur secouriste du travail" },
      { code: "S12.2", libelle: "Moyens d'accès et plateformes de travail" },
    ],
    noteReferentiel: "La tâche T17 et la compétence C3.13 du CAP MPI (EP3, UP3, coefficient 2) visent le montage, le démontage et l'utilisation : le parcours va jusqu'au palier P3. La R408 appelle ce profil « monteur – utilisateur » (formation F1, domaines DC1 à DC4). Le référentiel cite aussi l'échafaudage roulant (T17, S7.4), qui relève de la R457.",
  },
  {
    id: "etancheur",
    nom: "CAP Étancheur",
    long: "CAP Étancheur du Bâtiment et des Travaux Publics",
    palierCible: "P2",
    formationR408: "F4",
    profilR408: "utilisateur et vérificateur journalier",
    objectif: "Utiliser des échafaudages de pied en sécurité et les vérifier chaque jour avant de monter : compétence C3.4, évaluée en EP3 (coefficient 2). L'attestation R408 est exigée à l'inscription à l'examen (arrêté du 29 août 2022, article 6). Elle est délivrée à l'issue de la formation par un formateur habilité, celui de l'établissement ou celui d'un organisme extérieur : votre professeur vous dira lequel.",
    taches: [
      { code: "T7",  libelle: "Mettre en oeuvre les premières mesures de protection provisoires des personnes et des biens" },
      { code: "T18", libelle: "Poser les éléments de sécurité permanents" },
    ],
    codes: [
      { code: "C3.4",  libelle: "Utiliser des échafaudages" },
      { code: "C3.2",  libelle: "Sécuriser son intervention" },
      { code: "C3.14", libelle: "Poser des éléments de sécurité permanents" },
      { code: "C1.2",  libelle: "Échanger et rendre compte oralement" },
    ],
    savoirs: [
      { code: "S7.1", libelle: "Les acteurs de la prévention des risques" },
      { code: "S7.2", libelle: "Les documents de la prévention des risques" },
      { code: "S7.3", libelle: "L'identification des dangers, l'analyse des risques, les mesures de prévention" },
      { code: "S7.4", libelle: "Les mesures de prévention adaptées au métier" },
      { code: "S7.5", libelle: "L'application des principes de sécurité physique et d'économie d'effort adaptés au métier" },
      { code: "S7.6", libelle: "Le champ d'intervention du sauveteur secouriste du travail" },
      { code: "S7.9", libelle: "Les risques liés au travail en hauteur" },
    ],
    noteReferentiel: "La compétence C3.4 du CAP Étancheur (EP3, UP3, coefficient 2) renvoie explicitement à la R408 (annexe 5) et à la R457 ; le savoir S7.9 cite R408, R457, R430 et R431. Le parcours va jusqu'au palier P2, vérification journalière incluse (formation F4 de la R408, domaines DC1, DC3, DC4). Le montage reste ouvert « pour aller plus loin ».",
  },
];

/* Compétence positionnée à chaque évaluation (fin de leçon dans le livret, test global),
   par palier et par filière. null = palier hors du parcours de la filière.
   Échelle 0-4 de F. Henninot : 0 non évalué · 1 non acquis · 2 en cours · 3 acquis · 4 parfaitement maîtrisé. */
const COMPETENCES_EVALUEES = {
  P0: { mpi: "C3.2",  etancheur: "C3.2" },
  P1: { mpi: "C3.13", etancheur: "C3.4" },
  P2: { mpi: "C3.13", etancheur: "C3.4" },
  P3: { mpi: "C3.13", etancheur: null },
};

/* Les modules. `codesR408` renvoie aux compétences du document de
   référence ; « utilisation », « verification » et « montage » sont les
   thèmes critiques : ensemble ils représentent au moins 30 % de chaque
   test de palier. `duree` en minutes de lecture, à l'écran. */
const MODULES = [
  { id: "M1",  palier: "P0", nom: "Le risque de chute : de quoi parle-t-on",           theme: "danger",        codesR408: ["DC1.a"],               duree: 7 },
  { id: "M2",  palier: "P0", nom: "Qui fait quoi : acteurs et responsabilités",         theme: "acteurs",       codesR408: ["DC1.b", "DC1.f"],      duree: 7 },
  { id: "M3",  palier: "P0", nom: "Les protections, dans l'ordre",                      theme: "prevention",    codesR408: ["DC1.e"],               duree: 8 },
  { id: "M4",  palier: "P0", nom: "Signaler, rendre compte, réagir",                    theme: "secours",       codesR408: ["DC1.c", "DC1.d"],      duree: 7 },
  { id: "M5",  palier: "P1", nom: "Les échafaudages : familles et domaines d'emploi",   theme: "types",         codesR408: ["4.1"],                 duree: 8 },
  { id: "M6",  palier: "P1", nom: "La notice du fabricant et l'étiquette",              theme: "notice",        codesR408: ["2.2", "3.2", "4.2"],   duree: 8 },
  { id: "M7",  palier: "P1", nom: "Utiliser un échafaudage en sécurité",                theme: "utilisation",   codesR408: ["4.2"],                 duree: 10 },
  { id: "M8",  palier: "P2", nom: "Les vérifications : qui, quand, sur quel fondement", theme: "reglementaire", codesR408: ["3.3"],                 duree: 8 },
  { id: "M9",  palier: "P2", nom: "La vérification journalière : l'état de conservation", theme: "verification", codesR408: ["3.4"],               duree: 10 },
  { id: "M10", palier: "P3", nom: "Préparer le montage",                                theme: "montage",       codesR408: ["2.3"],                 duree: 8 },
  { id: "M11", palier: "P3", nom: "Monter et démonter une structure simple",            theme: "montage",       codesR408: ["2.4"],                 duree: 10 },
];

/* Règles du test de palier — mêmes repères que HoCourant (contrat lu
   par app.js : ne pas renommer les clés). */
const REGLES_TEST = {
  nbQuestions: 15,
  seuilReussite: 0.7,
  partThemesCritiques: 0.3,      // utilisation + verification + montage ≥ 30 % du tirage
  partRappelSpirale: 0.25,       // ~1 question sur 4 vient des paliers précédents
  themesCritiques: ["utilisation", "verification", "montage"],
};

const NOMS_THEMES = {
  danger: "Le risque de chute",
  acteurs: "Acteurs et responsabilités",
  prevention: "Prévention et protections",
  secours: "Signaler et réagir",
  types: "Familles d'échafaudages",
  notice: "Notice et étiquette",
  utilisation: "Utiliser en sécurité",
  reglementaire: "Cadre des vérifications",
  verification: "Vérification journalière",
  montage: "Montage et démontage",
};
