/* =====================================================================
   convert.mjs — Banque de questions : Mission F-GAZ  →  format pack Pilote
   ---------------------------------------------------------------------
   Source : FGAZ-COMPLETE-V6.html (bloc <script id="questionsData">),
            application PUBLIQUE de F. Henninot (frigorx/inerweb-fgaz).
            558 questions, dont on ne retient qu'une SÉLECTION CURÉE.

   ⚠️ La banque officielle des 85 questions d'examen et les 10 examens
      blancs du dépôt privé `habilitation-fluide` NE SONT PAS utilisés :
      publier un sujet d'épreuve est irréversible. Cf. § 2.1 du prompt.

   Sortie : packs/fluides/banque.gen.json
   Usage  : node build/convert.mjs [chemin/vers/FGAZ-COMPLETE-V6.html]
   ===================================================================== */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = resolve(ICI, "..");
/* Par homedir(), jamais un nom de compte en dur : ce script est publié
   avec le dépôt (durcissement du 20/08). */
const SOURCE_DEFAUT = resolve(
  homedir(), "OneDrive/Bureau/inerWeb/F-GAZ/FGAZ-COMPLETE-V6.html");

/* ---------------------------------------------------------------------
   1. SÉLECTION — quelles questions, et sous quel groupe du référentiel
   ---------------------------------------------------------------------
   Chaque entrée : id Mission F-GAZ → groupe (dc) de l'arrêté du 21/11/2025.
   Sélection curée à la main : on écarte tout ce qui repose sur un seuil
   réglementaire chiffré susceptible d'avoir bougé avec F-Gas III
   (délais de réparation, seuils de contrôle, dates d'interdiction) et
   tout le chapitre ch12 (lot généré, distracteurs non sérieux).
   --------------------------------------------------------------------- */
const SELECTION = {
  // G1 — Législation & thermodynamique élémentaire (dont familles et
  // nomenclature des fluides, codes 1.06/1.07 → fiche g1c)
  G1: ["151", "160", "62", "v6_042", "v6_041", "v6_048", "v6_145",
       "153", "154", "157", "158", "v6_141", "v6_142", "v6_146",
       "v6_040", "v6_045", "v6_046", "v6_143",
       "31", "33", "34", "36", "41", "45", "51", "v6_031", "v6_132", "v6_137"],
  // G2 — Incidence environnementale & réglementations (dont l'histoire
  // effet de serre / ozone / protocoles, code 2.01 → fiche g2a)
  G2: ["v6_001", "5", "v6_003", "v6_004", "v6_113", "v6_011", "v6_017",
       "v6_002", "v6_005", "v6_008", "v6_010", "v6_106", "v6_107",
       "v6_110", "v6_111", "v6_114", "v6_115", "v6_037", "42"],
  // G3 — Contrôles avant mise en service / après réparation
  G3: ["v6_058", "v6_059", "v6_062", "v6_159", "66"],
  // G4 — Contrôles d'étanchéité (cœur de la catégorie E)
  G4: ["v6_074", "v6_072", "v6_163", "v6_069", "v6_168", "104", "114", "68",
       "v6_174", "107", "180", "110"],
  // G5 — Gestion écologique & récupération (cœur de la catégorie D)
  G5: ["v6_063", "v6_156", "v6_060", "v6_064", "v6_082", "v6_083", "v6_176",
       "135", "v6_175", "141", "175", "176", "179", "v6_161", "v6_170",
       "v6_079", "v6_081", "128", "133", "143", "147", "v6_177",
       "v6_158", "130", "146"],
  // G6 — Compresseurs (dont le circuit d'huile, central pour le code 6.05)
  G6: ["152", "231", "233", "247", "240", "186", "174", "234", "235",
       "v6_054", "v6_150", "173", "177", "190", "241", "243", "245",
       "246", "248", "249", "251", "252", "v6_152", "v6_153"],
  // G7 — Condenseurs
  G7: ["159", "164", "163", "182", "169", "170", "v6_057", "71"],
  // G8 — Évaporateurs
  G8: ["v6_039", "181", "183", "184", "178", "v6_043", "166", "167",
       "171", "70"],
  // G9 — Détendeurs & organes annexes
  G9: ["v6_049", "v6_055", "v6_149", "187", "188", "v6_050", "v6_051",
       "v6_052", "v6_155", "172", "168", "161", "162", "v6_053",
       "v6_151", "v6_154", "189"],
  // G10 — Tuyauterie, brasage
  G10: ["v6_061", "v6_065", "87", "84", "v6_157", "69"],
  // G11 — Substitution & efficacité énergétique
  G11: ["v6_033", "v6_140", "54", "v6_030", "v6_035", "v6_092", "185",
        "v6_047", "v6_147", "v6_183"],
  // G12 — Hydrocarbures (spécifique A1/A2)
  G12: ["v6_091", "v6_181", "v6_093", "v6_184", "291", "286", "289"],
  // G13 — CO₂ / NH₃ : information et sensibilisation
  G13: ["v6_088", "v6_089", "v6_185", "v6_090", "v6_094", "v6_182",
        "283", "v6_180", "302"],
};

/* ---------------------------------------------------------------------
   1 bis. NIVEAUX
   ---------------------------------------------------------------------
   niveau 1 (défaut) : fondamentaux — définitions, rôles, gestes de base.
   niveau 2 : approfondissement — diagnostics, mises en situation, calculs,
   subtilités (isentropique/isenthalpe, glissement, huile en froid négatif).
   Le moteur filtre les examens par `examen.niveau` ; une question sans
   niveau entre dans tous les tirages.
   --------------------------------------------------------------------- */
const NIVEAU2 = new Set([
  // existantes
  "v6_113", "v6_059", "68", "v6_165", "164", "170", "183", "184", "178",
  "186", "187", "188", "v6_043", "v6_140", "286", "289", "291",
  "v6_088", "v6_089", "v6_060",
  // repêchées
  "v6_040", "v6_045", "v6_046", "v6_143", "166", "167", "171", "168",
  "189", "190", "173", "177", "241", "243", "245", "246", "248", "249",
  "251", "252", "v6_152", "v6_153", "v6_158", "130", "146",
  "v6_147", "v6_183", "v6_180", "302",
  // nomenclature et histoire (niveau 2 = compositions précises, subtilités)
  "34", "36", "51", "v6_031", "v6_008", "v6_107", "v6_111", "v6_115", "v6_037",
]);

/* ---------------------------------------------------------------------
   1 ter. RATTACHEMENT AU RÉFÉRENTIEL — un code de compétence par question
   ---------------------------------------------------------------------
   Le groupe (`dc`) est un RANGEMENT PÉDAGOGIQUE : le voyant liquide
   s'apprend avec les composants du circuit. Le code est le rattachement
   RÉGLEMENTAIRE : ce même voyant est évalué au titre du code 1.05
   (« repères transparents et indicateurs d'humidité »). Les deux ne
   coïncident pas toujours — la marque « ← G1 » en fin de ligne signale
   les questions dont le code sort de leur groupe de rangement.

   Sans ce rattachement, le bilan de fin d'examen ne savait dire que
   « revoyez la fiche G4 » ; il peut désormais nommer la compétence.

   HORS_REFERENTIEL : les questions qu'aucun code de l'annexe II.B ne
   couvre honnêtement. On ne les force pas — un faux rattachement ferait
   croire à une couverture qui n'existe pas. Elles restent dans la banque,
   le savoir étant utile au métier, mais sont comptées à part.
   --------------------------------------------------------------------- */
const CODES = {
  // G1 — 20 question(s)
  "62": "1.01", // Connaître les unités normalisées ISO pour la température, la pression, l…
  "160": "1.02", "v6_048": "1.02", "v6_145": "1.02", "157": "1.02", "158": "1.02", "34": "1.02", // Comprendre la théorie élémentaire des systèmes de réfrigération : thermo…
  "v6_042": "1.03", "v6_041": "1.03", "v6_046": "1.03", "v6_143": "1.03", // Utiliser les tableaux et graphiques correspondants et les interpréter da…
  "151": "1.04", "153": "1.04", "154": "1.04", "v6_141": "1.04", "v6_142": "1.04", "v6_146": "1.04", "v6_040": "1.04", "v6_045": "1.04", // Décrire la fonction des principales composantes du système (compresseur,…
  "45": "1.07", // Connaître les caractéristiques des hydrocarbures, du CO2, et du NH3 et d…
  // G2 — 19 question(s)
  "5": "2.01", "v6_003": "2.01", "v6_002": "2.01", "v6_005": "2.01", "v6_008": "2.01", "v6_010": "2.01", "v6_106": "2.01", "v6_107": "2.01", "v6_110": "2.01", "v6_114": "2.01", "v6_037": "2.01", // Avoir une connaissance élémentaire de la politique de l'UE et internatio…
  "v6_001": "2.02", "v6_004": "2.02", "v6_113": "2.02", "v6_011": "2.02", "v6_017": "2.02", "v6_111": "2.02", "v6_115": "2.02", "42": "2.02", // Avoir une connaissance élémentaire du concept de « potentiel de réchauff…
  // G3 — 5 question(s)
  "66": "1.02", // Comprendre la théorie élémentaire des systèmes de réfrigération : thermo…  ← G1
  "v6_062": "3.01", // Effectuer une épreuve de pression pour contrôler la résistance du systèm…
  "v6_159": "3.03", // Utiliser une pompe à vide
  "v6_058": "3.04", "v6_059": "3.04", // Faire le vide dans le système pour évacuer l'air et l'humidité selon la …
  // G4 — 12 question(s)
  "v6_174": "1.00", "107": "1.00", // Connaissance élémentaire de la législation de l'Union européenne et nati…  ← G1
  "104": "4.03", "114": "4.03", "110": "4.03", // Effectuer un contrôle visuel et manuel de tout le système au sens du règ…
  "v6_074": "4.04", // Effectuer un contrôle de l'étanchéité du système au moyen d'une méthode …
  "68": "4.06", "180": "4.06", // Contrôler l'étanchéité du système au moyen d'une des méthodes directes v…
  "v6_072": "4.07", // Contrôler l'étanchéité du système au moyen d'une des méthodes directes n…
  "v6_163": "4.08", "v6_069": "4.08", "v6_168": "4.08", // Utiliser un dispositif électronique de détection des fuites
  // G5 — 25 question(s)
  "175": "5.01", "176": "5.01", // Connecter et déconnecter les jauges et lignes en produisant le minimum d…
  "v6_063": "5.02", // Vider et remplir un cylindre de réfrigérant à l'état liquide et à l'état…
  "141": "5.03", "179": "5.03", // Utiliser un dispositif de récupération des réfrigérants et connecter et …
  "135": "5.04", // Vider l'huile contaminée par le réfrigérant d'un système
  "v6_060": "5.05", "v6_161": "5.05", "v6_158": "5.05", // Déterminer l'état (liquide, gazeux) et les conditions (sous-refroidi, sa…
  "v6_064": "5.06", // Choisir le bon type de balance et l'utiliser pour peser le réfrigérant
  "v6_170": "5.07", "v6_079": "5.07", // Consigner dans le registre de l'équipement toutes les informations perti…
  "v6_156": "5.08", "v6_082": "5.08", "v6_083": "5.08", "v6_176": "5.08", "v6_175": "5.08", "v6_081": "5.08", "128": "5.08", "133": "5.08", "143": "5.08", "147": "5.08", "v6_177": "5.08", "130": "5.08", "146": "5.08", // Connaître les prescriptions et les procédures de gestion, de réutilisati…
  // G6 — 24 question(s)
  "152": "6.01", "231": "6.01", "233": "6.01", "247": "6.01", "177": "6.01", "249": "6.01", "252": "6.01", "v6_152": "6.01", "v6_153": "6.01", // Expliquer le principe de fonctionnement d'un compresseur (y compris le r…
  "174": "6.05", "234": "6.05", "235": "6.05", "v6_054": "6.05", "241": "6.05", "243": "6.05", "245": "6.05", "246": "6.05", // Vérifier le circuit de retour de l'huile
  "186": "6.06", "v6_150": "6.06", "173": "6.06", "190": "6.06", // Mettre en marche et arrêter un compresseur et en vérifier le bon fonctio…
  "240": "6.07", "248": "6.07", "251": "6.07", // Rédiger un rapport sur l'état du compresseur en indiquant tout problème …
  // G7 — 8 question(s)
  "170": "4.05", // Utiliser des instruments de mesure portables tels que des manomètres, de…  ← G4
  "159": "7.01", "163": "7.01", "169": "7.01", // Expliquer le principe de fonctionnement d'un condenseur et les risques d…
  "v6_057": "7.04", // Régler les interrupteurs de sécurité et de contrôle
  "182": "7.07", "71": "7.07", // Mettre en marche et arrêter un condenseur et en vérifier le bon fonction…
  "164": "7.08", // Inspecter la surface du condenseur
  // G8 — 10 question(s)
  "171": "4.05", // Utiliser des instruments de mesure portables tels que des manomètres, de…  ← G4
  "v6_039": "8.01", "v6_043": "8.01", // Expliquer le principe de fonctionnement d'un évaporateur (y compris le s…
  "181": "8.08", "183": "8.08", "184": "8.08", "166": "8.08", "167": "8.08", "70": "8.08", // Mettre en marche et arrêter un évaporateur et en vérifier le bon fonctio…
  "178": "8.09", // Inspecter la surface de l'évaporateur
  // G9 — 17 question(s)
  "v6_052": "1.05", "v6_155": "1.05", "168": "1.05", "162": "1.05", "v6_053": "1.05", "v6_154": "1.05", // Connaître le fonctionnement élémentaire des composantes suivantes utilis…  ← G1
  "v6_049": "9.01", "v6_055": "9.01", "v6_149": "9.01", "187": "9.01", "188": "9.01", "189": "9.01", // Expliquer le principe de fonctionnement de différents types de vannes d'…
  "v6_050": "9.08", "v6_051": "9.08", "172": "9.08", "161": "9.08", "v6_151": "9.08", // Vérifier l'état d'un filtre sécheur
  // G10 — 3 question(s)
  "v6_061": "10.01", "v6_065": "10.01", "69": "10.01", // Soudage, brasage fort et/ou brasage tendre des joints étanches sur des t…
  // G11 — 10 question(s)
  "v6_047": "1.02", "v6_147": "1.02", // Comprendre la théorie élémentaire des systèmes de réfrigération : thermo…  ← G1
  "v6_030": "11.01", "v6_035": "11.01", // Connaître les technologies de substitution pertinentes permettant de rem…
  "185": "11.02", // Connaître les systèmes de conception pertinents afin de réduire la charg…
  "v6_033": "11.03", "v6_140": "11.03", "54": "11.03", "v6_092": "11.03", "v6_183": "11.03", // Connaître les réglementations et les normes de sécurité applicables pour…
  // G12 — 7 question(s)
  "v6_181": "1.07", // Connaître les caractéristiques des hydrocarbures, du CO2, et du NH3 et d…  ← G1
  "289": "1.08", // Connaître la combustibilité, la propagation des flammes, les restriction…  ← G1
  "v6_093": "12.02", "v6_184": "12.02", // Connaître les prescriptions en matière de sécurité pour les outils d'ent…
  "v6_091": "12.03", // Calculer la charge de réfrigérant inflammable dans un système conforméme…
  "286": "12.04", // Réaliser une analyse des risques avant le début du travail et éliminer o…
  "291": "12.06", // Récupérer les réfrigérants inflammables du système en toute sécurité et …
  // G13 — 6 question(s)
  "v6_088": "1.09", "v6_089": "1.09", "v6_180": "1.09", // Connaître la pression du CO2, le cycle transcritique ou subcritique, le …  ← G1
  "283": "13.14", "302": "13.14", // Vérifier que les mesures de santé et de sécurité conformes aux règles ap…
  "v6_185": "2.02", // Avoir une connaissance élémentaire du concept de « potentiel de réchauff…  ← G2
};

/* Le MOTIF est la valeur, et non un simple `true` : c'est lui qui part dans
   la banque, puis dans la matrice de traçabilité (MATRICE-COMPETENCES.md).
   Une question mise à part sans raison écrite est une question qu'on ne sait
   plus défendre six mois après — les questions-pack.json portaient déjà leur
   motif, les questions Mission F-GAZ le gardaient en commentaire. */
const M_NOMENCLATURE =
  "nomenclature des fluides : savoir-outil indispensable, mais non listé comme compétence à l'annexe II.B";
const M_AMMONIAC =
  "relève du groupe 14 (ammoniac), hors des catégories A1/A2/D/E de ce pack";

const HORS_REFERENTIEL = {
  "31": M_NOMENCLATURE, "33": M_NOMENCLATURE, "36": M_NOMENCLATURE, "41": M_NOMENCLATURE,
  "51": M_NOMENCLATURE, "v6_031": M_NOMENCLATURE, "v6_132": M_NOMENCLATURE, "v6_137": M_NOMENCLATURE,
  "87": "cintrage : geste métier ; le groupe 10 ne couvre que le brasage (10.01) et les supports (10.02)",
  "84": "dudgeonnage : raccord mécanique, hors du groupe 10 (brasage, supports)",
  "v6_157": "raccordement sur vanne Schrader : geste métier non listé à l'annexe II.B",
  "v6_090": M_AMMONIAC, "v6_094": M_AMMONIAC, "v6_182": M_AMMONIAC,
};

/* ---------------------------------------------------------------------
   2. CORRECTIONS ÉDITORIALES
   ---------------------------------------------------------------------
   a) plages alignées sur les seules valeurs autorisées par la charte
      FrigorX (surchauffe 5-10 K, sous-refroidissement 4-8 K) ;
   b) réécriture des énoncés « télégraphiques » du lot 271-310, qui
      passent mal en séance devant un groupe.
   --------------------------------------------------------------------- */
const CORRECTIONS = {
  v6_048: { choix: ["0 à 2 K", "5 à 10 K", "15 à 20 K", "30 K"] },
  v6_145: { choix: ["0 à 1 K", "4 à 8 K", "15 à 20 K", "25 à 30 K"] },

  291: {
    enonce:
      "Vous devez braser sur un circuit au R-32 (A2L). Quelles précautions prenez-vous avant d'allumer le chalumeau ?",
    choix: [
      "Aucune, le R-32 est peu inflammable",
      "Récupérer le fluide, inerter à l'azote, ventiler, supprimer toute source d'ignition",
      "Ouvrir une fenêtre et braser rapidement",
      "Braser directement, le circuit est fermé",
    ],
    explication:
      "Un fluide A2L reste inflammable : on récupère, on inerte à l'azote et on supprime toute source d'ignition avant la flamme.",
  },
  286: {
    enonce:
      "Pourquoi ne doit-on jamais approcher une flamme d'un circuit contenant un fluide A2L ou A3 non inerté ?",
    choix: [
      "Parce qu'il est interdit de fumer sur un chantier",
      "Parce que le fluide peut s'enflammer et se décomposer en gaz toxiques",
      "Parce que la fumée salit l'installation",
      "Parce que l'odeur est désagréable",
    ],
    explication:
      "Double risque : inflammation du fluide, et décomposition thermique produisant des gaz toxiques (dont acide fluorhydrique).",
  },
  289: {
    enonce:
      "Quelle est la différence entre un fluide A2L (R-32) et un fluide A3 (R-290) ?",
    choix: [
      "Aucune, les deux classes sont équivalentes",
      "A3 est hautement inflammable (propagation rapide) ; A2L l'est faiblement (propagation lente)",
      "A2L est toxique, A3 ne l'est pas",
      "A3 produit plus de froid",
    ],
    explication:
      "Le R-290 est A3 : très inflammable. Le R-32 est A2L : faiblement inflammable, vitesse de flamme ≤ 10 cm/s. Piège classique.",
  },

  283: {
    enonce:
      "Pourquoi installe-t-on des détecteurs de CO₂ dans les locaux abritant une installation au R-744 ?",
    choix: [
      "Pour mesurer la performance de l'installation",
      "Parce que le CO₂ est inodore et incolore : sans appareil, une fuite est indétectable et le risque est l'asphyxie",
      "Parce que la réglementation impose un détecteur pour tous les fluides",
      "Pour compter les ouvertures de porte",
    ],
    explication:
      "Le CO₂ ne se voit pas et ne se sent pas : en cas de fuite dans un local fermé, il remplace l'air sans prévenir. Seul un détecteur alerte avant l'asphyxie.",
  },
  302: {
    enonce:
      "Pourquoi les portes des locaux techniques CO₂ doivent-elles s'ouvrir vers l'extérieur ?",
    choix: [
      "Pour gagner de la place dans le local",
      "Pour faciliter l'évacuation d'urgence : une porte qui s'ouvre vers l'intérieur peut se bloquer en cas de surpression ou de panique",
      "Pour des raisons esthétiques",
      "Pour empêcher les intrusions",
    ],
    explication:
      "En cas de fuite massive, on doit pouvoir sortir en poussant la porte, même en panique et même si la pression du local a monté. Le sens d'ouverture est un choix de sécurité.",
  },
};

/* --------------------------------------------------------------------- */

/* Une explication s'affiche sous la question, en séance, sur une seule
   respiration : on vise ≤ 200 caractères. La source mélange de vrais
   sauts de ligne et des « \n » littéraux — on normalise les deux. */
/* ---------------------------------------------------------------------
   1 ter. REMÉDIATION — chaque groupe renvoie vers sa fiche du pack.
   Une question ratée en révision ou en examen blanc propose « Revoir la
   fiche » ; le bilan de fin de série liste les fiches des groupes ratés.
   --------------------------------------------------------------------- */
const REMEDIATION = {
  G1: "g1a", G2: "g2", G3: "g3", G4: "g4b", G5: "g5a", G6: "g6",
  G7: "g7", G8: "g8", G9: "g9", G10: "g10", G11: "g11", G12: "g12",
  G13: "g13",
};

// renvois plus fins que le groupe : nomenclature → g1c, histoire → g2a
const REMEDIATION_FINE = {
  "31": "g1c", "33": "g1c", "34": "g1c", "36": "g1c", "41": "g1c",
  "45": "g1c", "51": "g1c", "v6_031": "g1c", "v6_132": "g1c", "v6_137": "g1c",
  "v6_002": "g2a", "v6_005": "g2a", "v6_008": "g2a", "v6_010": "g2a",
  "v6_106": "g2a", "v6_107": "g2a", "v6_110": "g2a", "v6_111": "g2a",
  "v6_114": "g2a", "v6_115": "g2a", "v6_037": "g2a",
  "5": "g2a", "v6_003": "g2a", "v6_004": "g2a",
};

/* ---------------------------------------------------------------------
   1 ter bis. CHAPITRES — chaque groupe a UN chapitre de cours, aligné sur
   la banque d'examen (qui porte déjà chapitre / chapitre_titre /
   chapitre_fichier). L'entraînement converge vers cette structure — c'est
   la banque d'examen qui est le modèle, jamais l'inverse. Les questions
   hors_ref (Sécurité) n'ont pas de chapitre : hors nomenclature.
   --------------------------------------------------------------------- */
const CHAPITRES = {
  G1:  { chapitre: "01", titre: "Législation & thermodynamique élémentaire", fichier: "CONTENU-01-G1-legislation-thermo.md" },
  G2:  { chapitre: "02", titre: "Incidence environnementale & réglementations", fichier: "CONTENU-02-G2-environnement.md" },
  G3:  { chapitre: "03", titre: "Contrôles avant mise en service, après réparation ou en fonctionnement", fichier: "CONTENU-03-G3-controles-mes.md" },
  G4:  { chapitre: "04", titre: "Contrôles d'étanchéité", fichier: "CONTENU-04-G4-etancheite.md" },
  G5:  { chapitre: "05", titre: "Gestion écologique du système et récupération du fluide", fichier: "CONTENU-05-G5-recuperation.md" },
  G6:  { chapitre: "06", titre: "Composant : compresseurs", fichier: "CONTENU-06-G6-compresseurs.md" },
  G7:  { chapitre: "07", titre: "Composant : condenseurs à air et à eau", fichier: "CONTENU-07-G7-condenseurs.md" },
  G8:  { chapitre: "08", titre: "Composant : évaporateurs à air et à liquide", fichier: "CONTENU-08-G8-evaporateurs.md" },
  G9:  { chapitre: "09", titre: "Composant : détendeurs et autres organes", fichier: "CONTENU-09-G9-detendeurs.md" },
  G10: { chapitre: "10", titre: "Tuyauterie : monter un réseau étanche (soudage / brasage)", fichier: "CONTENU-10-G10-tuyauterie-brasage.md" },
  G11: { chapitre: "11", titre: "Technologies de substitution et efficacité énergétique", fichier: "CONTENU-11-G11-substitution-efficacite.md" },
  G12: { chapitre: "12", titre: "Spécifique A1/A2 : hydrocarbures (fluides inflammables)", fichier: "CONTENU-12-G12-hydrocarbures.md" },
  G13: { chapitre: "13", titre: "CO₂ / R-744 : information et sensibilisation aux risques", fichier: "CONTENU-13-G13-co2-information-risques.md" },
  G14: { chapitre: "14", titre: "NH3 / R-717 : information et sensibilisation aux risques", fichier: "CONTENU-14-G14-nh3-information-risques.md" },
};

/* ---------------------------------------------------------------------
   1 quater. LA FEUILLE D'AIDE ET LA REMÉDIATION COMPLÈTE
   ---------------------------------------------------------------------
   Mission F-GAZ porte, pour chaque question, un indice (`aide`) et une
   remédiation complète — structurée Règle/Pourquoi/Exemple/Piège sur une
   partie du fonds, en paragraphe pédagogique sur le reste. C'est le cœur
   de l'auto-formation : on la conserve EN ENTIER (l'`explication` courte
   ne sert plus que de résumé et de secours).
   --------------------------------------------------------------------- */
function structurer(remediation) {
  if (!remediation) return null;
  const lignes = String(remediation)
    .replace(/\\n/g, "\n")
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  if (!lignes.length) return null;

  const prendre = (prefixe) => {
    const l = lignes.find((x) => x.startsWith(prefixe));
    if (!l) return undefined;
    // la source double parfois le préfixe (« Exemple : Exemple : … »)
    return l.slice(prefixe.length).replace(/^\s*(Exemple|Piège classique|Piège)\s*:\s*/, "").trim() || undefined;
  };

  const remed = {
    regle: prendre("Règle :"),
    pourquoi: prendre("Pourquoi :"),
    exemple: prendre("Exemple :"),
    piege: prendre("Piège :"),
  };
  if (remed.regle || remed.pourquoi || remed.exemple || remed.piege) {
    // une partie du fonds porte un gabarit générique sans contenu
    // (« Retenez la notion-clé demandée… ») : aucune valeur, on le jette
    if (remed.regle && /^Retenez la notion-clé/.test(remed.regle)) return null;
    Object.keys(remed).forEach((k) => remed[k] === undefined && delete remed[k]);
    return remed;
  }

  // pas de structure : paragraphe complet, sans la ligne « ✅ Réponse : X »
  // (redondante avec le feedback du moteur) sauf si elle est seule
  const sansReponse = lignes.filter((l) => !/^✅\s*Réponse\s*:/.test(l));
  const texte = (sansReponse.length ? sansReponse : lignes.map((l) => l.replace(/^✅\s*Réponse\s*:\s*/, ""))).join(" ");
  return texte ? { texte } : null;
}

const LIMITE_EXPLICATION = 200;

function couperNet(txt, limite) {
  if (txt.length <= limite) return txt;
  const tronque = txt.slice(0, limite);
  const fin = Math.max(tronque.lastIndexOf(". "), tronque.lastIndexOf(" ; "));
  return (fin > limite * 0.5 ? tronque.slice(0, fin + 1) : tronque.replace(/\s+\S*$/, "") + "…").trim();
}

function condenser(remediation) {
  if (!remediation) return "";
  const lignes = String(remediation)
    .replace(/\\n/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const prendre = (prefixe) => {
    const l = lignes.find((x) => x.startsWith(prefixe));
    if (!l) return "";
    // « Exemple : Exemple : … » et « Piège : Piège classique : … » dans la source
    return l.slice(prefixe.length).replace(/^\s*(Exemple|Piège classique)\s*:\s*/, "").trim();
  };
  const reponse = lignes[0].replace(/^✅\s*Réponse\s*:\s*/, "");
  let txt = prendre("Règle :") || prendre("Pourquoi :") || reponse;
  // certaines remédiations n'ont qu'une ligne de réponse sèche (« Le CO₂ ») :
  // on lui adjoint la ligne suivante, sinon l'explication n'explique rien.
  if (txt.length < 45) {
    const suite = lignes.slice(1).find((l) => !/^(Exemple|Piège)\s*:/.test(l) && l !== txt);
    if (suite) txt = (txt.replace(/[.\s]*$/, "") + " — " + suite.replace(/^(Règle|Pourquoi)\s*:\s*/, "")).trim();
  }
  txt = couperNet(txt, LIMITE_EXPLICATION);
  const piege = prendre("Piège :");
  if (piege && txt.length + piege.length < LIMITE_EXPLICATION + 60) txt += " ⚠ " + piege;
  return txt;
}

function main() {
  const source = process.argv[2] || SOURCE_DEFAUT;
  const html = readFileSync(source, "utf8");
  const bloc = html.match(
    /<script id="questionsData" type="application\/json">([\s\S]*?)<\/script>/
  );
  if (!bloc) {
    console.error("✗ bloc questionsData introuvable dans " + source);
    process.exit(1);
  }
  const brut = JSON.parse(bloc[1]);
  const index = new Map(brut.questions.map((q) => [String(q.id), q]));

  const banque = [];
  const manquants = [];
  let corrigees = 0;

  for (const [dc, ids] of Object.entries(SELECTION)) {
    for (const id of ids) {
      const q = index.get(id);
      if (!q) {
        manquants.push(id);
        continue;
      }
      const fix = CORRECTIONS[id] || {};
      if (CORRECTIONS[id]) corrigees++;
      const choix = fix.choix || q.propositions;
      if (!Array.isArray(choix) || choix.length < 2) {
        manquants.push(id + " (propositions absentes)");
        continue;
      }
      banque.push({
        id: "q-" + dc.toLowerCase() + "-" + id,
        dc,
        niveau: NIVEAU2.has(id) ? 2 : 1,
        type: choix.length === 2 ? "vf" : "qcm",
        enonce: fix.enonce || q.question,
        choix,
        bonne: q.reponse,
        explication: fix.explication || condenser(q.remediation),
        aide: (q.aide || "").replace(/\s+/g, " ").trim() || undefined,
        remed: fix.explication ? undefined : structurer(q.remediation) || undefined,
        remediation_vers: REMEDIATION_FINE[id] || REMEDIATION[dc],
        code: CODES[id],
        hors_ref: HORS_REFERENTIEL[id] || undefined,
        chapitre: CHAPITRES[dc]?.chapitre,
        chapitre_titre: CHAPITRES[dc]?.titre,
        chapitre_fichier: CHAPITRES[dc]?.fichier,
      });
    }
  }

  /* -------------------------------------------------------------------
     QUESTIONS ÉCRITES POUR LE PACK
     -------------------------------------------------------------------
     Mission F-GAZ n'interrogeait pas les compétences ajoutées au pack :
     cinq fiches se retrouvaient sans une seule question sur leurs codes,
     et le mini-questionnaire de leur séquence aurait été vide.
     Ces questions sont ORIGINALES — elles ne viennent ni de la banque
     officielle des 85, ni des examens blancs du dépôt privé, qui ne
     sortent jamais (cf. § décisions du REPRISE).
     ------------------------------------------------------------------- */
  const QUESTIONS_PACK = JSON.parse(
    readFileSync(resolve(RACINE, "packs/fluides/questions-pack.json"), "utf8")
  );
  for (const q of QUESTIONS_PACK) {
    banque.push({
      ...q,
      // le moteur n'affiche `explication` que faute de remédiation structurée ;
      // on la dérive de la règle pour satisfaire le contrôle ci-dessous.
      explication: q.explication || (q.remed && q.remed.regle) || "",
      origine: "pack",
      chapitre: CHAPITRES[q.dc]?.chapitre,
      chapitre_titre: CHAPITRES[q.dc]?.titre,
      chapitre_fichier: CHAPITRES[q.dc]?.fichier,
    });
  }

  /* -------------------------------------------------------------------
     CORRECTIONS DE DISTRACTEURS  (chantier du 06/08/2026)
     -------------------------------------------------------------------
     Mesuré sur la banque : la bonne réponse était la proposition la PLUS
     LONGUE dans 195 questions sur 266. Un élève qui coche la plus longue
     sans rien lire décrochait 14/20. Les distracteurs étaient trop courts
     et trop faibles (« Pour des raisons esthétiques ») : on les réécrit en
     erreurs réelles d'élève, de longueur comparable.

     Ces réécritures vivent dans un FICHIER DE DONNÉES, pas dans le code :
     packs/fluides/corrections-distracteurs.json, indexé par l'id FINAL de
     la banque (q-g6-249, pk-s5-2), les deux origines confondues. Elles
     s'appliquent en dernier, après CORRECTIONS.

     ⚠ Une correction ne DÉPLACE JAMAIS la bonne réponse : son index vient
     de la source Mission F-GAZ (bonne: q.reponse), pas d'ici. Réordonner
     désignerait un distracteur comme bonne réponse sans erreur visible —
     d'où les refus ci-dessous, et le contrôle côté Hub (mesure-banque).
     ------------------------------------------------------------------- */
  const erreurs = [];
  const cheminDistracteurs = resolve(RACINE, "packs/fluides/corrections-distracteurs.json");
  let distracteurs = 0;
  if (existsSync(cheminDistracteurs)) {
    const fichier = JSON.parse(readFileSync(cheminDistracteurs, "utf8"));
    const parId = new Map(banque.map((q) => [q.id, q]));
    for (const [id, c] of Object.entries(fichier.questions || {})) {
      const q = parId.get(id);
      if (!q) {
        erreurs.push("correction de distracteurs : question " + id + " absente de la banque");
        continue;
      }
      if (!Array.isArray(c.choix) || c.choix.length !== q.choix.length) {
        erreurs.push(id + " : " + (c.choix || []).length + " propositions corrigées contre " + q.choix.length);
        continue;
      }
      if (c.bonne !== q.bonne) {
        erreurs.push(id + " : index de bonne réponse déclaré " + c.bonne + ", la banque dit " + q.bonne);
        continue;
      }
      if (String(q.choix[q.bonne]).trim() !== String(c.choix[c.bonne]).trim() && !c.bonneReecrite) {
        erreurs.push(id + " : la bonne réponse change sans « bonneReecrite » — décalage d'index probable");
        continue;
      }
      if (new Set(c.choix.map((x) => String(x).trim().toLowerCase())).size !== c.choix.length) {
        erreurs.push(id + " : deux propositions identiques");
        continue;
      }
      q.choix = c.choix;
      if (c.enonce) q.enonce = c.enonce;
      if (c.explication) q.explication = c.explication;
      if (c.aide) q.aide = c.aide;
      if (c.remed) q.remed = c.remed;
      distracteurs++;
    }
  }

  /* -------------------------------------------------------------------
     ILLUSTRATIONS ET RESSOURCES DE REMÉDIATION  (chantier du 13/08/2026)
     -------------------------------------------------------------------
     Posées question par question dans l'atelier de relecture du Hub
     (inerweb-habilitation, inc. 33 : « 100 % partout, je contrôle
     après »), elles arrivent par un FICHIER DE DONNÉES :
     packs/fluides/illustrations-questions.json, écrit par
     appliquer-illustrations.mjs côté Hub. Chemins relatifs à
     packs/fluides/res/ (le base_img du pack). Le moteur affiche
     l'illustration avec la question, et les ressources typées dans la
     remédiation (réponse fausse → aide → remédiation → chapitre).
     ------------------------------------------------------------------- */
  const cheminIllustrations = resolve(RACINE, "packs/fluides/illustrations-questions.json");
  let illustrees = 0;
  if (existsSync(cheminIllustrations)) {
    const fichier = JSON.parse(readFileSync(cheminIllustrations, "utf8"));
    const parId = new Map(banque.map((q) => [q.id, q]));
    const res = resolve(RACINE, "packs/fluides/res");
    for (const [id, i] of Object.entries(fichier.questions || {})) {
      const q = parId.get(id);
      if (!q) {
        erreurs.push("illustrations : question " + id + " absente de la banque");
        continue;
      }
      if (i.illustration) {
        if (!existsSync(resolve(res, i.illustration)))
          erreurs.push(id + " : fichier d'illustration absent : " + i.illustration);
        q.illustration = i.illustration;
        if (i.pose_niveau) q.pose_niveau = i.pose_niveau;
        illustrees++;
      }
      if (Array.isArray(i.ressources) && i.ressources.length) {
        for (const r of i.ressources)
          if (r.chemin && !existsSync(resolve(res, r.chemin)))
            erreurs.push(id + " : ressource absente : " + r.chemin);
        q.ressources = i.ressources;
      }
    }
  }

  /* --- contrôles --- */
  const vus = new Set();
  for (const q of banque) {
    if (vus.has(q.id)) erreurs.push("identifiant de question en double : " + q.id);
    vus.add(q.id);
  }
  for (const q of banque) {
    if (!Number.isInteger(q.bonne) || q.bonne < 0 || q.bonne >= q.choix.length)
      erreurs.push(q.id + " : index de bonne réponse hors plage");
    if (!q.enonce || !q.explication) erreurs.push(q.id + " : énoncé ou explication vide");
    if (q.choix.some((c) => !c || !String(c).trim())) erreurs.push(q.id + " : proposition vide");
  }
  for (const ids of Object.values(SELECTION))
    for (const id of ids)
      if (!CODES[id] && !HORS_REFERENTIEL[id])
        erreurs.push("question " + id + " : ni code de compétence, ni classement hors référentiel");
  if (manquants.length) erreurs.push("ids introuvables : " + manquants.join(", "));
  if (erreurs.length) {
    console.error("✗ " + erreurs.length + " anomalie(s) :");
    erreurs.forEach((e) => console.error("   " + e));
    process.exit(1);
  }

  const sortie = resolve(RACINE, "packs/fluides/banque.gen.json");
  writeFileSync(sortie, JSON.stringify(banque, null, 1) + "\n", "utf8");

  const parGroupe = banque.reduce((a, q) => ((a[q.dc] = (a[q.dc] || 0) + 1), a), {});
  console.log("✓ " + banque.length + " questions écrites → packs/fluides/banque.gen.json");
  console.log("  répartition : " + JSON.stringify(parGroupe));
  console.log("  corrections éditoriales appliquées : " + corrigees);
  console.log("  distracteurs réécrits (corrections-distracteurs.json) : " + distracteurs);
  console.log("  questions illustrées (illustrations-questions.json) : " + illustrees);
}

main();
