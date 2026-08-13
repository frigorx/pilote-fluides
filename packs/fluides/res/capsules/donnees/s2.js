/* Capsule s2 — « Le froid brûle — projections et gelures » (Sécurité · code 12.02).
   Contenu repris SANS AJOUT de la fiche s2 de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. */
CAPSULE.declarer({
  id: "s2",
  fiche: "s2",
  titre: "Le froid brûle — projections et gelures",
  surtitre: "HABILITATION FLUIDES · SÉCURITÉ · CODE 12.02",
  duree: "environ 5 minutes",
  intro: "Un flexible qu'on pense vide, un raccord qu'on desserre : le liquide qui reste jaillit et gèle la peau au contact. Le réflexe qui évite tout ça tient en un geste.",
  codes: [
    { code: "12.02", libelle: "Connaître le matériel de sécurité obligatoire : détection de gaz, ventilation, EPI." },
  ],

  visuelAccueil: {
    motif: "flux",
    titre: "Pourquoi un liquide sous pression brûle par le froid",
    boites: [
      { picto: "💧", titre: "Le liquide", texte: "sous pression dans le circuit" },
      { picto: "💨", titre: "La détente brutale", texte: "il retrouve la pression de l'air d'un coup, il s'évapore", teinte: "danger" },
      { picto: "🥶", titre: "La brûlure froide", texte: "cette évaporation absorbe la chaleur de la peau qu'il touche", teinte: "danger" },
    ],
  },

  ecrans: [
    {
      id: "flexible-vide",
      titre: "« Ce tronçon est vide » — vraiment ?",
      note: "La situation",
      visuel: {
        motif: "alerte",
        titre: "Le cas type, sur un manifold",
        vignettes: [
          { picto: "🔧", etiquette: "ce qu'on pense", titre: "Le tronçon est vide", texte: "la vanne n'a pas été vérifiée, le manomètre pas relu" },
          { picto: "💦", etiquette: "ce qui arrive", titre: "Le liquide restant jaillit", texte: "au desserrage, dans l'axe du raccord" },
          { picto: "🧤", etiquette: "ce qui protège", titre: "Vérifier avant de desserrer", texte: "manomètre à zéro, gants et lunettes déjà en place" },
        ],
        pied: "Vous déconnectez un flexible de manifold en pensant le tronçon vide : c'est là que ça arrive.",
      },
      texte: "<p>Le cas type : vous déconnectez un flexible de <b>manifold</b> (l'appareil à manomètres) en pensant le tronçon vide. La vanne n'a pas été vérifiée, le manomètre pas relu.</p><p>Le liquide restant jaillit au desserrage — dans l'axe du raccord.</p>",
      dire: "Voici le cas le plus fréquent. Vous déconnectez un flexible de manifold, l'appareil à manomètres, en pensant que le tronçon est vide. La vanne n'a pas été vérifiée, le manomètre pas relu. Et le liquide qui restait à l'intérieur jaillit au moment où vous desserrez, dans l'axe du raccord, droit devant vous.",
      reference: "Code 12.02 · la situation",
    },

    {
      id: "brulure-froide",
      titre: "Une brûlure, mais par le froid",
      note: "Le mécanisme",
      visuel: {
        motif: "flux",
        titre: "Ce qui se passe au moment du jet",
        boites: [
          { picto: "💧", titre: "Le liquide", texte: "sous pression dans le circuit" },
          { picto: "💨", titre: "La détente", texte: "il retrouve la pression de l'air d'un coup, il s'évapore", teinte: "danger" },
          { picto: "🥶", titre: "La brûlure froide", texte: "l'évaporation absorbe la chaleur de la peau touchée, les tissus gèlent", teinte: "danger" },
        ],
        pied: "C'est le même résultat qu'une brûlure classique, mais par le froid plutôt que par la chaleur.",
      },
      texte: "<p>Un fluide frigorigène liquide est sous pression. Dès qu'il retrouve la pression de l'air ambiant, il s'évapore d'un coup. Cette évaporation absorbe une grande quantité de chaleur autour de lui, y compris sur la peau qu'il touche.</p><p>Ce contact provoque une <b>brûlure froide</b>, aussi appelée <b>gelure</b> : les tissus gèlent presque instantanément.</p>",
      dire: "Comprenons pourquoi ça brûle. Un fluide frigorigène liquide est sous pression. Dès qu'il retrouve la pression de l'air ambiant, il s'évapore d'un coup. Cette évaporation absorbe une grande quantité de chaleur tout autour de lui, y compris sur la peau qu'il touche. Ce contact provoque une brûlure froide, aussi appelée gelure : les tissus gèlent presque instantanément. C'est exactement le même résultat qu'une brûlure classique, mais par le froid plutôt que par la chaleur.",
      reference: "Code 12.02 · le mécanisme",
    },

    {
      id: "yeux-ammoniac",
      titre: "Les yeux, et un cas à part : l'ammoniac",
      note: "Une exposition particulière",
      visuel: {
        motif: "duo",
        titre: "Un risque qui s'ajoute avec l'ammoniac",
        cartes: [
          { titre: "FLUIDES FLUORÉS", picto: "🥶", pour: "Le cas général", texte: "brûlure froide au contact" },
          { titre: "AMMONIAC LIQUIDE", picto: "⚠", pour: "Un cas à part", texte: "brûlure froide ET brûlure chimique : il ne se comporte pas comme les fluides fluorés" },
        ],
        lien: "+",
        pied: "Les yeux sont particulièrement exposés : un jet de liquide est souvent invisible et rapide.",
      },
      texte: "<p>Les yeux sont particulièrement exposés : un jet de liquide est souvent invisible et rapide, et l'œil n'a pas de réflexe de protection efficace contre lui.</p><p>Un contact avec de l'<b>ammoniac</b> liquide ajoute une <b>brûlure chimique</b> à la brûlure froide : ce fluide n'appartient pas à la même famille que les fluides fluorés, et ne se comporte pas comme eux.</p>",
      dire: "Un mot sur les yeux, et sur un fluide à part. Les yeux sont particulièrement exposés : un jet de liquide est souvent invisible et rapide, et l'œil n'a pas de réflexe de protection efficace contre lui. Et si le fluide est de l'ammoniac liquide, un second danger s'ajoute : une brûlure chimique, en plus de la brûlure froide. L'ammoniac n'appartient pas à la même famille que les fluides fluorés, et il ne se comporte pas comme eux.",
      retenir: ["Un contact avec l'ammoniac liquide ajoute une brûlure chimique à la brûlure froide : ce fluide ne se comporte pas comme les fluides fluorés."],
      reference: "Code 12.02 · l'exposition des yeux",
      controle: {
        enonce: "Un contact avec de l'ammoniac liquide provoque...",
        choix: [
          "Une brûlure froide, exactement comme avec un fluide fluoré",
          "Une brûlure chimique seulement, sans effet du froid",
          "Une brûlure froide ET une brûlure chimique, car l'ammoniac ne se comporte pas comme les fluides fluorés",
          "Aucune brûlure, l'ammoniac étant moins dangereux que les fluides fluorés",
        ],
        bonne: 2,
        explication: "L'ammoniac liquide provoque les deux à la fois : la brûlure froide, comme tout fluide qui s'évapore d'un coup, et une brûlure chimique en plus, car il n'appartient pas à la même famille que les fluides fluorés.",
      },
    },

    {
      id: "avant-de-desserrer",
      titre: "Ce qu'on vérifie avant de desserrer",
      note: "Le protocole",
      visuel: { svg: "secu-projection.svg", alt: "Le liquide jaillit dans l'axe du raccord : on se place hors de cet axe, on vérifie au manomètre que la pression est nulle, et on porte gants et lunettes." },
      legende: "Hors de l'axe du raccord, manomètre vérifié, gants et lunettes déjà en place.",
      texte: "<p>Mettez vos <b>EPI</b> (équipements de protection individuelle) — ici, gants et lunettes — avant toute manipulation d'un circuit sous pression. <b>Vérifiez au manomètre</b> que la pression est nulle, et que la vanne est fermée, avant de débrancher un flexible ou de desserrer un raccord.</p><p><b>Desserrez progressivement</b>, jamais d'un coup, et restez hors de la trajectoire d'un éventuel jet.</p>",
      dire: "Voici les réflexes qui protègent. D'abord, les équipements de protection individuelle — gants et lunettes — avant toute manipulation d'un circuit sous pression. Ensuite, vérifiez au manomètre que la pression est nulle, et que la vanne est fermée, avant de débrancher un flexible ou de desserrer un raccord. Desserrez progressivement, jamais d'un coup, et placez-vous hors de la trajectoire d'un éventuel jet, comme sur ce schéma.",
      retenir: ["Avant de desserrer : vanne fermée et manomètre à zéro, toujours vérifiés ensemble."],
      reference: "Code 12.02 · les réflexes",
      controle: {
        enonce: "Vous devez déconnecter un flexible de manifold. Que vérifiez-vous avant de le desserrer ?",
        choix: [
          "Que le flexible est bien enroulé.",
          "Que le fluide utilisé n'a pas d'odeur.",
          "Que la vanne est fermée, et que le manomètre affiche une pression nulle.",
          "Que le compresseur est à l'arrêt depuis longtemps.",
        ],
        bonne: 2,
        explication: "Un reste de liquide sous pression peut jaillir dès qu'on desserre un raccord. Seule la lecture du manomètre, vanne fermée, garantit qu'il n'y a plus de pression avant de débrancher. Gants et lunettes restent nécessaires dans tous les cas.",
      },
    },

    {
      id: "si-projection",
      titre: "Si la projection arrive quand même",
      note: "À emporter",
      visuel: {
        motif: "alerte",
        titre: "La conduite à tenir",
        vignettes: [
          { picto: "💦", etiquette: "ce qui arrive", titre: "Projection sur la peau ou les yeux", texte: "malgré les précautions, un jet peut encore surprendre" },
          { picto: "🥶", etiquette: "ce qu'on ressent", titre: "Une brûlure froide immédiate", texte: "et une brûlure chimique en plus, si c'est de l'ammoniac" },
          { picto: "🚿", etiquette: "ce qu'on fait", titre: "Rincer sans frotter, consulter", texte: "la conduite précise figure sur la FDS du fluide utilisé" },
        ],
      },
      texte: "<p>En cas de projection sur la peau ou les yeux : <b>rincez sans frotter</b>, et consultez. La conduite à tenir précise figure sur la <b>FDS</b> (fiche de données de sécurité) du fluide utilisé.</p>",
      dire: "Pour finir, si malgré tout une projection arrive. Rincez sans frotter, et consultez. La conduite à tenir précise figure toujours sur la fiche de données de sécurité du fluide utilisé sur le chantier. Mais le meilleur soin reste celui qu'on n'a pas besoin de donner : gants, lunettes, et manomètre vérifié avant de desserrer quoi que ce soit.",
      piege: "<p>Débrancher un flexible ou desserrer un raccord sous pression <b>sans vérifier au manomètre</b> qu'il est vide, ou le faire sans gants ni lunettes.</p><p>Conséquence : projection de liquide qui gèle la peau ou les yeux au contact. Risque de lésion oculaire grave.</p>",
      reference: "Code 12.02 · le geste interdit",
    },
  ],

  motFin: "Vous pouvez maintenant revenir à la fiche pour lire le texte complet, ou enchaîner sur la fiche suivante : la flamme interdite.",
});
