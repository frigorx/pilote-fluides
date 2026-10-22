# Station « Remplir la fiche d'intervention et le bordereau des déchets » — FOND à valider

> Réseau Législation · sous-ligne Fluidique & thermique (#0f766e). Slug `fiche-intervention-bsff`.
> Mini-station : 8 écrans + 4 questions, un exemple résolu puis une situation à remplir.
> **Statut : produite le 19/10/2026, EN ATTENTE de relecture métier (`data-prototype` posé).** Sources consultées le 19/10/2026.
> Station générique (règle du 22/10) : aucun diplôme dans le surtitre, la description ni les narrations ; les codes sont dans le bloc « Sert notamment pour ».

## Objectif

À la fin de la station, l'élève sait dire **quand** on remplit la fiche d'intervention (cerfa 15497*04) et quand on fait un bordereau de déchets
de fluides frigorigènes (BSFF, Trackdéchets), remplit case par case un exemple résolu, puis remplit seul une situation, et sait où s'entraîner (inerWeb Fluide).

## Codes affichés (libellés exacts de `HAL-v3/donnees/referentiels/peda/CAP_IFCA.json` et `BAC_MFER_2028.json`)

- **CAP IFCA** : C1.1 « Compléter, transmettre » ; C1.3 « Rendre compte » ; tâches T1 « Renseigner et transmettre des documents de suivi d'intervention »
  et T2 « Compléter les documents de traçabilité des fluides frigorigènes ».
- **Bac Pro MFER (2028)** : S1.4 « les procédures administratives » ; S8.2 « les outils de la communication écrite et numérique » ;
  tâche A3T4 « Renseigner les documents techniques et réglementaires ».
- Attestation d'aptitude 2025 (`packs/fluides/referentiel-2025.json`) : 1.00, 4.09, 5.07, 5.08. Origine du réseau : TP TECVC, hors REAC.
- **A3T4 vérifié le 22/10** : dans le référentiel 2028 (arrêté du 28/07/2026, `BAC_MFER_2028.json`, `livre-mfer/referentiel/legifrance-arrete-2026-07-28-MFER.txt` l. 460) la tâche « Renseigner les documents techniques et réglementaires » est bien **A3T4** ; **A5T2** est son code dans le référentiel de 2021 (`BAC_MFER.json`). Code gardé.
- Les tâches T1, T2 (CAP) sont ajoutées aux deux compétences demandées parce que la règle de Franck veut les tâches professionnelles avec leurs codes : à retirer si inutile.

## Le logiciel (repérage demandé)

**C'est inerWeb Fluide v8** (dépôt `D:/git/inerweb-fluide`, démonstration publique
https://frigorx.github.io/-inerweb-fluid-cerfa-fi-bsd-4/v8/ , guide https://frigorx.github.io/-inerweb-fluid-cerfa-fi-bsd-4/guide.html).
La station n'en recrée rien : elle y renvoie par un lien. Ce que le logiciel fait, vérifié dans l'application ouverte le 19/10/2026 :
- démonstration en ligne sans compte, données fictives, repère « DÉMO / FORMATION », visite guidée « L'essentiel » (5 min) ;
- bouton « Nouveau mouvement » : assistant en 6 étapes (Type, Machine, Bouteille, Pesées, Contrôle, Signature) ;
- menu « Mouvements » > « Visualiser CERFA » : le cerfa 15497*04 officiel rempli, filigrane FORMATION ; « Correction élève » (import d'un PDF d'élève, comparaison champ par champ : côté professeur).
**Écart avec la formule de Franck (« cerfa FI, BSD »)** : le logiciel ne produit **pas** le bordereau BSFF. Son menu « Déchets / remise en filière » tient un « suivi interne
de remise en filière » dont la mention permanente dit qu'il ne remplace pas le bordereau dématérialisé obligatoire ; un champ reçoit le numéro du bordereau officiel
(`docs/POINTS-DE-FRICTION.md` §2, `v8/js/data/remise-filiere.js`). La station le dit à l'écran 8. Licence : démonstration en ligne libre ; version installée sur licence nominative, gratuite pour l'enseignement.
Règle de Franck du 22/10 : démonstration en ligne ou séance fictive, jamais le registre réel.

## Déroulé des 8 écrans

1. Deux papiers, deux moments — `deux-moments.svg` (animé, goutte sur deux chemins).
2. La fiche : 14 cadres, 4 blocs — `quatre-blocs.svg` (animé).
3. Exemple résolu 1/3, cadres 1 à 4 (R-410A, 4,0 kg, 8,35 t éq. CO2) — `exemple-cadres-1-4.svg`.
4. Exemple résolu 2/3, cadres 5 à 10 — `exemple-cadres-5-10.svg`.
5. Exemple résolu 3/3, cadres 11 à 14 et signatures — `exemple-cadres-11-14.svg` (animé ; appareils réels : bouteilles, unité intérieure et unité extérieure, symboles de la bibliothèque inerWeb, QElectroTech CC BY 3.0).
6. Le BSFF dans Trackdéchets, case par case — `bsff-case-par-case.svg` (animé).
7. À vous : une situation à remplir — `situation-a-remplir.svg`.
8. Le corrigé, et le logiciel pour s'entraîner — `logiciel-entrainement.svg` (animé).

8 SVG, dont 5 animés (SMIL, boucle 12 s, état au repos = image finale).

## Les 4 questions (bonnes réponses en position 3, 1, 4, 2)

1. (écran 1) Compresseur grillé, tout le fluide au traitement : quels papiers ? -> la fiche, puis le BSFF.
2. (écran 3) 3,6 kg de R-134a (PRP donné 1 430) : 5,148 -> 5,15 t éq. CO2, plus de 5 t : opérateur et détenteur signent.
3. (écran 5) Fluide propre remis dans la machine : cadres 12 et 13 ? -> vides, pas de déchet.
4. (écran 6) Que reporte-t-on de la fiche dans Trackdéchets ? -> n° de fiche, quantité retirée (kg), code postal, SIRET et coordonnées du détenteur.

## Correspondances

`../tracabilite-fluides/`, `../aptitude-capacite/`, `../fgaz-3/`, `../dechets-dangereux/`.

## Sources (consultées le 19/10/2026)

- **Code de l'environnement** (consolidation du 07/10/2026, lue via codes.droit.org / Etalab ; liens Légifrance) :
  R. 543-76 (opérateur, détenteur) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033628884 ; R. 543-78 https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031790649 ; R. 543-79 https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000050813258 ;
  R. 543-79-1 (marque de défaut d'étanchéité) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031775256 ; R. 543-82 (fiche d'intervention : chaque opération, signature conjointe au-delà de 3 kg de HCFC ou 5 t éq. CO2 de HFC/PFC, 5 ans) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031790617 ;
  R. 543-83 (forme électronique) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000023875670 ; R. 543-87 (dégazage interdit) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000050813268 ; R. 543-88 (récupération intégrale) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006839321 ; R. 543-89 (pas de recharge d'un équipement qui fuit) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006839322 ; R. 543-92 https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006839325.
- **Notice explicative de la fiche d'intervention (Cerfa 15497*04), n° 52064#04** (cadres 1 à 14, calcul du tonnage = PRP × charge ÷ 1 000, définitions A, B, C, D, E, « ne pas remplir les cadres 12 et 13 s'il n'y a pas de déchet », périodicités) :
  copie lue sur https://capeb.fr/www/capeb/media/var/document/notice%20fiche%20d%20intervention%20fluides%20frigorigenes.pdf ; formulaire et notice : https://entreprendre.service-public.gouv.fr/vosdroits/R43122 (vérifié le 01/07/2024).
- **Formulaire officiel cerfa 15497*04** (copie `inerweb-fluide/cerfa_15497-04_officiel.pdf`) : libellés des cadres, tableau imprimé des cadres 7 à 9, lignes du cadre 12.
- **Trackdéchets, FAQ fluides frigorigènes** : Informations générales https://faq.trackdechets.fr/fluides-frigorigenes/informations-generales (la fiche n'est pas dématérialisée dans Trackdéchets, ses informations y sont reportées) ;
  Créer un BSFF https://faq.trackdechets.fr/fluides-frigorigenes/informations-generales/le-parcours-du-bsff-initial/creer-un-bsff (onglets, codes déchet, ce que l'opérateur reporte de la fiche) ;
  Signer un BSFF …/signer-un-bsff (ordre des signatures).
- **Arrêté du 26 juillet 2022** (contenu du BSFF, entrée en vigueur le 01/01/2023) https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000046138697 (lu par synthèse de page).
- **Fonds de Franck** : guidance du TP en fluide réel (cadre 11 reporté depuis la pesée, jamais estimé) ; `inerweb-fluide` : README, guide, `docs/POINTS-DE-FRICTION.md`.
- Symboles : bibliothèque inerWeb (QElectroTech, CC BY 3.0) `60_energy/21_refrigeration/` : `botella-refrig2`, `split-pared-3`, `ud-exte-split`.

## À sourcer (rien de ceci n'est affirmé comme texte officiel)

1. **PRP du R-410A (2 088) et du R-134a (1 430)** : valeurs de l'annexe I du règlement (UE) 2024/573 (base AR4) lues en source secondaire (documentation d'inerWeb Fluide, EFCTC) ; EUR-Lex non lisible. À faire viser.
2. **Code UN / code déchet du fluide de l'exemple** (R-410A non inflammable : 14 06 01*, UN 1078 ; inflammable : 16 05 04*, UN 3161) : affichés à l'écran 5 avec leur source, les deux lignes imprimées au cadre 12 du cerfa 15497*04 ; à confirmer sur la fiche de données de sécurité.
3. **Tableau des périodicités (cadres 7 à 9)** : repris du formulaire imprimé, pas du règlement (article 4 de l'arrêté du 29/02/2016, règlement 2024/573).
4. **Périmètre du cerfa** : la notice vise encore les catégories I à IV de l'arrêté du 30/06/2008 (abrogé le 31/12/2026) ; alignement sur les catégories 2025 à vérifier.
5. **Bac à sable Trackdéchets** pour s'entraîner : non établi ; la station n'en propose pas.
6. Codes déchet BSFF 14 06 01* / 16 05 04* : choix selon l'inflammabilité repris du formulaire ; la FAQ liste cinq codes possibles.

## À vérifier par Franck

- Le logiciel ne fait pas le BSFF (voir plus haut) : confirmer la formulation de l'écran 8.
- Exemple fictif (salon de coiffure, Clim'Études Sud, SIRET d'exemple 123 456 789 00012) : aucun nom réel.
- Voix : pas de MP3 (voix du navigateur en filet).
- La scène d'accueil (branche fluidique) n'a pas d'étape pour cette station : à poser dans `scenes/fluidique.js` (hors périmètre).
