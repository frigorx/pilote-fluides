/* C6 — Calculer les déperditions d’une pièce, paroi par paroi
   Ligne C · Climatisation & apports (placée juste après « Parois et écarts de température »)
   TP TECVC, REAC TP-00133 — CP5 Réaliser les calculs de déperditions thermiques
   Bac Pro MFER 2028 — S4.5 les systèmes de climatisation

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Station N12 du plan « stations manquantes » (19/10/2026). Contenu : voir CONTRAT-CONTENU.md.
   Le dessin (scenes.js, scène `piece`), l’exemple résolu et la pièce à calculer (piece.js) sont
   produits PAR CODE à partir des données ci-dessous : aucun résultat n’est tapé à la main,
   ni dans les tableaux, ni dans les textes (ils sont fabriqués avec `calculer`).

   D’où viennent les valeurs (sources dans `prof.sources`) :
   · dehors −11 °C, dedans 19 °C : dossier technique du musée des beaux-arts de Dijon, sujet de BTS 2024
     (valeurs reprises dans le projet P1 du TP TECVC) ;
   · U du mur 0,34 W/(m²·K) : cours « Transfert thermique cours 2 » (somme des résistances 2,921 m²·K/W,
     U = 1 ÷ R) ;
   · U de la fenêtre 1,6 W/(m²·K) : double vitrage PVC 4/16/4, « RT 2005 » (BPB Placo, juin 2006) ;
   · le coefficient 0,34 Wh/(m³·K) et Φ = 0,34 × débit × ΔT : Trame B du TP TECVC (« Trames, gabarits et extraits ») ;
   · la température du couloir non chauffé et les débits d’air sont des DONNÉES D’ÉNONCÉ, écrites comme telles. */
(function () {
  "use strict";

  const DEDANS = 19, DEHORS = -11;
  const U_MUR = 0.34, U_FENETRE = 1.6;
  const COEF_AIR = 0.34;

  const r6 = x => Math.round(x * 1e6) / 1e6;

  /* Une pièce se décrit par ses parois : longueur et hauteur, ce qu’on en retire (une fenêtre),
     le U, et ce qu’il y a de l’autre côté (« dehors » ou « couloir »). Un mur qui donne sur une
     pièce chauffée à la même température n’est pas listé : son écart est nul. */
  const exemple = {
    nom: "Salle de réunion", longueur: 5, largeur: 4, hauteur: 2.5, couloir: 10, debit: 60,
    parois: [
      {id: "mur", nom: "Mur extérieur", l: 5, h: 2.5, retire: {nom: "fenêtre", l: 1.2, h: 1.5}, u: U_MUR, cote: "dehors"},
      {id: "fen", nom: "Fenêtre", l: 1.2, h: 1.5, u: U_FENETRE, cote: "dehors"},
      {id: "clo", nom: "Mur côté couloir", l: 5, h: 2.5, u: U_MUR, cote: "couloir"}
    ]
  };
  const exercice = {
    nom: "Bureau", longueur: 4, largeur: 3, hauteur: 2.5, couloir: 12, debit: 30,
    parois: [
      {id: "mur", nom: "Mur extérieur", l: 4, h: 2.5, retire: {nom: "fenêtre", l: 1, h: 1.5}, u: U_MUR, cote: "dehors"},
      {id: "fen", nom: "Fenêtre", l: 1, h: 1.5, u: U_FENETRE, cote: "dehors"},
      {id: "clo", nom: "Mur côté couloir", l: 4, h: 2.5, u: U_MUR, cote: "couloir"}
    ]
  };

  /* LE calcul. Chaque ligne est arrondie au watt, comme sur la trame du TP, et le total est la
     somme des lignes arrondies : ce que l’élève additionne à la main est donc ce que l’écran affiche. */
  function calculer(piece) {
    const lignes = piece.parois.map(w => {
      const brute = r6(w.l * w.h);
      const retire = w.retire ? r6(w.retire.l * w.retire.h) : 0;
      const s = r6(brute - retire);
      const autre = w.cote === "dehors" ? DEHORS : piece.couloir;
      const dT = DEDANS - autre;
      return {id: w.id, nom: w.nom, brute, retire, s, u: w.u, autre, dT, phi: Math.round(w.u * s * dT)};
    });
    const dTair = DEDANS - DEHORS;
    const air = {debit: piece.debit, dT: dTair, phi: Math.round(COEF_AIR * piece.debit * dTair)};
    const parois = lignes.reduce((n, l) => n + l.phi, 0);
    const total = parois + air.phi;
    const postes = lignes.map(l => ({id: l.id, nom: l.nom, phi: l.phi})).concat({id: "air", nom: "L’air renouvelé", phi: air.phi});
    const dominant = postes.reduce((a, b) => (b.phi > a.phi ? b : a));
    return {lignes, air, parois, total, dominant, part: Math.round(100 * dominant.phi / total)};
  }

  /* Un nombre à la française : virgule décimale, deux décimales au plus, jamais de zéros inutiles. */
  const fr = n => String(Math.round(n * 100) / 100).replace(".", ",").replace("-", "−");

  (window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
    line: "C",
    id: "deperditions-piece",
    title: "Calculer les déperditions d’une pièce, paroi par paroi",

    /* Les codes du référentiel, en un bloc discret « Sert notamment pour » sous le titre (app.js : `s.codes`) :
       la station est générique, les diplômes y puisent (règle de Franck, 19/10/2026). Libellés officiels :
       TP-00133 (REAC TECVC, CP5) ; BAC_MFER_2028.json (S4.5). */
    codes: "Sert notamment pour : TP TECVC, REAC TP-00133 — CP5 Réaliser les calculs de déperditions thermiques · Bac Pro MFER 2028 — S4.5 les systèmes de climatisation",

    /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
       ni une information indispensable. */
    cap: "Repérez les parois d’une pièce et lisez une ligne de calcul déjà remplie.",
    bac: "Calculez les déperditions d’une pièce, paroi par paroi, puis l’air renouvelé, puis le total.",
    bts: "Justifiez l’écart de chaque paroi, écrivez vos hypothèses et comparez le poids des postes.",

    /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
    decouverte: `La scène montre une pièce vue de dessus, en plein hiver : ${fr(DEHORS)} °C dehors, ${fr(DEDANS)} °C dedans. La chaleur qui s’en échappe s’appelle les déperditions : elle sort par le mur, par la fenêtre et par le mur du côté couloir. Elle part aussi avec l’air qu’on renouvelle : l’air chaud sort, l’air froid entre. Regardez la taille des flèches : plus elle est grande, plus il part de chaleur par là. Les deux murs voisins, eux, n’ont pas de flèche.`,

    /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
    explication: `On calcule une pièce en trois temps, toujours dans cet ordre.\n\n1. Les parois, une par une. La chaleur perdue Φ (phi, en watts) vaut U × S × ΔT : c’est la formule de la station « Parois et écarts de température ». U dit la qualité de la paroi : plus il est petit, mieux elle isole. S est la surface : une fenêtre se retire du mur qui la porte, sinon on la compte deux fois. ΔT est l’écart entre le dedans et ce qu’il y a de l’autre côté : le dehors, mais aussi un couloir non chauffé, moins froid. Une paroi voisine d’une pièce chauffée à la même température a un écart nul : elle ne compte pas.\n\n2. L’air renouvelé. L’air neuf qui entre doit être chauffé : Φ = 0,34 × débit × ΔT, le débit en m³/h. Le 0,34 est déjà réglé pour les heures : ne divisez pas ensuite par 3 600.\n\n3. Le total. On additionne les parois et l’air. Regardez enfin quel poste pèse le plus : ce n’est pas toujours celui qu’on croit.`,

    /* Les trois cases de l'étape Comprendre (app.js : `s.etapes`). */
    etapes: ["1. Les parois : U × S × ΔT", "2. L’air : 0,34 × débit × ΔT", "3. Le total de la pièce"],

    method: "Une ligne par paroi, un écart par ligne, puis l’air, puis le total.",
    formula: "Parois : Φ = U × S × ΔT · Air : Φ = 0,34 × débit × ΔT · Total = parois + air",

    /* Manipuler — une action précise, avec des valeurs concrètes. */
    consigne: `À vous : la pièce « ${exercice.nom} », ${exercice.longueur} m × ${exercice.largeur} m, hauteur ${fr(exercice.hauteur)} m, ${fr(DEHORS)} °C dehors, ${fr(DEDANS)} °C dedans. Les deux autres murs donnent sur des pièces chauffées : rien à compter. Il y a cinq lignes, à faire une par une ; l’aide s’efface au fil des lignes. Remplissez les cases, puis cliquez sur « Vérifier la ligne ». Le bouton « Indice » redonne de l’aide, et l’exemple est à l’étape Comprendre.`,
    lecture: `Le total est la chaleur qui s’échappe de la pièce, en watts : c’est le point de départ pour choisir un chauffage. Comparez-le à l’exemple de l’étape Comprendre. Puis regardez la ligne qui pèse le plus, et dites pourquoi à voix haute.`,

    /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
    limites: `Cette station ne compte que deux postes : les parois et l’air renouvelé. Elle ne compte ni les ponts thermiques (le dossier donne parfois un forfait), ni la relance après une coupure, ni les gains du soleil et des occupants. Les sources des valeurs sont écrites sous l’exemple et sous la pièce à calculer : en projet, prenez celles du dossier technique. La température du couloir et les débits d’air sont des données d’énoncé.`,

    /* D'où viennent les valeurs, nommées à l'écran (sous l'exemple et sous la pièce à calculer) : le titre du document du fonds. */
    activity: {kind: "piece", dedans: DEDANS, dehors: DEHORS, coefAir: COEF_AIR, exemple, exercice, calculer, sources: [
      ["U du mur", "cours « Transfert thermique cours 2 » : mur de 30 cm de béton, plâtre et polystyrène, U = 1 ÷ 2,921"],
      ["U de la fenêtre", "brochure « RT 2005 » (BPB Placo, 2006) : fenêtre PVC, double vitrage 4/16/4"],
      ["−11 °C dehors et 19 °C dedans", "dossier technique du musée des beaux-arts de Dijon, sujet d’examen 2024"],
      ["Le 0,34 de l’air", "trame B de « Trames, gabarits et extraits » : capacité de l’air, 0,34 Wh/(m³·K)"]
    ]},

    /* Ce que la voix dit — texte à part, écrit pour l'oreille. Aucun chiffre calculé, aucun symbole.
       Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
    narration: {
      decouvrir: "Voici une pièce vue d’en haut, un jour de grand froid. Dehors, il gèle ; dedans, il fait doux. La chaleur sort de la pièce par plusieurs chemins. Elle traverse le mur, elle traverse la fenêtre, elle traverse le mur qui donne sur le couloir. Et elle part aussi avec l’air : on ouvre pour renouveler, l’air chaud s’en va, l’air froid arrive. Chaque flèche a une taille, et cette taille veut dire quelque chose. Remarquez aussi les deux murs sans flèche : de l’autre côté, il fait aussi chaud que dans la pièce.",

      comprendre: "Pour une pièce entière, on fait toujours la même chose, dans le même ordre. D’abord les parois, une par une, chacune avec sa surface, son coefficient et son écart de température. Attention à deux pièges. La fenêtre se retire du mur, sinon on la compte deux fois. Et chaque paroi a son propre écart : un mur sur un couloir non chauffé perd moins qu’un mur sur le dehors. Ensuite l’air renouvelé, avec sa formule à lui. Enfin le total, qu’on lit en se demandant quel poste pèse le plus. L’exemple, à droite, vous montre les trois temps sur une salle de réunion.",

      manipuler: "À vous maintenant, sur un bureau. La première ligne est presque faite pour vous : vous suivez les étapes écrites. Sur les lignes suivantes, l’aide disparaît petit à petit, comme sur un chantier où l’on vous laisse faire de plus en plus seul. Si vous bloquez, le bouton indice redonne un coup de main, et l’exemple reste à l’étape précédente. Pour chaque ligne, vérifiez avant de passer à la suivante. Une erreur n’est pas grave : l’écran vous dit où chercher.",

      verifier: "Deux questions, sans note. Retenez deux idées. Un : chaque paroi a son propre écart de température, il ne faut pas appliquer celui du dehors à toutes. Deux : le total d’une pièce, c’est les parois et l’air renouvelé, jamais les parois seules. Et le poste qui pèse le plus n’est pas toujours celui qu’on croit."
    },

    quiz: [
      ["Un mur donne sur un couloir non chauffé. Son écart de température est…", "dedans moins la température du couloir", ["dedans moins la température dehors", "dedans moins la température du couloir", "nul, comme pour une pièce chauffée"]],
      ["Le total des déperditions d’une pièce, c’est…", "toutes les parois, plus l’air renouvelé", ["les parois seules, l’air n’est pas une perte", "l’air renouvelé seul, car il pèse toujours le plus", "toutes les parois, plus l’air renouvelé"]]
    ],

    /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
    prof: {
      mission: "Établir la note de déperditions d’une pièce : parois une à une, air renouvelé, total, avec les données du dossier.",
      acquis: {
        cap: ["Repère les parois d’une pièce et celles qui donnent sur le dehors", "Lit une ligne de calcul complète : surface, écart, résultat", "Dit quelle flèche est la plus grosse et pourquoi"],
        bac: ["Retire la fenêtre du mur qui la porte avant de calculer", "Choisit pour chaque paroi son écart de température", "Additionne les parois et l’air renouvelé pour obtenir le total de la pièce"],
        bts: ["Écrit ses hypothèses (températures, couloir, débit) avant de calculer", "Identifie le poste dominant et propose une action", "Cite ce que le calcul ne compte pas (ponts thermiques, relance)"]
      },
      sources: [
        "TP TECVC — « Trames, gabarits et extraits », Trame B (parois : Φ = U × S × ΔT ; air : Φ = 0,34 × débit × ΔT, 0,34 Wh/(m³·K) ; fenêtre déduite du mur qui la porte)",
        "TP TECVC — projet P1 « Bilan thermique », étape 3 ; dossier technique du musée des beaux-arts de Dijon, sujet de BTS 2024 : température extérieure de base −11 °C, intérieure 19 °C",
        "Cours « Transfert thermique cours 2 » (Bac MFER, S1-Analyse) : mur béton caverneux 30 cm, plâtre 13 mm, polystyrène 10 cm, R total 2,921 m²·K/W, U = 0,34 W/(m²·K)",
        "« RT 2005 », BPB Placo, juin 2006 (Collègues partagés) : fenêtre PVC double vitrage 4/16/4, Ujn = 1,6 W/(m²·K)",
        "Référentiels : REAC TP-00133 (TECVC), CP5 ; BAC_MFER_2028.json, S4.5"
      ],
      correspondances: [
        {reseau: "AéroRézo", station: "Parois et écarts de température", pourquoi: "même formule U × S × ΔT, ici appliquée à toutes les parois d’une pièce"},
        {reseau: "AéroRézo", station: "Apport sensible", pourquoi: "même écart de température et même type de calcul, appliqués à un débit d’air"},
        {reseau: "AéroRézo", station: "Pourquoi ventiler ?", pourquoi: "le débit d’air neuf qui entre dans le calcul vient du besoin de la pièce"}
      ]
    }
  });
})();
