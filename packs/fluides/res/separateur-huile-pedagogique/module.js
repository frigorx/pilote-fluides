window.OIL_MODULE = {
  id: "separateur-huile-pedagogique",
  title: "Le séparateur d’huile",
  subtitle: "LE CIRCUIT D’HUILE · STATION 7",
  codes: ["1.05", "6.05", "9.07"],
  voix: true,
  nextStep: "Poursuivre avec le réservoir d’huile : l’huile séparée doit être stockée et rendue disponible sans envoyer la pression de refoulement vers les carters.",
  nextUrl: "../separateur-eclatement-pedagogique/index.html",
  nextLabel: "Station 8 · Le séparateur à éclatement",
  summaryVisual: { kind: "separator", label: "Séparateur d’huile sur le refoulement avec sortie gaz vers condenseur et retour d’huile" },
  lessons: [
    {
      id: "rappel",
      narration: "Reprenons ce qui reste vrai en toutes circonstances : une petite part de l'huile quitte toujours le compresseur avec le gaz de refoulement. Le séparateur intervient sur cette part-là. Mais il ne remplace pas le retour naturel : dans les échangeurs et les tuyauteries, l'huile devra toujours revenir par ses propres moyens. Le séparateur réduit la quantité qui poursuit sa circulation, voilà tout. Il ne corrige ni une mauvaise pente, ni une vitesse insuffisante. Et retenez cette limite, elle vaut pour tous les modèles : séparer davantage ne signifie jamais récupérer la totalité de l'huile.", short: "Rappel", kicker: "Station 1 · Retour spiralé", recall: true,
      title: "Le séparateur complète un circuit déjà bien tracé",
      lead: "Une petite part de l’huile quitte toujours le compresseur avec le gaz de refoulement.",
      details: ["Le retour naturel reste nécessaire dans les échangeurs et les tuyauteries.", "Le séparateur réduit l’huile qui poursuit sa circulation ; il ne corrige ni une mauvaise pente ni une vitesse insuffisante."],
      box: { type: "key", text: "Séparer davantage ne signifie jamais récupérer 100 % de l’huile." },
      visual: { kind: "route", title: "Replacer l’organe dans la boucle", label: "Circuit frigorifique avec huile quittant puis retrouvant le compresseur" }
    },
    {
      id: "position",
      narration: "Sa place est sur le refoulement, après le compresseur et avant le condenseur — donc au point le plus chaud du circuit. Trois chemins le traversent, et il faut savoir les nommer. L'entrée reçoit le mélange gaz et huile. La sortie principale, en haut, conduit le gaz vers le condenseur. Et la sortie basse collecte l'huile, pour un retour direct ou pour alimenter une réserve. Prenez l'habitude de montrer ces trois chemins quand vous décrivez l'appareil : c'est ce troisième trajet qui le distingue de tous les autres organes du circuit.", short: "Position", kicker: "Station 2 · Implantation",
      title: "Il reçoit d’abord le gaz chaud chargé d’huile",
      lead: "Le séparateur se place sur le refoulement, après le compresseur et avant le condenseur.",
      details: ["L’entrée reçoit le mélange gaz-huile. La sortie principale conduit le gaz vers le condenseur.", "La sortie basse collecte l’huile pour un retour direct ou pour l’alimentation d’un réservoir."],
      box: { type: "exam", text: "À l’oral : montrer les trois chemins — entrée du mélange, sortie gaz, sortie huile." },
      visual: { kind: "separator", title: "Lire les trois raccordements", label: "Symbole validé du séparateur avec mélange entrant, gaz sortant et retour d’huile", caption: "Symbole exact de la bibliothèque technique inerWeb." }
    },
    {
      id: "technologies",
      narration: "La séparation combine plusieurs effets selon le modèle. Le gaz peut ralentir, changer brutalement de direction, ou traverser un élément de coalescence. Dans tous les cas, le résultat recherché est le même : les gouttelettes perdent leur vitesse, se rassemblent, ou sont écartées du flux gazeux. L'efficacité obtenue varie avec le débit, la taille des gouttelettes, la viscosité de l'huile et la technologie interne. C'est pourquoi on ne promet jamais un rendement universel : un séparateur se sélectionne sur toute sa plage de fonctionnement, pas sur une valeur affichée au catalogue.", short: "Séparer", kicker: "Station 3 · Technologies",
      title: "La séparation peut combiner plusieurs effets",
      lead: "Selon le modèle, le gaz ralentit, change de direction ou traverse un élément de coalescence.",
      details: ["Les gouttelettes perdent leur vitesse, se rassemblent ou sont écartées du flux gazeux.", "L’efficacité varie avec le débit, la taille des gouttelettes, la viscosité et la technologie interne."],
      box: { type: "warning", text: "Ne jamais promettre un rendement universel : sélectionner le modèle sur toute la plage de fonctionnement." },
      visual: { kind: "separatorMethods", title: "Comparer les principes", label: "Trois principes possibles : impact sur chicanes, effet centrifuge et coalescence" }
    },
    {
      id: "flotteur",
      narration: "Sur un séparateur à flotteur, le retour de l'huile est commandé par le niveau. L'huile s'accumule dans la partie basse ; quand le niveau monte, le flotteur déplace un levier qui ouvre le pointeau de retour. Quand le niveau redescend, le pointeau se referme — et cette fermeture est essentielle : elle évite qu'un passage continu laisse échapper le gaz de refoulement vers le carter. Conséquence pratique pour vous : le retour est intermittent par conception. Si vous observez la conduite de retour, observez une séquence complète, pas un instant isolé. Un retour qui ne coule pas à cet instant n'est pas un retour en panne.", short: "Flotteur", kicker: "Station 4 · Retour interne",
      title: "Le niveau d’huile commande un pointeau",
      lead: "Sur un séparateur à flotteur, l’huile s’accumule dans la partie basse.",
      details: ["Quand le niveau monte, le flotteur déplace le levier et ouvre le pointeau de retour.", "Quand le niveau redescend, le pointeau se referme afin d’éviter un passage continu du gaz de refoulement."],
      box: { type: "key", text: "Le retour est généralement intermittent : observer une séquence, pas un instant isolé." },
      visual: { kind: "floatReturn", title: "Suivre flotteur, levier et pointeau", label: "Coupe pédagogique d’un séparateur à flotteur commandant un pointeau de retour" }
    },
    {
      id: "retours",
      narration: "Où repart l'huile récupérée ? Cela dépend de l'architecture. Sur une installation simple, elle rejoint directement le carter du compresseur concerné. Sur une centrale, un séparateur commun alimente plutôt un réservoir, qui distribue ensuite l'huile aux différents régulateurs. Les clapets, filtres, vannes et régulateurs présents dépendent alors du choix d'architecture, basse ou haute pression. Une règle de montage à retenir : on ne raccorde jamais un retour d'huile comme une simple conduite. La pression et le débit dans cette ligne doivent être maîtrisés, sous peine d'envoyer du gaz chaud dans un carter.", short: "Retour", kicker: "Station 5 · Architectures",
      title: "L’huile repart directement ou rejoint une réserve",
      lead: "Sur une installation simple, le retour peut rejoindre le carter du compresseur concerné.",
      details: ["Sur une centrale, un séparateur commun alimente plutôt un réservoir qui distribue l’huile aux différents régulateurs.", "Les clapets, filtres, vannes et régulateurs dépendent alors de l’architecture basse ou haute pression."],
      box: { type: "warning", text: "Ne jamais raccorder un retour comme s’il s’agissait d’une simple conduite : pression et débit doivent être maîtrisés." },
      visual: { kind: "active", title: "Choisir la destination de l’huile", label: "Séparateur alimentant un réservoir puis des régulateurs de niveau" }
    },
    {
      id: "selection",
      narration: "Le choix du séparateur se fait sur toute la plage de débit, et c'est là que beaucoup d'installations se trompent. Une centrale peut fonctionner avec un seul compresseur actif, ou avec tous. À faible débit, certains principes de séparation deviennent inefficaces ; à débit élevé, ce sont la perte de charge et la capacité qui deviennent critiques. Un appareil correct au milieu de la plage peut donc décevoir aux deux extrémités. Vérifiez dans la notice : le fluide, l'huile, la pression admissible, le débit minimal et maximal, l'orientation et les raccordements. Et retenez ce raccourci trompeur : la taille de la tuyauterie ne suffit pas à sélectionner un séparateur.", short: "Choisir", kicker: "Station 6 · Dimensionnement",
      title: "Le séparateur se choisit pour toute la plage de débit",
      lead: "Une centrale peut fonctionner avec un seul compresseur ou avec plusieurs compresseurs actifs.",
      details: ["À faible débit, certains principes séparent moins bien ; à débit élevé, les pertes de charge et la capacité deviennent critiques.", "Vérifier fluide, huile, pression admissible, débit minimal et maximal, orientation et raccordements dans la notice."],
      box: { type: "exam", text: "La taille de la tuyauterie ne suffit pas à sélectionner le séparateur." },
      visual: { kind: "drivers", title: "Croiser les paramètres", label: "Débit, couple huile-fluide et technologie du séparateur" }
    },
    {
      id: "controle",
      narration: "Comment contrôler qu'un séparateur fait son travail ? En recoupant plusieurs indices cohérents, jamais avec un seul. Un séparateur efficace stabilise les niveaux sans créer de passage de gaz dans la ligne d'huile. Observez donc le niveau du carter et celui du réservoir, la température de la conduite de retour, le bruit, la fréquence des cycles de retour, et les traces éventuelles de fuite. Puis comparez tout cela aux compresseurs actifs et à l'historique de l'installation. Une seule température ne prouve rien. Vérifier, ici comme ailleurs, veut dire mesurer et recouper — toucher un tube du dos de la main ne suffit pas.", short: "Contrôler", kicker: "Station 7 · Fonctionnement",
      title: "Le contrôle repose sur plusieurs indices cohérents",
      lead: "Un séparateur efficace contribue à stabiliser les niveaux sans créer un passage de gaz dans la ligne d’huile.",
      details: ["Observer niveaux de carter et de réservoir, température de la conduite de retour, bruit, cycles de retour et traces de fuite.", "Comparer ces observations aux compresseurs actifs et à l’historique : une seule température ne prouve rien."],
      box: { type: "exam", text: "Vérifier signifie mesurer et recouper ; toucher un tube ne suffit pas." },
      visual: { kind: "observe", title: "Construire une chaîne de preuve", label: "Voyant de niveau, régime des compresseurs et contrôle du tracé de retour" }
    },
    {
      id: "diagnostic",
      narration: "Terminons par le diagnostic, et par une mise en garde. Un niveau bas ne condamne pas le séparateur. Le défaut peut se situer avant lui, dans lui, ou après lui. La démarche remonte donc la matière de l'amont vers l'aval : vérifiez d'abord le retour naturel, puis l'accumulation dans le séparateur, puis l'ouverture du retour, puis le réservoir, puis la distribution. Et n'oubliez pas les causes qui ne concernent pas du tout l'organe : une fuite d'huile, une charge initiale incorrecte, un filtre colmaté, un régulateur non alimenté. Suivez le chemin de la matière avant de remplacer une pièce.", short: "Diagnostiquer", kicker: "Station 8 · Décision",
      title: "Un niveau bas ne condamne pas immédiatement le séparateur",
      lead: "Le défaut peut se situer avant, dans ou après l’organe.",
      details: ["Vérifier d’abord le retour naturel, puis l’accumulation dans le séparateur, l’ouverture du retour, le réservoir et la distribution.", "Rechercher également fuite d’huile, mauvaise charge initiale, filtre colmaté ou régulateur non alimenté."],
      box: { type: "key", text: "Suivre la matière de l’amont vers l’aval avant de remplacer une pièce." },
      visual: { kind: "diagnostic", title: "Ne pas sauter de maillon", label: "Chaîne de diagnostic du voyant jusqu’au régulateur en passant par séparateur et réservoir" }
    }
  ],
  quiz: [
    { prompt: "Où se place le séparateur d’huile ?", options: ["Sur le refoulement, avant le condenseur", "Sur la ligne liquide, après le condenseur", "Sur l’aspiration, avant le compresseur"], correct: 0, why: "Il reçoit en premier le gaz chaud chargé d’huile quittant le compresseur.", code: "1.05 · 9.07" },
    { prompt: "Quelles sont ses trois voies fonctionnelles ?", options: ["Liquide entrant, vapeur sortante, purge d’air", "Mélange entrant, gaz sortant, huile retournée", "Gaz entrant, condensats sortants, drain d’eau"], correct: 1, why: "Le gaz poursuit vers le condenseur tandis que l’huile est collectée séparément.", code: "1.05" },
    { prompt: "De quoi dépend l’efficacité de séparation d’un séparateur d’huile ?", options: ["Elle dépend du modèle et du régime de marche", "Elle atteint la totalité de l’huile entraînée", "Elle ne dépend que du diamètre des tubes"], correct: 0, why: "Une part d’huile continue de circuler : le retour naturel reste nécessaire.", code: "6.05 · 9.07" },
    { prompt: "Que commande le flotteur interne ?", options: ["Le ventilateur du condenseur à air", "Le détendeur thermostatique du poste", "Le pointeau de retour d’huile au carter"], correct: 2, why: "La montée du niveau actionne le mécanisme de retour.", code: "1.05" },
    { prompt: "Pourquoi le pointeau doit-il se refermer ?", options: ["Pour ne pas laisser passer le gaz chaud", "Pour garder l’huile chaude dans la cuve", "Pour arrêter le ventilateur du condenseur"], correct: 0, why: "Le retour doit laisser passer l’huile sans créer un bipasse permanent de gaz chaud.", code: "1.05" },
    { prompt: "Que vérifier pour sélectionner un séparateur ?", options: ["Diamètre extérieur et longueur du corps", "Fluide, huile, pressions et plage de débit", "Marque du compresseur et année de pose"], correct: 1, why: "La sélection dépend de l’application complète et de la notice.", code: "1.05" },
    { prompt: "Comment vérifier son fonctionnement ?", options: ["Toucher le tube de retour une seule fois", "Ajouter de l’huile et observer le voyant", "Croiser niveaux, retour, températures, régimes"], correct: 2, why: "Plusieurs indices suivis dans le temps sont nécessaires.", code: "9.07" },
    { prompt: "Le niveau du carter reste bas. Quelle méthode est correcte ?", options: ["Remplacer le séparateur avant tout contrôle", "Suivre le chemin : retour, séparateur, réserve", "Supprimer la conduite de retour d’huile"], correct: 1, why: "Le diagnostic suit le chemin de l’huile sans sauter d’étape.", code: "6.05 · 9.07" }
  ],
  sources: [
    { title: "BITZER — Parallel compounding with optimized suction header", url: "https://www.bitzer.de/shared_media/html/kt-600/en-GB/313843723313845515.html", use: "séparateurs communs, retours et applications en centrales" },
    { title: "BITZER — Parallel compounding with oil level controllers", url: "https://www.bitzer.de/shared_media/html/kt-600/en-GB/313846411313848587.html", use: "chaîne séparateur, réservoir et contrôleurs" },
    { title: "Parker Sporlan — Oil Level Control System", url: "https://www.parker.com/content/dam/Parker-com/Literature/Sporlan/Sporlan-pdf-files/Sporlan-pdf-110/SD-129_-Oil-Level-Control-System-Installation.pdf", use: "architecture et vérifications d’un système de gestion d’huile" },
    { title: "Légifrance — Attestation d’aptitude fluides", url: "https://www.legifrance.gouv.fr/jorf/id/JORFSCTA000053004646", use: "compétences 1.05, 6.05 et 9.07" }
  ]
};
