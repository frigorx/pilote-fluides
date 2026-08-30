/* ÉlectroRézo 1.4 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Voici deux mots que presque tout le monde emploie l'un pour l'autre, et qui ne veulent pas du
tout dire la même chose. La puissance, et l'énergie.
La puissance, c'est ce qu'un appareil demande à cet instant. L'énergie, c'est ce qu'il a fini par
consommer.
Et la confusion entre les deux n'est pas qu'une affaire de vocabulaire : elle vous fera choisir
le mauvais appareil, mal dimensionner une installation, et mal conseiller un client.`,

  comprendre: `Servez-vous des deux curseurs, c'est le plus parlant.
Le premier règle la puissance : ce que l'appareil demande. Le second règle la durée pendant
laquelle il fonctionne.
Regardez le bac se remplir. Ce qui s'accumule dedans, c'est l'énergie.
Maintenant, faites l'expérience que je vous propose, parce qu'elle est plus convaincante que
n'importe quelle formule.
Mettez deux mille watts pendant un quart d'heure. C'est un radiateur, un gros appareil, allumé un
petit moment. Regardez le résultat : un demi-kilowattheure.
Maintenant, cent watts pendant huit heures. C'est une veille, quelque chose de dérisoire, mais
qui reste allumé. Regardez : huit dixièmes de kilowattheure.
Le petit appareil a consommé plus que le gros. Nettement plus.
Voilà la leçon de cette station. Une puissance ne se paie pas. Ce qui se paie, c'est une
puissance multipliée par un temps.
Un mot maintenant sur quelque chose de plus subtil, mais que vous rencontrerez sur toutes les
plaques de moteur.
En courant alternatif, tout ce qui est appelé au réseau ne travaille pas. Une partie fait
vraiment tourner la machine : c'est la puissance active, en watts. Une autre partie fait
seulement des allers-retours entre le réseau et le moteur, sans rien produire.
Le réseau doit fournir les deux. Le rapport entre ce qui travaille et ce qui est appelé s'appelle
le facteur de puissance, et il est écrit sur la plaque sous la forme cos phi. Il vaut typiquement
zéro virgule huit.`,

  manipuler: `Pour la mesure, il faut deux appareils différents, parce que ce sont deux grandeurs
différentes.
Un wattmètre, ou un multimètre qui sait le faire, donne la puissance. Ce qui passe maintenant.
Coupez l'appareil, l'affichage tombe à zéro immédiatement.
Un compteur, lui, donne l'énergie. Et regardez bien la différence : un compteur ne redescend
jamais. Il additionne, depuis le jour où il a été posé.
Alors comment connaît-on une consommation ? Il n'y a qu'une méthode : on relève deux fois, et on
soustrait.
C'est comme un compteur kilométrique de voiture. Il ne vous dit pas la longueur de votre trajet.
Il vous donne un total. Vous notez avant de partir, vous notez en arrivant, et vous faites la
différence.
Et si vous n'avez pas de compteur ? Estimez. Multipliez la puissance par le nombre d'heures. Ça
ne sera pas exact, mais l'ordre de grandeur suffit presque toujours pour décider.`,

  representer: `La puissance s'écrit avec un P majuscule, et elle se mesure en watts, symbole W majuscule.
L'énergie s'écrit avec un E majuscule, et dans notre métier on la compte en kilowattheures. Un
kilowatt pendant une heure.
La relation entre les deux : l'énergie est la puissance multipliée par le temps. C'est tout.
Et maintenant, je veux vous prévenir d'un piège qui trompe beaucoup de gens sur une plaque de
moteur.
Quand une plaque annonce un virgule cinq kilowatts, ce n'est pas ce que le moteur consomme. C'est
ce qu'il rend, mécaniquement, sur son arbre.
Pour rendre un virgule cinq, il en absorbe environ un virgule huit. La différence part en
chaleur, dans les frottements et dans les pertes du bobinage. C'est ce qu'on appelle le
rendement.
Alors si vous dimensionnez un câble ou une protection à partir du chiffre de la plaque, vous
serez en dessous de la réalité. Il faut partir de l'intensité, qui est écrite juste à côté — et
elle, elle est bien celle qui est absorbée.
Sur une ampoule ou un radiateur, en revanche, la puissance écrite est bien celle qui est absorbée.
Il n'y a pas de rendement mécanique : tout part en lumière et en chaleur.
Deux plaques, deux façons de lire. C'est le genre de détail qui distingue quelqu'un qui a compris
de quelqu'un qui récite.`
};
