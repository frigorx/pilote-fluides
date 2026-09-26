/* ============================================================
   inerWeb HoCourant — FILM ajouté M12b : alerter précisément
   Un dessin animé en deux actes, SVG + animations CSS (vague 2, § 9).
   Décor : à gauche l'intérieur (coffret déjà sûr, victime allongée,
   témoin qui téléphone), un mur vertical avec une porte au centre, à
   droite la rue où roule l'ambulance.
   Acte 1 · la situation : le témoin appelle, s'agite, raccroche presque
   aussitôt ; l'ambulance entre par le bord droit, roule dans la rue,
   passe devant la porte sans s'arrêter, fait demi-tour, hésite et
   reparte sans jamais l'atteindre ; le témoin se prend la tête.
   Acte 2 · la leçon : il appelle calmement, quatre repères s'allument
   un à un au-dessus de lui (lieu, risque, victime, confirmation) ; un
   collègue se poste dans l'encadrement de la porte et fait signe ;
   l'ambulance entre par le bord droit et s'arrête juste devant la porte.
   Règles : aucun texte, aucun id ; classes « f- » ; sélecteurs sous
   .film-M12b ; keyframes « M12b- » ; aucun attribut transform sur un
   élément animé (placement par le groupe parent).
   ============================================================ */
window.FILMS = window.FILMS || {};
FILMS.M12b = {
  titre: "Alerter précisément : l'appel qui donne le bon repère",
  alt: "Acte 1 : un témoin appelle en s'agitant et raccroche presque aussitôt ; dans la rue, une ambulance passe devant l'entrée sans s'arrêter, revient, hésite, et le témoin se prend la tête. Acte 2 : le témoin appelle calmement, quatre repères s'allument un à un au-dessus de lui, un collègue fait signe à l'entrée, et l'ambulance s'arrête à la bonne porte.",
  durees: [12, 10],
  svg: `<path d="M10 160 H310" stroke="#1b3a63" stroke-width="2" opacity=".35"/>
<rect x="10" y="72" width="40" height="54" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="16" y="80" width="28" height="5" fill="#84b7ec"/><rect x="16" y="92" width="28" height="5" fill="#84b7ec"/>
<g transform="translate(30 108)"><rect x="-3" y="0" width="6" height="16" rx="2" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/><circle cx="0" cy="16" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><circle cx="0" cy="0" r="3" fill="#1b3a63"/></g>
<circle cx="70" cy="149" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M79 150 L100 152" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path d="M100 152 L118 156 M100 152 L117 147" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M75 149 L65 140" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="65" cy="140" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M77 152 L83 160" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<rect x="130" y="16" width="15" height="74" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>
<g class="f-pic1"><path d="M14 20 V34" stroke="#ff6b35" stroke-width="2" stroke-dasharray="4 3" stroke-linecap="round"/><path d="M10 38 L14 29 L18 38 Z" fill="#ff6b35"/></g>
<g class="f-pic2"><path d="M38 18 l-4 8.8 h4 l-2.4 8 l8.8 -11.2 h-4.8 l3.2 -5.6z" fill="#ff6b35"/></g>
<g class="f-pic3"><circle cx="59" cy="26" r="3" fill="#ff6b35"/><path d="M62 26 H74" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/></g>
<g class="f-pic4"><path d="M82 27 l4 4 l8 -9" stroke="#ff6b35" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<g class="f-tel"><rect x="42" y="76" width="14" height="22" rx="3" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/><rect x="44" y="79" width="10" height="13" fill="#fffdf8"/><path d="M58 80 a7 7 0 0 1 0 12" stroke="#1b3a63" stroke-width="2" fill="none" stroke-linecap="round"/></g>
<g transform="translate(137 84)"><g class="f-collegue">
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V45" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path d="M0 45 L-8 68" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path d="M0 45 L8 68" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path d="M0 22 L9 44" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="9" cy="44" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 22 L11 4" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="11" cy="4" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
</g></g>
<g transform="translate(28 88)"><g class="f-bon">
<circle cx="0" cy="10" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<path d="M0 19 V48" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<path class="f-jg" d="M0 48 L-9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path class="f-jd" d="M0 48 L9 72" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M0 24 L-10 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>
<g class="f-bras"><path d="M0 24 L12 47" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="47" r="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/></g>
</g></g>
<g class="f-ambu">
<rect x="0" y="134" width="38" height="18" rx="3" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
<rect x="5" y="138" width="10" height="8" fill="#84b7ec"/>
<circle cx="9" cy="154" r="5" fill="#1b3a63"/><circle cx="29" cy="154" r="5" fill="#1b3a63"/>
</g>`,
  css: `.film-M12b .f-bon,.film-M12b .f-jg,.film-M12b .f-jd,.film-M12b .f-bras,.film-M12b .f-ambu{transform-box:fill-box}
.film-M12b .f-jg{transform-origin:100% 0}.film-M12b .f-jd{transform-origin:0 0}.film-M12b .f-bras{transform-origin:0 0}
.film-M12b .f-tel,.film-M12b .f-pic1,.film-M12b .f-pic2,.film-M12b .f-pic3,.film-M12b .f-pic4,.film-M12b .f-collegue{opacity:0}
.film-M12b .f-ambu{transform:translateX(330px)}
.film-M12b.acte-1 .f-tel{animation:M12b-a1-tel 12s linear forwards}
@keyframes M12b-a1-tel{0%,12%{opacity:0}15%,30%{opacity:1}32%,100%{opacity:0}}
.film-M12b.acte-1 .f-bras{animation:M12b-a1-bras 12s linear forwards}
@keyframes M12b-a1-bras{0%,10%{transform:rotate(0)}14%{transform:rotate(-70deg)}20%{transform:rotate(-58deg)}24%{transform:rotate(-75deg)}28%{transform:rotate(-58deg)}32%{transform:rotate(0)}68%{transform:rotate(0)}80%,100%{transform:rotate(-165deg)}}
.film-M12b.acte-1 .f-ambu{animation:M12b-a1-ambu 12s linear forwards}
@keyframes M12b-a1-ambu{0%,22%{transform:translateX(330px)}36%{transform:translateX(175px)}42%{transform:translateX(172px)}52%{transform:translateX(235px)}62%{transform:translateX(250px)}70%{transform:translateX(228px)}78%{transform:translateX(245px)}88%,100%{transform:translateX(330px)}}
.film-M12b.acte-2 .f-tel{animation:M12b-a2-tel 10s linear forwards}
@keyframes M12b-a2-tel{0%,8%{opacity:0}12%,100%{opacity:1}}
.film-M12b.acte-2 .f-bras{animation:M12b-a2-bras 10s linear forwards}
@keyframes M12b-a2-bras{0%,8%{transform:rotate(0)}14%,100%{transform:rotate(-70deg)}}
.film-M12b.acte-2 .f-pic1{animation:M12b-a2-pic1 10s linear forwards}
@keyframes M12b-a2-pic1{0%,18%{opacity:0}22%,100%{opacity:1}}
.film-M12b.acte-2 .f-pic2{animation:M12b-a2-pic2 10s linear forwards}
@keyframes M12b-a2-pic2{0%,33%{opacity:0}37%,100%{opacity:1}}
.film-M12b.acte-2 .f-pic3{animation:M12b-a2-pic3 10s linear forwards}
@keyframes M12b-a2-pic3{0%,48%{opacity:0}52%,100%{opacity:1}}
.film-M12b.acte-2 .f-pic4{animation:M12b-a2-pic4 10s linear forwards}
@keyframes M12b-a2-pic4{0%,63%{opacity:0}67%,100%{opacity:1}}
.film-M12b.acte-2 .f-collegue{animation:M12b-a2-collegue 10s linear forwards}
@keyframes M12b-a2-collegue{0%,15%{opacity:0}22%,100%{opacity:1}}
.film-M12b.acte-2 .f-ambu{animation:M12b-a2-ambu 10s linear forwards}
@keyframes M12b-a2-ambu{0%,15%{transform:translateX(330px)}45%{transform:translateX(220px)}60%,100%{transform:translateX(150px)}}`
};

window.INTERACTIONS = window.INTERACTIONS || {};
INTERACTIONS.M12b = {
  arret: 6.0,
  question: "Qu'est-ce qui a manqué dans cet appel ?",
  choix: [
    { t: "Crier plus fort pour être bien entendu", remed: "Parler fort ne donne pas à l'opérateur les informations qui déclenchent les secours." },
    { t: "Le lieu précis, le risque et les victimes", ok: true },
    { t: "Rappeler un peu plus tard pour préciser", remed: "Un rappel plus tard retarde l'envoi des secours au bon endroit." }
  ],
  bravo: "Le lieu, le risque et l'état des victimes guident les secours dès le premier appel."
};
