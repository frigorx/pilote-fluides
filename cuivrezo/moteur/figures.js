/* CuivRézo — registre des figures dessinées (SVG).
   CONTRAT : CuivFigures.ajouter(nom, fn(etat) → chaîne SVG) · CuivFigures.dessiner(nom, etat).
   Les familles vivent dans figures-*.js (tube, coupe, mesure, cintrage, collet, poste) et
   s'enregistrent ici. Toutes en viewBox 800 × 500, fond crème, étiquettes HORS des tracés
   (reliées par un trait fin), jamais de texte sur un dessin.
   Piège payé ailleurs : un `transform` CSS écrase l'attribut SVG. Le PLACEMENT se fait sur un
   groupe (attribut transform), l'ANIMATION sur l'enfant (classe CSS). Aucune animation n'est
   conditionnée à prefers-reduced-motion : le mouvement est le contenu. */

const CuivFigures = (() => {
  'use strict';
  const reg = {};
  const CSS = `
    .cz-txt{font:600 22px Calibri,'Segoe UI',Arial,sans-serif;fill:#10233c}
    .cz-pt{font:700 20px Calibri,'Segoe UI',Arial,sans-serif;fill:#56657a}
    .cz-ok{font:800 24px Calibri,'Segoe UI',Arial,sans-serif;fill:#1e7e54}
    .cz-ko{font:800 24px Calibri,'Segoe UI',Arial,sans-serif;fill:#b3261e}
    .cz-trait{stroke:#1b3a63;stroke-width:2;fill:none}
    .cz-cote{stroke:#1b3a63;stroke-width:2;fill:none;marker-start:url(#cz-fl);marker-end:url(#cz-fl)}
    .cz-tourne{animation:cz-tour 4s linear infinite;transform-origin:0 0}
    .cz-tourne-lent{animation:cz-tour 8s linear infinite;transform-origin:0 0}
    .cz-vis{animation:cz-vis 4s ease-in-out infinite;transform-origin:0 0}
    .cz-tombe{animation:cz-tombe 1.6s ease-in infinite}
    .cz-tombe2{animation:cz-tombe 1.6s ease-in .5s infinite}
    .cz-tombe3{animation:cz-tombe 1.6s ease-in 1s infinite}
    .cz-va{animation:cz-va 2.4s ease-in-out infinite}
    .cz-clign{animation:cz-clign 1.4s ease-in-out infinite}
    .cz-pousse{animation:cz-pousse 3s ease-in-out infinite}
    @keyframes cz-tour{to{transform:rotate(360deg)}}
    @keyframes cz-vis{0%,70%{transform:rotate(0)}85%,100%{transform:rotate(90deg)}}
    @keyframes cz-tombe{0%{transform:translateY(0);opacity:1}100%{transform:translateY(120px);opacity:0}}
    @keyframes cz-va{0%,100%{transform:translateX(0)}50%{transform:translateX(-26px)}}
    @keyframes cz-clign{0%,100%{opacity:1}50%{opacity:.25}}
    @keyframes cz-pousse{0%,15%{transform:translateY(0)}60%,100%{transform:translateY(34px)}}`;

  /* dégradés partagés : le cuivre, l'acier, et la flèche des cotes */
  const DEFS = `<defs>
    <linearGradient id="cz-cu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9a36b"/><stop offset=".45" stop-color="#c77a3a"/><stop offset="1" stop-color="#8f4f1f"/></linearGradient>
    <linearGradient id="cz-cu-h" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e9a36b"/><stop offset=".5" stop-color="#c77a3a"/><stop offset="1" stop-color="#8f4f1f"/></linearGradient>
    <radialGradient id="cz-cu-r" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#eeb07c"/><stop offset="1" stop-color="#9a5624"/></radialGradient>
    <linearGradient id="cz-ac" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d7dde3"/><stop offset=".5" stop-color="#9aa6b2"/><stop offset="1" stop-color="#6b7785"/></linearGradient>
    <linearGradient id="cz-rouge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2574c"/><stop offset="1" stop-color="#a3241b"/></linearGradient>
    <marker id="cz-fl" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1 L9 5 L0 9 z" fill="#1b3a63"/></marker>
  </defs>`;

  function cadre(corps, titre) {
    return `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${titre || ''}">`
      + `<style>${CSS}</style>${DEFS}<rect width="800" height="500" rx="14" fill="#fbf6ee"/>${corps}</svg>`;
  }

  /* une étiquette posée hors du dessin, reliée au point visé par un trait fin */
  function etiquette(x, y, tx, ty, texte, cls, force) {
    const ancre = force || (tx < x ? 'end' : 'start');
    const dx = ancre === 'end' ? -6 : 6;
    return `<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="#1b3a63" stroke-width="1.6"/>`
      + `<circle cx="${x}" cy="${y}" r="4" fill="#1b3a63"/>`
      + `<text x="${tx + dx}" y="${ty + 7}" text-anchor="${ancre}" class="${cls || 'cz-txt'}">${texte}</text>`;
  }

  function verdict(ok, texte, x, y) {
    return `<text x="${x}" y="${y}" text-anchor="middle" class="${ok ? 'cz-ok' : 'cz-ko'}">${ok ? '✔ ' : '✘ '}${texte}</text>`;
  }

  function ajouter(nom, fn) { reg[nom] = fn; }
  function dessiner(nom, etat) {
    const f = reg[nom];
    if (!f) return cadre(`<text x="400" y="250" text-anchor="middle" class="cz-pt">Figure « ${nom} » à venir</text>`);
    return f(etat, { cadre, etiquette, verdict });
  }
  return { ajouter, dessiner, liste: () => Object.keys(reg) };
})();
