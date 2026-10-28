/* =====================================================================
   lexique-recherche.js — les mots qui se cherchent de plusieurs façons
   ---------------------------------------------------------------------
   POURQUOI (28/10/2026) : selon la façon d'écrire le mot, la recherche
   ne trouvait rien. « invertère », « inverteur », « onduleur » : zéro
   résultat, alors que la station Inverter existe.

   COMMENT ÇA MARCHE
   Une ligne = un groupe. Le PREMIER mot est celui qu'emploie le site ;
   les suivants sont les autres façons de le chercher : fautes courantes,
   orthographe au son, sigles, mots d'atelier. Taper n'importe lequel
   cherche tous ceux du groupe. Les résultats où le mot tapé apparaît tel
   quel passent devant ceux trouvés grâce au lexique.

   ON ÉCRIT NATURELLEMENT : accents, majuscules, tirets et apostrophes ne
   comptent pas (« R-290 », « r290 » et « R 290 » sont le même mot).
   Les formes de 4 lettres ou moins (EV, PAC, SR…) ne valent que comme
   mot entier : « ev » ne doit pas ramener tous les « évaporateurs ».

   CE QUE LE LEXIQUE N'A PAS À FAIRE : les fautes d'une ou deux lettres
   (« pressostta », « condanseur »). La correction automatique de
   moteur/recherche.js s'en charge. Le lexique sert aux mots qu'aucune
   machine ne devine : les synonymes, le jargon, les sigles.

   AJOUTER UN MOT : une virgule et des guillemets, rien d'autre. Un mot
   signalé par un visiteur (lien « Signaler ce mot ») se range ici.

   PIÈGES À NE PAS CRÉER
   · condenseur ≠ condensateur : deux groupes, jamais fusionnés ;
   · « différentiel » de régulation ≠ interrupteur différentiel ;
   · attestation de capacité (l'entreprise) ≠ attestation d'aptitude
     (la personne).
   ===================================================================== */
window.LEXIQUE_RECHERCHE = [
  /* Le mot qui a tout déclenché. */
  ["inverter", "invertère", "inverteur", "invertaire", "inverteure", "invertor",
   "dc inverter", "compresseur dc", "vitesse variable", "onduleur",
   "variateur de fréquence", "variateur de vitesse"],

  /* Les organes */
  ["détendeur", "détenteur", "détandeur", "détente thermostatique"],
  ["manifold", "jeu de manomètres", "jeu de manos", "analyseur frigorifique"],
  ["pressostat", "presso", "pressostats"],
  ["électrovanne", "ev", "vanne électromagnétique", "vanne magnétique", "électro-vanne"],
  ["déshydrateur", "filtre déshydrateur", "filtre dessiccant", "déshydratant"],
  ["voyant liquide", "voyant de liquide", "indicateur d'humidité", "voyant d'humidité"],
  ["vanne 4 voies", "vanne quatre voies", "v4v", "vanne d'inversion", "inversion de cycle"],
  ["condensateur", "capa", "condo", "condensateur de démarrage", "condensateur permanent"],
  ["sonde", "ctn", "thermistance", "capteur de température", "pt100", "pt1000"],

  /* Les grandeurs */
  ["surchauffe", "sh", "superheat"],
  ["sous-refroidissement", "sr", "sous refroid", "sous-refroid", "sousrefroidissement"],
  ["diagramme enthalpique", "mollier", "diagramme de mollier", "diagramme ph",
   "diagramme log p h", "diagramme pression enthalpie", "diagramme frigorifique"],

  /* Les fluides */
  ["CO₂", "r744", "dioxyde de carbone", "gaz carbonique"],
  ["propane", "r290"],
  ["isobutane", "r600a"],
  ["ammoniac", "r717", "nh3"],
  ["frigorigène", "réfrigérant", "fluide frigo", "gaz frigo", "frigorygène"],
  ["huile", "lubrifiant", "poe", "pve", "pag"],
  ["F-Gas", "fgas", "f-gaz", "fgaz", "gaz fluorés", "hfc"],
  ["attestation d'aptitude", "habilitation fluide", "habilitation fluides"],

  /* Les gestes */
  ["tirage au vide", "tirer au vide", "faire le vide", "mise sous vide", "mise au vide", "pompe à vide"],
  ["brasage", "brasure", "braser", "soudure", "souder", "soudo-brasure", "soudobrasage"],
  ["azote", "n2", "azote sec"],
  ["fuite", "recherche de fuite", "détection de fuite", "détecteur de fuite", "contrôle d'étanchéité", "étanchéité"],
  ["récupération", "récup", "récupérer", "récupérer le fluide", "station de récupération"],
  ["complément de charge", "charger", "recharger", "recharge en fluide", "charge en fluide"],
  ["dégivrage", "dégivrer", "dégivré"],
  ["dépannage", "dépanner", "panne", "pannes", "recherche de panne", "diagnostic"],

  /* Les machines */
  ["pompe à chaleur", "pac", "thermopompe"],
  ["climatisation", "clim", "climatiseur", "air conditionné", "conditionnement d'air"],
  ["multisplit", "multi-split", "multi split", "bisplit", "trisplit"],
  ["DRV", "vrv", "vrf", "débit de réfrigérant variable"],
  ["roof-top", "rooftop", "roof top"],
  ["eau glacée", "groupe d'eau glacée", "geg", "chiller", "refroidisseur de liquide"],
  /* Pas « CET » : « cet » est aussi un mot courant, il ramènerait tout. */
  ["chauffe-eau thermodynamique", "ballon thermodynamique", "eau chaude sanitaire", "ecs"],
  ["centrale de traitement d'air", "cta", "caisson de traitement d'air"],
  ["VMC", "ventilation mécanique contrôlée", "ventilation mecanique"],
  ["chambre froide", "chambre négative", "chambre positive"],

  /* L'électricité */
  ["relais thermique", "relais de surcharge", "protection thermique"],
  ["disjoncteur", "disj", "disjoncteur moteur", "magnétothermique"],
  ["interrupteur différentiel", "disjoncteur différentiel", "ddr"]
];
