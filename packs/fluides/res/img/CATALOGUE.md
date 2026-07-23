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
| `../svg/croix-frigoriste.svg` | schéma | `g1a` (illustration de tête) + ressource globale | SVG à la main ; symboles compresseur, détendeur thermostatique à égalisation externe et ventilateur axial repris de `usine-contenu/bibliotheque-symboles/svg/frigo_schema/` |

---

## À produire — schémas (SVG, prioritaires)

| Cible | Contenu attendu | Carte |
|---|---|---|
| `points-de-fuite.svg` | circuit type avec pastilles numérotées sur chaque point à risque : raccords flare, presse-étoupes, brasures, bornes hermétiques, vibrations | `g4a` |
| `lecture-croisee.svg` | extrait de table de saturation avec la ligne surlignée : pression théorique / pression mesurée / écart | `g1b`, `g4b` |
| `balayage-azote.svg` | montage du balayage à l'azote pendant le brasage : bouteille, détendeur, tuyau, sortie | `g10` |
| `recuperation.svg` | montage du groupe de récupération : machine, flexibles, cylindre sur balance | `g5a` |

## À produire — ambiance (génératif)

Préfixe de prompt commun à conserver d'une image à l'autre, pour garder un style homogène :

> *Illustration technique éditoriale, style plat et sobre, fonds clairs, palette bleu marine
> `#1b3a63` et orange `#ff6b35`, lumière d'atelier neutre, sans aucun texte ni logo, cadrage large.*

| Cible | Sujet | Carte |
|---|---|---|
| `illu-a1.png` | atelier frigorifique, plusieurs postes, ambiance formation adulte | `m-a1` |
| `illu-a2.png` | petit équipement : monosplit, vitrine, monobloc | `m-a2` |
| `illu-d.png` | poste de récupération, cylindres, balance | `m-d` |
| `illu-e.png` | technicien manomètre en main devant un groupe extérieur | `m-e` |
| `illu-securite.png` | EPI du poste de brasage : lunettes, gants, bouteille d'azote | `g10`, `g12` |

**Tenir à jour** : une ligne par image produite, avec sa source et le prompt exact utilisé.
