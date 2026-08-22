# Registre des cours interactifs — pack habilitation fluides

> **Fichier GÉNÉRÉ — ne pas le modifier à la main.** `node build/registre.mjs`
> (lancé aussi par `build/build.mjs`). Il relève quatre sources et les croise : le
> disque, les appels depuis les fiches, les entrées du plan d’accueil, et la couverture déclarée par chaque cours.
> Un registre tenu à la main ment au bout de trois entrées.

## En un coup d'œil

| | |
|---|---|
| Cours interactifs en place | **74** |
| Fiches qui en appellent au moins un | **50** |
| Cours accessibles depuis le plan d’accueil | **72** |
| Codes du référentiel couverts par un cours | **99** |
| Codes encore expliqués par du texte seul | **0** |
| Poids total des cours | **63.1 Mo** |

## Anomalies

### 🟠 Cours orphelins — absents des fiches et du plan d’accueil

Du travail fait que personne ne peut atteindre depuis les points d’entrée publics.
- `regulateur-kvl-pedagogique` — 2 Ko

### 🟡 Sans couverture déclarée

Ils enseignent, mais rien ne le prouve — et c'est la première question d'un auditeur.
- `circuit-huile-interactif`
- `clapet-differentiel-huile-pedagogique`
- `commande-directe-thermostat`
- `degivrage-electrique`
- `degivrage-gaz-chauds`
- `degivrage-inversion-cycle`
- `degivrage-naturel`
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
- `protection-minimum-serie`
- `pump-down-ameliore`
- `pump-down-automatique`
- `pump-down-unique`
- `regulateur-huile-mecanique-pedagogique`
- `regulateur-kvl-pedagogique`
- `regules-interactif`
- `reservoir-huile-pedagogique`
- `retour-huile-naturel`
- `retour-huile-verifier`
- `sans-degivrage-commande`
- `separateur-eclatement-pedagogique`
- `separateur-huile-pedagogique`
- `technologie-huiles-choix-controle`
- `technologie-huiles-frigorifiques`
- `traxoil-installer`
- `traxoil-pedagogique`


## Les cours en place

| Cours | Appelé depuis | Écrans | Codes couverts | Poids |
|---|---|---|---|---|
| `bilan-thermique-performance-interactif` | g11, plan d’accueil | 16 | *appui : 12 codes* | 327 Ko |
| `bouteille-liquide-pedagogique` | g9b, plan d’accueil | 14 | 1.05 | 128 Ko |
| `capsules` | s1, s2, s3, s4, s5, cl2, cl3, cl4, p4, p7, g0, g1d, g2a, g2, x1, g3, x4, g5a, g5b, x3, x2, g10, x5, g13 | 151 | 1.00 · 1.05 · 1.09 · 10.01 · 10.02 · 11.03 · 12.02 · 12.04 · 12.05 · 12.06 · 12.13 · 13.01 · 13.04 · 13.14 · 14.01 · 2.01 · 2.02 · 3.01 · 3.02 · 3.03 · 3.04 · 3.05 · 4.02 · 4.04 · 4.08 · 5.01 · 5.02 · 5.03 · 5.04 · 5.05 · 5.06 · 5.07 · 5.08 · 5.09 · 8.08 | 405 Ko |
| `chaine-intervention-interactive` | p1, p3, p5, plan d’accueil | 25 | 3.03 · 3.04 · 4.05 · 5.01 · 5.02 | 61 Ko |
| `chaleur-circuit-interactif` | g1a, plan d’accueil | — | 1.01 · 1.02 · 1.04 | 123 Ko |
| `chaleur-interactive` | g1s, plan d’accueil | — | 1.02 | 158 Ko |
| `circuit-huile-interactif` | plan d’accueil | — | — | 26 Ko |
| `circuit-organe-par-organe` | g6, g7, g8, g9, plan d’accueil | — | 1.04 | 843 Ko |
| `clapet-differentiel-huile-pedagogique` | plan d’accueil | — | — | 2274 Ko |
| `co2-r744` | cl3, g13, plan d’accueil | 100 | 11.01 · 11.04 · 11.06 · 13.02 · 13.04 · 13.15 · 13.16 · 13.17 · 13.01 · 13.03 | 321 Ko |
| `commande-directe-thermostat` | plan d’accueil | — | — | 1182 Ko |
| `compresseur-interactif` | g6, g6b, plan d’accueil | 13 | 6.02 · 6.03 · 6.04 · 6.05 · 9.07 | 74 Ko |
| `condenseur-interactif` | g7b, plan d’accueil | 25 | 7.02 · 7.03 · 7.05 · 7.07 · 7.09 · 7.10 · 7.06 · 7.08 | 94 Ko |
| `cours-classes-securite` | cl1, plan d’accueil | — | 1.08 | 157 Ko |
| `degivrage-electrique` | plan d’accueil | — | — | 1123 Ko |
| `degivrage-gaz-chauds` | plan d’accueil | — | — | 1138 Ko |
| `degivrage-inversion-cycle` | plan d’accueil | — | — | 1129 Ko |
| `degivrage-naturel` | plan d’accueil | — | — | 1060 Ko |
| `detendeur-interactif` | g9, plan d’accueil | 14 | 1.04 · 9.10 · 9.03 | 175 Ko |
| `diagnostic-circuit-huile` | plan d’accueil | — | — | 1687 Ko |
| `diagnostic-circuit-huile-conclure` | plan d’accueil | — | — | 1493 Ko |
| `diagramme-enthalpique` | plan d’accueil | — | — | 720 Ko |
| `electrovanne-interactive` | g9, plan d’accueil | 14 | 1.05 | 180 Ko |
| `elements-circuit-huile` | plan d’accueil | — | — | 1499 Ko |
| `elements-circuit-huile-regler` | plan d’accueil | — | — | 1776 Ko |
| `etancheite-interactive` | g4a, g4b, g4c, plan d’accueil | 27 | 4.01 · 4.02 · 4.03 · 4.04 · 4.05 · 4.06 · 4.07 · 4.08 · 4.09 | 68 Ko |
| `evaporateur-interactif` | g8b, plan d’accueil | 27 | 8.02 · 8.03 · 8.04 · 8.06 · 8.07 · 8.10 · 8.11 · 8.05 · 8.09 | 166 Ko |
| `fil-conducteur-intervention` | plan d’accueil | — | — | 283 Ko |
| `film-effet-de-serre` | plan d’accueil | — | — | 1207 Ko |
| `film-ozone` | plan d’accueil | — | — | 1053 Ko |
| `filtre-deshydrateur-pedagogique` | g9, plan d’accueil | 15 | 1.05 | 2683 Ko |
| `frise-vivante` | c00, plan d’accueil | 10 | 2.01 | 1178 Ko |
| `froid-clim-academie` | g1e, plan d’accueil | — | 1.02 | 30 Ko |
| `glissement-temperature` | plan d’accueil | 13 | *appui : 4 codes* | 179 Ko |
| `hydrocarbures-a1-a2` | g12, plan d’accueil | 28 | 12.01 · 12.02 · 12.03 · 12.04 · 12.05 · 12.06 · 12.13 · 12.14 | 208 Ko |
| `intervention-hydrocarbures-interactive` | g12b, plan d’accueil | 27 | 12.07 · 12.08 · 12.09 · 12.10 · 12.11 · 12.12 | 57 Ko |
| `mission-bouteilles` | p6, plan d’accueil | — | 5.02 · 5.05 · 5.06 | 52 Ko |
| `module-compresseur` | g6, plan d’accueil | 6 | 1.05 · 1.02 | 324 Ko |
| `nomenclature-interactive` | g1c, plan d’accueil | — | 1.06 | 101 Ko |
| `parcours-manometres` | plan d’accueil | 27 | *appui : 4 codes* | 245 Ko |
| `pose-manifold-2-voies-interactive` | p1, plan d’accueil | 8 | 4.05 · 5.01 · 12.02 | 318 Ko |
| `pose-manifold-interactive` | p1, plan d’accueil | 6 | 4.05 · 5.01 · 5.02 · 3.03 · 3.04 | 90 Ko |
| `pression-temperature-interactive` | g1b, plan d’accueil | — | 1.02 · 1.03 | 151 Ko |
| `pressostat-bp-kp1` | plan d’accueil | 26 | 6.03 · 9.06 | 1242 Ko |
| `pressostat-combine-kp15` | plan d’accueil | 26 | 6.03 · 7.04 · 9.06 | 930 Ko |
| `pressostat-differentiel-huile-pedagogique` | plan d’accueil | — | — | 1681 Ko |
| `pressostat-hp-kp5` | plan d’accueil | 26 | 6.03 · 7.04 · 9.06 | 1271 Ko |
| `pressostat-huile-securite` | plan d’accueil | — | — | 1652 Ko |
| `protection-minimum-serie` | plan d’accueil | — | — | 1162 Ko |
| `pump-down-ameliore` | plan d’accueil | — | — | 1105 Ko |
| `pump-down-automatique` | plan d’accueil | — | — | 1148 Ko |
| `pump-down-unique` | plan d’accueil | — | — | 1133 Ko |
| `pupitre-reglage-interactif` | g9b, plan d’accueil | 9 | 9.04 · 9.06 · 7.04 | 71 Ko |
| `recuperation-fluide-interactive` | p2, plan d’accueil | 8 | 5.01 · 5.02 · 5.03 · 5.05 · 5.06 | 184 Ko |
| `regulateur-electronique-interactif` | plan d’accueil | 24 | 9.04 · 6.03 | 164 Ko |
| `regulateur-huile-mecanique-pedagogique` | plan d’accueil | — | — | 2415 Ko |
| `regulateur-kvl-pedagogique` | **orphelin** | — | — | 2 Ko |
| `regulateur-kvr-nrd` | plan d’accueil | 9 | 1.05 · 9.02 · 9.05 | 346 Ko |
| `regulateurs-kv-pedagogiques` | g9b, plan d’accueil | 8 | 1.05 · 9.02 · 9.05 | 1140 Ko |
| `regules-interactif` | plan d’accueil | — | — | 1 Ko |
| `reservoir-huile-pedagogique` | plan d’accueil | — | — | 2603 Ko |
| `retour-huile-naturel` | plan d’accueil | — | — | 1769 Ko |
| `retour-huile-verifier` | plan d’accueil | — | — | 2544 Ko |
| `sans-degivrage-commande` | plan d’accueil | — | — | 1142 Ko |
| `separateur-eclatement-pedagogique` | plan d’accueil | — | — | 2767 Ko |
| `separateur-huile-pedagogique` | plan d’accueil | — | — | 2693 Ko |
| `surchauffe-sous-refroidissement-interactif` | g1e, plan d’accueil | 13 | 5.05 · 4.05 · 1.03 · 1.06 | 102 Ko |
| `technologie-huiles-choix-controle` | plan d’accueil | — | — | 2282 Ko |
| `technologie-huiles-frigorifiques` | plan d’accueil | — | — | 2211 Ko |
| `tome-3-technologie-organes` | g6, g7, g8, g9, g9b, plan d’accueil | 112 | 1.04 · 1.05 · 6.01 · 7.01 · 8.01 · 9.01 | 1077 Ko |
| `traxoil-installer` | plan d’accueil | — | — | 1661 Ko |
| `traxoil-pedagogique` | plan d’accueil | — | — | 1242 Ko |
| `vanne-service-interactive` | p1, p5, g6b, g9b, plan d’accueil | 4 | 4.01 · 4.05 · 5.01 | 181 Ko |
| `voyant-liquide-pedagogique` | g9, plan d’accueil | 18 | 1.05 | 163 Ko |

Un cours en *appui* n'ajoute aucune couverture : il donne les notions que d'autres
codes supposent connues. Ne jamais le compter comme une preuve.

## Ce qui reste — fiches sans cours interactif

Classées par nombre de codes du référentiel qu'elles portent seules.

| Codes | Fiche | Titre |
|---|---|---|

Codes encore expliqués par du texte seul : **0**

```

```
