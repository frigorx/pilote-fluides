/* inerWeb — détendeur thermostatique : la vue 3D dans le module.
   Colle entre app.js et le moteur 3D du site (electrorezo/stations/_commun/3d/, jamais modifié).

     DETENDEUR_3D.possible()                    vrai si la 3D peut s'ouvrir (pas en file://, WebGL présent)
     DETENDEUR_3D.monter(hote, ecran, options)  pose la vue dans `hote` ; ecran : reconnaitre | pieces | debit | forces | boucle
     DETENDEUR_3D.annuler(hote)                 l'élève a changé d'écran : un montage en attente ne doit plus rien poser

   options : { repli() : la 3D ne peut pas s'ouvrir → l'appelant remet le dessin 2D ;
               controles : l'élément où poser les boutons du module (écrans « débit » et « boucle ») ;
               classeBouton : leur classe ; impression : le dessin 2D qui sort sur papier }

   Pourquoi pas de 3D en file:// : le navigateur refuse alors le module Three.js (chargé par le moteur depuis un CDN).
   Le module reste complet sans la 3D : c'est le dessin SVG d'avant qui s'affiche (repli). */
(function () {
  "use strict";
  const SRC = (document.currentScript && document.currentScript.src) || "";
  const CLE = "?v=20261006-1";
  const adresse = (relatif) => new URL(relatif, SRC || location.href).href;
  const MOTEUR = adresse("../../../../../electrorezo/stations/_commun/3d/electro3d.js") + CLE;
  const MODELE = adresse("detendeur-3d.js") + CLE;

  let webglOk = null;
  function possible() {
    if (webglOk === null) {
      webglOk = false;
      try {
        if (location.protocol !== "file:" && window.customElements && window.IntersectionObserver) {
          const toile = document.createElement("canvas");
          webglOk = !!(toile.getContext("webgl2") || toile.getContext("webgl"));
        }
      } catch (_) { webglOk = false; }
    }
    return webglOk;
  }

  const charger = (src) => new Promise((ok, ko) => {
    const s = document.createElement("script");
    s.src = src; s.onload = ok;
    s.onerror = () => ko(new Error("chargement impossible : " + src));
    document.head.appendChild(s);
  });
  let promesse = null;
  function preparer() {
    if (!promesse) {
      promesse = (async () => {
        if (!window.Electro3D) await charger(MOTEUR);
        if (!window.Electro3D.infos("detendeurThermo")) await charger(MODELE);
      })().catch((erreur) => { promesse = null; throw erreur; });
    }
    return promesse;
  }

  /* Le filigrane inerWeb (charte R9) : trois exemplaires pâles, dont un au centre, par-dessus la scène.
     Même dessin que celui des vidéos (jouerezo) : logo + « by inerweb.fr ». Il ne reçoit aucun clic. */
  function filigrane() {
    const exemplaire = (x, y) => `<g transform="translate(${x} ${y}) rotate(-12) scale(.75) translate(-200 -66)">
      <text x="0" y="80" font-size="56" fill="#1b3a63">❄️</text>
      <text x="76" y="75" font-size="52" font-weight="700" fill="#1b3a63" font-family="Trebuchet MS, Trebuchet, sans-serif">iner</text>
      <text x="171" y="75" font-size="52" fill="#1b3a63" font-family="Segoe Script, Brush Script MT, cursive">Web</text>
      <line x1="76" x2="276" y1="80" y2="80" stroke="#e8914a" stroke-width="4"/>
      <rect x="281" y="8" rx="7" width="120" height="38" fill="#e8914a"/>
      <text x="341" y="34" text-anchor="middle" font-size="22" font-weight="700" fill="#fff" font-family="Segoe UI, Helvetica, Arial, sans-serif">.fr</text>
      <text x="76" y="122" font-size="30" font-weight="700" fill="#1b3a63" font-family="Trebuchet MS, Trebuchet, sans-serif">by inerweb.fr</text></g>`;
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("class", "v3d-filigrane");
    s.setAttribute("viewBox", "0 0 1000 500");
    s.setAttribute("preserveAspectRatio", "xMidYMid slice");
    s.setAttribute("aria-hidden", "true");
    s.innerHTML = `<g opacity=".1">${exemplaire(500, 250)}${exemplaire(150, 420)}${exemplaire(850, 90)}</g>`;
    return s;
  }

  /* Les boutons des écrans « débit » et « boucle » vivent dans la barre de commandes du module (comme avant) ;
     ils pilotent le moteur et recopient l'état de ses boutons (une étape peut les remettre à zéro). */
  const COMMANDES = {
    debit: { id: "ouverture", attribut: "data-opening", boutons: [["small", "small", "Faible ouverture"], ["modulating", "modulating", "Modulation"], ["large", "large", "Forte ouverture"]] },
    boucle: { id: "sortie", attribut: "data-regulation", boutons: [["chaud", "hot", "La sortie chauffe"], ["froid", "cold", "La sortie refroidit"]] }
  };
  function controlesModule(e, ecran, o) {
    const def = COMMANDES[ecran];
    if (!def || !o.controles) return;
    const classe = o.classeBouton || "choice-button";
    o.controles.innerHTML = def.boutons.map((d) => `<button type="button" class="${classe}" ${def.attribut}="${d[1]}" data-valeur="${d[0]}" aria-pressed="false">${d[2]}</button>`).join("");
    const cmd = e.querySelector(".e3d-commandes");
    const miroir = () => {
      o.controles.querySelectorAll("[data-valeur]").forEach((b) => {
        const eb = cmd && cmd.querySelector('[data-val="' + b.dataset.valeur + '"]');
        const actif = !!eb && eb.getAttribute("aria-pressed") === "true";
        b.classList.toggle("active", actif); b.setAttribute("aria-pressed", String(actif));
      });
    };
    o.controles.querySelectorAll("[data-valeur]").forEach((b) => b.addEventListener("click", () => { e.agir(def.id, b.dataset.valeur); miroir(); }));
    if (cmd && window.MutationObserver) new MutationObserver(miroir).observe(cmd, { attributes: true, subtree: true, attributeFilter: ["aria-pressed"] });
    miroir();
  }

  function monter(hote, ecran, o) {
    o = o || {};
    const jeton = {};
    hote.__jeton3d = jeton;
    hote.innerHTML = '<p class="v3d-attente">Ouverture de la vue 3D…</p>';
    const abandon = () => { if (hote.__jeton3d === jeton && o.repli) { hote.__jeton3d = null; o.repli(); } };
    preparer().then(() => {
      if (hote.__jeton3d !== jeton || !hote.isConnected) return;
      hote.innerHTML = "";
      const e = document.createElement("electro-3d");
      e.setAttribute("modele", "detendeurThermo");
      e.setAttribute("mode", ecran === "reconnaitre" ? "decouvrir" : "comprendre");
      e.setAttribute("options", JSON.stringify({ ecran }));
      e.dataset.prog = ecran;
      e.addEventListener("e3d-repli", abandon);
      e.addEventListener("e3d-pret", () => {
        if (hote.__jeton3d !== jeton) return;
        if (ecran === "forces" || ecran === "boucle") e.allerEtape(0);
        controlesModule(e, ecran, o);
      });
      hote.appendChild(e);
      const scene = e.querySelector(".e3d-scene");
      if (scene) scene.appendChild(filigrane());
      if (o.impression) {
        const p = document.createElement("div");
        p.className = "v3d-impression"; p.setAttribute("aria-hidden", "true"); p.innerHTML = o.impression;
        hote.appendChild(p);
      }
    }).catch(abandon);
  }

  function annuler(hote) { if (hote) hote.__jeton3d = null; }

  window.DETENDEUR_3D = { possible, monter, annuler };
})();
