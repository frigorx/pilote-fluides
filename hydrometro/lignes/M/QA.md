# QA — Ligne M

## Périmètre attendu

- sept jalons dans l’ordre `mesurer → releves → equilibrage → tampon → decouplage → diagnostic → mission` ;
- cinq stations M propriétaires et deux correspondances non dupliquées ;
- 12 activités : 3 lectures, 3 classements/applications, 2 mesures/calculs, 2 causes-effets, 2 décisions/mini-diagnostics ;
- bilan `ACQUIS`, `FRAGILE` ou `À RENFORCER` et remédiations directes ;
- réponses verrouillées, corrections argumentées et cinq familles essentielles ;
- aucun stockage, média automatique, dépendance distante, publication ou indexation.

## Résultats exécutés le 23 août 2026

- `node lignes/M/qa.mjs` : **164 contrôles réussis sur 164** ;
- `node tests/qa.mjs` depuis la racine HydroMétro après raccordement central : **201 contrôles réussis sur 201** ;
- syntaxe JavaScript : tous les moteurs de station, contenus, parcours M et script QA acceptés par `node --check` ;
- parcours complets : 50 états de stations et 13 états de ligne contrôlés à `1366×768`, `1024×768`, `390×844` et `360×640` ;
- contrôle strict des contenus internes : 63 états sans rognage à `360×640` ; 63 états à `1024×768`, avec trois débordements natifs de curseur détectés, corrigés puis revérifiés sans échec ;
- scénarios d'évaluation : `12/12 → ACQUIS`, `9/12` avec une famille essentielle absente `→ FRAGILE`, `0/12 → À RENFORCER` ;
- correspondances : ouverture réelle de `mesurer` (ligne P) et `equilibrage` (ligne D, QA technique), sans duplication ;
- intégration centrale : filtre M, sept stations jouables, parcours complet et retours visités vérifiés ;
- console du navigateur : aucune erreur ni alerte pendant la recette finale.

Cette QA est technique. Elle ne vaut ni validation métier/pédagogique, ni bon à tirer, ni validation sur appareil Apple réel.
