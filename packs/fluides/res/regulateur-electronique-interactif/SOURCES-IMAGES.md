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
