/* Objet provisoire de l'essai : bouteille d'azote, mano-détendeur (cadran sans chiffres),
   flexible, petit meuble de vitrine réfrigérée. Géométrie procédurale, aucun modèle téléchargé.
   Unité : la largeur de l'image repère vaut 1. */
import * as THREE from "three";

const BLEU = 0x1b3a63, PAPIER = 0xfffdf8, ORANGE = 0xe8914a;

export function fabriquerObjet(reduit) {
  const mat = {
    peinture: new THREE.MeshStandardMaterial({ color: BLEU, metalness: 0.15, roughness: 0.38 }),
    metal: new THREE.MeshStandardMaterial({ color: 0xc9ced6, metalness: 0.85, roughness: 0.3 }),
    laiton: new THREE.MeshStandardMaterial({ color: 0xc8a24a, metalness: 0.8, roughness: 0.35 }),
    papier: new THREE.MeshStandardMaterial({ color: PAPIER, metalness: 0, roughness: 0.7 }),
    orange: new THREE.MeshStandardMaterial({ color: ORANGE, metalness: 0.1, roughness: 0.45 }),
    flexible: new THREE.MeshStandardMaterial({ color: 0x23272e, metalness: 0.05, roughness: 0.6 }),
    caisson: new THREE.MeshStandardMaterial({ color: 0xe9eef5, metalness: 0.2, roughness: 0.45 }),
    verre: new THREE.MeshStandardMaterial({ color: 0x9fd0e8, metalness: 0.1, roughness: 0.05, transparent: true, opacity: 0.28, depthWrite: false }),
    fond: new THREE.MeshStandardMaterial({ color: 0xdfe8f2, metalness: 0, roughness: 0.8 })
  };
  const add = (parent, geo, m, x, y, z) => { const o = new THREE.Mesh(geo, m); o.position.set(x || 0, y || 0, z || 0); parent.add(o); return o; };

  /* Tout est construit debout selon Y, puis couché d'un quart de tour : l'axe Y devient la verticale
     au-dessus de l'image, et le devant (Z) regarde vers le bas de la feuille, donc vers vous. */
  const objet = new THREE.Group();
  objet.rotation.x = Math.PI / 2;

  /* bouteille */
  const bx = -0.29;
  const bouteille = new THREE.Group(); bouteille.position.x = bx; objet.add(bouteille);
  const profil = [[0, 0], [0.066, 0], [0.07, 0.006], [0.07, 0.3]];
  for (let i = 1; i <= 8; i++) { const a = (i / 8) * Math.PI / 2; profil.push([0.07 * Math.cos(a) * (1 - 0.74 * Math.sin(a)) + 0.018 * Math.sin(a), 0.3 + 0.085 * Math.sin(a)]); }
  profil.push([0.018, 0.4]);
  add(bouteille, new THREE.LatheGeometry(profil.map(p => new THREE.Vector2(p[0], p[1])), 40), mat.peinture);
  add(bouteille, new THREE.CylinderGeometry(0.0715, 0.0715, 0.05, 40, 1, true), mat.papier, 0, 0.2, 0);
  add(bouteille, new THREE.CylinderGeometry(0.0725, 0.0725, 0.012, 40, 1, true), mat.orange, 0, 0.26, 0);
  add(bouteille, new THREE.TorusGeometry(0.05, 0.006, 8, 32), mat.metal, 0, 0.004, 0).rotation.x = Math.PI / 2;
  /* robinet : corps, sortie, volant orange sur le côté */
  add(bouteille, new THREE.CylinderGeometry(0.03, 0.026, 0.05, 24), mat.laiton, 0, 0.425, 0);
  add(bouteille, new THREE.CylinderGeometry(0.004, 0.004, 0.05, 8), mat.metal, -0.05, 0.43, 0).rotation.z = Math.PI / 2;
  add(bouteille, new THREE.TorusGeometry(0.024, 0.005, 8, 24), mat.orange, -0.078, 0.43, 0).rotation.y = Math.PI / 2;
  add(bouteille, new THREE.CylinderGeometry(0.018, 0.018, 0.03, 16), mat.laiton, 0, 0.462, 0);
  /* mano-détendeur */
  const dt = new THREE.Group(); dt.position.set(0, 0.445, 0); bouteille.add(dt);
  add(dt, new THREE.CylinderGeometry(0.036, 0.036, 0.07, 28), mat.metal, 0, 0.065, 0);
  add(dt, new THREE.CylinderGeometry(0.02, 0.02, 0.045, 20), mat.laiton, 0, 0.14, 0);
  add(dt, new THREE.SphereGeometry(0.026, 20, 12), mat.orange, 0, 0.18, 0);
  add(dt, new THREE.CylinderGeometry(0.012, 0.012, 0.06, 14), mat.metal, 0.05, 0.065, 0).rotation.z = Math.PI / 2;
  /* cadran à aiguille, sans chiffres, face tournée vers vous (+Z) */
  const cad = new THREE.Group(); cad.position.set(0, 0.09, 0.042); dt.add(cad);
  add(cad, new THREE.CylinderGeometry(0.044, 0.044, 0.014, 40), mat.metal).rotation.x = Math.PI / 2;
  add(cad, new THREE.TorusGeometry(0.044, 0.005, 10, 40), mat.laiton, 0, 0, 0.007);
  add(cad, new THREE.CircleGeometry(0.039, 40), mat.papier, 0, 0, 0.0075);
  /* zone orange : de 10 à 60 degrés à droite de la verticale */
  add(cad, new THREE.RingGeometry(0.022, 0.028, 24, 1, 30 * Math.PI / 180, 50 * Math.PI / 180), mat.orange, 0, 0, 0.0079);
  for (let i = 0; i <= 8; i++) {
    const g = new THREE.Group(); g.rotation.z = (135 - i * 33.75) * Math.PI / 180; g.position.z = 0.0085; cad.add(g);
    add(g, new THREE.BoxGeometry(0.0025, i % 4 === 0 ? 0.008 : 0.005, 0.0008), mat.peinture, 0, 0.031, 0);
  }
  const aiguille = new THREE.Group(); aiguille.position.z = 0.0105; cad.add(aiguille);
  add(aiguille, new THREE.BoxGeometry(0.003, 0.034, 0.001), mat.peinture, 0, 0.012, 0);
  add(aiguille, new THREE.CylinderGeometry(0.004, 0.004, 0.003, 12), mat.peinture, 0, 0, 0).rotation.x = Math.PI / 2;
  add(cad, new THREE.CircleGeometry(0.039, 40), mat.verre, 0, 0, 0.0125);

  /* meuble de vitrine réfrigérée, schématique */
  const mx = 0.25, mw = 0.3, mh = 0.22, mp = 0.17;
  const meuble = new THREE.Group(); meuble.position.set(mx, 0, 0); objet.add(meuble);
  add(meuble, new THREE.BoxGeometry(mw, 0.03, mp), mat.peinture, 0, 0.015, 0);
  add(meuble, new THREE.BoxGeometry(mw, 0.012, mp), mat.caisson, 0, mh + 0.03, 0);
  add(meuble, new THREE.BoxGeometry(0.012, mh, mp), mat.caisson, -mw / 2 + 0.006, 0.03 + mh / 2, 0);
  add(meuble, new THREE.BoxGeometry(0.012, mh, mp), mat.caisson, mw / 2 - 0.006, 0.03 + mh / 2, 0);
  add(meuble, new THREE.BoxGeometry(mw, mh, 0.01), mat.fond, 0, 0.03 + mh / 2, -mp / 2 + 0.005);
  [0.28, 0.5, 0.72].forEach(f => add(meuble, new THREE.BoxGeometry(mw - 0.03, 0.004, mp * 0.8), mat.metal, 0, 0.03 + mh * f - 0.017, -0.005));
  /* quelques produits, de simples volumes */
  [[-0.09, 0.28, 0x4b84c4], [-0.03, 0.28, ORANGE], [0.03, 0.28, 0xf2eee3], [0.09, 0.28, 0x4b84c4], [-0.06, 0.5, 0xf2eee3], [0.0, 0.5, 0x4b84c4], [0.06, 0.5, ORANGE], [-0.09, 0.72, ORANGE], [0.0, 0.72, 0xf2eee3], [0.09, 0.72, 0x4b84c4]]
    .forEach(p => add(meuble, new THREE.BoxGeometry(0.04, 0.03, 0.05), new THREE.MeshStandardMaterial({ color: p[2], roughness: 0.6 }), p[0], 0.03 + mh * p[1] - 0.002, -0.005));
  add(meuble, new THREE.BoxGeometry(mw - 0.024, mh, 0.004), mat.verre, 0, 0.03 + mh / 2, mp / 2 - 0.002);
  add(meuble, new THREE.BoxGeometry(mw, 0.022, 0.006), mat.orange, 0, 0.03 + mh + 0.017, mp / 2 - 0.003);
  /* raccord d'entrée, du côté de la bouteille */
  add(meuble, new THREE.CylinderGeometry(0.01, 0.01, 0.03, 14), mat.laiton, -mw / 2 - 0.012, 0.09, 0.04).rotation.z = Math.PI / 2;

  /* flexible : de la sortie du détendeur au raccord du meuble */
  const dep = new THREE.Vector3(bx + 0.08, 0.51, 0), fin = new THREE.Vector3(mx - mw / 2 - 0.024, 0.09, 0.04);
  const courbe = new THREE.CatmullRomCurve3([
    dep, new THREE.Vector3(bx + 0.14, 0.5, 0.03), new THREE.Vector3(bx + 0.19, 0.36, 0.08),
    new THREE.Vector3(-0.04, 0.17, 0.085), new THREE.Vector3(0.0, 0.1, 0.06), fin]);
  add(objet, new THREE.TubeGeometry(courbe, 60, 0.0075, 12, false), mat.flexible);
  [dep, fin].forEach(p => add(objet, new THREE.CylinderGeometry(0.011, 0.011, 0.014, 14), mat.orange, p.x, p.y, p.z).rotation.z = Math.PI / 2);

  /* ombres de contact : taches douces posées sur l'image */
  const c = document.createElement("canvas"); c.width = c.height = 64;
  const x = c.getContext("2d"), gr = x.createRadialGradient(32, 32, 4, 32, 32, 32);
  gr.addColorStop(0, "rgba(0,0,0,.45)"); gr.addColorStop(1, "rgba(0,0,0,0)"); x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  const tache = (px, w, d) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false })); m.rotation.x = -Math.PI / 2; m.position.set(px, -0.001, 0); objet.add(m); };
  tache(bx, 0.24, 0.24); tache(mx, 0.46, 0.34);

  /* signe de vie : l'aiguille monte lentement, se stabilise, redescend, en boucle. Aucune valeur affichée. */
  const bas = 135 * Math.PI / 180, haut = -45 * Math.PI / 180;
  const lisse = t => t * t * (3 - 2 * t);
  aiguille.rotation.z = reduit ? haut : bas;
  objet.userData.animer = secondes => {
    if (reduit) return;
    const t = secondes % 13;
    const k = t < 6 ? lisse(t / 6) : t < 11.5 ? 1 : 1 - lisse((t - 11.5) / 1.5);
    aiguille.rotation.z = bas + (haut - bas) * k;
  };
  return objet;
}
