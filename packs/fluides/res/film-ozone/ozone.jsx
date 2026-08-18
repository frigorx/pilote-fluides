/* Couche d'ozone & ODP — composition (1080x1080) */
(function () {
  const { CompositionStage, useComposition, Captions, Easing, animate, interpolate, clamp,
          useTweaks, TweaksPanel, TweakSection, TweakToggle } = window;

  const C = {
    blue: '#1b3a63', orange: '#ff6b35', ink: '#2b3440',
    line: '#d8e1ea', card: '#ffffff',
    ocean: '#2f6fa8', land: '#5d9c74', ozone: '#2f9ec4', uv: '#7a5ae0', danger: '#e04a1f',
  };
  const FT = "600 40px Calibri, Carlito, 'Segoe UI', sans-serif";
  const FH = "bold 50px 'Trebuchet MS', 'Segoe UI', sans-serif";
  const FL = "600 30px Calibri, Carlito, 'Segoe UI', sans-serif";

  const MOTION = {
    enter: (start, from, to, d) => animate({ from, to, start, end: start + (d || 0.8), ease: Easing.easeOutCubic }),
    draw: (start, end, from, to) => animate({ from: from || 0, to: to == null ? 1 : to, start, end, ease: Easing.easeInOutCubic }),
    pop: (start, from, to, d) => animate({ from, to, start, end: start + (d || 0.55), ease: Easing.easeOutBack }),
  };

  const CX = 540, CY = 1560, RE = 900, RB = 1090;
  const rad = (a) => (a * Math.PI) / 180;
  const onArc = (a, r) => ({ x: CX + r * Math.cos(rad(a)), y: CY + r * Math.sin(rad(a)) });

  function Arrow({ x, y, angle, len, color, thick, opacity, head }) {
    const t = thick || 11, h = head || 24;
    return (
      <div style={{
        position: 'absolute', left: x, top: y, width: len, height: t, background: color,
        borderRadius: t, opacity, transformOrigin: '50% 50%',
        transform: 'translate(-50%,-50%) rotate(' + angle + 'deg)',
      }}>
        <div style={{
          position: 'absolute', right: -h * 0.7, top: '50%', width: 0, height: 0,
          borderLeft: h + 'px solid ' + color,
          borderTop: h * 0.62 + 'px solid transparent',
          borderBottom: h * 0.62 + 'px solid transparent',
          transform: 'translateY(-50%)',
        }} />
      </div>
    );
  }

  function Earth({ burn }) {
    const blobs = [
      { x: 0.30, y: 0.24, w: 0.26, h: 0.10, r: -14 },
      { x: 0.62, y: 0.30, w: 0.20, h: 0.08, r: 10 },
      { x: 0.44, y: 0.40, w: 0.34, h: 0.09, r: -4 },
    ];
    return (
      <div style={{
        position: 'absolute', left: CX - RE, top: CY - RE, width: RE * 2, height: RE * 2,
        borderRadius: '50%', overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 16%, #58a0d0 0%, ' + C.ocean + ' 42%, #23557f 100%)',
        boxShadow: '0 -26px 90px rgba(27,58,99,0.22)',
      }}>
        {blobs.map((b, i) => (
          <div key={i} style={{
            position: 'absolute', left: (b.x * 100) + '%', top: (b.y * 100) + '%',
            width: (b.w * 100) + '%', height: (b.h * 100) + '%',
            background: C.land, opacity: 0.9, borderRadius: '50%',
            transform: 'rotate(' + b.r + 'deg)',
          }} />
        ))}
        <div style={{
          position: 'absolute', inset: 0, opacity: burn,
          background: 'radial-gradient(circle at 33% 12%, rgba(122,90,224,0.85) 0%, rgba(224,74,31,0.35) 40%, rgba(224,74,31,0) 66%)',
        }} />
      </div>
    );
  }

  /* Petit groupe frigorifique posé sur la Terre, qui fuit */
  function Unit({ shake, leakOn }) {
    const p = onArc(-104, RE - 2);
    return (
      <div style={{
        position: 'absolute', left: p.x - 78, top: p.y - 112, width: 156, height: 114,
        transform: 'rotate(-14deg) translateX(' + shake + 'px)', transformOrigin: '50% 100%',
      }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 14, background: '#ffffff',
          border: '5px solid ' + C.blue, boxShadow: '0 10px 24px rgba(27,58,99,0.22)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 9, padding: '0 18px',
        }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ height: 8, borderRadius: 4, background: i === 1 ? C.blue : C.line }} />
          ))}
        </div>
        <div style={{
          position: 'absolute', left: -6, top: -46, padding: '6px 14px', borderRadius: 999,
          background: C.orange, color: '#fff', font: "bold 24px 'Trebuchet MS', sans-serif",
          opacity: leakOn, whiteSpace: 'nowrap', transform: 'rotate(14deg)',
        }}>fuite CFC</div>
      </div>
    );
  }

  const ODP = [
    { n: 'R11', v: 1.0, cls: 'CFC — interdit' },
    { n: 'R12', v: 1.0, cls: 'CFC — interdit' },
    { n: 'R22', v: 0.055, cls: 'HCFC — interdit' },
    { n: 'R134a', v: 0, cls: 'HFC — ODP nul' },
  ];

  function DataCard({ T, appear, leave }) {
    const inP = MOTION.enter(appear, 0, 1, 0.9)(T);
    const outP = leave == null ? 0 : MOTION.draw(leave, leave + 0.7)(T);
    const o = inP * (1 - outP);
    if (o <= 0.002) return null;
    return (
      <div style={{
        position: 'absolute', left: 72, right: 72, top: 250,
        background: C.card, borderRadius: 30, border: '3px solid ' + C.line,
        boxShadow: '0 26px 60px rgba(27,58,99,0.16)', padding: '38px 44px 34px',
        opacity: o, transform: 'translateY(' + ((1 - inP) * 90 + outP * -60) + 'px)',
      }}>
        <div style={{ font: FH, color: C.blue }}>ODP — destruction de l'ozone</div>
        <div style={{ font: FL, color: '#5b6b7d', marginTop: 8 }}>Pouvoir destructeur de 1 kg de fluide, comparé au R11</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 34 }}>
          {ODP.map((r, i) => {
            const g = MOTION.draw(appear + 0.5 + i * 0.4, appear + 1.4 + i * 0.4)(T);
            const nul = r.v === 0;
            return (
              <div key={r.n} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 200, font: "bold 34px 'Trebuchet MS', sans-serif", color: nul ? '#2f8f5b' : C.blue }}>
                  {r.n}
                  <div style={{ font: '600 22px Calibri, sans-serif', color: '#7a8899' }}>{r.cls}</div>
                </div>
                <div style={{ flex: 1, height: 44, background: '#eef3f8', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: Math.max(nul ? 0 : 8, r.v * 100 * g) + '%',
                    background: nul ? '#2f8f5b' : 'linear-gradient(90deg,#8f6ae8,' + C.uv + ')', borderRadius: 10,
                  }} />
                </div>
                <div style={{ width: 130, textAlign: 'right', font: "bold 36px 'Trebuchet MS', sans-serif", color: nul ? '#2f8f5b' : C.ink }}>
                  {(r.v * g).toFixed(r.v === 0.055 ? 3 : 1).replace('.', ',')}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{
          marginTop: 30, padding: '20px 24px', borderRadius: 16,
          background: 'rgba(47,158,196,0.12)', border: '2px solid rgba(47,158,196,0.4)',
          font: "bold 32px 'Trebuchet MS', sans-serif", color: C.blue,
          opacity: MOTION.enter(appear + 2.6, 0, 1, 0.6)(T),
        }}>ODP nul ne veut pas dire sans effet : le PRP, lui, reste élevé.</div>
      </div>
    );
  }

  const SEGS = 46, A0 = -172, A1 = -8;

  function Piece(props) {
    const { T, CUES } = useComposition();
    const t = props.t;
    const K = CUES;

    const camS = interpolate(
      [0, K.Fuite, K.Destruction + 1.4, K.ODP, K.Montreal, K.Montreal + 3.4, K.Bilan + 4],
      [1.0, 1.14, 1.08, 1.0, 1.10, 1.02, 1.0], Easing.easeInOutCubic);
    const camX = interpolate(
      [0, K.Fuite, K.Destruction + 1.4, K.ODP, K.Montreal, K.Bilan + 4],
      [540, 380, 520, 540, 520, 540], Easing.easeInOutCubic);    const camY = interpolate(
      [0, K.Fuite, K.Destruction + 1.4, K.ODP, K.Montreal, K.Bilan + 4],
      [700, 780, 640, 700, 660, 700], Easing.easeInOutCubic);
    const s = camS(T), fx = camX(T), fy = camY(T);

    // hole opens during Destruction, closes during Montreal
    const open = MOTION.draw(K.Destruction + 0.8, K.Destruction + 5.4, 0, 22)(T);
    const close = MOTION.draw(K.Montreal + 1.6, K.Montreal + 6.2, 0, 1)(T);
    const half = open * (1 - close);
    const burn = clamp((half / 22) * 0.55, 0, 0.55);

    const leakOn = MOTION.enter(K.Fuite + 0.2, 0, 1, 0.5)(T) * (1 - MOTION.draw(K.ODP - 0.4, K.ODP)(T));
    const shake = Math.sin(T * 9) * 2.4 * leakOn;

    // CFC molecules rising from the unit to the band
    const cfcs = [0, 0.34, 0.68].map((off, i) => {
      const p = ((T - K.Fuite) / 3 + off) % 1;
      const alive = T > K.Fuite && T < K.ODP - 0.3 && p > 0;
      const r = RE - 10 + p * (RB - RE + 20);
      const a = -104 + p * 10;
      const pt = onArc(a, r);
      return { ...pt, o: alive ? Math.sin(Math.PI * clamp(p, 0, 1)) : 0, k: i, l: i === 1 ? 'R12' : 'CFC' };
    });

    // Chlorine atoms attacking the band
    const cls = [0, 0.5].map((off, i) => {
      const p = ((T - K.Destruction) / 2.2 + off) % 1;
      const alive = T > K.Destruction && T < K.ODP - 0.3;
      const a = -122 + p * 26;
      const pt = onArc(a, RB + 40 - p * 40);
      return { ...pt, o: alive ? Math.sin(Math.PI * clamp(p, 0, 1)) : 0, k: i };
    });

    // UV rays
    const uvs = [-150, -128, -106, -84, -62].map((a, i) => {
      const p = ((T * 0.4) + i * 0.19) % 1;
      const wave = clamp(Math.sin(Math.PI * p) * 1.7, 0, 1);
      const through = Math.abs(a + 95) < Math.max(half, 0.001);
      if (through) {
        const r = RB + 340 - p * (RB + 340 - (RE + 30));
        return { a, k: i, pt: onArc(a, r), dir: a + 180, col: C.uv, o: wave };
      }
      const down = p < 0.5;
      const prog = down ? p / 0.5 : (1 - p) / 0.5;
      const r = RB + 340 - prog * 300;
      return { a, k: i, pt: onArc(a, r), dir: down ? a + 180 : a, col: down ? C.uv : '#a795e0', o: wave };
    });

    const stamp = MOTION.pop(K.Montreal + 0.3, 0, 1, 0.7)(T) * (1 - MOTION.draw(K.Bilan - 0.4, K.Bilan)(T));

    return (
      <div data-screen-label={'t=' + Math.floor(T) + 's'} style={{
        position: 'absolute', inset: 0, overflow: 'hidden',
        background: 'linear-gradient(180deg,#e9eaf6 0%,#f2f6fa 48%,#f7f4f0 100%)',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: burn * 0.5, background: 'linear-gradient(180deg,rgba(122,90,224,0.5),rgba(122,90,224,0))' }} />

        <div style={{ position: 'absolute', inset: 0, transformOrigin: '0 0', transform: 'translate(' + (-fx * (s - 1)) + 'px,' + (-fy * (s - 1)) + 'px) scale(' + s + ')' }}>
          {uvs.map((u) => (
            <Arrow key={'uv' + u.k} x={u.pt.x} y={u.pt.y} angle={u.dir} len={108} thick={11} color={u.col} opacity={u.o} />
          ))}

          {/* ozone shield, segment by segment */}
          {Array.from({ length: SEGS }).map((_, i) => {
            const a = A0 + (i * (A1 - A0)) / (SEGS - 1);
            const p = onArc(a, RB);
            const d = Math.abs(a + 95);
            const gone = clamp((half - d) / 6 + 0.5, 0, 1);
            const alive = 1 - clamp(gone, 0, 1);
            const app = MOTION.enter(0.2 + i * 0.012, 0, 1, 0.5)(T);
            return (
              <div key={'sg' + i} style={{
                position: 'absolute', left: p.x - 9, top: p.y - 27, width: 18, height: 54,
                borderRadius: 9, background: C.ozone,
                opacity: alive * 0.9 * app, transformOrigin: '50% 50%',
                transform: 'rotate(' + (a + 90) + 'deg) scale(' + (0.4 + 0.6 * alive) + ')',
                boxShadow: '0 0 14px rgba(47,158,196,0.45)',
              }} />
            );
          })}
          <div style={{
            position: 'absolute', left: CX - RB - 60, top: CY - RB - 60, width: (RB + 60) * 2, height: (RB + 60) * 2,
            borderRadius: '50%', boxSizing: 'border-box',
            border: '2px dashed rgba(47,158,196,0.35)',
          }} />

          <Earth burn={burn} />
          {(() => {
            const g = onArc(-95, RE - 30);
            return (
              <div style={{
                position: 'absolute', left: g.x - 190, top: g.y - 190, width: 380, height: 380,
                borderRadius: '50%', opacity: clamp(half / 14, 0, 1) * 0.85,
                background: 'radial-gradient(circle, rgba(224,74,31,0.85) 0%, rgba(122,90,224,0.35) 45%, rgba(122,90,224,0) 72%)',
              }} />
            );
          })()}
          <Unit shake={shake} leakOn={leakOn} />

          {cfcs.map((m) => (
            <div key={'cfc' + m.k} style={{
              position: 'absolute', left: m.x - 44, top: m.y - 44, width: 88, height: 88, borderRadius: '50%',
              background: '#ffffff', border: '3px solid ' + C.orange, color: C.orange,
              font: "bold 24px 'Trebuchet MS', sans-serif",
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: m.o, boxShadow: '0 6px 16px rgba(27,58,99,0.14)',
            }}>{m.l}</div>
          ))}

          {cls.map((m) => (
            <div key={'cl' + m.k} style={{
              position: 'absolute', left: m.x - 44, top: m.y - 44, width: 88, height: 88, borderRadius: '50%',
              background: C.uv, border: '3px solid #5b3fc4', color: '#fff',
              font: "bold 32px 'Trebuchet MS', sans-serif",
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: m.o, boxShadow: '0 0 22px rgba(122,90,224,0.5)',
            }}>Cl</div>
          ))}
        </div>

        {/* fact bubble during destruction */}
        <div style={{
          position: 'absolute', left: 80, right: 80, top: 150, textAlign: 'center',
          opacity: MOTION.enter(K.Destruction + 3.4, 0, 1, 0.6)(T) * (1 - MOTION.draw(K.ODP - 0.5, K.ODP)(T)),
        }}>
          <div style={{
            display: 'inline-block', padding: '18px 28px', borderRadius: 20,
            background: 'rgba(255,255,255,0.94)', border: '3px solid ' + C.line,
            font: "bold 40px 'Trebuchet MS', sans-serif", color: C.uv, lineHeight: 1.25,
            boxShadow: '0 14px 34px rgba(27,58,99,0.14)',
          }}>1 atome de chlore détruit<br />jusqu'à 100 000 molécules d'O₃</div>
        </div>

        <DataCard T={T} appear={K.ODP + 0.2} leave={K.Montreal - 0.5} />

        {/* Montréal stamp */}
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 132, textAlign: 'center',
          opacity: clamp(stamp, 0, 1), transform: 'scale(' + (0.86 + 0.14 * clamp(stamp, 0, 1)) + ') rotate(-3deg)',
        }}>
          <div style={{
            display: 'inline-block', padding: '18px 34px', borderRadius: 18,
            border: '6px solid ' + C.blue, color: C.blue, background: 'rgba(255,255,255,0.9)',
            font: "bold 46px 'Trebuchet MS', sans-serif", letterSpacing: '1px',
          }}>PROTOCOLE DE MONTRÉAL · 1987</div>
          <div style={{ marginTop: 16, maxWidth: 780, marginLeft: 'auto', marginRight: 'auto', font: '600 26px Calibri, sans-serif', color: '#5b6b7d', lineHeight: 1.3 }}>
            Retour au niveau de 1980 attendu vers 2066 au-dessus de l'Antarctique (OMM/PNUE, 2022)
          </div>
        </div>

        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(247,249,252,0.88)',
          opacity: MOTION.enter(K.Bilan - 0.2, 0, 1, 0.7)(T) * (1 - MOTION.draw(K.Bilan + 4.6, K.Bilan + 5.3)(T)),
        }} />

        {/* closing statement */}
        <div style={{
          position: 'absolute', left: 84, right: 84, top: 250, textAlign: 'center',
          opacity: MOTION.enter(K.Bilan + 0.2, 0, 1, 0.8)(T) * (1 - MOTION.draw(K.Bilan + 4.6, K.Bilan + 5.3)(T)),
        }}>
          <div style={{ font: "bold 72px 'Trebuchet MS', sans-serif", color: C.blue, lineHeight: 1.12, textWrap: 'pretty' }}>
            La couche se soigne<br />parce qu'on a changé de fluide.
          </div>
          <div style={{
            display: 'inline-block', marginTop: 26, padding: '16px 30px', borderRadius: 999,
            background: C.orange, color: '#fff', font: "bold 34px 'Trebuchet MS', sans-serif",
          }}>ODP réglé · le PRP, c'est maintenant</div>
        </div>

        <div style={{ position: 'absolute', left: 46, top: 40, display: 'flex', alignItems: 'center', gap: 12, opacity: t.logo ? 1 : 0 }}>
          <div style={{ font: "bold 34px 'Trebuchet MS', sans-serif", color: C.blue }}>❄ inerWeb</div>
          <div style={{ background: C.orange, color: '#fff', font: "bold 24px 'Trebuchet MS', sans-serif", padding: '4px 12px', borderRadius: 8 }}>Édu</div>
        </div>
        <div style={{ position: 'absolute', right: 46, top: 48, font: "bold 30px 'Trebuchet MS', sans-serif", color: C.blue, opacity: t.logo ? 0.75 : 0 }}>
          Couche d'ozone &amp; ODP
        </div>
        <div style={{ position: 'absolute', right: 46, bottom: 26, font: '600 22px Calibri, sans-serif', color: '#8493a4', opacity: t.logo ? 1 : 0 }}>
          par F. Henninot
        </div>

        {t.sousTitres ? (
          <Captions
            style={{
              left: '6%', right: '6%', bottom: '6.5%', color: C.blue, font: FT, textShadow: 'none',
              background: 'rgba(255,255,255,0.94)', border: '3px solid ' + C.line,
              borderRadius: 20, padding: '20px 26px', lineHeight: 1.32,
              boxShadow: '0 14px 34px rgba(27,58,99,0.14)', textWrap: 'pretty',
            }}
            items={[
              { at: K.Bouclier + 0.6, until: K.Bouclier + 3.4, text: "La couche d'ozone filtre les rayons ultraviolets." },
              { at: K.Bouclier + 3.4, until: K.Fuite - 0.2, text: 'Sans elle, les UV arriveraient directement au sol.' },
              { at: K.Fuite + 0.2, until: K.Fuite + 3.4, text: 'Un équipement qui fuit libère du CFC : R11, R12.' },
              { at: K.Fuite + 3.4, until: K.Destruction - 0.2, text: "Ces molécules montent jusqu'à la stratosphère." },
              { at: K.Destruction + 0.2, until: K.Destruction + 3.4, text: "Le chlore qu'elles libèrent casse les molécules d'ozone." },
              { at: K.Destruction + 3.4, until: K.Destruction + 6.4, text: 'Un seul atome de chlore en détruit des dizaines de milliers.' },
              { at: K.Destruction + 6.4, until: K.ODP - 0.2, text: "Le bouclier s'ouvre : les UV atteignent le sol." },
              { at: K.ODP + 0.2, until: K.ODP + 3.4, text: "L'ODP mesure ce pouvoir de destruction." },
              { at: K.ODP + 3.4, until: K.Montreal - 0.2, text: 'R11 : ODP = 1. R22 : 0,055. Les HFC : 0.' },
              { at: K.Montreal + 0.2, until: K.Montreal + 3.4, text: 'Protocole de Montréal, 1987 : les CFC sont interdits.' },
              { at: K.Montreal + 3.4, until: K.Montreal + 6.4, text: 'Tous les pays ont signé, et tous ont appliqué.' },
              { at: K.Montreal + 6.4, until: K.Bilan - 0.2, text: "La couche d'ozone se reconstitue peu à peu." },
              { at: K.Bilan + 0.2, until: K.Bilan + 5.2, text: "Les HFC ne détruisent plus l'ozone… mais ils réchauffent le climat." },
            ]}
          />
        ) : null}
      </div>
    );
  }

  function OzonePiece() {
    const tw = useTweaks(window.TWEAK_DEFAULTS);
    const t = tw[0], setTweak = tw[1];
    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        <CompositionStage width={1080} height={1080} bg="#f2f6fa"
          scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
          <Piece t={t} />
        </CompositionStage>
        <TweaksPanel>
          <TweakSection label="Affichage" />
          <TweakToggle label="Sous-titres" value={t.sousTitres} onChange={(v) => setTweak('sousTitres', v)} />
          <TweakToggle label="Bandeau inerWeb Édu" value={t.logo} onChange={(v) => setTweak('logo', v)} />
          <TweakSection label="Outils" />
          <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
        </TweaksPanel>
      </div>
    );
  }

  window.OzonePiece = OzonePiece;
})();
