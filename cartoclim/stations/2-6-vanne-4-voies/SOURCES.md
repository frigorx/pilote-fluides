# Sources — 2.6 La vanne 4 voies : froid ou chaud

## Photographies (`assets/biblio/`)
- `fd4279c1a0.jpeg` — unité extérieure de pompe à chaleur, fixée au mur d'une maison (350 × 263). Trouvée dans
  `03_BAC-MFER/S2-Systemes/13 Le fonctionnement PAC.docx`. Un petit badge de marque est visible sur le boîtier
  de l'appareil photographié (c'est l'objet, pas un filigrane) : à confirmer par Franck.
- `e2e7fed2c7.jpeg` — grosse unité extérieure posée au pied d'un bâtiment (456 × 471). Trouvée dans
  `03_BAC-MFER/S2-Systemes/PRWA1000005A_Installation PAC-WT05.pdf` (notice constructeur : documentation, pas publication).

Trouvées par `node outils/chercher-images.mjs "pompe à chaleur réversible unité extérieure" --photo --copier 2-6-vanne-4-voies`.
**Aucune photo de la vanne elle-même** : toutes les images de vanne 4 voies de la base portent un logo ou un
filigrane tiers (schéma en coupe d'un fabricant, schéma d'un site de formation, dessin de catalogue). Elles sont
écartées, la scène du temps 2 est un dessin original.
Écartées aussi : quatre vignettes de catalogue (logos de marques visibles), des photos de groupes de condensation
sans vanne 4 voies, le petit schéma « mode froid / mode chaud » d'un cours (très basse définition, redondant
avec la scène).

## Symbole (`assets/`)
- `valv-4vias.svg` — bibliothèque inerWeb, collection QElectroTech (CC BY 3.0), copié de `assets/symboles/`, rien redessiné.

## Scène du temps 2 (`scenes.js`)
Dessin original, écrit pour cette station. Principe de fonctionnement tiré de :
- `V4V.docx` (02_CAP-IFCA/Collegues-Partages), lu en entier : quatre raccordements dont trois côte à côte,
  aspiration sur celui du milieu, refoulement seul de l'autre côté (parfois décalé) ; tiroir entre deux pistons
  percés d'un petit orifice, avec pointeau ; vanne pilote à trois voies, voie centrale reliée à la basse
  pression ; le tiroir ne bouge que si haute et basse pression sont présentes (pilote alimentée, vanne non
  montée : on entend le clic, le tiroir ne bouge pas) ; le fluide traverse le capillaire dans l'autre sens après
  inversion ; risque de coups de liquide à l'inversion, bouteille anti-coups de liquide sur l'aspiration.
- `CLIM REVRESIBLRE2 .docx` (03_BAC-MFER/S1-Analyse) : vocabulaire (vanne principale, pilote, bobine,
  capillaires, tiroir, pointeau), échangeurs nommés extérieur / intérieur.

## Ce qui n'a pas été repris (donc omis)
- Tout chiffre : un cours cite un seuil chiffré de différence de pression pour que le tiroir bascule ; il n'est
  pas sourcé constructeur, la station dit seulement « une différence de pression suffisante ».
- Les dimensions des raccords et les références constructeur des images de catalogue.

## Dits de métier non retrouvés dans le fonds (à valider par Franck)
- « Selon le modèle, la bobine est alimentée en chaud ou en froid » : les deux cours consultés ne fixent pas
  le mode ; la station dit « selon le modèle » et prend « alimentée = chaud » pour le dessin.
- Protection au brasage « chiffon mouillé ou produit prévu pour cela » ; « la bobine se retire sans ouvrir le circuit » ;
  « un schéma ne montre qu'une position ».

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins pédagogiques, avec
citation, en prototype. Toute image signalée sera remplacée.
