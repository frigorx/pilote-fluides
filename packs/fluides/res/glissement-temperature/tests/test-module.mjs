import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const [html, css, js, svg, sources] = await Promise.all([
  readFile(join(root, "index.html"), "utf8"),
  readFile(join(root, "styles.css"), "utf8"),
  readFile(join(root, "app.js"), "utf8"),
  readFile(join(root, "assets", "chaine-glissement.svg"), "utf8"),
  readFile(join(root, "SOURCES.md"), "utf8"),
]);

const lessonCount = [...js.matchAll(/floor:\s*[12],\s*\n\s*short:/g)].length;
const activityCount = [...js.matchAll(/pauseForActivity:\s*true/g)].length;

assert.equal(lessonCount, 13, "Le parcours doit contenir 13 scènes.");
assert.equal(activityCount, 2, "Le récit doit s'arrêter sur 2 activités réelles.");
assert.match(html, /lang="fr"/, "La langue française doit être déclarée.");
assert.match(html, /id="listen"/, "La commande de voix doit exister.");
assert.match(html, /id="stop-voice"/, "La commande d'arrêt de voix doit exister.");
assert.match(html, /id="transcript"/, "La transcription visible doit exister.");
assert.match(js, /visibilitychange/, "La voix doit s'arrêter quand la page est cachée.");
assert.match(js, /speechSynthesis\.cancel/, "La voix précédente doit pouvoir être annulée.");
assert.match(js, /scheduleAutomaticNext/, "Les scènes expliquées doivent pouvoir s'enchaîner après la voix.");
assert.match(js, /speechRun/, "Un jeton doit protéger les callbacks vocaux annulés.");
assert.match(js, /voiceSteps/, "La narration doit piloter les états successifs des illustrations.");
assert.match(js, /chaleur sensible/i, "Le parcours doit commencer par la chaleur sensible.");
assert.match(js, /chaleur latente/i, "Le palier de chaleur latente doit précéder le glissement.");
assert.match(js, /Chaleur latente signifie changement d'état ; elle ne signifie pas toujours température constante/i, "Le module doit dissocier chaleur latente et température forcément constante.");
assert.match(js, /Une isotherme complète traverse les trois zones/i, "La distinction isobare-isotherme doit suivre une isotherme entière.");
assert.match(js, /sa portion sous la cloche est légèrement inclinée/i, "Le glissement doit être expliqué par la portion diphasique inclinée du zéotrope.");
assert.match(js, /renderIsobarIsotherms/, "La scène dédiée aux isobares et isothermes doit être rendue.");
assert.match(js, /ISOTHERME ENTIÈRE · T constante/, "L'isotherme de comparaison doit être complète, continue et explicitement nommée.");
assert.match(js, /M88 44C90 100 93 145 96 181H315C330 189 342 209 350 229/, "Le cas sans glissement doit conserver l'isotherme en zones liquide, diphasique et vapeur.");
assert.match(js, /M90 44C92 100 95 143 98 174L315 190C331 198 343 214 350 229/, "Le cas avec glissement doit conserver l'isotherme entière avec une portion diphasique inclinée.");
assert.match(css, /\.isotherm-line\s*\{[^}]*stroke:\s*var\(--violet\)[^}]*stroke-dasharray:\s*none/s, "Les isothermes ne doivent plus apparaître comme de petits tirets rouges.");

/* Dans la zone liquide, l'enthalpie ne bouge presque pas quand la pression
   change : l'isotherme y est quasi verticale. C'est la silhouette qui permet
   de la reconnaître sur un vrai diagramme, donc on la mesure au lieu de la
   confier à la relecture. On exige moins de 25 unités de dérive horizontale
   entre le départ de l'isotherme et son arrivée sur la courbe de bulle. */
for (const [depart, arrivee, ou] of [...js.matchAll(/isotherm-line[^"]*" d="M(\d+) \d+C[\d ]+ [\d ]+ (\d+) \d+[HL]/g)]
  .map((m) => [Number(m[1]), Number(m[2]), m[0].slice(0, 40)])) {
  assert.ok(Math.abs(arrivee - depart) <= 25,
    `Isotherme trop inclinée dans la zone liquide (${depart} vers ${arrivee}) : ${ou}`);
}

assert.match(css, /paint-order:\s*stroke fill/, "Les étiquettes SVG doivent porter un liseré de fond pour rester lisibles sur un tracé.");
assert.match(js, /après la détente, le trajet réel peut commencer déjà à l'intérieur de la cloche/i, "Le segment bulle-rosée ne doit pas être confondu avec l'entrée réelle de tout évaporateur.");
assert.match(js, /A ne s'évapore pas entièrement puis B/i, "La fausse évaporation entièrement séquentielle doit être explicitement corrigée.");
assert.doesNotMatch(html + css + js, /https?:\/\/(?!terminology|www\.ashrae|www\.chemours|webapps\.copeland|www\.danfoss)/, "Le module ne doit charger aucune dépendance distante.");
assert.doesNotMatch(html, /<script[^>]+src="https?:/, "Aucun script distant ne doit être chargé.");
assert.doesNotMatch(html, /<link[^>]+href="https?:/, "Aucune feuille distante ne doit être chargée.");
assert.match(css, /#f7f1e7/i, "Le fond crème inerWeb doit être présent.");
assert.match(css, /#fffdf8/i, "Le fond papier inerWeb doit être présent.");
assert.doesNotMatch(css, /prefers-color-scheme\s*:\s*dark/i, "Aucun thème sombre ne doit être ajouté.");
assert.match(css, /@media print/, "Une version imprimable doit exister.");
assert.match(css, /@page\s*\{\s*margin:\s*15mm;/, "La marge d'impression doit être de 15 mm.");
assert.match(svg, /<title id="title">/, "Le SVG doit avoir un titre.");
assert.match(svg, /<desc id="desc">/, "Le SVG doit avoir une description métier.");
assert.match(sources, /RAG local consulté/, "La consultation du RAG doit être tracée.");
assert.match(sources, /RAG local consulté/, "La consultation du RAG doit être tracée.");

console.log(`Validation structurelle réussie : ${lessonCount} scènes, ${activityCount} pauses d'activité, récit automatique protégé, SVG décrit, hors ligne.`);
