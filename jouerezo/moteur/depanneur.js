/* =====================================================================
   depanneur.js — « Le dépanneur » : le simulateur de panne
   ---------------------------------------------------------------------
   RÔLE : jouer les cas de donnees/depanneur.js. Pour chaque cas :
   le symptôme en faits, les réponses du client, l'installation animée
   (le fluide circule), et une boîte à relevés — comme sur le chantier :
   manifold BP, manifold HP, thermomètre (aspiration, liquide, refoulement),
   voyant, évaporateur, condenseur, toucher, pince ampèremétrique. Chaque
   relevé s'ouvre d'un toucher et compte dans le « coefficient d'efficacité »
   (moins de relevés inutiles = meilleur coefficient, comme Frigodiag).
   LES PRESSIONS SE LISENT SUR LE CADRAN (échelle en bar, couronnes R-134a
   et R-404A, port du générateur de l'interro n° 3 de 1re MFER) ; le
   thermomètre est électronique (afficheur « °C », sonde pincée) ; jamais
   deux cadrans jumeaux. Quand la BP et le thermomètre d'aspiration sont
   relevés, le bouton « surchauffe » pose les deux questions de la méthode
   (température de saturation sur la couronne, puis l'écart) ; même chose
   pour le sous-refroidissement côté HP. Puis « Conclure » : la panne parmi
   huit, correction avec la signature, la preuve, les actions.
   DÉPEND : JR (commun.js), JR_DEPANNEUR, window.ManoPubCerveau
   (../rezotools/calculettes/cerveau_v5.js : tables CoolProp — tablePsat
   en bar ABSOLU, rosée côté BP, bulle côté HP). Patm = 1,013 bar.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.JR_DEPANNEUR, PATM = 1.01325;
  const CAS_PAR_PARTIE = 3;
  const NS = "http://www.w3.org/2000/svg";
  const COULEUR = { "R-134a": "#1d5f99", "R-404A": "#a04f00" };
  const CADRANS = {
    BP: { vmin: -1, vmax: 10, pas: [1, 0.5, 0.1], rosee: true, bague: "#1f6fa8", nom: "BP", couronnes: [["R-134a", "R134a", -40, 30], ["R-404A", "R404A", -50, 20]] },
    HP: { vmin: -1, vmax: 30, pas: [5, 1, 0.5], rosee: false, bague: "#b3261e", nom: "HP", couronnes: [["R-134a", "R134a", 0, 70], ["R-404A", "R404A", 0, 60]] }
  };
  const RCOUR = [93, 64], C0 = 160;

  function cerveau() { return window.ManoPubCerveau; }
  function pRel(fluide, t, rosee) { const c = cerveau(); return c ? c.tablePsat(fluide, t, rosee) - PATM : NaN; }
  const virg = (x, d) => { const s = (Math.round(x * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d).replace(".", ","); return s.replace("-", "−"); };
  const temp = t => (t < 0 ? "−" + (-t) : "" + t) + " °C";
  /* une température dans un calcul : les négatives entre parenthèses (« −3 °C − (−10 °C) ») */
  const signe = t => (t < 0 ? "(−" + (-t) + " °C)" : t + " °C");
  const kelvin = k => virg(k, 0) + " K";

  /* ---------- le cadran du manomètre (port de generer-interro-03-manometres.py) ---------- */
  function angle(p, cfg) { return -135 + 270 * (p - cfg.vmin) / (cfg.vmax - cfg.vmin); }
  function point(r, deg) { const a = deg * Math.PI / 180; return [C0 + r * Math.sin(a), C0 - r * Math.cos(a)]; }
  function cadran(cote, p) {
    const cfg = CADRANS[cote], [majeur, moyen, mineur] = cfg.pas, s = [];
    s.push('<svg viewBox="0 0 320 320" class="cadran" role="img" aria-label="Manomètre ' + cote + ' : échelle en bar, couronnes R-134a et R-404A">');
    s.push('<circle cx="160" cy="160" r="153" fill="' + cfg.bague + '"/><circle cx="160" cy="160" r="143" fill="#fdfdfb" stroke="#22303f" stroke-width="1.5"/>');
    const n = Math.round((cfg.vmax - cfg.vmin) / mineur);
    for (let k = 0; k <= n; k++) {
      const v = Math.round((cfg.vmin + k * mineur) * 1000) / 1000;
      const est = pas => Math.abs(v / pas - Math.round(v / pas)) < 1e-6;
      const [long, ep] = est(majeur) ? [14, 2.6] : est(moyen) ? [11, 1.7] : [6, 1.0];
      const [x1, y1] = point(140, angle(v, cfg)), [x2, y2] = point(140 - long, angle(v, cfg));
      s.push('<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="#22303f" stroke-width="' + ep + '"/>');
      if (est(majeur)) { const [xl, yl] = point(115, angle(v, cfg)); s.push('<text x="' + xl.toFixed(1) + '" y="' + yl.toFixed(1) + '" font-size="18" font-weight="bold" font-family="Calibri,Arial,sans-serif" fill="#22303f" text-anchor="middle" dominant-baseline="central">' + String(Math.round(v)).replace("-", "−") + '</text>'); }
    }
    cfg.couronnes.forEach(function (cour, idx) {
      const [nom, fluide, tmin, tmax] = cour, r = RCOUR[idx], coul = COULEUR[nom], pts = [];
      for (let t = tmin; t <= tmax; t += 2) { const pp = pRel(fluide, t, cfg.rosee); if (pp >= cfg.vmin && pp <= cfg.vmax) pts.push([t, angle(pp, cfg)]); }
      if (!pts.length) return;
      const a0 = pts[0][1], a1 = pts[pts.length - 1][1], [xa, ya] = point(r, a0), [xb, yb] = point(r, a1);
      s.push('<path d="M ' + xa.toFixed(1) + ' ' + ya.toFixed(1) + ' A ' + r + ' ' + r + ' 0 ' + (a1 - a0 > 180 ? 1 : 0) + ' 1 ' + xb.toFixed(1) + ' ' + yb.toFixed(1) + '" fill="none" stroke="' + coul + '" stroke-width="1.4"' + (nom === "R-404A" ? ' stroke-dasharray="4 3"' : "") + '/>');
      let dernier = null; const chiffres = [];
      pts.forEach(function (pt) {
        const [t, a] = pt, dix = t % 10 === 0;
        if (dernier !== null && (a - dernier) * Math.PI / 180 * r < 5 && !dix) return;
        dernier = a;
        const [x1, y1] = point(r, a), [x2, y2] = point(r + (dix ? 8 : 5), a);
        s.push('<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="' + coul + '" stroke-width="' + (dix ? 1.8 : 1.1) + '"/>');
        if (dix) chiffres.push([t, a]);
      });
      /* les chiffres de dizaine, sauf celui que l'aiguille traverse (il se lirait de travers) */
      const aAig = angle(p, cfg);
      chiffres.forEach(function (ch) {
        const [t, a] = ch; if (Math.abs(a - aAig) < 7) return;
        const [xl, yl] = point(r - 12, a), lib = t === 0 ? "0" : (t > 0 ? "+" + t : "−" + (-t));
        s.push('<text x="' + xl.toFixed(1) + '" y="' + yl.toFixed(1) + '" font-size="15" font-weight="bold" font-family="Calibri,Arial,sans-serif" fill="' + coul + '" text-anchor="middle" dominant-baseline="central">' + lib + '</text>');
      });
      const rt = r + 4, [xd, yd] = point(rt, a0 % 360 - 6), [xf, yf] = point(rt, 183), ident = "nom-" + cote + "-" + r + "-" + Math.random().toString(36).slice(2, 6);
      s.push('<path id="' + ident + '" d="M ' + xd.toFixed(1) + ' ' + yd.toFixed(1) + ' A ' + rt + ' ' + rt + ' 0 0 0 ' + xf.toFixed(1) + ' ' + yf.toFixed(1) + '" fill="none"/><text font-size="13" font-weight="bold" font-family="Calibri,Arial,sans-serif" fill="' + coul + '"><textPath href="#' + ident + '">' + nom + ' °C</textPath></text>');
    });
    s.push('<text x="160" y="202" font-size="24" font-weight="bold" font-family="Trebuchet MS,Arial,sans-serif" fill="' + cfg.bague + '" text-anchor="middle" dominant-baseline="central">' + cfg.nom + '</text>');
    s.push('<text x="160" y="287" font-size="14" font-family="Calibri,Arial,sans-serif" fill="#22303f" text-anchor="middle" dominant-baseline="central">bar</text>');
    const a = angle(p, cfg), [xt, yt] = point(134, a), [xg, yg] = point(4.5, a - 90), [xd2, yd2] = point(4.5, a + 90), [xq, yq] = point(24, a + 180);
    s.push('<path class="aiguille" d="M ' + xt.toFixed(1) + ' ' + yt.toFixed(1) + ' L ' + xg.toFixed(1) + ' ' + yg.toFixed(1) + ' L ' + xq.toFixed(1) + ' ' + yq.toFixed(1) + ' L ' + xd2.toFixed(1) + ' ' + yd2.toFixed(1) + ' Z" fill="#1a1a1a"/>');
    s.push('<circle cx="160" cy="160" r="10" fill="#333"/><circle cx="160" cy="160" r="3.5" fill="#bbb"/></svg>');
    return s.join("");
  }

  /* ---------- le thermomètre électronique (modèle mano-thermo-distincts.svg) ---------- */
  function thermo(t, ou) {
    return '<svg viewBox="0 0 300 250" class="thermo" role="img" aria-label="Thermomètre électronique, sonde ' + JR.esc(ou) + ' : ' + JR.esc(temp(t)) + '">' +
      '<rect x="40" y="10" width="200" height="150" rx="18" fill="#1b3a63"/>' +
      '<rect x="58" y="28" width="164" height="64" rx="8" fill="#eaf2e6" stroke="#0f2440" stroke-width="3"/>' +
      '<text x="140" y="62" font-size="36" font-weight="bold" font-family="Consolas,monospace" fill="#1b3a63" text-anchor="middle" dominant-baseline="central">' + JR.esc(virg(t, 1)) + '</text>' +
      '<text x="200" y="62" font-size="22" font-weight="bold" font-family="Calibri,Arial,sans-serif" fill="#1b3a63" text-anchor="middle" dominant-baseline="central">°C</text>' +
      '<circle cx="90" cy="120" r="9" fill="#84b7ec"/><circle cx="140" cy="120" r="9" fill="#d17d43"/><circle cx="190" cy="120" r="9" fill="#fffdf8"/>' +
      '<rect x="70" y="140" width="140" height="6" rx="3" fill="#3d7fca"/>' +
      '<path d="M 140 160 C 140 200 90 190 70 215" stroke="#0f2440" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      '<rect x="20" y="205" width="200" height="22" rx="11" fill="#c08347" stroke="#855425" stroke-width="3"/>' +
      '<rect x="56" y="196" width="28" height="36" rx="5" fill="#1b3a63"/><circle cx="70" cy="210" r="4" fill="#84b7ec"/>' +
      '<text x="150" y="243" font-size="13" font-family="Calibri,Arial,sans-serif" fill="#637285" text-anchor="middle">' + JR.esc(ou) + '</text></svg>';
  }

  /* ---------- l'installation animée ---------- */
  function circuit(etat) {
    const LIB = "illustrations/bibliotheque/";
    return '<svg viewBox="0 0 480 300" class="installation" role="img" aria-label="Le circuit frigorifique : compresseur à droite, condenseur en haut, détendeur à gauche, évaporateur en bas ; le fluide circule.">' +
      '<path class="tuyau hp-vap" d="M 360 150 V 60 H 300"/><path class="tuyau hp-liq" d="M 180 60 H 120 V 150"/>' +
      '<path class="tuyau bp-mel" d="M 120 150 V 240 H 180"/><path class="tuyau bp-vap" d="M 300 240 H 360 V 150"/>' +
      '<rect x="205" y="32" width="70" height="56" fill="#fffdf8"/><image href="' + LIB + 'frigo_schema/echangeur_a_air.svg" x="205" y="32" width="70" height="56"/>' +
      '<rect x="330" y="120" width="60" height="60" fill="#fffdf8"/><image href="' + LIB + 'frigo_schema/compresseur_general.svg" x="330" y="120" width="60" height="60"/>' +
      '<rect x="205" y="212" width="70" height="56" fill="#fffdf8"/><image href="' + LIB + 'frigo_schema/echangeur_a_air.svg" x="205" y="212" width="70" height="56"/>' +
      '<rect x="90" y="120" width="60" height="60" fill="#fffdf8"/><image href="' + LIB + 'frigo_schema/detendeur_thermo_int.svg" x="90" y="120" width="60" height="60"/>' +
      '<text x="240" y="20" class="lib">condenseur</text><text x="360" y="200" class="lib">compresseur</text><text x="240" y="290" class="lib">évaporateur</text><text x="120" y="200" class="lib">détendeur</text>' +
      '<g class="points">' +
      '<circle cx="330" cy="240" r="9" class="pt" data-pt="bp"/><text x="330" y="262" class="pt-lib">BP · aspiration</text>' +
      '<circle cx="150" cy="60" r="9" class="pt" data-pt="hp"/><text x="150" y="48" class="pt-lib">HP · liquide</text>' +
      '<circle cx="360" cy="90" r="9" class="pt" data-pt="ref"/><text x="400" y="94" class="pt-lib">refoulement</text>' +
      '</g></svg>';
  }

  /* ---------- la partie ---------- */
  function demarrer(theme, main) {
    const cas = JR.tirer(theme.cas, Math.min(CAS_PAR_PARTIE, theme.cas.length));
    let i = 0, points = 0, total = 0;

    function jouerCas() {
      const c = cas[i], inst = D.plages[c.inst], pl = inst;
      const bp = pRel(inst.fluide, c.tEvap, true), hp = pRel(inst.fluide, c.tCond, false);
      const sr = c.tAsp - c.tEvap, sc = c.tCond - c.tLiq;
      const releves = new Set(); let srTrouve = null, scTrouve = null, bonus = 0;
      main.innerHTML =
        '<h1>' + JR.esc(theme.emoji + " " + theme.nom) + '</h1>' +
        '<div class="bord"><span>Situation ' + (i + 1) + ' / ' + cas.length + '</span><span>Points : ' + points + '</span><span>Relevés : <span id="d-nb">0</span></span></div>' +
        '<section class="carte dep-cas"><p class="eyebrow">' + JR.esc(inst.nom + " · " + inst.fluideNom + " · consigne " + inst.consigne) + '</p>' +
        '<p class="question">' + JR.esc(c.symptome) + '</p>' +
        '<p class="legende"><strong>Le client :</strong> ' + JR.esc(c.client) + '</p>' +
        '<p class="legende">Repères pour cette installation : évaporation ' + temp(pl.tEvap[0]) + ' à ' + temp(pl.tEvap[1]) + ' · condensation ' + temp(pl.tCond[0]) + ' à ' + temp(pl.tCond[1]) + ' · surchauffe ' + pl.sr[0] + ' à ' + pl.sr[1] + ' K · sous-refroidissement ' + pl.sc[0] + ' à ' + pl.sc[1] + ' K.</p></section>' +
        '<section class="carte"><div class="dep-circuit">' + circuit() + '</div>' +
        '<p class="legende">Choisissez vos relevés, comme sur le chantier. Chaque relevé compte : un bon dépanneur mesure ce qui départage ses hypothèses.</p>' +
        '<div class="dep-outils" role="group" aria-label="Relevés possibles">' +
        [["bp", "Manifold BP"], ["hp", "Manifold HP"], ["tasp", "Thermomètre aspiration"], ["tliq", "Thermomètre ligne liquide"], ["tref", "Thermomètre refoulement"], ["voyant", "Voyant liquide"], ["evap", "Regarder l'évaporateur"], ["cond", "Regarder le condenseur"], ["toucher", "Toucher les tubes"], ["pince", "Pince ampèremétrique"]]
          .map(o => '<button type="button" class="btn sec outil" data-o="' + o[0] + '">' + JR.esc(o[1]) + '</button>').join("") +
        '</div><div id="d-releve" class="dep-releve" aria-live="polite"></div>' +
        '<div class="dep-methode" id="d-methode"></div>' +
        '<div class="actions"><button type="button" class="btn" id="d-conclure">Conclure : nommer la panne</button></div></section>' +
        '<div id="d-retour"></div>';
      const zone = main.querySelector("#d-releve"), meth = main.querySelector("#d-methode");

      function compter(o) { if (!releves.has(o)) { releves.add(o); main.querySelector("#d-nb").textContent = releves.size; } }
      function montrer(o) {
        JR.sons.tap(); compter(o);
        main.querySelectorAll(".pt").forEach(p => p.classList.toggle("actif", (o === "bp" && p.dataset.pt === "bp") || (o === "hp" && p.dataset.pt === "hp") || (o === "tref" && p.dataset.pt === "ref") || (o === "tasp" && p.dataset.pt === "bp") || (o === "tliq" && p.dataset.pt === "hp")));
        const H = {
          bp: '<div class="instrument">' + cadran("BP", bp) + '<p>Manifold branché sur l\'aspiration. Lisez la pression en bar, puis la température d\'évaporation sur la couronne <strong>' + JR.esc(inst.fluideNom) + '</strong>.</p></div>',
          hp: '<div class="instrument">' + cadran("HP", hp) + '<p>Manifold branché côté liquide. Lisez la pression en bar, puis la température de condensation sur la couronne <strong>' + JR.esc(inst.fluideNom) + '</strong>.</p></div>',
          tasp: '<div class="instrument">' + thermo(c.tAsp, "sonde pincée sur l'aspiration, à la sortie de l'évaporateur") + '</div>',
          tliq: '<div class="instrument">' + thermo(c.tLiq, "sonde pincée sur la ligne liquide, à la sortie du condenseur") + '</div>',
          tref: '<div class="instrument">' + thermo(c.tRef, "sonde pincée sur le refoulement du compresseur") + '</div>',
          voyant: '<p class="observation"><strong>Voyant liquide :</strong> ' + JR.esc(c.voyant) + '.</p>',
          evap: '<p class="observation"><strong>Évaporateur :</strong> ' + JR.esc(c.evap) + '.</p>',
          cond: '<p class="observation"><strong>Condenseur :</strong> ' + JR.esc(c.cond) + '.</p>',
          toucher: '<p class="observation"><strong>Au toucher :</strong> ' + JR.esc(c.toucher) + '.</p>',
          pince: '<p class="observation"><strong>Pince ampèremétrique sur le compresseur :</strong> ' + c.intensite + ' % de l\'intensité nominale de la plaque.</p>'
        };
        zone.innerHTML = H[o];
        methode();
      }
      main.querySelectorAll(".outil").forEach(b => b.addEventListener("click", () => montrer(b.dataset.o)));
      main.querySelectorAll(".pt").forEach(p => p.addEventListener("click", () => montrer(p.dataset.pt === "ref" ? "tref" : p.dataset.pt)));

      /* la méthode : surchauffe quand BP + aspiration sont relevés, sous-refroidissement quand HP + liquide */
      function methode() {
        let html = "";
        if (releves.has("bp") && releves.has("tasp")) html += srTrouve === null ? '<button type="button" class="btn sec" id="d-sr">Calculer la surchauffe</button>' : '<p class="retour ok"><strong>✓ Surchauffe : ' + kelvin(sr) + '</strong>' + JR.esc(signe(c.tAsp) + " à l'aspiration − " + signe(c.tEvap) + " d'évaporation (couronne). Plage : " + pl.sr[0] + " à " + pl.sr[1] + " K → " + (sr > pl.sr[1] ? "ÉLEVÉE" : sr < pl.sr[0] ? "FAIBLE" : "normale") + ".") + '</p>';
        if (releves.has("hp") && releves.has("tliq")) html += scTrouve === null ? '<button type="button" class="btn sec" id="d-sc">Calculer le sous-refroidissement</button>' : '<p class="retour ok"><strong>✓ Sous-refroidissement : ' + kelvin(sc) + '</strong>' + JR.esc(signe(c.tCond) + " de condensation (couronne) − " + signe(c.tLiq) + " sur la ligne liquide. Plage : " + pl.sc[0] + " à " + pl.sc[1] + " K → " + (sc > pl.sc[1] ? "ÉLEVÉ" : sc < pl.sc[0] ? "FAIBLE" : "normal") + ".") + '</p>';
        meth.innerHTML = html;
        const bsr = meth.querySelector("#d-sr"), bsc = meth.querySelector("#d-sc");
        if (bsr) bsr.addEventListener("click", () => miniQuiz("sr"));
        if (bsc) bsc.addEventListener("click", () => miniQuiz("sc"));
      }
      /* deux questions, trois réponses : la température de saturation lue sur la couronne, puis l'écart */
      function miniQuiz(quoi) {
        const tsat = quoi === "sr" ? c.tEvap : c.tCond, mesure = quoi === "sr" ? c.tAsp : c.tLiq, ecart = quoi === "sr" ? sr : sc;
        const q1 = { q: "Sur la couronne " + inst.fluideNom + " du manomètre " + (quoi === "sr" ? "BP" : "HP") + ", la température de saturation est…", ok: temp(tsat), nok: [temp(tsat + (quoi === "sr" ? 6 : -6)), temp(tsat + (quoi === "sr" ? -8 : 8))] };
        const q2 = { q: (quoi === "sr" ? "Surchauffe = T aspiration − T évaporation. Avec " + temp(mesure) + " à l'aspiration, elle vaut…" : "Sous-refroidissement = T condensation − T liquide. Avec " + temp(mesure) + " sur la ligne liquide, il vaut…"), ok: kelvin(ecart), nok: [kelvin(ecart + 6), kelvin(Math.max(0, ecart - 5))] };
        let etape = 0, fautes = 0;
        function poser(q) {
          const rep = JR.melanger([{ t: q.ok, ok: true }].concat(q.nok.map(n => ({ t: n, ok: false }))));
          meth.innerHTML = '<p class="question">' + JR.esc(q.q) + '</p><div class="reponses">' + rep.map((r, k) => '<button type="button" class="reponse" data-k="' + k + '">' + JR.esc(r.t) + '</button>').join("") + '</div>';
          meth.querySelectorAll(".reponse").forEach(b => b.addEventListener("click", function () {
            const k = Number(b.dataset.k);
            if (rep[k].ok) { JR.sons.ok(); if (etape === 0) { etape = 1; poser(q2); } else { if (fautes === 0) { points++; total++; } else total++; if (quoi === "sr") srTrouve = sr; else scTrouve = sc; methode(); } }
            else { JR.sons.nok(); fautes++; b.classList.add("nok"); b.disabled = true; }
          }));
        }
        total += 0; poser(q1);
      }

      main.querySelector("#d-conclure").addEventListener("click", function () {
        JR.sons.tap();
        const r = main.querySelector("#d-retour");
        r.innerHTML = '<section class="carte"><p class="question">Quelle est la panne ?</p><div class="reponses">' +
          D.choixPannes.map(id => '<button type="button" class="reponse" data-p="' + id + '">' + JR.esc(D.pannes[id].nom) + '</button>').join("") + '</div><div id="d-correction"></div></section>';
        r.scrollIntoView({ behavior: "smooth", block: "start" });
        r.querySelectorAll(".reponse").forEach(b => b.addEventListener("click", function () {
          const juste = b.dataset.p === c.panne; total += 4;
          r.querySelectorAll(".reponse").forEach(x => { x.disabled = true; if (x.dataset.p === c.panne) { x.classList.add("ok"); x.textContent = "✓ " + x.textContent; } else if (x === b) { x.classList.add("nok"); x.textContent = "✗ " + x.textContent; } });
          if (juste) { points += 4; JR.sons.ok(); if (releves.size <= 5) { points++; total++; bonus = 1; } else total++; } else { JR.sons.nok(); total++; }
          const P = D.pannes[c.panne];
          r.querySelector("#d-correction").innerHTML =
            '<p class="retour ' + (juste ? "ok" : "nok") + '"><strong>' + (juste ? "✓ Juste" : "✗ Non, c'était : " + JR.esc(P.nom)) + (bonus ? " — diagnostic efficace, en " + releves.size + " relevés." : juste ? " — trouvé, en " + releves.size + " relevés." : ".") + '</strong>' +
            '<em>La signature :</em> ' + JR.esc(P.signature) + '<br><em>La preuve ici :</em> ' + JR.esc(c.preuve) + '<br><em>Ce qu\'on fait :</em> ' + JR.esc(P.actions.join(" · ")) + '. Puis on remesure.</p>' +
            '<div class="actions"><button type="button" class="btn" id="d-suite">' + (i + 1 < cas.length ? "Situation suivante" : "Voir le résultat") + '</button></div>';
          const bs = r.querySelector("#d-suite"); bs.focus();
          bs.addEventListener("click", function () {
            JR.sons.tap(); i++;
            if (i < cas.length) jouerCas();
            else JR.fin({ score: points, total: total, unite: "points", texte: "Coefficient d'efficacité : " + Math.round(points / Math.max(1, total) * 100) + " %.", rejouer: function () { demarrer(theme, main); } });
          });
        }));
      });
    }

    if (!cerveau()) { main.innerHTML = '<h1>' + JR.esc(theme.emoji + " " + theme.nom) + '</h1><p class="retour nok"><strong>✗ Tables des fluides indisponibles.</strong>Vérifiez la connexion, puis rechargez la page.</p>'; return; }
    jouerCas();
  }

  JR.lancer("depanneur", demarrer);
})();
