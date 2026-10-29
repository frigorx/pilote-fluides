/* ÉlectroRézo 9.5 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits le 28/10/2026.
   Non validés, aucun MP3 fabriqué. Les lettres C, S, R et les sigles CTP, RSIR, CSIR se disent lettre par lettre. */
const NARRATION = {

  decouvrir: `Un compresseur chaud ne démarre pas. Le groupe reste silencieux. Par où commencez-vous ?
Vous pourriez changer le condensateur tout de suite. Avant cela, il faut savoir si la tension arrive au
compresseur, puis si le courant peut passer. Sur un compresseur, une pièce peut couper tout le moteur sans être en panne : le Klixon.
C'est un protecteur thermique, branché en série sur la borne C. Quand l'intensité ou la température
montent trop, il s'ouvre, et plus rien n'arrive aux enroulements.
Dans cette station, vous apprenez un ordre de vérification. On va de l'alimentation vers le moteur,
une vérification après l'autre. Vous apprenez aussi à tester un condensateur à l'ohmmètre, et à
comparer sa capacité à sa tolérance.`,

  comprendre: `Regardez la ligne sur l'écran. Elle compte sept points. Touchez-les un par un.
Le premier est la seule mesure sous tension : la tension arrive-t-elle au compresseur ? Seul un
travailleur habilité mesure sous tension. Au plateau, le professeur décide.
Le deuxième point est la consignation. Toutes les mesures qui suivent se font hors tension, après
la consignation.
Le troisième point est le Klixon. Il se comporte comme un interrupteur. Il s'ouvre quand l'intensité
ou la température montent trop. Quand il a refroidi, il reprend sa forme et le contact se referme. Si
le compresseur est chaud, on mesure d'abord. Si le Klixon est ouvert, on attend qu'il refroidisse,
puis on remesure.
Sur un Klixon interne ouvert, la mesure a une allure particulière. Entre C et S, l'ohmmètre lit
l'infini. Entre C et R aussi. Mais entre S et R, la valeur reste normale. C'est un raisonnement sur le
schéma : le Klixon est en série sur C, alors C est coupé du reste. Vérifiez-le toujours sur le schéma du
constructeur.
Le quatrième point, ce sont les enroulements, avec la méthode de la station neuf point deux. Le
cinquième, c'est le relais d'intensité ou la CTP. Le sixième, c'est le condensateur.
Un condensateur reste chargé après la coupure. On le décharge avec une résistance avant d'y toucher.
Certains ont une résistance de décharge, mais la décharge peut prendre quelques minutes. On décharge
quand même.
Le test à l'ohmmètre se fait sur un condensateur déchargé. En bon état, l'affichage part vers zéro,
puis remonte lentement vers l'infini. Si vous inversez les pointes, cela recommence. Un condensateur
coupé reste à l'infini. Un condensateur en court-circuit reste à zéro, ou presque.
Le dernier point est l'arrêt. Le professeur vérifie avant toute remise sous tension.`,

  manipuler: `Maintenant, vous lisez des mesures de condensateur et de Klixon, comme au plateau. Il y a huit
questions, et un arrêt avant la dernière.
La première est résolue : imitez-la. Les suivantes vous disent où regarder. Les dernières, non, et
c'est voulu : vous avez vu la méthode, vous la refaites tout seul.
Pour la capacité, le marquage donne une valeur et une tolérance. Prenez soixante microfarads, plus ou
moins dix pour cent. Dix pour cent de soixante font six. La capacité est bonne entre cinquante-quatre
et soixante-six microfarads. Une mesure de quarante-deux microfarads sort de cette plage : on remplace.
Pour le Klixon, souvenez-vous d'une chose. Un Klixon interne ouvert ressemble à deux enroulements
coupés. La mesure entre S et R fait la différence. Et c'est pour cela que le Klixon vient avant les
enroulements dans l'ordre.`,

  representer: `Sur le schéma, le Klixon se dessine par un cercle traversé par un trait brisé. Ici, il est
externe, monté sur le compresseur. Cherchez-le entre la ligne, notée L, et la borne C. Tout le courant du compresseur le
traverse.
À partir de C, le courant se partage : le principal va vers R, l'auxiliaire va vers S. Sur le second
schéma, le condensateur de démarrage est en série avec l'auxiliaire. Vous le retrouvez à la station
neuf point trois.
Le condensateur se dessine par deux traits parallèles qui ne se touchent pas. L'ohmmètre se dessine
par un cercle avec la lettre oméga. La masse représente la carcasse, ou l'enveloppe métallique.
Sur le schéma, l'ohmmètre se pose entre deux bornes. Pour un Klixon interne ouvert, vous lisez
l'infini entre C et S, et entre C et R.`
};
