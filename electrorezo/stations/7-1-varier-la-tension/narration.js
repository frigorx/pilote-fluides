/* ÉlectroRézo 7.1 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Vous voulez ralentir un moteur. Quelle est la première idée qui vient ?
Lui envoyer moins de tension. Ça paraît évident : moins on pousse, moins ça va vite.
Et pour une lampe, ça marche parfaitement. Pour une résistance de chauffage aussi.
Pour un moteur asynchrone, non. Et je vais vous montrer pourquoi, parce que c'est instructif — et
parce que c'est ce qui explique l'existence de toute la ligne sept.`,

  comprendre: `Servez-vous du curseur, et regardez les trois cadres.
Baissez la tension. Quatre cents volts, trois cent cinquante, trois cents.
Regardez le troisième cadre, la vitesse : elle ne bouge presque pas. Quelques tours par minute.
Maintenant regardez le deuxième, le couple : il s'effondre.
À soixante-dix pour cent de la tension, il ne reste que la moitié du couple. Retenez ce chiffre,
il est parlant.
Pourquoi cet écroulement ? Parce que le couple d'un moteur asynchrone suit le carré de la
tension. Encore le carré — vous commencez à le connaître.
Et pourquoi la vitesse ne bouge-t-elle pas ? Parce qu'elle n'est pas fixée par la tension. Elle
est fixée par la fréquence et par le nombre de pôles. Vous le savez depuis la station deux point
six.
La tension ne décide pas de la vitesse du champ. Elle décide seulement de la force avec laquelle
le rotor est entraîné.
Regardez maintenant la dernière ligne du troisième cadre : l'intensité monte.
C'est logique, et c'est le vrai danger. Le moteur doit toujours fournir la même puissance
mécanique à sa machine. Avec moins de tension, il lui faut plus de courant.
Résultat : il chauffe. Et si vous insistez, le relais thermique déclenche — quand le bobinage n'a
pas grillé avant.
Voilà donc la conclusion de cette station. Baisser la tension d'un moteur asynchrone ne le
ralentit pas : ça l'affaiblit, et ça le fait chauffer.`,

  manipuler: `Passons à la façon dont on fait varier une tension alternative en pratique, parce que ça
surprend souvent.
On ne l'abaisse pas. On la découpe.
Servez-vous du second curseur et regardez la courbe.
À zéro degré, la sinusoïde est entière. Augmentez l'angle : on supprime le début de chaque
alternance, et on ne laisse passer que la fin.
Regardez bien la hauteur de la courbe : elle ne change jamais. C'est toujours la pleine tension
du réseau qui passe. Ce qui change, c'est la durée pendant laquelle on la laisse passer.
Et la valeur efficace, elle, baisse — parce qu'il y a moins de courant sur la durée.
C'est ce que fait un gradateur, et c'est ce que vous avez chez vous sur un variateur de lumière.
Maintenant, deux conséquences pratiques.
La première, pour vos mesures. Un multimètre ordinaire mesure mal cette onde : il suppose une
sinusoïde pour calculer la valeur efficace. Sans la fonction True R M S, l'erreur peut atteindre
vingt pour cent, et rien ne vous prévient.
La seconde, pour les protections. Une onde découpée met aussi en défaut beaucoup de
différentiels. Sur une installation à gradateurs, il faut des différentiels de type adapté.`,

  representer: `Retenez cette station comme celle qui vous dit ce qu'il ne faut PAS faire, et pourquoi.
Faire varier une tension, c'est excellent pour ce qui chauffe et pour ce qui éclaire. Une
résistance, une lampe : moins de tension, moins de puissance, et c'est tout.
Pour ce qui tourne, c'est une mauvaise idée. Le couple s'écroule, l'intensité monte, et la
vitesse ne bouge pas.
Deux avertissements pour finir.
Beaucoup de gradateurs portent la mention « charges résistives uniquement ». Prenez-la au
sérieux : sur un moteur ou sur un transformateur, ils se détruisent.
Et attention à ne pas confondre deux choses. Un ventilateur à plusieurs vitesses ne fait pas
varier sa tension : il change d'enroulement. Ce n'est pas de la variation, c'est une sélection
entre deux ou trois vitesses fixes.
La vraie variation de vitesse d'un moteur asynchrone, elle, passe par autre chose. Par la
fréquence. Et c'est la station suivante.`
};
