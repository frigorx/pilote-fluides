# Station « RGE & QualiPAC » — FOND à valider

> Réseau Législation · sous-ligne Certifications & normes · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions. Sous-titre du plan : « les qualifications ».
> **Statut : station produite le 30/09/2026, EN ATTENTE de relecture métier (F. Henninot).**
> Gabarit : `stations/aptitude-capacite/`. Accent de la sous-ligne : `#3730a3`.
> **Aucun montant d'aide, aucune valeur non lue dans une source officielle.**

## Ce qui fait l'intérêt de cette station

Le client ne perd pas l'aide parce que les travaux sont mal faits : il la perd parce que
**l'entreprise n'avait pas la bonne mention pour ces travaux**. C'est la lecture que le
technicien d'études et le chargé d'affaires doivent avoir : la mention RGE n'est pas un
label d'image, c'est une **condition d'ouverture de l'aide** (écoconditionnalité), qui se
vérifie à un moment précis, par domaine, sur un annuaire public.

## Objectif

À la fin de la station, l'étudiant sait : (1) dire pourquoi l'aide dépend de l'entreprise ;
(2) distinguer qualification et certification et nommer les organismes ; (3) dire à quel moment
on exige le RGE selon l'aide, et que « en cours de qualification » ne compte pas ;
(4) situer QualiPAC parmi les signes de qualité ; (5) énumérer ce que l'entreprise doit tenir ;
(6) décrire l'audit de chantier ; (7) vérifier un professionnel dans l'annuaire officiel ;
(8) ne pas confondre RGE, attestation de capacité et attestation d'aptitude.

## Référentiel

TP TECVC, REAC TP-00133 — **hors REAC : culture professionnelle du technicien et du chargé
d'affaires.** Aucune des compétences CP1 à CP10 ne porte sur la qualification des entreprises
(CP6 chauffage/ECS et CP9 climatisation étudient l'installation, pas le signe de qualité de
celui qui la pose). Pont avec l'attestation d'aptitude 2025 : **code 1.00** (législation
applicable), parce que l'écran 8 distingue le RGE des deux attestations fluides.

## Les 8 écrans

1. **L'écoconditionnalité : l'aide s'ouvre avec l'entreprise** — citation service-public.gouv.fr ;
   aides concernées (MaPrimeRénov', éco-PTZ, CEE) ; exception réseau de chaleur/froid.
   *Animé* : le client demande, la mention RGE s'allume, la porte de l'aide s'ouvre.
   `svg/aide-qui-souvre.svg`
2. **Le RGE : une mention, plusieurs organismes** — reconnaissance pouvoirs publics/ADEME ;
   qualification (Qualibat, Qualit'EnR, Qualifelec) vs certification (Certibat, Cerqual) ;
   mention attachée à l'établissement (SIRET). `svg/qui-delivre-rge.svg`
3. **Quand faut-il être RGE ?** — moment d'exigence par aide ; « en cours de qualification »
   ne compte pas ; qualification probatoire de deux ans. *Animé* : les repères apparaissent
   un à un. `svg/quand-etre-rge.svg`
4. **QualiPAC et les autres signes de qualité** — Qualisol, QualiPV, Qualibois, QualiPAC,
   Chauffage +, Ventilation + ; la qualification est propre à un domaine.
   `svg/signes-de-qualite.svg`
5. **Ce que l'entreprise doit tenir** — responsable technique formé, sous-traitant RGE dans le
   même domaine, charte QualiPAC (10 points, résumés en 6 gestes + après-chantier).
   `svg/ce-que-l-entreprise-tient.svg`
6. **L'audit de chantier : le RGE se contrôle** — 4 ans avec suivi annuel, audits de
   réalisation, points contrôlés, catégories critiques (dont PAC), défaut majeur.
   *Animé* : les sept lignes se cochent. `svg/audit-de-chantier.svg`
7. **Vérifier un professionnel : l'annuaire officiel** — france-renov.gouv.fr/annuaire-rge ;
   établissement, activité listée = travaux prévus ; radiation ; signalement.
   *Animé* : recherche puis fiche puis coche. `svg/annuaire-officiel.svg`
8. **Bilan : RGE, capacité, aptitude — ne pas confondre** — pont vers `../aptitude-capacite/`.
   `svg/trois-papiers.svg`

Quatre SVG animés (SMIL autonome, boucle 13 s, état au repos = image finale) : écrans 1, 3, 6, 7.

## Les 4 questions (quiz) — bonnes réponses en position 3, 1, 4, 2

- **Q1 (écran 3)** — « RGE en cours de qualification » : peut-on compter sur l'aide ? →
  **Non : il faut le certificat portant le logo RGE.** (ADEME, fiche questions/réponses.)
- **Q2 (écran 4)** — qualifiée pour le bois, elle propose une PAC : RGE ? → **Non : la
  qualification est propre à un domaine.** (ADEME : les qualifications portent sur des travaux bien
  précis ; France Rénov' : la qualification doit correspondre aux travaux envisagés.)
- **Q3 (écran 6)** — que contrôle l'auditeur ? → **Cohérence devis / facture / travaux réalisés.**
- **Q4 (écran 7)** — bon réflexe avant de signer ? → **L'annuaire officiel, activité comprise.**

## Correspondances

- `../thermique-cee/` — les CEE exigent une entreprise RGE (engagement de l'opération).
- `../aptitude-capacite/` — l'autre paire de papiers (personne / entreprise, fluides).
- `../certif-garanties/` — la charte QualiPAC engage sur les garanties légales (point 1) et
  sur la garantie de bon fonctionnement (point 9).
- `../thermique-dpe/` — DPE et audit énergétique en amont ; « RGE Études » (audit énergétique).

## Sources officielles (consultées le 30/09/2026)

Textes lus **par l'intermédiaire des pages officielles qui les citent** : Légifrance n'a pas pu
être lu directement (protection anti-robot de la plateforme, non contournée — voir « À sourcer »).

1. **service-public.gouv.fr** — fiche « MaPrimeRénov' (MPR) », F35083, vérifiée le 01/09/2026 :
   « Vos travaux et prestations doivent être réalisés par un professionnel reconnu garant de
   l'environnement (RGE). » (parcours par geste) ; exception : le choix d'un professionnel RGE n'est
   pas exigé pour le raccordement à un réseau de chaleur ou de froid.
   https://www.service-public.gouv.fr/particuliers/vosdroits/F35083
2. **ecologie.gouv.fr** — « Le label "reconnu garant de l'environnement" RGE », publié le 25/02/2021,
   mis à jour le 11/06/2025 : écoconditionnalité (« Le label RGE permet d'assurer l'éco-conditionnalité
   des aides à la rénovation énergétique ») ; aides citées (MaPrimeRénov', éco-PTZ, CEE, crédit d'impôt
   rénovation TPE-PME) ; organismes de qualification (Qualibat, Qualit'EnR, Qualifelec) et de
   certification (Certibat, Cerqual) ; responsable technique formé ; label de 4 ans avec suivi annuel ;
   audits de réalisation ; catégories critiques à contrôle renforcé depuis le 01/01/2021 (dont pompes à
   chaleur) ; textes cités : décret n° 2014-812 du 16/07/2014, arrêté du 01/12/2015, arrêtés du
   17/03/2025 (connaissances des responsables techniques, à partir du 01/10/2025).
   https://www.ecologie.gouv.fr/politiques-publiques/label-reconnu-garant-lenvironnement-rge
3. **ADEME** — fiche « La mention RGE : questions/réponses » (réglementation, mars 2025) :
   qualification vs certification ; mention attachée à l'établissement (SIRET) ; « RGE en cours de
   qualification » non utilisable ; moment d'exigence par aide (éco-PTZ : signature du formulaire
   correspondant au devis ; CEE : engagement de l'opération, le plus souvent la signature du devis ;
   MaPrimeRénov' : signature du devis et réalisation des travaux) ; qualification probatoire limitée à
   deux ans ; un responsable technique par qualification ; sous-traitant RGE dans le même domaine ;
   points de contrôle d'un chantier ; annuaire alimenté par les organismes.
   https://librairie.ademe.fr/ged/4595/EXE_ADEME_Fiche-A4-RGE-QuestionReponses_MAJmars2025.pdf
4. **France Rénov'** — annuaire officiel des professionnels RGE : « pour bénéficier de MaPrimeRénov',
   il est obligatoire de confier ses travaux à un professionnel RGE » ; formulaire de signalement ;
   « les administrations ne démarchent pas pour les travaux ».
   https://france-renov.gouv.fr/annuaire-rge
5. **Qualit'EnR** — page « Découvrir nos qualifications RGE » (Qualisol, QualiPV, Qualibois, QualiPAC,
   Chauffage +, Ventilation +) ; organisme encadré par la norme NF X 50-091 (indépendance, comité de
   décision collégial). https://www.qualit-enr.org/decouvrir-nos-qualifications-rge/
6. **Qualit'EnR** — Charte qualité QualiPAC, DG-APP-09, Rev 05 (octobre 2025) : les 10 points.
   https://www.qualit-enr.org/wp-content/uploads/2026/01/DG-APP-09-Charte-qualite-QualiPAC-Rev05-Octobre-2025-2026.pdf
7. **BOFiP** (archive, BOI-IR-RICI-280-20-30, version du 22/04/2015) : origine du mécanisme dans le
   crédit d'impôt (article 200 quater du CGI, décret n° 2014-812) — utilisé uniquement pour
   l'historique, non enseigné à l'écran.
   https://bofip.impots.gouv.fr/node/17835
8. **Interne** : `packs/fluides/referentiel-2025.json` (arrêté du 21/11/2025) et la station
   `aptitude-capacite` pour l'écran 8 (aptitude = personne, capacité = entreprise, maintien tous les 7 ans).

## Vérification de la doctrine

- Aucun montant d'aide, aucun plafond, aucun taux.
- Chiffres présents, tous lus : 4 ans (durée du label) et suivi annuel ; 2 ans (qualification
  probatoire) ; 10 points (charte QualiPAC) ; 2006 (création de Qualit'EnR) ; 7 ans (maintien de
  l'aptitude, station voisine) ; 01/01/2021 (réforme, catégories critiques) ; 01/09/2026 (date de
  vérification de la fiche service-public).
- Le pourcentage de sous-traitance admis (fixé par chaque organisme) n'est pas repris : il varie.

## ⚠️ À sourcer (non affirmé dans la station)

1. **Texte de loi / arrêté lu sur Légifrance** : article exact qui pose l'obligation RGE pour
   MaPrimeRénov' (arrêté du 17/11/2020 modifié ? article du CCH ?), et texte consolidé de l'arrêté du
   01/12/2015 modifié par ceux du 17/03/2025. La station cite donc les fiches officielles
   (service-public, ministère, ADEME), pas l'article. Légifrance bloque la lecture automatique.
2. **Décret n° 2026-774 du 12/08/2026** : un résultat de recherche le présente comme modifiant le décret
   n° 2014-812 (sous-traitance : l'entreprise principale devrait elle-même détenir un signe de qualité
   correspondant à l'opération). **Non lu à la source, non repris.** À vérifier avant toute affirmation
   sur la sous-traitance, dont l'écran 5 ne dit que ce que la fiche ADEME de mars 2025 dit.
3. **Types de pompes à chaleur ouvrant droit à chaque aide** (air/air, air/eau, géothermie,
   chauffe-eau thermodynamique) : dépend des critères techniques de chaque aide. Non affirmé.
4. **Qualifications RGE des autres organismes pour les PAC** (nom exact chez Qualibat, Qualifelec) :
   la station dit seulement que d'autres organismes délivrent des mentions RGE et renvoie à l'annuaire.
5. **Recharge Elec + / QualiPV module bâtiment** : Qualit'EnR précise qu'ils sont hors mention RGE ;
   volontairement absents de l'illustration des signes.
6. **Contenu du référentiel de qualification QualiPAC** (heures de formation, programme du responsable
   technique) : non publié dans les pages lues.
7. **Voix** : les 12 narrations sont à fabriquer (edge-tts) ; le HTML est prêt.
