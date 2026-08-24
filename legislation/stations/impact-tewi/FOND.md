# Station « Le TEWI » — FOND

> Réseau Législation · sous-ligne Impact environnemental · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions.
> **Statut : station construite le 24/08/2026, PROTOTYPE NON RELU.**
> `data-prototype` posé sur `marque.js` : la station attend une relecture métier
> avant toute diffusion, comme demandé.
>
> Gabarit repris à l'identique de `legislation/stations/aptitude-capacite/`.
> `styles.css` et `app.js` sont une **copie littérale, byte pour byte** du
> socle commun du réseau — rien n'y a été changé, y compris la variable
> `--sous-ligne` qui reste `#0f766e`. L'accent `#047857` (Impact
> environnemental) n'apparaît que dans les 8 SVG de cette station.

## Ce qui fait l'intérêt de cette station

Le réflexe le plus répandu est de juger une machine sur son fluide seul :
« bas PRP, donc propre ». Le TEWI montre que c'est incomplet — une machine
étanche mais gourmande en électricité peut peser plus lourd qu'une machine
qui fuit un peu mais consomme peu. Le message central : il faut toujours
regarder le cycle complet, jamais un seul côté de la balance.

## Objectif

À la fin de la station, l'élève de BTS sait ce qu'est le TEWI, distingue sa
part directe (fuites × PRP) de sa part indirecte (énergie × durée de vie),
reconnaît les deux pièges symétriques qui peuvent tromper un jugement rapide,
et sait pourquoi comparer deux machines sur le seul PRP de leur fluide est
insuffisant.

## Écran 1 — Le TEWI : une balance à deux plateaux

Le TEWI additionne la part directe (les fuites de fluide, converties en
équivalent CO₂ via le PRP) et la part indirecte (l'énergie consommée sur
toute la vie de la machine, elle aussi convertie en équivalent CO₂).

*Visuel : `svg/balance-tewi.svg` — une balance à l'équilibre, un plateau par
part, reliés au même pivot marqué TEWI. Aucun plateau n'est dessiné plus
lourd que l'autre par principe : c'est le cas réel de chaque machine qui
décide.*

## Écran 2 — La part directe, en détail

Masse de fluide fuie pendant toute la vie de la machine, multipliée par le
PRP du fluide. À masse fuie égale, le résultat change du tout au tout selon
le fluide (CO₂ = 1, propane = 3, ammoniac = 0, contre des fluides comme le
R-410A ou le R-404A nettement plus élevés).

*Visuel : `svg/part-directe.svg` — une chaîne de trois blocs (masse fuie ×
PRP = part directe), aucun texte sur une flèche.*

## Écran 3 — La part indirecte, en détail

Énergie électrique consommée sur toute la vie de la machine, convertie en
équivalent CO₂ selon le réseau électrique utilisé. L'électricité n'est
jamais neutre à produire : sa part de CO₂ dépend du réseau, sans qu'un
facteur chiffré ne soit donné ici.

*Visuel : `svg/part-indirecte.svg` — une chaîne de blocs (énergie × durée de
vie → conversion selon le réseau électrique = part indirecte).*

## Écran 4 — Piège n°1 : la machine gourmande

Une PAC au propane (PRP 3, bas) mais mal dimensionnée, qui consomme beaucoup
d'électricité : la part indirecte peut dominer le TEWI malgré un fluide
« propre ».

*Visuel : `svg/piege-machine-gourmande.svg` — PAC propane à gauche (direct
faible), compteur électrique dans le rouge à droite (indirect fort), balance
penchant vers l'indirect.*

## Écran 5 — Piège n°2 : la machine qui fuit

Le miroir du précédent : un groupe de condensation au R-404A (PRP élevé),
efficace en énergie, mais qui fuit régulièrement : la part directe peut
dominer le TEWI malgré une machine efficace.

*Visuel : `svg/piege-machine-qui-fuit.svg` — groupe de condensation R-404A à
gauche (direct fort), compteur électrique dans le vert à droite (indirect
faible), balance penchant vers le direct.*

## Écran 6 — Ce qui fait varier chaque part

Trois leviers, sans chiffre : la durée de vie de la machine (joue sur les
deux parts), le taux de fuite annuel réel (joue sur la part directe), le
réseau électrique du pays où elle tourne (joue sur la part indirecte).

*Visuel : `svg/facteurs-indirect.svg` — trois cartes, chacune reliée par une
flèche à la ou les zones qu'elle influence.*

*Note de production : le prompt initial rattachait les trois leviers à « la
part indirecte » seule. Le taux de fuite annuel réel influence mécaniquement
la part directe (masse fuie), pas l'indirecte — l'écran corrige ce
rattachement pour rester exact sur le mécanisme, sans en changer le fond
(les trois leviers demandés sont bien présents).*

## Écran 7 — Le raisonnement : quatre réflexes de terrain

Quatre situations : comparer deux fluides sur une même machine (regarder
aussi la consommation) ; comparer deux machines au même fluide (la plus
gourmande ou la plus durable pèse plus côté indirect) ; un fluide bas PRP sur
une machine gourmande (ne pas conclure trop vite) ; un fluide fort PRP sur
une machine étanche (ne pas conclure trop vite non plus).

*Visuel : `svg/quatre-situations.svg` — quatre cartes numérotées, situation
et réponse.*

## Écran 8 — Bilan : le cycle complet, jamais le seul fluide

TEWI = part directe + part indirecte. Juger un système sur son seul fluide
est une erreur : il faut regarder le cycle complet, fluide et énergie.

*Visuel : `svg/bilan-tewi.svg` — la formule en haut, une étiquette de fluide
barrée (« insuffisant ») à gauche, une machine entourée d'une flèche
circulaire (« le cycle complet ») à droite.*

## Les 4 questions (quiz)

Positions de la bonne réponse réparties sur les quatre places (3, 4, 1, 2)
pour éviter tout biais de position.

**Q1.** Qu'est-ce que le TEWI ?
- a) Uniquement l'impact des fuites de fluide
- b) Uniquement l'impact de l'énergie consommée
- c) La somme de l'impact direct des fuites (masse × PRP) et de l'impact
  indirect de l'énergie consommée sur toute la vie de la machine ✔
- d) La somme de l'ODP et du PRP du fluide
*Explication : le TEWI additionne les deux parts — ni les fuites seules, ni
l'énergie seule. Il ne se confond pas non plus avec l'ODP et le PRP, deux
propriétés du fluide, pas un bilan de machine.*

**Q2.** Une machine utilise un fluide à très bas PRP mais consomme beaucoup
d'électricité sur toute sa vie. Que peut-il se passer ?
- a) La part directe domine toujours, quel que soit le fluide
- b) Le TEWI ignore la consommation électrique
- c) Un fluide à bas PRP garantit à lui seul un TEWI faible
- d) La part indirecte peut dominer le TEWI malgré un fluide « propre » ✔
*Explication : un fluide bas PRP limite la part directe, pas l'indirecte —
si la machine consomme beaucoup, l'indirect peut suffire à faire pencher
tout le TEWI.*

**Q3.** Qu'est-ce qui fait varier la part indirecte du TEWI, à machine
identique ?
- a) La durée de fonctionnement, la consommation d'énergie et le réseau
  électrique du pays où elle tourne ✔
- b) Uniquement le type de fluide utilisé
- c) Uniquement la température extérieure du jour de la mesure
- d) Uniquement la charge initiale de fluide à l'installation
*Explication : ces trois éléments jouent sur l'énergie consommée et sa
conversion en CO₂. Le type de fluide agit sur la part directe ; une mesure
ponctuelle ou une charge initiale ne représentent pas une vie entière de
fonctionnement.*

**Q4.** Pourquoi comparer deux machines seulement sur le PRP de leur fluide
est-il insuffisant ?
- a) Le PRP suffirait toujours à juger l'impact
- b) Le TEWI additionne aussi la part indirecte liée à l'énergie consommée
  sur toute la vie ; le PRP seul ne dit rien de la consommation ✔
- c) Seule la marque de la machine compterait
- d) Seul le prix d'achat compterait
*Explication : le PRP ne renseigne que sur la part directe. La marque et le
prix ne mesurent aucun impact climatique.*

## Maillage (correspondances de la station)

- **La RE2020** (sous-ligne Thermique) — le même principe étendu au cycle de
  vie complet d'un bâtiment. En préparation, aucun lien.
- **NF EN 378** (même sous-ligne) — ce que la classe du fluide impose en
  plus, indépendamment de son PRP. En préparation, aucun lien.

## Consignes suivies pour la production

- Gabarit F-Gaz 3 / aptitude-capacite repris à l'identique : 12 écrans
  navigables, une narration `data-narration` par écran décrivant le VISUEL
  (jamais une relecture du texte), quiz interactif, une illustration par
  écran.
- Sortie HTML/SVG uniquement, aucun bitmap, aucune ressource externe dans
  les SVG.
- Police ≥ 15 px dans les SVG, aucun texte posé sur un tracé, une flèche ou
  un aplat sombre.
- Aucun nom propre, aucun établissement.
- Accent des illustrations : `#047857` (sous-ligne Impact environnemental) —
  distinct de `--sous-ligne` (`#0f766e`) qui reste celui du CSS partagé du
  réseau.

## ⚠️ À sourcer / ce qui reste à trancher

1. **Aucun facteur d'émission de l'électricité n'est chiffré** — volontaire :
   il dépend du pays et du réseau, et le prompt interdisait de l'inventer.
2. **Aucune durée de vie « typique » de machine n'est chiffrée** — volontaire,
   même raison.
3. **Aucun pourcentage de répartition direct/indirect n'est donné** — le
   mécanisme est enseigné, pas un barème.
4. **Le référentiel BTS d'adossement** (tâches professionnelles et savoirs
   associés, avec leurs codes) n'a pas été renseigné dans cette station : à
   compléter avant toute diffusion, conformément à la règle de vérification
   obligatoire du contenu pédagogique.
5. **La station attend sa relecture métier** par F. Henninot avant toute
   sortie du statut prototype.
