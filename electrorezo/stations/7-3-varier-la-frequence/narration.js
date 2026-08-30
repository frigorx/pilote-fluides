/* ÉlectroRézo 7.3 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `La station sept point un vous a montré ce qui ne marche pas. Voici ce qui marche.
La vitesse d'un moteur asynchrone est fixée par la fréquence. Vous le savez depuis la station un
point six : cinquante hertz, quatre pôles, quinze cents tours.
Alors la solution est évidente : si on veut le ralentir, on change la fréquence.
Sauf qu'il y a une condition. Et cette condition, c'est toute cette ligne.`,

  comprendre: `Servez-vous du curseur, et laissez le premier bouton sélectionné : la tension suit la fréquence.
Descendez à vingt-cinq hertz. La vitesse tombe de moitié — c'est exactement ce qu'on voulait.
Et regardez la barre du couple en bas : elle est pleine. Cent pour cent. Le moteur garde toute sa
force.
Maintenant, appuyez sur le second bouton : la tension reste bloquée à quatre cents volts.
Refaites la même descente.
Regardez le troisième cadre, celui du rapport. Il vaut huit à cinquante hertz. À vingt-cinq
hertz avec la tension bloquée, il vaut seize. Il a doublé.
Et le message change : le moteur sature.
Qu'est-ce que ça veut dire, saturer ?
Le fer du moteur canalise le champ magnétique. Mais il a une limite : au-delà d'un certain
niveau, il ne peut plus en canaliser davantage.
Quand la tension est trop forte pour la fréquence, on lui demande justement de dépasser cette
limite. Le courant s'envole — et le couple, lui, n'augmente pas. Toute cette énergie part en
chaleur.
Un moteur saturé chauffe très vite, pour rien.
D'où la loi qui donne son nom à toute la ligne : on garde le rapport tension sur fréquence
constant.
Quatre cents volts à cinquante hertz. Deux cents volts à vingt-cinq hertz. Quatre-vingts volts à
dix hertz. Le rapport vaut huit dans les trois cas.
Tant qu'il est tenu, le couple reste entier, à n'importe quelle vitesse. C'est ce qui rend le
variateur de fréquence si supérieur au gradateur.
Une dernière remarque, parce qu'elle a des conséquences. Au-dessus de cinquante hertz, la tension
ne peut plus suivre : on est déjà au maximum de ce que le réseau donne.
Le rapport se met donc à tomber, et le couple avec. Un moteur peut tourner à soixante-quinze
hertz, mais il ne fournit plus le même effort.`,

  manipuler: `Voyons maintenant comment un variateur fabrique cette fréquence, parce que le principe est plus
simple qu'on ne croit.
Il ne transforme pas. Il défait, puis il refait.
Premier étage : le redresseur. Il prend l'alternatif du réseau et il fait passer tout du même
côté. À la sortie, ce n'est plus vraiment de l'alternatif.
Deuxième étage : le bus continu. Un gros condensateur lisse ce qui reste. On a maintenant du
continu, autour de cinq cent quarante volts.
Troisième étage : l'onduleur. Il redécoupe ce continu très rapidement, de façon à fabriquer une
alternative à la fréquence qu'on veut. N'importe laquelle, de zéro à quelques centaines de
hertz.
Voilà pourquoi un variateur ne peut pas être un simple transformateur : entre l'entrée et la
sortie, l'énergie passe par du continu.
Et voilà aussi la mise en garde la plus importante de cette ligne.
Ce condensateur du bus reste chargé longtemps après la coupure. Plusieurs minutes. À plus de cinq
cents volts continus.
Le délai d'attente est écrit sur l'appareil. Souvent cinq minutes. Ce n'est pas une précaution de
principe : c'est une tension mortelle qui attend derrière un capot.`,

  representer: `Cette station n'a pas d'unité nouvelle : elle a un rapport. U sur f, en volts par hertz.
Quatre cents divisé par cinquante : huit. Deux cents divisé par vingt-cinq : huit. C'est la
valeur à garder.
Sur un variateur, ce rapport est un paramètre à régler à la mise en service. Il porte souvent le
nom de « loi tension-fréquence » dans le menu.
Et il y a un second réglage que je veux vous signaler, parce qu'on l'oublie souvent : la
fréquence minimale.
Pourquoi la limiter ? À cause du ventilateur.
Le ventilateur d'un moteur est calé sur son arbre. Il tourne donc à la vitesse du moteur. À dix
hertz, il tourne cinq fois moins vite, et il ne ventile pratiquement plus.
Un moteur qui tourne longtemps à basse vitesse chauffe, alors même qu'il travaille peu.
La solution, quand c'est nécessaire, c'est une ventilation forcée indépendante : un petit
ventilateur alimenté séparément, qui souffle quelle que soit la vitesse du moteur.
C'est une erreur de conception fréquente, et elle coûte des moteurs.`
};
