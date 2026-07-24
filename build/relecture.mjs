/* Génère le document de relecture « bon à tirer » : fiches + exercices + banque
   (indices et remédiations compris), avec cases à cocher. Publié à la racine
   pour être partageable par lien. Usage : node build/relecture.mjs */
import { readFileSync, writeFileSync } from "node:fs";

global.window = {};
eval(readFileSync("packs/fluides/pack.pilote.js", "utf8"));
const P = window.PILOTE_PACK;

const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const sansHtml = (s) => String(s || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

let h = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<title>Relecture — pack habilitation fluides (bon à tirer)</title>
<style>
  body { font: 15px/1.5 Calibri, 'Segoe UI', sans-serif; color:#33475b; max-width: 900px; margin: 24px auto; padding: 0 18px; }
  h1 { color:#1b3a63; font-size: 26px; border-bottom: 3px solid #ff6b35; padding-bottom: 8px; }
  h2 { color:#1b3a63; font-size: 20px; margin-top: 38px; border-bottom: 1.5px solid #d7e0e8; padding-bottom: 4px; }
  h3 { color:#1b3a63; font-size: 16px; margin: 26px 0 6px; }
  .meta { color:#8494a4; font-size: 13px; }
  .carte { border: 1.5px solid #d7e0e8; border-radius: 10px; padding: 14px 18px; margin: 14px 0; page-break-inside: avoid; }
  .dc { display:inline-block; font-size:12px; font-weight:700; color:#fff; background:#ff6b35; padding:2px 10px; border-radius:999px; }
  .bloc { border-left: 4px solid #1b3a63; background:#f3f7fb; border-radius: 6px; padding: 8px 12px; margin: 8px 0; font-size: 14px; }
  .bloc b.t { color:#1b3a63; }
  .q { background:#fff8f4; border:1.5px solid #ffd9c2; border-radius:8px; padding:10px 14px; margin:10px 0; }
  .bonne { font-weight:700; color:#1e6b40; }
  .expl { font-size:13.5px; color:#4a5b6e; margin-top:4px; }
  .pilote { background:#fdf3e4; border:1.5px dashed #e8b95c; border-radius:8px; padding:8px 12px; font-size:13.5px; margin-top:8px; }
  .pilote::before { content:"👁 NOTE PILOTE — "; font-weight:700; color:#8a5a00; }
  .verif { float:right; color:#8494a4; font-size:13px; white-space:nowrap; }
  .niveau2 { color:#c9451a; font-weight:700; font-size:12px; }
  ol.choix { margin:6px 0; padding-left: 24px; }
  @media print { .carte { border-color:#aaa; } body { font-size: 12.5px; } }
</style></head><body>
<h1>Relecture « bon à tirer » — pack habilitation fluides</h1>
<p class="meta">Généré le 25/07/2026 depuis le pack publié (${P.cartes.length} cartes, ${P.banque.length} questions).
Pour chaque élément : ✅ = validé · ✏ = à corriger (noter la correction en marge).
Les réponses correctes sont <span class="bonne">en vert gras</span>. Les notes pilote sont dans les encadrés jaunes.</p>
`;

/* ---- 1. fiches et exercices, dans l'ordre du pack ---- */
h += "<h2>1. Les fiches et exercices</h2>";
for (const c of P.cartes) {
  if (!["cours", "exercice", "accueil", "menu", "fin"].includes(c.type)) continue;
  if (["accueil", "menu", "fin"].includes(c.type)) continue; // relecture centrée sur le contenu technique
  h += `<div class="carte"><span class="verif">☐ ✅ &nbsp; ☐ ✏</span>`;
  h += `<span class="dc">${esc(c.dc || c.type)}</span><h3 style="margin-top:6px">${esc(c.titre)} <span class="meta">(${c.id})</span></h3>`;
  h += `<p>${esc(sansHtml(c.corps))}</p>`;
  for (const b of c.blocs || []) {
    const txt = sansHtml(b.html);
    if (!txt || /iframe/.test(b.html || "")) continue;
    h += `<div class="bloc"><b class="t">${esc(b.t || "")}</b> — ${esc(txt)}</div>`;
  }
  if (c.question) {
    const q = c.question;
    h += `<div class="q">❓ ${esc(q.enonce)}<ol class="choix">`;
    q.choix.forEach((x, i) => { h += `<li class="${i === q.bonne ? "bonne" : ""}">${esc(x)}</li>`; });
    h += `</ol><div class="expl">ℹ ${esc(q.explication || "")}</div></div>`;
  }
  if (c.notes_pilote) h += `<div class="pilote">${esc(c.notes_pilote)}</div>`;
  h += `</div>`;
}

/* ---- 2. banque, par groupe puis niveau ---- */
h += "<h2>2. La banque de questions</h2>";
const ordre = ["G1","G2","G3","G4","G5","G6","G7","G8","G9","G10","G11","G12","G13"];
for (const g of ordre) {
  const qs = P.banque.filter((q) => q.dc === g);
  if (!qs.length) continue;
  h += `<h3>${g} — ${qs.length} questions</h3>`;
  qs.sort((a, b) => (a.niveau || 1) - (b.niveau || 1));
  for (const q of qs) {
    h += `<div class="q"><span class="verif">☐ ✅ &nbsp; ☐ ✏</span>`;
    h += (q.niveau === 2 ? `<span class="niveau2">[niveau 2] </span>` : "") + `❓ ${esc(q.enonce)} <span class="meta">(${q.id})</span><ol class="choix">`;
    q.choix.forEach((x, i) => { h += `<li class="${i === q.bonne ? "bonne" : ""}">${esc(x)}</li>`; });
    h += `</ol>`;
    if (q.aide) h += `<div class="expl">💡 <b>Indice :</b> ${esc(q.aide)}</div>`;
    if (q.remed) {
      if (q.remed.texte) h += `<div class="expl">📚 ${esc(q.remed.texte)}</div>`;
      for (const [k, lib] of [["regle", "📏 Règle"], ["pourquoi", "🎯 Pourquoi"], ["exemple", "🧮 Exemple"], ["piege", "⚠ Piège"]])
        if (q.remed[k]) h += `<div class="expl"><b>${lib} :</b> ${esc(q.remed[k])}</div>`;
    } else {
      h += `<div class="expl">ℹ ${esc(q.explication || "")}</div>`;
    }
    h += `</div>`;
  }
}

/* ---- 3. les « à faire valider » ---- */
h += "<h2>3. Les renvois « à faire valider »</h2><p class='meta'>Les endroits où le pack renvoie volontairement à la doc constructeur ou à la norme au lieu de donner un chiffre — à confirmer ou à figer avec vos valeurs terrain.</p><ul>";
for (const c of P.cartes) {
  const tout = sansHtml(c.corps) + " " + (c.blocs || []).map((b) => sansHtml(b.html)).join(" ");
  if (/à faire valider|selon (la )?doc constructeur|selon (la )?réglementation/i.test(tout)) {
    h += `<li><b>${esc(c.titre)}</b> <span class="meta">(${c.id})</span></li>`;
  }
}
h += "</ul>";

h += `<p class="meta" style="margin-top:30px">Fin du document. Une fois annoté, renvoyez-le tel quel : chaque ✏ sera reporté dans le pack, fiche par fiche.</p></body></html>`;

const SORTIE = "relecture.html";
writeFileSync(SORTIE, h, "utf8");
console.log("écrit :", SORTIE, "—", Math.round(h.length / 1024), "Ko");
