/* ÉlectroRézo 7.4 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Nous voici au terminus du réseau. Toutes les lignes convergent ici.
Le variateur de fréquence, c'est l'appareil qui a transformé l'industrie ces trente dernières
années. Avant lui, une pompe tournait à une vitesse et une seule. Aujourd'hui, elle tourne à
celle qu'on veut.
Et pour comprendre ce qu'il y a dedans, vous avez besoin de tout ce que ce réseau vous a
appris.`,

  comprendre: `Le principe, vous le connaissez : c'est la loi U sur f de la station précédente. Servez-vous du
curseur pour vous la remettre en tête.
Voyons donc plutôt ce qui fait qu'un variateur est bien plus qu'un régulateur de vitesse.
D'abord, il démarre en douceur. On règle une rampe : le temps qu'il met à monter en fréquence.
Dix secondes, trente secondes, ce qu'on veut.
Prenez la mesure de ce que ça change. Plus de pointe de cinq à huit fois l'intensité au
démarrage. Plus de à-coup mécanique. Un convoyeur qui démarre en dix secondes ne renverse pas
ses caisses.
Ensuite, il freine. Et là, il se passe quelque chose d'intéressant : quand on ralentit un moteur
plus vite qu'il ne ralentirait tout seul, il devient générateur. Il renvoie de l'énergie vers le
variateur.
Cette énergie fait monter la tension du bus continu. Si elle monte trop, le variateur se met en
défaut. D'où la résistance de freinage : une résistance externe qui dissipe cette énergie en
chaleur.
Troisième chose : il protège. Il surveille l'intensité en permanence, et il coupe si elle dépasse
ce qu'on lui a dit. C'est pour ça qu'on ne met plus de relais thermique derrière un variateur :
il fait le travail, et mieux.
Et enfin, il parle. La plupart dialoguent avec un automate. La consigne de vitesse arrive alors
par deux fils au lieu d'un potentiomètre.
Voilà pourquoi il a tout balayé. Il donne au moteur asynchrone — robuste, sans balais, sans
entretien — la souplesse qu'avait le moteur à courant continu.`,

  manipuler: `Les trois questions, une dernière fois pour ce réseau.
Et prenez le temps de regarder le tableau complet ensuite : vous verrez d'un coup d'œil toutes
les machines des lignes six et sept.`,

  representer: `Sur un plan, le variateur reprend la diagonale des convertisseurs que vous avez vue à la station
sept point deux. Mais ce qui est écrit de part et d'autre n'est pas la même chose.
Le symbole complet montre les trois étages : le redresseur, le bus continu, l'onduleur. Vous les
reconnaissez maintenant.
Et je veux attirer votre attention sur ce que le plan ne montre plus.
Derrière un variateur, il n'y a plus de contacteur. Il n'y a plus de relais thermique. Ne les
cherchez pas : le variateur fait les deux.
Cherchez en revanche deux bornes supplémentaires, souvent repérées P A et P B. C'est la
résistance de freinage. Sa présence vous dit que la machine a de l'inertie et qu'on la freine
activement.
Maintenant, quatre règles de câblage. Elles sont courtes, et il faut les connaître.
Un : en amont, une protection et un sectionnement. Le variateur ne remplace ni l'un ni l'autre.
Deux : entre le variateur et le moteur, rien. Aucun contacteur, aucun sectionnement. Ouvrir en
charge la sortie d'un variateur le détruit.
Trois : le câble moteur doit être blindé, et son blindage raccordé aux deux extrémités. Le
découpage rayonne, et il perturbe tout ce qui est autour dans l'armoire.
Quatre : un différentiel ordinaire ne convient pas. Le découpage engendre des courants de fuite à
haute fréquence qu'il ne sait pas voir, et qui le font déclencher sans raison. Il faut un
différentiel de type B.
Et je termine par la mise en garde la plus sérieuse de tout ce réseau.
Le condensateur du bus continu reste chargé plusieurs minutes après la coupure, à plus de cinq
cents volts continus.
Le délai d'attente est écrit sur l'appareil. Cinq minutes, souvent.
On coupe. On attend le temps indiqué. On vérifie l'absence de tension sur le bus. Et alors
seulement on ouvre.
Voilà, vous êtes au terminus. Vous savez lire un schéma, reconnaître un appareil, comprendre une
machine, et vérifier une installation. Le reste, c'est de la pratique — et elle commence
maintenant.`
};
