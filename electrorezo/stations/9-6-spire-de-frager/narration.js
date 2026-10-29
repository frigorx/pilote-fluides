/* ÉlectroRézo 9.6 : textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits le 29/10/2026.
   Non validés, aucun MP3 fabriqué. Les lettres U et V se disent lettre par lettre. */
const NARRATION = {

  decouvrir: `Ce moteur monophasé n'a pas de condensateur. Il démarre grâce à une spire de Frager.
Regardez le dessin. À gauche, la bobine est alimentée en deux cent trente volts alternatif. Elle est posée sur
un côté du circuit magnétique. À droite, le rotor est un disque rond. Sa flèche donne le sens de rotation.
Cherchez maintenant un tout petit anneau orange, en haut à droite du rotor, au bord du circuit magnétique.
C'est la spire de Frager.
Ce moteur entraîne de petits ventilateurs d'évaporateur et de vitrine. Au bornier, il n'a que deux fils et la terre.`,

  comprendre: `Commençons par un moteur qui n'a qu'un seul enroulement. Le couple est la force qui fait tourner l'arbre. Au démarrage, le couple de ce moteur est nul : il ne démarre pas
seul. Sur le premier dessin, sans aide au démarrage, il vibre. Si on le lance à la main, il démarre et continue
dans le sens où on l'a lancé.
Il lui faut donc une aide au démarrage. Il en existe trois : une spire de Frager, un enroulement supplémentaire
ou un condensateur. Toutes créent un déphasage, c'est-à-dire un décalage dans le temps. Ce déphasage donne un sens
de rotation. Les stations neuf point deux à neuf point quatre traitent l'enroulement supplémentaire et le condensateur. Ici,
c'est la spire.
La spire de Frager est un petit anneau, posé sur un coin du pôle, côté rotor. Elle est en court-circuit :
l'anneau est fermé sur lui-même. Aucun fil ne l'alimente. Son courant est induit : c'est la bobine qui le fait
naître.
Ce moteur a deux limites. Son couple est faible, donc on ne le trouve pas sur un compresseur. Et son sens de
rotation est fixé par construction. Rien ne s'inverse au bornier. Permuter la phase et le neutre ne change pas
le sens d'un moteur monophasé.
On le trouve sur de petits ventilateurs d'évaporateur et de vitrine. Au bornier, il a deux fils et la terre.
Il n'y a ni condensateur ni relais à brancher.
Vous connaissez déjà cet anneau. Dans la bobine d'un contacteur alimentée en alternatif, la bague de déphasage
est le même anneau. À la station six point un, elle empêche les vibrations, car sans elle l'attraction
s'annulerait cent fois par seconde. Le dessin du contacteur est en haut de cet écran, sous les deux moteurs.
Dans le moteur, le même anneau aide au démarrage.`,

  manipuler: `Le moteur à spire étudié aux temps un et deux, celui d'un petit ventilateur d'évaporateur, n'a que deux fils et la terre au bornier.
Lisez d'abord l'exemple résolu. Le moteur de la station neuf point quatre porte un condensateur permanent et un
enroulement auxiliaire. Il n'a pas de spire.
À vous maintenant. Rouvrez le temps deux, et lisez les paragraphes sur la spire de Frager et sur le bornier.
Cochez ce que ce moteur porte : un condensateur, un enroulement auxiliaire, une spire en court-circuit. Puis
validez.
Ensuite, lisez le câblage. Aucun fil n'arrive à la spire. Rien ne s'inverse au bornier. Avant de toucher au
bornier, consignez le circuit et vérifiez l'absence de tension.`,

  representer: `Le moteur se dessine par un rond avec la lettre M et le signe un tilde. Le un dit une phase. Le tilde dit
courant alternatif.
Comptez les bornes sur le symbole : deux, U et V. Aucun condensateur n'est dessiné. Dans le bornier, la terre
s'ajoute aux deux fils.
Cherchez maintenant la spire sur ce symbole. Elle n'y est pas. Le symbole d'un moteur à spire de Frager est celui
d'un moteur monophasé à deux fils. La spire se voit sur le dessin du temps un.`
};
