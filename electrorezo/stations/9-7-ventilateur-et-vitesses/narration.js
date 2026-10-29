/* ÉlectroRézo 9.7 : textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits le 29/10/2026.
   Non validés, aucun MP3 fabriqué. Les sigles P S C, P V, M V et G V, et les lettres B, R, N, J, V, se disent lettre par lettre. */
const NARRATION = {

  decouvrir: `Un ventilateur de climatiseur peut tourner à plusieurs vitesses.
Regardez le ventilo-convecteur éclaté. Le moteur est entre deux turbines. Une turbine est la roue du
ventilateur. Elle est montée sur l'arbre du moteur. Cherchez aussi le condensateur, repère cinq : le moteur de
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
Le constructeur ne câble que trois vitesses sur six. Sur la notice d'un moto-ventilateur, le fil rouge donne la
petite vitesse, le fil gris la moyenne vitesse, et le fil noir la grande vitesse. Le fil vert et jaune va à
la terre. Ces couleurs changent d'un moteur à l'autre : lisez la notice du moteur. Avant de démonter, repérez et notez les vitesses câblées.
Le moteur Dahlander est un moteur triphasé. Il change le nombre de pôles, ce qui est un autre principe.
En baccalauréat professionnel, on lit aussi les cinq fils du moteur à l'ohmmètre. Le tableau donne la mesure
entre chaque paire de fils.`,

  manipuler: `Dans l'exemple, le cours montre un commutateur : en petite vitesse, le courant traverse une bobine en
série avec le moteur. Ce ventilateur a donc ses vitesses par une impédance en série.
À vous maintenant. La notice d'un ventilo-convecteur de taille un dit : six vitesses réalisées à partir d'un
autotransformateur. Relisez ces mots. Puis cherchez, au temps deux, la carte des variantes. Cochez ce qui
donne les vitesses de cet appareil, puis validez.
Ensuite, lisez le câblage. Les couleurs des fils se lisent sur la notice. Pour la petite vitesse, la plus
grande impédance est en série avec le moteur. Un condensateur reste chargé après la coupure : on le décharge
avec une résistance avant d'y toucher.`,

  representer: `Deux symboles sont à reconnaître.
Une impédance se dessine comme une bobine : quatre petits arcs alignés. Le condensateur est formé de
deux traits parallèles. Le commutateur de vitesse se lit sur le schéma du temps un : une entrée, le commun du
commutateur, et trois sorties. Un trait oblique montre la position choisie.
Lisez maintenant le schéma de haut en bas. L'alimentation arrive au commun du commutateur. Chaque sortie est
reliée à un fil du moteur. La petite vitesse va au fil rouge, la moyenne vitesse au fil bleu, la grande
vitesse au fil noir.
Entre le rouge et le bleu, une impédance. Entre le bleu et le noir, une seconde impédance. Sur la petite
vitesse, le courant traverse donc les deux. Sur la grande vitesse, il arrive au fil noir sans en traverser
aucune.
Le fil noir est le commun des enroulements. De là partent le principal, vers le fil vert, et
l'auxiliaire, vers le fil jaune. Le condensateur est entre le jaune et le vert.`
};
