# Sources — station 2.7 « Du compteur à l'appareil » (plan : T4)

Station fabriquée le 19/10/2026 (lot 1 « stations manquantes »). Statut : **en cours de relecture**,
non validée par F. Henninot. Aucun MP3, aucun son ajouté, aucun score.

## Ce qui existait, et qu'on renvoie plutôt que de recopier
- **Sous tension — TD2 « Le monde du tableau électrique »** (`pilote-fluides/sous-tension/`) : les fils d'un tableau. Lien, pas de copie.
- **Législation — « NF C 15-100 »** (`legislation/stations/elec-nf-c-15-100/`) : statut de la norme, tableau, circuits. Lien.
- **HoCourant M9** (`?module=M9`) et **capsule « Consigner avant de toucher »** (`packs/fluides/res/capsules/?c=s5`) : la consignation. Lien.
- ÉlectroRézo 2.1 (couleurs, PE), 4.8 (terre), 8.9 (repères), 1.7 (plaque) : rappels par liens ; l'image des couleurs est la même que celle de 2.1.

## Photographies et schémas (base d'illustrations, `outils/chercher-images.mjs`)
| Fichier | Origine dans le fonds | Emploi |
|---|---|---|
| `assets/biblio/distribution-logement.png` | `02_CAP-IFCA/Collegues-Partages/Capture inst.PNG` (empreinte 560131c5c071) | temps 1 : la chaîne compteur, disjoncteur de branchement, tableau, circuits, prise de terre |
| `assets/biblio/coffret-etiquete.jpg` | `_Archives/Themes/Collegues-Partages/DSCN5709.JPG` (empreinte 3aa5b410373a), réduit à 1400 px | temps 1 et 3 : lire les repères Q1, KM1, S1, H1 |
| `assets/biblio/couleurs-des-conducteurs.png` | station 2.1 (même fichier) | rappel des couleurs |
Les deux premières viennent de dossiers « Collègues partagés » : **droit de reproduction à confirmer par F. Henninot** (question ouverte du chantier FINIR-ELECTROREZO, point A.3).

## Symboles (bibliothèque `bibliotheque-symboles-energie/svg/10_electric/`, jamais redessinés)
`compteur_energie`, `compteur_energie_3phase` (40_meters / 70_meters), `coffret_de_repartition1` et `2` (11_singlepole/500_home_installation/30_architectural),
`src_1pn`, `src_3pn`, `ground1`, `masse` (110_network_supplies), `refrigerateur` (500_home_installation/20_home_appliances) ;
recopiés depuis les stations voisines : `ddr3` (4.6), `dis_mag_term_2f-1` et `3f-1` (4.3), `moteur_tri` (6.3).
Serrés par `outils/recadrer-symboles.mjs` (fenêtre seulement, aucun trait déplacé).

## Contenu des textes
- Le compteur et le disjoncteur de branchement « fournis par le distributeur », le disjoncteur placé après le compteur, la coupure en cas de court-circuit
  ou d'intervention : **document de cours CAP IFCA « tableau électrique »** (`02_CAP-IFCA/S4-Electricite/tableau électrique.docx`).
- Tableau et circuits (un départ, une protection) : arrêté du 3 août 2016, art. 2 4° et 3°, tels que repris dans `legislation/.../elec-nf-c-15-100/FOND.md`.
- Couleurs (bleu clair neutre, vert et jaune PE, phase dans les autres) : station 2.1 et 4.9 (maison).
- Repères Q, KM, S, H : station 8.9.
- Consignation : renvoi HoCourant M9 ; la station n'enseigne pas la procédure.
- **Habilitation et consignation (ajoutées après la P1 du 19/10)** : carte « Avant de toucher » commune aux trois stations (`modele-pratique.js`, `SECURITE`) — habilitation : Code du travail R. 4544-9 et R. 4544-10 (via `legislation/.../elec-habilitation/FOND.md`) ; cinq opérations de consignation : INRS ED 6109 § 5.1 (via `legislation/.../elec-consigner/FOND.md`), capsule « Consigner avant de toucher », HoCourant M9.
- « 5G2,5 » : cinq conducteurs de 2,5 mm² dont un vert et jaune (la lettre G) — désignation usuelle des câbles, cf. 4.10.

## Ce qui est nouveau (créé, pas adapté)
Le modèle `modele-pratique.js`, les scènes `schemas-pratique.js` (chaîne du courant, coupe d'un câble 5G), les exercices en trois paliers, la narration.

## À vérifier (voir le compte rendu)
« Point de livraison » : retiré de la station le 22/10 (re-audit). Sa limite exacte (compteur ou bornes aval du disjoncteur de branchement) n'a pas pu être sourcée ; la station parle désormais du « branchement » (du réseau au disjoncteur de branchement, en passant par le compteur), sans fixer de limite.

## Reprise du 22/10 (règles de Franck : station générique, appareil réel dans les scènes)
- Les scènes montrent des **photographies d'appareils réels**, plus de symboles : poste de distribution (cache `48b6450f408e`), compteur (station 1.4), disjoncteur différentiel et disjoncteur modulaire (4.6), tableau annoté (4.11), interrupteur-sectionneur et tableau (3.3), coffret (déjà là), groupe de condensation (`4140370bd135`), chauffe-eau (`4a1a913d3cdb`), piquet de terre (4.8). Les symboles de la bibliothèque ne sont plus qu'au temps « Représenter ».
- Les codes du référentiel sont dans le bloc discret « Sert notamment pour » ; plus aucun diplôme dans les crédits, titres, narration.
