/* ============================================================
   inerWeb HoCourant — FILM du module M13b : protéger avant de mesurer
   Un dessin animé en deux actes, SVG + animations CSS.
   Décor : reprend l'armoire à trois départs de films/M13.js, ouverte ;
   au bas du premier départ, deux bornes voisines (rouge = sous
   tension) appartenant à deux départs différents.
   Acte 1 · la situation : le chargé d'intervention mesure mains nues,
   sans écran facial ; la pointe glisse de sa borne vers la borne
   voisine : court-circuit, flash, visage noirci, cheveux dressés, il
   se retrouve assis par terre, des étoiles tournant autour de sa tête.
   Acte 2 · la leçon : même armoire. Il met l'écran facial et des
   gants isolants, pose une nappe isolante sur la borne voisine, mesure
   sans risque ; puis, avant de remplacer la pièce, il abaisse le
   levier de son propre départ et pose son cadenas.
   Règles : aucun texte dans le dessin ; classes préfixées « f- » ;
   sélecteurs sous .film-M13b ; l'acte se joue en posant la classe
   acte-1 ou acte-2 sur la <figure class="scene film film-M13b"> ;
   aucun attribut transform sur un élément animé en CSS : le placement
   est porté par le groupe parent.
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M13b = {
  titre: "Le rôle BR : protéger avant de mesurer",
  alt: "Acte 1 : une personne mesure sur une armoire basse tension, mains nues et sans écran facial ; une pointe glisse sur la borne voisine, c'est le court-circuit, elle est projetée en arrière et se retrouve assise, le visage noirci. Acte 2 : la même personne, équipée d'un écran facial et de gants isolants, pose une nappe isolante sur la borne voisine, mesure sans risque, puis, avant de remplacer la pièce, abaisse le levier de son propre départ et pose son cadenas.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="176" y="38" width="124" height="122" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M300 38 l14 8 v106 l-14 8" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect x="184" y="48" width="34" height="104" rx="2" fill="#fff" stroke="#1b3a63" stroke-width="1.5"/>
<rect x="222" y="48" width="34" height="104" rx="2" fill="#fff" stroke="#1b3a63" stroke-width="1.5"/>
<rect x="260" y="48" width="34" height="104" rx="2" fill="#fff" stroke="#1b3a63" stroke-width="1.5"/>
<rect x="187" y="52" width="28" height="24" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect x="225" y="52" width="28" height="24" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect x="263" y="52" width="28" height="24" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect class="f-lev1" x="198" y="54" width="6" height="10" rx="1.5" fill="#1b3a63"/>
<rect x="236" y="54" width="6" height="10" rx="1.5" fill="#1b3a63"/>
<rect x="274" y="54" width="6" height="10" rx="1.5" fill="#1b3a63"/>
<circle class="f-voy1" cx="210" cy="58" r="3" fill="#ff6b35" stroke="#1b3a63" stroke-width="1.5"/>
<circle cx="248" cy="58" r="3" fill="#ff6b35" stroke="#1b3a63" stroke-width="1.5"/>
<circle cx="286" cy="58" r="3" fill="#ff6b35" stroke="#1b3a63" stroke-width="1.5"/>
<path class="f-fil1" d="M201 76 V128" stroke="#c0392b" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<path d="M239 76 C224 96 216 112 213 128" stroke="#c0392b" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<g class="f-cadenas"><path d="M197 91 v-5 a4 4 0 0 1 8 0 v5" fill="none" stroke="#1b3a63" stroke-width="2"/><rect x="193" y="91" width="16" height="12" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/></g>
<rect x="193" y="122" width="28" height="16" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="1.5"/>
<circle cx="201" cy="132" r="3" fill="#c0392b"/>
<circle cx="213" cy="132" r="3" fill="#c0392b"/>
<g class="f-halo"><circle cx="201" cy="132" r="10" fill="none" stroke="#ff6b35" stroke-width="2.5"/></g>
<rect class="f-nappe" x="205" y="121" width="21" height="19" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<g class="f-eclair"><path d="M217 118 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>
<g transform="translate(30 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path class="f-visiere" d="M-8 4 h16 v7 a8 8 0 0 1 -16 0 z" fill="#84b7ec" fill-opacity=".55" stroke="#1b3a63" stroke-width="2"/>
<g class="f-suie"><path d="M-5 8 l2.4 2.6 M-3.4 12 l2 2.2 M2 9 l2.4 2.4 M0.5 13 l2 2" stroke="#1b3a63" stroke-width="1.6" stroke-linecap="round"/></g>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/><circle class="f-gant" cx="12" cy="49" r="5" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/><g class="f-app"><rect x="9" y="45" width="13" height="9" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/></g></g>
</g></g>`,
  css: `.film-M13b .f-bon,.film-M13b .f-jg,.film-M13b .f-jd,.film-M13b .f-bras,.film-M13b .f-etoiles-r,.film-M13b .f-lev1{transform-box:fill-box}
.film-M13b .f-jg{transform-origin:100% 0}.film-M13b .f-jd{transform-origin:0 0}.film-M13b .f-bras{transform-origin:0 0}.film-M13b .f-lev1{transform-origin:50% 100%}
.film-M13b .f-etoiles-r{transform-origin:50% 50%;animation:M13b-tourne 2.2s linear infinite}
.film-M13b .f-eclair,.film-M13b .f-cheveux,.film-M13b .f-etoiles,.film-M13b .f-suie,.film-M13b .f-visiere,.film-M13b .f-gant,.film-M13b .f-nappe,.film-M13b .f-halo,.film-M13b .f-app,.film-M13b .f-cadenas{opacity:0}
@keyframes M13b-tourne{to{transform:rotate(360deg)}}
.film-M13b.acte-1 .f-bon{animation:M13b-a1-bon 12s linear forwards}
@keyframes M13b-a1-bon{0%{transform:translate(0,0)}20%,36%{transform:translate(150px,0)}39%,48%{transform:translate(163px,0)}64%,100%{transform:translate(120px,20px)}}
.film-M13b.acte-1 .f-jg{animation:M13b-a1-jg 12s linear forwards}
@keyframes M13b-a1-jg{0%{transform:rotate(-22deg)}5%{transform:rotate(22deg)}10%{transform:rotate(-22deg)}15%{transform:rotate(22deg)}20%,48%{transform:rotate(0)}64%,100%{transform:rotate(-115deg)}}
.film-M13b.acte-1 .f-jd{animation:M13b-a1-jd 12s linear forwards}
@keyframes M13b-a1-jd{0%{transform:rotate(22deg)}5%{transform:rotate(-22deg)}10%{transform:rotate(22deg)}15%{transform:rotate(-22deg)}20%,48%{transform:rotate(0)}64%,100%{transform:rotate(-62deg)}}
.film-M13b.acte-1 .f-bras{animation:M13b-a1-bras 12s linear forwards}
@keyframes M13b-a1-bras{0%,20%{transform:rotate(0)}26%,48%{transform:rotate(-20deg)}64%,100%{transform:rotate(-10deg)}}
.film-M13b.acte-1 .f-app{animation:M13b-a1-app 12s linear forwards}
@keyframes M13b-a1-app{0%,24%{opacity:0}27%,100%{opacity:1}}
.film-M13b.acte-1 .f-halo{animation:M13b-a1-halo 12s linear forwards}
@keyframes M13b-a1-halo{0%,20%{opacity:0}24%,34%{opacity:1}38%,100%{opacity:0}}
.film-M13b.acte-1 .f-eclair{animation:M13b-a1-eclair 12s linear forwards}
@keyframes M13b-a1-eclair{0%,39%{opacity:0}40%{opacity:1}42%{opacity:.3}44%{opacity:1}46%{opacity:.3}48%{opacity:1}52%,100%{opacity:0}}
.film-M13b.acte-1 .f-cheveux{animation:M13b-a1-cheveux 12s linear forwards}
@keyframes M13b-a1-cheveux{0%,39%{opacity:0}40%,100%{opacity:1}}
.film-M13b.acte-1 .f-suie{animation:M13b-a1-suie 12s linear forwards}
@keyframes M13b-a1-suie{0%,41%{opacity:0}43%,100%{opacity:1}}
.film-M13b.acte-1 .f-etoiles{animation:M13b-a1-etoiles 12s linear forwards}
@keyframes M13b-a1-etoiles{0%,63%{opacity:0}66%,100%{opacity:1}}
.film-M13b.acte-2 .f-bon{animation:M13b-a2-bon 10s linear forwards}
@keyframes M13b-a2-bon{0%{transform:translateX(0)}14%,100%{transform:translateX(150px)}}
.film-M13b.acte-2 .f-jg{animation:M13b-a2-jg 10s linear forwards}
@keyframes M13b-a2-jg{0%{transform:rotate(-22deg)}4%{transform:rotate(22deg)}8%{transform:rotate(-22deg)}12%{transform:rotate(22deg)}14%,100%{transform:rotate(0)}}
.film-M13b.acte-2 .f-jd{animation:M13b-a2-jd 10s linear forwards}
@keyframes M13b-a2-jd{0%{transform:rotate(22deg)}4%{transform:rotate(-22deg)}8%{transform:rotate(22deg)}12%{transform:rotate(-22deg)}14%,100%{transform:rotate(0)}}
.film-M13b.acte-2 .f-visiere{animation:M13b-a2-visiere 10s linear forwards}
@keyframes M13b-a2-visiere{0%,6%{opacity:0}10%,100%{opacity:1}}
.film-M13b.acte-2 .f-gant{animation:M13b-a2-gant 10s linear forwards}
@keyframes M13b-a2-gant{0%,8%{opacity:0}12%,100%{opacity:1}}
.film-M13b.acte-2 .f-bras{animation:M13b-a2-bras 10s linear forwards}
@keyframes M13b-a2-bras{0%,20%{transform:rotate(0)}26%,50%{transform:rotate(-20deg)}54%,100%{transform:rotate(0)}}
.film-M13b.acte-2 .f-nappe{animation:M13b-a2-nappe 10s linear forwards}
@keyframes M13b-a2-nappe{0%,24%{opacity:0}28%,100%{opacity:1}}
.film-M13b.acte-2 .f-app{animation:M13b-a2-app 10s linear forwards}
@keyframes M13b-a2-app{0%,22%{opacity:0}26%,52%{opacity:1}56%,100%{opacity:0}}
.film-M13b.acte-2 .f-halo{animation:M13b-a2-halo 10s linear forwards}
@keyframes M13b-a2-halo{0%,30%{opacity:0}34%,48%{opacity:1}52%,100%{opacity:0}}
.film-M13b.acte-2 .f-lev1{animation:M13b-a2-lev1 10s linear forwards}
@keyframes M13b-a2-lev1{0%,58%{transform:rotate(0)}64%,100%{transform:rotate(180deg)}}
.film-M13b.acte-2 .f-voy1{animation:M13b-a2-voy1 10s linear forwards}
@keyframes M13b-a2-voy1{0%,58%{fill:#ff6b35}64%,100%{fill:#fff}}
.film-M13b.acte-2 .f-fil1{animation:M13b-a2-fil1 10s linear forwards}
@keyframes M13b-a2-fil1{0%,58%{stroke:#c0392b}64%,100%{stroke:#9aa7b5}}
.film-M13b.acte-2 .f-cadenas{animation:M13b-a2-cadenas 10s linear forwards}
@keyframes M13b-a2-cadenas{0%,66%{opacity:0}70%,100%{opacity:1}}`
};

window.INTERACTIONS = window.INTERACTIONS || {};
INTERACTIONS.M13b = {
  arret: 4.8,
  question: "Qu'est-ce qui a manqué avant la mesure ?",
  choix: [
    { t: "Se protéger et couvrir les bornes voisines", ok: true },
    { t: "Mesurer plus vite pour limiter le risque", remed: "Aller plus vite n'empêche pas une pointe de glisser : ce sont l'écran, les gants et la nappe isolante qui protègent." },
    { t: "Demander à un collègue de tenir l'armoire", remed: "Un collègue qui tient l'armoire reste exposé au même risque, sans rien changer à la protection nécessaire." }
  ],
  bravo: "Écran facial, gants isolants, bornes voisines couvertes : le BR se protège avant de mesurer."
};
