/* =====================================================================
   LE BÂTIMENT RÉGLEMENTAIRE — composant réutilisable
   Porte d'entrée du réseau Législation d'inerWeb.

     import { monterBatiment } from "./batiment3d/batiment.js";
     monterBatiment(document.getElementById("batiment3d"), { urlPlan: "#carte" });

   Ce que fait le composant :
   - une maquette 3D (Three.js, module ES épinglé, chargé SEULEMENT quand
     la zone devient visible) : bâtiment en coupe, onze zones cliquables,
     chacune rattachée à une sous-ligne du plan ;
   - un panneau latéral (nom, phrase, stations, « Voir sur le plan ») ;
   - la même chose en liste de boutons sous la maquette (accessibilité,
     et seule porte si la 3D est indisponible : le plan SVG reste la vraie
     navigation, la 3D est un plus) ;
   - les sceaux dorés des sous-lignes entièrement tamponnées, lus dans
     localStorage['inerweb-legislation-tampons'] (tableau de slugs, ou objet
     { slug: ... } comme le pose moteur-legislation/missions.js).

   Options (toutes facultatives) :
     urlPlan     lien de « Voir sur le plan »            (défaut "#carte")
     auPlan(id)  fonction appelée à la place du lien     (défaut : aucune)
     donnees     objet déjà lu de zones.json             (défaut : fetch)
     urlZones    adresse de zones.json                   (défaut : à côté de ce fichier)
     racine      adresse du dossier legislation/         (défaut : dossier parent de ce fichier)
     three       adresse du module Three.js              (défaut : jsDelivr, version épinglée)
     rotationAuto  false pour ne jamais tourner seul
   ===================================================================== */

const THREE_URL = "https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.min.js";
const CLE_TAMPONS = "inerweb-legislation-tampons";

/* Les onze zones du bâtiment <-> les onze sous-lignes du plan. */
const LIEUX = {
  "regl-acoustique": "PAC en toiture et voisinage",
  "regl-fluidique":  "Local technique : groupe frigorifique, bouteilles",
  "regl-desp":       "Local technique : réservoirs, soupapes",
  "regl-electrique": "Tableau électrique",
  "regl-incendie":   "Escalier, désenfumage, clapets, sprinkler",
  "regl-thermique":  "Enveloppe : isolation, vitrages, protections solaires",
  "regl-certifs":    "Bureau du chargé d'affaires : dossiers, certificats",
  "regl-travail":    "Salle de pause et planning",
  "secu-risques":    "Échafaudage et nacelle contre la façade",
  "secu-dechets":    "Aire de déchets au pied du bâtiment",
  "secu-impact":     "Ciel et cycle du carbone"
};
const ORDRE = Object.keys(LIEUX);

const CSS = `
.b3d{--bleu:#1b3a63;--orange:#e8914a;--txt:#10233c;--mut:#5a6b7d;--carte:#fffdf8;--ligne:#d6dee7;--or:#d4a017;
  position:relative;display:grid;grid-template-columns:1fr;font-family:Calibri,'Segoe UI',system-ui,Arial,sans-serif;color:var(--txt);text-align:left}
.b3d *{box-sizing:border-box}
.b3d-scene{grid-area:1/1;position:relative;overflow:hidden;border-radius:14px;border:1px solid var(--ligne);
  background:radial-gradient(ellipse 80% 70% at 50% 34%,#ffffff 0%,#f8f3e8 55%,#ece5d5 100%);
  aspect-ratio:16/10;min-height:440px;max-height:88vh;touch-action:pan-y;user-select:none;-webkit-user-select:none;outline:none}
.b3d-scene:focus-visible{box-shadow:0 0 0 3px var(--orange)}
.b3d-canvas{position:absolute;inset:0;width:100%;height:100%;display:block;cursor:grab;touch-action:pan-y}
.b3d-canvas.b3d-vise{cursor:pointer}
.b3d-canvas.b3d-tire{cursor:grabbing}
.b3d-etat{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;
  font:bold 16px/1.4 'Trebuchet MS',Calibri,Arial,sans-serif;color:var(--bleu);pointer-events:none;transition:opacity .5s}
.b3d-etat svg{width:150px;height:auto;opacity:.5}
.b3d[data-etat=pret] .b3d-etat{opacity:0}
.b3d-marq{position:absolute;left:0;top:0;width:28px;height:28px;margin:-14px 0 0 -14px;border-radius:50%;background:var(--carte);
  border:3px solid var(--c);display:flex;align-items:center;justify-content:center;font-size:14px;line-height:1;pointer-events:none;
  box-shadow:0 2px 8px rgba(16,35,60,.28);transition:opacity .25s,scale .2s;will-change:translate;opacity:0}
.b3d[data-etat=pret] .b3d-marq{opacity:.95}
.b3d-marq.on{scale:1.28;background:var(--c);z-index:3}
.b3d-marq.sel{scale:1.2;box-shadow:0 0 0 4px color-mix(in srgb,var(--c) 30%,transparent),0 2px 8px rgba(16,35,60,.28)}
.b3d-marq .b3d-sc{position:absolute;right:-7px;top:-8px;width:15px;height:15px;border-radius:50%;background:var(--or);border:2px solid #fff6d2;font-size:8px;display:none;align-items:center;justify-content:center;color:#5a3d00}
.b3d-marq.tamp .b3d-sc{display:flex}
.b3d-lien{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible}
.b3d-lien line{stroke:var(--c);stroke-width:2;stroke-linecap:round}
.b3d-lien circle{fill:var(--c)}
.b3d-eti{position:absolute;left:0;top:0;max-width:calc(100% - 24px);padding:9px 14px 10px 12px;border-radius:12px;background:var(--carte);
  border:2px solid var(--c);box-shadow:0 6px 20px rgba(16,35,60,.22);pointer-events:none;z-index:4;opacity:0;transition:opacity .15s;will-change:transform;width:max-content}
.b3d-eti.vu{opacity:1}
.b3d-eti b{display:block;font:bold 16px/1.25 'Trebuchet MS',Calibri,Arial,sans-serif;color:var(--bleu)}
.b3d-eti span{display:block;font-size:14px;line-height:1.3;color:var(--mut);margin-top:2px}
.b3d-outils{position:absolute;left:12px;bottom:12px;display:flex;gap:8px;z-index:5}
.b3d-outils button{width:44px;height:44px;border-radius:12px;border:1px solid var(--ligne);background:rgba(255,253,248,.94);color:var(--bleu);
  font:bold 20px/1 'Trebuchet MS',Calibri,Arial,sans-serif;cursor:pointer;box-shadow:0 2px 8px rgba(16,35,60,.14);display:flex;align-items:center;justify-content:center;padding:0}
.b3d-outils button:hover{border-color:var(--orange);color:var(--orange)}
.b3d-outils button[aria-pressed=true]{background:var(--bleu);color:#fff;border-color:var(--bleu)}
.b3d button:focus-visible,.b3d a:focus-visible{outline:3px solid var(--orange);outline-offset:2px}
.b3d-invite{position:absolute;right:14px;bottom:14px;margin:0;max-width:52%;text-align:right;font-size:15px;line-height:1.35;color:var(--mut);
  background:rgba(255,253,248,.88);padding:6px 12px;border-radius:10px;pointer-events:none;transition:opacity .6s;z-index:2}
.b3d-invite.cache{opacity:0}
.b3d-pan{grid-area:1/1;justify-self:end;align-self:stretch;width:min(370px,92%);margin:10px;z-index:6;background:var(--carte);border:1px solid var(--ligne);
  border-radius:14px;box-shadow:0 10px 34px rgba(16,35,60,.24);display:flex;flex-direction:column;overflow:hidden;min-height:0;contain:size;
  animation:b3d-entree .28s ease-out}
.b3d-pan[hidden]{display:none}
@keyframes b3d-entree{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:none}}
.b3d-pan header{position:relative;padding:12px 52px 10px 18px;background:var(--c);color:#fff}
.b3d-mere{margin:0 0 4px;font-size:12px;letter-spacing:.7px;font-weight:bold;opacity:.9}
.b3d-pan h3{margin:0;font:bold 22px/1.15 'Trebuchet MS',Calibri,Arial,sans-serif;outline:none}
.b3d-phrase{margin:2px 0 0;font-size:16px;opacity:.95}
.b3d-fermer{position:absolute;right:8px;top:8px;width:44px;height:44px;border-radius:50%;border:0;background:rgba(255,255,255,.2);color:#fff;font-size:26px;line-height:1;cursor:pointer}
.b3d-fermer:hover{background:rgba(255,255,255,.36)}
.b3d-corps{padding:10px 18px 6px;overflow:auto;flex:1;min-height:0}
.b3d-pied{padding:8px 18px 12px;border-top:1px solid var(--ligne);background:var(--carte)}
.b3d-lieu{margin:0 0 6px;font-size:15px;line-height:1.35;color:var(--mut)}
.b3d-lieu b{color:var(--txt)}
.b3d-prog{margin:0 0 8px;font-size:15px;display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.b3d-prog b{font-size:16px}
.b3d-sceau{display:inline-flex;align-items:center;gap:6px;background:#fff6d2;border:1px solid var(--or);color:#6b4a00;border-radius:999px;padding:2px 12px 2px 4px;font-weight:bold;font-size:14px}
.b3d-sceau i{font-style:normal;width:22px;height:22px;border-radius:50%;background:var(--or);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:12px}
.b3d-stations{list-style:none;margin:0 0 6px;padding:0;display:grid;gap:6px}
.b3d-stations li{border:1px solid var(--ligne);border-left:5px solid var(--c);border-radius:10px;background:#fff}
.b3d-stations a,.b3d-stations .prep{display:flex;flex-direction:column;padding:5px 12px;line-height:1.3;text-decoration:none;color:var(--txt);min-height:44px;justify-content:center;position:relative}
.b3d-stations a b{color:var(--bleu);text-decoration:underline;text-decoration-thickness:1.5px;text-underline-offset:3px}
.b3d-stations a:hover{background:#f5f8fb}
.b3d-stations a:hover b{color:var(--orange)}
.b3d-stations .prep{color:var(--mut)}
.b3d-stations .prep b{font-weight:normal}
.b3d-stations small{font-size:14px;color:var(--mut)}
.b3d-stations .tp{position:absolute;right:10px;top:50%;translate:0 -50%;width:22px;height:22px;border-radius:50%;background:var(--or);color:#fff;font-size:12px;display:flex;align-items:center;justify-content:center}
.b3d-stations li.ferme{background:#fbfaf7}
.b3d-plan{display:inline-flex;align-items:center;gap:8px;min-height:46px;padding:10px 18px;border-radius:999px;background:var(--bleu);color:#fff;text-decoration:none;font:bold 16px/1 'Trebuchet MS',Calibri,Arial,sans-serif}
.b3d-plan:hover{background:var(--orange);color:#fff}
.b3d-liste{grid-area:3/1;margin-top:14px}
.b3d-liste h4{margin:0 0 8px;font:bold 16px/1.3 'Trebuchet MS',Calibri,Arial,sans-serif;color:var(--bleu)}
.b3d-liste ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px}
.b3d-bouton{width:100%;min-height:52px;display:flex;align-items:center;gap:10px;text-align:left;padding:8px 12px;border-radius:12px;border:1px solid var(--ligne);
  border-left:6px solid var(--c);background:var(--carte);color:var(--txt);cursor:pointer;font:inherit}
.b3d-bouton:hover{border-color:var(--c);background:#fff}
.b3d-bouton[aria-pressed=true]{background:var(--c);color:#fff;border-color:var(--c)}
.b3d-bouton[aria-pressed=true] small{color:#fff;opacity:.92}
.b3d-bouton .ico{font-size:22px;flex:none;width:30px;text-align:center}
.b3d-bouton b{display:block;font-size:16px;line-height:1.2}
.b3d-bouton small{display:block;font-size:14px;line-height:1.25;color:var(--mut)}
.b3d-bouton .sc{margin-left:auto;flex:none;width:22px;height:22px;border-radius:50%;background:var(--or);color:#fff;font-size:12px;display:none;align-items:center;justify-content:center}
.b3d-bouton.tamp .sc{display:flex}
.b3d-note{grid-area:2/1;margin:12px 0 0;padding:12px 16px;border-radius:12px;background:#fff6e6;border:1px solid #f0d9ae;font-size:16px}
.b3d-note[hidden]{display:none}
.b3d-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.b3d[data-etat=repli] .b3d-scene{display:none}
.b3d[data-etat=repli] .b3d-note{grid-area:1/1;margin:0 0 4px}
.b3d[data-etat=repli] .b3d-liste{grid-area:2/1}
.b3d[data-etat=repli] .b3d-pan{grid-area:3/1;justify-self:stretch;width:auto;margin:12px 0 0;align-self:start;max-width:560px;contain:none}
@media (max-width:900px){
  .b3d-scene{aspect-ratio:4/3;min-height:0;max-height:78vh}
  .b3d-pan{grid-area:2/1;justify-self:stretch;width:auto;margin:12px 0 0;align-self:start;contain:none}
  .b3d-note{grid-area:3/1}
  .b3d-liste{grid-area:4/1}
  .b3d-invite{left:12px;right:12px;top:10px;bottom:auto;max-width:none;text-align:center}
  .b3d-marq{width:22px;height:22px;margin:-11px 0 0 -11px;font-size:11px;border-width:2px}
  .b3d-marq .b3d-sc{width:12px;height:12px;font-size:7px;right:-6px;top:-6px}
  .b3d-outils button{width:42px;height:42px}
}
@media (max-width:560px){
  .b3d-scene{aspect-ratio:4/5}
  .b3d-invite{font-size:14px}
}
@media (prefers-reduced-motion:reduce){.b3d-pan{animation:none}.b3d-marq,.b3d-eti{transition:none}}
`;

function esc(v) {
  return String(v).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
function slug(href) { return String(href).replace(/\/+$/, "").split("/").pop(); }
/* Les tampons : soit un tableau de slugs (brief), soit l'objet { slug: {...} } que posent
   les missions des stations (moteur-legislation/missions.js). Les deux sont lus. */
function lireTampons() {
  try {
    const v = JSON.parse(localStorage.getItem(CLE_TAMPONS) || "null");
    if (Array.isArray(v)) return v.map(String);
    if (v && typeof v === "object") return Object.keys(v).filter(function (k) { return v[k]; });
    return [];
  } catch (e) { return []; }
}
function sansWebGL() {
  try {
    const c = document.createElement("canvas");
    return !(c.getContext("webgl2") || c.getContext("webgl"));
  } catch (e) { return true; }
}

let cssPose = false;
function poserCss() {
  if (cssPose) return;
  cssPose = true;
  const s = document.createElement("style");
  s.id = "b3d-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function monterBatiment(hote, options) {
  options = options || {};
  poserCss();
  const ici = import.meta.url;
  const racine = options.racine || new URL("../", ici).href;
  const urlZones = options.urlZones || new URL("zones.json", ici).href;
  const urlPlan = options.urlPlan || "#carte";
  const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 900px)");

  const etat = { donnees: null, lignes: {}, tampons: lireTampons(), selection: null, survol: null,
                 m: null, actif: false, detruit: false };

  hote.innerHTML = "";
  hote.classList.add("b3d");
  hote.setAttribute("data-etat", "attente");
  hote.innerHTML =
    '<div class="b3d-scene" tabindex="0" role="group" aria-label="Maquette 3D du bâtiment réglementaire : onze zones, chacune rattachée à une sous-ligne du réseau. Les mêmes zones existent en liste de boutons sous la maquette. Flèches : tourner, plus et moins : zoomer.">' +
      '<canvas class="b3d-canvas" aria-hidden="true"></canvas>' +
      '<div class="b3d-etat" role="status"><svg viewBox="0 0 120 90" aria-hidden="true"><g fill="none" stroke="#1b3a63" stroke-width="2.2" stroke-linejoin="round">' +
        '<rect x="14" y="20" width="76" height="52"/><path d="M14 36h76M14 54h76M40 20v52M8 76h108"/><rect x="92" y="34" width="14" height="38"/><path d="M30 12h24v8H30z"/></g></svg>' +
        '<span>Construction de la maquette…</span></div>' +
      '<svg class="b3d-lien" aria-hidden="true"><line x1="0" y1="0" x2="0" y2="0" opacity="0"/><circle r="4" cx="0" cy="0" opacity="0"/></svg>' +
      '<div class="b3d-marqueurs" aria-hidden="true"></div>' +
      '<div class="b3d-eti" aria-hidden="true"></div>' +
      '<div class="b3d-outils" role="toolbar" aria-label="Vue de la maquette">' +
        '<button type="button" data-a="plus" aria-label="Zoomer">+</button>' +
        '<button type="button" data-a="moins" aria-label="Dézoomer">−</button>' +
        '<button type="button" data-a="reset" aria-label="Revenir à la vue d\'ensemble">⟲</button>' +
        '<button type="button" data-a="tourne" aria-pressed="' + (reduit || options.rotationAuto === false ? "false" : "true") + '" aria-label="Rotation automatique">⟳</button>' +
      '</div>' +
      '<p class="b3d-invite">Glissez pour tourner · touchez une zone</p>' +
    '</div>' +
    '<aside class="b3d-pan" hidden aria-label="Détail de la zone choisie"></aside>' +
    '<p class="b3d-note" hidden></p>' +
    '<div class="b3d-liste"><h4>Les onze zones, en liste</h4><ul></ul></div>' +
    '<p class="b3d-sr" aria-live="polite"></p>';

  const $ = function (s) { return hote.querySelector(s); };
  const scene = $(".b3d-scene"), canvas = $(".b3d-canvas"), pan = $(".b3d-pan"), note = $(".b3d-note");
  const etiquette = $(".b3d-eti"), lienSvg = $(".b3d-lien"), invite = $(".b3d-invite");
  const marqueurs = $(".b3d-marqueurs"), liste = $(".b3d-liste ul"), annonce = $(".b3d-sr");

  /* ---------------------------------------------------------------- données */
  function ligneDe(id) { return etat.lignes[id]; }
  function estTamponnee(l) {
    return l && l.stations.length > 0 && l.stations.every(function (s) {
      return s.href && etat.tampons.indexOf(slug(s.href)) >= 0;
    });
  }
  function lien(href) { return new URL(href, racine).href; }

  function construireListe() {
    liste.innerHTML = "";
    ORDRE.forEach(function (id) {
      const l = ligneDe(id);
      if (!l) return;
      const li = document.createElement("li");
      li.innerHTML = '<button type="button" class="b3d-bouton" data-zone="' + id + '" style="--c:' + esc(l.couleur) + '" aria-pressed="false">' +
        '<span class="ico" aria-hidden="true">' + esc(l.ico) + '</span><span><b>' + esc(l.nom) + '</b><small>' + esc(LIEUX[id]) + '</small></span>' +
        '<span class="sc" aria-hidden="true">★</span></button>';
      liste.appendChild(li);
    });
    ORDRE.forEach(function (id) {
      const l = ligneDe(id);
      if (!l) return;
      const m = document.createElement("div");
      m.className = "b3d-marq";
      m.dataset.zone = id;
      m.style.setProperty("--c", l.couleur);
      m.innerHTML = '<span aria-hidden="true">' + esc(l.ico) + '</span><span class="b3d-sc" aria-hidden="true">★</span>';
      marqueurs.appendChild(m);
    });
    majEtatBoutons();
  }
  function majEtatBoutons() {
    liste.querySelectorAll(".b3d-bouton").forEach(function (b) {
      const id = b.dataset.zone, l = ligneDe(id);
      b.setAttribute("aria-pressed", String(etat.selection === id));
      b.classList.toggle("tamp", !!estTamponnee(l));
    });
    marqueurs.querySelectorAll(".b3d-marq").forEach(function (m) {
      const id = m.dataset.zone;
      m.classList.toggle("sel", etat.selection === id);
      m.classList.toggle("on", etat.survol === id);
      m.classList.toggle("tamp", !!estTamponnee(ligneDe(id)));
    });
  }

  function afficherPanneau(id) {
    const l = ligneDe(id);
    if (!l) return;
    const ouvertes = l.stations.filter(function (s) { return s.href; }).length;
    const tamponnee = estTamponnee(l);
    const items = l.stations.map(function (s) {
      if (s.href) {
        const ok = etat.tampons.indexOf(slug(s.href)) >= 0;
        return '<li><a href="' + esc(lien(s.href)) + '"><b>' + esc(s.nom) + '</b><small>' + esc(s.sous) + '</small>' +
          (ok ? '<span class="tp" title="Station tamponnée" aria-label="Station tamponnée">★</span>' : "") + "</a></li>";
      }
      return '<li class="ferme"><span class="prep"><b>' + esc(s.nom) + '</b><small>' + esc(s.sous) + ' · en préparation</small></span></li>';
    }).join("");
    pan.style.setProperty("--c", l.couleur);
    pan.innerHTML =
      '<header><p class="b3d-mere">' + esc(l.mere) + '</p><h3 tabindex="-1"><span aria-hidden="true">' + esc(l.ico) + '</span> ' + esc(l.nom) + '</h3>' +
      '<p class="b3d-phrase">' + esc(l.sous) + '</p><button type="button" class="b3d-fermer" aria-label="Fermer le détail">×</button></header>' +
      '<div class="b3d-corps"><p class="b3d-lieu">Dans la maquette : <b>' + esc(LIEUX[id]) + '</b></p>' +
      '<p class="b3d-prog"><b>' + ouvertes + ' station' + (ouvertes > 1 ? "s" : "") + ' ouverte' + (ouvertes > 1 ? "s" : "") + ' sur ' + l.stations.length + '</b>' +
      (tamponnee ? '<span class="b3d-sceau"><i aria-hidden="true">★</i>Sous-ligne tamponnée</span>' : "") + '</p>' +
      '<ul class="b3d-stations">' + items + '</ul></div>' +
      '<footer class="b3d-pied"><a class="b3d-plan" href="' + esc(urlPlan) + '" data-ligne="' + id + '">Voir sur le plan <span aria-hidden="true">→</span></a></footer>';
    pan.hidden = false;
    pan.style.animation = "none"; void pan.offsetWidth; pan.style.animation = "";
  }

  /* ------------------------------------------------------------ sélection */
  function selectionner(id, opts) {
    opts = opts || {};
    if (!ligneDe(id)) return;
    etat.selection = id;
    afficherPanneau(id);
    majEtatBoutons();
    annonce.textContent = "Zone choisie : " + ligneDe(id).nom + ". " + LIEUX[id];
    if (opts.focus) { const h = pan.querySelector("h3"); if (h) h.focus({ preventScroll: true }); }
    if ((mobile.matches || etat.repli) && opts.defiler !== false && !pan.hidden) {
      pan.scrollIntoView({ block: "nearest", behavior: reduit ? "auto" : "smooth" });
    }
    if (etat.m) etat.m.focus(id);
    hote.dispatchEvent(new CustomEvent("b3d:selection", { detail: { id: id } }));
  }
  function fermer() {
    if (!etat.selection) return;
    etat.selection = null;
    pan.hidden = true;
    majEtatBoutons();
    if (etat.m) etat.m.focus(null);
    hote.dispatchEvent(new CustomEvent("b3d:selection", { detail: { id: null } }));
  }

  liste.addEventListener("click", function (e) {
    const b = e.target.closest(".b3d-bouton");
    if (!b) return;
    if (etat.selection === b.dataset.zone) fermer(); else selectionner(b.dataset.zone, { focus: true });
  });
  /* survoler ou cibler un bouton de la liste allume la zone dans la maquette */
  function depuisListe(e, id) {
    if (!etat.m) return;
    const b = e.target.closest(".b3d-bouton");
    etat.m.survoler(id === null ? null : (b && b.dataset.zone));
  }
  liste.addEventListener("pointerover", function (e) { if (e.pointerType === "mouse") depuisListe(e); });
  liste.addEventListener("pointerout", function (e) { if (e.pointerType === "mouse") depuisListe(e, null); });
  liste.addEventListener("focusin", function (e) { depuisListe(e); });
  liste.addEventListener("focusout", function (e) { depuisListe(e, null); });
  pan.addEventListener("click", function (e) {
    if (e.target.closest(".b3d-fermer")) { fermer(); return; }
    const a = e.target.closest(".b3d-plan");
    if (a && typeof options.auPlan === "function") { e.preventDefault(); options.auPlan(a.dataset.ligne); }
  });
  hote.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && etat.selection) { fermer(); }
  });
  window.addEventListener("storage", surStockage);
  function surStockage(e) { if (e.key === CLE_TAMPONS || e.key === null) majTampons(); }
  function majTampons() {
    etat.tampons = lireTampons();
    majEtatBoutons();
    if (etat.selection) afficherPanneau(etat.selection);
    if (etat.m) etat.m.sceaux(etat.tampons.length ? sceauxActifs() : []);
  }
  function sceauxActifs() { return ORDRE.filter(function (id) { return estTamponnee(ligneDe(id)); }); }

  /* --------------------------------------------------------- chargement */
  const pret = (options.donnees ? Promise.resolve(options.donnees) :
    fetch(urlZones).then(function (r) { if (!r.ok) throw new Error("zones.json : " + r.status); return r.json(); }))
    .then(function (d) {
      if (etat.detruit) return;
      etat.donnees = d;
      d.lignes.forEach(function (l) { etat.lignes[l.id] = l; });
      construireListe();
    }).catch(function (err) {
      console.warn("[batiment3d]", err);
      etat.repli = true;
      hote.setAttribute("data-etat", "repli");
      note.hidden = false;
      note.innerHTML = "Les zones n'ont pas pu être chargées. <a href=\"" + esc(urlPlan) + "\">Le plan du réseau</a> reste la navigation complète.";
    });

  function repli(raison) {
    if (etat.detruit) return;
    if (raison) console.warn("[batiment3d] repli sans 3D :", raison);
    etat.repli = true;
    hote.setAttribute("data-etat", "repli");
    note.hidden = false;
    note.innerHTML = "La maquette 3D n'est pas disponible sur cet appareil. Les onze zones restent accessibles ci-dessous, et <a href=\"" + esc(urlPlan) + "\">le plan du réseau</a> reste la navigation complète.";
  }

  let observateur = null;
  function surveillerVisibilite() {
    if (sansWebGL()) { pret.then(function () { repli("WebGL absent"); }); return; }
    if (!("IntersectionObserver" in window)) { demarrer3D(); return; }
    observateur = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (en) {
        etat.visible = en.isIntersecting;
        if (en.isIntersecting && !etat.charge) demarrer3D();
        if (etat.m) etat.m.visible(en.isIntersecting);
      });
    }, { rootMargin: "240px 0px" });
    observateur.observe(scene);
  }

  function demarrer3D() {
    etat.charge = true;
    Promise.all([pret, import(options.three || THREE_URL), import("./maquette.js")]).then(function (r) {
      if (etat.detruit || !etat.donnees) return;
      lancer(r[1], r[2]);
    }).catch(function (err) { repli(err); });
  }

  /* -------------------------------------------------------------- la 3D */
  function lancer(THREE, mod) {
    const defs = ORDRE.map(function (id) { return { id: id, lieu: LIEUX[id], couleur: ligneDe(id).couleur }; });
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch (e) { repli(e); return; }
    let pr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pr);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = false;

    const maq = mod.construireMaquette(THREE, defs);
    const sc = new THREE.Scene();
    sc.add(maq.groupe);
    const ciel = new THREE.HemisphereLight(0xffffff, 0xd9d0bd, 1.9);
    sc.add(ciel);
    const soleil = new THREE.DirectionalLight(0xfff1dc, 2.3);
    soleil.position.set(-18, 28, 24);
    soleil.castShadow = true;
    const petit = Math.min(screen.width, screen.height) < 700;
    soleil.shadow.mapSize.set(petit ? 1024 : 2048, petit ? 1024 : 2048);
    const sh = soleil.shadow.camera;
    sh.left = -30; sh.right = 30; sh.top = 26; sh.bottom = -22; sh.near = 5; sh.far = 90;
    soleil.shadow.bias = -0.0006; soleil.shadow.normalBias = 0.04; soleil.shadow.radius = 3;
    sc.add(soleil);

    /* distance de la caméra quand on regarde une zone (fraction de la vue d'ensemble) */
    const ZOOM = { "regl-fluidique": 0.42, "regl-desp": 0.42, "regl-electrique": 0.42, "regl-certifs": 0.42, "regl-travail": 0.42,
      "regl-incendie": 0.55, "regl-thermique": 0.6, "regl-acoustique": 0.72, "secu-risques": 0.55, "secu-dechets": 0.45, "secu-impact": 0.8 };
    const AZ = { "secu-risques": [25, 55], "secu-dechets": [20, 50], "regl-thermique": [26, 55], "regl-incendie": [-10, 24],
      "regl-desp": [-20, 22], "regl-acoustique": [-18, 26], "regl-fluidique": [-20, 22], "regl-electrique": [-16, 14], "regl-certifs": [-14, 14], "regl-travail": [-14, 20] };
    const FOYER = { "regl-acoustique": new THREE.Vector3(-3.5, 9.0, -1.5) };
    let dim = 0;
    const FOV = 28;
    const camera = new THREE.PerspectiveCamera(FOV, 16 / 9, 1, 400);

    /* ---- état de la caméra : cibles (ce que veut l'utilisateur) et valeurs affichées ---- */
    const D2R = Math.PI / 180;
    const CIBLE0 = new THREE.Vector3(0, 6.5, -0.8);
    const cam = {
      az: 24 * D2R, el: 11 * D2R, r: 46, tgt: CIBLE0.clone(),
      azC: 24 * D2R, elC: 11 * D2R, rC: 46, tgtC: CIBLE0.clone(),
      r0: 46, decal: 0, decalC: 0, auto: !(reduit || options.rotationAuto === false), dir: 1,
      derniere: 0
    };
    let W = 1, H = 1;

    function ajuster() {
      W = Math.max(1, scene.clientWidth); H = Math.max(1, scene.clientHeight);
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      const t = Math.tan(FOV * D2R / 2);
      const largeur = W / H < 1 ? 12.8 : 17.5, hauteur = 13;
      cam.r0 = Math.max(hauteur / t, largeur / (t * camera.aspect));
      if (!cam.pose) { cam.r = cam.rC = cam.r0; cam.pose = true; }
      cam.r = Math.min(Math.max(cam.r, cam.r0 * 0.28), cam.r0 * 1.25);
      majDecal(true);
      etat.sale = true;
    }
    function majDecal(direct) {
      const recouvre = !pan.hidden && !mobile.matches;
      cam.decal = recouvre ? Math.min(370, W * 0.92) / 2 : 0;
      if (direct) cam.decalC = cam.decal;
    }
    new ResizeObserver(ajuster).observe(scene);
    mobile.addEventListener("change", function () { majDecal(false); });

    /* ---- entrées : glisser (orbite), Maj/clic droit (déplacement), molette, pincement ---- */
    const pts = new Map();
    let pincement = 0, mvt = 0, t0 = 0, glisse = false, dernier = null;
    canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    canvas.addEventListener("pointerdown", function (e) {
      canvas.setPointerCapture(e.pointerId);
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY, bouton: e.button, maj: e.shiftKey });
      etat.actif = true; mvt = 0; t0 = performance.now(); glisse = true;
      invite.classList.add("cache");
      if (pts.size === 2) pincement = distancePts();
      dernier = { x: e.clientX, y: e.clientY };
    });
    canvas.addEventListener("pointermove", function (e) {
      const r = canvas.getBoundingClientRect();
      etat.px = e.clientX - r.left; etat.py = e.clientY - r.top; etat.dedans = true; etat.pointeurType = e.pointerType;
      const p = pts.get(e.pointerId);
      if (!p) { etat.sale = true; return; }
      const dx = e.clientX - p.x, dy = e.clientY - p.y;
      p.x = e.clientX; p.y = e.clientY;
      mvt += Math.abs(dx) + Math.abs(dy);
      if (pts.size === 1) {
        if (p.bouton === 2 || p.maj || e.shiftKey) {
          const k = cam.r * 0.0018;
          const droite = new THREE.Vector3(Math.cos(cam.az), 0, -Math.sin(cam.az));
          cam.tgt.addScaledVector(droite, -dx * k);
          cam.tgt.y += dy * k;
          bornerCible();
        } else {
          if (mvt > 6) canvas.classList.add("b3d-tire");
          cam.az -= dx * 0.0055;
          cam.el += dy * 0.0042;
          borner();
        }
        cam.derniere = performance.now();
      } else if (pts.size === 2) {
        const d = distancePts();
        if (pincement > 0) { cam.r *= pincement / d; borner(); }
        pincement = d;
      }
      etat.sale = true;
    });
    function distancePts() {
      const a = Array.from(pts.values());
      return Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y) || 1;
    }
    function fin(e) {
      const p = pts.get(e.pointerId);
      pts.delete(e.pointerId);
      canvas.classList.remove("b3d-tire");
      if (e.type === "pointerup" && p && pts.size === 0 && mvt < 7 && performance.now() - t0 < 600) {
        const r = canvas.getBoundingClientRect();
        cliquer(e.clientX - r.left, e.clientY - r.top);
      }
      if (pts.size < 2) pincement = 0;
      if (e.type === "pointercancel") glisse = false;
    }
    canvas.addEventListener("pointerup", fin);
    canvas.addEventListener("pointercancel", fin);
    canvas.addEventListener("pointerleave", function (e) {
      if (e.pointerType === "mouse") { etat.dedans = false; if (etat.survol) { etat.survol = null; majSurvol(); } }
    });
    canvas.addEventListener("wheel", function (e) {
      if (!etat.actif && !e.ctrlKey) return;              /* la page défile tant qu'on n'a pas pris la maquette en main */
      e.preventDefault();
      cam.r *= Math.exp(e.deltaY * 0.0012);
      borner(); etat.sale = true;
    }, { passive: false });
    scene.addEventListener("pointerleave", function () { etat.actif = false; });
    scene.addEventListener("blur", function () { etat.actif = false; }, true);
    scene.addEventListener("keydown", function (e) {
      if (e.target !== scene) return;
      const k = e.key;
      if (k === "ArrowLeft") cam.az -= 0.12; else if (k === "ArrowRight") cam.az += 0.12;
      else if (k === "ArrowUp") cam.el += 0.08; else if (k === "ArrowDown") cam.el -= 0.08;
      else if (k === "+" || k === "=") cam.r *= 0.88; else if (k === "-") cam.r *= 1.14;
      else return;
      e.preventDefault(); borner(); etat.sale = true; cam.derniere = performance.now();
    });
    function borner() {
      cam.az = Math.max(-111 * D2R, Math.min(111 * D2R, cam.az));
      cam.el = Math.max(4 * D2R, Math.min(82 * D2R, cam.el));
      cam.r = Math.max(cam.r0 * 0.28, Math.min(cam.r0 * 1.25, cam.r));
    }
    function bornerCible() {
      cam.tgt.x = Math.max(-14, Math.min(14, cam.tgt.x));
      cam.tgt.y = Math.max(-3, Math.min(16, cam.tgt.y));
      cam.tgt.z = Math.max(-9, Math.min(7, cam.tgt.z));
    }

    /* ---- outils ---- */
    $(".b3d-outils").addEventListener("click", function (e) {
      const b = e.target.closest("button");
      if (!b) return;
      const a = b.dataset.a;
      if (a === "plus") cam.r *= 0.8;
      else if (a === "moins") cam.r *= 1.25;
      else if (a === "reset") { fermer(); reinit(); }
      else if (a === "tourne") { cam.auto = !cam.auto; b.setAttribute("aria-pressed", String(cam.auto)); }
      borner(); etat.sale = true; invite.classList.add("cache");
    });
    function reinit() {
      cam.az = 24 * D2R; cam.el = 11 * D2R; cam.r = cam.r0; cam.tgt.copy(CIBLE0);
    }

    /* ---- sélection : la caméra s'approche doucement de la zone ---- */
    etat.m = {
      focus: function (id) {
        majDecal(false);
        if (!id) { cam.tgt.copy(CIBLE0); cam.r = cam.r0; cam.el = Math.min(cam.el, 24 * D2R); majSelection(); etat.sale = true; return; }
        const z = maq.zones[id];
        cam.tgt.copy(CIBLE0).lerp(FOYER[id] || z.ancre, FOYER[id] ? 1 : 0.86);
        cam.tgt.z = Math.max(-2.5, Math.min(cam.tgt.z, 1));
        cam.r = cam.r0 * (ZOOM[id] || 0.6);
        const pl = AZ[id] || [-22, 42];
        cam.az = Math.max(pl[0] * D2R, Math.min(pl[1] * D2R, cam.az));
        cam.el = (id === "secu-impact" || id === "regl-acoustique" ? 14 : 8) * D2R;
        cam.derniere = performance.now();
        majSelection(); etat.sale = true;
      },
      sceaux: function (ids) {
        Object.keys(maq.sceaux).forEach(function (k) { maq.sceaux[k].visible = ids.indexOf(k) >= 0; });
        etat.sale = true;
      },
      survoler: function (id) { if (etat.dedans && etat.pointeurType === "mouse") return; etat.survol = id || null; majSurvol(); },
      visible: function (v) { v ? (boucleOn()) : (boucleOff()); }
    };

    /* ---- pointage ---- */
    const rayon = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const cibles = [];
    ORDRE.forEach(function (id) { maq.zones[id].proxies.forEach(function (p) { cibles.push(p); }); });
    function viser(x, y) {
      ndc.set((x / W) * 2 - 1, -(y / H) * 2 + 1);
      rayon.setFromCamera(ndc, camera);
      const h = rayon.intersectObjects(cibles, false);
      return h.length ? h[0].object.userData.zone : null;
    }
    function cliquer(x, y) {
      const id = viser(x, y);
      if (id) { selectionner(id); }
      else if (etat.selection) fermer();
    }
    function majSurvol() {
      canvas.classList.toggle("b3d-vise", !!etat.survol);
      majSelection();
      majEtatBoutons();
    }
    function majSelection() {
      ORDRE.forEach(function (id) {
        maq.zones[id].cible = etat.survol === id ? 1 : (etat.selection === id ? 0.72 : 0);
      });
      etat.sale = true;
    }

    /* ---- étiquette et lien pointillé vers la zone ---- */
    const v3 = new THREE.Vector3();
    const traitLigne = lienSvg.querySelector("line"), traitPoint = lienSvg.querySelector("circle");
    let etiId = null;
    function ecran(pt) {
      v3.copy(pt).project(camera);
      return { x: (v3.x * 0.5 + 0.5) * W - (camera.view && camera.view.enabled ? 0 : 0), y: (-v3.y * 0.5 + 0.5) * H, z: v3.z };
    }
    const boite = new THREE.Box3(), coin = new THREE.Vector3();
    function rectEcran(id) {
      let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      maq.zones[id].proxies.forEach(function (p) {
        boite.setFromObject(p);
        for (let i = 0; i < 8; i++) {
          coin.set(i & 1 ? boite.max.x : boite.min.x, i & 2 ? boite.max.y : boite.min.y, i & 4 ? boite.max.z : boite.min.z);
          const s = ecran(coin);
          if (s.x < x0) x0 = s.x; if (s.x > x1) x1 = s.x; if (s.y < y0) y0 = s.y; if (s.y > y1) y1 = s.y;
        }
      });
      return { x0: x0, y0: y0, x1: x1, y1: y1 };
    }
    function placerEtiquette() {
      const id = etat.survol || etat.selection;
      if (!id) { etiquette.classList.remove("vu"); traitLigne.setAttribute("opacity", 0); traitPoint.setAttribute("opacity", 0); etiId = null; return; }
      const l = ligneDe(id);
      if (etiId !== id) {
        etiId = id;
        etiquette.style.setProperty("--c", l.couleur);
        etiquette.innerHTML = "<b>" + esc(l.ico) + " " + esc(l.nom) + "</b><span>" + esc(LIEUX[id]) + "</span>";
      }
      const a = ecran(maq.zones[id].ancre);
      const libre = W - (!pan.hidden && !mobile.matches ? Math.min(370, W * 0.92) + 20 : 0);
      const ew = Math.min(etiquette.offsetWidth || 240, libre - 24), eh = etiquette.offsetHeight || 60;
      const r = rectEcran(id), G = 16, M = 12, MB = mobile.matches ? 64 : 12;   /* en bas, la place des boutons de vue */
      /* l'étiquette se pose À CÔTÉ de la zone, jamais dessus : on essaie dessus / dessous / côtés */
      const dessus = [(r.x0 + r.x1) / 2, r.y0 - G - eh / 2], dessous = [(r.x0 + r.x1) / 2, r.y1 + G + eh / 2];
      const cands = [
        a.y < H * 0.5 ? dessus : dessous,
        a.y < H * 0.5 ? dessous : dessus,
        [r.x0 - G - ew / 2, (r.y0 + r.y1) / 2],
        [r.x1 + G + ew / 2, (r.y0 + r.y1) / 2]
      ];
      let px = cands[0][0], py = cands[0][1], ok = false;
      for (let i = 0; i < cands.length && !ok; i++) {
        const cx = Math.max(M + ew / 2, Math.min(libre - M - ew / 2, cands[i][0]));
        const cyy = cands[i][1];
        if (cyy - eh / 2 >= M && cyy + eh / 2 <= H - MB) { px = cx; py = cyy; ok = true; }
      }
      if (!ok) { px = Math.max(M + ew / 2, Math.min(libre - M - ew / 2, px)); py = Math.max(M + eh / 2, Math.min(H - MB - eh / 2, py)); }
      etiquette.style.transform = "translate(" + Math.round(px - ew / 2) + "px," + Math.round(py - eh / 2) + "px)";
      etiquette.classList.add("vu");
      invite.classList.add("cache");
      /* le trait va du repère au bord le plus proche de l'étiquette */
      const bx = Math.max(px - ew / 2, Math.min(px + ew / 2, a.x)), by = Math.max(py - eh / 2, Math.min(py + eh / 2, a.y));
      const dedans = Math.abs(bx - a.x) < 1 && Math.abs(by - a.y) < 1;
      traitLigne.setAttribute("x1", a.x); traitLigne.setAttribute("y1", a.y);
      traitLigne.setAttribute("x2", bx); traitLigne.setAttribute("y2", by);
      traitLigne.setAttribute("opacity", dedans ? 0 : 0.9);
      traitPoint.setAttribute("cx", a.x); traitPoint.setAttribute("cy", a.y);
      traitPoint.setAttribute("opacity", dedans ? 0 : 0.9);
      traitLigne.style.stroke = l.couleur; traitPoint.style.fill = l.couleur;
    }
    const INTERIEUR = { "regl-fluidique": 1, "regl-desp": 1, "regl-electrique": 1, "regl-certifs": 1, "regl-travail": 1, "regl-incendie": 1 };
    const marqEl = {};
    marqueurs.querySelectorAll(".b3d-marq").forEach(function (m) { marqEl[m.dataset.zone] = m; });
    function placerMarqueurs() {
      ORDRE.forEach(function (id) {
        const m = marqEl[id]; if (!m) return;
        const a = ecran(maq.zones[id].ancre);
        m.style.translate = a.x.toFixed(1) + "px " + a.y.toFixed(1) + "px";
        if (INTERIEUR[id]) m.style.opacity = Math.max(0, Math.min(0.95, (80 * D2R - Math.abs(cam.azC)) / (25 * D2R))).toFixed(2); else m.style.opacity = "";
      });
    }

    /* ---- boucle de rendu : 60 images/s, qualité adaptative ---- */
    let raf = 0, dernier_t = 0, lissage = 16, comptes = 0;
    const pos = new THREE.Vector3();
    function boucle(now) {
      raf = requestAnimationFrame(boucle);
      const dt = Math.min(0.05, dernier_t ? (now - dernier_t) / 1000 : 0.016);
      dernier_t = now;
      const t = now / 1000;
      /* rotation douce au repos : un balancement entre deux angles, jamais quand on regarde une zone */
      const inactif = now - cam.derniere > 3500 && pts.size === 0 && !etat.selection && !etat.survol;
      if (cam.auto && inactif && !reduit) {
        const lo = -6 * D2R, hi = 52 * D2R;
        const dist = Math.min(cam.az - lo, hi - cam.az);
        const vit = (0.05 + 0.95 * Math.min(1, Math.max(0, dist / (14 * D2R)))) * 3.2 * D2R;
        if (cam.az >= hi) cam.dir = -1; else if (cam.az <= lo) cam.dir = 1;
        cam.az += cam.dir * vit * dt;
        etat.sale = true;
      }
      /* lissage de la caméra */
      const k = 1 - Math.exp(-dt * 9);
      const dAz = cam.az - cam.azC, dEl = cam.el - cam.elC, dR = cam.r - cam.rC;
      cam.azC += dAz * k; cam.elC += dEl * k; cam.rC += dR * k;
      cam.tgtC.lerp(cam.tgt, k);
      cam.decalC += (cam.decal - cam.decalC) * k;
      if (Math.abs(dAz) + Math.abs(dEl) > 1e-4 || Math.abs(dR) > 1e-3 || cam.tgtC.distanceToSquared(cam.tgt) > 1e-5 || Math.abs(cam.decal - cam.decalC) > 0.3) etat.sale = true;
      pos.set(Math.cos(cam.elC) * Math.sin(cam.azC), Math.sin(cam.elC), Math.cos(cam.elC) * Math.cos(cam.azC)).multiplyScalar(cam.rC).add(cam.tgtC);
      camera.position.copy(pos);
      camera.lookAt(cam.tgtC);
      if (Math.abs(cam.decalC) > 0.3) camera.setViewOffset(W, H, cam.decalC, 0, W, H); else camera.clearViewOffset();
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();
      /* survol : le rayon est relancé à chaque image tant que la souris est dessus */
      if (etat.dedans && etat.pointeurType === "mouse" && pts.size === 0) {
        const id = viser(etat.px, etat.py);
        if (id !== etat.survol) { etat.survol = id; majSurvol(); }
      }
      /* on baisse un peu la lumière ambiante quand une zone est à l'honneur : elle ressort */
      const dimC = (etat.survol || etat.selection) ? 1 : 0;
      if (Math.abs(dimC - dim) > 0.003) { dim += (dimC - dim) * Math.min(1, dt * 7); ciel.intensity = 1.9 * (1 - 0.3 * dim); soleil.intensity = 2.3 * (1 - 0.35 * dim); etat.sale = true; }
      const anime = maq.animer(t, dt, reduit);
      if (anime) etat.sale = true;
      if (!reduit || etat.sale) {
        placerMarqueurs(); placerEtiquette();
        renderer.render(sc, camera);
        etat.sale = false;
        /* qualité adaptative : si l'appareil peine, on baisse la définition */
        lissage += (dt * 1000 - lissage) * 0.05;
        if (++comptes > 90 && lissage > 24 && pr > 1) { pr = Math.max(1, pr - 0.25); renderer.setPixelRatio(pr); renderer.setSize(W, H, false); comptes = 0; lissage = 16; }
      }
    }
    function boucleOn() { if (!raf && !document.hidden) { dernier_t = 0; raf = requestAnimationFrame(boucle); } }
    function boucleOff() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
    document.addEventListener("visibilitychange", function () { document.hidden ? boucleOff() : (etat.visible !== false && boucleOn()); });
    canvas.addEventListener("webglcontextlost", function (e) { e.preventDefault(); boucleOff(); });
    canvas.addEventListener("webglcontextrestored", function () { renderer.shadowMap.needsUpdate = true; etat.sale = true; boucleOn(); });

    etat.dispose = function () {
      boucleOff();
      renderer.dispose();
      sc.traverse(function (o) { if (o.geometry) o.geometry.dispose(); if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(function (m) { m.dispose(); }); });
    };

    etat.dbg = { renderer: renderer, camera: camera, maq: maq, THREE: THREE, cam: cam, W: function () { return [W, H]; } };
    ajuster();
    etat.m.sceaux(sceauxActifs());
    if (etat.selection) etat.m.focus(etat.selection);
    renderer.shadowMap.needsUpdate = true;
    hote.setAttribute("data-etat", "pret");
    etat.sale = true;
    if (etat.visible !== false) boucleOn();
  }

  surveillerVisibilite();

  return {
    element: hote,
    _debug: function () { return etat.dbg; },
    selectionner: selectionner,
    fermer: fermer,
    majTampons: majTampons,
    detruire: function () {
      etat.detruit = true;
      if (observateur) observateur.disconnect();
      window.removeEventListener("storage", surStockage);
      if (etat.dispose) etat.dispose();
      hote.innerHTML = "";
      hote.classList.remove("b3d");
    }
  };
}
