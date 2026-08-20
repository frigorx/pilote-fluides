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
   · audio et polices : CACHE D'ABORD, sans revalidation — un MP3 ne
     porte jamais de correctif urgent, et le re-télécharger à chaque
     écoute viderait le forfait mobile des stagiaires.
   · tout le reste (scripts, styles, IMAGES, données) : cache d'abord,
     REMIS À JOUR en arrière-plan — un schéma scientifique corrigé
     arrive à la visite suivante (durcissement du 20/08 : les images
     étaient figées, un SVG corrigé restait périmé indéfiniment), et
     les fichiers du moteur portent déjà leur ?v=<hash>.
   · vidéos (.mp4) : JAMAIS interceptées — un service worker casse
     l'avance/retour rapide des lecteurs ; le navigateur gère seul.
   · réponses de plus de 8 Mo : jamais mises en cache — le stockage de
     l'appareil n'est pas un disque sans fond.

   VERSION est réécrite par build/version.mjs (jamais à la main) : chaque
   build qui change le moteur ou le contenu active un cache neuf et
   efface l'ancien chez tous les visiteurs.

   Pièges tenus : réponses partielles (206, lecteurs audio) et réponses
   redirigées jamais mises en cache ; autres origines jamais touchées.
   ===================================================================== */
const VERSION = "d22656b7fc";
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

/* Seuls l'audio et les polices restent figés au cache : les images, elles,
   se revalident en arrière-plan (un schéma corrigé doit arriver). */
const FIGES = /\.(mp3|m4a|wav|woff2?|ttf)$/i;

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SOCLE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      /* On ne purge QUE nos propres caches (préfixe "inerweb-") : jamais
         ceux qu'une autre application de l'origine pourrait poser. */
      .then((noms) => Promise.all(
        noms.filter((n) => n.indexOf("inerweb-") === 0 && n !== CACHE).map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

/* Ne mettre en cache que les réponses saines : complètes (200, pas 206),
   directes (pas de redirection rejouée), de la même origine, et d'un
   poids raisonnable (≤ 8 Mo) — le quota de l'appareil n'est pas infini. */
function cachable(r) {
  if (!r || r.status !== 200 || r.redirected || r.type !== "basic") return false;
  const octets = Number(r.headers.get("content-length") || 0);
  return octets <= 8 * 1024 * 1024;
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

  /* Le reste : cache d'abord. L'audio et les polices s'arrêtent là ;
     scripts, styles, images et données se remettent à jour en
     arrière-plan pour la fois suivante. */
  e.respondWith(
    caches.match(req).then((enCache) => {
      if (enCache && FIGES.test(url.pathname)) return enCache;
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
