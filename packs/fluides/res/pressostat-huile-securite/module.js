window.OIL_MODULE = {
  id: "pressostat-huile-securite",
  title: "Le pressostat d’huile : temporisation et sécurité",
  subtitle: "LE CIRCUIT D’HUILE · STATION 15",
  codes: ["1.05", "6.03", "6.05", "9.07"],
  voix: true,
  nextStep: "Terminer par le diagnostic du circuit d’huile : replacer la sécurité de lubrification dans la chaîne complète et justifier le prochain contrôle.",
  nextUrl: "../diagnostic-circuit-huile/index.html",
  nextLabel: "Station 16 · Diagnostic : lire l’architecture et le retour",
  summaryVisual: { kind: "oilPressureDiagnostic", label: "Synthèse du pressostat différentiel d’huile : mesurer deux pressions, respecter le délai, diagnostiquer puis décider" },
  lessons: [
    {
      id: "demarrage",
      narration: "Au démarrage, un compresseur à pompe à huile se trouve dans une situation particulière : la pression de lubrification n'est pas encore établie, puisque la pompe commence tout juste à tourner. Si la sécurité coupait immédiatement, la machine ne démarrerait jamais. C'est pourquoi le défaut apparent est provisoirement toléré, pendant un délai appelé temporisation. Mais soyez clair sur ce que permet ce délai : il autorise un démarrage normal, il n'autorise jamais une lubrification insuffisante durable. Passé ce temps, la pression doit être là.",
      short: "Démarrer",
      kicker: "Station 1 · Temporisation",
      title: "Au démarrage, le défaut apparent est provisoirement toléré",
      lead: "La pompe doit commencer à tourner avant que la pression nette puisse s’établir.",
      details: [
        "La temporisation autorise cette phase de montée en pression.",
        "Si le différentiel devient suffisant avant la fin du délai prévu, la temporisation s’arrête et le compresseur continue."
      ],
      box: { type: "key", text: "La temporisation permet le démarrage normal ; elle n’autorise jamais une lubrification insuffisante durable." },
      visual: { kind: "oilPressureTimer", title: "Suivre le démarrage", label: "Démarrage, délai puis maintien ou arrêt selon le différentiel d’huile" }
    },
    {
      id: "fonctionnement",
      narration: "En fonctionnement, le principe est le même. Une chute brève de la pression nette relance la temporisation : si tout se rétablit, la machine continue. Une chute persistante, elle, doit arrêter le compresseur — c'est la protection qui joue son rôle. Et voici l'interdit de cette station : shunter le contact ou allonger le délai sans prescription supprime la protection du compresseur. Cela fait redémarrer la machine, ce qui ressemble à une réparation pendant quelques heures. En réalité, vous laissez tourner sans lubrification garantie une machine qui vient de vous signaler un problème.",
      short: "Surveiller",
      kicker: "Station 2 · En marche",
      title: "Une chute brève peut se rétablir ; une chute persistante doit arrêter",
      lead: "En fonctionnement, une pression nette qui passe sous le seuil relance la temporisation.",
      details: [
        "Si la pression remonte suffisamment avant la fin du délai, la marche normale reprend.",
        "Si elle reste trop faible, le contact de sécurité coupe la commande et signale le défaut selon le câblage."
      ],
      box: { type: "warning", text: "Shunter le contact ou allonger le délai sans prescription supprime la protection du compresseur." },
      visual: { kind: "oilPressureTimer", title: "Comparer rétablissement et défaut persistant", label: "Deux issues après une chute de pression nette d’huile" }
    },
    {
      id: "electrique",
      narration: "Le contact du pressostat agit sur la chaîne de sécurité : il participe à ce qui autorise le contacteur ou l'automate à faire tourner le compresseur. Ce n'est donc pas un simple voyant, c'est un maillon de commande. Deux règles pour intervenir dessus. La première : on consigne avant toute ouverture du coffret — coupure, condamnation, vérification d'absence de tension. La seconde : on n'improvise jamais un pont électrique, même pour un essai, même cinq minutes. Un pont oublié reste en place, et personne ne le retrouve avant la casse.",
      short: "Sécurité",
      kicker: "Station 3 · Électricité",
      title: "Le contact agit sur la chaîne de sécurité",
      lead: "Le pressostat participe à la chaîne qui autorise le contacteur ou l’automate du compresseur.",
      details: [
        "Bornes, tension, voyant, test, délai et réarmement manuel ou automatique varient : suivre le schéma du composant installé.",
        "Après un déclenchement, rechercher la cause avant de réarmer. Un test fonctionnel se réalise selon la procédure constructeur."
      ],
      box: { type: "warning", text: "Consigner avant toute ouverture du coffret et ne jamais improviser un pont électrique." },
      visual: { kind: "oilPressureSafety", title: "Lire la chaîne électrique", label: "Symbole de pressostat inséré dans la commande de sécurité du compresseur" }
    },
    {
      id: "mesurer",
      narration: "Le diagnostic exige deux pressions prises au même instant, et c'est ce qui le rend rigoureux. Relevez la pression côté sortie de pompe et celle du carter pendant le même régime de fonctionnement, puis calculez leur différence — c'est elle, la pression nette, qui compte. Suivez ensuite son évolution dans le temps, car un défaut peut n'apparaître qu'à chaud. Écrivez les deux pressions, la différence, la durée d'observation, le régime, et la date du prochain contrôle. Jamais une valeur isolée : elle ne prouverait rien et ne se comparerait à rien.",
      short: "Mesurer",
      kicker: "Station 4 · Diagnostic",
      title: "Le diagnostic exige deux pressions prises au même instant",
      lead: "Relever P1 et P2 pendant le même régime, puis calculer leur différence et suivre son évolution dans le temps.",
      details: [
        "Comparer à la notice ; contrôler niveau, température, dilution ou mousse, crépine, pompe, entraînement et prises de pression.",
        "Un contact défectueux est une hypothèse seulement après vérification de la lubrification réelle et du circuit électrique."
      ],
      box: { type: "exam", text: "Écrire P1, P2, Δp, durée, régime et prochain contrôle : jamais une valeur isolée." },
      visual: { kind: "oilPressureDiagnostic", title: "Construire la chaîne de preuve", label: "Niveau, deux pressions, pompe, état d’huile puis décision" }
    },
    {
      id: "conclure",
      narration: "Terminons par la conclusion, et par une mise en garde qui vaut pour beaucoup de sécurités. Un réarmement réussi ne prouve pas que la lubrification est réparée. Le défaut peut disparaître quelques instants, puis revenir quand l'huile chauffe, quand elle mousse au redémarrage, ou quand le régime change. La démarche complète est toujours la même : observation, relevé des deux pressions, calcul de la différence, comparaison à la notice, cause probable, puis contrôle suivant planifié. Une sécurité qui s'est déclenchée mérite qu'on cherche pourquoi, même si la machine repart.",
      short: "Conclure",
      kicker: "Station 5 · Habilitation",
      title: "Un réarmement réussi ne prouve pas que la lubrification est réparée",
      lead: "Le défaut peut disparaître quelques instants puis revenir lorsque l’huile chauffe, mousse ou change de régime.",
      details: [
        "Décrire le déclenchement, les pressions, la durée et les contrôles effectués.",
        "Conclure par une hypothèse vérifiable et l’action sûre suivante, sans modifier le seuil pour faire tenir la marche."
      ],
      box: { type: "key", text: "Observation → P1 et P2 → calcul → comparaison notice → cause probable → contrôle suivant." },
      visual: { kind: "oilPressureDiagnostic", title: "Rendre une conclusion vérifiable", label: "Méthode de diagnostic du pressostat différentiel d’huile" }
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
