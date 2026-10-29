# Sources — 9.8 Inverser le sens d'un moteur monophasé

## Faits techniques, vérifiés dans le fonds le 29/10/2026

Brief commun : `LIGNE-9-FAITS-LOT-3.md` (lot 3 de la ligne 9) et énoncés de `LIGNE-9-LOT-3-ENONCES.md`. Aucun fait hors de ces deux
fichiers. Légende : [M] cours « 20-MoteurMonophase.pdf » (Bac pro MFER, S4-Electricite) ; [P358] « Page 358.pdf », la page de livre
d'où vient [M] § VIII ; [C9] « 9 Moteur monophasé.doc » ; [CE] « Cours le moteur monophasé élèves.doc » ; [MM] « Les moteurs
monophasés.doc » ; [CC] « Cours Complet Electricite.pdf », chap. 11 ; [CP] documents du fonds sur les compresseurs et le sens
de rotation (« Page 39.pdf », « mise en servic.docx », « AGL_Unit_OMTE_CO2_FR_Rev02_FULL.pdf » § 4.4, « 10 le compresseur
hermetique DEMARAG.pdf » § 41) ; [FH] règle de métier de F. Henninot, réponse écrite du 29/10/2026 ; [S2.6] [S6.7] [S9.2] [S9.5]
[S9.6] stations déjà écrites ou écrites en même temps.

| Fait employé dans la station | Source |
|---|---|
| Pour inverser le sens d'un moteur monophasé, on croise 2 fils, soit sur l'enroulement auxiliaire, soit sur l'enroulement principal : un seul des deux | [M] § VIII p. 26 ; [P358] ; même règle dans [C9] et [CC] § 11.3.4 p. 68 |
| Exemple du cours : on croise les 2 fils de l'auxiliaire ; le sens du courant est inversé dans cet enroulement, ce qui donne une impulsion magnétique en sens inverse au moment du démarrage | [M] § VIII ; [P358] (phrase complète) |
| Le schéma du cours montre les deux enroulements P et A reliés à un point commun C, avec l'alimentation sur leurs deux autres extrémités, avant et après le croisement des fils de A | [M] p. 26 (regardé) ; schémas de la station construits d'après lui |
| Les moteurs monophasés à deux sens de rotation sont peu fréquents de nos jours ; on les rencontre surtout quand le moteur entraîne un compresseur ouvert ; ils ont au moins 4 bornes, parfois 6 pour un moteur bi-tension | [M] § VIII ; [P358] |
| Pour les applications où les deux sens de marche sont souvent sélectionnés, le principal et l'auxiliaire ont la même résistance ; chaque enroulement devient tour à tour auxiliaire ou principal | [CC] p. 70 |
| Mélanger le principal et l'auxiliaire se termine en général par le grillage du moteur peu après la mise sous tension | [M] § I.2 ; [P358] |
| Croiser les deux fils d'un même enroulement (sens) et mélanger principal et auxiliaire (grillage) sont deux gestes différents | lecture de [M] § VIII et § I.2 faite dans `LIGNE-9-FAITS-LOT-3.md` |
| Lire la plaque signalétique et regarder à l'intérieur du couvercle du bornier, où le schéma de raccordement se trouve souvent | [M] § I.2 |
| Un moteur monophasé alimenté par un seul enroulement a un couple de démarrage nul ; lancé à la main, il démarre et continue dans le sens où on l'a lancé | [C9], [CE] ; [M] § I.1 ; [CC] § 11.2 |
| L'aide au démarrage lance le moteur dans le sens souhaité ; le but de l'enroulement auxiliaire est de démarrer dans le sens de rotation prévu | [MM] ; [CP] « 10 le compresseur hermetique DEMARAG » § 41 |
| Permuter la phase et le neutre ne change pas le sens d'un moteur monophasé | [FH] 29/10/2026 (aucun document du fonds ne la donne) |
| En triphasé, on permute deux phases | station 2.6 [S2.6] ; [L] « 08 LES MOTEURS prof.docx », fin de la partie moteur asynchrone |
| Un compresseur hermétique monophasé a trois bornes (1, 2, 3 sur le dessin, soit C, P, A dans le cours) avec le Klixon ; on ne croise rien ; mélanger principal et auxiliaire le fait griller | [M] § I.2 ; décision de Franck du 29/10/2026 (point 3) |
| Les compresseurs scroll ne compriment que dans un sens | [CP] (AGL § 4.4 ; « mise en servic ») |
| Moteur à spire de Frager : sens fixé par construction ; la spire tient la place de l'enroulement auxiliaire et n'est reliée à aucun fil (son courant est induit par la bobine) | [FH] 29/10/2026 (point 1) ; [F2] fiche « 9.2 Electricité (moteur monophasé).pdf » p. 1 ; station 9.6 [S9.6] |
| Consigner avant de toucher, vérifier l'absence de tension (cinq opérations dans l'ordre) | station 6.7 [S6.7] (`SECURITE` dans `modele-pratique.js`) ; HoCourant M9 |
| Un condensateur reste chargé après la coupure ; on le décharge avec une résistance, jamais avec un tournevis | station 9.5 [S9.5] ; décision de Franck du 28/10/2026 (la décharge au tournevis de [C9] et [MM] est écartée) |

## Écarté volontairement
- Le croisement des deux enroulements à la fois : aucun fait dans le fonds, donc rien d'écrit.
- Toute procédure d'essai après le croisement (remettre sous tension, observer le sens) : le fonds n'en donne aucune.
- Les compresseurs à piston (identiques dans les deux sens) et semi-hermétiques (plateau à friction qui se bloque) : le fonds les dit,
  mais ils brouilleraient la règle de la station ; décision de Franck du 29/10 : on écrit d'après le fonds, sans interdiction générale.
- La résistance d'environ deux fois celle du principal pour l'auxiliaire, et les 3 Ω et 11 Ω du cours : aucune valeur dans la station.
- Le mot « compresseur ouvert » n'est pas défini dans le fonds : la station dit seulement « un compresseur qui n'est pas hermétique ».
- Les repères U1-U2 et Z1-Z2 de la station 6.5 : non repris (contradiction n° 6 du fichier des faits).

## Illustrations
- `assets/sens-avant.svg`, `assets/sens-apres.svg` : schémas construits dans QElectroTech (`schemas-ligne-9/montages-lot3.qet`,
  script `schemas-ligne-9/construire-lot3.py`), convertis en SVG par `outils/qet-vers-svg.py`. Rien n'est redessiné. Ils ne portent
  aucune flèche de rotation : la station dit le sens avec des mots.
- `assets/biblio/bornier-compresseur-3-bornes-klixon.png` : `03_BAC-MFER\S4-Electricite\20-MoteurMonophase.pdf`, page 3 (§ I.2),
  recadré ; fonds de Franck. Détail dans `assets/biblio/IMAGES.md`.
- Aucune image de notice constructeur dans cette station.
- Non prise : la photo du bloc inverseur triphasé de la station 2.6.

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins pédagogiques, avec citation. Droit de reproduction
des documents du fonds à confirmer par F. Henninot. Toute image signalée sera remplacée.
