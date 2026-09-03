/* =====================================================================
   serveur.mjs — la console des accès enseignant, sans ligne de commande
   ---------------------------------------------------------------------
   Lancé par le raccourci « Console des accès inerWeb ». Il ouvre une page
   dans le navigateur : tout s'y fait par clics — délivrer un accès, voir
   qui en a un, préparer la rentrée, imprimer la sauvegarde de la clé.

   POURQUOI CE SERVEUR EXISTE
   Les outils du chantier (`delivrer-acces.mjs`, `millesime.mjs`,
   `coffre.mjs`) s'appellent en ligne de commande. C'est un mur pour qui
   n'écrit pas de commandes — et F. Henninot n'a pas à en écrire pour se
   servir de son propre système. Ce serveur est la poignée de la porte.

   IL NE SORT PAS DE LA MACHINE
   · écoute sur 127.0.0.1 uniquement — jamais sur le réseau ;
   · un JETON tiré au démarrage : toute requête doit le porter, sinon
     refus. Une page web quelconque ouverte ailleurs ne peut donc pas
     lui parler (le jeton n'est que dans l'adresse ouverte au lancement) ;
   · aucun appel sortant, aucune donnée qui part.

   ZÉRO DÉPENDANCE, comme tout le dépôt.
   ===================================================================== */
import { createServer } from "node:http";
import { randomBytes } from "node:crypto";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PRODUITS } from "../../build/produits.mjs";
import { BASE } from "../../build/lieu-acces.mjs";

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = resolve(ICI, "../..");
const PORT = 2040;
const JETON = randomBytes(16).toString("hex");

/* ------------------------------------------------------------------
   Lecture de l'état — ce que la page affiche en arrivant
   ------------------------------------------------------------------ */
function etat() {
  const millesimes = existsSync(BASE + "/millesimes")
    ? readdirSync(BASE + "/millesimes").filter((f) => f.endsWith(".json"))
        .map((f) => {
          const [produit, annee] = f.replace(".json", "").split(/-(\d{4})$/);
          return { produit, annee: Number(annee) };
        })
    : [];

  let titulaires = [];
  if (existsSync(BASE + "/registre-acces.csv")) {
    titulaires = readFileSync(BASE + "/registre-acces.csv", "utf8")
      .split("\n").slice(1).filter(Boolean)
      .map((l) => {
        const c = l.split(";");
        return { produit: c[0], numero: Number(c[1]), nom: c[2], courriel: c[3],
                 etablissement: c[4], millesime: Number(c[5]), delivreLe: c[6],
                 expireLe: c[7], consentements: c[8] || "", consentiLe: c[9] || "" };
      });
  }

  /* Les statistiques — des totaux, jamais des noms. Seules comptent les
     personnes qui ont accepté d'y figurer (lettre S). */
  const consentantes = titulaires.filter((t) => t.consentements.includes("S"));
  const etablissements = new Set(
    consentantes.map((t) => (t.etablissement || "").trim().toLowerCase()).filter(Boolean)
  );
  const personnes = new Set(
    titulaires.map((t) => (t.courriel || t.nom).trim().toLowerCase())
  );
  const parProduit = {};
  for (const t of titulaires) parProduit[t.produit] = (parProduit[t.produit] || 0) + 1;
  const aujourdhui = new Date().toISOString().slice(0, 10);

  return {
    cleRacine: existsSync(BASE + "/racine/cle-privee.pem"),
    statistiques: {
      personnes: personnes.size,
      accesDelivres: titulaires.length,
      acceptentStatistiques: consentantes.length,
      etablissements: etablissements.size,
      parProduit,
      encoreValides: titulaires.filter((t) => t.expireLe >= aujourdhui).length,
      perimes: titulaires.filter((t) => t.expireLe < aujourdhui).length,
    },
    fichePresente: existsSync(BASE + "/racine/FICHE-A-IMPRIMER.html"),
    produits: PRODUITS.filter((p) => !p.retire).map((p) => ({
      id: p.id, nom: p.nom,
      coffreServi: existsSync(join(RACINE, p.coffre || "")),
    })),
    millesimes,
    titulaires,
    anneeCourante: new Date().getFullYear(),
    dossierCodes: BASE + "/codes",
  };
}

/* ------------------------------------------------------------------
   Lancer un outil du dépôt et rapporter ce qu'il a dit
   ------------------------------------------------------------------ */
function lancer(script, args) {
  return new Promise((resoudre) => {
    const p = spawn(process.execPath, [join(RACINE, script), ...args], { cwd: RACINE });
    let sortie = "", erreur = "";
    p.stdout.on("data", (d) => (sortie += d));
    p.stderr.on("data", (d) => (erreur += d));
    p.on("close", (code) => resoudre({ ok: code === 0, sortie, erreur }));
    p.on("error", (e) => resoudre({ ok: false, sortie: "", erreur: String(e) }));
  });
}

/* ------------------------------------------------------------------
   Le serveur
   ------------------------------------------------------------------ */
const serveur = createServer(async (req, rep) => {
  const url = new URL(req.url, "http://127.0.0.1");

  function json(objet, code) {
    rep.writeHead(code || 200, { "content-type": "application/json; charset=utf-8" });
    rep.end(JSON.stringify(objet));
  }

  /* La page elle-même : servie librement, elle ne contient aucun secret. */
  if (url.pathname === "/" || url.pathname === "/console.html") {
    rep.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    rep.end(readFileSync(join(ICI, "console.html"), "utf8"));
    return;
  }

  /* Tout le reste exige le jeton du démarrage. */
  if (url.searchParams.get("j") !== JETON) {
    json({ ok: false, message: "Cette page a perdu le fil. Relancez le raccourci." }, 403);
    return;
  }

  if (url.pathname === "/etat") { json({ ok: true, etat: etat() }); return; }

  /* Retrouver le code d'une personne qui l'a perdu. Il n'est pas
     reconstitué : il est RELU dans le fichier écrit à la délivrance. */
  if (url.pathname === "/code") {
    const produit = url.searchParams.get("produit");
    const numero = Number(url.searchParams.get("numero"));
    if (!produit || !Number.isInteger(numero)) {
      json({ ok: false, message: "Demande incomplète." }); return;
    }
    const debut = `${produit}-`;
    const marque = `-${String(numero).padStart(3, "0")}-`;
    const dossier = BASE + "/codes";
    const trouve = existsSync(dossier)
      ? readdirSync(dossier).find((f) => f.startsWith(debut) && f.includes(marque))
      : null;
    if (!trouve) {
      json({ ok: false, message:
        "Le fichier de ce code est introuvable. Il a pu être déplacé ou effacé — "
        + "dans ce cas, délivrez-en simplement un nouveau." });
      return;
    }
    const texte = readFileSync(dossier + "/" + trouve, "utf8");
    json({ ok: true, texte, fichier: dossier + "/" + trouve });
    return;
  }

  /* La liste de diffusion — SEULEMENT ceux qui ont coché « je veux bien
     recevoir des informations ». Les autres n'y figurent jamais, même
     s'ils ont un accès. */
  if (url.pathname === "/liste-diffusion") {
    const tous = etat().titulaires;
    const vus = new Set();
    const destinataires = tous.filter((t) => {
      if (!t.courriel || !t.consentements.includes("I")) return false;
      const cle = t.courriel.toLowerCase();
      if (vus.has(cle)) return false;   // une personne, un envoi
      vus.add(cle); return true;
    });
    json({
      ok: true,
      total: tous.length,
      acceptent: destinataires.length,
      sansCourriel: tous.filter((t) => !t.courriel).length,
      adresses: destinataires.map((t) => t.courriel),
      cci: destinataires.map((t) => t.courriel).join(","),
    });
    return;
  }

  if (req.method === "POST") {
    let corps = "";
    for await (const bout of req) corps += bout;
    let donnees = {};
    try { donnees = JSON.parse(corps || "{}"); } catch { /* défaut-refus plus bas */ }

    if (url.pathname === "/delivrer") {
      const { produit, nom, courriel, millesime, etablissement, consentements, consentiLe } = donnees;
      if (!produit || !nom || !String(nom).trim()) {
        json({ ok: false, message: "Il manque le nom de la personne." }); return;
      }
      const args = [produit, String(nom).trim()];
      if (courriel && String(courriel).trim()) args.push(String(courriel).trim());
      if (millesime) args.push("--millesime", String(millesime));
      if (etablissement) args.push("--etablissement", String(etablissement).trim());
      if (consentements) args.push("--consentements", String(consentements));
      if (consentiLe) args.push("--consenti-le", String(consentiLe));
      const r = await lancer("build/delivrer-acces.mjs", args);
      if (!r.ok) { json({ ok: false, message: nettoyer(r.erreur) || "La création a échoué." }); return; }

      /* On relit le fichier écrit pour renvoyer le code à la page. */
      const m = /code\s*:\s*(.+\.txt)/.exec(r.sortie);
      let texte = "", code = "";
      if (m && existsSync(m[1].trim())) {
        texte = readFileSync(m[1].trim(), "utf8");
        code = texte.trim().split("\n").map((l) => l.trim()).filter(Boolean).pop();
      }
      json({ ok: true, message: nettoyer(r.sortie), fichier: m ? m[1].trim() : "", texte, code });
      return;
    }

    if (url.pathname === "/millesime") {
      const r = await lancer("build/millesime.mjs", [donnees.produit, String(donnees.annee)]);
      json({ ok: r.ok, message: nettoyer(r.ok ? r.sortie : r.erreur) });
      return;
    }

    if (url.pathname === "/coffre") {
      const r = await lancer("build/coffre.mjs", [donnees.produit, "--millesime", String(donnees.annee)]);
      json({ ok: r.ok, message: nettoyer(r.ok ? r.sortie : r.erreur) });
      return;
    }

    if (url.pathname === "/fiche") {
      const r = await lancer("build/fiche-cle-racine.mjs", []);
      json({ ok: r.ok, message: nettoyer(r.ok ? r.sortie : r.erreur),
             chemin: BASE + "/racine/FICHE-A-IMPRIMER.html" });
      return;
    }

    if (url.pathname === "/ouvrir") {
      /* Ouvre un fichier ou un dossier avec l'application par défaut de
         Windows — c'est ce qui remplace « allez dans tel dossier ». */
      const cible = String(donnees.chemin || "");
      if (!cible.startsWith(BASE)) { json({ ok: false, message: "Chemin refusé." }); return; }
      spawn("cmd", ["/c", "start", "", cible.replace(/\//g, "\\")], { detached: true }).unref();
      json({ ok: true });
      return;
    }
  }

  json({ ok: false, message: "Action inconnue." }, 404);
});

/* Les messages des outils sont écrits pour un terminal : on retire les
   marques et on garde les phrases. */
function nettoyer(texte) {
  const lignes = String(texte || "").split("\n")
    .map((l) => l.replace(/^[✓✗⚠▪\s]+/, "").trim())
    .filter(Boolean);
  /* Retirer la marque du terminal laissait une minuscule en tête de
     phrase — détail visible, donc corrigé. */
  if (lignes.length) lignes[0] = lignes[0].charAt(0).toUpperCase() + lignes[0].slice(1);
  return lignes.join("\n");
}

/* Une panne de démarrage ne doit JAMAIS s'afficher en pile d'appels : c'est
   la fenêtre noire incompréhensible, et c'est précisément ce qu'on évite ici. */
serveur.on("error", (e) => {
  console.log("");
  if (e.code === "EADDRINUSE") {
    console.log("  La console est déjà ouverte.");
    console.log("");
    console.log("  Cherchez la fenêtre « Console des accès inerWeb » déjà lancée,");
    console.log("  ou l'onglet du navigateur qui la montre. Si vous ne la trouvez");
    console.log("  plus, fermez toutes ces fenêtres et relancez le raccourci.");
  } else {
    console.log("  La console n'a pas pu démarrer.");
    console.log("");
    console.log("  Raison technique, à me transmettre telle quelle : " + e.code);
  }
  console.log("");
  process.exit(1);
});

serveur.listen(PORT, "127.0.0.1", () => {
  const adresse = `http://127.0.0.1:${PORT}/?j=${JETON}`;
  console.log("Console des accès inerWeb — ouverte dans votre navigateur.");
  console.log(adresse);
  console.log("");
  console.log("Laissez cette fenêtre ouverte tant que vous vous en servez.");
  console.log("Pour arrêter : fermez-la.");
  /* IWA_SANS_NAVIGATEUR=1 : pour éprouver le serveur sans ouvrir de fenêtre. */
  if (process.env.IWA_SANS_NAVIGATEUR !== "1") {
    spawn("cmd", ["/c", "start", "", adresse], { detached: true }).unref();
  }
});
