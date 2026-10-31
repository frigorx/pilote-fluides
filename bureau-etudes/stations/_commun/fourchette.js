/* Logique pure de la vérification par fourchette : aucune donnée, aucun stockage, aucun envoi.
   Navigateur : window.BE_FOURCHETTE. Node : module.exports. */
(function (racine) {
  "use strict";

  /* Lit un nombre écrit à la française ou à l'anglaise : "12,5", "12.5", "1 250", "1 250".
     Retourne un nombre, ou null si la saisie est vide ou illisible. */
  function lireNombre(texte) {
    if (texte === null || texte === undefined) return null;
    if (typeof texte === "number") return Number.isFinite(texte) ? texte : null;
    let s = String(texte).trim();
    if (s === "") return null;
    s = s.replace(/[\s  ]/g, "").replace(/[\u2212\u2013]/g, "-").replace(",", ".");
    if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  }

  /* true si min <= valeur <= max (bornes incluses), false sinon, null si la saisie est illisible. */
  function dansFourchette(texte, min, max) {
    const n = lireNombre(texte);
    if (n === null) return null;
    return n >= Number(min) && n <= Number(max);
  }

  const api = { lireNombre, dansFourchette };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (racine) racine.BE_FOURCHETTE = api;
})(typeof window !== "undefined" ? window : null);
