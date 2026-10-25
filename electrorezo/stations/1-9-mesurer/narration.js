/* ÉlectroRézo 1.9 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Les MP3 sont refaits en Piper à chaque changement de texte. */
const NARRATION = {

  decouvrir: `Dernière station de la ligne, et c'est celle qui rend toutes les autres utiles.
Vous avez appris les grandeurs de base. Elles ne servent à rien si vous ne savez pas les relever.
Pour les trois mesures de base, la tension, le courant et la résistance, il y a deux outils dans
la caisse. Le multimètre, qui fait presque tout. Et la pince, qui mesure un courant
sans rien toucher. La puissance, l'énergie et l'isolement ont leurs propres appareils : vous les
avez vus aux stations un point quatre et un point huit.
Savoir s'en servir, ce n'est pas une option. C'est la différence entre diagnostiquer et deviner.`,

  comprendre: `Prenons le multimètre, et servez-vous des boutons sous le dessin.
Il y a deux réglages, et pas un seul. C'est ça que beaucoup ne comprennent pas.
Le premier, c'est la molette : elle dit ce qu'on mesure. Tension, courant, résistance.
Le second, c'est la borne dans laquelle on met la pointe rouge. Il y en a une pour les tensions
et les résistances, et une autre pour les ampères.
Et les deux doivent dire la même chose.
Essayez maintenant les combinaisons. Molette sur tension, pointe dans la borne des volts : ça
marche. Molette sur tension, pointe dans la borne des ampères : c'est la plus dangereuse des
erreurs. Cette borne est un quasi court-circuit : sur une prise vivante, le fusible de l'appareil
fond, et un arc est possible.
Une habitude à prendre tout de suite : la pointe noire va dans la borne marquée COM, et elle n'en
bouge jamais. Jamais.
C'est la rouge qu'on déplace selon ce qu'on veut mesurer. Et c'est donc elle, toujours elle, qui
est en cause quand ça ne marche pas.
Regardez maintenant la position ohms. La borne est la bonne pour une résistance — mais la position
ne s'emploie que hors tension, sur un élément débranché d'au moins un côté. Sur une prise vivante,
comme ici, la valeur est fausse et l'appareil peut être détruit.`,

  manipuler: `Passons à la pince, parce qu'elle mérite qu'on explique pourquoi elle est si commode.
Pour mesurer un courant au multimètre, il faut ouvrir le circuit et y insérer l'appareil. Sur une
machine, ça veut dire : l'arrêter, la consigner, défaire un fil.
Personne ne fait ça pour un simple contrôle.
La pince, elle, s'ouvre, enserre le conducteur, et lit. Elle ne touche rien d'électrique. Elle
lit le champ magnétique qui entoure le fil, et elle en déduit le courant.
Aucun contact électrique avec le fil, aucune coupure. La machine continue de tourner pendant que
vous mesurez. Un seul point de vigilance : dans une armoire, ne refermez pas la mâchoire sur deux
pièces nues à la fois. Et la pince porte, comme le multimètre, sa catégorie de mesure.
Deux règles avec elle, et elles sont simples. Un seul conducteur à la fois : si vous prenez la
phase et le neutre d'un même circuit, l'aller annule le retour. Et bien refermer la mâchoire,
sinon la lecture est basse.
Une dernière chose, très importante, et je vais être direct.
Ne concluez jamais « c'est hors tension » sur une seule lecture à zéro.
Un appareil éteint affiche zéro. Un cordon coupé à l'intérieur affiche zéro. Une mauvaise position
peut afficher zéro. Une pile usée peut fausser la lecture.
La méthode, c'est : on vérifie l'appareil sur une source dont on sait qu'elle est vivante, on
mesure ce qu'on veut mesurer, puis on revérifie l'appareil.
Et pour intervenir, on n'emploie pas un multimètre du tout : on emploie un vérificateur d'absence
de tension, qui est fait pour ça, et que l'on vérifie lui aussi, avant et après.`,

  representer: `Cette station n'a pas d'unité à elle. Ce qu'elle a, c'est un marquage que je veux que vous
sachiez lire, parce qu'il concerne votre sécurité.
Sur le corps de tout appareil sérieux, il y a écrit quelque chose comme cat trois, six cents volts.
Ce n'est pas une mention commerciale.
La catégorie dit sur quel type d'installation l'appareil peut travailler sans danger.
CAT deux, c'est les prises et les circuits terminaux. CAT trois, les tableaux et les armoires.
CAT quatre, l'origine de l'installation : le branchement, le compteur, le disjoncteur de branchement.
Pourquoi ça compte ? Parce que plus on remonte vers la source, plus l'énergie disponible en cas
de court-circuit est grande. Un appareil de catégorie deux employé dans une armoire peut exploser
dans la main.
Et attention : les cordons portent aussi leur propre catégorie. C'est la plus faible des deux qui
compte. Un bon appareil avec de mauvais cordons est un mauvais ensemble.
Sur une pince, cherchez enfin la mention True RMS. Elle veut dire que l'appareil calcule la vraie
valeur efficace, y compris sur un signal déformé.
Dès qu'il y a un variateur dans l'installation, le signal n'est plus une belle sinusoïde. Sans
cette fonction, la lecture peut être fausse de vingt pour cent — sans que rien ne le signale.`
};
