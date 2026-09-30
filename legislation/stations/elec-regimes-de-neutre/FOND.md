# Station « Régimes de neutre » — FOND

> Réseau Législation · sous-ligne Électrique · niveau BTS · TECVC.
> Mini-station ≤ 12 min : 8 écrans + 4 questions.
> Titre du plan : « Régimes de neutre » — « TT · TN · IT ».
> **Statut : produite le 30/09/2026, `data-prototype` posé — en attente de la relecture métier de F. Henninot.**
> Doctrine : aucun chiffre réglementaire non sourcé. Les seuls chiffres présents sont
> (a) la tension de 50 V, sourcée INRS, (b) les sensibilités usuelles des DDR et l'exemple
> « maison » de l'INRS, (c) les **exemples d'école** du guide « Intersections » (calculs, pas
> des valeurs réglementaires), signalés comme tels dans les écrans.

## Objectif

À la fin de la station, l'étudiant sait lire les deux lettres d'un régime de neutre, suivre le
chemin du courant de défaut en TT, TN et IT, dire qui coupe dans chaque cas, et savoir ce que
cela change quand il raccorde (ou prescrit le raccordement d') une machine : dispositif
différentiel en TT, coupure par la protection contre les surintensités en TN (donc dépendance
à la boucle de défaut), contrôleur permanent d'isolement en IT.

## Référentiel

**TP TECVC, REAC TP-00133 (millésime 08) : CP9** (« Réaliser l'étude d'une installation de
climatisation ») **et CP10** (« … d'une installation d'une centrale de traitement d'air »).
Justification : le technicien d'études prescrit le raccordement électrique des unités de
climatisation et des CTA ; le régime de neutre décide de la protection en tête de circuit et du
point de vigilance (boucle de défaut en TN sur câble long). Station hors périmètre de
l'attestation d'aptitude fluides 2025 (aucun code fluide). Le contenu détaillé des CP n'a pas
été relu ligne à ligne : la justification est à valider (voir « À sourcer »).

## Notions

Régime de neutre = schéma de liaison à la terre (SLT). 1re lettre : neutre du transformateur
(T terre, I isolé). 2e lettre : masses (T terre, N neutre). 3e lettre (TN) : C (N et PE
combinés en PEN) ou S (séparés) ; TN-C-S = TN-S en aval d'un TN-C. Défaut d'isolement,
contact indirect, masse, conducteur de protection (PE), prise de terre, boucle de défaut,
dispositif différentiel à courant résiduel (DDR), contrôleur permanent d'isolement (CPI).

## Déroulé des 8 écrans

1. **Deux lettres, un code** — `codification-slt.svg` (fixe) : tableau 2 × 2, trois régimes,
   IN non normalisé.
2. **Le défaut d'isolement** — `defaut-personne.svg` (**animé**) : phase sur carcasse, pas de
   PE, la personne referme le circuit ; 50 V (INRS) ; Code du travail R. 4215-3.
3. **TT** — `schema-tt.svg` (**animé**) : deux prises de terre, boucle par le sol, exemple
   d'école 230 V / 10 Ω / 5 Ω → ≈ 15 A, carcasse ≈ 153 V ; il faut un DDR.
4. **TN** — `schema-tn.svg` (**animé**) : boucle par le PE, sans le sol, court-circuit
   phase-neutre, coupé par disjoncteur/fusible ; condition sur la boucle de défaut ; exemple
   d'école ≈ 4 089 A ; applications.
5. **TN-C, TN-S, TN-C-S** — `tn-variantes.svg` (fixe) : PEN (vert rayé de bleu), N et PE
   séparés, séparation en aval.
6. **IT** — `schema-it.svg` (**animé**) : deux panneaux ; 1er défaut (courant faible, CPI
   signale, exemple d'école 67 mA), 2e défaut (court-circuit, coupure) ; applications.
7. **Ce que cela change au raccordement** — `raccorder-machine.svg` (fixe) : trois cartes
   (DDR / disjoncteur-fusible / CPI), un premier geste commun : relier la masse au PE.
8. **Bilan et le réflexe** — `bilan-regimes.svg` (fixe) : trois gestes (repérer le régime,
   repérer la protection, relier le PE).

Illustrations : 8 SVG, dont 4 animés (SMIL autonome, sans script, état au repos = image
finale, boucle de 13 s avec temps de repos). Le trait orange épais figure le courant de défaut
(tirets dans le sol, trait mince au 1er défaut IT, trait épais au court-circuit) : la couleur est
toujours doublée par la forme du trait et le texte.

## Les 4 questions (corrigés)

| N° | Écran | Question | Bonne réponse (rang) | Explication |
|---|---|---|---|---|
| 1 | 1 | Dans TN, que signifie la lettre N ? | Les masses sont reliées au conducteur neutre (3e) | La 2e lettre décrit les masses. |
| 2 | 3 | TT sans différentiel : pourquoi le défaut franc est-il dangereux ? | Deux prises de terre limitent le courant : le disjoncteur tarde à ouvrir (1re) | Courant ≈ 15 A dans l'exemple, carcasse dangereuse. |
| 3 | 4 | En TN, qui élimine le défaut d'isolement ? | Le disjoncteur ou le fusible : le défaut est un court-circuit (4e) | Court-circuit phase-neutre par le PE. |
| 4 | 6 | En IT, le CPI signale une baisse : que faites-vous ? | Prévenir l'exploitant : traiter le défaut avant un second (2e) | Rien ne coupe au 1er défaut ; ne jamais neutraliser le CPI. |

Leurres : IT et impédance (Q1), courant « énorme » (confusion avec TN), neutre isolé (confusion
avec IT), carcasse « à la terre donc sans risque » (Q2), CPI qui ouvre, différentiel « seul
capable », prise de terre qui « absorbe » (Q3), alarme sans conséquence, CPI débranché, coupure
générale (Q4). La bonne réponse n'est jamais la plus longue.

## Correspondances

- `../elec-terre-differentiel/` — Terre & différentiel (même sous-ligne).
- `../elec-nf-c-15-100/` — NF C 15-100 (même sous-ligne).
- `../elec-proteger-un-circuit/` — Protéger un circuit (même sous-ligne).
- <https://inerweb.fr/electrorezo/> — ÉlectroRézo (réseau technique).

Inspirations (RAG, non recopiées) : diaporama « Régime de neutre TT » et exercice corrigé
« régimes de neutre » de F. Henninot (Bac Pro MFER), schéma de liaison à la terre TT (CAP IFCA).
Seules leurs références ont été retournées par le RAG (métadonnées) ; le contenu n'en a pas été repris.

## Sources officielles (consultées le 30/09/2026)

1. **Guide technique « Les schémas de liaison à la terre — Régimes de neutre et SLT »**,
   collection « Intersections », novembre 1998, hébergé par Éduscol STI (Éducation nationale) :
   <https://sti.eduscol.education.fr/sites/eduscol.education.fr.sti/files/ressources/techniques/681/681-gt-schemas-neutre.pdf>
   — codification I/T/N/C/S ; définitions TT, TN (C, S, C-S), IT ; trajets et exemples de calcul
   (TT : 230 V, RA = 10 Ω, RB = 5 Ω, 15,3 A, 153 V ; TN : 4 089 A ; IT : 67 mA) ; rôle du DDR en
   TT, de la protection contre les courts-circuits en TN, du CPI en IT ; applications (distribution
   publique en TT ; industrie, grand tertiaire, IGH en TN ; hôpitaux, pistes d'aéroport, mines,
   bateaux, industries à arrêt coûteux en IT). **Limite** : document de 1998, antérieur aux
   éditions actuelles de la NF C 15-100 : les valeurs d'école ne sont pas des valeurs
   réglementaires, et les tableaux de temps de coupure qu'il cite ne sont pas repris.
2. **INRS, ED 6345 « L'électricité »**, 1re édition, novembre 2019 :
   <https://www.inrs.fr/dam/inrs/CataloguePapier/ED/TI-ED-6345.pdf>
   — § 4.3 « Protection par coupure automatique de l'alimentation » : tension dangereuse
   (50 V en courant alternatif), rôle du DDR (sensibilités usuelles 500, 300, 30 mA), condition
   « résistance de prise de terre × sensibilité ≤ 50 V » avec l'exemple d'une maison (100 Ω,
   500 mA) ; peau sèche et fine : au-delà d'environ 50 V alternatifs la peau ne protège plus. La
   brochure indique elle-même que les schémas TT, TN et IT n'y sont pas développés et renvoie à la
   NF C 15-100.
3. **Code du travail, art. R. 4215-3** (Légifrance) :
   <https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000022765011> — en cas de défaut
   d'isolement, aucune masse ne doit présenter, avec une autre masse ou un élément conducteur,
   une différence de potentiel dangereuse pour les travailleurs. (Texte confirmé par
   recoupement sur deux sites reflétant le Code ; le site Légifrance lui-même n'a pas pu être
   lu en direct.)

Source secondaire, non citée dans les écrans : Loïc Lonardoni (CEA), « Batteries au lithium :
risques électriques, d'incendies et d'explosion », journée technique INRS du 22/11/2022 :
<https://www.inrs.fr/dam/jcr:a0bb45b7-5418-477c-996d-ea695bb05147/2%20Lonardoni.pdf> — recoupe
le comportement au premier défaut en TN (court-circuit) et en IT (CPI, second défaut).

## À sourcer (omis dans la station, jamais approximé)

- Les **temps de coupure maximaux** (par tension et par régime) : tableaux de la NF C 15-100
  (norme payante), non consultée.
- La **tension limite conventionnelle 25 V** en locaux mouillés (citée dans le guide de 1998 en
  référence à la CEI) : non reprise, à confirmer sur la norme en vigueur.
- Les **règles de section et d'emploi du PEN / du TN-C** (TN-S obligatoire sous certaines
  sections, interdiction de sectionner le PEN, incompatibilité d'un DDR avec un PEN) : le guide de
  1998 en donne mais sa valeur est périmée ; l'écran 5 n'énonce que la logique (un fil, deux
  rôles), non une règle.
- Les **restrictions d'emploi** du TN et de l'IT (locaux à risque d'incendie ou d'explosion) :
  le guide de 1998 est ambigu ; non reprises.
- Les **obligations de DDR 30 mA** (prises de courant, chantiers, installations temporaires) :
  le guide cite un décret de 1988 et la NF C 15-100 § 532-2-6 ; non reprises, à sourcer sur les
  textes en vigueur (le décret du 14/11/1988 a été codifié dans le Code du travail).
- Les **valeurs maximales de résistance de prise de terre** par régime, et la **règle
  d'association** entre sensibilité du DDR et prise de terre au-delà de l'exemple INRS « maison ».
- Le **régime imposé par le distributeur** selon le type de branchement : non sourcé.
- L'**édition en vigueur de la NF C 15-100** et ses amendements : à citer par F. Henninot.
- La **correspondance exacte des CP9 et CP10** avec le raccordement électrique (relecture du
  REAC TP-00133 par F. Henninot).
- Consigne pédagogique (pas une citation) : « ne jamais neutraliser le CPI » et « prévenir
  l'exploitant » (écrans 6 et 7, question 4) sont des consignes professionnelles déduites du rôle
  du CPI, à valider à la relecture métier.

## Défauts connus

- Aucun MP3 fabriqué (voix du navigateur) : chaîne edge-tts à passer par le rail commun.
- Scène `../../img/scene-electrique.webp` référencée telle quelle ; elle sera fournie.
- Les exemples chiffrés du guide de 1998 sont donnés comme « exemples d'école » ; leur
  contexte (câble 50 mm² / 50 m ; 1 km de câble avec filtres) n'est repris qu'en partie.
