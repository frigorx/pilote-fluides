# Audit — Impact environnemental (5 stations) — 27/09/2026

Lecture seule, aucune station modifiée. Les 5 stations sont au statut `data-prototype`
(non relues par F. Henninot) : ce statut n'est pas repris comme défaut ci-dessous, il est
déjà correctement signalé dans chaque FOND.md et chaque index.html.

## impact-prp-odp

| Gravité | Où | Défaut | Proposition |
|---|---|---|---|
| 🟠 | index.html:293-297 | Le commentaire dit « PAS de voix-index.js ici : aucun audio... » alors que la ligne suivante charge bien `voix-index.js` | Corriger ou retirer le commentaire |
| 🟡 | index.html Q1-Q4 | Bonnes réponses un peu plus longues que les distracteurs (ex. Q1 : 74 car. contre 36-48), sans excès | Resserrer les distracteurs si retouché |

Chiffres sans source : « (UE) 2024/573 » (index.html:276, maillage F-Gaz 3) n'apparaît pas
dans le FOND.md, qui ne cite que « F-Gaz 3 » sans numéro.
À sourcer (fond) : horizon temporel du PRP (100 ans, volontairement absent du HTML) ;
valeur ODP précise des CFC/HCFC (volontairement absente) — cohérent, rien de ceci ne fuite
dans le HTML.
Ce qui manque : aucun lien retour depuis `impact-montreal-kigali`, qui pourtant nomme cette
station en toutes lettres à son écran 4 ; pas de mention que la valeur de PRP dépend du
rapport IPCC retenu (AR4/AR5), alors que la station insiste déjà sur « valeur admise ».

## impact-tewi

| Gravité | Où | Défaut | Proposition |
|---|---|---|---|
| 🟠 | index.html:299-303 | Même contradiction « PAS de voix-index.js ici » / script chargé juste après | Corriger le commentaire |
| 🟠 | index.html:127 (écran-3, « part indirecte ») | Narration décrit le schéma bloc par bloc (« Premier bloc : un compteur... Un signe multiplié. Deuxième bloc... ») au lieu de dire le sens, contrairement aux écrans 1 et 2 de la même station | Réécrire en partant du sens, comme à l'écran 2 |
| 🟡 | index.html:223,240,253,270 | Bonne réponse nettement plus longue/détaillée que les distracteurs (Q1 : 130 car. contre 40 au plus court ; Q3 : 103 contre 30-43 ; Q4 : 136 contre 24-30) — devinable sans le cours | Réécrire les distracteurs à longueur comparable |

Chiffres sans source : aucun (la station n'affiche aucune valeur de PRP en dur).
À sourcer (fond) : facteur d'émission électrique, durée de vie type, % de répartition
direct/indirect — les trois bien absents du HTML, cohérent.
Ce qui manque : aucun exemple chiffré de bout en bout (un calcul TEWI = direct + indirect
avec des valeurs, même fictives) qui rendrait la formule concrète pour un BTS.

## impact-acv-carbone

| Gravité | Où | Défaut | Proposition |
|---|---|---|---|
| 🟠 | index.html:105,115,135 (écrans 2, 3, 5) | Narrations qui décrivent la géométrie du SVG scène par scène (usine, flèches, couleurs des flux) plutôt que le sens — l'écart que l'audit doit repérer en priorité | Réécrire en partant du sens ; garder la description géométrique pour l'`alt` |
| 🟡 | index.html:198,215,231,247 | Bonne réponse en position **c** trois fois de suite (Q2, Q3, Q4) — un élève qui « choisit toujours C » obtiendrait 3/4 sans rien savoir | Redistribuer les positions des bonnes réponses |
| 🟡 | index.html:14,262-266 / FOND.md:9-11,100-107 | Le FOND annonce en tête une « correspondance directe » avec `impact-tewi`, répétée aux écrans 4 et 8 (« vu dans une autre station du même réseau ») ; le maillage ne la liste jamais alors qu'il liste RE2020 et NF EN 378, non construites | Ajouter le lien vers `../impact-tewi/` dans le maillage |

Chiffres sans source : aucun.
À sourcer (fond) : seuil chiffré de la RE2020 (kgCO₂/m²) ; part relative en % — absents du
HTML, cohérent.
Ce qui manque : le triptyque Bbio/Cep/Ic, déjà nommé dans `thermique-re2020`, n'est jamais
cité ici alors que l'écran 6 en parle sans le nommer ; aucun exemple chiffré comparant deux
matériaux ou deux fluides sur un même cycle de vie.

## impact-ecoconception

| Gravité | Où | Défaut | Proposition |
|---|---|---|---|
| 🟠 | index.html (écrans 4, 5) | Même écart : narrations en description géométrique (bandes empilées, icône, barres) avant/à la place du sens | Réécrire en partant du sens |
| 🟡 | index.html:202,219,233,252 | Bonne réponse systématiquement plus longue/détaillée (ex. Q4 : 124 car. contre 38-58) | Réécrire les distracteurs |
| 🟡 | index.html:14 / FOND.md:9-11,181-186 | Même défaut que `impact-acv-carbone` : correspondance directe avec `impact-tewi` annoncée en tête de FOND et à l'écran 5, absente du maillage | Ajouter le lien vers `../impact-tewi/` |

Chiffres sans source : aucun.
À sourcer (fond) : nombre exact de classes de l'étiquette énergie ; note d'indice de
réparabilité — cohérent, absents du HTML.
Ce qui manque : aucun texte réglementaire n'est nommé (directive Écoconception 2009/125/CE,
règlement d'étiquetage énergétique (UE) 2017/1369), alors que les 4 autres stations de la
branche citent systématiquement leur texte source ; l'indice de réparabilité n'est jamais
rattaché à son cadre réglementaire français.

## impact-montreal-kigali

| Gravité | Où | Défaut | Proposition |
|---|---|---|---|
| 🟠 | index.html:289-293 | Même contradiction « PAS de voix-index.js ici » / script chargé juste après | Corriger le commentaire |
| 🟠 | FOND.md:171-174 | Le FOND affirme que la station « PRP & ODP » « n'existe pas encore » — or `impact-prp-odp` existe, produite le même jour (24/08). L'écran 4 du HTML nomme pourtant cette station en toutes lettres (« C'est le sujet de la station PRP & ODP, à laquelle celle-ci se raccroche ») sans lui donner de lien | Mettre à jour le FOND et ajouter le lien `../impact-prp-odp/` au maillage |
| 🟡 | index.html:207,225,239,256 | Bonne réponse plus longue/détaillée que les distracteurs (ex. Q2 : 105 car. contre 29-38) | Réécrire les distracteurs |

Chiffres sans source : « (UE) 2024/573 » (index.html:272, maillage F-Gaz 3) absent du
FOND.md, qui ne cite que « F-Gaz 3 » sans numéro — même écart que sur `impact-prp-odp`.
À sourcer (fond) : année de l'amendement de Kigali, jalons du phase-down, date d'entrée en
vigueur — les trois bien absents du HTML, cohérent avec la consigne « ne pas écrire tant
que non vérifié ».
Ce qui manque : aucune date pour Kigali (assumé et déjà signalé par le FOND) ; pas de
calendrier chiffré du phase-down F-Gaz 3 qui rendrait le lien avec le métier plus concret.

## Synthèse de la branche

- Défauts transversaux : (1) le commentaire « PAS de voix-index.js ici » contredit le
  script chargé juste en dessous, identique dans les 5 stations ; (2) sur au moins 3
  stations (acv-carbone, écoconception, montreal-kigali) et un écran de tewi, la narration
  décrit la géométrie du SVG (blocs, flèches, couleurs) au lieu de dire ce que ça signifie —
  l'écart que le brief demandait explicitement de repérer ; (3) sur la quasi-totalité des 20
  questions de quiz (sauf prp-odp, plus mesuré), la bonne réponse est nettement plus longue
  et plus détaillée que les distracteurs, ce qui la rend devinable sans le cours ; (4) des
  correspondances vers des stations sœurs déjà construites et citées en toutes lettres dans
  le texte (impact-tewi depuis acv-carbone et écoconception ; impact-prp-odp depuis
  montreal-kigali) sont absentes du maillage, alors que des stations non construites y
  figurent. Les chiffres de PRP (0, 1, 3, 675, 2088, 3922) sont cohérents entre les 5
  stations et avec un usage réglementaire répandu ; aucune erreur factuelle décelée avec un
  niveau de certitude suffisant pour un 🔴. Les 19 SVG animés ont un état de repos lisible :
  les éléments transitoires (flèches, billes) disparaissent après leur trajet et sont
  systématiquement doublés d'une marque permanente (ex. l'entaille d'ozone dans
  `mecanisme-odp.svg`), vérifié par sondage sur les 19 fichiers.
- Les 5 corrections les plus utiles, dans l'ordre : 1) réécrire les distracteurs des 20
  questions de quiz à longueur et niveau de détail comparables à la bonne réponse ; 2)
  corriger la position des bonnes réponses dans `impact-acv-carbone` (3 fois « c » de
  suite) ; 3) ajouter les liens de maillage manquants vers `impact-tewi` (depuis
  acv-carbone et écoconception) et vers `impact-prp-odp` (depuis montreal-kigali, en
  mettant à jour son FOND) ; 4) corriger le commentaire HTML périmé sur `voix-index.js`
  dans les 5 stations ; 5) réécrire les narrations « géométrie d'abord » en `impact-acv-carbone`,
  puis `impact-ecoconception` et `impact-montreal-kigali`, pour qu'elles disent le sens.
