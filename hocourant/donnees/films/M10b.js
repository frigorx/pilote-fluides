/* ============================================================
   inerWeb HoCourant — FILM M10b : la lampe qu'on ouvre trop vite
   Un dessin animé en deux actes, SVG + animations CSS (vague 2, écran
   M10.0 « Le BS »). Acte 1 · la situation : le bonhomme bascule
   l'interrupteur mural, démonte l'applique grillée et saisit les fils :
   l'interrupteur ne coupe que la lampe, pas le circuit ; éclair, cheveux
   dressés, étoiles. Acte 2 · la leçon : il coupe le disjoncteur du
   circuit au petit tableau, y pose une étiquette, vérifie l'absence de
   tension sur les fils, remplace la lampe à l'identique et remet le
   disjoncteur : la lampe s'allume.
   Règles : aucun texte dans le dessin ; classes préfixées « f- » ;
   sélecteurs sous .film-M10b ; l'acte se joue en posant la classe
   acte-1 ou acte-2 sur la <figure class="scene film film-M10b"> ;
   aucun attribut transform sur un élément animé en CSS : le placement
   est porté par le groupe parent.
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M10b = {
  titre: "Le BS : remplacer une lampe, mais après avoir coupé",
  alt: "Acte 1 : une personne bascule l'interrupteur mural, démonte une applique et saisit les fils : un éclair la secoue, ses cheveux se dressent. Acte 2 : la même personne coupe le disjoncteur du circuit au petit tableau, pose une étiquette, vérifie l'absence de tension puis remplace la lampe et remet le disjoncteur.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="103" y="24" width="14" height="9" rx="1" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<g class="f-halo"><circle cx="110" cy="46" r="24" fill="#ff6b35" opacity=".22"/></g>
<g transform="translate(110 33)"><g class="f-abat"><path d="M0 0 L-18 24 H18 Z" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5" stroke-linejoin="round"/></g></g>
<g class="f-fils-int"><path d="M104 46 Q100 53 96 57" stroke="#c0392b" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M116 46 Q120 53 124 57" stroke="#c0392b" stroke-width="3" fill="none" stroke-linecap="round"/></g>
<rect x="99" y="72" width="15" height="21" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<g transform="translate(106 78)"><rect class="f-inter" x="-4" y="0" width="8" height="8" rx="1" fill="#84b7ec"/></g>
<rect x="238" y="58" width="62" height="64" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="244" y="65" width="50" height="6" fill="#84b7ec"/>
<rect class="f-disj" x="244" y="80" width="22" height="32" rx="3" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>
<g transform="translate(255 93)"><g class="f-manette"><path d="M0 0 V13" stroke="#1b3a63" stroke-width="3.5" stroke-linecap="round"/><circle cx="0" cy="13" r="3.2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g></g>
<circle cx="255" cy="93" r="2.2" fill="#1b3a63"/>
<g class="f-etiquette"><rect x="272" y="78" width="15" height="11" rx="1.5" fill="#ff6b35"/></g>
<g class="f-eclair"><path d="M100 40 l-8 17 h8 l-5 15 l17 -21 h-9 l6 -11z" fill="#ff6b35"/></g>
<g transform="translate(20 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/><g class="f-vat"><rect x="8" y="35" width="6" height="14" rx="1.5" fill="#1b3a63"/><circle cx="11" cy="33" r="2.4" fill="#e8f1fb" stroke="#1b3a63" stroke-width="1.5"/></g></g>
</g></g>`,
  css: `.film-M10b .f-bon,.film-M10b .f-jg,.film-M10b .f-jd,.film-M10b .f-bras,.film-M10b .f-etoiles-r,.film-M10b .f-abat,.film-M10b .f-manette{transform-box:fill-box}
.film-M10b .f-jg{transform-origin:100% 0}.film-M10b .f-jd{transform-origin:0 0}.film-M10b .f-bras{transform-origin:0 0}
.film-M10b .f-abat{transform-origin:50% 0%}.film-M10b .f-manette{transform-origin:50% 0%}
.film-M10b .f-etoiles-r{transform-origin:50% 50%;animation:M10b-tourne 2.2s linear infinite}
.film-M10b .f-eclair,.film-M10b .f-cheveux,.film-M10b .f-etoiles,.film-M10b .f-fils-int,.film-M10b .f-halo,.film-M10b .f-etiquette,.film-M10b .f-vat{opacity:0}
@keyframes M10b-tourne{to{transform:rotate(360deg)}}
@keyframes M10b-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M10b-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M10b.acte-1 .f-bon{animation:M10b-a1-bon 12s linear forwards}
@keyframes M10b-a1-bon{0%{transform:translateX(0)}26%,40%{transform:translateX(70px)}42%{transform:translateX(66px)}44%{transform:translateX(74px)}46%{transform:translateX(66px)}48%{transform:translateX(74px)}50%{transform:translateX(70px)}58%,100%{transform:translateX(55px)}}
.film-M10b.acte-1 .f-jg{animation:M10b-pas-g .52s ease-in-out 6 alternate}
.film-M10b.acte-1 .f-jd{animation:M10b-pas-d .52s ease-in-out 6 alternate}
.film-M10b.acte-1 .f-bras{animation:M10b-a1-bras 12s linear forwards}
@keyframes M10b-a1-bras{0%,26%{transform:rotate(0)}30%,34%{transform:rotate(-35deg)}36%{transform:rotate(0)}38%{transform:rotate(-100deg)}40%,50%{transform:rotate(-120deg)}58%,100%{transform:rotate(-40deg)}}
.film-M10b.acte-1 .f-inter{animation:M10b-a1-inter 12s linear forwards}
@keyframes M10b-a1-inter{0%,29%{transform:translateY(0)}33%,100%{transform:translateY(6px)}}
.film-M10b.acte-1 .f-abat{animation:M10b-a1-abat 12s linear forwards}
@keyframes M10b-a1-abat{0%,37%{transform:rotate(0)}42%,100%{transform:rotate(35deg)}}
.film-M10b.acte-1 .f-fils-int{animation:M10b-a1-fils 12s linear forwards}
@keyframes M10b-a1-fils{0%,41%{opacity:0}42%,100%{opacity:1}}
.film-M10b.acte-1 .f-eclair{animation:M10b-a1-eclair 12s linear forwards}
@keyframes M10b-a1-eclair{0%,39%{opacity:0}40%{opacity:1}42%{opacity:.3}44%{opacity:1}46%{opacity:.3}48%{opacity:1}52%,100%{opacity:0}}
.film-M10b.acte-1 .f-cheveux{animation:M10b-a1-cheveux 12s linear forwards}
@keyframes M10b-a1-cheveux{0%,39%{opacity:0}40%,100%{opacity:1}}
.film-M10b.acte-1 .f-etoiles{animation:M10b-a1-etoiles 12s linear forwards}
@keyframes M10b-a1-etoiles{0%,57%{opacity:0}60%,100%{opacity:1}}
.film-M10b.acte-2 .f-bon{animation:M10b-a2-bon 10s linear forwards}
@keyframes M10b-a2-bon{0%{transform:translateX(0)}18%,34%{transform:translateX(200px)}52%,68%{transform:translateX(70px)}86%,100%{transform:translateX(200px)}}
.film-M10b.acte-2 .f-jg{animation:M10b-pas-g .45s ease-in-out 4 alternate,M10b-pas-g .45s ease-in-out 4 alternate 3.4s,M10b-pas-g .45s ease-in-out 4 alternate 6.8s}
.film-M10b.acte-2 .f-jd{animation:M10b-pas-d .45s ease-in-out 4 alternate,M10b-pas-d .45s ease-in-out 4 alternate 3.4s,M10b-pas-d .45s ease-in-out 4 alternate 6.8s}
.film-M10b.acte-2 .f-bras{animation:M10b-a2-bras 10s linear forwards}
@keyframes M10b-a2-bras{0%,18%{transform:rotate(0)}22%,30%{transform:rotate(-70deg)}34%,52%{transform:rotate(0)}56%,64%{transform:rotate(-115deg)}68%,86%{transform:rotate(0)}90%,94%{transform:rotate(-70deg)}100%{transform:rotate(-30deg)}}
.film-M10b.acte-2 .f-manette{animation:M10b-a2-manette 10s linear forwards}
@keyframes M10b-a2-manette{0%,22%{transform:rotate(0)}26%,90%{transform:rotate(150deg)}94%,100%{transform:rotate(0)}}
.film-M10b.acte-2 .f-etiquette{animation:M10b-a2-etiquette 10s linear forwards}
@keyframes M10b-a2-etiquette{0%,27%{opacity:0}30%,100%{opacity:1}}
.film-M10b.acte-2 .f-abat{animation:M10b-a2-abat 10s linear forwards}
@keyframes M10b-a2-abat{0%,53%{transform:rotate(0)}57%,64%{transform:rotate(35deg)}68%,100%{transform:rotate(0)}}
.film-M10b.acte-2 .f-fils-int{animation:M10b-a2-fils 10s linear forwards}
@keyframes M10b-a2-fils{0%,53%{opacity:0}57%,64%{opacity:1}68%,100%{opacity:0}}
.film-M10b.acte-2 .f-vat{animation:M10b-a2-vat 10s linear forwards}
@keyframes M10b-a2-vat{0%,54%{opacity:0}56%,65%{opacity:1}67%,100%{opacity:0}}
.film-M10b.acte-2 .f-halo{animation:M10b-a2-halo 10s linear forwards}
@keyframes M10b-a2-halo{0%,93%{opacity:0}96%,100%{opacity:1}}`
};

window.INTERACTIONS = window.INTERACTIONS || {};
INTERACTIONS.M10b = {
  arret: 4.8,
  question: "Qu'est-ce qui a manqué avant de toucher les fils ?",
  choix: [
    { t: "Couper au tableau et vérifier l'absence de tension", ok: true },
    { t: "Éteindre l'interrupteur mural avant de démonter", remed: "Un interrupteur mural commande la lampe, pas le circuit qui l'alimente." },
    { t: "Attendre que la lampe ait bien fini de refroidir", remed: "La chaleur n'est pas le risque ici : c'est le courant resté présent dans les fils." }
  ],
  bravo: "Couper au tableau, puis vérifier : c'est ce qui rend le contact impossible."
};
