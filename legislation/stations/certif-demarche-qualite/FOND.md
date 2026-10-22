# Station « La démarche qualité d'une intervention » — FOND à valider

> Réseau Législation · sous-ligne Certifications & normes (#3730a3). Slug `certif-demarche-qualite`.
> Mini-station : 8 écrans + 4 questions. **Statut : produite le 19/10/2026, EN ATTENTE de relecture métier (`data-prototype`).** Sources consultées le 19/10/2026.
> Station générique : aucun diplôme dans le surtitre, la description ni les narrations ; codes dans « Sert notamment pour ».

## Objectif

Savoir ce qu'est une démarche qualité sur une intervention : préparer et bien faire du premier coup, le prouver avec des traces, corriger (non-conformité, réclamation, action corrective).

## Codes affichés (libellés exacts)

- **Bac Pro MFER (2028)** : S7.1 « le processus qualité » (limites de connaissances du référentiel : « amélioration continue, autocontrôles, traçabilité » ; « application des démarches qualité liées à l'intervention »).
- Écran « Préparer » : CAP IFCA T5 « Prendre connaissance et organiser les informations », T6 « Préparer, vérifier les matériels et outillages », T7 « Organiser le chantier sur site avant travaux », T8 « Sécuriser son intervention sur site » ;
  Bac Pro MFER (2028) A1T1 « Prendre connaissance des dossiers relatifs aux opérations à réaliser », A1T3 « Analyser les risques relatifs aux opérations à réaliser », A1T4 « Choisir les matériels, équipements et outillages nécessaires aux opérations à réaliser ».
  (Rapprochement ligne à ligne : choix de l'agent, à relire.)

- **Correction du 22/10 (P1)** : les codes ne sont plus que dans le bloc « Sert notamment pour » (écran 1 et écran 2 débarrassés des codes et des étiquettes). Article R. 543-79-1 : le texte lu définit deux marques, la **marque de contrôle** (contrôle d'étanchéité attesté) et la **marque de défaut d'étanchéité** (fuite non réparée tout de suite) ; les stations `fiche-intervention-bsff` et celle-ci disent maintenant les deux, dans le même sens.

## Déroulé des 8 écrans

1. La qualité sur un chantier : la boucle — `boucle-qualite.svg` (animé, goutte qui parcourt la boucle).
2. Préparer — `liste-preparation.svg`.
3. Autocontrôler — `autocontrole.svg` (animé, cases cochées une à une).
4. Prouver : quatre traces — `quatre-traces.svg` (animé).
5. La non-conformité — `non-conformite.svg`.
6. Correction, puis action corrective — `correction-et-cause.svg` (animé).
7. La réclamation du client — `reclamation-client.svg` (animé).
8. Bilan : préparer, prouver, corriger — `bilan-qualite.svg`.

8 SVG, dont 5 animés.

## Les 4 questions (bonnes réponses en position 2, 3, 4, 2)

1. Filtre déshydrateur changé : autocontrôle à ne pas oublier -> contrôle d'étanchéité avant de rendre la machine.
2. « Vous n'avez pas récupéré le fluide » : preuve -> fiche signée et pesées.
3. Fiche non signée : action corrective -> ajouter « signatures » à la liste de fin d'intervention.
4. Défaut 5 mois après la réception : par écrit, dans l'année (garantie de parfait achèvement).

## Correspondances

`../certif-garanties/`, `../fiche-intervention-bsff/`, `../tracabilite-fluides/`, `../travail-entreprise-du-froid/`.

## Sources (consultées le 19/10/2026)

- **Référentiel Bac Pro MFER**, arrêté du 28 juillet 2026, annexe III, S7.1 (`livre-mfer/referentiel/legifrance-arrete-2026-07-28-MFER.txt`) ; `BAC_MFER_2028.json`, `CAP_IFCA.json` (`HAL-v3/donnees/referentiels/peda/`).
- **AFNOR, fiche pratique QE 0045/2** « Quelles sont les différences entre une correction et une action corrective ? » (référentiels ISO 9001:2015 art. 8.7 et 10.2, ISO 14001:2015 ; modifiée le 20/03/2015) :
  https://fichespratiques.afnor.org/wp-content/uploads/2017/09/0045_FP-QE_03.2017.pdf — la correction supprime les effets, rapidement ; l'action corrective cherche la cause, agit, et son efficacité se vérifie après.
- **Non-conformité = exigence non respectée (loi, entreprise, client)** : formulation reprise d'un modèle de procédure en français (OACI) qui en donne la définition courante ; la définition de la norme ISO 9000:2015 n'est pas lisible (norme payante, site ISO fermé aux robots).
- **Code de l'environnement** : R. 543-79 (contrôle d'étanchéité renouvelé après modification) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000050813258 ; R. 543-79-1 (marque de contrôle, marque de défaut) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031775256 ; R. 543-82 (fiche signée, 5 ans) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031790617 ; R. 543-87, R. 543-88, R. 543-89 https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000050813268, …000006839321, …000006839322.
  Notice du cerfa 15497*04 : « contrôle d'étanchéité non périodique : après une réparation ou à la suite d'une ouverture du circuit en maintenance ».
- **Code civil** (consolidation du 29/07/2026) : 1353 (charge de la preuve) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032042341 ; 1792-6 (réception, parfait achèvement un an, notification écrite) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006443552.
- **Code de la consommation** : L. 612-1 (recours gratuit à un médiateur de la consommation) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032224805 ; L. 616-1 (communiquer les coordonnées du médiateur) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032224762.
- **ISO 9001** : seul le titre « Systèmes de management de la qualité — Exigences » est cité (norme payante).

## À sourcer (non affirmé)

1. **Définition ISO 9000:2015 de la non-conformité** : non lue à la source.
2. **Les cinq temps d'une réclamation** (écran 7) : démarche d'agent, rapprochée de la logique correction / action corrective ; la clause 10.2 d'ISO 9001 n'est pas lisible.
3. **Photos avant/après, bon d'intervention signé** : bonnes pratiques d'entreprise, non réglementaires (la station le dit).
4. **Registre de l'équipement** : renvoi à la station Traçabilité, dont le FOND signale l'article du règlement 2024/573 à vérifier.
5. **Autocontrôle** : défini par la station (« contrôle que l'on fait soi-même avant de présenter son travail »), pas par un texte ; la grille de CAP du fonds de Franck (« autocontrôle hors tension avant de présenter le travail ») va dans le même sens.
6. **Médiation** : concerne le client « consommateur » ; non traité pour un client professionnel.

## À vérifier par Franck

- Rapprochement des tâches T5 à T8 / A1T1, A1T3, A1T4 avec les cinq lignes de la liste de préparation.
- Exemple fictif (supermarché, Clim'Études Sud) : aucun nom réel.
