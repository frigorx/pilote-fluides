# Pose et dépose du manifold 2 voies

Module autonome inerWeb Édu consacré à la pose, à la lecture et à la dépose d’un manifold à deux robinets sur deux vannes de service Rotolock.

## Objectifs

À l’issue du parcours, l’élève doit pouvoir :

- distinguer les deux robinets du manifold et ses trois flexibles munis de mini-vannes quart de tour ;
- expliquer pourquoi un fluide sous pression peut provoquer une projection et une brûlure par le froid ;
- choisir lunettes et gants de protection contre le froid en reliant chaque protection au risque ;
- identifier le fluide à partir de la plaque, du dossier et de la FDS, puis vérifier les limites fabricant du matériel ;
- identifier BP, HP et voie centrale de service ;
- distinguer les prises `P` et `P1` des vannes Rotolock ;
- expliquer les positions siège arrière, intermédiaire et siège avant ;
- préparer les vannes en répétant `desserrer légèrement le presse-étoupe → manœuvrer le carré → resserrer le presse-étoupe`, raccorder le manifold, ouvrir les mini-vannes et vider ses lignes ;
- mettre les vannes en position de lecture sans ouvrir inutilement les robinets du manifold ;
- isoler la HP, couper l’alimentation liquide avec l’organe prévu au poste, récupérer le fluide des flexibles par l’aspiration et suivre son retour vers le stockage liquide ;
- isoler la BP, vérifier la stabilisation, fermer les mini-vannes, déconnecter, remettre les bouchons, rétablir l’alimentation liquide et rechercher les fuites sur les quatre points manipulés ;
- reconstruire l’ordre des phases et réaliser le parcours numérique en autonomie.

## Parcours disponibles

1. `Six fiches métier animées` : 128 gestes répartis entre pose, dépose avec EVM, mise sous pression à l’azote, tirage au vide, charge et récupération de fluide.
2. `Parcours complet` : onze écrans d’explication illustrés, manipulation guidée, puis évaluation.
3. `Manipulation guidée` : 78 gestes directs sur le poste virtuel, dont cinq décisions de sécurité avant le premier raccordement et une dépose complète sans rejet volontaire.
4. `Évaluation` : QCM de 19 questions aux choix remélangés à chaque série, mini-jeu d’ordre remélangé à chaque partie et parcours autonome.
5. `Guide atelier` : guidance écran par écran et version imprimable à cases de contrôle.

## Six fiches métier animées

Ouvrir `fiches-metier.html` ou utiliser l’entrée mise en avant dans `index.html`. Chaque fiche propose trois niveaux complémentaires :

- `Découvrir` : la cible du geste est montrée et expliquée ;
- `S’entraîner` : l’élève cherche seul et peut demander un repère ;
- `Confirmer` : aucun repère n’est affiché et le premier essai juste est compté.

Les six fiches utilisent un manifold 2 voies et des équipements SVG locaux. L’élève agit sur l’organe réellement concerné, au clic ou au clavier, puis lit le résultat avant de poursuivre. Une action concrète est demandée par écran.

| Fiche | Objet | Gestes |
|---|---|---:|
| 01 | Pose des manomètres | 27 |
| 02 | Dépose avec électrovanne | 23 |
| 03 | Mise sous pression à l’azote | 16 |
| 04 | Tirage au vide | 15 |
| 05 | Charge de l’installation | 17 |
| 06 | Récupération du fluide frigorigène | 30 |
| **Total** |  | **128** |

La comparaison détaillée avec les six fiches Word sources et les points métier non généralisés se trouve dans `COMPARAISON-FICHES-METIER-2-VOIES.md`.

## Vanne Rotolock réutilisée

Le module réutilise la production fournie dans :

`C:\Users\henni\Desktop\inerweb full ia\vanne-rotalock-pedagogique\animation-technique.html`

La vue de reconnaissance reprend le rendu local `../vanne-service-interactive/vanne-3d.webp`. Les coupes sont reconstruites dans `visuals.js` à partir des schémas manuels antérieurs pour rendre explicite la correction métier suivante : **P est placée après le siège arrière ; le pointeau au siège arrière bloque donc la voie P**. P1 reste côté circuit et peut rester sous pression.

La clé de service est toujours représentée dans une zone distincte, hors du dessin de la vanne. Elle n’est jamais superposée au corps, au pointeau ou aux passages internes.

## Principe de lisibilité

Chaque geste affiche uniquement l’équipement utile : une Rotolock, le manifold, les flexibles ou la pompe. La vue d’ensemble des raccordements est conservée comme écran de synthèse séparé. Les visuels restent des schémas de principe ; la validation sur le matériel réel demeure obligatoire.

La configuration pédagogique retenue comporte une mini-vanne quart de tour sertie à l’extrémité de chacun des trois flexibles. La réglementation exige de connecter et déconnecter les jauges et les lignes en produisant le minimum d’émissions ; elle ne désigne pas, dans le texte consulté, un modèle précis de mini-vanne. Le module représente donc le matériel réel défini pour ce plateau et relie son usage à l’objectif réglementaire de réduction des émissions.

## Fonctionnement

Ouvrir `index.html` dans un navigateur récent. Aucun compte, réseau, CDN ou serveur n’est nécessaire. La suite de fiches fonctionne aussi directement par `fiches-metier.html`.

## Statut

Brouillon métier du 13 août 2026. Le portail possède déjà une entrée vers `index.html` ; les six fiches sont accessibles depuis cet accueil, sans nouvelle carte. Cette extension n’a pas été indexée dans le RAG, poussée ni publiée pendant ce travail. La version manifold 4 voies n’a pas été modifiée. Les divergences de la fiche 02, la dépressurisation finale à l’azote, la charge liquide côté aspiration et les commandes exactes de la station de récupération doivent recevoir un bon à tirer humain adapté au matériel réel du plateau avant diffusion.
