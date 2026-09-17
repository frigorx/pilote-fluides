# Refonte « fond et forme » d'inerweb.fr — septembre 2026, deuxième passe

> Ouvert le **17/09/2026** sur la demande de F. Henninot : « un gros travail, encore une fois, de
> fond et de forme sur inerweb.fr ». Ultracode activé par lui pour ce chat.
> Dépôt `C:\git\pilote-fluides` (`main` = `origin/main` au départ, servi par GitHub Pages derrière
> Cloudflare ; le domaine et le courrier restent chez OVH, aucun hébergement OVH).

## Interprétation retenue (énoncée, pas supposée)

- **Le fond** = ce que le site DIT : exactitude métier des cours (jamais auditée — l'audit du 12/09
  l'excluait explicitement), cohérence pédagogique (codes du référentiel, niveaux, vouvoiement,
  vocabulaire), texte des seize pages du site (accueil, métier, formateurs, formation, mentions…),
  stations minces, mentions de chantier, texte des voix.
- **La forme** = ce que le site MONTRE : une charte commune aux réseaux (piste 7 du 12/09, jamais
  commencée : 5 réseaux, 4 identités, 32 feuilles de style), une navigation commune (phase 2 du
  chantier réseaux), la mise en page à trois largeurs après les lots A à F, la technique qui porte
  la forme (poids, sitemap à 10 adresses pour 281 stations, accessibilité, console).
- Ce chantier **repart de l'audit du 12/09** (`docs/audit-site-2026-09/`) : ce qui y est fait n'est pas
  refait, ce qui y reste est repris, ce qui n'y était pas (le fond) est ajouté.

## Réglage
Fable : cadrage, briefs, synthèse, arbitrages, vérification. Sonnet : sondes d'audit et exécution des
lots sur brief écrit (effort élevé sur le fond métier, moyen ailleurs). Haiku : mécanique seulement.
Lots de 6 à 8 agents par vague, deux vagues au plus par phase. Un chat par phase après celle-ci.

## Critères de réussite de CE chat
1. Un audit « fond et forme » écrit, chaque constat **mesuré** (sonde de rendu, scripts, RAG) et,
   pour le fond métier, **contredit par un second agent** avant d'être retenu.
2. Un plan de lots ordonné, avec ce qui sera ÉCRIT et ce qui sera seulement LISTÉ, et un brief
   par lot prêt à donner à Sonnet.
3. Le dépôt propre : le reste du lot G (« station suivante ») vérifié et commité en local.
4. Rien n'est poussé sans feu vert explicite de F. Henninot (feedback_diffusion_gelee).

## ⚡ Virage du 17/09 (19:30) — carte blanche sur l'accueil, la mission 1 est suspendue

F. Henninot, après l'arrêt du workflow d'audit : « j'ai besoin de créer l'effet waouh, d'attaquer la
diffusion ; quand je rentre dans le site je ne comprends pas ; je te donne carte blanche ; l'objectif
c'est le référencement puis la visibilité par le réseautage ». Décision prise : refaire l'accueil
maintenant, sur la branche `accueil-2026-09-17`, sans workflow ; l'audit (mission 1) reprendra ensuite
si voulu, ses outils et mesures restent dans ce dossier.

### Phase A — l'accueil « hall » (Fable) — **fait en local, commit `624742ad`**
- `moteur/reseaux.js` : la liste des six réseaux, une seule source (nom, couleur, phrase, niveaux, état, entrée, raccourcis).
- `build/accueil.mjs` : relève stations et lignes dans le catalogue, compte les MP3 sur le disque, écrit dans
  `index.html` entre sentinelles : la carte animée du réseau des réseaux (SVG en ligne), les quatre chiffres,
  les six vignettes, le JSON-LD (WebSite + SearchAction vers `plan.html?q=` + ItemList). Refuse une adresse absente.
- `docs/refonte-2026-09/outils/extraire-cartes-reseaux.mjs` : les cartes SVG des réseaux, extraites des pages
  qui les dessinent, rendues autonomes, sans texte → `icones/reseaux/*.svg` (HoCourant fabriquée : paliers).
- `index.html` : chirurgie par repères (accroche + organigramme + portes → hall ; plan, liste, circuit et
  moteur de carte retirés ; volet et journal conservés, leur script réinséré) ; barre : « Le plan » ;
  redirection des ancres gravées `#ligne= #carte #chercher #q=` vers `plan.html` ; titre, description,
  og, JSON-LD neufs ; entrée du 17/09 au journal.
- Mesuré (sonde, SW bloqué) : 1280 px → 3 550 px de haut (7 437 avant), 375 px → 8 172 (10 991), 0 débordement,
  volet replié, 81 Ko (162). Chevauchements restants = liens du journal replié (mesure, pas défaut, antérieur).

### Phase B — `plan.html` et la chaîne (agent Sonnet sur `BRIEF-PLAN-PAGE.md`) — en cours
Puis Fable : `metier.html` (2 liens `index.html#carte` → `plan.html#carte`), `build/version.mjs`, sitemap,
contrôle de syntaxe, sonde index + plan + métier + formateurs à 3 largeurs, référence du plan sur `plan.html`,
commit, **présentation à F. Henninot, feu vert avant tout push**.

### Décisions prises sous carte blanche (à confirmer par F. Henninot)
- Le grand plan quitte l'accueil pour `plan.html` ; l'accueil ne garde qu'une vignette recadrée.
- Sur l'accueil, plus de « prototype / brouillon » : un discret « en relecture » (AéroRézo, ÉlectroRézo,
  HoCourant) et « en construction » (Législation) — les bandeaux des réseaux eux-mêmes sont inchangés.
- HoCourant est présenté comme un réseau (13 modules, 5 paliers), plus comme un outil.
- Le sitemap ne gagne que `plan.html` ; ajouter les têtes de réseau (au moins HydroMétro) est un choix à lui.

## Phases (cadrage initial, avant le virage)

### Phase 0 — cadrage et outillage (ce chat)
**Status:** in_progress
- [x] Mémoire, REPRISE, audit du 12/09, plan « tout améliorer », plan « réseaux », catalogue lus
- [x] Dépôt : `main` = `origin/main` ; 3 fichiers non commités (reste du lot G + note de progress)
- [x] Serveur local `python -m http.server 8791` (launch.json temporaire dans CLAUDE-ESPACE-TRAVAIL — **à retirer en fin de session**)
- [x] Sonde de rendu écrite : `outils/sonder-rendu.mjs` (Playwright de `C:\git\hydrometro`, SW bloqué, 3 largeurs, mesures + captures)
- [x] Sonde lancée sur 27 pages témoins → `mesures/mesures.json` + 81 captures
- [x] Reste du lot G vérifié (diagramme OK ; détendeur et KP1 muets par la règle « écran fixe ») — **non commité** : la mission 1 est en lecture seule ; décision à prendre en fin de mission
- [x] Brief d'audit commun écrit (`BRIEF-AUDIT.md`) ; cadrage du commanditaire copié (`MISSION-2026-09-17.md`)

### Phase 1 — mission 1 du cadrage : audit sans modification (workflow `wf_c16f751e-9ba`)
**Status:** in_progress
Le cadrage reçu le 17/09 (rédigé avec GPT, validé par F. Henninot) remplace le découpage F/M/T : mêmes
objets, livrables imposés. Correspondance : INV = § 4.2 inventaire (→ `INVENTAIRE_RESSOURCES.csv`) ·
TEC = § 4.3 découverte technique · UX = § 4.4 expérience réelle (mesures + tests Playwright) ·
CLA = § 4.5 clarté et crédibilité · MET-A / MET-B = § 4.5 points à validation métier (fluides-sécurité-
réglementation / thermo-organes-gestes-satellites) · § 4.6 visibilité = Fable, sans accès Search Console.
Vague 2 : critiques MET-A et MET-B en mode « réfuter » ; contrôleur sur échantillon de INV/TEC/UX/CLA.
Synthèse Fable → `RAPPORT_AUDIT.md` (≤ 10 constats), `PLAN_ACTIONS.md`, `PROPOSITION_ACCUEIL_ET_3_MODULES.md`,
`REPRISE_MISSIONS.md`.
- [ ] Sondes rendues (6) et rapports dans `sondes/`
- [ ] Contre-vérifications rendues (3)
- [ ] Volet visibilité écrit (§ 4.6)
- [ ] Cinq livrables écrits, relus, preuves jointes
- [ ] Réponse à F. Henninot : « Voici ce que j'ai effectivement pu vérifier », puis trois décisions

### Phase 2 — plan de lots et briefs
**Status:** pending
Ordre : ce qui se voit ou s'entend partout pour peu · ce qui unifie · ce qui réécrit du contenu.
Validation par F. Henninot de l'ordre et du périmètre écrit/listé.

### Phase 3 et suivantes — exécution par lots (un chat par lot)
**Status:** pending

## Decisions Made
| Date | Décision | Raison |
|---|---|---|
| 17/09 | Repartir de l'audit du 12/09, ne pas le refaire | sobriété : ce qui est mesuré et corrigé n'est pas remesuré ; on ajoute le fond |
| 17/09 | Mesurer le rendu par script (Playwright) plutôt qu'à l'œil | preuves reproductibles, 81 captures en minutes, les agents lisent un JSON |
| 17/09 | Vérification adversariale réservée au fond métier | c'est là que l'erreur coûte (sécurité, CO₂, réglementation) ; la forme se mesure |

## Errors Encountered
| Erreur | Tentative | Résolution |
|---|---|---|

## Next Step
Lire `mesures.json`, commiter le reste du lot G, écrire `BRIEF-AUDIT.md`, lancer le workflow.
