# Corrections — Risques professionnels (27/09/2026)

## risques-chimique
- Écran 2 (🟠, seul défaut réglementaire de la branche) : le pictogramme
  « Danger santé » de `svg/chimique-pictogrammes.svg` était dessiné en point
  d'exclamation (GHS07 = nocif/irritant), mais correspondait pédagogiquement
  au danger grave (CMR) traité écran 4. Redessiné en silhouette humaine avec
  étoile sur la poitrine (GHS08 réel), bord rouge (`#c0392b`, couleur
  « échec » déjà de la charte) pour le distinguer des trois autres losanges
  (restés à bord orange `#c2410c`). `<desc>` du SVG, texte, `alt` et
  figcaption de l'écran 2 alignés sur ce sens exact.
- Q2 (🟡) : bonne réponse raccourcie (97 → 47 caractères, la parenthèse
  d'exemples déplacée dans `data-explication`).
- Maillage : ajout de deux liens relatifs internes à la branche —
  `../risques-epi/` et `../risques-atex/`.

## risques-atex
- Q1 (🟡, écart le plus fort de la branche) : bonne réponse raccourcie
  (117 → 62 caractères).
- Maillage : ajout du lien relatif `../risques-chimique/`.

## risques-hauteur
- Q1 (🟡) : bonne réponse raccourcie (87 → 57 caractères).

## risques-duerp
- Q3 (🟡) : bonne réponse raccourcie (82 → 57 caractères).

## risques-epi
- Q2 (🟡) : bonne réponse raccourcie (76 → 60 caractères).
- Maillage : ajout de deux liens relatifs internes à la branche —
  `../risques-neuf-principes/` et `../risques-chimique/`.

## risques-neuf-principes
- Aucun défaut relevé par l'audit.
- Maillage : ajout du lien relatif `../risques-epi/`.

## Narrations modifiées
- **risques-chimique, écran 2** — seule narration touchée. Modifiée car le
  rapport signalait explicitement l'écran 2 (texte, alt et narration
  disaient tous « point d'exclamation »). Perd son MP3 jusqu'à la prochaine
  fabrication voix.

## FOND.md
Wording des quiz et sections Maillage mis à jour en miroir des cinq
stations touchées, pour rester la source de référence.

## Second passage (mesure en octets UTF-8 du coordinateur)
- 15 questions supplémentaires sur les 24 avaient la bonne réponse la plus longue et détachée ; resserrées dans les six stations, écrans de questions uniquement (aucune narration, ni FOND.md hors miroir des quiz).
- Rang de longueur de la bonne réponse revérifié par script sur les 24 questions : 0 détachement restant ; variété par station — duerp 3-4-1-2, epi 4-2-3-1, hauteur 3-1-4-2 (spectre complet), chimique 1-1-4-2, atex 1-1-2-3, neuf-principes 2-1-1-2 (ces trois dernières limitées par des distracteurs déjà conformes, non retouchés).

## Ce qui reste pour F. Henninot
- **Arbitrage possible** : le nouveau pictogramme GHS08 (silhouette + étoile,
  bord rouge) est une proposition de dessin simple en traits ; à valider
  visuellement avant fabrication voix/impression.
- **Ce qui manque** (listé par le rapport, non ajouté) :
  - risques-duerp : droit de retrait, rôle du CSE, lien DUERP ↔ plan de
    prévention formalisé (art. R.4512-6 s.).
  - risques-neuf-principes : qui applique concrètement la hiérarchie
    (employeur planifie / technicien applique), art. L.4121-2.
  - risques-epi : normes EN pour gants/lunettes, gratuité EPI à charge de
    l'employeur.
  - risques-hauteur : vérification du harnais avant la montée, formation au
    montage d'échafaudage (distincte de la vérification).
  - risques-chimique : lien pictogramme ↔ FDS sur un produit CMR précis ;
    tri des déchets chimiques (solvants, huile) — maillage possible vers la
    sous-ligne Déchets, non fait ici (hors branche).
  - risques-atex : marquage ATEX du matériel (catégorie/groupe), ventilation
    naturelle vs mécanique.
- **Valeurs à sourcer, aucune ajoutée** : périodicités, seuils d'effectif,
  VLEP, H-phrases, concentrations LIE/LSE, zones ATEX chiffrées, seuil de
  hauteur — toutes listées dans les FOND.md respectifs, à arbitrer par
  F. Henninot avant tout ajout.
