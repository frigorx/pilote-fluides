/* Génère le document de relecture à plat : fiches + exercices + banque,
   avec cases à cocher. Sortie : Bureau de Franck. */
import { readFileSync, writeFileSync } from "node:fs";
import { couverture, resoudre } from "./referentiel.mjs";

global.window = {};
eval(readFileSync(new URL("../packs/fluides/pack.pilote.js", import.meta.url), "utf8"));
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
  .comp { border:1.5px solid #1b3a63; background:#f3f7fb; border-radius:8px; padding:8px 14px; margin:10px 0; font-size:13.5px; }
  .comp ul { margin:6px 0 0; padding-left:20px; }
  .comp li { margin-bottom:7px; }
  .comp .tag { font-size:12px; font-weight:700; color:#ff6b35; }
  .comp .neuf { font-size:12px; font-weight:700; color:#b06a00; }
  .comp .reform { font-size:12.5px; color:#5a6b7d; }
  .manque { border:1.5px solid #c0392b; background:#fbe7e4; border-radius:8px; padding:10px 14px; margin:10px 0; font-size:13.5px; }
  .manque .tire { color:#c0392b; font-weight:700; }
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
  // Les compétences que la fiche PRÉTEND couvrir : c'est sur cet écart —
  // entre le libellé de l'arrêté et ce que le contenu enseigne vraiment —
  // que porte l'essentiel de la relecture métier.
  if ((c.criteres || []).length) {
    h += `<div class="comp"><b>🎯 Compétences visées</b> <span class="meta">(arrêté du 21/11/2025, annexe II.B)</span><ul>`;
    for (const cr of c.criteres) {
      const tag = cr.information
        ? "information — évalué en " + (cr.evalue_en || []).join(", ")
        : Object.entries(cr.epreuve || {})
            .map(([k, v]) => k + " " + (v === "P" ? "pratique" : "théorique"))
            .join(" · ");
      h += `<li><b>${esc(cr.code)}</b> <span class="tag">${esc(tag)}</span>` +
        (cr.nouveau ? ` <span class="neuf">★ nouveau 2025</span>` : "") +
        (cr.tirage_au_sort ? ` <span class="neuf">⚠ groupe tiré au sort</span>` : "") +
        `<br><i>${esc(cr.officiel)}</i>` +
        `<br><span class="reform">Dit à l'élève : « ${esc(cr.libelle)} »</span></li>`;
    }
    h += `</ul></div>`;
  }
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
    const rat = q.code
      ? `<span class="tag">${esc(q.code)}</span> <span class="meta">${esc((resoudre(q.code) || {}).officiel || "")}</span>`
      : `<span class="tag" style="color:#c0392b">hors référentiel</span>`;
    h += (q.niveau === 2 ? `<span class="niveau2">[niveau 2] </span>` : "") +
      `❓ ${esc(q.enonce)} <span class="meta">(${q.id})</span><div style="font-size:12.5px;margin:3px 0">${rat}</div><ol class="choix">`;
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

/* ---- 2 bis. les questions qu'aucun code ne couvre — décision éditoriale ---- */
const horsRef = P.banque.filter((q) => q.hors_ref);
if (horsRef.length) {
  h += `<h2>2 bis. Les ${horsRef.length} questions hors référentiel — à trancher</h2>`;
  h += `<p class="meta">Aucun code de l'annexe II.B ne couvre honnêtement ces questions. Elles n'ont pas été
  rattachées de force : un faux rattachement ferait croire à une couverture qui n'existe pas. Le savoir reste
  utile au métier — mais il ne sera pas évalué à l'examen. <b>Trois options par question : la garder telle quelle
  (culture métier), la retirer de la banque, ou la rattacher à un code que vous jugez légitime.</b></p>`;
  for (const q of horsRef) {
    h += `<div class="q"><span class="verif">☐ garder &nbsp; ☐ retirer &nbsp; ☐ rattacher à : ……………</span>`;
    h += `❓ ${esc(q.enonce)} <span class="meta">(${q.id} — rangée en ${esc(q.dc)})</span><ol class="choix">`;
    q.choix.forEach((x, i) => { h += `<li class="${i === q.bonne ? "bonne" : ""}">${esc(x)}</li>`; });
    h += `</ol></div>`;
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

/* ---- 4. couverture du référentiel : les trous, dits franchement ---- */
h += "<h2>4. Ce que le pack ne couvre pas encore</h2>";
const cites = new Set();
for (const c of P.cartes) for (const cr of c.criteres || []) cites.add(cr.code);
const cats = P.pack.categories || [];
const cv = couverture([...cites], cats);
h += `<p class="meta">Le référentiel compte 136 codes ; ce pack en traite ${cites.size}.
Un code « non traité » ne veut pas dire absent du contenu : il veut dire qu'aucune fiche ne le
revendique, donc que personne ne peut garantir qu'il est enseigné.</p>`;
h += `<ul>`;
for (const cat of cats) {
  const r = cv[cat];
  h += `<li><b>${cat}</b> — ${r.couverts} / ${r.requis} codes couverts (${r.pourcent} %)` +
    (r.manquants ? `, <b style="color:#c0392b">${r.manquants} manquant(s)</b>` : ", complet ✅") + `</li>`;
}
h += `</ul>`;

// union des manquants, chaque code annoté des catégories qui l'exigent
const union = new Map();
for (const cat of cats)
  for (const liste of Object.values(cv[cat].par_groupe))
    for (const c of liste) {
      if (!union.has(c.code)) union.set(c.code, { code: c.code, cats: [], tirage: c.tirage_au_sort });
      union.get(c.code).cats.push(cat + " " + (c.epreuve === "P" ? "pratique" : "théorique"));
    }
const parGroupe = {};
for (const u of union.values()) {
  const info = resoudre(u.code);
  (parGroupe[info.groupe] = parGroupe[info.groupe] || { titre: info.groupe_titre, tirage: u.tirage, codes: [] })
    .codes.push({ ...u, info });
}
for (const [gid, g] of Object.entries(parGroupe)) {
  h += `<div class="manque"><b>${gid} — ${esc(g.titre)}</b>` +
    (g.tirage ? ` <span class="tire">⚠ groupe tiré au sort à l'épreuve : le candidat en aura forcément un</span>` : "") + `<ul>`;
  for (const c of g.codes.sort((a, b) => a.code.localeCompare(b.code)))
    h += `<li><b>${esc(c.code)}</b> <span class="tag">${esc(c.cats.join(" · "))}</span>` +
      (c.info.nouveau ? ` <span class="neuf">★ nouveau 2025</span>` : "") +
      `<br><i>${esc(c.info.officiel)}</i></li>`;
  h += `</ul></div>`;
}

h += `<p class="meta" style="margin-top:30px">Fin du document. Une fois annoté, renvoyez-le tel quel : chaque ✏ sera reporté dans le pack, fiche par fiche.</p></body></html>`;

const SORTIE = new URL("../relecture.html", import.meta.url);
writeFileSync(SORTIE, h, "utf8");
console.log("✓ relecture.html écrit —", Math.round(h.length / 1024), "Ko");
