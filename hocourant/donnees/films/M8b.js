/* ============================================================
   inerWeb HoCourant — FILM du module M8 : la zone préparée
   Un dessin animé en deux actes, SVG + animations CSS.
   Décor : un mur à droite avec une prise basse et une zone à préparer
   à hauteur d'épaule, décalée sur le côté ; un collègue (chargé de
   travaux) à l'écart. Le bras qui tient la perceuse part toujours de
   l'épaule (transform-origin fill-box 0% 50%, pivot y+24) : au repos
   il pend le long du corps, animé il monte à l'horizontale pour que
   le foret touche le mur.
   Acte 1 · la situation : B0 doit fixer une étagère ; il perce au
   hasard juste au-dessus de la prise ; le foret touche un câble
   caché : éclair, la perceuse saute, poussière, il s'assoit, étoiles.
   Acte 2 · la leçon : le chargé de travaux montre du doigt un
   rectangle tracé au mur, loin de la prise ; le bonhomme perce dans
   ce rectangle, l'étagère se fixe, il lève le bras, satisfait.
   Règles : aucun texte dans le dessin ; classes préfixées « f- » ;
   sélecteurs sous .film-M8b ; l'acte se joue en posant la classe
   acte-1 ou acte-2 sur la <figure class="scene film film-M8b"> ;
   aucun attribut transform sur un élément animé en CSS (le CSS
   l'écraserait) : le placement est porté par le groupe parent.
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M8b = {
  titre: "Zone préparée : percer un mur, mais pas n'importe où",
  alt: "Acte 1 : une personne venue fixer une étagère lève sa perceuse à hauteur d'épaule et perce le mur juste au-dessus d'une prise basse ; le foret touche un câble caché, un éclair jaillit, elle recule et s'assoit par terre. Acte 2 : un collègue lui montre du doigt un rectangle tracé plus loin sur le mur, à l'écart de la prise ; elle perce dans cette zone préparée, fixe l'étagère et lève le bras, satisfaite.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="248" y="36" width="60" height="124" fill="#fffdf8" stroke="#1b3a63" stroke-width="2" opacity=".45"/>
<rect x="248" y="140" width="18" height="24" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><circle cx="254" cy="152" r="1.8" fill="#1b3a63"/><circle cx="262" cy="152" r="1.8" fill="#1b3a63"/>
<g class="f-zone"><rect x="270" y="97" width="24" height="30" fill="none" stroke="#ff6b35" stroke-width="2.5" stroke-dasharray="6 5"/></g>
<g class="f-etagere"><rect x="272" y="106" width="20" height="6" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/><path d="M275 112 L272 119 M289 112 L292 119" stroke="#1b3a63" stroke-width="2" stroke-linecap="round"/></g>
<g class="f-eclair"><path d="M253 92 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>
<g class="f-poussiere"><circle cx="250" cy="105" r="2" fill="#84b7ec"/><circle cx="258" cy="98" r="1.6" fill="#84b7ec"/><circle cx="248" cy="100" r="1.6" fill="#84b7ec"/></g>
<g class="f-poussiere2"><circle cx="275" cy="105" r="2" fill="#84b7ec"/><circle cx="283" cy="98" r="1.6" fill="#84b7ec"/><circle cx="273" cy="100" r="1.6" fill="#84b7ec"/></g>
<g transform="translate(170 88)"><g class="f-col">
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-11 44" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="-11" cy="44" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<g class="f-col-bras"><path d="M0 24 L12 44" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="44" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>
<g transform="translate(40 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-debout">
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
</g>
<g class="f-assis"><path d="M0 48 L-14 50 L-24 57 M0 48 L14 50 L24 57" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>
<g class="f-bras"><path d="M0 24 L12 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="47" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
<g transform="rotate(67 0 24)"><g class="f-outil-bras"><path d="M0 24 H26" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="26" cy="24" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/><rect x="26" y="20" width="16" height="8" rx="2" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/><path d="M42 24 H60" stroke="#1b3a63" stroke-width="2" stroke-linecap="round"/></g></g>
</g></g>`,
  css: `.film-M8b .f-bon,.film-M8b .f-col,.film-M8b .f-jg,.film-M8b .f-jd,.film-M8b .f-bras,.film-M8b .f-outil-bras,.film-M8b .f-col-bras,.film-M8b .f-etoiles-r{transform-box:fill-box}
.film-M8b .f-jg{transform-origin:100% 0}.film-M8b .f-jd{transform-origin:0 0}
.film-M8b .f-bras{transform-origin:0 0}.film-M8b .f-outil-bras{transform-origin:0% 50%}.film-M8b .f-col-bras{transform-origin:0 0}
.film-M8b .f-etoiles-r{transform-origin:50% 50%;animation:M8b-tourne 2.2s linear infinite}
.film-M8b .f-eclair,.film-M8b .f-cheveux,.film-M8b .f-etoiles,.film-M8b .f-assis,.film-M8b .f-poussiere,.film-M8b .f-poussiere2,.film-M8b .f-zone,.film-M8b .f-etagere,.film-M8b .f-col{opacity:0}
@keyframes M8b-tourne{to{transform:rotate(360deg)}}
@keyframes M8b-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M8b-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M8b.acte-1 .f-bon{animation:M8b-a1-bon 12s linear forwards}
@keyframes M8b-a1-bon{0%{transform:translateX(0)}30%,100%{transform:translateX(157px)}}
.film-M8b.acte-1 .f-jg{animation:M8b-pas-g .48s ease-in-out 7 alternate}
.film-M8b.acte-1 .f-jd{animation:M8b-pas-d .48s ease-in-out 7 alternate}
.film-M8b.acte-1 .f-debout{animation:M8b-a1-debout 12s linear forwards}
@keyframes M8b-a1-debout{0%,57%{opacity:1}58%,100%{opacity:0}}
.film-M8b.acte-1 .f-assis{animation:M8b-a1-assis 12s linear forwards}
@keyframes M8b-a1-assis{0%,57%{opacity:0}58%,100%{opacity:1}}
.film-M8b.acte-1 .f-outil-bras{animation:M8b-a1-outil 12s linear forwards}
@keyframes M8b-a1-outil{0%,30%{transform:rotate(0)}40%,48%{transform:rotate(-67deg)}56%,100%{transform:rotate(0)}}
.film-M8b.acte-1 .f-eclair{animation:M8b-a1-eclair 12s linear forwards}
@keyframes M8b-a1-eclair{0%,39%{opacity:0}40%{opacity:1}42%{opacity:.3}44%{opacity:1}46%{opacity:.3}48%{opacity:1}52%,100%{opacity:0}}
.film-M8b.acte-1 .f-cheveux{animation:M8b-a1-cheveux 12s linear forwards}
@keyframes M8b-a1-cheveux{0%,39%{opacity:0}40%,100%{opacity:1}}
.film-M8b.acte-1 .f-poussiere{animation:M8b-a1-poussiere 12s linear forwards}
@keyframes M8b-a1-poussiere{0%,44%{opacity:0}46%,55%{opacity:1}60%,100%{opacity:0}}
.film-M8b.acte-1 .f-etoiles{animation:M8b-a1-etoiles 12s linear forwards}
@keyframes M8b-a1-etoiles{0%,59%{opacity:0}62%,100%{opacity:1}}
.film-M8b.acte-2 .f-col{animation:M8b-a2-col 10s linear forwards}
@keyframes M8b-a2-col{0%,42%{opacity:1}48%,100%{opacity:0}}
.film-M8b.acte-2 .f-col-bras{animation:M8b-a2-colbras 10s linear forwards}
@keyframes M8b-a2-colbras{0%,20%{transform:rotate(0)}30%,100%{transform:rotate(-100deg)}}
.film-M8b.acte-2 .f-zone{animation:M8b-a2-zone 10s linear forwards}
@keyframes M8b-a2-zone{0%,22%{opacity:0}30%,100%{opacity:1}}
.film-M8b.acte-2 .f-bon{animation:M8b-a2-bon 10s linear forwards}
@keyframes M8b-a2-bon{0%{transform:translateX(0)}20%,48%{transform:translateX(70px)}64%,100%{transform:translateX(182px)}}
.film-M8b.acte-2 .f-jg{animation:M8b-pas-g .48s ease-in-out 4 alternate,M8b-pas-g .48s ease-in-out 4.8s 5 alternate}
.film-M8b.acte-2 .f-jd{animation:M8b-pas-d .48s ease-in-out 4 alternate,M8b-pas-d .48s ease-in-out 4.8s 5 alternate}
.film-M8b.acte-2 .f-outil-bras{animation:M8b-a2-outil 10s linear forwards}
@keyframes M8b-a2-outil{0%,64%{transform:rotate(0)}72%,80%{transform:rotate(-67deg)}86%,100%{transform:rotate(0)}}
.film-M8b.acte-2 .f-poussiere2{animation:M8b-a2-poussiere2 10s linear forwards}
@keyframes M8b-a2-poussiere2{0%,74%{opacity:0}76%,84%{opacity:1}88%,100%{opacity:0}}
.film-M8b.acte-2 .f-etagere{animation:M8b-a2-etagere 10s linear forwards}
@keyframes M8b-a2-etagere{0%,86%{opacity:0}92%,100%{opacity:1}}
.film-M8b.acte-2 .f-bras{animation:M8b-a2-bras 10s linear forwards}
@keyframes M8b-a2-bras{0%,90%{transform:rotate(0)}96%,100%{transform:rotate(-84deg)}}`
};

window.INTERACTIONS = window.INTERACTIONS || {};
INTERACTIONS.M8b = {
  arret: 4.8,
  question: "Qu'est-ce qui a manqué avant de percer ?",
  choix: [
    { t: "Percer d'un coup plus franc et rapide", remed: "La force du geste ne change rien : le danger vient de l'endroit choisi, pas de la manière de percer." },
    { t: "Choisir une mèche beaucoup plus fine", remed: "Une mèche plus fine touche quand même un câble caché si l'endroit n'a pas été vérifié." },
    { t: "Se faire montrer la zone préparée", ok: true }
  ],
  bravo: "La zone préparée protège même pour une tâche qui n'a rien d'électrique."
};
