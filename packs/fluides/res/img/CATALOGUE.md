# Catalogue des visuels du pack

## Règle de tri — impérative

| Famille | Quoi | Production |
|---|---|---|
| **Schéma technique** | circuit frigorifique, croix du frigoriste, raccordement manifold, composants, symboles normalisés | **SVG à la main**, à partir de la bibliothèque de symboles inerWeb (348 symboles). **Jamais de génératif.** |
| **Illustration d'ambiance** | scène d'atelier, technicien en EPI, mise en situation | génératif autorisé, charte Édu, **sans texte dans l'image** |

**Pourquoi.** Aucun modèle d'image ne respecte la croix du frigoriste — détendeur à gauche,
compresseur à droite, condenseur en haut, évaporateur en bas, condenseur à air simple. Il produit
des tuyauteries impossibles et des composants inventés. Sur un support destiné à des
professionnels, c'est disqualifiant.

---

## Fait

| Fichier | Type | Carte | Source |
|---|---|---|---|
| `../svg/croix-frigoriste.svg` | schéma | `g1a`, dans le corps + ressource globale | SVG à la main ; symboles compresseur, détendeur thermostatique à égalisation externe et ventilateur axial repris de `usine-contenu/bibliotheque-symboles/svg/frigo_schema/` |
| `../svg/points-de-fuite.svg` | schéma | `g4a`, dans le corps + ressource globale | SVG à la main, même disposition que la croix ; 6 familles de points de fuite numérotées |
| `illu-a1.jpg` | ambiance | `m-a1` (bandeau) | Gemini, 23/07/2026 — voir prompts ci-dessous |
| `illu-a2.jpg` | ambiance | `m-a2` (bandeau) | Gemini, 23/07/2026 |
| `illu-d.jpg` | ambiance | `m-d` (bandeau) | Gemini, 23/07/2026 |
| `illu-e.jpg` | ambiance | `m-e` (bandeau) | Gemini, 23/07/2026 |

> ⚠️ **Un schéma ne se met pas en `illus`** : la charte recadre l'illustration de tête
> (`object-fit: cover`, hauteur max 340 px) et tronquerait le dessin. Les schémas passent par
> l'assistant `schema()` de `cartes.js`, qui les insère dans le corps en largeur pleine.
> Les images d'ambiance, elles, sont faites pour le bandeau — elles sont recadrées en **1400 × 520**
> (rapport du bandeau, en gardant le haut) et exportées en JPEG qualité 85, ≈ 120 Ko pièce.

### Prompts utilisés (à réutiliser tels quels pour rester homogène)

Préfixe commun, posé sur la première image et rappelé ensuite par « même style, même palette,
16:9, sans texte » :

> *Illustration technique éditoriale, dessin plat en aplats, sobre, fond clair, palette bleu marine
> `#1b3a63` et orange `#ff6b35`, lumière d'atelier neutre, aucun texte ni logo ni chiffre dans
> l'image. Cadrage large, ambiance calme et professionnelle.*

| Image | Sujet demandé |
|---|---|
| `illu-a1.jpg` | atelier de formation en froid et climatisation, deux techniciens adultes en tenue de travail avec lunettes et gants devant un banc d'essai frigorifique, l'un tenant un manifold à deux manomètres relié par des flexibles |
| `illu-a2.jpg` | local technique avec du petit équipement — monosplit mural, vitrine réfrigérée, meuble monobloc — et un technicien accroupi, balance électronique et bouteille de fluide au sol |
| `illu-d.jpg` | poste de récupération : groupe de récupération portable relié par deux flexibles à une bouteille grise posée sur une balance, bidon d'huile usagée à côté |
| `illu-e.jpg` | contrôle d'étanchéité en extérieur : technicien devant un groupe de condensation, manifold branché d'une main, détecteur électronique à sonde souple de l'autre |

---

## Reste à produire

### Schémas (SVG, prioritaires)

| Cible | Contenu attendu | Carte |
|---|---|---|
| `lecture-croisee.svg` | extrait de table de saturation avec la ligne surlignée : pression théorique / pression mesurée / écart | `g1b`, `g4b` |
| `balayage-azote.svg` | montage du balayage à l'azote pendant le brasage : bouteille, détendeur, tuyau, sortie | `g10` |
| `recuperation.svg` | montage du groupe de récupération : machine, flexibles, cylindre sur balance | `g5a` |
| `manifold.svg` | raccordement d'un manifold : BP à gauche, HP à droite, flexible de service | `g4b`, `g5b` |

### Ambiance (génératif)

| Cible | Sujet | Carte |
|---|---|---|
| `illu-securite.jpg` | poste de brasage : lunettes, gants, bouteille d'azote, extincteur | `g10`, `g12` |
| `illu-hc.jpg` | intervention sur un monobloc au R-290 : ventilation, détecteur de gaz, outillage dédié | `g12` |

**Tenir à jour** : une ligne par image produite, avec sa source et le prompt exact utilisé.
