/* Capsule g1d — « Les organes qui trahissent une fuite » (G1 · code 1.05).
   Contenu repris SANS AJOUT de la fiche g1d de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. */
CAPSULE.declarer({
  id: "g1d",
  fiche: "g1d",
  titre: "Les organes qui trahissent une fuite",
  surtitre: "HABILITATION FLUIDES · G1 · CODE 1.05",
  duree: "environ 8 minutes",
  intro: "Neuf organes du circuit trahissent une fuite avant, pendant ou après qu'elle arrive. Les repérer, c'est déjà commencer le diagnostic.",
  codes: [{ code: "1.05", libelle: "Relier chaque organe courant du circuit à son rôle dans la prévention ou la détection d'une fuite" }],

  visuelAccueil: {
    motif: "cycle",
    titre: "Détendeur gauche, compresseur droite",
    surligne: ["compresseur", "detendeur"],
    points: [
      { titre: "Séparateur d'huile", texte: "juste après le compresseur, côté refoulement" },
      { titre: "Réservoir et voyant liquide", texte: "sur la ligne liquide, juste avant le détendeur" },
      { titre: "Séparateur de liquide", texte: "juste avant le compresseur, côté aspiration" },
    ],
  },

  ecrans: [
    {
      id: "intro",
      titre: "Une fuite ne se voit pas toujours de face",
      note: "Le plan de la visite",
      visuel: {
        motif: "sequence",
        titre: "Quatre familles d'organes, dans l'ordre de la visite",
        etapes: [
          { titre: "Ce qu'on voit", texte: "voyant, pastille" },
          { titre: "Ce qui pilote", texte: "thermostat, pressostats, dégivrage" },
          { titre: "Ce qui protège", texte: "protecteurs, séparateurs" },
          { titre: "Ce qui stocke", texte: "réservoir" },
        ],
        pied: "Neuf organes, quatre familles : pour ne pas se perdre.",
      },
      texte: "<p>Une fuite ne se voit pas toujours de face. Mais plusieurs organes du circuit la <b>trahissent</b> : ils changent d'aspect, se mettent en sécurité, ou limitent les dégâts.</p><p>Pour ne pas se perdre, on les range en <b>quatre familles</b> : ce qu'on voit, ce qui pilote, ce qui protège, ce qui stocke.</p>",
      dire: "Un technicien expérimenté ne cherche pas une fuite qu'avec un détecteur : il observe le circuit, parce que plusieurs organes changent de comportement quand quelque chose ne va pas. Certains changent d'aspect, d'autres se mettent en sécurité, d'autres encore limitent les dégâts. Pour s'y retrouver, cette capsule les range en quatre familles faciles à retenir : ce qu'on voit, ce qui pilote, ce qui protège et ce qui stocke. Avec ces repères, vous saurez où porter votre regard en arrivant devant une installation. D'abord, un rappel : où se placent ces organes sur la croix du frigoriste.",
      reference: "Code 1.05 · le plan de la visite",
    },

    {
      id: "croix",
      titre: "Où se logent ces organes sur la croix",
      note: "La convention absolue",
      visuel: {
        motif: "cycle",
        titre: "Détendeur gauche, compresseur droite",
        surligne: ["compresseur", "detendeur"],
        points: [
          { titre: "Séparateur d'huile", texte: "juste après le compresseur, côté refoulement" },
          { titre: "Réservoir et voyant liquide", texte: "sur la ligne liquide, juste avant le détendeur" },
          { titre: "Séparateur de liquide", texte: "juste avant le compresseur, côté aspiration" },
        ],
      },
      texte: "<p>Rappel de la croix du frigoriste : <b>détendeur à gauche</b>, <b>compresseur à droite</b>, <b>condenseur en haut</b>, <b>évaporateur en bas</b>.</p><p>Le <b>séparateur d'huile</b> se loge côté compresseur, sur le refoulement. Le <b>réservoir</b> et le <b>voyant liquide</b> se trouvent sur la ligne liquide, juste avant le détendeur. Le <b>séparateur de liquide</b> se loge côté compresseur, sur l'aspiration.</p>",
      dire: "Avant d'aller plus loin, retrouvons la croix du frigoriste, toujours dessinée de la même façon : en haut, le condenseur ; en bas, l'évaporateur ; à gauche, le détendeur ; à droite, le compresseur. Placez maintenant les organes de cette capsule. Autour du compresseur, deux séparateurs : celui d'huile à sa sortie, sur le refoulement, et celui de liquide à son entrée, sur l'aspiration. Sur la ligne qui va du condenseur au détendeur, juste avant celui-ci, on trouve le voyant liquide, et avec lui le réservoir. Repérez-les sur le dessin : vous saurez où regarder sur une vraie installation.",
      retenir: ["Séparateur d'huile et séparateur de liquide sont côté compresseur (refoulement et aspiration). Réservoir et voyant liquide sont juste avant le détendeur."],
      reference: "Code 1.05 · la croix du frigoriste",
    },

    {
      id: "valves",
      titre: "Les valves : chacune son point faible",
      note: "Famille : ce qui isole",
      visuel: {
        motif: "checklist",
        titre: "Quatre valves, quatre points à surveiller",
        items: [
          { titre: "Robinet à boule ou à soupape", texte: "le presse-étoupe est un point de fuite classique" },
          { titre: "Robinet à diaphragme", texte: "une membrane souple, donc moins d'usure" },
          { titre: "Vanne solénoïde", texte: "isole la réserve de fluide à l'arrêt" },
          { titre: "Vanne 4 voies", texte: "inverse le cycle ; beaucoup de brasures, une pièce mobile" },
        ],
        pied: "Chaque valve isole une portion de circuit, à sa manière.",
      },
      texte: "<p>Le <b>robinet à boule</b> et le <b>robinet à soupape</b> isolent une portion de circuit ; leur presse-étoupe est un point de fuite classique. Le <b>robinet à diaphragme</b> n'a pas cette tige : une membrane souple assure l'étanchéité.</p><p>La <b>vanne solénoïde</b> isole la réserve de fluide à l'arrêt. La <b>vanne 4 voies</b> inverse le cycle : beaucoup de raccords brasés et une pièce mobile, donc plusieurs points à surveiller.</p>",
      dire: "Premier groupe d'organes : ceux qui servent à isoler une partie du circuit. Le robinet à boule et celui à soupape ont tous deux une tige de manœuvre, serrée par un presse-étoupe : c'est là qu'une fuite apparaît souvent. Pas de tige, en revanche, sur le robinet à diaphragme : c'est une membrane souple qui fait le joint, et elle s'use moins. La vanne électromagnétique, qu'on appelle aussi solénoïde, s'ouvre et se ferme sur commande électrique : à l'arrêt, elle enferme la réserve de fluide. Enfin, la vanne quatre voies, qui fait passer la machine du froid au chaud, cumule de nombreuses brasures et une pièce qui bouge : autant de points à surveiller.",
      retenir: ["Le presse-étoupe d'un robinet à boule ou à soupape est un point de fuite classique."],
      reference: "Code 1.05 · les valves",
    },

    {
      id: "ce-qu-on-voit",
      titre: "Ce qu'on voit à l'œil",
      note: "Famille : voyant et pastille",
      visuel: {
        motif: "checklist",
        titre: "Le voyant liquide, en régime stable",
        items: [
          { titre: "Voyant liquide, régime stable", texte: "doit rester net, sans bulle" },
          { titre: "Des bulles qui persistent", texte: "manque de charge, souvent une fuite", refus: true },
          { titre: "Pastille d'humidité", texte: "change de couleur selon l'eau ; grille propre à chaque fabricant" },
          { titre: "Voyant d'huile", texte: "un niveau qui baisse sans explication doit alerter" },
        ],
        pied: "Ce qu'on voit à l'œil, avant même de brancher un instrument.",
      },
      texte: "<p>Le <b>voyant liquide</b> est un hublot sur la ligne liquide. En <b>régime stable</b>, il doit rester net, sans bulle. Des <b>bulles qui persistent</b> montrent un manque de charge — souvent une fuite.</p><p>La <b>pastille d'humidité</b>, intégrée au voyant, change de couleur selon l'eau présente ; la grille de lecture est propre à chaque fabricant. Le <b>voyant d'huile</b> du compresseur : un niveau qui baisse sans explication doit alerter, car l'huile s'échappe avec le fluide par une fuite.</p>",
      dire: "Passons à ce que vos yeux peuvent contrôler sans le moindre appareil. Sur la ligne liquide, un petit hublot permet de regarder le fluide passer : c'est le voyant. Une fois la machine stabilisée, le liquide doit y apparaître limpide. Si des bulles continuent de défiler, le circuit manque de fluide, et une fuite en est souvent la cause. Dans le voyant lui-même, une pastille change de teinte quand le circuit contient de l'eau ; pour la lire, fiez-vous à la grille du fabricant. Dernier regard, sur le compresseur : si son niveau d'huile baisse sans raison, méfiance, car l'huile part avec le fluide quand il fuit.",
      reference: "Code 1.05 · voyant et pastille",
      controle: {
        enonce: "Sur une installation en régime stable (pas au démarrage, pas juste après un dégivrage), le voyant liquide laisse voir un défilé continu de bulles. Que faut-il en penser ?",
        choix: [
          "Rien : c'est le fonctionnement normal d'un voyant liquide",
          "Le circuit manque probablement de fluide : une fuite est possible",
          "Le compresseur aspire trop de liquide",
          "Le dégivrage doit se déclencher",
        ],
        bonne: 1,
        explication: "En régime stable, un voyant liquide propre montre du liquide plein tube, sans bulle. Des bulles qui persistent trahissent un mélange liquide + vapeur, donc un manque de charge — souvent une fuite. Quelques bulles transitoires au démarrage ou après un dégivrage sont normales ; c'est leur persistance en régime stable qui doit alerter.",
      },
    },

    {
      id: "ce-qui-pilote",
      titre: "Deux pressostats, pas un",
      note: "Le piège classique de l'examen",
      visuel: {
        motif: "duo",
        titre: "Régulation ou sécurité : deux rôles différents",
        cartes: [
          { titre: "PRESSOSTAT DE RÉGULATION", picto: "🔄", pour: "le fonctionnement normal", texte: "coupe et relance le compresseur ; trop tôt, ça peut signaler un manque de charge" },
          { titre: "PRESSOSTAT DE SÉCURITÉ", picto: "🛑", pour: "l'anomalie", texte: "protège contre une pression anormale ; pas fait pour cycler en continu" },
        ],
        lien: "≠",
        pied: "Les confondre désactive une protection sans que ça se voie.",
      },
      texte: "<p>Le <b>thermostat</b> pilote le compresseur selon la température. Le <b>pressostat de régulation</b> fait pareil selon la pression : il coupe et relance en fonctionnement normal.</p><p>À ne pas confondre avec le <b>pressostat de sécurité</b>, qui protège contre une pression anormale. Un pressostat de régulation qui coupe trop tôt peut signaler un manque de charge, donc une fuite. Les <b>contrôles du dégivrage</b> comptent aussi : un givre anormal peut trahir un manque de fluide.</p>",
      dire: "Famille suivante : les organes qui commandent la machine. Le thermostat met le compresseur en route ou l'arrête d'après la température. Le pressostat de régulation agit pareil, mais d'après la pression : dans la marche normale, c'est lui qui arrête et redémarre. Le pressostat de sécurité, lui, n'a pas du tout le même rôle : il n'intervient que si la pression devient anormale, et il n'est pas fait pour couper sans arrêt. Les confondre revient à supprimer une protection sans que personne ne s'en aperçoive. Côté fuite, deux indices : si celui de régulation déclenche trop vite, le circuit manque peut-être de fluide, et un givre qui sort de l'ordinaire peut trahir la même chose.",
      retenir: ["Pressostat de <b>régulation</b> : pilote le fonctionnement normal. Pressostat de <b>sécurité</b> : protège contre une pression anormale. Les deux sont différents."],
      reference: "Code 1.05 · les deux pressostats",
    },

    {
      id: "ce-qui-protege",
      titre: "Ce qui protège, ce qui stocke",
      note: "Famille : protecteurs, séparateurs, réservoir",
      visuel: {
        motif: "alerte",
        titre: "Trois organes qui empêchent la casse",
        vignettes: [
          { picto: "🛡", etiquette: "la soupape", titre: "Soupape de sécurité", texte: "relâche elle-même du fluide dans l'air : une fuite volontaire, réglée pour l'urgence" },
          { picto: "💧", etiquette: "aspiration", titre: "Séparateur de liquide", texte: "évite le coup de liquide au compresseur" },
          { picto: "🛢", etiquette: "refoulement", titre: "Séparateur d'huile", texte: "renvoie l'huile entraînée au compresseur" },
        ],
        pied: "Ils empêchent qu'une anomalie ne tourne à la casse.",
      },
      texte: "<p>La <b>protection thermique</b> du compresseur et la <b>soupape de sécurité</b> empêchent qu'une anomalie ne tourne à la casse. Une soupape de sécurité qui s'ouvre relâche elle-même du fluide dans l'atmosphère : une fuite volontaire, réglée pour l'urgence.</p><p>Le <b>séparateur de liquide</b>, sur l'aspiration, évite un <b>coup de liquide</b> au compresseur. Le <b>séparateur d'huile</b>, sur le refoulement, renvoie l'huile au compresseur. La <b>bouteille de liquide</b> stocke le fluide condensé ; l'isoler avant une intervention limite la quantité qui pourrait fuir.</p>",
      dire: "Restent deux familles : les organes qui protègent la machine, et celui qui garde le fluide en réserve. Côté sécurité, le compresseur dispose de sa protection thermique, et le circuit de sa soupape de sécurité : tous deux agissent avant qu'un défaut ne casse quelque chose. La soupape mérite une remarque : quand elle s'ouvre, elle laisse partir du fluide à l'air libre, volontairement, c'est une fuite prévue pour l'urgence. Les deux séparateurs, eux, veillent sur le compresseur : celui de l'aspiration l'empêche d'avaler du liquide, celui du refoulement lui rend son huile. Enfin, la bouteille de liquide sert de réservoir : l'isoler avant d'intervenir limite ce qui pourrait s'échapper.",
      reference: "Code 1.05 · protecteurs et séparateurs",
    },

    {
      id: "bilan",
      titre: "Le rôle est le même, l'exigence change",
      note: "Fluides sensibles, et ce qu'il faut retenir",
      visuel: {
        motif: "flux",
        titre: "Les mêmes organes, une exigence différente",
        boites: [
          { picto: "🔧", titre: "Les mêmes organes", texte: "sur toute installation" },
          { picto: "⚠", titre: "Un fluide sensible", texte: "hydrocarbures, ammoniac, ou CO₂ à haute pression", teinte: "danger" },
          { picto: "🔒", titre: "Des exigences renforcées", texte: "propres à chaque fluide" },
        ],
        pied: "Le rôle est le même ; le niveau d'exigence change avec le fluide.",
      },
      texte: "<p>Sur les fluides très inflammables ou toxiques (hydrocarbures, ammoniac) et sur le <b>CO₂</b>, qui travaille à haute pression, ces mêmes organes existent, mais avec des exigences renforcées propres à chaque fluide.</p>",
      dire: "Pour conclure, une précision sur les fluides particuliers. Avec les hydrocarbures ou l'ammoniac, très inflammables ou toxiques, et avec le dioxyde de carbone, qui fonctionne sous très forte pression, vous retrouverez exactement les mêmes organes. Leur rôle reste identique ; ce qui change, c'est le niveau d'exigence, propre à chaque fluide. Deux rappels pour finir. Ne confondez jamais les deux pressostats : prendre celui de sécurité pour celui de régulation, c'est supprimer une protection sans le voir. Et avant d'intervenir sur un pressostat, un thermostat ou une vanne solénoïde, consignez : ces organes sont électriques.",
      piege: "<p>Le <b>pressostat de régulation</b> pilote le fonctionnement normal ; le <b>pressostat de sécurité</b> protège contre une pression anormale et n'est pas fait pour cycler en continu. Les confondre désactive une protection sans que ça se voie. Et avant toute intervention sur une vanne solénoïde, un thermostat ou un pressostat : <b>consignation électrique</b>, ce sont des organes électriques.</p>",
      reference: "Code 1.05 · fluides sensibles",
      controle: {
        enonce: "Un pressostat de régulation coupe le compresseur anormalement tôt, alors que rien d'autre n'a changé. Que peut-on soupçonner ?",
        choix: [
          "Un manque de charge, donc une fuite possible",
          "Un excès de charge",
          "Une panne du séparateur d'huile",
          "Rien : c'est un réglage normal",
        ],
        bonne: 0,
        explication: "Un pressostat de régulation qui coupe trop tôt peut signaler un manque de charge — donc une fuite. C'est un signal indirect, à croiser avec le voyant liquide et les autres organes.",
      },
    },
  ],

  motFin: "Vous pouvez maintenant revenir à la fiche pour lire le texte complet, ou enchaîner sur l'histoire de la réglementation.",
});
