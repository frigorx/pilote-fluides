# Licence — bibliothèque de symboles `symboles/`

Ce dossier ne suit **pas** la licence du reste du dépôt. Il contient l'œuvre
d'un tiers, redistribuée sous sa propre licence.

---

## 1. Ce que contient ce dossier

4 704 fichiers SVG convertis depuis la **collection d'éléments de QElectroTech**,
plus l'index (`index.json`) et l'outil de conversion (`outils/qet-vers-svg.py`).

Les dessins sont ceux de QElectroTech. La conversion `.elmt` → SVG ne crée pas
d'œuvre nouvelle : c'est un changement de format.

---

## 2. Licence des symboles : CC BY 3.0

La collection d'éléments de QElectroTech est publiée sous
[Creative Commons Attribution 3.0](https://creativecommons.org/licenses/by/3.0/).

Sa licence (`ELEMENTS.LICENSE`, texte français) dit ceci :

> L'utilisation, la modification et l'intégration des éléments dans des schémas
> électriques est autorisée sans condition, quelle que soit la licence finale des
> schémas.
>
> Si vous redistribuez tout ou partie de la collection QElectroTech, avec ou sans
> modification, **en dehors d'un schéma électrique**, vous devrez respecter les
> conditions de la licence CC-BY.

Publier les symboles sur un site, un par adresse, **n'est pas** « réaliser un
schéma électrique ». C'est une redistribution de la collection hors schéma.
**L'attribution est donc obligatoire**, et elle doit accompagner tout réemploi.

### Mention à porter

> Symboles issus de la collection d'éléments **QElectroTech**
> (<https://qelectrotech.org/>), publiée sous
> [Creative Commons Attribution 3.0](https://creativecommons.org/licenses/by/3.0/),
> convertis en SVG par F. Henninot.
> Licence des éléments : <https://qelectrotech.org/wiki_new/doc/elements_license>

Cette mention figure dans `galerie.html` (générée par `build/galerie.mjs`), dans
`index.json`, et dans l'en-tête de l'outil de conversion.

---

## 3. Interdiction d'usage comme données d'entraînement

La même licence pose une restriction distincte, qui n'est pas couverte par CC BY :

> L'autorisation n'est pas accordée pour utiliser ce logiciel ou l'un des fichiers
> associés comme exemples de données aux fins de création de modèles
> d'apprentissage automatique.

Ces 4 704 SVG **ne doivent pas** servir de jeu de données d'entraînement, ni être
versés à une collecte à cette fin. La contrainte suit les fichiers : elle vaut
pour quiconque les récupère depuis ce dépôt.

---

## 4. Ce qui reste sous la licence du dépôt

- `outils/qet-vers-svg.py` — l'outil de conversion, écrit pour ce projet.
- `README.md` et ce fichier.
- La structure de `index.json`.

Ils suivent la licence de la racine du dépôt (voir [`../LICENCE.md`](../LICENCE.md)).
Le cœur de conversion des formes reprend `qet_to_svg.py` du dépôt
[`frigorx/inerweb-symboles`](https://github.com/frigorx/inerweb-symboles), même auteur.

---

## 5. Garantie

Aucune. La collection amont est fournie « telle quelle », et la conversion n'y
ajoute rien. Un symbole n'est pas une norme : avant tout usage en évaluation ou
en document opposable, le vérifier contre la norme applicable. La collection amont
contient d'ailleurs des noms français erronés — voir `README.md`, § « Les noms ».
