/* ============================================================
   inerWeb HoCourant — FILM M7b : l'échelle et la ligne aérienne
   Deux actes, SVG + CSS (vague 2, corrigé). Décor : façade avec la
   ligne aérienne rouge ancrée en haut à GAUCHE seulement (coin
   supérieur gauche), jamais au-dessus du reste ; le groupe de
   climatisation à droite, à mi-hauteur.
   Acte 1 : le bonhomme dresse une échelle métallique contre la
   façade côté gauche sans lever les yeux ; le haut touche la ligne :
   éclair, cheveux dressés, il recule et finit assis, étoiles.
   Acte 2 : il lève la tête, porte l'échelle basse, pose un balisage
   (piquets, ruban) sous la ligne à gauche, puis dresse l'échelle
   appuyée contre la façade côté droit, près du groupe ; une double
   flèche orange en pointillés montre l'écart avec la ligne ; il
   monte deux échelons avant la fin.
   Aucun texte, aucun id ; classes « f- » ; sélecteurs .film-M7b ;
   aucun transform sur un élément animé en CSS. Bonhomme repris de
   films/M1.js.
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M7b = {
  titre: "L'échelle et la ligne aérienne : la situation, puis le bon geste",
  alt: "Acte 1 : une personne porte une échelle métallique jusqu'à une façade et la dresse contre le mur, côté gauche, sans lever les yeux ; le haut de l'échelle touche une ligne aérienne ancrée au coin de la façade : étincelle, cheveux dressés, la personne recule et se retrouve assise, des étoiles autour de la tête. Acte 2 : la même personne lève la tête vers la ligne, porte l'échelle basse, pose un balisage de piquets et de ruban sous la ligne, puis dresse l'échelle contre l'autre côté de la façade, près du groupe à fixer ; une double flèche orange en pointillés montre l'écart qui reste avec la ligne, et elle monte quelques échelons.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="200" y="45" width="100" height="115" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/><rect x="252" y="88" width="38" height="34" rx="3" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/><path d="M252 99 H290 M252 111 H290" stroke="#84b7ec" stroke-width="3"/>
<path d="M0 75 L201 47" stroke="#c0392b" stroke-width="3" stroke-linecap="round"/><circle cx="201" cy="47" r="3.5" fill="#c0392b"/>
<g class="f-eclair"><path d="M188 44 l-7 15.4 h7 l-4.2 14 l15.4 -19.6 h-8.4 l5.6 -9.8z" fill="#ff6b35"/></g>
<g transform="translate(15 158)"><g class="f-ech-pos"><g class="f-ech">
<path class="f-ech-rail" d="M0 -5 H113 M0 5 H113" stroke="#1b3a63" stroke-width="2.5"/><path class="f-ech-rail" d="M15 -5 V5 M40 -5 V5 M65 -5 V5 M90 -5 V5" stroke="#1b3a63" stroke-width="2"/>
</g></g></g>
<g transform="translate(30 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>
<g class="f-bali"><path d="M80 160 V140 M115 160 V140" stroke="#1b3a63" stroke-width="2.5"/><path d="M80 142 H115" stroke="#ff6b35" stroke-width="3" stroke-dasharray="6 4"/></g>
<g class="f-ecart"><path d="M207 47 H228" stroke="#ff6b35" stroke-width="2.5" stroke-dasharray="6 4"/><path d="M207 47 l7 -4 v8z M228 47 l-7 -4 v8z" fill="#ff6b35"/></g>`,
  css: `.film-M7b .f-bon,.film-M7b .f-jg,.film-M7b .f-jd,.film-M7b .f-bras,.film-M7b .f-ech-pos,.film-M7b .f-ech,.film-M7b .f-etoiles-r{transform-box:fill-box}
.film-M7b .f-jg{transform-origin:100% 0}.film-M7b .f-jd{transform-origin:0 0}.film-M7b .f-bras{transform-origin:0 0}.film-M7b .f-ech{transform-origin:0% 50%}
.film-M7b .f-etoiles-r{transform-origin:50% 50%;animation:M7b-tourne 2.2s linear infinite}
.film-M7b .f-eclair,.film-M7b .f-cheveux,.film-M7b .f-etoiles,.film-M7b .f-bali,.film-M7b .f-ecart{opacity:0}
@keyframes M7b-tourne{to{transform:rotate(360deg)}}
.film-M7b.acte-1 .f-bon{animation:M7b-a1-bon 12s linear forwards}
@keyframes M7b-a1-bon{0%{transform:translate(0,0)}24%,48%{transform:translate(130px,0)}60%,100%{transform:translate(105px,22px)}}
.film-M7b.acte-1 .f-jg{animation:M7b-a1-jg 12s linear forwards}
@keyframes M7b-a1-jg{0%{transform:rotate(-22deg)}6%{transform:rotate(22deg)}12%{transform:rotate(-22deg)}18%{transform:rotate(22deg)}24%,48%{transform:rotate(0)}60%,100%{transform:rotate(-115deg)}}
.film-M7b.acte-1 .f-jd{animation:M7b-a1-jd 12s linear forwards}
@keyframes M7b-a1-jd{0%{transform:rotate(22deg)}6%{transform:rotate(-22deg)}12%{transform:rotate(22deg)}18%{transform:rotate(-22deg)}24%,48%{transform:rotate(0)}60%,100%{transform:rotate(-62deg)}}
.film-M7b.acte-1 .f-bras{animation:M7b-a1-bras 12s linear forwards}
@keyframes M7b-a1-bras{0%,24%{transform:rotate(0)}32%,48%{transform:rotate(-92deg)}60%,100%{transform:rotate(10deg)}}
.film-M7b.acte-1 .f-ech-pos{animation:M7b-a1-ech-pos 12s linear forwards}
@keyframes M7b-a1-ech-pos{0%{transform:translate(0,0)}24%,100%{transform:translate(175px,0)}}
.film-M7b.acte-1 .f-ech{animation:M7b-a1-ech 12s linear forwards}
@keyframes M7b-a1-ech{0%,20%{transform:rotate(-100deg)}32%,44%{transform:rotate(-90deg)}60%,100%{transform:rotate(-55deg)}}
.film-M7b.acte-1 .f-ech-rail{animation:M7b-a1-rail 12s linear forwards}
@keyframes M7b-a1-rail{0%,31%{stroke:#1b3a63}32%,44%{stroke:#ff6b35}48%,100%{stroke:#1b3a63}}
.film-M7b.acte-1 .f-eclair{animation:M7b-a1-eclair 12s linear forwards}
@keyframes M7b-a1-eclair{0%,31%{opacity:0}32%{opacity:1}35%{opacity:.3}38%{opacity:1}41%{opacity:.3}44%{opacity:1}48%,100%{opacity:0}}
.film-M7b.acte-1 .f-cheveux{animation:M7b-a1-cheveux 12s linear forwards}
@keyframes M7b-a1-cheveux{0%,31%{opacity:0}32%,100%{opacity:1}}
.film-M7b.acte-1 .f-etoiles{animation:M7b-a1-etoiles 12s linear forwards}
@keyframes M7b-a1-etoiles{0%,54%{opacity:0}58%,100%{opacity:1}}
.film-M7b.acte-2 .f-bon{animation:M7b-a2-bon 10s linear forwards}
@keyframes M7b-a2-bon{0%,12%{transform:translate(0,0)}55%,80%{transform:translate(190px,0)}100%{transform:translate(212px,-42px)}}
.film-M7b.acte-2 .f-jg{animation:M7b-pas-g .48s ease-in-out 1.2s 9 alternate}
.film-M7b.acte-2 .f-jd{animation:M7b-pas-d .48s ease-in-out 1.2s 9 alternate}
@keyframes M7b-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M7b-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M7b.acte-2 .f-bras{animation:M7b-a2-bras 10s linear forwards}
@keyframes M7b-a2-bras{0%,10%{transform:rotate(-75deg)}18%,48%{transform:rotate(35deg)}60%,75%{transform:rotate(-90deg)}90%,100%{transform:rotate(-65deg)}}
.film-M7b.acte-2 .f-ech-pos{animation:M7b-a2-ech-pos 10s linear forwards}
@keyframes M7b-a2-ech-pos{0%,12%{transform:translate(0,0)}55%,100%{transform:translate(230px,0)}}
.film-M7b.acte-2 .f-ech{animation:M7b-a2-ech 10s linear forwards}
@keyframes M7b-a2-ech{0%,50%{transform:rotate(-10deg)}68%,100%{transform:rotate(-90deg)}}
.film-M7b.acte-2 .f-bali{animation:M7b-a2-bali 10s linear forwards}
@keyframes M7b-a2-bali{0%,25%{opacity:0}30%,100%{opacity:1}}
.film-M7b.acte-2 .f-ecart{animation:M7b-a2-ecart 10s linear forwards}
@keyframes M7b-a2-ecart{0%,78%{opacity:0}85%,100%{opacity:1}}`
};

window.INTERACTIONS = window.INTERACTIONS || {};
INTERACTIONS.M7b = {
  arret: 4.3,
  question: "Qu'est-ce qui a manqué avant de dresser l'échelle ?",
  choix: [
    { t: "Repérer la ligne et garder la distance", ok: true },
    { t: "Dresser l'échelle sans perdre de temps", remed: "Se dépêcher ne change rien à la présence de la ligne au-dessus de l'échelle." },
    { t: "Tenir l'échelle avec des gants isolants", remed: "Des gants isolants ne protègent pas d'un arc électrique à distance sur une échelle métallique." }
  ],
  bravo: "Lever les yeux et garder la distance protègent mieux qu'un équipement."
};
