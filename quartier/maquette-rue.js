/* =====================================================================
   LA RUE — assemblage. Chaque module pose un morceau de la rue avec
   l'atelier du noyau et rend ses réglages de caméra par zone.
   Cahier des charges commun : SPEC-3D.md (coordonnées, zones, style).
   Les modules se chargent séparément : un module cassé est sauté (avec
   un avertissement), la rue se construit quand même.
   ===================================================================== */
import { creerAtelier } from "./noyau.js";

const MODULES = ["decor", "immeuble", "commerce", "maison", "rue", "traces"];
/* Les tracés de chaque calque (tuyaux, gaines, câbles) sont des pseudo-zones :
   ils s'allument avec leur calque et grisent avec les autres. */
export const TRACES = ["froid", "clim", "chauffage", "elec", "air"];

/* Cadrage de la vue d'ensemble : toute la rue tient à l'écran. */
export const VUE = {
  cible: [-1.5, 5.2, -0.5], az: 22, el: 12, largeur: 22.5, hauteur: 8.6,
  balancement: [-14, 38], bornes: [-24, 22, -2, 15, -9, 11],
  soleil: [-26, 36, 30], ombre: [-34, 34, 24, -20]
};

const charges = {};
/* seul : liste de modules à charger (banc d'essai), sinon tous */
export async function charger(seul) {
  const liste = seul && seul.length ? MODULES.filter(function (m) { return seul.indexOf(m) >= 0; }) : MODULES;
  const r = await Promise.allSettled(liste.map(function (m) { return import("./m-" + m + ".js"); }));
  r.forEach(function (x, i) {
    if (x.status === "fulfilled" && typeof x.value[liste[i]] === "function") charges[liste[i]] = x.value[liste[i]];
    else console.warn("[rue3d] module sauté : m-" + liste[i] + ".js", x.reason ? String(x.reason) : "fonction absente");
  });
}

export function construireMaquette(THREE, defs, calques) {
  calques = calques || [];
  const dTr = TRACES.map(function (t) {
    const c = calques.find(function (x) { return x.id === t; });
    return { id: "trace-" + t, couleur: c ? c.couleur : "#1b3a63" };
  });
  const H = creerAtelier(THREE, defs.concat(dTr));
  const cam = {};
  MODULES.forEach(function (m) {
    if (!charges[m]) return;
    try { Object.assign(cam, charges[m](H) || {}); }
    catch (e) { console.warn("[rue3d] module en erreur : m-" + m + ".js", e); }
  });
  H.finir();
  const ids = defs.map(function (d) { return d.id; });

  function calque(c) {
    ids.forEach(function (id) { H.zones[id].grCible = c && c.zones.indexOf(id) < 0 ? 1 : 0; });
    TRACES.forEach(function (t) {
      const z = H.zones["trace-" + t], on = !!c && c.id === t;
      z.cible = on ? 0.9 : 0;
      z.grCible = c && !on ? 1 : 0;
    });
  }
  return { groupe: H.racine, zones: H.zones, cam: cam, vue: VUE, animer: H.animer, calque: calque };
}
