/* ============================================================
   inerWeb HoCourant — FILM du module M9 : la consignation
   Un dessin animé en deux actes, SVG + animations CSS.
   Décor : un tableau électrique à gauche (disjoncteur à manette :
   manette en haut = en marche, en bas = à l'arrêt), un coffret ouvert
   à droite relié par un fil rouge, une deuxième personne qui arrive
   par la gauche, le sol.
   Acte 1 · la situation : le bonhomme marche jusqu'au coffret et pose la
   main sur le fil (tableau à l'arrêt, fil sombre). La deuxième personne
   arrive devant le tableau, ne voit rien et relève la manette : éclair,
   fil orange puis rouge, cheveux dressés, secousse, il retombe assis,
   étoiles autour de la tête.
   Acte 2 · la leçon : il baisse la manette, pose cadenas et étiquette,
   va au coffret ; la deuxième personne arrive, voit le cadenas, le
   montre du doigt, repart. Il fait la vérification d'absence de tension
   (appareil + coche verte), travaille, revient, retire le cadenas et
   signale la fin des travaux (bras levé, bulle avec une coche).
   Règles : aucun texte, aucun id ; classes « f- » ; sélecteurs sous
   .film-M9 ; images-clés préfixées M9- ; aucun attribut transform sur un
   élément animé (le placement est porté par le groupe parent).
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M9 = {
  titre: "Remise sous tension : la situation, puis la consignation",
  alt: "Acte 1 : une personne travaille sur le fil d'un coffret ouvert pendant qu'une autre, au fond, remet en marche le disjoncteur du tableau sans rien voir qui l'arrête ; éclair, secousse, la première retombe assise par terre. Acte 2 : la même personne baisse le disjoncteur, pose un cadenas et une étiquette, l'autre voit le cadenas, s'arrête et repart ; vérification d'absence de tension sur le fil, travail, puis retrait du cadenas et signalement de la fin des travaux.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<path class="f-fil" d="M46 26 V16 H245 V60" stroke="#c0392b" stroke-width="3" fill="none" stroke-linejoin="round"/>
<rect x="16" y="26" width="60" height="78" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="24" y="36" width="44" height="6" fill="#84b7ec"/><rect x="24" y="48" width="44" height="6" fill="#84b7ec"/>
<rect x="50" y="66" width="22" height="32" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<g transform="translate(61 82)"><g class="f-manette"><rect x="-3.5" y="-13" width="7" height="13" rx="2" fill="#1b3a63"/></g></g>
<circle cx="61" cy="82" r="3" fill="#1b3a63"/>
<g class="f-cadenas"><path d="M57 95 v-3 a4 4 0 0 1 8 0 v3" stroke="#1b3a63" stroke-width="2.5" fill="none"/><rect x="55" y="95" width="12" height="10" rx="2" fill="#ff6b35" stroke="#1b3a63" stroke-width="2"/></g>
<g class="f-etiquette"><path d="M55 98 H44" stroke="#1b3a63" stroke-width="2"/><rect x="26" y="92" width="18" height="12" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><rect x="29" y="96" width="12" height="3" fill="#ff6b35"/></g>
<rect x="200" y="60" width="90" height="80" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M200 60 l-16 8 v64 l16 8" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect x="208" y="70" width="74" height="6" fill="#84b7ec"/><rect x="208" y="84" width="74" height="6" fill="#84b7ec"/>
<path class="f-fil" d="M276 100 H216 C204 100, 196 106, 188 112" stroke="#c0392b" stroke-width="4" fill="none" stroke-linecap="round"/>
<circle class="f-bout" cx="188" cy="112" r="3.5" fill="#c0392b"/>
<g class="f-eclair"><path d="M184 96 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>
<g class="f-vat"><path d="M197 102 L190 110 M206 102 L214 101" stroke="#1b3a63" stroke-width="2" stroke-linecap="round"/><rect x="192" y="80" width="18" height="22" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><rect x="196" y="84" width="10" height="6" fill="#84b7ec"/></g>
<g class="f-juste"><circle cx="200" cy="46" r="9" fill="#fffdf8" stroke="#1e7e54" stroke-width="2.5"/><path d="M195 46 l4 4 l7 -8" stroke="#1e7e54" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<g class="f-bulle"><path d="M104 52 h34 a4 4 0 0 1 4 4 v18 a4 4 0 0 1 -4 4 h-22 l-8 8 v-8 h-4 a4 4 0 0 1 -4 -4 v-18 a4 4 0 0 1 4 -4z" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5" stroke-linejoin="round"/><path d="M113 64 l5 5 l10 -10" stroke="#1e7e54" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<g transform="translate(-40 88)"><g class="f-col">
<circle cx="0" cy="10" r="9" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-col-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-col-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-col-bras"><path d="M0 24 L-12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="-12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>
<g transform="translate(90 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<g class="f-bras-g"><path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="-10" cy="47" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>`,
  css: `.film-M9 .f-bon,.film-M9 .f-jg,.film-M9 .f-jd,.film-M9 .f-bras,.film-M9 .f-bras-g,.film-M9 .f-etoiles-r,.film-M9 .f-col,.film-M9 .f-col-jg,.film-M9 .f-col-jd,.film-M9 .f-col-bras,.film-M9 .f-manette{transform-box:fill-box}
.film-M9 .f-jg,.film-M9 .f-col-jg,.film-M9 .f-bras-g,.film-M9 .f-col-bras{transform-origin:100% 0}
.film-M9 .f-jd,.film-M9 .f-col-jd,.film-M9 .f-bras{transform-origin:0 0}
.film-M9 .f-manette{transform-origin:50% 100%}
.film-M9 .f-etoiles-r{transform-origin:50% 50%;animation:M9-tourne 2.2s linear infinite}
.film-M9 .f-eclair,.film-M9 .f-cheveux,.film-M9 .f-etoiles,.film-M9 .f-cadenas,.film-M9 .f-etiquette,.film-M9 .f-vat,.film-M9 .f-juste,.film-M9 .f-bulle{opacity:0}
@keyframes M9-tourne{to{transform:rotate(360deg)}}
@keyframes M9-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M9-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M9.acte-1 .f-bon{animation:M9-a1-bon 12s linear forwards}
@keyframes M9-a1-bon{0%{transform:translate(0,0)}24%{transform:translate(70px,0)}50%{transform:translate(70px,0)}51.5%{transform:translate(66px,0)}53%{transform:translate(74px,0)}54.5%{transform:translate(66px,0)}56%{transform:translate(74px,0)}62%{transform:translate(48px,24px)}100%{transform:translate(48px,24px)}}
.film-M9.acte-1 .f-jg{animation:M9-pas-g .48s ease-in-out 6 alternate,M9-a1-assis-g 4.6s linear 6.72s forwards}
.film-M9.acte-1 .f-jd{animation:M9-pas-d .48s ease-in-out 6 alternate,M9-a1-assis-d 4.6s linear 6.72s forwards}
@keyframes M9-a1-assis-g{0%{transform:rotate(0)}16%,100%{transform:rotate(-118deg)}}
@keyframes M9-a1-assis-d{0%{transform:rotate(0)}16%,100%{transform:rotate(-69deg)}}
.film-M9.acte-1 .f-bras{animation:M9-a1-bras 12s linear forwards}
@keyframes M9-a1-bras{0%,20%{transform:rotate(0)}28%{transform:rotate(-64deg)}50%{transform:rotate(-64deg)}56%,100%{transform:rotate(-20deg)}}
.film-M9.acte-1 .f-col{animation:M9-a1-col 12s linear forwards}
@keyframes M9-a1-col{0%,20%{transform:translateX(0)}40%,100%{transform:translateX(125px)}}
.film-M9.acte-1 .f-col-jg{animation:M9-pas-g .48s ease-in-out 5 alternate 2.4s}
.film-M9.acte-1 .f-col-jd{animation:M9-pas-d .48s ease-in-out 5 alternate 2.4s}
.film-M9.acte-1 .f-col-bras{animation:M9-a1-col-bras 12s linear forwards}
@keyframes M9-a1-col-bras{0%,44%{transform:rotate(0)}48%,100%{transform:rotate(114deg)}}
.film-M9.acte-1 .f-manette{animation:M9-a1-manette 12s linear forwards}
@keyframes M9-a1-manette{0%,49%{transform:rotate(180deg)}51%,100%{transform:rotate(0)}}
.film-M9.acte-1 .f-eclair{animation:M9-a1-eclair 12s linear forwards}
@keyframes M9-a1-eclair{0%,49.5%{opacity:0}50%{opacity:1}52%{opacity:.3}54%{opacity:1}56%{opacity:.3}58%{opacity:1}61%,100%{opacity:0}}
.film-M9.acte-1 .f-fil{animation:M9-a1-fil 12s linear forwards}
@keyframes M9-a1-fil{0%,49.5%{stroke:#1b3a63}50%,58%{stroke:#ff6b35}61%,100%{stroke:#c0392b}}
.film-M9.acte-1 .f-bout{animation:M9-a1-bout 12s linear forwards}
@keyframes M9-a1-bout{0%,49.5%{fill:#1b3a63}50%,58%{fill:#ff6b35}61%,100%{fill:#c0392b}}
.film-M9.acte-1 .f-cheveux{animation:M9-a1-cheveux 12s linear forwards}
@keyframes M9-a1-cheveux{0%,49.5%{opacity:0}50%,100%{opacity:1}}
.film-M9.acte-1 .f-etoiles{animation:M9-a1-etoiles 12s linear forwards}
@keyframes M9-a1-etoiles{0%,63%{opacity:0}66%,100%{opacity:1}}
.film-M9.acte-2 .f-bras-g{animation:M9-a2-brasg 10s linear forwards}
@keyframes M9-a2-brasg{0%{transform:rotate(0)}6%{transform:rotate(96deg)}18%{transform:rotate(96deg)}24%{transform:rotate(0)}86%{transform:rotate(0)}89%{transform:rotate(96deg)}94%{transform:rotate(96deg)}97%,100%{transform:rotate(0)}}
.film-M9.acte-2 .f-manette{animation:M9-a2-manette 10s linear forwards}
@keyframes M9-a2-manette{0%,5%{transform:rotate(0)}9%,100%{transform:rotate(180deg)}}
.film-M9.acte-2 .f-fil{animation:M9-a2-fil 10s linear forwards}
@keyframes M9-a2-fil{0%,8%{stroke:#c0392b}10%,100%{stroke:#1b3a63}}
.film-M9.acte-2 .f-bout{animation:M9-a2-bout 10s linear forwards}
@keyframes M9-a2-bout{0%,8%{fill:#c0392b}10%,100%{fill:#1b3a63}}
.film-M9.acte-2 .f-cadenas{animation:M9-a2-cadenas 10s linear forwards}
@keyframes M9-a2-cadenas{0%,14%{opacity:0}17%{opacity:1}82%{opacity:1}84%,100%{opacity:0}}
.film-M9.acte-2 .f-etiquette{animation:M9-a2-etiquette 10s linear forwards}
@keyframes M9-a2-etiquette{0%,17%{opacity:0}20%{opacity:1}82%{opacity:1}84%,100%{opacity:0}}
.film-M9.acte-2 .f-bon{animation:M9-a2-bon 10s linear forwards}
@keyframes M9-a2-bon{0%,24%{transform:translateX(0)}43%{transform:translateX(70px)}63%{transform:translateX(70px)}77%,100%{transform:translateX(0)}}
.film-M9.acte-2 .f-jg{animation:M9-pas-g .48s ease-in-out 4 alternate 2.4s,M9-pas-g .48s ease-in-out 3 alternate 6.3s}
.film-M9.acte-2 .f-jd{animation:M9-pas-d .48s ease-in-out 4 alternate 2.4s,M9-pas-d .48s ease-in-out 3 alternate 6.3s}
.film-M9.acte-2 .f-bras{animation:M9-a2-bras 10s linear forwards}
@keyframes M9-a2-bras{0%,43%{transform:rotate(0)}46%{transform:rotate(-64deg)}60%{transform:rotate(-64deg)}63%{transform:rotate(0)}86%{transform:rotate(0)}89%,100%{transform:rotate(-100deg)}}
.film-M9.acte-2 .f-vat{animation:M9-a2-vat 10s linear forwards}
@keyframes M9-a2-vat{0%,45%{opacity:0}47%{opacity:1}59%{opacity:1}61%,100%{opacity:0}}
.film-M9.acte-2 .f-juste{animation:M9-a2-juste 10s linear forwards}
@keyframes M9-a2-juste{0%,50%{opacity:0}52%{opacity:1}59%{opacity:1}61%,100%{opacity:0}}
.film-M9.acte-2 .f-col{animation:M9-a2-col 10s linear forwards}
@keyframes M9-a2-col{0%,36%{transform:translateX(0)}55%{transform:translateX(140px)}66%{transform:translateX(140px)}85%,100%{transform:translateX(0)}}
.film-M9.acte-2 .f-col-jg{animation:M9-pas-g .48s ease-in-out 4 alternate 3.6s,M9-pas-g .48s ease-in-out 4 alternate 6.6s}
.film-M9.acte-2 .f-col-jd{animation:M9-pas-d .48s ease-in-out 4 alternate 3.6s,M9-pas-d .48s ease-in-out 4 alternate 6.6s}
.film-M9.acte-2 .f-col-bras{animation:M9-a2-col-bras 10s linear forwards}
@keyframes M9-a2-col-bras{0%,56%{transform:rotate(0)}59%{transform:rotate(84deg)}63%{transform:rotate(84deg)}66%,100%{transform:rotate(0)}}
.film-M9.acte-2 .f-bulle{animation:M9-a2-bulle 10s linear forwards}
@keyframes M9-a2-bulle{0%,86%{opacity:0}89%,100%{opacity:1}}`
};
