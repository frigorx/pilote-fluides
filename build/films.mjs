/* =====================================================================
   films.mjs — les films narrés sans dépendance distante
   ---------------------------------------------------------------------
   POURQUOI : les deux films (`film-ozone`, `film-effet-de-serre`) sont des
   exports Claude Design. Leur runtime `support.js` allait chercher React,
   ReactDOM et @babel/standalone sur unpkg.com À CHAQUE VISITE. Trois
   conséquences, toutes mauvaises : les films n'étaient pas réellement hors
   ligne (atelier, chaufferie, tablette sans réseau), la connexion du
   visiteur partait vers un tiers alors que le site annonce le contraire, et
   Babel — 3,1 Mo à lui seul — compilait le JSX dans le navigateur du
   visiteur, à chaque ouverture, pour un résultat toujours identique.

   CE QUE FAIT CE SCRIPT
     1. VENDORISE React et ReactDOM dans `moteur/vendor/`. Le runtime prévoit
        lui-même la substitution : `window.__resources` remplace une URL de
        CDN par un chemin local (voir `cdnScriptFor` dans support.js). Les
        pages des films posent cette table AVANT de charger le runtime.
     2. PRÉCOMPILE les `.jsx` en `.js` à côté d'eux. Le runtime ne charge
        Babel que pour les fichiers `.jsx` (`kindOf` : jsx|tsx → "jsx") :
        servir du `.js` déjà compilé, c'est ne plus jamais le charger.
        La transformation est celle du runtime, à l'identique — même version
        de Babel, mêmes préréglages (react + typescript).

   INTÉGRITÉ : chaque fichier rapatrié est vérifié contre l'empreinte SHA-384
   que support.js déclare déjà pour son `integrity`. Une empreinte qui ne
   colle pas ARRÊTE le script : on ne publie pas un code tiers non identifié.

   CE QUE ÇA NE RÈGLE PAS : le runtime exécute ses modules par
   `new Function(...)`. Une CSP stricte, sans `unsafe-eval`, reste donc
   impossible sur CES DEUX PAGES tant qu'elles utilisent `x-import` — s'en
   affranchir voudrait dire se passer du runtime Design, donc réécrire les
   films. Le gain ici est ailleurs, et il est réel : zéro requête vers un
   tiers, films vraiment hors ligne, 3,1 Mo et une compilation en moins.

   ENTRÉE   les dossiers `packs/fluides/res/film-…` et leurs fichiers .jsx
   SORTIE   les .js compilés à côté + moteur/vendor/{react,react-dom}...js
   USAGE    node build/films.mjs
   CACHE    Babel (3,1 Mo) n'entre pas dans le dépôt : il est gardé sous
            ~/.cache/inerweb/ et retéléchargé s'il manque.
   ===================================================================== */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { homedir } from "node:os";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = join(homedir(), ".cache", "inerweb");

/* Les empreintes viennent de support.js — elles n'ont pas été inventées ici.
   Si Claude Design change de version de React, support.js changera aussi :
   le script s'arrêtera, et ce sera le bon moment pour repasser par ici. */
const DISTANTS = {
  react: {
    url: "https://unpkg.com/react@18.3.1/umd/react.production.min.js",
    sri: "DGyLxAyjq0f9SPpVevD6IgztCFlnMF6oW/XQGmfe+IsZ8TqEiDrcHkMLKI6fiB/Z",
    vers: "moteur/vendor/react.production.min.js",
  },
  reactDom: {
    url: "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js",
    sri: "gTGxhz21lVGYNMcdJOyq01Edg0jhn/c22nsx0kyqP0TxaV5WVdsSH1fSDUf5YJj1",
    vers: "moteur/vendor/react-dom.production.min.js",
  },
  babel: {
    url: "https://unpkg.com/@babel/standalone@7.29.0/babel.min.js",
    sri: "m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y",
    vers: null, // outil de fabrication : reste hors du dépôt
  },
};

const empreinte = (buf) => createHash("sha384").update(buf).digest("base64");

async function rapatrier(nom, def) {
  const destination = def.vers ? resolve(RACINE, def.vers) : join(CACHE, nom + ".js");
  if (existsSync(destination)) {
    const dejaLa = readFileSync(destination);
    if (empreinte(dejaLa) === def.sri) return destination;
    console.error("✗ " + nom + " : le fichier local ne correspond plus à son empreinte — je le reprends");
  }
  const rep = await fetch(def.url);
  if (!rep.ok) throw new Error(nom + " : HTTP " + rep.status + " sur " + def.url);
  const contenu = Buffer.from(await rep.arrayBuffer());
  const vue = empreinte(contenu);
  if (vue !== def.sri) {
    throw new Error(
      "✗ " + nom + " : EMPREINTE INATTENDUE.\n  attendue " + def.sri + "\n  reçue    " + vue +
      "\n  Rien n'est écrit. Ne pas publier ce fichier sans avoir compris pourquoi."
    );
  }
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, contenu);
  console.log("✓ " + nom + " — " + (contenu.length / 1024).toFixed(0) + " Ko, empreinte vérifiée" +
    (def.vers ? " → " + def.vers : " (cache de fabrication)"));
  return destination;
}

const films = readdirSync(resolve(RACINE, "packs/fluides/res"))
  .filter((d) => d.startsWith("film-"))
  .map((d) => resolve(RACINE, "packs/fluides/res", d));

if (!films.length) {
  console.log("Aucun dossier film-* : rien à faire.");
  process.exit(0);
}

await rapatrier("react", DISTANTS.react);
await rapatrier("reactDom", DISTANTS.reactDom);
const cheminBabel = await rapatrier("babel", DISTANTS.babel);

const Babel = createRequire(import.meta.url)(cheminBabel);

let compiles = 0;
for (const film of films) {
  for (const f of readdirSync(film).filter((f) => f.endsWith(".jsx"))) {
    const source = readFileSync(join(film, f), "utf8");
    const { code } = Babel.transform(source, {
      filename: f,
      presets: ["react", "typescript"],
    });
    const sortie = f.replace(/\.jsx$/, ".js");
    writeFileSync(
      join(film, sortie),
      "/* GÉNÉRÉ par build/films.mjs depuis " + f + " — ne pas modifier ici.\n" +
      "   La source reste le .jsx, à côté ; relancer `node build/films.mjs` après l'avoir touché. */\n" +
      code + "\n",
      "utf8"
    );
    compiles++;
  }
}
console.log("✓ " + compiles + " fichier(s) JSX précompilés dans " + films.length + " film(s) — Babel ne part plus chez le visiteur");
