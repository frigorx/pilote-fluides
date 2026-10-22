/* =====================================================================
   Gare « REMPLACER UN COMPOSANT ÉLECTRIQUE SOUS CONSIGNATION » (ligne « Les interventions de base », au poste).
   Exemple principal : le contacteur ; variante : le pressostat (même suite, mêmes arrêts).
   Restructure, sans réinventer (voir SOURCES.md) :
   · la consignation : station « Consigner — VAT, les 4 étapes » (Législation), module M9 de HoCourant, capsule « Consigner avant de toucher »
     (Plan — capsules) : séparer, condamner, identifier, vérifier l'absence de tension (VAT) ; le VAT se teste avant ET après ;
   · le titre visé, tranché par Franck le 01/09/2026 (progression-1re-mfer/_ETAT.md) : B1V = exécutant hors tension, sur ordre ; la consignation,
     la mise sous tension, le démarrage et les mesures sous tension sont au professeur (ou à un titre BC, BE, BR) ;
   · ÉlectroRézo 5.2 « Le contacteur » : bornes A1 A2, 1/2 3/4 5/6, tension de bobine, « un contacteur n'est pas un appareil de sectionnement » ;
   · le jeu de poste « Le réglage des pressostats » (variante) : bornes 1, 2, 4 et terre du KP1.
   Aucune valeur universelle inventée : couple de serrage et valeurs de réglage viennent de la notice ou du professeur.
   ===================================================================== */
(function () {
  /* petit écran ou tactile : le bouton « Agrandir » du site se pose sur le coin haut droit du dessin ; on lui laisse une bande vide
     au-dessus du dessin, pour qu'il ne recouvre jamais un appareil à toucher (audit de trouvabilité, 19/10/2026) */
  const PETIT = !!(window.matchMedia && window.matchMedia("(max-width: 900px), (pointer: coarse)").matches);

  window.GARE = {
    id: "remplacer-composant-electrique",
    titre: "Remplacer un composant électrique sous consignation",
    sousTitre: "Les interventions de base · gare 11 · contacteur (pressostat en variante) · en cours de relecture",
    parcours: ["charge"],
    parcoursNoms: { charge: { nom: "Armoire électrique", aide: "composant à remplacer, hors tension, sous la direction du professeur" } },
    machine: [
      { id: "composant", label: "Composant à remplacer (repère sur le schéma)", court: "Composant", exemple: "ex. contacteur KM1", texte: true },
      { id: "tension", label: "Tension de la bobine du contacteur (schéma de l'armoire, ou écrite sur la bobine)", court: "Bobine", unite: "V", nombre: true },
      { id: "intensite", label: "Intensité nominale du moteur commandé (plaque du moteur)", court: "Moteur", unite: "A", nombre: true }
    ],
    /* Deux niveaux (Franck, 08/10) : mêmes étapes, mêmes attendus ; codes et exigence propres. */
    codes: {
      cap: "CAP IFCA — tâches T16, T12, T10, T1 · compétences C5.1, C2.4, C3.6, C4.5, C1.1 · savoirs S5.6, S6.2, S6.3",
      mfer: "1re Bac Pro MFER — tâches A1T3, A4T2, A5T2 · compétences C4, C10, C11 · savoirs S4, S6, S7",
      commun: "consignation en quatre opérations (séparer, condamner, identifier, vérifier l'absence de tension) ; habilitation électrique selon le titre de l'élève (B1V-BR visées au Bac MFER, savoir S7) ; attestation d'aptitude fluides (règlement (UE) 2024/2215, annexe I) : 4.05 (multimètre : volts, ampères, ohms)"
    },
    grille: [
      ["Je consigne avec le professeur : séparer, condamner, identifier, VAT", { cap: "T12 · C2.4", mfer: "A1T3 · C4" }],
      ["Je repère les fils AVANT de les retirer, puis je dépose", { cap: "T10 · C3.6", mfer: "A4T2 · C10" }],
      ["Je pose le composant neuf et je recâble fil par fil, sans en oublier", { cap: "C5.1 · T16", mfer: "A4T2 · C10" }],
      ["Je vérifie, je déconsigne, je relève l'essai : tension et intensité", { cap: "C4.5 · S5.6", mfer: "A4T2 · C10" }],
      ["Je trace ce que j'ai fait", { cap: "T1 · C1.1", mfer: "A5T2 · C11" }]
    ],
    exigence: {
      cap: "chaque geste juste et dans l'ordre, rien touché avant la VAT, fils repérés avant la dépose, tous les fils remis, essai noté ; le professeur peut guider aux points d'arrêt.",
      mfer: "les mêmes gestes, sans aide entre les points d'arrêt ; je justifie la consignation (pourquoi le VAT avant et après, pourquoi un contacteur ne sépare pas) et je repère seul un relevé incohérent."
    },
    savoirEtre: "je ne touche à rien tant que le professeur n'a pas vérifié la consignation",
    tolerances: { pesee: 0.05, mesure: 0.05 },

    bilan(c) {
      const n1 = c.releve("reperer", 0), n2 = c.releve("cabler", 0), u = c.releve("tension", 0), i = c.releve("intensite", 0);
      return `Composant : <b>${c.m.composant || "…"}</b> (bobine <b>${c.m.tension || "…"} V</b>) · fils retirés <b>${n1 || "…"}</b>, remis <b>${n2 || "…"}</b> · ` +
        `essai : tension à la bobine <b>${u || "…"} V</b>, intensité du moteur <b>${i || "…"} A</b> (plaque ${c.m.intensite || "…"} A)`;
    },

    dessin: {
      fichier: "dessin.svg",
      vue: PETIT ? "0 -190 1200 820" : "0 0 1200 630",
      noms: { "equipment-consigner-1": "séparer et condamner (le sectionneur, le cadenas, la pancarte)", "equipment-consigner-2": "identifier le circuit et vérifier l'absence de tension (VAT)",
        "equipment-contacteur": "le contacteur, composant à remplacer", "equipment-pressostat": "le pressostat (variante)" }
    },

    etapes: [
      { id: "securite", verbe: "Je me protège et je vérifie mon titre", cadre: ["equipment-contacteur"], cible: "equipment-contacteur",
        narration: "Cette gare s'appelle « Remplacer un composant électrique sous consignation ». L'exemple est le contacteur ; si c'est un pressostat, la suite est la même. Remplacer un composant, c'est mettre les mains dans l'armoire. Avant cela, vous vous protégez : lunettes, gants isolants, outils isolés en bon état. Vous ne faites que ce que votre titre d'habilitation permet. Avec le titre B1V, que les référentiels visent, vous exécutez des travaux hors tension, sur ordre du professeur. La consignation, la mise sous tension et les mesures sous tension sont à lui, ou à une personne qui a le titre qu'il faut. Et un point à graver : une machine arrêtée n'est pas une machine consignée. Le professeur vient vérifier avant de continuer.",
        regarde: "Le composant à remplacer, dans l'armoire.",
        fais: "Lunettes, gants isolants, outils isolés. Mon titre (B1V) : j'exécute hors tension, sur ordre du professeur. Consigner, mettre sous tension, mesurer sous tension : c'est lui.",
        voir: "EPI sur moi ; je sais ce que mon titre permet : exécuter hors tension.",
        danger: "Arrêtée n'est pas consignée : un bouton sur arrêt ou un voyant éteint ne prouvent rien.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["lunettes et gants isolants portés", "outils isolés, en bon état", "je sais ce que mon titre permet : B1V exécute hors tension ; consigner, mettre sous tension, mesurer sous tension, c'est le professeur", "machine arrêtée (ce n'est pas encore une consignation)", "<span>je connais les 4 opérations de la consignation (à revoir : <a href='../../../packs/fluides/res/capsules/?c=s5'>capsule « Consigner avant de toucher »</a>, <a href='../../../legislation/stations/elec-consigner/'>station « Consigner — VAT »</a>, <a href='../../../hocourant/?module=M9'>HoCourant M9</a>)</span>"],
          ok: "Prêt pour la consignation.", manque: "Il manque une coche : je ne continue pas avant." },
        arret: "Le professeur a vérifié : mon titre, mes EPI et mes outils." },

      /* Franck, 08/10 : avant toute intervention, état des lieux — rien de perdu, rien d'abîmé. L'armoire reste FERMÉE jusqu'à la consignation. */
      { id: "etat-des-lieux", verbe: "Je fais l'état des lieux de l'armoire", cadre: ["equipment-contacteur"], cible: "equipment-contacteur",
        narration: "Avant toute intervention, on constate l'état dans lequel on trouve l'armoire, sans l'ouvrir et sans toucher à rien. L'armoire reste fermée tant qu'elle n'est pas consignée. On regarde la porte, les capots, les étiquettes. On cherche les traces de chauffe ou de brûlure visibles de l'extérieur. On prend le schéma de l'armoire : il montre où est le composant à remplacer et la tension de sa bobine. Ce constat est votre point de repère : à la fin, tout sera remis comme vous l'avez trouvé. Ensuite, on choisit le composant neuf.",
        regarde: "L'armoire fermée, ses étiquettes, le schéma.",
        fais: "Armoire fermée : je regarde sans ouvrir ni toucher. Porte, capots, étiquettes, traces de chauffe vues de l'extérieur. Au schéma : le composant et la tension de sa bobine.",
        voir: "Armoire fermée en bon état ; composant repéré au schéma, bobine notée.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["porte et capots en bon état, armoire fermée", "étiquettes et repères lisibles de l'extérieur (ou notés absents)", "traces de chauffe ou de brûlure visibles de l'extérieur notées", "schéma en main : composant repéré, tension de sa bobine lue"],
          ok: "État des lieux fait : je saurai tout remettre comme je l'ai trouvé.",
          manque: "Il manque quelque chose : je le signale au professeur avant de commencer." } },

      { id: "choisir", verbe: "Je choisis le composant neuf", cadre: ["equipment-contacteur"], cible: "equipment-contacteur",
        narration: "On remplace à l'identique. Pour un contacteur, le point qui compte le plus est la tension de la bobine : elle est écrite sur la bobine, et elle n'a rien à voir avec la tension de puissance. Si elle ne correspond pas à la tension qu'on va lui envoyer, la bobine ne colle pas ou elle brûle. Vous lisez donc la référence du neuf et la tension de sa bobine, et on les compare à celles du schéma de l'armoire. Pour un pressostat, même démarche : même référence, même plage de réglage.",
        regarde: "L'étiquette du composant neuf, le schéma de l'armoire.",
        fais: "Je lis la référence du neuf et la tension de sa bobine. Je compare à celle du schéma. Pressostat : même référence, même plage.",
        voir: "Même tension de bobine que sur le schéma ; référence lue.",
        danger: "Une bobine à la mauvaise tension ne colle pas, ou brûle : je ne monte pas un composant différent.",
        controle: { titre: "Mon composant neuf", champs: [{ label: "Référence du neuf", texte: true }, { label: "Tension de sa bobine", unite: "V" }],
          juger(v, c) {
            const u = c.nb(v[1]), ref = c.nb(c.m.tension);
            if (isNaN(u)) return ["ambre", "J'écris la tension de la bobine du neuf, en volts, par exemple 24 ou 230."];
            if (isNaN(ref)) return ["ambre", "J'écris d'abord la tension de la bobine du composant en place dans « Ma machine »."];
            if (u !== ref) return ["rouge", "STOP : la bobine du neuf est à " + u + " V, celle en place à " + ref + " V. Je ne le monte pas : j'appelle le professeur."];
            return ["vert", "Même tension de bobine (" + ref + " V) : ce composant convient. Référence notée : " + v[0] + "."];
          } } },

      { id: "separer-condamner", verbe: "On sépare et on condamne", cadre: ["equipment-consigner-1"], cible: "equipment-consigner-1",
        narration: "Première moitié de la consignation. C'est le professeur, chargé de la consignation, qui la fait ; vous la suivez geste par geste et vous nommez chaque opération. Séparer : il ouvre le sectionneur de l'armoire, de façon que la séparation soit certaine, sur toutes les sources, puissance comme commande. Attention, un contacteur ne sépare pas : il n'a ni distance d'ouverture garantie, ni possibilité de cadenassage. Ouvrir un contacteur, ou appuyer sur arrêt, ne met personne en sécurité. Condamner : le sectionneur est verrouillé ouvert par un cadenas. Vous posez le vôtre à côté du sien, la clé reste sur vous, et la pancarte porte le nom, la date et le repère.",
        regarde: "Le sectionneur de l'armoire, les cadenas, la pancarte.",
        fais: "Avec le professeur : il ouvre le sectionneur de l'armoire, séparation certaine. Je pose mon cadenas à côté du sien, ma clé sur moi, et la pancarte « CONDAMNÉ » : nom, date, repère.",
        voir: "Sectionneur ouvert, cadenas posés, pancarte en place.",
        danger: "Un contacteur ne sépare pas : ouvrir un contacteur ou appuyer sur arrêt ne met personne en sécurité.",
        controle: { titre: "Je coche ce que j'ai vu et fait", type: "coches",
          items: ["séparation par le sectionneur de l'armoire, pas par le contacteur", "toutes les sources séparées : puissance, commande, circuits extérieurs", "mon cadenas posé à côté de celui du professeur, ma clé sur moi", "pancarte CONDAMNÉ : nom, date, repère"],
          ok: "Séparé et condamné : il reste à identifier et à vérifier.", manque: "Il manque une coche : je ne continue pas avant." } },

      { id: "identifier-vat", verbe: "On identifie et on fait la VAT", cadre: ["equipment-consigner-2"], cible: "equipment-consigner-2",
        narration: "Seconde moitié, faite par le professeur sous vos yeux. Identifier : on s'assure, sur le lieu de travail, que c'est bien le bon circuit, avec les repères et le schéma. Une erreur de repérage rend toute la suite fausse. Puis la VAT, la vérification d'absence de tension. C'est elle qui prouve : les autres opérations ne prouvent rien. Le vérificateur est testé sur une source connue AVANT. On vérifie tous les conducteurs, neutre compris. Puis on le teste de nouveau APRÈS : s'il est tombé en panne entre-temps, tout ce qu'il a mesuré ne vaut rien. Un multimètre en voltmètre ou un tournevis testeur n'est pas un VAT. Le professeur vous dit quand vous pouvez toucher.",
        regarde: "Le vérificateur d'absence de tension, les repères du circuit.",
        fais: "Le professeur identifie le bon circuit sur place, teste son VAT sur une source connue, vérifie tous les conducteurs, neutre compris, reteste son VAT. Je regarde et je nomme chaque geste.",
        voir: "Aucune tension nulle part ; le VAT marche avant ET après.",
        danger: "Un voltmètre ou un tournevis testeur n'est pas un VAT. Un condensateur peut rester chargé.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["bon circuit identifié sur place (repère, schéma)", "VAT testé sur une source connue AVANT", "absence de tension sur tous les conducteurs, neutre compris", "VAT testé de nouveau APRÈS", "condensateurs éventuels déchargés (le professeur indique comment)"],
          ok: "Consignation complète : l'armoire est hors tension, prouvé.", manque: "Il manque une coche : je ne touche à rien avant." },
        arret: "Le professeur a vérifié : séparation, condamnation, identification et VAT, avant que je touche." },

      { id: "reperer", verbe: "Je repère les fils avant de les retirer", cadre: ["equipment-contacteur"], cible: "equipment-contacteur",
        narration: "L'armoire est consignée : vous pouvez l'ouvrir. C'est le moment de lire la référence du composant en place et de la photographier. Puis le geste qui évite l'erreur de recâblage. Avant de dévisser le moindre fil, vous photographiez le câblage, de face et de près. Vous posez une étiquette sur chaque fil, avec le même repère que la borne où il est vissé : A1, A2, un, trois, cinq, et ainsi de suite. Vous comparez avec le schéma. À la fin, il doit y avoir autant d'étiquettes que de fils à retirer. Un fil non repéré est un fil que vous ne saurez pas remettre. Pour un pressostat, ses trois fils et sa terre se repèrent de la même façon.",
        regarde: "Chaque fil, sa borne, le schéma.",
        fais: "Je lis et je photographie la référence du composant en place, et le câblage. J'étiquette chaque fil au repère de sa borne (A1, A2, 1, 3, 5…). Je compare au schéma.",
        voir: "Une étiquette lisible par fil, comparée au schéma.",
        danger: "Un fil non repéré est un fil que je ne saurai pas remettre : photo AVANT de dévisser.",
        controle: { titre: "Mon repérage", champs: [{ label: "Fils à retirer", unite: "fils" }, { label: "Étiquettes posées", unite: "étiquettes" }],
          juger(v, c) {
            const f = c.nb(v[0]), e = c.nb(v[1]);
            if (isNaN(f) || isNaN(e) || f < 1 || f !== Math.floor(f) || e !== Math.floor(e)) return ["ambre", "J'écris deux nombres entiers : les fils à retirer (au moins 1), puis les étiquettes posées."];
            if (e < f) return ["rouge", "STOP : " + f + " fils, " + e + " étiquette" + (e > 1 ? "s" : "") + ". Il en manque " + (f - e) + " : je ne retire aucun fil avant d'avoir repéré tous les fils."];
            if (e > f) return ["ambre", "J'ai posé plus d'étiquettes (" + e + ") que de fils (" + f + ") : je recompte."];
            return ["vert", f + " fils, " + e + " étiquettes : tous les fils sont repérés. Je peux déposer."];
          } } },

      { id: "deposer", verbe: "Je dépose l'ancien composant", cadre: ["equipment-contacteur"], cible: "equipment-contacteur",
        narration: "Maintenant on dépose. On desserre les bornes une à une, on retire chaque fil, et on l'écarte avec son étiquette : les extrémités propres, qui ne se touchent pas. Puis on libère la fixation, un clip sur le rail ou des vis, et on retire l'ancien composant. On le garde. On fait attention à ce qu'aucune vis, aucun outil, aucun brin de fil ne tombe dans l'armoire. Pour un pressostat, attention : son raccord est sur le circuit frigorifique, sous pression. On ne le dévisse pas avant que le fluide ait été récupéré, avec le professeur : c'est la gare « Récupérer le fluide ».",
        regarde: "Les vis des bornes, la fixation du composant.",
        fais: "Je desserre les bornes une à une, j'écarte les fils étiquetés, je libère la fixation. Pressostat : raccord sur le circuit sous pression, <a href='../recuperation/index.html'>récupération</a> d'abord, avec le professeur.",
        voir: "Fils écartés et repérés, composant libre.",
        danger: "Aucune vis, aucun outil ni brin de fil ne tombe dans l'armoire. Fils nus : ils ne se touchent pas.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["fils retirés un par un, étiquettes en place", "fils écartés, extrémités propres, qui ne se touchent pas", "fixation libérée (rail ou vis), ancien composant retiré et gardé", "rien de tombé dans l'armoire : outils et vis comptés"],
          ok: "Dépose faite : fils repérés et écartés.", manque: "Il manque une coche : je ne pose pas le neuf avant." } },

      { id: "poser", verbe: "Je pose le composant neuf", cadre: ["equipment-contacteur"], cible: "equipment-contacteur",
        narration: "On pose le neuf à la place de l'ancien, au même endroit, dans le même sens. Sur un rail, on le clipse ; sinon, on le visse. Il doit être droit, sans jeu. On lit ses repères de bornes pour s'assurer qu'ils sont les mêmes que sur l'ancien : A1 et A2 pour la bobine, un-deux, trois-quatre, cinq-six pour les contacts de puissance, avec l'entrée en haut et la sortie en bas. Rien n'est encore branché.",
        regarde: "Le rail ou la plaque, le composant neuf.",
        fais: "Je fixe le neuf au même endroit, dans le même sens : clip sur le rail, ou vis. Il est droit, sans jeu. Je lis ses repères de bornes.",
        voir: "Composant fixé, droit ; repères de bornes lisibles, comme sur l'ancien.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["fixé au même endroit, dans le même sens", "droit, sans jeu", "repères de bornes lus : les mêmes que sur l'ancien", "aucun fil encore branché"],
          ok: "Composant neuf en place.", manque: "Il manque une coche : je ne câble pas avant." } },

      { id: "cabler", verbe: "Je recâble, fil par fil", cadre: ["equipment-contacteur"], cible: "equipment-contacteur",
        narration: "On recâble. Chaque fil retourne sur la borne de son étiquette, un par un. On serre selon la notice : la valeur du couple n'est pas la même pour tous les appareils. Un fil trop lâche chauffe, une vis trop serrée s'abîme. On tire doucement sur chaque fil : il ne doit pas bouger. Aucun brin ne dépasse. À la fin, vous comptez : autant de fils remis que de fils retirés. S'il en manque un, on s'arrête et on cherche, on ne remet pas sous tension.",
        regarde: "Chaque fil, son étiquette, sa borne.",
        fais: "Je remets chaque fil sur la borne de son étiquette, un par un. Je serre selon la notice. Je tire doucement sur chaque fil : il ne bouge pas.",
        voir: "Chaque fil sur sa borne, serré ; aucun brin qui dépasse.",
        danger: "Serrage à la valeur de la notice : trop lâche, la borne chauffe ; trop serré, la vis s'abîme.",
        controle: { titre: "Mes fils remis", champs: [{ label: "Fils remis", unite: "fils" }],
          juger(v, c) {
            const m = c.nb(v[0]), n = c.nb(c.releve("reperer", 0));
            if (isNaN(m) || m < 1 || m !== Math.floor(m)) return ["ambre", "J'écris le nombre de fils remis, un nombre entier."];
            if (isNaN(n)) return ["ambre", "Je n'ai pas noté le nombre de fils retirés (étape de repérage) : je compte avec le professeur."];
            if (m < n) return ["rouge", "STOP : j'ai retiré " + n + " fils et j'en ai remis " + m + ". Il en manque " + (n - m) + " : je cherche, je ne remets pas sous tension."];
            if (m > n) return ["ambre", "J'ai remis plus de fils (" + m + ") que j'en avais retirés (" + n + ") : je recompte, une borne a-t-elle deux fils ?"];
            return ["vert", n + " fils retirés, " + m + " fils remis : aucun oublié."];
          } } },

      { id: "verifier", verbe: "Je vérifie avant de remettre sous tension", cadre: ["equipment-contacteur"], cible: "equipment-contacteur",
        narration: "Avant de remettre sous tension, on vérifie, toujours hors tension. On compare le câblage à la photo et au schéma. Puis on mesure la bobine à l'ohmmètre, entre A1 et A2. Ce qu'on attend, c'est une valeur : ni zéro, qui serait un court-circuit, ni l'infini, qui voudrait dire une bobine coupée ou un fil mal branché. La valeur de la bobine est dans la notice du composant. Pour un pressostat, on vérifie la continuité entre ses bornes, comme le professeur le montre. On regarde enfin qu'aucun outil, aucun brin libre ne reste dans l'armoire.",
        regarde: "Le câblage, ma photo, l'ohmmètre sur la bobine.",
        fais: "Je compare le câblage à ma photo et au schéma. Je mesure la bobine à l'ohmmètre, entre A1 et A2. Aucun outil ni brin libre dans l'armoire.",
        voir: "Une valeur à l'ohmmètre (ni 0, ni infini) ; la notice donne celle de la bobine.",
        controle: { titre: "Ce que dit l'ohmmètre sur la bobine", type: "choix",
          options: ["Une valeur (ni 0, ni OL)", "0 ou presque 0 : court-circuit", "OL : bobine coupée ou fil mal branché"],
          juger(v) {
            if (v[0] === 0) return ["vert", "Une valeur : la bobine est continue et non en court-circuit. Je peux refermer."];
            if (v[0] === 1) return ["rouge", "STOP : une bobine à 0 est en court-circuit. Je ne remets pas sous tension : je cherche le défaut avec le professeur."];
            return ["rouge", "STOP : OL, la bobine ne conduit pas. Fil mal branché sur A1 ou A2 ? Je revérifie mon câblage, sinon j'appelle le professeur."];
          } } },

      { id: "deconsigner", verbe: "Je déconsigne", cadre: ["equipment-consigner-1"], cible: "equipment-consigner-1",
        narration: "On rend l'armoire. On compte les outils, on referme les capots et la porte. On prévient les personnes autour, la zone est dégagée. Puis vous retirez votre cadenas et votre pancarte, et le professeur retire les siens : chacun retire ce qu'il a posé. La déconsignation se fait généralement dans l'ordre inverse de la consignation, sans que ce soit systématique. C'est le professeur qui ferme le sectionneur : la mise sous tension et le démarrage sont à lui. Il vient vérifier avant la remise sous tension : une erreur de recâblage se paie à ce moment-là.",
        regarde: "Les capots, mon cadenas, la pancarte, le sectionneur.",
        fais: "Je compte mes outils. Je referme capots et porte. Je préviens autour de moi. Je retire mon cadenas et ma pancarte. Le professeur ferme le sectionneur et remet sous tension.",
        voir: "Armoire fermée, zone dégagée : le professeur remet sous tension.",
        danger: "Une fois sous tension, personne ne touche aux bornes : l'armoire redevient dangereuse.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["outils comptés et rangés, rien laissé dans l'armoire", "capots et porte refermés", "personnes prévenues, zone dégagée", "mon cadenas et ma pancarte retirés par moi ; le professeur retire les siens"],
          ok: "Déconsigné : le professeur peut remettre sous tension.", manque: "Il manque une coche : on ne remet pas sous tension avant." },
        arret: "Le professeur a vérifié : câblage, armoire refermée, zone dégagée, avant la remise sous tension." },

      { id: "tension", verbe: "Je note la tension à la bobine", cadre: ["equipment-contacteur"], cible: "equipment-contacteur",
        narration: "L'armoire est sous tension, et la mesure de tension se fait aux pointes de l'appareil de mesure, sur les bornes A1 et A2. C'est une mesure sous tension : elle est faite par le professeur, ou par une personne qui a le titre qu'il faut, pas par un exécutant B1V. Son appareil est adapté à la tension, ses pointes sont isolées, il porte ses protections. Vous regardez l'afficheur, vous lisez la valeur et vous la notez, sans toucher ni aux pointes ni aux bornes. On la compare à la tension écrite sur la bobine. Le professeur vient vérifier son appareil et ses protections avant la mesure.",
        regarde: "L'afficheur du multimètre du professeur, la bobine A1 et A2.",
        fais: "Mesure sous tension : le professeur la fait, appareil adapté, pointes isolées sur A1 et A2, EPI. Je lis la valeur sur l'afficheur et je la note.",
        voir: "Une tension proche de celle écrite sur la bobine.",
        danger: "Sous tension, je ne touche ni pointe ni borne : je regarde l'afficheur, c'est tout.",
        controle: { titre: "La tension lue à la bobine", champs: [{ label: "Tension à la bobine", unite: "V" }],
          juger(v, c) {
            const u = c.nb(v[0]), un = c.nb(c.m.tension);
            if (isNaN(u)) return ["ambre", "J'écris la tension lue, en volts."];
            if (isNaN(un)) return ["ambre", "J'écris d'abord la tension de la bobine dans « Ma machine »."];
            if (u <= 0) return ["rouge", "STOP : 0 V à la bobine : elle n'est pas alimentée. Fil mal remis, commande ouverte ? J'arrête et j'appelle le professeur."];
            if (!c.proche(u, un, 0.1, 2)) return ["rouge", "STOP : " + c.fr(u, 0) + " V à la bobine pour " + c.fr(un, 0) + " V écrits dessus. Mauvaise tension, mauvais fil : j'arrête et j'appelle le professeur."];
            return ["vert", "Bobine à " + c.fr(u, 0) + " V pour " + c.fr(un, 0) + " V écrits : cohérent."];
          } },
        arret: "Le professeur a vérifié : appareil adapté, pointes isolées, EPI, avant la mesure sous tension." },

      { id: "intensite", verbe: "Je mesure l'intensité à la pince", cadre: ["equipment-contacteur"], cible: "equipment-contacteur",
        narration: "Dernier relevé de l'essai : l'intensité du moteur, à la pince ampèremétrique. Ce n'est pas la même mesure que la tension : la pince entoure un seul conducteur, à l'extérieur du bornier, et ne touche aucune borne. Le professeur commande la machine, le contacteur colle et décolle sans bruit anormal. Vous lisez l'intensité et vous la comparez à l'intensité nominale écrite sur la plaque du moteur : elle ne doit pas la dépasser. Si elle la dépasse, ou si le moteur ne consomme rien, on arrête et on appelle le professeur. Si le conducteur n'est accessible qu'armoire ouverte sous tension, c'est le professeur qui mesure.",
        regarde: "La pince, la plaque du moteur. Pressostat : <a href='../../simulateur/pressostat.html'>jeu de réglage</a>.",
        fais: "Le professeur commande la machine : il colle et décolle. La pince entoure UN seul conducteur du moteur, hors bornier ; je ne touche à aucune borne. Je lis l'intensité.",
        voir: "Il colle et décolle sans bruit anormal ; intensité sous celle de la plaque.",
        danger: "Pince autour d'un seul conducteur, jamais sur une borne. Armoire à ouvrir sous tension : le professeur mesure.",
        controle: { titre: "L'intensité du moteur", champs: [{ label: "Intensité du moteur", unite: "A" }],
          juger(v, c) {
            const i = c.nb(v[0]), inom = c.nb(c.m.intensite);
            if (isNaN(i)) return ["ambre", "J'écris l'intensité lue, en ampères."];
            if (isNaN(inom)) return ["ambre", "J'écris d'abord l'intensité de la plaque moteur dans « Ma machine »."];
            if (i <= 0) return ["rouge", "STOP : le moteur ne consomme rien. Le contacteur ne colle pas, ou un contact reste ouvert : j'arrête et j'appelle le professeur."];
            if (i > inom * (1 + c.tol.mesure) + 0.3) return ["ambre", "L'intensité (" + c.fr(i, 1) + " A) dépasse celle de la plaque (" + c.fr(inom, 1) + " A) : j'arrête et j'en parle au professeur."];
            return ["vert", "Moteur à " + c.fr(i, 1) + " A pour " + c.fr(inom, 1) + " A de plaque : cohérent."];
          } } },

      { id: "trace", verbe: "Je trace et je range", cadre: ["equipment-contacteur"], cible: "equipment-contacteur",
        narration: "Une intervention qui n'est pas tracée n'existe pas. Vous notez la date, le composant déposé et le composant posé avec leurs références, l'essai et ses mesures, l'état dans lequel vous laissez l'armoire et ce que la prochaine équipe doit savoir. Vous indiquez sur le schéma ou sur l'étiquette de l'armoire ce qui a été changé. L'ancien composant est étiqueté et gardé, pour comprendre pourquoi il est tombé en panne. L'outillage est rangé, le poste propre. Ainsi se termine la gare.",
        regarde: "La fiche d'intervention, le schéma, l'ancien composant.",
        fais: "Je note : date, composants déposé et posé (références), essai, état laissé. Je marque le changement sur le schéma. J'étiquette l'ancien composant. Je range.",
        voir: "Fiche remplie, schéma à jour, ancien composant étiqueté, poste rangé.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["fiche d'intervention : date, composants déposé et posé avec références", "essai noté : tension à la bobine, intensité du moteur", "changement marqué sur le schéma ou l'étiquette de l'armoire", "ancien composant étiqueté et gardé", "outillage rangé, poste propre"],
          ok: "Intervention tracée : un geste non consigné n'existe pas.", manque: "Il manque une coche : l'intervention n'est pas tracée, je ne range pas." } }
    ],

    /* valeurs du contrôle automatique (_moule/qa.mjs) : toutes doivent donner un verdict vert */
    test: {
      machine: { composant: "contacteur KM1", tension: "230", intensite: "6,5" },
      charge: { choisir: ["LC1D09P7", "230"], reperer: ["8", "8"], cabler: ["8"], verifier: ["0"], tension: ["229"], intensite: ["5,8"] }
    }
  };
})();
