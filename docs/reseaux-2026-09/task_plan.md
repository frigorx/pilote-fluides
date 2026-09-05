# Chantier : l'éclatement du thermo-techno en réseaux — le plan

Dépôt `C:\git\pilote-fluides` (`main` → https://inerweb.fr). Ouvert le **05/09/2026** au soir, dans la
foulée de la porte d'entrée (`docs/porte-entree-2026-09/PROPOSITION.md`, § 4-5 : l'analyse et l'avis ;
§ 7 : la décision de F. Henninot — cinq réseaux aujourd'hui, l'éclatement en chantier suivant, **aux deux
conditions** : une seule source de données, une navigation commune entre réseaux).

Réglage conseillé : Fable (opus), effort high, en cadrage et vérification ; Sonnet, effort medium, sur
l'exécution des briefs écrits (jamais Sonnet en xhigh). La carte du code est dans `findings.md`.

## Goal

Rendre le plan thermo-techno lisible — quatre cartes qui tiennent chacune sur un écran (cœur 56 stations,
Régulation ≈ 20, Huile 17, CO₂ 13) au lieu d'une carte de 2 900 unités de haut — **sans casser ce qui est
en ligne**, et sans créer une deuxième copie de la moindre donnée.

## Next Step

Ouvrir la phase 2 dans un nouveau chat (un chat par phase) : écrire `BRIEF-PHASE-2.md` — la barre des cinq
réseaux depuis une seule liste (`moteur/reseaux.js`), posée en tête des quatre pages de réseau et de l'accueil,
en liens relatifs. La décision « Ce qui se règle » (phase 3) reste à prendre par F. Henninot.

## Current Phase

Phase 1 terminée et en ligne ; phase 2 (navigation commune) à ouvrir.

## Phases

### Phase 0 — la carte du code
**Status:** complete (05/09, soir). Résultat : `findings.md`. Deux trouvailles qui changent le brief :
le moteur de carte n'est pas générique (64 lignes couplées à des bandes nommées et des ordonnées fixes),
et un outil d'un autre dépôt (`atelier-animations/outils/ordonner-ligne.js`) écrit dans le bloc de
données — déjà désynchronisé (17 stations pour une branche qui en a 4).

### Phase 1 — une seule source : `moteur/plan-donnees.js`
**Status:** complete (05/09 soir — poussée et servie, vérifiée en ligne)
Sortir le bloc `DONNEES-PLAN` d'`index.html` dans `moteur/plan-donnees.js` — un **déplacement**, jamais
une retape — exposé sur `window.PLAN_DONNEES` ; `index.html` le charge juste avant son moteur et en
reprend les douze noms en une ligne ; `plan-liste.mjs` et `registre.mjs` le lisent ; `version.mjs` et
`lib-version.mjs` le versionnent. Le rendu ne change pas d'un pixel : il est mesuré avant et après.
- [x] mesure de référence du rendu servi en local (05/09 18:50 — `findings.md` § 8)
- [x] `BRIEF-PHASE-1.md` écrit (05/09 19:05 — script de déplacement, six fichiers, cinq contrôles)
- [x] exécution par deux agents Sonnet (05/09 19:15-19:35 : le premier s'est arrêté sur le compte de lignes,
      à raison ; le second a fait § B-E) — pas de commit
- [x] relecture du diff par Fable (12 insertions d'`index.html`, les quatre scripts de `build/`, tête et pied du module)
- [x] contrôles : instantané identique (108 arrêts, 23 781 caractères) ; `plan-liste` 15 / 108 et idempotent ;
      `registre` 74 cours, 75 « plan d'accueil » ; `controle-syntaxe` une erreur antérieure ; `version.mjs`
      convergé à la 3e passe sur `271cfd5475` (la 1re passe ajoute un `?v=` à une balise qui n'en avait pas,
      d'où un 2e hash ; la 3e ne change plus un octet — prouvé par empreintes md5)
- [x] rendu après = rendu avant : toutes les sondes identiques (`findings.md` § 8), `PLAN_DONNEES` = 12 groupes,
      5 `<script src>` en `?v=271cfd5475`, console sans erreur
- [x] commit local `00cd12e1` (05/09 19:50 — 29 fichiers : le module, `index.html`, quatre scripts de
      `build/`, les `?v=` de 22 pages et `sw.js`, le dossier du chantier)
- [x] feu vert de F. Henninot (05/09 ~20:05) → `git push` (`87709416..811a4b53`) → site servi vérifié
      contre-cache 195 s plus tard : module en 200 et identique au local, `sw.js` en `271cfd5475`, page =
      locale hors réécriture Cloudflare des e-mails, plan rendu = référence locale (`a74876ef`). Console :
      quatre erreurs du script Cloudflare `email-decode` sur les `<a>` du SVG — bruit préexistant, pas de
      notre code.

### Phase 2 — la navigation commune entre réseaux
**Status:** pending
Une barre des cinq réseaux (des cartouches, pas un menu déroulant), depuis **une** liste
(`moteur/reseaux.js` : nom, couleur, adresse, état), posée en tête des quatre pages de réseau et de
l'accueil, en liens relatifs (HydroMétro et Législation en ont deux absolus chacune, morts hors ligne).
À trancher avant : script commun ou HTML copié cinq fois — recommandation : le script, doctrine du
dépôt « une source, jamais deux ».

### Phase 3 — les trois pages de réseau
**Status:** pending
Régulation (`regules`, et `reglages` selon décision), Huile (`huile` + `huile-circuit`), CO₂ (`co2` +
`centrales`), générées depuis la même source, avec un moteur de carte **filtrable** : le placement
passe de « bandes à ordonnées codées » à « une carte = une liste de bandes placées de proche en
proche ». Le cœur garde la carte actuelle, allégée. Les liens qui restent entre réseaux deviennent des
correspondances entre réseaux (mécanisme existant). Le champ `reseau` par ligne se pose **ici**, avec
son premier consommateur.

### Phase 4 — plus tard
**Status:** pending
Une deuxième tête de ligne « 🎯 Positionnement » à côté de « 🚉 DÉPART » ; profondeurs et
positionnement par réseau (PROPOSITION § 5).

## Decisions Made

| Date | Décision | Pourquoi |
|---|---|---|
| 05/09 | Le chantier vit dans `docs/reseaux-2026-09/` | à côté de son parent `porte-entree-2026-09/`, convention des chantiers du site |
| 05/09 | Phase 1 = les **données** seules ; le moteur reste dans `index.html` | le moteur n'est pas générique ; le sortir tel quel ne le rend pas filtrable ; il bouge en phase 3, avec son premier besoin |
| 05/09 | Pas de champ `reseau` en phase 1 | sans consommateur, c'est du code mort (règle 2) ; il arrive en phase 3 |
| 05/09 | `ordonner-ligne.js` (atelier) n'est pas touché | autre dépôt ; déjà désynchronisé ; après l'extraction il échoue proprement au lieu d'écrire faux ; signalé dans le REPRISE |
| 05/09 | `sw.js` n'est pas touché | le module entre au cache dès le premier affichage en ligne ; la liste HTML statique reste le repli sans script |
| 05/09 | Exposition sur `window.PLAN_DONNEES` (script classique, pas de module ES) | le site charge tout en `<script src>` classiques, ouvrable en `file://` ; `plan-liste.mjs` continue de lire entre les sentinelles |

## Décisions qui appartiennent à F. Henninot

- **« Ce qui se règle » : au cœur ou dans Régulation ?** (PROPOSITION § 4, choix ouvert) — nécessaire à la phase 3.
- **Feu vert de publication** de chaque phase : rien n'est poussé sans lui.
- Phase 2 : script commun ou HTML copié (recommandation ci-dessus).

## Critères de réussite — phase 1 (vérifiables, pas d'impression)

1. `index.html` ne déclare plus `var TRONC`, `var LIGNES`… ; `moteur/plan-donnees.js` porte le bloc entre
   les **mêmes sentinelles** ; l'instantané JSON des données (script du bloc-notes de session) est
   **identique** avant et après.
2. `node build/plan-liste.mjs` → « 15 lignes, 108 stations » et ne réécrit ni LISTE-PLAN ni JSON-LD.
3. `node build/registre.mjs` → 74 cours, les mêmes « plan d'accueil » (le diff du registre ne porte que des Ko).
4. `node outils/controle-syntaxe.mjs` → une seule erreur, antérieure (`document-eleve-compresseur.html`).
5. Rendu servi en local : le SVG du plan a la même longueur et la même empreinte ; `#ligne=huile` et
   `#ligne=regules` rendent la même vue ; la recherche « huile » ramène le même nombre ; compteur « 0 / 86 » ;
   console vide.
6. `node build/version.mjs` : `moteur/plan-donnees.js?v=<hash>` dans `index.html`, hash changé,
   idempotent au second passage.

## Errors Encountered

| Erreur | Tentative | Résolution |
|---|---|---|
| `registre.mjs` non idempotent (poids en Ko) | 1 | bruit : `git checkout -- REGISTRE-COURS-INTERACTIFS.md` ; à ignorer dans les diffs |
| `awk` de Git Bash ignore `\<` `\>` (compte des constantes) | 1 | `grep -cw` |
| Le brief annonçait 2 088 lignes, le script en affichait 1 902 : l'agent s'est arrêté (règle 6) | 1 | `wc -l` = 2 088 ✓ ; le script comptait en `\r\n` et 186 lignes des blocs générés par `plan-liste.mjs` sont en LF (`autocrlf = true`, dépôt en LF). Le déplacement était exact (instantané identique, 12 insertions relues). Brief corrigé, agent relancé pour § B-E |

## Journal

- **05/09, soir** — carte du code (`findings.md`) ; référence de la chaîne : `plan-liste` 15 lignes /
  108 stations, `registre` 74 cours / 43 descriptions ; dépôt propre, à jour d'`origin/main`, aucune
  autre session ouverte sur ce dépôt. Serveur local `node` sur le port 8765 (script dans le bloc-notes de
  session) déclaré dans un `.claude/launch.json` **temporaire** du dossier de travail de session
  (`CLAUDE-ESPACE-TRAVAIL`) — **à retirer en fin de session**.
- **05/09, 20:05-20:20** — feu vert de F. Henninot ; push `87709416..811a4b53` ; module servi 195 s après ;
  page, module, `sw.js` et rendu vérifiés en ligne (détail dans la phase 1 ci-dessus). Serveur local arrêté,
  `launch.json` temporaire retiré.
