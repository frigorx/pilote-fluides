# Audit global de conformité — Pilote Fluides

> Fichier généré par `node build/audit-conformite.mjs` — ne pas éditer à la main.
> Il contrôle les sources statiques. Il ne remplace ni la relecture métier par un frigoriste, ni les essais visuels et interactifs.

## En un coup d’œil

| Mesure | Résultat |
|---|---:|
| Cours interactifs recensés | **64** |
| Cours avec anomalie critique automatisable | **24** |
| Cours avec dette documentaire ou de reprise | **46** |
| Cours contenant des médias sans `SOURCES-IMAGES.md` | **10** |
| SVG pédagogiques contrôlés | **46** |
| SVG sans titre / sans description textuelle | **3 / 41** |

## Contrôle des cours interactifs

| Cours | HTML | Hors ligne | Typo | Impression | Lisibilité | Médias | Registre droits | État |
|---|---|---|---|---|---|---:|---|---|
| `_circuit-huile-commun` | ✗ | ✓ | ✓ | ✓ | absente | 1 | ✗ | 🔴 description |
| `bilan-thermique-performance-interactif` | ✓ | ✓ | ✓ | ✓ | commune | 3 | ✗ | 🟠 SOURCES-IMAGES.md |
| `bouteille-liquide-pedagogique` | ✓ | ✓ | ✓ | ✓ | absente | 11 | ✓ | 🟠 réglage de lisibilité |
| `capsules` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟠 ancien fond #EEF2F6 (1) |
| `chaine-intervention-interactive` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `chaleur-circuit-interactif` | ✓ | ✓ | ✓ | ✗ | commune | 4 | ✗ | 🟠 impression, SOURCES-IMAGES.md, ancien fond #EEF2F6 (4) |
| `chaleur-interactive` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `circuit-huile-interactif` | ✗ | ✓ | ✓ | ✓ | commune | — | — | 🔴 description |
| `circuit-organe-par-organe` | ✓ | ✓ | ✓ | ✓ | commune | 10 | ✗ | 🟠 SOURCES-IMAGES.md |
| `clapet-differentiel-huile-pedagogique` | ✗ | ✓ | ✓ | ✗ | commune | — | — | 🔴 description |
| `co2-r744` | ✓ | ✓ | ✓ | ✓ | commune | 5 | ✓ | 🟢 contrôle statique tenu |
| `compresseur-interactif` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `condenseur-interactif` | ✓ | ✓ | ✓ | ✓ | commune | 3 | ✓ | 🟢 contrôle statique tenu |
| `cours-classes-securite` | ✓ | ✓ | ✓ | ✓ | commune | 1 | ✗ | 🟠 SOURCES-IMAGES.md |
| `detendeur-interactif` | ✓ | ✓ | ✓ | ✓ | absente | 4 | ✓ | 🟠 réglage de lisibilité |
| `diagnostic-circuit-huile` | ✗ | ✓ | ✓ | ✗ | commune | — | — | 🔴 description |
| `diagnostic-circuit-huile-conclure` | ✗ | ✓ | ✓ | ✗ | commune | — | — | 🔴 description |
| `diagramme-enthalpique` | ✓ | ✓ | ✓ | ✓ | absente | — | — | 🟠 réglage de lisibilité |
| `electrovanne-interactive` | ✓ | ✓ | ✓ | ✓ | absente | 5 | ✓ | 🟠 réglage de lisibilité |
| `elements-circuit-huile` | ✗ | ✓ | ✓ | ✗ | commune | — | — | 🔴 description |
| `elements-circuit-huile-regler` | ✗ | ✓ | ✓ | ✗ | commune | — | — | 🔴 description |
| `etancheite-interactive` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `evaporateur-interactif` | ✓ | ✓ | ✓ | ✓ | commune | 4 | ✗ | 🟠 SOURCES-IMAGES.md, ancien terme « module interactif » (2) |
| `fil-conducteur-intervention` | ✓ | ✓ | ✓ | ✗ | absente | 1 | ✓ | 🟠 impression, réglage de lisibilité |
| `film-effet-de-serre` | ✓ | ✓ | ✓ | ✓ | absente | — | — | 🔴 fonds forcés à l’impression |
| `film-ozone` | ✓ | ✓ | ✓ | ✓ | absente | — | — | 🔴 fonds forcés à l’impression |
| `filtre-deshydrateur-pedagogique` | ✓ | ✓ | ✓ | ✓ | absente | 17 | ✓ | 🟠 réglage de lisibilité |
| `frise-vivante` | ✓ | ✓ | ✓ | ✓ | commune | 10 | ✗ | 🟠 SOURCES-IMAGES.md |
| `froid-clim-academie` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `glissement-temperature` | ✓ | ✓ | ✓ | ✓ | commune | 2 | ✓ | 🟠 ancien fond #EEF2F6 (2) |
| `hydrocarbures-a1-a2` | ✓ | ✓ | ✓ | ✓ | commune | 3 | ✗ | 🟠 SOURCES-IMAGES.md, ancien terme « module interactif » (1) |
| `intervention-hydrocarbures-interactive` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `mission-bouteilles` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `module-compresseur` | ✗ | ✓ | ✓ | ✓ | absente | — | — | 🔴 description |
| `nomenclature-interactive` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `parcours-manometres` | ✓ | ✓ | ✓ | ✓ | commune | 6 | ✓ | 🟠 ancien fond #EEF2F6 (2) |
| `pose-manifold-2-voies-interactive` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `pose-manifold-interactive` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `pression-temperature-interactive` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `pressostat-bp-kp1` | ✓ | ✓ | ✓ | ✓ | absente | 14 | ✓ | 🟠 réglage de lisibilité |
| `pressostat-combine-kp15` | ✓ | ✓ | ✓ | ✓ | absente | 10 | ✓ | 🟠 réglage de lisibilité |
| `pressostat-differentiel-huile-pedagogique` | ✗ | ✓ | ✓ | ✓ | commune | — | — | 🔴 description |
| `pressostat-hp-kp5` | ✓ | ✓ | ✓ | ✓ | absente | 15 | ✓ | 🟠 réglage de lisibilité |
| `pressostat-huile-securite` | ✗ | ✓ | ✓ | ✗ | commune | — | — | 🔴 description |
| `pupitre-reglage-interactif` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `recuperation-fluide-interactive` | ✓ | ✓ | ✓ | ✓ | commune | 3 | ✓ | 🟢 contrôle statique tenu |
| `regulateur-electronique-interactif` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `regulateur-huile-mecanique-pedagogique` | ✗ | ✓ | ✓ | ✗ | commune | — | — | 🔴 description |
| `regulateur-kvl-pedagogique` | ✗ | ✓ | ✓ | ✗ | absente | — | — | 🔴 description |
| `regulateur-kvr-nrd` | ✓ | ✓ | ✓ | ✓ | absente | — | — | 🔴 fonds forcés à l’impression |
| `regulateurs-kv-pedagogiques` | ✓ | ✓ | ✓ | ✓ | absente | 8 | ✓ | 🟠 réglage de lisibilité |
| `reservoir-huile-pedagogique` | ✗ | ✓ | ✓ | ✗ | commune | — | — | 🔴 description |
| `retour-huile-naturel` | ✗ | ✓ | ✓ | ✗ | commune | — | — | 🔴 description |
| `retour-huile-verifier` | ✗ | ✓ | ✓ | ✓ | commune | — | — | 🔴 description |
| `separateur-eclatement-pedagogique` | ✗ | ✓ | ✓ | ✓ | commune | — | — | 🔴 description |
| `separateur-huile-pedagogique` | ✗ | ✓ | ✓ | ✗ | commune | — | — | 🔴 description |
| `surchauffe-sous-refroidissement-interactif` | ✓ | ✓ | ✓ | ✓ | absente | — | — | 🟠 réglage de lisibilité |
| `technologie-huiles-choix-controle` | ✗ | ✓ | ✓ | ✗ | commune | — | — | 🔴 description |
| `technologie-huiles-frigorifiques` | ✗ | ✓ | ✓ | ✗ | commune | — | — | 🔴 description |
| `tome-3-technologie-organes` | ✓ | ✓ | ✓ | ✓ | locale | 44 | ✗ | 🟠 SOURCES-IMAGES.md |
| `traxoil-installer` | ✗ | ✓ | ✓ | ✗ | commune | — | — | 🔴 description |
| `traxoil-pedagogique` | ✗ | ✓ | ✓ | ✗ | commune | — | — | 🔴 description |
| `vanne-service-interactive` | ✓ | ✓ | ✓ | ✓ | commune | 1 | ✗ | 🟠 SOURCES-IMAGES.md |
| `voyant-liquide-pedagogique` | ✓ | ✓ | ✓ | ✓ | absente | 10 | ✓ | 🟠 réglage de lisibilité |

## Titres et descriptions des SVG

- Sans titre : `coup-de-liquide-piston.svg`, `coup-de-liquide-principe.svg`, `motif-flocon.svg`.
- Sans description : `aptitude-capacite.svg`, `balayage-azote.svg`, `balayage-detecteur.svg`, `chaleur-sensible-latente.svg`, `charge-limite-local.svg`, `classes-securite.svg`, `co2-nh3-compare.svg`, `co2-point-bas.svg`, `co2-protection.svg`, `compresseurs.svg`, `coup-de-liquide-piston.svg`, `coup-de-liquide-principe.svg`, `detendeur-regulation.svg`, `detendeurs-ligne.svg`, `diagramme-logph.svg`, `echangeur-air.svg`, `epreuve-azote.svg`, `familles-fluides.svg`, `frise-histoire.svg`, `givre-degivrage.svg`, `intro-securite.svg`, `lecture-table.svg`, `lie-domaine.svg`, `manifold-lecture.svg`, `mesure-surchauffe.svg`, `motif-flocon.svg`, `nomenclature.svg`, `ordre-vannes.svg`, `pesee-charge.svg`, `prepa-chantier.svg`, `pression-absolue-relative.svg`, `prp-echelle.svg`, `recuperation.svg`, `s1-double-accident.svg`, `secu-bouteille.svg`, `secu-consignation.svg`, `secu-decomposition-ari.svg`, `secu-espace-clos.svg`, `secu-flamme.svg`, `secu-projection.svg`, `tirage-au-vide.svg`.

## Ce que cet audit ne valide pas

- l’exactitude scientifique, réglementaire ou sécuritaire du contenu ;
- les droits d’un média simplement parce qu’un fichier de registre existe ;
- le déroulé réel d’une animation, la qualité de la voix ou le fonctionnement d’un quiz ;
- l’absence de défilement et de contenu coupé aux quatre formats cibles ;
- la conformité WCAG complète.

Ces points restent couverts par la relecture métier, le registre des droits renseigné sur preuve et les essais navigateur.
