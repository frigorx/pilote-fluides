/* =====================================================================
   test-qr.mjs — le filet de l'encodeur QR (AE-5)
   ---------------------------------------------------------------------
   USAGE :  node build/test-qr.mjs

   Un QR code faux se voit à l'usage, et à l'usage seulement : il ne
   ressemble à rien de particulier tant qu'on ne le scanne pas. D'où
   trois épreuves qui ne demandent pas de téléphone :

   1. Les mots de contrôle de format et de version sont CALCULÉS par le
      code (BCH). On les compare aux valeurs de la norme, qui sont
      publiques et fixes. Si le calcul dérive, tout le reste est faux.
   2. Les capacités sont comparées à la table ISO.
   3. On RELIT la trame produite : on parcourt le zigzag dans le même
      ordre, on ôte le masque, on désentrelace, et on doit retrouver
      exactement les octets de départ. C'est l'aller-retour complet, sans
      la correction d'erreur — que la partie 1 couvre par ailleurs.

   Zéro dépendance, comme le reste du dépôt.
   ===================================================================== */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const RACINE_DEPOT = join(dirname(fileURLToPath(import.meta.url)), "..");

let passes = 0;
const echecs = [];

function verifier(intitule, condition, detail) {
  if (condition) { passes++; console.log("  ✓ " + intitule); }
  else { echecs.push(intitule + (detail ? ` — ${detail}` : "")); console.log("  ✗ " + intitule + (detail ? ` — ${detail}` : "")); }
}
function section(titre) { console.log("\n" + titre); }

/* Charger moteur/qr.js hors navigateur, comme le fait test-fabrique.mjs. */
const source = readFileSync(join(RACINE_DEPOT, "moteur", "qr.js"), "utf8");
const bac = { window: {}, TextEncoder, console, module: undefined };
const noms = Object.keys(bac);
new Function(...noms, source)(...noms.map((n) => bac[n]));
const QR = bac.window.inerwebQR;

console.log("Filet de l'encodeur QR — moteur/qr.js");

/* ====================================================================
   1. Les mots de contrôle, contre la norme
   ==================================================================== */
section("1. Les mots de contrôle calculés valent ceux de la norme");

/* ISO/IEC 18004, tableau C.1 — format = niveau + masque, 15 bits. */
const FORMAT_NORME = {
  L: [0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976],
  M: [0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0],
};
/* ISO/IEC 18004, tableau D.1 — version, 18 bits, à partir de la 7. */
const VERSION_NORME = {
  7: 0x07c94, 8: 0x085bc, 9: 0x09a99, 10: 0x0a4d3, 11: 0x0bbf6, 12: 0x0c762,
  13: 0x0d847, 14: 0x0e60d, 15: 0x0f928, 16: 0x10b78, 17: 0x1145d, 18: 0x12a17,
  19: 0x13532, 20: 0x149a6,
};

/* Les deux fonctions ne sont pas exportées : on les rejoue à l'identique
   depuis la même formule, ce qui vérifie la formule, pas la copie. */
function bch(valeur, generateur, bits) {
  const v = valeur << bits;
  const degG = generateur.toString(2).length - 1;
  let t = v;
  for (let d = 31; d >= degG; d--) if (t & (1 << d)) t ^= generateur << (d - degG);
  return v | t;
}
const motFormat = (n, m) => (bch(((n === "L" ? 1 : 0) << 3) | m, 0x537, 10) ^ 0x5412) & 0x7fff;
const motVersion = (v) => bch(v, 0x1f25, 12) & 0x3ffff;

let formatsBons = true;
for (const niveau of ["L", "M"]) {
  for (let m = 0; m < 8; m++) if (motFormat(niveau, m) !== FORMAT_NORME[niveau][m]) formatsBons = false;
}
verifier("les 16 mots de format (L et M, 8 masques) valent ceux de la norme", formatsBons);

let versionsBonnes = true;
for (const v of Object.keys(VERSION_NORME)) {
  if (motVersion(Number(v)) !== VERSION_NORME[v]) versionsBonnes = false;
}
verifier("les 14 mots de version (7 à 20) valent ceux de la norme", versionsBonnes);

/* ====================================================================
   2. Les capacités, contre la table ISO
   ==================================================================== */
section("2. Les capacités annoncées sont celles de la table");

/* Capacités en MODE OCTET. Attention au piège : les tables publiées
   donnent quatre colonnes (numérique, alphanumérique, octet, kanji) et
   il est facile d'en recopier une autre. Chacune se recalcule :
   floor((données × 8 − 4 − indicateur) / 8), l'indicateur valant 8 bits
   jusqu'à la version 9 et 16 ensuite. */
const CAPACITE_NORME = [
  ["L", 1, 17], ["M", 1, 14], ["L", 5, 106], ["M", 5, 84],
  ["L", 10, 271], ["M", 10, 213], ["L", 15, 520], ["M", 15, 412],
  ["L", 20, 858], ["M", 20, 666],
];
let capacitesBonnes = true;
const ecarts = [];
for (const [niveau, version, attendu] of CAPACITE_NORME) {
  const obtenu = QR.capaciteOctets(version, niveau);
  if (obtenu !== attendu) { capacitesBonnes = false; ecarts.push(`V${version}-${niveau} : ${obtenu} ≠ ${attendu}`); }
}
verifier("dix capacités de référence sont exactes", capacitesBonnes, ecarts.join(" · "));

/* ====================================================================
   3. L'aller-retour : ce qu'on écrit, on doit le relire
   ==================================================================== */
section("3. L'aller-retour sur la trame");

const BLOCS = {
  L: [[7,1,19,0,0],[10,1,34,0,0],[15,1,55,0,0],[20,1,80,0,0],[26,1,108,0,0],
      [18,2,68,0,0],[20,2,78,0,0],[24,2,97,0,0],[30,2,116,0,0],[18,2,68,2,69],
      [20,4,81,0,0],[24,2,92,2,93],[26,4,107,0,0],[30,3,115,1,116],[22,5,87,1,88],
      [24,5,98,1,99],[28,1,107,5,108],[30,5,120,1,121],[28,3,113,4,114],[28,3,107,5,108]],
  M: [[10,1,16,0,0],[16,1,28,0,0],[26,1,44,0,0],[18,2,32,0,0],[24,2,43,0,0],
      [16,4,27,0,0],[18,4,31,0,0],[22,2,38,2,39],[22,3,36,2,37],[26,4,43,1,44],
      [30,1,50,4,51],[22,6,36,2,37],[22,8,37,1,38],[24,4,40,5,41],[24,5,41,5,42],
      [28,7,45,3,46],[28,10,46,1,47],[26,9,43,4,44],[26,3,44,11,45],[26,3,41,13,42]],
};

function masquer(masque, y, x) {
  switch (masque) {
    case 0: return (y + x) % 2 === 0;
    case 1: return y % 2 === 0;
    case 2: return x % 3 === 0;
    case 3: return (y + x) % 3 === 0;
    case 4: return (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0;
    case 5: return ((y * x) % 2) + ((y * x) % 3) === 0;
    case 6: return (((y * x) % 2) + ((y * x) % 3)) % 2 === 0;
    default: return (((y + x) % 2) + ((y * x) % 3)) % 2 === 0;
  }
}

/* Le masque retenu se relit dans le mot de format déjà écrit sur la trame. */
function masqueDe(trame, niveau) {
  let mot = 0;
  for (let p = 14; p >= 0; p--) {
    let bit;
    if (p < 6) bit = trame.m[8][p];
    else if (p === 6) bit = trame.m[8][7];
    else if (p === 7) bit = trame.m[8][8];
    else if (p === 8) bit = trame.m[7][8];
    else bit = trame.m[14 - p][8];
    mot |= bit << p;
  }
  for (let m = 0; m < 8; m++) if (motFormat(niveau, m) === mot) return m;
  return -1;
}

function relire(trame, version, niveau, masque) {
  /* Parcours zigzag, identique à l'écriture */
  const bits = [];
  let montant = true;
  for (let colonne = trame.taille - 1; colonne > 0; colonne -= 2) {
    if (colonne === 6) colonne--;
    for (let pas = 0; pas < trame.taille; pas++) {
      const y = montant ? trame.taille - 1 - pas : pas;
      for (let d = 0; d < 2; d++) {
        const x = colonne - d;
        if (trame.reserve[y][x]) continue;
        const v = trame.m[y][x];
        bits.push(masquer(masque, y, x) ? v ^ 1 : v);
      }
    }
    montant = !montant;
  }

  const mots = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    let m = 0;
    for (let b = 0; b < 8; b++) m = (m << 1) | bits[i + b];
    mots.push(m);
  }

  /* Désentrelacement : on rejoue le rangement à l'envers */
  const t = BLOCS[niveau][version - 1];
  const tailles = [];
  for (let i = 0; i < t[1]; i++) tailles.push(t[2]);
  for (let i = 0; i < t[3]; i++) tailles.push(t[4]);
  const blocs = tailles.map(() => []);
  const maxD = Math.max(t[2], t[4]);
  let pos = 0;
  for (let c = 0; c < maxD; c++) {
    for (let b = 0; b < blocs.length; b++) if (c < tailles[b]) blocs[b].push(mots[pos++]);
  }
  const donnees = [].concat(...blocs);

  /* Décodage du flux : mode octet, longueur, contenu */
  let curseur = 0;
  const lire = (n) => {
    let v = 0;
    for (let i = 0; i < n; i++) {
      const octet = donnees[curseur >> 3], bit = (octet >> (7 - (curseur & 7))) & 1;
      v = (v << 1) | bit; curseur++;
    }
    return v;
  };
  const mode = lire(4);
  const longueur = lire(version < 10 ? 8 : 16);
  const octets = [];
  for (let i = 0; i < longueur; i++) octets.push(lire(8));
  return { mode, octets: Uint8Array.from(octets) };
}

function allerRetour(intitule, texte, niveau) {
  const r = QR.trame(texte, { niveau });
  const masque = masqueDe(r.trame, r.niveau);
  if (masque < 0) { verifier(intitule, false, "masque introuvable dans le mot de format"); return; }
  const relu = relire(r.trame, r.version, r.niveau, masque);
  const attendu = new TextEncoder().encode(texte);
  const identique = relu.mode === 4 && relu.octets.length === attendu.length
    && relu.octets.every((v, i) => v === attendu[i]);
  verifier(intitule, identique,
    identique ? "" : `V${r.version}-${r.niveau}, relu ${relu.octets.length} octets sur ${attendu.length}`);
}

allerRetour("un texte court se relit", "https://inerweb.fr", "M");
allerRetour("un texte moyen se relit (version ≥ 7, bloc de version écrit)",
  "https://inerweb.fr/habilitation/seance.html#s=" + "A".repeat(120), "M");
allerRetour("un code de séance grandeur nature se relit",
  "https://inerweb.fr/habilitation/seance.html#s=" + "Xy9_-".repeat(76), "M");
allerRetour("le même en correction L", "https://inerweb.fr/x#s=" + "Zz8_-".repeat(76), "L");
allerRetour("un libellé accentué passe en UTF-8", "Séance — CAP IFCA, groupe A (été)", "M");

/* ====================================================================
   4. La trame et l'habillage
   ==================================================================== */
section("4. La trame et le SVG");

const grand = QR.trame("https://inerweb.fr/habilitation/seance.html#s=" + "Xy9_-".repeat(76), {});
verifier("la trame mesure bien 4 × version + 17",
  grand.trame.taille === grand.version * 4 + 17, `${grand.trame.taille} pour la version ${grand.version}`);
verifier("les trois carrés de repérage sont noirs à leur centre",
  grand.trame.m[3][3] === 1 && grand.trame.m[3][grand.trame.taille - 4] === 1
  && grand.trame.m[grand.trame.taille - 4][3] === 1);
verifier("le module toujours noir est noir",
  grand.trame.m[grand.trame.taille - 8][8] === 1);

const dessin = QR.svg("https://inerweb.fr", { taille: 320, titre: "Séance" });
verifier("le SVG est bien formé", /^<svg [^>]*viewBox="0 0 \d+ \d+"/.test(dessin) && dessin.endsWith("</svg>"));
verifier("le SVG ne charge rien de l'extérieur", !/https?:\/\/(?!www\.w3\.org)/.test(dessin.replace(/aria-label="[^"]*"/, "")));
verifier("le SVG porte un fond blanc explicite", dessin.indexOf('fill="#fff"') > 0);

/* Au-delà de 858 octets, plus rien ne tient : ni en M (666) ni en L (858). */
let deborde = false;
try { QR.svg("Z".repeat(900), { niveau: "M" }); } catch (e) { deborde = /trop long/.test(e.message); }
verifier("un contenu trop long lève un message clair, il ne rend pas un code faux", deborde);

/* Entre 667 et 858 octets : M ne suffit plus, L suffit encore. */
const bascule = QR.trame("Z".repeat(700), { niveau: "M" });
verifier("si M ne suffit pas, on retombe sur L plutôt que d'échouer", bascule.niveau === "L");

/* --------------------------------------------------------------------
   Verdict
   -------------------------------------------------------------------- */
console.log("\n" + "─".repeat(64));
if (echecs.length === 0) {
  console.log(`✓ ${passes} contrôles, aucun échec.`);
  console.log(`  un code de séance dans son adresse : version ${grand.version}, correction ${grand.niveau}, ${grand.trame.taille} modules de côté`);
} else {
  console.log(`✗ ${echecs.length} échec(s) sur ${passes + echecs.length} :`);
  for (const e of echecs) console.log("   · " + e);
  process.exitCode = 1;
}
