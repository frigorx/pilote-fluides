# Sources — station 6.7 « Autocontrôle électrique avant mise sous tension » (plan : T6)

Station fabriquée le 19/10/2026 (lot 1 « stations manquantes »). Statut : **en cours de relecture**,
non validée par F. Henninot. Aucun MP3, aucun son ajouté, aucun score.

## Règle d'exactitude : aucune valeur minimale inventée
La station n'écrit **aucune limite d'isolement comme règle** (les ordres de grandeur du cours sur le moteur ont été retirés après la P1). Dans les exercices, la limite (1 MΩ) est **donnée dans l'énoncé comme venant d'une fiche de TP fictive** ; la
station dit partout que la vraie limite se lit sur la notice du matériel ou la fiche. Les valeurs de la norme NF C 15-100 (partie « vérification ») n'ont **pas** été trouvées dans le fonds
et ne sont pas écrites : voir « À vérifier » dans le compte rendu. NF C 15-100 n'est citée que par son titre et son objet (installations électriques à basse tension).

## Ce qui existait, et qu'on renvoie plutôt que de recopier
- **Câblage virtuel — « Mise sous tension : l'essai de fonctionnement »** (`cablage-virtuel/jouer.html?ex=cablage-1-commande`, fiche `documents/Mise-sous-tension-FICHE.md`) : l'essai, sur écran. Lien.
- **HoCourant M9** (« Hors tension : à prouver, jamais à supposer »), **Législation « Consigner »** (VAT, les étapes), **capsule « Consigner avant de toucher »** : la consignation. Liens ; la station n'enseigne pas la procédure.
- ÉlectroRézo 1.9 (mesurer), 4.8 (terre), 5.9 (lire un schéma), 2.6 (champ tournant, sens de rotation : on échange deux phases), 8.9 (repères) : rappels par liens.

## Contenu des textes (tout est tracé)
| Affirmation | Source |
|---|---|
| Travail hors tension du début à la fin ; mise sous tension par le professeur seulement ; appeler le professeur avant tout essai | `progression-2a-cap-ifca/_carte-commune/Grille-professeur-CAP-bornier-pump-down.md` (séance du 21/09/2026) et `TP-07-E-Le-cablage-en-conditions-depreuve-ELEVE.html` (« J'appelle le professeur… ») |
| Dénuder à la bonne longueur, embout serti, un fil par borne, serrer, tenir à la traction | même grille CAP (critère « Réaliser un raccordement propre et tenant », niveau M) |
| Autocontrôle : continuité de chaque chemin, serrage, aucun brin libre, repères identiques schéma ↔ platine, isolement avant tout essai, sens de rotation corrigé par permutation de phases | `TP-07-E-…ELEVE.html` (feuille « Autocontrôle avant mise sous tension », F. Henninot) |
| Chaque contrôle voit une chose, et pas une autre (« ce que chaque contrôle permet de vérifier, et ce qu'il ne vérifie pas ») | grille CAP, critère « Faire son autocontrôle hors tension », niveau PM |
| Continuité des conducteurs de protection, bon fonctionnement des dispositifs différentiels, valeur des prises de terre, parmi les vérifications d'une installation neuve | **INRS, ED 6345 « L'électricité », § 4.5.2**, via `legislation/stations/elec-terre-differentiel/FOND.md` (consulté le 30/09/2026) |
| Contrôleur d'isolement : tension d'environ 500 V continu | document de cours Bac MFER `03_BAC-MFER/S1-Analyse/coure tri.docx` — source secondaire. **Les ordres de grandeur du même cours (moteur neuf, 1 MΩ, 500 kΩ) ont été retirés le 19/10 après la P1** : une seule règle pour la limite — notice du matériel, procédure de l'entreprise, ou fiche du TP. |
| **Consignation, cinq opérations dans l'ordre** : séparer, condamner, identifier, vérifier l'absence de tension, mettre à la terre et en court-circuit seulement quand elle est prescrite ; VAT sur chaque conducteur, avec un vérificateur prévu pour cela, contrôlé avant et après, jamais un simple tournevis testeur | **INRS ED 6109 § 5.1** et NF C 18-510, via `legislation/stations/elec-consigner/FOND.md` ; capsule « Consigner avant de toucher » (`packs/fluides/res/capsules/donnees/s5.js`, mêmes cinq étapes) ; HoCourant M9 (`hocourant/donnees/cours.js` : pré-identifier, VAT contrôlée avant et après). **Un seul jeu d'étapes, défini une fois dans `modele-pratique.js` (`SECURITE`) et repris dans les trois stations.** |
| Seul un travailleur habilité par son employeur intervient sur une installation électrique | Code du travail R. 4544-9 et R. 4544-10, via `legislation/stations/elec-habilitation/FOND.md` ; HoCourant |
| Mesure entre les bornes des enroulements et la terre ; un ohmmètre n'est pas un contrôleur d'isolement | cours ci-dessus ; `02_CAP-IFCA/Froid-Frigorifique/FCA mesur enroulment homs.docx` |
| « OL » ou un « 1 » à gauche de l'écran : circuit ouvert | `FCA mesur enroulment homs.docx` (le multimètre « affiche 1. à gauche de l'écran » hors plage) |
| **Ni contrôleur d'isolement, ni mise sous tension d'un compresseur sous vide** | notices **Maneurop** (`INSTRUCTION-maneurop.pdf`), **Tandem** (`Instructions Tandem.pdf`), **Blue Star** (`Instructions Blue Star.pdf`), `02_CAP-IFCA/C1-Communiquer/` |
| Couple de serrage 3 N·m au plus sur les vis d'un bornier de compresseur | notice Maneurop § 7 (« maximum tightening torque is 3 Nm ») — donné comme EXEMPLE : le couple vient toujours de la notice du matériel |
| Maneurop : fonctionne dans les deux sens de rotation ; Tandem : « impératif que les deux compresseurs tournent dans le bon sens » | mêmes notices |
| Hors tension, barrettes de couplage retirées avant l'essai d'isolement des enroulements | pratique d'atelier (document d'examen consulté, **non reproduit** : sujets d'examen = matière de travail) |

## Photographies (base d'illustrations)
| Fichier | Origine dans le fonds | Emploi |
|---|---|---|
| `assets/biblio/mesure-continuite-enroulement.jpeg` | `03_BAC-MFER/Froid-Frigorifique/TP DOC TECH 01.docx` (empreinte a4398b4fd78b) | temps 1 |
| `assets/biblio/raccordement-prise-boite.jpeg` | `03_BAC-MFER/S4-Electricite/AFAIREOUNEPASFAIRE.pdf` (empreinte 012f1fb3fa77) | temps 1 |
Écartée : une capture d'un sujet d'examen (CRDP Montpellier) montrant la procédure d'isolement d'un moteur — sujet d'examen, non republiable, et capture d'écran de navigateur.
Droit de reproduction des documents du fonds à confirmer par F. Henninot (FINIR-ELECTROREZO, A.3).

## Symboles (bibliothèque `bibliotheque-symboles-energie/svg/10_electric/10_allpole/`, jamais redessinés)
`ohmmetre-h` (390_sensors_instruments/70_meters_measuring_indicators) ; recopiés depuis les stations voisines : `moteur_tri` (6.3), `masse` (4.8), `terre` (bibliothèque, 110_network_supplies : tige et trois traits décroissants), `sectionneur4` (copie locale : sectionneur à trois pôles). `borne_3` (8.9) retiré le 22/10 : affiché sans être expliqué. Le schéma de mesure dessine le contrôleur d'isolement avec le cercle de `ohmmetre-h`, faute de symbole de mégohmmètre dans la bibliothèque : la légende et la voix le disent.
`sectionneur_general` écarté : c'est un sectionneur à fusibles. Serrés par `outils/recadrer-symboles.mjs`.
Les afficheurs d'appareils de mesure et la ligne des sept étapes sont de la mise en page (HTML et un tracé de points), pas des symboles normalisés.

## Ce qui est nouveau (créé, pas adapté)
La ligne des sept étapes avec « ce que ça vérifie / ne vérifie pas », les afficheurs de mesure, l'arrêt « le professeur vérifie » avec visa, les sept exercices en trois paliers, la narration.

## Reprise du 22/10 (règles de Franck : station générique, appareil réel dans les scènes)
- Les scènes montrent des **photographies d'appareils réels** : vérificateur d'absence de tension (cache `f4a071b67c70`), raccordement d'une prise, schéma puissance et commande (5.9), multimètre (1.2) dont l'écran porte la valeur lue, moteur à boîte à bornes ouverte (6.4), platine de démarrage direct (5.9).
- **Aucune photo de contrôleur d'isolement (mégohmmètre) dans la base** : les questions d'isolement (0,2 MΩ ; 850 kΩ) donnent la lecture dans l'énoncé, sans appareil dessiné. À fournir par Franck pour illustrer ces deux questions.
- Les symboles ne restent qu'au temps « Représenter » (dont le schéma de mesure). Codes dans le bloc discret « Sert notamment pour ».
