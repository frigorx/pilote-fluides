/* ÉlectroRézo 6.4 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Version précédente : narration-v1.js.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Sur le côté d'un moteur, il y a un petit couvercle. Vous l'ouvrez, et vous trouvez six vis
en laiton, rangées sur deux lignes de trois. Entre elles, trois petites plaques de métal. On
les appelle des barrettes.
Maintenant, écoutez bien ce que je vais vous dire, parce que ça résume toute la station.
Selon la façon dont vous posez ces trois plaques, ce moteur va tourner normalement pendant
vingt ans, ou se mettre à fumer en une demi-minute. La même machine. Les mêmes fils d'arrivée.
Rien d'autre n'a changé que la position de trois morceaux de métal.
C'est le geste le plus simple de tout l'atelier. C'est aussi l'un de ceux qui coûtent le plus
cher quand on le fait au hasard.`,

  comprendre: `À l'intérieur, il n'y a rien de compliqué. Trois fils de cuivre, très longs, enroulés
chacun autour du fer. Trois bobinages.
Chacun a un début et une fin. Ça fait six extrémités, et ces six extrémités doivent bien
ressortir quelque part pour qu'on puisse les brancher. Elles ressortent sur les six vis. Voilà
tout le mystère : six vis, parce que trois bobinages ont chacun deux bouts.
Maintenant, regardez l'ordre dans lequel elles sont rangées, parce qu'il y a une bizarrerie.
Sur la ligne du haut, vous avez le début du premier bobinage, du deuxième, du troisième. Bien
rangés. Sur la ligne du bas, on s'attendrait à retrouver les fins dans le même ordre.
Eh bien non. Elles sont décalées d'un cran.
Ce décalage n'est pas une fantaisie du constructeur. Il est là exprès, et je vous demande de le
retenir : grâce à lui, on va pouvoir poser les barrettes bien droites, sans jamais avoir à les
croiser. On s'en sert dans un instant.
Passons à ce qui arrive de l'atelier. Le réseau amène trois fils.
Si vous mesurez entre deux de ces fils, vous trouvez, dans la plupart des ateliers, quatre
cents volts. Si vous mesurez entre un seul de ces fils et le neutre, vous trouvez beaucoup
moins : un peu plus de deux cent trente volts.
Deux tensions différentes, dans le même réseau, disponibles en même temps. Ce n'est pas une
subtilité de cours : c'est exactement ce qui va vous laisser le choix.
Première façon de faire. Vous prenez deux barrettes et vous les couchez sur la ligne du bas,
pour relier les trois vis du bas entre elles.
Regardez ce qui vient de se passer à l'intérieur. Les trois fins de bobinage sont maintenant
réunies en un seul point commun. Et chaque bobinage se retrouve tendu entre un fil du réseau
d'un côté, et ce point commun de l'autre.
Chacun reçoit donc la plus petite des deux tensions. Deux cent trente volts, pas davantage.
Cette façon de brancher porte un nom qui vient de sa forme : l'étoile. Trois branches qui
partent d'un même centre.
Deuxième façon. Vous enlevez les barrettes couchées, et vous posez les trois barrettes debout,
chacune reliant une vis du haut à celle qui se trouve juste en dessous.
C'est ici que le décalage sert — vous voyez pourquoi je vous ai demandé de le retenir. Comme la
ligne du bas est décalée d'un cran, chaque barrette droite relie la fin d'un bobinage au début
d'un autre. De proche en proche, les trois se referment en boucle, et chacun se retrouve branché
entre deux fils du réseau.
Chacun reçoit alors la grande tension. Quatre cents volts. Et cette façon de brancher porte,
elle aussi, le nom de sa forme : le triangle.`,

  manipuler: `À vous. Vous avez le réseau de l'atelier d'un côté, la plaque du moteur de l'autre.
La plaque vous dit sous quelle tension chaque bobinage est prévu pour travailler. Posez les
barrettes, et regardez ce que chaque bobinage reçoit vraiment.
Si les deux nombres se ressemblent, le moteur est content. S'ils sont très différents, vous
allez le voir tout de suite — et l'écran vous dira ce qui arriverait au moteur.`,

  representer: `Sur un plan, personne ne dessine un moteur. On dessine un signe convenu, le même pour
tout le monde, que vous soyez à Marseille ou à Hambourg.
Le voici. Un rond, une lettre pour dire que c'est un moteur, et trois traits qui arrivent pour
dire qu'il est alimenté par trois fils. À côté, les repères des bornes — exactement ceux que
vous venez de manipuler dans la boîte.
Alors quand vous lirez un plan, c'est ce signe-là que vous chercherez. Et vous saurez que
derrière, il y a six vis et trois barrettes à poser correctement.`,

  verifier: ''   /* On ne parle pas pendant qu'on évalue. */
};
