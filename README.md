# Pilote — Habilitation fluides frigorigènes (démonstrateur)

Le contenu de la formation **habilitation fluides frigorigènes** (catégories **A1 · A2 · D · E**)
tournant dans le moteur générique **inerWeb Pilote**.

> ⚠️ **Démonstrateur, pas version définitive.** Il est là pour être montré à des collègues
> enseignants et formateurs, et pour recueillir leurs remarques. Le contenu est un premier jet.

**Élève** → [`index.html`](index.html) · **Formateur** → [`formateur.html`](formateur.html)

---

## Ce que ça montre

| | |
|---|---|
| **4 parcours** | A1, A2, D, E — un seul pack, une carte menu par catégorie, périmètres réglementaires respectés |
| **29 cartes** | 1 accueil · 4 menus · 17 fiches de cours · 2 exercices en situation · 4 examens blancs · 1 bilan |
| **94 questions** | banque étiquetée par groupe du référentiel (G1 → G13) |
| **Remédiation** | réponse fausse → bouton « Revoir la fiche » vers la fiche concernée |
| **Mode pilotage** | la couche de notes formateur, invisible côté élève |
| **Critères 0-4** | codes du référentiel positionnables en mode notation |

Devise du moteur : **2 min avant / rien pendant / 30 s après**.

---

## Ce que ça ne fait pas — à lire avant de juger

**Le mode « Évaluation » est volontairement désactivé** (`modes_actifs: ["auto","test","pilotage"]`).

Le moteur compose un examen par simple tirage aléatoire dans un pool `{groupes, nombre, seuil}`.
L'épreuve officielle de l'arrêté du 21 novembre 2025 exige bien davantage : groupes obligatoires,
**un seul groupe composant parmi 6-9** tiré au sort à l'insu du candidat, G12 pour A1/A2,
deux questions imposées (fluides naturels et efficacité énergétique), **pondération ×3 / ×2 / ×1**
selon la conséquence environnementale, et un seuil de 70 % **assorti d'un plancher sur les groupes
critiques**. Rien de tout cela n'existe dans `moteur/moteur.js`.

Les examens de ce pack sont donc des **entraînements**. Étendre le moteur aux règles de
composition de l'arrêté est un chantier à part, à décider séparément.

---

## D'où vient le contenu

**Les cours** : les 14 chapitres de `habilitation-fluide` (dépôt privé), resserrés pour être lus
en séance. Un chapitre de 1 500 mots n'est pas une carte : il a été découpé, élagué, réécrit.
La section « Notes formateur » de chaque chapitre alimente directement la couche pilote.

**Les questions** : [Mission F-GAZ](https://frigorx.github.io/inerweb-fgaz/), application publique
d'entraînement de F. Henninot (558 questions), dont 94 ont été **sélectionnées à la main**.

> 🔒 **La banque officielle des 85 questions d'examen et les 10 examens blancs du dépôt privé
> ne sont PAS utilisés ici, et ne doivent jamais l'être.** Publier un sujet d'épreuve est
> irréversible : forks, archives et caches survivent à la suppression d'un dépôt.

Écartés de la sélection : tout le chapitre `ch12` de Mission F-GAZ (lot généré automatiquement,
distracteurs non sérieux) et **toutes les questions reposant sur un seuil réglementaire chiffré**
susceptible d'avoir bougé avec F-Gas III (délais de réparation, seuils de contrôle, dates
d'interdiction). Ces valeurs sont à revalider sur pièce avant tout usage en formation.

---

## Règles tenues dans le contenu

- **Zéro invention chiffrée.** Seules valeurs employées telles quelles : surchauffe **5-10 K**,
  sous-refroidissement **4-8 K**, pression absolue = relative + **~1 bar**, classes NF EN 378
  (**R-290 = A3**, CO₂ = A1, NH₃ = B2L, R-32 et R-1234yf = A2L), **PRP du CO₂ = 1**.
  Tout le reste renvoie à la doc constructeur ou à la norme, « à faire valider ».
- **Azote seul** pour toute mise en pression — jamais d'oxygène, jamais d'air comprimé.
  Consignation électrique systématique.
- **Croix du frigoriste** : détendeur **gauche** · compresseur **droite** · condenseur **haut** ·
  évaporateur **bas** · condenseur à air simple.
- **Charte inerWeb Édu** : fond clair, `#1b3a63` / `#ff6b35`, jamais de thème sombre.

---

## Fabrication

```bash
node build/convert.mjs   # Mission F-GAZ → packs/fluides/banque.gen.json
node build/build.mjs      # cartes.js + banque → pack.pilote.js ET pack.eleve.js
```

| Fichier | Rôle |
|---|---|
| `packs/fluides/cartes.js` | **source éditoriale** — c'est ici qu'on écrit |
| `packs/fluides/banque.gen.json` | banque générée — ne pas éditer à la main |
| `packs/fluides/pack.eleve.js` | build élève, **purgé** de la couche pilote |
| `packs/fluides/pack.pilote.js` | build formateur, **avec** les notes |
| `moteur/` | moteur générique, repris tel quel de [`frigorx/r408`](https://github.com/frigorx/r408) |

`convert.mjs` refuse d'écrire si une question est incohérente ; `build.mjs` refuse de construire
si un lien pointe vers une carte inexistante, si un examen demande plus de questions que la banque
n'en contient, ou **si la moindre note formateur se retrouve dans la sortie élève**.

### ⚠️ Décision à trancher : la console formateur est-elle publiée ?

En l'état, `formateur.html` et `pack.pilote.js` **sont publiés**, pour que les collègues puissent
voir la couche pilote sans installation. Les notes formateur ne sont pas des corrigés d'examen —
ce sont des conseils d'animation — mais elles deviennent publiques.

Pour les retirer de la publication : supprimer `formateur.html` et `packs/fluides/pack.pilote.js`
du dépôt, et les régénérer en local par `node build/build.mjs`. Le mode « Pilotage » resterait
alors accessible depuis `index.html` (mot de passe `prof`), mais **n'afficherait rien**, faute de
notes dans le build élève — ce qui est le comportement voulu par la règle « pas de secret dans le
navigateur élève ».

---

## Illustrations

- **Schémas techniques** → SVG produits à la main à partir de la
  [bibliothèque de symboles inerWeb](https://github.com/frigorx) (348 symboles normalisés).
  Jamais de génératif : aucun modèle d'image ne respecte la croix du frigoriste.
  Fait : `res/svg/croix-frigoriste.svg`.
- **Illustrations d'ambiance** → génératif autorisé, charte Édu, sans texte dans l'image.
  Voir `packs/fluides/res/img/CATALOGUE.md`.

---

*F. Henninot · inerWeb Édu · contenu conforme à l'arrêté du 21 novembre 2025 et au
règlement (UE) 2024/573, sous réserve de la relecture indiquée plus haut.*
