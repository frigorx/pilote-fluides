/* CartoClim 3.4 — textes POUR L'OREILLE, registre « professeur à l'épaule ».
   La voix explique, elle ne lit pas l'écran (00-charte/VOIX-ET-NARRATION.md).
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Sous la scène, regardez la première photo. Dehors, un seul boîtier, avec sa grille. Dedans, deux unités
murales, une par pièce. C'est un multisplit : une seule unité extérieure pour plusieurs unités intérieures.
Pourquoi faire comme ça ? Pour ne pas poser un boîtier dehors par pièce. Sur une façade ou un balcon,
la place est comptée, et trois boîtiers côte à côte, ce n'est ni joli ni commode.
En contrepartie, il faut tirer des tubes depuis le groupe jusqu'à chaque pièce. Moins de boîtiers
dehors, plus de tubes dedans. Retenez cette phrase : elle explique presque tout le reste.
La seconde photo montre des unités de plafond. Dans un multisplit, les unités intérieures n'ont pas
forcément la même forme : mural, console, cassette, gainable. C'est la station trois point trois.`,

  comprendre: `Ouvrons le dessin. Dehors, le groupe : un compresseur, un condenseur et son hélice. Dedans,
trois pièces, A, B et C. Chaque pièce a son unité, et chaque unité est reliée au groupe par ses deux
tubes, le petit pour le liquide, le gros pour le gaz. En mode froid, le petit porte en fait un mélange de liquide et
de vapeur, après le détendeur du groupe. Le groupe est unique : il n'y a qu'un compresseur,
et il sert tout le monde.
La pièce B demande du froid. Sa carte le dit au groupe, qui ouvre la branche de B, et seulement celle-là.
Le fluide ne va que vers cette pièce, et le compresseur tourne doucement, parce que la demande est
petite. C'est l'intérêt de l'Inverter : sa vitesse suit la demande. Station deux point quatre.
Maintenant, les trois pièces demandent. Les trois branches s'ouvrent, et le compresseur accélère.
Une pièce s'éteint. Attention : elle n'est pas débranchée. Son unité est arrêtée, mais ses tubes restent
raccordés au circuit.
Reste le fluide. Le groupe arrive chargé pour une certaine longueur de tubes, tous les tubes mis bout à
bout. Si vous en tirez davantage, c'est à vous d'ajouter du fluide, comme la notice l'indique.
Dernier cas, le plus traître : vous inversez les tubes de A et de B au groupe. La machine peut très bien
démarrer. Mais quand la pièce B demande du froid, le groupe ouvre sa branche B, et le fluide arrive dans
la pièce A. D'où les repères, aux deux bouts de chaque tube.
Appuyez sur Dérouler, et suivez ces cinq cas.`,

  manipuler: `À vous. Le multisplit du logement : cochez ce qu'il sait faire.
Climatiser plusieurs pièces avec un seul groupe : oui, c'est sa raison d'être. Fonctionner avec une seule
unité allumée : oui aussi. Les autres branches sont fermées, et le compresseur ralentit.
Mais chauffer une pièce pendant qu'on en refroidit une autre : non. Dans le groupe, le fluide ne circule
que dans un sens à la fois, imposé par une seule vanne quatre voies. C'est la station deux point six.
Toutes les pièces refroidissent, ou toutes chauffent. Et si deux pièces demandent le contraire, le groupe
en suit une seule, selon une règle que donne la notice.
Ensuite, le raccordement. Pour chaque pièce, deux tubes, un câble et un tuyau de condensats, et tout porte
le repère de la pièce. Le bon geste, c'est de repérer avant de monter, parce qu'une fois les tubes dans
le mur, on ne les retrouve plus.
Trois pièges pour finir. Inverser deux pièces au groupe. Dépasser la longueur totale ou le dénivelé permis :
cette limite est dans la notice, on ne la devine pas. Et oublier qu'une unité éteinte reste dans le
circuit : ses tubes comptent dans la charge, et si l'un d'eux fuit, tout le groupe se vide.`,

  representer: `Deux symboles. L'unité extérieure, avec son hélice et ses raccords, et l'unité intérieure murale.
Sur un schéma de multisplit, vous trouvez un seul symbole d'unité extérieure, et autant de symboles
intérieurs que de pièces.
Entre les deux, un trait par pièce : c'est le couple de tubes, avec son repère et sa longueur. Additionnez
les longueurs : vous obtenez la longueur totale, celle que la notice limite. Vérifiez aussi que le repère
du plan est le même que celui que vous posez sur les tubes : c'est ce qui évite l'inversion. Et cherchez
le tuyau de condensats de chaque unité. Retenez deux lettres : U I pour l'unité intérieure, U E pour
l'unité extérieure.`
};
