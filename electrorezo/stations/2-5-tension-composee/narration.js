/* ÉlectroRézo 2.5 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Nous restons sur le même réseau, mais on change de paire de bornes.
La tension composée, c'est celle qu'on mesure entre deux phases. Quatre cents volts en France.
Et il y a une question que tout le monde se pose en découvrant ce nombre, alors posons-la tout de
suite.
Si chaque phase est à deux cent trente volts par rapport au neutre, pourquoi entre deux phases
on ne trouve pas quatre cent soixante ?
La réponse est belle, et elle tient dans un dessin.`,

  comprendre: `Reprenez le dessin de l'étoile, celui de la station précédente. Trois branches partant d'un
centre.
Maintenant, appuyez sur le second bouton. Regardez ce qui apparaît : les extrémités des trois
branches sont reliées entre elles. Ça forme un triangle.
Un côté de ce triangle, c'est une tension composée.
Et vous voyez tout de suite qu'il est plus long que le rayon de l'étoile. Mais pas deux fois plus
long. Un peu moins.
Combien exactement ? Un virgule soixante-treize fois. C'est-à-dire racine de trois.
Alors deux cent trente fois un virgule soixante-treize, ça fait bien quatre cents. Le compte y
est.
Maintenant, pourquoi ce n'est pas le double — je veux que vous compreniez la raison physique, pas
seulement la géométrie.
Les deux tensions ne sont pas à leur maximum en même temps. Souvenez-vous : elles sont décalées
d'un tiers de tour.
Quand la première est à son sommet, la deuxième est déjà redescendue. Leur différence, à cet
instant, n'est donc pas la somme des deux maximums.
Si elles étaient en opposition parfaite — cent quatre-vingts degrés — là oui, on trouverait le
double. Mais elles sont à cent vingt degrés. D'où ce facteur intermédiaire.
Une dernière chose, pour montrer que ce n'est pas une particularité française.
L'ancien réseau français était en cent vingt-sept volts simple. Sa composée valait deux cent
vingt. Faites le calcul : cent vingt-sept fois un virgule soixante-treize, ça fait bien deux cent
vingt.
Le rapport est le même partout. Ce n'est pas une convention, c'est de la géométrie.`,

  manipuler: `Servez-vous de la réglette sous le dessin.
Posez deux cent trente : vous obtenez quatre cents. Posez cent vingt-sept : vous obtenez deux cent
vingt.
Le rapport ne change jamais.
Pour la mesure, c'est la plus fréquente en atelier. Une pointe sur chaque phase, et on lit.
C'est elle qui vous dit si le réseau de puissance est présent. Avant de chercher pourquoi un
moteur ne démarre pas, on mesure les trois composées.
Les trois doivent être proches. Quatre cents, trois cent quatre-vingt-dix-huit, quatre cent
deux : normal. Si l'une est nettement en dessous, vous avez un conducteur coupé ou une connexion
desserrée en amont — et vous le savez en une minute.
Et voici un contrôle que peu de gens font, et qui est très parlant. Divisez une composée par la
simple correspondante. Vous devez trouver un virgule soixante-treize.
Si vous trouvez autre chose, quelque chose ne va pas dans le réseau : neutre déplacé, phase
faible, connexion mauvaise.
Un avertissement pour finir, et il est sérieux. Quatre cents volts, ce n'est pas « un peu plus »
que deux cent trente.
C'est un domaine où l'arc s'amorce beaucoup plus facilement et où il ne s'éteint pas tout seul.
Votre appareil et vos cordons doivent être de catégorie adaptée. Un multimètre de bricolage n'a
rien à faire dans une armoire en quatre cents volts.`,

  representer: `La tension composée se note U majuscule. La simple se note V majuscule.
Deux lettres différentes, pour deux grandeurs différentes. Ne les mélangez pas dans un calcul :
c'est l'erreur la plus fréquente sur un exercice de triphasé.
Sur un plan, c'est la composée qui est écrite. Quatre cents volts. La simple, on la déduit.
Sur une notice, l'écriture quatre cents barre deux cent trente donne d'abord la composée.
Et maintenant, le piège des plaques de moteur, que je vous ai annoncé à la station précédente.
Sur une plaque, il y a aussi deux tensions. Mais ce ne sont ni la simple ni la composée du
réseau.
Ce sont deux valeurs qui disent ce que chaque bobinage du moteur doit recevoir, selon la façon
dont on pose les barrettes. Deux cent trente si on couple en triangle, quatre cents si on couple
en étoile.
C'est un autre sujet. C'est la station six point quatre, et je vous invite vraiment à y aller :
c'est le grand carrefour de ce réseau.
Un dernier mot sur ce fameux racine de trois. Vous allez le retrouver partout en triphasé : dans
les tensions, dans les courants, dans le calcul des puissances.
Et à chaque fois, il aura la même origine : ce décalage de cent vingt degrés que vous venez de
voir. Une seule cause, beaucoup de conséquences.`
};
