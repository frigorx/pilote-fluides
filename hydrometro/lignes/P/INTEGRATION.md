# Intégration centrale — Ligne P

## Réalisé le 23 août 2026

- le filtre P affiche `Parcours complet Ligne P` et ouvre `lignes/P/parcours.html` ;
- les six stations P ouvrent directement leur module autonome depuis la carte ;
- Débit reste la correspondance unique avec E et Mesurer la correspondance unique avec M ;
- le bouton `Retour HydroMétro` du parcours et les liens `Plan` des stations reviennent au moteur ;
- les chemins et statuts sont contrôlés par le registre hors ligne `modules.js` et la QA racine.

## Limites

Le raccordement ne vaut ni bon à tirer métier ou pédagogique, ni publication, ni indexation RAG.
À ce jalon P, les stations D/M conservaient leur cadrage dans le moteur principal. Elles sont
désormais développées et raccordées ; `modules.js`, `README.md` et `_ETAT.md` portent l’état courant.
