/* =====================================================================
   Gare 12 — METTRE EN SERVICE UNE CHAMBRE FROIDE NÉGATIVE (ligne « Les interventions de base, au poste »).
   Restructure, sans réinventer (voir SOURCES.md) :
   · les TP « Chambre froide négative : mise en service et mesures » (TP2, TP3) et l'activité « Mise en service de l'installation » (version CCF) de Franck :
     tableau de mise en service, manifold, réglages, relevé de fonctionnement, diagramme enthalpique, dysfonctionnements ;
   · la « Feuille de relevé de mise en service » de Franck (pressions, températures, intensité, surchauffe, sous-refroidissement) ;
   · la planche « Mesurer la surchauffe » de Franck (T° tube − T° de saturation ; pression absolue = relative + 1 bar) ;
   · HabFluide chapitre 8, § 8 (mise en route, givrage, dégivrage et retour au froid).
   Les gestes déjà guidés ailleurs sont cités, pas refaits : pose des manomètres, étanchéité sous azote, vide, charge, autocontrôle.
   Aucune valeur universelle inventée : consigne, pressostats, couple, fin de dégivrage viennent du dossier, de la notice ou du professeur.
   ===================================================================== */
(function () {
  /* saturation du fluide : base fluides d'inerWeb (packs/fluides/res/outils/fluides-data.js, CoolProp, valeurs pédagogiques).
     t en °C ; p = pression absolue de bulle (liquide) ; pr = pression absolue de rosée (vapeur, mélanges à glissement), en bar. */
  const TABLES = {
    R404A: { t: [-40, -30, -20, -10, 0, 10, 20, 30, 40, 50], p: [1.353, 2.078, 3.071, 4.391, 6.102, 8.271, 10.972, 14.283, 18.294, 23.106], pr: [1.31, 2.022, 3.002, 4.308, 6.003, 8.157, 10.844, 14.144, 18.146, 22.957] },
    R449A: { t: [-40, -30, -20, -10, 0, 10, 20, 30, 40], p: [1.336, 2.064, 3.067, 4.407, 6.149, 8.363, 11.122, 14.502, 18.583], pr: [1.005, 1.6, 2.44, 3.587, 5.109, 7.079, 9.577, 12.692, 16.522] },
    R448A: { t: [-40, -30, -20, -10, 0, 10, 20, 30, 40], p: [1.355, 2.093, 3.11, 4.468, 6.233, 8.477, 11.272, 14.697, 18.831], pr: [0.997, 1.59, 2.431, 3.58, 5.106, 7.085, 9.598, 12.736, 16.599] },
    R134A: { t: [-40, -30, -20, -10, 0, 10, 20, 30, 40, 50], p: [0.512, 0.844, 1.327, 2.006, 2.928, 4.146, 5.717, 7.702, 10.166, 13.179] },
    R407C: { t: [-40, -30, -20, -10, 0, 10, 20, 30, 40, 50], p: [1.203, 1.871, 2.799, 4.047, 5.679, 7.764, 10.376, 13.591, 17.49, 22.16], pr: [0.857, 1.387, 2.147, 3.198, 4.607, 6.449, 8.803, 11.759, 15.413, 19.878] },
    R410A: { t: [-40, -30, -20, -10, 0, 10, 20, 30, 40, 50], p: [1.755, 2.703, 4.007, 5.746, 8.007, 10.884, 14.476, 18.893, 24.256, 30.706], pr: [1.749, 2.693, 3.993, 5.727, 7.981, 10.848, 14.43, 18.835, 24.187, 30.628] },
    R32: { t: [-40, -30, -20, -10, 0, 10, 20, 30, 40, 50], p: [1.774, 2.734, 4.058, 5.826, 8.131, 11.069, 14.746, 19.275, 24.783, 31.412] },
    R290: { t: [-40, -30, -20, -10, 0, 10, 20, 30, 40, 50], p: [1.111, 1.678, 2.445, 3.453, 4.745, 6.366, 8.365, 10.79, 13.694, 17.133] }
  };
  /* classe de sécurité par fluide : base fluides d'inerWeb (champ classe) */
  const CLASSE = { R22: "A1", R32: "A2L", R134A: "A1", R404A: "A1", R407C: "A1", R410A: "A1", R448A: "A1", R449A: "A1", R454B: "A2L", R454C: "A2L", R513A: "A1", R1234YF: "A2L", R1234ZE: "A2L", R290: "A3", R600A: "A3", R717: "B2L", R744: "A1" };
  const STATION_HC = "<a href='../../../packs/fluides/res/intervention-hydrocarbures-interactive/'>Intervenir sur un circuit hydrocarbure</a>";
  const cle = f => String(f || "").toUpperCase().replace(/[\s-]/g, "");
  /* température de saturation d'une pression RELATIVE lue au manomètre (absolue = relative + 1 bar), côté bulle ou rosée */
  const tsat = (fluide, prel, cote) => {
    const T = TABLES[cle(fluide)]; if (!T || isNaN(prel)) return null;
    const P = cote === "rosee" && T.pr ? T.pr : T.p, pa = prel + 1.013;
    let i = 0; while (i < P.length - 2 && pa > P[i + 1]) i++;
    return T.t[i] + (pa - P[i]) / (P[i + 1] - P[i]) * (T.t[i + 1] - T.t[i]);
  };
  const ECART = 2;   /* K : lecture de la couronne du manomètre et interpolation de la table (choisi à la fabrication) */

  window.GARE = {
    id: "mise-en-service-chambre-negative",
    titre: "Mettre en service une chambre froide négative",
    sousTitre: "Les interventions de base · gare 12 · réglages, mise en route, relevés, premier dégivrage · en cours de relecture",
    parcours: ["charge"],
    parcoursNoms: { charge: { nom: "Chambre froide négative", aide: "installation chargée, essais faits, mise en service avec le professeur" } },
    machine: [
      { id: "fluide", label: "Fluide (plaque de la machine)", court: "Fluide", exemple: "ex. R-449A", texte: true },
      { id: "consigne", label: "Consigne de la chambre (dossier)", court: "Consigne", unite: "°C", nombre: true },
      { id: "intensite", label: "Intensité nominale du compresseur (plaque moteur)", court: "Intensité plaque", unite: "A", nombre: true }
    ],
    /* Deux niveaux (Franck, 08/10) : mêmes étapes, mêmes attendus ; codes et exigence propres. */
    codes: {
      cap: "CAP IFCA — tâches T14, T15 · compétences C4.5, C4.6, C4.7, C1.1 · savoirs S5.1, S5.6, S5.7 ; autre référentiel visé : titre professionnel Monteur dépanneur frigoriste (RNCP37876), CP3 « Mettre en service une installation frigorifique monoposte à température négative »",
      mfer: "1re Bac Pro MFER — tâches A2T7 · compétences C7, C8, C12 · savoirs S6.2.1, S6.2.2, S4.1.5 ; autre référentiel visé : titre professionnel Monteur dépanneur frigoriste (RNCP37876), CP3 « Mettre en service une installation frigorifique monoposte à température négative »",
      commun: "attestation d'aptitude fluides (règlement (UE) 2024/2215, annexe I) : 4.05 (instruments de mesure portables), 3.05 (consigner dans le registre et rédiger un rapport d'essais et de contrôles), 4.09 (consigner dans le registre de l'équipement)"
    },
    grille: [
      ["Je fais l'état des lieux et je vérifie que tout est prêt avant la mise sous tension", { cap: "T14 · C4.7", mfer: "A2T7 · C7" }],
      ["Je règle le thermostat, le relais thermique et les sécurités, et je pose le manifold", { cap: "C4.6 · S5.6", mfer: "C8 · S6.2.2" }],
      ["Je lis et je mesure : pressions, températures, intensité, surchauffe, sous-refroidissement", { cap: "C4.5 · S5.1", mfer: "A2T7 · S6.2.1" }],
      ["Je déclenche et j'observe un dégivrage, et j'explique ce que je vois", { cap: "T14 · S5.7", mfer: "C8 · S4.1.5" }],
      ["Je remplis la fiche de mise en service et je range", { cap: "T15 · C1.1", mfer: "C12" }]
    ],
    exigence: {
      cap: "chaque réglage vérifié par le professeur avant la mise en route, chaque relevé lu sur l'instrument et écrit, rien relevé avant la stabilisation ; le professeur peut guider aux points d'arrêt.",
      mfer: "les mêmes gestes, sans aide entre les points d'arrêt ; je justifie chaque réglage, je repère seul un relevé incohérent (surchauffe nulle, flèche d'air à l'envers) et j'en tire une cause probable."
    },
    savoirEtre: "je ne mets rien en route sans le professeur, et je n'écris que ce que j'ai lu",
    tolerances: { pesee: 0.05, mesure: 0.05 },

    bilan(c) {
      const hp = c.releve("cadrans", 0), k = c.releve("cadrans", 1), bp = c.releve("cadrans", 2), z = c.releve("cadrans", 3), sc = c.releve("surchauffe", 0), sr = c.releve("surchauffe", 1), i = c.releve("intensite", 0);
      return `Fluide <b>${c.m.fluide || "…"}</b> · consigne <b>${c.m.consigne || "…"} °C</b> · HP <b>${hp || "…"} bar</b> (T° condensation <b>${k || "…"} °C</b>) · BP <b>${bp || "…"} bar</b> (T° évaporation <b>${z || "…"} °C</b>) · surchauffe (SC) <b>${sc || "…"} K</b>, sous-refroidissement (SR) <b>${sr || "…"} K</b> · intensité <b>${i || "…"} A</b> (plaque ${c.m.intensite || "…"} A)`;
    },

    dessin: {
      fichier: "dessin.svg",
      vue: "0 0 1200 620",
      noms: { "equipment-installation": "le groupe de condensation et ses vannes", "equipment-manifold": "le manifold", "equipment-chambre": "la chambre froide et son évaporateur",
        "equipment-regulation": "le thermostat et les pressostats", "equipment-tubes": "les tubes et le compresseur", "equipment-surchauffe": "la mesure de la surchauffe et du sous-refroidissement", "equipment-fiche": "la fiche de mise en service" },
      /* l'état du dessin suit l'étape : flexibles posés, aiguilles aux valeurs lues (repères du dessin, sans chiffres) */
      appliquer(svg, e, c) {
        svg.querySelectorAll(".hose").forEach(h => h.classList.remove("connected"));
        (e.tuyaux || []).forEach(t => { const h = svg.querySelector("#hose-path-" + t); if (h) h.classList.add("connected"); });
        const lu = (id, k) => c.nb(c.releve(id, k));
        let bp = lu("cadrans", 2), hp = lu("cadrans", 0);
        if (isNaN(bp) || isNaN(hp)) { bp = lu("manifold", 0); hp = lu("manifold", 1); }
        if (!(e.tuyaux || []).length || isNaN(bp)) { bp = 0; hp = 0; }
        const ang = (p, max) => -127 + Math.max(0, Math.min(1, p / max)) * 254;
        const tourne = (id, p, max, plus) => { const n = svg.querySelector("#" + id); if (n) n.style.transform = "rotate(" + (ang(p, max) + plus) + "deg)"; };
        tourne("needle-bp", bp, 12, 20); tourne("needle-hp", hp, 30, -20);
      }
    },

    etapes: [
      /* Franck, 08/10 : avant toute intervention, état des lieux — ici, la chambre et le groupe tels qu'on les trouve. */
      { id: "etat", verbe: "Je me protège et je fais l'état des lieux", cadre: ["equipment-chambre", "equipment-installation"], cible: "equipment-chambre",
        narration: "Cette gare s'appelle « Mettre en service une chambre froide négative ». Les gestes d'avant, la récupération, l'étanchéité sous azote, le vide, la charge, ont leurs propres gares. Ici, on démarre et on vérifie que l'installation fait son travail. D'abord, vos protections : lunettes et gants. Entrer en chambre négative demande un vêtement chaud et des gants, et on n'y reste pas longtemps, jamais seul. Ensuite, l'état des lieux : la porte, qui doit s'ouvrir de l'intérieur, l'alarme pour une personne enfermée, le groupe, les vannes de service. On ne ferme jamais la porte sur quelqu'un. Vous notez ce que vous trouvez.",
        regarde: "La chambre et sa porte, le groupe, ses vannes, ses capuchons.",
        fais: "Lunettes, gants, vêtement chaud pour la chambre. Je vérifie la porte (ouverture de l'intérieur, alarme), le groupe, les vannes, les capuchons. Je note ce qui manque.",
        voir: "EPI sur moi ; porte ouvrable de l'intérieur, alarme en état ; chaque défaut noté.",
        danger: "Personne enfermée : je ne ferme jamais la porte sur quelqu'un. Ouverture intérieure et alarme vérifiées avant.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["lunettes et gants portés ; vêtement chaud et gants contre le froid pour entrer dans la chambre", "la porte ferme bien, joints en bon état", "la porte s'ouvre de l'intérieur sans clé (poignée ou bouton d'évacuation), essayée porte tenue ouverte", "l'alarme « homme enfermé » est en état (bouton ou témoin, selon la notice)", "le groupe et l'évaporateur : rien d'abîmé, rien de mouillé, pas de trace d'huile", "capuchons de vannes et bouchons de prises présents et serrés", "personne dans la chambre, rien posé contre l'évaporateur ; en chambre négative je ne reste pas longtemps, jamais seul"],
          ok: "État des lieux fait : je saurai tout remettre comme je l'ai trouvé.", manque: "Il manque quelque chose : je le note et je le dis au professeur avant de continuer." } },

      { id: "dossier", verbe: "Je lis les valeurs du dossier", cadre: ["equipment-fiche"], cible: "equipment-fiche",
        narration: "Rien ne se règle de mémoire. Vous lisez dans le dossier ce qui est prévu pour cette chambre : le fluide, sa classe de sécurité, la consigne de température, la régulation. Les valeurs de réglage des pressostats, c'est le professeur qui vous les donne. Vous lisez sur la plaque du compresseur son intensité nominale. Fluide, consigne et intensité vont dans la case Ma machine : tous les contrôles suivants s'y réfèrent. Un fluide inflammable change tout : on ne met rien en route sans le professeur, avec un détecteur de gaz et une ventilation. Vous n'inventez jamais une valeur.",
        regarde: "Le dossier de la chambre, la plaque du compresseur.",
        fais: "Je lis le fluide, sa classe de sécurité, la consigne et l'intensité nominale. J'écris fluide, consigne, intensité dans « Ma machine ». Je demande les réglages des pressostats.",
        voir: "Valeurs écrites ; classe de sécurité lue sur la plaque ou l'étiquette.",
        danger: "Fluide inflammable (A2L, A3…) : rien en route sans le professeur ; détecteur de gaz, ventilation.",
        controle: { titre: "La classe de sécurité du fluide", champs: [{ label: "Classe lue sur la plaque ou l'étiquette (A1, A2L, A3…)", texte: true }],
          juger(v, c) {
            const lue = String(v[0] || "").toUpperCase().replace(/\s/g, ""), vraie = CLASSE[cle(c.m.fluide)];
            if (!c.m.fluide) return ["ambre", "J'écris d'abord le fluide de la plaque dans « Ma machine »."];
            if (!lue) return ["ambre", "J'écris la classe lue sur la plaque ou l'étiquette."];
            if (!vraie) return ["ambre", "Je n'ai pas ce fluide dans ma table : le professeur vérifie la classe avec moi avant de continuer."];
            if (lue !== vraie) return ["rouge", "STOP : la classe que j'ai écrite ne correspond pas à " + c.m.fluide + ". Je relis la plaque ou l'étiquette sans la deviner, et j'appelle le professeur."];
            if (!/^A1$/.test(vraie)) return ["rouge", "STOP : " + c.m.fluide + " est inflammable (classe " + vraie + "). Je ne mets rien en route seul : j'appelle le professeur. Avant : détecteur de gaz porté, local ventilé, aucune source d'ignition, outillage adapté. Station : " + STATION_HC + "."];
            return ["vert", c.m.fluide + " est A1 : non inflammable. Les risques restent la pression et le froid."];
          } } },

      { id: "prete", verbe: "Je vérifie que tout est prêt avant la mise sous tension", cadre: ["equipment-fiche"], cible: "equipment-fiche",
        narration: "Une mise en service ne se fait pas sur une installation qui n'est pas prête. Avant de remettre sous tension, vous vérifiez que tout ce qui précède est fait et écrit : l'autocontrôle de l'installation, l'autocontrôle électrique, l'étanchéité sous azote, le tirage au vide, la charge pesée, et le contrôle d'étanchéité au détecteur. Vous ne les refaites pas ici : vous contrôlez qu'ils sont faits. Il en manque un, on ne démarre pas.",
        regarde: "La fiche de mise en service : contrôles et essais déjà écrits.",
        fais: "Je vérifie, écrit sur ma fiche, que chaque contrôle et chaque essai est fait. S'il en manque un, je le fais ou je le demande : je ne mets pas sous tension.",
        voir: "Six contrôles faits et écrits, avec leur date.",
        danger: "Un essai ou un contrôle manquant : je ne demande pas la mise sous tension.",
        controle: { titre: "Je coche ce qui est fait et écrit", type: "coches",
          items: ["<span>l'autocontrôle de l'installation (<a href='../autocontrole-mise-en-service/'>gare « Autocontrôle »</a>)</span>", "l'autocontrôle électrique, hors tension (ÉlectroRézo)",
            "<span>l'étanchéité sous azote (<a href='../etancheite-azote/'>gare 4</a>) et le tirage au vide (<a href='../tirage-au-vide/'>gare 5</a>)</span>", "<span>la charge, pesée (<a href='../charge-fluide-neuf/'>gare 6</a>), avec le fluide de la plaque</span>", "<span>la recherche de fuite au détecteur (<a href='../fuite-detecteur/'>gare 9</a>)</span>"],
          ok: "Tout est fait et écrit : je peux passer aux réglages.", manque: "Il manque une coche : je ne continue pas avant." } },

      { id: "thermostat", verbe: "Je règle le thermostat", cadre: ["equipment-regulation"], cible: "equipment-regulation",
        narration: "Le thermostat de la chambre décide quand le froid démarre et s'arrête. Sa consigne, c'est la température que l'on veut dans la chambre : elle est écrite dans le dossier, vous ne la choisissez pas. Vous la réglez comme la notice du thermostat le montre, puis vous lisez ce qu'il affiche. L'affichage doit être égal à la consigne du dossier. Un autre régulateur, un autre menu : la notice dit comment, le dossier dit combien.",
        regarde: "Le thermostat : son afficheur, ses touches, sa notice.",
        fais: "Je règle la consigne comme la notice le montre. Je lis la consigne affichée et je la compare à celle du dossier.",
        voir: "La consigne affichée est celle du dossier.",
        controle: { titre: "Ce que le thermostat affiche", champs: [{ label: "Consigne affichée au thermostat", unite: "°C" }],
          juger(v, c) {
            const x = c.nb(v[0]), k = c.nb(c.m.consigne);
            if (isNaN(x)) return ["ambre", "J'écris la consigne affichée, en °C, avec son signe : -20, pas 20."];
            if (isNaN(k)) return ["ambre", "J'écris d'abord la consigne du dossier dans « Ma machine »."];
            return c.proche(x, k, 0, 0.5) ? ["vert", "Consigne affichée " + c.fr(x, 1) + " °C : c'est celle du dossier."]
              : ["rouge", "STOP : " + c.fr(x, 1) + " °C affichés, " + c.fr(k, 1) + " °C au dossier. Je corrige avant de continuer. Le signe est-il le bon ?"];
          } } },

      { id: "securites", verbe: "Je règle le relais thermique et les pressostats", cadre: ["equipment-regulation"], cible: "equipment-regulation",
        narration: "Maintenant, les sécurités. Le relais thermique protège le moteur du compresseur : on le règle sur l'intensité nominale écrite sur la plaque. Les pressostats de sécurité coupent la machine si la pression est trop basse ou trop haute. Leurs valeurs, c'est le professeur qui vous les donne. Pour vous entraîner à les régler, il y a le jeu de réglage des pressostats. Quand vos réglages sont prêts, vous prévenez le professeur : il les contrôle avant que la machine démarre.",
        regarde: "Le relais thermique, les pressostats, les valeurs données.",
        fais: "Je règle le relais sur l'intensité de la plaque. Je règle les pressostats aux valeurs du professeur, comme dans le <a href='../../simulateur/pressostat.html'>jeu de réglage</a>. Je préviens le professeur.",
        voir: "Relais égal à la plaque ; pressostats réglés aux valeurs données.",
        danger: "Un réglage non vérifié : la machine ne démarre pas. Le professeur contrôle d'abord.",
        controle: { titre: "Le relais thermique", champs: [{ label: "Réglage du relais thermique", unite: "A" }],
          juger(v, c) {
            const x = c.nb(v[0]), n = c.nb(c.m.intensite);
            if (isNaN(x)) return ["ambre", "J'écris le réglage du relais, en ampères, par exemple 6,5."];
            if (isNaN(n)) return ["ambre", "J'écris d'abord l'intensité nominale de la plaque dans « Ma machine »."];
            return c.proche(x, n, c.tol.mesure, 0.3) ? ["vert", "Relais à " + c.fr(x, 1) + " A pour " + c.fr(n, 1) + " A sur la plaque : réglage juste."]
              : ["rouge", "STOP : relais à " + c.fr(x, 1) + " A, la plaque dit " + c.fr(n, 1) + " A. Je règle sur la plaque, puis j'appelle le professeur."];
          } },
        arret: "Le professeur a vérifié : consigne, relais thermique et pressostats, avant la mise en route." },

      { id: "manifold", verbe: "Je pose les manomètres", cadre: ["equipment-manifold", "equipment-installation"], cible: "equipment-manifold", tuyaux: ["blue", "red"],
        narration: "Pour relever la basse et la haute pression, il faut les manomètres. Vous les posez comme dans la gare des manomètres : le flexible bleu sur la prise basse pression, le rouge sur la prise haute pression. Vous lisez ensuite les deux aiguilles, machine à l'arrêt. La haute pression ne peut pas être plus basse que la basse pression : si c'est le cas, les flexibles sont inversés. Ce sont des mesures que vous lisez sur l'instrument, pas des valeurs que vous calculez.",
        regarde: "Le manifold, ses deux aiguilles, les prises BP et HP.",
        fais: "Je pose le manifold comme dans la <a href='../pose-manometres/'>gare 2</a> : bleu sur la prise BP, rouge sur la prise HP. Je lis les deux aiguilles, machine arrêtée.",
        voir: "Deux flexibles posés ; deux pressions lues, la HP au moins égale à la BP.",
        controle: { titre: "Je lis les deux aiguilles, machine arrêtée", champs: [{ label: "BP", unite: "bar" }, { label: "HP", unite: "bar" }],
          juger(v, c) {
            const bp = c.nb(v[0]), hp = c.nb(v[1]); if (isNaN(bp) || isNaN(hp)) return ["ambre", "J'écris deux nombres, en bar."];
            if (hp + 0.3 < bp) return ["rouge", "La HP plus basse que la BP : flexibles inversés ? Je vérifie bleu = BP, rouge = HP."];
            if (bp <= 0) return ["ambre", "La BP est à zéro ou en dessous : c'est possible après une régulation pump-down, mais je le dis au professeur."];
            return ["vert", "BP " + c.fr(bp, 1) + " bar, HP " + c.fr(hp, 1) + " bar : manomètres bien posés, installation sous pression."];
          } } },

      { id: "demarrer", verbe: "Le professeur met en route, j'observe", cadre: ["equipment-installation", "equipment-chambre"], cible: "equipment-installation", tuyaux: ["blue", "red"],
        narration: "C'est le professeur qui remet sous tension et qui lance la machine. Vous, vous observez, les yeux sur la machine et la main loin des parties qui tournent. Le compresseur démarre. Les ventilateurs du condenseur et de l'évaporateur tournent. Vous écoutez : aucun bruit anormal, aucune vibration forte. Sur le manifold, la basse pression descend et la haute pression monte. Au moindre doute, on arrête. Le professeur vient d'abord vérifier tout ce qui précède.",
        regarde: "Le compresseur, les ventilateurs, les deux aiguilles.",
        fais: "Je reste à distance. Le professeur lance. Je regarde le compresseur, les ventilateurs, les aiguilles. J'écoute : bruit, vibration. Au moindre doute, je le dis tout de suite.",
        voir: "Compresseur et ventilateurs en marche ; BP qui descend, HP qui monte.",
        danger: "Mains loin des pales et des courroies. Bruit anormal, odeur, vibration forte : on arrête.",
        controle: { titre: "Je coche ce que j'observe", type: "coches",
          items: ["le compresseur a démarré", "le ventilateur du condenseur tourne", "le ventilateur de l'évaporateur tourne", "aucun bruit anormal, aucune vibration forte", "la BP descend et la HP monte"],
          ok: "La machine tourne normalement : j'attends la descente en température.", manque: "Il manque une coche : j'appelle le professeur, on ne relève rien." },
        arret: "Le professeur a vérifié : consigne, sécurités et manomètres, puis il a mis en route." },

      { id: "descente", verbe: "J'attends la descente en température", cadre: ["equipment-chambre"], cible: "equipment-chambre", tuyaux: ["blue", "red"],
        narration: "La chambre ne descend pas à sa température en une minute. Pendant ce temps, les pressions bougent : relever maintenant donnerait des valeurs qui ne veulent rien dire. Vous attendez que le régime se stabilise : les deux pressions et la température de la chambre ne bougent presque plus. La durée dépend de la chambre : vous ne la devinez pas, vous la lisez sur les aiguilles et sur l'afficheur. Si vous n'êtes pas sûr, vous demandez.",
        regarde: "Les deux aiguilles, l'afficheur de la chambre, l'horloge.",
        fais: "J'attends. Je regarde les deux aiguilles et l'afficheur de la chambre, de temps en temps. Je ne relève rien tant que ça descend encore.",
        voir: "Les pressions et la température de la chambre ne bougent presque plus.",
        controle: { titre: "Le régime est stable ? Les pressions et la température de la chambre ne bougent presque plus", type: "ouinon",
          oui: "Régime stable : je peux relever.",
          non: "STOP : ça descend encore. Je n'écris aucun relevé : j'attends, puis je regarde de nouveau." } },

      { id: "cadrans", verbe: "Je lis les deux cadrans", cadre: ["equipment-manifold"], cible: "equipment-manifold", tuyaux: ["blue", "red"],
        narration: "Premiers relevés : les deux cadrans. Sur chaque manomètre, vous lisez la pression en bar, et la température écrite sur la couronne de votre fluide, au bout de l'aiguille. Du côté haute pression, c'est la température de condensation. Du côté basse pression, la température d'évaporation. Vous lisez sur l'instrument, vous ne calculez pas. L'outil vérifie que votre température correspond à votre pression, avec une petite tolérance. Si ce n'est pas le cas, vous relisez la couronne.",
        regarde: "Les deux cadrans. Cours : <a href='../../../packs/fluides/res/chambre-negative-reglages-interactif/'>relevés et réglages</a>.",
        fais: "Je lis la pression HP, puis la température de la couronne de mon fluide, au bout de l'aiguille. Je fais pareil pour la BP. J'écris les quatre valeurs.",
        voir: "Quatre valeurs lues ; la T° de condensation au-dessus de la T° d'évaporation.",
        controle: { titre: "Mes quatre lectures", champs: [{ label: "HP", unite: "bar" }, { label: "T° de condensation lue sur la couronne", unite: "°C" }, { label: "BP", unite: "bar" }, { label: "T° d'évaporation lue sur la couronne", unite: "°C" }],
          juger(v, c) {
            const hp = c.nb(v[0]), k = c.nb(v[1]), bp = c.nb(v[2]), z = c.nb(v[3]);
            if ([hp, k, bp, z].some(isNaN)) return ["ambre", "J'écris quatre nombres : HP, sa température, BP, sa température (avec le signe -)."];
            if (hp <= bp) return ["rouge", "STOP : la HP (" + c.fr(hp, 1) + ") n'est pas au-dessus de la BP (" + c.fr(bp, 1) + ") : flexibles inversés ou lecture fausse."];
            if (k <= z) return ["rouge", "STOP : la T° de condensation (" + c.fr(k, 0) + ") doit être au-dessus de la T° d'évaporation (" + c.fr(z, 0) + ") : je relis les couronnes."];
            const tk = tsat(c.m.fluide, hp, "bulle"), tz = tsat(c.m.fluide, bp, "rosee");
            if (tk == null) return ["ambre", "Je n'ai pas la table de " + (c.m.fluide || "ce fluide") + " : je ne peux pas contrôler mes températures. Le professeur vérifie mes quatre lectures sur les couronnes avant de continuer."];
            if (Math.abs(k - tk) > ECART) return ["rouge", "STOP : ma température de condensation ne correspond pas à ma pression HP. Je relis la couronne du manomètre HP, au bout de l'aiguille."];
            if (Math.abs(z - tz) > ECART) return ["rouge", "STOP : ma température d'évaporation ne correspond pas à ma pression BP. Je relis la couronne du manomètre BP, au bout de l'aiguille."];
            return ["vert", "HP " + c.fr(hp, 1) + " bar pour " + c.fr(k, 0) + " °C, BP " + c.fr(bp, 1) + " bar pour " + c.fr(z, 0) + " °C : mes lectures sont cohérentes avec la table."];
          } } },

      { id: "temperatures", verbe: "Je mesure les températures", cadre: ["equipment-tubes"], cible: "equipment-tubes", tuyaux: ["blue", "red"],
        narration: "Maintenant les températures, avec la sonde de contact. Cinq mesures. L'air à l'entrée du condenseur, là où est le groupe. L'air de la chambre, à l'afficheur. Le tube à la sortie de l'évaporateur, où est posé le bulbe du détendeur. Le tube de la ligne liquide, à l'entrée du détendeur. Et le tube de refoulement du compresseur. La sonde touche bien le tube, à plat. Vous attendez que l'affichage se calme avant d'écrire. Chaque mesure est contrôlée avec vos lectures de pression, et avec le bon sens : le liquide ne peut pas être plus froid que l'air qui refroidit le condenseur.",
        regarde: "Les tubes (carte « tubes et compresseur »), l'air, l'afficheur.",
        fais: "Sonde à plat sur le tube, affichage stable. J'écris : air du condenseur, air de la chambre, sortie évaporateur, ligne liquide, refoulement.",
        voir: "Cinq températures stables, avec leur signe ; le refoulement est la plus chaude.",
        danger: "Le tube de refoulement est très chaud : je ne le touche pas avec la main.",
        controle: { titre: "Mes cinq températures", champs: [{ label: "Air à l'entrée du condenseur", unite: "°C" }, { label: "Air de la chambre (afficheur)", unite: "°C" }, { label: "Tube à la sortie de l'évaporateur", unite: "°C" }, { label: "Ligne liquide, à l'entrée du détendeur", unite: "°C" }, { label: "Refoulement du compresseur", unite: "°C" }],
          juger(v, c) {
            const [a, ch, b, l, r] = v.map(c.nb), k = c.nb(c.releve("cadrans", 1)), z = c.nb(c.releve("cadrans", 3));
            if ([a, ch, b, l, r].some(isNaN)) return ["ambre", "J'écris cinq températures en °C, avec le signe - pour les négatives."];
            if (isNaN(k) || isNaN(z)) return ["ambre", "Je n'ai pas noté les deux lectures des cadrans à l'étape d'avant : je les relève d'abord."];
            if (r <= k) return ["rouge", "STOP : le refoulement doit être plus chaud que la condensation : je relis ma sonde et son contact."];
            if (k <= a) return ["rouge", "STOP : la condensation doit être plus chaude que l'air qui refroidit le condenseur : je relis mes lectures et ma mesure d'air."];
            if (l < a - 1) return ["rouge", "STOP : la ligne liquide ne peut pas être plus froide que l'air qui refroidit le condenseur : sonde mal posée ou mesure fausse."];
            if (l > k + 0.5) return ["rouge", "STOP : la ligne liquide ne peut pas être plus chaude que la condensation : sonde mal posée ?"];
            if (b > ch + 1) return ["rouge", "STOP : la sortie de l'évaporateur ne peut pas être plus chaude que l'air de la chambre : sonde mal posée ?"];
            if (b < z - 0.5) return ["rouge", "STOP : la sortie de l'évaporateur ne peut pas être plus froide que l'évaporation : sonde mal posée ?"];
            return ["vert", "Les cinq mesures sont possibles entre elles et avec mes lectures de pression."];
          } } },

      { id: "surchauffe", verbe: "Je calcule la surchauffe et le sous-refroidissement", cadre: ["equipment-surchauffe"], cible: "equipment-surchauffe", tuyaux: ["blue", "red"],
        narration: "Deux écarts disent si l'installation est bien chargée et bien réglée. La surchauffe, notée S C : c'est la température du tube à la sortie de l'évaporateur, moins la température d'évaporation lue sur la couronne. Le sous-refroidissement, noté S R : c'est la température de condensation, moins la température du tube de la ligne liquide. Chacun est une soustraction, avec vos relevés. Une surchauffe nulle, c'est un danger : du liquide peut arriver au compresseur. Les repères habituels sont dans la planche, la notice du détendeur fait foi.",
        regarde: "Mes relevés, la carte « Mesurer SC et SR ».",
        fais: "SC = tube à la sortie de l'évaporateur − T° d'évaporation. SR = T° de condensation − tube de la ligne liquide. Je calcule, j'écris les deux écarts en kelvins.",
        voir: "Ex. : tube −16, évaporation −24 : SC = −16 − (−24) = 8 K. SR = 40 − 34 = 6 K.",
        danger: "Surchauffe nulle : du liquide peut revenir au compresseur. J'arrête et j'appelle le professeur.",
        controle: { titre: "Mes deux écarts", champs: [{ label: "Surchauffe (SC)", unite: "K" }, { label: "Sous-refroidissement (SR)", unite: "K" }],
          juger(v, c) {
            const sc = c.nb(v[0]), sr = c.nb(v[1]), b = c.nb(c.releve("temperatures", 2)), l = c.nb(c.releve("temperatures", 3)), k = c.nb(c.releve("cadrans", 1)), z = c.nb(c.releve("cadrans", 3));
            if (isNaN(sc) || isNaN(sr)) return ["ambre", "J'écris deux nombres en kelvins, par exemple 7 et 5."];
            if ([b, l, k, z].some(isNaN)) return ["ambre", "Il me manque des relevés des étapes d'avant : je les fais avant de calculer."];
            const sc0 = b - z, sr0 = k - l;
            if (Math.abs(sc - sc0) > 0.6) return ["ambre", "Mes relevés donnent SC = " + c.fr(b, 0) + " − (" + c.fr(z, 0) + ") = " + c.fr(sc0, 0) + " K, j'ai écrit " + c.fr(sc, 0) + " K : je recalcule."];
            if (Math.abs(sr - sr0) > 0.6) return ["ambre", "Mes relevés donnent SR = " + c.fr(k, 0) + " − (" + c.fr(l, 0) + ") = " + c.fr(sr0, 0) + " K, j'ai écrit " + c.fr(sr, 0) + " K : je recalcule."];
            if (sc <= 0) return ["rouge", "STOP : surchauffe de " + c.fr(sc, 0) + " K, c'est du liquide qui peut arriver au compresseur. J'arrête et j'appelle le professeur."];
            const mots = [];
            if (sc < 5 || sc > 10) mots.push("surchauffe " + c.fr(sc, 0) + " K, hors du repère 5 à 10 K de la planche");
            if (sr < 4 || sr > 8) mots.push("sous-refroidissement " + c.fr(sr, 0) + " K, hors du repère 4 à 8 K de la planche");
            return mots.length ? ["ambre", "Calculs justes, mais " + mots.join(" et ") + " : je le note et j'en parle au professeur (charge, réglage du détendeur, notice)."]
              : ["vert", "SC " + c.fr(sc, 0) + " K et SR " + c.fr(sr, 0) + " K : calculs justes, et dans les repères de la planche."];
          } } },

      { id: "intensite", verbe: "Le professeur mesure l'intensité, je la note", cadre: ["equipment-tubes"], cible: "equipment-tubes", tuyaux: ["blue", "red"],
        narration: "Dernier relevé : l'intensité absorbée par le compresseur. Elle se mesure à la pince ampèremétrique, autour d'un seul fil, dans l'armoire sous tension. Cette mesure est faite par le professeur, ou par une personne habilitée : vous, vous restez à distance, vous lisez l'afficheur de la pince et vous notez. Vous comparez à l'intensité nominale de la plaque : elle ne doit pas la dépasser. Si elle est nulle, le compresseur ne tourne pas. Le professeur vient d'abord vérifier, avant de poser la pince.",
        regarde: "L'afficheur de la pince du professeur, la plaque du compresseur.",
        fais: "Armoire sous tension : le professeur pose la pince. Je reste à distance, je lis l'afficheur, j'écris l'intensité et je la compare à la plaque.",
        voir: "Une intensité lue, inférieure ou égale à celle de la plaque.",
        danger: "Armoire sous tension : seul le professeur ou une personne habilitée y met la pince. Je ne touche à rien.",
        controle: { titre: "L'intensité lue sur la pince", champs: [{ label: "Intensité lue sur la pince du professeur", unite: "A" }],
          juger(v, c) {
            const i = c.nb(v[0]), n = c.nb(c.m.intensite);
            if (isNaN(i)) return ["ambre", "J'écris l'intensité lue, en ampères."];
            if (isNaN(n)) return ["ambre", "J'écris d'abord l'intensité de la plaque dans « Ma machine »."];
            if (i <= 0) return ["rouge", "STOP : zéro ampère : le compresseur ne tourne pas ou la pince est mal posée. J'appelle le professeur."];
            if (i > n * (1 + c.tol.mesure) + 0.3) return ["rouge", "STOP : " + c.fr(i, 1) + " A lus, " + c.fr(n, 1) + " A sur la plaque. Le professeur arrête la machine."];
            return ["vert", c.fr(i, 1) + " A lus pour " + c.fr(n, 1) + " A sur la plaque : le compresseur n'est pas surchargé."];
          } },
        arret: "Le professeur a vérifié : il pose la pince lui-même, avant que je lise." },

      { id: "degivrage", verbe: "Je déclenche et j'observe un dégivrage", cadre: ["equipment-regulation", "equipment-chambre"], cible: "equipment-regulation", tuyaux: ["blue", "red"],
        narration: "Dans une chambre négative, l'évaporateur givre : il faut le dégivrer. À la mise en service, on vérifie que le dégivrage fonctionne. Vous le déclenchez à la main, comme la notice du régulateur ou de l'horloge le dit. Vous observez : le dégivrage démarre, il se termine, au bout d'un temps ou grâce à une sonde de fin de dégivrage, puis le froid revient. Les durées et la température de fin viennent de la notice. Pendant le dégivrage, vous ne touchez à rien dans la chambre. Le professeur vient vérifier avant que vous le déclenchiez.",
        regarde: "Le thermostat ou l'horloge de dégivrage (carte du thermostat).",
        fais: "Je déclenche un dégivrage comme la notice le dit. Je regarde : il démarre, il se termine, le froid revient. Je note la notice, pas une durée devinée.",
        voir: "Dégivrage démarré, puis terminé ; la BP rebaisse et les ventilateurs repartent.",
        danger: "Pendant le dégivrage l'évaporateur chauffe : je ne touche à rien dans la chambre.",
        controle: { titre: "Je coche ce que j'ai observé", type: "coches",
          items: ["j'ai déclenché le dégivrage comme la notice le dit", "le dégivrage a démarré", "il s'est terminé : au bout du temps ou à la sonde de fin de dégivrage", "le froid est revenu : la BP rebaisse, les ventilateurs repartent"],
          ok: "Dégivrage vérifié : il démarre, il se termine, le froid revient.", manque: "Il manque une coche : je ne conclus pas, j'appelle le professeur." },
        arret: "Le professeur a vérifié : je peux déclencher le premier dégivrage." },

      { id: "trace", verbe: "Je dépose les manomètres, je remplis la fiche, je range", cadre: ["equipment-fiche"], cible: "equipment-fiche",
        narration: "Dernière étape : on rend l'installation en ordre et on garde la trace. Vous déposez les manomètres comme dans la gare de la dépose. Vous remplissez la fiche de mise en service avec vos relevés : pressions, températures, intensité, surchauffe, sous-refroidissement, consigne. Vous reportez l'intervention sur la fiche d'intervention et le registre de l'équipement. La feuille de route de la chaîne entière montre la fiche de mise en service complète. La gare est terminée.",
        regarde: "Mes relevés, la fiche de mise en service, le registre.",
        fais: "Je dépose les manomètres, sans perte de fluide. Je recopie mes relevés sur la fiche de mise en service. Je renseigne la fiche d'intervention et le registre. Je range.",
        voir: "Manomètres déposés, fiche remplie et signée, poste rangé.",
        controle: { titre: "Je coche ma trace", type: "coches",
          items: ["<span>manomètres déposés (<a href='../depose-manometres/'>gare 3</a>), prises rebouchées</span>", "relevés recopiés sur la fiche de mise en service : pressions, températures, intensité, SC, SR", "<span>fiche d'intervention et registre renseignés (<a href='../chaine-entiere/'>« La chaîne entière »</a>)</span>", "<span>cycle reporté sur le diagramme, si le professeur le demande (<a href='../../../packs/fluides/res/diagramme-enthalpique/'>diagramme enthalpique</a>)</span>", "poste rangé, outils comptés"],
          ok: "Mise en service tracée : la chambre est rendue en ordre.", manque: "Il manque une coche : la trace n'est pas finie, je ne range pas." } }
    ],

    /* valeurs du contrôle automatique (_moule/qa.mjs) : toutes doivent donner un verdict vert */
    test: {
      machine: { fluide: "R-449A", consigne: "-20", intensite: "6,5" },
      charge: { thermostat: ["-20"], securites: ["6,5"], manifold: ["10,0", "10,1"], cadrans: ["15,0", "34", "0,8", "-28"], dossier: ["A1"], temperatures: ["25", "-19", "-21", "29", "85"], surchauffe: ["7", "5"], intensite: ["5,8"] }
    }
  };
})();
