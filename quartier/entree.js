/* =====================================================================
   LE QUARTIER TECHNIQUE — porte d'entrée « grand public » d'inerweb.fr
   Moteur repris du bâtiment Législation (legislation/batiment3d/batiment.js),
   rendu générique : les zones, leurs lieux et leurs réglages de caméra
   viennent des données (donnees.json) et de la maquette (maquette-rue.js),
   plus rien n'est écrit en dur ici. Ajouts : les CALQUES (domaines du
   métier) qui allument leurs appareils et leurs tracés et grisent le reste.

     import { monterRue } from "./entree.js";
     monterRue(document.getElementById("rue3d"));

   Repli : sans WebGL, la maquette disparaît ; restent les calques, la liste
   des appareils en questions et le panneau de détail.
   ===================================================================== */

const THREE_URL = "https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.min.js";

const CSS = `
.r3d{--bleu:#1b3a63;--orange:#e8914a;--txt:#10233c;--mut:#5a6b7d;--carte:#fffdf8;--ligne:#d6dee7;
  position:relative;display:grid;grid-template-columns:1fr;gap:12px;font-family:Calibri,'Segoe UI',system-ui,Arial,sans-serif;color:var(--txt);text-align:left}
.r3d *{box-sizing:border-box}
.r3d-calques{display:grid;gap:8px}
.r3d-rang{display:flex;flex-wrap:wrap;gap:8px}
.r3d-calque{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:6px 14px;border-radius:12px;border:2px solid var(--c);background:var(--carte);
  color:var(--txt);font:inherit;font-size:16px;cursor:pointer}
.r3d-calque.grand{font:bold 19px/1.1 'Trebuchet MS',Calibri,Arial,sans-serif;padding:10px 18px;min-height:52px}
.r3d-calque[aria-pressed=true]{background:var(--c);color:#fff}
.r3d-calque svg{flex:none}
.r3d-calque[aria-pressed=true] .r3d-fond{stroke:#fff}
.r3d-vues{min-height:24px;margin:0;font-size:15px;color:var(--mut)}
.r3d-vues a{color:var(--bleu);margin-right:14px}
.r3d-coeur{position:relative;display:grid}
.r3d-scene{grid-area:1/1;position:relative;overflow:hidden;border-radius:14px;border:1px solid var(--ligne);
  background:radial-gradient(ellipse 80% 70% at 50% 34%,#ffffff 0%,#f8f3e8 55%,#ece5d5 100%);
  aspect-ratio:16/9;min-height:440px;max-height:86vh;touch-action:pan-y;user-select:none;-webkit-user-select:none;outline:none}
.r3d-scene:focus-visible{box-shadow:0 0 0 3px var(--orange)}
.r3d-canvas{position:absolute;inset:0;width:100%;height:100%;display:block;cursor:grab;touch-action:pan-y}
.r3d-canvas.vise{cursor:pointer}
.r3d-canvas.tire{cursor:grabbing}
.r3d-etat{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;
  font:bold 16px/1.4 'Trebuchet MS',Calibri,Arial,sans-serif;color:var(--bleu);pointer-events:none;transition:opacity .5s}
.r3d[data-etat=pret] .r3d-etat{opacity:0}
.r3d-marq{position:absolute;left:0;top:0;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:var(--carte);
  border:3px solid var(--c);display:flex;align-items:center;justify-content:center;font-size:15px;line-height:1;pointer-events:none;
  box-shadow:0 2px 8px rgba(16,35,60,.28);transition:opacity .25s,scale .2s;will-change:translate;opacity:0}
.r3d[data-etat=pret] .r3d-marq{opacity:.95}
.r3d-marq.on{scale:1.28;background:var(--c);z-index:3}
.r3d-marq.sel{scale:1.2;box-shadow:0 0 0 4px color-mix(in srgb,var(--c) 30%,transparent),0 2px 8px rgba(16,35,60,.28)}
.r3d-marq.gris{opacity:.25 !important}
.r3d-lien{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible}
.r3d-lien line{stroke-width:2;stroke-linecap:round}
.r3d-eti{position:absolute;left:0;top:0;max-width:calc(100% - 24px);padding:9px 14px 10px 12px;border-radius:12px;background:var(--carte);
  border:2px solid var(--c);box-shadow:0 6px 20px rgba(16,35,60,.22);pointer-events:none;z-index:4;opacity:0;transition:opacity .15s;will-change:transform;width:max-content;max-width:320px}
.r3d-eti.vu{opacity:1}
.r3d-eti b{display:block;font:bold 16px/1.25 'Trebuchet MS',Calibri,Arial,sans-serif;color:var(--bleu)}
.r3d-eti span{display:block;font-size:15px;line-height:1.3;color:var(--txt);margin-top:2px}
.r3d-outils{position:absolute;left:12px;bottom:12px;display:flex;gap:8px;z-index:5}
.r3d-outils button{width:44px;height:44px;border-radius:12px;border:1px solid var(--ligne);background:rgba(255,253,248,.94);color:var(--bleu);
  font:bold 20px/1 'Trebuchet MS',Calibri,Arial,sans-serif;cursor:pointer;box-shadow:0 2px 8px rgba(16,35,60,.14);display:flex;align-items:center;justify-content:center;padding:0}
.r3d-outils button:hover{border-color:var(--orange);color:var(--orange)}
.r3d-outils button[aria-pressed=true]{background:var(--bleu);color:#fff;border-color:var(--bleu)}
.r3d button:focus-visible,.r3d a:focus-visible,.r3d summary:focus-visible{outline:3px solid var(--orange);outline-offset:2px}
.r3d-invite{position:absolute;right:14px;bottom:14px;margin:0;max-width:52%;text-align:right;font-size:15px;line-height:1.35;color:var(--mut);
  background:rgba(255,253,248,.88);padding:6px 12px;border-radius:10px;pointer-events:none;transition:opacity .6s;z-index:2}
.r3d-invite.cache{opacity:0}
.r3d-pan{grid-area:1/1;justify-self:end;align-self:stretch;width:min(380px,92%);margin:10px;z-index:6;background:var(--carte);border:1px solid var(--ligne);
  border-radius:14px;box-shadow:0 10px 34px rgba(16,35,60,.24);display:flex;flex-direction:column;overflow:hidden;min-height:0;contain:size;animation:r3d-entree .28s ease-out}
.r3d-pan[hidden]{display:none}
@keyframes r3d-entree{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:none}}
.r3d-pan header{position:relative;padding:12px 52px 12px 18px;background:var(--c);color:#fff}
.r3d-lieu{margin:0 0 4px;font-size:12px;letter-spacing:.7px;font-weight:bold;text-transform:uppercase;opacity:.92}
.r3d-pan h3{margin:0;font:bold 22px/1.15 'Trebuchet MS',Calibri,Arial,sans-serif;outline:none}
.r3d-fermer{position:absolute;right:8px;top:8px;width:44px;height:44px;border-radius:50%;border:0;background:rgba(255,255,255,.2);color:#fff;font-size:26px;line-height:1;cursor:pointer}
.r3d-fermer:hover{background:rgba(255,255,255,.36)}
.r3d-corps{padding:14px 18px 10px;overflow:auto;flex:1;min-height:0;display:grid;gap:12px;align-content:start}
.r3d-question{margin:0;font:bold 20px/1.3 'Trebuchet MS',Calibri,Arial,sans-serif;color:var(--bleu)}
.r3d-go{display:inline-flex;align-items:center;gap:8px;min-height:48px;padding:10px 18px;border-radius:999px;background:var(--bleu);color:#fff;text-decoration:none;font:bold 17px/1.2 'Trebuchet MS',Calibri,Arial,sans-serif}
.r3d-go:hover{background:var(--orange);color:#fff}
.r3d-porte{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:8px 16px;border-radius:999px;border:2px solid var(--bleu);color:var(--bleu);text-decoration:none;font-weight:bold}
.r3d-porte:hover{border-color:var(--orange);color:var(--orange)}
.r3d-st summary{cursor:pointer;color:var(--bleu);font-weight:bold;min-height:32px}
.r3d-st ul{list-style:none;margin:8px 0 0;padding:0;display:grid;gap:6px}
.r3d-st li a{display:block;padding:6px 12px;border:1px solid var(--ligne);border-left:5px solid var(--c);border-radius:10px;background:#fff;color:var(--txt);text-decoration:none;min-height:40px}
.r3d-st li a:hover{background:#f5f8fb;color:var(--orange)}
.r3d-chips{display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:14px;color:var(--mut)}
.r3d-chips button{border:1.5px solid var(--cc);background:#fff;color:var(--txt);border-radius:999px;padding:3px 10px;font:inherit;cursor:pointer;min-height:32px}
.r3d-liste{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:14px}
.r3d-bat h4{margin:0 0 8px;font:bold 17px/1.3 'Trebuchet MS',Calibri,Arial,sans-serif;color:var(--bleu)}
.r3d-bat ul{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.r3d-bouton{width:100%;min-height:56px;display:flex;align-items:center;gap:10px;text-align:left;padding:8px 12px;border-radius:12px;border:1px solid var(--ligne);
  border-left:6px solid var(--c);background:var(--carte);color:var(--txt);cursor:pointer;font:inherit;transition:opacity .2s}
.r3d-bouton:hover{border-color:var(--c);background:#fff}
.r3d-bouton[aria-pressed=true]{background:var(--c);color:#fff;border-color:var(--c)}
.r3d-bouton[aria-pressed=true] small{color:#fff;opacity:.92}
.r3d-bouton.gris{opacity:.35}
.r3d-bouton .ico{font-size:22px;flex:none;width:30px;text-align:center}
.r3d-bouton b{display:block;font-size:16px;line-height:1.25}
.r3d-bouton small{display:block;font-size:14px;line-height:1.25;color:var(--mut)}
.r3d-note{margin:0;padding:12px 16px;border-radius:12px;background:#fff6e6;border:1px solid #f0d9ae;font-size:16px}
.r3d-note[hidden]{display:none}
.r3d-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.r3d[data-etat=repli] .r3d-scene{display:none}
.r3d[data-etat=repli] .r3d-pan{justify-self:stretch;width:auto;margin:0;max-width:560px;contain:none}
@media (max-width:900px){
  .r3d-scene{aspect-ratio:4/3;min-height:0;max-height:78vh}
  .r3d-coeur{grid-template-rows:auto auto}
  .r3d-pan{grid-area:2/1;justify-self:stretch;width:auto;margin:12px 0 0;align-self:start;contain:none}
  .r3d-invite{left:12px;right:12px;top:10px;bottom:auto;max-width:none;text-align:center}
  .r3d-marq{width:24px;height:24px;margin:-12px 0 0 -12px;font-size:12px;border-width:2px}
}
@media (max-width:560px){ .r3d-scene{aspect-ratio:1/1} .r3d-calque.grand{font-size:17px;padding:8px 14px} }
@media (prefers-reduced-motion:reduce){.r3d-pan{animation:none}.r3d-marq,.r3d-eti{transition:none}}
`;

function esc(v) {
  return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
function sansWebGL() {
  try { const c = document.createElement("canvas"); return !(c.getContext("webgl2") || c.getContext("webgl")); } catch (e) { return true; }
}
const TRAIT = { plein: "", tirete: 'stroke-dasharray="7 4"', pointille: 'stroke-dasharray="1.5 4" stroke-linecap="round"', mixte: 'stroke-dasharray="9 3 2 3"' };
function echantillon(c) {
  if (c.trait === "aucun") return "";
  if (c.trait === "double") return '<svg width="30" height="12" aria-hidden="true"><path d="M2 6h26" stroke="' + c.couleur + '" stroke-width="9" class="r3d-fond"/><path d="M2 6h26" stroke="#fffdf8" stroke-width="3"/></svg>';
  return '<svg width="30" height="12" aria-hidden="true"><path class="r3d-fond" d="M2 6h26" stroke="' + c.couleur + '" stroke-width="4" ' + (TRAIT[c.trait] || "") + "/></svg>";
}

let cssPose = false;
function poserCss() {
  if (cssPose) return;
  cssPose = true;
  const s = document.createElement("style");
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function monterRue(hote, options) {
  options = options || {};
  poserCss();
  const ici = import.meta.url;
  const urlDonnees = options.urlDonnees || new URL("donnees.json", ici).href;
  const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 900px)");
  const etat = { d: null, z: {}, ordre: [], selection: null, survol: null, calque: null, m: null, actif: false, detruit: false };

  hote.innerHTML = "";
  hote.classList.add("r3d");
  hote.setAttribute("data-etat", "attente");
  hote.innerHTML =
    '<div class="r3d-calques" role="toolbar" aria-label="Allumer un domaine du métier"><div class="r3d-rang" data-r="grand"></div><div class="r3d-rang" data-r="petit"></div><p class="r3d-vues" aria-live="polite"></p></div>' +
    '<div class="r3d-coeur">' +
      '<div class="r3d-scene" tabindex="0" role="group" aria-label="Maquette 3D du quartier technique : un commerce, une maison, l’immeuble des règles et la camionnette du technicien. Chaque appareil s’ouvre au clic ; les mêmes appareils existent en liste sous la maquette. Flèches : tourner, plus et moins : zoomer.">' +
        '<canvas class="r3d-canvas" aria-hidden="true"></canvas>' +
        '<div class="r3d-etat" role="status"><span>Construction du quartier…</span></div>' +
        '<svg class="r3d-lien" aria-hidden="true"><line x1="0" y1="0" x2="0" y2="0" opacity="0"/><circle r="4" cx="0" cy="0" opacity="0"/></svg>' +
        '<div class="r3d-marqueurs" aria-hidden="true"></div>' +
        '<div class="r3d-eti" aria-hidden="true"></div>' +
        '<div class="r3d-outils" role="toolbar" aria-label="Vue de la maquette">' +
          '<button type="button" data-a="plus" aria-label="Zoomer">+</button>' +
          '<button type="button" data-a="moins" aria-label="Dézoomer">−</button>' +
          '<button type="button" data-a="reset" aria-label="Revenir à la vue d’ensemble">⟲</button>' +
          '<button type="button" data-a="tourne" aria-pressed="' + (reduit || options.rotationAuto === false ? "false" : "true") + '" aria-label="Rotation automatique">⟳</button>' +
        "</div>" +
        '<p class="r3d-invite">Glissez pour tourner · touchez un appareil</p>' +
      "</div>" +
      '<aside class="r3d-pan" hidden aria-label="L’appareil choisi"></aside>' +
    "</div>" +
    '<p class="r3d-note" hidden></p>' +
    '<div class="r3d-liste" aria-label="Les mêmes appareils, en questions"></div>' +
    '<p class="r3d-sr" aria-live="polite"></p>';

  const $ = function (s) { return hote.querySelector(s); };
  const scene = $(".r3d-scene"), canvas = $(".r3d-canvas"), pan = $(".r3d-pan"), note = $(".r3d-note");
  const etiquette = $(".r3d-eti"), lienSvg = $(".r3d-lien"), invite = $(".r3d-invite");
  const marqueurs = $(".r3d-marqueurs"), liste = $(".r3d-liste"), annonce = $(".r3d-sr"), vues = $(".r3d-vues");

  /* ------------------------------------------------------------ interface */
  function calqueDe(id) { return etat.d.calques.find(function (c) { return c.id === id; }); }
  function dansCalque(zid) { const c = calqueDe(etat.calque); return !c || c.zones.indexOf(zid) >= 0; }

  function construire() {
    const d = etat.d;
    d.calques.forEach(function (c) {
      const b = document.createElement("button");
      b.type = "button"; b.className = "r3d-calque" + (c.grand ? " grand" : "");
      b.dataset.calque = c.id; b.setAttribute("aria-pressed", "false");
      b.style.setProperty("--c", c.couleur);
      b.innerHTML = echantillon(c) + "<span>" + esc(c.nom) + "</span>";
      hote.querySelector('.r3d-rang[data-r="' + (c.grand ? "grand" : "petit") + '"]').appendChild(b);
    });
    /* sansListe : la page porte déjà la liste en HTML (lisible par les moteurs de recherche) */
    if (options.sansListe) liste.hidden = true;
    else liste.innerHTML = d.batiments.map(function (bt) {
      return '<section class="r3d-bat"><h4>' + esc(bt.nom) + "</h4><ul>" + bt.zones.map(function (id) {
        const z = etat.z[id];
        return '<li><button type="button" class="r3d-bouton" data-zone="' + id + '" style="--c:' + esc(z.couleur) + '" aria-pressed="false">' +
          '<span class="ico" aria-hidden="true">' + esc(z.ico) + "</span><span><b>" + esc(z.question) + "</b><small>" + esc(z.nom) + "</small></span></button></li>";
      }).join("") + "</ul></section>";
    }).join("");
    etat.ordre.forEach(function (id) {
      const z = etat.z[id];
      const m = document.createElement("div");
      m.className = "r3d-marq"; m.dataset.zone = id; m.style.setProperty("--c", z.couleur);
      m.innerHTML = '<span aria-hidden="true">' + esc(z.ico) + "</span>";
      marqueurs.appendChild(m);
    });
    majBoutons();
  }
  function majBoutons() {
    liste.querySelectorAll(".r3d-bouton").forEach(function (b) {
      b.setAttribute("aria-pressed", String(etat.selection === b.dataset.zone));
      b.classList.toggle("gris", !dansCalque(b.dataset.zone));
    });
    marqueurs.querySelectorAll(".r3d-marq").forEach(function (m) {
      const id = m.dataset.zone;
      m.classList.toggle("sel", etat.selection === id);
      m.classList.toggle("on", etat.survol === id);
      m.classList.toggle("gris", !dansCalque(id));
    });
    hote.querySelectorAll(".r3d-calque").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.calque === etat.calque)); });
  }

  function afficherPanneau(id) {
    const z = etat.z[id];
    pan.style.setProperty("--c", z.couleur);
    const chips = z.calques.map(function (cid) {
      const c = calqueDe(cid);
      return '<button type="button" data-calque="' + cid + '" style="--cc:' + esc(c.couleur) + '">' + esc(c.nom) + "</button>";
    }).join("");
    pan.innerHTML =
      '<header><p class="r3d-lieu">' + esc(z.lieu) + '</p><h3 tabindex="-1"><span aria-hidden="true">' + esc(z.ico) + "</span> " + esc(z.nom) + "</h3>" +
      '<button type="button" class="r3d-fermer" aria-label="Fermer">×</button></header>' +
      '<div class="r3d-corps"><p class="r3d-question">' + esc(z.question) + "</p>" +
      '<p style="margin:0"><a class="r3d-go" href="' + esc(z.entree.href) + '">Commencer ici : ' + esc(z.entree.titre) + ' <span aria-hidden="true">→</span></a></p>' +
      (z.porte ? '<p style="margin:0"><a class="r3d-porte" href="' + esc(z.porte.href) + '">' + esc(z.porte.titre) + ' <span aria-hidden="true">→</span></a></p>' : "") +
      '<details class="r3d-st"><summary>Les ' + z.stations.length + " stations de cet appareil</summary><ul>" +
      z.stations.map(function (s) { return '<li><a href="' + esc(s.href) + '">' + esc(s.nom) + "</a></li>"; }).join("") + "</ul></details>" +
      '<p class="r3d-chips">Allumer le domaine : ' + chips + "</p></div>";
    pan.hidden = false;
    pan.style.animation = "none"; void pan.offsetWidth; pan.style.animation = "";
  }

  function selectionner(id, opts) {
    opts = opts || {};
    if (!etat.z[id]) return;
    etat.selection = id;
    afficherPanneau(id);
    majBoutons();
    annonce.textContent = etat.z[id].nom + ". " + etat.z[id].question;
    if (opts.focus) { const h = pan.querySelector("h3"); if (h) h.focus({ preventScroll: true }); }
    if (mobile.matches && opts.defiler !== false) pan.scrollIntoView({ block: "nearest", behavior: reduit ? "auto" : "smooth" });
    if (etat.m) etat.m.focus(id);
  }
  function fermer() {
    if (!etat.selection) return;
    etat.selection = null;
    pan.hidden = true;
    majBoutons();
    if (etat.m) etat.m.focus(null);
  }
  function allumer(id) {
    etat.calque = etat.calque === id ? null : id;
    const c = calqueDe(etat.calque);
    vues.innerHTML = c ? esc(c.nom) + " sur le site : " + c.vues.map(function (v) { return '<a href="' + esc(v.href) + '">' + esc(v.titre) + "</a>"; }).join("") : "";
    majBoutons();
    if (etat.m) etat.m.calque(c || null);
    annonce.textContent = c ? "Domaine allumé : " + c.nom : "Aucun domaine allumé";
  }

  hote.querySelector(".r3d-calques").addEventListener("click", function (e) {
    const b = e.target.closest(".r3d-calque"); if (b) allumer(b.dataset.calque);
  });
  liste.addEventListener("click", function (e) {
    const b = e.target.closest(".r3d-bouton"); if (!b) return;
    if (etat.selection === b.dataset.zone) fermer(); else selectionner(b.dataset.zone, { focus: true });
  });
  function depuisListe(e, vide) {
    if (!etat.m) return;
    const b = e.target.closest(".r3d-bouton");
    etat.m.survoler(vide ? null : (b && b.dataset.zone));
  }
  liste.addEventListener("pointerover", function (e) { if (e.pointerType === "mouse") depuisListe(e); });
  liste.addEventListener("pointerout", function (e) { if (e.pointerType === "mouse") depuisListe(e, true); });
  liste.addEventListener("focusin", function (e) { depuisListe(e); });
  liste.addEventListener("focusout", function (e) { depuisListe(e, true); });
  pan.addEventListener("click", function (e) {
    if (e.target.closest(".r3d-fermer")) { fermer(); return; }
    const c = e.target.closest("[data-calque]"); if (c) allumer(c.dataset.calque);
  });
  hote.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (etat.selection) fermer(); else if (etat.calque) allumer(etat.calque);
  });

  /* --------------------------------------------------------- chargement */
  const pret = (options.donnees ? Promise.resolve(options.donnees) :
    fetch(urlDonnees).then(function (r) { if (!r.ok) throw new Error("donnees.json : " + r.status); return r.json(); }))
    .then(function (d) {
      if (etat.detruit) return;
      etat.d = d;
      d.zones.forEach(function (z) { etat.z[z.id] = z; etat.ordre.push(z.id); });
      construire();
    });
  pret.catch(function (err) {
    console.warn("[rue3d]", err);
    hote.setAttribute("data-etat", "repli");
    note.hidden = false;
    note.textContent = "Les appareils n’ont pas pu être chargés.";
  });

  function repli(raison) {
    if (etat.detruit) return;
    if (raison) console.warn("[rue3d] repli sans 3D :", raison);
    hote.setAttribute("data-etat", "repli");
    note.hidden = false;
    note.textContent = "La maquette 3D n’est pas disponible sur cet appareil. Tous les appareils restent accessibles ci-dessous, en questions.";
  }

  let observateur = null;
  function surveiller() {
    if (sansWebGL()) { pret.then(function () { repli("WebGL absent"); }); return; }
    if (!("IntersectionObserver" in window)) { demarrer(); return; }
    observateur = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        etat.visible = x.isIntersecting;
        if (x.isIntersecting && !etat.charge) demarrer();
        if (etat.m) etat.m.visible(x.isIntersecting);
      });
    }, { rootMargin: "240px 0px" });
    observateur.observe(scene);
  }
  function demarrer() {
    etat.charge = true;
    Promise.all([pret, import(options.three || THREE_URL), import(options.maquette || "./maquette-rue.js")]).then(function (r) {
      return (r[2].charger ? r[2].charger(options.seul) : Promise.resolve()).then(function () { return r; });
    }).then(function (r) {
      if (etat.detruit || !etat.d) return;
      lancer(r[1], r[2]);
    }).catch(function (err) { repli(err); });
  }

  /* -------------------------------------------------------------- la 3D */
  function lancer(THREE, mod) {
    const defs = etat.ordre.map(function (id) { return { id: id, couleur: etat.z[id].couleur }; });
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: !!options.capture }); }
    catch (e) { repli(e); return; }
    let pr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pr);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = false;

    const maq = mod.construireMaquette(THREE, defs, etat.d.calques);
    const VUE = maq.vue;
    const sc = new THREE.Scene();
    sc.add(maq.groupe);
    const ciel = new THREE.HemisphereLight(0xffffff, 0xd9d0bd, 1.9);
    sc.add(ciel);
    const soleil = new THREE.DirectionalLight(0xfff1dc, 2.3);
    soleil.position.set(VUE.soleil[0], VUE.soleil[1], VUE.soleil[2]);
    soleil.castShadow = true;
    const petit = Math.min(screen.width, screen.height) < 700;
    soleil.shadow.mapSize.set(petit ? 1024 : 2048, petit ? 1024 : 2048);
    const sh = soleil.shadow.camera;
    sh.left = VUE.ombre[0]; sh.right = VUE.ombre[1]; sh.top = VUE.ombre[2]; sh.bottom = VUE.ombre[3]; sh.near = 5; sh.far = 120;
    soleil.shadow.bias = -0.0006; soleil.shadow.normalBias = 0.04; soleil.shadow.radius = 3;
    sc.add(soleil);

    const CAM = maq.cam || {};
    let dim = 0;
    const FOV = 28, D2R = Math.PI / 180;
    const camera = new THREE.PerspectiveCamera(FOV, 16 / 9, 1, 500);
    const CIBLE0 = new THREE.Vector3(VUE.cible[0], VUE.cible[1], VUE.cible[2]);
    const AZ0 = VUE.az * D2R, EL0 = VUE.el * D2R;
    const cam = { az: AZ0, el: EL0, r: 60, tgt: CIBLE0.clone(), azC: AZ0, elC: EL0, rC: 60, tgtC: CIBLE0.clone(),
      r0: 60, decal: 0, decalC: 0, auto: !(reduit || options.rotationAuto === false), dir: 1, derniere: 0 };
    let W = 1, H = 1;

    function ajuster() {
      W = Math.max(1, scene.clientWidth); H = Math.max(1, scene.clientHeight);
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      const t = Math.tan(FOV * D2R / 2);
      const largeur = W / H < 1 ? VUE.largeur * 0.62 : VUE.largeur, hauteur = VUE.hauteur;
      cam.r0 = Math.max(hauteur / t, largeur / (t * camera.aspect));
      if (!cam.pose) { cam.r = cam.rC = cam.r0; cam.pose = true; }
      cam.r = Math.min(Math.max(cam.r, cam.r0 * 0.2), cam.r0 * 1.25);
      majDecal(true);
      etat.sale = true;
    }
    function majDecal(direct) {
      const recouvre = !pan.hidden && !mobile.matches;
      cam.decal = recouvre ? Math.min(380, W * 0.92) / 2 : 0;
      if (direct) cam.decalC = cam.decal;
    }
    new ResizeObserver(ajuster).observe(scene);
    mobile.addEventListener("change", function () { majDecal(false); });

    const pts = new Map();
    let pincement = 0, mvt = 0, t0 = 0;
    canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    canvas.addEventListener("pointerdown", function (e) {
      canvas.setPointerCapture(e.pointerId);
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY, bouton: e.button, maj: e.shiftKey });
      etat.actif = true; mvt = 0; t0 = performance.now();
      invite.classList.add("cache");
      if (pts.size === 2) pincement = distancePts();
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
          if (mvt > 6) canvas.classList.add("tire");
          cam.az -= dx * 0.0055; cam.el += dy * 0.0042; borner();
        }
        cam.derniere = performance.now();
      } else if (pts.size === 2) {
        const d = distancePts();
        if (pincement > 0) { cam.r *= pincement / d; borner(); }
        pincement = d;
      }
      etat.sale = true;
    });
    function distancePts() { const a = Array.from(pts.values()); return Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y) || 1; }
    function fin(e) {
      const p = pts.get(e.pointerId);
      pts.delete(e.pointerId);
      canvas.classList.remove("tire");
      if (e.type === "pointerup" && p && pts.size === 0 && mvt < 7 && performance.now() - t0 < 600) {
        const r = canvas.getBoundingClientRect();
        cliquer(e.clientX - r.left, e.clientY - r.top);
      }
      if (pts.size < 2) pincement = 0;
    }
    canvas.addEventListener("pointerup", fin);
    canvas.addEventListener("pointercancel", fin);
    canvas.addEventListener("pointerleave", function (e) {
      if (e.pointerType === "mouse") { etat.dedans = false; if (etat.survol) { etat.survol = null; majSurvol(); } }
    });
    canvas.addEventListener("wheel", function (e) {
      if (!etat.actif && !e.ctrlKey) return;
      e.preventDefault();
      cam.r *= Math.exp(e.deltaY * 0.0012); borner(); etat.sale = true;
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
      cam.az = Math.max(-100 * D2R, Math.min(100 * D2R, cam.az));
      cam.el = Math.max(3 * D2R, Math.min(80 * D2R, cam.el));
      cam.r = Math.max(cam.r0 * 0.2, Math.min(cam.r0 * 1.25, cam.r));
    }
    function bornerCible() {
      const b = VUE.bornes;
      cam.tgt.x = Math.max(b[0], Math.min(b[1], cam.tgt.x));
      cam.tgt.y = Math.max(b[2], Math.min(b[3], cam.tgt.y));
      cam.tgt.z = Math.max(b[4], Math.min(b[5], cam.tgt.z));
    }

    $(".r3d-outils").addEventListener("click", function (e) {
      const b = e.target.closest("button"); if (!b) return;
      const a = b.dataset.a;
      if (a === "plus") cam.r *= 0.8;
      else if (a === "moins") cam.r *= 1.25;
      else if (a === "reset") { fermer(); reinit(); }
      else if (a === "tourne") { cam.auto = !cam.auto; b.setAttribute("aria-pressed", String(cam.auto)); }
      borner(); etat.sale = true; invite.classList.add("cache");
    });
    function reinit() { cam.az = AZ0; cam.el = EL0; cam.r = cam.r0; cam.tgt.copy(CIBLE0); }

    etat.m = {
      focus: function (id) {
        majDecal(false);
        if (!id) { cam.tgt.copy(CIBLE0); cam.r = cam.r0; cam.el = Math.min(cam.el, 24 * D2R); majSelection(); etat.sale = true; return; }
        const z = maq.zones[id], c = CAM[id] || {};
        if (c.foyer) cam.tgt.set(c.foyer[0], c.foyer[1], c.foyer[2]); else cam.tgt.copy(CIBLE0).lerp(z.ancre, 0.9);
        cam.r = cam.r0 * (c.zoom || 0.4);
        const pl = c.az || [-30, 40];
        cam.az = Math.max(pl[0] * D2R, Math.min(pl[1] * D2R, cam.az));
        cam.el = (c.el == null ? 10 : c.el) * D2R;
        cam.derniere = performance.now();
        majSelection(); etat.sale = true;
      },
      calque: function (c) { maq.calque(c); etat.sale = true; },
      survoler: function (id) { if (etat.dedans && etat.pointeurType === "mouse") return; etat.survol = id || null; majSurvol(); },
      visible: function (v) { v ? boucleOn() : boucleOff(); }
    };

    const rayon = new THREE.Raycaster(), ndc = new THREE.Vector2(), cibles = [];
    etat.ordre.forEach(function (id) { maq.zones[id].proxies.forEach(function (p) { cibles.push(p); }); });
    function viser(x, y) {
      ndc.set((x / W) * 2 - 1, -(y / H) * 2 + 1);
      rayon.setFromCamera(ndc, camera);
      const h = rayon.intersectObjects(cibles, false);
      return h.length ? h[0].object.userData.zone : null;
    }
    function cliquer(x, y) { const id = viser(x, y); if (id) selectionner(id); else if (etat.selection) fermer(); }
    function majSurvol() { canvas.classList.toggle("vise", !!etat.survol); majSelection(); majBoutons(); }
    function majSelection() {
      etat.ordre.forEach(function (id) { /* teinte légère : de près, l'appareil doit rester lisible sous la couleur */
        maq.zones[id].cible = etat.survol === id ? 0.6 : (etat.selection === id ? 0.28 : 0); });
      etat.sale = true;
    }

    const v3 = new THREE.Vector3();
    const traitLigne = lienSvg.querySelector("line"), traitPoint = lienSvg.querySelector("circle");
    let etiId = null;
    function ecran(pt) { v3.copy(pt).project(camera); return { x: (v3.x * 0.5 + 0.5) * W, y: (-v3.y * 0.5 + 0.5) * H, z: v3.z }; }
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
      const z = etat.z[id];
      if (etiId !== id) {
        etiId = id;
        etiquette.style.setProperty("--c", z.couleur);
        etiquette.innerHTML = "<b>" + esc(z.ico) + " " + esc(z.nom) + "</b><span>" + esc(z.question) + "</span>";
      }
      const a = ecran(maq.zones[id].ancre);
      const libre = W - (!pan.hidden && !mobile.matches ? Math.min(380, W * 0.92) + 20 : 0);
      const ew = Math.min(etiquette.offsetWidth || 240, libre - 24), eh = etiquette.offsetHeight || 60;
      const r = rectEcran(id), G = 16, M = 12, MB = mobile.matches ? 64 : 12;
      const dessus = [(r.x0 + r.x1) / 2, r.y0 - G - eh / 2], dessous = [(r.x0 + r.x1) / 2, r.y1 + G + eh / 2];
      const cands = [a.y < H * 0.5 ? dessus : dessous, a.y < H * 0.5 ? dessous : dessus, [r.x0 - G - ew / 2, (r.y0 + r.y1) / 2], [r.x1 + G + ew / 2, (r.y0 + r.y1) / 2]];
      let px = cands[0][0], py = cands[0][1], ok = false;
      for (let i = 0; i < cands.length && !ok; i++) {
        const cx = Math.max(M + ew / 2, Math.min(libre - M - ew / 2, cands[i][0])), cyy = cands[i][1];
        if (cyy - eh / 2 >= M && cyy + eh / 2 <= H - MB) { px = cx; py = cyy; ok = true; }
      }
      if (!ok) { px = Math.max(M + ew / 2, Math.min(libre - M - ew / 2, px)); py = Math.max(M + eh / 2, Math.min(H - MB - eh / 2, py)); }
      etiquette.style.transform = "translate(" + Math.round(px - ew / 2) + "px," + Math.round(py - eh / 2) + "px)";
      etiquette.classList.add("vu");
      invite.classList.add("cache");
      const bx = Math.max(px - ew / 2, Math.min(px + ew / 2, a.x)), by = Math.max(py - eh / 2, Math.min(py + eh / 2, a.y));
      const dedans = Math.abs(bx - a.x) < 1 && Math.abs(by - a.y) < 1;
      traitLigne.setAttribute("x1", a.x); traitLigne.setAttribute("y1", a.y); traitLigne.setAttribute("x2", bx); traitLigne.setAttribute("y2", by);
      traitLigne.setAttribute("opacity", dedans ? 0 : 0.9);
      traitPoint.setAttribute("cx", a.x); traitPoint.setAttribute("cy", a.y); traitPoint.setAttribute("opacity", dedans ? 0 : 0.9);
      traitLigne.style.stroke = z.couleur; traitPoint.style.fill = z.couleur;
    }
    const marqEl = {};
    marqueurs.querySelectorAll(".r3d-marq").forEach(function (m) { marqEl[m.dataset.zone] = m; });
    function placerMarqueurs() {
      etat.ordre.forEach(function (id) {
        const m = marqEl[id]; if (!m) return;
        const a = ecran(maq.zones[id].ancre);
        m.style.translate = a.x.toFixed(1) + "px " + a.y.toFixed(1) + "px";
        const c = CAM[id];
        if (c && c.interieur) m.style.opacity = Math.max(0, Math.min(0.95, (80 * D2R - Math.abs(cam.azC)) / (25 * D2R))).toFixed(2); else m.style.opacity = "";
      });
    }

    /* MODE LÉGER — pour les vieux postes : la maquette reste immobile (pas de rotation
       automatique, une image dessinée seulement quand on la touche), en définition simple.
       Il s'enclenche seul si la carte graphique est logicielle (pas d'accélération) ou si les
       60 premières images prennent plus de 50 ms en moyenne (moins de 20 images par seconde). */
    const mesure = { n: 0, somme: 0, avant: 0 };
    function passerEconome() {
      if (etat.econome) return;
      etat.econome = true;
      pr = 1; renderer.setPixelRatio(1); renderer.setSize(W, H, false);
      cam.auto = false;
      const b = $('.r3d-outils [data-a="tourne"]'); if (b) b.setAttribute("aria-pressed", "false");
      invite.textContent = "Mode léger : la maquette bouge quand vous la touchez";
      invite.classList.remove("cache");
      etat.sale = true;
    }
    try {
      const gl = renderer.getContext(), ext = gl.getExtension("WEBGL_debug_renderer_info");
      const carte = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : "";
      if (options.econome || /swiftshader|llvmpipe|basic render|software/i.test(carte)) passerEconome();
    } catch (e) { /* sans information sur la carte, la mesure des images décidera */ }

    let raf = 0, dernier_t = 0, lissage = 16, comptes = 0;
    const pos = new THREE.Vector3();
    function boucle(now) {
      raf = requestAnimationFrame(boucle);
      const dt = Math.min(0.05, dernier_t ? (now - dernier_t) / 1000 : 0.016);
      dernier_t = now;
      const t = now / 1000;
      const inactif = now - cam.derniere > 3500 && pts.size === 0 && !etat.selection && !etat.survol;
      if (cam.auto && inactif && !reduit) {
        const lo = VUE.balancement[0] * D2R, hi = VUE.balancement[1] * D2R;
        const dist = Math.min(cam.az - lo, hi - cam.az);
        const vit = (0.05 + 0.95 * Math.min(1, Math.max(0, dist / (14 * D2R)))) * 3.2 * D2R;
        if (cam.az >= hi) cam.dir = -1; else if (cam.az <= lo) cam.dir = 1;
        cam.az += cam.dir * vit * dt;
        etat.sale = true;
      }
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
      if (etat.dedans && etat.pointeurType === "mouse" && pts.size === 0) {
        const id = viser(etat.px, etat.py);
        if (id !== etat.survol) { etat.survol = id; majSurvol(); }
      }
      const dimC = (etat.survol || etat.selection) ? 1 : 0;
      if (Math.abs(dimC - dim) > 0.003) { dim += (dimC - dim) * Math.min(1, dt * 7); ciel.intensity = 1.9 * (1 - 0.3 * dim); soleil.intensity = 2.3 * (1 - 0.35 * dim); etat.sale = true; }
      if (maq.animer(t, dt, reduit)) etat.sale = true;
      /* mode léger : on ne redessine que lorsque quelque chose change */
      if ((!reduit && !etat.econome) || etat.sale) {
        placerMarqueurs(); placerEtiquette();
        renderer.render(sc, camera);
        etat.sale = false;
        /* mesure des premières images : un poste qui peine passe en mode léger */
        if (!etat.econome && mesure.n < 60) {
          if (mesure.avant) { mesure.somme += now - mesure.avant; mesure.n++; }
          mesure.avant = now;
          if (mesure.n === 60 && mesure.somme / 60 > 50) passerEconome();
        }
        lissage += (dt * 1000 - lissage) * 0.05;
        if (++comptes > 90 && lissage > 24 && pr > 1) { pr = Math.max(1, pr - 0.25); renderer.setPixelRatio(pr); renderer.setSize(W, H, false); comptes = 0; lissage = 16; }
      }
    }
    function boucleOn() { if (!raf && !document.hidden) { dernier_t = 0; raf = requestAnimationFrame(boucle); } }
    function boucleOff() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
    document.addEventListener("visibilitychange", function () { document.hidden ? boucleOff() : (etat.visible !== false && boucleOn()); });
    canvas.addEventListener("webglcontextlost", function (e) { e.preventDefault(); boucleOff(); });
    canvas.addEventListener("webglcontextrestored", function () { renderer.shadowMap.needsUpdate = true; etat.sale = true; boucleOn(); });

    etat.dbg = { renderer: renderer, camera: camera, maq: maq, cam: cam, THREE: THREE,
      /* pour le banc d'essai : placer la caméra sans lissage */
      poser: function (az, el, rFrac, cible) { cam.az = cam.azC = az * D2R; cam.el = cam.elC = el * D2R; cam.r = cam.rC = cam.r0 * rFrac; if (cible) { cam.tgt.set(cible[0], cible[1], cible[2]); cam.tgtC.copy(cam.tgt); } cam.auto = false; etat.sale = true; } };
    ajuster();
    if (etat.selection) etat.m.focus(etat.selection);
    if (etat.calque) maq.calque(calqueDe(etat.calque));
    renderer.shadowMap.needsUpdate = true;
    hote.setAttribute("data-etat", "pret");
    etat.sale = true;
    if (etat.visible !== false) boucleOn();
  }

  surveiller();

  return {
    element: hote,
    _debug: function () { return etat.dbg; },
    selectionner: selectionner, fermer: fermer, allumer: allumer,
    detruire: function () {
      etat.detruit = true;
      if (observateur) observateur.disconnect();
      hote.innerHTML = ""; hote.classList.remove("r3d");
    }
  };
}
