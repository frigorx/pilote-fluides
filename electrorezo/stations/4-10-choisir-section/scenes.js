/* ÉlectroRézo 4.10 — les scènes de « Choisir la section ».

   Une seule source de chiffres : le tableau 52H de la NF C 15-100 (courant
   admissible Iz, conducteurs en cuivre, 30 °C, un seul circuit), le même que
   la photo de la station 4.9. Rien n'est inventé : une case vide de la norme
   reste vide ici.

   La méthode est celle du cours de 1re MFER « Choix des conducteurs » :
     1. le courant d'emploi Ib donne le calibre In (Ib ≤ In) ;
     2. le calibre donne la section : il faut Iz ≥ In ;
     3. on vérifie la chute de tension, et on grossit si elle dépasse.
   Les facteurs de correction (température, groupement) ne sont PAS appliqués :
   c'est dit à l'écran, et c'est la limite de la station.

   Règles de maison tenues : aucune couleur ne porte seule l'information,
   aucun texte sur un tracé, une formule tient sur une ligne. */

const ScenesSection = (() => {
  'use strict';
  const C = { navy:'#1b3a63', orange:'#c9451a', vert:'#1e7e54', rouge:'#c0392b', gris:'#637285',
              papier:'#fffdf8', creme:'#f7f1e7', trait:'rgba(27,58,99,.18)', cuivre:'#d98a45' };
  const nb = (v, d) => v.toFixed(d === undefined ? 1 : d).replace('.', ',');
  const mm = s => String(s).replace('.', ',') + ' mm²';
  const svg = (vb, aria) => {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', vb); s.setAttribute('class', 'scene');
    s.setAttribute('role', 'img'); s.setAttribute('aria-label', aria); return s;
  };

  /* ------------------------------------------------ les chiffres de la norme
     NF C 15-100, tableau 52H, cuivre. Neuf colonnes, dans l'ordre de la photo.
     null = case vide dans la norme. */
  const SECTIONS = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95];
  const IZ = {
    1.5: [15.5, 17.5, 18.5, 19.5, 22, 23, 24, 26, null],
    2.5: [21, 24, 25, 27, 30, 31, 33, 36, null],
    4:   [28, 32, 34, 36, 40, 42, 45, 49, null],
    6:   [36, 41, 43, 48, 51, 54, 58, 63, null],
    10:  [50, 57, 60, 63, 70, 75, 80, 86, null],
    16:  [68, 76, 80, 85, 94, 100, 107, 115, null],
    25:  [89, 96, 101, 112, 119, 127, 138, 149, 161],
    35:  [110, 119, 126, 138, 147, 158, 169, 185, 200],
    50:  [134, 144, 153, 168, 179, 192, 207, 225, 242],
    70:  [171, 184, 196, 213, 229, 246, 268, 289, 310],
    95:  [207, 223, 238, 258, 278, 298, 328, 352, 377]
  };
  /* la colonne se lit au croisement de la lettre de pose et de l'isolant :
     PVC2 = isolant PVC, 2 conducteurs chargés (monophasé) ; PR3 = PR, 3 (triphasé). */
  const COLONNE = {
    B: { PVC3: 0, PVC2: 1, PR3: 3, PR2: 5 },
    C: { PVC3: 1, PVC2: 3, PR3: 4, PR2: 6 },
    E: { PVC3: 2, PVC2: 4, PR3: 5, PR2: 7 }
  };
  const POSES = [
    { id: 'B', libelle: 'Sous conduit ou goulotte', court: 'sous conduit' },
    { id: 'C', libelle: 'Fixé au mur', court: 'fixé au mur' },
    { id: 'E', libelle: 'Sur chemin de câbles perforé', court: 'sur chemin de câbles' }
  ];
  const CALIBRES = [2, 3, 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125];
  const RHO = 0.0225;   /* Ω·mm²/m, cuivre en service — valeur du guide UTE C 15-105 */

  const iz = (s, pose, isolant, charges) => IZ[s][COLONNE[pose][isolant + charges]];
  const calibrePour = ib => CALIBRES.find(c => c >= ib) || null;

  /* chute de tension en %, circuit résistif (cos φ = 1), réactance négligée */
  function chute(s, L, I, tri) {
    const dU = (tri ? Math.sqrt(3) : 2) * RHO * L * I / s;
    return { dU, pct: dU / (tri ? 400 : 230) * 100 };
  }

  /* la démarche complète : renvoie tout ce qu'il faut pour l'expliquer */
  function choisir(ib, L, o) {
    const In = calibrePour(ib);
    const charges = o.tri ? 3 : 2;
    const sChauffe = In && SECTIONS.find(s => { const v = iz(s, o.pose, o.isolant, charges); return v && v >= In; });
    const sChute = SECTIONS.find(s => chute(s, L, ib, o.tri).pct <= o.limite);
    const s = (sChauffe && sChute) ? Math.max(sChauffe, sChute) : null;
    return { In, sChauffe, sChute, s,
             parLongueur: !!s && sChute > sChauffe,
             izRetenu: s ? iz(s, o.pose, o.isolant, charges) : null,
             c: s ? chute(s, L, ib, o.tri) : null };
  }

  /* une barre de boutons, sur le modèle de SchemasGrandeurs.bloc */
  function barre(hote, choix, actif, surClic) {
    const b = document.createElement('div'); b.className = 'choix'; b.style.marginTop = '.5rem';
    choix.forEach(([id, libelle]) => {
      const x = document.createElement('button');
      x.type = 'button'; x.textContent = libelle; x.setAttribute('aria-pressed', String(id === actif));
      x.addEventListener('click', () => {
        b.querySelectorAll('button').forEach(y => y.setAttribute('aria-pressed', String(y === x)));
        surClic(id);
      });
      b.appendChild(x);
    });
    hote.appendChild(b);
  }

  /* ============================================================ temps 2
     Deux curseurs, intensité et longueur : la section change sous les yeux,
     et l'écran dit laquelle des deux raisons l'a décidée. */
  function curseurs() {
    const hote = document.createElement('div');
    const d = svg('0 0 760 340', 'La section d’un câble se choisit sur deux critères : ne pas chauffer, et ne pas perdre trop de tension sur la longueur.');
    const o = { pose: 'B', isolant: 'PVC', tri: false, limite: 5 };
    let ib = 16, L = 25;

    const peindre = () => {
      const r = choisir(ib, L, o);
      const s = r.s;
      const rayon = s ? 8 + 6.5 * Math.sqrt(s) : 0;
      const raison = !s ? 'trop long ou trop fort' : r.parLongueur ? 'c’est la longueur qui décide' : 'c’est l’échauffement qui décide';
      const formule = s
        ? `ΔU = ${o.tri ? '1,73' : '2'} × 0,0225 × ${L} × ${ib} / ${String(s).replace('.', ',')} = ${nb(r.c.dU)} V, soit ${nb(r.c.pct)} %`
        : 'Au-delà de 95 mm² : on change de solution.';
      d.innerHTML = `
<rect x="8" y="8" width="744" height="324" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="380" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Deux raisons de grossir un câble</text>

${s ? `<circle cx="130" cy="150" r="${rayon}" fill="${C.cuivre}" stroke="${C.navy}" stroke-width="4"/>` :
      `<text x="130" y="155" text-anchor="middle" font-size="15" fill="${C.rouge}">hors tableau</text>`}
<text x="130" y="252" text-anchor="middle" font-size="18" font-weight="700" fill="${C.navy}">${s ? mm(s) : '—'}</text>
<text x="130" y="274" text-anchor="middle" font-size="13" fill="${C.gris}">le cuivre, à l’échelle</text>

<rect x="250" y="66" width="250" height="78" rx="10" fill="${C.creme}" stroke="${!r.parLongueur && s ? C.navy : C.trait}" stroke-width="${!r.parLongueur && s ? 3 : 1}"/>
<text x="375" y="90" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">1 · Ne pas chauffer</text>
<text x="375" y="112" text-anchor="middle" font-size="13" fill="${C.navy}">calibre ${r.In || '—'} A : au moins ${r.sChauffe ? mm(r.sChauffe) : '—'}</text>
<text x="375" y="132" text-anchor="middle" font-size="12" fill="${C.gris}">${r.sChauffe ? 'ce câble admet ' + iz(r.sChauffe, o.pose, o.isolant, o.tri ? 3 : 2) + ' A' : 'hors tableau'}</text>

<rect x="250" y="156" width="250" height="78" rx="10" fill="${C.creme}" stroke="${r.parLongueur ? C.navy : C.trait}" stroke-width="${r.parLongueur ? 3 : 1}"/>
<text x="375" y="180" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">2 · Ne pas perdre la tension</text>
<text x="375" y="202" text-anchor="middle" font-size="13" fill="${C.navy}">sous ${o.limite} % : au moins ${r.sChute ? mm(r.sChute) : '—'}</text>
<text x="375" y="222" text-anchor="middle" font-size="12" fill="${C.gris}">sur ${L} m de câble</text>

<rect x="520" y="66" width="220" height="168" rx="12" fill="${C.creme}" stroke="${C.trait}"/>
<text x="630" y="96" text-anchor="middle" font-size="13" fill="${C.gris}">il faut</text>
<text x="630" y="140" text-anchor="middle" font-size="34" font-weight="700" fill="${s ? C.orange : C.rouge}">${s ? mm(s) : '?'}</text>
<text x="630" y="172" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">${raison}</text>
<text x="630" y="196" text-anchor="middle" font-size="12" fill="${C.gris}">protégé par un disjoncteur</text>
<text x="630" y="214" text-anchor="middle" font-size="12" fill="${C.gris}">de ${r.In || '—'} A</text>

<text x="380" y="270" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}" style="white-space:nowrap">${formule}</text>
<text x="380" y="296" text-anchor="middle" font-size="12" fill="${C.gris}">${o.tri ? 'triphasé 400 V' : 'monophasé 230 V'} · cuivre · ${POSES.find(p => p.id === o.pose).court} · isolant ${o.isolant} · 30 °C · un seul circuit</text>
<text x="380" y="316" text-anchor="middle" font-size="12" fill="${C.gris}">Chiffres : NF C 15-100, tableau 52H. Pas de facteur de correction appliqué.</text>`;
    };
    peindre();
    hote.appendChild(d);

    SchemasGrandeurs.reglette(hote, 'secI', 'L’intensité', 1, 100, 1, ib, v => v + ' A', v => { ib = v; peindre(); });
    SchemasGrandeurs.reglette(hote, 'secL', 'La longueur', 5, 200, 5, L, v => v + ' m', v => { L = v; peindre(); });
    barre(hote, [['mono', 'Monophasé 230 V'], ['tri', 'Triphasé 400 V']], 'mono', id => { o.tri = id === 'tri'; peindre(); });
    barre(hote, [[5, 'Moteur, chauffage, prises : 5 %'], [3, 'Éclairage : 3 %']], 5, v => { o.limite = v; peindre(); });

    const p = document.createElement('p');
    p.className = 'legende';
    p.textContent = 'Gardez 16 ampères et allongez le câble : à partir d’une certaine longueur, la section grossit '
      + 'alors que le courant n’a pas bougé. C’est la longueur qui commande. Trouvez à quelle longueur cela arrive.';
    hote.appendChild(p);
    return hote;
  }

  /* ============================================================ temps 3
     Mesurer une section : on ne la mesure pas directement, on mesure le
     diamètre de l'âme et on calcule. Une formule, une ligne. */
  function mesurer() {
    const hote = document.createElement('div');
    const d = svg('0 0 700 300', 'On mesure le diamètre de l’âme de cuivre au pied à coulisse, puis on calcule la section.');
    let dia = 1.78;

    const peindre = () => {
      const S = Math.PI * dia * dia / 4;
      const proche = SECTIONS.reduce((a, b) => Math.abs(b - S) < Math.abs(a - S) ? b : a);
      const ok = Math.abs(proche - S) / proche <= 0.08;
      const r = 12 + dia * 14;
      d.innerHTML = `
<rect x="8" y="8" width="684" height="284" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">On mesure un diamètre, on calcule une section</text>

<circle cx="180" cy="150" r="${r}" fill="${C.cuivre}" stroke="${C.navy}" stroke-width="3"/>
<line x1="${180 - r}" y1="150" x2="${180 + r}" y2="150" stroke="${C.navy}" stroke-width="2"/>
<path d="M${180 - r + 10} 144 L${180 - r} 150 L${180 - r + 10} 156" fill="none" stroke="${C.navy}" stroke-width="2"/>
<path d="M${180 + r - 10} 144 L${180 + r} 150 L${180 + r - 10} 156" fill="none" stroke="${C.navy}" stroke-width="2"/>
<text x="180" y="${150 + r + 26}" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">d = ${nb(dia, 2)} mm</text>

<rect x="360" y="70" width="300" height="160" rx="12" fill="${C.creme}" stroke="${C.trait}"/>
<text x="510" y="100" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}" style="white-space:nowrap">S = π × d² / 4</text>
<text x="510" y="134" text-anchor="middle" font-size="15" fill="${C.navy}" style="white-space:nowrap">= 3,14 × ${nb(dia, 2)} × ${nb(dia, 2)} / 4</text>
<text x="510" y="170" text-anchor="middle" font-size="26" font-weight="700" fill="${C.orange}">${nb(S, 2)} mm²</text>
<text x="510" y="206" text-anchor="middle" font-size="13" font-weight="700" fill="${ok ? C.vert : C.rouge}">${ok ? 'c’est un ' + mm(proche) : 'entre deux sections : remesurez'}</text>

<text x="350" y="282" text-anchor="middle" font-size="13" fill="${C.gris}">Mesure sur l’âme dénudée, hors tension. Sur un fil souple, on lit la gaine.</text>`;
    };
    peindre();
    hote.appendChild(d);
    SchemasGrandeurs.reglette(hote, 'secD', 'Le diamètre', 1, 5, 0.01, dia, v => nb(v, 2) + ' mm', v => { dia = v; peindre(); });

    const p = document.createElement('p');
    p.className = 'legende';
    p.textContent = 'Cherchez le diamètre d’un fil de 2,5 mm², puis celui d’un 6 mm². '
      + 'La section a plus que doublé : le diamètre, lui, n’a pas doublé.';
    hote.appendChild(p);
    return hote;
  }

  /* ============================================================ temps 5
     Le tableau final : intensité × longueur → section, pour la pose choisie.
     Chaque case se clique et rend son calcul. */
  function tableau() {
    const hote = document.createElement('div');
    const o = { pose: 'B', isolant: 'PVC', tri: false, limite: 5 };
    const INTENSITES = [10, 16, 20, 25, 32, 40, 50, 63];
    const LONGUEURS = [10, 25, 50, 75, 100, 150];
    const zone = document.createElement('div');
    const detail = document.createElement('p'); detail.className = 'legende';
    detail.textContent = 'Cliquez une case : le calcul qui la justifie s’affiche ici.';

    const peindre = () => {
      const t = document.createElement('table'); t.className = 'tab';
      t.innerHTML = '<caption style="text-align:left;font-weight:700;padding-bottom:.3rem">Section en mm² — '
        + (o.tri ? 'triphasé 400 V' : 'monophasé 230 V') + ', ' + POSES.find(p => p.id === o.pose).court
        + ', isolant ' + o.isolant + ', chute sous ' + o.limite + ' %</caption>'
        + '<thead><tr><th>Intensité</th>' + LONGUEURS.map(L => '<th>' + L + ' m</th>').join('') + '</tr></thead>';
      const tb = document.createElement('tbody');
      INTENSITES.forEach(I => {
        const tr = document.createElement('tr');
        tr.innerHTML = '<th>' + I + ' A</th>';
        LONGUEURS.forEach(L => {
          const r = choisir(I, L, o);
          const td = document.createElement('td');
          td.style.cursor = 'pointer'; td.style.textAlign = 'center';
          td.tabIndex = 0;
          td.innerHTML = r.s ? (r.parLongueur ? '<strong>' + String(r.s).replace('.', ',') + ' ★</strong>' : String(r.s).replace('.', ','))
                             : '—';
          const montrer = () => {
            detail.textContent = !r.s
              ? I + ' A sur ' + L + ' m : au-delà de 95 mm², on change de solution.'
              : I + ' A sur ' + L + ' m : disjoncteur ' + r.In + ' A, il faut au moins ' + mm(r.sChauffe)
                + ' pour ne pas chauffer et ' + mm(r.sChute) + ' pour rester sous ' + o.limite + ' %. On prend '
                + mm(r.s) + ' : chute de ' + nb(r.c.pct) + ' %, et le câble admet ' + r.izRetenu + ' A.';
          };
          td.addEventListener('click', montrer);
          td.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); montrer(); } });
          tr.appendChild(td);
        });
        tb.appendChild(tr);
      });
      t.appendChild(tb);
      zone.replaceChildren(t);
    };

    barre(hote, POSES.map(p => [p.id, p.libelle]), 'B', id => { o.pose = id; peindre(); });
    barre(hote, [['PVC', 'Isolant PVC'], ['PR', 'Isolant PR (U-1000 R2V)']], 'PVC', id => { o.isolant = id; peindre(); });
    barre(hote, [['mono', 'Monophasé 230 V'], ['tri', 'Triphasé 400 V']], 'mono', id => { o.tri = id === 'tri'; peindre(); });
    barre(hote, [[5, 'Chute 5 %'], [3, 'Éclairage 3 %']], 5, v => { o.limite = v; peindre(); });
    hote.appendChild(zone);
    peindre();
    hote.appendChild(detail);
    const n = document.createElement('p'); n.className = 'legende';
    n.textContent = '★ : c’est la longueur qui impose cette section, pas l’échauffement. '
      + 'Le courant est pris égal au calibre. Cuivre, 30 °C, un seul circuit : la NF C 15-100 applique '
      + 'des facteurs de correction au-delà. Ce tableau prépare un choix, il ne remplace pas la note de calcul.';
    hote.appendChild(n);
    return hote;
  }

  return { curseurs, mesurer, tableau, choisir, iz, chute };
})();
