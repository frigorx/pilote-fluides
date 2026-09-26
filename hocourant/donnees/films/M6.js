/* ============================================================
   inerWeb HoCourant — FILM du module M6 : le titre remis, pas « vu faire »
   Un dessin animé en deux actes, SVG + animations CSS.
   Décor : une prise murale à gauche, un établi avec une perceuse posée,
   un coffret électrique fermé à droite.
   Acte 1 · la situation : le bonhomme arrive, prend la perceuse, le
   cordon se branche à la prise, il perce un instant ; puis il marche
   vers le coffret et tend la main vers la porte « parce qu'il a vu
   faire » : éclair, cheveux dressés, secousse, projeté en arrière,
   assis par terre, étoiles autour de la tête.
   Acte 2 · la leçon : même établi ; il perce normalement sans toucher
   au coffret ; il s'écarte, un responsable (casque) s'approche et lui
   remet une carte ; un cadenas apparaît sur la porte du coffret, qui
   reste fermée ; la perceuse est débranchée, un « juste » vert conclut.
   Règles : aucun texte dans le dessin ; classes préfixées « f- » ;
   sélecteurs sous .film-M6 ; l'acte se joue en posant la classe
   acte-1 ou acte-2 sur la <figure class="scene film film-M6"> ;
   aucun attribut transform sur un élément animé en CSS (le CSS
   l'écraserait) : le placement est porté par le groupe parent.
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M6 = {
  titre: "Avoir vu faire n'autorise rien : la situation, puis le bon geste",
  alt: "Acte 1 : une personne branche une perceuse sur une prise murale et perce sur un établi, puis tend la main vers la porte du coffret électrique voisin ; éclair, elle est projetée et reste assise au sol, des étoiles autour de la tête. Acte 2 : la même personne perce sans toucher au coffret, un responsable s'approche et lui remet une carte, un cadenas apparaît sur la porte du coffret qui reste fermée, la perceuse est débranchée.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<path d="M8 24 V160" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="8" y="90" width="16" height="20" rx="3" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<circle cx="13" cy="100" r="1.6" fill="#1b3a63"/><circle cx="19" cy="100" r="1.6" fill="#1b3a63"/>
<g class="f-cordon"><path d="M92 127 C84 142, 70 152, 48 154 C30 155, 16 140, 16 108" stroke="#1b3a63" stroke-width="2.5" fill="none" stroke-linecap="round"/><rect x="11" y="95" width="10" height="9" rx="2" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/></g>
<rect x="56" y="128" width="80" height="8" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M60 136 V160 M132 136 V160" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-perceuse"><rect x="122" y="110" width="10" height="7" rx="2" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/><rect x="88" y="107" width="34" height="13" rx="4" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/><rect x="92" y="119" width="9" height="9" rx="1.5" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/></g>
<rect x="240" y="60" width="66" height="80" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="250" y="68" width="46" height="5" fill="#84b7ec"/><rect x="250" y="78" width="46" height="5" fill="#84b7ec"/>
<rect x="246" y="94" width="4" height="14" rx="1.5" fill="#1b3a63"/>
<g class="f-eclair"><path d="M232 96 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>
<g class="f-cadenas"><path d="M255 104 v-6 a5 5 0 0 1 10 0 v6" stroke="#1b3a63" stroke-width="2.5" fill="none"/><rect x="252" y="104" width="16" height="12" rx="2" fill="#ff6b35" stroke="#1b3a63" stroke-width="2.5"/></g>
<g class="f-carte"><rect x="160" y="86" width="26" height="16" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><rect x="164" y="90" width="18" height="3.5" fill="#ff6b35"/><rect x="164" y="96" width="12" height="2" fill="#84b7ec"/></g>
<g class="f-juste"><path d="M137 74 l6 7 l12 -14" stroke="#1e7e54" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<g transform="translate(340 88)"><g class="f-resp">
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M-10 8 A10 10 0 0 1 10 8 Z" fill="#84b7ec" stroke="#1b3a63" stroke-width="2.5" stroke-linejoin="round"/><path d="M-13 8 H13" stroke="#1b3a63" stroke-width="2.5" stroke-linecap="round"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-rjg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-rjd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-rbras"><path d="M0 24 L-12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="-12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>
<g transform="translate(-22 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>`,
  css: `.film-M6 .f-bon,.film-M6 .f-resp,.film-M6 .f-jg,.film-M6 .f-jd,.film-M6 .f-rjg,.film-M6 .f-rjd,.film-M6 .f-bras,.film-M6 .f-rbras,.film-M6 .f-etoiles-r,.film-M6 .f-perceuse{transform-box:fill-box}
.film-M6 .f-jg,.film-M6 .f-rjg,.film-M6 .f-rbras{transform-origin:100% 0}.film-M6 .f-jd,.film-M6 .f-rjd,.film-M6 .f-bras{transform-origin:0 0}
.film-M6 .f-etoiles-r{transform-origin:50% 50%;animation:M6-tourne 2.2s linear infinite}
.film-M6 .f-eclair,.film-M6 .f-cheveux,.film-M6 .f-etoiles,.film-M6 .f-cordon,.film-M6 .f-carte,.film-M6 .f-cadenas,.film-M6 .f-juste,.film-M6 .f-resp{opacity:0}
@keyframes M6-tourne{to{transform:rotate(360deg)}}
.film-M6.acte-1 .f-bon{animation:M6-a1-bon 12s linear forwards}
@keyframes M6-a1-bon{0%{transform:translate(0,0)}16%{transform:translate(96px,0)}34%{transform:translate(96px,0)}50%{transform:translate(236px,0)}52%{transform:translate(232px,0)}54%{transform:translate(240px,0)}56%{transform:translate(232px,0)}58%{transform:translate(236px,0)}61%{transform:translate(218px,10px)}63%{transform:translate(200px,24px)}100%{transform:translate(200px,24px)}}
.film-M6.acte-1 .f-jg{animation:M6-a1-jg 12s linear forwards}
@keyframes M6-a1-jg{0%{transform:rotate(-22deg)}4%{transform:rotate(22deg)}8%{transform:rotate(-22deg)}12%{transform:rotate(22deg)}16%{transform:rotate(0)}34%{transform:rotate(0)}38%{transform:rotate(22deg)}42%{transform:rotate(-22deg)}46%{transform:rotate(22deg)}50%{transform:rotate(0)}58%{transform:rotate(0)}63%{transform:rotate(-110deg)}100%{transform:rotate(-110deg)}}
.film-M6.acte-1 .f-jd{animation:M6-a1-jd 12s linear forwards}
@keyframes M6-a1-jd{0%{transform:rotate(22deg)}4%{transform:rotate(-22deg)}8%{transform:rotate(22deg)}12%{transform:rotate(-22deg)}16%{transform:rotate(0)}34%{transform:rotate(0)}38%{transform:rotate(-22deg)}42%{transform:rotate(22deg)}46%{transform:rotate(-22deg)}50%{transform:rotate(0)}58%{transform:rotate(0)}63%{transform:rotate(-78deg)}100%{transform:rotate(-78deg)}}
.film-M6.acte-1 .f-bras{animation:M6-a1-bras 12s linear forwards}
@keyframes M6-a1-bras{0%,16%{transform:rotate(0)}20%{transform:rotate(-30deg)}30%{transform:rotate(-30deg)}34%{transform:rotate(0)}38%{transform:rotate(0)}46%{transform:rotate(-64deg)}58%{transform:rotate(-64deg)}63%{transform:rotate(-20deg)}100%{transform:rotate(-20deg)}}
.film-M6.acte-1 .f-cordon{animation:M6-a1-cordon 12s linear forwards}
@keyframes M6-a1-cordon{0%,16%{opacity:0}19%,100%{opacity:1}}
.film-M6.acte-1 .f-perceuse{animation:M6-a1-perceuse 12s linear forwards}
@keyframes M6-a1-perceuse{0%,21%{transform:translate(0,0)}22%{transform:translate(-1.5px,0)}23%{transform:translate(1.5px,.6px)}24%{transform:translate(-1.5px,0)}25%{transform:translate(1.5px,.6px)}26%{transform:translate(-1.5px,0)}27%{transform:translate(1.5px,.6px)}28%{transform:translate(-1.5px,0)}29%{transform:translate(1.5px,.6px)}30%,100%{transform:translate(0,0)}}
.film-M6.acte-1 .f-eclair{animation:M6-a1-eclair 12s linear forwards}
@keyframes M6-a1-eclair{0%,49%{opacity:0}50%{opacity:1}52%{opacity:.3}54%{opacity:1}56%{opacity:.3}58%{opacity:1}61%,100%{opacity:0}}
.film-M6.acte-1 .f-cheveux{animation:M6-a1-cheveux 12s linear forwards}
@keyframes M6-a1-cheveux{0%,49%{opacity:0}50%,100%{opacity:1}}
.film-M6.acte-1 .f-etoiles{animation:M6-a1-etoiles 12s linear forwards}
@keyframes M6-a1-etoiles{0%,62%{opacity:0}65%,100%{opacity:1}}
.film-M6.acte-2 .f-bon{animation:M6-a2-bon 10s linear forwards}
@keyframes M6-a2-bon{0%{transform:translateX(0)}24%{transform:translateX(96px)}52%{transform:translateX(96px)}62%,100%{transform:translateX(168px)}}
.film-M6.acte-2 .f-jg{animation:M6-a2-jg 10s linear forwards}
@keyframes M6-a2-jg{0%{transform:rotate(-22deg)}4%{transform:rotate(22deg)}8%{transform:rotate(-22deg)}12%{transform:rotate(22deg)}16%{transform:rotate(-22deg)}20%{transform:rotate(22deg)}24%{transform:rotate(0)}52%{transform:rotate(0)}54%{transform:rotate(22deg)}58%{transform:rotate(-22deg)}62%,100%{transform:rotate(0)}}
.film-M6.acte-2 .f-jd{animation:M6-a2-jd 10s linear forwards}
@keyframes M6-a2-jd{0%{transform:rotate(22deg)}4%{transform:rotate(-22deg)}8%{transform:rotate(22deg)}12%{transform:rotate(-22deg)}16%{transform:rotate(22deg)}20%{transform:rotate(-22deg)}24%{transform:rotate(0)}52%{transform:rotate(0)}54%{transform:rotate(-22deg)}58%{transform:rotate(22deg)}62%,100%{transform:rotate(0)}}
.film-M6.acte-2 .f-bras{animation:M6-a2-bras 10s linear forwards}
@keyframes M6-a2-bras{0%,24%{transform:rotate(0)}28%{transform:rotate(-30deg)}50%{transform:rotate(-30deg)}54%{transform:rotate(0)}62%{transform:rotate(0)}66%,100%{transform:rotate(-108deg)}}
.film-M6.acte-2 .f-cordon{animation:M6-a2-cordon 10s linear forwards}
@keyframes M6-a2-cordon{0%,24%{opacity:0}27%{opacity:1}86%{opacity:1}90%,100%{opacity:0}}
.film-M6.acte-2 .f-perceuse{animation:M6-a2-perceuse 10s linear forwards}
@keyframes M6-a2-perceuse{0%,29%{transform:translate(0,0)}30%{transform:translate(-1.5px,0)}32%{transform:translate(1.5px,.6px)}34%{transform:translate(-1.5px,0)}36%{transform:translate(1.5px,.6px)}38%{transform:translate(-1.5px,0)}40%{transform:translate(1.5px,.6px)}42%{transform:translate(-1.5px,0)}44%{transform:translate(1.5px,.6px)}46%{transform:translate(-1.5px,0)}48%{transform:translate(1.5px,.6px)}50%,100%{transform:translate(0,0)}}
.film-M6.acte-2 .f-resp{opacity:1;animation:M6-a2-resp 10s linear forwards}
@keyframes M6-a2-resp{0%,40%{transform:translateX(0)}56%,100%{transform:translateX(-140px)}}
.film-M6.acte-2 .f-rjg{animation:M6-a2-rjg 10s linear forwards}
@keyframes M6-a2-rjg{0%,40%{transform:rotate(0)}44%{transform:rotate(22deg)}48%{transform:rotate(-22deg)}52%{transform:rotate(22deg)}56%,100%{transform:rotate(0)}}
.film-M6.acte-2 .f-rjd{animation:M6-a2-rjd 10s linear forwards}
@keyframes M6-a2-rjd{0%,40%{transform:rotate(0)}44%{transform:rotate(-22deg)}48%{transform:rotate(22deg)}52%{transform:rotate(-22deg)}56%,100%{transform:rotate(0)}}
.film-M6.acte-2 .f-rbras{animation:M6-a2-rbras 10s linear forwards}
@keyframes M6-a2-rbras{0%,58%{transform:rotate(0)}64%{transform:rotate(108deg)}72%{transform:rotate(108deg)}78%,100%{transform:rotate(0)}}
.film-M6.acte-2 .f-carte{animation:M6-a2-carte 10s linear forwards}
@keyframes M6-a2-carte{0%,64%{opacity:0}67%,100%{opacity:1}}
.film-M6.acte-2 .f-cadenas{animation:M6-a2-cadenas 10s linear forwards}
@keyframes M6-a2-cadenas{0%,76%{opacity:0}80%,100%{opacity:1}}
.film-M6.acte-2 .f-juste{animation:M6-a2-juste 10s linear forwards}
@keyframes M6-a2-juste{0%,90%{opacity:0}93%,100%{opacity:1}}`
};
