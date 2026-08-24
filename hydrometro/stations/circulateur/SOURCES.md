# Sources — Circulateur

## Fonds local

RAG HAL interrogé en lecture seule le 23 août 2026 :

- `Les circulateurs et pompes.pdf` ;
- `pdf-dossier-les-circulateur.pdf` ;
- `Les pompes et circulateur.odt` ;
- `Les circulateurs et pompes prof.pptx` ;
- synthèse validée `res/hydrometro/HYDROMETRO-INGENIERIE-VALIDEE.md#3`.

Les grandeurs retenues sont le débit `Q` en `m³/h` et la hauteur `H` en `mCE`. Le point de
fonctionnement est l’intersection des courbes pompe et réseau.

## Modèle et provenance SVG

- `assets/pompe_debit_variable.svg` : copie du symbole inerWeb validé, SHA-256
  `25607A88A03E9C706F2FA4DF3F03D1141DEB4A4CC0161F26DD0B30B3625A5D27` ;
- graphiques, points de mesure et chaîne de réglage : SVG manuels originaux dans `content.js`.

Les courbes utilisent un modèle pédagogique explicite : `Hpompe = 6 n² − 0,18 Q²` et
`Hréseau = K Q²`. Elles ne remplacent ni une courbe constructeur, ni un calcul de rendement,
de NPSH ou de sélection. Chaque SVG possède `<title>`, `<desc>` et un texte équivalent.

