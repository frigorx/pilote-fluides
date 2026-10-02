/* CartoClim 3.7 — textes POUR L'OREILLE, registre « professeur à l'épaule ».
   La voix explique, elle ne lit pas l'écran (00-charte/VOIX-ET-NARRATION.md).
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Regardez la première photo. Un grand boîtier, une grille, un ventilateur au-dessus : c'est de la
famille de l'unité extérieure d'un split, et c'est normal, le principe est le même. Elle prend la
chaleur de l'air du dehors, même quand il fait froid.
La différence, la photo ne la montre pas. Ce qui sort de cette machine, ce n'est pas de l'air chaud,
c'est de l'eau chaude. Cette eau part vers des radiateurs, vers un plancher chauffant, ou vers un
ballon d'eau chaude.
L'autre moitié, celle de l'eau, vous la verrez dans le local technique : le module hydraulique, avec son
circulateur qui pousse l'eau, un vase d'expansion qui absorbe la dilatation, souvent un ballon tampon, et
de la tuyauterie. C'est une chaufferie, et HydroMétro la détaille mieux que nous.
Gardez une question en tête pour la suite : où la machine est-elle coupée ? Tout dehors, d'un seul
bloc, c'est un monobloc, et c'est de l'eau qui traverse le mur. Coupée en deux, c'est un bibloc,
comme un split, et ce sont deux tubes de fluide qui traversent le mur. Ça change la pose, et ça
change le risque de gel.`,

  comprendre: `Suivons la chaleur, en partant du bas du dessin.
Dehors, l'évaporateur est une batterie que le ventilateur balaie avec l'air extérieur. Le fluide y est
plus froid que l'air, même un jour de gel. Alors la chaleur passe de l'air vers le fluide, qui bout et
devient un gaz. Un air déjà froid contient encore de la chaleur à prendre.
Le compresseur aspire ce gaz et le comprime. En se comprimant, il s'échauffe : en sortie, il est bien
plus chaud que l'eau qu'on veut chauffer. C'est tout le secret. Pour chauffer de l'eau, le fluide doit
être plus chaud qu'elle.
Ce gaz chaud arrive au condenseur. Ici, c'est un échangeur à plaques : des plaques de métal minces, le
fluide d'un côté, l'eau de l'autre. Rien ne se mélange, seule la chaleur passe. Le fluide redevient
liquide, et l'eau s'échauffe.
Le circulateur pousse cette eau chaude vers l'émetteur, plancher ou radiateur. Elle rend sa chaleur à
la maison, revient tiède, et repart. Pendant ce temps, le liquide passe le détendeur : sa pression
tombe, il redevient froid, et il repart vers l'évaporateur.
L'hiver, il y a un événement : le givre. Par temps froid et humide, l'évaporateur se couvre de glace,
et l'air ne passe plus. La machine inverse alors son cycle pendant quelques minutes, pour faire fondre
la glace. Où prend-elle la chaleur ? Sur l'eau du chauffage. Ce n'est pas une panne.
Passez maintenant au dessin du dessous, et choisissez une famille. Plus l'eau demandée est chaude,
plus la machine doit monter la chaleur haut, et moins elle est efficace. Un plancher, c'est une eau
tiède : la machine est à l'aise. D'anciens radiateurs en fonte, prévus pour une chaudière, demandent
une eau très chaude : la machine force, et l'appoint électrique prend plus souvent le relais.`,

  manipuler: `À vous. Une pompe à chaleur air/eau, avec son ballon d'eau chaude : cochez ce qu'elle sait faire.
Chauffer des radiateurs, oui, c'est son métier. Produire l'eau chaude du robinet, oui aussi, à condition
d'avoir un ballon : un serpentin dans le ballon prend la chaleur de l'eau de la machine, et une
résistance électrique complète si besoin. Mais chauffer une eau très chaude aussi facilement qu'une
eau tiède, non. Plus l'eau demandée est chaude, plus la machine force, surtout par grand froid. Et
pendant ce temps, l'appoint électrique tourne sans bruit : le client ne le voit pas, sa facture, si.
Le raccordement, maintenant. Côté fluide, sur un bibloc, deux liaisons en cuivre, comme pour un split,
avec tirage au vide. Côté eau, un départ et un retour bien isolés, avec leurs vannes, le vase
d'expansion, le circulateur, et souvent un ballon tampon.
Deux pièges pour finir. Le monobloc : son eau passe dehors. Une coupure de courant par grand froid,
et elle gèle dans les tuyaux, qui éclatent. D'où l'antigel dans le circuit, et des tuyaux isolés. Et le
volume tampon, qu'on oublie : sans lui, la machine démarre et s'arrête toutes les quelques minutes, et
le compresseur n'aime pas ça.`,

  representer: `Deux symboles. L'unité extérieure, avec son hélice, celle que vous connaissez du split. Et
l'unité intérieure air/eau, un boîtier haut avec ses raccords en bas : c'est le module hydraulique.
Sur un plan, l'unité extérieure est sur la façade ou au sol, et le module dans le local technique,
près du ballon tampon. Regardez ce qui traverse le mur. Deux liaisons frigorifiques, cotées en
longueur : c'est un bibloc. Deux tuyaux d'eau, isolés : c'est un monobloc.
Cherchez aussi pour quel émetteur l'eau est prévue : plancher, radiateurs adaptés, anciens radiateurs.
C'est ce choix qui décide si la machine sera à l'aise ou non.`
};
