# Sources — 2.5 Détendre : capillaire et détendeur électronique

## Images (`assets/biblio/`)
- `ecb0d5a641.webp` — un tube capillaire en cuivre, enroulé. Trouvée par
  `node outils/chercher-images.mjs "tube capillaire détendeur" --photo`. Provenance dans la base :
  `inerweb/packs/fluides/res/tome-3-technologie-organes/images-organes/tube-capillaire.webp`
  (pack inerWeb « Technologie des organes »).
- `cea7b00e02.webp` — un détendeur électronique (corps de laiton, moteur, câble). Même pack :
  `.../images-organes/detendeur-electronique.webp`.
- Ce sont des **vues d'organes isolés produites pour le site inerWeb**, sans marque, sans texte, sans filigrane
  (le pack les décrit comme « vues réalistes isolées », reconnaissance seulement, jamais un plan constructeur).
  Le mode de fabrication de ces deux fichiers n'est pas consigné dans le pack : voir `_ETAT.md`.
- Écartées : une photographie de tube capillaire portant le logo d'un constructeur (Teddington) ; une
  électrovanne à bobine bleue (ce n'est pas un détendeur) ; sept images sans rapport (outils de cintrage,
  relais, variateurs, compresseurs, schéma de circuit en très grand format).

## Symboles (`assets/`)
- `capillaire.svg` — bibliothèque inerWeb, `assets/symboles/` du dépôt, collection QElectroTech (CC BY 3.0),
  `Frio/sinopticosfrio/tuyauteries/capillaire`.
- `detendeurelectronique.svg` — bibliothèque inerWeb, collection QElectroTech (CC BY 3.0),
  `60_energy/21_refrigeration/Frio/sinopticosfrio/robinetsactionneurs/detendeurelectronique.svg`.
  Il **n'est pas** dans `assets/symboles/` : copié depuis `C:\git\bibliotheque-symboles-energie\svg\` (voir « Pour l'architecte »).
  Les lettres écrites dans le rond du symbole ne sont pas interprétées dans la station.

## Fond (ce qui a servi à écrire, rien n'est recopié)
- `le-detendeur.pdf` (fonds de cours, dossier « Le détendeur », 2013) : rôle du détendeur sur la ligne liquide, passage de haute à
  basse pression ; capillaire = tube fin dont la longueur fixe la puissance ; détendeur électronique = pointeau
  levé ou abaissé par un moteur pas à pas dans une buse étroite, très utilisé sur les Inverter.
  Les valeurs chiffrées du document (diamètres, pressions, plage de surchauffe) ne sont **pas** reprises.
- `LES DETENDEURS FRIGORIFIQUES.docx` (fonds de cours) : le capillaire ne règle ni le débit ni la surchauffe, peut se boucher,
  charge de fluide limitée et assez précise ; à l'arrêt les pressions s'égalisent ; au passage de l'orifice, une partie du liquide se vaporise.
- Cours d'habilitation, chapitre sur les détendeurs, et HabFluide ch. 12 : le détendeur est la frontière
  entre haute et basse pression ; le capillaire est une restriction fixe sans réglage ; le détendeur électronique règle l'ouverture par un
  moteur pas à pas sous la commande d'un contrôleur. La valeur de surchauffe de ce chapitre n'est pas reprise (à lire sur la notice).
- Station en ligne « Le détendeur thermostatique en détail » (Thermo-techno) : seulement renvoyée
  (`https://inerweb.fr/packs/fluides/res/detendeur-interactif/`), pas réexpliquée.

## Ce qui n'a pas pu être sourcé, donc omis
- Toute valeur de pression, de température, de surchauffe, de longueur ou de diamètre de capillaire.
- Le nombre de pas du moteur, la plage d'ouverture du détendeur, le type de sondes de la carte : la station dit « ses sondes de
  température », sans dire où elles se fixent ni combien il y en a (le dessin en montre deux, à titre de schéma).

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins pédagogiques, avec
citation, en prototype. Toute image signalée sera remplacée.
