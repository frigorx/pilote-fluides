/* ============================================================
   inerWeb HoCourant — FILM du module M9c : le cadenas d'un autre
   Un dessin animé en deux actes, SVG + animations CSS.
   Décor : le même tableau que M9 à gauche (sectionneur à manette,
   cadenas et étiquette déjà en place, posés par quelqu'un d'autre),
   une cloison, puis un coffret ouvert à droite où un collègue travaille
   sur le fil, relié au tableau par un fil commun.
   Acte 1 · la situation : le bonhomme, agacé par ce cadenas qui n'est
   pas le sien, le coupe et relève la manette ; derrière la cloison, le
   collègue reçoit l'éclair sur le fil qu'il tenait, cheveux dressés,
   étoiles ; le bonhomme se fige, la main encore sur la manette.
   Acte 2 · la leçon : il n'y touche pas et appelle ; le collègue revient,
   retire lui-même son cadenas et son étiquette, la manette remonte,
   un repère vert confirme.
   Règles : aucun texte, aucun id ; classes « f- » ; sélecteurs sous
   .film-M9c ; images-clés préfixées M9c- ; aucun attribut transform sur
   un élément animé (le placement est porté par le groupe parent).
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M9c = {
  titre: "Le cadenas d'un autre : la situation, puis le bon geste",
  alt: "Acte 1 : agacé par un cadenas qui n'est pas le sien, une personne le coupe et relève le levier du sectionneur ; derrière la cloison, un collègue en train de travailler reçoit l'éclair sur son fil, cheveux dressés, étoiles, et la première personne se fige. Acte 2 : la même personne n'y touche pas et appelle ; le collègue revient, retire lui-même son cadenas et son étiquette, le levier remonte ensemble et un repère vert confirme que tout va bien.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<path class="f-fil" d="M46 26 V16 H245 V60" stroke="#1b3a63" stroke-width="3" fill="none" stroke-linejoin="round"/>
<rect x="16" y="26" width="60" height="78" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="24" y="36" width="44" height="6" fill="#84b7ec"/><rect x="24" y="48" width="44" height="6" fill="#84b7ec"/>
<rect x="50" y="66" width="22" height="32" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<circle cx="61" cy="82" r="3" fill="#1b3a63"/>
<g transform="translate(61 82)"><g class="f-manette"><rect x="-3.5" y="-13" width="7" height="13" rx="2" fill="#1b3a63"/></g></g>
<g class="f-cadenas"><path d="M57 95 v-3 a4 4 0 0 1 8 0 v3" stroke="#1b3a63" stroke-width="2.5" fill="none"/><rect x="55" y="95" width="12" height="10" rx="2" fill="#ff6b35" stroke="#1b3a63" stroke-width="2"/></g>
<g class="f-etiquette"><path d="M55 98 H44" stroke="#1b3a63" stroke-width="2"/><rect x="26" y="92" width="18" height="12" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><rect x="29" y="96" width="12" height="3" fill="#ff6b35"/></g>
<g class="f-appel"><path d="M46 2 h34 a4 4 0 0 1 4 4 v18 a4 4 0 0 1 -4 4 h-22 l-8 8 v-8 h-4 a4 4 0 0 1 -4 -4 v-18 a4 4 0 0 1 4 -4z" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5" stroke-linejoin="round"/></g>
<g class="f-juste"><circle cx="65" cy="16" r="9" fill="#fffdf8" stroke="#1e7e54" stroke-width="2.5"/><path d="M60 16 l4 4 l7 -8" stroke="#1e7e54" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<path d="M140 20 V160" stroke="#1b3a63" stroke-width="2" opacity=".4"/>
<rect x="200" y="60" width="90" height="80" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M200 60 l-16 8 v64 l16 8" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect x="208" y="70" width="74" height="6" fill="#84b7ec"/><rect x="208" y="84" width="74" height="6" fill="#84b7ec"/>
<path class="f-fil" d="M276 100 H216 C204 100, 196 106, 188 112" stroke="#1b3a63" stroke-width="4" fill="none" stroke-linecap="round"/>
<circle class="f-bout" cx="188" cy="112" r="3.5" fill="#1b3a63"/>
<g class="f-eclair"><path d="M184 96 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>
<g transform="translate(10 88)"><g class="f-bon">
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>
<g transform="translate(160 88)"><g class="f-col">
<g class="f-col-etoiles"><g class="f-col-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-col-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-col-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-col-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path d="M0 24 L10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
</g></g>`,
  css: `.film-M9c .f-bon,.film-M9c .f-jg,.film-M9c .f-jd,.film-M9c .f-bras,.film-M9c .f-col,.film-M9c .f-col-jg,.film-M9c .f-col-jd,.film-M9c .f-col-etoiles-r,.film-M9c .f-manette{transform-box:fill-box}
.film-M9c .f-jg,.film-M9c .f-col-jg{transform-origin:100% 0}
.film-M9c .f-jd,.film-M9c .f-col-jd{transform-origin:0 0}
.film-M9c .f-bras{transform-origin:0 0}
.film-M9c .f-manette{transform-origin:50% 100%}
.film-M9c .f-col-etoiles-r{transform-origin:50% 50%;animation:M9c-tourne 2.2s linear infinite}
.film-M9c .f-eclair,.film-M9c .f-col-cheveux,.film-M9c .f-col-etoiles,.film-M9c .f-appel,.film-M9c .f-juste{opacity:0}
@keyframes M9c-tourne{to{transform:rotate(360deg)}}
@keyframes M9c-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M9c-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M9c.acte-1 .f-bon{animation:M9c-a1-bon 12s linear forwards}
@keyframes M9c-a1-bon{0%{transform:translateX(0)}20%,100%{transform:translateX(45px)}}
.film-M9c.acte-1 .f-jg{animation:M9c-pas-g .48s ease-in-out 5 alternate}
.film-M9c.acte-1 .f-jd{animation:M9c-pas-d .48s ease-in-out 5 alternate}
.film-M9c.acte-1 .f-bras{animation:M9c-a1-bras 12s linear forwards}
@keyframes M9c-a1-bras{0%,20%{transform:rotate(0)}28%,32%{transform:rotate(-90deg)}40%,100%{transform:rotate(-140deg)}}
.film-M9c.acte-1 .f-cadenas{animation:M9c-a1-cadenas 12s linear forwards}
@keyframes M9c-a1-cadenas{0%,29%{opacity:1}32%,100%{opacity:0}}
.film-M9c.acte-1 .f-etiquette{animation:M9c-a1-etiquette 12s linear forwards}
@keyframes M9c-a1-etiquette{0%,29%{opacity:1}32%,100%{opacity:0}}
.film-M9c.acte-1 .f-manette{animation:M9c-a1-manette 12s linear forwards}
@keyframes M9c-a1-manette{0%,38%{transform:rotate(180deg)}42%,100%{transform:rotate(0)}}
.film-M9c.acte-1 .f-fil{animation:M9c-a1-fil 12s linear forwards}
@keyframes M9c-a1-fil{0%,45%{stroke:#1b3a63}46%,56%{stroke:#ff6b35}60%,100%{stroke:#c0392b}}
.film-M9c.acte-1 .f-bout{animation:M9c-a1-bout 12s linear forwards}
@keyframes M9c-a1-bout{0%,45%{fill:#1b3a63}46%,56%{fill:#ff6b35}60%,100%{fill:#c0392b}}
.film-M9c.acte-1 .f-eclair{animation:M9c-a1-eclair 12s linear forwards}
@keyframes M9c-a1-eclair{0%,45%{opacity:0}46%,56%{opacity:1}60%,100%{opacity:0}}
.film-M9c.acte-1 .f-col-cheveux{animation:M9c-a1-colcheveux 12s linear forwards}
@keyframes M9c-a1-colcheveux{0%,45%{opacity:0}46%,100%{opacity:1}}
.film-M9c.acte-1 .f-col-etoiles{animation:M9c-a1-coletoiles 12s linear forwards}
@keyframes M9c-a1-coletoiles{0%,58%{opacity:0}62%,100%{opacity:1}}
.film-M9c.acte-2 .f-bon{animation:M9c-a2-bon 10s linear forwards}
@keyframes M9c-a2-bon{0%{transform:translateX(0)}18%,100%{transform:translateX(30px)}}
.film-M9c.acte-2 .f-jg{animation:M9c-pas-g .48s ease-in-out 4 alternate}
.film-M9c.acte-2 .f-jd{animation:M9c-pas-d .48s ease-in-out 4 alternate}
.film-M9c.acte-2 .f-bras{animation:M9c-a2-bras 10s linear forwards}
@keyframes M9c-a2-bras{0%,18%{transform:rotate(0)}24%,34%{transform:rotate(-70deg)}40%,100%{transform:rotate(0)}}
.film-M9c.acte-2 .f-appel{animation:M9c-a2-appel 10s linear forwards}
@keyframes M9c-a2-appel{0%,22%{opacity:0}26%,38%{opacity:1}42%,100%{opacity:0}}
.film-M9c.acte-2 .f-col{animation:M9c-a2-col 10s linear forwards}
@keyframes M9c-a2-col{0%,40%{transform:translateX(0)}62%,100%{transform:translateX(-75px)}}
.film-M9c.acte-2 .f-col-jg{animation:M9c-pas-g .48s ease-in-out 5 alternate 4s}
.film-M9c.acte-2 .f-col-jd{animation:M9c-pas-d .48s ease-in-out 5 alternate 4s}
.film-M9c.acte-2 .f-cadenas{animation:M9c-a2-cadenas 10s linear forwards}
@keyframes M9c-a2-cadenas{0%,63%{opacity:1}67%,100%{opacity:0}}
.film-M9c.acte-2 .f-etiquette{animation:M9c-a2-etiquette 10s linear forwards}
@keyframes M9c-a2-etiquette{0%,63%{opacity:1}67%,100%{opacity:0}}
.film-M9c.acte-2 .f-manette{animation:M9c-a2-manette 10s linear forwards}
@keyframes M9c-a2-manette{0%,74%{transform:rotate(180deg)}80%,100%{transform:rotate(0)}}
.film-M9c.acte-2 .f-fil{animation:M9c-a2-fil 10s linear forwards}
@keyframes M9c-a2-fil{0%,83%{stroke:#1b3a63}88%,100%{stroke:#c0392b}}
.film-M9c.acte-2 .f-bout{animation:M9c-a2-bout 10s linear forwards}
@keyframes M9c-a2-bout{0%,83%{fill:#1b3a63}88%,100%{fill:#c0392b}}
.film-M9c.acte-2 .f-juste{animation:M9c-a2-juste 10s linear forwards}
@keyframes M9c-a2-juste{0%,80%{opacity:0}84%,100%{opacity:1}}`
};

window.INTERACTIONS = window.INTERACTIONS || {};
INTERACTIONS.M9c = {
  arret: 5.5,
  question: "Que fallait-il faire devant ce cadenas ?",
  choix: [
    { t: "Couper le cadenas pour avancer plus vite", remed: "Couper le cadenas d'une autre personne retire une protection qu'elle seule a le droit de lever." },
    { t: "Appeler la personne à qui il appartient", ok: true },
    { t: "Remonter le levier pour un court instant", remed: "Un instant suffit à exposer la personne qui travaille encore derrière ce circuit." }
  ],
  bravo: "Seule la personne qui a posé le cadenas peut le retirer."
};
