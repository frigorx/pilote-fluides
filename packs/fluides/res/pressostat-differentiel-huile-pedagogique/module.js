window.OIL_MODULE = {
  id: "pressostat-differentiel-huile-pedagogique",
  title: "Le pressostat d’huile : la pression nette",
  subtitle: "LE CIRCUIT D’HUILE · STATION 14",
  codes: ["1.05", "6.03", "6.05", "9.07"],
  voix: true,
  nextStep: "Poursuivre avec la station suivante : la temporisation au démarrage, la surveillance en marche, la coupure et le diagnostic.",
  nextUrl: "../pressostat-huile-securite/index.html",
  nextLabel: "Station 15 · Le pressostat d’huile : temporisation et sécurité",
  summaryVisual: { kind: "pressostatDessin", type: "huile-circuit", options: { manometres: true }, label: "Le pressostat d’huile raccordé à la sortie de la pompe et au carter du compresseur" },
  lessons: [
    {
      id: "distinguer",
      narration: "Trois organes s'occupent de l'huile, et on les confond souvent. Le régulateur de niveau maintient le niveau dans le carter. Le clapet différentiel maintient la pression du réservoir d'huile. Le pressostat d'huile, celui de cette station, surveille la pression de graissage. Si elle manque, il arrête le compresseur. Un niveau d'huile correct ne prouve pas que la pompe graisse les paliers.",
      short: "Distinguer",
      kicker: "Station 1 · Trois organes",
      recall: true,
      title: "Régulateur de niveau, clapet différentiel, pressostat d’huile : trois rôles",
      lead: "Le régulateur de niveau maintient le niveau d’huile dans le carter. Le clapet différentiel maintient la pression du réservoir d’huile. Le pressostat d’huile arrête le compresseur si la pression de graissage manque.",
      details: [
        "Le pressostat d’huile ne remet pas d’huile dans le carter et ne règle aucun niveau.",
        "Il mesure la pression que la pompe à huile ajoute à celle du carter. Si cette pression manque trop longtemps, il coupe le compresseur."
      ],
      box: { type: "key", text: "Un niveau d’huile correct ne prouve pas que la pompe graisse les paliers." },
      visual: { kind: "pressostatDessin", type: "huile-circuit", options: {}, title: "Où se place le pressostat d’huile", label: "Compresseur à pompe à huile, avec son pressostat d’huile raccordé à la sortie de la pompe et au carter", caption: "Le pressostat d’huile est raccordé à la sortie de la pompe à huile et au carter du compresseur." }
    },
    {
      id: "application",
      narration: "Ce pressostat protège un compresseur graissé par une pompe. La pompe à huile est entraînée par le compresseur. Elle aspire l'huile du carter et l'envoie sous pression vers les paliers. C'est cette pression que le pressostat surveille. Beaucoup de compresseurs n'ont pas de pompe : ils se graissent par barbotage, et ils n'ont pas de pressostat d'huile. Avant d'appliquer cette station à une machine, vérifiez qu'elle a une pompe à huile.",
      short: "Pompe",
      kicker: "Station 2 · La pompe à huile",
      title: "Il protège un compresseur graissé par une pompe",
      lead: "La pompe à huile est entraînée par le compresseur. Elle aspire l’huile du carter et l’envoie sous pression vers les paliers.",
      details: [
        "À l’arrêt, la pompe ne tourne pas : elle ne fournit aucune pression.",
        "Beaucoup de compresseurs se graissent par barbotage, sans pompe. Ils n’ont pas de pressostat d’huile."
      ],
      box: { type: "warning", text: "Avant d’appliquer cette station à une machine, vérifiez qu’elle a une pompe à huile." },
      visual: { kind: "pressostatDessin", type: "huile-graissage", options: {}, title: "Le trajet de l’huile dans le compresseur", label: "Coupe d’un compresseur : carter, crépine, pompe à huile, paliers, retour de l’huile au carter", caption: "La pompe aspire l’huile du carter, la pousse vers les paliers, puis l’huile retombe dans le carter." }
    },
    {
      id: "prises",
      narration: "Le pressostat d'huile a deux prises de pression. La prise marquée O I L reçoit la pression à la sortie de la pompe : on l'appelle P un. La prise marquée L P reçoit la pression du carter : on l'appelle P deux. La pression de graissage est la différence entre les deux. Dans cet exercice, les valeurs sont inventées : P un vaut cinq virgule cinq bar, P deux vaut deux bar. La pression nette vaut trois virgule cinq bar. Lisez les deux pressions dans la même unité, avec le même manomètre.",
      short: "P1 − P2",
      kicker: "Station 3 · Les deux prises",
      title: "Deux prises de pression, une seule mesure",
      lead: "La prise OIL reçoit la pression à la sortie de la pompe : P1. La prise LP reçoit la pression du carter : P2.",
      details: [
        "La pression de graissage est la différence entre les deux : pression nette = P1 − P2.",
        "Dans cet exercice, les valeurs sont inventées : P1 vaut 5,5 bar et P2 vaut 2,0 bar. La pression nette vaut 5,5 − 2,0 = 3,5 bar.",
        "Une P1 élevée ne suffit pas. Si P2 est élevée aussi, la pression nette reste faible.",
        "Lisez les deux pressions dans la même unité, avec le même manomètre."
      ],
      box: { type: "exam", text: "Nommez les deux prises avant de poser la soustraction." },
      visual: { kind: "pressostatDessin", type: "huile-circuit", options: { manometres: true, p1: 5.5, p2: 2.0 }, title: "Mesurer P1 et P2", label: "Deux manomètres : P1 à la sortie de la pompe à huile, P2 sur le carter, et leur différence", caption: "P1 se mesure à la sortie de la pompe, P2 sur le carter. La pression nette est leur différence." }
    },
    {
      id: "seuils",
      narration: "Trois réglages portent des noms voisins. Le seuil est la pression nette en dessous de laquelle la temporisation démarre. Le différentiel de contact est le supplément de pression qu'il faut pour arrêter la temporisation. La temporisation est un délai, en secondes. Si la pression nette n'est pas revenue à la fin du délai, le compresseur s'arrête.",
      short: "Seuils",
      kicker: "Station 4 · Trois valeurs",
      title: "Le seuil, le différentiel de contact et la temporisation",
      lead: "Le seuil est la pression nette en dessous de laquelle la temporisation démarre.",
      details: [
        "La temporisation s’arrête quand la pression nette dépasse le seuil plus le différentiel de contact.",
        "Sur les MP54 et MP55 de Danfoss, le différentiel de contact vaut 0,2 bar au plus.",
        "La temporisation est un délai : 45, 60, 90 ou 120 secondes selon le modèle. Si la pression nette n’est pas revenue à la fin du délai, le compresseur s’arrête."
      ],
      box: { type: "key", text: "Le seuil et le différentiel de contact se lisent en bar. La temporisation se lit en secondes." },
      visual: { kind: "pressostatDessin", type: "huile-chrono", options: { mode: "demarrage", issue: "reussi", seuil: 0.65, contact: 0.2, delai: 60 }, title: "La pression nette au démarrage", label: "Courbe de la pression nette d’huile au démarrage, avec le seuil, le différentiel de contact et la temporisation", caption: "La pression nette dépasse 0,85 bar avant 60 secondes : la temporisation s’arrête." }
    },
    {
      id: "mecanisme",
      narration: "Un soufflet reçoit P un, l'autre reçoit P deux. Ils poussent l'un contre l'autre sur la même tige. La tige se déplace selon la différence des deux pressions. Quand la pression nette passe sous le seuil, elle ferme un contact et la temporisation démarre : une résistance chauffe un bilame. Si le défaut dure, le bilame ouvre le contact de marche et le compresseur s'arrête. Touchez les trois boutons et regardez ce que fait chaque contact.",
      short: "Mécanisme",
      kicker: "Station 5 · Le mécanisme",
      title: "Deux soufflets opposés commandent un contact",
      lead: "Un soufflet reçoit P1, l’autre reçoit P2. Ils poussent l’un contre l’autre sur la même tige.",
      details: [
        "La tige se déplace selon la différence des deux pressions, quelle que soit leur valeur.",
        "Quand la pression nette passe sous le seuil, la tige ferme le contact T1–T2 : la temporisation démarre.",
        "La temporisation est une résistance qui chauffe un bilame. À la fin du délai, le bilame ouvre le contact L–M et le compresseur s’arrête."
      ],
      box: { type: "exam", text: "Touchez Démarrage, Pression suffisante ou Défaut persistant, et regardez ce que fait chaque contact." },
      visual: { kind: "oilPressureClaudeSlot", title: "Les trois états du mécanisme", label: "Mécanisme du pressostat différentiel d’huile : trois états à explorer", caption: "Touchez Démarrage, Pression suffisante ou Défaut persistant." }
    },
    {
      id: "reglage",
      narration: "Il reste à régler, puis à contrôler. Prenons un pressostat Danfoss. Sur un M P cinquante-cinq, le seuil se règle avec le disque de réglage, dans le boîtier, entre zéro virgule trois et quatre virgule cinq bar. Sur un M P cinquante-quatre, il est fixe et il est frappé sur la face avant. La valeur à régler vient de la notice du compresseur. Pour contrôler, compresseur en marche, maintenez le bouton d'essai enfoncé : le compresseur doit s'arrêter à la fin de la temporisation. Pour réarmer, attendez environ deux minutes, cherchez la cause, puis appuyez sur le bouton de réarmement.",
      short: "Régler",
      kicker: "Station 6 · Réglage",
      title: "Régler le seuil, puis contrôler la coupure",
      lead: "Sur un MP55 de Danfoss, le seuil se règle avec le disque de réglage, dans le boîtier, entre 0,3 et 4,5 bar. Sur un MP54, il est fixe : 0,65 ou 0,9 bar, frappé sur la face avant.",
      details: [
        "Dans cet exercice, la notice du compresseur demande 0,65 bar. Tournez le disque jusqu’à lire 0,65. La temporisation s’arrêtera au plus tard à 0,65 + 0,2 = 0,85 bar.",
        "Pour contrôler, compresseur en marche, maintenez le bouton d’essai enfoncé. Le compresseur doit s’arrêter à la fin de la temporisation.",
        "Pour réarmer, appuyez sur le bouton de réarmement, environ 2 minutes après l’arrêt, une fois la cause trouvée."
      ],
      box: { type: "warning", text: "Cherchez le seuil dans la notice du compresseur. La fiche du pressostat donne seulement la plage possible." },
      visual: { kind: "pressostatDessin", type: "huile-appareil", options: { reperes: true }, title: "Le disque de réglage et les deux boutons", label: "Pressostat d’huile ouvert : disque de réglage, bouton de réarmement, bouton d’essai, prises OIL et LP", caption: "1 : disque de réglage. 2 : bouton de réarmement. 3 : bouton d’essai. 4 : prise OIL. 5 : prise LP." }
    }
  ],
  quiz: [
    { prompt: "Quelle est la mission du pressostat différentiel d’huile ?", options: ["Arrêter le compresseur si la pression manque", "Maintenir le niveau d’huile du réservoir", "Séparer l’huile du gaz de refoulement"], correct: 0, why: "Il protège le compresseur à pompe en surveillant la pression nette de lubrification.", code: "6.03" },
    { prompt: "En quoi diffère-t-il d’un régulateur de niveau d’huile ?", options: ["Il règle le niveau d’huile du carter, plus finement", "Il surveille une pression, pas un niveau", "Il remet de l’huile dans le carter quand elle manque"], correct: 1, why: "Le régulateur gère un niveau ; le pressostat différentiel surveille la pression nette et protège la lubrification.", sansEnregistrement: true, code: "1.05 · 6.03" },
    { prompt: "Où se raccorde normalement P1 côté OIL ?", options: ["À la bouteille liquide du circuit", "Sur l’aspiration, avant le carter", "À la sortie de la pompe à huile"], correct: 2, why: "P1 reçoit la pression fournie par la pompe à huile.", code: "1.05" },
    { prompt: "Comment obtenir la pression nette d’huile ?", options: ["P1 moins P2", "P1 plus P2", "P2 divisée par P1"], correct: 0, why: "Le contrôle compare la sortie de pompe à la pression du carter ou de l’aspiration.", code: "6.03" },
    { prompt: "Pourquoi une temporisation existe-t-elle au démarrage ?", options: ["Pour éviter les à-coups sur le moteur", "Pour laisser chauffer l’huile du carter", "Pour laisser la pompe monter en pression"], correct: 2, why: "À l’arrêt, la pompe entraînée ne produit pas encore de pression nette.", code: "6.03" },
    { prompt: "Sur un MP55, d’où vient la valeur de seuil à afficher sur le disque ?", options: ["D’une valeur retenue par cœur, la même partout", "De la notice du compresseur", "Du manomètre BP de l’installation"], correct: 1, why: "La fiche du pressostat donne la plage possible (0,3 à 4,5 bar) ; la valeur à régler est celle que demande le constructeur du compresseur.", code: "6.03", sansEnregistrement: true },
    { prompt: "Seuil réglé à 0,9 bar, différentiel de contact de 0,2 bar au plus : au plus tard, quelle pression nette arrête la temporisation ?", options: ["0,7 bar", "0,9 bar", "1,1 bar"], correct: 2, why: "Comme dans l’exemple : seuil + différentiel de contact = 0,9 + 0,2 = 1,1 bar au plus.", code: "6.03", sansEnregistrement: true }
  ],
  sources: [
    { title: "Danfoss — MP54 / MP55 / MP55A, fiche technique (AI545031222570, éd. 2025.12)", url: "https://assets.danfoss.com/documents/latest/561042/AI545031222570en-000101.pdf", use: "rôle, deux prises OIL/LP, seuil, différentiel de contact, temporisation, test et réarmement" },
    { title: "Danfoss — MP54 / MP55 / MP55A, guide d’installation", url: "https://assets.danfoss.com/documents/latest/459777/AN211986434504en-000403.pdf", use: "raccordements p1/p2, montage et schéma de câblage" },
    { title: "Danfoss — gamme MP", url: "https://designcenter.danfoss.com/products/climate-solutions-for-cooling/switches/differential-pressure-switches/mp54---mp55---mp55a?tab=products", use: "fonction de sécurité et variantes de la gamme" },
    { title: "Légifrance — attestation d’aptitude fluides", url: "https://www.legifrance.gouv.fr/jorf/id/JORFSCTA000053004646", use: "ancrage des questions de préparation aux compétences" }
  ]
};
