# Sources — 2.4 L’Inverter : la vitesse suit le besoin

## Photographies
Aucune. Les images de la base trouvées pour « Inverter » (unités extérieures de marques, catalogues de
variateurs, un chargeur de batterie pris pour un onduleur) portent toutes une marque lisible, un cadre
de boutique ou ne montrent pas l’objet. Écartées. Le temps 1 montre donc les symboles du climatiseur
(unité extérieure, compresseur), et le dit (`creditPhoto`, Crédits).
Requêtes tentées : `chercher-images.mjs` « inverter climatiseur compresseur », « carte électronique
inverter unité extérieure », « électronique rectificatrice inverter variateur », « unité extérieure
ouverte carte électronique platine », « platine de puissance carte électronique climatiseur ».
Aucune photo d’une carte Inverter dans une unité extérieure ouverte n’a été trouvée.

## Symboles (`assets/`)
Tous copiés sans retouche de la bibliothèque inerWeb (collection QElectroTech, CC BY 3.0).
- `ud-exte-split.svg` — `60_energy/21_refrigeration/Climatizacion/autonomos/` (via `assets/symboles/`).
- `compresseurrotatif.svg` — `60_energy/21_refrigeration/Frio/sinopticosfrio/compresseursetventilateurs/` (via `assets/symboles/`).
- `redresseur.svg`, `dc_ac1.svg` (onduleur) — `10_electric/10_allpole/340_converters_inverters/10_converters/`.
- Le symbole du convertisseur de fréquence complet (`static_freq_converter.svg`) n’est pas repris :
  ses étiquettes sont en anglais. Il n’existe pas de symbole propre à la carte Inverter d’un climatiseur.

## Fond
- Le brief indiquait « aucun document du fonds ». Le RAG (`chercher-rag.js`) en rend pourtant quelques-uns,
  dont je n’ai lu que les **résumés** (les PDF eux-mêmes n’ont pas été ouverts) : « Inverter variateur.pdf »
  (l’inverter change la fréquence d’alimentation du moteur du compresseur pour faire varier le débit de
  fluide), « 1.1 Electricité (inverter).pdf », « 1.2 Electricité (TD inverter).pdf »,
  « 1.3 Electricité (TD2 inverter).pdf », « 1.4 Electricité (TD3 inverter).pdf » (principe de l’inverter,
  signal alternatif à fréquence variable fabriqué depuis le réseau). Leurs valeurs chiffrées ne sont pas reprises.
- ÉlectroRézo 7.3 « Faire varier la fréquence » et 7.4 « Le variateur de fréquence »
  (https://inerweb.fr/electrorezo/stations/7-3-varier-la-frequence/ et .../7-4-variateur-frequence/) :
  la vitesse suit la fréquence, redresseur → étage continu → onduleur, le condensateur reste chargé après
  la coupure, rien entre le variateur et le moteur. Cités en correspondance, rien recopié, aucune valeur reprise.
- Logique du brief (tout-ou-rien en dents de scie, régulation par l’écart consigne / mesure, intensité qui
  varie avec la vitesse, surchauffe à régime stabilisé, panne souvent côté carte ou capteur).

## Chiffres
Aucune valeur de fréquence, tension, intensité, vitesse ou durée n’est donnée : tout ce qui dépend de
l’appareil renvoie à sa notice.

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins pédagogiques, avec
citation, en prototype.
