/* =====================================================================
   MARQUE — logo inerWeb + filigrane de propriété intellectuelle.
   ---------------------------------------------------------------------
   CONTRAT : script autonome, aucune dépendance au moteur. Il s'ajoute
   sur n'importe quelle page, à côté de lisibilite.js :
     <script src=".../moteur/marque.js"></script>
   Il pose le logo compact inerWeb (spécification figée, charte § 3.4 —
   orange DU LOGO #e8914a, distinct de l'orange du contenu) suivi de
   « © inerWeb <année> » et de la mention de droits. Décision
   F. Henninot 10/08/2026 (charte R8) : présent sur chaque page, chaque
   diapositive, chaque impression — sans nom personnel dans le logo.

   TROIS RÉGLAGES, lus sur la balise <script> elle-même, sinon sur <html>,
   sinon les valeurs par défaut. Ils se posent ainsi :
     <script src="../../moteur/marque.js"
             data-cartouche="Édu" data-licence="cc-by-nc-nd"></script>
     · data-cartouche — le mot du cartouche orange : Pilote (défaut),
                        Fluide, Édu. Le logo ne se redessine pas, il se
                        décline : SEUL ce mot change (charte § 3.4).
     · data-licence   — cc-by-nc-nd (défaut), tous-droits, interne.
     · data-prototype — présent = la page s'annonce document de travail.
   Rien à poser : la page garde le comportement d'avant le 18/08/2026.

   POURQUOI LA LICENCE EST ICI, et pas dans un pied de page écrit à la
   main (décision F. Henninot 18/08/2026) : une page de cours circule
   seule — imprimée, enregistrée, transférée. Détachée de sa galerie,
   elle perd tout contexte. La mention de droits doit donc voyager DANS
   la page, au même endroit que la marque, et sortir à l'imprimante.
   Régime retenu : CC BY-NC-ND 4.0. NC réserve le marché des centres de
   formation, ND interdit qu'on reprenne les schémas sous un autre nom.
   L'auteur, lui, n'est jamais lié par la licence qu'il donne : la vente
   d'une licence commerciale reste entièrement ouverte.

   TROIS MODES, et la raison de chacun — c'est mesuré, pas prudentiel :
     · `hote`     — la page marque un conteneur avec `data-marque-hote`
                    (la projection : son bas est pris par la barre de
                    pilotage). La marque entre DANS la diapositive, donc
                    dans toute capture d'écran.
     · `fixe`     — la page ne défile pas (cours en 100dvh, écrans
                    d'application) : filigrane fixe en bas à gauche.
     · `document` — la page défile. Un filigrane fixe passerait SUR le
                    texte : sur une page de 2 500 px, six chevauchements
                    comptés. La marque se range donc en FIN DE FLUX, et
                    redevient `fixed` À L'IMPRESSION, où elle se répète
                    en pied de chaque feuille — c'est là que la preuve
                    compte.
   Le mode est recalculé au redimensionnement (le zoom du bouton « Aa »
   rend une page fixe défilante).

   PIÈGES : le coin bas-DROIT est pris (boutons « Aa » et son), d'où la
   gauche. `moteur/impression.css` ne doit JAMAIS lister #marque-inerweb
   dans ce qu'elle masque. La mention longue ne s'affiche qu'en mode
   document et à l'impression : en filigrane fixe elle recouvrirait la
   page qu'elle est censée protéger.
   ===================================================================== */
(function () {
  "use strict";
  if (window.__marqueInerweb) return; // double inclusion : inoffensive
  window.__marqueInerweb = true;

  var ANNEE = "2026";
  var CONTACT = "inerweb.fh@gmail.com";

  /* ------------------------------------------------------------------
     Réglages. `currentScript` est null quand le script est chargé en
     `async`/`defer` ou réinjecté : on retombe alors sur la balise par
     son `src`, puis sur <html>, puis sur les défauts. */
  function reglages() {
    var s =
      document.currentScript ||
      document.querySelector('script[src*="marque.js"]');
    var h = document.documentElement;
    function lire(nom) {
      if (s && s.getAttribute("data-" + nom)) return s.getAttribute("data-" + nom);
      if (h.getAttribute("data-marque-" + nom)) return h.getAttribute("data-marque-" + nom);
      return null;
    }
    function present(nom) {
      return !!(
        (s && s.hasAttribute("data-" + nom)) ||
        h.hasAttribute("data-marque-" + nom)
      );
    }
    return {
      cartouche: lire("cartouche") || "Pilote",
      licence: lire("licence") || "cc-by-nc-nd",
      prototype: present("prototype"),
    };
  }

  /* ------------------------------------------------------------------
     Les trois régimes de droits. La forme COURTE accompagne le logo
     partout ; la forme LONGUE ne sort qu'en fin de document et à
     l'impression — c'est la version qui a valeur de mention légale. */
  var LICENCES = {
    "cc-by-nc-nd": {
      court: "CC BY-NC-ND 4.0",
      long:
        "CC BY-NC-ND 4.0 — citer inerWeb, pas d’usage commercial, pas de modification · " +
        "Illustrations, schémas et animations : tous droits réservés · " +
        "Usage en centre de formation : " + CONTACT,
    },
    "tous-droits": {
      court: "Tous droits réservés",
      long:
        "Tous droits réservés — reproduction, adaptation et diffusion soumises à " +
        "autorisation écrite · Contact : " + CONTACT,
    },
    interne: {
      court: "Document interne — ne pas diffuser",
      long:
        "Document interne — ne pas diffuser · Contient des éléments de documentation " +
        "constructeur soumis à leurs propres droits · Contact : " + CONTACT,
    },
  };

  var R = reglages();
  var LIC = LICENCES[R.licence] || LICENCES["cc-by-nc-nd"];

  /* ------------------------------------------------------------------
     Logo compact, cotes de la charte § 3.4 (viewBox 400×50 ramené à
     l'utile) : ❄️ + iner (Trebuchet gras) + Web (Segoe Script) #1b3a63,
     ligne et cartouche orange #e8914a, texte blanc.
     Le cartouche s'élargit avec le mot — c'est la SEULE cote qui bouge
     (charte : le cartouche « s'adapte au mot, tout le reste est figé »).
     7 px par caractère en Segoe UI gras 14 px, plus 38 px de marges
     internes : la formule redonne exactement 80 pour « Pilote », donc un
     viewBox de 240 — les valeurs figées d'avant le paramétrage. Aucune
     des 59 pages déjà marquées ne bouge d'un pixel. */
  function dessinerLogo(mot) {
    var w = Math.max(56, Math.round(mot.length * 7 + 38));
    var vb = 160 + w; // 155 = bord gauche du cartouche, +5 de respiration
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + vb + ' 50" ' +
      'width="' + Math.round(vb * 0.48) + '" height="24" role="img" ' +
      'aria-label="inerWeb ' + mot + '">' +
      '<text fill="#1b3a63" font-size="28px" x="4" y="34">❄️</text>' +
      '<text fill="#1b3a63" font-family="Trebuchet MS, Trebuchet, sans-serif" ' +
      'font-size="26px" font-weight="bold" x="44" y="32">iner</text>' +
      '<text fill="#1b3a63" font-family="Segoe Script, Brush Script MT, cursive" ' +
      'font-size="26px" x="94" y="32">Web</text>' +
      '<line stroke="#e8914a" stroke-width="2" x1="44" x2="150" y1="35" y2="35"/>' +
      '<rect fill="#e8914a" x="155" y="10" rx="5" ry="5" width="' + w + '" height="24"/>' +
      '<text fill="#ffffff" font-family="Segoe UI, Helvetica, Arial, sans-serif" ' +
      'font-size="14px" font-weight="bold" x="' + (155 + w / 2) + '" y="27" ' +
      'text-anchor="middle">' + mot + "</text>" +
      "</svg>"
    );
  }

  var css =
    "#marque-inerweb{display:flex;align-items:center;gap:7px;opacity:.55;" +
    "user-select:none;font-family:'Segoe UI',Calibri,Arial,sans-serif;" +
    "font-size:11px;color:#637285;background:none;border:0;white-space:nowrap}" +
    "#marque-inerweb svg{display:block;flex:none}" +
    /* PIÈGE MESURÉ (18/08) : ajouter la licence à côté du logo fait passer le
       filigrane fixe de 200×24 à 420×47 px — deux lignes — et il recouvre
       alors le texte du cours. En mode fixe la marque garde donc l'emprise
       qu'elle avait toujours eue : logo + « © inerWeb <année> », rien de plus.
       La licence sort là où il y a la place : en fin de document, et sur le
       papier — qui est justement l'exemplaire qui circule. */
    "#marque-inerweb .marque-lic,#marque-inerweb .marque-droits{display:none}" +
    /* `order` et pas l'ordre du DOM : referentiel.js accroche son badge de
       codes APRÈS coup (appendChild). Sans cela, en mode document, les codes
       du référentiel passeraient sous la mention de droits. La mention de
       droits ferme le bloc, toujours. */
    "#marque-inerweb .marque-droits{order:9;flex-basis:100%;line-height:1.5;" +
    "font-size:10.5px;color:#7a8797;white-space:normal}" +
    "#marque-inerweb .marque-proto{font-weight:bold;color:#c9451a}" +
    /* mode fixe : la page ne défile pas, rien à recouvrir */
    "#marque-inerweb.marque-fixe{position:fixed;left:12px;bottom:8px;z-index:40;" +
    "pointer-events:none}" +
    /* mode hôte : la page décide du placement (voir sa feuille) */
    "#marque-inerweb.marque-hebergee{position:absolute;pointer-events:none}" +
    /* mode document : en fin de flux, sous un filet — ne recouvre rien */
    "#marque-inerweb.marque-document{position:static;margin:2.4em auto .6em;" +
    "padding-top:.7em;border-top:1px solid rgba(27,58,99,.16);max-width:1100px;" +
    "opacity:.62;flex-wrap:wrap}" +
    "#marque-inerweb.marque-document .marque-lic{display:inline}" +
    "#marque-inerweb.marque-document .marque-droits{display:block}" +
    "@media (max-width:560px){#marque-inerweb{font-size:0;gap:0}" +
    "#marque-inerweb svg{width:86px;height:18px}" +
    "#marque-inerweb.marque-document{font-size:10px;gap:6px}" +
    "#marque-inerweb.marque-document .marque-droits{font-size:9.5px}}" +
    /* à l'impression : fixe, donc répétée en pied de chaque feuille, ET
       mention longue visible — c'est la feuille papier qui circule et
       qui doit porter la preuve. */
    "@media print{#marque-inerweb{display:flex!important;position:fixed;" +
    "left:0;right:0;bottom:0;margin:0;padding:2mm 4mm 0;border:0;opacity:.85;" +
    "color:#444;max-width:none;flex-wrap:wrap}" +
    "#marque-inerweb .marque-lic{display:inline!important}" +
    "#marque-inerweb .marque-droits{display:block!important;color:#555;" +
    "font-size:7.5pt}}";

  var el = null;

  /* PIÈGE MESURÉ (10/08) : la marque en flux AJOUTE ~80 px au document.
     Sur un cours calibré en 100dvh, elle crée donc elle-même le défilement
     qu'elle croit détecter — puis se range sous la ligne de flottaison,
     invisible. On mesure donc TOUJOURS en mode fixe (hors flux, aucun
     effet sur la hauteur), et on ne bascule en flux qu'ensuite. */
  function modeVoulu() {
    if (document.querySelector("[data-marque-hote]")) return "marque-hebergee";
    var avant = el ? el.className : "";
    if (el) el.className = "marque-fixe";
    var docH = document.documentElement.scrollHeight;
    var vueH = window.innerHeight || document.documentElement.clientHeight;
    if (el) el.className = avant;
    return docH > vueH + 4 ? "marque-document" : "marque-fixe";
  }

  function appliquerMode() {
    if (!el) return;
    var m = modeVoulu();
    if (el.className === m) return;
    el.className = m;
    // En mode document la marque doit être le DERNIER élément du flux ;
    // en mode fixe sa place dans le DOM n'a aucune importance.
    if (m !== "marque-hebergee" && el.parentElement !== document.body) {
      document.body.appendChild(el);
    }
  }

  function poser() {
    if (document.getElementById("marque-inerweb")) return;
    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    el = document.createElement("div");
    el.id = "marque-inerweb";
    el.setAttribute("aria-hidden", "true");

    var proto = R.prototype
      ? '<span class="marque-proto">Prototype — document de travail, ' +
        "retours bienvenus</span> · "
      : "";
    el.innerHTML =
      dessinerLogo(R.cartouche) +
      "<span>© inerWeb " + ANNEE +
      '<span class="marque-lic"> · ' + LIC.court + "</span></span>" +
      '<span class="marque-droits">' + proto +
      "© inerWeb " + ANNEE + " — F. Henninot · " + LIC.long + "</span>";

    var hote = document.querySelector("[data-marque-hote]");
    el.className = hote ? "marque-hebergee" : "marque-fixe"; // hors flux d'abord
    (hote || document.body).appendChild(el);
    appliquerMode();

    // Le zoom du bouton « Aa » rend une page fixe défilante : on suit.
    var minuteur = null;
    window.addEventListener("resize", function () {
      clearTimeout(minuteur);
      minuteur = setTimeout(appliquerMode, 150);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", poser);
  } else {
    poser();
  }
})();
