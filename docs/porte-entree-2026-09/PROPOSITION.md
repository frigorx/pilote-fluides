# Porte d'entrée d'inerweb.fr — analyse et proposition

> Écrit le **05/09/2026** par Claude (Fable 5.1) à la demande de F. Henninot, qui conçoit,
> tranche et vérifie. Rien de ce qui suit n'est publié : la maquette à côté
> (`maquette-accueil.html`) ouvre le site actuel, elle ne le remplace pas.
>
> Le point de départ, dit par F. Henninot : la page d'accueil n'est pas compréhensible ;
> les deux nouveautés (AquiBlue, HoCourant) ne devraient pas ouvrir la page ; il faudrait
> attaquer par l'organigramme du réseau thermo-techno ; le thermo-techno gagnerait peut-être à
> être éclaté (CO₂, régulation, circuit d'huile) ; le positionnement arrive trop tard, il devrait
> être une porte d'entrée au niveau de Départ.

Sources de ce dossier : le site en ligne tel qu'il se lit (texte rendu, mesures), `index.html`
(la page d'accueil et ses données de plan, lignes 1080-1451), les quatre pages d'entrée des
autres réseaux, la page `f/positionnement`. Deux inventaires mécaniques ont été confiés à des
agents Sonnet ; la lecture, le jugement et la proposition sont d'un seul tenant ici.

---

## 1. Ce que voit le visiteur aujourd'hui

Ordre réel de lecture, relevé sur https://inerweb.fr le 05/09/2026 :

| # | Bloc | Ce qu'il dit au visiteur |
|---|---|---|
| 1 | En-tête : logo inerWeb Édu, Accueil · Catalogue · Le métier · Formateurs ; volet « Infos » | Une marque, quatre entrées |
| 2 | Bandeau **AquiBlue** (logo, texte de 5 lignes, 3 boutons) | « Nouveau — inerWeb AquiBlue » |
| 3 | Bandeau **HoCourant** (logo, étiquette PROTOTYPE, texte de 4 lignes, 1 bouton) | « se préparer à l'habilitation électrique » |
| 4 | Accroche : « Regardez le métier de frigoriste, station par station » + Voir le plan · Tout le catalogue | Le vrai titre, enfin |
| 5 | Le mot de l'auteur (replié) | qui parle |
| 6 | Nouveautés & corrections (replié) | le journal |
| 7 | **Le plan de formation** : « Les cinq réseaux inerWeb » (grille), Chercher un cours, légende, la carte | l'organigramme est ici, au 7ᵉ bloc |
| 8 | Le réseau, en liste (15 lignes en accordéon) | la même chose en texte |
| 9 | Entrer par le circuit (schéma, 4 organes cliquables) | une autre porte |
| 10 | Tuiles : La formation habilitation · Tout le catalogue · Le métier · Formateurs | quatre portes de plus |

Trois mesures qui fondent le constat :

- **Le premier écran est entièrement occupé par les deux bandeaux.** Sur une fenêtre de
  800 px de large, le titre du site apparaît sous la ligne de flottaison. Le mot « inerWeb »
  n'est visible que dans le logo ; aucune phrase ne dit ce qu'est le site.
- **L'organigramme existe déjà** — la grille « Les cinq réseaux inerWeb » — mais il vit
  *dans* le bloc du plan, après deux barres repliées. Il est vu par celui qui descend.
- **Le plan thermo-techno mesure 1 310 × 2 900 unités**, rendu sur 1 018 px de large : plus
  de deux écrans de haut sur un ordinateur, une carte à faire glisser sur téléphone. À côté,
  HydroMétro (22 stations) tient sur un écran.

Deux détails relevés au passage, à vérifier plutôt qu'à corriger tout de suite :

- la grille annonce « 108 stations », le compteur de trajet sous la légende affiche
  « 0 / 86 stations ». Les deux sont justes : la grille compte les arrêts du plan, le
  compteur les cours uniques qu'on peut visiter (une correspondance ne vaut qu'une fois,
  et `TOUTES` ne reprend pas toutes les lignes). Mais le visiteur, lui, voit deux nombres
  sur le même écran ;
- le titre « Regardez le métier de frigoriste, station par station » décrit le thermo-techno,
  pas le site : le site, c'est cinq réseaux, trois logiciels et une formation.

## 2. Le diagnostic

1. **Le haut de page porte du temporaire.** Un bandeau de nouveauté est par nature
   provisoire ; le haut d'une page d'accueil est la place de ce qui est permanent : ce
   qu'est le site. Le 24/08, F. Henninot avait voulu AquiBlue « en première ligne » pour sa
   visibilité — le commentaire est dans `index.html`. La présente proposition revient sur ce
   choix à sa demande du 05/09, et garde la visibilité d'AquiBlue par trois portes au lieu
   d'une (§ 3).
2. **L'organigramme arrive au 7ᵉ bloc.** C'est lui qui répond à « qu'est-ce que je trouve
   ici ? ». Il doit être au premier écran.
3. **Les portes d'entrée sont dispersées.** « Départ » est la première station de la carte
   (donc au 7ᵉ bloc, après avoir fait défiler) ; le positionnement est la première station de
   la *dernière* ceinture ; « Chercher un cours » n'apparaît qu'une fois l'index construit.
   Un visiteur qui ne sait pas où aller n'a pas de geste évident.

Le site sait déjà faire mieux, sur ses propres réseaux : ÉlectroRézo ouvre par trois
« portes » avant ses lignes ; HydroMétro place « Trouver mon trajet · 20 questions » à côté
de sa carte. La proposition reprend ces deux gestes.

## 3. La proposition : l'ordre des écrans

| Écran | Aujourd'hui | Proposé |
|---|---|---|
| 1 | AquiBlue · HoCourant · accroche | **Accroche d'identité · organigramme · « Par où commencer ? »** (3 portes) · mot de l'auteur et journal, repliés |
| 2 | mot de l'auteur · journal · plan | **Le plan thermo-techno**, inchangé |
| 3 | liste · circuit | **Les outils inerWeb** : AquiBlue · HoCourant · inerWeb Fluide (3 cartes) |
| 4 | tuiles | liste · circuit · tuiles, inchangés |

### Écran 1, dans le détail

- **Pastille** : APPRENDRE LE FROID, LA CLIMATISATION ET L'ÉNERGIE.
- **Titre** : « Le métier de frigoriste, *station par station*. » (le titre actuel, sans
  l'impératif « Regardez »).
- **Chapô** — la phrase qui manque aujourd'hui : « Des cours interactifs rangés comme des
  lignes de métro — un réseau par domaine —, des logiciels libres pour l'atelier et une
  formation à l'habilitation fluides. Gratuit, sans compte. Un projet personnel d'enseignant
  frigoriste. »
- **L'organigramme**, un arbre à trois branches sous la racine « inerWeb.fr » :
  - 🚇 **Les réseaux de cours** — Thermo-techno (le cœur du métier), HydroMétro, AéroRézo,
    ÉlectroRézo, Législation ; chaque carte porte son état (nouveau, prototype, en
    construction) comme aujourd'hui ;
  - 🧰 **Les outils** — AquiBlue, HoCourant, inerWeb Fluide (ce dernier n'est aujourd'hui
    visible que dans le volet « Infos ») ;
  - 📋 **La formation habilitation** — l'application, le test d'entrée, l'espace formateurs.
  L'arbre est en HTML : les traits relient des cartes, aucun texte ne passe sur un trait
  (règle de la charte), et il se replie en une colonne sur téléphone.
- **« Par où commencer ? »** — trois portes, la deuxième en orange :
  1. 🚉 **Je découvre** — Départ, aucun prérequis : le métier, puis « Du glaçon au circuit » ;
  2. 🎯 **Je me situe** — le test d'entrée, « où j'en suis, avant tout » (§ 5) ;
  3. 🔎 **Je cherche un cours** — le champ de recherche, ou le catalogue.
- Le mot de l'auteur et le journal restent juste dessous, repliés : ils coûtent une barre
  chacun et répondent à « qui parle » et « qu'est-ce qui a changé ».

### Les outils, écran 3

Les deux bandeaux deviennent trois cartes de même gabarit (logo, étiquette d'état, titre,
texte court, action), avec inerWeb Fluide et son appel aux bêta-testeurs. La barre de
navigation gagne une entrée **Outils** (ancre vers ce bloc). AquiBlue reste visible par trois
portes : sa carte dans l'organigramme (premier écran, étiquette « nouveau »), ce bloc, le
journal. C'est la règle « plusieurs portes vers la même chose », appliquée à un logiciel.

### Ce qui ne change pas

Le plan, la liste, le circuit, les tuiles, le journal, le mot de l'auteur : mêmes contenus,
même code. Le chantier de l'écran 1 ne touche que l'ordre des blocs de `index.html` et
ajoute l'organigramme et les portes ; les données du plan ne bougent pas.

## 4. Éclater le thermo-techno ? Les chiffres, puis l'avis

Les 15 lignes, d'après le bloc de données de `index.html` (108 stations, 5 correspondances,
6 stations à code formateur) :

| Ligne | Stations | Resterait au cœur | Irait dans… |
|---|---|---|---|
| 🚉 Le tronc | 10 | ✔ | |
| 🔧 Les organes | 6 | ✔ | |
| 🎛 Ce qui se règle | 10 | | 🔌 Régulation |
| 💧 La ligne liquide | 4 | ✔ | |
| 🧰 Les gestes | 8 | ✔ | |
| 🌍 Fluides & environnement | 8 | ✔ | |
| 🛢 L'huile | 4 | | 🛢 Huile |
| 🛢 Le circuit d'huile | 13 | | 🛢 Huile |
| 🧊 Le CO₂ (R744) | 8 | | 🧊 CO₂ |
| 🏭 Les centrales CO₂ | 5 | | 🧊 CO₂ |
| 🔌 La régulation | 12 | | 🔌 Régulation |
| ⚡ Électrotech | 2 | ✔ | |
| ✅ S'évaluer | 9 | ✔ | |
| 🧰 La boîte à outils | 7 | ✔ | |
| 🔄 Correspondances | 2 | ✔ | |

Ce que donnerait l'éclatement :

| Réseau | Stations | Lignes | Déjà en place |
|---|---|---|---|
| ❄️ Thermo-techno (le cœur) | 56 | 9 | la carte actuelle, allégée |
| 🔌 Régulation | 20 (22 arrêts, 2 stations communes) | 2 | le hall « La régulation » avec ses six films |
| 🛢 Huile | 17 | 2 | les modules huile, du fluide au diagnostic |
| 🧊 CO₂ | 13 | 2 | l'application `co2-r744` et les centrales |

À comparer aux autres réseaux : HydroMétro 22, AéroRézo 36, Législation 57, ÉlectroRézo 58.
Les trois réseaux proposés sont de la taille des réseaux existants ; le cœur passe de la
taille de « deux ÉlectroRézo » à celle d'un seul.

### L'avis : oui, à deux conditions

**Oui**, pour trois raisons :

1. **La lisibilité.** La carte actuelle fait plus de deux écrans de haut. Quatre cartes de
   13 à 56 stations tiennent chacune sur un écran, comme les autres réseaux.
2. **Chaque morceau se suffit.** La régulation a déjà son hall d'entrée et ses films ; le
   CO₂ est une application à part ; l'huile va des familles au diagnostic sans rien emprunter.
   Les liens qui restent (détendeur, pressostat BP, régulateur électronique) sont déjà des
   correspondances : elles deviennent des correspondances entre réseaux, mécanisme qui existe.
3. **L'organigramme y gagne un nœud par sujet.** Celui qui cherche « CO₂ » ou « huile »
   trouve un réseau, pas une ligne au milieu de quinze.

**Les deux conditions** — sans elles, l'éclatement fragmente au lieu de clarifier :

1. **Une seule source de données.** Aujourd'hui les stations vivent dans `index.html`
   (lignes 1080-1451) et `build/plan-liste.mjs` en régénère la liste et le JSON-LD. Législation
   a déjà sa propre copie du moteur de carte. Trois réseaux de plus par copie, ce serait quatre
   copies à tenir. Il faut d'abord sortir les données dans un module commun (`moteur/plan-donnees.js`,
   une ligne = un champ `reseau`), et un seul moteur de carte que chaque page filtre.
2. **Une navigation commune entre réseaux.** Relevé du jour : HydroMétro et Législation
   renvoient vers deux réseaux, AéroRézo vers deux autres, ÉlectroRézo vers les quatre mais en
   pied de page, et les correspondances de Législation ne pointent vers aucun réseau de métro.
   L'organigramme de l'accueil, réduit à une ligne de cartouches, doit devenir l'en-tête de
   chaque réseau. À huit réseaux sans cela, le visiteur se perd.

**Un choix reste ouvert** : la ligne 🎛 Ce qui se règle. La maquette la met avec la
Régulation (deux de ses stations y sont déjà communes ; sans elle, Régulation ferait 12
stations, le plus petit réseau). La garder au cœur conserve le fil CAP organes → réglages →
gestes. C'est une ligne à déplacer dans les données, dans un sens ou dans l'autre.

**Le niveau de l'organigramme.** Les trois nouveaux réseaux sont des sous-domaines du froid,
pas des domaines comme l'hydraulique ou l'électricité. La maquette les place juste sous
Thermo-techno, dans la même colonne, étiquetés « proposé » : la hiérarchie reste lisible —
le froid et ses trois satellites, puis les quatre autres domaines. Le bouton de la maquette
bascule entre 5 et 8 réseaux pour juger sur pièces.

**Dans quel ordre, et à quel prix** :

1. l'écran 1 de l'accueil (organigramme + portes) — ne dépend pas de l'éclatement ; une session ;
2. sortir les données et le moteur de carte dans `moteur/` — une session, Sonnet sur le volume ;
3. les trois pages de réseau, générées depuis la même source — une session ;
4. plus tard, si l'usage suit : profondeurs et positionnement par réseau.

## 5. Le positionnement en porte d'entrée

Les faits :

- Deux choses portent le nom « Positionnement ». La station `ex-pos` de la ceinture
  ✅ S'ÉVALUER ouvre la carte du même nom dans l'application d'habilitation
  (`formation.html?carte=ex-pos`). La page `f/positionnement` — « Par où commencer ? — le test
  d'entrée » — est un test autonome, adresse courte imprimée dans le livre HabFluide : il
  tire ses questions par chapitre et conclut par « Où reprendre » et « Votre parcours », vers
  les chapitres du livre et les séries de révision.
- Ses questions ne sont pas que réglementaires : 225 questions réparties sur les 19
  chapitres du livre — ce qui peut blesser, les classes de sécurité, ozone et PRP, les
  catégories, la thermodynamique utile, le log p-h, surchauffe et sous-refroidissement, les
  familles de fluides, puis les quatre organes. Il couvre donc sécurité, fluides et
  technologie du cycle.
- Seul HydroMétro a un positionnement d'entrée pensé pour sa carte (« Trouver mon trajet ·
  20 questions · sans note bloquante », à côté de la carte). Le thermo-techno n'a aucun test
  qui renvoie vers ses stations.

L'avis : **oui, au niveau de Départ**, et par deux portes :

1. sur l'accueil, la porte 🎯 **Je me situe**, en orange, deuxième des trois ;
2. sur la carte, une **deuxième tête de ligne « 🎯 Positionnement » à côté de « 🚉 DÉPART »**,
   tout en gardant la station dans S'ÉVALUER (plusieurs portes vers la même chose).

Aujourd'hui, la porte pointe vers `f/positionnement`, le seul test existant, et son libellé
dit « test d'entrée » — pas « positionnement du réseau ». L'étape d'après, quand le chantier
des réseaux sera fait : faire pointer « Où reprendre » vers les lignes du plan, ou écrire pour
le thermo-techno un « Trouver mon trajet » sur le modèle d'HydroMétro.

## 6. La maquette : ce qu'elle montre, ce qu'elle ne montre pas

`docs/porte-entree-2026-09/maquette-accueil.html` — un seul fichier, sans dépendance, qui
s'ouvre au double-clic. Les jetons de couleur et de police sont ceux d'`index.html`.

- **Montre** : les quatre écrans dans l'ordre proposé, l'organigramme avec la bascule
  « 5 réseaux / 8 réseaux », les trois portes, le bloc des outils. Les liens ouvrent les vraies
  pages du site.
- **Ne montre pas** : la carte elle-même (un cadre « inchangé » tient sa place), le champ
  de recherche, les textes définitifs (à valider), la mise en page sur téléphone au-delà
  d'une première passe.
- **Vérifié** : rendu dans le navigateur en largeur d'ordinateur, sans défilement horizontal,
  traits de l'organigramme alignés sur les colonnes, aucun texte sur un trait.
- **Claude Design** n'était pas joignable dans cette session (autorisation refusée : lancer
  `/design-login` une fois depuis un terminal `claude` interactif). La maquette est faite côté
  Code, l'option la moins chère. Si un habillage Design est voulu, il se demande en une seule
  fois, après validation des textes et de l'ordre, avec la charte.

## 7. Décision et exécution (05/09/2026, le jour même)

F. Henninot a tranché l'après-midi : « faire toute cette mise à jour, sans tout casser, et
mettre en ligne ». Les choix qu'il a délégués ont été pris ainsi :

1. **L'ordre des écrans** (§ 3) : fait. Le titre reste « Regardez le métier de frigoriste,
   station par station » ; seul le chapô change, pour dire ce qu'est le site.
2. **Cinq ou huit réseaux** : **cinq aujourd'hui**. L'organigramme montre les cinq réseaux qui
   existent et, sous le thermo-techno, ses lignes groupées. L'éclatement reste le chantier
   suivant, aux deux conditions du § 4 — il ne se fait pas « sans rien casser » dans la même passe.
3. **La porte « Je me situe »** pointe vers la station Positionnement du plan
   (`formation.html?carte=ex-pos` : 22 questions qui ne comptent pas), et non vers le test du
   livre — une seule cible pour un même nom. La deuxième tête de ligne sur la carte attend le
   chantier des réseaux.
4. **L'entrée « Outils »** dans la barre : faite (index, metier, formateurs).

Exécution : brief `BRIEF-EXECUTION.md`, éditions par un agent Sonnet, relecture du diff,
contrôles et publication par Fable. Commit `b06dbb7c` sur `main`, servi en ligne le 05/09 à 17:07
(vérifié par `curl` contre-cache sur https://inerweb.fr/ : organigramme, portes et bloc des outils présents).
