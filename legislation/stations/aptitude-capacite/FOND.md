# Station « Aptitude & capacité » — FOND à valider

> Réseau Législation · sous-ligne Fluidique & thermique · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions.
> **Statut : FOND rédigé le 23/08/2026, EN ATTENTE de validation F. Henninot.
> Rien ne se produit avant ce feu vert** (étape 1 du rail).
>
> C'est la **deuxième station** du réseau, et la première correspondance de
> F-Gaz 3 — le maillage devient réel dès qu'elle ouvre.
>
> **Sources internes, toutes vérifiables** : `packs/fluides/referentiel-2025.json`
> (arrêté du 21 novembre 2025, NOR TECP2532494A, JORF du 10 décembre 2025,
> texte 9 sur 135) et le SVG maison `aptitude-capacite.svg`.
> Ligne maison conservée : les mécanismes s'apprennent, les chiffres se
> vérifient sur le texte en vigueur.
> Adossement : ⟦codes BTS à compléter quand le référentiel cible sera tranché⟧.

## Ce qui fait l'intérêt de cette station

Une nouveauté que presque personne sur le terrain n'a encore intégrée :
**l'attestation d'aptitude n'est plus acquise à vie.** Le régime de 2025 impose
une remise à niveau périodique, et fixe une échéance de bascule aux anciens
titulaires. C'est le message central, et il vaut mieux qu'un élève l'apprenne
ici que par une suspension.

## Objectif

À la fin de la station, l'élève de BTS sait distinguer aptitude et capacité,
dire qui détient quoi, situer sa propre catégorie, expliquer comment l'aptitude
s'obtient (et pourquoi on ne peut pas faire d'impasse), et surtout savoir que
l'attestation se **maintient** — avec quelle périodicité et quelle sanction.

## Écran 1 — Deux papiers, deux titulaires

L'**attestation d'aptitude** concerne **la personne** : c'est le technicien qui
la détient, elle prouve qu'il sait faire. L'**attestation de capacité** concerne
**l'entreprise** : elle prouve que la société dispose du personnel, de
l'outillage et des procédures.

**Il faut les deux, et l'une ne remplace jamais l'autre.** C'est la confusion la
plus fréquente du métier : « mon patron a la capacité, donc je peux y aller »
est faux. Sans aptitude, vous ne pouvez pas intervenir — même dans une
entreprise parfaitement en règle.

*Visuel : le SVG maison `aptitude-capacite-categories.svg`, déjà produit pour
F-Gaz 3 (partie haute seulement pour cet écran). Le copier dans le dossier de
la station : chaque station reste autonome.*

## Écran 2 — Comment l'aptitude s'obtient : on ne peut pas faire d'impasse

L'évaluation croise **une partie théorique et une partie pratique**. Elle porte
sur des **groupes de compétences** :

- des **groupes obligatoires** pour tout le monde : G1, G2, G3, G4, G5, G10, G11 ;
- **au moins un groupe tiré au sort** parmi G6, G7, G8 et G9 — et *le candidat
  ne sait pas, avant l'évaluation, sur lequel il sera interrogé* ;
- un **groupe spécifique à la catégorie visée** : G12 pour A1 et A2, G13 pour B
  (le CO₂), G14 pour C (l'ammoniac).

**Ce que le tirage au sort veut dire** : impossible de réviser trois groupes sur
quatre en espérant passer entre les gouttes. Le dispositif est conçu pour ça.

*Visuel à produire : `svg/structure-examen.svg` — trois blocs (obligatoires ·
tirage au sort · spécifique catégorie), le bloc du tirage marqué d'un point
d'interrogation et de ses quatre entrées possibles. Aucun texte sur une flèche.*

## Écran 3 — Les sept catégories : laquelle vous concerne

Six catégories couvrent le froid fixe — **A1, A2, B, C, D, E** — et une
septième, **V**, la climatisation des véhicules, relève d'un référentiel
distinct (II.D).

Le point à retenir pour un BTS : **la catégorie borne ce que vous avez le droit
de faire**, pas votre niveau de diplôme. Un titulaire E ne peut que contrôler
l'étanchéité, à condition de ne pas avoir à accéder au circuit. Un titulaire D
ne peut que récupérer, et seulement sur les faibles charges.

*Visuel : `aptitude-capacite-categories.svg` (partie basse), déjà produit.*

## Écran 4 — La capacité : ce que l'entreprise doit prouver

Trois piliers, et ils se contrôlent :

1. **Le personnel** — des techniciens titulaires de l'aptitude, en nombre
   suffisant pour l'activité déclarée ;
2. **L'outillage** — les équipements de récupération, de détection et de mesure,
   maintenus et vérifiés ;
3. **Les procédures** — la traçabilité des interventions et des fluides.

Une entreprise sans capacité ne peut pas exercer, même si tous ses techniciens
sont attestés. La réciproque est vraie : l'entreprise capable n'autorise pas un
technicien sans aptitude.

*Visuel à produire : `svg/trois-piliers-capacite.svg` — trois colonnes
(personnel · outillage · procédures) sous un même toit d'entreprise, avec le
rappel « et il faut aussi l'aptitude de chacun » en bandeau.*

⟦À vérifier avant production : durée de validité de l'attestation de capacité et
organisme délivrant — non présents dans `referentiel-2025.json`, qui ne couvre
que l'aptitude.⟧

## Écran 5 — La nouveauté 2025 : elle n'est plus à vie

C'est le cœur de la station. Le régime issu de l'arrêté du 21 novembre 2025
instaure une **remise à niveau périodique** (annexe VII) :

- **a minima tous les 7 ans**, à compter de la date de délivrance de
  l'attestation d'aptitude — ou de la dernière remise à niveau ;
- elle est dispensée par un **organisme de formation certifié Qualiopi**, la
  démonstration pratique étant réalisée par une **entité titulaire d'une
  attestation de capacité** et une **personne titulaire d'une aptitude** — les
  deux papiers de l'écran 1 reviennent, à l'autre bout de la chaîne ;
- elle concerne **A1, A2, B, C, D et E**. La catégorie **V en est exclue**.

**La sanction du défaut** : l'attestation est **suspendue**. Le titulaire ne
peut plus exercer jusqu'à mise en conformité, dans un délai maximum de **3 ans**.

*Visuel à produire : `svg/maintien-7-ans.svg` — une ligne de temps avec la
délivrance, le jalon des 7 ans, puis deux issues qui divergent : remise à niveau
faite (la ligne continue) ou non faite (la ligne se coupe, mention
« suspendue »). Trait plein contre trait tireté — la couleur ne travaille
jamais seule.*

## Écran 6 — Les anciens titulaires : l'échéance du 12 mars 2029

Ceux qui détiennent une attestation des **anciennes catégories I, II, III ou IV**
(règlements (UE) 2015/2067 ou (CE) 303/2008) doivent se mettre en conformité par
une **remise à niveau ponctuelle** (annexe VIII), dispensée par un organisme
formateur certifié — pas nécessairement l'organisme évaluateur.

**Échéance : le 12 mars 2029.** Passé cette date, l'ancienne attestation n'est
**plus valide** : son titulaire doit repasser l'examen complet.

Dit autrement : un technicien attesté en 2018 qui ne fait rien redevient, en
2029, un candidat.

*Visuel à produire : `svg/bascule-2029.svg` — deux voies depuis l'ancienne
attestation : la remise à niveau ponctuelle (courte) qui rejoint le nouveau
régime, et l'inaction qui ramène à la case examen. Aucun texte sur les flèches.*

## Écran 7 — Le raisonnement : quatre situations de terrain

1. **« Je change d'entreprise. »** → L'aptitude vous suit : elle est à vous. Mais
   la nouvelle entreprise doit avoir sa **capacité**, sinon vous ne pouvez pas
   intervenir pour elle.
2. **« Mon entreprise a la capacité, je débute. »** → Il vous faut votre propre
   aptitude, dans la catégorie correspondant aux fluides manipulés.
3. **« Mon attestation date de 2018. »** → Ancien régime : la remise à niveau
   ponctuelle est à faire **avant le 12 mars 2029**.
4. **« Mon attestation date de 2026. »** → Nouveau régime : le compteur des
   **7 ans** court à partir de la délivrance.

*Visuel à produire : `svg/quatre-situations.svg` — quatre cartes, chacune avec
la situation et la réponse, sur le motif en cascade de la station F-Gaz 3.*

## Écran 8 — Bilan et le réflexe

- Aptitude = **la personne**. Capacité = **l'entreprise**. Il faut les deux.
- L'examen mêle groupes obligatoires, **au moins un groupe tiré au sort** parmi
  G6 à G9, et un groupe spécifique à la catégorie.
- La catégorie borne les **droits d'intervention**, pas le niveau de diplôme.
- **L'attestation se maintient** : remise à niveau a minima tous les 7 ans,
  sous peine de suspension.
- Anciens titulaires : **12 mars 2029**, sinon retour à l'examen.

**Le réflexe professionnel : connaître la date de délivrance de sa propre
attestation.** C'est d'elle que part le compteur.

*Visuel à produire : `svg/bilan-aptitude.svg` — sur le modèle de
`le-reflexe.svg` : la carte d'attestation avec sa date mise en évidence, et le
compteur qui court.*

## Les 4 questions (quiz)

> Règle maison : bonnes réponses mélangées, longueurs équilibrées — contrôle
> `mesure:banque` au montage.

**Q1.** Un technicien titulaire d'une attestation d'aptitude rejoint une
entreprise qui n'a pas d'attestation de capacité. Que peut-il faire ?
- a) Intervenir : son aptitude suffit, elle est personnelle
- b) Rien sur les gaz fluorés — il faut aussi la capacité de l'entreprise ✔
- c) Intervenir uniquement sur les faibles charges
- d) Intervenir six mois, le temps que l'entreprise régularise
*Explication : les deux papiers sont nécessaires ensemble. L'aptitude est à la
personne et le suit, la capacité est à l'entreprise. L'une ne remplace jamais
l'autre.*

**Q2.** Lors de l'évaluation, sur quels groupes le candidat est-il interrogé ?
- a) Uniquement sur les groupes obligatoires
- b) Sur les groupes qu'il choisit dans son dossier
- c) Sur les obligatoires, plus au moins un groupe tiré au sort parmi G6 à G9,
  plus le groupe spécifique à sa catégorie ✔
- d) Sur les quatorze groupes, sans exception
*Explication : le tirage au sort est là pour empêcher l'impasse — le candidat
ne sait pas, avant l'évaluation, lequel des quatre sortira.*

**Q3.** Une attestation d'aptitude délivrée sous le régime de 2025 est valable :
- a) À vie, comme auparavant
- b) Cinq ans, puis elle doit être repassée entièrement
- c) Tant qu'une remise à niveau est faite a minima tous les 7 ans ✔
- d) Trois ans, renouvelable une seule fois
*Explication : c'est la nouveauté du régime. Sans remise à niveau, l'attestation
est suspendue et son titulaire ne peut plus exercer jusqu'à mise en conformité,
dans un délai maximum de trois ans.*

**Q4.** Un technicien détient une attestation de catégorie II obtenue en 2018.
Que doit-il faire ?
- a) Rien : les anciennes catégories restent valides sans limite
- b) Une remise à niveau ponctuelle avant le 12 mars 2029, sinon il devra
  repasser l'examen ✔
- c) Repasser immédiatement l'examen complet
- d) Demander la conversion automatique en catégorie A2
*Explication : l'ancien régime bascule vers le nouveau par une remise à niveau
ponctuelle. Passé l'échéance, l'attestation n'est plus valide et le titulaire
redevient candidat.*

## Maillage (correspondances de la station)

- **F-Gaz 3** (même sous-ligne) — pourquoi les catégories bougent : le règlement
  pousse vers le CO₂ et l'ammoniac. *C'est la correspondance réciproque : F-Gaz 3
  pointe déjà vers ici.*
- **NF EN 378** (même sous-ligne) — ce que la classe du fluide impose en plus.
- **Droit du travail** (autre sous-ligne) — l'employeur et la qualification de
  ses salariés.

## Consignes pour la production (à joindre au moment de l'envoi)

- Charte : projet « Charte graphique inerWeb » — couleurs, polices, logo,
  encadrés. Couleur d'accent de la sous-ligne : **#0f766e**.
- **Reprendre le gabarit de la station F-Gaz 3** : 12 écrans navigables, une
  narration `data-narration` par écran expliquant ce que l'on VOIT, quiz
  interactif, une illustration par écran, fondu entre les écrans.
- **Voix** : narrations fabriquées avec Piper (local) après validation du fond —
  `build/voix/collecter-narrations.mjs` puis `generer-audios-piper.py`, index
  réduit à la station.
- Sortie **HTML/SVG uniquement**, jamais de bitmap.
- Police lisible à l'impression A4 noir et blanc (≥ 17 px pour le corps).
- **Aucun texte posé sur un tracé, une flèche ou un schéma.**
- Aucun nom propre, aucun établissement — non-nominatif strict.
- **Six SVG à produire** (voir écrans 2, 4, 5, 6, 7, 8) et **un à copier** depuis
  F-Gaz 3 (`aptitude-capacite-categories.svg`).

---

## ⚠️ Ce qui reste à trancher avant production

1. **Le fond doit être validé par F. Henninot** — c'est l'étape 1 du rail.
2. **Écran 4** : durée de validité et organisme délivrant l'attestation de
   capacité ne figurent pas dans `referentiel-2025.json` (qui ne couvre que
   l'aptitude). À sourcer, ou à retirer de l'écran.
3. **Le référentiel BTS d'adossement** n'étant toujours pas tranché, les codes
   restent en ⟦…⟧ comme pour F-Gaz 3.
