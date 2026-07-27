# Prompt de reprise — à coller comme PREMIER message d'un nouveau chat

> Écrit le 27/07/2026 en clôture de session. **Autonome** : tout ce qu'il faut pour reprendre est
> ici. Conçu pour **économiser les tokens** — la § 8 dit quoi lire et surtout **quoi ne pas lire**.
> Session conseillée : **Opus, effort élevé**. Pas d'ultracode hors point critique.

---

## 1. Le projet en huit lignes

Pack de formation **habilitation fluides frigorigènes** (A1 · A2 · D · E), dans le moteur générique
inerWeb Pilote. Dépôt public `github.com/frigorx/pilote-fluides`, en ligne sur
`frigorx.github.io/pilote-fluides/`. Double usage : support de salle **et** outil d'autoformation.

**81 cartes · 258 questions · 33 planches SVG · 44 fiches de cours, toutes illustrées.**
Couverture du référentiel **100 % A1/A2/D/E**, profondeur **94/94 tenus**, poids élève **673 Ko**.

🔴🔴 **CE DOSSIER PART À L'AGRÉMENT** (décision F. Henninot, 27/07) : agrément du centre de
formation. Ce n'est plus du contenu pédagogique, c'est une **pièce opposable**. Tout ce qui est
annoncé doit exister, tout chiffre doit être traçable, les mesures deviennent des **preuves**.

---

## 2. Où en est le travail

**Branche `claude/pilote-fluides-chantier-1-ydvhvu`, 9 commits, PR #1 ouverte en brouillon.**
Rien n'est fusionné dans `main`. **Premier geste de la prochaine session : décider si on fusionne.**

### ✅ Fait le 27/07

**Le socle théorique — les 4 chantiers de `CONSIGNES-SOCLE-THEORIQUE.md` sont FAITS.**
Tous les zéros mesurés sont comblés :

| Notion | Avant | Après |
|---|---:|---:|
| chaleur sensible · latente | 0 · 0 | 12 · 16 |
| titre de vapeur | 0 | 6 |
| surchauffe utile · totale | 0 · 0 | 4 · 3 |
| KVP · KVL · KVR | 0 · 0 · 0 | 3 · 3 · 3 |

- **Chantier 1** — nouvelle fiche `g1e` « chaleur sensible et latente : le palier » (573 mots),
  `g1a` dégraissée et renommée, glissement des zéotropes déménagé.
- **Chantier 2** — `g1b` 105 → **803 mots** (log p-h, cloche, titre de vapeur, cycle en 4 temps).
  FRIGOLO Mollier exploité en protocole guidé, embarqué via le nouvel assistant `outilAtelier()`.
- **Chantier 3** — `g4b` 91 → **532 mots** (le geste de la surchauffe, utile / totale).
  ⚠️ **Écart assumé** : la consigne demandait une fiche dédiée, c'est fait dans `g4b`. À trancher.
- **Chantier 4** — `g7b` et `g8b` : les trois régulateurs **nommés**, planche dédiée.

**Le CERFA** — fiche `g5c` (712 mots), alignée sur les **72 champs réels** du formulaire officiel
relevés dans `inerweb-fluide`. Codes 3.05 · 4.09 · 5.07.

**Le plan de formation** — `PLAN-SEQUENCE-4J5.md` : constat mesuré, cadre horaire, grille jour par
jour, plan de séance minuté, répartition salle/amont.

**L'instrument de profondeur durci deux fois** (v0.3 → v0.5), sur 1.02 puis 1.03. Contrefactuels
tirés : l'ancien contenu tombait à 6/9 puis 3/5.

---

## 3. Ce qui reste à faire, dans l'ordre

### 🔴 1. Refaire `parcours.js` — le plus structurant, et rien ne bloque

Le parcours actuel est **celui d'avant le virage pédagogique** : un déroulé linéaire de 27 h 40 de
salle, sans catégorie, sans enveloppe, sans plateau ni épreuve. Il faut :

- **typer les blocs** : `amont` · `positionnement` · `theorie` · `atelier` · `bachotage` · `epreuve`
  (aujourd'hui : seulement `cours`, `exercice`, `bilan`) ;
- **un parcours par catégorie** (D suit 21 séquences sur 54, rien ne le dit) ;
- **l'enveloppe déclarée et CONTRÔLÉE au build**, récréations et déjeuner compris — le build doit
  refuser ou au moins écrire un dépassement, comme `COUVERTURE-REFERENTIEL.md` ;
- **coder le plan de séance** du § 5 de `PLAN-SEQUENCE-4J5.md` (option B, 4,5 jours).

### 🔴 2. Le garde-fou de VOLUME (§ 5 des consignes) — toujours pas écrit

La profondeur ne détecte pas la maigreur. À ajouter dans `build/profondeur.mjs` : signaler qu'une
fiche portant un code théorique fait moins de N mots.

⚠️ **Compter corps + encadrés, pas le corps seul.** `g7b` a été enrichie dans ses blocs : elle fait
**118 mots de corps mais 488 avec les encadrés**. Un garde-fou qui ne lit que le corps la dénoncerait
à tort — et raterait l'inverse.

Fiches encore minces (corps seul) : `g7` 101 · `g7b` 118 · `g9` 119 · `g2` 128 · `g10` 128 ·
`g2a` 154. **`g10` à 128 mots est le plus gênant : le brasage est NOTÉ et OBLIGATOIRE à l'épreuve.**

### 🟠 3. Le parcours AMONT balisé

L'élève reçoit 44 fiches en vrac. Il lui faut une progression jalonnée « avant le jour 1, faites
ceci ». C'est la condition de réussite du modèle : **si le stagiaire ne travaille pas avant, il
échoue** — et cela doit figurer dans la convocation.

### 🟠 4. Le marquage des points clés

Pour chaque fiche : ce qui doit absolument être dit en salle, distinct du contenu complet.
Un champ à ajouter à côté de `notes_pilote`.

### 🟠 5. Un ton pour professionnels

Le contenu explique chaque mot technique à sa première apparition — juste pour un public FLE/DYS en
formation initiale, condescendant devant des frigoristes en requalification. Couche à **ajouter**,
pas à substituer : les deux publics coexistent.

### 🟢 6. Divers

Police adaptable (FLE/DYS), 12 h de bachotage pour 258 questions (il en manque), captures d'écran
de l'outil CERFA quand `inerweb-fluide` partie formation sera prêt.

---

## 4. Décisions tranchées — NE PAS LES ROUVRIR

- **Requalification, pas formation initiale.** Autoformation amont → test de niveau → points clés
  en salle → atelier → bachotage → épreuve. ~20 h basculent de la salle vers l'amont.
- **Calendrier option B** : formation mardi → vendredi midi, week-end de révision, lundi matin
  révision, lundi après-midi l'épreuve. **4,5 jours exactement** — c'est une **contrainte de
  financement**, non négociable.
- **Journée réduite à 7 h comptées** (8 h 30 – 17 h 00), matin théorie / après-midi pratique.
- **Manipulation à l'azote**, pour ne pas se tromper.
- **Durées d'épreuve = celles de l'arrêté**, pas un choix d'organisme. A1 : **1 h 15 théorie +
  3 h pratique = 4 h 15**. Le CERFA est évalué à la **pratique**.
- **Le brasage (10.01) est P et OBLIGATOIRE** — G10 n'est pas tiré au sort, il tombe à coup sûr.
  Idem G3 (pression, vide). D'où **deux ateliers pleins, 6 h 30**.
- **Le CERFA reste dans ce pack** ; seul l'**outil de saisie** vit dans `inerweb-fluide` (PDF
  auto-remplissable sur tablette). ~10 tablettes Android = prérequis d'exploitation.
- **Outils de suivi : plus tard.** Aujourd'hui la pédagogie. Résultats envoyés, traités sur PC
  fermé. Stagiaires **majeurs** → RGPD très allégé. Futur logiciel d'évaluation : tablettes dédiées
  sur réseau fermé, jamais les téléphones.
- **On ne jette rien.** Les fiches denses sont le « livre » de l'autoformation, pas du gaspillage.
- Zéro invention chiffrée · croix du frigoriste · R-290 = A3 · azote seul · pas de PWA.

---

## 5. Ce qui attend F. Henninot

1. **Fusionner la PR #1 ?** 9 commits en attente.
2. **Chantier 3 : `g4b` ou fiche dédiée ?** (écart assumé, § 2)
3. **Surchauffe utile / totale** : la formulation est-elle juste ?
4. ⚠️ **Divergence non tranchée** : la charte du pack dit surchauffe **5-10 K**, FRIGOLO affiche
   d'autres repères et distingue utile / totale. Aucune valeur d'utile/totale n'a été écrite, exprès.
5. **KVP / KVL / KVR** : les trois descriptions sont écrites **de mémoire technique**, pas lues sur
   une documentation constructeur. **À valider — le dossier part à l'agrément.**
6. **Le composant tiré au sort** : traité comme support de geste plutôt que comme module, ça suffit ?
7. **Les « 48 h »** : le décompte réel donne 32 h 15.
8. 🔴 **LA RELECTURE MÉTIER** — bloquant absolu, et l'agrément la rend indispensable.

---

## 6. Pièges du dépôt (payés cher)

1. **`build/convert.mjs` ne tourne QUE sur le poste de F. Henninot** (sa source Mission F-GAZ est en
   local). Les questions ajoutées l'ont été via un script qui rejoue sa transformation exacte, et
   `REMEDIATION_FINE` a été modifié en parallèle. **Un `node build/convert.mjs` doit produire un
   `banque.gen.json` identique — à vérifier.**
2. **`COUVERTURE-REFERENTIEL.md`** : sa dernière ligne bascule en « dépôt amont absent » sur toute
   machine sans `habilitation-fluide`. **La restaurer avant de committer.**
3. **Ne jamais déclarer un code que la fiche n'enseigne pas** — le build le vérifie sur le bandeau
   `dc`, pas sur le contenu.
4. **Un schéma ne se met jamais en `illus`** : passer par `schema()`.
5. **SVG animés** : base = état final, `.final` révélé par l'animation, `@media
   (prefers-reduced-motion)` force l'affichage. **Toujours vérifier au navigateur dans les deux
   modes** — 6 collisions de textes n'ont été vues que comme ça.
6. **Vérification navigateur obligatoire** après chaque chantier : les tests Node ne voient pas tout.

---

## 7. Commandes

```bash
node build/build.mjs        # cartes + banque → pack.eleve.js / pack.pilote.js + couverture + profondeur
node build/parcours.mjs     # → projection.gen.js (le support de salle)
node build/relecture.mjs    # → relecture.html (le bon à tirer)
node build/convert.mjs      # ⚠️ poste de F. Henninot uniquement
python -m http.server 8123  # puis http://localhost:8123/
```

---

## 8. ⚠️ ÉCONOMIE DE TOKENS — quoi lire, quoi NE PAS lire

**Ce fichier suffit pour démarrer.** Ne charge rien d'autre tant que tu n'en as pas besoin.

| Fichier | Quand le lire |
|---|---|
| **ce fichier** | toujours, et seul, pour démarrer |
| `PLAN-SEQUENCE-4J5.md` | **seulement** pour refaire `parcours.js` (§ 5 = le plan minuté) |
| `CONSIGNES-SOCLE-THEORIQUE.md` | **seulement** pour le garde-fou de volume (§ 5) |
| `REPRISE.md` | ⚠️ **794 lignes** — n'y aller que pour un point précis, jamais en entier |
| `packs/fluides/cartes.js` | ⚠️ **~4 500 lignes** — toujours par `grep -n 'id: "gXX"'` puis lecture ciblée |
| `referentiel-2025.json` | par requête `node -e`, jamais en lecture directe |

**Réflexes qui économisent** : `grep -n` avant tout `Read` · lire par plage (`offset`/`limit`) ·
interroger les JSON par `node -e` · ne pas relire un fichier qu'on vient d'écrire · faire la mesure
avant d'écrire, elle évite d'écrire faux.

---

*F. Henninot · inerWeb Édu — arrêté du 21 novembre 2025, règlement (UE) 2024/573.*
