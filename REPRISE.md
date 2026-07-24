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
> (voir § 6). Ne pas diffuser largement avant la relecture de F. Henninot.

**Dépôt** : `C:\git\pilote-fluides` → `github.com/frigorx/pilote-fluides` (public)
**En ligne** : https://frigorx.github.io/pilote-fluides/

| Page | Rôle | Pour qui |
|---|---|---|
| [`portail.html`](https://frigorx.github.io/pilote-fluides/portail.html) | **point d'entrée** : explique le projet, relie tout | vous, les collègues |
| [`index.html`](https://frigorx.github.io/pilote-fluides/) | l'application élève | **le lien à distribuer** |
| [`formateur.html`](https://frigorx.github.io/pilote-fluides/formateur.html) | mode pilotage verrouillé, notes d'animation visibles | formateur |
| [`partage.html`](https://frigorx.github.io/pilote-fluides/partage.html) | affiche A4 / écran avec QR code | à projeter en salle |
| [`relecture.html`](https://frigorx.github.io/pilote-fluides/relecture.html) | tout le contenu à plat, cases ✅/✏ | **le bon à tirer** |

Référencé depuis le tableau de bord : `C:\git\tableau-de-bord` → carte « pilote-fluides ».

---

## 2. État au 25/07/2026

**52 cartes** · **180 questions** · **16 planches SVG** (dont 10 animées) · 4 illustrations · **3 outils embarqués**

| | |
|---|---|
| 1 accueil · 5 menus | A1, A2, D, E + **Réviser par thème** |
| 19 fiches de cours | G1 → G13 du référentiel |
| 5 exercices « frigoriste-détective » | mises en situation à indices croisés |
| 21 séries et examens | 13 séries de révision par thème + 8 examens sur 3 paliers |
| 180 questions | étiquetées par groupe **et** par niveau (1 fondamental / 2 diagnostic) |

**Les 3 paliers d'examen** : 🟢 Échauffement (niveau 1, seuil 60 %) · 📝 Examen blanc (mixte, 70 %)
· 🔴 Défi technicien (niveau 2, seuil 80 %).

**La boucle d'auto-formation, complète** : indice 💡 avant de répondre → correction → bloc
« 📚 Comprendre » (remédiation intégrale) → « ↩ Revoir la fiche » → bilan listant les fiches
ratées → score précédent affiché (localStorage élève, **rien ne remonte**).

---

## 3. Comment c'est fabriqué

```bash
node build/convert.mjs    # Mission F-GAZ → packs/fluides/banque.gen.json (180 questions)
node build/build.mjs      # cartes.js + banque → pack.pilote.js ET pack.eleve.js
node build/relecture.mjs  # → relecture.html (document de bon à tirer)
```

| Fichier | Rôle |
|---|---|
| `packs/fluides/cartes.js` | **source éditoriale — c'est ici qu'on écrit le contenu** |
| `build/convert.mjs` | sélection + niveaux + remédiation, depuis Mission F-GAZ |
| `packs/fluides/banque.gen.json` | banque générée — **ne jamais éditer à la main** |
| `packs/fluides/pack.eleve.js` | build élève, **purgé** de la couche pilote |
| `packs/fluides/pack.pilote.js` | build formateur, **avec** les notes |
| `packs/fluides/res/svg/` | les planches (SVG faits main) |
| `packs/fluides/res/outils/` | réglette, carte d'identité fluide, base `fluides-data.js` |
| `moteur/` | moteur générique — **4 extensions documentées**, voir § 5 |

**Le build refuse de construire** si : un lien pointe vers une carte inexistante · un examen
demande plus de questions que son pool · **une note formateur se retrouve dans la sortie élève**.

---

## 4. Décisions déjà tranchées — ne pas les rouvrir sans raison

| Décision | Pourquoi |
|---|---|
| **Questions = Mission F-GAZ uniquement** | Les 85 questions officielles et les 10 examens blancs du dépôt privé `habilitation-fluide` **ne sortent jamais** : publier un sujet est irréversible (forks, archives, caches). |
| **Questions à seuil réglementaire écartées** | Délais de réparation, seuils de contrôle, dates d'interdiction — susceptibles d'avoir bougé avec F-Gas III, à revalider sur pièce. |
| **Mode Évaluation désactivé** | Le moteur ne sait pas appliquer les règles de composition de l'arrêté (groupe composant tiré au sort, pondération ×3/×2/×1, plancher par groupe). Les examens sont des **entraînements**. |
| **Pas de PWA / pas d'installation** | Une **page web universelle** — « tout le monde peut ouvrir une page web » (crainte iPhone fondée pour le public réel). |
| **Console formateur publiée** | `formateur.html` + `pack.pilote.js` sont publics : ce sont des conseils d'animation, pas des corrigés. **Arbitrage à confirmer** — pour revenir en arrière : supprimer ces 2 fichiers du dépôt, le build les régénère en local. |
| **PRP alignés sur Mission F-GAZ** | R-32 = 675, R-134a = 1430, R-404A = 3922, R-410A = 2088 — pas les valeurs AR5 de la réglette FRIGOLO, pour une seule vérité côté élève. |
| **Génératif interdit sur les schémas** | Aucun modèle d'image ne respecte la croix du frigoriste. Schémas = SVG faits main. Ambiance = génératif autorisé. |

---

## 5. Pièges — lus dans le sang, à ne pas réapprendre

**Moteur** — 4 extensions par rapport au r408 d'origine, toutes rétrocompatibles :
`examen.niveau` (filtrage par difficulté) · bilan listant les fiches ratées · historique
`localStorage` · auto-hauteur des iframes par `postMessage`.

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

Personne n'a relu le contenu avec un œil de frigoriste : **19 fiches, 5 exercices,
180 questions** avec leurs indices et remédiations.

→ Ouvrir [`relecture.html`](https://frigorx.github.io/pilote-fluides/relecture.html), annoter
les ✏, renvoyer les corrections. Elles se reportent dans `packs/fluides/cartes.js` (fiches) ou
`build/convert.mjs` (questions : `CORRECTIONS` ou retrait de la sélection).

**Question ouverte posée à F. Henninot, sans réponse à ce jour** : d'autres savoirs du
référentiel ont-ils été survolés ? Pistes évoquées — le **glissement de température** des
zéotropes, les **huiles** (POE / minérale, compatibilités, retrofit).

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
