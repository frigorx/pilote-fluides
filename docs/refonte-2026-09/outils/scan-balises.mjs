/* Sonde TEC — balises des pages publiques (hors f/, build, docs, node_modules).
   Lecture seule : ne modifie rien. Sortie JSON sur stdout. */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const RACINE = process.argv[2] || "C:/git/pilote-fluides";
const EXCLUS_DOSSIERS = new Set([".git", "node_modules", "f", "build", "docs", "voix", "audio"]);

function pages(dir, out = []) {
  let e;
  try { e = readdirSync(dir); } catch { return out; }
  for (const n of e) {
    const p = join(dir, n);
    let st;
    try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) {
      if (EXCLUS_DOSSIERS.has(n)) continue;
      pages(p, out);
    } else if (/\.html$/.test(n)) out.push(p);
  }
  return out;
}

const fichiers = pages(RACINE);

function extraire(html) {
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? null;
  const description = html.match(/<meta\b[^>]*\bname=["']description["'][^>]*\bcontent=["']([^"']*)["']/i)?.[1]?.trim()
    ?? html.match(/<meta\b[^>]*\bcontent=["']([^"']*)["'][^>]*\bname=["']description["']/i)?.[1]?.trim()
    ?? null;
  const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, "").trim());
  const lang = html.match(/<html\b[^>]*\blang=["']([^"']*)["']/i)?.[1] ?? null;
  const canonical = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']*)["']/i)?.[1] ?? null;
  const ogTitle = html.match(/<meta\b[^>]*\bproperty=["']og:title["'][^>]*\bcontent=["']([^"']*)["']/i)?.[1] ?? null;
  const ogDescription = html.match(/<meta\b[^>]*\bproperty=["']og:description["'][^>]*\bcontent=["']([^"']*)["']/i)?.[1] ?? null;
  const ogImage = html.match(/<meta\b[^>]*\bproperty=["']og:image["'][^>]*\bcontent=["']([^"']*)["']/i)?.[1] ?? null;
  const ogUrl = html.match(/<meta\b[^>]*\bproperty=["']og:url["'][^>]*\bcontent=["']([^"']*)["']/i)?.[1] ?? null;
  const jsonLd = /<script\b[^>]*type=["']application\/ld\+json["']/i.test(html);
  const noindex = /name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  return { title, titleLen: title ? title.length : 0, description, descLen: description ? description.length : 0,
    h1Count: h1.length, h1, lang, canonical, ogTitle, ogDescription, ogImage, ogUrl, jsonLd, noindex };
}

const resultats = [];
for (const f of fichiers) {
  let html;
  try { html = readFileSync(f, "utf8"); } catch { continue; }
  const chemin = relative(RACINE, f).replace(/\\/g, "/");
  resultats.push({ chemin, ...extraire(html) });
}

console.log(JSON.stringify({ total: resultats.length, pages: resultats }, null, 2));
