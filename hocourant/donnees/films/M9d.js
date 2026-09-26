/* ============================================================
   inerWeb HoCourant — FILM du module M9d : compter avant de remettre
   Un dessin animé en deux actes, SVG + animations CSS.
   Décor : une armoire électrique unique (sectionneur à manette, cadenas
   et étiquette déjà posés), trois outils oubliés à l'intérieur, deux
   personnages qui viennent de terminer leur intervention.
   Acte 1 · la situation : sans rien compter, le collègue referme
   l'armoire (un cache apparaît) et relève le levier ; un tournevis
   oublié fait un gros éclair et de la fumée, les deux personnages
   sursautent, cheveux dressés, étoiles.
   Acte 2 · la leçon : les trois outils sont comptés un par un (coche
   verte), les deux lèvent le bras, l'avis de fin de travail passe de
   l'un à l'autre ; alors seulement le cadenas est retiré, le levier
   remonté, l'armoire refermée, et une lampe s'allume.
   Règles : aucun texte, aucun id ; classes « f- » ; sélecteurs sous
   .film-M9d ; images-clés préfixées M9d- ; aucun attribut transform sur
   un élément animé (le placement est porté par le groupe parent).
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M9d = {
  titre: "Compter avant de remettre sous tension : la situation, puis le bon geste",
  alt: "Acte 1 : sans compter ni les outils ni les personnes, l'armoire est refermée et le levier remonté ; un tournevis oublié à l'intérieur provoque un gros éclair et de la fumée, les deux personnes sursautent, cheveux dressés, étoiles. Acte 2 : les mêmes personnes comptent les trois outils un par un avec une coche verte chacun, lèvent le bras satisfaites, se passent l'avis de fin de travail ; alors seulement le cadenas est retiré, le levier remonté, l'armoire refermée, et une lampe s'allume.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="200" y="50" width="58" height="100" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="212" y="64" width="34" height="6" fill="#84b7ec"/><rect x="212" y="78" width="34" height="6" fill="#84b7ec"/>
<g class="f-outil1"><path d="M215 92 L223 82" stroke="#1b3a63" stroke-width="2.5" stroke-linecap="round"/><rect x="211" y="90" width="6" height="6" rx="1" fill="#ff6b35"/></g>
<g class="f-outil2"><path d="M223 94 L231 84 M231 94 L223 84" stroke="#1b3a63" stroke-width="2.2" stroke-linecap="round"/></g>
<g class="f-outil3"><circle cx="238" cy="88" r="4" fill="none" stroke="#1b3a63" stroke-width="2.2"/><path d="M241 91 L247 97" stroke="#1b3a63" stroke-width="2.2" stroke-linecap="round"/></g>
<rect x="273" y="150" width="40" height="8" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<g class="f-juste1"><circle cx="283" cy="132" r="6" fill="#fffdf8" stroke="#1e7e54" stroke-width="2"/><path d="M280 132 l2.5 2.5 l4 -5" stroke="#1e7e54" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<g class="f-juste2"><circle cx="294" cy="132" r="6" fill="#fffdf8" stroke="#1e7e54" stroke-width="2"/><path d="M291 132 l2.5 2.5 l4 -5" stroke="#1e7e54" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<g class="f-juste3"><circle cx="305" cy="132" r="6" fill="#fffdf8" stroke="#1e7e54" stroke-width="2"/><path d="M302 132 l2.5 2.5 l4 -5" stroke="#1e7e54" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<circle cx="195" cy="115" r="3" fill="#1b3a63"/>
<g transform="translate(195 115)"><g class="f-manette"><rect x="-3.5" y="-13" width="7" height="13" rx="2" fill="#1b3a63"/></g></g>
<g class="f-cadenas"><path d="M191 128 v-3 a4 4 0 0 1 8 0 v3" stroke="#1b3a63" stroke-width="2.5" fill="none"/><rect x="189" y="128" width="12" height="10" rx="2" fill="#ff6b35" stroke="#1b3a63" stroke-width="2"/></g>
<g class="f-etiquette"><path d="M189 131 H176" stroke="#1b3a63" stroke-width="2"/><rect x="158" y="125" width="18" height="12" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><rect x="161" y="129" width="12" height="3" fill="#ff6b35"/></g>
<g class="f-feuille"><rect x="120" y="95" width="16" height="20" rx="1" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><path d="M123 100 H133 M123 105 H133 M123 110 H130" stroke="#1b3a63" stroke-width="1.3"/></g>
<g class="f-rayons"><path d="M229 11 V3 M229 25 V33 M222 18 H214 M236 18 H244" stroke="#84b7ec" stroke-width="2" stroke-linecap="round"/></g>
<circle class="f-lampe" cx="229" cy="18" r="7" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>
<g class="f-cache"><rect x="204" y="58" width="52" height="52" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/></g>
<g class="f-fumee"><circle cx="228" cy="56" r="6" fill="#84b7ec" opacity=".5"/><circle cx="244" cy="50" r="8" fill="#84b7ec" opacity=".5"/><circle cx="259" cy="57" r="5" fill="#84b7ec" opacity=".5"/></g>
<g class="f-eclair"><path d="M238 68 l-7 15 h7 l-4.2 14 l15.4 -19.6 h-8.4 l5.6 -9.8z" fill="#ff6b35"/></g>
<g transform="translate(100 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>
<g transform="translate(180 88)"><g class="f-col">
<g class="f-col-etoiles"><g class="f-col-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-col-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-col-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>`,
  css: `.film-M9d .f-bras,.film-M9d .f-col-bras,.film-M9d .f-etoiles-r,.film-M9d .f-col-etoiles-r,.film-M9d .f-manette,.film-M9d .f-feuille{transform-box:fill-box}
.film-M9d .f-bras,.film-M9d .f-col-bras{transform-origin:0 0}
.film-M9d .f-manette{transform-origin:50% 100%}
.film-M9d .f-feuille{transform-origin:0 0}
.film-M9d .f-etoiles-r,.film-M9d .f-col-etoiles-r{transform-origin:50% 50%;animation:M9d-tourne 2.2s linear infinite}
.film-M9d .f-eclair,.film-M9d .f-fumee,.film-M9d .f-cheveux,.film-M9d .f-etoiles,.film-M9d .f-col-cheveux,.film-M9d .f-col-etoiles,.film-M9d .f-cache,.film-M9d .f-juste1,.film-M9d .f-juste2,.film-M9d .f-juste3,.film-M9d .f-feuille,.film-M9d .f-rayons{opacity:0}
@keyframes M9d-tourne{to{transform:rotate(360deg)}}
.film-M9d.acte-1 .f-manette{animation:M9d-a1-manette 12s linear forwards}
@keyframes M9d-a1-manette{0%,33%{transform:rotate(180deg)}39%,100%{transform:rotate(0)}}
.film-M9d.acte-1 .f-col-bras{animation:M9d-a1-colbras 12s linear forwards}
@keyframes M9d-a1-colbras{0%,18%{transform:rotate(0)}26%,32%{transform:rotate(-85deg)}38%,100%{transform:rotate(-55deg)}}
.film-M9d.acte-1 .f-cache{animation:M9d-a1-cache 12s linear forwards}
@keyframes M9d-a1-cache{0%,23%{opacity:0}27%,100%{opacity:1}}
.film-M9d.acte-1 .f-eclair{animation:M9d-a1-eclair 12s linear forwards}
@keyframes M9d-a1-eclair{0%,41%{opacity:0}42%,54%{opacity:1}58%,100%{opacity:0}}
.film-M9d.acte-1 .f-fumee{animation:M9d-a1-fumee 12s linear forwards}
@keyframes M9d-a1-fumee{0%,41%{opacity:0}43%,100%{opacity:1}}
.film-M9d.acte-1 .f-cheveux{animation:M9d-a1-cheveux 12s linear forwards}
@keyframes M9d-a1-cheveux{0%,41%{opacity:0}42%,100%{opacity:1}}
.film-M9d.acte-1 .f-col-cheveux{animation:M9d-a1-colcheveux 12s linear forwards}
@keyframes M9d-a1-colcheveux{0%,41%{opacity:0}42%,100%{opacity:1}}
.film-M9d.acte-1 .f-etoiles{animation:M9d-a1-etoiles 12s linear forwards}
@keyframes M9d-a1-etoiles{0%,52%{opacity:0}55%,100%{opacity:1}}
.film-M9d.acte-1 .f-col-etoiles{animation:M9d-a1-coletoiles 12s linear forwards}
@keyframes M9d-a1-coletoiles{0%,52%{opacity:0}55%,100%{opacity:1}}
.film-M9d.acte-2 .f-manette{animation:M9d-a2-manette 10s linear forwards}
@keyframes M9d-a2-manette{0%,82%{transform:rotate(180deg)}88%,100%{transform:rotate(0)}}
.film-M9d.acte-2 .f-outil1{transform-box:fill-box;animation:M9d-a2-outil1 10s linear forwards}
@keyframes M9d-a2-outil1{0%,4%{transform:translate(0,0)}14%,100%{transform:translate(66px,57px)}}
.film-M9d.acte-2 .f-outil2{transform-box:fill-box;animation:M9d-a2-outil2 10s linear forwards}
@keyframes M9d-a2-outil2{0%,18%{transform:translate(0,0)}28%,100%{transform:translate(67px,58px)}}
.film-M9d.acte-2 .f-outil3{transform-box:fill-box;animation:M9d-a2-outil3 10s linear forwards}
@keyframes M9d-a2-outil3{0%,32%{transform:translate(0,0)}42%,100%{transform:translate(65px,57px)}}
.film-M9d.acte-2 .f-juste1{animation:M9d-a2-juste1 10s linear forwards}
@keyframes M9d-a2-juste1{0%,14%{opacity:0}18%,100%{opacity:1}}
.film-M9d.acte-2 .f-juste2{animation:M9d-a2-juste2 10s linear forwards}
@keyframes M9d-a2-juste2{0%,28%{opacity:0}32%,100%{opacity:1}}
.film-M9d.acte-2 .f-juste3{animation:M9d-a2-juste3 10s linear forwards}
@keyframes M9d-a2-juste3{0%,42%{opacity:0}46%,100%{opacity:1}}
.film-M9d.acte-2 .f-bras{animation:M9d-a2-bras 10s linear forwards}
@keyframes M9d-a2-bras{0%,48%{transform:rotate(0)}54%{transform:rotate(-100deg)}60%,100%{transform:rotate(0)}}
.film-M9d.acte-2 .f-col-bras{animation:M9d-a2-colbras 10s linear forwards}
@keyframes M9d-a2-colbras{0%,48%{transform:rotate(0)}54%{transform:rotate(-100deg)}60%,83%{transform:rotate(0)}86%,89%{transform:rotate(-55deg)}94%,100%{transform:rotate(0)}}
.film-M9d.acte-2 .f-feuille{animation:M9d-a2-feuille 10s linear forwards,M9d-a2-feuillepos 10s linear forwards}
@keyframes M9d-a2-feuille{0%,61%{opacity:0}65%,100%{opacity:1}}
@keyframes M9d-a2-feuillepos{0%,65%{transform:translateX(0)}73%,100%{transform:translateX(55px)}}
.film-M9d.acte-2 .f-cadenas{animation:M9d-a2-cadenas 10s linear forwards}
@keyframes M9d-a2-cadenas{0%,76%{opacity:1}81%,100%{opacity:0}}
.film-M9d.acte-2 .f-etiquette{animation:M9d-a2-etiquette 10s linear forwards}
@keyframes M9d-a2-etiquette{0%,76%{opacity:1}81%,100%{opacity:0}}
.film-M9d.acte-2 .f-cache{animation:M9d-a2-cache 10s linear forwards}
@keyframes M9d-a2-cache{0%,86%{opacity:0}90%,100%{opacity:1}}
.film-M9d.acte-2 .f-lampe{animation:M9d-a2-lampe 10s linear forwards}
@keyframes M9d-a2-lampe{0%,87%{fill:#fffdf8}91%,100%{fill:#84b7ec}}
.film-M9d.acte-2 .f-rayons{animation:M9d-a2-rayons 10s linear forwards}
@keyframes M9d-a2-rayons{0%,87%{opacity:0}91%,100%{opacity:1}}`
};

window.INTERACTIONS = window.INTERACTIONS || {};
INTERACTIONS.M9d = {
  arret: 5.0,
  question: "Qu'est-ce qui a manqué avant de remettre sous tension ?",
  choix: [
    { t: "Compter outils et personnes, puis l'avis", ok: true },
    { t: "Remonter le levier bien plus doucement", remed: "La vitesse du geste ne change rien : rien n'a été compté avant de remettre sous tension." },
    { t: "Laisser la porte de l'armoire ouverte", remed: "Une porte restée ouverte ne remplace pas le compte des outils, des personnes et de l'avis." }
  ],
  bravo: "Personnes et outils recensés, avis de fin de travail remis : alors seulement on remet sous tension."
};
