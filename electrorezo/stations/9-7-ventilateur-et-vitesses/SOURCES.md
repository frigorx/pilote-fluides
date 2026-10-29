# Sources — 9.7 Ventilateur et vitesses : le moteur à plusieurs vitesses

Écrite le 29/10/2026 (lot 3 de la ligne 9), d'après `LIGNE-9-FAITS-LOT-3.md` et `LIGNE-9-LOT-3-ENONCES.md` : aucun fait hors de ces deux fichiers.
Racine du fonds : `C:\Users\henni\OneDrive\Bureau\3-PROF-PEDAGO\profs cour Indexee\` (notée `FONDS`).

## Les sigles

| Sigle | Document | Où |
|---|---|---|
| [M] | cours « 20-MoteurMonophase.pdf » (Bac pro MFER, S4) | `FONDS\03_BAC-MFER\S4-Electricite\20-MoteurMonophase.pdf` : § VI.1 p. 22, § VII p. 25 |
| [AQ] | notice AquaVent « Ventilo-convecteurs à moteur AC ou EC » (21/06/2021), dossier du banc VC10 | `DOSSIERS ERM\VC10_240703.zip`, `DTVC10/Documentation technique/Ventilo-convecteur/notice_installation_ventilo_convecteurs_aquavent.pdf` : p. 5, 6, 8 |
| [AL] | notice du ventiloconvecteur gainable Aqualia (« 24232-IOM-12-2000 ») | `FONDS\_Archives\Themes\Collegues-Partages\24232-IOM-12-2000.PDF` : caractéristiques, § 6.1 et 6.2 (p. 19 à 20) |
| [CL] | « 6 Climatiseur PROF.docx » | `FONDS\03_BAC-MFER\S2-Systemes\6 Climatiseur PROF.docx` : § 3.4 et suivants |
| [DH] | « Les moteurs dahlander.doc » (« Les moteurs triphasés à deux vitesses ») | `FONDS\03_BAC-MFER\S4-Electricite\Les moteurs dahlander.doc` |
| [S6.3] [S6.5] [S9.4] [S6.7] | stations déjà écrites | `stations\6-3-moteur-asynchrone\`, `6-5-moteur-monophase\`, `9-4-compresseur-psc-csr\`, `6-7-autocontrole-mise-sous-tension\` |

## Faits employés

| Fait | Source |
|---|---|
| Le ventilateur d'une unité intérieure est centrifuge, une ou deux turbines ; sur les unités murales, console et gainable il est centrifuge « afin d'éviter les niveaux sonores trop importants » ; l'unité extérieure a un ventilateur hélicoïde | [CL § 3.4] |
| Un ou plusieurs ventilateurs centrifuges à double ouïe d'aspiration, une volute en tôle galvanisée et une turbine en plastique ; turbines montées directement sur l'arbre du moteur | [AQ p. 5] |
| L'air est soufflé par un ventilateur à une ou plusieurs vitesses, dont une plus silencieuse pour la nuit ; la platine de commande comprend le commutateur de vitesse | [CL] |
| Le commutateur de vitesse d'un ventilo-convecteur a quatre positions (non affiché : coupure de la phase et du neutre) et donne trois débits d'air | [AQ p. 5] |
| Montage PSC : aucun relais de démarrage, condensateur permanent ; sert sur les ventilateurs de petits climatiseurs | [M § VI.1 p. 22] ; [S9.4] |
| Moteur d'un ventiloconvecteur gainable : 230 V, monophasé, 50 Hz, protection interne de surcharge, condensateur permanent | [AL, caractéristiques] |
| Moteur AC : 230 V monophasé avec condensateur, six vitesses disponibles dont trois seulement connectées au commutateur (« le constructeur câble trois vitesses sur six ») | [AQ p. 5] |
| Principe : créer une chute de tension aux bornes du moteur, ce qui réduit le couple moteur et donc la vitesse ; une bobine (impédance) est en série avec le moteur de type PSC | [M § VII p. 25] |
| Position PV : l'intensité traverse l'impédance, qui crée la chute de tension, petite vitesse ; position GV : l'impédance est court-circuitée, le moteur reçoit la tension du réseau, grande vitesse | [M § VII] |
| Règle de câblage : la plus grande vitesse en alimentant le moteur directement sur la tension du réseau, la plus faible en intercalant la plus grande impédance chutrice | [M § VII] |
| Autotransformateur : « un auto-transformateur offrant un choix de 3 vitesses à sélectionner sur 6 disponibles » | [AQ p. 6 et 8] |
| Taille 1 : six vitesses réalisées à partir d'un autotransformateur ; on choisit trois vitesses parmi les six pour se raccorder aux régulations ; minimum borne 6, maximum borne 1 ; précâblé d'usine sur les vitesses 1, 3 et 5 | [AL § 6.1.1] |
| Taille 2 : quatre vitesses réalisées à partir d'un moteur électrique multibobinage ; on choisit trois vitesses parmi quatre | [AL § 6.1.2] |
| Raccordements par un connecteur rapide, qui évite les erreurs de câblage ; avant de démonter, repérer et noter les vitesses câblées | [AL § 6.1 et 6.2] |
| Code des fils : rouge petite vitesse, gris moyenne vitesse, noir grande vitesse, vert/jaune à la borne terre | [AL p. 20, § 6.2] |
| Exercice du cours : moteur monophasé 220 V, condensateur de marche de 3 µF, ventilateur de climatiseur, commutateur à quatre bornes C, PV, MV, GV, cinq fils bleu, rouge, noir, jaune, vert | [M § VII p. 25] |
| Tableau des mesures en ohms : B-R 110 ; N-B 110 ; N-R 220 ; J-B 290 ; J-R 400 ; J-N 180 ; V-B 200 ; V-R 310 ; V-N 90 ; V-J 270 | [M p. 25, tableau] (image `moteur-5-fils-tableau-des-resistances.png`) |
| Correction : la plus faible valeur (90 Ω entre N et V) est le principal ; l'auxiliaire est entre N (le commun) et J, 180 Ω ; les deux impédances chutrices sont entre N et B (110 Ω) puis entre B et R (110 Ω) | [M § VII] |
| Les autres mesures sont des sommes de branches qui partent de N (V 90, J 180, B 110, R 220) : contrôle fait le 29/10/2026 sur le tableau | `LIGNE-9-LOT-3-ENONCES.md` § 9.7 |
| Le Dahlander est un moteur triphasé à deux vitesses qui change le nombre de pôles (une ligne, sans plus) | [DH] ; [S6.3] |
| Un condensateur reste chargé après la coupure, on le décharge avec une résistance (décision de Franck du 28/10) ; toute mesure hors tension après consignation | [S9.4] ; [S6.7] |
| Le test du condensateur est à la station 9.5 | [S9.4], rubrique « Limite » |

## Lu sur le schéma, pas dans un texte

- `assets/vitesses-psc.svg` (construit dans QElectroTech) : PV relié au fil R, MV au fil B, GV au fil N ; Cp entre J et V ; la seconde alimentation sur V. Les phrases « En PV, le courant traverse les deux impédances. En MV, il en traverse une. En GV, il n'en traverse aucune » sont lues sur ce schéma, avec la règle de [M § VII] ; le texte du cours ne parle pas de MV.

## Illustrations

- `assets/vitesses-psc.svg` : schéma construit dans QElectroTech (lot 3), non redessiné. Les trois symboles du temps 4 sont des zones de ce même fichier (fragment `#svgView(viewBox(...))`), aucun fichier ajouté.
- `assets/biblio/` : voir `IMAGES.md` (origine exacte de chaque image). Aucune image ajoutée ni retouchée.

## Marques

Les marques des notices (AquaVent, Aqualia, « Series Silent ») ne s'affichent que dans « Crédits ». Dans la station : « la notice d'un ventilo-convecteur ».

## Réserve

Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins pédagogiques, avec citation. Toute image signalée sera remplacée.
