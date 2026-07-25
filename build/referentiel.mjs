/* =====================================================================
   referentiel.mjs — le RÉFÉRENTIEL OFFICIEL comme donnée de build
   ---------------------------------------------------------------------
   Arrêté du 21 novembre 2025, annexe II.B : 136 codes de compétence
   répartis en 14 groupes, chacun évalué en Théorique (T) ou Pratique (P)
   selon la catégorie visée (A1, A2, B, C, D, E).

   POURQUOI CE MODULE EXISTE
   Avant lui, le référentiel n'était nulle part : les libellés étaient
   recopiés à la main dans `criteres[]` de cartes.js, les intitulés de
   groupe vivaient en commentaires. Conséquence : rien ne détectait un
   code inventé, et surtout rien ne signalait un code OUBLIÉ. Le pack
   couvrait 56 des 94 codes exigés en A1 sans que personne puisse le voir.

   RÈGLE D'OR — le référentiel est une donnée de BUILD, jamais de runtime.
   `build.mjs` résout ici les libellés officiels et les injecte figés dans
   pack.eleve.js / pack.pilote.js. Le navigateur ne charge donc jamais ce
   fichier de 74 Ko : il ne reçoit que les codes réellement utilisés.

   RÈGLE DE MODIFICATION — ce fichier ne se modifie QUE sur pièce (texte
   publié au JO). Il est la copie conforme de la source amont :
   C:\git\habilitation-fluide\evaluation\data\referentiel-2025.json
   `verifierSynchro()` avertit si les deux divergent.
   ===================================================================== */
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FICHIER = resolve(RACINE, "packs/fluides/referentiel-2025.json");

/* Dépôt privé, présent seulement sur le poste de F. Henninot : on s'y
   compare quand il est là, on n'en dépend jamais pour construire. */
const SOURCE_AMONT = "C:/git/habilitation-fluide/evaluation/data/referentiel-2025.json";

export const REFERENTIEL = JSON.parse(readFileSync(FICHIER, "utf8"));

/* Les 6 catégories du référentiel d'aptitude (V a son propre référentiel,
   annexe II.D, hors périmètre de ce pack). */
export const CATEGORIES = ["A1", "A2", "B", "C", "D", "E"];

/* ---------------------------------------------------------------------
   INDEX — un code résolu porte tout ce dont l'affichage a besoin :
   son libellé officiel, son groupe, et le T/P de chaque catégorie.
   --------------------------------------------------------------------- */
const INDEX = new Map();
const GROUPES = new Map();

for (const g of REFERENTIEL.groupes || []) {
  GROUPES.set(g.id, {
    id: g.id,
    numero: g.numero,
    titre: g.titre,
    tirage_au_sort: !!g.tirage_au_sort,
    nouveau: !!g.nouveau_2025,
    specifique_categories: g.specifique_categories || null,
  });
  for (const c of g.codes || []) {
    INDEX.set(c.code, {
      code: c.code,
      officiel: c.libelle,
      nouveau: !!c.nouveau_2025,
      cat: c.cat || {},
      tronc_commun: c.tronc_commun || null,
      groupe: g.id,
      groupe_numero: g.numero,
      groupe_titre: g.titre,
      tirage_au_sort: !!g.tirage_au_sort,
    });
  }
}

/* --------------------------------------------------------------------- */
export function resoudre(code) {
  return INDEX.get(code) || null;
}
export function tousLesCodes() {
  return [...INDEX.values()];
}
export function groupe(id) {
  return GROUPES.get(id) || null;
}
export function tousLesGroupes() {
  return [...GROUPES.values()];
}

/* Un code n'entre dans une épreuve que si sa valeur y est T ou P
   (Bible § 18, invariant 1). Le tiret « — » signifie non évalué. */
export function estEvalue(info, cat) {
  const v = info && info.cat ? info.cat[cat] : null;
  return v === "T" || v === "P";
}

/* L'épreuve où le code tombe, pour la catégorie visée : "T", "P" ou null. */
export function epreuve(info, cat) {
  return estEvalue(info, cat) ? info.cat[cat] : null;
}

/* Les codes exigés pour une catégorie donnée. */
export function codesRequis(cat) {
  return tousLesCodes().filter((i) => estEvalue(i, cat));
}

/* ---------------------------------------------------------------------
   COUVERTURE — le chiffre qui manquait : pour chaque catégorie visée par
   le pack, combien de codes exigés sont réellement traités, et lesquels
   manquent, groupés pour être lisibles d'un coup d'œil.
   --------------------------------------------------------------------- */
export function couverture(codesCites, categories) {
  const cites = new Set(codesCites);
  const res = {};
  for (const cat of categories) {
    const requis = codesRequis(cat);
    const manquants = requis.filter((i) => !cites.has(i.code));
    const parGroupe = {};
    for (const i of manquants) {
      (parGroupe[i.groupe] = parGroupe[i.groupe] || []).push({
        code: i.code,
        epreuve: i.cat[cat],
        titre: i.groupe_titre,
        tirage_au_sort: i.tirage_au_sort,
      });
    }
    res[cat] = {
      requis: requis.length,
      couverts: requis.length - manquants.length,
      manquants: manquants.length,
      pourcent: Math.round((100 * (requis.length - manquants.length)) / requis.length),
      par_groupe: parGroupe,
    };
  }
  return res;
}

/* ---------------------------------------------------------------------
   SYNCHRO — le référentiel du pack est une copie. Sur le poste où le
   dépôt amont existe, on vérifie que la copie n'a pas divergé. Ailleurs
   (CI, autre machine), on ne dit rien : le build doit rester autonome.
   --------------------------------------------------------------------- */
export function verifierSynchro() {
  if (!existsSync(SOURCE_AMONT)) return null;
  const h = (p) => createHash("sha256").update(readFileSync(p)).digest("hex");
  const local = h(FICHIER);
  const amont = h(SOURCE_AMONT);
  return local === amont
    ? { synchro: true }
    : { synchro: false, local: local.slice(0, 12), amont: amont.slice(0, 12) };
}

/* Règles de composition d'une épreuve (Bible § 8) — pas encore appliquées
   par le moteur (mode Évaluation désactivé), mais exposées ici pour que
   le jour venu on les lise au référentiel et non à une constante en dur. */
export const REGLES = REFERENTIEL.regles_composition || {};
