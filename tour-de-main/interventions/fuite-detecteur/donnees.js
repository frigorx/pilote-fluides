/* =====================================================================
   Gare « CHERCHER UNE FUITE AU DÉTECTEUR ÉLECTRONIQUE » (ligne « Les interventions de base », au poste).
   Circuit CHARGÉ en fluide, machine arrêtée. Restructure, sans réinventer (voir SOURCES.md) :
   · le cours HabFluide ch. 14 et CONTENU-04-G4-étanchéité (méthode directe, 4.07 / 4.08 / 4.09) ;
   · les planches validées balayage-detecteur.svg et recherche-fuite-geste.svg (contrôler, balayer, confirmer) ;
   · la station « Détective » (x4) : une alerte se confirme, elle ne se conclut pas sur un seul passage ;
   · la fiche de Franck « détection de fuite » (contrôle de seuil annuel) ;
   · l'arrêté du 29 février 2016, art. 2 I : détecteur adapté au fluide, seuil de détection ≤ 5 g par an,
     vérifié au moins une fois tous les douze mois (texte relevé sur AIDA-INERIS : à recouper sur Légifrance).
   Aucune valeur inventée : la vitesse de balayage, la sensibilité et la mise en route viennent de la notice du détecteur.
   ===================================================================== */
(function () {
  /* le fluide est-il inflammable ? classes A2L, A2, A3, B2L, B2, B3 (étiquette de la bouteille ou plaque) */
  const inflammable = c => /^(A2|A3|B2|B3)/i.test(String(c.m.classe || "").replace(/\s/g, ""));
  /* « jj/mm/aaaa » → Date, ou null */
  function dateDe(s) {
    const m = String(s || "").trim().match(/^(\d{1,2})[\/.\- ](\d{1,2})[\/.\- ](\d{4})$/); if (!m) return null;
    const d = new Date(+m[3], +m[2] - 1, +m[1]);
    return d.getFullYear() === +m[3] && d.getMonth() === +m[2] - 1 && d.getDate() === +m[1] ? d : null;
  }
  /* la date du jour moins n mois, pour le contrôle automatique (test) */
  const ilYa = n => { const d = new Date(); d.setMonth(d.getMonth() - n); return String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0") + "/" + d.getFullYear(); };

  /* petit écran ou tactile : le bouton « Agrandir » du site se pose sur le coin haut droit du dessin ; on lui laisse une bande vide
     au-dessus du dessin, pour qu'il ne recouvre jamais un appareil à toucher (audit de trouvabilité, 19/10/2026) */
  const PETIT = !!(window.matchMedia && window.matchMedia("(max-width: 900px), (pointer: coarse)").matches);

  window.GARE = {
    id: "fuite-detecteur",
    titre: "Chercher une fuite au détecteur électronique",
    sousTitre: "Les interventions de base · gare 9 · circuit chargé, détecteur, étalon · en cours de relecture",
    parcours: ["charge"],
    parcoursNoms: { charge: { nom: "Circuit chargé en fluide", aide: "machine arrêtée, avec son fluide" } },
    machine: [
      { id: "fluide", label: "Fluide (plaque de la machine)", court: "Fluide", exemple: "ex. R-407C", texte: true },
      { id: "classe", label: "Classe de sécurité du fluide (étiquette de la bouteille)", court: "Classe", exemple: "ex. A1, A2L, A3", texte: true },
      { id: "detecteur", label: "Détecteur utilisé (marque, modèle)", court: "Détecteur", exemple: "écrit sur l'appareil", texte: true }
    ],
    /* Deux niveaux (Franck, 08/10) : mêmes étapes, mêmes attendus (l'attestation fluides) ; codes et exigence propres. */
    codes: {
      cap: "CAP IFCA — tâches T16, T6, T8, T2 · compétences C4.3, C2.2, C2.4, C1.1 · savoirs S5.2, S0.1, S6.2",
      mfer: "1re Bac Pro MFER — tâches A1T3, A1T4, A4T1, A5T2 · compétences C4, C9, C11 · savoirs S5, S2, S7",
      commun: "niveau de l'attestation d'aptitude fluides (règlement (UE) 2024/2215, annexe I) — 4.02 (registre avant le contrôle), 4.03, 4.07 (méthode directe sans intervenir dans le circuit), 4.08 (dispositif électronique de détection des fuites), 4.09 (consigner), 12.02 (sécurité des outils de détection)"
    },
    grille: [
      ["Je me protège, je lis le registre, je fais l'état des lieux", { cap: "T8 · C2.4", mfer: "A1T3 · C4" }],
      ["Je choisis un détecteur adapté et à jour, et je le teste sur la fuite étalon AVANT de chercher", { cap: "T6 · C2.2", mfer: "A1T4 · C4" }],
      ["Je balaie lentement, au plus près, et je confirme l'alerte (second passage, produit moussant)", { cap: "C4.3 · T16", mfer: "A4T1 · C9" }],
      ["Je repère le point, j'étiquette, je trace (fiche, registre)", { cap: "T2 · C1.1", mfer: "A5T2 · C11" }]
    ],
    exigence: {
      cap: "chaque geste juste et dans l'ordre : détecteur testé sur l'étalon AVANT de chercher, balayage lent, alerte confirmée, point repéré, fiche remplie ; le professeur peut guider aux points d'arrêt.",
      mfer: "les mêmes gestes, sans aide entre les points d'arrêt ; je justifie chaque contrôle (pourquoi l'étalon et jamais la bouteille, pourquoi un second passage) et je repère seul un relevé incohérent."
    },
    savoirEtre: "aucun fluide rejeté pour « essayer » l'appareil, et je dis ce que dit le détecteur",
    tolerances: { pesee: 0.05, mesure: 0.05 },

    bilan(c) {
      const p = c.releve("balayage", 0), s = c.releve("balayage", 1), d = c.releve("verif", 0), k = c.releve("confirmer", 0);
      const concl = k === undefined ? "…" : ["<b>fuite confirmée</b> (détecteur, second passage, bulles)", "<b>alerte confirmée au détecteur</b>, bulles non vues", "<b>alerte non confirmée</b> : je repasse", "<b>aucune fuite décelée</b> par cette méthode"][k];
      const pl = (x, mot) => x === undefined || x === "" ? "…" : x + " " + mot + (c.nb(x) > 1 ? "s" : "");
      return `Fluide <b>${c.m.fluide || "…"}</b> (classe ${c.m.classe || "…"}) · détecteur <b>${c.m.detecteur || "…"}</b>, dernière vérification <b>${d || "…"}</b> · ` +
        `<b>${pl(p, "point")}</b> contrôlé${c.nb(p) > 1 ? "s" : ""}, <b>${pl(s, "alerte")}</b> · ${concl}`;
    },

    dessin: {
      fichier: "dessin.svg",
      vue: PETIT ? "0 -130 820 690" : "0 0 820 560",
      noms: { "equipment-installation": "la machine (le groupe et ses vannes de service)", "equipment-detecteur": "le détecteur électronique",
        "equipment-etalon": "la fuite étalon", "equipment-raccord": "le raccord à contrôler" },
      /* l'état du dessin suit l'étape : la sonde et le nuage n'apparaissent qu'au raccord (balayage, confirmation) */
      appliquer(svg, e) {
        const au = !!e.sonde;
        const sonde = svg.querySelector("#svg-sonde"), nuage = svg.querySelector("#svg-nuage");
        if (sonde) sonde.style.display = au ? "" : "none";
        if (nuage) nuage.style.display = e.nuage ? "" : "none";
        svg.classList.toggle("balaye", e.sonde === "balaye");
        svg.classList.toggle("fixe", e.sonde === "fixe");
        svg.classList.toggle("alerte", !!e.nuage);
      }
    },

    etapes: [
      { id: "securite", verbe: "Je sécurise le poste", cadre: ["equipment-installation"], cible: "equipment-installation",
        narration: "Cette gare s'appelle « Chercher une fuite au détecteur électronique ». La machine contient son fluide : on cherche où il pourrait s'échapper, sans rien ouvrir. On commence par vous protéger. Les lunettes et les gants passent d'abord, car un fluide liquide qui sort brûle par le froid. La machine est arrêtée, ses ventilateurs aussi : l'air brassé disperse le fluide et trompe le détecteur. Le professeur la consigne, avec un cadenas et une étiquette. Le local est aéré. Le professeur vient vérifier tout cela avant de continuer.",
        regarde: "La machine, son interrupteur, ses ventilateurs.",
        fais: "Lunettes et gants. J'arrête la machine et ses ventilateurs ; le professeur la consigne : cadenas, étiquette (voir la <a href='../remplacer-composant-electrique/index.html'>gare 11</a>). J'aère le local.",
        voir: "Machine et ventilateurs à l'arrêt, cadenas posé par le professeur, EPI sur moi.",
        danger: "Le fluide liquide brûle par le froid. Fluide A2L ou A3 : inflammable, ni flamme ni étincelle.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["lunettes et gants portés", "machine et ventilateurs arrêtés, consignés", "local aéré", "ni flamme ni étincelle près de la machine"],
          ok: "Poste sûr : je peux commencer.", manque: "Il manque une coche : je ne continue pas avant." },
        arret: "Le professeur a vérifié : EPI portés, machine et ventilateurs arrêtés et consignés." },

      /* Franck, 08/10 : avant toute intervention, état des lieux — rien de perdu, rien d'abîmé, vannes en service au siège arrière. */
      { id: "etat-des-lieux", verbe: "Je fais l'état des lieux", cadre: ["equipment-installation"], cible: "equipment-installation",
        narration: "Avant toute intervention, on constate l'état dans lequel on trouve la machine. Sur chaque vanne de service, on regarde la pièce qui coiffe la tige et celle qui ferme la prise : sont-elles présentes, bien serrées, en bon état ? Un bouchon manquant est déjà un point de fuite possible. On relève aussi la position des vannes. Ce constat est votre point de repère : à la fin, tout sera remis comme vous l'avez trouvé. Ensuite, on lit le registre.",
        regarde: "Les vannes de service, leurs capuchons et leurs bouchons.",
        fais: "Je vérifie chaque vanne de service : capuchon de tige et bouchon de prise présents, serrés, en bon état.",
        voir: "Tout est là et serré ; les vannes sont au siège arrière, comme en service.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["vannes de service au siège arrière", "capuchons de tige présents et serrés", "bouchons des prises présents et serrés", "rien d'abîmé, rien qui manque"],
          ok: "État des lieux fait : je saurai tout remettre comme je l'ai trouvé.",
          manque: "Il manque quelque chose : je le signale au professeur avant de commencer." } },

      { id: "registre", verbe: "Je lis le registre et la plaque", cadre: ["equipment-installation"], cible: "equipment-installation",
        narration: "On ne cherche pas une fuite au hasard : on commence par lire. La plaque de la machine donne le fluide et la charge. Le registre raconte l'histoire de la machine : les fuites déjà réparées, les appoints de fluide, les points signalés. Un raccord déjà réparé n'est jamais un point clos : on le contrôle en premier. Vous écrivez le fluide du registre, et on le compare à celui de la plaque. S'ils ne sont pas les mêmes, on s'arrête : le détecteur doit convenir au vrai fluide.",
        regarde: "Le registre de la machine et sa plaque.",
        fais: "Je lis la plaque : fluide et charge. Je lis le registre : fuites déjà réparées, appoints de fluide, points signalés.",
        voir: "Le même fluide sur la plaque et au registre ; les points signalés sont notés.",
        danger: "Un raccord déjà réparé n'est pas un point clos : je le contrôle en premier.",
        controle: { titre: "Fluide écrit au registre", champs: [{ texte: true }],
          juger(v, c) {
            if (!c.m.fluide) return ["ambre", "J'écris d'abord le fluide de la plaque dans « Ma machine »."];
            return c.egal(v[0], c.m.fluide) ? ["vert", "Même fluide que la plaque (" + c.m.fluide + ") : je peux choisir mon détecteur."]
              : ["rouge", "STOP : le registre dit " + v[0] + ", la plaque " + c.m.fluide + ". Je n'allume pas le détecteur : j'appelle le professeur."];
          } } },

      { id: "visuel", verbe: "Je cherche les traces d'huile", cadre: ["equipment-raccord"], cible: "equipment-raccord",
        narration: "Avant tout appareil, on regarde et on touche. Le fluide qui s'échappe entraîne un peu d'huile : une trace d'huile sur un raccord, sur une brasure ou autour d'une vanne peut montrer une fuite. On regarde aussi la corrosion et les joints abîmés. Sur chaque point suspect, vous posez un repère. Vous commencez par les points que le registre a signalés. Vous comptez ensuite vos points suspects : ce nombre sert plus tard, quand on vérifiera que chaque point a bien été contrôlé.",
        regarde: "Raccords, brasures, vannes, presse-étoupes, prises de pression.",
        fais: "Je regarde et je touche : trace d'huile, corrosion, joint abîmé. Je pose un repère sur chaque point suspect, ceux du registre d'abord.",
        voir: "Le fluide entraîne l'huile : une trace d'huile peut montrer une fuite.",
        controle: { titre: "Combien de points suspects ai-je repérés ?", champs: [{ label: "Points suspects", unite: "points" }],
          juger(v, c) {
            const n = c.nb(v[0]); if (isNaN(n) || n < 0 || n !== Math.floor(n)) return ["ambre", "J'écris un nombre entier : 0, 1, 2…"];
            return n === 0 ? ["vert", "Aucun point suspect : je contrôlerai quand même tous les raccords, un par un."]
              : ["vert", n + " point" + (n > 1 ? "s" : "") + " suspect" + (n > 1 ? "s" : "") + " : je les contrôle en premier."];
          } } },

      { id: "adapte", verbe: "Je vérifie que le détecteur convient", cadre: ["equipment-detecteur"], cible: "equipment-detecteur",
        narration: "Un détecteur ne voit que les gaz pour lesquels il est conçu. Avant de l'allumer, vous lisez sa notice : quels fluides l'appareil sait-il trouver ? Vous la comparez à la plaque de la machine. Vous regardez aussi les piles, le filtre et la sonde : un filtre sale ou des piles faibles rendent l'appareil aveugle, et il ne le dit pas toujours. Attention : si le fluide est inflammable, il faut un détecteur prévu pour cela, et c'est le professeur qui décide.",
        regarde: "La notice du détecteur, ses piles, son filtre, sa sonde.",
        fais: "Je lis la notice : quels fluides l'appareil trouve-t-il ? Je compare avec ma plaque. Je regarde les piles, le filtre et la sonde.",
        voir: "La notice cite mon fluide ; piles, filtre et sonde en bon état.",
        danger: "Fluide inflammable (A2L, A2, A3) : il me faut un détecteur prévu pour ça. Le professeur décide.",
        controle: { titre: "Mon détecteur et mon fluide", type: "choix",
          options: ["Fluide non inflammable : la notice cite mon fluide", "Fluide inflammable (A2L, A2, A3) : détecteur prévu pour ça, accord du professeur", "La notice ne cite pas mon fluide, ou je ne sais pas"],
          juger(v, c) {
            const i = v[0], cl = c.m.classe;
            if (!cl) return ["ambre", "J'écris d'abord la classe du fluide dans « Ma machine »."];
            if (i === 2) return ["rouge", "STOP : si je ne sais pas si l'appareil voit ce fluide, un résultat « rien » ne prouve rien. J'appelle le professeur."];
            if (i === 0 && inflammable(c)) return ["rouge", "STOP : mon fluide est de classe " + cl + ", donc inflammable. Il me faut un détecteur prévu pour fluide inflammable : j'appelle le professeur."];
            if (i === 1 && !inflammable(c)) return ["ambre", "Ma classe est " + cl + " : le fluide n'est pas inflammable. Je relis l'étiquette de la bouteille."];
            return ["vert", "Détecteur adapté à " + (c.m.fluide || "mon fluide") + " (classe " + cl + ")."];
          } } },

      { id: "verif", verbe: "Je regarde sa dernière vérification", cadre: ["equipment-detecteur"], cible: "equipment-detecteur",
        narration: "Un détecteur se contrôle, lui aussi. Son seuil de détection doit être vérifié au moins une fois tous les douze mois, et ce seuil ne doit pas dépasser cinq grammes de fluide par an : c'est ce que dit l'arrêté du vingt-neuf février deux mille seize, à l'article deux. Vous cherchez la date de la dernière vérification de votre appareil : le professeur vous la donne. Au-delà de douze mois, on ne s'en sert pas, parce qu'un résultat « rien » ne prouverait plus rien.",
        regarde: "La date de dernière vérification : le professeur la donne.",
        fais: "Je note la date (jj/mm/aaaa) de la dernière vérification du détecteur. Moins de 12 mois : sinon, je ne m'en sers pas.",
        voir: "Une date de moins de 12 mois (arrêté du 29/02/2016, art. 2 : vérification annuelle).",
        danger: "Détecteur non vérifié depuis plus de 12 mois : un résultat « rien » ne prouve plus rien.",
        controle: { titre: "Date de la dernière vérification du détecteur", champs: [{ label: "Date", texte: true }],
          juger(v) {
            const d = dateDe(v[0]), now = new Date();
            if (!d) return ["ambre", "J'écris la date sous la forme jj/mm/aaaa, par exemple 12/03/2026."];
            if (d > now) return ["ambre", "Cette date n'est pas encore passée : je relis."];
            const limite = new Date(d); limite.setMonth(limite.getMonth() + 12);
            if (now > limite) return ["rouge", "STOP : la dernière vérification date de plus de 12 mois. Je n'utilise pas ce détecteur : j'appelle le professeur."];
            const mois = Math.max(0, Math.round((now - d) / (30.44 * 864e5)));
            return ["vert", "Vérifié il y a environ " + mois + " mois : dans les 12 mois, je peux m'en servir."];
          } } },

      { id: "etalon", verbe: "Je teste le détecteur sur la fuite étalon", cadre: ["equipment-etalon", "equipment-detecteur"], cible: "equipment-etalon",
        narration: "Avant de chercher la vraie fuite, on prouve que le détecteur fonctionne. Pour cela, on utilise la fuite étalon : un petit objet qui laisse sortir un peu de fluide, en quantité connue. Vous allumez l'appareil à l'air propre, loin de la machine, et vous suivez la notice pour sa mise en route. Puis vous approchez la sonde de l'étalon : il doit sonner. Vous l'éloignez : il doit se taire. Jamais on n'ouvre la bouteille de fluide pour voir s'il détecte : ce serait rejeter du fluide dans l'air. Le professeur vient vérifier avant que vous ne cherchiez.",
        regarde: "La fuite étalon : un petit objet qui fuit, à débit connu.",
        fais: "À l'air propre, loin de la machine, j'allume le détecteur (mise en route : la notice). J'approche la sonde de l'étalon : il sonne. Je l'éloigne : il se tait.",
        voir: "Il sonne sur l'étalon, il se tait à l'air propre.",
        danger: "Jamais la bouteille de fluide « pour voir » : ce serait rejeter du fluide dans l'air.",
        controle: { titre: "Qu'a fait mon détecteur ?", type: "choix",
          options: ["Il sonne sur l'étalon et se tait à l'air propre", "Il ne sonne pas sur l'étalon", "Il sonne tout le temps, même à l'air propre"],
          juger(v) {
            if (v[0] === 0) return ["vert", "Le détecteur fonctionne : il voit l'étalon et se tait à l'air propre. Je peux chercher."];
            if (v[0] === 1) return ["rouge", "STOP : un détecteur qui ne voit pas l'étalon ne verrait pas non plus la fuite. Piles, filtre, sonde, mise en route : je revois la notice, sinon j'appelle le professeur."];
            return ["rouge", "STOP : un détecteur qui sonne tout le temps est saturé ou pollué. Je l'éloigne à l'air propre, j'attends ; s'il sonne encore, je ne m'en sers pas et j'appelle le professeur."];
          } },
        arret: "Le professeur a vérifié : détecteur adapté, vérifié à jour, testé sur la fuite étalon." },

      { id: "balayage", verbe: "Je balaie lentement, au plus près", cadre: ["equipment-raccord", "equipment-detecteur"], cible: "equipment-detecteur", sonde: "balaye", nuage: true,
        narration: "Voici le geste central. La machine est arrêtée, les ventilateurs aussi. Vous passez la sonde lentement, au plus près de la tuyauterie, la notice donne la vitesse. Vous commencez par vos points suspects, puis vous contrôlez tous les raccords, les brasures, les vannes et les prises, en allant du bas vers le haut, car ces fluides sont plus lourds que l'air. Si l'alarme sonne sans s'arrêter, vous éloignez la sonde à l'air propre quelques secondes. Vous ne la plongez jamais dans une grosse fuite. Vous comptez les points contrôlés et ceux où l'appareil a sonné.",
        regarde: "Le détecteur : sa sonde longe chaque raccord, au contact.",
        fais: "Machine arrêtée. Je passe la sonde lentement, au plus près, mes points suspects d'abord, puis tous les autres, du bas vers le haut (le fluide est plus lourd que l'air).",
        voir: "L'appareil sonne seulement près d'un point : je note lequel.",
        danger: "Alarme continue : j'éloigne la sonde à l'air propre. Je ne la plonge jamais dans une grosse fuite.",
        controle: { titre: "Mon balayage", champs: [{ label: "Points contrôlés", unite: "points" }, { label: "Points où il a sonné", unite: "points" }],
          juger(v, c) {
            const p = c.nb(v[0]), s = c.nb(v[1]), sus = c.nb(c.releve("visuel", 0));
            if (isNaN(p) || isNaN(s) || p < 1 || s < 0 || p !== Math.floor(p) || s !== Math.floor(s)) return ["ambre", "J'écris deux nombres entiers : les points contrôlés (au moins 1), puis ceux où il a sonné."];
            if (s > p) return ["ambre", "Il ne peut pas avoir sonné sur plus de points que j'en ai contrôlés : je recompte."];
            if (!isNaN(sus) && p < sus) return ["ambre", "J'avais repéré " + sus + " points suspects : ils doivent tous faire partie de mes " + p + " points contrôlés. J'en ai oublié ?"];
            if (s === 0 && !isNaN(sus) && sus > 0) return ["ambre", "Aucune alerte alors que j'avais " + sus + " point(s) suspect(s) : je repasse plus lentement, au plus près."];
            return s === 0 ? ["vert", "Aucune alerte sur " + p + " points : pas de fuite décelée. Je ne conclus pas « étanche » pour autant : je note la méthode et le nombre de points."]
              : ["vert", p + " points contrôlés, " + s + " alerte" + (s > 1 ? "s" : "") + " : je confirme chaque alerte."];
          } } },

      { id: "confirmer", verbe: "Je confirme l'alerte", cadre: ["equipment-raccord"], cible: "equipment-raccord", sonde: "fixe", nuage: true,
        narration: "Une alerte n'est pas encore une fuite : l'air, le déplacement de la sonde ou un autre fluide peuvent tromper l'appareil. On confirme donc. Les ventilateurs restent arrêtés : vous repassez la sonde sur le même point, lentement. Puis vous passez le produit moussant : si des bulles grossissent, la fuite est prouvée et localisée. Attention, le moussant est peu précis sur les petites fuites : sans bulle, l'alerte du détecteur reste à noter. Vous ne touchez pas au raccord : on ne met pas une clé sur un raccord sous pression. Le professeur sera appelé.",
        regarde: "Le point où le détecteur a sonné.",
        fais: "Ventilateurs arrêtés, je repasse la sonde sur le même point, lentement. Puis je passe le produit moussant : je regarde si des bulles grossissent.",
        voir: "Le détecteur sonne au même point, et des bulles grossissent.",
        danger: "Je n'y touche pas : pas de clé sur un raccord sous pression. J'appelle le professeur.",
        controle: { titre: "Ce que j'ai observé", type: "choix",
          options: ["Même point au second passage, et des bulles grossissent", "Même point au second passage, mais pas de bulle", "Il n'a sonné qu'une fois, je ne l'ai pas revu", "Aucun point n'a sonné : rien à confirmer"],
          juger(v, c) {
            const i = v[0], s = c.nb(c.releve("balayage", 1));
            if (i === 3) return s > 0 ? ["ambre", "J'ai noté " + s + " alerte(s) au balayage : je ne peux pas dire « aucun point ». Je relis mon relevé."]
              : ["vert", "Aucune alerte : pas de fuite décelée par cette méthode, sur les points contrôlés. Je le note tel quel."];
            if (s === 0) return ["ambre", "Au balayage, j'ai noté 0 alerte : il n'y a rien à confirmer. Je relis mon relevé."];
            if (i === 0) return ["vert", "Fuite confirmée : détecteur au second passage et bulles au même point. Je la repère."];
            if (i === 1) return ["ambre", "Alerte confirmée au détecteur, mais le moussant ne montre rien : la fuite est peut-être trop petite pour lui. J'écris les deux faits et j'appelle le professeur."];
            return ["ambre", "Une seule alerte ne prouve rien : je repasse la sonde, ventilateurs arrêtés, puis le moussant."];
          } } },

      { id: "trace", verbe: "J'étiquette et je trace", cadre: ["equipment-raccord"], cible: "equipment-raccord",
        narration: "Un contrôle qui n'est pas écrit n'existe pas. Si une fuite est confirmée, vous posez une étiquette repère sur le point précis, sans y toucher. Puis vous remplissez la fiche d'intervention et le registre avec les mêmes informations : la date, l'appareil et la date de sa dernière vérification, la méthode, le nombre de points contrôlés, le résultat, le point exact de la fuite, et la suite donnée. Ajouter du fluide sans réparer ne règle rien : la fuite reste, et le fluide part dans l'air. Le professeur vient vérifier votre conclusion et votre fiche.",
        regarde: "Le point de fuite : c'est là que je pose l'étiquette repère.",
        fais: "Je pose une étiquette repère sur le point. Sur la fiche et au registre : date, appareil, points contrôlés, résultat, point précis, suite donnée.",
        voir: "Étiquette, fiche et registre disent la même chose.",
        danger: "Ajouter du fluide sans réparer ne règle rien : la fuite reste, le fluide part dans l'air.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["étiquette repère posée sur le point (ou « aucune fuite décelée » écrit)", "date, appareil et date de sa dernière vérification notés", "méthode, points contrôlés et résultat notés", "point précis de la fuite et suite donnée notés", "fiche d'intervention et registre : la même information"],
          ok: "Contrôle tracé : localisation, étiquette, fiche et registre.", manque: "Il manque une coche : le contrôle n'est pas tracé, je ne range pas." },
        arret: "Le professeur a vérifié ma conclusion et ma fiche, avant que je range." },

      { id: "remise", verbe: "Je range et je remets tout comme trouvé", cadre: ["equipment-installation"], cible: "equipment-installation",
        narration: "Dernière étape : on rend le poste tel qu'on l'a reçu. Le détecteur est éteint, rangé avec sa fuite étalon. Le produit moussant est essuyé. Les vannes de service sont au siège arrière, chaque capuchon et chaque bouchon est remis, bien serré : c'est à cela que servait l'état des lieux du début. La machine ne repart qu'avec l'accord du professeur. Si une fuite est confirmée, elle reste arrêtée et consignée jusqu'à la réparation.",
        regarde: "La machine : ses vannes de service, capuchons et bouchons.",
        fais: "J'éteins le détecteur et je le range avec l'étalon. J'essuie le moussant. Vannes au siège arrière, capuchons et bouchons remis, serrés.",
        voir: "Poste comme au départ : rien d'abîmé, rien qui manque.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["détecteur éteint, rangé avec sa fuite étalon", "produit moussant essuyé", "vannes de service au siège arrière, capuchons et bouchons remis, serrés", "machine remise en route seulement avec l'accord du professeur (si fuite : elle reste arrêtée)", "rien d'abîmé, rien qui manque"],
          ok: "Tout est remis comme je l'ai trouvé.", manque: "Il manque une coche : je ne quitte pas le poste avant." } }
    ],

    /* valeurs du contrôle automatique (_moule/qa.mjs) : toutes doivent donner un verdict vert */
    test: {
      machine: { fluide: "R-407C", classe: "A1", detecteur: "détecteur du poste" },
      charge: { registre: ["R407C"], visuel: ["2"], adapte: ["0"], verif: [ilYa(3)], etalon: ["0"], balayage: ["12", "1"], confirmer: ["0"] }
    }
  };
})();
