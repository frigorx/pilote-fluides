/* ÉlectroRézo 9.2 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits le 28/10/2026.
   Non validés, aucun MP3 fabriqué. C, S, R se disent lettre par lettre. */
const NARRATION = {

  decouvrir: `Un compresseur hermétique monophasé a trois bornes. Parfois elles portent un repère, parfois non.
Vous allez les retrouver avec un ohmmètre, comme sur la photo : les pointes sur deux bornes, et l'écran donne la
résistance de l'enroulement entre elles.
C'est utile pour une raison précise. Si on inverse l'enroulement principal et l'enroulement auxiliaire au
câblage, le moteur grille en général peu après la mise sous tension.
Sur un vrai compresseur, vous lisez d'abord la plaque signalétique. Vous regardez aussi sous le couvercle du bornier : le schéma de
raccordement s'y trouve souvent. Si les repères sont là, vous les lisez. Sinon, vous mesurez.
Tout se fait hors tension. Vous consignez d'abord, puis vous débranchez les fils du compresseur.`,

  comprendre: `Les trois bornes se nomment C, S et R. C est le commun. R est la marche : c'est l'enroulement principal.
S est le démarrage : c'est l'enroulement auxiliaire. Dans certains cours, on écrit aussi C, P et A.
L'enroulement auxiliaire est en fil plus fin que le principal. Sa résistance est donc plus élevée.
Regardez maintenant la méthode, avec sa ligne de sept étapes. Elle avance toute seule pendant que je parle. La première
étape, vous la connaissez : hors tension, fils débranchés.
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
pour avoir un bon contact.
Une masse peu franche peut échapper à l'ohmmètre et faire déclencher le différentiel sous tension. Il faut alors
un autre appareil, le contrôleur d'isolement, qui applique cinq cents volts continu. La limite à respecter se lit
sur la notice ou sur la fiche. Jamais de contrôleur d'isolement sur un compresseur sous vide.`,

  manipuler: `Maintenant, vous lisez des mesures. Dix questions, sans note. Les relevés viennent de compresseurs fictifs,
hors tension, fils débranchés.
Le premier exercice est résolu : imitez-le. Regardez l'exemple, avec ses trois écrans d'ohmmètre. La réponse est
écrite sous les écrans.
Chaque fois, cherchez d'abord la valeur la plus forte, et la borne qui reste. Puis la plus faible des deux autres.
Puis contrôlez la somme. La méthode est rappelée dans la carte « La méthode, dans l'ordre ».
Les questions suivantes vous disent où regarder. Elles vous disent aussi comment faire. Sous chaque question, vous
choisissez une réponse parmi quatre.
Les questions cinq et six portent sur les défauts. Dans la question cinq, regardez l'écran de l'ohmmètre et son
calibre. Dans la question six, regardez aussi l'unité affichée.
Les dernières questions ne le disent plus, et c'est voulu.
La dixième question parle d'un différentiel qui déclenche. Lisez bien tout l'énoncé avant de choisir.`,

  representer: `Sur un schéma, l'ohmmètre se dessine par un cercle avec la lettre oméga. Le moteur monophasé est un rond
marqué M, avec le signe un et une petite vague. La masse, c'est la carcasse métallique.
Regardez le schéma du compresseur, le dernier symbole. En haut, la borne C. Dessous, deux enroulements. À gauche le principal, qui
mène à R. À droite l'auxiliaire, qui mène à S.
Aller de C à R, c'est traverser le principal seul. Aller de S à R, c'est traverser les deux enroulements. Voilà
pourquoi cette valeur est la plus forte, et pourquoi elle est la somme des deux autres.
Regardez maintenant le schéma de mesure, dans la carte « Le lire sur un plan ». Une pointe de l'ohmmètre est posée
sur une borne du moteur, l'autre sur la masse. Vous refaites cette mesure pour chaque borne.`
};

/* Le guidage : ce que l'écran montre pendant que la voix parle (moteur : _commun/station.js, « Le guidage »). */
window.GUIDAGE = {
  decouvrir: [
    { quand: "Un compresseur hermétique monophasé a trois bornes", montre: "3D" },
    { quand: "Parfois elles portent un repère", montre: "Les trois bornes d'un compresseur monophasé ne portent aucun repère lisible" },
    { quand: "Vous allez les retrouver avec un ohmmètre", montre: "Hors tension, on mesure" },
    { quand: "C'est utile pour une raison précise", montre: "Brancher chaque fil sur la bonne borne" },
    { quand: "Vous regardez aussi sous le couvercle du bornier", montre: "3D", clic: "1" },
    { quand: "Tout se fait hors tension", montre: "3D", clic: "2" }
  ],
  comprendre: [
    { quand: "Les trois bornes se nomment", montre: "Les trois bornes" },
    { quand: "L'enroulement auxiliaire est en fil plus fin", montre: "Deux enroulements, deux résistances" },
    { quand: "Regardez maintenant la méthode", montre: "La méthode des trois mesures", clic: "1" },
    { quand: "Vous réglez l'ohmmètre", montre: "La méthode des trois mesures", clic: "2" },
    { quand: "Puis vous faites trois mesures", montre: "La méthode des trois mesures", clic: "3" },
    { quand: "La valeur la plus forte", montre: "La méthode des trois mesures", clic: "4" },
    { quand: "La valeur la plus faible", montre: "La méthode des trois mesures", clic: "5" },
    { quand: "Pour contrôler, additionnez", montre: "La méthode des trois mesures", clic: "6" },
    { quand: "Un enroulement coupé : l'ohmmètre affiche", montre: "Un enroulement coupé" },
    { quand: "Un enroulement à la masse", montre: "La méthode des trois mesures", clic: "7" },
    { quand: "Une masse peu franche", montre: "Une masse peu franche" }
  ],
  manipuler: [
    { quand: "Maintenant, vous lisez des mesures", montre: "Dix questions, sans note" },
    { quand: "Le premier exercice est résolu", montre: "Exemple du cours. Bornes repérées" },
    { quand: "La réponse est écrite sous les écrans", montre: "La plus forte valeur est 14" },
    { quand: "Chaque fois, cherchez d'abord", montre: "La méthode, dans l'ordre" },
    { quand: "Les questions suivantes vous disent où regarder", montre: "Où : sur les trois écrans : le nombre, et sous l'écran" },
    { quand: "Elles vous disent aussi comment faire", montre: "Comment : trouvez la valeur la plus forte" },
    { quand: "Sous chaque question, vous choisissez", montre: "A. La borne 1." },
    { quand: "Les questions cinq et six", montre: "Vous voulez savoir si l'enroulement principal conduit" },
    { quand: "Dans la question six", montre: "Vous cherchez une masse" },
    { quand: "Les dernières questions ne le disent plus", montre: "Un troisième compresseur, bornes repérées" },
    { quand: "La dixième question parle", montre: "Le circuit frigorifique n'est pas sous vide" }
  ],
  representer: [
    { quand: "Sur un schéma, l'ohmmètre se dessine", montre: "L'ohmmètre : l'appareil qui mesure une résistance" },
    { quand: "Le moteur monophasé est un rond", montre: "Le moteur monophasé" },
    { quand: "La masse, c'est la carcasse", montre: "La masse : la carcasse métallique" },
    { quand: "Regardez le schéma du compresseur", montre: "Le compresseur : C en haut" },
    { quand: "Aller de C à R", montre: "Aller de C à R, c'est traverser le principal seul" },
    { quand: "Regardez maintenant le schéma de mesure", montre: "Pour chercher une masse, un ohmmètre" }
  ]
};
