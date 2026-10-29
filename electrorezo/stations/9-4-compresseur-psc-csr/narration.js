/* ÉlectroRézo 9.4 : textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits le 28/10/2026.
   Non validés, aucun MP3 fabriqué. Les sigles P S C et C S R, les lettres C, S, R et le repère K A se disent lettre par lettre. */
const NARRATION = {

  decouvrir: `Cette station prend deux montages du compresseur monophasé : le P S C et le C S R.
Regardez les deux schémas. L'alimentation passe par le Klixon et arrive à la borne C. Le fil se partage alors
en deux : le principal, avec la borne R, et l'auxiliaire, avec la borne S.
Sur le premier schéma, le P S C, un seul condensateur est placé sur l'auxiliaire. Sur le second, le C S R,
l'auxiliaire se partage en deux branches. L'une porte un condensateur. L'autre porte un contact, puis un second
condensateur. Une bobine, placée entre les bornes S et C, commande ce contact.`,

  comprendre: `Commençons par le P S C. Le condensateur permanent s'appelle aussi condensateur de marche. Il est en série
avec l'auxiliaire. À la mise sous tension, il donne au moteur le coup de pouce du démarrage. Moteur lancé,
l'auxiliaire reste alimenté au travers du condensateur. L'intensité reste limitée, et le couple en
fonctionnement est meilleur. Il n'y a aucun relais de démarrage.
Il est au papier, de faible capacité, rarement plus d'une trentaine de microfarads, et de grandes dimensions.
Le P S C équipe les petits moteurs dont le couple demandé est peu important : les petits compresseurs à
capillaire, où les pressions s'égalisent à l'arrêt, et les ventilateurs de petits climatiseurs.
Le C S R ajoute un condensateur de démarrage et un relais de tension. Au démarrage, les deux condensateurs
sont en parallèle : leurs capacités s'additionnent. Le couple de démarrage est important. Le démarrage fini,
le condensateur de démarrage est éliminé. L'auxiliaire reste alimenté au travers du condensateur permanent,
et le couple en marche reste important.
On emploie le relais de tension au-delà d'environ six cents watts, quand la bobine d'un relais d'intensité
devrait être trop grosse. La bobine du relais de tension est très résistante, car son fil est long et très
fin. Son contact est fermé au repos. À la mise sous tension, le courant passe donc dans l'auxiliaire, dans
le contact et dans le condensateur de démarrage, et le moteur démarre.
En prenant de la vitesse, le moteur fait monter la tension aux bornes de l'auxiliaire. La bobine est branchée sur ces bornes. Quand cette tension dépasse celle du réseau d'une valeur fixée par le
constructeur, la bobine colle. Le contact s'ouvre et retire le condensateur de démarrage.
En baccalauréat professionnel, on précise que cette tension est induite par le moteur. En fin de démarrage,
elle peut atteindre quatre cents volts pour une alimentation de deux cent vingt volts.
Ce relais réagit à la vitesse du moteur. Une surcharge ne remet pas le condensateur de démarrage en service.`,

  manipuler: `Un compresseur est monté en C S R.
Ouvrez le temps un, et regardez le schéma du C S R, le second. Cherchez trois choses : un condensateur
permanent, un condensateur de démarrage, un relais. Cochez ce que ce compresseur porte, puis validez.
Ensuite, lisez le câblage. Le condensateur permanent est entre la borne S et le retour. Sur l'autre branche,
le contact du relais vient en premier, puis le condensateur de démarrage. Ce condensateur n'est jamais placé
entre la borne deux du relais et l'auxiliaire. Il se place entre la borne un et le côté principal.
Un condensateur reste chargé après la coupure. On le décharge avec une résistance avant d'y toucher. Cette
décharge n'est pas instantanée : elle peut prendre quelques minutes. On décharge quand même.`,

  representer: `Quatre symboles.
La bobine du relais est un rectangle, avec un fil de chaque côté.
Le contact est un trait oblique, relié par un pointillé à un petit arc de cercle, qui indique la commande
électromagnétique. Ici, le trait touche la barre du haut : le contact est fermé au repos.
Le condensateur est formé de deux traits parallèles.
Le Klixon est un cercle traversé par un trait brisé.
Lisez le schéma du C S R de haut en bas. L'alimentation, le Klixon, la borne C. Puis deux
branches. À gauche, le principal : la borne R, puis le retour. À droite, l'auxiliaire : la borne S. Sous
la borne S, deux branches. Sur la première, le condensateur permanent. Sur la seconde, le contact, puis le
condensateur de démarrage.
Cherchez le repère K A, écrit deux fois. Il est sur le contact et sur la bobine. Ces deux symboles forment un
seul relais. La bobine est à droite, hors du cadre qui entoure le compresseur.`
};
