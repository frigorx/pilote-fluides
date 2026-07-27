# Plan de séquence — habilitation fluides, 4,5 jours + 0,5 jour d'évaluation

> **Écrit le 27/07/2026**, après un constat de F. Henninot : *« On est à la ramasse. Le système est
> magnifique, je ne dis pas que c'est nul — je dis que c'est trop. On a peut-être été trop dans la
> formation initiale. Il faut voir autrement : vraiment un projet d'autoformation, et à la fin un
> bourrage de crâne. C'est une requalif, les gens savent faire. »*
>
> Puis, le même jour, la **grille jour par jour** dictée par F. Henninot (§ 3) — annoncée par lui
> comme *« un jet en l'air »*, donc à retravailler, mais elle fixe déjà la structure.
>
> Ce document pose le **cadre horaire réel**, la **grille**, et ce qu'ils imposent au pack.
> Il ne jette rien : il **déplace**.
>
> À lire après `REPRISE.md`. Il commande `packs/fluides/parcours.js`, qui devra être refait.

---

## 1. Le constat, mesuré

Le parcours actuel pèse **27 h 40** de salle, hors plateau, hors révision, hors épreuve.
Confronté aux enveloppes annoncées dans le pack lui-même :

| | Salle actuelle | Enveloppe annoncée | Épreuve | Reste pour plateau + révision |
|---|---:|---:|---:|---:|
| **A1** | 27 h 40 | 35 h | 4 h 15 | 7 h 20 |
| **A2** | 27 h 40 | 28 h | 3 h 55 | **20 min** |
| **D** | 10 h 40 | 10 h | 1 h 30 | **− 40 min** |
| **E** | 9 h 30 | 10 h | 1 h 30 | 30 min |

Le cas **D** dit tout : c'est la catégorie la plus pratique du référentiel — récupérer, peser,
tracer — et le plan de cours la met en dépassement **avant qu'on ait touché une bouteille**.

**Trois causes, et aucune n'est un problème de vingt minutes.**

1. **Le parcours ordonne, il ne compte pas.** `parcours.js` n'a aucune notion d'enveloppe, et rien
   au build ne compare la somme à quoi que ce soit. Les durées ont été posées fiche par fiche.
   Les chantiers 1 et 2 du socle théorique ont ajouté 20 minutes sans que rien ne proteste.
   C'est le même angle mort que la maigreur : non mesuré, donc invisible.
2. **Un seul déroulé pour quatre catégories.** Le filtrage par catégorie existe pour les questions
   et pour les menus, **jamais pour le parcours**. Un candidat D suit 21 séquences sur 54, et
   aucune vue ne le dit.
3. **Trois blocs n'existent pas dans le modèle.** `parcours.js` ne connaît que `cours`, `exercice`
   et `bilan`. Le **plateau**, la **révision** et l'**épreuve** ne sont nulle part. Le module
   « Préparation pratique » (3 h 35) prépare le plateau, il n'est pas le plateau.

Autrement dit : ce n'est pas le plan qui déborde. C'est qu'il n'y a de plan que pour le cours.

---

## 2. Le cadre horaire

Règles posées par F. Henninot : **4,5 jours de formation + 0,5 jour d'évaluation** (« c'est la
norme de cette formation »), **journées de 8 heures**, **début à 8 h 30 tous les jours** (« ça
évite les retardataires »), **un quart d'heure de récréation toutes les deux heures**, **1 h 30 de
pause déjeuner**. Les temps de pause sont comptés dans les 8 heures.

Et une règle de rythme qui commande la structure :

> *« On ne peut pas mettre des élèves 8 h devant un écran à travailler. »*
> **Le matin la théorie, l'après-midi la pratique.**

### Une journée de 8 heures

| Créneau | Durée | |
|---|---:|---|
| 8 h 30 – 10 h 30 | 2 h 00 | travail |
| 10 h 30 – 10 h 45 | 15 min | *récréation* |
| 10 h 45 – 12 h 30 | 1 h 45 | travail |
| 12 h 30 – 14 h 00 | 1 h 30 | *déjeuner, hors des 8 h* |
| 14 h 00 – 16 h 00 | 2 h 00 | travail |
| 16 h 00 – 16 h 15 | 15 min | *récréation* |
| 16 h 15 – 18 h 00 | 1 h 45 | travail |
| **8 h comptées** | **7 h 30 effectives** | amplitude 8 h 30 → 18 h 00 |

**Demi-journée** : 4 h comptées, **3 h 45 effectives**.

⚠️ **Hypothèse à confirmer** : matin 4 h / après-midi 4 h, déjeuner de 12 h 30 à 14 h 00. Tu as dit
« après 12 h 00 » pour l'après-midi — si le déjeuner est 12 h 00 → 13 h 30, la journée finit à
17 h 30 et le découpage devient 3 h 30 le matin / 4 h 30 l'après-midi. Un mot suffit à recaler.

### ⚠️ Les 48 heures ne tombent pas

Ta grille compte **cinq demi-journées de formation + une journée et demie d'évaluation**, soit :

| | Matin | Après-midi | Total |
|---|---:|---:|---:|
| Jours 1 à 4 | 4 × 4 h | 4 × 4 h | **32 h** |
| Jour 5 (demi + 2 h) | 4 h | 2 h | **6 h** |
| | | **Total** | **38 h** |

**38 heures, pas 48.** Trois lectures possibles, et je ne veux pas trancher à ta place :
- la formation fait en réalité **6 jours** (6 × 8 = 48 h) ;
- les 48 h comptent aussi les **heures d'autoformation amont** attendues du stagiaire — ce qui
  serait cohérent avec le nouveau modèle, et devrait alors être **écrit dans la convocation** ;
- ou c'est un lapsus de dictée, et le compte réel est 38 h.

Tout le reste du document est calculé sur **38 h**.

---

## 3. La grille, jour par jour

Reprise de ta dictée, avec ses variantes. **Ce n'est pas encore un plan de séance** : c'est la
structure, à minuter ensuite séquence par séquence.

| | **Matin** — théorie | **Après-midi** — pratique |
|---|---|---|
| **J1** | Accueil · **test de niveau** · prérequis · **sécurité** | **Bourrage de crâne** |
| **J2** | **Théorie** — on remet les bases, tout ce qu'il faut savoir | Sécurité atelier · **début de manipulation** · révision du **CERFA** · technologie des composants frigorifiques |
| **J3** | **Théorie** | **Sécurité sur les fluides** *(inversable avec le J2)* — variante : 2 h théorie / 2 h pratique, « pour faire une récréation technique » |
| **J4** | Révision · **examen blanc** | **Mise en condition d'examen** |
| **J5** *(½)* | **Examen pratique** | **Épreuve théorique** (2 h) |

**Décision de sécurité et de pédagogie, à ne pas perdre** :

> *« Les stagiaires travaillent sur des machines avec de l'**azote** pour ne pas se tromper. »*

C'est la même règle que partout ailleurs dans le pack — azote seul pour toute mise en pression,
jamais d'oxygène ni d'air comprimé — mais elle prend ici un sens de plus : **on apprend le geste
sans risquer le fluide**. À écrire dans les consignes d'atelier.

### Ce que la grille donne, en heures

| Bloc | Créneaux | Total |
|---|---|---:|
| Accueil, positionnement, prérequis | J1 matin (part) | ≈ 1 h |
| **Sécurité** (personne + fluides) | J1 matin (reste) + J3 après-midi | ≈ 7 h |
| **THÉORIE EN SALLE** | **J2 matin + J3 matin** | **8 h** *(10 h avec la variante J3)* |
| **Atelier / manipulation** | J2 après-midi (+ J3 si variante) | 4 à 6 h |
| **Bachotage** | J1 après-midi + J4 matin + J4 après-midi | **12 h** |
| **Évaluation** | J5 | 6 h |

---

## 4. Le chiffre qui commande tout

| | |
|---|---:|
| Théorie en salle dans ta grille | **8 h** (10 h avec la variante) |
| Théorie en salle aujourd'hui | **27 h 40** |
| **À faire basculer en autoformation amont** | **≈ 20 h, soit 70 %** |

C'est plus radical que l'estimation de ce matin (11 h de salle, 17 h à basculer). Ta grille tranche
plus net, et elle est cohérente avec ce que tu as dit : le cours n'est plus en salle, il est
**avant**. La salle sert à trois choses seulement — remettre les bases vite, faire les mains, et
bourrer le crâne.

**Ce n'est pas une coupe. C'est un déplacement.** Le contenu reste intégralement dans le pack.

---

## 5. Le virage : ce sont des frigoristes

C'est le point de départ, et il change tout. Le public d'une requalification **n'est pas un public
de formation initiale**. Ce sont des professionnels qui savent faire. Ce qu'ils viennent chercher,
ce n'est pas le métier : c'est **ce qui a changé**, et le papier.

Le pack actuel enseigne comme on enseigne à des débutants : tout, dans l'ordre, en salle. C'est
précisément ce que F. Henninot appelle « trop dans la formation initiale ». Le contenu est bon —
le **format** ne l'est pas pour ce public.

> ⚠️ **La condition de réussite, à dire au stagiaire sans détour** :
> *« si vous ne travaillez pas le logiciel avant, vous irez à l'échec. »* Le taux de réussite
> dépend du travail amont. Cela doit figurer dans la **convocation**, pas seulement dans nos
> intentions. Avec 8 h de théorie en salle pour un référentiel de 136 codes, ce n'est plus une
> recommandation : c'est le contrat.

### Le critère de tri — ce qui reste en salle

Une chose reste en salle si **elle ne peut pas s'apprendre seul**, ou si **se tromper coûte trop
cher**. Cinq familles, et cinq seulement :

1. **Ce qui a CHANGÉ.** C'est la raison d'être de la requalification. Règlement (UE) 2024/573,
   arrêté du 21 novembre 2025, ce qui n'existait pas dans leur attestation précédente. Un
   frigoriste habilité en 2015 ne connaît pas F-Gas III. **C'est le cœur du J2 matin.**
2. **Ce qui tue.** Sécurité de la personne, classification, A2L et A3, CO₂. La sécurité se
   démontre et s'impose, elle ne se découvre jamais seul ni par l'erreur (charte FrigorX).
   **J1 matin et J3 après-midi.**
3. **Ce qui se fait avec les mains.** L'atelier. Rien de ce qui s'y passe ne s'apprend sur écran.
4. **Les fausses certitudes du métier.** C'est là qu'un formateur est irremplaçable devant un
   groupe de professionnels : « on a toujours fait comme ça ». Le pack en a déjà relevé plusieurs,
   et ce sont exactement les points sur lesquels un pro se trompe avec assurance —
   **R-290 = A3 et jamais A2L** · le **CO₂ prévient** (essoufflement, mal de tête) contrairement à
   l'azote · « plus lourd que l'air » **ne vaut pas pour l'ammoniac** · **attestation d'aptitude**
   (la personne) ≠ **attestation de capacité** (l'entreprise).
5. **Ce que l'épreuve piège.** Le bachotage, J1 après-midi et J4.

### Ce qui bascule en autoformation

Tout le reste, et notamment **le socle théorique** : chaleur sensible et latente, diagramme
log p-h, surchauffe et sous-refroidissement, régulateurs de pression. Plus la nomenclature,
l'histoire de l'ozone et du climat, la description des organes.

> **Les chantiers 1 à 4 du socle ne sont PAS perdus — ils sont exactement ce que ce modèle exige.**
> Un projet d'autoformation a besoin d'un **livre dense**, pas d'un aide-mémoire. Les fiches `g1e`
> (1 008 mots) et `g1b` (1 233 mots) sont trop lourdes pour 30 minutes de salle : elles sont au bon
> format **pour être lues chez soi**. Elles ne perdent pas leur place, elles changent de place.
>
> **Conséquence pour les chantiers 3 et 4** : les mener comme prévu, avec la même densité — mais
> les budgéter en **amont**. Le chantier 3 (surchauffe / sous-refroidissement) garde un pied en
> salle : mesurer une surchauffe est un geste d'atelier, pas une lecture.

---

## 6. Ce que la grille demande au pack — et ce qui manque

**Ce qui existe déjà et sert le nouveau modèle** — l'essentiel est là :

| Brique | État | Rôle dans la grille |
|---|---|---|
| 43 fiches de cours, toutes illustrées | ✅ | **le livre** de l'amont |
| 258 questions, **toutes avec indice**, 228 avec remédiation structurée | ✅ | l'amont et le bachotage |
| 13 séries « Réviser par thème » | ✅ | l'amont, thème par thème |
| 8 examens sur 3 paliers | ✅ | test de niveau (J1) · examen blanc (J4) |
| Carte « Ma progression » | ✅ | le stagiaire ET le formateur voient où en est le groupe |
| 5 fiches sécurité + 4 classification (3 h 55) | ✅ | J1 matin et J3 après-midi — **ça tombe juste** |
| 7 fiches « Préparation pratique » (3 h 35) | ✅ | J2 après-midi, avant la manipulation |
| Filtrage par catégorie A1/A2/D/E | ✅ | déjà fait pour les questions et les menus |

**Ce qui manque, et que la grille rend visible :**

1. ⚠️ **LE CERFA N'EXISTE PAS DANS LE PACK.** Ton J2 après-midi prévoit « révision du CERFA », et
   le pack ne contient que **4 mentions** du mot — aucune fiche, aucun exercice, aucune question.
   C'est le domaine de l'autre projet (`inerweb-fluide`, le logiciel CERFA/BSD). **À créer, ou à
   emprunter au projet voisin.** C'est le trou le plus net que ta grille met au jour.
2. **12 h de bachotage pour 258 questions.** À deux minutes par question corrigée et commentée,
   la banque entière tient en ≈ 8 h 30. Il en manque, ou il faut d'autres formats : mises en
   situation, oral, épreuves blanches chronométrées, correction collective de copies.
3. **Un parcours AMONT balisé.** Aujourd'hui l'élève reçoit 43 fiches en vrac. Il lui faut une
   progression jalonnée : *« avant le jour 1, faites ceci ; vous devez savoir répondre à cela »*.
4. **Le typage des blocs dans `parcours.js`** : `amont` · `positionnement` · `theorie` · `atelier` ·
   `bachotage` · `epreuve`. Aujourd'hui il n'y a que `cours`, `exercice`, `bilan`.
5. **L'enveloppe, déclarée et CONTRÔLÉE au build**, avec les récréations et le déjeuner dans le
   calcul. Le build doit refuser, ou au moins écrire, un dépassement. Même principe que
   `COUVERTURE-REFERENTIEL.md` : ce qui n'est pas mesuré dérive en silence.
6. **Un parcours par catégorie.** D et E ne suivent pas le même plan qu'A1.
7. **Le marquage des points clés.** Pour chaque fiche : ce qui doit absolument être dit en salle,
   distinct du contenu complet. Un champ à ajouter, à côté de `notes_pilote`.
8. **Un ton pour professionnels.** Le contenu explique chaque mot technique à sa première
   apparition — juste pour un public FLE/DYS en initiale, condescendant devant des frigoristes.
   Il faut une **couche de dialogue entre pros** : ce qui a changé, pourquoi, et ce que ça change
   sur le chantier de lundi. C'est la « autre partie, plus dense » demandée.

> ⚠️ **Ne pas casser le public FLE/DYS existant.** Les deux publics coexistent : le lycée
> professionnel (initiale, FLE/DYS) et la requalification (professionnels). Le ton pro s'**ajoute**,
> il ne remplace pas.

---

## 7. Arbitrages

**Tranché** (F. Henninot, 27/07) : 4,5 jours de formation + 0,5 jour d'évaluation · journées de
8 h · début 8 h 30 tous les jours · quart d'heure toutes les deux heures · 1 h 30 de déjeuner ·
**matin théorie, après-midi pratique** · accueil avec test de niveau · **manipulation à l'azote** ·
modèle autoformation amont + points clés en salle + bachotage · on ne jette rien de l'existant.

**En attente :**

1. **Les 48 heures.** 38 h au décompte de la grille (§ 2). Six jours ? Ou l'amont compté dedans ?
2. **Le découpage de la journée.** 4 h / 4 h avec déjeuner 12 h 30 – 14 h 00 (fin 18 h 00), ou
   3 h 30 / 4 h 30 avec déjeuner 12 h 00 – 13 h 30 (fin 17 h 30) ?
3. **La variante du J3** : sécurité fluides sur tout l'après-midi, ou 2 h théorie / 2 h pratique ?
   Elle fait passer la théorie salle de 8 h à 10 h.
4. **J2 et J3 s'inversent-ils ?** Tu l'as proposé. Cela déplace la sécurité fluides avant la
   première manipulation, ce qui est plus sûr — mais éloigne le CERFA du bachotage.
5. **Le CERFA** : on le crée dans ce pack, ou on branche le projet `inerweb-fluide` ?
6. **Le test de niveau** : sur le logiciel (les 8 examens existent, `ex-ech` ferait un
   positionnement crédible et alimenterait « Ma progression ») ou sur papier ?

---

## 8. Ce qui ne change pas

- Le contenu reste **intégralement** dans le pack. Rien n'est supprimé.
- Les chantiers 3 et 4 du socle théorique se font comme prévu, à la même densité — budgétés en
  amont. **Ne pas les alléger pour gagner de la salle** : ce serait refaire l'erreur que ce
  document corrige. C'est le PLAN qui s'ajuste, pas le contenu.
- La **relecture métier** par un frigoriste reste le bloquant du projet, et ce virage ne la
  remplace pas. Il la rend plus nécessaire : un contenu lu seul, sans formateur pour rattraper,
  doit être juste du premier coup.

---

*F. Henninot · inerWeb Édu — arrêté du 21 novembre 2025, règlement (UE) 2024/573.*
