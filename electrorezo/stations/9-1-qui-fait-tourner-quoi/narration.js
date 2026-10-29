/* ÉlectroRézo 9.1 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits le 28/10/2026.
   Non validés, aucun MP3 fabriqué. Les sigles RSIR, CSIR, PSC, CSR se disent lettre par lettre. */
const NARRATION = {

  decouvrir: `Cette station ouvre la ligne du moteur monophasé.
Regardez d'abord le compresseur hermétique, en trois dimensions. Son moteur est enfermé dans une coque d'acier
soudée. Seules trois bornes en sortent, sous un capot.
Regardez ensuite, plus bas, trois machines qui tournent : le compresseur, le ventilateur à hélice et la turbine.
Chacune est entraînée par un moteur. Sur un appareil en deux cent trente volts, c'est le plus souvent un moteur
monophasé.
Le compresseur est dans le groupe de condensation, ou dans l'unité extérieure. Les ventilateurs sont sur les
échangeurs : celui du condenseur et celui de l'évaporateur. Sur un climatiseur, la turbine souffle l'air de la
pièce, dans l'unité intérieure.
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
Dans le tableau, le RSIR n'a aucun condensateur. Un relais d'intensité, ou une CTP, retire l'auxiliaire. Son couple au
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
Pour les ventilateurs et la turbine, regardez les variantes : c'est plus court. Le plus souvent, un condensateur permanent,
comme le PSC. Sur les
petits ventilateurs, une spire de Frager. Et sur les appareils récents, un moteur électronique,
qu'on verra à la fin de la ligne.`,

  manipuler: `Le compresseur de l'exercice porte le sigle CSIR.
Regardez la consigne, sous le titre « Que sait faire cet appareil ». Elle commence par un exemple résolu, la ligne
du RSIR, que vous retrouvez dans le tableau juste en dessous.
À vous maintenant. Dans le même tableau, lisez la ligne du CSIR : d'abord la colonne des condensateurs, puis la
colonne de l'organe de démarrage.
Trois cases sont proposées. Pour chacune, demandez-vous si cette ligne l'annonce.
Cochez ce que ce compresseur porte, puis validez.
Ensuite, regardez la carte « Le câblage ». Une consigne revient dans toute la ligne : un condensateur reste chargé
après la coupure. On le décharge avec une résistance avant d'y toucher.`,

  representer: `Le moteur monophasé est un rond marqué M, avec le signe un et une petite vague. Le deuxième symbole est le même moteur avec son condensateur. Sur le schéma du constructeur, le moteur du compresseur montre ses trois bornes, C, S et R.
Le condensateur, ce sont deux traits parallèles qui ne se touchent pas. Sa capacité en microfarads
est écrite à côté.
La CTP se dessine comme une résistance, un rectangle, marqué de la lettre T.
Le protecteur thermique, qu'on appelle souvent Klixon, a son propre symbole. Il coupe le moteur quand
il chauffe trop.
Sur la notice du constructeur, le sigle du montage est souvent écrit au-dessus du schéma. Lisez-le
en premier : il vous dit quelles pièces chercher dans le boîtier électrique.
Les stations suivantes prennent chaque montage un par un, avec son schéma de câblage.`
};

/* Le guidage : ce que l'écran montre pendant que la voix parle (moteur : _commun/station.js, « Le guidage »). */
window.GUIDAGE = {
  decouvrir: [
    { quand: "Cette station ouvre la ligne", montre: "3D" },
    { quand: "Seules trois bornes en sortent", montre: "3D", clic: "1" },
    { quand: "Regardez ensuite, plus bas", montre: "Trois machines qui tournent" },
    { quand: "Le compresseur est dans le groupe", montre: "Le compresseur hermétique est dans le groupe de condensation" },
    { quand: "Dans cette ligne, on regarde", montre: "Dans une installation alimentée en 230 V" }
  ],
  comprendre: [
    { quand: "Le compresseur hermétique a trois bornes", montre: "Les trois bornes du compresseur" },
    { quand: "L'organe de démarrage est", montre: "L'organe de démarrage" },
    { quand: "Regardez maintenant le tableau", montre: "Couple au démarrage", clic: "En schéma" },
    { quand: "Ces sigles viennent de l'anglais", montre: "Les sigles viennent de l'anglais" },
    { quand: "Dans le tableau, le RSIR", montre: "RSIR" },
    { quand: "Le CSIR ajoute un condensateur", montre: "CSIR" },
    { quand: "Le PSC a un seul condensateur", montre: "PSC" },
    { quand: "Le CSR a les deux condensateurs", montre: "CSR" },
    { quand: "Et la dernière colonne", montre: "Détente" },
    { quand: "Avec un capillaire, les pressions", montre: "Un capillaire laisse les pressions" },
    { quand: "Avec un détendeur thermostatique", montre: "capillaire ou détendeur thermostatique" },
    { quand: "Pour les ventilateurs et la turbine", montre: "Le ventilateur à hélice" },
    { quand: "Et sur les appareils récents", montre: "Le moteur EC" }
  ],
  manipuler: [
    { quand: "Le compresseur de l'exercice porte", montre: "Un compresseur porte le sigle CSIR" },
    { quand: "Regardez la consigne, sous le titre", montre: "Exemple résolu. Dans le tableau ci-dessous" },
    { quand: "Elle commence par un exemple résolu", montre: "un relais d’intensité, ou une CTP : il retire l’auxiliaire" },
    { quand: "À vous maintenant. Dans le même tableau", montre: "un de démarrage" },
    { quand: "Trois cases sont proposées", montre: "Que sait faire cet appareil ?" },
    { quand: "Cochez ce que ce compresseur porte", montre: "Valider" },
    { quand: "Ensuite, regardez la carte", montre: "Le câblage" },
    { quand: "Une consigne revient dans toute la ligne", montre: "Un condensateur reste chargé après la coupure" }
  ],
  representer: [
    { quand: "Le moteur monophasé est un rond", montre: "Moteur monophasé" },
    { quand: "Le deuxième symbole est le même moteur", montre: "Avec condensateur" },
    { quand: "Sur le schéma du constructeur, le moteur", montre: "Sur le schéma du constructeur, le moteur du compresseur montre ses trois bornes" },
    { quand: "Le condensateur, ce sont deux traits", montre: "Condensateur" },
    { quand: "La CTP se dessine comme", montre: "CTP" },
    { quand: "Le protecteur thermique, qu'on appelle", montre: "Protecteur thermique" },
    { quand: "Sur la notice du constructeur", montre: "Le sigle du montage, RSIR, CSIR, PSC ou CSR, est souvent écrit" }
  ]
};
