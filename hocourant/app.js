/* ============================================================
   inerWeb HoCourant — application
   Statique, sans compte, sans réseau : la progression vit dans le
   navigateur de l'élève (localStorage). Aucune donnée personnelle.

   L'identité vient d'un CODE DE MISSION distribué par l'enseignant
   (« B0-K7-3M » : cible, élève, échéance). La cible borne l'affichage
   par défaut mais ne plafonne rien : un élève motivé continue jusqu'à
   BR — voir vueParcours(), section « pour aller plus loin ».
   ============================================================ */
(function () {
  "use strict";

  /* ---------- état ---------- */
  const CLE_ETAT = "hocourant-etat-v1";
  let etat = { filiere: null, mission: null, lus: {}, decouvertes: {}, tests: {} };
  try {
    const brut = localStorage.getItem(CLE_ETAT);
    if (brut) etat = Object.assign(etat, JSON.parse(brut));
  } catch (e) { /* stockage indisponible : la session reste possible */ }
  function sauver() {
    try { localStorage.setItem(CLE_ETAT, JSON.stringify(etat)); } catch (e) { /* privé/plein : tant pis */ }
  }

  /* ---------- accès aux données ---------- */
  const parId = (liste) => Object.fromEntries(liste.map((x) => [x.id, x]));
  const MOD = parId(MODULES);
  const PAL = parId(PALIERS);
  const FIL = parId(FILIERES);
  const themeDe = (q) => q.th || MOD[q.m].theme;
  const questionsDuModule = (id) => QUESTIONS.filter((q) => q.m === id);
  const modulesDuPalier = (p) => PAL[p].modules.map((id) => MOD[id]);
  const indexPalier = (p) => PALIERS.findIndex((x) => x.id === p);
  const indexFiliere = (f) => FILIERES.findIndex((x) => x.id === f);

  const mission = () => (etat.mission ? RESTITUTION.lireMission(etat.mission) : null);
  /* la cible vient de la mission ; à défaut, du bornage de la filière */
  function cibleIdx() {
    const m = mission();
    if (m) return m.cibleIdx;
    return etat.filiere ? indexPalier(FIL[etat.filiere].palierCible) : PALIERS.length - 1;
  }
  /* le palier le plus haut réellement validé (≥ 70 % à son test) */
  function palierAtteint() {
    let haut = -1;
    PALIERS.forEach((p, i) => { if (etat.tests[p.id] && etat.tests[p.id].reussi) haut = Math.max(haut, i); });
    return haut;
  }
  function joursRestants(d) {
    return Math.ceil((d.getTime() - Date.now()) / 86400000);
  }

  function melanger(tableau) {
    const t = tableau.slice();
    for (let i = t.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [t[i], t[j]] = [t[j], t[i]];
    }
    return t;
  }

  /* ---------- rendu ---------- */
  const racine = document.getElementById("vue");
  function rendre(html, titreDoc) {
    racine.innerHTML = bandeauPrototype + html;
    document.title = (titreDoc ? titreDoc + " · " : "") + "inerWeb HoCourant";
    const h1 = racine.querySelector("h1");
    if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
    window.scrollTo(0, 0);
  }
  const seq = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  function entete(retour, retourLibelle) {
    const m = mission();
    return '<header class="entete">' +
      '<div class="titre-appli"><strong>Habilitation électrique</strong>' +
      "<small>" + (m ? "mission " + seq(m.code) : "s'entraîner en autonomie · aucune donnée personnelle") + "</small></div>" +
      (retour ? '<button class="fil-retour" data-aller="' + retour + '">← ' + retourLibelle + "</button>" : "") +
      "</header>";
  }

  /* Bandeau d'état, sur chaque écran : cette version n'est pas validée.
     Trois canaux (charte § 4) : couleur ambre + trait pointillé + le mot. */
  const bandeauPrototype =
    '<div class="prototype"><span class="proto-mot">PROTOTYPE</span> Version de démonstration, ' +
    "en cours de relecture métier. Les contenus, les valeurs chiffrées et les repères ne sont pas " +
    "encore validés : ne pas s'en servir comme référence pour une opération réelle.</div>";

  const pied =
    '<footer class="pied"><p><strong>Ce que mesure cette application :</strong> une habilitabilité — ' +
    "l'aptitude théorique à être habilité. Elle ne délivre jamais un titre : l'avis appartient au formateur " +
    "après l'évaluation pratique, le titre à l'employeur (Code du travail, art. R4544-10).</p>" +
    "<p>Repères métier : NF C 18-510 (citée, jamais reproduite) · INRS ED 6127 et ED 6109 · " +
    "référentiels officiels des diplômes. Les distances et limites applicables sont celles enseignées " +
    "pour l'installation concernée.</p></footer>";

  /* ---------- vue : accueil ---------- */
  function vueAccueil() {
    const m = mission();
    rendre(
      entete(null) +
      "<h1>Préparer son habilitation électrique</h1>" +
      '<div class="carte accent"><p><strong>Comment ça marche ?</strong> Ton enseignant te donne un ' +
      "<strong>code de mission</strong> — par exemple <span class=\"badge badge-code\">B0-K7-3M</span> : " +
      "le niveau à obtenir, ton code personnel, la date limite. Tu le saisis une fois, et l'application " +
      "retient où tu en es. Aucun compte, aucune donnée personnelle : ton enseignant est le seul à savoir " +
      "quel code est le tien.</p></div>" +
      (m
        ? '<div class="carte"><h2>Ta mission en cours</h2><p><span class="badge badge-palier">' + seq(m.cible) +
          '</span> à obtenir avant le <strong>' + seq(m.echeanceFr) + "</strong> · code " +
          '<span class="badge badge-code">' + seq(m.code) + "</span></p>" +
          '<div class="btn-ligne"><button class="btn btn-primaire" data-aller="parcours">Reprendre mon parcours →</button>' +
          '<button class="btn btn-secondaire" data-aller="code">Changer de code</button></div></div>'
        : '<div class="btn-ligne"><button class="btn btn-primaire" data-aller="code">J\'ai un code de mission →</button>' +
          '<button class="btn btn-secondaire" data-aller="libre">Découvrir sans code</button></div>') +
      '<div class="carte"><h2>Le livret papier</h2>' +
      "<p>Le support de cours complet : dix chapitres, quatre-vingts questions, les activités " +
      "à faire en atelier et le lexique. Sa page de garde porte ton nom — remplis-la, un livret " +
      "perdu revient à son propriétaire.</p>" +
      '<div class="btn-ligne"><a class="btn btn-secondaire" href="livret/inerWeb.fr-HoCourant-Livret-eleve-A5.pdf" download>' +
      "Télécharger le livret (PDF, 110 pages, 11,5 Mo)</a></div>" +
      '<div class="enc enc-note"><span class="enc-mot">À imprimer en A5</span>' +
      "<p>En couleur comme en noir et blanc : le livret est fait pour les deux. Le corrigé " +
      "est réservé au formateur et ne se télécharge pas ici.</p></div></div>" +
      '<div class="carte"><h2>Espace enseignant</h2>' +
      "<p>Générer les codes d'un groupe, ou lire le code qu'un élève rapporte.</p>" +
      '<div class="btn-ligne"><button class="btn btn-secondaire" data-aller="lot">Générer des codes</button>' +
      '<button class="btn btn-secondaire" data-aller="verif">Vérifier un code</button></div></div>' +
      pied,
      "Accueil"
    );
  }

  /* ---------- vue : saisie du code de mission ---------- */
  function vueCode(erreur) {
    rendre(
      entete("accueil", "Accueil") +
      "<h1>Ton code de mission</h1>" +
      '<div class="carte"><p>Recopie le code que ton enseignant t\'a donné. Il ressemble à ' +
      '<span class="badge badge-code">B0-K7-3M</span>.</p>' +
      '<p><input class="champ-code" id="champ-mission" autocomplete="off" spellcheck="false" ' +
      'placeholder="B0-K7-3M" value="' + seq(etat.mission || "") + '"></p>' +
      (erreur ? '<p class="verif-invalide">✘ ' + seq(erreur) + "</p>" : "") +
      '<div class="btn-ligne"><button class="btn btn-primaire" data-valider-mission="1">Valider mon code</button>' +
      '<button class="btn btn-secondaire" data-aller="libre">Continuer sans code</button></div></div>' +
      '<div class="enc enc-note"><span class="enc-mot">Sans code, c\'est possible aussi</span>' +
      "<p>Tu peux tout travailler librement. Mais le résultat de tes tests ne pourra pas être rattaché " +
      "à toi : ton enseignant ne saura pas que c'est le tien.</p></div>" + pied,
      "Mon code"
    );
    const champ = document.getElementById("champ-mission");
    if (champ) champ.focus();
  }
  function validerMission() {
    const saisie = document.getElementById("champ-mission").value;
    const m = RESTITUTION.lireMission(saisie);
    if (!m) return vueCode("Ce code n'est pas reconnu. Vérifie chaque caractère, tirets compris.");
    etat.mission = m.code;
    sauver();
    if (!etat.filiere) return vueFiliere();
    vueParcours();
  }

  /* ---------- vue : choix de filière (ancrage référentiel) ---------- */
  function vueFiliere() {
    let cartes = "";
    for (const f of FILIERES) {
      cartes +=
        '<button class="carte-filiere" data-filiere="' + f.id + '">' +
        '<span class="badge badge-cible">' + seq(PAL[f.palierCible].sigle) + " visé par le diplôme</span>" +
        "<h2>" + seq(f.nom) + "</h2>" +
        '<span class="long">' + seq(f.long) + "</span>" +
        "<span>" + seq(f.objectif) + "</span>" +
        "</button>";
    }
    const m = mission();
    rendre(
      entete("accueil", "Accueil") +
      "<h1>Ta formation</h1>" +
      '<div class="carte accent"><p>Cela sert uniquement à afficher les codes de ton référentiel à côté de ton travail.' +
      (m ? " Ton objectif reste celui de ta mission : <strong>" + seq(m.cible) + "</strong>." : "") + "</p></div>" +
      '<div class="grille-filieres">' + cartes + "</div>" + pied,
      "Ma formation"
    );
  }

  /* ---------- vue : parcours ---------- */
  function vueParcours() {
    if (!etat.filiere) return vueFiliere();
    const f = FIL[etat.filiere];
    const m = mission();
    const iCible = cibleIdx();
    const atteint = palierAtteint();

    let bandeau = "";
    if (m) {
      const jours = joursRestants(m.echeance);
      const fait = atteint >= m.cibleIdx;
      bandeau =
        '<div class="carte accent"><h2>Ma mission</h2>' +
        "<p>Obtenir <span class=\"badge badge-palier\">" + seq(m.cible) + "</span> avant le <strong>" +
        seq(m.echeanceFr) + "</strong>" +
        (fait ? ' — <span class="badge badge-ok">✔ objectif atteint</span>'
              : jours >= 0 ? " · il te reste <strong>" + jours + " jour" + (jours > 1 ? "s" : "") + "</strong>"
                           : " · <strong>échéance dépassée de " + (-jours) + " jour" + (-jours > 1 ? "s" : "") + "</strong>") +
        "</p>" +
        "<p>Niveau validé pour l'instant : <strong>" +
        (atteint >= 0 ? seq(PALIERS[atteint].sigle) : "aucun palier encore validé") + "</strong>. " +
        "Code à rapporter : <span class=\"badge badge-code\">" + seq(m.code) + "</span></p></div>";
    }

    let blocs = "", plusLoin = "";
    PALIERS.forEach((p, i) => {
      const auDela = i > iCible;
      let modules = "";
      for (const mo of modulesDuPalier(p.id)) {
        const d = etat.decouvertes[mo.id];
        const lu = etat.lus[mo.id];
        modules +=
          '<div class="carte-module">' +
          "<strong>" + seq(mo.nom) + "</strong>" +
          '<span class="etat ' + (d ? "etat-fait" : "etat-afaire") + '">' +
          (d ? "✔ découvert · " + d.total + " questions trouvées"
             : (lu ? "fiche lue · " : "") + "≈ " + mo.duree + " min") +
          "</span>" +
          '<div class="module-actions">' +
          '<button class="btn btn-primaire" data-decouvrir="' + mo.id + '">' + (d ? "Refaire" : "Découvrir") + "</button>" +
          '<button class="btn btn-secondaire" data-fiche="' + mo.id + '">Fiche</button>' +
          "</div></div>";
      }
      const t = etat.tests[p.id];
      const badgeTest = t
        ? (t.reussi ? '<span class="badge badge-ok">✔ palier atteint · ' + t.score + "/" + t.total + "</span>"
                    : '<span class="badge badge-cible">à retravailler · ' + t.score + "/" + t.total + "</span>")
        : "";
      const bloc =
        '<section class="palier">' +
        '<div class="palier-tete"><span class="badge badge-palier">' + seq(p.sigle) + "</span><h2>" + seq(p.nom) + "</h2>" + badgeTest + "</div>" +
        '<p class="palier-resume">' + seq(p.resume) + "</p>" +
        '<div class="liste-modules">' + modules +
        '<button class="carte-module carte-test-palier" data-test="' + p.id + '">' +
        "<strong>Test du palier " + seq(p.sigle) + "</strong>" +
        '<span class="etat etat-afaire">15 questions · 70 % pour valider · code à rapporter</span>' +
        "</button></div></section>";
      if (auDela) plusLoin += bloc; else blocs += bloc;
    });

    let codes = "";
    for (const c of f.codes) codes += '<tr><td class="code">' + seq(c.code) + "</td><td>" + seq(c.libelle) + "</td></tr>";

    rendre(
      entete("accueil", "Accueil") +
      "<h1>Mon parcours</h1>" + bandeau + blocs +
      (plusLoin
        ? '<div class="enc enc-note"><span class="enc-mot">Pour aller plus loin</span>' +
          "<p>Ces paliers dépassent ton objectif actuel. Rien ne t'empêche de les travailler et de passer " +
          "leurs tests : le niveau que tu vises n'est pas un plafond. Le code que tu rapporteras dira jusqu'où " +
          "tu es allé.</p></div>" + plusLoin
        : "") +
      '<section class="carte bloc-referentiel"><h2>Ce que ce travail couvre dans ton référentiel</h2>' +
      "<p>" + seq(f.noteReferentiel) + "</p>" +
      '<table><thead><tr><th scope="col">Code</th><th scope="col">Libellé officiel</th></tr></thead><tbody>' + codes + "</tbody></table>" +
      '<div class="btn-ligne"><button class="btn btn-secondaire" data-aller="filiere">Changer de formation</button></div></section>' +
      pied,
      "Mon parcours"
    );
  }

  /* ---------- la fiche : la ressource, consultable à tout moment ---------- */
  /* Elle n'est jamais un passage obligé : on peut lire d'abord (utile en
     lecture fragile) ou chercher d'abord — c'est la découverte qui est
     proposée par défaut. */
  function ficheHtml(id) {
    const ecrans = (COURS[id] || { ecrans: [] }).ecrans;
    let html = "";
    for (const e of ecrans) {
      const enc = { cle: ["enc-cle", "🔑 La clé"], piege: ["enc-piege", "⚠ Le piège"] }[e.type];
      html += enc
        ? '<div class="enc ' + enc[0] + '"><span class="enc-mot">' + enc[1] + "</span>" + e.html + "</div>"
        : '<div class="carte"><h2>' + seq(e.titre) + "</h2>" + e.html + "</div>";
    }
    return html;
  }
  function vueFiche(id) {
    const mo = MOD[id];
    etat.lus[id] = true; sauver();
    rendre(
      entete("parcours", "Retour au parcours") +
      '<div class="palier-tete"><span class="badge badge-palier">' + seq(PAL[mo.palier].sigle) + "</span><h1>" + seq(mo.nom) + "</h1></div>" +
      '<p class="q-compteur">La fiche de ce module — à lire d\'un trait, ou à consulter quand une question résiste.</p>' +
      ficheHtml(id) +
      '<div class="btn-ligne"><button class="btn btn-primaire" data-decouvrir="' + id + '">Passer aux questions →</button>' +
      '<button class="btn btn-secondaire" data-aller="parcours">Retour au parcours</button></div>' + pied,
      mo.nom
    );
  }

  /* ---------- la découverte : on apprend en cherchant ---------- */
  /* Boucle : question → réponse → l'information arrive au moment où elle
     manque. Juste : on confirme et on avance. Faux : remédiation, la fiche
     s'ouvre sur place, et la question revient plus tard dans la file. Le
     module n'est « découvert » que lorsque chaque question a été réussie. */
  let dec = null;
  function demarrerDecouverte(id) {
    const file = melanger(questionsDuModule(id)).map((q) => ({ q, options: melanger([q.ok].concat(q.nok)) }));
    dec = { module: id, file, total: file.length, reussies: 0, essais: 0, repondu: false, aRevoir: 0 };
    vueDecouverte();
  }
  function vueDecouverte() {
    const mo = MOD[dec.module];
    const item = dec.file[0];
    if (!item) return finDecouverte();
    let options = "";
    item.options.forEach((o, i) => { options += '<button class="q-option" data-option="' + i + '">' + seq(o) + "</button>"; });
    let jauge = "";
    for (let i = 0; i < dec.total; i++) jauge += '<span class="pastille' + (i < dec.reussies ? " vue" : "") + '"></span>';
    rendre(
      entete("parcours", "Quitter") +
      '<div class="palier-tete"><span class="badge badge-palier">' + seq(PAL[mo.palier].sigle) + "</span><h1>" + seq(mo.nom) + "</h1></div>" +
      '<div class="progression-module"><div class="pastilles">' + jauge + "</div>" +
      "<span>" + dec.reussies + " / " + dec.total + " trouvées</span></div>" +
      '<div class="carte"><p class="q-compteur">Cherche d\'abord. Si tu ne sais pas, réponds quand même : ' +
      "l'explication et la fiche arrivent juste après.</p>" +
      situationHtml(item.q) +
      '<p class="q-enonce">' + seq(item.q.q) + "</p>" +
      '<div class="q-options">' + options + "</div>" +
      '<div id="q-suite"></div></div>' +
      '<div class="btn-ligne sans-impression"><button class="btn btn-secondaire" data-fiche="' + dec.module + '">Consulter la fiche</button></div>' +
      pied,
      mo.nom
    );
  }
  function repondreDecouverte(i) {
    if (dec.repondu) return;
    dec.repondu = true;
    dec.essais++;
    const item = dec.file[0];
    const juste = item.options[i] === item.q.ok;
    racine.querySelectorAll(".q-option").forEach((b, k) => {
      b.disabled = true;
      const estBonne = item.options[k] === item.q.ok;
      if (estBonne) { b.classList.add("juste"); b.textContent = "✔ Juste — " + item.options[k]; }
      else if (k === i) { b.classList.add("faux"); b.textContent = "✘ Faux — " + item.options[k]; }
    });

    if (juste) {
      dec.reussies++;
      dec.file.shift();
      document.getElementById("q-suite").innerHTML =
        '<div class="q-explication"><span class="mot">✔ Trouvé.</span> ' + seq(item.q.exp) + "</div>" +
        '<div class="btn-ligne"><button class="btn btn-primaire" data-dec-suite="1">' +
        (dec.file.length ? "Question suivante →" : "Terminer ce module →") + "</button></div>";
    } else {
      dec.aRevoir++;
      /* la question repart en fin de file : on ne quitte pas un point non compris */
      dec.file.push(dec.file.shift());
      document.getElementById("q-suite").innerHTML =
        '<div class="enc enc-piege"><span class="enc-mot">⚠ À revoir</span>' +
        "<p>La bonne réponse : <strong>" + seq(item.q.ok) + "</strong>.</p><p>" + seq(item.q.exp) + "</p>" +
        sceneHtml(item.q, "scene schema") + "</div>" +
        '<details class="remediation" open><summary>La fiche qui répond à cette question</summary>' +
        ficheHtml(dec.module) + "</details>" +
        '<div class="btn-ligne"><button class="btn btn-primaire" data-dec-suite="1">J\'ai compris, je continue →</button></div>';
      document.querySelector(".remediation").scrollIntoView({ block: "start" });
    }
  }
  function suiteDecouverte() {
    dec.repondu = false;
    if (dec.file.length) return vueDecouverte();
    finDecouverte();
  }
  function finDecouverte() {
    const mo = MOD[dec.module];
    etat.decouvertes[dec.module] = { total: dec.total, essais: dec.essais, aRevoir: dec.aRevoir };
    sauver();
    const dupremier = dec.essais === dec.total;
    rendre(
      entete("parcours", "Retour au parcours") +
      "<h1>Module découvert — " + seq(mo.nom) + "</h1>" +
      '<div class="carte score-final score-ok"><p class="gros">' + dec.total + " / " + dec.total + "</p>" +
      "<p>✔ Tu as trouvé toutes les réponses de ce module." +
      (dupremier ? " Et du premier coup, sur chacune."
                 : " Il t'a fallu " + dec.essais + " essais : les points repassés sont ceux qui comptent le plus.") + "</p></div>" +
      '<div class="btn-ligne">' +
      '<button class="btn btn-secondaire" data-fiche="' + mo.id + '">Relire la fiche</button>' +
      '<button class="btn btn-secondaire" data-decouvrir="' + mo.id + '">Recommencer</button>' +
      '<button class="btn btn-primaire" data-aller="parcours">Continuer →</button>' +
      "</div>" + pied,
      "Module découvert"
    );
  }

  /* ---------- test de palier : correction en fin ---------- */
  let test = null;
  function tirerTest(palierId) {
    const iPal = indexPalier(palierId);
    const poolCourant = QUESTIONS.filter((q) => MOD[q.m].palier === palierId);
    const poolRappel = QUESTIONS.filter((q) => indexPalier(MOD[q.m].palier) < iPal);
    const N = REGLES_TEST.nbQuestions;
    const nbRappel = poolRappel.length ? Math.round(N * REGLES_TEST.partRappelSpirale) : 0;

    let tirage = melanger(poolCourant).slice(0, N - nbRappel).concat(melanger(poolRappel).slice(0, nbRappel));

    /* garantir la part des thèmes critiques (zones + limites) */
    const minCritiques = Math.ceil(N * REGLES_TEST.partThemesCritiques);
    const estCritique = (q) => REGLES_TEST.themesCritiques.includes(themeDe(q));
    let manque = minCritiques - tirage.filter(estCritique).length;
    if (manque > 0) {
      const dedans = new Set(tirage.map((q) => q.q));
      const reserves = melanger(poolCourant.concat(poolRappel).filter((q) => estCritique(q) && !dedans.has(q.q)));
      for (const r of reserves) {
        if (manque <= 0) break;
        const iRemp = tirage.findIndex((q) => !estCritique(q));
        if (iRemp < 0) break;
        tirage[iRemp] = r; manque--;
      }
    }
    return melanger(tirage).map((q) => ({ q, options: melanger([q.ok].concat(q.nok)), reponse: null }));
  }

  function demarrerTest(palierId) {
    if (!etat.filiere) return vueFiliere();
    test = { palier: palierId, tirage: tirerTest(palierId), idx: 0 };
    vueQuestionTest();
  }
  function vueQuestionTest() {
    const p = PAL[test.palier];
    const item = test.tirage[test.idx];
    let options = "";
    item.options.forEach((o, i) => { options += '<button class="q-option" data-test-option="' + i + '">' + seq(o) + "</button>"; });
    rendre(
      entete("parcours", "Abandonner le test") +
      '<div class="palier-tete"><span class="badge badge-palier">' + seq(p.sigle) + "</span><h1>Test — " + seq(p.symboles) + "</h1></div>" +
      '<div class="carte"><p class="q-compteur">Question ' + (test.idx + 1) + " / " + test.tirage.length +
      " · la correction arrive à la fin du test</p>" +
      situationHtml(item.q) +
      '<p class="q-enonce">' + seq(item.q.q) + "</p>" +
      '<div class="q-options">' + options + "</div></div>" + pied,
      "Test " + p.sigle
    );
  }
  function repondreTest(i) {
    test.tirage[test.idx].reponse = i;
    if (test.idx < test.tirage.length - 1) { test.idx++; vueQuestionTest(); } else { finirTest(); }
  }
  function finirTest() {
    const p = PAL[test.palier];
    const m = mission();
    let score = 0;
    const parModule = {};
    let correction = "";
    test.tirage.forEach((item, n) => {
      const choisie = item.options[item.reponse];
      const juste = choisie === item.q.ok;
      if (juste) score++; else parModule[item.q.m] = (parModule[item.q.m] || 0) + 1;
      correction +=
        '<div class="carte"><p class="q-compteur">Question ' + (n + 1) + "</p>" +
        '<p class="q-enonce">' + seq(item.q.q) + "</p>" +
        (juste
          ? '<p class="verif-valide">✔ Juste — ' + seq(choisie) + "</p>"
          : '<p class="verif-invalide">✘ Ta réponse — ' + seq(choisie) + '</p><p class="verif-valide">✔ La bonne — ' + seq(item.q.ok) + "</p>") +
        "<p>" + seq(item.q.exp) + "</p></div>";
    });
    const total = test.tirage.length;
    const reussi = score >= Math.ceil(total * REGLES_TEST.seuilReussite);
    const code = RESTITUTION.encoder(etat.mission || "", indexFiliere(etat.filiere), indexPalier(test.palier), score, total);
    etat.tests[test.palier] = { score, total, reussi, code, date: new Date().toISOString().slice(0, 10) };
    sauver();

    let arevoir = "";
    const modulesRates = Object.entries(parModule).sort((a, b) => b[1] - a[1]);
    if (modulesRates.length) {
      arevoir = "<h2>À retravailler d'abord</h2><ul>" +
        modulesRates.map(([mid, n]) => "<li><strong>" + seq(MOD[mid].nom) + "</strong> — " + n + " erreur" + (n > 1 ? "s" : "") + "</li>").join("") + "</ul>";
    }

    let motMission = "";
    if (m && reussi) {
      if (indexPalier(test.palier) >= m.cibleIdx) {
        motMission = '<div class="enc enc-cle"><span class="enc-mot">🔑 Mission remplie</span><p>Tu as validé ' +
          seq(PAL[test.palier].sigle) + ", le niveau demandé" +
          (indexPalier(test.palier) > m.cibleIdx ? " — et même au-delà de ta mission" : "") +
          ". Rapporte ton code à ton enseignant. La suite se joue en pratique, avec lui.</p></div>";
      } else {
        motMission = '<div class="enc enc-note"><span class="enc-mot">Sur la bonne route</span><p>Palier validé. ' +
          "Ton objectif reste <strong>" + seq(m.cible) + "</strong> avant le " + seq(m.echeanceFr) + ".</p></div>";
      }
    }

    rendre(
      entete("parcours", "Retour au parcours") +
      "<h1>Résultat du test — " + seq(p.sigle) + "</h1>" +
      '<div class="carte score-final ' + (reussi ? "score-ok" : "score-ko") + '">' +
      '<p class="gros">' + score + " / " + total + "</p>" +
      "<p>" + (reussi
        ? "✔ Palier atteint : au moins 70 % de bonnes réponses."
        : "✘ Palier non atteint (seuil : 70 %). Reprends les modules ci-dessous puis repasse le test : le tirage change à chaque fois.") + "</p>" +
      "<p>Ton code à rapporter à ton enseignant :</p>" +
      '<p><span class="code-restitution">' + seq(code) + "</span></p>" +
      '<p class="q-compteur">' + (etat.mission
        ? "Ce code contient ta mission, le palier passé, le score et la date. Il ne contient aucun nom."
        : "⚠ Tu travailles sans code de mission : ton enseignant ne pourra pas savoir que ce résultat est le tien.") +
      "</p></div>" + motMission + arevoir +
      "<h2>La correction, question par question</h2>" + correction +
      '<div class="btn-ligne"><button class="btn btn-primaire" data-aller="parcours">Retour au parcours →</button></div>' +
      pied,
      "Résultat " + p.sigle
    );
  }

  /* ---------- vue : générer un lot de missions (enseignant) ---------- */
  function vueLot() {
    let cibles = "";
    RESTITUTION.CIBLES.forEach((sig, i) => {
      cibles += '<option value="' + i + '"' + (sig === "B0" ? " selected" : "") + ">" + seq(sig) + " — " + seq(PALIERS[i].nom) + "</option>";
    });
    const dans3mois = new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10);
    rendre(
      entete("accueil", "Accueil") +
      "<h1>Générer les codes d'un groupe</h1>" +
      '<div class="carte sans-impression"><p>Choisissez le niveau que vous accordez à ce groupe, la date limite ' +
      "et le nombre d'élèves. Vous obtenez une liste imprimable : écrivez le nom de chaque élève en face de son " +
      "code. <strong>Cette feuille est la seule chose qui relie un code à un élève — gardez-la.</strong></p>" +
      '<p><label for="lot-cible">Niveau à obtenir</label><br><select class="champ-code" id="lot-cible">' + cibles + "</select></p>" +
      '<p><label for="lot-date">À obtenir avant le</label><br><input class="champ-code" type="date" id="lot-date" value="' + dans3mois + '"></p>' +
      '<p><label for="lot-nb">Nombre d\'élèves</label><br><input class="champ-code" type="number" id="lot-nb" min="1" max="60" value="20"></p>' +
      '<div class="btn-ligne"><button class="btn btn-primaire" data-generer="1">Générer la liste</button></div></div>' +
      '<div id="lot-sortie" aria-live="polite"></div>' + pied,
      "Générer des codes"
    );
  }
  function genererLot() {
    const idx = Number(document.getElementById("lot-cible").value);
    const dateSaisie = document.getElementById("lot-date").value;
    const nb = Number(document.getElementById("lot-nb").value);
    const d = dateSaisie ? new Date(dateSaisie + "T12:00:00Z") : new Date();
    const r = RESTITUTION.genererMissions(idx, d, nb);
    let lignes = "";
    r.codes.forEach((c, i) => {
      lignes += "<tr><td>" + (i + 1) + '</td><td class="code">' + seq(c) + "</td><td></td></tr>";
    });
    document.getElementById("lot-sortie").innerHTML =
      '<section class="carte feuille-lot"><h2>Codes — objectif ' + seq(r.cible) + " avant le " + seq(RESTITUTION.enDateFr(r.echeance)) + "</h2>" +
      '<p class="q-compteur">L\'échéance tient sur deux caractères : elle est arrondie en avant, jamais ' +
      "avant votre date — c'est celle affichée ci-dessus qui sera montrée à l'élève. Chaque élève reçoit un code et un seul. " +
      "Conservez cette feuille : elle seule dit qui est qui.</p>" +
      '<table class="bloc-referentiel"><thead><tr><th scope="col">N°</th><th scope="col">Code de mission</th>' +
      '<th scope="col">Nom de l\'élève</th></tr></thead><tbody>' + lignes + "</tbody></table>" +
      '<div class="btn-ligne sans-impression"><button class="btn btn-primaire" data-imprimer="1">Imprimer cette feuille</button>' +
      '<button class="btn btn-secondaire" data-generer="1">Regénérer</button></div></section>';
  }

  /* ---------- vue : vérifier un code (enseignant) ---------- */
  function vueVerif() {
    rendre(
      entete("accueil", "Accueil") +
      "<h1>Vérifier un code rapporté</h1>" +
      '<div class="carte"><p>Saisissez le code que l\'élève vous rapporte, en entier — mission comprise ' +
      '(<span class="badge badge-code">B0-K7-3M-HAB-…</span>).</p>' +
      '<p><input class="champ-code" id="champ-code" autocomplete="off" spellcheck="false" placeholder="B0-K7-3M-HAB-…"></p>' +
      '<div class="btn-ligne"><button class="btn btn-primaire" data-verifier="1">Vérifier</button></div>' +
      '<div id="verif-sortie" class="verif-resultat" aria-live="polite"></div></div>' +
      '<div class="enc enc-note"><span class="enc-mot">Ce que le code prouve — et ne prouve pas</span>' +
      "<p>Le code atteste qu'un test a été terminé avec ce score, à cette date, sous cette mission. Il ne " +
      "contient aucun nom : c'est votre feuille de codes qui fait le lien. Il s'agit d'un travail en autonomie, " +
      "déclaratif par nature — les évaluations qui comptent se passent en classe.</p></div>" + pied,
      "Vérifier un code"
    );
    const champ = document.getElementById("champ-code");
    if (champ) champ.focus();
  }
  function verifierCode() {
    const r = RESTITUTION.decoder(document.getElementById("champ-code").value);
    const sortie = document.getElementById("verif-sortie");
    if (!r.valide) {
      const motifs = {
        controle: "le contrôle d'intégrité ne correspond pas — code recopié avec une erreur, ou modifié",
        coherence: "le contenu décodé est incohérent — code modifié ou tronqué",
        format: "forme non reconnue",
      };
      sortie.innerHTML = '<p class="verif-invalide">✘ Code invalide (' + (motifs[r.motif] || motifs.format) +
        "). Faites recopier le code exactement.</p>";
      return;
    }
    const f = FILIERES[r.filiereIdx], p = PALIERS[r.palierIdx];
    const pc = Math.round((r.score / r.total) * 100);
    const seuil = pc >= REGLES_TEST.seuilReussite * 100;
    const d = r.detail;
    let ligneMission = '<tr><th scope="row">Élève</th><td class="verif-invalide">aucune mission — élève non identifiable</td></tr>';
    if (d) {
      const compare = !seuil ? "" : (r.palierIdx > d.cibleIdx
        ? ' <span class="badge badge-ok">au-delà de l\'objectif</span>'
        : r.palierIdx === d.cibleIdx ? ' <span class="badge badge-ok">objectif atteint</span>' : "");
      ligneMission =
        '<tr><th scope="row">Élève</th><td><span class="badge badge-code">' + seq(d.eleve) + "</span> — à retrouver sur votre feuille</td></tr>" +
        '<tr><th scope="row">Mission</th><td>' + seq(d.cible) + " avant le " + seq(d.echeanceFr) + compare + "</td></tr>";
    }
    sortie.innerHTML =
      '<p class="verif-valide">✔ Code cohérent.</p><table><tbody>' + ligneMission +
      '<tr><th scope="row">Palier passé</th><td>' + seq(p.sigle) + " — " + seq(p.symboles) + "</td></tr>" +
      '<tr><th scope="row">Score</th><td>' + r.score + " / " + r.total + " (" + pc + " %) — " +
      (seuil ? '<span class="verif-valide">seuil de 70 % atteint</span>' : '<span class="verif-invalide">sous le seuil de 70 %</span>') + "</td></tr>" +
      '<tr><th scope="row">Formation déclarée</th><td>' + seq(f.nom) + "</td></tr>" +
      '<tr><th scope="row">Date du test</th><td>' + String(r.jour).padStart(2, "0") + "/" + String(r.mois).padStart(2, "0") + "/" + r.annee + "</td></tr>" +
      "</tbody></table>";
  }

  /* ---------- navigation ---------- */
  document.addEventListener("click", function (ev) {
    const b = ev.target.closest("[data-aller],[data-filiere],[data-fiche],[data-decouvrir],[data-dec-suite],[data-option],[data-test],[data-test-option],[data-verifier],[data-valider-mission],[data-generer],[data-imprimer]");
    if (!b) return;
    if (b.dataset.filiere) { etat.filiere = b.dataset.filiere; sauver(); return vueParcours(); }
    if (b.dataset.aller === "accueil") return vueAccueil();
    if (b.dataset.aller === "parcours") return vueParcours();
    if (b.dataset.aller === "filiere") return vueFiliere();
    if (b.dataset.aller === "code") return vueCode();
    if (b.dataset.aller === "libre") { etat.mission = null; sauver(); return etat.filiere ? vueParcours() : vueFiliere(); }
    if (b.dataset.aller === "verif") return vueVerif();
    if (b.dataset.aller === "lot") return vueLot();
    if (b.dataset.validerMission) return validerMission();
    if (b.dataset.generer) return genererLot();
    if (b.dataset.imprimer) return window.print();
    if (b.dataset.fiche) return vueFiche(b.dataset.fiche);
    if (b.dataset.decouvrir) return demarrerDecouverte(b.dataset.decouvrir);
    if (b.dataset.option !== undefined) return repondreDecouverte(Number(b.dataset.option));
    if (b.dataset.decSuite) return suiteDecouverte();
    if (b.dataset.test) return demarrerTest(b.dataset.test);
    if (b.dataset.testOption !== undefined) return repondreTest(Number(b.dataset.testOption));
    if (b.dataset.verifier) return verifierCode();
  });
  /* saisie au clavier : Entrée valide le champ courant */
  document.addEventListener("keydown", function (ev) {
    if (ev.key !== "Enter") return;
    if (ev.target.id === "champ-mission") { ev.preventDefault(); validerMission(); }
    if (ev.target.id === "champ-code") { ev.preventDefault(); verifierCode(); }
  });

  /* ---------- départ ---------- */
  vueAccueil();
})();
