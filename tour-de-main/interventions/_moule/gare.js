/* =====================================================================
   Le tour de main — MOTEUR COMMUN des gares « Les interventions de base ».
   ---------------------------------------------------------------------
   Une gare = une page + UN fichier de données (`donnees.js`, qui pose
   `window.GARE`) + un dessin repris d'une station existante. Ce moteur
   n'est jamais recopié ni retouché par une gare : voir `MOULE.md`.

   Trois usages d'un même contenu (maquette validée par Franck le 08/10/2026) :
   · « Je m'entraîne » : une étape par écran, l'élève touche l'appareil
     du geste sur le dessin du poste ;
   · « Au poste » : la guidance sur la vraie machine (je regarde, je fais,
     je dois voir), le danger, le contrôle des relevés, les points d'arrêt
     (case « le professeur a vérifié »), « ce qui me reste » ;
   · « Ma trace » : les relevés horodatés, la grille 0-4, les codes du
     référentiel ; elle s'imprime (corps 14 pt).
   Deux parcours (Franck, 08/10) : « machine chargée » et « support sous
   azote » ; une étape peut porter `azote: false` (sautée) ou
   `azote: { … }` (champs remplacés).

   Mémoire : localStorage seulement, enveloppé de try/catch ; la page
   marche sans. Aucune donnée ne part sur le réseau.
   ===================================================================== */
(function () {
  "use strict";
  const G = window.GARE;
  const CLE = "tour-de-main:" + G.id;
  /* Une gare peut n'offrir qu'un parcours (`parcours: ["azote"]`) et renommer un parcours (`parcoursNoms`) :
     Franck, 08/10 — au lycée, pas de pose ni de dépose des manomètres sur machine chargée. */
  const PARCOURS = [
    { id: "charge", nom: "Sous fluide frigorigène", aide: "la machine avec son fluide" },
    { id: "azote", nom: "Sous azote", aide: "conseillé au lycée : sécurité et autonomie" }
  ].filter(p => !G.parcours || G.parcours.includes(p.id)).map(p => Object.assign({}, p, (G.parcoursNoms || {})[p.id]));
  /* Deux niveaux (Franck, 08/10) : mêmes étapes, mêmes attendus (le niveau de l'attestation fluides) ;
     seuls changent les codes du référentiel et l'exigence de la grille 0-4. */
  const NIVEAUX = [{ id: "cap", nom: "CAP IFCA" }, { id: "mfer", nom: "1re Bac Pro MFER" }];
  /* Les relevés ont droit à une erreur de mesure (Franck, 08/10 : pesée à 5 %). */
  const TOL = Object.assign({ pesee: 0.05, mesure: 0.05 }, G.tolerances || {});
  /* Franck, 08/10 : sous azote ou sous fluide, la manipulation est strictement la même ; l'azote est un choix de
     sécurité et d'autonomie, jamais un geste allégé. */
  const RIGUEUR = "Sous azote ou sous fluide frigorigène : <b>même geste, même rigueur</b>. Je travaille toujours comme sur du vrai fluide.";
  const parNiveau = x => (x && typeof x === "object" && !Array.isArray(x)) ? (x[S.machine.niveau] || x.cap || "") : (x || "");

  /* ---------- mémoire ---------- */
  let S = { machine: { parcours: "charge", niveau: "cap" }, eleve: "", etapes: {}, ici: 0, entr: { ici: 0, erreurs: 0, reussi: null } };
  try { const lu = JSON.parse(localStorage.getItem(CLE)); if (lu) S = Object.assign(S, lu); } catch (e) { /* page sans mémoire */ }
  if (!PARCOURS.some(p => p.id === S.machine.parcours)) S.machine.parcours = PARCOURS[0].id;
  const garder = () => { try { localStorage.setItem(CLE, JSON.stringify(S)); } catch (e) { /* idem */ } };

  /* ---------- outils offerts aux données (contexte des contrôles) ---------- */
  const nb = s => parseFloat(String(s == null ? "" : s).replace(",", "."));
  const fr = (v, d = 2) => (Math.round(v * 10 ** d) / 10 ** d).toFixed(d).replace(".", ",");
  const kg = v => fr(v) + " kg";
  const releve = (id, k = 0) => ((S.etapes[id] && S.etapes[id].valeurs) || [])[k];
  const ctx = () => ({ m: S.machine, parcours: S.machine.parcours, niveau: S.machine.niveau, releve, nb, fr, kg, tol: TOL,
    /* vrai si a et b sont égaux à la tolérance relative près (et, en plus, à « lecture » près, en valeur absolue) */
    proche: (a, b, t = TOL.mesure, lecture = 0) => Math.abs(a - b) <= Math.abs(b) * t + lecture,
    egal: (a, b) => String(a || "").toUpperCase().replace(/[\s-]/g, "") === String(b || "").toUpperCase().replace(/[\s-]/g, "") });

  /* ---------- les étapes du parcours choisi ---------- */
  const etapes = () => G.etapes.map(e => {
    if (S.machine.parcours !== "azote") return e;
    if (e.azote === false) return null;
    return Object.assign({}, e, e.azote || {});
  }).filter(Boolean);
  const etat = id => (S.etapes[id] = S.etapes[id] || {});
  const sansJe = v => v.replace(/^Je |^J'/, "");

  /* ---------- le dessin du poste, recadré sur l'étape ---------- */
  let DESSIN = "";
  const boites = {};
  function boite(svg, id) {
    if (boites[id]) return boites[id];
    const el = svg.querySelector("#" + id); if (!el) return null;
    const bb = el.getBBox(); if (!bb.width) return null;          /* pas encore affiché : rien en cache */
    let m = svg.createSVGMatrix();
    for (let n = el; n && n !== svg; n = n.parentNode) { const t = n.transform && n.transform.baseVal.consolidate(); if (t) m = t.matrix.multiply(m); }
    const pts = [[bb.x, bb.y], [bb.x + bb.width, bb.y], [bb.x, bb.y + bb.height], [bb.x + bb.width, bb.y + bb.height]]
      .map(([x, y]) => { const p = svg.createSVGPoint(); p.x = x; p.y = y; return p.matrixTransform(m); });
    return (boites[id] = { x0: Math.min(...pts.map(p => p.x)), y0: Math.min(...pts.map(p => p.y)), x1: Math.max(...pts.map(p => p.x)), y1: Math.max(...pts.map(p => p.y)) });
  }
  function recadrer(svg, ids) {
    if (!ids || !ids.length) { svg.setAttribute("viewBox", G.dessin.vue); return; }
    const bs = ids.map(id => boite(svg, id)).filter(Boolean); if (!bs.length) return;
    const x0 = Math.min(...bs.map(b => b.x0)) - 20, y0 = Math.min(...bs.map(b => b.y0)) - 20;
    const x1 = Math.max(...bs.map(b => b.x1)) + 20, y1 = Math.max(...bs.map(b => b.y1)) + 20;
    svg.setAttribute("viewBox", [x0, y0, x1 - x0, y1 - y0].join(" "));
  }
  function poserDessin(fig, e, entier) {
    fig.insertAdjacentHTML("beforeend", DESSIN);
    const svg = fig.querySelector("svg");
    if (!svg) return document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.removeAttribute("id");
    svg.setAttribute("aria-label", "Le poste : " + (entier ? "vue d'ensemble" : e.verbe));
    if (G.dessin.appliquer) G.dessin.appliquer(svg, e, ctx());
    requestAnimationFrame(() => recadrer(svg, entier ? null : e.cadre));
    return svg;
  }

  /* ---------- en-tête et cadre de page ---------- */
  document.title = G.titre + " · Le tour de main";
  document.body.insertAdjacentHTML("afterbegin", `
  <header class="haut">
    <div class="ligne1"><a class="retour" href="../../index.html">← Le tour de main</a>
      <div class="titre">${G.titre}<small>${G.sousTitre}</small></div></div>
    <nav class="onglets" aria-label="Trois façons d'utiliser la gare">
      <button data-vue="entr">Je m'entraîne<small>sur le dessin</small></button>
      <button data-vue="poste">Au poste<small>sur la vraie machine</small></button>
      <button data-vue="trace">Ma trace<small>relevés · grille</small></button></nav>
    <div class="avance"><div class="barre"><i id="barre"></i></div><span id="avance-txt"></span></div>
  </header>
  <main><div class="filigrane" aria-hidden="true"></div><div id="vue"></div></main>`);
  const vue = document.getElementById("vue");

  function majAvance() {
    const L = etapes(), n = L.filter(e => S.etapes[e.id] && S.etapes[e.id].fait).length;
    document.getElementById("barre").style.width = (100 * n / L.length) + "%";
    document.getElementById("avance-txt").textContent = n + " / " + L.length + " étapes faites";
  }

  /* ---------- « Ma machine » : le parcours et ce qu'on recopie de la plaque ---------- */
  function blocMachine() {
    const m = S.machine, P = PARCOURS.find(p => p.id === m.parcours) || PARCOURS[0], N = NIVEAUX.find(n => n.id === m.niveau) || NIVEAUX[0];
    const rempli = G.machine.every(c => m[c.id]);
    if (rempli && !S.machineOuverte) return `<section class="machine"><div class="resume"><span>Niveau : <b>${N.nom}</b></span><span>Parcours : <b>${P.nom}</b></span>
      ${G.machine.map(c => `<span>${c.court || c.label} : <b>${m[c.id]}${c.unite ? " " + c.unite : ""}</b></span>`).join("")}
      <button class="lien-petit" data-act="machine">modifier</button></div><p class="rigueur">${RIGUEUR}</p></section>`;
    return `<section class="machine"><h2>Ma machine</h2>
      <div class="niveaux" role="group" aria-label="Mon niveau">${NIVEAUX.map(n => `<button class="${n.id === m.niveau ? "choisi" : ""}" data-niveau="${n.id}">${n.nom}</button>`).join("")}</div>
      ${PARCOURS.length < 2 ? `<p class="parcours-seul">Parcours : <b>${P.nom}</b> — ${P.aide}</p>` : ""}<div class="parcours" role="group" aria-label="Sur quoi je travaille" ${PARCOURS.length < 2 ? "hidden" : ""}>${PARCOURS.map(p => `<button class="${p.id === m.parcours ? "choisi" : ""}" data-parcours="${p.id}"><b>${p.nom}</b><span>${p.aide}</span></button>`).join("")}</div>
      <div class="champs">${G.machine.map(c => `<div><label for="m-${c.id}">${c.label}${c.unite ? ", " + c.unite : ""}</label>
        <input id="m-${c.id}" ${c.nombre ? 'inputmode="decimal"' : ""} value="${m[c.id] || ""}" placeholder="${c.exemple || ""}"></div>`).join("")}</div>
      <p class="rigueur">${RIGUEUR}</p>
      <div class="bas"><button class="btn" data-act="machine-ok">C'est noté</button></div></section>`;
  }

  /* ---------- le contrôle d'une étape ---------- */
  /* l'unité d'un champ peut venir de « Ma machine » (`uniteMachine: "<id du champ>"`, ex. l'unité du vacuomètre du poste) */
  const unite = ch => ch.uniteMachine ? (S.machine[ch.uniteMachine] || "") : (ch.unite || "");
  function juger(e, v) {
    const c = e.controle;
    if (c.type === "coches") return v.every(Boolean) ? ["vert", c.ok || "Tout est vu."] : ["ambre", c.manque || "Il manque une coche : je ne continue pas avant."];
    if (c.type === "ouinon") return v[0] === undefined ? null : v[0] ? ["vert", c.oui] : ["rouge", c.non];
    if (c.type === "choix") return v[0] === undefined ? null : c.juger(v, ctx());
    if (v.some(x => x === "" || x == null)) return null;
    return c.juger(v, ctx());
  }
  function blocControle(e, st) {
    const c = e.controle; if (!c) return "";
    const v = st.valeurs || [];
    let champs;
    if (c.type === "coches") champs = `<div class="coches">${c.items.map((it, k) => `<label><input type="checkbox" data-v="${k}" ${v[k] ? "checked" : ""}> ${it}</label>`).join("")}</div>`;
    else if (c.type === "choix") champs = `<div class="saisie">${c.options.map((o, k) => `<button class="btn ${v[0] === k ? "" : "clair"}" data-choix="${k}">${o}</button>`).join("")}</div>`;
    else if (c.type === "ouinon") champs = `<div class="saisie"><button class="btn ${v[0] === true ? "" : "clair"}" data-oui="1">Oui</button><button class="btn ${v[0] === false ? "" : "clair"}" data-oui="0">Non</button></div>`;
    else champs = `<div class="saisie">${c.champs.map((ch, k) => `<label>${ch.label ? ch.label + " " : ""}<input type="text" ${ch.texte ? "" : 'inputmode="decimal"'} data-v="${k}" value="${v[k] || ""}" aria-label="${ch.label || c.titre}"></label>${unite(ch) ? `<span class="unite">${unite(ch)}</span>` : ""}`).join("")}
      <button class="btn" data-act="verifier">Vérifier</button></div>`;
    return `<section class="controle"><h3>Mon contrôle : ${c.titre}</h3>${champs}${st.verdict ? `<p class="verdict ${st.verdict[0]}">${st.verdict[1]}</p>` : ""}</section>`;
  }

  /* ---------- AU POSTE ---------- */
  function vuePoste() {
    const L = etapes(); S.ici = Math.min(S.ici, L.length - 1);
    const i = S.ici, e = L[i], st = etat(e.id), fait = x => S.etapes[x.id] && S.etapes[x.id].fait;
    const bloque = (e.controle && (!st.verdict || st.verdict[0] === "rouge")) || (e.arret && !st.prof);
    const reste = L.map((x, k) => [x, k]).filter(([x]) => !fait(x));
    vue.innerHTML = blocMachine() + `<div class="poste">
      <nav class="liste" aria-label="Les étapes"><ol>${L.map((x, k) => `<li class="${fait(x) ? "ok" : ""} ${k === i ? "ici" : ""}"><button data-aller="${k}"><span class="n">${k + 1}</span>${sansJe(x.verbe)}${x.arret ? '<span class="stop">ARRÊT</span>' : ""}</button></li>`).join("")}</ol></nav>
      <div><div class="pastilles">${L.map((x, k) => `<button class="${fait(x) ? "ok" : ""} ${k === i ? "ici" : ""}" data-aller="${k}" aria-label="Étape ${k + 1}">${k + 1}</button>`).join("")}</div>
      <article class="carte ${st.fait ? "faite" : ""}">
        <div class="entete"><span class="num">Étape ${i + 1} / ${L.length}</span><h2 class="verbe">${e.verbe}</h2></div>
        <figure class="dessin"></figure>
        <div class="trois"><div><b>Je regarde</b>${e.regarde}</div><div><b>Je fais</b>${e.fais}</div><div><b>Je dois voir</b>${e.voir}</div></div>
        ${e.danger ? `<p class="danger"><b>Danger · </b>${e.danger}</p>` : ""}
        ${blocControle(e, st)}
        ${e.arret ? `<label class="arret"><input type="checkbox" data-act="prof" ${st.prof ? "checked" : ""}><span>Point d'arrêt : j'appelle le professeur<small>${e.arret}</small></span></label>` : ""}
        <div class="bas"><button class="btn clair" data-aller="${Math.max(0, i - 1)}" ${i === 0 ? "disabled" : ""}>← Étape d'avant</button>
          <button class="btn fait" data-act="fait" ${bloque ? "disabled" : ""}>${st.fait ? "Fait ✓ — suivante →" : "C'est fait ✓"}</button></div>
        <p class="reste">${reste.length ? `Ce qui me reste : <b>${reste.length} étape${reste.length > 1 ? "s" : ""}</b> — ${reste.slice(0, 3).map(([x, k]) => (k + 1) + ". " + sansJe(x.verbe)).join(" · ")}${reste.length > 3 ? " …" : ""}` : "<b>Tout est fait.</b> Je passe à « Ma trace »."}</p>
      </article></div></div>`;
    poserDessin(vue.querySelector("figure.dessin"), e, false);
  }

  /* ---------- JE M'ENTRAÎNE ---------- */
  function vueEntr() {
    const L = etapes(); S.entr.ici = Math.min(S.entr.ici, L.length - 1);
    const i = S.entr.ici, e = L[i], ok = S.entr.reussi === e.id;
    vue.innerHTML = `<div class="entr"><article class="carte">
      <div class="entete"><span class="num">Étape ${i + 1} / ${L.length}</span><h2 class="verbe">${e.verbe}</h2></div>
      <p class="consigne">${ok ? "✓ " + e.voir : `Où se fait ce geste ? <span class="toucher">Touchez l'appareil sur le dessin.</span>`}</p>
      <figure class="dessin"></figure>
      <div class="trois"><div><b>Je regarde</b>${e.regarde}</div><div><b>Je fais</b>${e.fais}</div><div><b>Je dois voir</b>${ok ? e.voir : "…"}</div></div>
      ${e.danger && ok ? `<p class="danger"><b>Danger · </b>${e.danger}</p>` : ""}
      <p id="retour" class="verdict" hidden></p>
      <div class="bas"><span class="score">Erreurs de toucher : ${S.entr.erreurs}</span>
        <button class="btn clair" data-entr="${Math.max(0, i - 1)}" ${i === 0 ? "disabled" : ""} aria-label="Étape d'avant">←</button>
        <button class="btn fait" data-entr="${i + 1}" ${ok ? "" : "disabled"}>${i === L.length - 1 ? "Fin : je passe au poste" : "Étape suivante →"}</button></div>
    </article></div>`;
    const svg = poserDessin(vue.querySelector("figure.dessin"), e, true);
    if (ok) { const g = svg.querySelector("#" + e.cible); if (g) g.classList.add("bon"); }
    Object.keys(G.dessin.noms).forEach(id => {
      const g = svg.querySelector("#" + id); if (!g) return;
      g.classList.add("touchable");
      g.addEventListener("click", ev => {
        ev.stopPropagation(); if (S.entr.reussi === e.id) return;
        if (id === e.cible) { S.entr.reussi = e.id; garder(); vueEntr(); return; }
        S.entr.erreurs++; garder();
        const r = document.getElementById("retour"); r.hidden = false; r.className = "verdict ambre";
        r.textContent = "Non, ça c'est " + G.dessin.noms[id] + ". Relis « Je fais ».";
        vue.querySelector(".score").textContent = "Erreurs de toucher : " + S.entr.erreurs;
      });
    });
  }

  /* ---------- MA TRACE ---------- */
  function texteReleve(e, s) {
    const c = e.controle, v = s.valeurs; if (!c || !v) return "";
    if (c.type === "coches") return v.filter(Boolean).length + " / " + c.items.length + " coches";
    if (c.type === "ouinon") return v[0] ? "oui" : "non";
    if (c.type === "choix") return c.options[v[0]];
    return c.champs.map((ch, k) => (ch.label ? ch.label + " " : "") + v[k] + (unite(ch) ? " " + unite(ch) : "")).join(" · ");
  }
  function vueTrace() {
    const L = etapes(), cases = () => [0, 1, 2, 3, 4].map(() => '<td class="n">○</td>').join("");
    const P = PARCOURS.find(p => p.id === S.machine.parcours) || PARCOURS[0];
    const lignes = L.map((e, i) => { const s = S.etapes[e.id] || {};
      const badge = s.verdict ? `<br><span class="badge ${s.verdict[0]}">${{ vert: "cohérent", ambre: "à revoir", rouge: "STOP" }[s.verdict[0]]}</span>` : "";
      return `<tr><td>${i + 1}. ${e.verbe}</td><td>${s.fait ? "✓ " + s.heure : "—"}</td><td>${texteReleve(e, s)}${badge}</td><td>${e.arret ? (s.prof ? "✓ vérifié" : "en attente") : ""}</td></tr>`; }).join("");
    vue.innerHTML = `<article class="carte trace">
      <div class="entete"><h2 class="verbe">Ma trace — ${G.titre}</h2></div>
      <div class="nom"><input id="eleve" placeholder="Mon nom, mon prénom" value="${S.eleve || ""}" aria-label="Mon nom, mon prénom"><input value="${new Date().toLocaleDateString("fr-FR")}" aria-label="Date" readonly></div>
      <p>Niveau : <b>${(NIVEAUX.find(n => n.id === S.machine.niveau) || NIVEAUX[0]).nom}</b> · parcours : <b>${P.nom}</b>. ${G.bilan ? G.bilan(ctx()) : ""}</p>
      <div class="tableau-defile"><table><thead><tr><th>Étape</th><th>Fait à</th><th>Mon relevé</th><th>Professeur</th></tr></thead><tbody>${lignes}</tbody></table></div>
      <h3>Grille du professeur (0 à 4)</h3>
      ${G.exigence ? `<p class="exigence"><b>Pour 4 / 4 :</b> ${parNiveau(G.exigence)}</p>` : ""}
      <div class="tableau-defile"><table class="grille"><thead><tr><th>Ce qui est évalué</th><th>Code</th>${[0, 1, 2, 3, 4].map(n => `<th class="n">${n}</th>`).join("")}</tr></thead>
      <tbody>${G.grille.map(([c, k]) => `<tr><td>${c}</td><td>${parNiveau(k)}</td>${cases()}</tr>`).join("")}
      ${G.savoirEtre ? `<tr><td>Savoir-être : ${G.savoirEtre}</td><td>—</td>${cases()}</tr>` : ""}</tbody></table></div>
      <p class="codes"><b>Référentiel.</b> ${Array.isArray(G.codes) ? G.codes.join("<br>") : parNiveau(G.codes) + (G.codes.commun ? "<br><b>Attendu commun aux deux niveaux :</b> " + G.codes.commun : "")}</p>
      <div class="bas"><button class="btn" data-act="imprimer">Imprimer ma trace</button></div></article>`;
    vue.querySelector("#eleve").oninput = ev => { S.eleve = ev.target.value; garder(); };
  }

  function rendre() {
    const v = (location.hash.match(/vue=(\w+)/) || [])[1] || "poste";
    document.querySelectorAll(".onglets button").forEach(b => b.setAttribute("aria-pressed", b.dataset.vue === v));
    ({ entr: vueEntr, poste: vuePoste, trace: vueTrace }[v] || vuePoste)();
    majAvance();
  }

  /* ---------- les gestes de l'élève ---------- */
  document.querySelector(".onglets").addEventListener("click", ev => { const b = ev.target.closest("button"); if (b) location.hash = "vue=" + b.dataset.vue; });
  vue.addEventListener("click", ev => {
    const b = ev.target.closest("[data-aller],[data-act],[data-oui],[data-entr],[data-parcours],[data-niveau],[data-choix]"); if (!b) return;
    const L = etapes(), e = L[S.ici], st = e ? etat(e.id) : {};
    if (b.dataset.aller !== undefined) S.ici = +b.dataset.aller;
    else if (b.dataset.parcours) { S.machine.parcours = b.dataset.parcours; S.ici = 0; S.entr.ici = 0; }
    else if (b.dataset.niveau) S.machine.niveau = b.dataset.niveau;
    else if (b.dataset.entr !== undefined) {
      const n = +b.dataset.entr;
      if (n >= L.length) { location.hash = "vue=poste"; return; }
      S.entr.ici = n;
    }
    else if (b.dataset.choix !== undefined) { st.valeurs = [+b.dataset.choix]; st.verdict = juger(e, st.valeurs); }
    else if (b.dataset.oui !== undefined) { st.valeurs = [b.dataset.oui === "1"]; st.verdict = juger(e, st.valeurs); }
    else if (b.dataset.act === "verifier") { st.valeurs = [...vue.querySelectorAll(".controle [data-v]")].map(x => x.value.trim()); st.verdict = juger(e, st.valeurs); }
    else if (b.dataset.act === "prof") st.prof = b.checked;
    else if (b.dataset.act === "imprimer") { print(); return; }
    else if (b.dataset.act === "machine") S.machineOuverte = true;
    else if (b.dataset.act === "machine-ok") { G.machine.forEach(c => { S.machine[c.id] = vue.querySelector("#m-" + c.id).value.trim(); }); S.machineOuverte = false; }
    else if (b.dataset.act === "fait") {
      if (!st.fait) { st.fait = true; st.heure = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }); }
      if (S.ici < L.length - 1) S.ici++;
    }
    else return;
    /* les champs de « Ma machine » ouverts gardent ce qui est tapé quand on change de parcours */
    if (b.dataset.parcours || b.dataset.niveau) G.machine.forEach(c => { const x = vue.querySelector("#m-" + c.id); if (x) S.machine[c.id] = x.value.trim(); });
    garder(); rendre();
    if (b.dataset.aller !== undefined || b.dataset.act === "fait" || b.dataset.entr !== undefined) window.scrollTo(0, 0);
  });
  vue.addEventListener("change", ev => {
    if (!ev.target.matches(".coches [data-v]")) return;
    const e = etapes()[S.ici], st = etat(e.id);
    st.valeurs = [...vue.querySelectorAll(".coches [data-v]")].map(c => c.checked);
    st.verdict = juger(e, st.valeurs); garder(); rendre();
  });
  window.addEventListener("hashchange", rendre);
  window.GARE_MOTEUR = { etat: () => S, etapes, rendre };   /* pour le contrôle automatique (qa.mjs) */

  fetch(G.dessin.fichier).then(r => r.text()).then(t => { DESSIN = t; rendre(); })
    .catch(() => { DESSIN = '<p class="sans-dessin">Le dessin du poste ne s\'est pas chargé.</p>'; rendre(); });
})();
