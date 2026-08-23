import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { parse } from "acorn";
import * as walk from "acorn-walk";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const output = path.join(here, "corpus.json");
const captures = path.join(here, "captures-runtime.json");
const items = new Map();

function decodeEntities(text) {
  const named = {
    amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: '"',
    eacute: "é", egrave: "è", ecirc: "ê", agrave: "à", ccedil: "ç",
    ugrave: "ù", ocirc: "ô", icirc: "î", deg: "°"
  };
  return String(text).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
    if (code[0] === "#") {
      const value = code[1].toLowerCase() === "x"
        ? Number.parseInt(code.slice(2), 16)
        : Number.parseInt(code.slice(1), 10);
      return Number.isFinite(value) ? String.fromCodePoint(value) : match;
    }
    return named[code.toLowerCase()] ?? match;
  });
}

function normaliser(value) {
  return decodeEntities(String(value ?? ""))
    .replace(/<\/(p|li|div|h[1-6]|blockquote|td|tr)>/gi, "</$1> ")
    .replace(/<[^>]*>/g, " ")
    .replace(/[\u00a0\u202f]/g, " ")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function cle(value) {
  const text = normaliser(value);
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return `${(hash >>> 0).toString(16).padStart(8, "0")}-${text.length}`;
}

function preparerTexteParModule(value, source) {
  let text = String(value ?? "");
  if (source.includes("chaleur-circuit-interactif")) {
    text = text
      .replace(/\bHP\b/g, "haute pression")
      .replace(/\bBP\b/g, "basse pression")
      .replace(/\bQ̇\b/g, "Q point")
      .replace(/\bṁ\b/g, "m point")
      .replace(/\bΔT\b/g, "delta T")
      .replace(/\bc\s*p\b/gi, "cé pé")
      .replace(/\bkW\b/g, "kilowatts")
      .replace(/\bW\b/g, "watts")
      .replace(/\bkg\b/g, "kilogrammes")
      .replace(/°C/g, "degrés Celsius")
      .replace(/→/g, "vers");
  }
  if (source.includes("pression-temperature-interactive")) {
    text = text
      .replace(/\bHP\b/g, "haute pression")
      .replace(/\bBP\b/g, "basse pression")
      .replace(/R[\u2011\u2010-]?134a/gi, "R cent trente-quatre a")
      .replace(/R[\u2011\u2010-]?407C/gi, "R quatre-cent-sept cé")
      .replace(/°C/g, " degrés Celsius")
      .replace(/→/g, "vers");
  }
  return normaliser(text);
}

function prefixeAnneeFrise(year) {
  const range = String(year).match(/^(\d{4})\s*-\s*(\d{4})$/);
  if (range) return `Entre ${range[1]} et ${range[2]}, `;
  if (/^\d{4}$/.test(year)) return `En ${year}, `;
  return `${year}, `;
}

function ajouter(value, source, type = "narration") {
  const text = normaliser(value);
  if (text.length < 8) return;
  const key = cle(text);
  const current = items.get(key);
  if (current && current.texte !== text) {
    throw new Error(`Collision de clé vocale ${key}`);
  }
  if (current) {
    if (!current.sources.includes(source)) current.sources.push(source);
    return;
  }
  items.set(key, { cle: key, texte: text, type, sources: [source] });
}

function staticValue(node, env) {
  if (!node) return undefined;
  switch (node.type) {
    case "Literal": return node.value;
    case "Identifier": return env.get(node.name);
    case "UnaryExpression": {
      const value = staticValue(node.argument, env);
      if (value === undefined) return undefined;
      if (node.operator === "-") return -value;
      if (node.operator === "+") return +value;
      if (node.operator === "!") return !value;
      return undefined;
    }
    case "TemplateLiteral": {
      let result = "";
      for (let index = 0; index < node.quasis.length; index += 1) {
        result += node.quasis[index].value.cooked ?? node.quasis[index].value.raw;
        if (index < node.expressions.length) {
          const value = staticValue(node.expressions[index], env);
          if (value === undefined || (typeof value === "object" && value !== null)) return undefined;
          result += String(value);
        }
      }
      return result;
    }
    case "BinaryExpression": {
      if (node.operator !== "+") return undefined;
      const left = staticValue(node.left, env);
      const right = staticValue(node.right, env);
      return left === undefined || right === undefined ? undefined : left + right;
    }
    case "ArrayExpression": return node.elements.map(element => staticValue(element, env));
    case "ObjectExpression": {
      const object = {};
      for (const property of node.properties) {
        if (property.type !== "Property" || property.computed) continue;
        const key = property.key.type === "Identifier" ? property.key.name : property.key.value;
        const value = staticValue(property.value, env);
        if (value !== undefined) object[key] = value;
      }
      return object;
    }
    case "ConditionalExpression": {
      const test = staticValue(node.test, env);
      return typeof test === "boolean"
        ? staticValue(test ? node.consequent : node.alternate, env)
        : undefined;
    }
    default: return undefined;
  }
}

function propertyName(node) {
  if (!node || node.type !== "Property" || node.computed) return "";
  return node.key.type === "Identifier" ? node.key.name : String(node.key.value);
}

function collectScript(code, source) {
  let ast;
  try {
    ast = parse(code, { ecmaVersion: "latest", sourceType: "script", allowHashBang: true });
  } catch (error) {
    console.warn(`Analyse ignorée pour ${source}: ${error.message}`);
    return;
  }

  const env = new Map();
  const fractionneNarration = code.includes("narrationChunks(");
  const compositionVocale = code.includes("SpeechSynthesisUtterance");
  const compositionAvecInvite = compositionVocale && code.includes("item.prompt");
  const estFrise = source.includes("frise-vivante");
  for (let pass = 0; pass < 6; pass += 1) {
    let changed = false;
    walk.simple(ast, {
      VariableDeclarator(node) {
        if (node.id.type !== "Identifier" || env.has(node.id.name)) return;
        const value = staticValue(node.init, env);
        if (value !== undefined) { env.set(node.id.name, value); changed = true; }
      }
    });
    if (!changed) break;
  }

  walk.fullAncestor(ast, (node, _state, ancestors) => {
    if (node.type === "Property") {
      const name = propertyName(node);
      const value = staticValue(node.value, env);
      if (["speak", "narration", "s"].includes(name) && typeof value === "string") {
        const luParFragments = (name === "narration" && fractionneNarration)
          || (name === "speak" && source.includes("pression-temperature-interactive"));
        if (!(name === "narration" && estFrise) && !luParFragments) ajouter(value, source, name);
        if (name === "narration" && fractionneNarration) {
          for (const chunk of preparerTexteParModule(value, source).split(/(?<=[.!?;])\s+/)) {
            ajouter(chunk, source, "fragment");
          }
        }
        if (name === "speak" && source.includes("pression-temperature-interactive")) {
          for (const chunk of preparerTexteParModule(value, source).split(/(?<=[.!?;])\s+/)) {
            ajouter(chunk, source, "fragment");
          }
        }
      }
      if (name === "narration" && Array.isArray(value)) {
        value.filter(item => typeof item === "string").forEach(item => ajouter(item, source, "fragment"));
      }
      if (["why", "explain", "feedback", "message", "q", "question", "prompt", "x"].includes(name) && typeof value === "string") {
        ajouter(value, source, "feedback");
      }
      if (["messages", "choices", "options"].includes(name) && Array.isArray(value)) {
        value.filter(item => typeof item === "string").forEach(item => ajouter(item, source, "choix"));
      }
    }

    if (!source.includes("moteur/prof-vocal.js") && node.type === "AssignmentExpression" && node.left?.type === "MemberExpression" && !node.left.computed
      && node.left.property?.name === "textContent") {
      const collectAlternatives = candidate => {
        const value = staticValue(candidate, env);
        if (typeof value === "string") { ajouter(value, source, "interface"); return; }
        if (candidate?.type === "ConditionalExpression") {
          collectAlternatives(candidate.consequent);
          collectAlternatives(candidate.alternate);
        }
      };
      collectAlternatives(node.right);
    }

    if (node.type !== "ObjectExpression") return;
    const object = staticValue(node, env);
    if (!object || typeof object !== "object") return;

    const ancestryKeys = ancestors.filter(item => item.type === "Property").map(propertyName);
    if (ancestryKeys.includes("voiceSteps") && typeof object.text === "string") {
      ajouter(preparerTexteParModule(object.text, source), source, "voiceStep");
    }

    if (estFrise && typeof object.year === "string" && typeof object.title === "string" && typeof object.narration === "string") {
      ajouter(`${prefixeAnneeFrise(object.year)}${object.title}. ${object.narration}`, source, "frise");
    }

    const title = typeof object.title === "string" ? object.title : "";
    const text = typeof object.text === "string" ? object.text : "";
    const intro = typeof object.intro === "string" ? object.intro : "";
    const prompt = typeof object.prompt === "string" ? object.prompt : "";
    const explicit = typeof object.speak === "string" || typeof object.narration === "string" || typeof object.s === "string";
    if (compositionVocale && title && text && !explicit) {
      if (compositionAvecInvite && prompt) ajouter(`${title}. ${text} ${prompt}`, source, "composition");
      else ajouter(`${title}. ${text}`, source, "composition");
    } else if (compositionVocale && title && intro && !explicit) {
      ajouter(`${title}. ${intro}`, source, "composition");
    }
  });
}

function walkFiles(directory) {
  const found = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...walkFiles(full));
    else if (/\.(?:js|html)$/i.test(entry.name)) found.push(full);
  }
  return found;
}

function collectMainCards() {
  const file = path.join(root, "packs/fluides/pack.eleve.js");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  for (const card of sandbox.window.PILOTE_PACK.cartes || []) {
    const blocks = (card.blocs || []).map(block => `${block.t ? `${block.t}. ` : ""}${block.html || ""}`).join(" ");
    ajouter(`${card.titre || ""}. ${card.corps || ""} ${blocks}`, `packs/fluides/cartes.js#${card.id}`, "fiche");
  }
}

collectMainCards();

/* Deux gisements de narrations, et non plus un seul :
   · packs/fluides/res — les cours du pack habilitation ;
   · legislation      — les stations du 2e réseau (23/08/2026). Elles portent
     leur narration en `data-narration` sur chaque écran, ce que la boucle
     ci-dessous sait déjà lire. C'est un couplage d'OUTILLAGE seulement : la
     station ne dépend de rien à l'exécution, le dossier reste déplaçable. */
for (const racine of ["packs/fluides/res", "legislation"]) {
  const dossier = path.join(root, racine);
  if (!fs.existsSync(dossier)) continue;
  for (const file of walkFiles(dossier)) {
    const relative = path.relative(root, file).replaceAll("\\", "/");
    const code = fs.readFileSync(file, "utf8");
    if (file.endsWith(".js")) collectScript(code, relative);
    else {
      for (const match of code.matchAll(/data-narration\s*=\s*(["'])([\s\S]*?)\1/gi)) {
        ajouter(match[2], relative, "data-narration");
      }
      for (const match of code.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
        collectScript(match[1], relative);
      }
    }
  }
}

collectScript(
  fs.readFileSync(path.join(root, "moteur/prof-vocal.js"), "utf8"),
  "moteur/prof-vocal.js"
);

ajouter(
  "Tome 3. Technologie des organes frigorifiques. Choisissez une famille puis un dossier.",
  "packs/fluides/res/tome-3-technologie-organes/app.js",
  "dynamique"
);

if (fs.existsSync(captures)) {
  const runtimeItems = JSON.parse(fs.readFileSync(captures, "utf8"));
  for (const item of runtimeItems) ajouter(item.texte ?? item.text, item.source || "capture-runtime", "capture");
}

const corpus = {
  version: 1,
  genereLe: new Date().toISOString(),
  total: items.size,
  narrations: [...items.values()].sort((a, b) => a.cle.localeCompare(b.cle))
};

fs.writeFileSync(output, `${JSON.stringify(corpus, null, 2)}\n`, "utf8");
console.log(`${corpus.total} narrations écrites dans ${path.relative(root, output)}`);
