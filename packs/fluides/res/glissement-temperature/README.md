# Pourquoi la température glisse ?

Module inerWeb Fluides autonome conçu comme une **découverte pour débutant**, et non comme une révision de vocabulaire.

## Le fil pédagogique

1. **Étage 1 — Je vois** : chaleur sensible → chaleur latente dans le cas pur → évaporateur à un constituant → mélange à deux puis trois composants → zone latente inclinée → mots zéotrope et azéotrope.
2. **Étage 2 — Je m'en sers** : bulle et rosée → condensation en sens inverse → distinction isobare/isotherme → diagramme log p-h → références de surchauffe et de sous-refroidissement → récit final.

Le parcours contient **13 scènes illustrées** et seulement **2 pauses d'activité**. La vérification arrive après l'explication.

## Mode raconté

- aucun son au chargement ;
- un clic sur **Lancer l'explication racontée** autorise la narration pour la séance en cours ;
- chaque scène explicative avance automatiquement lorsque la voix a réellement terminé ;
- les illustrations changent d'état avec les parties successives de la narration ;
- le récit s'arrête aux scènes 12 et 13 pour laisser l'élève agir ;
- après réussite, il reprend automatiquement ;
- Pause, Reprendre, Arrêter, vitesse, sortie et transcription complète restent disponibles ;
- sans synthèse vocale, le contenu écrit et la navigation manuelle restent complets.

## Statut

**Brouillon pédagogique local du 18 août 2026.**

- V1 de révision conservée dans `..\fluides-glissement-pedagogique-v1-revision` ;
- non intégré dans `C:\git\pilote-fluides` ;
- non copié dans `~\Desktop\inerweb full ia\pilote-fluides` ;
- non publié ;
- non indexé dans le RAG ;
- en attente du bon à tirer humain de F. Henninot.

Le module évite ainsi de choisir silencieusement entre les deux copies divergentes de Pilote Fluides.

## Ouvrir

Double-cliquer sur `index.html`. Le module fonctionne directement en `file://`, sans serveur, CDN ni réseau.

## Décisions métier

- La chaleur sensible et la chaleur latente servent de point d'entrée connu, sans confondre « chaleur latente » avec « température forcément constante ».
- Le palier horizontal est présenté comme le cas d'un fluide pur à pression constante ; la zone latente d'un zéotrope reste inclinée entre bulle et rosée.
- Pour un mélange, A ne s'évapore pas entièrement avant B : les deux composants restent présents, mais leurs proportions évoluent entre liquide et vapeur.
- Le même raisonnement est étendu à trois composants ou davantage.
- Le glissement est présenté comme la conséquence visible du comportement zéotropique : `T rosée − T bulle` à la même pression.
- Un azéotrope est rattaché à sa condition azéotropique ; il ne doit pas être confondu avec un fluide pur, même si leur palier observé est semblable.
- Le diagramme log p-h arrive après le phénomène. Une scène dédiée suit une seule isotherme complète dans les zones liquide, liquide-vapeur et vapeur.
- Sans glissement, la portion diphasique de l'isotherme se superpose à l'isobare. Avec glissement, cette portion est légèrement inclinée et coupe l'isobare horizontale. Les extrémités de la même isotherme restent visibles dans les zones monophasées.
- Le segment bulle-rosée représente la zone complète de changement d'état ; une note précise qu'après la détente un évaporateur réel peut commencer à l'intérieur de la cloche.
- La surchauffe se réfère à la rosée ; le sous-refroidissement se réfère à la bulle.
- Aucun chiffre de table de fluide n'est inventé.

## Fichiers

- `index.html` : structure de l'expérience ;
- `styles.css` : charte, projection, téléphone et impression ;
- `app.js` : contenu, SVG manuels, narration synchronisée et activités ;
- `assets/chaine-glissement.svg` : SVG V1 conservé comme ressource du brouillon ;
- `SOURCES.md` et `SOURCES-IMAGES.md` : provenance ;
- `REPRISE.md` : état de passation ;
- `tests/test-module.mjs` : contrôles structurels hors navigateur.

## Vérifier

```powershell
node --check app.js
node tests/test-module.mjs
```

Le test structurel vérifie aussi la géométrie des isothermes : dans la zone liquide,
une isotherme doit rester quasi verticale. Une dérive horizontale supérieure à 25
unités fait échouer le contrôle. C'est ce qui distingue une isotherme d'une courbe
décorative, et ça ne se laisse pas à la relecture.

La QA visuelle couvre `1024 × 768`, `1366 × 768`, `390 × 844` et `360 × 640`.
