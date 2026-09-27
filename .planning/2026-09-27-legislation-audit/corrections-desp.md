# Corrections — branche La DESP — 27/09/2026

## desp-la-directive
- Header `index.html` (12-18) et `FOND.md` (7-9, 110-112) : « non ouvertes,
  non liées » corrigé — les 4 autres stations existent et sont reliées.
- `svg/ps-reference.svg` : deux légendes (écran 6) débordaient de leur
  encadré (380 px) ; coupées en deux lignes par `<tspan>`.
- Quiz rééquilibré (Q2, Q3, Q4) : bonne réponse systématiquement la plus
  longue (jusqu'à +29 car.) ; resserré à ≤ 5 car. d'écart. Positions déjà
  bonnes (2-4-1-3). `FOND.md` synchronisé.

## desp-categories
- Header `index.html:13` et `FOND.md:3` : sous-ligne corrigée
  « Fluidique & thermique » → « La DESP ».
- Commentaire maillage et texte visible : « pas encore ouvertes » /
  « en préparation avec les autres » corrigés (seule NF EN 378 reste en
  préparation).
- `FOND.md` : statut voix corrigé (« aucun audio fabriqué » → fabriqué le
  02/09/2026, edge-tts), incohérent avec le header `index.html`.
- Quiz rééquilibré (4 questions, écarts jusqu'à +32 car.) ; positions déjà
  bonnes (3-1-4-2), inchangées. `FOND.md` synchronisé.

## desp-marquage-papiers
- Header `index.html:14-16` et `FOND.md:5-7` : « la seule construite pour
  l'instant » (faux, contredit par les 4 autres) corrigé.
- `FOND.md:175-177` : lien `legislation/index.html` déclaré absent alors
  qu'il existe (ligne 325) — corrigé. Statut voix corrigé (même incohérence
  que desp-categories).
- Quiz rééquilibré ET repositionné : la bonne réponse était toujours en
  position b ou c (jamais a ni d) — désormais 2-4-1-3. Écarts de longueur
  ramenés à ≤ 5 caractères. `FOND.md` synchronisé.

## desp-en-service
- Écran 3 : texte visible, `alt` et `figcaption` complétés pour couvrir ce
  que la narration ajoutait seule (périodicités différentes selon la
  catégorie, vérification de la résistance de l'enveloppe) — **narration
  non touchée**, son MP3 reste valide. `FOND.md` synchronisé.
- Quiz rééquilibré (Q1, Q3, Q4) ; positions déjà bonnes (2-3-4-1),
  inchangées. `FOND.md` synchronisé.

## desp-soupapes-securites
- 🔴 Header `index.html:16-18` et `FOND.md:5-8` : affirmation fausse
  (« première construite, les 4 autres n'ont pas d'index.html ») retirée.
- **Pressostat de sécurité (écran 7)** : texte, tableau `svg/comparatif-
  accessoires.svg` (cellule + `desc`) et `data-explication` de la question 2
  corrigés — un pressostat de *sécurité* est à réarmement **manuel** (le
  technicien vérifie la cause avant de réarmer), à la différence d'un
  pressostat de *régulation* qui se referme seul. Void le point ci-dessous :
  à confirmer par F. Henninot.
- Quiz rééquilibré (Q1, Q2, Q4) ; positions déjà bonnes (2-3-1-4),
  inchangées. `FOND.md` synchronisé partout, y compris l'explication Q2.

## Narrations modifiées (perte MP3, à refabriquer)
- **desp-soupapes-securites, écran 7** : narration réécrite pour ne plus
  dire que « la soupape et le pressostat se referment d'eux-mêmes » (faux
  pour le pressostat de sécurité). C'est la seule narration touchée dans
  toute la branche.

## Non touché (hors périmètre du brief)
- `VALEURS-A-VALIDER-DESP.md` : aucune valeur intégrée, conforme à la
  consigne.
- `legislation/index.html` (hors des 5 dossiers stations) : non modifié.
- SVG : scan des 40 fichiers ; aucun autre débordement au-delà de
  `ps-reference.svg`.

## Ce qui reste pour F. Henninot
1. **Confirmer le réarmement manuel du pressostat de sécurité**
   (desp-soupapes-securites, écran 7) : correction faite à un degré de
   certitude modéré (l'audit le notait déjà) — à valider avant diffusion.
2. Arbitrer les valeurs de `VALEURS-A-VALIDER-DESP.md` (seuil PS > 0,5 bar,
   tarage à 10 %, périodicités, durées de conservation) puis les faire
   intégrer, datées, dans les 5 stations.
3. Référentiel BTS (tâches professionnelles et savoirs associés, avec
   codes) non renseigné dans les 5 stations — à faire avant tout envoi à
   Claude Design.
4. Faire refabriquer l'audio (Piper/edge-tts) de l'écran 7 de
   desp-soupapes-securites, seule narration modifiée.
5. `legislation/index.html` affiche « PS > 0,5 bar » sans arbitrage — à
   traiter séparément (hors des 5 stations DESP).
