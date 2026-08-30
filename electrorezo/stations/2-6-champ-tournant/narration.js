/* ÉlectroRézo 2.6 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Dernière station de la ligne, et c'est celle qui explique pourquoi le triphasé a gagné.
Trois bobines fixes, dans le stator d'un moteur. Trois courants décalés d'un tiers de tour.
Et il apparaît quelque chose qui n'a rien d'évident : un champ magnétique qui tourne. Alors
qu'aucune pièce ne bouge.
Le rotor n'a plus qu'à le suivre. Aucun dispositif de démarrage, aucun artifice : le moteur part
tout seul.
C'est de la physique, et je vais vous la montrer.`,

  comprendre: `Regardez le dessin. Trois bobines, disposées à cent vingt degrés l'une de l'autre. Elles sont
fixes : elles sont encastrées dans le fer du stator, elles ne bougeront jamais.
Chacune reçoit une phase. Et sous chaque bobine, il y a un nombre : c'est le courant qui la
traverse à cet instant. Positif ou négatif.
Au centre, la flèche rouge : c'est l'effet combiné des trois.
Maintenant, servez-vous de la réglette et faites avancer le temps.
Regardez la flèche rouge. Elle tourne.
Et regardez le nombre à droite, celui de sa longueur. Il ne bouge pas. La flèche tourne, mais
elle ne change pas de taille.
C'est ça, un champ tournant. Pas un champ qui pulse, qui grandit et rétrécit. Un champ de valeur
constante, dont la direction tourne régulièrement.
Comment est-ce possible sans pièce mobile ? Regardez les trois nombres pendant que vous avancez.
Quand la première bobine est à son maximum, les deux autres sont à mi-chemin en sens inverse. Un
instant plus tard, c'est la deuxième qui domine. Puis la troisième.
Le maximum se déplace de bobine en bobine. Et comme les bobines sont réparties en cercle, ce
déplacement fait tourner l'effet d'ensemble.
Maintenant, appuyez sur le second bouton : deux phases échangées.
Les bobines n'ont pas bougé d'un millimètre — regardez, elles sont exactement au même endroit.
Seuls les noms L deux et L trois ont changé de place.
Faites à nouveau avancer le temps. La flèche tourne dans l'autre sens.
Voilà l'explication complète de quelque chose que tout le monde fait sans toujours savoir
pourquoi : pour inverser un moteur triphasé, on échange deux phases.
Deux. Jamais trois — échanger les trois revient à ne rien changer, puisque l'ordre reste le
même.`,

  manipuler: `Sur le terrain, la question se pose sans arrêt : dans quel sens la machine va-t-elle tourner ?
Il y a deux façons de le savoir, et elles ne se valent pas.
La première, celle que tout le monde fait : l'essai bref. On lance une seconde, on regarde, et si
c'est à l'envers on échange deux fils.
C'est gratuit, c'est rapide, et c'est risqué.
Parce que certaines machines ne supportent pas une seule seconde de rotation inverse. Un
compresseur à vis, une pompe à huile, un ventilateur à pales orientées : une seconde à l'envers
peut suffire à casser quelque chose.
La seconde façon : le contrôleur d'ordre de phases. On branche trois pointes, on lit, et le
moteur n'a pas bougé.
C'est un petit appareil, il ne coûte pas cher, et sur une machine délicate ce n'est pas un luxe.
Deux habitudes à prendre, pour finir.
Quand vous échangez deux phases, notez lesquelles. Le collègue qui viendra après vous doit
pouvoir comprendre ce qui a été fait, et revenir en arrière si besoin.
Et après toute intervention sur l'alimentation d'une machine tournante, revérifiez le sens. Un
dépannage qui remet les fils dans le désordre est un dépannage raté — et le désordre ne se voit
qu'au démarrage suivant, souvent quand vous n'êtes plus là.`,

  representer: `La vitesse du champ tournant s'appelle la vitesse de synchronisme, et on la note n s.
Elle dépend de deux choses seulement : la fréquence, et le nombre de paires de pôles du moteur.
À cinquante hertz : trois mille tours par minute pour deux pôles, quinze cents pour quatre, mille
pour six.
Le cas le plus courant en atelier, c'est quatre pôles : quinze cents tours par minute.
Maintenant, un point que je veux clarifier, parce qu'il déroute beaucoup de gens.
Sur la plaque d'un moteur à quatre pôles, vous ne lirez pas quinze cents. Vous lirez plutôt mille
quatre cent trente-cinq.
Ce n'est pas une erreur. Le rotor tourne toujours un peu moins vite que le champ. Cet écart
s'appelle le glissement, et il n'est pas un défaut : il est nécessaire au fonctionnement. Un
rotor qui tournerait exactement à la vitesse du champ ne produirait aucun couple.
Vous verrez pourquoi à la ligne six.
Deux derniers réflexes, très concrets.
Sur un plan, cherchez la flèche de sens de rotation près du moteur. Quand elle y est, elle fait
foi.
Et sur la machine elle-même, une flèche est souvent peinte sur le carter. Regardez-la avant de
brancher : elle vous évitera l'essai, et peut-être une casse.`
};
