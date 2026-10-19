# Station « Les papiers du chantier : pièces et autorisations » — FOND à valider

> Réseau Législation · sous-ligne Risques professionnels (#c2410c) · slug `risques-papiers-chantier`.
> Mini-station ≤ 10 min : 8 écrans + 4 questions. **Public : CAP IFCA et Bac Pro MFER** (le réseau est né au niveau BTS : texte plus simple, phrases courtes).
> **Statut : Prototype, fabriquée le 19/10/2026, EN ATTENTE de la relecture et du feu vert de F. Henninot** (`data-prototype` posé).
> Demande de Franck (19/10/2026) : « Préparer les conditions d'intervention sur site : si c'est de la paperasse, une station spécifique pour les autorisations. »
> Ligne maison : les mécanismes s'apprennent ; toute valeur non lue dans un texte officiel est omise et listée sous « À sourcer ».
> **Les cellules « qui remplit / qui signe / où il va » sont, pour les papiers non réglementaires (devis, ordre de service, bon, fiche de mise en service, DOE), des pratiques de chantier à valider par Franck** : voir « À sourcer ».

## Objectif

À la fin de la station, l'élève sait classer les papiers d'un chantier en trois temps (avant, pendant, après) et dire pour chacun qui le remplit, qui le signe, où il va ; il sait pourquoi on ne commence pas avant que les papiers de l'avant soient signés.

## Référentiel (codes affichés sous l'objectif et dans `mission.json`)

Libellés exacts repris de `HAL-v3/donnees/referentiels/peda/`.

- **CAP IFCA** : savoir **S1.2** « Pièces et autorisations administratives » · compétence **C2.3** « Préparer les conditions d'intervention sur site ».
- **Bac Pro MFER (2028)** : savoirs **S1.4** « les procédures administratives » et **S1.3** « les étapes d'une intervention » · tâche **A1T1** « Prendre connaissance des dossiers relatifs aux opérations à réaliser ».
- **Origine du réseau** : TP TECVC, REAC TP-00133 — hors REAC. **Attestation d'aptitude 2025** : **1.00** (législation applicable), **4.09** et **5.07** (consigner dans le registre de l'équipement).

## Déroulé des 8 écrans (8 SVG, dont 7 animés en SMIL)

1. **Trois temps, un dossier** — `svg/trois-temps.svg`
2. **Avant (1) : le contrat — devis signé, ordre de service** — `svg/devis-ordre.svg`
3. **Avant (2) : la sécurité du site** — `svg/securite-du-site.svg`
4. **Avant (3) : les autorisations** — `svg/autorisations.svg`
5. **Pendant : le bon et la fiche d’intervention** — `svg/bon-et-fiche.svg`
6. **Après (1) : la réception et la mise en service** — `svg/reception-mise-en-service.svg`
7. **Après (2) : le BSFF, le DOE et le registre** — `svg/bsff-doe-registre.svg`
8. **Bilan : ma check-list** — `svg/bilan-papiers.svg`

Les écrans 2 à 7 portent un **tableau visuel** (le papier · qui le remplit · qui le signe · où il va) fabriqué depuis une source unique avec son texte alternatif et la liste de l'écran 8 : l'image, l'alt et le bilan ne peuvent pas se contredire. L'écran 8 (fixe) est une check-list de six lignes.

## Les 15 papiers (source unique)

| Papier | Qui le remplit | Qui le signe | Où il va |
|---|---|---|---|
| Devis signé | l'entreprise | le client | chez le client et au dossier du chantier |
| Ordre de service | le maître d'œuvre | le maître d'œuvre | à l'entreprise, au dossier du chantier |
| Plan de prévention | les deux chefs d'entreprise | les deux chefs d'entreprise | chacun garde un exemplaire |
| PPSPS | votre entreprise | son chef d'entreprise | au coordonnateur SPS |
| Protocole de sécurité | les deux entreprises | les deux entreprises | chacune garde un exemplaire |
| Permis de feu | l'employeur ou son représentant | l'employeur, le responsable d'intervention, le technicien | un exemplaire à chaque signataire |
| Autorisation de travail | le chargé de travaux | le chargé de travaux et l'exécutant | un exemplaire à chacun |
| Attestation de consignation | le chargé de consignation | le chargé de consignation | au chargé de travaux |
| Bon d'intervention | le technicien | le client, en fin de visite | copie au client, original à l'entreprise |
| Fiche d'intervention Cerfa 15497 | l'opérateur (l'entreprise attestée) | l'opérateur, et le détenteur au-delà du seuil de charge | l'original au détenteur, une copie à l'opérateur |
| Procès-verbal de réception | le client et l'entreprise | le client et l'entreprise | un exemplaire pour chacun |
| Fiche de mise en service | le technicien | le technicien et le client | au dossier de l'installation |
| BSFF (bordereau) | l'émetteur du fluide récupéré | l'émetteur, le transporteur, la destination | dans Trackdéchets |
| DOE (dossier des ouvrages exécutés) | l'entreprise | selon le marché | au maître d'ouvrage |
| Registre de l'équipement | l'exploitant, avec vos données | pas de signature type | avec la machine, tenu à jour |

## Les 4 questions et corrigés

**Q1 (écran 3).** Votre entreprise travaille 400 heures sur 12 mois dans un restaurant qui reste ouvert. Quel écrit faut-il avant de commencer ?
- a) Le BSFF
- b) Le plan de prévention ✔
- c) Le procès-verbal de réception
- d) Le bon d'intervention
*Explication : Quand des entreprises extérieures travaillent 400 heures ou plus sur 12 mois, le plan de prévention doit être écrit avant le début des travaux (art. R. 4512-7). Il l'est aussi pour certains travaux dangereux, quelle que soit la durée.*

**Q2 (écran 4).** Vous allez braser un tube de cuivre chez un client. Quel papier faut-il avant de sortir le chalumeau ?
- a) Le permis de feu ✔
- b) La fiche d'intervention Cerfa 15497
- c) L'attestation de consignation
- d) Le bon d'intervention
*Explication : Le brasage est un travail par point chaud : le permis de feu est obligatoire et signé avant de commencer (INRS). La fiche d'intervention se remplit pendant ou après, pour le fluide ; l'attestation de consignation concerne la mise en sécurité de l'installation.*

**Q3 (écran 5).** Quand faut-il remplir une fiche d'intervention Cerfa 15497 ?
- a) Seulement à la mise en service de la machine
- b) Seulement quand une fuite est constatée
- c) Pour chaque opération qui manipule du fluide frigorigène ✔
- d) Seulement chez un particulier, pas chez un professionnel
*Explication : L'opérateur établit une fiche pour chaque opération qui manipule du fluide frigorigène (art. R. 543-82) : pas seulement à la mise en service, pas seulement en cas de fuite, chez un particulier comme chez un professionnel.*

**Q4 (écran 6).** Quel papier donne la date de départ des garanties ?
- a) Le devis signé
- b) L'ordre de service
- c) La fiche de mise en service
- d) Le procès-verbal de réception ✔
*Explication : La réception est l'acte par lequel le client accepte l'ouvrage, avec ou sans réserves. La date du procès-verbal est le point de départ des garanties (art. 1792-6 du Code civil et station « Les garanties »).*

Bonnes réponses en positions 2, 1, 3, 4 ; aucune n'est la plus longue de façon systématique.

## Correspondances (liens réels)

`../acteurs-installation/` · `../risques-duerp/` · `../incendie-permis-de-feu/` (stations sœurs du même lot) · `../tracabilite-fluides/` · `../elec-consigner/` · `../certif-garanties/` · `../aptitude-capacite/` · JouéRézo `https://inerweb.fr/jouerezo/`.

## Ce qui vient du fonds de Franck (restructuré, rien recopié)

RAG de HAL (`chercher-rag.js`, 19/10/2026) : `Synthèse prévention sur le chantier.odt` (PGC, PPSPS, plan de prévention), `TD 03 - PPSPS et Plan de prévention`, `Modele_Permis_Feu_Nov2020.pdf` (CDG45) et `PERMIS FEUX INTREACTIF.pdf` (formulaire INRS ED 6030), `Autorisation travail.pdf` (03_BAC-MFER/Collegues-Partages : modèle d'autorisation de travail), livre HoCourant M9 « Les documents qui tracent la sécurité » (attestation de consignation, autorisation de travail, avis de fin de travail), `Dossier des Ouvrages Exécutés.docx` (DOE), station `certif-garanties` et station `tracabilite-fluides` (fiche d'intervention, registre, BSFF).

## Sources (consultées le 19/10/2026)

- **Code du travail** (code.travail.gouv.fr) : **R. 4511-1** (entreprise extérieure : celle qui fait intervenir ses travailleurs dans l'établissement d'une autre) ; **R. 4512-6** (analyse des risques en commun par les chefs de l'entreprise utilisatrice et des entreprises extérieures, à partir de l'inspection commune préalable ; plan de prévention) ; **R. 4512-7** (plan de prévention écrit : au moins 400 heures sur une période inférieure ou égale à 12 mois, ou travaux dangereux de la liste fixée par arrêté) ; **R. 4512-8** (contenu minimal du plan : phases dangereuses, matériel, consignes, secours, coordination) ; **R. 4512-15** (information des travailleurs avant le début des travaux : dangers, zones dangereuses, accès) ; **R. 4515-4** (protocole de sécurité pour le chargement et le déchargement, qui remplace le plan de prévention) ; **R. 4515-5** (contenu : informations utiles à l'évaluation des risques de l'opération et précautions à chaque temps). URLs : https://code.travail.gouv.fr/code-du-travail/r4512-7 (et r4512-6, r4512-8, r4512-15, r4511-1, r4515-4, r4515-5).
- **INRS, « Le permis de feu — démarche et document support », ED 6030, 2^e édition, juin 2018** (copie du fonds : `05_Ressources-Partagees/Securite-Risques/ed6030INRS PERMIS DE FEUX.pdf`) : obligatoire pour tous travaux par points chauds ; établi par l'employeur ou son représentant ; validé par les acteurs de l'entreprise utilisatrice et par le responsable d'intervention ; chaque signataire a une copie. https://www.inrs.fr (réf. ED 6030).
- **INRS, « Cadre réglementaire de la coordination de sécurité »** — https://www.inrs.fr/metiers/btp/coordination-sps/reglementation.html : PGC (coordonnateur), PPSPS (entreprise), registre-journal, DIUO.
- **Code de l'environnement, R. 543-82** (fiche d'intervention) — https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031790617 ; **arrêté du 29/02/2016, art. 11** (Cerfa 15497) et **arrêté du 26/07/2022** (BSFF dans Trackdéchets, trois signataires) : repris du FOND de la station `tracabilite-fluides` (lus sur Légifrance le 30/09/2026).
- **Code civil, art. 1792-6** (réception) et **Code des assurances, L. 243-2** (attestation d'assurance jointe aux devis et factures) : repris du FOND de la station `certif-garanties` (lus sur Légifrance).
- Registre de l'équipement « tenu par l'exploitant » (règlement (UE) 2024/573) : repris de la station `tracabilite-fluides` ; **article exact non lu**.

## À sourcer (rien de ceci n'est affirmé comme texte officiel dans la station)

1. **Qui signe le plan de prévention** : le Code (R. 4512-6 et suivants lus) dit que les chefs d'entreprise font l'analyse des risques en commun et définissent les mesures ; l'exigence de signature n'est pas lue. La cellule « les deux chefs d'entreprise » est une pratique.
2. **Protocole de sécurité** : qui l'établit : non lu (R. 4515-4 et R. 4515-5 ne le disent pas dans l'extrait). La cellule « les deux entreprises » est une pratique à confirmer.
3. **Articulation plan de prévention / PPSPS** : texte excluant le plan de prévention sur un chantier de bâtiment soumis à coordination SPS : non lu. La station dit « selon le lieu » sans trancher la frontière.
4. **Arrêté du 19/03/1993** (liste des travaux dangereux) : non lu en entier ; la station ne dit pas que les travaux par points chauds y figurent.
5. **Ordre de service** : définition (CCAG Travaux 2021) et émetteur (le maître d'œuvre) : non lus ; description d'usage.
6. **Devis** : contenu et obligations d'information (Code de la consommation, Code de la commande publique) : non écrits.
7. **Bon d'intervention** et **fiche de mise en service** : pratiques d'entreprise, aucun modèle réglementaire lu. Pour la mise en service d'un équipement sous pression, voir la station DESP « En service ».
8. **DOE** : le fonds indique une obligation « loi 40 du CCAG Travaux » : référence non vérifiée ; la station dit « selon le marché ».
9. **Permis de feu** : la base juridique exacte de l'obligation (l'INRS écrit « obligatoire ») : non lue ; la station cite l'INRS.
10. **Autorisation de travail** : qui l'établit : repris du modèle du fonds (validation du chargé de travaux et de l'exécutant) ; la norme (NF C 18-510) est payante, non citée.
11. **Attestation de consignation** : texte d'origine non lu ; repris du livre HoCourant M9 (cours de Franck).
12. **Seuil de la fiche d'intervention** : écrit à l'écran 5 (5 tonnes équivalent CO₂ de HFC ou de PFC, ou 3 kg de HCFC ; art. R. 543-82, lu sur Légifrance le 19/10/2026). L'article renvoie au règlement (UE) n° 517/2014, abrogé : vérifier la version en vigueur.
13. **Durée de conservation** du BSFF et du DOE : non écrites. Conservation du permis de feu (5 ans, recommandée par l'INRS) : traitée dans la station « Le permis de feu ».
14. **R. 4512-15** : formulation lue dans un extrait (information par le chef de l'entreprise extérieure) : à relire sur Légifrance.

## Défaut connu

- Pas de MP3 fabriqué : la voix du navigateur sert de filet (lot Piper à lancer après le feu vert).
- Le jeu de rangement (« avant, pendant, après ») n'existe pas encore dans JouéRézo : renvoi à l'accueil du site seulement.
