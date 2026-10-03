/* =====================================================================
   voyage-regulation.js — le récit de « Voyage dans tous ses états »,
   édition « la régulation d'une centrale »
   ---------------------------------------------------------------------
   RÔLE : même contrat que donnees/voyage-vis.js (une source pour le
   module, le film et la série), chargé par voyage-regulation.html ;
   `dossier` dit où sont ses voix. Pas de livret : `livret: ""`.
   DEMANDE DE FRANCK (03/10/2026, questions posées) : un film à part, sur
   une centrale à QUATRE compresseurs à pistons, qui insiste sur la
   régulation de la basse pression (zone neutre), de la haute pression et
   de la haute pression flottante ; forme « centrale + courbes » : à
   droite, à la place du diagramme enthalpique, l'écran du régulateur
   (la pression dans le temps) ; projet inerWeb. Le film suivant, sur la
   même centrale : le circuit d'huile (voyage-huile).
   INSTALLATION : centrale positive de supermarché, quatre compresseurs
   semi-hermétiques à pistons PAREILS, tout ou rien (pas de variateur :
   le film « les centrales frigorifiques » le raconte), collecteurs
   communs, capteur de BP sur le collecteur d'aspiration, capteur de HP
   sur le collecteur de refoulement, régulateur de centrale dans
   l'armoire, condenseur à air sur le toit (plusieurs ventilateurs),
   sonde d'air extérieur, trois postes (électrovanne + détendeur).
   Fluide non nommé, AUCUNE pression ni température chiffrée (les heures
   « six heures », « midi » sont des heures de la journée).
   SOURCES (fonds de Franck) : notice du régulateur EC2-542 (Copeland,
   03_BAC-MFER/S1-Analyse) — zone neutre de part et d'autre de la
   consigne, pas d'action dedans, enclenchement / déclenchement aux
   limites, temporisations avant augmentation et avant diminution de
   puissance, temps minimum de marche et d'arrêt, permutation selon les
   heures de marche, délestage rapide si BP trop faible « idem pressostat
   BP », nombre de compresseurs à enclencher si la sonde est en défaut,
   ventilateurs du condenseur en bande proportionnelle par variateur ;
   TP « Centrale de supermarché » (pressostat BP de régulation, HBP de
   sécurité, HP de régulation, intérêt de plusieurs compresseurs) ;
   HabFluide ch. 17 et ch. 10 + planche « Quatre leviers d'énergie »
   (condensation flottante, écart condensation-évaporation, repère de
   2 à 3 % par kelvin, limite fixée par le détendeur : thermostatique /
   électronique, plancher réglé d'après la documentation, jamais au jugé).
   PIÈGE : l'ORDRE des phrases porte les gestes des scènes
   (moteur/voyage-regulation-scenes-*.js) : ajouter une phrase décale tout.
   CARTE (moteur/voyage-regulation-dessin.js, D.CIRCUIT_PTS, 0 à 10, on
   reboucle) : 0 coin bas gauche (ligne liquide) · 1 pied du poste de
   l'héroïne · 1,25 détendeur · 1,65 évaporateur · 1,82 sortie du meuble ·
   3 collecteur d'aspiration · 3,5 compresseur n° 2 · 4 collecteur de
   refoulement · 6 séparateur d'huile · 7 condenseur · 8 bouteille · 10 = 0.
   COURBES (le panneau de droite, données donnees/voyage-regulation-
   diagramme.js) : `diag: [w0, w1]` = temps sur la ligne des épisodes
   (0-10 le bilan de vapeur · 10-40 une journée au rayon frais · 40-50 le
   délestage · 50-60 les ventilateurs · 60-80 une année de haute
   pression) ; `calques: { id: k }` = repère montré à partir de la phrase k.
   ===================================================================== */
window.VOYAGE_RECIT = {
  titre: "Voyage dans tous ses états",
  sousTitre: "la régulation d'une centrale racontée par une molécule",
  edition: "la régulation d'une centrale",
  dossier: "voyage-regulation",
  film: "../voyage/regulation.html", livret: "", // pas de livret pour cette édition : le module n'affiche pas le bouton
  voix: { nom: "fr-FR-RemyMultilingualNeural", debit: "-5%" },
  enseignant: {
    public: "toutes les formations du froid et de la climatisation, après le circuit de base et la centrale",
    notions: [["Quatre compresseurs en parallèle, deux capteurs, un régulateur", "1"],
              ["Pourquoi la basse pression bouge : la vapeur qui arrive, la vapeur qui part", "2"],
              ["La consigne et la zone neutre de basse pression", "3, 4"],
              ["Les temporisations, la marche étagée, la permutation", "5, 6, 7"],
              ["Délestage rapide et sécurités : la régulation ne remplace pas la sécurité", "8"],
              ["La haute pression régulée par les ventilateurs du condenseur", "9"],
              ["Haute pression fixe, haute pression flottante, plancher", "10, 11, 12"],
              ["Ce que lit le technicien sur l'écran du régulateur", "13"]],
    usage: "Ce voyage suppose connus le circuit de base et la centrale (les voyages « le circuit de base » et « les centrales frigorifiques »). Il se regarde d'un trait ou en trois temps : la basse pression et sa zone neutre (1 à 5), la journée, la permutation et les sécurités (6 à 8), la haute pression fixe puis flottante (9 à 13). La centrale décrite est un modèle courant (positive, quatre compresseurs à pistons tout ou rien) ; les courbes sont des schémas sans chiffres : la documentation du régulateur et du constructeur fait foi pour tout réglage."
  },
  logoLycee: "",
  resumeFilm: "Suivez une molécule de fluide frigorigène dans une centrale de supermarché à quatre compresseurs : pourquoi la basse pression bouge, la consigne, la zone neutre, les temporisations, une journée de marche étagée, la permutation, le délestage et les sécurités, puis la haute pression tenue par les ventilateurs du condenseur, fixe ou flottante, jusqu'à son plancher.",
  creditCourt: "D'après une idée d'André Delalande · inerWeb — F. Henninot, avec l'aide d'une IA · voix de synthèse · CC BY-NC-ND",
  credit: "L'idée de ce parcours vient du souvenir de lecture de « Voyage extraordinaire avec une molécule de Fréon 12 : roman frigorifique », d'André Delalande (1946). Conception pédagogique : F. Henninot — inerWeb. Texte, dessins et animation réalisés avec l'assistance d'une intelligence artificielle ; voix de synthèse. Symboles d'après la planche Éduscol « Le circuit frigorifique » et la collection QElectroTech (CC BY 3.0). Licence CC BY-NC-ND.",
  scenes: [
    { id: "intro", num: "", titre: "Mon voyage", sous: "dans le cerveau d'une centrale", carte: null,
      phrases: [
        "Bonjour. Je suis une molécule de fluide frigorigène.",
        "Je travaille dans la centrale d'un supermarché : quatre compresseurs à pistons, qui refroidissent tout le rayon frais.",
        "Aujourd'hui, je ne vais pas seulement voyager. Je vais vous montrer qui décide, dans cette centrale.",
        "Qui fait démarrer un compresseur ? Qui l'arrête ? Qui fait tourner les ventilateurs du condenseur ?",
        "Le chef, c'est le régulateur de centrale. Il surveille deux pressions : la basse pression et la haute pression.",
        "À droite, ses courbes : la pression qui bouge dans le temps, comme sur l'écran du régulateur.",
        "Suivez-moi : on commence par les compresseurs."
      ] },
    { id: "centrale", num: "1", titre: "Quatre compresseurs", sous: "deux capteurs, un régulateur", organe: "compresseur", pres: 2,
      role: "aspirer la vapeur de tout le magasin, et la comprimer",
      carte: [3.1, 3.55], diag: [0, 0], puces: [["BP", "capteur BP"], ["HP", "capteur HP"]],
      phrases: [
        "Voici la centrale : quatre compresseurs semi-hermétiques à pistons, pareils, côte à côte sur un même châssis.",
        "Leur rôle : aspirer la vapeur de tout le magasin, et la comprimer.",
        "Ils aspirent tous dans le même collecteur d'aspiration, et refoulent tous dans le même collecteur de refoulement.",
        "Chaque compresseur est soit en marche, soit à l'arrêt. Avec quatre, la centrale a quatre marches de puissance.",
        "Sur le collecteur d'aspiration, un capteur mesure la basse pression. Sur le collecteur de refoulement, un autre mesure la haute pression.",
        "Les deux capteurs sont reliés au régulateur de centrale, dans l'armoire électrique. Lui commande les compresseurs et les ventilateurs du condenseur."
      ],
      question: { q: "Quatre compresseurs pareils, chacun en marche ou à l'arrêt : combien de marches de puissance ?",
        choix: [["Quatre : un, deux, trois ou quatre compresseurs en marche.", 1],
                ["Deux : tout ou rien.", 0],
                ["Une infinité, en continu.", 0]],
        pourquoi: "Chaque compresseur est en marche ou à l'arrêt. La centrale peut faire tourner un, deux, trois ou quatre compresseurs : quatre marches de puissance, sans rien entre deux." } },
    { id: "bilan", num: "2", titre: "Pourquoi la basse pression bouge", sous: "la vapeur qui arrive, la vapeur qui part",
      carte: [1.82, 3], diag: [0, 10], puces: [["BP", "arrivée ↔ départ"]],
      phrases: [
        "Je sors d'un meuble en vapeur, et j'arrive au collecteur d'aspiration.",
        "Ici, deux débits se rencontrent : la vapeur que produisent les meubles, et la vapeur qu'emportent les compresseurs.",
        "Si nous arrivons plus nombreuses que les compresseurs n'en emportent, nous nous serrons : la basse pression monte.",
        "Si les compresseurs emportent plus de vapeur que les meubles n'en produisent, nous nous écartons : la basse pression baisse.",
        "Sur la courbe, deux compresseurs tournent, et personne ne touche à rien. Les meubles demandent plus, puis moins : la basse pression suit.",
        "Or la basse pression fixe la température à laquelle je bous dans les meubles. Si elle monte trop, les produits se réchauffent.",
        "Il faut donc quelqu'un pour la tenir : c'est le travail du régulateur."
      ],
      question: { q: "Deux compresseurs tournent. Les meubles demandent moins de froid. Que fait la basse pression ?",
        choix: [["Elle baisse.", 1],
                ["Elle monte.", 0],
                ["Elle ne change pas.", 0]],
        pourquoi: "Les meubles produisent moins de vapeur, mais les deux compresseurs en emportent toujours autant : la vapeur se raréfie dans le collecteur, la basse pression baisse." } },
    { id: "consigne", num: "3", titre: "La consigne", sous: "la basse pression que l'on veut tenir",
      carte: [3, 3], diag: [10, 10], calques: { consigne: 0 }, puces: [["BP", "consigne"]],
      phrases: [
        "Le régulateur a une valeur à tenir : la consigne de basse pression.",
        "Le frigoriste la règle pour que le meuble le plus froid soit bien servi : tous les meubles bouillent à la même pression.",
        "Trop haute, les meubles manquent de froid.",
        "Trop basse, les compresseurs travaillent plus que nécessaire : on dépense de l'énergie pour rien.",
        "Sur la courbe, la consigne, c'est ce trait bleu, au milieu.",
        "Le régulateur compare sans arrêt la basse pression mesurée à sa consigne."
      ],
      question: { q: "Pourquoi ne pas régler la consigne de basse pression le plus bas possible ?",
        choix: [["Les compresseurs travailleraient plus que nécessaire : de l'énergie perdue.", 1],
                ["Les meubles manqueraient de froid.", 0],
                ["Le condenseur s'arrêterait.", 0]],
        pourquoi: "Plus la basse pression est basse, plus l'écart avec la haute pression est grand, et plus les compresseurs travaillent. La consigne se règle juste assez bas pour servir le meuble le plus froid." } },
    { id: "zone", num: "4", titre: "La zone neutre", sous: "la bande où l'on ne touche à rien",
      carte: [3, 3], diag: [10, 16.5], calques: { consigne: 0, zone: 0 }, puces: [["BP", "zone neutre"]],
      phrases: [
        "Autour de la consigne, le régulateur trace une bande : la zone neutre. Un seuil haut au-dessus, un seuil bas en dessous.",
        "Tant que la basse pression reste dans cette bande, le régulateur ne fait rien.",
        "Si elle dépasse le seuil haut, il y a demande de froid : il démarre un compresseur de plus.",
        "Si elle passe sous le seuil bas, il y a excès de froid : il arrête un compresseur.",
        "Pourquoi une bande, et pas un seul trait ? Avec un seul trait, la pression le franchirait sans cesse : les compresseurs démarreraient et s'arrêteraient sans arrêt.",
        "Or chaque démarrage fatigue le moteur et use le compresseur.",
        "Zone neutre trop étroite : les compresseurs démarrent trop souvent. Trop large : la température des meubles varie trop."
      ],
      question: { q: "Pourquoi une zone neutre plutôt qu'un seul seuil ?",
        choix: [["Pour éviter que les compresseurs démarrent et s'arrêtent sans cesse.", 1],
                ["Pour tenir une basse pression plus basse.", 0],
                ["Pour faire tourner les quatre compresseurs ensemble.", 0]],
        pourquoi: "Avec un seul seuil, la moindre variation de pression ferait démarrer ou arrêter un compresseur. Dans la zone neutre, le régulateur ne fait rien : il n'agit qu'au-dessus du seuil haut ou sous le seuil bas." } },
    { id: "tempo", num: "5", titre: "Les temporisations", sous: "attendre avant d'agir",
      carte: [3, 3], diag: [13.5, 17], calques: { consigne: 0, zone: 0, tempo: 0 }, puces: [["BP", "temporisation"]],
      phrases: [
        "Le régulateur n'agit pas à la seconde où la pression franchit un seuil : il attend un peu.",
        "Avant de démarrer un compresseur de plus, une temporisation : si la pression redescend seule dans la bande, il n'aura rien démarré pour rien.",
        "Avant d'en arrêter un, une autre temporisation, pour la même raison.",
        "Et après chaque démarrage, il laisse à la pression le temps de réagir : un compresseur à la fois.",
        "Chaque compresseur a encore deux protections : un temps minimum de marche, et un temps minimum d'arrêt.",
        "Un compresseur qui vient de démarrer tourne au moins ce temps-là. Un compresseur qui vient de s'arrêter attend avant de repartir.",
        "Sur la courbe, regardez : la pression passe le seuil, la petite horloge se remplit, et seulement alors, un compresseur de plus."
      ],
      question: { q: "Pourquoi le régulateur attend-il avant de démarrer un compresseur de plus ?",
        choix: [["La pression peut revenir seule dans la zone neutre : on évite un démarrage inutile.", 1],
                ["Pour laisser chauffer l'huile.", 0],
                ["Pour attendre que la haute pression baisse.", 0]],
        pourquoi: "Un dépassement bref du seuil haut ne demande pas forcément un compresseur de plus. La temporisation laisse le temps de voir si la pression revient seule dans la zone neutre : un démarrage inutile de moins." } },
    { id: "journee", num: "6", titre: "Une journée au rayon frais", sous: "un de plus, un de moins",
      carte: [3, 3], diag: [10, 40], calques: { consigne: 0, zone: 0, marches: 4 }, puces: [["BP", "marche étagée"]],
      phrases: [
        "Suivons une journée entière. Six heures : le magasin est calme, un seul compresseur suffit.",
        "Huit heures : on remplit les rayons, les portes des chambres froides s'ouvrent. La basse pression monte, et passe le seuil haut.",
        "Après la temporisation, un deuxième compresseur démarre. La pression revient dans la bande.",
        "Midi : beaucoup de clients, les meubles travaillent fort. La pression remonte : un troisième compresseur.",
        "Sous la courbe, les marches qui montent, ce sont les compresseurs en marche.",
        "Le soir, on baisse les rideaux de nuit sur les meubles. Ils demandent moins de froid : la basse pression passe sous le seuil bas.",
        "Un compresseur s'arrête, puis un autre, toujours après la temporisation. La nuit, un seul suffit à nouveau.",
        "Le quatrième ? Il sert les jours de forte chaleur, ou remplace un compresseur en panne."
      ],
      question: { q: "Le soir, les rideaux de nuit sont baissés. Que fait le régulateur ?",
        choix: [["Il arrête des compresseurs, un par un, quand la basse pression passe sous le seuil bas.", 1],
                ["Il démarre le quatrième compresseur.", 0],
                ["Il baisse la consigne.", 0]],
        pourquoi: "Les meubles fermés demandent moins de froid : ils produisent moins de vapeur, la basse pression baisse et passe sous le seuil bas. Après la temporisation, le régulateur arrête un compresseur, puis un autre si besoin." } },
    { id: "permutation", num: "7", titre: "Chacun son tour", sous: "la permutation des compresseurs",
      carte: [3.5, 3.5], diag: [10, 40], calques: { consigne: 0, zone: 0, marches: 0, permutation: 1 }, puces: [["BP", "permutation"]],
      phrases: [
        "Le premier à démarrer travaille plus que les autres. Si c'était toujours le même, il s'userait le premier.",
        "Alors le régulateur permute : à chaque demande de froid, il démarre le compresseur qui a le moins d'heures de marche.",
        "À chaque excès de froid, il arrête celui qui en a le plus.",
        "Au bout du compte, les quatre compresseurs travaillent à peu près autant.",
        "Si un compresseur est coupé par une de ses sécurités, le régulateur le saute, et démarre le suivant.",
        "Et si le capteur de basse pression tombe en panne ? Le régulateur fait tourner un nombre de compresseurs réglé d'avance, pour garder le froid, et donne l'alarme."
      ],
      question: { q: "Pourquoi le régulateur permute-t-il les compresseurs ?",
        choix: [["Pour que les quatre travaillent, et s'usent, à peu près autant.", 1],
                ["Pour faire monter la basse pression.", 0],
                ["Pour démarrer les quatre ensemble.", 0]],
        pourquoi: "À chaque demande, il démarre le compresseur qui a le moins d'heures de marche ; à chaque excès, il arrête celui qui en a le plus. Aucun ne s'use avant les autres." } },
    { id: "delestage", num: "8", titre: "Le garde-fou", sous: "quand la basse pression tombe trop bas",
      carte: [3, 3], diag: [40, 50], calques: { consigne: 0, zone: 0, marches: 0, delestage: 1 }, puces: [["BP", "délestage"], ["froid", "sécurités"]],
      phrases: [
        "Parfois, la basse pression tombe vite et loin : par exemple quand presque tous les meubles ferment leur électrovanne en même temps.",
        "Sous un seuil réglé plus bas que la zone neutre, le régulateur n'attend plus : il arrête les compresseurs tout de suite. C'est le délestage rapide.",
        "Il protège les compresseurs, comme le ferait un pressostat basse pression.",
        "Et derrière le régulateur, chaque compresseur garde ses pressostats de sécurité, haute et basse pression, câblés à part.",
        "Si le régulateur se trompe, ou tombe en panne, ce sont eux qui coupent. Une régulation ne remplace jamais une sécurité.",
        "Voilà pour la basse pression. Maintenant, je monte sur le toit : la haute pression."
      ],
      question: { q: "Le régulateur tient la basse pression. Peut-on supprimer les pressostats de sécurité des compresseurs ?",
        choix: [["Non : ils coupent même si le régulateur se trompe ou tombe en panne.", 1],
                ["Oui : le régulateur les remplace.", 0],
                ["Oui, si la zone neutre est étroite.", 0]],
        pourquoi: "Le régulateur règle ; les pressostats de sécurité protègent. Câblés à part, ils arrêtent le compresseur même quand le régulateur est en panne ou mal réglé." } },
    { id: "ventilateurs", num: "9", titre: "Les ventilateurs du condenseur", sous: "la haute pression régulée", organe: "condenseur", pres: 2,
      role: "rejeter dehors la chaleur prise dans tout le magasin",
      carte: [3.55, 7.4], diag: [50, 60], calques: { consigneHP: 3 }, puces: [["HP", "consigne"], ["chaud", "ventilateurs"]],
      phrases: [
        "Comprimée et chaude, je monte au condenseur, sur le toit : une grande batterie, et plusieurs ventilateurs.",
        "Son rôle : rejeter dehors la chaleur prise dans tout le magasin.",
        "Plus les ventilateurs soufflent d'air, mieux je me refroidis, et plus la haute pression baisse.",
        "Le régulateur a donc une consigne de haute pression. Au-dessus, il fait souffler plus d'air ; en dessous, moins.",
        "Sur certaines centrales, les ventilateurs démarrent un par un, comme les compresseurs. Sur d'autres, un variateur règle leur vitesse.",
        "Pourquoi tenir la haute pression ? Trop haute, les compresseurs peinent et consomment, et le pressostat haute pression finit par couper.",
        "Trop basse, les détendeurs des meubles manquent de pression pour bien m'alimenter."
      ],
      question: { q: "La haute pression dépasse sa consigne. Que fait le régulateur ?",
        choix: [["Il fait souffler plus d'air au condenseur.", 1],
                ["Il arrête un compresseur.", 0],
                ["Il ferme les électrovannes des meubles.", 0]],
        pourquoi: "Plus d'air sur la batterie refroidit mieux le fluide : il se condense plus bas, la haute pression redescend vers sa consigne. Les compresseurs, eux, suivent la basse pression." } },
    { id: "hpfixe", num: "10", titre: "La haute pression fixe", sous: "l'hiver, de l'énergie perdue",
      carte: [7, 7], diag: [60, 80], calques: { exterieur: 0, hpFixe: 0 }, puces: [["HP", "consigne fixe"]],
      phrases: [
        "Longtemps, on a réglé une consigne de haute pression fixe, la même toute l'année.",
        "En été, l'air est chaud : la haute pression monte d'elle-même, et tous les ventilateurs soufflent.",
        "Mais en hiver, l'air du dehors est froid. Il pourrait me condenser bien plus bas.",
        "Avec une consigne fixe, le régulateur arrête des ventilateurs pour garder la haute pression en haut.",
        "Les compresseurs compriment donc plus haut que nécessaire, tout l'hiver.",
        "Or c'est l'écart entre la haute et la basse pression qui fait travailler les compresseurs : plus il est grand, plus on consomme."
      ],
      question: { q: "En hiver, avec une consigne de haute pression fixe, que fait le régulateur ?",
        choix: [["Il arrête des ventilateurs, pour garder la haute pression en haut.", 1],
                ["Il démarre tous les ventilateurs.", 0],
                ["Il démarre le quatrième compresseur.", 0]],
        pourquoi: "L'air froid ferait baisser la haute pression sous la consigne fixe. Pour la tenir, le régulateur fait souffler moins d'air : les compresseurs compriment plus haut que nécessaire." } },
    { id: "hpflottante", num: "11", titre: "La haute pression flottante", sous: "elle suit l'air du dehors",
      carte: [7, 7], diag: [60, 80], calques: { exterieur: 0, hpFixe: 0, hpFlot: 1, gain: 4 }, puces: [["HP", "consigne flottante"]],
      phrases: [
        "La solution : la haute pression flottante.",
        "Une sonde mesure la température de l'air extérieur. La consigne de haute pression la suit, avec un petit écart au-dessus.",
        "L'air se refroidit ? La consigne baisse, les ventilateurs continuent de souffler, et la haute pression descend.",
        "Je me condense plus bas : les compresseurs ont moins de travail pour me remonter jusque-là.",
        "Sur les courbes, regardez l'écart entre la haute pression fixe et la flottante : c'est l'énergie gagnée.",
        "Comme repère, les frigoristes comptent deux à trois pour cent de consommation en moins pour chaque degré gagné à la condensation.",
        "Sur une année, c'est un gain important."
      ],
      question: { q: "En hiver, avec la haute pression flottante, que fait la consigne de haute pression ?",
        choix: [["Elle baisse avec la température de l'air extérieur.", 1],
                ["Elle reste fixe.", 0],
                ["Elle monte, pour protéger les compresseurs.", 0]],
        pourquoi: "La consigne suit la température de l'air extérieur, avec un petit écart au-dessus. L'air se refroidit : la consigne baisse, la haute pression aussi, et les compresseurs travaillent moins." } },
    { id: "plancher", num: "12", titre: "Le plancher", sous: "la limite basse de la haute pression",
      carte: [8, 11.25], diag: [60, 80], calques: { exterieur: 0, hpFlot: 0, plancher: 2 }, puces: [["HP", "plancher"], ["BP", "détendeur"]],
      phrases: [
        "Mais la haute pression ne peut pas descendre sans limite.",
        "Le détendeur a besoin d'un écart de pression suffisant, entre son entrée et sa sortie, pour bien alimenter l'évaporateur.",
        "Le régulateur a donc une consigne minimale : un plancher. Par grand froid, la haute pression s'arrête là.",
        "Avec des détendeurs thermostatiques, ce plancher reste assez haut. Un détendeur électronique accepte une haute pression plus basse : on gagne encore.",
        "Le plancher se règle d'après les détendeurs, la ligne liquide et la documentation du constructeur, jamais au jugé.",
        "En été, de l'autre côté, la haute pression monte avec la chaleur : là, c'est le pressostat haute pression de sécurité qui veille."
      ],
      question: { q: "Pourquoi la haute pression flottante a-t-elle un plancher ?",
        choix: [["Pour que les détendeurs gardent assez d'écart de pression pour alimenter les évaporateurs.", 1],
                ["Pour que les ventilateurs ne s'arrêtent jamais.", 0],
                ["Pour protéger le condenseur du gel.", 0]],
        pourquoi: "Le détendeur a besoin d'un écart suffisant entre haute et basse pression pour bien alimenter l'évaporateur. Un détendeur thermostatique en demande plus qu'un électronique : le plancher se règle d'après eux et la documentation." } },
    { id: "ecran", num: "13", titre: "L'écran du régulateur", sous: "ce que lit le technicien",
      carte: [3.5, 3.5], diag: [10, 40], calques: { consigne: 0, zone: 0, marches: 0 }, puces: [["BP", "relevés"], ["HP", "alarmes"]],
      phrases: [
        "Pour finir, ouvrons l'armoire : l'écran du régulateur de centrale.",
        "Le technicien y lit la basse pression et sa consigne, la haute pression et sa consigne, et les compresseurs en marche.",
        "Il regarde aussi les heures de marche de chaque compresseur : grâce à la permutation, elles doivent rester proches.",
        "Et le nombre de démarrages : trop de démarrages, c'est souvent une zone neutre trop étroite, ou des temporisations trop courtes.",
        "Quatre compresseurs en marche, et une basse pression qui reste au-dessus du seuil haut ? La centrale ne suit plus : il faut chercher pourquoi.",
        "Le régulateur garde l'historique des courbes et des alarmes, et prévient le technicien d'astreinte."
      ],
      question: { q: "Le compteur montre beaucoup trop de démarrages des compresseurs. Que vérifier en premier ?",
        choix: [["La largeur de la zone neutre et les temporisations.", 1],
                ["La couleur du voyant liquide.", 0],
                ["Le niveau d'huile du séparateur.", 0]],
        pourquoi: "Une zone neutre trop étroite ou des temporisations trop courtes font démarrer et arrêter les compresseurs trop souvent. On les vérifie d'après la documentation du régulateur." } },
    { id: "resume", num: "", titre: "La régulation en un tour", sous: "l'essentiel à retenir", carte: null,
      phrases: [
        "Refaisons le tour de la régulation.",
        "La basse pression bouge selon la vapeur qui arrive et celle qui part.",
        "Le régulateur la tient autour de sa consigne, dans une zone neutre : au-dessus, un compresseur de plus ; en dessous, un de moins.",
        "Toujours après une temporisation, et chacun son tour, grâce à la permutation.",
        "Sur le toit, les ventilateurs tiennent la haute pression.",
        "La haute pression flottante suit l'air du dehors, jusqu'à son plancher : de l'énergie gagnée tout l'hiver.",
        "Et au-dessus de la régulation, il y a toujours les sécurités."
      ],
      question: { q: "Sur une centrale, qu'est-ce qui fait démarrer un compresseur de plus ?",
        choix: [["La basse pression qui reste au-dessus du seuil haut de la zone neutre.", 1],
                ["La haute pression qui baisse.", 0],
                ["L'heure de la journée.", 0]],
        pourquoi: "Le régulateur compare la basse pression à sa consigne : quand elle reste au-dessus du seuil haut de la zone neutre, après la temporisation, il démarre un compresseur de plus." } }
  ],
  portes: [
    { t: "Le premier voyage : le circuit de base", h: "../voyage/module.html" },
    { t: "Le régulateur électronique", h: "../packs/fluides/res/regulateur-electronique-interactif/" },
    { t: "Le condenseur", h: "../packs/fluides/res/condenseur-interactif/" },
    { t: "Le KVR et le NRD : la haute pression par temps froid", h: "../packs/fluides/res/regulateur-kvr-nrd/" }
  ]
};
