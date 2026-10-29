# Sources — 9.2 Repérer C, S, R à l'ohmmètre

## Faits techniques, vérifiés dans le fonds le 28/10/2026

Brief commun : `FAITS-LOT-2.md` (lot 2 de la ligne 9). Aucun fait hors de cette liste. [M] = cours « 20-MoteurMonophase.pdf »
(Bac pro MFER, S4-Electricite) ; [L] = cours « 08 LES MOTEURS prof.docx » ; [S67] = station 6.7.

| Fait | Source |
|---|---|
| Trois bornes : C commun, R marche (enroulement principal), S démarrage (enroulement auxiliaire) ; les cours français écrivent aussi C, P, A ; un relais porte P/M (principal), A/S (auxiliaire), L (ligne) | [M] § I.2 et III.1 |
| L'auxiliaire est en fil plus fin que le principal : sa résistance est plus élevée | [L] |
| Mesure fils débranchés, ohmmètre sur un petit calibre (par exemple 200 Ω) : ces enroulements font au plus quelques dizaines d'ohms | [M] |
| Exemple : entre 1 et 2, 11 Ω ; entre 1 et 3, 3 Ω ; entre 3 et 2, 14 Ω. La plus forte (14, entre S et R) : la borne restante, 1, est C. La plus faible (3) est le principal : 3 est R. L'autre, 2, est S | [M] |
| Contrôle par la somme : 11 + 3 = 14 (C-S plus C-R donne S-R) | **Déduit de l'exemple du cours** [M] ; en cas de court-circuit entre enroulements, S-R ne correspond plus à la somme [M] |
| Inverser principal et auxiliaire au câblage : le moteur grille en général peu après la mise sous tension | [M] |
| Plaque signalétique, schéma de raccordement souvent dans le couvercle du bornier ; un moteur triphasé donnerait trois résistances identiques | [M] |
| Enroulement coupé : l'ohmmètre indique une résistance très grande (l'infini) au lieu de la valeur normale | [M] |
| Masse : mesurer entre chaque borne et la carcasse, au plus fort calibre ; on lit l'infini ; 0 Ω ou presque = masse franche ; gratter la peinture | [M] |
| Masse peu franche : peut échapper à l'ohmmètre et faire déclencher le différentiel sous tension ; il faut un contrôleur d'isolement, qui applique 500 V continu | [M] |
| La limite à appliquer à l'isolement est celle de la notice ou de la fiche ; aucune valeur donnée comme règle | station 6.7 (même décision) |
| Jamais de contrôleur d'isolement sur un compresseur sous vide | station 6.7 ; notices Maneurop et Tandem |
| Toute mesure hors tension, après consignation (cinq opérations dans l'ordre) | station 6.7 (`SECURITE` dans `modele-pratique.js`) ; HoCourant M9 |

## Déduit du schéma (à présenter comme une lecture du schéma, pas comme un fait du cours)
- Temps 4 : « aller de C à R, c'est traverser le principal seul ; aller de S à R, c'est traverser les deux enroulements ;
  cette valeur est la somme des deux autres et la plus forte ». C'est la lecture de `trois-bornes.svg` (C relié aux deux
  enroulements), en accord avec la somme de l'exemple du cours.
- Quiz et question « enroulement coupé » : l'enroulement principal se mesure entre C et R (lecture du même schéma).

## Écarté volontairement
- Les ordres de grandeur du cours pour un moteur (neuf jusqu'à 1 000 MΩ, vieilli 10 à 100 MΩ, 1 MΩ à remplacer, sous
  500 kΩ inutilisable) : la station 6.7 les avait retirés après son test de trouvabilité (une seule règle pour la limite :
  la notice ou la fiche). Non repris ici.
- Les valeurs des exercices guidés et seul (13, 9, 4 ; 6, 15, 9 ; 5, 8, 20 ; quiz 12, 7, 19) sont des relevés fictifs,
  choisis pour respecter « quelques dizaines d'ohms au plus » ; les sommes sont exactes (9 + 4 = 13 ; 6 + 9 = 15 ; 12 + 7 = 19),
  sauf 5 + 8 ≠ 20, voulu pour la question « la somme ne tombe pas juste ».
- Le fond ne dit pas ce que fait l'élève quand la somme est fausse : la conduite « refaire les trois mesures, puis
  penser à un court-circuit entre enroulements » est une méthode, appuyée sur le seul fait du cours (court-circuit entre
  enroulements : S-R ne correspond plus à la somme).

## Illustrations
- `biblio/mesure-continuite-enroulement.jpeg` : `03_BAC-MFER/Froid-Frigorifique/TP DOC TECH 01.docx` (empreinte a4398b4fd78b), comme la 6.7.
- `biblio/multimetre-et-ses-sondes.png` : base de connaissances inerWeb, comme la 1.2 et la 6.7 ; l'écran est rempli par `SchemasPratique.afficheur`.
- `trois-bornes.svg` : schéma construit dans QElectroTech par `schemas-ligne-9/construire-montages.py`, converti en SVG ; rien n'est redessiné.
- `ohmmetre-h.svg`, `masse.svg`, `moteur_mono1.svg` : symboles EN 60617 de la bibliothèque inerWeb (QElectroTech), copiés des stations voisines.
- Aucun contrôleur d'isolement n'est dessiné : la station n'en montre aucun.

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins
pédagogiques, avec citation. Droit de reproduction des documents du fonds à confirmer par F. Henninot.
Toute image signalée sera remplacée.
