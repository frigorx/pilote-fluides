/* ============================================================
   inerWeb HoCourant — le programme
   Paliers d'habilitabilité, filières, modules, ancrage référentiel.

   VOCABULAIRE (non négociable) : l'application mesure une
   HABILITABILITÉ — l'aptitude théorique à être habilité. Elle ne
   délivre jamais un titre : l'avis appartient au formateur après
   l'évaluation pratique, le titre à l'employeur (C. trav. R4544-10).
   ============================================================ */

/* `sigle` = la cible telle qu'un enseignant l'accorde dans un code de
   mission (voir restitution.js, tableau CIBLES — même ordre). */
const PALIERS = [
  {
    id: "P0",
    sigle: "S0",
    nom: "Socle — comprendre le risque",
    symboles: "avant tout symbole",
    resume: "Le danger électrique, l'analyse avant d'agir, la prévention, les domaines de tension, les effets du courant sur le corps.",
    modules: ["M1", "M2", "M3", "M4", "M5"],
  },
  {
    id: "P1",
    sigle: "B0",
    nom: "B0 · H0 · H0V — opérations d'ordre non électrique",
    symboles: "B0 / H0 / H0V",
    resume: "L'habilitation et ses symboles, les zones et distances, le rôle B0, la conduite en cas d'accident.",
    modules: ["M6", "M7", "M8", "M12"],
  },
  {
    id: "P2",
    sigle: "BS",
    nom: "BS · BE Manœuvre — intervenir simplement, manœuvrer",
    symboles: "BS / BE Manœuvre",
    resume: "Mettre un circuit en sécurité, les documents, l'intervention élémentaire BS, la manœuvre BE.",
    modules: ["M9", "M10"],
  },
  {
    id: "P3",
    sigle: "B1V",
    nom: "B1V — exécuter des travaux électriques",
    symboles: "B1 / B1V",
    resume: "L'exécutant de travaux électriques sous la direction d'un chargé de travaux, le voisinage renforcé.",
    modules: ["M11"],
  },
  {
    id: "P4",
    sigle: "BR",
    nom: "BR — le chargé d'intervention générale",
    symboles: "BR",
    resume: "L'intervention générale BT de faible étendue : dépannage, mesures, remplacement, essais.",
    modules: ["M13"],
  },
];

/* Les trois filières. Une même banque, un bornage différent.
   Les codes sont ceux des référentiels officiels — libellés exacts. */
const FILIERES = [
  {
    id: "tne",
    nom: "2nde TNE",
    long: "Seconde famille de métiers des Transitions Numérique et Énergétique",
    palierCible: "P1",
    objectif: "Préparer l'habilitation B0 : reconnaître le risque, respecter les limites, tenir son rôle d'ordre non électrique.",
    codes: [
      { code: "CC21", libelle: "Organiser son poste de travail en assurant la sécurité de tous les intervenants" },
      { code: "CC22", libelle: "Identifier les EPC et les EPI adaptés à l'intervention" },
    ],
    noteReferentiel: "Le référentiel de 2nde TNE n'exige pas d'habilitation : il la prépare. Les sous-compétences CC21 et CC22 portent la sécurité du poste et le choix des protections.",
  },
  {
    id: "ifca",
    nom: "CAP IFCA",
    long: "CAP Installateur en Froid et Conditionnement d'Air",
    palierCible: "P3",
    objectif: "Être habilitable B1V — c'est l'objectif écrit du référentiel (savoir S6.2).",
    codes: [
      { code: "S6.2", libelle: "Risque électrique : être habilitable B1V" },
      { code: "T8", libelle: "Sécuriser son intervention sur site" },
      { code: "T12", libelle: "Respecter les consignes de sécurité et protéger la zone de travail" },
      { code: "T10", libelle: "Repérer, raccorder, assembler les réseaux fluidiques, aérauliques et électriques" },
      { code: "T13", libelle: "Tirer au vide, charger et contrôler l'installation sous tension" },
    ],
    noteReferentiel: "Le savoir S6.2 du CAP IFCA fixe l'objectif : « risque électrique : être habilitable B1V ». Les tâches T8 et T12 portent la sécurisation, T10 et T13 les gestes concernés.",
  },
  {
    id: "mfer",
    nom: "Bac Pro MFER",
    long: "Bac Pro Métiers du Froid et des Énergies Renouvelables",
    palierCible: "P4",
    objectif: "Viser B1V puis BR : le référentiel cite les habilitations B0/H0, B1V et BR (savoir S7).",
    codes: [
      { code: "S7", libelle: "Qualité – Sécurité : santé et sécurité au travail, habilitations et certifications (B1V, BR)" },
      { code: "C4", libelle: "Organiser et sécuriser son intervention" },
      { code: "C7", libelle: "Mettre en service une installation" },
      { code: "C8", libelle: "Contrôler, régler et paramétrer l'installation" },
    ],
    noteReferentiel: "Le savoir S7 du Bac Pro MFER cite les habilitations B1V et BR. La compétence C4 porte l'organisation et la sécurisation de l'intervention.",
  },
];

/* Les modules. `themes` reprend les familles de l'INRS ED 6127 ;
   « zones » et « limites » sont les thèmes critiques : ensemble ils
   représentent au moins 30 % de chaque test de palier. */
const MODULES = [
  { id: "M1",  palier: "P0", nom: "Le danger électrique",                theme: "danger",       duree: 8 },
  { id: "M2",  palier: "P0", nom: "Observer et analyser avant d'agir",   theme: "analyse",      duree: 7 },
  { id: "M3",  palier: "P0", nom: "Choisir les mesures de prévention",   theme: "prevention",   duree: 9 },
  { id: "M4",  palier: "P0", nom: "Les domaines de tension",             theme: "limites",      duree: 7 },
  { id: "M5",  palier: "P0", nom: "Le courant et le corps humain",       theme: "danger",       duree: 8 },
  { id: "M6",  palier: "P1", nom: "L'habilitation et ses symboles",      theme: "limites",      duree: 9 },
  { id: "M7",  palier: "P1", nom: "Zones, distances et acteurs",         theme: "zones",        duree: 9 },
  { id: "M8",  palier: "P1", nom: "Le parcours B0, H0 et H0V",           theme: "limites",      duree: 8 },
  { id: "M9",  palier: "P2", nom: "Mettre en sécurité : la consignation", theme: "consignation", duree: 10 },
  { id: "M10", palier: "P2", nom: "BS et BE Manœuvre",                   theme: "limites",      duree: 9 },
  { id: "M11", palier: "P3", nom: "B1, B1V : exécuter des travaux",      theme: "limites",      duree: 9 },
  { id: "M12", palier: "P1", nom: "Incident, accident, incendie",        theme: "secours",      duree: 8 },
  { id: "M13", palier: "P4", nom: "BR : l'intervention générale",        theme: "limites",      duree: 9 },
];

/* Règles du test de palier — repères publics INRS ED 6127 :
   au moins 15 questions, 70 % de bonnes réponses, et les thèmes
   critiques (zones/distances, limites du symbole) représentant
   chacun une part significative du tirage. */
const REGLES_TEST = {
  nbQuestions: 15,
  seuilReussite: 0.7,
  partThemesCritiques: 0.3,      // zones + limites ≥ 30 % du tirage
  partRappelSpirale: 0.25,       // ~1 question sur 4 vient des paliers précédents
  themesCritiques: ["zones", "limites"],
};

const NOMS_THEMES = {
  danger: "Le danger électrique",
  analyse: "Analyser avant d'agir",
  prevention: "Prévention, EPC et EPI",
  limites: "Symboles et limites",
  zones: "Zones et distances",
  consignation: "Consignation et documents",
  secours: "Incident et secours",
};
