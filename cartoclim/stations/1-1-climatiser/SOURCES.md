# Sources — 1.1 Climatiser, c’est quoi ?

## Photographies (`assets/biblio/`)
- `6691a1f846.jpeg` — climatiseur mural dans un bureau, une personne à son poste (500 × 375). Trouvée dans
  `03_BAC-MFER/S1-Analyse/confort-ete-habitat-individuel.pdf`. Une marque minuscule, illisible, sur la façade
  de l’appareil (vérifiée à l’agrandissement : aucun logo lisible, aucun filigrane).
- `989b7d49a2.jpeg` — climatiseur mobile avec sa gaine qui sort par la fenêtre (204 × 114, petite). Trouvée dans
  `03_BAC-MFER/S2-Systemes/CLIMATISATION Sé1 Sq2.docx` (même image dans `CLIMATISATION Sq1 Se2b …docx`).
  Image de synthèse, sans filigrane ni logo.

Trouvées par `node outils/chercher-images.mjs "pièce climatisée bureau climatiseur mural dans une pièce" --photo`
et `"climatiseur mobile mono-bloc gaine flexible fenêtre" --photo`.
Écartées : trois vues de montage avec filigrane « BRICOVIDEO » ; support / unité LG / pose (logo LG et filigrane) ;
split avec console (logo du constructeur lisible sur l’unité extérieure) ; ensemble split déjà employé par 3.2 ;
photo de banc d’atelier (sans rapport) ; une unité de console du fonds energieplus (tiers).

## Symboles (`assets/`)
- `split-pared.svg`, `ud-exte-split.svg` — bibliothèque inerWeb, collection QElectroTech (CC BY 3.0),
  copiés tels quels depuis `assets/symboles/`.

## Pictogrammes et scènes
Dessinés pour la station dans `scenes.js` avec `SceneKit` (palette de la charte). Aucun symbole normalisé
n’est redessiné : les icônes du temps 3 et du temps 5 sont des pictogrammes d’aptitude, pas des symboles.

## Fond consulté (RAG et documents d’origine)
- Cours_Clim_TNE_Complet.docx — « un climatiseur extrait la chaleur du local pour la rejeter à l’extérieur ».
- CLIMATISATION Sq1 Se2b — généralités et production en climatisation.docx — principe (changement de phase,
  compresseur, détendeur) ; climatiseur mobile : gaine, air du condenseur pris dans la pièce ou dehors.
- 15 Définition du confort PROF fj.docx — facteurs du confort : température, humidité relative, vitesse de l’air ;
  le renouvellement d’air est une fonction à part (extraction d’air vicié, air neuf filtré).

## Ce qui n’est pas repris (non sourcé ou chiffré : omis)
- Plages de confort chiffrées (température, humidité relative) du document sur le confort.
- Puissance maximale, distance entre unités et perte de puissance d’un climatiseur mobile.
- Toute valeur de puissance, de débit, de charge. Le « 16 °C » de la consigne est un exemple de réglage, pas une valeur de référence.

## Affirmations de métier sans citation du fonds (à relire par F. Henninot)
- Toute l’électricité d’un ordinateur finit en chaleur dans la pièce ; l’électricité consommée par le climatiseur
  s’ajoute à la chaleur rejetée dehors (conservation de l’énergie).
- « Baisser la consigne ne refroidit pas plus vite » : la consigne fixe où l’appareil s’arrête. Nuance connue pour un
  appareil à compresseur à vitesse variable (il ralentit à l’approche de la consigne) : la station dit « ne refroidit pas
  plus vite » et laisse le détail à la station 2.4.
- Un monobloc mobile dont la gaine reste dans la pièce réchauffe la pièce (bilan : chaleur prise + électricité consommée).

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins pédagogiques, avec
citation, en prototype. Toute image signalée sera remplacée.
