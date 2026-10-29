/* ÉlectroRézo 9.8 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits le 29/10/2026.
   Non validés, aucun MP3 fabriqué. Les lettres C, S, R se disent lettre par lettre.
   Les schémas n'ont pas de flèche de rotation : la voix dit le sens avec des mots. */
const NARRATION = {

  decouvrir: `Un moteur monophasé tourne dans un sens. Parfois, il faut le faire tourner dans l'autre.
En triphasé, vous savez déjà faire : on permute deux phases. En monophasé, le geste change. On croise
les deux fils d'un seul enroulement, l'enroulement auxiliaire ou l'enroulement principal.
Regardez les deux schémas sur l'écran. À droite du moteur, il y a les deux fils de l'auxiliaire. Sur
le second schéma, ils sont croisés. Le moteur tourne alors dans l'autre sens. Les schémas n'ont pas de
flèche de rotation : c'est le texte qui vous dit le sens.
Un moteur prévu pour deux sens a au moins quatre bornes. On en rencontre peu aujourd'hui, surtout sur
certains compresseurs ouverts. Un compresseur hermétique, lui, n'a que trois bornes.
Avant de toucher un fil, vous consignez le circuit, et vous vérifiez l'absence de tension.`,

  comprendre: `Regardez la ligne sur l'écran. Elle compte six points. Touchez-les un par un.
Le premier point, c'est la consignation. Vous consignez le circuit, puis vous vérifiez l'absence de
tension. Si le moteur a un condensateur, vous le déchargez avec une résistance, jamais avec un
tournevis. La consignation est à la station six point sept, la décharge du condensateur à la station
neuf point cinq.
Le deuxième point, c'est la lecture. Vous lisez la plaque signalétique. Puis vous regardez à
l'intérieur du couvercle du bornier : le schéma de raccordement s'y trouve souvent. Il dit si le moteur
est prévu pour deux sens.
Le troisième point, ce sont les deux fils d'un même enroulement. Sur le schéma de raccordement, vous
cherchez les deux fils du principal, puis les deux fils de l'auxiliaire. Le quatrième point, c'est de
repérer chaque fil avant de le débrancher. Sans repère, vous ne saurez plus où il va.
Le cinquième point est le geste lui-même. Vous croisez les deux fils d'un seul enroulement. Le courant
change de sens dans cet enroulement. Au démarrage, la poussée magnétique change de sens aussi, et le
moteur tourne dans l'autre sens.
Le sixième point est une limite. N'échangez jamais un fil du principal avec un fil de l'auxiliaire : le
moteur grille, en général peu après la mise sous tension. Croiser les deux fils d'un même enroulement
donne le sens. Échanger des fils entre les deux enroulements est un autre geste.
Vous pourriez penser à une permutation, comme en triphasé. En monophasé, permuter la phase et le
neutre ne change pas le sens du moteur.`,

  manipuler: `Maintenant, vous raisonnez sur des cas. Il y a sept exercices. Le premier est résolu : imitez-le.
Les suivants vous disent où regarder et comment faire. Les derniers ne le disent plus, et c'est voulu.
Pour chaque cas, regardez d'abord le schéma de raccordement. Sur un compresseur hermétique, qui a
trois bornes, on ne croise rien. Sur un petit ventilateur à spire de Frager, le sens est fixé par
construction, et rien ne s'inverse au bornier. Sur un moteur prévu pour deux sens, qui a au moins
quatre bornes, on croise les deux fils d'un seul enroulement.
Un cas porte sur le moteur triphasé. Là, on permute deux phases, comme à la station deux point six.
Un autre cas rappelle le danger : un fil du principal échangé avec un fil de l'auxiliaire, et le moteur
grille, en général peu après la mise sous tension.`,

  representer: `Sur le schéma, le moteur monophasé est un rond marqué M, avec le signe un et une petite vague. Ici, il
a quatre fils sortis. Les deux fils du haut sont ceux du principal. Les deux fils de droite sont ceux
de l'auxiliaire. Le point commun est repéré par la lettre C.
Comparez les deux schémas. Sur le premier, le fil du haut de l'auxiliaire va au point commun. Sur le
second, il va à l'alimentation, et l'autre fil va au point commun. Les deux fils sont croisés. Le
principal n'a pas bougé.
Le troisième dessin est le bornier d'un compresseur hermétique : trois vis, et le Klixon relié à la
première. Avec trois bornes, croiser deux fils échangerait un fil du principal avec un fil de l'auxiliaire. On
ne croise rien.`
};
