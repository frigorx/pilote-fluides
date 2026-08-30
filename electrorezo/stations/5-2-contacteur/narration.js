/* ÉlectroRézo 5.2 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Voici l'appareil autour duquel tourne toute cette ligne. Ouvrez n'importe quelle armoire
industrielle : vous le trouverez, souvent en plusieurs exemplaires.
Et je vais vous dire tout de suite ce qu'il fait, parce que c'est très simple et très fort à la
fois.
Il permet à un courant minuscule de commander un courant énorme.
Vous envoyez quelques milliampères dans une bobine, et trois contacts capables de porter des
dizaines d'ampères se ferment d'un seul coup. Voilà pourquoi une machine de plusieurs kilowatts
peut être commandée par un petit bouton, à l'autre bout de l'atelier, avec deux fils fins.`,

  comprendre: `Ouvrons-le, et suivons ce qui se passe quand il colle.
Tout en bas, il y a la bobine. Quelques milliers de spires de fil fin, entre deux bornes marquées
A un et A deux. Au repos, elle ne fait rien.
Alimentez-la. Elle devient un électro-aimant, et elle attire vers elle un bloc de tôles qu'on
appelle l'armature mobile. Il y avait un espace entre les deux : cet espace se referme. Vous
entendez le claquement — c'est ce bruit-là, dans une armoire.
Maintenant, regardez ce qui est accroché à cette armature. Une barre isolante, le porte-contacts.
Et sur cette barre, tous les contacts de l'appareil.
Voilà pourquoi ils se ferment tous en même temps. Ce n'est pas une coïncidence, ce n'est pas un
réglage : ils sont physiquement sur la même pièce. Ils n'ont pas le choix.
Coupez la bobine maintenant. Un ressort, qui était comprimé, se détend et écarte l'armature.
Tout se rouvre.
Et je veux vous faire remarquer une chose sur ce ressort, parce qu'on la prend souvent pour un
défaut. Un contacteur ne garde rien : il retombe dès qu'on lui coupe le courant.
C'est voulu. Imaginez une coupure de courant dans un atelier, et toutes les machines qui
redémarrent d'un coup au retour, sans que personne ne l'ait demandé. Le ressort est ce qui
empêche ça.
Un dernier mot sur le boîtier au-dessus des contacts. Quand un contact s'ouvre sous charge, un
arc se forme. Ces cloisons le découpent en petits morceaux et le refroidissent. Sans elles, les
pastilles se souderaient au bout de quelques manœuvres.`,

  manipuler: `Les trois questions de la ligne, appliquées au contacteur.
Réfléchissez bien à la troisième. Elle a l'air d'être un défaut, et c'est en réalité une
sécurité.`,

  representer: `Sur un plan, le contacteur est coupé en deux, et il faut le savoir avant d'ouvrir un dossier.
La bobine est dans le circuit de commande : un simple rectangle traversé par le conducteur. Les
contacts de puissance sont dans le circuit de puissance, souvent une page plus loin.
Ce qui les relie, c'est le repère. KM un écrit ici, KM un écrit là. Même repère, même appareil.
Et maintenant, regardez de très près le contact de puissance, parce qu'il porte un détail que le
contact auxiliaire n'a pas. Un petit demi-cercle, posé sur la borne fixe.
Ce demi-cercle n'est pas un ornement. Il dit : ce contact-là est équipé pour couper un courant
important, il a de quoi souffler l'arc.
Un contact sans ce signe est un contact de commande. Ne lui faites pas porter un moteur.`
};
