/* ============================================================
   inerWeb HoCourant — FILM du module M2 : la coactivité
   Un dessin animé en deux actes, SVG + animations CSS.
   Acte 1 · la situation : notre bonhomme travaille près du coffret
   ouvert ; un collègue entre par la droite avec un seau d'eau, franchit
   le ruban de balisage sans le voir, le seau bascule, l'eau gicle vers
   le coffret ; le bonhomme sursaute, cheveux dressés, étoiles.
   Acte 2 · la leçon : le collègue s'arrête au ruban, le bonhomme lève
   la main, une bulle orange « ? » apparaît entre eux, le collègue
   recule et pose le seau loin du coffret, un repère complète le balisage.
   Règles : aucun texte dans le dessin ; classes préfixées « f- » ;
   sélecteurs sous .film-M2 ; l'acte se joue en posant la classe
   acte-1 ou acte-2 sur la <figure class="scene film film-M2"> ;
   aucun attribut transform sur un élément animé en CSS (le CSS
   l'écraserait) : le placement est porté par le groupe parent.
   Le seau est un groupe à part (f-seau) qui suit le collègue par les
   mêmes images-clés, pour pouvoir rester au sol quand il recule.
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M2 = {
  titre: "Coactivité : la situation, puis le bon geste",
  alt: "Acte 1 : une personne travaille près d'un coffret ouvert ; un collègue arrive avec un seau d'eau, franchit le ruban de balisage sans le regarder, le seau bascule et l'eau gicle vers le coffret ; la personne sursaute. Acte 2 : le collègue s'arrête au ruban, la personne lève la main et pose la question, le collègue recule et pose son seau loin du coffret, un repère complète le balisage.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="30" y="60" width="80" height="80" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M110 60 l16 8 v64 l-16 8" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect x="38" y="70" width="64" height="6" fill="#84b7ec"/><rect x="38" y="84" width="64" height="6" fill="#84b7ec"/>
<path d="M46 100 H82 C90 100, 96 106, 102 114" stroke="#c0392b" stroke-width="4" fill="none" stroke-linecap="round"/>
<rect x="178" y="142" width="4" height="18" fill="#1b3a63"/><rect x="214" y="142" width="4" height="18" fill="#1b3a63"/>
<rect x="180" y="148" width="36" height="8" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>
<path d="M187 148 l-4 8 M195 148 l-4 8 M203 148 l-4 8 M211 148 l-4 8" stroke="#1b3a63" stroke-width="2.5"/>
<g class="f-eclab"><path d="M170 136 C154 40, 108 20, 70 60" stroke="#ff6b35" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="165" cy="78" r="2.5" fill="#ff6b35"/><circle cx="160" cy="48" r="3" fill="#ff6b35"/><circle cx="128" cy="34" r="2.5" fill="#ff6b35"/><circle cx="98" cy="36" r="3" fill="#ff6b35"/><circle cx="80" cy="48" r="2.2" fill="#ff6b35"/></g>
<g class="f-splat"><path d="M70 60 l-9 -8 M70 60 l9 -9 M70 60 v-11" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/><circle cx="58" cy="52" r="2.2" fill="#ff6b35"/><circle cx="82" cy="50" r="2.2" fill="#ff6b35"/><circle cx="70" cy="44" r="2.5" fill="#ff6b35"/></g>
<g class="f-bulle"><rect x="168" y="40" width="36" height="34" rx="8" fill="#fffdf8" stroke="#ff6b35" stroke-width="2.5"/><path d="M176 74 L172 84 L184 74" fill="#fffdf8" stroke="#ff6b35" stroke-width="2.5" stroke-linejoin="round"/><path d="M179 52 A6 6 0 1 1 188 57.5 Q186 60 186 64" stroke="#ff6b35" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="186" cy="69" r="2" fill="#ff6b35"/></g>
<g class="f-repere"><path d="M230 116 V156" stroke="#ff6b35" stroke-width="3" stroke-dasharray="6 5" stroke-linecap="round"/><path d="M221 160 L230 138 L239 160 Z" fill="#ff6b35"/></g>
<g transform="translate(140 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<g class="f-bras-g"><path d="M0 24 L-14 40" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="-14" cy="40" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>
<g transform="translate(348 88)"><g class="f-seau"><g class="f-seau-r">
<path d="M-22 45 Q-16 35 -10 45" fill="none" stroke="#1b3a63" stroke-width="2.5" stroke-linecap="round"/>
<path d="M-24 45 H-8 L-10 58 H-22 Z" fill="#84b7ec" stroke="#1b3a63" stroke-width="2.5" stroke-linejoin="round"/>
</g></g></g>
<g transform="translate(348 88)"><g class="f-col">
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-cjg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-cjd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path d="M0 24 L-16 42" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="-16" cy="42" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
</g></g>`,
  css: `.film-M2 .f-bon,.film-M2 .f-col,.film-M2 .f-jg,.film-M2 .f-jd,.film-M2 .f-cjg,.film-M2 .f-cjd,.film-M2 .f-bras,.film-M2 .f-bras-g,.film-M2 .f-seau,.film-M2 .f-seau-r,.film-M2 .f-etoiles-r{transform-box:fill-box}
.film-M2 .f-jg,.film-M2 .f-cjg{transform-origin:100% 0}.film-M2 .f-jd,.film-M2 .f-cjd{transform-origin:0 0}
.film-M2 .f-bras{transform-origin:0 0}.film-M2 .f-bras-g{transform-origin:100% 0}.film-M2 .f-seau-r{transform-origin:50% 11%}
.film-M2 .f-etoiles-r{transform-origin:50% 50%;animation:M2-tourne 2.2s linear infinite}
.film-M2 .f-eclab,.film-M2 .f-splat,.film-M2 .f-cheveux,.film-M2 .f-etoiles,.film-M2 .f-bulle,.film-M2 .f-repere{opacity:0}
@keyframes M2-tourne{to{transform:rotate(360deg)}}
@keyframes M2-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M2-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M2.acte-1 .f-col{animation:M2-a1-col 12s linear forwards}
@keyframes M2-a1-col{0%{transform:translateX(0)}36%,100%{transform:translateX(-160px)}}
.film-M2.acte-1 .f-seau{animation:M2-a1-seau 12s linear forwards}
@keyframes M2-a1-seau{0%{transform:translateX(0)}36%,100%{transform:translateX(-160px)}}
.film-M2.acte-1 .f-cjg{animation:M2-pas-g .48s ease-in-out 9 alternate}
.film-M2.acte-1 .f-cjd{animation:M2-pas-d .48s ease-in-out 9 alternate}
.film-M2.acte-1 .f-seau-r{animation:M2-a1-seau-r 12s linear forwards}
@keyframes M2-a1-seau-r{0%,36%{transform:rotate(0)}40%,100%{transform:rotate(-60deg)}}
.film-M2.acte-1 .f-eclab{animation:M2-a1-eclab 12s linear forwards}
@keyframes M2-a1-eclab{0%,40%{opacity:0}42%,100%{opacity:1}}
.film-M2.acte-1 .f-splat{animation:M2-a1-splat 12s linear forwards}
@keyframes M2-a1-splat{0%,44%{opacity:0}46%,100%{opacity:1}}
.film-M2.acte-1 .f-bras-g{animation:M2-a1-brasg 12s linear forwards}
@keyframes M2-a1-brasg{0%,8%,24%,42%{transform:rotate(0)}16%,32%{transform:rotate(-12deg)}46%,100%{transform:rotate(110deg)}}
.film-M2.acte-1 .f-bras{animation:M2-a1-bras 12s linear forwards}
@keyframes M2-a1-bras{0%,42%{transform:rotate(0)}46%,100%{transform:rotate(-110deg)}}
.film-M2.acte-1 .f-bon{animation:M2-a1-bon 12s linear forwards}
@keyframes M2-a1-bon{0%,42%{transform:translateY(0)}45%{transform:translateY(-14px)}48%{transform:translateY(0)}50%{transform:translateY(-6px)}52%,100%{transform:translateY(0)}}
.film-M2.acte-1 .f-cheveux{animation:M2-a1-cheveux 12s linear forwards}
@keyframes M2-a1-cheveux{0%,42%{opacity:0}44%,100%{opacity:1}}
.film-M2.acte-1 .f-etoiles{animation:M2-a1-etoiles 12s linear forwards}
@keyframes M2-a1-etoiles{0%,54%{opacity:0}58%,100%{opacity:1}}
.film-M2.acte-2 .f-col{animation:M2-a2-col 10s linear forwards}
@keyframes M2-a2-col{0%{transform:translateX(0)}28%,56%{transform:translateX(-96px)}66%,82%{transform:translateX(-70px)}88%,100%{transform:translateX(-56px)}}
.film-M2.acte-2 .f-seau{animation:M2-a2-seau 10s linear forwards}
@keyframes M2-a2-seau{0%{transform:translate(0,0)}28%,56%{transform:translate(-96px,0)}66%,68%{transform:translate(-70px,0)}74%,100%{transform:translate(-70px,14px)}}
.film-M2.acte-2 .f-cjg{animation:M2-a2-cjg 10s linear forwards}
@keyframes M2-a2-cjg{0%,28%,56%,66%,82%,88%,100%{transform:rotate(0)}3%,13%,23%,62%{transform:rotate(-22deg)}8%,18%,59%,85%{transform:rotate(22deg)}}
.film-M2.acte-2 .f-cjd{animation:M2-a2-cjd 10s linear forwards}
@keyframes M2-a2-cjd{0%,28%,56%,66%,82%,88%,100%{transform:rotate(0)}3%,13%,23%,62%{transform:rotate(22deg)}8%,18%,59%,85%{transform:rotate(-22deg)}}
.film-M2.acte-2 .f-bras-g{animation:M2-a2-brasg 10s linear forwards}
@keyframes M2-a2-brasg{0%,8%,24%,100%{transform:rotate(0)}16%{transform:rotate(-12deg)}}
.film-M2.acte-2 .f-bras{animation:M2-a2-bras 10s linear forwards}
@keyframes M2-a2-bras{0%,30%{transform:rotate(0)}36%,100%{transform:rotate(-100deg)}}
.film-M2.acte-2 .f-bulle{animation:M2-a2-bulle 10s linear forwards}
@keyframes M2-a2-bulle{0%,44%{opacity:0}48%,100%{opacity:1}}
.film-M2.acte-2 .f-repere{animation:M2-a2-repere 10s linear forwards}
@keyframes M2-a2-repere{0%,76%{opacity:0}80%,100%{opacity:1}}`
};
