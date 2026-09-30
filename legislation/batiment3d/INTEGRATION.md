# Le bâtiment réglementaire en 3D — bloc à poser dans `legislation/index.html`

Rien n'a été touché dans `index.html`. Deux insertions, dans cet ordre.

## 1. Le bloc, entre le bandeau « Ce qui est ouvert » et la section du plan

À poser juste **avant** la ligne `<section class="bloc plan" id="carte" …>` :

```html
  <!-- LE BÂTIMENT RÉGLEMENTAIRE (3D) — porte d'entrée du réseau : onze zones, onze sous-lignes.
       C'est un PLUS : le plan ci-dessous reste la vraie navigation (repli automatique sans WebGL).
       Composant : batiment3d/batiment.js. Zones lues dans batiment3d/zones.json (généré depuis
       le tableau RESEAU de cette page : node batiment3d/generer-zones.mjs). -->
  <section class="bloc" id="batiment" aria-label="Le bâtiment réglementaire, en 3D" style="margin-top:26px">
    <div class="titre-bloc">
      <h2>🏢 Le bâtiment réglementaire</h2>
      <span>onze zones, onze sous-lignes du réseau : tournez, survolez, touchez</span>
    </div>
    <div id="batiment3d" style="padding:14px 20px 22px"></div>
  </section>
```

## 2. Le script, juste avant `</body>` (après les scripts `../moteur/…`)

```html
<script type="module">
  import { monterBatiment } from "./batiment3d/batiment.js";
  monterBatiment(document.getElementById("batiment3d"), { urlPlan: "#carte" });
</script>
```

C'est un module : il se charge en différé, sans gêner le plan SVG (script classique de la page).
Three.js (r160, jsDelivr, version épinglée, ~670 Ko) n'est téléchargé **que lorsque le bloc approche
de l'écran**. Hors écran ou onglet masqué : plus aucune image dessinée.

## Ce qui se passe seul

- **Repli** : sans WebGL, ou si Three.js ne se charge pas, la maquette disparaît ; restent la liste
  des onze zones (boutons), le panneau de détail et un lien vers le plan.
- **Zones** : `batiment3d/zones.json` (57 stations dont 29 ouvertes, à la date du 30/09). Après
  toute modification du tableau `RESEAU` : `node batiment3d/generer-zones.mjs` (lit `../index.html`,
  échoue bruyamment si l'une des onze sous-lignes manque).
- **Liens des stations** : résolus depuis le dossier `legislation/` quel que soit l'endroit où le
  composant est monté.
- **Sceaux dorés** : une sous-ligne dont toutes les stations sont tamponnées porte un sceau doré dans
  la maquette, dans la liste et dans le panneau. Lecture de `localStorage['inerweb-legislation-tampons']`
  au format tableau de slugs **et** au format objet `{ slug: … }` que pose
  `moteur-legislation/missions.js`. Relecture automatique si un autre onglet écrit
  (événement `storage`) ; `api.majTampons()` pour forcer.
- `prefers-reduced-motion` : pas de rotation, pas d'ondes ni de nuages animés, et le rendu se fait
  à la demande (0 image dessinée quand rien ne bouge).

## Options de `monterBatiment(hôte, options)`

| Option | Rôle | Défaut |
|---|---|---|
| `urlPlan` | cible de « Voir sur le plan » | `"#carte"` |
| `auPlan(id)` | fonction appelée à la place du lien (ex. défiler et faire clignoter la sous-ligne) | aucune |
| `donnees` | objet déjà lu de `zones.json` | `fetch` de `zones.json` |
| `racine` | dossier `legislation/` (pour les liens des stations) | dossier parent du module |
| `three` | adresse du module Three.js | jsDelivr r160.1 |
| `rotationAuto` | `false` = ne jamais tourner seul | `true` |

Retour : `{ element, selectionner(id), fermer(), majTampons(), detruire() }`.
Événement sur l'hôte : `b3d:selection` (`detail.id`, `null` à la fermeture).

## Facultatif — que « Voir sur le plan » mène à la bonne sous-ligne

Le plan SVG n'a pas d'ancre par sous-ligne. Pour en avoir une, dans `tete(f, x, y)` du script du plan,
envelopper le retour dans `'<g id="ligne-' + f.id + '">' … '</g>'`, puis :

```js
monterBatiment(hote, { urlPlan: "#carte", auPlan: function (id) {
  var g = document.getElementById("ligne-" + id);
  (g || document.getElementById("carte")).scrollIntoView({ behavior: "smooth", block: "center" });
} });
```

## Fichiers

`batiment.js` (interface, caméra, pointage, panneau, liste, repli) · `maquette.js` (géométrie
procédurale : 40 000 triangles, ~70 appels de dessin) · `zones.json` + `generer-zones.mjs` ·
`index.html` (page de démonstration autonome).
