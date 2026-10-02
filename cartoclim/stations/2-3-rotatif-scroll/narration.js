/* CartoClim 2.3 — textes POUR L'OREILLE, registre « professeur à l'épaule ».
   La voix explique, elle ne lit pas l'écran (00-charte/VOIX-ET-NARRATION.md).
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Regardez la première image. Ce petit cylindre noir, c'est un compresseur rotatif, celui que l'on
trouve le plus souvent dans les petits splits. Ce que vous voyez, c'est sa coque, soudée : le moteur et tout
le mécanisme sont enfermés dedans. Deux tubes seulement, un pour le gaz qui arrive, un pour le gaz qui
repart. Et la petite bouteille posée à côté retient le liquide qui n'aurait pas fini de s'évaporer, parce que
ce compresseur n'aime pas le liquide. Nous y reviendrons.
Sur la seconde image, un compresseur scroll, ouvert en coupe. Même idée : une coque ronde, le moteur, et les
deux spirales qui font le travail. Le scroll équipe les splits de forte puissance, les DRV, les roof-top et
les pompes à chaleur.
Un point à garder en tête : un compresseur ne fabrique pas le froid. Il met le fluide en mouvement, et en
pression. Sans lui, rien ne circule. Et ni l'un ni l'autre n'a de piston qui monte et descend : voyons
comment ils font.`,

  comprendre: `Ouvrons les deux compresseurs, en commençant par le scroll : son mouvement est le plus facile à suivre.
Deux spirales emboîtées. L'une est fixe. L'autre, la spirale mobile, ne tourne pas sur elle-même : elle
orbite. Son centre décrit un petit cercle, comme un plateau que l'on ferait glisser en rond sur une table,
sans le faire pivoter.
Entre les deux spirales, il y a des poches de gaz. Suivez-en une. Sur le pourtour, elle s'ouvre : le gaz
froid, à basse pression, y entre. Un peu plus loin, les deux spirales se rejoignent, et la poche se ferme :
le gaz est prisonnier. Le mouvement orbital la pousse alors vers le centre, et elle rétrécit. Plus elle est
petite, plus le gaz est serré, donc plus la pression monte, et plus il chauffe. Arrivée au centre, elle
s'ouvre sur le refoulement, et le gaz chaud part vers le condenseur, sans à-coup.
Passons au rotatif. Un rouleau est monté sur un arbre excentré : en tournant, il roule le long de la paroi
du cylindre. Une palette, poussée par un ressort, reste appuyée sur lui et coupe l'espace en deux. Derrière
le rouleau, la place grandit : le gaz entre. Devant lui, elle rétrécit : le gaz est comprimé. Quand la
pression est assez haute, un clapet s'ouvre et le gaz sort.
Dans les deux cas, la coque est fermée, et de l'huile, au fond, lubrifie les pièces. Elle voyage un peu avec
le gaz, et doit revenir au carter. Appuyez sur Dérouler, et suivez la poche.`,

  manipuler: `À vous. Un compresseur de climatiseur, rotatif ou scroll : cochez ce qu'il sait faire.
Comprimer un gaz, oui, c'est son seul métier. Il aspire le gaz froid qui sort de l'évaporateur, et le refoule
chaud, sous haute pression, vers le condenseur.
Aspirer du liquide, non, et c'est l'erreur qui coûte le plus cher. Un gaz se laisse écraser, un liquide non :
il garde son volume. Si du liquide arrive à l'aspiration, les pièces encaissent le choc et cassent. On
appelle cela un coup de liquide, et le scroll y est particulièrement sensible.
Changer de vitesse tout seul, non plus. Un compresseur ne décide rien : c'est la commande de l'appareil qui
le fait varier, grâce à l'Inverter. Nous le verrons à la station deux point quatre.
Ensuite, le raccordement : deux tubes, l'aspiration et le refoulement, que l'on n'intervertit pas ;
l'alimentation électrique avec ses protections ; et surtout l'huile, qui doit revenir au carter.
Deux pièges pour finir. Le coup de liquide se prévient en surveillant la surchauffe : c'est la station cinq
point quatre. Et un compresseur chaud au toucher n'est pas forcément en défaut : il refoule un gaz chaud,
c'est normal. On ne conclut pas avec la main : on mesure, et on compare à la fiche du constructeur.`,

  representer: `Deux symboles, pour les deux compresseurs. Le cercle traversé de deux traits obliques, c'est le
compresseur, le même pour toutes les technologies. C'est le petit dessin à l'intérieur qui dit laquelle : un
petit rond pour le rotatif, une spirale pour le scroll.
Sur un schéma frigorifique, cherchez-le entre les deux échangeurs. Le gaz arrive de l'évaporateur à
l'aspiration, et repart chaud vers le condenseur au refoulement.
Sur le compresseur lui-même, regardez la plaque. Elle donne ses caractéristiques, et c'est à elle que l'on se
réfère, jamais à un chiffre appris par cœur. La prochaine fois que vous verrez une coque noire dans une unité
extérieure, vous saurez ce qui tourne dedans.`
};
