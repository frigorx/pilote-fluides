/* =====================================================================
   recherche-index.mjs — l'index de recherche de TOUT le site
   ---------------------------------------------------------------------
   POURQUOI CE FICHIER EXISTE (28/10/2026)
   F. Henninot tape « inverter » dans la recherche de l'accueil : aucun
   cours. La station existe pourtant (CartoClim 2.4, « L'Inverter : la
   vitesse suit le besoin »), et ÉlectroRézo a son variateur de fréquence.
   Cause : la recherche de plan.html ne lisait que la liste du plan
   thermo-techno, environ 130 stations sur les 525 du catalogue. Tout le
   reste du site était invisible pour elle.

   CE QU'IL FAIT
   Il RELÈVE, il ne saisit pas. Il reprend le catalogue des stations (le
   même que l'accueil utilise pour ses compteurs) et y ajoute, pour chaque
   station, les petites phrases « pourquoi » de Mon parcours : ce sont
   elles qui disent « compresseur inverter », « vitesse du compresseur
   commandée par l'électronique ». Elles servent à TROUVER, pas à afficher.

   ENTRÉES  docs/catalogue-2026-09/catalogue-stations.json
            mon-parcours/donnees-parcours.js (phrases « pourquoi »)
   SORTIE   recherche-index.gen.js → window.RECHERCHE_INDEX
            chargé par plan.html seulement quand on se sert de la recherche
   USAGE    node build/recherche-index.mjs (branché dans build.mjs)
   ===================================================================== */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://inerweb.fr/";

/* La clé qui dit « même page » : sans le domaine, sans index.html, sans la
   barre finale. On garde ?e=… et #… : les escales du CO₂ ouvrent le même
   module à des endroits différents, ce sont des entrées distinctes. */
export function cleAdresse(href) {
  return String(href || "")
    .trim()
    .replace(/^https?:\/\/(www\.)?inerweb\.fr\//i, "")
    .replace(/^\.\//, "")
    .replace(/index\.html(?=[?#]|$)/i, "")
    .replace(/\/(?=[?#]|$)/, "")
    .toLowerCase();
}

/* Une adresse du site devient RELATIVE (le site tourne aussi hors ligne,
   en file://) et pointe sur index.html quand elle finit par un dossier :
   sans serveur, un lien vers « dossier/ » n'ouvre rien. */
function adresseLocale(url, chemin) {
  if (!/^https?:\/\/(www\.)?inerweb\.fr\//i.test(url)) return url;
  let rel = url.replace(/^https?:\/\/(www\.)?inerweb\.fr\//i, "");
  const [corps, suite = ""] = rel.split(/(?=[?#])/);
  if (corps === "" || corps.endsWith("/")) {
    const fichier = (chemin || corps) + "index.html";
    if (existsSync(resolve(RACINE, fichier.replace(/^\//, "")))) rel = corps + "index.html" + suite;
  }
  return rel || "index.html";
}

const catalogue = JSON.parse(
  readFileSync(resolve(RACINE, "docs/catalogue-2026-09/catalogue-stations.json"), "utf8")
).stations;

/* Les phrases « pourquoi » de Mon parcours, rangées par adresse. */
const pourquoi = new Map();
const fichierParcours = resolve(RACINE, "mon-parcours/donnees-parcours.js");
if (existsSync(fichierParcours)) {
  const bac = { window: {} };
  vm.runInNewContext(readFileSync(fichierParcours, "utf8"), bac);
  const P = bac.window.PARCOURS || {};
  const stations = P.stations || [];
  for (const d of P.diplomes || []) {
    for (const g of d.groupes || []) {
      for (const c of g.codes || []) {
        for (const [i, phrase] of Object.entries(c.pourquoi || {})) {
          const s = stations[Number(i)];
          if (!s || !phrase) continue;
          const k = cleAdresse(s.u);
          if (!pourquoi.has(k)) pourquoi.set(k, new Set());
          pourquoi.get(k).add(String(phrase).trim());
        }
      }
    }
  }
}

/* Le catalogue garde quelques entités HTML telles quelles (« d&#x27;une ») :
   le titre s'affiche en texte, il faut les décoder ici. */
const ENTITES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\u00a0" };
function texte(t) {
  return String(t || "")
    .replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (m, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => (n.toLowerCase() in ENTITES ? ENTITES[n.toLowerCase()] : m));
}

/* La description ne s'affiche pas : elle sert de second recours. On la
   garde courte, l'index part sur le téléphone des élèves. */
const LONGUEUR_MAX = 320;
function raccourcir(t) {
  t = t.replace(/\s+/g, " ").trim();
  return t.length > LONGUEUR_MAX ? t.slice(0, LONGUEUR_MAX).replace(/\s\S*$/, "") : t;
}

const vus = new Set();
const index = [];
for (const s of catalogue) {
  if (!s.titre || !s.url) continue;
  const k = cleAdresse(s.url);
  if (vus.has(k)) continue;
  vus.add(k);
  const morceaux = [];
  if (s.resume) morceaux.push(texte(s.resume));
  if (s.missionProf) morceaux.push(texte(s.missionProf));
  for (const p of pourquoi.get(k) || []) morceaux.push(texte(p));
  const entree = { n: texte(s.titre), r: texte(s.reseau), u: adresseLocale(s.url, s.chemin) };
  if (s.ligne) entree.l = texte(s.ligne);
  const d = raccourcir(morceaux.join(" · "));
  if (d) entree.d = d;
  index.push(entree);
}

writeFileSync(
  resolve(RACINE, "recherche-index.gen.js"),
  "/* Fichier GÉNÉRÉ par build/recherche-index.mjs — ne pas modifier à la main.\n" +
    "   Toutes les stations du site, pour la recherche de plan.html. */\n" +
    "window.RECHERCHE_INDEX = " + JSON.stringify(index) + ";\n",
  "utf8"
);
console.log(`✓ recherche-index.gen.js — ${index.length} stations cherchables (${pourquoi.size} avec leurs phrases « pourquoi »)`);
