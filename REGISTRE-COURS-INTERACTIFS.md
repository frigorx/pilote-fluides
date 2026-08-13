# Registre des cours interactifs — pack habilitation fluides

> **Fichier GÉNÉRÉ — ne pas le modifier à la main.** `node build/registre.mjs`
> (lancé aussi par `build/build.mjs`). Il relève trois sources et les croise : le
> disque, les appels depuis les fiches, et la couverture déclarée par chaque cours.
> Un registre tenu à la main ment au bout de trois entrées.

## En un coup d'œil

| | |
|---|---|
| Cours interactifs en place | **24** |
| Fiches qui en appellent au moins un | **50** |
| Codes du référentiel couverts par un cours | **99** |
| Codes encore expliqués par du texte seul | **0** |
| Poids total des cours | **6 Mo** |

## Anomalies

### 🟡 Sans couverture déclarée

Ils enseignent, mais rien ne le prouve — et c'est la première question d'un auditeur.
- `detendeur-interactif`
- `electrovanne-interactive`


## Les cours en place

| Cours | Appelé depuis | Écrans | Codes couverts | Poids |
|---|---|---|---|---|
| `bilan-thermique-performance-interactif` | g11 | 16 | *appui : 12 codes* | 322 Ko |
| `capsules` | s1, s2, s3, s4, s5, cl2, cl3, cl4, p4, p7, g0, g1d, g2a, g2, x1, g3, x4, g5a, g5b, x3, x2, g10, x5, g13 | 151 | 1.00 · 1.05 · 1.09 · 10.01 · 10.02 · 11.03 · 12.02 · 12.04 · 12.05 · 12.06 · 12.13 · 13.01 · 13.04 · 13.14 · 14.01 · 2.01 · 2.02 · 3.01 · 3.02 · 3.03 · 3.04 · 3.05 · 4.02 · 4.04 · 4.08 · 5.01 · 5.02 · 5.03 · 5.04 · 5.05 · 5.06 · 5.07 · 5.08 · 5.09 · 8.08 | 404 Ko |
| `chaine-intervention-interactive` | p1, p3, p5 | 25 | 3.03 · 3.04 · 4.05 · 5.01 · 5.02 | 57 Ko |
| `chaleur-circuit-interactif` | g1a | — | 1.01 · 1.02 · 1.04 | 117 Ko |
| `chaleur-interactive` | g1s | — | 1.02 | 153 Ko |
| `circuit-organe-par-organe` | g6, g7, g8, g9 | — | 1.04 | 837 Ko |
| `condenseur-interactif` | g7b | 24 | 7.02 · 7.03 · 7.05 · 7.07 · 7.09 · 7.10 | 72 Ko |
| `cours-classes-securite` | cl1 | — | 1.08 | 152 Ko |
| `detendeur-interactif` | g9 | — | — | 158 Ko |
| `electrovanne-interactive` | g9 | — | — | 177 Ko |
| `etancheite-interactive` | g4a, g4b, g4c | 27 | 4.01 · 4.02 · 4.03 · 4.04 · 4.05 · 4.06 · 4.07 · 4.08 · 4.09 | 64 Ko |
| `evaporateur-interactif` | g8b | 26 | 8.02 · 8.03 · 8.04 · 8.06 · 8.07 · 8.10 · 8.11 | 160 Ko |
| `frise-vivante` | c00 | 10 | 2.01 | 1176 Ko |
| `froid-clim-academie` | g1e | — | 1.02 | 26 Ko |
| `hydrocarbures-a1-a2` | g12 | 28 | 12.01 · 12.02 · 12.03 · 12.04 · 12.05 · 12.06 · 12.13 · 12.14 | 203 Ko |
| `intervention-hydrocarbures-interactive` | g12b | 27 | 12.07 · 12.08 · 12.09 · 12.10 · 12.11 · 12.12 | 53 Ko |
| `mission-bouteilles` | p6 | — | 5.02 · 5.05 · 5.06 | 48 Ko |
| `nomenclature-interactive` | g1c | — | 1.06 | 97 Ko |
| `pose-manifold-2-voies-interactive` | p1 | 8 | 4.05 · 5.01 · 12.02 | 208 Ko |
| `pose-manifold-interactive` | p1 | 6 | 4.05 · 5.01 · 5.02 · 3.03 · 3.04 | 86 Ko |
| `pression-temperature-interactive` | g1b | — | 1.02 · 1.03 | 147 Ko |
| `recuperation-fluide-interactive` | p2 | 8 | 5.01 · 5.02 · 5.03 · 5.05 · 5.06 | 178 Ko |
| `tome-3-technologie-organes` | g6, g7, g8, g9, g9b | 112 | 1.04 · 1.05 · 6.01 · 7.01 · 8.01 · 9.01 | 1070 Ko |
| `vanne-service-interactive` | p1, p5, g6b, g9b | 4 | 4.01 · 4.05 · 5.01 | 178 Ko |

Un cours en *appui* n'ajoute aucune couverture : il donne les notions que d'autres
codes supposent connues. Ne jamais le compter comme une preuve.

## Ce qui reste — fiches sans cours interactif

Classées par nombre de codes du référentiel qu'elles portent seules.

| Codes | Fiche | Titre |
|---|---|---|

Codes encore expliqués par du texte seul : **0**

```

```
