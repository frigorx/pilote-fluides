/* =====================================================================
   themes.js — les jeux de JouéRézo et leurs thèmes : UNE seule source
   ---------------------------------------------------------------------
   RÔLE : décrire chaque jeu (nom, lettre du code de partie, règle) et
   chaque thème avec ses données et ses « portes » (les stations du site
   à revoir avant de rejouer).
   D'OÙ VIENT LE CONTENU — rien d'inventé :
     · symboles : bibliothèque ../symboles/ (QElectroTech, CC BY 3.0) ;
     · fluides, classes, PRP, procédures : planches HabFluide servies
       dans ../f/a-…/ (packs/fluides/res/svg/*.svg) et classes du moteur
       CoolProp de RézoTools (rezotools/calculettes/cerveau_v5.js) ;
     · électricité : banque HoCourant (../hocourant/donnees/questions.js) ;
     · travail en hauteur : banque R408 (../r408/donnees/questions.js).
   Les deux banques externes sont chargées à la demande par commun.js.
   PIÈGES : (1) un thème Memory « texte » doit avoir des faces B toutes
   différentes, sinon deux cartes se valent aux yeux du joueur ;
   (2) le R-290 est A3, jamais A2L ; (3) PRP = valeurs indicatives (AR4,
   celles des planches) — en intervention la fiche du fluide fait foi.
   ===================================================================== */

window.JR_JEUX = {
  memory: { nom: "Memory", lettre: "M", emoji: "🃏",
    phrase: "Retrouvez les paires : un symbole et son nom, un fluide et sa carte, un risque et sa protection.",
    regle: "Retournez deux cartes. Si elles vont ensemble, elles restent face visible. Le but : finir avec le moins de coups possible." },
  ordre: { nom: "Le bon ordre", lettre: "O", emoji: "🔢",
    phrase: "Touchez les étapes dans l'ordre où on les fait vraiment à l'atelier.",
    regle: "Les étapes sont mélangées. Touchez-les dans le bon ordre : une étape juste se range, une étape fausse tremble et compte une erreur." },
  chrono: { nom: "Chrono vrai ou faux", lettre: "C", emoji: "⏱️",
    phrase: "Soixante secondes, une affirmation à la fois : vrai ou faux ?",
    regle: "Une question, une réponse proposée. Dites si elle est vraie ou fausse. Le chrono tourne : 60 secondes." },
  qcm: { nom: "QCM éclair", lettre: "Q", emoji: "✅",
    phrase: "Dix questions, trois réponses, une seule bonne. L'explication tombe tout de suite.",
    regle: "Dix questions tirées au sort. Une seule réponse juste par question ; l'explication s'affiche aussitôt." },
  intrus: { nom: "L'intrus", lettre: "I", emoji: "🔍",
    phrase: "Quatre cartes, une de trop. Trouvez celle qui ne va pas avec les autres.",
    regle: "Quatre mots : trois vont ensemble, un est de trop. Touchez l'intrus. On vous dit pourquoi." },
  aventure: { nom: "Nuit à l'atelier", lettre: "A", emoji: "🧟",
    phrase: "Un zombie frigoriste rôde. Chaque geste sûr le repousse. Chaque geste faux lui fait gagner un pas.",
    regle: "Une histoire à choix. Trois cœurs. Un mauvais geste coûte un cœur ; à zéro, le zombie vous embauche." },
  schema: { nom: "Compléter le schéma", lettre: "S", emoji: "🧩",
    phrase: "Des symboles manquent sur un vrai schéma de câblage ou sur le circuit frigorifique : remettez-les à leur place.",
    regle: "Touchez une pièce du plateau, puis l'emplacement qui porte son repère — ou faites-la glisser. Une mauvaise place compte une erreur." },
  quisuisje: { nom: "Qui suis-je ?", lettre: "D", emoji: "🗣️",
    phrase: "Une définition, trois noms : l'organe, l'outil ou l'appareil qui parle, c'est lequel ?",
    regle: "Dix définitions tirées au sort. Un seul nom est juste ; on vous dit où le revoir." },
  pendu: { nom: "Le pendu du frigo", lettre: "P", emoji: "🌡️",
    phrase: "Un mot du métier, lettre par lettre. Chaque lettre fausse fait chauffer le compresseur.",
    regle: "Cinq mots. L'indice, c'est la définition. Huit lettres fausses et le compresseur grille." },
  heros: { nom: "Le circuit dont vous êtes le héros", lettre: "H", emoji: "💧", /* moteur de l'aventure (data-jeu="heros"), scénario dans heros.js */
    phrase: "Vous êtes une molécule de fluide frigorigène. Faites le tour du circuit : à chaque organe, une énigme.",
    regle: "Huit organes, huit énigmes, trois cœurs. Une bonne réponse vous fait passer l'organe : parfois, vous changez d'état. Une mauvaise vous laisse sur place, avec un indice et la station à revoir." },
  depanneur: { nom: "Le dépanneur", lettre: "R", emoji: "🔧", station: true, /* retiré de la liste des jeux (Franck, 03/10 : « je supprime des jeux le dépannage ») : devient une station à part */
    phrase: "Une chambre froide en panne. Branchez le manifold, pincez le thermomètre, regardez, touchez, puis nommez la panne.",
    regle: "Trois situations. Vous choisissez vos relevés comme sur le chantier ; les pressions se lisent sur le cadran, la surchauffe et le sous-refroidissement se calculent. Puis vous concluez. Moins de relevés inutiles, meilleur coefficient." }
};

/* ---------- portes partagées ---------- */
const P = {
  symbolesFroid: [
    { t: "Le circuit organe par organe (thermo-techno)", h: "../packs/fluides/res/circuit-organe-par-organe/" },
    { t: "La croix du frigoriste (HabFluide)", h: "../f/a-croix-frigoriste/" },
    { t: "La bibliothèque de symboles inerWeb", h: "../symboles/svg/" }
  ],
  symbolesElec: [
    { t: "ÉlectroRézo 8.11 — le jeu des symboles", h: "../electrorezo/stations/8-11-jeu-des-symboles/" },
    { t: "ÉlectroRézo 5.9 — lire un schéma", h: "../electrorezo/stations/5-9-lire-un-schema/" },
    { t: "ÉlectroRézo 5.2 — le contacteur", h: "../electrorezo/stations/5-2-contacteur/" }
  ],
  fluides: [
    { t: "Classes de sécurité NF EN 378 — les huit cases", h: "../f/a-classes-securite/" },
    { t: "Les familles de fluides — trois atomes décident de tout", h: "../f/a-familles-fluides/" },
    { t: "Décoder un code fluide, chiffre par chiffre", h: "../f/a-nomenclature/" },
    { t: "Un kilogramme n'égale pas un kilogramme (PRP)", h: "../f/a-prp-echelle/" },
    { t: "La leçon complète : HabFluide en ligne", h: "../f/" }
  ],
  gestes: [
    { t: "Avant la première charge : l'ordre est verrouillé", h: "../f/a-sequence-mise-en-service/" },
    { t: "L'ordre des vannes : une chorégraphie", h: "../f/a-ordre-vannes/" },
    { t: "Le tirage au vide : la courbe qui descend", h: "../f/a-tirage-au-vide/" },
    { t: "Récupération : circuit fermé, bouteille pesée", h: "../f/a-recuperation-securisee/" },
    { t: "Détecteur : contrôler, balayer, confirmer", h: "../f/a-recherche-fuite-geste/" },
    { t: "Brasage : récupérer et balayer, jamais chauffer du fluide", h: "../f/a-secu-flamme/" },
    { t: "La pesée : deux pesées, jamais une", h: "../f/a-pesee-charge/" }
  ],
  securite: [
    { t: "Consignation : cinq étapes dans l'ordre", h: "../f/a-secu-consignation/" },
    { t: "Préparation de chantier : quatre temps avant de toucher", h: "../f/a-prepa-chantier/" },
    { t: "Espace clos : mesurer avant d'entrer", h: "../f/a-securite-espace-clos/" },
    { t: "La bouteille : jamais à ras, jamais chauffée", h: "../f/a-secu-bouteille/" },
    { t: "L'épreuve de pression, à l'azote seul", h: "../f/a-epreuve-azote/" },
    { t: "R-290 : préparer la zone avant le geste", h: "../f/a-r290-zone-intervention/" },
    { t: "Les EPI (réseau Législation)", h: "../legislation/stations/risques-epi/" }
  ],
  electricite: [
    { t: "HoCourant — le risque électrique, module par module", h: "../hocourant/" },
    { t: "La consignation électrique en cinq étapes", h: "../f/a-secu-consignation/" }
  ],
  hauteur: [
    { t: "R408 — le travail en hauteur, module par module", h: "../r408/" }
  ]
};

/* ---------- utilitaires locaux : paires image ↔ nom, mot ↔ mot, image ↔ image ---------- */
function sym(id, nom) { return { a: { img: id, alt: "" }, b: { txt: nom }, nom: nom }; }
function txt(a, b) { return { a: { txt: a }, b: { txt: b } }; }
const BIB = "illustrations/bibliotheque/";
function reel(p) { return { nom: p.nom, a: { src: p.reel.src || (BIB + p.reel.lib + ".svg"), alt: "" }, b: { src: BIB + p.sym.lib + ".svg", alt: "" } }; }
function photo(p) { return { nom: p.nom, a: { src: p.src, alt: "" }, b: { txt: p.nom } }; }
/* les banques de mots (Qui suis-je ?, pendu) : écrites ici (definitions.js) + fabriquées des stations ÉlectroRézo */
const MOTS_FROID = (window.JR_DEFINITIONS || []).filter(d => d.famille === "froid");
const MOTS_OUTILS = (window.JR_DEFINITIONS || []).filter(d => d.famille === "outil");
const MOTS_ELEC = (window.JR_ELECTROREZO || []).map(e => ({ mot: e.mot, def: e.def, ou: e.ou, porte: e.porte }));

const JR_THEMES = window.JR_THEMES = {};

/* =====================================================================
   MEMORY — 8 paires tirées au sort dans chaque réserve
   ===================================================================== */
JR_THEMES.memory = [
  { id: "symboles-froid", nom: "Symboles du froid", emoji: "❄️", type: "image", portes: P.symbolesFroid,
    paires: [
      sym("compresseur-a-piston", "Compresseur à piston"),
      sym("compresseur-scroll", "Compresseur scroll"),
      sym("compresseur-a-vis", "Compresseur à vis"),
      sym("detendeur-thermostatique-interne", "Détendeur thermostatique"),
      sym("detendeur-electronique", "Détendeur électronique"),
      sym("electrovanne-2", "Électrovanne"),
      sym("filtre-a-cartouche-2", "Filtre à cartouche"),
      sym("separateur-d-huile", "Séparateur d'huile"),
      sym("soupape-de-securite", "Soupape de sécurité"),
      sym("ventilateur-axial", "Ventilateur axial"),
      sym("pompe-a-vide-2", "Pompe à vide"),
      sym("sonde-ntc", "Sonde NTC"),
      sym("clapet-anti-retour-3", "Clapet anti-retour"),
      sym("vanne-d-isolement", "Vanne d'isolement"),
      sym("echangeur-a-plaques-3", "Échangeur à plaques"),
      sym("bouteille-de-refrigerant", "Bouteille de fluide"),
      sym("manometres", "Manomètres"),
      sym("capillaire", "Capillaire"),
      sym("thermometre-a-bulbe", "Thermomètre à bulbe"),
      sym("pompe-a-condensats", "Pompe à condensats"),
      sym("silencieux", "Silencieux")
    ] },
  { id: "symboles-elec", nom: "Symboles électriques", emoji: "⚡", type: "image", portes: P.symbolesElec,
    paires: [
      sym("fusible-symbole-general", "Fusible"),
      sym("disjoncteur-magneto-thermique", "Disjoncteur magnéto-thermique"),
      sym("interrupteur-differentiel", "Interrupteur différentiel"),
      sym("sectionneur-triphase", "Sectionneur triphasé"),
      sym("relais-thermique", "Relais thermique"),
      sym("bobine", "Bobine de contacteur"),
      sym("contact-a-fermeture-contact-de-travail", "Contact à fermeture (NO)"),
      sym("contact-a-ouverture-contact-de-repos", "Contact à ouverture (NF)"),
      sym("bouton-poussoir-4", "Bouton-poussoir"),
      sym("lampe-de-signalisation-symbole-general", "Lampe de signalisation"),
      sym("moteur-triphase", "Moteur triphasé"),
      sym("moteur-monophase", "Moteur monophasé"),
      sym("transformateur-a-deux-enroulements", "Transformateur"),
      sym("terre-symbole-general", "Terre"),
      sym("condensateur", "Condensateur"),
      sym("thermostat-nc", "Thermostat"),
      sym("pressostat-nf", "Pressostat"),
      sym("horloge", "Horloge")
    ] },
  { id: "fluides", nom: "Fluides et classes", emoji: "🧪", type: "texte", portes: P.fluides,
    paires: [
      txt("R-744", "CO₂ · A1 · haute pression, s'accumule en point bas"),
      txt("R-717", "ammoniac · B2L · toxique, faiblement inflammable"),
      txt("R-290", "propane · A3 · très inflammable, charge limitée"),
      txt("R-600a", "isobutane · A3 · les frigos domestiques"),
      txt("R-1270", "propylène · A3 · hydrocarbure"),
      txt("R-32", "HFC pur · A2L · PRP 675"),
      txt("R-1234yf", "HFO · A2L · PRP proche de 1"),
      txt("R-454B", "mélange HFO/HFC · A2L · remplace le R-410A"),
      txt("R-134a", "HFC · A1 · zéro chlore, PRP 1430"),
      txt("R-404A", "mélange zéotrope · A1 · PRP 3922"),
      txt("R-410A", "mélange zéotrope · A1 · PRP 2088"),
      txt("R-507A", "mélange azéotrope · A1 · se comporte en corps pur"),
      txt("R-22", "HCFC · du chlore · interdit"),
      txt("R-12", "CFC · chlore + fluor · interdit, tueur d'ozone")
    ] },
  { id: "vrai-symbole-elec", nom: "Le vrai et le symbole : électricité", emoji: "🔌", type: "image", portes: P.symbolesElec,
    paires: ((window.JR_REEL_SYMBOLE || {}).elec || []).map(reel) },
  { id: "vrai-symbole-froid", nom: "Le vrai et le symbole : froid", emoji: "🧊", type: "image", portes: P.symbolesFroid,
    paires: ((window.JR_REEL_SYMBOLE || {}).froid || []).map(reel) },
  { id: "outils", nom: "Les outils", emoji: "🧰", type: "image",
    portes: [{ t: "CuivRézo — les gestes de base", h: "../cuivrezo/" }, { t: "HabFluide — Le manifold : lire, brancher", h: "../f/mise-en-service-3/" }, { t: "ÉlectroRézo 1.9 — Mesurer", h: "../electrorezo/stations/1-9-mesurer/" }],
    paires: (window.JR_OUTILS_PHOTOS || []).map(photo) },
  { id: "risques", nom: "Un risque, une protection", emoji: "🦺", type: "texte", portes: P.securite,
    paires: [
      txt("Projection de fluide vers les yeux", "Lunettes de protection, et sortir de l'axe"),
      txt("Fluide liquide sur la peau", "Gants adaptés : brûlure par le froid"),
      txt("Chute d'un outil sur le pied", "Chaussures de sécurité"),
      txt("Bruit du compresseur, de la perceuse", "Protection auditive"),
      txt("Fumées de brasage", "Ventiler, ne pas se pencher au-dessus"),
      txt("Local CO₂ fermé", "Mesurer avant d'entrer"),
      txt("R-290 dans le local", "Détecteur HC, zone balisée, zéro ignition"),
      txt("Bouteille au soleil", "À l'ombre, jamais chauffée, jamais à ras"),
      txt("Tension dans l'armoire", "Consigner, puis vérifier au VAT"),
      txt("Fuite soupçonnée", "Détecteur électronique, jamais la flamme"),
      txt("Circuit à éprouver", "Azote sec avec mano-détendeur"),
      txt("Raccord encore sous pression", "Desserrer lentement, par petites touches")
    ] }
];

/* =====================================================================
   LE BON ORDRE — chaque thème porte plusieurs séries ; 4 par partie
   ===================================================================== */
JR_THEMES.ordre = [
  { id: "gestes", nom: "Les gestes du frigoriste", emoji: "🔧", parPartie: 4, portes: P.gestes,
    series: [
      { titre: "Avant la première charge",
        etapes: ["Assembler le circuit", "Épreuve à l'azote sec", "Contrôler l'étanchéité", "Tirer au vide", "Vérifier la tenue du vide", "Charger, en pesant"],
        apres: "L'ordre est verrouillé. Pression, durée, vide et charge : la documentation du constructeur." },
      { titre: "Déconnecter le manifold",
        etapes: ["Fermer : côté circuit, puis côté appareil", "Laisser la pression se stabiliser", "Desserrer lentement, par petites touches", "Récupérer par l'appareil le fluide du flexible", "Déconnecter quand la pression est retombée"],
        apres: "Ce qui commande l'ordre : la pression, jamais la montre." },
      { titre: "Récupérer le fluide",
        etapes: ["Identifier le fluide et prendre une bouteille compatible", "Peser la bouteille avant", "Brancher la station en circuit fermé", "Récupérer", "Peser après et noter au registre"],
        apres: "Un fluide par bouteille : identification et traçabilité." },
      { titre: "Chercher une fuite au détecteur",
        etapes: ["Contrôler l'appareil sur le gaz recherché", "Balayer lentement autour du raccord", "Confirmer la fuite", "Écrire au registre"],
        apres: "Puis : localiser, réparer, recontrôler." },
      { titre: "Braser sur un circuit",
        etapes: ["Récupérer tout le fluide", "Balayer à l'azote pendant le brasage", "Ventiler, ne pas se pencher au-dessus"],
        apres: "Ce qui sort d'un tube chauffé encore chargé n'était pas dedans : gaz toxiques et corrosifs." },
      { titre: "Peser la charge",
        etapes: ["Peser la bouteille avant, noter", "Charger en surveillant la balance", "Peser après, noter", "Soustraire : c'est la charge introduite", "Reporter au registre"],
        apres: "Deux pesées, jamais une. La balance dit combien ; le manomètre dit comment la machine se comporte." },
      { titre: "Contrôler la tenue du vide",
        etapes: ["Tirer au vide, pompe en marche", "Fermer la vanne côté circuit", "Arrêter la pompe", "Lire le palier au vacuomètre, circuit isolé"],
        apres: "Un vide qui remonte signale d'abord une fuite ; parfois une humidité résiduelle." }
    ] },
  { id: "securite", nom: "Sécurité : avant de toucher", emoji: "🛑", parPartie: 3, portes: P.securite,
    series: [
      { titre: "Consigner une installation électrique",
        etapes: ["Séparer", "Condamner", "Identifier", "Vérifier l'absence de tension au VAT", "Mettre à la terre si nécessaire"],
        apres: "Le VAT se teste avant et après, sur une source sous tension. Une coupure ne prouve jamais l'absence de tension." },
      { titre: "Préparer un chantier",
        etapes: ["Reconnaître : fluide, local, issues, ventilation", "Identifier les risques du jour", "Se protéger : les EPI, avant de commencer", "Préparer : délimiter la zone, sortir le matériel"],
        apres: "Ce qui n'a pas été prévu ici se découvrira au pire moment." },
      { titre: "Entrer dans un local technique CO₂",
        etapes: ["Ventiler le local", "Mesurer avant d'entrer", "Si l'alarme sonne : STOP, on n'entre pas, on alerte"],
        apres: "Le danger est dans le local : gaz invisible en point bas. Personne au sol : ne pas descendre." }
    ] }
];

/* =====================================================================
   L'INTRUS — 8 séries par partie
   ===================================================================== */
JR_THEMES.intrus = [
  { id: "fluides", nom: "Fluides", emoji: "🧪", portes: P.fluides, series: [
    { q: "Trois fluides A1 et un intrus", bons: ["R-134a", "R-410A", "R-404A"], intrus: "R-290", pourquoi: "Le R-290 (propane) est A3 : très inflammable. Les trois autres sont A1." },
    { q: "Trois fluides A2L et un intrus", bons: ["R-32", "R-1234yf", "R-454B"], intrus: "R-744", pourquoi: "Le CO₂ (R-744) est A1 : il ne brûle pas. Son risque, c'est la pression et l'anoxie." },
    { q: "Trois fluides naturels et un intrus", bons: ["R-290", "R-717", "R-744"], intrus: "R-32", pourquoi: "Le R-32 est un HFC de synthèse. Propane, ammoniac et CO₂ existent dans la nature." },
    { q: "Trois fluides interdits et un intrus", bons: ["R-12", "R-22", "R-502"], intrus: "R-134a", pourquoi: "Le R-134a n'a pas de chlore. Les trois autres en ont : tueurs d'ozone, interdits." },
    { q: "Trois mélanges zéotropes (R-4xx) et un intrus", bons: ["R-404A", "R-407C", "R-410A"], intrus: "R-507A", pourquoi: "R-5xx : mélange azéotrope, il se comporte en corps pur." },
    { q: "Trois fluides inorganiques (R-7xx) et un intrus", bons: ["R-717 ammoniac", "R-744 CO₂", "R-718 eau"], intrus: "R-600a isobutane", pourquoi: "R-7xx = 7 + masse molaire. L'isobutane est un hydrocarbure, série 600." },
    { q: "Trois atomes qui décident de tout, et un intrus", bons: ["Chlore", "Fluor", "Hydrogène"], intrus: "Azote", pourquoi: "Chlore (ozone), fluor (effet de serre), hydrogène (vie courte). L'azote sert à l'épreuve, pas à la molécule." },
    { q: "Trois hydrocarbures A3 et un intrus", bons: ["R-290 propane", "R-600a isobutane", "R-1270 propylène"], intrus: "R-1234yf", pourquoi: "Le R-1234yf est un HFO, classé A2L. Tout hydrocarbure est A3." }
  ] },
  { id: "securite", nom: "Sécurité", emoji: "🛑", portes: P.securite, series: [
    { q: "Trois EPI et un intrus", bons: ["Gants", "Lunettes", "Chaussures de sécurité"], intrus: "Manifold", pourquoi: "Le manifold est un outil. Il ne protège personne." },
    { q: "Trois étapes de la consignation et un intrus", bons: ["Séparer", "Condamner", "Vérifier au VAT"], intrus: "Mesurer la surchauffe", pourquoi: "La surchauffe, c'est le réglage frigorifique. La consignation : séparer, condamner, identifier, vérifier, mettre à la terre." },
    { q: "Trois choses pour l'épreuve de pression et un intrus", bons: ["Azote sec", "Mano-détendeur", "Manifold"], intrus: "Oxygène", pourquoi: "Oxygène sur circuit huilé = explosion. Azote seul, toujours avec un mano-détendeur." },
    { q: "Trois gestes permis avec une bouteille et un intrus", bons: ["La peser", "L'identifier", "La ranger à l'ombre"], intrus: "La chauffer au chalumeau", pourquoi: "Jamais chauffer une bouteille : ni flamme, ni eau chaude, ni radiateur, ni soleil." },
    { q: "Trois méthodes de recherche de fuite et un intrus", bons: ["Détecteur électronique", "Eau savonneuse", "Mise sous azote et contrôle"], intrus: "Lampe à flamme", pourquoi: "La flamme : méthode ancienne, aujourd'hui interdite." },
    { q: "Trois effets du courant sur le corps et un intrus", bons: ["Électrisation", "Brûlure", "Arc électrique"], intrus: "Surchauffe du fluide", pourquoi: "La surchauffe est une grandeur frigorifique, pas un effet du courant." },
    { q: "Trois éléments d'un garde-corps et un intrus", bons: ["Lisse haute", "Lisse intermédiaire", "Plinthe"], intrus: "Tabouret sur le plancher", pourquoi: "Un tabouret sur un plancher d'échafaudage, c'est une chute en préparation." },
    { q: "Trois temps de la préparation de chantier et un intrus", bons: ["Reconnaître", "Identifier les risques", "Se protéger"], intrus: "Braser", pourquoi: "On brase après avoir préparé, jamais à la place." }
  ] },
  { id: "outils", nom: "Les outils", emoji: "🧰", portes: [{ t: "CuivRézo — les gestes de base", h: "../cuivrezo/" }, { t: "Le tirage au vide : la courbe qui descend", h: "../f/a-tirage-au-vide/" }, { t: "La pesée : deux pesées, jamais une", h: "../f/a-pesee-charge/" }], series: [
    { q: "Trois outils pour façonner le cuivre et un intrus", bons: ["Cintreuse", "Dudgeonnière", "Pince à emboîture"], intrus: "Vacuomètre", pourquoi: "Le vacuomètre lit le vide ; les trois autres plient, évasent ou élargissent le tube." },
    { q: "Trois choses du tirage au vide et un intrus", bons: ["Pompe à vide", "Vacuomètre", "Vanne d'isolement"], intrus: "Chalumeau", pourquoi: "Le chalumeau brase ; il n'a rien à faire pendant un tirage au vide." },
    { q: "Trois outils de la coupe et un intrus", bons: ["Coupe-tube", "Ébavureur", "Étau à mordaches"], intrus: "Balance de charge", pourquoi: "La balance pèse la bouteille ; elle ne touche pas au tube." },
    { q: "Trois appareils de mesure et un intrus", bons: ["Manifold", "Vacuomètre", "Pince ampèremétrique"], intrus: "Cintrette", pourquoi: "La cintrette plie le tube ; les trois autres mesurent une pression, un vide ou un courant." },
    { q: "Trois choses de la récupération et un intrus", bons: ["Station de récupération", "Balance de charge", "Bouteille compatible identifiée"], intrus: "Bouteille d'oxygène", pourquoi: "L'oxygène n'entre jamais dans un circuit frigorifique : explosion sur l'huile." },
    { q: "Trois choses de l'épreuve de pression et un intrus", bons: ["Bouteille d'azote", "Mano-détendeur", "Manifold"], intrus: "Pompe à vide", pourquoi: "La pompe à vide vient APRÈS l'épreuve, pour tirer au vide un circuit étanche." }
  ] },
  { id: "organes", nom: "Organes et appareils", emoji: "⚙️", portes: P.symbolesFroid.concat(P.symbolesElec), series: [
    { q: "Trois organes du cycle et un intrus", bons: ["Compresseur", "Condenseur", "Évaporateur"], intrus: "Manomètre", pourquoi: "Le quatrième organe, c'est le détendeur. Le manomètre mesure, il ne fait pas le cycle." },
    { q: "Trois compresseurs et un intrus", bons: ["À piston", "Scroll", "À vis"], intrus: "Thermostatique", pourquoi: "Thermostatique, c'est un détendeur." },
    { q: "Trois protections électriques et un intrus", bons: ["Fusible", "Disjoncteur", "Relais thermique"], intrus: "Contacteur", pourquoi: "Le contacteur commande ; il ne protège pas." },
    { q: "Trois appareils de mesure et un intrus", bons: ["Manomètre", "Thermomètre", "Vacuomètre"], intrus: "Électrovanne", pourquoi: "L'électrovanne ouvre ou ferme un passage ; elle ne mesure rien." },
    { q: "Trois organes de la ligne liquide et un intrus", bons: ["Filtre déshydrateur", "Voyant liquide", "Électrovanne"], intrus: "Séparateur d'huile", pourquoi: "Le séparateur d'huile se monte au refoulement du compresseur, pas sur la ligne liquide." },
    { q: "Trois appareils qui commandent et un intrus", bons: ["Thermostat", "Pressostat", "Horloge"], intrus: "Fusible", pourquoi: "Le fusible protège. Thermostat, pressostat et horloge donnent des ordres." }
  ] }
];

/* =====================================================================
   CHRONO et QCM — mêmes thèmes, deux façons de jouer
   Format d'une question : q, ok (LA bonne), nok (2 distracteurs), exp.
   ===================================================================== */
const QUESTIONS_FLUIDES = [
  { q: "Le R-290 (propane) est classé…", ok: "A3 : très inflammable, charge limitée", nok: ["A2L : faiblement inflammable", "A1 : aucune flamme"], exp: "Tout hydrocarbure est A3. Le piège de l'année : le R-290 n'est pas A2L." },
  { q: "Dans une classe de sécurité, la lettre A ou B indique…", ok: "la toxicité", nok: ["l'inflammabilité", "la pression"], exp: "La lettre dit la toxicité (A faible, B élevée) ; le chiffre dit l'inflammabilité." },
  { q: "Le chiffre 1 d'une classe (A1, B1) signifie…", ok: "aucune propagation de flamme", nok: ["une inflammabilité forte", "une toxicité faible"], exp: "1 : aucune flamme ; 2L : faible et lente ; 2 : inflammable ; 3 : forte." },
  { q: "Le CO₂ (R-744) est classé…", ok: "A1, avec un risque de pression et d'anoxie", nok: ["A2L, avec un risque d'inflammation", "B2L, toxique"], exp: "A1 : ni inflammable ni toxique au sens de la classe ; mais haute pression et accumulation en point bas." },
  { q: "L'ammoniac (R-717) est classé…", ok: "B2L", nok: ["A1", "A3"], exp: "B : toxicité élevée ; 2L : faiblement inflammable." },
  { q: "Le PRP d'un fluide, c'est…", ok: "son effet de serre comparé à 1 kg de CO₂", nok: ["sa pression de service", "sa température d'ébullition"], exp: "PRP 1 pour le CO₂, l'étalon." },
  { q: "Fuir 1 kg de R-404A (PRP 3922) revient à relâcher…", ok: "environ 3,9 tonnes équivalent CO₂", nok: ["environ 39 kg équivalent CO₂", "3922 litres de CO₂"], exp: "1 kg × 3922 = 3922 kg, soit 3,9 t éq. CO₂." },
  { q: "Le PRP du R-32 est…", ok: "675", nok: ["2088", "3922"], exp: "R-32 : 675 ; R-410A : 2088 ; R-404A : 3922. Valeurs indicatives : la fiche du fluide fait foi." },
  { q: "Les CFC (R-12) sont interdits parce que…", ok: "leur chlore détruit la couche d'ozone", nok: ["ils sont très inflammables", "ils sont trop chers"], exp: "Chlore → destruction de l'ozone. Les HCFC (R-22) en ont aussi, un peu moins." },
  { q: "Un HFC (R-134a, R-32) contient…", ok: "zéro chlore", nok: ["du chlore et du fluor", "du brome"], exp: "Ozone sauvé (ODP = 0), mais PRP fort : d'où le phase-down F-Gas." },
  { q: "Un HFO (R-1234yf) a un PRP…", ok: "proche de 1", nok: ["proche de 1500", "égal à 0, comme un fluide naturel"], exp: "Sa double liaison casse en quelques jours dans l'air." },
  { q: "Dans R-134a, le chiffre des unités (4) donne…", ok: "le nombre d'atomes de fluor", nok: ["le nombre d'atomes de carbone", "le nombre d'atomes d'hydrogène"], exp: "Centaines + 1 = carbone ; dizaines − 1 = hydrogène ; unités = fluor." },
  { q: "Un fluide dont le numéro commence par 4 (R-404A, R-410A) est…", ok: "un mélange zéotrope", nok: ["un corps pur", "un fluide inorganique"], exp: "R-4xx : zéotropes ; R-5xx : azéotropes ; R-7xx : inorganiques." },
  { q: "R-717 : le 17 vient de…", ok: "la masse molaire de l'ammoniac, 17 g/mol", nok: ["l'année de sa découverte", "son PRP"], exp: "R-7xx = 7 + masse molaire. R-744 pour le CO₂ (44 g/mol)." },
  { q: "Avant la première charge, l'ordre est…", ok: "assembler, azote sec, contrôler, tirer au vide, tenue du vide, charger pesé", nok: ["assembler, charger, tirer au vide, contrôler", "tirer au vide, assembler, azote, charger"], exp: "L'ordre est verrouillé. Pression, durée et charge : documentation constructeur." },
  { q: "L'épreuve de pression d'un circuit se fait…", ok: "à l'azote sec, avec un mano-détendeur", nok: ["à l'air comprimé", "à l'oxygène"], exp: "Oxygène sur circuit huilé = explosion. Air comprimé = humidité + oxygène." },
  { q: "Le vacuomètre se lit…", ok: "circuit isolé, pompe arrêtée", nok: ["pompe en marche", "sur le manomètre du manifold"], exp: "Le manomètre du manifold ne suffit pas pour lire le vide." },
  { q: "Après l'isolement, le vide remonte. À soupçonner d'abord :", ok: "une fuite", nok: ["une surcharge en fluide", "un détendeur bloqué"], exp: "Une remontée signale d'abord une fuite ; elle peut aussi venir d'une humidité résiduelle." },
  { q: "Avant d'arrêter la pompe à vide, on…", ok: "ferme la vanne côté circuit", nok: ["ouvre la bouteille de fluide", "débranche le vacuomètre"], exp: "Sinon l'huile de la pompe peut être aspirée vers le circuit." },
  { q: "À la déconnexion du manifold, ce qui commande l'ordre des gestes, c'est…", ok: "la pression, jamais la montre", nok: ["la température ambiante", "le niveau d'huile"], exp: "Fermer, laisser stabiliser, desserrer lentement." },
  { q: "Un raccord encore sous pression…", ok: "ne se desserre jamais d'un coup", nok: ["se desserre vite pour gagner du temps", "se purge à l'air libre"], exp: "Par petites touches ; le fluide du flexible se récupère par l'appareil." },
  { q: "Une bouteille de récupération…", ok: "ne se remplit jamais à ras et ne se chauffe jamais", nok: ["se remplit à ras pour gagner un trajet", "se chauffe à l'eau tiède pour aller plus vite"], exp: "Le liquide se dilate ; sans volume libre, la pression grimpe très vite." },
  { q: "Combien de pesées pour connaître la charge introduite ?", ok: "deux : avant et après", nok: ["une seule, à la fin", "aucune, le manomètre suffit"], exp: "La différence = la charge. La balance dit combien ; le manomètre dit comment la machine se comporte." },
  { q: "Braser un tube où il reste du fluide…", ok: "produit des gaz toxiques et corrosifs", nok: ["est sans danger si on ventile", "améliore la brasure"], exp: "Récupérer tout le fluide, balayer à l'azote pendant, ventiler." },
  { q: "Chercher une fuite avec une flamme, c'est…", ok: "une méthode ancienne, aujourd'hui interdite", nok: ["la méthode la plus précise", "autorisé sur les fluides A1"], exp: "On utilise un détecteur électronique : contrôler, balayer, confirmer." },
  { q: "Dans un local CO₂, une personne est au sol. Vous…", ok: "ne descendez pas, vous alertez", nok: ["descendez vite la tirer dehors", "entrez sans mesurer, la porte ouverte"], exp: "Le CO₂ s'accumule en point bas, invisible : mesurer avant d'entrer, jamais une seconde victime." },
  { q: "Le détecteur de fuite se contrôle…", ok: "avant usage, sur le gaz recherché", nok: ["une fois par an", "jamais, il est électronique"], exp: "Appareil + gaz recherché, test avant usage, puis balayage lent, puis confirmation." },
  { q: "Un fluide par bouteille, c'est pour…", ok: "l'identification et la traçabilité", nok: ["gagner de la place", "économiser la balance"], exp: "Récupération : circuit fermé, bouteille pesée, un fluide par bouteille." },
  { q: "La consignation électrique commence par…", ok: "séparer", nok: ["vérifier au VAT", "mettre à la terre"], exp: "Séparer, condamner, identifier, vérifier au VAT, mettre à la terre si nécessaire." },
  { q: "Le VAT se teste…", ok: "avant et après, sur une source sous tension", nok: ["seulement après la mesure", "jamais, il est neuf"], exp: "Un appareil mort affiche « pas de tension » quoi qu'il arrive." },
  { q: "Sur une intervention R-290, si la zone n'est pas conforme…", ok: "décision STOP", nok: ["on intervient plus vite", "on retire le détecteur qui gêne"], exp: "Détecteur HC, zone balisée, ventilation active, zéro ignition, outillage HC." },
  { q: "Sur un chantier, avant de toucher quoi que ce soit, le premier temps est…", ok: "reconnaître : fluide, local, issues, ventilation", nok: ["sortir le manifold", "mettre les gants"], exp: "Reconnaître, identifier les risques, se protéger, préparer." }
];

JR_THEMES.chrono = [
  { id: "fluides", nom: "Fluides et gestes", emoji: "🧪", questions: QUESTIONS_FLUIDES, portes: P.fluides.concat(P.gestes) },
  { id: "electricite", nom: "Risque électrique (HoCourant)", emoji: "⚡", sources: ["../hocourant/donnees/questions.js"], portes: P.electricite },
  { id: "hauteur", nom: "Travail en hauteur (R408)", emoji: "🪜", sources: ["../r408/donnees/questions.js"], portes: P.hauteur },
  { id: "tout", nom: "Tout mélangé", emoji: "🎲", questions: QUESTIONS_FLUIDES,
    sources: ["../hocourant/donnees/questions.js", "../r408/donnees/questions.js"], portes: P.fluides.concat(P.electricite, P.hauteur) }
];
JR_THEMES.qcm = JR_THEMES.chrono;

/* l'aventure vit dans aventure.js (donnees/) */
JR_THEMES.aventure = [
  { id: "zombies", nom: "Les zombies du R-22", emoji: "🧟", portes: P.securite.concat(P.gestes) }
];

/* « Le circuit dont vous êtes le héros » : le scénario vit dans heros.js (donnees/), les scènes dans heros-scenes.js */
JR_THEMES.heros = [
  { id: "froid", nom: "La chambre froide (R-134a)", emoji: "🧊",
    portes: [{ t: "Le circuit, organe par organe (station du plan)", h: "../packs/fluides/res/circuit-organe-par-organe/" },
      { t: "La ligne liquide : chaque organe protège le suivant", h: "../f/a-ligne-liquide-protection/" },
      { t: "La croix du frigoriste : organes, états et énergie", h: "../f/a-croix-frigoriste-etats/" },
      { t: "Voyage dans tous ses états : le circuit raconté par la molécule", h: "../voyage/module.html" },
      { t: "Le diagramme enthalpique, courbe par courbe", h: "../packs/fluides/res/diagramme-enthalpique/" }] }
];

/* =====================================================================
   COMPLÉTER LE SCHÉMA — un thème par schéma (donnees/schemas.js)
   ===================================================================== */
JR_THEMES.schema = (function (S) {
  if (!S) return [];
  return S.fluides.map(f => ({ id: "fluide-" + f.id, nom: f.titre, emoji: "❄️", kind: "fluide", data: f, portes: f.portes }))
    .concat(S.cablages.map(c => ({ id: c.id, nom: c.titre, emoji: "⚡", kind: "cablage", data: c, portes: S.portesCablage })));
})(window.JR_SCHEMAS);

/* =====================================================================
   QUI SUIS-JE ? et LE PENDU — mêmes banques de mots
   ===================================================================== */
const P_MOTS_OUTILS = [{ t: "CuivRézo — les gestes de base", h: "../cuivrezo/" }, { t: "HabFluide — Récupérer, peser, tracer", h: "../f/recuperation/" }, { t: "HabFluide — Contrôles avant mise en service", h: "../f/mise-en-service/" }];
JR_THEMES.quisuisje = [
  { id: "froid", nom: "Les organes du froid", emoji: "❄️", mots: MOTS_FROID, portes: P.fluides.slice(-1).concat(P.symbolesFroid) },
  { id: "outils", nom: "Les outils", emoji: "🧰", mots: MOTS_OUTILS, portes: P_MOTS_OUTILS },
  { id: "electricite", nom: "Les appareils électriques (ÉlectroRézo)", emoji: "⚡", mots: MOTS_ELEC, portes: P.symbolesElec },
  { id: "tout", nom: "Tout mélangé", emoji: "🎲", mots: MOTS_FROID.concat(MOTS_OUTILS, MOTS_ELEC), portes: P.symbolesFroid.concat(P_MOTS_OUTILS, P.symbolesElec) }
];
JR_THEMES.pendu = JR_THEMES.quisuisje;

/* =====================================================================
   LE DÉPANNEUR — les situations de donnees/depanneur.js, par installation
   ===================================================================== */
JR_THEMES.depanneur = (function (DP) {
  if (!DP) return [];
  const portes = [
    { t: "Fiche T6 — Le raisonnement de diagnostic (1re MFER)", h: "../f/etancheite-3/" },
    { t: "Deux écarts, deux points de mesure (HabFluide)", h: "../f/a-mesures-surchauffe-sous-refroidissement/" },
    { t: "La lecture croisée : manomètre, table, thermomètre", h: "../f/a-lecture-table/" },
    { t: "L'écart qui annonce l'encrassement (condenseur)", h: "../f/a-condenseur-ecart-encrassement/" },
    { t: "RézoTools — Diagnostic et dépannage", h: "../rezotools/calculettes/diagnostic.html" }
  ];
  return [
    { id: "positif", nom: "Chambre froide positive (R-134a)", emoji: "🧊", cas: DP.cas.filter(c => c.inst === "positif"), portes: portes },
    { id: "negatif", nom: "Chambre froide négative (R-404A)", emoji: "❄️", cas: DP.cas.filter(c => c.inst === "negatif"), portes: portes },
    { id: "tout", nom: "Les deux chambres", emoji: "🎲", cas: DP.cas, portes: portes }
  ];
})(window.JR_DEPANNEUR);
