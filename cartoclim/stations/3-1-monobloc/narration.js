/* CartoClim 3.1 — textes POUR L'OREILLE, registre « professeur à l'épaule ».
   La voix explique, elle ne lit pas l'écran (00-charte/VOIX-ET-NARRATION.md).
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Sous la scène, regardez la première photo. Un climatiseur mobile, posé dans la pièce : un seul boîtier, et une grosse
gaine blanche qui monte vers la fenêtre.
Monobloc veut dire un seul bloc. Tout le circuit frigorifique est là-dedans, le compresseur, les deux batteries,
le détendeur. Pas d'unité dehors, pas de tubes de cuivre. On le branche, on passe la gaine par la fenêtre, et il marche.
Pourquoi cette gaine ? Retenez une idée, elle fait toute la station : un climatiseur ne fait pas disparaître la
chaleur, il la déplace. Dans un split, elle part par l'unité extérieure. Ici, il n'y en a pas : c'est la gaine qui
sort la chaleur.
Sur la seconde photo, un climatiseur de fenêtre : une moitié dans la pièce, l'autre dehors. Il existe enfin un
monobloc mural, avec deux trous dans le mur pour l'air. Nous les comparerons.`,

  comprendre: `Ouvrons le boîtier du mobile. Il contient deux courants d'air qui ne se mélangent jamais.
Le premier, c'est l'air de la pièce. Un ventilateur, placé après l'évaporateur, l'aspire à travers la batterie froide. Le fluide
y bout, il prend la chaleur de l'air, et l'air ressort plus frais : le ventilateur le souffle dans la pièce. C'est le premier pas.
Le second, c'est l'air du condenseur. Le fluide arrive chaud dans cette batterie : il faut un autre air pour le
refroidir. Cet air se réchauffe, et la gaine le pousse dehors, par la fenêtre. C'est le deuxième pas.
Voici le défaut du mobile. L'air qui part par la gaine, c'est de l'air de la pièce. La pièce en perd : elle manque
d'air, c'est une dépression. Alors l'air du dehors, chaud, rentre à la place, par la porte, les joints, la fenêtre
entrouverte. Le mobile refroidit donc un air qui revient sans cesse : voilà pourquoi il est moins efficace qu'un
split. C'est le troisième pas.
Quatrième pas, l'eau. Sur l'évaporateur froid, l'humidité de l'air se dépose et tombe dans le bac, qu'on vide, ou
qu'un petit tuyau évacue.
Appuyez sur Dérouler, puis regardez, plus bas, les trois monoblocs côte à côte.`,

  manipuler: `À vous. Le climatiseur mobile : cochez ce qu'il sait faire.
Refroidir sans unité extérieure : oui. Tout le circuit est dans son boîtier.
Se poser sans travaux : oui, pour le mobile. On le branche, on passe la gaine par la fenêtre. Pas de perçage, pas de
tubes, pas de fluide à charger. Un monobloc mural, lui, demande deux trous dans le mur.
Refroidir sans rejeter de chaleur : non. C'est l'erreur à ne pas faire. La chaleur prise dans la pièce ne disparaît
pas. Elle sort par la gaine. Sans la gaine, elle resterait dans la pièce, et la pièce ne refroidirait pas.
Ensuite, le raccordement. Il est court : une prise, une gaine, et le bac ou le tuyau des condensats. Mais chaque point
compte.
Trois pièges, qui font dire au client que son climatiseur ne marche pas. Une gaine trop longue ou pliée : l'air chaud
ne sort plus, le condenseur chauffe, et l'appareil ne refroidit plus. Une fenêtre laissée entrouverte pour passer la
gaine : l'air chaud du dehors rentre. Et un bac, ou un tuyau, oublié : l'eau déborde. Retenez : gaine courte et
droite, ouverture refermée autour d'elle, et on pense à l'eau.`,

  representer: `Ici, pas de symbole propre au monobloc dans la bibliothèque. On vous montre ceux du split, pour que vous voyiez ce
qu'il sépare : une unité intérieure, une unité extérieure. Le monobloc réunit les deux en un seul boîtier.
Sur un plan, c'est donc ce qui manque qui le désigne : pas d'unité extérieure, pas de liaison frigorifique. Cherchez
alors deux choses : le chemin de l'air chaud, gaine jusqu'à la fenêtre ou deux trous dans le mur, et l'évacuation des
condensats. Si l'un des deux n'est pas tracé, il manquera sur le chantier. Le dernier symbole est la pompe à
condensats, pour l'eau qui doit monter.`
};
