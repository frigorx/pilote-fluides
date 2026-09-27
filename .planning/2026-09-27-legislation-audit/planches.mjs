// Planches-contact des illustrations du réseau Législation, une page par branche,
// à ouvrir via le serveur local (port 8123). Lecture seule : ne touche pas aux stations.
import { readdirSync, writeFileSync, existsSync } from "node:fs";
const base = "legislation/stations";
const branches = { thermique: "thermique-", desp: "desp-", risques: "risques-", dechets: "dechets-", impact: "impact-", fluidique: /^(fgaz-3|aptitude-capacite)$/ };
for (const [b, m] of Object.entries(branches)) {
  const st = readdirSync(base).filter(s => typeof m === "string" ? s.startsWith(m) : m.test(s));
  let h = `<!doctype html><meta charset="utf-8"><title>Planche ${b}</title><style>body{font:12px Calibri,sans-serif;margin:8px}h2{margin:14px 0 4px;font-size:14px}.g{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}figure{margin:0;border:1px solid #ccc;padding:3px}img{width:100%;height:auto;display:block;background:#fff}figcaption{font-size:10px;color:#555}</style>`;
  for (const s of st) {
    const dir = `${base}/${s}/svg`; if (!existsSync(dir)) continue;
    h += `<h2>${s}</h2><div class="g">` + readdirSync(dir).filter(f => f.endsWith(".svg")).map(f => `<figure><img src="/${dir}/${f}" alt=""><figcaption>${f}</figcaption></figure>`).join("") + `</div>`;
  }
  writeFileSync(`.planning/2026-09-27-legislation-audit/planche-${b}.html`, h);
  console.log(b, st.length, "stations");
}
