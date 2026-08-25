# Registre des médias — inerWeb HoCourant

Deux familles d'images, deux rôles : la **photographie** porte la situation
(au-dessus de la question), le **schéma SVG** porte l'explication (en remédiation,
et comme mise en situation là où aucune photographie ne convient).

## 1. Schémas SVG — créations originales inerWeb

27 scènes et 3 panneaux techniques écrits à la main dans `donnees/scenes.js` et
`donnees/cours.js`. Aucun décalque, aucune imitation d'illustration existante.

| Visuel | Où | Droits |
|---|---|---|
| 27 scènes de situation (trait bleu marine, un accent orange, sans texte) | `donnees/scenes.js` | © inerWeb 2026 |
| Échelle des domaines de tension | module M4 | © inerWeb 2026 |
| Zones autour d'une pièce nue (BT) | module M7 | © inerWeb 2026 |
| Étapes de la consignation | module M9 | © inerWeb 2026 |

Conformité charte vérifiée par contrôle automatique : aucun `<text>` dans les scènes,
un accent orange par image, `<title>`/`<desc>` renseignés pour les lecteurs d'écran.

## 2. Photographies de mise en situation — 30 fichiers

**Origine** : livret *inerWeb HoCourant v2.1*, dossier `assets/scenes-diversite-v2`,
produit par la chaîne « inerWeb full ia » de F. Henninot le 24/08/2026.
Le document source les déclare : « créations originales inerWeb.fr / OpenAI ImageGen,
recadrées et légendées par le générateur local ; aucune photographie documentaire ni
média tiers intégré » (`03-DOCUMENTATION/STATUT.md`).

| Champ | Valeur |
|---|---|
| Auteur / titulaire | inerWeb — F. Henninot |
| Mode de production | génération d'image (OpenAI ImageGen), recadrage et sélection par l'auteur |
| Média tiers | aucun |
| Usages permis | intégration, diffusion dans les productions inerWeb |
| Modifications | copie sans retouche ; recadrage déjà appliqué à la source |
| Poids | 30 fichiers, 5,5 Mo au total, 183 Ko en moyenne — chargement paresseux, une image par question |
| Vérification | 25/08/2026, contrôle de présence des 30 fichiers, aucun manquant |

**Dérogation actée par F. Henninot le 25/08/2026** : la charte impose des visuels non
génératifs (règle R4). Elle est levée pour ces photographies de *situation* — pas pour
les schémas techniques, qui restent des SVG faits main. Motif : les images existent
déjà, elles sont pertinentes et leur réemploi évite de reproduire un travail payé.

### ⚠️ Deux images volontairement écartées

`safe_vat.jpg` et `vat_source.jpg` (scènes de vérification d'absence de tension) ne
sont **pas** intégrées. L'audit du 24/08/2026 demande de refaire ces scènes
(correction v2.2 n° 7) : les protections du visage, des mains et du corps peuvent y
être mal interprétées. Contrôle visuel du 25/08 sur `safe_vat.jpg` : gants isolants
portés, mais aucun écran facial pour une vérification d'absence de tension.

Sur les questions de VAT, seul le schéma s'affiche — il ne montre aucun équipement,
donc n'induit rien de faux. Ces deux fichiers pourront entrer après relecture métier.

## 3. Police

**Lexend** (`moteur/polices/Lexend-variable.woff2`) — licence SIL OFL 1.1, embarquée
localement, aucun appel réseau.

## 4. Ce qui n'est pas reproduit

La NF C 18-510 est citée comme référence normative ; aucun de ses contenus protégés
n'est reproduit. Les valeurs chiffrées (domaines de tension, 3 m / 0,30 m, seuils
physiologiques, repères BS) sont des repères publics diffusés par l'INRS (ED 6127,
ED 6109, dossier « risques électriques »).
