/* ÉlectroRézo — les scènes des stations 6.A, 6.B et 6.C : le champ magnétique.

   Le mouvement d'abord (F. Henninot, 29/10/2026). Chaque scène avance par étapes, au ralenti ; les mots
   sont sous le dessin, jamais sur un tracé. La voix presse les boutons (window.GUIDAGE, moteur dans
   station.js). Les couleurs reprennent l'animation du courant induit de la 9.6 : la bobine en cuivre,
   le champ en bleu tireté, l'anneau en orange, le courant en points clairs qui avancent.
   Les faits viennent de LIGNE-6-CHAMP-FAITS.md. Une boussole : la pointe rouge est son pôle nord. */

const SchemasChamp = (() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const C = { navy: '#1b3a63', champ: '#2563eb', champClair: '#93c5fd', cuivre: '#c2410c', cuivreDos: '#e8a87c',
              anneau: '#ea580c', fer: '#9aa4b2', ferBord: '#637285', nord: '#c0392b', sud: '#2e6f9e',
              papier: '#fffdf8', creme: '#f7f1e7', gris: '#637285', point: '#fff7ed', pointBord: '#7c2d12' };
  const mk = (tag, at, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in at) e.setAttribute(k, at[k]);
    if (parent) parent.appendChild(e);
    return e;
  };
  const f1 = v => (+v).toFixed(1);
  const vers = (a, b, k) => a + (b - a) * k;
  const angleVers = (a, b, k) => a + ((((b - a) % 360) + 540) % 360 - 180) * k;
  const deg = (x, y) => Math.atan2(y, x) * 180 / Math.PI;
  const calme = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ------------------------------------------------------------ la figure à étapes
     o : { titre, aide, aria, vb, etapes: [[bouton, texte]], monter(svg) → { etape(k), anim(dt, t) } }
     Le mouvement ralentit avec prefers-reduced-motion, il ne s'arrête pas : il porte le sens. */
  function figure(o) {
    const f = document.createElement('figure');
    f.className = 'champ-fig';
    f.style.cssText = 'margin:.4rem 0 .9rem;padding:.6rem;background:' + C.papier + ';border:1px solid #e6dcc8;border-radius:14px';
    const s = mk('svg', { viewBox: o.vb, role: 'img', 'aria-label': o.aria, class: 'scene' });
    s.style.cssText = 'width:100%;max-width:640px;display:block;margin:0 auto';
    f.appendChild(s);
    const ctrl = o.monter(s);
    const barre = document.createElement('div');
    barre.className = 'choix';
    barre.style.cssText = 'display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center;margin:.55rem 0';
    const leg = document.createElement('p');
    leg.className = 'legende';
    leg.setAttribute('aria-live', 'polite');
    leg.style.fontSize = '1rem';
    const cap = document.createElement('figcaption');
    const fort = document.createElement('strong');
    fort.textContent = o.titre;
    cap.append(fort, document.createTextNode(' ' + o.aide));

    const vitesse = calme() ? 0.35 : 1;
    let boucle = null, avant = 0, essais = 0, t = 0;
    const tic = now => {
      /* le temps écoulé, découpé en pas courts : la scène avance au même rythme sur un appareil lent */
      let reste = Math.min(0.5, Math.max(0, (now - avant) / 1000)) * vitesse;
      avant = now;
      do { const dt = Math.min(0.03, reste); reste -= dt; t += dt; ctrl.anim(dt, t); } while (reste > 1e-6);
      if (document.body.contains(f)) { essais = 0; boucle = requestAnimationFrame(tic); }
      else if (++essais < 30) boucle = requestAnimationFrame(tic);   /* pas encore posée dans la page */
      else boucle = null;
    };
    const lancer = () => { if (!boucle) { avant = performance.now(); boucle = requestAnimationFrame(tic); } };
    const choisir = k => {
      ctrl.etape(k);
      leg.textContent = o.etapes[k][1];
      barre.querySelectorAll('button').forEach((x, j) => x.setAttribute('aria-pressed', String(j === k)));
      lancer();
    };
    o.etapes.forEach(([nom], k) => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = nom;
      b.addEventListener('click', () => choisir(k));
      barre.appendChild(b);
    });
    f.append(barre, leg, cap);
    choisir(0);
    return f;
  }

  /* ------------------------------------------------------------ pièces communes */
  /* Une boussole : angle en degrés à l'écran, 0 vers la droite, -90 vers le haut (le nord de la Terre). */
  function boussole(parent, x, y, L) {
    const g = mk('g', {}, parent);
    mk('circle', { cx: x, cy: y, r: L + 4, fill: C.papier, stroke: '#c9c2b4', 'stroke-width': 1.5 }, g);
    const a = mk('g', {}, g);
    mk('polygon', { points: `${L},0 0,${-L * 0.24} 0,${L * 0.24}`, fill: C.nord }, a);
    mk('polygon', { points: `${-L},0 0,${-L * 0.24} 0,${L * 0.24}`, fill: '#d5dbe3', stroke: C.ferBord, 'stroke-width': 1 }, a);
    mk('circle', { r: 2.6, fill: C.navy }, a);
    const b = { g, x, y, angle: -90, cible: -90 };
    b.poser = () => a.setAttribute('transform', `translate(${x} ${y}) rotate(${f1(b.angle)})`);
    b.suivre = k => { b.angle = angleVers(b.angle, b.cible, k); b.poser(); };
    b.poser();
    return b;
  }

  /* Le nord de la Terre, en haut à gauche : une flèche et la lettre N, à l'écart de tout tracé. */
  function nordTerre(parent, x, y) {
    mk('line', { x1: x, y1: y + 34, x2: x, y2: y + 8, stroke: C.gris, 'stroke-width': 3 }, parent);
    mk('polygon', { points: `${x},${y} ${x - 7},${y + 12} ${x + 7},${y + 12}`, fill: C.gris }, parent);
    const t = mk('text', { x: x + 12, y: y + 16, 'font-size': 18, 'font-weight': 700, fill: C.gris }, parent);
    t.textContent = 'N';
  }

  /* Le champ de deux pôles : nord en (xn, y0), sud en (xs, y0). */
  function champDeuxPoles(px, py, xn, xs, y0) {
    const ax = px - xn, ay = py - y0, an = Math.pow(Math.hypot(ax, ay), 3) || 1;
    const bx = px - xs, by = py - y0, bn = Math.pow(Math.hypot(bx, by), 3) || 1;
    return [ax / an - bx / bn, ay / an - by / bn];
  }

  /* Les lignes de champ du dehors : elles partent du pôle nord vers l'extérieur et finissent au pôle sud. */
  function lignesDehors(xn, xs, y0, n, cadre) {
    const vSud = Math.sign(xs - xn);
    const d = [];
    for (let k = 0; k < n; k++) {
      const a = (k + 0.5) / n * 2 * Math.PI;
      if (Math.cos(a) * vSud > 0.9) continue;   /* pas droit vers le pôle sud : cette ligne passerait dans l'aimant */
      let x = xn + 5 * Math.cos(a), y = y0 + 5 * Math.sin(a);
      const pts = [[x, y]];
      for (let i = 0; i < 1400; i++) {
        const [bx, by] = champDeuxPoles(x, y, xn, xs, y0);
        const m = Math.hypot(bx, by); if (!m) break;
        x += 2.5 * bx / m; y += 2.5 * by / m;
        pts.push([x, y]);
        if (Math.hypot(x - xs, y - y0) < 5) break;
        if (x < cadre[0] || x > cadre[2] || y < cadre[1] || y > cadre[3]) break;
      }
      d.push('M' + pts.map(p => f1(p[0]) + ' ' + f1(p[1])).join(' L'));
    }
    /* côté sud, l'éventail qui arrive de loin : tracé à rebours, puis remis dans le sens du champ */
    for (let k = 0; k < n; k++) {
      const a = (k + 0.5) / n * 2 * Math.PI;
      if (Math.cos(a) * vSud < 0.5) continue;
      let x = xs + 5 * Math.cos(a), y = y0 + 5 * Math.sin(a);
      const pts = [[x, y]];
      for (let i = 0; i < 1400; i++) {
        const [bx, by] = champDeuxPoles(x, y, xn, xs, y0);
        const m = Math.hypot(bx, by); if (!m) break;
        x -= 2.5 * bx / m; y -= 2.5 * by / m;
        pts.push([x, y]);
        if (x < cadre[0] || x > cadre[2] || y < cadre[1] || y > cadre[3]) break;
      }
      d.push('M' + pts.reverse().map(p => f1(p[0]) + ' ' + f1(p[1])).join(' L'));
    }
    return d;
  }

  /* Un groupe de lignes de champ animées : le tireté avance dans le sens du champ. */
  function faisceau(parent, chemins, epaisseur) {
    const g = mk('g', { fill: 'none', stroke: C.champ, 'stroke-width': epaisseur || 2.2, 'stroke-dasharray': '9 7' }, parent);
    const p = chemins.map(d => mk('path', { d }, g));
    return { g, p, decal: 0, defiler(v) { this.decal -= v; p.forEach(x => x.setAttribute('stroke-dashoffset', f1(this.decal))); } };
  }

  /* Une bobine horizontale : arcs du dos, noyau éventuel, arcs de face, et les points du courant. */
  function bobine(parent, x0, x1, cy, r, n) {
    const dos = mk('g', { fill: 'none', stroke: C.cuivreDos, 'stroke-width': 2 }, parent);
    const noyau = mk('g', {}, parent);
    const face = mk('g', { fill: 'none', stroke: C.cuivre, 'stroke-width': 4, 'stroke-linecap': 'round' }, parent);
    const xs = [];
    for (let k = 0; k < n; k++) {
      const x = x0 + (x1 - x0) * k / (n - 1);
      xs.push(x);
      mk('path', { d: `M${f1(x)} ${cy - r} A 7 ${r} 0 0 0 ${f1(x)} ${cy + r}` }, dos);
      mk('path', { d: `M${f1(x)} ${cy - r} A 7 ${r} 0 0 1 ${f1(x)} ${cy + r}` }, face);
    }
    const points = xs.map(x => mk('circle', { cx: x, cy, r: 3.6, fill: C.point, stroke: C.pointBord, 'stroke-width': 1.4, opacity: 0 }, parent));
    let phase = 0;
    return {
      noyau, xs,
      /* sens : +1, -1 ou 0 (pas de courant) ; les points descendent ou montent sur l'arc de face */
      courant(dt, sens, vitesse) {
        phase += dt * (vitesse || 0.9) * sens;
        points.forEach((p, k) => {
          const u = ((phase + k * 0.17) % 1 + 1) % 1;
          const a = -Math.PI / 2 + u * Math.PI;
          p.setAttribute('cx', f1(xs[k] + 7 * Math.cos(a)));
          p.setAttribute('cy', f1(cy + r * Math.sin(a)));
          p.setAttribute('opacity', sens ? 1 : 0);
        });
      }
    };
  }

  /* Une face de pôle : ovale coloré, lettre dessus ; rien quand elle est neutre. */
  function facePole(parent, x, y, ry) {
    const g = mk('g', {}, parent);
    const e = mk('ellipse', { cx: x, cy: y, rx: 12, ry, fill: '#e5e1d8', stroke: C.ferBord, 'stroke-width': 1.5 }, g);
    const t = mk('text', { x, y: y + 7, 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700, fill: '#fff' }, g);
    return {
      g,
      poser(pole) {
        e.setAttribute('fill', pole === 'N' ? C.nord : pole === 'S' ? C.sud : '#e5e1d8');
        t.textContent = pole || '';
      }
    };
  }

  /* ============================================================ 6.A — d'où vient le champ */
  const ETAPES_A = [
    ['1 L’aimant', "Un aimant droit : son pôle nord est en rouge, son pôle sud en bleu. Les lignes de champ, en bleu tireté, sortent du pôle nord et rentrent par le pôle sud. Chaque boussole se place le long d’une ligne : sa pointe rouge montre où va le champ."],
    ['2 Le fil', "Un fil traverse un carton. Le courant monte dans le fil, en points clairs. Les boussoles posées sur le carton tournent et s’alignent sur des cercles autour du fil : le courant crée un champ."],
    ['3 Le courant inversé', "Le courant descend maintenant. Toutes les boussoles se retournent : le sens du champ suit le sens du courant."],
    ['4 La bobine', "Le fil est enroulé en bobine. Le courant passe : la bobine se comporte comme un aimant, avec un pôle nord et un pôle sud. La boussole du coin, en haut à droite, est loin de la bobine : elle montre toujours le nord de la Terre."],
    ['5 Le noyau de fer', "On glisse un noyau de fer dans la bobine. Le champ devient plus fort : la boussole du coin, qui ne sentait que la Terre, dévie. Elle sent maintenant le champ de la bobine."],
    ['6 Le courant coupé', "On coupe le courant. Le champ de la bobine disparaît, et toutes les boussoles reviennent vers le nord de la Terre. Le noyau de fer ne garde pas d’aimantation."]
  ];

  function sources() {
    return figure({
      titre: 'D’où vient le champ, en six étapes.',
      aide: 'Appuyez sur les étapes, une par une. En haut à gauche, la flèche N montre le nord de la Terre.',
      aria: "Six étapes. Un aimant droit et ses lignes de champ, entouré de boussoles. Puis un fil vertical qui traverse un carton, entouré de boussoles en cercle. Puis une bobine, avec et sans noyau de fer, et une boussole éloignée dans le coin.",
      vb: '0 0 640 330', etapes: ETAPES_A,
      monter(s) {
        const W = 640, H = 330, CX = 320, CY = 165;
        mk('rect', { x: 2, y: 2, width: W - 4, height: H - 4, rx: 14, fill: C.papier, stroke: 'rgba(27,58,99,.18)' }, s);
        nordTerre(s, 30, 18);

        /* ---- tableau 1 : l'aimant, puis la bobine (même champ dehors) */
        const gDipole = mk('g', {}, s);
        let lignes = null, lignesDedans = null;
        const gLignes = mk('g', {}, gDipole);
        const aimant = mk('g', {}, gDipole);
        mk('rect', { x: 240, y: 150, width: 80, height: 30, fill: C.sud }, aimant);
        mk('rect', { x: 320, y: 150, width: 80, height: 30, fill: C.nord }, aimant);
        const tS = mk('text', { x: 280, y: 174, 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700, fill: '#fff' }, aimant); tS.textContent = 'S';
        const tN = mk('text', { x: 360, y: 174, 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700, fill: '#fff' }, aimant); tN.textContent = 'N';
        const gBob = mk('g', {}, gDipole);
        /* fils d'amenée et pile, sous la bobine */
        mk('path', { d: 'M250 203 V286 H306 M334 286 H390 V203', fill: 'none', stroke: C.cuivre, 'stroke-width': 3 }, gBob);
        mk('line', { x1: 306, y1: 270, x2: 306, y2: 302, stroke: C.navy, 'stroke-width': 4 }, gBob);
        mk('line', { x1: 334, y1: 277, x2: 334, y2: 295, stroke: C.navy, 'stroke-width': 7 }, gBob);
        const bob = bobine(gBob, 250, 390, CY, 38, 11);
        const noyau = mk('rect', { x: 226, y: 151, width: 188, height: 28, rx: 3, fill: C.fer, stroke: C.ferBord, 'stroke-width': 2 }, bob.noyau);
        let noyauX = -420;
        const faceG = facePole(gBob, 238, CY, 30), faceD = facePole(gBob, 402, CY, 30);

        /* ---- tableau 2 : le fil à travers le carton */
        const gFil = mk('g', {}, s);
        const FX = 320, FY = 196;
        mk('line', { x1: FX, y1: FY, x2: FX, y2: 318, stroke: C.cuivre, 'stroke-width': 6 }, gFil);
        mk('polygon', { points: '40,288 170,108 600,108 470,288', fill: '#efe6d3', stroke: '#c9b88f', 'stroke-width': 2, opacity: 0.95 }, gFil);
        const cercles = [80, 150, 215].map(rx => {
          const ry = rx * 0.36;
          return `M${FX + rx} ${FY} A ${rx} ${ry} 0 0 0 ${FX - rx} ${FY} A ${rx} ${ry} 0 0 0 ${FX + rx} ${FY}`;
        });
        const fFil = faisceau(gFil, cercles, 2.2);
        mk('line', { x1: FX, y1: 14, x2: FX, y2: FY, stroke: C.cuivre, 'stroke-width': 6 }, gFil);
        const ptsFil = [0, 1, 2, 3, 4, 5].map(() => mk('circle', { cx: FX, cy: 0, r: 3.6, fill: C.point, stroke: C.pointBord, 'stroke-width': 1.4 }, gFil));
        const bFil = [0, 60, 120, 180, 240, 300].map(d => {
          const a = d * Math.PI / 180, rx = 150, ry = 54;
          const b = boussole(gFil, FX + rx * Math.cos(a), FY + ry * Math.sin(a), 19);
          b.tangente = [rx * Math.sin(a), -ry * Math.cos(a)];   /* le sens du champ quand le courant monte */
          return b;
        });

        /* ---- les boussoles autour de l'aimant ou de la bobine, et celle du coin */
        const bProches = [[320, 64], [320, 268], [150, 165], [490, 165], [196, 88], [444, 88], [196, 242], [444, 242]]
          .map(([x, y]) => boussole(gDipole, x, y, 14));
        const bLoin = boussole(gDipole, 596, 52, 16);

        let etape = 0, sens = 1, intensite = 1, fondu = 1;
        const tracer = (nordADroite, dense) => {
          gLignes.innerHTML = '';
          const xn = nordADroite ? 400 : 240, xs = nordADroite ? 240 : 400;
          lignes = faisceau(gLignes, lignesDehors(xn, xs, CY, dense ? 30 : 22, [10, 10, W - 10, H - 10]), dense ? 3 : 2.2);
          const dedans = [-18, -6, 6, 18].map(dy => nordADroite ? `M240 ${CY + dy} L400 ${CY + dy}` : `M400 ${CY + dy} L240 ${CY + dy}`);
          lignesDedans = faisceau(gLignes, dedans, dense ? 3 : 2.2);
          lignesDedans.g.style.display = etape === 0 ? 'none' : '';
          bProches.forEach(b => {
            const [bx, by] = champDeuxPoles(b.x, b.y, xn, xs, CY);
            b.cible = deg(bx, by);
          });
          /* la boussole du coin : le champ de la bobine contre celui de la Terre */
          const [bx, by] = champDeuxPoles(bLoin.x, bLoin.y, xn, xs, CY);
          const m = Math.hypot(bx, by), k = dense ? 6 : 0.25;
          bLoin.cible = deg(k * bx / m, k * by / m - 1);
        };

        return {
          etape(k) {
            etape = k;
            const avecFil = k === 1 || k === 2;
            gFil.style.display = avecFil ? '' : 'none';
            gDipole.style.display = avecFil ? 'none' : '';
            aimant.style.display = k === 0 ? '' : 'none';
            gBob.style.display = k >= 3 ? '' : 'none';
            sens = k === 2 ? -1 : 1;
            intensite = k === 5 ? 0 : 1;
            if (k === 3) noyauX = -420;
            if (k <= 3 || k === 0) fondu = 1;
            if (avecFil) bFil.forEach(b => { b.cible = deg(sens * b.tangente[0], sens * b.tangente[1]); });
            else tracer(true, k === 4 || k === 5);
            if (k === 5) { bProches.forEach(b => { b.cible = -90; }); bLoin.cible = -90; }
            faceG.poser(k >= 3 && k < 5 ? 'S' : null); faceD.poser(k >= 3 && k < 5 ? 'N' : null);
          },
          anim(dt, t) {
            if (etape === 1 || etape === 2) {
              fFil.defiler(dt * 26 * sens);
              ptsFil.forEach((p, i) => {
                const u = ((t * 0.35 * sens + i / 6) % 1 + 1) % 1;
                p.setAttribute('cy', f1(318 - u * 304));
              });
              bFil.forEach(b => b.suivre(Math.min(1, dt * 3)));
              return;
            }
            if (lignes) {
              fondu = vers(fondu, intensite, Math.min(1, dt * 1.5));
              lignes.g.setAttribute('opacity', f1(fondu));
              lignesDedans.g.setAttribute('opacity', f1(fondu));
              lignes.defiler(dt * 26 * intensite); lignesDedans.defiler(dt * 26 * intensite);
            }
            if (etape >= 3) {
              bob.courant(dt, intensite ? 1 : 0);
              noyauX = etape >= 4 ? vers(noyauX, 0, Math.min(1, dt * 2.2)) : -420;
              noyau.setAttribute('transform', `translate(${f1(noyauX)} 0)`);
            }
            bProches.forEach(b => b.suivre(Math.min(1, dt * 2.5)));
            bLoin.suivre(Math.min(1, dt * 1.6));
          }
        };
      }
    });
  }

  /* ============================================================ 6.B — ce que fait le champ */
  const ETAPES_B = [
    ['1 Il attire le fer', "La bobine, enroulée sur son noyau de fer, est alimentée. Le champ attire la plaque de fer, l’armature, qui vient se coller malgré le ressort. C’est ce que fait la bobine d’un contacteur (station 6.1)."],
    ['2 Il oriente un aimant', "Une boussole est posée près d’un aimant. Elle tourne, hésite, puis se place le long des lignes de champ. Sa pointe grise, son pôle sud, regarde le pôle nord de l’aimant : les pôles de noms contraires s’attirent."],
    ['3 Il pousse un fil', "Un fil est posé entre les deux pôles d’un aimant, en travers des lignes de champ. Le courant passe, de l’arrière vers vous : le fil est poussé sur le côté, vers la droite. Le pointillé marque sa place de départ."],
    ['4 Le courant inversé', "Le courant change de sens : il va maintenant de vous vers l’arrière. Le fil est poussé de l’autre côté, vers la gauche."],
    ['5 Le fil le long des lignes', "On tourne le fil dans le sens des lignes de champ, de haut en bas. Le courant passe, et le fil ne bouge pas."],
    ['6 Le cadre tourne', "Un cadre de fil est posé dans le champ, entre un pôle nord à gauche et un pôle sud à droite. Le courant monte d’un côté du cadre et descend de l’autre : les deux côtés sont poussés en sens contraires, et le cadre tourne sur son axe. Un petit ressort en spirale le retient : il s’arrête un peu plus loin. C’est le principe des appareils de mesure à aiguille."],
    ['7 Le champ tourne', "Dans un moteur triphasé, trois bobines fixes et trois courants décalés créent un champ qui tourne : son pôle nord et son pôle sud font le tour du stator (station 2.6). Le rotor est poussé par ce champ et le suit, un peu moins vite (station 6.3)."]
  ];

  function effets() {
    return figure({
      titre: 'Ce que fait le champ, en sept étapes.',
      aide: 'Appuyez sur les étapes, une par une. Les points clairs sont le courant ; le bleu tireté, le champ.',
      aria: "Sept étapes. Une bobine attire une plaque de fer. Une boussole s’oriente près d’un aimant. Un fil, entre les deux pôles d’un aimant, est poussé sur le côté. Un cadre de fil tourne dans le champ. Le champ d’un moteur tourne et entraîne le rotor.",
      vb: '0 0 640 330', etapes: ETAPES_B,
      monter(s) {
        const W = 640, H = 330;
        mk('rect', { x: 2, y: 2, width: W - 4, height: H - 4, rx: 14, fill: C.papier, stroke: 'rgba(27,58,99,.18)' }, s);
        const tableaux = [mk('g', {}, s), mk('g', {}, s), mk('g', {}, s), mk('g', {}, s), mk('g', {}, s)];

        /* ---- 1 : il attire le fer */
        const t1 = tableaux[0];
        mk('path', { d: 'M150 211 V290 H215 M237 290 H310 V211', fill: 'none', stroke: C.cuivre, 'stroke-width': 3 }, t1);
        mk('line', { x1: 215, y1: 274, x2: 215, y2: 306, stroke: C.navy, 'stroke-width': 4 }, t1);
        mk('line', { x1: 237, y1: 281, x2: 237, y2: 299, stroke: C.navy, 'stroke-width': 7 }, t1);
        const bob1 = bobine(t1, 150, 310, 165, 46, 12);
        mk('rect', { x: 124, y: 147, width: 212, height: 36, rx: 3, fill: C.fer, stroke: C.ferBord, 'stroke-width': 2 }, bob1.noyau);
        const champ1 = faisceau(t1, ['M336 158 L420 158', 'M336 172 L420 172'], 2.4);
        const plaque = mk('g', {}, t1);
        mk('rect', { x: 0, y: 112, width: 24, height: 106, rx: 3, fill: C.fer, stroke: C.ferBord, 'stroke-width': 2 }, plaque);
        const ressort = mk('path', { fill: 'none', stroke: C.anneau, 'stroke-width': 3 }, t1);
        mk('rect', { x: 586, y: 100, width: 14, height: 130, fill: '#c9c2b4' }, t1);
        let plaqueX = 470;

        /* ---- 2 : il oriente un aimant */
        const t2 = tableaux[1];
        const gL2 = mk('g', {}, t2);
        const f2 = faisceau(gL2, lignesDehors(260, 100, 165, 22, [10, 10, W - 10, H - 10]), 2);
        mk('rect', { x: 100, y: 150, width: 80, height: 30, fill: C.sud }, t2);
        mk('rect', { x: 180, y: 150, width: 80, height: 30, fill: C.nord }, t2);
        const s2 = mk('text', { x: 140, y: 174, 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700, fill: '#fff' }, t2); s2.textContent = 'S';
        const n2 = mk('text', { x: 220, y: 174, 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700, fill: '#fff' }, t2); n2.textContent = 'N';
        const grande = boussole(t2, 420, 165, 44);
        let omega = 0;

        /* ---- 3, 4, 5 : il pousse un fil */
        const t3 = tableaux[2];
        mk('polygon', { points: '170,40 470,40 520,70 220,70', fill: C.nord, stroke: '#8e2a1f', 'stroke-width': 2 }, t3);
        mk('polygon', { points: '170,262 470,262 520,292 220,292', fill: C.sud, stroke: '#1f4d70', 'stroke-width': 2 }, t3);
        const n3 = mk('text', { x: 345, y: 62, 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700, fill: '#fff' }, t3); n3.textContent = 'N';
        const s3 = mk('text', { x: 345, y: 284, 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700, fill: '#fff' }, t3); s3.textContent = 'S';
        const f3 = faisceau(t3, [210, 260, 310, 360, 410, 460].map(x => `M${x} 74 L${x} 258`), 2.2);
        const fantome = mk('line', { x1: 290, y1: 192, x2: 380, y2: 142, stroke: C.cuivre, 'stroke-width': 3, 'stroke-dasharray': '4 5', opacity: 0.6 }, t3);
        const tige = mk('g', {}, t3);
        const tigeTrait = mk('line', { x1: 290, y1: 192, x2: 380, y2: 142, stroke: C.cuivre, 'stroke-width': 9, 'stroke-linecap': 'round' }, tige);
        const ptsTige = [0, 1, 2, 3].map(() => mk('circle', { r: 3.6, fill: C.point, stroke: C.pointBord, 'stroke-width': 1.4 }, tige));
        let tigeX = 0;

        /* ---- 6 : le cadre tourne */
        const t6 = tableaux[3];
        mk('rect', { x: 40, y: 60, width: 80, height: 210, rx: 6, fill: C.nord }, t6);
        mk('rect', { x: 520, y: 60, width: 80, height: 210, rx: 6, fill: C.sud }, t6);
        const n6 = mk('text', { x: 80, y: 174, 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700, fill: '#fff' }, t6); n6.textContent = 'N';
        const s6 = mk('text', { x: 560, y: 174, 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700, fill: '#fff' }, t6); s6.textContent = 'S';
        const f6 = faisceau(t6, [80, 120, 210, 250].map(y => `M124 ${y} L516 ${y}`), 2);
        mk('line', { x1: 320, y1: 52, x2: 320, y2: 300, stroke: C.gris, 'stroke-width': 3, 'stroke-dasharray': '3 4' }, t6);
        mk('path', { d: 'M320 40 m0 0 a4 4 0 1 1 4 -4 a8 8 0 1 1 -10 8 a12 12 0 1 1 18 -10', fill: 'none', stroke: C.anneau, 'stroke-width': 2.5 }, t6);
        const cadre = mk('path', { fill: 'none', stroke: C.cuivre, 'stroke-width': 6, 'stroke-linejoin': 'round' }, t6);
        const ptsG = [0, 1, 2].map(() => mk('circle', { r: 3.6, fill: C.point, stroke: C.pointBord, 'stroke-width': 1.4 }, t6));
        const ptsD = [0, 1, 2].map(() => mk('circle', { r: 3.6, fill: C.point, stroke: C.pointBord, 'stroke-width': 1.4 }, t6));
        let phi = 0, omegaCadre = 0;

        /* ---- 7 : le champ tourne */
        const t7 = tableaux[4];
        mk('circle', { cx: 320, cy: 165, r: 130, fill: '#e5e1d8', stroke: C.ferBord, 'stroke-width': 3 }, t7);
        mk('circle', { cx: 320, cy: 165, r: 96, fill: C.papier, stroke: C.ferBord, 'stroke-width': 2 }, t7);
        [0, 120, 240].forEach(d => {
          const g = mk('g', { transform: `rotate(${d} 320 165)` }, t7);
          [-1, 1].forEach(c => mk('rect', { x: 306, y: c < 0 ? 46 : 260, width: 28, height: 24, rx: 4, fill: C.cuivre }, g));
        });
        const poles7 = mk('g', {}, t7);
        mk('path', { d: 'M320 165 m-112 -20 a114 114 0 0 1 0 40', fill: 'none', stroke: C.nord, 'stroke-width': 12 }, poles7);
        mk('path', { d: 'M320 165 m112 -20 a114 114 0 0 1 0 40', fill: 'none', stroke: C.sud, 'stroke-width': 12 }, poles7);
        const rotor = mk('g', {}, t7);
        mk('circle', { cx: 320, cy: 165, r: 78, fill: '#c9d6e6', stroke: C.navy, 'stroke-width': 3 }, rotor);
        for (let k = 0; k < 12; k++) {
          const a = k * Math.PI / 6;
          mk('line', { x1: 320 + 50 * Math.cos(a), y1: 165 + 50 * Math.sin(a), x2: 320 + 74 * Math.cos(a), y2: 165 + 74 * Math.sin(a), stroke: C.navy, 'stroke-width': 4 }, rotor);
        }
        mk('circle', { cx: 320, cy: 165, r: 10, fill: C.navy }, rotor);
        let aChamp = 0, aRotor = 0;

        let etape = 0;
        return {
          etape(k) {
            etape = k;
            const quel = k === 0 ? 0 : k === 1 ? 1 : k <= 4 ? 2 : k === 5 ? 3 : 4;
            tableaux.forEach((g, i) => { g.style.display = i === quel ? '' : 'none'; });
            if (k === 0) plaqueX = 470;
            if (k === 1) { grande.angle = -90; omega = 0; grande.poser(); }
            if (k >= 2 && k <= 4) tigeX = 0;
            if (k === 5) { phi = 0; omegaCadre = 0; }
            const long = k === 4;
            fantome.setAttribute('x1', long ? 335 : 290); fantome.setAttribute('y1', long ? 238 : 192);
            fantome.setAttribute('x2', long ? 335 : 380); fantome.setAttribute('y2', long ? 94 : 142);
            tigeTrait.setAttribute('x1', long ? 335 : 290); tigeTrait.setAttribute('y1', long ? 238 : 192);
            tigeTrait.setAttribute('x2', long ? 335 : 380); tigeTrait.setAttribute('y2', long ? 94 : 142);
          },
          anim(dt, t) {
            if (etape === 0) {
              bob1.courant(dt, 1);
              plaqueX = vers(plaqueX, 338, Math.min(1, dt * 1.2));
              plaque.setAttribute('transform', `translate(${f1(plaqueX)} 0)`);
              champ1.p.forEach(p => p.setAttribute('d', p.getAttribute('d').replace(/L\d+(\.\d+)?/, 'L' + f1(plaqueX))));
              champ1.defiler(dt * 26);
              const x0 = plaqueX + 24, n = 9, pas = (586 - x0) / n;
              ressort.setAttribute('d', 'M' + f1(x0) + ' 165 ' + Array.from({ length: n }, (_, i) => 'L' + f1(x0 + pas * (i + 0.5)) + ' ' + (i % 2 ? 150 : 180)).join(' ') + ' L586 165');
            } else if (etape === 1) {
              f2.defiler(dt * 26);
              const [bx, by] = champDeuxPoles(420, 165, 260, 100, 165);
              const cible = deg(bx, by);
              const ecart = ((((cible - grande.angle) % 360) + 540) % 360) - 180;
              omega += (ecart * 9 - omega * 1.6) * dt;
              grande.angle += omega * dt; grande.poser();
            } else if (etape <= 4) {
              f3.defiler(dt * 26);
              const sens = etape === 3 ? -1 : 1;
              const cible = etape === 4 ? 0 : 95 * sens;
              tigeX = vers(tigeX, cible, Math.min(1, dt * 1.1));
              tige.setAttribute('transform', `translate(${f1(tigeX)} 0)`);
              ptsTige.forEach((p, i) => {
                const u = ((t * 0.4 * sens + i / 4) % 1 + 1) % 1;
                const [ax, ay, bx2, by2] = etape === 4 ? [335, 94, 335, 238] : [380, 142, 290, 192];
                p.setAttribute('cx', f1(ax + (bx2 - ax) * u)); p.setAttribute('cy', f1(ay + (by2 - ay) * u));
              });
            } else if (etape === 5) {
              f6.defiler(dt * 26);
              /* deux poussées contraires, un ressort qui retient : il s'arrête vers 60 degrés */
              const couple = 3.2 * Math.cos(phi) - 3.2 * Math.cos(Math.PI / 3) * phi / (Math.PI / 3);
              omegaCadre += (couple - 1.4 * omegaCadre) * dt;
              phi += omegaCadre * dt;
              const L = 150 * Math.cos(phi), z = Math.sin(phi);
              const xa = 320 + L, xb = 320 - L, dy = 14 * z;
              cadre.setAttribute('d', `M${f1(xb)} ${f1(80 - dy)} L${f1(xa)} ${f1(80 + dy)} L${f1(xa)} ${f1(250 + dy)} L${f1(xb)} ${f1(250 - dy)} Z`);
              ptsG.forEach((p, i) => { const u = ((t * 0.35 + i / 3) % 1 + 1) % 1; p.setAttribute('cx', f1(xa)); p.setAttribute('cy', f1(250 + dy - u * 170)); });
              ptsD.forEach((p, i) => { const u = ((t * 0.35 + i / 3) % 1 + 1) % 1; p.setAttribute('cx', f1(xb)); p.setAttribute('cy', f1(80 - dy + u * 170)); });
            } else {
              aChamp += dt * 40;
              aRotor += dt * 40 * 0.93;
              poles7.setAttribute('transform', `rotate(${f1(aChamp)} 320 165)`);
              rotor.setAttribute('transform', `rotate(${f1(aRotor)} 320 165)`);
            }
          }
        };
      }
    });
  }

  /* ============================================================ 6.C — action et réaction */
  const ETAPES_C1 = [
    ['1 L’aimant entre', "On enfonce le pôle nord de l’aimant dans la bobine. Pendant qu’il bouge, l’aiguille du galvanomètre dévie : un courant naît dans la bobine, c’est le courant induit. La bobine devient un aimant : elle présente un pôle nord à l’aimant qui entre, et le repousse."],
    ['2 L’aimant reste', "L’aimant reste immobile dans la bobine. Le champ ne change plus : l’aiguille revient à zéro, il n’y a plus de courant."],
    ['3 L’aimant sort', "On retire l’aimant. L’aiguille dévie de l’autre côté : le courant induit a changé de sens. La bobine présente maintenant un pôle sud : elle retient l’aimant qui s’en va."],
    ['4 La bobine bouge', "Cette fois, l’aimant ne bouge pas : c’est la bobine qui vient vers lui. L’aiguille dévie comme à l’étape 1. Ce qui compte, c’est que le champ change dans la bobine."]
  ];
  const ETAPES_C2 = [
    ['Électroaimant éteint', "Un balancier en cuivre oscille entre les deux pôles d’un électroaimant éteint. Seuls l’air et son axe le freinent un peu : il oscille longtemps, une centaine de fois."],
    ['Électroaimant allumé', "On allume l’électroaimant. Le cuivre n’est pas attiré par l’aimant, et pourtant le balancier s’arrête net. En traversant le champ, le métal voit le champ changer : des courants induits y naissent, en orange, et ils s’opposent à son mouvement."]
  ];
  const ETAPES_C3 = [
    ['1 Le champ alternatif', "La bobine de gauche est alimentée en alternatif, ici au ralenti. Le courant va dans un sens, puis dans l’autre. Le champ qu’elle crée, en bleu, suit le fer : il grandit, s’annule, repart dans l’autre sens. Il change sans arrêt."],
    ['2 L’anneau', "Le champ traverse l’anneau orange. Il change sans arrêt : un courant induit naît dans l’anneau, sans aucun fil. Ce courant crée son propre champ, en bleu clair, décalé dans le temps : il s’oppose au changement. Dans un contacteur ou un moteur, l’anneau n’entoure qu’une partie du pôle : le champ de cette partie est décalé par rapport au reste. C’est la bague de déphasage du contacteur (station 6.1) et la spire de Frager du petit ventilateur (station 9.6)."],
    ['3 Le secondaire', "On remplace l’anneau par une deuxième bobine, reliée à une lampe. Le courant induit allume la lampe : c’est le secondaire du transformateur (station 6.2). En continu, une fois le courant établi, le champ ne changerait plus, et la lampe resterait éteinte."]
  ];

  function aimantEtBobine() {
    return figure({
      titre: 'L’aimant et la bobine.',
      aide: 'Appuyez sur les étapes, une par une. Le galvanomètre, en bas, détecte un courant : son aiguille dévie.',
      aria: "Une bobine reliée à un galvanomètre, un appareil à aiguille. Un aimant droit, pôle nord en avant, entre dans la bobine puis en sort. L’aiguille dévie d’un côté, puis de l’autre, seulement pendant le mouvement.",
      vb: '0 0 640 330', etapes: ETAPES_C1,
      monter(s) {
        mk('rect', { x: 2, y: 2, width: 636, height: 326, rx: 14, fill: C.papier, stroke: 'rgba(27,58,99,.18)' }, s);
        /* la bobine et son galvanomètre bougent ensemble (étape 4) */
        const gBob = mk('g', {}, s);
        mk('path', { d: 'M330 166 V250 H392 M448 250 H510 V166', fill: 'none', stroke: C.cuivre, 'stroke-width': 3 }, gBob);
        const bob = bobine(gBob, 330, 510, 120, 44, 12);
        const face = facePole(gBob, 316, 120, 34);
        mk('rect', { x: 380, y: 222, width: 80, height: 92, rx: 8, fill: C.creme, stroke: C.ferBord, 'stroke-width': 2 }, gBob);
        mk('path', { d: 'M388 290 A 32 32 0 0 1 452 290', fill: 'none', stroke: C.gris, 'stroke-width': 2 }, gBob);
        mk('line', { x1: 420, y1: 256, x2: 420, y2: 264, stroke: C.gris, 'stroke-width': 2 }, gBob);
        const aig = mk('line', { x1: 420, y1: 300, x2: 420, y2: 262, stroke: C.nord, 'stroke-width': 3, 'stroke-linecap': 'round' }, gBob);
        mk('circle', { cx: 420, cy: 300, r: 4, fill: C.navy }, gBob);
        /* l'aimant */
        const aimant = mk('g', {}, s);
        mk('rect', { x: 0, y: 106, width: 70, height: 28, fill: C.sud }, aimant);
        mk('rect', { x: 70, y: 106, width: 70, height: 28, fill: C.nord }, aimant);
        const a1 = mk('text', { x: 35, y: 129, 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700, fill: '#fff' }, aimant); a1.textContent = 'S';
        const a2 = mk('text', { x: 105, y: 129, 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 700, fill: '#fff' }, aimant); a2.textContent = 'N';

        const DEHORS = 40, DEDANS = 330;
        let etape = 0, xA = DEHORS, xB = 0, temps = 0, angle = 0, vRel = 0;
        const placer = () => {
          aimant.setAttribute('transform', `translate(${f1(xA)} 0)`);
          gBob.setAttribute('transform', `translate(${f1(xB)} 0)`);
        };
        return {
          etape(k) {
            etape = k; temps = 0;
            if (k === 0) { xA = DEHORS; xB = 0; }
            if (k === 1) { xA = DEDANS; xB = 0; }
            if (k === 2) { xA = DEDANS; xB = 0; }
            if (k === 3) { xA = DEHORS; xB = 120; }
            placer();
          },
          anim(dt) {
            temps += dt;
            const avant = xA - xB;
            /* un mouvement d'une seconde et demie, puis l'arrêt */
            const u = Math.min(1, temps / 1.5), lisse = u * u * (3 - 2 * u);
            if (etape === 0) xA = DEHORS + (DEDANS - DEHORS) * lisse;
            if (etape === 2) xA = DEDANS + (DEHORS - DEDANS) * lisse;
            if (etape === 3) xB = 120 - 120 * lisse;
            placer();
            vRel = dt ? ((xA - xB) - avant) / dt : 0;   /* > 0 : l'aimant s'enfonce dans la bobine */
            const sens = Math.abs(vRel) > 4 ? Math.sign(vRel) : 0;
            angle = vers(angle, Math.max(-55, Math.min(55, vRel * 0.22)), Math.min(1, dt * 8));
            aig.setAttribute('transform', `rotate(${f1(angle)} 420 300)`);
            bob.courant(dt, sens, 1.4);
            face.poser(sens > 0 ? 'N' : sens < 0 ? 'S' : null);
          }
        };
      }
    });
  }

  function balancier() {
    return figure({
      titre: 'Le balancier en cuivre.',
      aide: 'Appuyez sur « Électroaimant éteint », puis sur « Électroaimant allumé ». Les deux pôles sont devant et derrière le balancier : le champ, en bleu, les traverse.',
      aria: "Un balancier en cuivre suspendu oscille. Son bas passe entre les deux pôles d’un électroaimant. Éteint, il oscille longtemps. Allumé, il s’arrête net.",
      vb: '0 0 640 330', etapes: ETAPES_C2,
      monter(s) {
        mk('rect', { x: 2, y: 2, width: 636, height: 326, rx: 14, fill: C.papier, stroke: 'rgba(27,58,99,.18)' }, s);
        mk('rect', { x: 230, y: 16, width: 180, height: 12, rx: 4, fill: '#c9c2b4' }, s);
        /* le pôle de derrière, puis la zone du champ */
        mk('rect', { x: 262, y: 206, width: 116, height: 74, rx: 6, fill: '#d5dbe3', stroke: C.ferBord, 'stroke-width': 2 }, s);
        const zone = mk('g', {}, s);
        for (let x = 274; x <= 366; x += 23) for (let y = 220; y <= 266; y += 23)
          mk('circle', { cx: x, cy: y, r: 4, fill: C.champ }, zone);
        const bras = mk('g', {}, s);
        mk('line', { x1: 320, y1: 28, x2: 320, y2: 222, stroke: C.gris, 'stroke-width': 4 }, bras);
        mk('rect', { x: 286, y: 214, width: 68, height: 56, rx: 4, fill: '#d98c4a', stroke: C.cuivre, 'stroke-width': 3 }, bras);
        const tourbillons = mk('g', { fill: 'none', stroke: C.anneau, 'stroke-width': 3 }, bras);
        mk('path', { d: 'M300 242 a10 10 0 1 1 10 10', }, tourbillons);
        mk('path', { d: 'M332 242 a10 10 0 1 0 -10 10' }, tourbillons);
        mk('circle', { cx: 320, cy: 28, r: 6, fill: C.navy }, s);
        /* le pôle de devant, en contour ; dessous, le fer de l'électroaimant et sa bobine */
        mk('rect', { x: 262, y: 206, width: 116, height: 74, rx: 6, fill: 'none', stroke: C.ferBord, 'stroke-width': 3, 'stroke-dasharray': '6 4' }, s);
        mk('rect', { x: 250, y: 286, width: 140, height: 26, rx: 4, fill: C.fer, stroke: C.ferBord, 'stroke-width': 2 }, s);
        const spires = mk('g', { stroke: C.cuivre, 'stroke-width': 5, 'stroke-linecap': 'round' }, s);
        [276, 292, 308, 324, 340, 356].forEach(x => mk('line', { x1: x, y1: 281, x2: x, y2: 317 }, spires));

        let allume = false, theta = 0.45, omega = 0;
        return {
          etape(k) { allume = k === 1; theta = 0.45; omega = 0; },   /* chaque bouton relâche le balancier du même endroit */
          anim(dt) {
            zone.setAttribute('opacity', allume ? 0.8 : 0);
            /* le frein n'agit que lorsque le cuivre est entre les pôles */
            const dedans = Math.max(0, 1 - Math.abs(theta) / 0.32);
            const frein = 0.015 + (allume ? 9 * dedans : 0);
            omega += (-5.2 * Math.sin(theta) - frein * omega) * dt;
            theta += omega * dt;
            bras.setAttribute('transform', `rotate(${f1(-theta * 180 / Math.PI)} 320 28)`);
            tourbillons.setAttribute('opacity', allume ? f1(Math.min(1, Math.abs(omega) * 1.4) * dedans) : 0);
          }
        };
      }
    });
  }

  function anneauAlternatif() {
    return figure({
      titre: 'Un anneau dans un champ alternatif.',
      aide: 'Appuyez sur les étapes, une par une. Le fer est en gris, la bobine en cuivre à gauche, l’anneau orange à droite.',
      aria: "Un circuit magnétique en fer, en forme de cadre. À gauche, une bobine alimentée en alternatif. À droite, un anneau orange autour du fer, puis une deuxième bobine reliée à une lampe.",
      vb: '0 0 640 330', etapes: ETAPES_C3,
      monter(s) {
        mk('rect', { x: 2, y: 2, width: 636, height: 326, rx: 14, fill: C.papier, stroke: 'rgba(27,58,99,.18)' }, s);
        [[150, 50, 340, 36], [150, 244, 340, 36], [150, 50, 36, 230], [454, 50, 36, 230]]
          .forEach(([x, y, w, h]) => mk('rect', { x, y, width: w, height: h, fill: C.fer }, s));
        const champ = mk('path', { d: 'M168 68 H472 V262 H168 Z', fill: 'none', stroke: C.champ, 'stroke-width': 4, 'stroke-dasharray': '10 8' }, s);
        /* la bobine de gauche */
        for (let k = 0; k < 7; k++) mk('line', { x1: 134, y1: 112 + k * 16, x2: 202, y2: 112 + k * 16, stroke: C.cuivre, 'stroke-width': 7, 'stroke-linecap': 'round' }, s);
        mk('path', { d: 'M134 112 H60 M134 208 H60', stroke: C.cuivre, 'stroke-width': 3, fill: 'none' }, s);
        mk('text', { x: 44, y: 166, 'text-anchor': 'middle', 'font-size': 26, 'font-weight': 700, fill: C.navy }, s).textContent = '~';
        const ptsB = [0, 1, 2, 3, 4, 5, 6].map(k => mk('circle', { cx: 168, cy: 112 + k * 16, r: 4, fill: C.point, stroke: C.pointBord, 'stroke-width': 1.4 }, s));
        /* l'anneau */
        const gAnneau = mk('g', {}, s);
        const anneau = mk('rect', { x: 444, y: 140, width: 56, height: 50, rx: 8, fill: 'none', stroke: C.anneau, 'stroke-width': 7 }, gAnneau);
        const petitChamp = mk('ellipse', { cx: 472, cy: 165, rx: 52, ry: 44, fill: 'none', stroke: C.champClair, 'stroke-width': 3, 'stroke-dasharray': '6 5' }, gAnneau);
        const ptA = mk('circle', { r: 4.5, fill: C.point, stroke: '#9a3412', 'stroke-width': 1.5 }, gAnneau);
        /* le secondaire et sa lampe */
        const gSec = mk('g', {}, s);
        for (let k = 0; k < 7; k++) mk('line', { x1: 438, y1: 112 + k * 16, x2: 506, y2: 112 + k * 16, stroke: C.cuivre, 'stroke-width': 7, 'stroke-linecap': 'round' }, gSec);
        mk('path', { d: 'M506 112 H560 V140 M506 208 H560 V188', stroke: C.cuivre, 'stroke-width': 3, fill: 'none' }, gSec);
        const lampe = mk('circle', { cx: 560, cy: 164, r: 22, fill: '#fff3b0', stroke: C.navy, 'stroke-width': 3 }, gSec);
        mk('path', { d: 'M545 149 L575 179 M575 149 L545 179', stroke: C.navy, 'stroke-width': 2.5 }, gSec);
        const ptsS = [0, 1, 2, 3, 4, 5, 6].map(k => mk('circle', { cx: 472, cy: 112 + k * 16, r: 4, fill: C.point, stroke: C.pointBord, 'stroke-width': 1.4 }, gSec));

        let etape = 0, decal = 0;
        return {
          etape(k) {
            etape = k;
            gAnneau.style.display = k === 1 ? '' : 'none';
            gSec.style.display = k === 2 ? '' : 'none';
          },
          anim(dt, t) {
            const ph = t / 3 * 2 * Math.PI;                 /* une alternance toutes les trois secondes */
            const i = Math.sin(ph), ia = -Math.cos(ph);     /* le courant induit suit le changement, décalé */
            ptsB.forEach(p => p.setAttribute('cx', f1(168 + 26 * i)));
            decal -= dt * 40 * Math.sign(i);
            champ.setAttribute('opacity', f1(0.2 + 0.8 * Math.abs(i)));
            champ.setAttribute('stroke-dashoffset', f1(decal));
            if (etape === 1) {
              ptA.setAttribute('cx', f1(472 + 24 * ia)); ptA.setAttribute('cy', 190);
              anneau.setAttribute('stroke-width', f1(5 + 4 * Math.abs(ia)));
              petitChamp.setAttribute('opacity', f1(0.15 + 0.75 * Math.abs(ia)));
            }
            if (etape === 2) {
              ptsS.forEach(p => p.setAttribute('cx', f1(472 + 26 * ia)));
              lampe.setAttribute('fill', `rgba(250, 204, 21, ${f1(0.15 + 0.85 * Math.abs(ia))})`);
            }
          }
        };
      }
    });
  }

  function induit() {
    const d = document.createElement('div');
    d.append(aimantEtBobine(), balancier(), anneauAlternatif());
    return d;
  }

  return { sources, effets, induit, boussole, figure };
})();
