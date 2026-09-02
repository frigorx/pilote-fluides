/* Le défaut des pressostats venait d'une insertion au milieu d'une chaîne
   JavaScript. Ce contrôle compile TOUS les blocs <script> inline de TOUTES les
   pages, découpés comme le fait un navigateur — c'est ce qui aurait attrapé le
   défaut tout de suite. */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const RACINE = process.argv[2] || "C:/git/pilote-fluides";
const ZONES = ["packs/fluides/res", "legislation", "hydrometro", "aerorezo",
  "electrorezo", "hocourant", "aquiblue", "moteur", "."];

function pages(dir, out = [], profondeur = 0) {
  let e; try { e = readdirSync(dir); } catch { return out; }
  for (const n of e) {
    const p = join(dir, n);
    let st; try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) {
      if ([".git", "node_modules", "voix", "audio", "assets", "images"].includes(n)) continue;
      if (profondeur < 6) pages(p, out, profondeur + 1);
    } else if (/\.html$/.test(n)) out.push(p);
  }
  return out;
}

function blocs(html) {
  const out = [];
  let i = 0;
  while (true) {
    const ouv = html.indexOf("<script", i);
    if (ouv === -1) break;
    const finBalise = html.indexOf(">", ouv);
    if (finBalise === -1) break;
    const entete = html.slice(ouv, finBalise + 1);
    const fin = html.indexOf("</script>", finBalise);
    if (fin === -1) break;
    out.push({ entete, code: html.slice(finBalise + 1, fin), ligne: html.slice(0, ouv).split("\n").length });
    i = fin + 9;
  }
  return out;
}

const vus = new Set();
let examinees = 0;
const cassees = [];

for (const z of ZONES) {
  const base = join(RACINE, z);
  if (!existsSync(base)) continue;
  for (const f of pages(base)) {
    if (vus.has(f)) continue;
    vus.add(f);
    examinees++;
    const html = readFileSync(f, "utf8");
    for (const b of blocs(html)) {
      if (/\ssrc=/.test(b.entete) || !b.code.trim()) continue;
      /* le JSON-LD et les gabarits ne sont pas du JavaScript : les compiler
         n'a pas de sens et produit de faux signalements */
      if (/type\s*=\s*"(?!text\/javascript|module)/i.test(b.entete)) continue;
      try { new Function(b.code); }
      catch (e) {
        cassees.push(`${relative(RACINE, f).replace(/\\/g, "/")}:${b.ligne} — ${e.message.slice(0, 55)}`);
      }
    }
  }
}

console.log("pages examinées :", examinees);
console.log("blocs <script> inline en erreur :", cassees.length);
cassees.slice(0, 15).forEach(l => console.log("  ✗ " + l));
