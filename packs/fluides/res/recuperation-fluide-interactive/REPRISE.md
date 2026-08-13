# Reprise - TP interactif récupération du fluide

## État

- Statut : brouillon métier non validé.
- Racine travaillée : `C:\git\pilote-fluides`.
- Intégration au portail : non.
- Indexation RAG : non, en attente du bon à tirer explicite.
- Dépendances distantes : aucune.

## Parcours

Le module contient 8 phases et 93 actions attendues :

1. analyser l'emplacement du composant, retenir ici la récupération totale, puis préparer le poste ;
2. contrôler le manifold, les flexibles, leurs joints et les vannes de service, puis raccorder cinq flexibles avec leurs mini-vannes côté appareil ;
3. mettre les flexibles et la branche station au vide ;
4. récupérer d'abord en phase liquide par la HP ;
5. finir en phase vapeur par la BP ;
6. auto-purger la Minimax-E ;
7. peser, calculer et déposer la branche station ;
8. simuler l'intervention achevée, tirer l'installation au vide, contrôler la tenue et déposer le matériel.

Deux modes partagent exactement la même séquence :

- guidé : l'action suivante, la commande concernée et l'appareil correspondant sont indiqués ; la vue zoome sur la zone utile ;
- chaque action guidée possède une feuille commune en trois temps : où regarder, quoi faire, quel résultat vérifier. Le « pourquoi » reste visible au-dessus ;
- les 18 actions de contrôle possèdent une guidance rédigée spécifiquement. Elles ne se résument plus à un bouton de confirmation sans critères ;
- pendant les cinq poses et les cinq déposes de flexibles, le cadre montre simultanément les deux appareils concernés ;
- autonome : seul l'objectif de phase reste visible ; les gestes hors ordre sont comptés et bloqués ;
- dans les deux modes, « Aidez-moi » révèle une solution textuelle directe, le repère « ICI » et le surlignage de l'appareil. Une ouverture puis une fermeture de la même aide ne compte qu'une utilisation.
- les commandes se cliquent impérativement sur les appareils dessinés. Les quatre onglets du bas servent uniquement à lire l'état ; en mode guidé, le bon témoin s'ouvre automatiquement.

## Contrats à préserver

- Le manifold représenté est un modèle 4 voies : BP, VIDE, SERVICE, HP.
- La Minimax-E possède trois sélecteurs distincts : entrée bleue, récupération/purge noir, sortie rouge, auxquels s'ajoutent POWER et START.
- Le sélecteur noir ne change jamais pendant que la station tourne.
- Avant le passage en PURGE : fermer l'entrée bleue pendant la fin de marche, arrêter le compresseur, couper POWER, puis tourner le sélecteur noir.
- Le sélecteur bleu possède trois positions. Le passage intermédiaire par LIQUIDE reste visible lorsqu'on tourne de FERMÉ vers VAPEUR / OPEN ; il n'est pas compté comme une erreur.
- Sur le plateau de Franck, le flexible de sortie est raccordé au robinet VAPEUR du cylindre, qui est ouvert pendant la récupération ; le robinet LIQUIDE reste fermé. Ce choix réduit la présence de liquide dans le flexible au débranchement.
- Chaque flexible comporte une mini-vanne placée du côté de l'appareil raccordé. Son état et son orientation font partie de la séquence.
- Les vannes de service B (départ liquide) et C (aspiration) commencent et finissent au siège arrière ; leur position intermédiaire ouvre la prise de service.
- La bouteille est pesée avant et après ; le scénario affiche 12,00 kg puis 14,30 kg.
- Le vacuomètre contrôle le vide poussé. Les aiguilles du manifold ne le remplacent pas.
- Isoler le circuit avant d'arrêter la pompe à vide.
- Aucune cible chiffrée de vide ou de durée n'est inventée.
- Déconnexion : fermer, stabiliser, desserrer lentement ; le résidu est récupéré, jamais rejeté volontairement.
- Schéma frigorifique : détendeur à gauche, compresseur à droite, condenseur en haut, évaporateur en bas.
- L'installation emploie désormais trois éléments de la bibliothèque inerWeb/QElectroTech : groupe de condensation complet, évaporateur cubique à deux ventilateurs et détendeur thermostatique. Ne pas les remplacer par des formes génériques.
- Les trois prises proposées sur le groupe correspondent au refoulement, au départ liquide et à l'aspiration. Les lettres A, B et C repèrent les vannes sans révéler HP/BP avant la réponse de l'élève.
- Le refoulement et le départ liquide sont reconnus comme deux points HP. Le scénario retient le départ liquide pour la récupération en phase liquide ; le refoulement ne doit pas être présenté comme techniquement absurde.
- Le choix entre transfert interne et récupération totale dépend de la partie du circuit à ouvrir. La mission actuelle impose la récupération totale dans une bouteille externe.
- Lors de l'intervention simulée, toute ouverture est bouchonnée immédiatement pour éviter rejet de fluide et entrée d'humidité.
- Les libellés des accessoires et commandes doivent rester lisibles sans zoom. Sur téléphone, les noms et états restent visibles dans le panneau inférieur, avec une seule famille de commandes affichée à la fois.

## À valider humainement

1. L'ordre exact du pré-tirage au vide des flexibles et de la station sur le montage réel du plateau.
2. La position bleue à employer pour cette mise au vide (`VAPEUR / OPEN` dans le prototype).
3. Le choix HP pour la phase liquide puis BP pour la phase vapeur sur l'installation réellement utilisée.
4. Les libellés visibles sur les trois sélecteurs de la Minimax-E du plateau.
5. La présence, le type et l'emplacement réel du vacuomètre et de la vanne d'isolement.
6. La validation pédagogique des 93 actions : possibilité de regrouper certaines actions pour une séance plus courte.
7. La situation de départ qui justifie la récupération totale : composant exact et emplacement sur l'installation réelle du plateau.

## Validation technique réalisée sur cette reprise

- Contrôle syntaxique de `app.js` réussi.
- Parcours guidé complet : 93 gestes validés, 0 erreur, 0 aide.
- Nouveau parcours avec feuille de guidance : 93 gestes validés, 0 erreur, 0 aide ; aucune zone de guidance tronquée pendant le parcours à 1280 × 720.
- Les formulations complètes servent à la projection ; une formulation courte dédiée sert au téléphone, sans simple troncature automatique.
- Les commandes du panneau inférieur sont désactivées : le parcours complet a été réalisé depuis les commandes SVG dessinées sur les appareils.
- Clics directs vérifiés sur les vannes A, B et C, les quatre vannes du manifold, les trois sélecteurs et les deux interrupteurs de la Minimax-E, la pompe, la bouteille et les cinq mini-vannes.
- Mauvais choix rouge sur A : le retour confirme que le refoulement est HP, puis demande B, départ liquide retenu par le scénario.
- Mauvais raccord orange sur LIQUIDE : raccord refusé ; le raccord VAPEUR permet de poursuivre.
- Les mini-vannes apparaissent seulement lorsque leur flexible est raccordé et leur poignée tourne avec leur état.
- Zooms inspectés à 1280 × 720 : manifold seul, groupe et trois vannes de service, station, pompe et bouteille restent actionnables sans défilement.
- L'accueil, le poste complet, la pose des vannes de service et l'écran de bilan ont été inspectés visuellement.
- Formats recontrôlés après ajout de la guidance : 1024 × 768, 1280 × 720, 390 × 844 et 360 × 640, sans défilement de page. Au format téléphone, la guidance courte, l'action et le retour restent visibles.
- Le RAG local a été interrogé le 12 août 2026 pour les contrôles préalables de bouteille, mais le moteur d'embedding local n'a pas répondu dans le délai. Aucun nouveau contenu RAG n'a donc été utilisé ni indexé ; les sources déjà tracées dans `SOURCES.md` restent la base métier de cette reprise.

Cette validation ne remplace pas les sept validations métier et pédagogiques listées ci-dessus.

## Fichiers

- `index.html` : interface et SVG original.
- `styles.css` : charte, projection, mobile et impression.
- `app.js` : séquence unique, règles de sécurité, états, voix facultative et bilan.
- `SOURCES.md` : références métier.
- `SOURCES-IMAGES.md` : traçabilité des visuels.
- `assets/symboles/` : copies SVG converties des éléments de la bibliothèque inerWeb/QElectroTech utilisés dans l'installation.
