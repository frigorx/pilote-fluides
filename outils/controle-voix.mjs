#!/usr/bin/env node
/* =====================================================================
   controle-voix.mjs — le § 7 de VOIX-ET-NARRATION.md, automatisé
   ---------------------------------------------------------------------
   Ce qu'une machine peut vérifier :
     1. la voix dit-elle autre chose que l'écran ?   (mécanisme)
     2. une formule est-elle prononcée en symboles ? (texte)
     3. combien d'impératifs par narration ?         (texte)
     4. la durée tient-elle la cible du § 4 ?        (texte)

   Ce qu'elle ne peut pas : dire si c'est un professeur qui parle.
   La case « quelqu'un a-t-il écouté ? » reste à cocher à la main.

   Emploi :  node controle-voix.mjs <racine>  [--detail]
   ===================================================================== */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, basename } from "node:path";

const RACINE = process.argv[2] || "C:/git/pilote-fluides";
const DETAIL = process.argv.includes("--detail");

/* --- § 4 : le dimensionnement ------------------------------------- */
const MOTS_PAR_SECONDE = 2.89;   // edge-tts, mesuré
const MOTS_PAR_SECONDE_NOMBRES = 1.55;
const PLAFOND_SECONDES = 90;     // « au-delà, couper »

/* --- § 2 : ce qui est interdit ------------------------------------ */
/* « croix » est écarté : la Croix du Frigoriste est une notion du métier, pas un
   opérateur. On ne garde que ce qui ne peut être qu'une formule épelée. */
const FORMULE_DITE = /\b(égale|indice \w\b|au carré|au cube|divisé par|\w{1,3} sur (deux|trois|quatre))\b/i;

/* Le défaut central, quand il est écrit noir sur blanc dans le champ narration :
   le texte décrit la diapositive au lieu d'enseigner. Un champ `narration` rempli
   ne prouve donc rien — c'est ce qui a fait passer Législation pour « fait ». */
const DECRIT_L_ECRAN = new RegExp(
  "(\\bà (gauche|droite)\\b|\\ben (haut|bas)\\b|\\bau centre\\b|\\bci-(dessous|contre|dessus)\\b"
  + "|\\bcette (image|diapositive|vignette|figure|colonne|case)\\b|\\bcet (écran|encadré|onglet)\\b"
  + "|\\bsur (l'image|le schéma|la photo|le tableau|la figure)\\b"
  + "|\\bregardez le (tableau|schéma|graphique)\\b|\\b(coche|croix|pastille|flèche|puce) (verte|rouge|bleue|orange)\\b"
  + "|\\bla (colonne|ligne|case) (de gauche|de droite|du haut|du bas)\\b"
  + "|\\b(deux|trois|quatre) (silhouettes?|colonnes?|vignettes?|encadrés?) (côte à côte|s'affichent)\\b)", "i");
/* Le métier a ses propres repères de position, et ce ne sont pas des descriptions
   d'écran : la Croix du Frigoriste place le condenseur en haut et l'évaporateur en
   bas ; un plan constructeur se lit ; un organe réel a un centre et des faces. */
const EXCEPTION_METIER = new RegExp(
  "(Croix du Frigoriste|plan constructeur|schéma de la vanne|notice|documentation"
  + "|sur le dossier|le sens de circulation|la flèche de circulation)", "i");

const IMPERATIFS = new RegExp(
  "\\b(regarde|regardez|retiens|retenez|règle|réglez|note|notez|ramène|ramenez|retrouve|retrouvez"
  + "|clique|cliquez|choisis|choisissez|vérifie|vérifiez|place|placez|observe|observez|compare|comparez"
  + "|mesure|mesurez|repère|repérez|suis|suivez|fais|faites|prends|prenez|lis|lisez|écris|écrivez"
  + "|coche|cochez|sélectionne|sélectionnez|identifie|identifiez|complète|complétez|associe|associez"
  + "|trouve|trouvez|nomme|nommez|pose|posez|ouvre|ouvrez|ferme|fermez|démarre|démarrez|arrête|arrêtez)\\b",
  "gi");
const SEUIL_IMPERATIFS = 5;      // « un professeur n'en aligne pas six »

/* --- 1. le mécanisme : d'où vient le texte parlé ? ----------------- */
const RAMASSAGE = /(innerText|textContent|cloneNode|querySelector[^)]*\)\s*\.\s*(innerText|textContent))/;
const CHAMPS_AFFICHES = /\$\{[^}]*\.(title|titre|text|texte|lead|prompt|body|contenu|instruction|objective)\b/;

/* `res` n'est PAS ignoré : c'est là que vivent tous les modules du pack fluides. */
const IGNORER = new Set(["node_modules", ".git", "audio", "voix", "images", "images-organes",
  "svg", "symboles", "photos", "assets", "tests", "docs", ".planning"]);

function fichiersJs(dir, out = []) {
  let entrees; try { entrees = readdirSync(dir); } catch { return out; }
  for (const e of entrees) {
    const p = join(dir, e);
    let st; try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) { if (!IGNORER.has(e)) fichiersJs(p, out); }
    else if (/\.(js|html)$/.test(e)) out.push(p);
  }
  return out;
}

/* Extrait les narrations : chaîne après un champ oral, forme plate ou objet. */
function narrations(src) {
  const out = [];
  // narration: "…"  |  speak: "…"  |  data-narration="…"
  const plat = /\b(?:narration|speak|voix|oral|texteParle)\s*:\s*(["'`])((?:\\.|(?!\1)[\s\S]){20,})?\1/g;
  const attr = /data-narration\s*=\s*"((?:[^"\\]|\\.){20,})"/g;
  // narration: { cle: "…", … }
  const objet = /\bnarration\s*:\s*\{([\s\S]*?)\n\s*\}/g;
  // narrations: ["…", "…"]  — la forme du Tome 3, un texte par écran
  const tableau = /\bnarrations\s*:\s*\[([\s\S]*?)\]\s*,/g;
  let m;
  while ((m = plat.exec(src))) out.push(m[2] || "");
  while ((m = attr.exec(src))) out.push(m[1]);
  while ((m = objet.exec(src))) {
    const bloc = m[1];
    const cle = /\b\w+\s*:\s*(["'`])((?:\\.|(?!\1)[\s\S])+?)\1/g;
    let c; while ((c = cle.exec(bloc))) out.push(c[2]);
  }
  while ((m = tableau.exec(src))) {
    const chaine = /"((?:[^"\\]|\\.){20,}?)"/g;
    let c; while ((c = chaine.exec(m[1]))) out.push(c[1]);
  }
  return out;
}

function duree(texte) {
  const mots = texte.split(/\s+/).filter(Boolean);
  const chiffres = mots.filter(w => /\d/.test(w)).length;
  const normaux = mots.length - chiffres;
  return normaux / MOTS_PAR_SECONDE + chiffres / MOTS_PAR_SECONDE_NOMBRES;
}

/* --- balayage ------------------------------------------------------ */
const modules = new Map();   // dossier -> { parle, ramasse, narrations[], preuve }

for (const f of fichiersJs(RACINE)) {
  const src = readFileSync(f, "utf8");
  if (!/SpeechSynthesis|speechSynthesis/.test(src) && !/narration|data-narration/.test(src)) continue;

  const dossier = relative(RACINE, f).split(/[\\/]/).slice(0, -1).join("/") || ".";
  const mod = modules.get(dossier) || { parle: false, ramasse: false, repli: false, preuve: "", narrations: [] };

  if (/new (?:window\.)?SpeechSynthesisUtterance/.test(src)) {
    mod.parle = true;
    // le texte parlé vient-il de l'écran ?
    for (const m of src.matchAll(/new (?:window\.)?SpeechSynthesisUtterance\(([\s\S]{0,200}?)\)\s*[;,]/g)) {
      const arg = m[1].replace(/\s+/g, " ");
      if (CHAMPS_AFFICHES.test(arg)) { mod.ramasse = true; mod.preuve = arg.slice(0, 110); }
      else {
        // l'argument est un appel : la fonction appelée ramasse-t-elle ?
        /* Un appel qui reçoit DÉJÀ un champ oral en argument est conforme :
           la fonction appelée n'est alors qu'une oralisation (« HP » →
           « haute pression »), pas un ramassage. Sans ce test, deux modules
           parfaitement écrits étaient signalés parce que leur fonction
           d'oralisation touche au DOM ailleurs dans le fichier. */
        if (/\b(speak|narration|texteParle|dire|voiceStep|cue)\b/.test(arg)) continue;
        const nom = (arg.match(/^([A-Za-z_$][\w$]*)\s*\(/) || [])[1];
        if (!nom) continue;
        const corps = (src.match(new RegExp(`function\\s+${nom}\\s*\\([\\s\\S]{0,1500}`)) || [""])[0];
        if (!RAMASSAGE.test(corps)) continue;
        /* Un champ oral consulté AVANT le ramassage, c'est un repli — pas un défaut
           de mécanisme. Il ne devient un défaut que si le champ reste vide, ce que
           dit le taux de couverture plus bas. */
        const posOral = corps.search(/\b(narration|data-narration|speak|texteParle)\b/);
        const posDom = corps.search(RAMASSAGE);
        if (posOral !== -1 && posOral < posDom) {
          mod.repli = true;
          if (!mod.preuve) mod.preuve = `${nom}() → champ oral, puis repli ${RAMASSAGE.exec(corps)[1]}`;
        } else {
          mod.ramasse = true;
          mod.preuve = `${nom}() → ${RAMASSAGE.exec(corps)[1]}`;
        }
      }
    }
  }
  mod.narrations.push(...narrations(src));
  modules.set(dossier, mod);
}

/* --- rapport ------------------------------------------------------- */
const parlants = [...modules.entries()].filter(([, m]) => m.parle || m.narrations.length);
let nbRamasse = 0, nbNarr = 0, alertes = [];
const compte = { decrit: 0, longue: 0, imperatifs: 0, formule: 0 };

console.log(`Contrôle des voix — ${RACINE}`);
console.log("=".repeat(72));
console.log("");
console.log("§ 2 — LA VOIX DIT-ELLE AUTRE CHOSE QUE L'ÉCRAN ?");
console.log("");
console.log("  A. Le texte parlé vient de l'écran, sans autre source :");
for (const [dossier, m] of parlants.sort()) {
  if (!m.ramasse) continue;
  nbRamasse++;
  console.log(`  ✗ ${dossier}`);
  if (m.preuve) console.log(`       ${m.preuve}`);
}
if (nbRamasse === 0) console.log("     ✓ aucun");

console.log("");
console.log("  B. Champ oral d'abord, écran en repli — dépend du taux de remplissage :");
let nbRepli = 0;
for (const [dossier, m] of parlants.sort()) {
  if (m.ramasse || !m.repli) continue;
  nbRepli++;
  console.log(`  ⚠ ${dossier} — ${m.narrations.length} narration(s) écrite(s)`);
}
if (nbRepli === 0) console.log("     ✓ aucun");
console.log("");
console.log(`  → ${nbRamasse} modules à reprendre, ${nbRepli} à vérifier au remplissage`);

console.log("");
console.log("§ 2 et § 4 — LES NARRATIONS ÉCRITES");
for (const [dossier, m] of parlants.sort()) {
  for (const [i, texte] of m.narrations.entries()) {
    nbNarr++;
    const t = texte.replace(/\\n/g, " ").replace(/\s+/g, " ").trim();
    const s = duree(t);
    const imp = (t.match(IMPERATIFS) || []).length;
    const formule = FORMULE_DITE.test(t);
    const decrit = DECRIT_L_ECRAN.test(t) && !EXCEPTION_METIER.test(t);
    const defauts = [];
    if (decrit) { defauts.push(`PARLE DE L'IMAGE — à relire : « ${DECRIT_L_ECRAN.exec(t)[0]} »`); compte.decrit++; }
    if (s > PLAFOND_SECONDES) { defauts.push(`${Math.round(s)} s — au-delà de 90 s, couper`); compte.longue++; }
    if (imp > SEUIL_IMPERATIFS) { defauts.push(`${imp} impératifs`); compte.imperatifs++; }
    if (formule) { defauts.push(`formule dite : « ${FORMULE_DITE.exec(t)[0]} »`); compte.formule++; }
    if (defauts.length) alertes.push(`  ✗ ${dossier} [${i + 1}] — ${defauts.join(" · ")}`);
    else if (DETAIL) console.log(`  ✓ ${dossier} [${i + 1}] — ${Math.round(s)} s`);
  }
}
alertes.forEach(a => console.log(a));
console.log("");
console.log(`  → ${nbNarr} narrations lues, ${alertes.length} à revoir`);
console.log(`       parlent de ce qui est à l'écran (à relire) : ${compte.decrit}`);
console.log(`       trop longues (> 90 s) : ${compte.longue}`);
console.log(`       plus de ${SEUIL_IMPERATIFS} impératifs : ${compte.imperatifs}`);
console.log(`       formule prononcée : ${compte.formule}`);

console.log("");
console.log("=".repeat(72));
console.log(`Modules parlants : ${parlants.length}   dont ${nbRamasse} qui lisent l'écran`);
console.log("");
console.log("⚠  Reste à faire à la main, et rien ne le remplace :");
console.log("   quelqu'un a-t-il ÉCOUTÉ ? (§ 7 de VOIX-ET-NARRATION.md)");

process.exitCode = nbRamasse > 0 || alertes.length > 0 ? 1 : 0;
