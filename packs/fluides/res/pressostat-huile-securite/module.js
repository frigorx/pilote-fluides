window.OIL_MODULE = {
  id: "pressostat-huile-securite",
  title: "Le pressostat d’huile : temporisation et sécurité",
  subtitle: "LE CIRCUIT D’HUILE · STATION 15",
  codes: ["1.05", "6.03", "6.05", "9.07"],
  voix: true,
  nextStep: "Terminer par le diagnostic du circuit d’huile : replacer le pressostat d’huile dans le circuit complet et choisir le prochain contrôle.",
  nextUrl: "../diagnostic-circuit-huile/index.html",
  nextLabel: "Station 16 · Diagnostic : lire l’architecture et le retour",
  summaryVisual: { kind: "pressostatDessin", type: "huile-chrono", options: { mode: "marche", issue: "arret", seuil: 0.65, contact: 0.2, delai: 60 }, label: "La pression nette d’huile reste sous le seuil pendant toute la temporisation : le compresseur s’arrête" },
  lessons: [
    {
      id: "demarrage",
      narration: "Quand le compresseur démarre, la pompe à huile commence juste à tourner. La pression de graissage n'est pas encore là. Si le pressostat coupait tout de suite, la machine ne démarrerait jamais. La temporisation laisse à la pompe le temps de monter en pression. Si la pression est montée avant la fin du délai, le compresseur continue. Sinon, il s'arrête.",
      short: "Démarrer",
      kicker: "Station 1 · Au démarrage",
      title: "Au démarrage, la temporisation laisse la pompe monter en pression",
      lead: "Quand le compresseur démarre, la pompe à huile commence juste à tourner. La pression nette est encore sous le seuil.",
      details: [
        "La temporisation démarre en même temps que le compresseur.",
        "Si la pression nette dépasse le seuil plus le différentiel de contact avant la fin du délai, la temporisation s’arrête et le compresseur continue.",
        "Si la pression n’est pas montée à la fin du délai, le compresseur s’arrête."
      ],
      box: { type: "key", text: "La temporisation couvre le démarrage. Passé le délai, le compresseur ne tourne pas sans pression d’huile." },
      visual: { kind: "pressostatDessin", type: "huile-chrono", options: { mode: "demarrage", issue: "double", seuil: 0.65, contact: 0.2, delai: 60 }, title: "Deux démarrages comparés", label: "Deux courbes de pression nette au démarrage : l’une dépasse le seuil avant la fin du délai, l’autre non", caption: "Vert : la pression monte à temps, le compresseur continue. Orange : elle ne monte pas, il s’arrête." }
    },
    {
      id: "fonctionnement",
      narration: "En marche, la règle est la même. Si la pression nette passe sous le seuil, la temporisation redémarre. Si la pression remonte avant la fin du délai, la marche continue. Si elle reste trop basse, le compresseur s'arrête et le signal de défaut s'allume. Ne pontez jamais ce contact et n'allongez pas le délai. La machine repartirait, mais elle tournerait sans graissage.",
      short: "Surveiller",
      kicker: "Station 2 · En marche",
      title: "En marche : une chute brève passe, une chute qui dure arrête le compresseur",
      lead: "En marche, si la pression nette passe sous le seuil, la temporisation redémarre.",
      details: [
        "Si la pression remonte avant la fin du délai, la temporisation s’arrête et la marche continue.",
        "Si elle reste trop basse jusqu’à la fin du délai, le contact L–M s’ouvre : le compresseur s’arrête et la borne S alimente le signal de défaut."
      ],
      box: { type: "warning", text: "Ne pontez jamais ce contact et n’allongez pas le délai : le compresseur tournerait sans graissage." },
      visual: { kind: "pressostatDessin", type: "huile-chrono", options: { mode: "marche", issue: "double", seuil: 0.65, contact: 0.2, delai: 60 }, title: "Deux chutes de pression comparées", label: "Deux courbes de pression nette en marche : une chute brève qui se rétablit, une chute qui dure", caption: "Vert : la pression remonte avant la fin du délai. Orange : elle reste basse, le compresseur s’arrête." }
    },
    {
      id: "electrique",
      narration: "Le pressostat d'huile a deux circuits séparés. Le circuit de sécurité commande la temporisation. Le circuit de marche alimente la commande du compresseur. Quand la sécurité a coupé, une troisième borne alimente un voyant ou une alarme. Sur les appareils Danfoss pris en exemple, le réarmement est manuel : on appuie sur le bouton, environ deux minutes après l'arrêt, une fois la cause trouvée. Avant d'ouvrir le coffret, consignez.",
      short: "Sécurité",
      kicker: "Station 3 · Électricité",
      title: "Le pressostat d’huile coupe la commande du compresseur",
      lead: "Le pressostat d’huile a deux circuits séparés. Le circuit de sécurité (contact T1–T2) commande la temporisation. Le circuit de marche (bornes L et M) alimente la commande du compresseur.",
      details: [
        "La borne S alimente un voyant ou une alarme quand la sécurité a coupé.",
        "Sur les MP54 et MP55 de Danfoss, le réarmement est manuel : on appuie sur le bouton de réarmement, environ 2 minutes après l’arrêt, une fois la cause trouvée.",
        "Les bornes et la tension changent d’un modèle à l’autre : suivez le schéma de l’appareil posé."
      ],
      box: { type: "warning", text: "Consignez avant d’ouvrir le coffret. Ne posez jamais de pont électrique, même pour un essai." },
      visual: { kind: "pressostatDessin", type: "huile-bornes", options: { etat: "defaut" }, title: "Les deux circuits du pressostat d’huile", label: "Schéma du pressostat d’huile : contact T1–T2 et temporisation, contact L–M vers la commande du compresseur, borne S vers le voyant", caption: "Défaut d’huile à la fin du délai : le contact L–M est ouvert, la borne S alimente le voyant." }
    },
    {
      id: "mesurer",
      narration: "Pour diagnostiquer, relevez les deux pressions au même moment : la sortie de la pompe et le carter. Calculez la différence. Comparez-la au seuil de la notice du compresseur. Si elle est trop basse, contrôlez le niveau d'huile, son état, la crépine, la pompe et les prises de pression. Le pressostat lui-même se met en cause en dernier.",
      short: "Mesurer",
      kicker: "Station 4 · Diagnostic",
      title: "Pour diagnostiquer, relevez les deux pressions au même moment",
      lead: "Relevez P1 et P2 pendant le même régime de marche, puis calculez la pression nette : P1 − P2.",
      details: [
        "Comparez la pression nette au seuil donné par la notice du compresseur.",
        "Si elle est trop basse, contrôlez le niveau d’huile, sa température, son état (mousse, dilution par le fluide), la crépine, la pompe et son entraînement, les prises de pression.",
        "Le pressostat lui-même se met en cause en dernier, quand le graissage et le circuit électrique ont été vérifiés."
      ],
      box: { type: "exam", text: "Notez P1, P2, la pression nette, la durée d’observation et le régime de marche." },
      visual: { kind: "pressostatDessin", type: "huile-circuit", options: { manometres: true, controles: true }, title: "Où mesurer, quoi contrôler", label: "Compresseur à pompe à huile avec deux manomètres et les points à contrôler : niveau, crépine, pompe, prises de pression", caption: "Deux manomètres donnent P1 et P2. Les repères montrent les points à contrôler." }
    },
    {
      id: "conclure",
      narration: "Le compresseur repart après un réarmement. La panne est peut-être encore là. Un défaut d'huile peut disparaître quelques minutes, puis revenir quand l'huile chauffe, quand elle mousse, ou quand le régime change. Notez le moment du déclenchement, les deux pressions, la durée et les contrôles faits. Terminez par la cause probable et le prochain contrôle. Ne baissez pas le seuil pour que la machine tienne.",
      short: "Conclure",
      kicker: "Station 5 · Après le réarmement",
      title: "Le compresseur repart après réarmement : la panne est peut-être encore là",
      lead: "Un défaut d’huile peut disparaître quelques minutes, puis revenir quand l’huile chauffe, mousse ou quand le régime change.",
      details: [
        "Décrivez le déclenchement : le moment, les deux pressions, la durée, les contrôles faits.",
        "Terminez par la cause probable et le prochain contrôle à faire.",
        "Ne baissez pas le seuil pour que la machine tienne."
      ],
      box: { type: "key", text: "Dans l’ordre : observer, relever P1 et P2, calculer, comparer à la notice, nommer la cause probable, prévoir le contrôle suivant." },
      visual: { kind: "pressostatDessin", type: "huile-appareil", options: { accent: "rearmement" }, title: "Le bouton de réarmement", label: "Pressostat d’huile ouvert, bouton de réarmement mis en avant", caption: "Le bouton de réarmement remet le contact en service, 2 minutes environ après l’arrêt, cause trouvée." }
    }
  ],
  quiz: [
    { prompt: "Qu’arrive-t-il si le différentiel devient suffisant avant la fin du délai ?", options: ["La temporisation cesse, la marche continue", "Le compresseur s’arrête en fin de délai", "Le réservoir se vide vers l’aspiration"], correct: 0, why: "Le retour à une pression nette suffisante annule la séquence de défaut.", code: "6.03" },
    { prompt: "Une chute persistante en fonctionnement doit conduire à quoi ?", options: ["Un réarmement manuel immédiat", "L’arrêt de sécurité prévu au câblage", "Une hausse du seuil de déclenchement"], correct: 1, why: "La sécurité doit interrompre la marche avant une lubrification dangereuse prolongée.", code: "6.03 · 6.05" },
    { prompt: "Que faire après un déclenchement ?", options: ["Rechercher la cause avant de réarmer", "Réarmer et observer si cela revient", "Ponter le contact le temps du dépannage"], correct: 0, why: "Un réarmement ne répare ni la pompe, ni l’huile, ni les prises de pression.", code: "6.05 · 9.07" },
    { prompt: "D’où vient le seuil de déclenchement à retenir ?", options: ["D’une valeur unique, la même partout", "Du type d’huile utilisée au remplissage", "De la notice du compresseur et du bloc"], correct: 2, why: "Seuil, hystérésis et délai dépendent du matériel installé.", code: "1.05 · 6.03" },
    { prompt: "Quel relevé permet une conclusion professionnelle ?", options: ["Une seule pression, sans noter l’heure", "P1, P2, Δp, durée et régime relevés", "Le modèle du boîtier et son année"], correct: 1, why: "Le diagnostic croise mesures simultanées, temps, état mécanique et notice.", code: "6.05 · 9.07" }
  ],
  sources: [
    { title: "Danfoss — MP54 / MP55 / MP55A, fiche technique", url: "https://assets.danfoss.com/documents/latest/561042/AI545031222570en-000101.pdf", use: "rôle, deux prises OIL/LP, seuil, différentiel de contact, temporisation, test et réarmement" },
    { title: "Danfoss — MP54 / MP55 / MP55A, guide d’installation", url: "https://assets.danfoss.com/documents/latest/459777/AN211986434504en-000403.pdf", use: "raccordements p1/p2, montage et schéma de câblage" },
    { title: "Danfoss — gamme MP", url: "https://designcenter.danfoss.com/products/climate-solutions-for-cooling/switches/differential-pressure-switches/mp54---mp55---mp55a?tab=products", use: "fonction de sécurité et variantes de la gamme" },
    { title: "Légifrance — attestation d’aptitude fluides", url: "https://www.legifrance.gouv.fr/jorf/id/JORFSCTA000053004646", use: "ancrage des questions de préparation aux compétences" }
  ]
};
