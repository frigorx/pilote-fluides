# QA — Station Production

- architecture actuelle : explication avant manipulation, entraînement sans score ; l’ancienne banque de questions n’est plus affichée dans la station et alimente l’évaluation finale de ligne.
## Recette technique du 23 août 2026

- structure hors ligne, chemins relatifs et absence de dépendance distante contrôlés ;
- interactions, verrouillage des réponses, correction argumentée et niveaux TP/BTS contrôlés ;
- SVG titrés, décrits et accompagnés d’un texte équivalent ;
- absence de stockage, de donnée nominative, de son et d’autoplay ;
- aucun débordement aux formats 1366×768, 1024×768, 390×844 et 360×640 ;
- contrôle automatisé inclus dans `../../lignes/E/qa.mjs`.

Les contrôles clavier natifs et le focus visible sont présents. Une passe humaine au clavier réel
et sur appareil tactile reste requise, ainsi que la validation métier hydraulique et pédagogique.
