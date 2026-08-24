# QA — Station Vase d’expansion

- architecture actuelle : explication avant manipulation, entraînement sans score ; l’ancienne banque de questions n’est plus affichée dans la station et alimente l’évaluation finale de ligne.
## Recette technique du 23 août 2026

- dilatation, membrane, précharge et cas fictif testés aux bornes des curseurs ;
- limites, verrouillage, SVG accessibles et absence de stockage ou dépendance contrôlés ;
- aucun débordement aux quatre formats requis et aucune erreur de console observée ;
- contrôle automatisé inclus dans `../../lignes/E/qa.mjs`.

Une passe humaine au clavier réel et sur appareil tactile reste requise. La validation métier doit
confirmer les conditions de contrôle, la pression statique, la précharge, le dimensionnement,
l’implantation et la sécurité. La simulation ne décrit pas une intervention complète.
