/* ÉlectroRézo 6.2 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Voici probablement la machine la plus répandue au monde, et celle qu'on remarque le moins.
Un transformateur change une tension. Vous entrez deux cent trente volts, vous sortez vingt-quatre.
Ou l'inverse.
Sans aucune pièce mobile. Sans usure. Et — c'est le point remarquable — sans qu'aucun fil ne
relie l'entrée à la sortie.
Il y en a un dans la rue, à cinquante mètres de chez vous. Il y en a un dans presque chaque
armoire de commande. Il y en a un dans chaque chargeur de téléphone.`,

  comprendre: `Regardez le schéma de la première image, il dit presque tout.
Un cadre de fer. Un bobinage d'un côté, qu'on appelle le primaire. Un autre bobinage de l'autre
côté, le secondaire.
Et entre les deux : rien. Pas de fil, pas de contact. Ils sont séparés.
Alors comment l'énergie passe-t-elle ?
Vous alimentez le primaire en alternatif. Il crée dans le fer un champ magnétique qui varie
sans arrêt, cinquante fois par seconde.
Ce champ traverse le secondaire. Et un champ qui varie à travers un bobinage y fait naître une
tension. C'est ce qu'on appelle l'induction.
Voilà pourquoi il faut de l'alternatif. Je veux insister là-dessus, parce que c'est le point que
tout le monde oublie.
Ce n'est pas le champ qui fait naître la tension : c'est sa variation.
En courant continu, le champ s'installe et reste fixe. Au premier instant il varie, donc il se
passe quelque chose. Puis plus rien. Le secondaire ne sort plus une seule tension, et le
primaire, qui n'est plus freiné que par sa résistance, se met à chauffer jusqu'à brûler.
Un transformateur alimenté en continu, ce n'est pas un transformateur qui marche mal. C'est un
transformateur qu'on détruit.
Maintenant, servez-vous du curseur.
Il règle le nombre de spires du secondaire. Regardez la tension de sortie le suivre.
Cent spires : vingt-trois volts. Deux mille spires : quatre cent soixante volts, il élève.
La tension de sortie est à la tension d'entrée ce que le nombre de spires du secondaire est à
celui du primaire. C'est tout le transformateur en une phrase.
Et maintenant, regardez le petit cadre au centre pendant que vous manœuvrez : la puissance.
Elle ne bouge pas d'un watt.
Ce que ça veut dire, c'est que si la tension descend, le courant monte dans le même rapport. Un
transformateur ne fabrique pas de puissance : il l'échange.`,

  manipuler: `Les trois questions de la ligne six, et le transformateur est le seul appareil à y répondre de
cette façon.
Prenez le temps de la troisième. Une bobine et un transformateur sont faits du même cuivre autour
du même fer — et pourtant l'un fonctionne en continu, l'autre pas.`,

  representer: `Sur un plan, le symbole du transformateur est simple et très parlant.
Deux cercles qui se recouvrent partiellement. Chacun figure un bobinage.
Et regardez bien : aucun trait ne les relie. Ce vide entre les deux cercles, ce n'est pas un
oubli du dessinateur — c'est l'information. Il n'y a pas de liaison électrique entre l'entrée et
la sortie.
Cette absence de liaison, c'est ce qui fait qu'on peut toucher un secondaire vingt-quatre volts
sans risque, alors que le primaire est en deux cent trente.
Sur certains modèles, vous verrez un trait entre les deux cercles. C'est un écran de séparation,
un blindage. Il ne change pas le principe : il améliore l'isolement.
Les tensions sont écrites de part et d'autre. Et attention : c'est le sens du plan qui dit lequel
est le primaire. Un transformateur peut souvent fonctionner dans les deux sens, mais il n'a pas
été conçu pour.
Un dernier avertissement, pratique et important. Ne dimensionnez jamais le câble du secondaire
sur l'intensité du primaire.
Un transformateur deux cent trente vers vingt-quatre volts qui appelle un ampère au primaire
débite presque dix ampères au secondaire. Le câble de sortie est bien plus gros que celui
d'entrée. Ça surprend la première fois, et c'est logique.`
};
