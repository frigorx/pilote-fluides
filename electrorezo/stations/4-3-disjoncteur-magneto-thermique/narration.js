/* ÉlectroRézo 4.3 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Version précédente : narration-v1.js.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Vous en avez des dizaines chez vous, alignés dans le tableau. Un petit boîtier blanc, une
manette, et deux caractères écrits dessus.
Le disjoncteur a remplacé le fusible presque partout, pour une raison très terre-à-terre :
quand il a coupé, on le remonte. Rien à racheter, rien à aller chercher au magasin à onze
heures du soir.
Mais ce serait le réduire que d'en faire un fusible réutilisable. À l'intérieur, il y a deux
surveillances au lieu d'une, et c'est ça qui compte.`,

  comprendre: `Ouvrons-le, et suivons le courant. Il entre, il traverse un bilame, puis une bobine, et
il ressort. Deux pièces, deux façons complètement différentes de voir un défaut.
Le bilame, vous le connaissez : deux métaux collés qui se courbent en chauffant. Il est lent —
et c'est exactement ce qu'on lui demande. Si le courant dépasse un peu le calibre, il chauffe
peu à peu, se courbe peu à peu, et finit par déclencher au bout de quelques secondes ou de
quelques minutes. Il surveille la surcharge.
La bobine, elle, ne fait strictement rien en courant normal. Mais si le courant devient énorme
— deux fils qui se touchent, par exemple — elle devient un aimant très puissant, elle attire un
noyau de fer, et ce noyau frappe le mécanisme. Quelques millièmes de seconde. Elle surveille le
court-circuit.
Regardez maintenant les caractères écrits sur le boîtier, parce qu'ils disent exactement ça.
Le nombre, c'est le calibre en ampères. La lettre, c'est la courbe : elle dit à partir de
combien de fois le calibre la bobine décide de claquer. En courbe C, la plus courante, c'est
entre cinq et dix fois. En courbe D, entre dix et vingt, pour ce qui appelle une grosse pointe
au démarrage.
Et maintenant, je veux vous arrêter sur une phrase que je vous demande de garder toute votre
carrière. Ce calibre ne protège pas l'appareil que vous branchez au bout. Il protège le câble.
Relisez-la dans votre tête. Le calibre protège le câble.
C'est pour ça qu'on ne l'augmente jamais sans changer la section du fil. On y reviendra à la
dernière station de cette ligne, et vous verrez que tout tient à ça.`,

  manipuler: `Trois défauts, encore une fois. Vous savez que cet appareil en surveille deux, et vous
savez lesquels : ils sont dans son nom.
Cochez, et regardez bien le troisième avant de le laisser de côté.`,

  representer: `Sur un plan, le symbole du disjoncteur porte les deux signes que vous avez appris dans
la ligne huit : le crochet rectangulaire du bilame, et le demi-cercle de la bobine.
Leur présence n'a rien de décoratif. C'est la fiche technique de l'appareil, écrite en deux
petits dessins.
Et voilà ce que ça vous donne concrètement. Un symbole qui ne porterait que le crochet ne
protégerait jamais d'un court-circuit — et vous le sauriez rien qu'en le regardant, sans ouvrir
aucune notice. C'est exactement ce qu'on cherche à vous donner.`
};
