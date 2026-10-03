/* FICHIER FABRIQUÉ par outils/extraire-banques.mjs depuis les stations ÉlectroRézo (lignes 3 à 6) — ne pas éditer.
   24 appareils : titre de la station, « à quoi ça sert », « où on le trouve », porte vers la station. */
window.JR_ELECTROREZO = [
 {
  "id": "3-1-interrupteur",
  "titre": "L’interrupteur",
  "mot": "interrupteur",
  "def": "Ouvrir et fermer un circuit, souvent, pendant que le courant passe. C’est l’appareil de la manœuvre quotidienne : on l’actionne dix fois par jour sans y penser.",
  "ou": "Sur un mur, sur une machine, dans un tableau. Partout où quelqu’un doit allumer ou éteindre quelque chose.",
  "porte": {
   "t": "ÉlectroRézo 3.1 — L’interrupteur",
   "h": "../electrorezo/stations/3-1-interrupteur/"
  }
 },
 {
  "id": "3-2-sectionneur",
  "titre": "Le sectionneur",
  "mot": "sectionneur",
  "def": "Séparer une installation du réseau, de façon sûre et vérifiable, pour que quelqu’un puisse travailler derrière. Ce n’est pas un appareil de commande : c’est un appareil de sécurité.",
  "ou": "En tête d’armoire, en amont d’une machine, partout où une intervention est prévue.",
  "porte": {
   "t": "ÉlectroRézo 3.2 — Le sectionneur",
   "h": "../electrorezo/stations/3-2-sectionneur/"
  }
 },
 {
  "id": "3-3-interrupteur-sectionneur",
  "titre": "L’interrupteur-sectionneur",
  "mot": "interrupteur-sectionneur",
  "def": "Faire les deux métiers à la fois : couper pendant que le courant passe, et isoler pour qu’on travaille derrière. C’est le seul appareil de cette ligne qui sait les deux.",
  "ou": "Sur le flanc des machines, en tête d’armoire, partout où l’on doit à la fois arrêter et intervenir. On l’appelle aussi interrupteur de proximité.",
  "porte": {
   "t": "ÉlectroRézo 3.3 — L’interrupteur-sectionneur",
   "h": "../electrorezo/stations/3-3-interrupteur-sectionneur/"
  }
 },
 {
  "id": "3-4-porte-fusible",
  "titre": "Le porte-fusible",
  "mot": "porte-fusible",
  "def": "Porter la cartouche fusible, tenir le contact à ses deux bouts, et protéger les doigts. Le porte-fusible ne coupe rien lui-même : ce qui travaille, c’est le fil calibré à l’intérieur de la cartouche.",
  "ou": "En tête de circuit, souvent juste après un sectionneur — ou combiné avec lui, station 3.5.",
  "porte": {
   "t": "ÉlectroRézo 3.4 — Le porte-fusible",
   "h": "../electrorezo/stations/3-4-porte-fusible/"
  }
 },
 {
  "id": "3-5-sectionneur-porte-fusible",
  "titre": "Le sectionneur porte-fusible",
  "mot": "sectionneur porte-fusible",
  "def": "Réunir dans un seul boîtier ce que font le sectionneur et le porte-fusible : isoler et se condamner d’un côté, protéger de l’autre. C’est l’appareil de tête d’un très grand nombre d’installations.",
  "ou": "En tête d’armoire, en amont d’un départ moteur, partout où il faut à la fois protéger et pouvoir intervenir.",
  "porte": {
   "t": "ÉlectroRézo 3.5 — Le sectionneur porte-fusible",
   "h": "../electrorezo/stations/3-5-sectionneur-porte-fusible/"
  }
 },
 {
  "id": "4-1-fusible-gg",
  "titre": "Le fusible gG",
  "mot": "fusible gG",
  "def": "Protéger un circuit et ses conducteurs contre les surintensités, quelles qu’elles soient : la surcharge lente comme le court-circuit brutal. La lettre gG veut dire : protection générale, sur toute la plage.",
  "ou": "En tête d’un départ éclairage, prises, chauffage — partout où il n’y a pas de moteur.",
  "porte": {
   "t": "ÉlectroRézo 4.1 — Le fusible gG",
   "h": "../electrorezo/stations/4-1-fusible-gg/"
  }
 },
 {
  "id": "4-2-fusible-am",
  "titre": "Le fusible aM",
  "mot": "fusible aM",
  "def": "Protéger un départ moteur contre le court-circuit, sans fondre au démarrage. La lettre aM veut dire : accompagnement moteur.",
  "ou": "En tête d’un départ moteur, toujours accompagné d’un relais thermique — jamais seul.",
  "porte": {
   "t": "ÉlectroRézo 4.2 — Le fusible aM",
   "h": "../electrorezo/stations/4-2-fusible-am/"
  }
 },
 {
  "id": "4-3-disjoncteur-magneto-thermique",
  "titre": "Le disjoncteur magnéto-thermique",
  "mot": "disjoncteur magnéto-thermique",
  "def": "Protéger un circuit contre la surcharge et le court-circuit, avec un appareil qui se réarme au lieu d’être remplacé.",
  "ou": "Dans tous les tableaux, en tête de chaque circuit. Il a remplacé le fusible dans presque toute l’installation moderne.",
  "porte": {
   "t": "ÉlectroRézo 4.3 — Le disjoncteur magnéto-thermique",
   "h": "../electrorezo/stations/4-3-disjoncteur-magneto-thermique/"
  }
 },
 {
  "id": "4-4-disjoncteur-moteur",
  "titre": "Le disjoncteur moteur",
  "mot": "disjoncteur moteur",
  "def": "Protéger un moteur contre la surcharge et le court-circuit, avec un seul appareil réglable — et qui se condamne.",
  "ou": "En tête d’un départ moteur, à la place du couple fusible aM + relais thermique. Un appareil au lieu de deux.",
  "porte": {
   "t": "ÉlectroRézo 4.4 — Le disjoncteur moteur",
   "h": "../electrorezo/stations/4-4-disjoncteur-moteur/"
  }
 },
 {
  "id": "4-5-interrupteur-differentiel",
  "titre": "L’interrupteur différentiel",
  "mot": "interrupteur différentiel",
  "def": "Protéger les personnes. Il compare le courant qui part et celui qui revient : s’il en manque, c’est qu’il s’échappe quelque part — et il coupe.",
  "ou": "En tête d’une rangée de tableau. Il ne protège aucun circuit contre la surintensité : il n’est là que pour les fuites.",
  "porte": {
   "t": "ÉlectroRézo 4.5 — L’interrupteur différentiel",
   "h": "../electrorezo/stations/4-5-interrupteur-differentiel/"
  }
 },
 {
  "id": "4-6-disjoncteur-differentiel",
  "titre": "Le disjoncteur différentiel",
  "mot": "disjoncteur différentiel",
  "def": "Réunir dans un seul boîtier le disjoncteur et le différentiel : surcharge, court-circuit et défaut d’isolement.",
  "ou": "Sur un circuit qui a besoin de sa propre protection différentielle — plaque de cuisson, borne de recharge, circuit extérieur.",
  "porte": {
   "t": "ÉlectroRézo 4.6 — Le disjoncteur différentiel",
   "h": "../electrorezo/stations/4-6-disjoncteur-differentiel/"
  }
 },
 {
  "id": "4-7-relais-thermique",
  "titre": "Le relais thermique",
  "mot": "relais thermique",
  "def": "Protéger un moteur contre la surcharge, et rien d’autre. Il ne coupe pas la puissance lui-même : il ouvre un contact qui fait retomber le contacteur.",
  "ou": "Directement sous le contacteur du départ moteur, avec un fusible aM ou un disjoncteur en amont pour le court-circuit.",
  "porte": {
   "t": "ÉlectroRézo 4.7 — Le relais thermique",
   "h": "../electrorezo/stations/4-7-relais-thermique/"
  }
 },
 {
  "id": "4-8-terre",
  "titre": "La terre et la liaison équipotentielle",
  "mot": "terre et la liaison équipotentielle",
  "def": "Donner au courant de défaut un chemin de retour, pour que le différentiel puisse le voir. La terre ne protège pas : elle rend la protection possible.",
  "ou": "Un piquet ou une boucle à fond de fouille, un conducteur vert et jaune jusqu’au tableau, puis vers chaque masse métallique.",
  "porte": {
   "t": "ÉlectroRézo 4.8 — La terre et la liaison équipotentielle",
   "h": "../electrorezo/stations/4-8-terre/"
  }
 },
 {
  "id": "5-1-contact-no-nf",
  "titre": "Le contact : repos et travail",
  "mot": "contact",
  "def": "Un contact, c’est l’endroit où le circuit se ferme ou s’ouvre. Deux pièces de métal qui se touchent, ou qui ne se touchent pas. Toute la commande électrique est bâtie là-dessus.",
  "ou": "Dans absolument tout : un bouton, un contacteur, un relais, un thermostat, une fin de course. Chaque fois qu’un appareil « donne un ordre », c’est un contact qui l’exécute.",
  "porte": {
   "t": "ÉlectroRézo 5.1 — Le contact : repos et travail",
   "h": "../electrorezo/stations/5-1-contact-no-nf/"
  }
 },
 {
  "id": "5-2-contacteur",
  "titre": "Le contacteur",
  "mot": "contacteur",
  "def": "À faire commander un gros courant par un tout petit. Vous alimentez une bobine avec quelques milliampères, et trois contacts capables de porter des dizaines d’ampères se ferment d’un coup.",
  "ou": "Dans toute armoire où il y a un moteur, un compresseur, un ventilateur, une résistance de chauffage. Dès qu’une machine se commande à distance, il y a un contacteur.",
  "porte": {
   "t": "ÉlectroRézo 5.2 — Le contacteur",
   "h": "../electrorezo/stations/5-2-contacteur/"
  }
 },
 {
  "id": "5-3-contact-auxiliaire",
  "titre": "Le contact auxiliaire",
  "mot": "contact auxiliaire",
  "def": "À savoir où en est le contacteur, et à s’en servir. Le contact auxiliaire ne porte aucune puissance : il donne une information, et cette information sert à faire tenir le circuit tout seul.",
  "ou": "Sur le contacteur lui-même : un ou deux contacts intégrés, plus des blocs qu’on clipse sur le côté ou sur le dessus quand il en faut davantage.",
  "porte": {
   "t": "ÉlectroRézo 5.3 — Le contact auxiliaire",
   "h": "../electrorezo/stations/5-3-contact-auxiliaire/"
  }
 },
 {
  "id": "5-4-relais",
  "titre": "Le relais électromécanique",
  "mot": "relais électromécanique",
  "def": "À faire commander un circuit par un autre, quand il n’y a pas de puissance en jeu. Multiplier des contacts, séparer deux tensions, adapter un signal d’automate à une bobine de contacteur.",
  "ou": "Dans les armoires, sur rail, souvent sur une embase à broches ; dans les régulations, les alarmes, les cartes électroniques de machines frigorifiques.",
  "porte": {
   "t": "ÉlectroRézo 5.4 — Le relais électromécanique",
   "h": "../electrorezo/stations/5-4-relais/"
  }
 },
 {
  "id": "5-5-relais-temporise",
  "titre": "Le relais temporisé",
  "mot": "relais temporisé",
  "def": "À faire attendre un circuit. Démarrer une ventilation avant un compresseur, laisser une pompe finir sa course, empêcher un moteur de repartir aussitôt après un arrêt. Chaque fois qu’un ordre doit arriver plus tard.",
  "ou": "Dans toutes les armoires de froid et de climatisation, où presque rien ne doit démarrer en même temps ; dans les démarrages étoile-triangle ; partout où il faut protéger une machine d’un redémarrage trop rapide.",
  "porte": {
   "t": "ÉlectroRézo 5.5 — Le relais temporisé",
   "h": "../electrorezo/stations/5-5-relais-temporise/"
  }
 },
 {
  "id": "5-7-boutons",
  "titre": "Bouton-poussoir et sélecteur",
  "mot": "bouton-poussoir et sélecteur",
  "def": "À donner un ordre avec le doigt. C’est le seul endroit de toute la ligne où c’est un être humain qui agit directement sur un contact — partout ailleurs, c’est une bobine.",
  "ou": "Sur la porte des armoires, sur les pupitres, sur les boîtes à boutons pendantes au-dessus des machines.",
  "porte": {
   "t": "ÉlectroRézo 5.7 — Bouton-poussoir et sélecteur",
   "h": "../electrorezo/stations/5-7-boutons/"
  }
 },
 {
  "id": "5-8-securite-signalisation",
  "titre": "Arrêt d’urgence et signalisation",
  "mot": "arrêt d’urgence et signalisation",
  "def": "À arrêter une machine quand quelque chose se passe mal, et à dire à l’opérateur ce que la machine est en train de faire. Deux métiers différents, réunis ici parce qu’ils partagent la même règle de câblage.",
  "ou": "L’arrêt d’urgence à portée de main de chaque poste de travail ; les voyants sur la porte de l’armoire ; les fins de course sur les parties mobiles des machines.",
  "porte": {
   "t": "ÉlectroRézo 5.8 — Arrêt d’urgence et signalisation",
   "h": "../electrorezo/stations/5-8-securite-signalisation/"
  }
 },
 {
  "id": "6-1-bobine-electro-aimant",
  "titre": "La bobine et l’électro-aimant",
  "mot": "bobine et l’électro-aimant",
  "def": "À transformer du courant en force. Un fil enroulé autour d’un morceau de fer, et voilà un aimant qu’on peut allumer et éteindre. C’est le point de départ de toute la ligne 6 — et de la moitié de la ligne 5.",
  "ou": "Dans un contacteur, un relais, un électro-aimant de porte, une électrovanne, un frein de moteur. Chaque fois qu’un courant doit produire un mouvement franc, il y a une bobine.",
  "porte": {
   "t": "ÉlectroRézo 6.1 — La bobine et l’électro-aimant",
   "h": "../electrorezo/stations/6-1-bobine-electro-aimant/"
  }
 },
 {
  "id": "6-2-transformateur",
  "titre": "Le transformateur",
  "mot": "transformateur",
  "def": "À changer une tension. Vous entrez 230 volts, vous sortez 24. Ou l’inverse. Sans pièce mobile, sans usure, et sans aucune liaison électrique entre l’entrée et la sortie.",
  "ou": "Dans le poste de transformation du quartier, dans chaque armoire qui a besoin de 24 volts pour sa commande, dans chaque chargeur, dans chaque brûleur. C’est peut-être la machine la plus répandue au monde.",
  "porte": {
   "t": "ÉlectroRézo 6.2 — Le transformateur",
   "h": "../electrorezo/stations/6-2-transformateur/"
  }
 },
 {
  "id": "6-3-moteur-asynchrone",
  "titre": "Le moteur asynchrone triphasé",
  "mot": "moteur asynchrone triphasé",
  "def": "À faire tourner. C’est le moteur de l’atelier, celui qu’on trouve sur les pompes, les compresseurs, les ventilateurs, les convoyeurs. Robuste, bon marché, et il démarre tout seul.",
  "ou": "Partout. C’est de très loin le moteur le plus répandu dans l’industrie, et c’est celui que vous dépannerez le plus souvent.",
  "porte": {
   "t": "ÉlectroRézo 6.3 — Le moteur asynchrone triphasé",
   "h": "../electrorezo/stations/6-3-moteur-asynchrone/"
  }
 },
 {
  "id": "6-5-moteur-monophase",
  "titre": "Le moteur monophasé",
  "mot": "moteur monophasé",
  "def": "À faire tourner quelque chose là où il n’y a pas de triphasé. Une maison, un petit atelier, un compresseur de réfrigérateur. Et pour cela, il faut lui fabriquer artificiellement le décalage que le triphasé donne gratuitement.",
  "ou": "Dans tout le petit électroménager qui tourne, dans les compresseurs de froid domestique et commercial, dans les pompes de relevage, dans les ventilateurs de maison.",
  "porte": {
   "t": "ÉlectroRézo 6.5 — Le moteur monophasé",
   "h": "../electrorezo/stations/6-5-moteur-monophase/"
  }
 }
];
