/* ÉlectroRézo 9.9 : textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits le 29/10/2026.
   Non validés, aucun MP3 fabriqué. Les sigles E C, A C, P E, G N D, I N V, P H et les lettres L, N, M se disent lettre par lettre. */
const NARRATION = {

  decouvrir: `Le moteur E C fait tourner le ventilateur d'un ventilo-convecteur. Ces deux lettres veulent dire commutation électronique.
Regardez le schéma. Il se lit de haut en bas, en trois cadres. En haut, le régulateur. Au milieu, le bornier X un.
En bas, le moto-ventilateur, c'est-à-dire le moteur et son ventilateur.
Cinq fils descendent du haut vers le bas. Le premier est la terre, repérée P E. Les quatre autres sont L, N, zéro à dix volts,
et G N D. Le régulateur fournit ces quatre fils. L et N amènent le deux cent trente volts.
Dans le cadre du bas, les cinq fils arrivent sur un bloc repéré I N V. Le moteur est sous ce bloc.
Près du moteur, aucun condensateur n'est dessiné. Aucun fil ne porte de vitesse non plus.`,

  comprendre: `Le moteur E C de la notice s'alimente en deux cent trente volts monophasé, à plus ou moins cinq pour cent.
La notice demande un disjoncteur adapté.
Sa vitesse suit un signal de commande. Ce signal est une tension continue, comprise entre zéro et dix volts.
La commande est proportionnelle : la vitesse suit le signal. Le signal vient du régulateur. L'installateur le pose,
car il n'est pas dans l'appareil.
Sur le deuxième schéma, le bloc repéré I N V est l'électronique du moteur. La notice l'appelle inverter.
Comparez avec la version A C de la même notice, sur le premier schéma. Son moteur est monophasé, avec un condensateur.
Le schéma porte un condensateur, le fil commun Com et trois fils de vitesse, Max, Med et Min.
Un commutateur et un autotransformateur lui donnent trois vitesses sur six.
Sur la version E C, il n'y a ni commutateur, ni autotransformateur, ni condensateur dessiné.
À droite, dans les variantes : selon le modèle, le moteur E C est une variante ou une option. La notice d'un ventilo-convecteur donne chaque modèle
en version A C ou E C. Le catalogue d'un évaporateur donne le moteur E C en option.
Plus bas, un mot sur les circulateurs, qui sont des pompes. Leurs notices décrivent un rotor à aimants permanents.
L'électronique commute les bobines : elle change leur polarité selon le besoin. Cette description vient des notices
de circulateurs. Les notices de ventilateurs de cette station ne parlent pas d'aimants.
Pour le contrôle et le dépannage, la notice demande de se référer au manuel du régulateur.`,

  manipuler: `Voici d'abord l'exemple résolu. Un ventilo-convecteur existe en deux versions. La version A C a un moteur
avec condensateur, et un commutateur qui choisit trois vitesses par un autotransformateur. Elle n'a pas de signal de
zéro à dix volts.
À vous maintenant : la version E C du même appareil. Regardez son schéma, sous la consigne : c'est la page dix de la
notice. Cherchez-y un condensateur près du moteur, un commutateur de vitesse et un signal de zéro à dix volts au bornier.
Dessous, trois propositions, chacune avec sa définition.
Cochez ce que la version E C porte.
Puis appuyez sur Valider. Le résultat s'affiche juste dessous.
Ensuite, regardez le câblage, à droite. Avant de toucher aux fils, consignez l'appareil. Le bornier X un reçoit cinq fils :
P E, L, N, le signal et G N D. Le deux cent trente volts alimente le moteur. Le signal règle sa vitesse.`,

  representer: `Regardez le symbole, à gauche. Le moteur E C se dessine avec le symbole du moteur monophasé : un rond avec la lettre M,
le chiffre un et un petit trait ondulé. Ce symbole est le même pour un moteur à condensateur. Il ne dit pas si le moteur est E C.
À droite, regardez le schéma de câblage. Il se lit de haut en bas, en trois cadres, et le texte, dessous, le décrit.
Le cadre du haut est le régulateur.
Le cadre du milieu est le bornier X un. Le cadre du bas est le moto-ventilateur : les cinq fils arrivent sur le bloc
I N V. Sous ce bloc se trouve le moteur, le rond M un.
Autre exemple avec le même symbole. Sur le schéma d'un groupe de condensation, le condenseur standard a un moteur à
deux fils. Le condenseur E C a le même rond, mais quatre fils, repérés P H, N, dix V et zéro V.
P H veut dire phase, et N veut dire neutre.`
};

/* Le guidage : ce que l'écran montre pendant que la voix parle (moteur : _commun/station.js, « Le guidage »).
   Aucun clic dans le temps trois : l'élève coche et valide seul. */
window.GUIDAGE = {
  decouvrir: [
    { quand: "Le moteur E C fait tourner", montre: "Un moteur EC, ou moteur à commutation électronique" },
    { quand: "Regardez le schéma. Il se lit", montre: "Le câblage EC" }
  ],
  comprendre: [
    { quand: "Le moteur E C de la notice s'alimente", montre: "Le moteur EC de la notice s'alimente en 230 V monophasé" },
    { quand: "Sa vitesse suit un signal", montre: "La vitesse suit un signal 0..10 V" },
    { quand: "Sur le deuxième schéma, le bloc", montre: "Version EC, page 10 de la notice" },
    { quand: "Comparez avec la version A C", montre: "Version AC, page 6 de la notice" },
    { quand: "Un commutateur et un autotransformateur", montre: "Un autotransformateur offre le choix de trois vitesses sur six" },
    { quand: "À droite, dans les variantes", montre: "Les variantes" },
    { quand: "La notice d'un ventilo-convecteur donne", montre: "Variante : la notice d'un ventilo-convecteur donne chaque modèle" },
    { quand: "Le catalogue d'un évaporateur donne", montre: "Option : le catalogue d'un évaporateur propose" },
    { quand: "Plus bas, un mot sur les circulateurs", montre: "Les notices de circulateurs, qui sont des pompes" },
    { quand: "Pour le contrôle et le dépannage", montre: "Pour le contrôle et le dépannage du moteur EC" }
  ],
  manipuler: [
    { quand: "Voici d'abord l'exemple résolu", montre: "Exemple résolu. Le ventilo-convecteur à moteur AC" },
    { quand: "À vous maintenant", montre: "Version EC, page 10 de la notice" },
    { quand: "Dessous, trois propositions", montre: "Que sait faire cet appareil" },
    { quand: "Puis appuyez sur Valider", montre: "Valider" },
    { quand: "Ensuite, regardez le câblage", montre: "Le câblage" },
    { quand: "Avant de toucher aux fils", montre: "Avant de toucher au câblage, consignez l'appareil" },
    { quand: "Le bornier X un reçoit", montre: "Le bornier X1 reçoit cinq fils" },
    { quand: "Le deux cent trente volts alimente", montre: "Le 230 V alimente le moteur" }
  ],
  representer: [
    { quand: "Regardez le symbole, à gauche", montre: "le même symbole pour un moteur EC" },
    { quand: "À droite, regardez le schéma de câblage", montre: "Le câblage EC." },
    { quand: "Le cadre du haut est le régulateur", montre: "Le cadre du haut est le régulateur" },
    { quand: "Le cadre du milieu est le bornier", montre: "Le cadre du milieu est le bornier X1" },
    { quand: "Le cadre du bas est le moto-ventilateur", montre: "Le cadre du bas est le moto-ventilateur EC" },
    { quand: "Sous ce bloc se trouve le moteur", montre: "Sous le bloc, cherchez le rond M 1" },
    { quand: "Autre exemple avec le même symbole", montre: "le même symbole pour un moteur EC" }
  ]
};
