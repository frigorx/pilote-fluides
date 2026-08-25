/* ============================================================
   inerWeb HoCourant — bibliothèque de scènes
   Règle posée par F. Henninot le 25/08/2026 : AUCUNE question sans
   image de mise en situation. Une même scène peut servir plusieurs
   questions — c'est un repère visuel, pas une décoration.

   Charte inerWeb § 3.5 et R4 : SVG faits main, trait bleu marine
   #1b3a63, aplats bleu clair, UN seul accent orange par image, aucun
   texte à l'intérieur du dessin (le titre et la description vivent
   dehors, en <title>/<desc> pour les lecteurs d'écran).
   R2 : le dessin AU REPOS est déjà l'image finale ; ce qui bouge
   porte la classe `.mobile` et n'ajoute jamais d'information neuve.
   ============================================================ */

const SC = {}; // id -> { titre, alt, svg }

function scene(id, titre, alt, corps) {
  SC[id] = { titre, alt, svg: corps };
}

/* fragments réutilisés : silhouettes et objets récurrents */
const T = {
  /* personne debout, x = axe du corps, y = haut de la tête */
  pers: (x, y, s) => {
    s = s || 1;
    const h = (v) => y + v * s, l = (v) => x + v * s;
    return (
      '<circle cx="' + x + '" cy="' + h(10) + '" r="' + 9 * s + '" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
      '<path d="M' + x + ' ' + h(19) + ' V' + h(48) + '" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M' + x + ' ' + h(48) + ' L' + l(-9) + ' ' + h(72) + ' M' + x + ' ' + h(48) + ' L' + l(9) + ' ' + h(72) +
      '" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>'
    );
  },
  /* coffret / armoire électrique ; ouvert = porte battante */
  coffret: (x, y, w, h, ouvert) =>
    '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
    (ouvert
      ? '<path d="M' + x + ' ' + y + ' l-16 8 v' + (h - 16) + ' l16 8" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>' +
        '<rect x="' + (x + 8) + '" y="' + (y + 10) + '" width="' + (w - 16) + '" height="6" fill="#84b7ec"/>' +
        '<rect x="' + (x + 8) + '" y="' + (y + 24) + '" width="' + (w - 16) + '" height="6" fill="#84b7ec"/>'
      : '<circle cx="' + (x + w - 8) + '" cy="' + (y + h / 2) + '" r="2.5" fill="#1b3a63"/>'),
  sol: (y) => '<path d="M10 ' + y + " H310" + '" stroke="#1b3a63" stroke-width="2" opacity=".35"/>',
  /* éclair d'accent — le seul orange de l'image */
  eclair: (x, y, s) =>
    '<path d="M' + x + " " + y + " l" + -5 * s + " " + 11 * s + " h" + 5 * s + " l" + -3 * s + " " + 10 * s +
    " l" + 11 * s + " " + -14 * s + " h" + -6 * s + " l" + 4 * s + " " + -7 * s + 'z" fill="#ff6b35"/>',
};

/* ---------- M1 · le danger ---------- */
scene("contact-direct", "Contact direct",
  "Une main s'approche d'un conducteur dénudé sous tension dans un coffret ouvert.",
  T.sol(160) + T.coffret(180, 40, 100, 80, true) +
  '<path d="M196 74 h70" stroke="#c0392b" stroke-width="4" stroke-linecap="round"/>' +
  T.pers(90, 40) +
  '<path d="M90 88 L170 76" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<circle cx="176" cy="75" r="5" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<g class="mobile">' + T.eclair(186, 58, 1) +
  '<animate attributeName="opacity" values="1;.25;1" dur="1.4s" repeatCount="indefinite"/></g>');

scene("contact-indirect", "Contact indirect",
  "Une main touche la carcasse métallique d'une machine mise sous tension par un défaut d'isolement.",
  T.sol(160) +
  '<rect x="180" y="60" width="96" height="70" rx="6" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<circle cx="228" cy="95" r="16" fill="none" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M228 79 v-19" stroke="#1b3a63" stroke-width="2.5"/>' +
  T.pers(96, 46) +
  '<path d="M96 94 L172 92" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<circle cx="177" cy="92" r="5" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<g class="mobile">' + T.eclair(246, 66, .8) +
  '<animate attributeName="opacity" values=".3;1;.3" dur="1.6s" repeatCount="indefinite"/></g>' +
  '<path d="M96 118 v24" stroke="#84b7ec" stroke-width="3" stroke-dasharray="5 4"/>');

scene("arc", "Arc électrique",
  "Un arc jaillit d'un coffret ; la personne est projetée en arrière, sans avoir touché de conducteur.",
  T.sol(160) + T.coffret(190, 44, 96, 76, true) +
  '<g class="mobile">' + T.eclair(216, 60, 1.6) +
  '<animate attributeName="opacity" values="1;.35;1" dur=".7s" repeatCount="indefinite"/></g>' +
  '<path d="M188 84 l-22 -10 M188 92 l-26 2 M188 100 l-22 12" stroke="#ff6b35" stroke-width="2.5" stroke-linecap="round"/>' +
  T.pers(96, 44) +
  '<path d="M96 92 L70 74 M96 92 L120 70" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>');

scene("cable-abime", "Câble endommagé au sol",
  "Un câble à l'isolant arraché traverse un passage ; une personne s'arrête devant.",
  T.sol(160) +
  '<path d="M120 152 C160 138, 210 168, 296 148" stroke="#1b3a63" stroke-width="6" fill="none" stroke-linecap="round"/>' +
  '<path d="M196 150 l10 -6 m-10 6 l10 7" stroke="#c0392b" stroke-width="3" stroke-linecap="round"/>' +
  '<circle cx="202" cy="151" r="9" fill="none" stroke="#ff6b35" stroke-width="2.5" stroke-dasharray="4 3"/>' +
  T.pers(80, 52) +
  '<path d="M80 100 L58 78" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<path d="M54 74 v-12" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>');

/* ---------- M2 · analyser ---------- */
scene("analyser", "S'arrêter et analyser",
  "Devant un coffret ouvert, une personne lève la main pour marquer l'arrêt avant d'agir.",
  T.sol(160) + T.coffret(196, 46, 92, 78, true) +
  T.pers(92, 46) +
  '<path d="M92 94 L66 66" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<path d="M62 62 m-8 0 a8 9 0 1 1 16 0 z" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<circle cx="150" cy="70" r="15" fill="none" stroke="#ff6b35" stroke-width="3"/>' +
  '<path d="M150 62 v10 M150 78 v3" stroke="#ff6b35" stroke-width="3" stroke-linecap="round"/>');

scene("coactivite", "Une autre activité entre dans la zone",
  "Une deuxième personne apporte un seau d'eau près d'une zone de travail balisée.",
  T.sol(160) +
  '<path d="M120 160 v-46 M262 160 v-46" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M114 116 h154" stroke="#ff6b35" stroke-width="4" stroke-dasharray="12 7"/>' +
  T.pers(180, 52) + T.pers(62, 58) +
  '<path d="M62 106 L86 116" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<path d="M84 118 h22 l-4 20 h-14 z" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/>');

/* ---------- M3 · prévention ---------- */
scene("epi", "Vérifier ses EPI",
  "Une paire de gants isolants et une protection du visage, examinées avant usage.",
  '<path d="M70 128 v-52 a10 10 0 0 1 20 0 v18 m0 -22 a9 9 0 0 1 18 0 v22 m0 -18 a9 9 0 0 1 18 0 v18 m0 -12 a9 9 0 0 1 17 0 v40 a26 26 0 0 1 -26 26 h-22 a25 25 0 0 1 -25 -26z" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M196 60 a44 44 0 0 1 88 0 v14 a44 30 0 0 1 -88 0z" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M196 74 a44 34 0 0 0 88 0" fill="#84b7ec" opacity=".55"/>' +
  '<circle cx="240" cy="120" r="16" fill="none" stroke="#ff6b35" stroke-width="3"/>' +
  '<path d="M232 120 l6 7 l12 -14" stroke="#ff6b35" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>');

scene("protection-collective", "La protection collective d'abord",
  "Un écran isolant et un balisage ferment l'accès au coffret ; les gants viennent en complément.",
  T.sol(160) + T.coffret(214, 40, 76, 84, true) +
  '<rect x="150" y="52" width="16" height="86" rx="4" fill="#84b7ec" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M92 138 h74" stroke="#ff6b35" stroke-width="4" stroke-dasharray="12 7"/>' +
  '<path d="M92 138 v-26" stroke="#1b3a63" stroke-width="2.5"/>' +
  T.pers(60, 60));

scene("vat", "La vérification d'absence de tension",
  "Un appareil de VAT bipolaire est appliqué sur deux conducteurs, avec des gants.",
  '<rect x="188" y="34" width="104" height="102" rx="5" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M206 60 h68 M206 96 h68" stroke="#c0392b" stroke-width="4" stroke-linecap="round"/>' +
  '<rect x="66" y="60" width="52" height="50" rx="6" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<circle cx="92" cy="80" r="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>' +
  '<g class="mobile"><circle cx="92" cy="80" r="4" fill="#ff6b35">' +
  '<animate attributeName="opacity" values="1;.2;1" dur="1.2s" repeatCount="indefinite"/></circle></g>' +
  '<path d="M118 74 C150 66, 168 60, 200 60" stroke="#1b3a63" stroke-width="3" fill="none"/>' +
  '<path d="M118 96 C150 100, 168 96, 200 96" stroke="#1b3a63" stroke-width="3" fill="none"/>' +
  '<circle cx="201" cy="60" r="4.5" fill="#1b3a63"/><circle cx="201" cy="96" r="4.5" fill="#1b3a63"/>');

/* ---------- M4 · domaines ---------- */
scene("bt-quotidien", "La basse tension du quotidien",
  "Une prise de courant domestique et un moteur triphasé : les deux relèvent de la basse tension.",
  '<rect x="42" y="46" width="92" height="92" rx="10" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<circle cx="88" cy="92" r="30" fill="none" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<circle cx="76" cy="86" r="6" fill="#1b3a63"/><circle cx="100" cy="86" r="6" fill="#1b3a63"/>' +
  '<rect x="84" y="104" width="8" height="14" rx="2" fill="#1b3a63"/>' +
  '<rect x="182" y="58" width="88" height="66" rx="8" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<circle cx="226" cy="91" r="20" fill="none" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M226 71 v-13 M270 91 h14" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M212 91 h28 M226 77 v28" stroke="#84b7ec" stroke-width="3"/>' +
  '<path d="M158 92 h14" stroke="#ff6b35" stroke-width="4" stroke-linecap="round"/>');

/* ---------- M5 · le corps ---------- */
scene("trajet-courant", "Le trajet du courant dans le corps",
  "Le courant entre par la main et ressort par les pieds, en traversant le tronc.",
  '<circle cx="160" cy="34" r="16" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M160 50 V112" stroke="#1b3a63" stroke-width="4" stroke-linecap="round"/>' +
  '<path d="M160 62 L112 78 M160 62 L216 56" stroke="#1b3a63" stroke-width="4" stroke-linecap="round"/>' +
  '<path d="M160 112 L136 158 M160 112 L184 158" stroke="#1b3a63" stroke-width="4" stroke-linecap="round"/>' +
  '<path d="M216 56 C196 70, 172 84, 162 108 C156 128, 148 142, 138 156" stroke="#ff6b35" stroke-width="3.5" fill="none" stroke-dasharray="7 6" stroke-linecap="round">' +
  '<animate class="mobile" attributeName="stroke-dashoffset" values="26;0" dur="1.1s" repeatCount="indefinite"/></path>' +
  '<circle cx="160" cy="86" r="9" fill="none" stroke="#c0392b" stroke-width="3"/>' +
  '<path d="M262 40 h44 M262 40 v96 M262 136 h44" stroke="#1b3a63" stroke-width="2.5" fill="none" opacity=".5"/>');

scene("differentiel", "Le disjoncteur différentiel",
  "Un disjoncteur différentiel dans un tableau, manette en position ouverte.",
  '<rect x="104" y="30" width="112" height="120" rx="8" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<rect x="124" y="52" width="72" height="76" rx="5" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<rect x="150" y="62" width="20" height="30" rx="4" fill="#ff6b35" stroke="#1b3a63" stroke-width="2"/>' +
  '<circle cx="160" cy="108" r="9" fill="none" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M160 30 v-14 M160 150 v14" stroke="#1b3a63" stroke-width="3"/>');

/* ---------- M6 · symboles et titre ---------- */
scene("titre", "Le titre d'habilitation",
  "Un employeur remet à une personne un titre d'habilitation signé, sous forme de carte.",
  T.pers(64, 40) + T.pers(256, 40) +
  '<path d="M64 88 L120 100 M256 88 L200 100" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<rect x="120" y="86" width="80" height="50" rx="6" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M132 102 h34 M132 114 h52 M132 124 h40" stroke="#84b7ec" stroke-width="4" stroke-linecap="round"/>' +
  '<path d="M176 96 l8 8 l14 -16" stroke="#ff6b35" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>');

/* ---------- M7 · zones ---------- */
scene("zone-limite", "Une limite de zone",
  "Un balisage sépare une personne d'une pièce nue sous tension ; la distance est matérialisée.",
  T.sol(160) +
  '<path d="M206 160 V44" stroke="#ff6b35" stroke-width="4" stroke-dasharray="11 7"/>' +
  '<rect x="240" y="52" width="60" height="76" rx="5" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M254 74 h32 M254 100 h32" stroke="#c0392b" stroke-width="4" stroke-linecap="round"/>' +
  T.pers(96, 50) +
  '<path d="M120 150 H198" stroke="#1b3a63" stroke-width="2" marker-start="url(#fl)" marker-end="url(#fl)"/>' +
  '<defs><marker id="fl" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">' +
  '<path d="M1 4 L7 1 L7 7z" fill="#1b3a63"/></marker></defs>');

scene("objet-long", "L'objet dépasse la limite",
  "Le corps reste en retrait mais un tube métallique franchit la limite de zone.",
  T.sol(160) +
  '<path d="M212 160 V40" stroke="#ff6b35" stroke-width="4" stroke-dasharray="11 7"/>' +
  '<rect x="248" y="54" width="54" height="74" rx="5" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M260 78 h30" stroke="#c0392b" stroke-width="4" stroke-linecap="round"/>' +
  T.pers(84, 50) +
  '<path d="M84 98 L124 88" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<path d="M124 88 L262 66" stroke="#1b3a63" stroke-width="6" stroke-linecap="round"/>');

scene("acteurs", "Recevoir une instruction",
  "Un responsable transmet une instruction de travail à un exécutant, documents en main.",
  T.sol(160) + T.pers(80, 46) + T.pers(232, 46) +
  '<path d="M80 94 L134 106 M232 94 L182 106" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<rect x="134" y="88" width="48" height="40" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M144 100 h28 M144 110 h20" stroke="#84b7ec" stroke-width="3.5" stroke-linecap="round"/>' +
  '<path d="M156 62 a12 12 0 1 1 12 12 v6" stroke="#ff6b35" stroke-width="3" fill="none" stroke-linecap="round"/>');

/* ---------- M8 · B0 ---------- */
scene("b0-zone-preparee", "Travailler sans toucher à l'électricité",
  "Une personne peint un mur dans une zone préparée ; le coffret reste fermé derrière le balisage.",
  T.sol(160) +
  '<rect x="228" y="44" width="66" height="80" rx="5" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<circle cx="286" cy="84" r="3" fill="#1b3a63"/>' +
  '<path d="M204 160 V52" stroke="#ff6b35" stroke-width="4" stroke-dasharray="11 7"/>' +
  T.pers(96, 46) +
  '<path d="M96 94 L74 60" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<rect x="62" y="42" width="24" height="14" rx="3" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/>' +
  '<path d="M40 30 v112" stroke="#1b3a63" stroke-width="2.5" opacity=".45"/>');

scene("coffret-interdit", "Ce coffret n'est pas pour tout le monde",
  "Une main s'avance vers un coffret fermé ; l'accès est refusé.",
  T.sol(160) + T.coffret(196, 46, 92, 80, false) +
  T.pers(88, 50) +
  '<path d="M88 98 L150 92" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<circle cx="172" cy="88" r="21" fill="none" stroke="#ff6b35" stroke-width="4"/>' +
  '<path d="M158 74 L186 102" stroke="#ff6b35" stroke-width="4" stroke-linecap="round"/>');

/* ---------- M9 · consignation ---------- */
scene("condamnation", "Condamner et identifier",
  "Un cadenas et son étiquette maintiennent l'organe de séparation en position ouverte.",
  '<rect x="96" y="26" width="128" height="128" rx="8" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<rect x="124" y="52" width="40" height="76" rx="5" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<rect x="134" y="96" width="20" height="26" rx="3" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/>' +
  '<path d="M180 84 v-12 a15 15 0 0 1 30 0 v12" fill="none" stroke="#1b3a63" stroke-width="3.5"/>' +
  '<rect x="172" y="84" width="46" height="36" rx="6" fill="#ff6b35" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<circle cx="195" cy="101" r="5" fill="#fffdf8"/>' +
  '<path d="M218 120 l30 16" stroke="#1b3a63" stroke-width="2"/>' +
  '<rect x="246" y="126" width="44" height="30" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M256 138 h24 M256 146 h16" stroke="#84b7ec" stroke-width="3" stroke-linecap="round"/>');

scene("documents", "Les documents de la consignation",
  "Une attestation de consignation est remise avant le début des travaux ; l'avis de fin la clôt.",
  '<rect x="52" y="34" width="86" height="112" rx="6" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M66 60 h58 M66 76 h58 M66 92 h40" stroke="#84b7ec" stroke-width="4" stroke-linecap="round"/>' +
  '<path d="M66 118 l10 10 l20 -22" stroke="#ff6b35" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
  '<rect x="182" y="34" width="86" height="112" rx="6" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M196 60 h58 M196 76 h58 M196 92 h40 M196 118 h34" stroke="#84b7ec" stroke-width="4" stroke-linecap="round"/>' +
  '<path d="M146 90 h28" stroke="#1b3a63" stroke-width="2.5" marker-end="url(#fl2)"/>' +
  '<defs><marker id="fl2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">' +
  '<path d="M1 1 L7 4 L1 7z" fill="#1b3a63"/></marker></defs>');

/* ---------- M10 · BS et BE ---------- */
scene("bs-remplacement", "Un remplacement à l'identique",
  "Une lampe est remplacée sur un circuit terminal mis hors tension.",
  '<path d="M160 22 v26" stroke="#1b3a63" stroke-width="3"/>' +
  '<rect x="146" y="48" width="28" height="20" rx="3" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<circle cx="160" cy="96" r="30" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M148 112 h24" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M152 96 l8 -12 l8 12" stroke="#ff6b35" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
  '<path d="M232 84 l30 -12 v34z" fill="#84b7ec" stroke="#1b3a63" stroke-width="2.5" stroke-linejoin="round"/>' +
  '<path d="M204 90 h28" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  T.pers(70, 56));

scene("manoeuvre", "Une manœuvre, pas un dépannage",
  "Une main actionne le bouton de commande prévu ; le capot reste fermé.",
  T.sol(160) + T.coffret(178, 40, 108, 90, false) +
  '<circle cx="232" cy="84" r="18" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<circle cx="232" cy="84" r="8" fill="#ff6b35" stroke="#1b3a63" stroke-width="2"/>' +
  T.pers(84, 48) +
  '<path d="M84 96 L200 88" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<circle cx="206" cy="87" r="5" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>');

/* ---------- M11 · B1V ---------- */
scene("b1v-equipe", "Exécuter sous direction",
  "Un chargé de travaux dirige ; l'exécutant intervient dans la zone préparée, équipé.",
  T.sol(160) + T.coffret(226, 44, 66, 84, true) +
  T.pers(62, 44) + T.pers(160, 48) +
  '<path d="M62 92 L104 84" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<path d="M160 96 L212 88" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<rect x="150" y="52" width="20" height="7" rx="3" fill="#ff6b35" stroke="#1b3a63" stroke-width="1.5"/>' +
  '<path d="M118 132 h84" stroke="#84b7ec" stroke-width="4" stroke-dasharray="10 6"/>');

/* ---------- M12 · secours ---------- */
scene("secours", "Protéger avant de secourir",
  "Une victime est au sol ; le sauveteur ne la touche pas et fait couper l'alimentation.",
  T.sol(160) +
  '<circle cx="118" cy="146" r="11" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M130 150 H196" stroke="#1b3a63" stroke-width="4" stroke-linecap="round"/>' +
  '<path d="M196 150 l18 -12 M196 150 l18 12" stroke="#1b3a63" stroke-width="3.5" stroke-linecap="round"/>' +
  T.pers(74, 42) +
  '<path d="M74 90 L44 66" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<rect x="234" y="36" width="58" height="80" rx="6" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<rect x="252" y="52" width="22" height="30" rx="4" fill="#ff6b35" stroke="#1b3a63" stroke-width="2"/>' +
  '<path d="M100 106 C150 92, 200 84, 232 78" stroke="#84b7ec" stroke-width="3" fill="none" stroke-dasharray="6 5"/>');

scene("alerte", "Alerter précisément",
  "Un appel aux secours est passé depuis le lieu de l'accident, avec les informations utiles.",
  '<rect x="118" y="26" width="84" height="128" rx="12" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<rect x="130" y="46" width="60" height="80" rx="4" fill="#e8f1fb"/>' +
  '<path d="M144 68 h32 M144 86 h32 M144 104 h20" stroke="#84b7ec" stroke-width="4" stroke-linecap="round"/>' +
  '<circle cx="160" cy="140" r="6" fill="#1b3a63"/>' +
  '<path d="M216 56 a34 34 0 0 1 0 68 M232 40 a52 52 0 0 1 0 100" stroke="#ff6b35" stroke-width="3.5" fill="none" stroke-linecap="round">' +
  '<animate class="mobile" attributeName="opacity" values=".35;1;.35" dur="1.8s" repeatCount="indefinite"/></path>' +
  '<path d="M104 56 a34 34 0 0 0 0 68" stroke="#84b7ec" stroke-width="3" fill="none" stroke-linecap="round"/>');

/* ---------- M13 · BR ---------- */
scene("br-depannage", "L'intervention de dépannage",
  "Un chargé d'intervention mesure sur un coffret ouvert, appareil en main, équipé.",
  T.sol(160) + T.coffret(198, 34, 96, 96, true) +
  '<path d="M214 60 h64 M214 88 h64" stroke="#84b7ec" stroke-width="4" stroke-linecap="round"/>' +
  T.pers(78, 40) +
  '<rect x="68" y="44" width="20" height="7" rx="3" fill="#ff6b35" stroke="#1b3a63" stroke-width="1.5"/>' +
  '<path d="M78 88 L120 96" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<rect x="120" y="82" width="42" height="52" rx="5" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<rect x="128" y="92" width="26" height="16" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="1.5"/>' +
  '<path d="M162 96 C182 88, 190 74, 206 62" stroke="#1b3a63" stroke-width="2.5" fill="none"/>' +
  '<path d="M162 112 C184 110, 192 98, 206 90" stroke="#1b3a63" stroke-width="2.5" fill="none"/>');

scene("hors-perimetre", "Au-delà de son périmètre",
  "Une armoire entière à remodifier : l'ampleur dépasse l'intervention de faible étendue.",
  T.sol(160) +
  '<rect x="96" y="20" width="128" height="132" rx="8" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M110 44 h100 M110 68 h100 M110 92 h100 M110 116 h100" stroke="#84b7ec" stroke-width="5" stroke-linecap="round"/>' +
  '<path d="M240 44 v96" stroke="#ff6b35" stroke-width="4" stroke-dasharray="10 6"/>' +
  T.pers(268, 60));

/* ---------- affectation ---------- */
/* Chaque module a sa scène par défaut : aucune question ne reste sans
   image. `q.sc` affine question par question quand une autre scène
   colle mieux. */
const SCENE_MODULE = {
  M1: "contact-direct", M2: "analyser", M3: "epi", M4: "bt-quotidien", M5: "trajet-courant",
  M6: "titre", M7: "zone-limite", M8: "b0-zone-preparee", M9: "condamnation", M10: "bs-remplacement",
  M11: "b1v-equipe", M12: "secours", M13: "br-depannage",
};

function sceneDe(q) {
  return SC[q.sc] || SC[SCENE_MODULE[q.m]] || null;
}
function sceneHtml(q, classe) {
  const s = sceneDe(q);
  if (!s) return "";
  const id = "sc" + Math.random().toString(36).slice(2, 8);
  return '<figure class="' + (classe || "scene") + '">' +
    '<svg viewBox="0 0 320 180" role="img" aria-labelledby="' + id + 't ' + id + 'd">' +
    '<title id="' + id + 't">' + s.titre + "</title><desc id=\"" + id + 'd">' + s.alt + "</desc>" +
    s.svg + "</svg><figcaption>" + s.titre + "</figcaption></figure>";
}

/* ============================================================
   PHOTOGRAPHIES DE MISE EN SITUATION
   Reprises du livret HoCourant v2.1 (`assets/scenes-diversite-v2`),
   créations originales inerWeb — voir SOURCES-IMAGES.md.
   Elles portent la SITUATION ; le schéma SVG porte l'EXPLICATION et
   revient en remédiation. Une même photo sert plusieurs questions.

   ⚠️ Les deux scènes de VAT du livret (`safe_vat`, `vat_source`) sont
   VOLONTAIREMENT ÉCARTÉES : l'audit du 24/08/2026 demande de les
   refaire (protections du visage, des mains et du corps pouvant être
   mal interprétées — correction v2.2 n° 7). Sur ces questions, seul
   le schéma s'affiche, qui n'induit aucun équipement.
   ============================================================ */
const PH = {
  danger_fault:    "Une personne en atelier face à une machine dont une masse est mise sous tension par un défaut.",
  danger_arc:      "Un arc électrique jaillit d'une armoire ; la personne se tient à distance, derrière un balisage, casque et visière portés.",
  danger_cable:    "Un câble d'alimentation détérioré, isolant entamé, découvert au sol dans un local technique.",
  danger_water:    "De l'eau au sol à proximité immédiate d'une zone de travail électrique.",
  learn_stop:      "Une personne interrompt son geste devant une installation et prend le temps d'observer avant d'agir.",
  learn_check:     "Un point de contrôle avec le formateur avant de poursuivre l'opération.",
  learn_group:     "Un groupe en formation échange autour d'une situation de travail.",
  learn_workbook:  "Un apprenant renseigne son livret de suivi après une mise en situation.",
  ppe_gloves:      "Des gants isolants examinés avant usage.",
  epc_screen:      "Un écran de protection installé devant une partie d'installation, protection collective en place.",
  tool_damage:     "Un équipement de protection détérioré, mis à l'écart pour être signalé.",
  role_cards:      "Des titres d'habilitation, chacun portant un symbole et un périmètre différents.",
  role_authorize:  "Un responsable autorise l'accès ; sans cette autorisation, l'accès reste fermé.",
  role_brief:      "Un chargé de travaux transmet l'instruction de travail à un exécutant avant l'opération.",
  role_stop:       "Une limite de zone matérialisée par un balisage, qu'une personne ne franchit pas.",
  competence_check:"Vérification des aptitudes et des compétences avant délivrance d'un titre.",
  b0_paint:        "Une opération non électrique — peinture — menée dans une zone préparée et balisée.",
  bs_replace:      "Remplacement à l'identique d'un appareillage sur un circuit terminal mis hors tension.",
  be_operate:      "Action sur un organe de commande, capot fermé : une manœuvre, pas un dépannage.",
  be_report:       "Compte rendu écrit après l'opération, documents de suivi renseignés.",
  b1v_execute:     "Un exécutant réalise des travaux d'ordre électrique sous la direction d'un chargé de travaux.",
  br_measure:      "Un chargé d'intervention effectue une mesure lors d'un dépannage en basse tension.",
  br_report:       "Fin d'intervention : état de l'installation et compte rendu au chargé d'exploitation.",
  safe_lock:       "Un cadenas de condamnation et son étiquette d'identification posés sur l'organe de séparation.",
  safe_separate:   "Séparation de l'installation de ses sources d'alimentation.",
  safe_identify:   "Identification de l'installation sur le lieu de travail, avant vérification.",
  rescue_cut:      "Coupure de l'alimentation par un moyen sûr avant toute approche de la victime.",
  rescue_call:     "Appel des secours depuis le lieu de l'accident.",
  rescue_aid:      "Gestes de premiers secours pratiqués une fois la zone rendue sûre.",
  near_miss:       "Un presque-accident signalé et analysé en équipe.",
};

/* scène (situation dessinée) → photographie correspondante */
const PHOTO_SCENE = {
  "contact-direct": "danger_fault", "contact-indirect": "danger_fault", "arc": "danger_arc",
  "cable-abime": "danger_cable", "analyser": "learn_stop", "coactivite": "danger_water",
  "epi": "ppe_gloves", "protection-collective": "epc_screen", "titre": "role_cards",
  "zone-limite": "role_stop", "objet-long": "role_stop", "acteurs": "role_brief",
  "b0-zone-preparee": "b0_paint", "coffret-interdit": "role_authorize",
  "condamnation": "safe_lock", "documents": "be_report", "bs-remplacement": "bs_replace",
  "manoeuvre": "be_operate", "b1v-equipe": "b1v_execute", "secours": "rescue_cut",
  "alerte": "rescue_call", "br-depannage": "br_measure", "hors-perimetre": "br_report",
  /* pas de photo : VAT écartée (audit), et contenus ajoutés en v2.2 */
  "vat": null, "bt-quotidien": null, "trajet-courant": null, "differentiel": null,
};

function photoDe(q) {
  if (q.ph) return q.ph;
  const idScene = q.sc || SCENE_MODULE[q.m];
  const p = PHOTO_SCENE[idScene];
  return p && PH[p] ? p : null;
}
/* La mise en situation d'une question : la photo si elle existe,
   le dessin sinon — aucune question ne reste sans image. */
function situationHtml(q) {
  const p = photoDe(q);
  if (!p) return sceneHtml(q);
  return '<figure class="scene photo">' +
    '<img src="illustrations/' + p + '.jpg" alt="' + PH[p] + '" loading="lazy" decoding="async">' +
    "</figure>";
}
