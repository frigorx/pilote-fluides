/* =====================================================================
   carnet-papier.mjs — le carnet du chargé d'affaires, en papier
   ---------------------------------------------------------------------
   Deux documents, chacun en HTML, PDF (Chrome sans fenêtre) et docx natif :
     carnet/carnet-eleve.{html,pdf,docx}       le carnet de l'étudiant (A4, corps 14 pt mini)
     carnet/carnet-eleve-P1..P5.{html,pdf,docx} le même, une période à la fois (à imprimer en classe)
     carnet/livret-professeur.{html,pdf,docx}  la progression, les corrigés, les grilles 0 à 4
   Tout est GÉNÉRÉ — jamais écrit à la main — depuis :
     · index.html (tableau RESEAU : les sous-lignes et l'ordre des stations),
     · progression.json (périodes, fil rouge, règle du tampon),
     · stations/<slug>/mission.json (la mission de chaque station),
     · stations/<slug>/FOND.md, rubrique « À sourcer » (points de vigilance du livret).
   Une station sans mission.json donne une page « Mission en préparation » : relancer ce
   script quand elle arrive suffit à la faire entrer dans le carnet.

   Une mission = une feuille recto-verso (2 pages) :
     recto  la commande : client, situation, pièce à produire (cadre à remplir), QR, tampon ;
     verso  les 4 questions (avec renvoi « écran n ») et le défi, lignes de réponse.
   Les zones à écrire s'étirent pour que la page soit toujours pleine (jamais d'espace vide).

   Usage : node legislation/outils/carnet-papier.mjs                (tout : html + pdf + docx)
           node legislation/outils/carnet-papier.mjs --sans-pdf     (html et docx seulement)
           node legislation/outils/carnet-papier.mjs --sans-docx
   Dépend : paquets npm « qrcode » et « docx » (versions épinglées dans outils/package.json :
   cd legislation/outils && npm install), Chrome, ffmpeg (webp → png pour le docx).
   Contrôle à lancer ensuite : python legislation/outils/verifier-carnet.py (polices, remplissage, QR relus dans le PDF ;
   carnet/qr-attendus.json en est l'entrée) ; et mesurer-polices.py de progression-2a-cap-ifca.
   ===================================================================== */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import vm from "node:vm";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const STATIONS = join(RACINE, "stations");
const SORTIE = join(RACINE, "carnet");
const BASE = "https://inerweb.fr/legislation/";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const args = process.argv.slice(2);
const SANS_PDF = args.includes("--sans-pdf"), SANS_DOCX = args.includes("--sans-docx");

/* qrcode et docx sont épinglés dans outils/package.json : cd legislation/outils && npm install */
const require = createRequire(import.meta.url);
const QR = require("qrcode");
const D = SANS_DOCX ? null : require("docx");

/* ---------------------------------------------------------------- charte */
const NAVY = "1B3A63", ORANGE = "E8914A", GRIS = "56657A", TXT = "10233C";
const CP = { CP1: "plans d’implantation", CP2: "modélisation", CP3: "réseaux sanitaires", CP4: "VMC", CP5: "déperditions",
  CP6: "chauffage / ECS", CP7: "ventilation tertiaire", CP8: "apports", CP9: "climatisation", CP10: "CTA" };
const ECHELLE = [
  { n: 0, nom: "Non évalué", critere: "Mission non traitée, ou étudiant absent (absence notée ABS, distincte du 0)." },
  { n: 1, nom: "Non acquis", critere: "Moins de 3 bonnes réponses sur 4, ou pièce absente ou hors sujet : la notion est à reprendre avec le professeur." },
  { n: 2, nom: "En cours", critere: "Tampon obtenu, mais pièce incomplète ou reprise nécessaire après remarque du professeur." },
  { n: 3, nom: "Acquis", critere: "Tampon obtenu, pièce complète et juste, défi réussi." },
  { n: 4, nom: "Parfaitement maîtrisé", critere: "Tout du premier coup, et l’étudiant justifie chaque réponse en citant le texte ou l’écran de la station." },
];
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const hm = (min) => (min >= 60 ? `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, "0")}` : `${min} min`);
const pluriel = (n, un, plu) => `${n} ${n > 1 ? plu : un}`;

/* ================================================================ 1. LE MODÈLE */
function lireMission(slug) {
  const f = join(STATIONS, slug, "mission.json");
  if (!existsSync(f)) return null;
  try { return JSON.parse(readFileSync(f, "utf8")); }
  catch (e) { console.warn(`mission.json illisible, page « en préparation » : ${slug} (${e.message})`); return null; }
}
const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const MOTS_VIDES = new Set(["et", "le", "la", "les", "de", "du", "des", "un", "une", "a", "l", "d"]);
const jetons = (s) => norm(s).split(" ").filter((x) => x && !MOTS_VIDES.has(x));

function modele() {
  const plan = readFileSync(join(RACINE, "index.html"), "utf8");
  const debut = plan.indexOf("var RESEAU = [");
  const fin = plan.indexOf("\n  ];", debut);
  if (debut < 0 || fin < 0) { console.error("Tableau RESEAU introuvable dans index.html"); process.exit(1); }
  const RESEAU = vm.runInNewContext("(" + plan.slice(debut + "var RESEAU = ".length, fin + 4) + ")");
  const prog = JSON.parse(readFileSync(join(RACINE, "progression.json"), "utf8"));

  /* correspondance nom de la station du plan → dossier : le href du plan quand il existe ; sinon le titre de la
     page de la station ; sinon les mots du nom retrouvés dans le nom du dossier (un seul candidat) */
  const dossiers = readdirSync(STATIONS).filter((s) => existsSync(join(STATIONS, s)) && !/\./.test(s));
  const titres = {};
  for (const s of dossiers) {
    const f = join(STATIONS, s, "index.html");
    if (!existsSync(f)) continue;
    const m = readFileSync(f, "utf8").match(/<title>([^<]*)<\/title>/);
    if (m) (titres[norm(m[1].split(/ [—–-] /)[0])] ||= []).push(s);
  }
  const pris = new Set();
  const toutes = RESEAU.flatMap((m) => m.filles.map((f) => ({ mere: m, fille: f })));
  for (const { fille } of toutes) for (const s of fille.stations) if (s.href) pris.add(s.href.replace(/^stations\//, "").replace(/\/$/, ""));
  for (const { fille } of toutes) for (const s of fille.stations) {
    s.slug = s.href ? s.href.replace(/^stations\//, "").replace(/\/$/, "") : null;
    if (s.slug) continue;
    const t = (titres[norm(s.nom)] || []).filter((x) => !pris.has(x));
    if (t.length === 1) { s.slug = t[0]; pris.add(s.slug); }
  }
  for (const { fille } of toutes) for (const s of fille.stations) {
    if (s.slug) continue;
    const jn = jetons(s.nom);
    const c = dossiers.filter((d) => !pris.has(d) && jn.length && jn.every((j) => jetons(d).includes(j)));
    if (c.length === 1) { s.slug = c[0]; pris.add(s.slug); }
    else if (c.length > 1) console.warn(`station du plan ambiguë (${c.join(", ")}) : ${s.nom}`);
  }

  const parId = new Map(toutes.map((x) => [x.fille.id, x]));
  let numero = 0;
  const periodes = prog.periodes.map((p) => ({
    ...p,
    lignes: p.sous_lignes.map((id) => {
      const { mere, fille } = parId.get(id) || {};
      if (!fille) { console.error(`sous-ligne inconnue dans progression.json : ${id}`); process.exit(1); }
      return {
        id, nom: fille.nom, sous: fille.sous, couleur: fille.couleur, ico: fille.ico, mere: mere.nom,
        stations: fille.stations.map((s) => {
          const mission = s.slug ? lireMission(s.slug) : null;
          return { numero: ++numero, nom: s.nom, sous: s.sous, slug: s.slug, mission, vigilance: mission ? vigilance(s.slug) : [] };
        }),
      };
    }),
  }));
  const lignes = periodes.flatMap((p) => p.lignes.map((l) => ({ ...l, periode: p })));
  const stations = lignes.flatMap((l) => l.stations.map((s) => ({ ...s, ligne: l, periode: l.periode })));
  return { entreprise: prog.entreprise, fil_rouge: prog.fil_rouge, tampons: prog.tampons, periodes, lignes, stations, total: stations.length };
}

/* points de vigilance : la rubrique « À sourcer » de la fiche de fabrication (valeurs et textes à confirmer) */
function vigilance(slug) {
  const f = join(STATIONS, slug, "FOND.md");
  if (!existsSync(f)) return [];
  const t = readFileSync(f, "utf8").replace(/\r/g, "");
  const i = t.search(/^## À sourcer/m);
  if (i < 0) return [];
  const suite = t.slice(i).replace(/^## À sourcer[^\n]*\n/, "");
  const corps = suite.split(/^## /m)[0];
  const puces = [];
  for (const l of corps.split("\n")) {
    if (/^- /.test(l)) puces.push(l.slice(2));
    else if (puces.length && /^\s+\S/.test(l)) puces[puces.length - 1] += " " + l.trim();
  }
  return puces
    .map((p) => p.replace(/\*\*/g, "").replace(/`/g, "").replace(/\s+/g, " ").trim())
    .filter((p) => !/^(voix|mp3|narration|claude design|illustration|svg|scène|consignes)/i.test(p))
    .map((p) => (p.length > 240 ? p.slice(0, p.lastIndexOf(" ", 237)) + "…" : p))
    .slice(0, 4);
}

/* codes du référentiel d'une mission */
function codes(m) {
  const r = m?.referentiel || {};
  const cp = r.tecvc || [], att = r.attestation_2025 || [];
  return { cp, att, hors: !cp.length };
}
function ligneCodes(m) {
  const { cp, att, hors } = codes(m);
  const a = att.length ? ` · Attestation 2025 : ${att.join(" ")}` : "";
  return (hors ? "Hors REAC : culture professionnelle" : `TP TECVC : ${cp.join(" · ")}`) + a;
}
function attestationLibelles() {
  try {
    const r = JSON.parse(readFileSync(join(RACINE, "..", "packs", "fluides", "referentiel-2025.json"), "utf8"));
    const o = {};
    for (const g of r.groupes) for (const c of g.codes) o[c.code] = c.libelle;
    return o;
  } catch { return {}; }
}
/* libellé officiel raccourci à une coupure naturelle (avant « , notamment », « , y compris », « , tels que »…), sinon au dernier mot */
function court(s, n = 150) {
  const m = s.search(/,? (notamment|y compris|tels que|ainsi que|de même que)|\. |; /);
  if (m > 30 && m <= n) return s.slice(0, m);
  if (s.length <= n) return s;
  const v = s.lastIndexOf(",", n - 1);
  return v > 50 ? s.slice(0, v) : s.slice(0, s.lastIndexOf(" ", n - 1)) + "…";
}

/* ================================================================ 2. LES QR */
const urlStation = (slug) => `${BASE}stations/${slug}/`;
const qrSvg = async (slug) => (await QR.toString(urlStation(slug), { type: "svg", margin: 1, errorCorrectionLevel: "M" }))
  .replace("<svg ", '<svg shape-rendering="crispEdges" ');
const qrPng = (slug) => QR.toBuffer(urlStation(slug), { type: "png", margin: 1, width: 420, errorCorrectionLevel: "M" });

/* nombre de rangées (une ligne de station ou d'en-tête) qu'occupe une période sur la carte des tampons */
const rangees = (p) => 1.5 + Math.ceil(p.lignes.length / 2) + p.lignes.reduce((t, l, i) => (i % 2 ? t : t + Math.max(l.stations.length, p.lignes[i + 1] ? p.lignes[i + 1].stations.length : 0)), 0);

/* ================================================================ 3. LE CARNET ÉLÈVE — HTML */
const CSS_COMMUN = `
@page { size: A4; margin: 0 }
* { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact }
html, body { margin: 0; padding: 0 }
:root { --navy: #1b3a63; --or: #e8914a; --gris: #56657a; --txt: #10233c; --trait: #8fa0b3 }
body { font: 14pt/1.28 Calibri, 'Segoe UI', Arial, sans-serif; color: var(--txt); background: #fff }
h1, h2, h3, .titre { font-family: 'Trebuchet MS', Calibri, Arial, sans-serif; color: var(--navy); margin: 0 }
p { margin: 0 }
b, strong { font-weight: bold }
@media screen { body { background: #d9e0e8 } .page { margin: 8mm auto; box-shadow: 0 1mm 4mm rgba(0,0,0,.25) } }
`;

const CSS_ELEVE = `
.page { width: 210mm; height: 297mm; padding: 9mm 12mm 6mm; display: flex; flex-direction: column; gap: 2.6mm; overflow: hidden; break-after: page; background: #fff }
.page:last-child { break-after: auto }
.bandeau { white-space: nowrap; display: flex; justify-content: space-between; gap: 4mm; background: var(--c); color: #fff; font-weight: bold; padding: 1.6mm 4mm; border-radius: 2mm }
h1 { font-size: 21pt; line-height: 1.12 }
.bloc { border-left: 1.4mm solid var(--c); padding-left: 3.2mm }
.bloc > .lib { display: block; font-weight: bold; color: var(--c); }
.grow { flex: 1 1 auto; display: flex; flex-direction: column; min-height: 0 }
.zone { flex: 1 1 0; min-height: 15mm; border: .4mm solid var(--trait); border-radius: 2mm; overflow: hidden;
  display: flex; flex-direction: column-reverse }
.zone i { flex: none; height: 8.4mm; border-top: .3mm solid #b3bfcd }
.lib2 { font-weight: bold; color: var(--navy) }
.bas { display: flex; gap: 4mm; align-items: stretch }
.qr { width: 38mm; flex: none; text-align: center; line-height: 1.15 }
.qr svg { width: 33mm; height: 33mm; display: block; margin: 0 auto 1mm }
.tampon { flex: 1; border: .5mm dashed var(--gris); border-radius: 2mm; padding: 2mm 3mm; color: var(--gris); font-weight: bold; min-height: 38mm }
.badge { width: 60mm; flex: none; display: flex; flex-direction: column; justify-content: space-between; gap: 2mm }
.badge .nom { font-weight: bold; color: var(--c); font-size: 15pt; line-height: 1.15 }
.pied { border-top: .7mm solid var(--or); padding-top: 1.4mm; line-height: 1.2 }
.pied .l1 { font-weight: bold; color: var(--navy) }
.pied .l2 { display: flex; justify-content: space-between; color: var(--gris) }
.marque b { color: var(--navy) } .marque i { font-family: 'Segoe Script', cursive; font-style: normal; color: var(--navy) }
.q { flex: 1 1 auto; display: flex; flex-direction: column; gap: 1mm }
.q .qt { display: flex; gap: 3mm }
.q .qn { flex: none; width: 9mm; height: 9mm; border-radius: 50%; background: var(--c); color: #fff; font-weight: bold; text-align: center; line-height: 9mm }
.q .ecr { color: var(--gris); font-weight: bold; white-space: nowrap }
.defi { flex: 1.5 1 auto; display: flex; flex-direction: column; gap: 1.4mm; border: .5mm solid var(--c); border-radius: 2mm; padding: 2mm 3.4mm }
.defi .tete { font-weight: bold; color: #fff; background: var(--c); border-radius: 1.4mm; padding: .6mm 3mm; align-self: flex-start }
.defi ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 1mm }
.defi li { display: flex; gap: 2.5mm; align-items: baseline }
.defi li .txt { flex: 1 }
.case { display: inline-block; flex: none; width: 6.2mm; height: 6.2mm; border: .45mm solid var(--navy); border-radius: 1mm; vertical-align: -1.2mm }
.vf { flex: none; white-space: nowrap; font-weight: bold; color: var(--navy) }
.blanc { flex: 0 0 36mm; border-bottom: .4mm solid var(--navy); height: 6mm }
.relier { display: flex; gap: 6mm } .relier ul { flex: 1 }
.liaisons { font-weight: bold; color: var(--navy) }
.rappel { color: var(--gris) }
/* couverture */
.couv { padding: 0; gap: 0; background: #fff }
.couv img { width: 210mm; height: 152mm; object-fit: cover; display: block }
.couv .corps { flex: 1; padding: 9mm 14mm 8mm; display: flex; flex-direction: column; gap: 5mm }
.couv h1 { font-size: 34pt; line-height: 1.05 }
.couv .sous { font-size: 17pt; color: var(--gris); font-weight: bold }
.couv .champs { margin-top: auto; display: flex; flex-direction: column; gap: 4mm }
.couv .champ { font-size: 17pt; font-weight: bold; color: var(--navy); border-bottom: .5mm solid var(--trait); padding-bottom: 1mm }
.couv .pied { margin: 0 14mm 8mm }
/* pages d'ouverture */
.titrepage { font-size: 26pt; line-height: 1.1; border-bottom: .8mm solid var(--or); padding-bottom: 2mm }
.etapes { flex: 1; display: flex; flex-direction: column; gap: 4mm; counter-reset: e }
.etape { flex: 1; display: flex; gap: 5mm; align-items: center; border: .5mm solid var(--trait); border-radius: 3mm; padding: 3mm 5mm }
.etape .n { flex: none; width: 15mm; height: 15mm; border-radius: 50%; background: var(--navy); color: #fff; font: bold 24pt/15mm 'Trebuchet MS', sans-serif; text-align: center }
.etape .t { font-size: 17pt; line-height: 1.22 } .etape .t b { color: var(--navy) }
.encadre { border: .5mm solid var(--or); background: #fdf3e8; border-radius: 3mm; padding: 3.5mm 5mm }
.frise { flex: 1; display: flex; flex-direction: column; position: relative; padding-left: 16mm }
.frise::before { content: ""; position: absolute; left: 6.6mm; top: 6mm; bottom: 6mm; width: 1.6mm; background: var(--trait) }
.per { flex: 1; position: relative; padding: 2.4mm 0 2.4mm 0; display: flex; flex-direction: column; gap: 1.4mm; justify-content: center }
.per .pt { position: absolute; left: -16mm; top: 50%; margin-top: -7mm; width: 14mm; height: 14mm; border-radius: 50%; background: var(--navy); color: #fff; font: bold 17pt/14mm 'Trebuchet MS', sans-serif; text-align: center }
.per h3 { font-size: 18pt }
.per .meta { color: var(--or); font-weight: bold; filter: brightness(.78) }
.chips { display: flex; flex-wrap: wrap; gap: 2mm }
.chip { background: var(--c); color: #fff; font-weight: bold; border-radius: 999px; padding: .4mm 3.4mm }
.carte { flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 2mm }
.cp { display: flex; flex-direction: column; gap: 1.6mm }
.cper { font: bold 16pt 'Trebuchet MS', sans-serif; color: var(--navy); border-bottom: .6mm solid var(--or); padding-bottom: .6mm }
.cgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 2.4mm 6mm; align-items: start }
.cbloc { display: flex; flex-direction: column; gap: 0; break-inside: avoid }
.cbloc .ch { background: var(--c); color: #fff; font-weight: bold; padding: 0 3mm; min-height: var(--h); border-radius: 1.4mm; display: flex; justify-content: space-between; align-items: center; gap: 2mm }
.cbloc .ch .cert { display: flex; gap: 1.6mm; align-items: center; white-space: nowrap }
.cbloc .ch .cert .case { border-color: #fff; width: 5mm; height: 5mm }
.cst { display: flex; gap: 2.4mm; align-items: center; line-height: 1.1; min-height: var(--h) }
.cst .case { width: 5.6mm; height: 5.6mm }
.cst .no { color: var(--gris); font-weight: bold; min-width: 8mm }
/* carnet d'une période */
.couvp img { width: 210mm; height: 92mm; object-fit: cover; display: block }
.couvp { padding: 0; gap: 0 }
.couvp .corps { flex: 1; padding: 6mm 12mm 0; display: flex; flex-direction: column; gap: 3.4mm }
.couvp h1 { font-size: 30pt; line-height: 1.05 }
.couvp .meta { font-size: 16pt; font-weight: bold; color: #b8692e }
.couvp .pq { font-size: 16pt; line-height: 1.25 }
.couvp .champs { margin-top: auto; display: flex; flex-direction: column; gap: 3mm; padding-bottom: 3mm }
.couvp .champ { font-size: 16pt; font-weight: bold; color: var(--navy); border-bottom: .5mm solid var(--trait); padding-bottom: 1mm }
.couvp .pied { margin: 0 12mm 6mm }
.hfrise { display: flex; gap: 2mm }
.hf { flex: 1; border: .5mm solid var(--trait); border-radius: 2mm; padding: 1.4mm 2mm; color: var(--gris); line-height: 1.15 }
.hf b { display: block; font-size: 16pt; font-family: 'Trebuchet MS', sans-serif }
.hf.on { background: var(--navy); border-color: var(--navy); color: #fff }
.cartes3 { flex: 1; display: flex; flex-direction: column; gap: 3mm }
.csl { flex: var(--n) 1 0; display: flex; flex-direction: column; gap: 1.4mm; min-height: 0 }
.csl .ch { background: var(--c); color: #fff; font-weight: bold; padding: .8mm 3mm; border-radius: 1.4mm; display: flex; justify-content: space-between; align-items: center }
.csl .ch .cert { display: flex; gap: 1.6mm; align-items: center; white-space: nowrap }
.csl .ch .cert .case { border-color: #fff; width: 5mm; height: 5mm }
.cards { flex: 1; display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 1fr; gap: 2.4mm; min-height: 0 }
.card { border: .5mm solid var(--c); border-radius: 2mm; padding: 1.4mm 2.4mm; display: flex; flex-direction: column; gap: 1mm; min-height: 0 }
.card .nm { font-weight: bold; line-height: 1.12 } .card .nm span { color: var(--c) }
.card .st { flex: 1; border: .45mm dashed var(--gris); border-radius: 1.6mm; color: var(--gris); padding: .6mm 2mm; min-height: 9mm }
.certifs { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 3.5mm; grid-auto-rows: 1fr }
.certif { border: .6mm solid var(--c); border-radius: 3mm; padding: 2.5mm 4mm; display: flex; flex-direction: column; justify-content: space-between; gap: 1mm }
.certif .h { font-weight: bold; color: var(--c) }
.diplome { border: 1mm double var(--navy); border-radius: 3mm; padding: 4mm 6mm; text-align: center; background: #f3f6fa }
.diplome .grand { font: bold 22pt 'Trebuchet MS', sans-serif; color: var(--navy) }
.glos { display: flex; flex-direction: column; gap: 1.6mm }
.glos .r { display: flex; gap: 3mm; align-items: baseline }
.glos .code { flex: none; min-width: 17mm; background: var(--navy); color: #fff; font-weight: bold; text-align: center; border-radius: 1.2mm; padding: 0 1.5mm }
.glos .lib { flex: 1; line-height: 1.2 }
`;

const bandeauHtml = (s) => `<div class="bandeau"><span>Mission ${s.numero}/__TOTAL__ · ${esc(s.ligne.nom)}</span><span>${esc(s.periode.id)} · sem. ${esc(s.periode.semaines)}${s.mission ? " · " + s.mission.duree_min + " min" : ""}</span></div>`;
const piedHtml = (codesTxt, droite) => `<div class="pied"><div class="l1">${esc(codesTxt)}</div><div class="l2"><span class="marque"><b>iner</b><i>Web</i> · Législation · Clim’Études Sud</span><span>${esc(droite)}</span></div></div>`;
const couleur = (s) => `style="--c:${esc(s.ligne.couleur)}"`;

function defiHtml(d) {
  const it = d.items || [];
  let corps = "";
  if (d.type === "relier") {
    const G = it.filter((x) => /^[A-Z]\.\s/.test(x)), Dr = it.filter((x) => /^\d+\.\s/.test(x));
    if (G.length && Dr.length && G.length + Dr.length === it.length) {
      corps = `<div class="relier"><ul>${G.map((x) => `<li><span class="txt">${esc(x)}</span></li>`).join("")}</ul><ul>${Dr.map((x) => `<li><span class="txt">${esc(x)}</span></li>`).join("")}</ul></div>` +
        `<p class="liaisons">Mes liaisons : ${G.map((x) => x[0] + " → ____").join("   ")}</p>`;
    }
  }
  if (!corps && it.length) {
    const marque = d.type === "vrai-faux" ? '<span class="vf">V <span class="case"></span>&nbsp; F <span class="case"></span></span>'
      : d.type === "classer" || d.type === "trouver-l-erreur" ? '<span class="case"></span>' : "";
    if (d.type === "calcul") corps = `<ul>${it.map((x) => `<li><span class="txt">${esc(x)}</span><span class="blanc"></span></li>`).join("")}</ul>`;
    else corps = `<ul>${it.map((x) => (d.type === "vrai-faux" ? `<li><span class="txt">${esc(x)}</span>${marque}</li>` : `<li>${marque}<span class="txt">${esc(x)}</span></li>`)).join("")}</ul>`;
  }
  return corps;
}
const ZONE = `<div class="zone">${"<i></i>".repeat(34)}</div>`;
const TYPES = { "vrai-faux": "Vrai ou faux", relier: "Relier", classer: "Classer", calcul: "Calculer", "trouver-l-erreur": "Trouver l’erreur" };

function pagesMission(s, qrs) {
  const m = s.mission, n = `${s.numero}/__TOTAL__`;
  if (!m) {
    const qr = s.slug ? `<div class="qr">${qrs.get(s.slug)}<div>Scannez : la station</div></div>` : "";
    return [
      `<section class="page" ${couleur(s)}>${bandeauHtml(s)}<h1>Mission en préparation : ${esc(s.nom)}</h1>
        <div class="bloc"><span class="lib">Cette mission n’est pas encore écrite</span>La station « ${esc(s.nom)} » (${esc(s.sous || "")}) fait partie du carnet, mais sa mission n’est pas encore prête. Votre professeur vous dira quoi faire à sa place : notez ici ce qu’il demande.</div>
        <div class="grow"><div class="lib2">Mes notes</div>${ZONE}</div>
        <div class="bas">${qr}<div class="tampon">Tampon du professeur</div></div>
        ${piedHtml("Codes du référentiel : à venir avec la mission", `mission ${n}`)}</section>`,
      `<section class="page" ${couleur(s)}>${bandeauHtml(s)}<div class="grow"><div class="lib2">Mes notes</div>${ZONE}</div>${piedHtml("Codes du référentiel : à venir avec la mission", `mission ${n}`)}</section>`,
    ];
  }
  const c = codes(m);
  const travaille = c.hors ? "Hors REAC : culture professionnelle du technicien et du chargé d’affaires"
    : c.cp.map((x) => `${x} ${CP[x] || ""}`.trim()).join(" · ");
  const recto = `<section class="page" ${couleur(s)}>
    ${bandeauHtml(s)}
    <h1>${esc(m.titre)}</h1>
    <div class="bloc"><span class="lib">Le client</span>${esc(m.client)}</div>
    <div class="bloc"><span class="lib">La situation</span>${esc(m.situation)}</div>
    <div class="bloc"><span class="lib">La pièce à produire</span>${esc(m.piece_a_produire)}</div>
    <div class="grow"><div class="lib2">Ma pièce : je la prépare ici, puis je la rends</div>${ZONE}</div>
    <p class="rappel"><b>Je travaille :</b> ${esc(travaille)}</p>
    <div class="bas">
      <div class="qr">${qrs.get(s.slug)}<div>Scannez : la station</div></div>
      <div class="tampon">Tampon du professeur<br>Date : ______________</div>
      <div class="badge"><div><span class="rappel">Tampon à gagner</span><div class="nom">${esc(m.badge)}</div></div><div class="rappel">${m.duree_min} min · 3 bonnes réponses sur 4</div></div>
    </div>
    ${piedHtml(ligneCodes(m), `mission ${n} · recto`)}
  </section>`;
  const verso = `<section class="page" ${couleur(s)}>
    ${bandeauHtml(s)}
    <p class="lib2">Questions et défi · ${esc(m.titre)}</p>
    ${m.questions.map((q, i) => `<div class="q"><div class="qt"><span class="qn">${i + 1}</span><span>${esc(q.q)} <span class="ecr">(station, écran ${esc(q.ecran)})</span></span></div>${ZONE}</div>`).join("")}
    <div class="defi"><span class="tete">Défi · ${esc(TYPES[m.defi.type] || m.defi.type)}</span><p>${esc(m.defi.consigne)}</p>${defiHtml(m.defi)}${ZONE}</div>
    ${piedHtml(ligneCodes(m), `mission ${n} · verso`)}
  </section>`;
  return [recto, verso];
}

/* pages d'ouverture et de fin */
function pagesOuverture(M, rimg) {
  const total = M.total;
  const nbMissions = M.stations.filter((s) => s.mission).length;
  const duree = M.stations.reduce((t, s) => t + (s.mission?.duree_min || 0), 0);
  const couv = `<section class="page couv">
    <img src="${rimg}" alt="">
    <div class="corps"><div class="sous">${esc(M.entreprise)} · BTS · TP TECVC</div>
    <h1>Mon carnet du chargé d’affaires</h1>
    <div class="sous">Réglementation, sécurité et environnement · ${total} missions · ${M.lignes.length} branches · 5 périodes</div>
    <div class="champs"><div class="champ">Nom : </div><div class="champ">Prénom : </div><div class="champ">Classe : </div></div></div>
    ${piedHtml("Carnet lié au réseau Législation : inerweb.fr/legislation", "CC BY-NC-ND")}</section>`;

  const mode = `<section class="page">
    <h1 class="titrepage">Comment ça marche</h1>
    <div class="encadre"><b>${esc(M.entreprise)}, une entreprise fictive.</b> ${esc(M.fil_rouge)}</div>
    <div class="etapes">
      <div class="etape"><span class="n">1</span><span class="t"><b>Une mission = une station.</b> Chaque mission est une feuille recto-verso du carnet : un client, une situation, une pièce à produire.</span></div>
      <div class="etape"><span class="n">2</span><span class="t"><b>Scannez le QR</b> en bas de la première page : la station s’ouvre sur votre téléphone ou votre tablette. Faites-la en entier.</span></div>
      <div class="etape"><span class="n">3</span><span class="t"><b>Remplissez la mission</b> : votre pièce sur le recto, les quatre questions et le défi sur le verso. Chaque question dit dans quel écran de la station se trouve la réponse.</span></div>
      <div class="etape"><span class="n">4</span><span class="t"><b>Faites signer le tampon</b> par le professeur, qui regarde votre pièce. Sur la station, 3 bonnes réponses sur 4 donnent aussi un tampon numérique.</span></div>
    </div>
    <div class="encadre"><b>Les certificats.</b> ${esc(M.tampons.certificats)} Cochez-les sur la carte des tampons.</div>
    ${piedHtml("Codes du référentiel : en bas de chaque mission", "mode d’emploi")}</section>`;

  const frise = `<section class="page">
    <h1 class="titrepage">L’année en cinq périodes</h1>
    <div class="frise">${M.periodes.map((p) => {
      const st = p.lignes.flatMap((l) => l.stations), d = st.reduce((t, s) => t + (s.mission?.duree_min || 0), 0);
      return `<div class="per"><span class="pt">${esc(p.id)}</span><h3>${esc(p.titre)}</h3>
        <div class="meta" style="color:#b8692e;filter:none">Semaines ${esc(p.semaines)} · ${pluriel(st.length, "mission", "missions")}${d ? " · environ " + hm(d) : ""}</div>
        <div>${esc(p.pourquoi)}</div>
        <div class="chips">${p.lignes.map((l) => `<span class="chip" style="--c:${esc(l.couleur)}">${esc(l.nom)} (${l.stations.length})</span>`).join("")}</div></div>`;
    }).join("")}</div>
    ${piedHtml("Les périodes suivent l’ordre du chantier réel", "progression")}</section>`;

  const blocCarte = (p) => `<div class="cp"><div class="cper">${esc(p.id)} · ${esc(p.titre)} <span style="font:14pt Calibri;color:#56657a">· semaines ${esc(p.semaines)}</span></div><div class="cgrid">` +
    p.lignes.map((l) => `<div class="cbloc" style="--c:${esc(l.couleur)}"><div class="ch"><span>${esc(l.nom)}</span><span class="cert">Certificat <span class="case"></span></span></div>` +
      l.stations.map((s) => `<div class="cst"><span class="case"></span><span class="no">${s.numero}</span><span>${esc(s.nom)}${s.mission ? "" : " (en préparation)"}</span></div>`).join("") + `</div>`).join("") + `</div></div>`;
  /* la carte se répartit sur deux pages, à la coupure de période qui équilibre le mieux les deux */
  let coupe = 1, meilleur = Infinity;
  for (let k = 1; k < M.periodes.length; k++) {
    const d = Math.abs(M.periodes.slice(0, k).reduce((t, p) => t + rangees(p), 0) - M.periodes.slice(k).reduce((t, p) => t + rangees(p), 0));
    if (d < meilleur) { meilleur = d; coupe = k; }
  }
  const carte = (titre, periodes, pied) => {
    const R = periodes.reduce((t, p) => t + rangees(p), 0);
    const h = Math.max(6.5, Math.min(13, (262 - 4 * periodes.length) / R));
    return `<section class="page"><h1 class="titrepage">${titre}</h1>
    <div class="carte" style="--h:${h.toFixed(2)}mm">${periodes.map(blocCarte).join("")}</div>${piedHtml("Cochez la case quand le professeur a signé", pied)}</section>`;
  };
  const carteHtml = [carte("La carte des tampons (1/2)", M.periodes.slice(0, coupe), "carte 1/2"), carte("La carte des tampons (2/2)", M.periodes.slice(coupe), "carte 2/2")];

  const certs = `<section class="page"><h1 class="titrepage">Mes certificats</h1>
    <p>${esc(M.tampons.regle)}</p>
    <div class="certifs">${M.lignes.map((l) => `<div class="certif" style="--c:${esc(l.couleur)}"><div class="h">Certificat ${esc(l.nom)}</div><div>${pluriel(l.stations.length, "mission", "missions")} · signé le : ____________</div></div>`).join("")}</div>
    <div class="diplome"><div class="grand">Chargé d’affaires réglementaire</div><p>Les ${M.lignes.length} certificats de branche réunis. Diplôme maison de ${esc(M.entreprise)}.</p><p style="margin-top:4mm">Nom : ______________________ &nbsp; Date : ______________ &nbsp; Signature :</p></div>
    ${piedHtml("Une branche terminée donne un certificat", "certificats")}</section>`;
  return { couv, mode, frise, carteHtml, certs, nbMissions, duree };
}

function pagesGlossaire(M, sts = M.stations) {
  const lib = attestationLibelles();
  const usedCp = [...new Set(sts.flatMap((s) => codes(s.mission).cp))].sort((a, b) => parseInt(a.slice(2)) - parseInt(b.slice(2)));
  const usedAtt = [...new Set(sts.flatMap((s) => codes(s.mission).att))].sort((a, b) => parseFloat(a) - parseFloat(b));
  const row = (code, l) => `<div class="r"><span class="code">${esc(code)}</span><span class="lib">${esc(l)}</span></div>`;
  const cpRows = usedCp.map((c) => row(c, CP[c] || ""));
  const attRows = usedAtt.map((c) => ({ c, l: court(lib[c] || "", 120) }));
  /* deux pages : la seconde commence quand la première est pleine (estimation en lignes de 14 pt) */
  const lignesDe = (l) => Math.max(1, Math.ceil(l.length / 62));
  let cap = 36 - cpRows.length - 4, cut = 0, u = 0;
  for (const a of attRows) { const k = lignesDe(a.l) + 0.35; if (u + k > cap) break; u += k; cut++; }
  const p1 = `<section class="page"><h1 class="titrepage">Ce que je travaille : les codes</h1>
    <p><b>TP TECVC (REAC TP-00133)</b> : ${cpRows.length ? "les compétences professionnelles travaillées ici." : "aucune mission de ce carnet n’est rattachée à une compétence du REAC."} Une mission « hors REAC » relève de la culture professionnelle.</p>
    <div class="glos">${cpRows.join("")}</div>
    ${attRows.length ? `<p style="margin-top:2mm"><b>Attestation d’aptitude 2025</b> (fluides frigorigènes) : les codes des missions fluidiques.</p>` : ""}
    <div class="glos">${attRows.slice(0, cut).map((a) => row(a.c, a.l)).join("")}</div>
    <div class="grow"><div class="lib2">Mes notes</div>${ZONE}</div>${piedHtml("Codes du référentiel", "codes 1/2")}</section>`;
  const p2 = `<section class="page"><h1 class="titrepage">${attRows.length > cut ? "Les codes (suite) et mes notes" : "Mes notes"}</h1>
    <div class="glos">${attRows.slice(cut).map((a) => row(a.c, a.l)).join("")}</div>
    <div class="grow"><div class="lib2">Mes notes</div>${ZONE}</div>${piedHtml("Codes du référentiel", "codes 2/2")}</section>`;
  return [p1, p2];
}

function pagesPeriode(M, pe, sts, rimg) {
  const d = sts.reduce((t, s) => t + (s.mission?.duree_min || 0), 0);
  const frise = `<div class="hfrise">${M.periodes.map((x) => `<div class="hf${x.id === pe.id ? " on" : ""}"><b>${esc(x.id)}</b>${esc(x.titre)}<br>sem. ${esc(x.semaines)}</div>`).join("")}</div>`;
  const couv = `<section class="page couvp">
    <img src="${rimg}" alt="">
    <div class="corps"><div style="color:#56657a;font-weight:bold">${esc(M.entreprise)} · BTS · TP TECVC · Mon carnet du chargé d’affaires</div>
    <h1>${esc(pe.id)} · ${esc(pe.titre)}</h1>
    <div class="meta">Semaines ${esc(pe.semaines)} · ${pluriel(sts.length, "mission", "missions")}${d ? " · environ " + hm(d) : ""}</div>
    <div class="pq">${esc(pe.pourquoi)}</div>
    ${frise}
    <div class="encadre"><b>Une mission = une feuille recto-verso.</b> Scannez le QR, faites la station, remplissez la feuille, faites signer le tampon par le professeur.</div>
    <div class="champs"><div class="champ">Nom : </div><div class="champ">Prénom : </div><div class="champ">Classe : </div></div></div>
    ${piedHtml("Carnet d’une période (le carnet complet regroupe les cinq périodes)", "période " + pe.id)}</section>`;
  const carte = `<section class="page"><h1 class="titrepage">Ma carte des tampons · ${esc(pe.id)}</h1>
    <div class="cartes3">${pe.lignes.map((l) => `<div class="csl" style="--c:${esc(l.couleur)};--n:${Math.ceil(l.stations.length / 3)}"><div class="ch"><span>${esc(l.nom)}</span><span class="cert">Certificat <span class="case"></span></span></div>
      <div class="cards">${l.stations.map((s) => `<div class="card"><div class="nm"><span>${s.numero}</span> · ${esc(s.nom)}${s.mission ? "" : " (en préparation)"}</div><div class="st">Tampon · date</div></div>`).join("")}</div></div>`).join("")}</div>
    ${piedHtml("Le professeur tamponne la case après la mission", "carte " + pe.id)}</section>`;
  return { couv, carte };
}

const SCRIPT_DEBORD = `<script>(function(){var d=[];document.querySelectorAll('.page').forEach(function(p,i){if(p.scrollHeight>p.clientHeight+1){p.setAttribute('data-debord',p.scrollHeight-p.clientHeight);d.push(i+1)}});var z=[];document.querySelectorAll('.page').forEach(function(p,i){var q=[].map.call(p.querySelectorAll('.zone'),function(e){return e.clientHeight}).filter(Boolean);if(q.length)z.push((i+1)+':'+Math.round(Math.min.apply(null,q)*25.4/96))});document.documentElement.setAttribute('data-zmin',z.join(','));document.documentElement.setAttribute('data-debords',d.join(','));document.documentElement.setAttribute('data-fait','1')})()</script>`;

async function carnetEleveHtml(M, pe = null) {
  const sts = pe ? M.stations.filter((s) => s.periode.id === pe.id) : M.stations;
  const qrs = new Map();
  for (const s of sts) if (s.slug) qrs.set(s.slug, await qrSvg(s.slug));
  const rimg = "../img/scene-livret-couverture.webp";
  let pages;
  if (pe) { const o = pagesPeriode(M, pe, sts, rimg); pages = [o.couv, o.carte, ...sts.flatMap((s) => pagesMission(s, qrs)), ...pagesGlossaire(M, sts)]; }
  else { const o = pagesOuverture(M, rimg); pages = [o.couv, o.mode, o.frise, ...o.carteHtml, o.certs, ...sts.flatMap((s) => pagesMission(s, qrs)), ...pagesGlossaire(M, sts)]; }
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Mon carnet du chargé d’affaires${pe ? " — " + pe.id : ""} — inerWeb Législation</title>
<meta name="robots" content="noindex"><style>${CSS_COMMUN}${CSS_ELEVE}</style></head><body>
${pages.join("\n").replaceAll("__TOTAL__", String(M.total))}
${SCRIPT_DEBORD}</body></html>`;
  return { html, nbPages: pages.length };
}

/* ================================================================ 4. LE LIVRET PROFESSEUR — HTML */
const CSS_PROF = `
body { font-size: 13pt; line-height: 1.27 }
@page { size: A4; margin: 12mm 13mm 17mm;
  @bottom-left { content: "Livret du professeur · Carnet du chargé d’affaires · Clim’Études Sud"; font: 13pt Calibri, sans-serif; color: #56657a; vertical-align: top; padding-top: 2mm }
  @bottom-right { content: "page " counter(page) " / " counter(pages); font: 13pt Calibri, sans-serif; color: #56657a; vertical-align: top; padding-top: 2mm } }
@media screen { .doc { width: 210mm; margin: 8mm auto; padding: 12mm 13mm; background: #fff; box-shadow: 0 1mm 4mm rgba(0,0,0,.25) } }
h1 { font-size: 22pt; line-height: 1.12; border-bottom: .7mm solid var(--or); padding-bottom: 1.5mm; margin: 0 0 3mm }
h2 { font-size: 17pt; margin: 4mm 0 2mm; break-after: avoid }
h3 { font-size: 14pt; margin: 0 0 1.5mm; break-after: avoid }
.sautavant { break-before: page }
table { border-collapse: collapse; width: 100% }
th, td { border: .35mm solid var(--trait); padding: 1.1mm 2mm; vertical-align: top; text-align: left }
th { background: var(--navy); color: #fff }
.cr { text-align: center }
.mission { border: .45mm solid var(--c); margin: 0 0 3.2mm }
.mission li, .vig li, tr { break-inside: avoid }
.mission > .t { break-after: avoid }
.mission p.rap { break-after: avoid }
.mission > .t { background: var(--c); color: #fff; font-weight: bold; padding: 1.2mm 3mm; display: flex; justify-content: space-between; gap: 3mm }
.mission > .c { padding: 2mm 3mm }
.mission ol { margin: 0 0 1.6mm; padding-left: 6.5mm } .mission li { margin-bottom: 1mm }
.mission .rep { color: #0b4f2e }
.vig { background: #fdf3e8; border-left: 1.2mm solid var(--or); padding: 1mm 2.4mm; margin-top: 1.4mm }
.vig ul { margin: .5mm 0 0; padding-left: 5mm }
.rap { color: var(--gris) }
.bande { background: var(--c); color: #fff; padding: 1.6mm 4mm; border-radius: 2mm; margin: 5mm 0 3mm; font: bold 17pt 'Trebuchet MS', sans-serif; break-after: avoid }
.grille th.n { width: 21mm; text-align: center; font-size: 13pt; line-height: 1.1 }
.grille td.k { height: 11mm } .grille td.sh { background: #eef2f7; font-weight: bold }
.tampon-cadre { border: .5mm dashed var(--gris); padding: 2mm 3mm }
.bloc { border-left: 1.4mm solid var(--navy); padding-left: 3mm; margin-bottom: 3mm }
.cover img { width: 100%; height: 140mm; object-fit: cover; display: block; border-radius: 2mm }
`;

function grilleHtml(l) {
  const cpNum = new Map();
  for (const s of l.stations) { const c = codes(s.mission); if (!s.mission) continue; if (c.hors) (cpNum.get("hors") || cpNum.set("hors", []).get("hors")).push(s.numero); else for (const x of c.cp) (cpNum.get(x) || cpNum.set(x, []).get(x)).push(s.numero); }
  const cles = [...cpNum.keys()].filter((k) => k !== "hors").sort((a, b) => parseInt(a.slice(2)) - parseInt(b.slice(2)));
  if (cpNum.has("hors")) cles.push("hors");
  const cases = ECHELLE.map(() => '<td class="k"></td>').join("");
  const lignesCp = cles.map((k) => `<tr><td>${k === "hors" ? "<b>Hors REAC</b> · culture professionnelle du technicien" : `<b>${k}</b> · ${esc(CP[k])}`} <span class="rap">(mission${cpNum.get(k).length > 1 ? "s" : ""} ${cpNum.get(k).join(", ")})</span></td>${cases}</tr>`).join("");
  const lignesPieces = l.stations.map((s) => `<tr><td><b>${s.numero}</b> · ${esc(s.mission ? s.mission.badge : s.nom + " (en préparation)")} <span class="rap">: la pièce rendue</span></td>${cases}</tr>`).join("");
  return `<table class="grille" style="--c:${esc(l.couleur)}"><tr><th>Compétence TECVC mobilisée</th>${ECHELLE.map((e) => `<th class="n">${e.n}<br>${esc(e.nom)}</th>`).join("")}</tr>
    ${lignesCp ? lignesCp : `<tr><td colspan="6"><i>Aucune compétence du REAC n’est mobilisée par les missions prêtes de cette branche.</i></td></tr>`}
    <tr><td class="sh" colspan="6">Pièce remise à chaque mission</td></tr>${lignesPieces}</table>`;
}

function livretHtml(M, rimg) {
  const nbM = M.stations.filter((s) => s.mission).length, dTot = M.stations.reduce((t, s) => t + (s.mission?.duree_min || 0), 0);
  const cover = `<div class="cover"><img src="${rimg}" alt=""></div>
    <h1 style="margin-top:5mm;font-size:28pt">Livret du professeur</h1>
    <p style="font-size:16pt"><b>Carnet du chargé d’affaires</b> · réseau Législation d’inerweb.fr · BTS, TP TECVC</p>
    <div class="bloc" style="margin-top:4mm"><b>Ce que contient ce livret.</b> La progression de l’année (5 périodes, ${M.lignes.length} branches, ${M.total} missions), puis, branche par branche, les corrigés des quatre questions et du défi de chaque mission, les points de vigilance, et une grille à cinq niveaux (0 à 4) des compétences TECVC mobilisées. Il accompagne le carnet de l’étudiant, dont il reprend la numérotation.</div>
    <div class="bloc"><b>${esc(M.entreprise)}.</b> ${esc(M.fil_rouge)}</div>
    <div class="bloc"><b>Le tampon.</b> ${esc(M.tampons.regle)} ${esc(M.tampons.certificats)}</div>`;

  const methode = `<h2 class="sautavant">Comment conduire une mission</h2>
    <ol>
      <li><b>L’étudiant scanne le QR</b> de la première page de sa mission et fait la station en entier (environ 25 à 35 minutes).</li>
      <li><b>Il remplit sa feuille</b> : la pièce à produire sur le recto ; les quatre questions et le défi sur le verso. Chaque question renvoie à un écran de la station : c’est là qu’on le renvoie s’il n’a pas trouvé.</li>
      <li><b>Vous regardez la pièce</b> et le défi avec les corrigés de ce livret, puis vous <b>tamponnez et datez</b>. Le tampon de la station (3 bonnes réponses sur 4) ne remplace pas votre signature.</li>
      <li><b>Vous positionnez</b> avec la grille de la branche : un niveau de 0 à 4 par compétence mobilisée et par pièce. Rien n’est noté sur 20.</li>
      <li><b>Une branche terminée</b> donne un certificat ; les ${M.lignes.length} certificats donnent le diplôme maison « Chargé d’affaires réglementaire ».</li>
    </ol>
    <h2>L’échelle à cinq niveaux</h2>
    <table><tr><th class="cr" style="width:12mm">Niveau</th><th style="width:44mm">Nom</th><th>Critère observable</th></tr>${ECHELLE.map((e) => `<tr><td class="cr"><b>${e.n}</b></td><td><b>${esc(e.nom)}</b></td><td>${esc(e.critere)}</td></tr>`).join("")}</table>
    <p class="rap" style="margin-top:2mm">Les critères sont ceux de la maison : ils portent sur ce qui s’observe dans la pièce et sur la station. Ils ne se convertissent pas en note sur 20.</p>`;

  const progression = `<h2>La progression de l’année</h2>
    <p class="rap" style="margin-bottom:2mm">${M.total} missions, ${nbM} prêtes, durée cumulée des missions prêtes : environ ${hm(dTot)}. L’ordre des périodes est celui du chantier réel : la sécurité d’abord, l’affaire complète à la fin.</p>
    ${M.periodes.map((p) => {
      const st = p.lignes.flatMap((l) => l.stations), d = st.reduce((t, s) => t + (s.mission?.duree_min || 0), 0);
      return `<h3 style="margin-top:3mm">${esc(p.id)} · ${esc(p.titre)} <span class="rap">· semaines ${esc(p.semaines)} · ${pluriel(st.length, "mission", "missions")}${d ? " · " + hm(d) : ""}</span></h3>
      <p class="rap" style="margin-bottom:1mm">${esc(p.pourquoi)}</p>
      <table><tr><th>Branche</th><th style="width:16mm" class="cr">Missions</th><th style="width:22mm" class="cr">Durée</th><th>Missions du carnet (numéros)</th></tr>
      ${p.lignes.map((l) => { const dd = l.stations.reduce((t, s) => t + (s.mission?.duree_min || 0), 0); return `<tr><td><b style="color:${esc(l.couleur)}">${esc(l.nom)}</b></td><td class="cr">${l.stations.length}</td><td class="cr">${dd ? hm(dd) : "—"}</td><td>${l.stations.map((s) => s.numero + " " + esc(s.nom) + (s.mission ? "" : " (en préparation)")).join(" · ")}</td></tr>`; }).join("")}</table>`;
    }).join("")}`;

  const branches = M.lignes.map((l) => `
    <div class="bande" style="--c:${esc(l.couleur)}">${esc(l.nom)} <span style="font:13pt Calibri">· ${esc(l.periode.id)} · ${pluriel(l.stations.length, "mission", "missions")} · ${esc(l.sous || "")}</span></div>
    ${l.stations.map((s) => {
      const m = s.mission;
      if (!m) return `<div class="mission" style="--c:${esc(l.couleur)}"><div class="t"><span>${s.numero} · ${esc(s.nom)}</span><span>en préparation</span></div><div class="c">Mission en préparation : ses corrigés viendront avec elle (relancer <code>outils/carnet-papier.mjs</code>).</div></div>`;
      const vigItems = [...(codes(m).hors ? ["Mission hors REAC : ne la rattachez à aucune compétence TECVC dans votre suivi."] : []),
        ...(s.vigilance.length ? s.vigilance : ["Aucun point à sourcer signalé dans la fiche de fabrication ; la relecture métier de la station reste à faire."])];
      return `<div class="mission" style="--c:${esc(l.couleur)}"><div class="t"><span>${s.numero} · ${esc(m.titre)}</span><span>${m.duree_min} min · ${esc(m.badge)}</span></div><div class="c">
        <p class="rap"><b>Référentiel :</b> ${esc(ligneCodes(m))}</p>
        <h3 style="margin-top:1.4mm">Corrigés des quatre questions</h3>
        <ol>${m.questions.map((q) => `<li><b>${esc(q.q)}</b> <span class="rap">(écran ${esc(q.ecran)})</span><br><span class="rep">${esc(q.reponse)}</span></li>`).join("")}</ol>
        <h3>Défi · ${esc(TYPES[m.defi.type] || m.defi.type)}</h3>
        <p class="rep">${esc(m.defi.corrige)}</p>
        <div class="vig"><b>Points de vigilance</b><ul>${vigItems.map((v) => `<li>${esc(v)}</li>`).join("")}</ul></div></div></div>`;
    }).join("")}
    <h3>Grille de positionnement — ${esc(l.nom)}</h3>${grilleHtml(l)}`).join("\n");

  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Livret du professeur — carnet du chargé d’affaires</title>
<meta name="robots" content="noindex"><style>${CSS_COMMUN}${CSS_PROF}</style></head><body><div class="doc">
${cover}${methode}${progression}
<h1 style="margin-top:6mm">Les missions, branche par branche</h1><p class="rap">Chaque mission : corrigés, points de vigilance ; chaque branche se termine par sa grille de 0 à 4.</p>
${branches}</div></body></html>`;
}

/* ================================================================ 5. PDF (Chrome sans fenêtre) */
function versPdf(htmlFile, pdfFile) {
  const profil = join(tmpdir(), "carnet-papier-chrome-" + process.pid);
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", `--user-data-dir=${profil}`, "--no-pdf-header-footer", "--allow-file-access-from-files",
    "--virtual-time-budget=20000", `--print-to-pdf=${pdfFile}`, "file:///" + htmlFile.replace(/\\/g, "/")], { stdio: "pipe", timeout: 240000 });
}
function debordements(htmlFile) {
  const profil = join(tmpdir(), "carnet-papier-chrome-d-" + process.pid);
  const out = execFileSync(CHROME, ["--headless=new", "--disable-gpu", `--user-data-dir=${profil}`, "--allow-file-access-from-files",
    "--virtual-time-budget=20000", "--dump-dom", "file:///" + htmlFile.replace(/\\/g, "/")], { stdio: ["ignore", "pipe", "ignore"], maxBuffer: 200e6, timeout: 240000 }).toString("utf8");
  const m = out.match(/data-debords="([^"]*)"/), z = out.match(/data-zmin="([^"]*)"/);
  return m ? { pages: m[1].split(",").filter(Boolean).map(Number), zmin: (z ? z[1].split(",") : []).map((x) => x.split(":").map(Number)) } : null;
}

/* ================================================================ 6. DOCX NATIF */
let DX;
function initDocx() {
  const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ImageRun, AlignmentType, BorderStyle, ShadingType, HeightRule, VerticalAlign, Footer, TableLayoutType, PageBreak } = D;
  const MM = 56.7, LARGEUR = Math.round(186 * MM);
  const trait = (c = NAVY, sz = 6, style = BorderStyle.SINGLE) => ({ style, size: sz, color: c });
  const cadre = (c = NAVY, sz = 6, style = BorderStyle.SINGLE) => ({ top: trait(c, sz, style), bottom: trait(c, sz, style), left: trait(c, sz, style), right: trait(c, sz, style) });
  const aucun = { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } };
  const sansBord = { ...aucun, insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE } };
  DX = { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ImageRun, AlignmentType, BorderStyle, ShadingType, HeightRule, VerticalAlign, Footer, TableLayoutType, PageBreak, MM, LARGEUR, trait, cadre, aucun, sansBord };
}
const hex = (c) => c.replace("#", "").toUpperCase();

function pngDe(src, largeur) {
  const dir = join(tmpdir(), "carnet-papier-png"); mkdirSync(dir, { recursive: true });
  const out = join(dir, src.replace(/[\\/:]/g, "_").replace(/\.\w+$/, "") + "_" + largeur + ".png");
  if (!existsSync(out)) execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", src, "-vf", `scale=${largeur}:-1`, out]);
  return readFileSync(out);
}

/* estimation de hauteur de texte (mm) : Calibri, largeur moyenne d'un caractère ≈ 0,5 corps */
const PT = 0.3528;
const lignesTxt = (txt, largeurMm, pt, gras = false) => Math.max(1, Math.ceil(String(txt).length * pt * PT * (gras ? 0.54 : 0.5) / largeurMm));
const hTxt = (txt, largeurMm, pt, gras = false) => lignesTxt(txt, largeurMm, pt, gras) * pt * PT * 1.25;

async function docxEleve(M, fichier, pe = null) {
  const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ImageRun, AlignmentType, BorderStyle, ShadingType, HeightRule, VerticalAlign, Footer, TableLayoutType, MM, LARGEUR, trait, cadre, aucun, sansBord } = DX;
  const t = (texte, o = {}) => new TextRun({ text: texte, size: 28, font: "Calibri", color: TXT, ...o });
  const p = (runs, o = {}) => new Paragraph({ children: Array.isArray(runs) ? runs : [runs], spacing: { after: 40, line: 260 }, ...o });
  const titre = (s, taille = 52) => p(t(s, { bold: true, size: taille, color: NAVY, font: "Trebuchet MS" }), { spacing: { after: 100 } });
  const cell = (children, w, o = {}) => new TableCell({ children, width: { size: w, type: WidthType.DXA }, margins: { top: 30, bottom: 30, left: 100, right: 100 }, verticalAlign: VerticalAlign.CENTER, ...o });
  const table = (rows, cols, o = {}) => new Table({ width: { size: cols.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: cols, layout: TableLayoutType.FIXED, rows, ...o });
  const rowT = (cells, o = {}) => new TableRow({ children: cells, cantSplit: true, ...o });
  const mmT = (mm) => Math.round(mm * MM);
  const HAUT = 265; /* mm utiles d'une page (marges haute 11 et basse 21) */
  const pied = (codesTxt, droite) => new Footer({ children: [
    new Paragraph({ border: { top: { style: BorderStyle.SINGLE, size: 8, color: ORANGE, space: 3 } }, spacing: { after: 0 }, children: [t(codesTxt, { bold: true, color: NAVY })] }),
    new Paragraph({ tabStops: [{ type: "right", position: LARGEUR }], children: [t("inerWeb · Législation · Clim’Études Sud", { color: GRIS }), t("\t" + droite, { color: GRIS })] })] });
  const section = (children, footer) => ({ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: mmT(11), bottom: mmT(21), left: mmT(12), right: mmT(12), footer: mmT(5) } } }, footers: { default: footer }, children });
  /* zone à écrire : des lignes de 9 mm qui remplissent la hauteur donnée */
  const zone = (hauteurMm, coul = "8FA0B3") => {
    const n = Math.max(2, Math.floor(hauteurMm / 9));
    return table(Array.from({ length: n }, () => rowT([cell([p(t(" ", { size: 10 }))], LARGEUR, { borders: { ...aucun, bottom: trait(coul, 6) } })], { height: { value: mmT(9), rule: HeightRule.EXACT } })), [LARGEUR], { borders: sansBord });
  };
  const bandeau = (s, suite = "") => table([rowT([
    cell([p(t(`Mission ${s.numero}/${M.total} · ${s.ligne.nom}`, { bold: true, color: "FFFFFF" }))], mmT(112), { shading: { type: ShadingType.CLEAR, fill: hex(s.ligne.couleur) }, borders: aucun }),
    cell([p(t(`${s.periode.id} · sem. ${s.periode.semaines}${s.mission ? " · " + s.mission.duree_min + " min" : ""}`, { bold: true, color: "FFFFFF" }), { alignment: AlignmentType.RIGHT })], LARGEUR - mmT(112), { shading: { type: ShadingType.CLEAR, fill: hex(s.ligne.couleur) }, borders: aucun })])], [mmT(112), LARGEUR - mmT(112)], { borders: sansBord });
  const bloc = (lib, txt, coul) => table([rowT([cell([p([t(lib + " ", { bold: true, color: coul }), t(txt)])], LARGEUR, { borders: { ...aucun, left: trait(coul, 24) } })])], [LARGEUR], { borders: sansBord });
  const espace = (mm = 2) => new Paragraph({ children: [], spacing: { before: 0, after: 0, line: Math.round(mm * 56.7) , lineRule: "exact" } });
  const secs = [];
  const ST = pe ? M.stations.filter((s) => s.periode.id === pe.id) : M.stations;

  if (!pe) {
  /* couverture */
  secs.push(section([
    new Paragraph({ children: [new ImageRun({ type: "png", data: pngDe(join(RACINE, "img", "scene-livret-couverture.webp"), 1100), transformation: { width: 703, height: 469 } })], spacing: { after: 160 } }),
    p(t(`${M.entreprise} · BTS · TP TECVC`, { bold: true, color: GRIS, size: 34 })),
    titre("Mon carnet du chargé d’affaires", 76),
    p(t(`Réglementation, sécurité et environnement · ${M.total} missions · ${M.lignes.length} branches · 5 périodes`, { bold: true, color: GRIS, size: 32 }), { spacing: { after: 400 } }),
    ...["Nom", "Prénom", "Classe"].map((x) => p(t(`${x} : ________________________________________`, { bold: true, size: 34, color: NAVY }), { spacing: { after: 260 } })),
  ], pied("Carnet lié au réseau Législation : inerweb.fr/legislation", "CC BY-NC-ND")));

  /* mode d'emploi */
  const etapes = [["Une mission = une station.", " Chaque mission est une feuille recto-verso du carnet : un client, une situation, une pièce à produire."],
    ["Scannez le QR", " en bas de la première page : la station s’ouvre sur votre téléphone ou votre tablette. Faites-la en entier."],
    ["Remplissez la mission :", " votre pièce sur le recto, les quatre questions et le défi sur le verso. Chaque question dit dans quel écran de la station se trouve la réponse."],
    ["Faites signer le tampon", " par le professeur, qui regarde votre pièce. Sur la station, 3 bonnes réponses sur 4 donnent aussi un tampon numérique."]];
  secs.push(section([titre("Comment ça marche", 56),
    table([rowT([cell([p([t(`${M.entreprise}, une entreprise fictive. `, { bold: true }), t(M.fil_rouge)])], LARGEUR, { borders: cadre(ORANGE, 8), shading: { type: ShadingType.CLEAR, fill: "FDF3E8" } })])], [LARGEUR]),
    espace(4),
    table(etapes.map(([a, b], k) => rowT([
      cell([p(t(String(k + 1), { bold: true, color: "FFFFFF", size: 48 }), { alignment: AlignmentType.CENTER })], mmT(20), { shading: { type: ShadingType.CLEAR, fill: NAVY }, borders: cadre(NAVY) }),
      cell([p([t(a, { bold: true, color: NAVY, size: 34 }), t(b, { size: 34 })])], LARGEUR - mmT(20), { borders: cadre("8FA0B3") })], { height: { value: mmT(34), rule: HeightRule.ATLEAST } })), [mmT(20), LARGEUR - mmT(20)]),
    espace(4),
    table([rowT([cell([p([t("Les certificats. ", { bold: true }), t(M.tampons.certificats + " Cochez-les sur la carte des tampons.")])], LARGEUR, { borders: cadre(ORANGE, 8), shading: { type: ShadingType.CLEAR, fill: "FDF3E8" } })])], [LARGEUR]),
  ], pied("Codes du référentiel : en bas de chaque mission", "mode d’emploi")));

  /* frise */
  secs.push(section([titre("L’année en cinq périodes", 56),
    ...M.periodes.flatMap((pe) => {
      const st = pe.lignes.flatMap((l) => l.stations), d = st.reduce((a, s) => a + (s.mission?.duree_min || 0), 0);
      return [table([rowT([
        cell([p(t(pe.id, { bold: true, color: "FFFFFF", size: 40 }), { alignment: AlignmentType.CENTER })], mmT(20), { shading: { type: ShadingType.CLEAR, fill: NAVY }, borders: cadre(NAVY) }),
        cell([p(t(pe.titre, { bold: true, color: NAVY, size: 34, font: "Trebuchet MS" })),
          p(t(`Semaines ${pe.semaines} · ${pluriel(st.length, "mission", "missions")}${d ? " · environ " + hm(d) : ""}`, { bold: true, color: "B8692E" })),
          p(t(pe.pourquoi)),
          p(pe.lignes.flatMap((l) => [t(` ${l.nom} (${l.stations.length}) `, { bold: true, color: "FFFFFF", shading: { type: ShadingType.CLEAR, fill: hex(l.couleur) } }), t("  ")]))], LARGEUR - mmT(20), { borders: cadre("8FA0B3") })], { height: { value: mmT(41), rule: HeightRule.ATLEAST } })], [mmT(20), LARGEUR - mmT(20)]), espace(2)];
    })], pied("Les périodes suivent l’ordre du chantier réel", "progression")));

  /* cartes des tampons */
  const wCol = Math.floor(LARGEUR / 2);
  const carteBloc = (pe, h) => {
    const ligne = { line: Math.round(h * MM), lineRule: "exact", before: 0, after: 0 };
    const cell1 = (l) => l ? cell([table([rowT([cell([p(t(l.nom, { bold: true, color: "FFFFFF" }), { spacing: ligne })], wCol - mmT(34), { shading: { type: ShadingType.CLEAR, fill: hex(l.couleur) }, borders: aucun }),
        cell([p(t("Certificat  ☐", { bold: true, color: "FFFFFF", font: "Segoe UI Symbol" }), { alignment: AlignmentType.RIGHT, spacing: ligne })], mmT(34) - mmT(4), { shading: { type: ShadingType.CLEAR, fill: hex(l.couleur) }, borders: aucun })])], [wCol - mmT(34), mmT(30)], { borders: sansBord }),
        ...l.stations.map((s) => p([t("☐  ", { font: "Segoe UI Symbol" }), t(`${s.numero}  `, { bold: true, color: GRIS }), t(s.nom + (s.mission ? "" : " (en préparation)"))], { spacing: ligne }))], wCol, { borders: aucun, verticalAlign: VerticalAlign.TOP }) : cell([p(t(""))], wCol, { borders: aucun });
    const rangs = [];
    for (let k = 0; k < pe.lignes.length; k += 2) rangs.push(rowT([cell1(pe.lignes[k]), cell1(pe.lignes[k + 1])]));
    return [p(t(`${pe.id} · ${pe.titre} · semaines ${pe.semaines}`, { bold: true, color: NAVY, size: 32, font: "Trebuchet MS" }), { spacing: { before: 160, after: 60 }, border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ORANGE, space: 1 } } }),
      table(rangs, [wCol, wCol], { borders: sansBord })];
  };
  const milieu = M.periodes.length > 3 ? 3 : Math.ceil(M.periodes.length / 2);
  const hCarte = (lot) => Math.max(6.5, Math.min(13, (HAUT - 26 - 6 * lot.length) / lot.reduce((a, pe) => a + rangees(pe), 0)));
  secs.push(section([titre("La carte des tampons (1/2)", 52), ...M.periodes.slice(0, milieu).flatMap((pe) => carteBloc(pe, hCarte(M.periodes.slice(0, milieu))))], pied("Cochez la case quand le professeur a signé", "carte 1/2")));
  secs.push(section([titre("La carte des tampons (2/2)", 52), ...M.periodes.slice(milieu).flatMap((pe) => carteBloc(pe, hCarte(M.periodes.slice(milieu))))], pied("Cochez la case quand le professeur a signé", "carte 2/2")));

  /* certificats */
  const wC = Math.floor(LARGEUR / 2);
  const rangs = [];
  for (let k = 0; k < M.lignes.length; k += 2) rangs.push(rowT([0, 1].map((j) => { const l = M.lignes[k + j]; return l ? cell([p(t(`Certificat ${l.nom}`, { bold: true, color: hex(l.couleur) })), p(t(`${pluriel(l.stations.length, "mission", "missions")} · signé le : ________`))], wC, { borders: cadre(hex(l.couleur), 10) }) : cell([p(t(""))], wC, { borders: aucun }); }), { height: { value: mmT(28), rule: HeightRule.ATLEAST } }));
  secs.push(section([titre("Mes certificats", 56), p(t(M.tampons.regle)), espace(3), table(rangs, [wC, wC]), espace(5),
    table([rowT([cell([p(t("Chargé d’affaires réglementaire", { bold: true, color: NAVY, size: 44, font: "Trebuchet MS" }), { alignment: AlignmentType.CENTER }),
      p(t(`Les ${M.lignes.length} certificats de branche réunis. Diplôme maison de ${M.entreprise}.`), { alignment: AlignmentType.CENTER }),
      p(t("Nom : ______________________   Date : ____________   Signature :"), { alignment: AlignmentType.CENTER, spacing: { before: 160 } })], LARGEUR, { borders: cadre(NAVY, 18, BorderStyle.DOUBLE) })])], [LARGEUR])],
    pied("Une branche terminée donne un certificat", "certificats")));

  } else {
  /* carnet d'une période : couverture courte, carte de ses sous-lignes */
  const dP = ST.reduce((a, s) => a + (s.mission?.duree_min || 0), 0);
  const wF = Math.floor(LARGEUR / M.periodes.length);
  secs.push(section([
    new Paragraph({ children: [new ImageRun({ type: "png", data: pngDe(join(RACINE, "img", "scene-livret-couverture.webp"), 1000), transformation: { width: 460, height: 307 } })], spacing: { after: 100 } }),
    p(t(`${M.entreprise} · BTS · TP TECVC · Mon carnet du chargé d’affaires`, { bold: true, color: GRIS })),
    titre(`${pe.id} · ${pe.titre}`, 60),
    p(t(`Semaines ${pe.semaines} · ${pluriel(ST.length, "mission", "missions")}${dP ? " · environ " + hm(dP) : ""}`, { bold: true, color: "B8692E", size: 32 }), { spacing: { after: 80 } }),
    p(t(pe.pourquoi, { size: 32 }), { spacing: { after: 120 } }),
    table([rowT(M.periodes.map((x) => cell([p(t(x.id, { bold: true, size: 32, font: "Trebuchet MS", color: x.id === pe.id ? "FFFFFF" : GRIS })), p(t(x.titre, { color: x.id === pe.id ? "FFFFFF" : GRIS })), p(t(`sem. ${x.semaines}`, { color: x.id === pe.id ? "FFFFFF" : GRIS }))], wF, { borders: cadre(x.id === pe.id ? NAVY : "8FA0B3", 8), shading: x.id === pe.id ? { type: ShadingType.CLEAR, fill: NAVY } : undefined, verticalAlign: VerticalAlign.TOP })))], M.periodes.map(() => wF)),
    espace(3),
    table([rowT([cell([p([t("Une mission = une feuille recto-verso. ", { bold: true }), t("Scannez le QR, faites la station, remplissez la feuille, faites signer le tampon par le professeur.")])], LARGEUR, { borders: cadre(ORANGE, 8), shading: { type: ShadingType.CLEAR, fill: "FDF3E8" } })])], [LARGEUR]),
    espace(4),
    ...["Nom", "Prénom", "Classe"].map((x) => p(t(`${x} : ________________________________________`, { bold: true, size: 32, color: NAVY }), { spacing: { after: 160 } })),
  ], pied("Carnet d’une période (le carnet complet regroupe les cinq périodes)", "période " + pe.id)));

  const nbRangs = pe.lignes.reduce((a, l) => a + Math.ceil(l.stations.length / 3), 0);
  const hCard = Math.max(16, Math.min(60, (HAUT - 17 - pe.lignes.length * 15) / nbRangs));
  const wK = Math.floor(LARGEUR / 3);
  const blocs = pe.lignes.flatMap((l) => {
    const coul = hex(l.couleur), rangs = [];
    for (let k = 0; k < l.stations.length; k += 3) rangs.push(rowT([0, 1, 2].map((j) => { const s = l.stations[k + j]; return s ? cell([p([t(`${s.numero} · `, { bold: true, color: coul }), t(s.nom + (s.mission ? "" : " (en préparation)"), { bold: true })]), p(t("Tampon · date", { color: GRIS }))], wK, { borders: cadre(coul, 10), verticalAlign: VerticalAlign.TOP }) : cell([p(t(""))], wK, { borders: aucun }); }), { height: { value: mmT(hCard), rule: HeightRule.ATLEAST } }));
    return [table([rowT([cell([p(t(`${l.nom}      Certificat  ☐`, { bold: true, color: "FFFFFF", font: "Segoe UI Symbol" }))], LARGEUR, { shading: { type: ShadingType.CLEAR, fill: coul }, borders: aucun })])], [LARGEUR], { borders: sansBord }),
      table(rangs, [wK, wK, wK]), espace(3)];
  });
  secs.push(section([titre(`Ma carte des tampons · ${pe.id}`, 52), ...blocs], pied("Le professeur tamponne la case après la mission", "carte " + pe.id)));
  }

  /* les missions */
  for (const s of ST) {
    const m = s.mission, coul = hex(s.ligne.couleur), n = `mission ${s.numero}/${M.total}`;
    if (!m) {
      secs.push(section([bandeau(s), titre(`Mission en préparation : ${s.nom}`, 44), p(t("Cette mission n’est pas encore écrite. Votre professeur vous dira quoi faire à sa place : notez ici ce qu’il demande.")), espace(3), p(t("Mes notes", { bold: true, color: NAVY })), zone(200)], pied("Codes du référentiel : à venir avec la mission", n)));
      secs.push(section([bandeau(s, " · notes"), p(t("Mes notes", { bold: true, color: NAVY })), zone(240)], pied("Codes du référentiel : à venir avec la mission", n)));
      continue;
    }
    const c = codes(m);
    const travaille = c.hors ? "Hors REAC : culture professionnelle du technicien et du chargé d’affaires" : c.cp.map((x) => `${x} ${CP[x] || ""}`.trim()).join(" · ");
    const qr = await qrPng(s.slug);
    const W = LARGEUR - mmT(4);
    /* hauteur prise par le recto hors zone à écrire */
    const hRecto = 10 + hTxt(m.titre, 186, 26, true) + 4 + [["Le client ", m.client], ["La situation ", m.situation], ["La pièce à produire ", m.piece_a_produire]].reduce((a, [l, x]) => a + hTxt(l + x, 178, 14) + 5, 0) + 9 + 9 + 42 + 6;
    secs.push(section([bandeau(s), p(t(m.titre, { bold: true, size: 44, color: NAVY, font: "Trebuchet MS" }), { spacing: { before: 60, after: 60 } }),
      bloc("Le client", m.client, coul), espace(2), bloc("La situation", m.situation, coul), espace(2), bloc("La pièce à produire", m.piece_a_produire, coul), espace(2),
      p(t("Ma pièce : je la prépare ici, puis je la rends", { bold: true, color: NAVY })), zone(HAUT - hRecto - 3),
      p([t("Je travaille : ", { bold: true }), t(travaille, { color: GRIS })], { spacing: { before: 60, after: 60 } }),
      table([rowT([
        cell([p(new ImageRun({ type: "png", data: qr, transformation: { width: 118, height: 118 } }), { alignment: AlignmentType.CENTER }), p(t("Scannez : la station", { size: 28 }), { alignment: AlignmentType.CENTER })], mmT(40), { borders: aucun }),
        cell([p(t("Tampon du professeur", { bold: true, color: GRIS })), p(t("Date : ______________", { color: GRIS }))], LARGEUR - mmT(40) - mmT(60), { borders: cadre(GRIS, 10, BorderStyle.DASHED), verticalAlign: VerticalAlign.TOP }),
        cell([p(t("Tampon à gagner", { color: GRIS })), p(t(m.badge, { bold: true, color: coul, size: 30 })), p(t(`${m.duree_min} min · 3 bonnes réponses sur 4`, { color: GRIS }))], mmT(60), { borders: aucun, verticalAlign: VerticalAlign.TOP })], { height: { value: mmT(40), rule: HeightRule.ATLEAST } })], [mmT(40), LARGEUR - mmT(100), mmT(60)], { borders: sansBord }),
    ], pied(ligneCodes(m), n + " · recto")));

    /* verso */
    const it = m.defi.items || [];
    const hQ = m.questions.map((q) => hTxt(`${q.q} (station, écran ${q.ecran})`, 170, 14) + 3);
    const hD = 8 + hTxt(m.defi.consigne, 176, 14) + it.reduce((a, x) => a + hTxt(x, 165, 14) + 2, 0) + 6;
    const libre = HAUT - 10 - hTxt(m.titre, 186, 14, true) - hQ.reduce((a, b) => a + b, 0) - hD - 4 * 3 - 5;
    const zD = Math.max(20, libre * 0.3), zQ = Math.max(11, (libre - zD) / 4);
    const marque = (x) => (m.defi.type === "vrai-faux" ? [t(x + "     "), t("V ☐   F ☐", { bold: true, color: NAVY, font: "Segoe UI Symbol" })] : m.defi.type === "classer" || m.defi.type === "trouver-l-erreur" ? [t("☐  ", { font: "Segoe UI Symbol" }), t(x)] : [t(x)]);
    secs.push(section([bandeau(s, " · questions et défi"), p(t("Questions et défi · " + m.titre, { bold: true, color: NAVY }), { spacing: { before: 40, after: 40 } }),
      ...m.questions.flatMap((q, i) => [p([t(`${i + 1}. `, { bold: true, color: coul }), t(q.q + " "), t(`(station, écran ${q.ecran})`, { bold: true, color: GRIS })], { spacing: { before: 60, after: 20 } }), zone(zQ)]),
      table([rowT([cell([
        p([t(` Défi · ${TYPES[m.defi.type] || m.defi.type} `, { bold: true, color: "FFFFFF", shading: { type: ShadingType.CLEAR, fill: coul } })]),
        p(t(m.defi.consigne)), ...it.map((x) => p(marque(x), { indent: { left: 200 }, spacing: { after: 20 } })), zone(zD, coul)], LARGEUR, { borders: cadre(coul, 8), verticalAlign: VerticalAlign.TOP })])], [LARGEUR])],
      pied(ligneCodes(m), n + " · verso")));
  }
  /* codes */
  const lib = attestationLibelles();
  const usedCp = [...new Set(ST.flatMap((s) => codes(s.mission).cp))].sort((a, b) => parseInt(a.slice(2)) - parseInt(b.slice(2)));
  const usedAtt = [...new Set(ST.flatMap((s) => codes(s.mission).att))].sort((a, b) => parseFloat(a) - parseFloat(b));
  const rowCode = (code, l) => rowT([cell([p(t(code, { bold: true, color: "FFFFFF" }), { alignment: AlignmentType.CENTER })], mmT(18), { shading: { type: ShadingType.CLEAR, fill: NAVY }, borders: cadre() }), cell([p(t(l))], LARGEUR - mmT(18), { borders: cadre("8FA0B3") })]);
  const tabCp = table(usedCp.map((c) => rowCode(c, CP[c] || "")), [mmT(18), LARGEUR - mmT(18)]);
  const attRows = usedAtt.map((c) => [c, court(lib[c] || "", 120)]);
  const hRang = ([, l]) => hTxt(l, 186 - 18 - 4, 14) + 3.8;
  let moitie = 0, cumul = 0;
  const dispo1 = HAUT - 14 - 2 * 8 - hTxt("TP TECVC (REAC TP-00133) : les dix compétences professionnelles. Une mission « hors REAC » relève de la culture professionnelle.", 186, 14) - usedCp.length * 8.6 - 30;
  for (const r of attRows) { if (cumul + hRang(r) > dispo1) break; cumul += hRang(r); moitie++; }
  const reste = attRows.slice(moitie).reduce((t, r) => t + hRang(r), 0);
  secs.push(section([titre("Ce que je travaille : les codes", 48), p([t("TP TECVC (REAC TP-00133)", { bold: true }), t(" : les dix compétences professionnelles. Une mission « hors REAC » relève de la culture professionnelle.")]), tabCp,
    espace(3), p([t("Attestation d’aptitude 2025", { bold: true }), t(" (fluides frigorigènes) : les codes des missions fluidiques.")]),
    table(attRows.slice(0, moitie).map(([c, l]) => rowCode(c, l)), [mmT(18), LARGEUR - mmT(18)])], pied("Codes du référentiel", "codes 1/2")));
  secs.push(section([titre("Les codes (suite) et mes notes", 48), table(attRows.slice(moitie).map(([c, l]) => rowCode(c, l)), [mmT(18), LARGEUR - mmT(18)]), espace(3), p(t("Mes notes", { bold: true, color: NAVY })), zone(HAUT - 14 - reste - 18)], pied("Codes du référentiel", "codes 2/2")));

  const doc = new Document({ creator: "inerWeb", title: "Mon carnet du chargé d’affaires" + (pe ? " — " + pe.id : ""), styles: { default: { document: { run: { font: "Calibri", size: 28 } } } }, sections: secs });
  writeFileSync(fichier, await Packer.toBuffer(doc));
  return secs.length;
}

async function docxProf(M, fichier) {
  const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ImageRun, AlignmentType, BorderStyle, ShadingType, HeightRule, VerticalAlign, Footer, TableLayoutType, MM, LARGEUR, trait, cadre, aucun, sansBord } = DX;
  const PTS = 26;
  const t = (texte, o = {}) => new TextRun({ text: texte, size: PTS, font: "Calibri", color: TXT, ...o });
  const p = (runs, o = {}) => new Paragraph({ children: Array.isArray(runs) ? runs : [runs], spacing: { after: 50, line: 250 }, ...o });
  const h1 = (s, o = {}) => new Paragraph({ children: [t(s, { bold: true, size: 44, color: NAVY, font: "Trebuchet MS" })], spacing: { after: 100 }, border: { bottom: { style: BorderStyle.SINGLE, size: 10, color: ORANGE, space: 2 } }, ...o });
  const h2 = (s, o = {}) => new Paragraph({ children: [t(s, { bold: true, size: 34, color: NAVY, font: "Trebuchet MS" })], spacing: { before: 160, after: 60 }, keepNext: true, ...o });
  const h3 = (s, o = {}) => new Paragraph({ children: [t(s, { bold: true, size: 28, color: NAVY })], spacing: { before: 80, after: 30 }, keepNext: true, ...o });
  const cell = (children, w, o = {}) => new TableCell({ children, width: { size: w, type: WidthType.DXA }, margins: { top: 30, bottom: 30, left: 90, right: 90 }, ...o });
  const table = (rows, cols, o = {}) => new Table({ width: { size: cols.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: cols, layout: TableLayoutType.FIXED, rows, ...o });
  const rowT = (cells, o = {}) => new TableRow({ children: cells, cantSplit: true, ...o });
  const mmT = (mm) => Math.round(mm * MM);
  const entete = (txt, w, fill = NAVY) => cell([p(t(txt, { bold: true, color: "FFFFFF" }))], w, { shading: { type: ShadingType.CLEAR, fill }, borders: cadre() });
  const pied = new Footer({ children: [new Paragraph({ border: { top: { style: BorderStyle.SINGLE, size: 8, color: ORANGE, space: 3 } }, tabStops: [{ type: "right", position: LARGEUR }], children: [t("Livret du professeur · Carnet du chargé d’affaires · " + M.entreprise, { color: GRIS }), t("\tinerWeb Législation · CC BY-NC-ND", { color: GRIS })] })] });
  const nbM = M.stations.filter((s) => s.mission).length, dTot = M.stations.reduce((a, s) => a + (s.mission?.duree_min || 0), 0);
  const enfants = [
    new Paragraph({ children: [new ImageRun({ type: "png", data: pngDe(join(RACINE, "img", "scene-livret-couverture.webp"), 1100), transformation: { width: 703, height: 380 } })], spacing: { after: 120 } }),
    new Paragraph({ children: [t("Livret du professeur", { bold: true, size: 64, color: NAVY, font: "Trebuchet MS" })], spacing: { after: 60 } }),
    p(t("Carnet du chargé d’affaires · réseau Législation d’inerweb.fr · BTS, TP TECVC", { bold: true, size: 30 }), { spacing: { after: 120 } }),
    p([t("Ce que contient ce livret. ", { bold: true }), t(`La progression de l’année (5 périodes, ${M.lignes.length} branches, ${M.total} missions), puis, branche par branche, les corrigés des quatre questions et du défi de chaque mission, les points de vigilance, et une grille à cinq niveaux (0 à 4) des compétences TECVC mobilisées. Il accompagne le carnet de l’étudiant, dont il reprend la numérotation.`)]),
    p([t(`${M.entreprise}. `, { bold: true }), t(M.fil_rouge)]),
    p([t("Le tampon. ", { bold: true }), t(`${M.tampons.regle} ${M.tampons.certificats}`)]),
    h2("Comment conduire une mission", { pageBreakBefore: true }),
    ...["L’étudiant scanne le QR de la première page de sa mission et fait la station en entier (environ 25 à 35 minutes).",
      "Il remplit sa feuille : la pièce à produire sur le recto ; les quatre questions et le défi sur le verso. Chaque question renvoie à un écran de la station : c’est là qu’on le renvoie s’il n’a pas trouvé.",
      "Vous regardez la pièce et le défi avec les corrigés de ce livret, puis vous tamponnez et datez. Le tampon de la station (3 bonnes réponses sur 4) ne remplace pas votre signature.",
      "Vous positionnez avec la grille de la branche : un niveau de 0 à 4 par compétence mobilisée et par pièce. Rien n’est noté sur 20.",
      `Une branche terminée donne un certificat ; les ${M.lignes.length} certificats donnent le diplôme maison « Chargé d’affaires réglementaire ».`].map((x, k) => p([t(`${k + 1}. `, { bold: true }), t(x)], { indent: { left: 340, hanging: 340 } })),
    h2("L’échelle à cinq niveaux"),
    table([new TableRow({ children: [entete("Niveau", mmT(18)), entete("Nom", mmT(44)), entete("Critère observable", LARGEUR - mmT(62))] }),
      ...ECHELLE.map((e) => rowT([cell([p(t(String(e.n), { bold: true }), { alignment: AlignmentType.CENTER })], mmT(18), { borders: cadre() }), cell([p(t(e.nom, { bold: true }))], mmT(44), { borders: cadre() }), cell([p(t(e.critere))], LARGEUR - mmT(62), { borders: cadre() })]))], [mmT(18), mmT(44), LARGEUR - mmT(62)]),
    p(t("Les critères portent sur ce qui s’observe dans la pièce et sur la station. Ils ne se convertissent pas en note sur 20.", { color: GRIS }), { spacing: { before: 60 } }),
    h2("La progression de l’année", { pageBreakBefore: true }),
    p(t(`${M.total} missions, ${nbM} prêtes, durée cumulée des missions prêtes : environ ${hm(dTot)}. L’ordre des périodes est celui du chantier réel : la sécurité d’abord, l’affaire complète à la fin.`, { color: GRIS })),
    ...M.periodes.flatMap((pe) => {
      const st = pe.lignes.flatMap((l) => l.stations), d = st.reduce((a, s) => a + (s.mission?.duree_min || 0), 0);
      const w = [mmT(38), mmT(18), mmT(20), LARGEUR - mmT(76)];
      return [h3(`${pe.id} · ${pe.titre} · semaines ${pe.semaines} · ${pluriel(st.length, "mission", "missions")}${d ? " · " + hm(d) : ""}`), p(t(pe.pourquoi, { color: GRIS })),
        table([new TableRow({ children: [entete("Branche", w[0]), entete("Missions", w[1]), entete("Durée", w[2]), entete("Missions du carnet (numéros)", w[3])] }),
          ...pe.lignes.map((l) => { const dd = l.stations.reduce((a, s) => a + (s.mission?.duree_min || 0), 0); return rowT([cell([p(t(l.nom, { bold: true, color: hex(l.couleur) }))], w[0], { borders: cadre("8FA0B3") }), cell([p(t(String(l.stations.length)), { alignment: AlignmentType.CENTER })], w[1], { borders: cadre("8FA0B3") }), cell([p(t(dd ? hm(dd) : "—"), { alignment: AlignmentType.CENTER })], w[2], { borders: cadre("8FA0B3") }), cell([p(t(l.stations.map((s) => s.numero + " " + s.nom + (s.mission ? "" : " (en préparation)")).join(" · ")))], w[3], { borders: cadre("8FA0B3") })]); })], w)];
    }),
    h1("Les missions, branche par branche", { pageBreakBefore: true }),
  ];
  for (const l of M.lignes) {
    const coul = hex(l.couleur);
    enfants.push(table([rowT([cell([p(t(`${l.nom} · ${l.periode.id} · ${pluriel(l.stations.length, "mission", "missions")}`, { bold: true, color: "FFFFFF", size: 32, font: "Trebuchet MS" }))], LARGEUR, { shading: { type: ShadingType.CLEAR, fill: coul }, borders: aucun })])], [LARGEUR], { borders: sansBord }));
    for (const s of l.stations) {
      const m = s.mission;
      if (!m) { enfants.push(h3(`${s.numero} · ${s.nom} — mission en préparation`), p(t("Ses corrigés viendront avec elle (relancer outils/carnet-papier.mjs).", { color: GRIS }))); continue; }
      const vig = s.vigilance.length ? s.vigilance : ["Aucun point à sourcer signalé dans la fiche de fabrication. La relecture métier des stations reste à faire."];
      enfants.push(h3(`${s.numero} · ${m.titre}`), p(t(`${m.duree_min} min · ${m.badge} · ${ligneCodes(m)}`, { color: GRIS })),
        ...m.questions.map((q, i) => p([t(`${i + 1}. ${q.q} `, { bold: true }), t(`(écran ${q.ecran}) `, { color: GRIS }), t(q.reponse, { color: "0B4F2E" })], { indent: { left: 340, hanging: 340 } })),
        p([t(`Défi · ${TYPES[m.defi.type] || m.defi.type} : `, { bold: true }), t(m.defi.corrige, { color: "0B4F2E" })]),
        table([rowT([cell([p(t("Points de vigilance", { bold: true })), ...(codes(m).hors ? [p(t("• Mission hors REAC : ne la rattachez à aucune compétence TECVC dans votre suivi."))] : []), ...vig.map((v) => p(t("• " + v)))], LARGEUR, { borders: { ...aucun, left: trait(ORANGE, 24) }, shading: { type: ShadingType.CLEAR, fill: "FDF3E8" } })])], [LARGEUR], { borders: sansBord }),
        new Paragraph({ children: [], spacing: { after: 60 } }));
    }
    /* grille 0 à 4 */
    const cpNum = new Map();
    for (const s of l.stations) { if (!s.mission) continue; const c = codes(s.mission); if (c.hors) (cpNum.get("hors") || cpNum.set("hors", []).get("hors")).push(s.numero); else for (const x of c.cp) (cpNum.get(x) || cpNum.set(x, []).get(x)).push(s.numero); }
    const cles = [...cpNum.keys()].filter((k) => k !== "hors").sort((a, b) => parseInt(a.slice(2)) - parseInt(b.slice(2)));
    if (cpNum.has("hors")) cles.push("hors");
    const wN = mmT(21), wL = LARGEUR - wN * 5;
    const casesV = () => ECHELLE.map(() => cell([p(t(" "))], wN, { borders: cadre("8FA0B3") }));
    const lab = (k) => (k === "hors" ? [t("Hors REAC", { bold: true }), t(" · culture professionnelle du technicien ")] : [t(k, { bold: true }), t(` · ${CP[k]} `)]);
    enfants.push(h3(`Grille de positionnement — ${l.nom}`),
      table([new TableRow({ children: [entete("Compétence TECVC mobilisée", wL), ...ECHELLE.map((e) => cell([p(t(`${e.n} ${e.nom}`, { bold: true, color: "FFFFFF", size: 22 }), { alignment: AlignmentType.CENTER })], wN, { shading: { type: ShadingType.CLEAR, fill: NAVY }, borders: cadre() }))] }),
        ...(cles.length ? cles.map((k) => rowT([cell([p([...lab(k), t(`(mission${cpNum.get(k).length > 1 ? "s" : ""} ${cpNum.get(k).join(", ")})`, { color: GRIS })])], wL, { borders: cadre("8FA0B3") }), ...casesV()], { height: { value: mmT(11), rule: HeightRule.ATLEAST } })) : [rowT([cell([p(t("Aucune compétence du REAC n’est mobilisée par les missions prêtes de cette branche."))], LARGEUR, { columnSpan: 6, borders: cadre("8FA0B3") })])]),
        rowT([cell([p(t("Pièce remise à chaque mission", { bold: true }))], LARGEUR, { columnSpan: 6, shading: { type: ShadingType.CLEAR, fill: "EEF2F7" }, borders: cadre("8FA0B3") })]),
        ...l.stations.map((s) => rowT([cell([p([t(`${s.numero} · `, { bold: true }), t(s.mission ? s.mission.badge : s.nom + " (en préparation)"), t(" : la pièce rendue", { color: GRIS })])], wL, { borders: cadre("8FA0B3") }), ...casesV()], { height: { value: mmT(11), rule: HeightRule.ATLEAST } }))], [wL, wN, wN, wN, wN, wN]),
      new Paragraph({ children: [], spacing: { after: 160 } }));
  }
  const doc = new Document({ creator: "inerWeb", title: "Livret du professeur — carnet du chargé d’affaires", styles: { default: { document: { run: { font: "Calibri", size: PTS } } } },
    sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: mmT(12), bottom: mmT(18), left: mmT(12), right: mmT(12), footer: mmT(7) } } }, footers: { default: pied }, children: enfants }] });
  writeFileSync(fichier, await Packer.toBuffer(doc));
}

/* ================================================================ 7. ORCHESTRATION */
mkdirSync(SORTIE, { recursive: true });
const M = modele();
const prets = M.stations.filter((s) => s.mission).length;
console.log(`${M.total} missions au plan, ${prets} prêtes, ${M.total - prets} en préparation.`);
const sansSlug = M.stations.filter((s) => !s.slug);
if (sansSlug.length) console.log("Sans dossier de station (pas de QR) : " + sansSlug.map((s) => s.nom).join(", "));

const el = await carnetEleveHtml(M);
writeFileSync(join(SORTIE, "qr-attendus.json"), JSON.stringify(Object.fromEntries(M.stations.filter((s) => s.slug && s.mission).map((s) => [String(s.numero), urlStation(s.slug)])), null, 1) + "\n");
const fEleveHtml = join(SORTIE, "carnet-eleve.html");
writeFileSync(fEleveHtml, el.html);
const fLivretHtml = join(SORTIE, "livret-professeur.html");
writeFileSync(fLivretHtml, livretHtml(M, "../img/scene-livret-couverture.webp"));
const parPeriode = [];
for (const pe of M.periodes) {
  const r = await carnetEleveHtml(M, pe);
  const f = join(SORTIE, `carnet-eleve-${pe.id}.html`);
  writeFileSync(f, r.html);
  parPeriode.push({ pe, f, nbPages: r.nbPages });
}
console.log(`HTML : carnet-eleve.html (${el.nbPages} pages attendues), ${parPeriode.map((x) => `${x.pe.id} (${x.nbPages})`).join(", ")}, livret-professeur.html`);

if (!SANS_PDF) {
  for (const [nom, f] of [["carnet complet", fEleveHtml], ...parPeriode.map((x) => [x.pe.id, x.f])]) {
    const d = debordements(f);
    if (d === null) { console.warn(`Contrôle de débordement (${nom}) : Chrome n’a pas répondu.`); continue; }
    if (d.pages.length) console.warn(`⚠ PAGES QUI DÉBORDENT (${nom}) : ${d.pages.join(", ")} — contenu coupé, à reprendre.`);
    const serre = d.zmin.filter(([, mm]) => mm < 17).map(([pg, mm]) => `${pg} (${mm} mm)`);
    console.log(`${nom} : ${d.pages.length ? "DÉBORDEMENT" : "aucun débordement"} · zone à écrire la plus étroite ${Math.min(...d.zmin.map((x) => x[1]))} mm` + (serre.length ? ` · serrées : ${serre.join(", ")}` : ""));
  }
  versPdf(fEleveHtml, join(SORTIE, "carnet-eleve.pdf"));
  for (const x of parPeriode) versPdf(x.f, join(SORTIE, `carnet-eleve-${x.pe.id}.pdf`));
  versPdf(fLivretHtml, join(SORTIE, "livret-professeur.pdf"));
  console.log("PDF : carnet-eleve.pdf, carnet-eleve-P1..P5.pdf, livret-professeur.pdf");
}
if (!SANS_DOCX) {
  initDocx();
  const n = await docxEleve(M, join(SORTIE, "carnet-eleve.docx"));
  const np = [];
  for (const x of parPeriode) np.push(`${x.pe.id} (${await docxEleve(M, join(SORTIE, `carnet-eleve-${x.pe.id}.docx`), x.pe)})`);
  await docxProf(M, join(SORTIE, "livret-professeur.docx"));
  console.log(`DOCX : carnet-eleve.docx (${n} pages attendues), ${np.join(", ")}, livret-professeur.docx`);
}
