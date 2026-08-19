/* =====================================================================
   registre.mjs — LE REGISTRE DES COURS INTERACTIFS
   ---------------------------------------------------------------------
   POURQUOI CE FICHIER EXISTE
   Demande de F. Henninot le 31/07/2026 : « tiens à jour un registre des
   cours déjà effectués ». Et une raison plus précise : ce jour-là, j'ai
   recommandé de fabriquer deux cours qui étaient DÉJÀ sur le disque. Mon
   inventaire partait de `cartes.js` — donc de ce qui est *branché* — et un
   cours posé mais pas encore relié y était invisible.

   RELEVÉ, JAMAIS SAISI. Un registre tenu à la main ment au bout de trois
   entrées : on ajoute un cours, on oublie de l'inscrire, et la liste
   devient un piège. Celui-ci lit trois sources et les croise :
     1. le DISQUE          — les index.html de packs/fluides/res/
     2. le BRANCHEMENT     — qui est appelé depuis quelle fiche (cartes.js)
     3. la COUVERTURE      — couverture.json de chaque cours, croisé avec
                             le référentiel

   IL SIGNALE CE QU'UNE LISTE MANUELLE NE VOIT JAMAIS
     · un cours ORPHELIN : présent sur le disque, appelé par aucune fiche —
       du travail fait que personne ne peut atteindre ;
     · un LIEN MORT : une fiche qui appelle un cours absent du disque ;
     · un cours SANS couverture déclarée : il enseigne, mais rien ne le
       prouve — et c'est la première question d'un auditeur ;
     · un code déclaré INCONNU du référentiel : une faute de frappe qui
       ferait croire à une couverture qui n'existe pas.

   ENTRÉES  packs/fluides/res/ · packs/fluides/cartes.js ·
            packs/fluides/referentiel-2025.json
   SORTIE   REGISTRE-COURS-INTERACTIFS.md
   USAGE    node build/registre.mjs   (lancé aussi par build.mjs)

   Aucune date de génération n'est écrite dans le fichier : elle changerait
   à chaque build et polluerait l'historique. C'est `git log` qui date.
   ===================================================================== */
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CARTES } from "../packs/fluides/cartes.js";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const RES = resolve(RACINE, "packs/fluides/res");

/* ---- 1. Les codes que le référentiel connaît réellement ---- */
const REF = JSON.parse(readFileSync(resolve(RACINE, "packs/fluides/referentiel-2025.json"), "utf8"));
const CODES_REF = new Set();
(function parcourir(o) {
  if (Array.isArray(o)) return o.forEach(parcourir);
  if (o && typeof o === "object") {
    if (typeof o.code === "string" && /^\d+\.\d+/.test(o.code)) CODES_REF.add(o.code);
    Object.values(o).forEach(parcourir);
  }
})(REF);

/* ---- 2. Ce qui est sur le disque ---- */
const surDisque = readdirSync(RES, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .filter((n) => existsSync(join(RES, n, "index.html")) || existsSync(join(RES, n, "frise-vivante.html")))
  .sort();

/* Le poids annoncé est celui de ce qui part chez l'élève. Un cours peut porter
   son propre harnais de contrôle (`tests/`), dont les captures d'écran pèsent
   plus lourd que le cours lui-même et ne sont ni publiées ni versionnées.
   Les compter ferait lire 1,5 Mo là où le stagiaire en télécharge 260 Ko. */
const HORS_LIVRAISON = new Set(["tests"]);

function poids(dossier) {
  let n = 0;
  (function pese(d) {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.isDirectory() && HORS_LIVRAISON.has(e.name)) continue;
      const p = join(d, e.name);
      if (e.isDirectory()) pese(p);
      else n += statSync(p).size;
    }
  })(dossier);
  return n;
}

/* ---- 3. Qui appelle quoi ---- */
const MOTIF = /res\/([a-z0-9-]+)\/(?:index|frise-vivante)\.html/g;
const appels = new Map();      // cours → [fiches]
const codesDesFiches = new Map(); // fiche → [codes]
for (const c of CARTES) {
  codesDesFiches.set(c.id, (c.criteres || []).map((x) => x.code).filter(Boolean));
  const html =
    (c.corps || "") +
    (c.blocs || []).map((b) => b.html || "").join("") +
    (c.liens || []).map((l) => l.url || "").join(" ");
  for (const m of html.matchAll(MOTIF)) {
    if (!appels.has(m[1])) appels.set(m[1], []);
    if (!appels.get(m[1]).includes(c.id)) appels.get(m[1]).push(c.id);
  }
}

/* ---- 4. La couverture déclarée par chaque cours ---- */
const cours = surDisque.map((nom) => {
  const dossier = join(RES, nom);
  const fCouv = join(dossier, "couverture.json");
  let couv = null;
  if (existsSync(fCouv)) {
    try { couv = JSON.parse(readFileSync(fCouv, "utf8")); }
    catch (e) { couv = { _illisible: e.message }; }
  }
  const declares = couv && !couv._illisible ? Object.keys(couv.codes || {}) : [];
  const appui = couv && couv.appui ? Object.keys(couv.appui) : [];
  return {
    nom,
    fiches: appels.get(nom) || [],
    ko: Math.round(poids(dossier) / 1024),
    ecrans: couv ? couv.ecrans : null,
    titre: couv ? couv.titre : null,
    declares,
    appui,
    inconnus: declares.filter((c) => !CODES_REF.has(c)),
    couverture: !!couv && !couv._illisible,
  };
});

/* ---- 5. Ce que les cours couvrent, ce qui reste au texte ---- */
const couvertsParUnCours = new Set();
const fichesSansCours = [];
for (const c of CARTES) {
  const codes = codesDesFiches.get(c.id) || [];
  if (!codes.length) continue;
  const html =
    (c.corps || "") +
    (c.blocs || []).map((b) => b.html || "").join("") +
    (c.liens || []).map((l) => l.url || "").join(" ");
  if ([...html.matchAll(MOTIF)].length) codes.forEach((x) => couvertsParUnCours.add(x));
  else fichesSansCours.push({ id: c.id, titre: c.titre, n: codes.length });
}
const orphelinsTexte = [];
for (const f of fichesSansCours)
  for (const code of codesDesFiches.get(f.id) || [])
    if (!couvertsParUnCours.has(code)) orphelinsTexte.push(code);
const codesTexteSeul = [...new Set(orphelinsTexte)];

/* ---- 6. Les anomalies : c'est pour elles que ce fichier existe ---- */
const orphelins = cours.filter((c) => !c.fiches.length);
const liensMorts = [...appels.keys()].filter((n) => !surDisque.includes(n));
const sansCouverture = cours.filter((c) => !c.couverture);
const codesFaux = cours.filter((c) => c.inconnus.length);

/* ---- 7. Écriture ---- */
const L = [];
L.push("# Registre des cours interactifs — pack habilitation fluides");
L.push("");
L.push("> **Fichier GÉNÉRÉ — ne pas le modifier à la main.** `node build/registre.mjs`");
L.push("> (lancé aussi par `build/build.mjs`). Il relève trois sources et les croise : le");
L.push("> disque, les appels depuis les fiches, et la couverture déclarée par chaque cours.");
L.push("> Un registre tenu à la main ment au bout de trois entrées.");
L.push("");
L.push("## En un coup d'œil");
L.push("");
L.push("| | |");
L.push("|---|---|");
L.push(`| Cours interactifs en place | **${cours.length}** |`);
L.push(`| Fiches qui en appellent au moins un | **${new Set(cours.flatMap((c) => c.fiches)).size}** |`);
L.push(`| Codes du référentiel couverts par un cours | **${couvertsParUnCours.size}** |`);
L.push(`| Codes encore expliqués par du texte seul | **${codesTexteSeul.length}** |`);
L.push(`| Poids total des cours | **${Math.round(cours.reduce((a, c) => a + c.ko, 0) / 1024 * 10) / 10} Mo** |`);
L.push("");

/* Les anomalies d'abord : c'est ce qu'on vient chercher. */
const anomalies = orphelins.length + liensMorts.length + sansCouverture.length + codesFaux.length;
L.push("## Anomalies");
L.push("");
if (!anomalies) {
  L.push("**Aucune.** Tous les cours sont branchés, aucun lien mort, chacun déclare sa couverture.");
} else {
  if (liensMorts.length) {
    L.push("### 🔴 Liens morts — une fiche appelle un cours absent du disque");
    liensMorts.forEach((n) => L.push(`- \`${n}\``));
    L.push("");
  }
  if (orphelins.length) {
    L.push("### 🟠 Cours orphelins — présents, mais aucune fiche ne les appelle");
    L.push("");
    L.push("Du travail fait que personne ne peut atteindre depuis le parcours.");
    orphelins.forEach((c) => L.push(`- \`${c.nom}\` — ${c.ko} Ko`));
    L.push("");
  }
  if (sansCouverture.length) {
    L.push("### 🟡 Sans couverture déclarée");
    L.push("");
    L.push("Ils enseignent, mais rien ne le prouve — et c'est la première question d'un auditeur.");
    sansCouverture.forEach((c) => L.push(`- \`${c.nom}\``));
    L.push("");
  }
  if (codesFaux.length) {
    L.push("### 🔴 Codes déclarés inconnus du référentiel");
    L.push("");
    L.push("Une faute de frappe ferait croire à une couverture qui n'existe pas.");
    codesFaux.forEach((c) => L.push(`- \`${c.nom}\` → ${c.inconnus.join(", ")}`));
    L.push("");
  }
}
L.push("");

L.push("## Les cours en place");
L.push("");
L.push("| Cours | Appelé depuis | Écrans | Codes couverts | Poids |");
L.push("|---|---|---|---|---|");
for (const c of cours) {
  const codes = c.declares.length
    ? c.declares.join(" · ")
    : c.appui.length
      ? `*appui : ${c.appui.length} codes*`
      : "—";
  L.push(
    `| \`${c.nom}\` | ${c.fiches.length ? c.fiches.join(", ") : "**orphelin**"} | ` +
    `${c.ecrans || "—"} | ${codes} | ${c.ko} Ko |`
  );
}
L.push("");
L.push("Un cours en *appui* n'ajoute aucune couverture : il donne les notions que d'autres");
L.push("codes supposent connues. Ne jamais le compter comme une preuve.");
L.push("");

L.push("## Ce qui reste — fiches sans cours interactif");
L.push("");
L.push("Classées par nombre de codes du référentiel qu'elles portent seules.");
L.push("");
L.push("| Codes | Fiche | Titre |");
L.push("|---|---|---|");
for (const f of fichesSansCours.sort((a, b) => b.n - a.n)) {
  if (f.n < 2) continue;
  L.push(`| ${f.n} | \`${f.id}\` | ${f.titre} |`);
}
L.push("");
L.push(`Codes encore expliqués par du texte seul : **${codesTexteSeul.length}**`);
L.push("");
L.push("```");
L.push(codesTexteSeul.sort().join(" "));
L.push("```");
L.push("");

writeFileSync(resolve(RACINE, "REGISTRE-COURS-INTERACTIFS.md"), L.join("\n"), "utf8");

/* ---- 8. Les descriptions pour le plan du site ----
   Réponse au retour « les capsules, je ne sais pas ce que c'est »
   (F. Henninot, 19/08) : la vue de ligne du plan (index.html) explique
   chaque station avec la <meta name="description"> de son cours —
   relevée ici comme le fait la galerie, jamais saisie dans une liste à
   part. Stations sans cours local (outils, correspondances, cartes
   d'examen) : pas d'entrée, le plan garde leur devise courte. */
const DESC = {};
for (const nom of surDisque) {
  const page = existsSync(join(RES, nom, "index.html"))
    ? join(RES, nom, "index.html")
    : join(RES, nom, "frise-vivante.html");
  const m = readFileSync(page, "utf8").match(/<meta name="description" content="([^"]*)"/);
  if (m && m[1]) DESC[nom] = m[1];
}
writeFileSync(
  resolve(RACINE, "plan-descriptions.gen.js"),
  '/* Fichier GÉNÉRÉ par build/registre.mjs — ne pas modifier à la main.\n' +
  '   La description de chaque cours, relevée de sa <meta name="description">,\n' +
  '   pour la vue de ligne du plan (index.html). */\n' +
  "window.PLAN_DESC = " + JSON.stringify(DESC, null, 1) + ";\n",
  "utf8"
);

console.log(
  `✓ REGISTRE-COURS-INTERACTIFS.md — ${cours.length} cours, ${couvertsParUnCours.size} codes couverts, ` +
  `${codesTexteSeul.length} en texte seul` +
  (anomalies ? ` · ⚠ ${anomalies} anomalie(s)` : " · aucune anomalie")
);
console.log(`✓ plan-descriptions.gen.js — ${Object.keys(DESC).length} description(s) relevée(s) pour le plan`);
