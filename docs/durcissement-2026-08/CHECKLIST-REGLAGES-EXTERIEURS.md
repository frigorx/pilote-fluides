# Checklist des réglages extérieurs au code — à faire par Franck

## 🔻 LES TROIS LIGNES À POSER CHEZ OVH — tout est prêt, il ne manque que la saisie

> Fait par Claude le 20/08/2026 : la protection de `main` est POSÉE (par l'API GitHub),
> le domaine est DÉCLARÉ chez GitHub et la propriété Search Console est CRÉÉE — les deux
> attendent leur TXT. Bloqué à OVH : la connexion demande le mot de passe de Franck, et
> Claude ne saisit jamais un mot de passe. **Il ne reste que ces trois lignes.**

| # | Type | Sous-domaine / nom | Valeur |
|---|------|--------------------|--------|
| 1 | TXT | `_github-pages-challenge-frigorx` | `2fbbece095371ff9572bf67c7214a0` |
| 2 | TXT | *(laisser vide = la racine)* | `google-site-verification=dmkXDPBbvUPhLQEdzHGBvRfMfUjQRGnOYJi_0DeSh2U` |
| 3 | A | *(laisser vide = la racine)* | `185.199.111.153` |

⚠️ **LES DEUX PIÈGES**
1. **Ne JAMAIS toucher à la ligne `v=spf1 include:mx.ovh.com -all`.** Les nouveaux TXT
   s'AJOUTENT à côté. L'écraser couperait l'envoi de courrier du domaine. Plusieurs TXT
   à la racine, c'est normal et valide.
2. **La valeur Google se termine par `i_0DeSh2U`** — l'écran de Google TRONQUE l'affichage
   et n'en montre que le début. Celle du tableau ci-dessus est la valeur complète, relevée
   dans le champ lui-même. Copier une valeur tronquée = validation qui échoue sans dire
   pourquoi.

**Ensuite, dans l'ordre :**
- [ ] Poser les trois lignes chez OVH (zone DNS de inerweb.fr).
- [ ] Attendre la propagation (quelques minutes à 24 h).
- [ ] GitHub → Settings → Pages → bouton **Verify** sur inerweb.fr.
- [ ] Search Console → « Déjà en cours ? Terminer la validation » → **Valider**.
- [ ] Search Console → Sitemaps → soumettre `sitemap.xml`.
- [ ] Search Console → Inspection d'URL → demander l'indexation de `https://inerweb.fr/`,
      `metier.html`, `formateurs.html`.
- Claude peut faire les cinq dernières étapes si Franck ouvre sa session OVH et le lui dit.

## 🔴 AVANT LE 31 AOÛT 2026 — l'A2F GitHub

Le bandeau est affiché sur le compte : *« You will need to enable two-factor
authentication on your account before August 31, 2026, or be restricted from account
actions. »* Onze jours. Passé ce délai, le compte est restreint — donc la publication du
site aussi. C'est la seule chose ici que personne ne peut faire à la place de Franck :
elle demande son téléphone. Settings → Password and authentication → et **imprimer les
codes de récupération**.


Ces réglages se font dans les interfaces GitHub, OVH et Google : aucun code ne peut
les faire à ta place. Cocher au fur et à mesure.

## GitHub (github.com/frigorx)

- [ ] 🔴 **Avant le 31/08 : activer la double authentification (passkey ou 2FA)**
      sur le compte frigorx — Settings → Password and authentication — et
      **imprimer/ranger les codes de récupération**. Toute la chaîne de publication
      en dépend ; GitHub imposera l'A2F.
- [ ] Vérifier le domaine : dépôt `pilote-fluides` → Settings → Pages →
      « inerweb.fr » avec le cadenas « Enforce HTTPS » coché (constaté actif le
      19/08 — juste re-vérifier).
- [ ] 🔴 **Le domaine n'est PAS vérifié chez GitHub** — mesuré le 20/08/2026 :
      `_github-pages-challenge-frigorx.inerweb.fr` NE RÉSOUT PAS. (La version
      précédente de cette ligne disait de vérifier qu'il était « toujours là » :
      c'était faux.) Sans cette vérification, rien n'empêche quelqu'un d'autre de
      revendiquer inerweb.fr sur SON dépôt Pages le jour où tu le retirerais du
      tien. Dépôt → Settings → Pages (ou Settings du COMPTE → Pages) : GitHub y
      affiche le TXT exact à poser chez OVH. À AJOUTER à côté du SPF, jamais à la
      place.
- [ ] Protéger `main` : dépôt → Settings → Branches → Add branch protection rule →
      `main` → cocher « Do not allow force pushes » (actif par défaut dans la règle)
      et « Restrict deletions ». Les autres contrôles (revue obligatoire) sont
      optionnels tant que tu travailles seul.
- [ ] Passer en revue Settings → Collaborators (personne d'inattendu) et, dans les
      réglages du COMPTE : SSH keys, Applications, Personal access tokens — révoquer
      ce qui ne sert plus.

## OVH / DNS (zone inerweb.fr)

- [ ] **Ajouter le 4e enregistrement A manquant : `185.199.111.153`**
      (vérifié le 20/08 : seuls .108, .109 et .110 répondent). Zone DNS →
      Ajouter une entrée → A → cible `185.199.111.153`.
- [ ] Vérifier que les 4 A pointent bien vers 185.199.108.153 / 109.153 /
      110.153 / 111.153 et que le CNAME `www` → `frigorx.github.io.` est là.
- [ ] Vérifier que DNSSEC est activé et que le domaine est verrouillé contre le
      transfert (Protection anti-transfert : ON).
- [ ] Vérifier le renouvellement automatique du domaine (et le moyen de paiement
      à jour).
- [ ] Seulement si une adresse @inerweb.fr doit envoyer du courrier un jour :
      configurer SPF/DKIM/DMARC à ce moment-là (rien à faire tant que le mail
      reste sur Zimbra/gmail actuels — ne pas toucher aux MX).

## Google Search Console

> **Choix de F. Henninot le 20/08/2026 : on commence PAR LA.** C'est la seule mesure
> d'audience qui ne coûte aucun compromis — aucun script, aucun tiers dans les pages,
> les mentions légales (« le site ne charge aucun script tiers ») restent vraies.
> Ce qu'elle donne : les requêtes tapées pour te trouver, le nombre d'apparitions, les
> clics, les positions. Ce qu'elle NE donne PAS : les visites directes et celles venues
> d'un QR code en salle. Pour celles-là il faudra trancher Cloudflare (voir plus bas).

### État relevé le 20/08/2026 (à connaître AVANT de toucher à la zone)

- Enregistrements A présents : **185.199.108.153, .109.153, .110.153** — donc
  **`185.199.111.153` MANQUE TOUJOURS** (le site répond quand même, mais sur 3 IP au
  lieu de 4 : une redondance perdue).
- TXT actuels à la racine : `v=spf1 include:mx.ovh.com -all` et `1|www.inerweb.fr`.
- CNAME `www` → `frigorx.github.io` : correct.
- ⚠️ **`_github-pages-challenge-frigorx.inerweb.fr` NE RÉSOUT PAS.** La ligne plus haut
  de cette checklist disait « vérifier qu'il est toujours là » : il n'y est pas. Le
  domaine n'est donc pas vérifié côté GitHub — à reprendre dans Settings → Pages, qui
  affichera le TXT exact à poser.

### Le pas-à-pas

1. search.google.com/search-console → Ajouter une propriété → **Domaine** (PAS
   « préfixe d'URL » : la version Domaine couvre `inerweb.fr`, `www`, http et https
   d'un coup).
2. Google affiche **un enregistrement TXT** à poser à la racine de la zone chez OVH.
3. ⚠️ **PIÈGE À NE PAS FAIRE** : ce TXT s'AJOUTE à côté du SPF existant. Ne jamais
   remplacer ni fusionner la ligne `v=spf1 include:mx.ovh.com -all` — l'écraser
   casserait l'envoi de courrier du domaine. Deux TXT séparés à la racine, c'est normal
   et valide.
4. Revenir sur Search Console → Vérifier. (La propagation DNS chez OVH prend de
   quelques minutes à quelques heures ; si ça échoue, réessayer plus tard, ne pas
   reposer un second TXT.)
5. Sitemaps → soumettre : `sitemap.xml`. Il est en ligne et répond 200. Il contient
   **3 URL, volontairement** — c'est une liste contrôlée, pas un oubli.
6. Inspection d'URL → demander l'indexation de `https://inerweb.fr/`,
   `metier.html`, `formateurs.html`. Les trois ont déjà `canonical`, `description`
   et `title` corrects, vérifiés le 20/08.
7. Sous 1 à 2 semaines : Pages → « pourquoi des pages ne sont pas indexées ». Les 7
   pages en `noindex` doivent y apparaître comme **« exclues par noindex »** — c'est
   voulu, ce n'est PAS une erreur à corriger.

### Après, si tu veux les visites directes et le QR code

Le snippet Cloudflare décidé en juin est un script tiers : le poser rendrait fausse la
phrase des mentions légales et remettrait une requête tierce sur chaque page — l'inverse
exact du travail du 19/08 sur les films. **La variante à préférer : passer inerweb.fr
derrière Cloudflare en proxy DNS.** Le comptage se fait alors côté serveur, sans une
ligne de script dans les pages — et la même manipulation débloque les en-têtes de
sécurité (CSP, HSTS, Referrer-Policy) que GitHub Pages ne sait pas servir. Deux
problèmes, une seule décision. Non tranchée à ce jour.


## Rappels liés (déjà dans le task_plan)

- [ ] Relecture métier des 2 cours du 19/08 (parcours-manomètres, glissement).
- [ ] Décision galerie : sitemap ou noindex.
- [ ] Bon à tirer du working tree « durcissement » (voir RAPPORT-DURCISSEMENT).
