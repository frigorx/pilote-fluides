# Reprise du 19 août 2026 — charte, fond, voix

> ⚠️ **Sa section 3 est CADUQUE.** Les illustrations fixes ont été remplacées le
> 20/08 par le film lui-même, qui tourne dans le module — voir
> `REPRISE-ANIMATION-2026-08-20.md`. Le reste de ce journal (charte, voix, fond
> mécanique, codes du référentiel) reste valable.

Reprise du pack `PACK-PRESSOSTATS-KP1-KP5-KP15-2026-08-19` à la demande de F. Henninot :
« mettre la charte inerWeb, corriger, regarder ce que ça dit, pédagogie et intérêts
mécaniques », puis « la fonction vocale, c'est vraiment important : j'ai des élèves qui ne
lisent pas ».

Versions : KP1 `2.4.0-brouillon` · KP5 `1.4.0-brouillon` · KP15 `1.2.0-brouillon`.

## 1. Charte inerWeb

La palette était déjà celle de la charte. Ce qui manquait :

- **le logo**. Une pastille ronde « iW » tenait lieu de marque. Elle est remplacée par le
  logo gravé en version compacte (§ 3.4 de la charte) : ❄️, « iner » en Trebuchet gras,
  « Web » en Segoe Script, ligne et cartouche orange `#e8914a` — l'orange DU LOGO, distinct
  de l'orange de contenu. Le cartouche porte le mot du module : `BP`, `HP`, `HP · BP`. Le
  canevas est resserré à droite pour tenir dans une barre de 48 px ; les cotes internes de
  la charte ne bougent pas ;
- **le filet** `--line` passe de `.18` à `.16`, la valeur de la charte ;
- **la présence à l'impression**. La barre du haut était masquée en `@media print` : un
  document sorti du navigateur partait donc sans logo, ce que la charte interdit. La barre
  reste imprimée, sans les outils, et une signature `© inerWeb 2026` ferme la page ;
- sous 650 px, le nom du module disparaît de la barre : le cartouche du logo le porte déjà.

## 2. Voix — trois trous comblés

Le module lisait le texte de la leçon, et rien d'autre. Pour un élève qui ne lit pas :

- **l'illustration n'était pas décrite**. La voix énonce maintenant « Ce que montre
  l'illustration », suivi du texte équivalent et de la note de contexte ;
- **les réponses du quiz n'étaient pas lues**. La question l'était, pas les trois choix : on
  entendait la question sans pouvoir choisir. Elles sont dites « Réponse 1 », « Réponse 2 »,
  « Réponse 3 » ;
- **la légende du schéma interactif** n'était pas lue sur les écrans sans illustration ;
- le titre de l'encadré était collé à son texte (« Le piègeUn pressostat… ») : séparés.

Deux ajouts :

- **lecture suivie**. « Écouter » arme la voix pour tous les écrans suivants, « Stop » la
  désarme. Un élève qui ne lit pas n'a plus à retrouver le bouton 26 fois. Changer d'onglet
  relance la lecture avec la nouvelle description ;
- **normalisation des symboles**. `1–4` se disait « moins trois » ; il se dit « un quatre ».
  `×` → « fois », `−` → « moins », `→` → « puis », `=` → « égale », `·` → virgule.

## 3. Illustrations refaites sur les valeurs du cours

Décision de F. Henninot : refaire les illustrations plutôt que d'aligner le cours sur elles.
Fait **sans passer par Claude Design**, donc sans quota : les valeurs sont des *props* du
composant (`cutIn`, `diff` en BP ; `cutOut`, `diff` en HP), et le temps est une entrée pure du
rendu. Un banc local remonte le composant avec React et la bibliothèque `animations-v3`,
**fige le temps auteur** et capture l'image. Les 17 vues sont re-rendues en 1920 × 1081, la
définition d'origine.

Ce que le re-rendu corrige :

- **les chiffres**. BP : CUT IN 1,4 · DIFF 1,2 · CUT OUT 0,2. HP : CUT OUT 24 · DIFF 3 ·
  CUT IN 21. Les mêmes que le cours, partout, sur toutes les vues ;
- **le différentiel fantôme**. Les vues `05-reglage` affichaient 1,6 bar en BP et 6,4 en HP.
  Ce n'était pas une faute de saisie : la scène de réglage fait *varier* le différentiel pour
  montrer la vis qui tourne — `diffShown` va de `diff` à `diff × 1,6` puis revient. La capture
  d'origine avait été prise au milieu de cette démonstration. Le banc capture après le retour,
  à `Reglage + 9,8 s` : la valeur est la bonne, et la ligne
  `CUT OUT = CUT IN − DIFF` est affichée ;
- **le texte tronqué**. L'étiquette « B — échelle DIFF » que le panneau de pression coupait
  s'estompe avant l'instant retenu : plus de chevauchement ;
- **un chevauchement créé par les nouvelles valeurs**. Avec CUT OUT à 0,2 bar, l'étiquette du
  seuil tombait sur la borne « 0,0 bar » de l'échelle. Une borne d'échelle s'efface désormais
  quand une étiquette de seuil vient à sa hauteur. Ce correctif est **dans le banc de rendu** ;
  la source Design de `SOURCES-CLAUDE/` reste intacte ;
- **la barre du lecteur** et le liseré de la page : la capture porte sur la composition
  elle-même, plus sur la page qui l'affiche ;
- **une légende en avance**. Sur `04-seuils`, « Elle atteint 1,4 bar : CUT IN » s'affichait
  avant que le contact ait basculé. L'instant retenu montre le contact refermé et le
  compresseur reparti.

`05-reglage` **revient donc dans KP1 et KP5** : les deux motifs de son retrait sont levés.

**KP15 `06-reglage` reste écartée**, et pas pour ses chiffres. Le composant `pressostat-dual`
paramètre le côté BP par son CUT OUT (`cutOutBp`) et l'affiche ainsi : « RANGE BP → CUT OUT ».
Le module enseigne l'inverse, comme le KP1 et comme la convention Danfoss du côté LP :
l'échelle RANGE porte le CUT IN, et CUT OUT = CUT IN − DIFF. Une illustration qui contredit
son propre cours ne revient pas tant que le composant n'est pas repris. Les trois autres vues
KP15 conservées en référence gardent les valeurs d'origine ; elles ne sont ni affichées ni
publiées.

## 4. Textes équivalents corrigés

`04-seuils.png`, en KP1 comme en KP5, annonçait « un repérage graphique de CUT OUT, CUT IN
et de l'intervalle ». L'image montre le mécanisme et le contact. Un élève au lecteur d'écran
— ou à la voix du module — recevait une description fausse. Les deux `alt` disent maintenant
ce que l'image montre.

Les illustrations et le cours travaillent maintenant sur les mêmes chiffres : plus rien à
signaler dans les notes, plus rien à réconcilier pour l'élève.

## 5. Fond — l'intérêt mécanique

Ce que le parcours décrivait sans l'expliquer :

- **`F = p × S`**. La relation n'apparaissait nulle part. Elle explique pourquoi le soufflet
  BP est large et souple, le soufflet HP petit et raide, et pourquoi une prise HP et une
  prise BP ne s'échangent pas ;
- **pourquoi un soufflet et pas un piston** : étanche par sa seule déformation, donc pas de
  joint qui frotte, qui grippe ou qui fuit ;
- **à quoi sert l'action brusque** : sans elle, le contact resterait entrouvert autour du
  seuil — arc électrique, échauffement, pastilles collées ;
- **le court-cycle**. C'est la raison d'être du différentiel, et le mot n'était pas dans le
  cours — il était pourtant écrit dans la légende de `06-cycle.png`. Différentiel trop
  étroit : le compresseur démarre et s'arrête en boucle et s'use ;
- **bar Pe**. Les plages sont données en bar Pe, y compris `−0,2 bar Pe`. Rien ne disait
  qu'il s'agit de la pression lue au manomètre, nulle à l'air libre, et qu'une valeur
  négative est une dépression ;
- **la hiérarchie de sécurité HP** (KP5 et KP15) : le pressostat coupe, la soupape s'ouvre
  ensuite, la pression maximale admissible PS reste au-dessus des deux ;
- **KP15, le mot « série »**. L'écran disait « pas de parallèle » sans nommer le montage
  réel. Les deux contacts d'autorisation sont en série : un seul contact ouvert coupe ;
- **KP15, vocabulaire du réarmement**. Un écran disait « seuil de retour », l'autre « seuil
  de réarmement », pour la même chose sur un manuel maximum. Unifié sur « réarmement ».

Deux questions ajoutées au quiz : le court-cycle en KP1, la hiérarchie de sécurité en KP5.
Neuf questions par module au lieu de huit.

## 6. Codes du référentiel

Aucun module n'affichait de code. Chacun porte maintenant, dans l'écran de bilan et dans un
`couverture.json` lisible par le registre du site :

| Module | Enseigné | En appui |
|---|---|---|
| KP1 BP | 6.03 · 9.06 | 1.01 · 1.04 · 3.01 · 4.05 · 6.07 |
| KP5 HP | 6.03 · 7.04 · 9.06 | 1.01 · 1.04 · 3.01 · 4.05 · 6.07 |
| KP15 | 6.03 · 7.04 · 9.06 | 1.01 · 1.04 · 3.01 · 4.05 · 6.07 |

Référentiel : arrêté du 21 novembre 2025, annexe II. **Adossement proposé par lecture des
libellés, non validé.** 6.03 « régler les interrupteurs de sécurité et de contrôle », 7.04 le
même libellé côté condenseur, 9.06 « régler un limiteur de pression mécanique ou
électronique ». Si les modules doivent aussi servir en CAP IFCA ou en Bac MFER, les codes de
ces référentiels-là restent à ajouter.

## 7. Ce qui n'est pas parti sur le site

`SOURCES-CLAUDE/Animations pressostat KP1 KP5 KP15.zip` contient `scraps/zoom-bornier.png`,
`scraps/zoom-plaque-bp.png`, `scraps/zoom-plaque-hp.png` et `uploads/pasted-*.png` — les
images tierces que la passation dit exclure, et qui voyagent pourtant dans l'archive. Elles
restent hors de la copie publiée. Les illustrations écartées non plus ne sont pas copiées :
laissées en place, elles auraient été atteignables par leur adresse directe.

## 8. QA

185 contrôles statiques et 2 051 contrôles navigateur, tous verts. Les compteurs codés en dur
dans les QA ont suivi le contrat : 9 questions, 7 illustrations en KP1 et KP5, 3 en KP15.

## 9. Ce qui reste à trancher

1. **KP15, la plaque BP.** Le composant `pressostat-dual` lit l'échelle RANGE du côté BP
   comme un CUT OUT. Tant que ce n'est pas repris à la source, sa vue de réglage reste
   écartée du module.
2. **`060-205191`, `060-117166`, `060-121266`, `060-126491`** : références et plages non
   vérifiées sur notice ici. Le pack les donne déjà comme exemples, à confirmer.
3. **`1 tour de tige BP ≈ 0,7 bar` et `tige HP ≈ 2,3 bar`**, attribués à Danfoss dans les
   illustrations : à vérifier sur la notice de la référence réellement posée.
4. **L'ancien dépôt `frigorx.github.io/inerweb-pressostats`** : F. Henninot veut les deux en
   place — celui-là relève de l'autoformation, ces trois modules sont un support de cours.
   Reste à décider comment le plan les distingue pour le visiteur.
