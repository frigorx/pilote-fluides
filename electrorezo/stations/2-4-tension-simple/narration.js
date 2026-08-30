/* ÉlectroRézo 2.4 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Voici une station courte, mais qui règle une confusion très répandue.
Sur un réseau triphasé, il y a deux tensions différentes. Deux cent trente, et quatre cents. Elles
existent en même temps, sur les mêmes fils.
Aujourd'hui, on regarde la plus petite : la tension simple. Celle qu'on mesure entre une phase et
le neutre.
C'est la tension de vos prises à la maison. Et c'est, tout simplement, une des trois du
triphasé.`,

  comprendre: `Regardez le dessin, c'est une étoile.
Au centre, un point : le neutre. Et trois branches qui en partent, une par phase.
Chaque branche, c'est une tension simple. La distance du centre à l'extrémité, c'est sa valeur :
deux cent trente volts.
Trois branches identiques, à cent vingt degrés l'une de l'autre.
Maintenant, d'où vient ce point central ? C'est une vraie question, et la réponse est concrète.
Au transformateur de quartier, il y a trois bobinages. Et on relie leurs trois extrémités en un
seul point. Ce point commun, c'est le neutre.
Il n'y a pas de quatrième bobinage. Le neutre n'est pas fabriqué : c'est un point de jonction.
Et voilà pourquoi on l'appelle le neutre : c'est le zéro à partir duquel on compte tout le reste.
Maintenant, une chose qui explique le monde autour de vous.
Une maison reçoit une phase et le neutre. Une seule phase. Donc une tension simple : deux cent
trente volts.
Et sur un même transformateur de quartier, on répartit les maisons : une sur L un, la suivante
sur L deux, la troisième sur L trois. Puis on recommence.
C'est ainsi qu'on garde le réseau à peu près équilibré, sans que personne n'ait à s'en occuper.
Votre voisin n'est probablement pas sur la même phase que vous — et vous avez pourtant tous les
deux deux cent trente volts.`,

  manipuler: `Pour la mesure, une pointe sur la phase, l'autre sur le neutre. Sélecteur en alternatif. Rien de
compliqué.
Ce qui est intéressant, c'est de faire les trois et de les comparer.
Elles doivent être très proches. Deux cent trente et un, deux cent vingt-neuf, deux cent trente :
c'est parfaitement normal.
Maintenant, je veux vous montrer un défaut que vous rencontrerez, et qui fait des dégâts : le
neutre coupé.
Imaginez que le neutre soit interrompu quelque part en amont. Les trois phases sont toujours là,
mais le point commun a disparu.
Que se passe-t-il ? Les tensions ne se répartissent plus régulièrement. Elles se répartissent en
fonction des charges branchées sur chaque phase.
Concrètement, vous mesurez deux cent soixante volts sur une phase, et cent quatre-vingt-dix sur
une autre.
Les appareils branchés sur la phase à deux cent soixante brûlent. Et rien ne déclenche, parce
qu'aucune protection ne surveille la tension.
Alors si vous voyez des tensions simples qui divergent nettement, ne cherchez pas ailleurs :
cherchez le neutre.
Un dernier point. Si le neutre n'est pas accessible, certains mesurent entre phase et terre. La
valeur est proche, et c'est souvent acceptable en dépannage. Mais ce n'est pas la même mesure —
alors ne confondez pas les deux dans un rapport.`,

  representer: `La tension simple se note V majuscule.
Et là, il y a une confusion d'écriture qu'il faut connaître. La lettre V désigne à la fois la
grandeur — la tension simple — et l'unité, le volt.
On écrit donc V un égale deux cent trente V. Le premier V est la grandeur, le second est l'unité.
C'est un peu maladroit, mais c'est la convention, et le contexte tranche toujours.
Un piège maintenant, sur les plaques de moteur, et il est sérieux.
Sur une plaque, deux tensions sont écrites — deux cent trente et quatre cents. On pourrait croire
que la petite est la tension simple du réseau.
Ce n'est pas ça. Ces deux valeurs disent ce que chaque bobinage du moteur doit recevoir, selon le
couplage. Deux cent trente en triangle, quatre cents en étoile.
C'est un autre sujet, et c'est la station six point quatre. Mais retenez dès maintenant qu'une
tension sur une plaque de moteur ne se lit pas comme une tension de réseau.
Enfin, une habitude de rédaction que je vous demande de prendre pour tous vos rapports.
Une tension se note toujours avec ses deux points. « Deux cent trente et un volts » ne veut rien
dire. « Deux cent trente et un volts entre L un et N » veut dire quelque chose.
Vous avez appris à la station un point deux qu'une tension est une différence. Écrivez-la comme
telle.`
};
