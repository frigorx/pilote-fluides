/* ============================================================
   inerWeb HoCourant — FILM du module M7 : le tube et la limite de zone
   Un dessin animé en deux actes, SVG + animations CSS.
   Décor : une limite de zone au sol (trait orange en pointillés) ;
   derrière, une armoire ouverte avec deux barres rouges (pièce nue
   sous tension).
   Acte 1 · la situation : le bonhomme entre par la gauche, un long
   tube à l'épaule, s'arrête net avant la limite, pivote pour appuyer
   le tube contre l'armoire : le bout du tube franchit la limite et
   touche les barres. Éclair, le tube s'allume, cheveux dressés,
   secousse ; il lâche le tube, recule en titubant et finit assis
   par terre, des étoiles autour de la tête.
   Acte 2 · la leçon : même décor. Il s'arrête avant la limite,
   bascule le tube à l'horizontale derrière lui, à hauteur de main,
   recule d'un pas, lève l'autre main paume en avant ; un cône orange
   se pose au sol devant lui ; un téléphone apparaît dans sa main.
   Règles : aucun texte, aucun id ; classes « f- » ; sélecteurs sous
   .film-M7 ; l'acte se joue par la classe acte-1 / acte-2 sur la
   <figure class="scene film film-M7"> ; aucun attribut transform sur
   un élément animé en CSS : le placement est porté par le parent.
   Le bonhomme et le tube partent de x = 20 (parents), la valeur
   translateX vaut donc « position dans le cadre − 20 ».
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M7 = {
  titre: "La limite de zone et le tube : la situation, puis le bon geste",
  alt: "Acte 1 : une personne arrive avec un long tube sur l'épaule, s'arrête avant la limite de zone marquée au sol, puis appuie le tube contre l'armoire ouverte ; le bout du tube franchit la limite et touche les barres sous tension : éclair, cheveux dressés, la personne lâche le tube, recule et finit assise par terre. Acte 2 : la même personne s'arrête avant la limite, abaisse le tube à l'horizontale loin de l'armoire, recule d'un pas, lève la main paume en avant ; un cône orange est posé au sol et elle montre un téléphone pour signaler la situation.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<path d="M175 78 V160" stroke="#ff6b35" stroke-width="3" stroke-dasharray="6 5" stroke-linecap="round"/>
<path d="M166 160 H184" stroke="#ff6b35" stroke-width="4" stroke-linecap="round"/>
<rect x="214" y="50" width="82" height="110" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="220" y="57" width="70" height="97" fill="#e8f1fb"/>
<path d="M214 50 l-16 8 v94 l16 8" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect x="227" y="64" width="6" height="80" fill="#c0392b"/><rect x="251" y="64" width="6" height="80" fill="#c0392b"/>
<rect x="223" y="60" width="14" height="5" fill="#84b7ec"/><rect x="247" y="60" width="14" height="5" fill="#84b7ec"/>
<rect x="223" y="143" width="14" height="5" fill="#84b7ec"/><rect x="247" y="143" width="14" height="5" fill="#84b7ec"/>
<g transform="translate(20 112)"><g class="f-tube-pos"><g class="f-tube">
<rect x="-40" y="-40" width="160" height="80" fill="none" stroke="none"/>
<rect class="f-tube-corps" x="-8" y="-3" width="112" height="6" rx="3" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
</g></g></g>
<g class="f-eclair"><path d="M230 46 l-7.8 17.2 h7.8 l-4.7 15.6 l17.2 -21.8 h-9.4 l6.2 -10.9z" fill="#ff6b35"/></g>
<g transform="translate(20 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-jga"><path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/></g>
<g class="f-jda"><path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/></g>
<g class="f-bras2"><path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="-10" cy="47" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
<g class="f-bras"><path d="M0 24 L20 24" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="24" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>
<g class="f-repere"><path d="M141 160 L150 134 L159 160 Z" fill="#ff6b35"/><path d="M145.5 149 H154.5" stroke="#fffdf8" stroke-width="3"/></g>
<g class="f-tel"><rect x="125" y="84" width="10" height="18" rx="2.5" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><rect x="127.5" y="87" width="5" height="10" fill="#84b7ec"/><path d="M138 82 a5 5 0 0 1 5 5 M138 77 a10 10 0 0 1 10 10" stroke="#ff6b35" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>`,
  css: `.film-M7 .f-bon,.film-M7 .f-jg,.film-M7 .f-jd,.film-M7 .f-jga,.film-M7 .f-jda,.film-M7 .f-bras,.film-M7 .f-bras2,.film-M7 .f-tube,.film-M7 .f-etoiles-r{transform-box:fill-box}
.film-M7 .f-jg,.film-M7 .f-jga{transform-origin:100% 0}.film-M7 .f-jd,.film-M7 .f-jda{transform-origin:0 0}
.film-M7 .f-bras{transform-origin:0 50%}.film-M7 .f-bras2{transform-origin:100% 0}.film-M7 .f-tube{transform-origin:25% 50%}
.film-M7 .f-bras,.film-M7 .f-tube{transform:rotate(-150deg)}
.film-M7 .f-etoiles-r{transform-origin:50% 50%;animation:M7-tourne 2.2s linear infinite}
.film-M7 .f-eclair,.film-M7 .f-cheveux,.film-M7 .f-etoiles,.film-M7 .f-repere,.film-M7 .f-tel{opacity:0}
@keyframes M7-tourne{to{transform:rotate(360deg)}}
@keyframes M7-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M7-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M7.acte-1 .f-bon{animation:M7-a1-bon 12s linear forwards}
@keyframes M7-a1-bon{0%{transform:translateX(-30px)}20%{transform:translateX(110px)}41%{transform:translateX(110px)}43%{transform:translateX(106px)}45%{transform:translateX(114px)}47%{transform:translateX(106px)}49%{transform:translateX(114px)}51%{transform:translateX(110px)}59%{transform:translate(40px,0)}65%{transform:translate(28px,24px)}100%{transform:translate(28px,24px)}}
.film-M7.acte-1 .f-jg{animation:M7-pas-g .6s ease-in-out 4 alternate,M7-pas-g .48s ease-in-out 6.12s 2 alternate}
.film-M7.acte-1 .f-jd{animation:M7-pas-d .6s ease-in-out 4 alternate,M7-pas-d .48s ease-in-out 6.12s 2 alternate}
.film-M7.acte-1 .f-jga{animation:M7-a1-jga 12s linear forwards}
@keyframes M7-a1-jga{0%,59%{transform:rotate(0)}65%,100%{transform:rotate(-121deg)}}
.film-M7.acte-1 .f-jda{animation:M7-a1-jda 12s linear forwards}
@keyframes M7-a1-jda{0%,59%{transform:rotate(0)}65%,100%{transform:rotate(-68deg)}}
.film-M7.acte-1 .f-tube-pos{animation:M7-a1-tube-pos 12s linear forwards}
@keyframes M7-a1-tube-pos{0%{transform:translateX(-30px)}20%{transform:translateX(110px)}51%{transform:translate(110px,0)}59%,100%{transform:translate(80px,45px)}}
.film-M7.acte-1 .f-tube{animation:M7-a1-tube 12s linear forwards}
@keyframes M7-a1-tube{0%,33%{transform:rotate(-150deg)}41%{transform:rotate(-15.6deg)}51%{transform:rotate(-15.6deg)}59%,100%{transform:rotate(0)}}
.film-M7.acte-1 .f-bras{animation:M7-a1-bras 12s linear forwards}
@keyframes M7-a1-bras{0%,33%{transform:rotate(-150deg)}41%{transform:rotate(-15.6deg)}51%{transform:rotate(-15.6deg)}59%,100%{transform:rotate(20deg)}}
.film-M7.acte-1 .f-eclair{animation:M7-a1-eclair 12s linear forwards}
@keyframes M7-a1-eclair{0%,40%{opacity:0}41%{opacity:1}43%{opacity:.3}45%{opacity:1}47%{opacity:.3}49%{opacity:1}52%,100%{opacity:0}}
.film-M7.acte-1 .f-tube-corps{animation:M7-a1-tube-corps 12s linear forwards}
@keyframes M7-a1-tube-corps{0%,40%{fill:#e8f1fb}41%,50%{fill:#ff6b35}52%,100%{fill:#e8f1fb}}
.film-M7.acte-1 .f-cheveux{animation:M7-a1-cheveux 12s linear forwards}
@keyframes M7-a1-cheveux{0%,40%{opacity:0}41%,100%{opacity:1}}
.film-M7.acte-1 .f-etoiles{animation:M7-a1-etoiles 12s linear forwards}
@keyframes M7-a1-etoiles{0%,61%{opacity:0}65%,100%{opacity:1}}
.film-M7.acte-2 .f-bon{animation:M7-a2-bon 10s linear forwards}
@keyframes M7-a2-bon{0%{transform:translateX(-30px)}21%{transform:translateX(110px)}44%{transform:translateX(110px)}50%,100%{transform:translateX(88px)}}
.film-M7.acte-2 .f-jg{animation:M7-pas-g .42s ease-in-out 5 alternate,M7-pas-g .3s ease-in-out 4.4s 2 alternate}
.film-M7.acte-2 .f-jd{animation:M7-pas-d .42s ease-in-out 5 alternate,M7-pas-d .3s ease-in-out 4.4s 2 alternate}
.film-M7.acte-2 .f-tube{animation:M7-a2-tube 10s linear forwards}
@keyframes M7-a2-tube{0%,29%{transform:rotate(-150deg)}36%,100%{transform:rotate(-180deg)}}
.film-M7.acte-2 .f-bras{animation:M7-a2-bras 10s linear forwards}
@keyframes M7-a2-bras{0%,29%{transform:rotate(-150deg)}36%{transform:rotate(-180deg)}36.01%{transform:rotate(180deg)}44%,100%{transform:rotate(65deg)}}
.film-M7.acte-2 .f-tube-pos{animation:M7-a2-tube-pos 10s linear forwards}
@keyframes M7-a2-tube-pos{0%{transform:translateX(-30px)}21%{transform:translateX(110px)}36%{transform:translate(110px,0)}40%{transform:translate(119.3px,16.9px)}44%{transform:translate(138.5px,18.1px)}50%,100%{transform:translate(116.5px,18.1px)}}
.film-M7.acte-2 .f-bras2{animation:M7-a2-bras2 10s linear forwards}
@keyframes M7-a2-bras2{0%,55%{transform:rotate(0)}62%,100%{transform:rotate(-143.5deg)}}
.film-M7.acte-2 .f-repere{animation:M7-a2-repere 10s linear forwards}
@keyframes M7-a2-repere{0%,66%{opacity:0}72%,100%{opacity:1}}
.film-M7.acte-2 .f-tel{animation:M7-a2-tel 10s linear forwards}
@keyframes M7-a2-tel{0%,76%{opacity:0}80%,100%{opacity:1}}`
};
