/* ============================================================
   inerWeb HoCourant — FILM M3b : l'ordre des mesures de prévention
   Acte 1 : le bonhomme enfile seulement ses gants et travaille au
   coffret ouvert ; un collègue passe derrière lui et frôle le
   coffret : c'est LUI qui prend l'éclair, cheveux, étoiles, assis.
   Acte 2 : sectionneur coupé + cadenas (fil gris), écran isolant
   dressé devant le coffret, gants enfilés en dernier ; le collègue
   passe alors derrière l'écran sans danger.
   Règles : aucun texte ni id ; classes « f- » ; sélecteurs .film-M3b ;
   keyframes préfixés M3b- ; transform porté par le groupe parent.
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M3b = {
  titre: "Dans l'ordre : la situation, puis le bon geste",
  alt: "Acte 1 : une personne enfile ses gants et travaille dans un coffret ouvert ; un collègue qui passe derrière frôle le coffret, est secoué et se retrouve assis. Acte 2 : le levier d'un sectionneur est abaissé et cadenassé, le fil devient gris, un écran isolant se dresse devant le coffret, les gants sont enfilés en dernier, et le collègue passe alors derrière l'écran sans danger.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<path d="M40 40 v5 a4 4 0 0 0 8 0" fill="none" stroke="#1b3a63" stroke-width="2.5" stroke-linecap="round"/>
<g class="f-gants-mur"><rect x="28" y="48" width="12" height="36" rx="5" fill="#84b7ec" stroke="#1b3a63" stroke-width="2.5"/><rect x="44" y="48" width="12" height="36" rx="5" fill="#84b7ec" stroke="#1b3a63" stroke-width="2.5"/></g>
<rect x="150" y="88" width="22" height="30" rx="3" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>
<g transform="translate(161 108)"><g class="f-levier"><rect x="-2.5" y="-18" width="5" height="18" rx="2" fill="#1b3a63"/></g></g>
<g class="f-cadenas"><rect x="154" y="117" width="12" height="9" rx="2" fill="#ff6b35"/><path d="M156 117 v-4 a4 4 0 0 1 8 0 v4" fill="none" stroke="#ff6b35" stroke-width="2.2"/></g>
<g transform="translate(178 160)"><g class="f-ecran"><rect x="-4" y="-70" width="8" height="70" rx="2" fill="#e8f1fb" fill-opacity=".7" stroke="#1b3a63" stroke-width="2.5"/><rect x="-4" y="-70" width="8" height="8" rx="2" fill="#ff6b35"/></g></g>
<rect x="200" y="60" width="90" height="80" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M200 60 l-16 8 v64 l16 8" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect x="208" y="70" width="74" height="6" fill="#84b7ec"/><rect x="208" y="84" width="74" height="6" fill="#84b7ec"/>
<path class="f-fil" d="M276 100 H216 C204 100, 196 106, 188 112" stroke="#c0392b" stroke-width="4" fill="none" stroke-linecap="round"/>
<circle cx="188" cy="112" r="3.5" fill="#c0392b"/>
<g class="f-eclair"><path d="M280 82 l-6 13 h6 l-4 12 l13 -17 h-7 l5 -8z" fill="#ff6b35"/></g>
<g transform="translate(310 88)"><g class="f-col">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-cjg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-cjd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-cbras"><path d="M0 24 L-4 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="-4" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>
<g transform="translate(45 88)"><g class="f-bon">
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<circle class="f-main-g" cx="-10" cy="47" r="4" fill="#84b7ec" stroke="#1b3a63" stroke-width="2.2"/>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle class="f-main-d" cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<g class="f-gant"><rect x="7" y="45" width="10" height="9" rx="4" fill="#84b7ec" stroke="#1b3a63" stroke-width="2.2"/></g></g>
</g></g>`,
  css: `.film-M3b .f-bon,.film-M3b .f-jg,.film-M3b .f-jd,.film-M3b .f-bras,.film-M3b .f-col,
.film-M3b .f-cjg,.film-M3b .f-cjd,.film-M3b .f-cbras,.film-M3b .f-etoiles-r,
.film-M3b .f-ecran,.film-M3b .f-levier{transform-box:fill-box}
.film-M3b .f-jg,.film-M3b .f-cjg{transform-origin:100% 0}
.film-M3b .f-jd,.film-M3b .f-cjd{transform-origin:0 0}
.film-M3b .f-bras,.film-M3b .f-cbras{transform-origin:0 0}
.film-M3b .f-etoiles-r{transform-origin:50% 50%;animation:M3b-tourne 2.2s linear infinite}
.film-M3b .f-ecran{transform-origin:50% 100%;transform:translate(-95px,2px) rotate(88deg)}
.film-M3b .f-levier{transform-origin:50% 100%}
.film-M3b .f-eclair,.film-M3b .f-cheveux,.film-M3b .f-etoiles,.film-M3b .f-cadenas,.film-M3b .f-gant,.film-M3b .f-main-g{opacity:0}
@keyframes M3b-tourne{to{transform:rotate(360deg)}}
.film-M3b.acte-1 .f-gants-mur{opacity:0}
.film-M3b.acte-1 .f-main-g{opacity:1}
.film-M3b.acte-1 .f-main-d{fill:#84b7ec}
.film-M3b.acte-1 .f-bon{animation:M3b-a1-bon 12s linear forwards}
@keyframes M3b-a1-bon{0%,18%{transform:translateX(0)}40%,100%{transform:translateX(125px)}}
.film-M3b.acte-1 .f-jg{animation:M3b-pg1 .48s ease-in-out 1.8s 6 alternate}
@keyframes M3b-pg1{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
.film-M3b.acte-1 .f-jd{animation:M3b-pd1 .48s ease-in-out 1.8s 6 alternate}
@keyframes M3b-pd1{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M3b.acte-1 .f-bras{animation:M3b-a1-bras 12s linear forwards}
@keyframes M3b-a1-bras{0%,35%{transform:rotate(0)}45%,100%{transform:rotate(-70deg)}}
.film-M3b.acte-1 .f-col{animation:M3b-a1-col 12s linear forwards}
@keyframes M3b-a1-col{0%{transform:translate(0,0)}22%,30%{transform:translate(-20px,0)}46%,100%{transform:translate(-20px,16px)}}
.film-M3b.acte-1 .f-cjg{animation:M3b-a1-cjg 12s linear forwards}
@keyframes M3b-a1-cjg{0%{transform:rotate(-22deg)}8%{transform:rotate(22deg)}16%{transform:rotate(-22deg)}22%,40%{transform:rotate(0)}46%,100%{transform:rotate(-90deg)}}
.film-M3b.acte-1 .f-cjd{animation:M3b-a1-cjd 12s linear forwards}
@keyframes M3b-a1-cjd{0%{transform:rotate(22deg)}8%{transform:rotate(-22deg)}16%{transform:rotate(22deg)}22%,40%{transform:rotate(0)}46%,100%{transform:rotate(-65deg)}}
.film-M3b.acte-1 .f-cbras{animation:M3b-a1-cbras 12s linear forwards}
@keyframes M3b-a1-cbras{0%,22%{transform:rotate(0)}30%,100%{transform:rotate(60deg)}}
.film-M3b.acte-1 .f-eclair{animation:M3b-a1-eclair 12s linear forwards}
@keyframes M3b-a1-eclair{0%,39%{opacity:0}40%{opacity:1}42%{opacity:.3}44%{opacity:1}46%{opacity:.3}48%{opacity:1}52%,100%{opacity:0}}
.film-M3b.acte-1 .f-cheveux{animation:M3b-a1-cheveux 12s linear forwards}
@keyframes M3b-a1-cheveux{0%,39%{opacity:0}40%,100%{opacity:1}}
.film-M3b.acte-1 .f-etoiles{animation:M3b-a1-etoiles 12s linear forwards}
@keyframes M3b-a1-etoiles{0%,57%{opacity:0}60%,100%{opacity:1}}
.film-M3b.acte-2 .f-levier{animation:M3b-a2-levier 10s linear forwards}
@keyframes M3b-a2-levier{0%,15%{transform:rotate(0)}25%,100%{transform:rotate(78deg)}}
.film-M3b.acte-2 .f-cadenas{animation:M3b-a2-cadenas 10s linear forwards}
@keyframes M3b-a2-cadenas{0%,25%{opacity:0}28%,100%{opacity:1}}
.film-M3b.acte-2 .f-fil{animation:M3b-a2-fil 10s linear forwards}
@keyframes M3b-a2-fil{0%,26%{stroke:#c0392b}30%,100%{stroke:#9aa7b4}}
.film-M3b.acte-2 .f-ecran{animation:M3b-a2-ecran 10s linear forwards}
@keyframes M3b-a2-ecran{0%,30%{transform:translate(-95px,2px) rotate(88deg)}55%,100%{transform:translate(0,0) rotate(0)}}
.film-M3b.acte-2 .f-bon{animation:M3b-a2-bon 10s linear forwards}
@keyframes M3b-a2-bon{0%{transform:translateX(125px)}10%,28%{transform:translateX(116px)}42%,100%{transform:translateX(0)}}
.film-M3b.acte-2 .f-jg{animation:M3b-a2-jg 10s linear forwards}
@keyframes M3b-a2-jg{0%,10%{transform:rotate(0)}14%,22%{transform:rotate(-22deg)}32%,40%{transform:rotate(22deg)}100%{transform:rotate(0)}}
.film-M3b.acte-2 .f-jd{animation:M3b-a2-jd 10s linear forwards}
@keyframes M3b-a2-jd{0%,10%{transform:rotate(0)}14%,22%{transform:rotate(22deg)}32%,40%{transform:rotate(-22deg)}100%{transform:rotate(0)}}
.film-M3b.acte-2 .f-gant{animation:M3b-a2-gant 10s linear forwards}
@keyframes M3b-a2-gant{0%,72%{opacity:0}76%,100%{opacity:1}}
.film-M3b.acte-2 .f-col{animation:M3b-a2-col 10s linear forwards}
@keyframes M3b-a2-col{0%,75%{transform:translate(0,0)}100%{transform:translate(-180px,0)}}
.film-M3b.acte-2 .f-cjg{animation:M3b-a2-cjg 10s linear forwards}
@keyframes M3b-a2-cjg{0%,75%{transform:rotate(0)}82%{transform:rotate(-22deg)}90%{transform:rotate(22deg)}98%,100%{transform:rotate(0)}}
.film-M3b.acte-2 .f-cjd{animation:M3b-a2-cjd 10s linear forwards}
@keyframes M3b-a2-cjd{0%,75%{transform:rotate(0)}82%{transform:rotate(22deg)}90%{transform:rotate(-22deg)}98%,100%{transform:rotate(0)}}`
};

window.INTERACTIONS = window.INTERACTIONS || {};
INTERACTIONS.M3b = {
  arret: 4.8,
  question: "Qu'est-ce qui aurait protégé aussi le collègue ?",
  choix: [
    { t: "Couper l'alimentation, puis baliser avant de travailler", ok: true },
    { t: "Mettre des gants isolants plus épais avant de commencer", remed: "Des gants plus épais protègent la main qui les porte, pas un collègue qui passe à côté." },
    { t: "Prévenir le collègue d'un signe avant d'ouvrir le coffret", remed: "Un signe prévient une fois : il ne protège plus si le collègue revient ou ne l'a pas vu." }
  ],
  bravo: "Couper puis baliser protège toute l'équipe, pas seulement la personne qui travaille."
};
