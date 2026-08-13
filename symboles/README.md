# Bibliothèque de symboles inerWeb — v3

4 704 symboles normalisés en SVG, un fichier par symbole, servis en ligne.

**Licence : CC BY 3.0, attribution obligatoire.** Lire [`LICENCE.md`](LICENCE.md)
avant tout réemploi — il y a aussi une interdiction d'usage comme données
d'entraînement, qui suit les fichiers.

---

## À quoi ça sert

Les cours interactifs du pack (`packs/fluides/res/*/`) portaient chacun leur
propre dossier `symboles/`, recopié d'un module à l'autre. Cette bibliothèque
les remplace par **une adresse stable par symbole** :

```
https://frigorx.github.io/pilote-fluides/symboles/svg/moteur-triphase.svg
```

Une page peut donc pointer un symbole sans l'embarquer, et deux modules qui
utilisent le même compresseur pointent le même fichier.

---

## Ce qu'il y a dedans

| | |
|---|---|
| `svg/` | 4 704 fichiers `.svg` autonomes, 8 Mo au total, 2 Ko en médiane |
| `index.json` | le catalogue : identifiant, nom fr/en, famille, sous-famille, chemin source, `viewBox`, nombre de bornes |
| `outils/qet-vers-svg.py` | l'outil qui fabrique les deux ci-dessus |

Répartition par famille et sous-famille — **tout est nommé en français** dans
l'index, même si les dossiers de la collection amont, eux, sont en anglais :

| Famille | Sous-famille | Symboles |
|---|---|--:|
| **Électrotechnique** | Multifilaire (tous pôles) | 940 |
| | Symboles EN 60617 | 908 |
| | Appareils vus de face (plans d'implantation) | 719 |
| | Unifilaire | 308 |
| | Divers non classés | 11 |
| | Normes américaines | 4 |
| **Énergie et fluides** | Eau et plomberie | 817 |
| | **Froid et climatisation** | 324 |
| | Solaire thermique | 161 |
| **Pneumatique** | Distributeurs et vannes | 172 |
| | Air comprimé | 102 |
| | Actionneurs | 59 |
| | Capteurs | 10 |
| **Hydraulique** | Distributeurs et vannes de commande | 60 |
| | Vannes · Pompes · Vérins · Réservoirs · Échangeurs · Filtres | 34 |
| **Logique** | Portes logiques | 43 |
| | Logigrammes | 32 |

Chaque symbole garde aussi `famille_id` (`10_electric`, `60_energy`…) et son
chemin `source` dans la collection amont : c'est ce qui permet de retrouver
l'élément d'origine quand un dessin pose question.

**Ce qui a été écarté, volontairement :** les 4 039 éléments des catalogues
d'articles constructeurs (`*_manufacturers_articles` — références Siemens, WEG,
Schneider…). Ce sont des dessins de produits catalogue, sans usage pédagogique,
et ils pèsent 27 Mo à eux seuls. L'option `--tout` de l'outil les réintègre.
12 éléments de plus ont été écartés par l'outil : 8 sans aucune forme dessinée,
4 dont le XML amont est illisible.

---

## Les noms

Le nom du fichier est le **nom français** du symbole, sans accent, en minuscules,
les séparateurs remplacés par des tirets :

```
« Moteur triphasé »        →  moteur-triphase.svg
« Détendeur électronique » →  detendeur-electronique.svg
```

Quand plusieurs symboles portent le même nom français — c'est fréquent, il y a
7 « Moteur triphasé » dans la collection — le premier garde le nom court et les
autres prennent `-2`, `-3`, etc. Le nom court ne va pas au premier par ordre
alphabétique : il va à celui **dont le nom de fichier amont colle au nom français**.

Cette règle n'est pas cosmétique. La collection amont contient des noms français
erronés : `jednofaz.motor.elmt` (un moteur **mono**phasé tchèque) est nommé
« Moteur triphasé ». Par ordre alphabétique, c'est lui qui prenait
`moteur-triphase.svg` — un mauvais dessin sous le nom le plus consulté. La règle
donne le nom court à `moteur_tri.elmt`, qui est bien un moteur triphasé.

**Conséquence à connaître** : un nom français peut être faux en amont. Vérifier le
dessin avant de l'utiliser en évaluation.

---

## Utiliser un symbole

Dans une page du dépôt :

```html
<img src="/pilote-fluides/symboles/svg/detendeur-thermostatique-externe.svg"
     alt="Détendeur thermostatique à égalisation externe" width="80">
```

Chaque SVG est autonome : `viewBox` calée sur ce qui est réellement dessiné,
plus 2 unités de marge, et des attributs `width`/`height` pour qu'il s'affiche à
une taille sensée quand on l'ouvre seul dans un navigateur. Les traits sont noirs,
sans `fill` de fond : le symbole se pose sur n'importe quelle couleur.

Pour chercher un symbole, `index.json` se filtre côté navigateur :

```js
const { symboles } = await (await fetch("symboles/index.json")).json();
const froid = symboles.filter((s) => s.sous_famille === "Froid et climatisation");
```

---

## Régénérer la bibliothèque

```bash
# 1. la collection officielle (environ 100 Mo)
git clone --depth 1 https://github.com/qelectrotech/qelectrotech-elements /tmp/qet

# 2. la conversion — une quinzaine de secondes
python3 symboles/outils/qet-vers-svg.py --source /tmp/qet --sortie symboles
```

Python 3 seul, aucune dépendance. La sortie est **déterministe** : même
collection en entrée, mêmes noms de fichiers en sortie — l'arbitrage des
homonymes ne dépend ni de l'ordre du système de fichiers ni de la machine.

Attention : l'outil **écrit par-dessus** `svg/` sans le vider d'abord. Si la
collection amont perd un symbole, son SVG reste sur place. Pour une reprise
propre, supprimer `symboles/svg/` avant de relancer.

---

## D'où ça vient

Collection d'éléments QElectroTech, `main` du dépôt
[`qelectrotech/qelectrotech-elements`](https://github.com/qelectrotech/qelectrotech-elements),
8 755 fichiers `.elmt` (du XML : des primitives — lignes, arcs, polygones — pas
du dessin vectoriel).

Le cœur de conversion (formes, styles de trait, arcs, textes dynamiques) reprend
`qet_to_svg.py` v2 du dépôt
[`frigorx/inerweb-symboles`](https://github.com/frigorx/inerweb-symboles), qui
servait à produire les 348 symboles de la v2. La v3 change trois choses :

1. **elle prend toute la collection** au lieu d'une liste écrite à la main ;
2. **elle écrit des fichiers**, pas un gros JSON avec le SVG en ligne ;
3. **elle recalcule la boîte englobante** sur ce qui est réellement dessiné.
   Beaucoup d'éléments débordent du cadre que QET leur déclare : dans un schéma
   le calque parent rattrape le débordement, un fichier SVG isolé n'a rien pour
   le rattraper et le dessin se retrouve coupé.

Les textes multilignes sont découpés en `<tspan>` : SVG ne renvoie pas à la
ligne tout seul, et une plaque moteur (« 0,37 kW / 2800 rpm / 2,4 A ») se
tasserait sur une seule ligne.

---

*inerWeb Édu — F. Henninot — LP Privé Jacques Raynaud, Campus ÉQUATIO*
