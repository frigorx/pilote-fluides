# QA — Station Pertes de charge

- architecture actuelle : explication avant manipulation, entraînement sans score ; l’ancienne banque de questions n’est plus affichée dans la station et alimente l’évaluation finale de ligne.
## Recette technique du 23 août 2026

- unités, calcul `Δp = KQ²`, familles régulière/singulière et bornes des curseurs contrôlés ;
- verrouillage, corrections argumentées, SVG accessibles et absence de stockage vérifiés ;
- aucun débordement aux quatre formats requis et aucune erreur de console observée ;
- contrôle automatisé inclus dans `../../lignes/E/qa.mjs`.

Une passe humaine au clavier réel et sur appareil tactile reste requise. La validation métier doit
confirmer les limites du modèle quadratique, la méthode de mesure et la distinction entre
coefficient pédagogique, abaque et calcul de projet.
