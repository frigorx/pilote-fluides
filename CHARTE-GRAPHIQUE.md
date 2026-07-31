# Charte graphique inerWeb — application au pack fluides

> ## 📐 La source est ailleurs
>
> Depuis le 31/07/2026, la doctrine vit dans **`C:\git\usine-contenu\00-charte\CHARTE-GRAPHIQUE-INERWEB.md`**.
> C'est **la charte graphique par défaut de tous les projets** — elle fait foi.
>
> **Ce document-ci reste utile pour deux choses**, qui lui sont propres :
> - il **mesure** l'état du pack fluides (§ 10 : les écarts constatés fichier par fichier) ;
> - il donne les **chemins et les usages locaux** (le bouton « Aa », les 8 expériences).
>
> **En cas de divergence sur une règle, c'est la source qui gagne.** Toute règle nouvelle
> s'écrit d'abord là-bas.

> **À quoi sert ce document.** C'est la référence unique du style visuel du projet, et surtout
> **le cahier des charges à donner en entrée quand on fait produire une expérience interactive
> ailleurs** (§ 9 : bloc à coller tel quel).
>
> **La charte a TROIS volets, et il ne faut pas les confondre :**
> - **§ 3 à § 6 — l'écran.** Fond crème, aplats de couleur, ombres : ce qui rend une page
>   agréable et chaleureuse à lire sur un écran ou en projection.
> - **§ 7.1 à 7.4 — l'impression d'une page web.** La feuille `moteur/impression.css`.
> - **§ 7.5 et 7.6 — les documents texte** (Word, PDF) produits par l'usine de contenu.
>
> Les deux derniers volets suivent la même règle, et ce **n'est pas une charte noir et
> blanc** : la couleur reste — titres, filets, badges — parce qu'elle coûte quelques gouttes
> et qu'un document imprimé en couleur doit être agréable. Ce sont les **surfaces** qui
> partent. Mais la couleur **ne porte jamais seule** une information : mesuré au § 7.0, le
> vert et le rouge de la charte sont indiscernables une fois photocopiés.
>
> Il décrit ce qui **est**, pas un idéal : toutes les valeurs ci-dessous sont extraites des
> fichiers réels (`moteur/charte-edu.css` et les 8 expériences de `packs/fluides/res/`),
> mesurées le 31/07/2026. Les écarts constatés sont nommés au § 10 plutôt que masqués.
>
> F. Henninot · groupe Équatio Formation & Métiers · version 1.0

---

## 1. Pourquoi ce document existe

Trois expériences interactives (frise vivante, décryptage de nomenclature, Mission Bouteilles)
ont été produites hors du dépôt, puis intégrées. **Les trois sont arrivées avec exactement les
deux mêmes défauts**, corrigés trois fois à la main :

1. un **thème sombre** (bandeau, hero, panneaux en fond marine avec texte blanc) ;
2. les animations **et le son** conditionnés à `prefers-reduced-motion: reduce`, qui les
   supprime en silence sur une machine aux effets d'animation Windows désactivés — c'est-à-dire
   sur la machine du formateur.

Ces deux défauts ne relèvent pas du goût. Le premier casse la lisibilité en salle, à
l'impression et pour les publics DYS ; le second **fait disparaître la démonstration
elle-même**, sans message d'erreur. Une charte écrite les arrête à la source.

---

## 2. Le principe de fond

**Le support est clair et chaud, l'encre est sombre. Jamais l'inverse.**

Une seule chose à la fois à l'écran, un contraste franc, aucune information portée par la
couleur seule. Le public visé est divers — FLE, DYS, lecture fragile — et la page est autant
projetée en salle qu'imprimée.

---

## 3. Palette

### 3.1 Le noyau commun

Cinq des huit expériences le partagent déjà, à l'identique. **C'est la référence.**

| Rôle | Variable | Valeur | Usage |
|---|---|---|---|
| Identité, titres | `--navy-700` | `#1b3a63` | titres, libellés forts, bordures d'accent |
| Accent, alerte | `--orange` | `#ff6b35` | ce qui appelle l'action ou signale le piège |
| Accent appuyé | `--orange-deep` | `#c9451a` | texte orange sur fond clair (contraste) |
| Bleu vif | `--blue` | `#3d7fca` | éléments interactifs, états actifs |
| Bleu doux | `--blue-soft` | `#84b7ec` | remplissages secondaires |
| **Fond de page** | `--cream` | `#f7f1e7` | le fond général — **c'est lui qui donne la chaleur** |
| **Fond de carte** | `--paper` | `#fffdf8` | blanc cassé chaud, jamais `#ffffff` pur |
| Texte | `--ink` | `#10233c` | corps de texte |
| Texte secondaire | `--muted` | `#637285` | légendes, mentions |
| Filets | `--line` | `rgba(27,58,99,.16)` | bordures, séparateurs |

`--navy-700` et `--orange` sont **exactement** le `--bleu` / `--orange` du moteur
(`charte-edu.css`) : l'identité est déjà commune, seul le fond diffère (§ 10.1).

### 3.2 Les couleurs de sens

Elles ne sont **pas** décoratives : elles disent juste / faux / en attente. Elles sont
normées sur le moteur, parce que c'est ce que l'élève voit 90 % du temps.

| Sens | Variable | Trait | Fond |
|---|---|---|---|
| Acquis, correct | `--ok` | `#1e7e54` | `#e3f5ec` |
| Échec, danger | `--ko` | `#c0392b` | `#fbe7e4` |
| Fragile, en attente | `--attente` | `#b06a00` | `#fff4e0` |

> ⚠️ **Trois verts et trois rouges cohabitent aujourd'hui** dans le projet (§ 10.2).
> Toute nouvelle production utilise ceux-ci, et eux seuls.

**Règle non négociable** : un état se distingue par la couleur **et par un mot**. Jamais par la
couleur seule — c'est déjà la règle de « Ma progression » (acquise · fragile · à revoir ·
jamais testée), elle vaut partout.

### 3.3 Les valeurs sombres

`--navy-800` `#12345a` · `--navy-900` `#0b1f38` · `--navy-950` `#071426` existent dans le
projet et **restent autorisées — comme accents ponctuels seulement** : pastille, badge, pilule
de légende, petit bouton à texte blanc.

**Interdit** : un bandeau, un hero, un panneau, une zone de lecture ou un fond de page dans ces
valeurs. La règle porte sur **ce qu'on lit**, pas sur un badge de 40 pixels.

---

## 4. Typographie

| | Police | Notes |
|---|---|---|
| Titres | `"Trebuchet MS", Calibri, Arial, sans-serif` | graisse 700 (500 admise sur les très grands titres d'expérience) |
| Corps | `Calibri, "Segoe UI", system-ui, Arial, sans-serif` | 16-17 px, interligne 1.55-1.6 |
| Code, chronomètres, saisies | `Consolas, monospace` | chasse fixe |

- **Jamais de serif** (Georgia, Times). Les expériences en ont porté par héritage de leur
  fichier d'origine : repris le 31/07.
- **Jamais de police téléchargée depuis un CDN.** Une seule police est embarquée :
  `moteur/polices/Lexend-variable.woff2` (39 Ko, licence OFL), et uniquement pour la bascule DYS.
- Tracking négatif : `-.015em` au maximum sur les grands titres. Les `-.05em` hérités étaient
  pensés pour une serif et resserrent trop une Trebuchet.
- Taille de corps minimale pour un document élève : **14 pt**.

---

## 5. Formes et espacement

| | Valeur |
|---|---|
| Rayon standard (cartes, moteur) | `14px` |
| Rayon généreux (cartes d'expérience) | `20px` à `26px` |
| Pilules, badges, boutons ronds | `999px` |
| Ombre du moteur | `0 2px 10px rgba(27,58,99,.10)` |
| Ombre d'expérience | `0 22px 60px rgba(27,58,99,.12)` |
| Largeur de contenu | `min(1180px, 100% - 40px)` en expérience · `920px` en fiche |

Les ombres sont **bleutées**, jamais noires. Les cartes ont un filet (`--line`) **et** une
ombre : le filet tient à l'impression, où l'ombre disparaît.

---

## 6. Les quatre règles absolues

Ce sont celles qui ont déjà coûté des corrections. Elles ne se discutent pas au cas par cas.

### R1 — Aucun thème sombre en zone de lecture
Fond clair, texte sombre. Les accents colorés à texte blanc (badge, bouton, pastille) sont la
seule exception. Aucun `prefers-color-scheme: dark`, aucune bascule de thème.

### R2 — `prefers-reduced-motion` ne conditionne jamais du contenu
Si une animation **porte une information** (la nappe de gaz qui monte, les atomes qui
s'assemblent, la frise qui se trace), elle ne doit **jamais** être coupée par cette media query :
sur une machine Windows aux effets désactivés — celle du formateur — la démonstration
disparaîtrait sans un mot.
Le filet correct est **`@media print`** : à l'impression, on retire les éléments mobiles.
**Corollaire de conception** : le dessin **au repos doit déjà être l'image finale** ; l'animation
ne fait que raconter comment on y arrive. Valeurs de base = état final, les éléments mobiles
portent `.mobile`, l'état final porte `.final`.
Le **son** ne dépend que de son propre bouton — un réglage d'animation Windows n'exprime rien
sur une préférence sonore.

### R3 — Le bouton « Aa » sur toute page
Une seule ligne, avant `</body>` :
```html
<script src="../../../../moteur/lisibilite.js"></script>
```
Il pose le réglage de taille (70 → 160 %) et la bascule police DYS (Lexend), mémorisés en
`localStorage` et partagés entre toutes les pages. **Les 8 expériences l'ont** — une nouvelle
production qui ne l'a pas est incomplète.

### R4 — Rien de génératif, aucune dépendance externe
Les visuels techniques sont des **SVG faits main** (4 à 6 Ko), construits sur la bibliothèque de
symboles. Une image de modèle génératif sort un rendu plausible et faux — croix du frigoriste
inversée, manifold à trois manomètres — et flou en projection.
Aucun CDN, aucune police distante, aucun script tiers : le pack doit s'ouvrir en 4G et
fonctionner hors ligne en salle.

> **La Croix du Frigoriste, si un schéma de circuit apparaît** : détendeur à GAUCHE ·
> compresseur à DROITE · condenseur en HAUT · évaporateur en BAS. Condenseur à air simple,
> jamais de tour aéroréfrigérante.

---

## 7. Le volet papier — impression, PDF et documents Word

> **Règle directrice : le TRAIT porte le sens, pas la SURFACE.**
> Un filet de 3 px coûte une goutte d'encre ; un aplat de page en coûte une cartouche.
>
> **Ce n'est PAS une charte noir et blanc.** La couleur reste — dans les titres, les filets,
> les badges. Elle coûte quelques gouttes et rend un document imprimé en couleur agréable à
> lire. Ce sont les **surfaces** qui partent, pas la couleur.
>
> **Mais elle ne travaille jamais seule** : le document doit rester lisible en noir et blanc.

Ce que le § 3 rend chaleureux à l'écran devient coûteux sur papier : le fond crème s'imprime en
aplat gris, les encadrés pleins vident les cartouches. La version papier n'est pas une
dégradation de la version écran, c'est une **traduction** — et elle doit résister à une seconde
traduction, celle de la photocopieuse.

### 7.0 La mesure qui commande tout le reste

Converties en niveaux de gris — ce que fait une imprimante noir et blanc ou une photocopieuse —
nos couleurs tombent ici *(luma Rec. 601, et contraste sur fond blanc)* :

| Couleur | Hex | Gris | Contraste sur blanc |
|---|---|---:|---:|
| Texte `--ink` | `#10233c` | 13 % | 15,8:1 |
| **Bleu marine** (identité) | `#1b3a63` | 21 % | 11,5:1 |
| **Vert — acquis** | `#1e7e54` | 36 % | 5,0:1 |
| **Rouge — échec** | `#c0392b` | 38 % | 5,4:1 |
| Orange profond | `#c9451a` | 41 % | 4,8:1 |
| Gris `--muted` | `#637285` | 44 % | 4,9:1 |
| **Ambre — fragile** | `#b06a00` | 45 % | 4,3:1 |
| Bleu vif | `#3d7fca` | 45 % | 4,1:1 |
| Orange d'écran | `#ff6b35` | 57 % | **2,8:1** ⚠️ |

Deux conclusions, et ce sont des faits, pas des préférences :

1. **Le vert et le rouge sont à UN point de gris l'un de l'autre** (36 % contre 38 %). Sur une
   photocopieuse, un encadré « la clé » et un encadré « le piège » sortent **strictement
   identiques**. Les trois couleurs de sens tiennent dans neuf points de gris : aucune ne se
   distingue des autres une fois la couleur retirée.
   → **La couleur ne peut jamais être le seul canal.** Il en faut un deuxième qui survive au
   noir et blanc : le **style de trait**. Et un troisième, qui survit à tout : le **mot**.

2. **L'orange d'écran `#ff6b35` ne fait que 2,8:1 sur blanc**, sous le minimum de 4,5:1 exigé
   pour du texte. Il reste parfait en filet ou en aplat de bandeau à l'écran.
   → **Sur papier, l'orange de TEXTE est toujours `#c9451a`.** Jamais `#ff6b35`.

### 7.0 bis Les trois canaux

| | Canal 1 — couleur | Canal 2 — trait | Canal 3 — mot |
|---|---|---|---|
| Encadré neutre | bleu `#1b3a63` | **plein**, 2 px | *(le titre de l'encadré)* |
| Encadré « la clé » | vert `#1e7e54` | **double**, 5 px | 🔑 La clé |
| Encadré « le piège » | orange `#c9451a` | **tireté**, 4 px | ⚠ Le piège |
| Note formateur | orange `#c9451a` | **pointillé**, 1,5 px | NOTE FORMATEUR |
| Acquis | vert `#1e7e54` | **double** | « acquise » |
| Fragile | ambre `#b06a00` | **pointillé** | « fragile » |
| À revoir | rouge `#c0392b` | **tireté** | « à revoir » |

Imprimé en couleur, c'est joli. Photocopié en noir et blanc, le trait et le mot suffisent.
**C'est le test : si on retire toute la couleur, l'information doit rester entière.**

### 7.1 La feuille commune

Tout est dans `moteur/impression.css`. Une ligne à ajouter dans le `<head>`, après la feuille
de style de la page :

```html
<link rel="stylesheet" href="CHEMIN/moteur/impression.css" media="print">
```

Le `media="print"` fait que le fichier n'est même pas téléchargé tant qu'on n'imprime pas.

### 7.2 Ce qu'elle applique

| | À l'écran | À l'impression |
|---|---|---|
| Fond de page | `#f7f1e7` crème | **blanc pur** |
| Fond de carte, d'encadré, de badge | aplats colorés | **blanc**, le contour prend le relais |
| Ombres, dégradés, images de fond | présents | **supprimés** |
| Encadrés « clé » / « piège » | distingués par l'aplat | distingués par la **couleur du filet**, son **style de trait** et le **mot** |
| Badges, pastilles | fond plein, texte blanc | **contour coloré**, texte de la même couleur — le fond part, la couleur reste |
| Titres | `#1b3a63` | `#1b3a63` — conservé, un titre par page ne coûte rien |
| Corps de texte | `#10233c` | **noir pur** — choix d'encre : sur un jet d'encre, un bleu très foncé mobilise les 4 cartouches, le noir une seule |
| En-tête de tableau | aplat `#f3f7fb` | pas d'aplat : graisse + couleur + trait plus épais dessous |
| Lignes alternées | zébrure | **supprimée** — c'est la moitié du tableau à l'encre |
| Boutons, barres, widget « Aa », navigation | visibles | **masqués** — rien de cliquable sur du papier |
| Éléments animés (`.mobile`) | animés | **retirés** : le dessin au repos est déjà l'image finale |
| Liens externes | soulignés | l'**adresse est imprimée** entre parenthèses |
| Marges | — | `@page` 15 mm / 14 mm |
| Coupures | — | ni encadré, ni tableau, ni schéma coupé par un saut de page |

### 7.3 Le piège de l'export PDF

Par défaut, les navigateurs **n'impriment pas** les fonds colorés. Mais l'utilisateur peut
cocher « Graphiques d'arrière-plan » dans le dialogue d'impression, et **« Enregistrer au
format PDF » le fait souvent**. Le PDF produit garde alors tous les aplats — et les ressort
chez la personne qui l'imprimera, qui n'a rien demandé.

**On ne compte donc jamais sur le comportement par défaut : on neutralise explicitement.**

> ⚠️ Ne **jamais** écrire `print-color-adjust: exact` (ni `-webkit-print-color-adjust`) dans ce
> projet. C'est l'instruction inverse : elle *force* l'impression des fonds. Vérifié le
> 31/07/2026 : aucune occurrence dans le dépôt, et il faut que ça le reste.

### 7.4 Ce qui ne change pas, même sur papier

- **La taille du texte.** La feuille commune ne réduit rien : un document élève reste à
  **14 pt minimum**. Économiser l'encre ne se fait jamais sur le dos de la lisibilité. Si un
  document de travail doit être resserré, c'est un choix explicite dans ce document-là, jamais
  une règle globale.
- **La règle « couleur + mot ».** Elle vient de l'écran, mais c'est à l'impression noir et
  blanc qu'elle devient vitale : c'est le mot, seul, qui distingue encore les états.
- **Les schémas SVG.** Ils sont du contenu, pas de la décoration : ils s'impriment tels quels,
  dans leur état final. Leur trait plat sur fond clair a justement été conçu pour ça.

### 7.5 La charte des documents texte — Word et PDF

`impression.css` traite l'impression d'une **page web**. Un document produit par l'usine de
contenu — fiche, TP, procédure, sujet — est un autre objet : il naît déjà pour le papier. Les
règles ci-dessous s'appliquent à tout `.docx` généré (bibliothèque `docx`, jamais de conversion)
et à tout PDF de document.

**Le principe est le même : couleur oui, surface non.**

| Élément | Règle |
|---|---|
| **Fond de page** | blanc. Jamais de fond de page, jamais de filigrane coloré. |
| **Titre 1** | bleu marine `#1b3a63`, Trebuchet MS, gras. Filet fin de la même couleur dessous. |
| **Titre 2** | bleu marine `#1b3a63`, gras, sans filet. |
| **Titre 3** | noir, gras. La couleur ne descend pas plus bas — sinon elle ne signale plus rien. |
| **Corps** | noir, Calibri, **14 pt minimum pour un document élève** (11-12 pt admis pour un document de travail interne, et c'est un choix explicite du document). |
| **Encadrés** | filet gauche **coloré + style de trait** (§ 7.0 bis), fond **blanc**. Jamais d'aplat de couleur. |
| **Tableaux** | filets gris `#999`. En-tête : gras + bleu marine + trait plus épais dessous. **Aucune zébrure**, aucun aplat de ligne. |
| **Mise en évidence dans le texte** | le **gras** d'abord. La couleur de texte est réservée aux titres ; un mot en orange au milieu d'un paragraphe ne survit pas au noir et blanc. |
| **Pictogrammes** | les normalisés (SGH, ATEX, ISO 7010) sont du **contenu** : reproduits fidèlement, en couleur, jamais réinventés ni redessinés en gris. |
| **Photos** | à éviter en fond de page ; en illustration, oui, mais recadrées serré — une photo pleine page en couleur est le poste d'encre le plus cher d'un document. |

**Le test avant d'envoyer un document** — il tient en deux gestes :

1. **Imprimer en niveaux de gris** (ou regarder l'aperçu en gris). Si deux encadrés deviennent
   indiscernables, ou si une information a disparu, le document n'est pas fini.
2. **Compter les surfaces pleines.** Un aplat de couleur qui dépasse la taille d'un badge doit
   se justifier. Un en-tête de tableau, une bannière de première page : ça se discute.
   Un fond de page, non.

### 7.6 Valeurs pour la bibliothèque `docx`

La bibliothèque attend des unités particulières — c'est la source d'erreur habituelle.
Couleurs **sans le `#`**, tailles en **demi-points**, bordures en **huitièmes de point**.

| | Valeur `docx` | Correspond à |
|---|---|---|
| Bleu marine | `color: "1B3A63"` | `#1b3a63` |
| Vert acquis | `color: "1E7E54"` | `#1e7e54` |
| Rouge échec | `color: "C0392B"` | `#c0392b` |
| Ambre fragile | `color: "B06A00"` | `#b06a00` |
| Orange de texte | `color: "C9451A"` | `#c9451a` — **jamais `FF6B35`** |
| Corps élève | `size: 28` | 14 pt |
| Corps document de travail | `size: 24` | 12 pt |
| Titre 1 | `size: 32`, `bold: true` | 16 pt |
| Filet d'encadré « clé » | `style: BorderStyle.DOUBLE, size: 12` | trait double ≈ 1,5 pt |
| Filet d'encadré « piège » | `style: BorderStyle.DASHED, size: 12` | tireté ≈ 1,5 pt |
| Filet d'encadré neutre | `style: BorderStyle.SINGLE, size: 8` | plein ≈ 1 pt |
| Filet de tableau | `style: BorderStyle.SINGLE, size: 4, color: "999999"` | plein ≈ 0,5 pt |

> ⚠️ **`shading` (le fond de cellule ou de paragraphe) est à proscrire par défaut.** C'est
> l'équivalent Word de l'aplat CSS : invisible à l'écran dans le coût, très cher à l'impression.
> Si un fond est vraiment nécessaire, `#f3f7fb` au maximum, et jamais sur plus de deux lignes.

---

## 8. Composants de référence

Repris tels quels de `charte-edu.css` — les reproduire plutôt que d'en inventer.

| Composant | Classe | Forme |
|---|---|---|
| Encadré neutre | `.bloc` | filet gauche 4 px `--bleu`, fond `#f3f7fb` |
| Encadré « la clé » | `.bloc.cle` | filet `--ok`, fond `--ok-bg` |
| Encadré « le piège » | `.bloc.piege` | filet `--orange`, fond `--orange-clair` `#ffe2d6` |
| Bloc formateur | `.pilote` | bordure 2 px `--orange`, fond `#fff8f4` |
| Tuile de menu | `.tuile` | carte blanche, rayon 14, survol `translateY(-3px)` |
| Tuile principale | `.tuile.primaire` | liseré haut 5 px orange, dégradé `#fff → #fff7f3` |
| Bouton d'action | `.liens button` | fond `--bleu`, texte blanc, rayon 12 |
| Bouton secondaire | `.liens button.sec` | fond blanc, filet `--ligne`, texte `--bleu` |
| Pilule discrète | `.rejeu`, `.ecouter` | fond `#f3f7fb`, filet `--bleu-clair`, rayon 999 |

---

## 9. Le bloc à coller en consigne

**C'est la partie à copier telle quelle** quand une expérience interactive est produite hors du
dépôt (autre outil, autre modèle, autre personne).

```
CHARTE GRAPHIQUE À RESPECTER — inerWeb Pilote (pack fluides)

PALETTE (variables CSS, valeurs exactes, ne pas en inventer d'autres) :
  --navy-700:#1b3a63  --orange:#ff6b35   --orange-deep:#c9451a
  --blue:#3d7fca      --blue-soft:#84b7ec
  --cream:#f7f1e7     (fond de page)     --paper:#fffdf8 (fond de carte)
  --ink:#10233c       --muted:#637285    --line:rgba(27,58,99,.16)
  Sens : ok #1e7e54 sur #e3f5ec · erreur #c0392b sur #fbe7e4 · attente #b06a00 sur #fff4e0

TYPOGRAPHIE :
  Titres : "Trebuchet MS", Calibri, Arial, sans-serif
  Corps  : Calibri, "Segoe UI", system-ui, Arial, sans-serif — 16-17px, interligne 1.6
  Chasse fixe : Consolas. JAMAIS de serif. JAMAIS de police chargée depuis un CDN.

RÈGLES ABSOLUES :
1. AUCUN THÈME SOMBRE. Fond clair, texte sombre, partout. Pas de prefers-color-scheme:dark,
   pas de bascule de thème. Seule exception tolérée : un petit accent coloré à texte blanc
   (badge, bouton, pastille). Jamais un bandeau, un hero, un panneau ou une zone de lecture.
2. NE JAMAIS conditionner une animation ou un son à `prefers-reduced-motion: reduce`.
   Si l'animation porte du contenu pédagogique, le seul filet autorisé est `@media print`.
   Le son ne dépend que de son propre bouton.
   Le dessin AU REPOS doit déjà être l'image FINALE ; l'animation raconte comment on y arrive.
3. Inclure le réglage de lisibilité, avant </body> :
   <script src="CHEMIN/moteur/lisibilite.js"></script>
4. Aucune dépendance externe : pas de CDN, pas de police distante, pas de script tiers,
   pas d'image générée par IA. Tout en local, doit fonctionner hors ligne.
5. Un état ne se distingue JAMAIS par la couleur seule : couleur + mot.
6. Accents français complets et corrects partout (é è ê à ç ù œ), jamais d'ASCII dégradé.
7. Si un schéma de circuit frigorifique apparaît — Croix du Frigoriste :
   détendeur GAUCHE · compresseur DROITE · condenseur HAUT · évaporateur BAS.

IMPRESSION ET PDF — SOBRIÉTÉ D'ENCRE (obligatoire, c'est un autre support) :
8. Inclure la feuille commune dans le <head>, après la feuille de style de la page :
   <link rel="stylesheet" href="CHEMIN/moteur/impression.css" media="print">
9. Principe : LE TRAIT PORTE LE SENS, PAS LA SURFACE. À l'impression, fond blanc pur,
   aucun aplat de couleur, aucune ombre, aucun dégradé, aucune zébrure de tableau.
   Ce qu'un fond coloré signifiait passe dans la bordure et dans le mot. Les badges
   pleins deviennent des contours.
   CE N'EST PAS UNE CHARTE NOIR ET BLANC : filets, titres et badges GARDENT leur couleur
   (quelques gouttes d'encre, et c'est joli si on imprime en couleur). Ce sont les
   SURFACES qui partent.
10. La couleur ne porte JAMAIS seule une information — mesuré : converties en niveaux de
    gris, le vert #1e7e54 (36 %) et le rouge #c0392b (38 %) sont indiscernables. Trois
    canaux obligatoires : la COULEUR + le STYLE DE TRAIT (plein / double / tireté /
    pointillé) + le MOT. Test : si on retire toute la couleur, l'information doit rester
    entière.
11. Sur papier, l'orange de TEXTE est #c9451a (contraste 4,8:1). #ff6b35 ne fait que
    2,8:1 sur blanc : il ne sert qu'en filet ou en aplat d'écran, jamais en texte imprimé.
12. Corps de texte imprimé en NOIR PUR, pas en bleu foncé : sur un jet d'encre, un bleu
    très foncé mobilise les quatre cartouches là où le noir n'en consomme qu'une.
13. NE JAMAIS écrire `print-color-adjust: exact` ni `-webkit-print-color-adjust: exact` :
    c'est l'instruction qui FORCE l'impression des fonds. On ne compte pas non plus sur le
    défaut du navigateur — on neutralise explicitement les fonds dans @media print.
14. Masquer à l'impression tout ce qui ne se clique pas sur papier : boutons, barres de
    navigation, widget de lisibilité, lecteurs audio.
15. Ne pas réduire la taille du texte pour économiser le papier : un document élève reste
    à 14 pt minimum.

PUBLIC : formation professionnelle adulte et CAP, lecture fragile (FLE, DYS).
Une idée à la fois, contraste franc, texte court, l'image porte le propos.
```

---

## 10. Écarts constatés au 31/07/2026

Mesurés fichier par fichier. **Aucun n'est bloquant ; tous sont à connaître.**

### 10.1 Deux climats coexistent — le point à trancher

| | Fond de page | Ressenti |
|---|---|---|
| **Moteur** (`charte-edu.css`) — app élève, portail, projection | `#eef2f6` gris bleuté | froid, institutionnel |
| **Expériences** (5 sur 8) | `#f7f1e7` crème | chaud |

L'identité (bleu, orange, typographie) est **déjà commune**. Seul le support diffère. C'est
très probablement l'origine du ressenti « le projet est froid » : **la chaleur existe déjà, mais
seulement dans les expériences**, et l'application principale — celle que l'élève ouvre en
premier — est restée sur le gris bleuté d'origine.

**Aligner le moteur sur le crème est un changement d'une ligne** (`--fond`), plus l'ombre
(`--ombre` en tonalité chaude) et éventuellement `--carte` en `#fffdf8`. Décision à prendre :
elle repeint tout le projet d'un coup, y compris les gabarits générés.

### 10.2 Divergences de palette

| Expérience | Écart |
|---|---|
| `cours-classes-securite` | palette entièrement propre : `--blue:#193b56`, `--orange:#d87832`, `--paper:#f5f1e8`, plus `--ice` / `--steel` inconnues ailleurs, et un fond texturé (dégradés répétés) |
| `froid-clim-academie` | `--blue:#1069a8` (bleu autre), `--paper:#f6f8f9` — la seule expérience **froide** |
| `pression-temperature-interactive` | **aucune variable CSS** : couleurs en dur, `#eef3f7` (celle du moteur) |
| verts | trois valeurs : `#4fb887`, `#25866d`, `#1e7e54` (moteur) |
| rouges | trois valeurs : `#d94747`, `#b83c3c`, `#c0392b` (moteur) |

### 10.3 Ce qui est conforme

- Le **bouton « Aa »** est présent sur les **8** expériences.
- `--navy-700` et `--orange` sont identiques au moteur partout où ils sont déclarés.
- Les valeurs `--navy-800/900` encore utilisées (frise vivante, nomenclature) le sont en
  **accents** — badge, pilule, dégradé de vignette — jamais en fond de lecture. Conforme à R1.

---

*Valeurs extraites de `moteur/charte-edu.css`, `moteur/lisibilite.js` et des 8 expériences de
`packs/fluides/res/`. Toute modification de la charte se répercute d'abord ici, puis dans le code.*
