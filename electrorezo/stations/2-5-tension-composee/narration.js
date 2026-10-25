/* ÉlectroRézo 2.5 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Les MP3 sont refaits en Piper à chaque changement de texte. */
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
Alors deux cent trente fois un virgule soixante-treize, ça fait environ quatre cents : trois cent
quatre-vingt-dix-huit, pour être précis. Le compte y est.
Maintenant, pourquoi ce n'est pas le double — je veux que vous compreniez la raison physique, pas
seulement la géométrie.
La tension composée est une différence : on prend une tension, on retire l'autre.
Si elles étaient en opposition parfaite — cent quatre-vingts degrés — quand l'une serait à son
maximum, l'autre serait à son minimum, et leur différence ferait le double.
Mais souvenez-vous : elles sont décalées d'un tiers de tour, cent vingt degrés seulement. Quand
l'une est à son maximum, l'autre n'est pas à son minimum. D'où ce facteur intermédiaire.
Une dernière chose, pour montrer que ce n'est pas une particularité française.
L'ancien réseau français était en cent vingt-sept volts simple. Sa composée valait deux cent
vingt. Faites le calcul : cent vingt-sept fois un virgule soixante-treize, ça fait bien deux cent
vingt.
Le rapport est le même sur tout réseau triphasé équilibré. Ce n'est pas une convention, c'est de la
géométrie.`,

  manipuler: `Servez-vous de la réglette sous le dessin.
Posez deux cent trente : vous obtenez trois cent quatre-vingt-dix-huit, soit environ quatre cents.
Posez cent vingt-sept : vous obtenez deux cent vingt.
Le rapport reste le même.
Pour la mesure, c'est la plus fréquente en atelier. Une pointe sur chaque phase, et on lit.
C'est elle qui vous dit si le réseau de puissance est présent. Avant de chercher pourquoi un
moteur ne démarre pas, on mesure les trois composées.
Les trois doivent être proches. Quatre cents, trois cent quatre-vingt-dix-huit, quatre cent
deux : normal. Si l'une est nettement en dessous, vous avez un conducteur coupé ou une connexion
desserrée en amont — et vous le savez en une minute.
Et voici un contrôle que peu de gens font, et qui est très parlant. Divisez une composée par la
simple correspondante. Par exemple, trois cent quatre-vingt-dix-huit divisé par deux cent trente :
un virgule soixante-treize. Vous devez trouver environ un virgule sept, un peu plus ou un peu
moins. Si vous trouvez nettement autre chose, quelque chose ne va pas dans le réseau : neutre
déplacé, phase faible, connexion mauvaise.
Un avertissement pour finir, et il est sérieux. Quatre cents volts, ce n'est pas « un peu plus »
que deux cent trente.
C'est un domaine où l'arc s'amorce beaucoup plus facilement et où il peut ne pas s'éteindre tout seul.
Votre appareil et vos cordons doivent être au moins de catégorie trois, six cents volts. Un
multimètre de bricolage n'a rien à faire dans une armoire en quatre cents volts.`,

  representer: `La tension composée se note U majuscule. La simple se note V majuscule.
Deux lettres différentes, pour deux grandeurs différentes. Ne les mélangez pas dans un calcul :
c'est l'erreur la plus fréquente sur un exercice de triphasé.
Sur un plan, c'est la composée qui est écrite. Quatre cents volts. La simple, on la déduit. Et on
mesure la composée avec un voltmètre branché entre deux phases : les symboles sont sous vos yeux.
Pour un réseau, ou sur une notice d'installation, vous lirez deux cent trente barre quatre cents :
la simple d'abord, puis la composée. Certains constructeurs écrivent quatre cents barre deux cent
trente.
Et maintenant, le piège des plaques de moteur, que je vous ai annoncé à la station précédente.
Sur une plaque, il y a aussi deux tensions. Ce sont des tensions composées du réseau, celles que
le moteur accepte, selon la façon dont on pose les barrettes : deux cent trente si on couple en
triangle, quatre cents si on couple en étoile. Dans les deux cas, chaque bobinage reçoit deux
cent trente volts.
C'est un autre sujet. C'est la station six point quatre, et je vous invite vraiment à y aller :
c'est le grand carrefour de ce réseau.
Un dernier mot sur ce fameux racine de trois. Vous allez le retrouver partout en triphasé : dans
les tensions, dans les courants, dans le calcul des puissances.
Et à chaque fois, il aura la même origine : ce décalage de cent vingt degrés que vous venez de
voir. Une seule cause, beaucoup de conséquences.`
};
