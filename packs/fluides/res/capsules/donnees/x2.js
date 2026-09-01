/* Capsule x2 — « Exercice, la machine ne fait plus de froid » (G8 · G9).
   Contenu repris SANS AJOUT de la fiche x2 de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. C'est un
   exercice : la capsule fait chercher, elle ne refait pas le cours. */
CAPSULE.declarer({
  id: "x2",
  fiche: "x2",
  titre: "Exercice — la machine ne fait plus de froid",
  surtitre: "HABILITATION FLUIDES · G8 · G9 · EXERCICE",
  duree: "environ 6 minutes",
  intro: "Une chambre positive qui ne redescend plus, un compresseur qui tourne pourtant normalement : à vous de lire les indices avant de conclure. Cette capsule ne refait pas le cours sur les composants, elle vous fait chercher, comme sur un vrai chantier.",
  codes: [
    { code: "4.04", libelle: "Interpréter des mesures par la méthode indirecte" },
    { code: "8.08", libelle: "Réaliser les mesures en fonctionnement" },
  ],

  visuelAccueil: {
    motif: "sequence",
    titre: "Une panne à décoder, indice par indice",
    etapes: [
      { titre: "La situation", texte: "un cas de terrain" },
      { titre: "Les indices", texte: "ce que vous mesurez" },
      { titre: "Le raisonnement", texte: "on élimine les fausses pistes" },
      { titre: "La réponse", texte: "et ce qu'elle apprend" },
    ],
  },

  ecrans: [
    {
      id: "chambre-qui-stagne",
      titre: "Une chambre positive qui ne redescend plus",
      note: "Le point de départ",
      visuel: {
        motif: "flux",
        titre: "Un compresseur qui tourne, un froid qui ne vient pas",
        boites: [
          { picto: "⚙", titre: "Le compresseur", texte: "il tourne, rien d'anormal à l'oreille" },
          { picto: "🌡", titre: "La chambre", texte: "la température ne redescend plus", teinte: "danger" },
        ],
        pied: "Avant de sortir vos instruments : qu'est-ce qui peut expliquer ça ?",
      },
      texte: "<p>Chambre froide positive. Le compresseur tourne, rien d'anormal à l'oreille. Mais la température de la chambre ne redescend plus.</p><p>Avant de sortir la pince et le manifold : qu'est-ce qui peut expliquer qu'un compresseur qui tourne ne fasse plus de froid ?</p>",
      dire: "Vous intervenez sur une chambre froide positive. Le compresseur tourne, on l'entend, rien d'anormal de ce côté-là. Mais la température de la chambre ne redescend plus. Avant même de sortir la pince et le manifold, demandez-vous : qu'est-ce qui peut expliquer qu'un compresseur qui tourne ne fasse plus de froid ? Prenez trente secondes avant de passer à l'écran suivant.",
      reference: "Fiche x2 · G8 · G9 · exercice",
    },

    {
      id: "quatre-releves",
      titre: "Quatre relevés, trois qui sortent du cadre",
      note: "Ce que vous mesurez",
      visuel: {
        motif: "checklist",
        titre: "Ce que vous relevez sur la machine",
        items: [
          { titre: "Basse pression", texte: "anormalement basse", refus: true },
          { titre: "Surchauffe à l'aspiration", texte: "très élevée, autour de 20 K", refus: true },
          { titre: "Sous-refroidissement", texte: "quasi nul, bulles au voyant", refus: true },
          { titre: "Trace d'huile", texte: "aucune visible au premier examen", refus: false },
        ],
        pied: "Quatre relevés. Trois sortent nettement de la plage attendue.",
      },
      texte: "<p>Vous prenez vos mesures.</p><ul><li>Basse pression <b>anormalement basse</b>.</li><li>Surchauffe à l'aspiration <b>très élevée</b>, de l'ordre de 20 K, alors qu'on en attend 5 à 10.</li><li>Sous-refroidissement <b>quasi nul</b>, avec des <b>bulles</b> au voyant liquide, alors qu'on en attend 4 à 8.</li><li>Aucune trace d'huile visible au premier examen.</li></ul>",
      dire: "Regardons ce que vous avez sous les yeux. Premier relevé : la basse pression est anormalement basse. Deuxième relevé : la surchauffe à l'aspiration est très élevée, autour de vingt kelvins, alors qu'on en attend entre cinq et dix. Troisième relevé : le sous-refroidissement est quasi nul, avec des bulles au voyant liquide, alors qu'on en attend entre quatre et huit. Et au premier examen, vous ne voyez aucune trace d'huile. Quatre relevés, et trois sortent nettement de la plage attendue.",
      reference: "Codes 4.04 · 8.08 · les relevés",
    },

    {
      id: "detendeur-ou-charge",
      titre: "Une piste tentante, et une qui explique tout",
      note: "On élimine, un indice à la fois",
      visuel: {
        motif: "duo",
        titre: "Une seule cause doit expliquer les trois indices",
        cartes: [
          { titre: "DÉTENDEUR BOUCHÉ ?", picto: "🔧", pour: "Tentant, mais incomplet", texte: "Expliquerait la surchauffe élevée. Pas le sous-refroidissement effondré, ni les bulles au voyant." },
          { titre: "MANQUE DE CHARGE", picto: "📉", pour: "Explique les trois indices", texte: "BP basse, surchauffe élevée, sous-refroidissement nul et bulles : tout colle à la fois." },
        ],
        lien: "≠",
        pied: "On ne conclut jamais sur un relevé isolé.",
      },
      texte: "<p>Une idée vient tout de suite : et si le détendeur était bouché ? Ça collerait avec la surchauffe très élevée.</p><p>Mais un détendeur bouché n'explique ni le sous-refroidissement quasi nul, ni les bulles au voyant liquide. Il faut une seule cause qui explique <b>les trois indices à la fois</b>.</p>",
      dire: "Une idée vient tout de suite à l'esprit : et si le détendeur était bouché ? Ça collerait avec la surchauffe très élevée à l'aspiration. Mais si c'était vraiment ça, on verrait la surchauffe grimper, et rien de plus : le sous-refroidissement resterait dans sa plage normale. Or ici, il s'effondre aussi, avec des bulles au voyant liquide. Un détendeur bouché n'explique donc pas tout. On ne conclut jamais sur un relevé isolé : on cherche la cause qui explique tous les indices à la fois. Ici, il y en a trois qui pointent dans la même direction.",
      retenir: ["On ne conclut pas sur un relevé isolé : la bonne hypothèse explique <b>tous</b> les indices à la fois."],
      reference: "Code 4.04 · méthode indirecte",
    },

    {
      id: "manque-de-charge",
      titre: "Le manque de charge, confirmé par les trois indices",
      note: "La réponse, et pourquoi",
      visuel: { svg: "diagramme-logph.svg", alt: "Le diagramme log pression-enthalpie : trois zones séparées par la courbe de bulle et la courbe de rosée, et le cycle qui s'y trace en quatre transformations. La surchauffe se lit sur le trait du bas, le sous-refroidissement sur le trait du haut." },
      legende: "L'outil pour rejouer la panne : on y place les relevés, et le cycle se trace tout seul.",
      texte: "<p>Les trois indices ensemble désignent un <b>manque de charge</b> : le circuit n'a plus assez de fluide.</p><p>Ce n'est qu'un diagnostic par méthode indirecte — il reste maintenant à <b>localiser la fuite</b> par méthode directe, puis à la consigner.</p>",
      dire: "Mettez les trois indices bout à bout : la basse pression qui s'effondre, la surchauffe qui grimpe, le sous-refroidissement qui disparaît avec des bulles au voyant. Les trois ensemble désignent la même cause : un manque de charge, le circuit n'a plus assez de fluide. C'est un diagnostic par méthode indirecte : il vous dit qu'il manque du fluide, pas où il est parti. Il reste maintenant à localiser la fuite par méthode directe, puis à consigner ce que vous avez fait.",
      reference: "Codes 4.04 · 8.08 · le diagnostic",
      controle: {
        enonce: "Quelle hypothèse explique l'ensemble des relevés ?",
        choix: [
          "Un excès de charge en fluide",
          "Un manque de charge : la fuite est à rechercher",
          "Un condenseur encrassé",
          "Un compresseur en fin de vie",
        ],
        bonne: 1,
        explication: "BP basse + surchauffe élevée + sous-refroidissement effondré + bulles au voyant : le circuit manque de fluide. C'est un diagnostic par méthode indirecte — il reste à localiser la fuite par méthode directe, puis à consigner.",
      },
    },

    {
      id: "localiser-la-fuite",
      titre: "Le réflexe à emporter : le diagnostic ne montre pas l'endroit",
      note: "Ce qu'il reste à faire",
      visuel: { svg: "points-de-fuite.svg", alt: "Les points de fuite les plus fréquents d'une installation frigorifique : compresseur, vanne de service, accessoires de la ligne liquide, coude brasé, raccord mécanique de l'évaporateur, supports de la ligne d'aspiration." },
      legende: "La méthode indirecte dit qu'il manque du fluide. La méthode directe dit où il est parti — en général l'un de ces points.",
      texte: "<p>Trouver que le circuit manque de charge n'est pas la fin du travail.</p><p>C'est un diagnostic par méthode indirecte : il reste à <b>localiser la fuite</b> par méthode directe, sur les points qui fuient le plus souvent, puis à <b>consigner</b> ce qui a été trouvé et réparé.</p>",
      piege: "<p>L'erreur : s'arrêter au diagnostic et déclarer « il manque de charge » sans chercher la fuite. Une recharge sans fuite trouvée, c'est une fuite qui reviendra.</p>",
      dire: "Dernier réflexe, et c'est celui qui coûte cher si on l'oublie. Trouver que le circuit manque de charge n'est pas la fin du travail. C'est un diagnostic par méthode indirecte : il vous dit qu'il manque du fluide, pas à quel endroit. Il reste à localiser la fuite par méthode directe, en commençant par les points qui fuient le plus souvent. Puis à consigner ce que vous avez trouvé et réparé. L'erreur classique, c'est de s'arrêter au diagnostic et de recharger sans avoir trouvé la fuite. Une recharge sans fuite trouvée, c'est une fuite qui reviendra.",
      retenir: ["Un diagnostic indirect donne une <b>cause probable</b>, pas un <b>endroit</b>.", "Étape suivante : localiser la fuite par méthode directe, puis consigner."],
      reference: "Codes 4.04 · 8.08 · le réflexe",
    },
  ],

  motFin: "Vous pouvez revenir à la fiche pour rejouer la panne sur le diagramme enthalpique, revoir la méthode indirecte, ou enchaîner sur le détendeur.",
});
