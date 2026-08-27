/* V2 — VMC simple flux
   Ligne V · VMC
   CP4 · Réaliser l’étude d’une installation de VMC

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 sur le moule de la station pilote — voir CONTRAT-CONTENU.md.
   ⚠️ Aucun débit réglementaire n'est figé ici : les valeurs dépendent du texte applicable
   au projet et de sa version. La station apprend à les chercher, pas à les réciter. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "V",
  id: "simple-flux",
  title: "VMC simple flux",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Suis l’air neuf depuis la fenêtre jusqu’à la bouche d’extraction.",
  bac: "Explique le balayage du logement et le rôle du passage sous les portes.",
  bts: "Établis le schéma fonctionnel, répartis les débits et vérifie la compensation des transferts d’air.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Un seul ventilateur tourne dans toute l’installation, et il est du côté de l’extraction. Il aspire l’air du logement et le rejette en toiture. Le logement se retrouve alors en légère dépression : il lui manque de l’air. Cet air manquant entre tout seul, par les entrées posées en haut des fenêtres du séjour et des chambres. Il traverse ensuite le logement, et ressort par les bouches de la cuisine, de la salle d’eau et des WC.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Simple flux veut dire : un seul ventilateur, placé à l’extraction. C’est lui qui commande tout le reste. En aspirant, il abaisse la pression à l’intérieur du logement. L’air extérieur, resté à la pression normale, pousse alors naturellement par les entrées d’air. Aucun moteur ne le souffle : c’est la différence de pression qui le fait entrer.\n\nCe trajet porte un nom : le balayage. L’air neuf arrive dans les pièces où l’on vit — séjour, chambres. Il en ressort par les pièces où l’on salit l’air — cuisine, salle d’eau, WC. Le sens ne s’invente pas : on va toujours du plus propre vers le plus pollué, jamais l’inverse. C’est pour cela qu’on ne met jamais d’entrée d’air dans une cuisine.\n\nEntre les deux, il faut un passage. C’est le rôle du détalonnage : un espace laissé sous chaque porte, de l’ordre d’un à deux centimètres selon la pièce. Sans lui, la porte fermée bloque le balayage, la bouche d’extraction n’aspire plus grand-chose, et l’humidité reste dans la salle de bains. Une moquette épaisse ou un seuil rapporté suffisent à annuler l’installation entière.\n\nLes bouches d’extraction ne sont pas toutes identiques. Une bouche autoréglable garde à peu près le même débit quand la pression change : c’est le débit prévu, tout le temps. Une bouche hygroréglable, elle, s’ouvre davantage quand l’air est humide et se referme quand il redevient sec. La première est simple et prévisible ; la seconde suit l’occupation réelle et évite de chauffer de l’air pour rien.\n\nLes débits à respecter ne s’inventent pas et ne se retiennent pas par cœur : ils dépendent du nombre de pièces principales, de l’usage, et du texte réglementaire applicable au projet — dans sa version en vigueur. On les cherche à chaque affaire.",

  method: "Repère d’abord les pièces de vie et les pièces de service, puis trace le trajet de l’air entre les deux — le matériel ne se choisit qu’après.",
  formula: "Entrée d’air → pièce de vie → passage sous la porte → pièce de service → extraction → rejet",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Suis la boucle affichée et nomme chacun des quatre flux à voix haute : l’air neuf, l’air qui traverse, l’air extrait, l’air rejeté. Place ensuite mentalement les entrées d’air et les bouches dans un logement de trois pièces : séjour, chambre, cuisine, salle d’eau, WC. Vérifie enfin qu’aucune bouche d’extraction ne se trouve dans une pièce de vie, et qu’aucune entrée d’air ne se trouve dans une pièce de service.",
  lecture: "Si tu as placé une entrée d’air dans la cuisine, le balayage s’inverse : l’air chargé d’odeurs repart vers les chambres. Si tu as oublié le passage sous les portes, chaque pièce fermée devient une impasse — la bouche tire, mais rien ne vient. Dans les deux cas, le matériel est bon et l’installation ne fonctionne pas.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Le schéma présenté est celui d’un logement. Un bâtiment tertiaire ne se traite pas ainsi : les débits, le découpage des locaux et les contraintes de sécurité incendie y changent la logique. Par ailleurs, une VMC simple flux extrait sans récupérer : l’air rejeté emporte la chaleur du logement. C’est le point que la double flux vient corriger.",

  activity: {"kind":"flow","variant":"simple"},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "Regardons ce qui se passe dans un logement équipé d’une simple flux. Il n’y a qu’un seul ventilateur dans toute l’installation, et il se trouve du côté de l’extraction, souvent dans les combles. Il aspire, en permanence, et rejette l’air en toiture. Comme il retire de l’air sans en remettre, le logement se retrouve en légère dépression. Et c’est là tout le principe : l’air extérieur, lui, est resté à la pression normale. Il pousse donc pour entrer, tout seul, par les entrées placées en haut des fenêtres. Personne ne le souffle. C’est la différence de pression qui travaille.",

    comprendre: "Ce trajet de l’air porte un nom : le balayage. L’air neuf arrive dans les pièces où l’on vit, le séjour et les chambres. Il traverse le logement, puis ressort par les pièces où l’air se salit : la cuisine, la salle d’eau, les toilettes. Ce sens n’est jamais laissé au hasard. On va toujours du plus propre vers le plus pollué. C’est pour cette raison qu’on ne place jamais d’entrée d’air dans une cuisine : l’air chargé d’odeurs repartirait vers les chambres. Entre les deux, il faut un passage, et c’est le détail qu’on oublie le plus souvent. On laisse un espace sous chaque porte, de l’ordre d’un à deux centimètres. Sans lui, une porte fermée coupe le balayage : la bouche aspire dans le vide, et l’humidité reste dans la salle de bains. Une moquette épaisse suffit à annuler toute l’installation. Dernier point, les bouches. Une bouche autoréglable garde le même débit quoi qu’il arrive. Une bouche hygroréglable s’ouvre quand l’air est humide et se referme quand il redevient sec : elle suit l’occupation réelle du logement.",

    manipuler: "Suivez la boucle affichée et nommez les quatre flux, un par un : l’air neuf qui entre, l’air qui traverse le logement, l’air extrait dans les pièces de service, l’air rejeté en toiture. Placez ensuite, dans votre tête, un logement de trois pièces : un séjour, une chambre, une cuisine, une salle d’eau, des toilettes. Où mettez-vous les entrées d’air ? Où mettez-vous les bouches ? Une seule règle suffit à trancher : jamais de bouche d’extraction dans une pièce de vie, jamais d’entrée d’air dans une pièce de service. Si vous inversez, l’installation soufflera les odeurs de cuisine vers les chambres.",

    verifier: "Deux questions pour voir si le trajet est clair. Elles ne comptent dans aucune note. Souvenez-vous de l’essentiel avant de répondre : l’air entre par les pièces de vie, il ressort par les pièces de service, et il passe sous les portes entre les deux. Si l’une de ces trois étapes manque, la ventilation ne fonctionne pas, même avec du matériel neuf et correctement posé."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Dans un logement, où place-t-on les bouches d’extraction ?","dans la cuisine, les WC et la salle d’eau",["dans la cuisine, les WC et la salle d’eau","dans les chambres et dans le séjour","dans les combles, au plus près du caisson"]],
    ["Dans une VMC simple flux, l’air neuf entre…","par les entrées d’air des pièces de vie",["par un second ventilateur de soufflage","par les entrées d’air des pièces de vie","par le caisson d’extraction lui-même"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Vérifier qu’un logement est correctement balayé : entrées d’air, passages sous les portes, bouches d’extraction au bon endroit.",
    acquis: {
      cap: ["Repère une entrée d’air et une bouche d’extraction sur une installation", "Nomme les pièces de vie et les pièces de service d’un logement", "Suit le trajet de l’air d’une entrée jusqu’au rejet"],
      bac: ["Explique pourquoi l’air entre sans être soufflé", "Justifie le sens du balayage, du plus propre vers le plus pollué", "Contrôle le détalonnage des portes et dit ce qu’il se passe s’il manque"],
      bts: ["Répartit les débits d’extraction entre les pièces de service", "Distingue bouche autoréglable et bouche hygroréglable selon l’usage", "Recherche les débits applicables dans le texte réglementaire en vigueur"]
    },
    sources: [
      "VC_100198 — VMC, la maison respire (Bac MFER, collègues partagés)",
      "Doc VMC — rôle et composants d’une VMC (Bac MFER, collègues partagés)"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "L’air se déplace", pourquoi: "le moteur du balayage est la différence de pression vue en station A1"},
      {reseau: "AéroRézo", station: "VMC double flux", pourquoi: "la simple flux rejette la chaleur ; la double flux la récupère"}
    ]
  }
});
