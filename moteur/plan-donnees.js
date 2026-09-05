/* =====================================================================
   plan-donnees.js — LES DONNÉES DU PLAN DE FORMATION : la seule source
   ---------------------------------------------------------------------
   Sorties d'index.html le 05/09/2026 — décision F. Henninot (docs/porte-
   entree-2026-09/PROPOSITION.md, § 4, condition 1 de l'éclatement en
   réseaux) : le plan, sa liste HTML, son JSON-LD et, demain, les cartes
   par réseau doivent lire UNE source, jamais deux copies.
   · Chargé par index.html juste avant le moteur de carte, qui reprend ces
     noms tels quels (var DONNEES = window.PLAN_DONNEES).
   · Lu par build/plan-liste.mjs (entre les sentinelles DONNEES-PLAN, comme
     avant) et par build/registre.mjs (les cours visibles depuis le plan).
   · Versionné par build/version.mjs (?v=) et hashé par build/lib-version.mjs :
     une donnée corrigée doit atteindre le visiteur qui garde l'onglet ouvert.
   Pas de coordonnée saisie à la main station par station : ajouter un cours
   = ajouter UNE ligne dans une liste, ici.
   ⚠️ atelier-animations/outils/ordonner-ligne.js visait index.html pour
   réécrire la branche HUILE ; il s'arrête désormais sur « stations de la
   branche introuvables ». C'est voulu : il listait 17 stations pour une
   branche coupée en 4 + 13 le 20/08 — il aurait écrit faux.
   ===================================================================== */
(function () {
  "use strict";

  /* DONNEES-PLAN — DEBUT (build/plan-liste.mjs lit ce bloc pour générer
     la liste HTML crawlable et le JSON-LD : UNE source, jamais deux). */
  var RES = "packs/fluides/res/";
  function cours(dossier, nom, sous, entree) {
    return { id: dossier, href: RES + dossier + "/" + (entree || "index.html"),
             nom: nom, sous: sous };
  }
  function carte(id, nom, sous, verrou) {
    return { id: "carte-" + id, href: "formation.html?carte=" + id,
             nom: nom, sous: sous, verrou: !!verrou, meme_onglet: true };
  }
  /* Une PAGE du site, pas un module : « Le métier » vit à la racine et non dans
     res/, donc cours() ne sait pas la construire. Demandé par F. Henninot le
     20/08 : « ça fait partie des généralités, dans les premières stations on
     devrait avoir accès à cette page ». Elle s'ouvre dans le même onglet — on
     ne quitte pas le site, on descend d'un cran avant de monter dans le tronc. */
  function page(fichier, id, nom, sous) {
    return { id: id, href: fichier, nom: nom, sous: sous, meme_onglet: true };
  }
  /* Les outils vivent dans un AUTRE dépôt (Iner.web-tools-beta), d'où les
     adresses absolues. ⚠️ Trois d'entre eux portent encore l'identité d'un
     établissement dans leur page : manomètres, réglette, identification.
     À neutraliser AVANT la mise en ligne de ce plan. */
  var OUTILLAGE = "https://frigorx.github.io/Iner.web-tools-beta/";
  function outil(fichier, nom, sous) {
    return { id: "outil-" + fichier, href: OUTILLAGE + fichier + ".html",
             nom: nom, sous: sous };
  }

  /* Le téléphone reste un support de consultation. Ces stations conservent
     leurs schémas et leurs manipulations : un écran PC/tablette est simplement
     annoncé avant l'ouverture quand la densité pédagogique le justifie. */
  var SUPPORTS = {
    "surchauffe-sous-refroidissement-interactif": true,
    "diagramme-enthalpique": true,
    "bilan-thermique-performance-interactif": true,
    "module-compresseur": true,
    "regulateur-electronique-interactif": true,
    "pupitre-reglage-interactif": true,
    "chaine-intervention-interactive": true,
    "cours-classes-securite": true,
    "etancheite-interactive": true,
    "intervention-hydrocarbures-interactive": true
  };

  /* --- Le tronc : la théorie, de la première notion au diagramme --- */
  var TRONC = {
    couleur: "#2f5689",
    stations: [
      page("metier.html", "metier",                       "Découvrir le métier",         "cinq familles, une journée"),
      cours("chaleur-interactive",                        "Du glaçon au circuit",        "cours raconté · 🔊"),
      cours("chaleur-circuit-interactif",                 "Premières notions thermo",    "tome 2 · le circuit"),
      cours("pression-temperature-interactive",           "Pression & température",      "cours raconté · quiz"),
      cours("glissement-temperature",                     "Le glissement",               "pourquoi la T° glisse"),
      cours("surchauffe-sous-refroidissement-interactif", "Surchauffe & sous-refroid.",  "les deux preuves"),
      cours("froid-clim-academie",                        "Froid Clim Académie",         "révision ludique"),
      cours("circuit-organe-par-organe",                  "Organe par organe",           "animations · quiz")
    ],
    queue: [
      cours("diagramme-enthalpique",                      "Diagramme enthalpique",       "le cycle tracé"),
      cours("bilan-thermique-performance-interactif",     "Bilan & performance",         "COP, EER, puissances")
    ],
    jalon: "🏁 Technologue du cycle"
  };

  /* --- Les cinq branches. Le plan est une CARTE MÉMOIRE (métaphore métro
         assumée, décision F. Henninot 19/08) : les correspondances entre
         lignes SONT le contenu — le détendeur est un organe ET un réglage,
         la fin de la ligne liquide débouche sur les réglages. Les colonnes
         reliées par un couloir sont volontairement ADJACENTES : un couloir
         qui traverserait une troisième ligne rendrait le plan illisible
         (« la dernière fois à Paris je me suis perdu »). --- */
  var LIGNES = [
    { slug: "organes", nom: "🔧 LES ORGANES", sous: "CAP IFCA · BAC PRO MFER", couleur: "#1b3a63", x: 130,
      jalon: "🏁 Technologue du circuit",
      stations: [
        cours("tome-3-technologie-organes", "Tome 3 — les organes",  "reconnaître et situer"),
        Object.assign(cours("detendeur-interactif", "Le détendeur", "surchauffe et réglage"), { corr: true }),
        cours("compresseur-interactif",     "Le compresseur",        "installer, régler, vérifier"),
        cours("module-compresseur",         "Module compresseur",    "le bloc hermétique"),
        cours("condenseur-interactif",      "Le condenseur",         "haute pression, ventilation"),
        cours("evaporateur-interactif",     "L’évaporateur",         "givre et dégivrage")
      ] },
    { slug: "reglages", nom: "🎛 CE QUI SE RÈGLE", sous: "consigne, différentiel, preuve", couleur: "#0e7490", x: 360,
      jalon: "🏁 Réglages maîtrisés", depart_y: 1,
      stations: [
        /* Même cours que sur Les organes : c'est LA correspondance — un
           détendeur s'apprend comme organe et se reprend comme réglage. */
        Object.assign(cours("detendeur-interactif", "Le détendeur", "correspondance ↔ Organes"), { corr: true }),
        /* La famille KV s'ouvre en branche (décision F. Henninot du 20/08) :
           on n'a pas besoin des trois vannes le même jour, et selon le cours
           on vient chercher l'une ou l'autre. La tête de branche pose les
           trois ensemble ; les gares qui suivent traitent une vanne chacune.
           KVP et KVL restent à écrire — leur contenu vit encore, en écrans
           transversaux, dans la tête de branche. */
        cours("regulateurs-kv-pedagogiques", "Les régulateurs KV",    "KVP · KVL · KVR, la famille"),
        cours("regulateur-kvr-nrd",          "Le KVR",                "tenir la HP quand il fait froid"),
        /* Sous-station : le NRD ne se comprend qu'accroché au KVR, et c'est
           par lui que la future branche du dégivrage par gaz chauds viendra
           se greffer. Même animation, ouverte à son étape — pas un octet
           dupliqué —, d'où l'`id` distinct pour que le trajet les compte à
           part. */
        Object.assign(cours("regulateur-kvr-nrd", "Le NRD", "repressuriser le réservoir",
                            "index.html?etape=nrd"),
                      { id: "regulateur-kvr-nrd-etape", sous_station: true }),
        Object.assign(cours("pupitre-reglage-interactif", "Le pupitre de réglage", "consigne, différentiel"), { corr: true }),
        /* Ces deux-là sont AUSSI des gares de la ligne 🔌 LA RÉGULATION
           (22/08) : même cours, l'autre regard — le motif du détendeur. */
        Object.assign(cours("regulateur-electronique-interactif", "Le régulateur électronique", "sonde, cycle, dégivrage, bornier"), { corr: true }),
        Object.assign(cours("pressostat-bp-kp1", "Le pressostat BP", "KP1 · CUT OUT, CUT IN, différentiel"), { corr: true }),
        cours("pressostat-hp-kp5",       "Le pressostat HP",      "KP5 · coupure haute et réarmement"),
        cours("pressostat-combine-kp15", "Le pressostat combiné", "KP15 · deux pressions, A/B/C/D + PE"),
        { id: "pressostats-libre", href: "https://frigorx.github.io/inerweb-pressostats/",
          nom: "Pressostats en autonomie", sous: "s’entraîner seul, KP1 et KP5" }
      ] },
    { slug: "liquide", nom: "💧 LA LIGNE LIQUIDE", sous: "de la bouteille au détendeur", couleur: "#1e7e54", x: 590,
      jalon: "🏁 Ligne liquide maîtrisée",
      stations: [
        cours("bouteille-liquide-pedagogique",  "La bouteille liquide",   "réserve et niveau"),
        cours("filtre-deshydrateur-pedagogique","Le filtre déshydrateur", "l’humidité, l’ennemie"),
        cours("voyant-liquide-pedagogique",     "Le voyant liquide",      "bulles et indicateur"),
        /* Fin de ligne en correspondance : après l'électrovanne, ce qui
           reste de la ligne liquide… se règle. */
        Object.assign(cours("electrovanne-interactive", "L’électrovanne", "correspondance ↔ Réglages"), { corr: true })
      ] },
    { slug: "gestes", nom: "🧰 LES GESTES", sous: "l’atelier, le vrai geste pro", couleur: "#ff6b35", x: 820,
      jalon: "🏁 Prêt à intervenir",
      stations: [
        cours("fil-conducteur-intervention",       "Le fil conducteur",     "l’intervention en 6 étapes"),
        cours("parcours-manometres",               "Parcours manomètres",   "lire, brancher, conclure"),
        cours("vanne-service-interactive",         "La vanne de service",   "trois positions, deux prises"),
        cours("pose-manifold-2-voies-interactive", "Le manifold 2 voies",   "poser, lire, déposer"),
        cours("pose-manifold-interactive",         "Le manifold 4 voies",   "l’outil complet"),
        cours("recuperation-fluide-interactive",   "TP récupération",       "station, pesée, tirage au vide"),
        cours("mission-bouteilles",                "Mission bouteilles",    "la bonne bouteille, le bon geste"),
        cours("chaine-intervention-interactive",   "La chaîne complète",    "tout enchaîner proprement")
      ] },
    { slug: "fluides", nom: "🌍 FLUIDES & ENVIRONNEMENT", sous: "F-Gas, sécurité, climat", couleur: "#7a4fa0", x: 1050,
      jalon: "🏁 Fluides maîtrisés",
      stations: [
        cours("frise-vivante",                        "La Frise des Fluides",    "l’histoire racontée", "frise-vivante.html"),
        cours("nomenclature-interactive",             "Le code d’un fluide",     "R-134a, R-290… décryptés"),
        cours("cours-classes-securite",               "Classes de sécurité",     "A1, A2L, A3… NF EN 378"),
        cours("film-ozone",                           "Couche d’ozone & ODP",    "film narré"),
        cours("film-effet-de-serre",                  "Effet de serre & PRP",    "film narré · 53 s"),
        cours("etancheite-interactive",               "L’étanchéité",            "de l’indice à la preuve"),
        cours("hydrocarbures-a1-a2",                  "Mission 290",             "hydrocarbures en sécurité"),
        cours("intervention-hydrocarbures-interactive","Intervenir sur R-290",   "le chantier hydrocarbure")
      ] }
  ];

  /* --- La ceinture : s'évaluer, du positionnement à l'examen blanc.
         Les stations 🔒 existent et s'ouvrent, mais leur carte est gardée
         par un portillon : le code se donne en formation. --- */
  /* --- La ligne de L'HUILE : elle naît du compresseur, parce que c'est là
         que l'huile vit, et suit son trajet jusqu'au diagnostic. Elle s'étendra
         — d'autres modules viendront s'y greffer. Pour en ajouter un : une
         ligne dans stations[], rien d'autre, les abscisses se recalculent.

         ⚠️ ELLE S'EST COUPÉE EN DEUX le 20/08/2026. À dix-sept stations, il ne
         restait que 47 px entre deux pastilles — mesuré à l'écran : seize
         collisions de libellés si on les mettait du même côté, et une lecture
         en dents de scie sinon. C'est le motif déjà employé pour le CO₂ : le
         FLUIDE d'un côté, le MATÉRIEL de l'autre, un seul jalon chacun. Le
         découpage est celui de F. Henninot — quatre stations sur le fluide et
         son retour, le reste sur le circuit.

         🛑 AVANT DE RELANCER `ordonner-ligne.js` — LIRE CECI.
         Cette liste de stations n'est PAS écrite à la main d'un bout à l'autre :
         `C:\git\atelier-animations\outils\ordonner-ligne.js` l'écrit, en
         cherchant « var HUILE = { » puis la première « stations: [ » qui suit,
         et en remplaçant tout son contenu par SES DIX-SEPT stations.
         Depuis la coupe du 20/08, ce comportement est FAUX : il rendrait à
         HUILE les dix-sept, pendant que HUILE_CIRCUIT garderait ses treize —
         trente stations, doublons partout, et la ligne de nouveau illisible.
         Rien ne le signalerait : l'outil ne lit pas ce commentaire et ne
         vérifie rien après écriture.
         Il faut donc l'adapter AVANT de le relancer : quatre stations dans
         HUILE, les treize suivantes dans HUILE_CIRCUIT. L'outil vit dans un
         autre dépôt, qui avait du travail en cours le 20/08 au soir — c'est
         pour cela qu'il n'a pas été corrigé dans la foulée. --- */
  var HUILE = {
    slug: "huile", nom: "🛢 L’HUILE", sous: "le fluide et son retour",
    couleur: "#b06a00",
    jalon: "🏁 Le retour d’huile compris",
    stations: [
      cours("technologie-huiles-frigorifiques",          "Les familles d’huile", "rôles et familles"),
      cours("technologie-huiles-choix-controle",         "Choisir et contrôler", "grade, humidité"),
      cours("retour-huile-naturel",                      "Le retour naturel", "vitesse, pente, siphons"),
      cours("retour-huile-verifier",                     "Vérifier le retour", "charge réduite, calcul")
    ]
  };

  /* --- LE CIRCUIT D'HUILE : le matériel, de la séparation au diagnostic. La
         branche prolonge la ligne du fluide, comme les centrales prolongent
         celle du CO₂. Treize stations : c'est encore beaucoup, et l'alternance
         des libellés y reste nécessaire — `cotes()` le décide seul. Si elle
         devait encore grandir, c'est ici qu'il faudrait couper à nouveau,
         entre les organes et la surveillance. --- */
  var HUILE_CIRCUIT = {
    slug: "huile-circuit", nom: "🛢 LE CIRCUIT D’HUILE", sous: "le matériel, jusqu’au diagnostic",
    couleur: "#8a5200",
    jalon: "🏁 Circuit d’huile maîtrisé",
    stations: [
      cours("elements-circuit-huile",                    "Séparer et stocker", "séparateur, réservoir"),
      cours("elements-circuit-huile-regler",             "Sous pression", "clapet et régulateurs"),
      cours("separateur-huile-pedagogique",              "Le séparateur", "flotteur et retour"),
      cours("separateur-eclatement-pedagogique",         "Séparateur à choc", "plaque et vitesse"),
      cours("reservoir-huile-pedagogique",               "Le réservoir", "réserve tampon, niveaux"),
      cours("clapet-differentiel-huile-pedagogique",     "Le clapet taré", "la branche de pression"),
      cours("regulateur-huile-mecanique-pedagogique",    "Régulateur AC&R", "flotteur et pointeau"),
      cours("traxoil-pedagogique",                       "TraxOil", "capteur, vanne, alarme"),
      cours("traxoil-installer",                         "Monter le TraxOil", "modèles, BP/HP, preuve"),
      cours("pressostat-differentiel-huile-pedagogique", "Pressostat d’huile", "P1 − P2, seuils"),
      cours("pressostat-huile-securite",                 "Temporisation", "délai, coupure, relevé"),
      cours("diagnostic-circuit-huile",                  "Diagnostic : lire", "architecture, symptôme"),
      cours("diagnostic-circuit-huile-conclure",         "Conclure", "croiser et décider")
    ]
  };

  /* --- La ligne du CO₂ : DOUZE ESCALES DANS UN SEUL MODULE. Le parcours
         d'origine (composé sur Claude Design) durait 35 à 45 minutes d'un
         seul tenant ; il est ici découpé en escales de moins de dix minutes,
         chacune avec ses questions et son bilan. Comme pour le NRD, chaque
         station ouvre LE MÊME fichier à son étape — pas un octet dupliqué —
         d'où l'`id` propre à chacune, sans lequel le trajet les confondrait.
         ⚠️ Le R744 relève de la catégorie B (arrêté du 21/11/2025), pas de
         la catégorie D : le pack couvre A1/A2/D/E, cette ligne ouvre B. --- */
  function escale(slug, nom, sous) {
    return Object.assign(cours("co2-r744", nom, sous, "index.html?e=" + slug),
                         { id: "co2-" + slug });
  }
  var CO2 = {
    slug: "co2", nom: "🧊 LE CO₂ (R744)", sous: "le fluide · catégorie B",
    couleur: "#4338ca",
    jalon: "🏁 Le fluide maîtrisé",
    stations: [
      escale("pourquoi",           "Pourquoi le CO₂",     "hors quota, mais 120 bar"),
      escale("identite",           "Carte d’identité",    "31 °C · 73,8 bar · 57 bar à l’arrêt"),
      escale("point-critique",     "Le point critique",   "ce qui disparaît au-dessus"),
      escale("point-triple",       "Le point triple",     "charger d’abord en phase gazeuse"),
      escale("subcritique",        "Cycle subcritique",   "quand il fait frais"),
      escale("transcritique",      "Cycle transcritique", "plus de condensation"),
      escale("hp-optimale",        "La HP optimale",      "la HP devient un réglage"),
      escale("securite",           "Sécurité R744",       "pression, asphyxie, froid")
    ]
  };

  /* --- La branche des CENTRALES. Décision de F. Henninot le 20/08 : « il y a
         trop de choses pour le CO₂, on va faire une branche centrale qui
         expliquera les différents types de centrales ». La ligne au-dessus
         traite le FLUIDE et ce qu'il impose ; celle-ci traite les MACHINES.
         Même fichier derrière : ce sont les mêmes escales, groupées autrement. */
  var CENTRALES = {
    slug: "centrales", nom: "🏭 LES CENTRALES CO₂", sous: "les machines qui l’emploient",
    couleur: "#7c3aed",
    jalon: "🏁 Les centrales lues",
    stations: [
      escale("booster",            "La centrale booster", "bouteille flash, deux étages"),
      escale("booster-diagramme",  "Sur le diagramme",    "le circuit et le tracé ensemble"),
      escale("familles",           "Les architectures",   "cascade, parallèle, éjecteurs"),
      escale("compresseurs",       "Compresseurs",        "piston, variateur, relevé"),
      escale("ejecteur",           "L’éjecteur",          "récupérer l’énergie de détente")
    ]
  };

  /* --- La ligne de la RÉGULATION (22/08) : la rame « Les régules » de
         l'atelier, publiée dans le pack. Dix stations, de la commande directe
         sans sécurité aux quatre dégivrages, et DEUX correspondances vers
         CE QUI SE RÈGLE : le pressostat BP entre en scène avec le pump-down
         (c'est lui qui arrête le compresseur en fin de tirage au vide), le
         régulateur électronique clôt la ligne — l'électronique remplace la
         logique câblée. Une correspondance = la même station posée sur deux
         lignes, marquée corr (motif du détendeur) ; aucun couloir à tracer. --- */
  var REGULES = {
    slug: "regules", nom: "🔌 LA RÉGULATION", sous: "commander le froid, dégivrer",
    couleur: "#7b1e3d",
    jalon: "🏁 Régulation maîtrisée",
    stations: [
      cours("commande-directe-thermostat", "Commande directe",     "le thermostat commande"),
      cours("protection-minimum-serie",    "Protection minimum",   "HP, BP et B1 en série"),
      Object.assign(cours("pressostat-bp-kp1", "Le pressostat BP", "correspondance ↔ Réglages"), { corr: true }),
      cours("pump-down-automatique",       "Pump-down auto",       "deux commandes séparées"),
      cours("pump-down-ameliore",          "Pump-down amélioré",   "le relais mémorise"),
      cours("pump-down-unique",            "Pump-down unique",     "deux BP, deux missions"),
      cours("sans-degivrage-commande",     "Sans dégivrage",       "aucun organe dédié"),
      cours("degivrage-naturel",           "Dégivrage naturel",    "l’air fait le travail"),
      cours("degivrage-electrique",        "Dégivrage électrique", "résistances, égouttage"),
      cours("degivrage-gaz-chauds",        "Gaz chauds",           "dériver le refoulement"),
      cours("degivrage-inversion-cycle",   "Inversion de cycle",   "la vanne quatre voies"),
      Object.assign(cours("regulateur-electronique-interactif", "Régulateur électronique", "correspondance ↔ Réglages"), { corr: true })
    ]
  };

  var CEINTURE = {
    slug: "evaluer", nom: "✅ S’ÉVALUER", sous: "QCM · examens blancs A1 · A2 · D · E",
    couleur: "#b06a00", jalon: "🏁 Prêt pour l’attestation",
    stations: [
      carte("ex-pos",   "Positionnement",        "où j’en suis, avant tout"),
      carte("rev-g1",   "Réviser — 14 séries",   "groupe par groupe"),
      /* Site externe (dépôt inerweb-fgaz), anonymisé le 20/08 : aucun
         nominatif, aucun envoi réseau — contrôlé AVANT branchement. */
      { id: "fgaz", href: "https://frigorx.github.io/inerweb-fgaz/",
        nom: "Mission F-GAZ", sous: "12 chapitres · quiz, examen, flash" },
      carte("ex-ech",   "Échauffement niv. 1",   "les fondamentaux", true),
      carte("ex-defi",  "Défi technicien",       "diagnostics niv. 2", true),
      carte("ex-e",     "Examen blanc E",        "étanchéité", true),
      carte("ex-d",     "Examen blanc D",        "récupération", true),
      carte("ex-a2",    "Examen blanc A2",       "petites charges", true),
      carte("ex-a1",    "Examen blanc A1",       "toutes opérations", true)
    ]
  };

  /* --- La ligne de service : des outils de calcul, utiles depuis
         n'importe quelle branche et à n'importe quel moment. Ce ne sont
         pas des cours : on ne les « suit » pas, on s'en sert. --- */
  var OUTILS = {
    slug: "outils", nom: "🧰 LA BOÎTE À OUTILS", sous: "calculer, régler, vérifier sur le chantier",
    couleur: "#2f5689",
    stations: [
      outil("manometres_v5",          "Manomètres",        "lire la pression, trouver la T°"),
      outil("reglette_v5",            "Réglette P/T",      "la correspondance d’un coup d’œil"),
      outil("identification_v5",      "Identifier un fluide", "retrouver lequel c’est"),
      outil("charge_a2l_v5",          "Charge maxi A2L",   "R-32 : la limite par local"),
      /* Le libellé passe par esc() au rendu : on écrit le caractère nu. */
      outil("co2_fgas_v5",            "CO₂ & F-Gas",       "équivalent CO₂, périodicité"),
      outil("aeraulique_v5",          "Aéraulique",        "débits, gaines, pertes de charge"),
      outil("diagnostic_depannage_v5","Diagnostic",        "la panne, pas à pas")
    ]
  };

  /* --- La ligne électrotechnique : le frigoriste travaille sous tension.
         Annoncée par « Réseau en travaux », elle ouvre le 20/08 avec deux
         stations du dépôt sous-tension (le parcours câbles, sorti des
         correspondances où il vivait, et le TD triphasé neutralisé le
         même jour) ; l'habilitation électrique viendra s'y greffer. --- */
  var ELECTROTECH = {
    slug: "electrotech", nom: "⚡ ÉLECTROTECH", sous: "câbles, triphasé, couplages",
    couleur: "#c0392b", jalon: "🏁 À l’aise avec le triphasé",
    stations: [
      /* L'id historique « corr-cables » est GARDÉ : le trajet des visiteurs
         qui l'ont déjà ouverte en correspondance reste marqué. */
      { id: "corr-cables", href: "https://frigorx.github.io/sous-tension/",
        nom: "Sous tension", sous: "lire et choisir les câbles" },
      { id: "elec-triphase", href: "https://frigorx.github.io/sous-tension/td-triphase.html",
        nom: "TD Triphasé", sous: "couplages étoile & triangle" }
    ]
  };

  /* --- Les CORRESPONDANCES : on ne prolonge pas le réseau, on montre où
         changer de réseau. Ce sont d'autres sites inerWeb, hors de ce
         dépôt — le froid ne s'arrête pas au froid : un frigoriste travaille
         sous tension et en hauteur, et ces habilitations-là s'obtiennent
         ailleurs. Extensible : un site de plus = une ligne de plus. --- */
  function corr(id, url, nom, sous) {
    return { id: "corr-" + id, href: url, nom: nom, sous: sous };
  }
  var CORRESPONDANCES = {
    nom: "🔄 CORRESPONDANCES", sous: "d’autres réseaux inerWeb",
    couleur: "#5a6b7d",
    /* inerweb-elec est ÉCARTÉ (décision F. Henninot 19/08) : il s'appuie
       sur des documents de centres d'habilitation dont il ne détient pas
       les droits. Ne pas le rebrancher sans que cette question soit réglée.
       (Le parcours câbles est monté en ligne ⚡ ÉLECTROTECH le 20/08.) */
    stations: [
      corr("hauteur", "https://frigorx.github.io/qcm-travail-hauteur/",
           "🪜 Travail en hauteur", "R408 · échafaudages, EPI"),
      corr("fluide",  "https://frigorx.github.io/-inerweb-fluid-cerfa-fi-bsd-4/",
           "🧊 inerWeb Fluide",     "le logiciel de traçabilité")
    ]
  };
  /* DONNEES-PLAN — FIN */

  /* Ce que le moteur de carte et les scripts de fabrication lisent. */
  window.PLAN_DONNEES = {
    SUPPORTS: SUPPORTS, TRONC: TRONC, LIGNES: LIGNES, HUILE: HUILE,
    HUILE_CIRCUIT: HUILE_CIRCUIT, CO2: CO2, CENTRALES: CENTRALES, REGULES: REGULES,
    CEINTURE: CEINTURE, OUTILS: OUTILS, ELECTROTECH: ELECTROTECH,
    CORRESPONDANCES: CORRESPONDANCES
  };
})();
