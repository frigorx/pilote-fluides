# Consignes — remettre à niveau le SOCLE THÉORIQUE du pack

> **Écrit le 27/07/2026**, après un constat de F. Henninot : *« un doute, la durée des parties
> théorie, et le diagramme pas assez développé ; et sur surchauffe / sous-refroidissement non
> plus ; surchauffe totale, sous-refroidissement, chaleur sensible et latente. À l'époque on
> avait KVP, KVL aussi, de techno. »*
>
> **Les cinq doutes ont été vérifiés par la mesure. Les cinq sont fondés.**
> Ce document est autonome : il contient le constat chiffré, les chantiers dans l'ordre, les
> règles à tenir et les arbitrages. Pas besoin de la conversation d'origine.
>
> À lire APRÈS `REPRISE.md` (le point d'entrée du projet), pas à sa place.

---

## 1. Le constat, mesuré

Toutes ces mesures sont **reproductibles** — ne pas les croire sur parole, les rejouer.

### a) Des fiches théoriques qui ne remplissent pas leur durée

```bash
node --input-type=module -e "
const {CARTES}=await import('file:///C:/git/pilote-fluides/packs/fluides/cartes.js');
['g1a','g1b','g1c','g2','g2a','g7b','g8b'].forEach(id=>{const c=CARTES.find(x=>x.id===id);
const n=(c.corps||'').replace(/<[^>]+>/g,' ').split(/\s+/).filter(Boolean).length;
console.log(id.padEnd(5),(c.titre||'').slice(0,44).padEnd(46),n+' mots');});"
```

| Fiche | Sujet | Volume | Durée prévue en salle |
|---|---|---|---|
| `g1b` | Lire un log p-h et une table de saturation | **105 mots** | **45 min** |
| `g7b` | Condenseur — installer, régler, vérifier | **118 mots** | 35 min |
| `g2` | Impact environnemental et F-Gas | 128 mots | 40 min |
| `g2a` | Quarante ans d'histoire | 154 mots | 35 min |
| `g8b` | Évaporateur — installer, régler, vérifier | 236 mots | 40 min |
| `g1a` | Unités, pression, thermodynamique utile | 250 mots | 45 min |

**Le doute sur les durées est fondé, mais à l'envers de ce qu'on croirait : les durées sont
plausibles pour un cours, c'est le CONTENU ÉCRIT qui ne les remplit pas.** Comparaison utile :
les fiches de sécurité et de CO₂ (réécrites le 26/07) font 800 à 1200 mots. Le socle théorique
est resté au niveau du démonstrateur d'origine.

### b) Des notions absentes, alors qu'elles fondent tout le reste

```bash
for m in "chaleur sensible" "chaleur latente" "surchauffe totale" "surchauffe utile" \
         "point de rosée" "vaporisation" "KVP" "KVL" "titre de vapeur"; do
  printf "%-22s : " "$m"; grep -oi "$m" packs/fluides/pack.eleve.js | wc -l; done
```

| Notion | Occurrences dans tout le contenu élève |
|---|---|
| chaleur sensible | **0** |
| chaleur latente | **0** |
| surchauffe totale | **0** |
| surchauffe utile | **0** |
| vaporisation | **0** |
| titre de vapeur | **0** |
| KVP · KVL | **0 · 0** |
| point de rosée | 1 |
| *pour comparaison :* surchauffe | *97, réparties sur 9 fiches* |
| *pour comparaison :* sous-refroidissement | *39, réparties sur 6 fiches* |

**C'est le manque le plus structurel du pack** : la surchauffe est employée 97 fois sans que le
concept qui la fonde — le palier de changement d'état, la chaleur latente — soit posé une seule
fois. Or la surchauffe *est* le retour en chaleur sensible après le palier de vaporisation. On
demande au stagiaire d'utiliser un mot dont on ne lui a jamais donné le sens physique.

### c) Le référentiel exige ce qui manque

| Code | Libellé officiel (extrait) | Porté par | Volume |
|---|---|---|---|
| **1.02** | thermodynamique élémentaire : terminologie, paramètres | `g1a` | 250 mots |
| **1.03** | utiliser les tableaux et graphiques et les interpréter | `g1b` | **105 mots** |
| **5.05** | déterminer l'état : sous-refroidi, **saturé** ou **surchauffé** | `p6`, `g5b` | *fiches de pesée et de charge* |
| **7.02** | mettre au point le **régulateur de pression de sortie du condenseur** | `g7b` | **118 mots** |
| **8.02** | mettre au point un **régulateur de pression d'évaporation** | `g8b` | 236 mots |
| **8.07** | régler la **soupape de régulation de la pression d'évaporation** | `g8b` | 236 mots |

Deux enseignements :
- **5.05 n'est enseigné nulle part.** Il est porté par deux fiches de *manipulation* (peser,
  charger). Aucune fiche n'enseigne l'état d'un fluide ; toutes l'utilisent.
- **Les régulateurs de pression sont bien au référentiel** (F. Henninot avait raison). La
  fonction générique est citée 14 fois, mais **aucun composant n'est nommé** : un stagiaire
  devant une vanne KVP ne la reconnaîtra pas.

### d) Ce que cela révèle sur nos garde-fous

Le build affiche « profondeur : 94 codes — 🟢 94 tenus ». Or `g1b` « tient » le code 1.03 avec
**105 mots**. **La mesure de profondeur ne détecte pas la maigreur** : elle vérifie que des
motifs sont présents, pas que le sujet est traité. Voir § 5, un garde-fou est à ajouter.

---

## 2. Les quatre chantiers, dans l'ordre

L'ordre est celui des **dépendances** : chacun a besoin du précédent. Ne pas le changer.

### ✅ Chantier 1 — Chaleur sensible et chaleur latente (le fondement) — FAIT le 27/07

> **Fiche `g1e` « Chaleur sensible et chaleur latente : le palier »**, 30 min, jour 1, entre
> `g1a` et `g1b`. Porte le code **1.02**, rendu par `g1a`. 544 mots de corps, 967 avec les
> encadrés. Planche `res/svg/chaleur-palier.svg`. 4 questions `pk-g1e-*`, 5 remédiations
> réaiguillées. Instrument de profondeur durci sur 1.02 (v0.4). Détail au § 2 de `REPRISE.md`.
>
> **Arbitrage n° 3 tranché par F. Henninot (27/07)** : *nouvelle fiche dédiée **ET** dégraissage
> de `g1a`*. `g1a` passe de 45 à 30 min et rend l'enthalpie, les repères de surchauffe et de
> sous-refroidissement, et le glissement des zéotropes ; elle est renommée « Unités, pression et
> les quatre organes » — elle annonçait « thermodynamique utile » sans la tenir. Jour 1 :
> **6 h 20 → 6 h 35**.
>
> **Arbitrage n° 2, partiellement tranché de fait** : les valeurs 5-10 K et 4-8 K sont ÉCRITES
> dans `g1e` (la charte les autorise, et elles y étaient déjà, dans `g1a`), avec la mention
> « à recaler sur la documentation du constructeur ». Le chantier 3 pourra revenir dessus.
>
> **Ce qui a été volontairement laissé au chantier 3** : la MESURE de la surchauffe (méthode
> indirecte, geste de `g4b`) et la distinction **utile / totale** — toujours à 0 occurrence.
> `g1e` installe le sens du mot, pas le geste.
>
> **Ce qui n'a PAS été fait, et qui n'est pas dans ce chantier** : le garde-fou de volume du § 5.

**Nouvelle fiche**, ou développement franc de `g1a`. C'est ce qui manque à tout le reste.

À enseigner : chauffer un corps sans qu'il change d'état fait monter sa température — c'est la
**chaleur sensible**, celle que le thermomètre « sent ». Lui faire changer d'état (liquide →
vapeur) absorbe une quantité de chaleur **sans que la température bouge** — c'est la **chaleur
latente**, et c'est le palier. Une machine frigorifique ne fait rien d'autre que déplacer de la
chaleur latente : l'évaporateur en absorbe en faisant bouillir le fluide, le condenseur la rend
en le liquéfiant. C'est pour cela qu'on travaille avec un fluide qui change d'état, et pas avec
de l'air.

Enchaîner immédiatement sur les mots que le pack emploie déjà partout : **liquide sous-refroidi →
point de bulle → palier (mélange liquide + vapeur, saturé) → point de rosée → vapeur surchauffée**.

### Chantier 2 — Le diagramme log p/h (`g1b`, à passer de 105 mots à une vraie fiche)

Ce que le stagiaire doit savoir faire, dans cet ordre :
- **lire les axes** : pression en ordonnée (échelle logarithmique, et pourquoi), enthalpie en
  abscisse ;
- **reconnaître les trois zones** séparées par la courbe en cloche : liquide sous-refroidi à
  gauche, mélange au centre, vapeur surchauffée à droite ;
- **placer les deux frontières** : courbe de bulle et courbe de rosée ;
- **tracer le cycle** en 4 transformations, dans l'ordre de la croix du frigoriste
  (compression · condensation · détente · évaporation) ;
- **y lire la surchauffe et le sous-refroidissement** — c'est le lien avec le chantier 3 ;
- faire le pont avec la **table de saturation** : la même information, sous forme de tableau.

Renvoyer vers l'outil déjà embarqué (`r-mollier`, FRIGOLO log p-h interactif) et vers
`r-enthalpique` : ils existent, ils ne sont pas exploités.

### Chantier 3 — Surchauffe et sous-refroidissement (fiche dédiée)

Aujourd'hui : 136 emplois, zéro enseignement. À poser proprement.
- **Ce que c'est** : nombre de kelvins au-delà (ou en deçà) du point de saturation, à la pression
  mesurée. Donc toujours une **différence**, jamais une température absolue.
- **Comment on la trouve** : pression lue au manomètre → température de saturation par la table
  ou la réglette → comparaison avec la température mesurée sur le tube. C'est le geste de `g4b`
  (méthode indirecte), qui existe déjà : le relier.
- **Surchauffe utile / surchauffe totale** : la distinction demandée par F. Henninot. Utile = à
  l'évaporateur, ce qui sert au froid ; totale = utile + ce que la ligne d'aspiration ajoute.
  ⚠️ **Faire valider cette formulation** avant publication.
- **Pourquoi on la règle** : trop peu, le compresseur risque le retour de liquide ; trop, il
  s'échauffe et le rendement chute. Sous-refroidissement : garantir du liquide pur au détendeur.
- **Valeurs** : la charte **autorise** surchauffe **5-10 K** et sous-refroidissement **4-8 K**
  (voir § 3). Les donner, en précisant qu'elles se recalent sur la doc constructeur.

### Chantier 4 — Les régulateurs de pression (`g7b` 118 mots, `g8b` 236 mots)

Codes 7.02, 8.02, 8.07. Développer les deux fiches et **nommer les composants**.
- **Régulateur de pression d'évaporation** (couramment « KVP ») : monté en sortie d'évaporateur,
  il empêche la pression d'évaporation de descendre sous la valeur réglée. Utile quand plusieurs
  évaporateurs à températures différentes tournent sur un même compresseur.
- **Régulateur de pression de carter** (couramment « KVL ») : sur la ligne d'aspiration avant le
  compresseur, il limite la pression d'aspiration — notamment au redémarrage après un arrêt long,
  pour ne pas surcharger le moteur.
- **Régulateur de pression de condensation** (couramment « KVR ») : maintient une pression de
  condensation suffisante quand il fait froid dehors — code 7.02.

⚠️ **Ces trois descriptions doivent être validées par F. Henninot avant publication** : elles
sont écrites de mémoire technique, pas lues sur une documentation. Même règle que partout ailleurs
dans ce pack.

---

## 3. Les règles à tenir (identiques au reste du pack, rappelées ici)

- **Zéro invention chiffrée.** Les SEULES valeurs autorisées : surchauffe **5-10 K**,
  sous-refroidissement **4-8 K**, P absolue ≈ P relative + 1 bar, classes NF EN 378
  (**R-290 = A3**, CO₂ = A1, NH₃ = B2L, R-32 et R-1234yf = A2L), PRP du CO₂ = 1. Tout le reste :
  « selon la documentation constructeur / la norme, à faire valider ».
- **Croix du frigoriste** : détendeur GAUCHE · compresseur DROITE · condenseur HAUT · évaporateur
  BAS. Jamais de tour aéroréfrigérante.
- **Public FLE/DYS** : une idée par phrase, chaque mot technique expliqué à sa première
  apparition, vouvoiement. Ces fiches sont les plus abstraites du pack : c'est là que le risque de
  perdre le public est le plus élevé.
- **Chaque visuel ajouté doit RETIRER du texte**, jamais s'y ajouter.
- **Un schéma ne se met JAMAIS en `illus`** : passer par l'assistant `schema()`, qui l'insère dans
  le corps. Une seule image par fiche est projetée (la première).
- **Ne jamais déclarer un code que la fiche n'enseigne pas** — c'est le défaut que ce document
  corrige, ne pas le reproduire dans l'autre sens.

---

## 4. Arbitrages

**Tranché** — l'ordre des quatre chantiers suit les dépendances : sans chaleur latente, la
surchauffe ne peut pas être comprise ; sans le diagramme, on ne peut pas montrer où elle se lit.

**En attente de F. Henninot** — à poser avant de publier :
1. **Les désignations commerciales.** KVP, KVL, KVR sont des références **Danfoss**. Sur le
   terrain tout le monde dit « un KVP », mais un pack public ne doit pas être un catalogue de
   marque. *Proposition* : enseigner la fonction sous son nom générique, puis ajouter
   « couramment appelé KVP ». À confirmer.
2. ~~**Les valeurs de surchauffe** : les écrire ou renvoyer à la documentation constructeur ?~~
   **Tranché de fait le 27/07** : écrites dans `g1e` (5-10 K et 4-8 K, autorisées par la charte
   et déjà présentes dans `g1a`), assorties de « à recaler sur la documentation du constructeur ».
   Réouvrable au chantier 3 si le geste de mesure change la donne.
3. ~~**Où loger la chaleur sensible/latente** : nouvelle fiche, ou développement de `g1a` ?~~
   **Tranché par F. Henninot le 27/07** : **nouvelle fiche `g1e` ET dégraissage de `g1a`**. Le
   jour 1 passe à 6 h 35, pas à 6 h 50, parce que `g1a` rend les 15 minutes qu'elle ne remplissait
   pas.
4. **La distinction surchauffe utile / totale** telle que formulée au chantier 3.
5. **Nouveau, ouvert par le chantier 1** : `g1e` emploie **point de bulle** et **point de rosée**
   pour un fluide **pur**. C'est l'usage du métier et c'est ce que demande le § 2 ci-dessus, mais
   ce sont à l'origine les termes des mélanges. À confirmer, ou à reformuler en « liquide saturé /
   vapeur saturée » avec les deux appellations.

---

## 5. Un garde-fou à ajouter au build

Le contrôle de profondeur ne voit pas la maigreur (§ 1-d). Proposition : **refuser, ou au moins
signaler, qu'une fiche portant un code THÉORIQUE fasse moins de N mots**. Un code coché par une
fiche de 105 mots est une couverture de façade — exactement ce que la mesure de couverture était
censée empêcher. À intégrer dans `build/profondeur.mjs`, et à écrire dans
`PROFONDEUR-REFERENTIEL.md` au même titre que les motifs aveugles.

---

## 5 bis. Où en est la mesure, après le chantier 1 (mesuré le 27/07)

Les zéros du § 1-b, rejoués après coup — c'est ce que le chantier 1 a comblé, et rien de plus :

| Notion | Avant | Après | Chantier qui s'en charge |
|---|---:|---:|---|
| chaleur sensible | 0 | **12** | 1 ✅ |
| chaleur latente | 0 | **16** | 1 ✅ |
| vaporisation | 0 | **1** | 1 ✅ |
| point de bulle | 0 | **8** | 1 ✅ |
| point de rosée | 1 | **10** | 1 ✅ |
| surchauffe utile / totale | 0 · 0 | **0 · 0** | 3, à faire |
| titre de vapeur | 0 | **0** | 2, à faire |
| KVP · KVL | 0 · 0 | **0 · 0** | 4, à faire |

Volumes (corps seul, méthode du § 1-a) : `g1e` **544 mots** · `g1a` 250 → **191** (dégraissée,
et passée de 45 à 30 min) · `g1b` **105** (chantier 2) · `g7b` **118** (chantier 4) ·
`g8b` **236** (chantier 4).

---

## 6. Comment vérifier que le travail est fait

1. Rejouer les mesures du § 1 : les zéros doivent avoir disparu, les volumes avoir augmenté.
2. `node build/build.mjs` : couverture **100 % sur A1/A2/D/E**, profondeur **94/94**, zéro note
   formateur dans la sortie élève.
3. `node build/parcours.mjs` puis `node build/relecture.mjs`.
4. Vérifier dans le navigateur, pas seulement au build.
5. **Faire relire par un agent adversarial** avant de pousser — c'est ce qui a rattrapé, le
   26/07, une affirmation fausse sur le CO₂ qui aurait pu coûter cher.

---

*Rappel : la relecture métier de F. Henninot reste le bloquant du projet. Ces consignes ajoutent
du contenu à relire — elles ne remplacent pas cette relecture.*
