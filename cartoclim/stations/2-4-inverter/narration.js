/* CartoClim 2.4 — textes POUR L'OREILLE, registre « professeur à l'épaule ».
   La voix explique, elle ne lit pas l'écran (00-charte/VOIX-ET-NARRATION.md).
   Aucune valeur chiffrée. Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Voici l'unité extérieure d'un climatiseur, et le compresseur qu'elle contient. Sur beaucoup de
machines récentes, vous lirez un mot sur la façade : Inverter.
Ce mot ne désigne pas un autre compresseur. Il dit que le compresseur est commandé par une carte
électronique, et que cette carte règle sa vitesse.
Un compresseur classique n'a que deux états : à fond, ou arrêté. C'est un conducteur qui n'aurait que
l'accélérateur à fond et le frein. Avec l'Inverter, le conducteur peut tenir une allure douce.
Le client le remarque sans savoir pourquoi : sa machine ne s'arrête presque jamais, mais elle tourne
doucement. Ce n'est pas une panne, c'est le principe. Voyons comment il marche.`,

  comprendre: `Commençons par le problème. Un compresseur tout-ou-rien démarre à fond, la pièce refroidit vite, il
s'arrête, la pièce se réchauffe, il redémarre. Sur la courbe de gauche, la température fait des dents
de scie autour de la consigne. Et à chaque démarrage, le moteur donne un coup de collier, avec le bruit
qui va avec.
L'Inverter fait autre chose. Quand la pièce arrive à la bonne température, le compresseur ne
s'arrête pas : il ralentit, juste assez pour compenser ce que la pièce regagne en chaleur. La courbe
de droite devient presque plate.
Comment la carte s'y prend-elle ? Le réseau fournit un courant alternatif, dont la fréquence est fixe.
Or la vitesse d'un moteur suit la fréquence de son alimentation. Pour changer la vitesse, il faut donc
changer la fréquence.
La carte le fait en deux temps. D'abord le redresseur : il transforme l'alternatif en continu. Puis
l'onduleur : il découpe ce continu pour refabriquer un alternatif, mais cette fois à la fréquence que
la carte choisit. Le moteur du compresseur n'a plus qu'à suivre.
Et qui choisit la fréquence ? L'écart entre la consigne et la température que mesure la sonde. Grand
écart, fréquence haute : le compresseur accélère. Petit écart, fréquence basse : il ralentit. La pièce
arrive à la bonne température, l'écart fond, la vitesse descend.
Le résultat : moins de démarrages, une température stable, moins d'électricité, moins de bruit.
Appuyez sur Dérouler, et regardez la chaîne se mettre en marche.`,

  manipuler: `À vous. Cochez ce que sait faire un Inverter.
Adapter la puissance au besoin de la pièce : oui, c'est tout son métier. Se passer de carte
électronique : non. C'est la carte qui fabrique la fréquence variable, sans elle le compresseur n'aurait
qu'une vitesse. Et supprimer les démarrages : non plus. Il en reste, quand on coupe la machine, ou quand
la pièce n'a plus aucun besoin. Mais ils sont rares.
Pour le raccordement, presque rien de nouveau. La carte est dans l'unité extérieure, câblée à l'usine.
Vous raccordez l'alimentation et le câble entre les deux unités, comme sur n'importe quel split, en
suivant la notice.
Il y a surtout des pièges de mesure. Premier piège : l'intensité du compresseur change avec sa vitesse.
On ne la compare donc pas à une valeur fixe. Deuxième piège : la surchauffe se juge à régime
stabilisé, quand le compresseur ne change plus de vitesse. Troisième piège, le plus sérieux : en sortie
de carte, on ne mesure jamais sans savoir ce qu'on fait. Il y a là une tension continue élevée, et le
condensateur reste chargé un moment après la coupure.
Et si un Inverter tombe en panne, ne pensez pas d'abord au compresseur : c'est souvent la carte, ou
un capteur.`,

  representer: `Quatre symboles. L'unité extérieure, où vit la carte. Le compresseur. Et les deux étages de la
carte : le redresseur, qui passe de l'alternatif au continu, et l'onduleur, qui fait le chemin inverse.
Il n'existe pas de symbole propre à la carte Inverter d'un climatiseur. Sur un schéma électrique, on
la lit comme un convertisseur de fréquence : un redresseur, puis un onduleur, entre l'alimentation et
le moteur du compresseur. Ce schéma est détaillé aux stations sept point trois et sept point quatre
d'ÉlectroRézo.
Sur un schéma de climatisation, la carte est souvent un simple bloc. Cherchez ce qui arrive dessus : les
sondes. Ce sont elles qui lui disent ce que demande la pièce.`
};
