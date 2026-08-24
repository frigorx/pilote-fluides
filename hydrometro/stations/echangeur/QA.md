# QA — Station Échangeur

- architecture actuelle : explication avant manipulation, entraînement sans score ; l’ancienne banque de questions n’est plus affichée dans la station et alimente l’évaluation finale de ligne.
## Recette technique du 23 août 2026

- quatre piquages, circuits séparés, sens, encrassement et mesures contrôlés ;
- réponses verrouillées, corrections argumentées, SVG accessibles et aucune dépendance distante ;
- aucun débordement aux quatre formats requis et aucune erreur de console observée ;
- contrôle automatisé inclus dans `../../lignes/E/qa.mjs`.

Une passe humaine au clavier réel et sur appareil tactile reste requise. La revue métier doit
confirmer les sens selon le cas réel, les limites du modèle d’encrassement, le pincement et
l’interprétation de la pression différentielle.
