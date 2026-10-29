# Sources — 9.3 Compresseur RSIR, CSIR : le relais d'intensité

## Faits techniques, tirés du fonds (brief FAITS-LOT-2, 28/10/2026)

[M] = cours « 20-MoteurMonophase.pdf » (Bac pro MFER, S4) ; [T] = Tecumseh Europe, annexes « Types de moteurs » ;
[L] = cours « 08 LES MOTEURS prof » ; [K] = correction CAP « Cp Hermétique ».

| Fait | Source |
|---|---|
| RSIR : relais d'intensité, aucun condensateur ; CSIR : relais d'intensité et condensateur de démarrage | [T] (`_Archives/Themes/Froid-Frigorifique/Schema-de-cablage-des-compresseurs-monophases-a-pistons-et-rotatif.pdf`) |
| Relais d'intensité sur les petits compresseurs, jusqu'à environ 600 W (réfrigérateurs ménagers, petits congélateurs) ; souvent embroché sur le bornier, avec un détrompage | [M] |
| Bobine en gros fil en série avec le principal ; contact ouvert au repos qui alimente l'auxiliaire | [M] |
| Démarrage : courant dans le Klixon, le principal et la bobine ; contact ouvert, moteur bloqué, courant d'environ 5 fois le nominal ; la bobine attire le contact ; l'auxiliaire est mis en service ; vers 80 % de la vitesse, le contact s'ouvre | [M] |
| Sens de montage, « Top » en haut ; monté à l'envers, le contact peut rester fermé et le moteur risque de griller | [M] |
| Contrôle à l'ohmmètre : infini entre A/S et P/M, et entre A/S et L ; presque 0 Ω entre P/M et L ; bornes P/M, A/S, L | [M] |
| Sans condensateur, couple faible, détente par capillaire (égalisation des pressions HP et BP) | [M] |
| Relais remplacé par la même référence (sinon le contact ne colle jamais, ou reste collé) | [M] |
| CTP : résistance très faible à froid (quelques ohms) ; 1 à 2 s pour dépasser 100 °C et 1 000 Ω ; courant de l'auxiliaire de quelques milliampères ; capillaire indispensable ; 5 minutes d'arrêt ; CTP chaude : surintensité et coupure par le Klixon ; remplacement par la même référence | [M] |
| CSIR : couple important au démarrage ; employé quand le couple résistant risque d'être fort, par exemple avec un détendeur thermostatique | [M] |
| Condensateur de démarrage : électrolytique, plus de 100 µF possible, petit ; 5 s au plus, 20 démarrages par heure ; marquage µF / MF / MFD, tolérance, tension maximale ; 20 µF / 360 V sous 240 V, jamais sur 400 V | [M] |
| Remplacer un compresseur : remplacer aussi relais et condensateurs | [M] |
| Klixon en série sur la borne C, protège les deux enroulements | [K] |
| Condensateur : à décharger avec une résistance avant d'y toucher (règle des stations 6.5 et 9.1, décision de Franck du 28/10) ; résistance de décharge d'environ 15 kΩ possible, décharge non instantanée, jusqu'à quelques minutes | [M] ; stations 6.5 et 9.1 |
| Toute mesure hors tension, après consignation | station 6.7 |

Aucune valeur, durée ou marque n'a été ajoutée à cette liste. Les faits absents (par exemple la durée de
refroidissement du Klixon, ou le calibre des relais) ne sont pas dits.

## Illustrations
- `montage-rsir.svg`, `montage-ctp.svg`, `montage-csir.svg` : construits dans QElectroTech par
  `schemas-ligne-9/construire-montages.py` (fichier `montages-compresseur.qet`), convertis en SVG par
  `outils/qet-vers-svg.py`. Rien n'est redessiné à la main. Jalon 1, à valider par Franck.
- `bobine-relais.svg` (`bobine3`), `contact-travail.svg` (`act_electromagnetique_no`, contact à fermeture à
  commande électromagnétique), `ctp.svg`, `condensateur.svg`, `clixon.svg` : symboles QElectroTech,
  bibliothèques `bibliotheque-symboles` et `pilote-fluides/symboles`.
- Le temps 2 enchaîne les trois schémas (`scene`), le temps 5 construit son tableau dans `contenu.js`.

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins
pédagogiques, avec citation. Toute image signalée sera remplacée.
