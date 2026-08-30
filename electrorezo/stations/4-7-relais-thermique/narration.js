/* ÉlectroRézo 4.7 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Version précédente : narration-v1.js.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Celui-ci se reconnaît à sa place plus qu'à sa forme : il est toujours clipsé sous un
contacteur, comme un tiroir sous un meuble. Les deux vont par paire, on ne les sépare pas.
Et il a lui aussi une molette, comme le disjoncteur moteur. Même geste, même valeur : on la
règle sur l'intensité écrite sur la plaque.`,

  comprendre: `À l'intérieur, trois bilames, un par phase, traversés par le courant du moteur.
Quand tout va bien, ils chauffent un peu et restent droits. Quand le moteur force, quand il
peine, quand il tire trop pendant trop longtemps, ils se courbent. Et en se courbant, ils
poussent une petite tige qui fait basculer un mécanisme.
Maintenant, attention, parce que j'arrive au point que presque tout le monde comprend de
travers. Je vais le dire lentement.
Ce relais ne coupe pas le moteur.
Ce que le mécanisme ouvre, c'est un tout petit contact, marqué quatre-vingt-quinze et
quatre-vingt-seize. Ce contact-là n'est pas dans le circuit de puissance : il est dans le
circuit de commande, en série avec la bobine du contacteur.
Quand il s'ouvre, la bobine n'est plus alimentée. Le contacteur retombe. Et c'est le contacteur
qui coupe la puissance.
Le relais, lui, n'a fait que donner l'ordre.
Prenez la mesure de ce que ça implique sur le terrain. Si le contact quatre-vingt-quinze
quatre-vingt-seize n'est pas raccordé — parce qu'on a oublié, parce qu'on a bricolé, parce que
quelqu'un l'a ponté pour dépanner — le relais chauffera, il déclenchera consciencieusement dans
le vide, et le moteur continuera de tourner jusqu'à ce qu'il brûle.
Enfin, souvenez-vous de sa limite, que vous connaissez déjà. Le bilame est lent. Un
court-circuit est fini avant qu'il ait bougé. C'est pour ça qu'en amont, il y a toujours un
fusible aM ou un disjoncteur.`,

  manipuler: `Trois défauts, un seul qu'il voit.
Cochez, et rappelez-vous pourquoi il ne peut pas en voir davantage : c'est une question de
temps, pas de qualité.`,

  representer: `Sur un plan, son symbole porte le crochet du thermique, et rien d'autre. Pas de
demi-cercle, pas de tore.
Autrement dit, le plan vous annonce lui-même que cet appareil ne protège pas du court-circuit.
Ce n'est pas caché dans une notice au fond d'un tiroir : c'est écrit dans le dessin, et vous
savez le lire.
Et cherchez ses contacts quatre-vingt-quinze quatre-vingt-seize : ils ne sont pas dessinés à
côté de lui. Ils sont dans le circuit de commande, souvent une page plus loin, reliés à lui par
le repère ou par un pointillé. Si vous ne les trouvez pas sur le plan, posez-vous des questions
avant de mettre l'installation en route.`
};
