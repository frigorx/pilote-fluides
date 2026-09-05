# Brief d'exécution — phase 1 : une seule source pour les données du plan (05/09/2026)

Cadrage par Claude (Fable 5.1), exécution par un agent Sonnet, relecture, contrôles et publication par
Fable. Chantier : `docs/reseaux-2026-09/task_plan.md` (le plan), `findings.md` (la carte du code).
Décision de F. Henninot (PROPOSITION § 7) : l'éclatement en réseaux se fait aux deux conditions du § 4 ;
la première est **une seule source de données**. C'est tout ce que fait cette phase.

**Périmètre** — six fichiers, pas un de plus : `index.html`, le nouveau `moteur/plan-donnees.js`,
`build/plan-liste.mjs`, `build/registre.mjs`, `build/version.mjs`, `build/lib-version.mjs`.
Le moteur de carte reste dans `index.html`. Le rendu ne change pas d'un pixel.

## Règles absolues

1. **Déplacement, jamais retape.** Le bloc de données est coupé et collé par le script du § A, par
   indices de chaîne : son contenu n'est ni relu ni réécrit. Aucune retouche à l'intérieur du bloc,
   pas une espace, pas un guillemet.
2. **Aucune autre ligne d'`index.html`** que celles que le script touche. Pas de retouche « au passage »
   du code voisin, des commentaires, de la mise en forme.
3. Les fichiers sont en **CRLF** (`\r\n`) sur le disque (`core.autocrlf = true` ; le dépôt stocke du LF),
   **sauf** les blocs qu'un script régénère avec `\n` — dans `index.html`, LISTE-PLAN et JSON-LD, 186 lignes
   (relevé après coup, le 05/09 à 19:20). Les éditions passent par l'outil Edit (qui conserve les fins de
   ligne) ; **jamais** de réécriture d'un fichier existant en entier.
4. Les commentaires ajoutés portent le **pourquoi**, datés « 05/09/2026 », avec la décision de
   F. Henninot ; français simple, aucun anglicisme.
5. **Pas de commit, pas de push, pas de `node build/build.mjs`** (il enchaîne quinze scripts et régénère
   des pages : trop large pour cette phase). Seuls les contrôles du § E sont lancés.
6. Un repère qui ne correspond pas, un contrôle qui échoue, un doute : **s'arrêter et rapporter**, ne
   pas improviser. Le rapport vaut mieux qu'une réparation inventée.

## Repères dans `index.html` (commit `87709416`, avant modification)

| Ligne | Repère |
|---|---|
| 1260 | `<script src="plan-descriptions.gen.js?v=4595a771f6"></script>` |
| 1261 | `<script>` qui ouvre la fonction anonyme du plan (données **et** moteur) |
| 1262-1270 | commentaire d'en-tête « LE PLAN DE FORMATION — généré depuis les données ci-dessous. … » |
| 1271-1272 | `(function () {` puis `  "use strict";` |
| 1274-1275 | `  /* DONNEES-PLAN — DEBUT (build/plan-liste.mjs lit ce bloc pour générer` … `UNE source, jamais deux). */` |
| 1276-1644 | les données : `var RES` … `var CORRESPONDANCES = { … };` |
| 1645 | `  /* DONNEES-PLAN — FIN */` |
| 1647-1650 | commentaire « Trajet : visitée = cliquée une fois… » puis `var CLE = "edu_trajet_v1";` — **le moteur commence ici, il ne bouge pas** |

## A — Le script de déplacement

Écrire ce script, tel quel, dans le bloc-notes de session :
`C:\Users\henni\AppData\Local\Temp\claude\C--Users-henni-OneDrive-Bureau-4-INERWEB-CLAUDE-ESPACE-TRAVAIL\90d386ae-22de-4803-9e56-2bcea2059b54\scratchpad\deplacer-donnees.mjs`
puis l'exécuter une seule fois : `node <ce chemin>`. Il refuse de tourner si `moteur/plan-donnees.js`
existe déjà, si une sentinelle manque ou est en double, si le fichier n'est pas en CRLF.

```js
/* deplacer-donnees.mjs — sort le bloc DONNEES-PLAN d'index.html vers moteur/plan-donnees.js.
   Déplacement par indices de chaîne : le contenu du bloc est copié tel quel, jamais réécrit.
   Usage : node deplacer-donnees.mjs   (chemins absolus, à lancer une seule fois) */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const RACINE = "C:/git/pilote-fluides";
const INDEX = RACINE + "/index.html";
const MODULE = RACINE + "/moteur/plan-donnees.js";
const NL = "\r\n"; // le dépôt est en CRLF (2 449 CR pour 2 449 lignes, relevé le 05/09/2026)

if (existsSync(MODULE)) throw new Error("moteur/plan-donnees.js existe déjà : rien n'est fait");
let html = readFileSync(INDEX, "utf8");
if (!html.includes("\r\n")) throw new Error("index.html n'est pas en CRLF : vérifier avant de continuer");

/* 1. Le bloc, sentinelles incluses, avec ses deux espaces d'indentation. */
const DEB = "  /* DONNEES-PLAN — DEBUT";
const FIN = "  /* DONNEES-PLAN — FIN */";
const iDeb = html.indexOf(DEB), iFin = html.indexOf(FIN);
if (iDeb < 0 || iFin < 0 || iFin < iDeb) throw new Error("sentinelles DONNEES-PLAN introuvables ou inversées");
if (html.indexOf(DEB, iDeb + 1) >= 0 || html.indexOf(FIN, iFin + 1) >= 0) throw new Error("sentinelles en double");
const finBloc = iFin + FIN.length;
const bloc = html.slice(iDeb, finBloc);

/* 2. Le nouveau fichier : un en-tête, la même fonction anonyme, le bloc tel quel, l'exposition. */
const enTete = [
  "/* =====================================================================",
  "   plan-donnees.js — LES DONNÉES DU PLAN DE FORMATION : la seule source",
  "   ---------------------------------------------------------------------",
  "   Sorties d'index.html le 05/09/2026 — décision F. Henninot (docs/porte-",
  "   entree-2026-09/PROPOSITION.md, § 4, condition 1 de l'éclatement en",
  "   réseaux) : le plan, sa liste HTML, son JSON-LD et, demain, les cartes",
  "   par réseau doivent lire UNE source, jamais deux copies.",
  "   · Chargé par index.html juste avant le moteur de carte, qui reprend ces",
  "     noms tels quels (var DONNEES = window.PLAN_DONNEES).",
  "   · Lu par build/plan-liste.mjs (entre les sentinelles DONNEES-PLAN, comme",
  "     avant) et par build/registre.mjs (les cours visibles depuis le plan).",
  "   · Versionné par build/version.mjs (?v=) et hashé par build/lib-version.mjs :",
  "     une donnée corrigée doit atteindre le visiteur qui garde l'onglet ouvert.",
  "   Pas de coordonnée saisie à la main station par station : ajouter un cours",
  "   = ajouter UNE ligne dans une liste, ici.",
  "   ⚠️ atelier-animations/outils/ordonner-ligne.js visait index.html pour",
  "   réécrire la branche HUILE ; il s'arrête désormais sur « stations de la",
  "   branche introuvables ». C'est voulu : il listait 17 stations pour une",
  "   branche coupée en 4 + 13 le 20/08 — il aurait écrit faux.",
  "   ===================================================================== */",
  "(function () {",
  "  \"use strict\";",
  "",
  "",
].join(NL);
const pied = [
  "",
  "",
  "  /* Ce que le moteur de carte et les scripts de fabrication lisent. */",
  "  window.PLAN_DONNEES = {",
  "    SUPPORTS: SUPPORTS, TRONC: TRONC, LIGNES: LIGNES, HUILE: HUILE,",
  "    HUILE_CIRCUIT: HUILE_CIRCUIT, CO2: CO2, CENTRALES: CENTRALES, REGULES: REGULES,",
  "    CEINTURE: CEINTURE, OUTILS: OUTILS, ELECTROTECH: ELECTROTECH,",
  "    CORRESPONDANCES: CORRESPONDANCES",
  "  };",
  "})();",
  "",
].join(NL);
writeFileSync(MODULE, enTete + bloc + pied, "utf8");

/* 3. Dans index.html, à la place du bloc : la reprise des noms, rien d'autre. */
const reprise = [
  "  /* Les données du plan vivent dans moteur/plan-donnees.js depuis le 05/09/2026",
  "     (une seule source pour le plan, sa liste, son JSON-LD et les futures cartes",
  "     par réseau — décision F. Henninot, PROPOSITION § 4). Le moteur ci-dessous",
  "     les reprend sous leurs noms d'origine : rien d'autre n'a changé dans son code. */",
  "  var DONNEES = window.PLAN_DONNEES;",
  "  var SUPPORTS = DONNEES.SUPPORTS, TRONC = DONNEES.TRONC, LIGNES = DONNEES.LIGNES,",
  "      HUILE = DONNEES.HUILE, HUILE_CIRCUIT = DONNEES.HUILE_CIRCUIT, CO2 = DONNEES.CO2,",
  "      CENTRALES = DONNEES.CENTRALES, REGULES = DONNEES.REGULES, CEINTURE = DONNEES.CEINTURE,",
  "      OUTILS = DONNEES.OUTILS, ELECTROTECH = DONNEES.ELECTROTECH,",
  "      CORRESPONDANCES = DONNEES.CORRESPONDANCES;",
].join(NL);
html = html.slice(0, iDeb) + reprise + html.slice(finBloc);

/* 4. La balise qui charge le module, juste avant le <script> du moteur. version.mjs posera le ?v=. */
const balise = html.match(/<script src="plan-descriptions\.gen\.js[^"]*"><\/script>\r\n/);
if (!balise) throw new Error("balise plan-descriptions.gen.js introuvable");
html = html.replace(balise[0], balise[0] + '<script src="moteur/plan-donnees.js"></script>' + NL);

/* 5. L'en-tête du moteur disait « les données ci-dessous » : elles sont ailleurs désormais. */
const avant = "LE PLAN DE FORMATION — généré depuis les données ci-dessous.";
if (!html.includes(avant)) throw new Error("phrase d'en-tête du moteur introuvable");
html = html.replace(avant, "LE PLAN DE FORMATION — généré depuis les données de moteur/plan-donnees.js.");

writeFileSync(INDEX, html, "utf8");
/* Le fichier se termine par un retour à la ligne : split() donne une ligne vide de plus, retirée ici. */
console.log("bloc déplacé : " + bloc.split(NL).length + " lignes → moteur/plan-donnees.js ; index.html : "
  + (html.split(NL).length - 1) + " lignes (2 449 avant)");
```

Attendu : « bloc déplacé : 372 lignes » ; pour `index.html`, **`wc -l index.html` fait foi : 2 088** (2 449 − 372
+ 10 + 1). ⚠️ Le script, lui, affiche 1 902 : il compte en `\r\n` et ne voit pas les 186 lignes en LF des blocs
générés (règle 3). Relevé à l'exécution du 05/09 (19:15) : l'agent s'est arrêté sur cet écart, comme demandé ;
Fable a vérifié `wc -l` = 2 088 et l'instantané des données identique, puis a fait poursuivre.
Tout autre chiffre se rapporte, il ne se corrige pas à la main.

## B — `build/plan-liste.mjs` : lire la source, écrire toujours dans `index.html`

Six retouches d'une ligne chacune (numéros au commit `87709416`) :

| Ligne | Avant | Après |
|---|---|---|
| 9 | `(sentinelles DONNEES-PLAN dans index.html) et injectée en HTML statique` | `(sentinelles DONNEES-PLAN dans moteur/plan-donnees.js) et injectée en HTML statique` |
| 13 | `ENTRÉE   index.html (bloc DONNEES-PLAN)` | `ENTRÉE   moteur/plan-donnees.js (bloc DONNEES-PLAN — dans index.html jusqu'au 05/09/2026)` |
| 23 | `const CHEMIN = resolve(RACINE, "index.html");` | garder, et ajouter dessous : `const DONNEES = resolve(RACINE, "moteur/plan-donnees.js");` |
| 26 | `let html = readFileSync(CHEMIN, "utf8");` | garder, et ajouter dessous : `const source = readFileSync(DONNEES, "utf8");` |
| 29 | `const mDonnees = html.match(` | `const mDonnees = source.match(` |
| 33 | `… sentinelles DONNEES-PLAN introuvables dans index.html");` | `… sentinelles DONNEES-PLAN introuvables dans moteur/plan-donnees.js");` |

Le `new Function(mDonnees[1] + …)` ne change pas : le bloc contient toujours ses `var` et ses fabriques.

## C — `build/registre.mjs` : voir un cours ajouté au plan dès le build où il l'est

La ligne 105 — `for (const m of accueil.matchAll(/\bcours\(\s*["']([a-z0-9-]+)["']/g)) depuisAccueil.add(m[1]);` —
cherchait `cours("…")` dans `index.html`, qui n'en contient plus. La remplacer par :

```js
/* 05/09/2026 — les données du plan ont quitté index.html pour moteur/plan-donnees.js
   (une seule source, PROPOSITION § 4). La liste HTML générée dans index.html porte
   encore les adresses des cours (MOTIF ci-dessus), mais build.mjs ne la régénère
   qu'APRÈS ce script : on lit la source elle-même, pour voir un cours ajouté au
   plan dès le build où il l'est. */
const planDonnees = readFileSync(resolve(RACINE, "moteur/plan-donnees.js"), "utf8");
for (const m of planDonnees.matchAll(/\bcours\(\s*["']([a-z0-9-]+)["']/g)) depuisAccueil.add(m[1]);
```

Les lignes 102-104 (lecture d'`index.html` et `MOTIF`) restent : elles voient aussi les liens en dur de la page.

## D — le cache : `build/version.mjs` et `build/lib-version.mjs`

Dans `build/version.mjs`, tableau `FICHIERS_VERSIONNES`, juste avant le `];` de la ligne 52 :

```js
  // 05/09/2026 — les données du plan de formation, sorties d'index.html
  // (une seule source pour le plan et ses futures cartes par réseau). Un
  // plan corrigé doit atteindre le visiteur qui garde l'onglet ouvert.
  "moteur/plan-donnees.js",
```

Dans `build/lib-version.mjs`, tableau `FICHIERS_SOURCES`, juste avant le `];` de la ligne 75 (après le
long commentaire sur `index.html`) :

```js
  /* 05/09/2026 — les données du plan, sorties d'index.html. La page reste
     hashée par pagesRacine(), mais le plan ne vit plus dedans : sans cette
     ligne, l'angle mort du 20/08 reviendrait par la fenêtre. */
  "moteur/plan-donnees.js",
```

## E — Les contrôles, dans cet ordre, depuis `C:\git\pilote-fluides`

Les valeurs de référence ont été relevées le 05/09 à 18:50 (`findings.md` § 8). Tout écart se rapporte.

1. **Les données sont identiques.**
   `node <bloc-notes>\instantane-donnees.mjs module <bloc-notes>\donnees-apres.json`
   puis `fc <bloc-notes>\donnees-avant.json <bloc-notes>\donnees-apres.json` (ou `diff`) :
   attendu « 108 arrêts, 12 groupes, 23 781 caractères » et **aucune différence**.
2. **La liste et le JSON-LD ne bougent pas.** `node build/plan-liste.mjs` → « 15 lignes, 108 stations » ;
   puis `git diff --stat` : `index.html` n'a changé que par le script du § A (une balise ajoutée, le bloc
   remplacé par dix lignes, une phrase de commentaire). Aucune ligne entre `LISTE-PLAN DEBUT/FIN` ni
   `JSON-LD DEBUT/FIN` ne doit apparaître dans `git diff index.html`.
3. **Le registre voit les mêmes cours.** `node build/registre.mjs` → « 74 cours, 99 codes couverts » ;
   `grep -c "plan d’accueil" REGISTRE-COURS-INTERACTIFS.md` → **75** (apostrophe typographique ’) ;
   le `git diff` du registre ne porte que des poids en Ko (bruit connu).
4. **Le cache est cassé proprement.** `node build/version.mjs` : `index.html` doit porter
   `moteur/plan-donnees.js?v=<hash>` et le hash a changé (il n'est plus `4595a771f6`). Relancer
   `node build/version.mjs` : la seconde passe ne change **rien** (`git status --short` identique).
   Le diff sur les autres pages (`?v=` mis à jour) et sur `sw.js` (`VERSION`) est attendu.
5. **Aucun script cassé.** `node outils/controle-syntaxe.mjs` → une seule erreur, antérieure :
   `document-eleve-compresseur.html`.

## Rapport attendu

Court, en français : la sortie du script du § A, les cinq contrôles avec leurs valeurs, `git status --short`
et `git diff --stat`, et tout écart avec ce brief. Pas de commit.
