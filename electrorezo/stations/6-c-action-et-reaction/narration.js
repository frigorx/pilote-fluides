/* ÉlectroRézo 6.C : textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits le 29/10/2026, repris le même jour pour que la voix montre l'écran.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Un aimant, ou une bobine parcourue par un courant, crée un champ magnétique. Cette station montre l'inverse : un champ qui change fait naître un courant, dans un circuit fermé.
Regardez le premier croquis. À gauche, un aimant entre dans une bobine. À droite, le galvanomètre : un appareil à aiguille qui détecte un courant. Quand l'aimant bouge, l'aiguille dévie. Quand il s'arrête, elle revient à zéro.
Regardez maintenant le second dessin : un transformateur. Le primaire est à gauche, le secondaire à droite, et les flèches jaunes montrent le champ dans le fer. Le champ du primaire change sans arrêt, et il fait naître une tension au secondaire. Le transformateur vit de ce courant.
Regardez maintenant la question en gras : elle demande pourquoi un aimant qui bouge fait naître un courant, et ce que fait ce courant.
Ce courant s'appelle le courant induit. Il dure tant que le champ change, et il s'oppose toujours au changement qui l'a fait naître : à chaque action du champ répond une réaction.`,

  comprendre: `Trois dessins, l'un sous l'autre. Les boutons se pressent tout seuls.
Premier dessin : l'aimant et la bobine. L'aimant crée un champ magnétique. En bas, le galvanomètre : son aiguille dévie quand un courant passe.
Première étape : le pôle nord de l'aimant entre. L'aiguille dévie, et des points clairs parcourent la bobine : c'est le courant induit.
Regardez maintenant le bout gauche de la bobine. Il devient un pôle nord, en rouge, face au pôle nord de l'aimant. La bobine repousse l'aimant qui entre.
Deuxième étape : l'aimant reste immobile. L'aiguille revient à zéro. Le champ ne change plus : il n'y a plus de courant.
Troisième étape : on retire l'aimant. L'aiguille dévie de l'autre côté : le courant a changé de sens. Le bout gauche de la bobine devient un pôle sud, en bleu : elle retient l'aimant qui s'en va.
Quatrième étape : cette fois, l'aimant ne bouge pas. C'est la bobine qui vient vers lui. L'aiguille dévie comme à la première étape. Ce qui compte, c'est que le champ change dans la bobine.
Deuxième dessin : un balancier en cuivre. Son bas passe entre les deux pôles d'un électroaimant.
Électroaimant éteint, le balancier oscille longtemps, une centaine de fois.
On allume l'électroaimant : le champ apparaît, en bleu, et le balancier s'arrête net. Le cuivre n'est pas attiré, et pourtant il s'arrête. En traversant le champ, le métal voit le champ changer : des courants induits y naissent et s'opposent à son mouvement.
Troisième dessin : un anneau dans un champ alternatif. La bobine de gauche est alimentée en alternatif, comme le dit le signe tilde. Le courant va dans un sens, puis dans l'autre. Les tirets bleus montrent le champ. Il grandit, s'annule, repart dans l'autre sens. Il change sans arrêt.
Voici l'anneau orange, à droite. Le champ le traverse. Un courant induit naît dans l'anneau, sans aucun fil. Il crée son propre champ, en bleu clair, décalé dans le temps. Ce courant s'oppose au changement.
Dernière étape : à la place de l'anneau, une deuxième bobine, reliée à une lampe. La lampe s'allume : c'est le secondaire du transformateur. En continu, une fois le courant établi, le champ ne changerait plus, et la lampe resterait éteinte.
Sous les dessins, le texte résume tout. Un champ qui change fait naître un courant. Il dure tant que le champ change. Il s'oppose au changement.
Dernier point : où vous le rencontrerez. Le transformateur : le champ du primaire fait naître la tension du secondaire. La bague de déphasage : c'est le même anneau, et son courant induit évite que le contacteur vibre. La spire de Frager : le même anneau, qui fait démarrer un petit moteur. Le frein à induction : des courants induits freinent la roue d'un camion.`,

  manipuler: `Ici, vous prévoyez le courant induit. Six exercices, sans note.
Lisez d'abord l'exemple résolu. On enfonce le pôle nord d'un aimant dans une bobine, puis on le laisse immobile.
La réponse est dans l'encadré vert : l'aiguille dévie pendant que l'aimant entre, puis revient à zéro. Le courant dure tant que le champ change.
Regardez maintenant la méthode, ligne par ligne.
Première ligne : demandez-vous si le champ change.
Deuxième ligne : s'il ne change pas, il ne naît aucun courant.
Troisième ligne : s'il change, un courant naît, tant que dure le changement.
Quatrième ligne : ce courant s'oppose au changement. Elle donne trois exemples.
Le piège, en rouge : un aimant puissant mais immobile ne fait naître aucun courant.
À vous maintenant. Les questions guidées ont deux lignes d'aide, Où et Comment. Pressez la proposition choisie : la page vous répond aussitôt.
Les questions cinq et six se font seul : choisissez vous-même votre méthode.`,

  representer: `Le courant induit ne se dessine pas. On dessine l'objet où il naît.
Le premier symbole est le transformateur : deux cercles qui se chevauchent, le primaire et le secondaire.
Le deuxième est la bobine à noyau de fer : les demi-cercles sont les spires, et le trait droit au-dessus est le noyau.
Une bobine comme celle-là s'oppose aux changements de son propre courant. Quand on coupe ce courant, une étincelle jaillit à l'interrupteur.
Le troisième est la bobine d'un contacteur : un rectangle.
Dernière remarque : la bague de déphasage et la spire de Frager n'ont pas de symbole. Elles font partie de l'appareil, contacteur ou moteur.`
};

/* Le guidage : ce que l'écran montre pendant que la voix parle (moteur : _commun/station.js, « Le guidage »).
   Quand la voix décrit un mouvement, le bouton est pressé à nouveau : l'aimant repart, l'aiguille dévie de nouveau. */
window.GUIDAGE = {
  decouvrir: [
    { quand: "Un aimant, ou une bobine parcourue", montre: "Un champ qui change" },
    { quand: "Regardez le premier croquis", montre: "Un aimant qui bouge fait naître un courant." },
    { quand: "Regardez maintenant le second dessin", montre: "Le transformateur vit de ce courant." },
    { quand: "Regardez maintenant la question en gras", montre: "Un aimant immobile dans une bobine ne fait rien" },
    { quand: "Ce courant s'appelle le courant induit", montre: "Il dure tant que le champ change" }
  ],
  comprendre: [
    { quand: "Trois dessins, l'un sous l'autre", montre: "Action et réaction, en trois dessins" },
    { quand: "Premier dessin : l'aimant et la bobine", montre: "L’aimant et la bobine." },
    { quand: "Première étape : le pôle nord de l'aimant entre", montre: "L’aimant et la bobine.", clic: "1 L’aimant entre" },
    { quand: "L'aiguille dévie, et des points clairs", montre: "L’aimant et la bobine.", clic: "1 L’aimant entre" },
    { quand: "Il devient un pôle nord, en rouge", montre: "L’aimant et la bobine.", clic: "1 L’aimant entre" },
    { quand: "Deuxième étape : l'aimant reste immobile", montre: "L’aimant et la bobine.", clic: "2 L’aimant reste" },
    { quand: "Troisième étape : on retire l'aimant", montre: "L’aimant et la bobine.", clic: "3 L’aimant sort" },
    { quand: "Le bout gauche de la bobine devient un pôle sud", montre: "L’aimant et la bobine.", clic: "3 L’aimant sort" },
    { quand: "C'est la bobine qui vient vers lui", montre: "L’aimant et la bobine.", clic: "4 La bobine bouge" },
    { quand: "Deuxième dessin : un balancier en cuivre", montre: "Le balancier en cuivre." },
    { quand: "Électroaimant éteint, le balancier oscille", montre: "Le balancier en cuivre.", clic: "Électroaimant éteint" },
    { quand: "On allume l'électroaimant : le champ apparaît", montre: "Le balancier en cuivre.", clic: "Électroaimant allumé" },
    { quand: "Troisième dessin : un anneau", montre: "Un anneau dans un champ alternatif.", clic: "1 Le champ alternatif" },
    { quand: "Voici l'anneau orange, à droite", montre: "Un anneau dans un champ alternatif.", clic: "2 L’anneau" },
    { quand: "Dernière étape : à la place de l'anneau", montre: "Un anneau dans un champ alternatif.", clic: "3 Le secondaire" },
    { quand: "Sous les dessins, le texte résume tout", montre: "Un champ qui change fait naître un courant" },
    { quand: "Il dure tant que le champ change", montre: "Il dure tant que le champ change" },
    { quand: "Il s'oppose au changement", montre: "Il s’oppose au changement" },
    { quand: "Dernier point : où vous le rencontrerez", montre: "Où vous le rencontrerez" },
    { quand: "Le transformateur : le champ du primaire", montre: "Le transformateur : le champ alternatif du primaire" },
    { quand: "La bague de déphasage : c'est le même anneau", montre: "La bague de déphasage du contacteur : un anneau" },
    { quand: "La spire de Frager : le même anneau", montre: "La spire de Frager : le même anneau" },
    { quand: "Le frein à induction : des courants", montre: "Le frein à induction : un disque" }
  ],
  manipuler: [
    { quand: "Ici, vous prévoyez le courant induit", montre: "Prévoir le courant induit" },
    { quand: "Lisez d'abord l'exemple résolu", montre: "On enfonce le pôle nord d’un aimant dans une bobine" },
    { quand: "La réponse est dans l'encadré vert", montre: "Elle dévie un court instant pendant que l’aimant entre" },
    { quand: "Regardez maintenant la méthode", montre: "La méthode, ligne par ligne" },
    { quand: "Première ligne : demandez-vous", montre: "Demandez-vous si le champ qui traverse la bobine ou l’anneau" },
    { quand: "Deuxième ligne : s'il ne change pas", montre: "S’il ne change pas, il ne naît aucun courant" },
    { quand: "Troisième ligne : s'il change", montre: "S’il change, un courant induit naît" },
    { quand: "Quatrième ligne : ce courant", montre: "Ce courant s’oppose au changement" },
    { quand: "Le piège, en rouge", montre: "Un aimant puissant mais immobile" },
    { quand: "À vous maintenant. Les questions guidées", montre: "On retire l’aimant de la bobine" },
    { quand: "Les questions cinq et six", montre: "On alimente un transformateur en courant continu" }
  ],
  representer: [
    { quand: "Le courant induit ne se dessine pas", montre: "Le courant induit ne se dessine pas" },
    { quand: "Le premier symbole est le transformateur", montre: "Le transformateur" },
    { quand: "Le deuxième est la bobine à noyau de fer", montre: "La bobine à noyau de fer" },
    { quand: "Une bobine comme celle-là", montre: "La bobine à noyau de fer s’oppose aux changements de son propre courant" },
    { quand: "Le troisième est la bobine d'un contacteur", montre: "La bobine d’un contacteur" },
    { quand: "Dernière remarque : la bague de déphasage", montre: "La bague de déphasage et la spire de Frager n’ont pas de symbole" }
  ]
};
