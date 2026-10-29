/* ÉlectroRézo 9.2 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits le 28/10/2026.
   Non validés, aucun MP3 fabriqué. C, S, R se disent lettre par lettre. */
const NARRATION = {

  decouvrir: `Un compresseur hermétique monophasé a trois bornes. Parfois elles portent un repère, parfois non.
Vous allez les retrouver avec un ohmmètre.
C'est utile pour une raison précise. Si on inverse l'enroulement principal et l'enroulement auxiliaire au
câblage, le moteur grille en général peu après la mise sous tension.
Avant de mesurer, regardez la plaque signalétique. Regardez aussi sous le couvercle du bornier : le schéma de
raccordement s'y trouve souvent. Si les repères sont là, vous les lisez. Sinon, vous mesurez.
Tout se fait hors tension. Vous consignez d'abord, puis vous débranchez les fils du compresseur.`,

  comprendre: `Les trois bornes se nomment C, S et R. C est le commun. R est la marche : c'est l'enroulement principal.
S est le démarrage : c'est l'enroulement auxiliaire. Dans certains cours, on écrit aussi C, P et A.
L'enroulement auxiliaire est en fil plus fin que le principal. Sa résistance est donc plus élevée.
Regardez la ligne des sept étapes sur l'écran, et touchez-les une par une.
Vous réglez l'ohmmètre sur un petit calibre, par exemple deux cents ohms : ces enroulements font au plus
quelques dizaines d'ohms. Puis vous faites trois mesures, une par paire de bornes.
Prenons l'exemple du cours, avec des bornes repérées un, deux, trois. Entre un et deux, onze ohms. Entre un et
trois, trois ohms. Entre trois et deux, quatorze ohms.
La valeur la plus forte, quatorze ohms, est entre S et R. La borne qui reste, la un, est donc C. La valeur la
plus faible, trois ohms, est celle du principal : la borne trois est R. Il reste la deux, c'est S.
Pour contrôler, additionnez les deux petites valeurs. Onze plus trois font quatorze, la valeur entre S et R.
Il reste deux défauts à chercher. Un enroulement coupé : l'ohmmètre affiche O, L, une résistance très grande,
l'infini. Un enroulement à la masse : vous mesurez entre chaque borne et la carcasse, sur le plus fort calibre.
Vous devez lire l'infini. Zéro ohm ou presque veut dire une masse franche. Grattez la peinture de la carcasse
pour avoir un bon contact.`,

  manipuler: `Maintenant, vous lisez des mesures. Le premier exercice est résolu : imitez-le. Les suivants vous disent
où regarder et comment faire. Les derniers ne le disent plus, et c'est voulu.
Chaque fois, cherchez d'abord la valeur la plus forte, et la borne qui reste. Puis la plus faible des deux autres.
Puis contrôlez la somme.
Deux questions portent sur les défauts. Un enroulement coupé affiche O, L. Une masse se cherche entre chaque
borne et la carcasse.
À la fin, une question sur le contrôleur d'isolement. Une masse peu franche peut échapper à l'ohmmètre et faire
déclencher le différentiel sous tension. Il faut alors un autre appareil, qui applique cinq cents volts continu.
Jamais sur un compresseur sous vide. La limite à respecter se lit sur la notice ou sur la fiche.`,

  representer: `Sur un schéma, l'ohmmètre se dessine par un cercle avec la lettre oméga. Le moteur monophasé est un rond
marqué M, avec le signe un et une petite vague. La masse, c'est la carcasse métallique.
Regardez le schéma du compresseur. En haut, la borne C. Dessous, deux enroulements. À gauche le principal, qui
mène à R. À droite l'auxiliaire, qui mène à S.
Aller de C à R, c'est traverser le principal seul. Aller de S à R, c'est traverser les deux enroulements. Voilà
pourquoi cette valeur est la plus forte, et pourquoi elle est la somme des deux autres.
Sur le schéma de mesure, une pointe de l'ohmmètre est posée sur une borne du moteur, l'autre sur la masse.
Vous refaites cette mesure pour chaque borne.`
};
