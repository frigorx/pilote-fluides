# Reprise — pose et dépose du manifold 2 voies

État : brouillon métier du 13 août 2026. Non intégré, non indexé dans le RAG, non publié.

## Demande humaine couverte

- commencer par une version manifold 2 voies ;
- conserver ensuite une version 4 voies séparée ;
- réutiliser lourdement l’animation Rotolock fournie ;
- former un élève débutant jusqu’à la manipulation numérique autonome ;
- proposer théorie, mini-jeux, QCM, évaluation pratique et guidance atelier ;
- conserver la charte inerWeb, le fonctionnement hors ligne et l’usage sur projection/téléphone.

## Architecture

- onze écrans `Comprendre` ;
- 78 gestes dans le parcours guidé et autonome, dont cinq décisions de préparation, six gestes dédiés aux trois mini-vannes et une dépose complète avec récupération du fluide ;
- 19 QCM avec correction immédiate et seuil interne `16/19` ;
- un jeu d’ordre en huit grandes phases ;
- une guidance atelier imprimable ;
- une vue 3D locale de reconnaissance et des coupes Rotolock manuelles dans `visuals.js`.

## Reprise visuelle demandée le 13 août 2026

La première composition a été refusée comme brouillonne et illisible malgré la présence du contenu. La reprise ne s’est donc pas limitée au contraste :

- suppression du poste complet affiché pendant chaque microgeste ;
- création de scènes ciblées par famille d’action ;
- remplacement des cartes abstraites `2 / 2 / 3` par une véritable illustration annotée du manifold ;
- ajout de la vue 3D locale pour reconnaître physiquement la Rotolock ;
- séparation permanente de la clé de service et du dessin de la vanne ;
- correction de la coupe : P se trouve après le siège arrière et le pointeau au siège arrière bloque cette voie ;
- agrandissement spécifique des scènes Rotolock et des coupes sur téléphone.

## Reprise pédagogique de la préparation

La carte générique `EPI · fluide · compatibilité` a été supprimée : elle demandait une confirmation sans avoir enseigné le sens des mots ni contrôlé la compréhension. Elle est remplacée par :

- un écran illustré expliquant pression, projection dans l’axe et brûlure par le froid ;
- un écran `identifier → comparer → décider` pour la plaque, le dossier/FDS et les limites fabricant ;
- cinq décisions obligatoires avant le premier raccordement : repérer l’axe du jet, choisir lunettes et gants froid, identifier le fluide, démontrer la compatibilité, préparer la zone ;
- une explication propre à chaque choix erroné ;
- deux questions QCM supplémentaires sur le risque et la preuve de compatibilité.

## Décisions métier représentées

- « 2 voies » = deux robinets de commande, avec trois flexibles BP, HP et service ;
- chaque flexible possède à son extrémité une mini-vanne quart de tour : fermée avant raccordement, ouverte pour le vide et la mesure, refermée sans pression avant déconnexion ;
- P, près du carré mais après le siège arrière dans la coupe, reçoit temporairement le flexible ; P1 côté circuit reste réservée au pressostat ;
- au siège arrière, T communique avec C et P est isolée ;
- en position intermédiaire, T, C, P et P1 communiquent ;
- au siège avant, T est isolée, sans ajouter artificiellement cette position dans la séquence de pose ;
- les Rotolock restent au siège arrière pendant le vide du manifold et des flexibles ;
- les robinets BP et HP du manifold restent fermés pendant la simple lecture ;
- une ligne isolée n’est pas nécessairement vide ni sans pression ;
- aucun raccord n’est desserré avant traitement de la pression résiduelle.
- chaque manœuvre d’un carré est encadrée par la séquence explicite `desserrer légèrement le presse-étoupe → manœuvrer → resserrer le presse-étoupe`, en pose, en lecture et en dépose ;
- pour la dépose, la HP est d’abord isolée, puis l’alimentation liquide est coupée par l’organe prévu au schéma du poste ;
- le manifold relie alors temporairement le flexible rouge à la branche BP encore en aspiration : le fluide est animé jusqu’au compresseur, au condenseur et à la bouteille liquide ;
- après l’arrêt de pump-down au critère du poste, la BP est isolée, les presse-étoupes sont resserrés, les bouchons sont remis et l’alimentation liquide est rétablie ;
- la recherche de fuite finale est bloquante dans l’activité : les deux bouchons P et les deux presse-étoupes sont contrôlés séparément.

## Points métier à valider sur le plateau réel

Le poste virtuel permet de choisir entre deux configurations expliquées : fermeture d’une électrovanne normalement fermée commandée ou fermeture d’une vanne de départ liquide. Une seule branche est exécutée dans le parcours, selon le schéma et la procédure du plateau. Aucun seuil de pression, couple ou nombre de tours universel n’est inventé.

À faire valider par F. Henninot :

1. organe réel utilisé pour couper l’alimentation liquide sur le poste et logique de commande de l’électrovanne ;
2. confirmer sur le matériel réel le sens visuel exact poignée alignée/perpendiculaire pour `ouverte/fermée` ;
3. degré de desserrage du presse-étoupe selon la fiche du matériel ;
4. critère réel d’arrêt du compresseur par le pressostat BP pendant le pump-down ;
5. moyen de recherche de fuite, sensibilité et procédure de confirmation utilisés au plateau ;
6. représentation extérieure des Rotolock par rapport au matériel réel.

## Contrôles numériques réalisés le 13 août 2026

Sur la version actuelle à onze écrans, 78 gestes et 19 questions :

- les 78 gestes guidés ont été rejoués jusqu’au bilan final, y compris les deux choix possibles d’isolement liquide ;
- les 78 gestes autonomes ont été rejoués sans contour d’aide jusqu’au score `78/78` à `1280 × 720`, puis à `360 × 640` ;
- les cinq décisions de sécurité font progresser l’état réel du parcours et chaque distracteur testé affiche une explication spécifique ;
- les deux trajets animés de récupération — flexibles puis circuit frigorifique — sont actifs, restent visibles si les animations sont réduites et ne captent aucun clic ;
- le centre réellement touché du robinet HP a été vérifié après superposition du trajet fluide : il atteint bien la commande, sur ordinateur comme sur téléphone ;
- les cibles tactiles des robinets de récupération et des quatre points de fuite ont été agrandies sur téléphone ;
- les quatre recherches de fuite et leur conclusion bloquante ont été exécutées dans les modes guidé et autonome ;
- les 19 QCM ont été réussis jusqu’au score `19/19`, avec seuil interne dynamique `16/19` ;
- les huit phases du mini-jeu ont été reconstruites et validées `8/8` ;
- l’affichage de la récupération a été contrôlé à `1280 × 720`, `1024 × 768`, `390 × 844` et `360 × 640`, sans débordement du document, du panneau de cours ni du visuel ;
- la console du navigateur ne contient ni erreur ni avertissement après les parcours ;
- la planche locale `secu-projection.svg` se charge hors ligne depuis le dossier partagé du pack.

Historique des contrôles antérieurs :

- la version antérieure à 54 gestes avait été exécutée deux fois jusqu’au bilan final ;
- la version visuellement reprise à 54 gestes avait été rejouée à partir des cibles réellement visibles ;
- après ajout des mini-vannes, les 60 gestes ont été rejoués jusqu’au bilan final sans blocage ;
- les six nouvelles actions ouvrent puis ferment réellement les trois mini-vannes, au clic et au clavier pour la cible testée ;
- la chaîne de la version mini-vannes était `7 écrans de cours → 60 gestes → évaluations` ;
- les 12 QCM ont été réussis et corrigés jusqu’au score `12/12` ;
- les huit phases du mini-jeu ont été reconstruites et validées `8/8` ;
- le mode autonome masque le contour d’aide, explique une erreur et la décompte du premier essai ;
- P1 affiche l’alerte dédiée sans faire avancer l’étape ;
- la coupe Rotolock affiche les trois positions, P après le siège arrière, leurs passages et leurs explications ;
- la clé de service reste hors du corps de vanne sur le cours, la pratique et la fenêtre de coupe ;
- affichage contrôlé à `1280 × 720`, `1024 × 768`, `390 × 844` et `360 × 640`, sans débordement horizontal ;
- activation d’un geste contrôlée au clavier avec `Entrée` ;
- aucune erreur ni alerte dans la console du navigateur ;
- la feuille imprimable générait 60 cases à partir des actions de cette version.

## Avant bon à tirer

- rejouer les 78 gestes avec le manifold, les flexibles à mini-vannes et les Rotolock réels ;
- valider les six points métier ouverts ci-dessus ;
- contrôler un tirage papier réel de la guidance ;
- ne pas intégrer à `cartes.js`, ne pas lancer le build global, ne pas pousser et ne pas indexer sans aval explicite.
