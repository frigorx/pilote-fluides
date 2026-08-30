/* ÉlectroRézo 5.4 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Vous savez déjà tout de cet appareil, et vous ne le savez pas encore.
Une bobine, un circuit magnétique, une armature, un ressort. C'est le contacteur de la station
deux, en plus petit.
Alors pourquoi une station à part ? Parce que cette différence de taille n'est pas cosmétique :
elle change le métier de l'appareil. Et confondre les deux coûte cher.`,

  comprendre: `Regardez les deux côte à côte.
Le contacteur a des contacts épais, logés sous un boîtier d'arc, faits pour couper le courant
d'un moteur. Le relais a des contacts fins, sans boîtier d'arc, faits pour un signal.
Voilà toute la différence. Elle tient dans quelques millimètres de métal.
Alors à quoi sert un relais, si ce n'est pas à porter la puissance ? À trois choses, et elles
sont très courantes.
Multiplier les contacts, d'abord. Une bobine, plusieurs contacts qui basculent ensemble. Une
information distribuée à plusieurs endroits.
Séparer deux tensions, ensuite. La bobine est en vingt-quatre volts continus, du côté de
l'automate ; les contacts sont en deux cent trente volts, du côté des contacteurs. Il n'y a
aucune liaison électrique entre les deux — seulement un aimant.
Adapter, enfin. La sortie d'un automate ne peut pas alimenter directement une grosse bobine de
contacteur. On met un relais entre les deux.
Et maintenant, une variante qui mérite votre attention, parce qu'elle fait exception à tout ce
que je vous ai dit sur cette ligne. Le relais bistable, qu'on appelle aussi télérupteur.
Une impulsion : il bascule et il y reste. L'impulsion suivante : il revient. C'est ce qu'il y a
dans votre cage d'escalier — vous appuyez, ça s'allume et ça reste allumé.
Retenez-le, parce que c'est le seul appareil de la ligne qui garde sa position sans qu'on
l'alimente.`,

  manipuler: `Les trois questions, pour un relais ordinaire — pas pour le bistable.
Et faites attention à la troisième : elle change complètement si vous pensez au télérupteur.`,

  representer: `Sur un plan, la bobine d'un relais se dessine exactement comme celle d'un contacteur. Le même
rectangle, la même forme.
Ce qui les distingue est écrit à côté : le repère. KA pour un relais, KM pour un contacteur.
Deux lettres, et vous savez s'il y a de la puissance derrière.
Prenez le réflexe de les lire avant de conclure. C'est le même genre de piège que le fusible de
la station quatre point deux : le dessin est identique, seul le texte fait la différence.
Le télérupteur, lui, se distingue à l'œil : sa bobine porte à l'intérieur un petit signe en
marche d'escalier. Ce signe annonce que l'appareil garde sa position — et une fois qu'on le
sait, on ne le confond plus avec rien.`
};
