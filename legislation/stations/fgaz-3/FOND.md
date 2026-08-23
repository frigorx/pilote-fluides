# Station « F-Gaz 3 » — FOND à valider

> Réseau Législation · sous-ligne Fluidique & thermique · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions.
> **Statut : FOND rédigé le 23/08/2026, EN ATTENTE de validation F. Henninot.
> Rien ne part vers Claude Design avant ce feu vert.**
>
> Sources internes : modules `g0` (« Ce que la loi vous impose ») et `g2`
> (« Impact environnemental et F-Gas ») du pack attestation — la station BTS
> monte d'un cran : elle fait RAISONNER, pas réciter. Ligne maison conservée :
> les mécanismes s'apprennent, les chiffres se vérifient sur le texte en vigueur.
> Adossement : codes 1.00 · 2.01 · 2.02 du référentiel attestation 2025 ;
> ⟦codes BTS à compléter quand le référentiel cible sera tranché⟧.

## Objectif

À la fin de la station, l'élève de BTS sait situer le règlement (UE) 2024/573
dans la lignée F-Gas, expliquer le mécanisme des quotas, convertir une charge en
tonnes équivalent CO₂, et dérouler le raisonnement d'un technicien devant un
choix de fluide ou d'équipement.

## Écran 1 — Trois textes, une marche de plus

La réglementation européenne des gaz fluorés avance par générations :
**F-Gas I** (règlement 842/2006), **F-Gas II** (517/2014), et depuis mars 2024
**F-Gaz 3 : le règlement (UE) 2024/573**. C'est un **règlement**, pas une
directive : il s'applique tel quel dans toute l'Union, sans transposition.
Côté français, l'**arrêté du 21 novembre 2025** organise le terrain
(attestations, contrôles). Chaque génération serre d'un cran : F-Gaz 3 va
jusqu'à programmer la **sortie complète des HFC neufs à l'horizon 2050**.

*Visuel : frise à trois marches montantes 2006 → 2014 → 2024, la troisième
marche pointant vers 2050.*

## Écran 2 — Le mécanisme central : le phase-down

L'Union ne dit pas « interdit du jour au lendemain » : elle **réduit
l'enveloppe**. Chaque année, une quantité maximale de HFC peut être mise sur le
marché, comptée en **tonnes équivalent CO₂**, et répartie en **quotas** entre
**producteurs et importateurs** — pas entre les frigoristes. L'enveloppe
rétrécit par paliers jusqu'à **zéro HFC neufs en 2050**.

Conséquence directe en chantier : les fluides à fort PRP deviennent **rares et
chers** — le R-404A l'a montré le premier. Le marché pousse tout seul vers les
bas PRP.

*Visuel : entonnoir ou escalier descendant (l'enveloppe qui rétrécit), avec les
bonbonnes qui se raréfient. Pas de pourcentages par année : le mécanisme, pas le
barème (qui se vérifie sur le texte).*

## Écran 3 — La conversion qui pilote tout

> **tonnes éq. CO₂ = charge (kg) × PRP ÷ 1000**

Deux installations de même charge n'ont pas les mêmes obligations si les
fluides diffèrent :

| Installation | Charge | PRP | t éq. CO₂ |
|---|---|---|---|
| Chambre froide au R-404A | 10 kg | 3922 | **39,2** |
| Climatisation au R-32 | 10 kg | 675 | **6,75** |

C'est cette valeur — jamais le poids seul — qui déclenche les obligations.

*Visuel : le calcul en gros, les deux bonbonnes comparées. Reprendre l'échelle
PRP du pack (CO₂ = 1 · R-32 = 675 · R-410A = 2088 · R-404A = 3922).*

## Écran 4 — Les interdictions : neuf d'abord, maintenance ensuite

Deux familles d'interdictions, à ne pas confondre :

1. **Mise sur le marché d'équipements neufs** : l'annexe du règlement fixe un
   échéancier par catégorie d'équipement et par seuil de PRP (2025 → 2035 :
   climatiseurs, pompes à chaleur, froid commercial… glissent vers les bas PRP
   puis les fluides naturels).
2. **Maintenance et entretien** : certains fluides à très fort PRP ne peuvent
   plus servir en appoint — avec des tolérances pour le fluide **recyclé ou
   régénéré**, afin que le parc existant vive sa fin de carrière.

**La règle maison** : ne pas apprendre l'échéancier par cœur — savoir qu'il
existe, savoir **où** le vérifier (l'annexe du règlement en vigueur), et
vérifier à chaque affaire.

*Visuel : deux colonnes « équipement neuf » / « entretien du parc », avec le
pictogramme recyclé/régénéré côté entretien.*

## Écran 5 — Ce qui se durcit sans changer de nature

Les obligations héritées de F-Gas II demeurent, resserrées :

- **Contrôles d'étanchéité** périodiques, déclenchés par seuils en t éq. CO₂
  (5 / 50 / 500) — plus l'installation « pèse » en équivalent CO₂, plus les
  contrôles sont fréquents ; au-delà du seuil haut, **détection automatique**.
- **Récupération obligatoire** du fluide avant toute mise au rebut — la filière
  DEEE traite la carcasse, jamais le fluide.
- **Registre d'équipement** tenu par l'exploitant : chaque charge, chaque
  contrôle, chaque fuite y laisse une trace.

*Visuel : les trois obligations en trois cartes ; renvoi visuel discret vers la
station Traçabilité (BSD) — c'est le maillage.*

## Écran 6 — Qui a le droit de toucher

Deux papiers, deux titulaires : l'**attestation d'aptitude** (la personne) et
l'**attestation de capacité** (l'entreprise). L'arrêté du 21 novembre 2025
redessine les catégories d'aptitude — **A1, A2, B, C, D, E** — parce que le
règlement pousse vers les alternatives : le **CO₂ (catégorie B)** et
l'**ammoniac (catégorie C)** entrent dans le champ de la formation. Un
technicien qui n'évolue pas reste au bord du marché.

*Visuel : reprendre le SVG existant `aptitude-capacite.svg` du pack (personne /
entreprise) en y ajoutant la rangée des six catégories.*

## Écran 7 — Le raisonnement du technicien (cœur BTS)

Devant un choix de fluide ou d'équipement, quatre questions, dans l'ordre :

1. **Quel PRP ?**
2. **Quelle charge → combien de t éq. CO₂ ?** (obligations, contrôles)
3. **Ce fluide restera-t-il disponible et abordable sous quota ?**
4. **Une alternative bas PRP ou naturelle est-elle possible ici ?**

Le frigoriste de 2026 n'est plus seulement un poseur : il **conseille** le
client sur la trajectoire de son parc. C'est une compétence commerciale autant
que technique.

*Visuel : les quatre questions en cascade, façon logigramme simple — aucun
texte sur les flèches.*

## Écran 8 — Bilan et le réflexe

- F-Gaz 3 = règlement (UE) 2024/573, troisième génération, cap 2050.
- Phase-down = enveloppe en t éq. CO₂ qui rétrécit, quotas aux
  producteurs/importateurs.
- t éq. CO₂ = charge × PRP ÷ 1000 : la valeur qui déclenche tout.
- Interdictions « neuf » ≠ restrictions « maintenance » (recyclé/régénéré).
- **Le réflexe professionnel : le texte en vigueur fait foi — jamais la fiche
  d'il y a deux ans.**

## Les 4 questions (quiz)

> Règle maison : bonnes réponses mélangées au rendu (mélange déterministe),
> longueurs équilibrées — contrôle `mesure:banque` au montage.

**Q1.** Le règlement (UE) 2024/573 est entré en application en mars 2024. Que
remplace-t-il ?
- a) La directive européenne sur les gaz fluorés
- b) Le règlement 517/2014, dit F-Gas II ✔
- c) Le protocole de Montréal
- d) L'arrêté du 21 novembre 2025
*Explication : la lignée est 842/2006 → 517/2014 → 2024/573. Montréal vise
l'ozone (CFC/HCFC), et l'arrêté français applique le règlement, il ne le
précède pas.*

**Q2.** Les quotas du phase-down sont attribués :
- a) Aux producteurs et importateurs de HFC ✔
- b) À chaque entreprise d'installation frigorifique
- c) À chaque État membre, qui les répartit
- d) Aux exploitants des installations
*Explication : le quota se joue à la mise sur le marché. Le frigoriste, lui,
subit l'effet : rareté et prix des fluides à fort PRP.*

**Q3.** Une installation contient 8 kg de R-410A (PRP 2088). Sa charge en
tonnes équivalent CO₂ vaut environ :
- a) 1,7 t éq. CO₂
- b) 8 t éq. CO₂
- c) 16,7 t éq. CO₂ ✔
- d) 167 t éq. CO₂
*Explication : 8 × 2088 ÷ 1000 = 16,7. C'est cette valeur qui déclenche les
obligations de contrôle d'étanchéité, pas les 8 kg.*

**Q4.** Un fluide dont la mise sur le marché est interdite en équipement neuf :
- a) Ne peut plus jamais être utilisé, même en maintenance
- b) Peut, selon l'échéancier, encore servir en maintenance — notamment
  recyclé ou régénéré ✔
- c) Doit être détruit immédiatement dans toutes les installations
- d) Reste autorisé en neuf si le client signe une décharge
*Explication : l'interdiction « neuf » et les restrictions « maintenance » sont
deux régimes distincts ; le recyclé/régénéré accompagne la fin de carrière du
parc. Détruire tout le parc du jour au lendemain n'est ni demandé ni possible.*

## Maillage (correspondances de la station)

- **Aptitude & capacité** (même sous-ligne) — qui a le droit de toucher.
- **PRP & ODP** (Impact environnemental) — d'où vient le chiffre PRP.
- **Traçabilité** (même sous-ligne) — le fluide récupéré devient déchet tracé.

## Consignes pour Claude Design (à joindre telles quelles au moment de l'envoi)

- Charte : projet « Charte graphique inerWeb » (`1394c5be-3bc5-441f-93d9-251c89f48ba8`) —
  couleurs, polices, logo, encadrés existants. Couleur d'accent de la sous-ligne :
  **#0f766e** (Fluidique & thermique).
- Sortie **HTML/SVG uniquement**, jamais d'image bitmap — le résultat sera
  transposé au format maison du site (motif des stations existantes).
- Police lisible à l'impression A4 noir et blanc (≥ 17 px pour le corps).
- **Aucun texte posé sur un tracé, une flèche ou un schéma.**
- Curseurs de réglage lisibilité (taille de police, contraste) pour que
  F. Henninot ajuste sans itération payante.
- Aucun nom propre, aucun établissement — non-nominatif strict.
- Une seule demande cadrée : les 8 écrans + 4 questions de ce document, rien
  d'inventé, rien d'ajouté.
