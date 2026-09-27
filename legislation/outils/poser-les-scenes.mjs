// Pose la scène de sa sous-ligne en tête de l'accueil de chaque station :
// <figure class="scene"> juste après .sous-titre. Idempotent (ne double jamais).
// La branche se lit dans le slug ; l'image vit dans legislation/img/scene-<branche>.webp.
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const racine = join(dirname(fileURLToPath(import.meta.url)), "..", "stations");
const branche = s => /^(fgaz-3|aptitude-capacite)$/.test(s) ? "fluidique" : s.split("-")[0];
const exclure = process.argv[2] || "";   // préfixe de slug à laisser de côté (branche en cours d'édition)
let poses = 0, deja = 0, sans = 0;
for (const s of readdirSync(racine)) {
  if (exclure && s.startsWith(exclure)) continue;
  const f = join(racine, s, "index.html");
  if (!existsSync(f)) continue;
  let h = readFileSync(f, "utf8");
  if (h.includes('class="scene"')) { deja++; continue; }
  const img = `../../img/scene-${branche(s)}.webp`;
  if (!existsSync(join(racine, s, img))) { sans++; console.log("pas d'image :", s); continue; }
  const bloc = `\n  <figure class="scene"><img src="${img}" alt="" width="1536" height="1024" loading="lazy"></figure>`;
  const h2 = h.replace(/(<p class="sous-titre">[^\n]*<\/p>)/, "$1" + bloc);
  if (h2 === h) { console.log("sous-titre introuvable :", s); continue; }
  writeFileSync(f, h2);
  poses++;
}
console.log(`scènes posées : ${poses} · déjà posées : ${deja} · sans image : ${sans}`);
