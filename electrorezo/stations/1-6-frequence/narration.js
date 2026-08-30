/* ÉlectroRézo 1.6 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Vous venez de voir que le courant alternatif fait des allers-retours. Reste à savoir combien.
La réponse est cinquante par seconde, en Europe. On l'appelle la fréquence, et on la mesure en
hertz.
Cinquante hertz. Ce nombre a l'air d'un détail technique sans conséquence. Vous allez voir qu'il
décide de la vitesse de tous les moteurs de l'atelier.`,

  comprendre: `Servez-vous du curseur, et regardez la courbe se resserrer ou s'étirer.
Un aller-retour complet — le courant monte, redescend, repart dans l'autre sens, revient — on
appelle ça une période. La fréquence compte combien il y en a par seconde.
Poussez le curseur sur cinquante. C'est le réseau. Une seconde de courant contient cinquante
motifs comme celui-là.
Et regardez la deuxième case, celle de droite. Elle donne la vitesse à laquelle tournerait un
moteur à deux pôles branché sur cette fréquence.
Voilà le lien que je veux que vous emportiez. À cinquante hertz, un moteur à deux pôles tourne à
trois mille tours par minute. À quatre pôles, quinze cents. À six pôles, mille.
Deux choses décident donc de la vitesse : le nombre de pôles, qui est dans la construction du
moteur et qu'on ne change pas ; et la fréquence.
Maintenant, une remarque au passage qui vous servira plus tard. Cinquante allers-retours par
seconde, ça fait cent passages par zéro, puisqu'il y en a deux par période.
Cent fois par seconde, le courant s'annule. C'est exactement ce qui aide un arc de coupure à
s'éteindre — et c'est pour ça qu'un arc en alternatif est bien plus facile à souffler qu'un arc
en continu.
Dernier point, et c'est le plus important. Sur le réseau, la fréquence ne se règle pas. Elle est
tenue par le réseau lui-même, à quelques centièmes près, en permanence.
Alors si vous voulez faire tourner un moteur plus lentement, vous ne pouvez pas toucher au
réseau. Il faut fabriquer une autre fréquence. C'est exactement le métier du variateur, et c'est
tout le sujet de la ligne sept.`,

  manipuler: `Pour la mesure, la plupart des multimètres savent afficher une fréquence : cherchez la position
marquée Hz.
Et vous allez trouver, à chaque fois, la même chose : cinquante virgule zéro.
Ce n'est pas que l'appareil soit paresseux. C'est que la fréquence du réseau est une des
grandeurs les mieux tenues qui soient, parce que toute l'Europe est synchronisée dessus.
Alors quand cette mesure devient-elle intéressante ? Justement quand elle n'affiche pas
cinquante.
Une valeur qui flotte autour de cinquante-deux ou de quarante-huit vous dit que vous n'êtes pas
sur le réseau public : vous êtes derrière un groupe électrogène, ou en sortie de variateur.
C'est une information de diagnostic, et elle peut expliquer bien des comportements bizarres.
Une réserve pour finir. En sortie de variateur, la mesure est délicate : le signal n'est pas une
belle sinusoïde, mais un hachage. Beaucoup de multimètres s'y trompent.
Si vous voulez connaître la vitesse d'un moteur, un tachymètre est plus direct. Il vous donne des
tours par minute, ce qui est justement ce que vous cherchez.`,

  representer: `La fréquence s'écrit avec un f minuscule — c'est une des rares grandeurs à ne pas prendre de
majuscule — et son unité est le hertz, symbole H majuscule z minuscule.
Les valeurs à connaître. Cinquante hertz en Europe. Soixante en Amérique du Nord et dans une
partie de l'Asie. Et de zéro à quelques centaines, pour ce que fabrique un variateur.
Cette différence entre cinquante et soixante n'est pas anecdotique. Un moteur européen branché
sur du soixante hertz tourne vingt pour cent plus vite. Il ne casse pas tout de suite, mais il
chauffe, et il n'aime pas ça longtemps.
Où lirez-vous des hertz ? Trois endroits.
Sur la plaque d'un moteur : cinquante hertz. Cela veut dire que toutes les autres valeurs de la
plaque — la tension, l'intensité, la vitesse — s'entendent à cette fréquence-là.
Sur un variateur : deux fréquences sont écrites. Celle d'entrée, qui est imposée par le réseau,
et la plage de sortie, qui est ce qu'il sait fabriquer.
Et sur un appareil importé : vérifiez toujours la fréquence prévue avant de le brancher. C'est
une vérification de dix secondes, et elle évite des déconvenues.`
};
