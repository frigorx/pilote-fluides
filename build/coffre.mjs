/* =====================================================================
   coffre.mjs — chiffre les documents de travail pour le portail public
   ---------------------------------------------------------------------
   USAGE :  node build/coffre.mjs <code-d-acces>
   Le code n'est JAMAIS écrit dans le dépôt : il se passe en argument,
   à chaque fabrication. Sans lui, le script refuse de tourner.

   CE QUE ÇA FAIT
   Chaque document sensible devient un fichier `docs/coffre/<id>.enc` :
   du binaire illisible, déchiffré dans le navigateur par qui connaît le
   code. Un index en clair (`index.json`) porte les titres, pour afficher
   la liste avec des cadenas sans rien révéler du contenu.

   LE CHIFFREMENT, HONNÊTEMENT
   AES-256-GCM (authentifié : un fichier modifié est rejeté, pas déchiffré
   de travers), clé dérivée par PBKDF2-SHA256, 600 000 itérations, sel
   aléatoire de 16 octets, IV distinct par document.
   C'est l'état de l'art côté algorithme. La limite n'est pas là : elle est
   dans la longueur du code. Un code de 8 chiffres = 100 millions de
   combinaisons ; les 600 000 itérations rendent chaque essai coûteux, mais
   du matériel dédié en vient à bout. Une PHRASE de passe (quatre mots)
   déplacerait cette limite hors d'atteinte — c'est le seul changement qui
   ferait du coffre un vrai coffre.
   Et une vérité qui ne se contourne pas : un fichier chiffré publié est
   cloné et archivé par des tiers. Changer le code plus tard ne referme
   pas les copies déjà prises.

   CE QUI N'ENTRE JAMAIS ICI — même chiffré :
     · les 85 questions officielles  (`evaluation/data/questions-habilitation.json`)
     · les 10 sujets d'examen         (`evaluation/data/examen-*.json`)
     · le registre nominatif          (`registre/donnees/`)
   Motif : le code d'accès est distribué aux stagiaires par construction.
   Il ne peut donc pas protéger d'eux ce qu'ils ne doivent pas voir. Ces
   trois-là restent hors ligne, dépôt privé. Voir ARCHITECTURE-DISPOSITIF § 2.
   ===================================================================== */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync } from "node:fs";
import { randomBytes, pbkdf2Sync, createCipheriv } from "node:crypto";
import { dirname, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PRIVE = "C:/git/habilitation-fluide";
const SORTIE = resolve(RACINE, "docs/coffre");
const ITERATIONS = 600000;

const code = process.argv[2];
if (!code || code.length < 4) {
  console.error("✗ usage : node build/coffre.mjs <code-d-acces>");
  console.error("  (le code n'est pas stocké dans le dépôt — il se donne à chaque build)");
  process.exit(1);
}

/* --------------------------------------------------------------------
   LES DOCUMENTS DU COFFRE
   `si_absent: "ignorer"` — le dépôt privé n'existe que sur le poste de
   F. Henninot ; ailleurs le build doit rester possible.
   -------------------------------------------------------------------- */
const DOCUMENTS = [
  // — Dossier de direction — (`binaire: true` → téléchargement après
  //   déchiffrement, au lieu d'un affichage : ce sont des fichiers Office)
  { id: "projet-centre", cat: "Dossier de direction", titre: "Projet d'ouverture d'un centre d'habilitation", desc: "Le dossier présenté à la direction : contexte réglementaire, périmètre, organisation, investissement, modèle économique, risques, calendrier, décisions demandées.", src: "C:/Users/henni/Downloads/files/Projet_Centre_Habilitation_Fluide_LPP-JR.docx", binaire: true, fichier: "Projet_Centre_Habilitation_Fluide_LPP-JR.docx" },
  { id: "budget-centre", cat: "Dossier de direction", titre: "Budget prévisionnel sur 5 ans", desc: "Le modèle paramétrable : hypothèses, lignes d'activité, économie d'une session, plan de financement, compte de résultat, seuil de rentabilité et sensibilité.", src: "C:/Users/henni/Downloads/files/Budget_previsionnel_Centre_Fluides_LPP-JR.xlsx", binaire: true, fichier: "Budget_previsionnel_Centre_Fluides_LPP-JR.xlsx" },

  // — Architecture et ingénierie —
  { id: "architecture", cat: "Architecture et ingénierie", titre: "Architecture du dispositif", desc: "Le plan d'ensemble : les trois temps, la frontière public/privé, qui porte quoi.", src: PRIVE + "/ARCHITECTURE-DISPOSITIF.md" },
  { id: "note-examen", cat: "Architecture et ingénierie", titre: "Note d'architecture — évaluation officielle", desc: "Ce qu'exige l'arrêté pour la partie examen, l'écart avec l'existant, l'architecture retenue.", src: PRIVE + "/NOTE-EXAMEN-OFFICIEL.md" },
  { id: "conformite", cat: "Architecture et ingénierie", titre: "Contrôle de conformité", desc: "Point par point de l'annexe III, ce qui est tenu et ce qui manque.", src: PRIVE + "/CONFORMITE-DISPOSITIF.md" },
  { id: "etat-dossier", cat: "Architecture et ingénierie", titre: "État du dossier d'agrément", desc: "Les marqueurs à compléter avant dépôt.", src: PRIVE + "/ETAT-DOSSIER-AGREMENT.md" },
  { id: "plan-manipulation", cat: "Architecture et ingénierie", titre: "Plan — brique manipulation fluidique", desc: "En réserve : la reprise de l'outil EP3. Plan écrit, non démarré.", src: PRIVE + "/PLAN-BRIQUE-MANIPULATION.md" },
  { id: "reprise-dispositif", cat: "Architecture et ingénierie", titre: "Reprise du dispositif (privé)", desc: "Point d'entrée du chantier d'évaluation. ⚠ partiellement périmé.", src: PRIVE + "/REPRISE.md" },
  { id: "sources", cat: "Architecture et ingénierie", titre: "Sources et références", desc: "Les textes et documents sur lesquels le dispositif s'appuie.", src: PRIVE + "/SOURCES.md" },

  // — Doctrine réglementaire —
  { id: "bible", cat: "Doctrine réglementaire", titre: "Bible F-Gas III", desc: "Transcription de l'arrêté du 21 novembre 2025, 23 sections. La référence opposable.", src: PRIVE + "/BIBLE-F-GAS-III.md" },

  // — Système qualité —
  { id: "enr-11", cat: "Système qualité", titre: "ENR-11 — liste de la documentation à jour", desc: "L'enregistrement exigé par l'annexe III.A point 8. La première pièce qu'un auditeur échantillonne.", src: PRIVE + "/procedures/README.md" },
  { id: "pr-01", cat: "Système qualité", titre: "PR-01 — impartialité formateur/évaluateur", desc: "Point 3 de l'annexe III.A.", src: PRIVE + "/procedures/PR-01-impartialite-formateur-evaluateur.md" },
  { id: "pr-02", cat: "Système qualité", titre: "PR-02 — procédure d'évaluation", desc: "Point 4. Porte le barème pondéré et le seuil de réussite.", src: PRIVE + "/procedures/PR-02-procedure-evaluation.md" },
  { id: "pr-03", cat: "Système qualité", titre: "PR-03 — délivrance, suspension, retrait", desc: "Point 5.", src: PRIVE + "/procedures/PR-03-delivrance-suspension-retrait.md" },
  { id: "pr-04", cat: "Système qualité", titre: "PR-04 — plaintes et réclamations", desc: "Point 8, premier bloc.", src: PRIVE + "/procedures/PR-04-plaintes-reclamations.md" },
  { id: "pr-05", cat: "Système qualité", titre: "PR-05 — gestion documentaire", desc: "Point 8, second bloc.", src: PRIVE + "/procedures/PR-05-gestion-documentaire.md" },
  { id: "pr-06", cat: "Système qualité", titre: "PR-06 — traçabilité et archivage", desc: "Point 7 : le cœur du logiciel. Registre des sessions, conservation 5 ans.", src: PRIVE + "/procedures/PR-06-tracabilite-archivage.md" },
];

/* Les 14 chapitres de cours, ajoutés en bloc (contenu pédagogique source —
   vérifié sans QCM corrigé, donc sans risque pour les examens blancs). */
const DOSSIER_COURS = PRIVE + "/cours";
if (existsSync(DOSSIER_COURS)) {
  for (const f of readdirSync(DOSSIER_COURS).filter((n) => n.endsWith(".md")).sort()) {
    const nom = basename(f, ".md");
    DOCUMENTS.push({
      id: "cours-" + nom.toLowerCase().replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, ""),
      cat: "Cours source (14 chapitres)",
      titre: nom.replace(/^CONTENU-/, "").replace(/-/g, " "),
      desc: "Chapitre source de la formation théorique.",
      src: DOSSIER_COURS + "/" + f,
    });
  }
}

/* --- garde-fou : rien d'interdit ne doit se glisser dans la liste --- */
const INTERDIT = /questions-habilitation|examen-\d|registre[\/\\]donnees/i;
for (const d of DOCUMENTS) {
  if (INTERDIT.test(d.src)) {
    console.error("✗ REFUS : « " + d.src + " » relève des sujets officiels ou des données nominatives.");
    console.error("  Ces documents ne sont pas publiables, même chiffrés (le code est distribué aux stagiaires).");
    process.exit(1);
  }
}

/* --- chiffrement --- */
const sel = randomBytes(16);
const cle = pbkdf2Sync(code, sel, ITERATIONS, 32, "sha256");

if (existsSync(SORTIE)) rmSync(SORTIE, { recursive: true, force: true });
mkdirSync(SORTIE, { recursive: true });

const index = [];
let absents = 0;
let octets = 0;

for (const d of DOCUMENTS) {
  if (!existsSync(d.src)) { absents++; continue; }
  // Un .docx ou .xlsx est un zip : il se lit en binaire, jamais en texte
  // (une relecture en UTF-8 le corromprait).
  const clair = d.binaire ? readFileSync(d.src) : Buffer.from(readFileSync(d.src, "utf8"), "utf8");
  const iv = randomBytes(12);
  const chiffreur = createCipheriv("aes-256-gcm", cle, iv);
  const corps = Buffer.concat([chiffreur.update(clair), chiffreur.final()]);
  const tag = chiffreur.getAuthTag();
  // format du fichier : IV (12) + tag d'authentification (16) + données
  const paquet = Buffer.concat([iv, tag, corps]);
  writeFileSync(resolve(SORTIE, d.id + ".enc"), paquet);
  octets += paquet.length;
  const entree = { id: d.id, cat: d.cat, titre: d.titre, desc: d.desc, taille: clair.length };
  if (d.binaire) { entree.binaire = true; entree.fichier = d.fichier; }
  index.push(entree);
}

writeFileSync(
  resolve(SORTIE, "index.json"),
  JSON.stringify({ sel: sel.toString("base64"), iterations: ITERATIONS, documents: index }, null, 1) + "\n"
);

console.log("✓ coffre écrit → docs/coffre/ (" + index.length + " documents, " + Math.round(octets / 1024) + " Ko)");
const parCat = {};
for (const d of index) parCat[d.cat] = (parCat[d.cat] || 0) + 1;
for (const [c, n] of Object.entries(parCat)) console.log("    " + c + " : " + n);
if (absents) console.log("  ▪ " + absents + " document(s) absent(s) — dépôt privé non monté sur ce poste");
console.log("  AES-256-GCM · PBKDF2-SHA256 " + ITERATIONS.toLocaleString("fr-FR") + " itérations · sel de 16 octets");
