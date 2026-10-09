/* =====================================================================
   Gare 3 — DÉPOSER LES MANOMÈTRES (ligne « Les interventions de base »).
   Restructure, sans réinventer :
   · la fiche de Franck « Fiche branchement débranchement des manifolds » (CAP, étape 6 : by-pass) et
     « TRAVAUX PRATIQUES POSE des manifold… » (§ 4 : dépose sans perte de fluide) ;
   · « Comment on fait » feuille 5 « Débrancher sans perdre de fluide » (1re MFER) et le TP 1 partie B ;
   · packs/fluides/res/pose-manifold-interactive (écran « Déposer ») et chaine-intervention-interactive (« Déconnecter »).
   Un seul parcours, écrit pour du vrai fluide (Franck, 08/10 : « la manipulation est strictement la même », azote ou fluide).
   Machine en marche, by-pass du manifold ouvert : le compresseur aspire le flexible HP jusqu'à la BP de marche (juste avant 0 bar si elle est basse), jamais sous 0 (Franck, 08/10)
   (Franck, 08/10), dit dans l'étape « J'attends que le compresseur aspire le flexible HP ». Seules les phrases « Sous azote : »
   disent ce que le support sans compresseur change.
   Le dessin est celui de la gare « Récupérer le fluide » : station, pompe, vacuomètre et bouteille masqués.
   ===================================================================== */
window.GARE = {
  id: "depose-manometres",
  parcours: ["charge"],
  parcoursNoms: { charge: { nom: "Au poste", aide: "sous azote (conseillé au lycée) ou sous fluide : même geste" } },
  titre: "Déposer les manomètres",
  sousTitre: "Les interventions de base · gare 3 · sans rien laisser sous pression",
  machine: [
    { id: "bpmax", label: "Manomètre BP : valeur maximale du cadran", court: "Cadran BP, maxi", unite: "bar", nombre: true }
  ],
  /* Deux niveaux (Franck, 08/10) : mêmes étapes, mêmes attendus (l'attestation fluides) ; codes et exigence propres. */
  codes: {
    cap: "CAP IFCA — tâches T8, T13 · compétences C4.2, C4.3, C4.5, C4.7 · savoirs S5.5, S5.2, S0.1, S6.2",
    mfer: "1re Bac Pro MFER — tâches A1T3, A2T3, A2T5 · compétences C4, C6 · savoirs S2, S5, S7",
    commun: "niveau de l'attestation d'aptitude fluides (règlement (UE) 2024/2215, annexe I) — 4.05 et 5.01 (connecter et déconnecter les jauges et lignes en produisant le minimum d'émissions)"
  },
  grille: [
    ["Je me protège, je fais l'état des lieux et je lis les pressions", { cap: "T8 · C4.5", mfer: "A1T3 · C4" }],
    ["Je ferme dans l'ordre et le compresseur aspire le flexible HP, jusqu'à la BP de marche, jamais sous 0", { cap: "C4.2 · C4.7", mfer: "A2T5 · C6" }],
    ["Je desserre lentement, raccord tenu, rien à l'air, et les aiguilles reviennent à 0", { cap: "C4.7 · T13", mfer: "A2T3 · C6" }],
    ["Je remets tout comme je l'ai trouvé : bouchons, capuchons, étanchéité, rangement", { cap: "C4.3 · C4.7", mfer: "A2T3 · C6" }]
  ],
  exigence: {
    cap: "chaque geste juste et dans l'ordre, comme sur du vrai fluide : aucun rejet à l'air, jamais sous 0 bar, aiguilles à 0, bouchons remis, aucune fuite ; le professeur peut guider aux points d'arrêt.",
    mfer: "les mêmes gestes, comme sur du vrai fluide, sans aide entre les points d'arrêt ; je justifie chaque contrôle et je repère seul un relevé incohérent."
  },
  savoirEtre: "je travaille comme sur du vrai fluide : je desserre toujours lentement, raccord tenu, rien ne part à l'air",
  tolerances: { pesee: 0.05, mesure: 0.05 },
  LECTURE: 0.3,   /* ⟦à valider Franck⟧ erreur de lecture d'une aiguille, en bar, ajoutée aux 5 % de mesure */

  bilan(c) {
    const f = (k, i) => { const x = c.nb(c.releve(k, i)); return isNaN(x) ? "…" : c.fr(x, 1); };
    return `Avant : BP <b>${f("lecture", 0)}</b>, HP <b>${f("lecture", 1)}</b> bar · ` +
      `après le by-pass : BP <b>${f("egaliser", 0)}</b>, HP <b>${f("egaliser", 1)}</b> bar (les deux aiguilles se rejoignent à la BP de marche, jamais sous 0)`;
  },

  dessin: {
    fichier: "dessin.svg",
    vue: "20 20 690 440",
    noms: { "equipment-installation": "la machine (le groupe et ses vannes de service)", "vanne-a": "la vanne de service A (refoulement)",
      "vanne-b": "la vanne de service B (départ liquide, côté HP)", "vanne-c": "la vanne de service C (aspiration, côté BP)",
      "equipment-manifold": "le manifold et ses deux manomètres", "vanne-man-hp": "la vanne HP du manifold", "vanne-man-bp": "la vanne BP du manifold" },
    /* l'état du dessin suit l'étape : flexibles posés, vannes de service, vannes du manifold, aiguilles */
    appliquer(svg, e, c) {
      const $ = id => svg.querySelector("#" + id);
      svg.querySelectorAll(".hose").forEach(h => h.classList.remove("connected"));
      (e.tuyaux || []).forEach(t => { const h = $("hose-path-" + t); if (h) h.classList.add("connected"); });
      const bj = $("bouchon-jaune"); if (bj) bj.style.display = (e.tuyaux || []).includes("yellow") ? "" : "none";
      /* vannes : [B (HP), C (BP), vanne HP du manifold ouverte ?, vanne BP du manifold ouverte ?] */
      const [b, cc, mh, mb] = e.etat || ["lecture", "lecture", false, false];
      const mot = { lecture: "position lecture", arriere: "siège arrière" };
      const txt = (id, t) => { const n = $(id); if (n) n.textContent = t; };
      txt("etat-b", mot[b]); txt("etat-c", mot[cc]); txt("etat-mhp", mh ? "ouverte" : "fermée"); txt("etat-mbp", mb ? "ouverte" : "fermée");
      [["svg-manifold-hp", mh], ["svg-manifold-bp", mb]].forEach(([id, ouvert]) => { const l = svg.querySelector("#" + id + " .knob-line"); if (l) l.style.transform = ouvert ? "rotate(90deg)" : ""; });
      /* aiguilles : les valeurs de l'élève si elles existent, sinon un exemple */
      const val = (r, d) => { const x = c.nb(r); return isNaN(x) ? d : x; };
      const bp0 = val(c.releve("lecture", 0), 3), hp0 = val(c.releve("lecture", 1), 3);
      const hp1 = val(c.releve("hp-siege", 0), hp0), eg = val(c.releve("egaliser", 0), bp0);
      const [pb, ph] = { lecture: [bp0, hp0], hp: [bp0, hp1], egal: [eg, eg], zero: [0, 0] }[e.aig || "lecture"];
      const aiguille = (id, p, max) => {
        const l = $(id); if (!l) return;
        const a = (-120 + 240 * Math.max(0, Math.min(p / max, 1.05))) * Math.PI / 180;
        l.setAttribute("x2", (38 * Math.sin(a)).toFixed(1)); l.setAttribute("y2", (-38 * Math.cos(a)).toFixed(1));
        l.setAttribute("x1", (-12 * Math.sin(a)).toFixed(1)); l.setAttribute("y1", (12 * Math.cos(a)).toFixed(1));
      };
      aiguille("needle-bp", pb, 15); aiguille("needle-hp", ph, 30);
    }
  },

  etapes: [
    { id: "securite", verbe: "Je me protège et je regarde le poste", cadre: ["equipment-installation", "equipment-manifold", "etat-machine", "etat-manifold"], cible: "equipment-installation",
      tuyaux: ["blue", "red", "yellow"], etat: ["lecture", "lecture", false, false], aig: "lecture",
      regarde: "Le manifold branché, la machine en marche.",
      fais: "Lunettes et gants. Je regarde : bleu sur la BP, rouge sur la HP, jaune bouché, 4 vannes du manifold fermées. La machine tourne : je ne la coupe pas.",
      voir: "Un poste en ordre : machine en marche, rien d'autre ne bouge encore.",
      danger: "Le fluide liquide brûle par le froid : lunettes et gants, flexibles tenus loin des visages.",
      controle: { titre: "Je coche ce que j'ai vu", type: "coches", items: ["lunettes et gants", "4 vannes du manifold fermées", "flexible jaune bouché", "machine en marche, pressions stables"],
        ok: "Poste en ordre.", manque: "Il manque une coche : je ne touche à aucune vanne avant." } },

    /* Franck, 08/10 : avant toute intervention, état des lieux — ce que je devrai retrouver à la fin. Ici le manifold est déjà posé :
       les vannes sont en position lecture (quart de tour) et les capuchons et bouchons sont ôtés, rangés. */
    { id: "etat-des-lieux", verbe: "Je fais l'état des lieux", cadre: ["equipment-installation", "etat-machine"], cible: "equipment-installation",
      tuyaux: ["blue", "red", "yellow"], etat: ["lecture", "lecture", false, false], aig: "lecture",
      regarde: "Les vannes de service, leurs prises, leurs capuchons et leurs bouchons.",
      fais: "Je regarde chaque vanne de service : position lecture (le manifold est branché), capuchons et bouchons rangés propres, joints présents. Je note ce que je devrai retrouver à la fin.",
      voir: "Vannes en position lecture ; 2 bouchons et 2 capuchons rangés, rien d'abîmé.",
      controle: { titre: "Je coche ce que j'ai vu", type: "coches",
        items: ["vannes de service en position lecture", "2 bouchons de prise et 2 capuchons de tige retrouvés, joints propres", "presse-étoupes, raccords et flexibles en bon état", "rien d'abîmé, rien qui manque"],
        ok: "État des lieux fait : je saurai tout remettre comme je l'ai trouvé.",
        manque: "Il manque quelque chose : je le signale au professeur avant de commencer." } },

    { id: "lecture", verbe: "Je lis les deux aiguilles", cadre: ["equipment-manifold", "bouchon-jaune"], cible: "equipment-manifold",
      tuyaux: ["blue", "red", "yellow"], etat: ["lecture", "lecture", false, false], aig: "lecture",
      regarde: "Les aiguilles BP (bleue) et HP (rouge) du manifold.",
      fais: "Vannes du manifold fermées, machine en marche. Je lis la BP et la HP, en bar. Je les note : elles me serviront plus loin. Sous azote : support à l'arrêt, les deux aiguilles sont presque égales.",
      voir: "Machine en marche : la HP plus haute que la BP.",
      controle: { titre: "Je lis les deux aiguilles", champs: [{ label: "BP", unite: "bar" }, { label: "HP", unite: "bar" }],
        juger(v, c) {
          const bp = c.nb(v[0]), hp = c.nb(v[1]), L = window.GARE.LECTURE; if (isNaN(bp) || isNaN(hp)) return ["ambre", "J'écris deux nombres, en bar."];
          if (c.proche(bp, hp, c.tol.mesure, L)) return ["vert", "BP et HP presque égales (" + c.fr(bp, 1) + " bar) : normal sur un support à l'arrêt. Sur une machine en marche, la HP serait plus haute."];
          return hp < bp ? ["rouge", "La HP plus basse que la BP : flexibles inversés ? Je vérifie bleu = BP, rouge = HP."]
            : ["vert", "HP plus haute que la BP de " + c.fr(hp - bp, 1) + " bar : normal, la machine est en marche."];
        } } },

    { id: "hp-siege", verbe: "Je ramène la vanne HP au siège arrière", cadre: ["equipment-installation", "equipment-manifold", "etat-machine"], cible: "vanne-b",
      tuyaux: ["blue", "red", "yellow"], etat: ["arriere", "lecture", false, false], aig: "hp",
      regarde: "La vanne de service B, côté HP (départ liquide).",
      fais: "Je desserre le presse-étoupe, je ramène le carré au siège arrière (position haute), puis je resserre le presse-étoupe.",
      voir: "La prise de service est fermée : la HP reste piégée dans le flexible.",
      danger: "Vannes de service : seulement avec le professeur à côté de moi.",
      controle: { titre: "HP lue après la fermeture", champs: [{ unite: "bar" }],
        juger(v, c) {
          const x = c.nb(v[0]), hp0 = c.nb(c.releve("lecture", 1)), L = window.GARE.LECTURE, mx = c.nb(c.m.bpmax);
          if (isNaN(x)) return ["ambre", "J'écris un nombre, en bar."];
          if (isNaN(hp0)) return ["ambre", "Je n'ai pas lu la HP à l'étape 3 : je ne peux pas comparer."];
          if (!c.proche(x, hp0, c.tol.mesure, L)) return ["ambre", "La HP est passée de " + c.fr(hp0, 1) + " à " + c.fr(x, 1) + " bar : la vanne est-elle vraiment au siège arrière ? Un raccord fuit-il ?"];
          if (!isNaN(mx) && x > mx) return ["ambre", "La HP (" + c.fr(x, 1) + " bar) dépasse le maximum du cadran BP (" + c.fr(mx, 1) + " bar) : j'ouvrirai la vanne BP du manifold très lentement, et j'en parle au professeur."];
          return ["vert", "HP à " + c.fr(x, 1) + " bar, comme avant (" + c.fr(hp0, 1) + ") : la pression est bien piégée dans le flexible." +
            (!isNaN(mx) ? " Elle reste sous le maximum du cadran BP." : "")];
        } },
      arret: "Le professeur a vérifié : vanne HP au siège arrière, presse-étoupe resserré." },

    { id: "bypass", verbe: "J'ouvre le by-pass du manifold", cadre: ["equipment-manifold", "etat-manifold", "bouchon-jaune"], cible: "vanne-man-hp",
      tuyaux: ["blue", "red", "yellow"], etat: ["arriere", "lecture", true, true], aig: "hp",
      regarde: "Les vannes HP et BP du manifold. SERVICE et VIDE restent fermées.",
      fais: "Machine en marche. J'ouvre un peu la vanne HP du manifold, puis la vanne BP, lentement. SERVICE et VIDE restent fermées.",
      voir: "Le flexible HP est relié à l'aspiration : le compresseur commence à l'aspirer.",
      danger: "Jamais d'un coup : le flexible BP recevrait toute la pression d'un bloc.",
      arret: "Le professeur a vérifié : vanne HP au siège arrière, SERVICE et VIDE fermées, avant le by-pass." },

    { id: "egaliser", verbe: "J'attends que le compresseur aspire le flexible HP", cadre: ["equipment-installation", "equipment-manifold"], cible: "equipment-manifold",
      tuyaux: ["blue", "red", "yellow"], etat: ["arriere", "lecture", true, true], aig: "egal",
      regarde: "Les aiguilles HP et BP du manifold.",
      fais: "Le compresseur aspire le flexible HP : les aiguilles descendent jusqu'à la BP de marche (juste avant 0 bar si elle est basse), jamais sous 0. Je lis les deux ensemble, puis je ferme. Sous azote : pas de compresseur, les deux aiguilles s'égalisent.",
      voir: "HP et BP égales, à la BP de marche (ou juste au-dessus de 0 bar).",
      danger: "Si une aiguille passe sous 0 : je ferme le by-pass tout de suite et j'appelle le professeur.",
      controle: { titre: "BP et HP lues ensemble", champs: [{ label: "BP", unite: "bar" }, { label: "HP", unite: "bar" }],
        juger(v, c) {
          const bp = c.nb(v[0]), hp = c.nb(v[1]), bp0 = c.nb(c.releve("lecture", 0)), L = window.GARE.LECTURE, t = c.tol.mesure;
          if (isNaN(bp) || isNaN(hp)) return ["ambre", "J'écris deux nombres, en bar."];
          if (bp < -L || hp < -L) return ["rouge", "STOP : une aiguille est sous 0 (" + c.fr(Math.min(bp, hp), 1) + " bar). Le compresseur a tiré trop loin : je ferme le by-pass tout de suite et j'appelle le professeur."];
          if (!c.proche(bp, hp, t, L)) return ["ambre", "HP et BP diffèrent de " + c.fr(Math.abs(hp - bp), 1) + " bar : le flexible HP n'a pas fini d'être aspiré. J'attends."];
          if (!isNaN(bp0) && bp > bp0 * (1 + t) + L) return ["ambre", "Les aiguilles sont à " + c.fr(bp, 1) + " bar, plus haut que la BP du départ (" + c.fr(bp0, 1) + ") : une vanne de service fuit-elle ?"];
          return bp <= 0.5 ? ["vert", "HP et BP égales à " + c.fr(bp, 1) + " bar : juste avant 0, le flexible HP est aspiré. Je ferme."]
            : ["vert", "HP et BP égales à " + c.fr(bp, 1) + " bar : le flexible HP a rejoint la BP de marche (sous azote : la pression du départ). Je ferme."];
        } } },

    { id: "fermer", verbe: "Je ferme les vannes HP et BP du manifold", cadre: ["equipment-manifold", "etat-manifold", "bouchon-jaune"], cible: "vanne-man-bp",
      tuyaux: ["blue", "red", "yellow"], etat: ["arriere", "lecture", false, false], aig: "egal",
      regarde: "Les vannes HP et BP du manifold.",
      fais: "Je ferme la vanne HP du manifold, puis la vanne BP.",
      voir: "Les 4 vannes du manifold sont fermées ; les aiguilles ne bougent plus." },

    { id: "bp-siege", verbe: "Je ramène la vanne BP au siège arrière", cadre: ["equipment-installation", "equipment-manifold", "etat-machine"], cible: "vanne-c",
      tuyaux: ["blue", "red", "yellow"], etat: ["arriere", "arriere", false, false], aig: "egal",
      regarde: "La vanne de service C, côté BP (aspiration).",
      fais: "Je desserre le presse-étoupe, je ramène le carré au siège arrière (position haute), puis je resserre le presse-étoupe.",
      voir: "Les deux prises de service sont fermées : le manifold est isolé de la machine.",
      danger: "Vannes de service : seulement avec le professeur à côté de moi.",
      controle: { titre: "Les deux aiguilles restent stables ?", type: "ouinon",
        oui: "Aiguilles stables : le manifold est bien isolé. Je peux débrancher.",
        non: "STOP : une aiguille bouge. Une vanne de service n'est pas au siège arrière, ou un raccord fuit. Je ne débranche pas, j'appelle le professeur." } },

    { id: "debrancher", verbe: "Je desserre lentement les raccords", cadre: ["equipment-installation", "equipment-manifold"], cible: "equipment-installation",
      tuyaux: ["yellow"], etat: ["arriere", "arriere", false, false], aig: "egal",
      regarde: "Les raccords des flexibles bleu et rouge sur la machine.",
      fais: "Raccord tourné vers le sol, loin des visages. Je desserre lentement le bleu (BP), puis le rouge (HP), raccord tenu. Sous azote : je desserre quand même lentement, raccord tenu, comme si c'était du fluide.",
      voir: "Rien ne sort : les deux flexibles sont libres, sans pression.",
      danger: "Un jet ou un souffle : je resserre aussitôt le raccord. Je ne desserre jamais face à quelqu'un.",
      controle: { titre: "Rien n'est sorti, aucun jet ?", type: "ouinon",
        oui: "Bon geste : desserrage lent, raccord tenu, rien rejeté à l'air.",
        non: "STOP : un jet ou un souffle. Je resserre le raccord et j'appelle le professeur." },
      arret: "Le professeur a vérifié : aiguilles stables, vannes de service au siège arrière, avant de desserrer." },

    { id: "zero", verbe: "Je vérifie que les aiguilles sont à 0", cadre: ["equipment-manifold", "bouchon-jaune"], cible: "equipment-manifold",
      tuyaux: ["yellow"], etat: ["arriere", "arriere", false, false], aig: "zero",
      regarde: "Les deux aiguilles du manifold, flexibles libres.",
      fais: "Je regarde la BP et la HP : le manifold n'est plus relié à rien.",
      voir: "Les deux aiguilles sont sur 0.",
      controle: { titre: "Les deux aiguilles sont à 0 ?", type: "ouinon",
        oui: "Manifold sans pression : je peux le ranger, après les bouchons.",
        non: "STOP : il reste de la pression dans un flexible. Je ne range pas, j'appelle le professeur." } },

    { id: "bouchons", verbe: "Je remets bouchons et capuchons", cadre: ["equipment-installation", "etat-machine"], cible: "equipment-installation",
      tuyaux: ["yellow"], etat: ["arriere", "arriere", false, false], aig: "zero",
      regarde: "Les prises de service et les carrés des vannes B et C.",
      fais: "Je visse le bouchon sur chaque prise de service. Je remets le capuchon sur chaque carré de manœuvre.",
      voir: "Prises bouchonnées, carrés coiffés : les bouchons font l'étanchéité finale.",
      controle: { titre: "Je coche ce que j'ai remis", type: "coches", items: ["bouchon de la prise HP", "bouchon de la prise BP", "capuchon de la vanne HP", "capuchon de la vanne BP"],
        ok: "Quatre protections remises.", manque: "Il manque une coche : un bouchon oublié, c'est une fuite lente." } },

    { id: "etancheite", verbe: "Je contrôle l'étanchéité", cadre: ["equipment-installation", "etat-machine"], cible: "equipment-installation",
      tuyaux: ["yellow"], etat: ["arriere", "arriere", false, false], aig: "zero",
      regarde: "Les presse-étoupes et les bouchons des vannes B et C.",
      fais: "Presse-étoupes serrés. Je passe le détecteur ou la solution moussante sur chaque presse-étoupe et chaque bouchon. Sous azote : solution moussante, le détecteur ne sent pas l'azote.",
      voir: "Aucun signal, aucune bulle.",
      controle: { titre: "Aucun signal au détecteur, aucune bulle ?", type: "ouinon",
        oui: "Étanche : la machine est rendue comme je l'ai trouvée.",
        non: "STOP : fuite. Je resserre, je vérifie le bouchon, je recommence ; sinon j'appelle le professeur." } },

    { id: "ranger", verbe: "Je range et je remets tout comme je l'ai trouvé", cadre: ["equipment-manifold", "bouchon-jaune"], cible: "equipment-manifold",
      tuyaux: ["yellow"], etat: ["arriere", "arriere", false, false], aig: "zero",
      regarde: "Le manifold, ses flexibles, le jaune bouché, puis l'état des lieux du départ.",
      fais: "Jaune bouché, 4 vannes fermées, aiguilles à 0. J'enroule les flexibles sans pli serré, je range le manifold. Je compare la machine avec l'état des lieux.",
      voir: "Manifold bouché et rangé, machine rendue comme je l'ai trouvée.",
      controle: { titre: "Je coche ce que j'ai remis comme au départ", type: "coches",
        items: ["vannes de service au siège arrière", "2 bouchons de prise et 2 capuchons de tige remis et serrés", "aucun signal, aucune bulle, aucune fuite", "manifold bouché, 4 vannes fermées, aiguilles à 0", "rien d'abîmé, rien qui manque"],
        ok: "Tout est comme je l'ai trouvé : le poste est rangé.",
        manque: "Il manque une coche : je ne range pas avant d'avoir tout vérifié." } }
  ],

  /* valeurs du contrôle automatique (_moule/qa.mjs) : toutes doivent donner un verdict vert */
  test: {
    machine: { bpmax: "24" },
    charge: { lecture: ["2,0", "14,0"], "hp-siege": ["14,0"], egaliser: ["0,2", "0,2"] }
  }
};
