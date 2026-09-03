# Mesurer l'audience d'inerweb.fr — et la voir depuis la console

**Ouvert le 03/09/2026.** Demande de F. Henninot : « un petit bouton sur le côté
de la console pour voir les clics, les visites, et si ça a fonctionné ».

## Ce qui a été tranché le 03/09

**Cloudflare en proxy DNS**, pas le snippet, pas Google Analytics, pas l'API
Search Console.

Pourquoi ce choix et pas un autre :

| Voie | Ce qu'elle donne | Pourquoi écartée / retenue |
|---|---|---|
| Google Search Console | clics et requêtes **venus de Google** seulement | déjà en place, mais aveugle au lien direct et au QR code |
| Snippet Cloudflare | visites | ✗ script tiers — `mentions.html` promet le contraire |
| Google Analytics | visites + ville | ✗ cookies, bandeau RGPD, transfert hors UE |
| **Cloudflare proxy DNS** | **toutes les visites, comptées côté serveur** | ✓ zéro script dans les pages, mentions intactes, et débloque au passage les en-têtes de sécurité |

**Ce qu'on ne saura pas, et il faut le dire :** la **région** des visiteurs.
Cloudflare gratuit s'arrête au **pays**. Descendre à la ville demanderait Google
Analytics, donc des cookies et un bandeau. Écarté.

## Les trois volets

### Volet 1 — réparer la console  ✅ FAIT le 03/09
Le paquet des accès avait déménagé vers `C:/archives-inerweb/paquets/acces-inerweb`
mais **sept fichiers** pointaient encore vers `C:/git/paquets/acces-inerweb`.
La console affichait zéro titulaire et zéro clé **sans un mot d'erreur**, et une
délivrance aurait recréé un dossier neuf, redonné le numéro 001 et tiré une racine
nouvelle par-dessus l'ancienne.
→ `build/lieu-acces.mjs` dit désormais l'endroit, et il est le seul à le dire.
→ Prouvé : 150 contrôles au vert, et `/etat` retrouve la clé racine, le millésime
   `habilitation-2026` et le titulaire n° 1.

### Volet 2 — inerweb.fr derrière Cloudflare  ⏳ geste de Franck
C'est un changement de **serveurs de noms** : toute la zone déménage d'OVH vers
Cloudflare, **les courriels compris**. Marche à suivre : `MARCHE-A-SUIVRE.md`.
🔴 Le risque à ne pas prendre à la légère : un enregistrement de courrier oublié
et `contact@inerweb.fr` tombe. L'export de zone OVH est le filet, il se prend AVANT.

### Volet 3 — le bouton « Trafic » dans la console  ⏳ après le volet 2
Une carte de plus dans `outils/console-acces/console.html`, alimentée par un point
d'entrée du serveur local qui interroge l'API GraphQL de Cloudflare.
- un **jeton d'API en lecture seule**, rangé hors dépôt à côté de la clé racine ;
- affiché : visites et pages vues (7 / 28 jours), pages les plus ouvertes, pays,
  ordinateur / mobile ;
- même règle que le reste de la console : rien ne sort, rien n'est publié.

## Critères de réussite
1. `contact@inerweb.fr` reçoit toujours un message après la bascule — vérifié en
   s'écrivant.
2. `https://inerweb.fr` répond 200 et sert le site, certificat valide, sans boucle
   de redirection.
3. La console affiche un chiffre de visites non nul et il correspond à ce que
   montre le tableau de bord Cloudflare.
