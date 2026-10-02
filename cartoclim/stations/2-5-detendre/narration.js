/* CartoClim 2.5 — textes POUR L'OREILLE, registre « professeur à l'épaule ».
   La voix explique, elle ne lit pas l'écran (00-charte/VOIX-ET-NARRATION.md).
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Regardez la première image. Un tube de cuivre, très fin, enroulé sur lui-même : un tube
capillaire. Il n'a l'air de rien, et pourtant, dans beaucoup de petits splits, c'est lui qui fait tomber
la pression du fluide. Aucune pièce qui bouge, aucun réglage.
Sur la seconde image, c'est presque le contraire : un corps en laiton, deux raccords de cuivre, et
au-dessus un petit cylindre, un moteur. Son câble va à la carte électronique. C'est un détendeur
électronique.
Pourquoi deux pièces si différentes pour le même travail ? Parce que le liquide qui sort du condenseur est
sous haute pression, et qu'il doit entrer dans l'évaporateur à basse pression, et froid, pour prendre la
chaleur de la pièce. Le détendeur est l'endroit où il change de pression. Vous le trouverez dehors, dans
l'unité extérieure.
Un troisième détendeur existe, celui à bulbe : il est expliqué dans Thermo-techno. Ici, nous nous occupons
de ces deux-là.`,

  comprendre: `Ouvrons le passage, et regardons ce qui s'y joue.
Le liquide arrive de la gauche, sous haute pression, devant un passage très étroit. Il est obligé de s'y
faufiler.
De l'autre côté, la pression est basse, et c'est là que tout se décide. À cette pression, le liquide est
trop chaud pour rester liquide. Une partie bout, d'un coup. Pour bouillir, il lui faut de la chaleur : elle
la prend au reste du liquide, qui se refroidit. Ce qui repart vers l'évaporateur, c'est un mélange froid,
du liquide et des bulles. Retenez-le : le froid ne vient pas d'un échange avec l'air, il vient de la
pression qui tombe.
Maintenant, comment est fait ce passage ? Avec un capillaire, c'est un tube long et très fin, dont la
longueur a été choisie une fois pour toutes. Il ne se règle pas, donc il ne s'adapte à rien. Trop de fluide
dans la machine, ou pas assez, il laisse faire : c'est pour cela que la charge se compte au gramme.
Avec un détendeur électronique, une aiguille ferme plus ou moins le passage. Un moteur pas à pas la pousse
ou la relève, par petits pas précis, et c'est la carte qui commande. Elle lit ses sondes et surveille ce
qu'on appelle la surchauffe. En clair : l'évaporateur est-il bien alimenté ? S'il manque de fluide, la
carte ouvre. S'il en reçoit trop, elle ferme. Sans arrêt.
C'est ce qu'il faut à une machine Inverter : son compresseur change de vitesse, donc le débit de fluide
change tout le temps. Un tube fixe ne peut pas suivre. L'aiguille, si.
Sur le dessin, déroulez les quatre pas, puis comparez les deux détendeurs.`,

  manipuler: `À vous. Imaginez le détendeur électronique d'un split Inverter, et cochez ce qu'il sait faire.
Faire chuter la pression : oui, c'est le métier de tout détendeur. Régler la surchauffe : oui aussi,
puisque la carte le pilote. Un capillaire, lui, ne règle rien. Comprimer le fluide : non, c'est
l'inverse de ce qu'il fait. Comprimer, c'est le travail du compresseur.
Pour le raccordement, le capillaire se brase dans le circuit, et il n'y a rien à brancher. Le détendeur
électronique a une bobine, son moteur, qui se branche à la carte par un petit câble. Les sondes de la
carte doivent être bien plaquées sur leur tube, sinon elle règle sur une mesure fausse.
Deux pièges pour finir. Un capillaire bouché : du givre sur le capillaire, une basse pression très basse,
et pas de froid dans la pièce. Un détendeur électronique : au démarrage, le bruit de moteur est normal.
Mais si la carte commande et que rien ne bouge, regardez la bobine : débranchée, elle bloque l'aiguille.
Avant de changer quoi que ce soit, regardez le câble.`,

  representer: `Deux symboles, pour deux détendeurs.
Le capillaire se dessine comme un simple trait, avec un petit rond : un tube, rien d'autre. Le détendeur
électronique se dessine comme un détendeur, surmonté d'un rond. Ce rond figure la commande : il dit que
la carte pilote.
Sur un schéma, cherchez le détendeur sur la ligne du liquide. Dans la croix du frigoriste, il est à
gauche, entre le condenseur, en haut, et l'évaporateur, en bas. Sur un split, il est dans l'unité
extérieure, et le mélange froid part vers l'unité intérieure par le petit tube.
Pour mesurer la surchauffe, rendez-vous à la station cinq point quatre.`
};
