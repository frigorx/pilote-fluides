/* GÉNÉRÉ par build/films.mjs depuis serre.jsx — ne pas modifier ici.
   La source reste le .jsx, à côté ; relancer `node build/films.mjs` après l'avoir touché. */
/* Effet de serre, PRP & climat — composition 60 s (1080x1080) */
(function () {
  const {
    CompositionStage,
    useComposition,
    Captions,
    Easing,
    animate,
    interpolate,
    clamp,
    useTweaks,
    TweaksPanel,
    TweakSection,
    TweakToggle
  } = window;
  const C = {
    blue: '#1b3a63',
    orange: '#ff6b35',
    ink: '#2b3440',
    line: '#d8e1ea',
    card: '#ffffff',
    ocean: '#2f6fa8',
    land: '#5d9c74',
    hot: '#e04a1f',
    sun: '#f4b942',
    ozone: '#2f9ec4',
    green: '#2f8f5b'
  };
  const FT = "600 40px Calibri, Carlito, 'Segoe UI', sans-serif";
  const FH = "bold 50px 'Trebuchet MS', 'Segoe UI', sans-serif";
  const FL = "600 30px Calibri, Carlito, 'Segoe UI', sans-serif";
  const MOTION = {
    enter: (start, from, to, d) => animate({
      from,
      to,
      start,
      end: start + (d || 0.8),
      ease: Easing.easeOutCubic
    }),
    draw: (start, end, from, to) => animate({
      from: from || 0,
      to: to == null ? 1 : to,
      start,
      end,
      ease: Easing.easeInOutCubic
    }),
    pop: (start, from, to, d) => animate({
      from,
      to,
      start,
      end: start + (d || 0.55),
      ease: Easing.easeOutBack
    })
  };
  const CX = 540,
    CY = 1560,
    RE = 900,
    RB = 1180;
  const rad = a => a * Math.PI / 180;
  const onArc = (a, r) => ({
    x: CX + r * Math.cos(rad(a)),
    y: CY + r * Math.sin(rad(a))
  });
  const fr = n => Math.round(n).toLocaleString('fr-FR');
  function Arrow({
    x,
    y,
    angle,
    len,
    color,
    thick,
    opacity,
    head
  }) {
    const t = thick || 11,
      h = head || 24;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: x,
        top: y,
        width: len,
        height: t,
        background: color,
        borderRadius: t,
        opacity,
        transformOrigin: '50% 50%',
        transform: 'translate(-50%,-50%) rotate(' + angle + 'deg)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        right: -h * 0.7,
        top: '50%',
        width: 0,
        height: 0,
        borderLeft: h + 'px solid ' + color,
        borderTop: h * 0.62 + 'px solid transparent',
        borderBottom: h * 0.62 + 'px solid transparent',
        transform: 'translateY(-50%)'
      }
    }));
  }
  function Earth({
    heat
  }) {
    const blobs = [{
      x: 0.28,
      y: 0.115,
      w: 0.26,
      h: 0.075,
      r: -12
    }, {
      x: 0.60,
      y: 0.145,
      w: 0.21,
      h: 0.065,
      r: 10
    }, {
      x: 0.42,
      y: 0.205,
      w: 0.34,
      h: 0.075,
      r: -4
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: CX - RE,
        top: CY - RE,
        width: RE * 2,
        height: RE * 2,
        borderRadius: '50%',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 16%, #58a0d0 0%, ' + C.ocean + ' 42%, #23557f 100%)',
        boxShadow: '0 -26px 90px rgba(27,58,99,0.22)'
      }
    }, blobs.map((b, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        left: b.x * 100 + '%',
        top: b.y * 100 + '%',
        width: b.w * 100 + '%',
        height: b.h * 100 + '%',
        background: C.land,
        opacity: 0.9,
        borderRadius: '50%',
        transform: 'rotate(' + b.r + 'deg)'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        opacity: heat,
        background: 'radial-gradient(circle at 50% 14%, #f5a83f 0%, #e0762c 34%, #c2502a 68%, #a8452a 100%)'
      }
    }));
  }
  function Sun({
    glow
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 150,
        top: 128,
        width: 210,
        height: 210
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 40% 36%, #ffd977 0%, ' + C.sun + ' 55%, #eb9c22 100%)',
        boxShadow: '0 0 ' + (54 + glow * 46) + 'px rgba(244,185,66,' + (0.45 + glow * 0.3) + ')'
      }
    }));
  }
  function Chip({
    x,
    y,
    label,
    s,
    tone
  }) {
    const d = 108;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: x - d / 2,
        top: y - d / 2,
        width: d,
        height: d,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: tone === 'hot' ? C.orange : '#ffffff',
        color: tone === 'hot' ? '#ffffff' : C.blue,
        border: '3px solid ' + (tone === 'hot' ? '#d8501f' : C.line),
        font: "bold 27px 'Trebuchet MS', 'Segoe UI', sans-serif",
        boxShadow: '0 6px 18px rgba(27,58,99,0.14)',
        transform: 'scale(' + s + ')',
        opacity: clamp(s, 0, 1)
      }
    }, label);
  }
  function CardShell({
    inP,
    outP,
    top,
    children
  }) {
    const o = inP * (1 - outP);
    if (o <= 0.002) return null;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 72,
        right: 72,
        top: top || 236,
        background: C.card,
        borderRadius: 30,
        border: '3px solid ' + C.line,
        boxShadow: '0 26px 60px rgba(27,58,99,0.16)',
        padding: '38px 44px 34px',
        opacity: o,
        transform: 'translateY(' + ((1 - inP) * 90 + outP * -60) + 'px)'
      }
    }, children);
  }
  const PRP = [{
    n: 'CO₂',
    v: 1,
    cls: 'référence'
  }, {
    n: 'R32',
    v: 675,
    cls: 'A2L'
  }, {
    n: 'R134a',
    v: 1430,
    cls: 'A1'
  }, {
    n: 'R404A',
    v: 3922,
    cls: 'A1'
  }];
  function PrpCard({
    T,
    appear,
    leave
  }) {
    return /*#__PURE__*/React.createElement(CardShell, {
      inP: MOTION.enter(appear, 0, 1, 0.9)(T),
      outP: MOTION.draw(leave, leave + 0.7)(T)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: FH,
        color: C.blue
      }
    }, "PRP \u2014 pouvoir de r\xE9chauffement"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: FL,
        color: '#5b6b7d',
        marginTop: 8
      }
    }, "Effet de 1 kg de fluide, compar\xE9 \xE0 1 kg de CO\u2082 (100 ans)"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
        marginTop: 34
      }
    }, PRP.map((r, i) => {
      const g = MOTION.draw(appear + 0.5 + i * 0.42, appear + 1.5 + i * 0.42)(T);
      const hot = r.n === 'R404A';
      return /*#__PURE__*/React.createElement("div", {
        key: r.n,
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 20
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 178,
          font: "bold 34px 'Trebuchet MS', sans-serif",
          color: hot ? C.orange : C.blue
        }
      }, r.n, /*#__PURE__*/React.createElement("div", {
        style: {
          font: '600 22px Calibri, sans-serif',
          color: '#7a8899'
        }
      }, r.cls)), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          height: 44,
          background: '#eef3f8',
          borderRadius: 10,
          overflow: 'hidden'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          height: '100%',
          width: Math.max(8, r.v / 3922 * 100 * g) + '%',
          background: hot ? 'linear-gradient(90deg,#ff8b57,' + C.orange + ')' : 'linear-gradient(90deg,#4a80b4,' + C.blue + ')',
          borderRadius: 10
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          width: 168,
          textAlign: 'right',
          font: "bold 36px 'Trebuchet MS', sans-serif",
          color: hot ? C.orange : C.ink
        }
      }, fr(r.v * g)));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 32,
        padding: '20px 24px',
        borderRadius: 16,
        background: 'rgba(255,107,53,0.10)',
        border: '2px solid rgba(255,107,53,0.35)',
        font: "bold 34px 'Trebuchet MS', sans-serif",
        color: C.blue,
        opacity: MOTION.enter(appear + 2.8, 0, 1, 0.6)(T)
      }
    }, "1 kg de R404A rejet\xE9 \u2248 3 922 kg de CO\u2082"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        font: '600 24px Calibri, sans-serif',
        color: '#7a8899'
      }
    }, "Valeurs PRP AR4 \u2014 r\xE8glement (UE) 517/2014"));
  }
  const KM = [{
    n: 'R404A',
    v: 26100,
    cls: 'A1 — PRP 3 922',
    note: 'les deux tiers du tour de la Terre'
  }, {
    n: 'R32',
    v: 4500,
    cls: 'A2L — PRP 675',
    note: '3 allers-retours Paris – Marseille'
  }, {
    n: 'R290',
    v: 20,
    cls: 'A3 — PRP 3',
    note: 'la sortie de ville'
  }];
  function KmCard({
    T,
    appear,
    leave
  }) {
    return /*#__PURE__*/React.createElement(CardShell, {
      inP: MOTION.enter(appear, 0, 1, 0.9)(T),
      outP: MOTION.draw(leave, leave + 0.7)(T),
      top: 150
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "bold 46px 'Trebuchet MS', sans-serif",
        color: C.blue,
        lineHeight: 1.12
      }
    }, "1 kg rejet\xE9,", /*#__PURE__*/React.createElement("br", null), "\xE7a fait combien de kilom\xE8tres ?"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "600 28px Calibri, Carlito, sans-serif",
        color: '#5b6b7d',
        marginTop: 8
      }
    }, "La m\xEAme quantit\xE9 de CO\u2082, mais en voiture"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        marginTop: 22
      }
    }, KM.map((r, i) => {
      const g = MOTION.draw(appear + 0.6 + i * 1.4, appear + 2.2 + i * 1.4)(T);
      const hot = r.n === 'R404A';
      return /*#__PURE__*/React.createElement("div", {
        key: r.n,
        style: {
          opacity: clamp(g * 3, 0, 1)
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'baseline',
          gap: 18
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 178,
          font: "bold 36px 'Trebuchet MS', sans-serif",
          color: hot ? C.orange : C.blue
        }
      }, r.n, /*#__PURE__*/React.createElement("div", {
        style: {
          font: '600 22px Calibri, sans-serif',
          color: '#7a8899'
        }
      }, r.cls)), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          textAlign: 'right',
          font: "bold 56px 'Trebuchet MS', sans-serif",
          color: hot ? C.orange : C.ink
        }
      }, fr(r.v * g), " ", /*#__PURE__*/React.createElement("span", {
        style: {
          font: "bold 30px 'Trebuchet MS', sans-serif"
        }
      }, "km"))), /*#__PURE__*/React.createElement("div", {
        style: {
          height: 14,
          background: '#eef3f8',
          borderRadius: 7,
          marginTop: 8,
          overflow: 'hidden'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          height: '100%',
          width: Math.max(1, r.v / 26100 * 100 * g) + '%',
          borderRadius: 7,
          background: hot ? 'linear-gradient(90deg,#ff8b57,' + C.orange + ')' : 'linear-gradient(90deg,#4a80b4,' + C.blue + ')'
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 6,
          font: '600 25px Calibri, sans-serif',
          color: '#5b6b7d'
        }
      }, r.note));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18,
        font: '600 22px Calibri, sans-serif',
        color: '#7a8899',
        lineHeight: 1.25
      }
    }, "Base : 150 g CO\u2082/km (voiture moyenne du parc fran\xE7ais, SDES) \u2014 ordre de grandeur."));
  }
  function MiniGlobe({
    hole,
    label,
    mark
  }) {
    const segs = 22;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: 290,
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: 290,
        height: 232,
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 50,
        top: 46,
        width: 190,
        height: 190,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 50% 20%, #58a0d0 0%, ' + C.ocean + ' 60%, #23557f 100%)'
      }
    }), Array.from({
      length: segs
    }).map((_, i) => {
      const a = -170 + i * 160 / (segs - 1);
      const p = {
        x: 145 + 118 * Math.cos(rad(a)),
        y: 141 + 118 * Math.sin(rad(a))
      };
      const d = Math.abs(a + 90);
      const gone = hole > 0 && d < hole;
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          position: 'absolute',
          left: p.x - 5,
          top: p.y - 15,
          width: 10,
          height: 30,
          borderRadius: 5,
          background: C.ozone,
          opacity: gone ? 0.07 : 0.95,
          transform: 'rotate(' + (a + 90) + 'deg)'
        }
      });
    }), mark ? /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 95,
        top: 2,
        width: 100,
        height: 46,
        borderRadius: 12,
        border: '4px dashed ' + C.hot
      }
    }) : null), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: -6,
        font: "bold 30px 'Trebuchet MS', sans-serif",
        color: C.blue
      }
    }, label));
  }
  function OzoneWin({
    T,
    appear,
    leave
  }) {
    const heal = MOTION.draw(appear + 1.4, appear + 3.4, 58, 6)(T);
    return /*#__PURE__*/React.createElement(CardShell, {
      inP: MOTION.enter(appear, 0, 1, 0.9)(T),
      outP: MOTION.draw(leave, leave + 0.7)(T),
      top: 208
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "bold 46px 'Trebuchet MS', sans-serif",
        color: C.blue,
        lineHeight: 1.12
      }
    }, "La couche d'ozone :", /*#__PURE__*/React.createElement("br", null), "la preuve que \xE7a marche."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement(MiniGlobe, {
      hole: 58,
      label: "1987",
      mark: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "bold 54px 'Trebuchet MS', sans-serif",
        color: C.orange
      }
    }, "\u2192"), /*#__PURE__*/React.createElement(MiniGlobe, {
      hole: heal,
      label: "aujourd'hui"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18,
        padding: '20px 24px',
        borderRadius: 16,
        background: 'rgba(47,143,91,0.10)',
        border: '2px solid rgba(47,143,91,0.35)',
        font: "bold 33px 'Trebuchet MS', sans-serif",
        color: C.blue,
        lineHeight: 1.3,
        opacity: MOTION.enter(appear + 3.4, 0, 1, 0.6)(T)
      }
    }, "Le monde entier a interdit les CFC en 1987. Le trou se referme."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        font: '600 23px Calibri, sans-serif',
        color: '#7a8899',
        lineHeight: 1.3
      }
    }, "Protocole de Montr\xE9al \u2014 retour au niveau de 1980 attendu vers 2066 au-dessus de l'Antarctique (OMM/PNUE, 2022)."));
  }
  function Stripes({
    T,
    appear,
    leave
  }) {
    const n = 42;
    const wall = MOTION.enter(appear + 4.4, 0, 1, 0.8)(T);
    return /*#__PURE__*/React.createElement(CardShell, {
      inP: MOTION.enter(appear, 0, 1, 0.9)(T),
      outP: MOTION.draw(leave, leave + 0.7)(T),
      top: 228
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "bold 46px 'Trebuchet MS', sans-serif",
        color: C.blue,
        lineHeight: 1.12
      }
    }, "Le climat, lui,", /*#__PURE__*/React.createElement("br", null), "n'a pas eu son Montr\xE9al."), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "600 27px Calibri, Carlito, sans-serif",
        color: '#5b6b7d',
        marginTop: 10,
        lineHeight: 1.3
      }
    }, "En 1987, le monde entier a interdit les CFC : le trou dans la couche d'ozone se referme. Pour le climat, aucun accord de ce niveau."), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        display: 'flex',
        gap: 3,
        height: 268,
        marginTop: 26,
        alignItems: 'stretch'
      }
    }, Array.from({
      length: n
    }).map((_, i) => {
      const k = i / (n - 1);
      const on = MOTION.enter(appear + 0.8 + k * 3.2, 0, 1, 0.35)(T);
      const r = Math.round(74 + k * 132),
        g = Math.round(128 - k * 92),
        b = Math.round(180 - k * 148);
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          flex: 1,
          borderRadius: 3,
          background: 'rgb(' + r + ',' + g + ',' + b + ')',
          opacity: on
        }
      });
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 132,
        borderRadius: 8,
        background: 'repeating-linear-gradient(135deg,#c1401c 0 18px,#8f2c12 18px 36px)',
        opacity: wall,
        transform: 'translateX(' + (1 - wall) * 140 + 'px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        font: "bold 40px 'Trebuchet MS', sans-serif",
        letterSpacing: '2px',
        writingMode: 'vertical-rl'
      }
    }, "MUR")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        font: '600 22px Calibri, sans-serif',
        color: '#7a8899'
      }
    }, "R\xE9chauffement observ\xE9, puis projet\xE9 si rien ne change"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18,
        padding: '18px 24px',
        borderRadius: 16,
        background: 'rgba(255,107,53,0.10)',
        border: '2px solid rgba(255,107,53,0.35)',
        font: "bold 34px 'Trebuchet MS', sans-serif",
        color: C.blue,
        lineHeight: 1.3,
        opacity: MOTION.enter(appear + 5.4, 0, 1, 0.6)(T)
      }
    }, "Au rythme actuel, on continue tout droit."));
  }
  function Gauge({
    T,
    start,
    leave
  }) {
    const o = MOTION.enter(start, 0, 1, 0.7)(T) * (1 - MOTION.draw(leave, leave + 0.6)(T));
    if (o <= 0.002) return null;
    const v = MOTION.draw(start + 0.4, start + 4.2, 0, 4)(T);
    const h = 380;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        right: 60,
        top: 208,
        width: 200,
        opacity: o,
        transform: 'translateY(' + (1 - o) * 40 + 'px)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "bold 30px 'Trebuchet MS', sans-serif",
        color: C.blue,
        textAlign: 'center',
        marginBottom: 14
      }
    }, "Temp\xE9rature", /*#__PURE__*/React.createElement("br", null), "moyenne"), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: 76,
        height: h,
        margin: '0 auto',
        background: '#ffffff',
        border: '3px solid ' + C.line,
        borderRadius: 40
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 8,
        right: 8,
        bottom: 8,
        borderRadius: 34,
        height: (h - 16) * (v / 4.6),
        background: 'linear-gradient(180deg,' + C.hot + ',#f5a623)'
      }
    }), [1.5, 3, 4].map(m => /*#__PURE__*/React.createElement("div", {
      key: m,
      style: {
        position: 'absolute',
        left: -8,
        right: -8,
        bottom: 8 + (h - 16) * (m / 4.6),
        height: 3,
        background: 'rgba(27,58,99,0.35)'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        padding: '10px 6px 12px',
        borderRadius: 18,
        textAlign: 'center',
        background: 'rgba(255,255,255,0.95)',
        border: '3px solid ' + C.line,
        boxShadow: '0 10px 24px rgba(27,58,99,0.14)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "bold 50px 'Trebuchet MS', sans-serif",
        color: C.hot
      }
    }, "+", v.toFixed(1).replace('.', ','), " \xB0C"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: '600 22px Calibri, sans-serif',
        color: '#6a7889'
      }
    }, "sc\xE9nario sans action")));
  }
  function Piece(props) {
    const {
      T,
      CUES
    } = useComposition();
    const t = props.t;
    const K = CUES;
    const camS = interpolate([0, K.Equilibre, K.Piege + 1.6, K.Rechauffement, K.PRP, K.Agir, K.Agir + 5], [1.0, 1.03, 1.14, 1.05, 1.0, 1.0, 1.08], Easing.easeInOutCubic);
    const camY = interpolate([0, K.Equilibre, K.Piege + 1.6, K.Rechauffement, K.PRP, K.Agir + 5], [720, 690, 600, 700, 780, 800], Easing.easeInOutCubic);
    const s = camS(T),
      fy = camY(T);
    const trap = MOTION.draw(K.Piege - 0.3, K.Piege + 2.4)(T);
    const bandA = MOTION.draw(K.Piege - 0.3, K.Piege + 2.2, 0, 0.9)(T);
    const bandW = MOTION.draw(K.Piege, K.Rechauffement + 2, 30, 86)(T);
    const heat = MOTION.draw(K.Rechauffement + 0.2, K.Rechauffement + 3.6, 0, 0.72)(T);
    const skyHeat = MOTION.draw(K.Rechauffement + 0.2, K.Rechauffement + 3.6, 0, 0.16)(T);
    const dx = CX - 255,
      dy = 900 - 233,
      L = Math.hypot(dx, dy);
    const sunAng = Math.atan2(dy, dx) * 180 / Math.PI;
    const rays = [0, 0.33, 0.66].map((off, i) => {
      const p = (T * 0.42 + off) % 1;
      const d = 190 + p * (L - 120);
      return {
        x: 255 + dx / L * d,
        y: 233 + dy / L * d,
        o: Math.sin(Math.PI * p) * 0.95,
        k: i
      };
    });
    const irAngles = [-115, -100, -85, -70];
    const irs = irAngles.map((a, i) => {
      const p = (T * 0.42 + i * 0.25) % 1;
      const wave = clamp(Math.sin(Math.PI * p) * 1.7, 0, 1);
      const esc = i % 2 === 0 ? 1 - trap : 0;
      const up = p < 0.48;
      const rise = up ? p / 0.48 : (1 - p) / 0.52;
      return {
        a,
        i,
        wave,
        esc,
        rEsc: RE + 30 + p * (RB + 260 - RE - 30),
        rBnc: RE + 30 + rise * (RB - 80 - RE - 30),
        dir: up ? a : a + 180,
        col: up ? '#c0553a' : C.hot
      };
    });
    const molecules = [{
      a: -108,
      l: 'CO₂'
    }, {
      a: -94,
      l: 'CH₄'
    }, {
      a: -80,
      l: 'HFC'
    }];
    const closing = MOTION.enter(K.Agir + 0.2, 0, 1, 0.8)(T);
    return /*#__PURE__*/React.createElement("div", {
      "data-screen-label": 't=' + Math.floor(T) + 's',
      style: {
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'linear-gradient(180deg,#e7eef6 0%,#f3f6fa 46%,#f7f4f0 100%)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg,rgba(255,107,53,0.55),rgba(255,107,53,0))',
        opacity: skyHeat
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        transformOrigin: '0 0',
        transform: 'translate(' + -CX * (s - 1) + 'px,' + -fy * (s - 1) + 'px) scale(' + s + ')'
      }
    }, /*#__PURE__*/React.createElement(Sun, {
      glow: 0.4 + 0.6 * heat
    }), rays.map(r => /*#__PURE__*/React.createElement(Arrow, {
      key: 'ray' + r.k,
      x: r.x,
      y: r.y,
      angle: sunAng,
      len: 120,
      thick: 13,
      head: 26,
      color: C.sun,
      opacity: r.o
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: CX - RB,
        top: CY - RB,
        width: RB * 2,
        height: RB * 2,
        borderRadius: '50%',
        boxSizing: 'border-box',
        border: bandW + 'px solid rgba(255,107,53,' + bandA * 0.30 + ')',
        opacity: bandA
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: CX - RB - 4,
        top: CY - RB - 4,
        width: (RB + 4) * 2,
        height: (RB + 4) * 2,
        borderRadius: '50%',
        boxSizing: 'border-box',
        border: '4px solid rgba(122,150,182,0.5)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: CX - RB - 4,
        top: CY - RB - 4,
        width: (RB + 4) * 2,
        height: (RB + 4) * 2,
        borderRadius: '50%',
        boxSizing: 'border-box',
        border: '4px solid rgba(255,107,53,' + bandA * 0.75 + ')'
      }
    }), irs.map(v => {
      const pe = onArc(v.a, v.rEsc),
        pb = onArc(v.a, v.rBnc);
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: 'ir' + v.i
      }, /*#__PURE__*/React.createElement(Arrow, {
        x: pe.x,
        y: pe.y,
        angle: v.a,
        len: 104,
        thick: 11,
        color: "#c0553a",
        opacity: v.wave * v.esc
      }), /*#__PURE__*/React.createElement(Arrow, {
        x: pb.x,
        y: pb.y,
        angle: v.dir,
        len: 104,
        thick: 12,
        color: v.col,
        opacity: v.wave * (1 - v.esc)
      }));
    }), /*#__PURE__*/React.createElement(Earth, {
      heat: heat
    }), molecules.map((m, i) => {
      const p = onArc(m.a, RB);
      const sc = MOTION.pop(K.Piege + 0.5 + i * 0.16, 0, 1, 0.6)(T);
      return /*#__PURE__*/React.createElement(Chip, {
        key: m.l + i,
        x: p.x,
        y: p.y,
        label: m.l,
        s: sc,
        tone: m.l === 'HFC' ? 'hot' : ''
      });
    })), /*#__PURE__*/React.createElement(Gauge, {
      T: T,
      start: K.Rechauffement + 0.3,
      leave: K.PRP - 0.4
    }), /*#__PURE__*/React.createElement(PrpCard, {
      T: T,
      appear: K.PRP + 0.2,
      leave: K.Kilometres - 0.6
    }), /*#__PURE__*/React.createElement(KmCard, {
      T: T,
      appear: K.Kilometres + 0.2,
      leave: K.Mur - 0.6
    }), /*#__PURE__*/React.createElement(Stripes, {
      T: T,
      appear: K.Mur + 0.2,
      leave: K.Agir - 0.6
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'rgba(247,249,252,0.9)',
        opacity: MOTION.enter(K.Agir - 0.2, 0, 1, 0.7)(T)
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 84,
        right: 84,
        top: 290,
        textAlign: 'center',
        opacity: closing,
        transform: 'translateY(' + (1 - closing) * 40 + 'px)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "bold 72px 'Trebuchet MS', sans-serif",
        color: C.blue,
        lineHeight: 1.14,
        textWrap: 'pretty'
      }
    }, "L'ozone, on l'a r\xE9par\xE9.", /*#__PURE__*/React.createElement("br", null), "Le climat, \xE7a se joue", /*#__PURE__*/React.createElement("br", null), "maintenant."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-block',
        marginTop: 30,
        padding: '16px 30px',
        borderRadius: 999,
        background: C.orange,
        color: '#fff',
        font: "bold 36px 'Trebuchet MS', sans-serif"
      }
    }, "R\xE9cup\xE9rer \xB7 Contr\xF4ler \xB7 Tracer")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 46,
        top: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        opacity: t.logo ? 1 : 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "bold 34px 'Trebuchet MS', sans-serif",
        color: C.blue
      }
    }, "\u2744 inerWeb"), /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.orange,
        color: '#fff',
        font: "bold 24px 'Trebuchet MS', sans-serif",
        padding: '4px 12px',
        borderRadius: 8
      }
    }, "\xC9du")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        right: 46,
        top: 48,
        font: "bold 30px 'Trebuchet MS', sans-serif",
        color: C.blue,
        opacity: t.logo ? 0.75 : 0
      }
    }, "Effet de serre & PRP"), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        right: 46,
        bottom: 26,
        font: '600 22px Calibri, sans-serif',
        color: '#8493a4',
        opacity: t.logo ? 1 : 0
      }
    }, "par F. Henninot"), t.sousTitres ? /*#__PURE__*/React.createElement(Captions, {
      style: {
        left: '6%',
        right: '6%',
        bottom: '6.5%',
        color: C.blue,
        font: FT,
        textShadow: 'none',
        background: 'rgba(255,255,255,0.94)',
        border: '3px solid ' + C.line,
        borderRadius: 20,
        padding: '20px 26px',
        lineHeight: 1.32,
        boxShadow: '0 14px 34px rgba(27,58,99,0.14)',
        textWrap: 'pretty'
      },
      items: [{
        at: K.Soleil + 0.5,
        until: K.Equilibre - 0.2,
        text: 'Le Soleil chauffe la Terre en permanence.'
      }, {
        at: K.Equilibre + 0.2,
        until: K.Piege - 0.2,
        text: "Une partie de cette chaleur repart vers l'espace : c'est l'équilibre."
      }, {
        at: K.Piege + 0.2,
        until: K.Piege + 3.4,
        text: 'Les gaz à effet de serre forment une couverture autour de la Terre.'
      }, {
        at: K.Piege + 3.4,
        until: K.Rechauffement - 0.2,
        text: 'CO₂, méthane… et les fluides frigorigènes HFC.'
      }, {
        at: K.Rechauffement + 0.2,
        until: K.Rechauffement + 3.4,
        text: "La couverture épaissit : la chaleur ne s'échappe plus."
      }, {
        at: K.Rechauffement + 3.4,
        until: K.PRP - 0.2,
        text: 'La température moyenne monte.'
      }, {
        at: K.PRP + 0.2,
        until: K.PRP + 3.4,
        text: 'Le PRP compare un fluide au CO₂, à masse égale.'
      }, {
        at: K.PRP + 3.4,
        until: K.Kilometres - 0.2,
        text: '1 kg de R404A vaut 3 922 kg de CO₂.'
      }, {
        at: K.Kilometres + 0.2,
        until: K.Kilometres + 2.8,
        text: 'En kilomètres de voiture, ça parle davantage.'
      }, {
        at: K.Kilometres + 2.8,
        until: K.Kilometres + 6,
        text: '1 kg de R404A : 26 000 km. Deux tiers du tour de la Terre.'
      }, {
        at: K.Kilometres + 6,
        until: K.Mur - 0.2,
        text: '1 kg de R290, du propane : 20 km.'
      }, {
        at: K.Mur + 0.2,
        until: K.Mur + 3.2,
        text: "En 1987, le monde entier a interdit les CFC. Ça a marché."
      }, {
        at: K.Mur + 3.2,
        until: K.Mur + 5.8,
        text: 'Pour le climat, aucun accord de ce niveau.'
      }, {
        at: K.Mur + 5.8,
        until: K.Agir - 0.2,
        text: 'Au rythme actuel, on va droit dans le mur.'
      }, {
        at: K.Agir + 0.2,
        text: "Chaque kilo récupéré, c'est autant de climat préservé."
      }]
    }) : null);
  }
  function SerrePiece() {
    const tw = useTweaks(window.TWEAK_DEFAULTS);
    const t = tw[0],
      setTweak = tw[1];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0
      }
    }, /*#__PURE__*/React.createElement(CompositionStage, {
      width: 1080,
      height: 1080,
      bg: "#f3f6fa",
      scenes: window.OM_SCENES,
      playback: window.OM_PLAYBACK
    }, /*#__PURE__*/React.createElement(Piece, {
      t: t
    })), /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
      label: "Affichage"
    }), /*#__PURE__*/React.createElement(TweakToggle, {
      label: "Sous-titres",
      value: t.sousTitres,
      onChange: v => setTweak('sousTitres', v)
    }), /*#__PURE__*/React.createElement(TweakToggle, {
      label: "Bandeau inerWeb \xC9du",
      value: t.logo,
      onChange: v => setTweak('logo', v)
    }), /*#__PURE__*/React.createElement(TweakSection, {
      label: "Outils"
    }), /*#__PURE__*/React.createElement(TweakToggle, {
      label: "Motion editor",
      value: t.motionEditor,
      onChange: v => setTweak('motionEditor', v)
    })));
  }
  window.SerrePiece = SerrePiece;
})();
