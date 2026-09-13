// Audit du corpus des narrations vocales — pilote-fluides
// Lecture seule : ne modifie aucun fichier du depot. Ecrit uniquement le JSON de resultats
// dans le scratchpad de la session.
import fs from 'node:fs';

const CORPUS_PATH = 'C:/git/pilote-fluides/build/voix/corpus.json';
const OUT_PATH = 'C:/Users/henni/AppData/Local/Temp/claude/C--Users-henni-OneDrive-Bureau-4-INERWEB-CLAUDE-ESPACE-TRAVAIL/36dde53e-95ac-496a-939f-6cbdd6ab98b1/scratchpad/audit-voix-data.json';

const corpus = JSON.parse(fs.readFileSync(CORPUS_PATH, 'utf8'));
const narrations = corpus.narrations;

// ---------------------------------------------------------------------------
// Utilitaires
// ---------------------------------------------------------------------------

function reseauModule(sources) {
  const s0 = (sources && sources[0]) || '';
  let m;
  if ((m = s0.match(/^packs\/fluides\/res\/([^/]+)\//))) {
    return { reseau: 'plan-thermo-techno', module: m[1] };
  }
  for (const net of ['legislation', 'hydrometro', 'aerorezo', 'electrorezo']) {
    if (s0 === net || s0.startsWith(net + '/')) {
      if ((m = s0.match(new RegExp('^' + net + '/stations/([^/]+)/')))) {
        return { reseau: net, module: 'stations/' + m[1] };
      }
      if ((m = s0.match(new RegExp('^' + net + '/lignes/([^/]+)/')))) {
        return { reseau: net, module: 'lignes/' + m[1] };
      }
      return { reseau: net, module: net + '/commun' };
    }
  }
  return { reseau: 'autre', module: s0.split('/')[0] || '(sans source)' };
}

function wordCount(texte) {
  const t = (texte || '').trim();
  if (!t) return 0;
  return t.split(/\s+/).filter(Boolean).length;
}

function splitSentences(texte) {
  return (texte || '')
    .split(/\n+/)
    .join('. ')
    .split(/(?<=[.!?…])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function normalizePhrase(s) {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstWords(texte, n) {
  const words = (texte || '').trim().split(/\s+/).filter(Boolean);
  return words.slice(0, n).join(' ');
}

function contextAround(texte, matchIndex, matchLength, radiusWords = 7) {
  const before = texte.slice(0, matchIndex).trim().split(/\s+/).filter(Boolean);
  const after = texte.slice(matchIndex + matchLength).trim().split(/\s+/).filter(Boolean);
  const b = before.slice(-radiusWords).join(' ');
  const hit = texte.slice(matchIndex, matchIndex + matchLength);
  const a = after.slice(0, radiusWords).join(' ');
  return [b, hit, a].filter(Boolean).join(' ');
}

// enrichissement : reseau/module + nb mots calcules une fois pour toutes
for (const n of narrations) {
  const rm = reseauModule(n.sources);
  n._reseau = rm.reseau;
  n._module = rm.module;
  n._mots = wordCount(n.texte);
}

const NARR = narrations.filter((n) => n.type === 'narration');
const FEED = narrations.filter((n) => n.type === 'feedback');
const NARR_FEED = narrations.filter((n) => n.type === 'narration' || n.type === 'feedback');
const IFACE = narrations.filter((n) => n.type === 'interface');

const result = {};

// ---------------------------------------------------------------------------
// Point 1 — repartition par type et par reseau
// ---------------------------------------------------------------------------
{
  const byType = {};
  const byReseau = {};
  const byReseauType = {};
  for (const n of narrations) {
    byType[n.type] ??= { nb: 0, mots: 0 };
    byType[n.type].nb++;
    byType[n.type].mots += n._mots;

    byReseau[n._reseau] ??= { nb: 0, mots: 0, modules: new Set() };
    byReseau[n._reseau].nb++;
    byReseau[n._reseau].mots += n._mots;
    byReseau[n._reseau].modules.add(n._module);

    const key = n._reseau + ' | ' + n.type;
    byReseauType[key] = (byReseauType[key] || 0) + 1;
  }
  result.point1 = {
    total: narrations.length,
    byType,
    byReseau: Object.fromEntries(
      Object.entries(byReseau).map(([k, v]) => [k, { nb: v.nb, mots: v.mots, nbModules: v.modules.size }])
    ),
    byReseauType,
  };
}

// ---------------------------------------------------------------------------
// Point 2 — anglicismes
// ---------------------------------------------------------------------------
{
  const TERMES = [
    ['feedback', /\bfeedback\b/gi, 'evitable'],
    ['check', /\bcheck\b/gi, 'evitable'],
    ['checker', /\bchecker\b/gi, 'evitable'],
    ['checke', /\bcheck[ée]e?s?\b/gi, 'evitable'],
    ['switch', /\bswitch(?:e[sz]?)?\b/gi, 'evitable'],
    ['reset', /\breset(?:e[rz]?)?\b/gi, 'evitable'],
    ['display', /\bdisplay\b/gi, 'evitable'],
    ['start', /\bstart\b/gi, 'evitable'],
    ['stop', /\bstop\b/gi, 'evitable'],
    ['input', /\binput\b/gi, 'evitable'],
    ['output', /\boutput\b/gi, 'evitable'],
    ['setpoint / set point', /\bset[\s-]?point\b/gi, 'evitable'],
    ['cut-in / cut in', /\bcut[\s-]in\b/gi, 'tolere'],
    ['cut-out / cut out', /\bcut[\s-]out\b/gi, 'tolere'],
    ['run', /\brun\b/gi, 'evitable'],
    ['default', /\bdefault\b/gi, 'evitable'],
    ['timer', /\btimer\b/gi, 'evitable'],
    ['delay', /\bdelay\b/gi, 'evitable'],
    ['bypass / by-pass', /\bby[\s-]?pass\b/gi, 'tolere'],
    ['flow', /\bflow\b/gi, 'evitable'],
    ['design', /\bdesign\b/gi, 'evitable'],
    ['process', /\bprocess\b/gi, 'evitable'],
    ['setting(s)', /\bsettings?\b/gi, 'evitable'],
    ['software', /\bsoftware\b/gi, 'evitable'],
    ['hardware', /\bhardware\b/gi, 'evitable'],
    ['update', /\bupdate\b/gi, 'evitable'],
    ['boost', /\bboost\b/gi, 'evitable'],
    ['burn-out / burnout', /\bburn[\s-]?out\b/gi, 'evitable'],
    ['fail-safe', /\bfail[\s-]?safe\b/gi, 'evitable'],
    ['overflow', /\boverflow\b/gi, 'evitable'],
    ['click', /\bclick\b/gi, 'evitable'],
    ['slide', /\bslide\b/gi, 'evitable'],
    ['slider', /\bslider\b/gi, 'evitable'],
    ['scroll', /\bscroll\b/gi, 'evitable'],
    ['drag', /\bdrag\b/gi, 'evitable'],
    ['drop', /\bdrop\b/gi, 'evitable'],
    ['tip(s)', /\btips?\b/gi, 'evitable'],
    ['ok', /\bok\b/gi, 'evitable'],
    ['dry', /\bdry\b/gi, 'evitable'],
    ['wet', /\bwet\b/gi, 'evitable'],
    ['low', /\blow\b/gi, 'evitable'],
    ['high', /\bhigh\b/gi, 'evitable'],
    ['gas', /\bgas\b/gi, 'evitable'],
    ['cooling', /\bcooling\b/gi, 'evitable'],
    ['heating', /\bheating\b/gi, 'evitable'],
    ['fan', /\bfan\b/gi, 'evitable'],
    ['cooler', /\bcooler\b/gi, 'evitable'],
    ['chiller', /\bchiller\b/gi, 'evitable'],
    ['freezer', /\bfreezer\b/gi, 'evitable'],
    ['master', /\bmaster\b/gi, 'evitable'],
    ['slave', /\bslave\b/gi, 'evitable'],
    ['offset', /\boffset\b/gi, 'a-verifier'],
    ['log', /\blog\b/gi, 'evitable'],
    ['bug', /\bbug\b/gi, 'evitable'],
    ['hub', /\bhub\b/gi, 'evitable'],
    ['home', /\bhome\b/gi, 'evitable'],
    ['next', /\bnext\b/gi, 'evitable'],
    ['back', /\bback\b/gi, 'evitable'],
    ['play', /\bplay\b/gi, 'evitable'],
    ['pause', /\bpause\b/gi, 'evitable'],
    ['replay', /\breplay\b/gi, 'evitable'],
    ['mute', /\bmute\b/gi, 'evitable'],
    ['speed', /\bspeed\b/gi, 'evitable'],
    ['level', /\blevel\b/gi, 'evitable'],
    ['step', /\bstep\b/gi, 'evitable'],
    ['screen', /\bscreen\b/gi, 'evitable'],
    ['loading', /\bloading\b/gi, 'evitable'],
    ['ready', /\bready\b/gi, 'evitable'],
    ['done', /\bdone\b/gi, 'evitable'],
    ['warning', /\bwarning\b/gi, 'evitable'],
    ['error', /\berror\b/gi, 'evitable'],
  ];

  const anglicismes = [];
  for (const [label, re, tolerance] of TERMES) {
    const hits = [];
    for (const n of NARR_FEED) {
      const texte = n.texte || '';
      let mm;
      const rex = new RegExp(re.source, re.flags);
      while ((mm = rex.exec(texte))) {
        hits.push({ module: n._module, reseau: n._reseau, cle: n.cle, type: n.type, extrait: contextAround(texte, mm.index, mm[0].length) });
      }
    }
    if (hits.length) {
      anglicismes.push({ label, tolerance, total: hits.length, exemples: hits.slice(0, 10) });
    }
  }

  // on / off : uniquement majuscules
  const onOffHits = [];
  for (const n of NARR_FEED) {
    const texte = n.texte || '';
    for (const re of [/\bON\b/g, /\bOFF\b/g]) {
      let mm;
      const rex = new RegExp(re.source, re.flags);
      while ((mm = rex.exec(texte))) {
        onOffHits.push({ module: n._module, cle: n.cle, extrait: contextAround(texte, mm.index, mm[0].length) });
      }
    }
  }
  if (onOffHits.length) {
    anglicismes.push({ label: 'on/off (ON/OFF majuscules)', tolerance: 'evitable', total: onOffHits.length, exemples: onOffHits.slice(0, 10) });
  }

  // supplement : termes cites comme "toleres" par la consigne mais hors liste de recherche
  const SUPPLEMENT = [
    ['booster', /\bboosters?\b/gi],
    ['pump-down', /\bpump[\s-]?down\b/gi],
    ['flash gas', /\bflash[\s-]?gas\b/gi],
    ['TraxOil', /\btrax[\s-]?oil\b/gi],
  ];
  const supplement = [];
  for (const [label, re] of SUPPLEMENT) {
    const hits = [];
    for (const n of NARR_FEED) {
      const texte = n.texte || '';
      let mm;
      const rex = new RegExp(re.source, re.flags);
      while ((mm = rex.exec(texte))) {
        hits.push({ module: n._module, cle: n.cle, extrait: contextAround(texte, mm.index, mm[0].length) });
      }
    }
    if (hits.length) supplement.push({ label, total: hits.length, exemples: hits.slice(0, 5) });
  }

  // phrases entieres en anglais : >= 4 mots consecutifs dans l'ensemble ferme
  const ENGLISH_SET = new Set(['the', 'of', 'to', 'and', 'is', 'are', 'with', 'for', 'this', 'that', 'your', 'click', 'press', 'select']);
  const phrasesAnglaises = [];
  for (const n of NARR_FEED) {
    const texte = n.texte || '';
    const words = texte.split(/\s+/).filter(Boolean);
    let run = [];
    for (let i = 0; i < words.length; i++) {
      const clean = words[i].toLowerCase().replace(/[^a-z']/g, '');
      if (ENGLISH_SET.has(clean)) {
        run.push(words[i]);
      } else {
        if (run.length >= 4) phrasesAnglaises.push({ module: n._module, cle: n.cle, extrait: run.join(' ') });
        run = [];
      }
    }
    if (run.length >= 4) phrasesAnglaises.push({ module: n._module, cle: n.cle, extrait: run.join(' ') });
  }

  result.point2 = { anglicismes, onOffTotal: onOffHits.length, supplement, phrasesAnglaises: phrasesAnglaises.slice(0, 30), phrasesAnglaisesTotal: phrasesAnglaises.length };
}

// ---------------------------------------------------------------------------
// Point 3 — repetitions
// ---------------------------------------------------------------------------
{
  // a. phrases identiques dans >=2 entrees narration d'un meme module
  const parModule = new Map(); // module -> normPhrase -> Set(cle)
  // b. phrases identiques dans >=3 modules differents
  const global = new Map(); // normPhrase -> Map(module -> Set(cle))

  for (const n of NARR) {
    const sentences = splitSentences(n.texte);
    const seenInThisEntry = new Set();
    for (const s of sentences) {
      const norm = normalizePhrase(s);
      if (norm.split(' ').filter(Boolean).length < 3) continue; // ignore fragments trop courts
      if (seenInThisEntry.has(norm)) continue; // ne pas compter 2x la meme entree
      seenInThisEntry.add(norm);

      if (!parModule.has(n._module)) parModule.set(n._module, new Map());
      const mMap = parModule.get(n._module);
      if (!mMap.has(norm)) mMap.set(norm, new Set());
      mMap.get(norm).add(n.cle);

      if (!global.has(norm)) global.set(norm, new Map());
      const gMap = global.get(norm);
      if (!gMap.has(n._module)) gMap.set(n._module, new Set());
      gMap.get(n._module).add(n.cle);
    }
  }

  const repetitionsParModule = [];
  for (const [module, mMap] of parModule) {
    const dups = [];
    for (const [norm, cles] of mMap) {
      if (cles.size >= 2) dups.push({ phrase: norm, nb: cles.size, cles: [...cles] });
    }
    if (dups.length) {
      dups.sort((a, b) => b.nb - a.nb);
      repetitionsParModule.push({ module, nbPhrasesRepetees: dups.length, exemples: dups.slice(0, 5) });
    }
  }
  repetitionsParModule.sort((a, b) => b.nbPhrasesRepetees - a.nbPhrasesRepetees);

  const formulesPassePartout = [];
  for (const [norm, gMap] of global) {
    if (gMap.size >= 3) {
      let totalOcc = 0;
      for (const cles of gMap.values()) totalOcc += cles.size;
      formulesPassePartout.push({ phrase: norm, nbModules: gMap.size, totalOcc, modules: [...gMap.keys()] });
    }
  }
  formulesPassePartout.sort((a, b) => b.nbModules - a.nbModules || b.totalOcc - a.totalOcc);

  // c. ouvertures : 8 premiers mots
  const ouvertures = new Map(); // texte8 -> Set(module)
  for (const n of NARR) {
    const f8 = firstWords(n.texte, 8);
    if (!f8) continue;
    if (!ouvertures.has(f8)) ouvertures.set(f8, new Set());
    ouvertures.get(f8).add(n._module);
  }
  // classement par frequence BRUTE (nb d'entrees), pas par nb de modules distincts,
  // afin de ne pas ecarter les ouvertures repetees plusieurs fois dans un seul module
  const ouverturesCount = new Map();
  for (const n of NARR) {
    const f8 = firstWords(n.texte, 8);
    if (!f8) continue;
    ouverturesCount.set(f8, (ouverturesCount.get(f8) || 0) + 1);
  }
  const ouverturesTop = [...ouvertures.entries()]
    .map(([texte, modules]) => ({ texte, nbEntrees: ouverturesCount.get(texte) || 0, nbModules: modules.size, modules: [...modules] }))
    .filter((o) => o.nbEntrees >= 2)
    .sort((a, b) => b.nbEntrees - a.nbEntrees)
    .slice(0, 30);

  // d. mots-tics en tete de phrase
  const TICS = ['Regardez', 'Observez', 'Vous voyez', 'Ici', 'Sur cet écran', 'À l\'écran', 'Maintenant', 'Notez', 'Retenez', 'Attention', 'Comme vous le voyez'];
  const ticsTotal = {};
  const ticsParModule = new Map(); // module -> {count, totalPhrases}
  for (const n of NARR) {
    const sentences = splitSentences(n.texte);
    if (!ticsParModule.has(n._module)) ticsParModule.set(n._module, { count: 0, totalPhrases: 0 });
    const rec = ticsParModule.get(n._module);
    rec.totalPhrases += sentences.length;
    for (const s of sentences) {
      const st = s.trim();
      for (const tic of TICS) {
        const re = new RegExp('^' + tic.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace('a-écran', 'a-écran'), 'i');
        if (re.test(st)) {
          ticsTotal[tic] = (ticsTotal[tic] || 0) + 1;
          rec.count++;
          break;
        }
      }
    }
  }
  const MIN_PHRASES_DENSITE = 15;
  const densiteTics = [...ticsParModule.entries()]
    .filter(([, v]) => v.totalPhrases >= MIN_PHRASES_DENSITE)
    .map(([module, v]) => ({ module, occurrences: v.count, totalPhrases: v.totalPhrases, densite: Math.round((v.count * 100 / v.totalPhrases) * 10) / 10 }))
    .filter((v) => v.occurrences > 0)
    .sort((a, b) => b.densite - a.densite)
    .slice(0, 10);
  const ticsTotalSum = Object.values(ticsTotal).reduce((a, b) => a + b, 0);

  // e. mot repete >=3 fois dans une meme phrase (hors mots-outils)
  const STOPWORDS = new Set('le la les l un une des du de d et ou a au aux en dans sur pour avec sans par que qui quoi dont ou ce cet cette ces se son sa ses leur leurs votre vos notre nos mon ma mes ton ta tes il elle ils elles on nous vous je tu est sont etre avoir ont es suis sommes etes plus moins ne pas ni si mais donc or car comme quand lorsque alors aussi tres bien encore deja ici la y ca cela celui celle ceux celles tout tous toute toutes autre autres meme memes entre vers chez sous deux trois c qu s n an ans lui eux y'.split(' '));
  function stripAccents(s) { return s.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  const motsRepetes = [];
  for (const n of NARR) {
    const sentences = splitSentences(n.texte);
    for (const s of sentences) {
      const words = s.toLowerCase().match(/[a-zà-öø-ÿ]+/gi) || [];
      const freq = {};
      for (const w of words) {
        const key = stripAccents(w.toLowerCase());
        if (STOPWORDS.has(key) || key.length < 3) continue;
        freq[key] = (freq[key] || 0) + 1;
      }
      for (const [w, c] of Object.entries(freq)) {
        if (c >= 3) {
          motsRepetes.push({ module: n._module, cle: n.cle, mot: w, nb: c, phrase: s.slice(0, 140) });
        }
      }
    }
  }

  // f. doublons de tete (40 premiers caracteres identiques) dans un meme module
  const tetesParModule = new Map(); // module -> tete40 -> [cle]
  for (const n of NARR) {
    const tete = (n.texte || '').trim().slice(0, 40);
    if (!tete) continue;
    if (!tetesParModule.has(n._module)) tetesParModule.set(n._module, new Map());
    const mMap = tetesParModule.get(n._module);
    if (!mMap.has(tete)) mMap.set(tete, []);
    mMap.get(tete).push(n.cle);
  }
  const doublonsDeTete = [];
  for (const [module, mMap] of tetesParModule) {
    for (const [tete, cles] of mMap) {
      if (cles.length >= 2) doublonsDeTete.push({ module, tete, nb: cles.length, cles });
    }
  }
  doublonsDeTete.sort((a, b) => b.nb - a.nb);

  result.point3 = {
    a: { repetitionsParModule, nbModulesConcernes: repetitionsParModule.length },
    b: formulesPassePartout.slice(0, 30),
    c: ouverturesTop,
    d: { ticsTotal, ticsTotalSum, densiteTics, seuilMinPhrases: MIN_PHRASES_DENSITE },
    e: { total: motsRepetes.length, exemples: motsRepetes.slice(0, 40) },
    f: { total: doublonsDeTete.length, exemples: doublonsDeTete.slice(0, 20) },
  };
}

// ---------------------------------------------------------------------------
// Point 4 — textes d'interface prononces
// ---------------------------------------------------------------------------
{
  let nbMajuscules = 0, nbPoint = 0, nbFleche = 0, nbSlash = 0;
  const parModule = new Map();
  const exemples = [];
  for (const n of IFACE) {
    const t = n.texte || '';
    const hasMaj = /\b[A-ZÀ-Þ]{2,}\b/.test(t);
    const hasPoint = t.includes('·');
    const hasFleche = /[→↔]/.test(t);
    const hasSlash = t.includes('/');
    if (hasMaj) nbMajuscules++;
    if (hasPoint) nbPoint++;
    if (hasFleche) nbFleche++;
    if (hasSlash) nbSlash++;
    parModule.set(n._module, (parModule.get(n._module) || 0) + 1);
    if (hasMaj || hasPoint || hasFleche || hasSlash) {
      exemples.push({ module: n._module, cle: n.cle, texte: t.slice(0, 120), hasMaj, hasPoint, hasFleche, hasSlash });
    }
  }
  const topModules = [...parModule.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15).map(([module, nb]) => ({ module, nb }));
  // 10 exemples typiques varies
  const exTypiques = [];
  for (const flag of ['hasMaj', 'hasFleche', 'hasPoint', 'hasSlash']) {
    for (const e of exemples) {
      if (e[flag] && !exTypiques.includes(e)) { exTypiques.push(e); break; }
    }
  }
  for (const e of exemples) { if (exTypiques.length >= 10) break; if (!exTypiques.includes(e)) exTypiques.push(e); }

  result.point4 = {
    total: IFACE.length,
    nbMajuscules, nbPoint, nbFleche, nbSlash,
    topModules,
    exemples: exTypiques.slice(0, 10),
  };
}

// ---------------------------------------------------------------------------
// Point 5 — symboles et abreviations
// ---------------------------------------------------------------------------
{
  function count(re, texts) {
    let total = 0; const exemples = [];
    for (const n of texts) {
      const t = n.texte || '';
      const rex = new RegExp(re.source, re.flags);
      let mm;
      while ((mm = rex.exec(t))) {
        total++;
        if (exemples.length < 6) exemples.push({ module: n._module, cle: n.cle, extrait: contextAround(t, mm.index, mm[0].length, 6) });
      }
    }
    return { total, exemples };
  }

  const SYMBOLES = [
    ['m³/h', /m³\s*\/\s*h/g, 'Couvert (ORDRE 9)'],
    ['m3/h (chiffre "3" non exposant)', /\bm3\s*\/\s*h\b/gi, 'Non couvert — la table ne cible que le ³ Unicode'],
    ['kW', /(?<![A-Za-zÀ-ÖØ-öø-ÿ])kW(?![A-Za-zÀ-ÖØ-öø-ÿ])/g, 'Couvert (ORDRE 188)'],
    ['kWh', /(?<![A-Za-zÀ-ÖØ-öø-ÿ])kWh(?![A-Za-zÀ-ÖØ-öø-ÿ])/g, 'Couvert (ORDRE 187 + kWh/an ORDRE 7)'],
    ['°C', /°\s*C\b/g, 'Couvert (ORDRE 186)'],
    ['bar', /(?<![A-Za-zÀ-ÖØ-öø-ÿ])bars?(?![A-Za-zÀ-ÖØ-öø-ÿ])/gi, 'Non couvert — absent des 218 regles'],
    ['%', /%/g, 'Couvert (ORDRE 191)'],
    ['±', /±/g, 'Non couvert — absent des 218 regles'],
    ['→', /→/g, 'Couvert (ORDRE 192, + ORDRE 1 fleche terminale)'],
    ['↔', /↔/g, 'Couvert (ORDRE 193)'],
    ['×', /×/g, 'Couvert (ORDRE 49)'],
    ['≥', /≥/g, 'Non couvert — absent des 218 regles'],
    ['≤', /≤/g, 'Non couvert — absent des 218 regles'],
    ['Δ (isole)', /Δ(?![TP])/g, 'Couvert (ORDRE 70, generique)'],
    ['ΔT', /ΔT/g, 'Partiel — Δ devient "delta " (ORDRE 70), le T reste une lettre isolee non developpee'],
    ['ΔP', /ΔP/g, 'Partiel — meme mecanisme que ΔT'],
    ['m² (isole)', /m²/g, 'Couvert (ORDRE 19)'],
    ['m³ (isole)', /m³(?!\s*\/)/g, 'Couvert (ORDRE 20, filet generique)'],
    ['l/min (l minuscule)', /(?<![A-Za-zÀ-ÖØ-öø-ÿ])l\s*\/\s*min\b/g, 'Non couvert — la regle ORDRE 15 ne cible que L majuscule'],
    ['L/min (L majuscule)', /(?<![A-Za-zÀ-ÖØ-öø-ÿ])L\s*\/\s*min\b/g, 'Couvert (ORDRE 15)'],
    ['tr/min', /tr\s*\/\s*min/g, 'Couvert (ORDRE 13)'],
    ['Hz', /(?<![A-Za-zÀ-ÖØ-öø-ÿ])Hz(?![A-Za-zÀ-ÖØ-öø-ÿ])/g, 'Non couvert — absent des 218 regles'],
    ['V (volt, apres chiffre)', /(?<=\d\s?)V\b(?!\w)/g, 'Non couvert — aucune regle \\bV\\b (confirme par le commentaire ORDRE 148 : "aucun kilovolt")'],
    ['A (ampere, apres chiffre)', /(?<=\d\s?)A\b(?![A-Za-z0-9])/g, 'Non couvert en tant qu\'unite — seules les classes A1/A2/A3/A2L sont couvertes'],
    ['Ω isole (sans k devant)', /(?<!k)(?<!k )Ω/g, 'Non couvert — seule la combinaison kΩ est couverte (ORDRE 38)'],
    ['R-xxx (dont R-134a)', /\bR[\s-]?\d{2,4}[A-Za-z]{0,2}\b/g, 'Couvert (ORDRE 185)'],
    ['KP1/KP5/KP15', /\bKP\s?\d+\b/g, 'Couvert (ORDRE 149)'],
    ['KVP/KVL/KVR', /\bKV[PLR]\b/g, 'Couvert (ORDRE 147)'],
    ['NRD', /\bNRD\b/g, 'Couvert (ORDRE 152)'],
    ['HP', /\bHP\b/g, 'Couvert (ORDRE 179)'],
    ['BP', /\bBP\b/g, 'Couvert (ORDRE 180)'],
    ['COP', /\bCOP\b/g, 'Couvert (ORDRE 112)'],
    ['EER', /\bEER\b/g, 'Couvert (ORDRE 113)'],
    ['PRP', /\bPRP\b/g, 'Couvert (ORDRE 181)'],
    ['GWP', /\bGWP\b/g, 'Couvert (ORDRE 182)'],
    ['ODP', /\bODP\b/g, 'Couvert — epele lettre a lettre (ORDRE 114), non developpe'],
    ['F-Gas', /\bF[\s-]?[Gg][Aa][SsZz]\b/g, 'Couvert (ORDRE 104/105/166)'],
    ['CERFA', /\bCERFA\b/gi, 'Non couvert — absent des 218 regles'],
    ['PE (sigle)', /(?<![A-Za-zÀ-ÖØ-öø-ÿ])PE(?![A-Za-zÀ-ÖØ-öø-ÿ])/g, 'Non couvert — absent des 218 regles'],
    ['A2L', /\bA[\s-]?2[\s-]?L\b/g, 'Couvert (ORDRE 172)'],
    ['EN 378 (sans NF devant)', /(?<!NF\s)\bEN\s?378\b/g, 'Non couvert — seul "NF EN" est couvert (ORDRE 130), "EN" nu ne l\'est pas'],
    ['ISO (hors ISO VG)', /\bISO\b(?!\s?VG)/g, 'Non couvert explicitement — seul "ISO VG" a une regle (ORDRE 137)'],
  ];

  const rows = SYMBOLES.map(([label, re, couverture]) => {
    const { total, exemples } = count(re, NARR);
    return { label, couverture, total, exemples };
  });

  result.point5 = rows;
}

// ---------------------------------------------------------------------------
// Point 6 — longueurs
// ---------------------------------------------------------------------------
{
  const parReseau = new Map();
  for (const n of NARR) {
    if (!parReseau.has(n._reseau)) parReseau.set(n._reseau, []);
    parReseau.get(n._reseau).push(n._mots);
  }
  function stats(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const sum = sorted.reduce((a, b) => a + b, 0);
    const mediane = sorted.length % 2 ? sorted[(sorted.length - 1) / 2] : Math.round((sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2);
    return { min: sorted[0], mediane, moyenne: Math.round((sum / sorted.length) * 10) / 10, max: sorted[sorted.length - 1], n: sorted.length };
  }
  const longueursParReseau = {};
  for (const [reseau, arr] of parReseau) longueursParReseau[reseau] = stats(arr);

  const courtes = NARR.filter((n) => n._mots < 8 && n._mots > 0);
  const longues = NARR.filter((n) => n._mots > 170).sort((a, b) => b._mots - a._mots);

  result.point6 = {
    longueursParReseau,
    courtes: { total: courtes.length, exemples: courtes.slice(0, 10).map((n) => ({ module: n._module, cle: n.cle, mots: n._mots, texte: n.texte })) },
    longues: { total: longues.length, exemples: longues.slice(0, 10).map((n) => ({ module: n._module, cle: n.cle, mots: n._mots, texte: (n.texte || '').slice(0, 200) })) },
  };
}

// ---------------------------------------------------------------------------
// Point 7 — tutoiement residuel
// ---------------------------------------------------------------------------
{
  const PATTERNS = [
    ['tu', /\btu\b/g],
    ['ton', /\bton\b/g],
    ['tes', /\btes\b/g],
    ["t'", /\bt['’]/g],
    ['toi', /\btoi\b/g],
  ];
  const rows = [];
  for (const [label, re] of PATTERNS) {
    const hits = [];
    for (const n of NARR_FEED) {
      const t = n.texte || '';
      const rex = new RegExp(re.source, re.flags);
      let mm;
      while ((mm = rex.exec(t))) {
        hits.push({ module: n._module, cle: n.cle, type: n.type, extrait: contextAround(t, mm.index, mm[0].length) });
      }
    }
    rows.push({ label, total: hits.length, exemples: hits.slice(0, 15) });
  }
  result.point7 = rows;
}

// ---------------------------------------------------------------------------
// Point 8 — caracteres parasites (tous types, ventile par type)
// ---------------------------------------------------------------------------
{
  const MOTIFS = [
    ['*', /\*/g],
    ['#', /#/g],
    ['_', /_/g],
    ['[', /\[/g],
    [']', /\]/g],
    ['|', /\|/g],
    ['{', /\{/g],
    ['}', /\}/g],
    ['<', /</g],
    ['>', />/g],
    ['..', /(?<!\.)\.\.(?!\.)/g],
    [',,', /,,/g],
    [';;', /;;/g],
    ['double espace', /  +/g],
    ['tiret isole en debut de ligne', /^-\s/gm],
    ['retour a la ligne interne', /\n/g],
  ];
  const rows = [];
  for (const [label, re] of MOTIFS) {
    let total = 0;
    const parType = {};
    const exemples = [];
    for (const n of narrations) {
      const t = n.texte || '';
      const rex = new RegExp(re.source, re.flags);
      let mm; let localCount = 0;
      while ((mm = rex.exec(t))) {
        localCount++;
        if (exemples.length < 8) exemples.push({ module: n._module, type: n.type, cle: n.cle, extrait: contextAround(t.replace(/\n/g, '⏎'), mm.index, Math.max(mm[0].length,1)) });
      }
      if (localCount) {
        total += localCount;
        parType[n.type] = (parType[n.type] || 0) + localCount;
      }
    }
    if (total) rows.push({ label, total, parType, exemples });
  }
  result.point8 = rows;
}

// ---------------------------------------------------------------------------
// Classement des modules cumulant le plus de defauts (toutes categories)
// ---------------------------------------------------------------------------
{
  const score = new Map();
  const add = (module, n = 1) => score.set(module, (score.get(module) || 0) + n);
  result.classementNote = 'score = somme brute des occurrences comptees dans les categories 2 a 8, par module, sans ponderation';

  // 2) anglicismes evitables + on/off (memes motifs que plus haut, relus directement pour un score fidele)
  const ANGLICISMES_RE = [
    /\bfeedback\b/gi, /\bcheck\b/gi, /\bchecker\b/gi, /\bcheck[ée]e?s?\b/gi, /\bswitch(?:e[sz]?)?\b/gi,
    /\breset(?:e[rz]?)?\b/gi, /\bdisplay\b/gi, /\bstart\b/gi, /\bstop\b/gi, /\binput\b/gi, /\boutput\b/gi,
    /\bset[\s-]?point\b/gi, /\brun\b/gi, /\bdefault\b/gi, /\btimer\b/gi, /\bdelay\b/gi, /\bflow\b/gi,
    /\bdesign\b/gi, /\bprocess\b/gi, /\bsettings?\b/gi, /\bsoftware\b/gi, /\bhardware\b/gi, /\bupdate\b/gi,
    /\bboost\b/gi, /\bburn[\s-]?out\b/gi, /\bfail[\s-]?safe\b/gi, /\boverflow\b/gi, /\bclick\b/gi, /\bslide\b/gi,
    /\bslider\b/gi, /\bscroll\b/gi, /\bdrag\b/gi, /\bdrop\b/gi, /\btips?\b/gi, /\bok\b/gi, /\bdry\b/gi, /\bwet\b/gi,
    /\blow\b/gi, /\bhigh\b/gi, /\bgas\b/gi, /\bcooling\b/gi, /\bheating\b/gi, /\bfan\b/gi, /\bcooler\b/gi,
    /\bchiller\b/gi, /\bfreezer\b/gi, /\bmaster\b/gi, /\bslave\b/gi, /\blog\b/gi, /\bbug\b/gi, /\bhub\b/gi,
    /\bhome\b/gi, /\bnext\b/gi, /\bback\b/gi, /\bplay\b/gi, /\bpause\b/gi, /\breplay\b/gi, /\bmute\b/gi,
    /\bspeed\b/gi, /\blevel\b/gi, /\bstep\b/gi, /\bscreen\b/gi, /\bloading\b/gi, /\bready\b/gi, /\bdone\b/gi,
    /\bwarning\b/gi, /\berror\b/gi, /\bON\b/g, /\bOFF\b/g,
  ];
  // score parallele qui exclut le point 4 (interface), pour ne pas laisser le volume
  // brut d'entrees "interface" ecraser les autres categories dans le classement
  const scoreSansInterface = new Map();
  const addSI = (module, n = 1) => scoreSansInterface.set(module, (scoreSansInterface.get(module) || 0) + n);

  for (const n of NARR_FEED) {
    const t = n.texte || '';
    for (const re of ANGLICISMES_RE) {
      const rex = new RegExp(re.source, re.flags);
      const mm = t.match(rex);
      if (mm) { add(n._module, mm.length); addSI(n._module, mm.length); }
    }
  }

  // 3a + 3f repetitions internes
  for (const r of result.point3.a.repetitionsParModule) { add(r.module, r.nbPhrasesRepetees); addSI(r.module, r.nbPhrasesRepetees); }
  for (const d of result.point3.f.exemples) { add(d.module, d.nb - 1); addSI(d.module, d.nb - 1); }
  // (les exemples de f sont plafonnes a 20 : approximation acceptee et signalee)

  // 3d tics
  for (const [module, v] of [...result.point3.d.densiteTics.map((d) => [d.module, d.occurrences])]) { add(module, v); addSI(module, v); }

  // 3e mot repete
  for (const m of result.point3.e.exemples) { add(m.module, 1); addSI(m.module, 1); }
  // (plafonne a 40 exemples : approximation signalee)

  // 4 interface (compte brut d'entrees de type interface, tel que defini au point 4)
  // -- inclus dans "score" uniquement, PAS dans "scoreSansInterface"
  for (const t of result.point4.topModules) add(t.module, t.nb);

  // 6 longueurs hors cible
  for (const c of result.point6.courtes.exemples) { add(c.module, 1); addSI(c.module, 1); }
  for (const l of result.point6.longues.exemples) { add(l.module, 1); addSI(l.module, 1); }

  // 7 tutoiement
  for (const row of result.point7) for (const e of row.exemples) { add(e.module, 1); addSI(e.module, 1); }

  // 8 caracteres parasites
  for (const row of result.point8) for (const e of row.exemples) { add(e.module, 1); addSI(e.module, 1); }

  result.classementModules = [...score.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15).map(([module, total]) => ({ module, total }));
  result.classementModulesSansInterface = [...scoreSansInterface.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15).map(([module, total]) => ({ module, total }));
}

fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 1), 'utf8');
console.log('OK ecrit dans', OUT_PATH);
console.log('taille approx (Ko):', Math.round(fs.statSync(OUT_PATH).size / 1024));
