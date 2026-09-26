/* ============================================================
   inerWeb HoCourant — FILM du module M3 : le bon gant
   Un dessin animé en deux actes, SVG + animations CSS.
   Décor : un établi bas, une paire de gants isolants pendue à un
   crochet au mur, un coffret ouvert avec un fil rouge qui dépasse,
   un écran isolant posé au sol contre le coffret.
   Acte 1 · la situation : le bonhomme entre, décroche les gants sans
   les regarder, enfile le premier (un trou orange marque l'index),
   avance quand même la main vers le fil : éclair à travers le trou,
   cheveux dressés, secousse, bond en arrière, assis par terre,
   étoiles autour de la tête.
   Acte 2 · la leçon : même établi. Il décroche les gants, les étire
   devant lui trois fois (doigt par doigt), rien ne s'allume : un
   « juste » vert, ils sont sains. Il les enfile, l'écran isolant se
   dresse devant le coffret, la main avance derrière l'écran, un
   repère orange marque l'écran en place.
   Règles : aucun texte dans le dessin ; classes préfixées « f- » ;
   sélecteurs sous .film-M3 ; l'acte se joue en posant la classe
   acte-1 ou acte-2 sur la <figure class="scene film film-M3"> ;
   aucun attribut transform sur un élément animé en CSS (le CSS
   l'écraserait) : le placement est porté par le groupe parent.
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M3 = {
  titre: "Le bon gant : la situation, puis le bon geste",
  alt: "Acte 1 : une personne décroche des gants isolants sans les regarder, en enfile un troué à l'index, touche un fil dénudé, est secouée et se retrouve assise par terre. Acte 2 : la même personne étire les gants doigt par doigt, ils sont sains, les enfile, dresse un écran isolant devant le coffret et avance la main derrière l'écran ; un repère orange marque l'écran en place.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="20" y="130" width="48" height="6" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M27 136 V160 M61 136 V160" stroke="#1b3a63" stroke-width="2.5" stroke-linecap="round"/>
<path d="M118 38 v6 a4 4 0 0 0 8 0" fill="none" stroke="#1b3a63" stroke-width="2.5" stroke-linecap="round"/>
<g class="f-gants-mur"><rect x="106" y="48" width="12" height="38" rx="5" fill="#84b7ec" stroke="#1b3a63" stroke-width="2.5"/><path d="M106 58 h12 M107 68 l-5 8" stroke="#1b3a63" stroke-width="2.5" stroke-linecap="round"/><rect x="122" y="48" width="12" height="38" rx="5" fill="#84b7ec" stroke="#1b3a63" stroke-width="2.5"/><path d="M122 58 h12 M133 68 l5 8" stroke="#1b3a63" stroke-width="2.5" stroke-linecap="round"/></g>
<rect x="200" y="60" width="90" height="80" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M200 60 l-16 8 v64 l16 8" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect x="208" y="70" width="74" height="6" fill="#84b7ec"/><rect x="208" y="84" width="74" height="6" fill="#84b7ec"/>
<path class="f-fil" d="M276 100 H216 C204 100, 196 106, 188 112" stroke="#c0392b" stroke-width="4" fill="none" stroke-linecap="round"/>
<circle cx="188" cy="112" r="3.5" fill="#c0392b"/>
<g class="f-eclair"><path d="M184 96 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>
<g transform="translate(-26 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g transform="translate(24 16)"><g class="f-tenus"><g class="f-etire"><rect x="0" y="0" width="26" height="9" rx="4" fill="#84b7ec" stroke="#1b3a63" stroke-width="2.5"/><path d="M8 0 v9 M20 8 l4 5" stroke="#1b3a63" stroke-width="2.5" stroke-linecap="round"/><rect x="0" y="13" width="26" height="9" rx="4" fill="#84b7ec" stroke="#1b3a63" stroke-width="2.5"/><path d="M8 13 v9 M20 14 l4 -5" stroke="#1b3a63" stroke-width="2.5" stroke-linecap="round"/></g></g></g>
<g class="f-juste"><path d="M50 10 l5 5 l10 -12" fill="none" stroke="#1e7e54" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></g>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<g transform="rotate(-26 12 49)"><g class="f-gant"><rect x="7" y="40" width="10" height="18" rx="4" fill="#84b7ec" stroke="#1b3a63" stroke-width="2.5"/><path d="M7 45 h10 M8 52 l-5 4" stroke="#1b3a63" stroke-width="2.5" stroke-linecap="round"/><g class="f-trou"><circle cx="14" cy="55" r="2.2" fill="#ff6b35"/></g></g></g></g>
</g></g>
<g transform="translate(176 160)"><g class="f-ecran"><rect x="-4" y="-70" width="8" height="70" rx="2" fill="#e8f1fb" fill-opacity=".7" stroke="#1b3a63" stroke-width="2.5"/><g class="f-repere"><rect x="-4" y="-70" width="8" height="8" rx="2" fill="#ff6b35"/><path d="M-18 0 L-11 -14 L-4 0 Z" fill="#ff6b35"/></g></g></g>`,
  css: `.film-M3 .f-bon,.film-M3 .f-jg,.film-M3 .f-jd,.film-M3 .f-bras,.film-M3 .f-etoiles-r,.film-M3 .f-trou,.film-M3 .f-etire,.film-M3 .f-ecran{transform-box:fill-box}
.film-M3 .f-jg{transform-origin:100% 0}.film-M3 .f-jd{transform-origin:0 0}.film-M3 .f-bras{transform-origin:0 0}
.film-M3 .f-trou{transform-origin:50% 50%}.film-M3 .f-etire{transform-origin:0 50%}.film-M3 .f-ecran{transform-origin:50% 100%;transform:translateX(126px) rotate(-24deg)}
.film-M3 .f-etoiles-r{transform-origin:50% 50%;animation:M3-tourne 2.2s linear infinite}
.film-M3 .f-eclair,.film-M3 .f-cheveux,.film-M3 .f-etoiles,.film-M3 .f-gant,.film-M3 .f-trou,.film-M3 .f-tenus,.film-M3 .f-juste,.film-M3 .f-repere{opacity:0}
@keyframes M3-tourne{to{transform:rotate(360deg)}}
.film-M3.acte-1 .f-bon{animation:M3-a1-bon 12s linear forwards}
@keyframes M3-a1-bon{0%{transform:translate(0,0)}16%{transform:translate(126px,0)}24%{transform:translate(126px,0)}36%{transform:translate(186px,0)}41%{transform:translate(186px,0)}42%{transform:translate(182px,0)}44%{transform:translate(190px,0)}46%{transform:translate(182px,0)}48%{transform:translate(190px,0)}49%{transform:translate(186px,0)}51%{transform:translate(150px,-18px)}53%{transform:translate(136px,15px)}100%{transform:translate(136px,15px)}}
.film-M3.acte-1 .f-jg{animation:M3-a1-jg 12s linear forwards}
@keyframes M3-a1-jg{0%{transform:rotate(-22deg)}4%{transform:rotate(22deg)}8%{transform:rotate(-22deg)}12%{transform:rotate(22deg)}16%{transform:rotate(-22deg)}18%{transform:rotate(0)}24%{transform:rotate(0)}28%{transform:rotate(22deg)}32%{transform:rotate(-22deg)}36%{transform:rotate(22deg)}38%{transform:rotate(0)}49%{transform:rotate(0)}53%{transform:rotate(-90deg)}100%{transform:rotate(-90deg)}}
.film-M3.acte-1 .f-jd{animation:M3-a1-jd 12s linear forwards}
@keyframes M3-a1-jd{0%{transform:rotate(22deg)}4%{transform:rotate(-22deg)}8%{transform:rotate(22deg)}12%{transform:rotate(-22deg)}16%{transform:rotate(22deg)}18%{transform:rotate(0)}24%{transform:rotate(0)}28%{transform:rotate(-22deg)}32%{transform:rotate(22deg)}36%{transform:rotate(-22deg)}38%{transform:rotate(0)}49%{transform:rotate(0)}53%{transform:rotate(-70deg)}100%{transform:rotate(-70deg)}}
.film-M3.acte-1 .f-bras{animation:M3-a1-bras 12s linear forwards}
@keyframes M3-a1-bras{0%,16%{transform:rotate(0)}19%{transform:rotate(-110deg)}21%{transform:rotate(-110deg)}24%{transform:rotate(-10deg)}36%{transform:rotate(-10deg)}40%{transform:rotate(-64deg)}49%{transform:rotate(-64deg)}53%{transform:rotate(-40deg)}100%{transform:rotate(-40deg)}}
.film-M3.acte-1 .f-gants-mur{animation:M3-a1-gants-mur 12s linear forwards}
@keyframes M3-a1-gants-mur{0%,19%{opacity:1}20%,100%{opacity:0}}
.film-M3.acte-1 .f-gant{animation:M3-a1-gant 12s linear forwards}
@keyframes M3-a1-gant{0%,19%{opacity:0}20%,100%{opacity:1}}
.film-M3.acte-1 .f-trou{animation:M3-a1-trou 12s linear forwards}
@keyframes M3-a1-trou{0%,19%{opacity:0;transform:scale(1)}20%{opacity:1;transform:scale(1)}41%{transform:scale(1)}42%{transform:scale(2.4)}44%{transform:scale(1.2)}46%{transform:scale(2.4)}48%{transform:scale(1.2)}50%{transform:scale(1)}100%{opacity:1;transform:scale(1)}}
.film-M3.acte-1 .f-eclair{animation:M3-a1-eclair 12s linear forwards}
@keyframes M3-a1-eclair{0%,40%{opacity:0}41%{opacity:1}43%{opacity:.3}45%{opacity:1}47%{opacity:.3}49%{opacity:1}51%,100%{opacity:0}}
.film-M3.acte-1 .f-fil{animation:M3-a1-fil 12s linear forwards}
@keyframes M3-a1-fil{0%,40%{stroke:#c0392b}41%,49%{stroke:#ff6b35}51%,100%{stroke:#c0392b}}
.film-M3.acte-1 .f-cheveux{animation:M3-a1-cheveux 12s linear forwards}
@keyframes M3-a1-cheveux{0%,40%{opacity:0}41%,100%{opacity:1}}
.film-M3.acte-1 .f-etoiles{animation:M3-a1-etoiles 12s linear forwards}
@keyframes M3-a1-etoiles{0%,52%{opacity:0}55%,100%{opacity:1}}
.film-M3.acte-2 .f-bon{animation:M3-a2-bon 10s linear forwards}
@keyframes M3-a2-bon{0%{transform:translateX(0)}20%{transform:translateX(126px)}46%{transform:translateX(126px)}58%,100%{transform:translateX(174px)}}
.film-M3.acte-2 .f-jg{animation:M3-a2-jg 10s linear forwards}
@keyframes M3-a2-jg{0%{transform:rotate(-22deg)}4%{transform:rotate(22deg)}8%{transform:rotate(-22deg)}12%{transform:rotate(22deg)}16%{transform:rotate(-22deg)}20%{transform:rotate(0)}46%{transform:rotate(0)}49%{transform:rotate(22deg)}52%{transform:rotate(-22deg)}55%{transform:rotate(22deg)}58%,100%{transform:rotate(0)}}
.film-M3.acte-2 .f-jd{animation:M3-a2-jd 10s linear forwards}
@keyframes M3-a2-jd{0%{transform:rotate(22deg)}4%{transform:rotate(-22deg)}8%{transform:rotate(22deg)}12%{transform:rotate(-22deg)}16%{transform:rotate(22deg)}20%{transform:rotate(0)}46%{transform:rotate(0)}49%{transform:rotate(-22deg)}52%{transform:rotate(22deg)}55%{transform:rotate(-22deg)}58%,100%{transform:rotate(0)}}
.film-M3.acte-2 .f-bras{animation:M3-a2-bras 10s linear forwards}
@keyframes M3-a2-bras{0%,20%{transform:rotate(0)}24%{transform:rotate(-110deg)}26%{transform:rotate(-110deg)}30%{transform:rotate(-50deg)}44%{transform:rotate(-50deg)}47%{transform:rotate(-10deg)}64%{transform:rotate(-10deg)}70%,100%{transform:rotate(-64deg)}}
.film-M3.acte-2 .f-gants-mur{animation:M3-a2-gants-mur 10s linear forwards}
@keyframes M3-a2-gants-mur{0%,24%{opacity:1}25%,100%{opacity:0}}
.film-M3.acte-2 .f-tenus{animation:M3-a2-tenus 10s linear forwards}
@keyframes M3-a2-tenus{0%,27%{opacity:0}29%,44%{opacity:1}46%,100%{opacity:0}}
.film-M3.acte-2 .f-etire{animation:M3-a2-etire 10s linear forwards}
@keyframes M3-a2-etire{0%,30%{transform:scaleX(1)}32%{transform:scaleX(1.3)}34%{transform:scaleX(1)}36%{transform:scaleX(1.3)}38%{transform:scaleX(1)}40%{transform:scaleX(1.3)}42%,100%{transform:scaleX(1)}}
.film-M3.acte-2 .f-juste{animation:M3-a2-juste 10s linear forwards}
@keyframes M3-a2-juste{0%,41%{opacity:0}43%,47%{opacity:1}50%,100%{opacity:0}}
.film-M3.acte-2 .f-gant{animation:M3-a2-gant 10s linear forwards}
@keyframes M3-a2-gant{0%,45%{opacity:0}47%,100%{opacity:1}}
.film-M3.acte-2 .f-ecran{animation:M3-a2-ecran 10s linear forwards}
@keyframes M3-a2-ecran{0%,58%{transform:translateX(126px) rotate(-24deg)}61%{transform:translate(60px,-26px) rotate(-10deg)}64%,100%{transform:translate(0,0) rotate(0)}}
.film-M3.acte-2 .f-repere{animation:M3-a2-repere 10s linear forwards}
@keyframes M3-a2-repere{0%,74%{opacity:0}78%,100%{opacity:1}}`
};
