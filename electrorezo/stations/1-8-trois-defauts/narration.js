/* ÉlectroRézo 1.8 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Cette station est une charnière. Ce que vous allez apprendre ici sert de fil rouge à toute la
ligne quatre, celle des protections.
Une installation peut mal se comporter de trois façons. Trois, et pas une de plus.
Trop de courant qui dure. Trop de courant d'un coup. Ou du courant qui part là où il ne devrait
pas.
Trois défauts, trois dangers, trois protections différentes. Et surtout : aucune protection ne
les couvre toutes.`,

  comprendre: `Regardons-les l'un après l'autre, avec les trois boutons sous le dessin.
Le premier, la surcharge. Le courant emprunte le bon chemin, celui qui était prévu. Mais il est
un peu trop fort, et surtout, il y reste.
Je veux insister sur ce qui rend ce défaut particulier : il est parfaitement discret. Pas de
bruit, pas d'étincelle, pas d'odeur. Un câble en surcharge chauffe, doucement, dans un mur ou
dans une goulotte. L'isolant vieillit, durcit, devient cassant. Ça peut prendre des mois.
Puis un jour il craque.
Le deuxième, le court-circuit. Deux conducteurs se touchent. Il n'y a presque plus de résistance
sur le chemin, donc plus rien pour freiner le courant.
Des milliers d'ampères, en quelques millièmes de seconde. C'est brutal, c'est bruyant, et c'est
fini avant qu'on ait compris ce qui se passait.
Le troisième, le défaut d'isolement. Et celui-là est d'une autre nature.
Le courant quitte son chemin. Il part vers la terre — par une carcasse métallique mal isolée, ou
par une personne qui touche.
Il n'est ni particulièrement fort, ni particulièrement long. Il est ailleurs. Et c'est
précisément ce qui le rend invisible à tout ce qui compte le courant qui passe.
Voilà pourquoi il faut trois protections différentes. Un bilame pour la surcharge, qui est lent.
Une bobine ou un fusible pour le court-circuit, qui est instantané. Et un différentiel pour le
défaut d'isolement, qui ne compte pas mais qui compare.`,

  manipuler: `Pour la mesure, chaque défaut a son instrument — et l'un des trois ne se mesure pas du tout.
La surcharge se constate à la pince, en service. On mesure, on compare à la plaque, et on voit
l'écart. C'est la seule des trois qu'on peut prendre sur le fait facilement.
Le court-circuit ne se mesure pas. Il est trop rapide et trop dangereux. On le constate après
coup : par ce qui a fondu, par ce qui a déclenché, par les traces sur les conducteurs.
Le défaut d'isolement se mesure au mégohmmètre. Cet appareil-là envoie une haute tension d'essai
— cinq cents volts, parfois mille — et regarde combien fuit à travers l'isolant.
Et parce qu'il envoie une haute tension, il y a deux règles absolues. Jamais sur une installation
en service. Et jamais sur du matériel électronique, qu'il détruirait.
Un mot enfin sur le bouton test d'un différentiel. Il ne mesure rien du tout. Il vérifie
seulement que l'appareil coupe encore. C'est utile, c'est même indispensable deux fois par an —
mais ça ne remplace pas une mesure d'isolement.`,

  representer: `Il n'y a pas de nouvelle unité ici : les trois défauts se comptent en ampères. Ce qui change,
c'est le lieu et la durée.
La surcharge : vingt pour cent de trop, pendant des minutes.
Le court-circuit : mille fois trop, pendant des millièmes de seconde.
Le défaut d'isolement : trente milliampères — trois centièmes d'ampère — mais vers la terre.
Trois centièmes d'ampère. À côté d'un fusible de seize ampères, c'est une poussière. Et pourtant
c'est le seuil à partir duquel le courant devient mortel pour un cœur humain.
Regardez la courbe de la première image : elle montre exactement ça. En abscisse, le courant qui
traverse le corps. En ordonnée, la durée. Et des zones, qui vont de « on ne sent rien » à
« fibrillation ».
Ce n'est pas de la théorie. C'est le document normalisé sur lequel s'appuie tout le
dimensionnement des protections.
Un dernier mot pour faire le lien avec la suite. Sur un plan, chaque protection annonce ce
qu'elle sait voir, par les signes qu'elle porte. Le crochet du thermique. Le demi-cercle du
magnétique. Le tore du différentiel.
Vous savez déjà les lire si vous avez fait la ligne huit. Sinon, elle vous attend — et elle vous
donnera de quoi lire n'importe quel schéma sans dictionnaire.`
};
