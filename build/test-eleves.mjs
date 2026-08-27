/* =====================================================================
   test-eleves.mjs — le filet des codes individuels et des bilans (AE-6)
   ---------------------------------------------------------------------
   USAGE :  node build/test-eleves.mjs

   Comme les autres filets du dépôt, celui-ci s'attache surtout à ce qui
   doit ÊTRE REFUSÉ. Un code d'élève qui accepterait n'importe quoi
   passerait tous les tests naïfs.

   Il éprouve aussi les deux qualités d'usage dont dépend tout le reste :
   les codes sont-ils DISTINCTS entre eux, et sont-ils LISIBLES quand on
   les dicte ou qu'on les recopie ?

   Zéro dépendance, comme le reste du dépôt.
   ===================================================================== */
import {
  tirerClesMillesime, tirerIdentifiant, identLisible,
  codeEleve, listeEleves, retrouverEleve, doublonsDe, fabriquerBilan, lireBilan,
  ALPHABET, TAILLE_CODE_ELEVE, ELEVES_MAX, MOTIFS,
} from "./lib-acces.mjs";

let passes = 0;
const echecs = [];

function verifier(intitule, condition, detail) {
  if (condition) { passes++; console.log("  ✓ " + intitule); }
  else { echecs.push(intitule + (detail ? ` — ${detail}` : "")); console.log("  ✗ " + intitule + (detail ? ` — ${detail}` : "")); }
}
function section(titre) { console.log("\n" + titre); }

const cles = tirerClesMillesime();
const K = cles.kEleve;
const seance = tirerIdentifiant();
const autreSeance = tirerIdentifiant();

console.log("Filet des codes individuels et des bilans — AE-6");

/* ====================================================================
   1. L'alphabet : un code se dicte et se recopie
   ==================================================================== */
section("1. L'alphabet ne trompe pas l'œil");

verifier("aucun caractère ambigu (O, 0, I, L, 1)", !/[O0IL1]/.test(ALPHABET));
verifier("l'alphabet n'a pas de doublon", new Set(ALPHABET).size === ALPHABET.length);
verifier("il ne contient que des majuscules et des chiffres", /^[A-Z2-9]+$/.test(ALPHABET));

/* ====================================================================
   2. Les codes d'élève
   ==================================================================== */
section("2. Les codes d'élève");

const liste = listeEleves(K, seance, 30);
verifier("une classe de 30 donne 30 codes", liste.length === 30);
verifier("ils font tous la longueur annoncée",
  liste.every((e) => e.code.length === TAILLE_CODE_ELEVE));
verifier("ils n'emploient que l'alphabet",
  liste.every((e) => [...e.code].every((c) => ALPHABET.includes(c))));

const distincts = new Set(liste.map((e) => e.code));
verifier("les 30 codes d'une classe sont tous différents", distincts.size === 30,
  `${distincts.size} codes distincts`);

/* Le vrai risque d'usage : deux élèves d'une MÊME séance qui tirent le
   même code. Sur 100 élèves et 30⁴ = 810 000 possibilités, une collision
   reste possible ; on mesure combien de séances sur mille en produisent
   une, pour savoir si le format tient. */
let seancesAvecCollision = 0;
for (let essai = 0; essai < 1000; essai++) {
  const id = tirerIdentifiant();
  const c = listeEleves(tirerClesMillesime().kEleve, id, 30).map((e) => e.code);
  if (new Set(c).size !== c.length) seancesAvecCollision++;
}
verifier("moins de 5 % des séances de 30 élèves ont deux codes identiques",
  seancesAvecCollision < 50, `${(seancesAvecCollision / 10).toFixed(1)} % sur 1000 séances`);
console.log(`    (mesuré : ${(seancesAvecCollision / 10).toFixed(1)} % — rare, mais pas jamais, d'où les deux gardes ci-dessous)`);

/* Le cas rare, éprouvé pour de bon : on force une collision en cherchant
   une séance qui en produit une, puis on vérifie les deux gardes. */
let seanceAmbigue = null, codeAmbigu = null;
for (let essai = 0; essai < 4000 && !seanceAmbigue; essai++) {
  const id = tirerIdentifiant();
  const l = listeEleves(K, id, ELEVES_MAX);
  const d = doublonsDe(l);
  if (d.length) { seanceAmbigue = id; codeAmbigu = d[0]; }
}
if (!seanceAmbigue) {
  verifier("une collision a pu être provoquée pour éprouver les gardes", false,
    "aucune trouvée en 4000 séances — le test ne prouve rien, à revoir");
} else {
  verifier("l'enseignant est prévenu quand sa liste contient un doublon",
    doublonsDe(listeEleves(K, seanceAmbigue, ELEVES_MAX)).length > 0);
  verifier("un code ambigu ne désigne PERSONNE plutôt que le premier venu",
    retrouverEleve(K, seanceAmbigue, codeAmbigu) === null,
    "il aurait fallu refuser, pas choisir");
}

/* ====================================================================
   3. Retrouver un élève — et refuser le reste
   ==================================================================== */
section("3. Retrouver l'élève, et refuser le reste");

verifier("le code de l'élève 7 désigne l'élève 7", retrouverEleve(K, seance, liste[6].code) === 7);
verifier("le code de l'élève 30 désigne l'élève 30", retrouverEleve(K, seance, liste[29].code) === 30);
verifier("les espaces et tirets sont pardonnés",
  retrouverEleve(K, seance, " " + liste[6].code.slice(0, 2) + "-" + liste[6].code.slice(2) + " ") === 7);
verifier("les minuscules sont pardonnées", retrouverEleve(K, seance, liste[6].code.toLowerCase()) === 7);

/* Un code inventé : il faut en prendre un qui n'appartient à PERSONNE dans
   cette séance, sinon le test se félicite de rien. On cherche le premier
   code de l'alphabet qui ne soit attribué à aucun des cent numéros. */
const attribues = new Set(listeEleves(K, seance, ELEVES_MAX).map((e) => e.code));
let invente = null;
for (const a of ALPHABET) {
  for (const b of ALPHABET) {
    const essai = a + b + a + b;
    if (!attribues.has(essai)) { invente = essai; break; }
  }
  if (invente) break;
}
verifier("un code qui n'est attribué à personne est refusé",
  invente !== null && retrouverEleve(K, seance, invente) === null, invente || "aucun code libre trouvé");
verifier("un code trop court est refusé", retrouverEleve(K, seance, "AB") === null);
verifier("un code trop long est refusé", retrouverEleve(K, seance, "ABCDEF") === null);
verifier("un code vide est refusé", retrouverEleve(K, seance, "") === null);
verifier("ce qui n'est pas une chaîne est refusé", retrouverEleve(K, seance, 1234) === null);

/* LA contre-épreuve : le code d'une autre séance ne doit pas ouvrir celle-ci.
   On la mesure sur 200 séances pour ne pas conclure d'un coup de chance. */
let fuites = 0;
for (let essai = 0; essai < 200; essai++) {
  const ailleurs = tirerIdentifiant();
  if (retrouverEleve(K, ailleurs, liste[6].code) === 7) fuites++;
}
verifier("le code de l'élève 7 ne désigne pas l'élève 7 d'une autre séance",
  fuites === 0, `${fuites} fuite(s) sur 200`);

verifier("la même séance avec une autre clé ne reconnaît pas le code",
  retrouverEleve(tirerClesMillesime().kEleve, seance, liste[6].code) !== 7);

/* Le garde-fou */
let horsBorne = false;
try { codeEleve(K, seance, ELEVES_MAX + 1); } catch { horsBorne = true; }
verifier(`au-delà de ${ELEVES_MAX} élèves, la fabrication refuse au lieu de déborder`, horsBorne);
let zero = false;
try { codeEleve(K, seance, 0); } catch { zero = true; }
verifier("l'élève numéro 0 n'existe pas", zero);
verifier("demander 500 codes en rend " + ELEVES_MAX, listeEleves(K, seance, 500).length === ELEVES_MAX);

/* ====================================================================
   4. Le bilan de restitution
   ==================================================================== */
section("4. Le bilan que l'élève recopie");

const bilan = fabriquerBilan(K, {
  identifiant: seance, numero: 7, jour: "2026-09-15",
  dureeMin: 42, vues: 20, justes: 16,
});
verifier("le bilan tient dans un message (moins de 60 caractères)",
  bilan.length < 60, `${bilan.length} caractères`);

const lu = lireBilan(bilan, K, seance);
verifier("il se relit", lu.ok, lu.motif);
verifier("il désigne son élève", lu.ok && lu.numero === 7);
verifier("il porte sa date", lu.ok && lu.jour === "2026-09-15");
verifier("il porte sa durée", lu.ok && lu.dureeMin === 42);
verifier("il porte son score", lu.ok && lu.vues === 20 && lu.justes === 16);
verifier("le pourcentage est calculé", lu.ok && lu.pourcent === 80);
verifier("il reste rattaché à sa séance", lu.ok && lu.identifiant.equals(seance));

section("5. Ce que le bilan refuse");

verifier("un bilan vide est refusé", lireBilan("", K, seance).motif === MOTIFS.ABSENT);
verifier("un bilan illisible est refusé",
  ["ILLISIBLE", "ABSENT", "VERSION_INCONNUE"].includes(lireBilan("pas!un!bilan", K, seance).motif));

/* Un caractère changé : le sceau doit tomber. On décale un octet du corps
   plutôt qu'un caractère de la chaîne, pour être sûr de toucher le contenu
   et pas seulement l'encodage. */
const abime = Buffer.from(bilan, "base64url");
abime[17] = abime[17] ^ 0xff; // le nombre de bonnes réponses
verifier("un score gonflé casse le sceau",
  lireBilan(abime.toString("base64url"), K, seance).motif === MOTIFS.SIGNATURE_INVALIDE);

const bilanAilleurs = fabriquerBilan(K, {
  identifiant: autreSeance, numero: 7, jour: "2026-09-15", dureeMin: 10, vues: 5, justes: 5,
});
verifier("un bilan d'une autre séance est refusé",
  lireBilan(bilanAilleurs, K, autreSeance).ok
  && lireBilan(bilanAilleurs, K, seance).motif === MOTIFS.AUTRE_SEANCE);

verifier("un bilan d'un autre produit (autre clé) est refusé",
  lireBilan(bilan, tirerClesMillesime().kEleve, seance).motif === MOTIFS.SIGNATURE_INVALIDE);

const rallonge = Buffer.concat([Buffer.from(bilan, "base64url"), Buffer.from([0])]);
verifier("un octet de trop est refusé",
  lireBilan(rallonge.toString("base64url"), K, seance).motif === MOTIFS.ILLISIBLE);

/* Défaut-refus sur les nombres : rien ne déborde en silence. */
const enorme = fabriquerBilan(K, {
  identifiant: seance, numero: 7, jour: "2026-09-15",
  dureeMin: 999999, vues: 999999, justes: -5,
});
const luEnorme = lireBilan(enorme, K, seance);
verifier("des nombres absurdes sont bornés, jamais repliés sur eux-mêmes",
  luEnorme.ok && luEnorme.dureeMin === 0xffff && luEnorme.vues === 0xffff && luEnorme.justes === 0,
  luEnorme.ok ? `durée ${luEnorme.dureeMin}, vues ${luEnorme.vues}, justes ${luEnorme.justes}` : luEnorme.motif);

/* --------------------------------------------------------------------
   Verdict
   -------------------------------------------------------------------- */
console.log("\n" + "─".repeat(64));
if (echecs.length === 0) {
  console.log(`✓ ${passes} contrôles, aucun échec.`);
  console.log(`  séance ${identLisible(seance)} · code d'élève : ${TAILLE_CODE_ELEVE} caractères · bilan : ${bilan.length} caractères`);
} else {
  console.log(`✗ ${echecs.length} échec(s) sur ${passes + echecs.length} :`);
  for (const e of echecs) console.log("   · " + e);
  process.exitCode = 1;
}
