# Corrections — Fluidique & thermique — 27/09/2026

## fgaz-3

- `index.html:298` — maillage rendu réciproque : lien réel `../aptitude-capacite/`
  ajouté, phrase corrigée (« Aptitude & capacité est ouverte : le lien
  fonctionne. NF EN 378 et Traçabilité sont en préparation »).
- `index.html` Q4 — bonne réponse trop longue (89 car. vs 56-64) : resserrée à
  « Il peut, selon l'échéancier, encore servir en maintenance » (57 car.), le
  détail « recyclé ou régénéré » reste dans `data-explication`. Distracteur a)
  reformulé pour retirer l'absolu « jamais » (« Il ne peut plus être utilisé
  du tout, même en maintenance »).
- `svg/le-reflexe.svg` — les deux lignes `.bi` (117 et 133 car.) coupées en
  2 `tspan` chacune ; `viewBox`/rect passés de 330 à 366 de haut pour loger les
  4 lignes.
- `svg/aptitude-capacite-categories.svg` (partagé, voir aussi
  aptitude-capacite) — la ligne la plus tendue (108 car., boîte à 802 px
  utiles) coupée en 2 `tspan` ; encadré agrandi de 46 à 66 px de haut, sans
  toucher aux éléments suivants (marge suffisante avant le titre « Les sept
  catégories »). Les autres lignes `.lg`/`.cl` du fichier restent sous les
  100 car. et n'ont pas été touchées (calcul : marge confortable, pas de
  débordement confirmé).
- `FOND.md` — section « À sourcer » ajoutée (seuils 5/50/500 t éq. CO₂,
  échéancier 2025→2035, horizon 2050 — annexe du règlement 2024/573 à
  retrouver), sans modifier aucun chiffre de la station. Ligne périmée
  « Écrans 5 et 8 : pas de SVG » corrigée (les deux ont un SVG). Q4 du quiz
  mise à jour pour suivre le HTML.

## aptitude-capacite

- `index.html` Q1 à Q4 — la bonne réponse était systématiquement la plus
  longue (Q1 68 car. vs 45-57 ; Q2 91 vs 39-46 ; Q3 61 vs 23-50 ; Q4 77 vs
  39-59). Resserrée dans les quatre cas (52, 56, 49, 48 car.), le détail
  retiré de l'énoncé reste dans `data-explication` déjà présent. Rang de
  longueur de la bonne réponse maintenant varié (4ᵉ, 1ʳᵉ, 2ᵉ, 3ᵉ sur les
  4 questions) et position dans la liste changée pour éviter le figé
  « toujours 2 ou 3 » (nouvel ordre des positions : 2, 4, 1, 3).
- `svg/maintien-7-ans.svg` — ligne `.note` de 133 car. centrée dans un
  `viewBox` de 900 px (déborde des deux côtés) coupée en 2 `tspan` ;
  `viewBox` passé de 400 à 422 de haut (élément en fin de fichier, rien
  d'autre à décaler).
- `svg/aptitude-capacite-categories.svg` — même correction que côté fgaz-3
  (fichier partagé, identique dans les deux dossiers après coup).
- `FOND.md` — les 4 questions mises à jour pour suivre les nouveaux textes et
  le nouvel ordre du HTML.

## Correction complémentaire (mesure post-passage)

Trois distracteurs resserrés sans gonfler les autres : aptitude-capacite Q1
(a et d raccourcis, 54/57→44/44, band final 44-45) ; fgaz-3 Q1 (a raccourci
43→39, écart avec la bonne ramené à 4 caractères) ; fgaz-3 Q3 (b uniformisé
en écriture décimale « 8,0 » comme les trois autres options, 11→13 car., seul
levier possible sans toucher au calcul).

## Narrations modifiées

Aucune. Aucun `data-narration` n'a été touché (les défauts corrigés portaient
sur les boutons de quiz, `data-explication`, les SVG et le maillage — jamais
sur la narration).

## Reste pour F. Henninot

- `fgaz-3/index.html:324` (`data-prototype`) : présent alors que la station
  compte parmi les « 2 stations ouvertes » de la branche — à trancher (le
  retirer au passage en production, ou pas) ; non touché, sur la liste
  « ne pas toucher ».
- Seuils 5/50/500 t éq. CO₂ (F-Gaz II, réglement 517/2014, art. 4) : à
  confirmer que le règlement 2024/573 les reprend à l'identique — listé dans
  la nouvelle section « À sourcer » de `FOND.md`, aucun chiffre modifié.
- `aptitude-capacite-categories.svg` : deux lignes plus longues du fichier
  (98 et les `.cl` courtes) laissées telles quelles — calcul de largeur sans
  débordement confirmé ; seule la ligne la plus tendue (108 car.) a été
  coupée par précaution. À revérifier à l'écran si Franck préfère être plus
  prudent.
- Codes BTS d'adossement toujours en `⟦…⟧` dans les deux stations — non
  tranché, non touché (hors périmètre de cette correction).
