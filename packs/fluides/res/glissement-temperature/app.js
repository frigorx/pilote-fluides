(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  let current = 0;
  let furthest = 0;
  let narratedMode = false;
  let speaking = false;
  let paused = false;
  let speechRun = 0;
  let selectedVoice = null;
  let navigationTimer = 0;
  let autoTimer = 0;
  let measurementAnswers = {};
  let orderPosition = 0;
  const completedActivities = new Set();

  const lessons = [
    {
      floor: 1,
      short: "Je chauffe",
      kicker: "Étage 1 · Scène 1 · Ce que le thermomètre sent",
      title: "Avant de bouillir, la température monte.",
      text: "Le fluide reçoit de la chaleur. Tant qu'il reste entièrement liquide, sa température augmente.",
      voiceSteps: [
        { state: 0, text: "Commençons par une situation connue. Nous apportons de la chaleur à un liquide." },
        { state: 1, text: "Le liquide ne change pas encore d'état. Le thermomètre monte : cette chaleur qui fait varier la température s'appelle la chaleur sensible." },
        { state: 2, text: "Retenez seulement ceci pour l'instant : chaleur sensible égale température qui change." }
      ],
      render: renderSensible
    },
    {
      floor: 1,
      short: "Je fais bouillir",
      kicker: "Étage 1 · Scène 2 · Le cas simple sans glissement",
      title: "La chaleur latente change l'état. Le palier plat, lui, n'est pas universel.",
      text: "Prenons d'abord un fluide pur à pression constante : pendant l'évaporation, sa température reste stable.",
      voiceSteps: [
        { state: 0, text: "Prenons d'abord le cas le plus simple : un fluide pur, chauffé à pression constante. Le liquide atteint sa température d'ébullition et une première bulle apparaît." },
        { state: 1, text: "Nous continuons à chauffer. L'énergie sert maintenant à transformer le liquide en vapeur : c'est la chaleur latente. Dans ce cas pur, la température reste stable et la courbe est horizontale." },
        { state: 2, text: "Attention à ne pas généraliser. Chaleur latente signifie changement d'état ; elle ne signifie pas toujours température constante. Un mélange zéotropique reçoit lui aussi de la chaleur latente, mais sa température glisse." }
      ],
      render: renderLatent
    },
    {
      floor: 1,
      short: "Un seul fluide",
      kicker: "Étage 1 · Scène 3 · Dans l'évaporateur",
      title: "Avec un seul constituant, la zone de changement d'état garde la même température.",
      text: "À pression constante, la première bulle et la dernière goutte correspondent à la même température de saturation.",
      voiceSteps: [
        { state: 0, text: "Plaçons maintenant ce fluide dans un évaporateur simplifié. Nous observons seulement la zone où le liquide se transforme en vapeur, à pression constante." },
        { state: 1, text: "Au milieu, liquide et vapeur coexistent. Le fluide absorbe la chaleur de l'air, mais sa température de saturation reste la même." },
        { state: 2, text: "À la sortie du changement d'état, la dernière goutte disparaît. Pour un fluide pur, le thermomètre a gardé la même valeur pendant toute l'évaporation." }
      ],
      render: renderPureEvaporator
    },
    {
      floor: 1,
      short: "Deux composants",
      kicker: "Étage 1 · Scène 4 · A et B dans le même tube",
      title: "Dans un mélange, A et B ne quittent pas le liquide de la même façon.",
      text: "A est plus volatil : il est davantage présent dans la vapeur au début. B reste davantage dans le liquide.",
      voiceSteps: [
        { state: 0, text: "Remplaçons le fluide pur par un mélange de deux composants, A et B. Les lettres sont symboliques : elles servent seulement à suivre les composants." },
        { state: 1, text: "A, le plus volatil, part davantage dans la vapeur au début. B, le moins volatil, reste davantage dans le liquide. Le liquide et la vapeur n'ont donc pas exactement la même composition." },
        { state: 2, text: "Attention : A ne s'évapore pas entièrement puis B ensuite. Les deux sont présents, mais leurs proportions évoluent progressivement le long de l'évaporateur." }
      ],
      render: renderTwoComponents
    },
    {
      floor: 1,
      short: "Trois et plus",
      kicker: "Étage 1 · Scène 5 · La même logique continue",
      title: "Avec trois composants, ce n'est pas trois évaporations séparées.",
      text: "A, B et C restent mélangés. Chaque composant a seulement une tendance différente à passer dans la vapeur.",
      voiceSteps: [
        { state: 0, text: "Certains fluides contiennent trois composants, parfois davantage. Ajoutons C à notre dessin." },
        { state: 1, text: "Au début, la vapeur est plus riche en composant très volatil. Plus loin, la composition du liquide restant et celle de la vapeur continuent d'évoluer." },
        { state: 2, text: "Il ne faut donc pas imaginer trois wagons qui partent l'un après l'autre. Il faut imaginer un même mélange dont les proportions changent pendant le trajet." }
      ],
      render: renderThreeComponents
    },
    {
      floor: 1,
      short: "Je vois glisser",
      kicker: "Étage 1 · Scène 6 · La conséquence visible",
      title: "Quand la composition évolue, la zone latente n'est plus horizontale.",
      text: "À la même pression, le mélange commence à bouillir à une température et termine à une autre.",
      voiceSteps: [
        { state: 0, text: "Reprenons nos deux courbes. Pour le fluide pur, le changement d'état forme un palier horizontal." },
        { state: 1, text: "Pour notre mélange, la composition évolue. Sa température de saturation évolue elle aussi pendant l'évaporation : la zone de chaleur latente est inclinée. Ce n'est plus un palier isotherme." },
        { state: 2, text: "Cette variation de température à pression constante porte un nom : le glissement de température." }
      ],
      render: renderGlide
    },
    {
      floor: 1,
      short: "Je donne les noms",
      kicker: "Étage 1 · Scène 7 · Maintenant seulement, le vocabulaire",
      title: "Zéotrope : ça glisse. Azéotrope : le mélange reste groupé.",
      text: "Les mots décrivent le comportement du mélange pendant son changement d'état.",
      voiceSteps: [
        { state: 0, text: "Nous pouvons maintenant donner les noms. Un fluide pur ne contient qu'un constituant. Son palier est plat." },
        { state: 1, text: "Un azéotrope est un mélange particulier. À sa condition azéotropique, liquide et vapeur ont la même composition. Le mélange change d'état ensemble et se comporte comme un corps pur : pas de glissement." },
        { state: 2, text: "Un zéotrope est un mélange dont la composition du liquide et celle de la vapeur diffèrent pendant le changement d'état. Sa température glisse. Le R-407C glisse de cinq à sept kelvins selon la pression. Mais attention : certains zéotropes glissent très peu. Le R-410A ne glisse que d'un dixième de kelvin. Faible glissement ne veut pas dire azéotrope : c'est la table du fluide qui tranche, jamais l'habitude." }
      ],
      render: renderFamilies
    },
    {
      floor: 2,
      short: "Bulle et rosée",
      kicker: "Étage 2 · Scène 8 · Les deux extrémités du glissement",
      title: "Première bulle au départ. Dernière goutte à l'arrivée.",
      text: "En évaporation, le glissement va de la température de bulle vers la température de rosée.",
      voiceSteps: [
        { state: 0, text: "Au début du changement d'état, la première bulle de vapeur apparaît. Cette limite s'appelle le point de bulle." },
        { state: 1, text: "Entre les deux limites, liquide et vapeur coexistent. Pour un zéotrope, la température monte progressivement à pression constante." },
        { state: 2, text: "À la fin, la dernière goutte de liquide disparaît. Cette limite s'appelle le point de rosée. Le glissement est l'écart entre la température de rosée et la température de bulle, à la même pression." }
      ],
      render: renderBubbleDew
    },
    {
      floor: 2,
      short: "Je condense",
      kicker: "Étage 2 · Scène 9 · Le film passe à l'envers",
      title: "Dans le condenseur, rosée vient avant bulle.",
      text: "La vapeur donne sa chaleur. La première goutte apparaît à la rosée ; la dernière bulle disparaît à la bulle.",
      voiceSteps: [
        { state: 0, text: "Dans le condenseur, nous parcourons la même histoire en sens inverse. La vapeur refroidit jusqu'au point de rosée : la première goutte apparaît." },
        { state: 1, text: "Pendant la condensation zéotropique, la température descend à pression constante." },
        { state: 2, text: "Au point de bulle, la dernière bulle de vapeur disparaît. Le fluide est entièrement liquide. Les noms bulle et rosée ne changent pas ; seul le sens du trajet change." }
      ],
      render: renderCondenser
    },
    {
      floor: 2,
      short: "Isobare ou isotherme ?",
      kicker: "Étage 2 · Scène 10 · La distinction indispensable",
      title: "Une isotherme complète traverse les trois zones.",
      text: "Elle passe par le liquide, la cloche puis la vapeur. Seule sa portion diphasique est comparée à l'isobare.",
      voiceSteps: [
        { state: 0, text: "Suivons une seule isotherme entière. Elle relie tous les états qui ont la même température. Sa forme change entre la zone liquide, la zone liquide vapeur et la zone vapeur." },
        { state: 1, text: "Sans glissement, la portion de l'isotherme située sous la cloche se confond avec l'isobare. Cette superposition concerne seulement la zone liquide vapeur. Avant la bulle et après la rosée, l'isotherme continue sa propre courbe." },
        { state: 2, text: "Avec un zéotrope, l'isotherme reste entière, mais sa portion sous la cloche est légèrement inclinée. Elle ne se confond donc plus avec l'isobare horizontale : elle la coupe une seule fois. En suivant l'isobare de bulle à rosée, la température change." }
      ],
      render: renderIsobarIsotherms
    },
    {
      floor: 2,
      short: "Je retrouve log p-h",
      kicker: "Étage 2 · Scène 11 · La cloche confirme l'histoire",
      title: "L'isotherme continue avant, sous et après la cloche.",
      text: "La courbe entière garde une seule température ; l'isobare horizontale relie bulle et rosée à la même pression.",
      voiceSteps: [
        { state: 0, text: "Plaçons maintenant la distinction sur le diagramme complet. La pression se lit verticalement, l'enthalpie horizontalement et la cloche entoure la zone où liquide et vapeur coexistent." },
        { state: 1, text: "La courbe violette est une isotherme complète. Elle commence dans la zone liquide, traverse la courbe de bulle, passe sous la cloche, traverse la courbe de rosée puis continue dans la zone vapeur. Tous ses points portent la même température." },
        { state: 2, text: "La ligne bleu marine est l'isobare d'évaporation. Elle reste horizontale. Dans le zéotrope, la portion diphasique de l'isotherme est légèrement inclinée : l'isobare la coupe au lieu de se confondre avec elle. De bulle à rosée, la température change. Après la détente, le trajet réel peut commencer déjà à l'intérieur de la cloche." }
      ],
      render: renderLogPh
    },
    {
      floor: 2,
      short: "Je choisis la mesure",
      kicker: "Étage 2 · Scène 12 · À vous d'agir",
      title: "Quelle saturation sert de référence pour mesurer ?",
      text: "Deux mesures, deux références à choisir. Regardez dans chaque cas si vous avez affaire à une vapeur seule ou à un liquide seul. Le récit reprendra quand les deux choix seront justes.",
      voiceSteps: [
        { state: 0, text: "Voici votre première action. Pour calculer la surchauffe, vous observez une vapeur seule après l'évaporateur. À vous de dire si la référence est la bulle ou la rosée." },
        { state: 1, text: "Pour calculer le sous-refroidissement, vous observez un liquide seul après le condenseur. Choisissez bulle ou rosée. Le récit vous attend." }
      ],
      pauseForActivity: true,
      render: renderMeasurement
    },
    {
      floor: 2,
      short: "Je raconte",
      kicker: "Étage 2 · Scène 13 · La preuve de compréhension",
      title: "Remettez l'évaporation zéotropique dans l'ordre.",
      text: "Construisez l'histoire avec quatre images mentales. Il ne s'agit pas de réciter une définition.",
      voiceSteps: [
        { state: 0, text: "Dernière activité. Cliquez d'abord sur le début de l'histoire, puis construisez l'ordre complet." },
        { state: 1, text: "Cherchez la première bulle, l'évolution de composition, la température qui glisse, puis la dernière goutte. Le bilan s'ouvrira lorsque l'histoire sera complète." }
      ],
      pauseForActivity: true,
      render: renderStoryOrder
    }
  ];

  const landing = $("#landing");
  const course = $("#course");
  const summary = $("#summary");
  const lessonKicker = $("#lesson-kicker");
  const lessonTitle = $("#lesson-title");
  const lessonText = $("#lesson-text");
  const transcript = $("#transcript");
  const zone = $("#zone");
  const status = $("#status");
  const storyState = $("#story-state");
  const listenButton = $("#listen");
  const stopVoiceButton = $("#stop-voice");
  const previousButton = $("#previous");
  const nextButton = $("#next");
  const autoProgress = $("#auto-progress");
  const voiceRate = $("#voice-rate");

  function svgDefs() {
    return `<defs>
      <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#1b3a63"/></marker>
      <marker id="small-arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L12 6L0 12Z" fill="#1b3a63"/></marker>
      <marker id="heat-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#c9451a"/></marker>
      <marker id="bracket-start" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto"><path d="M8 0L0 4L8 8" fill="none" stroke="#c9451a" stroke-width="2"/></marker>
      <marker id="bracket-end" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8" fill="none" stroke="#c9451a" stroke-width="2"/></marker>
    </defs>`;
  }

  function component(x, y, letter, type, r = 13) {
    return `<g><circle class="component-${type}" cx="${x}" cy="${y}" r="${r}"/><text class="component-letter" x="${x}" y="${y + .5}">${letter}</text></g>`;
  }

  function renderSensible() {
    return `<div class="scene" data-scene-state="0">
      <div class="visual-card">
        <svg viewBox="0 0 720 370" role="img" aria-labelledby="sens-title sens-desc">
          <title id="sens-title">Chauffage sensible d'un liquide</title>
          <desc id="sens-desc">Un récipient entièrement liquide reçoit de la chaleur. Le thermomètre monte sans changement d'état.</desc>
          ${svgDefs()}
          <text class="svg-title" x="28" y="34">Le liquide reçoit de la chaleur</text>
          <g class="stage-part stage-1">
            <path class="heat-arrow" d="M90 330C125 285 160 278 205 253"/>
            <path class="heat-arrow" d="M230 330C250 290 270 278 305 254"/>
            <text class="svg-label" x="70" y="355">chaleur apportée</text>
          </g>
          <g class="stage-part stage-2">
            <path d="M160 82V270Q160 304 194 304H420Q454 304 454 270V82" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/>
            <path class="liquid-fill" d="M166 164V270Q166 298 194 298H420Q448 298 448 270V164Z"/>
            <path d="M176 156Q210 146 244 158T314 158T382 155T438 158" fill="none" stroke="#3d7fca" stroke-width="4"/>
            ${component(220,210,"L","a",12)}${component(275,250,"L","a",12)}${component(340,195,"L","a",12)}${component(394,254,"L","a",12)}
            <text class="svg-label" x="238" y="286">100 % liquide</text>
          </g>
          <g class="stage-part stage-3">
            <rect class="thermo-outline" x="542" y="74" width="38" height="208" rx="19"/>
            <circle class="thermo-outline" cx="561" cy="300" r="34"/>
            <rect class="thermo-fill" x="550" y="140" width="22" height="145" rx="11"/>
            <circle class="thermo-fill" cx="561" cy="300" r="24"/>
            <path d="M590 225H624M590 174H624M590 123H624" stroke="#1b3a63" stroke-width="3"/>
            <text class="svg-big" x="604" y="105">T° ↑</text>
          </g>
        </svg>
      </div>
      <aside class="explain-card"><h3>Chaleur sensible</h3><p>Le liquide reste liquide.</p><p>La chaleur reçue fait monter sa température.</p><div class="definition-line">Le thermomètre «&nbsp;sent&nbsp;» le changement.</div><p class="scientific-note">Le dessin raconte une évolution qualitative, sans valeur de fluide.</p></aside>
    </div>`;
  }

  function renderLatent() {
    return `<div class="scene" data-scene-state="0">
      <div class="visual-card">
        <svg viewBox="0 0 760 390" role="img" aria-labelledby="lat-title lat-desc">
          <title id="lat-title">Courbe de chauffe d'un fluide pur à pression constante</title>
          <desc id="lat-desc">Dans ce cas de référence sans glissement, la température monte dans le liquide, reste stable pendant le changement d'état liquide-vapeur, puis remonte dans la vapeur.</desc>
          ${svgDefs()}
          <path class="graph-axis" d="M75 34V325H704"/>
          <text class="svg-label" x="20" y="38">température</text><text class="svg-label" x="520" y="362">chaleur apportée →</text>
          <text class="svg-small" x="92" y="64">CAS DE RÉFÉRENCE · FLUIDE PUR · PRESSION CONSTANTE</text>
          <path class="stage-part stage-1 graph-pure" d="M95 290L245 190"/>
          <path class="stage-part stage-2 graph-pure" d="M245 190H510"/>
          <path class="stage-part stage-3 graph-pure" d="M510 190L665 72"/>
          <g class="stage-part stage-1"><text class="svg-label" x="115" y="274">liquide</text><text class="svg-small" x="112" y="293">T° monte</text></g>
          <g class="stage-part stage-2">
            <circle cx="245" cy="190" r="7" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><circle cx="510" cy="190" r="7" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/>
            <text class="svg-big" x="285" y="166">PALIER DU PUR</text>
            <text class="svg-label" x="298" y="220">liquide + vapeur</text><text class="svg-small" x="332" y="240">T° stable</text>
            <path class="heat-arrow" d="M300 283H450"/><text class="svg-small" x="303" y="308">la chaleur transforme</text>
          </g>
          <g class="stage-part stage-3"><text class="svg-label" x="562" y="130">vapeur</text><text class="svg-small" x="560" y="149">T° remonte</text></g>
        </svg>
      </div>
      <aside class="explain-card"><h3>Deux idées à séparer</h3><p><b>Chaleur latente</b>&nbsp;: la chaleur sert au changement d'état.</p><p><b>Palier horizontal</b>&nbsp;: cas d'un fluide pur à pression constante.</p><div class="key">🔑 Dans ce cas de référence, la chaleur latente est échangée à température constante.</div><div class="trap">⚠ Un zéotrope change aussi d'état, mais sa température glisse pendant cette zone latente.</div></aside>
    </div>`;
  }

  function renderPureEvaporator() {
    return `<div class="scene" data-scene-state="0">
      <div class="visual-card">
        <svg viewBox="0 0 820 400" role="img" aria-labelledby="pure-title pure-desc">
          <title id="pure-title">Évaporation d'un fluide pur dans un évaporateur</title>
          <desc id="pure-desc">Dans un tube parcouru de gauche à droite, le liquide devient un mélange puis une vapeur. Trois thermomètres indiquent la même température de saturation.</desc>
          ${svgDefs()}
          <text class="svg-title" x="30" y="34">Évaporateur · pression constante</text>
          <path class="pipe" d="M70 225H750"/><path class="pipe-inner" d="M70 225H750"/><path class="flow-arrow" d="M85 170H735"/>
          <g class="stage-part stage-1">
            <path d="M80 225H285" stroke="#3d7fca" stroke-width="12" stroke-linecap="round"/>
            ${component(125,225,"L","a",10)}${component(175,225,"L","a",10)}${component(225,225,"L","a",10)}
            <text class="svg-label" x="88" y="280">liquide → 1res bulles</text>
          </g>
          <g class="stage-part stage-2">
            <path d="M285 225H550" stroke="#84b7ec" stroke-width="12" stroke-dasharray="15 7"/>
            <circle class="bubble" cx="330" cy="225" r="7"/><circle class="bubble" cx="392" cy="225" r="10"/><circle class="bubble" cx="472" cy="225" r="13"/>
            <text class="svg-label" x="333" y="280">liquide + vapeur</text>
          </g>
          <g class="stage-part stage-3">
            <path d="M550 225H740" stroke="#ffb28e" stroke-width="12" stroke-dasharray="5 7"/>
            <circle class="vapor-fill" cx="595" cy="225" r="13"/><circle class="vapor-fill" cx="660" cy="225" r="13"/><circle class="vapor-fill" cx="714" cy="225" r="13"/>
            <text class="svg-label" x="590" y="280">dernière goutte → vapeur</text>
          </g>
          ${thermometerGroup(165,75,"T saturation")}${thermometerGroup(405,75,"même T°")}${thermometerGroup(650,75,"même T°")}
          <path class="heat-arrow" d="M165 360V300M405 360V300M650 360V300"/>
        </svg>
      </div>
      <aside class="explain-card"><h3>Un constituant</h3><p>Le liquide et la vapeur sont faits de la même substance.</p><p>À la pression observée, il existe une seule température de saturation.</p><div class="key">🔑 De la première bulle à la dernière goutte&nbsp;: même palier.</div></aside>
    </div>`;
  }

  function thermometerGroup(x, y, label) {
    return `<g><rect class="thermo-outline" x="${x}" y="${y}" width="20" height="70" rx="10"/><circle class="thermo-outline" cx="${x + 10}" cy="${y + 79}" r="16"/><rect class="thermo-fill" x="${x + 6}" y="${y + 28}" width="8" height="48" rx="4"/><circle class="thermo-fill" cx="${x + 10}" cy="${y + 79}" r="10"/><text class="svg-small" x="${x - 22}" y="${y - 8}">${label}</text></g>`;
  }

  function renderTwoComponents() {
    return `<div class="scene" data-scene-state="0">
      <div class="visual-card">
        <svg viewBox="0 0 860 410" role="img" aria-labelledby="two-title two-desc">
          <title id="two-title">Évolution de deux composants A et B dans un évaporateur</title>
          <desc id="two-desc">Le mélange liquide A-B entre à gauche. Le composant A, plus volatil, est plus fréquent dans les bulles de vapeur au début, tandis que B reste davantage dans le liquide. Les proportions évoluent progressivement.</desc>
          ${svgDefs()}
          <text class="svg-title" x="28" y="34">Le même mélange avance · ses proportions évoluent</text>
          <path class="pipe" d="M60 235H805"/><path class="pipe-inner" d="M60 235H805"/><path class="flow-arrow" d="M74 170H790"/>
          <g class="stage-part stage-1">
            ${component(100,235,"A","a",11)}${component(135,235,"B","b",11)}${component(170,235,"A","a",11)}${component(205,235,"B","b",11)}
            <text class="svg-label" x="75" y="295">mélange liquide A + B</text>
          </g>
          <g class="stage-part stage-2">
            ${component(290,223,"A","a",11)}${component(335,246,"B","b",11)}${component(380,222,"A","a",11)}${component(430,245,"B","b",11)}${component(480,223,"B","b",11)}
            <path d="M282 194C310 158 345 148 375 120" class="flow-arrow"/>
            ${component(390,105,"A","a",14)}${component(442,114,"A","a",12)}${component(490,102,"B","b",12)}
            <text class="svg-small" x="363" y="72">vapeur plus riche en A au début</text>
            <text class="svg-small" x="350" y="294">liquide restant plus riche en B</text>
          </g>
          <g class="stage-part stage-3">
            ${component(580,235,"B","b",11)}${component(625,222,"A","a",11)}${component(670,246,"B","b",11)}${component(720,222,"A","a",11)}${component(765,245,"B","b",11)}
            ${thermometerGroup(120,66,"T bulle")}${thermometerGroup(680,66,"T rosée")}
            <path class="glide-bracket" d="M175 385H715"/><text class="svg-label" x="370" y="375">évolution progressive</text>
          </g>
          <path class="heat-arrow" d="M170 365V315M430 365V315M700 365V315"/>
        </svg>
      </div>
      <aside class="explain-card"><h3>Deux composants, un seul mélange</h3><div class="legend-row"><span class="legend-item"><i class="dot dot-a">A</i> plus volatil</span><span class="legend-item"><i class="dot dot-b">B</i> moins volatil</span></div><p>La vapeur est plus riche en A au début.</p><p>Le liquide restant devient relativement plus riche en B.</p><div class="trap">⚠ A puis B n'est pas une succession totale. Les deux restent présents.</div></aside>
    </div>`;
  }

  function renderThreeComponents() {
    return `<div class="scene" data-scene-state="0">
      <div class="visual-card">
        <svg viewBox="0 0 850 410" role="img" aria-labelledby="three-title three-desc">
          <title id="three-title">Mélange zéotropique à trois composants</title>
          <desc id="three-desc">A, B et C circulent ensemble. La vapeur et le liquide contiennent les trois composants dans des proportions qui évoluent, et non dans trois zones séparées.</desc>
          ${svgDefs()}
          <text class="svg-title" x="28" y="34">A + B + C restent dans la même histoire</text>
          <g class="stage-part stage-1">
            <rect x="45" y="82" width="230" height="250" rx="22" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/>
            <text class="svg-label" x="80" y="112">entrée · surtout liquide</text>
            ${component(92,185,"A","a",17)}${component(155,205,"B","b",17)}${component(218,180,"C","c",17)}${component(115,265,"C","c",17)}${component(190,270,"A","a",17)}
          </g>
          <g class="stage-part stage-2">
            <path class="flow-arrow" d="M294 205H392"/>
            <rect x="407" y="70" width="165" height="275" rx="22" fill="#fffdf8" stroke="#3d7fca" stroke-width="3"/>
            <path d="M410 215H569" stroke="#3d7fca" stroke-width="3"/>
            <text class="svg-label" x="428" y="102">au milieu</text>
            <text class="svg-small" x="425" y="132">vapeur : A, B, C</text>
            ${component(448,170,"A","a",14)}${component(493,154,"A","a",14)}${component(535,178,"B","b",14)}
            <text class="svg-small" x="425" y="245">liquide : A, B, C</text>
            ${component(448,290,"B","b",14)}${component(493,274,"C","c",14)}${component(535,298,"C","c",14)}
          </g>
          <g class="stage-part stage-3">
            <path class="flow-arrow" d="M592 205H670"/>
            <rect x="685" y="82" width="125" height="250" rx="22" fill="#fffdf8" stroke="#c9451a" stroke-width="3" stroke-dasharray="8 5"/>
            <text class="svg-label" x="702" y="112">sortie</text>
            ${component(720,180,"A","a",15)}${component(772,170,"B","b",15)}${component(735,245,"C","c",15)}${component(782,265,"B","b",15)}
          </g>
          <text class="svg-small" x="278" y="382">Ce sont des proportions qui évoluent, pas trois compartiments.</text>
        </svg>
      </div>
      <aside class="explain-card"><h3>Trois composants ou plus</h3><div class="legend-row"><span class="legend-item"><i class="dot dot-a">A</i></span><span class="legend-item"><i class="dot dot-b">B</i></span><span class="legend-item"><i class="dot dot-c">C</i></span></div><p>Ils coexistent dans le liquide et dans la vapeur.</p><p>Leur part relative change pendant le changement d'état.</p><div class="key">🔑 Plus de composants ne change pas le raisonnement.</div></aside>
    </div>`;
  }

  function renderGlide() {
    return `<div class="scene curve-compare" data-scene-state="0">
      <article class="curve-panel stage-part stage-1"><h3>Fluide pur · palier horizontal</h3><svg viewBox="0 0 380 280" role="img" aria-label="Courbe de température avec palier horizontal">${svgDefs()}<path class="graph-axis" d="M45 25V235H355"/><text class="svg-small" x="14" y="22">T°</text><text class="svg-small" x="243" y="258">chaleur reçue →</text><rect x="120" y="42" width="155" height="183" rx="8" class="latent-zone"/><path class="graph-pure" d="M60 215L125 145H270L340 55"/><text class="svg-small" x="138" y="133">même température</text><text class="svg-small" x="146" y="220">chaleur latente</text><circle cx="125" cy="145" r="6" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><circle cx="270" cy="145" r="6" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/></svg><p>Une seule température de saturation.</p></article>
      <article class="curve-panel zeo stage-part stage-2 stage-3"><h3>Mélange zéotrope · zone latente inclinée</h3><svg viewBox="0 0 380 280" role="img" aria-label="Courbe dont seule la zone de changement d'état est inclinée entre température de bulle et température de rosée">${svgDefs()}<path class="graph-axis" d="M45 25V235H355"/><text class="svg-small" x="14" y="22">T°</text><text class="svg-small" x="243" y="258">chaleur reçue →</text><rect x="120" y="42" width="155" height="183" rx="8" class="latent-zone"/><path class="graph-zeo-sensible" d="M60 220L125 175M270 105L340 45"/><path class="graph-zeo" d="M125 175L270 105"/><circle cx="125" cy="175" r="6" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><circle cx="270" cy="105" r="6" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><text class="svg-small" x="66" y="166">T bulle</text><text class="svg-small" x="216" y="96">T rosée</text><text class="svg-small" x="146" y="220">chaleur latente</text><path class="glide-bracket" d="M300 165V112"/><text class="svg-label" x="310" y="145">ΔT</text></svg><p><strong>Glissement = T rosée − T bulle</strong>, à la même pression.</p></article>
    </div>`;
  }

  function renderFamilies() {
    return `<div class="family-grid scene" data-scene-state="0">
      <article class="family-card stage-part stage-1"><h3>Fluide pur</h3><svg viewBox="0 0 240 220" role="img" aria-label="Un seul constituant A dans le liquide et la vapeur"><rect x="38" y="25" width="164" height="170" rx="18" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/>${component(78,70,"A","a",17)}${component(142,60,"A","a",17)}${component(107,126,"A","a",17)}${component(162,145,"A","a",17)}<path class="graph-pure" d="M55 177H185"/></svg><p>Un constituant. Pas de glissement.</p><p class="fluid-example"><b>R-134a</b>, <b>R-290</b> (propane)</p></article>
      <article class="family-card azeo stage-part stage-2"><h3>Azéotrope</h3><svg viewBox="0 0 240 220" role="img" aria-label="Les composants A et B restent groupés dans les phases liquide et vapeur"><rect x="38" y="25" width="164" height="170" rx="18" fill="#fffdf8" stroke="#1e7e54" stroke-width="3"/><g transform="translate(78 64)">${component(0,0,"A","a",15)}${component(24,0,"B","b",15)}<path d="M13 -12V12" stroke="#1e7e54" stroke-width="4"/></g><g transform="translate(137 118)">${component(0,0,"A","a",15)}${component(24,0,"B","b",15)}<path d="M13 -12V12" stroke="#1e7e54" stroke-width="4"/></g><path class="graph-pure" d="M55 177H185"/></svg><p>Mélange groupé à la condition azéotropique. Pas de glissement.</p><p class="fluid-example"><b>R-507A</b></p></article>
      <article class="family-card zeo stage-part stage-3"><h3>Zéotrope</h3><svg viewBox="0 0 240 220" role="img" aria-label="Les proportions A et B diffèrent entre la partie liquide et la partie vapeur"><rect x="38" y="25" width="164" height="170" rx="18" fill="#fffdf8" stroke="#c9451a" stroke-width="3" stroke-dasharray="7 5"/>${component(72,58,"A","a",15)}${component(120,54,"A","a",15)}${component(166,72,"B","b",15)}${component(85,128,"B","b",15)}${component(133,143,"B","b",15)}${component(174,124,"A","a",15)}<path class="graph-zeo" d="M55 184L185 162"/></svg><p>Proportions différentes. Température qui glisse.</p><p class="fluid-example"><b>R-407C</b> : 5 à 7 K · <b>R-404A</b> : moins de 1 K · <b>R-410A</b> : 0,1 K</p></article>
    </div>`;
  }

  function renderBubbleDew() {
    return `<div class="scene" data-scene-state="0">
      <div class="visual-card">
        <svg viewBox="0 0 840 400" role="img" aria-labelledby="bd-title bd-desc">
          <title id="bd-title">Du point de bulle au point de rosée</title>
          <desc id="bd-desc">L'évaporation commence avec la première bulle, traverse une zone liquide-vapeur avec température croissante, puis finit quand la dernière goutte disparaît au point de rosée.</desc>
          ${svgDefs()}
          <path class="flow-arrow" d="M75 75H770"/>
          <g class="stage-part stage-1">
            <rect x="50" y="120" width="215" height="210" rx="18" class="liquid-fill"/>
            <circle class="bubble" cx="170" cy="245" r="23"/><text class="svg-label" x="88" y="154">POINT DE BULLE</text><text class="svg-small" x="80" y="308">la première bulle apparaît</text><text class="svg-big" x="102" y="208">T bulle</text>
          </g>
          <g class="stage-part stage-2">
            <rect x="315" y="120" width="215" height="210" rx="18" fill="#f3f7fb" stroke="#3d7fca" stroke-width="3"/>
            <path d="M318 232H527" stroke="#3d7fca" stroke-width="3"/>
            <circle class="bubble" cx="360" cy="190" r="16"/><circle class="bubble" cx="420" cy="165" r="23"/><circle class="bubble" cx="482" cy="198" r="13"/>
            <text class="svg-label" x="345" y="154">LIQUIDE + VAPEUR</text><text class="svg-big" x="365" y="291">T° ↑</text>
          </g>
          <g class="stage-part stage-3">
            <rect x="580" y="120" width="215" height="210" rx="18" class="vapor-fill"/>
            <path d="M650 246Q678 220 706 246Q734 274 762 246" fill="none" stroke="#3d7fca" stroke-width="5"/>
            <text class="svg-label" x="616" y="154">POINT DE ROSÉE</text><text class="svg-small" x="610" y="308">la dernière goutte disparaît</text><text class="svg-big" x="633" y="208">T rosée</text>
          </g>
          <path class="glide-bracket" d="M210 370H680"/><text class="svg-label" x="310" y="360">glissement à la même pression</text>
        </svg>
      </div>
      <aside class="explain-card"><h3>Le sens en évaporation</h3><ol><li><b>Bulle</b>&nbsp;: première bulle.</li><li><b>Zone diphasique</b>&nbsp;: liquide + vapeur.</li><li><b>Rosée</b>&nbsp;: dernière goutte disparue.</li></ol><div class="definition-line">T<sub>rosée</sub> − T<sub>bulle</sub> = glissement</div><p class="scientific-note">Toujours comparer ces températures à la même pression.</p></aside>
    </div>`;
  }

  function renderCondenser() {
    return `<div class="scene" data-scene-state="0">
      <div class="visual-card">
        <svg viewBox="0 0 840 400" role="img" aria-labelledby="cond-title cond-desc">
          <title id="cond-title">Condensation d'un mélange zéotropique</title>
          <desc id="cond-desc">Le trajet va de droite à gauche : première goutte au point de rosée, condensation avec température descendante, puis disparition de la dernière bulle au point de bulle.</desc>
          ${svgDefs()}
          <text class="svg-title" x="30" y="36">Condenseur · le trajet est inversé</text>
          <path class="flow-arrow" d="M770 80H75"/>
          <g class="stage-part stage-1">
            <rect x="575" y="120" width="220" height="205" rx="18" class="vapor-fill"/>
            <path d="M650 238Q677 215 704 238Q731 263 758 238" fill="none" stroke="#3d7fca" stroke-width="5"/>
            <text class="svg-label" x="615" y="153">ROSÉE</text><text class="svg-small" x="610" y="302">première goutte</text><text class="svg-big" x="635" y="205">T rosée</text>
          </g>
          <g class="stage-part stage-2">
            <rect x="310" y="120" width="220" height="205" rx="18" fill="#f3f7fb" stroke="#3d7fca" stroke-width="3"/>
            <path d="M313 215H527" stroke="#3d7fca" stroke-width="3"/>
            <circle class="bubble" cx="360" cy="170" r="20"/><circle class="bubble" cx="425" cy="190" r="15"/><circle class="bubble" cx="482" cy="163" r="11"/>
            <text class="svg-label" x="345" y="150">LIQUIDE + VAPEUR</text><text class="svg-big" x="382" y="286">T° ↓</text>
          </g>
          <g class="stage-part stage-3">
            <rect x="45" y="120" width="220" height="205" rx="18" class="liquid-fill"/>
            <circle class="bubble" cx="160" cy="235" r="10"/><path d="M140 264L180 264" stroke="#c0392b" stroke-width="4"/>
            <text class="svg-label" x="94" y="153">BULLE</text><text class="svg-small" x="80" y="302">dernière bulle disparue</text><text class="svg-big" x="103" y="205">T bulle</text>
          </g>
          <path class="heat-arrow" d="M690 360V322M420 360V322M155 360V322"/>
          <text class="svg-small" x="650" y="382">chaleur rejetée</text>
        </svg>
      </div>
      <aside class="explain-card"><h3>Le sens en condensation</h3><ol><li><b>Rosée</b>&nbsp;: première goutte.</li><li><b>Zone diphasique</b>&nbsp;: T° descend.</li><li><b>Bulle</b>&nbsp;: dernière bulle disparue.</li></ol><div class="key">🔑 Les noms restent liés à l'état, pas au sens de circulation.</div></aside>
    </div>`;
  }

  function renderIsobarIsotherms() {
    return `<div class="isotherm-compare scene" data-scene-state="0">
      <article class="isotherm-panel pure-case">
        <h3>Sans glissement · une isotherme entière</h3>
        <svg viewBox="0 0 380 280" role="img" aria-labelledby="iso-pure-title iso-pure-desc">
          <title id="iso-pure-title">Isotherme complète d'un fluide sans glissement</title>
          <desc id="iso-pure-desc">Une seule isotherme traverse successivement les zones liquide, liquide-vapeur et vapeur. Sa portion située sous la cloche se superpose à l'isobare, mais ses deux extrémités continuent dans les zones monophasées.</desc>
          ${svgDefs()}
          <path class="mini-log-axis" d="M42 28V238H354"/>
          <text class="svg-small" x="9" y="28">log P</text><text class="svg-small" x="285" y="264">h →</text>
          <path class="mini-dome bubble-side" d="M76 228C105 138 145 70 196 48"/>
          <path class="mini-dome dew-side" d="M196 48C274 90 315 158 342 228"/>
          <text class="zone-name" x="50" y="112">LIQUIDE</text><text class="zone-name" x="151" y="112">LIQUIDE + VAPEUR</text><text class="zone-name" x="305" y="112">VAPEUR</text>
          <path class="isobar-line" d="M55 181H350"/>
          <text class="svg-small" x="127" y="168">ISOBARE · P constante</text>
          <g class="stage-part stage-2 keep-visible">
            <path class="isotherm-line pure-isotherm" d="M88 44C90 100 93 145 96 181H315C330 189 342 209 350 229"/>
            <text class="svg-small isotherm-text" x="110" y="40">ISOTHERME ENTIÈRE · T constante</text>
            <text class="svg-small" x="112" y="207">superposition seulement sous la cloche</text>
          </g>
        </svg>
        <p><b>Sous la cloche seulement</b>, isotherme et isobare se superposent.</p>
      </article>
      <article class="isotherm-panel zeo-case">
        <h3>Avec glissement · une isotherme entière</h3>
        <svg viewBox="0 0 380 280" role="img" aria-labelledby="iso-zeo-title iso-zeo-desc">
          <title id="iso-zeo-title">Isotherme complète d'un fluide avec glissement</title>
          <desc id="iso-zeo-desc">Une seule isotherme traverse les zones liquide, liquide-vapeur et vapeur. Sous la cloche, sa pente faible mais visible l'empêche de se superposer à l'isobare horizontale, qu'elle coupe une fois.</desc>
          ${svgDefs()}
          <path class="mini-log-axis" d="M42 28V238H354"/>
          <text class="svg-small" x="9" y="28">log P</text><text class="svg-small" x="285" y="264">h →</text>
          <path class="mini-dome bubble-side" d="M76 228C105 138 145 70 196 48"/>
          <path class="mini-dome dew-side" d="M196 48C274 90 315 158 342 228"/>
          <text class="zone-name" x="50" y="112">LIQUIDE</text><text class="zone-name" x="151" y="112">LIQUIDE + VAPEUR</text><text class="zone-name" x="305" y="112">VAPEUR</text>
          <path class="isobar-line" d="M55 181H350"/>
          <text class="svg-small" x="127" y="168">ISOBARE · P constante</text>
          <g class="stage-part stage-3 keep-visible">
            <path class="isotherm-line" d="M90 44C92 100 95 143 98 174L315 190C331 198 343 214 350 229"/>
            <text class="svg-small isotherm-text" x="110" y="40">ISOTHERME ENTIÈRE · T constante</text>
            <circle class="phase-cross" cx="96" cy="181" r="5"/><circle class="temperature-cross" cx="193" cy="181" r="6"/><circle class="phase-cross" cx="315" cy="181" r="5"/>
            <text class="svg-small" x="52" y="207">T bulle</text><text class="svg-small isotherm-text" x="161" y="211">T choisie</text><text class="svg-small" x="286" y="211">T rosée</text>
          </g>
        </svg>
        <p><b>Sous la cloche</b>, l'isotherme inclinée coupe l'isobare.</p>
      </article>
    </div>`;
  }

  function renderLogPh() {
    return `<div class="scene" data-scene-state="0">
      <div class="visual-card">
        <svg viewBox="0 0 860 440" role="img" aria-labelledby="log-title log-desc">
          <title id="log-title">Diagramme pression-enthalpie qualitatif</title>
          <desc id="log-desc">L'axe vertical porte la pression et l'axe horizontal l'enthalpie. Une seule isotherme complète traverse les zones liquide, liquide-vapeur et vapeur. Dans la zone diphasique du zéotrope, sa pente faible la distingue de l'isobare horizontale.</desc>
          ${svgDefs()}
          <path class="graph-axis" d="M78 35V382H800"/>
          <text class="svg-label" x="15" y="24">log pression</text><text class="svg-label" x="620" y="420">enthalpie h →</text>
          <path class="grid-line" d="M78 110H790M78 180H790M78 250H790M78 322H790"/>
          <g class="stage-part stage-1 keep-visible">
            <path d="M175 350C230 235 290 105 430 75" fill="none" stroke="#3d7fca" stroke-width="6"/>
            <path d="M430 75C595 125 675 245 720 350" fill="none" stroke="#c9451a" stroke-width="6" stroke-dasharray="11 6"/>
            <text class="svg-label" x="243" y="268" transform="rotate(-52 243 268)">courbe de bulle</text>
            <text class="svg-label" x="625" y="188" transform="rotate(59 625 188)">courbe de rosée</text>
            <text class="svg-small" x="90" y="285">LIQUIDE</text><text class="svg-small" x="355" y="205">LIQUIDE + VAPEUR</text><text class="svg-small" x="705" y="260">VAPEUR</text>
          </g>
          <g class="stage-part stage-2 keep-visible">
            <path class="isotherm-line complete-isotherm" d="M198 48C200 140 202 245 205 306L705 338C740 348 770 360 792 374"/>
            <text class="svg-label isotherm-text" x="285" y="42">UNE ISOTHERME COMPLÈTE · T constante</text>
          </g>
          <g class="stage-part stage-3">
            <path class="isobar-line evaporator-isobar" d="M190 322H710" marker-end="url(#small-arrow)"/>
            <circle class="phase-cross" cx="207" cy="322" r="8"/><circle class="temperature-cross" cx="455" cy="322" r="7"/><circle class="phase-cross" cx="700" cy="322" r="8"/>
            <text class="svg-label" x="286" y="299">ISOBARE · zone de changement d'état</text>
            <text class="svg-small" x="172" y="348">T bulle</text><text class="svg-small isotherm-text" x="414" y="348">T choisie</text><text class="svg-small" x="675" y="348">T rosée</text>
          </g>
        </svg>
      </div>
      <aside class="explain-card"><h3>Ce qu'il faut lire</h3><p><b>Violet&nbsp;:</b> une seule isotherme complète, donc une seule température.</p><p><b>Bleu marine horizontal&nbsp;:</b> une isobare, donc une seule pression.</p><p><b>La courbe violette continue&nbsp;:</b> liquide → cloche → vapeur.</p><div class="definition-line">Sous la cloche, l'isotherme inclinée coupe l'isobare au point « T choisie ».</div><div class="key">🔑 Sans glissement, les deux lignes se superposeraient dans la zone diphasique. Avec glissement, elles se croisent.</div><p class="scientific-note">Schéma qualitatif : la forme exacte de l'isotherme dépend du fluide et de la température représentée. Après la détente, l'évaporateur réel peut commencer à l'intérieur de la cloche.</p></aside>
    </div>`;
  }

  function renderMeasurement() {
    return `<div class="activity-layout">
      <article class="activity-card"><p class="eyebrow">Cas 1 · sortie évaporateur</p><h3>Je mesure une vapeur seule pour calculer la surchauffe.</h3><p>Quelle température de saturation sert de référence&nbsp;?</p><div class="choice-grid"><button class="choice" data-case="superheat" data-answer="bubble" type="button">Température de bulle</button><button class="choice" data-case="superheat" data-answer="dew" type="button">Température de rosée</button></div><p class="feedback" id="feedback-superheat">Choisissez, puis l'explication apparaîtra ici.</p></article>
      <article class="activity-card"><p class="eyebrow">Cas 2 · sortie condenseur</p><h3>Je mesure un liquide seul pour calculer le sous-refroidissement.</h3><p>Quelle température de saturation sert de référence&nbsp;?</p><div class="choice-grid"><button class="choice" data-case="subcool" data-answer="dew" type="button">Température de rosée</button><button class="choice" data-case="subcool" data-answer="bubble" type="button">Température de bulle</button></div><p class="feedback" id="feedback-subcool">Choisissez, puis l'explication apparaîtra ici.</p></article>
    </div>`;
  }

  function renderStoryOrder() {
    const cards = [
      ["composition", "Les proportions de A et B évoluent dans le liquide et la vapeur."],
      ["dew", "La dernière goutte disparaît au point de rosée."],
      ["bubble", "La première bulle apparaît au point de bulle."],
      ["glide", "La température de saturation glisse à pression constante."]
    ];
    return `<div class="story-order"><aside class="order-instructions"><p class="eyebrow">Votre récit</p><h3>Quel événement vient d'abord&nbsp;?</h3><p>Cliquez les quatre cartes dans l'ordre.</p><p class="feedback" id="order-feedback">Commencez par le début de l'évaporation.</p></aside><div class="order-board">${cards.map(([key, label]) => `<button class="order-card" type="button" data-order="${key}"><span class="order-number">?</span><span>${label}</span></button>`).join("")}</div></div>`;
  }

  function buildStepper() {
    $("#stepper").innerHTML = lessons.map((lesson, index) => `<button class="step-button ${lesson.floor === 2 ? "floor-two" : ""}" type="button" data-step="${index}" aria-label="Scène ${index + 1} : ${lesson.short}"><b>${index + 1}</b><span>${lesson.short}</span></button>`).join("");
    $$(".step-button").forEach(button => button.addEventListener("click", () => goTo(Number(button.dataset.step))));
  }

  function startCourse(withNarration) {
    stopSpeech(false);
    current = 0;
    furthest = 0;
    narratedMode = withNarration;
    measurementAnswers = {};
    orderPosition = 0;
    completedActivities.clear();
    landing.hidden = true;
    summary.hidden = true;
    course.hidden = false;
    document.body.className = "course-running";
    renderLesson(true);
  }

  function goTo(index) {
    const bounded = Math.max(0, Math.min(lessons.length - 1, index));
    stopSpeech(false);
    current = bounded;
    furthest = Math.max(furthest, current);
    renderLesson(true);
  }

  function renderLesson(allowNarration) {
    const lesson = lessons[current];
    lessonKicker.textContent = lesson.kicker;
    lessonTitle.textContent = lesson.title;
    lessonText.textContent = lesson.text;
    transcript.innerHTML = lesson.voiceSteps.map(step => `<li>${escapeHtml(step.text)}</li>`).join("");
    zone.innerHTML = lesson.render();
    wireCurrentActivity();
    setSceneState(narratedMode ? 0 : "all");

    $$(".step-button").forEach((button, index) => {
      button.classList.toggle("active", index === current);
      button.classList.toggle("done", index < current || completedActivities.has(index));
      if (index === current) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });

    previousButton.disabled = current === 0;
    nextButton.textContent = current === lessons.length - 1 ? "Voir le bilan →" : "Continuer →";
    nextButton.disabled = Boolean(lesson.pauseForActivity && !completedActivities.has(current));
    updateVoiceControls();
    updateStatus();

    if (allowNarration && narratedMode) {
      navigationTimer = window.setTimeout(speakLesson, 380);
    }
  }

  function wireCurrentActivity() {
    if (current === 11) wireMeasurement();
    if (current === 12) wireStoryOrder();
  }

  function wireMeasurement() {
    $$(".choice", zone).forEach(button => {
      button.addEventListener("click", () => {
        const caseName = button.dataset.case;
        const correctAnswer = caseName === "superheat" ? "dew" : "bubble";
        const isCorrect = button.dataset.answer === correctAnswer;
        const feedback = $(`#feedback-${caseName}`, zone);
        $$(`.choice[data-case="${caseName}"]`, zone).forEach(choice => choice.classList.remove("wrong"));
        if (isCorrect) {
          measurementAnswers[caseName] = true;
          button.classList.add("correct");
          $$(`.choice[data-case="${caseName}"]`, zone).forEach(choice => { choice.disabled = true; });
          feedback.className = "feedback success";
          feedback.textContent = caseName === "superheat" ? "Correct · La vapeur seule se situe après la rosée : la référence est T rosée." : "Correct · Le liquide seul se situe après la bulle : la référence est T bulle.";
        } else {
          button.classList.add("wrong");
          feedback.className = "feedback error";
          feedback.textContent = caseName === "superheat" ? "Pas encore · Cherchez la limite où la dernière goutte a disparu." : "Pas encore · Cherchez la limite où la dernière bulle a disparu.";
        }
        if (measurementAnswers.superheat && measurementAnswers.subcool) completeActivity(11, "Les deux références sont justes. Le récit reprend.");
      });
    });
  }

  function wireStoryOrder() {
    const expected = ["bubble", "composition", "glide", "dew"];
    $$(".order-card", zone).forEach(button => {
      button.addEventListener("click", () => {
        if (button.classList.contains("selected")) return;
        const feedback = $("#order-feedback", zone);
        if (button.dataset.order === expected[orderPosition]) {
          orderPosition += 1;
          button.classList.add("selected");
          button.querySelector(".order-number").textContent = String(orderPosition);
          feedback.className = "feedback success";
          feedback.textContent = orderPosition < 4 ? `Oui. Cherchez maintenant l'étape ${orderPosition + 1}.` : "Histoire complète : bulle, composition qui évolue, température qui glisse, rosée.";
          if (orderPosition === 4) completeActivity(12, "Vous avez raconté le phénomène, pas seulement récité les mots.");
        } else {
          button.classList.add("wrong");
          feedback.className = "feedback error";
          feedback.textContent = orderPosition === 0 ? "Cette carte ne commence pas l'histoire. Cherchez la première bulle." : "Cette étape viendra, mais pas encore. Suivez ce qui se transforme progressivement.";
          window.setTimeout(() => button.classList.remove("wrong"), 700);
        }
      });
    });
  }

  function completeActivity(index, message) {
    if (completedActivities.has(index)) return;
    completedActivities.add(index);
    nextButton.disabled = false;
    status.textContent = message;
    const step = $(`.step-button[data-step="${index}"]`);
    if (step) step.classList.add("done");
    if (narratedMode) {
      autoProgress.classList.remove("running");
      void autoProgress.offsetWidth;
      autoProgress.classList.add("running");
      autoTimer = window.setTimeout(() => {
        if (index === lessons.length - 1) showSummary(true);
        else goTo(index + 1);
      }, 1050);
    }
  }

  function setSceneState(state) {
    const scene = $(".scene", zone);
    if (scene) scene.dataset.sceneState = String(state ?? 0);
  }

  function chooseVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return selectedVoice;
    const quality = /(natural|naturel|neural|online|google|microsoft|denise|henri|julie|paul|hortense)/i;
    const scored = voices.map(voice => {
      let score = 0;
      const language = String(voice.lang || "").toLowerCase();
      if (language === "fr-fr") score += 100;
      else if (language.startsWith("fr")) score += 60;
      if (quality.test(voice.name)) score += 20;
      if (voice.default) score += 2;
      return { voice, score };
    }).sort((a, b) => b.score - a.score);
    selectedVoice = scored[0]?.score > 0 ? scored[0].voice : voices[0] || null;
    return selectedVoice;
  }

  function speakLesson() {
    const lesson = lessons[current];
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      narratedMode = false;
      status.textContent = "Voix indisponible. Le texte complet reste visible.";
      updateVoiceControls();
      return;
    }

    stopSpeech(false);
    narratedMode = true;
    const run = ++speechRun;
    const steps = lesson.voiceSteps;
    let part = 0;

    function speakNext() {
      if (run !== speechRun || !narratedMode) return;
      if (part >= steps.length) {
        speaking = false;
        paused = false;
        setSceneState("all");
        updateVoiceControls();
        if (lesson.pauseForActivity) {
          storyState.dataset.state = "pause";
          storyState.textContent = "Mode raconté · vous attend";
          status.textContent = "À vous d'agir · le récit reprendra ensuite";
          return;
        }
        scheduleAutomaticNext(run);
        return;
      }

      const step = steps[part++];
      setSceneState(step.state);
      const utterance = new SpeechSynthesisUtterance(step.text);
      utterance.lang = "fr-FR";
      utterance.rate = Number(voiceRate.value) || .95;
      utterance.pitch = 1;
      const voice = chooseVoice();
      if (voice) utterance.voice = voice;
      utterance.onstart = () => {
        if (run !== speechRun) return;
        speaking = true;
        paused = false;
        updateVoiceControls();
        status.textContent = `Scène ${current + 1} sur ${lessons.length} · récit en cours`;
      };
      utterance.onend = () => {
        if (run !== speechRun) return;
        speakNext();
      };
      utterance.onerror = event => {
        if (run !== speechRun || event.error === "canceled" || event.error === "interrupted") return;
        status.textContent = "La voix a rencontré un problème. Le texte reste disponible.";
        speakNext();
      };
      window.speechSynthesis.speak(utterance);
    }

    speakNext();
  }

  function scheduleAutomaticNext(run) {
    if (run !== speechRun || !narratedMode) return;
    status.textContent = current === lessons.length - 1 ? "Le bilan va s'ouvrir" : "La scène suivante va démarrer";
    autoProgress.classList.remove("running");
    void autoProgress.offsetWidth;
    autoProgress.classList.add("running");
    autoTimer = window.setTimeout(() => {
      if (run !== speechRun || !narratedMode) return;
      if (current === lessons.length - 1) showSummary(true);
      else goTo(current + 1);
    }, 1050);
  }

  function stopSpeech(disableNarration = true) {
    speechRun += 1;
    window.clearTimeout(navigationTimer);
    window.clearTimeout(autoTimer);
    navigationTimer = 0;
    autoTimer = 0;
    autoProgress.classList.remove("running");
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    speaking = false;
    paused = false;
    if (disableNarration) narratedMode = false;
    updateVoiceControls();
  }

  function toggleListening() {
    if (!("speechSynthesis" in window)) {
      status.textContent = "La synthèse vocale n'est pas disponible sur ce navigateur.";
      return;
    }
    if (speaking && !paused) {
      window.speechSynthesis.pause();
      paused = true;
      storyState.dataset.state = "pause";
      storyState.textContent = "Mode raconté · en pause";
      updateVoiceControls();
      return;
    }
    if (paused) {
      window.speechSynthesis.resume();
      paused = false;
      updateVoiceControls();
      return;
    }
    narratedMode = true;
    speakLesson();
  }

  function updateVoiceControls() {
    if (!listenButton) return;
    if (paused) {
      listenButton.innerHTML = '<span aria-hidden="true">▶</span><b>Reprendre</b>';
      listenButton.setAttribute("aria-label", "Reprendre le récit");
      listenButton.setAttribute("aria-pressed", "true");
    } else if (speaking) {
      listenButton.innerHTML = '<span aria-hidden="true">Ⅱ</span><b>Pause</b>';
      listenButton.setAttribute("aria-label", "Mettre le récit en pause");
      listenButton.setAttribute("aria-pressed", "true");
    } else {
      listenButton.innerHTML = '<span aria-hidden="true">▶</span><b>Écouter et enchaîner</b>';
      listenButton.setAttribute("aria-label", "Écouter et enchaîner");
      listenButton.setAttribute("aria-pressed", narratedMode ? "true" : "false");
    }

    if (narratedMode) {
      storyState.dataset.state = paused ? "pause" : "on";
      storyState.textContent = paused ? "Mode raconté · en pause" : lessons[current]?.pauseForActivity && !speaking ? "Mode raconté · vous attend" : "Mode raconté · actif";
    } else {
      storyState.dataset.state = "off";
      storyState.textContent = "Mode raconté · arrêté";
    }
  }

  function updateStatus() {
    const lesson = lessons[current];
    if (lesson.pauseForActivity && !completedActivities.has(current)) status.textContent = `Scène ${current + 1} sur ${lessons.length} · activité à réaliser`;
    else status.textContent = `Scène ${current + 1} sur ${lessons.length} · étage ${lesson.floor}`;
  }

  function showSummary(withNarration = false) {
    stopSpeech(false);
    course.hidden = true;
    landing.hidden = true;
    summary.hidden = false;
    document.body.className = "summary-running";
    if (withNarration && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
      narratedMode = true;
      const finalText = "Vous pouvez maintenant raconter l'histoire. Un zéotrope est un mélange dont la composition du liquide et de la vapeur diffère pendant le changement d'état : sa température glisse entre bulle et rosée. Un azéotrope est un mélange qui, à sa condition azéotropique, change d'état ensemble comme un fluide pur : pas de glissement. Le glissement est l'écart entre la température de rosée et la température de bulle à la même pression.";
      const utterance = new SpeechSynthesisUtterance(finalText);
      utterance.lang = "fr-FR";
      utterance.rate = Number(voiceRate.value) || .95;
      const voice = chooseVoice();
      if (voice) utterance.voice = voice;
      const run = ++speechRun;
      utterance.onend = () => { if (run === speechRun) narratedMode = false; };
      window.speechSynthesis.speak(utterance);
    }
  }

  function exitToLanding() {
    stopSpeech(true);
    course.hidden = true;
    summary.hidden = true;
    landing.hidden = false;
    document.body.className = "";
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
  }

  $("#start-narrated").addEventListener("click", () => startCourse(true));
  $("#start-silent").addEventListener("click", () => startCourse(false));
  $("#exit-course").addEventListener("click", exitToLanding);
  $("#summary-exit").addEventListener("click", exitToLanding);
  $("#restart").addEventListener("click", () => startCourse(true));
  $("#review-logph").addEventListener("click", () => {
    landing.hidden = true;
    summary.hidden = true;
    course.hidden = false;
    document.body.className = "course-running";
    narratedMode = false;
    current = 10;
    furthest = Math.max(furthest, current);
    renderLesson(false);
  });
  listenButton.addEventListener("click", toggleListening);
  stopVoiceButton.addEventListener("click", () => {
    stopSpeech(true);
    status.textContent = "Récit arrêté · navigation manuelle disponible";
  });
  previousButton.addEventListener("click", () => goTo(current - 1));
  nextButton.addEventListener("click", () => {
    if (lessons[current].pauseForActivity && !completedActivities.has(current)) return;
    if (current === lessons.length - 1) showSummary(narratedMode);
    else goTo(current + 1);
  });
  voiceRate.addEventListener("change", () => {
    if (speaking || paused) {
      stopSpeech(false);
      narratedMode = true;
      navigationTimer = window.setTimeout(speakLesson, 180);
    }
  });

  document.addEventListener("keydown", event => {
    const tag = document.activeElement?.tagName;
    if (["BUTTON", "SELECT", "INPUT", "TEXTAREA", "SUMMARY"].includes(tag)) return;
    if (event.key === "ArrowRight" && !course.hidden && !nextButton.disabled) nextButton.click();
    if (event.key === "ArrowLeft" && !course.hidden && !previousButton.disabled) previousButton.click();
    if (event.key === " " && !course.hidden) {
      event.preventDefault();
      toggleListening();
    }
    if (event.key === "Escape") exitToLanding();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopSpeech(true);
  });
  window.addEventListener("beforeunload", () => stopSpeech(true));
  if ("speechSynthesis" in window) {
    chooseVoice();
    window.speechSynthesis.addEventListener?.("voiceschanged", chooseVoice);
  }

  buildStepper();
})();
