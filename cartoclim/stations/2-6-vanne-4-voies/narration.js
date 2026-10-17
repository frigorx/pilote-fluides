/* CartoClim 2.6 — textes POUR L'OREILLE, registre « professeur à l'épaule ».
   La voix explique, elle ne lit pas l'écran (00-charte/VOIX-ET-NARRATION.md).
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Deux unités extérieures. Une petite, fixée au mur d'une maison, et une grosse, posée au sol
au pied d'un bâtiment. Quand la machine est réversible, c'est-à-dire quand elle refroidit l'été et
chauffe l'hiver, il y a dans chacune d'elles une pièce de cuivre que vous ne voyez pas : la vanne
quatre voies.
Son métier tient en une phrase. Le compresseur ne tourne jamais qu'à l'endroit. La vanne ne le retourne
pas : elle change la route du fluide. Selon sa position, la batterie du dehors travaille en condenseur,
ou en évaporateur. Celle du dedans fait exactement l'inverse.
Vous la rencontrerez en dépannage, parce qu'une machine qui ne chauffe plus, ou qui ne refroidit plus,
c'est souvent elle. Et à la pose, parce qu'elle n'aime pas la flamme du chalumeau. Nous y reviendrons.`,

  comprendre: `Ouvrons la vanne. C'est un tube de cuivre, fermé aux deux bouts. D'un côté, un seul tube : c'est
le refoulement du compresseur, donc de la haute pression. De l'autre, trois tubes côte à côte. Celui du
milieu est l'aspiration, le retour vers le compresseur, en basse pression. Les deux autres vont aux
échangeurs, l'un dehors, l'autre dedans.
À l'intérieur glisse une pièce, le tiroir. Elle porte une cuvette, un petit pont qui relie le tube du
milieu à l'un de ses deux voisins. Le tube resté libre débouche dans le corps de la vanne, rempli de
haute pression. Voilà les deux trajets : le refoulement part vers un échangeur, et l'autre échangeur
est relié à l'aspiration.
Comment fait-on glisser le tiroir ? Pas avec un moteur. Avec la pression. À chaque bout du tiroir, un
piston, percé d'un tout petit trou : la haute pression s'y faufile et remplit les deux bouts. Dessus, une
petite vanne pilote, commandée par une bobine, relie l'un des deux bouts à l'aspiration. Ce bout se
vide, sa pression tombe. De l'autre côté, la haute pression pousse, et elle gagne. Le tiroir glisse vers
la basse pression, emporte sa cuvette, et les deux échangeurs échangent leur rôle.
Appuyez sur Dérouler et suivez les cinq pas. Regardez surtout à droite : le compresseur ne change jamais
de sens. Ce sont les deux batteries qui changent de métier.`,

  manipuler: `À vous. La vanne quatre voies d'un split réversible : qu'est-ce qu'elle sait faire ?
Inverser le rôle des deux échangeurs, oui, c'est son seul métier. Inverser le sens du compresseur,
non : il tourne toujours dans le même sens, la vanne n'y touche pas. Changer la puissance, non plus :
la puissance, c'est l'affaire du compresseur. La vanne se contente d'aiguiller le fluide.
Au raccordement, quatre tubes de cuivre sont brasés, et deux fils vont à la bobine. Le tube du milieu,
c'est toujours l'aspiration. Si vous croisez les deux tubes des échangeurs, la machine fera du froid
quand on lui demande du chaud.
Le piège, maintenant. Le tiroir ne bascule que si le compresseur tourne : il lui faut l'écart entre la
haute et la basse pression. Machine arrêtée, vous alimentez la bobine, vous entendez un clic, et rien ne
bouge. Autre cas : un tiroir coincé à mi-course. Les deux échangeurs sont tièdes, et la machine ne fait ni
froid ni chaud.
Et une règle d'atelier : on ne brase jamais une vanne quatre voies sans la protéger de la chaleur. Le
tiroir ne la supporte pas.`,

  representer: `Sur le schéma, la vanne quatre voies se repère à sa position, tout près du compresseur, et aux quatre liaisons qui en partent. Pour la comprendre, suivez le refoulement : selon le mode, il ne part pas vers le même échangeur, et c'est tout le principe de l'inversion. Attention à un piège de lecture : un schéma ne montre la vanne que dans une seule position, celle qu'indique la légende. L'autre mode, il faut le reconstruire en croisant les échangeurs. La partie électrique se lit ailleurs, sur le schéma électrique : la bobine y apparaît comme une sortie de la carte, souvent repérée V, quatre, V. Ce réflexe vous servira à chaque dépannage en mode chaud.`
};
