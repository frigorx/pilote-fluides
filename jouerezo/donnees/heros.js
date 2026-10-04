/* =====================================================================
   heros.js — « Le circuit dont vous êtes le héros » (JouéRézo)
   ---------------------------------------------------------------------
   RÔLE : le jeu, son thème et son scénario, joués par le moteur de
   l'aventure (moteur/aventure.js, lancé avec data-jeu="heros").
   L'élève EST la molécule de fluide (l'héroïne du Voyage, dessinée par
   VOYAGE_DESSIN). Elle part de la bouteille de liquide ; à chaque organe
   une énigme. Bonne réponse : elle passe et change d'état (liquide →
   bulles → vapeur → vapeur très chaude → liquide). Mauvaise réponse :
   elle reste sur place (surPlace), un cœur de moins, un indice et la
   station du plan qui explique.
   SE SUFFIT À LUI-MÊME : il ajoute son entrée à JR_JEUX, JR_THEMES et
   JR_AVENTURE (créés au besoin) ; la page heros.html ne charge ni
   themes.js ni aventure.js (données). Pilote : hors de themes.js tant que
   la carte de l'accueil n'est pas décidée (sinon JR.accueil la montrerait
   d'office) — pour la carte, déplacer JR_JEUX.heros et JR_THEMES.heros
   dans themes.js.
   D'OÙ VIENT LE CONTENU — rien d'inventé :
     · rôles et changements d'état : les quatre définitions « à connaître
       par cœur » de la station « Le circuit, organe par organe » et la
       planche HabFluide « Croix du frigoriste : organes, états et énergie » ;
     · phrases : dans l'esprit du récit du Voyage (donnees/voyage.js) ;
     · diagramme : la cloche du R-134a (tables SimuRézo / AquiBlue), reprise
       de donnees/voyage-vis-diagramme.js — cycle simple, SANS CHIFFRES.
   PIÈGES : niveau CAP — phrases courtes, un mot savant jamais sans son
   dessin (la scène et ses pastilles le montrent) ; aucun seuil, aucune
   pression chiffrée ; la molécule est « elle » (vous êtes brûlante…).
   ===================================================================== */
(function () {
  "use strict";
  const CIRCUIT = { t: "Le circuit, organe par organe (station du plan)", h: "../packs/fluides/res/circuit-organe-par-organe/" };
  const CROIX = { t: "La croix du frigoriste : organes, états et énergie", h: "../f/a-croix-frigoriste-etats/" };

  window.JR_JEUX = window.JR_JEUX || {};
  window.JR_THEMES = window.JR_THEMES || {};
  window.JR_AVENTURE = window.JR_AVENTURE || {};

  window.JR_JEUX.heros = { nom: "Le circuit dont vous êtes le héros", lettre: "H", emoji: "💧",
    phrase: "Vous êtes une molécule de fluide frigorigène. Faites le tour du circuit : à chaque organe, une énigme.",
    regle: "Quatre organes, quatre énigmes, trois cœurs. Une bonne réponse vous fait passer l'organe : vous changez d'état. Une mauvaise vous laisse sur place, avec un indice et la station à revoir." };

  window.JR_THEMES.heros = [
    { id: "froid", nom: "La chambre froide (R-134a)", emoji: "🧊",
      portes: [CIRCUIT, CROIX,
        { t: "Voyage dans tous ses états : le circuit raconté par la molécule", h: "../voyage/module.html" },
        { t: "Du glaçon au circuit : la chaleur qui se déplace", h: "../packs/fluides/res/chaleur-interactive/" },
        { t: "Le diagramme enthalpique, courbe par courbe", h: "../packs/fluides/res/diagramme-enthalpique/" }] }
  ];

  /* une scène dessinée = un emplacement que donnees/heros-scenes.js remplit (id de la scène) */
  const dessin = id => '<div class="heros-scene" data-heros="' + id + '"></div>';

  window.JR_AVENTURE.froid = {
    titre: "Le circuit dont vous êtes le héros",
    vignette: dessin("depart"),
    intro: [
      "Vous êtes une molécule de fluide frigorigène : du R-134a. Vous vivez dans le circuit fermé d'une chambre froide.",
      "Vous partez du fond de la bouteille de liquide. Vous êtes liquide, à haute pression.",
      "Quatre organes vous attendent. Faites le tour complet, et revenez liquide."
    ],
    /* les mots du moteur pour ce jeu (sinon : ceux de « Nuit à l'atelier ») */
    mots: { entrer: "Partir", compte: "Du premier coup", unite: "organes passés du premier coup",
      ok: "✓ Vous passez. ", nok: "✗ Vous restez sur place. " },
    surPlace: true, /* une mauvaise réponse ne fait pas avancer : on rejoue la même scène */
    finMontree: true, /* fin gagnée : la dernière scène (le cycle sur le diagramme) entre dans le panneau de fin */
    scenes: [
      { titre: "Le détendeur", vignette: dessin("detendeur"),
        texte: ["Vous sortez de la bouteille. Devant vous : le détendeur, le passage le plus étroit du circuit.",
          "Derrière vous, la haute pression. Pour passer, que va-t-il vous arriver ?"],
        choix: [
          { t: "Ma pression chute d'un coup. Je commence à bouillir et je deviens très froide.", bon: true,
            retour: "Vous vous faufilez par un trou minuscule. Votre pression chute : des bulles naissent en vous. Vous voilà très froide, à basse pression." },
          { t: "Ma pression monte, comme dans un pneu qu'on gonfle.", bon: false,
            retour: "Indice : le détendeur ne gonfle rien, c'est un passage étroit. Après lui, la pression est basse. Celui qui fait monter la pression, c'est le compresseur.",
            porte: { t: "Le circuit, organe par organe : le détendeur", h: CIRCUIT.h } },
          { t: "Je deviens une vapeur brûlante.", bon: false,
            retour: "Indice : après le détendeur, le fluide est très froid. C'est ce froid qui servira dans la chambre. La vapeur brûlante, c'est à la sortie du compresseur.",
            porte: CROIX }
        ] },
      { titre: "L'évaporateur", vignette: dessin("evaporateur"),
        texte: ["Vous entrez dans l'évaporateur, dans la chambre froide. Le ventilateur pousse l'air de la chambre sur les ailettes.",
          "Cet air est plus chaud que vous. Que se passe-t-il ?"],
        choix: [
          { t: "Je prends la chaleur de l'air. Je bous, jusqu'à devenir toute vapeur.", bon: true,
            retour: "Vous prenez la chaleur de l'air : il ressort plus froid, la chambre refroidit. Vos dernières gouttes s'évaporent : vous voilà vapeur, toujours à basse pression." },
          { t: "Je donne du froid à l'air de la chambre.", bon: false,
            retour: "Indice : le froid ne se donne pas. On retire de la chaleur. La chaleur va toujours du plus chaud vers le plus froid.",
            porte: { t: "Du glaçon au circuit : la chaleur qui se déplace", h: "../packs/fluides/res/chaleur-interactive/" } },
          { t: "Je redeviens liquide, comme la buée sur une vitre.", bon: false,
            retour: "Indice : redevenir liquide, c'est rendre de la chaleur. Ici, vous en prenez : vous bouillez. Le liquide revient plus loin, au condenseur.",
            porte: { t: "Le circuit, organe par organe : l'évaporateur", h: CIRCUIT.h } }
        ] },
      { titre: "Le compresseur", vignette: dessin("compresseur"),
        texte: ["Vous arrivez au compresseur, le cœur du circuit. Le piston va vous aspirer, puis vous serrer avec vos voisines.",
          "Que se passe-t-il quand on vous serre ?"],
        choix: [
          { t: "Ma pression monte, ma température aussi. Je sors en vapeur très chaude.", bon: true,
            retour: "Le piston vous serre : votre pression monte, et vous chauffez. Vous sortez vapeur très chaude, à haute pression. L'énergie vient du moteur électrique." },
          { t: "On me serre jusqu'à me rendre liquide.", bon: false,
            retour: "Indice : un liquide ne se comprime pas, il casserait les clapets. Le compresseur aspire de la vapeur et refoule de la vapeur. Le liquide revient plus loin, au condenseur.",
            porte: { t: "Le circuit, organe par organe : le compresseur", h: CIRCUIT.h } },
          { t: "Ma pression baisse, je me repose.", bon: false,
            retour: "Indice : serrer, c'est faire monter la pression. Celui qui la fait chuter, c'est le détendeur.",
            porte: { t: "Le compresseur : principe et technologies", h: "../f/a-compresseurs/" } }
        ] },
      { titre: "Le condenseur", vignette: dessin("condenseur"),
        texte: ["Vous voilà dehors, dans le condenseur. Vous êtes brûlante. Le ventilateur pousse l'air de dehors, plus frais que vous.",
          "Que se passe-t-il ?"],
        choix: [
          { t: "Je donne ma chaleur à l'air du dehors. Des gouttes se forment : je redeviens liquide.", bon: true,
            retour: "L'air du dehors emporte votre chaleur : celle prise dans la chambre, et celle du compresseur. Vous refroidissez, puis vous redevenez liquide, toujours à haute pression." },
          { t: "Je prends encore de la chaleur à l'air.", bon: false,
            retour: "Indice : pour redevenir liquide, il faut rendre de la chaleur. Prendre la chaleur, c'est le travail de l'évaporateur.",
            porte: { t: "Le circuit, organe par organe : le condenseur", h: CIRCUIT.h } },
          { t: "Ma pression chute d'un coup.", bon: false,
            retour: "Indice : dans le condenseur, la pression reste haute. C'est le détendeur qui fait chuter la pression.",
            porte: CROIX }
        ] },
      { titre: "Le tour est bouclé", vignette: dessin("fin"),
        texte: ["Vous revoilà liquide, dans la bouteille. Le tour est bouclé.",
          "Sur le diagramme, votre tour fait une boucle. Le détendeur fait chuter la pression. L'évaporateur vous fait bouillir. Le compresseur vous serre. Le condenseur vous rend liquide.",
          "Et vous recommencez : des milliers de tours, pendant des années."],
        choix: [] }
    ],
    finGagnee: "Détendeur, évaporateur, compresseur, condenseur : vous connaissez le chemin. Le fluide fait ce tour sans jamais sortir du circuit.",
    finPerdue: "Plus de cœurs : la molécule reste bloquée en route."
  };

  /* ---------- le diagramme de la fin (moteur/voyage-diagramme.js) ----------
     Cloche du R-134a reprise telle quelle de donnees/voyage-vis-diagramme.js
     (tables SimuRézo / AquiBlue, évaporation −10 °C, condensation +40 °C) ;
     cycle SIMPLE, sans économiseur. chemin : 0 liquide (bouteille) ·
     1 après le détendeur · 2 fin d'ébullition · 3 sortie de l'évaporateur
     (vapeur un peu réchauffée) · 4 refoulement · 5 début de condensation ·
     6 fin de condensation · 7 = 0. Calques : le nom de chaque organe, posé
     hors des tracés, montré quand la molécule a passé l'organe. */
  window.JR_HEROS_DIAGRAMME = {
    fluide: "R134a (forme seule, non affiché)", chiffres: false,
    plage: { h: [150, 520], p: [1, 60] }, pcrit: [40.593, 390.4],
    cloche: [[0.913, 162.9, 381.4], [1.077, 167.5, 383.6], [1.27, 172.3, 385.9], [1.498, 177.3, 388.3], [1.767, 182.5, 390.7],
      [2.085, 188, 393.3], [2.459, 193.7, 395.8], [2.9, 199.6, 398.4], [3.421, 205.9, 401.1], [4.035, 212.5, 403.9],
      [4.759, 219.4, 406.6], [5.613, 226.6, 409.4], [6.621, 234.3, 412.2], [7.809, 242.4, 415.1], [9.211, 251, 417.8],
      [10.864, 260.2, 420.5], [12.814, 269.9, 423], [15.114, 280.3, 425.3], [17.827, 291.6, 427.3], [21.027, 303.8, 428.6],
      [24.801, 317.2, 429], [29.253, 332.2, 427.8], [34.504, 350.1, 423]],
    BP: 2.006, HP: 10.166,
    chemin: [[252, 10.166], [252, 2.006], [392.7, 2.006], [402.9, 2.006], [438.8, 10.166], [419.4, 10.166], [256.4, 10.166], [252, 10.166]],
    zones: [["liquide", 205, 22], ["liquide + vapeur", 330, 6.8], ["vapeur", 478, 25]],
    calques: {
      detendeur: { traits: [], texte: "détendeur", ou: [262, 3.1], ancre: "start", coul: "#2f6fb8" },
      evaporateur: { traits: [], texte: "évaporateur", ou: [322, 1.22], ancre: "middle", coul: "#2f6fb8" },
      compresseur: { traits: [], texte: "compresseur", ou: [416, 2.45], ancre: "start", coul: "#c0392b" },
      condenseur: { traits: [], texte: "condenseur", ou: [338, 14.2], ancre: "middle", coul: "#c9451a" }
    }
  };
})();
