# Station « PRP & ODP » — FOND

> Réseau Législation · sous-ligne Impact environnemental · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions.
> **Statut : station produite le 24/08/2026, EN ATTENTE de relecture métier de
> F. Henninot** (attribut `data-prototype` sur marque.js dans index.html).
>
> Couleur d'accent de la sous-ligne (utilisée dans les SVG) : **#047857**.
> Ligne maison conservée : les mécanismes s'apprennent, les chiffres se
> vérifient sur une source en vigueur.

## Ce qui fait l'intérêt de cette station

Le piège le plus répandu du métier : « ce fluide ne touche pas l'ozone, donc
il est propre ». Cette station sépare explicitement les deux échelles — ODP
(ozone) et PRP (climat) — pour que l'élève ne confonde jamais l'une avec
l'autre, et sache appliquer la règle maison en cas de désaccord entre deux
sources sur un PRP.

## Objectif

À la fin de la station, l'élève de BTS sait distinguer l'ODP du PRP,
expliquer le mécanisme de chacun (chlore/brome pour l'ODP, rétention de
chaleur comparée au CO₂ pour le PRP), situer plusieurs fluides du métier sur
les deux échelles, et appliquer la règle du PRP le plus élevé en cas de
désaccord entre deux sources.

## Écran 1 — Deux impacts, deux mécanismes

Présente le piège général : ODP et PRP sont deux échelles indépendantes.
« Il ne touche pas l'ozone donc il est propre » est faux.
*Visuel : `svg/deux-echelles.svg` — deux cartes, ODP et PRP, séparées par un
signe « différent de », avec la phrase fausse barrée en bas.*

## Écran 2 — L'ODP : comment une molécule attaque l'ozone

Une molécule attaque l'ozone si elle contient du chlore ou du brome (CFC,
HCFC). Les HFC n'en contiennent pas : ODP nul.
*Visuel : `svg/mecanisme-odp.svg` — une molécule de CFC/HCFC entame la
couche d'ozone, une molécule de HFC la traverse sans l'abîmer.*

## Écran 3 — Le PRP : comment une molécule retient la chaleur

Échelle indépendante de l'ODP, comparée au CO₂ (référence = 1).
*Visuel : `svg/mecanisme-prp.svg` — une molécule dans l'atmosphère renvoie
une partie de la chaleur solaire vers le sol.*

## Écran 4 — Le piège concret : un fluide très utilisé

Le R-410A : ODP nul, PRP 2088 (valeur admise). Illustre le piège de l'écran 1
sur un cas réel du métier.
*Visuel : `svg/piege-odp-nul.svg` — un groupe au R-410A avec ses deux
étiquettes, ODP nul et PRP 2088, relié à un globe qui chauffe.*

## Écran 5 — Repère à deux échelles

Plusieurs fluides positionnés : ammoniac (PRP 0), CO₂ (PRP 1), propane
(PRP 3), R-32 (PRP 675), R-410A (PRP 2088), R-404A (PRP 3922), tous à ODP
nul ; une zone à droite représente les CFC/HCFC à ODP non nul, sans valeur
chiffrée.
*Visuel : `svg/repere-deux-axes.svg`.*

## Écran 6 — Cas métier : une même fuite, deux poids

Une chambre froide au R-404A et une chambre froide au CO₂, même masse fuie,
poids climatique très différent (PRP 3922 contre PRP 1).
*Visuel : `svg/cas-chambre-froide.svg`.*

## Écran 7 — Le raisonnement : quatre situations de terrain

Reprend les quatre cas des questions du quiz, en mode réflexion guidée.
*Visuel : `svg/quatre-situations.svg`.*

## Écran 8 — Bilan et le réflexe

ODP (ozone, chlore/brome) et PRP (climat, échelle CO₂) ; règle du PRP le
plus élevé en cas de désaccord ; réflexe final : ODP nul ne veut jamais dire
« propre ».
*Visuel : `svg/bilan-prp-odp.svg`.*

## Les 4 questions (quiz)

**Q1.** Un fluide a un ODP nul et un PRP de 2088. Que peut-on en conclure ?
- a) Il ne détruit pas l'ozone, mais il réchauffe fortement le climat s'il fuit ✔
- b) Il ne présente aucun risque environnemental
- c) Un PRP aussi élevé voudrait dire qu'il attaque l'ozone
- d) Un ODP nul rendrait son PRP sans importance
*Explication : un PRP de 2088 est un risque climatique réel, pas une absence
de risque. Le PRP ne renseigne pas sur l'ozone — ce sont deux mécanismes
séparés. Et un ODP nul ne rend pas le PRP sans importance : c'est justement
le piège de la station.*

**Q2.** Qu'est-ce qui rend l'ODP d'une molécule différent de zéro ?
- a) Une teneur élevée en fluor
- b) Une masse molaire élevée
- c) La présence de chlore ou de brome dans la molécule ✔
- d) Le fait d'être utilisé en circuit direct plutôt qu'indirect
*Explication : le fluor ne casse pas l'ozone — les HFC en contiennent et ont
un ODP nul. La masse molaire n'entre pas dans ce mécanisme. Direct/indirect
est une question d'installation, pas de chimie de la molécule.*

**Q3.** Deux sources donnent deux PRP différents pour un même fluide. Quelle
règle appliquer ?
- a) Faire la moyenne des deux valeurs
- b) Retenir la valeur la plus élevée ✔
- c) Retenir la valeur la plus ancienne
- d) Retenir la valeur la plus basse, par prudence commerciale
*Explication : la moyenne masquerait une partie du risque réel. L'ancienneté
d'une source ne dit rien de sa fiabilité. Retenir la valeur la plus basse
minimiserait l'impact affiché — la règle maison retient toujours la valeur
la plus pénalisante.*

**Q4.** Ammoniac R-717 (PRP 0) contre R-404A (PRP 3922), même masse fuie par
une fuite identique : que peut-on dire de leur impact climatique ?
- a) Impact identique, seule la masse compte
- b) La fuite d'ammoniac pèserait plus lourd, car son ODP est nul (confusion ODP/PRP)
- c) Aucune fuite n'aurait d'impact climatique, seul l'ODP compterait
- d) La fuite au R-404A pèse beaucoup plus lourd en équivalent CO₂ ✔
*Explication : la masse ne suffit pas à juger l'impact, c'est masse × PRP qui
compte. L'ODP nul de l'ammoniac ne dit rien de son PRP — c'est confondre les
deux échelles. Le PRP existe indépendamment de l'ODP : dire que seul l'ODP
compterait est faux.*

## Maillage (correspondances de la station)

- **F-Gaz 3** (même réseau, station ouverte) — pourquoi les catégories
  bougent : le règlement pousse vers le CO₂ et l'ammoniac. Lien réel.
- **La RE2020** (sous-ligne Thermique, en préparation) — l'indicateur
  carbone qui intègre le cycle de vie complet, PRP des fluides compris.
- **NF EN 378** (en préparation) — ce que la classe du fluide impose en plus.

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

- L'horizon temporel de calcul du PRP (par ex. « sur 100 ans ») n'est écrit
  nulle part dans le HTML : non fourni par la commande, non sourcé ici.
- La valeur d'ODP précise des CFC et HCFC n'est jamais donnée : seule la
  mention « non nul » est utilisée, conformément à la consigne.

---

## ⚠️ Ce qui reste à trancher avant diffusion

1. **La station n'a pas encore été relue par F. Henninot** — `data-prototype`
   est posé sur `marque.js` dans `index.html` tant que ce n'est pas fait.
2. **Le référentiel BTS d'adossement** n'étant pas tranché, aucun code de
   tâche professionnelle ou de savoir associé n'est inséré dans cette
   station — à faire quand le référentiel cible sera choisi, comme pour les
   autres stations du réseau.
3. **Voix** : aucun audio n'est encore fabriqué ; la station parle avec la
   voix du navigateur. Fabrication Piper (locale) à faire après validation
   du fond, comme pour `aptitude-capacite`.
