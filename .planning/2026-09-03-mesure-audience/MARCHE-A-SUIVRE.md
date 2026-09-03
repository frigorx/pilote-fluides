# Passer inerweb.fr derrière Cloudflare — marche à suivre

⚠️ **Ce n'est pas un réglage de site, c'est un déménagement de zone.** En changeant
les serveurs de noms, **tout** part chez Cloudflare : le site ET les courriels.
Un enregistrement de courrier oublié = `contact@inerweb.fr` muet, sans message
d'erreur. D'où l'ordre ci-dessous, qui ne se prend pas dans le désordre.

---

## Ce que j'ai relevé le 03/09/2026 dans le DNS public

| Type | Nom | Valeur | Rôle |
|---|---|---|---|
| NS | @ | `dns10.ovh.net`, `ns10.ovh.net` | ← **ce sont eux qu'on remplace** |
| A | @ | `185.199.108.153` · `.109.153` · `.110.153` · `.111.153` | GitHub Pages |
| CNAME | www | `frigorx.github.io` | GitHub Pages |
| MX | @ | `mx1.mail.ovh.net` (1) · `mx2.mail.ovh.net` (5) · `mx3.mail.ovh.net` (100) | 🔴 **le courrier Zimbra** |
| TXT | @ | `v=spf1 include:mx.ovh.com -all` | 🔴 anti-usurpation du courrier |
| TXT | @ | `google-site-verification=dmkXDPBbvUPhLQEdzHGBvRfMfUjQRGnOYJi_0DeSh2U` | Search Console |
| TXT | @ | `1\|www.inerweb.fr` | interne OVH, à recopier tel quel |

🔴 **Cette liste n'est PAS un inventaire complet.** Le DNS public ne répond qu'aux
questions qu'on lui pose : une signature DKIM au sélecteur inconnu ou un
sous-domaine que je n'ai pas deviné n'y apparaît pas. **Seul l'export de zone OVH
fait foi.** C'est l'étape 1, et elle n'est pas facultative.

---

## Étape 1 — le filet, AVANT tout le reste

Manager OVH → **Noms de domaine** → `inerweb.fr` → onglet **Zone DNS** →
bouton **« Exporter la zone »**. Enregistrer le fichier.

C'est la photo d'avant. Tant qu'on l'a, aucune bêtise n'est définitive.

## Étape 2 — ajouter le domaine sur Cloudflare

Votre compte Cloudflare → **Add a domain** → `inerweb.fr` → plan **Free**.

Cloudflare scanne la zone tout seul et propose une liste.
**Comparer cette liste ligne à ligne avec l'export de l'étape 1.** Tout ce qui
manque, l'ajouter à la main. Les MX et le SPF en premier.

## Étape 3 — le nuage : orange ou gris

C'est le réglage qui fait tout, et le seul où une erreur se voit tout de suite.

- 🟠 **Orange (proxy)** sur les 4 `A` de `@` et sur le `CNAME www`
  → c'est ça qui compte les visites.
- ⚪ **Gris (DNS seul)** sur **tout ce qui touche le courrier** : les MX, et tout
  enregistrement visé par un MX. Un MX derrière le proxy, c'est du courrier perdu.
- Les TXT ne se proxifient pas — rien à décider.

## Étape 4 — changer les serveurs de noms chez OVH

Cloudflare affiche deux serveurs de noms à lui.

Manager OVH → `inerweb.fr` → onglet **Serveurs DNS** → **modifier** → mode
**personnalisé** → remplacer `dns10.ovh.net` et `ns10.ovh.net` par les deux de
Cloudflare.

Puis on attend. Cloudflare envoie un courriel quand la zone est active — quelques
minutes en général, jusqu'à 24 h au pire.

## Étape 5 — les réglages Cloudflare, une fois la zone active

| Où | Réglage | Valeur |
|---|---|---|
| SSL/TLS → Overview | mode de chiffrement | **Full (strict)** |
| SSL/TLS → Edge Certificates | Always Use HTTPS | **activé** |

🔴 **Jamais « Flexible ».** GitHub Pages redirige déjà tout vers HTTPS (vérifié le
03/09 : `http://inerweb.fr` répond 301). En mode Flexible, Cloudflare parle en
clair à GitHub, GitHub redirige vers HTTPS, Cloudflare redemande en clair — le
site part en boucle et n'affiche plus rien. « Full (strict) » convient car le
certificat de GitHub est valide.

## Étape 6 — la mesure

Cloudflare → **Analytics & Logs → Web Analytics**. Pour un domaine en proxy, le
comptage est déjà là : aucune ligne à ajouter dans les pages, `mentions.html`
reste vrai.

Puis, pour le bouton dans la console : **My Profile → API Tokens → Create Token**,
gabarit **« Read analytics and logs »**, portée limitée à `inerweb.fr`.
Le jeton se range hors dépôt, à côté de la clé racine :
`C:/archives-inerweb/paquets/acces-inerweb/cloudflare-lecture.txt`

---

## Vérifications — à faire, pas à supposer

1. **Le courrier d'abord.** S'envoyer un message depuis une autre adresse vers
   `contact@inerweb.fr` et vérifier qu'il arrive. Si c'est muet : remettre les
   deux serveurs de noms OVH, le temps de comprendre.
2. `https://inerweb.fr` s'ouvre, cadenas valide, pas de boucle.
3. `https://www.inerweb.fr` s'ouvre aussi.
4. Search Console ne signale rien de nouveau après 48 h.

## Faire marche arrière

Remettre `dns10.ovh.net` et `ns10.ovh.net` dans l'onglet Serveurs DNS d'OVH. La
zone d'origine est toujours chez OVH — c'est pour ça qu'on ne l'y efface pas.
Compter quelques heures de propagation.
