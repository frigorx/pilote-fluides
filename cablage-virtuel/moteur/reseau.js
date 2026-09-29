/* Le réseau du câblage virtuel — SOURCE UNIQUE des lignes, des stations et des titres affichés
   (docs/PLAN-2026-09-29-REFONTE-ACCES.md). Lu par l'accueil (index.html), la page de jeu (titre, étapes),
   l'espace professeur et, côté Python, par les fabricants de documents : l'objet est du JSON pur —
   re.search(r'^window\.CABLAGE_RESEAU = (\{.*?^\});', texte, re.M | re.S) puis json.loads(groupe 1).
   Décisions de Franck (29/09/2026) : le réseau « me plaît » ; JAMAIS « examen » (ni EP2, bac, CCF) : le niveau
   avancé se divise par matière (électrotechnique, froid) pour servir à d'autres disciplines ; une station se nomme
   par ce qu'on y câble ; une station porte la puissance puis sa commande. Les `id` d'exercices ne changent
   jamais (ils sont gravés dans les QR des feuilles). Placement : c = colonne, r = rangée du plan de métro ;
   pos = où s'écrit l'étiquette quand une correspondance passe dessous (droite, haut ; sinon dessous). */
window.CABLAGE_RESEAU = {
  "lignes": [
    {"id": "dep", "nom": "Départ", "couleur": "#1b3a63", "texte": "La prise en main : un quart d’heure pour apprendre les gestes."},
    {"id": "dom", "num": 1, "nom": "Domestique", "couleur": "#e0802c", "texte": "Les circuits de la maison : allumage simple, va-et-vient, télérupteur. Le neutre à gauche, la phase à droite."},
    {"id": "ele", "num": 2, "nom": "Électrotechnique", "couleur": "#2f6fb8", "texte": "Du disjoncteur au moteur : contacteur, relais thermique, bornier. La puissance, puis la commande."},
    {"id": "ela", "num": 3, "nom": "Électrotechnique avancé", "couleur": "#0c4b88", "texte": "Les démarrages à plusieurs contacteurs : étoile-triangle, deux vitesses."},
    {"id": "fro", "num": 4, "nom": "Froid", "couleur": "#178c9b", "texte": "Le pump-down et la chambre froide : thermostat, électrovanne, pressostats, dégivrage."},
    {"id": "fra", "num": 5, "nom": "Froid avancé", "couleur": "#0d5c66", "texte": "Les installations complètes : plusieurs départs, transformateur de commande, relais auxiliaire, horloge, voyants."}
  ],
  "stations": [
    {"id": "depart", "ligne": "dep", "c": 0, "r": 0, "etiquette": ["Prise en main", "le tutoriel"], "titre": "Prise en main", "sous": "Le tutoriel, sur l’allumage simple : un quart d’heure.", "niveau": "Départ", "puissance": "allumage-simple", "tuto": true, "apprend": "colorier, repérer, poser un fil, demander l’aide, contrôler, passer aux vrais appareils."},
    {"id": "allumage", "ligne": "dom", "c": 1, "r": 0, "etiquette": ["Allumage", "simple"], "titre": "Allumage simple", "sous": "Disjoncteur 1P+N, interrupteur, lampe et sa masse.", "niveau": "Niveau 1", "puissance": "allumage-simple", "apprend": "le neutre à gauche, la phase coupée par l’interrupteur, la masse de la lampe."},
    {"id": "vev", "ligne": "dom", "c": 2, "r": 0, "etiquette": ["Va-et-vient", ""], "titre": "Va-et-vient", "sous": "Disjoncteur 1P+N, deux inverseurs, lampe et sa masse.", "niveau": "Niveau 1", "puissance": "va-et-vient", "apprend": "le commun de chaque inverseur, les deux navettes entre eux."},
    {"id": "tele", "ligne": "dom", "c": 3, "r": 0, "pos": "droite", "etiquette": ["Télérupteur", ""], "titre": "Télérupteur", "sous": "Trois boutons poussoirs, deux lampes et leurs masses.", "niveau": "Niveau 1", "puissance": "telerupteur", "apprend": "les poussoirs sur la bobine, les lampes sur le contact."},
    {"id": "n1", "ligne": "ele", "c": 3, "r": 1, "etiquette": ["n° 1", "Départ moteur"], "titre": "Câblage n° 1 : départ moteur", "sous": "Disjoncteur, contacteur, relais thermique, moteur triphasé.", "niveau": "Découverte", "puissance": "cablage-1", "commande": "cablage-1-commande", "apprend": "la logique des bornes : entrée impaire, sortie paire, puis l’appareil suivant."},
    {"id": "dd", "ligne": "ele", "c": 4, "r": 1, "pos": "haut", "etiquette": ["Démarrage", "direct"], "titre": "Démarrage direct", "sous": "Sectionneur porte-fusibles, contacteur, relais thermique, bornier.", "niveau": "Niveau 2", "puissance": "demarrage-direct-tri", "apprend": "le sectionneur porte-fusibles en tête, le bornier en sortie."},
    {"id": "n3", "ligne": "ele", "c": 5, "r": 1, "etiquette": ["n° 3", "Deux départs"], "titre": "Câblage n° 3 : deux départs moteurs", "sous": "Sous un disjoncteur de tête tétrapolaire.", "niveau": "Niveau 2", "puissance": "cablage-3", "commande": "cablage-3-commande", "apprend": "une tête, deux départs qui repartent de ses bornes de sortie."},
    {"id": "n4", "ligne": "ele", "c": 6, "r": 1, "pos": "droite", "etiquette": ["n° 4", "Inversion"], "titre": "Câblage n° 4 : inversion du sens de marche", "sous": "Moteur triphasé, deux contacteurs.", "niveau": "Niveau 2", "puissance": "cablage-4", "commande": "cablage-4-commande", "apprend": "deux phases croisées entre les contacteurs, le verrouillage 21-22."},
    {"id": "n5", "ligne": "ela", "c": 6, "r": 2, "etiquette": ["n° 5", "Étoile-triangle"], "titre": "Câblage n° 5 : démarrage étoile-triangle", "sous": "Moteur triphasé, trois contacteurs.", "niveau": "Avancé", "puissance": "cablage-5", "commande": "cablage-5-commande", "apprend": "les six bornes du moteur, le couplage étoile puis triangle."},
    {"id": "n6", "ligne": "ela", "c": 7, "r": 2, "etiquette": ["n° 6", "Deux vitesses"], "titre": "Câblage n° 6 : moteur deux vitesses Dahlander", "sous": "Petite vitesse, grande vitesse.", "niveau": "Avancé", "puissance": "cablage-6", "commande": "cablage-6-commande", "apprend": "trois contacteurs, jamais deux vitesses à la fois."},
    {"id": "n2", "ligne": "fro", "c": 4, "r": 3, "etiquette": ["n° 2", "Pump-down"], "titre": "Câblage n° 2 : le pump-down sur bornier", "sous": "Thermostat, électrovanne, pressostats, compresseur, ventilateurs.", "niveau": "Niveau 1", "puissance": "cablage-2", "apprend": "le bornier à trouver : les appareils se relient par le bornier."},
    {"id": "n7", "ligne": "fro", "c": 5, "r": 3, "etiquette": ["n° 7", "Groupe"], "titre": "Câblage n° 7 : groupe frigorifique pump-down", "sous": "Compresseur, ventilateurs du condenseur et de l’évaporateur.", "niveau": "Niveau 3", "puissance": "cablage-7", "commande": "cablage-7-commande", "apprend": "le groupe complet, un départ par moteur."},
    {"id": "n8", "ligne": "fro", "c": 6, "r": 3, "pos": "droite", "etiquette": ["n° 8", "Chambre négative"], "titre": "Câblage n° 8 : chambre froide négative", "sous": "Compresseur, ventilateurs, dégivrage électrique.", "niveau": "Niveau 3", "puissance": "cablage-8", "commande": "cablage-8-commande", "apprend": "les résistances de dégivrage et l’horloge."},
    {"id": "n9", "ligne": "fra", "c": 6, "r": 4, "etiquette": ["n° 9", "Quatre départs"], "titre": "Câblage n° 9 : groupe pump-down à quatre départs", "sous": "Compresseur, deux ventilateurs, quatre départs sous un tétrapolaire.", "niveau": "Avancé", "puissance": "cablage-9", "commande": "cablage-9-commande", "apprend": "quatre départs sous une même tête, le groupe complet."},
    {"id": "n10", "ligne": "fra", "c": 7, "r": 4, "etiquette": ["n° 10", "Transformateur"], "titre": "Câblage n° 10 : transformateur de commande, arrêt d’urgence", "sous": "Porte-fusibles, disjoncteur moteur, transformateur 230 / 24 V.", "niveau": "Avancé", "puissance": "cablage-10", "commande": "cablage-10-commande", "apprend": "une commande en 24 V, l’arrêt d’urgence et les voyants."},
    {"id": "n11", "ligne": "fra", "c": 8, "r": 4, "etiquette": ["n° 11", "Relais auxiliaire"], "titre": "Câblage n° 11 : deux départs et relais auxiliaire", "sous": "Deux départs, transformateur de commande, relais auxiliaire KA1.", "niveau": "Avancé", "puissance": "cablage-11", "commande": "cablage-11-commande", "apprend": "la commande par relais auxiliaire."},
    {"id": "n12", "ligne": "fra", "c": 9, "r": 4, "etiquette": ["n° 12", "Horloge"], "titre": "Câblage n° 12 : horloge de dégivrage et voyants", "sous": "Horloge de dégivrage, quatre voyants, précoupure.", "niveau": "Avancé", "puissance": "cablage-12", "commande": "cablage-12-commande", "apprend": "horloge, voyants et précoupure 13-14."},
    {"id": "n13", "ligne": "fra", "c": 10, "r": 4, "etiquette": ["n° 13", "Monophasé"], "titre": "Câblage n° 13 : ventilateur de condenseur en monophasé", "sous": "Moteur monophasé sur un disjoncteur moteur tripolaire.", "niveau": "Avancé", "puissance": "cablage-13", "apprend": "un moteur monophasé sur un disjoncteur moteur : le pontage."}
  ],
  "ordre": {"dom": ["depart", "allumage", "vev", "tele"], "ele": ["n1", "dd", "n3", "n4"], "ela": ["n5", "n6"], "fro": ["n2", "n7", "n8"], "fra": ["n9", "n10", "n11", "n12", "n13"]},
  "correspondances": [["tele", "n1"], ["n4", "n5"], ["dd", "n2"], ["n8", "n9"]],
  "chapitres_anciens": {"domestique": "dom", "puissance": "ele", "commande": "ele", "froid": "fro", "sujets": "fra", "autres": "ele"},
  "titres": {
    "cablage-10": "Câblage n° 10 : porte-fusibles, disjoncteur moteur, pontage du thermique, transformateur — la puissance",
    "cablage-10-commande": "Câblage n° 10 — la commande en 24 V : arrêt d’urgence, commutateur, pressostats, thermostat, électrovanne, voyants",
    "cablage-11": "Câblage n° 11 : deux départs sous porte-fusibles, transformateur de commande — la puissance",
    "cablage-11-commande": "Câblage n° 11 — la commande : relais auxiliaire KA1, pressostats, thermostat, électrovanne",
    "cablage-12": "Câblage n° 12 : compresseur triphasé sous porte-fusibles, condenseur monophasé ponté, commande en 230 V — la puissance",
    "cablage-12-commande": "Câblage n° 12 — la commande : horloge de dégivrage, quatre voyants, précoupure, pressostats, thermostat d’ambiance",
    "cablage-13": "Câblage n° 13 : ventilateur du condenseur en 230 V monophasé, pontage dans le disjoncteur moteur — la puissance"
  }
};
/* Aides de lecture, hors JSON. */
(function () {
  const R = window.CABLAGE_RESEAU;
  /* Le titre affiché d'un exercice : le titre neutre du réseau s'il existe, sinon celui de l'exercice. */
  R.titre = (id, defaut) => R.titres[id] || defaut || id;
  /* La station d'un exercice (puissance ou commande), et le quai : 'p' ou 'c'. */
  R.stationDe = (id) => {
    for (const s of R.stations) {
      if (s.id === 'depart') continue;
      if (s.puissance === id) return { station: s, quai: 'p' };
      if (s.commande === id) return { station: s, quai: 'c' };
    }
    return null;
  };
})();
