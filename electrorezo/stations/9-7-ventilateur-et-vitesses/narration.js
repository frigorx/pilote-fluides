/* ÉlectroRézo 9.7 : textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits le 29/10/2026.
   Non validés, aucun MP3 fabriqué. Les sigles P S C, P V, M V et G V, et les lettres B, R, N, J, V, se disent lettre par lettre. */
const NARRATION = {

  decouvrir: `Un ventilateur de climatiseur peut tourner à plusieurs vitesses.
Regardez le ventilo-convecteur éclaté, sur la première image. Le moteur est entre deux turbines. Une turbine est la roue du
ventilateur. Elle est montée sur l'arbre du moteur. Le repère cinq, sur le dessin, est le condensateur : le moteur de
ce ventilateur est un moteur P S C, à condensateur permanent.
Sur la deuxième image, des moto-ventilateurs sont posés sur leur platine. Un moto-ventilateur est un moteur avec
ses turbines. Certains ont deux turbines, un autre n'en a qu'une.
Regardez enfin le schéma. En haut, l'alimentation arrive à un commutateur. Il a trois positions : petite
vitesse à gauche, moyenne vitesse au milieu, grande vitesse à droite. Le trait oblique est posé sur la petite
vitesse. Sous le commutateur, le moteur est entouré de pointillés. Il porte deux bobines, appelées
impédances, puis deux enroulements et un condensateur.`,

  comprendre: `Le ventilateur d'une unité intérieure est centrifuge, pour limiter le bruit. Il a une ou deux turbines.
L'unité extérieure a un ventilateur à hélice.
Pour changer de vitesse, il existe trois façons, selon le modèle. La première met une impédance en série avec
le moteur. Une impédance est une bobine. Elle fait chuter la tension aux bornes du moteur. Le couple baisse,
et la vitesse aussi. La deuxième façon utilise un autotransformateur, qui offre le choix de
plusieurs vitesses. La troisième utilise un moteur qui porte plusieurs bobinages.
En grande vitesse, le courant ne traverse aucune impédance : le moteur reçoit la tension du réseau.
En petite vitesse, on intercale la plus grande impédance.
Le constructeur ne câble que trois vitesses sur six. Avant de démonter, repérez et notez les vitesses câblées.
Sur la notice d'un moto-ventilateur, le fil rouge donne la
petite vitesse, le fil gris la moyenne vitesse, et le fil noir la grande vitesse. Le fil vert et jaune va à
la terre. Ces couleurs changent d'un moteur à l'autre : lisez la notice du moteur.
Le moteur Dahlander est un moteur triphasé. Il change le nombre de pôles, ce qui est un autre principe.
En baccalauréat professionnel, on lit aussi les cinq fils du moteur à l'ohmmètre. Le tableau donne la mesure
entre chaque paire de fils.`,

  manipuler: `Regardez d'abord l'exemple résolu. Le cours montre un commutateur : en petite vitesse, le courant traverse une bobine en
série avec le moteur. Ce ventilateur a donc ses vitesses par une impédance en série.
À vous maintenant. La notice d'un ventilo-convecteur de taille un dit : six vitesses réalisées à partir d'un
autotransformateur. Relisez ces mots. Les trois cases sont trois façons d'obtenir des vitesses. Cochez ce qui
donne les vitesses de cet appareil, puis validez.
Ensuite, regardez le câblage. Les couleurs des fils se lisent sur le dessin de la notice, juste dessous. Pour la petite vitesse, la
plus grande impédance est en série avec le moteur. Un condensateur reste chargé après la coupure : on le décharge
avec une résistance avant d'y toucher.`,

  representer: `Deux symboles sont à reconnaître.
Une impédance se dessine comme une bobine : quatre petits arcs alignés. Le condensateur est formé de
deux traits parallèles. Le commutateur de vitesse a une entrée, le commun du
commutateur, et trois sorties. Un trait oblique montre la position choisie.
Regardez maintenant le schéma du moteur, à droite. Il se lit de haut en bas. L'alimentation arrive au commun du commutateur. Chaque sortie est
reliée à un fil du moteur. La petite vitesse va au fil rouge, la moyenne vitesse au fil bleu, la grande
vitesse au fil noir.
Entre le rouge et le bleu, une impédance. Entre le bleu et le noir, une seconde impédance. Sur la petite
vitesse, le courant traverse donc les deux. Sur la grande vitesse, il arrive au fil noir sans en traverser
aucune.
Le fil noir est le commun des enroulements. De là partent le principal, vers le fil vert, et
l'auxiliaire, vers le fil jaune. Le condensateur est entre le jaune et le vert.`
};

/* Le guidage : ce que l'écran montre pendant que la voix parle (moteur : _commun/station.js, « Le guidage »). */
window.GUIDAGE = {
  decouvrir: [
    { quand: "Un ventilateur de climatiseur peut tourner", montre: "Le ventilateur d'une unité intérieure souffle l'air" },
    { quand: "Regardez le ventilo-convecteur éclaté", montre: "Un ventilo-convecteur éclaté. Le moteur est entre deux turbines" },
    { quand: "Sur la deuxième image", montre: "Des moto-ventilateurs. Un moto-ventilateur est un moteur" },
    { quand: "Regardez enfin le schéma", montre: "Le moteur et ses vitesses. Le commutateur choisit la vitesse" }
  ],
  comprendre: [
    { quand: "Le ventilateur d'une unité intérieure est centrifuge", montre: "celui d'une unité intérieure porte une ou deux turbines" },
    { quand: "Pour changer de vitesse, il existe trois façons", montre: "Les variantes" },
    { quand: "La première met une impédance en série", montre: "Une impédance en série avec le moteur PSC" },
    { quand: "La deuxième façon utilise un autotransformateur", montre: "Un autotransformateur : il offre le choix" },
    { quand: "La troisième utilise un moteur", montre: "Un moteur multibobinage : le moteur porte lui-même" },
    { quand: "En grande vitesse, le courant ne traverse aucune", montre: "il a une position par vitesse" },
    { quand: "Le constructeur ne câble que trois vitesses", montre: "Le constructeur câble trois vitesses sur six" },
    { quand: "Sur la notice d'un moto-ventilateur", montre: "Le code des fils. Rouge, petite vitesse" },
    { quand: "Le moteur Dahlander est un moteur triphasé", montre: "Le Dahlander est un moteur triphasé à deux vitesses" },
    { quand: "En baccalauréat professionnel, on lit aussi", montre: "En Bac pro : les cinq fils. Cherchez la ligne" }
  ],
  manipuler: [
    { quand: "Regardez d'abord l'exemple résolu", montre: "Exemple résolu. Le cours montre un commutateur PV et GV" },
    { quand: "À vous maintenant. La notice d'un", montre: "Que sait faire cet appareil" },
    { quand: "Ensuite, regardez le câblage", montre: "Le câblage" },
    { quand: "Les couleurs des fils se lisent sur le dessin", montre: "Le code des fils." },
    { quand: "Pour la petite vitesse, la plus grande impédance", montre: "Sur un montage à impédance, la plus grande vitesse s'obtient" },
    { quand: "Un condensateur reste chargé après la coupure", montre: "Un condensateur reste chargé après la coupure" }
  ],
  representer: [
    { quand: "Deux symboles sont à reconnaître", montre: "Le symbole normalisé" },
    { quand: "Une impédance se dessine comme une bobine", montre: "Impédance : une bobine" },
    { quand: "Le condensateur est formé de deux traits", montre: "Condensateur" },
    { quand: "Le commutateur de vitesse a une entrée", montre: "Le commutateur a trois sorties" },
    { quand: "Regardez maintenant le schéma du moteur", montre: "Le schéma du moteur." },
    { quand: "L'alimentation arrive au commun", montre: "Lisez de haut en bas" },
    { quand: "Chaque sortie est reliée à un fil du moteur", montre: "Chaque sortie va à un fil du moteur" },
    { quand: "Entre le rouge et le bleu, une impédance", montre: "Le cadre en pointillés entoure le moteur" },
    { quand: "Sur la petite vitesse, le courant traverse", montre: "La seconde alimentation arrive sur V" },
    { quand: "Le fil noir est le commun des enroulements", montre: "N est le commun des enroulements" }
  ]
};
