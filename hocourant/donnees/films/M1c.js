/* ============================================================
   inerWeb HoCourant — FILM M1c : le tournevis dans l'armoire (vague 2)
   Un dessin animé en deux actes, SVG + animations CSS.
   Acte 1 · la situation : armoire ouverte, deux barres nues sous
   tension ; le bonhomme (seul, le second personnage n'apparaît qu'à
   l'acte 2) approche un tournevis pour resserrer, l'outil touche les
   deux barres, grand flash, projections, il est repoussé sans contact
   de la main, visage noirci, il finit assis par terre, étoiles.
   Acte 2 · la leçon : il s'arrête hors de portée, range le tournevis,
   lève la main ; à bonne distance de lui, un chargé de travaux abaisse
   le levier du sectionneur, pose son cadenas, va vérifier l'absence de
   tension sur l'arrivée (appareil, coche verte), l'arrivée devient grise ;
   alors seulement il reprend le tournevis et resserre (30/09/2026 : la VAT
   montrée, et le cadenas posé AVANT que l'arrivée ne grise).
   Règles : aucun texte dans le dessin ; classes préfixées « f- » ;
   sélecteurs sous .film-M1c ; l'acte se joue en posant la classe
   acte-1 ou acte-2 sur la <figure class="scene film film-M1c">.
   Bonhomme repris de films/M1.js ; posture assise (buste droit,
   jambes tendues au sol) reprise de films/M13b.js ; second personnage
   aux mêmes proportions (classes suffixées « 2 »).
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M1c = {
  titre: "Le tournevis dans l'armoire : la situation, puis le bon geste",
  alt: "Acte 1 : une personne seule approche un tournevis de deux barres nues dans une armoire ouverte, un grand flash la repousse sans contact de la main, visage noirci, elle se retrouve assise par terre avec des étoiles autour de la tête. Acte 2 : la même personne range le tournevis et lève la main à bonne distance ; à l'écart, un collègue chargé des travaux abaisse le levier du sectionneur et pose son cadenas, l'arrivée devient grise, et ce n'est qu'alors que le tournevis ressert la vis.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="165" y="60" width="85" height="80" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M165 60 l-16 8 v64 l16 8" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect x="173" y="100" width="70" height="6" fill="#84b7ec"/><rect x="173" y="118" width="70" height="6" fill="#84b7ec"/>
<path class="f-arrivee" d="M243 103 V30" stroke="#c0392b" stroke-width="4" stroke-linecap="round"/>
<g class="f-sectionneur"><rect x="132" y="95" width="14" height="22" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/><path class="f-levier" d="M139 105 V97" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="139" cy="105" r="2" fill="#1b3a63"/></g>
<g class="f-cadenas"><path d="M135 112 a4 4 0 0 1 8 0 v3" fill="none" stroke="#1b3a63" stroke-width="2"/><rect x="131" y="115" width="9" height="7" rx="1.3" fill="#ff6b35"/></g>
<g class="f-flash"><path d="M191 87 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/><path d="M175 95 l6 -3 l-2 7z" fill="#ff6b35"/><path d="M215 90 l-6 -3 l3 7z" fill="#ff6b35"/><path d="M205 118 l-5 4 l6 4z" fill="#ff6b35"/></g>
<g transform="translate(105 90)"><g class="f-bon2">
<circle cx="0" cy="10" r="9" fill="#f6d7bd" stroke="#1b3a63" stroke-width="2.2"/><path d="M-9 9.5 Q-9.5 0.5 0 0.8 Q9.5 0.5 9 9.5 Q6 4.6 0 4.8 Q-6 4.6 -9 9.5Z" fill="#1b3a63"/><circle cx="-3.2" cy="10.5" r="1.2" fill="#10233c"/><circle cx="3.2" cy="10.5" r="1.2" fill="#10233c"/><path d="M-2.2 14 Q0 15.6 2.2 14" stroke="#10233c" stroke-width="1.2" fill="none" stroke-linecap="round"/>
<path d="M-8 24 Q-8 19 -3 19 H3 Q8 19 8 24 V48 H-8 Z" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/><path d="M-8 38 H8" stroke="#fffdf8" stroke-width="3"/><path d="M0 20 V48" stroke="#1b3a63" stroke-width="1.2"/>
<path class="f-jg2" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="7" stroke-linecap="round" fill="none"/>
<path class="f-jd2" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="7" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="6" stroke-linecap="round"/>
<g class="f-bras2"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="6" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#f6d7bd" stroke="#1b3a63" stroke-width="1.8"/></g>
</g></g>
<g class="f-vat"><rect x="227" y="113" width="12" height="17" rx="3" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/><circle cx="233" cy="119" r="2.4" fill="#9aa9b8"/><path d="M235 113 L243 101" stroke="#1b3a63" stroke-width="1.8" stroke-linecap="round"/></g>
<g class="f-coche"><path d="M247 106 l4 4 l8 -9" stroke="#1e7e54" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<g transform="translate(60 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<circle class="f-visage" cx="0" cy="10" r="9" fill="#f6d7bd" stroke="#1b3a63" stroke-width="2.2"/><path d="M-9 9.5 Q-9.5 0.5 0 0.8 Q9.5 0.5 9 9.5 Q6 4.6 0 4.8 Q-6 4.6 -9 9.5Z" fill="#1b3a63"/><circle cx="-3.2" cy="10.5" r="1.2" fill="#10233c"/><circle cx="3.2" cy="10.5" r="1.2" fill="#10233c"/><path d="M-2.2 14 Q0 15.6 2.2 14" stroke="#10233c" stroke-width="1.2" fill="none" stroke-linecap="round"/>
<path d="M-8 24 Q-8 19 -3 19 H3 Q8 19 8 24 V48 H-8 Z" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/><path d="M-8 38 H8" stroke="#fffdf8" stroke-width="3"/><path d="M0 20 V48" stroke="#1b3a63" stroke-width="1.2"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="7" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="7" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="6" stroke-linecap="round"/>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="6" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#f6d7bd" stroke="#1b3a63" stroke-width="1.8"/><g class="f-tournevis"><path d="M12 49 L21 58" stroke="#84b7ec" stroke-width="2.5" stroke-linecap="round"/><rect x="19" y="55.5" width="7" height="4" rx="1" fill="#1b3a63"/></g></g>
</g></g>`,
  css: `.film-M1c .f-bon,.film-M1c .f-bon2,.film-M1c .f-jg,.film-M1c .f-jd,.film-M1c .f-jg2,.film-M1c .f-jd2,.film-M1c .f-bras,.film-M1c .f-bras2,.film-M1c .f-etoiles-r,.film-M1c .f-levier{transform-box:fill-box}
.film-M1c .f-jg{transform-origin:100% 0}.film-M1c .f-jd{transform-origin:0 0}.film-M1c .f-bras{transform-origin:0 0}
.film-M1c .f-jg2{transform-origin:100% 0}.film-M1c .f-jd2{transform-origin:0 0}.film-M1c .f-bras2{transform-origin:0 0}
.film-M1c .f-levier{transform-origin:50% 100%}
.film-M1c .f-etoiles-r{transform-origin:50% 50%;animation:M1c-tourne 2.2s linear infinite}
.film-M1c .f-flash,.film-M1c .f-etoiles,.film-M1c .f-cadenas{opacity:0}
@keyframes M1c-tourne{to{transform:rotate(360deg)}}
@keyframes M1c-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M1c-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M1c.acte-1 .f-bon2{opacity:0}
.film-M1c.acte-1 .f-bon{animation:M1c-a1-bon 12s linear forwards}
@keyframes M1c-a1-bon{0%{transform:translate(0,0)}28%{transform:translate(100px,0)}40%{transform:translate(100px,0)}42%{transform:translate(96px,0)}44%{transform:translate(104px,0)}46%{transform:translate(96px,0)}48%{transform:translate(104px,0)}50%{transform:translate(100px,0)}58%{transform:translate(60px,0)}70%,100%{transform:translate(20px,20px)}}
.film-M1c.acte-1 .f-jg{animation:M1c-a1-jg 12s linear forwards}
@keyframes M1c-a1-jg{0%{transform:rotate(-22deg)}7%{transform:rotate(22deg)}14%{transform:rotate(-22deg)}21%{transform:rotate(22deg)}28%,50%{transform:rotate(0)}58%,100%{transform:rotate(-115deg)}}
.film-M1c.acte-1 .f-jd{animation:M1c-a1-jd 12s linear forwards}
@keyframes M1c-a1-jd{0%{transform:rotate(22deg)}7%{transform:rotate(-22deg)}14%{transform:rotate(22deg)}21%{transform:rotate(-22deg)}28%,50%{transform:rotate(0)}58%,100%{transform:rotate(-62deg)}}
.film-M1c.acte-1 .f-bras{animation:M1c-a1-bras 12s linear forwards}
@keyframes M1c-a1-bras{0%,28%{transform:rotate(0)}40%{transform:rotate(-64deg)}50%{transform:rotate(-64deg)}58%{transform:rotate(-20deg)}100%{transform:rotate(-20deg)}}
.film-M1c.acte-1 .f-flash{animation:M1c-a1-flash 12s linear forwards}
@keyframes M1c-a1-flash{0%,39%{opacity:0}40%{opacity:1}42%{opacity:.3}44%{opacity:1}46%{opacity:.3}48%{opacity:1}52%,100%{opacity:0}}
.film-M1c.acte-1 .f-visage{animation:M1c-a1-visage 12s linear forwards}
@keyframes M1c-a1-visage{0%,39%{fill:#f6d7bd}40%,100%{fill:#1b3a63}}
.film-M1c.acte-1 .f-etoiles{animation:M1c-a1-etoiles 12s linear forwards}
@keyframes M1c-a1-etoiles{0%,57%{opacity:0}60%,100%{opacity:1}}
.film-M1c.acte-2 .f-bon{animation:M1c-a2-bon 10s linear forwards}
@keyframes M1c-a2-bon{0%{transform:translate(0,0)}20%,80%{transform:translate(-10px,0)}92%,100%{transform:translate(95px,0)}}
.film-M1c.acte-2 .f-jg{animation:M1c-a2-jg 10s linear forwards}
@keyframes M1c-a2-jg{0%{transform:rotate(-22deg)}5%{transform:rotate(22deg)}10%{transform:rotate(-22deg)}15%{transform:rotate(22deg)}20%,80%{transform:rotate(0)}84%{transform:rotate(-22deg)}88%{transform:rotate(22deg)}92%,100%{transform:rotate(0)}}
.film-M1c.acte-2 .f-jd{animation:M1c-a2-jd 10s linear forwards}
@keyframes M1c-a2-jd{0%{transform:rotate(22deg)}5%{transform:rotate(-22deg)}10%{transform:rotate(22deg)}15%{transform:rotate(-22deg)}20%,80%{transform:rotate(0)}84%{transform:rotate(22deg)}88%{transform:rotate(-22deg)}92%,100%{transform:rotate(0)}}
.film-M1c.acte-2 .f-bras{animation:M1c-a2-bras 10s linear forwards}
@keyframes M1c-a2-bras{0%,15%{transform:rotate(0)}30%,88%{transform:rotate(-84deg)}95%,100%{transform:rotate(-64deg)}}
.film-M1c.acte-2 .f-tournevis{animation:M1c-a2-tournevis 10s linear forwards}
@keyframes M1c-a2-tournevis{0%,12%{opacity:1}18%,85%{opacity:0}91%,100%{opacity:1}}
.film-M1c.acte-2 .f-bon2{animation:M1c-a2-bon2 10s linear forwards}
@keyframes M1c-a2-bon2{0%,54%{opacity:1;transform:translateX(0)}62%,74%{opacity:1;transform:translateX(102px)}80%,100%{opacity:0;transform:translateX(102px)}}
.film-M1c.acte-2 .f-bras2{animation:M1c-a2-bras2 10s linear forwards}
@keyframes M1c-a2-bras2{0%,22%{transform:rotate(0)}35%,100%{transform:rotate(-45deg)}}
.film-M1c.acte-2 .f-levier{animation:M1c-a2-levier 10s linear forwards}
@keyframes M1c-a2-levier{0%,32%{transform:rotate(0)}48%,100%{transform:rotate(75deg)}}
.film-M1c.acte-2 .f-arrivee{animation:M1c-a2-arrivee 10s linear forwards}
@keyframes M1c-a2-arrivee{0%,66%{stroke:#c0392b}72%,100%{stroke:#9aa9b8}}
.film-M1c.acte-2 .f-cadenas{animation:M1c-a2-cadenas 10s linear forwards}
.film-M1c .f-vat,.film-M1c .f-coche{opacity:0}
.film-M1c.acte-2 .f-vat{animation:M1c-a2-vat 10s linear forwards}
.film-M1c.acte-2 .f-coche{animation:M1c-a2-coche 10s linear forwards}
.film-M1c.acte-2 .f-jg2{animation:M1c-pas-g .4s ease-in-out 5.4s 2 alternate}
.film-M1c.acte-2 .f-jd2{animation:M1c-pas-d .4s ease-in-out 5.4s 2 alternate}
@keyframes M1c-a2-cadenas{0%,48%{opacity:0}54%,100%{opacity:1}}
@keyframes M1c-a2-vat{0%,61%{opacity:0}63%,74%{opacity:1}78%,100%{opacity:0}}
@keyframes M1c-a2-coche{0%,67%{opacity:0}70%,76%{opacity:1}80%,100%{opacity:0}}`
};

window.INTERACTIONS = window.INTERACTIONS || {};
INTERACTIONS.M1c = {
  arret: 4.8,
  question: "Qu'est-ce qui a manqué avant de resserrer ?",
  choix: [
    { t: "Faire couper le courant d'abord", ok: true },
    { t: "Prendre un tournevis plus long", remed: "Un outil plus long n'empêche pas le contact avec des barres qui restent sous tension." },
    { t: "Se tenir de côté face à l'armoire", remed: "Se tenir de côté ne change rien : les barres restent sous tension pendant tout le geste." }
  ],
  bravo: "Couper avant de resserrer : la protection vient de l'absence de tension, pas de la posture."
};
