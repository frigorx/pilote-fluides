/* ============================================================
   inerWeb HoCourant — FILM du module M8 : l'indice 0
   Un dessin animé en deux actes, SVG + animations CSS.
   Décor : un coffret fermé à gauche, un balisage orange au sol devant
   lui, un pan de mur et un pot de peinture à droite.
   Acte 1 · la situation : le bonhomme arrive avec son rouleau, franchit
   le balisage, pose la main sur la poignée et ouvre le coffret « pour
   voir » : éclair orange, cheveux dressés, secousse, il recule d'un
   bond et s'assoit par terre, étoiles autour de la tête, le rouleau
   tombe.
   Acte 2 · la leçon : même décor, il s'arrête avant le balisage, lève
   la main, un repère se pose au sol, il repart peindre le mur du fond
   à distance ; le coffret reste fermé.
   Règles : aucun texte dans le dessin ; classes préfixées « f- » ;
   sélecteurs sous .film-M8 ; l'acte se joue en posant la classe
   acte-1 ou acte-2 sur la <figure class="scene film film-M8"> ;
   aucun attribut transform sur un élément animé en CSS (le CSS
   l'écraserait) : le placement est porté par le groupe parent.
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M8 = {
  titre: "L'indice 0 : le coffret n'est pas pour moi",
  alt: "Acte 1 : une personne venue peindre franchit le balisage, ouvre le coffret fermé pour voir, un éclair jaillit, elle est projetée assise par terre et lâche son rouleau. Acte 2 : la même personne s'arrête avant le balisage, lève la main, un repère est posé au sol, puis elle peint le mur du fond à distance du coffret resté fermé.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="248" y="36" width="60" height="124" fill="#fffdf8" stroke="#1b3a63" stroke-width="2" opacity=".45"/>
<g class="f-peinture"><rect x="263" y="97" width="12" height="30" fill="#84b7ec"/></g>
<rect x="286" y="140" width="20" height="20" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="288" y="142" width="16" height="4" fill="#84b7ec"/>
<path d="M288 140 a8 8 0 0 1 16 0" fill="none" stroke="#1b3a63" stroke-width="2" stroke-linecap="round"/>
<rect x="28" y="56" width="72" height="84" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="36" y="66" width="56" height="6" fill="#84b7ec"/><rect x="36" y="80" width="56" height="6" fill="#84b7ec"/>
<path class="f-fil" d="M40 106 C 52 98, 70 112, 88 102" stroke="#c0392b" stroke-width="4" fill="none" stroke-linecap="round"/>
<circle cx="88" cy="102" r="3.5" fill="#c0392b"/>
<g class="f-porte"><rect x="30" y="58" width="68" height="80" rx="3" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/><rect x="84" y="91" width="5" height="14" rx="2" fill="#1b3a63"/><path d="M34 64 v8 M34 124 v8" stroke="#1b3a63" stroke-width="2.5" stroke-linecap="round"/></g>
<g class="f-eclair"><path d="M96 80 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>
<path d="M138 64 V160" stroke="#ff6b35" stroke-width="4" stroke-dasharray="11 7"/>
<g class="f-repere"><path d="M151 160 L160 136 L169 160 Z" fill="#ff6b35"/><path d="M147 160 H173" stroke="#ff6b35" stroke-width="3" stroke-linecap="round"/></g>
<g class="f-roul-sol"><rect x="102" y="153" width="14" height="7" rx="3" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/><path d="M116 156 L130 149" stroke="#1b3a63" stroke-width="2.5" stroke-linecap="round"/></g>
<g transform="translate(262 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-debout">
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
</g>
<g class="f-assis"><path d="M0 48 L-14 50 L-24 57 M0 48 L14 50 L24 57" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>
<g transform="rotate(-24 0 24)"><g class="f-roul-bras"><path d="M0 24 V50" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="0" cy="50" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/><g class="f-roul"><path d="M0 54 V63" stroke="#1b3a63" stroke-width="2.5" stroke-linecap="round"/><rect x="-7" y="62" width="14" height="7" rx="3" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/></g></g></g>
<g class="f-bras"><path d="M0 24 L-12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="-12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>`,
  css: `.film-M8 .f-bon,.film-M8 .f-jg,.film-M8 .f-jd,.film-M8 .f-bras,.film-M8 .f-roul-bras,.film-M8 .f-porte,.film-M8 .f-peinture,.film-M8 .f-etoiles-r{transform-box:fill-box}
.film-M8 .f-jg{transform-origin:100% 0}.film-M8 .f-jd{transform-origin:0 0}.film-M8 .f-bras{transform-origin:100% 0}.film-M8 .f-roul-bras{transform-origin:50% 0}
.film-M8 .f-porte{transform-origin:0 50%}.film-M8 .f-peinture{transform-origin:50% 0;transform:scaleY(0)}
.film-M8 .f-etoiles-r{transform-origin:50% 50%;animation:M8-tourne 2.2s linear infinite}
.film-M8 .f-eclair,.film-M8 .f-cheveux,.film-M8 .f-etoiles,.film-M8 .f-repere,.film-M8 .f-roul-sol,.film-M8 .f-assis{opacity:0}
@keyframes M8-tourne{to{transform:rotate(360deg)}}
@keyframes M8-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M8-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M8.acte-1 .f-bon{animation:M8-a1-bon 12s linear forwards}
@keyframes M8-a1-bon{0%{transform:translate(0,0)}28%{transform:translate(-146px,0)}44%{transform:translate(-146px,0)}46%{transform:translate(-151px,0)}48%{transform:translate(-141px,0)}50%{transform:translate(-151px,0)}52%{transform:translate(-141px,0)}53%{transform:translate(-146px,0)}56%{transform:translate(-114px,-18px)}59%{transform:translate(-90px,16px)}100%{transform:translate(-90px,16px)}}
.film-M8.acte-1 .f-jg{animation:M8-pas-g .48s ease-in-out 7 alternate}
.film-M8.acte-1 .f-jd{animation:M8-pas-d .48s ease-in-out 7 alternate}
.film-M8.acte-1 .f-debout{animation:M8-a1-debout 12s linear forwards}
@keyframes M8-a1-debout{0%,57%{opacity:1}58%,100%{opacity:0}}
.film-M8.acte-1 .f-assis{animation:M8-a1-assis 12s linear forwards}
@keyframes M8-a1-assis{0%,57%{opacity:0}58%,100%{opacity:1}}
.film-M8.acte-1 .f-bras{animation:M8-a1-bras 12s linear forwards}
@keyframes M8-a1-bras{0%,28%{transform:rotate(0)}36%{transform:rotate(64deg)}53%{transform:rotate(64deg)}58%{transform:rotate(0)}100%{transform:rotate(0)}}
.film-M8.acte-1 .f-porte{animation:M8-a1-porte 12s linear forwards}
@keyframes M8-a1-porte{0%,37%{transform:scaleX(1)}43%,100%{transform:scaleX(.08)}}
.film-M8.acte-1 .f-eclair{animation:M8-a1-eclair 12s linear forwards}
@keyframes M8-a1-eclair{0%,43%{opacity:0}44%{opacity:1}46%{opacity:.3}48%{opacity:1}50%{opacity:.3}52%{opacity:1}55%,100%{opacity:0}}
.film-M8.acte-1 .f-fil{animation:M8-a1-fil 12s linear forwards}
@keyframes M8-a1-fil{0%,43%{stroke:#c0392b}44%,52%{stroke:#ff6b35}55%,100%{stroke:#c0392b}}
.film-M8.acte-1 .f-cheveux{animation:M8-a1-cheveux 12s linear forwards}
@keyframes M8-a1-cheveux{0%,43%{opacity:0}44%,100%{opacity:1}}
.film-M8.acte-1 .f-roul{animation:M8-a1-roul 12s linear forwards}
@keyframes M8-a1-roul{0%,54%{opacity:1}55%,100%{opacity:0}}
.film-M8.acte-1 .f-roul-sol{animation:M8-a1-roul-sol 12s linear forwards}
@keyframes M8-a1-roul-sol{0%,57%{opacity:0}59%,100%{opacity:1}}
.film-M8.acte-1 .f-etoiles{animation:M8-a1-etoiles 12s linear forwards}
@keyframes M8-a1-etoiles{0%,59%{opacity:0}62%,100%{opacity:1}}
.film-M8.acte-2 .f-bon{animation:M8-a2-bon 10s linear forwards}
@keyframes M8-a2-bon{0%{transform:translateX(0)}29%{transform:translateX(-72px)}52%{transform:translateX(-72px)}62%{transform:translateX(-30px)}100%{transform:translateX(-30px)}}
.film-M8.acte-2 .f-jg{animation:M8-pas-g .48s ease-in-out 6 alternate,M8-pas-g .48s ease-in-out 5.2s 2 alternate}
.film-M8.acte-2 .f-jd{animation:M8-pas-d .48s ease-in-out 6 alternate,M8-pas-d .48s ease-in-out 5.2s 2 alternate}
.film-M8.acte-2 .f-bras{animation:M8-a2-bras 10s linear forwards}
@keyframes M8-a2-bras{0%,30%{transform:rotate(0)}38%{transform:rotate(84deg)}50%{transform:rotate(84deg)}58%{transform:rotate(0)}100%{transform:rotate(0)}}
.film-M8.acte-2 .f-repere{animation:M8-a2-repere 10s linear forwards}
@keyframes M8-a2-repere{0%,50%{opacity:0}55%,100%{opacity:1}}
.film-M8.acte-2 .f-roul-bras{animation:M8-a2-roul-bras 10s linear forwards}
@keyframes M8-a2-roul-bras{0%,60%{transform:rotate(0)}64%{transform:rotate(-55deg)}68%{transform:rotate(-80deg)}72%{transform:rotate(-55deg)}76%{transform:rotate(-80deg)}80%{transform:rotate(-55deg)}84%{transform:rotate(-80deg)}88%{transform:rotate(-55deg)}92%{transform:rotate(-80deg)}96%{transform:rotate(-55deg)}100%{transform:rotate(-68deg)}}
.film-M8.acte-2 .f-peinture{animation:M8-a2-peinture 10s linear forwards}
@keyframes M8-a2-peinture{0%,64%{transform:scaleY(0)}96%,100%{transform:scaleY(1)}}`
};
