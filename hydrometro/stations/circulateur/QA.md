# QA — Station Circulateur

- architecture actuelle : explication avant manipulation, entraînement sans score ; l’ancienne banque de questions n’est plus affichée dans la station et alimente l’évaluation finale de ligne.
## Recette technique du 23 août 2026

- courbes pompe et réseau, intersection et réglages testés aux bornes des curseurs ;
- unités, explication du point de fonctionnement, réponses verrouillées et SVG contrôlés ;
- aucun débordement aux quatre formats requis et aucune erreur de console observée ;
- contrôle automatisé inclus dans `../../lignes/E/qa.mjs`.

Une passe humaine au clavier réel et sur appareil tactile reste requise. La validation métier doit
confirmer le modèle de courbes, la formulation sur les boucles fermées et les limites relatives au
rendement, au NPSH et à la cavitation. Cette QA ne vaut pas sélection de pompe.
