/* ÉlectroRézo 7.2 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `La station précédente vous a montré le principe. Voici l'appareil qui le met en œuvre.
Un gradateur, c'est un interrupteur. Mais un interrupteur électronique, sans pièce mobile, qui
ouvre et ferme cent fois par seconde.
Vous en avez probablement un chez vous, sur un variateur de lumière. Et en industrie, on en
trouve sur toutes les régulations de résistances de chauffage.`,

  comprendre: `À l'intérieur, le composant s'appelle un triac. Et je veux vous expliquer comment il travaille,
parce que c'est astucieux.
Un triac ne sait pas s'ouvrir.
Ça paraît être un défaut rédhibitoire pour un interrupteur. Ça ne l'est pas, et voici pourquoi.
On lui envoie une impulsion : il se ferme, et le courant passe. Puis on ne fait plus rien.
Quelques millisecondes plus tard, le courant alternatif passe naturellement par zéro. Et à cet
instant, le triac se lâche tout seul.
Vous voyez l'élégance : il n'a pas besoin de savoir s'ouvrir, parce que l'alternatif le fait pour
lui. Cent fois par seconde.
C'est aussi pour ça qu'un gradateur ne fonctionne pas en courant continu : un triac fermé ne se
rouvrirait jamais.
Maintenant, le réglage. Ce qu'on règle, ce n'est pas une tension. C'est un instant.
On choisit à quel moment de chaque alternance on envoie l'impulsion. Tôt : le triac conduit
presque toute l'alternance, et il passe beaucoup de courant. Tard : il ne conduit que la fin, et
il en passe peu.
Servez-vous du curseur et regardez la courbe. La hauteur ne change jamais. C'est la durée qui
change.
Et la valeur efficace, elle, suit. C'est elle qui décide de la puissance dans la charge.
Un mot enfin sur la chaleur. Un triac qui conduit chauffe. Presque tous les gradateurs ont une
plaque d'aluminium à ailettes.`,

  manipuler: `Les trois questions.
Faites attention à la troisième : elle est vraie pour une raison très concrète, celle que je viens
de vous expliquer.`,

  representer: `Sur un plan, tous les convertisseurs se dessinent de la même façon, et c'est une écriture que
je trouve très bien faite.
Un rectangle barré en diagonale. De part et d'autre de la diagonale, deux signes : ce qui entre,
ce qui sort.
Pour un gradateur : le signe de l'alternatif des deux côtés. Il entre de l'alternatif, il sort de
l'alternatif.
Vous verrez à la station suivante un symbole de la même famille, mais avec autre chose écrit
dedans. Et vous saurez immédiatement ce que fait l'appareil, sans notice.
C'est exactement l'esprit de la ligne huit : on ne mémorise pas, on lit.
Trois conseils de câblage pour finir.
Un gradateur se monte en série sur la phase, comme un interrupteur. Jamais en parallèle.
Vérifiez la nature de la charge avant de choisir. Résistive, inductive, à LED : ce n'est pas la
même électronique, et un gradateur mal choisi grille.
Et laissez de la place autour de son radiateur. Encastré dans une boîte fermée, un gradateur
déclasse fortement — parfois de moitié.
Enfin, la mise en garde qui reprend toute la station précédente : un gradateur ne convient pas à
un moteur, sauf s'il est explicitement prévu pour. Sur un moteur asynchrone, le couple s'écroule
et l'intensité monte.`
};
