/* ÉlectroRézo 1.7 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Sur le flanc de chaque moteur, il y a un petit rectangle de métal riveté. On l'appelle la
plaque signalétique.
C'est la carte d'identité de la machine. Tout ce qu'il faut pour la brancher, pour la protéger et
pour la dépanner tient dessus.
Elle est souvent sale, parfois à moitié effacée, presque toujours à un endroit incommode. Et le
jour où elle a disparu, on perd des heures à retrouver ce qu'elle disait.
Alors apprenons à la lire, ligne par ligne.`,

  comprendre: `Regardez le dessin, et suivez avec moi.
Première ligne : deux tensions. Deux cent trente, et quatre cents. Avec, à côté de chacune, un
petit symbole de couplage.
Attention, ce n'est pas un choix libre. Ce n'est pas « ce moteur accepte tout entre deux cent
trente et quatre cents ». Ce sont deux valeurs précises, chacune correspondant à une façon de
poser les barrettes sur la plaque à bornes. Vous verrez ça en détail à la station six point
quatre.
Deuxième ligne : deux intensités. Six virgule soixante-cinq, et trois virgule quatre-vingt-quatre
ampères. Elles sont dans le même ordre que les tensions, et ce n'est pas un hasard : elles vont
par paires.
Retenez celle qui correspond à votre couplage. C'est le nombre le plus utile de toute la plaque.
Troisième ligne : la puissance. Un virgule cinq kilowatt.
Et voici le piège dont je vous ai parlé à la station quatre. Cette puissance-là, c'est ce que le
moteur rend sur son arbre. Pas ce qu'il absorbe. Pour rendre un virgule cinq, il absorbe environ
un virgule huit — la différence part en chaleur.
Quatrième ligne : la vitesse. Mille quatre cent trente-cinq tours par minute.
Vous vous attendiez peut-être à quinze cents, puisque c'est la valeur théorique à cinquante
hertz. Eh bien non, et ce n'est pas une erreur. Un moteur asynchrone ne tourne jamais tout à fait
à cette vitesse : il traîne un peu derrière. On appelle cet écart le glissement, et il est
nécessaire au fonctionnement.
Cinquième ligne : cos phi, zéro virgule quatre-vingts. C'est le facteur de puissance. Il dit
quelle part de ce qui est appelé au réseau travaille vraiment.
Et la dernière : cinquante hertz, et un indice IP. Le premier chiffre de l'IP dit la protection
contre les solides, le second contre l'eau. IP cinquante-cinq : protégé contre la poussière, et
contre les jets d'eau.`,

  manipuler: `Maintenant, une chose que beaucoup ne font pas, et qui change tout dans un dépannage.
Une plaque annonce. Une pince constate. Ce qui informe, c'est l'écart entre les deux.
Regardez le dessin. La plaque dit trois virgule quatre-vingt-quatre ampères. La pince mesure
quatre virgule neuf.
Un quart de plus que prévu. Quelque chose force.
Un roulement qui serre. Une pale de ventilateur qui frotte. Une charge trop lourde. Ou un
couplage qui n'est pas celui qu'il faudrait.
Et voici ce que je veux que vous mesuriez. Sans la plaque, ce quatre virgule neuf ne voulait rien
dire. C'était un nombre. C'est la comparaison qui en fait un diagnostic.
Sur un triphasé, mesurez toujours les trois phases. Elles doivent être très proches. Un écart
entre elles annonce un déséquilibre du réseau ou un enroulement qui commence à lâcher.
Et une règle absolue pour finir. Une plaque illisible ou absente n'autorise aucune supposition.
Sans elle, vous ne connaissez ni le couplage à faire, ni le réglage du thermique. On cherche la
documentation. Ou on ne branche pas.`,

  representer: `Cette station n'a pas d'unité nouvelle : elle rassemble toutes celles que vous venez
d'apprendre.
Ce que je veux vous laisser, c'est plutôt un ordre de gestes — quatre moments où on va lire la
plaque, et pas un autre document.
Avant de coupler : on lit les deux tensions, on les compare à celle du réseau, et on en déduit
étoile ou triangle.
Avant de régler un thermique : on lit l'intensité correspondant au couplage retenu, et on tourne
la molette dessus. Pas au jugé, pas au maximum.
Avant de tirer un câble : on part de cette même intensité. Jamais de la puissance — vous savez
maintenant pourquoi.
Et avant de commander une pièce : on relève la référence complète, et on photographie la plaque
entière.
Ce dernier conseil vaut plus qu'il n'en a l'air. Une plaque exposée à l'huile, à la poussière et
aux solvants devient illisible en quelques années. La photo que vous prenez aujourd'hui servira
peut-être à quelqu'un dans dix ans — et ce quelqu'un, ce sera peut-être vous.`
};
