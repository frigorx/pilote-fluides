# Station « Risque chimique » — FOND

> Réseau Législation · sous-ligne Risques professionnels · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions.
> Accent de la sous-ligne : **#c2410c**.

## Ce qui fait l'intérêt de cette station

Le risque chimique en froid et climatisation ne se limite pas au fluide
frigorigène : solvants de nettoyage, flux de brasage, huile récupérée sont
des produits chimiques ordinaires du métier. La station apprend à lire une
FDS et un pictogramme plutôt qu'à mémoriser une liste de produits dangereux.

## Objectif

À la fin de la station, l'élève de BTS sait lire une fiche de données de
sécurité, comprendre qu'un pictogramme commande un geste précis, dire ce que
signifie qu'un produit est classé CMR, et situer ces risques dans des gestes
concrets du métier : brasage, nettoyage au solvant, huile récupérée.

## Écran 1 — La fiche de données de sécurité (FDS)

Le fournisseur remet une FDS pour tout produit chimique : dangers,
précautions d'emploi, conduite à tenir. Réflexe : la consulter avant usage.

*Visuel : `svg/chimique-fds.svg` — un bidon et sa fiche, trois zones
nommées.*

## Écran 2 — Le losange, un danger

Les pictogrammes de danger sont des losanges à bord épais, chacun avec une
silhouette désignant une famille de danger.

*Visuel : `svg/chimique-pictogrammes.svg` — quatre pictogrammes nommés.*

## Écran 3 — Un pictogramme change le geste

Face à un pictogramme inflammable : éloigner toute source d'inflammation,
ventiler le local.

*Visuel : `svg/chimique-picto-geste.svg` — le pictogramme relié à deux
conséquences.*

## Écran 4 — Les substances CMR

Cancérogène, mutagène, reprotoxique : trois dangers distincts, à vérifier
sur la FDS, jamais sur la mémoire qu'on a d'un produit.

*Visuel : `svg/chimique-cmr.svg` — trois cartes C, M, R.*

## Écran 5 — Le réflexe : la FDS le dit, pas la mémoire

La classification exacte d'un produit se lit, elle ne se devine pas.

*Visuel : `svg/chimique-reflexe-fds.svg` — un bidon à point d'interrogation
relié à sa FDS.*

## Écran 6 — Le brasage en local technique dégage des fumées

Le flux et l'oxydation du métal chauffé imposent une ventilation du local.

*Visuel : `svg/chimique-brasage-fumees.svg` — une torche, un panache de
fumée, une flèche de ventilation.*

## Écran 7 — Solvant de nettoyage et huile récupérée

Le solvant expose la peau et les voies respiratoires ; l'huile récupérée
est un déchet chimique.

*Visuel : `svg/chimique-solvant-huile.svg` — un flacon, une silhouette
exposée, une goutte d'huile étiquetée.*

## Écran 8 — Bilan et le réflexe

- La FDS décrit les dangers, les précautions, la conduite à tenir.
- Un pictogramme commande un geste précis, il n'est pas décoratif.
- Un produit CMR peut être cancérogène, mutagène ou reprotoxique.
- Brasage, solvants, huile récupérée sont des risques chimiques ordinaires
  du métier.
- La classification d'un produit se lit sur la FDS, elle ne se devine pas.

*Visuel : `svg/chimique-bilan.svg` — une fiche à trois cases cochées.*

## Les 4 questions (quiz)

**Q1.** Avant d'utiliser un produit chimique inconnu, quel est le réflexe ?
- a) Consulter sa fiche de données de sécurité (FDS) ✔
- b) Sentir le produit pour juger s'il est dangereux
- c) Demander à un collègue s'il l'a déjà utilisé
- d) L'utiliser normalement, la prudence suffit
*Explication : sentir un produit, se fier au souvenir d'un collègue, ou
« faire attention » ne renseignent pas sur ses dangers réels.*

**Q2.** Un pictogramme de danger sur un bidon sert à…
- a) Décorer l'emballage du produit
- b) Indiquer un danger précis et donc le geste à adopter (ventiler,
  éloigner une flamme, se protéger) ✔
- c) Indiquer uniquement le pays de fabrication
- d) Remplacer la lecture de la FDS
*Explication : le pictogramme signale un danger précis et le geste qui en
découle ; il complète la FDS, il ne la remplace pas.*

**Q3.** Que signifie qu'un produit est classé CMR ?
- a) Qu'il est corrosif, moisi et radioactif
- b) Qu'il est réservé aux usages militaires
- c) Qu'il peut être cancérogène, mutagène, ou toxique pour la
  reproduction ✔
- d) Qu'il est classé comme combustible à risque
*Explication : CMR signifie cancérogène, mutagène, reprotoxique — les
autres propositions n'ont rien à voir avec la classification réelle.*

**Q4.** Pourquoi un brasage en local technique doit-il être ventilé ?
- a) Pour refroidir plus vite la pièce brasée
- b) Pour éviter la buée sur les lunettes du technicien
- c) Pour économiser le gaz de la torche
- d) Parce que le flux et l'oxydation du métal chauffé dégagent des fumées
  à évacuer ✔
*Explication : la ventilation évacue les fumées produites par le flux et le
métal chauffé, pas pour les raisons de confort ou d'économie proposées.*

## Maillage (correspondances de la station)

- **L'habilitation** (sous-ligne Électrique, en préparation) — la règle
  d'un côté, le geste protégé de l'autre.

## Points non chiffrés (à sourcer)

- Toute valeur limite d'exposition (VLEP) pour un produit du métier — non
  donnée.
- Toute classification H-phrase ou catégorie CMR précise pour un produit
  nommé (fluide, huile, flux de brasage, solvant) — non donnée ; la station
  renvoie systématiquement à la FDS du produit réellement utilisé.
- La liste complète des pictogrammes SGH n'est pas illustrée : seuls quatre
  exemples représentatifs sont dessinés, faute d'espace pédagogique pour
  les huit familles.
