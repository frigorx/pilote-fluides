# QA — Débit

- architecture actuelle : explication avant manipulation, entraînement sans score ; l’ancienne banque de questions n’est plus affichée dans la station et alimente l’évaluation finale de ligne.
## Contrôles exécutés le 23 août 2026

- [x] calcul du point de fonctionnement sans `NaN` ;
- [x] conversion `2,30 m³/h → 38,4 L/min` ;
- [x] plage cible atteinte à pompe 90 % et réseau 80 % ;
- [x] courbes pompe/réseau et point visibles ;
- [x] commandes `range` natives, focus visible et cible tactile ;
- [x] quatre formats sans défilement, ressources locales uniquement.

## Statut

QA technique réussie. Clavier/tactile réels et ouverture par double-clic restent à confirmer humainement. Courbes constructeur non simulées.
