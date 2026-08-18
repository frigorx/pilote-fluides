/* =====================================================================
   vignettes.mjs — une image d'aperçu par ressource de la bibliothèque
   ---------------------------------------------------------------------
   POURQUOI CE FICHIER EXISTE
   Demande de F. Henninot (18/08) : « on aurait pas pu avoir une petite
   image à chaque fois représentant l'esprit de l'animation ? Comme ça on
   voit directement de quoi ça parle. » Une bibliothèque où il faut ouvrir
   chaque ressource pour savoir ce qu'elle montre n'est pas une
   bibliothèque : c'est une liste de liens.

   COMMENT
   Chrome sans fenêtre ouvre la page, laisse l'animation démarrer, et
   photographie l'écran. Le budget de temps virtuel (--virtual-time-budget)
   fait défiler l'animation plus vite que le temps réel : on capture un
   moment où quelque chose est déjà en place, pas une page blanche.

   ÉCONOME PAR CONSTRUCTION : une vignette n'est refaite que si la page a
   changé depuis (comparaison des dates). Relancer le script ne recapture
   donc rien tant que rien n'a bougé.

   ENTRÉES  packs/fluides/res/<ressource>/index.html
   SORTIE   packs/fluides/res/_vignettes/<ressource>.png
   USAGE    node build/vignettes.mjs           (toutes celles qui manquent)
            node build/vignettes.mjs --toutes  (tout refaire)
   ===================================================================== */
import { readdirSync, existsSync, statSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const RES = resolve(RACINE, "packs/fluides/res");
const VIGNETTES = resolve(RES, "_vignettes");
const DOSSIERS_ASSETS = new Set(["svg", "outils", "photos", "bibliotheque", "_vignettes",
                                 "img", "audio", "voix", "illustrations", "symboles"]);
const TOUT = process.argv.includes("--toutes");

/* Chrome : cherché là où Windows le pose. Absent, le script le dit et sort
   sans échouer — la galerie sait afficher une ressource sans vignette. */
const CANDIDATS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const NAVIGATEUR = CANDIDATS.find((c) => existsSync(c));
if (!NAVIGATEUR) {
  console.log("  vignettes : aucun navigateur trouvé — étape sautée (la galerie reste valide)");
  process.exit(0);
}

if (!existsSync(VIGNETTES)) mkdirSync(VIGNETTES, { recursive: true });

const ressources = readdirSync(RES, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !DOSSIERS_ASSETS.has(d.name))
  .map((d) => d.name)
  .filter((nom) => existsSync(resolve(RES, nom, "index.html")));

let faites = 0, gardees = 0;
for (const nom of ressources) {
  const page = resolve(RES, nom, "index.html");
  const png = resolve(VIGNETTES, nom + ".png");
  if (!TOUT && existsSync(png) && statSync(png).mtimeMs > statSync(page).mtimeMs) {
    gardees++;
    continue;
  }
  try {
    execFileSync(NAVIGATEUR, [
      "--headless", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
      "--window-size=760,460",
      /* 6 s de temps virtuel : assez pour qu'un titre, un schéma ou la
         première étape d'une animation soient posés ; pas assez pour
         tomber sur l'écran final d'un récit. */
      "--virtual-time-budget=6000",
      `--screenshot=${png}`,
      "file:///" + page.replace(/\\/g, "/"),
    ], { stdio: "ignore", timeout: 45000 });
    faites++;
  } catch {
    console.log(`  ⚠ vignette impossible : ${nom}`);
  }
}
console.log(`  vignettes : ${faites} capturée(s), ${gardees} déjà à jour (sur ${ressources.length} ressources)`);
