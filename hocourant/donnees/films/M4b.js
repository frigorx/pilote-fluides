/* ============================================================
   inerWeb HoCourant — FILM du module M4b : la clôture haute tension
   Acte 1 · la situation : le bonhomme pousse le portillon d'une
   clôture de poste HT et avance vers la cabine ; sans contact, à
   distance du conducteur, un arc jaillit : cheveux dressés, il est
   repoussé hors de la clôture et retombe assis, des étoiles tournent.
   Acte 2 · la leçon : il s'arrête devant le panneau, sans pousser le
   portillon ; une personne au casque blanc arrive, entre à sa place.
   Règles : aucun texte ; classes « f- » ; sélecteurs .film-M4b ;
   acte-1/acte-2 sur la figure ; aucun transform statique sur un
   élément animé (le groupe parent porte le placement).
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M4b = {
  titre: "Une clôture haute tension : la situation, puis le bon geste",
  alt: "Acte 1 : une personne pousse le portillon d'une clôture entourant un poste électrique, avance vers la cabine ; sans contact, un arc jaillit près du conducteur en hauteur, elle est repoussée hors de la clôture et retombe assise, des étoiles autour de la tête. Acte 2 : la même personne s'arrête devant le panneau de danger sans pousser le portillon ; une personne au casque blanc arrive et entre à sa place.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="230" y="50" width="80" height="6" fill="#1b3a63"/>
<rect x="236" y="56" width="68" height="104" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M270 55 V16" stroke="#1b3a63" stroke-width="2"/>
<ellipse cx="270" cy="46" rx="10" ry="6" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/>
<ellipse cx="270" cy="33" rx="8" ry="5" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/>
<ellipse cx="270" cy="22" rx="6" ry="4" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/>
<path d="M270 16 H320" stroke="#c0392b" stroke-width="3"/>
<path d="M150 160 V70 M190 160 V70 M230 160 V70" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M150 72 H230 M150 150 H230" stroke="#1b3a63" stroke-width="2"/>
<path d="M150 150 L190 72 M150 110 L190 150 M150 72 L190 110 M190 150 L230 72 M190 110 L230 150 M190 72 L230 110" stroke="#84b7ec" stroke-width="1.5"/>
<circle cx="222" cy="115" r="3" fill="#1b3a63"/>
<g class="f-panneau"><path d="M150 12 L169 44 H131 Z" fill="#fff4e0" stroke="#1b3a63" stroke-width="2.5" stroke-linejoin="round"/><path d="M150 20 l-4 8.8 h4 l-2.4 8 l8.8 -11.2 h-4.8 l3.2 -5.6z" fill="#ff6b35"/></g>
<g class="f-eclair"><path d="M208 40 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>
<g transform="translate(20 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>
<g transform="translate(170 88)"><g class="f-bon2">
<path class="f-casque" d="M-11 8 a11 11 0 0 1 22 0 Z" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg2" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd2" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-bras2"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>`,
  css: `.film-M4b .f-bon,.film-M4b .f-jg,.film-M4b .f-jd,.film-M4b .f-bras,.film-M4b .f-etoiles-r,.film-M4b .f-bon2,.film-M4b .f-jg2,.film-M4b .f-jd2,.film-M4b .f-bras2{transform-box:fill-box}
.film-M4b .f-jg,.film-M4b .f-jg2{transform-origin:100% 0}
.film-M4b .f-jd,.film-M4b .f-jd2{transform-origin:0 0}
.film-M4b .f-bras,.film-M4b .f-bras2{transform-origin:0 0}
.film-M4b .f-etoiles-r{transform-origin:50% 50%;animation:M4b-tourne 2.2s linear infinite}
.film-M4b .f-eclair,.film-M4b .f-cheveux,.film-M4b .f-etoiles,.film-M4b .f-bon2{opacity:0}
@keyframes M4b-tourne{to{transform:rotate(360deg)}}
@keyframes M4b-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M4b-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M4b.acte-1 .f-bon{animation:M4b-a1-bon 12s linear forwards}
@keyframes M4b-a1-bon{0%{transform:translate(0,0)}28%{transform:translate(155px,0)}32%{transform:translate(165px,0)}40%{transform:translate(175px,0)}42%{transform:translate(171px,0)}44%{transform:translate(179px,0)}46%{transform:translate(171px,0)}48%{transform:translate(179px,0)}50%{transform:translate(175px,0)}54%{transform:translate(140px,-4px)}58%{transform:translate(90px,18px)}100%{transform:translate(90px,18px)}}
.film-M4b.acte-1 .f-jg{animation:M4b-pas-g .48s ease-in-out 7 alternate,M4b-a1-jg .5s linear 6.2s forwards}
.film-M4b.acte-1 .f-jd{animation:M4b-pas-d .48s ease-in-out 7 alternate,M4b-a1-jd .5s linear 6.2s forwards}
@keyframes M4b-a1-jg{from{transform:rotate(0)}to{transform:rotate(-112deg)}}
@keyframes M4b-a1-jd{from{transform:rotate(0)}to{transform:rotate(-78deg)}}
.film-M4b.acte-1 .f-bras{animation:M4b-a1-bras 12s linear forwards}
@keyframes M4b-a1-bras{0%,28%{transform:rotate(0)}32%,50%{transform:rotate(-70deg)}58%,100%{transform:rotate(-30deg)}}
.film-M4b.acte-1 .f-eclair{animation:M4b-a1-eclair 12s linear forwards}
@keyframes M4b-a1-eclair{0%,39%{opacity:0}40%{opacity:1}42%{opacity:.3}44%{opacity:1}46%{opacity:.3}48%{opacity:1}52%,100%{opacity:0}}
.film-M4b.acte-1 .f-cheveux{animation:M4b-a1-cheveux 12s linear forwards}
@keyframes M4b-a1-cheveux{0%,39%{opacity:0}40%,100%{opacity:1}}
.film-M4b.acte-1 .f-etoiles{animation:M4b-a1-etoiles 12s linear forwards}
@keyframes M4b-a1-etoiles{0%,57%{opacity:0}60%,100%{opacity:1}}
.film-M4b.acte-2 .f-bon{animation:M4b-a2-bon 10s linear forwards}
@keyframes M4b-a2-bon{0%{transform:translateX(0)}30%,100%{transform:translateX(120px)}}
.film-M4b.acte-2 .f-jg{animation:M4b-pas-g .48s ease-in-out 6 alternate}
.film-M4b.acte-2 .f-jd{animation:M4b-pas-d .48s ease-in-out 6 alternate}
.film-M4b.acte-2 .f-bras{animation:M4b-a2-bras 10s linear forwards}
@keyframes M4b-a2-bras{0%,30%{transform:rotate(0)}40%,100%{transform:rotate(-100deg)}}
.film-M4b.acte-2 .f-bon2{animation:M4b-a2-bon2 10s linear forwards}
@keyframes M4b-a2-bon2{0%,34%{opacity:0;transform:translateX(0)}40%{opacity:1;transform:translateX(0)}75%,100%{opacity:1;transform:translateX(55px)}}
.film-M4b.acte-2 .f-jg2{animation:M4b-pas-g .48s ease-in-out 6 alternate 4.2s}
.film-M4b.acte-2 .f-jd2{animation:M4b-pas-d .48s ease-in-out 6 alternate 4.2s}`
};

window.INTERACTIONS = window.INTERACTIONS || {};
INTERACTIONS.M4b = {
  arret: 4.8,
  question: "Pourquoi n'avait-il rien à faire derrière cette clôture ?",
  choix: [
    { t: "Il fallait juste faire plus attention", remed: "L'attention ne change rien à distance : l'arc jaillit avant même le contact." },
    { t: "C'est la haute tension, pas son domaine", ok: true },
    { t: "Il fallait mettre des gants de chantier", remed: "Des gants ne donnent aucun droit d'entrer dans un périmètre réservé à un domaine supérieur." }
  ],
  bravo: "Le symbole d'habilitation suit le domaine : B ne donne aucun droit derrière cette clôture."
};
