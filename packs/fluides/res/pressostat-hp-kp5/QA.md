# Contrôle qualité

## Contrôles prévus

- génération depuis les sources avec `node build.mjs` ;
- compilation JavaScript des sources et des scripts intégrés ;
- absence de CDN, de requête distante, de thème sombre et d’autoplay vocal ;
- serveur de prévisualisation limité à `127.0.0.1:18766` ;
- présence des trois relations HP et de l’inversion électrique 1–2 / 1–4 ;
- intégration réelle des symboles SVG validés ;
- parcours complet de 25 écrans sur `1366×768`, `1024×768`, `390×844` et `360×640` ;
- absence de débordement, de défilement et d’erreur console ;
- interaction sur mécanisme, zone neutre, calcul, contacts, limite haute, face KP5, banc azote et répétabilité.

## Commandes

```powershell
node build.mjs
node tests/qa.mjs
node tests/browser-qa.mjs
```

## Résultats du 19 août 2026

- génération : réussie, `16` étapes + `8` questions + `1` bilan ;
- QA statique : `46` contrôles réussis ;
- QA navigateur : `649` contrôles réussis ;
- formats : `1366×768`, `1024×768`, `390×844`, `360×640` ;
- erreurs console : `0` ;
- requêtes distantes : `0` ;
- débordements ou défilement dans une étape : `0`.

Les captures sont générées dans `_qa/screens/` et restent des fichiers de contrôle, pas des sources du module.

## Bon à tirer restant

La QA technique ne remplace pas :

- la validation métier de la procédure d’essai en fonctionnement ;
- la relecture pédagogique écran par écran ;
- l’écoute humaine de la voix système ;
- l’accord explicite avant publication ou indexation RAG.
