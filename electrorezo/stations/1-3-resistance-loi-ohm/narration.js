/* ÉlectroRézo 1.3 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Vous avez vu la tension, qui pousse. Vous avez vu le courant, qui circule.
Il manque la troisième, et c'est celle qui décide combien il en circule vraiment : la résistance.
Toute matière s'oppose au passage du courant. Le cuivre très peu, le fer davantage, le plastique
tellement qu'on l'appelle un isolant. Cette opposition, c'est la résistance.
Et entre ces trois grandeurs, il existe une relation si simple qu'elle tient en trois lettres. On
l'appelle la loi d'Ohm, et vous allez vous en servir toute votre carrière.`,

  comprendre: `Plutôt que de vous la réciter, je préfère que vous la voyiez fonctionner. Servez-vous des deux
curseurs sous le dessin.
Montez la tension. Le courant monte. Logique : on pousse plus fort.
Maintenant baissez la tension et montez la résistance. Le courant redescend. Logique aussi : on
freine davantage.
Voilà toute la loi d'Ohm. La tension pousse, la résistance freine, et le courant est le résultat
des deux.
Regardez aussi le fil pendant que vous manœuvrez : il change d'épaisseur et il est annoncé froid,
tiède, chaud ou brûlant. Ce n'est pas décoratif. C'est le rappel de ce que vous avez appris à la
station précédente : c'est le courant qui fait chauffer, et il chauffe avec son carré.
Maintenant, qu'est-ce qui fait la résistance d'un fil ? Trois choses, et vous les rencontrerez
sur le terrain.
Sa longueur, d'abord. Plus il est long, plus il résiste. C'est pour ça qu'une longue ligne perd
de la tension sur son parcours.
Sa section, ensuite. Plus il est gros, moins il résiste. C'est exactement l'inverse.
Et le métal dont il est fait. Le cuivre conduit mieux que l'aluminium, qui conduit mieux que le
fer.
Un dernier point, souvent oublié : la température. Un métal chaud résiste davantage. Un bobinage
mesuré à froid le matin, et le même mesuré après une heure de marche, ne donnent pas la même
valeur. Ce n'est pas une panne — c'est normal, et il faut le savoir avant de conclure.`,

  manipuler: `La mesure de résistance a une particularité qu'il faut absolument comprendre.
L'ampèremètre et le voltmètre écoutent. Ils regardent ce qui se passe, sans rien ajouter.
L'ohmmètre, lui, parle. Il envoie son propre petit courant dans l'élément, et il regarde ce qui
revient. C'est comme ça qu'il calcule.
Alors imaginez ce qui se passe si l'élément est encore sous tension. Le réseau envoie deux cent
trente volts, l'ohmmètre envoie quelques millivolts. Son petit signal est complètement écrasé.
La valeur affichée ne veut rien dire, et l'appareil peut être détruit.
D'où la règle, sans exception : on coupe, on consigne, on débranche au moins un côté de
l'élément. Et alors seulement on mesure.
Pourquoi débrancher un côté ? Parce que sinon vous mesurez aussi tout ce qui est en parallèle,
sans le savoir. La valeur sera plus faible que la vraie, et vous conclurez à un défaut qui
n'existe pas.
Un usage concret, pour finir, et vous vous en servirez souvent. Sur un moteur triphasé, on mesure
les trois enroulements et on compare. Ils doivent être quasiment identiques.
Un enroulement qui mesure zéro est en court-circuit. Un enroulement qui mesure l'infini est
coupé. Dans les deux cas, le moteur est bon à réparer, et vous l'avez su en trois minutes, sans
le démonter.`,

  representer: `La résistance s'écrit avec un R majuscule, et elle se mesure en ohms. Le symbole de l'unité est
la lettre grecque oméga, qui ressemble à un fer à cheval.
La relation s'écrit : U égale R fois I.
Et je veux vous montrer qu'elle marche dans les trois sens, parce que c'est ce qui la rend si
utile.
Vous connaissez la tension et la résistance ? Vous en déduisez le courant. Vous connaissez la
tension et le courant ? Vous en déduisez la résistance. Vous connaissez la résistance et le
courant ? Vous en déduisez la tension.
Trois grandeurs, une relation : il suffit d'en connaître deux.
Les ordres de grandeur, maintenant. Quelques ohms pour un bobinage de moteur ou une résistance de
chauffage. Quelques milliers d'ohms, on dit kilohms, pour l'électronique. Et des millions d'ohms,
des mégohms, pour un isolant en bon état.
Un mot enfin sur ce que vous ne trouverez pas. La résistance n'est presque jamais écrite sur le
matériel. Ce n'est pas une grandeur qu'on lit : c'est une grandeur qu'on mesure.
Elle apparaît en revanche dans les rapports de contrôle, sous deux formes qu'il ne faut pas
confondre. La résistance des enroulements, en ohms, qui dit si le bobinage est sain. Et la
résistance d'isolement, en mégohms, qui dit si l'isolant tient encore.
Deux appareils différents, deux mesures différentes. Et une bonne valeur de l'une ne dit
absolument rien de l'autre.`
};
