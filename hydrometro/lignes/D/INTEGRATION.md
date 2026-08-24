# Intégration centrale — Ligne D

## État

**Intégration exécutée le 23 août 2026**, après demande explicite de Franck de conserver et raccorder les stations dans le projet HydroMétro.

## Modifications centrales exécutées

1. ajout des cinq stations propriétaires D au registre hors ligne `../../modules.js` ;
2. ajout du parcours `lignes/D/parcours.html` à la table des lignes dans `../../modules.js` ;
3. mise à jour des libellés et du casse-cache dans `../../index.html` ;
4. extension de `../../tests/qa.mjs` aux cinq manifestes D, au manifeste de ligne et aux retours `#visited=` ;
5. mise à jour de `../../README.md`, `../../_ETAT.md` et `../../QA.md` après recette.

`../../app.js` n’a pas nécessité de modification : son rendu et sa navigation sont déjà pilotés par le registre `modules.js`.

## Contraintes de la future intégration

- `stations/pertes/` reste le module unique propriétaire de la ligne E ; la ligne D le référence par `../../stations/pertes/index.html` sans copie ni modification ;
- `stations/equilibrage/` est la correspondance D/M et reste un dossier unique ;
- les statuts de la carte doivent refléter les manifestes, sans présenter la QA technique comme validation métier ;
- ne publier et ne lancer aucune indexation RAG sans bon à tirer explicite de Franck.

## Fichiers centraux touchés par l’intégration

- `../../modules.js` ;
- `../../index.html` ;
- `../../tests/qa.mjs` ;
- `../../README.md` ;
- `../../_ETAT.md` ;
- `../../QA.md`.

Aucun fichier des lignes P/E, de `stations/pertes/` ou de `rag/` n’a été modifié.
