# QA — Boucle

## Contrôles exécutés le 23 août 2026

- [x] ressources relatives, aucune dépendance réseau et tous les fichiers servis en 200 ;
- [x] boutons natifs, focus visible, interaction par activation sémantique et cible tactile ;
- [x] 8 étapes formatives : explications, démonstrations, animation du trajet, entraînement et synthèse ;
- [x] 5 séquences visuelles déclenchées uniquement par clic, avec texte équivalent visible ;
- [x] exercice guidé bloquant avant la synthèse, ordre exact `Production → Départ → Émetteur → Retour`, indice et solution sans score ;
- [x] ancien questionnaire masqué ; poursuite vers Énergie puis station Évaluation unique de la ligne P ;
- [x] SVG avec titre, description, repères textuels, flèches et styles de trait distincts ;
- [x] voix facultative branchée sur un bouton, arrêt explicite, aucune lecture automatique et repli écrit permanent ;
- [x] aucun stockage navigateur ;
- [x] recette automatisée complète aux formats 1366×768, 1024×768, 390×844 et 360×640 : **4/4 réussis**, sans débordement de page ni erreur applicative ;
- [x] inspection visuelle de 1366×768 et 360×640 ; retour tactile permanent au plan par le logo HydroMétro.

Commande multi-écrans :

```powershell
$env:NODE_PATH='C:\Users\henni\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules'
node tests\qa-boucle-formative.mjs
```

## Statut

QA technique réussie. Le navigateur d’essai a servi les fichiers depuis `127.0.0.1:8768` : l’ouverture par double-clic reste à confirmer humainement, comme la qualité de la voix système et le tactile sur appareils réels. Cette QA ne vaut pas validation métier ou pédagogique.
