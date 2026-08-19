# Comparaison — six fiches métier, version manifold 2 voies

État : brouillon métier du 13 août 2026, destiné au bon à tirer humain avant toute version 4 voies.

## Source comparée

Archive fournie :

`~\OneDrive\Bureau\25 26\Fiches méthodes + exercices CERFA.zip`

SHA-256 : `07AD49E78CF116682DC8C35751253414189AE102663AFE2C0D849D18194020A2`

Le ZIP interne `Fiches méthodes.zip` contient les six documents utilisés. Le texte, les tableaux et les relations ont été extraits sans modifier les originaux. Le rendu visuel Word n’a pas pu être contrôlé sur cette machine, faute de moteur LibreOffice disponible ; la comparaison porte donc sur la structure et le contenu textuel.

## Correspondance obtenue

| Source Word | Animation 2 voies | Gestes | Traitement |
|---|---|---:|---|
| `01 Fiche méthode pose des manos.docx` | 01 · Pose des manomètres | 27 | Bouchons, presse-étoupes, sièges arrière, trois flexibles, vide des lignes et passage en lecture. |
| `02 Fiche méthode dépose des manifolds avec EVM.docx` | 02 · Dépose avec électrovanne | 23 | Isolement HP, retour du fluide par BP, isolement final, rebouchage et contrôle d’étanchéité. |
| `03 Fiche métode MSP.docx` | 03 · Mise sous pression à l’azote | 16 | Azote sec, détendeur libéré, limite la plus basse, montée progressive, relevé pression/température et recherche de fuite. |
| `04 Fiche métode Tirage au vide.docx` | 04 · Tirage au vide | 15 | Vacuomètre près du circuit, mise au vide, isolement avant arrêt et tenue du vide. |
| `05 Fiche métode charge installation.docx` | 05 · Charge de l’installation | 17 | Plaque, fluide, pesée, charge initiale côté HP, isolement, masse finale et traçabilité. |
| `06 Fiche méthode récupération de fluide frigorigène.docx` | 06 · Récupération du fluide | 30 | Pesée initiale, raccordement manifold/station/bouteille, pré-vide des lignes, récupération, auto-purge, résiduel et pesée finale. |

Total : **128 gestes**. Chaque geste est une action réelle sur une cible SVG et peut être repris en découverte, entraînement ou confirmation.

## Écarts volontairement non reproduits tels quels

### Fiche 02 — électrovanne et pressostat BP

La source demande de retirer la bobine, d’y introduire un tournevis et de forcer la marche si le pressostat BP arrête trop tôt. Ces gestes ne sont pas généralisés. Le mini-jeu utilise la commande prévue au schéma du poste, conserve le pressostat BP actif et demande le critère d’arrêt validé du plateau.

À valider : organe réel de commande de l’EVM, logique NF et critère d’arrêt du pump-down.

### Fiche 03 — fin de mise sous pression

La source décrit le débranchement du flexible jaune puis la dépressurisation en tenant la ligne. Le mini-jeu n’enseigne pas la tenue libre d’un flexible sous pression. Il s’arrête sur l’isolement contrôlé, la traçabilité et la procédure de récupération/dépressurisation à valider pour le plateau.

À valider : destination de l’azote, organes utilisés et ordre exact de dépressurisation sans mise en danger.

### Fiche 05 — complément de charge côté BP

La source propose, en étape 6 bis, d’ouvrir la BP installation en marche pour introduire le liquide restant. Cette consigne n’est pas transformée en règle universelle. Le jeu bloque sur la méthode validée du poste et la notice de l’équipement afin de ne pas enseigner une arrivée de liquide incontrôlée à l’aspiration.

À valider : fluide, mode de charge, dispositif d’étranglement ou de vaporisation et critères de fin.

### Fiche 06 — station de récupération

Le principe du trajet est conservé, mais les positions des sélecteurs, la séquence d’auto-purge, les critères de fin et la masse admissible de la bouteille ne sont pas inventés. Ils dépendent de la notice de la station, de la bouteille et du fluide du plateau.

À valider : modèle de station, raccords/deux tés réels, mode de purge, critère de fin et contrôle de remplissage de la bouteille.

## Règles transversales ajoutées ou précisées

- azote sec uniquement ; jamais oxygène ni air comprimé ;
- pression d’épreuve limitée par le composant admissible le plus faible ;
- vacuomètre placé au plus près du circuit lorsque le plateau le permet ;
- fermeture et isolement avant arrêt de la pompe à vide ;
- contrôle de tenue du vide distinct de l’atteinte du niveau cible ;
- aucune pression, durée, masse, couple ou nombre de tours universel inventé ;
- aucune purge volontaire de fluide frigorigène à l’atmosphère ;
- procédure locale et notices constructeur prioritaires sur la simulation.

## Décision attendue avant la version 4 voies

Valider les quatre groupes de points ouverts ci-dessus sur le matériel réel. La future version manifold 4 voies devra ensuite reprendre ces décisions métier, sans synchronisation automatique ni modification de la version 4 voies actuelle avant cet aval.
