# AE-5 — la fabrique des codes de séance

> Ouvert le 27/08/2026. Feu vert F. Henninot. Ce fichier suit l'avancement ;
> la spec qui fait foi reste `SPEC-ACCES-ENSEIGNANT.md`.

## Ce qui existait déjà en ouvrant le capot

Plus que prévu — le socle est posé des deux côtés :

- `build/lib-acces.mjs` : `fabriquerCodeSession()` et `lireCodeSession()`, testés.
- `moteur/acces.js` : `lireCodeSeance()`, `activerSeance()`, `seanceDansAdresse()`
  (lecture du fragment `#s=<code>`), chaîne de certification à deux maillons vérifiée
  en WebCrypto. **Le navigateur sait déjà LIRE une séance.**

## Ce qui manque, et qui est le chantier

1. **L'identifiant de séance.** Le format ne porte que certificat + kEleve + date de fin
   + libellé. Deux séances de même libellé et même date produisent le **même code** :
   impossible de les distinguer, et impossible de rattacher un bilan à une séance plus
   tard. On ajoute 8 octets tirés au hasard. ▶ Fenêtre ouverte : **aucun code de séance
   n'a été émis** (registre vide, `codes/` vide), le format se change encore sans casse.
2. **`ranger()` jette ce qu'il faut pour fabriquer.** `lireCodeMaitre()` extrait bien
   `certificatBrut` et `secret`, mais `ranger()` ne garde que `kProf`/`kEleve`. Sans le
   certificat et le secret, le titulaire ne peut rien signer sans recoller son code.
3. **`fabriquerCodeSeance()` côté navigateur.** N'existe pas. C'est l'enseignant qui
   signe, dans SON navigateur, avec SA clé. WebCrypto, ECDSA P-256, IEEE P1363.
4. **Un encodeur QR.** Aucun dans le dépôt, aucune dépendance (`package.json` absent,
   projet vanilla). À écrire, autonome, sans réseau.
5. **L'interface** « Fabriquer un code de séance » : libellé + date de fin → lien + QR.
   Fermée derrière un code maître valide.
6. **Le portillon `djb2`** de `formateur.html` / `projection.html` à solder.

## Critère de réussite — prouvé dans le navigateur le 27/08, pas affirmé

- [x] un code maître collé ouvre la fabrique ;
- [x] libellé + date de fin → un lien et son QR code (version 16, correction M,
      81 modules de côté — projetable et imprimable) ;
- [x] le lien de séance ouvre bien l'accès au nom du titulaire ;
- [x] **sans code maître, la fabrique refuse** — l'interface ne montre pas de
      formulaire ET l'appel direct à `fabriquerSeance()` renvoie `PAS_TITULAIRE` ;
- [x] deux séances de même libellé et même date donnent deux codes distincts ;
- [x] les trois filets restent au vert — **96 contrôles**.

▶ Reste à éprouver par F. Henninot, et lui seul peut le faire : **scanner le QR
avec un vrai téléphone**. Tout le reste est vérifié.

## Avancement — tout livré le 27/08

- [x] 1. identifiant de séance (build + navigateur + tests)
- [x] 2. `ranger()` conserve certificat et secret
- [x] 3. `fabriquerCodeSeance()` en WebCrypto (`fabriquerSeance` dans l'API)
- [x] 4. encodeur QR autonome — `moteur/qr.js`, sans dépendance
- [x] 5. interface de fabrication — `seances.html`
- [x] 6. portillon soldé — `formateur.html` et `projection.html` sont nominatives
- [x] 7. preuve dans le navigateur

## Les trois filets

| Fichier | Ce qu'il prouve | Contrôles |
|---|---|---|
| `build/test-acces.mjs` | le socle des codes, et surtout ce qu'il REFUSE | 49 |
| `build/test-fabrique.mjs` | que `moteur/acces.js` et `build/lib-acces.mjs` **ne divergent pas** : ce que le navigateur signe, Node le relit, et l'inverse | 31 |
| `build/test-qr.mjs` | que l'encodeur QR est conforme (mots de contrôle contre la norme, capacités, aller-retour sur la trame) | 16 |

## Ce qui a été trouvé en chemin, et corrigé

**Le piège d'usage qui serait arrivé dès le premier essai.** `activerSeance()`
écrasait l'accès rangé : l'enseignant qui scannait son propre QR pour vérifier
perdait son code maître — donc sa capacité à en fabriquer d'autres. Une séance se
pose maintenant SUR l'accès enseignant sans le remplacer. Couvert par la
section 6 de `test-fabrique.mjs`.

**Une date d'avant 2026 n'est pas « illisible ».** Le format écrit les dates en
jours depuis le 1er janvier 2026 ; une date antérieure sort du format. Le message
le dit maintenant, au lieu de prétendre que la date ne se lit pas.

## 🔴 CE QUI RESTE À FAIRE AVANT DE POUSSER

**Se délivrer son propre code d'accès `habilitation`.** Le portillon est devenu
nominatif : au prochain déploiement, `formateur.html` et `projection.html` ne
s'ouvriront plus avec le code court partagé — y compris pour F. Henninot. Le
geste, dans la console des accès du Bureau, ou en ligne de commande :

    node build/delivrer-acces.mjs habilitation "Franck Henninot"

**Et prévenir les collègues qui avaient le code court**, avant la mise en ligne —
même leçon que la bascule du coffre le 26/08.

## Ce qui est réservé pour plus tard, sciemment

L'identifiant de séance est **le point d'articulation** de la remontée des bilans : c'est
lui qui permettra de rattacher un résultat à une classe, quelle que soit la voie retenue
(QR de bilan, serveur, ou fichier outillé). La voie n'est pas tranchée au 27/08 —
F. Henninot veut en parler d'abord. On pose le numéro, on ne code pas la remontée.
