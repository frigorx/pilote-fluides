# Journal de la bascule — 03/09/2026

## Ce qui est fait

**20h45 — la zone OVH est relevée et figée.** 13 enregistrements, « 13 sur 13 »
confirmé par le manager. Voir `ZONE-OVH-AVANT-BASCULE.md`. Deux découvertes que le
DNS public ne montrait pas : un `CNAME ftp`, et l'absence de la 4e adresse A de
GitHub Pages.

**21h10 — la zone est créée sur Cloudflare**, sur le compte qui porte déjà la
Search Console de ce domaine (et non le second compte inerWeb — les deux existent,
autant tout garder au même endroit). Plan **Free**. Import automatique : **11 sur 11**,
rien ne manque. Cloudflare a converti de lui-même le vieux type `SPF` d'OVH en
`TXT` — c'est la forme correcte depuis la RFC 7208.

**Les nuages sont bons du premier coup** : orange sur les 4 A et sur `www`, gris sur
les 3 MX. Le courrier ne traverse pas le proxy.

**La 4e adresse A ajoutée** : `185.199.111.153`, proxifiée. Les quatre adresses de
GitHub Pages sont maintenant là.

**SSL** : déjà sur `full` — pas `flexible`, donc pas de boucle de redirection.
**« Always Use HTTPS » activé.**

## Ce qui a été corrigé en cours de route

**Rester sur « Full », pas « Full (strict) ».** La marche à suivre conseillait
strict. C'est une erreur pour GitHub Pages : en strict, Cloudflare exige un
certificat d'origine valide à chaque instant, et GitHub en renouvelle le sien
périodiquement. Une fenêtre de renouvellement mal tombée coupe le site. « Full »
chiffre le trajet Cloudflare→GitHub de la même façon et ne casse pas.

## Le refus d'OVH — le piège que la marche à suivre ne connaissait pas

**21h25.** Le changement de serveurs de noms a été **refusé** par OVH :

> The set of NS records ([]) present in the zone of domain "inerweb.fr" on server
> miki.ns.cloudflare.com does not contain NS record for miki.ns.cloudflare.com

Traduction : avant d'accepter la délégation, OVH interroge lui-même le futur serveur
de noms pour vérifier qu'il sert bien la zone. Cloudflare répondait alors
**« Query refused »** — la zone venait d'être créée, elle n'était pas encore
provisionnée sur les serveurs.

**Ce n'est pas une erreur de configuration, c'est un problème d'ordre.** Il faut
attendre que Cloudflare réponde pour `inerweb.fr` avant de retourner chez OVH.
Vérification en une commande :

```
nslookup -type=NS inerweb.fr miki.ns.cloudflare.com
```

Tant que ça répond « Query refused », OVH refusera. Dès que ça renvoie les deux
`nameserver`, la bascule passe.

## Ce qui reste

1. ⏳ Rejouer le changement de serveurs de noms chez OVH dès que Cloudflare répond.
2. Bloquer les robots d'entraînement IA (page indisponible tant que la zone est
   `initializing` — à faire une fois active). Décidé le 03/09 : bloquer
   l'entraînement et les agents, **laisser passer les moteurs de recherche**, sans
   quoi le site sortirait de Google.
3. Vérifier le courrier par un vrai message vers `contact@inerweb.fr`.
4. Vérifier `https://inerweb.fr` et `https://www.inerweb.fr`.
5. Le bouton « Trafic » dans la console des accès.

## À noter, hors périmètre du jour

Cloudflare signale l'absence d'enregistrement **DMARC** sur le domaine : sans lui,
n'importe qui peut envoyer du courrier en se faisant passer pour `@inerweb.fr`.
C'est une vraie faiblesse, indépendante de ce chantier. À traiter séparément.

---

## 21h50 — la cause du refus, et la bascule acceptée

**Le refus d'OVH n'était pas une question de délai.** Après 25 minutes d'attente,
Cloudflare refusait toujours de répondre pour `inerweb.fr`. La vraie cause :
**le parcours de création n'avait jamais été mené à son terme.**

En cliquant le bouton « free » sur la page des plans, Cloudflare avait ouvert une
fenêtre de vente (Pro à 20 $/mois, Business à 200 $) avec « Cancel » et « Confirm ».
Cette fenêtre a été fermée par « Cancel » — refuser d'acheter un plan payant. Mais
ce faisant, l'onboarding s'est interrompu : la zone est restée au statut
`initializing`, et **une zone qui n'est pas activée n'est pas servie par les
serveurs de noms de Cloudflare**. D'où le « Query refused », d'où le refus d'OVH.

**Ce qu'il fallait faire** : reprendre le parcours à `select-plan`, cliquer
« Select plan » sur **la carte Free** (et non le bouton d'une fenêtre de vente),
puis « Continue to activation » au bas de la revue des enregistrements. La zone est
alors passée en `pending` et les serveurs ont commencé à répondre :

```
inerweb.fr  nameserver = miki.ns.cloudflare.com
inerweb.fr  nameserver = trace.ns.cloudflare.com
inerweb.fr  A -> 185.199.108/109/110/111.153
```

**⚠️ À retenir pour la prochaine fois** : chez Cloudflare, tant que le tableau de
bord renvoie de force sur `select-plan`, la zone n'est pas finie. Le statut fait foi
— `initializing` = pas encore servie, `pending` = servie mais délégation non
constatée, `active` = tout est en place.

**21h52 — OVH a accepté.** « Votre demande de mise à jour a bien été prise en
considération. » Les deux serveurs Cloudflare sont **« En cours d'activation »** dans
l'onglet Serveurs DNS.

**Pendant la propagation, rien ne tombe** : les deux jeux de serveurs de noms
portent exactement les mêmes données — mêmes MX, même SPF, mêmes adresses. Selon le
serveur interrogé, un visiteur passe par Cloudflare ou va directement chez GitHub.
Dans les deux cas il voit le site, et dans les deux cas le courrier arrive.

---

## 21h57 — délégation active en 4 min 30, mais le certificat manque

**La propagation a été rapide** — 270 secondes, pas les heures annoncées :

```
inerweb.fr  nameserver = trace.ns.cloudflare.com
inerweb.fr  nameserver = miki.ns.cloudflare.com
inerweb.fr  A -> 104.21.18.21 / 172.67.179.162   (les adresses de Cloudflare)
```

**Le courrier est intact**, vérifié dans la foulée : `mx1`, `mx2`, `mx3.mail.ovh.net`
répondent avec les mêmes priorités qu'avant.

**🔴 Mais le site ne répond plus en HTTPS.** Diagnostic :

| Test | Résultat |
|---|---|
| `http://inerweb.fr` | 301 vers HTTPS — « Always Use HTTPS » fonctionne |
| `https://inerweb.fr` | **échec du handshake TLS** |
| GitHub interrogé directement (`--resolve` sur 185.199.108.153) | **200** — le site est intact |
| Certificat Cloudflare | `universal` · **`pending_validation`** |

**La cause est nette** : la zone est `active`, mais Cloudflare n'a pas encore émis
son certificat Universal SSL. Le proxy reçoit donc les visiteurs sans avoir de
certificat à leur présenter. Ce n'est pas une erreur de configuration — c'est le
délai normal d'émission après activation, en général quelques minutes.

**Ce que ça veut dire concrètement** : entre l'activation de la délégation et
l'émission du certificat, il existe une fenêtre où le site est injoignable en HTTPS.
Ce trou n'était pas prévu dans la marche à suivre. Il aurait pu être évité en
laissant les nuages **gris** à la bascule, puis en passant à l'orange une fois le
certificat émis.

**Plan de repli retenu** : si le certificat n'est pas émis dans les 20 minutes,
repasser les A et `www` en **DNS only** (nuage gris). Le trafic va alors directement
à GitHub, dont le certificat est valide, et le site remarche immédiatement. Le
comptage des visites est perdu tant qu'on reste en gris — un site qui marche passe
avant une statistique. On remet l'orange dès que le certificat est là.

---

## 22h00 — certificat émis en 60 secondes, tout est vérifié

Le trou HTTPS aura duré **moins de deux minutes**. Vérifications complètes :

| Vérification | Résultat |
|---|---|
| `https://inerweb.fr` | **200**, `Server: cloudflare`, `CF-RAY: …-CDG` (Paris) |
| `https://www.inerweb.fr` | redirige et aboutit en **200** |
| Titre réellement servi | « inerWeb Édu — apprendre le froid, station par station » |
| `documents.html` · `formateur.html` · `seances.html` · `activer.html` | **200** |
| `docs/coffre-2026/` | **200** — le coffre enseignant est servi |
| MX | `mx1` · `mx2` · `mx3.mail.ovh.net`, priorités inchangées |

## Le blocage des robots d'IA — fait le 03/09

Page **AI Crawl Control** (`/inerweb.fr/ai/security`), 32 robots répertoriés en
cinq catégories. Décision appliquée :

**Bloqués (23)** — catégories `AI Crawler` (16/16) et `AI Assistant` (6/6), plus
quelques archiveurs déjà bloqués par défaut : GPTBot, ClaudeBot, CCBot, Bytespider,
Meta-ExternalAgent, Google-CloudVertexBot, TikTok Spider, ChatGPT-User, Claude-User,
Perplexity-User, MistralAI-User, DuckAssistBot, Manus Bot…

**Laissés libres (9)** : **Googlebot**, **BingBot**, Baidu, Applebot,
`archive.org_bot`, et les moteurs de recherche IA — Claude-SearchBot, OAI-SearchBot,
PerplexityBot, Terracotta Bot.

**▶ La distinction qui commande ce choix.** Un `AI Crawler` aspire pour entraîner un
modèle : le bloquer ne coûte rien. Un `AI Search` référence le site pour qu'il
ressorte dans une réponse : le bloquer coûterait de la visibilité, comme fermer la
porte à Google. Un `AI Assistant` va lire la page quand un utilisateur pose la
question — bloqué à la demande de F. Henninot, en sachant que **le site ne
ressortira plus dans les réponses de ChatGPT ou Perplexity**. C'est réversible d'un
clic sur la même page.

## Le comptage fonctionne

`Analytics → HTTP Traffic` : **270 requêtes** sur 24 h, 20 servies depuis le cache.
Répartition par pays disponible.

⚠️ **Ces premiers chiffres ne veulent rien dire** : trente minutes après le
branchement, un soir, ce sont des robots scanneurs (Canada 100, Allemagne 87,
États-Unis 39, France 14 — la France, c'est nous). Attendre quelques jours avant
d'en tirer quoi que ce soit.

## Ce qui reste

1. 🔴 **F. Henninot** : s'envoyer un message vers `contact@inerweb.fr` depuis une
   autre adresse. Les serveurs répondent, mais seul un vrai message prouve que la
   boîte reçoit.
2. Le bouton « Trafic » dans la console des accès.
3. Hors périmètre, à traiter un jour : le **DMARC** absent.
