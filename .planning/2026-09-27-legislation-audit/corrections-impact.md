# Corrections — branche Impact environnemental — 27/09/2026

## impact-prp-odp
- Q1 : bonne réponse resserrée (74 → 61 car.), distracteur b reformulé sans « aucun ».
- Q3 : distracteur d resserré (« par prudence commerciale » retiré).
- Q4 : distracteur c reformulé sans « Aucune ».
- Aucune narration touchée (aucune ne décrit la géométrie sur cette station).

## impact-tewi
- Narration écran 3 réécrite : décrivait le SVG bloc par bloc, dit maintenant le sens
  (calcul de la part indirecte, réseau électrique).
- Q1, Q3, Q4 : bonnes réponses resserrées (130→45, 100→66, 131→49 car.).
- Q2, Q4 : distracteurs a reformulés sans « toujours ».

## impact-acv-carbone
- Narrations écrans 2, 3, 5 réécrites : décrivaient l'usine, le camion, les trois flux
  scène par scène ; disent maintenant le sens de chaque étape (fabriquer, transporter,
  démolir). Alt des `<img>` laissés intacts (description géométrique conservée pour
  l'accessibilité).
- Q2 : réordonnée (bonne en position 1), distracteur a reformulé sans « toujours ».
- Q3 : réordonnée (bonne en position 4), bonne resserrée (103→54 car.).
- Q4 : bonne resserrée (136→59 car.), distracteur a reformulé sans « exactement ».
- Positions des bonnes réponses sur les 4 questions : 2,1,4,3 (au lieu de 2,3,3,3 —
  trois fois la position « c » de suite corrigé).
- Q1 : correction après mesure — bonne réponse resserrée en énumération compacte des
  4 étapes (« Fabriquer/transporter/exploiter/démolir », 42→39 car.), conforme au seuil.
- Maillage (index.html + FOND.md) : lien manquant vers `impact-tewi` ajouté (`../impact-tewi/`).

## impact-ecoconception
- Narrations écrans 4, 5 réécrites : décrivaient les bandes de classe énergie et les
  barres empilées ; disent maintenant le sens (étiquette énergie, part indirecte du TEWI).
- Q1, Q2, Q3 : bonnes réponses resserrées (76→43, 113→58, 84→48 car.).
- Q2, Q4 : distracteurs reformulés sans « aucun » / « toujours ».
- Q4 : bonne resserrée (123→75 car.).
- Positions déjà variées (2,3,1,4), non touchées.
- Maillage (index.html + FOND.md) : lien manquant vers `impact-tewi` ajouté.

## impact-montreal-kigali
- Narrations écrans 3, 5 réécrites : décrivaient les deux cartes et le document agrafé ;
  disent maintenant le sens (relais des HFC, amendement au texte).
- Q1, Q2, Q3, Q4 : bonnes réponses resserrées (79→55, 104→46, 91→70, 97→60 car.).
- Q2, Q3, Q4 : distracteurs reformulés sans « aucun » / « strictement » / « entièrement ».
- FOND.md : le point 4 affirmait que la station « PRP & ODP » n'existe pas — corrigé,
  la station existe (produite le 24/08/2026).
- Maillage (index.html) : lien manquant vers `impact-prp-odp` ajouté (`../impact-prp-odp/`).
- Positions non touchées (2,4,2,3 — pas de répétition prohibée par la règle).

## Narrations modifiées (perdent leur MP3, à refabriquer)
- impact-tewi : écran 3.
- impact-acv-carbone : écrans 2, 3, 5.
- impact-ecoconception : écrans 4, 5.
- impact-montreal-kigali : écrans 3, 5.

## Non touché (hors mandat)
- Commentaires « moteur en absolu » / « PAS de voix-index.js » : déjà corrigés avant
  cette session dans les 5 stations, non repris.
- `styles.css` inchangé par cette session (un bloc `.scene` y apparaît en diff local,
  antérieur à cette intervention, non lié à ce chantier).
- Aucune valeur réglementaire ajoutée, aucun SVG touché (les 19 SMIL restent intacts).

## Reste pour F. Henninot
- `impact-prp-odp` / `impact-montreal-kigali` : le maillage F-Gaz 3 cite « (UE) 2024/573 »,
  absent du FOND.md qui ne donne que « F-Gaz 3 » — à arbitrer si le numéro doit entrer au fond.
- `impact-prp-odp` : source à trouver si besoin — horizon du PRP (100 ans), valeur ODP
  précise des CFC/HCFC, rapport IPCC (AR4/AR5) dont dépend la valeur de PRP citée.
- `impact-tewi` : facteur d'émission électrique, durée de vie type, % direct/indirect —
  aucun chiffre en dur actuellement, à sourcer si un exemple chiffré est ajouté.
- `impact-acv-carbone` : seuil chiffré RE2020 (kgCO₂/m²) et triptyque Bbio/Cep/Ic — non
  nommés, à arbitrer.
- `impact-ecoconception` : aucun texte réglementaire cité (directive 2009/125/CE,
  règlement (UE) 2017/1369) alors que les autres stations de la branche citent leur texte
  source — à ajouter si validé.
- `impact-montreal-kigali` : aucune date pour Kigali, aucun calendrier de phase-down F-Gaz 3
  — volontairement absent, à sourcer si Franck veut les ajouter.
