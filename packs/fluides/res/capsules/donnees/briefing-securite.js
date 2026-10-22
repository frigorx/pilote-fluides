/* Capsule briefing-securite — « Donner les consignes de sécurité à l'équipe avant d'intervenir »
   (2nde famille des métiers TNE · CC93 « Informer oralement des consignes de sécurité » ;
   code non attesté dans le codage officiel, affiché avec cette mention).
   Contenu : un briefing oral de deux minutes en cinq temps. Sources : le chapitre « Conduite à tenir en
   cas d'accident » du document de F. Henninot « Consignes de sécurité » (CAP IFCA, C6 : protéger, alerter
   avec le 18 ou le 112 en donnant le lieu exact, la nature, le nombre de blessés et leur état, secourir
   seulement par les gestes appris) ; la préparation de chantier de la capsule p7 (EPI, consignation,
   balisage) ; le reste est de la méthode d'expression orale, sans valeur chiffrée nouvelle.
   Les trois risques de l'exemple (fluide, électricité, zone) sont ceux d'un dépannage de chambre froide :
   à relire par F. Henninot. */
CAPSULE.declarer({
  id: "briefing-securite",
  titre: "Donner les consignes de sécurité à l'équipe avant d'intervenir",
  surtitre: "SÉCURITÉ · BRIEFING DE DÉPART · CC93",
  duree: "environ 6 minutes",
  intro: "Avant de commencer, toute l'équipe doit savoir ce qu'on fait, ce qui est dangereux, qui fait quoi et que faire si ça tourne mal. Ce chapitre vous apprend à le dire à voix haute en deux minutes : quoi dire, dans quel ordre, et comment vérifier que chacun a compris.",
  codes: [
    { code: "CC93", libelle: "Informer oralement des consignes de sécurité" },
  ],

  visuelAccueil: {
    motif: "sequence",
    titre: "Un briefing de deux minutes, en cinq temps",
    etapes: [
      { titre: "Le travail", texte: "ce qu'on fait aujourd'hui" },
      { titre: "Trois risques", texte: "les plus graves" },
      { titre: "Qui fait quoi", texte: "un rôle chacun" },
      { titre: "Si ça tourne mal", texte: "protéger, alerter, secourir" },
      { titre: "Une question", texte: "pour vérifier" },
    ],
    pied: "Toujours dans cet ordre : l'équipe sait où l'on en est.",
  },

  ecrans: [
    {
      id: "pourquoi-dire",
      titre: "Pourquoi le dire à voix haute ?",
      note: "Le point de départ",
      visuel: { img: "../bibliotheque/illu-g12b.webp", alt: "Un technicien en tenue de travail et casque, de dos, devant un groupe extérieur de climatisation ; un extincteur est posé à côté : l'équipe sait ce qu'elle risque et comment réagir." },
      legende: "Avant le premier geste, deux minutes de parole.",
      texte: "<p>Une affiche de sécurité ne protège personne si personne ne l'a lue. Le <b>briefing de départ</b> le dit à voix haute, en deux minutes, à toute l'équipe.</p><p>Chacun sait alors quel est le travail du jour, quels sont les dangers, qui fait quoi, et que faire si ça tourne mal.</p><p><b>Briefing :</b> point rapide donné à l'équipe avant de commencer.</p>",
      dire: "Une affiche de sécurité ne protège personne si personne ne l'a lue. Avant d'intervenir, on le dit à voix haute, à toute l'équipe, en deux minutes. C'est le briefing de départ. Quand il est bien fait, chacun sait quel est le travail du jour, quels sont les dangers, qui fait quoi, et ce qu'on fait si ça tourne mal. Personne ne découvre un danger en le subissant.",
      retenir: ["Le briefing se dit à voix haute, <b>avant</b> le premier geste, à <b>toute</b> l'équipe."],
      reference: "Code CC93 · pourquoi un briefing",
    },

    {
      id: "cinq-temps",
      titre: "Cinq temps, dans cet ordre",
      note: "Le plan du briefing",
      visuel: {
        motif: "sequence",
        titre: "Un briefing de deux minutes",
        etapes: [
          { titre: "Le travail", texte: "ce qu'on fait aujourd'hui" },
          { titre: "Trois risques", texte: "les plus graves du chantier" },
          { titre: "Qui fait quoi", texte: "un rôle par personne" },
          { titre: "Si ça tourne mal", texte: "protéger, alerter, secourir" },
          { titre: "Une question", texte: "pour vérifier" },
        ],
        pied: "Toujours dans cet ordre : l'équipe sait où l'on en est.",
      },
      texte: "<p>Cinq temps : le <b>travail</b> du jour, les <b>trois risques</b>, <b>qui fait quoi</b>, ce qu'on fait <b>si ça tourne mal</b>, puis <b>une question</b> pour vérifier que c'est compris.</p>",
      dire: "Un briefing se dit en cinq temps, toujours dans le même ordre. Un : le travail du jour. Deux : les trois risques les plus graves. Trois : qui fait quoi. Quatre : ce qu'on fait si ça tourne mal. Cinq : une question, pour vérifier que c'est compris. Avec cet ordre, l'équipe sait toujours où vous en êtes.",
      reference: "Code CC93 · l'ordre du briefing",
      controle: {
        enonce: "Dans quel ordre dites-vous les choses ?",
        choix: [
          "Le travail du jour, les risques, qui fait quoi, si ça tourne mal, une question",
          "Si ça tourne mal d'abord, puis le travail du jour",
          "Une question d'abord, puis le reste",
          "Qui fait quoi, puis le travail du jour",
        ],
        bonne: 0,
        explication: "On commence par dire ce qu'on va faire : sans cela, les risques n'ont pas de sens. On finit par une question, pour vérifier que c'est compris.",
      },
    },

    {
      id: "trois-risques",
      titre: "Trois risques, pas dix",
      note: "Choisir ce qu'on dit",
      visuel: {
        motif: "alerte",
        titre: "Un risque, une consigne (exemple d'un dépannage de chambre froide)",
        vignettes: [
          { picto: "🧊", etiquette: "le fluide", titre: "Froid et sous pression", texte: "lunettes et gants dès qu'on ouvre un raccord" },
          { picto: "⚡", etiquette: "l'électricité", titre: "On n'ouvre pas l'armoire", texte: "la consignation est faite par une personne habilitée" },
          { picto: "🚧", etiquette: "la zone", titre: "Un passage, des tiers", texte: "zone balisée, issue dégagée" },
        ],
        pied: "Le chantier d'aujourd'hui peut avoir d'autres dangers : on dit les trois plus graves.",
      },
      texte: "<p>On ne liste pas tous les dangers : on en choisit <b>trois</b>, les plus graves du chantier du jour, et pour chacun <b>une consigne</b>. Dix dangers dits d'un trait, personne n'en retient aucun.</p><p>Exemple pour un dépannage de chambre froide : le fluide, l'électricité, la zone.</p>",
      dire: "On ne liste pas tous les dangers. On en choisit trois, les plus graves du chantier du jour, et pour chacun, une consigne. Dix dangers dits d'un trait, personne n'en retient aucun. Voici un exemple pour un dépannage de chambre froide. Le fluide : il est froid et sous pression, donc lunettes et gants dès qu'on ouvre un raccord. L'électricité : personne n'ouvre l'armoire, la consignation est faite par une personne habilitée. La zone : elle est balisée, et l'issue reste dégagée.",
      reference: "Code CC93 · choisir trois risques",
      controle: {
        enonce: "Vous avez repéré dix dangers sur le chantier. Que dites-vous dans le briefing ?",
        choix: [
          "Les trois plus graves, chacun avec sa consigne",
          "Les dix, à toute vitesse",
          "Aucun : tout le monde les connaît",
          "Je distribue une feuille et je ne dis rien",
        ],
        bonne: 0,
        explication: "Une équipe retient peu de choses à l'oral. Trois dangers, chacun avec sa consigne, se retiennent ; dix ne se retiennent pas.",
      },
    },

    {
      id: "si-ca-tourne-mal",
      titre: "Et si ça tourne mal ?",
      note: "Protéger, alerter, secourir",
      visuel: {
        motif: "sequence",
        titre: "Trois temps, dans cet ordre",
        etapes: [
          { titre: "Protéger", texte: "soi-même, la victime, les autres" },
          { titre: "Alerter", texte: "le 18 ou le 112, le lieu exact" },
          { titre: "Secourir", texte: "seulement les gestes appris" },
        ],
        pied: "Quelqu'un reste auprès de la victime, et on prévient le chef de chantier.",
      },
      texte: "<p>Le briefing dit aussi quoi faire si ça tourne mal : <b>protéger</b>, puis <b>alerter</b>, puis <b>secourir</b>.</p><p>Pour alerter : le <b>18</b> (pompiers), ou le <b>112</b> depuis un portable. On donne le <b>lieu exact</b>, la <b>nature</b> de l'accident, le <b>nombre de blessés</b> et leur <b>état</b>. On ne fait que les gestes appris en formation.</p>",
      dire: "Le briefing dit aussi ce qu'on fait si ça tourne mal. Dans cet ordre : protéger, alerter, secourir. D'abord, on se protège soi-même, la victime et les autres. Ensuite, on alerte : le dix-huit pour les pompiers, ou le cent douze depuis un portable. On donne le lieu exact, ce qui s'est passé, le nombre de blessés et leur état. Quelqu'un reste auprès de la victime, et on prévient le chef de chantier. Enfin, on secourt, mais seulement avec les gestes appris en formation. Les autres gestes peuvent aggraver la situation.",
      retenir: ["<b>Protéger</b>, puis <b>alerter</b>, puis <b>secourir</b> : toujours dans cet ordre.", "Aux secours : le <b>lieu exact</b>, la <b>nature</b>, le <b>nombre de blessés</b>, leur <b>état</b>."],
      reference: "Code CC93 · la conduite à tenir",
      controle: {
        enonce: "Que donnez-vous comme informations aux secours ?",
        choix: [
          "Le lieu exact, la nature de l'accident, le nombre de blessés et leur état",
          "Seulement mon nom",
          "Seulement le nom du magasin",
          "Le prix du chantier",
        ],
        bonne: 0,
        explication: "Les secours ont besoin de savoir où aller et ce qu'ils vont trouver : le lieu exact, ce qui s'est passé, combien de blessés, dans quel état.",
      },
    },

    {
      id: "dire-pas-lire",
      titre: "Dire, pas lire",
      note: "La voix et le regard",
      visuel: {
        motif: "checklist",
        titre: "Ce qui fait un bon briefing oral",
        items: [
          { titre: "Phrases courtes", texte: "une idée par phrase" },
          { titre: "Regarder l'équipe", texte: "pas la feuille" },
          { titre: "Parler lentement", texte: "un risque, une pause" },
          { titre: "Répéter l'essentiel", texte: "la consigne la plus grave, deux fois" },
          { titre: "Lire sa feuille à toute vitesse", texte: "on ne retient rien", refus: true },
          { titre: "Des sigles sans explication", texte: "personne ne comprend", refus: true },
        ],
        pied: "On est compris si l'on est entendu, regardé et écouté.",
      },
      texte: "<p>Un briefing se <b>dit</b>, il ne se lit pas. Phrases courtes, une idée par phrase. On regarde l'équipe. On parle lentement et on <b>répète</b> la consigne la plus grave. Un mot technique est expliqué ou remplacé.</p>",
      dire: "Un briefing se dit, il ne se lit pas. Des phrases courtes, une seule idée par phrase. On regarde l'équipe, pas sa feuille. On parle lentement, avec une pause après chaque risque. Et on répète la consigne la plus grave, deux fois. Un mot technique, on l'explique ou on le remplace par un mot simple.",
      piege: "<p>Le plus fréquent : lire sa feuille, vite, les yeux baissés. L'équipe entend un bruit, pas des consignes.</p>",
      reference: "Code CC93 · dire à voix haute",
      controle: {
        enonce: "Pour que l'équipe retienne la consigne la plus grave, que faites-vous ?",
        choix: [
          "Je la répète deux fois, lentement, en regardant l'équipe",
          "Je la dis une fois, très vite",
          "Je l'écris en petit sur ma feuille",
          "Je la dis tout bas pour ne pas déranger",
        ],
        bonne: 0,
        explication: "L'oral s'oublie vite. Une consigne dite deux fois, lentement, et à des yeux qui vous regardent, se retient.",
      },
    },

    {
      id: "verifier",
      titre: "Vérifier que c'est compris",
      note: "La dernière question",
      visuel: {
        motif: "duo",
        titre: "Deux façons de finir",
        cartes: [
          { titre: "« C'est clair ? »", picto: "👍", pour: "Tout le monde dit oui", texte: "On ne sait pas si c'est compris." },
          { titre: "« Qui coupe le courant ? »", picto: "🎯", pour: "Quelqu'un répond", texte: "On voit tout de suite qui a compris." },
        ],
        lien: "≠",
        pied: "Une question précise vaut mieux qu'un « c'est clair ? ».",
      },
      texte: "<p>À la fin, ne demandez pas « c'est clair ? » : tout le monde répond oui. Posez une <b>question précise</b> : « Qui coupe le courant, et à quel moment ? ». Quelqu'un doit y répondre. Si la réponse est fausse, on le redit.</p>",
      dire: "À la fin du briefing, ne demandez pas : c'est clair ? Tout le monde répond oui, même sans avoir compris. Posez une question précise. Par exemple : qui coupe le courant, et à quel moment ? Quelqu'un doit y répondre. Si la réponse est fausse, vous le redites, tout simplement. C'est ce qui prouve que le message est passé.",
      reference: "Code CC93 · vérifier la compréhension",
      controle: {
        enonce: "Votre briefing est terminé. Que demandez-vous ?",
        choix: [
          "Qui coupe le courant, et à quel moment ?",
          "C'est clair ?",
          "Rien : on y va",
          "On ne pose jamais de question en équipe",
        ],
        bonne: 0,
        explication: "« C'est clair ? » appelle un oui automatique. Une question précise oblige à répondre : on voit si c'est compris.",
      },
    },

    {
      id: "mot-pour-mot",
      titre: "Un briefing de deux minutes, mot pour mot",
      note: "À s'entraîner à dire",
      visuel: {
        motif: "etages",
        titre: "Les cinq temps, en une phrase chacun",
        etages: [
          { niveau: "1 · Le travail", texte: "« Aujourd'hui, nous changeons un détendeur sur la chambre froide. »" },
          { niveau: "2 · Trois risques", texte: "« Fluide : lunettes, gants. Armoire : on n'y touche pas. Zone : balisée. »" },
          { niveau: "3 · Qui fait quoi", texte: "« Vous aux manomètres, vous au matériel, moi à l'outillage. »" },
          { niveau: "4 · Si ça tourne mal", texte: "« On se protège, on alerte le 18 ou le 112, on secourt. Voici l'adresse. »" },
          { niveau: "5 · Une question", texte: "« Qui coupe le courant, et à quel moment ? »" },
        ],
      },
      texte: "<p>« Bonjour à tous. Aujourd'hui, nous changeons un détendeur sur la chambre froide du magasin. Trois risques. Le fluide : froid et sous pression, lunettes et gants dès qu'on ouvre un raccord. L'électricité : personne n'ouvre l'armoire, la consignation est faite par la personne habilitée. La zone : le couloir est balisé et le passage reste libre. Qui fait quoi : vous, aux manomètres ; vous, au matériel ; moi, à l'outillage. Si ça tourne mal : on se protège, on alerte, on secourt. J'appelle le 18, ou le 112 depuis mon portable, et je donne l'adresse du magasin. Une dernière chose : qui coupe le courant, et à quel moment ? Très bien. On y va. »</p><p>À dire en moins de deux minutes, en regardant l'équipe.</p>",
      dire: "Voici un briefing complet. Écoutez le rythme, les pauses, la question de la fin. Bonjour à tous. Aujourd'hui, nous changeons un détendeur sur la chambre froide du magasin. Trois risques. Le fluide : froid et sous pression, lunettes et gants dès qu'on ouvre un raccord. L'électricité : personne n'ouvre l'armoire, la consignation est faite par la personne habilitée. La zone : le couloir est balisé et le passage reste libre. Qui fait quoi : vous, aux manomètres ; vous, au matériel ; moi, à l'outillage. Si ça tourne mal : on se protège, on alerte, on secourt. J'appelle le dix-huit, ou le cent douze depuis mon portable, et je donne l'adresse du magasin. Une dernière chose : qui coupe le courant, et à quel moment ? Très bien. On y va. À vous de vous entraîner : moins de deux minutes, en regardant l'équipe.",
      piege: "<p>Ce briefing est un modèle, pas un texte à recopier. Sur votre chantier, les trois risques et les rôles ne sont pas les mêmes : <b>choisissez les vôtres</b> avant de parler.</p>",
      reference: "Code CC93 · un exemple complet",
    },
  ],

  motFin: "Entraînez-vous : choisissez un chantier, écrivez vos trois risques, et dites votre briefing à voix haute, en moins de deux minutes, à un camarade qui vous répond à la question de la fin.",
});
