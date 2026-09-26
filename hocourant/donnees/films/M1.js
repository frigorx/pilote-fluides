/* ============================================================
   inerWeb HoCourant — FILM du module M1 : le contact direct
   Un dessin animé en deux actes, SVG + animations CSS.
   Acte 1 · la situation : le bonhomme marche vers le coffret ouvert,
   tend le bras vers le fil qui dépasse, le touche : éclair, cheveux
   dressés, secousse, rejeté en arrière, étoiles autour de la tête.
   Acte 2 · la leçon : il s'arrête à distance, lève la main, un repère
   se pose au sol, un panneau de danger apparaît.
   Règles : aucun texte dans le dessin ; classes préfixées « f- » ;
   sélecteurs sous .film-M1 ; l'acte se joue en posant la classe
   acte-1 ou acte-2 sur la <figure class="scene film film-M1"> ;
   aucun attribut transform sur un élément animé en CSS (le CSS
   l'écraserait) : le placement est porté par le groupe parent.
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M1 = {
  titre: "Contact direct : la situation, puis le bon geste",
  alt: "Acte 1 : une personne s'approche d'un coffret ouvert, touche un fil dénudé, est secouée et rejetée. Acte 2 : la même personne s'arrête à distance, lève la main, un repère est posé au sol et un panneau de danger signale le coffret.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="200" y="60" width="90" height="80" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M200 60 l-16 8 v64 l16 8" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect x="208" y="70" width="74" height="6" fill="#84b7ec"/><rect x="208" y="84" width="74" height="6" fill="#84b7ec"/>
<path class="f-fil" d="M276 100 H216 C204 100, 196 106, 188 112" stroke="#c0392b" stroke-width="4" fill="none" stroke-linecap="round"/>
<circle cx="188" cy="112" r="3.5" fill="#c0392b"/>
<g class="f-eclair"><path d="M184 96 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>
<g class="f-repere"><path d="M165 114 V156" stroke="#ff6b35" stroke-width="3" stroke-dasharray="6 5" stroke-linecap="round"/><path d="M156 160 L165 138 L174 160 Z" fill="#ff6b35"/></g>
<g class="f-panneau"><path d="M245 14 L264 46 H226 Z" fill="#fff4e0" stroke="#1b3a63" stroke-width="2.5" stroke-linejoin="round"/><path d="M245 22 l-4 8.8 h4 l-2.4 8 l8.8 -11.2 h-4.8 l3.2 -5.6z" fill="#ff6b35"/></g>
<g transform="translate(60 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>`,
  css: `.film-M1 .f-bon,.film-M1 .f-jg,.film-M1 .f-jd,.film-M1 .f-bras,.film-M1 .f-etoiles-r{transform-box:fill-box}
.film-M1 .f-jg{transform-origin:100% 0}.film-M1 .f-jd{transform-origin:0 0}.film-M1 .f-bras{transform-origin:0 0}
.film-M1 .f-etoiles-r{transform-origin:50% 50%;animation:M1-tourne 2.2s linear infinite}
.film-M1 .f-eclair,.film-M1 .f-cheveux,.film-M1 .f-etoiles,.film-M1 .f-repere,.film-M1 .f-panneau{opacity:0}
@keyframes M1-tourne{to{transform:rotate(360deg)}}
@keyframes M1-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M1-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M1.acte-1 .f-bon{animation:M1-a1-bon 12s linear forwards}
@keyframes M1-a1-bon{0%{transform:translateX(0)}28%{transform:translateX(100px)}40%{transform:translateX(100px)}42%{transform:translateX(96px)}44%{transform:translateX(104px)}46%{transform:translateX(96px)}48%{transform:translateX(104px)}50%{transform:translateX(100px)}58%{transform:translateX(55px)}100%{transform:translateX(55px)}}
.film-M1.acte-1 .f-jg{animation:M1-pas-g .48s ease-in-out 7 alternate}
.film-M1.acte-1 .f-jd{animation:M1-pas-d .48s ease-in-out 7 alternate}
.film-M1.acte-1 .f-bras{animation:M1-a1-bras 12s linear forwards}
@keyframes M1-a1-bras{0%,28%{transform:rotate(0)}40%{transform:rotate(-64deg)}50%{transform:rotate(-64deg)}58%{transform:rotate(-30deg)}100%{transform:rotate(-30deg)}}
.film-M1.acte-1 .f-eclair{animation:M1-a1-eclair 12s linear forwards}
@keyframes M1-a1-eclair{0%,39%{opacity:0}40%{opacity:1}42%{opacity:.3}44%{opacity:1}46%{opacity:.3}48%{opacity:1}52%,100%{opacity:0}}
.film-M1.acte-1 .f-fil{animation:M1-a1-fil 12s linear forwards}
@keyframes M1-a1-fil{0%,39%{stroke:#c0392b}40%,48%{stroke:#ff6b35}52%,100%{stroke:#c0392b}}
.film-M1.acte-1 .f-cheveux{animation:M1-a1-cheveux 12s linear forwards}
@keyframes M1-a1-cheveux{0%,39%{opacity:0}40%,100%{opacity:1}}
.film-M1.acte-1 .f-etoiles{animation:M1-a1-etoiles 12s linear forwards}
@keyframes M1-a1-etoiles{0%,57%{opacity:0}60%,100%{opacity:1}}
.film-M1.acte-2 .f-bon{animation:M1-a2-bon 10s linear forwards}
@keyframes M1-a2-bon{0%{transform:translateX(0)}30%,100%{transform:translateX(52px)}}
.film-M1.acte-2 .f-jg{animation:M1-pas-g .48s ease-in-out 6 alternate}
.film-M1.acte-2 .f-jd{animation:M1-pas-d .48s ease-in-out 6 alternate}
.film-M1.acte-2 .f-bras{animation:M1-a2-bras 10s linear forwards}
@keyframes M1-a2-bras{0%,30%{transform:rotate(0)}40%,100%{transform:rotate(-84deg)}}
.film-M1.acte-2 .f-repere{animation:M1-a2-repere 10s linear forwards}
@keyframes M1-a2-repere{0%,50%{opacity:0}56%,100%{opacity:1}}
.film-M1.acte-2 .f-panneau{animation:M1-a2-panneau 10s linear forwards}
@keyframes M1-a2-panneau{0%,72%{opacity:0}78%,100%{opacity:1}}`
};
