/* ============================================================
   inerWeb HoCourant — FILM du module M13 : l'intervention BR
   Un dessin animé en deux actes, SVG + animations CSS.
   Décor : une armoire à trois départs, ouverte ; le départ de gauche
   est en défaut (voyant orange, fil coupé) ; le sol.
   Acte 1 · la situation : le bonhomme marche jusqu'au départ en défaut,
   le répare (le fil se raccorde, le voyant s'éteint), content, il passe
   au deuxième départ puis au troisième : les fils s'emmêlent, éclair,
   les trois disjoncteurs claquent en cascade, il est projeté et se
   retrouve assis par terre au milieu des fils, cheveux dressés, étoiles,
   l'armoire clignote derrière lui.
   Acte 2 · la leçon : même armoire, même défaut. Il mesure (appareil en
   main, halo sur la panne), répare ce seul départ, referme sa cellule
   (coche verte), un repère orange se pose au sol devant les autres
   départs, il téléphone et rend compte.
   Règles : aucun texte dans le dessin ; classes préfixées « f- » ;
   sélecteurs sous .film-M13 ; l'acte se joue en posant la classe
   acte-1 ou acte-2 sur la <figure class="scene film film-M13"> ;
   aucun attribut transform sur un élément animé en CSS (le CSS
   l'écraserait) : le placement est porté par le groupe parent.
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M13 = {
  titre: "Intervention BR : réparer un départ, s'arrêter là",
  alt: "Acte 1 : une personne répare le départ en défaut d'une armoire, puis touche deux autres départs sans lien avec la panne ; les fils s'emmêlent, les disjoncteurs claquent en cascade et la personne se retrouve assise par terre, étourdie, l'armoire clignotante derrière elle. Acte 2 : la même personne mesure, répare uniquement le départ en défaut, referme, pose un repère au sol devant les autres départs et rend compte au téléphone.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="176" y="38" width="124" height="122" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M300 38 l14 8 v106 l-14 8" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect x="184" y="48" width="34" height="104" rx="2" fill="#fff" stroke="#1b3a63" stroke-width="1.5"/>
<rect x="222" y="48" width="34" height="104" rx="2" fill="#fff" stroke="#1b3a63" stroke-width="1.5"/>
<rect x="260" y="48" width="34" height="104" rx="2" fill="#fff" stroke="#1b3a63" stroke-width="1.5"/>
<rect x="187" y="52" width="28" height="24" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect x="225" y="52" width="28" height="24" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect x="263" y="52" width="28" height="24" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect class="f-lev1" x="198" y="54" width="6" height="10" rx="1.5" fill="#1b3a63"/>
<rect class="f-lev2" x="236" y="54" width="6" height="10" rx="1.5" fill="#1b3a63"/>
<rect class="f-lev3" x="274" y="54" width="6" height="10" rx="1.5" fill="#1b3a63"/>
<circle class="f-voy1" cx="210" cy="58" r="3" fill="#ff6b35" stroke="#1b3a63" stroke-width="1.5"/>
<circle class="f-voy2" cx="248" cy="58" r="3" fill="#fff" stroke="#1b3a63" stroke-width="1.5"/>
<circle class="f-voy3" cx="286" cy="58" r="3" fill="#fff" stroke="#1b3a63" stroke-width="1.5"/>
<path d="M201 76 V104 M201 118 V142" stroke="#84b7ec" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<path class="f-fil1-rep" d="M201 103 V119" stroke="#84b7ec" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<path class="f-fil2" d="M239 76 V142" stroke="#84b7ec" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<path class="f-fil3" d="M277 76 V142" stroke="#84b7ec" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<path class="f-mel2" d="M239 76 C214 96 262 106 236 118 C212 130 264 130 240 142" stroke="#84b7ec" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<path class="f-mel3" d="M277 76 C252 96 300 106 274 118 C250 130 302 130 278 142" stroke="#84b7ec" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<circle class="f-halo" cx="201" cy="111" r="12" fill="none" stroke="#ff6b35" stroke-width="2.5"/>
<path class="f-ecl1" d="M209 42 l-3.6 8 h3.6 l-2.2 7.2 l8 -10 h-4.3 l2.9 -5.2z" fill="#ff6b35"/>
<path class="f-ecl2" d="M247 42 l-3.6 8 h3.6 l-2.2 7.2 l8 -10 h-4.3 l2.9 -5.2z" fill="#ff6b35"/>
<path class="f-ecl3" d="M285 42 l-3.6 8 h3.6 l-2.2 7.2 l8 -10 h-4.3 l2.9 -5.2z" fill="#ff6b35"/>
<g class="f-couvercle"><rect x="184" y="48" width="34" height="104" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/><path d="M211 95 v10" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/></g>
<path class="f-ok" d="M192 100 l5 5 l10 -11" stroke="#1e7e54" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<g class="f-eclair"><path d="M273 96 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>
<path class="f-fils-sol" d="M108 158 c8 -14 20 -14 28 0 c8 14 20 14 28 0 c8 -14 20 -14 28 0 M120 150 c10 -10 22 -4 18 8" stroke="#84b7ec" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<g class="f-repere"><path d="M221 112 V136" stroke="#ff6b35" stroke-width="3" stroke-dasharray="6 5" stroke-linecap="round"/><path d="M212 160 L221 138 L230 160 Z" fill="#ff6b35"/></g>
<g transform="translate(30 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/><g class="f-app"><rect x="9" y="45" width="13" height="9" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/></g></g>
<g class="f-bras-tel"><path d="M0 24 L14 34 L11 14" stroke="#1b3a63" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="8" y="3" width="6" height="13" rx="2" fill="#1b3a63"/><g class="f-ondes"><path d="M18 5 a7 7 0 0 1 0 10 M22 1 a12 12 0 0 1 0 18" stroke="#84b7ec" stroke-width="2.5" fill="none" stroke-linecap="round"/></g></g>
</g></g>`,
  css: `.film-M13 .f-bon,.film-M13 .f-jg,.film-M13 .f-jd,.film-M13 .f-bras,.film-M13 .f-etoiles-r,.film-M13 .f-lev1,.film-M13 .f-lev2,.film-M13 .f-lev3{transform-box:fill-box}
.film-M13 .f-jg{transform-origin:100% 0}.film-M13 .f-jd{transform-origin:0 0}.film-M13 .f-bras{transform-origin:0 0}
.film-M13 .f-lev1,.film-M13 .f-lev2,.film-M13 .f-lev3{transform-origin:50% 100%}
.film-M13 .f-etoiles-r{transform-origin:50% 50%;animation:M13-tourne 2.2s linear infinite}
.film-M13 .f-eclair,.film-M13 .f-cheveux,.film-M13 .f-etoiles,.film-M13 .f-repere,.film-M13 .f-mel2,.film-M13 .f-mel3,.film-M13 .f-fil1-rep,.film-M13 .f-halo,.film-M13 .f-ecl1,.film-M13 .f-ecl2,.film-M13 .f-ecl3,.film-M13 .f-couvercle,.film-M13 .f-ok,.film-M13 .f-fils-sol,.film-M13 .f-app,.film-M13 .f-bras-tel,.film-M13 .f-ondes{opacity:0}
@keyframes M13-tourne{to{transform:rotate(360deg)}}
.film-M13.acte-1 .f-bon{animation:M13-a1-bon 12s linear forwards}
@keyframes M13-a1-bon{0%{transform:translate(0,0)}16%,24%{transform:translate(143px,0)}25.5%{transform:translate(143px,-7px)}27%{transform:translate(143px,0)}32%,42%{transform:translate(189px,0)}46%,58%{transform:translate(227px,0)}61%{transform:translate(180px,-16px)}64%,100%{transform:translate(120px,20px)}}
.film-M13.acte-1 .f-jg{animation:M13-a1-jg 12s linear forwards}
@keyframes M13-a1-jg{0%{transform:rotate(-22deg)}4%{transform:rotate(22deg)}8%{transform:rotate(-22deg)}12%{transform:rotate(22deg)}16%,27%{transform:rotate(0)}29%{transform:rotate(-22deg)}31%{transform:rotate(22deg)}32%,42%{transform:rotate(0)}43.5%{transform:rotate(-22deg)}45%{transform:rotate(22deg)}46%,58%{transform:rotate(0)}64%,100%{transform:rotate(-115deg)}}
.film-M13.acte-1 .f-jd{animation:M13-a1-jd 12s linear forwards}
@keyframes M13-a1-jd{0%{transform:rotate(22deg)}4%{transform:rotate(-22deg)}8%{transform:rotate(22deg)}12%{transform:rotate(-22deg)}16%,27%{transform:rotate(0)}29%{transform:rotate(22deg)}31%{transform:rotate(-22deg)}32%,42%{transform:rotate(0)}43.5%{transform:rotate(22deg)}45%{transform:rotate(-22deg)}46%,58%{transform:rotate(0)}64%,100%{transform:rotate(-62deg)}}
.film-M13.acte-1 .f-bras{animation:M13-a1-bras 12s linear forwards}
@keyframes M13-a1-bras{0%,16%{transform:rotate(0)}18%,23%{transform:rotate(-64deg)}26%,32%{transform:rotate(0)}34%,42%{transform:rotate(-64deg)}45%,48%{transform:rotate(0)}51%,58%{transform:rotate(-64deg)}64%,100%{transform:rotate(-40deg)}}
.film-M13.acte-1 .f-fil1-rep{animation:M13-a1-rep 12s linear forwards}
@keyframes M13-a1-rep{0%,22%{opacity:0}24%,100%{opacity:1}}
.film-M13.acte-1 .f-voy1{animation:M13-a1-voy1 12s linear forwards}
@keyframes M13-a1-voy1{0%,23%{fill:#ff6b35}24%,63%{fill:#fff}64%,68%{fill:#ff6b35}69%,72%{fill:#fff}73%,76%{fill:#ff6b35}77%,80%{fill:#fff}81%,84%{fill:#ff6b35}85%,88%{fill:#fff}89%,92%{fill:#ff6b35}93%,96%{fill:#fff}97%,100%{fill:#ff6b35}}
.film-M13.acte-1 .f-voy2,.film-M13.acte-1 .f-voy3{animation:M13-a1-clignote 12s linear forwards}
@keyframes M13-a1-clignote{0%,63%{fill:#fff}64%,68%{fill:#ff6b35}69%,72%{fill:#fff}73%,76%{fill:#ff6b35}77%,80%{fill:#fff}81%,84%{fill:#ff6b35}85%,88%{fill:#fff}89%,92%{fill:#ff6b35}93%,96%{fill:#fff}97%,100%{fill:#ff6b35}}
.film-M13.acte-1 .f-fil2{animation:M13-a1-fil2 12s linear forwards}
@keyframes M13-a1-fil2{0%,38%{opacity:1}39%,100%{opacity:0}}
.film-M13.acte-1 .f-mel2{animation:M13-a1-mel2 12s linear forwards}
@keyframes M13-a1-mel2{0%,38%{opacity:0}39%,100%{opacity:1}}
.film-M13.acte-1 .f-fil3{animation:M13-a1-fil3 12s linear forwards}
@keyframes M13-a1-fil3{0%,50%{opacity:1}51%,100%{opacity:0}}
.film-M13.acte-1 .f-mel3{animation:M13-a1-mel3 12s linear forwards}
@keyframes M13-a1-mel3{0%,50%{opacity:0}51%,100%{opacity:1}}
.film-M13.acte-1 .f-eclair{animation:M13-a1-eclair 12s linear forwards}
@keyframes M13-a1-eclair{0%,50%{opacity:0}51%{opacity:1}53%{opacity:.3}55%{opacity:1}57%,100%{opacity:0}}
.film-M13.acte-1 .f-lev1{animation:M13-a1-lev1 12s linear forwards}
@keyframes M13-a1-lev1{0%,51%{transform:rotate(0)}53%,100%{transform:rotate(180deg)}}
.film-M13.acte-1 .f-lev2{animation:M13-a1-lev2 12s linear forwards}
@keyframes M13-a1-lev2{0%,54%{transform:rotate(0)}56%,100%{transform:rotate(180deg)}}
.film-M13.acte-1 .f-lev3{animation:M13-a1-lev3 12s linear forwards}
@keyframes M13-a1-lev3{0%,57%{transform:rotate(0)}59%,100%{transform:rotate(180deg)}}
.film-M13.acte-1 .f-ecl1{animation:M13-a1-ecl1 12s linear forwards}
@keyframes M13-a1-ecl1{0%,51%{opacity:0}52%,54%{opacity:1}56%,100%{opacity:0}}
.film-M13.acte-1 .f-ecl2{animation:M13-a1-ecl2 12s linear forwards}
@keyframes M13-a1-ecl2{0%,54%{opacity:0}55%,57%{opacity:1}59%,100%{opacity:0}}
.film-M13.acte-1 .f-ecl3{animation:M13-a1-ecl3 12s linear forwards}
@keyframes M13-a1-ecl3{0%,57%{opacity:0}58%,60%{opacity:1}62%,100%{opacity:0}}
.film-M13.acte-1 .f-cheveux{animation:M13-a1-cheveux 12s linear forwards}
@keyframes M13-a1-cheveux{0%,59%{opacity:0}60%,100%{opacity:1}}
.film-M13.acte-1 .f-fils-sol{animation:M13-a1-fils-sol 12s linear forwards}
@keyframes M13-a1-fils-sol{0%,62%{opacity:0}64%,100%{opacity:1}}
.film-M13.acte-1 .f-etoiles{animation:M13-a1-etoiles 12s linear forwards}
@keyframes M13-a1-etoiles{0%,65%{opacity:0}67%,100%{opacity:1}}
.film-M13.acte-2 .f-bon{animation:M13-a2-bon 10s linear forwards}
@keyframes M13-a2-bon{0%{transform:translateX(0)}20%,58%{transform:translateX(143px)}64%,100%{transform:translateX(108px)}}
.film-M13.acte-2 .f-jg{animation:M13-a2-jg 10s linear forwards}
@keyframes M13-a2-jg{0%{transform:rotate(-22deg)}4%{transform:rotate(22deg)}8%{transform:rotate(-22deg)}12%{transform:rotate(22deg)}16%{transform:rotate(-22deg)}20%,58%{transform:rotate(0)}60%{transform:rotate(-18deg)}62%{transform:rotate(18deg)}64%,100%{transform:rotate(0)}}
.film-M13.acte-2 .f-jd{animation:M13-a2-jd 10s linear forwards}
@keyframes M13-a2-jd{0%{transform:rotate(22deg)}4%{transform:rotate(-22deg)}8%{transform:rotate(22deg)}12%{transform:rotate(-22deg)}16%{transform:rotate(22deg)}20%,58%{transform:rotate(0)}60%{transform:rotate(18deg)}62%{transform:rotate(-18deg)}64%,100%{transform:rotate(0)}}
.film-M13.acte-2 .f-bras{animation:M13-a2-bras 10s linear forwards}
@keyframes M13-a2-bras{0%,20%{transform:rotate(0);opacity:1}26%,42%{transform:rotate(-64deg);opacity:1}46%,74%{transform:rotate(0);opacity:1}76%,100%{transform:rotate(0);opacity:0}}
.film-M13.acte-2 .f-app{animation:M13-a2-app 10s linear forwards}
@keyframes M13-a2-app{0%,21%{opacity:0}23%,42%{opacity:1}44%,100%{opacity:0}}
.film-M13.acte-2 .f-halo{animation:M13-a2-halo 10s linear forwards}
@keyframes M13-a2-halo{0%,29%{opacity:0}31%,33%{opacity:1}34%{opacity:.3}36%,39%{opacity:1}41%,100%{opacity:0}}
.film-M13.acte-2 .f-fil1-rep{animation:M13-a2-rep 10s linear forwards}
@keyframes M13-a2-rep{0%,40%{opacity:0}42%,100%{opacity:1}}
.film-M13.acte-2 .f-voy1{animation:M13-a2-voy1 10s linear forwards}
@keyframes M13-a2-voy1{0%,41%{fill:#ff6b35}42%,100%{fill:#fff}}
.film-M13.acte-2 .f-couvercle{animation:M13-a2-couv 10s linear forwards}
@keyframes M13-a2-couv{0%,48%{opacity:0}51%,100%{opacity:1}}
.film-M13.acte-2 .f-ok{animation:M13-a2-ok 10s linear forwards}
@keyframes M13-a2-ok{0%,53%{opacity:0}55%,100%{opacity:1}}
.film-M13.acte-2 .f-repere{animation:M13-a2-repere 10s linear forwards}
@keyframes M13-a2-repere{0%,66%{opacity:0}69%,100%{opacity:1}}
.film-M13.acte-2 .f-bras-tel{animation:M13-a2-tel 10s linear forwards}
@keyframes M13-a2-tel{0%,75%{opacity:0}77%,100%{opacity:1}}
.film-M13.acte-2 .f-ondes{animation:M13-a2-ondes 10s linear forwards}
@keyframes M13-a2-ondes{0%,83%{opacity:0}85%,100%{opacity:1}}`
};
