/* =====================================================================
   build.mjs — assemble le pack et produit les DEUX sorties
   ---------------------------------------------------------------------
     packs/fluides/cartes.js      (éditorial, AVEC notes_pilote)
   + packs/fluides/banque.gen.json (généré par convert.mjs)
        ↓
     packs/fluides/pack.pilote.js  → chargé par formateur.html
     packs/fluides/pack.eleve.js   → chargé par index.html, PURGÉ

   La purge de `notes_pilote` n'est pas cosmétique : pack.eleve.js est
   publié en clair, tout ce qu'il contient est lisible par l'élève.
   Le build échoue si la moindre note survit dans la sortie élève.

   Usage : node build/build.mjs
   ===================================================================== */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PACK_META, RESSOURCES, CARTES } from "../packs/fluides/cartes.js";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BANQUE = JSON.parse(
  readFileSync(resolve(RACINE, "packs/fluides/banque.gen.json"), "utf8")
);

/* ---------------------------------------------------------------------
   1. VALIDATION — le moteur ne valide rien : une faute de frappe dans un
   `vers` casse la page en silence. On vérifie ici, une bonne fois.
   --------------------------------------------------------------------- */
function valider() {
  const err = [];
  const ids = new Set();

  if (!Array.isArray(CARTES) || !CARTES.length) err.push("cartes : tableau vide ou absent");

  for (const c of CARTES) {
    if (!c.id) { err.push("carte sans id : " + (c.titre || "?")); continue; }
    if (ids.has(c.id)) err.push("id en double : " + c.id);
    ids.add(c.id);
    if (!c.titre) err.push(c.id + " : titre absent");

    if (c.question) {
      const q = c.question;
      if (!Array.isArray(q.choix) || q.choix.length < 2)
        err.push(c.id + " : question sans choix (le moteur planterait)");
      else if (!Number.isInteger(q.bonne) || q.bonne < 0 || q.bonne >= q.choix.length)
        err.push(c.id + " : index `bonne` hors plage");
      if (!q.enonce) err.push(c.id + " : question sans énoncé");
    }
    for (const cr of c.criteres || [])
      if (!cr.code || !cr.libelle) err.push(c.id + " : critère incomplet");
  }

  // le moteur code en dur `data-go='c00'` sur le retour au sommaire d'examen
  if (!ids.has("c00")) err.push("la carte d'accueil DOIT avoir l'id c00 (codé en dur dans moteur.js)");
  if (!ids.has(PACK_META.carte_initiale))
    err.push("carte_initiale « " + PACK_META.carte_initiale + " » introuvable");

  // toutes les destinations de navigation existent
  for (const c of CARTES) {
    for (const l of c.liens || []) {
      if (!l.vers) err.push(c.id + " : lien sans destination");
      else if (!ids.has(l.vers)) err.push(c.id + " → « " + l.vers + " » : carte inexistante");
    }
    if (c.question?.remediation_vers && !ids.has(c.question.remediation_vers))
      err.push(c.id + " : remediation_vers « " + c.question.remediation_vers + " » inexistante");
    for (const r of c.ressources || [])
      if (!RESSOURCES.some((x) => x.id === r)) err.push(c.id + " : ressource « " + r + " » inexistante");
  }

  // examens : le pool doit exister et être assez grand
  const groupes = new Set(BANQUE.map((q) => q.dc));
  for (const c of CARTES.filter((x) => x.examen)) {
    const inconnus = (c.examen.dc || []).filter((d) => !groupes.has(d));
    if (inconnus.length) err.push(c.id + " : groupe(s) absent(s) de la banque : " + inconnus.join(", "));
    const pool = BANQUE.filter((q) => (c.examen.dc || []).includes(q.dc)).length;
    if (pool < (c.examen.n || 6))
      err.push(c.id + " : " + pool + " questions disponibles pour " + c.examen.n + " demandées");
  }

  // banque
  for (const q of BANQUE) {
    if (!Array.isArray(q.choix) || q.choix.length < 2) err.push("banque " + q.id + " : choix absents");
    else if (!Number.isInteger(q.bonne) || q.bonne < 0 || q.bonne >= q.choix.length)
      err.push("banque " + q.id + " : index `bonne` hors plage");
  }

  return err;
}

/* ---------------------------------------------------------------------
   2. PURGE — retire la couche pilote de la sortie élève
   --------------------------------------------------------------------- */
const CHAMPS_PILOTE = ["notes_pilote"];

function purger(cartes) {
  return cartes.map((c) => {
    const copie = { ...c };
    for (const champ of CHAMPS_PILOTE) delete copie[champ];
    return copie;
  });
}

/* --------------------------------------------------------------------- */
function ecrire(chemin, pack, entete) {
  const js = "/* " + entete + " */\nwindow.PILOTE_PACK = " + JSON.stringify(pack, null, 1) + ";\n";
  writeFileSync(resolve(RACINE, chemin), js, "utf8");
  return js;
}

function main() {
  const err = valider();
  if (err.length) {
    console.error("✗ build refusé — " + err.length + " anomalie(s) :");
    err.forEach((e) => console.error("   " + e));
    process.exit(1);
  }

  const base = { pack: PACK_META, ressources: RESSOURCES, banque: BANQUE };

  ecrire(
    "packs/fluides/pack.pilote.js",
    { ...base, cartes: CARTES },
    "BUILD FORMATEUR — contient la couche pilote. Généré par build/build.mjs."
  );
  const jsEleve = ecrire(
    "packs/fluides/pack.eleve.js",
    { ...base, cartes: purger(CARTES) },
    "BUILD ÉLÈVE — couche pilote retirée. Généré par build/build.mjs. NE PAS éditer à la main."
  );

  /* --- contrôle de non-fuite : on relit ce qu'on vient d'écrire --- */
  const fuites = CHAMPS_PILOTE.filter((champ) => jsEleve.includes(champ));
  if (fuites.length) {
    console.error("✗ FUITE : « " + fuites.join(", ") + " » présent dans pack.eleve.js");
    process.exit(1);
  }
  // au cas où un texte de note aurait été recopié ailleurs (corps, bloc…)
  for (const c of CARTES) {
    if (!c.notes_pilote) continue;
    const debut = c.notes_pilote.slice(0, 40);
    if (jsEleve.includes(debut)) {
      console.error("✗ FUITE : le début de la note de « " + c.id + " » se retrouve dans pack.eleve.js");
      process.exit(1);
    }
  }

  const texte = CARTES.reduce(
    (n, c) =>
      n + (c.corps || "").length + (c.blocs || []).reduce((m, b) => m + (b.html || "").length, 0),
    0
  );
  const types = CARTES.reduce((a, c) => ((a[c.type || "?"] = (a[c.type || "?"] || 0) + 1), a), {});

  console.log("✓ pack.pilote.js + pack.eleve.js écrits");
  console.log("  cartes  : " + CARTES.length + " " + JSON.stringify(types));
  console.log("  banque  : " + BANQUE.length + " questions");
  console.log("  notes pilote : " + CARTES.filter((c) => c.notes_pilote).length + " (0 dans la sortie élève)");
  console.log("  texte des cartes : " + texte.toLocaleString("fr-FR") + " caractères");
  console.log("  poids élève : " + Math.round(Buffer.byteLength(jsEleve) / 1024) + " Ko");
}

main();
