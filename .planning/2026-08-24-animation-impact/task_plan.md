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
**Status:** complete
- [x] 19 SVG remplacés à noms constants (depuis svg-proposes/)
- [x] 2 alt mis à jour (mecanisme-odp : entaille+coche ; mecanisme-prp : sol)
- [x] Contrôle orphelins : zéro orphelin sur les 5 stations

### Phase 5 — Vérification navigateur (port 8123)
**Status:** complete
- [x] Chevauchements texte/mobile : sondés à 12 instants par pièce (Phase 3)
- [x] 5 stations : 12 images chargées chacune (SMIL parse en <img>),
      contrat vocal complet (#listen #next #prev #start #stop-voice), 12 écrans
- [x] État au repos = image finale par construction (impression et
      prefers-reduced-motion couverts)

### Phase 6 — Voix de la branche
**Status:** blocked — DÉCISION FRANCK REQUISE
- 🔴 Piper : modules Python absents de l'environnement, ET voix jugée
  métallique par le diagnostic du 21/08 (réseau technique)
- 🔴 edge-tts : qualité validée (Denise/Vivienne) MAIS le texte part chez
  Microsoft → feu vert séparé OBLIGATOIRE avant de lancer
- En attendant : voix du navigateur (comportement inchangé, rien de cassé)

### Phase 7 — Publication et vérification en ligne
**Status:** in_progress
- [x] Commit ciblé `eaaf8b7` (legislation/ + .planning/ seuls ; fichiers du
      chantier tiers manifold non touchés), poussé sur main
- [x] PROMPT-REPRISE.md à jour (branche animée, piège Design, décision voix)
- [x] SITE servi vérifié (fetch cache:reload + cache-buster) : les 5 stations
      renvoient leurs SVG avec <animate> sur inerweb.fr

## Bilan de branche — 24/08/2026
La sous-ligne Impact environnemental est la PREMIÈRE BRANCHE ANIMÉE du réseau :
19 illustrations animées validées, réintégrées, publiées et vérifiées en ligne.
Reste ouvert : la décision voix (Piper vs edge-tts, feu vert séparé requis)
et le choix de la branche suivante (La DESP proposée par les consignes).

## Next Step
Confirmer le déploiement sur inerweb.fr (fetch cache:reload d'un SVG animé,
chercher <animate). Puis : décision voix par Franck (Piper vs edge-tts) et
choix de la branche suivante (La DESP proposée par les consignes).

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
