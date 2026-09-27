# Constats — 27/09/2026

## Affichage du plan (le défaut signalé)
- `legislation/index.html` : SVG `viewBox 0 0 1790 1330`, `.plan svg { min-width:1280px }`,
  page `max-width:1080px` → conteneur ≈ 1040 px, SVG 1280 px : **240 px toujours cachés**
  (Certifications & normes, Droit du travail) quel que soit l'écran, et texte 15 u. rendu
  à ≈ 10,7 px. Le défilement horizontal existe mais l'indice « fais glisser » n'apparaît
  qu'en dessous de 700 px.
- `aria-label` du SVG périmé : « 57 stations dont une ouverte ».

## État réel (le PROMPT-REPRISE du 24/08 est en retard)
- Voix : MP3 edge-tts servis en ligne (`packs/fluides/res/voix/audio/…` en 206), index global
  5 484 entrées (commits 6e77dd97, bb6f24e9, 72b3b3b1, 40f7c878 du 31/08 au 02/09).
  88 narrations réécrites (« ce que ça veut dire », pas la géométrie). Dette n° 4 réglée.
- 29 stations : 12 écrans, 12 narrations, 4 questions, 8 SVG chacune, 0 orphelin, 0 manquant,
  0 lien relatif cassé, 7 liens externes du plan en 200.
- Animées : 19 SVG de la branche Impact seulement. DESP (branche suivante décidée) non animée.
- `VALEURS-A-VALIDER-DESP.md` (26/08) : jamais arbitré par Franck → stations DESP inchangées.
- « À sourcer » restants dans les FOND.md : 42 lignes sur 16 stations (aucune sur Thermique,
  qui pourtant manque de seuils RE2020/DPE selon la mémoire — à vérifier).
- Texte périmé dans 10 stations ouvertes : « Cette station est en préparation sur le plan du réseau. »
- Commentaire périmé en tête des stations : « voix-index.js n'est pas chargé ».
- Commentaire des stations : « moteur chargé en absolu » — faux depuis 40f7c878 (relatif).
