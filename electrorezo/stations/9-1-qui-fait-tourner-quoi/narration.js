/* ÉlectroRézo 9.1 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits le 28/10/2026.
   Non validés, aucun MP3 fabriqué. Les sigles RSIR, CSIR, PSC, CSR se disent lettre par lettre. */
const NARRATION = {

  decouvrir: `Cette station ouvre la ligne du moteur monophasé.
Regardez une chambre froide alimentée en deux cent trente volts. Le compresseur tourne. Le ventilateur du
condenseur tourne. Celui de l'évaporateur aussi. Sur un climatiseur, la turbine de l'unité intérieure
souffle l'air de la pièce.
Chacune de ces machines a son moteur. Sur un appareil en deux cent trente volts, c'est le plus souvent un moteur monophasé.
Vous avez vu à la station six point cinq qu'un moteur monophasé ne démarre pas seul. Il lui faut un
deuxième enroulement, et souvent un condensateur.
Dans cette ligne, on regarde comment chacun de ces moteurs démarre. Et on commence par le plus
important, celui du compresseur.`,

  comprendre: `Le compresseur hermétique a trois bornes.
C, le commun. R, la marche, c'est l'enroulement principal. S, le démarrage, c'est l'enroulement
auxiliaire.
L'organe de démarrage est un relais d'intensité, un relais de tension, ou une CTP. Le relais agit quand
le moteur atteint à peu près quatre-vingts pour cent de sa vitesse. La CTP est une petite résistance
dont la valeur monte quand elle chauffe : elle coupe quand elle a chauffé. Selon le montage, il retire l'enroulement auxiliaire, ou seulement le
condensateur de démarrage.
Regardez maintenant le tableau. Il y a quatre montages, et le constructeur les désigne par un sigle. Ces sigles viennent de l'anglais :
capacitor veut dire condensateur, start démarrage, et run marche.
Le RSIR n'a aucun condensateur. Un relais d'intensité, ou une CTP, retire l'auxiliaire. Son couple au
démarrage est faible.
Le CSIR ajoute un condensateur de démarrage. Le couple au démarrage devient fort.
Le PSC a un seul condensateur, permanent. Il reste en service, alors il n'y a aucun relais. Son couple
au démarrage est faible.
Le CSR a les deux condensateurs, de démarrage et permanent. Un relais de tension retire celui de
démarrage, et l'auxiliaire reste en service avec le permanent.
Et la dernière colonne relie tout cela au circuit frigorifique.
Avec un capillaire, les pressions s'égalisent pendant l'arrêt. Le compresseur repart avec un faible
couple : un RSIR ou un PSC suffit.
Avec un détendeur thermostatique, les pressions ne s'égalisent pas toujours à l'arrêt. Le compresseur doit partir en charge :
il lui faut un condensateur de démarrage, donc un CSIR ou un CSR.
Pour les ventilateurs et la turbine, c'est plus court. Le plus souvent, un condensateur permanent,
comme le PSC. Sur les
petits ventilateurs, une bague de déphasage. Et sur les appareils récents, un moteur électronique,
qu'on verra à la fin de la ligne.`,

  manipuler: `Le compresseur de l'exercice porte le sigle CSIR.
Revenez au tableau du temps deux, et lisez la ligne CSIR, case par case. Elle vous dit s'il a un
condensateur de démarrage, un condensateur permanent, et un relais.
Cochez ce qu'il porte, puis validez.
Ensuite, lisez le câblage. Une consigne revient dans toute la ligne : un condensateur reste chargé
après la coupure. On le décharge avec une résistance avant d'y toucher.`,

  representer: `Le moteur monophasé est un rond marqué M, avec le signe un et une petite vague. Sur le schéma du constructeur, le moteur du compresseur montre ses trois bornes, C, S et R.
Le condensateur, ce sont deux traits parallèles qui ne se touchent pas. Sa capacité en microfarads
est écrite à côté.
La CTP se dessine comme une résistance, un rectangle, marqué de la lettre T.
Le protecteur thermique, qu'on appelle souvent Klixon, a son propre symbole. Il coupe le moteur quand
il chauffe trop.
Sur la notice du constructeur, le sigle du montage est souvent écrit au-dessus du schéma. Lisez-le
en premier : il vous dit quelles pièces chercher dans le boîtier électrique.
Les stations suivantes prennent chaque montage un par un, avec son schéma de câblage.`
};
