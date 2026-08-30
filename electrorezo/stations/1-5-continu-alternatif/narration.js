/* ÉlectroRézo 1.5 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Jusqu'ici, j'ai parlé du courant comme s'il coulait toujours dans le même sens. C'est vrai
d'une moitié de l'électricité, et faux de l'autre.
Il y a deux familles. Le continu, qui garde toujours le même sens. Et l'alternatif, qui change de
sens cinquante fois par seconde.
Ce n'est pas une nuance de spécialiste. Les deux ne se branchent pas pareil, ne se mesurent pas
pareil, et ne se remplacent pas l'une par l'autre.`,

  comprendre: `Regardez les deux tracés, l'un après l'autre.
Le continu, c'est une ligne droite. La valeur ne bouge pas, le sens non plus. Il y a donc un
pôle plus et un pôle moins, et ces deux-là ne sont pas interchangeables. Inversez-les, et
l'appareil refuse de fonctionner, quand il ne se détruit pas.
L'alternatif, c'est une vague. Le courant monte, redescend, passe par zéro, repart dans l'autre
sens, remonte. Cinquante fois par seconde.
Et là, il n'y a ni plus ni moins. Il y a une phase et un neutre — deux conducteurs qui ne jouent
pas le même rôle, mais qui ne sont pas des pôles au sens du continu.
Maintenant, une question que peu de gens se posent, et dont la réponse est intéressante.
Si le courant monte et redescend sans arrêt, que veut dire « deux cent trente volts » ?
Ce n'est pas le maximum : le maximum monte à environ trois cent vingt-cinq volts.
Ce n'est pas non plus la moyenne : il y a autant de positif que de négatif, donc la moyenne est
nulle.
C'est ce qu'on appelle la valeur efficace. C'est-à-dire : la valeur d'un courant continu qui
chaufferait autant. Un radiateur branché sur du deux cent trente alternatif chauffe exactement
comme s'il était branché sur du deux cent trente continu. Voilà la définition.
Dernière question, et elle mérite d'être posée. Pourquoi le réseau est-il alternatif ?
Parce qu'un transformateur ne fonctionne qu'en alternatif. Et sans transformateur, impossible de
monter en très haute tension pour transporter l'énergie sur des centaines de kilomètres, puis de
redescendre près des maisons.
Tout le réseau électrique européen tient à cette propriété-là.`,

  manipuler: `Passons à la mesure, et je vais vous montrer le piège le plus dangereux de toute cette ligne.
Sur un multimètre, il y a une position pour l'alternatif et une position pour le continu. Deux
petits signes : une vague, et un trait.
Regardez maintenant les deux écrans sur le dessin. Même prise, même appareil, même instant. Seul
le sélecteur a changé.
En position alternatif : deux cent trente et un volts. La vraie valeur.
En position continu : zéro virgule trois volt.
Et voilà le danger. L'appareil ne refuse pas. Il n'affiche aucun message d'erreur. Il affiche un
nombre, calmement, et ce nombre est presque zéro — parce qu'en continu il calcule une moyenne, et
que la moyenne d'un alternatif est nulle.
Quelqu'un qui ne connaît pas ce piège lit zéro, conclut que le circuit est mort, et pose la main
dessus.
C'est pour ça qu'avant d'intervenir on n'emploie pas un multimètre, mais un vérificateur
d'absence de tension. Cet appareil-là ne se trompe pas de mode : il est fait pour une seule
chose, et il la fait bien.`,

  representer: `Il n'y a pas ici de nouvelle unité : dans les deux cas, on mesure des volts et des ampères.
Ce qui change, c'est un petit signe accolé à la valeur, et je vous demande d'apprendre à le
repérer.
La vague, pour l'alternatif. Un trait plein au-dessus d'un trait pointillé, pour le continu. Vous
les trouverez sur les sélecteurs de multimètre, sur les plaques, sur les notices, sur les bobines.
Où est-ce que ça compte vraiment ? Trois endroits.
Sur une bobine de contacteur : vingt-quatre volts continu et vingt-quatre volts alternatif ne
sont pas le même article. Même valeur, comportement différent, référence différente.
Sur une alimentation : l'entrée porte le signe alternatif, la sortie le signe continu. Les deux
sont écrits, côte à côte, et c'est le travail de l'appareil.
Sur un moteur : le signe trois vague annonce un triphasé alternatif. C'est ce que vous verrez
presque toujours en atelier.
Ces deux signes sont minuscules. Prenez l'habitude de les chercher avant chaque branchement — ce
sont eux qui décident si l'appareil fonctionne ou s'il fume.`
};
