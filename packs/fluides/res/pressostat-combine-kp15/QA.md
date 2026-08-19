# Contrôle qualité

Date : 19 août 2026.

## Résultats

- génération : 16 étapes, 8 questions, 1 page autonome ;
- QA statique : 62 contrôles réussis ;
- QA navigateur : 593 contrôles réussis ;
- formats : 1366 × 768, 1024 × 768, 390 × 844 et 360 × 640 ;
- 25 écrans parcourus sur chaque format ;
- aucune erreur console ;
- aucune requête distante ;
- aucune voix au chargement ;
- aucun défilement de page ni débordement des cartes ;
- images Claude locales chargées avec texte équivalent ;
- interactions testées : mécanisme, logique ET, cycle BP, calcul BP, cycle HP et RESET, bornes B/D, réglages, banc azote et trois cycles.

Captures : `_qa/screens/`.

## Verrous métier contrôlés

- quatre conducteurs actifs A/B/C/D plus PE ;
- A ligne, C charge, B signal BP, D signal HP ;
- absence de transposition 1–2–4 ;
- BP automatique et HP manuel maximum pour 060-126491 ;
- DIFF BP et DIFF HP présentés avec leurs deux sens ;
- essai LP et HP séparé ;
- aucun démarrage du compresseur sous azote ;
- limites compresseur prioritaires sur l’obtention du basculement.

La QA technique ne constitue pas le bon à tirer métier ou pédagogique.
