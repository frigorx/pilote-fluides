/* ============================================================
   inerWeb HoCourant — FILM M3c : le bon appareil, la bonne VAT
   Décor : une source de contrôle au sol à gauche, un dispositif
   de VAT tenu par le bonhomme, un coffret ouvert à droite (deux
   bornes bleues, fil rouge sous tension).
   Acte 1 : le dispositif tombe et rebondit, posé sur les bornes
   sans contrôle, le voyant reste éteint ; il conclut à tort à
   l'absence de tension et touche la borne à main nue : éclair,
   secousse, assis par terre, étoiles.
   Acte 2 : il essaie le dispositif sur la source connue (voyant
   allumé), puis sur les bornes (voyant éteint), puis de nouveau
   sur la source (voyant rallumé) : alors seulement il travaille,
   le bras levé.
   Règles : aucun texte ni id ; classes « f- » ; sélecteurs sous
   .film-M3c ; images-clés préfixées M3c-.
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M3c = {
  titre: "Le bon appareil : la situation, puis la bonne VAT",
  alt: "Acte 1 : une personne laisse tomber son dispositif de vérification, le pose sur les bornes d'un coffret sans le contrôler, croit l'absence de tension et touche la borne à main nue : elle est secouée et se retrouve assise par terre. Acte 2 : la même personne essaie le dispositif sur une petite source de contrôle, où le voyant s'allume, puis sur les bornes du coffret où il reste éteint, puis de nouveau sur la source où il se rallume ; alors seulement elle travaille, le bras levé.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<path d="M112 138 V160" stroke="#1b3a63" stroke-width="2.5"/><rect x="100" y="104" width="24" height="34" rx="3" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<circle cx="107" cy="112" r="2.8" fill="#84b7ec" stroke="#1b3a63" stroke-width="1.5"/><circle cx="117" cy="112" r="2.8" fill="#84b7ec" stroke="#1b3a63" stroke-width="1.5"/>
<rect x="215" y="58" width="80" height="76" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M215 58 l-14 7 v62 l14 7" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>
<rect x="223" y="68" width="64" height="6" fill="#84b7ec"/><rect x="223" y="80" width="64" height="6" fill="#84b7ec"/>
<path class="f-fil" d="M287 94 H229 C218 94,210 99,203 105" stroke="#c0392b" stroke-width="4" fill="none" stroke-linecap="round"/>
<circle class="f-bout" cx="203" cy="105" r="3.5" fill="#c0392b"/>
<g class="f-eclair"><path d="M198 88 l-6 13.2 h6 l-3.6 12 l13.2 -16.8 h-7.2 l4.8 -8.4z" fill="#ff6b35"/></g>
<g transform="translate(52 118)"><g class="f-vat"><rect x="-8" y="0" width="18" height="22" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><rect class="f-voyant" x="-5" y="4" width="12" height="6" fill="#84b7ec"/><path d="M-4 22 L-9 30 M6 22 L11 29" stroke="#1b3a63" stroke-width="2" stroke-linecap="round"/></g></g>
<g transform="translate(40 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/><path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/><rect x="9" y="40" width="4" height="8" rx="2" fill="#fffdf8" stroke="#1b3a63" stroke-width="1.8"/></g>
</g></g>`,
  css: `.film-M3c .f-bon,.film-M3c .f-jg,.film-M3c .f-jd,.film-M3c .f-bras,.film-M3c .f-etoiles-r,.film-M3c .f-vat{transform-box:fill-box}
.film-M3c .f-jg{transform-origin:100% 0}.film-M3c .f-jd{transform-origin:0 0}.film-M3c .f-bras{transform-origin:0 0}
.film-M3c .f-etoiles-r{transform-origin:50% 50%;animation:M3c-tourne 2.2s linear infinite}
.film-M3c .f-eclair,.film-M3c .f-cheveux,.film-M3c .f-etoiles{opacity:0}
@keyframes M3c-tourne{to{transform:rotate(360deg)}}
@keyframes M3c-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M3c-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M3c.acte-1 .f-bon{animation:M3c-a1-bon 12s linear forwards}
@keyframes M3c-a1-bon{0%{transform:translateX(0)}8%,17%{transform:translateX(58px)}26%{transform:translateX(64px)}42%,52%{transform:translateX(150px)}58%,100%{transform:translate(140px,24px)}}
.film-M3c.acte-1 .f-jg{animation:M3c-pas-g .48s ease-in-out 9 alternate,M3c-a1-assis-g 1.2s linear 6.1s forwards}
.film-M3c.acte-1 .f-jd{animation:M3c-pas-d .48s ease-in-out 9 alternate,M3c-a1-assis-d 1.2s linear 6.1s forwards}
@keyframes M3c-a1-assis-g{to{transform:rotate(-118deg)}}
@keyframes M3c-a1-assis-d{to{transform:rotate(-69deg)}}
.film-M3c.acte-1 .f-bras{animation:M3c-a1-bras 12s linear forwards}
@keyframes M3c-a1-bras{0%,42%{transform:rotate(-12deg)}47%{transform:rotate(-40deg)}49%,51%{transform:rotate(-100deg)}58%,100%{transform:rotate(-40deg)}}
.film-M3c.acte-1 .f-vat{animation:M3c-a1-vat 12s linear forwards}
@keyframes M3c-a1-vat{0%{transform:translate(0,0)}8%{transform:translate(58px,0)}12%{transform:translate(60px,34px)}14%{transform:translate(56px,26px)}17%{transform:translate(59px,32px)}26%{transform:translate(64px,0)}42%,100%{transform:translate(150px,4px)}}
.film-M3c.acte-1 .f-eclair{animation:M3c-a1-eclair 12s linear forwards}
@keyframes M3c-a1-eclair{0%,48%{opacity:0}49%{opacity:1}50%{opacity:.3}51%{opacity:1}52%,100%{opacity:0}}
.film-M3c.acte-1 .f-fil{animation:M3c-a1-fil 12s linear forwards}
@keyframes M3c-a1-fil{0%,48%{stroke:#c0392b}49%,51%{stroke:#ff6b35}52%,100%{stroke:#c0392b}}
.film-M3c.acte-1 .f-bout{animation:M3c-a1-bout 12s linear forwards}
@keyframes M3c-a1-bout{0%,48%{fill:#c0392b}49%,51%{fill:#ff6b35}52%,100%{fill:#c0392b}}
.film-M3c.acte-1 .f-cheveux{animation:M3c-a1-cheveux 12s linear forwards}
@keyframes M3c-a1-cheveux{0%,48%{opacity:0}49%,100%{opacity:1}}
.film-M3c.acte-1 .f-etoiles{animation:M3c-a1-etoiles 12s linear forwards}
@keyframes M3c-a1-etoiles{0%,56%{opacity:0}59%,100%{opacity:1}}
.film-M3c.acte-2 .f-fil{stroke:#9aa7b5}
.film-M3c.acte-2 .f-bout{fill:#9aa7b5}
.film-M3c.acte-2 .f-bon{animation:M3c-a2-bon 10s linear forwards}
@keyframes M3c-a2-bon{0%{transform:translateX(0)}12%,28%{transform:translateX(55px)}40%,56%{transform:translateX(150px)}70%,82%{transform:translateX(55px)}92%,100%{transform:translateX(90px)}}
.film-M3c.acte-2 .f-jg{animation:M3c-pas-g .4s ease-in-out 8 alternate}
.film-M3c.acte-2 .f-jd{animation:M3c-pas-d .4s ease-in-out 8 alternate}
.film-M3c.acte-2 .f-bras{animation:M3c-a2-bras 10s linear forwards}
@keyframes M3c-a2-bras{0%,28%{transform:rotate(-12deg)}40%,56%{transform:rotate(-30deg)}70%,82%{transform:rotate(-12deg)}90%,100%{transform:rotate(-150deg)}}
.film-M3c.acte-2 .f-vat{animation:M3c-a2-vat 10s linear forwards}
@keyframes M3c-a2-vat{0%{transform:translate(0,0);opacity:1}12%,28%{transform:translate(55px,0)}40%,56%{transform:translate(150px,4px)}70%,82%{transform:translate(55px,0)}88%{transform:translate(70px,0);opacity:1}90%,100%{opacity:0}}
.film-M3c.acte-2 .f-voyant{animation:M3c-a2-voyant 10s linear forwards}
@keyframes M3c-a2-voyant{0%,12%{fill:#84b7ec}14%,27%{fill:#ff6b35}30%,70%{fill:#84b7ec}73%,81%{fill:#ff6b35}84%,100%{fill:#84b7ec}}`
};

window.INTERACTIONS = window.INTERACTIONS || {};

INTERACTIONS.M3c = {
  arret: 5.9,
  question: "Qu'est-ce qui a manqué avant de croire le voyant éteint ?",
  choix: [
    { t: "Appuyer plus fort sur les deux bornes", remed: "Appuyer plus fort ne répare rien : un appareil resté muet le reste, même sous tension réelle." },
    { t: "Essayer l'appareil sur une source connue", ok: true },
    { t: "Prendre un multimètre ordinaire à la place", remed: "Un multimètre ordinaire ne remplace pas le dispositif prévu pour cette vérification." }
  ],
  bravo: "Le dispositif se prouve sur une source connue, avant et après, jamais sur la seule confiance."
};
