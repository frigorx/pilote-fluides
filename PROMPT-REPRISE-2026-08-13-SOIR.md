# Reprise — 13 août 2026 au soir

> **À coller au début du prochain chat.** Il dit ce qui a été fait, où en sont les dépôts,
> ce qui reste, et les pièges déjà payés. Écrit pour être lu seul, sans le chat précédent.

---

## 1. Ce qui a été fait aujourd'hui : chaque chapitre a sa capsule narrée

Demande de F. Henninot : *« chaque chapitre, chaque document de l'autoformation, une animation
et un vocal — soit on l'a déjà fait, on le récupère, soit il faut le créer »*.

**Avant** : sur 49 fiches de cours du pack, 25 avaient une expérience interactive, **24 n'avaient
que du texte** — dont les 5 fiches de sécurité et les 5 exercices « détective ».
**Après** : `node build/capsules.mjs` répond « aucune fiche de cours sans capsule ni expérience ».

### Ce qui a été construit

`packs/fluides/res/capsules/` — **un moteur unique piloté par données**, pas 24 applications :

| fichier | rôle |
|---|---|
| `index.html?c=<id>` | la coquille, la même pour toutes ; `&e=3` ouvre un écran, `&mode=projection` agrandit pour la salle |
| `capsule.js` | voix, rail de progression, contrôle à correction expliquée, livret imprimable |
| `animations.js` | **12 motifs vectoriels** : etages · duo · sequence · jauge · frise · alerte · flux · zone · balance · checklist · barres · cycle |
| `donnees/<id>.js` | **le contenu d'un chapitre** — le seul fichier à écrire pour une capsule de plus |
| `LIRE-MOI.md` | le contrat d'écriture (champs, motifs, règles, contrôle) — **à lire avant d'en écrire une** |
| `_motifs.html` · `_controle.html` | la planche d'essai des motifs · la mesure de toutes les animations |

**La voix est celle de la machine** (`speechSynthesis`) : aucun fichier son n'est produit.
⚠️ **C'est ce qui lève la règle n° 1 de `CAPSULES-SECURITE.md`** (« aucune capsule avant la
relecture métier ») : corriger une erreur métier revient à corriger une ligne de texte.

### Mesuré, pas estimé

24 capsules · **151 écrans** · 123 animations · **151/151 écrans ont leur texte de voix rédigé
pour l'oreille** · 44 contrôles de compréhension · 0 texte hors cadre, 0 libellé qui en recouvre
un autre. Support de projection : **504 → 530 diapositives**, dont **30 → 56 diapositives de
lancement** (le formateur déroule la capsule devant le groupe au lieu de commenter du texte).

Commit local `11b6e22`, 122 fichiers. Dépôt propre.

### Deux leçons à ne pas réapprendre

1. **Les 11 premières animations fautives venaient des MOTIFS, pas de la rédaction** : ils
   supposaient des textes courts. Un motif doit s'adapter à la longueur du texte (`maxLignes`,
   `pied()`, `dansLeCadre()`), jamais l'inverse.
2. **Le contrôle se mesure, il ne s'apprécie pas** : `_controle.html` rend chaque animation et
   compare les boîtes de texte. À l'œil, sur 123 dessins, personne ne voit un chevauchement.

---

## 2. État des dépôts — TROIS versions divergentes du pack

Base commune `b59b57f` (5 août). Depuis, trois branches ont poussé **séparément** :

| où | quoi | écart |
|---|---|---|
| `C:\git\pilote-fluides` | remédiation, illustrations, **les 24 capsules** | +8 commits |
| `github.com/frigorx/pilote-fluides` | **symboles QElectroTech** (4 704) + 16 schémas, arrivés par pull request | +5 commits |
| `C:\git\pilote-fluides-codex-travail` | ⭐ **1 423 narrations MP3** (5 h 54, 125 Mo) + mode professeur vocal | +2 commits |

⚠️ **Un `git push` échouera** tant que les trois ne sont pas réunies. Rien n'est perdu.

⭐ **Le fonds de voix mérite d'être récupéré** : `moteur/voix.js` garde l'API `speechSynthesis`
et substitue le MP3 quand le texte est à l'index — **les capsules en hériteraient sans changer
une ligne** de leur moteur. Et si un texte change sans que son MP3 soit refait, la clé ne
correspond plus et la synthèse reprend la main : un vieil enregistrement ne peut pas lire un
contenu devenu faux.

**Autres dépôts touchés aujourd'hui, tous commités et propres** : `tableau-de-bord` (carte
pilote-fluides + les 3 copies synchronisées, empreintes vérifiées), `poste-pilotage` (bloc
pilote-fluides).

**Copies rafraîchies** : `C:\inerWeb-HabFlu` et `Desktop\DEMO-inerWeb-Habilitation` (robocopy,
sans suppression : leurs 11 capsules d'atelier sont intactes) · paquet
`C:\git\paquets\inerWeb-Centre.zip` refait (2 471 fichiers, contrôles de sûreté au vert).

---

## 3. Ce qui reste — classé par nature

### Ce que personne d'autre que F. Henninot ne peut faire

- **Écouter les 24 capsules** et corriger ce qui doit l'être. Elles s'ouvrent depuis chaque
  fiche (bouton « 🎧 Écouter la capsule »). Le texte se corrige dans `donnees/<id>.js`,
  aucun réenregistrement.
- **Décider du sort des deux systèmes de capsules** (voir § 4).
- **Trancher le push** : réunir les trois versions avant de publier.
- Le reste de son attente d'avant : relecture métier des collègues, contrôle des 355 poses
  d'illustration (côté Hub), photos de gestes G10/G11.

### Codable tout de suite, sans rien attendre

**Neuf modules livrés n'ont jamais quitté le Bureau** (`Desktop\inerweb full ia`) :

| module | livré le |
|---|---|
| Comprendre la bouteille liquide — l'ORGANE, à ne pas confondre avec Mission Bouteilles | 04/08 |
| Filtre déshydrateur v3 | 06/08 |
| Vanne Rotalock (+ 8 zips v3/v4/v5) | 02/08 |
| Voyant de liquide v6 | 06/08 |
| Surchauffe et sous-refroidissement — ≠ Froid Clim Académie, qui est un module général | 31/07 |
| Régulateur KVL, pression de carter | 06/08 |
| Coupe-tube · Dudgeonnière · Mini-dudgeonnière | 09/08 |
| TP RA20 — équilibrage | 10/08 |

**+ la cintrette** : la livraison du Bureau porte les niveaux 2 et 3 avec **210 fichiers audio** ;
le dépôt `tp-cintrage`, celui qui est en ligne, n'a **ni les niveaux 2-3 ni le moindre son**.

**+ la bibliothèque d'animations n'est pas à jour** : `C:\git\atelier-animations` →
`github.com/frigorx/inerweb-parcours`, son dossier `refonte/modules/` ne contient **qu'un
module** (régulateurs KV). C'est là que les composants autonomes devraient se ranger.

**Ordre proposé** (non validé par F. Henninot) : 1) les quatre composants du circuit dans la
bibliothèque, puis reliés aux fiches d'organes du pack ; 2) la cintrette et ses voix dans
`tp-cintrage` ; 3) la réunion des trois versions du pack, pour récupérer les 1 423 narrations.

### Anomalies connues, antérieures, non traitées

- `detendeur-interactif` et `electrovanne-interactive` n'ont pas de `couverture.json`
  (le registre les signale : « ils enseignent, mais rien ne le prouve »).
- La frise vivante réclame 10 images d'ambiance jamais fournies : 10 requêtes en erreur par
  visite, **sans effet visible** (le code est gardé). Une tâche séparée a été ouverte.

---

## 4. Deux systèmes de capsules coexistent — le savoir avant d'en ajouter une

| | où | quoi | voix |
|---|---|---|---|
| **Capsules de l'atelier** | `C:\git\atelier-animations\refonte\capsules\` (11) | sujets **transversaux** : chaleur, surchauffe, circuit, bouteilles, lire le code, pression-température, tirage au vide, récupération, étanchéité, classes de sécurité, familles et PRP | **fichiers son enregistrés** → figés, d'où leur blocage en attente de relecture |
| **Capsules du pack** | `pilote-fluides/packs/fluides/res/capsules/` (24) | **un chapitre du pack = une capsule**, celles qui n'avaient que du texte | synthèse du navigateur → corrigeables à la ligne |

Ils ne se recouvrent pas (les 11 portent sur des fiches qui avaient déjà un cours interactif) et
n'entrent pas en collision dans le paquet. Mais **deux mécaniques pour une même idée** : la
doctrine de F. Henninot est d'élaguer plutôt que d'empiler. Décision à lui demander.

---

## 5. Pièges payés, à ne pas repayer

1. **Comparer les TITRES, jamais les noms de dossier** : un premier inventaire avait pris
   « Comprendre la bouteille liquide » pour « Mission Bouteilles ». Deux sujets sans rapport.
2. **`cartes.js` est la source unique** : `pack.eleve.js`, `pack.pilote.js`, `projection.gen.js`,
   `relecture.html`, `galerie.html`, la matrice et le registre sont **générés**. Ne jamais les
   éditer à la main.
3. **`relecture.html` ne montre aucune expérience** : elle retire tout le HTML par construction,
   c'est un bon à tirer du texte. Ce n'est pas un défaut.
4. **cl3, cl4 et x1 n'ont pas de diapositive de projection** : leurs séquences sont en
   autoformation « avant » / « pendant », ou hors déroulé. Normal.
5. **`cartes.js` est en fins de ligne LF** : réécrire en CRLF ferait un diff de 4 500 lignes.
6. Le dossier `Desktop\inerweb full ia` **n'est pas un dépôt git** : tout effacement y est
   définitif.

---

## 6. Les commandes

```bash
# Contrôler les capsules (structure, voix, motifs, SVG cités, codes du référentiel)
node build/capsules.mjs

# Accrocher les capsules aux fiches (idempotent, relançable)
node build/relier-capsules.mjs

# Reconstruire toute la chaîne
node build/build.mjs && node build/parcours.mjs && node build/relecture.mjs
node build/galerie.mjs && node build/registre.mjs && node build/chiffres.mjs

# Regarder : servir le dépôt en HTTP, puis ouvrir
npx -y http-server C:\git\pilote-fluides -p 2031 -c-1
#   application élève            http://localhost:2031/index.html
#   une capsule                  http://localhost:2031/packs/fluides/res/capsules/index.html?c=g0
#   la mesure des animations     http://localhost:2031/packs/fluides/res/capsules/_controle.html
#   la planche des motifs        http://localhost:2031/packs/fluides/res/capsules/_motifs.html

# Réinventorier les livraisons du Bureau (outil de F. Henninot)
node C:\git\usine-contenu\outils\auditer-versions-productions.mjs --racine "~\Desktop\inerweb full ia" --extra C:\git\pilote-fluides --ecrire
```

---

## 7. Décision de F. Henninot actée aujourd'hui

**Les images `bib-…` sont les siennes**, il les a créées : la question des droits est close, la
garde de push posée le matin est levée. *« Ne pose pas de questions : s'il y a des illustrations
à intégrer tu dois le faire. »* Ne plus reposer la question à chaque intégration.
