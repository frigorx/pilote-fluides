/* ============================================================
   inerWeb HoCourant — FILM du module M4 : la limite (230 V, ce n'est pas rien)
   Un dessin animé en deux actes, SVG + animations CSS.
   Acte 1 · la situation : le bonhomme entre par la gauche, hausse les
   épaules (« du 230 V, c'est rien »), pose deux doigts sur les fils de
   la prise ouverte : éclair, cheveux dressés, secousse, projeté en
   arrière, il retombe assis, des étoiles tournent autour de sa tête.
   Acte 2 · la leçon : même décor, il s'arrête à distance, lève la main
   paume en avant, un repère se pose au sol devant la prise, un panneau
   de danger apparaît au-dessus du mur.
   Règles : aucun texte dans le dessin ; classes préfixées « f- » ;
   sélecteurs sous .film-M4 ; l'acte se joue en posant la classe
   acte-1 ou acte-2 sur la <figure class="scene film film-M4"> ;
   aucun attribut transform sur un élément animé en CSS (le CSS
   l'écraserait) : le placement est porté par le groupe parent.
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M4 = {
  titre: "Une prise ouverte : la situation, puis le bon geste",
  alt: "Acte 1 : une personne s'approche d'une prise murale ouverte, hausse les épaules, pose deux doigts sur les fils qui dépassent, est secouée, projetée en arrière et retombe assise, des étoiles autour de la tête. Acte 2 : la même personne s'arrête à distance de la prise, lève la main paume en avant, un repère est posé au sol devant la prise et un panneau de danger apparaît au-dessus du mur.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="200" y="48" width="120" height="112" fill="#e8f1fb"/>
<rect x="200" y="150" width="120" height="10" fill="#fffdf8"/>
<path d="M200 160 V48 H320 M200 150 H320" fill="none" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="212" y="90" width="44" height="44" rx="5" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<circle cx="234" cy="112" r="13" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>
<path class="f-fil" d="M230 109 H208 C198 109, 192 106, 184 108" stroke="#c0392b" stroke-width="4" fill="none" stroke-linecap="round"/>
<path class="f-fil" d="M230 115 H208 C198 115, 192 119, 184 116" stroke="#c0392b" stroke-width="4" fill="none" stroke-linecap="round"/>
<circle cx="184" cy="108" r="3" fill="#c0392b"/><circle cx="184" cy="116" r="3" fill="#c0392b"/>
<g class="f-eclair"><path d="M182 92 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>
<g class="f-repere"><path d="M160 114 V156" stroke="#ff6b35" stroke-width="3" stroke-dasharray="6 5" stroke-linecap="round"/><path d="M151 160 L160 138 L169 160 Z" fill="#ff6b35"/></g>
<g class="f-panneau"><path d="M234 12 L253 44 H215 Z" fill="#fff4e0" stroke="#1b3a63" stroke-width="2.5" stroke-linejoin="round"/><path d="M234 20 l-4 8.8 h4 l-2.4 8 l8.8 -11.2 h-4.8 l3.2 -5.6z" fill="#ff6b35"/></g>
<g transform="translate(30 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<g class="f-bras-g"><path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="-10" cy="47" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/><path class="f-doigts" d="M14.3 47.9 l3.4 7.2 M9.7 50.1 l3.4 7.2" stroke="#1b3a63" stroke-width="2.5" stroke-linecap="round"/></g>
</g></g>`,
  css: `.film-M4 .f-bon,.film-M4 .f-jg,.film-M4 .f-jd,.film-M4 .f-bras,.film-M4 .f-bras-g,.film-M4 .f-etoiles-r{transform-box:fill-box}
.film-M4 .f-jg{transform-origin:100% 0}.film-M4 .f-jd{transform-origin:0 0}.film-M4 .f-bras{transform-origin:0 0}.film-M4 .f-bras-g{transform-origin:100% 0}
.film-M4 .f-etoiles-r{transform-origin:50% 50%;animation:M4-tourne 2.2s linear infinite}
.film-M4 .f-eclair,.film-M4 .f-cheveux,.film-M4 .f-etoiles,.film-M4 .f-repere,.film-M4 .f-panneau{opacity:0}
@keyframes M4-tourne{to{transform:rotate(360deg)}}
@keyframes M4-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M4-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M4.acte-1 .f-bon{animation:M4-a1-bon 12s linear forwards}
@keyframes M4-a1-bon{0%{transform:translate(0,0)}28%{transform:translate(120px,0)}30%{transform:translate(120px,-3px)}33%{transform:translate(120px,0)}40%{transform:translate(120px,0)}42%{transform:translate(116px,0)}44%{transform:translate(124px,0)}46%{transform:translate(116px,0)}48%{transform:translate(124px,0)}50%{transform:translate(120px,0)}54%{transform:translate(85px,-6px)}58%{transform:translate(50px,24px)}100%{transform:translate(50px,24px)}}
.film-M4.acte-1 .f-jg{animation:M4-pas-g .48s ease-in-out 7 alternate,M4-a1-jg .5s linear 6s forwards}
.film-M4.acte-1 .f-jd{animation:M4-pas-d .48s ease-in-out 7 alternate,M4-a1-jd .5s linear 6s forwards}
@keyframes M4-a1-jg{from{transform:rotate(0)}to{transform:rotate(-110deg)}}
@keyframes M4-a1-jd{from{transform:rotate(0)}to{transform:rotate(-75deg)}}
.film-M4.acte-1 .f-bras{animation:M4-a1-bras 12s linear forwards}
@keyframes M4-a1-bras{0%,28%{transform:rotate(0)}31%{transform:rotate(-40deg)}34%{transform:rotate(-40deg)}40%{transform:rotate(-64deg)}50%{transform:rotate(-64deg)}54%{transform:rotate(-95deg)}58%{transform:rotate(-40deg)}100%{transform:rotate(-40deg)}}
.film-M4.acte-1 .f-bras-g{animation:M4-a1-bras-g 12s linear forwards}
@keyframes M4-a1-bras-g{0%,28%{transform:rotate(0)}31%{transform:rotate(40deg)}34%{transform:rotate(40deg)}38%{transform:rotate(0)}50%{transform:rotate(0)}54%{transform:rotate(70deg)}58%{transform:rotate(20deg)}100%{transform:rotate(20deg)}}
.film-M4.acte-1 .f-eclair{animation:M4-a1-eclair 12s linear forwards}
@keyframes M4-a1-eclair{0%,39%{opacity:0}40%{opacity:1}42%{opacity:.3}44%{opacity:1}46%{opacity:.3}48%{opacity:1}51%,100%{opacity:0}}
.film-M4.acte-1 .f-fil{animation:M4-a1-fil 12s linear forwards}
@keyframes M4-a1-fil{0%,39%{stroke:#c0392b}40%,48%{stroke:#ff6b35}51%,100%{stroke:#c0392b}}
.film-M4.acte-1 .f-cheveux{animation:M4-a1-cheveux 12s linear forwards}
@keyframes M4-a1-cheveux{0%,39%{opacity:0}40%,100%{opacity:1}}
.film-M4.acte-1 .f-etoiles{animation:M4-a1-etoiles 12s linear forwards}
@keyframes M4-a1-etoiles{0%,57%{opacity:0}60%,100%{opacity:1}}
.film-M4.acte-2 .f-bon{animation:M4-a2-bon 10s linear forwards}
@keyframes M4-a2-bon{0%{transform:translateX(0)}30%,100%{transform:translateX(72px)}}
.film-M4.acte-2 .f-jg{animation:M4-pas-g .48s ease-in-out 6 alternate}
.film-M4.acte-2 .f-jd{animation:M4-pas-d .48s ease-in-out 6 alternate}
.film-M4.acte-2 .f-doigts{opacity:0}
.film-M4.acte-2 .f-bras{animation:M4-a2-bras 10s linear forwards}
@keyframes M4-a2-bras{0%,30%{transform:rotate(0)}40%,100%{transform:rotate(-120deg)}}
.film-M4.acte-2 .f-repere{animation:M4-a2-repere 10s linear forwards}
@keyframes M4-a2-repere{0%,52%{opacity:0}58%,100%{opacity:1}}
.film-M4.acte-2 .f-panneau{animation:M4-a2-panneau 10s linear forwards}
@keyframes M4-a2-panneau{0%,72%{opacity:0}78%,100%{opacity:1}}`
};
