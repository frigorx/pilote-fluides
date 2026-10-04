/* CartoClim 5.1 — textes POUR L'OREILLE, registre « professeur à l'épaule ».
   La voix explique, elle ne lit pas l'écran (00-charte/VOIX-ET-NARRATION.md).
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Sous la scène, regardez la première photo : une main, une télécommande, un climatiseur au mur. Le geste que tout
le monde connaît, et pourtant la partie de la machine la plus mal comprise.
Cette télécommande ne règle rien dans le circuit. Elle ne touche ni au compresseur, ni au fluide. Elle
envoie un ordre, en infrarouge, comme celle d'un téléviseur. L'ordre arrive à la carte électronique de
l'unité intérieure, et c'est la carte qui décide quoi mettre en marche. Si les piles sont fatiguées, ou si
quelque chose gêne le trajet, l'ordre ne passe pas, et le client croit que la machine est en panne.
Sur la seconde photo, les trois pièces ensemble : l'unité extérieure, l'unité intérieure, et la
télécommande posée devant. Vous la tiendrez à la fin de chaque pose. Le premier démarrage, c'est ce qui
termine la mise en service : on essaie chaque mode avant de laisser l'appareil au client.`,

  comprendre: `Voyons ce qui se passe quand on appuie. Cinq touches de mode, et un écran qui répète celle
qu'on a choisie.
Le flocon, c'est le froid. La carte lance le compresseur et la turbine, et place la vanne quatre voies
dans le sens froid. La batterie intérieure devient froide, l'air ressort plus frais.
Le soleil, c'est le chaud, et c'est la touche que les clients confondent le plus avec le flocon. La
machine est la même, mais la vanne inverse le sens du fluide : la batterie intérieure devient chaude.
Quand un client appuie sur le soleil en plein été, la pièce chauffe, et il appelle pour une panne qui n'en
est pas une.
La goutte, c'est la déshumidification. Ce n'est pas du froid ordinaire : c'est du froid à petite vitesse.
La turbine tourne lentement, l'air s'attarde sur la batterie froide et y laisse son eau, sans que la pièce
se refroidisse beaucoup.
Le ventilateur, c'est la ventilation. Le compresseur est arrêté, seule la turbine tourne : l'air est
brassé, jamais renouvelé.
Et le A, l'automatique : la carte compare ce que vous demandez, la consigne, avec ce que lit la sonde, et
elle choisit toute seule entre le froid et le chaud.
Cette sonde, il faut bien savoir où elle est. À la reprise d'air de l'unité intérieure, c'est-à-dire là où
l'air de la pièce entre dans l'appareil, souvent en hauteur. Elle ne mesure pas la température de votre
lit ni de votre bureau. Quand elle atteint la consigne, la machine s'arrête, ou ralentit si elle est
Inverter.
Appuyez sur Dérouler, et regardez ce qui s'allume dans la machine, mode après mode.`,

  manipuler: `À vous. Une télécommande ordinaire, sans sonde dans la télécommande : cochez ce qu'elle sait faire.
Régler la consigne, oui : c'est son travail, elle dit à la carte la température qu'on veut.
Mesurer la température au lit ou au bureau, non. C'est l'erreur du client : il croit que la télécommande
lit l'air autour de lui. La machine ne connaît que l'air qui entre dans l'unité intérieure. Seuls certains
modèles ont une sonde dans la télécommande : alors elle mesure là où on la pose, et la notice le dit.
Faire entrer de l'air neuf, non plus. Aucun mode ne le fait, pas même la ventilation.
Ensuite, le premier démarrage. Les piles d'abord. Puis chaque mode, l'un après l'autre. À chaque touche,
vous écoutez : la turbine ne doit ni frotter ni vibrer. Vous contrôlez le sens : en froid l'air est frais,
en chaud il est chaud. Et vous regardez l'eau sortir au bout du tuyau de condensats : c'est la preuve que
la pente est bonne.
Un dernier piège. Une consigne très basse ne fait pas refroidir plus vite : tant que l'écart est grand, la
machine donne déjà sa puissance, elle travaille seulement plus longtemps. Et si la télécommande ne répond
plus, pensez aux piles, puis à l'émetteur, avant d'accuser la machine.`,

  representer: `Deux symboles. Le premier, la télécommande : un boîtier allongé avec son écran, ses touches et
son émetteur. Le second, l'unité intérieure murale, celle qui reçoit les ordres.
Sur un schéma d'installation, la télécommande est dessinée près de l'unité qu'elle commande, sans aucun
fil : elle parle en infrarouge, il n'y a rien à câbler. Ce qu'il faut y lire, c'est quelle unité elle
commande, surtout sur un multisplit. Et cherchez dans la notice si la télécommande a sa propre sonde :
cela décide de l'endroit où la température est mesurée.`
};
