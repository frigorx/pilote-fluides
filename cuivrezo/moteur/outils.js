/* CuivRézo — outils interactifs posés dans une figure ({ outil: 'identifier' }).
   CONTRAT : CuivOutils.<nom>(boite, spec) remplit la boîte de la figure.
   · identifier : l'élève saisit sa mesure en mm, l'outil nomme le tube frigorifique le plus proche.
   · convertir  : l'élève touche une fraction de pouce, l'outil pose le calcul × 25,4.
   Tableau : fiche S1.1 de F. Henninot (pouces × 25,4, arrondi à deux décimales). D'autres fiches
   tronquent (9,52 ; 15,87) : la règle d'arrondi est à confirmer par F. Henninot. */

const CuivOutils = (() => {
  'use strict';
  const TUBES = [['1/4', 0.25], ['5/16', 0.3125], ['3/8', 0.375], ['1/2', 0.5], ['5/8', 0.625], ['3/4', 0.75],
                 ['7/8', 0.875], ['1', 1], ['1 1/8', 1.125], ['1 3/8', 1.375]];
  /* arrondi au centième, calculé en entiers : 0,375 × 25,4 = 9,525 doit donner 9,53 (le calcul en
     virgule flottante donne 9,5249… et arrondissait à 9,52) */
  const mm = p => Math.round(Math.round(p * 25400) / 10) / 100;
  const fr = n => n.toFixed(2).replace('.', ',');
  const el = (t, css, txt) => { const n = document.createElement(t); if (css) n.style.cssText = css; if (txt != null) n.textContent = txt; return n; };
  const TOL = 0.4;   /* écart au-delà duquel on ne nomme pas le tube : à valider */

  function tableau(actif) {
    const t = el('table', 'width:100%;border-collapse:collapse;font-size:.85em;background:#fffdf8');
    const h = t.insertRow(); ['Tube', 'Diamètre extérieur'].forEach(x => { const c = el('th', 'text-align:left;padding:.3rem .5rem;border-bottom:2px solid #1b3a63;color:#1b3a63', x); h.append(c); });
    TUBES.forEach(([n, p]) => {
      const r = t.insertRow(); const on = n === actif;
      r.style.cssText = on ? 'background:#f3dcc6;font-weight:800' : '';
      [n + '″', fr(mm(p)) + ' mm'].forEach(x => { const c = r.insertCell(); c.textContent = x; c.style.cssText = 'padding:.28rem .5rem;border-bottom:1px solid rgba(27,58,99,.18)'; });
    });
    return t;
  }

  function identifier(boite) {
    const zone = el('div', 'width:100%;display:flex;flex-direction:column;gap:.6rem');
    const ligne = el('label', 'display:flex;gap:.6rem;align-items:center;flex-wrap:wrap;font-weight:700;color:#1b3a63');
    const champ = el('input', 'font:inherit;font-size:1.3em;width:7em;min-height:60px;padding:.2rem .6rem;border:3px solid #1b3a63;border-radius:12px;background:#fff');
    Object.assign(champ, { type: 'text', inputMode: 'decimal', placeholder: '9,5', autocomplete: 'off' });
    ligne.append('Votre mesure :', champ, 'mm');
    const verdict = el('div', 'min-height:3.2em;font-weight:800;border-radius:12px;padding:.5rem .7rem;background:#fff4e0;color:#8a5300', 'Tapez la valeur lue au pied à coulisse.');
    const tab = el('div');
    tab.append(tableau(null));
    const calculer = () => {
      const v = parseFloat(champ.value.replace(',', '.'));
      if (!(v > 0)) { verdict.textContent = 'Tapez la valeur lue au pied à coulisse.'; tab.replaceChildren(tableau(null)); return; }
      let best = null;
      TUBES.forEach(([n, p]) => { const e = Math.abs(mm(p) - v); if (!best || e < best.e) best = { n, p, e }; });
      if (best.e <= TOL) {
        verdict.style.cssText += ';background:#e3f5ec;color:#1e7e54';
        verdict.textContent = 'Tube ' + best.n + '″ : ' + fr(mm(best.p)) + ' mm (écart ' + fr(best.e) + ' mm)';
        tab.replaceChildren(tableau(best.n));
      } else {
        verdict.style.cssText += ';background:#fbe7e4;color:#b3261e';
        verdict.textContent = 'Aucun tube usuel à ' + fr(v) + ' mm. Vérifiez le zéro, et que les becs touchent l’extérieur du tube.';
        tab.replaceChildren(tableau(null));
      }
    };
    champ.addEventListener('input', calculer);
    zone.append(ligne, verdict, tab);
    boite.append(zone);
  }

  function convertir(boite) {
    const zone = el('div', 'width:100%;display:flex;flex-direction:column;gap:.6rem');
    const boutons = el('div', 'display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:.35rem');
    const calc = el('div', 'min-height:5.5em;border-radius:12px;padding:.6rem .8rem;background:#f3dcc6;font-size:1.1em;color:#10233c', 'Touchez une fraction de pouce.');
    TUBES.forEach(([n, p]) => {
      const b = el('button', 'min-height:60px;border:3px solid #1b3a63;border-radius:12px;background:#fffdf8;color:#1b3a63;font:inherit;font-weight:800', n + '″');
      b.type = 'button';
      b.addEventListener('click', () => {
        const dec = String(p).replace('.', ',');
        calc.replaceChildren(
          el('div', 'font-weight:800;color:#1b3a63', n + '″ = ' + dec + ' pouce'),
          el('div', 'white-space:nowrap', dec + ' × 25,4 = ' + (p * 25.4).toFixed(3).replace('.', ',') + ' mm'),
          el('div', 'font-weight:800;color:#b8692e', 'arrondi : ' + fr(mm(p)) + ' mm'));
      });
      boutons.append(b);
    });
    zone.append(boutons, calc);
    boite.append(zone);
  }

  return { identifier, convertir };
})();
