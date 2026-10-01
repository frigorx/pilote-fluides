# À poser sur le plan (index.html) — par l'orchestrateur

`index.html` n'a pas été touché par le lot M. Trois insertions, toutes autonomes.

1. **Lien « Mon carnet »** dans le `<nav class="nav" aria-label="Correspondance">` de l'en-tête
   (avant le lien « Le réseau thermo-techno ») :

```html
<a href="carnet.html">📒 Mon carnet <span id="carnet-tampons"></span></a>
```

2. **Compteur de tampons** : juste avant `<script src="../moteur/lisibilite.js"></script>` :

```html
<script>
(function () {
  try {
    var n = Object.keys(JSON.parse(localStorage.getItem("inerweb-legislation-tampons") || "{}")).length;
    var c = document.getElementById("carnet-tampons");
    if (c && n) c.textContent = "· " + n + " tampon" + (n > 1 ? "s" : "");
  } catch (e) {}
})();
</script>
```

3. **Bandeau d'entrée** (facultatif), dans `<div class="ouvert">`, après `o-note` :

```html
<p class="o-note">📒 <a href="carnet.html"><strong>Mon carnet</strong></a> : chaque station est une mission de Clim'Études Sud ; 3 bonnes réponses sur 4 = un tampon. Tout reste sur votre appareil.</p>
```

À la fin du chantier, lancer une fois `node legislation/outils/poser-les-missions.mjs` (toutes les stations) :
il pose la feuille et le script des missions sur chaque station qui a un `mission.json`, et
recalcule `moteur-legislation/carnet-data.json` (lu par carnet.html et utile au lot P).
Le lien « Carnet papier (PDF) » de carnet.html vise `carnet/carnet-eleve.pdf` et n'apparaît que si ce fichier existe.
