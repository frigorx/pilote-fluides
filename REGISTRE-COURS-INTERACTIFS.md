# Registre des cours interactifs — pack habilitation fluides

> **Fichier GÉNÉRÉ — ne pas le modifier à la main.** `node build/registre.mjs`
> (lancé aussi par `build/build.mjs`). Il relève trois sources et les croise : le
> disque, les appels depuis les fiches, et la couverture déclarée par chaque cours.
> Un registre tenu à la main ment au bout de trois entrées.

## En un coup d'œil

| | |
|---|---|
| Cours interactifs en place | **16** |
| Fiches qui en appellent au moins un | **21** |
| Codes du référentiel couverts par un cours | **71** |
| Codes encore expliqués par du texte seul | **28** |
| Poids total des cours | **4.5 Mo** |

## Anomalies

### 🟡 Sans couverture déclarée

Ils enseignent, mais rien ne le prouve — et c'est la première question d'un auditeur.
- `chaleur-circuit-interactif`
- `chaleur-interactive`
- `circuit-organe-par-organe`
- `cours-classes-securite`
- `frise-vivante`
- `froid-clim-academie`
- `mission-bouteilles`
- `nomenclature-interactive`
- `pression-temperature-interactive`
- `tome-3-technologie-organes`


## Les cours en place

| Cours | Appelé depuis | Écrans | Codes couverts | Poids |
|---|---|---|---|---|
| `bilan-thermique-performance-interactif` | g11 | 16 | *appui : 12 codes* | 322 Ko |
| `chaleur-circuit-interactif` | g1a | — | — | 116 Ko |
| `chaleur-interactive` | g1s | — | — | 152 Ko |
| `circuit-organe-par-organe` | g6, g7, g8, g9 | — | — | 835 Ko |
| `condenseur-interactif` | g7b | 24 | 7.02 · 7.03 · 7.05 · 7.07 · 7.09 · 7.10 | 70 Ko |
| `cours-classes-securite` | cl1 | — | — | 150 Ko |
| `etancheite-interactive` | g4a, g4b, g4c | 27 | 4.01 · 4.02 · 4.03 · 4.04 · 4.05 · 4.06 · 4.07 · 4.08 · 4.09 | 63 Ko |
| `evaporateur-interactif` | g8b | 26 | 8.02 · 8.03 · 8.04 · 8.06 · 8.07 · 8.10 · 8.11 | 160 Ko |
| `frise-vivante` | c00 | — | — | 1174 Ko |
| `froid-clim-academie` | g1e | — | — | 25 Ko |
| `hydrocarbures-a1-a2` | g12 | 28 | 12.01 · 12.02 · 12.03 · 12.04 · 12.05 · 12.06 · 12.13 · 12.14 | 203 Ko |
| `intervention-hydrocarbures-interactive` | g12b | 27 | 12.07 · 12.08 · 12.09 · 12.10 · 12.11 · 12.12 | 53 Ko |
| `mission-bouteilles` | p6 | — | — | 46 Ko |
| `nomenclature-interactive` | g1c | — | — | 96 Ko |
| `pression-temperature-interactive` | g1b | — | — | 145 Ko |
| `tome-3-technologie-organes` | g6, g7, g8, g9, g9b | — | — | 1043 Ko |

Un cours en *appui* n'ajoute aucune couverture : il donne les notions que d'autres
codes supposent connues. Ne jamais le compter comme une preuve.

## Ce qui reste — fiches sans cours interactif

Classées par nombre de codes du référentiel qu'elles portent seules.

| Codes | Fiche | Titre |
|---|---|---|
| 5 | `g3` | Contrôles avant mise en service |
| 5 | `g5b` | Peser, charger, stocker, tracer |
| 5 | `g13` | CO₂ et NH₃ — reconnaître, ne pas intervenir |
| 4 | `g5a` | Récupérer sans émettre |
| 4 | `g6b` | Compresseur — installer, régler, vérifier |
| 3 | `x5` | Détective — intervention sur monobloc R-290 |
| 2 | `s1` | L'air qui manque — l'asphyxie |
| 2 | `s4` | Ce qui éclate — la pression |
| 2 | `cl2` | Explosif avant d'être perceptible — la LIE |
| 2 | `cl4` | Se protéger du CO₂ — détection, EPC et EPI |
| 2 | `p1` | Le manifold — lire, brancher, ne pas polluer |
| 2 | `p3` | Pompe à vide et vacuomètre — monter, tirer, lire |
| 2 | `p4` | La bouteille d'azote et son mano-détendeur |
| 2 | `p5` | L'ordre des vannes — la chorégraphie de l'intervention |
| 2 | `p7` | Préparation de chantier — risques, EPI, zone de travail |
| 2 | `g2` | Impact environnemental et F-Gas |
| 2 | `x4` | Détective — le contrôle qui tourne mal |
| 2 | `x3` | Détective — la bouteille de récupération |
| 2 | `x2` | Exercice — la machine ne fait plus de froid |
| 2 | `g10` | Tuyauterie et brasage sous azote |

Codes encore expliqués par du texte seul : **28**

```
1.00 1.05 1.09 10.01 10.02 12.05 13.01 13.04 13.14 14.01 2.01 2.02 3.01 3.02 3.03 3.04 3.05 5.01 5.02 5.03 5.04 5.07 5.08 5.09 6.02 6.04 6.06 6.08
```
