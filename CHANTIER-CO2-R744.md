# CHANTIER — la ligne CO₂ / R744

> Branche `station-co2-r744`, worktree isolé `C:\git\_wt-co2-r744`.
> ⚠️ Le worktree principal `C:\git\pilote-fluides` est OCCUPÉ par une autre session
> (chantier KVR/NRD, non commité au 20/08 15:47). Ne rien y écrire depuis ici.

## Ce qui entre

Zip de F. Henninot : `Amélioration du module co2Animate.zip` — un parcours guidé
« CO₂ / R744 » en 9 étapes, produit sur Claude Design (`.dc.html` + `support.js`).
Il ne tourne pas en autonome : il lui faut le runtime Design (React + `new Function`).

## Ce qui sort

Une **ligne de mini-stations** dans le pack fluides, format maison, sans dépendance :
`packs/fluides/res/co2-r744/` — un moteur, 8 chapitres, chacun ouvrable seul par
`index.html?e=<slug>`. Motif déjà validé sur le KVR/NRD (« même animation, ouverte à
son étape — pas un octet dupliqué »).

## Le fait qui commande le chantier

Le CO₂ ne relève PAS de la catégorie D. L'arrêté du 21 novembre 2025 (annexe II,
transcrite verbatim dans `packs/fluides/referentiel-2025.json`) crée une **catégorie B**
dédiée au R-744, et un **groupe G13 de 17 codes** qui ne sont évalués QUE dans cette
catégorie. La catégorie D, elle, ne couvre que la récupération des gaz fluorés
(ancienne catégorie III).

Conséquence : le pack couvre aujourd'hui A1/A2/D/E ; ce module est la première brique
de la catégorie B. Il ne change donc RIEN à la matrice 94/94, qui ne compte que le
périmètre déclaré par le pack.

## Étapes

1. [x] Worktree + branche isolés
2. [x] Référentiel : périmètre B et G13 relevés
3. [ ] `res/co2-r744/` — moteur, contenu, visuels
4. [ ] `couverture.json` adossé à G13 / 11.06 (théorie seulement, les codes P se disent P)
5. [ ] Branchement carte : nouvelle ligne + escales (`cartes.js`, `index.html`)
6. [ ] Builds (galerie, registre, matrice, plan-liste, sitemap) et contrôle du site servi
7. [ ] Passage inerWeb Fluide (module intégré)

## Corrections de fond apportées à la source

- Le cadre réglementaire de l'étape 8 citait l'arrêté du 29 février 2016 et la
  « catégorie I pour tous équipements » : c'est le régime abrogé. Remplacé par le
  régime F-Gas III et la catégorie B.
- « Le R744 n'est pas un gaz fluoré : pas de quota » reste vrai et conservé.
