/* =====================================================================
   planches.mjs — contrôle des planches SVG animées
   ---------------------------------------------------------------------
   POURQUOI CE FICHIER EXISTE
   Le 27/07, F. Henninot regarde l'animation de l'anoxie et signale :
   « je vois 2 cadavres en bas avec le gars qui monte ». Le dessin était
   juste, la chronologie était juste — la faute était dans le SMIL :

       <g opacity="0">
         <animate attributeName="opacity" values="0;1" begin="5.4s" fill="freeze"/>
         <animate attributeName="opacity" values="1;0" begin="9.1s" fill="freeze"/>

   DEUX animations figées sur le MÊME attribut du MÊME élément. Elles se
   superposent, et selon l'implémentation le navigateur peut garder la
   première : le personnage censé disparaître reste debout au milieu des
   deux victimes au sol. Le message enseigné s'inverse — on ne voit plus
   un double accident, on voit quelqu'un qui se relève.

   Rien ne le détectait : le fichier est valide, les durées sont
   cohérentes, la planche s'affiche. Seul l'œil le voit, et seulement si
   l'on regarde au bon moment. D'où ce contrôle.

   CE QU'IL VÉRIFIE
   1. deux <animate> sur le même attribut du même élément (le défaut ci-dessus)
   2. une planche animée sans prise en compte de prefers-reduced-motion
   3. les <mpath href="#id"> qui pointent vers un id absent

   Usage : node build/planches.mjs [--strict]
   ===================================================================== */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DOSSIER = resolve(RACINE, "packs/fluides/res/svg");
const STRICT = process.argv.includes("--strict");

/* Parcours par pile : on suit l'imbrication réelle des balises, pour
   rattacher chaque <animate> à SON élément parent et à aucun autre. */
function animationsParElement(svg) {
  const pile = [];
  const trouves = [];
  const re = /<(\/?)([a-zA-Z][\w:-]*)([^>]*?)(\/?)>/g;
  let m;
  while ((m = re.exec(svg))) {
    const [, fermante, nom, attrs, autoFermante] = m;
    if (fermante) { pile.pop(); continue; }

    if (/^animate(Motion|Transform)?$/.test(nom)) {
      const parent = pile[pile.length - 1];
      if (!parent) continue;
      const cible = (attrs.match(/attributeName="([^"]+)"/) || [])[1] ||
                    (nom === "animateMotion" ? "motion" : "transform");
      parent.anims.push({ cible, gele: /fill="freeze"/.test(attrs), ligne: numLigne(svg, m.index) });
    } else if (!autoFermante) {
      const el = { nom, attrs: attrs.trim(), anims: [], ligne: numLigne(svg, m.index) };
      pile.push(el);
      trouves.push(el);
    }
  }
  return trouves;
}

const numLigne = (t, i) => t.slice(0, i).split("\n").length;

let erreurs = 0, avertis = 0, animees = 0;
const fichiers = readdirSync(DOSSIER).filter((f) => f.endsWith(".svg")).sort();

for (const f of fichiers) {
  const svg = readFileSync(resolve(DOSSIER, f), "utf8");
  if (!/<animate/.test(svg)) continue;
  animees++;
  const pb = [];

  /* 1 — deux animations sur le même attribut du même élément */
  for (const el of animationsParElement(svg)) {
    const parCible = {};
    for (const a of el.anims) (parCible[a.cible] = parCible[a.cible] || []).push(a);
    for (const [cible, liste] of Object.entries(parCible)) {
      if (liste.length < 2) continue;
      const geles = liste.filter((a) => a.gele).length;
      pb.push({
        grave: geles >= 2,
        txt: "ligne " + el.ligne + " · <" + el.nom + " " + el.attrs.slice(0, 42) + "> : " +
          liste.length + " animations sur « " + cible + " »" +
          (geles >= 2 ? " dont " + geles + " en fill=freeze — elles se superposent, " +
            "l'élément peut ne jamais atteindre son état final" : ""),
      });
    }
  }

  /* 2 — respect de prefers-reduced-motion */
  if (!/prefers-reduced-motion/.test(svg))
    pb.push({ grave: false, txt: "aucune règle prefers-reduced-motion : l'animation tourne " +
      "même chez qui a demandé qu'on lui épargne le mouvement" });

  /* 3 — les trajectoires pointent vers un chemin existant */
  for (const m of svg.matchAll(/<mpath[^>]*href="#([^"]+)"/g))
    if (!new RegExp('id="' + m[1] + '"').test(svg))
      pb.push({ grave: true, txt: "<mpath> vers #" + m[1] + " : aucun élément ne porte cet id" });

  if (pb.length) {
    console.log("\n" + f);
    for (const p of pb) {
      console.log("   " + (p.grave ? "✗" : "⚠") + " " + p.txt);
      p.grave ? erreurs++ : avertis++;
    }
  }
}

console.log("\nplanches : " + animees + " animée(s) sur " + fichiers.length +
  " — ✗ " + erreurs + " défaut(s) · ⚠ " + avertis + " avertissement(s)");
if (erreurs && STRICT) {
  console.error("✗ --strict : des animations peuvent ne jamais atteindre leur état final");
  process.exit(1);
}
