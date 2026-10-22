/* Station « Calculer les déperditions d’une pièce, paroi par paroi » — l’exemple résolu et la pièce à calculer.

   Ce fichier ne contient AUCUN résultat : tout vient de `activity.calculer` (manifest.js), la même
   fonction qui dessine les flèches de la scène (scenes.js, scène `piece`). Les données de la pièce
   sont dans le manifeste ; ici on ne fait que les mettre en page et corriger les réponses.

   Deux entrées, appelées par app.js :
   · exemple(panneau, activite)  — étape Comprendre : le calcul complet d’une salle, sous les trois cases ;
   · exercice(racine, activite)  — étape Manipuler : une pièce à calculer, ligne par ligne, avec un
     guidage qui s’efface (3 = chaque étape écrite avec ses nombres, 0 = rien que les données).
   Aucun stockage, aucune requête : tout reste dans la page. */
(function () {
  "use strict";

  const ech = t => String(t).replace(/[&<>"']/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[c]));
  /* un nombre à la française : virgule, vrai signe moins, deux décimales au plus */
  const fr = n => String(Math.round(n * 100) / 100).replace(".", ",").replace("-", "−");
  /* un nombre négatif entre parenthèses dans une soustraction : 19 − (−11) */
  const frp = n => (n < 0 ? `(${fr(n)})` : fr(n));

  /* D'où viennent les valeurs : le titre du document du fonds, écrit à l'écran. */
  const sourcesHtml = a => `<div class="piece-sources"><p class="piece-source-titre">D’où viennent les valeurs</p><ul>${a.sources.map(([objet, doc]) => `<li><b>${ech(objet)}</b> : ${ech(doc)}</li>`).join("")}</ul></div>`;

  /* Pourquoi le plus gros poste pèse le plus : écrit, pour que « dites pourquoi » ait un appui sur l’écran. */
  const pourquoi = (a, p, r) => {
    if (r.dominant.id === "air") {
      const u = p.parois.find(w => w.id === "mur").u;
      return `Pourquoi : l’air neuf entre à ${fr(a.dehors)} °C et doit être chauffé de ${fr(r.air.dT)} K sur tout son débit (${fr(p.debit)} m³/h), alors que les murs sont petits et isolés (U = ${fr(u)}) : il en passe peu.`;
    }
    return `Pourquoi : ce poste cumule une grande surface et un grand écart de température, ou un U élevé.`;
  };

  /* ---------- l’exemple résolu ---------- */

  function exemple(panneau, a) {
    const p = a.exemple, r = a.calculer(p), f = a.coefAir;
    const w = id => p.parois.find(x => x.id === id);

    const lignes = r.lignes.map(l => {
      const par = w(l.id);
      const surface = `${fr(par.l)} × ${fr(par.h)} = ${fr(l.brute)}` +
        (par.retire ? `<br>− ${ech(par.retire.nom)} ${fr(l.retire)}<br>= <strong>${fr(l.s)}</strong>` : "");
      return `<tr>
        <th scope="row">${ech(l.nom)}</th>
        <td data-l="Surface S (m²)">${surface}</td>
        <td data-l="U">${fr(l.u)}</td>
        <td data-l="Écart ΔT (K)">${fr(a.dedans)} − ${frp(l.autre)} = <strong>${fr(l.dT)}</strong></td>
        <td data-l="Φ = U × S × ΔT (W)">${fr(l.u)} × ${fr(l.s)} × ${fr(l.dT)}<br>= <strong>${fr(l.phi)} W</strong></td>
      </tr>`;
    }).join("");

    const somme = r.lignes.map(l => fr(l.phi)).join(" + ");
    const dom = r.dominant;
    panneau.insertAdjacentHTML("beforeend", `
      <div class="piece-exemple">
        <p class="eyebrow">Exemple résolu · ${ech(p.nom)}</p>
        <p class="piece-donnees">${fr(p.longueur)} m × ${fr(p.largeur)} m, hauteur ${fr(p.hauteur)} m · dedans ${fr(a.dedans)} °C · dehors ${fr(a.dehors)} °C · couloir non chauffé ${fr(p.couloir)} °C · débit d’air imposé ${fr(p.debit)} m³/h</p>
        <table class="piece-tableau">
          <caption>1 · Les parois, une par une</caption>
          <thead><tr><th scope="col">Paroi</th><th scope="col">Surface S (m²)</th><th scope="col">U</th><th scope="col">Écart ΔT (K)</th><th scope="col">Φ = U × S × ΔT</th></tr></thead>
          <tbody>${lignes}</tbody>
          <tfoot><tr><th scope="row" colspan="4">Total des parois</th><td>${somme} = <strong>${fr(r.parois)} W</strong></td></tr></tfoot>
        </table>
        <p class="piece-bloc"><b>2 · L’air renouvelé.</b> Écart : ${fr(a.dedans)} − ${frp(a.dehors)} = ${fr(r.air.dT)} K.
          Φ = ${fr(f)} × ${fr(r.air.debit)} × ${fr(r.air.dT)} = <strong>${fr(r.air.phi)} W</strong></p>
        <p class="piece-bloc piece-total"><b>3 · Le total.</b> ${fr(r.parois)} + ${fr(r.air.phi)} = <strong>${fr(r.total)} W</strong>.
          Le poste le plus lourd : ${ech(dom.nom.charAt(0).toLowerCase() + dom.nom.slice(1))}, ${fr(dom.phi)} W, soit ${fr(r.part)} % du total.</p>
        <p class="piece-note">${ech(pourquoi(a, p, r))}</p>
        <p class="piece-note">Les deux autres murs donnent sur des pièces chauffées à ${fr(a.dedans)} °C : écart nul, rien à compter.</p>
        ${sourcesHtml(a)}
      </div>`);
  }

  /* ---------- la pièce à calculer ---------- */

  const CHAMPS = {
    s: {nom: "Surface S", unite: "m²", tol: 0.05},
    dT: {nom: "Écart ΔT", unite: "K", tol: 0.05},
    phi: {nom: "Φ", unite: "W", tol: 1},
    total: {nom: "Total de la pièce", unite: "W", tol: 2}
  };

  /* Le guidage s’efface : 3 = chaque étape écrite avec ses nombres, 2 = les étapes en mots,
     1 = la formule seule, 0 = rien. Le bouton « Indice » remonte d’un cran à chaque appui. */
  const LIGNES = [
    {id: "mur", titre: "Mur extérieur", niveau: 3, champs: ["s", "dT", "phi"]},
    {id: "fen", titre: "Fenêtre", niveau: 2, champs: ["dT", "phi"]},
    {id: "clo", titre: "Mur côté couloir", niveau: 1, champs: ["s", "dT", "phi"]},
    {id: "air", titre: "L’air renouvelé", niveau: 0, champs: ["dT", "phi"]},
    {id: "tot", titre: "Le total de la pièce", niveau: 0, champs: ["total"]}
  ];

  function lire(texte) {
    const t = String(texte).replace(/[\s ]/g, "").replace(/[−–]/g, "-").replace(",", ".");
    return t === "" ? NaN : Number(t);
  }

  function exercice(racine, a) {
    const p = a.exercice, r = a.calculer(p), f = a.coefAir;
    const par = id => p.parois.find(x => x.id === id);
    const lg = id => r.lignes.find(x => x.id === id);

    /* ce que la bonne réponse vaut, case par case */
    const attendu = {
      mur: {s: lg("mur").s, dT: lg("mur").dT, phi: lg("mur").phi},
      fen: {dT: lg("fen").dT, phi: lg("fen").phi},
      clo: {s: lg("clo").s, dT: lg("clo").dT, phi: lg("clo").phi},
      air: {dT: r.air.dT, phi: r.air.phi},
      tot: {total: r.total}
    };

    /* les données propres à chaque ligne : ce que l’énoncé donne */
    const donnees = id => {
      const TT = `dedans ${fr(a.dedans)} °C, dehors ${fr(a.dehors)} °C`;
      if (id === "mur") { const m = par("mur"); return `Mur : ${fr(m.l)} m × ${fr(m.h)} m, avec une fenêtre de ${fr(m.retire.l)} m × ${fr(m.retire.h)} m · U = ${fr(m.u)} · ${TT}`; }
      if (id === "fen") { const w = par("fen"); return `Fenêtre : ${fr(w.l)} m × ${fr(w.h)} m = ${fr(lg("fen").s)} m² · U = ${fr(w.u)} · ${TT}`; }
      if (id === "clo") { const c = par("clo"); return `Mur côté couloir : ${fr(c.l)} m × ${fr(c.h)} m · U = ${fr(c.u)} · dedans ${fr(a.dedans)} °C, couloir non chauffé à ${fr(p.couloir)} °C`; }
      if (id === "air") return `Débit d’air imposé : ${fr(p.debit)} m³/h · ${TT}`;
      return "Reprenez les résultats des lignes déjà faites (en bas).";
    };

    /* le guide d'une ligne, au niveau demandé */
    const guide = (id, niveau) => {
      const n = Math.min(3, niveau);
      const D = `${fr(a.dedans)} − ${frp(a.dehors)}`;
      const FORMULE = "Φ = U × S × ΔT";
      if (n <= 0) return "";
      if (id === "tot") {
        if (n === 1) return "Total = les parois + l’air.";
        if (n === 2) return "Total = les trois parois + l’air renouvelé.";
        return `Total = ${fr(lg("mur").phi)} + ${fr(lg("fen").phi)} + ${fr(lg("clo").phi)} + ${fr(r.air.phi)} = ?`;
      }
      if (id === "air") {
        if (n === 1) return `Φ = ${fr(f)} × débit × ΔT`;
        if (n === 2) return `1. Écart : dedans moins dehors.<br>2. Φ = ${fr(f)} × débit × ΔT.`;
        return `1. Écart : ${D} = ?<br>2. Φ = ${fr(f)} × ${fr(p.debit)} × ΔT = ?`;
      }
      if (n === 1) return FORMULE;
      const retire = id === "mur";
      if (n === 2) {
        return id === "fen"
          ? `1. Écart : dedans moins dehors.<br>2. ${FORMULE}.`
          : `1. Surface${retire ? ", fenêtre retirée" : " : longueur × hauteur"}.<br>2. Écart : dedans moins ${id === "clo" ? "couloir" : "dehors"}.<br>3. ${FORMULE}.`;
      }
      const m = par(id);
      if (id === "mur") return `1. Surface : ${fr(m.l)} × ${fr(m.h)} − ${fr(m.retire.l)} × ${fr(m.retire.h)} = ${fr(lg("mur").brute)} − ${fr(lg("mur").retire)} = ?<br>2. Écart : ${D} = ?<br>3. Φ = ${fr(m.u)} × S × ΔT = ?`;
      if (id === "fen") return `1. Écart : ${D} = ?<br>2. Φ = ${fr(m.u)} × ${fr(lg("fen").s)} × ΔT = ?`;
      return `1. Surface : ${fr(m.l)} × ${fr(m.h)} = ?<br>2. Écart : ${fr(a.dedans)} − ${fr(p.couloir)} = ? (le couloir, pas le dehors)<br>3. Φ = ${fr(m.u)} × S × ΔT = ?`;
    };

    /* la ligne résolue, montrée après deux essais manqués */
    const solution = id => {
      if (id === "tot") return `Total = ${fr(lg("mur").phi)} + ${fr(lg("fen").phi)} + ${fr(lg("clo").phi)} + ${fr(r.air.phi)} = ${fr(r.total)} W`;
      if (id === "air") return `Écart ${fr(r.air.dT)} K · Φ = ${fr(f)} × ${fr(p.debit)} × ${fr(r.air.dT)} = ${fr(r.air.phi)} W`;
      const l = lg(id), m = par(id);
      const s = id === "mur" ? `Surface : ${fr(l.brute)} − ${fr(l.retire)} = ${fr(l.s)} m² · ` : id === "clo" ? `Surface : ${fr(m.l)} × ${fr(m.h)} = ${fr(l.s)} m² · ` : "";
      return `${s}Écart ${fr(a.dedans)} − ${frp(l.autre)} = ${fr(l.dT)} K · Φ = ${fr(l.u)} × ${fr(l.s)} × ${fr(l.dT)} = ${fr(l.phi)} W`;
    };

    /* Pourquoi une case est fausse : on teste les erreurs que font vraiment les élèves. */
    const proche = (x, y, tol) => Math.abs(x - y) <= (tol || 1);
    const diagnostic = (id, champ, v, saisies) => {
      if (id === "mur" && champ === "s") {
        if (proche(v, lg("mur").brute, 0.05)) return "La fenêtre est encore dans le mur : retirez sa surface.";
        if (proche(v, lg("mur").brute + lg("mur").retire, 0.05)) return "La fenêtre se retire du mur, elle ne s’ajoute pas.";
        return "Surface du mur = longueur × hauteur, moins la fenêtre.";
      }
      if (champ === "s") return "Surface = longueur × hauteur.";
      if (champ === "dT") {
        const autre = id === "clo" ? p.couloir : a.dehors;
        if (id === "clo" && proche(v, a.dedans - a.dehors, 0.05)) return "Ce mur donne sur le couloir, pas sur le dehors : prenez la température du couloir.";
        if (proche(v, a.dedans + autre, 0.05) && autre < 0) return `Attention au signe : ${fr(a.dedans)} − ${frp(autre)} = ${fr(a.dedans)} + ${fr(-autre)}.`;
        return `Écart = dedans moins ${id === "clo" ? "couloir" : "dehors"}.`;
      }
      if (champ === "phi" && id === "air") {
        if (proche(v, p.debit * r.air.dT, 2)) return `Il manque le ${fr(f)}.`;
        if (proche(v, f * p.debit * r.air.dT / 3600, 0.5)) return "Ne divisez pas par 3 600 : le 0,34 en tient déjà compte.";
        return `Φ = ${fr(f)} × débit × ΔT.`;
      }
      if (champ === "phi") {
        const l = lg(id);
        /* l’erreur de surface ou d’écart déjà faite plus haut, puis un calcul juste avec elle */
        const s = saisies.s, d = saisies.dT;
        if ((s !== undefined && !proche(s, l.s, CHAMPS.s.tol)) || (d !== undefined && !proche(d, l.dT, CHAMPS.dT.tol))) {
          const sv = s !== undefined ? s : l.s, dv = d !== undefined ? d : l.dT;
          if (proche(v, l.u * sv * dv, 1)) return "Votre produit est juste avec vos valeurs : corrigez d’abord la surface ou l’écart.";
        }
        if (id === "mur" && proche(v, l.u * l.brute * l.dT, 1)) return "Vous avez compté la fenêtre dans le mur.";
        if (id === "clo" && proche(v, l.u * l.s * (a.dedans - a.dehors), 1)) return "Vous avez pris l’écart du dehors : ce mur donne sur le couloir.";
        if (proche(v, l.s * l.dT, 1)) return "Il manque U dans le produit.";
        return "Φ = U × S × ΔT : multipliez les trois nombres.";
      }
      if (champ === "total") {
        if (proche(v, r.parois, 2)) return "Il manque l’air renouvelé.";
        if (proche(v, r.air.phi, 2)) return "Il manque les parois.";
        return "Total = les trois parois + l’air renouvelé.";
      }
      return "";
    };

    /* L'état reste sur l'activité : l'élève qui va relire l'exemple à l'étape Comprendre retrouve sa pièce en l'état. */
    const etat = a.__piece || (a.__piece = {i: 0, essais: 0, indices: 0, fini: [], termine: false});

    function champHtml(id, champ) {
      const c = CHAMPS[champ];
      return `<label class="piece-champ" for="pc-${id}-${champ}"><span>${c.nom} <small>(${c.unite})</small></span>
        <input id="pc-${id}-${champ}" data-champ="${champ}" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" aria-describedby="pc-retour"></label>`;
    }

    function resumeHtml() {
      if (!etat.fini.length) return "";
      return `<ul class="piece-resume" aria-label="Lignes déjà faites">${etat.fini.map(x => {
        const L = LIGNES[x.i], v = attendu[L.id];
        const valeur = L.id === "tot" ? r.total : v.phi;
        return `<li class="${x.juste ? "juste" : "corrige"}"><span>${x.juste ? "✓" : "↺"} ${ech(L.titre)}</span><strong>${fr(valeur)} W</strong><em>${x.juste ? "juste" : "corrigée"}</em></li>`;
      }).join("")}</ul>`;
    }

    function bilan() {
      const nj = etat.fini.filter(x => x.juste).length;
      const d = r.dominant;
      return `<div class="piece-bilan"><h3>Pièce terminée</h3>
        <p>Total de la pièce « ${ech(p.nom)} » : <strong>${fr(r.total)} W</strong>. Lignes justes sans reprise : ${nj} sur ${LIGNES.length}.</p>
        <p>Poste le plus lourd : ${ech(d.nom.charAt(0).toLowerCase() + d.nom.slice(1))}, ${fr(d.phi)} W, soit ${fr(r.part)} % du total.</p>
        <p>${ech(pourquoi(a, p, r))}</p>
        <p>Dites-le à voix haute avec vos mots, puis passez à l’étape Vérifier.</p>
        <button type="button" id="pc-recommencer">Recommencer la pièce</button></div>`;
    }

    function afficher() {
      const fini = etat.i >= LIGNES.length;
      const L = LIGNES[Math.min(etat.i, LIGNES.length - 1)];
      let corps;
      if (fini) corps = bilan();
      else {
        const niveau = Math.min(3, L.niveau + etat.indices);
        const g = guide(L.id, niveau);
        corps = `<section class="piece-ligne-q" aria-labelledby="pc-titre">
          <h3 id="pc-titre"><span class="piece-rang">Ligne ${etat.i + 1} sur ${LIGNES.length}</span> ${ech(L.titre)}</h3>
          <p class="piece-donnee">${ech(donnees(L.id))}</p>
          <div class="piece-guide" data-niveau="${niveau}" ${g ? "" : "hidden"}>${g}</div>
          <div class="piece-champs">${L.champs.map(c => champHtml(L.id, c)).join("")}</div>
          <p id="pc-retour" class="feedback piece-retour" aria-live="polite"></p>
          <div class="piece-actions">
            <button type="button" id="pc-verifier" class="primary">Vérifier la ligne</button>
            <button type="button" id="pc-indice" ${niveau >= 3 ? "hidden" : ""}>Indice</button>
            <button type="button" id="pc-suivant" class="primary" hidden>${etat.i === LIGNES.length - 1 ? "Voir le bilan" : "Ligne suivante →"}</button>
          </div>
        </section>`;
      }
      const plan = window.AEROREZO_SCENES ? window.AEROREZO_SCENES.rendre("piece", "", {...a, piece: a.exercice, plan: true}) : "";
      racine.innerHTML = `<div id="calcResult" class="result piece-resultat"></div>
        <div class="piece-exo">${fini ? "" : plan}${corps}${resumeHtml()}${sourcesHtml(a)}</div>`;
      majResultat();
      if (!fini) brancher(L);
      else racine.querySelector("#pc-recommencer").onclick = () => { etat.i = 0; etat.essais = 0; etat.indices = 0; etat.fini = []; etat.termine = false; afficher(); };
    }

    function majResultat() {
      const el = racine.querySelector("#calcResult");
      const n = etat.fini.length;
      if (etat.i >= LIGNES.length) el.textContent = `Total de la pièce : ${fr(r.total)} W.`;
      else el.textContent = n ? `Lignes faites : ${n} sur ${LIGNES.length}. Total de la pièce : à la dernière ligne.` : `Pièce « ${p.nom} » : ${LIGNES.length} lignes à faire, une à la fois.`;
    }

    function brancher(L) {
      const retour = racine.querySelector("#pc-retour");
      const champs = [...racine.querySelectorAll(".piece-champs input")];
      const verifier = racine.querySelector("#pc-verifier");
      const suivant = racine.querySelector("#pc-suivant");
      const indice = racine.querySelector("#pc-indice");
      const attendus = attendu[L.id];

      champs.forEach(inp => inp.addEventListener("keydown", e => {
        if (e.key === "Enter") { e.preventDefault(); verifier.click(); }
      }));

      indice.onclick = () => {
        etat.indices++;
        const niveau = Math.min(3, L.niveau + etat.indices);
        const g = racine.querySelector(".piece-guide");
        g.innerHTML = guide(L.id, niveau); g.dataset.niveau = niveau; g.hidden = !g.innerHTML;
        if (niveau >= 3) indice.hidden = true;
      };

      /* une ligne faite reste affichée, résolue et verrouillée, tant qu'on n'a pas cliqué sur « Ligne suivante » */
      const verrouiller = () => {
        champs.forEach(inp => { inp.value = fr(attendus[inp.dataset.champ]); inp.disabled = true; inp.classList.add("correct"); });
        verifier.hidden = true; indice.hidden = true; suivant.hidden = false;
      };
      const terminer = juste => {
        etat.fini.push({i: etat.i, juste});
        etat.termine = true;
        verrouiller();
        suivant.focus();
        majResultat();
      };
      if (etat.termine) {
        verrouiller();
        if (etat.fini[etat.fini.length - 1].juste) { retour.className = "feedback piece-retour ok"; retour.textContent = "Ligne juste."; }
        else { retour.className = "feedback piece-retour ko"; retour.innerHTML = `<b>Voici la ligne résolue.</b><br>${ech(solution(L.id))}`; }
      }

      suivant.onclick = () => { etat.i++; etat.essais = 0; etat.indices = 0; etat.termine = false; afficher(); const prochain = racine.querySelector(".piece-champs input"); if (prochain) prochain.focus(); };

      verifier.onclick = () => {
        const saisies = {};
        for (const inp of champs) saisies[inp.dataset.champ] = lire(inp.value);
        if (champs.some(i => Number.isNaN(saisies[i.dataset.champ]))) {
          retour.textContent = "Remplissez toutes les cases de cette ligne, avec des nombres.";
          retour.className = "feedback piece-retour";
          return;
        }
        const messages = [];
        let tout = true;
        for (const inp of champs) {
          const c = inp.dataset.champ, bon = proche(saisies[c], attendus[c], CHAMPS[c].tol);
          inp.classList.toggle("correct", bon); inp.classList.toggle("wrong", !bon);
          inp.setAttribute("aria-invalid", String(!bon));
          if (!bon) { tout = false; messages.push(`${CHAMPS[c].nom} : ${diagnostic(L.id, c, saisies[c], saisies)}`); }
        }
        if (tout) {
          retour.className = "feedback piece-retour ok";
          retour.textContent = "Juste. " + (etat.essais ? "Cette fois, c’est bon." : "Du premier coup.");
          terminer(etat.essais === 0);
          return;
        }
        etat.essais++;
        if (etat.essais >= 2) {
          retour.className = "feedback piece-retour ko";
          retour.innerHTML = `<b>Voici la ligne résolue.</b><br>${ech(solution(L.id))}`;
          champs.forEach(inp => { const c = inp.dataset.champ; inp.value = fr(attendus[c]); inp.classList.remove("wrong"); inp.classList.add("correct"); });
          terminer(false);
          return;
        }
        retour.className = "feedback piece-retour ko";
        retour.innerHTML = `<b>À reprendre.</b> ${messages.map(ech).join("<br>")}`;
      };
    }

    afficher();
  }

  window.AEROREZO_PIECE = {exemple, exercice};
})();
