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
Cherchez un condensateur près du moteur. Aucun n'est dessiné. Cherchez un fil par vitesse. Aucun n'est dessiné non plus.`,

  comprendre: `Le moteur E C de la notice s'alimente en deux cent trente volts monophasé, à plus ou moins cinq pour cent.
La notice demande un disjoncteur adapté.
Sa vitesse suit un signal de commande. Ce signal est une tension continue, comprise entre zéro et dix volts.
La commande est proportionnelle : la vitesse suit le signal. Le signal vient du régulateur. L'installateur le pose,
car il n'est pas dans l'appareil.
Le bloc repéré I N V est l'électronique du moteur. La notice l'appelle inverter.
Comparez avec la version A C de la même notice. Son moteur est monophasé, avec un condensateur.
Un commutateur et un autotransformateur lui donnent trois vitesses sur six. Le schéma porte un condensateur,
le fil commun Com et trois fils de vitesse, Max, Med et Min.
Sur la version E C, il n'y a ni commutateur, ni autotransformateur, ni condensateur dessiné.
Selon le modèle, le moteur E C est une variante ou une option. La notice d'un ventilo-convecteur donne chaque modèle
en version A C ou E C. Le catalogue d'un évaporateur donne le moteur E C en option.
Un mot sur les circulateurs, qui sont des pompes. Leurs notices décrivent un rotor à aimants permanents.
L'électronique commute les bobines : elle change leur polarité selon le besoin. Cette description vient des notices
de circulateurs. Les notices de ventilateurs de cette station ne parlent pas d'aimants.
Pour le contrôle et le dépannage, la notice demande de se référer au manuel du régulateur.`,

  manipuler: `Un ventilo-convecteur existe en deux versions. La version A C a un moteur avec condensateur, et un commutateur
qui choisit trois vitesses par un autotransformateur. Elle n'a pas de signal de zéro à dix volts. C'est l'exemple résolu.
À vous. Ouvrez le temps deux. Le schéma du bas est celui de la version E C. Cherchez trois choses : un condensateur,
un commutateur de vitesse, un signal de zéro à dix volts. Cochez ce que la version E C porte, puis validez.
Ensuite, lisez le câblage. Avant de toucher aux fils, consignez l'appareil. Le bornier X un reçoit cinq fils :
P E, L, N, le signal et G N D. Le deux cent trente volts alimente le moteur. Le signal règle sa vitesse.`,

  representer: `Le moteur E C se dessine avec le symbole du moteur monophasé : un rond avec la lettre M, le chiffre un et un petit
trait ondulé. Ce symbole est le même pour un moteur à condensateur. Il ne dit pas si le moteur est E C.
Reprenez le schéma du temps un, de haut en bas. Le régulateur, puis le bornier X un, puis le moteur
sous son bloc I N V.
Sur le schéma d'un groupe de condensation, le condenseur standard a un moteur à deux fils, le condenseur E C en a quatre,
repérés P H, N, dix V et zéro V.
P H veut dire phase, et N veut dire neutre.`
};
