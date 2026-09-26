/* ============================================================
   inerWeb HoCourant — FILM ajouté M12c : incendie d'origine électrique
   Un dessin animé en deux actes, SVG + animations CSS (vague 2, § 9).
   Décor : une armoire électrique qui prend feu, un seau d'eau à portée
   de main ; à l'écart, un boîtier d'alarme, un coupe-circuit général
   avec levier, un extincteur à CO₂.
   Acte 1 · la situation : fumée puis flamme sortent de l'armoire ; il
   jette le seau d'eau dessus, l'électricité remonte le jet, le seau
   s'envole, il est rejeté en arrière, cheveux dressés, étoiles.
   Acte 2 · la leçon : il presse le boîtier d'alarme, coupe au
   coupe-circuit général à l'écart, puis vise la base de la flamme avec
   l'extincteur à CO₂ (bouteille haute, cornet noir tenu à deux mains,
   nuage blanc), à distance ; le seau disparaît, le feu s'éteint.
   Règles : aucun texte, aucun id ; classes « f- » ; sélecteurs sous
   .film-M12c ; keyframes « M12c- » ; aucun attribut transform sur un
   élément animé (placement par le groupe parent).
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M12c = {
  titre: "Incendie d'origine électrique : couper avant d'éteindre",
  alt: "Acte 1 : de la fumée puis une flamme sortent d'une armoire électrique ; il jette un seau d'eau dessus, l'électricité remonte le jet, le seau s'envole et il est rejeté en arrière, cheveux dressés, étoiles autour de la tête. Acte 2 : il presse un boîtier d'alarme, va couper au coupe-circuit général à l'écart, puis revient viser la base de la flamme avec un extincteur à CO2, à distance, et le feu s'éteint.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="16" y="96" width="30" height="44" rx="3" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="20" y="102" width="22" height="5" fill="#84b7ec"/>
<g transform="translate(31 128)"><g class="f-levier2"><rect x="-3" y="-16" width="6" height="16" rx="2" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/><circle cx="0" cy="-14" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/></g><circle cx="0" cy="0" r="3" fill="#1b3a63"/></g>
<rect x="70" y="64" width="22" height="20" rx="3" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<circle cx="81" cy="74" r="5" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/>
<g class="f-ondes"><path d="M92 68 a10 10 0 0 1 0 12 M97 64 a16 16 0 0 1 0 20" stroke="#1b3a63" stroke-width="2" fill="none" stroke-linecap="round"/></g>
<rect x="178" y="56" width="44" height="70" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="186" y="64" width="28" height="6" fill="#84b7ec"/><rect x="186" y="78" width="28" height="6" fill="#84b7ec"/>
<g class="f-fumee"><path d="M192 54 c-4 -8 6 -10 2 -18" stroke="#1b3a63" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M206 54 c4 -8 -6 -10 -2 -18" stroke="#1b3a63" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>
<g class="f-flamme"><path d="M198 56 c-5 -9 3 -12 -1 -20 c8 5 9 16 2 21 c3 -2 4 -7 3 -10 c4 5 1 12 -4 9z" fill="#ff6b35"/></g>
<path class="f-eau" d="M150 128 C 165 108, 182 84, 197 60" stroke="#84b7ec" stroke-width="4" fill="none" stroke-linecap="round"/>
<g class="f-eclair"><path d="M154 106 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>
<g transform="translate(150 130)"><g class="f-seau"><path d="M-8 0 L8 0 L6 14 L-6 14 Z" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/><path d="M-8 0 a8 5 0 0 1 16 0" stroke="#1b3a63" stroke-width="2" fill="none"/></g></g>
<g transform="translate(150 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-bras"><path d="M0 24 L12 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="47" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
<g class="f-extincteur">
<path d="M9 28 a3 3 0 0 1 6 0" stroke="#1b3a63" stroke-width="2" fill="none"/>
<rect x="7" y="28" width="8" height="18" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<path d="M15 32 L27 29" stroke="#1b3a63" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<circle cx="16" cy="32" r="3.5" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>
<circle cx="23" cy="30" r="3.5" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>
<path d="M26 24 L36 20 L36 35 L26 31 Z" fill="#1b3a63"/>
<circle cx="40" cy="23" r="3" fill="#fffdf8" stroke="#1b3a63" stroke-width="1.5"/>
<circle cx="44" cy="27" r="2.5" fill="#fffdf8" stroke="#1b3a63" stroke-width="1.5"/>
<circle cx="41" cy="30" r="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="1.5"/>
</g>
</g></g>`,
  css: `.film-M12c .f-bon,.film-M12c .f-jg,.film-M12c .f-jd,.film-M12c .f-bras,.film-M12c .f-etoiles-r,.film-M12c .f-seau,.film-M12c .f-flamme,.film-M12c .f-levier2{transform-box:fill-box}
.film-M12c .f-jg{transform-origin:100% 0}.film-M12c .f-jd{transform-origin:0 0}.film-M12c .f-bras{transform-origin:0 0}
.film-M12c .f-etoiles-r{transform-origin:50% 50%;animation:M12c-tourne 2.2s linear infinite}
.film-M12c .f-seau{transform-origin:50% 50%}.film-M12c .f-flamme{transform-origin:50% 100%}.film-M12c .f-levier2{transform-origin:50% 100%}
.film-M12c .f-flamme,.film-M12c .f-fumee,.film-M12c .f-eau,.film-M12c .f-eclair,.film-M12c .f-cheveux,.film-M12c .f-etoiles,.film-M12c .f-ondes,.film-M12c .f-extincteur{opacity:0}
@keyframes M12c-tourne{to{transform:rotate(360deg)}}
.film-M12c.acte-1 .f-fumee{animation:M12c-a1-fumee 12s linear forwards}
@keyframes M12c-a1-fumee{0%,10%{opacity:0}14%,100%{opacity:.35}}
.film-M12c.acte-1 .f-flamme{animation:M12c-a1-flamme 12s linear forwards}
@keyframes M12c-a1-flamme{0%,18%{opacity:0}22%,100%{opacity:1}}
.film-M12c.acte-1 .f-bras{animation:M12c-a1-bras 12s linear forwards}
@keyframes M12c-a1-bras{0%,4%{transform:rotate(0)}10%,24%{transform:rotate(-55deg)}40%{transform:rotate(-95deg)}48%,100%{transform:rotate(-60deg)}}
.film-M12c.acte-1 .f-seau{animation:M12c-a1-seau 12s linear forwards}
@keyframes M12c-a1-seau{0%,38%{transform:translate(0,0) rotate(0)}42%{transform:translate(-5px,-15px) rotate(-60deg)}50%{transform:translate(-30px,-48px) rotate(-200deg)}60%,100%{transform:translate(-45px,-38px) rotate(-240deg)}}
.film-M12c.acte-1 .f-eau{animation:M12c-a1-eau 12s linear forwards}
@keyframes M12c-a1-eau{0%,39%{opacity:0;stroke:#84b7ec}41%,46%{opacity:1;stroke:#84b7ec}48%{stroke:#ff6b35}50%{stroke:#84b7ec}52%{stroke:#ff6b35}54%{opacity:1;stroke:#84b7ec}56%,100%{opacity:0}}
.film-M12c.acte-1 .f-eclair{animation:M12c-a1-eclair 12s linear forwards}
@keyframes M12c-a1-eclair{0%,45%{opacity:0}47%{opacity:1}49%{opacity:.3}51%{opacity:1}53%{opacity:.3}55%,100%{opacity:0}}
.film-M12c.acte-1 .f-cheveux{animation:M12c-a1-cheveux 12s linear forwards}
@keyframes M12c-a1-cheveux{0%,49%{opacity:0}52%,100%{opacity:1}}
.film-M12c.acte-1 .f-etoiles{animation:M12c-a1-etoiles 12s linear forwards}
@keyframes M12c-a1-etoiles{0%,54%{opacity:0}58%,100%{opacity:1}}
.film-M12c.acte-1 .f-bon{animation:M12c-a1-bon 12s linear forwards}
@keyframes M12c-a1-bon{0%,50%{transform:translate(0,0)}58%,100%{transform:translate(-15px,18px)}}
.film-M12c.acte-1 .f-jg{animation:M12c-a1-jg 12s linear forwards}
@keyframes M12c-a1-jg{0%,50%{transform:rotate(0)}56%,100%{transform:rotate(-95deg)}}
.film-M12c.acte-1 .f-jd{animation:M12c-a1-jd 12s linear forwards}
@keyframes M12c-a1-jd{0%,50%{transform:rotate(0)}56%,100%{transform:rotate(-55deg)}}
.film-M12c.acte-2 .f-flamme{animation:M12c-a2-flamme 10s linear forwards}
@keyframes M12c-a2-flamme{0%,72%{opacity:1;transform:scale(1)}80%{transform:scale(.5)}88%,100%{opacity:0;transform:scale(.25)}}
.film-M12c.acte-2 .f-fumee{animation:M12c-a2-fumee 10s linear forwards}
@keyframes M12c-a2-fumee{0%,78%{opacity:.35}88%,100%{opacity:0}}
.film-M12c.acte-2 .f-ondes{animation:M12c-a2-ondes 10s linear forwards}
@keyframes M12c-a2-ondes{0%,14%{opacity:0}18%,30%{opacity:1}34%,100%{opacity:0}}
.film-M12c.acte-2 .f-seau{opacity:0}
.film-M12c.acte-2 .f-levier2{animation:M12c-a2-levier2 10s linear forwards}
@keyframes M12c-a2-levier2{0%,48%{transform:rotate(0)}54%,100%{transform:rotate(180deg)}}
.film-M12c.acte-2 .f-extincteur{animation:M12c-a2-extincteur 10s linear forwards}
@keyframes M12c-a2-extincteur{0%,64%{opacity:0}68%,100%{opacity:1}}
.film-M12c.acte-2 .f-bon{animation:M12c-a2-bon 10s linear forwards}
@keyframes M12c-a2-bon{0%,8%{transform:translateX(0)}20%,34%{transform:translateX(-50px)}46%,58%{transform:translateX(-95px)}70%,100%{transform:translateX(-5px)}}
.film-M12c.acte-2 .f-jg{animation:M12c-a2-marche-g .4s ease-in-out 3 alternate,M12c-a2-marche-g .4s ease-in-out 2.4s 3 alternate}
.film-M12c.acte-2 .f-jd{animation:M12c-a2-marche-d .4s ease-in-out 3 alternate,M12c-a2-marche-d .4s ease-in-out 2.4s 3 alternate}
@keyframes M12c-a2-marche-g{from{transform:rotate(-16deg)}to{transform:rotate(16deg)}}
@keyframes M12c-a2-marche-d{from{transform:rotate(16deg)}to{transform:rotate(-16deg)}}
.film-M12c.acte-2 .f-bras{animation:M12c-a2-bras 10s linear forwards}
@keyframes M12c-a2-bras{0%,16%{transform:rotate(0)}20%,34%{transform:rotate(-80deg)}40%,44%{transform:rotate(0)}50%,56%{transform:rotate(110deg)}62%{transform:rotate(0)}68%,100%{transform:rotate(-55deg)}}`
};

window.INTERACTIONS = window.INTERACTIONS || {};
INTERACTIONS.M12c = {
  arret: 5.8,
  question: "Que fallait-il faire d'abord ?",
  choix: [
    { t: "Jeter l'eau depuis plus loin, à l'abri", remed: "Même de loin, l'eau reste conductrice et ramène le courant jusqu'à vous." },
    { t: "Ouvrir l'armoire pour voir d'où vient le feu", remed: "Ouvrir l'armoire expose davantage à l'arc électrique et aux fumées." },
    { t: "Donner l'alarme et faire couper l'énergie", ok: true }
  ],
  bravo: "Sans le courant coupé, aucun moyen d'extinction n'est vraiment sûr."
};
