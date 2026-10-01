# Station « NF C 15-100 — la norme BT » — FOND

> Réseau Législation · sous-ligne **Électrique** (#a16207) · niveau BTS · tête de sous-ligne.
> Mini-station ≤ 10 min : 8 écrans + 4 questions. Fond et station rédigés le 30/09/2026.
> **Statut : en attente de relecture métier** (`data-prototype` posé).
> Toutes les sources ont été consultées le **30/09/2026**. Norme payante : rien de son texte
> n'est reproduit ; seuls les textes réglementaires publics (cités par article) et des guides
> d'application publics (Promotelec, Legrand) sont utilisés.

## Correction d'une prémisse (à lire en premier)

La commande disait « norme rendue d'application obligatoire par les textes pour le logement ».
C'était vrai **jusqu'au 31/08/2016** : l'arrêté du 22 octobre 1969 rendait la norme obligatoire
« dans son intégralité » (Legrand, guide amendement 5, p. 2). L'**arrêté du 3 août 2016** l'a
**abrogé** (art. 6) et lui a substitué des **objectifs de sécurité** avec une **présomption de
conformité** pour qui suit la norme (art. 4) et une possibilité de **solution équivalente**.
La station enseigne donc « présomption », pas « obligation », et le dit à l'écran 2.

## Objectif

L'étudiant sait dire ce qu'est la NF C 15-100 et son statut réel, lire les six objectifs de
l'arrêté, expliquer la logique du tableau et des circuits spécialisés, dire ce qu'il transmet à
l'électricien pour alimenter une PAC, un groupe ou une CTA, situer terre, liaison équipotentielle
et coupure d'urgence, et placer l'attestation de conformité (Consuel) au planning.

## Référentiel

**TP TECVC, REAC TP-00133 : CP6, CP9, CP10.**
Justification : le technicien d'études fournit au lot électricité les données d'alimentation des
équipements qu'il étudie — chauffage et eau chaude sanitaire (CP6), climatisation (CP9), centrale
de traitement d'air (CP10) — et contrôle que la pose y correspond. La station ne prétend pas
former à la conception de l'installation électrique (métier de l'électricien) : elle donne les
données d'entrée et le cadre réglementaire. Pas de codes d'attestation d'aptitude 2025 (station
non fluidique).

## Notions

- La NF C 15-100 : norme « Installations électriques à basse tension », élaborée dans le cadre de
  l'AFNOR (commission U15 « Installations électriques à basse tension », d'après Legrand),
  diffusée par AFNOR Éditions (Promotelec, dernière page).
- Trois niveaux : texte réglementaire (quoi) · norme (comment) · notice du constructeur (avec
  quel appareil).
- Statut : présomption de conformité (logement neuf, arrêté du 3 août 2016) ; réputée satisfaire
  aux prescriptions (lieux de travail, R. 4215-15) ; attestation de conformité (Consuel).
- Six règles fondamentales de l'arrêté ; tableau ; circuits spécifiques dédiés ; terre, liaison
  équipotentielle principale, coupure d'urgence.

## Déroulé des 8 écrans

| # | Titre | Illustration | Animée |
|---|---|---|---|
| 1 | Un texte, une norme, une notice | `trois-niveaux.svg` | non |
| 2 | Son statut : une présomption, pas une loi | `deux-chemins.svg` | oui (deux points, une voie après l'autre) |
| 3 | Les grands principes : personnes, biens, installation | `six-objectifs.svg` | non |
| 4 | La logique du tableau : un départ, une protection | `tableau-circuits.svg` | oui (défaut sur le circuit chauffage, seul son départ s'ouvre) |
| 5 | Les circuits spécialisés | `circuits-specialises.svg` | non |
| 6 | Alimenter une PAC, un groupe, une CTA | `alimenter-cvc.svg` | oui (points d'énergie sur deux lignes) |
| 7 | Terre, liaison équipotentielle, coupure d'urgence | `terre-liaison-coupure.svg` | non |
| 8 | Le Consuel, et le bilan | `chaine-consuel.svg` | oui (les 4 étapes s'allument) |

Les SVG sont des **pictogrammes et schémas de principe** ; aucun schéma électrique normalisé
n'a été créé (règle F. Henninot) : l'écran 7 le dit expressément.

### Contenu sourcé, écran par écran

1. **Trois niveaux** — Promotelec : « la NF C 15-100 est la seule norme connue et reconnue pour
   garantir le respect des objectifs de l'arrêté » ; le texte original « diffusé par AFNOR
   Éditions… a valeur normative ».
2. **Statut** — arrêté du 3 août 2016, art. 4 (présomption pour « le titre 10 de la norme
   NF C 15-100 de 2002, la mise à jour de 2005 … et ses amendements A1 à A5 » ; « toute autre
   norme équivalente peut être utilisée dès lors qu'elle permet d'atteindre le même niveau de
   sécurité »), art. 5 (application aux permis de construire / déclarations préalables
   postérieurs à l'entrée en vigueur, soit le 1er septembre 2016 selon Promotelec), art. 6
   (abrogation de l'arrêté du 22 octobre 1969). Code du travail R. 4215-14 (« Les références des
   normes d'installation homologuées… sont publiées au Journal officiel ») et R. 4215-15 (les
   installations « réalisées conformément aux dispositions correspondantes des normes
   d'installation… et de leurs guides d'application, sont réputées satisfaire aux prescriptions
   du présent chapitre »). Arrêté du 19 avril 2012, art. 1 : liste des normes, dont la
   NF C 15-100 (modifié par l'arrêté du 7 décembre 2020, mines et carrières).
3. **Six objectifs** — arrêté du 3 août 2016, art. 2, points 1° à 6° (contacts indirects ;
   surintensités ; circuits terminaux ; distribution ; contacts directs ; incendie). Le
   regroupement en trois familles (choc / chaleur et feu / usage) est une aide de lecture de la
   station, non un texte.
4. **Tableau** — art. 2, 4° (emplacement spécifique, tableau de répartition, coupure d'urgence,
   sectionnement à l'origine de chaque circuit, protection contre les surintensités adaptée à
   chaque circuit, protections complémentaires contre les contacts directs, parafoudre le cas
   échéant, repérage), art. 2, 5° (différentiels à haute sensibilité au plus égale à 30 mA sur
   tous les circuits terminaux du logement).
5. **Circuits spécialisés** — art. 2, 3° (« circuits spécifiques dédiés à l'alimentation de
   matériels d'utilisation spécifiques ») ; exemples de circuits dédiés : guides Legrand (chauffage
   électrique, volets roulants, cuisson, lave-linge) et schéma d'exemple de la brochure Promotelec
   (ECS thermodynamique, VMC, convecteurs). **Aucune section ni calibre repris** (voir « À sourcer »).
6. **PAC / groupe / CTA** — art. 2 (circuit dédié, sectionnement, repérage, différentiel ≤ 30 mA
   en logement) ; la protection lue sur la notice/plaque du constructeur est un principe
   professionnel (la station ne cite aucune valeur). Le partage des rôles (dimensionnement des
   conducteurs = installateur électricien) est une position pédagogique, à confirmer à la relecture
   métier.
7. **Terre / LEP / coupure d'urgence** — art. 2, 1° (prise de terre, mise à la terre, borne
   principale, conducteur principal de protection, liaison équipotentielle principale reliant les
   « éléments conducteurs », coupure automatique adaptée au schéma de liaison à la terre, liaison
   équipotentielle supplémentaire des salles d'eau) ; art. 2, 4° et 6° (coupure d'urgence de
   l'ensemble de l'installation, facilement accessible). Le rattachement des canalisations
   métalliques d'eau et de chauffage à la liaison équipotentielle est un raisonnement de la station
   à partir de la notion d'« élément conducteur » (l'arrêté ne les nomme pas).
8. **Consuel** — décret n° 72-1120 du 14 décembre 1972 modifié ; arrêté du 17 octobre 1973
   (art. 1 : attestation établie à la fin des travaux d'électricité, sur formule délivrée par un
   organisme agréé ; agrément du Consuel) ; Code de l'énergie D. 342-18 à D. 342-21 (formulaire
   Consuel SC110-26, décembre 2024 : attestation « verte » = installation de consommation à usage
   non domestique — locaux recevant des travailleurs ou du public, parties communes d'immeubles
   d'habitation, extérieur ; établie par l'installateur ou par le maître d'ouvrage qui a exécuté ou
   fait exécuter les travaux sous sa responsabilité) ; exigence avant la première mise en service
   d'une installation neuve : site du Consuel, art. D. 342-19.

## Les 4 questions et leurs corrigés

| # | Écran | Question | Bonne réponse (rang) |
|---|---|---|---|
| Q1 | 2 | Statut de la NF C 15-100 depuis 2016 pour un logement neuf | Présomption de conformité, solution équivalente possible (3e) |
| Q2 | 4 | Ce que le tableau comporte pour chaque circuit | Sectionnement à l'origine + protection surintensités adaptée (1re) |
| Q3 | 6 | Ce que l'on transmet pour alimenter une PAC | Circuit dédié + intensité/protection de la notice (4e) |
| Q4 | 8 | Qui établit l'attestation de conformité, quand | L'installateur, avant la première mise sous tension (2e) |

Leurres = erreurs de débutant : « loi votée », « norme purement volontaire », « ancien arrêté de
1969 toujours en vigueur » ; « disjoncteur de branchement seul », « protection commune », « coupure
d'urgence par circuit » ; « circuit prises existant », « section prise dans la norme sans la
notice », « calibre du chantier précédent » ; « le Consuel l'établit », « le distributeur »,
« le bureau d'études avant l'appel d'offres ». La bonne réponse n'est la plus longue dans
aucune des quatre questions ; positions 3-1-4-2.

## Correspondances

- `../elec-terre-differentiel/` — différentiel à haute sensibilité, protection des personnes.
- `../elec-proteger-un-circuit/` — sections et calibres (ce que cette station ne donne pas).
- `../elec-regimes-de-neutre/` — la coupure automatique dépend du schéma de liaison à la terre.
- `../risques-neuf-principes/` — prévention du risque à la conception.
- ÉlectroRézo (lien absolu `https://inerweb.fr/electrorezo/`) — technologie des composants ;
  `../elec-habilitation/` et `../elec-consigner/` cités dans le paragraphe de clôture.

## Sources officielles

1. **Arrêté du 3 août 2016 portant réglementation des installations électriques des bâtiments
   d'habitation** — NOR LHAL1522022A, JORF n° 0183 du 7 août 2016, art. 1 à 6, version en vigueur
   depuis le 08/08/2016 (texte consolidé consulté : art. 4 cite la NF C 15-100 de 2002, mise à
   jour 2005, amendements A1 à A5, et la NF C 14-100 de 2008, amendements A1 à A3).
   https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000032975211
2. **Code du travail, art. R. 4215-14 et R. 4215-15** (version du 02/09/2010).
   https://code.travail.gouv.fr/code-du-travail/r4215-14 · …/r4215-15
   **Arrêté du 19 avril 2012**, art. 1 (relatif aux normes d'installation des bâtiments destinés à
   recevoir des travailleurs), modifié par l'**arrêté du 7 décembre 2020**, NOR TREP2019063A,
   JORF du 9 décembre 2020, texte 4/178 (lu au JO) ; art. 1 de l'arrêté de 2012 lu sur OPPBTP
   (mise à jour du 18/07/2023) : https://content.preventionbtp.fr/legal_prevention/QmsjiefrH4VQ9frENeZj5E
3. **Consuel** — arrêté du 17 octobre 1973 (JO du 28 octobre 1973, p. 11579) :
   https://www.consuel.com/wp-content/uploads/2021/02/Arrete_17_10_73.pdf ; formulaire
   d'attestation verte SC110-26 (déc. 2024), articles D342-18 à 21 du Code de l'énergie :
   https://www.consuel.com/wp-content/uploads/2024/12/SC110_26.pdf ; site https://www.consuel.com/
4. Guides d'application (non officiels) : Promotelec, « NF C 15-100 : la réponse aux exigences
   réglementaires », brochure sur les arrêtés du 3 août 2016
   (https://www.promotelec.com/app/uploads/2023/08/Promotelec_Brochure-NFC_15-100-V2.pdf) ;
   Legrand, guide « Amendement 5 » (déc. 2016)
   (https://www.legrand.fr/sites/default/files/mm216017_guide_norme_nfc-15100_decembre2016_0.pdf).
5. Arrêté du 22 octobre 1969 (titre lu sur Légifrance, ID JORFTEXT000000272171) — abrogé.

## À sourcer (rien de ceci n'est dans la station)

- **Édition applicable aujourd'hui.** Le texte consolidé de l'arrêté du 3 août 2016 ne cite que
  la norme de 2002, la mise à jour de 2005 et les amendements A1 à A5. Des publications
  professionnelles de 2024-2025 évoquent un amendement A6 et une réorganisation de la norme ;
  **non vérifié aux textes** : quel arrêté, le cas échéant, étend la présomption ? À contrôler
  avant de citer une édition « à jour ».
- **Rénovation / logement existant** : quel texte impose quoi (l'arrêté de 2016 vise les
  bâtiments neufs) ?
- **Sections de conducteurs et calibres de protection par type de circuit**, nombre de socles,
  type de différentiel par circuit (A, F, B…), valeur de la protection d'une PAC (norme payante ;
  tableaux fabricants) : volontairement omis.
- **Sectionnement de proximité** d'une unité extérieure / d'une CTA, exigences de coupure pour
  entretien : article de la norme non consulté ; à contrôler avant de l'affirmer.
- **Coupure d'urgence de l'installation ≠ arrêt d'urgence d'une machine** (règles machines) :
  distinction utile au CVC, non sourcée ici.
- **Formulaires Consuel pour le logement** (couleur, modalités), délai de dépôt avant la mise sous
  tension, cas de pluralité d'installateurs (arrêté de 1973, art. 5 : chacun établit l'attestation
  de sa partie, visa simultané — texte de 1973, à revérifier dans sa version consolidée).
- **Tension limite du domaine BT** dans la définition de la norme (les sources consultées se
  contredisent sur 50 V/1500 V/1000 V) : non citée.
- **Vérification périodique des installations de travail** (Code du travail, arrêté de
  vérification) : hors périmètre.
