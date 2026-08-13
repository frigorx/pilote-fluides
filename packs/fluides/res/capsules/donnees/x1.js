/* Capsule x1 — « Exercice — deux installations, deux impacts » (G2 · mise en situation).
   Contenu repris SANS AJOUT de la fiche x1 de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. */
CAPSULE.declarer({
  id: "x1",
  fiche: "x1",
  titre: "Exercice — deux installations, deux impacts",
  surtitre: "HABILITATION FLUIDES · G2 · MISE EN SITUATION",
  duree: "environ 5 minutes",
  intro: "Deux machines, même charge de fluide, mais pas le même impact sur le climat. À vous de calculer avant de découvrir la réponse.",
  codes: [{ code: "2.02", libelle: "Calculer une charge en tonnes équivalent CO₂" }],

  visuelAccueil: {
    motif: "duo",
    titre: "Même charge, même bâtiment, même exploitant",
    cartes: [
      { titre: "MACHINE A", picto: "🧊", pour: "une chambre froide", texte: "12 kg de R-404A (PRP 3922)" },
      { titre: "MACHINE B", picto: "❄", pour: "une climatisation", texte: "12 kg de R-32 (PRP 675)" },
    ],
    lien: "=",
    pied: "Même bâtiment, même exploitant, même charge : 12 kg chacune.",
  },

  ecrans: [
    {
      id: "situation",
      titre: "Deux machines, dans le même bâtiment",
      note: "L'énoncé",
      visuel: {
        motif: "duo",
        titre: "Même charge, même bâtiment, même exploitant",
        cartes: [
          { titre: "MACHINE A", picto: "🧊", pour: "une chambre froide", texte: "12 kg de R-404A (PRP 3922)" },
          { titre: "MACHINE B", picto: "❄", pour: "une climatisation", texte: "12 kg de R-32 (PRP 675)" },
        ],
        lien: "=",
        pied: "Même bâtiment, même exploitant, même charge : 12 kg chacune.",
      },
      texte: "<p>Tu interviens sur deux machines dans le même bâtiment.</p><p><b>Machine A</b> — chambre froide, 12 kg de R-404A (PRP = 3922). <b>Machine B</b> — climatisation, 12 kg de R-32 (PRP = 675).</p>",
      dire: "Voici la situation. Vous intervenez sur deux machines, dans le même bâtiment, pour le même exploitant. Machine A : une chambre froide, avec douze kilos de R 404 A, dont le P R P vaut 3922. Machine B : une climatisation, avec douze kilos de R 32, dont le P R P vaut 675. Même poids de fluide, dans les deux cas.",
      reference: "G2 · mise en situation",
    },

    {
      id: "reflexion",
      titre: "Même poids : même impact ?",
      note: "Réfléchissez avant de continuer",
      visuel: {
        motif: "balance",
        titre: "Le poids est identique. Et l'impact ?",
        avant: { etiquette: "Machine A", valeur: "12 kg de R-404A" },
        apres: { etiquette: "Machine B", valeur: "12 kg de R-32" },
        ecart: { etiquette: "même impact climat ?", valeur: "?" },
        pied: "Le poids est identique. L'impact aussi ?",
      },
      texte: "<p>Même charge, 12 kg chacune. Calcule la charge en <b>tonnes équivalent CO₂</b> de chacune avant de répondre.</p>",
      dire: "Avant d'aller plus loin, une question. Les deux machines ont exactement le même poids de fluide : douze kilos chacune. Est-ce que ces deux machines pèsent pour autant pareil sur le climat ? Prenez le temps de calculer, avec la formule charge fois P R P divisé par mille, pour chacune des deux machines, avant de continuer.",
      reference: "G2 · mise en situation",
    },

    {
      id: "resolution",
      titre: "Le calcul, pour chaque machine",
      note: "Étape par étape",
      visuel: {
        motif: "checklist",
        titre: "charge × PRP ÷ 1000",
        items: [
          { titre: "Machine A", texte: "12 × 3922 ÷ 1000 = 47,1 t éq. CO₂" },
          { titre: "Machine B", texte: "12 × 675 ÷ 1000 = 8,1 t éq. CO₂" },
        ],
        pied: "Même poids, résultats très différents.",
      },
      texte: "<p>Machine A : 12 × 3922 ÷ 1000 = <b>47,1 t éq. CO₂</b>. Machine B : 12 × 675 ÷ 1000 = <b>8,1 t éq. CO₂</b>.</p>",
      dire: "Faisons le calcul ensemble. Pour la machine A : douze fois trois mille neuf cent vingt-deux, divisé par mille. Ça donne quarante-sept virgule un tonnes équivalent C O2. Pour la machine B : douze fois six cent soixante-quinze, divisé par mille. Ça donne huit virgule un tonnes équivalent C O2. Même poids de fluide au départ, et pourtant les deux résultats sont très éloignés.",
      reference: "G2 · le calcul détaillé",
    },

    {
      id: "controle",
      titre: "Le rapport d'impact",
      note: "Le contrôle",
      visuel: {
        motif: "barres",
        titre: "Même charge, 12 kg chacune",
        valeurs: [
          { titre: "Machine A · R-404A", valeur: 47.1, affiche: "47,1 t éq. CO₂", teinte: "danger" },
          { titre: "Machine B · R-32", valeur: 8.1, affiche: "8,1 t éq. CO₂", teinte: "ok" },
        ],
        legende: "Même charge, 12 kg chacune : le PRP fait toute la différence.",
      },
      texte: "<p>La machine A pèse environ <b>6 fois plus lourd</b> sur le climat que la machine B, pour la même quantité de fluide.</p>",
      dire: "Regardez l'écart. La machine A pèse environ six fois plus lourd sur le climat que la machine B, alors qu'elles contiennent exactement le même poids de fluide. C'est le P R P qui fait toute la différence, pas le poids.",
      reference: "G2 · le résultat",
      controle: {
        enonce: "À charge égale (12 kg), quel est le rapport d'impact climatique entre la machine A (R-404A) et la machine B (R-32) ?",
        choix: [
          "Le même impact : la charge est identique",
          "La machine A pèse environ 6 fois plus lourd (47,1 contre 8,1 t éq. CO₂)",
          "La machine B pèse plus lourd, le R-32 est inflammable",
          "On ne peut pas comparer deux fluides différents",
        ],
        bonne: 1,
        explication: "A : 12 × 3922 ÷ 1000 = 47,1 t éq. CO₂. B : 12 × 675 ÷ 1000 = 8,1 t éq. CO₂. Soit environ 6 fois plus pour la même quantité de fluide : c'est le PRP qui fait la différence, pas le poids.",
      },
    },

    {
      id: "lecon",
      titre: "La fuite se paie au PRP, pas au kilo",
      note: "La leçon à retenir",
      visuel: {
        motif: "flux",
        titre: "Un même kilo qui fuit, un impact très différent",
        boites: [
          { picto: "💨", titre: "Une fuite d'un kilo", texte: "sur A comme sur B" },
          { picto: "⚖", titre: "Le PRP décide", texte: "3922 pour l'un, 675 pour l'autre" },
          { picto: "🌍", titre: "Un impact très différent", texte: "pour la même fuite", teinte: "danger" },
        ],
        pied: "La fuite ne se paie pas au kilo. Elle se paie au PRP.",
      },
      texte: "<p>Et si les deux machines fuient d'un kilo ? Le même geste manqué n'a pas le même poids climatique selon le fluide.</p>",
      dire: "Une dernière question, pour la route. Et si les deux machines fuient chacune d'un kilo ? Le calcul est le même : ce n'est pas le kilo qui compte, c'est le P R P du fluide qui a fui. La leçon à retenir : une fuite ne se paie pas au kilo. Elle se paie au P R P. C'est pour cela que l'étanchéité et la récupération ne sont jamais de simples formalités.",
      retenir: ["Le PRP fait plus de différence que le poids : une fuite se paie au PRP, pas au kilo."],
      reference: "G2 · la leçon",
    },
  ],

  motFin: "Vous pouvez maintenant revenir à la fiche, ou enchaîner sur les contrôles avant mise en service.",
});
