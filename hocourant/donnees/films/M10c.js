/* ============================================================
   inerWeb HoCourant — FILM M10c : le capot qu'on n'ouvre pas
   Un dessin animé en deux actes, SVG + animations CSS (vague 2, écran
   M10.1 « Le BE Manœuvre »). Acte 1 · la situation : une machine ne
   redémarre pas ; le bonhomme dévisse le capot de l'armoire de
   commande pour chercher la panne et plonge la main dedans : éclair,
   cheveux dressés, étoiles. Acte 2 · la leçon : il reste devant
   l'organe de commande prévu, lit la feuille d'instruction accrochée,
   tourne la poignée une seule fois comme elle le demande ; la machine
   ne repart pas ; il laisse le capot fermé et appelle pour rendre
   compte (pas de réarmement répété : ce geste est déjà montré par le
   film M10 du module).
   Règles : aucun texte dans le dessin ; classes préfixées « f- » ;
   sélecteurs sous .film-M10c ; l'acte se joue en posant la classe
   acte-1 ou acte-2 sur la <figure class="scene film film-M10c"> ;
   aucun attribut transform sur un élément animé en CSS : le placement
   est porté par le groupe parent.
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M10c = {
  titre: "Le BE Manœuvre : la poignée, jamais le capot",
  alt: "Acte 1 : une personne dévisse le capot d'une armoire de commande et plonge la main à l'intérieur : un éclair la secoue, ses cheveux se dressent. Acte 2 : la même personne lit la feuille d'instruction, tourne la poignée prévue sans ouvrir le capot puis, la machine ne redémarrant pas, appelle pour rendre compte.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="195" y="55" width="65" height="70" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="201" y="61" width="53" height="6" fill="#84b7ec"/>
<path class="f-fil-int" d="M248 92 H206" stroke="#c0392b" stroke-width="3.5" stroke-linecap="round"/>
<g class="f-feuille"><rect x="266" y="58" width="22" height="30" rx="1" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><path d="M270 65 H284 M270 71 H284 M270 77 H280" stroke="#84b7ec" stroke-width="1.8" stroke-linecap="round"/></g>
<g transform="translate(227 55)"><g class="f-capot"><rect x="-32" y="0" width="64" height="58" rx="3" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/></g></g>
<g transform="translate(227 132)"><g class="f-poignee"><rect x="-4" y="-14" width="8" height="14" rx="2" fill="#1b3a63"/><circle cx="0" cy="-16" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/></g></g>
<circle cx="227" cy="132" r="2.2" fill="#1b3a63"/>
<g class="f-eclair"><path d="M215 65 l-8 17 h8 l-5 15 l17 -21 h-9 l6 -11z" fill="#ff6b35"/></g>
<g class="f-bulle"><path d="M138 45 h40 a6 6 0 0 1 6 6 v20 a6 6 0 0 1 -6 6 h-16 l-8 8 v-8 h-16 a6 6 0 0 1 -6 -6 v-20 a6 6 0 0 1 6 -6z" fill="#ff6b35"/><rect x="156" y="51" width="4" height="12" rx="2" fill="#fff"/><circle cx="158" cy="68" r="2.4" fill="#fff"/></g>
<g transform="translate(20 88)"><g class="f-bon">
<g class="f-etoiles"><g class="f-etoiles-r"><circle cx="16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="-6" r="2.6" fill="#ff6b35"/><circle cx="-16" cy="10" r="2.6" fill="#ff6b35"/><circle cx="0" cy="26" r="2.6" fill="#ff6b35"/></g></g>
<g class="f-cheveux"><path d="M-6 1 l-3 -8 M0 0 v-9 M6 1 l3 -8" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-bras"><path d="M0 24 L12 49" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="49" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/><g class="f-tel"><g transform="rotate(-26 12 49)"><rect x="7.5" y="39" width="9" height="20" rx="2" fill="#1b3a63"/><rect x="9.5" y="42" width="5" height="12" rx="1" fill="#e8f1fb"/></g></g></g>
</g></g>`,
  css: `.film-M10c .f-bon,.film-M10c .f-jg,.film-M10c .f-jd,.film-M10c .f-bras,.film-M10c .f-etoiles-r,.film-M10c .f-capot,.film-M10c .f-poignee{transform-box:fill-box}
.film-M10c .f-jg{transform-origin:100% 0}.film-M10c .f-jd{transform-origin:0 0}.film-M10c .f-bras{transform-origin:0 0}
.film-M10c .f-capot{transform-origin:50% 0%}.film-M10c .f-poignee{transform-origin:50% 0%}
.film-M10c .f-etoiles-r{transform-origin:50% 50%;animation:M10c-tourne 2.2s linear infinite}
.film-M10c .f-eclair,.film-M10c .f-cheveux,.film-M10c .f-etoiles,.film-M10c .f-fil-int,.film-M10c .f-tel,.film-M10c .f-bulle{opacity:0}
@keyframes M10c-tourne{to{transform:rotate(360deg)}}
@keyframes M10c-pas-g{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}
@keyframes M10c-pas-d{from{transform:rotate(22deg)}to{transform:rotate(-22deg)}}
.film-M10c.acte-1 .f-bon{animation:M10c-a1-bon 12s linear forwards}
@keyframes M10c-a1-bon{0%{transform:translateX(0)}25%,40%{transform:translateX(150px)}42%{transform:translateX(146px)}44%{transform:translateX(154px)}46%{transform:translateX(146px)}48%{transform:translateX(154px)}50%{transform:translateX(150px)}58%,100%{transform:translateX(138px)}}
.film-M10c.acte-1 .f-jg{animation:M10c-pas-g .5s ease-in-out 6 alternate}
.film-M10c.acte-1 .f-jd{animation:M10c-pas-d .5s ease-in-out 6 alternate}
.film-M10c.acte-1 .f-bras{animation:M10c-a1-bras 12s linear forwards}
@keyframes M10c-a1-bras{0%,25%{transform:rotate(0)}32%,36%{transform:rotate(-70deg)}39%,50%{transform:rotate(-40deg)}58%,100%{transform:rotate(10deg)}}
.film-M10c.acte-1 .f-capot{animation:M10c-a1-capot 12s linear forwards}
@keyframes M10c-a1-capot{0%,31%{transform:rotate(0)}37%,100%{transform:rotate(-100deg)}}
.film-M10c.acte-1 .f-fil-int{animation:M10c-a1-filint 12s linear forwards}
@keyframes M10c-a1-filint{0%,36%{opacity:0}37%,100%{opacity:1}}
.film-M10c.acte-1 .f-eclair{animation:M10c-a1-eclair 12s linear forwards}
@keyframes M10c-a1-eclair{0%,39%{opacity:0}40%{opacity:1}42%{opacity:.3}44%{opacity:1}46%{opacity:.3}48%{opacity:1}52%,100%{opacity:0}}
.film-M10c.acte-1 .f-cheveux{animation:M10c-a1-cheveux 12s linear forwards}
@keyframes M10c-a1-cheveux{0%,39%{opacity:0}40%,100%{opacity:1}}
.film-M10c.acte-1 .f-etoiles{animation:M10c-a1-etoiles 12s linear forwards}
@keyframes M10c-a1-etoiles{0%,57%{opacity:0}60%,100%{opacity:1}}
.film-M10c.acte-2 .f-bon{animation:M10c-a2-bon 10s linear forwards}
@keyframes M10c-a2-bon{0%{transform:translateX(0)}25%,55%{transform:translateX(150px)}65%,100%{transform:translateX(138px)}}
.film-M10c.acte-2 .f-jg{animation:M10c-pas-g .5s ease-in-out 5 alternate}
.film-M10c.acte-2 .f-jd{animation:M10c-pas-d .5s ease-in-out 5 alternate}
.film-M10c.acte-2 .f-bras{animation:M10c-a2-bras 10s linear forwards}
@keyframes M10c-a2-bras{0%,35%{transform:rotate(0)}40%,46%{transform:rotate(-70deg)}50%,64%{transform:rotate(0)}72%,100%{transform:rotate(-128deg)}}
.film-M10c.acte-2 .f-poignee{animation:M10c-a2-poignee 10s linear forwards}
@keyframes M10c-a2-poignee{0%,39%{transform:rotate(0)}44%,100%{transform:rotate(90deg)}}
.film-M10c.acte-2 .f-tel{animation:M10c-a2-tel 10s linear forwards}
@keyframes M10c-a2-tel{0%,65%{opacity:0}70%,100%{opacity:1}}
.film-M10c.acte-2 .f-bulle{animation:M10c-a2-bulle 10s linear forwards}
@keyframes M10c-a2-bulle{0%,78%{opacity:0}82%,100%{opacity:1}}`
};

window.INTERACTIONS = window.INTERACTIONS || {};
INTERACTIONS.M10c = {
  arret: 4.8,
  question: "Que devait-il faire quand la machine n'a pas redémarré ?",
  choix: [
    { t: "Ouvrir le capot pour aller chercher la panne", remed: "Chercher la panne derrière ce capot dépasse le rôle du BE Manœuvre." },
    { t: "Changer la pièce qui semble abîmée à l'œil", remed: "Remplacer un composant n'est pas une manœuvre : cela demande un autre titre." },
    { t: "S'arrêter net et rendre compte à son responsable", ok: true }
  ],
  bravo: "La poignée, jamais le capot ; et on rend compte dès que la manœuvre ne suffit pas."
};
