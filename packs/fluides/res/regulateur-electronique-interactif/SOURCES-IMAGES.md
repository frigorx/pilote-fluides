# Registre des images — il n’y en a aucune

Vérification : 19 août 2026.

Cette station ne contient **aucun fichier image** : ni photo, ni capture, ni
extrait de documentation constructeur. Tous les visuels sont des **SVG écrits
dans `index.html` et `app.js`** :

| Visuel | Où | Ce qu’il montre |
|---|---|---|
| Boîtier de couverture | `index.html` | Un régulateur dessiné : afficheur, voyants, quatre touches, sonde et moteur |
| Chaîne de régulation | `app.js` · `chaineMarkup()` | Sonde → régulateur → relais → compresseur, et le retour de la température |
| Courbe des sondes | `app.js` · `sondeLabMarkup()` | Résistance en fonction de la température, tracée à partir des lois de calcul |
| Évaporateur | `app.js` · `degivrageMarkup()` | Batterie, ailettes, givre, résistance, ventilateur, gouttes |
| Bornier | `app.js` · `bornierMarkup()` | Bornes, organes et fils posés par l’élève |
| Façades | `app.js` · `facadeMarkup()` | Boîtier, afficheur et touches en HTML/CSS — donc cliquables au clavier |

Contrôle automatique : `ls` sur le dossier ne doit renvoyer que des fichiers
`.html`, `.js`, `.css`, `.json`, `.md` et `.txt`. Toute image ajoutée ici
casserait la règle qui rend cette station publiable.

## Dessin vivant (scene-geste.js, 04/10/2026)

Toujours aucun fichier image dans ce dossier : `scene-geste.js` écrit son SVG et
**lit** les symboles de la bibliothèque curée du pack, sans en copier aucun ici.

| Élément du dessin | Origine |
|---|---|
| Le régulateur (gros plan et montage) | celui de la couverture d’`index.html` : mêmes cotes (boîtier 280 × 150, afficheur, trois voyants, quatre touches) et mêmes couleurs ; seuls changent la taille des textes (22 unités au moins) et l’unité, qui suit la valeur affichée |
| Évaporateur | `../symboles/echangeur_a_air.svg`, sans retouche |
| Sonde de température | `../symboles/sonde_temperature.svg`, sans retouche |
| Résistance de dégivrage | `../symboles/resistance_evaporation.svg`, sans retouche |
| Compresseur | `../symboles/compresseur_general.svg`, sans retouche |
| Le technicien | le bonhomme de HoCourant, repris de `legislation/scenes/fluidique.js` |
| Givre, gouttes, air soufflé, fils | effets et traits écrits dans `scene-geste.js` (pas des organes) |

Briques de dessin : `jouerezo/moteur/voyage-dessin.js`, lu sans modification
(gouttes, chevrons d’air, pastilles, filigrane). Aucune valeur n’est affichée
ailleurs que sur l’afficheur du régulateur : consigne 4 puis 2 °C, différentiel
2 puis 3 K, relance 5 °C (2 + 3 K), 4,6 °C de la couverture ; entre ces repères
l’afficheur suit la température de la chambre. Valeurs d’exercice : la notice de
la référence installée fait foi.

## Marques

Les appareils cités — Johnson Controls MR51+, Danfoss EKC 202, CAREL MasterCella
MD33 — le sont **à titre descriptif**, pour désigner du matériel réellement
rencontré en atelier. Trois constructeurs concurrents, aucun mis en avant.
Aucune façade n’est reproduite : les claviers dessinés sont des **familles de
claviers** (touches nommées, trois touches, code d’accès), pas des copies
d’appareils. Les codes de paramètres sont des repères techniques, cités pour que
l’élève retrouve les siens sur la machine qu’il a devant lui.

La mention complète figure sur la page d’accueil de la station : usage
pédagogique sans but commercial, aucune affiliation, retrait immédiat de
l’élément concerné à la demande d’un ayant droit.
