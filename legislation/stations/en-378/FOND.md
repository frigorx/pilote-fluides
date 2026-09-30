# Station « NF EN 378 — classes, charges maxi » — FOND

> Réseau Législation · sous-ligne Fluidique & thermique · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions. Accent de la sous-ligne : **#0f766e**.
> **Statut : station produite le 30/09/2026, `data-prototype` posé, en attente de relecture métier.**
>
> ⚠️ **La norme est payante.** Cette station n'en cite que l'objet, la structure et ce qui est
> public. **Aucune valeur de charge, aucune fraction de limite d'inflammabilité, aucune formule
> chiffrée** n'y figure : la limite se calcule dans l'édition en vigueur de la norme. Tout ce
> qui manque est listé sous « À sourcer ».

## Objectif

À la fin de la station, l'étudiant de BTS sait lire la classe de sécurité d'un fluide (ISO 817),
qualifier un local (catégorie d'accès a, b, c) et un emplacement (système direct / indirect,
salle des machines), expliquer **pourquoi la charge est limitée** (concentration = masse ÷ volume),
et dérouler la démarche du technicien d'études : classe, accès, emplacement, puis charge contre
limite. Il sait que **le R290 est A3, pas A2L**.

## Référentiel

- **TP TECVC, REAC TP-00133 : CP9 (climatisation).** Le technicien d'études qui étudie une
  installation de climatisation doit choisir un fluide et un emplacement compatibles avec la
  charge admissible du local : c'est la matière de la station.
- **Attestation d'aptitude 2025** (`packs/fluides/referentiel-2025.json`, arrêté du
  21 novembre 2025, annexe II) :
  - **1.07** — caractéristiques des hydrocarbures, du CO₂ et du NH₃ face aux fluorés ;
  - **1.08** — combustibilité, propagation des flammes, restrictions de capacité de charge,
    limites d'occupation ;
  - **11.03** — réglementations et normes de sécurité pour fluides inflammables, toxiques ou à
    haute pression (et conditions de site dérogeant à l'annexe IV du règlement 2024/573) ;
  - **12.02** — sécurité des outils et équipements : détection de gaz, ventilation, EPI (A1/A2) ;
  - **12.03** — calculer la charge de réfrigérant inflammable selon les normes de sécurité.

## Notions

Norme volontaire et payante, quatre parties · classes de sécurité ISO 817 (lettre = toxicité,
chiffre = inflammabilité) · sous-classe 2L (introduite dans la NF EN 378 en 2016) · piège R290 = A3 ·
catégories d'accès a / b / c · classement par emplacement (classes I à IV) · système direct /
indirect · salle des machines · concentration = masse ÷ volume · limite de concentration, charge
maximale · détection et ventilation comme filet · ordre des barrières · lien ERP (article CH 35).

## Déroulé des 8 écrans

| Écran | Titre | Illustration (`svg/`) | Animée |
|---|---|---|---|
| 1 | Une norme en quatre parties, pas une loi | `quatre-parties.svg` | non |
| 2 | Deux lettres, deux dangers : la classe de sécurité | `classes-iso817.svg` | **oui** |
| 3 | Le piège : le R290 est A3, pas A2L | `piege-r290.svg` | **oui** |
| 4 | Qui a accès au local : les catégories a, b et c | `categories-acces.svg` | non |
| 5 | Où est le fluide : l'emplacement du système | `emplacement.svg` | non |
| 6 | Pourquoi la charge est limitée | `charge-volume.svg` | **oui** |
| 7 | Détection et ventilation : le filet, pas la première barrière | `detection-ventilation.svg` | **oui** |
| 8 | La démarche du technicien d'études — et le bilan | `demarche-technicien.svg` | non |

**Écran 1.** La NF EN 378 (*Systèmes frigorifiques et pompes à chaleur — exigences de sécurité et
d'environnement*) comporte quatre parties : 1 bases (définitions, classification, critères de
choix) · 2 conception (construction, essais, marquage, documentation) · 3 installation sur site et
protection des personnes · 4 fonctionnement, maintenance, réparation, récupération. Ce n'est pas
une loi : elle s'impose quand un texte ou un contrat s'y réfère. La partie 2 est harmonisée avec
la directive équipements sous pression et la directive machines ; le règlement de sécurité ERP
(article CH 35 de l'arrêté du 25 juin 1980) s'appuie sur la classification de la partie 1.

**Écran 2.** Classes ISO 817 : A faible toxicité, B plus élevée ; 1 pas de propagation de flamme,
2L faiblement inflammable, 2 inflammable, 3 très inflammable. Exemples : A1 (R134a, R410A, R744),
A2L (R32, R1234yf), A2 (R152a), A3 (R290, R600a), B1 (R123), B2L (R717) ; B2 et B3 sans exemple
courant. La classe se lit dans les tables à jour.

**Écran 3.** R290 = propane = hydrocarbure pur = **A3**. R32 et HFO (R1234yf) = A2L. Confondre les
deux, c'est se tromper de limite de charge, de zone et de matériel.

**Écran 4.** Catégorie d'accès (ex-« catégorie d'occupation » de la version 2008) : **a** accès
général (n'importe qui, sans connaître les consignes), **b** accès surveillé (nombre limité de
personnes, certaines connaissent les consignes générales), **c** accès autorisé (personnes
autorisées, formées aux consignes générales et particulières). Plus le public est large et non
averti, plus la limite de charge est sévère.

**Écran 5.** Classement par emplacement (I à IV) : la classe III désigne un système entièrement en
salle des machines ou à l'extérieur, compatible avec un lieu d'accès général. Système direct (le
fluide va dans l'espace occupé) / indirect (fluide confiné, eau du circuit secondaire). Levier du
concepteur : éloigner le fluide des occupants.

**Écran 6.** Concentration = masse de fluide ÷ volume du local. Limite fondée sur la toxicité ou le
manque d'oxygène (fluides non inflammables), sur la limite inférieure d'inflammabilité (fluides
inflammables). Trois entrées : classe, catégorie d'accès, emplacement, plus la taille du local.
ERP : l'article CH 35 limite la charge d'un fluide inflammable selon la surface du local. La charge
se calcule, elle ne s'estime jamais.

**Écran 7.** Chaîne : fuite → détecteur (seuil d'alarme) → alarme, ventilation renforcée, mise hors
tension → retour sous le seuil. Ordre des barrières : 1 limiter les points de fuite, 2 ventiler en
continu, 3 matériel adapté. La détection est un filet, pas une barrière de base ; en ERP, CH 35
admet détection + extraction mécanique pour lever certaines limites. Partie 3 : analyse des zones
à risque d'explosion en salle des machines pour A2L, A2, A3, B2L, B2, B3 (lien station ATEX).

**Écran 8.** Logigramme : classe → accès → emplacement → charge ≤ limite calculée ? oui : retenir
et documenter ; non : cinq leviers (réduire la charge, changer l'emplacement, passer en
indirect, détection + ventilation, changer de fluide). Réflexe : la limite se lit dans la norme en
vigueur.

## Les 4 questions (quiz) et corrigés

**Q1 (écran 2).** Un fluide est classé B2L. Que pouvez-vous en déduire ?
- a) Faible toxicité, mais très inflammable comme un hydrocarbure
- **b) Toxicité plus élevée, faiblement inflammable ✔**
- c) Toxicité plus élevée, mais aucune propagation de flamme
- d) Faible toxicité, flamme qui se propage lentement

*B = toxicité plus élevée, 2L = faiblement inflammable : c'est la classe de l'ammoniac.*

**Q2 (écran 3).** Un collègue affirme : « Le R290 est A2L comme le R32, les règles sont les mêmes. »
- a) C'est exact : ce sont deux fluides à faible impact sur le climat
- b) C'est faux : le R290 est un hydrocarbure naturel, donc A1
- c) C'est exact, seule la toxicité change entre les deux fluides
- **d) C'est faux : le R290, propane, est A3 : règles plus sévères ✔**

*Un hydrocarbure pur est toujours A3 ; naturel ne veut pas dire non inflammable.*

**Q3 (écran 6).** Même machine, même charge, d'un grand local à un petit local : après une fuite
totale, la concentration…
- **a) augmente : la même masse dans un volume plus petit ✔**
- b) reste la même : la charge de la machine ne change pas
- c) diminue : l'air d'un petit local se renouvelle plus vite
- d) ne dépend que de la classe de toxicité du fluide utilisé

*Concentration = masse ÷ volume.*

**Q4 (écran 7).** Le client veut supprimer la ventilation « puisqu'un détecteur est installé ».
- a) Accepter : un détecteur de fuite suffit à protéger les occupants
- b) Accepter si l'alarme sonore est reliée à un téléphone d'astreinte
- **c) Refuser : le détecteur ne remplace pas la ventilation continue ✔**
- d) Refuser seulement pour les fluides toxiques

*La détection est un filet ; les barrières de base restent.*

## Correspondances (maillage)

- [`../fgaz-3/`](../fgaz-3/) — F-Gaz 3 (même sous-ligne) : le règlement pousse vers les fluides
  naturels et à bas PRP, donc vers A2L, A3, B2L.
- [`../aptitude-capacite/`](../aptitude-capacite/) — Aptitude & capacité (même sous-ligne) : groupe
  G12, calcul de charge d'un fluide inflammable.
- [`../risques-atex/`](../risques-atex/) — Zones ATEX (Risques professionnels) : A2L / A3 ouvrent
  la question de l'atmosphère explosive.
- [`../desp-categories/`](../desp-categories/) — Catégories I à IV (DESP) : le groupe de fluide
  DESP ne se confond pas avec la classe NF EN 378.
- Pistes non liées (à ajouter si le plan le demande) : `../tracabilite-fluides/` (récupération du
  fluide, partie 4), `../desp-soupapes-securites/` (accessoires de sécurité, partie 2).

## Sources (consultées le 30/09/2026)

Principales (les trois plus utiles) :
1. AFNOR, fiche de la **NF EN 378-1+A1** (octobre 2020) — titre, objet, structure en quatre parties :
   https://www.boutique.afnor.org/en-gb/standard/nf-en-3781-a1/refrigerating-systems-and-heat-pumps-safety-and-environmental-requirements-/fa200991/238671
2. **Arrêté du 21 novembre 2025** (JORF du 10 décembre 2025, NOR TECP2532494A), annexe II, via
   `packs/fluides/referentiel-2025.json` : codes 1.07, 1.08, 11.03, 12.01 à 12.03 (libellés
   verbatim).
3. Institute of Refrigeration, *Guidance Note 29 — EN 378:2016, index of changes* (organisme
   professionnel, **source secondaire**) : structure en quatre parties, partie 2 harmonisée
   (DESP, machines), « catégorie d'accès » a/b/c, classes d'emplacement I à IV (classe III), classe
   2L de 2016, base des limites de charge, tables alignées sur ISO 817 :
   https://www.fempa.es/wp-content/uploads/oldfiles//documentos/20170509115831_GN29-BSEN378-Enero-17.pdf

Complémentaires :
- ISO 817:2024 (désignation et classification de sécurité des fluides frigorigènes), résumé public :
  https://www.iso.org/standard/83452.html (page directe en 403 le jour de la consultation ; résumé
  relevé via les notices SCC/SNV).
- Titres des parties 3 et 4 : https://connect.snv.ch/fr/sn-en-378-3-2017 et
  https://connect.snv.ch/fr/sn-en-378-4-2017.
- **Arrêté du 25 juin 1980, article CH 35** (ERP, équipements utilisant des fluides frigorigènes),
  version réécrite en septembre 2025 : contenu lu sur la synthèse de la Fédération française du
  bâtiment
  (https://www.ffbatiment.fr/actualites-batiment/actualite-bam/fluides-frigorigenes-erp-mesures-prevenir-risques-toxicite-inflammabilite)
  et sur le récapitulatif du ministère chargé de l'écologie (« Alternatives aux HFC : récapitulatif
  des usages autorisés »). **Le texte consolidé sur Légifrance n'a pas été lu directement** (à faire).
- Position paper NKF / NOVAP / VKE, février 2025 (source secondaire) : partie 3, analyse de zones
  explosives en salle des machines (clause 5.14.1) ; détection = barrière secondaire :
  https://vke.no/siteassets/dokumenter/publikasjoner/position-paper-en-378.pdf
- Définitions des catégories d'accès a/b/c reprises publiquement de l'EN 378 (version 2008,
  « catégories d'occupation ») : https://www.lawinsider.com/dictionary/class-a-general-occupancy —
  source faible, à recouper avec la partie 1 en vigueur.

## À sourcer (non écrit dans la station, jamais approximé)

1. **Toute valeur de charge maximale** : formules, fractions de la limite inférieure d'inflammabilité,
   limites pratiques, plafonds absolus, valeurs par fluide et par catégorie — norme payante
   (NF EN 378-1+A1, annexes). Lire l'édition en vigueur.
2. **Limites de concentration par fluide** (toxicité aiguë, manque d'oxygène, inflammabilité) :
   tables ISO 817 / annexe de la partie 1.
3. **Définitions exactes** des classes d'emplacement I, II et IV, et de « système direct / indirect »
   (partie 1). La station ne cite que la classe III.
4. **Texte consolidé de l'article CH 35** (Légifrance) : rayons d'exclusion, formule de charge en
   surface, seuil de charge en fluide toxique, périodicité des vérifications. Rien de chiffré n'est
   repris dans la station.
5. **Exigences des salles des machines et emplacement des détecteurs, seuils d'alarme** (partie 3).
6. **Statut d'harmonisation à jour de la partie 2** (référence au Journal officiel de l'Union pour la
   directive 2014/68/UE et la directive machines) et **état de la révision de la NF EN 378**
   (consultation publique annoncée en 2025).
7. **Lien exact avec l'annexe IV du règlement (UE) 2024/573** et les conditions de site (code 11.03).
8. **Exhaustivité des exemples** : classes B2 et B3 de l'ISO 817 (« sans exemple courant » est un
   choix pédagogique, à confirmer sur la table), et classes des fluides cités (classification
   publiée, à relire dans la table à jour).

## Défauts connus

- Voix : narrations écrites (12), MP3 non fabriqués (chaîne edge-tts à faire tourner).
- Aucune valeur chiffrée : la station enseigne le mécanisme, pas le barème — par doctrine.
- Relecture métier attendue avant d'affirmer les points issus de sources secondaires (IOR, VKE,
  synthèse FFB de CH 35).
