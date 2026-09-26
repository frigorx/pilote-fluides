/* ============================================================
   inerWeb HoCourant — FILM du module M11 : exécuter sous direction
   Un dessin animé en deux actes, SVG + animations CSS.
   Décor : une armoire ouverte à droite, fixée au mur (à gauche de
   l'intérieur, la pièce confiée ; à droite, une pièce qui n'était pas
   prévue, avec un conducteur rouge) ; au sol, deux cônes orange reliés
   par une chaîne délimitent la zone préparée ; le chargé de travaux,
   documents en main, reste à gauche du balisage.
   Acte 1 · la situation : le chargé de travaux désigne la tâche puis
   baisse le bras ; l'exécutant entre dans la zone, pose l'outil sur la
   pièce confiée, puis continue, franchit le cône et atteint la pièce
   non prévue : éclair, cheveux dressés, secousse, rejeté en arrière,
   assis par terre avec des étoiles.
   Acte 2 · la leçon : même décor ; l'exécutant s'arrête dans la zone et
   travaille sur la seule pièce confiée ; le chargé de travaux pointe la
   zone autorisée, un cadre orange l'entoure ; l'exécutant lève la main
   vers lui pour rendre compte.
   Règles : aucun texte dans le dessin ; classes préfixées « f- » ;
   sélecteurs sous .film-M11 ; l'acte se joue en posant la classe
   acte-1 ou acte-2 sur la <figure class="scene film film-M11"> ;
   aucun attribut transform sur un élément animé en CSS (le CSS
   l'écraserait) : le placement est porté par le groupe parent.
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M11 = {
  titre: "Sous direction : la zone confiée, puis le compte rendu",
  alt: "Acte 1 : un chargé de travaux désigne une zone balisée devant une armoire ouverte ; l'exécutant y entre, puis franchit le balisage pour atteindre une pièce qui n'était pas prévue, est secoué et rejeté, assis par terre. Acte 2 : le même exécutant travaille sans dépasser le balisage, sur la seule pièce confiée ; le chargé de travaux pointe la zone autorisée ; l'exécutant lève la main pour rendre compte.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="200" y="36" width="90" height="90" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M290 36 l16 8 v74 l-16 8" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect x="208" y="46" width="74" height="6" fill="#84b7ec"/><rect x="208" y="58" width="74" height="6" fill="#84b7ec"/>
<rect x="209" y="78" width="24" height="30" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<path d="M215 86 h12 M215 93 h12 M215 100 h12" stroke="#84b7ec" stroke-width="3" stroke-linecap="round"/>
<rect x="259" y="78" width="24" height="30" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>
<path class="f-cond" d="M265 100 H281" stroke="#c0392b" stroke-width="4" stroke-linecap="round"/>
<circle cx="281" cy="100" r="3.5" fill="#c0392b"/>
<g class="f-cadre"><rect x="203" y="72" width="36" height="42" rx="3" fill="none" stroke="#ff6b35" stroke-width="2.5" stroke-dasharray="5 4"/></g>
<g class="f-eclair"><path d="M270 70 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>
<path d="M124 146 Q171 154 219 146" stroke="#ff6b35" stroke-width="2.5" stroke-dasharray="6 5" fill="none" stroke-linecap="round"/>
<path d="M111 160 L118 137 L125 160 Z" fill="#ff6b35"/><path d="M218 160 L225 137 L232 160 Z" fill="#ff6b35"/>
<g transform="translate(40 88)"><g class="f-ct">
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path d="M0 48 L-9 72 M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<rect x="-17" y="42" width="13" height="16" rx="1.5" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<g class="f-bras-ct"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>
<g transform="translate(150 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<g class="f-bras-g"><path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="-10" cy="47" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><path d="M12 49 L18 62" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>`,
  css: `.film-M11 .f-bon,.film-M11 .f-jg,.film-M11 .f-jd,.film-M11 .f-bras,.film-M11 .f-bras-g,.film-M11 .f-bras-ct,.film-M11 .f-etoiles-r{transform-box:fill-box}
.film-M11 .f-jg{transform-origin:100% 0}.film-M11 .f-jd{transform-origin:0 0}.film-M11 .f-bras{transform-origin:0 0}.film-M11 .f-bras-g{transform-origin:100% 0}.film-M11 .f-bras-ct{transform-origin:0 0}
.film-M11 .f-etoiles-r{transform-origin:50% 50%;animation:M11-tourne 2.2s linear infinite}
.film-M11 .f-eclair,.film-M11 .f-cheveux,.film-M11 .f-etoiles,.film-M11 .f-cadre{opacity:0}
@keyframes M11-tourne{to{transform:rotate(360deg)}}
@keyframes M11-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M11-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M11.acte-1 .f-bras-ct{animation:M11-a1-ct 12s linear forwards}
@keyframes M11-a1-ct{0%,14%{transform:rotate(-64deg)}20%,100%{transform:rotate(0)}}
.film-M11.acte-1 .f-bon{animation:M11-a1-bon 12s linear forwards}
@keyframes M11-a1-bon{0%{transform:translate(0,0)}24%{transform:translate(40px,0)}30%{transform:translate(40px,0)}40%{transform:translate(92px,0)}42%{transform:translate(92px,0)}44%{transform:translate(88px,0)}46%{transform:translate(96px,0)}48%{transform:translate(88px,0)}50%{transform:translate(96px,0)}52%{transform:translate(92px,0)}55%{transform:translate(66px,-8px)}58%{transform:translate(35px,24px)}100%{transform:translate(35px,24px)}}
.film-M11.acte-1 .f-jg{animation:M11-a1-jg 12s linear forwards}
@keyframes M11-a1-jg{0%{transform:rotate(-22deg)}4%{transform:rotate(22deg)}8%{transform:rotate(-22deg)}12%{transform:rotate(22deg)}16%{transform:rotate(-22deg)}20%{transform:rotate(22deg)}24%{transform:rotate(0)}30%{transform:rotate(0)}32.5%{transform:rotate(22deg)}35%{transform:rotate(-22deg)}37.5%{transform:rotate(22deg)}40%{transform:rotate(0)}52%{transform:rotate(0)}58%{transform:rotate(70deg)}100%{transform:rotate(70deg)}}
.film-M11.acte-1 .f-jd{animation:M11-a1-jd 12s linear forwards}
@keyframes M11-a1-jd{0%{transform:rotate(22deg)}4%{transform:rotate(-22deg)}8%{transform:rotate(22deg)}12%{transform:rotate(-22deg)}16%{transform:rotate(22deg)}20%{transform:rotate(-22deg)}24%{transform:rotate(0)}30%{transform:rotate(0)}32.5%{transform:rotate(-22deg)}35%{transform:rotate(22deg)}37.5%{transform:rotate(-22deg)}40%{transform:rotate(0)}52%{transform:rotate(0)}58%{transform:rotate(-70deg)}100%{transform:rotate(-70deg)}}
.film-M11.acte-1 .f-bras{animation:M11-a1-bras 12s linear forwards}
@keyframes M11-a1-bras{0%,24%{transform:rotate(0)}27%,30%{transform:rotate(-100deg)}33%{transform:rotate(-50deg)}40%{transform:rotate(-85deg)}52%{transform:rotate(-85deg)}58%,100%{transform:rotate(-20deg)}}
.film-M11.acte-1 .f-eclair{animation:M11-a1-eclair 12s linear forwards}
@keyframes M11-a1-eclair{0%,40%{opacity:0}41%{opacity:1}43%{opacity:.3}45%{opacity:1}47%{opacity:.3}49%{opacity:1}53%,100%{opacity:0}}
.film-M11.acte-1 .f-cond{animation:M11-a1-cond 12s linear forwards}
@keyframes M11-a1-cond{0%,40%{stroke:#c0392b}41%,49%{stroke:#ff6b35}53%,100%{stroke:#c0392b}}
.film-M11.acte-1 .f-cheveux{animation:M11-a1-cheveux 12s linear forwards}
@keyframes M11-a1-cheveux{0%,40%{opacity:0}41%,100%{opacity:1}}
.film-M11.acte-1 .f-etoiles{animation:M11-a1-etoiles 12s linear forwards}
@keyframes M11-a1-etoiles{0%,57%{opacity:0}60%,100%{opacity:1}}
.film-M11.acte-2 .f-bon{animation:M11-a2-bon 10s linear forwards}
@keyframes M11-a2-bon{0%{transform:translateX(0)}30%,100%{transform:translateX(40px)}}
.film-M11.acte-2 .f-jg{animation:M11-pas-g .48s ease-in-out 6 alternate}
.film-M11.acte-2 .f-jd{animation:M11-pas-d .48s ease-in-out 6 alternate}
.film-M11.acte-2 .f-bras{animation:M11-a2-bras 10s linear forwards}
@keyframes M11-a2-bras{0%,30%{transform:rotate(0)}36%,42%{transform:rotate(-100deg)}45%{transform:rotate(-94deg)}48%{transform:rotate(-100deg)}51%{transform:rotate(-94deg)}54%,100%{transform:rotate(-100deg)}}
.film-M11.acte-2 .f-bras-ct{animation:M11-a2-ct 10s linear forwards}
@keyframes M11-a2-ct{0%,52%{transform:rotate(0)}57%,100%{transform:rotate(-64deg)}}
.film-M11.acte-2 .f-cadre{animation:M11-a2-cadre 10s linear forwards}
@keyframes M11-a2-cadre{0%,53%{opacity:0}58%,100%{opacity:1}}
.film-M11.acte-2 .f-bras-g{animation:M11-a2-main 10s linear forwards}
@keyframes M11-a2-main{0%,75%{transform:rotate(0)}80%,100%{transform:rotate(118deg)}}`
};
