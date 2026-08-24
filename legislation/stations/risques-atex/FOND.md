# Station « Zones ATEX » — FOND

> Réseau Législation · sous-ligne Risques professionnels · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions.
> Accent de la sous-ligne : **#c2410c**.
>
> Données de classification vérifiées (NF EN 378 / ASHRAE 34, skill
> `fluides-nfen378`) : A1 non inflammable (R134a, R410A, R744) ; A2L
> faiblement inflammable (R32, R1234yf, R454B, R454C) ; A2 inflammable
> (R152a) ; A3 très inflammable, hydrocarbures purs (R290, R600a, R1270).

## Ce qui fait l'intérêt de cette station

Le piège le plus fréquent du métier sur ce sujet : confondre un HFC/HFO à
faible PRP (A2L) avec un hydrocarbure pur (A3). La station corrige cette
confusion et relie la classe du fluide à des gestes concrets — ventilation,
matériel adapté — plutôt qu'à une liste de règles abstraites.

## Objectif

À la fin de la station, l'élève de BTS sait comment se forme une
atmosphère explosive, situe un fluide sur l'échelle A1/A2L/A2/A3, évite le
piège du R290, et sait ce que la classe d'un fluide change dans un local et
sur le matériel utilisé.

## Écran 1 — Le mécanisme d'une atmosphère explosive

Un gaz inflammable mélangé à l'air, dans une proportion qui peut
s'enflammer au contact d'une source d'inflammation.

*Visuel : `svg/atex-mecanisme.svg` — un nuage de gaz, un nuage d'air, une
étincelle.*

## Écran 2 — La classification de sécurité des fluides

A1 non inflammable, A2L faiblement inflammable, A2 inflammable, A3 très
inflammable, avec des exemples vérifiés.

*Visuel : `svg/atex-classification.svg` — quatre cases, intensité
croissante.*

## Écran 3 — Le piège classique : R290 n'est pas A2L

Un hydrocarbure pur (propane, isobutane) est toujours A3.

*Visuel : `svg/atex-piege-r290.svg` — R290 étiqueté A3, A2L barré.*

## Écran 4 — Dans la pièce : ventilation et absence de source d'inflammation

Un local chargé en A2L ou A3 impose une ventilation adaptée et l'absence
de flamme nue ou de matériel non conçu pour la zone.

*Visuel : `svg/atex-local.svg` — un groupe, une flèche de ventilation, une
flamme barrée.*

## Écran 5 — Sur le matériel : un appareillage conçu pour la zone

Le matériel électrique utilisé dans une zone à risque doit être marqué
ATEX.

*Visuel : `svg/atex-materiel.svg` — un appareil ATEX validé, un appareil
standard écarté.*

## Écran 6 — Exemple : une recharge de R290 en local mal ventilé

Le chalumeau de brasage est justement la source d'inflammation à écarter
avant d'intervenir.

*Visuel : `svg/atex-exemple-recharge.svg` — bouteille R290, chalumeau à
proximité.*

## Écran 7 — Le réflexe avant d'intervenir sur un A2L ou A3

Vérifier la ventilation et l'absence de source d'inflammation, ne pas
traiter comme un A1.

*Visuel : `svg/atex-reflexe.svg` — une fiche à deux cases cochées.*

## Écran 8 — Bilan et le réflexe

- Une atmosphère explosive naît du mélange gaz + air + source
  d'inflammation.
- A1 non inflammable, A2L faiblement inflammable, A2 inflammable, A3 très
  inflammable.
- Piège : R290 est A3, jamais A2L.
- Dans la pièce : ventilation, absence de flamme nue. Sur le matériel :
  appareillage conçu pour la zone.
- Le réflexe : ne jamais traiter un A2L/A3 comme un A1.

*Visuel : `svg/atex-bilan.svg` — une fiche à quatre cases cochées.*

## Les 4 questions (quiz)

**Q1.** Une atmosphère explosive se forme quand…
- a) Un fluide frigorigène est stocké à basse température
- b) Un gaz inflammable se mélange à l'air dans une proportion qui peut
  s'enflammer au contact d'une source d'inflammation ✔
- c) Un compresseur fonctionne à pleine charge
- d) Un circuit est ouvert à l'air libre, quel que soit le fluide
*Explication : il faut à la fois le mélange dans une certaine proportion et
une source d'inflammation ; les trois autres propositions ne suffisent pas
seules.*

**Q2.** Le R290 (propane) est classé…
- a) A2L, comme le R32
- b) A1, comme le R134a
- c) A3, très inflammable, car c'est un hydrocarbure pur ✔
- d) B2L, comme l'ammoniac
*Explication : le R290 est un hydrocarbure pur, classé A3. Ce n'est ni un
HFC à faible PRP (A2L), ni un fluide non inflammable (A1), ni un fluide
toxique (B2L).*

**Q3.** Un local contenant un groupe chargé en fluide A3 impose…
- a) Une ventilation adaptée et l'absence de sources d'inflammation à
  proximité ✔
- b) Uniquement une signalisation sur la porte du local
- c) Un éclairage plus puissant, rien d'autre
- d) Un contrôle de température renforcé, sans autre précaution
*Explication : ventilation et absence de sources d'inflammation sont les
deux précautions attendues ; les autres propositions ne répondent pas au
risque réel.*

**Q4.** Avant une recharge de R290 dans un local mal ventilé, quel
raisonnement s'enclenche ?
- a) Sortir directement le chalumeau de brasage, la recharge est
  prioritaire
- b) Ouvrir juste une fenêtre après la recharge, par précaution
- c) Considérer que le R290 se comporte comme un fluide A1
- d) Vérifier la ventilation et écarter toute source d'inflammation, dont
  le chalumeau de brasage, avant d'intervenir ✔
*Explication : la ventilation se vérifie et les sources d'inflammation
s'écartent avant d'intervenir, pas après ; les autres propositions ignorent
le risque réel du R290 (A3).*

## Maillage (correspondances de la station)

- **L'habilitation** (sous-ligne Électrique, en préparation) — la règle
  d'un côté, le geste protégé de l'autre.
- **NF EN 378** (sous-ligne Fluidique, en préparation) — la norme complète
  de classification et de sécurité des fluides, dont cette station ne
  montre qu'un aspect.

## Points non chiffrés (à sourcer)

- Tout pourcentage de concentration (limite inférieure ou supérieure
  d'explosivité) pour un fluide donné — non donné, la station reste au
  niveau du mécanisme.
- Toute catégorie de zone ATEX chiffrée (zone 0, 1, 2) — non donnée, la
  station reste au niveau du principe (matériel conçu pour la zone).
- Tout seuil de charge de fluide autorisée par local — non donné.
- Valeurs de PRP précises pour les fluides cités : la classification de
  sécurité (A1/A2L/A2/A3) est vérifiée et sourcée, mais aucun chiffre de
  PRP n'est utilisé dans cette station.
