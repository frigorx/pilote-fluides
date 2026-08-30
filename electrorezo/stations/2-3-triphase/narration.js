/* ÉlectroRézo 2.3 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Nous passons de un à trois. Et je vais vous dire tout de suite pourquoi c'est intéressant, parce
que sinon ça peut sembler être une complication gratuite.
Le triphasé, ce sont trois tensions au lieu d'une. Même valeur, même fréquence. Ce qui les
distingue, c'est uniquement le moment où chacune passe par son maximum.
Elles sont décalées d'un tiers de tour.
Et ce décalage, qui a l'air d'un détail, permet deux choses que le monophasé ne sait pas faire :
transporter beaucoup plus de puissance dans le même câble, et faire démarrer un moteur tout
seul.`,

  comprendre: `Regardez les trois courbes.
Elles ont exactement la même allure et la même hauteur. Simplement, quand la première est à son
maximum, la deuxième est ailleurs, et la troisième encore ailleurs.
Le décalage est d'un tiers de période, ce qu'on appelle cent vingt degrés.
D'où vient-il ? De la construction de l'alternateur. À la centrale, il y a trois bobinages
disposés à cent vingt degrés l'un de l'autre autour du rotor. Quand le rotor tourne, il passe
devant l'un, puis devant le deuxième, puis devant le troisième.
Ce n'est donc pas un réglage. C'est de la mécanique.
Maintenant, appuyez sur le second bouton : la somme des trois.
Regardez bien la ligne rouge. Elle est plate, sur zéro, en permanence. À chaque instant, les
trois tensions s'annulent.
Prenez la mesure de ce que ça implique. Si les trois phases alimentent des charges identiques, le
courant qui revient par le neutre est nul lui aussi. Le neutre ne ramène rien.
C'est pour ça qu'on a le droit de lui donner une section plus faible qu'aux phases.
Attention quand même : ça ne vaut que si les charges sont équilibrées. Déséquilibrez-les — un
gros appareil sur une seule phase — et le neutre se met à ramener du courant. Un neutre sous-
dimensionné sur une installation déséquilibrée, ça chauffe.
Dernier point, et c'est le plus beau. Ce décalage entre les trois crée quelque chose de
remarquable dans un moteur : un champ magnétique qui tourne. Le rotor n'a plus qu'à le suivre.
Aucune pièce mobile, aucun dispositif de démarrage : le moteur part tout seul.
C'est la station six de cette ligne, et je vous la recommande.`,

  manipuler: `Pour la mesure, il y a une chose à savoir, et elle évite des erreurs coûteuses.
Sur une prise triphasée avec neutre, il y a quatre bornes. Donc six paires possibles. Donc six
mesures.
Et ces six mesures ne donnent que deux valeurs.
Les trois mesures entre deux phases donnent quatre cents volts. Les trois mesures entre une phase
et le neutre donnent deux cent trente volts.
Voilà. Six mesures, deux valeurs.
Maintenant, à quoi ça sert de les faire toutes les six ? À diagnostiquer.
Elles doivent être très proches les unes des autres. Quatre cents, quatre cent deux, trois cent
quatre-vingt-dix-huit : c'est normal.
Mais si l'une sort du lot — si une mesure vers le neutre donne cent cinquante alors que les deux
autres donnent deux cent trente — vous avez un conducteur coupé, ou un neutre mal raccordé. Et
vous l'avez trouvé en trois minutes.
Un avertissement pour finir. Sur la même prise, il y a deux cent trente et quatre cents volts,
selon les bornes que vous choisissez.
Se tromper de paire, c'est envoyer quatre cents volts dans un appareil qui en attend deux cent
trente. Repérez avant de brancher.`,

  representer: `Sur une plaque, le triphasé s'annonce par le signe trois vague. Et il y a deux façons de
l'écrire, selon qu'il y a un neutre ou non.
Trois vague : trois conducteurs, pas de neutre.
Trois N vague : quatre conducteurs, neutre distribué.
Les deux existent, et les deux sont normales. Une machine triphasée sans neutre, c'est le cas le
plus fréquent en atelier : un moteur n'a besoin que des trois phases.
Sur une notice, vous verrez souvent l'écriture quatre cents barre deux cent trente volts. L'ordre
est constant : d'abord la tension entre phases, ensuite celle vers le neutre.
Les repères des trois phases sont L un, L deux, L trois.
Mais je dois vous prévenir : sur du matériel ancien, vous trouverez R, S, T. C'est exactement la
même chose. Les anciennes lettres n'ont pas disparu des ateliers, et vous les rencontrerez sur
des armoires qui tournent encore très bien.
Enfin, sur un plan de puissance, le triphasé se reconnaît d'un coup d'œil : trois traits
verticaux qui descendent en parallèle.
C'est la signature de la ligne. Dès que vous ouvrez un dossier, vous savez en une seconde si vous
avez affaire à du monophasé ou à du triphasé.`
};
