# Sources — 9.1 Qui fait tourner quoi

## Faits techniques, vérifiés dans le fonds le 28/10/2026

| Fait | Source |
|---|---|
| Les quatre montages et leurs pièces : RSIR (relais d'intensité), CSIR (relais d'intensité + condensateur de démarrage), PSC (condensateur permanent, aucun relais), CSR (relais de potentiel + démarrage + permanent) ; variantes à CTP (PTCSIR, PTCSCR) | Tecumseh Europe, annexes « Types de moteurs, appareillage électrique » (`_Archives/Themes/Froid-Frigorifique/Schema-de-cablage-des-compresseurs-monophases-a-pistons-et-rotatif.pdf`) |
| RSIR : couple faible, capillaire obligatoire (égalisation des pressions) ; CSIR : détendeur thermostatique ; PSC : petits compresseurs à capillaire, ventilateurs de petits climatiseurs ; CSR : Cd et Cm en parallèle au démarrage, puis Cd éliminé et l’auxiliaire toujours alimenté au travers de Cm | « 20-MoteurMonophase.pdf », § III et VI (`03_BAC-MFER/S4-Electricite/`) ; « 08 LES MOTEURS prof.docx » § IV |
| Le relais retire l'auxiliaire vers 80 % de la vitesse nominale | « 20-MoteurMonophase.pdf », § III ; « 08 LES MOTEURS prof.docx » § II |
| Bornes C, P (marche), A (démarrage) ; relais marqués P/M, A/S, L | « 20-MoteurMonophase.pdf », § I.2 et III.1 |
| Le Klixon est traversé par le courant du moteur (en série) | « 20-MoteurMonophase.pdf », § III.1 (fonctionnement du relais d'intensité) |
| Remplacer un relais d'intensité par la même référence | « 20-MoteurMonophase.pdf », § III.1 |
| Turbine : moteur AC 230 V à condensateur, plusieurs vitesses ; moteur EC à commande 0-10 V | Notice ventilo-convecteurs Aquavent, banc VC10 (fonds ERM) ; « 20-MoteurMonophase.pdf », § VII |
| Compresseur Inverter piloté par une carte électronique | CartoClim, station 2.4 « L'Inverter » |
| Bague de déphasage sur les petits ventilateurs | repris de la station 6.5 ; aucune source du fonds trouvée par `chercher-rag.js` |

## Erreur relevée dans le fonds
« 08 LES MOTEURS prof.docx », § II.1 : sous le titre « relais d'intensité », le paragraphe « Principe de
fonctionnement » décrit le relais de tension (contact fermé au repos, tension de l'auxiliaire). Le § II.2 manque.
Non repris ici. À corriger dans le cours.

## Illustrations
- `qui-fait-tourner-quoi.svg` : trois symboles de `usine-contenu/bibliotheque-symboles/svg/frigo_schema/`
  (`compresseur_general`, `ventilateur_axial`, `ventilateur_centrifuge`) recopiés tels quels dans une planche,
  par `outils/assembler-planche-9-1.mjs`. Rien n'est redessiné.
- `moteur_mono1.svg`, `motor-mono-cond.svg` : copiés de la station 6.5.
- `condensateur.svg`, `ctp.svg` (`ctp__ptc_.svg`) : `bibliotheque-symboles/svg/electronique/`.
- `clixon.svg` : `pilote-fluides/symboles/svg/`, symbole QElectroTech.
- Le tableau des quatre montages (temps 2 et 5) est construit par `contenu.js`.

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins
pédagogiques, avec citation. Toute image signalée sera remplacée.
