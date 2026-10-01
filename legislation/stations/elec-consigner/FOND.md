# Station « Consigner — VAT, les 4 étapes » — FOND

> Réseau Législation · sous-ligne Électrique (`elec-`, #a16207) · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions. Fond et production du 30/09/2026.
> Station `data-prototype` : en attente de relecture métier de F. Henninot.

## Ce qui fait l'intérêt de cette station

La consignation est le geste qui sépare « la machine est arrêtée » de « on peut y toucher ».
Pour un futur technicien d'études ou chargé d'affaires CVC, elle sert à trois choses :
rédiger une fiche d'intervention juste (les trois énergies d'un groupe), comprendre ce que
l'entreprise exige de son technicien (habilitation, attestation), et voir le pont avec la
DESP : le circuit frigorifique se consigne comme un circuit sous pression.

## Interprétation retenue pour « VAT, les 4 étapes » (à valider)

Le sous-titre du plan est « VAT, les 4 étapes ». L'INRS (ED 6109, § 5.1) décrit la consignation
électrique en **cinq opérations à appliquer dans l'ordre** : séparation, condamnation,
identification, VAT, mise à la terre et en court-circuit — et précise que cette dernière
**n'est pas toujours requise en basse tension** (norme NF C 18-510). La station enseigne donc
**quatre étapes qui se font toujours, jusqu'à la VAT, puis une cinquième quand elle est prescrite**.
Deux nuances de l'INRS sont reprises telles quelles : la pré-identification est une condition
(« équipement préalablement identifié ») et non une étape numérotée ; la déconsignation est
« généralement » dans l'ordre inverse (§ 5.2) mais « ne consiste pas systématiquement » à refaire
les opérations à l'envers (§ 4.1). Le brief disait « déconsignation dans l'ordre inverse » : la
station dit l'un et l'autre, avec la source de chacun.

## Référentiel — décision

**TP TECVC, REAC TP-00133 — Hors REAC : culture professionnelle du technicien et du chargé
d'affaires.** Justification : la seule compétence plausible serait CP9 « Réaliser l'étude d'une
installation de climatisation » ; or la consignation s'exécute au moment de l'intervention
(maintenance, dépannage), pas pendant l'étude, et le REAC ne la code pas (grain officiel :
activité type + compétence professionnelle). Le technicien d'études la mobilise en prescrivant
(sectionneur cadenassable, notice) et en préparant les ordres d'intervention, ce qui relève de la
culture métier et non d'une compétence évaluée. Écarter CP9 est donc plus honnête que de la
cocher « pour faire nombre ». (Le libellé de CP9 est celui de `HAL-v3/donnees/referentiels/formations.json` ; le REAC lui-même n'a pas été relu mot à mot.)

**Attestation d'aptitude 2025** : aucun code. `packs/fluides/referentiel-2025.json` a été
interrogé (consign, électri, habilit, tension) : les seuls « consigner » sont les codes 3.05,
4.09 et 5.07, qui parlent de *consigner des données dans le registre* — un homonyme, sans lien.
La station est électrique ; le volet fluide est un pont vers la DESP, pas une station fluidique.

## Objectif

À la fin de la station, l'étudiant sait dire pourquoi un arrêt ne suffit pas, enchaîner dans
l'ordre les opérations de la consignation électrique, dire qui consigne et avec quel papier,
et repérer que le fluide sous pression et les pièces mobiles se consignent aussi.

## Notions

Consignation · séparation · condamnation et signalisation · identification · vérification
d'absence de tension (VAT) · mise à la terre et en court-circuit (MALT/CCT) · dissipation ·
chargé de consignation · habilitation BC/HC · attestation de consignation · avis de fin de travail ·
déconsignation · consignation fluidique · consignation mécanique.

## Déroulé des 8 écrans

1. **Arrêté n'est pas consigné** — accidents dus au contact avec tension, fluides sous pression,
   pièces mobiles ; la victime se croit en sécurité (ED 6109, introduction). Règle du Code du
   travail : travaux hors tension (R. 4544-4), partie d'installation identifiée et consignée,
   tension rétablie seulement après déconsignation (R. 4544-5). Définition INRS de « consigner ».
   *SVG fixe `arret-pas-consigne.svg`.*
2. **Les opérations, dans l'ordre imposé** — les cinq opérations de l'INRS ; quatre + une ;
   rappel des quatre phases toutes énergies (§ 4.1). *SVG animé `ordre-des-etapes.svg`.*
3. **Séparer, condamner, identifier** — séparation certaine, amont et aval, neutre compris ;
   condamnation par blocage mécanique, moyen dédié, pancarte normalisée par l'INRS
   (CONDAMNÉ / DÉFENSE DE MANŒUVRER SANS AUTORISATION / nom, date, heure, repère) ;
   identification sur le lieu de travail. Piège : commande locale ≠ séparation (HoCourant M9).
   *SVG animé `separer-condamner.svg`.*
4. **Vérifier l'absence de tension** — VAT sur chaque conducteur actif, neutre compris, avec un
   vérificateur conçu pour cela, au lieu de travail ; voltmètre et tournevis testeur exclus ;
   contrôle du vérificateur avant et après (pratique enseignée, non lue dans une source
   publique : voir « À sourcer »). *SVG animé `verifier-absence-tension.svg`.*
5. **Mise à la terre et en court-circuit** — immédiatement après la VAT, tous conducteurs actifs,
   au plus près de la zone ; côté terre d'abord ; pas toujours requise en BT (NF C 18-510).
   *SVG animé `terre-court-circuit.svg`.*
6. **Qui, quel papier, et le retour** — habilitation obligatoire (R. 4544-9, -10), symbole C :
   BC/HC (ED 6127) ; définition du chargé de consignation ; attestation de consignation et avis
   de fin de travail ; déconsignation « généralement » dans l'ordre inverse, avec la nuance de
   § 4.1. *SVG fixe `attestation-retour.svg`.*
7. **Les autres énergies : le pont vers la DESP** — consignation fluidique (4 opérations, isolement
   renforcé par deux vannes + purge), mécanique (vent sur des pales, masse, ressort) ; ordre
   dépendant de l'analyse des risques ; pont : circuit frigorifique = équipement sous pression,
   organes de séparation et de purge prévus dès la conception, purge = récupération et non rejet.
   *SVG animé `autres-energies.svg`.*
8. **Bilan et le réflexe** — quatre idées ; réflexe : savoir qui a consigné quoi et où est la
   preuve. *SVG fixe `bilan-consignation.svg`.*

Illustrations : 8 SVG, dont **5 animés** (SMIL autonome, sans script, boucle 13-14 s, état de
repos = image finale) : écrans 2, 3, 4, 5, 7.

## Les 4 questions (une bonne réponse chacune, positions 3 · 1 · 4 · 2)

**Q1 (écran 2).** Dans quel ordre s'enchaînent les opérations d'une consignation électrique ?
Bonne réponse : séparer, condamner, identifier, VAT, puis mise à la terre si prescrite.
Leurres : identifier avant de condamner ; VAT en premier ; condamner avant de séparer.

**Q2 (écran 4).** Vérifier l'absence de tension avec un multimètre en voltmètre : valable ?
Bonne réponse : non, un voltmètre n'est pas un VAT. Leurres : « oui si étalonné » ; « oui entre
phases seulement » ; « oui si séparé et condamné avant ».

**Q3 (écran 6).** Qui peut consigner en basse tension et délivrer l'attestation ?
Bonne réponse : un chargé de consignation habilité BC, désigné par son employeur. Leurres : tout
technicien équipé ; le chargé de travaux ; le client sans habilitation.

**Q4 (écran 7).** Puissance consignée, avant de démonter l'hélice : que reste-t-il ?
Bonne réponse : les pales, que le vent peut mettre en mouvement (consignation mécanique).
Leurres : rien (électricité seule) ; seulement la pression du fluide ; rien (la pancarte suffit).

## Correspondances

- `../elec-habilitation/` (même sous-ligne) — qui a le droit de consigner : BC, l'employeur.
- `../elec-terre-differentiel/` (même sous-ligne) — terre de protection ≠ MALT de consignation.
- `../risques-neuf-principes/` (Risques professionnels) — éliminer le risque à la source.
- `../desp-en-service/` (La DESP) — circuit frigorifique = équipement sous pression.
- `../fgaz-3/` (Fluidique, cité à l'écran 7) — le fluide se récupère.
- https://inerweb.fr/hocourant/ — module M9 « Mettre en sécurité : la consignation ».

## Sources officielles (consultées le 30/09/2026)

1. **INRS, brochure ED 6109 « Consignations et déconsignations »**, 3e éd., octobre 2020 —
   https://www.inrs.fr/media.html?refINRS=ED%206109 (PDF : https://www.inrs.fr/dam/inrs/CataloguePapier/ED/TI-ED-6109.pdf).
   Lue en entier : § 2 définitions ; § 3 conception ; § 4.1 procédures (quatre phases, VAT
   « opération sur installation sous tension », déconsignation non systématiquement inverse) ;
   § 4.2 organisation ; § 5.1 consignation électrique (cinq opérations, note 4 sur la MALT en
   BT) ; § 5.2 déconsignation électrique ; § 6.1–6.2 fluidique ; § 7.1–7.2 mécanique.
2. **INRS, brochure ED 6127 « L'habilitation électrique »**, 3e éd., décembre 2020 —
   https://www.inrs.fr/media.html?refINRS=ED%206127 . Lue : § 2.3 symboles d'habilitation
   (2e caractère C : consignation ; BC, HC), modules de formation 7 à 9 (attestation de
   consignation en une ou deux étapes, attestation de première étape, avis de fin de travail).
   *La référence ED 6127 donnée dans le brief est bien celle de l'habilitation, non de la
   consignation : c'est l'ED 6109 qui traite de la consignation ; les deux sont citées.*
3. **Code du travail** — art. R. 4544-3 (normes homologuées), R. 4544-4 (travaux hors tension
   sauf danger ou impossibilité technique), R. 4544-5 (partie d'installation identifiée et
   consignée ; tension rétablie après déconsignation), R. 4544-9 (habilitation), R. 4544-10
   (habilitation, formation), versions lues sur https://code.travail.gouv.fr/code-du-travail/r4544-5
   (et -3, -4, -9, -10) ; textes consolidés sur https://www.legifrance.gouv.fr (LEGITEXT000006072050).
4. **Arrêté du 5 juillet 2024** relatif aux normes de prévention du risque électrique : références
   recommandées au titre de R. 4544-3 — NF C 18-510 (janvier 2012), NF C 18-510/A1 (février 2020).
   Lu via la fiche OPPBTP de l'article 1er, à relire sur Légifrance avant publication.

Sources internes : HoCourant, modules M3 et M9 (piège de la commande locale ; contrôle du VAT
avant/après ; documents) ; pack HabFluide, planche « consignation en cinq étapes ».
Aucune valeur numérique n'entre dans la station.

## À sourcer

- **Contrôle du vérificateur avant et après la VAT** : prescrit par NF C 18-510 / NF EN 61243-3
  (normes payantes, non lues). Enseigné comme pratique (HoCourant), à confirmer par la norme.
- **Cas où la MALT/CCT est requise en basse tension** : renvoyé à NF C 18-510 (payante), non détaillé.
- **Texte exact de R. 4544-9 et R. 4544-10** : lus via un résumé de code.travail.gouv.fr ; R. 4544-10
  a été modifié pour l'attestation médicale (1er octobre 2025) : relire sur Légifrance.
- **Modèle et contenu de l'attestation de consignation** (une ou deux étapes) : défini par la norme ;
  l'arrêté attendu par R. 4544-22 vise les travaux d'ordre non électrique dans l'environnement
  d'ouvrages, il n'est pas repris ici.
- **Interdiction de rejet du fluide frigorigène** (« la purge se récupère », écran 7) : article
  exact du règlement (UE) 2024/573 à citer ; la station ne donne aucun numéro.
- **Définition normative de BC / HC et limites d'habilitation** : à lire dans NF C 18-510.
- **Correspondance CP TECVC** : REAC TP-00133 non relu mot à mot (libellés pris dans `formations.json`).
- **Voix** : les 12 narrations n'ont pas encore leur MP3 (edge-tts) ; la voix du navigateur parle.
