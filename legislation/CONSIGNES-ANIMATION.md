# Consignes — animer une branche du réseau Législation

> Écrites le 24/08/2026 sur décision de F. Henninot : *« On va utiliser Claude Design
> pour les illustrations en animation, pour rendre vivant le parcours de formation,
> et toujours le professeur en vocal qui explique. On fait branche par branche. »*
>
> Ce document est le mode d'emploi d'**une branche**. Il se déroule en entier sur une
> sous-ligne, et seulement ensuite sur la suivante.

## Pourquoi animer, et ce que ça ne doit pas casser

Le réseau compte 29 stations et 239 illustrations **fixes**. Elles sont justes, mais
elles ne montrent pas le mouvement : une enveloppe qui rétrécit, une chaîne de
traçabilité qui avance, une pression qui monte jusqu'à la soupape. L'animation sert
**le mécanisme**, jamais la décoration.

Trois règles qui priment sur l'animation :

1. **Rien n'est dit qui ne soit aussi écrit.** L'élève doit pouvoir tout comprendre
   sans le son et sans le mouvement.
2. **L'animation ne conditionne jamais du contenu.** Une station reste lisible,
   navigable et imprimable si le mouvement ne part pas. `prefers-reduced-motion` est
   respecté — **sauf** si l'animation porte elle-même de l'information : dans ce cas
   elle ne s'y conditionne pas, elle se déclenche au clic.
3. **Le professeur vocal reste le fil.** Il enchaîne les écrans seul et s'arrête sur
   les questions. Les identifiants `#listen`, `#next`, `#prev`, `#start`,
   `#stop-voice` et la classe `.slide.active` sont son contrat : **ne jamais les
   renommer**.

## L'atout dont on dispose déjà

Chaque écran des 29 stations porte un attribut **`data-narration`** qui décrit
**ce que l'on voit** — pas le texte de la page. Exemple réel :

> « Sur le graphique, les barres descendent d'année en année. C'est le phase-down…
> Regardez les bouteilles au-dessus des barres : elles passent de trois à deux, puis
> à une seule. »

**Ce texte est le scénario de l'animation.** Il a été écrit avant elle, il la décrit
déjà. Une animation réussie est celle qui fait exactement ce que la narration
annonce, au moment où elle l'annonce. C'est aussi le meilleur contrôle : si
l'animation et la narration divergent, c'est l'animation qui a tort.

## Le déroulé d'une branche

### 1. Choisir la branche et la relire

Une sous-ligne entière (5 ou 6 stations). Avant d'animer, ouvrir chaque station et
lister, écran par écran, **les illustrations qui gagnent à bouger** — toutes ne le
méritent pas. Un tableau comparatif reste meilleur fixe.

Ce qui gagne à bouger : un flux qui circule, une quantité qui varie, une chaîne
d'étapes, deux voies qui divergent, une valeur qui franchit un seuil.
Ce qui ne gagne rien : une définition, une comparaison côte à côte, une carte
d'identité, un bilan.

### 2. Annoncer le coût à F. Henninot

Avant tout envoi à Claude Design : combien d'illustrations, combien d'itérations
prévues. Design puise dans le même quota que le chat et Claude Code. Regrouper
toutes les corrections en **une seule demande** plutôt que cinq allers-retours.

⚠️ La connexion à Design n'est pas accordée : F. Henninot doit taper
`/design consent` dans la session.

### 3. Envoyer à Claude Design — une demande cadrée

Joindre systématiquement :

- la **charte** : projet « Charte graphique inerWeb »
  (`1394c5be-3bc5-441f-93d9-251c89f48ba8`), déjà synchronisée le 13/08 — ne rien
  resynchroniser ;
- la **couleur d'accent de la sous-ligne** (elle est dans le tableau `RESEAU` du
  plan, et dans `--sous-ligne` du `styles.css` de la station) ;
- le **texte `data-narration` de l'écran** : c'est le scénario, il dit ce que
  l'animation doit montrer et dans quel ordre ;
- l'**illustration fixe actuelle** : on l'anime, on ne la réinvente pas — l'élève
  qui a déjà vu la version imprimée doit reconnaître la même image.

Contraintes à répéter dans la demande :

- sortie **SVG ou HTML**, jamais de bitmap — le résultat doit rester réintégrable
  et modifiable ;
- **aucun texte posé sur un tracé**, une flèche ou un aplat sombre ;
- police lisible à l'**impression A4 noir et blanc** (≥ 15 px dans le SVG) ;
- la couleur ne porte jamais seule une information : la doubler d'un mot, d'une
  forme, ou d'un trait plein contre tireté ;
- **aucun nom propre, aucun établissement** — non-nominatif strict ;
- animation **sobre et bouclée** ou déclenchée, jamais clignotante ;
- prévoir les **curseurs de réglage** de lisibilité quand la pièce s'y prête, pour
  que F. Henninot ajuste sans nouvelle itération payante.

### 4. Réintégrer côté Code

- Remettre le SVG animé **à la place de l'ancien**, même nom de fichier : le HTML,
  le texte alternatif et la narration ne bougent pas.
- Vérifier que le **texte alternatif décrit toujours** ce que montre l'animation.
- Contrôler qu'aucun SVG orphelin ne traîne : *tout fichier du dossier `svg/` est-il
  référencé par `index.html` ?*

### 5. Vérifier — dans un navigateur, pas sur le disque

C'est le contrôle qui a le plus servi pendant la vague 1 : ouvrir **chaque
illustration** et la station entière.

- l'animation part, elle boucle ou s'arrête proprement, elle ne saute pas ;
- aucun texte ne déborde ni ne chevauche un tracé **pendant** le mouvement — c'est
  le piège propre à l'animation : un élément qui se déplace peut passer sous un
  texte qui était libre à l'arrêt ;
- la station reste lisible avec le mouvement désactivé ;
- le professeur vocal enchaîne toujours les écrans et s'arrête sur les questions ;
- rendu correct à **375 px de large** ;
- l'impression sort toujours la station entière.

### 6. Donner la voix fabriquée à la branche

Une fois les animations en place, fabriquer les narrations en **Piper (local)** :
`build/voix/collecter-narrations.mjs`, puis `generer-audios-piper.py`, puis réduire
l'index à la station. Sans cela, la station parle avec la voix du navigateur —
audible, mais nettement en dessous.

⚠️ Piper est **entièrement local** : aucun texte ne part chez un tiers. Si une autre
chaîne est envisagée (edge-tts envoie le texte à Microsoft), c'est un **feu vert
séparé** à demander à F. Henninot avant de lancer.

### 7. Publier et vérifier en ligne

Committer, pousser, attendre la fin du déploiement, puis vérifier **le site servi** —
jamais le seul dépôt. Rappel : `git push` réussi ne veut pas dire page publiée.

## L'ordre des branches — proposition

Rien n'oblige à cet ordre, mais il a une logique : commencer par ce qui bouge le
plus naturellement, et par ce qui est déjà écrit.

1. **Impact environnemental** — l'enveloppe qui rétrécit, le TEWI qui se partage en
   deux parts, l'histoire Montréal → Kigali : tout y est mouvement.
2. **La DESP** — la pression qui monte jusqu'au tarage, la soupape qui s'ouvre puis
   se referme, le pressostat qui coupe avant. Le geste y est physique.
3. **Déchets** — la chaîne de traçabilité qui avance de main en main, la hiérarchie
   des traitements qui se descend marche par marche.
4. **Risques professionnels** — les neuf principes dans l'ordre, l'EPI en dernier
   recours ; la zone ATEX qui se forme puis se dissipe.
5. **Thermique** — la frise des générations, les trois exigences de la RE2020, le
   confort d'été qui s'accumule en degrés-heures.

Les six branches **non encore produites** (Acoustique, Incendie, Électrique,
Certifications, Droit du travail, et les deux stations restantes de Fluidique)
suivent le rail complet : fond → validation → production **avec animations dès le
départ**, plutôt qu'en fixe puis animé.
