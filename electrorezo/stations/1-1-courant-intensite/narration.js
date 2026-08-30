/* ÉlectroRézo 1.1 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Nous commençons par ce que vous ne verrez jamais.
Un courant électrique ne se voit pas. Il ne se sent pas, il ne fait pas de bruit, il n'a pas
d'odeur. Un fil sous tension et un fil mort ont exactement la même tête.
C'est pour ça que ce métier demande des instruments, et c'est pour ça que la première ligne de
ce réseau parle de mesure.
Alors qu'est-ce qui circule ? Des charges électriques, toutes dans le même sens. Et ce qu'on
appelle l'intensité, ce n'est pas la quantité de ces charges. C'est le nombre qui passe chaque
seconde.`,

  comprendre: `Regardez le conducteur en coupe. Les charges sont là, et elles avancent — toutes ensemble,
dans le même sens.
Maintenant, imaginez une ligne en travers du fil. Une section. On compte ce qui la franchit
pendant une seconde. Ce nombre-là, c'est l'intensité.
Autrement dit : un ampère n'est pas une quantité, c'est une quantité par seconde. Comme un débit
d'eau, qu'on donne en litres par minute et jamais en litres.
Deux choses maintenant, qui surprennent presque tout le monde.
La première : les charges avancent très lentement. Quelques millimètres par seconde. À cette
vitesse, il faudrait des heures pour qu'une charge partie du tableau atteigne votre lampe.
Alors pourquoi la lampe s'allume-t-elle tout de suite ? Parce que ce n'est pas la charge qui
voyage vite : c'est l'ordre de se mettre en marche. Il se propage presque à la vitesse de la
lumière, et toutes les charges du fil démarrent en même temps, sur toute la longueur.
La deuxième : dans une boucle, le courant est le même partout. Ce qui entre par un bout ressort
par l'autre. Il ne s'use pas, il ne se consomme pas, il ne se perd pas en chemin.
Ça a l'air abstrait, et c'est pourtant le fondement de tout ce que vous ferez. Un différentiel
ne fait rien d'autre que vérifier cette égalité : si le retour ne vaut pas l'aller, c'est que
du courant est parti ailleurs. Vous verrez ça à la station quatre point cinq.
Un dernier point, et c'est celui qui compte pour votre sécurité. C'est le courant qui fait
chauffer un conducteur — et il chauffe avec le carré de l'intensité. Doublez le courant, et la
chaleur est multipliée par quatre. Pas par deux. Par quatre.`,

  manipuler: `Passons à la mesure, parce que c'est là qu'on se trompe le plus souvent, et que ça coûte cher.
Un ampèremètre compte ce qui le traverse. Donc il faut qu'il soit traversé. On ouvre le circuit,
et on met l'appareil dans le trou. C'est ce qu'on appelle brancher en série.
Et maintenant, l'erreur à ne jamais faire. Un ampèremètre a une résistance presque nulle : c'est
un fil, ou presque. Si vous le posez en parallèle, aux bornes de quelque chose, vous mettez la
source en court-circuit.
Regardez les deux montages sur l'écran. À gauche, le bon. À droite, celui qui fait partir le
fusible de l'appareil, quand ce n'est pas l'appareil lui-même.
Heureusement, il existe beaucoup plus commode : la pince ampèremétrique. Elle s'ouvre, elle
enserre le fil, et elle lit. Elle ne touche rien d'électrique, elle ne coupe rien, la machine
continue de tourner.
Une seule règle avec elle : un seul conducteur à la fois. Si vous en prenez deux, l'aller annule
le retour et elle affiche presque zéro. Ce n'est pas une panne — c'est de la physique, et c'est
exactement le principe du différentiel.`,

  representer: `L'intensité s'écrit avec un I majuscule, et elle se mesure en ampères, symbole A majuscule.
Attention à ne pas confondre les deux : le I est la grandeur, le A est l'unité. Ce sont deux
écritures différentes, pour deux idées différentes. On écrit I égale trois ampères, jamais I
égale trois I.
Les ordres de grandeur, maintenant, parce que ce sont eux qui vous serviront tous les jours.
Le milliampère, un millième d'ampère. C'est l'échelle du danger pour le corps : trente
milliampères suffisent à tuer quelqu'un.
L'ampère. Une lampe ordinaire en tire à peu près un.
Le kiloampère, mille ampères. C'est l'échelle d'un court-circuit.
Où allez-vous lire des ampères ? Sur la plaque d'un moteur, à côté de chaque tension. Sur un
disjoncteur, dans son calibre. Et dans le carnet d'une installation, pour chaque circuit.
Prenez ce réflexe : lire l'ampère écrit avant de brancher quoi que ce soit. C'est le nombre qui
décide de la section du câble, du calibre de la protection, et du réglage du thermique.`
};
