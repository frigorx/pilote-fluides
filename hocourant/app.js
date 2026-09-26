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
    stationArreter(); sta = null;          /* changer de vue coupe la voix */
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
      '<div class="carte accent"><p><strong>Comment ça marche ?</strong> Votre enseignant vous donne un ' +
      "<strong>code de mission</strong> — par exemple <span class=\"badge badge-code\">B0-K7-3M</span> : " +
      "le niveau à obtenir, votre code personnel, la date limite. Vous le saisissez une fois, et l'application " +
      "retient où vous en êtes. Aucun compte, aucune donnée personnelle : votre enseignant est le seul à savoir " +
      "quel code est le tien.</p></div>" +
      (m
        ? '<div class="carte"><h2>Votre mission en cours</h2><p><span class="badge badge-palier">' + seq(m.cible) +
          '</span> à obtenir avant le <strong>' + seq(m.echeanceFr) + "</strong> · code " +
          '<span class="badge badge-code">' + seq(m.code) + "</span></p>" +
          '<div class="btn-ligne"><button class="btn btn-primaire" data-aller="parcours">Reprendre mon parcours →</button>' +
          '<button class="btn btn-secondaire" data-aller="code">Changer de code</button></div></div>'
        : '<div class="btn-ligne"><button class="btn btn-primaire" data-aller="code">J\'ai un code de mission →</button>' +
          '<button class="btn btn-secondaire" data-aller="libre">Découvrir sans code</button></div>') +
      '<div class="carte"><h2>Le livret papier</h2>' +
      "<p>Le support de cours complet : dix chapitres, quatre-vingts questions, les activités " +
      "à faire en atelier et le lexique. Sa page de garde porte votre nom — remplissez-la, un livret " +
      "perdu revient à son propriétaire.</p>" +
      '<div class="btn-ligne"><a class="btn btn-secondaire" href="livret/inerWeb.fr-HoCourant-Livret-eleve-A5.pdf" download>' +
      "Télécharger le livret (PDF, 110 pages, 11,6 Mo)</a></div>" +
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
      "<h1>Votre code de mission</h1>" +
      '<div class="carte"><p>Recopiez le code que votre enseignant vous a donné. Il ressemble à ' +
      '<span class="badge badge-code">B0-K7-3M</span>.</p>' +
      '<p><input class="champ-code" id="champ-mission" autocomplete="off" spellcheck="false" ' +
      'placeholder="B0-K7-3M" value="' + seq(etat.mission || "") + '"></p>' +
      (erreur ? '<p class="verif-invalide">✘ ' + seq(erreur) + "</p>" : "") +
      '<div class="btn-ligne"><button class="btn btn-primaire" data-valider-mission="1">Valider mon code</button>' +
      '<button class="btn btn-secondaire" data-aller="libre">Continuer sans code</button></div></div>' +
      '<div class="enc enc-note"><span class="enc-mot">Sans code, c\'est possible aussi</span>' +
      "<p>Vous pouvez tout travailler librement. Mais le résultat de vos tests ne pourra pas être rattaché " +
      "à vous : votre enseignant ne saura pas que c'est le vôtre.</p></div>" + pied,
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
      "<h1>Votre formation</h1>" +
      '<div class="carte accent"><p>Cela sert uniquement à afficher les codes de votre référentiel à côté de votre travail.' +
      (m ? " Votre objectif reste celui de votre mission : <strong>" + seq(m.cible) + "</strong>." : "") + "</p></div>" +
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
              : jours >= 0 ? " · il vous reste <strong>" + jours + " jour" + (jours > 1 ? "s" : "") + "</strong>"
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
          "<p>Ces paliers dépassent votre objectif actuel. Rien ne vous empêche de les travailler et de passer " +
          "leurs tests : le niveau que vous visez n'est pas un plafond. Le code que vous rapporterez dira jusqu'où " +
          "vous êtes allé.</p></div>" + plusLoin
        : "") +
      '<section class="carte bloc-referentiel"><h2>Ce que ce travail couvre dans votre référentiel</h2>' +
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
  function ecranHtml(e) {
    const enc = { cle: ["enc-cle", "🔑 La clé"], piege: ["enc-piege", "⚠ Le piège"] }[e.type];
    return enc
      ? '<div class="enc ' + enc[0] + '"><span class="enc-mot">' + enc[1] + "</span>" + e.html + "</div>"
      : '<div class="carte"><h2>' + seq(e.titre) + "</h2>" + e.html + "</div>";
  }
  function ficheHtml(id) {
    const ecrans = (COURS[id] || { ecrans: [] }).ecrans;
    let html = "";
    for (const e of ecrans) html += ecranHtml(e);
    return html;
  }
  function vueFiche(id) {
    const mo = MOD[id];
    etat.lus[id] = true; sauver();
    const st = stationDe(id);
    rendre(
      entete("parcours", "Retour au parcours") +
      '<div class="palier-tete"><span class="badge badge-palier">' + seq(PAL[mo.palier].sigle) + "</span><h1>" + seq(mo.nom) + "</h1></div>" +
      (st ? stationHtml(id)
          : '<p class="q-compteur">La fiche de ce module — à lire d\'un trait, ou à consulter quand une question résiste.</p>' +
            ficheHtml(id) +
            '<div class="btn-ligne"><button class="btn btn-primaire" data-decouvrir="' + id + '">Passer aux questions →</button>' +
            '<button class="btn btn-secondaire" data-aller="parcours">Retour au parcours</button></div>') + pied,
      mo.nom
    );
    if (st) { sta = { id, st, i: 0, vues: new Set(), session: 0, enCours: false, minuterie: null }; stationEtape(0); }
  }

  /* ---------- la station : la même fiche, en étapes, avec scène, film et voix ---------- */
  /* Le texte de gauche reste celui de cours.js ; la station (donnees/stations/Mx.js)
     n'apporte que ce qu'on montre à droite et ce que la voix dit. Sans station,
     ou si son compte d'étapes diffère des écrans, la fiche texte s'affiche. */
  let sta = null;
  const PAS_VOIX = [0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4];
  const CLE_VITESSE = "pilote-voix-vitesse";    /* même clé que le réglage commun du site */
  /* « Sans animation » (inc. 9) : réglage manuel mémorisé sur l'appareil, qui double la
     préférence système prefers-reduced-motion. Il pose la classe sans-animation sur <html> :
     hocourant.css fige alors les films exactement comme le fait la préférence système. */
  const CLE_ANIMATION = "hocourant-sans-animation";
  let sansAnimation = false;
  try { sansAnimation = localStorage.getItem(CLE_ANIMATION) === "1"; } catch (e) { /* sans mémoire : réglage de la visite */ }
  document.documentElement.classList.toggle("sans-animation", sansAnimation);
  const animationSysteme = () => !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  function stationDe(id) {
    const st = window.STATIONS && STATIONS[id];
    return st && COURS[id] && st.etapes.length === COURS[id].ecrans.length ? st : null;
  }
  function lireVitesse() {
    try { const v = Number(sessionStorage.getItem(CLE_VITESSE)); if (PAS_VOIX.includes(v)) return v; } catch (e) { /* sans mémoire */ }
    return 0.95;
  }
  const vitesseTexte = (v) => v.toFixed(2).replace(".", ",").replace(/0$/, "") + "×";
  const $st = (nom) => document.getElementById("st-" + nom);

  function stationHtml(id) {
    return '<ol class="etapes" id="st-etapes" aria-label="Étapes de la fiche"></ol>' +
      '<section class="station" aria-live="polite"><div class="texte" id="st-texte"></div>' +
      '<div class="panneau"><div class="scenes" id="st-scenes"></div>' +
      '<div class="q-interactif" id="st-question" aria-live="polite"></div>' +
      '<div class="voix"><button class="btn btn-primaire" id="st-ecouter" type="button" data-ecouter="1">▶ Écouter le professeur</button>' +
      '<span class="reglage" role="group" aria-label="Débit de la voix">' +
      '<button type="button" data-vitesse="-1" aria-label="Parler moins vite">−</button>' +
      '<output id="st-vitesse">' + vitesseTexte(lireVitesse()) + "</output>" +
      '<button type="button" data-vitesse="1" aria-label="Parler plus vite">+</button></span>' +
      boutonAnimation() +
      '<span class="etat" id="st-etat"></span></div>' +
      '<details class="transcription"><summary>Ce que dit la voix (texte à part, écrit pour l\'oreille)</summary><div id="st-transcription"></div></details>' +
      '</div></section><div class="nav" id="st-nav"></div>';
  }
  /* trois canaux : trait tireté → plein, fond clair → bleu, le mot précédé de ✔ */
  function boutonAnimation() {
    const sys = animationSysteme(), actif = sansAnimation || sys;
    return '<button type="button" class="bascule" id="st-animation" data-sans-animation="1" aria-pressed="' + actif + '"' +
      (sys ? ' disabled title="Réglé par votre appareil (réduction des animations)"' : "") + ">" +
      (actif ? "✔ " : "") + "Sans animation</button>";
  }
  function figureScene(idScene, muet) {
    const s = SC[idScene];
    if (!s) return "";
    const id = "st" + Math.random().toString(36).slice(2, 8);
    return '<figure class="scene"><svg viewBox="0 0 320 180" role="img" aria-labelledby="' + id + "t " + id + 'd">' +
      '<title id="' + id + 't">' + s.titre + '</title><desc id="' + id + 'd">' + s.alt + "</desc>" + s.svg + "</svg>" +
      (muet ? "" : "<figcaption>" + s.titre + "</figcaption>") + "</figure>";
  }
  function filmHtml(fid) {
    const f = window.FILMS && FILMS[fid];
    if (!f) return '<p class="q-compteur">Le film de cette étape est en préparation.</p>';
    if (!document.querySelector('style[data-film="' + fid + '"]')) {
      const style = document.createElement("style");
      style.dataset.film = fid; style.textContent = f.css;
      document.head.appendChild(style);
    }
    const id = "st" + Math.random().toString(36).slice(2, 8);
    return '<figure class="scene film film-' + fid + '"><svg viewBox="0 0 320 180" role="img" aria-labelledby="' + id + "t " + id + 'd">' +
      '<title id="' + id + 't">' + f.titre + '</title><desc id="' + id + 'd">' + f.alt + "</desc>" + f.svg + "</svg>" +
      '<figcaption><span class="acte" id="st-acte">Un film en deux actes</span> — la situation, puis la leçon</figcaption></figure>';
  }
  const etiquetteEcoute = (m) => m.film ? "▶ Jouer le film et écouter" : "▶ Écouter le professeur";
  function stationEtape(k) {
    stationArreter();
    sta.i = k; sta.vues.add(k);
    const e = COURS[sta.id].ecrans[k], m = sta.st.etapes[k], dernier = k === sta.st.etapes.length - 1;
    $st("texte").innerHTML = ecranHtml(e);
    const sc = $st("scenes");
    if (m.film) {
      sc.className = "scenes";
      sc.innerHTML = filmHtml(m.film);
      $st("transcription").innerHTML = m.actes.map((a) => "<p><strong>" + seq(a.titre) + ".</strong> " + seq(a.narration) + "</p>").join("");
      sta.inter = (window.INTERACTIONS && INTERACTIONS[m.film]) ? { cle: m.film, tentees: [], resolu: false } : null;
    } else {
      sc.className = "scenes" + (m.scenes.length === 2 ? " deux" : m.scenes.length === 4 ? " quatre" : "");
      sc.innerHTML = m.scenes.map((s) => figureScene(s, m.muet)).join("");
      $st("transcription").innerHTML = "<p>" + seq(m.narration) + "</p>";
      sta.inter = null;
    }
    $st("question").innerHTML = "";
    $st("ecouter").textContent = etiquetteEcoute(m);
    $st("etapes").innerHTML = sta.st.etapes.map((t, n) =>
      '<li><button type="button" data-etape="' + n + '"' + (n === k ? ' aria-current="step"' : "") +
      (sta.vues.has(n) && n !== k ? ' class="vue"' : "") + '><span class="num">' + (n + 1) + "</span>" + seq(t.court) + "</button></li>").join("");
    $st("nav").innerHTML =
      '<button class="btn btn-secondaire" type="button" data-etape-pas="-1"' + (k === 0 ? " disabled" : "") + ">← Précédent</button>" +
      (dernier ? '<button class="btn btn-primaire" data-decouvrir="' + sta.id + '">Passer aux questions →</button>'
               : '<button class="btn btn-primaire" type="button" data-etape-pas="1">Suivant →</button>');
  }

  /* ---- la voix : au clic seulement ; changer d'étape, de vitesse ou de vue l'arrête ---- */
  function voixFr() {
    const v = window.speechSynthesis.getVoices().filter((x) => /^fr/i.test(x.lang));
    return v.find((x) => /natural|neural|online/i.test(x.name)) || v[0] || null;
  }
  function stationArreter() {
    if (!sta) return;
    sta.session++;
    if (sta.minuterie) { clearTimeout(sta.minuterie); sta.minuterie = null; }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    sta.enCours = false;
    const film = document.querySelector(".station .film");
    if (film) film.classList.remove("acte-1", "acte-2");
    if ($st("ecouter")) $st("ecouter").textContent = etiquetteEcoute(sta.st.etapes[sta.i]);
    if ($st("etat")) $st("etat").textContent = "";
  }
  /* dire un texte, puis enchaîner ; sans voix disponible, la durée prévue fait office */
  function stationDire(texte, duree, suite) {
    const s = sta.session, vitesse = lireVitesse();
    if (!("speechSynthesis" in window)) {
      $st("etat").textContent = "Ce navigateur n'a pas de voix : le film joue seul.";
      sta.minuterie = setTimeout(() => { if (sta && s === sta.session) suite(); }, duree * 1000 / vitesse);
      return;
    }
    const u = new SpeechSynthesisUtterance(texte);
    u.lang = "fr-FR"; u.rate = vitesse;
    const v = voixFr(); if (v) u.voice = v;
    u.onend = () => { if (sta && s === sta.session) suite(); };
    u.onerror = () => { if (sta && s === sta.session) suite(); };
    window.speechSynthesis.speak(u);
  }
  function stationActe(n) {
    const m = sta.st.etapes[sta.i], a = m.actes[n - 1];
    /* chaque acte ouvre sa propre séance de voix : une narration encore en cours (l'acte 1 en
       mode sans animation, que la question n'interrompt pas) se tait, ses rappels périmés sont ignorés */
    sta.session++;
    if ("speechSynthesis" in window && (window.speechSynthesis.speaking || window.speechSynthesis.pending)) window.speechSynthesis.cancel();
    const film = document.querySelector(".station .film");
    if (film) {
      film.classList.remove("acte-1", "acte-2", "pause");   /* « pause » : au cas où un acte reprend sans passer par « Revoir » */
      void film.getBoundingClientRect();           /* force le navigateur à repartir de zéro */
      film.classList.add("acte-" + n);
      $st("acte").textContent = a.titre;
    }
    $st("etat").textContent = a.titre;
    /* couche interactive (inc. 8) : l'acte 1 d'un film à question n'enchaîne jamais tout
       seul sur l'acte 2 — voir le bloc dédié après stationVitesse */
    const gel = n === 1 && sta.inter && !sta.inter.resolu;
    /* sans animation (inc. 9) : l'image finale de l'acte 1 est déjà là, la question s'affiche
       tout de suite et la voix raconte quand même la situation */
    if (gel && reduireAnimations()) figerActe1(true);
    else if (gel) programmerArretInteractif();
    stationDire(a.narration, a.duree, () => {
      if (gel) { if (sta.enCours && reduireAnimations()) { sta.enCours = false; $st("ecouter").textContent = etiquetteEcoute(m); } return; }
      if (n < m.actes.length) return stationActe(n + 1);
      const s = sta.session;
      sta.minuterie = setTimeout(() => {
        if (sta && s === sta.session) { sta.enCours = false; $st("ecouter").textContent = "↺ Rejouer le film"; $st("etat").textContent = "Fin du film."; }
      }, 300);
    });
  }
  function stationParler() {
    if (!sta) return;
    if (sta.enCours) { stationArreter(); return; }
    const m = sta.st.etapes[sta.i];
    sta.session++; sta.enCours = true;
    $st("ecouter").textContent = "■ Arrêter";
    if (m.film) return stationActe(1);
    $st("etat").textContent = "Le professeur explique la scène…";
    stationDire(m.narration, 40, () => { sta.enCours = false; $st("ecouter").textContent = etiquetteEcoute(m); $st("etat").textContent = ""; });
  }
  function stationVitesse(sens) {
    const k = PAS_VOIX.indexOf(lireVitesse()) + sens;
    if (k < 0 || k >= PAS_VOIX.length) return;
    try { sessionStorage.setItem(CLE_VITESSE, String(PAS_VOIX[k])); } catch (e) { /* sans mémoire, le réglage vaut pour l'écran */ }
    stationArreter();
    $st("vitesse").value = vitesseTexte(PAS_VOIX[k]);
  }
  function stationSansAnimation() {
    if (animationSysteme()) return;           /* l'appareil l'impose déjà : le bouton est grisé */
    sansAnimation = !sansAnimation;
    try { localStorage.setItem(CLE_ANIMATION, sansAnimation ? "1" : "0"); } catch (e) { /* sans mémoire, le réglage vaut pour la visite */ }
    document.documentElement.classList.toggle("sans-animation", sansAnimation);
    stationArreter();
    const b = $st("animation");
    if (b) { b.setAttribute("aria-pressed", String(sansAnimation)); b.textContent = (sansAnimation ? "✔ " : "") + "Sans animation"; }
  }

  /* ---------- couche interactive des films (inc. 8, 26/09/2026) ---------- */
  /* Quand INTERACTIONS[film] existe (donnees/films/interactions.js pour M1…M13, le fichier
     du film pour les films ajoutés Mxb, Mxc… — inc. 9), l'acte 1 se fige au
     repère « arret » (secondes réelles dans l'animation CSS, indépendantes du débit de la
     voix) : la voix se tait, une question à trois choix apparaît sous le dessin, dans
     l'ordre du fichier. Bonne réponse → l'acte 2 s'enchaîne comme aujourd'hui. Mauvaise
     réponse → remédiation et « Revoir la situation » rejoue l'acte 1 ; les choix déjà
     tentés restent marqués. Sans animation (préférence système ou réglage manuel) : la
     question apparaît tout de suite et la voix de l'acte 1 continue. */
  const reduireAnimations = () => sansAnimation || animationSysteme();
  function programmerArretInteractif() {
    const inter = INTERACTIONS[sta.inter.cle], s = sta.session;
    sta.inter.minuterie = setTimeout(() => { if (sta && s === sta.session && sta.inter && !sta.inter.resolu) figerActe1(); }, inter.arret * 1000);
  }
  function figerActe1(garderVoix) {
    if (!sta || !sta.inter || sta.inter.resolu) return;
    if (!garderVoix) {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      sta.enCours = false;
      if ($st("ecouter")) $st("ecouter").textContent = etiquetteEcoute(sta.st.etapes[sta.i]);
    }
    const film = document.querySelector(".station .film");
    if (film) film.classList.add("pause");
    if ($st("etat")) $st("etat").textContent = "Le film s'arrête sur une question.";
    afficherQuestionInteractive();
  }
  function afficherQuestionInteractive() {
    const inter = INTERACTIONS[sta.inter.cle], zone = $st("question");
    if (!zone) return;
    const boutons = inter.choix.map((c, i) => {
      const tentee = sta.inter.tentees.includes(i);
      const cls = "q-option" + (tentee ? " faux" : "");
      const texte = tentee ? "✘ À revoir — " + seq(c.t) : seq(c.t);
      return '<button class="' + cls + '" data-inter-choix="' + i + '"' + (tentee ? " disabled" : "") + ">" + texte + "</button>";
    }).join("");
    zone.innerHTML =
      '<p class="q-enonce">' + seq(inter.question) + "</p>" +
      '<div class="q-options">' + boutons + "</div>" +
      '<div id="st-inter-suite"></div>';
    zone.scrollIntoView({ block: "nearest" });
  }
  function repondreInteraction(i) {
    if (!sta || !sta.inter || sta.inter.resolu) return;
    const inter = INTERACTIONS[sta.inter.cle], c = inter.choix[i], zone = $st("question");
    zone.querySelectorAll(".q-option").forEach((b) => { b.disabled = true; });
    const bouton = zone.querySelector('[data-inter-choix="' + i + '"]');
    if (c.ok) {
      sta.inter.resolu = true;
      if (bouton) { bouton.classList.add("juste"); bouton.textContent = "✔ Juste — " + c.t; }
      document.getElementById("st-inter-suite").innerHTML =
        '<div class="q-explication"><span class="mot">✔ Juste.</span> ' + seq(inter.bravo) + "</div>";
      const s = sta.session;
      setTimeout(() => { if (sta && s === sta.session) stationActe(2); }, 1400);   /* lève « pause » elle-même */
    } else {
      if (!sta.inter.tentees.includes(i)) sta.inter.tentees.push(i);
      if (bouton) { bouton.classList.add("faux"); bouton.textContent = "✘ À revoir — " + c.t; }
      document.getElementById("st-inter-suite").innerHTML =
        '<div class="enc enc-piege"><span class="enc-mot">⚠ À revoir</span><p>' + seq(c.remed) + "</p></div>" +
        '<div class="btn-ligne"><button class="btn btn-primaire" type="button" data-inter-revoir="1">↺ Revoir la situation</button></div>';
    }
  }
  function revoirActe1Interactif() {
    if (!sta || !sta.inter) return;
    $st("question").innerHTML = "";
    sta.enCours = true;
    if ($st("ecouter")) $st("ecouter").textContent = "■ Arrêter";
    stationActe(1);      /* retire acte-1 et pause, reflow, repose acte-1 (voir stationActe) */
  }

  /* ---------- la découverte : on apprend en cherchant ---------- */
  /* Boucle : question → réponse → l'information arrive au moment où elle
     manque. Juste : on confirme et on avance. Faux : remédiation, la fiche
     s'ouvre sur place, et la question revient plus tard dans la file. Le
     module n'est « découvert » que lorsque chaque question a été réussie. */
  let dec = null;
  /* id : "M3" (bouton existant), ou une liste de modules — "M11,M13" ou ["M11","M13"] —
     pour découvrir la réunion de leurs questions (entrée ?decouvrir=Mx,My, inc. 5). */
  function demarrerDecouverte(id) {
    const modules = Array.isArray(id) ? id : String(id).split(",").map((s) => s.trim());
    const questions = modules.reduce((acc, m) => acc.concat(questionsDuModule(m)), []);
    const file = melanger(questions).map((q) => ({ q, options: melanger([q.ok].concat(q.nok)) }));
    dec = { module: modules[0], modules, file, total: file.length, reussies: 0, essais: 0, repondu: false, aRevoir: 0 };
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
      '<div class="carte"><p class="q-compteur">Cherchez d\'abord. Si vous ne savez pas, répondez quand même : ' +
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
    dec.modules.forEach((mid) => { etat.decouvertes[mid] = { total: dec.total, essais: dec.essais, aRevoir: dec.aRevoir }; });
    sauver();
    const dupremier = dec.essais === dec.total;
    rendre(
      entete("parcours", "Retour au parcours") +
      "<h1>Module découvert — " + seq(mo.nom) + "</h1>" +
      '<div class="carte score-final score-ok"><p class="gros">' + dec.total + " / " + dec.total + "</p>" +
      "<p>✔ Vous avez trouvé toutes les réponses de ce module." +
      (dupremier ? " Et du premier coup, sur chacune."
                 : " Il vous a fallu " + dec.essais + " essais : les points repassés sont ceux qui comptent le plus.") + "</p></div>" +
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
  let cibleEnAttente = null;   /* Px en attente du choix de filière (entrée ?test=Px, inc. 5), vidée après usage */
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
          : '<p class="verif-invalide">✘ Votre réponse — ' + seq(choisie) + '</p><p class="verif-valide">✔ La bonne — ' + seq(item.q.ok) + "</p>") +
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
        motMission = '<div class="enc enc-cle"><span class="enc-mot">🔑 Mission remplie</span><p>Vous avez validé ' +
          seq(PAL[test.palier].sigle) + ", le niveau demandé" +
          (indexPalier(test.palier) > m.cibleIdx ? " — et même au-delà de votre mission" : "") +
          ". Rapportez votre code à votre enseignant. La suite se joue en pratique, avec lui.</p></div>";
      } else {
        motMission = '<div class="enc enc-note"><span class="enc-mot">Sur la bonne route</span><p>Palier validé. ' +
          "Votre objectif reste <strong>" + seq(m.cible) + "</strong> avant le " + seq(m.echeanceFr) + ".</p></div>";
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
      "<p>Votre code à rapporter à votre enseignant :</p>" +
      '<p><span class="code-restitution">' + seq(code) + "</span></p>" +
      '<p class="q-compteur">' + (etat.mission
        ? "Ce code contient votre mission, le palier passé, le score et la date. Il ne contient aucun nom."
        : "⚠ Vous travaillez sans code de mission : votre enseignant ne pourra pas savoir que ce résultat est le vôtre.") +
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
    const b = ev.target.closest("[data-aller],[data-filiere],[data-fiche],[data-decouvrir],[data-dec-suite],[data-option],[data-test],[data-test-option],[data-verifier],[data-valider-mission],[data-generer],[data-imprimer],[data-etape],[data-etape-pas],[data-ecouter],[data-vitesse],[data-sans-animation],[data-inter-choix],[data-inter-revoir]");
    if (!b) return;
    if (b.dataset.etape !== undefined) return stationEtape(Number(b.dataset.etape));
    if (b.dataset.etapePas) return stationEtape(sta.i + Number(b.dataset.etapePas));
    if (b.dataset.ecouter) return stationParler();
    if (b.dataset.vitesse) return stationVitesse(Number(b.dataset.vitesse));
    if (b.dataset.sansAnimation) return stationSansAnimation();
    if (b.dataset.interChoix !== undefined) return repondreInteraction(Number(b.dataset.interChoix));
    if (b.dataset.interRevoir) return revoirActe1Interactif();
    if (b.dataset.filiere) {
      etat.filiere = b.dataset.filiere; sauver();
      if (cibleEnAttente) { const id = cibleEnAttente; cibleEnAttente = null; return demarrerTest(id); }
      return vueParcours();
    }
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
  /* Entrées par URL (QR du livret, inc. 5) : ?module=Mx, ?decouvrir=Mx[,My], ?test=Px,
     ?vue=verifier, ?vue=code. Module/découverte/vérifier/code s'ouvrent sans demander la
     filière ; test la demande d'abord si besoin (cibleEnAttente), puis continue vers le
     test. Rien de nominatif ne voyage par l'URL. Paramètre absent ou inconnu → accueil,
     sans message. Après lecture, l'URL est nettoyée pour qu'un retour ou un rechargement
     ne rejoue pas l'entrée. */
  function demarrer() {
    const params = new URLSearchParams(location.search);
    const connu = (table, id) => Object.prototype.hasOwnProperty.call(table, id);   /* MOD["constructor"] serait vrai */
    let trouve = false;
    if (params.has("module") && connu(MOD, params.get("module"))) {
      trouve = true;
      vueFiche(params.get("module"));
    } else if (params.has("decouvrir")) {
      const ids = params.get("decouvrir").split(",").map((s) => s.trim());
      if (ids.length && ids.every((m) => connu(MOD, m))) { trouve = true; demarrerDecouverte(ids); }
    } else if (params.has("test") && connu(PAL, params.get("test"))) {
      trouve = true;
      const id = params.get("test");
      if (!etat.filiere) { cibleEnAttente = id; vueFiliere(); } else demarrerTest(id);
    } else if (params.get("vue") === "verifier") {
      trouve = true;
      vueVerif();
    } else if (params.get("vue") === "code") {
      trouve = true;
      vueCode();
    }
    if (trouve) history.replaceState(null, "", location.pathname);
    else vueAccueil();
  }
  demarrer();
})();
