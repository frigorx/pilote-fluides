/* ============================================================
   inerWeb HoCourant — FILM du module M12 : après l'accident, protéger d'abord
   Un dessin animé en deux actes, SVG + animations CSS.
   Décor : une victime au sol, la main sur un fil rouge dénudé qui sort
   d'un coffret ouvert (à droite) ; un coffret avec disjoncteur à levier
   (à gauche) ; un téléphone (caché au repos).
   Acte 1 · la situation : le secouriste entre en courant, saisit le bras
   de la victime : éclair, cheveux dressés, secousse, il tombe assis à
   côté d'elle, étoiles autour de la tête. Deux victimes.
   Acte 2 · la leçon : il s'arrête à distance, désigne le coffret d'où
   vient le fil, va baisser le levier du disjoncteur (le fil cesse d'être
   rouge), un repère orange marque la coupure, il s'approche de la
   victime, le téléphone apparaît au-dessus de lui pour l'appel.
   Règles : aucun texte, aucun id ; classes « f- » ; sélecteurs sous
   .film-M12 ; keyframes « M12- » ; aucun attribut transform sur un
   élément animé (placement par le groupe parent).
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M12 = {
  titre: "Après l'accident : protéger d'abord, sans toucher",
  alt: "Acte 1 : une personne est au sol, la main sur un fil dénudé sous tension ; un secouriste arrive en courant, lui saisit le bras, est secoué et tombe assis à côté d'elle. Acte 2 : le secouriste s'arrête à distance, désigne le coffret d'où vient le fil, baisse le levier du disjoncteur, un repère orange marque la coupure, puis il s'approche et un téléphone apparaît pour l'appel des secours.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="18" y="64" width="44" height="64" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="24" y="70" width="32" height="5" fill="#84b7ec"/><rect x="24" y="79" width="32" height="5" fill="#84b7ec"/>
<g transform="translate(57 104)"><g class="f-levier"><rect x="-3" y="-18" width="6" height="18" rx="2" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/><circle cx="0" cy="-16" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/></g><circle cx="0" cy="0" r="3" fill="#1b3a63"/></g>
<g class="f-repere"><path d="M36 118 V152" stroke="#ff6b35" stroke-width="3" stroke-dasharray="6 5" stroke-linecap="round"/><path d="M27 160 L36 138 L45 160 Z" fill="#ff6b35"/></g>
<rect x="232" y="56" width="74" height="84" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M232 56 l-16 8 v68 l16 8" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect x="240" y="66" width="58" height="6" fill="#84b7ec"/><rect x="240" y="80" width="58" height="6" fill="#84b7ec"/>
<path class="f-fil" d="M292 100 H236 C222 100, 216 116, 208 130 L198 140" stroke="#c0392b" stroke-width="4" fill="none" stroke-linecap="round"/>
<circle class="f-fil-bout" cx="198" cy="140" r="3.5" fill="#c0392b"/>
<circle cx="150" cy="151" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M159 152 L186 153" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path d="M186 153 L212 157 M186 153 L210 148" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M166 151 L190 142" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="192" cy="142" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M168 152 L146 128" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="146" cy="128" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<g class="f-tel"><rect x="104" y="56" width="16" height="26" rx="3" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/><rect x="107" y="60" width="10" height="15" fill="#fffdf8"/><path d="M124 62 a8 8 0 0 1 0 14 M129 57 a13 13 0 0 1 0 24" stroke="#1b3a63" stroke-width="2" fill="none" stroke-linecap="round"/></g>
<g transform="translate(-30 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>
<g class="f-eclair"><path d="M152 100 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>`,
  css: `.film-M12 .f-bon,.film-M12 .f-jg,.film-M12 .f-jd,.film-M12 .f-bras,.film-M12 .f-etoiles-r,.film-M12 .f-levier{transform-box:fill-box}
.film-M12 .f-jg{transform-origin:100% 0}.film-M12 .f-jd{transform-origin:0 0}.film-M12 .f-bras{transform-origin:0 0}
.film-M12 .f-levier{transform-origin:50% 100%}
.film-M12 .f-etoiles-r{transform-origin:50% 50%;animation:M12-tourne 2.2s linear infinite}
.film-M12 .f-eclair,.film-M12 .f-cheveux,.film-M12 .f-etoiles,.film-M12 .f-repere,.film-M12 .f-tel{opacity:0}
@keyframes M12-tourne{to{transform:rotate(360deg)}}
@keyframes M12-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M12-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
@keyframes M12-course-g{from{transform:rotate(-32deg)}to{transform:rotate(32deg)}}
@keyframes M12-course-d{from{transform:rotate(32deg)}to{transform:rotate(-32deg)}}
.film-M12.acte-1 .f-bon{animation:M12-a1-bon 12s linear forwards}
@keyframes M12-a1-bon{0%{transform:translate(0,0)}22%{transform:translate(153px,0)}33%{transform:translate(153px,0)}35%{transform:translate(149px,0)}37%{transform:translate(157px,0)}39%{transform:translate(149px,0)}41%{transform:translate(157px,0)}43%{transform:translate(153px,0)}52%{transform:translate(133px,24px)}100%{transform:translate(133px,24px)}}
.film-M12.acte-1 .f-jg{animation:M12-a1-jg 12s linear forwards,M12-course-g .33s ease-in-out 8 alternate}
.film-M12.acte-1 .f-jd{animation:M12-a1-jd 12s linear forwards,M12-course-d .33s ease-in-out 8 alternate}
@keyframes M12-a1-jg{0%,43%{transform:rotate(0)}52%,100%{transform:rotate(-100deg)}}
@keyframes M12-a1-jd{0%,43%{transform:rotate(0)}52%,100%{transform:rotate(-69deg)}}
.film-M12.acte-1 .f-bras{animation:M12-a1-bras 12s linear forwards}
@keyframes M12-a1-bras{0%,22%{transform:rotate(0)}32%{transform:rotate(-29deg)}43%{transform:rotate(-29deg)}52%,100%{transform:rotate(-6deg)}}
.film-M12.acte-1 .f-eclair{animation:M12-a1-eclair 12s linear forwards}
@keyframes M12-a1-eclair{0%,31%{opacity:0}32%{opacity:1}34%{opacity:.3}36%{opacity:1}38%{opacity:.3}40%{opacity:1}44%,100%{opacity:0}}
.film-M12.acte-1 .f-cheveux{animation:M12-a1-cheveux 12s linear forwards}
@keyframes M12-a1-cheveux{0%,31%{opacity:0}32%,100%{opacity:1}}
.film-M12.acte-1 .f-etoiles{animation:M12-a1-etoiles 12s linear forwards}
@keyframes M12-a1-etoiles{0%,52%{opacity:0}55%,100%{opacity:1}}
.film-M12.acte-2 .f-bon{animation:M12-a2-bon 10s linear forwards}
@keyframes M12-a2-bon{0%{transform:translateX(0)}16%{transform:translateX(130px)}34%{transform:translateX(130px)}46%{transform:translateX(100px)}60%{transform:translateX(100px)}72%{transform:translateX(136px)}100%{transform:translateX(136px)}}
.film-M12.acte-2 .f-jg{animation:M12-pas-g .4s ease-in-out 4 alternate,M12-pas-g .4s ease-in-out 3.4s 3 alternate,M12-pas-g .4s ease-in-out 6s 3 alternate}
.film-M12.acte-2 .f-jd{animation:M12-pas-d .4s ease-in-out 4 alternate,M12-pas-d .4s ease-in-out 3.4s 3 alternate,M12-pas-d .4s ease-in-out 6s 3 alternate}
.film-M12.acte-2 .f-bras{animation:M12-a2-bras 10s linear forwards}
@keyframes M12-a2-bras{0%,14%{transform:rotate(0)}18%{transform:rotate(-74deg)}34%{transform:rotate(-74deg)}38%{transform:rotate(0)}44%{transform:rotate(0)}48%{transform:rotate(-186deg)}54%{transform:rotate(-186deg)}58%{transform:rotate(0)}72%{transform:rotate(0)}78%,100%{transform:rotate(-140deg)}}
.film-M12.acte-2 .f-levier{animation:M12-a2-levier 10s linear forwards}
@keyframes M12-a2-levier{0%,48%{transform:rotate(0)}52%,100%{transform:rotate(180deg)}}
.film-M12.acte-2 .f-fil{animation:M12-a2-fil 10s linear forwards}
@keyframes M12-a2-fil{0%,52%{stroke:#c0392b}54%,100%{stroke:#1b3a63}}
.film-M12.acte-2 .f-fil-bout{animation:M12-a2-fil-bout 10s linear forwards}
@keyframes M12-a2-fil-bout{0%,52%{fill:#c0392b}54%,100%{fill:#1b3a63}}
.film-M12.acte-2 .f-repere{animation:M12-a2-repere 10s linear forwards}
@keyframes M12-a2-repere{0%,58%{opacity:0}61%,100%{opacity:1}}
.film-M12.acte-2 .f-tel{animation:M12-a2-tel 10s linear forwards}
@keyframes M12-a2-tel{0%,74%{opacity:0}77%,100%{opacity:1}}`
};
