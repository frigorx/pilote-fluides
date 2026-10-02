# Sources — 5.1 Les modes et la télécommande : froid, chaud, déshumidification, ventilation

## Photographies (`assets/biblio/`)
- `c80013e97b.jpeg` — une main tient une télécommande pointée vers une unité intérieure murale (299 × 197).
  Trouvée dans `03_BAC-MFER/Froid-Frigorifique/Lycée Professionnel Privé.docx`. Aucun logo ni filigrane visible.
- `898384a2af.png` — ensemble split blanc avec télécommande (259 × 194), sans logo lisible. Même image que
  l'étalon 3.2. Trouvée dans `03_BAC-MFER/S2-Systemes/sq2 se 1tp 1 CLIM FRIOD SEUL SPLIT corection.docx`.

Trouvées par `node outils/chercher-images.mjs "télécommande climatiseur" --photo --copier 5-1-modes-telecommande`
puis `"main télécommande split climatisation murale rideau"`.
Écartées (effacées) :
- trois images de catalogue portant le logo d'une marque (Carrier, Daikin, Airton) ;
- le doublon de `898384a2af` (`da2fa26ada.jpg`, plus petit) ;
- un climatiseur mobile gris (`a93c64e249.jpeg`, hors sujet : monobloc) ;
- plusieurs vues d'ensemble de catalogue (LG, Daikin) et un plafond de splits, sans rapport avec la télécommande.
Non copiées, par règle : deux gros plans de télécommande (`992ccc1bbfa7`, `980f525eca26`) tirés d'une page de
site tiers (`energieplus-lesite.be`) ; une télécommande à écran d'une marque (`4c5872f395e2`, logo visible).

## Symboles (`assets/`)
- `mando-infrarrojos.svg`, `split-pared.svg` — bibliothèque inerWeb, collection QElectroTech (CC BY 3.0),
  copiés de `assets/symboles/`, rien redessiné.

## Scènes et pictogrammes (`scenes.js`)
Dessins originaux écrits pour cette station. Les pictogrammes des touches (flocon, soleil, goutte,
ventilateur, A) et ceux des aptitudes sont des dessins de touches, pas des symboles de la bibliothèque.
Le flocon reprend le tracé du kit de scènes (`SceneKit.pictos.DESSINS.froid`).

## Fond
- Climatiseur split_2.pdf (fonds Bac pro MFER, indexé « climatiseur_20split.pdf ») : le fonds ne contient qu'une
  ligne sur le sujet (le split peut être équipé d'une régulation électronique et d'une télécommande pour contrôler
  la température). Le reste de la station vient de la fiche de station et de la physique du cycle, déjà posée
  dans les stations 2.6 (vanne 4 voies) et 3.2 (split).
- Renvoi au régulateur électronique du Thermo-techno (station 5.2) pour les sondes et la consigne.
- Aucune valeur chiffrée reprise : ni température de consigne, ni durée de temporisation, ni vitesse de turbine.

## Dits de métier non retrouvés dans le fonds (à valider par Franck)
- La sonde est « à la reprise d'air de l'unité intérieure, souvent en hauteur » : la reprise d'air vient de la
  fiche de station ; « souvent en hauteur » est un dit de métier non sourcé.
- « Sur certains modèles, la télécommande porte la sonde » : vient de la fiche de station.
- Mode déshumidification = « du froid à petite vitesse, sans trop refroidir » : formule de la fiche de station ;
  le détail (le compresseur peut aussi marcher par cycles) varie selon les modèles et n'est pas écrit.
- Mode automatique : « la carte choisit entre froid et chaud » (selon le modèle, elle peut aussi choisir la
  ventilation ou la déshumidification : non écrit).
- « Une consigne très basse ne refroidit pas plus vite : tant que l'écart est grand, la machine donne déjà sa
  puissance » : de la fiche de station pour le fait ; l'explication est la mienne, à confirmer pour un Inverter.
- « Une attente de protection avant le compresseur est normale » : usage courant de l'atelier, non sourcé.
- « Compresseur arrêté en ventilation, donc aucune eau récupérée » : conséquence du cycle, pas d'une source.
- Test de l'émetteur : non écrit (l'appareil photo d'un téléphone voit parfois la diode infrarouge ; trop
  variable pour l'affirmer).

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins pédagogiques, avec
citation, en prototype. Toute image signalée sera remplacée.
