/* ÉlectroRézo 2.1 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Ouvrez n'importe quelle boîte de dérivation. Vous trouverez trois fils.
Ils se ressemblent tous. Même cuivre, même épaisseur, même gaine souple. Rien, à les regarder, ne
dit lequel fait quoi.
Et pourtant leurs rôles n'ont rien à voir. L'un amène le courant, l'autre le ramène, et le
troisième ne fait rien du tout — jusqu'au jour où il sauve quelqu'un.
Apprendre à les distinguer, c'est la première chose qu'on fait en arrivant devant une
installation.`,

  comprendre: `Regardons-les un par un, avec le dessin.
La phase, d'abord. C'est elle qui porte la tension. Entre elle et la terre, il y a deux cent
trente volts — et donc du danger.
Comment la reconnaît-on à la couleur ? Par élimination, et c'est ce qui surprend. La phase peut
être de n'importe quelle couleur : rouge, marron, noir, violet. N'importe laquelle, sauf deux.
Le neutre, ensuite. Il ferme la boucle : le courant part par la phase et revient par lui.
Et il a une particularité qu'il faut connaître. Au poste de distribution, en amont, le neutre est
relié à la terre. C'est pour ça qu'entre le neutre et la terre, un voltmètre ne lit presque rien.
Sa couleur est le bleu clair, et elle lui est réservée.
Le troisième, maintenant. Le conducteur de protection, qu'on note P E.
Regardez le dessin en marche normale : il ne transporte rien. Absolument rien. Il est là, il
attend, et il ne sert à rien.
Maintenant, appuyez sur le second bouton. Un isolant a lâché, la phase touche la carcasse
métallique de la machine.
Le courant part immédiatement par le vert et jaune. Il descend au piquet de terre. Et parce qu'il
est parti par là, il manque au retour — ce qui est exactement ce que le différentiel détecte.
Sa couleur est le vert et jaune, et elle lui est réservée elle aussi.
Deux couleurs réservées, dans le monde entier. Employer du bleu pour une phase, ou du vert-jaune
pour autre chose que la protection, ce n'est pas une négligence de finition. C'est une faute qui
peut coûter la vie à celui qui viendra après vous.`,

  manipuler: `Maintenant, un cas très concret. Vous ouvrez un coffret ancien. Trois fils, et les couleurs ne
vous inspirent pas confiance — parce que quelqu'un est passé avant vous.
Comment fait-on ? Trois mesures suffisent, et le tableau vous les donne.
Entre le premier et le deuxième : deux cent trente volts. Entre le premier et le troisième : deux
cent trente volts aussi. Entre le deuxième et le troisième : zéro.
Voilà, c'est fini. Les deux qui donnent zéro entre eux sont le neutre et la protection : ils sont
reliés ensemble en amont. Et celui qui donne deux cent trente avec les deux autres, c'est la
phase.
Un mot sur le tournevis testeur, celui qui a une petite lampe dans le manche. Il vous dit qu'il y
a de la tension. Il ne vous dit pas combien, ni entre quoi et quoi.
C'est un indicateur, pas un instrument de mesure. Il ne remplace ni le multimètre, ni le
vérificateur d'absence de tension.
Et je termine par la règle qui compte le plus. Sur une installation ancienne ou modifiée, ne vous
fiez jamais à la couleur seule.
Un fil bleu employé comme phase, ça existe. Ça a tué. On mesure d'abord, on conclut ensuite.`,

  representer: `Sur un plan, les trois conducteurs portent des repères, et ce sont des lettres.
L majuscule pour la phase. En triphasé, ce sera L un, L deux, L trois.
N majuscule pour le neutre.
Et P E majuscules pour le conducteur de protection.
Une précision de vocabulaire, parce qu'on emploie souvent un mot pour l'autre. On dit couramment
« la terre ». Mais la terre, à proprement parler, c'est le sol. Le P E, c'est le fil qui y mène.
Ce n'est pas un pinaillage : sur un plan, les deux se dessinent différemment.
Et maintenant, la chose que je veux que vous cherchiez sur tout schéma que vous ouvrirez.
Le conducteur de protection ne porte jamais d'appareil de coupure. Jamais.
Pas de disjoncteur dessus, pas de sectionneur, pas de fusible, pas de bornier débrochable. Rien.
Si vous en voyez un sur un plan, ce n'est pas une subtilité que vous n'auriez pas comprise. C'est
une faute, et il faut la signaler.
Pourquoi cette sévérité ? Parce qu'un P E coupé ne se voit pas. L'installation continue de
fonctionner normalement, tout a l'air en ordre — et la protection n'existe plus.`
};
