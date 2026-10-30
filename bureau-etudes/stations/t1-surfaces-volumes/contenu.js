/* Station BE-T1 : Surfaces et volumes du projet. Pilote du réseau Bureau d'études.
   Méthode sur un local d'exemple (un bureau, qui n'est pas une pièce de la maison), puis commande sur la maison.
   Les bornes des fourchettes sont écrites par outils/stations/t1-surfaces-volumes/construire.mjs (lit le métré de référence, tolérance 5 %). */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const liste = items => `<ol class="lecture">${items.map(t => `<li>${t}</li>`).join("")}</ol>`;
const PLAN = "illustrations/plan-local-exemple.svg", COUPE = "illustrations/coupe-local-exemple.svg";
const DOSSIER = "../../fil-rouge/maison/";
/* Un exercice avec l'exemple résolu sous les yeux au niveau 1, sans l'exemple au niveau 2. */
const avecExemple = (exemple, q) => { const a = BE.quiz(q); return { quiz: q, render: item => BE.exemple(exemple) + a.render(item), wire: a.wire }; };

BE.station({
  code: "BE-T1",
  titre: "Surfaces et volumes du projet",
  ligne: "Thermique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Maison de deux niveaux, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "Maison de deux niveaux, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Avant de calculer des déperditions, un bureau d’études relève ce que le bâtiment contient : les surfaces de ses parois, ses planchers, ses volumes. Vous apprenez le relevé sur un bureau d’exemple, puis vous le faites sur une maison.",
  note: "Les conventions de comptage de cette station sont des choix d’exercice, écrits pour que tous les stagiaires comptent de la même façon.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et conventions" },
    { id: "methode", label: "La méthode", note: "sur un bureau d’exemple" },
    { id: "projet", label: "Le projet", note: "commande, plans et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Relevé des surfaces et des volumes d’une maison de deux niveaux, zone H3, avant le calcul des déperditions",
      delai: "Rendu en fin de séance",
      commande: [
        "Le maître d’ouvrage fait étudier une maison de deux niveaux à Marseille. Avant tout calcul de déperditions, vous relevez les parois, les planchers et les volumes. Suivez les étapes dans l’ordre.",
        "Étape 1. Pour chaque mur de la feuille, lisez la longueur sur les plans, prenez la hauteur sous plafond sur la coupe, calculez la surface brute.",
        "Étape 2. Relevez les baies de chaque mur dans le tableau des menuiseries, puis calculez la surface nette.",
        "Étape 3. Au verso, relevez le plancher bas, le plafond sous combles et le volume de chaque pièce chauffée.",
        "Étape 4. Totalisez, calculez le ratio de contrôle, écrivez la source de chaque donnée, puis vérifiez vos résultats à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Plans de la maison (plans-maison.pdf)", ou: "Page 1 : rez-de-chaussée. Page 2 : étage. Page 3 : coupe. Page 4 : plan de masse." },
        { piece: "Tableau des menuiseries", ou: "Page 5 de plans-maison.pdf" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Relevé des surfaces et des volumes d’une maison de deux niveaux, zone H3, avant le calcul des déperditions",
      delai: "Rendu en fin de séance",
      commande: "Le maître d’ouvrage fait étudier une maison de deux niveaux à Marseille. Relevez les parois déperditives par local et par orientation, puis les planchers, les plafonds et les volumes chauffés. Rendez le tableau des parois, la surface des parois opaques déperditives, la surface des baies, le volume chauffé et le ratio de contrôle, avec la source de chaque donnée.",
      pieces: [
        { piece: "Plans de la maison (plans-maison.pdf)", ou: "Page 1 : rez-de-chaussée. Page 2 : étage. Page 3 : coupe. Page 4 : plan de masse." },
        { piece: "Tableau des menuiseries", ou: "Page 5 de plans-maison.pdf" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-murs", libelle: "Murs extérieurs nets", unite: "m²", min: 97.24, max: 107.48, indice: "Relisez les écrans sur la surface brute et la déduction des baies : longueur fois hauteur sous plafond, moins les baies, murs extérieurs seulement." },
      { id: "n1-plancher", libelle: "Plancher bas", unite: "m²", min: 48.25, max: 53.33, indice: "Le plancher bas ne concerne que les pièces chauffées du rez-de-chaussée. Relisez l’écran sur les planchers et les plafonds, et la convention de l’escalier." },
      { id: "n1-plafond", libelle: "Plafond sous combles", unite: "m²", min: 47.5, max: 52.5, indice: "Le plafond sous combles ne concerne que les pièces de l’étage. Relisez la convention de l’escalier à l’écran « Ce qu’on cherche »." },
      { id: "n1-volume", libelle: "Volume chauffé", unite: "m³", min: 239.37, max: 264.59, indice: "Volume égal surface au sol fois hauteur sous plafond, pièces chauffées seulement. Relisez l’écran sur le volume chauffé et la convention de l’escalier." }
    ],
    2: [
      { id: "n2-opaques", libelle: "Surface des parois opaques déperditives", unite: "m²", min: 203.78, max: 225.24, indice: "Relisez la définition à l’écran « Ce qu’on cherche » : quatre postes, sans les baies. Contrôlez chaque poste avant de les additionner." },
      { id: "n2-baies", libelle: "Surface des baies (extérieures et sur local non chauffé)", unite: "m²", min: 26.86, max: 29.7, indice: "Les baies se lisent dans le tableau des menuiseries, avec le mur qui les porte. Ne gardez que celles des murs relevés." },
      { id: "n2-volume", libelle: "Volume chauffé", unite: "m³", min: 239.37, max: 264.59, indice: "Volume égal surface au sol fois hauteur sous plafond, pièces chauffées seulement. Relisez la convention de l’escalier à l’écran « Ce qu’on cherche »." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-T2", titre: "Les parois et le coefficient U", href: "../t2-parois-coefficient-u/index.html" },
  correspondances: [
    { reseau: "AéroRézo", titre: "Déperditions d’une pièce", href: "../../../aerorezo/stations/deperditions-piece/index.html", pourquoi: "Cette page applique les surfaces relevées ici au calcul des déperditions d’une pièce." },
    { reseau: "inerWeb Plan", titre: "Les échelles", href: "../../../plan/gares/g06-les-echelles/index.html", pourquoi: "Cette gare rappelle comment lire une échelle et une cote sur un plan." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      image: "illustrations/2-au-bureau-d-etudes.webp", imageAlt: "Un technicien de bureau d’études à son poste : un plan de maison sur un écran, un tableau vide sur l’autre, des plans imprimés, un réglet et une calculatrice sur le bureau.",
      text: "Vous recevez la commande d’un bureau d’études : relever les surfaces des parois et les volumes d’une maison de deux niveaux, avant le calcul des déperditions. Vous rendez le tableau des parois, les surfaces de plancher et de plafond, le volume chauffé et un ratio de contrôle. Les réponses s’écrivent sur la feuille A4 recto verso. L’écran explique chaque geste, la feuille reçoit vos résultats.",
      prompt: "Lisez les trois cartes, puis continuez.",
      render: () => BE.cartes([
        { title: "Vous recevez", rows: [["La commande :", "relever les surfaces et les volumes d’une maison."], ["Les plans :", "rez-de-chaussée, étage, coupe, plan de masse, tableau des menuiseries."]] },
        { title: "Vous produisez", rows: [["Le recto :", "le tableau des parois, une ligne par mur."], ["Le verso :", "planchers, plafonds, volumes, ratio, sources."]] },
        { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station T2, le coefficient U de chaque paroi."]] }
      ])
    }),

    BE.ecran({
      id: "ce-quon-cherche", dossier: "prise", kicker: "Prise en main, 2", title: "Ce qu’on cherche et comment on compte", level: "comprendre",
      image: "illustrations/3-par-ou-la-chaleur-s-en-va.webp", imageAlt: "Une maison en écorché : la chaleur des pièces chauffées s’en va par les murs extérieurs, les fenêtres, le plafond sous les combles isolés, le plancher sur le sol et le mur du garage non chauffé.",
      text: "La surface des parois opaques déperditives est la somme des murs extérieurs nets, des murs sur local non chauffé nets, du plancher bas et du plafond sous combles. Les baies sont relevées à part : elles auront leur propre coefficient U à la station suivante. À la fin, la station vous dit si chaque résultat est dans une fourchette de plus ou moins 5 %, sans vous donner la valeur. Les conventions ci-dessous sont des choix d’exercice.",
      prompt: "Lisez les conventions. Elles servent à toute la station.",
      render: () => tableau(["Convention d’exercice", "Ce que cela veut dire"], [
        ["Cotes intérieures", "La longueur d’un mur est celle de sa face intérieure, dans la pièce."],
        ["Hauteur sous plafond", "La hauteur d’un mur est la hauteur sous plafond, jamais la hauteur d’étage."],
        ["Baies en dimensions de tableau", "Une baie se compte largeur fois hauteur, en mètres."],
        ["Parois relevées", "Murs extérieurs, murs sur local non chauffé, plancher bas, plafond sous combles."],
        ["Parois non relevées", "Plancher intermédiaire, cloisons entre pièces chauffées, portes intérieures."],
        ["Arrondi", "Chaque surface et chaque volume de pièce s’arrondit au centième. Le total est la somme des valeurs arrondies."],
        ["Escalier", "La trémie compte dans le volume, rattachée au palier. Elle est exclue de la surface au sol de l’étage. Le plafond au-dessus d’elle compte."]
      ]) + tableau(["Mot du métier", "Ce qu’il désigne"], [
        ["Trémie", "L’ouverture d’un plancher par où passe l’escalier."],
        ["Terre-plein", "Le sol sur lequel repose directement la dalle du rez-de-chaussée, sans cave ni vide sanitaire."],
        ["Combles perdus", "L’espace sous la toiture, non chauffé et non aménagé."],
        ["Dimensions de tableau", "Largeur et hauteur de l’ouverture dans le mur, relevées dans le tableau des menuiseries."]
      ]) + BE.alerte("<strong>Choix d’exercice.</strong> Ces règles ne sont pas des règles de calcul réglementaires. Elles sont écrites pour que tous les stagiaires comptent de la même façon. La norme NF EN 12831 est citée en fin de fiche, elle n’est pas reproduite ici.")
    }),

    BE.ecran({
      id: "lire-une-cote", dossier: "methode", kicker: "La méthode, 1", title: "Lire une cote", level: "comprendre",
      text: "Voici le plan d’un bureau d’exemple. Ce bureau n’est pas une pièce de la maison : il sert à apprendre le geste. Une cote est un nombre écrit entre deux petits traits obliques, en mètres. La ligne du bas donne la longueur intérieure du bureau. Le nord est en haut. Les repères MA, MB et MC sont ceux de ses murs.",
      prompt: "Repérez la cote 5,80 sous le plan, puis lisez l’exemple.",
      render: () => BE.schema(PLAN, "Plan coté du bureau d’exemple, au rez-de-chaussée, avec trois murs repérés MA, MB et MC.", "Plan du bureau d’exemple, échelle 1/40.")
        + BE.exemple({ text: "Longueur intérieure du bureau, ligne de cotes du bas", answer: "5,80 m", why: "La cote est écrite entre les deux traits obliques qui la limitent, en mètres, face intérieure à face intérieure." })
    }),

    BE.ecran({
      id: "chaine-de-cotes", dossier: "methode", kicker: "La méthode, 2", title: "La chaîne de cotes", level: "comprendre", requiresAction: true,
      text: "Une longueur n’est pas toujours écrite en une seule cote. Le plus souvent, une chaîne de cotes la découpe en morceaux, et il faut additionner. Sur le mur nord du bureau, la chaîne donne 1,60, puis 1,40, puis 2,80. Vous additionnez : 1,60 plus 1,40 plus 2,80 égale 5,80 mètres. Contrôlez toujours par la cote totale quand elle existe. On peut aussi retrancher : une cote totale moins la cote d’un autre morceau.",
      prompt: "Additionnez la chaîne du mur ouest, à gauche du plan, puis répondez.",
      aides: [
        "Regardez la chaîne de cotes à gauche du plan du bureau, côté local non chauffé. Elle porte trois nombres.",
        "Additionnez les trois cotes de la chaîne, dans les mêmes unités. Le résultat est la longueur du mur ouest.",
        "Premier pas : sur le mur nord, 1,60 plus 1,40 donne 3,00, puis 3,00 plus 2,80 donne 5,80. Faites de même avec les trois cotes de gauche."
      ],
      render: item => BE.schema(PLAN, "Plan coté du bureau d’exemple avec ses chaînes de cotes.", "Chaînes de cotes du bureau d’exemple.")
        + BE.exemple({ text: "Mur nord : 1,60 + 1,40 + 2,80", answer: "5,80 m", why: "Les trois morceaux se suivent le long du mur, la somme donne la longueur intérieure." })
        + BE.quiz({ choices: ["3,30 m", "1,90 m", "3,60 m", "2,40 m"], good: 0, explain: "0,50 plus 0,90 plus 1,90 donne 3,30 m. La cote de droite du plan, 3,30, le confirme." }).render(item),
      wire: item => BE.quiz({ choices: ["3,30 m", "1,90 m", "3,60 m", "2,40 m"], good: 0, explain: "" }).wire(item)
    }),

    BE.ecran({
      id: "quelle-hauteur", dossier: "methode", kicker: "La méthode, 3", title: "Quelle hauteur prendre", level: "comprendre",
      image: "illustrations/4-relever-sur-chantier.webp", imageAlt: "Un technicien à genoux pose un télémètre laser sur le sol fini ; le rayon monte droit jusqu’au plafond pour mesurer la hauteur sous plafond.",
      text: "Sur la coupe, deux hauteurs se lisent. La hauteur sous plafond va du sol fini au plafond fini : 2,60 mètres pour le bureau. La hauteur d’étage va du sol d’un niveau au sol du niveau suivant : 2,85 mètres, car elle ajoute l’épaisseur du plancher, 0,25. La convention de cette station est écrite : un mur se compte avec la hauteur sous plafond. La hauteur d’étage ferait gonfler toutes les surfaces d’environ 10 %.",
      prompt: "Lisez la coupe, puis repérez les deux hauteurs.",
      render: () => BE.schema(COUPE, "Coupe du bureau d’exemple : hauteur sous plafond 2,60 m, plancher 0,25 m, hauteur d’étage 2,85 m.", "Coupe du bureau d’exemple, échelle 1/40.")
        + BE.alerte("<strong>Piège.</strong> Prendre la hauteur d’étage pour la hauteur sous plafond fausse toutes les surfaces de murs et tous les volumes. La plupart des plans écrivent les deux : vérifiez laquelle vous lisez.")
    }),

    BE.ecran({
      id: "surface-brute", dossier: "methode", kicker: "La méthode, 4", title: "La surface brute d’un mur", level: "comprendre",
      text: "La surface brute d’un mur est sa longueur multipliée par sa hauteur, avant de retirer les baies. Pour le mur nord du bureau : longueur 5,80 mètres, hauteur sous plafond 2,60 mètres. La surface brute vaut 15,08 mètres carrés. Écrivez l’unité à chaque ligne de calcul.",
      prompt: "Lisez l’exemple résolu.",
      render: () => BE.exemple({ text: "Mur MA, nord : 5,80 m × 2,60 m", answer: "15,08 m²", why: "Longueur lue sur la chaîne de cotes, hauteur lue sur la coupe, produit arrondi au centième." })
    }),

    BE.ecran({
      id: "deduire-les-baies", dossier: "methode", kicker: "La méthode, 5", title: "Déduire les baies", level: "comprendre",
      text: "Une baie est une ouverture : fenêtre, porte-fenêtre, porte. On la compte en dimension de tableau, largeur multipliée par hauteur. Sur le plan, chaque baie porte un repère, ici Fa. Ses dimensions se lisent dans le tableau des menuiseries. La surface nette du mur est la surface brute moins les baies. Pour le bureau : la fenêtre Fa mesure 1,40 sur 1,15, soit 1,61 mètre carré. La surface nette du mur nord vaut 15,08 moins 1,61, soit 13,47 mètres carrés.",
      prompt: "Lisez l’exemple, puis regardez comment la maison présente son tableau des menuiseries.",
      render: () => BE.exemple({ text: "Fa : 1,40 m × 1,15 m = 1,61 m², mur MA : 15,08 m² − 1,61 m²", answer: "13,47 m² de mur net", why: "La baie se retire du mur qui la porte, et se garde dans le total des baies." })
        + BE.renvoi(`Pour la maison, le tableau des menuiseries est la page 5 du dossier : <a href="${DOSSIER}svg/tableau-menuiseries.svg">ouvrir le tableau des menuiseries</a>.`)
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice 1, mur net", title: "Exercice : la surface nette d’un mur", level: "appliquer", requiresAction: true,
      text: {
        1: "Un deuxième bureau, de même hauteur sous plafond 2,60 m, a un mur extérieur de 4,70 m de long. Il porte une fenêtre de 1,20 m sur 1,35 m. L’exemple du bureau reste sous vos yeux : refaites les mêmes gestes.",
        2: "Un deuxième bureau, de hauteur sous plafond 2,60 m, a un mur extérieur de 4,70 m de long. Il porte une fenêtre de 1,20 m sur 1,35 m. Calculez sans l’exemple."
      },
      prompt: { 1: "Choisissez la surface nette du mur, en vous aidant de l’exemple.", 2: "Choisissez la surface nette du mur. Cette question est à faire seul." },
      aides: {
        1: ["Les données sont dans l’énoncé : longueur, hauteur sous plafond, dimensions de la fenêtre.", "Surface brute égale longueur fois hauteur. Surface nette égale surface brute moins la baie.", "Premier pas : calculez la surface de la fenêtre, 1,20 fois 1,35. Calculez ensuite la surface brute du mur, puis retranchez."],
        2: ["Relisez l’énoncé : il donne les trois données dont vous avez besoin.", "Multipliez longueur et hauteur sous plafond, puis retirez la surface de la baie. Gardez l’unité à chaque ligne.", "Premier pas : la fenêtre mesure 1,20 fois 1,35. Écrivez ce produit avant tout autre calcul."]
      },
      ...BE.parNiveau({
        1: avecExemple({ text: "Bureau d’exemple, mur MA : 5,80 × 2,60 − 1,40 × 1,15", answer: "13,47 m²", why: "Même méthode : brut, baie, net." }, { choices: ["10,60 m²", "12,22 m²", "11,78 m²", "13,84 m²"], good: 0, explain: "4,70 fois 2,60 donne 12,22 m². La fenêtre fait 1,62 m². 12,22 moins 1,62 donne 10,60 m². 12,22 oublie la baie, 11,78 prend la hauteur d’étage 2,85, 13,84 ajoute la baie au lieu de la retirer." }),
        2: BE.quiz({ choices: ["10,60 m²", "12,22 m²", "11,78 m²", "13,84 m²"], good: 0, explain: "4,70 fois 2,60 donne 12,22 m². La fenêtre fait 1,62 m². 12,22 moins 1,62 donne 10,60 m². 12,22 oublie la baie, 11,78 prend la hauteur d’étage 2,85, 13,84 ajoute la baie au lieu de la retirer." })
      })
    }),

    BE.ecran({
      id: "orientation", dossier: "methode", kicker: "La méthode, 6", title: "L’orientation d’un mur", level: "comprendre",
      text: "L’orientation d’un mur est la direction vers laquelle regarde sa face extérieure. Le nord est en haut du plan, la flèche N le rappelle. Sur le bureau d’exemple, MA est orienté nord, MB est, MC ouest. Pour la maison, le plan de masse montre le nord et l’implantation.",
      prompt: "Lisez l’exemple, puis ouvrez le plan de masse de la maison.",
      render: () => tableau(["Mur du bureau", "Face extérieure vers", "Orientation à écrire"], [["MA, en haut du plan", "le haut du plan", "Nord"], ["MB, à droite du plan", "la droite du plan", "Est"], ["MC, à gauche du plan", "la gauche du plan", "Ouest"]])
        + BE.alerte("<strong>Piège.</strong> Dehors, face à la façade nord, vous regardez vers le sud. L’orientation est celle du regard qui sort de la pièce à travers le mur.")
        + BE.renvoi(`Plan de masse de la maison : <a href="${DOSSIER}svg/plan-masse.svg">ouvrir le plan de masse</a>.`)
    }),

    BE.ecran({
      id: "planchers-plafonds-sol", dossier: "methode", kicker: "La méthode, 7", title: "Planchers, plafonds et local non chauffé", level: "comprendre", requiresAction: true,
      text: "Une paroi déperditive sépare l’intérieur chauffé de l’extérieur, du sol ou d’un local non chauffé. Le plancher bas sur terre-plein compte pour sa surface au sol : 19,14 mètres carrés pour le bureau. Le plafond du bureau donne sur un étage chauffé : le plancher intermédiaire n’est pas relevé. Le mur de gauche du bureau donne sur un local technique non chauffé : il est relevé à part, avec sa propre surface nette, porte déduite. Pour la porte Pn, 0,90 sur 2,10, la surface nette de ce mur est 8,58 moins 1,89, soit 6,69 mètres carrés.",
      prompt: "Classez chaque paroi : à relever, ou non relevée.",
      aides: [
        "Les conventions de l’écran « Ce qu’on cherche » listent les parois relevées et celles qui ne le sont pas.",
        "Une paroi se relève quand elle sépare un volume chauffé de l’extérieur, du sol ou d’un local non chauffé.",
        "Premier pas : la façade nord du bureau touche l’extérieur, elle est à relever. Une cloison entre deux pièces chauffées ne touche rien de tout cela."
      ],
      ...BE.tri([
        { text: "Mur extérieur, façade nord", good: 0, why: "Il sépare le chauffé de l’extérieur.", bad: "Ce mur touche l’extérieur." },
        { text: "Cloison entre deux pièces chauffées", good: 1, why: "Les deux côtés sont chauffés : aucune déperdition à relever.", bad: "Regardez les deux côtés de la cloison." },
        { text: "Mur donnant sur un garage non chauffé", good: 0, why: "Il sépare le chauffé d’un local non chauffé : relevé à part.", bad: "Un local non chauffé compte comme un côté froid." },
        { text: "Plancher intermédiaire entre deux niveaux chauffés", good: 1, why: "Chauffé de part et d’autre, il n’est pas relevé.", bad: "Regardez ce qu’il y a sous et sur le plancher." },
        { text: "Plancher bas sur terre-plein", good: 0, why: "Il est en contact avec le sol : relevé.", bad: "Le sol est un côté froid." },
        { text: "Plafond sous combles perdus non chauffés", good: 0, why: "Les combles perdus ne sont pas chauffés : relevé.", bad: "Regardez ce qu’il y a au-dessus du plafond." }
      ], ["À relever", "Non relevée"], { text: "Mur MC du bureau, sur le local technique non chauffé", good: 0, why: "Local non chauffé, donc paroi relevée, à part des murs extérieurs." })
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice 2, mur sur local non chauffé", title: "Exercice : un mur sur local non chauffé", level: "appliquer", requiresAction: true,
      text: {
        1: "Dans un troisième bureau, un mur de 3,10 m de long, de hauteur sous plafond 2,60 m, donne sur un local non chauffé. Il porte une porte de 0,90 m sur 2,10 m. L’exemple du mur MC reste sous vos yeux.",
        2: "Dans un troisième bureau, un mur de 3,10 m de long, de hauteur sous plafond 2,60 m, donne sur un local non chauffé. Il porte une porte de 0,90 m sur 2,10 m. Calculez sans l’exemple."
      },
      prompt: { 1: "Choisissez la surface nette de ce mur, en vous aidant de l’exemple.", 2: "Choisissez la surface nette de ce mur. Cette question est à faire seul." },
      aides: {
        1: ["Les trois données sont dans l’énoncé. Le mur donne sur un local non chauffé : il se relève à part.", "Surface brute égale longueur fois hauteur sous plafond. Retirez la porte, qui est une baie de ce mur.", "Premier pas : calculez la porte, 0,90 fois 2,10, puis le mur brut, 3,10 fois 2,60."],
        2: ["L’énoncé donne la longueur, la hauteur, la porte. Le local voisin n’est pas chauffé.", "Un mur sur local non chauffé se calcule comme un mur extérieur : brut moins baies.", "Premier pas : écrivez le produit 0,90 fois 2,10 avant de calculer le mur."]
      },
      ...BE.parNiveau({
        1: avecExemple({ text: "Mur MC du bureau : 3,30 × 2,60 − 0,90 × 2,10", answer: "6,69 m²", why: "Même méthode : brut, porte, net." }, { choices: ["6,17 m²", "8,06 m²", "9,95 m²", "0 m²"], good: 0, explain: "3,10 fois 2,60 donne 8,06 m². La porte fait 1,89 m². 8,06 moins 1,89 donne 6,17 m². 8,06 oublie la porte, 9,95 l’ajoute, 0 ignore le mur alors qu’un mur sur local non chauffé se relève." }),
        2: BE.quiz({ choices: ["6,17 m²", "8,06 m²", "9,95 m²", "0 m²"], good: 0, explain: "3,10 fois 2,60 donne 8,06 m². La porte fait 1,89 m². 8,06 moins 1,89 donne 6,17 m². 8,06 oublie la porte, 9,95 l’ajoute, 0 ignore le mur alors qu’un mur sur local non chauffé se relève." })
      })
    }),

    BE.ecran({
      id: "volume-chauffe", dossier: "methode", kicker: "La méthode, 8", title: "Le volume chauffé", level: "comprendre",
      text: "Le volume d’une pièce chauffée est sa surface en cotes intérieures multipliée par la hauteur sous plafond. L’épaisseur des planchers n’est pas comptée. Pour le bureau : 5,80 fois 3,30 donne 19,14 mètres carrés, puis 19,14 fois 2,60 donne 49,76 mètres cubes. Le volume chauffé d’un bâtiment est la somme des volumes de ses pièces chauffées : un garage ou un local non chauffé n’y entre pas.",
      prompt: "Lisez l’exemple résolu.",
      render: () => BE.exemple({ text: "Bureau : 5,80 m × 3,30 m × 2,60 m", answer: "49,76 m³", why: "Surface 19,14 m² multipliée par la hauteur sous plafond. Le plancher de 0,25 m n’est pas ajouté." })
        + BE.alerte("<strong>Piège.</strong> Un volume se donne en mètres cubes. Une réponse en mètres carrés a oublié la hauteur.")
    }),

    BE.ecran({
      id: "ratio-de-controle", dossier: "methode", kicker: "La méthode, 9", title: "Le ratio de contrôle", level: "comprendre",
      text: "Le ratio de contrôle est la surface des parois opaques déperditives divisée par la surface habitable. Il n’a pas d’unité. Pour le bureau : 47,88 divisé par 19,14 donne 2,50. Le critère est une hypothèse d’exercice, sans source : pour une maison de deux niveaux, on attend un ratio entre 2 et 3. En dessous, cherchez une paroi oubliée. Au-dessus, cherchez une paroi comptée deux fois ou un local non chauffé compté.",
      prompt: "Lisez l’exemple résolu.",
      render: () => BE.exemple({ text: "Bureau : 47,88 m² ÷ 19,14 m²", answer: "2,50", why: "Les deux surfaces sont en m², le ratio n’a pas d’unité. Il se situe entre 2 et 3." })
        + BE.alerte("<strong>Limite.</strong> Le ratio ne trouve pas toutes les erreurs : une orientation inversée ne le change pas, une petite baie oubliée le bouge à peine. Il sert de contrôle de vraisemblance.")
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice 3, volume", title: "Exercice : un volume", level: "appliquer", requiresAction: true,
      text: {
        1: "Un quatrième bureau mesure 4,70 m sur 3,10 m en cotes intérieures, avec une hauteur sous plafond de 2,60 m. L’exemple du volume du bureau reste sous vos yeux.",
        2: "Un quatrième bureau mesure 4,70 m sur 3,10 m en cotes intérieures, avec une hauteur sous plafond de 2,60 m. Calculez sans l’exemple."
      },
      prompt: { 1: "Choisissez le volume, en vous aidant de l’exemple.", 2: "Choisissez le volume. Cette question est à faire seul." },
      aides: {
        1: ["Les trois dimensions sont dans l’énoncé, en mètres.", "Volume égal surface au sol fois hauteur sous plafond.", "Premier pas : calculez la surface au sol, 4,70 fois 3,10, puis multipliez par 2,60."],
        2: ["Les dimensions sont dans l’énoncé. Il n’y a pas de baie à déduire pour un volume.", "Multipliez la surface au sol par la hauteur sous plafond. L’unité du résultat est le mètre cube.", "Premier pas : écrivez 4,70 fois 3,10, c’est la surface au sol."]
      },
      ...BE.parNiveau({
        1: avecExemple({ text: "Bureau d’exemple : 5,80 × 3,30 × 2,60", answer: "49,76 m³", why: "Surface, puis hauteur sous plafond." }, { choices: ["37,88 m³", "41,52 m³", "14,57 m³"], good: 0, explain: "4,70 fois 3,10 donne 14,57 m². 14,57 fois 2,60 donne 37,88 m³. 41,52 prend la hauteur d’étage 2,85, 14,57 est la surface, sans la hauteur." }),
        2: BE.quiz({ choices: ["37,88 m³", "41,52 m³", "14,57 m³"], good: 0, explain: "4,70 fois 3,10 donne 14,57 m². 14,57 fois 2,60 donne 37,88 m³. 41,52 prend la hauteur d’étage 2,85, 14,57 est la surface, sans la hauteur." })
      })
    }),

    BE.projet({
      dossier: "projet", kicker: "Le projet, 1",
      image: "illustrations/1-maison-du-projet.webp", imageAlt: "La maison du projet vue du jardin, au sud : deux niveaux sous un toit à deux pentes, une porte-fenêtre et une fenêtre au rez-de-chaussée, deux fenêtres à l’étage, le garage d’un niveau à l’ouest.",
      aides: {
        1: ["Les plans de la maison sont à l’écran suivant. Les 18 murs de la feuille portent leur repère et leur pièce : trouvez chaque repère sur le plan de sa pièce.", "Pour chaque mur : longueur lue ou additionnée sur le plan, hauteur sous plafond lue sur la coupe, surface brute, baies du tableau des menuiseries, surface nette.", "Premier pas, sur le bureau d’exemple : MA, longueur 5,80, hauteur 2,60, brute 15,08, baie 1,61, nette 13,47. Remplissez de même la première ligne de la maison."],
        2: ["Les plans de la maison sont à l’écran suivant. Le tableau des menuiseries donne le mur qui porte chaque baie.", "Relevez d’abord les parois (écrans « Ce qu’on cherche » et « Planchers, plafonds et local non chauffé »), puis les surfaces, puis les volumes. Contrôlez par le ratio.", "Premier pas, sur le bureau d’exemple : on liste ses murs MA, MB, MC, puis la ligne de chacun. Faites la liste des murs de la maison avant de calculer."]
      }
    }),

    BE.ecran({
      id: "lire-les-plans", dossier: "projet", kicker: "Le projet, 2", title: "Lire les plans du dossier", level: "appliquer",
      text: "Le dossier de la maison tient en cinq plans. Chaque donnée a sa page. Les repères Mxx posés dans les pièces désignent les murs : le tableau des menuiseries cite ces repères. Une longueur peut se lire directement sur l’étiquette d’une pièce, sur une chaîne de cotes, ou par addition et soustraction de cotes. Une très petite pièce peut donner la longueur de son mur dans la légende du plan. La station ne calcule rien du projet à votre place.",
      prompt: "Ouvrez les plans, puis revenez à la feuille.",
      aides: [
        "Le tableau ci-dessous dit quelle page contient quelle donnée.",
        "Une longueur se lit sur l’étiquette de la pièce, sur une chaîne de cotes, ou se déduit d’une cote totale moins une autre cote.",
        "Premier pas, sur le bureau d’exemple : la longueur de MC se lit en additionnant la chaîne de gauche. Cherchez de même la chaîne qui longe le premier mur de la maison."
      ],
      render: () => tableau(["Donnée", "Où la lire dans le dossier"], [
        ["Repère d’un mur", "Plan du rez-de-chaussée ou de l’étage : repère Mxx dans la pièce, contre le mur"],
        ["Longueur d’un mur", "Étiquette de la pièce (deux dimensions), chaîne de cotes, légende du plan"],
        ["Surface au sol d’une pièce", "Son étiquette. Une pièce en L porte deux rectangles, qui s’additionnent"],
        ["Hauteur sous plafond", "Coupe A-A"],
        ["Baies d’un mur", "Tableau des menuiseries (repère, mur, largeur, hauteur)"],
        ["Orientation", "Plan de masse : le nord, puis la face extérieure du mur"],
        ["Pièce chauffée ou non", "Mention « non chauffé » dans l’étiquette de la pièce"]
      ]) + BE.liens([
        { href: DOSSIER + "svg/plan-rdc.svg", title: "Plan du rez-de-chaussée", note: "Page 1" },
        { href: DOSSIER + "svg/plan-etage.svg", title: "Plan de l’étage", note: "Page 2" },
        { href: DOSSIER + "svg/coupe-a-a.svg", title: "Coupe A-A", note: "Page 3" },
        { href: DOSSIER + "svg/plan-masse.svg", title: "Plan de masse", note: "Page 4" },
        { href: DOSSIER + "svg/tableau-menuiseries.svg", title: "Tableau des menuiseries", note: "Page 5" },
        { href: DOSSIER + "plans-maison.pdf", title: "Les cinq plans en PDF", note: "À imprimer en A4 paysage" }
      ])
    }),

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});
