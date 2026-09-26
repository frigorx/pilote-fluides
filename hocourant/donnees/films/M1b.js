/* ============================================================
   inerWeb HoCourant — FILM M1b : la rallonge entaillée (vague 2)
   Un dessin animé en deux actes, SVG + animations CSS.
   Acte 1 · la situation : une rallonge (débranchée, bleu marine) à la
   gaine entaillée ; le bonhomme la déroule sans la regarder, la
   branche à la prise (elle devient rouge), la main sur l'entaille :
   décharge, cheveux dressés, il finit assis par terre, étoiles.
   Acte 2 · la leçon : la même rallonge reste débranchée ; il la fait
   glisser dans sa main, s'arrête sur l'entaille, la met à l'écart avec
   une étiquette orange ; il prend une SECONDE rallonge (saine, posée
   près de la perceuse), la branche à la prise (elle devient rouge) et
   le voyant de la perceuse passe au vert.
   Règles : aucun texte dans le dessin ; classes préfixées « f- » ;
   sélecteurs sous .film-M1b ; l'acte se joue en posant la classe
   acte-1 ou acte-2 sur la <figure class="scene film film-M1b"> ;
   aucun attribut transform sur un élément animé en CSS : le
   placement est porté par le groupe parent.
   Bonhomme repris de films/M1.js ; posture assise (buste droit,
   jambes tendues au sol) reprise de films/M13b.js.
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M1b = {
  titre: "Rallonge entaillée : la situation, puis le bon geste",
  alt: "Acte 1 : une personne déroule une rallonge dont la gaine est entaillée sans la regarder, la branche à la prise, reçoit une décharge et se retrouve assise par terre, des étoiles autour de la tête. Acte 2 : la même personne fait glisser cette rallonge dans sa main, s'arrête sur l'entaille et la met à l'écart avec une étiquette orange, puis prend une seconde rallonge saine, la branche à la prise et le voyant de la perceuse s'allume en vert.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<path d="M300 20 V160" stroke="#1b3a63" stroke-width="2" opacity=".22"/>
<rect x="246" y="82" width="34" height="42" rx="3" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<circle cx="257" cy="97" r="3.2" fill="#84b7ec"/><circle cx="269" cy="97" r="3.2" fill="#84b7ec"/>
<rect x="259" y="106" width="8" height="4" fill="#84b7ec"/>
<path class="f-cable" d="M215 98 L188 112 L172 130 L158 148 L150 152" stroke="#1b3a63" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<path class="f-cable-tombe" d="M213 155 Q180 159 150 153" stroke="#c0392b" stroke-width="4" fill="none" stroke-linecap="round"/>
<circle class="f-entaille" cx="172" cy="130" r="4" fill="#ff6b35"/>
<g class="f-eclair"><path d="M184 96 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>
<g class="f-etiquette"><rect x="163" y="136" width="16" height="10" rx="1.5" fill="#ff6b35"/><circle cx="167" cy="141" r="1.3" fill="#fffdf8"/></g>
<g class="f-perceuse"><rect x="78" y="140" width="34" height="14" rx="3" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/><path d="M85 154 L81 160" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><rect x="112" y="144" width="10" height="6" fill="#84b7ec" stroke="#1b3a63" stroke-width="1.5"/><circle class="f-voyant" cx="83" cy="146" r="2.5" fill="#1e7e54"/></g>
<path class="f-cable-saine" d="M112 148 L150 156 L195 156 L228 130 L246 118" stroke="#1b3a63" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<g transform="translate(60 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>`,
  css: `.film-M1b .f-bon,.film-M1b .f-jg,.film-M1b .f-jd,.film-M1b .f-bras,.film-M1b .f-etoiles-r,.film-M1b .f-cable{transform-box:fill-box}
.film-M1b .f-jg{transform-origin:100% 0}.film-M1b .f-jd{transform-origin:0 0}.film-M1b .f-bras{transform-origin:0 0}
.film-M1b .f-etoiles-r{transform-origin:50% 50%;animation:M1b-tourne 2.2s linear infinite}
.film-M1b .f-eclair,.film-M1b .f-cheveux,.film-M1b .f-etoiles,.film-M1b .f-etiquette,.film-M1b .f-voyant,.film-M1b .f-cable-tombe{opacity:0}
.film-M1b.acte-1 .f-cable-saine{opacity:0}
@keyframes M1b-tourne{to{transform:rotate(360deg)}}
@keyframes M1b-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M1b-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M1b.acte-1 .f-bon{animation:M1b-a1-bon 12s linear forwards}
@keyframes M1b-a1-bon{0%{transform:translate(0,0)}28%{transform:translate(100px,0)}40%{transform:translate(100px,0)}42%{transform:translate(96px,0)}44%{transform:translate(104px,0)}46%{transform:translate(96px,0)}48%{transform:translate(104px,0)}50%{transform:translate(100px,0)}58%{transform:translate(60px,0)}70%,100%{transform:translate(30px,20px)}}
.film-M1b.acte-1 .f-jg{animation:M1b-a1-jg 12s linear forwards}
@keyframes M1b-a1-jg{0%{transform:rotate(-22deg)}7%{transform:rotate(22deg)}14%{transform:rotate(-22deg)}21%{transform:rotate(22deg)}28%,50%{transform:rotate(0)}58%,100%{transform:rotate(-115deg)}}
.film-M1b.acte-1 .f-jd{animation:M1b-a1-jd 12s linear forwards}
@keyframes M1b-a1-jd{0%{transform:rotate(22deg)}7%{transform:rotate(-22deg)}14%{transform:rotate(22deg)}21%{transform:rotate(-22deg)}28%,50%{transform:rotate(0)}58%,100%{transform:rotate(-62deg)}}
.film-M1b.acte-1 .f-bras{animation:M1b-a1-bras 12s linear forwards}
@keyframes M1b-a1-bras{0%,28%{transform:rotate(0)}40%{transform:rotate(-64deg)}50%{transform:rotate(-64deg)}58%{transform:rotate(-20deg)}100%{transform:rotate(-20deg)}}
.film-M1b.acte-1 .f-eclair{animation:M1b-a1-eclair 12s linear forwards}
@keyframes M1b-a1-eclair{0%,39%{opacity:0}40%{opacity:1}42%{opacity:.3}44%{opacity:1}46%{opacity:.3}48%{opacity:1}52%,100%{opacity:0}}
.film-M1b.acte-1 .f-cable{animation:M1b-a1-cable 12s linear forwards}
@keyframes M1b-a1-cable{0%,36%{stroke:#1b3a63;opacity:1}38%,39%{stroke:#c0392b;opacity:1}40%,48%{stroke:#ff6b35;opacity:1}52%,58%{stroke:#c0392b;opacity:1}64%,100%{stroke:#c0392b;opacity:0}}
.film-M1b.acte-1 .f-cable-tombe{animation:M1b-a1-cable-tombe 12s linear forwards}
@keyframes M1b-a1-cable-tombe{0%,58%{opacity:0}64%,100%{opacity:1}}
.film-M1b.acte-1 .f-entaille{animation:M1b-a1-entaille 12s linear forwards}
@keyframes M1b-a1-entaille{0%,58%{opacity:1}64%,100%{opacity:0}}
.film-M1b.acte-1 .f-cheveux{animation:M1b-a1-cheveux 12s linear forwards}
@keyframes M1b-a1-cheveux{0%,39%{opacity:0}40%,100%{opacity:1}}
.film-M1b.acte-1 .f-etoiles{animation:M1b-a1-etoiles 12s linear forwards}
@keyframes M1b-a1-etoiles{0%,57%{opacity:0}60%,100%{opacity:1}}
.film-M1b.acte-2 .f-bon{animation:M1b-a2-bon 10s linear forwards}
@keyframes M1b-a2-bon{0%{transform:translate(0,0)}20%,100%{transform:translate(88px,0)}}
.film-M1b.acte-2 .f-jg{animation:M1b-pas-g .48s ease-in-out 5 alternate}
.film-M1b.acte-2 .f-jd{animation:M1b-pas-d .48s ease-in-out 5 alternate}
.film-M1b.acte-2 .f-bras{animation:M1b-a2-bras 10s linear forwards}
@keyframes M1b-a2-bras{0%,18%{transform:rotate(0)}25%,40%{transform:rotate(27deg)}54%,100%{transform:rotate(75deg)}}
.film-M1b.acte-2 .f-etiquette{animation:M1b-a2-etiquette 10s linear forwards}
@keyframes M1b-a2-etiquette{0%,32%{opacity:0}40%,100%{opacity:1}}
.film-M1b.acte-2 .f-cable{animation:M1b-a2-cable 10s linear forwards}
@keyframes M1b-a2-cable{0%,42%{transform:translate(0,0)}54%,100%{transform:translate(-6px,5px)}}
.film-M1b.acte-2 .f-cable-saine{animation:M1b-a2-cable-saine 10s linear forwards}
@keyframes M1b-a2-cable-saine{0%,64%{stroke:#1b3a63}76%,100%{stroke:#c0392b}}
.film-M1b.acte-2 .f-voyant{animation:M1b-a2-voyant 10s linear forwards}
@keyframes M1b-a2-voyant{0%,76%{opacity:0}86%,100%{opacity:1}}`
};

window.INTERACTIONS = window.INTERACTIONS || {};
INTERACTIONS.M1b = {
  arret: 4.8,
  question: "Qu'est-ce qui aurait évité ce choc ?",
  choix: [
    { t: "Brancher plus vite pour limiter le contact", remed: "La vitesse ne protège pas : le contact se fait dès que la main touche le cuivre à nu." },
    { t: "Tenir la rallonge avec un chiffon sec", remed: "Un chiffon n'est pas un isolant fiable : le courant peut passer par la main qui le tient." },
    { t: "Regarder le câble avant de le brancher", ok: true }
  ],
  bravo: "Un câble s'inspecte avant de se brancher, pas après le choc."
};
