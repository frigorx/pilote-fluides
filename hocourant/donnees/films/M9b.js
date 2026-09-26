/* ============================================================
   inerWeb HoCourant — FILM du module M9b : l'arrêt qui ne prouve rien
   Un dessin animé en deux actes, SVG + animations CSS.
   Décor : un groupe extérieur de climatisation à droite (ventilateur au
   repos sur le dessus, capot ouvert sur le bornier), un interrupteur de
   proximité à gauche avec sa poignée, le sol.
   Acte 1 · la situation : le bonhomme marche jusqu'au groupe arrêté et
   pose la main sur le bornier sans toucher à l'interrupteur. Le
   ventilateur repart d'un coup, éclair au bornier, la casquette
   s'envole, cheveux dressés, secousse, il retombe assis, étoiles.
   Acte 2 · la leçon : il s'arrête d'abord à l'interrupteur de proximité,
   tourne la poignée sur arrêt, pose cadenas et étiquette, fait la
   vérification d'absence de tension au bornier (voyant éteint), puis
   ouvre le capot et travaille.
   Règles : aucun texte, aucun id ; classes « f- » ; sélecteurs sous
   .film-M9b ; images-clés préfixées M9b- ; aucun attribut transform sur
   un élément animé (le placement est porté par le groupe parent).
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M9b = {
  titre: "Arrêt apparent : la situation, puis la preuve",
  alt: "Acte 1 : une personne pose la main sur le bornier d'un groupe extérieur dont le ventilateur est arrêté ; le ventilateur repart d'un coup, un éclair jaillit, sa casquette s'envole et elle retombe assise, entourée d'étoiles. Acte 2 : la même personne tourne d'abord la poignée de l'interrupteur de proximité, pose un cadenas et une étiquette, vérifie l'absence de tension au bornier, puis ouvre le capot et travaille.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="100" y="94" width="22" height="34" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M111 128 V160" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<circle cx="111" cy="100" r="3" fill="#1b3a63"/>
<g transform="translate(111 100)"><g class="f-manette"><rect x="-3.5" y="-13" width="7" height="13" rx="2" fill="#1b3a63"/></g></g>
<g class="f-cadenas"><path d="M107 113 v-3 a4 4 0 0 1 8 0 v3" stroke="#1b3a63" stroke-width="2.5" fill="none"/><rect x="105" y="113" width="12" height="10" rx="2" fill="#ff6b35" stroke="#1b3a63" stroke-width="2"/></g>
<g class="f-etiquette"><path d="M105 116 H92" stroke="#1b3a63" stroke-width="2"/><rect x="74" y="110" width="18" height="12" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><rect x="77" y="114" width="12" height="3" fill="#ff6b35"/></g>
<rect x="200" y="60" width="90" height="80" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M200 60 l-16 8 v64 l16 8" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect x="208" y="70" width="74" height="6" fill="#84b7ec"/><rect x="208" y="84" width="74" height="6" fill="#84b7ec"/>
<path class="f-filb" d="M276 100 H216 C204 100, 196 106, 188 112" stroke="#c0392b" stroke-width="4" fill="none" stroke-linecap="round"/>
<circle class="f-boutb" cx="188" cy="112" r="3.5" fill="#c0392b"/>
<g class="f-eclair"><path d="M184 96 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>
<g class="f-vat"><path d="M197 102 L190 110 M206 102 L214 101" stroke="#1b3a63" stroke-width="2" stroke-linecap="round"/><rect x="192" y="80" width="18" height="22" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><rect x="196" y="84" width="10" height="6" fill="#84b7ec"/></g>
<g class="f-juste"><circle cx="200" cy="46" r="9" fill="#fffdf8" stroke="#1e7e54" stroke-width="2.5"/><path d="M195 46 l4 4 l7 -8" stroke="#1e7e54" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<g transform="translate(245 38)"><circle r="17" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/><g class="f-ventilo"><path d="M0 -13 L3 0 L0 13 L-3 0 Z M-13 0 L0 3 L13 0 L0 -3 Z" fill="#84b7ec" stroke="#1b3a63" stroke-width="1.2" stroke-linejoin="round"/></g></g>
<g transform="translate(30 88)"><g class="f-bon">
<g class="f-casquette"><path d="M-9 0 A9 7 0 0 1 9 0 L9 2 L-9 2 Z" fill="#84b7ec" stroke="#1b3a63" stroke-width="2" stroke-linejoin="round"/><path d="M6 1 L17 2" stroke="#1b3a63" stroke-width="2" stroke-linecap="round"/></g>
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>`,
  css: `.film-M9b .f-bon,.film-M9b .f-jg,.film-M9b .f-jd,.film-M9b .f-bras,.film-M9b .f-etoiles-r,.film-M9b .f-manette,.film-M9b .f-ventilo,.film-M9b .f-casquette{transform-box:fill-box}
.film-M9b .f-jg{transform-origin:100% 0}.film-M9b .f-jd{transform-origin:0 0}.film-M9b .f-bras{transform-origin:0 0}
.film-M9b .f-manette{transform-origin:50% 100%}.film-M9b .f-ventilo{transform-origin:50% 50%}.film-M9b .f-casquette{transform-origin:50% 100%}
.film-M9b .f-etoiles-r{transform-origin:50% 50%;animation:M9b-tourne 2.2s linear infinite}
.film-M9b .f-eclair,.film-M9b .f-cheveux,.film-M9b .f-etoiles,.film-M9b .f-cadenas,.film-M9b .f-etiquette,.film-M9b .f-vat,.film-M9b .f-juste{opacity:0}
@keyframes M9b-tourne{to{transform:rotate(360deg)}}
@keyframes M9b-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M9b-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M9b.acte-1 .f-bon{animation:M9b-a1-bon 12s linear forwards}
@keyframes M9b-a1-bon{0%{transform:translate(0,0)}24%{transform:translate(130px,0)}56%{transform:translate(130px,0)}62%{transform:translate(122px,20px)}100%{transform:translate(122px,20px)}}
.film-M9b.acte-1 .f-jg{animation:M9b-pas-g .48s ease-in-out 6 alternate,M9b-a1-assis-g 4s linear 6.72s forwards}
.film-M9b.acte-1 .f-jd{animation:M9b-pas-d .48s ease-in-out 6 alternate,M9b-a1-assis-d 4s linear 6.72s forwards}
@keyframes M9b-a1-assis-g{0%{transform:rotate(0)}20%,100%{transform:rotate(-118deg)}}
@keyframes M9b-a1-assis-d{0%{transform:rotate(0)}20%,100%{transform:rotate(-69deg)}}
.film-M9b.acte-1 .f-bras{animation:M9b-a1-bras 12s linear forwards}
@keyframes M9b-a1-bras{0%,20%{transform:rotate(0)}32%{transform:rotate(-64deg)}56%{transform:rotate(-64deg)}62%,100%{transform:rotate(-20deg)}}
.film-M9b.acte-1 .f-ventilo{animation:M9b-a1-ventilo 12s linear forwards}
@keyframes M9b-a1-ventilo{0%,40%{transform:rotate(0)}100%{transform:rotate(1800deg)}}
.film-M9b.acte-1 .f-casquette{animation:M9b-a1-casquette 12s linear forwards}
@keyframes M9b-a1-casquette{0%,40%{transform:translate(0,0) rotate(0)}55%,100%{transform:translate(-16px,-24px) rotate(-55deg)}}
.film-M9b.acte-1 .f-eclair{animation:M9b-a1-eclair 12s linear forwards}
@keyframes M9b-a1-eclair{0%,39%{opacity:0}40%,50%{opacity:1}52%,100%{opacity:0}}
.film-M9b.acte-1 .f-cheveux{animation:M9b-a1-cheveux 12s linear forwards}
@keyframes M9b-a1-cheveux{0%,39%{opacity:0}40%,100%{opacity:1}}
.film-M9b.acte-1 .f-etoiles{animation:M9b-a1-etoiles 12s linear forwards}
@keyframes M9b-a1-etoiles{0%,62%{opacity:0}65%,100%{opacity:1}}
.film-M9b.acte-2 .f-bon{animation:M9b-a2-bon 10s linear forwards}
@keyframes M9b-a2-bon{0%{transform:translateX(0)}16%,34%{transform:translateX(60px)}52%,100%{transform:translateX(130px)}}
.film-M9b.acte-2 .f-jg{animation:M9b-pas-g .48s ease-in-out 3 alternate,M9b-pas-g .48s ease-in-out 3 alternate 3.4s}
.film-M9b.acte-2 .f-jd{animation:M9b-pas-d .48s ease-in-out 3 alternate,M9b-pas-d .48s ease-in-out 3 alternate 3.4s}
.film-M9b.acte-2 .f-bras{animation:M9b-a2-bras 10s linear forwards}
@keyframes M9b-a2-bras{0%,16%{transform:rotate(0)}20%{transform:rotate(-35deg)}30%{transform:rotate(-35deg)}34%{transform:rotate(0)}52%,56%{transform:rotate(-64deg)}66%{transform:rotate(-64deg)}70%,100%{transform:rotate(-30deg)}}
.film-M9b.acte-2 .f-manette{animation:M9b-a2-manette 10s linear forwards}
@keyframes M9b-a2-manette{0%,20%{transform:rotate(0)}24%,100%{transform:rotate(180deg)}}
.film-M9b.acte-2 .f-cadenas{animation:M9b-a2-cadenas 10s linear forwards}
@keyframes M9b-a2-cadenas{0%,26%{opacity:0}30%,100%{opacity:1}}
.film-M9b.acte-2 .f-etiquette{animation:M9b-a2-etiquette 10s linear forwards}
@keyframes M9b-a2-etiquette{0%,30%{opacity:0}34%,100%{opacity:1}}
.film-M9b.acte-2 .f-vat{animation:M9b-a2-vat 10s linear forwards}
@keyframes M9b-a2-vat{0%,50%{opacity:0}54%{opacity:1}68%{opacity:1}72%,100%{opacity:0}}
.film-M9b.acte-2 .f-juste{animation:M9b-a2-juste 10s linear forwards}
@keyframes M9b-a2-juste{0%,58%{opacity:0}62%,100%{opacity:1}}
.film-M9b.acte-2 .f-filb{animation:M9b-a2-filb 10s linear forwards}
@keyframes M9b-a2-filb{0%,24%{stroke:#c0392b}28%,100%{stroke:#1b3a63}}
.film-M9b.acte-2 .f-boutb{animation:M9b-a2-boutb 10s linear forwards}
@keyframes M9b-a2-boutb{0%,24%{fill:#c0392b}28%,100%{fill:#1b3a63}}`
};

window.INTERACTIONS = window.INTERACTIONS || {};
INTERACTIONS.M9b = {
  arret: 4.8,
  question: "Qu'est-ce qui a manqué avant d'ouvrir le capot ?",
  choix: [
    { t: "Attendre que le ventilateur soit bien arrêté", remed: "Un ventilateur arrêté peut repartir seul : la régulation ne coupe pas l'alimentation." },
    { t: "Écouter si le bruit du moteur a bien disparu", remed: "Un moteur silencieux peut rester sous tension : l'oreille ne prouve pas l'absence de tension." },
    { t: "Séparer, condamner, vérifier l'absence de tension", ok: true }
  ],
  bravo: "Un appareil arrêté ne prouve rien : seule la vérification confirme l'absence de tension."
};
