# Station « Le désenfumage — le rôle du CVC » — FOND à valider

> Réseau Législation · sous-ligne **Incendie** (#b91c1c) · niveau BTS / technicien d'études CVC.
> Mini-station ≤ 10 min : 8 écrans + 4 questions. Slug : `incendie-desenfumage`.
> **Statut : fond et station produits le 30/09/2026 (vague Incendie), EN ATTENTE de relecture
> métier** (`data-prototype` posé). Aucune valeur n'entre sans source lue ; le reste est sous
> « À sourcer ».
> Méthode de lecture : Légifrance bloque la lecture automatique directe (protection anti-robot) ;
> les textes ont été lus (a) par extraction Légifrance et (b) sur des reproductions intégrales
> (Batiss pour l'IT 246 et l'article DF, INRS pour la brochure ED 6061), recoupées entre elles.

## Objectif

À la fin de la station, l'étudiant sait pourquoi on désenfume, distingue **balayage** et
**hiérarchie des pressions**, choisit entre naturel et mécanique, dit ce qui revient le plus
souvent au lot **CVC**, explique l'**ordre de démarrage** du ventilateur (volets d'abord,
temporisation) et l'**arrêt de la CTA** sur ordre du SSI, et situe le cas des **bureaux**
(Code du travail, avec l'échéance du 1er janvier 2027).

## Référentiel

**TP TECVC, REAC TP-00133 : CP7** (« Réaliser l'étude d'une installation de ventilation d'un
bâtiment tertiaire ») **et CP10** (« … d'une centrale de traitement d'air »). Justification : le
désenfumage mécanique est une étude d'aéraulique tertiaire (débits, pressions, réseaux de
conduits, ventilateurs) et impose l'arrêt de la CTA sur ordre du SSI. Hors périmètre de
l'attestation d'aptitude fluides 2025 (pas de code fluide). Le contenu détaillé des CP n'a pas
été relu ligne à ligne : la justification est à valider.

## Notions

Fumées (stratification, hauteur libre), désenfumage (DF 1), balayage, hiérarchie des pressions
(« mise à l'abri des fumées »), surpression / dépression relative, évacuation naturelle
(exutoire, ouvrant), extraction mécanique, amenée d'air, bouche, volet, DAS (dispositif actionné
de sécurité), CMSI (centralisateur de mise en sécurité incendie), SSI catégories A à E, coffret de
relayage, AES (alimentation électrique de sécurité), F400 90, unité de passage, canton, écran de
cantonnement, VMC, CTA, clapet télécommandé, ERP, bâtiment à usage professionnel (BUP).

## Déroulé des 8 écrans

1. **Les fumées tuent avant les flammes** — `fumees-avant-flammes.svg` (**animé** : la couche de
   fumée s'épaissit, la hauteur libre rétrécit). Cinq dangers (INRS ED 6061 § 1), stratification
   (§ 3.1), objet du désenfumage (DF 1). « Il gagne du temps praticable. »
2. **Deux principes** — `deux-principes.svg` (fixe). DF 3 § 1 : balayage / différence de
   pressions / combinaison. IT 246 § 5.2 : surpression d'escalier entre 20 et 80 Pa, portes
   fermées, mise en route en même temps que le désenfumage.
3. **Naturel ou mécanique** — `naturel-ou-mecanique.svg` (fixe). INRS § 3.3 (quatre
   combinaisons, à proscrire dans une même zone : évacuation naturelle + extraction
   mécanique) ; IT 246 § 3.3 (amenée mécanique seulement avec exutoires) ; DF 5 § 1 et INRS
   § 4.3 (escalier : jamais d'extraction mécanique) ; IT 246 § 5.1 (exutoire de 1 m², amenée
   d'air de surface égale) ; DF 6 § 1 (circulations : 30 m, surpression, sommeil, sous-sol).
4. **Amenées d'air, évacuations : le balayage** — `balayage-circulation.svg` (**animé** : le
   flux de fumée balayé vers la bouche). IT 246 § 6.2 (15 m / 10 m, 1 m / 1,80 m, tiers supérieur,
   0,5 m³/s par UP, 8 m³/s), § 4.6.1 (5 m/s, 0,6 fois le débit extrait), INRS § 3.6 (poinçonnement,
   bouches à 8-10 m/s).
5. **Ce qui revient au lot CVC** — `lot-cvc-chaine.svg` (fixe). IT 246 § 4.7 (ventilateur : 1 h à
   400 °C ou F400 90, extérieur ou local CF 1 h, +20 %), § 3.4.3 et 4.4 (conduits M0 / A2 s2 d0,
   ¼ h, feu intérieur, fuite < 20 %), § 3.7.1 et 4.6.2 (volets), INRS § 6 (réception : vitesses,
   débits, essai), DF 2 (dossier). **La répartition des lots est un usage de chantier (CCTP),
   pas une règle : la station le dit.**
6. **Le ventilateur qui démarre** — `ventilateur-demarre.svg` (**animé** : le repère avance, le
   battant du volet s'ouvre, l'anneau de temporisation se remplit, l'hélice tourne en dernier).
   IT 246 § 3.6.3 (commande automatique par la détection, doublée par le CMSI), § 4.8
   (temporisation maximale de 30 s), § 4.7.3 (report du sectionneur), DF 3 § 3 (AES) ; DF 3 § 2 et
   INRS § 4.8 (ordre avec le sprinkler : deux logiques, ERP contre lieux de travail).
7. **La CTA qui s'arrête** — `cta-s-arrete.svg` (**animé** : la CTA tourne puis s'arrête, le
   clapet se ferme, l'extraction s'établit). DF 3 § 5 (interruption de la ventilation, sauf VMC,
   sauf si elle participe ; par arrêt des ventilateurs depuis le CMSI ou une commande locale ;
   par clapets télécommandés si le confort est maintenu), DF 10 (vérification annuelle), INRS
   § 4.9 (asservissement recommandé).
8. **Le cas des bureaux, et le réflexe** — `bureaux-code-travail.svg` (fixe). Code du travail
   R. 4216-13 à R. 4216-15 ; INRS § 2.2 ; abrogation R. 4216-1 à R. 4216-34 au 01/01/2027
   (décret 2025-1100) ; CCH R. 144-8.

## Les 4 questions et leurs corrigés

| N° | Écran | Question | Bonne réponse (rang) |
|---|---|---|---|
| Q1 | 3 | Comment désenfume-t-on un escalier encloisonné ? | Balayage naturel ; à défaut, surpression de la cage (2e) |
| Q2 | 4 | Où placer l'amenée d'air et l'extraction dans une circulation ? | Amenée en bas, extraction en haut (3e) |
| Q3 | 6 | À l'ordre de désenfumage, comment le ventilateur doit-il démarrer ? | Après une courte temporisation, volets en position (4e) |
| Q4 | 7 | Le désenfumage démarre : que devient la CTA de confort ? | Arrêtée par le SSI, ou isolée par clapets télécommandés (1er) |

Leurres = erreurs réelles de débutant : extraire en haut d'un escalier ; mettre l'extraction en
bas ; démarrer le ventilateur « tout de suite » ; laisser la CTA souffler « pour diluer » ou la
laisser à la GTB.

## Correspondances

- `../incendie-clapets-coupe-feu/` — les clapets télécommandés qui isolent une zone.
- `../incendie-ssi/` — qui donne l'ordre (catégories A à E, CMSI).
- `../incendie-classer-le-bati/` — le classement (ERP, BUP, habitation) commande le texte.
- https://inerweb.fr/aerorezo/ — réseau voisin de l'air.
- Pont à faire depuis la station sprinkler (station à venir) : l'ordre désenfumage / extinction.

## Sources officielles (consultées le 30/09/2026)

1. **Arrêté du 25 juin 1980, chapitre IV « Désenfumage », articles DF 1 à DF 10** —
   https://www.legifrance.gouv.fr/codes/section_lc/JORFTEXT000000290033/LEGISCTA000020304211/ .
   Article DF 3 recoupé sur Légifrance (`LEGIARTI000020304554`, en vigueur depuis le 01/07/2004,
   § 5 vérifié) ; texte intégral DF 1-10 lu sur la reproduction Batiss (MàJ 28/04/2016) :
   https://batiss.fr/content/uploads/rglt-secu-30juin2017/Batiss_Securite_Incendie_DF.pdf .
2. **Arrêté du 22 mars 2004 portant approbation de dispositions complétant et modifiant le
   règlement de sécurité contre les risques d'incendie et de panique dans les établissements
   recevant du public (dispositions relatives au désenfumage)**, NOR INTE0400223A, JORF n° 78 du
   1er avril 2004 (modifié par l'arrêté du 22 novembre 2004), dont l'annexe est l'**instruction
   technique 246**. Statut lu sur Légifrance le 30/09/2026 : en vigueur. **À ne pas confondre**
   avec l'*arrêté du 22 mars 2004 relatif à la résistance au feu des produits, éléments de
   construction et d'ouvrages* (NOR INTE0400222A), abrogé depuis le 27/03/2026 par l'arrêté du
   22 mars 2026 (NOR INTE2602426A, art. 22, qui ne vise pas l'IT 246) : voir la station
   `incendie-euroclasses`. Sources —
   https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000001474775 (extraction : §§ 1, 3.4,
   4.7, 4.8, 4.9) ; texte intégral lu sur la reproduction Batiss (MàJ 24/07/2007, avec les
   corrections du 22/11/2004) :
   https://batiss.fr/content/uploads/2014/04/Batiss_Securite_Incendie_IT246.pdf .
3. **Code du travail, articles R. 4216-13 à R. 4216-16 (désenfumage)** —
   https://www.legifrance.gouv.fr/codes/id/LEGISCTA000018532414/ — version en vigueur au
   30/09/2026, **abrogés au 01/01/2027** par le décret n° 2025-1100 du 19/11/2025, art. 2.
4. **Décret n° 2025-1100 du 19 novembre 2025** — https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000052611335
   (art. 1er : chapitre IV du titre IV du livre Ier du CCH ; art. 2 : abrogation R. 4216-1 à
   R. 4216-34 ; art. 5, II : l'article 2 entre en vigueur le 01/01/2027 et s'applique aux
   opérations dont la demande d'autorisation d'urbanisme est déposée à compter de cette date,
   ou dont les travaux débutent à compter de cette date s'il n'y a pas d'autorisation ;
   vérifié à nouveau le 30/09/2026). **CCH, articles R. 144-1 à R. 144-20,
   version du 01/01/2027**, dont **R. 144-8** (désenfumage renvoyé à l'arrêté de règlement de
   sécurité des BUP prévu à l'article R. 141-1) —
   https://www.legifrance.gouv.fr/codes/id/LEGISCTA000052644991/2027-01-01 .
5. **INRS, ED 6061 « Désenfumage — Sécurité incendie sur les lieux de travail »** (mai 2025) —
   https://www.inrs.fr/dam/inrs/CataloguePapier/ED/TI-ED-6061.pdf . Lu en entier : §§ 1, 2.2 à 2.6,
   3.1 à 3.7, 4.1 à 4.9, 5, 6, annexe 1.

Normes payantes citées, **objet seulement** : NF S 61-937 (dispositifs actionnés de sécurité),
NF S 61-931 / 932 / 934 / 938 (SSI, CMSI, commandes), NF S 61-940 (alimentation électrique de
sécurité), NF EN 12101-3 (ventilateurs de désenfumage), NF EN 13501-4 (classement F400 90 :
résistance au feu des composants de systèmes de contrôle de fumée).

## Ce que la station dit à part

- **Les fumées avant les flammes** : INRS ED 6061 § 1, formule reprise en paraphrase.
- **La CTA doit avoir une entrée d'ordre du SSI décrite au cahier des charges et rien ne doit
  la relancer pendant le désenfumage** (écran 7) : c'est une **consigne de conception** déduite
  de DF 3 § 5 et de l'INRS § 4.9, pas une citation. À valider à la relecture métier.
- **Deux logiques avec le sprinkler** (écran 6) : DF 3 § 2 (ERP, SSI A, public présent :
  désenfumage commandé avant l'extinction) contre INRS § 4.8 (lieux de travail : de préférence
  le sprinkler d'abord). Les deux sont lus et cités ; la station n'arbitre pas, elle demande de
  lire le texte du bâtiment.

## À sourcer

1. **L'arrêté « règlement de sécurité des bâtiments à usage professionnel »** prévu à
   R. 141-1 / R. 144-2 / R. 144-8 : publication et contenu non lus (les seuils de désenfumage
   applicables à compter de 2027 n'y sont peut-être pas identiques à R. 4216-13 à 15).
   À vérifier avant toute affirmation sur les opérations déposées à compter du 01/01/2027.
2. **Arrêté du 5 août 1992** (prévention des incendies et désenfumage de certains lieux de
   travail, cité par l'INRS comme renvoyant à l'IT 246) : lu uniquement via l'INRS.
3. **Version consolidée à jour** de l'IT 246 (lue sur une reproduction de 2007) et de DF 1-10
   (reproduction de 2016) : vérifier sur Légifrance qu'aucune modification postérieure n'a
   changé les valeurs citées (30 s, 20 %, 5 m/s, 0,6, 15 m / 10 m, 0,5 m³/s, 8 m³/s, 20-80 Pa).
4. **Code du travail R. 4227-*** (obligations de l'employeur en utilisation des lieux de
   travail) : non abrogés par le décret 2025-1100 d'après la synthèse Légifrance lue, mais
   contenu non lu ; à ajouter si une station « lieux de travail » l'exige.
5. **La CTA dans un bâtiment à usage professionnel** : le Code du travail lu (R. 4216-13 à 16)
   n'impose pas explicitement l'arrêt de la CTA ; seul l'INRS le recommande (§ 4.9). L'obligation
   nette est celle de DF 3 § 5, pour les ERP.
6. **Classement des bureaux ouverts au public** (type d'ERP correspondant) : non lu ; la
   station dit seulement « un plateau de bureaux ouvert au public est un ERP », ce que rappelle
   l'annexe de l'IT 246 (« administrations, banques, bureaux » en classe 1).
7. **F400 90 / 1 heure à 400 °C** : l'IT 246 § 4.7.2 écrit « une heure avec des fumées à
   400 °C, ou classé F400 90 » ; l'INRS écrit 90 minutes (120 pour les IGH). La station reprend
   l'IT 246 telle que lue ; le classement F400 90 (NF EN 13501-4) n'est pas approfondi (norme
   payante).
8. **Répartition des lots** (CVC / SSI / électricité / gros œuvre) : usage de chantier, à
   confirmer par un professionnel ; la station la présente « le plus souvent » et renvoie au CCTP.
9. **IGH** (IT IGH, F400 120) : hors périmètre de la station.
