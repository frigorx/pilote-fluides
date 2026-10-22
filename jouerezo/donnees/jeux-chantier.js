/* =====================================================================
   jeux-chantier.js — le chantier : qui, quels papiers, quel matériel,
   quel outil, quel déchet, quelle parole au client (J5 à J9, J11)
   ---------------------------------------------------------------------
   RÔLE : la matière des thèmes du moteur ranger.js (J5, J6, J7, J8, J9)
   et d'un QCM (J11). themes.js en dérive les thèmes (portes et codes
   du référentiel y sont posés). J10 (tonnes éq. CO₂) vit dans
   donnees/jeux-co2.js, FABRIQUÉ par outils/fabriquer-co2.mjs.
   D'OÙ VIENT LE CONTENU — rien d'inventé, chaque bloc cite sa source :
     · J5 : station Législation « Qui intervient sur une installation
       frigorifique ? » (acteurs-installation, écrans 2 à 6) ;
     · J6 : station Législation « Les papiers du chantier »
       (risques-papiers-chantier, écrans 2 à 7 et questions 1 à 4) ;
     · J7 : les gares « Poser les manomètres » et « Tirer au vide » du Tour
       de main (manirezo/interventions/<gare>/donnees.js : contrôles, gestes) et
       les stations CuivRézo 3.1 et 3.2 (champ materiel) ;
     · J8 : les mêmes gares (contrôle du manifold et de la pompe, vannes de
       service), la station CuivRézo 2.1 (poste oxyacétylénique) et les
       films « Ça aurait pu mal finir » du Studio (épisodes 3 et 7) ;
     · J9 : stations Législation « Trier : les 8 flux » (écrans 3, 6, 7 et
       questions), « Déchets dangereux » (écrans 2 et 6) et
       « Responsabilités » (écran 4) ;
     · J11 : le livret « Techniques commerciales appliquées au secteur CVC »
       de Franck (séances 1-2, élève et enseignant, fonds
       09_Progressions-Sequences/) : mise en situation, tableau des 12 freins
       et phrases « à ne pas dire », corrections, grille d'observation.
   FORMATS : ranger.js — manches[{ titre, consigne, bacs[{id,nom,aide}],
   etiquettes[{t, bac, exp, img|src|lib, scene}] }] ; QCM — {q, ok, nok[2], exp}.
   IMAGES : outils = les six vues d'illustrations/outils/, les dessins
   illustrations/chalumeau.svg et azote.svg, les scènes CuivRézo
   (../cuivrezo/images/), les symboles de ../symboles/svg/. Un objet sans
   image dans la bibliothèque reste une étiquette de texte (jamais inventé).
   ===================================================================== */
(function () {
  "use strict";
  const O = "illustrations/outils/";
  const CU = "../cuivrezo/images/";
  const IMG = {
    manifold: { src: O + "manifold.webp" }, pompe: { src: O + "pompe-a-vide.webp" }, vacuo: { src: O + "vacuometre.webp" },
    balance: { src: O + "balance.webp" }, station: { src: O + "station-recuperation.webp" }, detecteur: { src: O + "detecteur-fuite.webp" },
    chalumeau: { src: "illustrations/chalumeau.svg" }, azote: { src: "illustrations/azote.svg" },
    bouteille: { img: "bouteille-de-refrigerant" },
    coupe: { src: CU + "1-3-couper.webp", scene: true }, cintreuse: { src: CU + "1-5-cintreuse.webp", scene: true }
  };
  /* e(texte, bac, explication, image) */
  function e(t, bac, exp, im) { return Object.assign({ t: t, bac: bac, exp: exp }, im || {}); }

  /* ----- les bacs de J7 et J8 ----- */
  const CAISSE = [{ id: "caisse", nom: "Dans la caisse", aide: "je l'emporte" }, { id: "inutile", nom: "Inutile ici", aide: "je le laisse" }];
  const SERVICE = [{ id: "bon", nom: "Bon pour le service", aide: "je peux l'utiliser" }, { id: "defaut", nom: "À mettre de côté", aide: "je le signale" }];

  window.JR_JEUX_CHANTIER = {

    /* ================= J5 — Qui fait quoi ? (acteurs-installation) ================= */
    acteurs: [
      { titre: "Celui qui commande, celui qui conçoit, celui qui contrôle",
        consigne: "Rangez chaque phrase chez l'acteur qui lui correspond.",
        bacs: [{ id: "moa", nom: "Maître d'ouvrage" }, { id: "moe", nom: "Maître d'œuvre" }, { id: "bc", nom: "Bureau de contrôle" }, { id: "sps", nom: "Coordonnateur SPS" }],
        etiquettes: [
          e("Il commande les travaux, les paie et les accepte à la fin", "moa", "Le maître d'ouvrage est la personne pour qui on installe : il commande, il paie, il accepte."),
          e("À la fin, vous lui faites signer le procès-verbal de réception", "moa", "C'est lui qui accepte les travaux, avec ou sans réserves (art. 1792-6 du Code civil)."),
          e("Il dessine les plans, prépare les devis et dirige les travaux", "moe", "Le maître d'œuvre conçoit le projet et dirige les travaux : architecte, bureau d'études, parfois entreprise générale."),
          e("Vous respectez ses plans et ses ordres écrits", "moe", "Si un plan ne marche pas, vous l'en informez avant de modifier."),
          e("Il vérifie la solidité et la sécurité des personnes, et donne son avis", "bc", "Le bureau de contrôle (contrôleur technique) donne un avis ; il ne conçoit pas et ne construit pas."),
          e("Votre responsable lui transmet les notices et les résultats d'essais qu'il demande", "bc", "Ce sont les pièces que le bureau de contrôle réclame."),
          e("Il écrit le plan général de coordination (PGC)", "sps", "Quand plusieurs entreprises travaillent sur un chantier de bâtiment, le coordonnateur SPS organise la sécurité commune."),
          e("Votre entreprise lui remet son plan particulier de sécurité (PPSPS)", "sps", "Le PPSPS est celui de votre entreprise ; le PGC est celui du coordonnateur.")
        ] },
      { titre: "Celui qui fait, celui qui possède, celui qui vend le fluide",
        consigne: "Rangez chaque phrase chez l'acteur qui lui correspond.",
        bacs: [{ id: "ent", nom: "Entreprise attestée (capacité)" }, { id: "tech", nom: "Technicien attesté (aptitude)" }, { id: "det", nom: "Détenteur (l'exploitant)" }, { id: "dis", nom: "Distributeur de fluide" }],
        etiquettes: [
          e("Elle établit la fiche d'intervention", "ent", "L'entreprise attestée est « l'opérateur » du Code de l'environnement : elle établit la fiche (art. R. 543-82)."),
          e("Elle intervient avec des techniciens attestés et un outillage vérifié", "ent", "L'attestation de capacité est celle de l'entreprise."),
          e("Son attestation est personnelle : elle prouve qu'il sait manipuler le fluide", "tech", "L'attestation d'aptitude est celle du technicien, c'est vous. Il faut les deux."),
          e("Il répond de son geste, de sa sécurité et de celle des autres", "tech", "Chacun doit prendre soin de sa santé et de sa sécurité, et de celles des autres (Code du travail, art. L. 4122-1)."),
          e("Il fait contrôler l'étanchéité et réparer les fuites", "det", "Le détenteur répond de la machine (art. R. 543-79). Vous l'informez de l'état de la machine et des fuites."),
          e("Il signe la fiche d'intervention quand elle l'exige et garde l'original", "det", "Le détenteur garde l'original ; chacun garde un exemplaire au moins cinq ans."),
          e("Il reprend sans frais les fluides usagés", "dis", "La reprise des fluides usagés est sa responsabilité (art. R. 543-91)."),
          e("Vous lui rapportez le fluide récupéré qui ne peut pas être réutilisé", "dis", "Le fluide qui ne peut pas être réutilisé retourne au distributeur, ou vous le faites traiter sous votre responsabilité (art. R. 543-92).")
        ] },
      { titre: "Celui qui fabrique, celui qui traite, celui qui se sert",
        consigne: "Rangez chaque phrase chez l'acteur qui lui correspond.",
        bacs: [{ id: "fab", nom: "Fabricant" }, { id: "trait", nom: "Installation de traitement" }, { id: "cli", nom: "Client et utilisateur" }],
        etiquettes: [
          e("Il établit la déclaration UE de conformité et livre sa notice", "fab", "Le fabricant construit l'équipement et le met sur le marché ; il tient la déclaration à la disposition des autorités."),
          e("Vous lui transmettez les défauts constatés", "fab", "Le fabricant répond de l'équipement : vous lui signalez les défauts. Vous lisez aussi sa notice, et vous la lui réclamez si elle manque."),
          e("Elle reçoit le fluide devenu déchet, puis le régénère ou le détruit", "trait", "C'est elle qui clôt le bordereau de suivi."),
          e("Vous lui remettez un bordereau de suivi exact", "trait", "Le bordereau (BSFF) s'établit avec la station « Traçabilité »."),
          e("Il se sert de l'installation tous les jours et signale ce qui ne va pas", "cli", "Le client commande l'intervention et la paie ; l'utilisateur se sert de l'installation. Une seule ligne dans votre tableau."),
          e("Vous lui expliquez en mots simples comment s'en servir", "cli", "Ce que vous avez fait, comment s'en servir, les consignes de sécurité.")
        ] }
    ],

    /* ================= J6 — Quels papiers pour ce chantier ? (risques-papiers-chantier) ================= */
    papiers: [
      { titre: "Avant, pendant, après : à quel moment ?",
        consigne: "Rangez chaque papier au moment où on le remplit. Un papier du « pendant » se remplit au fil de l'intervention, même si on le signe à la fin.",
        bacs: [{ id: "avant", nom: "Avant", aide: "avant le premier outil" }, { id: "pendant", nom: "Pendant", aide: "pendant l'intervention" }, { id: "apres", nom: "Après", aide: "après les travaux" }],
        etiquettes: [
          e("Devis signé", "avant", "Le client le signe : c'est son accord sur les travaux et sur le prix."),
          e("Ordre de service", "avant", "Il dit à l'entreprise de commencer. Il vient du maître d'œuvre."),
          e("Plan de prévention", "avant", "Les deux chefs d'entreprise le font ensemble avant de commencer chez une autre entreprise."),
          e("PPSPS", "avant", "L'entreprise l'écrit et le remet au coordonnateur SPS avant le chantier."),
          e("Protocole de sécurité", "avant", "Pour un chargement ou un déchargement, il remplace le plan de prévention (art. R. 4515-4)."),
          e("Permis de feu", "avant", "Obligatoire avant tout travail par point chaud : brasage, soudage, meulage."),
          e("Attestation de consignation", "avant", "Elle prouve que l'installation est consignée avant de travailler dessus."),
          e("Bon d'intervention", "pendant", "C'est un papier du « pendant » : la feuille de la visite, remplie au fil de la visite. Le client la signe en fin de visite : c'est la preuve que vous êtes venu."),
          e("Fiche d'intervention (Cerfa 15497)", "pendant", "C'est un papier du « pendant » : on la remplit au fil de l'opération, pour chaque opération qui manipule du fluide frigorigène (elle prouve où est passé le fluide). Les signatures viennent à la fin, mais la fiche appartient à l'intervention, pas à la réception."),
          e("Procès-verbal de réception", "apres", "Le client déclare accepter l'ouvrage, avec ou sans réserves : sa date part les garanties."),
          e("Fiche de mise en service", "apres", "Vous y écrivez les valeurs relevées en marche : elle prouve que l'installation a été contrôlée en marche."),
          e("Bordereau BSFF", "apres", "Un fluide récupéré qui ne sera pas réutilisé devient un déchet : il part avec un bordereau."),
          e("DOE (dossier des ouvrages exécutés)", "apres", "L'entreprise le remet au maître d'ouvrage après la réception."),
          e("Registre de l'équipement", "apres", "La mémoire de la machine : fluide chargé, contrôles d'étanchéité, fuites.")
        ] },
      { titre: "Quelle situation, quel papier ?",
        consigne: "Rangez chaque situation sous le papier qu'elle demande.",
        bacs: [{ id: "feu", nom: "Permis de feu" }, { id: "prev", nom: "Plan de prévention" }, { id: "fiche", nom: "Fiche d'intervention (Cerfa 15497)" }, { id: "pv", nom: "Procès-verbal de réception" }],
        etiquettes: [
          e("Vous allez braser un tube de cuivre chez un client", "feu", "Le permis de feu est obligatoire avant tout travail par point chaud, avant de sortir le chalumeau."),
          e("Un meulage va faire des étincelles dans le local", "feu", "Brasage, soudage, meulage : tous des points chauds."),
          e("Votre entreprise travaille 400 heures sur 12 mois dans un restaurant qui reste ouvert", "prev", "Dans les locaux d'une autre entreprise, 400 heures ou plus sur 12 mois : le plan de prévention est écrit (art. R. 4512-7)."),
          e("Les deux chefs d'entreprise analysent ensemble les risques du site", "prev", "C'est le plan de prévention : les deux le signent et chacun garde un exemplaire."),
          e("Vous récupérez le fluide d'une machine", "fiche", "Chaque opération qui manipule du fluide frigorigène a sa fiche, établie par l'opérateur."),
          e("Le détenteur garde l'original, vous gardez une copie", "fiche", "L'original va au détenteur, une copie à l'opérateur ; au moins cinq ans."),
          e("Le client accepte les travaux, avec ou sans réserves", "pv", "La réception est l'acte par lequel le client déclare accepter l'ouvrage (art. 1792-6 du Code civil)."),
          e("Il faut la date de départ des garanties", "pv", "La date du procès-verbal de réception part les garanties.")
        ] }
    ],
    /* tirage : 6 étiquettes par manche */

    /* ================= J7 — Le bon matériel (gares du Tour de main, CuivRézo 3.2) ================= */
    materiel: [
      { titre: "Poser les manomètres sur une machine",
        consigne: "Vous branchez un manifold sur une machine. Vous tirez d'abord au vide les flexibles, puis vous cherchez les fuites aux raccords, puis vous lisez la basse et la haute pression et vous les convertissez en températures. Que mettez-vous dans la caisse ?",
        bacs: CAISSE,
        etiquettes: [
          e("Lunettes et gants", "caisse", "Le fluide liquide brûle par le froid : lunettes et gants avant de toucher un flexible."),
          e("Manifold", "caisse", "C'est lui qui porte les manomètres BP et HP.", IMG.manifold),
          e("Flexibles bleu et rouge", "caisse", "Le bleu se branche à la basse pression, le rouge à la haute pression."),
          e("Pompe à vide", "caisse", "Elle retire l'air des flexibles avant qu'on ouvre les vannes de service.", IMG.pompe),
          e("Détecteur de fuite ou solution moussante", "caisse", "On passe l'un ou l'autre sur chaque raccord avant de lire. Sous azote : solution moussante, le détecteur ne sent pas l'azote.", IMG.detecteur),
          e("Réglette ou table pression-température", "caisse", "Elle convertit chaque pression en température de saturation, pour le fluide de la plaque."),
          e("Chalumeau", "inutile", "On ne brase rien pour poser des manomètres.", IMG.chalumeau),
          e("Balance de charge", "inutile", "Aucune charge à peser : on lit seulement les pressions.", IMG.balance),
          e("Station de récupération", "inutile", "On ne récupère aucun fluide : on lit les pressions.", IMG.station),
          e("Cintreuse", "inutile", "Aucun tube à plier pour poser un manifold.", IMG.cintreuse)
        ] },
      { titre: "Tirer au vide un circuit",
        consigne: "Le manifold est déjà posé sur la machine. Vous tirez au vide, puis vous testez la remontée. Que mettez-vous dans la caisse ?",
        bacs: CAISSE,
        etiquettes: [
          e("Pompe à vide, huile au niveau", "caisse", "Niveau d'huile entre les repères du hublot, huile claire.", IMG.pompe),
          e("Vacuomètre", "caisse", "On lit le vide au vacuomètre, jamais aux aiguilles du manifold.", IMG.vacuo),
          e("Flexible de vide, court et de gros diamètre", "caisse", "Il relie la voie VIDE du manifold à la pompe (sur un 2 voies : au flexible jaune)."),
          e("Lunettes et gants", "caisse", "Machine arrêtée et consignée, lunettes et gants."),
          e("Chronomètre", "caisse", "Le test de remontée se chronomètre : relevés au départ, à la moitié et à la fin de la durée donnée par le professeur."),
          e("Bouchons pour les raccords", "caisse", "À la fin, pompe et vacuomètre sont débranchés et les raccords bouchés."),
          e("Bouteille de fluide neuf", "inutile", "On ne charge pas encore : on tire d'abord au vide.", IMG.bouteille),
          e("Balance de charge", "inutile", "La charge vient après le vide : ici, on ne pèse rien.", IMG.balance),
          e("Chalumeau", "inutile", "Le chalumeau brase ; il n'a rien à faire pendant un tirage au vide.", IMG.chalumeau),
          e("Station de récupération", "inutile", "Le circuit est vide de fluide : il n'y a rien à récupérer.", IMG.station)
        ] },
      { titre: "Braser un joint cuivre sur cuivre, sous azote",
        consigne: "Brasure forte, avec balayage d'azote dans le tube. Que mettez-vous dans la caisse ?",
        bacs: CAISSE,
        etiquettes: [
          e("Poste oxyacétylénique vérifié", "caisse", "Bouteilles, détendeurs, clapets anti-retour : le poste se vérifie avant (station CuivRézo 2.1).", IMG.chalumeau),
          e("Baguettes de cuivre-phosphore", "caisse", "Pour un joint cuivre sur cuivre, elles brasent sans flux."),
          e("Azote : bouteille, détendeur, débitmètre, tuyau", "caisse", "L'azote balaie l'intérieur du tube pendant toute la brasure.", IMG.azote),
          e("Tampon abrasif", "caisse", "Pour nettoyer les deux pièces."),
          e("Écran de brasage, tapis anti-feu, extincteur", "caisse", "La zone autour du joint est protégée."),
          e("Lunettes teintées, gants à manchettes, tablier", "caisse", "Les protections de la brasure ; le professeur donne le numéro de teinte."),
          e("Pâte décapante", "inutile", "Elle sert à la brasure tendre à l'étain. Avec le cuivre-phosphore, on brase sans flux."),
          e("Fil d'étain", "inutile", "C'est l'apport de la brasure tendre (station CuivRézo 3.1), pas de la brasure forte."),
          e("Chalumeau propane", "inutile", "Il sert à la brasure tendre (station CuivRézo 3.1). Ici, c'est le poste oxyacétylénique."),
          e("Balance de charge", "inutile", "On ne charge pas de fluide pour braser un joint.", IMG.balance),
          e("Cintreuse", "inutile", "Elle plie les tubes (station CuivRézo 1.5) ; elle ne sert pas à braser un joint.", IMG.cintreuse)
        ] }
    ],

    /* ================= J8 — Bon pour le service ? ================= */
    outillage: [
      { titre: "Vous préparez votre outillage avant de partir",
        consigne: "Regardez l'état de chaque outil. Rangez-le : bon pour le service, ou à mettre de côté et à signaler.",
        bacs: SERVICE,
        etiquettes: [
          e("Manifold : aiguilles sur 0, rien de branché", "bon", "Le contrôle du manifold : aiguilles sur 0 quand rien n'est branché, vannes fermées.", IMG.manifold),
          e("Flexible avec un joint propre dans chaque raccord", "bon", "Contrôle du manifold : un joint propre dans chaque flexible."),
          e("Pompe à vide : huile claire, au niveau", "bon", "Niveau d'huile entre les repères du hublot, huile claire.", IMG.pompe),
          e("Pompe à vide : câble et prise en bon état", "bon", "Câble et prise en bon état : sans cela, la pompe ne démarre pas."),
          e("Vanne de service : capuchon et bouchon présents, serrés", "bon", "Rien d'abîmé, rien qui manque : c'est le contrôle de la vanne de service."),
          e("Bouteille d'azote avec son mano-détendeur", "bon", "Azote seul, détendeur toujours (film « La bouteille qui voulait s'envoler »).", IMG.azote),
          e("Poste de brasage : tuyaux avec leurs clapets anti-retour", "bon", "Près du chalumeau, les clapets anti-retour arrêtent une flamme qui remonterait (station CuivRézo 2.1).", IMG.chalumeau),
          e("Manifold : une aiguille ne revient pas sur 0", "defaut", "Rien n'est branché : les aiguilles doivent être sur 0. On le signale.", IMG.manifold),
          e("Flexible sans joint dans le raccord", "defaut", "Il faut un joint propre dans chaque flexible : on ne branche pas."),
          e("Pompe à vide : huile laiteuse", "defaut", "Il faut une huile claire, pas laiteuse.", IMG.pompe),
          e("Pompe à vide : câble abîmé", "defaut", "Le câble et la prise doivent être en bon état. Un outil abîmé se signale (film « L'atelier n'est pas une cour de récré »)."),
          e("Vanne de service : capuchon de tige absent", "defaut", "Rien ne doit manquer : capuchons de tige et bouchons de prise présents et serrés."),
          e("Bouteille d'azote sans mano-détendeur", "defaut", "Jamais d'azote sans mano-détendeur : il ramène la pression de la bouteille à celle du travail."),
          e("Meuleuse sans carter", "defaut", "Le carter n'est pas décoratif (film « Le carter, c'est pas décoratif »).")
        ] }
    ],

    /* ================= J9 — Où va ce déchet ? ================= */
    dechets: [
      { titre: "Les bennes du chantier",
        consigne: "Un déchet, une matière, une benne. Rangez chaque déchet dans la bonne benne.",
        bacs: [{ id: "metaux", nom: "Benne métaux" }, { id: "papier", nom: "Benne papier-carton" }, { id: "bois", nom: "Benne bois" }, { id: "tout", nom: "Tout-venant", aide: "ce qui ne se trie pas" }],
        etiquettes: [
          e("Chutes de cuivre", "metaux", "Le cuivre trié à part garde sa valeur de recyclage, même en petite quantité."),
          e("Gaine métallique", "metaux", "Les gaines métalliques vont avec les métaux."),
          e("Carton d'emballage du matériel", "papier", "Les cartons d'emballage forment la famille papier-carton."),
          e("Palette de livraison", "bois", "Une palette est en bois : benne bois."),
          e("Chute de bois d'un support", "bois", "Les chutes de bois (supports, palettes) vont dans la benne bois."),
          e("Chutes d'isolant, non recyclables", "tout", "L'isolant ne se recycle pas : il va au tout-venant, et jamais dans une benne de matière triée comme les métaux ou le bois.")
        ] },
      { titre: "Une benne du chantier, ou une filière à part ?",
        consigne: "Certains déchets ne vont dans aucune benne du chantier : ils suivent une filière à part, tracée.",
        bacs: [{ id: "benne", nom: "Une benne du chantier" }, { id: "part", nom: "Filière à part, tracée", aide: "déchet dangereux" }],
        etiquettes: [
          e("Fluide frigorigène récupéré, non réutilisable", "part", "Un fluide contaminé, mélangé ou non identifiable devient un déchet dangereux : jamais une benne de tri.", { img: "bouteille-de-refrigerant" }),
          e("Huile usagée", "part", "Par sa nature, une huile usagée est un déchet dangereux, même en petite quantité."),
          e("Filtre déshydrateur contaminé", "part", "Certains filtres déshydrateurs contaminés exigent un suivi tracé."),
          e("Chutes de cuivre", "benne", "Le cuivre n'entre pas dans le suivi tracé : il suit la filière classique de tri."),
          e("Cartons d'emballage", "benne", "Les cartons suivent la filière classique de tri."),
          e("Palettes de livraison", "benne", "Les palettes suivent la filière classique de tri.")
        ] }
    ],

    /* ================= J11 — Parler au client (livret « Techniques commerciales », séances 1-2) ================= */
    client: [
      { q: "Chez Mme Martin, la pompe à chaleur est en panne depuis 3 jours. Elle vous accueille très énervée : « Ça fait 3 jours qu'on gèle ! C'est inadmissible ! » Que répondez-vous ?",
        ok: "« Je comprends votre frustration. Trois jours sans chauffage en hiver, c'est très difficile. Je vais faire le maximum pour résoudre ça rapidement. »",
        nok: ["« Vous auriez dû appeler plus tôt, c'est de votre faute. »", "« C'est rien du tout, ça va passer ! »"],
        exp: "On reste calme, on ne prend pas la colère personnellement, on reconnaît la frustration. Moraliser (faire la leçon) et minimiser le problème sont deux freins à la relation client." },
      { q: "Chez Mme Martin, qui est très énervée : quelle attitude adoptez-vous ?",
        ok: "Posture ouverte, regard bienveillant, ton calme, distance respectueuse",
        nok: ["Bras croisés, ton ferme, pour garder l'autorité", "Je regarde la machine, pas la cliente"],
        exp: "Le non-verbal (gestes, posture, regard, ton de la voix) pèse 60 à 80 % de la communication. Il rassure ou il énerve avant même le premier mot." },
      { q: "Un client appelle : sa climatisation fait du bruit. Quelle réponse est la bonne ?",
        ok: "« Je comprends que cette panne soit inquiétante. Je vais diagnostiquer l'origine du bruit et vous proposer la meilleure solution. »",
        nok: ["« Vous auriez dû nous appeler plus tôt ! Maintenant c'est sûrement trop tard, le compresseur est mort. »", "« Et là vous étiez où ? Et ensuite ? Et avant ça ? »"],
        exp: "Dire « c'est trop tard, le compresseur est mort » moralise et menace. Poser « Et là vous étiez où ? Et ensuite ? » enquête : trop de questions, comme un interrogatoire." },
      { q: "Un client vous explique longuement son problème de chauffage. Que faites-vous ?",
        ok: "Je l'écoute sans l'interrompre, puis je reformule : « Si je comprends bien, votre chauffage pose problème. Pouvez-vous me montrer où ? »",
        nok: ["« Oui oui, je connais, c'est classique. Bon, on va voir ça. Sinon, vous avez vu le match hier ? »", "« Bon sinon, vous avez vu la météo ? »"],
        exp: "Écouter sans interrompre, puis reformuler pour montrer qu'on a compris. Couper la parole, minimiser et changer de sujet (esquiver) sont des freins." },
      { q: "Une cliente s'inquiète de sa facture d'énergie. Quelle réponse choisissez-vous ?",
        ok: "« Je comprends votre préoccupation. Regardons ensemble les options : un entretien approfondi, ou un remplacement avec les aides disponibles. »",
        nok: ["« Bah, c'est normal avec une vieille chaudière comme la vôtre ! Vous devriez en changer depuis longtemps. »", "« C'est n'importe quoi d'avoir choisi ce modèle ! »"],
        exp: "Juger les choix du client et lui faire la leçon ferment la discussion. On propose des options, ensemble." },
      { q: "Vous arrivez chez un client pour un dépannage. Que faites-vous d'abord ?",
        ok: "Je me présente clairement : mon nom et mon entreprise",
        nok: ["J'entre directement et je regarde la machine sans rien dire", "Je demande tout de suite le prix que le client est prêt à payer"],
        exp: "Premier critère de la grille d'observation : se présenter clairement (nom, entreprise), puis regarder le client dans les yeux." },
      { q: "Remise de l'installation : le client vous pose une question pendant que vous expliquez. Que faites-vous ?",
        ok: "Je m'arrête, je l'écoute jusqu'au bout, puis je lui réponds",
        nok: ["Je finis mon explication d'abord, il verra après", "Je réponds avant la fin de sa question, je sais déjà ce qu'il va dire"],
        exp: "Écouter sans interrompre : couper la parole et argumenter sont des freins." },
      { q: "Consigne d'utilisation : vous expliquez le fonctionnement à un client. Quels mots choisissez-vous ?",
        ok: "Des mots simples, sans jargon incompréhensible",
        nok: ["Les termes techniques, pour qu'il voie que je maîtrise", "Aucun mot : je règle la machine et je pars"],
        exp: "On évite le jargon technique incompréhensible : le client doit comprendre comment s'en servir." },
      { q: "Remise de l'installation : comment savez-vous que le client a bien compris vos explications ?",
        ok: "Je lui demande de redire avec ses mots ce qu'il a compris : c'est le retour d'information (feedback)",
        nok: ["Je répète la même explication, plus vite", "Je suppose que oui s'il dit « d'accord »"],
        exp: "Le schéma de la communication se termine par le feedback, la réponse de celui qui reçoit : sans lui, on ne sait pas si le message est passé." },
      { q: "En intervention chez un client, dans quelle sphère de distance se place-t-on ?",
        ok: "La sphère sociale, entre 1,20 m et 3,60 m",
        nok: ["La sphère intime, à moins de 45 cm", "La sphère publique, à plus de 3,60 m"],
        exp: "Respecter cette distance met le client à l'aise, montre le professionnalisme et évite l'intrusion." },
      { q: "Quelle part de la communication passe par le non-verbal (gestes, posture, regard, ton) ?",
        ok: "60 à 80 %",
        nok: ["20 à 30 %", "90 à 100 %"],
        exp: "Selon les études, 60 à 80 % : les mots ne sont qu'une partie du message." }
    ]
  };
})();
