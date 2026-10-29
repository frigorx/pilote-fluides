/* ÉlectroRézo 9.3 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits le 28/10/2026.
   Non validés, aucun MP3 fabriqué. Les sigles RSIR, CSIR et CTP, et les lettres C, S, R, se disent lettre par lettre. */
const NARRATION = {

  decouvrir: `Cette station prend deux montages du compresseur monophasé : le RSIR et le CSIR.
Vous avez vu qu'un moteur monophasé ne démarre pas avec son seul enroulement principal. Il lui faut aussi
l'enroulement auxiliaire, au démarrage. Puis il faut le retirer. C'est le travail du relais d'intensité.
Regardez les deux schémas. Ils se ressemblent. L'alimentation passe par le Klixon et arrive à la borne C.
Le fil se partage alors en deux. D'un côté, le principal, avec la borne R. De l'autre, l'auxiliaire, avec
la borne S.
Sur le premier schéma, le RSIR, une bobine est placée sur le fil du principal. Un contact est placé sur le
fil de l'auxiliaire. La bobine et le contact portent le même repère, K A. Ils forment un seul relais.
Sur le second schéma, le CSIR, on ajoute un condensateur de démarrage sur l'auxiliaire.
Ce relais équipe les petits compresseurs, jusqu'à environ six cents watts : les réfrigérateurs ménagers
et les petits congélateurs.`,

  comprendre: `Suivons le démarrage d'un RSIR à relais.
À la mise sous tension, le courant traverse le Klixon, le principal et la bobine. Le contact est ouvert au
repos. L'auxiliaire n'est donc pas alimenté, et le moteur ne peut pas démarrer. Le courant monte, jusqu'à
environ cinq fois le courant nominal.
La bobine attire alors le contact. L'auxiliaire est mis en service. Le moteur accélère, et le courant
baisse. Vers quatre-vingts pour cent de la vitesse, le contact s'ouvre et retire l'auxiliaire.
Le relais a un sens de montage. L'inscription Top se met en haut. Monté à l'envers, son contact peut rester
fermé en permanence, et le moteur risque de griller.
Sans condensateur, le couple au démarrage est faible. La détente se fait donc par capillaire, pour que la
haute pression et la basse pression s'égalisent à l'arrêt.
Il existe une autre manière de retirer l'auxiliaire : la CTP. C'est une résistance dont la valeur monte
quand elle chauffe. Froide, sa résistance est très faible. Le courant passe dans l'auxiliaire, et le moteur
démarre. Ce courant chauffe la CTP. Après une à deux secondes, sa résistance dépasse mille ohms, et le
courant de l'auxiliaire tombe à quelques milliampères. C'est comme si un relais l'avait retiré. Il faut
ensuite au moins cinq minutes d'arrêt pour qu'elle refroidisse.
Le CSIR ajoute un condensateur de démarrage, en série avec l'auxiliaire. Le couple au démarrage devient
important. On l'emploie quand ce couple risque d'être fort, par exemple avec un détendeur thermostatique.
Ce condensateur ne doit pas rester sous tension : cinq secondes au plus, et vingt démarrages par heure au
maximum. Sinon il chauffe et risque d'exploser.`,

  manipuler: `Un compresseur est monté en RSIR à CTP.
Ouvrez le temps deux, et regardez l'image marquée R S I R à C T P. Cherchez trois choses : une bobine,
une CTP, un condensateur. Cochez ce que ce compresseur porte, puis validez.
Ensuite, lisez le câblage. Le Klixon est en série sur la borne C. La bobine du relais est en série avec le
principal. Sur le CSIR, le condensateur vient après le contact.
Un condensateur reste chargé après la coupure. On le décharge avec une résistance avant d'y toucher. Cette
décharge n'est pas instantanée : elle peut prendre quelques minutes. On décharge quand même.`,

  representer: `Cinq symboles.
La bobine du relais est un rectangle, avec un fil de chaque côté.
Le contact est un trait oblique qui ne touche pas le fil du haut : il est ouvert au repos. Un pointillé le
relie à un petit arc de cercle, qui indique la commande électromagnétique.
La CTP est un rectangle de résistance marqué de la lettre T.
Le condensateur est formé de deux traits parallèles.
Le Klixon est un cercle traversé par un trait brisé.
Maintenant, lisez le schéma du RSIR de haut en bas. L'alimentation, le Klixon, la borne C. Puis deux
branches. À gauche, le principal : la borne R, la bobine, le neutre. À droite, l'auxiliaire : la borne S,
le contact, le neutre.
Cherchez le repère K A, écrit deux fois. Il est sur la bobine et sur le contact. Ces deux symboles forment
un seul relais.
Le cadre en pointillés entoure le compresseur. Le relais est dehors.`
};
