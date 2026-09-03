# La zone DNS d'inerweb.fr chez OVH — photo d'avant

Relevée dans le manager OVH le **03/09/2026 à 20h45**. Le manager affichait **« 13 sur 13 résultats »** :
cette liste est complète, ce n'est pas une page tronquée.

C'est la photo à laquelle revenir si la bascule Cloudflare tourne mal.

| # | Type | Sous-domaine | Cible | TTL |
|---|---|---|---|---|
| 1 | CNAME | `ftp` | `inerweb.fr.` | par défaut |
| 2 | NS | `@` | `dns10.ovh.net.` | par défaut |
| 3 | NS | `@` | `ns10.ovh.net.` | par défaut |
| 4 | A | `@` | `185.199.108.153` | par défaut |
| 5 | A | `@` | `185.199.109.153` | par défaut |
| 6 | A | `@` | `185.199.110.153` | par défaut |
| 7 | SPF | `@` | `v=spf1 include:mx.ovh.com -all` | par défaut |
| 8 | TXT | `@` | `"1\|www.inerweb.fr"` | par défaut |
| 9 | MX | `@` | `1 mx1.mail.ovh.net.` | par défaut |
| 10 | MX | `@` | `5 mx2.mail.ovh.net.` | par défaut |
| 11 | MX | `@` | `100 mx3.mail.ovh.net.` | par défaut |
| 12 | TXT | `@` | `"google-site-verification=dmkXDPBbvUPhLQEdzHGBvRfMfUjQRGnOYJi_0DeSh2U"` | par défaut |
| 13 | CNAME | `www` | `frigorx.github.io.` | par défaut |

## Ce que cette photo apprend

**Il manque une adresse A.** GitHub Pages en publie quatre ; la zone n'en porte que
trois — `185.199.111.153` est absente. Ça marche quand même (trois suffisent à
résoudre), mais c'est une redondance en moins pour rien. À ajouter en recopiant
chez Cloudflare.

**Aucun DKIM, aucun DMARC.** Côté courrier il n'y a donc que les trois MX et le SPF
à faire suivre. Rien d'autre ne se cache.

**Le `SPF` d'OVH est un type d'enregistrement à part**, hérité et obsolète
(RFC 7208 : le SPF se publie en TXT). Cloudflare ne propose pas ce type — la ligne
7 se recrée en **TXT** avec exactement la même valeur. Le résultat est identique
pour les serveurs de courrier, et c'est même la forme correcte.

**`ftp` pointe vers le domaine lui-même** : reliquat du parking OVH, sans usage
connu. Recopié tel quel — on ne fait pas le ménage le jour d'un déménagement.

## Ce qui ne se recopie pas

Les deux `NS` (lignes 2 et 3). Ce sont eux qu'on remplace : Cloudflare fournira
les siens, et c'est ce changement-là qui fait la bascule.

## Revenir en arrière

Manager OVH → `inerweb.fr` → onglet **Serveurs DNS** → remettre `dns10.ovh.net` et
`ns10.ovh.net`. La zone ci-dessus reste chez OVH tant qu'on ne l'y efface pas —
c'est pourquoi on n'y touche pas.
