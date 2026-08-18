/* =====================================================================
   RÉFÉRENTIEL — le badge des codes couverts par un cours interactif.
   ---------------------------------------------------------------------
   Demande de F. Henninot (14/08/2026) : « sur chaque page, on doit
   indiquer quelle partie du référentiel on valide ou on étudie —
   ça permet de vérifier qu'on n'a rien oublié. »

   CONTRAT : script autonome, même règle que marque.js. Il se copie dans
   le dossier du module, à côté de son couverture.json :
     <script src="referentiel.js"></script>
   Il lit `couverture.json` (les clés de `codes` = enseigné, les clés
   d'`appui` = mobilisé en appui) et accroche le badge À LA LIGNE DE
   MARQUE (#marque-inerweb) : le bas-gauche est déjà à elle, le
   bas-droit est aux boutons « Aa » et son — aucun nouveau territoire,
   donc aucun nouveau chevauchement possible.

   Ce badge est VOLONTAIREMENT au niveau du module, pas de l'écran :
   les modules numérotent leurs écrans chacun à leur façon (« Écran 4 »,
   « ÉTAPE 4 », slugs) — une détection générique mentirait une fois sur
   trois. La précision écran par écran existe déjà dans les capsules
   (champ `reference`) ; pour les modules, elle se fera module par
   module, jamais par devinette.

   Hors ligne : si `fetch` échoue (page ouverte en file://), le badge
   ne s'affiche pas et rien d'autre ne change.
   ===================================================================== */
(() => {
  "use strict";

  function formater(couv) {
    const enseignes = Object.keys(couv.codes || {}).sort(trier);
    const appuis = Object.keys(couv.appui || {}).sort(trier);
    if (!enseignes.length && !appuis.length) return "";
    let t = "Référentiel : " + enseignes.join(" · ");
    if (appuis.length) t += (enseignes.length ? " — " : "") + "appui " + appuis.join(" · ");
    return t;
  }
  function trier(a, b) {
    const [ga, ca] = a.split(".").map(Number), [gb, cb] = b.split(".").map(Number);
    return ga - gb || ca - cb;
  }

  function accrocher(texte, essais) {
    const marque = document.getElementById("marque-inerweb");
    if (!marque) {
      /* marque.js n'a pas encore posé sa ligne : on repasse, dix fois au plus. */
      if (essais > 0) setTimeout(() => accrocher(texte, essais - 1), 400);
      return;
    }
    if (marque.querySelector(".marque-referentiel")) return;
    const badge = document.createElement("span");
    badge.className = "marque-referentiel";
    badge.textContent = "· " + texte;
    /* La ligne de marque passe en font-size:0 sur petit écran pour ne garder
       que le logo : le badge suit la même règle, il disparaît avec le texte. */
    badge.style.cssText = "font:inherit;letter-spacing:.01em;white-space:nowrap";
    marque.appendChild(badge);
  }

  fetch("couverture.json")
    .then((r) => (r.ok ? r.json() : null))
    .then((couv) => {
      if (!couv) return;
      const texte = formater(couv);
      if (texte) accrocher(texte, 10);
    })
    .catch(() => {});
})();
