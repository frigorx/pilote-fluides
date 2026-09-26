/* ============================================================
   inerWeb HoCourant — FILM du module M2 : l'habitude ne remplace pas l'analyse
   Un dessin animé en deux actes, SVG + animations CSS.
   Acte 1 · la situation : notre bonhomme entre dans un local qu'il connaît,
   en sifflotant ; depuis la veille un câble provisoire entre dans le
   coffret laissé entrouvert ; il ouvre la porte d'un geste machinal :
   éclair, cheveux dressés, secousse, étoiles.
   Acte 2 · la leçon : il s'arrête sur le seuil, la tête balaie la pièce,
   cinq pastilles vertes s'allument une à une au-dessus de lui (les cinq
   questions, sans texte) ; il repère le câble neuf, recule, sort son
   téléphone et attend une réponse avant d'agir.
   Règles : aucun texte dans le dessin ; classes préfixées « f- » ;
   sélecteurs sous .film-M2b ; l'acte se joue en posant la classe
   acte-1 ou acte-2 sur la <figure class="scene film film-M2b"> ;
   aucun attribut transform sur un élément animé en CSS (le CSS
   l'écraserait) : le placement est porté par le groupe parent.
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M2b = {
  titre: "Avant d'agir : l'habitude, puis les cinq questions",
  alt: "Acte 1 : une personne entre dans un local qu'elle connaît et ouvre d'un geste habituel un coffret entrouvert où un câble provisoire est entré depuis la veille ; elle reçoit un choc et est secouée. Acte 2 : la même personne s'arrête sur le seuil, cinq repères s'allument au-dessus d'elle, elle repère le câble neuf, recule et téléphone pour vérifier avant d'agir.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<path class="f-fil" d="M0 156 C 90 155, 170 157, 205 150 C 213 142, 219 128, 222 114" stroke="#c0392b" stroke-width="4" fill="none" stroke-linecap="round"/>
<rect x="224" y="58" width="72" height="82" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="232" y="68" width="56" height="6" fill="#84b7ec"/><rect x="232" y="82" width="56" height="6" fill="#84b7ec"/>
<g class="f-porte"><rect x="224" y="58" width="72" height="82" rx="4" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/><rect x="229" y="97" width="5" height="14" rx="2" fill="#1b3a63"/></g>
<g class="f-eclair"><path d="M216 78 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>
<g transform="translate(35 88)"><g class="f-bon">
<g class="f-q1"><circle cx="-24" cy="-15" r="4" fill="#1e7e54"/></g>
<g class="f-q2"><circle cx="-12" cy="-23" r="4" fill="#1e7e54"/></g>
<g class="f-q3"><circle cx="0" cy="-26" r="4" fill="#1e7e54"/></g>
<g class="f-q4"><circle cx="12" cy="-23" r="4" fill="#1e7e54"/></g>
<g class="f-q5"><circle cx="24" cy="-15" r="4" fill="#1e7e54"/></g>
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-tete"><g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<g class="f-bras"><path d="M0 24 L14 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="14" cy="47" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/><rect class="f-tel" x="10" y="41" width="8" height="13" rx="2" fill="#1b3a63"/></g>
</g></g>`,
  css: `.film-M2b .f-bon,.film-M2b .f-jg,.film-M2b .f-jd,.film-M2b .f-bras,.film-M2b .f-tete,.film-M2b .f-porte,.film-M2b .f-etoiles-r{transform-box:fill-box}
.film-M2b .f-jg{transform-origin:100% 0}.film-M2b .f-jd{transform-origin:0 0}.film-M2b .f-bras{transform-origin:0 0}
.film-M2b .f-tete{transform-origin:50% 50%}.film-M2b .f-porte{transform-origin:0% 50%;transform:scaleX(.45)}
.film-M2b .f-etoiles-r{transform-origin:50% 50%;animation:M2b-tourne 2.2s linear infinite}
.film-M2b .f-eclair,.film-M2b .f-cheveux,.film-M2b .f-etoiles,.film-M2b .f-q1,.film-M2b .f-q2,.film-M2b .f-q3,.film-M2b .f-q4,.film-M2b .f-q5,.film-M2b .f-tel{opacity:0}
@keyframes M2b-tourne{to{transform:rotate(360deg)}}
@keyframes M2b-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M2b-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M2b.acte-1 .f-bon{animation:M2b-a1-bon 12s linear forwards}
@keyframes M2b-a1-bon{0%{transform:translateX(0)}28%{transform:translateX(160px)}40%{transform:translateX(160px)}42%{transform:translateX(156px)}44%{transform:translateX(164px)}46%{transform:translateX(156px)}48%{transform:translateX(164px)}50%{transform:translateX(160px)}58%{transform:translateX(145px)}100%{transform:translateX(145px)}}
.film-M2b.acte-1 .f-jg{animation:M2b-pas-g .48s ease-in-out 7 alternate}
.film-M2b.acte-1 .f-jd{animation:M2b-pas-d .48s ease-in-out 7 alternate}
.film-M2b.acte-1 .f-bras{animation:M2b-a1-bras 12s linear forwards}
@keyframes M2b-a1-bras{0%,28%{transform:rotate(0)}40%{transform:rotate(-100deg)}50%{transform:rotate(-100deg)}58%{transform:rotate(-40deg)}100%{transform:rotate(-40deg)}}
.film-M2b.acte-1 .f-porte{animation:M2b-a1-porte 12s linear forwards}
@keyframes M2b-a1-porte{0%,39%{transform:scaleX(.45)}40%,100%{transform:scaleX(.08)}}
.film-M2b.acte-1 .f-eclair{animation:M2b-a1-eclair 12s linear forwards}
@keyframes M2b-a1-eclair{0%,39%{opacity:0}40%{opacity:1}42%{opacity:.3}44%{opacity:1}46%{opacity:.3}48%{opacity:1}52%,100%{opacity:0}}
.film-M2b.acte-1 .f-fil{animation:M2b-a1-fil 12s linear forwards}
@keyframes M2b-a1-fil{0%,39%{stroke:#c0392b}40%,48%{stroke:#ff6b35}52%,100%{stroke:#c0392b}}
.film-M2b.acte-1 .f-cheveux{animation:M2b-a1-cheveux 12s linear forwards}
@keyframes M2b-a1-cheveux{0%,39%{opacity:0}40%,100%{opacity:1}}
.film-M2b.acte-1 .f-etoiles{animation:M2b-a1-etoiles 12s linear forwards}
@keyframes M2b-a1-etoiles{0%,57%{opacity:0}60%,100%{opacity:1}}
.film-M2b.acte-2 .f-bon{animation:M2b-a2-bon 10s linear forwards}
@keyframes M2b-a2-bon{0%{transform:translateX(0)}22%,68%{transform:translateX(90px)}78%,100%{transform:translateX(50px)}}
.film-M2b.acte-2 .f-jg{animation:M2b-pas-g .48s ease-in-out 5 alternate,M2b-pas-g .48s ease-in-out 6.8s 2 alternate}
.film-M2b.acte-2 .f-jd{animation:M2b-pas-d .48s ease-in-out 5 alternate,M2b-pas-d .48s ease-in-out 6.8s 2 alternate}
.film-M2b.acte-2 .f-tete{animation:M2b-a2-tete 10s linear forwards}
@keyframes M2b-a2-tete{0%,22%{transform:rotate(0)}28%{transform:rotate(-10deg)}34%{transform:rotate(8deg)}40%,100%{transform:rotate(0)}}
.film-M2b.acte-2 .f-q1{animation:M2b-a2-q1 10s linear forwards}
@keyframes M2b-a2-q1{0%,40%{opacity:0}44%,100%{opacity:1}}
.film-M2b.acte-2 .f-q2{animation:M2b-a2-q2 10s linear forwards}
@keyframes M2b-a2-q2{0%,44%{opacity:0}48%,100%{opacity:1}}
.film-M2b.acte-2 .f-q3{animation:M2b-a2-q3 10s linear forwards}
@keyframes M2b-a2-q3{0%,48%{opacity:0}52%,100%{opacity:1}}
.film-M2b.acte-2 .f-q4{animation:M2b-a2-q4 10s linear forwards}
@keyframes M2b-a2-q4{0%,52%{opacity:0}56%,100%{opacity:1}}
.film-M2b.acte-2 .f-q5{animation:M2b-a2-q5 10s linear forwards}
@keyframes M2b-a2-q5{0%,56%{opacity:0}60%,100%{opacity:1}}
.film-M2b.acte-2 .f-bras{animation:M2b-a2-bras 10s linear forwards}
@keyframes M2b-a2-bras{0%,60%{transform:rotate(0)}68%,74%{transform:rotate(40deg)}84%,100%{transform:rotate(-120deg)}}
.film-M2b.acte-2 .f-tel{animation:M2b-a2-tel 10s linear forwards}
@keyframes M2b-a2-tel{0%,76%{opacity:0}80%,100%{opacity:1}}`
};

window.INTERACTIONS = window.INTERACTIONS || {};
INTERACTIONS.M2b = {
  arret: 4.8,
  question: "Qu'est-ce qui a manqué en entrant ?",
  choix: [
    { t: "Se dépêcher puisque l'endroit est connu", remed: "Un lieu connu la veille peut avoir changé depuis : la vitesse ne remplace pas la vérification." },
    { t: "S'arrêter et chercher ce qui a changé", ok: true },
    { t: "Ouvrir la porte avec des gants de chantier", remed: "Des gants de chantier protègent des chocs mécaniques, pas d'un courant électrique." }
  ],
  bravo: "Le local le plus familier peut avoir changé depuis la dernière visite."
};
