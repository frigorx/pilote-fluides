/* ÉlectroRézo — <electro-3d> : l'appareil en 3D, qu'on tourne, qu'on ouvre et qu'on actionne.

   <electro-3d modele="contacteur" mode="comprendre" options='{"variante":"aux"}'></electro-3d>

   POURQUOI. Les scènes dessinées expliquent un principe ; elles ne montrent jamais la machine.
   Ici l'élève voit l'objet qu'il aura dans la main à l'atelier, le fait tourner, l'ouvre
   (vue fantôme : le boîtier devient transparent) et le fait FONCTIONNER — l'armature descend,
   le bilame se courbe, le rotor tourne, le courant circule.

   RÈGLES DE MAISON, tenues par construction :
   · aucun texte explicatif dans l'image : les noms des pièces vivent dans la légende, à côté,
     à la taille du texte de la page. Survoler un nom allume la pièce ; cliquer une pièce
     allume son nom. Les « repères » sont des pastilles numérotées posées HORS de l'objet,
     reliées par un trait fin — comme une nomenclature de dessin technique ;
   · les seuls textes dans la 3D sont les marquages qui existent sur l'appareil réel
     (repères de bornes A1, 13, 95…) ;
   · les animations qui démontrent tournent même sous « animations réduites » (le poste de
     Franck et les PC du lycée l'annoncent) — seule la rotation d'accueil, décorative, s'y plie ;
   · fond clair, charte inerWeb.

   UN MODÈLE s'enregistre par Electro3D.definir(nom, fabrique, infos). La fabrique reçoit
   (T, K, ctx) — T : Three.js, K : le kit (kit.js), ctx : voir plus bas — et rend :
     { racine, pieces[], commandes[], agir(id, v), animer(dt, t), fantome[], vue{}, phrase, mesures[] }
   Contrat complet : chantier-3d/CONTRAT-MODELE-3D.md.

   REPLI. Sans WebGL, sans réseau, ou si le modèle plante : l'élément l'annonce
   (évènement « e3d-repli ») et le bloc de station montre la scène dessinée à la place. */
(() => {
  'use strict';
  if (window.Electro3D) return;

  const SRC = (document.currentScript && document.currentScript.src) || '';
  const BASE = SRC.replace(/electro3d\.js(\?.*)?$/, '');
  /* HydroMétro marche hors ligne : la copie locale d'abord (MIT, r160), le CDN en secours */
  const THREE_URLS = [
    ...(BASE && location.protocol !== 'file:' ? [BASE + 'vendor/three.module.min.js'] : []),
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.module.min.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js'
  ];
  let promesseThree = null;
  const chargerThree = () => promesseThree || (promesseThree = (async () => {
    let derniere;
    for (const u of THREE_URLS) { try { return await import(u); } catch (e) { derniere = e; } }
    promesseThree = null;
    throw derniere;
  })());

  /* la feuille de style du composant, une fois par page */
  if (BASE && !document.querySelector('link[data-e3d]')) {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = BASE + 'electro3d.css' + (SRC.match(/\?.*$/) || [''])[0]; l.dataset.e3d = '1';
    document.head.appendChild(l);
  }

  const MODELES = {};
  const definir = (nom, fabrique, infos) => { MODELES[nom] = { fabrique, infos: infos || {} }; };

  /* chaque modèle vit dans un fichier de famille, chargé à la demande : une station ne
     paie que ce qu'elle montre. La clé ?v= de ce fichier suit les fichiers chargés. */
  const FAMILLE_DE = {
    contacteur: 'commande',
    moteurAsynchrone: 'moteur',
    disjoncteur: 'protection', disjoncteurMoteur: 'protection', differentiel: 'protection', relaisThermique: 'protection', cartouche: 'protection',
    interrupteur: 'separation', sectionneur: 'separation', interSectionneur: 'separation', porteFusible: 'separation', sectionneurPF: 'separation',
    blocContacts: 'pilotage', relais: 'pilotage', relaisTemporise: 'pilotage', boutons: 'pilotage', arretUrgence: 'pilotage',
    circuit: 'grandeurs', multimetre: 'grandeurs', pince: 'grandeurs', alternateur: 'grandeurs',
    cablePrise: 'reseaux', cable5G: 'reseaux', etoile: 'reseaux', champTournant: 'reseaux',
    troisDefauts: 'defauts', priseDeTerre: 'defauts', cablesSections: 'defauts',
    electroAimant: 'machines', transformateur: 'machines', moteurMonophase: 'machines', machineCC: 'machines', plaqueABornes: 'machines',
    gradateur: 'variation', variateur: 'variation',
    /* HydroMétro */
    circulateur: 'pompes',
    vaseExpansion: 'securite', soupape: 'securite',
    vanne3voies: 'vannes', vanneEquilibrage: 'vannes', vanneReglage: 'vannes',
    echangeurPlaques: 'echangeurs',
    ballonTampon: 'ballons', bouteilleDecouplage: 'ballons',
    collecteur: 'distribution', radiateur: 'distribution',
    installation: 'installations', pacAirEau: 'production',
    compteurEnergie: 'mesure', thermometres: 'mesure', pertesCharge: 'reseau', debitmetre: 'reseau'
  };
  /* une famille qui assemble les modèles des autres les charge d'abord */
  const DEPEND = { variation: ['moteur'] };
  const Q = (SRC.match(/\?.*$/) || [''])[0];
  const scripts = {};
  const chargerScript = src => scripts[src] || (scripts[src] = new Promise((ok, ko) => {
    const s = document.createElement('script'); s.src = src;
    s.onload = ok; s.onerror = () => { delete scripts[src]; ko(new Error('chargement impossible : ' + src)); };
    document.head.appendChild(s);
  }));
  const chargerFamille = async f => {
    for (const d of (DEPEND[f] || [])) await chargerFamille(d);
    await chargerScript(BASE + 'modeles/' + f + '.js' + Q);
  };
  const assurerModele = async nom => {
    if (!window.Electro3DKit) await chargerScript(BASE + 'kit.js' + Q);
    if (!MODELES[nom] && FAMILLE_DE[nom]) await chargerFamille(FAMILLE_DE[nom]);
    return MODELES[nom] || null;
  };

  const D2R = Math.PI / 180;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const el = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x !== undefined) n.textContent = x; return n; };
  const reduit = () => !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ------------------------------------------------------------------ l'atelier
     Un environnement d'éclairage fabriqué : une pièce claire, un grand plafonnier, deux
     fenêtres tièdes et froides. Il donne les reflets du métal et du plastique ; la lumière
     directe, seule, donne l'ombre douce. */
  function envAtelier(T) {
    const s = new T.Scene();
    s.add(new T.Mesh(new T.BoxGeometry(60, 30, 60), new T.MeshBasicMaterial({ color: 0x8f877d, side: T.BackSide })));
    const sol = new T.Mesh(new T.PlaneGeometry(60, 60), new T.MeshBasicMaterial({ color: 0xcfc3b0 }));
    sol.rotation.x = -Math.PI / 2; sol.position.y = -14.5; s.add(sol);
    const panneau = (w, h, pos, col, k) => {
      const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: new T.Color(col).multiplyScalar(k), side: T.DoubleSide }));
      m.position.set(pos[0], pos[1], pos[2]); m.lookAt(0, 0, 0); s.add(m);
    };
    panneau(30, 18, [0, 14.6, 0], 0xffffff, 6);
    panneau(14, 14, [-28, 3, 8], 0xffe9cf, 8);
    panneau(12, 16, [28, 2, -6], 0xd8e6ff, 5);
    panneau(44, 5, [0, 5, -29], 0xffffff, 3.5);
    panneau(22, 8, [4, 1, 29], 0xfff4e4, 3);
    return s;
  }
  function textureHalo(T) {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const x = c.getContext('2d'), g = x.createRadialGradient(128, 128, 6, 128, 128, 127);
    g.addColorStop(0, 'rgba(236,224,203,.95)'); g.addColorStop(.45, 'rgba(241,232,215,.55)'); g.addColorStop(1, 'rgba(247,241,231,0)');
    x.fillStyle = g; x.fillRect(0, 0, 256, 256);
    const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t;
  }

  /* ------------------------------------------------------------------ l'élément */
  let compteur = 0;
  class Electro3DElement extends HTMLElement {
    constructor() { super(); this._id = ++compteur; this._etatInit = 'attente'; }

    connectedCallback() {
      if (this._dom) { this._observer && this._observer.observe(this); return; }
      this._construireDom();
      /* on ne charge que ce qui est vu : une station porte parfois deux vues 3D */
      this._observer = new IntersectionObserver(es => {
        for (const e of es) {
          this._visible = e.isIntersecting;
          if (this._visible && this._etatInit === 'attente') this._demarrer();
          if (this._visible) this._reveiller();
        }
      }, { rootMargin: '160px' });
      this._observer.observe(this);
    }
    disconnectedCallback() {
      /* une station démonte ses temps à chaque changement d'onglet : sans libération,
         les contextes WebGL s'accumulent et le navigateur finit par refuser le suivant */
      setTimeout(() => { if (!this.isConnected) this._detruire(); }, 0);
    }

    /* ---------- le squelette HTML ---------- */
    _construireDom() {
      const d = {};
      const racine = el('div', 'e3d');
      d.scene = el('div', 'e3d-scene');
      d.scene.tabIndex = 0;
      d.scene.setAttribute('role', 'img');
      d.scene.setAttribute('aria-label', 'Vue en trois dimensions. Faites glisser pour tourner l’appareil.');
      d.fils = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      d.fils.setAttribute('class', 'e3d-fils'); d.fils.setAttribute('aria-hidden', 'true');
      d.reperes = el('div', 'e3d-reperes'); d.reperes.setAttribute('aria-hidden', 'true');
      d.attente = el('div', 'e3d-attente', 'Ouverture de la vue 3D…');
      d.scene.append(d.fils, d.reperes, d.attente);

      d.outils = el('div', 'e3d-outils');
      d.btRecentrer = el('button', null, '⟲ Recentrer'); d.btRecentrer.type = 'button';
      d.btFantome = el('button', null, '◐ Voir dedans'); d.btFantome.type = 'button'; d.btFantome.setAttribute('aria-pressed', 'false');
      d.btReperes = el('button', null, '① Repères'); d.btReperes.type = 'button'; d.btReperes.setAttribute('aria-pressed', 'false');
      d.btPlein = el('button', null, '⛶ Plein écran'); d.btPlein.type = 'button';
      d.btEclate = el('button', 'e3d-bt-eclate', '⊞ Éclaté'); d.btEclate.type = 'button'; d.btEclate.setAttribute('aria-pressed', 'false'); d.btEclate.hidden = true;
      d.btRalenti = el('button', 'e3d-bt-ralenti', '🐢 Ralenti'); d.btRalenti.type = 'button'; d.btRalenti.setAttribute('aria-pressed', 'false');
      d.btFantome.classList.add('e3d-bt-fantome'); d.btReperes.classList.add('e3d-bt-reperes');
      const tactile = window.matchMedia && matchMedia('(pointer: coarse)').matches;
      d.aide = el('span', 'e3d-aide', tactile ? 'Glissez pour tourner · + et − pour zoomer' : 'Glissez pour tourner · Ctrl + molette pour zoomer');
      const zoom = el('span', 'e3d-zoom');
      d.btPlus = el('button', null, '+'); d.btPlus.type = 'button'; d.btPlus.setAttribute('aria-label', 'Rapprocher');
      d.btMoins = el('button', null, '−'); d.btMoins.type = 'button'; d.btMoins.setAttribute('aria-label', 'Éloigner');
      zoom.append(d.btMoins, d.btPlus);
      d.outils.append(d.btRecentrer, d.btFantome, d.btEclate, d.btReperes, d.btRalenti, zoom, d.btPlein, d.aide);

      d.cote = el('aside', 'e3d-cote');
      d.legendeTitre = el('h3', 'e3d-legende-titre', 'Les pièces');
      d.legende = el('ol', 'e3d-legende');
      d.cote.append(d.legendeTitre, d.legende);

      d.etapes = el('div', 'e3d-etapes'); d.etapes.hidden = true;
      d.commandes = el('div', 'e3d-commandes');
      d.mesures = el('div', 'lecture e3d-mesures');
      d.phrase = el('p', 'e3d-phrase'); d.phrase.setAttribute('aria-live', 'polite');

      const gauche = el('div', 'e3d-gauche');
      gauche.append(d.scene, d.outils, d.etapes, d.commandes, d.mesures, d.phrase);
      racine.append(gauche, d.cote);
      this.appendChild(racine);
      this._dom = d;

      d.btRecentrer.addEventListener('click', () => this._recentrer());
      d.btFantome.addEventListener('click', () => this.fantome(!this._fantome));
      d.btReperes.addEventListener('click', () => this.reperes(!this._reperesVisibles));
      d.btPlein.addEventListener('click', () => this._pleinEcran());
      d.btEclate.addEventListener('click', () => this.eclate(!this._eclate));
      d.btRalenti.addEventListener('click', () => this.ralenti(!this._ralenti));
      d.btPlus.addEventListener('click', () => { this._zoomC = clamp(this._zoomC * 1.25, 0.4, 4.5); this._touche(); });
      d.btMoins.addEventListener('click', () => { this._zoomC = clamp(this._zoomC * 0.8, 0.4, 4.5); this._touche(); });
      document.addEventListener('fullscreenchange', () => { this.classList.toggle('plein', document.fullscreenElement === this); this._redim = true; this._touche(); });
    }

    /* ---------- le démarrage ---------- */
    async _demarrer() {
      this._etatInit = 'chargement';
      const nom = this.getAttribute('modele');
      let def, T;
      try { def = await assurerModele(nom); } catch (e) { return this._repli('modele', 'Le modèle 3D n’a pas pu se charger.'); }
      if (!def) return this._repli('modele', 'Modèle 3D inconnu : ' + nom);
      try { T = await chargerThree(); } catch (e) { return this._repli('reseau', 'La bibliothèque 3D n’a pas pu se charger (pas de réseau ?).'); }
      if (!this.isConnected) { this._etatInit = 'attente'; return; }
      try { this._monter(T, def); }
      catch (e) { console.warn('electro-3d :', nom, e); return this._repli('webgl', 'La vue 3D n’a pas pu s’ouvrir sur cet appareil.'); }
      this._etatInit = 'pret';
      this._dom.attente.remove();
      this.dataset.pret = '1';
      this.dispatchEvent(new CustomEvent('e3d-pret', { bubbles: true }));
      this._reveiller();
    }

    _repli(raison, message) {
      this._etatInit = 'repli';
      this.dataset.repli = raison;
      if (this._dom) {
        this._dom.attente.textContent = message;
        this._dom.attente.classList.add('echec');
      }
      this.dispatchEvent(new CustomEvent('e3d-repli', { bubbles: true, detail: { raison } }));
    }

    _monter(T, def) {
      const d = this._dom;
      this._T = T;
      const rd = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      if (!rd.getContext()) throw new Error('pas de WebGL');
      rd.setClearColor(0x000000, 0);
      rd.outputColorSpace = T.SRGBColorSpace;
      rd.toneMapping = T.ACESFilmicToneMapping; rd.toneMappingExposure = 1.0;
      rd.shadowMap.enabled = true; rd.shadowMap.type = T.PCFSoftShadowMap;
      rd.localClippingEnabled = true;
      this._pr = Math.min(window.devicePixelRatio || 1, 2); rd.setPixelRatio(this._pr);
      d.scene.insertBefore(rd.domElement, d.fils);
      this._rd = rd;

      const sc = new T.Scene(); this._sc = sc;
      const pm = new T.PMREMGenerator(rd); const env = envAtelier(T);
      this._envRT = pm.fromScene(env, 0.035); sc.environment = this._envRT.texture; pm.dispose();
      env.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });

      this._cam = new T.PerspectiveCamera(30, 1, 1, 10000);
      const dl = new T.DirectionalLight(0xfff3e4, 1.5);
      dl.castShadow = true; dl.shadow.mapSize.set(1024, 1024); dl.shadow.bias = -0.0005; dl.shadow.normalBias = 0.5;
      sc.add(dl, dl.target); this._dl = dl;
      sc.add(new T.HemisphereLight(0xffffff, 0xd9cdb8, 0.35));

      /* le kit : matériaux et briques, propres à cet élément (libérés avec lui) */
      const K = window.Electro3DKit(T);
      this._K = K;

      const ctx = {
        mode: this.getAttribute('mode') || 'comprendre',
        options: this._lireOptions(),
        dire: html => { d.phrase.innerHTML = html || ''; },
        mesures: liste => this._ecrireMesures(liste),
        regler: (id, v, extra) => this._reglerCommande(id, v, extra),
        reveiller: () => this._reveiller(),
        element: this
      };
      this._ctx = ctx;
      const M = def.fabrique(T, K, ctx);
      if (!M || !M.racine) throw new Error('le modèle ne rend pas de racine');
      this._M = M;
      this._groupe = new T.Group(); this._groupe.add(M.racine); sc.add(this._groupe);
      M.racine.traverse(o => { if (o.isMesh) { o.castShadow = !o.userData.sansOmbre; o.receiveShadow = !o.userData.sansOmbre; } });

      /* l'emprise : tout l'objet pour l'ombre et le décor, le « cadre » du modèle pour la caméra */
      const boite = new T.Box3().setFromObject(M.racine);
      const centre = boite.getCenter(new T.Vector3()), taille = boite.getSize(new T.Vector3());
      const R = Math.max(taille.x, taille.y, taille.z) * 0.5 || 50;
      this._R = R;
      const v = M.vue || {};
      const bCadre = new T.Box3();
      (v.cadre && v.cadre.length ? v.cadre : [M.racine]).forEach(o => bCadre.expandByObject(o));
      const sphere = bCadre.getBoundingSphere(new T.Sphere());
      this._Rc = sphere.radius || R;
      this._marge = v.marge || 1.04;
      this._bCorps = bCadre;

      if (M.fond === 'platine') {
        /* une platine d'armoire derrière le rail : l'ombre y tombe, l'appareil ne flotte plus */
        const mat = K.propre(K.mat.plastique); mat.color.setHex(0xe9e5dc); mat.roughness = 0.85;
        const pl = new T.Mesh(new T.PlaneGeometry(R * 70, R * 70), mat);
        pl.position.set(centre.x, centre.y, boite.min.z - 0.3); pl.receiveShadow = true; pl.userData.decor = true; pl.userData.sansOmbre = true;
        sc.add(pl); this._decor = [pl];
        dl.position.set(centre.x - R * 1.3, centre.y + R * 2.4, boite.max.z + R * 3.0);
      } else if (M.sansSol) {
        this._decor = [];
        dl.position.set(centre.x - R * 1.6, centre.y + R * 3.4, centre.z + R * 2.2);
      } else {
        /* le sol : un halo tiède et une ombre douce, juste sous l'objet */
        const halo = new T.Mesh(new T.PlaneGeometry(R * 9, R * 9), new T.MeshBasicMaterial({ map: textureHalo(T), transparent: true, depthWrite: false, toneMapped: false }));
        halo.rotation.x = -Math.PI / 2; halo.position.set(centre.x, boite.min.y - R * 0.004, centre.z); halo.renderOrder = -2; halo.userData.decor = true;
        const sol = new T.Mesh(new T.PlaneGeometry(R * 9, R * 9), new T.ShadowMaterial({ opacity: 0.22 }));
        sol.rotation.x = -Math.PI / 2; sol.position.set(centre.x, boite.min.y - R * 0.002, centre.z); sol.receiveShadow = true; sol.userData.decor = true;
        sc.add(halo, sol); this._decor = [halo, sol];
        dl.position.set(centre.x - R * 1.6, centre.y + R * 3.4, centre.z + R * 2.2);
      }
      dl.target.position.copy(centre);
      const sh = dl.shadow.camera; sh.left = -R * 2; sh.right = R * 2; sh.top = R * 2; sh.bottom = -R * 2; sh.near = R * 0.3; sh.far = R * 9; sh.updateProjectionMatrix();

      /* la caméra : en orbite autour du centre du cadre ; la distance se recalcule à chaque
         changement de taille (largeur ET hauteur), le zoom est un rapport */
      this._cible0 = sphere.center.clone();
      if (v.cible) this._cible0.set(v.cible[0], v.cible[1], v.cible[2]);
      this._cible = this._cible0.clone(); this._cibleC = this._cible0.clone();
      this._az0 = (v.azimut !== undefined ? v.azimut : -32) * D2R;
      this._el0 = (v.elevation !== undefined ? v.elevation : 22) * D2R;
      this._zoom0 = v.zoom || 1;
      this._az = this._azC = this._az0; this._el = this._elC = this._el0;
      this._zoom = this._zoomC = this._zoom0;
      this._distBase = this._Rc / Math.sin(15 * D2R) * this._marge;
      this._cam.near = Math.max(0.5, R * 0.02); this._cam.far = R * 60; this._cam.updateProjectionMatrix();

      /* pièces : chaque objet sait à quelle pièce il appartient (pour le clic) */
      this._pieces = (M.pieces || []).map((p, i) => {
        const objets = (p.objets || []).filter(Boolean);
        objets.forEach(o => o.traverse(x => { x.userData.piece = p.id; }));
        return Object.assign({ num: i + 1 }, p, { objets });
      });
      this._fantomes = (M.fantome || []).filter(Boolean);
      this._matOrig = new Map();
      this._construireLegende();
      this._construireCommandes(M.commandes || []);
      if (M.phrase) ctx.dire(M.phrase);
      if (M.mesures) this._ecrireMesures(M.mesures);
      this._coupe = typeof M.basculerFantome === 'function';
      d.btFantome.hidden = !(this._fantomes.length || this._coupe);
      d.btReperes.hidden = !this._pieces.length;

      this._fantome = false;
      if ((this._fantomes.length || this._coupe) && (M.fantomeAuDepart !== undefined ? M.fantomeAuDepart : ctx.mode === 'comprendre')) this.fantome(true);
      this._tourne = ctx.mode === 'decouvrir' && !reduit();
      this._echelle = 1;
      this._preparerEclate(M.eclate || []);
      d.btEclate.hidden = !this._eclats.length;
      this._construireEtapes(M.etapes || []);

      this._brancherPointeur();
      this._ro = new ResizeObserver(() => { this._redim = true; this._touche(); });
      this._ro.observe(d.scene);
      this._redim = true;
      this._ombreSale = true;
    }

    _lireOptions() {
      const o = this.getAttribute('options');
      if (!o) return {};
      try { return JSON.parse(o); } catch (e) { console.warn('electro-3d : options illisibles', o); return {}; }
    }

    /* ---------- légende : les noms à côté, jamais dans l'image ---------- */
    _construireLegende() {
      const d = this._dom;
      d.legende.innerHTML = '';
      if (!this._pieces.length) { d.cote.hidden = true; return; }
      this._pieces.forEach(p => {
        const li = el('li');
        const b = el('button', 'e3d-piece'); b.type = 'button'; b.dataset.piece = p.id;
        b.append(el('span', 'e3d-num', String(p.num)), el('span', 'e3d-nom', p.nom));
        b.setAttribute('aria-expanded', 'false');
        const desc = el('p', 'e3d-desc'); desc.innerHTML = p.desc || ''; desc.hidden = true;
        b.addEventListener('mouseenter', () => this._survoler(p.id));
        b.addEventListener('mouseleave', () => this._survoler(null));
        b.addEventListener('focus', () => this._survoler(p.id));
        b.addEventListener('blur', () => this._survoler(null));
        b.addEventListener('click', () => this.choisir(this._choisie === p.id ? null : p.id));
        li.append(b, desc);
        d.legende.appendChild(li);
        p._li = li; p._bouton = b; p._desc = desc;
      });
    }

    _survoler(id) { this._survolee = id; this._majSurbrillance(); }

    choisir(id) {
      this._choisie = id;
      this._pieces.forEach(p => {
        const on = p.id === id;
        p._li.classList.toggle('choisie', on);
        p._bouton.setAttribute('aria-expanded', on ? 'true' : 'false');
        p._desc.hidden = !on;
      });
      this._majSurbrillance();
      if (id) {
        const p = this._pieces.find(x => x.id === id);
        if (p && p._li.scrollIntoView && this._dom.cote.scrollHeight > this._dom.cote.clientHeight) p._li.scrollIntoView({ block: 'nearest' });
      }
    }

    /* la pièce allumée : un orange qui respire, par-dessus le fantôme s'il y en a un */
    _majSurbrillance() {
      const T = this._T; if (!T) return;
      const ids = new Set([this._choisie, this._survolee].filter(Boolean));
      this._allumees = [];
      this._pieces.forEach(p => {
        const on = ids.has(p.id);
        p._bouton && p._bouton.classList.toggle('allumee', on);
        p.objets.forEach(o => o.traverse(m => {
          if (!m.isMesh) return;
          if (on) { this._allumer(m); this._allumees.push(m); }
          else if (m.userData.allumee) this._eteindre(m);
        }));
      });
      this._touche();
    }
    _allumer(m) {
      if (m.userData.allumee) return;
      const base = m.userData.matAvantSurbrillance = m.material;
      const src = this._matOrig.get(m) || base;
      /* un marquage (K.gravure : texture transparente) rendu opaque devient un rectangle noir :
         on le laisse tel quel, la pièce s'allume autour de lui (HydroMétro, 02/10/2026) */
      if (src.isMeshBasicMaterial && src.map && src.transparent && !m.userData.voile) { m.userData.allumee = true; return; }
      const c = src.clone();
      if (m.userData.voile) {
        /* un voile posé sur une zone (une ligne de plaque) : il s'allume sans cacher ce qu'il couvre */
        c.transparent = true; c.opacity = 0.3; c.depthWrite = false; if (c.color) c.color.setHex(0xff6b35);
      } else {
        c.transparent = false; c.opacity = 1; c.depthWrite = true;
        if (c.emissive) { c.emissive.setHex(0xff6b35); c.emissiveIntensity = 0.45; }
        else if (c.color) c.color.lerp(new this._T.Color(0xff6b35), 0.5);
      }
      m.material = c; m.userData.allumee = true;
    }
    _eteindre(m) {
      const c = m.material;
      m.material = m.userData.matAvantSurbrillance; m.userData.allumee = false;
      if (c && c !== m.material) c.dispose();
    }

    /* ---------- vue fantôme : le boîtier devient transparent ---------- */
    fantome(on) {
      if (!this._T || !(this._fantomes.length || this._coupe)) return;
      this._fantome = !!on;
      this._dom.btFantome.setAttribute('aria-pressed', on ? 'true' : 'false');
      const lib = this._M.libellesFantome || ['◐ Voir dedans', '◑ Refermer'];
      this._dom.btFantome.textContent = on ? lib[1] : lib[0];
      /* une machine qui s'ouvre en COUPE (le moteur) le fait elle-même */
      if (this._coupe) {
        this._survolee = null; const choisie = this._choisie; this._choisie = null; this._majSurbrillance();
        try { this._M.basculerFantome(!!on); } catch (e) { console.warn('electro-3d : coupe', e); }
        this._choisie = choisie; this._majSurbrillance();
        this._ombreSale = true; this._touche(); return;
      }
      const cache = this._cacheFantome || (this._cacheFantome = new Map());
      this._fantomes.forEach(o => o.traverse(m => {
        if (!m.isMesh) return;
        const allumee = m.userData.allumee;
        if (allumee) this._eteindre(m);
        if (on) {
          if (!this._matOrig.has(m)) this._matOrig.set(m, m.material);
          const orig = this._matOrig.get(m);
          let g = cache.get(orig);
          if (!g) {
            g = orig.clone(); g.transparent = true; g.opacity = 0.13; g.depthWrite = false;
            if (g.roughness !== undefined) g.roughness = Math.min(1, g.roughness + 0.2);
            cache.set(orig, g);
          }
          m.material = g; m.castShadow = false; m.userData.fantome = true;
          if (!m.userData.aretes) {
            const ar = new this._T.LineSegments(new this._T.EdgesGeometry(m.geometry, 24), this._matAretes || (this._matAretes = new this._T.LineBasicMaterial({ color: 0x1b3a63, transparent: true, opacity: 0.28, depthWrite: false })));
            ar.userData.decor = true; ar.raycast = () => {}; m.add(ar); m.userData.aretes = ar;
          }
          m.userData.aretes.visible = true;
        } else if (this._matOrig.has(m)) {
          m.material = this._matOrig.get(m); m.castShadow = !m.userData.sansOmbre; m.userData.fantome = false;
          if (m.userData.aretes) m.userData.aretes.visible = false;
        }
        if (allumee) this._allumer(m);
      }));
      this._ombreSale = true;
      this._touche();
    }

    /* ---------- repères : pastilles hors de l'objet, trait fin jusqu'à la pièce ---------- */
    reperes(on) {
      this._reperesVisibles = !!on;
      this._dom.btReperes.setAttribute('aria-pressed', on ? 'true' : 'false');
      this._dom.reperes.innerHTML = ''; this._dom.fils.innerHTML = '';
      this._puces = null;
      if (on && ((this._fantomes && this._fantomes.length) || this._coupe) && !this._fantome) this.fantome(true);
      if (on) {
        this._puces = this._pieces.map(p => {
          const b = el('span', 'e3d-puce', String(p.num));
          b.addEventListener('click', () => this.choisir(p.id));
          this._dom.reperes.appendChild(b);
          const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', '3');
          this._dom.fils.append(l, c);
          return { p, b, l, c };
        });
      }
      this._touche();
    }
    _placerReperes() {
      if (!this._puces) return;
      const T = this._T, W = this._W, H = this._H, cam = this._cam;
      const v = new T.Vector3(), boite = new T.Box3();
      /* l'emprise du corps de l'objet à l'écran (le cadre du modèle, pas ses fils) */
      const bb = this._bCorps;
      let x0 = 1e9, x1 = -1e9;
      for (let i = 0; i < 8; i++) {
        v.set(i & 1 ? bb.max.x : bb.min.x, i & 2 ? bb.max.y : bb.min.y, i & 4 ? bb.max.z : bb.min.z).project(cam);
        const sx = (v.x + 1) / 2 * W; x0 = Math.min(x0, sx); x1 = Math.max(x1, sx);
      }
      const cx = (x0 + x1) / 2;
      /* deux colonnes, comme une nomenclature : à gauche les pièces de gauche, à droite les autres */
      const colG = clamp(x0 - 34, 20, W * 0.5 - 30), colD = clamp(x1 + 34, W * 0.5 + 30, W - 20);
      const items = this._puces.map(q => {
        if (q.p.ancre) v.set(q.p.ancre[0], q.p.ancre[1], q.p.ancre[2]).applyMatrix4(this._M.racine.matrixWorld);
        else { boite.makeEmpty(); q.p.objets.forEach(o => boite.expandByObject(o)); boite.getCenter(v); }
        v.project(cam);
        return { q, ax: (v.x + 1) / 2 * W, ay: (1 - v.y) / 2 * H };
      });
      const PAS = 36, HAUT = 20, BAS = H - 20;
      const ranger = liste => {
        liste.sort((a, b) => a.ay - b.ay);
        liste.forEach(it => { it.py = clamp(it.ay, HAUT, BAS); });
        for (let i = 1; i < liste.length; i++) if (liste[i].py < liste[i - 1].py + PAS) liste[i].py = liste[i - 1].py + PAS;
        const deb = liste.length ? liste[liste.length - 1].py - BAS : 0;
        if (deb > 0) { liste.forEach(it => { it.py -= deb; }); for (let i = liste.length - 2; i >= 0; i--) if (liste[i].py > liste[i + 1].py - PAS) liste[i].py = liste[i + 1].py - PAS; }
      };
      const cote = this._M.reperesCote;
      const g = cote === 'droite' ? [] : cote === 'gauche' ? items.slice() : items.filter(it => it.ax < cx);
      const d = cote === 'droite' ? items.slice() : cote === 'gauche' ? [] : items.filter(it => it.ax >= cx);
      /* équilibrer : une colonne trop chargée cède ses pièces les plus centrales */
      while (!cote && g.length > d.length + 2) { g.sort((a, b) => b.ax - a.ax); d.push(g.shift()); }
      while (!cote && d.length > g.length + 2) { d.sort((a, b) => a.ax - b.ax); g.push(d.shift()); }
      ranger(g); ranger(d);
      g.forEach(it => { it.px = colG; }); d.forEach(it => { it.px = colD; });
      items.forEach(it => {
        const px = it.px, py = it.py;
        it.q.b.style.transform = 'translate(' + (px - 15) + 'px,' + (py - 15) + 'px)';
        const dx = it.ax - px, dy = it.ay - py, L = Math.hypot(dx, dy) || 1;
        it.q.l.setAttribute('x1', (px + dx / L * 15).toFixed(1)); it.q.l.setAttribute('y1', (py + dy / L * 15).toFixed(1));
        it.q.l.setAttribute('x2', it.ax.toFixed(1)); it.q.l.setAttribute('y2', it.ay.toFixed(1));
        it.q.c.setAttribute('cx', it.ax.toFixed(1)); it.q.c.setAttribute('cy', it.ay.toFixed(1));
        const on = it.q.p.id === this._choisie || it.q.p.id === this._survolee;
        it.q.b.classList.toggle('allumee', on); it.q.l.classList.toggle('allumee', on); it.q.c.classList.toggle('allumee', on);
      });
    }

    /* ---------- commandes : construites depuis le modèle, mêmes classes que les scènes ---------- */
    _construireCommandes(liste) {
      const d = this._dom; d.commandes.innerHTML = '';
      this._cmd = {};
      liste.forEach(c => {
        const bloc = el('div', 'e3d-cmd');
        if (c.type === 'curseur') {
          const r = el('div', 'reglette');
          const lab = el('label', null, c.libelle);
          const inp = document.createElement('input'); inp.type = 'range';
          inp.min = c.min; inp.max = c.max; inp.step = c.pas || 1; inp.value = c.valeur !== undefined ? c.valeur : c.min;
          inp.id = 'e3d' + this._id + '-' + c.id; lab.htmlFor = inp.id;
          const out = el('output');
          const ecrire = () => { out.textContent = (c.format ? c.format(+inp.value) : String(inp.value).replace('.', ',') + (c.unite ? ' ' + c.unite : '')); };
          ecrire();
          inp.addEventListener('input', () => { ecrire(); this._agir(c.id, +inp.value); });
          r.append(lab, inp, out); bloc.appendChild(r);
          this._cmd[c.id] = { c, inp, ecrire };
        } else if (c.type === 'action') {
          const b = el('button', c.accent ? 'accent' : null, c.libelle); b.type = 'button';
          b.addEventListener('click', () => this._agir(c.id, true));
          const choix = el('div', 'choix'); choix.appendChild(b); bloc.appendChild(choix);
          this._cmd[c.id] = { c, b };
        } else { /* choix : des boutons à état, comme les scènes dessinées */
          if (c.titre) bloc.appendChild(el('span', 'e3d-cmd-titre', c.titre));
          const choix = el('div', 'choix');
          const boutons = c.options.map(([val, lib]) => {
            const b = el('button', null, lib); b.type = 'button'; b.dataset.val = val;
            b.setAttribute('aria-pressed', String(val === c.valeur));
            b.addEventListener('click', () => { this._reglerCommande(c.id, val); this._agir(c.id, val); });
            choix.appendChild(b); return b;
          });
          bloc.appendChild(choix);
          this._cmd[c.id] = { c, boutons };
        }
        d.commandes.appendChild(bloc);
      });
      d.commandes.hidden = !liste.length;
    }
    _reglerCommande(id, v, extra) {
      const k = this._cmd && this._cmd[id]; if (!k) return;
      if (k.boutons) k.boutons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.val === String(v))));
      if (k.inp && v !== undefined && v !== null) { k.inp.value = v; k.ecrire(); }
      if (extra) {
        const cibles = k.boutons || (k.b ? [k.b] : k.inp ? [k.inp] : []);
        if (extra.desactive !== undefined) cibles.forEach(b => { b.disabled = !!extra.desactive; });
        if (extra.libelle && k.b) k.b.textContent = extra.libelle;
      }
    }
    _agir(id, v) {
      this._tourne = false;
      try { this._M.agir && this._M.agir(id, v); } catch (e) { console.warn('electro-3d : agir', id, e); }
      this._ombreSale = true;
      this._touche();
    }
    /* même chose, appelable depuis l'extérieur (vérificateur, narration) */
    agir(id, v) {
      if (!this._M) return false;
      const k = this._cmd && this._cmd[id];
      if (k && k.boutons) this._reglerCommande(id, v);
      if (k && k.inp) this._reglerCommande(id, v);
      this._agir(id, v); return true;
    }

    _ecrireMesures(liste) {
      const d = this._dom; d.mesures.innerHTML = '';
      (liste || []).forEach(m => {
        const b = el('div', 'metric');
        b.append(el('span', null, m.libelle), el('strong', null, m.valeur));
        d.mesures.appendChild(b);
      });
      d.mesures.hidden = !(liste && liste.length);
    }

    /* ---------- la souris, le doigt, le clavier ---------- */
    _brancherPointeur() {
      const s = this._dom.scene; let act = null, x0 = 0, y0 = 0, xd = 0, yd = 0, bouge = 0;
      s.addEventListener('pointerdown', e => {
        if (e.target.closest('.e3d-puce')) return;
        act = e.pointerId; x0 = xd = e.clientX; y0 = yd = e.clientY; bouge = 0;
        try { s.setPointerCapture(act); } catch (x) {}
        s.classList.add('prend'); this._tourne = false; this._dom.aide.classList.add('vue'); this._touche();
      });
      s.addEventListener('pointermove', e => {
        if (e.pointerId !== act) { this._survolScene(e); return; }
        const dx = e.clientX - x0, dy = e.clientY - y0; x0 = e.clientX; y0 = e.clientY;
        bouge += Math.abs(dx) + Math.abs(dy);
        this._azC -= dx * 0.009;
        if (e.pointerType !== 'touch') this._elC = clamp(this._elC + dy * 0.007, -0.15, 1.45);
        this._touche();
      });
      const fin = e => {
        if (e.pointerId !== act) return;
        act = null; s.classList.remove('prend');
        if (bouge < 6 && e.type === 'pointerup') this._cliquer(xd, yd);
        this._touche();
      };
      s.addEventListener('pointerup', fin); s.addEventListener('pointercancel', fin);
      s.addEventListener('pointerleave', () => { if (this._survolee && !act) { this._survolee = null; this._majSurbrillance(); s.style.cursor = ''; } });
      s.addEventListener('wheel', e => {
        if (!e.ctrlKey && document.fullscreenElement !== this) return;
        e.preventDefault();
        this._zoomC = clamp(this._zoomC * Math.exp(-e.deltaY * 0.0012), 0.4, 4.5); this._touche();
      }, { passive: false });
      s.addEventListener('dblclick', () => this._recentrer());
      s.addEventListener('keydown', e => {
        const k = { ArrowLeft: [0.14, 0, 1], ArrowRight: [-0.14, 0, 1], ArrowUp: [0, -0.09, 1], ArrowDown: [0, 0.09, 1], '+': [0, 0, 0.85], '-': [0, 0, 1.18] }[e.key];
        if (!k) return;
        e.preventDefault(); this._tourne = false;
        this._azC += k[0]; this._elC = clamp(this._elC + k[1], -0.15, 1.45);
        this._zoomC = clamp(this._zoomC / k[2], 0.4, 4.5); this._touche();
      });
    }
    _rayon(cx, cy) {
      const T = this._T, r = this._dom.scene.getBoundingClientRect();
      const ndc = new T.Vector2((cx - r.left) / r.width * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
      const ray = this._ray || (this._ray = new T.Raycaster());
      ray.setFromCamera(ndc, this._cam);
      const visible = o => { for (let x = o; x; x = x.parent) if (!x.visible) return false; return true; };
      const touches = ray.intersectObject(this._M.racine, true).filter(h => h.object.userData.piece && !h.object.userData.fantome && !h.object.userData.decor && visible(h.object));
      return touches.length ? touches[0].object.userData.piece : null;
    }
    _cliquer(cx, cy) {
      if (!this._pieces.length) return;
      const id = this._rayon(cx, cy);
      this.choisir(id && id !== this._choisie ? id : null);
    }
    _survolScene(e) {
      if (!this._pieces.length || e.pointerType === 'touch') return;
      const now = performance.now(); if (now - (this._dernierSurvol || 0) < 60) return; this._dernierSurvol = now;
      const id = this._rayon(e.clientX, e.clientY);
      this._dom.scene.style.cursor = id ? 'pointer' : '';
      if (id !== this._survolee) { this._survolee = id; this._majSurbrillance(); }
    }
    /* ---------- l'éclaté : chaque groupe s'écarte de son vecteur, en douceur ----------
       Le moteur glisse un groupe « éclateur » au-dessus de chaque objet listé : le modèle
       garde la main sur l'objet (il peut l'animer), l'éclateur ne fait que le déplacer. */
    _preparerEclate(liste) {
      const T = this._T;
      this._eclats = [];
      liste.forEach(e => (e.objets || []).filter(Boolean).forEach(o => {
        const p = o.parent; if (!p) return;
        const g = new T.Group(); g.name = 'eclateur';
        p.add(g); g.add(o);
        this._eclats.push({ g, v: new T.Vector3(e.vers[0] || 0, e.vers[1] || 0, e.vers[2] || 0), debut: e.debut || 0, fin: e.fin === undefined ? 1 : e.fin });
      }));
      this._eclateT = 0; this._eclateC = 0; this._eclate = false;
    }
    eclate(on) {
      if (!this._eclats || !this._eclats.length) return;
      this._eclate = !!on; this._eclateC = on ? 1 : 0;
      this._dom.btEclate.setAttribute('aria-pressed', String(!!on));
      this._dom.btEclate.textContent = on ? '⊟ Rassembler' : '⊞ Éclaté';
      const v = this._M.eclateVue;
      /* éclaté : les pièces opaques se lisent mieux ; on rend le fantôme en refermant */
      if (on && this._fantome && !this._coupe) { this._fantomeAvantEclate = true; this.fantome(false); }
      if (!on && this._fantomeAvantEclate) { this._fantomeAvantEclate = false; this.fantome(true); }
      if (on && v) this.orienter(v.azimut, v.elevation, v.zoom, v.cible || null);
      else if (on) this._zoomC = this._zoom0 / 1.4;
      else { this._zoomC = this._zoom0; this._cibleC.copy(this._cible0); }
      try { this._M.surEclate && this._M.surEclate(!!on); } catch (e) {}
      this._tourne = false; this._touche();
    }
    _poserEclate() {
      /* chaque groupe part à son heure (debut → fin, entre 0 et 1) : on démonte dans l'ordre,
         comme à l'atelier, et les pièces ne se traversent pas */
      const t = this._eclateT;
      this._eclats.forEach(e => {
        const u = clamp((t - e.debut) / Math.max(0.01, e.fin - e.debut), 0, 1), s = u * u * (3 - 2 * u);
        e.g.position.copy(e.v).multiplyScalar(s);
      });
      this._ombreSale = true;
    }
    _avancerEclate(dt) {
      if (!this._eclats || !this._eclats.length || this._eclateT === this._eclateC) return false;
      const pas = dt / 1.8;
      this._eclateT = this._eclateC > this._eclateT ? Math.min(this._eclateC, this._eclateT + pas) : Math.max(this._eclateC, this._eclateT - pas);
      this._poserEclate();
      return true;
    }

    /* ---------- le ralenti : le temps du mécanisme passe cinq fois moins vite ---------- */
    ralenti(on) {
      this._ralenti = !!on; this._echelle = on ? 0.2 : 1;
      this._dom.btRalenti.setAttribute('aria-pressed', String(!!on));
      this._touche();
    }

    /* ---------- le mouvement, pas à pas ----------
       Chaque étape : un seul évènement physique, raconté cause → effet, vu du meilleur
       endroit, la pièce qui agit allumée. C'est le cœur pédagogique de la vue 3D. */
    _construireEtapes(liste) {
      const d = this._dom; d.etapes.innerHTML = '';
      this._etapes = liste; this._etape = -1;
      if (!liste.length) { d.etapes.hidden = true; return; }
      d.etapes.hidden = false;
      const titre = el('span', 'e3d-etapes-titre', 'Le mouvement, pas à pas');
      const points = el('span', 'e3d-etapes-points');
      this._pointsEtapes = liste.map((e, i) => {
        const b = el('button', null, String(i + 1)); b.type = 'button';
        b.setAttribute('aria-label', 'Étape ' + (i + 1) + ' : ' + e.titre);
        b.addEventListener('click', () => { this._arreterLecture(); this.allerEtape(i); });
        points.appendChild(b); return b;
      });
      const prec = el('button', null, '◀'); prec.type = 'button'; prec.setAttribute('aria-label', 'Étape précédente');
      const suiv = el('button', 'primary', 'Étape suivante ▶'); suiv.type = 'button';
      const lire = el('button', null, '▶ Tout voir'); lire.type = 'button';
      prec.addEventListener('click', () => { this._arreterLecture(); this.allerEtape(Math.max(0, this._etape - 1)); });
      suiv.addEventListener('click', () => { this._arreterLecture(); this.allerEtape(this._etape + 1); });
      lire.addEventListener('click', () => { if (this._lecture) this._arreterLecture(); else this._lire(); });
      d.etapes.append(titre, points, prec, suiv, lire);
      this._btEtapes = { prec, suiv, lire };
      this._majEtapes();
    }
    allerEtape(i) {
      const L = this._etapes; if (!L || !L.length) return;
      if (i >= L.length) { this._arreterLecture(); return; }
      i = Math.max(0, i); this._etape = i;
      const e = L[i];
      if (e.voirDedans !== undefined) this.fantome(!!e.voirDedans);
      if (e.eclate !== undefined) this.eclate(!!e.eclate);
      this.ralenti(!!e.ralenti);
      (e.actions || []).forEach(([id, v]) => this.agir(id, v));
      if (e.faire) { try { e.faire(); } catch (x) { console.warn('electro-3d : étape', x); } }
      if (e.vue) this.orienter(e.vue.azimut, e.vue.elevation, e.vue.zoom, e.vue.cible || null);
      this.choisir(e.piece || null);
      this._dom.phrase.innerHTML = '<span class="e3d-badge">Étape ' + (i + 1) + ' / ' + L.length + '</span><strong>' + e.titre + '.</strong> ' + (e.texte || '');
      this._majEtapes();
      this._tourne = false; this._touche();
    }
    _majEtapes() {
      if (!this._btEtapes) return;
      const n = this._etapes.length, i = this._etape;
      this._pointsEtapes.forEach((b, k) => { if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
      this._btEtapes.prec.disabled = i <= 0;
      this._btEtapes.suiv.disabled = i >= n - 1;
      this._btEtapes.suiv.textContent = i < 0 ? 'Commencer ▶' : 'Étape suivante ▶';
      this._btEtapes.lire.textContent = this._lecture ? '⏸ Pause' : '▶ Tout voir';
    }
    _lire() {
      this._lecture = true;
      const suite = () => {
        if (!this._lecture || !this.isConnected) return;
        const i = this._etape + 1;
        if (i >= this._etapes.length) { this._arreterLecture(); return; }
        this.allerEtape(i);
        this._minuteurLecture = setTimeout(suite, (this._etapes[i].duree || 6) * 1000);
      };
      if (this._etape >= this._etapes.length - 1) this._etape = -1;
      suite(); this._majEtapes();
    }
    _arreterLecture() { this._lecture = false; clearTimeout(this._minuteurLecture); this._majEtapes(); }

    _poserCamera() {
      const c = this._cible, ce = Math.cos(this._el), d = this._distBase / this._zoom;
      this._cam.position.set(c.x + d * ce * Math.sin(this._az), c.y + d * Math.sin(this._el), c.z + d * ce * Math.cos(this._az));
      this._cam.lookAt(c);
    }
    _recentrer() {
      this._azC = this._az0; this._elC = this._el0; this._zoomC = this._zoom0; this._cibleC.copy(this._cible0); this._touche();
    }
    _pleinEcran() {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (this.requestFullscreen) this.requestFullscreen().catch(() => {});
    }

    /* ---------- la boucle : on ne dessine que s'il se passe quelque chose ---------- */
    _touche() { this._sale = true; this._reveiller(); }
    _reveiller() {
      if (this._etatInit !== 'pret' || this._raf || !this._visible || document.hidden) return;
      this._t0 = performance.now();
      this._raf = requestAnimationFrame(t => this._image(t));
    }
    _image(now) {
      this._raf = 0;
      if (this._etatInit !== 'pret' || !this.isConnected) return;
      const dt = Math.min(0.05, Math.max(0, (now - this._t0) / 1000)); this._t0 = now;
      this._temps = (this._temps || 0) + dt;
      if (this._redim) this._redimensionner();
      let actif = false;
      if (this._tourne) { this._azC -= dt * 0.18; actif = true; }
      const k = 1 - Math.exp(-dt * 9);
      const dA = this._azC - this._az, dE = this._elC - this._el, dZ = this._zoomC - this._zoom;
      const dC = this._cible.distanceTo(this._cibleC);
      if (Math.abs(dA) + Math.abs(dE) > 1e-4 || Math.abs(dZ) > 1e-4 || dC > this._Rc * 1e-3) {
        this._az += dA * k; this._el += dE * k; this._zoom += dZ * k; this._cible.lerp(this._cibleC, k); actif = true;
      } else { this._az = this._azC; this._el = this._elC; this._zoom = this._zoomC; this._cible.copy(this._cibleC); }
      this._poserCamera();
      let anim = false;
      const dtM = dt * (this._echelle || 1);
      this._tempsM = (this._tempsM || 0) + dtM;
      if (this._M.animer) { try { anim = !!this._M.animer(dtM, this._tempsM); } catch (e) { console.warn('electro-3d : animer', e); } }
      if (this._avancerEclate(dt)) actif = true;
      if (this._allumees && this._allumees.length) {
        const i = 0.32 + 0.2 * Math.sin(this._temps * 4.2);
        this._allumees.forEach(m => { if (m.userData.voile) m.material.opacity = 0.18 + 0.2 * (i - 0.12) / 0.4; else if (m.material.emissive) m.material.emissiveIntensity = i; });
        actif = true;
      }
      if (anim || this._ombreSale) { this._rd.shadowMap.needsUpdate = true; this._ombreSale = false; }
      this._rd.shadowMap.autoUpdate = false;
      if (anim || actif || this._sale) {
        const t0 = performance.now();
        this._rd.render(this._sc, this._cam);
        this._placerReperes();
        this._mesurerCadence(performance.now() - t0);
        this._sale = false;
      }
      if (anim || actif) this._raf = requestAnimationFrame(t => this._image(t));
    }
    /* un poste lent baisse la résolution plutôt que de saccader */
    _mesurerCadence(ms) {
      const f = this._cadence || (this._cadence = []);
      f.push(ms); if (f.length < 40) return;
      const moy = f.reduce((a, b) => a + b, 0) / f.length; f.length = 0;
      if (moy > 22 && this._pr > 1) { this._pr = Math.max(1, this._pr * 0.75); this._rd.setPixelRatio(this._pr); this._redim = true; }
    }
    _redimensionner() {
      const d = this._dom, w = Math.max(60, d.scene.clientWidth), h = Math.max(60, d.scene.clientHeight);
      this._rd.setSize(w, h, false); this._W = w; this._H = h;
      this._cam.aspect = w / h; this._cam.updateProjectionMatrix();
      /* la distance qui fait tenir le cadre dans l'image, en hauteur comme en largeur
         (un cadre étroit, sur téléphone, recule la caméra : l'objet reste entier) */
      const vf = this._cam.fov * D2R, hf = 2 * Math.atan(Math.tan(vf / 2) * this._cam.aspect);
      this._distBase = this._Rc / Math.sin(Math.min(vf, hf) / 2) * this._marge;
      d.fils.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      this._redim = false; this._sale = true;
    }

    /* ---------- la fin ---------- */
    _detruire() {
      if (this._raf) cancelAnimationFrame(this._raf); this._raf = 0;
      this._lecture = false; clearTimeout(this._minuteurLecture);
      this._observer && this._observer.disconnect();
      this._ro && this._ro.disconnect();
      if (this._M && this._M.detruire) { try { this._M.detruire(); } catch (e) {} }
      if (this._sc) {
        const vus = new Set();
        this._sc.traverse(o => {
          if (o.geometry && !vus.has(o.geometry)) { vus.add(o.geometry); o.geometry.dispose(); }
          const ms = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
          ms.forEach(m => { if (vus.has(m)) return; vus.add(m); for (const k in m) { const v = m[k]; if (v && v.isTexture && !vus.has(v)) { vus.add(v); v.dispose(); } } m.dispose(); });
        });
      }
      this._cacheFantome && this._cacheFantome.forEach(m => m.dispose());
      this._K && this._K.detruire && this._K.detruire();
      this._envRT && this._envRT.dispose();
      if (this._rd) { this._rd.dispose(); try { this._rd.forceContextLoss(); } catch (e) {} this._rd.domElement.remove(); }
      this._rd = this._sc = this._M = null;
      this._etatInit = 'detruit';
    }

    /* ---------- ce que le vérificateur lit ---------- */
    info() {
      const r = this._rd && this._rd.info;
      return {
        modele: this.getAttribute('modele'), etat: this._etatInit, repli: this.dataset.repli || '',
        triangles: r ? r.render.triangles : 0, appels: r ? r.render.calls : 0, pr: this._pr,
        pieces: (this._pieces || []).map(p => p.id),
        commandes: this._M ? (this._M.commandes || []).map(c => ({ id: c.id, type: c.type, options: c.options ? c.options.map(o => o[0]) : null, min: c.min, max: c.max })) : [],
        phrase: this._dom ? this._dom.phrase.textContent : '', W: this._W, H: this._H,
        etapes: this._etapes ? this._etapes.length : 0, eclate: !!(this._eclats && this._eclats.length)
      };
    }
    /* avance le temps du modèle sans attendre l'écran (onglet caché, capture) */
    avancer(secondes, pas) {
      if (!this._M) return;
      const h = pas || 1 / 30;
      for (let t = 0; t < secondes; t += h) { this._temps = (this._temps || 0) + h; this._M.animer && this._M.animer(h, this._temps); }
      if (this._redim) this._redimensionner();
      this._az = this._azC; this._el = this._elC; this._zoom = this._zoomC; this._cible.copy(this._cibleC);
      if (this._eclats && this._eclats.length) { this._eclateT = this._eclateC; this._poserEclate(); }
      this._poserCamera();
      this._rd.shadowMap.needsUpdate = true;
      this._rd.render(this._sc, this._cam); this._placerReperes();
    }
    /* oriente la caméra (degrés) — pour les captures et la narration */
    orienter(azimutDeg, elevationDeg, zoom, cible) {
      if (azimutDeg !== undefined && azimutDeg !== null) this._azC = azimutDeg * D2R;
      if (elevationDeg !== undefined && elevationDeg !== null) this._elC = elevationDeg * D2R;
      if (zoom) this._zoomC = zoom;
      /* cible : [x, y, z] pour viser ailleurs ; null pour revenir au centre ; absente : inchangée */
      if (cible) this._cibleC.set(cible[0], cible[1], cible[2]);
      else if (cible === null) this._cibleC.copy(this._cible0);
      this._tourne = false; this._touche();
    }
  }

  if (window.customElements && !customElements.get('electro-3d')) customElements.define('electro-3d', Electro3DElement);

  /* ------------------------------------------------------------------ le bloc de station
     Electro3D.bloc({ modele, mode, options, titre, schema }) → une carte « En 3D | En schéma ».
     La scène dessinée reste à portée d'un clic, et prend la place de la 3D si celle-ci échoue.
     À l'impression, c'est elle qui sort. */
  function bloc(o) {
    const carte = el('section', 'card vue3d');
    const tete = el('div', 'vue3d-tete');
    tete.appendChild(el('h2', null, o.titre || 'L’appareil en 3D'));
    const bascule = el('div', 'vue3d-bascule');
    const b3 = el('button', null, 'En 3D'); b3.type = 'button'; b3.setAttribute('aria-pressed', 'true');
    const bs = el('button', null, 'En schéma'); bs.type = 'button'; bs.setAttribute('aria-pressed', 'false');
    bascule.append(b3, bs);
    if (o.schema) tete.appendChild(bascule);
    carte.appendChild(tete);
    const e = document.createElement('electro-3d');
    e.setAttribute('modele', o.modele);
    if (o.mode) e.setAttribute('mode', o.mode);
    if (o.options) e.setAttribute('options', JSON.stringify(o.options));
    carte.appendChild(e);
    let schema = null;
    const montrer = vers3d => {
      b3.setAttribute('aria-pressed', String(vers3d)); bs.setAttribute('aria-pressed', String(!vers3d));
      e.hidden = !vers3d;
      if (!vers3d && !schema && o.schema) { schema = el('div', 'vue3d-schema'); schema.appendChild(o.schema()); carte.appendChild(schema); }
      if (schema) schema.hidden = vers3d;
    };
    if (o.defaut === 'schema' && o.schema) montrer(false);
    b3.addEventListener('click', () => montrer(true));
    bs.addEventListener('click', () => montrer(false));
    e.addEventListener('e3d-repli', () => { if (o.schema) { montrer(false); bascule.hidden = true; } });
    if (o.choisir) e.addEventListener('e3d-pret', () => e.choisir(o.choisir));
    /* l'impression prend la scène dessinée : elle existe dès l'ouverture (cachée), sans attendre un
       « beforeprint » que tous les chemins d'impression n'envoient pas (export PDF, impression pilotée) */
    if (!schema && o.schema) { schema = el('div', 'vue3d-schema'); schema.appendChild(o.schema()); schema.hidden = true; carte.appendChild(schema); }
    if (o.legende) carte.appendChild(el('p', 'legende', o.legende));
    return carte;
  }

  /* fabriquer un modèle à l'intérieur d'un autre (la platine de 5.9 assemble contacteur,
     disjoncteur moteur, boutons et moteur) : Electro3D.fabriquer('contacteur', T, K, ctx) */
  const fabriquer = (nom, T, K, ctx) => { const d = MODELES[nom]; if (!d) throw new Error('modèle inconnu : ' + nom); return d.fabrique(T, K, ctx); };

  /* pour une station : le bloc 3D si la station en déclare un, rien sinon (la page reste
     telle qu'avant). spec = { modele, options, decouvrir: false pour s'en passer au temps 1 } */
  const pourStation = (spec, mode, schema, titre, legende) => {
    if (!spec || !spec.modele) return null;
    if (mode === 'decouvrir' && spec.decouvrir === false) return null;
    /* defaut: 'schema' — la 2D explique mieux ici (une courbe, un chronogramme) : on ouvre
       sur le schéma, la 3D montre l'objet réel à un clic */
    return bloc({ modele: spec.modele, mode, options: spec.options, schema, titre, legende, choisir: spec.piece, defaut: mode === 'comprendre' ? spec.defaut : null });
  };

  window.Electro3D = { definir, bloc, pourStation, fabriquer, assurerModele, familleDe: n => FAMILLE_DE[n], modeles: () => Object.keys(MODELES), infos: n => MODELES[n] && MODELES[n].infos, chargerThree };
})();
