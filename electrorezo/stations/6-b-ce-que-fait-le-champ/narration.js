/* ÉlectroRézo 6.B : textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits le 29/10/2026, guidage repris le 29/10/2026 (la voix montre l'écran).
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `À la station précédente, vous avez vu d'où vient le champ magnétique. C'est la zone où un aimant, ou une bobine
parcourue par un courant, agit sans rien toucher. Ici, vous voyez ce qu'il fait.
Regardez le premier croquis. Un fil est posé entre les deux pôles d'un aimant : le pôle nord en haut, le pôle sud en bas. La
flèche verte, marquée courant, suit le fil. La flèche rouge, marquée mouvement, part sur le côté : le fil est poussé de ce côté.
Regardez maintenant le second dessin : un moteur démonté. Les mots stator et rotor à cage sont écrits sur le dessin. Les
bobines du stator créent un champ. Le rotor, au milieu, est poussé par ce champ, et il tourne.
La question de cette station est en gras, dans la carte « De quoi on parle » : le champ attire le fer et oriente une boussole,
mais comment fait-il tourner un moteur ?`,

  comprendre: `Regardez le grand dessin, au-dessus des sept boutons. Il avance par étapes, et la voix appuie sur les boutons pour vous.
Les points clairs sont le courant. Le bleu tireté est le champ.
Première étape : le champ attire le fer. La bobine, enroulée sur son noyau, est alimentée. La plaque de fer, à droite, est
l'armature. Elle vient se coller, malgré le ressort qui la retient. C'est ce que fait la bobine d'un contacteur.
Deuxième étape : le champ oriente un aimant. Regardez la boussole, à droite de l'aimant. Elle tourne, hésite, puis se place
le long des lignes de champ. Sa pointe grise, son pôle sud, regarde le pôle nord de l'aimant. Les pôles de noms contraires
s'attirent.
Troisième étape : le champ pousse un fil. Le fil est posé entre les deux pôles, en travers des lignes de champ. Ce sont les
traits bleus tiretés, de haut en bas. Le courant passe, de l'arrière vers vous. Regardez le fil : il quitte le pointillé
orange, sa place de départ, et part sur le côté, vers la droite.
Quatrième étape : on inverse le courant. Il va maintenant de vous vers l'arrière. Regardez le fil : il part vers la gauche.
Cinquième étape : on tourne le fil dans le sens des lignes de champ, de haut en bas. Le courant passe, et le fil ne bouge pas.
Pour être poussé, le fil doit être en travers des lignes de champ.
Sous le dessin, regardez la ligne « La poussée part en travers ». La poussée part toujours sur le côté : ni dans le sens du
courant, ni vers un pôle.
Sixième étape : un cadre de fil, entre un pôle nord à gauche et un pôle sud à droite. Le courant monte d'un côté du cadre et
descend de l'autre. Les deux côtés sont poussés en sens contraires, et le cadre tourne sur son axe, jusqu'à ce que le petit
ressort en spirale, en haut de l'axe, le retienne. C'est le principe des appareils de mesure à aiguille.
Septième étape : le moteur triphasé. Trois bobines fixes, trois courants décalés, et le champ se met à tourner. Regardez la
marque rouge, le pôle nord, et la marque bleue, le pôle sud : elles font le tour du stator. Le rotor, au milieu, est poussé par
ce champ, et il le suit, un peu moins vite. La station deux point six et la station six point trois vous l'expliquent en détail.
Sous le dessin, les mêmes idées sont écrites, ligne par ligne. Regardez maintenant la carte « Où vous le verrez » : le
contacteur, l'électrovanne, la boussole, le moteur.`,

  manipuler: `Ici, vous prévoyez de quel côté part le fil.
Regardez d'abord l'exemple résolu, en vert. Le fil part vers la droite. On inverse le courant : il part vers la gauche. On a
changé une seule chose, et le fil est parti de l'autre côté. La ligne « Où » dit où regarder. La ligne « Comment » dit quoi
regarder : de quel côté du pointillé part le fil, avant et après.
Regardez maintenant la carte « Prévoir où part le fil ». La méthode tient en cinq lignes. Repérer le sens du courant, puis les
pôles de l'aimant. Partir d'un cas connu, celui du dessin, et compter les changements. La dernière ligne parle d'un fil posé
le long des lignes de champ.
En rouge, dans la même carte, un piège à éviter. Lisez-le avant de répondre.
À vous maintenant. Les questions deux à quatre sont guidées : elles disent où regarder. Les questions cinq et six se font seul.`,

  representer: `Trois symboles s'affichent dans la carte « Les symboles normalisés ». Sur un schéma électrique, le champ ne se dessine pas.
On dessine la bobine qui le crée, et le moteur qu'il fait tourner.
Le premier symbole est la bobine qui attire : un rectangle, celle d'un contacteur ou d'un relais. Vous la retrouverez à la station
huit point huit.
Le deuxième est le moteur monophasé : un rond, la lettre M, et dessous, le chiffre un et le signe tilde.
Le troisième est le moteur triphasé : le même rond, avec le chiffre trois, et ses trois bornes.
Le sens de rotation n'est pas dans le symbole. Il est donné par une flèche, sur le plan ou sur le carter de la machine.`
};

/* Le guidage : ce que l'écran montre pendant que la voix parle (moteur : _commun/station.js, « Le guidage »). */
window.GUIDAGE = {
  decouvrir: [
    { quand: "À la station précédente, vous avez", montre: "Le champ met en mouvement" },
    { quand: "Regardez le premier croquis", montre: "Le champ pousse un fil." },
    { quand: "Regardez maintenant le second dessin", montre: "Et le moteur tourne." },
    { quand: "La question de cette station", montre: "Le champ magnétique attire le fer et oriente une boussole" }
  ],
  comprendre: [
    { quand: "Regardez le grand dessin", montre: "Ce que fait le champ, en sept étapes.", clic: "1 Il attire le fer" },
    { quand: "Première étape : le champ attire", montre: "Ce que fait le champ, en sept étapes.", clic: "1 Il attire le fer" },
    { quand: "Deuxième étape : le champ oriente", montre: "Ce que fait le champ, en sept étapes.", clic: "2 Il oriente un aimant" },
    { quand: "Troisième étape : le champ pousse", montre: "Ce que fait le champ, en sept étapes.", clic: "3 Il pousse un fil" },
    { quand: "Quatrième étape : on inverse", montre: "Ce que fait le champ, en sept étapes.", clic: "4 Le courant inversé" },
    { quand: "Cinquième étape : on tourne", montre: "Ce que fait le champ, en sept étapes.", clic: "5 Le fil le long des lignes" },
    { quand: "Sous le dessin, regardez la ligne", montre: "La poussée part en travers" },
    { quand: "Sixième étape : un cadre", montre: "Ce que fait le champ, en sept étapes.", clic: "6 Le cadre tourne" },
    { quand: "Septième étape : le moteur", montre: "Ce que fait le champ, en sept étapes.", clic: "7 Le champ tourne" },
    { quand: "Sous le dessin, les mêmes idées", montre: "une bobine alimentée attire une pièce de fer" },
    { quand: "Regardez maintenant la carte « Où", montre: "Où vous le verrez" }
  ],
  manipuler: [
    { quand: "Ici, vous prévoyez de quel côté", montre: "Prévoir le mouvement" },
    { quand: "Regardez d'abord l'exemple résolu", montre: "Le fil est poussé vers la droite. On inverse le courant. Où part le fil" },
    { quand: "La ligne « Où » dit", montre: "puis sur « 4 Le courant inversé »" },
    { quand: "La ligne « Comment » dit", montre: "regardez de quel côté du pointillé part le fil" },
    { quand: "Regardez maintenant la carte « Prévoir", montre: "Prévoir où part le fil" },
    { quand: "En rouge, dans la même carte", montre: "La poussée ne va ni dans le sens du courant" },
    { quand: "À vous maintenant. Les questions deux", montre: "On garde le même courant, et on retourne l’aimant" },
    { quand: "Les questions cinq et six", montre: "Que fait le cadre ?" }
  ],
  representer: [
    { quand: "Trois symboles s'affichent", montre: "Les symboles normalisés" },
    { quand: "Le premier symbole", montre: "La bobine qui attire" },
    { quand: "Le deuxième est le moteur monophasé", montre: "Le moteur monophasé" },
    { quand: "Le troisième est le moteur triphasé", montre: "Le moteur triphasé" },
    { quand: "Le sens de rotation", montre: "Le sens de rotation n’est pas dans le symbole" }
  ]
};
