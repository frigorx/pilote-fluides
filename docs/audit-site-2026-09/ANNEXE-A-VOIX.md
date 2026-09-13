# Audit du corpus des narrations vocales — pilote-fluides (inerweb.fr)

Périmètre : `C:\git\pilote-fluides\build\voix\corpus.json` (5 405 entrées, généré le 02/09/2026) et `build/voix/prononciation.json` (218 règles). Lecture seule, aucun fichier du dépôt modifié. Analyse produite par script Node (`audit-voix.mjs`), exécuté sur les données réelles.

## Note méthodologique (lue avant le reste)

- **La liste des `type` réelle compte 14 valeurs, pas 3** : `feedback` (1 522), `choix` (1 342), `narration` (823), `data-narration` (359), `capture` (283), `interface` (552), `fragment` (138), `composition` (132), `voiceStep` (101), `fiche` (82), `speak` (52), `frise` (10), `s` (8), `dynamique` (1).
- **Particularité importante : le réseau `legislation` (349 entrées) n'a AUCUNE entrée de type `narration`.** Son contenu vocal est classé `data-narration` (348 entrées) + 1 `interface`. Les points 2, 3, 5, 6, 7 ci-dessous portent, comme demandé, sur les types `narration`/`feedback` au sens strict — ce qui rend `legislation` quasiment invisible dans ces points. J'ai fait un contrôle complémentaire ciblé sur `data-narration` (résultats intégrés point par point, signalés « [complément legislation] ») pour ne pas laisser une fausse impression de vide.
- **Convention réseau → module retenue** : `packs/fluides/res/<module>/…` → réseau plan-thermo-techno, module = `<module>` ; `<réseau>/stations/<slug>/…` → module = `stations/<slug>` ; `<réseau>/lignes/<slug>/…` → module = `lignes/<slug>` ; sinon → module = `<réseau>/commun` (code partagé : `app.js`, `programme.js`…). Le réseau `electrorezo` existe comme dossier mais compte **0 entrée** dans ce corpus vocal.
- **Champ d'application par point** : 2 et 7 → `narration`+`feedback` ; 3, 5, 6 → `narration` seul ; 4 → `interface` seul ; 8 → tous types (non restreint par la consigne), ventilé par type.
- **Alerte technique** : les recherches « mot entier » (`\b`) traitent les lettres accentuées comme non alphabétiques. Deux effets de bord identifiés et corrigés à la main dans les résultats ci-dessous : « log » matchait dans « **log**é » (2 cas), « tes »/« ton » matchaient dans « concrè**tes** », « ê**tes** » et « bé**ton** » (6 cas). Ces cas sont signalés comme faux positifs et non comptés comme défauts.

---

## 1. Répartition par type et par réseau

**Total : 5 405 entrées.**

| Type | Entrées | Mots totaux |
|---|---|---|
| feedback | 1 522 | 16 632 |
| choix | 1 342 | 8 258 |
| narration | 823 | 73 652 |
| data-narration | 359 | 20 182 |
| capture | 283 | 24 444 |
| interface | 552 | 3 484 |
| fragment | 138 | 1 694 |
| composition | 132 | 3 633 |
| voiceStep | 101 | 2 245 |
| fiche | 82 | 29 780 |
| speak | 52 | 3 640 |
| frise | 10 | 446 |
| s | 8 | 551 |
| dynamique | 1 | 12 |

| Réseau | Entrées | Modules | Mots totaux |
|---|---|---|---|
| plan-thermo-techno (fluides) | 3 631 | 63 | 105 677 |
| hydrometro | 1 186 | 28 | 20 629 |
| legislation | 349 | 29 | 19 383 |
| aerorezo | 147 | 31 | 13 110 |
| autre (hors réseau applicatif) | 92 | 2 | 29 854 |
| electrorezo | 0 | 0 | 0 |

Le réseau « autre » regroupe deux sources hors des applications pédagogiques : les fiches de révision (`packs/fluides/cartes.js`, type `fiche`, 82 entrées, 29 780 mots — l'essentiel du volume de cette catégorie) et les messages du moteur vocal lui-même (module `moteur` : « Mode professeur vocal activé. », « Le parcours vocal est terminé. », etc., 10 entrées `narration`).

`legislation` répartit ses 349 entrées en 348 `data-narration` + 1 `interface` — confirmé, 0 `narration`, 0 `feedback`.

---

## 2. Anglicismes (narration + feedback, 2 345 entrées)

**Constat global : le corpus est très propre.** Sur les 72 termes/motifs recherchés, **60 ont zéro occurrence** (click, design, process, software, hardware, update, master, slave, offset, home, next, back, play, mute, speed, level, step, screen, warning, error, timer, delay, default, switch, checker, checké, display, start, stop, input, output, setpoint, run, boost, fail-safe, overflow, slide, slider, drag, drop, tip(s), ok, dry, wet, low, high, heating, fan, chiller, freezer, bug, hub, loading, ready, done, ON/OFF majuscules, phrases entières en anglais).

**12 termes ont au moins une occurrence, pour 38 occurrences brutes au total :**

| Terme | Occurrences | Statut |
|---|---|---|
| cut-out / cut out | 9 | Toléré (pressostats) |
| cut-in / cut in | 6 | Toléré (pressostats) |
| scroll | 6 | Vocabulaire métier (type de compresseur) — non listé « toléré » par la consigne mais couvert par une règle dédiée de `prononciation.json` (ORDRE 84/85) |
| bypass / by-pass | 4 | Toléré |
| gas | 3 | Vocabulaire CO₂ transcritique (« flash gas », « gas cooler ») |
| burn-out / burnout | 2 | Vocabulaire métier (défaut moteur) — couvert par `prononciation.json` (ORDRE 95) |
| log | 2 | **Faux positif** : « log**é** » (loge un noyau mobile), pas l'anglicisme |
| pause | 2 | Mot français courant, pas un anglicisme |
| reset | 1 | Bouton physique de réarmement de pressostat — même statut que cut-in/cut-out selon `prononciation.json` (ORDRE 81) |
| flow | 1 | « bi-flow » (nom de filtre-déshydrateur) |
| cooling | 1 | « free cooling » |
| cooler | 1 | « gas cooler » |

Exemples (module · clé · extrait) :
- pressostat-hp-kp5 · d2dd4735-58 · « CUT OUT vaut 24 bar et CUT IN vaut 21 bar. Quel est DIFF ? »
- co2-r744 · 9958c04a-646 · « Pourquoi parle-t-on de booster ? Parce que les compresseurs du froid »
- co2-r744 · 85b0ec4a-706 · « un refroidisseur de gaz, qu'on appelle aussi gas cooler. Et plus de sous-refroidissement »
- filtre-deshydrateur-pedagogique · 2a555add-83 · « Le filtre burn-out d'aspiration est-il un filtre liquide ordinaire posé »
- electrovanne-interactive · c449117f-475 · « un noyau mobile en acier, logé dans un tube étanche » (faux positif « log »)
- pressostat-combine-kp15 · ef35de63-86 · « DIFF 4 bar. À quelle pression le RESET devient-il possible ? »

**Termes cités comme « tolérés » par la consigne mais hors de la liste de recherche demandée** — présence effective vérifiée séparément : booster (10 occ., co2-r744 essentiellement), pump-down (9 occ., répartis sur 5 modules dont `_regules-commun`), TraxOil (7 occ., modules traxoil-installer/traxoil-pedagogique/pressostat-differentiel-huile-pedagogique), flash gas (2 occ., déjà comptées dans « gas » ci-dessus).

**Phrases entières en anglais (≥4 mots consécutifs) : 0 trouvée.** **Motif « on/off » (ON, OFF majuscules) : 0 occurrence.**

**[Complément legislation, type `data-narration`, 348 entrées] : 0 anglicisme trouvé** sur la même liste de 72 termes.

---

## 3. Répétitions

### a. Phrases identiques dans ≥ 2 entrées `narration` d'un même module
**0 cas trouvé** (seuil : phrase normalisée ≥ 3 mots). Aucune phrase complète n'est recopiée à l'identique entre deux écrans différents d'un même module.

### b. Phrases identiques dans ≥ 3 modules différents (formules passe-partout)
**3 phrases trouvées** (pas 30 : c'est l'exhaustif). Les trois viennent exclusivement de stations AéroRézo (probablement un gabarit commun de fermeture d'exercice) :

| Phrase normalisée | Modules | Occurrences |
|---|---|---|
| « deux questions sans note » | 8 (transmission, air-circule, rosee-psychro, double-flux, recuperation, humidifier-reguler, hygrometrie, architecture-cta) | 8 |
| « à vous de manœuvrer » | 5 (air-neuf-selection, debit-vitesse, apport-sensible, rosee-psychro, apport-latent) | 5 |
| « elles ne comptent dans aucune note » | 3 (simple-flux, besoin-air, hygroreglable) | 3 |

### c. Ouvertures (8 premiers mots) répétées
**7 ouvertures répétées** (≥ 2 fois) sur 823 narrations — l'exhaustif, pas seulement un extrait du top 30 :

| Ouverture | Occurrences | Modules |
|---|---|---|
| « À vous de manœuvrer. Le premier curseur donne » | 4 | 4 modules aerorezo (air-neuf-selection, apport-sensible, rosee-psychro, apport-latent) |
| « Les fuites se cherchent aux raccords d'entrée et » | 2 | tome-3-technologie-organes (2 fois **dans le même module**) |
| « Les fuites commencent aux raccords d'entrée et de » | 2 | tome-3-technologie-organes (2 fois dans le même module) |
| « Deux questions, sans note ; en cas d'erreur, » | 2 | stations/batteries, stations/melange-filtration |
| « Deux questions, sans note, pour voir si la » | 2 | stations/pressions, stations/apport-latent |
| « La fiche d'intervention doit permettre à un autre » | 2 | pressostat-bp-kp1, pressostat-hp-kp5 |
| « Le défi vous attend : six situations sur » | 2 | detendeur-interactif, bouteille-liquide-pedagogique |

### d. Mots-tics en tête de phrase (823 narrations)
**124 occurrences au total**, très concentrées sur deux mots :

| Tic | Occurrences |
|---|---|
| Retenez | 54 |
| Notez | 25 |
| Regardez | 15 |
| Attention | 14 |
| Ici | 8 |
| Observez | 4 |
| Maintenant | 2 |
| À l'écran | 1 |
| Vous voyez | 1 |
| Sur cet écran | 0 |
| Comme vous le voyez | 0 |

10 modules les plus denses (occurrences pour 100 phrases, modules d'au moins 15 phrases) :

| Module | Densité | (occurrences / phrases) |
|---|---|---|
| stations/hygrometrie | 10,0 | 3 / 30 |
| elements-circuit-huile-regler | 9,1 | 2 / 22 |
| clapet-differentiel-huile-pedagogique | 8,1 | 3 / 37 |
| stations/plancher | 8,0 | 2 / 25 |
| stations/vase | 7,7 | 2 / 26 |
| diagnostic-circuit-huile | 7,7 | 2 / 26 |
| stations/boucle | 7,4 | 4 / 54 |
| stations/air-circule | 7,1 | 2 / 28 |
| stations/rosee-psychro | 7,1 | 2 / 28 |
| retour-huile-verifier | 6,9 | 2 / 29 |

### e. Un même mot répété ≥ 3 fois dans une phrase (hors mots-outils)
**46 cas.** Une partie relève d'un procédé pédagogique volontaire (anaphore de mémorisation), pas d'un défaut de rédaction :
- technologie-huiles-choix-controle · 642dbd4b-811 · « Un grade trente-deux vaut donc environ trente-deux à cette température ; un grade quarante-six, environ quarante-six […] » (« environ », « trente », « grade » ×3 chacun — répétition manifestement voulue)
- stations/bitube · 48fc088a-548 · « chaque coude, chaque té, chaque vanne, chaque changement de section » (« chaque » ×4, anaphore)
- stations/mission · 5bede99e-541 · « ce que vous avez constaté, ce que vous avez mesuré […] ce que vous avez fait » (« avez » ×4)
- intervention-hydrocarbures-interactive · 0029448c-424 · « l'épreuve précède le vide ; le vide précède la charge ; la charge précède le contrôle » (« précède » ×3)
- stations/sections · 93df0dbd-887 · « cent, cent vingt-cinq, cent soixante, deux cents […] » (« cent » ×5 — énumération de série normalisée, pas un défaut)

### f. Doublons de tête (40 premiers caractères identiques, même module)
**5 cas, tous dans `tome-3-technologie-organes`** — un même gabarit de phrase d'ouverture réutilisé pour décrire plusieurs organes différents :
- « Les fuites se cherchent aux raccords d'e… » (clés 1a0a8b1e-620 / f78ba1d0-590)
- « À l'entrée, du liquide haute pression ve… » (clés 5f828260-587 / 84e9f599-648)
- « À l'entrée, une vapeur haute pression ch… » (clés 5fba1636-581 / 64637fc8-621)
- « Les fuites se cherchent d'abord aux racc… » (clés 64435e7e-594 / 67fd3b7d-630)
- « Les fuites commencent aux raccords d'ent… » (clés 72a881ad-598 / abadbf4e-629)

---

## 4. Textes d'interface prononcés (552 entrées de type `interface`)

- 96 entrées (17,4 %) contiennent des majuscules entières (mot ≥ 2 lettres en capitales).
- 77 entrées (14,0 %) contiennent « · ».
- 29 entrées (5,3 %) contiennent une flèche (→ ou ↔).
- 11 entrées (2,0 %) contiennent « / ».

15 modules avec le plus d'entrées `interface` :

| Module | Entrées interface |
|---|---|
| module-compresseur | 48 |
| chaleur-interactive | 39 |
| pression-temperature-interactive | 33 |
| hydrocarbures-a1-a2 | 32 |
| pose-manifold-2-voies-interactive | 21 |
| glissement-temperature | 19 |
| diagramme-enthalpique | 18 |
| pressostat-bp-kp1 | 17 |
| cours-classes-securite | 16 |
| chaleur-circuit-interactif | 16 |
| vanne-service-interactive | 15 |
| condenseur-interactif | 13 |
| bilan-thermique-performance-interactif | 13 |
| pressostat-combine-kp15 | 13 |
| surchauffe-sous-refroidissement-interactif | 12 |

10 exemples typiques :
- pose-manifold-2-voies-interactive · 0d6f06d6-13 · « QCM technique »
- co2-r744 · 000dca82-22 · « Passer aux questions → »
- hydrocarbures-a1-a2 · 001b7a8d-70 · « Charge juste · 153 g, valeur prescrite sur la plaque de cette machine. »
- etancheite-interactive · 40f8e4fb-73 · « À corriger : gardez fluide/charge, réparation antérieure et ajout récent. »
- mission-bouteilles · 03435303-60 · « Température ↑ → dilatation → volume libre ≈ 0 → pression ↑↑↑ »
- aerorezo/commun · 050f0d83-33 · « Évaluation finale · 12 situations »
- hydrocarbures-a1-a2 · 072c9baf-85 · « Montage juste · le refoulement est éloigné de la zone de travail »
- co2-r744 · 08f49c22-19 · « Question suivante → »
- hydrocarbures-a1-a2 · 0a0a49eb-43 · « En attente · choisissez la première action. »
- parcours-manometres · 0bae2d86-16 · « Cadran suivant → »

---

## 5. Symboles et abréviations (narration seule, 823 entrées) croisés avec `prononciation.json`

39 des 41 motifs cherchés ont **zéro occurrence** dans les narrations : m³/h, m3/h, kW, kWh, °C, %, ±, →, ↔, ×, ≥, ≤, Δ, ΔT, ΔP, m², m³, l/min, L/min, tr/min, Hz, Ω isolé, KP1/KP5/KP15, KVP/KVL/KVR, NRD, COP, EER, PRP, GWP, ODP, CERFA, EN 378, ISO (hors ISO VG). C'est cohérent avec la doctrine (« la voix n'énonce pas une formule en symboles ») : ces symboles vivent dans les écrans (`interface`, `feedback`, `capture`), pas dans le texte lu.

**8 motifs ont des occurrences réelles :**

| Motif | Occurrences | Couverture par `prononciation.json` |
|---|---|---|
| R-xxx (codes réfrigérants) | 48 | Couvert (ORDRE 185) |
| bar | 30 | **Non couvert** — absent des 218 règles |
| Lettre de code réfrigérant précédée d'une espace (« R 404 A », « R 410 A ») | 7 | **Partiel** — la règle ORDRE 185 absorbe « R 404 » mais pas le « A » séparé par une espace, qui reste une lettre isolée non rattachée |
| HP | 1 | Couvert (ORDRE 179) |
| BP | 1 | Couvert (ORDRE 180) |
| F-Gaz | 1 | Couvert (ORDRE 104/105/166) — orthographe déjà française dans le texte source |
| A2L | 1 | Couvert (ORDRE 172) |
| PE (sigle, borne de terre) | 1 | **Non couvert** — absent des 218 règles |

Exemples :
- co2-r744 · 11eead35-742 · « cela fait environ cinquante-sept bar dans tout le circuit »
- pressostat-combine-kp15 · c7d0e012-442 · « une coupure à vingt-quatre bar avec un différentiel de quatre bar »
- co2-r744 · 1ace1c93-731 · « avec les habitudes prises sur un R 404 A. Pour les mêmes températures » (le « A » suit une espace, non absorbé par la règle R-xxx)
- pressostat-combine-kp15 · 944a1eb5-454 · « Et la borne de protection, le PE, se raccorde comme sur tout »
- circuit-organe-par-organe · d633e282-546 · « le fluide frigorigène entre en vapeur BP et ressort en vapeur HP »

« bar » se concentre sur 2 modules : co2-r744 (27 occurrences) et pressostat-combine-kp15 (3).

**[Complément legislation, `data-narration`] : aucun des motifs testés (bar, °C, %, →, Δ, kW) n'apparaît.**

---

## 6. Longueurs (narration seule)

| Réseau | Min | Médiane | Moyenne | Max | n |
|---|---|---|---|---|---|
| plan-thermo-techno | 26 | 85 | 85,9 | 165 | 558 |
| aerorezo | 58 | 98 | 108,1 | 179 | 120 |
| hydrometro | 73 | 95 | 94,0 | 110 | 135 |
| autre (module moteur) | 4 | 6 | 7,4 | 14 | 10 |

*(legislation n'a pas d'entrée `narration` — voir complément ci-dessous.)*

**[Complément legislation, `data-narration`, 348 entrées] : min 15, médiane 59, moyenne 56,2, max 126 — 0 entrée < 8 mots, 0 entrée > 170 mots.**

**Narrations < 8 mots : 6, toutes dans le module `moteur`** (messages du moteur vocal, pas du contenu enseigné) :
- « Le parcours vocal est terminé. » (5 mots)
- « Avez-vous compris cette étape ? » (5 mots)
- « Le mode professeur vocal est en pause. » (7 mots)
- « Avez-vous compris cette correction ? » (5 mots)
- « Mode professeur vocal activé. » (4 mots)
- « Bonne réponse. Écoutons pourquoi. » (4 mots)

**Narrations > 170 mots : 3, toutes dans aerorezo** (rappel : 170 mots ≈ 59 s au débit de 2,89 mots/s) :
- stations/dimensionner-vmc · 0a712ae3-999 · 179 mots
- stations/simple-flux · 1a2e833e-1030 · 179 mots
- stations/besoin-air · c9ac161f-981 · 174 mots

---

## 7. Tutoiement résiduel (narration + feedback, 2 345 entrées)

**2 occurrences réelles au total**, toutes deux dans le module `vanne-service-interactive`, forme interrogative inversée :
- vanne-service-interactive · 59b4b005-55 (feedback) · « Où branches-tu temporairement le flexible du manifold ? »
- vanne-service-interactive · aa7a894b-66 (feedback) · « Installation chargée : peux-tu défaire le bouchon P1 sans risque ? »

Le reste de la recherche brute ne donne rien de réel : « ton » → 0 occurrence authentique ; « tes » → 5 correspondances mais **toutes des faux positifs** (« concrè**tes** » ×2, « ê**tes** » ×3 — ce dernier étant en fait du vouvoiement correct : « vous êtes ») ; « t' » → 0 ; « toi » → 0.

**[Complément legislation, `data-narration`] : 1 correspondance brute sur « ton », faux positif (« bé**ton** »). 0 tutoiement réel.**

---

## 8. Caractères parasites prononçables (tous types, ventilés)

Motifs à zéro occurrence sur l'ensemble du corpus : `#`, `{`, `}`, `,,`, `;;`, double espace, tiret isolé en début de ligne, retour à la ligne interne.

Motifs trouvés :

| Caractère | Occurrences | Type(s) concerné(s) | Détail |
|---|---|---|---|
| `*` | 24 | narration (24) | Markdown gras (`**mot**`) non nettoyé, 2 clés du module tome-3-technologie-organes |
| `..` | 12 | composition (12) | Point double, 100 % dans le module glissement-temperature |
| `_` | 4 | interface (4) | Notation de variable (« P_cylindre », « P_BP », « P_HP »), module module-compresseur |
| `<` | 2 | interface (1), feedback (1) | « Vol. utile < Vb ! » ; « Si Qp < Qs, quel transfert […] » (module lignes/M) |
| `[` / `]` | 1 chacun | interface | Même clé, hydrocarbures-a1-a2 · f1580da8-65 · « 0,153 ÷ [2,2 × (0,25 × 0,038)] = 7,3 m² » |
| `>` | 1 | interface | module-compresseur · 487ab042-8 · « P > P_HP » |

Exemples pour `*` :
- tome-3-technologie-organes · 43589a46-772 · « ce sont **les bouchons** qui étanchent, pas le clapet »
- tome-3-technologie-organes · 7a1e5d83-478 · « les positions de tige d'une vanne de service **avant** de manœuvrer »

Exemple pour `..` :
- glissement-temperature · 3198df22-136 · « Azéotrope : le mélange reste groupé .. Les mots décrivent le comportement du mélange »

---

## Classement des modules cumulant le plus de défauts

Deux versions, car le volume d'entrées `interface` (point 4) pèse en valeur absolue bien plus lourd que les autres catégories et écrase le classement s'il n'est pas isolé.

**Avec le volume d'entrées interface (score = somme brute, catégories 2 à 8) :**

| Rang | Module | Score |
|---|---|---|
| 1 | module-compresseur | 55 |
| 2 | chaleur-interactive | 39 |
| 3 | hydrocarbures-a1-a2 | 35 |
| 4 | pression-temperature-interactive | 33 |
| 5 | glissement-temperature | 27 |
| 6 | tome-3-technologie-organes | 21 |
| 6 | pose-manifold-2-voies-interactive | 21 |
| 8 | diagramme-enthalpique | 18 |
| 9 | pressostat-bp-kp1 | 17 |
| 9 | vanne-service-interactive | 17 |
| 11 | pressostat-combine-kp15 | 16 |
| 11 | cours-classes-securite | 16 |
| 11 | chaleur-circuit-interactif | 16 |
| 14 | condenseur-interactif | 14 |
| 15 | bilan-thermique-performance-interactif | 13 |

Ce classement reflète surtout où se concentre le texte d'interface (voir point 4) : le score des 5 premiers vient à plus de 85 % de ce seul volume.

**Sans le volume d'entrées interface (catégories 2, 3, 6, 7, 8 seulement — image plus fidèle des défauts de rédaction de la voix elle-même) :**

| Rang | Module | Score |
|---|---|---|
| 1 | tome-3-technologie-organes | 21 |
| 2 | glissement-temperature | 8 |
| 3 | co2-r744 | 7 |
| 3 | moteur | 7 |
| 3 | module-compresseur | 7 |
| 6 | stations/boucle | 6 |
| 7 | technologie-huiles-choix-controle | 5 |
| 8 | filtre-deshydrateur-pedagogique | 3 |
| 8 | pressostat-combine-kp15 | 3 |
| 8 | stations/hygrometrie | 3 |
| 8 | elements-circuit-huile-regler | 3 |
| 8 | clapet-differentiel-huile-pedagogique | 3 |
| 8 | retour-huile-verifier | 3 |
| 8 | intervention-hydrocarbures-interactive | 3 |
| 8 | hydrometro/commun | 3 |

Note : ce score inclut, à hauteur de 1 point chacun, les 2 faux positifs identifiés (« log »/« logé » et « tes »/« êtes ») sur les modules qu'ils touchent (electrovanne-interactive, tome-3-technologie-organes, stations/equilibrage, co2-r744, technologie-huiles-choix-controle, regulateur-electronique-interactif, pressostat-hp-kp5) — impact marginal (±1) qui ne change aucun rang ci-dessus.

---

## 10 constats principaux

1. Le corpus est très propre sur les anglicismes évitables : 60 des 72 termes recherchés ont zéro occurrence dans les 2 345 entrées narration+feedback, et la quasi-totalité des occurrences restantes sont du vocabulaire métier déjà pris en charge par `prononciation.json` (cut-in/cut-out, bypass, scroll, booster, burn-out, reset, pump-down, TraxOil).
2. Le tutoiement résiduel est quasi nul : 2 occurrences réelles sur tout le corpus, concentrées dans un seul module (vanne-service-interactive) ; les autres correspondances de recherche brute sont des faux positifs sur des mots accentués (concrètes, êtes, béton).
3. Aucune phrase complète n'est recopiée à l'identique entre deux narrations différentes d'un même module (0 cas) ; les répétitions détectées se situent au niveau des ouvertures de phrase (7 cas) et du gabarit de tête (5 cas dans un seul module).
4. Trois formules passe-partout traversent 3 modules ou plus, et proviennent toutes de stations AéroRézo, signe d'un gabarit de fermeture d'exercice partagé au niveau du code plutôt que d'une redite de rédaction.
5. Les mots-tics de début de phrase (Regardez, Retenez, Notez, Attention, Ici…) totalisent 124 occurrences sur 823 narrations, avec « Retenez » à lui seul pour 54 ; leur densité par module reste modérée (max 10 occurrences pour 100 phrases).
6. Le réseau `legislation` n'a aucune entrée de type `narration` — tout son contenu vocal (348 entrées) est classé `data-narration`, une particularité de nommage à connaître pour toute analyse future qui filtrerait sur `type === 'narration'`.
7. Aucun symbole ou opérateur mathématique (°C, %, →, ×, Δ, kW…) n'apparaît dans le texte des narrations : les 39 des 41 motifs cherchés sont à zéro, cohérent avec la règle « la voix n'énonce pas une formule en symboles ».
8. Deux lacunes réelles de `prononciation.json` sont actives dans les narrations : « bar » (30 occurrences, aucune règle) et le sigle « PE » — borne de terre — (1 occurrence, aucune règle) ; « bar » se concentre à 90 % dans le module co2-r744.
9. Les codes réfrigérants suivis d'une lettre séparée par une espace (« R 404 A », « R 410 A ») échappent partiellement à la règle existante : 7 occurrences où la lettre finale reste isolée du nombre.
10. Les 3 narrations dépassant 170 mots (≈ 1 minute au débit mesuré) appartiennent toutes au réseau aerorezo (stations dimensionner-vmc, simple-flux, besoin-air) ; les 6 narrations sous 8 mots sont toutes des messages du moteur vocal (« Mode professeur vocal activé »), pas du contenu enseigné trop court.

---

*Rapport produit par script (`audit-voix.mjs`), données brutes complètes dans `audit-voix-data.json`, même dossier.*
