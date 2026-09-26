/* ============================================================
   inerWeb HoCourant — FILM du module M5 : la peau mouillée et la
   carcasse sous tension. Un dessin animé en deux actes, SVG + CSS.
   Acte 1 · la situation : le bonhomme entre par la gauche, les mains
   mouillées (gouttes), pose la main sur la carcasse du lave-linge :
   éclair, carcasse orange, cheveux dressés, la main reste collée,
   le corps tremble, étoiles.
   Acte 2 · la leçon : même décor. Au contact, le repère orange
   clignote sur le boîtier différentiel dont le levier tombe : coupé.
   La main se détache, le bonhomme recule d'un pas, secoue la main,
   lève l'autre main pour signaler ; un panneau apparaît au-dessus
   de l'appareil.
   Règles : aucun texte, aucun id ; classes « f- » ; sélecteurs sous
   .film-M5 ; animations nommées M5-… ; aucun attribut transform sur
   un élément animé en CSS (placement par le groupe parent).
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M5 = {
  titre: "Peau mouillée, carcasse sous tension : le différentiel coupe",
  alt: "Acte 1 : une personne aux mains mouillées pose la main sur la carcasse métallique d'un lave-linge dont le tuyau goutte au sol ; éclair, cheveux dressés, la main reste collée et le corps tremble. Acte 2 : au contact, le boîtier différentiel au mur clignote et coupe aussitôt ; la main se détache, la personne recule, secoue la main, lève l'autre main pour signaler, et un panneau de danger apparaît au-dessus de l'appareil.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<path d="M12 28 V160" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<g class="f-repere"><rect x="13" y="35" width="44" height="54" rx="6" fill="none" stroke="#ff6b35" stroke-width="3"/></g>
<rect x="18" y="40" width="34" height="44" rx="3" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="24" y="46" width="22" height="7" fill="#84b7ec"/>
<g transform="translate(35 74)"><g class="f-levier"><rect x="-3" y="-14" width="6" height="14" rx="2" fill="#1b3a63"/></g><circle cx="0" cy="0" r="3.5" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/></g>
<rect class="f-carcasse" x="200" y="82" width="78" height="78" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="206" y="88" width="66" height="10" fill="#e8f1fb"/>
<circle cx="214" cy="93" r="3" fill="#1b3a63"/><rect x="226" y="90" width="22" height="6" rx="1" fill="#84b7ec"/>
<circle cx="239" cy="128" r="20" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/><circle cx="239" cy="128" r="13" fill="#84b7ec"/>
<path d="M204 146 C194 146, 187 148, 186 151" stroke="#1b3a63" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M204 146 C194 146, 187 148, 186 151" stroke="#84b7ec" stroke-width="3" fill="none" stroke-linecap="round"/>
<ellipse cx="184" cy="160" rx="12" ry="3" fill="#84b7ec" stroke="#1b3a63" stroke-width="1.5"/>
<g transform="translate(186 153)"><g class="f-goutte"><circle cx="0" cy="0" r="2.2" fill="#84b7ec"/></g></g>
<g class="f-eclair"><path d="M206 88 l-7 15.4 h7 l-4.2 14 l15.4 -19.6 h-8.4 l5.6 -9.8z" fill="#ff6b35"/></g>
<g class="f-panneau"><path d="M239 14 L258 46 H220 Z" fill="#fff4e0" stroke="#1b3a63" stroke-width="2.5" stroke-linejoin="round"/><path d="M239 22 l-4 8.8 h4 l-2.4 8 l8.8 -11.2 h-4.8 l3.2 -5.6z" fill="#ff6b35"/></g>
<g transform="translate(64 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<g class="f-bras2"><path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="-10" cy="47" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/><g class="f-goutte"><circle cx="-12" cy="54" r="1.8" fill="#84b7ec"/></g><g class="f-goutte-b"><circle cx="-7" cy="53" r="1.4" fill="#84b7ec"/></g></g>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/><g class="f-goutte"><circle cx="13" cy="56" r="1.8" fill="#84b7ec"/></g><g class="f-goutte-b"><circle cx="8" cy="55" r="1.4" fill="#84b7ec"/></g></g>
</g></g>`,
  css: `.film-M5 .f-bon,.film-M5 .f-jg,.film-M5 .f-jd,.film-M5 .f-bras,.film-M5 .f-bras2,.film-M5 .f-levier,.film-M5 .f-etoiles-r{transform-box:fill-box}
.film-M5 .f-jg{transform-origin:100% 0}.film-M5 .f-jd{transform-origin:0 0}.film-M5 .f-bras{transform-origin:0 0}.film-M5 .f-bras2{transform-origin:100% 0}.film-M5 .f-levier{transform-origin:50% 100%}
.film-M5 .f-etoiles-r{transform-origin:50% 50%;animation:M5-tourne 2.2s linear infinite}
.film-M5 .f-goutte{animation:M5-goutte .9s linear infinite}
.film-M5 .f-goutte-b{animation:M5-goutte .9s linear .45s infinite}
.film-M5 .f-eclair,.film-M5 .f-cheveux,.film-M5 .f-etoiles,.film-M5 .f-repere,.film-M5 .f-panneau{opacity:0}
@keyframes M5-tourne{to{transform:rotate(360deg)}}
@keyframes M5-goutte{from{transform:translateY(0);opacity:1}to{transform:translateY(7px);opacity:0}}
@keyframes M5-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M5-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M5.acte-1 .f-bon{animation:M5-a1-bon 12s linear forwards}
@keyframes M5-a1-bon{0%{transform:translateX(0)}28%,38%{transform:translateX(104px)}40%,44%,48%,52%,56%,60%,64%,68%,72%,76%,80%,84%,88%{transform:translateX(101px)}42%,46%,50%,54%,58%,62%,66%,70%,74%,78%,82%,86%,90%{transform:translateX(107px)}92%,100%{transform:translateX(104px)}}
.film-M5.acte-1 .f-jg{animation:M5-pas-g .48s ease-in-out 7 alternate}
.film-M5.acte-1 .f-jd{animation:M5-pas-d .48s ease-in-out 7 alternate}
.film-M5.acte-1 .f-bras{animation:M5-a1-bras 12s linear forwards}
@keyframes M5-a1-bras{0%,28%{transform:rotate(0)}38%,100%{transform:rotate(-64deg)}}
.film-M5.acte-1 .f-eclair{animation:M5-a1-eclair 12s linear forwards}
@keyframes M5-a1-eclair{0%,37%{opacity:0}38%{opacity:1}40%{opacity:.3}42%{opacity:1}44%{opacity:.3}46%{opacity:1}48%{opacity:.3}50%{opacity:1}54%{opacity:.3}58%{opacity:1}62%{opacity:.3}66%,100%{opacity:1}}
.film-M5.acte-1 .f-carcasse{animation:M5-a1-carcasse 12s linear forwards}
@keyframes M5-a1-carcasse{0%,37%{stroke:#1b3a63}38%,100%{stroke:#ff6b35}}
.film-M5.acte-1 .f-cheveux{animation:M5-a1-cheveux 12s linear forwards}
@keyframes M5-a1-cheveux{0%,37%{opacity:0}38%,100%{opacity:1}}
.film-M5.acte-1 .f-etoiles{animation:M5-a1-etoiles 12s linear forwards}
@keyframes M5-a1-etoiles{0%,60%{opacity:0}63%,100%{opacity:1}}
.film-M5.acte-2 .f-bon{animation:M5-a2-bon 10s linear forwards}
@keyframes M5-a2-bon{0%{transform:translateX(0)}24%,36%{transform:translateX(104px)}44%,100%{transform:translateX(74px)}}
.film-M5.acte-2 .f-jg{animation:M5-pas-g .48s ease-in-out 5 alternate}
.film-M5.acte-2 .f-jd{animation:M5-pas-d .48s ease-in-out 5 alternate}
.film-M5.acte-2 .f-bras{animation:M5-a2-bras 10s linear forwards}
@keyframes M5-a2-bras{0%,24%{transform:rotate(0)}30%,34%{transform:rotate(-64deg)}38%,44%{transform:rotate(-30deg)}46%{transform:rotate(-54deg)}48%{transform:rotate(-30deg)}50%{transform:rotate(-54deg)}52%{transform:rotate(-30deg)}54%{transform:rotate(-54deg)}56%{transform:rotate(-30deg)}58%{transform:rotate(-54deg)}60%,100%{transform:rotate(-30deg)}}
.film-M5.acte-2 .f-bras2{animation:M5-a2-bras2 10s linear forwards}
@keyframes M5-a2-bras2{0%,60%{transform:rotate(0)}68%,100%{transform:rotate(108deg)}}
.film-M5.acte-2 .f-eclair{animation:M5-a2-eclair 10s linear forwards}
@keyframes M5-a2-eclair{0%,29%{opacity:0}30%,32%{opacity:1}34%,100%{opacity:0}}
.film-M5.acte-2 .f-carcasse{animation:M5-a2-carcasse 10s linear forwards}
@keyframes M5-a2-carcasse{0%,29%{stroke:#1b3a63}30%,33%{stroke:#ff6b35}34%,100%{stroke:#1b3a63}}
.film-M5.acte-2 .f-cheveux{animation:M5-a2-cheveux 10s linear forwards}
@keyframes M5-a2-cheveux{0%,29%{opacity:0}30%,36%{opacity:1}40%,100%{opacity:0}}
.film-M5.acte-2 .f-repere{animation:M5-a2-repere 10s linear forwards}
@keyframes M5-a2-repere{0%,29%{opacity:0}30%{opacity:1}32%{opacity:0}34%{opacity:1}36%{opacity:0}38%{opacity:1}40%{opacity:0}42%,100%{opacity:1}}
.film-M5.acte-2 .f-levier{animation:M5-a2-levier 10s linear forwards}
@keyframes M5-a2-levier{0%,32%{transform:rotate(0)}35%,100%{transform:rotate(180deg)}}
.film-M5.acte-2 .f-panneau{animation:M5-a2-panneau 10s linear forwards}
@keyframes M5-a2-panneau{0%,74%{opacity:0}78%,100%{opacity:1}}`
};
