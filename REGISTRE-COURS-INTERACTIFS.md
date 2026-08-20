# Registre des cours interactifs — pack habilitation fluides

> **Fichier GÉNÉRÉ — ne pas le modifier à la main.** `node build/registre.mjs`
> (lancé aussi par `build/build.mjs`). Il relève trois sources et les croise : le
> disque, les appels depuis les fiches, et la couverture déclarée par chaque cours.
> Un registre tenu à la main ment au bout de trois entrées.

## En un coup d'œil

| | |
|---|---|
| Cours interactifs en place | **60** |
| Fiches qui en appellent au moins un | **50** |
| Codes du référentiel couverts par un cours | **99** |
| Codes encore expliqués par du texte seul | **0** |
| Poids total des cours | **34.2 Mo** |

## Anomalies

### 🟠 Cours orphelins — présents, mais aucune fiche ne les appelle

Du travail fait que personne ne peut atteindre depuis le parcours.
- `circuit-huile-interactif` — 26 Ko
- `clapet-differentiel-huile-pedagogique` — 1226 Ko
- `diagnostic-circuit-huile` — 905 Ko
- `diagnostic-circuit-huile-conclure` — 744 Ko
- `diagramme-enthalpique` — 724 Ko
- `elements-circuit-huile` — 863 Ko
- `elements-circuit-huile-regler` — 892 Ko
- `fil-conducteur-intervention` — 283 Ko
- `film-effet-de-serre` — 1207 Ko
- `film-ozone` — 1053 Ko
- `glissement-temperature` — 179 Ko
- `parcours-manometres` — 245 Ko
- `pressostat-bp-kp1` — 1242 Ko
- `pressostat-combine-kp15` — 929 Ko
- `pressostat-differentiel-huile-pedagogique` — 936 Ko
- `pressostat-hp-kp5` — 1271 Ko
- `pressostat-huile-securite` — 865 Ko
- `regulateur-electronique-interactif` — 164 Ko
- `regulateur-huile-mecanique-pedagogique` — 1252 Ko
- `regulateur-kvl-pedagogique` — 2 Ko
- `reservoir-huile-pedagogique` — 1354 Ko
- `retour-huile-naturel` — 948 Ko
- `retour-huile-verifier` — 1132 Ko
- `separateur-huile-pedagogique` — 1420 Ko
- `technologie-huiles-choix-controle` — 1356 Ko
- `technologie-huiles-frigorifiques` — 1238 Ko
- `traxoil-installer` — 871 Ko
- `traxoil-pedagogique` — 648 Ko

### 🟡 Sans couverture déclarée

Ils enseignent, mais rien ne le prouve — et c'est la première question d'un auditeur.
- `circuit-huile-interactif`
- `clapet-differentiel-huile-pedagogique`
- `diagnostic-circuit-huile`
- `diagnostic-circuit-huile-conclure`
- `diagramme-enthalpique`
- `elements-circuit-huile`
- `elements-circuit-huile-regler`
- `fil-conducteur-intervention`
- `film-effet-de-serre`
- `film-ozone`
- `pressostat-differentiel-huile-pedagogique`
- `pressostat-huile-securite`
- `regulateur-huile-mecanique-pedagogique`
- `regulateur-kvl-pedagogique`
- `reservoir-huile-pedagogique`
- `retour-huile-naturel`
- `retour-huile-verifier`
- `separateur-huile-pedagogique`
- `technologie-huiles-choix-controle`
- `technologie-huiles-frigorifiques`
- `traxoil-installer`
- `traxoil-pedagogique`


## Les cours en place

| Cours | Appelé depuis | Écrans | Codes couverts | Poids |
|---|---|---|---|---|
| `bilan-thermique-performance-interactif` | g11 | 16 | *appui : 12 codes* | 326 Ko |
| `bouteille-liquide-pedagogique` | g9b | 14 | 1.05 | 128 Ko |
| `capsules` | s1, s2, s3, s4, s5, cl2, cl3, cl4, p4, p7, g0, g1d, g2a, g2, x1, g3, x4, g5a, g5b, x3, x2, g10, x5, g13 | 151 | 1.00 · 1.05 · 1.09 · 10.01 · 10.02 · 11.03 · 12.02 · 12.04 · 12.05 · 12.06 · 12.13 · 13.01 · 13.04 · 13.14 · 14.01 · 2.01 · 2.02 · 3.01 · 3.02 · 3.03 · 3.04 · 3.05 · 4.02 · 4.04 · 4.08 · 5.01 · 5.02 · 5.03 · 5.04 · 5.05 · 5.06 · 5.07 · 5.08 · 5.09 · 8.08 | 405 Ko |
| `chaine-intervention-interactive` | p1, p3, p5 | 25 | 3.03 · 3.04 · 4.05 · 5.01 · 5.02 | 61 Ko |
| `chaleur-circuit-interactif` | g1a | — | 1.01 · 1.02 · 1.04 | 121 Ko |
| `chaleur-interactive` | g1s | — | 1.02 | 158 Ko |
| `circuit-huile-interactif` | **orphelin** | — | — | 26 Ko |
| `circuit-organe-par-organe` | g6, g7, g8, g9 | — | 1.04 | 843 Ko |
| `clapet-differentiel-huile-pedagogique` | **orphelin** | — | — | 1226 Ko |
| `compresseur-interactif` | g6, g6b | 13 | 6.02 · 6.03 · 6.04 · 6.05 · 9.07 | 74 Ko |
| `condenseur-interactif` | g7b | 25 | 7.02 · 7.03 · 7.05 · 7.07 · 7.09 · 7.10 · 7.06 · 7.08 | 77 Ko |
| `cours-classes-securite` | cl1 | — | 1.08 | 156 Ko |
| `detendeur-interactif` | g9 | 14 | 1.04 · 9.10 · 9.03 | 175 Ko |
| `diagnostic-circuit-huile` | **orphelin** | — | — | 905 Ko |
| `diagnostic-circuit-huile-conclure` | **orphelin** | — | — | 744 Ko |
| `diagramme-enthalpique` | **orphelin** | — | — | 724 Ko |
| `electrovanne-interactive` | g9 | 14 | 1.05 | 180 Ko |
| `elements-circuit-huile` | **orphelin** | — | — | 863 Ko |
| `elements-circuit-huile-regler` | **orphelin** | — | — | 892 Ko |
| `etancheite-interactive` | g4a, g4b, g4c | 27 | 4.01 · 4.02 · 4.03 · 4.04 · 4.05 · 4.06 · 4.07 · 4.08 · 4.09 | 68 Ko |
| `evaporateur-interactif` | g8b | 27 | 8.02 · 8.03 · 8.04 · 8.06 · 8.07 · 8.10 · 8.11 · 8.05 · 8.09 | 166 Ko |
| `fil-conducteur-intervention` | **orphelin** | — | — | 283 Ko |
| `film-effet-de-serre` | **orphelin** | — | — | 1207 Ko |
| `film-ozone` | **orphelin** | — | — | 1053 Ko |
| `filtre-deshydrateur-pedagogique` | g9 | 15 | 1.05 | 2683 Ko |
| `frise-vivante` | c00 | 10 | 2.01 | 1178 Ko |
| `froid-clim-academie` | g1e | — | 1.02 | 30 Ko |
| `glissement-temperature` | **orphelin** | 13 | *appui : 4 codes* | 179 Ko |
| `hydrocarbures-a1-a2` | g12 | 28 | 12.01 · 12.02 · 12.03 · 12.04 · 12.05 · 12.06 · 12.13 · 12.14 | 208 Ko |
| `intervention-hydrocarbures-interactive` | g12b | 27 | 12.07 · 12.08 · 12.09 · 12.10 · 12.11 · 12.12 | 57 Ko |
| `mission-bouteilles` | p6 | — | 5.02 · 5.05 · 5.06 | 52 Ko |
| `module-compresseur` | g6 | 6 | 1.05 · 1.02 | 323 Ko |
| `nomenclature-interactive` | g1c | — | 1.06 | 101 Ko |
| `parcours-manometres` | **orphelin** | 27 | *appui : 4 codes* | 245 Ko |
| `pose-manifold-2-voies-interactive` | p1 | 8 | 4.05 · 5.01 · 12.02 | 318 Ko |
| `pose-manifold-interactive` | p1 | 6 | 4.05 · 5.01 · 5.02 · 3.03 · 3.04 | 90 Ko |
| `pression-temperature-interactive` | g1b | — | 1.02 · 1.03 | 151 Ko |
| `pressostat-bp-kp1` | **orphelin** | 26 | 6.03 · 9.06 | 1242 Ko |
| `pressostat-combine-kp15` | **orphelin** | 26 | 6.03 · 7.04 · 9.06 | 929 Ko |
| `pressostat-differentiel-huile-pedagogique` | **orphelin** | — | — | 936 Ko |
| `pressostat-hp-kp5` | **orphelin** | 26 | 6.03 · 7.04 · 9.06 | 1271 Ko |
| `pressostat-huile-securite` | **orphelin** | — | — | 865 Ko |
| `pupitre-reglage-interactif` | g9b | 9 | 9.04 · 9.06 · 7.04 | 70 Ko |
| `recuperation-fluide-interactive` | p2 | 8 | 5.01 · 5.02 · 5.03 · 5.05 · 5.06 | 184 Ko |
| `regulateur-electronique-interactif` | **orphelin** | 24 | 9.04 · 6.03 | 164 Ko |
| `regulateur-huile-mecanique-pedagogique` | **orphelin** | — | — | 1252 Ko |
| `regulateur-kvl-pedagogique` | **orphelin** | — | — | 2 Ko |
| `regulateurs-kv-pedagogiques` | g9b | 8 | 1.05 · 9.02 · 9.05 | 1140 Ko |
| `reservoir-huile-pedagogique` | **orphelin** | — | — | 1354 Ko |
| `retour-huile-naturel` | **orphelin** | — | — | 948 Ko |
| `retour-huile-verifier` | **orphelin** | — | — | 1132 Ko |
| `separateur-huile-pedagogique` | **orphelin** | — | — | 1420 Ko |
| `surchauffe-sous-refroidissement-interactif` | g1e | 13 | 5.05 · 4.05 · 1.03 · 1.06 | 101 Ko |
| `technologie-huiles-choix-controle` | **orphelin** | — | — | 1356 Ko |
| `technologie-huiles-frigorifiques` | **orphelin** | — | — | 1238 Ko |
| `tome-3-technologie-organes` | g6, g7, g8, g9, g9b | 112 | 1.04 · 1.05 · 6.01 · 7.01 · 8.01 · 9.01 | 1077 Ko |
| `traxoil-installer` | **orphelin** | — | — | 871 Ko |
| `traxoil-pedagogique` | **orphelin** | — | — | 648 Ko |
| `vanne-service-interactive` | p1, p5, g6b, g9b | 4 | 4.01 · 4.05 · 5.01 | 181 Ko |
| `voyant-liquide-pedagogique` | g9 | 18 | 1.05 | 163 Ko |

Un cours en *appui* n'ajoute aucune couverture : il donne les notions que d'autres
codes supposent connues. Ne jamais le compter comme une preuve.

## Ce qui reste — fiches sans cours interactif

Classées par nombre de codes du référentiel qu'elles portent seules.

| Codes | Fiche | Titre |
|---|---|---|

Codes encore expliqués par du texte seul : **0**

```

```
