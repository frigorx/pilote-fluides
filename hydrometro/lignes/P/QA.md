# QA — Ligne P Principes

## Contrôles exécutés le 23 août 2026

- [x] les six identifiants ouvrent leur station autonome ;
- [x] Débit affiche la correspondance E et Mesurer la correspondance M ;
- [x] progression et objectifs TP/BTS distincts ;
- [x] 12 activités : 3 lectures, 3 applications, 2 calculs, 2 causalités, 2 décisions ;
- [x] trois SVG recomposés avec titre et description ;
- [x] réponses verrouillées et corrections expliquées ;
- [x] `12/12 → acquis`, `9/12 sans puissance → fragile`, `0/12 → à renforcer` ;
- [x] renvois vers les stations en erreur ;
- [x] aucun stockage, aucune voix ou lecture automatique ;
- [x] ressources locales, réponses HTTP 200 et zéro erreur console ;
- [x] 1366×768, 1024×768, 390×844 et 360×640 sans défilement ni contenu tronqué.
- [x] parcours P accessible depuis le filtre de la carte et retour HydroMétro vérifié ;
- [x] registre central synchronisé avec les six manifestes P.

## Statut

QA technique réussie. La QA racine intégrée passe 163 contrôles sans échec. L’ouverture `file://`
n’a pas pu être automatisée car le navigateur d’essai la bloque ; les chemins relatifs ont été
contrôlés. Clavier/tactile réels et validations métier/pédagogique restent obligatoires.
