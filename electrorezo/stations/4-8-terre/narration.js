/* ÉlectroRézo 4.8 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Version précédente : narration-v1.js.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Un fil vert et jaune, et un piquet enfoncé dans le sol. C'est tout ce qu'on voit d'elle.
Et c'est sans doute l'élément le plus mal compris de toute l'installation électrique.
On dit couramment : la terre protège les gens. Je vais vous montrer que c'est faux. Non pas
qu'elle soit inutile — elle est indispensable, et vous allez voir pourquoi. Mais elle ne fait
pas ce qu'on croit qu'elle fait.`,

  comprendre: `Prenons une machine dont l'isolant a lâché. La carcasse métallique se retrouve sous
tension. Elle est là, dans l'atelier, elle a l'air parfaitement normale, et rien ne l'indique.
Premier cas : cette machine n'a pas de conducteur de protection. Le courant voudrait bien
retourner à sa source, mais il n'a aucun chemin. Alors il attend. Il attend patiemment que
quelqu'un pose la main sur la carcasse. À cet instant précis, le corps de cette personne
devient le chemin de retour, et le courant le traverse.
Deuxième cas : la machine est reliée à la terre. Dès que l'isolant lâche, le courant part
immédiatement par le fil vert et jaune, descend au piquet, et revient à sa source par le sol.
Il n'a pas attendu. Il est parti tout de suite.
Et maintenant la question qui compte, celle que peu de gens se posent : est-ce que ça suffit ?
Non. Ce courant circule, mais rien ne l'arrête. La carcasse peut être encore dangereuse.
Ce qui l'arrête, c'est le différentiel. Il voit qu'il manque du courant au retour, et il coupe.
Voilà donc le vrai rôle de la terre, et je vous demande de le retenir dans ces termes : elle ne
coupe rien, elle ne détecte rien. Elle offre au courant de défaut un chemin franc, pour que le
différentiel puisse le voir.
Les deux vont ensemble, toujours. Une terre parfaite sans différentiel ne sauve personne. Et un
différentiel sans terre ne voit souvent rien venir.`,

  manipuler: `Voici la station où la bonne réponse va vous surprendre, et c'est fait exprès.
Reprenez les trois défauts, et demandez-vous non pas ce que la terre permet, mais ce qu'elle
détecte elle-même.`,

  representer: `Sur un plan, deux symboles se ressemblent et il ne faut pas les confondre. La prise de
terre se dessine par trois traits de longueur décroissante. La masse, elle, désigne une
carcasse métallique.
Le conducteur de protection porte le repère P majuscule E majuscule, et il rejoint chaque masse
de l'installation.
Et une chose ne doit jamais apparaître dessus : un appareil de coupure. Si vous voyez un
disjoncteur ou un sectionneur dessiné sur le conducteur de protection, ce n'est pas une
subtilité que vous n'auriez pas comprise. C'est une faute, et il faut la signaler.`
};
