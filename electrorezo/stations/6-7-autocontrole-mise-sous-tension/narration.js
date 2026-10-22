/* ÉlectroRézo 6.7 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Votre câblage est fini. Les fils sont posés, tout a l'air bon. Et c'est exactement à ce
moment-là qu'on se trompe le plus : on a envie que ça marche, alors on ferme le disjoncteur.
Je vais vous demander de faire autre chose. De vous contrôler vous-même, avant. C'est ce qu'on
appelle un autocontrôle. Pas pour faire plaisir au professeur : parce qu'un défaut trouvé hors
tension coûte une minute, et que le même défaut, sous tension, peut coûter l'appareil, ou pire.
Il y a cinq gestes, toujours dans le même ordre. Et ensuite, un arrêt : vous n'irez pas plus loin
tout seul.`,

  comprendre: `Regardez la ligne sur l'écran : sept étapes, comme sur le plan du réseau. Touchez-les une par une.
On commence hors tension, et on y reste. Ensuite on contrôle du plus simple au plus fin. D'abord on
regarde et on tire doucement sur chaque fil : une vis desserrée ne se voit pas toujours, mais elle
se sent. Puis on compare au schéma : chaque fil, chaque repère, chaque borne.
Puis on mesure. La continuité d'abord : on pose les pointes aux deux bouts d'un fil, et on veut une
valeur proche de zéro. Si l'écran affiche O, L, le circuit est ouvert : il y a une coupure quelque
part. Le conducteur de protection mérite une attention particulière, parce que celui-là, personne
ne le voit travailler.
Ensuite l'isolement. Ici on cherche l'inverse : une valeur énorme, en mégohms, entre un
conducteur et la terre. Et c'est là que je veux vous arrêter : un fil coupé a un isolement parfait,
et un fil qui touche la carcasse a une continuité parfaite. Les deux mesures ne se remplacent pas.
Puis l'arrêt. Vous appelez le professeur. C'est lui qui décide de la mise sous tension. Et à la
première mise sous tension, on regarde le sens de rotation, parce que c'est une chose que les
contrôles hors tension ne peuvent pas vous dire : le sens, et aussi si tout fonctionne.`,

  manipuler: `Maintenant, vous lisez des mesures, comme au plateau. Il y a sept questions, et un arrêt avant
la dernière, que vous ne passerez qu'avec le visa du professeur.
Pour chaque mesure, trois choses à regarder : le nombre, l'unité, et la limite. La limite, c'est la
fiche ou la notice qui la donne. Vous ne la devinez jamais.
Attention à l'unité. Un kilo-ohm n'est pas un mégohm : il y en a mille dans un seul. C'est une erreur
fréquente.
Les premières questions vous disent où regarder. Les dernières, non, et c'est voulu : vous avez vu
la méthode, vous la refaites tout seul.`,

  representer: `Sur un schéma, l'appareil de mesure se dessine par un cercle avec la lettre oméga : c'est
l'ohmmètre. Ses deux pointes se posent sur deux points du schéma. Pour la continuité, les deux bouts
d'un même fil. Pour l'isolement, on utilise en réalité un contrôleur d'isolement : un autre appareil, qui
applique une tension. Faute de symbole propre, ce schéma le dessine avec le même cercle. Ses pointes se
posent sur une borne du moteur et sur sa carcasse, que le plan dessine avec le symbole de la masse.
Ne confondez pas la terre et la masse. La terre, c'est trois traits de longueur décroissante. La
masse, c'est la carcasse métallique.
Et le sectionneur, sur le plan, c'est ce qu'on ouvre pour que tout soit hors tension. C'est par lui
qu'on commence.`
};
