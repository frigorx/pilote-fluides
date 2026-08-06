# Pilote — Habilitation fluides frigorigènes (démonstrateur)

> 👉 **Nouvelle session ? Lire [`REPRISE.md`](REPRISE.md) en premier** — état, décisions, pièges, prochaines étapes.

Le contenu de la formation **habilitation fluides frigorigènes** (catégories **A1 · A2 · D · E**)
tournant dans le moteur générique **inerWeb Pilote**.

> ⚠️ **Démonstrateur, pas version définitive.** Il est là pour être montré à des collègues
> enseignants et formateurs, et pour recueillir leurs remarques. Le contenu est un premier jet.

**Portail (point d'entrée)** → [`portail.html`](portail.html) — tout est là : élève, révisions, formateur, partage, atelier relié.

**Élève** → [`index.html`](index.html) · **Formateur** → [`formateur.html`](formateur.html)

---

## Ce que ça montre

| | |
|---|---|
| **4 parcours** | A1, A2, D, E — un seul pack, une carte menu par catégorie, périmètres réglementaires respectés |
| **Les cartes** | 1 accueil · des menus par module · les fiches de cours · 5 exercices « frigoriste-détective » · les séries et examens · 1 bilan. **Le compte exact est relevé à chaque fabrication** : voir [`REPRISE.md`](REPRISE.md) § 2 ou les compteurs du [portail](portail.html) — on ne recopie plus un chiffre à la main ici, c'est ainsi qu'on se met à mentir. |
| **La banque** | questions étiquetées par groupe (G1 → G13) ET par niveau, avec indice et remédiation complète, chacune rattachée à un **code de compétence** de l'arrêté |
| **3 paliers** | Échauffement (niveau 1, seuil 60 %) · Examen blanc (mixte, 70 %) · Défi technicien (niveau 2, 80 %) |
| **Auto-formation** | espace « Réviser par thème » : 13 séries corrigées, chaque erreur renvoie vers sa fiche, bilan des fiches à revoir, score précédent mémorisé (localStorage, rien ne sort du navigateur) |
| **Remédiation** | réponse fausse → bouton « Revoir la fiche » vers la fiche concernée |
| **Mode pilotage** | la couche de notes formateur, invisible côté élève |
| **Critères 0-4** | codes du référentiel positionnables en mode notation |
| **Outils embarqués** | réglette P ↔ T, carte d'identité du fluide (données FRIGOLO), Diagramme Enthalpique+ v3.2 dans l'exercice de diagnostic |
| **Cours interactifs complets** | pages autonomes avec voix et mise en scène, **recensées automatiquement** sur [`galerie.html`](galerie.html), fichiers sources téléchargeables. Parmi eux : la frise vivante · la nomenclature · Mission Bouteilles · l’évaporateur · Mission 290 · le bilan thermique · **le condenseur** (`g7b`) · **l’intervention sur circuit hydrocarbure** (`g12b`) · **l’étanchéité** (`g4a + g4b + g4c`) · **la chaîne de l’intervention** (`p1 + p3 + p5`) · **la vanne de service** en coupe animée (`p1 + p5 + g6b + g9b`). Le compte exact et les codes déclarés par chacun sont **relevés** dans [`REGISTRE-COURS-INTERACTIFS.md`](REGISTRE-COURS-INTERACTIFS.md). |
| **Voix locales** | 660 narrations MP3 naturelles (5,18 h, 106,8 Mio), dont les 112 écrans du Tome 3. Aucun service en ligne au moment du cours ; repli automatique sur la voix du navigateur si un texte vient d'être modifié. Traçabilité et méthode : [`packs/fluides/res/voix/README.md`](packs/fluides/res/voix/README.md). |
| **Atelier numérique** | 10 ressources reliées aux fiches : simulateurs KP1/KP5, module compresseur, leçon scroll, échangeurs, TP manomètres, TP pesée, CERFA/FI/BSD, symboles |

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

**Écarts assumés avec le moteur r408** (rétrocompatibles, absents = comportement d'origine) :
- `initExamen` accepte `examen.niveau` (filtrage des questions par difficulté) ;
- le bilan d'examen liste les fiches des questions ratées (via `remediation_vers` des questions
  de banque) et affiche le score précédent, mémorisé en `localStorage` côté élève uniquement.

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
node build/convert.mjs    # Mission F-GAZ → packs/fluides/banque.gen.json
node build/build.mjs      # cartes.js + banque → pack.pilote.js ET pack.eleve.js
                          # (enchaîne la profondeur et la matrice de traçabilité)
node build/parcours.mjs   # parcours.js + fiches → projection.gen.js (le support de salle)
node build/relecture.mjs  # → relecture.html (document de bon à tirer)
node build/chiffres.mjs   # → chiffres.gen.js : les compteurs des pages, RELEVÉS
npm run collecter --prefix build/voix  # → corpus des narrations visibles
npm run tester --prefix build/voix     # contrôle du lecteur audio local et de son repli
```

| Fichier | Rôle |
|---|---|
| `packs/fluides/cartes.js` | **source éditoriale** — c'est ici qu'on écrit |
| `packs/fluides/banque.gen.json` | banque générée — ne pas éditer à la main |
| `MATRICE-COMPETENCES.md` + `matrice.html` | **la matrice de traçabilité** : pour chaque compétence de l'arrêté, la fiche qui l'enseigne et les questions qui la vérifient. Générée, jamais saisie |
| `packs/fluides/pack.eleve.js` | build élève, **purgé** de la couche pilote |
| `packs/fluides/pack.pilote.js` | build formateur, **avec** les notes |
| `moteur/` | moteur générique, repris tel quel de [`frigorx/r408`](https://github.com/frigorx/r408) |
| `moteur/voix.js` + `moteur/voix-index.js` | couche vocale locale commune : MP3 connu, synthèse du navigateur en repli |

`convert.mjs` refuse d'écrire si une question est incohérente ; `build.mjs` refuse de construire
si un lien pointe vers une carte inexistante, si un examen demande plus de questions que la banque
n'en contient, ou **si la moindre note formateur se retrouve dans la sortie élève**.

### ⚠️ Décision à trancher : la console formateur est-elle publiée ?

En l'état, `formateur.html` et `pack.pilote.js` **sont publiés**, pour que les collègues puissent
voir la couche pilote sans installation. Les notes formateur ne sont pas des corrigés d'examen —
ce sont des conseils d'animation — mais elles deviennent publiques.

Depuis le 25/07, `formateur.html` et `projection.html` **exigent le code d'accès** (niveau 1) : le
mot de passe `prof`, qui était en clair dans `moteur.js`, n'existe plus. Seule l'empreinte du code
est versionnée, jamais le code lui-même.

Pour les retirer complètement de la publication : supprimer `formateur.html`, `projection.html` et
`packs/fluides/pack.pilote.js` du dépôt, et les régénérer en local par `node build/build.mjs`. Le
mode « Pilotage » resterait alors accessible depuis `index.html` mais **n'afficherait rien**, faute
de notes dans le build élève — ce qui est le comportement voulu par la règle « pas de secret dans
le navigateur élève ».

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
