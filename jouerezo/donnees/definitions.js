/* =====================================================================
   definitions.js — « Qui suis-je ? » et le pendu : les mots du froid et de l'atelier
   ---------------------------------------------------------------------
   RÔLE : la banque de définitions écrite ici (froid classique et outils),
   complétée à l'exécution par la banque fabriquée des stations ÉlectroRézo
   (donnees/banque-electrorezo.js, champ « à quoi ça sert »).
   D'OÙ ÇA VIENT : le livre HabFluide en ligne (../f/…), les planches
   (a-ligne-liquide-protection, a-tirage-au-vide, a-pesee-charge,
   a-recherche-fuite-geste, a-detendeur-regulation, a-coup-de-liquide-piston),
   les stations CuivRézo (1.0 à 2.2) et ÉlectroRézo 1.9. Aucun chiffre.
   FORMAT : { mot, def, famille: "froid" | "outil", porte: { t, h } }
   `mot` sert au pendu (lettres accentuées acceptées, trait d'union affiché).
   Périmètre voulu par F. Henninot (03/10/2026) : froid classique, pas de clim.
   ===================================================================== */
window.JR_DEFINITIONS = [
  /* ---------- les organes du circuit ---------- */
  { mot: "compresseur", famille: "froid", def: "J'aspire la vapeur basse pression, je la comprime et je la refoule à haute pression : c'est moi qui mets le fluide en mouvement dans tout le circuit.", porte: { t: "HabFluide — Le compresseur", h: "../f/compresseur-1/" } },
  { mot: "condenseur", famille: "froid", def: "Échangeur où la vapeur chaude haute pression cède sa chaleur à l'air et devient liquide : désurchauffe, condensation, puis sous-refroidissement.", porte: { t: "HabFluide — Le condenseur", h: "../f/condenseur-1/" } },
  { mot: "évaporateur", famille: "froid", def: "Échangeur où le fluide liquide basse pression s'évapore en prenant la chaleur de l'air de la chambre : c'est là que le froid se fabrique.", porte: { t: "HabFluide — L'évaporateur", h: "../f/evaporateur-1/" } },
  { mot: "détendeur thermostatique", famille: "froid", def: "J'abaisse la pression du liquide avant l'évaporateur et je dose le débit grâce à mon bulbe, pour tenir la surchauffe.", porte: { t: "Le détendeur thermostatique : une boucle qui se corrige toute seule", h: "../f/a-detendeur-regulation/" } },
  { mot: "détendeur électronique", famille: "froid", def: "Je dose le fluide avec un moteur pas à pas, piloté par un régulateur et ses sondes, à la place du bulbe.", porte: { t: "HabFluide — Le détendeur et les trois technologies", h: "../f/detendeur-1/" } },
  { mot: "tube capillaire", famille: "froid", def: "Un tube fin et long, sans aucun réglage : je fais chuter la pression dans les petits appareils, à la place d'un détendeur.", porte: { t: "HabFluide — Le détendeur et les trois technologies", h: "../f/detendeur-1/" } },
  { mot: "filtre déshydrateur", famille: "froid", def: "Sur la ligne liquide, je retiens l'humidité et les impuretés avant qu'elles n'atteignent le détendeur.", porte: { t: "La ligne liquide : chaque organe protège le suivant", h: "../f/a-ligne-liquide-protection/" } },
  { mot: "voyant liquide", famille: "froid", def: "Une fenêtre sur la ligne liquide : on y observe le fluide qui passe, les bulles, et la pastille qui dit s'il y a de l'humidité.", porte: { t: "La ligne liquide : chaque organe protège le suivant", h: "../f/a-ligne-liquide-protection/" } },
  { mot: "électrovanne", famille: "froid", def: "Une vanne fermée ou ouverte par une bobine : je coupe la ligne liquide à l'arrêt, et c'est moi qui lance le pump-down.", porte: { t: "La ligne liquide : chaque organe protège le suivant", h: "../f/a-ligne-liquide-protection/" } },
  { mot: "réservoir de liquide", famille: "froid", def: "À la sortie du condenseur, je stocke le fluide liquide et j'encaisse les variations de charge du circuit.", porte: { t: "La ligne liquide : chaque organe protège le suivant", h: "../f/a-ligne-liquide-protection/" } },
  { mot: "séparateur d'huile", famille: "froid", def: "Au refoulement du compresseur, je récupère l'huile entraînée par le fluide et je la renvoie au carter.", porte: { t: "Le séparateur d'huile (thermo-techno)", h: "../packs/fluides/res/separateur-huile-pedagogique/" } },
  { mot: "bouteille anti-coup de liquide", famille: "froid", def: "Sur l'aspiration, je retiens le liquide qui arriverait au compresseur : un piston ne comprime pas un liquide.", porte: { t: "Coup de liquide dans un compresseur à piston", h: "../f/a-coup-de-liquide-piston/" } },
  { mot: "pressostat HP", famille: "froid", def: "Je surveille la pression de refoulement et j'arrête le compresseur quand elle monte trop.", porte: { t: "HabFluide — Deux pressostats, deux fonctions", h: "../f/condenseur-2/" } },
  { mot: "pressostat BP", famille: "froid", def: "Je surveille la pression d'aspiration : j'arrête le compresseur quand elle descend trop, et je le relance en pump-down.", porte: { t: "HabFluide — Deux pressostats, deux fonctions", h: "../f/condenseur-2/" } },
  { mot: "thermostat", famille: "froid", def: "Je compare la température de la chambre à la consigne et je donne l'ordre de marche ou d'arrêt du froid.", porte: { t: "Commande directe par thermostat (thermo-techno)", h: "../packs/fluides/res/commande-directe-thermostat/" } },
  { mot: "sonde de température", famille: "froid", def: "Un capteur dont la résistance change avec la température ; le régulateur me lit pour décider.", porte: { t: "Le régulateur électronique (thermo-techno)", h: "../packs/fluides/res/regulateur-electronique-interactif/" } },
  { mot: "manifold", famille: "froid", def: "Le jeu de manomètres BP et HP avec ses flexibles et ses vannes : on y lit les pressions et on y branche la pompe, la bouteille ou la station.", porte: { t: "HabFluide — Le manifold : lire, brancher, ne pas polluer", h: "../f/mise-en-service-3/" } },

  /* ---------- les outils du frigoriste ---------- */
  { mot: "pompe à vide", famille: "outil", def: "J'extrais l'air et l'humidité du circuit avant la charge : c'est le tirage au vide.", porte: { t: "Le tirage au vide : la courbe qui descend", h: "../f/a-tirage-au-vide/" } },
  { mot: "vacuomètre", famille: "outil", def: "L'instrument qui lit le vide poussé, au plus près du circuit, pompe arrêtée ; le manomètre du manifold ne suffit pas pour ça.", porte: { t: "Le tirage au vide : la courbe qui descend", h: "../f/a-tirage-au-vide/" } },
  { mot: "balance de charge", famille: "outil", def: "Je pèse la bouteille avant et après : la différence, c'est la charge introduite ou récupérée.", porte: { t: "La pesée : deux pesées, jamais une", h: "../f/a-pesee-charge/" } },
  { mot: "station de récupération", famille: "outil", def: "La machine qui aspire le fluide de l'installation et le refoule dans une bouteille, en circuit fermé, sans rien relâcher.", porte: { t: "HabFluide — La station de récupération", h: "../f/recuperation-2/" } },
  { mot: "détecteur de fuite", famille: "outil", def: "On me contrôle sur le gaz recherché, puis on balaie lentement les raccords avec moi : j'ai remplacé la flamme, interdite.", porte: { t: "Détecteur : contrôler, balayer, confirmer", h: "../f/a-recherche-fuite-geste/" } },
  { mot: "mano-détendeur", famille: "outil", def: "Vissé sur la bouteille d'azote, je ramène sa pression à celle de l'épreuve ou du balayage : jamais d'azote sans moi.", porte: { t: "HabFluide — La bouteille d'azote et son mano-détendeur", h: "../f/mise-en-service-2/" } },
  { mot: "coupe-tube", famille: "outil", def: "Ma molette tourne autour du tube de cuivre et le coupe net, sans copeaux qui finiraient dans le circuit.", porte: { t: "CuivRézo 1.3 — Couper et ébavurer", h: "../cuivrezo/stations/1-3/" } },
  { mot: "ébavureur", famille: "outil", def: "Après la coupe, je retire la bavure à l'intérieur du tube, bout tourné vers le bas pour que rien ne tombe dedans.", porte: { t: "CuivRézo 1.3 — Couper et ébavurer", h: "../cuivrezo/stations/1-3/" } },
  { mot: "cintrette", famille: "outil", def: "Deux poignées, un tube entre les deux : je fais les petits coudes à la main.", porte: { t: "CuivRézo 1.4 — La cintrette", h: "../cuivrezo/stations/1-4/" } },
  { mot: "cintreuse", famille: "outil", def: "Avec mon levier, je plie le tube en coude à 90° sans l'écraser.", porte: { t: "CuivRézo 1.5 — La cintreuse", h: "../cuivrezo/stations/1-5/" } },
  { mot: "dudgeonnière", famille: "outil", def: "Une barre à trous, un étrier et un cône : j'évase le bout du tube pour un raccord à visser.", porte: { t: "CuivRézo 1.6 — Le dudgeon", h: "../cuivrezo/stations/1-6/" } },
  { mot: "pince à emboîture", famille: "outil", def: "Ma tête entre dans le tube et l'élargit, pour y emboîter un autre tube avant de braser.", porte: { t: "CuivRézo 1.7 — L'emboîture", h: "../cuivrezo/stations/1-7/" } },
  { mot: "chalumeau", famille: "outil", def: "Ma flamme brase le cuivre, sur un tube vidé de son fluide et balayé à l'azote.", porte: { t: "CuivRézo 2.2 — Allumer le chalumeau", h: "../cuivrezo/stations/2-2/" } },
  { mot: "étau", famille: "outil", def: "Je tiens le tube pour vous, avec des mordaches pour ne pas le marquer ; vos doigts restent hors de mes mors.", porte: { t: "CuivRézo 1.0 — Le poste de travail", h: "../cuivrezo/stations/1-0/" } },
  { mot: "pied à coulisse", famille: "outil", def: "Mes becs se referment sur le tube et je donne son diamètre, au dixième de millimètre.", porte: { t: "CuivRézo 1.1 — Le tube et sa mesure", h: "../cuivrezo/stations/1-1/" } },
  { mot: "pince ampèremétrique", famille: "outil", def: "Je mesure l'intensité en me refermant autour d'un seul conducteur, sans couper le circuit.", porte: { t: "ÉlectroRézo 1.9 — Mesurer", h: "../electrorezo/stations/1-9-mesurer/" } },
  { mot: "multimètre", famille: "outil", def: "Tension, résistance, continuité : je suis l'appareil à molette de toutes les mesures électriques de l'atelier.", porte: { t: "ÉlectroRézo 1.9 — Mesurer", h: "../electrorezo/stations/1-9-mesurer/" } }
];

/* Les outils en photo (Memory « Les outils ») — photos déjà servies par le site :
   photos d'atelier du pack (publiées sur décision de l'auteur, CATALOGUE.md),
   stations CuivRézo (images/, légendes des stations), ÉlectroRézo 1.2 et 1.9. */
window.JR_OUTILS_PHOTOS = [
  { nom: "Manifold", src: "../packs/fluides/res/photos/manifold-branche.jpg" },
  { nom: "Pompe à vide", src: "../packs/fluides/res/photos/pompe-a-vide.png" },
  { nom: "Vacuomètre", src: "../packs/fluides/res/photos/vacuometre.png" },
  { nom: "Balance de charge", src: "../packs/fluides/res/photos/balance.jpg" },
  { nom: "Coupe-tube", src: "../cuivrezo/images/1-3-couper.webp" },
  { nom: "Ébavureur", src: "../cuivrezo/images/1-3-ebavurer.webp" },
  { nom: "Cintrette", src: "../cuivrezo/images/1-4-cintrette.webp" },
  { nom: "Cintreuse", src: "../cuivrezo/images/1-5-cintreuse.webp" },
  { nom: "Dudgeonnière", src: "../cuivrezo/images/1-6-dudgeon.webp" },
  { nom: "Pince à emboîture", src: "../cuivrezo/images/1-7-pince.webp" },
  { nom: "Étau à mordaches", src: "../cuivrezo/images/1-0-etau.webp" },
  { nom: "Pied à coulisse", src: "../cuivrezo/images/1-1-pied.webp" },
  { nom: "Poste oxyacétylénique", src: "../cuivrezo/images/2-1-poste.webp" },
  { nom: "Chalumeau et allumeur", src: "../cuivrezo/images/2-2-allumer.webp" },
  { nom: "Pince ampèremétrique", src: "../electrorezo/stations/1-9-mesurer/assets/biblio/pince-en-lecture.jpeg" },
  { nom: "Multimètre", src: "../electrorezo/stations/1-2-tension/assets/biblio/multimetre-et-ses-sondes.png" }
];
