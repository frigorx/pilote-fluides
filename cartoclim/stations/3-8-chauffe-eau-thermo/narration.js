/* CartoClim 3.8 — textes POUR L'OREILLE, registre « professeur à l'épaule ».
   La voix explique, elle ne lit pas l'écran (00-charte/VOIX-ET-NARRATION.md).
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Pas de photographie sur cet écran : nous n'en avons aucune sans marque visible. Deux symboles à la
place. Le premier, c'est un chauffe-eau électrique ordinaire : une cuve haute, deux raccords d'eau, et un
éclair, parce que la chaleur vient de l'électricité. Le second, c'est un ballon qu'un tube replié en zigzag
traverse : un échangeur, par où une autre source de chaleur entre dans l'eau.
Un chauffe-eau thermodynamique, c'est ce ballon, avec une petite pompe à chaleur posée dessus. C'est le même
cycle que la pompe à chaleur air-eau de la station trois point sept, mais tout dans un seul appareil, et pour
une seule chose : l'eau chaude du robinet. Il ne chauffe pas la maison.
On le pose dans la cave, le garage ou la buanderie, là où l'on n'a pas besoin de chaleur : l'appareil va
prendre celle de l'air. Au lycée, le banc de l'atelier en est un vrai, avec ses instruments de mesure.`,

  comprendre: `Suivons la chaleur, en partant du bas du dessin.
Un ventilateur aspire l'air de la pièce et le pousse à travers l'évaporateur, une batterie à ailettes. Le fluide
y est plus froid que l'air : il prend sa chaleur, il bout, il devient gaz. L'air ressort plus froid, et plus
sec, parce qu'une partie de son humidité se dépose en gouttes, comme sur un split.
Le compresseur comprime ce gaz. En sortie, il est plus chaud que l'eau du ballon : sans cela, il ne pourrait
pas la chauffer.
Il arrive au condenseur. Ici, pas d'échangeur à plaques : c'est un tube enroulé contre la paroi de la cuve, à
l'extérieur. Le gaz cède sa chaleur à travers la paroi, et redevient liquide. Le fluide ne touche jamais l'eau
que l'on boit : seule la chaleur traverse.
Le liquide passe le détendeur, il redevient froid, et il repart vers l'évaporateur. Le tour recommence.
Dans la cuve, l'eau chauffée, plus légère, monte et reste en haut. L'eau froide entre par le bas, et on puise
tout en haut. L'eau se range par couches : c'est ce qui vous donne une eau bien chaude au robinet, tant qu'il
reste de l'eau chaude.
Une précision : dans l'appareil réel, l'évaporateur est en haut, sous le capot. Nous l'avons gardé en bas, pour
que vous retrouviez la croix du frigoriste.
Passez ensuite aux trois états : la pompe à chaleur seule, avec l'appoint, et quand on puise.`,

  manipuler: `À vous. Le chauffe-eau thermodynamique de la cave : cochez ce qu'il sait faire.
Chauffer l'eau du robinet, oui, c'est son métier. Chauffer des radiateurs, non : son condenseur ne chauffe que
l'eau de la cuve. Pour des radiateurs, c'est la pompe à chaleur air-eau. Et rafraîchir la pièce où il est posé ?
Oui, il le fait, puisque l'air ressort plus froid et plus sec. Mais c'est un effet, pas un service : personne
n'achète un chauffe-eau pour rafraîchir sa cave.
Le raccordement, maintenant. L'eau froide entre en bas, l'eau chaude sort en haut, et on ne les inverse pas. Le
groupe de sécurité se met sur l'arrivée d'eau froide : quand l'eau chauffe, elle gonfle, et il laisse partir le
surplus par son tuyau d'écoulement, qui doit rejoindre une évacuation et ne se bouche jamais. Il y a aussi le
tuyau des condensats, l'air, et l'électricité. Et jamais de courant sur une cuve vide.
Le piège : poser l'appareil dans une pièce chauffée ou trop petite, ou lui donner une gaine d'air trop longue ou
écrasée. Il manque de chaleur à prendre, et la résistance prend le relais sans bruit. Le client, lui, le verra
sur sa facture.`,

  representer: `Il n'existe pas de symbole du chauffe-eau thermodynamique. On le lit en deux morceaux : un ballon, et
une pompe à chaleur.
Sur le premier symbole, le zigzag en bas du ballon, c'est la résistance, l'appoint. Sur le second, le tube
replié qui traverse le ballon, c'est un échangeur : l'endroit où la chaleur de la pompe à chaleur passe dans
l'eau. Dans l'appareil réel, ce tube est enroulé contre la paroi, à l'extérieur de la cuve, mais le principe
est le même.
Sur un schéma d'installation, suivez l'eau : l'arrivée d'eau froide, avec son groupe de sécurité et son
écoulement, le ballon, puis la sortie d'eau chaude, souvent avec un mitigeur thermostatique. Cherchez aussi le
tuyau des condensats, et la gaine d'air s'il y en a une. S'ils manquent sur le plan, ils manqueront sur le
chantier.`
};
