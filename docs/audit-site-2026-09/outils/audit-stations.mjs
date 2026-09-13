/* Audit chiffré des stations des cinq réseaux — inerweb.fr (copie servie C:/git/pilote-fluides).
   Lecture seule : ce script ne modifie AUCUN fichier du dépôt audité.
   Sortie : audit-data.json (données brutes) dans le même dossier que ce script. */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = 'C:/git/pilote-fluides';
const HERE = path.dirname(fileURLToPath(import.meta.url));

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|ico|bmp|avif|svg)$/i;
const AUDIO_EXT = /\.(mp3|wav|ogg|m4a)$/i;
const BINARY_EXT = /\.(mp3|wav|ogg|mp4|webm|woff2?|ttf|otf|eot|pdf)$/i;
const TEXT_EXT = /\.(html?|js|mjs|css|json|md|txt)$/i;

// ---------------------------------------------------------------------------
// Utilitaires fichiers
// ---------------------------------------------------------------------------

function walk(dir, files = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return files; }
  for (const e of entries) {
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) walk(abs, files);
    else files.push(abs);
  }
  return files;
}

function isInVoixDir(absPath) {
  const rel = absPath.split(path.sep).join('/');
  return /\/voix\//i.test(rel) || /\/voix$/i.test(rel);
}

function readTextSafe(absPath) {
  try { return fs.readFileSync(absPath, 'utf8'); } catch { return ''; }
}

// ---------------------------------------------------------------------------
// Littéraux de chaînes JS (scanner tolérant : ignore commentaires, gère
// l'échappement et les gabarits `...${expr}...` en sautant l'interpolation)
// ---------------------------------------------------------------------------

function findStringLiterals(text) {
  const out = [];
  const n = text.length;
  let i = 0;
  while (i < n) {
    const c = text[i];
    if (c === '"' || c === "'" || c === '`') {
      const quote = c;
      const start = i;
      i++;
      let buf = '';
      while (i < n) {
        const ch = text[i];
        if (ch === '\\') { buf += text[i + 1] || ''; i += 2; continue; }
        if (quote === '`' && ch === '$' && text[i + 1] === '{') {
          i += 2;
          let depth = 1;
          while (i < n && depth > 0) {
            if (text[i] === '{') depth++;
            else if (text[i] === '}') depth--;
            i++;
          }
          continue;
        }
        if (ch === quote) { i++; break; }
        buf += ch;
        i++;
      }
      out.push({ start, end: i, value: buf });
      continue;
    }
    if (c === '/' && text[i + 1] === '/') { while (i < n && text[i] !== '\n') i++; continue; }
    if (c === '/' && text[i + 1] === '*') {
      i += 2;
      while (i < n && !(text[i] === '*' && text[i + 1] === '/')) i++;
      i += 2;
      continue;
    }
    i++;
  }
  return out;
}

function literalAt(literals, start) {
  // literals est trié par ordre d'apparition (start croissant) : recherche linéaire acceptable ici.
  for (const l of literals) if (l.start === start) return l;
  return null;
}

// Repère les spans (valeur) des clés `narration:` / `dire:` etc. — string OU objet {...}
function findKeySpans(text, keyNames, literals) {
  const spans = [];
  const keyRe = new RegExp('(?:^|[{,;\\n(])\\s*(' + keyNames.join('|') + ')\\s*:\\s*', 'g');
  let m;
  while ((m = keyRe.exec(text))) {
    const afterKey = m.index + m[0].length;
    const ch = text[afterKey];
    if (ch === '"' || ch === "'" || ch === '`') {
      const lit = literalAt(literals, afterKey);
      if (lit) spans.push([lit.start, lit.end, 'string']);
    } else if (ch === '{') {
      const end = matchBrace(text, afterKey, literals);
      if (end != null) spans.push([afterKey, end, 'object']);
    }
  }
  return spans;
}

function matchBrace(text, openIdx, literals) {
  let depth = 0;
  let i = openIdx;
  const n = text.length;
  while (i < n) {
    const lit = literalAt(literals, i);
    if (lit) { i = lit.end; continue; }
    if (text[i] === '{') depth++;
    else if (text[i] === '}') { depth--; if (depth === 0) return i + 1; }
    i++;
  }
  return null;
}

function countTopLevelArrayItems(text, openBracketIdx, literals) {
  // openBracketIdx pointe sur '['
  let depth = 0;
  let i = openBracketIdx;
  const n = text.length;
  let items = 0;
  let sawContentAtDepth1 = false;
  while (i < n) {
    const lit = literalAt(literals, i);
    if (lit) { sawContentAtDepth1 = sawContentAtDepth1 || depth === 1; i = lit.end; continue; }
    const c = text[i];
    if (c === '[' || c === '{' || c === '(') { depth++; if (depth === 1) sawContentAtDepth1 = true; }
    else if (c === ']' || c === '}' || c === ')') {
      depth--;
      if (depth === 0) { if (sawContentAtDepth1) items++; return items; }
    } else if (c === ',' && depth === 1) {
      items++; sawContentAtDepth1 = false;
    } else if (depth === 1 && !/\s/.test(c)) {
      sawContentAtDepth1 = true;
    }
    i++;
  }
  return items;
}

// ---------------------------------------------------------------------------
// Texte visible / mots
// ---------------------------------------------------------------------------

function visibleTextFromHtml(html) {
  let t = html;
  t = t.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  t = t.replace(/<style[\s\S]*?<\/style>/gi, ' ');
  t = t.replace(/<!--[\s\S]*?-->/g, ' ');
  t = t.replace(/<[^>]+>/g, ' ');
  t = t.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&[a-zA-Z#0-9]+;/g, ' ');
  return t;
}

function countWords(t) {
  return (t.trim().match(/\S+/g) || []).length;
}

function stripInlineTags(s) {
  return s.replace(/<[^>]+>/g, ' ').replace(/&[a-zA-Z#0-9]+;/g, ' ');
}

function isProseString(s) {
  const t = s.trim();
  if (t.length < 6) return false;
  if (/^https?:\/\//i.test(t)) return false;
  if (/^#[0-9a-fA-F]{3,8}$/.test(t)) return false;
  if (/\.(png|jpe?g|gif|svg|webp|ico|bmp|avif|mp3|json|js|css|md|mjs|txt)(\?.*)?$/i.test(t)) return false;
  if (!t.includes(' ') && t.length < 20) return false;
  if (/^[#.][\w-]+$/.test(t)) return false; // sélecteur CSS isolé
  return true;
}

// mots "cours" = tous les littéraux prose du texte, hors spans exclus (narration/dire...)
function wordsOutsideSpans(text, literals, excludeSpans) {
  let words = 0;
  for (const lit of literals) {
    const excluded = excludeSpans.some(([s, e]) => lit.start >= s && lit.end < e);
    if (excluded) continue;
    if (!isProseString(lit.value)) continue;
    words += countWords(stripInlineTags(lit.value));
  }
  return words;
}

// Texte "prose" concaténé (valeurs des littéraux de cours), pour le scan des
// marqueurs de chantier — jamais le code JS brut (évite les faux positifs du
// type Array.prototype.slice ou data-prototype dans un attribut de script).
function proseTextOutsideSpans(text, literals, excludeSpans) {
  const parts = [];
  for (const lit of literals) {
    const excluded = excludeSpans.some(([s, e]) => lit.start >= s && lit.end < e);
    if (excluded) continue;
    if (!isProseString(lit.value)) continue;
    parts.push(stripInlineTags(lit.value));
  }
  return parts.join(' \n ');
}

function wordsInsideStringSpans(text, literals, spans) {
  let words = 0, n = 0;
  for (const [s, e, kind] of spans) {
    if (kind === 'string') {
      const lit = literalAt(literals, s);
      if (lit) { words += countWords(stripInlineTags(lit.value)); n++; }
    }
  }
  return { words, count: n };
}

function wordsAndCountInsideObjectSpan(text, literals, span, subKeyNames) {
  // span = [start,end,'object'] ; compte les sous-clés subKeyNames présentes et leurs mots.
  const [s, e] = span;
  const sub = text.slice(s, e);
  let count = 0, words = 0;
  for (const key of subKeyNames) {
    const re = new RegExp('(?:^|[{,])\\s*' + key + '\\s*:\\s*');
    const m = re.exec(sub);
    if (!m) continue;
    const idx = s + m.index + m[0].length;
    const lit = literalAt(literals, idx);
    if (lit) { count++; words += countWords(stripInlineTags(lit.value)); }
  }
  return { count, words };
}

// ---------------------------------------------------------------------------
// Questions (heuristique générique + secours tuple pour AéroRézo)
// ---------------------------------------------------------------------------

function countQuestionsGeneric(text, literals) {
  let n = (text.match(/\b(?:question|q)\s*:\s*["'`]/g) || []).length;
  if (n === 0) {
    const qm = /\bquiz\s*:\s*\[/.exec(text);
    if (qm) {
      const arrStart = qm.index + qm[0].length - 1;
      n = countTopLevelArrayItems(text, arrStart, literals);
    }
  }
  return n;
}

// ---------------------------------------------------------------------------
// Références (liens / images) et existence sur disque
// ---------------------------------------------------------------------------

function extractHrefSrcUrlRefs(text) {
  const refs = [];
  const re1 = /(?:href|src)\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = re1.exec(text))) refs.push(m[1]);
  // Guillemets obligatoires : un url(...) CSS réel en a presque toujours, et ça évite
  // de confondre avec un appel de fonction JS nommé "url(...)" (ex. un utilitaire SVG).
  const re2 = /\burl\(\s*["']([^"')]+)["']\s*\)/gi;
  while ((m = re2.exec(text))) refs.push(m[1]);
  return refs;
}

function extractBareAssetRefs(text) {
  // chaînes JS du type 'assets/biblio/x.jpeg' ou "svg/plan.svg" (sans attribut href/src)
  const refs = [];
  const re = /["']((?:\.\.?\/)?[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.\-%]+)*\.(?:png|jpe?g|gif|svg|webp|ico|bmp|avif))["']/gi;
  let m;
  while ((m = re.exec(text))) refs.push(m[1]);
  return refs;
}

function classifyRef(ref) {
  if (!ref) return 'skip';
  if (/^(#|mailto:|tel:|javascript:|data:)/i.test(ref)) return 'skip';
  if (/^https?:\/\//i.test(ref)) return 'external';
  return 'internal';
}

function resolveInternal(fileAbsDir, ref) {
  const clean = ref.split('#')[0].split('?')[0];
  if (!clean) return null;
  return path.resolve(fileAbsDir, clean);
}

// ---------------------------------------------------------------------------
// Corpus des narrations (build/voix/corpus.json)
// ---------------------------------------------------------------------------

const corpusRaw = JSON.parse(fs.readFileSync(path.join(ROOT, 'build/voix/corpus.json'), 'utf8'));
const narrations = corpusRaw.narrations;

function corpusStatsForPrefix(relPrefix) {
  const norm = relPrefix.replace(/\\/g, '/');
  let count = 0, words = 0;
  for (const entry of narrations) {
    if (entry.type !== 'narration') continue;
    const hit = (entry.sources || []).some((s) => s.replace(/\\/g, '/').startsWith(norm));
    if (hit) { count++; words += countWords(entry.texte || ''); }
  }
  return { count, words };
}

// ---------------------------------------------------------------------------
// Mesure d'une "station" générique à partir d'une liste de fichiers
// ---------------------------------------------------------------------------

function baseMeasure(stationAbsDir, allFiles, extraFallbackDirs = []) {
  // Recherche de secours par nom de fichier, dans l'arborescence propre de la
  // station (ex. un chemin littéral "${ASSET}pressostat_bp.svg" où ASSET est une
  // constante JS locale valant "assets/symboles/" — le fichier existe bien,
  // juste pas à la racine de la station).
  const basenameIndex = new Map();
  for (const f of allFiles) {
    const b = path.basename(f).toLowerCase();
    if (!basenameIndex.has(b)) basenameIndex.set(b, f);
  }

  const rec = {
    octets: 0,
    animation: 0,
    liens_absolus: 0,
    moteur: { voix: false, reglage_voix: false, prof_vocal: false, charte_edu: false, marque: false },
    feuille_propre: false,
    img_tags: 0,
    svg_inline: 0,
    image_refs_js_css: 0,
    image_refs_total: 0,
    images_absentes: 0,
    liens_casses: 0,
    retour_site: false,
  };

  const htmlFiles = [];
  const cssFiles = [];
  const jsFiles = [];
  let ownCssBytes = 0;

  for (const abs of allFiles) {
    const rel = abs.split(path.sep).join('/');
    const inVoix = isInVoixDir(abs);
    const isImage = IMAGE_EXT.test(abs);
    const isAudio = AUDIO_EXT.test(abs);
    let size = 0;
    try { size = fs.statSync(abs).size; } catch { size = 0; }
    if (!inVoix && !isImage && !isAudio) rec.octets += size;

    if (/\.html?$/i.test(abs)) htmlFiles.push(abs);
    else if (/\.css$/i.test(abs)) { cssFiles.push(abs); ownCssBytes += size; }
    else if (/\.js$/i.test(abs) && !inVoix) jsFiles.push(abs);
  }

  if (ownCssBytes > 0) rec.feuille_propre = true;

  const allTextForAnimation = [];
  const allRefSources = []; // {abs, dir, text}

  for (const abs of [...htmlFiles, ...cssFiles, ...jsFiles]) {
    const text = readTextSafe(abs);
    allTextForAnimation.push(text);
    allRefSources.push({ abs, dir: path.dirname(abs), text });
  }

  const bigBlob = allTextForAnimation.join('\n');
  rec.animation = (bigBlob.match(/@keyframes|<animate|requestAnimationFrame|setInterval|transition\s*:/g) || []).length;
  rec.liens_absolus = (bigBlob.match(/https:\/\/inerweb\.fr/g) || []).length;

  for (const abs of htmlFiles) {
    const html = readTextSafe(abs);
    rec.img_tags += (html.match(/<img[\s>]/gi) || []).length;
    rec.svg_inline += (html.match(/<svg[\s>]/gi) || []).length;
    if (html.includes('moteur/voix.js')) rec.moteur.voix = true;
    if (html.includes('moteur/reglage-voix.js')) rec.moteur.reglage_voix = true;
    if (html.includes('moteur/prof-vocal.js')) rec.moteur.prof_vocal = true;
    if (html.includes('moteur/charte-edu.css')) rec.moteur.charte_edu = true;
    if (html.includes('moteur/marque.js')) rec.moteur.marque = true;
    const styleBlocks = html.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
    for (const b of styleBlocks) if (b.length > 2000) rec.feuille_propre = true;
    if (
      /href\s*=\s*["'](?:\.\.\/)+(?:index\.html)?["']/.test(html) ||
      /href\s*=\s*["'][^"']*(?:index|galerie)\.html[^"']*["']/i.test(html) ||
      /href\s*=\s*["'][^"']*inerweb\.fr[^"']*["']/i.test(html) ||
      />\s*(?:Retour au plan|Retour à l'accueil|Retour au site|Voir tous les cours|Accueil|← Retour)[^<]*</i.test(html)
    ) rec.retour_site = true;
  }

  // Résout une référence relative en tenant compte des conventions locales : un
  // placeholder JS littéral ("${ASSET}fichier.svg", ASSET = constante définie plus
  // haut dans le même fichier) est d'abord retiré, puis un nom de fichier NU (sans
  // "/") — souvent préfixé par le code de rendu plutôt que par la donnée — est
  // recherché dans assets/, images/, les bibliothèques partagées connues, et enfin
  // n'importe quel sous-dossier de la station portant ce nom de fichier.
  function resolveWithFallbacks(dir, rawRef) {
    const ref = rawRef.replace(/\$\{\w+\}/g, '');
    if (!ref || ref.includes('$')) return { ref: '', exists: true, dynamique: true }; // valeur construite à l'exécution (ex. boucle ${file}), pas vérifiable statiquement
    const target = resolveInternal(dir, ref);
    if (!target) return { ref, exists: true }; // # / mailto: / etc. déjà écartés par l'appelant
    let exists = fs.existsSync(target);
    if (!exists && !ref.includes('/')) {
      const candidates = [path.join(dir, 'assets', ref), path.join(dir, 'images', ref), ...extraFallbackDirs.map((d) => path.join(d, ref))];
      exists = candidates.some((c) => fs.existsSync(c)) || basenameIndex.has(ref.toLowerCase());
    }
    return { ref, exists };
  }

  // Références (liens + images) et existence sur disque
  for (const { abs, dir, text } of allRefSources) {
    const isHtmlOrCss = /\.(html?|css)$/i.test(abs);
    const refs = isHtmlOrCss ? extractHrefSrcUrlRefs(text) : [];
    const bareAssets = extractBareAssetRefs(text);
    for (const rawRef of refs) {
      if (classifyRef(rawRef.replace(/\$\{\w+\}/g, '')) !== 'internal') continue;
      const { ref, exists, dynamique } = resolveWithFallbacks(dir, rawRef);
      if (dynamique) continue; // valeur assemblée à l'exécution : non vérifiable statiquement
      rec.liens_casses += exists ? 0 : 1;
      if (IMAGE_EXT.test(ref.split('#')[0].split('?')[0])) {
        rec.image_refs_total += 1;
        if (!exists) rec.images_absentes += 1;
      }
    }
    for (const rawRef of bareAssets) {
      if (classifyRef(rawRef.replace(/\$\{\w+\}/g, '')) !== 'internal') continue;
      const { exists, dynamique } = resolveWithFallbacks(dir, rawRef);
      if (dynamique) continue;
      rec.image_refs_js_css += 1;
      rec.image_refs_total += 1;
      if (!exists) { rec.images_absentes += 1; rec.liens_casses += 1; }
    }
  }

  rec._htmlFiles = htmlFiles;
  rec._jsFiles = jsFiles;
  rec._cssFiles = cssFiles;
  return rec;
}

function markers(text) {
  const found = [];
  const patterns = [
    [/\bTODO\b/i, 'TODO'],
    [/à écrire/i, 'à écrire'],
    [/à compléter/i, 'à compléter'],
    [/lorem ipsum|\blorem\b/i, 'lorem'],
    [/\bprototype\b/i, 'prototype'],
    [/\bbrouillon\b/i, 'brouillon'],
    [/en construction/i, 'en construction'],
    [/\bXXX\b/, 'XXX'],
    [/\?\?\?/, '???'],
  ];
  for (const [re, label] of patterns) if (re.test(text)) found.push(label);
  return found;
}

// ===========================================================================
// RÉSEAU 1 — Plan thermo-techno : packs/fluides/res/<module>/
// ===========================================================================

const PLAN_DIR = path.join(ROOT, 'packs/fluides/res');
const PLAN_EXCLUDE = new Set(['audio', 'bibliotheque', 'illustrations', 'img', 'outils', 'photos', 'svg', 'symboles', 'vignettes', 'voix']);

function planModules() {
  return fs.readdirSync(PLAN_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((n) => !n.startsWith('_') && !PLAN_EXCLUDE.has(n) && n !== 'capsules');
}

const PLAN_SHARED_MEDIA_DIRS = ['svg', 'bibliotheque/icones', 'img', 'illustrations', 'vignettes'].map((d) => path.join(PLAN_DIR, d));

function measurePlanModule(name) {
  const dir = path.join(PLAN_DIR, name);
  const files = walk(dir);
  const rec = baseMeasure(dir, files, PLAN_SHARED_MEDIA_DIRS);

  const jsBlob = rec._jsFiles.map(readTextSafe).join('\n---\n');
  const htmlBlob = rec._htmlFiles.map(readTextSafe).join('\n---\n');
  const literals = findStringLiterals(jsBlob);

  const narrSpans = findKeySpans(jsBlob, ['narration', 'dire'], literals);
  const { words: motsNarresJs, count: narrJsCount } = wordsInsideStringSpans(jsBlob, literals, narrSpans);

  const motsHtml = countWords(visibleTextFromHtml(htmlBlob));
  const motsJsHorsNarration = wordsOutsideSpans(jsBlob, literals, narrSpans);
  const proseJsHorsNarration = proseTextOutsideSpans(jsBlob, literals, narrSpans);

  let ecrans = null;
  let ecransSource = 'non mesurable';
  const couvPath = path.join(dir, 'couverture.json');
  if (fs.existsSync(couvPath)) {
    try {
      const couv = JSON.parse(fs.readFileSync(couvPath, 'utf8'));
      if (typeof couv.ecrans === 'number') { ecrans = couv.ecrans; ecransSource = 'couverture.json'; }
    } catch { /* JSON invalide, ignoré */ }
  }
  if (ecrans === null) {
    const narrFieldCount = (jsBlob.match(/\bnarration\s*:\s*["'`]/g) || []).length;
    if (narrFieldCount > 0) { ecrans = narrFieldCount; ecransSource = 'champ narration: (JS)'; }
    else {
      const sectionCount = (htmlBlob.match(/<section[\s>]/gi) || []).length;
      ecrans = sectionCount || 0;
      ecransSource = sectionCount ? '<section> (HTML)' : 'non mesurable';
    }
  }

  const questions = countQuestionsGeneric(jsBlob, literals);
  const corpus = corpusStatsForPrefix(`packs/fluides/res/${name}/`);
  const mp3 = corpus.count; // même clé que narrations corpus pour ce réseau (voix/audio/<cle>.mp3)

  const gabarit = [];
  if (!fs.existsSync(path.join(dir, 'index.html'))) gabarit.push('pas de index.html');
  if (!fs.existsSync(path.join(dir, 'app.js'))) gabarit.push(`pas d'app.js (autre nom de script principal)`);
  if (!fs.existsSync(couvPath)) gabarit.push('pas de couverture.json');
  else if (ecransSource !== 'couverture.json') gabarit.push('couverture.json sans champ ecrans');
  if (!fs.existsSync(path.join(dir, 'referentiel.js'))) gabarit.push('pas de referentiel.js (badge codes absent)');
  if (rec.feuille_propre && rec._cssFiles.length === 0) gabarit.push('style inline > 2000c sans styles.css');
  const relais = /\.\.\/_[a-z0-9-]+-commun\//i.test(htmlBlob);
  if (relais) gabarit.push('page-relais vers un moteur partagé _xxx-commun (mesure locale non représentative du contenu réel)');

  return {
    reseau: 'Plan thermo-techno',
    station: name,
    octets: rec.octets,
    ecrans, ecrans_source: ecransSource,
    mots: motsHtml + motsJsHorsNarration,
    images: rec.img_tags + rec.svg_inline + rec.image_refs_js_css,
    images_absentes: rec.images_absentes,
    questions,
    narrations: corpus.count || narrJsCount,
    mots_narres: corpus.words || motsNarresJs,
    mp3,
    animation: rec.animation,
    moteur: rec.moteur,
    feuille_propre: rec.feuille_propre,
    marqueurs: markers(visibleTextFromHtml(htmlBlob) + '\n' + proseJsHorsNarration),
    liens_absolus: rec.liens_absolus,
    liens_casses: rec.liens_casses,
    retour_site: rec.retour_site,
    gabarit,
    relais,
  };
}

function measureCapsule(id) {
  const filePath = path.join(PLAN_DIR, 'capsules/donnees', `${id}.js`);
  const text = readTextSafe(filePath);
  const literals = findStringLiterals(text);
  const size = fs.statSync(filePath).size;

  const direSpans = findKeySpans(text, ['dire'], literals);
  const { words: motsNarres, count: ecrans } = wordsInsideStringSpans(text, literals, direSpans);
  const motsCours = wordsOutsideSpans(text, literals, direSpans);
  const questions = (text.match(/\bbonne\s*:/g) || []).length;
  const animation = (text.match(/@keyframes|<animate|requestAnimationFrame|setInterval|transition\s*:/g) || []).length;

  // Convention du moteur capsule.js (ligne ~129) : un champ visuel.svg est un nom de
  // fichier NU, toujours résolu vers ../svg/<nom> depuis capsules/ — donc
  // packs/fluides/res/svg/<nom>, jamais un chemin relatif au fichier de données lui-même.
  const svgRefs = [...text.matchAll(/\bsvg\s*:\s*["']([^"']+\.svg)["']/g)].map((m) => m[1]);
  let imgRefs = 0, imgAbsentes = 0;
  for (const ref of svgRefs) {
    imgRefs++;
    const target = path.join(PLAN_DIR, 'svg', ref);
    if (!fs.existsSync(target)) imgAbsentes++;
  }

  return {
    reseau: 'Plan thermo-techno',
    station: `capsules/${id}`,
    octets: size,
    ecrans, ecrans_source: 'champ dire: (JS)',
    mots: motsCours,
    images: imgRefs,
    images_absentes: imgAbsentes,
    questions,
    narrations: 0,
    mots_narres: motsNarres,
    mp3: 0,
    animation,
    moteur: { voix: true, reglage_voix: false, prof_vocal: false, charte_edu: false, marque: true },
    feuille_propre: false,
    marqueurs: markers(proseTextOutsideSpans(text, literals, [])),
    liens_absolus: (text.match(/https:\/\/inerweb\.fr/g) || []).length,
    liens_casses: imgAbsentes,
    retour_site: false,
    gabarit: ['moteur capsule.js/capsule.css propre au sous-réseau (pas moteur/voix.js direct par module)'],
  };
}

// ===========================================================================
// RÉSEAU 2 — Législation : legislation/stations/<slug>/
// ===========================================================================

function measureLegislationStation(name) {
  const dir = path.join(ROOT, 'legislation/stations', name);
  const files = walk(dir);
  const rec = baseMeasure(dir, files);
  const htmlBlob = rec._htmlFiles.map(readTextSafe).join('\n---\n');
  const jsBlob = rec._jsFiles.map(readTextSafe).join('\n---\n');
  const literals = findStringLiterals(jsBlob);

  const ecrans = (htmlBlob.match(/class="slide/g) || []).length;
  const questions = (htmlBlob.match(/quiz-options/g) || []).length;
  const motsHtml = countWords(visibleTextFromHtml(htmlBlob));
  const motsJs = wordsOutsideSpans(jsBlob, literals, []);
  const proseJs = proseTextOutsideSpans(jsBlob, literals, []);
  const corpus = corpusStatsForPrefix(`legislation/stations/${name}/`);

  const gabarit = [];
  for (const f of ['index.html', 'app.js', 'styles.css', 'FOND.md']) {
    if (!fs.existsSync(path.join(dir, f))) gabarit.push(`pas de ${f}`);
  }
  if (!fs.existsSync(path.join(dir, 'svg')) && rec.img_tags > 0) gabarit.push("images sans dossier svg/ local");

  return {
    reseau: 'Législation',
    station: name,
    octets: rec.octets,
    ecrans, ecrans_source: 'class="slide" (HTML)',
    mots: motsHtml + motsJs,
    images: rec.img_tags + rec.svg_inline + rec.image_refs_js_css,
    images_absentes: rec.images_absentes,
    questions,
    narrations: corpus.count,
    mots_narres: corpus.words,
    mp3: corpus.count,
    animation: rec.animation,
    moteur: rec.moteur,
    feuille_propre: rec.feuille_propre,
    marqueurs: markers(visibleTextFromHtml(htmlBlob) + '\n' + proseJs),
    liens_absolus: rec.liens_absolus,
    liens_casses: rec.liens_casses,
    retour_site: rec.retour_site,
    gabarit,
  };
}

// ===========================================================================
// RÉSEAU 3 — HydroMétro : hydrometro/stations/<slug>/
// ===========================================================================

function measureHydrometroStation(name) {
  const dir = path.join(ROOT, 'hydrometro/stations', name);
  const files = walk(dir);
  const rec = baseMeasure(dir, files);
  const htmlBlob = rec._htmlFiles.map(readTextSafe).join('\n---\n');
  const jsBlob = rec._jsFiles.map(readTextSafe).join('\n---\n');
  const literals = findStringLiterals(jsBlob);

  const narrSpans = findKeySpans(jsBlob, ['narration'], literals);
  const ecrans = narrSpans.filter((s) => s[2] === 'string').length;
  const { words: motsNarresJs } = wordsInsideStringSpans(jsBlob, literals, narrSpans);
  const motsHtml = countWords(visibleTextFromHtml(htmlBlob));
  const motsJs = wordsOutsideSpans(jsBlob, literals, narrSpans);
  const proseJs = proseTextOutsideSpans(jsBlob, literals, narrSpans);
  const questions = countQuestionsGeneric(jsBlob, literals);
  const corpus = corpusStatsForPrefix(`hydrometro/stations/${name}/`);

  const gabarit = [];
  for (const f of ['index.html', 'content.js', 'station.js', 'station.css', 'manifest.json']) {
    if (!fs.existsSync(path.join(dir, f))) gabarit.push(`pas de ${f}`);
  }

  return {
    reseau: 'HydroMétro',
    station: name,
    octets: rec.octets,
    ecrans, ecrans_source: 'champ narration: (content.js)',
    mots: motsHtml + motsJs,
    images: rec.img_tags + rec.svg_inline + rec.image_refs_js_css,
    images_absentes: rec.images_absentes,
    questions,
    narrations: corpus.count || ecrans,
    mots_narres: corpus.words || motsNarresJs,
    mp3: corpus.count,
    animation: rec.animation,
    moteur: rec.moteur,
    feuille_propre: rec.feuille_propre,
    marqueurs: markers(visibleTextFromHtml(htmlBlob) + '\n' + proseJs),
    liens_absolus: rec.liens_absolus,
    liens_casses: rec.liens_casses,
    retour_site: rec.retour_site,
    gabarit,
  };
}

// ===========================================================================
// RÉSEAU 4 — AéroRézo : aerorezo/stations/<slug>/
// ===========================================================================

const AERO_PHASES = ['decouvrir', 'comprendre', 'manipuler', 'verifier', 'representer', 'evaluer'];

function measureAerorezoStation(name) {
  const dir = path.join(ROOT, 'aerorezo/stations', name);
  const files = walk(dir);
  const rec = baseMeasure(dir, files);
  const htmlBlob = rec._htmlFiles.map(readTextSafe).join('\n---\n');
  const jsBlob = rec._jsFiles.map(readTextSafe).join('\n---\n');
  const literals = findStringLiterals(jsBlob);

  const narrSpans = findKeySpans(jsBlob, ['narration'], literals);
  let ecrans = 0, motsNarresJs = 0;
  for (const span of narrSpans) {
    if (span[2] === 'object') {
      const r = wordsAndCountInsideObjectSpan(jsBlob, literals, span, AERO_PHASES);
      ecrans += r.count; motsNarresJs += r.words;
    } else if (span[2] === 'string') { ecrans += 1; }
  }
  const motsHtml = countWords(visibleTextFromHtml(htmlBlob));
  const motsJs = wordsOutsideSpans(jsBlob, literals, narrSpans);
  const proseJs = proseTextOutsideSpans(jsBlob, literals, narrSpans);
  const questions = countQuestionsGeneric(jsBlob, literals);
  const corpus = corpusStatsForPrefix(`aerorezo/stations/${name}/`);

  const gabarit = [];
  if (!fs.existsSync(path.join(dir, 'index.html'))) gabarit.push('pas de index.html');
  if (!fs.existsSync(path.join(dir, 'manifest.js'))) gabarit.push("pas de manifest.js (gabarit différent)");
  if (ecrans === 0) gabarit.push('aucune des 4 phases narration (decouvrir/comprendre/manipuler/verifier) détectée');

  return {
    reseau: 'AéroRézo',
    station: name,
    octets: rec.octets,
    ecrans, ecrans_source: 'sous-clés de narration: {decouvrir,comprendre,manipuler,verifier}',
    mots: motsHtml + motsJs,
    images: rec.img_tags + rec.svg_inline + rec.image_refs_js_css,
    images_absentes: rec.images_absentes,
    questions,
    narrations: corpus.count || ecrans,
    mots_narres: corpus.words || motsNarresJs,
    mp3: corpus.count,
    animation: rec.animation,
    moteur: rec.moteur,
    feuille_propre: rec.feuille_propre,
    marqueurs: markers(visibleTextFromHtml(htmlBlob) + '\n' + proseJs),
    liens_absolus: rec.liens_absolus,
    liens_casses: rec.liens_casses,
    retour_site: rec.retour_site,
    gabarit,
  };
}

// ===========================================================================
// RÉSEAU 5 — ÉlectroRézo : electrorezo/stations/<slug>/
// ===========================================================================

const ELEC_PHASES = ['decouvrir', 'comprendre', 'manipuler', 'representer', 'verifier', 'evaluer'];

function measureElectrorezoStation(name) {
  const dir = path.join(ROOT, 'electrorezo/stations', name);
  const files = walk(dir);
  const rec = baseMeasure(dir, files);
  const htmlBlob = rec._htmlFiles.map(readTextSafe).join('\n---\n');
  // contenu.js = cours ; narration.js = narration (fichier séparé, mesuré à part)
  const contenuFiles = rec._jsFiles.filter((f) => path.basename(f) !== 'narration.js');
  const narrationFile = rec._jsFiles.find((f) => path.basename(f) === 'narration.js');

  const jsBlob = contenuFiles.map(readTextSafe).join('\n---\n');
  const literals = findStringLiterals(jsBlob);
  const motsHtml = countWords(visibleTextFromHtml(htmlBlob));
  const motsJs = wordsOutsideSpans(jsBlob, literals, []);
  const proseJs = proseTextOutsideSpans(jsBlob, literals, []);
  const questions = countQuestionsGeneric(jsBlob, literals);

  let ecrans = 0, motsNarres = 0;
  if (narrationFile) {
    const nText = readTextSafe(narrationFile);
    const nLit = findStringLiterals(nText);
    for (const key of ELEC_PHASES) {
      const re = new RegExp('(?:^|[{,])\\s*' + key + '\\s*:\\s*');
      const m = re.exec(nText);
      if (!m) continue;
      const idx = m.index + m[0].length;
      const lit = literalAt(nLit, idx);
      if (lit) { ecrans++; motsNarres += countWords(stripInlineTags(lit.value)); }
    }
  }

  // MP3 : dossiers voix/homme et voix/femme
  let mp3 = 0;
  for (const genre of ['homme', 'femme']) {
    const p = path.join(dir, 'voix', genre);
    if (fs.existsSync(p)) mp3 += fs.readdirSync(p).filter((f) => f.endsWith('.mp3')).length;
  }

  const gabarit = [];
  if (!fs.existsSync(path.join(dir, 'index.html'))) gabarit.push('pas de index.html');
  if (!fs.existsSync(path.join(dir, 'contenu.js'))) gabarit.push('pas de contenu.js');
  if (!narrationFile) gabarit.push('pas de narration.js');
  if (!fs.existsSync(path.join(dir, 'voix'))) gabarit.push('pas de dossier voix/');

  return {
    reseau: 'ÉlectroRézo',
    station: name,
    octets: rec.octets,
    ecrans, ecrans_source: 'clés de NARRATION dans narration.js (mesuré hors corpus.json)',
    mots: motsHtml + motsJs,
    images: rec.img_tags + rec.svg_inline + rec.image_refs_js_css,
    images_absentes: rec.images_absentes,
    questions,
    narrations: ecrans,
    mots_narres: motsNarres,
    mp3,
    animation: rec.animation,
    moteur: rec.moteur,
    feuille_propre: rec.feuille_propre,
    marqueurs: markers(visibleTextFromHtml(htmlBlob) + '\n' + proseJs),
    liens_absolus: rec.liens_absolus,
    liens_casses: rec.liens_casses,
    retour_site: rec.retour_site,
    gabarit,
  };
}

// ===========================================================================
// Exécution
// ===========================================================================

const data = { reseaux: {} };

data.reseaux['Plan thermo-techno'] = [
  ...planModules().map(measurePlanModule),
  ...JSON.parse(readTextSafe(path.join(PLAN_DIR, 'capsules/donnees/_liste.js')).match(/\[[\s\S]*\]/)[0])
    .map(measureCapsule),
];

data.reseaux['Législation'] = fs.readdirSync(path.join(ROOT, 'legislation/stations'), { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .map(measureLegislationStation);

data.reseaux['HydroMétro'] = fs.readdirSync(path.join(ROOT, 'hydrometro/stations'), { withFileTypes: true })
  .filter((e) => e.isDirectory() && !['_MODELE', '_commun'].includes(e.name))
  .map((e) => e.name)
  .map(measureHydrometroStation);

data.reseaux['AéroRézo'] = fs.readdirSync(path.join(ROOT, 'aerorezo/stations'), { withFileTypes: true })
  .filter((e) => e.isDirectory() && e.name !== '_commun')
  .map((e) => e.name)
  .map(measureAerorezoStation);

data.reseaux['ÉlectroRézo'] = fs.readdirSync(path.join(ROOT, 'electrorezo/stations'), { withFileTypes: true })
  .filter((e) => e.isDirectory() && e.name !== '_commun')
  .map((e) => e.name)
  .map(measureElectrorezoStation);

fs.writeFileSync(path.join(HERE, 'audit-data.json'), JSON.stringify(data, null, 1), 'utf8');

for (const [reseau, stations] of Object.entries(data.reseaux)) {
  console.log(reseau, '->', stations.length, 'stations mesurées');
}
console.log('OK — audit-data.json écrit.');
