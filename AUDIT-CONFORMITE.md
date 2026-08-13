# Audit global de conformité — Pilote Fluides

> Fichier généré par `node build/audit-conformite.mjs` — ne pas éditer à la main.
> Il contrôle les sources statiques. Il ne remplace ni la relecture métier par un frigoriste, ni les essais visuels et interactifs.

## En un coup d’œil

| Mesure | Résultat |
|---|---:|
| Cours interactifs recensés | **24** |
| Cours avec anomalie critique automatisable | **0** |
| Cours avec dette documentaire ou de reprise | **12** |
| Cours contenant des médias sans `SOURCES-IMAGES.md` | **9** |
| SVG pédagogiques contrôlés | **44** |
| SVG sans titre / sans description textuelle | **1 / 39** |

## Contrôle des cours interactifs

| Cours | HTML | Hors ligne | Typo | Impression | Lisibilité | Médias | Registre droits | État |
|---|---|---|---|---|---|---:|---|---|
| `bilan-thermique-performance-interactif` | ✓ | ✓ | ✓ | ✓ | commune | 3 | ✗ | 🟠 SOURCES-IMAGES.md |
| `capsules` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟠 ancien fond #EEF2F6 (1) |
| `chaine-intervention-interactive` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `chaleur-circuit-interactif` | ✓ | ✓ | ✓ | ✗ | commune | 4 | ✗ | 🟠 impression, SOURCES-IMAGES.md, ancien fond #EEF2F6 (4) |
| `chaleur-interactive` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `circuit-organe-par-organe` | ✓ | ✓ | ✓ | ✓ | commune | 10 | ✗ | 🟠 SOURCES-IMAGES.md |
| `condenseur-interactif` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `cours-classes-securite` | ✓ | ✓ | ✓ | ✓ | commune | 1 | ✗ | 🟠 SOURCES-IMAGES.md |
| `detendeur-interactif` | ✓ | ✓ | ✓ | ✓ | absente | 4 | ✓ | 🟠 réglage de lisibilité |
| `electrovanne-interactive` | ✓ | ✓ | ✓ | ✓ | absente | 5 | ✓ | 🟠 réglage de lisibilité |
| `etancheite-interactive` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `evaporateur-interactif` | ✓ | ✓ | ✓ | ✓ | commune | 4 | ✗ | 🟠 SOURCES-IMAGES.md, ancien terme « module interactif » (2) |
| `frise-vivante` | ✓ | ✓ | ✓ | ✓ | commune | 10 | ✗ | 🟠 SOURCES-IMAGES.md |
| `froid-clim-academie` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `hydrocarbures-a1-a2` | ✓ | ✓ | ✓ | ✓ | commune | 3 | ✗ | 🟠 SOURCES-IMAGES.md, ancien terme « module interactif » (1) |
| `intervention-hydrocarbures-interactive` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `mission-bouteilles` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `nomenclature-interactive` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `pose-manifold-2-voies-interactive` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `pose-manifold-interactive` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `pression-temperature-interactive` | ✓ | ✓ | ✓ | ✓ | commune | — | — | 🟢 contrôle statique tenu |
| `recuperation-fluide-interactive` | ✓ | ✓ | ✓ | ✓ | commune | 3 | ✓ | 🟢 contrôle statique tenu |
| `tome-3-technologie-organes` | ✓ | ✓ | ✓ | ✓ | locale | 44 | ✗ | 🟠 SOURCES-IMAGES.md |
| `vanne-service-interactive` | ✓ | ✓ | ✓ | ✓ | commune | 1 | ✗ | 🟠 SOURCES-IMAGES.md |

## Titres et descriptions des SVG

- Sans titre : `motif-flocon.svg`.
- Sans description : `aptitude-capacite.svg`, `balayage-azote.svg`, `balayage-detecteur.svg`, `chaleur-sensible-latente.svg`, `charge-limite-local.svg`, `classes-securite.svg`, `co2-nh3-compare.svg`, `co2-point-bas.svg`, `co2-protection.svg`, `compresseurs.svg`, `detendeur-regulation.svg`, `detendeurs-ligne.svg`, `diagramme-logph.svg`, `echangeur-air.svg`, `epreuve-azote.svg`, `familles-fluides.svg`, `frise-histoire.svg`, `givre-degivrage.svg`, `intro-securite.svg`, `lecture-table.svg`, `lie-domaine.svg`, `manifold-lecture.svg`, `mesure-surchauffe.svg`, `motif-flocon.svg`, `nomenclature.svg`, `ordre-vannes.svg`, `pesee-charge.svg`, `prepa-chantier.svg`, `pression-absolue-relative.svg`, `prp-echelle.svg`, `recuperation.svg`, `s1-double-accident.svg`, `secu-bouteille.svg`, `secu-consignation.svg`, `secu-decomposition-ari.svg`, `secu-espace-clos.svg`, `secu-flamme.svg`, `secu-projection.svg`, `tirage-au-vide.svg`.

## Ce que cet audit ne valide pas

- l’exactitude scientifique, réglementaire ou sécuritaire du contenu ;
- les droits d’un média simplement parce qu’un fichier de registre existe ;
- le déroulé réel d’une animation, la qualité de la voix ou le fonctionnement d’un quiz ;
- l’absence de défilement et de contenu coupé aux quatre formats cibles ;
- la conformité WCAG complète.

Ces points restent couverts par la relecture métier, le registre des droits renseigné sur preuve et les essais navigateur.
