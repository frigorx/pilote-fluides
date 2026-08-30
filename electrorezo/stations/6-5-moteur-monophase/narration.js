/* ÉlectroRézo 6.5 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Une question toute simple pour ouvrir cette station.
Vous avez vu qu'un moteur triphasé démarre tout seul, grâce au champ tournant que créent les
trois courants décalés.
Et en monophasé ? Il n'y a qu'un seul courant. Pas de décalage, pas de champ tournant.
Alors comment fait-on tourner un moteur dans une maison ?
La réponse est qu'on fabrique le décalage. Artificiellement. Et l'objet qui le fabrique, c'est le
condensateur.`,

  comprendre: `Regardez le dessin, et commencez par le premier bouton : un seul enroulement.
Le champ existe. Il grandit, il s'annule, il repart en sens inverse. Cinquante fois par seconde.
Mais il reste toujours sur le même axe. Il va et vient. On dit qu'il pulse.
Et voilà pourquoi le rotor ne démarre pas : rien ne lui indique de quel côté partir. Il est tiré
également dans les deux sens.
Il ronfle, il chauffe, et il ne bouge pas.
Fait remarquable, et vous le vérifierez un jour : si vous lancez ce rotor à la main, il continue
de tourner. Dans le sens où vous l'avez lancé. Une fois qu'il tourne, le champ pulsant suffit à
l'entretenir. C'est le démarrage, et lui seul, qui manque.
Maintenant, appuyez sur le second bouton.
On ajoute un deuxième enroulement, décalé de quatre-vingt-dix degrés dans le stator. C'est
nécessaire, mais ce n'est pas suffisant.
Parce que si les deux enroulements reçoivent le même courant au même instant, leurs champs
s'additionnent simplement — et le résultat pulse encore, sur un axe différent.
Il faut aussi que les deux courants soient décalés dans le temps.
Et c'est là qu'intervient le condensateur. Placé en série avec l'enroulement auxiliaire, il met
son courant en avance sur celui du principal.
Deux enroulements décalés dans l'espace. Deux courants décalés dans le temps. Le champ se met à
tourner — et le moteur démarre seul.
C'est exactement le même principe que le triphasé. La seule différence, c'est qu'ici on a dû le
fabriquer.`,

  manipuler: `Les trois questions.
Elles donnent les mêmes réponses que pour le moteur triphasé : la différence entre les deux n'est
pas dans ce qu'ils font, mais dans ce qu'il leur faut pour démarrer.`,

  representer: `Sur un plan, c'est le même rond marqué M, mais avec deux traits qui arrivent au lieu de trois,
et le signe un vague.
Le condensateur se dessine par deux traits parallèles, courts et épais, qui ne se touchent pas.
Ce vide entre les deux traits, c'est l'isolant du condensateur : deux plaques face à face, jamais
en contact.
Son repère commence par C, et sa capacité en microfarads est écrite à côté. Jamais dans le
dessin.
Maintenant, deux choses très pratiques pour finir, et je veux qu'elles vous restent.
La première : pour inverser le sens d'un moteur monophasé, on inverse les bornes de
l'enroulement auxiliaire. Pas celles de l'alimentation.
C'est exactement le contraire du triphasé, où on échange deux phases d'alimentation. Beaucoup
de gens font l'erreur, tournent la phase et le neutre, et s'étonnent que rien ne change.
La seconde, et c'est un vrai diagnostic. Un moteur monophasé qui ronfle sans démarrer, et qui
part si on le lance à la main dans le sens où on l'a lancé : c'est le condensateur.
Ce symptôme est tellement caractéristique qu'il vaut diagnostic. Avant de démonter quoi que ce
soit, allez vérifier le condensateur.
Et attention en le manipulant : un condensateur reste chargé après la coupure. On le décharge
avant d'y toucher, avec une résistance — pas en le court-circuitant brutalement avec un
tournevis.`
};
