# Capsules « quelqu'un vous explique » — module Sécurité

> **Idée de F. Henninot (26/07/2026)** : *« au lieu de lire, on met une voix humaine qui explique.
> Une sorte de tutoriel à la fois oral et visuel, comme si quelqu'un faisait le cours, dans la
> partie autoformation. »*
>
> Ce document contient les **scripts prêts à enregistrer** des 5 capsules du module sécurité,
> plus la méthode. Rien n'est encore produit ni intégré.

---

## 1. La règle qui prime sur tout le reste

**Une capsule est FIGÉE, une fiche se corrige.** Le jour où une fiche est modifiée, la capsule
qui la commente devient fausse — et personne ne s'en aperçoit, parce qu'une vidéo ne se relit pas
comme un texte.

C'est déjà arrivé sur ce projet, en pire : le 26/07, la fiche CO₂ affirmait que le gaz ne donne
« aucune gêne avant la perte de connaissance ». C'était faux, et c'était **mortel** comme conseil.
Si une capsule avait été enregistrée la veille, elle enseignerait encore l'erreur aujourd'hui.

**Donc, dans cet ordre, sans exception :**

1. la fiche est écrite ;
2. **F. Henninot la relit et la valide** (relecture métier) ;
3. *ensuite seulement* on enregistre la capsule ;
4. on note dans ce fichier la **date de la version de fiche** qui a servi de source.

Une capsule enregistrée avant la relecture métier est une erreur figée pour des années.

---

## 2. Ce qu'on filme, et ce qu'on ne filme pas

| | Quoi | Avec quoi |
|---|---|---|
| ✅ | **Le commentaire d'un schéma** — la voix explique, le schéma défile | nos SVG + la voix |
| ✅ | **La mise en situation** — le local, l'escalier, la porte fermée. Aucun geste technique | Gemini / Veo, ou le téléphone |
| ✅ | **Le geste réel** — brancher un manifold, tirer au vide | **le téléphone de F. Henninot, sur le plateau** |
| ❌ | **Un geste technique généré par IA** | jamais |

**Pourquoi jamais le geste généré.** Un modèle vidéo produira un ordre de vannes faux, un manifold
à trois manomètres, un technicien sans gants. En habilitation, un geste faux montré dans le
support est **opposable** : le stagiaire reproduit ce qu'il a vu, et une image reste bien plus
longtemps qu'un paragraphe. Même raisonnement que les seuils en ppm qu'on refuse d'écrire.

**L'architecture la plus solide, et la moins chère :** les schémas SVG du pack sont déjà les
plans de la vidéo. Ils sont exacts, corrigeables, nets en plein écran. Il ne manque que la voix.

---

## 3. La voix

**Celle de F. Henninot d'abord.** C'est la réponse littérale à « on a l'impression que quelqu'un
explique » : c'est quelqu'un, et c'est le formateur que les stagiaires auront en face d'eux.
Quatre-vingt-dix secondes s'enregistrent en trois minutes avec un téléphone, dans une pièce
calme, sans matériel.

**La synthèse vocale en secours**, pour le volume, si les 42 fiches doivent y passer un jour.
Avantage réel : quand une fiche change, on régénère la bande-son en une minute — ce qu'un
enregistrement humain oblige à refaire. Inconvénient : ça s'entend, et devant des adultes en
formation professionnelle, une voix robotique décrédibilise le propos.

**Recommandation :** la vraie voix sur les 5 capsules sécurité et les 2 capsules CO₂ — celles où
l'engagement compte. La synthèse ensuite, si le volume l'exige.

---

## 4. Format tenu par tous les scripts

- **60 à 90 secondes.** Au-delà, on perd le public qu'on cherchait justement à retenir.
- **Une idée par phrase.** Phrases courtes. Pas de subordonnée.
- **Vocabulaire du quotidien**, chaque mot technique expliqué à sa première apparition (public FLE
  et DYS, cf. la charte d'accessibilité).
- **Vouvoiement**, adultes.
- **Aucune valeur chiffrée** — mêmes règles que les fiches.
- On termine toujours par **le geste**, jamais par la théorie.

---

## 5. Les cinq scripts

### Capsule 1 — L'air qui manque (≈ 80 s)
**Plan :** `secu-espace-clos.svg`, les trois vignettes dans l'ordre.
**Source :** fiche `s1`, version du 26/07/2026.

> Un local fermé peut se remplir d'un gaz qui prend la place de l'air.
> De l'azote, après une mise en pression. Ou du fluide, après une fuite.
> Ce gaz ne se voit pas. Il ne sent rien.
>
> *(vignette 1)*
> Regardez : le gaz remplit la pièce **par le bas**. La porte est fermée depuis des heures.
> De l'extérieur, rien n'a changé.
>
> *(vignette 2)*
> Le technicien entre. Il ne sent rien d'anormal. Et il perd connaissance — en quelques instants.
> Votre corps ne vous prévient pas d'un manque d'oxygène. Il vous prévient d'un excès de gaz
> carbonique. Ce n'est pas la même chose.
>
> *(vignette 3)*
> Et voilà pourquoi il y a presque toujours **deux** victimes. Le collègue le voit au sol.
> Il descend le chercher. Il respire le même air. Il tombe à son tour.
>
> Alors la règle est simple. Avant d'entrer : on ventile, on mesure l'air, et on n'y va jamais
> seul. Et si quelqu'un est déjà au sol : on alerte, on ventile, on fait venir les secours.
> **On ne descend pas.**

---

### Capsule 2 — Le froid brûle (≈ 60 s)
**Plan :** `secu-projection.svg`.
**Source :** fiche `s2`, version du 26/07/2026.

> Le fluide liquide est sous pression. Dès qu'il sort, il s'évapore d'un coup.
> Cette évaporation prend de la chaleur partout autour — y compris dans votre peau.
> Résultat : une brûlure. Une brûlure par le froid. On appelle ça une gelure.
>
> *(schéma)*
> Le jet part **dans l'axe du raccord**. Regardez la zone rouge : on ne se place jamais là.
> Et souvent, ce jet est invisible.
>
> Les yeux sont les plus exposés. Il n'y a aucun réflexe qui protège d'un jet qu'on ne voit pas
> venir.
>
> Alors, dans l'ordre. Gants et lunettes **avant** de commencer, pas au moment où ça part.
> Ensuite, on lit le manomètre, vanne fermée : la pression doit être à zéro.
> Et on desserre doucement, jamais d'un coup, en restant sur le côté.
>
> Si vous êtes touché : rincez sans frotter, et consultez. La conduite à tenir exacte est écrite
> sur la fiche de données de sécurité du fluide.

---

### Capsule 3 — La flamme interdite (≈ 75 s)
**Plan :** `secu-flamme.svg`, moitié gauche puis moitié droite.
**Source :** fiche `s3`, version du 26/07/2026.

> Un fluide frigorigène est stable. Tant qu'il ne rencontre pas de flamme.
> Chauffé, il ne brûle pas comme un carburant : il **se casse**. Sa molécule se décompose.
> Et ce qui se dégage n'était pas dans la bouteille : des gaz toxiques, des gaz corrosifs.
>
> *(moitié gauche)*
> Voilà ce qui se passe quand il reste du fluide dans le tube.
> Vous êtes penché sur votre brasage. Les fumées montent. Elles montent vers votre visage.
> Vous les respirez à bout portant.
>
> *(moitié droite)*
> Le geste juste tient en trois temps.
> Un : on récupère **tout** le fluide. Pas « presque tout ».
> Deux : on fait circuler de l'azote dans le tube pendant qu'on chauffe — c'est le balayage.
> Trois : on ventile, et on ne reste pas le nez au-dessus de la flamme.
>
> Et une interdiction absolue : on ne cherche **jamais** une fuite avec une flamme.
> C'est une vieille méthode. Aujourd'hui, c'est interdit. On utilise un détecteur électronique.

---

### Capsule 4 — Ce qui éclate (≈ 85 s)
**Plan :** `secu-bouteille.svg`, gauche puis droite, puis le bandeau rouge.
**Source :** fiche `s4`, version du 26/07/2026.

> Un circuit reste sous pression. Même à l'arrêt. Même la nuit. Même en hiver.
> Et plus la température monte, plus la pression monte avec elle.
>
> *(moitié gauche)*
> Regardez cette bouteille remplie à ras. Le liquide occupe tout. Il n'a pas un centimètre pour
> se dilater. Le soleil tape. Le liquide veut prendre de la place — et il n'en a pas.
> La pression grimpe très vite. Beaucoup plus vite que vous ne l'imaginez.
>
> *(moitié droite)*
> Et voilà la même bouteille remplie correctement. Il reste un volume libre au-dessus du liquide.
> La dilatation est absorbée. C'est tout ce qui change — et ça change tout.
> Le taux exact est écrit sur la plaque de la bouteille.
>
> Donc : on ne chauffe **jamais** une bouteille. Ni flamme, ni eau chaude, ni radiateur.
> On ne la laisse pas au soleil, ni dans un véhicule fermé en plein été.
> Et pour mettre un circuit en pression : **azote seul**, jamais d'oxygène, jamais d'air comprimé,
> et toujours avec un mano-détendeur.
>
> Dernière chose. Avant de desserrer quoi que ce soit : lisez le manomètre.
> Même si la machine est arrêtée depuis un mois.

---

### Capsule 5 — Consigner avant de toucher (≈ 90 s)
**Plan :** `secu-consignation.svg`, étape par étape.
**Source :** fiche `s5`, version du 26/07/2026.

> Ce risque-là n'est pas à votre examen. Il n'est dans aucun code du référentiel.
> Il tue des professionnels chaque année. C'est pour ça qu'on en parle quand même.
>
> Le courant qui traverse le corps, ça s'appelle une électrisation.
> Quand elle tue, on parle d'électrocution. C'est le même phénomène ; seule la gravité change.
> Et il y a pire : l'arc électrique. Celui-là brûle **sans aucun contact**.
>
> *(les cinq étapes)*
> Avant de toucher, cinq étapes. Toujours dans cet ordre.
> **Séparer** : je coupe, et je vois que c'est coupé.
> **Condamner** : je verrouille, pour que personne ne rallume pendant que j'ai les mains dedans.
> **Identifier** : est-ce bien ce circuit-là ? Un disjoncteur mal repéré, ça existe.
> **Vérifier l'absence de tension** au VAT. C'est l'étape qui prouve. Les quatre autres ne
> prouvent rien.
> **Mettre à la terre**, quand une tension peut revenir par ailleurs.
>
> Et le VAT, on le teste avant, et on le teste après, sur une source qu'on sait sous tension.
> Parce qu'un appareil en panne affiche « pas de tension » quoi qu'il arrive.
> S'il marchait avant et plus après, tout ce qu'il a mesuré entre les deux ne vaut rien.
>
> Un dernier piège : couper le courant ne vide pas tout. Un condensateur reste chargé.

---

## 6. Où les brancher, une fois produites

Le pack est **déjà prêt à les recevoir** : chaque séquence de `packs/fluides/parcours.js` a un
champ `video`, aujourd'hui à `null`. On y met l'URL et la capsule apparaît en projection comme en
autoformation.

```js
seq("s1", 25, 3, "https://…")   // 4ᵉ argument = l'URL de la capsule
```

**Hébergement : surtout pas dans le dépôt.** Le pack pèse aujourd'hui **624 Ko** et s'ouvre sur
n'importe quel téléphone en 4G — c'est un atout majeur pour le public visé, et des fichiers vidéo
le détruiraient. On héberge ailleurs (lien non répertorié) et on ne pousse que l'URL.

**Le texte reste.** La capsule ajoute un canal, elle ne remplace pas la fiche : sans écouteurs,
dans le train, ou pour un stagiaire sourd, la fiche doit rester complète et autonome.

---

*Scripts rédigés le 26/07/2026 depuis les fiches `s1`→`s5`. **Aucun n'est à enregistrer avant la
relecture métier de F. Henninot** — voir § 1.*
