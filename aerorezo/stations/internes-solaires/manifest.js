/* C4 — Occupants, équipements et soleil
   Ligne C · Climatisation & apports
   CP8 · Calculs d’apports thermiques · CP9 · Étude d’une installation de climatisation

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 sur le moule de la station pilote — voir CONTRAT-CONTENU.md.
   Aucune valeur donnée ici n'est universelle : la station enseigne la méthode et des
   ordres de grandeur, et dit à chaque fois où se cherche la valeur du projet. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "C",
  id: "internes-solaires",
  title: "Occupants, équipements et soleil",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Identifiez les sources internes et solaires.",
  bac: "Classez les apports par famille sans double comptage.",
  bts: "Utilisez les scénarios d’occupation, protections et données climatiques du projet.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Trois personnes dans un local, une entrée d’air en façade, une extraction au plafond. Rien de tout cela n’apparaît sur un plan de gaines, et pourtant tout cela chauffe. Les occupants dégagent de la chaleur, l’éclairage aussi, les machines également, et le soleil entre directement par les vitrages. Ces apports-là ne se lisent nulle part : ils dépendent de ce qu’on fait dans le local, de l’heure et de la saison. C’est le moment du bilan où deux techniciens sérieux, avec le même plan sous les yeux, arrivent à deux résultats différents.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Quatre familles d’apports naissent dans le local ou entrent par ses vitrages. On les traite séparément, pour ne rien compter deux fois.\n\nLes occupants d’abord. Une personne apporte toujours du sensible et du latent en même temps : de la chaleur qui monte la température, et de la vapeur d’eau. Assise à un travail de bureau, elle dégage un peu plus de 100 W au total, à peu près pour moitié en chaleur et pour moitié en vapeur. En effort, l’ensemble monte fortement et la part de vapeur prend le dessus. Ces valeurs se prennent dans les données du projet : elles dépendent de l’activité et de la température du local.\n\nL’éclairage ensuite : toute la puissance électrique installée finit en chaleur dans la pièce. Un éclairage à diodes en apporte plusieurs fois moins que les anciens tubes pour la même lumière. Les équipements suivent la même règle, avec une nuance : la puissance écrite sur la plaque est un maximum, rarement ce qui est réellement dissipé. On applique un taux d’usage, et on l’écrit.\n\nLe soleil enfin. À travers un vitrage, il entre directement dans la pièce, sans avoir besoin d’un écart de température. C’est là que la protection joue, et sa position décide de tout. Un store posé dehors arrête le rayonnement avant la vitre : ce qu’il absorbe est repris par l’air extérieur. Un rideau posé à l’intérieur reçoit un rayonnement déjà entré — il chauffe, et il rayonne dans la pièce. L’énergie est déjà là. À produit comparable, la protection extérieure retire une grande part de l’apport solaire, la protection intérieure une part bien plus faible.\n\nDernier point, celui qui départage : le maximum de chaque famille ne tombe pas à la même heure. Le soleil du matin frappe l’est, celui de l’après-midi l’ouest ; l’occupation a ses horaires ; l’éclairage s’allume quand le jour manque. Additionner tous les maximums donne une puissance qui n’arrive jamais. On calcule à des heures choisies, et on écrit lesquelles.",

  method: "Écrivez les hypothèses : horaire, occupation, éclairage, équipements, orientation et protection solaire.",
  formula: "Apports du local = transmission + solaire + internes + air neuf  ·  internes = occupants + éclairage + équipements  ·  chaque terme à l’heure retenue",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Répondez à la question posée sous la scène, puis reprenez-la sur un cas concret : un bureau plein sud, vitré, vingt personnes, occupé de 8 h à 18 h. Écrivez à part les six hypothèses à poser avant le moindre calcul — heure retenue, effectif présent, activité, puissance d’éclairage, taux d’usage des équipements, protection solaire. Demandez-vous enfin, pour chaque ligne, d’où sortirait la valeur : d’un document du projet, d’un relevé sur place, ou d’une supposition.",
  lecture: "Une réponse juste ne suffit pas ici : ce qui compte est la trace écrite. Un bilan d’apports internes et solaires ne se relit pas sans ses hypothèses — un autre technicien doit pouvoir retrouver le même résultat à partir de ce que vous avez noté. Si une ligne de votre liste n’a pas de source, c’est une supposition : elle se signale et elle se fait valider, elle ne se cache pas dans un total.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Aucune des valeurs citées ici n’est universelle. L’apport par personne dépend de l’activité et de la température du local ; l’efficacité d’une protection solaire dépend du produit, de son orientation et de sa mise en œuvre ; les données climatiques dépendent du lieu et des textes applicables au projet. Cette station donne la méthode et des ordres de grandeur, pas des valeurs à recopier dans une note de calcul. Un bilan heure par heure se conduit avec un logiciel, à partir de ces mêmes hypothèses — et il ne vaut pas mieux qu’elles.",

  activity: {"kind":"choice","prompt":"Quel geste évite un faux calcul ?","answer":"Écrire les hypothèses","choices":["Tout additionner deux fois","Écrire les hypothèses","Ignorer les horaires"]},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "Un local, trois personnes, une entrée d’air en façade et une extraction au plafond. Rien de tout cela n’apparaît sur un plan de gaines, et pourtant tout cela chauffe. Les occupants dégagent de la chaleur, l’éclairage aussi, les machines également, et le soleil entre directement par les vitrages. Ces apports-là ne se lisent nulle part. Ils dépendent de ce qu’on fait dans le local, de l’heure de la journée, et de la saison. C’est le moment du bilan où deux techniciens sérieux, avec le même plan sous les yeux, arrivent à deux résultats différents. Voyons d’où vient l’écart.",

    comprendre: "Quatre familles, qu’on traite séparément pour ne rien compter deux fois. Les occupants d’abord. Une personne apporte toujours deux choses en même temps : de la chaleur, et de la vapeur d’eau. Assise à un travail de bureau, elle dégage un peu plus de cent watts, à peu près moitié-moitié. En effort, l’ensemble monte fortement, et c’est la part de vapeur qui prend le dessus. L’éclairage ensuite : toute la puissance électrique installée finit en chaleur dans la pièce. Les équipements suivent, avec une nuance — la puissance écrite sur la plaque est un maximum, rarement ce qui est vraiment dissipé. Le soleil enfin, et là, il faut être précis. Un store posé dehors arrête le rayonnement avant la vitre : ce qu’il absorbe est emporté par l’air extérieur. Un rideau posé à l’intérieur reçoit un rayonnement qui est déjà entré. Il chauffe, il rayonne dans la pièce, et l’énergie, elle, est bel et bien là. Même tissu, même couleur : ce n’est pas du tout le même effet.",

    manipuler: "Une question vous attend sous le dessin, puis un petit exercice qui vaut mieux qu’un long discours. Imaginez un bureau plein sud, vitré, vingt personnes, occupé de huit heures à dix-huit heures. Avant le moindre calcul, il faut poser six hypothèses : l’heure retenue, l’effectif présent, l’activité, la puissance d’éclairage, l’usage réel des équipements, et la protection solaire. Écrivez-les noir sur blanc. Puis, pour chaque ligne, posez-vous une seule question : d’où sortirait la valeur ? D’un document du projet, d’un relevé sur place, ou d’une supposition ? Les suppositions ne sont pas interdites. Ce qui est interdit, c’est de ne pas les signaler.",

    verifier: "Deux questions pour finir, sans note. Et une idée à emporter, qui vaut pour toute une carrière : sur cette partie du bilan, un résultat sans ses hypothèses ne vaut rien. Personne ne peut le vérifier, pas même celui qui l’a écrit, six mois plus tard. Le second point à retenir concerne le soleil. Une protection solaire ne se choisit pas sur son aspect : c’est sa position par rapport au vitrage qui décide. Posée dehors, elle travaille vraiment. Posée dedans, elle ne fait plus qu’atténuer une chaleur déjà entrée dans la pièce."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Une personne au travail apporte au local…","du sensible et du latent",["du sensible et du latent","du sensible uniquement","du latent uniquement"]],
    ["Un store extérieur agit surtout sur…","l’apport solaire par les vitrages",["les apports des équipements","l’apport solaire par les vitrages","les apports par transmission"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Établir la part des apports qui ne se lit sur aucun plan : occupation, éclairage, équipements et soleil.",
    acquis: {
      cap: ["Nomme les sources de chaleur présentes dans un local occupé", "Constate qu’une personne dégage de la chaleur et de la vapeur d’eau", "Repère les vitrages exposés au soleil"],
      bac: ["Classe un apport dans sa famille sans le compter deux fois", "Explique pourquoi un store extérieur agit plus qu’un rideau intérieur", "Applique un taux d’usage à la puissance de plaque d’un équipement"],
      bts: ["Choisit et écrit l’horaire de calcul retenu", "Justifie le refus d’additionner tous les maximums", "Signale les valeurs supposées et indique ce qui reste à faire valider"]
    },
    sources: ["inerWeb Aéraulique v5 — bilans thermiques et traitement d’air"],
    correspondances: [
      {reseau: "AéroRézo", station: "Parois et écarts de température", pourquoi: "l’autre moitié du bilan, celle qui traverse l’enveloppe du bâtiment"},
      {reseau: "AéroRézo", station: "Apport latent", pourquoi: "la vapeur dégagée par les occupants s’y chiffre en puissance"}
    ]
  }
});
