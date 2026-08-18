# Parcours manomètres et circuit frigorifique

Brouillon autonome inerWeb Édu composé de deux modules :

1. **Pression et température** — identifier les quatre organes et leurs fonctions, puis lire de vrais cadrans BP/HP sur la Croix du Frigoriste.
2. **Surchauffe et sous-refroidissement** — choisir les points et les formules, calculer les quatre écarts, puis obtenir une note sur 20.

## Deux formes au choix

**Le parcours entier** — `index.html`. Les deux modules à la suite, pour une révision
ou un projet de fin de chapitre : il traverse le circuit, l'instrument et le calcul.

**Cinq briques indépendantes** — sous `briques/`. La même matière, découpée pour se
glisser dans une séance qui n'a besoin que d'un morceau :

| Brique | Étapes | Contenu |
|---|---|---|
| `circuit-quatre-organes` | 7 | Croix du Frigoriste, rôle de chaque organe, côté BP et côté HP |
| `lire-un-manometre` | 6 | aiguille, deux échelles, pression relative et absolue, série de six lectures |
| `diagnostic-pression-temperature` | 2 | identifier un fluide, suspecter des incondensables |
| `surchauffe-sous-refroidissement` | 7 | point de mesure, formule, calcul, rosée et bulle sur zéotrope |
| `mission-releve-et-calculs` | 4 | deux cadrans, quatre écarts, évaluation notée sur 20 |

Une brique n'est pas une copie : c'est une tranche du même fichier d'étapes. Corriger
une faute la corrige dans les deux formes. Dupliquer une étape pour fabriquer une
brique ferait diverger les deux formes au premier correctif.

## Ouvrir

Double-cliquer sur `LANCER.cmd`, puis ouvrir l’adresse affichée si le navigateur ne s’ouvre pas automatiquement.

Le parcours fonctionne aussi en ouvrant directement `index.html`. Le petit serveur local est toutefois conseillé pour un comportement identique dans tous les navigateurs.

## État

- brouillon de travail du 18 août 2026 ;
- aucune publication GitHub ;
- aucune indexation RAG avant bon à tirer explicite ;
- aucun CDN ni appel réseau pendant l’utilisation ;
- navigation libre entre les étapes ; seule la préférence de vitesse vocale est conservée dans le navigateur.

## Sources réemployées

- dessin des cadrans adapté de `manometres_v5.html`, dépôt public `frigorx/Iner.web-tools-beta` ;
- tables P/T statiques contrôlées séparément, sans dépendance en ligne ;
- contenus pression–température et surchauffe/sous-refroidissement issus des modules Pilote Fluides existants ;
- symboles SVG issus de la bibliothèque inerWeb ;
- logo conforme à la référence inerWeb figée.

Voir `SOURCES.md` et `REPRISE.md` pour le détail.

## Contrôle

Les deux parcours ont été joués intégralement et contrôlés sur quatre formats d’écran, sans erreur JavaScript ni requête externe. Le détail et les limites du contrôle sont consignés dans `QA.md`.
