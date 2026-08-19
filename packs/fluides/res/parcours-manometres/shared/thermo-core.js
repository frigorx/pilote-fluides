/*
 * Noyau pression-température local.
 *
 * Le dessin du manomètre provient du module ManoPub V4.0 récupéré, mais les
 * anciennes corrélations simplifiées ont été remplacées par des tables
 * statiques contrôlées. Les pressions ci-dessous sont ABSOLUES, en bar.
 * Interpolation linéaire entre deux points espacés de 5 K.
 */
(function (root) {
  "use strict";

  const ATM_BAR = 1.01325;
  const points = values => values.map(([t, p]) => Object.freeze({ t, p }));

  const DB = Object.freeze({
    R134a: {
      label: "R-134a", safety: "A1", glide: 0,
      tables: { single: points([[-50,.29451],[-45,.39117],[-40,.51209],[-35,.66144],[-30,.84378],[-25,1.064],[-20,1.32735],[-15,1.6394],[-10,2.00603],[-5,2.43342],[0,2.92803],[5,3.49659],[10,4.14607],[15,4.88374],[20,5.71707],[25,6.65381],[30,7.70196],[35,8.86981],[40,10.16593],[45,11.59924],[50,13.17905],[55,14.91514],[60,16.81784]]) }
    },
    R32: {
      label: "R-32", safety: "A2L", glide: 0,
      tables: { single: points([[-50,1.10143],[-45,1.4062],[-40,1.77411],[-35,2.2138],[-30,2.73442],[-25,3.34562],[-20,4.05753],[-15,4.88075],[-10,5.82632],[-5,6.90576],[0,8.13101],[5,9.51448],[10,11.06905],[15,12.80813],[20,14.74566],[25,16.89621],[30,19.27507],[35,21.89834],[40,24.78313],[45,27.94781],[50,31.41233],[55,35.19878],[60,39.33231]]) }
    },
    R410A: {
      label: "R-410A", safety: "A1", glide: .1,
      tables: {
        dew: points([[-50,1.0855],[-45,1.38599],[-40,1.7485],[-35,2.18138],[-30,2.69349],[-25,3.29413],[-20,3.99305],[-15,4.8004],[-10,5.72676],[-5,6.7831],[0,7.98083],[5,9.33176],[10,10.84818],[15,12.5429],[20,14.42927],[25,16.52138],[30,18.83408],[35,21.38327],[40,24.18609],[45,27.26131],[50,30.62993],[55,34.31601],[60,38.34828]]),
        bubble: points([[-50,1.08977],[-45,1.39127],[-40,1.75498],[-35,2.1893],[-30,2.70309],[-25,3.30569],[-20,4.00685],[-15,4.81677],[-10,5.74604],[-5,6.80566],[0,8.00705],[5,9.36207],[10,10.88301],[15,12.58269],[20,14.47451],[25,16.57249],[30,18.89146],[35,21.44714],[40,24.25642],[45,27.33757],[50,30.71072],[55,34.39839],[60,38.42649]])
      }
    },
    R404A: {
      label: "R-404A", safety: "A1", glide: .5,
      tables: {
        dew: points([[-50,.81009],[-45,1.03652],[-40,1.3098],[-35,1.63621],[-30,2.02234],[-25,2.47512],[-20,3.0018],[-15,3.60991],[-10,4.3073],[-5,5.10209],[0,6.00273],[5,7.01796],[10,8.15688],[15,9.42893],[20,10.84398],[25,12.41235],[30,14.1449],[35,16.05317],[40,18.14949],[45,20.44728],[50,22.96147],[55,25.70934],[60,28.71219]]),
        bubble: points([[-50,.84236],[-45,1.07399],[-40,1.35289],[-35,1.68531],[-30,2.07783],[-25,2.53734],[-20,3.07103],[-15,3.68641],[-10,4.39124],[-5,5.19359],[0,6.10181],[5,7.12455],[10,8.27078],[15,9.54985],[20,10.97146],[25,12.5458],[30,14.28356],[35,16.19606],[40,18.29543],[45,20.5948],[50,23.1087],[55,25.85376],[60,28.85]])
      }
    },
    R407C: {
      label: "R-407C", safety: "A1", glide: 7,
      tables: {
        dew: points([[-50,.50222],[-45,.6606],[-40,.85674],[-35,1.09671],[-30,1.38703],[-25,1.7347],[-20,2.14713],[-15,2.63215],[-10,3.19802],[-5,3.85337],[0,4.60724],[5,5.46906],[10,6.44868],[15,7.55638],[20,8.80289],[25,10.19949],[30,11.75801],[35,13.49101],[40,15.41186],[45,17.535],[50,19.8762],[55,22.45306],[60,25.28577]]),
        bubble: points([[-50,.73826],[-45,.94802],[-40,1.20252],[-35,1.50805],[-30,1.87128],[-25,2.29927],[-20,2.79938],[-15,3.37929],[-10,4.04697],[-5,4.81067],[0,5.6789],[5,6.66039],[10,7.76413],[15,8.99935],[20,10.37551],[25,11.90236],[30,13.58989],[35,15.44843],[40,17.48864],[45,19.72159],[50,22.15879],[55,24.81224],[60,27.69448]])
      }
    },
    R290: {
      label: "R-290", safety: "A3", glide: 0,
      tables: { single: points([[-50,.70569],[-45,.89051],[-40,1.11121],[-35,1.37226],[-30,1.67832],[-25,2.03428],[-20,2.44518],[-15,2.91624],[-10,3.4528],[-5,4.06037],[0,4.74458],[5,5.51117],[10,6.36602],[15,7.31512],[20,8.36461],[25,9.52075],[30,10.78995],[35,12.17883],[40,13.6942],[45,15.34314],[50,17.13304],[55,19.07172],[60,21.16753]]) }
    }
  });

  function tableFor(fluid, phase) {
    const tables = DB[fluid]?.tables;
    return tables?.single || tables?.[phase] || tables?.dew || null;
  }

  function interpolate(input, a, b, xKey, yKey) {
    if (a[xKey] === b[xKey]) return a[yKey];
    const ratio = (input - a[xKey]) / (b[xKey] - a[xKey]);
    return a[yKey] + ratio * (b[yKey] - a[yKey]);
  }

  function valueFromTable(input, table, xKey, yKey) {
    if (!table || !Number.isFinite(input)) return NaN;
    const first = table[0];
    const last = table[table.length - 1];
    if (input < first[xKey] || input > last[xKey]) return NaN;
    if (input === first[xKey]) return first[yKey];
    for (let i = 1; i < table.length; i += 1) {
      if (input <= table[i][xKey]) return interpolate(input, table[i - 1], table[i], xKey, yKey);
    }
    return last[yKey];
  }

  function pressureAtTemperature(fluid, temperatureC, phase = "dew") {
    return valueFromTable(temperatureC, tableFor(fluid, phase), "t", "p");
  }

  function temperatureAtPressure(fluid, pressureAbsBar, phase = "dew") {
    return valueFromTable(pressureAbsBar, tableFor(fluid, phase), "p", "t");
  }

  function limits(fluid, phase = "dew") {
    const table = tableFor(fluid, phase);
    if (!table) return null;
    return {
      Tmin: table[0].t,
      Tmax: table[table.length - 1].t,
      PminAbs: table[0].p,
      PmaxAbs: table[table.length - 1].p
    };
  }

  function toGauge(pressureAbsBar, atmosphericBar = ATM_BAR) {
    return pressureAbsBar - atmosphericBar;
  }

  function toAbsolute(pressureGaugeBar, atmosphericBar = ATM_BAR) {
    return pressureGaugeBar + atmosphericBar;
  }

  function pressureGaugeAtTemperature(fluid, temperatureC, phase = "dew", atmosphericBar = ATM_BAR) {
    return toGauge(pressureAtTemperature(fluid, temperatureC, phase), atmosphericBar);
  }

  function temperatureAtGaugePressure(fluid, pressureGaugeBar, phase = "dew", atmosphericBar = ATM_BAR) {
    return temperatureAtPressure(fluid, toAbsolute(pressureGaugeBar, atmosphericBar), phase);
  }

  root.ThermoCore = Object.freeze({
    version: "5.0.0-inerweb-static-tables",
    ATM_BAR,
    list: () => Object.keys(DB),
    meta: fluid => DB[fluid] ? { label: DB[fluid].label, safety: DB[fluid].safety, glide: DB[fluid].glide } : null,
    limits,
    pressureAtTemperature,
    temperatureAtPressure,
    pressureGaugeAtTemperature,
    temperatureAtGaugePressure,
    toGauge,
    toAbsolute
  });
}(window));
