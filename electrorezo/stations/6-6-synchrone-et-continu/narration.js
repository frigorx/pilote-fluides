/* ÉlectroRézo 6.6 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Cette station est une station de découverte. Elle ne vous demandera rien à câbler : elle vous
demande de situer.
Vous connaissez maintenant très bien le moteur asynchrone. Mais ce n'est pas le seul. Il existe
deux autres grandes familles.
Et les connaître, même de loin, permet de comprendre quelque chose d'utile : pourquoi
l'asynchrone a fini par gagner presque partout.`,

  comprendre: `Regardez les trois cadres du dessin.
Le premier, vous le connaissez : l'asynchrone. Il traîne derrière le champ. Mille quatre cent
trente-cinq tours par minute pour un champ à quinze cents.
Le deuxième, le synchrone. Son rotor n'est pas une cage : il porte un aimant, ou un bobinage
qu'on alimente. Résultat, il s'accroche au champ tournant et il le suit exactement.
Quinze cents tours. Pile. Quelle que soit la charge.
C'est une belle qualité : la vitesse est parfaitement définie. C'est pour ça qu'on le trouve
partout où il faut de la précision.
Mais il a un gros défaut : il ne démarre pas tout seul. À l'arrêt, le champ tourne déjà à quinze
cents tours, bien trop vite pour qu'il s'y accroche. Il reste sur place et il vibre.
Il faut donc un dispositif de lancement, ou un variateur qui monte progressivement en fréquence.
Le troisième, le moteur à courant continu. Et celui-là fonctionne sur un principe complètement
différent.
Pas de champ tournant du tout. Un aimant fixe dans le stator, un bobinage sur le rotor, et deux
balais qui amènent le courant au rotor par une pièce qu'on appelle le collecteur.
Regardez la photo : le collecteur est un anneau fendu en plusieurs segments. À chaque demi-tour,
les balais passent d'un segment à l'autre, et le courant du rotor s'inverse.
Pourquoi cette inversion ? Parce que sans elle, le rotor ferait un demi-tour, se retrouverait
aligné avec l'aimant, et s'arrêterait là. En inversant le courant au bon moment, on le relance
à chaque demi-tour.
C'est ingénieux. Et c'est aussi la pièce qui s'use : les balais frottent, ils font des
étincelles, et il faut les remplacer.
Voilà pourquoi l'asynchrone a gagné. Il n'a rien qui frotte, rien qui s'use, rien qui étincelle.
Il lui manquait seulement la souplesse de vitesse du moteur à courant continu — et le variateur
de fréquence la lui a donnée. C'est la ligne sept.`,

  manipuler: `Les trois questions, et ici c'est le moteur à courant continu qu'on juge.
Faites attention à la troisième : il est le seul de toute la ligne à y répondre non.`,

  representer: `Sur un plan, les trois se ressemblent beaucoup — c'est toujours le rond marqué M.
Deux indices les distinguent, et ils sont rapides à lire.
Le premier : le nombre de traits qui arrivent. Deux pour un continu ou un monophasé, trois pour
un triphasé.
Le second : le petit signe écrit à côté. Le trait du continu, un vague pour le monophasé, trois
vague pour le triphasé.
Et pour le moteur à courant continu, il y a un détail supplémentaire : deux petits traits de
chaque côté du rond, qui figurent les balais.
Cherchez ces deux traits. Ils sont la signature d'un moteur à collecteur, et ils annoncent un
entretien.
Un dernier conseil, très pratique, pour lire une plaque.
Si la vitesse annoncée est un nombre rond — quinze cents, trois mille, mille — vous avez
affaire à un synchrone.
Si c'est un nombre bizarre — mille quatre cent trente-cinq, deux mille neuf cents — c'est un
asynchrone, et l'écart au nombre rond est son glissement.
C'est un indice fiable, et il ne coûte rien à vérifier.`
};
