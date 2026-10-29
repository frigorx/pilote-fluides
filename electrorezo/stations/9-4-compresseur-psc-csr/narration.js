/* ÉlectroRézo 9.4 : textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits le 28/10/2026.
   Non validés, aucun MP3 fabriqué. Les sigles P S C et C S R, les lettres C, S, R et le repère K A se disent lettre par lettre. */
const NARRATION = {

  decouvrir: `Cette station prend deux montages du compresseur monophasé : le P S C et le C S R.
Regardez d'abord la vue en trois D. À gauche, le condensateur de démarrage : petit et noir. À droite, le
condensateur de marche : grand, au papier.
Regardez maintenant les deux schémas, plus bas. L'alimentation passe par le Klixon et arrive à la borne C. Le fil
se partage alors en deux : le principal, avec la borne R, et l'auxiliaire, avec la borne S.
Sur le premier schéma, le P S C, un seul condensateur est placé sur l'auxiliaire. Sur le second, le C S R,
l'auxiliaire se partage en deux branches. L'une porte un condensateur. L'autre porte un contact, puis un second
condensateur. Une bobine, placée entre les bornes S et C, commande ce contact.`,

  comprendre: `Commençons par le P S C. Le condensateur permanent s'appelle aussi condensateur de marche. Dans la vue en
trois D, c'est le grand condensateur, à droite. Il est au papier, de faible capacité, rarement plus d'une
trentaine de microfarads, et de grandes dimensions.
Il est en série avec l'auxiliaire. À la mise sous tension, il donne au moteur le coup de pouce du démarrage. Moteur lancé,
l'auxiliaire reste alimenté au travers du condensateur. L'intensité reste limitée, et le couple en
fonctionnement est meilleur. Il n'y a aucun relais de démarrage.
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

  manipuler: `Regardez d'abord l'exemple résolu, avec deux schémas juste sous la consigne. Sur le premier schéma, le P S C, on lit un seul condensateur sur l'auxiliaire. Il porte un
condensateur permanent. Il n'a ni condensateur de démarrage ni relais.
À vous maintenant. Un compresseur est monté en C S R. Regardez le second schéma. Cherchez-y les condensateurs, puis la bobine et son contact.
Trois choses sont proposées : un condensateur permanent, un condensateur de démarrage, un relais. Cochez celles que ce compresseur porte, puis validez.
Ensuite, regardez la carte « Le câblage ». Le condensateur de démarrage n'est jamais placé entre la
borne deux du relais et l'auxiliaire. Il se place entre la borne un et le côté principal.
Un condensateur reste chargé après la coupure. On le décharge avec une résistance avant d'y toucher. Cette
décharge n'est pas instantanée : elle peut prendre quelques minutes. On décharge quand même.`,

  representer: `Quatre symboles.
La bobine du relais est un rectangle, avec un fil de chaque côté.
Le contact est un trait oblique, relié par un pointillé à un petit arc de cercle, qui indique la commande
électromagnétique. Ici, le trait touche la barre du haut : le contact est fermé au repos.
Le condensateur est formé de deux traits parallèles.
Le Klixon est un cercle traversé par un trait brisé.
Regardez maintenant le schéma du C S R, dans la carte « Le lire sur un plan ». Il se lit de haut en bas. L'alimentation, le Klixon, la borne C. Puis deux
branches. À gauche, le principal : la borne R, puis le retour. À droite, l'auxiliaire : la borne S. Sous
la borne S, deux branches. Sur la première, le condensateur permanent. Sur la seconde, le contact, puis le
condensateur de démarrage.
Le repère K A est écrit deux fois, à côté de la bobine et à côté du contact. Ces deux symboles forment un seul
relais. Sur le schéma, la bobine est à droite, hors du cadre qui entoure le compresseur.`
};

/* Le guidage : ce que l'écran montre pendant que la voix parle (moteur : _commun/station.js, « Le guidage »). */
window.GUIDAGE = {
  decouvrir: [
    { quand: "Cette station prend deux montages", montre: "3D" },
    { quand: "Regardez maintenant les deux schémas", montre: "En photo" },
    { quand: "Sur le premier schéma, le P S C", montre: "Le PSC. Un seul condensateur" },
    { quand: "Sur le second, le C S R", montre: "Le CSR. Cp reste en service" }
  ],
  comprendre: [
    { quand: "Commençons par le P S C", montre: "3D" },
    { quand: "Il est en série avec l'auxiliaire", montre: "il reste sous tension en permanence" },
    { quand: "À la mise sous tension, il donne au moteur", montre: "Le PSC —" },
    { quand: "Le P S C équipe les petits moteurs", montre: "PSC : un condensateur permanent, aucun relais" },
    { quand: "Le C S R ajoute un condensateur de démarrage", montre: "Le CSR —" },
    { quand: "On emploie le relais de tension au-delà", montre: "Relais de tension ou relais d'intensité" },
    { quand: "La bobine du relais de tension est très résistante", montre: "sa bobine est très résistante" },
    { quand: "En prenant de la vitesse", montre: "en prenant de la vitesse, le moteur fait monter la tension" },
    { quand: "Ce relais réagit à la vitesse du moteur", montre: "le relais de tension réagit à la vitesse du moteur" }
  ],
  manipuler: [
    { quand: "Regardez d'abord l'exemple résolu", montre: "Exemple résolu. Sur le premier schéma" },
    { quand: "Sur le premier schéma, le P S C", montre: "PSC. Exemple résolu." },
    { quand: "À vous maintenant. Un compresseur est monté", montre: "CSR. À vous maintenant." },
    { quand: "Trois choses sont proposées", montre: "Que sait faire cet appareil" },
    { quand: "Ensuite, regardez la carte", montre: "Le câblage" },
    { quand: "Le condensateur de démarrage n'est jamais placé", montre: "Cd n'est jamais branché entre la borne 2" },
    { quand: "Un condensateur reste chargé après la coupure", montre: "Un condensateur reste chargé après la coupure" }
  ],
  representer: [
    { quand: "Quatre symboles. La bobine du relais", montre: "Le symbole normalisé" },
    { quand: "La bobine du relais est un rectangle", montre: "Bobine du relais" },
    { quand: "Le contact est un trait oblique", montre: "Contact fermé au repos" },
    { quand: "Le condensateur est formé de deux traits", montre: "Condensateur" },
    { quand: "Le Klixon est un cercle traversé", montre: "Klixon" },
    { quand: "Regardez maintenant le schéma du C S R", montre: "Schéma du CSR." },
    { quand: "L'alimentation, le Klixon, la borne C", montre: "Lisez de haut en bas" },
    { quand: "À gauche, le principal", montre: "À gauche, le principal" },
    { quand: "Sur la première, le condensateur permanent", montre: "Sur la première branche, le condensateur permanent" },
    { quand: "Le repère K A est écrit deux fois", montre: "Schéma du CSR." },
    { quand: "Sur le schéma, la bobine est à droite", montre: "La bobine KA est à droite" }
  ]
};
