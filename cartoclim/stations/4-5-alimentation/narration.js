/* CartoClim 4.5 — textes POUR L'OREILLE, registre « professeur à l'épaule ».
   La voix explique, elle ne lit pas l'écran (00-charte/VOIX-ET-NARRATION.md).
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Sous la scène, regardez la première photo. Une unité extérieure, fixée au mur d'un bâtiment. Sur cette photo,
le chantier est déjà avancé : on voit les appareils de mise en service. Mais avant d'en arriver là, il a
fallu lui amener le courant, et la relier à l'unité intérieure, de l'autre côté du mur.
C'est tout l'objet de cette station. Un split ne démarre que si ses deux unités sont alimentées, et
qu'elles se parlent. Le plus souvent, le courant arrive à l'unité extérieure, et c'est elle qui alimente
l'unité intérieure, par un câble qui les relie. Mais pas toujours : le sens change selon le constructeur,
et c'est le schéma de la notice qui commande.
La seconde photo montre ce câble : quatre fils sous une même gaine. Chacun a son rôle. Vous allez voir
lesquels, et dans quel ordre on les raccorde.`,

  comprendre: `Suivons le courant, du tableau jusqu'à l'unité intérieure.
Tout commence au tableau. Le climatiseur a sa propre protection : un disjoncteur qui ne sert qu'à lui,
et un différentiel. Pourquoi seul ? Parce que si vous partagez la ligne avec une prise ou un éclairage,
le disjoncteur déclenche pour l'un ou pour l'autre, et vous ne savez plus lequel. Son calibre, vous ne
le devinez pas : il est dans la notice. Pour comprendre cet appareil, allez voir ÉlectroRézo, à la
station quatre point trois.
Un câble monte ensuite vers l'unité extérieure. Il doit être prévu pour l'extérieur : un câble de maison,
laissé dehors, vieillit au soleil. Et juste à côté de l'unité, un interrupteur de proximité. En
l'ouvrant, on coupe tout, sans retourner au tableau.
Sous le capot de l'unité extérieure, il y a le bornier. La phase, le neutre et la terre y arrivent, chacun
à son repère. C'est de là que repart le câble d'interconnexion, avec quatre fils : la phase, le neutre, la
terre, et un fil de communication. Celui-là ne porte pas d'énergie, il porte des messages. C'est par lui
que les deux cartes électroniques se parlent. Sans lui, elles ne se comprennent pas.
Retenez la règle : on relie le un avec le un, le deux avec le deux, le N avec le N. Les mêmes repères des
deux côtés. Si vous les croisez, l'appareil affiche, au premier démarrage, un défaut de communication.
Appuyez sur Dérouler : le dernier pas montre justement des fils croisés.`,

  manipuler: `À vous. L'unité extérieure d'un split posé à demeure : cochez ce qu'elle doit avoir.
Son propre disjoncteur : oui. Un fil de communication avec l'unité intérieure : oui aussi. Mais une prise
de la pièce, comme une lampe : non. Une prise n'est pas faite pour cela, et elle partagerait le circuit
avec d'autres appareils.
Ensuite, l'ordre du chantier. D'abord, on consigne : on coupe, on condamne, et on vérifie qu'il n'y a plus
de tension. Cette méthode, vous l'apprenez dans HoCourant. Puis on pose la ligne et l'interrupteur de
proximité, on raccorde l'unité extérieure, puis les deux unités entre elles. Et on contrôle avant de
remettre sous tension.
Quatre pièges à connaître. Les repères inversés, que vous venez de voir. La terre oubliée. Le câble de
maison laissé dehors. Et la protection partagée avec autre chose.
Enfin, pas un seul chiffre de mémoire : ni le calibre, ni la section. Ils sont dans la notice de
l'appareil. Et si vous voulez comprendre comment on les choisit, ÉlectroRézo l'explique, à la station
quatre point dix.`,

  representer: `Six symboles à reconnaître. Les deux unités, que vous connaissez déjà. Le disjoncteur. L'interrupteur
de proximité. Le bornier, une rangée de bornes rondes. Et la terre.
Sur le schéma de la notice, cherchez d'abord qui alimente qui : c'est lui qui commande, pas l'habitude.
Puis regardez le bornier de chaque unité. Les repères sont les mêmes des deux côtés, et un fil relie
toujours un repère à son jumeau.
Cherchez aussi le moyen de couper, entre le tableau et l'unité extérieure. S'il manque sur le plan, il
manquera sur le chantier.
Avant de passer aux questions, gardez trois choses en tête : on consigne avant d'ouvrir un bornier, on
relie chaque fil au même repère des deux côtés, et on lit la notice.`
};
