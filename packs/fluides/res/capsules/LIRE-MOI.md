# Capsules narrées — le contrat

Une capsule = **le chapitre expliqué à voix haute, écran par écran, avec ses animations**.
Elle ne remplace pas la fiche : elle la rend écoutable au lieu d'être lue d'un bloc.

## Comment ça marche

Un **moteur unique** (`index.html` + `capsule.js` + `capsule.css` + `animations.js`) et
**un fichier de données par chapitre** dans `donnees/<id>.js`. Le moteur ne connaît aucun
contenu ; le contenu ne connaît aucune mécanique.

Adresse : `index.html?c=<id>` — par exemple `index.html?c=g0`.
Compléments : `&e=3` ouvre directement l'écran 3, `&mode=projection` agrandit pour la salle.

Ce que le moteur apporte à toutes les capsules d'un coup : la voix de la machine
(`speechSynthesis`, quatre vitesses mémorisées), le rail de progression, le contrôle de
compréhension à correction expliquée, le mode projection (touche `P`), le livret imprimable,
le bouton « Aa » de lisibilité et le filigrane de marque.

**Aucun fichier son n'est produit** : la voix est celle de la machine qui affiche. C'est ce qui
permet de corriger un texte sans rien réenregistrer.

## Écrire une capsule

Copier la forme de `donnees/g0.js`. Les champs :

```js
CAPSULE.declarer({
  id: "g0",                    // == nom du fichier
  fiche: "g0",                 // carte du pack où revenir
  titre: "…",
  surtitre: "HABILITATION FLUIDES · G1 · CODE 1.00",
  duree: "environ 7 minutes",
  intro: "…",                  // deux phrases, sur l'accueil
  codes: [{ code: "1.00", libelle: "…" }],
  visuelAccueil: { motif: "etages", … },
  ecrans: [{
    id: "…", titre: "…", note: "…",        // `note` s'affiche sous le rail
    visuel: { motif: "flux", … }           // une animation…
           | { svg: "points-de-fuite.svg", alt: "…" }   // …ou un schéma de res/svg/
           | { img: "../bibliotheque/x.webp", alt: "…" },
    legende: "…",                          // sous le visuel, facultatif
    texte: "<p>…</p>",                     // ce qui s'affiche
    dire: "…",                             // ce qui se DIT (texte oral, sans balise)
    retenir: ["…"],                        // facultatif
    piege: "<p>…</p>",                     // facultatif
    reference: "Code 1.00 · …",
    controle: { enonce, choix: [], bonne: 0, explication: "…" },  // facultatif
  }],
  motFin: "…",
});
```

`dire` est le seul champ écrit **pour l'oreille** : phrases courtes, pas d'abréviation, les
sigles épelés (« la filière D E E E »), les numéros dits comme on les prononce (« le règlement
européen de 2024, numéro 573 »). Si `dire` manque, le moteur lit le texte affiché — c'est un
repli, pas la cible.

## Les douze motifs d'animation

Tous en `viewBox` 800 × 460, une seule échelle pour toutes les capsules.

| motif | ce qu'il montre | champs |
|---|---|---|
| `etages` | des niveaux empilés, du général au terrain | `etages: [{niveau, texte, marque}]` |
| `duo` | deux notions qu'on confond, côte à côte | `cartes: [{titre, picto, pour, texte}]`, `lien`, `pied` |
| `sequence` | des étapes numérotées, dans l'ordre | `etapes: [{titre, texte, danger?}]`, `pied` |
| `jauge` | une échelle avec des seuils nommés | `seuils: [{part, titre, texte}]`, `niveau`, `bas`, `hautLibelle`, `teinte` |
| `frise` | une ligne du temps | `jalons: [{date, texte, fort?}]`, `pied` |
| `alerte` | ce qui arrive · ce qu'on ressent · ce qu'on fait | `vignettes: [{picto, etiquette, titre, texte}]`, `pied` |
| `flux` | le chemin d'une matière, boîtes et flèches | `boites: [{picto, titre, texte, teinte?}]`, `pied` |
| `zone` | une coupe de local, la nappe qui s'accumule au point bas | `hauteurNappe`, `nappeLibelle`, `capteur`, `personnage`, `points: [{titre, texte}]` |
| `balance` | une pesée avant / après et l'écart | `avant`, `apres`, `ecart` (chacun `{etiquette, valeur}`), `pied` |
| `checklist` | des points qui se cochent (ou se refusent) | `items: [{titre, texte, refus?}]`, `pied` |
| `barres` | comparer des grandeurs | `valeurs: [{titre, valeur, affiche, teinte?}]`, `legende` |
| `cycle` | la croix du frigoriste, un organe mis en avant | `surligne: ["compresseur"]`, `points: [{titre, texte}]` |

`teinte` vaut `"danger"` (rouge) ou `"ok"` (vert). La couleur ne porte jamais l'information
seule : un pictogramme ou un mot la double toujours.

## Les règles qui ne se négocient pas

1. **Zéro chiffre nouveau.** Une capsule reformule la fiche pour l'oral, elle n'ajoute
   aucune valeur. Les seules valeurs autorisées dans tout le pack sont listées en tête de
   `cartes.js` ; tout le reste renvoie au texte en vigueur ou à la documentation.
2. **Aucun texte ne chevauche un tracé.** Chaque libellé a sa zone. Le contrôle se mesure
   (voir plus bas), il ne s'apprécie pas à l'œil.
3. **Jamais de fond sombre**, y compris en projection.
4. **L'animation porte du contenu** : `prefers-reduced-motion` la calme, ne l'efface jamais.
   Un écran figé doit rester compréhensible.
5. **Français simple.** Public en formation continue, parfois FLE ou DYS : phrases courtes,
   pas de terme savant là où un mot courant suffit.
6. **Croix du frigoriste** : détendeur à gauche, compresseur à droite, condenseur en haut,
   évaporateur en bas. Le motif `cycle` la respecte, ne pas la redessiner autrement.

## Vérifier une capsule avant de la déclarer finie

Servir le dépôt en HTTP, puis ouvrir `index.html?c=<id>` et lancer le contrôle de
débordement (console du navigateur) :

```js
[...document.querySelectorAll('#rail-points button')].forEach(b => { b.click();
  const svg = document.querySelector('#visuel svg'); if (!svg) return;
  svg.querySelectorAll('text').forEach(t => { const bb = t.getBBox();
    if (bb.x < 2 || bb.x + bb.width > 798 || bb.y + bb.height > 458)
      console.warn('déborde :', t.textContent); }); });
```

Rien dans la console = aucun texte hors cadre.
