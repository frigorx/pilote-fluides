/* =====================================================================
   sw.js — service worker du site : la consultation hors-ligne
   ---------------------------------------------------------------------
   POURQUOI : en atelier ou en chaufferie, il n'y a souvent pas de réseau.
   Tout ce que le visiteur a déjà ouvert doit rester consultable, et
   l'accueil + l'appli de formation doivent marcher d'emblée.

   STRATÉGIES, et pourquoi elles :
   · navigations (pages HTML) : RÉSEAU D'ABORD — le site évolue tous les
     jours, personne ne doit rester bloqué sur une vieille page (le
     travers du 28/07, voir build/lib-version.mjs). Sans réseau : la
     copie en cache, sinon hors-ligne.html. Clé de cache SANS paramètres
     (`?carte=…` sert le même HTML : une seule copie suffit).
   · médias (images, sons, polices) : CACHE D'ABORD, sans revalidation —
     ils ne portent jamais de correctif urgent, et re-télécharger les MP3
     à chaque écoute viderait le forfait mobile des stagiaires.
   · scripts, styles, données : cache d'abord, REMIS À JOUR en arrière-
     plan — un correctif de cours arrive à la visite suivante, et les
     fichiers du moteur portent déjà leur ?v=<hash> (URL neuve = fichier
     retéléchargé immédiatement).
   · vidéos (.mp4) : JAMAIS interceptées — un service worker casse
     l'avance/retour rapide des lecteurs ; le navigateur gère seul.

   VERSION est réécrite par build/version.mjs (jamais à la main) : chaque
   build qui change le moteur ou le contenu active un cache neuf et
   efface l'ancien chez tous les visiteurs.

   Pièges tenus : réponses partielles (206, lecteurs audio) et réponses
   redirigées jamais mises en cache ; autres origines jamais touchées.
   ===================================================================== */
const VERSION = "00b57f996b";
const CACHE = "inerweb-" + VERSION;

/* Le socle : ce qui doit marcher hors-ligne même si le visiteur n'a
   encore rien ouvert d'autre. Tout le reste entre au cache à l'usage. */
const SOCLE = [
  "/",
  "/index.html",
  "/formation.html",
  "/hors-ligne.html",
  "/favicon.svg",
  "/manifest.webmanifest",
];

const MEDIAS = /\.(png|webp|jpe?g|gif|svg|ico|mp3|m4a|wav|woff2?|ttf)$/i;

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SOCLE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((noms) => Promise.all(noms.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

/* Ne mettre en cache que les réponses saines : complètes (200, pas 206),
   directes (pas de redirection rejouée) et de la même origine. */
function cachable(r) {
  return r && r.status === 200 && !r.redirected && r.type === "basic";
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (/\.mp4$/i.test(url.pathname)) return;

  /* Les pages : réseau d'abord, cache en secours, hors-ligne.html en dernier. */
  if (req.mode === "navigate") {
    const cle = url.origin + url.pathname;
    e.respondWith(
      fetch(req).then((r) => {
        if (cachable(r)) {
          const copie = r.clone();
          caches.open(CACHE).then((c) => c.put(cle, copie));
        }
        return r;
      }).catch(() =>
        caches.match(cle).then((r) => r || caches.match("/hors-ligne.html"))
      )
    );
    return;
  }

  /* Le reste : cache d'abord. Les médias s'arrêtent là ; scripts, styles
     et données se remettent à jour en arrière-plan pour la fois suivante. */
  e.respondWith(
    caches.match(req).then((enCache) => {
      if (enCache && MEDIAS.test(url.pathname)) return enCache;
      const depuisReseau = fetch(req).then((r) => {
        if (cachable(r)) {
          const copie = r.clone();
          caches.open(CACHE).then((c) => c.put(req, copie));
        }
        return r;
      }).catch(() => enCache);
      return enCache || depuisReseau;
    })
  );
});
