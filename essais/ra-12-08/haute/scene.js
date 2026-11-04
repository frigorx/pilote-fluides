/* Scène de l'essai haute qualité : chargement de objet.glb, lumière d'ambiance, ombre douce sur l'image,
   animation de l'aiguille. Unité : la largeur de l'image repère vaut 1. */
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export async function monterScene({ renderer, scene }, ancre, reduit) {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;

  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;

  const soleil = new THREE.DirectionalLight(0xffffff, 1.4);
  soleil.position.set(-0.55, -0.45, 1.2);
  soleil.castShadow = true;
  soleil.shadow.mapSize.set(512, 512);
  const c = soleil.shadow.camera;
  soleil.shadow.radius = 5; soleil.shadow.blurSamples = 12; soleil.shadow.bias = -0.0004;
  ancre.group.add(soleil, soleil.target, new THREE.HemisphereLight(0xffffff, 0xc9d3df, 0.5));

  const sol = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.4), new THREE.ShadowMaterial({ opacity: 0.32 }));
  sol.position.z = 0.0005; sol.receiveShadow = true;
  ancre.group.add(sol);

  let gltf;
  try { gltf = await new GLTFLoader().loadAsync("./objet.glb"); }
  catch (e) { const err = new Error("objet"); err.name = "ChargementObjet"; throw err; }

  /* Le modèle est debout selon Y : on le couche d'un quart de tour, comme dans la version moyenne. */
  const objet = new THREE.Group(); objet.rotation.x = Math.PI / 2; objet.add(gltf.scene);
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  gltf.scene.traverse(o => {
    if (!o.isMesh) return;
    const transparent = o.material.transparent;
    o.castShadow = !transparent; o.receiveShadow = false;
    if (o.material.map) o.material.map.anisotropy = maxAniso;
    if (transparent) { o.material.depthWrite = false; o.renderOrder = 2; }
  });
  ancre.group.add(objet);
  /* MindAR exprime le monde en pixels de l'image repère : la caméra d'ombre doit suivre cette échelle. */
  let reglee = false;
  ancre.onTargetFoundOmbre = () => {
    const e = new THREE.Vector3().setFromMatrixScale(ancre.group.matrix).x;
    if (reglee || !(e > 0)) return;
    reglee = true;
    c.left = -0.65 * e; c.right = 0.65 * e; c.top = 0.5 * e; c.bottom = -0.5 * e; c.near = 0.2 * e; c.far = 3 * e;
    c.updateProjectionMatrix();
  };

  /* Signe de vie : l'aiguille monte lentement, se stabilise, redescend, en boucle. Aucune valeur affichée. */
  const aiguille = gltf.scene.getObjectByName("aiguille");
  const bas = 135 * Math.PI / 180, haut = -45 * Math.PI / 180;
  const lisse = t => t * t * (3 - 2 * t);
  aiguille.rotation.z = reduit ? haut : bas;
  return secondes => {
    if (reduit) return;
    const t = secondes % 13;
    const k = t < 6 ? lisse(t / 6) : t < 11.5 ? 1 : 1 - lisse((t - 11.5) / 1.5);
    aiguille.rotation.z = bas + (haut - bas) * k;
  };
}
