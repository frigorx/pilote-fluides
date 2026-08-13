/* Capsule g2 — « Impact environnemental et F-Gas » (G2 · codes 2.01 · 2.02).
   Contenu repris SANS AJOUT de la fiche g2 de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. */
CAPSULE.declarer({
  id: "g2",
  fiche: "g2",
  titre: "Impact environnemental et F-Gas",
  surtitre: "HABILITATION FLUIDES · G2 · CODES 2.01 · 2.02",
  duree: "environ 6 minutes",
  intro: "Un même kilo de fluide ne pèse pas pareil sur le climat : tout dépend de son PRP. Voici comment on calcule cet impact, et ce que le règlement F-Gas en fait.",
  codes: [
    { code: "2.01", libelle: "Situer la politique climat internationale et européenne" },
    { code: "2.02", libelle: "Expliquer le PRP et les obligations du règlement (UE) 2024/573" },
  ],

  visuelAccueil: {
    motif: "barres",
    titre: "Le PRP compare l'effet de serre au CO₂",
    valeurs: [
      { titre: "CO₂", valeur: 1, affiche: "1", teinte: "ok" },
      { titre: "R-32", valeur: 675, affiche: "675" },
      { titre: "R-410A", valeur: 2088, affiche: "2088" },
      { titre: "R-404A", valeur: 3922, affiche: "3922", teinte: "danger" },
    ],
    legende: "Le PRP compare l'effet de serre d'un kilo de fluide à un kilo de CO₂ (= 1).",
  },

  ecrans: [
    {
      id: "deux-textes",
      titre: "Deux textes, deux problèmes",
      note: "Ne pas les confondre",
      visuel: {
        motif: "duo",
        titre: "Deux accords internationaux, deux cibles",
        cartes: [
          { titre: "MONTRÉAL, 1987", picto: "☀", pour: "vise l'ozone", texte: "a fait disparaître les CFC, puis les HCFC" },
          { titre: "KYOTO ET PARIS", picto: "🌡", pour: "vise le réchauffement", texte: "s'attaque aux HFC : ODP nul, mais fort effet de serre" },
        ],
        lien: "≠",
        pied: "Deux textes, deux problèmes : ne pas les confondre.",
      },
      texte: "<p>Deux accords internationaux, deux problèmes différents. Le <b>protocole de Montréal</b> (1987) visait la <b>couche d'ozone</b> : il a fait disparaître les CFC puis les HCFC.</p><p>La <b>convention climat</b> (Kyoto, Paris) vise le <b>réchauffement</b> : c'est elle qui s'attaque aux HFC, dont l'action sur l'ozone est nulle mais l'effet de serre considérable.</p>",
      dire: "Deux accords internationaux, et ils ne visent pas le même problème. Le protocole de Montréal, en 1987, visait la couche d'ozone : il a fait disparaître les C F C, puis les H C F C. La convention climat, avec Kyoto puis Paris, vise le réchauffement. C'est elle qui s'attaque aux H F C, dont l'action sur l'ozone est nulle, mais dont l'effet de serre est considérable.",
      reference: "Code 2.01 · deux accords, deux cibles",
    },

    {
      id: "prp",
      titre: "Le PRP : une échelle, le CO2 pour repère",
      note: "Ce que la fiche du fluide affiche",
      visuel: {
        motif: "barres",
        titre: "Le PRP compare l'effet de serre au CO₂",
        valeurs: [
          { titre: "CO₂", valeur: 1, affiche: "1", teinte: "ok" },
          { titre: "R-32", valeur: 675, affiche: "675" },
          { titre: "R-410A", valeur: 2088, affiche: "2088" },
          { titre: "R-404A", valeur: 3922, affiche: "3922", teinte: "danger" },
        ],
        legende: "Le PRP compare l'effet de serre d'un kilo de fluide à un kilo de CO₂ (= 1).",
      },
      texte: "<p>Le <b>PRP</b> (potentiel de réchauffement planétaire, ou GWP) mesure l'effet de serre d'un fluide, <b>par kilogramme</b>, en prenant le <b>CO₂ comme étalon : PRP = 1</b>.</p><p>Regardez l'écart : le R-32 vaut 675, le R-410A 2088, le R-404A 3922. Le même kilo de fluide n'a pas du tout le même poids climatique.</p>",
      dire: "Le P R P, ou potentiel de réchauffement planétaire, mesure l'effet de serre d'un fluide, kilo pour kilo, en comparant au C O2, qui vaut 1 par définition. Regardez l'écart entre les fluides. Le R 32 vaut 675. Le R 410 A vaut 2088. Le R 404 A vaut 3922. Un même kilo de fluide n'a donc pas du tout le même poids sur le climat, selon le fluide choisi.",
      retenir: ["Le <b>PRP</b> compare l'effet de serre d'un kilo de fluide à un kilo de <b>CO₂</b>, qui vaut 1."],
      reference: "Code 2.02 · le PRP",
    },

    {
      id: "calcul",
      titre: "Le calcul qui sert tous les jours",
      note: "La formule à connaître",
      visuel: {
        motif: "sequence",
        titre: "De la plaque signalétique au résultat",
        etapes: [
          { titre: "1. La charge", texte: "le poids de fluide, en kg, sur la plaque" },
          { titre: "2. Le PRP", texte: "sur la fiche du fluide" },
          { titre: "3. Le calcul", texte: "charge × PRP ÷ 1000" },
        ],
        pied: "Deux installations à charge égale n'ont pas la même contrainte si les fluides diffèrent.",
      },
      texte: "<p>L'impact réel d'une installation dépend aussi de la charge : c'est la <b>tonne équivalent CO₂</b>.</p><p><b>tonnes éq. CO₂ = charge (kg) × PRP ÷ 1000</b>. C'est cette valeur — pas le poids de fluide — qui déclenche une partie des obligations.</p>",
      dire: "Voici le calcul qui sert tous les jours sur le terrain. L'impact réel d'une installation dépend de sa charge, en kilos, et du P R P du fluide. La formule : tonnes équivalent C O2 égale la charge en kilos, fois le P R P, divisé par mille. C'est cette valeur-là, et pas le simple poids de fluide, qui déclenche une partie des obligations. Deux installations à charge identique n'ont donc pas la même contrainte si leurs fluides sont différents.",
      retenir: ["La formule : <b>tonnes éq. CO₂ = charge (kg) × PRP ÷ 1000</b>."],
      reference: "Code 2.02 · la formule",
    },

    {
      id: "exemple",
      titre: "Un exemple, pas à pas",
      note: "15 kg de R-32",
      visuel: {
        motif: "checklist",
        titre: "Le calcul, étape par étape",
        items: [
          { titre: "La charge", texte: "15 kg de R-32" },
          { titre: "Le PRP du R-32", texte: "675" },
          { titre: "Le calcul", texte: "15 × 675 ÷ 1000" },
          { titre: "Le résultat", texte: "10,13 tonnes équivalent CO₂" },
        ],
        pied: "C'est cette valeur qui déclenche une partie des obligations — pas le poids de fluide.",
      },
      texte: "<p>Une installation contient <b>15 kg de R-32</b> (PRP = 675). Sa charge en tonnes équivalent CO₂ : 15 × 675 ÷ 1000 = <b>10,13 t éq. CO₂</b>.</p>",
      dire: "Prenons un exemple concret. Une installation contient quinze kilos de R 32, dont le P R P vaut 675. On applique la formule : quinze fois six cent soixante-quinze, divisé par mille. Le résultat : dix virgule treize tonnes équivalent C O2. Retenez bien la division par mille : c'est le piège le plus fréquent de ce calcul.",
      reference: "Code 2.02 · exemple chiffré",
      controle: {
        enonce: "Une installation contient 15 kg de R-32 (PRP = 675). Quelle est sa charge en tonnes équivalent CO₂ ?",
        choix: ["4,5 t éq. CO₂", "6,75 t éq. CO₂", "10,13 t éq. CO₂", "101,3 t éq. CO₂"],
        bonne: 2,
        explication: "15 × 675 ÷ 1000 = 10,13 t éq. CO₂. Le piège classique est d'oublier la division par 1000 et de confondre les kilogrammes avec les tonnes équivalent CO₂.",
      },
    },

    {
      id: "piege-odp-prp",
      titre: "Un PRP bas n'est pas zéro impact",
      note: "Le piège classique de l'examen",
      visuel: {
        motif: "alerte",
        titre: "Trois idées à ne pas confondre",
        vignettes: [
          { picto: "❌", etiquette: "idée fausse", titre: "« Il ne touche pas l'ozone, donc il est propre »", texte: "un ODP nul ne dit rien du PRP" },
          { picto: "⚠", etiquette: "la nuance", titre: "Un PRP bas n'est pas zéro impact", texte: "ODP et PRP restent deux mesures séparées" },
          { picto: "🔬", etiquette: "aujourd'hui", titre: "La question des PFAS", texte: "se pose sur certains fluides à bas PRP" },
        ],
        pied: "Vérifier les deux valeurs, jamais en déduire une de l'autre.",
      },
      texte: "<p>Un HFC a un <b>ODP nul</b> et pourtant un <b>PRP fort</b>. Dire « il ne touche pas l'ozone, donc il est propre » est faux.</p><p>Et un PRP bas ne veut pas dire zéro impact : la question des <b>PFAS</b> se pose désormais sur certains fluides à bas PRP.</p>",
      dire: "Attention à un raccourci trompeur. Un H F C a un O D P nul, et pourtant un P R P fort. Dire qu'il ne touche pas l'ozone, donc qu'il est propre, est faux : ce sont deux mesures séparées. Et l'inverse trompe aussi. Un P R P bas ne veut pas dire zéro impact : la question des P F A S se pose désormais sur certains fluides à bas P R P.",
      retenir: [
        "Un ODP nul ne veut pas dire un PRP bas : ce sont deux mesures séparées.",
        "Un PRP bas ne veut pas dire zéro impact : la question des PFAS se pose aussi.",
      ],
      reference: "Code 2.02 · ODP et PRP ne se confondent pas",
    },

    {
      id: "fgas",
      titre: "Ce que le règlement F-Gas organise",
      note: "Le règlement (UE) 2024/573",
      visuel: {
        motif: "flux",
        titre: "F-Gas III, trois leviers",
        boites: [
          { picto: "📉", titre: "Moins de HFC", texte: "réduction progressive des quantités mises sur le marché" },
          { picto: "🎫", titre: "Des quotas", texte: "attribués aux producteurs et importateurs" },
          { picto: "🚫", titre: "Des interdictions", texte: "pour certains usages" },
        ],
        pied: "Le règlement (UE) 2024/573, dit F-Gas III, organise tout cela.",
      },
      texte: "<p>Le règlement <b>(UE) 2024/573</b> — dit F-Gas III — organise la réduction progressive des quantités de HFC mises sur le marché (<i>phase-down</i>), attribue des quotas aux producteurs et importateurs, et interdit certains usages.</p>",
      dire: "Tout cela est traduit, en Europe, dans un texte : le règlement européen de 2024, numéro 573, dit F Gas 3. Il fait trois choses. Il réduit progressivement les quantités de H F C mises sur le marché : c'est ce qu'on appelle le phase down. Il attribue des quotas aux producteurs et aux importateurs. Et il interdit certains usages.",
      reference: "Code 2.02 · le règlement F-Gas",
    },

    {
      id: "bilan",
      titre: "Le geste qui protège vraiment le climat",
      note: "Le lien avec l'étanchéité",
      visuel: {
        motif: "jauge",
        titre: "Du geste minimal au geste qui compte",
        seuils: [
          { part: 0.25, titre: "Une fuite", texte: "se paie en tonnes éq. CO₂, pas en kilos" },
          { part: 0.9, titre: "Étanchéité et récupération", texte: "le geste qui protège le climat" },
        ],
        niveau: 0.9,
        bas: "le minimum",
        hautLibelle: "le geste qui compte",
        teinte: "ok",
      },
      texte: "<p>Si le climat se joue sur les fuites, l'<b>étanchéité</b> et la <b>récupération</b> deviennent des gestes écologiques, pas de simples formalités.</p>",
      dire: "Pour finir, un lien à ne pas oublier. Si le climat se joue sur les fuites, alors l'étanchéité et la récupération ne sont plus de simples formalités administratives : ce sont des gestes qui protègent directement le climat. Chaque kilo qui ne fuit pas, c'est des tonnes équivalent C O2 qui ne partent pas dans l'air.",
      piege: "<p>Un <b>ODP nul</b> ne veut pas dire un <b>PRP bas</b> : ce sont deux mesures séparées. Et un PRP bas ne veut pas dire zéro impact — la question des <b>PFAS</b> se pose aussi sur certains fluides à bas PRP.</p>",
      reference: "Code 2.02 · le geste qui compte",
      controle: {
        enonce: "Dans le calcul des tonnes équivalent CO₂ (charge × PRP ÷ 1000), quelle est l'erreur la plus fréquente ?",
        choix: [
          "Oublier la division par 1000, ce qui donne un résultat mille fois trop grand",
          "Utiliser le PRP au lieu de l'ODP",
          "Peser la machine plutôt que le fluide",
          "Confondre le producteur et l'importateur",
        ],
        bonne: 0,
        explication: "Le piège classique est d'oublier la division par 1000, ou de confondre les kilogrammes avec les tonnes équivalent CO₂. Toujours vérifier l'unité finale : ce sont bien des TONNES.",
      },
    },
  ],

  motFin: "Vous pouvez maintenant revenir à la fiche pour lire le texte complet, ou passer à l'exercice qui compare deux installations.",
});
