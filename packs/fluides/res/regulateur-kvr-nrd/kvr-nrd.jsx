/* KVR + NRD — régulation de la pression de condensation par temps froid
   Fond clair. Deux jeux de symboles : « Dessins » et « Symboles normalisés ». */

const { CompositionStage, useComposition, Captions, Easing, interpolate, animate, clamp } = window;
const { useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakRadio } = window;

/* ── palette (fond clair — jamais de mode sombre) ──────────────────────────
   Les NEUTRES sont ceux de la charte inerWeb (CHARTE-GRAPHIQUE.md) : la page
   qui accueille l'animation est en --cream, le blanc pur est proscrit au
   profit du blanc cassé chaud --paper. Les couleurs de FLUIDE en dessous
   (hot, liq, cold, wet) ne sont pas de la décoration : elles portent la
   lecture du circuit et restent telles qu'elles ont été validées. */
const C = {
  bg: '#F7F1E7',
  paper: '#FFFDF8',
  grid: '#E5DFD3',
  ink: '#10233C',
  text: '#10233C',
  dim: '#637285',
  edge: '#CBD3D9',
  hot: '#C33F22',
  liq: '#D08606',
  cold: '#1E6FAF',
  wet: '#5AA6D8',
  ok: '#1E7E54',
  bad: '#C33F22',
  metal: '#8A97A2',
};
const SANS = "'IBM Plex Sans', system-ui, sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, monospace";

/* ── trois helpers de mouvement ────────────────────────────────────────── */
const MOTION = {
  enter: (start, dur) => animate({ from: 0, to: 1, start, end: start + (dur || 0.7), ease: Easing.easeOutCubic }),
  draw: (start, end) => animate({ from: 0, to: 1, start, end, ease: Easing.easeInOutCubic }),
  pop: (start, dur) => animate({ from: 0, to: 1, start, end: start + (dur || 0.6), ease: Easing.easeOutBack }),
};

/* ── géométrie (monde 1920 × 1080) ─────────────────────────────────────── */
const G = {
  comp: { x: 180, y: 600, w: 180, h: 130 },
  cond: { x: 700, y: 140, w: 420, h: 140 },
  recv: { x: 1330, y: 430, w: 140, h: 190 },
  evap: { x: 430, y: 810, w: 330, h: 120 },
  kvr: { x: 1400, y: 310 },
  nrd: { x: 1050, y: 55 },
  drier: { x: 1280, y: 870 },
  glass: { x: 1150, y: 870 },
  sol: { x: 1020, y: 870 },
  txv: { x: 880, y: 870 },
  bulb: { x: 360, y: 870 },
  fan: { x: 1050, y: 210, r: 46 },
};
const P = {
  disch: 'M270 600 L270 210 L700 210',
  condOut: 'M1120 210 L1400 210 L1400 430',
  bypass: 'M470 210 L470 55 L1600 55 L1600 525 L1470 525',
  liquid: 'M1400 620 L1400 870 L760 870',
  suction: 'M430 870 L270 870 L270 730',
  capil: 'M898 806 C 850 690, 520 686, 366 840',
};

/* ── fluides ───────────────────────────────────────────────────────────── */
const FLUIDS = {
  R404A: { normal: 15.0, low: 6.0, mini: 12.0, bp: 4.3, dpMin: 5.0,
    tc: [[2, -25], [4.3, -10], [6, 0], [8, 10], [12, 25], [15, 33], [18, 40]] },
  R134a: { normal: 10.2, low: 3.4, mini: 7.8, bp: 2.1, dpMin: 3.5,
    tc: [[0.6, -15], [2.1, 0], [3.4, 8], [5.7, 20], [7.8, 30], [10.2, 40], [12, 46]] },
  R290: { normal: 12.5, low: 4.9, mini: 9.9, bp: 3.4, dpMin: 4.0,
    tc: [[1.9, -20], [3.4, -8], [4.9, 2], [7, 15], [9.9, 27], [12.5, 35], [15, 43]] },
};
const tcOf = (F, p) => interpolate(F.tc.map((r) => r[0]), F.tc.map((r) => r[1]))(p);
const fr = (v, d) => v.toFixed(d == null ? 1 : d).replace('.', ',');
const degC = (v) => (v < 0 ? '−' + fr(-v, 0) : fr(v, 0)) + ' °C';

/* ── tuyauteries ───────────────────────────────────────────────────────── */
/* qual : 1 = liquide franc (pointillés serrés) · 0 = flash-gaz (pointillés très espacés) */
function Line({ d, c, phase, w, qual, progress, opacity }) {
  const width = w || 10;
  const q = qual == null ? 1 : clamp(qual, 0, 1);
  const on = 6 + 16 * q;
  const pr = progress == null ? 1 : progress;
  const clipDash = pr < 1 ? { pathLength: 1, strokeDasharray: '1 1', strokeDashoffset: 1 - pr } : {};
  return (
    <g opacity={opacity == null ? 1 : opacity}>
      <path d={d} fill="none" stroke={C.bg} strokeWidth={width + 12} strokeLinecap="round" strokeLinejoin="round" {...clipDash} />
      <path d={d} fill="none" stroke={c} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" opacity={0.2} {...clipDash} />
      {pr >= 1 ? (
        <path d={d} fill="none" stroke={c} strokeWidth={width} strokeLinecap="butt"
          strokeDasharray={on + ' ' + (44 - on)} strokeDashoffset={-phase} />
      ) : null}
    </g>
  );
}

function Tag({ x, y, title, sub, o, anchor, accent, w }) {
  if (o <= 0.01) return null;
  const a = anchor || 'start';
  const W = w || Math.round(Math.max(String(title).length * 16.6, String(sub || '').length * 13.2)) + 48;
  const x0 = a === 'end' ? -W : 0;
  return (
    <g opacity={o} transform={'translate(' + x + ',' + (y + (1 - o) * 14) + ')'}>
      <rect x={x0 + 3} y={-43} width={W} height={sub ? 92 : 56} rx={10} fill="rgba(34,48,59,0.14)" />
      <rect x={x0} y={-46} width={W} height={sub ? 92 : 56} rx={10} fill={C.paper} stroke={accent || C.edge} strokeWidth={2.5} />
      <rect x={x0} y={-46} width={6} height={sub ? 92 : 56} fill={accent || C.dim} />
      <text x={x0 + 22} y={-14} fill={C.ink} style={{ font: '600 30px ' + SANS }}>{title}</text>
      {sub ? <text x={x0 + 22} y={24} fill={C.dim} style={{ font: '400 25px ' + SANS }}>{sub}</text> : null}
    </g>
  );
}

/* phase de défilement : la vitesse varie, la phase doit rester continue */
function phaseOf(T, speedFn, k) {
  let s = 0;
  const dt = 0.1;
  for (let t = 0; t < T; t += dt) s += speedFn(t) * dt;
  return s * (k || 90);
}

/* ══ SYMBOLES NORMALISÉS (centrés sur l'origine, boîte 60) ═════════════ */
const S = {
  compressor: (k) => (
    <g>
      <circle r="30" fill={C.paper} stroke={k} strokeWidth="3.5" />
      <path d="M-11 -16 L17 0 L-11 16 Z" fill={k} />
    </g>
  ),
  exchanger: (k, dir) => (
    <g>
      <rect x="-32" y="-21" width="64" height="42" fill={C.paper} stroke={k} strokeWidth="3.5" />
      <path d="M-24 -21 L-8 21 M-8 -21 L8 21 M8 -21 L24 21" stroke={k} strokeWidth="3" fill="none" />
      {[-16, 16].map((x) => (
        <path key={x} d={dir > 0 ? 'M' + x + ' -40 L' + x + ' -25 M' + (x - 6) + ' -33 L' + x + ' -25 L' + (x + 6) + ' -33'
          : 'M' + x + ' -40 L' + x + ' -25 M' + (x - 6) + ' -32 L' + x + ' -40 L' + (x + 6) + ' -32'}
          stroke={k} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </g>
  ),
  receiver: (k) => (
    <g>
      <rect x="-20" y="-28" width="40" height="56" rx="18" fill={C.paper} stroke={k} strokeWidth="3.5" />
      <line x1="-20" y1="8" x2="20" y2="8" stroke={k} strokeWidth="3" />
    </g>
  ),
  drier: (k) => (
    <g>
      <rect x="-28" y="-14" width="56" height="28" fill={C.paper} stroke={k} strokeWidth="3.5" />
      <path d="M-16 -14 L-28 14 M-2 -14 L-14 14 M12 -14 L0 14 M26 -14 L14 14" stroke={k} strokeWidth="2.6" />
    </g>
  ),
  glass: (k) => (
    <g>
      <circle r="19" fill={C.paper} stroke={k} strokeWidth="3.5" />
      <circle r="7" fill={k} />
    </g>
  ),
  valveBody: (k, fill) => (
    <path d="M-22 -19 L-22 19 L0 0 L22 19 L22 -19 L0 0 Z" fill={fill || C.paper} stroke={k} strokeWidth="3.5" strokeLinejoin="round" />
  ),
  solenoid: (k, live) => (
    <g>
      {S.valveBody(k, live ? 'rgba(208,134,6,0.22)' : C.paper)}
      <line x1="0" y1="0" x2="0" y2="-26" stroke={k} strokeWidth="3.5" />
      <rect x="-17" y="-42" width="34" height="18" fill={live ? 'rgba(208,134,6,0.25)' : C.paper} stroke={k} strokeWidth="3" />
      <path d="M-11 -42 L-3 -24 M-1 -42 L7 -24" stroke={k} strokeWidth="2.6" />
    </g>
  ),
  txv: (k) => (
    <g>
      {S.valveBody(k)}
      <line x1="0" y1="0" x2="0" y2="-26" stroke={k} strokeWidth="3.5" />
      <path d="M-20 -46 L20 -24" stroke={k} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M8 -26 L20 -24 L15 -35" fill={k} />
    </g>
  ),
  kvr: (k) => (
    <g>
      {S.valveBody(k)}
      <line x1="0" y1="0" x2="0" y2="-24" stroke={k} strokeWidth="3.5" />
      <path d="M-12 -24 q 12 -6 24 0 q -24 -6 0 -12 q 24 -6 0 -12" fill="none" stroke={k} strokeWidth="3" />
      <line x1="-14" y1="-52" x2="14" y2="-52" stroke={k} strokeWidth="3.5" />
    </g>
  ),
  nrd: (k, open) => (
    <g>
      <circle r="28" fill={C.paper} stroke={k} strokeWidth="3.5" />
      <path d="M-20 -16 L-20 16 L8 0 Z" fill={k} opacity={0.25 + 0.5 * (open || 0)} stroke={k} strokeWidth="2.5" strokeLinejoin="round" />
      <line x1={8 + 8 * (open || 0)} y1="-17" x2={8 + 8 * (open || 0)} y2="17" stroke={k} strokeWidth="4" strokeLinecap="round" />
      <path d="M17 -18 q 9 5 0 9 q -9 5 0 9 q 9 5 0 9" fill="none" stroke={k} strokeWidth="2.6" />
    </g>
  ),
  bulb: (k) => (
    <g>
      <rect x="-20" y="-9" width="40" height="18" rx="9" fill={C.paper} stroke={k} strokeWidth="3.5" />
      <line x1="-8" y1="-9" x2="-8" y2="9" stroke={k} strokeWidth="2.4" />
      <line x1="8" y1="-9" x2="8" y2="9" stroke={k} strokeWidth="2.4" />
    </g>
  ),
  fan: (k, a) => (
    <g>
      <circle r="24" fill={C.paper} stroke={k} strokeWidth="3.5" />
      <g transform={'rotate(' + a + ')'}>
        {[0, 120, 240].map((r) => (
          <path key={r} transform={'rotate(' + r + ')'} d="M0 0 Q 12 -6 20 4 Q 9 8 0 0" fill={k} opacity="0.8" />
        ))}
      </g>
      <circle r="4" fill={k} />
    </g>
  ),
};

/* ══ LE FILM ═══════════════════════════════════════════════════════════ */
function Piece(props) {
  const comp = useComposition();
  const T = comp.T;
  const CUES = comp.CUES;
  const total = comp.authoredTotal;
  const tw = props.tweaks || {};
  const norm = String(tw.schema || '').indexOf('ormalis') >= 0;
  const F = FLUIDS[tw.fluide] || FLUIDS.R404A;
  const k = C.ink;

  /* ── relevés ── */
  const text = interpolate([CUES.Froid + 0.4, CUES.Froid + 4.5], [22, -5], Easing.easeInOutCubic)(T);
  const pRes0 = F.low * 0.87;
  const pResEnd = F.mini - 1.4;
  const hp = interpolate(
    [CUES.Froid + 1.8, CUES.Effondrement + 2.5, CUES.Noyage + 1.2, CUES.Noyage + 5.5],
    [F.normal, F.low, F.low, F.mini],
    [Easing.easeInQuad, Easing.easeOutCubic, Easing.linear, Easing.easeOutCubic])(T);
  const pres = interpolate(
    [CUES.Froid + 1.8, CUES.Effondrement + 2.5, CUES.Noyage + 1.2, CUES.Noyage + 6, CUES.NRD + 4.2, CUES.NRD + 8],
    [F.normal, F.low, F.low, pRes0, pRes0, pResEnd],
    [Easing.easeInQuad, Easing.easeOutCubic, Easing.linear, Easing.linear, Easing.easeOutCubic])(T);
  const bp = interpolate(
    [CUES.Froid + 2.2, CUES.Effondrement + 3, CUES.NRD + 5, CUES.Regime + 0.5],
    [F.bp, F.bp * 0.7, F.bp * 0.7, F.bp],
    [Easing.easeInQuad, Easing.easeOutCubic, Easing.easeInOutCubic])(T);
  const dp = pres - bp;
  const dpOk = dp >= F.dpMin;

  /* ── débits / qualité du liquide ── */
  const liqSpeed = (t) => interpolate(
    [CUES.Froid + 2, CUES.Effondrement + 3, CUES.NRD + 5, CUES.Regime],
    [1, 0.1, 0.1, 1], Easing.easeInOutCubic)(t);
  const nrdSpeed = (t) => interpolate([CUES.NRD + 3.6, CUES.NRD + 5.6], [0, 1], Easing.easeOutCubic)(t);
  const qual = clamp(liqSpeed(T), 0, 1);
  const phHot = phaseOf(T, () => 1);
  const phLiq = phaseOf(T, liqSpeed);
  const phNrd = phaseOf(T, nrdSpeed);

  /* ── états des organes ── */
  const flood = interpolate([CUES.Noyage + 1, CUES.Noyage + 6], [0, 0.62], Easing.easeInOutCubic)(T);
  const recvLvl = interpolate(
    [CUES.Effondrement, CUES.Noyage + 1, CUES.Noyage + 6.5, CUES.NRD + 5, CUES.NRD + 9],
    [0.55, 0.5, 0.2, 0.2, 0.34], Easing.easeInOutCubic)(T);
  const kvrClose = interpolate([CUES.Noyage + 0.8, CUES.Noyage + 5], [0, 1], Easing.easeInOutCubic)(T);
  const nrdOpen = interpolate([CUES.NRD + 3.4, CUES.NRD + 5], [0, 1], Easing.easeOutBack)(T);
  const kvrIn = MOTION.pop(CUES.KVR + 0.7, 0.8)(T);
  const bypassDraw = MOTION.draw(CUES.NRD + 0.4, CUES.NRD + 2.6)(T);
  const nrdIn = MOTION.pop(CUES.NRD + 2.2, 0.8)(T);
  const fanA = T * 190;
  const crank = T * 400;

  /* ── caméra ── */
  const K = [
    [0, 1110, 520, 0.86], [CUES.Froid - 0.6, 1110, 520, 0.9],
    [CUES.Froid + 1.6, 910, 250, 1.36], [CUES.Effondrement + 0.6, 905, 265, 1.44],
    [CUES.Effondrement + 4.2, 880, 830, 1.5], [CUES.KVR - 0.2, 890, 840, 1.56],
    [CUES.KVR + 1, 1560, 420, 1.3], [CUES.Noyage + 0.8, 910, 235, 1.46],
    [CUES.Reservoir - 0.2, 915, 245, 1.56], [CUES.Reservoir + 0.9, 1400, 505, 1.78],
    [CUES.NRD + 0.6, 1010, 290, 1.18], [CUES.NRD + 5, 1060, 170, 1.6],
    [CUES.NRD + 9, 1440, 400, 1.45], [CUES.Regime + 1, 1110, 520, 0.87],
    [CUES.Recap, 1110, 520, 0.9], [total, 1110, 520, 0.86],
  ];
  const camX = interpolate(K.map((a) => a[0]), K.map((a) => a[1]), Easing.easeInOutCubic)(T);
  const camY = interpolate(K.map((a) => a[0]), K.map((a) => a[2]), Easing.easeInOutCubic)(T);
  const camS = interpolate(K.map((a) => a[0]), K.map((a) => a[3]), Easing.easeInOutCubic)(T);
  const cam = 'translate(' + (960 - camX * camS) + ',' + (540 - camY * camS) + ') scale(' + camS + ')';

  /* Le carton d'ouverture tenait l'écran de 0,5 à 8,6 s, c'est-à-dire presque
     toute la première scène : on ne voyait pas le circuit se mettre en place,
     et on ne comprenait pas ce qui se passait derrière (retour F. Henninot du
     20/08). Il annonce, puis il s'efface — 4,8 s au lieu de 8,6. */
  const titleO = interpolate([0.4, 1.2, 4.0, 4.8], [0, 1, 1, 0])(T)
    * interpolate([total - 1.4, total - 0.2], [1, 0])(T);
  const hudO0 = interpolate([1.4, 2.6, CUES.Recap + 0.2, CUES.Recap + 1.2], [0, 1, 1, 0])(T);
  const recapO = interpolate([CUES.Recap + 0.4, CUES.Recap + 1.4, total - 1.4, total - 0.5], [0, 1, 1, 0])(T);
  const schemaDim = interpolate([CUES.Recap + 0.4, CUES.Recap + 1.4], [1, 0.22], Easing.easeInOutCubic)(T)
    * interpolate([total - 1.4, total - 0.4], [1, 1 / 0.22])(T);
  const legendO = norm
    ? clamp(interpolate([1.8, 3.0, CUES.Froid - 1.0, CUES.Froid - 0.2], [0, 1, 1, 0])(T)
      + interpolate([CUES.Regime + 1.4, CUES.Regime + 2.4, CUES.Recap - 0.4, CUES.Recap + 0.2], [0, 1, 1, 0])(T), 0, 1)
    : 0;
  const zoneO = norm ? interpolate([CUES.Regime + 1.2, CUES.Regime + 2.2, CUES.Recap - 0.4, CUES.Recap], [0, 1, 1, 0])(T) : 0;

  const cd = G.cond, rc = G.recv, ev = G.evap, cp = G.comp;
  const floodY = cd.y + cd.h - cd.h * flood;
  const rcLvlY = rc.y + rc.h - rc.h * recvLvl;

  /* piston (cinématique bielle-manivelle, x local 90) */
  const A = crank * Math.PI / 180;
  const rC = 18, rod = 54;
  const pinY = 95 - rC * Math.cos(A);
  const pistY = pinY - Math.sqrt(Math.max(1, rod * rod - Math.pow(rC * Math.sin(A), 2)));

  return (
    <div data-screen-label={'t=' + T.toFixed(0) + 's'}
      style={{ position: 'absolute', inset: 0, background: C.bg, overflow: 'hidden', fontFamily: SANS }}>

      <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '15%', width: '100%', height: '85%' }}>
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0H0V60" fill="none" stroke={C.grid} strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="1920" height="1080" fill={C.bg} />
        <rect x="0" y="0" width="1920" height="1080" fill="url(#grid)" />

        <g transform={cam} opacity={schemaDim}>
          {/* ── zones HP / BP (version normalisée) ── */}
          {zoneO > 0.01 ? (
            <g opacity={zoneO}>
              <path d="M120 -30 H1680 V960 H860 V760 H120 Z" fill="rgba(195,63,34,0.05)" stroke={C.hot} strokeWidth="2.5" strokeDasharray="14 12" />
              <rect x="120" y="784" width="720" height="248" rx="10" fill="rgba(30,111,175,0.06)" stroke={C.cold} strokeWidth="2.5" strokeDasharray="14 12" />
              <text x="142" y="-46" fill={C.hot} style={{ font: '600 30px ' + MONO }}>CÔTÉ HAUTE PRESSION — HP</text>
              <text x="142" y="1012" fill={C.cold} style={{ font: '600 30px ' + MONO }}>CÔTÉ BASSE PRESSION — BP</text>
            </g>
          ) : null}

          {/* ── tuyauteries ── */}
          <Line d={P.disch} c={C.hot} phase={phHot} />
          <Line d={P.condOut} c={C.liq} phase={phLiq} qual={qual} />
          <Line d={P.liquid} c={C.liq} phase={phLiq} qual={qual} />
          <Line d={P.suction} c={C.cold} phase={phLiq} w={12} />
          <Line d={P.bypass} c={C.hot} phase={phNrd} progress={bypassDraw} opacity={bypassDraw > 0 ? 1 : 0} />

          {/* ── air extérieur ── */}
          <g>
            {[770, 850, 930].map((x, i) => (
              <g key={i} opacity={interpolate([CUES.Froid + 0.5, CUES.Froid + 2], [0.5, 1])(T)}>
                <path d={'M' + x + ' 352 L' + x + ' 298'} stroke={C.cold} strokeWidth="5"
                  strokeLinecap="round" opacity="0.8" strokeDasharray="14 12" strokeDashoffset={-(T * 60) % 26} />
                <path d={'M' + (x - 10) + ' 308 L' + x + ' 294 L' + (x + 10) + ' 308'}
                  fill="none" stroke={C.cold} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ))}
            <text x={cd.x - 28} y={cd.y + 112} textAnchor="end" fill={C.dim} style={{ font: '500 27px ' + SANS }}>
              air extérieur <tspan fill={text < 5 ? C.cold : C.dim} style={{ font: '600 30px ' + MONO }}>{degC(text)}</tspan>
            </text>
          </g>

          {/* ── CONDENSEUR ── */}
          <g>
            <clipPath id="condClip"><rect x={cd.x} y={cd.y} width={cd.w} height={cd.h} rx="8" /></clipPath>
            <rect x={cd.x} y={cd.y} width={cd.w} height={cd.h} rx="8" fill={C.paper} stroke={k} strokeWidth="3.5" />
            <g clipPath="url(#condClip)">
              {norm ? (
                <path d={'M' + cd.x + ' ' + (cd.y + 20) + ' ' + [0, 1, 2, 3, 4, 5].map((i) =>
                  'L' + (cd.x + 40 + i * 68) + ' ' + (cd.y + (i % 2 ? 20 : cd.h - 20))).join(' ') + ' L' + (cd.x + cd.w) + ' ' + (cd.y + 20)}
                  fill="none" stroke={k} strokeWidth="4" />
              ) : (
                <g>
                  {Array.from({ length: 27 }).map((_, i) => (
                    <line key={i} x1={cd.x + 8 + i * 15.4} y1={cd.y + 4} x2={cd.x + 8 + i * 15.4} y2={cd.y + cd.h - 4}
                      stroke={C.metal} strokeWidth="2" opacity="0.75" />
                  ))}
                  {[42, 82, 122].map((yy) => (
                    <line key={yy} x1={cd.x} y1={cd.y + yy - 20} x2={cd.x + cd.w} y2={cd.y + yy - 20} stroke={C.metal} strokeWidth="5" opacity="0.9" />
                  ))}
                </g>
              )}
              {flood > 0.01 ? (
                <g>
                  <rect x={cd.x} y={floodY} width={cd.w} height={cd.h * flood} fill={C.liq} opacity="0.28" />
                  <line x1={cd.x} y1={floodY} x2={cd.x + cd.w} y2={floodY} stroke={C.liq} strokeWidth="5" />
                </g>
              ) : null}
              <g transform={'translate(' + G.fan.x + ',' + G.fan.y + ')'}>
                {norm ? S.fan(k, fanA) : (
                  <g>
                    <circle r={G.fan.r} fill={C.paper} stroke={k} strokeWidth="3.5" />
                    <g transform={'rotate(' + fanA + ')'}>
                      {[0, 120, 240].map((a) => (
                        <path key={a} transform={'rotate(' + a + ')'} d="M0 0 Q 24 -11 40 6 Q 19 13 0 0" fill={C.metal} opacity="0.9" />
                      ))}
                    </g>
                    <circle r="8" fill={k} />
                  </g>
                )}
              </g>
            </g>
            <text x={cd.x} y={cd.y - 20} fill={C.ink} style={{ font: '600 30px ' + SANS }}>CONDENSEUR À AIR</text>
          </g>

          {/* ── COMPRESSEUR ── */}
          <g>
            {norm ? (
              <g transform={'translate(' + (cp.x + 90) + ',' + (cp.y + 65) + ')'}>{S.compressor(k)}</g>
            ) : (
              <g transform={'translate(' + cp.x + ',' + cp.y + ')'}>
                <rect x="0" y="0" width={cp.w} height={cp.h} rx="14" fill={C.paper} stroke={k} strokeWidth="3.5" />
                <rect x="62" y="4" width="56" height="20" rx="6" fill={C.paper} stroke={k} strokeWidth="3" />
                <rect x="66" y="24" width="48" height="58" fill="none" stroke={C.metal} strokeWidth="3" />
                <rect x="68" y={clamp(pistY - 12, 26, 62)} width="44" height="22" rx="3" fill={C.metal} opacity="0.55" stroke={k} strokeWidth="2.5" />
                <line x1="90" y1={clamp(pistY, 38, 74)} x2={90 + rC * Math.sin(A)} y2={95 - rC * Math.cos(A)} stroke={k} strokeWidth="4" />
                <circle cx="90" cy="95" r={rC} fill="none" stroke={C.metal} strokeWidth="3" />
                <circle cx={90 + rC * Math.sin(A)} cy={95 - rC * Math.cos(A)} r="5" fill={k} />
                <circle cx="90" cy="95" r="4" fill={k} />
                <path d="M140 34 L162 34 M154 28 L162 34 L154 40" fill="none" stroke={C.hot} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M162 96 L140 96 M148 90 L140 96 L148 102" fill="none" stroke={C.cold} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}
            <text x={cp.x + cp.w + 22} y={cp.y + cp.h + 4} fill={C.dim} style={{ font: '500 27px ' + SANS }}>compresseur</text>
          </g>

          {/* ── RÉSERVOIR ── */}
          <g>
            {norm ? (
              <g transform={'translate(' + (rc.x + rc.w / 2) + ',' + (rc.y + rc.h / 2) + ') scale(2.4)'}>{S.receiver(k)}</g>
            ) : (
              <g>
                <clipPath id="rcClip"><rect x={rc.x} y={rc.y} width={rc.w} height={rc.h} rx="40" /></clipPath>
                <rect x={rc.x} y={rc.y} width={rc.w} height={rc.h} rx="40" fill={C.paper} stroke={k} strokeWidth="3.5" />
                <g clipPath="url(#rcClip)">
                  <rect x={rc.x} y={rcLvlY} width={rc.w} height={rc.h} fill={C.liq} opacity="0.26" />
                  <line x1={rc.x} y1={rcLvlY} x2={rc.x + rc.w} y2={rcLvlY} stroke={C.liq} strokeWidth="5" />
                </g>
                <line x1={rc.x + 24} y1={rc.y + 26} x2={rc.x + rc.w - 24} y2={rc.y + 26} stroke={C.metal} strokeWidth="3" />
              </g>
            )}
            <text x={rc.x + rc.w + 22} y={rc.y + rc.h - 8} fill={C.dim} style={{ font: '500 27px ' + SANS }}>réservoir de liquide</text>
          </g>

          {/* ── ÉVAPORATEUR ── */}
          <g>
            <clipPath id="evClip"><rect x={ev.x} y={ev.y} width={ev.w} height={ev.h} rx="8" /></clipPath>
            <rect x={ev.x} y={ev.y} width={ev.w} height={ev.h} rx="8" fill={C.paper} stroke={k} strokeWidth="3.5" />
            <g clipPath="url(#evClip)">
              {norm ? (
                <path d={'M' + (ev.x + ev.w) + ' ' + (ev.y + 22) + ' ' + [0, 1, 2, 3, 4].map((i) =>
                  'L' + (ev.x + ev.w - 34 - i * 66) + ' ' + (ev.y + (i % 2 ? 22 : ev.h - 22))).join(' ') + ' L' + ev.x + ' ' + (ev.y + 22)}
                  fill="none" stroke={k} strokeWidth="4" />
              ) : (
                <g>
                  {Array.from({ length: 21 }).map((_, i) => (
                    <line key={i} x1={ev.x + 8 + i * 15.6} y1={ev.y + 4} x2={ev.x + 8 + i * 15.6} y2={ev.y + ev.h - 4}
                      stroke={C.metal} strokeWidth="2" opacity="0.75" />
                  ))}
                  {[34, 86].map((yy) => (
                    <line key={yy} x1={ev.x} y1={ev.y + yy} x2={ev.x + ev.w} y2={ev.y + yy} stroke={C.metal} strokeWidth="5" opacity="0.9" />
                  ))}
                </g>
              )}
              <rect x={ev.x} y={ev.y} width={ev.w} height={ev.h} fill={C.wet} opacity={0.04 + 0.16 * qual} />
            </g>
            <text x={ev.x + ev.w / 2} y={ev.y + ev.h + 42} textAnchor="middle" fill={C.dim} style={{ font: '500 27px ' + SANS }}>évaporateur</text>
          </g>

          {/* ── DÉSHYDRATEUR ── */}
          <g transform={'translate(' + G.drier.x + ',' + G.drier.y + ')'}>
            {norm ? <g transform="scale(1.5)">{S.drier(k)}</g> : (
              <g>
                <rect x="-46" y="-24" width="92" height="48" rx="10" fill={C.paper} stroke={k} strokeWidth="3.5" />
                <path d="M-26 -24 L-46 24 M-6 -24 L-26 24 M14 -24 L-6 24 M34 -24 L14 24" stroke={C.metal} strokeWidth="3" />
              </g>
            )}
            <text x="0" y="-52" textAnchor="middle" fill={C.dim} style={{ font: '400 24px ' + SANS }}>déshydrateur</text>
          </g>

          {/* ── VOYANT LIQUIDE (bulles quand le liquide se dégrade) ── */}
          <g transform={'translate(' + G.glass.x + ',' + G.glass.y + ')'}>
            <circle r="28" fill={C.paper} stroke={k} strokeWidth="3.5" />
            <clipPath id="glassClip"><circle r="24" /></clipPath>
            <g clipPath="url(#glassClip)">
              <circle r="24" fill={C.liq} opacity={0.2 + 0.45 * qual} />
              {qual < 0.85 ? [0, 1, 2, 3, 4].map((i) => {
                const ph = ((T * 0.55 + i * 0.21) % 1);
                return <circle key={i} cx={-16 + i * 8.5} cy={22 - 44 * ph} r={3 + (i % 3)} fill={C.paper} opacity={(1 - qual) * 0.95} />;
              }) : null}
            </g>
            <text x="0" y="62" textAnchor="middle" fill={qual < 0.6 ? C.bad : C.dim} style={{ font: '400 24px ' + SANS }}>
              {qual < 0.6 ? 'voyant : bulles' : 'voyant liquide'}
            </text>
          </g>

          {/* ── ÉLECTROVANNE ── */}
          <g transform={'translate(' + G.sol.x + ',' + G.sol.y + ')'}>
            {norm ? <g transform="scale(1.5)">{S.solenoid(k, true)}</g> : (
              <g>
                <path d="M-30 -26 L-30 26 L0 0 L30 26 L30 -26 L0 0 Z" fill={C.paper} stroke={k} strokeWidth="3.5" strokeLinejoin="round" />
                <line x1="0" y1="0" x2="0" y2="-34" stroke={k} strokeWidth="4" />
                <rect x="-26" y="-64" width="52" height="30" rx="5" fill={C.paper} stroke={k} strokeWidth="3.5" />
                {[-16, -6, 4, 14].map((x) => (
                  <line key={x} x1={x} y1="-64" x2={x + 8} y2="-34" stroke={C.liq} strokeWidth="3" />
                ))}
                <line x1="-8" y1="-64" x2="-8" y2="-80" stroke={C.metal} strokeWidth="3" />
                <line x1="8" y1="-64" x2="8" y2="-80" stroke={C.metal} strokeWidth="3" />
              </g>
            )}
            <text x="0" y="-106" textAnchor="middle" fill={C.dim} style={{ font: '400 24px ' + SANS }}>électrovanne</text>
          </g>

          {/* ── DÉTENDEUR + BULBE + CAPILLAIRE ── */}
          <path d={P.capil} fill="none" stroke={C.metal} strokeWidth="3.5" strokeDasharray={norm ? '12 10' : 'none'} />
          <g transform={'translate(' + G.txv.x + ',' + G.txv.y + ')'}>
            {norm ? <g transform="scale(1.6)">{S.txv(k)}</g> : (
              <g>
                <path d="M-30 -26 L-30 26 L0 0 L30 26 L30 -26 L0 0 Z" fill={C.paper} stroke={k} strokeWidth="3.5" strokeLinejoin="round" />
                <line x1="0" y1="0" x2="0" y2="-40" stroke={k} strokeWidth="4" />
                <ellipse cx="0" cy="-54" rx="30" ry="16" fill={C.paper} stroke={k} strokeWidth="3.5" />
                <line x1="-22" y1="-54" x2="22" y2="-54" stroke={C.metal} strokeWidth="2.5" />
                <path d="M-14 30 q 14 12 28 0" fill="none" stroke={C.metal} strokeWidth="3" />
              </g>
            )}
            <text x="0" y="74" textAnchor="middle" fill={dpOk ? C.dim : C.bad} style={{ font: '500 27px ' + SANS }}>détendeur</text>
            {!dpOk && T > CUES.Effondrement + 3 && T < CUES.Regime ? (
              <circle r="56" fill="none" stroke={C.bad} strokeWidth="4" opacity={0.2 + 0.4 * Math.abs(Math.sin(T * 2.4))} />
            ) : null}
          </g>

          {/* ── BULBE sur la ligne d'aspiration ── */}
          <g transform={'translate(' + G.bulb.x + ',' + G.bulb.y + ')'}>
            {norm ? <g transform="scale(1.3)">{S.bulb(k)}</g> : (
              <g>
                <rect x="-28" y="-14" width="56" height="28" rx="14" fill={C.paper} stroke={k} strokeWidth="3.5" />
                <line x1="-12" y1="-14" x2="-12" y2="14" stroke={C.metal} strokeWidth="2.5" />
                <line x1="12" y1="-14" x2="12" y2="14" stroke={C.metal} strokeWidth="2.5" />
              </g>
            )}
            <text x="0" y="-34" textAnchor="middle" fill={C.dim} style={{ font: '400 24px ' + SANS }}>bulbe</text>
          </g>

          {/* ── KVR ── */}
          {kvrIn > 0.01 ? (
            <g transform={'translate(' + G.kvr.x + ',' + G.kvr.y + ') scale(' + (0.6 + 0.4 * kvrIn) + ')'} opacity={clamp(kvrIn, 0, 1)}>
              {norm ? <g transform="scale(1.6)">{S.kvr(k)}</g> : (
                <g>
                  <path d="M-32 -28 L-32 28 L0 0 L32 28 L32 -28 L0 0 Z"
                    fill={C.liq} opacity={0.9 - 0.5 * kvrClose} stroke={k} strokeWidth="3.5" strokeLinejoin="round" />
                  <line x1="0" y1="0" x2="0" y2="-42" stroke={k} strokeWidth="4" />
                  <rect x="-30" y={-78 + 10 * kvrClose} width="60" height="30" rx="8" fill={C.paper} stroke={k} strokeWidth="3.5" />
                  <path d="M-16 -48 q 16 -8 32 0" fill="none" stroke={C.metal} strokeWidth="3" />
                  <line x1="0" y1={-78 + 10 * kvrClose} x2="0" y2={-96 + 10 * kvrClose} stroke={C.metal} strokeWidth="4" />
                </g>
              )}
              <text x="52" y="10" fill={C.liq} style={{ font: '600 30px ' + MONO }}>KVR</text>
            </g>
          ) : null}
          <Tag x={1470} y={455} anchor="start" accent={C.liq}
            title="KVR — pression de condensation"
            sub={'tarage ' + fr(F.mini) + ' bar  ·  sortie condenseur'}
            o={interpolate([CUES.KVR + 1.2, CUES.KVR + 2, CUES.KVR + 9.4, CUES.KVR + 10.2], [0, 1, 1, 0])(T)} />

          {/* ── NRD ── */}
          {nrdIn > 0.01 ? (
            <g transform={'translate(' + G.nrd.x + ',' + G.nrd.y + ') scale(' + (0.6 + 0.4 * nrdIn) + ')'} opacity={clamp(nrdIn, 0, 1)}>
              {norm ? <g transform="scale(1.6)">{S.nrd(k, nrdOpen)}</g> : (
                <g>
                  <circle r="46" fill={C.paper} stroke={k} strokeWidth="3.5" />
                  <path d="M-32 -28 L-32 28 L12 0 Z" fill={C.hot} opacity={0.3 + 0.55 * nrdOpen} stroke={k} strokeWidth="2.5" strokeLinejoin="round" />
                  <line x1={12 + 14 * nrdOpen} y1="-28" x2={12 + 14 * nrdOpen} y2="28" stroke={k} strokeWidth="6" strokeLinecap="round" />
                  <path d="M28 -30 q 12 8 0 15 q -12 8 0 15 q 12 8 0 14" fill="none" stroke={C.metal} strokeWidth="3.5" />
                </g>
              )}
              <text x="52" y="80" fill={C.hot} style={{ font: '600 30px ' + MONO }}>NRD</text>
            </g>
          ) : null}
          <Tag x={990} y={-60} anchor="end" accent={C.hot}
            title="NRD — clapet différentiel"
            sub={'by-pass gaz chauds  ·  Δp fixe 1,4 bar'}
            o={interpolate([CUES.NRD + 2.8, CUES.NRD + 3.6, CUES.NRD + 8.4, CUES.NRD + 9.2], [0, 1, 1, 0])(T)} />

          {/* ── repères de circuit ── */}
          <g opacity={interpolate([CUES.Froid - 0.4, CUES.Froid + 0.9], [0, 1])(T) * interpolate([CUES.Recap - 0.5, CUES.Recap], [1, 0])(T) * (1 - zoneO)}>
            <text x="300" y="180" fill={C.hot} style={{ font: '600 26px ' + MONO }}>HP — gaz chauds</text>
            <text x="1440" y="828" fill={C.liq} style={{ font: '600 26px ' + MONO }}>HP — liquide</text>
            <text x="110" y="960" fill={C.cold} style={{ font: '600 26px ' + MONO }}>BP — aspiration</text>
          </g>
        </g>
      </svg>

      {/* ── relevés ── */}
      {tw.showValues === false ? null : (
        <div style={{
          position: 'absolute', top: 44, right: 0, width: 448, padding: '26px 44px 22px 28px',
          background: C.paper, border: '1px solid ' + C.edge, borderRight: 'none',
          borderRadius: '14px 0 0 14px',
          boxShadow: '0 12px 34px rgba(34,48,59,0.10)', opacity: hudO0 * (1 - legendO),
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ font: '600 22px ' + SANS, color: C.dim, letterSpacing: '0.08em' }}>RELEVÉS</span>
            <span style={{ font: '600 22px ' + MONO, color: C.ink }}>{tw.fluide || 'R404A'}</span>
          </div>
          <Gauge label="Pression de condensation" value={hp} unit="bar" max={F.normal * 1.25}
            color={C.hot} mark={F.mini} markLabel="tarage KVR" note={'≈ ' + degC(tcOf(F, hp))} />
          <Gauge label="Pression réservoir" value={pres} unit="bar" max={F.normal * 1.25} color={C.liq} />
          <Gauge label="ΔP au détendeur" value={dp} unit="bar" max={F.normal * 0.9}
            color={dpOk ? C.ok : C.bad} mark={F.dpMin} markLabel="mini"
            note={dpOk ? 'débit nominal' : 'détendeur affamé'} />
        </div>
      )}

      {/* ── légende des symboles (version normalisée) ── */}
      {legendO > 0.01 ? (
        <div style={{
          position: 'absolute', right: 0, top: 44, width: 448, padding: '22px 44px 22px 26px',
          background: C.paper, border: '1px solid ' + C.edge, borderRight: 'none',
          borderRadius: '14px 0 0 14px',
          boxShadow: '0 12px 34px rgba(34,48,59,0.10)', opacity: legendO,
        }}>
          <div style={{ font: '600 22px ' + SANS, color: C.dim, letterSpacing: '0.08em', marginBottom: 16 }}>
            SYMBOLES NORMALISÉS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
            {[['compressor', 'Compresseur'], ['condenser', 'Condenseur'], ['evaporator', 'Évaporateur'],
            ['receiver', 'Réservoir de liquide'], ['drier', 'Filtre déshydrateur'], ['glass', 'Voyant liquide'],
            ['solenoid', 'Électrovanne'], ['txv', 'Détendeur + bulbe'], ['kvr', 'KVR — régul. de condensation'],
            ['nrd', 'NRD — clapet différentiel']].map(([id, label]) => (
              <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <svg width="52" height="52" viewBox="-38 -38 76 76" style={{ flex: '0 0 auto' }}>{LEGEND[id]}</svg>
                <span style={{ font: '400 24px ' + SANS, color: C.ink }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* ── titre ── */}
      {/* Format réduit : 640 px de large au lieu de 900, il s'arrête donc avant
          le condenseur (x = 700) et laisse voir le circuit qui se dessine. */}
      <div style={{
        position: 'absolute', left: 60, top: 250, width: 640, padding: '24px 30px 28px',
        background: C.bg, borderRadius: 16, borderLeft: '7px solid ' + C.hot,
        boxShadow: '0 14px 34px rgba(16,35,60,0.10)',
        opacity: titleO, transform: 'translateY(' + (1 - titleO) * 14 + 'px)',
      }}>
        <div style={{ font: '600 19px ' + MONO, color: C.hot, letterSpacing: '0.12em', marginBottom: 12 }}>
          FROID COMMERCIAL · RÉGULATION HP
        </div>
        <div style={{ font: '600 50px ' + SANS, color: C.ink, lineHeight: 1.06 }}>
          {norm ? 'Schéma type d\'installation' : 'KVR + clapet NRD'}
        </div>
        <div style={{ font: '400 24px ' + SANS, color: C.dim, marginTop: 12, lineHeight: 1.32 }}>
          <div>{norm ? 'KVR et NRD : tenir la pression de condensation' : 'Tenir la pression de condensation'}</div>
          <div>sur un condenseur à air, en hiver.</div>
        </div>
      </div>

      {/* ── récapitulatif ── */}
      <div style={{ position: 'absolute', inset: 0, opacity: recapO, pointerEvents: 'none', background: 'rgba(246,243,236,0.86)' }} />
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '0 110px', gap: 34, opacity: recapO, transform: 'translateY(' + (1 - recapO) * 22 + 'px)', pointerEvents: 'none',
      }}>
        <div style={{ font: '600 26px ' + MONO, color: C.hot, letterSpacing: '0.12em' }}>À RETENIR</div>
        <RecapRow n="1" color={C.liq} title="KVR — régulateur de pression de condensation"
          body={'Montée à la SORTIE du condenseur. Sous ' + fr(F.mini) + ' bar elle se ferme, noie le condenseur et réduit la surface d\'échange : la HP remonte.'} />
        <RecapRow n="2" color={C.hot} title="NRD — clapet de retenue différentiel"
          body="By-pass de gaz chauds entre le refoulement et le réservoir. Il s'ouvre dès que l'écart dépasse son tarage fixe de 1,4 bar et repressurise le réservoir." />
        <RecapRow n="3" color={C.ok} title="Les deux ensemble, jamais l'un sans l'autre"
          body={'La KVR tient la condensation, le NRD tient le réservoir. Résultat : ΔP au détendeur ≥ ' + fr(F.dpMin) + ' bar toute l\'année.'} />
      </div>

      {tw.showCaptions === false ? null : (
        <Captions
          style={{
            font: '500 34px ' + SANS, color: C.ink, bottom: '3.6%', whiteSpace: 'nowrap',
            left: '50%', right: 'auto', transform: 'translateX(-50%)',
            display: 'inline-block', maxWidth: '94%', textShadow: 'none',
          }}
          items={[
            { at: CUES.Installation + 4.6, text: 'Chambre froide, condenseur à air : le régime est nominal.' },
            { at: CUES.Froid + 0.6, text: 'L\'hiver arrive. L\'air extérieur tombe à −5 °C.' },
            { at: CUES.Froid + 4.4, text: 'Le condenseur échange beaucoup trop.' },
            { at: CUES.Effondrement + 0.4, text: 'La pression de condensation s\'effondre.' },
            { at: CUES.Effondrement + 3.4, text: 'Le liquide se dégrade : les pointillés s\'espacent, le voyant fait des bulles.' },
            { at: CUES.Effondrement + 6.6, text: 'Sans écart de pression, le détendeur ne débite plus : évaporateur affamé.' },
            { at: CUES.KVR + 0.6, text: 'On monte une KVR à la sortie du condenseur.' },
            { at: CUES.KVR + 4.6, text: 'Elle mesure la pression en amont — celle du condenseur.' },
            { at: CUES.KVR + 8, text: 'Sous son tarage, elle se ferme et retient le liquide.' },
            { at: CUES.Noyage + 1.2, text: 'Le condenseur se noie : moins de surface d\'échange.' },
            { at: CUES.Noyage + 5.4, text: 'La pression de condensation remonte à ' + fr(F.mini) + ' bar.' },
            { at: CUES.Reservoir + 0.8, text: 'Mais derrière la KVR, le réservoir se dépressurise.' },
            { at: CUES.Reservoir + 4.6, text: 'Le liquide n\'est plus poussé vers le détendeur. Le problème reste entier.' },
            { at: CUES.NRD + 0.8, text: 'D\'où le clapet NRD : un by-pass de gaz chauds vers le réservoir.' },
            { at: CUES.NRD + 4.2, text: 'Il s\'ouvre dès que l\'écart refoulement / réservoir dépasse 1,4 bar.' },
            { at: CUES.NRD + 8.4, text: 'Le gaz chaud repressurise le réservoir à ' + fr(F.mini - 1.4) + ' bar.' },
            { at: CUES.Regime + 0.6, text: 'KVR et NRD travaillent ensemble.' },
            { at: CUES.Regime + 4.4, until: CUES.Recap, text: 'Le détendeur retrouve son écart : liquide franc au voyant.' },
          ]} />
      )}
    </div>
  );
}

/* ── vignettes de légende ──────────────────────────────────────────────── */
const LEGEND = {
  compressor: S.compressor(C.ink),
  condenser: S.exchanger(C.ink, 1),
  evaporator: S.exchanger(C.ink, -1),
  receiver: S.receiver(C.ink),
  drier: S.drier(C.ink),
  glass: S.glass(C.ink),
  solenoid: <g transform="translate(0,8)">{S.solenoid(C.ink, true)}</g>,
  txv: <g transform="translate(0,8)">{S.txv(C.ink)}</g>,
  kvr: <g transform="translate(0,10)">{S.kvr(C.ink)}</g>,
  nrd: S.nrd(C.ink, 1),
};

function Gauge({ label, value, unit, max, color, mark, markLabel, note }) {
  const pct = clamp(value / max, 0, 1) * 100;
  const mpct = mark == null ? null : clamp(mark / max, 0, 1) * 100;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <span style={{ font: '400 23px ' + SANS, color: C.dim }}>{label}</span>
        <span style={{ font: '600 34px ' + MONO, color: color }}>{fr(value)}
          <span style={{ font: '400 21px ' + SANS, color: C.dim, marginLeft: 6 }}>{unit}</span></span>
      </div>
      <div style={{ position: 'relative', height: 12, borderRadius: 6, background: '#EEEAE1', border: '1px solid ' + C.edge }}>
        <div style={{ position: 'absolute', inset: '0 auto 0 0', width: pct + '%', background: color, borderRadius: 6, opacity: 0.9 }} />
        {mpct == null ? null : (
          <div style={{ position: 'absolute', top: -5, bottom: -5, left: mpct + '%', width: 3, background: C.ink, opacity: 0.7 }} />
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', font: '400 19px ' + SANS, color: C.dim }}>
        <span>{note || ''}</span>
        <span>{markLabel && mark != null ? markLabel + ' ' + fr(mark) : ''}</span>
      </div>
    </div>
  );
}

function RecapRow({ n, color, title, body }) {
  return (
    <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
      <div style={{
        flex: '0 0 auto', width: 62, height: 62, borderRadius: 12, background: C.paper,
        border: '2px solid ' + color, color: color, font: '600 32px ' + MONO,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{n}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ font: '600 40px ' + SANS, color: C.ink }}>{title}</div>
        <div style={{ font: '400 30px ' + SANS, color: C.dim, lineHeight: 1.38, maxWidth: 1400, textWrap: 'pretty' }}>{body}</div>
      </div>
    </div>
  );
}

/* ── racine ────────────────────────────────────────────────────────────── */
function KvrNrdVideo() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || {});
  return (
    <React.Fragment>
      <CompositionStage width={1920} height={1080} bg={C.bg}
        scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
        <Piece tweaks={t} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Schéma" />
        <TweakRadio label="Représentation" value={t.schema} options={['Dessins', 'Symboles normalisés']}
          onChange={(v) => setTweak('schema', v)} />
        <TweakRadio label="Fluide" value={t.fluide} options={['R404A', 'R134a', 'R290']}
          onChange={(v) => setTweak('fluide', v)} />
        <TweakSection label="Affichage" />
        <TweakToggle label="Sous-titres" value={t.showCaptions} onChange={(v) => setTweak('showCaptions', v)} />
        <TweakToggle label="Relevés de pression" value={t.showValues} onChange={(v) => setTweak('showValues', v)} />
        <TweakSection label="Édition" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

window.KvrNrdVideo = KvrNrdVideo;
