/* ÉlectroRézo 6.3 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Voici le moteur de l'atelier. Celui qui entraîne les pompes, les compresseurs, les ventilateurs
et les convoyeurs.
De très loin le plus répandu dans l'industrie. Et c'est celui que vous dépannerez le plus
souvent.
Il a trois qualités qui expliquent sa domination : il est robuste, il n'est pas cher, et il
démarre tout seul.
Cette troisième qualité vient directement de la station deux point six. Si vous ne l'avez pas
faite, allez-y : sans le champ tournant, ce moteur reste un mystère.`,

  comprendre: `Regardez la première photo, celle du moteur ouvert. Cinq pièces sont numérotées, et je vais les
prendre dans l'ordre.
Numéro un, le stator. La partie fixe. Il porte les trois bobinages disposés à cent vingt degrés,
ceux qui créent le champ tournant.
Numéro deux, le rotor à cage d'écureuil. Et je veux que vous vous arrêtiez sur celui-là, parce
qu'il est étonnant.
Regardez le petit schéma à droite sur la photo. Des barres de métal, deux anneaux qui les
relient aux extrémités, et des tôles ferromagnétiques autour. Ça ressemble vraiment à une cage à
écureuil, d'où le nom.
Et voici ce qui est remarquable : ce rotor n'est relié à rien. Aucun fil, aucun balai, aucune
bague. Rien ne sort de lui.
Comment tourne-t-il, alors ? Le champ tournant du stator le traverse. Comme ce champ varie du
point de vue du rotor, il fait naître des courants dans les barres — c'est la même induction que
dans le transformateur. Et ces courants, à leur tour, créent un champ qui se fait entraîner.
Prenez la mesure de ce que ça veut dire pour vous, sur le terrain. Il n'y a rien à entretenir
dans un rotor à cage. Pas de balais à changer, pas de collecteur à surfacer. C'est un bloc de
métal.
Numéro trois, la boîte à bornes. C'est là que vous poserez les barrettes — station six point
quatre.
Numéro quatre, l'arbre. Numéro cinq, le ventilateur, calé en bout d'arbre.
Maintenant, servez-vous du curseur, parce qu'il montre la seule notion vraiment délicate de cette
station : le glissement.
À vide, le rotor tourne presque à la vitesse du champ. Chargez-le : il ralentit un peu, et
l'intensité monte.
Pourquoi ne rattrape-t-il jamais le champ ? Parce que s'il y arrivait, le champ ne varierait plus
de son point de vue. Plus de variation, plus de courant induit, plus de couple. Il ralentirait
aussitôt.
Le glissement n'est donc pas un défaut. C'est la condition du fonctionnement.
Poussez le curseur au-delà de cent pour cent : l'intensité dépasse ce que la plaque annonce. Et
c'est exactement ce que le relais thermique de la station quatre point sept surveille.`,

  manipuler: `Les trois questions.
Et regardez le tableau ensuite : vous verrez que ce moteur partage sa réponse avec le monophasé,
mais pas avec le moteur à courant continu.`,

  representer: `Sur un plan, c'est le rond marqué M que vous connaissez depuis la station huit point huit, avec
trois traits qui arrivent.
À côté, le signe trois vague confirme le triphasé. Et les repères des bornes sont écrits : U un,
V un, W un.
Il est toujours tout en bas du schéma de puissance. C'est le terminus : tout converge vers lui.
C'est d'ailleurs par là qu'on commence quand on découvre un dossier — vous vous en souvenez, la
station cinq point neuf.
Un détail à repérer. Si le symbole montre six bornes au lieu de trois, cela veut dire que la
plaque à bornes est accessible et que le couplage est à faire. C'est le cas général en atelier.
Un dernier mot sur le démarrage, parce qu'il a des conséquences sur tout le reste de
l'installation.
Un moteur asynchrone appelle cinq à huit fois son intensité nominale pendant les premières
secondes. Ce n'est pas un défaut : c'est ce qu'il faut pour lancer une masse à l'arrêt.
Mais c'est ce qui oblige à choisir un fusible aM plutôt qu'un gG. Et une courbe D plutôt qu'une
courbe C.
Vous voyez que tout se tient : ce que vous avez appris à la ligne quatre trouve ici sa raison
d'être.`
};
