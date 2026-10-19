/* =====================================================================
   Station « Le permis de feu » — le simulateur de remplissage
   ---------------------------------------------------------------------
   Contrôle un permis de feu rempli à l'écran pour une situation donnée
   (brasage en chambre froide) : chaque bloc est jugé « Juste » ou
   « À revoir », et chaque erreur reçoit son mot d'explication. Aucun score,
   aucun envoi : tout reste dans la page. Les données ci-dessous sont celles
   du formulaire (FOND.md, tableau « Le simulateur »).
   Le sens ne tient pas à la couleur : le mot « Juste » ou « À revoir » est
   écrit, et le trait change (double / tireté).
   ===================================================================== */
(function () {
  "use strict";
  var BLOCS = [{"id":"qui","n":1,"titre":"Qui signe le permis ?","type":"cases","aide":"Cochez toutes les personnes qui doivent signer.","synthese":"Trois signatures : l'employeur, le responsable d'intervention, le technicien qui brase.","opts":[{"v":"gerant","t":"Le gérant du restaurant (l'employeur, côté entreprise utilisatrice)","c":"le gérant","req":true,"ok":"Le gérant est l'employeur de l'entreprise qui accueille les travaux : c'est lui, ou son représentant, qui établit le permis.","manque":"Le permis est établi par l'employeur ou son représentant, et validé par les acteurs de l'entreprise qui accueille les travaux."},{"v":"chef","t":"Le chef d'équipe de Clim'Études Sud (responsable d'intervention)","c":"le chef d'équipe","req":true,"ok":"Le responsable d'intervention de votre entreprise valide le permis avec ceux de l'entreprise utilisatrice.","manque":"Le responsable d'intervention de l'entreprise qui fait les travaux valide aussi le permis (INRS)."},{"v":"operateur","t":"Vous, le technicien qui brase : vous connaissez les mesures et vous vous engagez à les respecter","c":"vous, le technicien","req":true,"ok":"Vous devez connaître les risques et les mesures avant de commencer. Sur le modèle du Centre de gestion du Loiret, le technicien qui brase signe aussi.","manque":"Vous devez connaître les mesures avant de commencer et vous engager à les respecter : sur le modèle utilisé ici, le technicien qui brase signe aussi."},{"v":"client","t":"Un client du restaurant","c":"un client","req":false,"ko":"Un client n'a aucun rôle dans ces travaux : il ne signe pas."},{"v":"pompier","t":"Le pompier de la caserne la plus proche","c":"le pompier","req":false,"ko":"Les pompiers ne signent pas le permis. Leur numéro sert à l'alerte (bloc 7)."}]},{"id":"ouquand","n":2,"titre":"Où et quand ?","type":"champs","synthese":"Lieu, début et fin sont justes. Un permis a une durée limitée, écrite dessus.","champs":[{"id":"lieu","type":"select","label":"Lieu d'exécution","opts":[{"v":"local","t":"Le local technique de la chambre froide, derrière la cuisine","bon":true,"ok":"Le permis décrit un lieu précis : ici, le local technique."},{"v":"cuisine","t":"Toute la cuisine","ko":"« Toute la cuisine » est trop large. Le permis nomme le lieu exact des travaux, pour y régler les mesures."},{"v":"toit","t":"Le toit du restaurant","ko":"Ce n'est pas là que vous travaillez. Relisez la situation."},{"v":"atelier","t":"L'atelier de Clim'Études Sud","ko":"L'atelier de votre entreprise n'est pas le lieu des travaux : le permis vaut pour le site du client."}]},{"id":"debut","type":"select","label":"Les travaux commencent à","opts":[{"v":"07:00","t":"7 h 00","ko":"Les travaux commencent à 8 h : relisez la situation. Le permis donne l’heure de début."},{"v":"08:00","t":"8 h 00","bon":true,"ok":"Début des travaux : 8 h."},{"v":"09:00","t":"9 h 00","ko":"Les travaux commencent à 8 h : relisez la situation. Le permis donne l’heure de début."},{"v":"10:00","t":"10 h 00","ko":"Les travaux commencent à 8 h : relisez la situation. Le permis donne l’heure de début."}]},{"id":"fin","type":"select","label":"Les travaux finissent à","opts":[{"v":"10:00","t":"10 h 00","ko":"Les travaux finissent à 11 h. La surveillance après travaux se note ailleurs (bloc 6)."},{"v":"11:00","t":"11 h 00","bon":true,"ok":"Fin des travaux : 11 h."},{"v":"12:00","t":"12 h 00","ko":"Les travaux finissent à 11 h. La surveillance après travaux se note ailleurs (bloc 6)."},{"v":"13:00","t":"13 h 00","ko":"Les travaux finissent à 11 h. La surveillance après travaux se note ailleurs (bloc 6)."}]}]},{"id":"quoi","n":3,"titre":"Quels travaux par points chauds ?","type":"cases","aide":"Cochez uniquement ce qui est prévu.","synthese":"Un seul point chaud : le chalumeau.","opts":[{"v":"chalumeau","t":"Chalumeau (brasage fort)","c":"le chalumeau","req":true,"ok":"Le brasage fort se fait au chalumeau : c’est le travail par point chaud de ce chantier.","manque":"Il manque le chalumeau : c’est lui qui apporte la chaleur, donc le risque."},{"v":"meulage","t":"Meulage ou tronçonnage","c":"le meulage","req":false,"ko":"Le meulage n’est pas prévu. S’il le devient, il faudra revoir le permis."},{"v":"arc","t":"Soudage à l'arc électrique","c":"le soudage à l'arc","req":false,"ko":"Le soudage à l'arc n'est pas prévu : ici, on brase au chalumeau."},{"v":"decoupage","t":"Découpage","c":"le découpage","req":false,"ko":"Aucun découpage n’est prévu. Le permis décrit les travaux prévus, pas tous ceux qui seraient possibles."}]},{"id":"risques","n":4,"titre":"Quels risques sur place ?","type":"cases","aide":"Cochez les risques du lieu, pas ceux des autres chantiers.","synthese":"Deux risques : les cartons à côté, la cuisine en service.","opts":[{"v":"combustibles","t":"Stockage et proximité de matériaux combustibles","c":"les matériaux combustibles","req":true,"ok":"Les cartons à 3 m sont des matériaux combustibles : c’est le risque principal.","manque":"Les cartons à 3 m sont des matériaux combustibles : à cocher."},{"v":"voisinage","t":"Activité du voisinage immédiat","c":"l'activité du voisinage","req":true,"ok":"La cuisine reste en service : des personnes travaillent à côté.","manque":"La cuisine reste en service, juste à côté : à cocher."},{"v":"inflammables","t":"Stockage de produits inflammables","c":"les produits inflammables","req":false,"ko":"Rien dans la situation n'annonce de produits inflammables. On ne coche que les risques réels du lieu."},{"v":"atex","t":"Zone ATEX à proximité (atmosphère explosive)","c":"la zone ATEX","req":false,"ko":"ATEX veut dire atmosphère explosive. Il n'y en a pas ici : un risque coché à tort fait perdre de vue les vrais risques."}]},{"id":"mesures","n":5,"titre":"Quelles mesures avant de braser ?","type":"cases","aide":"Cochez les mesures justes. Il y en a plusieurs, et des pièges.","synthese":"Quatre mesures : cartons, extincteurs, détecteur, bouteilles.","opts":[{"v":"cartons","t":"Éloigner les cartons à plus de 10 m, ou les couvrir de bâches ignifugées s’ils ne peuvent pas être déplacés","c":"les cartons","req":true,"ok":"On éloigne les matières combustibles à 10 m au moins ; ce qui reste est protégé par des bâches ignifugées (INRS).","manque":"Il manque la mesure pour les cartons : à éloigner (10 m au moins) ou à couvrir de bâches ignifugées."},{"v":"extincteurs","t":"Placer à portée de main un extincteur à eau de 9 litres et un extincteur adapté au local","c":"les extincteurs","req":true,"ok":"Au minimum un extincteur à eau de 9 litres et un adapté aux risques du local, à proximité immédiate (INRS).","manque":"Il manque les extincteurs : il en faut à portée de main, avant de commencer."},{"v":"detection","t":"Éviter le déclenchement du détecteur de fumée sur la zone de travail, et vérifier à la fin qu’il fonctionne de nouveau","c":"le détecteur de fumée","req":true,"ok":"On évite le déclenchement intempestif en limitant à la zone concernée, et on vérifie à la fin que la détection fonctionne de nouveau.","manque":"Il manque le détecteur de fumée, au plafond : il se déclencherait à cause des fumées du brasage, puis il doit refonctionner à la fin."},{"v":"bouteilles","t":"Placer les bouteilles de gaz le plus loin possible de la zone de brasage","c":"les bouteilles loin","req":true,"ok":"Les bouteilles sont placées le plus loin possible de la zone de soudure (INRS).","manque":"Il manque les bouteilles de gaz : on les éloigne de la zone de brasage."},{"v":"bouteilles_pres","t":"Poser les bouteilles contre le mur, à côté du raccord, pour avoir des flexibles courts","c":"bouteilles contre le mur","req":false,"ko":"Une bouteille de gaz près de la flamme peut chauffer et exploser. On place les bouteilles le plus loin possible."},{"v":"cartons_laisser","t":"Laisser les cartons où ils sont : ils sont à plus d’un mètre","c":"cartons laissés en place","req":false,"ko":"Trois mètres, c’est trop près : les étincelles vont jusqu’à plusieurs mètres. On éloigne à 10 m au moins, ou on protège."},{"v":"extincteur_camion","t":"Laisser l’extincteur dans le camion pour qu’il ne gêne pas","c":"extincteur dans le camion","req":false,"ko":"Un extincteur dans le camion est trop loin : il doit être à portée immédiate."}]},{"id":"surveillance","n":6,"titre":"Qui surveille, et jusqu’à quand ?","type":"champs","synthese":"Un surveillant dont c’est la seule tâche, et deux heures de surveillance après les travaux.","champs":[{"id":"qui","type":"select","label":"Surveillant pendant les travaux","opts":[{"v":"marc","t":"Marc, le cuisinier formé à l'extincteur, qui ne fait que surveiller","bon":true,"ok":"Un surveillant formé à la première intervention, dont c’est la seule tâche."},{"v":"operateur","t":"Vous-même, en même temps que vous brasez","ko":"Le technicien qui brase est absorbé par son travail, et ses lunettes réduisent son champ de vision : il ne peut pas surveiller (INRS)."},{"v":"personne","t":"Personne : le local est petit","ko":"Il n'y a pas de petits travaux : un surveillant est indispensable (INRS)."},{"v":"client","t":"Un client du restaurant, volontaire","ko":"Le surveillant doit être formé à la première intervention contre l'incendie et avoir ses moyens : ce n'est pas un client."}]},{"id":"apres","type":"select","label":"Surveillance après la fin des travaux, jusqu’à","opts":[{"v":"11:00","t":"11 h 00 (dès la fin des travaux)","ko":"On surveille 2 heures au moins après la fin des travaux : 11 h + 2 h = 13 h. Un feu peut couver et se déclarer plus tard (INRS)."},{"v":"11:30","t":"11 h 30","ko":"On surveille 2 heures au moins après la fin des travaux : 11 h + 2 h = 13 h. Un feu peut couver et se déclarer plus tard (INRS)."},{"v":"12:00","t":"12 h 00","ko":"On surveille 2 heures au moins après la fin des travaux : 11 h + 2 h = 13 h. Un feu peut couver et se déclarer plus tard (INRS)."},{"v":"13:00","t":"13 h 00","bon":true,"ok":"13 h : deux heures après la fin des travaux, comme le demande l’INRS."}]}]},{"id":"alerte","n":7,"titre":"Comment alerter ?","type":"champs","synthese":"Le 18 ou le 112, et un téléphone prévu à l’avance.","champs":[{"id":"numero","type":"texte","label":"Numéro des sapeurs-pompiers à écrire sur le permis","acceptes":["18","112"],"ok":"Le 18 appelle les sapeurs-pompiers ; le 112 est le numéro d’urgence européen (service-public.gouv.fr).","ko":"Les sapeurs-pompiers : le 18, ou le 112 (numéro d’urgence européen)."},{"id":"moyen","type":"select","label":"Moyen d'alerte","opts":[{"v":"tel","t":"Un téléphone chargé sur place, et le numéro écrit sur le permis","bon":true,"ok":"Un moyen d’alerte prévu à l’avance, avec le numéro sur le permis."},{"v":"rien","t":"Aucun : l’extincteur suffit","ko":"L'extincteur ne remplace pas l'alerte : un moyen d'alerte doit être prévu avant de commencer."},{"v":"client","t":"Le téléphone d’un client, s’il y en a un","ko":"On ne compte pas sur un client : le moyen d'alerte est prévu à l'avance et inscrit sur le permis."}]}]}];
  var form = document.getElementById("permis");
  if (!form) return;
  var btnV = document.getElementById("permis-verifier");
  var btnR = document.getElementById("permis-reprendre");
  var bilan = document.getElementById("permis-bilan");

  function norm(s) { return String(s || "").replace(/[\s.]/g, "").toLowerCase(); }
  function fieldset(b) { return form.querySelector('fieldset[data-bloc="' + b.id + '"]'); }
  function cle(b, c) { return form.querySelector('[data-champ="' + b.id + "." + c.id + '"]'); }

  /* le jugement d'un bloc : { juste, items:[{genre, libelle, texte}] } */
  function juger(b) {
    var items = [], bons = [], juste = true;
    if (b.type === "cases") {
      b.opts.forEach(function (o) {
        var coche = form.querySelector('input[name="' + b.id + '"][value="' + o.v + '"]').checked;
        if (o.req && !coche) { juste = false; items.push({ genre: "manque", libelle: o.c, texte: o.manque }); }
        else if (!o.req && coche) { juste = false; items.push({ genre: "retirer", libelle: o.c, texte: o.ko }); }
        else if (o.req && coche) { bons.push(o.c); }
      });
    } else {
      b.champs.forEach(function (c) {
        var el = cle(b, c), v = el.value, libelle = c.label;
        if (c.type === "texte") {
          if (!norm(v)) { juste = false; items.push({ genre: "vide", libelle: libelle, texte: "À remplir." }); }
          else if (c.acceptes.indexOf(norm(v)) < 0) { juste = false; items.push({ genre: "retirer", libelle: libelle, texte: c.ko }); }
          else bons.push(libelle);
        } else if (!v) {
          juste = false; items.push({ genre: "vide", libelle: libelle, texte: "À remplir." });
        } else {
          var o = c.opts.filter(function (x) { return x.v === v; })[0];
          if (o && o.bon) bons.push(libelle);
          else { juste = false; items.push({ genre: "retirer", libelle: libelle, texte: o ? o.ko : "" }); }
        }
      });
    }
    return { juste: juste, items: items, bons: bons };
  }

  var GENRES = { manque: "Il manque", retirer: "À corriger", vide: "À remplir" };

  function afficher(b, r) {
    var fs = fieldset(b), box = fs.querySelector(".retour");
    fs.setAttribute("data-etat", r.juste ? "juste" : "revoir");
    box.className = "retour " + (r.juste ? "retour--juste" : "retour--revoir");
    box.textContent = "";
    var mot = document.createElement("span");
    mot.className = "mot";
    mot.textContent = r.juste ? "Juste. " : "À revoir. ";
    box.appendChild(mot);
    if (r.juste) {
      box.appendChild(document.createTextNode(b.synthese));
    } else {
      var ul = document.createElement("ul");
      r.items.forEach(function (it) {
        var li = document.createElement("li");
        var g = document.createElement("strong");
        if (it.genre === "vide") {
          g.textContent = GENRES.vide + " : " + it.libelle + ".";
          li.appendChild(g);
        } else {
          g.textContent = GENRES[it.genre] + " — " + it.libelle + " : ";
          li.appendChild(g);
          li.appendChild(document.createTextNode(it.texte));
        }
        ul.appendChild(li);
      });
      box.appendChild(ul);
      if (r.bons.length) {
        var p = document.createElement("p");
        p.style.margin = ".5em 0 0";
        p.textContent = "Déjà juste : " + r.bons.join(", ") + ".";
        box.appendChild(p);
      }
    }
    box.hidden = false;
  }

  function verifier() {
    var restants = 0;
    BLOCS.forEach(function (b) { var r = juger(b); if (!r.juste) restants += 1; afficher(b, r); });
    bilan.hidden = false;
    bilan.className = "bilan-permis " + (restants ? "retour--revoir" : "retour--juste");
    bilan.textContent = restants
      ? (restants === 1 ? "Il reste 1 bloc à revoir." : "Il reste " + restants + " blocs à revoir.") + " Lisez les explications, corrigez, puis vérifiez de nouveau."
      : "Juste : les sept blocs sont exacts, votre permis est complet. Dans la vraie vie, il reste à le faire signer et à remettre une copie à chaque signataire. Pas de permis signé, pas de chalumeau.";
    bilan.focus();
  }

  function reprendre() {
    form.reset();
    BLOCS.forEach(function (b) {
      var fs = fieldset(b);
      fs.removeAttribute("data-etat");
      var box = fs.querySelector(".retour");
      box.hidden = true; box.textContent = ""; box.className = "retour";
    });
    bilan.hidden = true; bilan.textContent = "";
  }

  btnV.addEventListener("click", verifier);
  btnR.addEventListener("click", reprendre);
  form.addEventListener("submit", function (e) { e.preventDefault(); });
})();
