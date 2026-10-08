/* =====================================================================
   Gare 1 — MANŒUVRER UNE VANNE DE SERVICE (ligne « Les interventions de base »).
   Restructure, sans réinventer :
   · packs/fluides/res/vanne-service-interactive (trois positions, prises P et P1, presse-étoupe) et sa coupe (valve-diagram.js) ;
   · packs/fluides/res/pose-manifold-2-voies-interactive (capuchon, presse-étoupe, siège arrière, bouchon de P, resserrage, fuite) ;
   · le TP 1 « Récupérer le fluide » de 1re MFER, partie B : capuchons ôtés, presse-étoupes desserrés, vannes de service
     en haut (siège arrière), bouchons ôtés, un quart de tour, je lis, je remets tout ;
   · la planche ordre-vannes.svg et HabFluide ch. 15 (ordre des vannes) ; le cours Éduscol 17441-10 (presse-étoupe à contrôler).
   Un seul parcours, écrit pour du vrai fluide (Franck, 08/10 : « la manipulation est strictement la même », azote ou fluide) ;
   seules les phrases « Sous azote : » disent ce que l'azote empêche physiquement. Le flexible est mis hors air par le vide
   (déjà fait à la gare 2) et son contenu ne part jamais à l'air.
   Aucune valeur universelle : le quart de tour vient du TP 1 de Franck, la pression de référence vient du manomètre de la machine.
   Le siège avant n'est pas manœuvré : il est montré au dessin (Franck, 08/10).
   ===================================================================== */
window.GARE = {
  id: "vannes-service",
  parcours: ["charge"],
  parcoursNoms: { charge: { nom: "Au poste", aide: "sous azote (conseillé au lycée) ou sous fluide : même geste" } },
  titre: "Manœuvrer une vanne de service",
  sousTitre: "Les interventions de base · gare 1 · siège arrière et quart de tour",
  machine: [
    { id: "vanne", label: "Vanne manœuvrée (aspiration, refoulement ou départ liquide)", court: "Vanne", exemple: "ex. aspiration", texte: true },
    { id: "pression", label: "Pression de référence : manomètre de la machine, lue au départ (sous azote : celui du support)", court: "Pression de référence", unite: "bar", nombre: true }
  ],
  /* Deux niveaux (Franck, 08/10) : mêmes étapes, mêmes attendus (l'attestation fluides) ; codes et exigence propres. */
  codes: {
    cap: "CAP IFCA — tâches T8, T13 · compétences C4.3, C4.7 · savoirs S5.1, S6.2",
    mfer: "1re Bac Pro MFER — tâches A1T3, A2T3 · compétences C4, C6 · savoirs S5, S7",
    commun: "niveau de l'attestation d'aptitude fluides (règlement (UE) 2024/2215, annexe I) — 4.01, 4.05, 5.01"
  },
  grille: [
    ["Je me protège, je fais l'état des lieux et je repère la bonne vanne et la bonne prise (P, pas P1)", { cap: "T8", mfer: "A1T3 · C4" }],
    ["Je mets la vanne dans la bonne position, dans l'ordre : siège arrière, quart de tour", { cap: "C4.7", mfer: "A2T3 · C6" }],
    ["Je branche un flexible hors air, je lis et je compare avec l'autre manomètre", { cap: "T13 · C4.7", mfer: "A2T3 · C6" }],
    ["Je remets tout comme je l'ai trouvé, sans rien rejeter à l'air, et je contrôle le presse-étoupe", { cap: "C4.3", mfer: "A2T3 · C6" }]
  ],
  exigence: {
    cap: "chaque geste juste et dans l'ordre, comme sur du vrai fluide : jamais de force, P1 jamais ouverte, aucun rejet à l'air ; le professeur peut guider aux points d'arrêt.",
    mfer: "les mêmes gestes, comme sur du vrai fluide, sans aide entre les points d'arrêt ; je justifie chaque contrôle et je repère seul une lecture incohérente."
  },
  savoirEtre: "je travaille comme sur du vrai fluide : je ne force jamais, je ne touche jamais à P1, rien ne part à l'air",
  tolerances: { pesee: 0.05, mesure: 0.05 },

  bilan(c) {
    const f = (id, u) => { const x = c.nb(c.releve(id)); return isNaN(x) ? "…" : c.fr(x, 2).replace(/,?0+$/, "") + " " + u; };
    const ref = c.nb(c.m.pression);
    return `Vanne : <b>${c.m.vanne || "…"}</b> · aiguille au siège arrière <b>${f("lire-zero", "bar")}</b> · ` +
      `après un quart de tour <b>${f("lire", "bar")}</b> (manomètre de la machine : <b>${isNaN(ref) ? "…" : c.fr(ref, 1) + " bar"}</b>)`;
  },

  dessin: {
    fichier: "dessin.svg",
    vue: "0 0 2400 710",
    noms: {
      "equipment-installation": "le groupe et ses vannes de service A, B, C",
      "exterieur": "la vanne vue de l'extérieur (capuchon, bouchon)",
      "carre": "le carré de manœuvre, là où va la clé",
      "presse-etoupe": "le presse-étoupe, autour de la tige",
      "prise-p": "la prise de service P",
      "prise-p1": "la prise P1 du pressostat",
      "manometre": "le manomètre"
    },
    /* l'état du dessin suit l'étape : position de la tige, flexible posé, aiguille */
    appliquer(svg, e, c) {
      const pos = e.position || "back";
      svg.setAttribute("data-position", pos);
      /* au poste, on ne montre que les cartes utiles à l'étape ; à l'entraînement, tout le dessin reste touchable */
      if (!svg.closest(".entr")) ["equipment-installation", "exterieur", "manometre", "legende-positions"].forEach(id => {
        const g = svg.querySelector("#" + id); if (g) g.style.display = e.cadre.includes(id) ? "" : "none";
      });
      svg.querySelector("#flexible-p").classList.toggle("connected", !!e.flexible);
      svg.querySelectorAll(".leg").forEach(t => t.classList.toggle("on", t.dataset.pos === pos));
      const lu = c.nb(c.releve("lire")), ref = c.nb(c.m.pression);
      const p = e.aiguille === "ligne" ? (!isNaN(lu) ? lu : (!isNaN(ref) ? ref : 4)) : 0;
      svg.querySelector("#aiguille").setAttribute("transform", "rotate(" + Math.max(-127, Math.min(127, -110 + 18 * p)) + ")");
    }
  },

  etapes: [
    { id: "reperer", verbe: "Je repère la vanne de service", cadre: ["equipment-installation"], cible: "equipment-installation",
      regarde: "Le groupe : trois vannes de service, A, B et C.",
      fais: "Je trouve la vanne à manœuvrer. A : refoulement. B : départ liquide. C : aspiration. Je l'écris dans « Ma machine ».",
      voir: "Une vanne avec un capuchon sur la tige et une prise de service.",
      controle: { titre: "Je coche ce que j'ai trouvé", type: "coches",
        items: ["la vanne à manœuvrer et son repère (A, B ou C)", "son carré de manœuvre, sous le capuchon", "sa prise de service P et la prise P1 du pressostat"],
        ok: "Vanne repérée.", manque: "Il manque une coche : je ne touche à rien avant." } },

    { id: "securiser", verbe: "Je me protège et je sécurise", cadre: ["equipment-installation"], cible: "equipment-installation",
      regarde: "La machine, son interrupteur, sa plaque.",
      fais: "Lunettes et gants. J'arrête la machine et je la consigne : cadenas et étiquette.",
      voir: "Machine arrêtée, cadenas posé, EPI sur moi.",
      danger: "Le fluide liquide brûle par le froid : lunettes et gants avant de toucher un flexible.",
      arret: "Le professeur a vérifié : EPI portés, machine consignée." },

    /* Franck, 08/10 : avant toute intervention, état des lieux — rien de perdu, rien d'abîmé, vannes en service au siège arrière. */
    { id: "etat-des-lieux", verbe: "Je fais l'état des lieux", cadre: ["equipment-installation"], cible: "equipment-installation",
      regarde: "Les vannes de service, leurs capuchons et leurs bouchons.",
      fais: "Je vérifie chaque vanne de service : capuchon de tige et bouchon de prise présents, serrés, en bon état.",
      voir: "Tout est là et serré ; les vannes sont au siège arrière, comme en service.",
      controle: { titre: "Je coche ce que j'ai vu", type: "coches",
        items: ["vannes de service au siège arrière", "capuchons de tige présents et serrés", "bouchons des prises présents et serrés", "rien d'abîmé, rien qui manque"],
        ok: "État des lieux fait : je saurai tout remettre comme je l'ai trouvé.",
        manque: "Il manque quelque chose : je le signale au professeur avant de commencer." } },

    { id: "capuchon", verbe: "J'ôte le capuchon de la tige", cadre: ["exterieur"], cible: "exterieur",
      regarde: "Le capuchon sur la tige, côté carré.",
      fais: "Je dévisse le capuchon à la main et je le pose propre sur le poste. Je ne touche pas encore au carré.",
      voir: "Le carré de la tige est à nu." },

    { id: "presse-etoupe", verbe: "Je desserre le presse-étoupe", cadre: ["presse-etoupe", "carre"], cible: "presse-etoupe",
      regarde: "L'écrou autour de la tige, sous le carré.",
      fais: "Avec la clé plate, je desserre un peu : un quart de tour au plus, ou la valeur du professeur.",
      voir: "La tige tourne sans forcer. Rien ne fuit.",
      danger: "Je desserre juste assez : trop desserré, le presse-étoupe laisse fuir.",
      controle: { titre: "La tige est libre et rien ne fuit ?", type: "ouinon",
        oui: "Tige libre, presse-étoupe encore étanche : je continue.",
        non: "STOP : je ne force pas sur le carré. J'appelle le professeur." } },

    { id: "siege-arriere", verbe: "Je mets la vanne au siège arrière", cadre: ["zone-positions", "manometre", "legende-positions"], cible: "carre", position: "back",
      regarde: "Le carré, avec la clé à cliquet dessus.",
      fais: "Je tourne dans le sens inverse des aiguilles d'une montre, jusqu'à la butée. Je ne force pas.",
      voir: "La tige ne tourne plus. La prise P est fermée ; la ligne, elle, reste ouverte.",
      danger: "En service, la vanne est au siège arrière ; le siège avant ferme la ligne : on ne le manœuvre pas en TP.",
      controle: { titre: "Je coche ce que je constate", type: "coches",
        items: ["la tige est en butée, elle ne tourne plus", "je n'ai pas forcé", "le bouchon de P1 est en place"],
        ok: "Siège arrière : la prise P est isolée.", manque: "Il manque une coche : je n'ouvre pas la prise avant." },
      arret: "Le professeur a vérifié : vanne au siège arrière, prise P isolée, bouchon de P1 en place." },

    { id: "bouchon", verbe: "J'ôte le bouchon de la prise P", cadre: ["prise-p", "prise-p1"], cible: "exterieur", position: "back",
      regarde: "La prise P, près du carré. P1 est à l'opposé.",
      fais: "Je dévisse le bouchon de P, je le pose avec le capuchon, joint propre. Au fond de la prise : l'obus Schrader.",
      voir: "La prise P est libre. P1 garde son bouchon.",
      danger: "Je ne touche jamais au bouchon de P1 : cette prise reste sous pression, vanne fermée ou non.",
      controle: { titre: "Le bouchon de P1 est toujours en place ?", type: "ouinon",
        oui: "P1 intacte : je continue.",
        non: "STOP : P1 reste sous pression. Je ne bouge plus et j'appelle le professeur." } },

    { id: "flexible", verbe: "Je branche le flexible sur la prise P", cadre: ["prise-p", "manometre"], cible: "prise-p", position: "back", flexible: true,
      regarde: "L'écrou du flexible et la prise P.",
      fais: "Mon flexible est déjà hors air : tiré au vide à la gare 2, vanne du manifold fermée. Je visse l'écrou à la main sur P, joint propre dedans. Le poussoir enfonce l'obus Schrader.",
      voir: "Flexible vissé droit, sans pincer le joint. L'aiguille ne bouge pas.",
      danger: "Un flexible plein d'air ne se branche pas : l'air irait dans le circuit. Je le tire d'abord au vide.",
      controle: { titre: "Je coche avant d'appeler", type: "coches",
        items: ["flexible hors air : tiré au vide, vanne du manifold fermée", "écrou serré à la main, joint propre", "flexible bleu sur l'aspiration, rouge sur le refoulement"],
        ok: "Branchement prêt à être vérifié.", manque: "Il manque une coche : je ne continue pas avant. Flexible plein d'air : je le tire au vide d'abord, comme à la gare 2." },
      arret: "Le professeur a vérifié mon branchement, avant d'ouvrir la vanne." },

    { id: "lire-zero", verbe: "Je lis l'aiguille, prise fermée", cadre: ["manometre", "legende-positions"], cible: "manometre", position: "back", flexible: true,
      regarde: "L'aiguille du manomètre. La vanne n'a pas bougé.",
      fais: "Je lis l'aiguille et je l'écris. La prise P est fermée : le manomètre ne voit pas encore la ligne.",
      voir: "L'aiguille reste à 0.",
      controle: { titre: "Aiguille, vanne au siège arrière", champs: [{ unite: "bar" }],
        juger(v, c) {
          const x = c.nb(v[0]); if (isNaN(x)) return ["ambre", "J'écris un nombre, en bar (0 si l'aiguille ne bouge pas)."];
          if (c.proche(x, 0, c.tol.mesure, 0.3)) return ["vert", "À 0 : la prise est bien fermée, le manomètre ne voit pas la ligne. Normal."];
          if (x < 0) return ["ambre", "Sous 0 : le flexible est tiré au vide ? Je vérifie que le zéro du manomètre est juste."];
          return ["rouge", "STOP : " + c.fr(x, 1) + " bar alors que la prise doit être fermée. La vanne n'est pas au siège arrière, ou l'obus fuit. Je ne continue pas, j'appelle le professeur."];
        } } },

    { id: "quart", verbe: "Je décolle la vanne d'un quart de tour", cadre: ["zone-positions", "manometre", "legende-positions"], cible: "carre", position: "mid", flexible: true, aiguille: "ligne",
      regarde: "Le carré, la clé, et l'aiguille du manomètre.",
      fais: "Un quart de tour dans le sens des aiguilles d'une montre, pas plus. Le flexible est hors air : seul le fluide de la machine y entre.",
      voir: "La vanne est entre ses deux sièges. L'aiguille se met à monter.",
      danger: "Une fuite à la prise ou au raccord : je ramène aussitôt la vanne au siège arrière et j'appelle le professeur.",
      controle: { titre: "Tours depuis la butée arrière (un quart = 0,25)", champs: [{ unite: "tour" }],
        juger(v, c) {
          const x = c.nb(v[0]);
          if (isNaN(x)) return ["ambre", "J'écris un nombre : un quart de tour s'écrit 0,25."];
          if (x <= 0) return ["ambre", "La vanne n'a pas bougé : l'aiguille ne verra pas la ligne."];
          if (x > 0.5) return ["ambre", "Plus d'un demi-tour : la prise est très ouverte. Le TP demande un quart de tour : je reviens vers le siège arrière."];
          return ["vert", "Un quart de tour environ : la vanne est entre ses deux sièges, la prise voit la ligne."];
        } } },

    { id: "lire", verbe: "Je lis la pression de la ligne", cadre: ["manometre", "legende-positions"], cible: "manometre", position: "mid", flexible: true, aiguille: "ligne",
      regarde: "Mon manomètre, puis celui de la machine.",
      fais: "J'attends que l'aiguille se stabilise. Je lis, j'écris. Je compare avec le manomètre de la machine.",
      voir: "L'aiguille s'arrête sur la pression de la machine, la même que sur l'autre manomètre.",
      controle: { titre: "Mon manomètre, sur la prise P", champs: [{ unite: "bar" }],
        juger(v, c) {
          const x = c.nb(v[0]), ref = c.nb(c.m.pression), z = c.nb(c.releve("lire-zero"));
          if (isNaN(x)) return ["ambre", "J'écris un nombre, en bar."];
          if (isNaN(ref)) return ["ambre", "J'écris d'abord la pression lue sur le manomètre de la machine dans « Ma machine »."];
          if (c.proche(x, ref, c.tol.mesure, 0.3)) return ["vert", "Mon manomètre : " + c.fr(x, 1) + " bar, la machine : " + c.fr(ref, 1) + " bar. Cohérent : la prise voit bien la ligne."];
          if (c.proche(x, isNaN(z) ? 0 : z, c.tol.mesure, 0.3) && ref > 0.5)
            return ["ambre", "L'aiguille n'a pas quitté " + c.fr(z, 1) + " bar : la vanne est-elle décollée ? l'obus est-il enfoncé ? le flexible bien vissé ?"];
          if (c.proche(x, ref, 0.2, 0.5)) return ["ambre", "Écart de " + c.fr(Math.abs(x - ref), 1) + " bar avec la machine : j'attends que l'aiguille se stabilise, je revérifie le zéro."];
          return ["rouge", "STOP : " + c.fr(x, 1) + " bar chez moi, " + c.fr(ref, 1) + " bar sur la machine. Un manomètre est faux, ou la vanne n'est pas où je crois. J'appelle le professeur."];
        } },
      arret: "Le professeur a vérifié ma lecture, avant que je referme la vanne." },

    { id: "retour", verbe: "Je ferme la prise et je vide le flexible", cadre: ["zone-positions", "manometre", "legende-positions"], cible: "carre", position: "back", flexible: true,
      regarde: "Le carré et l'aiguille du manomètre.",
      fais: "Sens inverse des aiguilles, jusqu'à la butée arrière. Je vide le flexible vers la machine ou à la station : jamais à l'air. Sous azote : pas de station, je desserre lentement, raccord tenu, comme du fluide.",
      voir: "La prise P est fermée. L'aiguille retombe à 0 sans que rien ne soit rejeté à l'air.",
      danger: "Le flexible garde la pression de la ligne : je ne le débranche jamais avant d'avoir vidé son contenu.",
      controle: { titre: "L'aiguille est revenue à 0, rien rejeté à l'air ?", type: "ouinon",
        oui: "Flexible sans pression : je peux le débrancher.",
        non: "STOP : je ne débranche jamais un flexible sous pression. J'appelle le professeur." } },

    { id: "debrancher", verbe: "Je débranche et je rebouche P", cadre: ["prise-p", "prise-p1"], cible: "prise-p", position: "back",
      regarde: "L'écrou du flexible et la prise P.",
      fais: "Je dévisse le flexible lentement, raccord tenu. Je remets le bouchon sur P, joint propre, serré selon la notice.",
      voir: "Flexible ôté. P et P1 ont chacune leur bouchon.",
      controle: { titre: "Je coche ce que j'ai fait", type: "coches",
        items: ["flexible ôté, aiguille à 0", "bouchon de P remis, joint propre", "bouchon de P1 jamais touché"],
        ok: "Prises rebouchées.", manque: "Il manque une coche : je ne range pas avant." } },

    { id: "fin", verbe: "Je remets tout comme je l'ai trouvé", cadre: ["presse-etoupe", "carre"], cible: "presse-etoupe", position: "back",
      regarde: "L'écrou autour de la tige, puis les capuchons et les bouchons.",
      fais: "Avec la clé plate, je resserre le presse-étoupe. Je contrôle au détecteur ou à la solution moussante. Sous azote : solution moussante, le détecteur ne sent pas l'azote. Je remets le capuchon, puis je compare avec l'état des lieux.",
      voir: "Aucune fuite autour de la tige. Capuchon remis, vanne au siège arrière, comme au départ.",
      controle: { titre: "Je coche ce que j'ai remis comme au départ", type: "coches",
        items: ["presse-étoupe resserré, aucun signal au détecteur ni bulle à la solution moussante", "capuchon de tige remis et serré", "bouchons de P et de P1 en place", "vanne au siège arrière", "rien d'abîmé, rien qui manque"],
        ok: "Tout est comme je l'ai trouvé : le poste est rangé.",
        manque: "Il manque une coche. Un signal, une bulle ? Je resserre un peu et je recontrôle ; si ça continue, j'appelle le professeur." } }
  ],

  /* valeurs du contrôle automatique (_moule/qa.mjs) : toutes doivent donner un verdict vert */
  test: {
    machine: { vanne: "aspiration", pression: "6,2" },
    charge: { "lire-zero": ["0"], quart: ["0,25"], lire: ["6,1"] }
  }
};
