# Note de la session KVR — à lire avant de fusionner

Déposée le 20/08/2026 par la session qui a livré la gare **KVR + NRD**, avec
l'accord de F. Henninot. Fichier non suivi, rien d'autre n'a été touché dans ce
worktree.

## Ce qui a changé sur `main`

`main` est passé de `8e37922` à **`ed88e75`** — *La famille KV s'eclate en
branche : le KVR arrive, le NRD devient sa sous-station*. C'est publié et en
ligne sur inerweb.fr.

Cette branche (`station-co2-r744`) est partie de `8e37922`, donc **avant**.

## Le point qui compte : la géométrie du plan a bougé

La ligne 🎛 CE QUI SE RÈGLE a gagné deux gares (« Le KVR » et sa sous-station
« Le NRD »). Sa colonne s'est allongée de deux pas, donc **tous les repères
horizontaux du plan sont descendus de 216 px** dans `index.html` :

| Repère | avant (`8e37922`) | sur `main` (`ed88e75`) |
|---|---|---|
| `CEINTURE_Y` | 960 | **1160** |
| `HUILE_Y` | 1170 | **1370** |
| `OUTILS_Y` | 1380 | **1580** |
| `ELECTROTECH_Y` | 1540 | **1740** |
| `CORR_Y` | 1700 | **1900** |
| `H` | 1820 | **2020** |

(200 px pour les deux gares, plus 40 px donnés à la ceinture : le jalon
« 🏁 Réglages maîtrisés » et le libellé d'en dessous se chevauchaient déjà —
c'est la collision que le commit `8e37922` signalait comme préexistante et non
traitée. Elle est réglée : 0 chevauchement sur 199 textes, mesuré.)

## Pourquoi ça vous concerne directement

Cette branche pose `CO2_Y = 1390`, calculé en supposant `HUILE_Y = 1170`.
Sur `main`, l'huile est descendue à 1370 : **la ligne CO₂ tomberait dessus.**

Git signalera le conflit — c'est la même ligne de constantes des deux côtés,
donc rien ne passera en silence. Mais le résoudre en « gardant les deux » donne
un plan faux, et ça ne se voit qu'à l'écran.

En repartant des valeurs de `main` et en gardant vos écarts (+220 pour la ligne
CO₂, puis +210, +160, +160, +120) :

```js
var CEINTURE_Y = 1160, HUILE_Y = 1370, CO2_Y = 1590, OUTILS_Y = 1800,
    ELECTROTECH_Y = 1960, CORR_Y = 2120, H = 2240;
```

À vérifier à l'écran après coup plutôt qu'à me croire : le plan se mesure en
comparant les `getBBox()` de tous les `#plan-svg text` deux à deux. C'est
comme ça que les chevauchements ci-dessus ont été trouvés.

## Deux autres pièges

**1. Les fichiers générés ne se fusionnent pas.** `plan-descriptions.gen.js`,
`REGISTRE-COURS-INTERACTIFS.md`, `AUDIT-CONFORMITE.md`, `chiffres.gen.js` et
les autres `.gen` sont modifiés des deux côtés parce que nos deux sessions ont
lancé les builds. Les résoudre ligne à ligne ne peut que produire un état qui
ne correspond à aucune réalité. **Rebaser d'abord, relancer les builds ensuite,
et commiter le résultat.**

**2. `station()` et `gare()` ont changé** dans `index.html`. Une station peut
désormais porter `sous_station: true` : pastille plus petite, crochet de
rattachement, libellé en retrait. C'est un motif générique, réutilisable tel
quel — pour le CO₂ aussi, si une gare dépend d'une autre.

## Marche à suivre proposée

1. `git fetch origin && git rebase origin/main` sur cette branche ;
2. résoudre le conflit de la ligne de constantes avec les valeurs ci-dessus ;
3. relancer les builds (`plan-liste`, `registre`, `audit`…) plutôt que de
   résoudre les `.gen` à la main ;
4. vérifier le plan à l'écran — chevauchements et lignes qui se croisent.

Une seule session à la fois devrait toucher `index.html` : c'est le fichier
partagé numéro un du dépôt.
