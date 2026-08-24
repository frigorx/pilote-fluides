# Plan — Animer la branche Impact environnemental (réseau Législation)

## Goal
Rendre animées les illustrations qui le méritent dans les 5 stations de la
sous-ligne Impact environnemental (`impact-prp-odp`, `impact-tewi`,
`impact-acv-carbone`, `impact-ecoconception`, `impact-montreal-kigali`),
selon `legislation/CONSIGNES-ANIMATION.md`, sans casser le professeur vocal
ni la lisibilité sans mouvement. Branche validée par F. Henninot le 24/08/2026.

## Contexte fixe
- Couleur d'accent de la sous-ligne : `#047857`.
- 40 SVG fixes (8 par station). Toutes ne gagnent pas à bouger.
- Le `data-narration` de chaque écran est le scénario de l'animation.
- Contrat du professeur vocal : `#listen`, `#next`, `#prev`, `#start`,
  `#stop-voice`, `.slide.active` — ne jamais renommer.
- Charte Design : projet « Charte graphique inerWeb »
  (`1394c5be-3bc5-441f-93d9-251c89f48ba8`), rien à resynchroniser.
- ⚠️ Connexion Design non accordée : attendre `/design consent` de F. Henninot.

## Phases

### Phase 1 — Relecture et tri écran par écran
**Status:** complete
- [x] Extraire écrans, SVG et narrations des 5 stations (script scratchpad)
- [x] Juger, écran par écran, ce qui gagne à bouger (critères des consignes)
- [x] Écrire la liste retenue dans findings.md avec le scénario de chacune

### Phase 2 — Annonce du coût à F. Henninot
**Status:** complete
- [x] Chiffrer : 19 pièces fermes + 3 facultatives, ~6 allers-retours Design
- [x] Feu vert reçu le 24/08 (« passe par Claude Design ») ; arbitrage retenu :
      19 fermes seules ; « améliorer le rendu » = rehausser SANS réinventer

### Phase 3 — Production Design, branche par branche
**Status:** in_progress
- [x] Projet Design créé : « Législation — Animations Impact environnemental »
      (`78a71ea1-d37d-40bb-bc59-638296de8064`), lié à la charte inerWeb
- [x] Station pilote PRP & ODP : 4 SVG animés (SMIL autonome, état repos = image
      finale, boucle 12-14 s) + page de validation avant/après à SVG inline
- [x] Vérifications : chargement, chevauchements texte/mobile à 10 instants,
      séquences et gonflement mesurés — voir progress.md
- [x] Direction graphique VALIDÉE par F. Henninot le 24/08 (« ok je valide »)
- [x] Les 4 autres stations produites (24/08) : 15 SVG animés dans
      svg-proposes/{tewi,acv,ecoconception,montreal-kigali}/ + 4 pages de
      validation inline dans le projet Design, toutes vérifiées (sondes
      chevauchement/séquence en local + rendu Design contrôlé)
- [ ] Relecture des 19 animations par F. Henninot (corrections en une salve)

### Phase 4 — Réintégration côté Code
**Status:** pending
- [ ] Remplacer chaque SVG à nom de fichier constant
- [ ] Vérifier le texte alternatif de chaque pièce animée
- [ ] Contrôle orphelins : tout SVG de chaque dossier svg/ référencé par index.html

### Phase 5 — Vérification navigateur (port 8123)
**Status:** pending
- [ ] Chaque animation : part, boucle ou s'arrête proprement
- [ ] Aucun chevauchement texte/tracé PENDANT le mouvement
- [ ] Lisible avec mouvement désactivé (prefers-reduced-motion)
- [ ] Professeur vocal intact ; rendu 375 px ; impression complète

### Phase 6 — Voix Piper de la branche
**Status:** pending
- [ ] `build/voix/collecter-narrations.mjs` puis `generer-audios-piper.py`
- [ ] Réduire l'index aux stations de la branche (Piper local uniquement)

### Phase 7 — Publication et vérification en ligne
**Status:** pending
- [ ] Commit, push, attendre le déploiement
- [ ] Vérifier le SITE servi (jamais le seul dépôt) ; mettre à jour PROMPT-REPRISE.md

## Next Step
Attendre la relecture de F. Henninot sur les 5 pages de validation Design
(corrections EN UNE SALVE), puis Phase 4 : réintégrer les 19 SVG depuis
`svg-proposes/<station>/` dans `legislation/stations/impact-*/svg/` (mêmes
noms de fichiers), mettre à jour les alt, contrôle orphelins — jamais depuis
les copies du projet Design (assainies).

## Decisions Made
| Date | Décision |
|---|---|
| 24/08 | Branche Impact environnemental validée par F. Henninot comme première branche |
| 24/08 | Plan de chantier posé dans `.planning/` du dépôt (hors pages servies) |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| Affichage `<\strong>` dans un résultat de recherche | 1 | Fausse alerte : artéfact d'affichage de l'outil, fichier propre vérifié |
| ⚠️ Claude Design ASSAINIT les .svg à l'écriture : `<animate>`/`<style>` retirés du stockage même | 1 | Sources SVG animées gardées EN LOCAL (`svg-proposes/`), page de validation avec SVG INLINE dans le HTML (non assaini). Règle pour toutes les stations suivantes |
| Timeline SMIL figée à 0 dans l'onglet de contrôle | 1 | Onglet masqué (`document.hidden`) : Chrome suspend l'horloge. Contrôler par `setCurrentTime` ; en onglet visible ça tourne |
