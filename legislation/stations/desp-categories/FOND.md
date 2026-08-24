# Station « Catégories I à IV » — FOND

> Réseau Législation · sous-ligne Fluidique & thermique · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions.
> Sujet : la DESP, les catégories d'équipements sous pression I à IV.
> **Aucun seuil chiffré de pression, de volume ou de catégorie n'est donné
> nulle part dans cette station : seule la LOGIQUE du croisement
> pression × volume × groupe du fluide est enseignée.** C'est un domaine
> piégeux — les tableaux réels dépendent de seuils précis par groupe de
> fluide, que cette station ne prétend pas reproduire.

## Ce qui fait l'intérêt de cette station

Beaucoup de frigoristes connaissent le marquage CE sans savoir pourquoi
un réservoir est classé plus haut qu'un autre, identique, rempli d'un
fluide différent. C'est ce mécanisme — et non un barème à mémoriser —
que la station enseigne : la catégorie DESP se lit sur la plaque, elle
ne se devine ni ne se recalcule sur le terrain.

## Objectif

À la fin de la station, l'élève de BTS sait situer un équipement sous
pression (bouteille, réservoir, séparateur) dans la logique du classement
DESP, expliquer pourquoi la pression, le volume et le groupe du fluide se
croisent, pourquoi la catégorie borne le niveau de contrôle exigé, et
pourquoi deux équipements identiques peuvent relever de catégories
différentes selon ce qu'ils contiennent.

## Écran 1 — La DESP : quels équipements sont concernés

La directive européenne relative aux équipements sous pression (DESP)
encadre la conception, la fabrication et le contrôle des équipements qui
contiennent un fluide sous pression, dès que leur pression maximale
admissible (PS) dépasse un seuil fixé par le texte. En dessous,
l'équipement n'entre pas dans son champ.

Équipements croisés par un frigoriste : bouteille de fluide frigorigène,
réservoir tampon, bouteille anti-coup de bélier, séparateur d'huile.

*Visuel : `svg/desp-champ.svg` — trois équipements schématisés (bouteille,
réservoir, séparateur), une flèche vers un badge « DESP », une bande du
bas rappelant la règle d'entrée sans indiquer de valeur de PS.*

## Écran 2 — Trois critères croisés, pas un seul

La catégorie résulte du croisement de trois éléments : la PS, le volume
(ou le diamètre pour une tuyauterie), et le groupe du fluide. Changer un
seul des trois peut suffire à changer la catégorie.

*Visuel : `svg/trois-criteres.svg` — trois cartes (PS, volume/diamètre,
groupe du fluide) reliées par des flèches convergentes à une case unique
« la catégorie, de I à IV ».*

## Écran 3 — Le groupe du fluide : dangereux ou non

Groupe 1 = fluide dangereux (explosif, inflammable, toxique, comburant).
Groupe 2 = les autres. C'est le même repère de dangerosité que celui de
la norme NF EN 378 (A1, A2L, A2, A3, B1, B2L, B2, B3) : un fluide
inflammable ou toxique au sens de cette norme relève du groupe 1 de la
DESP.

*Visuel : `svg/groupes-fluide.svg` — deux colonnes (groupe 1 en rouge,
groupe 2 en vert) et une bande rappelant le repère commun avec NF EN 378.*

## Écran 4 — Le diagramme croisé : la frontière qui bouge

Deux axes qualitatifs (pression en abscisse, volume/diamètre en
ordonnée), sans aucune graduation chiffrée. Les catégories I à IV se
succèdent en s'éloignant de l'origine. Le groupe du fluide déplace la
frontière entre catégories : pour un fluide du groupe 1, une combinaison
pression-volume plus modeste suffit déjà à atteindre une catégorie plus
haute.

*Visuel : `svg/diagramme-croise.svg` — repère à deux axes sans chiffres,
deux lignes de frontière (tirets rouges pour le groupe 1, trait plein
vert pour le groupe 2), légende qui explique chaque ligne par son tracé
et pas seulement par sa couleur.*

## Écran 5 — Plus la catégorie monte, plus le contrôle est lourd

En catégorie I, le fabricant peut assurer seul l'évaluation de
conformité. Plus on monte vers la catégorie IV, plus l'intervention d'un
organisme extérieur (organisme notifié) devient nécessaire, jusqu'à
l'inspection par un tiers pour les catégories les plus hautes. Les
catégories intermédiaires (II, III) sont décrites de façon volontairement
générale (« contrôle un peu plus poussé », « l'organisme notifié
intervient davantage ») car leur mécanisme précis n'est pas sourcé ici.

*Visuel : `svg/echelle-categories.svg` — quatre marches montantes, la
première étiquetée « évaluation assurée par le fabricant seul », la
dernière « inspection par un organisme notifié », une flèche montrant la
croissance du contrôle.*

## Écran 6 — Un même réservoir, deux fluides, deux catégories

Un réservoir tampon (ou une bouteille anti-coup de bélier) de PS et de
volume identiques peut relever de deux catégories différentes selon le
groupe du fluide qu'il contient. Le fluide change la catégorie, pas
seulement le contenant.

*Visuel : `svg/meme-reservoir-deux-fluides.svg` — deux cartes du même
réservoir, mêmes PS et volume affichés, un fluide groupe 2 à gauche
(catégorie plus basse) et un fluide groupe 1 à droite (catégorie plus
haute).*

## Écran 7 — Ce qui accompagne l'équipement

Marquage CE, déclaration de conformité du fabricant, notice
d'instructions, et accessoires de sécurité (protection contre le
dépassement de la PS) : ces quatre éléments accompagnent l'équipement
conforme à la DESP.

*Visuel : `svg/accompagnement-equipement.svg` — un équipement central relié
à quatre éléments (CE, déclaration, notice, accessoire de sécurité).*

## Écran 8 — Le réflexe : lire la plaque et la notice

La catégorie est déterminée par le fabricant à la conception ; elle
figure sur la plaque signalétique et dans la documentation. Le réflexe
professionnel : vérifier la plaque et la notice avant d'intervenir.

*Visuel : `svg/plaque-reflexe.svg` — plaque signalétique à quatre champs
vides (PS, volume, fluide, catégorie — aucune valeur inventée) et une
notice du fabricant à côté.*

## Les 4 questions (quiz)

> Règle maison : bonnes réponses mélangées, longueurs équilibrées.

**Q1.** Quels trois éléments se croisent pour donner la catégorie d'un
équipement ?
- a) Seulement la pression maximale admissible (PS)
- b) Le volume et la marque du fabricant uniquement
- c) La PS, le volume (ou le diamètre), et le groupe du fluide ✔
- d) Le groupe du fluide et la date de fabrication
*Explication : la catégorie ne se lit jamais sur un seul critère — c'est
le croisement de la pression, du volume (ou du diamètre) et du groupe du
fluide qui la détermine.*

**Q2.** Qu'est-ce qui distingue le groupe 1 du groupe 2 ?
- a) Le groupe 1 rassemble les fluides dangereux (explosif, inflammable,
  toxique, comburant), le groupe 2 les autres ✔
- b) Le groupe 1 concerne les gros volumes, le groupe 2 les petits
- c) Le groupe 1 est réservé aux fluides frigorigènes, le groupe 2 aux
  autres fluides
- d) Le groupe 1 dépend du fabricant, le groupe 2 dépend de l'installateur
*Explication : le groupe 1 rassemble les fluides dangereux au sens de la
DESP — la même dangerosité qui structure le classement NF EN 378 des
fluides frigorigènes.*

**Q3.** Un réservoir tampon change de fluide, sans changer de PS ni de
volume. Sa catégorie…
- a) Ne peut jamais changer, elle est fixée à la construction
- b) Change uniquement si le réservoir change de couleur
- c) Dépend désormais de la date de la dernière visite
- d) Peut changer, car le groupe du fluide fait partie du classement ✔
*Explication : à PS et volume identiques, un changement de fluide peut
suffire à changer la catégorie — le groupe du fluide est un des trois
critères du classement.*

**Q4.** Plus la catégorie DESP d'un équipement est élevée, qu'est-ce que
cela change ?
- a) Rien : le contrôle est identique quelle que soit la catégorie
- b) L'intervention d'un organisme extérieur devient nécessaire, jusqu'à
  l'inspection par un tiers ✔
- c) L'équipement n'a plus besoin de marquage CE
- d) Seule la couleur réglementaire de l'équipement change
*Explication : plus la catégorie monte, plus le contrôle est lourd —
d'une auto-certification du fabricant en catégorie basse jusqu'à
l'inspection par un organisme notifié dans les catégories les plus
hautes.*

## Maillage (correspondances de la station)

- **NF EN 378** (même sous-ligne, en préparation) — le groupe de fluide au
  sens de cette norme (A1, A2L, A2, A3, B1, B2L, B2, B3) alimente
  directement la notion de dangerosité utilisée par le classement DESP :
  la correspondance est directe.

Pas de lien vers `fgaz-3` ni vers les autres stations DESP : elles ne
sont pas encore ouvertes sur le plan du réseau. La station « Sprinkler &
RIA » n'est volontairement pas mentionnée ici — elle l'est ailleurs dans
le réseau (station desp-la-directive).

## Consignes pour la production (à joindre au moment de l'envoi)

- Charte : projet « Charte graphique inerWeb ». Couleur d'accent utilisée
  dans les SVG de cette sous-ligne : **#0c4a6e**. La variable CSS
  `--sous-ligne` de `styles.css` reste en revanche à **#0f766e** (teinte
  de la sous-ligne Fluidique & thermique, copiée à l'identique du gabarit
  aptitude-capacite, volontairement inchangée).
- Gabarit repris : structure identique à la station `aptitude-capacite`
  (12 écrans navigables, `data-narration` par écran, quiz interactif,
  fondu entre écrans).
- **Voix** : aucun audio fabriqué pour l'instant — narration au moteur du
  navigateur, comme le gabarit.
- Sortie HTML/SVG uniquement, jamais de bitmap.
- Police lisible à l'impression A4 noir et blanc (≥ 15 px dans les SVG,
  taille du corps héritée de `styles.css`).
- Aucun texte posé sur un tracé, une flèche ou un aplat sombre.
- Aucun nom propre, aucun établissement — non-nominatif strict.
- **Huit SVG produits** (un par écran, voir liste ci-dessus).

---

## ⚠️ Ce qui reste à trancher avant production

1. **Aucun seuil chiffré n'a été inclus, par choix de méthode** : ni les
   valeurs de PS, ni les volumes (ou diamètres), ni le détail exact des
   tableaux de catégories par groupe de fluide. Ce sont des valeurs
   réglementaires précises qui doivent être vérifiées sur le texte de la
   directive DESP (2014/68/UE) en vigueur avant toute version qui les
   afficherait — cette station ne les affiche pas et n'a donc pas eu
   besoin de les sourcer.
2. **Écran 5 (les catégories intermédiaires II et III)** : le mécanisme de
   contrôle exact à ces deux niveaux (quel type d'intervention, à quel
   moment de la vie de l'équipement) n'est pas sourcé ici et reste décrit
   de façon volontairement générale. À préciser si une source fiable est
   identifiée.
3. **Écran 4 (le diagramme croisé)** : la forme exacte de la frontière
   entre catégories (linéaire, par paliers, etc.) n'est pas connue et
   n'est donc pas affirmée — le diagramme reste qualitatif, sans
   graduation, comme demandé.
4. **Le référentiel BTS d'adossement** n'étant pas tranché, aucun code de
   tâche ou de savoir associé n'est inséré dans cette station.
