# Reprise technique

## Source de vérité du brouillon

Ce dossier est autonome. Il ne remplace pas les modules déjà présents dans `C:\git\pilote-fluides` et n’est pas encore une version canonique.

## Où il est parti (18 août 2026)

Copié dans `C:\git\pilote-fluides\packs\fluides\res\parcours-manometres\`, après les
corrections de relecture consignées dans `QA.md`.

Déposé **non branché** et **sans revendiquer un seul code** : sa `couverture.json` déclare
tout en `appui`. Deux cours du dépôt traitent déjà le même sujet et portent la preuve de
couverture — `pression-temperature-interactive` (1.02, 1.03) et
`surchauffe-sous-refroidissement-interactif` (5.05, 4.05, 1.03, 1.06). Compter les codes
deux fois affaiblirait le registre au lieu de le renforcer.

Le registre le signale donc comme orphelin, et c'est voulu. Il le restera tant que Franck
n'a pas tranché : remplacer les deux cours en place, cohabiter avec eux sur des fiches
différentes, ou rester un entraînement hors parcours.

## Architecture

- `index.html` : portail des deux modules ;
- `module-1-pression-temperature/` : Croix du Frigoriste, relation P/T, lecture des cadrans, identification et incondensables ;
- `module-2-surchauffe-sous-refroidissement/` : choix des points et des formules, calculs, mission complète, évaluation sur 20 et mémo final ;
- `shared/thermo-core.js` : tables P/T statiques contrôlées, interpolation locale et conversions pression relative/absolue ;
- `shared/gauge.js` : rendu SVG des cadrans BP/HP ;
- `shared/circuit.js` : Croix du Frigoriste construite avec les symboles validés ;
- `shared/module-engine.js` : navigation, voix facultative et progression ;
- `shared/calculator.js` : calculatrice locale sans `eval` ;
- `shared/symboles/` : copies inchangées des symboles sources ;
- `briques/<nom>/index.html` : les cinq briques indépendantes. Chacune pose
  `data-brique` sur `<html>` ; l'`app.js` du module parent y lit la tranche
  d'étapes à servir. Aucune duplication de contenu, donc aucune divergence possible ;
- `tests/qa.mjs` : contrôles structurels, thermodynamiques et multi-écrans, parcours
  entier et cinq briques.
- `QA.md` : résultats reproductibles et points restant soumis au bon à tirer humain.

## Contrats pédagogiques

- BP : température de rosée lorsqu’un mélange zéotrope est utilisé ;
- HP : température de bulle lorsqu’un mélange zéotrope est utilisé ;
- pression affichée sur les cadrans : pression relative ;
- conversion interne : pression absolue = pression relative + pression atmosphérique ;
- les valeurs d’un scénario sont cohérentes entre elles et ne sont jamais tirées indépendamment ;
- les tolérances de lecture dépendent de la plus petite graduation visible ;
- la calculatrice ne choisit ni les mesures ni la formule ;
- une brique se découpe par tranche d'étapes, jamais par copie de contenu.
- toutes les étapes restent accessibles sans imposer la réussite des précédentes ; les corrections demeurent disponibles pour l’entraînement.

## Voix

La synthèse du navigateur ne démarre jamais seule. Le texte prononcé est intégralement visible. L’absence de voix ne bloque aucune activité.

## Bon à tirer

Avant intégration : vérifier humainement le vocabulaire « surchauffe totale » et « sous-refroidissement total », les points de mesure retenus et les valeurs des scénarios. Après validation seulement, décider du dépôt cible, de l’intégration au catalogue et de l’indexation RAG.
