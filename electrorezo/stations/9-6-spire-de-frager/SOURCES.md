# Sources : 9.6 Spire de Frager, le moteur sans condensateur

## Faits techniques, tirés du fonds (brief LIGNE-9-FAITS-LOT-3.md, 29/10/2026)

Sigles : [C9] « 9 Moteur monophasé.doc » ; [CE] « Cours le moteur monophasé élèves.doc » ; [M] cours
« 20-MoteurMonophase.pdf » (Bac pro MFER, S4) ; [CC] « Cours Complet Electricite.pdf », chap. 11 ; [MM] « Les moteurs
monophasés.doc » ; [F1] fiche « 9.1 Electricité (moteur).pdf » ; [F2] fiche « 9.2 Electricité (moteur monophasé).pdf »
(PDF chiffré, mot de passe vide) ; [BO] catalogue d'évaporateur cubique 3C-A (Bohn) ; [PL] « Ressource préparation d'une
platine.pdf » ; [DA] « les contacteurs dauba.pdf » ; [FH] F. Henninot, décisions écrites du 29/10/2026 ; [S6.1],
[S6.7], [S9.2], [S9.4] stations déjà écrites ; [CCF] sujet de câblage CAP IFCA, schéma 2022 ; [TP] « TP Cablage pump down ».

| Fait | Source |
|---|---|
| Un moteur monophasé à un seul enroulement a un couple de démarrage nul : il ne démarre pas seul. Lancé à la main, il démarre et continue dans le sens où on l'a lancé | [C9], [CE], [M § I.1], [CC § 11.2] |
| Un seul enroulement crée un champ alternatif ; sans artifice le rotor ne démarre pas | [MM] |
| Le moteur est aidé au démarrage par une spire de Frager, un enroulement supplémentaire ou un condensateur ; ces moyens créent un déphasage, donc un sens de rotation | [F1 p. 1] |
| Selon le moyen de démarrage, le moteur peut être condamné à tourner dans un seul sens | [F1 p. 1] |
| Il existe des moteurs qui fonctionnent avec une spire de Frager, sans enroulement auxiliaire | [C9] |
| Sans aide au démarrage, le moteur dessiné (bobine sur un côté du circuit magnétique, rotor rond) vibre | [F2 p. 1] |
| Le courant dans la spire de Frager est créé par un courant induit provenant de la bobine | [F2 p. 1] |
| La spire se dessine comme un petit anneau au bord du circuit magnétique, côté rotor | [F2 p. 1], dessin |
| La spire est en court-circuit, sur un coin du pôle ; le couple est faible ; un seul sens, fixé par construction ; moteur des petits ventilateurs d'évaporateur et de vitrine | [FH] décision 1 |
| La spire n'est reliée à aucun fil (la spire tient la place de l'enroulement auxiliaire) | [FH], [C9], [F2] |
| Permuter la phase et le neutre ne change pas le sens d'un moteur monophasé | [FH] décision 4 |
| Les ventilateurs d'évaporateur sont des moteurs monophasés 230 V | [BO, rubrique « Ventilation »] |
| Au bornier, le moteur du ventilateur d'évaporateur occupe trois bornes : la terre et deux fils | [CCF] |
| Le symbole du moteur de ventilateur d'évaporateur est un rond M, 1 ~, deux bornes U et V, sans condensateur ni troisième borne. Il ne montre pas la spire | [TP], image ; relevé du lot 3 |
| L'anneau de la bobine du contacteur en alternatif s'appelle bague de déphasage, il empêche les vibrations ; on l'appelle aussi spire de Frager ; le flux s'annule cent fois par seconde en alternatif | [PL § 5 d], [DA], [S6.1] |
| Même anneau, employé dans le moteur pour le faire démarrer | [FH] décision 2 |
| Le relais d'intensité équipe les compresseurs (station 9.3) | [S9.3] |
| Le condensateur se branche en série avec l'auxiliaire ; le PSC sert aux petits compresseurs à capillaire et aux ventilateurs de petits climatiseurs | [S9.4], [M § VI.1] |
| Un compresseur hermétique a trois bornes, C, S et R | [M § I.2], [S9.2] |
| Le ressort de rappel s'oppose à l'aimant ; le bobinage est un fil de cuivre émaillé enroulé des centaines ou des milliers de fois ; en continu l'attraction est stable | [S6.1] |
| Consigner le circuit et vérifier l'absence de tension avant de toucher au bornier | [S6.7] |
| Le signe 1 ~ : le 1 dit une phase, le tilde dit courant alternatif | [S6.5] |
| L'inversion d'un moteur à deux enroulements est traitée à la station 9.8 | énoncés du lot 3 |

Aucune valeur, durée ou marque n'a été ajoutée à cette liste. Le mot « Bohn » ne s'affiche pas dans la station.
Ne sont pas dits : la raison physique du déphasage créé par la spire, la position exacte de la spire sur le pôle,
le matériau de la spire du moteur, le rendement, la puissance, la vitesse de ce moteur.

## Illustrations
Toutes viennent de `assets/biblio/` (voir `assets/biblio/IMAGES.md`) : rien n'est dessiné ni retouché.
- `moteur-avec-spire-de-frager.png` : temps 1 (image centrale) et temps 2.
- `moteur-sans-aide-au-demarrage.png` : temps 2.
- `contacteur-en-coupe-avec-bague.png` : temps 2 (le même anneau dans un contacteur, station 6.1).
- `ventilateur-evaporateur-m1-deux-bornes.png` : temps 4 (symbole).
- `schema-vierge-bobine-rotor.png` : non employée (cadres vides à légender, sans usage à l'écran).

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins
pédagogiques, avec citation. Toute image signalée sera remplacée.
