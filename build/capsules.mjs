/* =====================================================================
   capsules.mjs — CONTRÔLE des capsules narrées.
   ---------------------------------------------------------------------
   Entrées : packs/fluides/res/capsules/donnees/*.js  (les capsules)
             packs/fluides/cartes.js                  (les fiches du pack)
   Sortie  : un rapport en console, code de sortie 1 si un défaut bloque.

   CE QU'IL VÉRIFIE, et pourquoi chaque point a été ajouté :
     · la capsule se charge et déclare bien (un fichier cassé est muet
       dans le navigateur : rien ne s'affiche, aucune erreur visible) ;
     · les champs obligatoires sont là (id, titre, ecrans, codes) ;
     · l'id du fichier == l'id déclaré (sinon `?c=` ouvre une autre capsule) ;
     · chaque écran a un `dire` — sans lui, la voix lit le texte affiché,
       ce qui s'entend mal (« ouvrez parenthèse U E fermez parenthèse ») ;
     · aucun `dire` ne contient de balise HTML (elle serait ÉPELÉE) ;
     · les motifs d'animation existent, les fichiers SVG cités aussi ;
     · les contrôles sont bien formés (indice `bonne` dans les choix) ;
     · quelles fiches de cours n'ont encore ni capsule ni expérience.

   Usage : node build/capsules.mjs
   ===================================================================== */
import { readFileSync, readdirSync, existsSync, writeFileSync } from "node:fs";
import { dirname, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DOSSIER = resolve(RACINE, "packs/fluides/res/capsules/donnees");
const SVG = resolve(RACINE, "packs/fluides/res/svg");

const MOTIFS = ["etages", "duo", "sequence", "jauge", "frise", "alerte",
  "flux", "zone", "balance", "checklist", "barres", "cycle"];

const bloquants = [];
const remarques = [];
const capsules = [];

/* --- 1. charger chaque capsule dans un bac à sable ------------------- */
for (const fichier of readdirSync(DOSSIER).filter((f) => f.endsWith(".js") && !f.startsWith("_")).sort()) {
  const id = basename(fichier, ".js");
  const chemin = resolve(DOSSIER, fichier);
  let capsule = null;
  global.CAPSULE = { declarer: (c) => { capsule = c; } };
  try {
    // eslint-disable-next-line no-eval
    eval(readFileSync(chemin, "utf8"));
  } catch (e) {
    bloquants.push(`${fichier} — ne se charge pas : ${e.message}`);
    continue;
  }
  if (!capsule) { bloquants.push(`${fichier} — n'appelle pas CAPSULE.declarer()`); continue; }
  capsule.__fichier = fichier;
  capsule.__id = id;
  capsules.push(capsule);
}

/* --- 2. contrôler chacune ------------------------------------------- */
for (const c of capsules) {
  const ou = c.__fichier;
  if (c.id !== c.__id) bloquants.push(`${ou} — id déclaré « ${c.id} » ≠ nom du fichier`);
  if (!c.titre) bloquants.push(`${ou} — pas de titre`);
  if (!c.ecrans || !c.ecrans.length) { bloquants.push(`${ou} — aucun écran`); continue; }
  /* Les codes se contrôlent plus bas, contre la fiche : certaines fiches
     (le risque électrique) sont hors référentiel d'examen à dessein. */
  if (!c.fiche) remarques.push(`${ou} — pas de champ « fiche » : le retour au pack ira au sommaire`);

  const idsEcrans = new Set();
  c.ecrans.forEach((e, i) => {
    const rang = `${ou} écran ${i + 1}`;
    if (!e.id) bloquants.push(`${rang} — pas d'id`);
    else if (idsEcrans.has(e.id)) bloquants.push(`${rang} — id « ${e.id} » en double`);
    else idsEcrans.add(e.id);
    if (!e.titre) bloquants.push(`${rang} — pas de titre`);
    if (!e.dire) bloquants.push(`${rang} — pas de champ « dire » (la voix lirait le texte affiché)`);
    else if (/<[a-z/][^>]*>/i.test(e.dire)) bloquants.push(`${rang} — le « dire » contient une balise HTML, elle serait épelée`);
    if (!e.texte) remarques.push(`${rang} — pas de texte affiché`);

    const v = e.visuel;
    if (!v) remarques.push(`${rang} — aucun visuel`);
    else if (v.motif && !MOTIFS.includes(v.motif)) bloquants.push(`${rang} — motif inconnu « ${v.motif} »`);
    else if (v.svg && !existsSync(resolve(SVG, v.svg))) bloquants.push(`${rang} — schéma introuvable : res/svg/${v.svg}`);
    else if (v.img) {
      const p = resolve(DOSSIER, "..", v.img);
      if (!existsSync(p)) bloquants.push(`${rang} — image introuvable : ${v.img}`);
    }
    if (v && (v.svg || v.img) && !v.alt) remarques.push(`${rang} — image sans texte de remplacement (alt)`);

    const q = e.controle;
    if (q) {
      if (!q.enonce) bloquants.push(`${rang} — contrôle sans énoncé`);
      if (!Array.isArray(q.choix) || q.choix.length < 2) bloquants.push(`${rang} — contrôle sans choix`);
      else if (!(q.bonne >= 0 && q.bonne < q.choix.length)) bloquants.push(`${rang} — contrôle : « bonne » hors des choix`);
      if (!q.explication) remarques.push(`${rang} — contrôle sans explication`);
    }
  });

  const nbControles = c.ecrans.filter((e) => e.controle).length;
  if (!nbControles) remarques.push(`${ou} — aucun contrôle de compréhension`);
  const nbRetenir = c.ecrans.filter((e) => e.retenir && e.retenir.length).length;
  if (!nbRetenir) remarques.push(`${ou} — aucun « à retenir »`);
}

/* --- 2ter. la couverture, pour le registre des cours interactifs ------
   Le registre demande à chaque cours de PROUVER ce qu'il enseigne. Les
   capsules le savent déjà (chacune porte les codes de sa fiche) : on
   l'écrit ici au format attendu, plutôt que de le ressaisir à la main —
   une couverture recopiée diverge au premier ajout de capsule. */
{
  const codes = {};
  for (const c of capsules) {
    const ecrans = (c.ecrans || []).map((e) => `${c.__id}/${e.id}`);
    for (const { code } of c.codes || []) (codes[code] ||= []).push(...ecrans);
  }
  const ordonnes = {};
  for (const code of Object.keys(codes).sort()) ordonnes[code] = codes[code];
  writeFileSync(resolve(DOSSIER, "..", "couverture.json"), JSON.stringify({
    cours: "capsules",
    titre: "Capsules narrées — un chapitre expliqué à voix haute, écran par écran",
    reference: "arrêté du 21 novembre 2025 · règlement (UE) 2024/573",
    ecrans: capsules.reduce((n, c) => n + (c.ecrans || []).length, 0),
    codes: ordonnes,
    _genere: "build/capsules.mjs — ne pas éditer à la main",
  }, null, 2) + "\n", "utf8");
}

/* --- 2bis. la liste, pour la page de contrôle visuel ------------------
   `_controle.html` ne peut pas lister un dossier depuis le navigateur :
   on lui dépose la liste ici, à chaque passage du contrôle. */
writeFileSync(resolve(DOSSIER, "_liste.js"),
  "/* Généré par build/capsules.mjs — ne pas éditer à la main. */\n" +
  "window.CAPSULES_LISTE = " + JSON.stringify(capsules.map((c) => c.__id)) + ";\n", "utf8");

/* --- 3. quelles fiches n'ont toujours rien --------------------------- */
const { CARTES } = await import(pathToFileURL(resolve(RACINE, "packs/fluides/cartes.js")).href);
const avecCapsule = new Set(capsules.map((c) => c.fiche).filter(Boolean));
const orphelines = [];
const sansRien = [];
for (const carte of CARTES) {
  if (!["cours", "exercice"].includes(carte.type)) continue;
  const corps = String(carte.corps || "");
  const aExperience = /res\/[a-z0-9-]+\/index\.html/.test(corps);
  const aCapsule = /res\/capsules\/index\.html\?c=/.test(corps);
  if (avecCapsule.has(carte.id) && !aCapsule) orphelines.push(`${carte.id} — capsule écrite mais pas encore reliée à la fiche`);
  /* La capsule doit porter les codes de SA fiche : c'est ce qui la rend
     opposable dans la matrice de traçabilité. Une fiche sans critère
     (hors référentiel assumé) n'en réclame aucun. */
  const capsule = capsules.find((c) => c.fiche === carte.id);
  if (capsule) {
    const attendus = (carte.criteres || []).map((cr) => cr.code);
    const portes = (capsule.codes || []).map((c) => c.code);
    const manquants = attendus.filter((code) => !portes.includes(code));
    if (manquants.length) remarques.push(`${capsule.__fichier} — codes de la fiche non repris : ${manquants.join(", ")}`);
  }
  if (!aExperience && !aCapsule) sansRien.push(`${carte.id} · ${carte.titre}`);
}

/* --- 4. rapport ------------------------------------------------------ */
const ecrans = capsules.reduce((n, c) => n + c.ecrans.length, 0);
const controles = capsules.reduce((n, c) => n + c.ecrans.filter((e) => e.controle).length, 0);
console.log(`\nCAPSULES : ${capsules.length}  ·  écrans : ${ecrans}  ·  contrôles : ${controles}`);

if (bloquants.length) {
  console.log(`\n❌ ${bloquants.length} DÉFAUT(S) BLOQUANT(S)`);
  bloquants.forEach((b) => console.log("   " + b));
} else console.log("\n✅ aucun défaut bloquant");

if (remarques.length) {
  console.log(`\n⚠ ${remarques.length} remarque(s)`);
  remarques.forEach((r) => console.log("   " + r));
}
if (orphelines.length) {
  console.log(`\n🔗 ${orphelines.length} capsule(s) à relier :`);
  orphelines.forEach((o) => console.log("   " + o));
}
if (sansRien.length) {
  console.log(`\n📭 ${sansRien.length} fiche(s) sans capsule ni expérience :`);
  sansRien.forEach((s) => console.log("   " + s));
} else console.log("\n📭 aucune fiche de cours sans capsule ni expérience");

process.exit(bloquants.length ? 1 : 0);
