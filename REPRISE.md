# REPRISE — pack habilitation fluides frigorigènes

> **À LIRE EN PREMIER** dans toute nouvelle session. Tout ce qu'il faut pour reprendre
> le projet est ici : état, architecture, décisions déjà tranchées, pièges, prochaines étapes.
> Dernière mise à jour : **25 juillet 2026**.

---

## 1. Ce que c'est

Le contenu de la formation **habilitation fluides frigorigènes** (catégories **A1 · A2 · D · E**)
tournant dans le moteur générique **inerWeb Pilote** (repris de `frigorx/r408`).

**Double usage, et c'est le cœur du concept :**
1. **support de séance** — le formateur projette, pilote, note ;
2. **outil d'auto-préparation à l'examen** — le stagiaire reçoit le lien **avant** la formation,
   le garde **pendant** les périodes en entreprise, révise **selon son niveau** jusqu'à l'épreuve.

> ⚠️ **Démonstrateur, pas version définitive.** Contenu jamais relu par un œil de frigoriste
> (voir § 6). **Publié et diffusable en lien** depuis le 25/07 — la vitrine annonce elle-même
> ses limites, section « ce qui n'est pas encore fait ». Les retours passent par les
> [issues GitHub](https://github.com/frigorx/pilote-fluides/issues).

> 📐 **Plan d'ensemble des deux projets** : `C:\git\habilitation-fluide\ARCHITECTURE-DISPOSITIF.md`.
> Il pose la frontière **public / privé** — ce dépôt-ci porte la formation, le dépôt privé porte
> l'évaluation officielle. Les 85 questions d'examen et les 10 sujets **n'entrent jamais ici** :
> publier un sujet est irréversible. Le référentiel des 136 codes est la seule chose partagée.

**Dépôt** : `C:\git\pilote-fluides` → `github.com/frigorx/pilote-fluides` (public)
**En ligne** : https://frigorx.github.io/pilote-fluides/
**Licence** : `LICENCE.md` (25/07) — contenu pédagogique CC BY-NC-SA 4.0 (pas d'usage
commercial sans accord), moteur et build MIT, référentiel officiel hors licence.
Doctrine [[feedback_protection_code]] : licence + antériorité git, jamais de chiffrement.

| Page | Rôle | Pour qui |
|---|---|---|
| [`projection.html`](https://frigorx.github.io/pilote-fluides/projection.html) | **le déroulé des 3 jours** : diapositives, minuteur, questions à révéler, vue orateur | formateur, en salle |
| [`pratique.html`](https://frigorx.github.io/pilote-fluides/pratique.html) | présentation de la **manipulation fluidique** : démonstration de feuille de guidance, grille par compétence. Aucune donnée de stagiaire | vitrine |
| [`portail.html`](https://frigorx.github.io/pilote-fluides/portail.html) | **la vitrine** : dossier de présentation à envoyer en lien à des fournisseurs et des collègues pour qu'ils testent | tous publics |
| [`index.html`](https://frigorx.github.io/pilote-fluides/) | l'application élève | **le lien à distribuer** |
| [`formateur.html`](https://frigorx.github.io/pilote-fluides/formateur.html) | mode pilotage verrouillé, notes d'animation visibles | formateur |
| [`partage.html`](https://frigorx.github.io/pilote-fluides/partage.html) | affiche A4 / écran avec QR code | à projeter en salle |
| [`relecture.html`](https://frigorx.github.io/pilote-fluides/relecture.html) | tout le contenu à plat, cases ✅/✏ | **le bon à tirer** |

Référencé depuis le tableau de bord : `C:\git\tableau-de-bord` → carte « pilote-fluides ».

---

## 2. État au 25/07/2026

**68 cartes** · **235 questions** · **16 planches SVG** (dont 10 animées) · 4 illustrations · **3 outils embarqués**

> **Couverture du référentiel officiel : A1 100 % · A2 100 % · D 100 % · E 100 %.**
> Mesurée à chaque build, écrite dans `COUVERTURE-REFERENTIEL.md`. Elle valait 60 % en A1
> avant la refonte compétences du 25/07 — personne ne pouvait le voir, faute de mesure.
>
> **Profondeur (25/07 soir)** : la couverture dit qu'un code est **cité** ;
> `PROFONDEUR-REFERENTIEL.md` (généré au même build) mesure qu'il est **tenu** — les notions
> que le libellé officiel énumère se retrouvent-elles dans le contenu que l'élève lit ?
> Mesure asymétrique et assumée : elle prouve les trous, jamais la qualité. Première mesure :
> **22 codes cités sans être pleinement tenus** (hydrocarbures G11-G12, compresseur G6 —
> groupe du tirage au sort). **Comblés le soir même** : 13 fiches enrichies (rédaction
> sous règles strictes + vérification adversariale + intégration), **94/94 tenus** au build
> suivant. La mesure tourne à chaque build : ça ne peut plus se redégrader en silence.
> L'instrument : `packs/fluides/profondeur-attendus.json` (v0.3, à faire relire).

| | |
|---|---|
| 1 accueil · 6 menus | A1, A2, D, E · **Réviser par thème** · **Préparation pratique** |
| 33 fiches de cours | dont **7 de préparation pratique** (le matériel et les gestes) |
| 1 carte « Ma progression » | où j'en suis, compétence par compétence — tout en local |
| 5 exercices « frigoriste-détective » | mises en situation à indices croisés |
| 21 séries et examens | 13 séries de révision par thème + 8 examens sur 3 paliers |
| 235 questions | rattachées à un **code de compétence**, un niveau, une catégorie — **99 compétences interrogées = 99 enseignées**, plus aucun code muet |

**La refonte compétences (25/07)** — le pack enseignait des thèmes, il enseigne désormais des
compétences opposables :
- le **référentiel officiel est une donnée de build** (`referentiel-2025.json`, 136 codes) : les
  libellés de l'arrêté ne sont plus recopiés à la main, ils sont **résolus et injectés** ;
- l'élève lit sur chaque fiche **« 🎯 Ce que l'examen attend de vous »** — reformulation accessible,
  marqueur théorique/pratique, ★ nouveau 2025, et le texte de l'arrêté à un clic ;
- le **bilan d'examen nomme la compétence** non acquise au lieu de renvoyer à un numéro de fiche ;
- **A1/A2/D/E sont de vrais filtres** : entrer par un menu de catégorie fixe le champ, et un
  candidat D ne reçoit plus que la moitié des questions — celles qui le concernent.

**Le produit de formation (25/07, second temps)** — le pack est devenu un outil de stage :
- **`projection.html`** : le déroulé en salle. 4 blocs (3 jours de théorie + la préparation
  pratique), 39 séquences, 318 diapositives. La boucle est celle voulue par F. Henninot :
  on projette et on explique → la vidéo → le mini-questionnaire → on révèle → on avance.
  Les diapositives sont **générées depuis les fiches** (`build/parcours.mjs`) : une fiche
  corrigée = une projection corrigée, et **une seule relecture** au lieu de deux.
  Vue orateur (touche N) : notes d'animation + réponse attendue — la « troisième face » du
  cahier des charges. Minuteur par séquence, plein écran, navigation clavier.
- **Les questions projetées sont celles que l'élève retrouve chez lui** : tirage déterministe
  sur les codes de la séquence. C'est la spirale — vu ensemble, refait seul le soir.
- **« Ma progression »** : les 93 compétences de sa catégorie, en quatre états lisibles
  (acquise · fragile · à revoir · jamais testée), mis à jour à chaque réponse. Distingués par
  la couleur **et** par un mot, jamais par la couleur seule. Rien ne sort du navigateur.
- **Module « Préparation pratique »** (7 fiches) : manifold, station de récupération, pompe à
  vide et vacuomètre, bouteille d'azote et mano-détendeur, **ordre des vannes**, balance et
  pesée, préparation de chantier. Il ne remplace pas l'atelier, il le prépare — charte
  FrigorX : préparation ≤ 1 h, sécurité démontrée et imposée, jamais découverte.

**Les 3 paliers d'examen** : 🟢 Échauffement (niveau 1, seuil 60 %) · 📝 Examen blanc (mixte, 70 %)
· 🔴 Défi technicien (niveau 2, seuil 80 %).

**La boucle d'auto-formation, complète** : indice 💡 avant de répondre → correction → bloc
« 📚 Comprendre » (remédiation intégrale) → « ↩ Revoir la fiche » → bilan listant les fiches
ratées → score précédent affiché (localStorage élève, **rien ne remonte**).

---

## 3. Comment c'est fabriqué

```bash
node build/convert.mjs    # Mission F-GAZ + questions-pack.json → banque.gen.json (202 questions)
node build/build.mjs      # cartes.js + banque → pack.pilote.js ET pack.eleve.js
node build/parcours.mjs   # parcours.js + fiches → projection.gen.js (le support de salle)
node build/relecture.mjs  # → relecture.html (document de bon à tirer)
```

| Fichier | Rôle |
|---|---|
| `packs/fluides/cartes.js` | **source éditoriale — c'est ici qu'on écrit le contenu** |
| `packs/fluides/parcours.js` | **le déroulé des 3 jours** — aucun contenu, seulement l'ordre et les durées. Déplacer une ligne suffit à changer une séance. |
| `packs/fluides/questions-pack.json` | les questions **écrites pour le pack** (hors Mission F-GAZ), là où la banque d'origine n'interrogeait aucune des compétences ajoutées |
| `packs/fluides/referentiel-2025.json` | **le référentiel officiel, 136 codes** — copie conforme de `habilitation-fluide`, ne se modifie **que sur pièce** (texte au JO) |
| `build/referentiel.mjs` | index des codes, résolution des libellés, calcul de couverture, contrôle de synchro avec le dépôt amont |
| `COUVERTURE-REFERENTIEL.md` | **généré à chaque build** — couverture par catégorie, codes manquants, codes évalués sans fiche |
| `packs/fluides/profondeur-attendus.json` | **l'instrument de profondeur** — chaque code décomposé en notions sentinelles (motifs regex) tirées du libellé officiel. Ne s'ajuste que si la fiche enseigne la notion sous un autre mot, jamais pour verdir un chiffre |
| `build/profondeur.mjs` | mesure que chaque code cité est **tenu** — lancé par `build.mjs`, avertit sans bloquer (`--strict` pour bloquer). Corpus = contenu visible de l'élève, hors notes formateur |
| `PROFONDEUR-REFERENTIEL.md` | **généré à chaque build** — codes cités non tenus, notions absentes, motifs aveugles |
| `build/convert.mjs` | sélection + niveaux + **codes de compétence** + remédiation, depuis Mission F-GAZ |
| `packs/fluides/banque.gen.json` | banque générée — **ne jamais éditer à la main** |
| `packs/fluides/pack.eleve.js` | build élève, **purgé** de la couche pilote |
| `packs/fluides/pack.pilote.js` | build formateur, **avec** les notes |
| `packs/fluides/res/svg/` | les planches (SVG faits main) |
| `packs/fluides/res/outils/` | réglette, carte d'identité fluide, base `fluides-data.js` |
| `moteur/` | moteur générique — **4 extensions documentées**, voir § 5 |

**Le build refuse de construire** si : un lien pointe vers une carte inexistante · un examen
demande plus de questions que son pool · **une note formateur se retrouve dans la sortie élève** ·
un code cité n'existe pas au référentiel · une question n'a **ni** code **ni** classement hors
référentiel · le bandeau `dc` d'une fiche **annonce un code qu'elle ne déclare pas** (c'est ainsi
que « G6 · codes 6.01 → 6.08 » promettait huit compétences pour quatre enseignées).

---

## 4. Décisions déjà tranchées — ne pas les rouvrir sans raison

| Décision | Pourquoi |
|---|---|
| **Questions = Mission F-GAZ uniquement** | Les 85 questions officielles et les 10 examens blancs du dépôt privé `habilitation-fluide` **ne sortent jamais** : publier un sujet est irréversible (forks, archives, caches). |
| **Questions à seuil réglementaire écartées** | Délais de réparation, seuils de contrôle, dates d'interdiction — susceptibles d'avoir bougé avec F-Gas III, à revalider sur pièce. |
| **Mode Évaluation désactivé** | Le moteur ne sait pas appliquer les règles de composition de l'arrêté (groupe composant tiré au sort, pondération ×3/×2/×1, plancher par groupe). Les examens restent des **entraînements**. *Depuis le 25/07, le prérequis est posé* : chaque question porte son code, sa catégorie et son groupe, et `build/referentiel.mjs` expose `REGLES` (les règles de composition lues au référentiel, pas en dur). |
| **Pas de PWA / pas d'installation** | Une **page web universelle** — « tout le monde peut ouvrir une page web » (crainte iPhone fondée pour le public réel). |
| **Console formateur publiée** | `formateur.html` + `pack.pilote.js` sont publics : ce sont des conseils d'animation, pas des corrigés. **Arbitrage à confirmer** — pour revenir en arrière : supprimer ces 2 fichiers du dépôt, le build les régénère en local. |
| **PRP alignés sur Mission F-GAZ** | R-32 = 675, R-134a = 1430, R-404A = 3922, R-410A = 2088 — pas les valeurs AR5 de la réglette FRIGOLO, pour une seule vérité côté élève. |
| **Génératif interdit sur les schémas** | Aucun modèle d'image ne respecte la croix du frigoriste. Schémas = SVG faits main. Ambiance = génératif autorisé. |
| **Examens derrière un code d'accès — un rideau, pas un coffre** | Les 8 examens demandent un code (donné par le formateur en salle). Assumé comme portillon pédagogique : les questions restent lisibles dans le code source de la page, et une empreinte se force par essais. Le code en clair n'est écrit **nulle part** — ni dans le dépôt, ni sur le site : seule son empreinte djb2 est versionnée. Décidé le 25/07 (F. Henninot). |
| **Le référentiel est une donnée de BUILD, jamais de runtime** | Le navigateur ne charge pas les 74 Ko du JSON : le build résout les libellés et n'injecte que les codes réellement utilisés. Une seule source, zéro divergence possible. |
| **Deux libellés par compétence, jamais un seul** | `libelle` = la reformulation accessible écrite pour l'élève ; `officiel` = le texte de l'arrêté, injecté, jamais retouché. Le public réel ne lit pas « au sens du règlement (CE) n° 1516/2007 », mais l'organisme doit pouvoir montrer le texte. |
| **Le groupe est un rangement, le code est la règle** | `dc` (G1…G13) range pédagogiquement — le voyant liquide s'apprend avec les composants. Le `code` rattache réglementairement — ce même voyant est évalué au titre de 1.05. Les deux divergent parfois : 19 questions portent un code hors de leur groupe de rangement, et c'est voulu. |
| **On ne force jamais un rattachement** | 14 questions ne relèvent d'aucun code de l'annexe II.B : elles sont marquées `hors_ref` avec leur raison, pas rattachées de force. Un faux rattachement ferait croire à une couverture qui n'existe pas. |
| **Les questions CO₂ / NH₃ ne se filtrent pas** | Leurs codes (13.xx, 14.xx) ne sont évalués ni en A1 ni en A2, mais l'annexe II.C **impose au moins une question dessus** dans ces sujets. Une question sans champ `categories` est donc servie à tout le monde — ne pas « corriger » cela. |

---

## 5. Pièges — lus dans le sang, à ne pas réapprendre

**Moteur** — 5 extensions par rapport au r408 d'origine, toutes rétrocompatibles :
`examen.niveau` (filtrage par difficulté) · bilan listant les fiches ratées · historique
`localStorage` · auto-hauteur des iframes par `postMessage` · **portillon d'accès par code**
(`acces.code_empreinte` sur une carte examen — les 8 `ex-*` le portent, les 13 séries `rev-*`
restent libres ; déverrouillage mémorisé sur l'appareil).

- **Un schéma ne se met JAMAIS en `illus`** : la charte recadre l'illustration de tête
  (`object-fit: cover`, 340 px max) et le tronque. Les schémas passent par l'assistant
  `schema()` de `cartes.js`, qui les insère dans le corps.
- **Auto-hauteur des iframes** : mesurer `document.body.offsetHeight`, **jamais**
  `scrollHeight` → boucle d'inflation jusqu'au plafond.
- **La carte d'accueil DOIT avoir l'id `c00`** : codé en dur dans `moteur.js`.
- **Ne jamais condenser les remédiations** : la richesse de Mission F-GAZ (indice + Règle /
  Pourquoi / Exemple / Piège) est le cœur pédagogique. Un convertisseur qui tronque à
  200 caractères tue l'auto-formation.
- **Fonds Mission F-GAZ** : 17 remédiations « structurées » sont des **gabarits vides**
  (« Retenez la notion-clé demandée… ») — détectées et jetées par `convert.mjs`.
- **Vérifier le référentiel groupe par groupe AVANT de rédiger** : les codes 1.06/1.07
  (nomenclature) et 2.01 (histoire) avaient été survolés, il a fallu ajouter 2 fiches après coup.
- **Images d'ambiance** : recadrées en **1400 × 520** (rapport du bandeau), JPEG 85, ≈ 120 Ko.

**Règles de contenu, non négociables** — zéro invention chiffrée (seules valeurs autorisées :
surchauffe 5-10 K, sous-refroidissement 4-8 K, P absolue ≈ P relative + 1 bar, classes NF EN 378
avec **R-290 = A3**, CO₂ = A1, NH₃ = B2L, PRP CO₂ = 1) · **azote seul** pour toute mise en
pression · **croix du frigoriste** : détendeur gauche, compresseur droite, condenseur haut,
évaporateur bas · charte inerWeb Édu, jamais de thème sombre.

---

## 6. Ce qui reste à faire

### 🔴 Priorité 1 — la relecture métier (bloquant pour la diffusion)

Personne n'a relu le contenu avec un œil de frigoriste : **26 fiches, 5 exercices,
209 questions** avec leurs indices et remédiations. **Dont 7 fiches écrites le 25/07** et jamais
relues (`g0`, `g1d`, `g6b`, `g7b`, `g8b`, `g9b`, `g12b`), **et le comblement du 25/07 soir** :
13 fiches enrichies (`g1a`, `g1c`, `g3`, `g4a`, `g5a`, `g5b`, `g6`, `g6b`, `g8`, `g11`, `g12`,
`p7`, `g13`) + 29 questions `pk-q-*` — rédigés par IA sous règles strictes (zéro invention
chiffrée, vérification adversariale), jamais vus par un humain.

→ Ouvrir [`relecture.html`](https://frigorx.github.io/pilote-fluides/relecture.html), annoter
les ✏, renvoyer les corrections. Elles se reportent dans `packs/fluides/cartes.js` (fiches) ou
`build/convert.mjs` (questions : `CORRECTIONS` ou retrait de la sélection).

Le document de relecture affiche désormais, pour chaque fiche, **les compétences qu'elle prétend
couvrir** — libellé de l'arrêté + reformulation élève. C'est là que porte l'essentiel du travail :
l'écart entre ce que le code exige et ce que le contenu enseigne vraiment.

Cet écart est désormais **mesuré et gardé** : `PROFONDEUR-REFERENTIEL.md` liste les codes cités
sans être tenus. Les 22 trous du 25/07 sont **comblés** (94/94 tenus) ; la mesure tourne à chaque
build et signalera toute régression. Rappel : 12.03 (calcul de charge inflammable) est enseigné
en **méthode seule** — les valeurs sont dans la NF EN 378, à ne citer que sur pièce.

**Question ouverte du § 6 précédent — RÉPONDUE le 25/07, sur mesure et non à l'intuition :**
- le **glissement des zéotropes** était bien traité (3 mentions, charge en phase liquide) ;
- les **huiles** ne l'étaient **pas du tout** : zéro occurrence de POE, minérale ou retrofit, alors
  que les fiches déclaraient couvrir 5.04, 5.08, 6.01 et 6.05. Le code était revendiqué, le contenu
  ne le tenait pas. **Comblé** dans `g5b` (minérale / POE, non-miscibilité, hygroscopie de la POE,
  huile contaminée = déchet dangereux, cas des hydrocarbures) ;
- au-delà de ces deux pistes, la mesure a révélé **38 codes A1 non couverts**, dont les 25 gestes
  des groupes 6 à 9 — ceux du **groupe tiré au sort**, donc certains de tomber. Tous comblés.

### 🔴 Priorité 1 bis — les valeurs terrain (personne d'autre ne peut le faire)

Tout le contenu pratique renvoie à « selon la fiche constructeur, à faire valider » : **pression
d'épreuve à l'azote, niveau de vide visé, durée de tirage, débit de balayage, couples de serrage,
taux de remplissage d'une bouteille**. C'est rigoureux — on n'invente aucun chiffre — mais pour un
stagiaire c'est frustrant, et pour le module pratique c'est un squelette.

Ces nombres sont sur le plateau du LP et dans la pratique de F. Henninot, pas dans un texte.
**Tant qu'ils ne sont pas figés, le module pratique reste au niveau du geste et de l'ordre.**
Les figer, c'est aussi les rendre opposables : une fois écrits, ils engagent l'organisme.

Manque aussi, et pour la même raison : des **photos du matériel réel** (manifold, station de
récupération, mano-détendeur). Pour un public FLE/DYS, une photo du vrai appareil vaut trois
paragraphes ; les SVG sont bons pour les principes, pas pour reconnaître un objet.

### 🟠 Priorité 1 quater — deux livrables à valider

- **`VIDEOS-PRESELECTION.md`** — 11 sujets sur 13 pourvus, chaque titre et chaque durée relevés
  sur la fiche de la vidéo, pas de mémoire. Rien n'est intégré au pack : **à visionner
  intégralement avant tout usage**. Deux sujets sans proposition : la réglementation F-Gas (rien
  au bon format) et la nomenclature des fluides (seule ressource trouvée antérieure au règlement
  de 2024).
- **`packs/fluides/res/photos/CATALOGUE.md`** — 4 photos d'atelier intégrées au module pratique
  (manifold branché, pompe à vide, vacuomètre, balance). Elles viennent des séquences CAP IFCA
  26-27 et **leur origine reste à confirmer** : ce dépôt est public. Si l'une provient d'une
  documentation constructeur, elle doit être retirée.
  Les **31 visuels AFPA** (dont 5 photos de matériel) n'ont **délibérément pas été repris** :
  extraits de supports de 2009-2011, droits non détenus. Utilisables en interne, pas ici.

### 🟠 Priorité 1 ter — décisions éditoriales ouvertes par la refonte

- **Les 14 questions hors référentiel** — section « 2 bis » de `relecture.html`, chacune avec trois
  cases : garder (culture métier), retirer, ou rattacher à un code jugé légitime. Ce sont surtout
  la **nomenclature des fluides** (8 questions : que signifie HFC, le « a » de R-134a, composition
  du R-410A…), trois **gestes mécaniques** hors annexe II.B (cintrage, dudgeonnage, raccord
  Schrader) et trois questions **ammoniac** rangées à tort en G13 (CO₂).
  La nomenclature est un savoir-outil indispensable — mais l'annexe II.B ne l'évalue pas comme
  telle. À vous de trancher : c'est une décision pédagogique, pas technique.
- ~~**Deux codes évalués sans fiche qui les enseigne** : `1.09` et `13.14`~~ — **résolu le
  25/07 soir** : `g13` enrichie (pressions élevées du CO₂ sans valeur chiffrée, log p/h,
  glace carbonique, sécurité de site) et déclare désormais les deux codes, en information.

### 🟠 Priorité 2 — à décider (ne pas engager sans arbitrage)

- **Basculer sur la vraie banque pédagogique** (les ~70 questions tirées des 14 chapitres du
  dépôt privé) : elles nourrissent aussi les examens blancs du dispositif PR-02 — les publier
  affaiblirait ces examens. `convert.mjs` peut avaler un autre fonds, c'est un fichier à changer.
- **Suivi formateur via le collecteur universel** : remontée de données élèves → décision RGPD.
  L'argument actuel « tout reste dans le navigateur » est précieux, ne pas le sacrifier par réflexe.
- **Mode Évaluation conforme à l'arrêté** : gros chantier moteur (tirage du groupe composant,
  pondération, plancher par groupe). N'a de valeur que le jour où le centre d'examen existe.

### 🟢 Priorité 3 — confort

- 2 illustrations d'ambiance manquantes (sécurité brasage, hydrocarbures) — voir
  `packs/fluides/res/img/CATALOGUE.md`.

---

## 7. Contexte à connaître

- **Projet parent** : `C:\git\habilitation-fluide` (privé) — le dispositif de certification
  complet, les 14 chapitres source, les procédures PR-01→05. Son `REPRISE.md` est le point
  d'entrée de ce chantier-là.
- **Moteur d'origine** : `github.com/frigorx/r408` — ne pas y pousser les extensions faites ici
  sans arbitrage (elles sont rétrocompatibles mais spécifiques à ce pack).
- **Atelier numérique relié** : 11 outils déjà publiés (FRIGOLO, KP1/KP5, Diagramme
  Enthalpique+, TP manomètres, CERFA/FI/BSD…) — tous listés dans `portail.html`.
- **Sources de contenu** : Mission F-GAZ (`frigorx/inerweb-fgaz`, public) pour les questions ;
  réglette FRIGOLO pour les tables P/T et les PRP ; bibliothèque de symboles
  (`C:\git\usine-contenu\bibliotheque-symboles`, 348 symboles) pour les schémas.

---

*F. Henninot · inerWeb Édu — arrêté du 21 novembre 2025, règlement (UE) 2024/573.*
