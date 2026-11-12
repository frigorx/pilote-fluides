/* Parcours du socle pressostats : ouvre la page, visite tous les écrans et les questions, manoeuvre chaque outil,
   relève les erreurs de console et les débordements horizontaux, capture chaque écran.
   Usage : node parcours.cjs <adresse de la page> [dossier des captures]
   Sortie : rapport texte ; code de sortie 1 si une erreur ou un débordement est relevé. */
const fs = require("fs");
const path = require("path");
const PW = process.env.PW_MODULE || "C:/git/hydrometro/node_modules/playwright";
if (process.env.PLAYWRIGHT_BROWSERS_PATH && !fs.existsSync(process.env.PLAYWRIGHT_BROWSERS_PATH)) delete process.env.PLAYWRIGHT_BROWSERS_PATH;
const { chromium } = require(PW);

const url = process.argv[2];
const dossier = process.argv[3] || "";
if (!url) { console.error("Usage : node parcours.cjs <adresse> [dossier des captures]"); process.exit(2); }
if (dossier) fs.mkdirSync(dossier, { recursive: true });

const FORMATS = [{ nom: "pc", largeur: 1366, hauteur: 768 }, { nom: "tel", largeur: 360, hauteur: 640 }];
const rapport = [];
let problemes = 0;
function dire(s) { rapport.push(s); }
function probleme(s) { problemes++; rapport.push("  PROBLEME : " + s); }

/* Les attentes viennent de window.PRESSOSTAT_PAGE (données de la page) et de window.PRESSOSTAT_TEXTES : le test vaut pour les trois modèles. */
let PAGE = null, T = null;
const arrondi = (x, d) => { const f = Math.pow(10, d); return Math.round(x * f) / f; };
const nb = (x, dec) => (dec == null ? String(arrondi(x, 2)) : arrondi(x, dec).toFixed(dec)).replace(".", ",").replace("-", "−");
const gabarit = (s, v) => String(s || "").replace(/\{(\w+)\}/g, (m, k) => (v && v[k] != null ? v[k] : m));
const norm = (s) => String(s || "").replace(/\s+/g, " ").trim();

async function regler(page, indice, valeur) {
  await page.evaluate(([i, v]) => {
    const c = document.querySelectorAll("#ecran input[type=range]")[i];
    c.value = v;
    c.dispatchEvent(new Event("input", { bubbles: true }));
  }, [indice, valeur]);
}
const message = (page) => page.evaluate(() => { const m = document.querySelector("#ecran .message"); return m ? m.textContent : ""; });
const texteCarte = (page) => page.evaluate(() => { const m = document.querySelector("#ecran .calcul-resultat"); return m ? m.textContent : ""; });
function attendu(nom, vrai, detail) { if (!vrai) probleme(nom + (detail ? " : " + detail : "")); }

async function debordements(page, format, nom) {
  const r = await page.evaluate(() => {
    const larg = window.innerWidth, doc = document.documentElement;
    const gros = [];
    document.querySelectorAll("body *").forEach((e) => {
      if (e.closest(".tableau-defilant, .etapes, dialog, svg, #inerweb-retour-accueil-barre")) return;
      const b = e.getBoundingClientRect();
      if (b.width && b.right > larg + 1) gros.push(e.tagName.toLowerCase() + (e.className && typeof e.className === "string" ? "." + e.className.split(" ")[0] : "") + " " + Math.round(b.right));
    });
    document.querySelectorAll("#ecran .tableau-defilant, .bloc-texte .tableau-defilant").forEach((t) => {
      const c = t.getBoundingClientRect();
      if (t.scrollWidth > t.clientWidth + 1) gros.push("tableau défilant à l'horizontale (" + t.scrollWidth + " > " + t.clientWidth + ")");
      t.querySelectorAll("th, td, .formule").forEach((e) => { if (e.getBoundingClientRect().right > c.right + 1) gros.push("cellule hors cadre : " + e.textContent.trim().slice(0, 25)); });
    });
    document.querySelectorAll(".formule").forEach((e) => { if (e.getClientRects().length > 1) gros.push("formule coupée : " + e.textContent.trim().slice(0, 40)); });
    return { debord: doc.scrollWidth > larg, sw: doc.scrollWidth, larg, gros: gros.slice(0, 8) };
  });
  if (r.debord) probleme(format + " " + nom + " : la page défile à l'horizontale (" + r.sw + " > " + r.larg + ")");
  if (r.gros.length) probleme(format + " " + nom + " : " + r.gros.join(" ; "));
}

/* Curseur de pression sur une coupe : bp (le contact s'ouvre en baissant) ou hp (il s'ouvre en montant). */
async function outilPression(page, ec) {
  const cote = ec.dessin.cote, c = ec.dessin.curseur, v = (PAGE.valeurs || {})[cote] || {}, msgs = ec.messages || {};
  const dec = cote === "hp" ? 1 : 2, auto = v.rearmement === "auto", etiq = ec.id + " (" + cote.toUpperCase() + ")";
  const bouton = "#ecran .bouton-principal";
  const verifie = async (nom, cle, p) => {
    const m = norm(await message(page)), voulu = norm(gabarit(msgs[cle], { p: nb(p, dec) }));
    attendu(etiq + " " + nom, !!msgs[cle] && m === voulu, "obtenu « " + m + " », attendu « " + voulu + " »");
  };
  const dep = c.depart;
  if (cote === "bp") {
    await regler(page, 0, c.max); await verifie("à " + c.max + " : contact fermé", "marche", c.max);
    await regler(page, 0, v.coupure); await verifie("à la coupure " + v.coupure + " : le contact s'ouvre", "coupe", v.coupure);
    const milieu = arrondi((v.coupure + v.enclenchement) / 2, 2);
    await regler(page, 0, milieu); await verifie("remontée à " + milieu + " : reste ouvert", "arret", milieu);
    if (auto) {
      await regler(page, 0, v.enclenchement); await verifie("à l'enclenchement " + v.enclenchement + " : le contact se referme", "repart", v.enclenchement);
    }
    await regler(page, 0, dep);
    await page.click("#ecran .curseur-pas >> nth=0");
    attendu(etiq + " bouton − actif", norm(await message(page)).length > 0);
    await page.click("#ecran .curseur-pas >> nth=1");
  } else {
    const retour = v.retour, aBouton = !!ec.dessin.bouton;
    if (aBouton) attendu(etiq + " : bouton désactivé tant que le contact est fermé", (await page.getAttribute(bouton, "aria-disabled")) === "true");
    await regler(page, 0, c.min); await verifie("à " + c.min + " : contact fermé", "marche", c.min);
    await regler(page, 0, v.coupure); await verifie("à la coupure " + v.coupure + " : le contact s'ouvre", "coupe", v.coupure);
    const haut = arrondi(v.coupure - 1, 1);
    if (!auto) {
      await regler(page, 0, haut); await verifie("redescente à " + haut + " : reste ouvert", "attente", haut);
      if (aBouton) {
        attendu(etiq + " : bouton actif contact ouvert", (await page.getAttribute(bouton, "aria-disabled")) === "false");
        await page.click(bouton); await verifie("réarmement trop tôt refusé", "refus", haut);
        await regler(page, 0, retour); await verifie("à " + retour + " : prêt à réarmer", "pret", retour);
        await page.click(bouton); await verifie("réarmement à " + retour + " accepté", "rearme", retour);
        attendu(etiq + " : bouton désactivé après réarmement", (await page.getAttribute(bouton, "aria-disabled")) === "true");
        await page.waitForTimeout(450); // fin du minuteur du bouton
      }
    } else {
      await regler(page, 0, retour); await verifie("à " + retour + " : le contact se referme seul", "repart", retour);
    }
    await regler(page, 0, dep);
    await page.click("#ecran .curseur-pas >> nth=1");
    attendu(etiq + " bouton + actif", norm(await message(page)).length > 0);
  }
}

async function outilBornes(page, ec) {
  const etats = ec.dessin.etats || [];
  const bs = await page.$$("#ecran .groupe-boutons button");
  attendu("bornes : " + etats.length + " états", bs.length === etats.length, String(bs.length));
  for (let k = 0; k < bs.length; k++) {
    await bs[k].click();
    attendu("bornes « " + etats[k] + " » : bouton marqué actif", (await bs[k].getAttribute("aria-pressed")) === "true");
    const leg = norm(await page.textContent("#ecran .legende"));
    attendu("bornes « " + etats[k] + " » : légende", leg === norm((ec.legendes || {})[etats[k]]), leg);
  }
}

async function outilPlaque(page, ec) {
  const cote = ec.dessin.cote, V = PAGE.valeurs || {}, f = (s, v) => norm(gabarit(s, v));
  if (!ec.calcul) return;
  if (cote === "bp") {
    const b = V.bp;
    let t = norm(await texteCarte(page));
    let voulu = f(T.resultatBp, { a: nb(b.enclenchement), b: nb(b.differentiel), r: nb(arrondi(b.enclenchement - b.differentiel, 2)) });
    attendu("calcul BP de départ", t === voulu, t + " / " + voulu);
    await regler(page, 0, b.plage[0] + 0.5); await regler(page, 1, b.diffPlage[1]); t = await texteCarte(page);
    attendu("calcul BP : alerte vide", /ne convient pas/.test(t), t);
    await regler(page, 0, 4); await regler(page, 1, 1.5); t = norm(await texteCarte(page));
    voulu = f(T.resultatBp, { a: "4", b: "1,5", r: "2,5" });
    attendu("calcul BP 4 − 1,5", t === voulu, t + " / " + voulu);
  } else {
    const h = V.hp;
    let t = norm(await texteCarte(page));
    let voulu = f(T.resultatHp, { a: nb(h.coupure), b: nb(h.differentiel), r: nb(arrondi(h.coupure - h.differentiel, 2)) });
    attendu("calcul HP de départ", t === voulu, t + " / " + voulu);
    await regler(page, 0, 20); t = norm(await texteCarte(page));
    voulu = f(T.resultatHp, { a: "20", b: nb(h.differentiel), r: nb(20 - h.differentiel) });
    attendu("calcul HP à 20", t === voulu, t + " / " + voulu);
  }
}

async function outilReleves(page, ec) {
  const m = PAGE.modele, V = PAGE.valeurs || {};
  const colonnes = { hp: 1, bp: 3, combine: 4 }[m], calcule = m !== "hp", saisies = colonnes - (calcule ? 1 : 0), essais = ec.releves.essais || 3;
  const champs = await page.$$("#ecran .champ-releve");
  attendu("relevés : " + essais + " essais × " + saisies + " champs", champs.length === essais * saisies, String(champs.length));
  const nbCalc = await page.evaluate(() => document.querySelectorAll("#ecran .calcule").length);
  attendu("relevés : cellules calculées", nbCalc === (calcule ? essais : 0), String(nbCalc));
  const voulu = await page.evaluate(() => Array.from(document.querySelectorAll("#ecran tr.voulu td")).map((td) => td.textContent));
  attendu("relevés : ligne « réglage voulu »", voulu.length === colonnes, JSON.stringify(voulu));
  if (calcule) {
    await champs[0].fill("0,2"); await champs[1].fill("1.4");
    const diff = await page.evaluate(() => document.querySelector("#ecran .calcule").textContent);
    attendu("relevés : différentiel calculé", diff === "1,2", diff);
  } else {
    await champs[0].fill(nb(V.hp.coupure));
    attendu("relevés : saisie acceptée", (await champs[0].inputValue()) === nb(V.hp.coupure));
  }
}

async function outilsEcran(page, ec) {
  const d = ec.dessin || {};
  if (d.type === "coupe" && d.curseur) await outilPression(page, ec);
  if (d.type === "bornes") await outilBornes(page, ec);
  if (d.type === "plaque") await outilPlaque(page, ec);
  if (ec.releves) await outilReleves(page, ec);
  attendu(ec.id + " : écran avec figure", !d.type || !!(await page.$("#ecran svg")));
}

async function questions(page, avantRevoir) {
  const quiz = PAGE.quiz || [], N = quiz.length;
  const choix = await page.$$("#ecran .question");
  attendu("questions : " + N, choix.length === N, String(choix.length));
  // mauvaise réponse à la première, bonne à la deuxième, puis les bonnes
  const mauvais = (k) => (quiz[k].bonne + 1) % quiz[k].choix.length;
  await (await choix[0].$$("button.choix-reponse"))[mauvais(0)].click();
  const faux = await choix[0].$$("button.faux");
  attendu("question 1 : mauvais choix en rouge", faux.length === 1);
  attendu("question 1 : bouton Revoir", !!(await choix[0].$("button.revoir")));
  attendu("question 1 : symbole ✗", /✗/.test(await faux[0].textContent()));
  attendu("question 1 : bonne réponse en vert ✓", /✓/.test(await (await choix[0].$("button.juste")).textContent()));
  await (await choix[1].$$("button.choix-reponse"))[quiz[1].bonne].click();
  attendu("question 2 : bonne réponse", !!(await choix[1].$("button.juste")) && !(await choix[1].$("button.faux")));
  for (let k = 2; k < N; k++) await (await choix[k].$$("button.choix-reponse"))[quiz[k].bonne].click();
  const bilan = await page.textContent("#ecran .bilan");
  attendu("questions : bilan affiché", new RegExp("sur " + N).test(bilan), bilan);
  if (avantRevoir) await avantRevoir();
  await (await choix[0].$("button.revoir")).click();
  const hash = await page.evaluate(() => location.hash);
  attendu("Revoir : ouvre l'écran « " + quiz[0].revoir + " »", hash === "#ecran-" + quiz[0].revoir, hash);
}

/* Captures : vue à l'écran (haut du cours, barre du bas en place), puis tout le cours (barre posée à sa place naturelle). */
async function capturer(page, format, nom) {
  if (!dossier) return;
  await page.evaluate(() => window.scrollTo(0, document.getElementById("cours").getBoundingClientRect().top + window.scrollY - 8));
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(dossier, nom + "-vue.png") });
  await page.evaluate(() => { const st = document.createElement("style"); st.id = "capture-barre"; st.textContent = ".barre-navigation{position:static!important}"; document.head.appendChild(st); });
  await page.locator("#cours").screenshot({ path: path.join(dossier, nom + ".png") });
  await page.evaluate(() => document.getElementById("capture-barre").remove());
}

/* Plus petite taille de texte rendue (px) dans le dessin de l'écran, et liste des textes sous 12 px. */
async function taillesTexte(page, id, vus) {
  const r = await page.evaluate(() => {
    const svg = document.querySelector("#ecran .figure svg");
    if (!svg) return null;
    const out = [];
    svg.querySelectorAll("text").forEach((t) => {
      const txt = t.textContent.trim();
      if (!txt || /^(by inerweb.fr|iner|Web)$/.test(txt)) return; // filigrane
      const b = t.getBoundingClientRect(), m = t.getScreenCTM();
      const px = m ? parseFloat(getComputedStyle(t).fontSize) * Math.hypot(m.a, m.b) : b.height;
      out.push([Math.round(px * 10) / 10, txt.slice(0, 30)]);
    });
    return out;
  });
  if (!r) return;
  r.forEach(([px, txt]) => { const k = id + "|" + txt; if (!vus.has(k) || vus.get(k) > px) vus.set(k, px); });
}

async function parcours(browser, format) {
  const vus = new Map();
  const ctx = await browser.newContext({ viewport: { width: format.largeur, height: format.hauteur }, hasTouch: format.nom === "tel" });
  const page = await ctx.newPage();
  page.setDefaultTimeout(8000);
  const erreurs = [];
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") erreurs.push(m.type() + " : " + m.text()); });
  page.on("pageerror", (e) => erreurs.push("exception : " + e.message));
  page.on("requestfailed", (r) => erreurs.push("requête échouée : " + r.url()));
  page.on("response", (r) => { if (r.status() >= 400) erreurs.push("HTTP " + r.status() + " : " + r.url()); });

  dire("== " + format.nom + " " + format.largeur + "x" + format.hauteur);
  await page.goto(url, { waitUntil: "load" });
  await page.waitForTimeout(500);
  PAGE = await page.evaluate(() => JSON.parse(JSON.stringify(window.PRESSOSTAT_PAGE || null)));
  T = await page.evaluate(() => JSON.parse(JSON.stringify(window.PRESSOSTAT_TEXTES || null)));
  if (!PAGE || !T) { probleme("window.PRESSOSTAT_PAGE ou PRESSOSTAT_TEXTES absent"); await ctx.close(); return; }
  const NB = PAGE.ecrans.length, NQ = (PAGE.quiz || []).length;
  dire("  modèle " + PAGE.modele + " : " + NB + " écrans, " + NQ + " questions");
  const y0 = await page.evaluate(() => window.scrollY);
  attendu(format.nom + " : ouverture sans défilement", y0 === 0, String(y0));
  const premier = await page.evaluate(() => document.querySelector("#etapes button[aria-current]") && document.querySelector("#etapes button[aria-current]").textContent);
  attendu(format.nom + " : premier écran courant", !!premier, String(premier));
  if (dossier) await page.screenshot({ path: path.join(dossier, format.nom + "-00-ouverture.png") });
  await debordements(page, format.nom, "ouverture");

  const ids = await page.evaluate(() => Array.from(document.querySelectorAll("#etapes button")).map((b) => b.textContent));
  const n = ids.length;
  dire("  écrans dans la navigation : " + n);
  attendu(format.nom + " : navigation = écrans + questions", n === NB + 1, n + " au lieu de " + (NB + 1));
  for (let i = 0; i < n; i++) {
    await page.click("#etapes button >> nth=" + i);
    await page.waitForTimeout(250);
    const etat = await page.evaluate(() => ({ hash: location.hash, titre: (document.querySelector("#ecran h2") || {}).textContent, pos: document.getElementById("position").textContent }));
    const ec = PAGE.ecrans[i], id = ec ? ec.id : "questions";
    dire("  " + String(i + 1).padStart(2, "0") + " " + (etat.hash || "?") + " | " + etat.pos + " | " + etat.titre);
    const nom = format.nom + "-" + String(i + 1).padStart(2, "0") + "-" + id;
    if (ec) { await capturer(page, format, nom); if (format.nom === "tel") await taillesTexte(page, id, vus); }
    try { if (ec) await outilsEcran(page, ec); else await questions(page, () => capturer(page, format, nom)); } catch (e) { probleme(format.nom + " " + id + " : " + String(e.message).split(/\r?\n/)[0]); }
    await page.waitForTimeout(450); // fin du minuteur du bouton de réarmement
    if (ec && format.nom === "tel") await taillesTexte(page, id, vus);
    await debordements(page, format.nom, id || "questions");
  }
  // navigation par boutons, clavier, adresse
  await page.click("#etapes button >> nth=0");
  await page.click("#next-button");
  await page.keyboard.press("ArrowRight");
  let h = await page.evaluate(() => location.hash);
  attendu(format.nom + " : bouton Continuer et flèche droite", /^#ecran-/.test(h) && (await page.evaluate(() => document.getElementById("position").textContent)).indexOf("3 sur") >= 0, h);
  await page.keyboard.press("ArrowLeft");
  const pos = await page.evaluate(() => document.getElementById("position").textContent);
  attendu(format.nom + " : flèche gauche", /2 sur/.test(pos), pos);
  await page.goBack();
  const pos2 = await page.evaluate(() => document.getElementById("position").textContent);
  attendu(format.nom + " : retour du navigateur", /(1|3|2) sur/.test(pos2), pos2);
  const idAdr = PAGE.ecrans[NB - 1].id;
  await page.goto(url.replace(/#.*$/, "") + "#ecran-" + idAdr, { waitUntil: "load" });
  await page.waitForTimeout(400);
  const arrivee = await page.evaluate(() => document.getElementById("position").textContent);
  attendu(format.nom + " : arrivée par l'adresse #ecran-" + idAdr, new RegExp("^Écran " + NB + " sur " + (NB + 1)).test(arrivee), arrivee);
  await page.goto(url.replace(/#.*$/, "") + "#questions", { waitUntil: "load" });
  await page.waitForTimeout(300);
  attendu(format.nom + " : arrivée par #questions", /(\d+) sur \1/.test(await page.evaluate(() => document.getElementById("position").textContent)));

  // voix et sources
  await page.goto(url.replace(/#.*$/, ""), { waitUntil: "load" });
  await page.evaluate(() => { window.__voix = []; const s = window.speechSynthesis.speak.bind(window.speechSynthesis); window.speechSynthesis.speak = function (u) { window.__voix.push(u.text.slice(0, 40)); }; });
  await page.click("#voice-button");
  const lu = await page.evaluate(() => window.__voix);
  attendu(format.nom + " : la voix lit la narration", lu.length === 1, JSON.stringify(lu));
  await page.click("#stop-voice");
  await page.click("#sources-button");
  attendu(format.nom + " : fenêtre des sources ouverte", await page.evaluate(() => document.getElementById("sources-dialog").open));
  attendu(format.nom + " : sources remplies", (await page.evaluate(() => document.querySelectorAll("#sources-body li").length)) >= 1);
  if (dossier) await page.screenshot({ path: path.join(dossier, format.nom + "-99-sources.png") });
  await page.keyboard.press("Escape");
  attendu(format.nom + " : Échap ferme les sources", !(await page.evaluate(() => document.getElementById("sources-dialog").open)));
  await page.click("#sources-button");
  await page.mouse.click(3, 3);
  attendu(format.nom + " : clic hors boîte ferme les sources", !(await page.evaluate(() => document.getElementById("sources-dialog").open)));

  if (format.nom === "tel") {
    const parEcran = new Map();
    vus.forEach((px, k) => { const [id, txt] = k.split("|"); if (!parEcran.has(id)) parEcran.set(id, []); parEcran.get(id).push([px, txt]); });
    parEcran.forEach((l, id) => {
      l.sort((x, y) => x[0] - y[0]);
      dire("  texte du dessin " + id + " : plus petit " + l[0][0] + " px (« " + l[0][1] + " »)");
      const sous = l.filter((x) => x[0] < 12);
      if (sous.length) probleme("tel " + id + " : " + sous.length + " texte(s) de dessin sous 12 px : " + sous.slice(0, 6).map((x) => x[0] + " px « " + x[1] + " »").join(" ; "));
    });
  }
  const uniques = Array.from(new Set(erreurs));
  dire("  erreurs de console : " + uniques.length);
  uniques.forEach((e) => probleme(format.nom + " console : " + e));
  await ctx.close();
}

/* Chromium de Playwright ; si la version attendue manque, repli sur un navigateur déjà téléchargé. */
async function lancer() {
  try { return await chromium.launch(); } catch (e) {
    const racine = path.join(process.env.LOCALAPPDATA || "", "ms-playwright");
    const dossiers = fs.existsSync(racine) ? fs.readdirSync(racine).sort().reverse() : [];
    const modeles = [["chromium_headless_shell-", "chrome-headless-shell-win64", "chrome-headless-shell.exe"], ["chromium-", "chrome-win64", "chrome.exe"]];
    for (const [prefixe, sous, exe] of modeles) {
      for (const d of dossiers.filter((x) => x.indexOf(prefixe) === 0)) {
        const chemin = path.join(racine, d, sous, exe);
        if (!fs.existsSync(chemin)) continue;
        try { return await chromium.launch({ executablePath: chemin }); } catch (e2) { /* essai suivant */ }
      }
    }
    throw e;
  }
}


(async () => {
  const browser = await lancer();
  try { for (const f of FORMATS) await parcours(browser, f); }
  catch (e) { probleme("script : " + e.message); }
  await browser.close();
  dire(problemes ? "RESULTAT : " + problemes + " problème(s)" : "RESULTAT : aucun problème relevé");
  console.log(rapport.join("\n"));
  process.exit(problemes ? 1 : 0);
})();
