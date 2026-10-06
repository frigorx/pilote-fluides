# Reprise — Détendeur thermostatique pédagogique

## Copie active

~\Desktop\inerweb full ia\detendeur-pedagogique

Le projet voisin voyant-liquide-pedagogique a fourni l’architecture générale et n’a pas été
modifié. Ne pas répercuter automatiquement les changements dans une autre copie.

## État retenu

Le prototype 04 est intégré aux écrans 2, 3, 4, 6, 7, 11, 12 et 13. Il définit la géométrie
commune du détendeur :

- corps et raccords lisibles ;
- entrée liquide HP par le bas et sortie BP latérale sur le modèle de principe ;
- membrane, tige et clapet alignés ;
- bulbe serré sur un tube droit de sortie d’évaporateur ;
- capillaire continu du bulbe à la tête ;
- prise de pression interne visible dans la coupe ;
- égalisation externe expliquée séparément à l’écran 9 par un vrai tube dédié pris après le bulbe.

L’écran 6 est la vue de référence pour l’explication mécanique. Il juxtapose la coupe simplifiée,
le bilan `F bulbe ↔ F évaporation + F ressort` et la chaîne
`bulbe → membrane → tige → clapet → passage`. Ses trois boutons ne doivent pas être multipliés :
équilibre, bulbe plus chaud, ressort plus comprimé.

Les prototypes rejetés et le rendu CAO restent dans archives/. La CAO ne doit pas entrer dans
une livraison tant que ses droits de reproduction, conversion et diffusion ne sont pas établis.

## Contrat fonctionnel

- 14 étapes et 6 questions ;
- réussite pédagogique à partir de 5/6 ;
- vitesses vocales 0.80 · 0.95 · 1.10 · 1.25, défaut 0.95 ;
- clé locale inerweb-detendeur-rate ;
- aucune voix au chargement ;
- navigation ArrowLeft / ArrowRight hors contrôles ;
- 100dvh sans défilement ;
- aucune dépendance distante pour le parcours ; la vue 3D (facultative) charge Three.js depuis un CDN et se replie sur le 2D sinon ;
- schémas techniques manuels et symboles internes validés.

## Points métier à préserver

- détendeur à gauche, compresseur à droite, condenseur en haut, évaporateur en bas ;
- sur la branche verticale, symbole du détendeur tourné d’un quart de tour ;
- corps à l’entrée de l’évaporateur et bulbe sur l’aspiration en sortie ;
- surchauffe = température du tube − température de saturation liée à la pression ;
- pression du bulbe vers l’ouverture ; pression d’évaporation et ressort vers la fermeture ;
- débit massique entrant égal au débit massique sortant au régime permanent ;
- prise interne T 2 distincte de la prise externe TE 2 ;
- l’égalisation externe compense l’effet d’une perte de charge, sans la supprimer ;
- sélection de la buse par fluide, puissance et conditions de calcul ;
- la vis de surchauffe n’est jamais une correction universelle ;
- valeurs et couples uniquement dans le périmètre documenté du modèle ;
- aucune ouverture d’un circuit chargé ou sous pression.

## Vérifications

Lancer tests/qa.mjs avec Playwright. Le test attendu couvre les 14 étapes en cinq formats,
les interactions, le quiz, le clavier, les sources, l’absence de requêtes distantes et les modes
dégradés sans stockage ni synthèse vocale.

## La vue 3D (gare 1 de la ligne LES DÉTENDEURS, 06/10/2026)

Écrans **2 reconnaître** (fermé, éclaté, coupe), **3 pièces** (survol et clic sur douze pièces), **4 débit**
(faible, moyenne, forte ouverture), **6 forces** (trois états de la membrane) et **7 boucle** (six étapes + chaud/froid)
s'ouvrent en 3D. Les autres écrans gardent leur dessin SVG, inchangé.

- `3d/detendeur-3d.js` : le modèle, `Electro3D.definir('detendeurThermo', …)`. Un seul modèle, cinq programmes
  (`options.ecran` : `reconnaitre`, `pieces`, `debit`, `forces`, `boucle`). Moteur : celui d'ÉlectroRézo
  (`electrorezo/stations/_commun/3d/`), **lu, jamais modifié** ; il charge Three.js 0.160 depuis cdnjs puis jsDelivr.
  Le modèle est une petite boucle physique qualitative (charge → front de liquide → température de sortie → pression du
  bulbe → équilibre de la membrane → ouverture → débit) : le récit pas à pas coupe volontairement certains liens pour que
  chaque étape ne montre qu'un évènement (voir `ETAPES` et `PHASES`).
- `3d/vue3d.js` : la colle avec `app.js` (`DETENDEUR_3D.possible / monter / annuler`) ; pose le filigrane inerWeb (R9, trois
  exemplaires pâles, un au centre) par-dessus la scène et recopie dans la barre du module les boutons des écrans 4 et 7.
- `3d/vue3d.css` : range les blocs du moteur pour tenir dans la carte (écran entier, sans défilement) ; porte aussi le corps
  de texte du cours à 14 pt (18,7 px) à 1366 × 768 (clamp, jamais sous l'ancienne taille ; téléphone inchangé).
- `3d/banc.html?ecran=reconnaitre|pieces|debit|forces|boucle` : banc d'essai du modèle seul.
- `app.js` : `render3D(…)` essaie la 3D et, sinon, appelle l'ancien rendu 2D (`renderRole`, `renderComponents`,
  `renderExpansion`, `renderForces`, `renderRegulationLoop`, tous conservés). Phrases d'écran changées seulement quand la 3D
  est active (`lessons[].v3d` : indication et légende qui décrivaient un dessin).

**Repli 2D** : ouvert en `file://` (le navigateur refuse alors le module Three.js), sans WebGL, ou si le moteur / Three.js
ne se chargent pas (hors ligne) → le dessin d'avant s'affiche, sans erreur. Le module reste donc complet hors ligne ; la 3D
est un plus qui demande un serveur web et le réseau (CDN). Au papier : le dessin 2D de l'écran sort à la place du canevas.

**Contrôle** : `node packs/fluides/res/detendeur-interactif/tests/qa.mjs` (serveur local `http://localhost:8794`, Playwright
de `C:\git\hydrometro`, `CAPTURES=<dossier>` pour les PNG). Quatre passes : http + WebGL (5 formats, 3D jouée en détail),
`file://` (parcours 2D complet), CDN coupés (repli), modes dégradés. Seuls CDN tolérés : cdnjs.cloudflare.com, cdn.jsdelivr.net.

**Choix métier de la 3D à faire valider** (voir le rapport de chantier) : ressort **sous** le clapet et vis de réglage en bas du
corps (comme sur un vrai détendeur ; le dessin 2D place le ressort à côté de la tige) ; orifice au-dessus du clapet, la
tige pousse le clapet vers le bas pour ouvrir ; prise de pression interne = petit passage dans le corps jusque sous la
membrane ; évaporateur figuré par un serpentin à trois passes, bulbe serré sur la dernière (tube de sortie).

**Liens vers les autres gares** (à poser quand elles existent, rien n'est lié aujourd'hui) : écran 9 « Séparer prise interne
et prise externe » → gare 2 « Égalisation externe » ; écran 10 « buse » → gare 3 « MOP » (ou gare 0 « La famille ») ;
écran 1 ou 2 → gare 0 « La famille des détendeurs » (tête de ligne) ; écran 11 « Régler » → gare 6 « Électronique » en
contraste (le régulateur calcule la surchauffe) ; écran 13 → gare 5 « Capillaire » pour les petites machines.

**Barre « retour au réseau »** : `moteur/retour-accueil.js` (posée par le build, dans le flux) poussait la coque `100dvh` de 34 px ;
à 768 px de haut, Retour / Continuer sortaient de l'écran. Corrigé dans le module, sans toucher à `moteur/` : à l'écran,
`body` est une colonne flex et `.app-shell` prend la hauteur qui reste (`styles.css`, bloc `@media screen`) ; le papier garde
sa règle. `.app-shell` est dans la vérification « hors écran » du contrôle.
