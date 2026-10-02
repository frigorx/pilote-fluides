/* CartoClim 5.6 — textes POUR L'OREILLE, registre « professeur à l'épaule ».
   La voix explique, elle ne lit pas l'écran (00-charte/VOIX-ET-NARRATION.md).
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Le téléphone sonne. Le client vous dit : ça ne marche plus, et ça clignote.
Regardez la première photo. Ce qui clignote, c'est une petite lumière sur l'unité intérieure, la
LED. Sur d'autres appareils, c'est un code qui s'affiche, sur l'unité elle-même ou sur l'écran de
la télécommande.
Ce n'est pas un caprice. À l'intérieur, une carte électronique surveille la machine en
permanence. Dès que quelque chose sort de ce qu'elle accepte, elle arrête tout, et elle vous dit
pourquoi, à sa façon.
Remarquez ce que le code ne dit pas : la pièce cassée. Il dit seulement où chercher. Pour chercher
vraiment, vous prendrez vos instruments, comme le manomètre de la seconde photo. Voyons d'abord
comment la carte s'y prend.`,

  comprendre: `Que surveille cette carte ? Cinq choses.
Les températures, par des sondes. La pression, côté chaud, pour que le compresseur ne s'étouffe pas.
Le courant, pour que rien ne chauffe. Les ventilateurs, qui doivent tourner comme elle le demande.
Et la conversation entre les deux unités, par le câble qui les relie. Chacune a sa carte, et elles
se parlent.
Si l'une de ces vérifications échoue, la carte arrête la machine et donne son code. Alors, dans
quel ordre faire ? Le premier dessin le déroule. On relève le code avant de couper, parce qu'en
coupant l'alimentation on peut le perdre. On ouvre la notice, parce que ce code appartient au
constructeur, et que personne d'autre ne sait le traduire. On trouve la famille de la panne. On
vérifie sur la machine : voilà le pas qu'on oublie le plus. Et on remet en marche en ayant compris,
pas en croisant les doigts.
Le second dessin montre trois familles. Dans chacune, la partie de la machine en cause s'allume.
Reste un piège. Parfois, il n'y a pas de panne. Le
compresseur attend quelques minutes avant de redémarrer, pour ne pas s'abîmer. La machine se
protège, et le client croit qu'elle est cassée. Appuyez sur Dérouler.`,

  manipuler: `À vous. Un code vient de s'afficher. Que vous permet-il de faire ?
Dire où chercher : oui, c'est son métier. Réparer tout seul : non. Un code est un message, pas un
remède. Si vous l'effacez et relancez sans comprendre, la machine repart, le client est content, et
quelque temps plus tard la panne revient, parce que la cause n'a pas bougé. Et le même sens d'une
marque à l'autre : non plus. Chaque constructeur écrit ses codes, parfois d'une gamme à l'autre.
Puis l'ordre des gestes : relever le code, ouvrir la notice, trouver la famille, vérifier, remettre
en marche. Gardez surtout le premier. On lit avant de couper.
Et un dernier réflexe. Si la machine vient de s'arrêter, laissez-lui quelques minutes. C'est
peut-être seulement sa protection.`,

  representer: `Trois symboles, pour les trois endroits où la machine parle : l'unité intérieure, l'unité
extérieure, la télécommande. Quand vous cherchez un code, regardez les trois.
Mais le vrai document, c'est la table des codes de la notice. À gauche le code. À côté, ce qu'il
signale, et les causes possibles. Cherchez-le tel qu'il est affiché : un clignotement de trop, et
c'est une autre panne.
Dans cette table, les codes se rangent par familles. Puis, de la ligne, on passe au schéma
électrique de la notice, qui montre où se trouve la sonde ou le moteur dont on parle. Table,
schéma, machine : c'est la route. Les questions vont vérifier que vous la tenez.`
};
