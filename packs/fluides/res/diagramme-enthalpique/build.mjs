import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_IDS, CORE_IDS, MODULES } from "./src/modules.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.join(root, "src");
const standaloneDir = path.join(root, "modules-autonomes");

const [courseShell, courseCss, courseJs, hubShell, hubCss, hubJs] = await Promise.all([
  readFile(path.join(sourceDir, "course-shell.html"), "utf8"),
  readFile(path.join(sourceDir, "course.css"), "utf8"),
  readFile(path.join(sourceDir, "course.js"), "utf8"),
  readFile(path.join(sourceDir, "hub-shell.html"), "utf8"),
  readFile(path.join(sourceDir, "hub.css"), "utf8"),
  readFile(path.join(sourceDir, "hub.js"), "utf8")
]);

await mkdir(standaloneDir, { recursive: true });

function inlineJson(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function replaceTokens(template, values) {
  let output = template;
  for (const [token, value] of Object.entries(values)) {
    output = output.replaceAll(`__${token}__`, value);
  }
  const remaining = output.match(/__(?:DOCUMENT_TITLE|COURSE_CSS|MODULE_DATA|COURSE_CONFIG|COURSE_JS|MARQUE_JS|HUB_CSS|CORE_IDS|HUB_JS)__/g);
  if (remaining) throw new Error(`Jetons non remplacés : ${remaining.join(", ")}`);
  return output;
}

function renderCourse(moduleData, config, marqueJs) {
  return replaceTokens(courseShell, {
    DOCUMENT_TITLE: config.documentTitle,
    COURSE_CSS: courseCss,
    MODULE_DATA: inlineJson(moduleData),
    COURSE_CONFIG: inlineJson(config),
    COURSE_JS: courseJs,
    MARQUE_JS: marqueJs
  });
}

const hub = replaceTokens(hubShell, {
  HUB_CSS: hubCss,
  MODULE_DATA: inlineJson(MODULES),
  CORE_IDS: inlineJson(CORE_IDS),
  HUB_JS: hubJs
});

const generated = [
  ["index.html", hub],
  ["cours-complet.html", renderCourse(MODULES, {
    documentTitle: "Diagramme enthalpique — parcours modulable",
    defaultIds: CORE_IDS
  }, "../../../../moteur/marque.js")],
  ["cours-habilitation.html", renderCourse(MODULES.filter((module) => CORE_IDS.includes(module.id)), {
    documentTitle: "Diagramme enthalpique — essentiels habilitation",
    fixedIds: CORE_IDS
  }, "../../../../moteur/marque.js")],
  ["cours-toutes-courbes.html", renderCourse(MODULES, {
    documentTitle: "Diagramme enthalpique — toutes les familles",
    fixedIds: ALL_IDS
  }, "../../../../moteur/marque.js")]
];

for (const module of MODULES) {
  const filename = `${String(module.order).padStart(2, "0")}-${module.id}.html`;
  generated.push([
    path.join("modules-autonomes", filename),
    renderCourse([module], {
      documentTitle: `Diagramme enthalpique — ${module.title}`,
      fixedIds: [module.id]
    }, "../../../../../moteur/marque.js")
  ]);
}

for (const [relativePath, content] of generated) {
  await writeFile(path.join(root, relativePath), content, "utf8");
}

const manifest = {
  product: "inerWeb Édu — Diagramme enthalpique modulaire",
  version: "7.0.0-brouillon",
  generatedOn: "2026-08-18",
  offline: true,
  defaultCourse: "cours-habilitation.html",
  configurableCourse: "cours-complet.html",
  modules: MODULES.map((module) => ({
    id: module.id,
    order: module.order,
    title: module.title,
    level: module.level,
    goal: module.goal,
    file: `modules-autonomes/${String(module.order).padStart(2, "0")}-${module.id}.html`,
    inHabilitationPreset: CORE_IDS.includes(module.id)
  }))
};

await writeFile(path.join(root, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Génération terminée : ${generated.length} pages HTML autonomes et 1 manifeste.`);
