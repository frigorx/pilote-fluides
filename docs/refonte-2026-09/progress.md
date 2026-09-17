# Progress — refonte « fond et forme » d'inerweb.fr

## Session 1 — 17/09/2026
- Matin : mémoire, REPRISE, audit du 12/09, plans « tout améliorer » et « réseaux », catalogue lus.
  Dépôt `main` = `origin/main` ; 3 fichiers non commités (reste du lot G + note de progress). Rien touché.
- F. Henninot : le site est toujours sur GitHub Pages (Cloudflare devant, OVH = domaine + courriel).
- Serveur local 8791 (launch.json temporaire dans CLAUDE-ESPACE-TRAVAIL) ; session déplacée dans le dépôt.
- `outils/sonder-rendu.mjs` écrit, corrigé (canal Chrome : le navigateur Playwright 1234 manque) ;
  **81 mesures et captures** sur 27 pages → `mesures/`. Accueil : 7 437 px de haut à 1280, 10 991 à 375.
- Brique « station suivante » vérifiée sur serveur local : diagramme enthalpique OK (« ← Organe par
  organe · ↑ Le tronc · Bilan & performance → ») ; détendeur et KP1 muets (écran fixe = silence voulu).
  ⚠️ `progress.md` du 13/09 attendait une barre sur le détendeur : la règle « overflow hidden → silence »
  l'interdit. À trancher : assouplir la règle ou accepter le silence. **Non commité (mission 1 = lecture seule).**
- F. Henninot, réflexion : l'accueil n'est pas compréhensible, trop de pas avant d'entrer dans un
  réseau, il faut une image de chaque réseau pour voir l'ampleur. Analyse rendue en chat (ci-dessous § Décisions).
- Cadrage reçu (rédigé avec GPT) : `MISSION-2026-09-17.md`. **Mission 1 seulement** : audit sans
  modification, 5 livrables. Missions 2-4 = cadre, non autorisées.
- Workflow `wf_c16f751e-9ba` lancé (19:15) : INV, TEC, UX, CLA, MET-A, MET-B (Sonnet) → critiques
  MET-A, MET-B (réfutation) + contrôleur sur échantillon des quatre sondes de forme. Rapports attendus
  dans `sondes/`, inventaire CSV à la racine du dossier.

## Décisions et lectures du jour
- Le grand plan du thermo-techno n'a pas sa place sur l'accueil : il écrase les autres réseaux et retarde
  l'entrée. Sa place est une page de réseau (phase 3 du chantier réseaux). L'accueil = phrase explicite +
  dix vignettes de réseau (portes) + raccourcis de ligne. Maquette HTML avant code.
- L'audit de GPT est un avis ; les décisions restent ici, attribuées.

## Preuves
| Preuve | Résultat |
|---|---|
| `git status -sb` | `main...origin/main`, 3 fichiers modifiés (lot G + progress) |
| `controle-syntaxe` | 521 pages, 1 erreur antérieure |
| `curl https://inerweb.fr/?sonde=…` | 200, 160 703 o, titre « inerWeb Édu — apprendre le froid, station par station » |
| sonde-suivant (Playwright, Chrome) | diagramme : bloc présent ; détendeur hidden/hidden : silence ; KP1 visible/hidden : silence |
| `sonder-rendu.mjs` | 81 mesures, 0 erreur de chargement, `mesures/mesures.json` |

## Session 1 (suite) — 17/09/2026, 19:20-20:30 — carte blanche sur l'accueil
- 19:15 workflow d'audit lancé (6 sondes) ; 19:20 F. Henninot : « on aurait préféré en parler avant » → arrêté
  (aucun rapport rendu, quelques centaines de milliers de tokens). Discussion, puis carte blanche sur l'accueil.
- Lot G du 13/09 commité sur `main` (`b3605de0`), branche `accueil-2026-09-17` ouverte, `plan.html` = copie d'`index.html`.
- Référence du rendu du plan (index.html servi) : SVG 62 414 car., 121 liens, empreinte `b4873d55`, « huile » → 17.
- Vignettes extraites : thermo 86 Ko (recadré 1310×1180), législation 41, hydro 11, aéro 29, électro 39, hocourant 2.
- Agent Sonnet lancé sur `BRIEF-PLAN-PAGE.md` (plan.html + chaîne), complément envoyé : accepter `?q=`.
- Accueil refait, deux défauts trouvés à la sonde et corrigés : volet ouvert (son script vivait dans le script
  du plan retiré → réinséré seul), vignettes en couleur pleine (`.reseaux` de l'ancien organigramme → `.hall-reseaux`).
- Commit `624742ad`. Journal : entrée du 17/09. Image de partage `og-inerweb-1200x630.png` regardée : générique, gardée.

## Preuves (suite)
| Preuve | Résultat |
|---|---|
| `node build/accueil.mjs` | 6 réseaux · 255 stations · 49 lignes · 6 611 MP3 ; thermo 96/15, législation 29/11, hydro 22/4, aéro 36/6, électro 59/8, hocourant 13/5 |
| `controle-syntaxe` | 524 pages, 1 erreur antérieure |
| sonde `index.html` (v2) | 375 : h 8 172, 0 débordement ; 800 : h 5 103 ; 1280 : h 3 550 ; volet `replie` = true, poignée visible |
| captures | `mesures/v2/accueil-v2-1280.png`, `-375-ecran1/2/3.png` |

## 17/09/2026, 20:30-21:10 — plan.html rendu par l'agent, intégré, tout commité sur la branche
- Agent Sonnet (279 k tokens, 83 outils, 23 min) : plan.html + chaîne ; tous ses contrôles au vert (plan
  identique : 62 414 / 121 / b4873d55 / 17 ; plan-liste idempotent ; registre 72 « plan » ; sitemap 11 ; ?q= et #q=).
- Fable : `metier.html` 2 liens → `plan.html#carte` ; `build/version.mjs` ×2 → `f2f2389f5e` (convergé) ;
  `controle-syntaxe` 524 pages / 1 erreur antérieure ; sonde v3 (5 pages × 3 largeurs) : 0 débordement,
  console vide hors avertissement Playwright ; redirections vérifiées (`index.html#ligne=huile` → plan, 4 stations ;
  `#q=huile` → 17 ; `#carte` → plan ; `plan.html?q=manifold` → 2).
- Commits sur `accueil-2026-09-17` : `624742ad` (hall) puis `c59a7b25` (plan.html + chaîne + versions). Arbre propre.
- **En attente : feu vert de F. Henninot pour fusionner dans `main` et pousser** (`outils/publier-le-site.bat` ou `git push`).
- Restes connus, non traités : mentions « prototype / brouillon » sur les réseaux eux-mêmes (décision) ;
  têtes de réseau hors sitemap (décision) ; CSS orphelin de l'ancien accueil dans index.html et plan.html (inerte) ;
  tableau « Plages usuelles » de metier.html déborde à 375 px (antérieur) ; mission 1 de l'audit suspendue.

## 17/09/2026, 21:10-21:45 — téléphone plié, volet rouvert (commits `640077e4`, `c6c64b07`)
- F. Henninot : « adapté aux téléphones ? plutôt que 30 km, des solutions hybrides » → à ≤ 640 px : rame de
  vignettes à défilement aimanté, portes et tuiles compactes, titre 31 px. 375 px : 10 991 → 8 172 → **5 227 px**.
- F. Henninot : « le volet sur le côté est très très important, il doit apparaître dès qu'on se connecte, c'est la
  cerise sur le gâteau pour mon lycée » → repli forcé du 12/09 levé ; ≥ 1100 px le volet POUSSE la page (350 px),
  titre visible (mesuré 1280 et 1440) ; < 1100 px il recouvre, fermeture mémorisée pour la session. Actualité du
  volet passée au 17/09. Son projet : d'autres lycées avec le logo de SON lycée, quand l'autorisation arrivera.
- Versions `6e99d979af`. Arbre propre. **Toujours en attente du feu vert pour fusionner et pousser.**

## 17/09/2026, 20:25-20:40 — FEU VERT, EN LIGNE
- Fusion `--ff-only` dans `main`, push `9370b0fe..9ffed20b`, branche supprimée ; catalogue relevé (282 entrées, plan.html
  = page du site) et RAG réindexé (76 163 fragments) → push `97a9d4b4` ; REPRISE → push `69eb3f72`.
- GitHub Pages a servi le nouvel accueil à 20:33:36 (7e sonde à 30 s). Vérifié en ligne, cache contourné :
  accueil 87 Ko, hall + 6 vignettes + JSON-LD + redirection ; `plan.html` 200 avec plan et liste ; `sw.js` = `6e99d979af` ;
  sitemap 11 adresses ; 6 SVG en 200 ; au navigateur : volet ouvert, page décalée de 350 px, 6 cartes chargées,
  **console vide** (les erreurs `email-decode` de Cloudflare ont disparu de l'accueil avec le SVG du plan),
  `index.html#ligne=huile` → `plan.html` (4 stations), plan identique (62 414 / 121 / b4873d55), « huile » 17,
  téléphone 5 227 px sans débordement.
- Rangement : serveur local arrêté, `launch.json` temporaire de CLAUDE-ESPACE-TRAVAIL retiré.
