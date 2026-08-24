# Station « ACV & carbone » — FOND

> Réseau Législation · sous-ligne Impact environnemental · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions.
> **Statut : station produite le 24/08/2026, EN ATTENTE de relecture métier de
> F. Henninot** (attribut `data-prototype` sur marque.js dans index.html).
>
> Couleur d'accent de la sous-ligne (utilisée dans les SVG) : **#047857**.
>
> Correspondance directe avec la station **impact-tewi** du même réseau :
> le TEWI n'est qu'une partie de l'étape « exploiter » de l'ACV.

## Ce qui fait l'intérêt de cette station

Beaucoup d'élèves réduisent l'impact d'un équipement à sa seule consommation
en service. Cette station élargit le regard aux quatre étapes du cycle de
vie, et montre que l'indicateur carbone de la RE2020 mesure justement ce
cycle complet, pas seulement l'exploitation.

## Objectif

À la fin de la station, l'élève sait nommer les quatre étapes d'une ACV
(fabriquer, transporter, exploiter, démolir), identifier l'exploitation
comme l'étape la plus longue en général pour un équipement fixe, situer le
TEWI dans ce cycle (une partie de l'étape exploiter), et expliquer ce que
mesure réellement l'indicateur carbone de la RE2020.

## Écran 1 — Les quatre étapes d'un cycle de vie

Vue d'ensemble : fabriquer, transporter, exploiter, démolir.
*Visuel : `svg/quatre-etapes-acv.svg`.*

## Écran 2 — Fabriquer

Matières premières extraites et énergie industrielle : l'empreinte existe
avant la mise en route.
*Visuel : `svg/fabriquer.svg`.*

## Écran 3 — Transporter

De l'usine au chantier : le trajet s'ajoute à l'empreinte de fabrication.
*Visuel : `svg/transporter.svg`.*

## Écran 4 — Exploiter

L'étape la plus longue en général pour un équipement fixe : énergie et
fluide, lien explicite avec le TEWI (station voisine du même réseau).
*Visuel : `svg/exploiter.svg`.*

## Écran 5 — Démolir

Fin de vie : récupération obligatoire du fluide, recyclage des matériaux ;
ce qui n'est pas récupéré compte aussi.
*Visuel : `svg/demolir.svg`.*

## Écran 6 — Ce que mesure l'indicateur carbone de la RE2020

Le cycle de vie complet du bâtiment : construction et exploitation
ensemble, sans seuil chiffré.
*Visuel : `svg/indicateur-carbone-re2020.svg`.*

## Écran 7 — Le raisonnement : quatre situations de terrain

Reprend les quatre cas des questions du quiz.
*Visuel : `svg/quatre-situations.svg`.*

## Écran 8 — Bilan

Les quatre étapes, le lien avec le TEWI, ce que mesure réellement
l'indicateur carbone.
*Visuel : `svg/bilan-acv.svg`.*

## Les 4 questions (quiz)

**Q1.** Quelles sont les quatre étapes d'une analyse de cycle de vie ?
- a) Uniquement fabriquer et exploiter
- b) Fabriquer, transporter, exploiter, démolir ✔
- c) Uniquement la phase d'exploitation
- d) Uniquement la fin de vie

**Q2.** Pour un équipement fixe, quelle étape pèse en général le plus
longtemps ?
- a) La fabrication, car les matières premières seraient toujours les plus polluantes
- b) Le transport, à cause des distances
- c) L'exploitation, car elle dure toute la durée de vie de l'installation, énergie et fluide compris ✔
- d) La démolition, à cause des déchets

**Q3.** Que mesure l'indicateur carbone de la RE2020 ?
- a) Uniquement la consommation d'électricité annuelle du bâtiment
- b) Uniquement les émissions du chantier de construction
- c) L'impact carbone du bâtiment sur l'ensemble de son cycle de vie, construction et exploitation comprises ✔
- d) Uniquement le confort thermique perçu par les occupants

**Q4.** Quel est le lien entre l'ACV d'un équipement et son TEWI ?
- a) Le TEWI et l'ACV mesureraient exactement la même chose
- b) Le TEWI couvrirait aussi la fabrication de la machine
- c) Le TEWI est une partie de l'ACV, centrée sur l'étape d'exploitation ; l'ACV couvre en plus la fabrication, le transport et la démolition ✔
- d) L'ACV ne concernerait que le transport

## Maillage (correspondances de la station)

- **La RE2020** (sous-ligne Thermique, en préparation) — le détail de
  l'indicateur carbone, construction et exploitation.
- **NF EN 378** (en préparation) — ce que la classe du fluide impose en
  plus, sur l'étape exploitation.
- Pas de lien réel pour cette station : les deux correspondances sont
  encore en préparation sur le plan du réseau.

## Consignes de production suivies

- Gabarit repris de `aptitude-capacite` : 12 écrans navigables, une
  narration `data-narration` par écran, quiz interactif, une illustration
  par écran.
- `styles.css` et `app.js` : copie littérale du socle du réseau
  (`--sous-ligne` reste `#0f766e` dans ces deux fichiers, à dessein).
  L'accent `#047857` de la sous-ligne n'habille que les SVG.
- Sortie HTML/SVG uniquement, aucun bitmap.
- Aucun texte posé sur un tracé, une flèche ou un schéma.
- Aucun nom propre, aucun établissement.

## Points refusés de chiffrer faute de source certaine

- Aucun seuil chiffré de la RE2020 (kgCO₂/m², durée de vie conventionnelle
  en années) n'est écrit : seul le principe de l'indicateur carbone est
  enseigné (écran 6).
- Aucune part relative (directe/indirecte, construction/exploitation) n'est
  chiffrée en pourcentage : les visuels comparent des tailles ou des zones,
  jamais des valeurs précises.
