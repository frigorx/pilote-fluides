/* ÉlectroRézo 9.6 : textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits le 29/10/2026.
   Non validés, aucun MP3 fabriqué. Les lettres U et V se disent lettre par lettre. */
const NARRATION = {

  decouvrir: `Ce moteur monophasé n'a pas de condensateur. Il démarre grâce à une spire de Frager.
Regardez le dessin. À gauche, la bobine est alimentée en deux cent trente volts alternatif. Elle est posée sur
un côté du circuit magnétique. À droite, le rotor est un disque rond. Sa flèche donne le sens de rotation.
Regardez maintenant, en haut à droite du rotor, au bord du circuit magnétique : un tout petit anneau orange.
C'est la spire de Frager.
Le texte à côté du dessin dit où on trouve ce moteur. Il entraîne de petits ventilateurs d'évaporateur et de vitrine. Au bornier, il n'a que deux fils et la terre.`,

  comprendre: `Regardez le premier dessin : une bobine et un rotor, rien d'autre. Ce moteur n'a qu'un seul enroulement.
Le couple est la force qui fait tourner l'arbre. Au démarrage, le couple de ce moteur est nul : il ne démarre pas
seul, il vibre. Si on le lance à la main, il démarre et continue dans le sens où on l'a lancé.
Il lui faut donc une aide au démarrage. Il en existe trois : une spire de Frager, un enroulement supplémentaire
ou un condensateur. Toutes créent un déphasage, c'est-à-dire un décalage dans le temps. Ce déphasage donne un sens
de rotation. Les deux autres aides sont rappelées à droite, dans les variantes. Les stations neuf point deux à
neuf point quatre les traitent. Ici, c'est la spire.
Regardez le deuxième dessin. Le petit anneau orange, au bord du circuit magnétique, côté rotor, c'est la spire de
Frager. Elle est posée sur un coin du pôle. Elle est en court-circuit : l'anneau est fermé sur lui-même. Aucun fil
ne l'alimente. Son courant est induit : c'est la bobine qui le fait naître. Le rotor tourne alors dans le sens de
la flèche.
Voyons d'où vient ce courant. Regardez l'animation, sous les deux dessins : le même moteur, au ralenti.
D'abord, le courant alternatif traverse la bobine, à gauche. Il va dans un sens, puis dans l'autre.
Parcourue par le courant, la bobine devient un aimant : elle crée un champ magnétique, en bleu. Le fer le guide
jusqu'au rotor. Le champ suit le courant : il grandit, s'annule, repart dans l'autre sens. Il va et vient sans
tourner, et le rotor vibre.
Maintenant, regardez l'anneau orange. Le champ le traverse. Un champ qui change fait naître un courant dans
l'anneau : c'est le courant induit. Aucun fil ne l'alimente. Ce courant crée à son tour un champ, décalé dans le
temps.
Ce champ décalé donne un sens de rotation : le rotor démarre et tourne, toujours dans le même sens.
Ce moteur a deux limites. Son couple est faible, donc on ne le trouve pas sur un compresseur. Et son sens de
rotation est fixé par construction. Rien ne s'inverse au bornier. Permuter la phase et le neutre ne change pas
le sens d'un moteur monophasé.
On le trouve sur de petits ventilateurs d'évaporateur et de vitrine. Au bornier, il a deux fils et la terre.
Il n'y a ni condensateur ni relais à brancher.
Vous connaissez déjà cet anneau. Regardez le dernier dessin, sous l'animation : un contacteur démonté.
Cherchez la bague de déphasage, à gauche du dessin. C'est le même anneau. À la station six point un, elle empêche
les vibrations, car sans elle l'attraction s'annulerait cent fois par seconde. Dans le moteur, le même anneau aide
au démarrage.`,

  manipuler: `Cet exercice a deux parties : un exemple résolu, puis votre tour.
Voici d'abord l'exemple résolu. Le moteur de la station neuf point quatre porte un condensateur permanent et un
enroulement auxiliaire. Il n'a pas de spire.
À vous maintenant. Regardez le dessin du moteur à spire de Frager, celui d'un petit ventilateur d'évaporateur.
Sous le dessin, trois phrases décrivent la spire et le bornier.
Dessous, trois propositions, chacune avec sa définition. Cochez ce que ce moteur porte.
Puis appuyez sur Valider. Le résultat s'affiche juste dessous.
Ensuite, regardez le câblage, à droite. Aucun fil n'arrive à la spire. Rien ne s'inverse au bornier. Avant de toucher au
bornier, consignez le circuit et vérifiez l'absence de tension.`,

  representer: `Regardez le symbole, à gauche : un rond avec la lettre M et le signe un tilde. Le un dit une phase. Le tilde dit
courant alternatif.
Les bornes sont en haut du symbole : deux, U et V. Aucun condensateur n'est dessiné. Dans le bornier, la terre
s'ajoute aux deux fils.
Sur ce symbole, la spire n'est pas dessinée. Le symbole d'un moteur à spire de Frager est celui
d'un moteur monophasé à deux fils.
Le symbole seul ne dit pas que le moteur est à spire de Frager. La spire se voit sur le dessin du moteur, en bas du
texte, à droite : un petit anneau orange, au bord du circuit magnétique.`
};

/* Le guidage : ce que l'écran montre pendant que la voix parle (moteur : _commun/station.js, « Le guidage »). */
window.GUIDAGE = {
  decouvrir: [
    { quand: "Ce moteur monophasé n'a pas de condensateur", montre: "Un moteur monophasé à un seul enroulement ne démarre pas seul" },
    { quand: "Regardez le dessin. À gauche", montre: "Le moteur à spire de Frager." },
    { quand: "Le texte à côté du dessin", montre: "Ce moteur entraîne de petits ventilateurs" }
  ],
  manipuler: [
    { quand: "Cet exercice a deux parties", montre: "Que sait faire cet appareil" },
    { quand: "Voici d'abord l'exemple résolu", montre: "Exemple résolu. Le moteur PSC" },
    { quand: "À vous maintenant. Regardez le dessin", montre: "Le moteur à spire de Frager." },
    { quand: "Sous le dessin, trois phrases", montre: "La spire de Frager est un petit anneau en court-circuit" },
    { quand: "Dessous, trois propositions", montre: "Que sait faire cet appareil" },
    { quand: "Puis appuyez sur Valider", montre: "Valider" },
    { quand: "Ensuite, regardez le câblage", montre: "Le câblage" },
    { quand: "Aucun fil n'arrive à la spire", montre: "Aucun fil n'arrive à la spire" },
    { quand: "Rien ne s'inverse au bornier", montre: "Rien ne s'inverse au bornier" },
    { quand: "Avant de toucher au bornier", montre: "Avant de toucher au bornier" }
  ],
  representer: [
    { quand: "Regardez le symbole, à gauche", montre: "un rond avec la lettre M et le signe 1" },
    { quand: "Dans le bornier, la terre", montre: "Dans le bornier, la terre s'ajoute" },
    { quand: "Sur ce symbole, la spire", montre: "Cherchez la spire sur ce symbole" },
    { quand: "Le symbole seul ne dit pas", montre: "Le symbole seul ne dit donc pas" },
    { quand: "La spire se voit sur le dessin du moteur", montre: "La spire est le petit anneau orange" }
  ],
  comprendre: [
    { quand: "Regardez le premier dessin", montre: "Sans aide au démarrage" },
    { quand: "Il lui faut donc une aide", montre: "il en existe trois" },
    { quand: "Les deux autres aides sont rappelées", montre: "Les variantes" },
    { quand: "Regardez le deuxième dessin", montre: "Avec la spire" },
    { quand: "Voyons d'où vient ce courant", montre: "Le courant induit, au ralenti" },
    { quand: "D'abord, le courant alternatif", montre: "Le courant induit, au ralenti", clic: "1 Le courant" },
    { quand: "Parcourue par le courant", montre: "Le courant induit, au ralenti", clic: "2 Le champ" },
    { quand: "Maintenant, regardez l'anneau orange", montre: "Le courant induit, au ralenti", clic: "3 L’anneau" },
    { quand: "Ce champ décalé donne un sens", montre: "Le courant induit, au ralenti", clic: "4 Le rotor tourne" },
    { quand: "Ce moteur a deux limites", montre: "il est faible. On ne trouve" },
    { quand: "On le trouve sur de petits ventilateurs", montre: "ce moteur a deux fils et la" },
    { quand: "Vous connaissez déjà cet anneau", montre: "Le même anneau dans un contacteur." }
  ]
};
