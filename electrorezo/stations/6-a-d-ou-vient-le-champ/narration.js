/* ÉlectroRézo 6.A : textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits le 29/10/2026, guidage repris le 29/10/2026 (la voix montre l'écran).
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Regardez la première image. De la limaille de fer a été saupoudrée autour d'un aimant. Les grains dessinent des lignes,
d'un bout à l'autre de l'aimant. Ces lignes montrent le champ magnétique : la zone où l'aimant agit, sans rien toucher.
Regardez maintenant la deuxième image : une électrovanne. Sa bobine noire, au-dessus du corps en laiton, fait la même chose
qu'un aimant, mais seulement quand le courant passe. Son champ déplace le clapet qui ouvre ou ferme la vanne.
Regardez enfin la question en gras. Elle demande d'où vient la force qui attire le fer.
La suite montre d'où vient le champ : un aimant, un courant, une bobine, et un noyau de fer qui le renforce.`,

  comprendre: `Regardez le grand dessin. Il avance par étapes, et la voix appuie sur les boutons pour vous.
En haut à gauche, la flèche N montre le nord de la Terre.
Première étape : un aimant droit. Son pôle nord, à droite, est en rouge. Son pôle sud, à gauche, est en bleu. Les lignes de
champ, en bleu tireté, sortent du pôle nord, font le tour, et rentrent par le pôle sud. Autour de l'aimant, il y a des
boussoles. Une boussole est une petite aiguille aimantée, libre de tourner. Sa pointe rouge est son pôle nord : elle montre
où va le champ. Chaque boussole se place le long d'une ligne de champ.
Deuxième étape : un fil traverse un carton. Le courant monte dans le fil : ce sont les points clairs. Regardez les boussoles
posées sur le carton. Elles tournent et s'alignent sur des cercles autour du fil, les cercles en bleu tireté. Un courant crée
un champ, comme un aimant.
Troisième étape : le courant descend maintenant. Toutes les boussoles se retournent. Le sens du champ suit le sens
du courant.
Quatrième étape : on enroule le fil en bobine. Le courant passe, et la bobine se comporte comme un aimant. Son pôle nord,
rouge, est à un bout. Son pôle sud, bleu, est à l'autre. Regardez la boussole du coin, en haut à droite. Elle est loin de la
bobine : elle montre toujours le nord de la Terre.
Cinquième étape : on glisse un noyau de fer dans la bobine. C'est la barre grise, au milieu. Le champ devient plus fort, et le
fer le guide. La boussole du coin dévie : elle sent maintenant le champ de la bobine.
Sixième étape : on coupe le courant. Le champ de la bobine disparaît, et toutes les boussoles reviennent vers le nord de la
Terre. Le noyau de fer ne garde pas d'aimantation : sans courant, ce n'est plus un aimant.
Sous le dessin, les mêmes idées sont écrites, ligne par ligne. La dernière ligne donne le mot important : l'électroaimant.
C'est une bobine et son noyau de fer, un aimant qu'on allume et qu'on éteint. C'est la pièce commune au contacteur, au relais
et à l'électrovanne.
Regardez maintenant la carte « Ce que vous rencontrerez ». L'aimant permanent garde son champ sans courant : on ne peut pas
l'éteindre. L'électroaimant de levage soulève la ferraille, sur une grue. La bobine d'électrovanne s'enfile sur le noyau de la
vanne.`,

  manipuler: `Ici, vous prévoyez ce que fait une boussole, puis vous vérifiez une bobine sur le terrain.
Regardez d'abord l'exemple résolu, en vert. On inverse le courant dans le fil. Les boussoles se retournent toutes.
La ligne « Où » dit où regarder pour le retrouver. La ligne « Comment » dit comment s'y prendre : suivre une seule boussole,
avant et après.
À vous maintenant. Les questions deux à quatre sont guidées : chacune a sa ligne « Où » et sa ligne « Comment ».
Les questions cinq et six se font seul. Il n'y a plus de ligne « Où » : à vous de choisir votre méthode.
Dans la carte « Vérifier qu'une bobine crée son champ », vous trouvez la méthode du terrain : un tournevis, une pince
ampèremétrique et une boussole. Le tournevis et la pince se posent sur le noyau ou près de la bobine, jamais sur ses bornes.
Dans la même carte, un avertissement en rouge : ne retirez jamais une bobine d'électrovanne de son noyau quand elle est
alimentée.
Sous la méthode, la carte « Avant de toucher » rappelle qui peut intervenir sur une installation électrique.`,

  representer: `Quatre symboles s'affichent dans la carte « Les symboles normalisés ». Sur un plan, le champ ne se dessine pas : on dessine
ce qui le crée.
Le premier symbole est l'aimant permanent : un petit U noir, plein.
Le deuxième est une bobine à noyau de fer. Les demi-cercles sont les spires. Le trait droit, au-dessus, est le noyau.
Le troisième est la bobine d'un contacteur ou d'un relais : un rectangle, avec un fil qui arrive en haut et un fil qui
repart en bas. Vous le retrouverez à la station huit point huit.
Le quatrième est l'électrovanne : une bobine qui agit sur un clapet.
Regardez maintenant la dernière ligne de la carte « Le lire sur un plan ». Le champ se note B, et il se mesure en teslas.
Le champ de la Terre est très faible : environ zéro virgule zéro zéro zéro zéro cinq tesla. Dans l'entrefer d'un moteur, il
vaut de un à un et demi tesla.`
};

/* Le guidage : ce que l'écran montre pendant que la voix parle (moteur : _commun/station.js, « Le guidage »). */
window.GUIDAGE = {
  decouvrir: [
    { quand: "Regardez la première image", montre: "Le champ se voit." },
    { quand: "Regardez maintenant la deuxième image", montre: "Un courant le fabrique." },
    { quand: "Regardez enfin la question en gras", montre: "Un aimant attire le fer sans le toucher" }
  ],
  comprendre: [
    { quand: "Regardez le grand dessin", montre: "D’où vient le champ, en six étapes.", clic: "1 L’aimant" },
    { quand: "Première étape : un aimant droit", montre: "D’où vient le champ, en six étapes." },
    { quand: "Deuxième étape : un fil", montre: "D’où vient le champ, en six étapes.", clic: "2 Le fil" },
    { quand: "Troisième étape : le courant descend", montre: "D’où vient le champ, en six étapes.", clic: "3 Le courant inversé" },
    { quand: "Quatrième étape : on enroule", montre: "D’où vient le champ, en six étapes.", clic: "4 La bobine" },
    { quand: "Cinquième étape : on glisse", montre: "D’où vient le champ, en six étapes.", clic: "5 Le noyau de fer" },
    { quand: "Sixième étape : on coupe", montre: "D’où vient le champ, en six étapes.", clic: "6 Le courant coupé" },
    { quand: "Sous le dessin, les mêmes idées", montre: "il a deux pôles, nord et sud. Deux pôles" },
    { quand: "La dernière ligne donne le mot", montre: "une bobine et son noyau de fer. C’est la pièce commune" },
    { quand: "Regardez maintenant la carte", montre: "Ce que vous rencontrerez" },
    { quand: "L'aimant permanent garde son champ", montre: "Il garde son champ sans courant" },
    { quand: "L'électroaimant de levage soulève", montre: "sur une grue, il soulève la ferraille" },
    { quand: "La bobine d'électrovanne s'enfile", montre: "elle s’enfile sur le noyau de la vanne" }
  ],
  manipuler: [
    { quand: "Ici, vous prévoyez ce que fait", montre: "Prévoir ce que fait la boussole" },
    { quand: "Regardez d'abord l'exemple résolu", montre: "On inverse le courant dans le fil. Que font les boussoles" },
    { quand: "La ligne « Où » dit", montre: "puis sur « 3 Le courant inversé »" },
    { quand: "La ligne « Comment » dit", montre: "suivez une seule boussole, avant et après" },
    { quand: "À vous maintenant. Les questions deux", montre: "On inverse le courant dans une bobine. Que deviennent ses deux bouts" },
    { quand: "Les questions cinq et six", montre: "Vous approchez une pince ampèremétrique ouverte" },
    { quand: "Dans la carte « Vérifier", montre: "Vérifier qu’une bobine crée son champ" },
    { quand: "Dans la même carte, un avertissement", montre: "Ne retirez jamais une bobine" },
    { quand: "Sous la méthode", montre: "Avant de toucher : habilitation" }
  ],
  representer: [
    { quand: "Quatre symboles s'affichent", montre: "Les symboles normalisés" },
    { quand: "Le premier symbole", montre: "L’aimant permanent" },
    { quand: "Le deuxième est une bobine", montre: "La bobine à noyau de fer" },
    { quand: "Le troisième est la bobine", montre: "La bobine d’un contacteur" },
    { quand: "Le quatrième est l'électrovanne", montre: "L’électrovanne" },
    { quand: "Regardez maintenant la dernière ligne", montre: "Le champ se note" }
  ]
};
