/* ÉlectroRézo 9.8 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits le 29/10/2026.
   Non validés, aucun MP3 fabriqué. Les lettres C, S, R se disent lettre par lettre.
   Les schémas n'ont pas de flèche de rotation : la voix dit le sens avec des mots. */
const NARRATION = {

  decouvrir: `Un moteur monophasé tourne dans un sens. Parfois, il faut le faire tourner dans l'autre.
En triphasé, vous savez déjà faire : on permute deux phases. En monophasé, le geste change. On croise
les deux fils d'un seul enroulement, l'enroulement auxiliaire ou l'enroulement principal.
Regardez les deux schémas côte à côte. Le premier est avant le croisement, le second après. Sur le premier,
à droite du moteur, il y a les deux fils de l'auxiliaire. Sur le second schéma, ils sont croisés. Le moteur
tourne alors dans l'autre sens. Les schémas n'ont pas de flèche de rotation : c'est le texte qui vous dit le sens.
Un moteur prévu pour deux sens a au moins quatre bornes. On en rencontre peu aujourd'hui, surtout sur
certains compresseurs ouverts. Un compresseur hermétique, lui, n'a que trois bornes.
Avant de toucher un fil, vous consignez le circuit, et vous vérifiez l'absence de tension.`,

  comprendre: `Regardez la ligne de six points, en haut de la carte. Ils vont s'ouvrir l'un après l'autre.
Le premier point, c'est la consignation. Vous consignez le circuit, puis vous vérifiez l'absence de
tension. Si le moteur a un condensateur, vous le déchargez avec une résistance, jamais avec un
tournevis. La consignation est à la station six point sept, la décharge du condensateur à la station
neuf point cinq.
Le deuxième point, c'est la lecture. Vous lisez la plaque signalétique. Puis vous regardez à
l'intérieur du couvercle du bornier : le schéma de raccordement s'y trouve souvent. Il dit si le moteur
est prévu pour deux sens.
Le troisième point, ce sont les deux fils d'un même enroulement. Sur le schéma de raccordement, vous
cherchez les deux fils du principal, puis les deux fils de l'auxiliaire. Sur le schéma juste au-dessus du titre,
le principal est en haut du moteur et l'auxiliaire à droite.
Le quatrième point, c'est de repérer chaque fil avant de le débrancher. Sans repère, vous ne saurez plus où il va.
Le cinquième point est le geste lui-même. Vous croisez les deux fils d'un seul enroulement. Sur le schéma
juste au-dessus du titre, ce sont les fils de l'auxiliaire. Le courant change de sens dans cet enroulement. Au démarrage, la poussée magnétique change de sens aussi, et le
moteur tourne dans l'autre sens.
Le sixième point est une limite. N'échangez jamais un fil du principal avec un fil de l'auxiliaire : le
moteur grille, en général peu après la mise sous tension. Croiser les deux fils d'un même enroulement
donne le sens. Échanger des fils entre les deux enroulements est un autre geste.
Vous pourriez penser à une permutation, comme en triphasé. En monophasé, permuter la phase et le
neutre ne change pas le sens du moteur.`,

  manipuler: `Maintenant, vous raisonnez sur des cas. Il y a sept exercices, sans note.
Le premier est résolu : imitez-le. Sur le premier schéma, avant le croisement, le fil du haut de l'auxiliaire va au
point commun C. Sur le second, les deux fils de l'auxiliaire sont croisés.
Sous les schémas, la ligne Où dit où regarder. La ligne Comment dit comment faire. Puis la ligne Réponse donne la solution.
Les questions deux, trois et quatre sont guidées : elles ont aussi leurs lignes Où et Comment. Vous répondez en
choisissant l'une des quatre propositions.
Les questions cinq, six et sept ne le disent plus, et c'est voulu. Vous choisissez seul votre méthode.
Pour vous aider, la méthode est rappelée à droite, dans l'ordre.
Dans l'encadré rouge, un danger à connaître : lisez-le avant de toucher à un fil.
Avant de toucher un fil, on consigne le circuit : la carte en dessous rappelle comment.`,

  representer: `Regardez le premier schéma, à gauche. Le moteur monophasé est un rond marqué M, avec le signe un et une petite
vague. Ici, il a quatre fils sortis. Les deux fils du haut sont ceux du principal. Les deux fils de droite sont ceux
de l'auxiliaire. Le point commun est repéré par la lettre C.
Comparez les deux schémas. Sur le premier, le fil du haut de l'auxiliaire va au point commun. Sur le second, il va
à l'alimentation, et l'autre fil va au point commun. Les deux fils sont croisés. Le principal n'a pas bougé.
Le troisième dessin, à droite, est le bornier d'un compresseur hermétique : trois vis, et le Klixon relié à la
première. Avec trois bornes, croiser deux fils échangerait un fil du principal avec un fil de l'auxiliaire. On
ne croise rien.`
};

/* Le guidage : ce que l'écran montre pendant que la voix parle (moteur : _commun/station.js, « Le guidage »).
   Temps deux : le clic ouvre un point de la ligne, puis le cadre se pose sur le geste décrit (le panneau est refait au clic).
   Temps trois : aucun clic, l'élève répond seul. */
window.GUIDAGE = {
  decouvrir: [
    { quand: "Un moteur monophasé tourne dans un sens", montre: "Un moteur monophasé tourne dans le mauvais sens" },
    { quand: "En triphasé, vous savez déjà faire", montre: "Faire tourner un moteur monophasé dans l'autre sens" },
    { quand: "Regardez les deux schémas côte à côte", montre: "Avant et après le croisement" },
    { quand: "Sur le premier, à droite du moteur", montre: "Avant le croisement." },
    { quand: "Sur le second schéma, ils sont croisés", montre: "Après le croisement." },
    { quand: "Les schémas n'ont pas de flèche", montre: "Le schéma n'a pas de flèche de rotation" },
    { quand: "Un moteur prévu pour deux sens a au moins", montre: "Sur un moteur prévu pour deux sens" }
  ],
  comprendre: [
    { quand: "Regardez la ligne de six points", montre: "Le geste :" },
    { quand: "Le premier point, c'est la consignation", montre: "Le geste :", clic: "1" },
    { quand: "Vous consignez le circuit, puis", montre: "Le geste :" },
    { quand: "Le deuxième point, c'est la lecture", montre: "Le geste :", clic: "2" },
    { quand: "Vous lisez la plaque signalétique", montre: "Le geste :" },
    { quand: "Le troisième point, ce sont les deux fils", montre: "Le geste :", clic: "3" },
    { quand: "Sur le schéma de raccordement, vous", montre: "Le geste :" },
    { quand: "Le quatrième point, c'est de repérer", montre: "Le geste :", clic: "4" },
    { quand: "Sans repère, vous ne saurez", montre: "Le geste :" },
    { quand: "Le cinquième point est le geste", montre: "Le geste :", clic: "5" },
    { quand: "Vous croisez les deux fils d'un seul", montre: "Le geste :" },
    { quand: "Le sixième point est une limite", montre: "Le geste :", clic: "6" },
    { quand: "N'échangez jamais un fil du principal", montre: "Le geste :" },
    { quand: "Vous pourriez penser à une permutation", montre: "permuter la phase et le neutre ne change pas le sens" }
  ],
  manipuler: [
    { quand: "Maintenant, vous raisonnez sur des cas", montre: "Sept exercices, sans note" },
    { quand: "Le premier est résolu", montre: "Exemple résolu" },
    { quand: "Sur le premier schéma, avant le croisement", montre: "Avant : le fil du haut de l'auxiliaire va à C." },
    { quand: "Sur le second, les deux fils", montre: "Après : les deux fils de l'auxiliaire sont croisés." },
    { quand: "Sous les schémas, la ligne Où", montre: "Où : sur les deux schémas" },
    { quand: "La ligne Comment dit comment", montre: "Comment : suivez le fil du haut" },
    { quand: "Puis la ligne Réponse", montre: "Réponse : Le courant change de sens dans l'auxiliaire" },
    { quand: "Les questions deux, trois et quatre", montre: "Sur le même moteur, on croise les deux fils du principal" },
    { quand: "Vous répondez en choisissant", montre: "A. Non : seul l'auxiliaire compte." },
    { quand: "Les questions cinq, six et sept", montre: "Un compresseur hermétique monophasé tourne" },
    { quand: "Pour vous aider, la méthode", montre: "La méthode, dans l'ordre" },
    { quand: "Dans l'encadré rouge, un danger", montre: "Échanger un fil du principal avec un fil de l'auxiliaire : le moteur grille" },
    { quand: "Avant de toucher un fil, on consigne", montre: "Avant de toucher : habilitation et consignation" }
  ],
  representer: [
    { quand: "Regardez le premier schéma, à gauche", montre: "Avant : le moteur monophasé à quatre fils sortis" },
    { quand: "Comparez les deux schémas", montre: "Les deux schémas à lire" },
    { quand: "Sur le premier, le fil du haut", montre: "Avant : le moteur monophasé à quatre fils sortis" },
    { quand: "Sur le second, il va à l'alimentation", montre: "Après : les deux fils de l'auxiliaire sont croisés." },
    { quand: "Le troisième dessin, à droite", montre: "trois vis repérées 1, 2 et 3, et le Klixon" },
    { quand: "Avec trois bornes, croiser deux fils", montre: "Sur le bornier du compresseur hermétique, il y a trois bornes" }
  ]
};
