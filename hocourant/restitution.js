/* ============================================================
   inerWeb HoCourant — codes de mission et codes de restitution

   PRINCIPE (décisions F. Henninot, 25/08/2026) : c'est l'ENSEIGNANT
   qui distribue l'identité ET l'objectif. Il génère une liste de codes
   courts — « B0-K7-3M » — les donne à ses élèves, et garde seul la
   feuille qui dit quel code va à quel élève.

   Un code de mission dit trois choses :
     B0   le niveau d'habilitation VISÉ, accordé par l'enseignant ;
     K7   l'élève, connu de l'enseignant seul ;
     3M   la semaine d'échéance — « B0 avant les vacances de Noël ».

   Ce n'est pas un niveau scolaire : le même système sert un lycée, un
   CFA, un centre de formation ou une entreprise. L'élève saisit son
   code une fois ; l'application borne son parcours sur la cible,
   affiche l'échéance, et reporte le code dans chaque code de
   restitution — scellé cette fois par un contrôle d'intégrité.

   LIMITE ASSUMÉE : le contrôle décourage la modification naïve, il ne
   vaut pas preuve — les évaluations qui comptent se passent en classe.
   ============================================================ */

const RESTITUTION = (function () {
  "use strict";

  /* alphabet sans caractères ambigus : ni O/0, ni I/L/1 */
  const ALPHA = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"; // base 31
  const VERSION = 2;
  const EPOQUE = Date.UTC(2026, 0, 1);
  const SEMAINE = 7 * 86400000;
  const JOURS_MAX = 5000;      // ~13 ans de validité du format
  const BORNE_SCORE = 32;      // score et total < 32 (un test en compte 15)
  const LG_CORPS = 6;
  const LG_CONTROLE = 3;

  /* sigles de cible — l'ordre suit les paliers P0…P4 de programme.js */
  const CIBLES = ["S0", "B0", "BS", "B1V", "BR"];

  function enBase(n) {
    let s = "";
    n = Math.floor(Math.abs(n));
    do { s = ALPHA[n % ALPHA.length] + s; n = Math.floor(n / ALPHA.length); } while (n > 0);
    return s;
  }
  function depuisBase(s) {
    let n = 0;
    for (const c of s) {
      const i = ALPHA.indexOf(c);
      if (i < 0) return null;
      n = n * ALPHA.length + i;
    }
    return n;
  }
  /* condensé djb2 sur code de mission + charge utile */
  function condense(texte) {
    let h = 5381;
    for (let i = 0; i < texte.length; i++) h = ((h * 33) ^ texte.charCodeAt(i)) >>> 0;
    return enBase(h % (ALPHA.length ** LG_CONTROLE)).padStart(LG_CONTROLE, ALPHA[0]);
  }

  /* Le noyau sert au contrôle : sans tiret ni espace, pour qu'un code
     recopié « B0K73M » au lieu de « B0-K7-3M » reste valide. */
  function noyau(code) {
    return String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  }
  function nettoyerMission(code) {
    return String(code || "").toUpperCase().replace(/[^A-Z0-9-]/g, "").replace(/^-+|-+$/g, "").slice(0, 14);
  }

  /* ---------- échéances ---------- */
  /* granularité à la semaine, pour tenir sur deux caractères : l'échéance
     est arrondie EN AVANT (jamais avant la date demandée), au dernier jour
     de la période de 7 jours en cours. L'enseignant voit la date exacte
     affichée avant d'imprimer sa feuille. */
  function semaineDe(date) {
    return Math.max(0, Math.min(ALPHA.length ** 2 - 1, Math.floor((date.getTime() - EPOQUE) / SEMAINE)));
  }
  function dateDeSemaine(sem) {
    return new Date(EPOQUE + (sem + 1) * SEMAINE - 86400000);
  }
  const enDateFr = (d) =>
    String(d.getUTCDate()).padStart(2, "0") + "/" + String(d.getUTCMonth() + 1).padStart(2, "0") + "/" + d.getUTCFullYear();

  /* ---------- génération d'un lot de missions (côté enseignant) ---------- */
  function genererMissions(cibleIdx, dateEcheance, nombre) {
    const cible = CIBLES[cibleIdx] || CIBLES[1];
    const sem = semaineDe(dateEcheance instanceof Date ? dateEcheance : new Date(dateEcheance));
    const bloc = enBase(sem).padStart(2, ALPHA[0]);
    const n = Math.max(1, Math.min(60, Math.floor(nombre) || 0));
    const vus = new Set();
    const liste = [];
    let gardeFou = 0;
    while (liste.length < n && gardeFou++ < 5000) {
      const eleve = ALPHA[Math.floor(Math.random() * ALPHA.length)] +
                    ALPHA[Math.floor(Math.random() * ALPHA.length)];
      if (vus.has(eleve)) continue;
      vus.add(eleve);
      liste.push(cible + "-" + eleve + "-" + bloc);
    }
    liste.sort();
    return { codes: liste, echeance: dateDeSemaine(sem), cible };
  }

  /* ---------- lecture d'un code de mission (côté élève) ---------- */
  function lireMission(code) {
    const propre = nettoyerMission(code);
    const parts = propre.split("-").filter(Boolean);
    if (parts.length !== 3) return null;
    const cibleIdx = CIBLES.indexOf(parts[0]);
    if (cibleIdx < 0) return null;
    if (!/^[0-9A-Z]{2}$/.test(parts[1])) return null;
    const sem = depuisBase(parts[2]);
    if (sem === null || parts[2].length !== 2) return null;
    const echeance = dateDeSemaine(sem);
    /* vraisemblance : une échéance ne se situe ni avant l'époque ni au-delà de 6 ans */
    if (echeance.getTime() > EPOQUE + 6 * 365 * 86400000) return null;
    return { code: propre, cible: parts[0], cibleIdx, eleve: parts[1], echeance, echeanceFr: enDateFr(echeance) };
  }

  /* ---------- code de restitution ---------- */
  function encoder(mission, filiereIdx, palierIdx, score, total) {
    const d = new Date();
    const jours = Math.max(0, Math.min(JOURS_MAX - 1,
      Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - EPOQUE) / 86400000)));
    const s = Math.max(0, Math.min(BORNE_SCORE - 1, score));
    const t = Math.max(1, Math.min(BORNE_SCORE - 1, total));
    const nombre =
      ((((VERSION * 3 + filiereIdx) * 5 + palierIdx) * BORNE_SCORE + s) * BORNE_SCORE + t) * JOURS_MAX + jours;
    const corps = enBase(nombre).padStart(LG_CORPS, ALPHA[0]);
    const mis = nettoyerMission(mission);
    const bloc = "HAB-" + corps.slice(0, 3) + "-" + corps.slice(3, 6) + "-" + condense(noyau(mis) + corps);
    return mis ? mis + "-" + bloc : bloc;
  }

  function decoder(saisie) {
    const brut = String(saisie || "").toUpperCase();
    const i = brut.lastIndexOf("HAB");
    if (i < 0) return { valide: false, motif: "format" };
    const mission = nettoyerMission(brut.slice(0, i));
    const reste = brut.slice(i).replace(/[^A-Z0-9]/g, "");
    if (reste.length !== 3 + LG_CORPS + LG_CONTROLE) return { valide: false, motif: "format" };
    const corps = reste.slice(3, 3 + LG_CORPS);
    const controle = reste.slice(3 + LG_CORPS);
    if (condense(noyau(mission) + corps) !== controle) return { valide: false, motif: "controle" };
    let n = depuisBase(corps);
    if (n === null) return { valide: false, motif: "format" };
    const jours = n % JOURS_MAX; n = Math.floor(n / JOURS_MAX);
    const total = n % BORNE_SCORE; n = Math.floor(n / BORNE_SCORE);
    const score = n % BORNE_SCORE; n = Math.floor(n / BORNE_SCORE);
    const palierIdx = n % 5; n = Math.floor(n / 5);
    const filiereIdx = n % 3; n = Math.floor(n / 3);
    if (n !== VERSION || total === 0 || score > total) return { valide: false, motif: "coherence" };
    const d = new Date(EPOQUE + jours * 86400000);
    return {
      valide: true, mission, detail: lireMission(mission), filiereIdx, palierIdx, score, total,
      jour: d.getUTCDate(), mois: d.getUTCMonth() + 1, annee: d.getUTCFullYear(),
    };
  }

  return { encoder, decoder, genererMissions, lireMission, nettoyerMission, enDateFr, CIBLES };
})();
