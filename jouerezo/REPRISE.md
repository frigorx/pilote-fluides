# JouéRézo — reprise

> Point d'entrée pour reprendre le chantier. L'état vit ici, pas en mémoire. `LISEZ-MOI.md` décrit le produit.

## État au 03/10/2026 (matin)

- **EN LIGNE, caché** : `https://inerweb.fr/jouerezo/` — dix jeux (le dépanneur ajouté le 03/10 à 6 h). Site `pilote-fluides` : nuit `5d4fe44d` + `f4a2526e` (six jeux, image d'accueil), matin : livraison v2 (schéma, Qui suis-je, pendu, vrai et symbole, outils). Poussés depuis un worktree détaché de `origin/main`.
- Atelier : `C:\git\jouerezo`, distant privé `github.com/frigorx/jouerezo` (branche `master`).
- Décisions de Franck (03/10 matin, à la voix) : glisser-déposer sur les schémas électriques et le circuit fluide ; les vrais éléments et les symboles de la bibliothèque ; des définitions ; un pendu ; les outils ; **froid classique seulement, pas de clim**.

## À faire relire par Franck (décisions prises seul)

1. Marque inerWeb (le réseau vit sur inerweb.fr).
2. Les 11 câblages retenus pour « Compléter le schéma » (`donnees/schemas.js`) : 1, 1-commande, 2, 7, 7-commande, 8, 8-commande, 10, 10-commande, 12, 12-commande. Les n° 3 à 6 (inversion, étoile-triangle, Dahlander) et 9, 11, 13 sont là s'il les veut : une ligne chacun.
3. Les paires réel ↔ symbole (`donnees/reel-symbole.js`) : 18 électriques, 13 froid. Le condenseur à air et l'évaporateur à air ont le même symbole : seul le condenseur est joué.
4. Les 34 définitions froid et outils (`donnees/definitions.js`) : chaque phrase vient d'une planche ou d'une station ; à relire comme un énoncé.
5. Symboles retirés du Memory électrique parce qu'indiscernables à 70 px : disjoncteur unipolaire, sectionneur, interrupteur-sectionneur (EN 60617), résistance (même rectangle que la bobine). Vanne à boisseau retirée du Memory froid.
6. Texte de l'aventure (12 scènes), 32 questions fluides, image d'accueil Codex (zombie « tout sourire »).
7. **Le dépanneur** (`donnees/depanneur.js`) : les 12 situations (températures de saturation, aspiration, liquide, refoulement, intensité, observations) sont des valeurs d'exercice écrites par Fable, cohérentes avec les plages de RézoTools et la fiche T6 ; les signatures de pannes et les actions aussi. À relire comme un sujet. Les pressions affichées en viennent par les tables CoolProp (rosée côté BP, bulle côté HP).
8. Les six vues d'outils (planche Codex découpée) à la place des photos d'atelier.
9. **La scène vivante du dépanneur** (`moteur/depanneur-scene.js`) : tableau composé par Fable avec les vues d'organes du Tome 3 (évaporateur, condenseur, détendeur, filtre), un compresseur dessiné, les tuyaux, le voyant, les prises BP/HP, le manifold (logique d'aiguille du module « pose du manifold »), le thermomètre électronique et la pince. Ce n'est pas un schéma technique mais une scène de jeu ; à valider par Franck (demande du 03/10 : « animation des éléments frigo, lecture de mano plus réaliste et vivant »).

## Duel « scène du dépanneur » (03/10/2026) — TRANCHÉ : LES DEUX, EN ALTERNANCE, LIVRÉ

Franck a jugé la scène v1 « bof » : il veut « un vrai circuit frigorifique en fonctionnement, plus réaliste, peut-être un peu de 3D », dans l'esprit de Frigodiag (KOTZA, son ancien professeur) mais « du 21e siècle » ; la méthode surchauffe / sous-refroidissement reste le cœur du jeu. Pas de téléchargement des démos KOTZA (refusé par Franck : « je ne veux pas refaire ça »).

- Cahier unique : `duel/CAHIER.md`. Deux pistes, même API que `moteur/depanneur-scene.js` (le jeu ne change pas) : `duel/A-coupe-vivante/` (2D à plat, on voit dedans) et `duel/B-isometrique-atelier/` (2,5D façon atelier). Page côte à côte : `duel/index.html` → `http://localhost:8797/jouerezo/duel/index.html` (serveur `node outils/servir.mjs`).
- Vérifié : `node --check`, console vide, huit gestes, six cas, textes ≥ 12 px, pas de texte sur un tube.
- Recommandation : B, en lui empruntant à A le point « aspiration » au bulbe et le filtre + voyant au groupe.
- Franck (03/10, 7 h) : « j'aime beaucoup les deux… les 2 en fonction des exercices, histoire de varier ». Fait : `moteur/depanneur-scene-coupe.js` (A, `window.JR_SCENE_COUPE`, `svg.scene.coupe`) et `moteur/depanneur-scene-atelier.js` (B, `window.JR_SCENE_ATELIER`, `svg.scene.atelier`), feuilles `depanneur-scene-coupe.css` / `-atelier.css` (keyframes préfixées `scc-` / `sca-`, aucune règle commune), `depanneur.js` alterne une situation sur deux (`i % 2`). L'ancienne scène et sa section CSS sont retirées ; `fabriquer-pages.mjs` pose les deux feuilles et les deux scripts sur la seule page du dépanneur ; `livrer.mjs` exclut `duel/` et tamponne les feuilles. Joué 3 situations PC + téléphone (375 px, page non élargie), console vide. Livré sur le site (clé `20261003-0731`, commit site `8be6266b` depuis un worktree détaché d'`origin/main` : le `main` local du site avait 3 commits non poussés d'un autre chat, à rebaser par lui).
- Remarque de Franck sur le condenseur (« les arrondis des fins de serpentin dans le mauvais sens ») : c'était la scène atelier, drapeau de balayage des arcs inversé dans `rangs()` (les coudes de retour rentraient dans la batterie) ; corrigé, serpentin rentré de 10 px pour que les coudes se voient en entier. La coupe vivante était juste.
- Suite : « le reste du développement » du dépanneur, que Franck doit décrire.

## Restes

- Entrée depuis l'accueil et le quartier 3D : attendre la décision de Franck (« pas tout de suite »).
- Rattacher le code de partie (`JR-…`) à HAL Claw (`commun.js` → `JR.code`).
- Indexer le réseau au RAG une fois validé.
- Les mini-jeux « par ligne » de CartoClim v2 : à héberger ici si Franck le veut (hors périmètre « pas de clim » pour l'instant).
- Le site `pilote-fluides/REPRISE.md` n'a pas été touché (fichier partagé).

## Vérifier sans navigateur

```bash
cd /c/git/jouerezo && for f in moteur/*.js donnees/*.js outils/*.mjs; do node --check "$f" || echo "ERREUR $f"; done
node -e "
const fs=require('fs');const w={};for(const d of ['schemas','reel-symbole','definitions','banque-electrorezo','aventure','themes'])new Function('window',fs.readFileSync('donnees/'+d+'.js','utf8'))(w);
const T=w.JR_THEMES;for(const j of Object.keys(T))console.log(j,':',T[j].map(t=>t.id+'('+(t.paires?t.paires.length:t.mots?t.mots.length:t.series?t.series.length:t.questions?t.questions.length:t.kind||'')+')').join(' '));
for(const t of T.memory){const b=t.paires.map(p=>p.b.txt||p.b.src);const d=b.filter((x,i)=>b.indexOf(x)!==i);if(d.length)console.log('DOUBLON',t.id,d)}
for(const t of T.memory)for(const p of t.paires)for(const f of [p.a,p.b]){if(f.img&&!fs.existsSync('C:/git/pilote-fluides/symboles/svg/'+f.img+'.svg'))console.log('SYMBOLE ABSENT',f.img);if(f.src&&f.src.startsWith('illustrations/')&&!fs.existsSync(f.src))console.log('ABSENT',f.src);if(f.src&&f.src.startsWith('../')&&!fs.existsSync('C:/git/pilote-fluides/'+f.src.slice(3)))console.log('ABSENT SITE',f.src)}
for(const s of w.JR_AVENTURE.zombies.scenes){const n=s.choix.filter(c=>c.bon).length;if(s.choix.length&&n!==1)console.log('SCENE',s.titre,'bons=',n)}
console.log('contrôle fini')"
```

Puis `node outils/servir.mjs` et jouer chaque jeu jusqu'au panneau de fin au format téléphone (375 px).

## Pièges rencontrés

- Un commentaire de bloc qui contient `a-*/` se ferme tout seul (`*/`) : écrire `a-…/`.
- `git worktree add` dans le scratchpad échoue (« Filename too long ») : chemin court `C:\git\_wt-jouerezo`.
- Le filigrane `marque.js` ne se remesure que sur `resize` : `commun.js` lui envoie l'événement à chaque changement d'écran.
- Les banques HoCourant, R408 et les exercices du Câblage virtuel déclarent des `const` : jamais deux `<script>`, toujours `fetch` + `Function`.
- **Le service worker du site** (racine `pilote-fluides`, scripts « cache d'abord ») s'installe aussi sur `localhost:8797` et sert ensuite de VIEUX fichiers de l'atelier : `servir.mjs` répond 404 à `/sw.js` depuis le 03/10 ; si un navigateur l'a déjà, le désinscrire (`navigator.serviceWorker.getRegistrations()`).
- Les câblages n'ont pas de texte de repère dans leur SVG : les repères (Q1, KM1…) sont posés par le moteur depuis `carte.appareils` (position du repère) ; l'appariement appareil ↔ groupe se fait par le groupe du bon type le plus proche.
- Deux constructions GitHub Pages qui se suivent : la première est annulée (« errored » dans l'API), pas échouée.
