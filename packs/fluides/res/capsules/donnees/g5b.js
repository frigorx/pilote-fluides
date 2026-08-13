/* Capsule g5b — « Peser, charger, stocker, tracer » (G5 · codes 5.05 → 5.09).
   Contenu repris SANS AJOUT de la fiche g5b de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. */
CAPSULE.declarer({
  id: "g5b",
  fiche: "g5b",
  titre: "Peser, charger, stocker, tracer",
  surtitre: "HABILITATION FLUIDES · G5 · CODES 5.05 → 5.09",
  duree: "environ 9 minutes",
  intro: "Peser plutôt que deviner, choisir la bonne huile, ranger le cylindre au bon endroit, tout noter : voici les derniers gestes du fluide, expliqués à voix haute.",
  codes: [
    { code: "5.05", libelle: "Déterminer l'état du fluide et charger sans perte" },
    { code: "5.06", libelle: "Choisir la balance adaptée et peser" },
    { code: "5.07", libelle: "Consigner l'opération dans le registre" },
    { code: "5.08", libelle: "Appliquer les prescriptions de gestion, stockage et transport" },
    { code: "5.09", libelle: "Gérer les hydrocarbures et leurs huiles, y compris contaminés" },
  ],

  visuelAccueil: {
    motif: "balance",
    titre: "Deux pesées, jamais une",
    avant: { etiquette: "cylindre pesé", valeur: "avant" },
    apres: { etiquette: "cylindre pesé", valeur: "après" },
    ecart: { etiquette: "la quantité", valeur: "chargée ou récupérée" },
    pied: "C'est la balance qui fait foi, jamais le manomètre.",
  },

  ecrans: [
    {
      id: "balance-contre-manometre",
      titre: "Deux appareils, deux rôles",
      note: "Le point de départ",
      visuel: {
        motif: "duo",
        titre: "Deux appareils, deux rôles",
        cartes: [
          { titre: "LA BALANCE", picto: "⚖", pour: "Ce qui contrôle la charge", texte: "Elle dit combien de fluide a été mis, en poids." },
          { titre: "LE MANOMÈTRE", picto: "📟", pour: "Un autre rôle", texte: "Il dit comment la machine se comporte, pas la quantité chargée." },
        ],
        lien: "≠",
        pied: "La charge se contrôle à la balance, jamais au manomètre.",
      },
      texte: "<p>Pour charger, on détermine d'abord l'<b>état du fluide</b> et la <b>quantité prévue</b>, sur la plaque signalétique ou la documentation constructeur.</p><p>La charge se contrôle à la <b>balance</b>, jamais « au manomètre » : le manomètre dit comment la machine se comporte, la balance dit combien on a mis.</p>",
      dire: "Avant de charger quoi que ce soit, deux choses à déterminer : l'état du fluide, et la quantité prévue. Ces informations se trouvent sur la plaque signalétique de la machine, ou dans la documentation du constructeur. Ensuite, un point à ne jamais confondre : la charge se contrôle à la balance, jamais au manomètre. Le manomètre dit comment la machine se comporte une fois en marche. La balance, elle seule, dit combien de fluide a réellement été mis.",
      reference: "Code 5.05 · 5.06 · avant de charger",
      controle: {
        enonce: "Avec quoi contrôle-t-on la quantité de fluide chargée dans une installation ?",
        choix: ["Un manomètre", "Une balance de précision", "Un thermomètre", "Un vacuomètre"],
        bonne: 1,
        explication: "La charge se mesure au poids, avec une balance. Les pressions renseignent sur le fonctionnement, pas sur la quantité de fluide présente dans le circuit.",
      },
    },

    {
      id: "etat-du-fluide",
      titre: "Dans quelle condition est le fluide ?",
      note: "Sous-refroidi, saturé, surchauffé",
      visuel: {
        motif: "checklist",
        titre: "Dans quelle condition est le fluide ?",
        items: [
          { titre: "Sous-refroidi", texte: "liquide plus froid que sa saturation, sans aucune vapeur — on prélève en bas" },
          { titre: "Saturé", texte: "liquide et vapeur ensemble, à la température de changement d'état" },
          { titre: "Surchauffé", texte: "vapeur plus chaude que sa saturation, sans aucune goutte — on prélève en haut" },
        ],
        pied: "Cette condition guide la méthode de remplissage.",
      },
      texte: "<p>Avant de charger, on regarde aussi dans quelle <b>condition</b> se trouve le fluide. <b>Sous-refroidi</b> : un liquide plus froid que sa température de saturation, sans vapeur. <b>Saturé</b> : liquide et vapeur ensemble. <b>Surchauffé</b> : une vapeur plus chaude que sa saturation, sans liquide.</p><p>Cas particulier des <b>mélanges zéotropes</b> : ils se chargent toujours en <b>phase liquide</b>, sinon les composants se séparent et la composition dérive.</p>",
      dire: "Avant de charger, il y a une autre question à se poser, en plus de savoir si le fluide est liquide ou gazeux : dans quelle condition se trouve-t-il exactement ? Un fluide peut être sous-refroidi : c'est un liquide plus froid que sa température de saturation, donc sans aucune vapeur mélangée — on le prélève alors en bas de la bouteille. Il peut être saturé : liquide et vapeur présents ensemble, à la température de changement d'état. Ou il peut être surchauffé : une vapeur plus chaude que sa saturation, sans aucune goutte de liquide — on le prélève alors en haut. Cette condition guide directement la méthode de remplissage. Et pour les mélanges zéotropes, une règle simple : ils se chargent toujours en phase liquide. Sinon, les composants du mélange se séparent, et la composition du circuit dérive peu à peu.",
      retenir: ["Sous-refroidi : liquide sans vapeur, prélevé en <b>bas</b>. Surchauffé : vapeur sans liquide, prélevé en <b>haut</b>.", "Les mélanges <b>zéotropes</b> se chargent toujours en phase liquide."],
      reference: "Code 5.05 · l'état du fluide",
    },

    {
      id: "huile-qui-suit-le-fluide",
      titre: "L'huile suit le fluide",
      note: "Deux familles, jamais mélangées",
      visuel: {
        motif: "duo",
        titre: "L'huile suit le fluide",
        cartes: [
          { titre: "FLUIDES CHLORÉS", picto: "🛢", pour: "Anciens fluides", texte: "huile minérale" },
          { titre: "HFC ET HFO", picto: "🧪", pour: "Fluides actuels", texte: "huile de synthèse, le plus souvent polyolester (POE)" },
        ],
        lien: "≠",
        pied: "Les deux huiles ne se mélangent pas : changer de fluide, c'est aussi changer d'huile.",
      },
      texte: "<p>L'<b>huile</b> suit le fluide, et elle en dépend. Les anciens fluides chlorés travaillaient avec de l'huile <b>minérale</b> ; les HFC et les HFO demandent une huile de synthèse, le plus souvent <b>polyolester (POE)</b>.</p><p>Les deux ne se mélangent pas : sur un changement de fluide, l'huile se change aussi — c'est ce qui distingue un <b>retrofit</b> d'un simple drop-in. La POE <b>absorbe l'humidité de l'air</b> très vite : bidon refermé aussitôt, circuit jamais laissé ouvert.</p>",
      dire: "L'huile n'est jamais un choix indépendant : elle suit le fluide, et elle en dépend complètement. Les anciens fluides chlorés travaillaient avec de l'huile minérale. Les HFC et les HFO, eux, demandent une huile de synthèse, le plus souvent du polyolester — on l'appelle aussi par ses initiales, P, O, E. Ces deux familles d'huile ne se mélangent pas entre elles. C'est pour ça que, sur un changement de fluide, on change aussi l'huile : c'est exactement ce qui distingue un retrofit d'un simple drop-in. Attention avec la P O E : elle absorbe l'humidité de l'air très vite. Le bidon se referme aussitôt après usage, et le circuit ne reste jamais ouvert. Le type exact d'huile se lit sur la plaque ou la documentation constructeur, jamais au jugé.",
      retenir: ["Huile <b>minérale</b> pour les fluides chlorés ; huile <b>POE</b> (polyolester) pour les HFC et HFO — jamais mélangées.", "La POE absorbe l'humidité très vite : bidon refermé aussitôt, circuit jamais laissé ouvert."],
      reference: "Code 5.09 · l'huile suit le fluide",
    },

    {
      id: "huile-contaminee",
      titre: "L'huile retirée d'un circuit",
      note: "Déchet dangereux",
      visuel: {
        motif: "alerte",
        titre: "L'huile retirée d'un circuit",
        vignettes: [
          { picto: "🛢", etiquette: "ce qu'elle est", titre: "Contaminée", texte: "elle contient du fluide dissous" },
          { picto: "🔥", etiquette: "cas particulier", titre: "Hydrocarbures", texte: "fluide et huile inflammables : à l'écart de toute chaleur ou étincelle" },
          { picto: "📄", etiquette: "ce qu'on fait", titre: "Déchet dangereux", texte: "filière agréée, avec son bordereau" },
        ],
        pied: "Transport selon la réglementation applicable et la fiche de données de sécurité.",
      },
      texte: "<p>Une huile retirée d'un circuit est <b>contaminée</b> : elle contient du fluide dissous. Elle ne se jette pas, elle part en <b>déchet dangereux</b> vers une filière agréée, avec son <b>bordereau</b>.</p><p>Pour les <b>hydrocarbures</b>, fluide et huile sont en plus <b>inflammables</b> : récipients adaptés et fermés, à l'écart de toute source de chaleur ou d'étincelle.</p>",
      dire: "Une huile qu'on retire d'un circuit n'est jamais un déchet ordinaire : elle est contaminée, elle contient du fluide dissous. Elle ne se jette pas. Elle part en déchet dangereux, vers une filière agréée, avec son bordereau, le document qui la suit jusqu'à son traitement. Cas particulier des hydrocarbures : là, le fluide et l'huile sont en plus inflammables. Il faut des récipients adaptés et fermés, à l'écart de toute source de chaleur ou d'étincelle, et un transport qui respecte la réglementation applicable et la fiche de données de sécurité.",
      reference: "Code 5.09 · l'huile contaminée et les hydrocarbures",
    },

    {
      id: "le-registre",
      titre: "Le registre : la preuve légale",
      note: "Ce qui s'y écrit",
      visuel: {
        motif: "flux",
        titre: "Le registre : la preuve légale",
        boites: [
          { picto: "➕", titre: "Quantité ajoutée", texte: "date, intervenant" },
          { picto: "➖", titre: "Quantité récupérée", texte: "date, intervenant" },
          { picto: "🚫", titre: "Rejet à l'atmosphère", texte: "strictement interdit et sanctionné", teinte: "danger" },
        ],
        pied: "Le registre est la preuve légale de toute opération sur le fluide.",
      },
      texte: "<p>Le <b>registre</b> est la preuve légale de toute opération sur le fluide : quantité ajoutée, quantité récupérée, date, intervenant.</p><p>Le <b>rejet volontaire à l'atmosphère</b> est strictement interdit et sanctionné.</p>",
      dire: "Le registre n'est pas une formalité administrative : c'est la preuve légale de toute opération faite sur le fluide. Chaque quantité ajoutée, chaque quantité récupérée, avec la date et le nom de l'intervenant, s'y retrouve. Et une chose à ne jamais oublier : le rejet volontaire à l'atmosphère est strictement interdit, et il est sanctionné.",
      reference: "Code 5.07 · le registre",
    },

    {
      id: "la-balance-prime",
      titre: "La balance prime",
      note: "Avant et après, jamais une seule fois",
      visuel: { svg: "pesee-charge.svg", alt: "La pesée en deux temps : une première pesée notée, la masse qui évolue pendant l'opération, une seconde pesée notée. La différence donne la charge introduite ou le fluide récupéré." },
      legende: "La balance dit combien ; le manomètre dit comment la machine se comporte.",
      texte: "<p>On pèse <b>avant</b> et <b>après</b>. Sans pesée initiale, la quantité récupérée ou ajoutée n'est qu'une <b>estimation</b> — et une estimation ne se consigne pas dans un registre.</p>",
      dire: "Un seul geste résume toute la rigueur de cette étape : on pèse avant, et on pèse après. Sans la pesée initiale, la quantité récupérée ou ajoutée n'est plus qu'une estimation. Et une estimation, ça ne se consigne pas dans un registre, qui exige une preuve. En récupération, c'est la même méthode, juste dans l'autre sens : c'est la bouteille qui gagne en poids. Dans les deux cas, une règle simple : deux pesées, jamais une seule.",
      retenir: ["On pèse <b>avant</b> et <b>après</b> : jamais une seule pesée.", "Sans pesée initiale, la quantité n'est qu'une <b>estimation</b> — qui ne se consigne pas dans un registre."],
      reference: "Code 5.06 · la balance prime",
    },

    {
      id: "stockage-et-transport",
      titre: "Stocker et transporter un cylindre",
      note: "Arrimé, debout, étiqueté",
      visuel: {
        motif: "checklist",
        titre: "Stocker et transporter un cylindre",
        items: [
          { titre: "Debout et arrimé", texte: "jamais couché sans fixation" },
          { titre: "Étiqueté", texte: "le fluide qu'il contient, lisible" },
          { titre: "À l'abri de la chaleur", texte: "" },
          { titre: "Inflammables (hydrocarbures, A2L)", texte: "règles de leur classe en plus, transport selon la réglementation et la fiche de données de sécurité" },
        ],
        pied: "Conditions détaillées : selon la réglementation applicable et la fiche de données de sécurité.",
      },
      texte: "<p>Les cylindres restent <b>arrimés, debout, étiquetés</b>, à l'abri de la chaleur. Les fluides <b>inflammables</b> (hydrocarbures, A2L) obéissent en plus aux règles de leur classe.</p>",
      dire: "Au stockage comme au transport, les cylindres restent arrimés, debout, étiquetés, à l'abri de la chaleur. Pour les fluides inflammables — les hydrocarbures, ou la classe A deux L — s'ajoutent en plus les règles propres à leur classe. Les conditions précises se trouvent dans la réglementation applicable et dans la fiche de données de sécurité du produit.",
      retenir: ["Cylindres : <b>arrimés, debout, étiquetés</b>, à l'abri de la chaleur.", "Fluides inflammables : les règles de leur classe s'ajoutent, transport selon la réglementation et la fiche de données de sécurité."],
      reference: "Code 5.08 · stockage et transport",
    },

    {
      id: "reemploi-nest-pas-retraitement",
      titre: "Réemploi n'est pas retraitement",
      note: "À emporter",
      visuel: {
        motif: "duo",
        titre: "Réemploi n'est pas retraitement",
        cartes: [
          { titre: "RÉEMPLOI", picto: "🔁", pour: "Légal, sans retraitement", texte: "Rechargé tel quel sur sa machine d'origine, chez le même détenteur." },
          { titre: "RECYCLAGE OU RÉGÉNÉRATION", picto: "🧪", pour: "Un vrai retraitement", texte: "Nettoyage ou remise aux spécifications du neuf, en filière." },
        ],
        lien: "≠",
        pied: "Un fluide régénéré s'achète : on ne le régénère jamais soi-même à l'atelier.",
      },
      texte: "<p>On pourrait croire qu'un fluide récupéré doit toujours passer par le recyclage ou la régénération avant de resservir. C'est <b>faux</b> : réutiliser le fluide récupéré sur <b>sa machine d'origine</b>, chez le <b>même détenteur</b>, est légal et ne demande aucun retraitement.</p>",
      dire: "Voici une idée fausse, très répandue, et qu'il faut corriger. On pourrait croire qu'un fluide récupéré doit toujours passer par le recyclage ou la régénération avant de resservir. C'est faux. Réutiliser le fluide récupéré sur sa machine d'origine, chez le même détenteur — c'est-à-dire celui qui possède ou utilise cette machine — est parfaitement légal, et ne demande aucun retraitement. Le recyclage, lui, n'est qu'un nettoyage de base : filtration et séchage. La régénération est un retraitement complet, réalisé en filière spécialisée, qui redonne au fluide les caractéristiques du neuf. Et un fluide régénéré, retenez bien ce point : ça s'achète. On ne le régénère jamais soi-même à l'atelier.",
      reference: "Code 5.02 · 5.05 · réemploi, recyclage, régénération",
      controle: {
        enonce: "Un fluide est récupéré sur une installation, puis rechargé tel quel, sans traitement, sur cette même installation, chez le même détenteur. Est-ce autorisé ?",
        choix: [
          "Non, tout fluide récupéré doit d'abord être recyclé ou régénéré",
          "Oui, c'est un réemploi : légal, sans retraitement, tant que c'est la même machine et le même détenteur",
          "Non, seul un fluide neuf peut être rechargé",
          "Oui, mais seulement après l'avoir régénéré soi-même à l'atelier",
        ],
        bonne: 1,
        explication: "Le réemploi sur la machine d'origine, chez le même détenteur, est légal et ne demande aucun retraitement. C'est différent du recyclage (nettoyage de base) et de la régénération (retraitement complet en filière, qui s'achète — on ne la fait jamais soi-même).",
      },
      piege: "<p>On pourrait croire qu'un fluide récupéré doit toujours passer par le recyclage ou la régénération avant de resservir. C'est <b>faux</b> : réutiliser le fluide récupéré sur <b>sa machine d'origine</b>, chez le <b>même détenteur</b>, est légal et ne demande aucun retraitement.</p>",
    },
  ],

  motFin: "Vous pouvez revenir à la fiche pour le détail, ou vous entraîner sur la mise en situation de la bouteille de récupération.",
});
