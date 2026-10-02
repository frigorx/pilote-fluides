/* CartoClim 3.5 — textes POUR L'OREILLE, registre « professeur à l'épaule ».
   La voix explique, elle ne lit pas l'écran (00-charte/VOIX-ET-NARRATION.md).
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Regardez la première image. Un étage de bureaux, dessiné en perspective. Dans un coin, un seul
groupe extérieur. Sous le plafond, un réseau de tubes qui se ramifie. Et dans chaque pièce, une unité
intérieure.
C'est un D R V : débit de réfrigérant variable. Certains constructeurs disent V R V, ou V R F. C'est la
même famille. Dans un split, une unité extérieure sert une seule pièce. Ici, un seul groupe sert des dizaines
d'unités, avec un seul réseau de fluide. Ce qui circule dans le bâtiment, ce n'est ni de l'air ni de l'eau :
c'est le fluide frigorigène lui-même.
Sur la seconde photo, la batterie du groupe, de près. Elle est grande, parce qu'elle sert à tout
l'immeuble.
Vous le trouverez dans le tertiaire : bureaux, hôtels, commerces, le plus souvent en toiture. Et c'est
une installation qui se calcule et se met en service avec méthode. Nous verrons pourquoi.`,

  comprendre: `Suivons le fluide, du toit jusqu'aux pièces.
Le groupe, sur le toit, pousse le fluide dans une colonne qui descend dans l'immeuble. À chaque
étage, une dérivation partage ce fluide entre les unités. Le réseau a la forme d'un arbre.
Dans chaque pièce, il y a une unité intérieure, et surtout un détendeur électronique. C'est lui qui
fait le débit variable. Pièce très chaude : il s'ouvre en grand, beaucoup de fluide passe. Pièce déjà
fraîche : il se ferme presque. Chaque pièce a donc son propre débit, avec le même réseau.
Mais le groupe, lui, comment sait-il ce qu'il doit fournir ? Par le bus. C'est un câble de
communication qui relie chaque unité au groupe. Chaque unité y a son adresse. Elle annonce ce que sa
pièce demande, et le groupe additionne.
Quand la demande totale monte, le compresseur accélère. C'est un compresseur à vitesse variable,
comme dans un Inverter : le débit suit le besoin.
Reste la question du mode. Avec deux tubes, tout le réseau est dans le même mode : tout le monde en
froid, ou tout le monde en chaud. Le groupe inverse son cycle pour tous.
Avec la récupération d'énergie, c'est plus malin. Un boîtier de répartition, à l'entrée de chaque
zone, choisit entre le froid et le chaud. Le bureau nord réclame de la chaleur, la salle de réunion
réclame du froid : la chaleur retirée dans la salle de réunion sert à chauffer le bureau. L'immeuble
se partage son énergie.
Appuyez sur Dérouler, et suivez les six pas.`,

  manipuler: `À vous. Un D R V à récupération d'énergie, dans un immeuble de bureaux : que sait-il faire ?
Desservir beaucoup de pièces avec un seul réseau : oui. C'est sa raison d'être.
Chauffer une pièce et en refroidir une autre en même temps : oui, mais attention. Seulement avec la
récupération d'énergie. Avec deux tubes, tout le réseau est dans le même mode.
Se poser comme un split, sans étude : non. C'est l'erreur à ne pas commettre.
Pourquoi ? Sur un split, le constructeur charge l'appareil pour une longueur de tube. Ici, le réseau
est sur mesure : chaque tronçon a sa longueur et son diamètre. La charge supplémentaire se calcule
tronçon par tronçon, puis on la pèse à la balance. Elle ne se devine pas.
Au montage, trois soins. On brase sous azote, pour que l'intérieur des tubes ne s'oxyde pas. On pose
chaque joint Y dans le bon sens et le bon plan, comme le dit la notice : sinon le fluide se répartit
mal. Et à la fin, on adresse chaque unité sur le bus. Une unité mal adressée répond à la mauvaise
télécommande : le client règle son bureau, et c'est le bureau voisin qui change.`,

  representer: `Deux symboles. Le premier, le groupe extérieur : un grand boîtier, avec les raccords de son réseau.
Le second, le boîtier de répartition, dessiné en perspective. C'est lui qui choisit, pour sa zone, le
chaud ou le froid.
Sur un plan, le groupe est en toiture, les unités sont dans les pièces, et entre les deux courent les
tubes. Pour chaque tronçon, cherchez le diamètre et la longueur. Ils servent à calculer la charge de
fluide.
Cherchez aussi l'adresse de chaque unité. C'est elle qui relie le plan, l'unité posée au plafond, et sa
télécommande. Retenez enfin deux repères : U E pour le groupe extérieur, U I pour chaque unité
intérieure.`
};
