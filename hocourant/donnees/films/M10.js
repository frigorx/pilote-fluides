/* ============================================================
   inerWeb HoCourant — FILM du module M10 : le disjoncteur qui retombe
   Un dessin animé en deux actes, SVG + animations CSS.
   Acte 1 · la situation : le bonhomme entre, relève la manette du
   disjoncteur, elle retombe ; deux fois, trois fois ; à la troisième,
   éclair orange, cheveux dressés, secousse, projeté en arrière, assis
   par terre, étoiles autour de la tête.
   Acte 2 · la leçon : même tableau ; deux essais, la manette retombe ;
   il recule, lève la main et ne touche plus rien ; téléphone à l'oreille,
   une bulle orange avec un point d'exclamation au-dessus du tableau :
   le compte rendu.
   Règles : aucun texte dans le dessin ; classes préfixées « f- » ;
   sélecteurs sous .film-M10 ; l'acte se joue en posant la classe
   acte-1 ou acte-2 sur la <figure class="scene film film-M10"> ;
   aucun attribut transform sur un élément animé en CSS (le CSS
   l'écraserait) : le placement est porté par le groupe parent.
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M10 = {
  titre: "Le disjoncteur qui retombe : deux essais, puis on rend compte",
  alt: "Acte 1 : une personne relève trois fois la manette d'un disjoncteur qui retombe ; à la troisième, un éclair jaillit du tableau et la projette assise par terre. Acte 2 : la même personne relève la manette deux fois, s'arrête, recule, lève la main, appelle son responsable et rend compte.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="208" y="52" width="90" height="88" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="216" y="60" width="74" height="6" fill="#84b7ec"/><rect x="216" y="70" width="74" height="6" fill="#84b7ec"/>
<rect class="f-disj" x="216" y="82" width="26" height="38" rx="3" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>
<g transform="translate(229 100)"><g class="f-manette"><path d="M0 0 V15" stroke="#1b3a63" stroke-width="4" stroke-linecap="round"/><circle cx="0" cy="15" r="3.5" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g></g>
<circle cx="229" cy="100" r="2.5" fill="#1b3a63"/>
<g class="f-eclair"><path d="M222 62 l-8.4 18.5 h8.4 l-5 16.8 l18.5 -23.5 h-10 l6.7 -11.8z" fill="#ff6b35"/><path d="M252 104 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>
<g class="f-bulle"><path d="M232 12 h40 a6 6 0 0 1 6 6 v20 a6 6 0 0 1 -6 6 h-16 l-8 8 v-8 h-16 a6 6 0 0 1 -6 -6 v-20 a6 6 0 0 1 6 -6z" fill="#ff6b35"/><rect x="250" y="18" width="4" height="12" rx="2" fill="#fff"/><circle cx="252" cy="35" r="2.4" fill="#fff"/></g>
<g transform="translate(28 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/><g class="f-tel"><g transform="rotate(-26 12 49)"><rect x="7.5" y="39" width="9" height="20" rx="2" fill="#1b3a63"/><rect x="9.5" y="42" width="5" height="12" rx="1" fill="#e8f1fb"/></g></g></g>
</g></g>`,
  css: `.film-M10 .f-bon,.film-M10 .f-jg,.film-M10 .f-jd,.film-M10 .f-bras,.film-M10 .f-etoiles-r,.film-M10 .f-manette{transform-box:fill-box}
.film-M10 .f-jg{transform-origin:100% 0}.film-M10 .f-jd{transform-origin:0 0}.film-M10 .f-bras{transform-origin:0 0}.film-M10 .f-manette{transform-origin:50% 0}
.film-M10 .f-etoiles-r{transform-origin:50% 50%;animation:M10-tourne 2.2s linear infinite}
.film-M10 .f-eclair,.film-M10 .f-cheveux,.film-M10 .f-etoiles,.film-M10 .f-tel,.film-M10 .f-bulle{opacity:0}
@keyframes M10-tourne{to{transform:rotate(360deg)}}
@keyframes M10-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M10-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M10.acte-1 .f-bon{animation:M10-a1-bon 12s linear forwards}
@keyframes M10-a1-bon{0%{transform:translate(0,0)}20%,49%{transform:translate(155px,0)}50%{transform:translate(151px,0)}51%{transform:translate(159px,0)}52%{transform:translate(151px,0)}53%{transform:translate(159px,0)}54%{transform:translate(151px,0)}55%{transform:translate(159px,0)}56%{transform:translate(155px,0)}59%{transform:translate(130px,-8px)}63%,100%{transform:translate(100px,16px)}}
.film-M10.acte-1 .f-jg{animation:M10-pas-g .48s ease-in-out 5 alternate,M10-a1-jg 5.28s linear 6.72s forwards}
.film-M10.acte-1 .f-jd{animation:M10-pas-d .48s ease-in-out 5 alternate,M10-a1-jd 5.28s linear 6.72s forwards}
@keyframes M10-a1-jg{0%{transform:rotate(0)}16%,100%{transform:rotate(-90deg)}}
@keyframes M10-a1-jd{0%{transform:rotate(0)}16%,100%{transform:rotate(-55deg)}}
.film-M10.acte-1 .f-bras{animation:M10-a1-bras 12s linear forwards}
@keyframes M10-a1-bras{0%,20%{transform:rotate(0)}23%,25%{transform:rotate(-60deg)}27%,29%{transform:rotate(-105deg)}31%,34%{transform:rotate(-60deg)}37%,42%{transform:rotate(-105deg)}44%,46%{transform:rotate(-60deg)}49%,56%{transform:rotate(-105deg)}60%{transform:rotate(-150deg)}66%,100%{transform:rotate(-30deg)}}
.film-M10.acte-1 .f-manette{animation:M10-a1-manette 12s linear forwards}
@keyframes M10-a1-manette{0%,23%{transform:rotate(0)}27%,29%{transform:rotate(160deg)}31%,34%{transform:rotate(0)}37%,42%{transform:rotate(160deg)}44%,46%{transform:rotate(0)}49%,50%{transform:rotate(160deg)}52%,100%{transform:rotate(0)}}
.film-M10.acte-1 .f-eclair{animation:M10-a1-eclair 12s linear forwards}
@keyframes M10-a1-eclair{0%,48%{opacity:0}49%{opacity:1}51%{opacity:.3}53%{opacity:1}55%{opacity:.3}57%{opacity:1}60%,100%{opacity:0}}
.film-M10.acte-1 .f-disj{animation:M10-a1-disj 12s linear forwards}
@keyframes M10-a1-disj{0%,48%{fill:#e8f1fb}49%,57%{fill:#ff6b35}60%,100%{fill:#e8f1fb}}
.film-M10.acte-1 .f-cheveux{animation:M10-a1-cheveux 12s linear forwards}
@keyframes M10-a1-cheveux{0%,48%{opacity:0}49%,100%{opacity:1}}
.film-M10.acte-1 .f-etoiles{animation:M10-a1-etoiles 12s linear forwards}
@keyframes M10-a1-etoiles{0%,62%{opacity:0}65%,100%{opacity:1}}
.film-M10.acte-2 .f-bon{animation:M10-a2-bon 10s linear forwards}
@keyframes M10-a2-bon{0%{transform:translateX(0)}22%,45%{transform:translateX(155px)}50%,100%{transform:translateX(117px)}}
.film-M10.acte-2 .f-jg{animation:M10-pas-g .44s ease-in-out 5 alternate,M10-pas-g .5s ease-in-out 1 alternate 4.5s}
.film-M10.acte-2 .f-jd{animation:M10-pas-d .44s ease-in-out 5 alternate,M10-pas-d .5s ease-in-out 1 alternate 4.5s}
.film-M10.acte-2 .f-bras{animation:M10-a2-bras 10s linear forwards}
@keyframes M10-a2-bras{0%,22%{transform:rotate(0)}25%,27%{transform:rotate(-60deg)}29%,31%{transform:rotate(-105deg)}33%,36%{transform:rotate(-60deg)}40%,42%{transform:rotate(-105deg)}44%,46%{transform:rotate(-60deg)}50%,64%{transform:rotate(-95deg)}68%,100%{transform:rotate(-128deg)}}
.film-M10.acte-2 .f-manette{animation:M10-a2-manette 10s linear forwards}
@keyframes M10-a2-manette{0%,25%{transform:rotate(0)}29%,31%{transform:rotate(160deg)}33%,36%{transform:rotate(0)}40%,42%{transform:rotate(160deg)}44%,100%{transform:rotate(0)}}
.film-M10.acte-2 .f-tel{animation:M10-a2-tel 10s linear forwards}
@keyframes M10-a2-tel{0%,66%{opacity:0}70%,100%{opacity:1}}
.film-M10.acte-2 .f-bulle{animation:M10-a2-bulle 10s linear forwards}
@keyframes M10-a2-bulle{0%,76%{opacity:0}80%,100%{opacity:1}}`
};
