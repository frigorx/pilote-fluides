# Sources — 9.4 Compresseur PSC, CSR : le condensateur permanent

## Faits techniques, tirés du fonds (brief FAITS-LOT-2, 28/10/2026)

[M] = cours « 20-MoteurMonophase.pdf » (Bac pro MFER, S4) ; [T] = Tecumseh Europe, annexes « Types de moteurs » ;
[L] = cours « 08 LES MOTEURS prof » ; [K] = correction CAP « Cp Hermétique ».

| Fait | Source |
|---|---|
| PSC : un seul condensateur, permanent (de marche), aucun relais de démarrage ; coup de pouce au démarrage ; auxiliaire en série avec le condensateur en marche, intensité limitée, meilleur couple en fonctionnement | [T], [M] |
| PSC employé sur les petits moteurs à couple résistant peu important : petits compresseurs à capillaire (pressions égalisées à l'arrêt), ventilateurs de petits climatiseurs | [T], [M] |
| Condensateur de marche : au papier, faible capacité (rarement plus d'une trentaine de µF), grandes dimensions, fait pour rester sous tension en permanence sans chauffer exagérément | [M] |
| CSR : relais de potentiel (de tension), condensateur de démarrage avec résistance de décharge, condensateur permanent externe, protecteur externe ; au démarrage les deux condensateurs sont en parallèle (capacités additionnées) ; démarrage fini, Cd éliminé, auxiliaire alimenté par Cp ; couple de démarrage et couple en marche importants | [T], [M] |
| (Bac pro) Le condensateur de marche améliore le couple en fonctionnement et réduit l'intensité absorbée ; le débrancher fait monter l'intensité totale et rend souvent le compresseur plus bruyant | [M] |
| Relais de tension : au-delà d'environ 600 W (la bobine d'un relais d'intensité serait trop grosse) ; bobine très résistante (long fil très fin) ; contact fermé au repos ; boîtier noir, bornes 1, 2, 5 (la 4 sert au câblage) ; ohmmètre : 0 Ω entre 1 et 2, par exemple 8 500 Ω entre 1 et 5 et entre 2 et 5 | [M] |
| Fonctionnement : au démarrage le courant traverse Klixon, principal, auxiliaire, contact 2-1 fermé et Cd ; en prenant de la vitesse, une tension induite apparaît aux bornes de l'auxiliaire et s'ajoute à celle du réseau (jusqu'à 400 V pour 220 V, Bac pro) ; la bobine colle quand cette tension dépasse celle du réseau d'une valeur fixée par le constructeur ; le contact s'ouvre et retire Cd ; la bobine reste alimentée par la tension induite | [M] |
| Cd se raccorde entre 1 et le côté principal, jamais entre 2 et l'auxiliaire ; schéma : bobine KA entre S et C, contact KA de S vers Cd, Cd vers le retour, Cp entre S et le retour | [M] ; `montage-csr.svg` |
| Le relais de tension fonctionne sur la vitesse : une surcharge ne remet pas l'auxiliaire en service, ce qui pouvait arriver avec un relais d'intensité | [M] |
| Relais mal adapté : trop petit (colle dès la mise sous tension, pas de démarrage, grogne, coupure thermique ; idem contact coupé) ; trop gros (ne colle jamais, auxiliaire alimenté en permanence, intensité exagérée, coupure ou moteur grillé, Cd chauffe et risque de lâcher ; idem contacts soudés ou bobine coupée) ; remplacement par la même référence | [M] |
| (Bac pro) Pince ampèremétrique sur le fil de l'auxiliaire et de Cd : forte intensité au démarrage, puis plus rien quand le contact s'est ouvert | [M] |
| Klixon en série sur la borne C | [K] |
| Condensateur : à décharger avec une résistance avant d'y toucher (règle des stations 6.5 et 9.1, décision de Franck du 28/10) ; résistance de décharge d'environ 15 kΩ possible, décharge non instantanée, jusqu'à quelques minutes | [M] ; stations 6.5 et 9.1 |
| Remplacer un compresseur : remplacer aussi relais et condensateurs | [M] |
| Toute mesure hors tension, après consignation | station 6.7 |

Aucune valeur, durée ou marque n'a été ajoutée à cette liste. Ne sont pas dits : l'alimentation de la bobine
sous 240 ou 400 V, le court-circuit du contact (gestes réservés, hors station), et tout ce qui touche au cos φ
(la liste du brief n'en donne aucun fait).

## Illustrations
- `montage-psc.svg`, `montage-csr.svg` : construits dans QElectroTech par `schemas-ligne-9/construire-montages.py`
  (fichier `montages-compresseur.qet`), convertis en SVG par `outils/qet-vers-svg.py`. Rien n'est redessiné à la main.
  Jalon 1, à valider par Franck.
- `bobine-relais.svg`, `contact-repos.svg` (contact à ouverture à commande électromagnétique),
  `condensateur.svg`, `clixon.svg` : symboles QElectroTech.
- Le temps 2 enchaîne les deux schémas (`scene`), le temps 5 construit son tableau dans `contenu.js`.

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins
pédagogiques, avec citation. Toute image signalée sera remplacée.
