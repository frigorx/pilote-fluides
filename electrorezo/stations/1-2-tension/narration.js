/* ÉlectroRézo 1.2 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Voici la grandeur la plus mal comprise de toute l'électricité, et je vais vous dire tout de
suite pourquoi.
Tout le monde dit : « il y a deux cent trente volts sur ce fil ». C'est un raccourci, et c'est
faux si on le prend au pied de la lettre.
La tension n'existe jamais sur un fil. Elle existe entre deux fils, entre deux points, entre deux
bornes. C'est une différence — toujours.
Si vous retenez ça, vous comprendrez la moitié des accidents électriques.`,

  comprendre: `Regardez le dessin. Deux points, A et B, chacun à un niveau.
Ce niveau, on l'appelle le potentiel. Et la tension entre A et B, c'est simplement l'écart entre
leurs deux niveaux.
Maintenant, faites monter B. L'écart grandit, la tension grandit. Faites-le redescendre au niveau
de A : l'écart disparaît, la tension est nulle.
Et voici le point qui va tout éclairer. Quand les deux points sont au même niveau, la tension est
nulle même si ce niveau est très élevé. Deux points à cinquante mille volts chacun, entre eux :
zéro.
C'est exactement pour ça qu'un oiseau posé sur une ligne haute tension ne meurt pas. Ses deux
pattes sont sur le même fil, donc au même potentiel. Entre ses pattes, il n'y a aucune
différence. Rien ne le traverse.
Qu'il touche un deuxième fil, ou un pylône, et il meurt instantanément. Ce n'est pas le fil qui
tue : c'est la différence entre deux points.
Un mot pour finir sur le rôle de la tension. C'est elle qui pousse. Sans différence de potentiel,
les charges restent là où elles sont et rien ne circule.
Alors retenez l'ordre des choses : la tension est la cause, le courant est la conséquence.`,

  manipuler: `La mesure, maintenant — et elle est simple, parce qu'on ne coupe rien.
Un voltmètre mesure une différence. Il lui faut donc deux points. On pose une pointe sur chacun,
et on lit.
On dit qu'on branche en parallèle, ou aux bornes. Regardez le dessin de gauche : le circuit reste
entier, la charge continue de fonctionner, l'appareil se contente de regarder.
Pourquoi ça ne perturbe rien ? Parce qu'un voltmètre a une résistance énorme, de l'ordre du
million d'ohms. Il ne prend presque aucun courant.
Et c'est justement pour cette raison qu'il ne faut jamais le mettre en série. Regardez le dessin
de droite : mis dans le circuit, c'est comme si vous aviez coupé le fil. La machine s'arrête.
Une habitude à prendre tout de suite : la pointe noire va dans la borne marquée COM, et elle n'en
bouge jamais. C'est la rouge qu'on déplace selon ce qu'on mesure. Et c'est donc elle qui se
trompe.
Enfin, je dois vous dire une chose sérieuse. La mesure de tension est la seule qu'on fait
couramment sur une installation en service. C'est donc celle qui vous expose le plus.
Gants isolants, pointes en bon état, une main derrière le dos, et jamais seul sur une
installation que vous ne connaissez pas.`,

  representer: `La tension s'écrit avec un U majuscule, et elle se mesure en volts, symbole V majuscule.
Vous verrez parfois un E majuscule pour désigner la tension d'une source. C'est la même grandeur,
vue du côté de ce qui produit.
Les ordres de grandeur. Le millivolt, pour les sondes de température. Le volt, l'unité. Le
kilovolt, mille volts — au-delà, on parle de haute tension, et ce n'est plus le même métier ni la
même habilitation.
Où lirez-vous des volts ? Partout, et il faut savoir de quoi on parle à chaque fois.
Sur la plaque d'un moteur, deux tensions sont écrites — deux cent trente et quatre cents. Elles
ne sont pas au choix : chacune correspond à un couplage. Vous verrez ça à la station six point
quatre.
Sur une bobine de contacteur, la tension écrite est celle de la commande. Elle n'a rien à voir
avec celle de la puissance que l'appareil coupe.
Dans une armoire ordinaire, il y a couramment trois tensions qui cohabitent : quatre cents entre
phases, deux cent trente entre phase et neutre, vingt-quatre pour la commande.
Alors lisez laquelle avant de brancher. Une bobine vingt-quatre volts alimentée en deux cent
trente grille en une seconde, et elle ne prévient pas.`
};
