/* ÉlectroRézo 2.2 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Le monophasé, c'est le réseau le plus simple qui soit. Une phase, un neutre, une boucle.
C'est ce qui arrive dans les maisons. C'est ce qui alimente vos prises, votre éclairage, votre
machine à laver.
Et en atelier, c'est ce qui alimente presque tous les circuits de commande : les bobines de
contacteur, les électrovannes, les régulations.
Alors même si vous travaillez sur des machines triphasées, vous ferez du monophasé tous les
jours.`,

  comprendre: `Regardez le dessin, il n'y a pas grand-chose à dire tellement c'est simple.
Le courant part du réseau par la phase. Il traverse la charge. Il revient par le neutre. Et
cinquante fois par seconde, il fait exactement l'inverse.
Entre les deux fils : deux cent trente volts. C'est la seule tension qu'il y a à mesurer, parce
qu'il n'y a que deux conducteurs actifs.
Maintenant, une chose importante que beaucoup ne savent pas, et je vais la dire clairement.
La phase et le neutre ne sont pas deux fils symétriques.
Le neutre est relié à la terre au poste de distribution. Vous êtes vous-même en contact avec la
terre. Donc entre vous et le neutre, il n'y a presque aucune différence de potentiel.
La phase, elle, n'est reliée à rien de tel. Entre vous et la phase, il y a deux cent trente
volts.
Concrètement : toucher le neutre est généralement sans conséquence. Toucher la phase peut tuer.
Deux fils qui se ressemblent, deux situations qui n'ont rien à voir.
Et attention — je dis bien « généralement » pour le neutre. Si le neutre est coupé quelque part
en amont, il peut se retrouver au potentiel de la phase à travers les charges branchées. Le
neutre n'est pas un fil inoffensif : c'est un fil habituellement inoffensif. La nuance vaut une
vie.
Un dernier point, sur les limites du monophasé. Un branchement domestique tient entre six et
douze kilowatts environ. Au-delà, il faut passer en triphasé.
C'est même la raison principale pour laquelle on demande le triphasé : pas pour la tension, pour
la puissance.`,

  manipuler: `Passons à ce qui vous servira vraiment sur le terrain : comment savoir si vous êtes en
monophasé ou en triphasé.
Deux questions, dans cet ordre.
Première question : combien de conducteurs actifs ? Deux, c'est du monophasé. Trois ou quatre,
c'est du triphasé.
Et attention : le vert-jaune ne compte pas. Ce n'est pas un conducteur actif.
Deuxième question, et c'est elle qui tranche : combien de volts entre deux d'entre eux ?
Deux cent trente, c'est une phase et un neutre. Quatre cents, ce sont deux phases — vous êtes en
triphasé.
Pourquoi la deuxième question ? Parce que la première ne suffit pas, et je veux que vous le
compreniez bien.
Deux phases sans neutre, cela fait aussi deux fils. Sur certaines installations industrielles
anciennes, on trouve exactement ça. Vous comptez deux fils, vous concluez monophasé, vous
branchez un appareil deux cent trente volts — et vous lui envoyez quatre cents.
Il ne survit pas.
Alors la règle est simple : on ne conclut jamais sur le nombre de fils seul. On mesure entre
eux.`,

  representer: `Sur une plaque ou une notice, le monophasé s'annonce par le signe un vague. Le chiffre un, puis
la petite vague de l'alternatif.
Une seule tension est écrite à côté, parce qu'il n'y en a qu'une.
Sur un bornier, vous trouverez deux bornes actives : L pour la phase, N pour le neutre. Plus la
borne de terre, qui est à part.
Sur un plan, c'est encore plus simple : un seul trait descend depuis la phase, un seul remonte
vers le neutre.
Et voici la règle pratique que je veux que vous emportiez.
Un appareil monophasé peut parfaitement vivre dans une armoire triphasée. On prend une phase, on
prend le neutre, et voilà.
Mais jamais deux phases. Jamais. Vous connaissez maintenant la raison : ce serait quatre cents
volts au lieu de deux cent trente.
C'est une erreur qui se fait en trois secondes, dans une armoire mal repérée, quand on est
pressé. Prenez l'habitude de vérifier le neutre au multimètre avant de serrer la borne.`
};
