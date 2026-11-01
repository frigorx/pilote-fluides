/* Station BE-T7 : Été 2, apports internes.
   Méthode sur le petit bâtiment de bureaux d'exemple des stations T5 et T6, puis commande sur la maison. Les valeurs de l'exemple (bloc EXEMPLE)
   et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par outils/stations/t7-ete-apports-internes/construire.mjs : le premier vient de
   exemple-data.mjs, les secondes de corriges/t7-ete-apports-internes/reference-apports.json (outils/t7-apports-maison.mjs, tolérance 3 %).
   Aucune valeur calculée de la maison n'est écrite dans cette station : seules les bornes des fourchettes et les données de la commande le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";

/*EXEMPLE-DEBUT*/
const EX = {
 "h": "16",
 "te": "32",
 "ti": "26",
 "dT": "6",
 "comble": "38",
 "ecLT": "5,4",
 "ecC": "12",
 "bLT": "0,90",
 "teinte": "moyen",
 "a": "0,6",
 "rse": "0,07",
 "eclW": "8",
 "act": [
  {
   "nom": "Assis, au repos",
   "S": "65",
   "L": "35"
  },
  {
   "nom": "Assis, activité légère (logement, bureau)",
   "S": "70",
   "L": "50"
  },
  {
   "nom": "Debout, travail léger (atelier, magasin)",
   "S": "80",
   "L": "140"
  }
 ],
 "alpha": [
  {
   "cat": "Clair",
   "couleurs": "blanc, jaune, orange, rouge clair",
   "a": "0,4"
  },
  {
   "cat": "Moyen",
   "couleurs": "rouge sombre, vert clair, bleu clair, gris clair",
   "a": "0,6"
  },
  {
   "cat": "Sombre",
   "couleurs": "brun, vert sombre, bleu vif, gris moyen",
   "a": "0,8"
  },
  {
   "cat": "Noir",
   "couleurs": "noir, brun sombre, bleu sombre, gris sombre",
   "a": "1,0"
  }
 ],
 "I": {
  "S": "160",
  "E": "110",
  "O": "730",
  "N": "110"
 },
 "soleil": {
  "S": "6,7",
  "E": "4,6",
  "O": "30,7",
  "N": "4,6"
 },
 "mur": {
  "S": "12,7",
  "E": "10,6",
  "O": "36,7",
  "N": "10,6"
 },
 "locaux": [
  {
   "nom": "Bureau",
   "n": "2",
   "surf": "19,14",
   "equip": "300",
   "equipTxt": "deux ordinateurs de 150 W",
   "occS": "140",
   "occL": "100",
   "ecl": "153",
   "intS": "593",
   "parois": "172",
   "opaques": "157",
   "sens": "765",
   "lat": "100",
   "lignes": [
    {
     "paroi": "MA, mur nord",
     "A": "13,47",
     "U": "0,31",
     "UA": "4,18",
     "ecart": "10,6",
     "phi": "44"
    },
    {
     "paroi": "Fa, fenêtre nord",
     "A": "1,61",
     "U": "1,60",
     "UA": "2,58",
     "ecart": "6,0",
     "phi": "15"
    },
    {
     "paroi": "MB, mur est",
     "A": "8,58",
     "U": "0,31",
     "UA": "2,66",
     "ecart": "10,6",
     "phi": "28"
    },
    {
     "paroi": "MC, mur sur le local technique",
     "A": "6,69",
     "U": "0,54",
     "UA": "3,61",
     "ecart": "5,4",
     "phi": "19"
    },
    {
     "paroi": "Pn, porte vers le local technique",
     "A": "1,89",
     "U": "1,80",
     "UA": "3,40",
     "ecart": "5,4",
     "phi": "18"
    },
    {
     "paroi": "Plafond sous le comble",
     "A": "19,14",
     "U": "0,21",
     "UA": "4,02",
     "ecart": "12,0",
     "phi": "48"
    }
   ]
  },
  {
   "nom": "Salle de réunion",
   "n": "8",
   "surf": "24,60",
   "equip": "300",
   "equipTxt": "un vidéoprojecteur de 300 W",
   "occS": "560",
   "occL": "400",
   "ecl": "197",
   "intS": "1057",
   "parois": "307",
   "opaques": "246",
   "sens": "1364",
   "lat": "400",
   "lignes": [
    {
     "paroi": "Mur sud",
     "A": "9,60",
     "U": "0,31",
     "UA": "2,98",
     "ecart": "12,7",
     "phi": "38"
    },
    {
     "paroi": "Fb, fenêtre sud",
     "A": "2,40",
     "U": "1,60",
     "UA": "3,84",
     "ecart": "6,0",
     "phi": "23"
    },
    {
     "paroi": "Mur ouest",
     "A": "12,80",
     "U": "0,31",
     "UA": "3,97",
     "ecart": "36,7",
     "phi": "146"
    },
    {
     "paroi": "Fc et Fd, fenêtres ouest",
     "A": "4,00",
     "U": "1,60",
     "UA": "6,40",
     "ecart": "6,0",
     "phi": "38"
    },
    {
     "paroi": "Plafond sous le comble",
     "A": "24,60",
     "U": "0,21",
     "UA": "5,17",
     "ecart": "12,0",
     "phi": "62"
    }
   ]
  },
  {
   "nom": "Sanitaires",
   "n": "0",
   "surf": "6,20",
   "equip": "0",
   "equipTxt": "aucun appareil",
   "occS": "0",
   "occL": "0",
   "ecl": "50",
   "intS": "50",
   "parois": "54",
   "opaques": "48",
   "sens": "104",
   "lat": "0",
   "lignes": [
    {
     "paroi": "Mur est",
     "A": "9,80",
     "U": "0,31",
     "UA": "3,04",
     "ecart": "10,6",
     "phi": "32"
    },
    {
     "paroi": "Fe, fenêtre est",
     "A": "0,60",
     "U": "1,60",
     "UA": "0,96",
     "ecart": "6,0",
     "phi": "6"
    },
    {
     "paroi": "Plafond sous le comble",
     "A": "6,20",
     "U": "0,21",
     "UA": "1,30",
     "ecart": "12,0",
     "phi": "16"
    }
   ]
  }
 ],
 "tot": {
  "occS": "700",
  "occL": "500",
  "ecl": "400",
  "equip": "600",
  "parois": "533",
  "opaques": "451",
  "sens": "2233",
  "lat": "500",
  "partOpq": "20"
 },
 "murO": {
  "paroi": "Mur ouest",
  "A": "12,80",
  "U": "0,31",
  "UA": "3,97",
  "ecart": "36,7",
  "phi": "146"
 },
 "ex1": {
  "n": "6",
  "quiz": {
   "choices": [
    "Sensible 1320 W ; latent 0 W",
    "Sensible 480 W ; latent 840 W",
    "Sensible 420 W ; latent 300 W",
    "Sensible 840 W ; latent 480 W"
   ],
   "good": 1,
   "explain": "6 × 80 = 480 W de sensible ; 6 × 140 = 840 W de latent, gardés à part. A met le latent dans le sensible, C prend la ligne « activité légère », D inverse les deux colonnes."
  }
 },
 "ex2": {
  "n": "3",
  "surf": "30,00",
  "eclW": "8",
  "nApp": "4",
  "pApp": "150",
  "quiz": {
   "choices": [
    "Sensible 1200 W ; latent 0 W",
    "Sensible 1050 W ; latent 150 W",
    "Sensible 810 W ; latent 150 W",
    "Sensible 960 W ; latent 150 W"
   ],
   "good": 1,
   "explain": "Occupants 3 × 70 = 210 W ; éclairage 30,00 × 8 = 240 W ; appareils 4 × 150 = 600 W ; sensible 1050 W. Latent 3 × 50 = 150 W. A met le latent dans le sensible, C oublie l’éclairage, D prend 5 W/m², la valeur d’un logement."
  }
 },
 "ex3": {
  "A": "10,00",
  "U": "0,40",
  "teinte": "Moyen",
  "a": "0,6",
  "I": "730",
  "surplus": "30,7",
  "ecart": "36,7",
  "UA": "4,00",
  "quiz": {
   "choices": [
    "Écart 6 K ; Φ = 24 W",
    "Écart 36,7 K ; Φ = 147 W",
    "Écart 26,4 K ; Φ = 106 W",
    "Écart 23,5 K ; Φ = 94 W"
   ],
   "good": 1,
   "explain": "Part du soleil : 0,6 × 0,07 × 730 = 30,7 K ; écart équivalent 6 + 30,7 = 36,7 K ; U × A = 0,40 × 10,00 = 4,00 ; Φ = 4,00 × 36,7 = 147 W. A oublie le soleil, C prend la teinte claire (0,4), D prend Rse = 0,04, la valeur des conditions d’hiver."
  }
 },
 "maison": {
  "h": "10",
  "te": "33",
  "ti": "26",
  "dT": "7",
  "comble": "40",
  "a": "0,4",
  "eclW": "5",
  "S": "70",
  "L": "50",
  "eqSej": "400",
  "eqCh": "100",
  "b": "0,95",
  "I": {
   "S": "400",
   "E": "540",
   "O": "140",
   "N": "140"
  }
 }
};
/*EXEMPLE-FIN*/

const REU = EX.locaux[1], BUR = EX.locaux[0];
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const tableauActivites = () => tableau(["Activité de l’occupant", "Sensible (W)", "Latent (W)"], EX.act.map(a => [a.nom, a.S, a.L]), "Apport d’un occupant à 26 °C, données de l’exercice");
const tableauParois = (l, legende) => tableau(["Paroi", "A (m²)", "U", "U × A", "Écart (K)", "Φ (W)"], [...l.lignes.map(x => [x.paroi, x.A, x.U, x.UA, x.ecart, x.phi]), ["Somme des parois", "", "", "", "", l.parois]], legende);
const tableauEcarts = () => tableau(["Façade", `I à ${EX.h} h (W/m²)`, "αp × Rse × I (K)", "Écart équivalent (K)"], [["Sud", "S"], ["Est", "E"], ["Ouest", "O"], ["Nord", "N"]].map(([n, k]) => [n, EX.I[k], `${EX.a} × ${EX.rse} × ${EX.I[k]} = ${EX.soleil[k]}`, `${EX.dT} + ${EX.soleil[k]} = ${EX.mur[k]}`]), `Bâtiment d’exemple : écarts équivalents des murs à ${EX.h} h, teinte ${EX.teinte}`);
const tableauLocaux = () => tableau(["Local", "Occupants (W)", "Éclairage (W)", "Appareils (W)", "Parois (W)", "Sensible (W)", "Latent (W)"], [...EX.locaux.map(l => [l.nom, l.occS, l.ecl, l.equip, l.parois, l.sens, l.lat]), ["Bâtiment", EX.tot.occS, EX.tot.ecl, EX.tot.equip, EX.tot.parois, EX.tot.sens, EX.tot.lat]], `Bâtiment d’exemple à ${EX.h} h solaires, en W`);
const exempleOcc = () => BE.exemple({ text: `Salle de réunion d’exemple : ${REU.n} personnes assises, en réunion (activité légère)`, answer: `sensible ${REU.n} × ${EX.act[1].S} = ${REU.occS} W ; latent ${REU.n} × ${EX.act[1].L} = ${REU.occL} W`, why: "Deux colonnes, deux résultats. Le latent n’est pas ajouté au sensible." });
const exempleEcl = () => BE.exemple({ text: `Bureau d’exemple : ${BUR.surf} m², éclairage à LED de ${EX.eclW} W/m², ${BUR.equipTxt}`, answer: `éclairage ${BUR.surf} × ${EX.eclW} = ${BUR.ecl} W ; appareils ${BUR.equip} W ; avec ses ${BUR.n} occupants (${BUR.occS} W), sensible interne ${BUR.intS} W`, why: "L’éclairage et les appareils ne donnent que du sensible. Le résultat s’arrondit au watt." });
const exempleMur = () => BE.exemple({ text: `Mur ouest de la salle de réunion, ${EX.murO.A} m², U = ${EX.murO.U}, teinte ${EX.teinte} (αp = ${EX.a}), à ${EX.h} h solaires (I = ${EX.I.O} W/m²)`, answer: `écart ${EX.dT} + ${EX.a} × ${EX.rse} × ${EX.I.O} = ${EX.dT} + ${EX.soleil.O} = ${EX.mur.O} K ; U × A = ${EX.murO.UA} ; Φ = ${EX.murO.UA} × ${EX.mur.O} = ${EX.murO.phi} W`, why: `Sans le soleil, ce mur n’apporterait que ${EX.murO.UA} × ${EX.dT}, soit environ un sixième.` });

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      "Les occupants du séjour-cuisine et de la chambre 1 sont sur votre feuille de la station E2 : pour le séjour-cuisine, additionnez ceux du séjour et ceux de la cuisine. Les surfaces et les murs de la chambre 1 sur votre feuille de la station T1, les U sur votre feuille de la station T2. Toutes les autres données sont dans la commande ci-dessus et sur la feuille.",
      "Exercice 1 de la feuille : occupants × 70 W pour le sensible, × 50 W pour le latent ; surface × 5 W/m² ; puis les appareils. Exercice 2 de la feuille : d’abord l’écart équivalent des façades sud et ouest, puis une ligne par paroi, U × A × écart (écrans « Les parois en été » et « Le mur au soleil »).",
      `Sur l’exemple, la salle de réunion donne ${REU.occS} W sensible et ${REU.occL} W latent pour ses occupants, et son mur ouest ${EX.murO.UA} × ${EX.mur.O} = ${EX.murO.phi} W. Pour la chambre 1, le plafond prend l’écart du comble, les fenêtres l’écart de l’air seul.`
    ],
    2: [
      "Occupants : feuille de la station E2. Elle compte le séjour et la cuisine sur deux lignes : additionnez leurs occupants, car aux stations T1 et T7 c’est une seule pièce, le séjour-cuisine. Surfaces, murs, baies et plafonds de chaque pièce : feuille de la station T1. U : station T2. b du garage : station T3. θe d’été : station E1. Heure de pointe et rayonnement : station T6. Le reste est dans la commande.",
      "Pour chaque pièce chauffée : occupants, éclairage, appareils, puis ses parois. Posez au brouillon une ligne U × A × écart par mur, par baie et par plafond ; sur la feuille, à la ligne « Parois : » sous la pièce, écrivez le Φ de chaque paroi et leur somme. Les murs sur le garage et la porte de service prennent b × (θe − θi), au dixième de K. La porte d’entrée, même pleine, prend θe − θi, comme les fenêtres. Le plancher sur terre-plein ne se compte pas. L’éclairage se compte sur la surface habitable, le plafond sur sa propre surface, qui peut être plus grande au-dessus d’un escalier.",
      `Sur l’exemple, le bureau a six lignes de parois, dont le mur sur le local technique à ${EX.ecLT} K. Sa somme vaut ${BUR.parois} W. Parois opaques : tout sauf les fenêtres et la porte-fenêtre.`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensDossier = () => BE.liens([
  { href: DOSSIER + "plans-maison.pdf", title: "Les plans de la maison", note: "Pièces, murs et orientations ; tableau des menuiseries à la page 5" },
  { href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Couches des parois à la page 1, U des menuiseries à la page 2 ; les U des parois sont sur votre feuille de la station T2" }
]);
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + liensDossier(); };

BE.station({
  code: "BE-T7",
  titre: "Été 2 : apports internes",
  ligne: "Thermique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Le séjour-cuisine et la chambre 1, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "Les huit pièces de la maison, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "En été, les occupants, les lampes, les appareils et les parois chauffées par le soleil apportent de la chaleur aux pièces. Les occupants apportent aussi de la vapeur d’eau. Vous calculez ces apports local par local, à l’heure de pointe, en gardant à part la chaleur sensible et la chaleur latente. Vous apprenez la méthode sur un petit bâtiment d’exemple, puis vous la faites sur la maison.",
  note: "Les apports par occupant, la puissance d’éclairage, les appareils et la température du comble sont des données de l’exercice. Le coefficient d’absorption solaire et la résistance superficielle extérieure viennent des règles Th-Bât.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et données" },
    { id: "methode", label: "La méthode", note: "sur un bâtiment d’exemple" },
    { id: "projet", label: "Le projet", note: "commande, plans et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Apports internes du séjour-cuisine et de la chambre 1, parois de la chambre 1, à l’heure de pointe",
      delai: "Rendu en fin de séance",
      commande: [
        `Le CCTP ne prévoit pas de climatisation (page 4) : le bureau d’études chiffre ce qu’un appareil devrait retirer pour tenir 26 °C. La station T6 a donné l’heure de pointe du soleil de la maison : ${EX.maison.h} h solaires. Le bureau d’études veut, à cette heure, les autres apports de deux pièces. Chaque pièce est comptée pleine : tous ses occupants, son éclairage allumé, ses appareils en marche. Données de l’exercice fixées par le bureau d’études : ${EX.maison.S} W sensible et ${EX.maison.L} W latent par occupant ; éclairage à LED de ${EX.maison.eclW} W/m² de surface habitable ; appareils : ${EX.maison.eqSej} W au séjour-cuisine, ${EX.maison.eqCh} W par chambre ; θe = ${EX.maison.te} °C (station E1), θi = ${EX.maison.ti} °C (station E2) ; comble à ${EX.maison.comble} °C ; enduit extérieur clair. Rayonnement I à ${EX.maison.h} h (W/m²) : sud ${EX.maison.I.S}, est ${EX.maison.I.E}, ouest ${EX.maison.I.O}, nord ${EX.maison.I.N}. Suivez les étapes dans l’ordre.`,
        "Étape 1, exercice 1 de la feuille. Au recto, une ligne pour le séjour-cuisine et une pour la chambre 1. Occupants de la station E2 : pour le séjour-cuisine, additionnez ceux du séjour et ceux de la cuisine. Surface habitable de la station T1. Sensible des occupants, latent des occupants, éclairage, appareils, puis le sensible interne.",
        `Étape 2, exercice 2 de la feuille. Au verso, l’écart équivalent des façades sud et ouest (αp = ${EX.maison.a}, Rse = ${EX.rse}), puis une ligne par paroi de la chambre 1 : murs M10 et M11 (surfaces nettes de la station T1), fenêtres F7 et F8, plafond sous le comble. U de la station T2. Écrivez la somme des parois.`,
        "Étape 3, exercice 3 de la feuille. Le tableau de la chambre 1 à l’heure de pointe, sensible et latent séparés, puis les trois lignes de la note. Vérifiez vos trois résultats à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Vos feuilles des stations T1, T2 et E2", ou: "Surfaces et murs nets de chaque pièce ; U des parois ; occupants de chaque pièce" },
        { piece: "Plans de la maison (plans-maison.pdf)", ou: "Pièces, murs et orientations ; tableau des menuiseries à la page 5" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 2 : U des menuiseries. Page 4 : pas de climatisation" },
        { piece: "Apports, éclairage, appareils, températures, I", ou: "Cette commande, données de l’exercice" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Apports internes et apports par les parois des huit pièces chauffées, à l’heure de pointe",
      delai: "Rendu en fin de séance",
      commande: `Le CCTP ne prévoit pas de climatisation (page 4) : le bureau d’études chiffre ce qu’un appareil devrait retirer pour tenir 26 °C. La station T6 a donné l’heure de pointe du soleil de la maison : ${EX.maison.h} h solaires. Le bureau d’études veut, à cette heure et pour chacune des huit pièces chauffées, l’apport sensible et l’apport latent des occupants, de l’éclairage, des appareils et des parois. Chaque pièce est comptée pleine : tous ses occupants, son éclairage allumé, ses appareils en marche. Données de l’exercice fixées par le bureau d’études : ${EX.maison.S} W sensible et ${EX.maison.L} W latent par occupant ; éclairage à LED de ${EX.maison.eclW} W/m² de surface habitable ; appareils : ${EX.maison.eqSej} W au séjour-cuisine, ${EX.maison.eqCh} W par chambre, rien ailleurs ; θe = ${EX.maison.te} °C (station E1), θi = ${EX.maison.ti} °C (station E2) dans toutes les pièces ; comble à ${EX.maison.comble} °C ; enduit extérieur clair. Rayonnement I à ${EX.maison.h} h (W/m²) : sud ${EX.maison.I.S}, est ${EX.maison.I.E}, ouest ${EX.maison.I.O}, nord ${EX.maison.I.N}. Établissez le tableau des huit pièces, avec sous chaque pièce le Φ de chacune de ses parois, puis la somme de la maison, la part des parois opaques, et rendez la première page de la note de calcul, avec la source de chaque donnée.`,
      pieces: [
        { piece: "Vos feuilles des stations T1, T2, T3, E1, E2 et T6", ou: "Surfaces, murs, baies et plafonds ; U ; b du garage ; θe d’été ; occupants ; heure de pointe" },
        { piece: "Plans de la maison (plans-maison.pdf)", ou: "Pièces, murs et orientations ; tableau des menuiseries à la page 5" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 2 : U des menuiseries. Page 4 : pas de climatisation" },
        { piece: "Apports, éclairage, appareils, températures, I", ou: "Cette commande, données de l’exercice" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-sej", libelle: "Sensible des occupants, de l’éclairage et des appareils du séjour-cuisine", unite: "W", min: 846, max: 900, indice: "Relisez les écrans « Les occupants » et « L’éclairage et les appareils » : occupants × apport sensible, surface × puissance d’éclairage au m², appareils de la commande. Le latent ne s’ajoute pas." },
      { id: "n1-par", libelle: "Apport des parois de la chambre 1 à l’heure de pointe", unite: "W", min: 119, max: 127, indice: "Relisez les écrans « Les parois en été » et « Le mur au soleil » : une ligne par paroi, U × A au centième, puis × l’écart de la ligne. Les murs au soleil prennent l’écart équivalent de leur façade ; le plafond prend l’écart du comble." },
      { id: "n1-ch1", libelle: "Sensible total de la chambre 1 à l’heure de pointe", unite: "W", min: 411, max: 437, indice: "Additionnez le sensible des occupants, l’éclairage, les appareils et les parois de la chambre. Le latent reste à part." }
    ],
    2: [
      { id: "n2-sens", libelle: "Sensible de la maison, somme des huit pièces", unite: "W", min: 2622, max: 2786, indice: "Relisez l’écran « Le tableau d’un local à l’heure de pointe » : une ligne par pièce chauffée, puis la somme. Le latent et le soleil des vitrages (station T6) ne s’ajoutent pas." },
      { id: "n2-lat", libelle: "Latent de la maison, somme des huit pièces", unite: "W", min: 388, max: 412, indice: "Seuls les occupants apportent du latent ici : occupants de chaque pièce × apport latent, puis la somme des pièces." },
      { id: "n2-opq", libelle: "Apport des parois opaques de la maison", unite: "W", min: 708, max: 752, indice: "Parois opaques : murs extérieurs, murs sur le garage, portes pleines et plafonds. Les vitrages ne comptent pas dans cette somme." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-T8", titre: "Été 3 : la synthèse", href: "../t8-ete-air-neuf-synthese/index.html" },
  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-T6, Été 1 : le soleil", href: "../t6-ete-vitrages-soleil/index.html", pourquoi: "L’heure de pointe et le rayonnement par façade que vous reprenez ici viennent de cette station, avec le soleil des vitrages." },
    { reseau: "Bureau d’études", titre: "BE-E2, Les conditions intérieures", href: "../e2-conditions-interieures/index.html", pourquoi: "Les occupants de chaque pièce et la consigne d’été se trouvent à cette station." },
    { reseau: "AéroRézo", titre: "Apport sensible", href: "../../../aerorezo/stations/apport-sensible/index.html", pourquoi: "Vous y voyez ce que la chaleur sensible change dans l’air d’une pièce." },
    { reseau: "AéroRézo", titre: "Apport latent", href: "../../../aerorezo/stations/apport-latent/index.html", pourquoi: "Vous y voyez pourquoi la vapeur d’eau des occupants se compte à part." },
    { reseau: "Bureau d’études", titre: "BE-T8, Été 3 : la synthèse", href: "../t8-ete-air-neuf-synthese/index.html", pourquoi: "Les apports trouvés ici entrent dans la somme du bilan d’été, avec le soleil des vitrages et l’air neuf." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Vous recevez la commande d’un bureau d’études : chiffrer, pièce par pièce, la chaleur que les occupants, l’éclairage, les appareils et les parois apportent un jour d’été, à l’heure de pointe trouvée à la station T6. Les occupants apportent aussi de la vapeur d’eau : cet apport latent s’écrit en watts dans sa propre colonne. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Pièce", "Occupants", "Éclairage", "Appareils", "Parois", "Sensible", "Latent"], [["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["Maison", "", "", "", "", "", ""]], "Le tableau des apports, vide (en W)")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "les apports de chaque pièce à l’heure de pointe."], ["Le dossier :", "vos feuilles des stations T1, T2, T3, E1, E2 et T6, et les données de l’exercice."]] },
          { title: "Vous produisez", rows: [["Le tableau :", "une ligne par pièce, le sensible et le latent séparés."], ["Le résultat :", "les apports de la maison. Fourchette de ± 3 % à l’écran Vérifier."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station T8, l’air neuf et la somme du bilan d’été."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Presque tout vient des stations que vous avez faites. Les occupants de chaque pièce et la consigne d’été de 26 °C sont à la station E2. La température extérieure d’été du site est à la station E1. Les surfaces habitables, les murs nets, les baies et les plafonds de chaque pièce sont à la station T1, les U des parois à la station T2, le coefficient b du garage à la station T3. L’heure de pointe et le rayonnement de chaque façade sont à la station T6. Le bureau d’études fixe le reste dans sa commande : l’apport d’un occupant, la puissance d’éclairage, les appareils et la température du comble. Le coefficient d’absorption du soleil par un mur et la résistance superficielle extérieure viennent des règles Th-Bât. Attention : la page 3 du CCTP donne les températures de calcul d’hiver ; en été, prenez celles des stations E1 et E2.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Occupants de chaque pièce, consigne d’été 26 °C", "Votre feuille de la station E2"],
        ["Température extérieure d’été du site", "Station E1"],
        ["Surfaces, murs nets, baies, plafonds", "Votre feuille de la station T1"],
        ["U des parois ; b du garage", "Stations T2 et T3"],
        ["Heure de pointe, rayonnement I de chaque façade", "Station T6"],
        ["Apport d’un occupant, éclairage, appareils, comble", "La commande, données de l’exercice"],
        ["αp et Rse", "Règles Th-Bât, Parois opaques 2017, page 28"]
      ], "Les données des apports internes")
    }),

    BE.ecran({
      id: "sensible-latent", dossier: "methode", kicker: "La méthode, 1", title: "Sensible et latent", level: "comprendre",
      text: "Un local en été reçoit de la chaleur de plusieurs sources. Les occupants, les lampes et les appareils chauffent l’air. Les murs au soleil et le plafond sous un comble chaud laissent passer de la chaleur. Toute cette chaleur qui élève la température de l’air est la chaleur sensible. Les occupants apportent aussi de la vapeur d’eau, par la respiration et la peau. Cette vapeur ne change pas la température de l’air, elle le rend plus humide : c’est la chaleur latente. Elle s’écrit aussi en watts, mais dans sa propre colonne, parce que l’appareil de climatisation la traite autrement : il doit condenser cette eau. On ne l’ajoute jamais au sensible.",
      prompt: "Suivez chaque flèche du schéma, puis continuez.",
      render: () => BE.schema("illustrations/schema-apports-local.svg", "Schéma de principe d’un local en été. À gauche, le soleil chauffe le mur extérieur, qui rend de la chaleur sensible au local. Au-dessus, un comble chaud ; le plafond rend de la chaleur sensible. Dans le local, une lampe, un occupant et un appareil rendent de la chaleur sensible, en flèches rouges. L’occupant rend aussi de la vapeur d’eau, la chaleur latente, en flèche bleue pointillée. Légende : chaleur sensible, elle chauffe l’air du local ; chaleur latente, la vapeur d’eau des occupants, comptée à part, en watts.", "Rouge : chaleur sensible. Bleu pointillé : chaleur latente, comptée à part.")
    }),

    BE.ecran({
      id: "occupants", dossier: "methode", kicker: "La méthode, 2", title: "Les occupants", level: "comprendre",
      text: "Une personne rend de la chaleur sensible et de la vapeur d’eau. Les deux dépendent de ce qu’elle fait : assise au repos, elle rend peu ; debout au travail, elle rend plus, surtout en vapeur d’eau. Le tableau donne l’apport d’une personne à 26 °C, selon son activité. Pour un local, multipliez le nombre d’occupants par l’apport sensible, puis par l’apport latent. Vous obtenez deux résultats, en watts.",
      prompt: "Lisez le tableau et l’exemple résolu, puis continuez.",
      render: () => tableauActivites() + exempleOcc()
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice à l’écran 1, les occupants", title: "À l’écran : les occupants d’un atelier", level: "appliquer", requiresAction: true,
      text: {
        1: `Un atelier d’exemple reçoit ${EX.ex1.n} personnes debout, au travail léger. Calculez leur apport sensible et leur apport latent avec le tableau des activités. L’exemple résolu reste sous vos yeux : refaites le même geste.`,
        2: `Un atelier d’exemple reçoit ${EX.ex1.n} personnes debout, au travail léger. Calculez leur apport sensible et leur apport latent avec le tableau des activités, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la ligne qui donne le sensible et le latent, en vous aidant de l’exemple.", 2: "Choisissez la ligne qui donne le sensible et le latent. Cette question est à faire seul." },
      aides: {
        1: ["Le nombre de personnes est dans l’énoncé, l’apport d’une personne dans le tableau sous l’énoncé. La méthode est à l’écran « Les occupants ».", "Prenez la ligne « Debout, travail léger ». Nombre × sensible, puis nombre × latent.", `Dans l’exemple : ${REU.n} × ${EX.act[1].S} = ${REU.occS} W et ${REU.n} × ${EX.act[1].L} = ${REU.occL} W. Faites de même avec ${EX.ex1.n} personnes et la ligne « Debout ».`],
        2: ["La méthode est à l’écran « Les occupants ».", "Deux multiplications, deux résultats : ne les additionnez pas.", "Choisissez d’abord la bonne ligne du tableau : les personnes sont debout."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleOcc() + tableauActivites(), EX.ex1.quiz),
        2: avecBloc(tableauActivites(), EX.ex1.quiz)
      })
    }),

    BE.ecran({
      id: "eclairage-appareils", dossier: "methode", kicker: "La méthode, 3", title: "L’éclairage et les appareils", level: "comprendre",
      text: `Toute l’électricité consommée dans un local finit en chaleur dans ce local. L’éclairage se compte avec la puissance au m² : surface × puissance au m², arrondi au watt. Pour l’exercice, l’éclairage à LED vaut ${EX.eclW} W/m² dans les bureaux et 5 W/m² dans un logement. Les appareils se comptent avec la puissance qu’ils consomment en marche : ordinateur, écran, vidéoprojecteur, réfrigérateur, téléviseur. Lampes et appareils ne donnent que du sensible. Le sensible interne d’un local est la somme des occupants, de l’éclairage et des appareils.`,
      prompt: "Lisez l’exemple résolu, puis continuez.",
      render: () => tableau(["Source", "Calcul", "Partie"], [["Occupants", "nombre × apport d’une personne", "sensible et latent"], ["Éclairage", "surface × W/m²", "sensible"], ["Appareils", "puissance en marche", "sensible"]], "Les apports internes d’un local") + exempleEcl()
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice à l’écran 2, éclairage et appareils", title: "À l’écran : un bureau paysager", level: "appliquer", requiresAction: true,
      text: {
        1: `Un bureau paysager d’exemple de ${EX.ex2.surf} m² reçoit ${EX.ex2.n} personnes assises (activité légère) et ${EX.ex2.nApp} ordinateurs de ${EX.ex2.pApp} W. Son éclairage à LED vaut ${EX.ex2.eclW} W/m². Calculez son sensible interne et son latent. L’exemple résolu reste sous vos yeux.`,
        2: `Un bureau paysager d’exemple de ${EX.ex2.surf} m² reçoit ${EX.ex2.n} personnes assises (activité légère) et ${EX.ex2.nApp} ordinateurs de ${EX.ex2.pApp} W. Son éclairage à LED vaut ${EX.ex2.eclW} W/m². Calculez son sensible interne et son latent, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la ligne qui donne le sensible et le latent, en vous aidant de l’exemple.", 2: "Choisissez la ligne qui donne le sensible et le latent. Cette question est à faire seul." },
      aides: {
        1: ["Toutes les données sont dans l’énoncé et le tableau des activités. La méthode est à l’écran « L’éclairage et les appareils ».", "Trois termes de sensible : occupants, éclairage, appareils. Un seul terme de latent : les occupants.", `Dans l’exemple : ${BUR.surf} × ${EX.eclW} = ${BUR.ecl} W d’éclairage. Ici, ${EX.ex2.surf} × ${EX.ex2.eclW}.`],
        2: ["La méthode est à l’écran « L’éclairage et les appareils ».", "Additionnez les trois sources de sensible ; gardez le latent à part.", "C’est un bureau : prenez la puissance d’éclairage des bureaux."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleEcl() + tableauActivites(), EX.ex2.quiz),
        2: avecBloc(tableauActivites(), EX.ex2.quiz)
      })
    }),

    BE.ecran({
      id: "parois-ete", dossier: "methode", kicker: "La méthode, 4", title: "Les parois en été", level: "comprendre",
      text: `En été, la chaleur traverse les parois de dehors vers dedans. Chaque paroi se compte comme en hiver, U × A au centième, mais multiplié par un écart de température qui va du dehors vers le dedans. L’écart dépend de ce qui se trouve derrière la paroi. Une fenêtre ou une porte qui donne dehors, même une porte pleine, prend l’écart de l’air θe − θi : ici ${EX.te} − ${EX.ti} = ${EX.dT} K. Le soleil qui traverse les vitres est compté à la station T6 : il ne se recompte pas ici. Une paroi qui donne sur un local non chauffé, mur, porte ou fenêtre, prend b × (θe − θi), avec le b de la station T3 : ${EX.bLT} × ${EX.dT} = ${EX.ecLT} K pour le mur MC et la porte Pn du local technique. Pour un plafond sous un comble, l’écart vaut la température du comble moins θi : le comble chauffé par la toiture monte ici à ${EX.comble} °C, soit ${EX.ecC} K. Le plancher sur terre-plein ne se compte pas : en été, le sol reste plus frais que la pièce. Les écarts s’écrivent au dixième de K, en arrondissant un 5 vers le haut (2,45 donne 2,5), et Φ au watt. Les murs extérieurs prennent l’écart équivalent de leur façade, qui ajoute le soleil : écran suivant.`,
      prompt: "Suivez une ligne du tableau, puis continuez.",
      render: () => tableauParois(BUR, `Bureau d’exemple : les parois à ${EX.h} h solaires`)
        + BE.renvoi(`Les murs MA et MB prennent l’écart équivalent de leur façade, ${EX.mur.N} K au nord et ${EX.mur.E} K à l’est : écran suivant.`)
    }),

    BE.ecran({
      id: "mur-soleil", dossier: "methode", kicker: "La méthode, 5", title: "Le mur au soleil", level: "comprendre",
      text: `Un mur au soleil absorbe une partie du rayonnement et s’échauffe en surface. Il laisse alors entrer plus de chaleur que l’air seul ne l’explique. Les règles Th-Bât donnent son facteur solaire : Sp = αp × U × Rse (fascicule Parois opaques, formule 40, page 28). αp est la part du rayonnement que le mur absorbe : elle dépend de sa teinte. Rse est la résistance superficielle extérieure : elle dit combien la face extérieure du mur échange mal avec l’air et le ciel. Plus elle est grande, plus la chaleur absorbée reste dans le mur et passe dedans. Elle vaut ${EX.rse} m².K/W pour le calcul d’été et du refroidissement (tableau XV, page 28). L’apport du mur, U × A × (θe − θi) + A × Sp × I, s’écrit plus simplement U × A × écart équivalent, avec écart équivalent = θe − θi + αp × Rse × I, au dixième de K. I est le rayonnement de la façade à l’heure de pointe, lu dans le tableau de la station T6. Seuls les murs extérieurs prennent cet écart équivalent : les fenêtres et les portes, même pleines, gardent θe − θi. En été, les règles ajoutent aussi 0,03 m².K/W à 1 ÷ U (formule 41) : c’est 0,07 − 0,04, le passage de Rse d’hiver à Rse d’été, et cela ne touche que les parois opaques dont une face est dehors. Par exemple 1 ÷ (1 ÷ 0,34 + 0,03) = 0,337, soit encore 0,34 au centième. Les fenêtres et les portes gardent le U du CCTP, une paroi sur un local non chauffé garde le sien. Pour les murs et les plafonds de cette station, U au centième ne change pas : gardez les U de la station T2.`,
      prompt: "Lisez le schéma, le tableau des teintes et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/schema-mur-soleil.svg", `Schéma de principe. Le soleil envoie un rayonnement I sur un mur extérieur. Dehors, θe ; dedans, θi. Le mur absorbe αp × I et en rend une partie dedans. En dessous, trois cases : θe − θi, l’écart de l’air, plus αp × Rse × I, la part du soleil, égale l’écart équivalent. Exemple : mur ouest à ${EX.h} h, ${EX.dT} + ${EX.soleil.O} = ${EX.mur.O} K.`, "L’écart de l’air plus la part du soleil donne l’écart équivalent.")
        + tableau(["Teinte", "Couleurs", "αp"], EX.alpha.map(x => [x.cat, x.couleurs, x.a]), "Coefficient d’absorption solaire par défaut, règles Th-Bât, Parois opaques, tableau XIV, page 28")
        + tableauEcarts() + exempleMur()
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice à l’écran 3, le mur au soleil", title: "À l’écran : un mur ouest de teinte moyenne", level: "appliquer", requiresAction: true,
      text: {
        1: `Un mur ouest d’exemple de ${EX.ex3.A} m², U = ${EX.ex3.U}, de teinte moyenne, reçoit I = ${EX.ex3.I} W/m² à ${EX.h} h solaires. θe = ${EX.te} °C, θi = ${EX.ti} °C, Rse = ${EX.rse}. Calculez son écart équivalent et son apport. L’exemple résolu reste sous vos yeux.`,
        2: `Un mur ouest d’exemple de ${EX.ex3.A} m², U = ${EX.ex3.U}, de teinte moyenne, reçoit I = ${EX.ex3.I} W/m² à ${EX.h} h solaires. θe = ${EX.te} °C, θi = ${EX.ti} °C, Rse = ${EX.rse}. Calculez son écart équivalent et son apport, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la ligne qui donne l’écart équivalent et Φ, en vous aidant de l’exemple.", 2: "Choisissez la ligne qui donne l’écart équivalent et Φ. Cette question est à faire seul." },
      aides: {
        1: ["αp se lit dans le tableau des teintes, le reste est dans l’énoncé. La méthode est à l’écran « Le mur au soleil ».", "Part du soleil : αp × Rse × I, au dixième. Écart équivalent : θe − θi + part du soleil. Puis U × A × écart.", `Dans l’exemple : ${EX.dT} + ${EX.a} × ${EX.rse} × ${EX.I.O} = ${EX.mur.O} K. Ici, U × A = ${EX.ex3.U} × ${EX.ex3.A}.`],
        2: ["La méthode est à l’écran « Le mur au soleil ».", "Trois lignes : la part du soleil, l’écart équivalent, puis Φ.", "Teinte moyenne : relisez sa ligne dans le tableau des teintes."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleMur() + tableau(["Teinte", "αp"], EX.alpha.map(x => [x.cat, x.a]), "αp par défaut, Th-Bât"), EX.ex3.quiz),
        2: avecBloc(tableau(["Teinte", "αp"], EX.alpha.map(x => [x.cat, x.a]), "αp par défaut, Th-Bât"), EX.ex3.quiz)
      })
    }),

    BE.ecran({
      id: "tableau-local", dossier: "methode", kicker: "La méthode, 6", title: "Le tableau d’un local à l’heure de pointe", level: "comprendre",
      text: `Pour chaque local, une ligne : occupants, éclairage, appareils et parois en sensible, puis le latent dans sa colonne. Tout se calcule à la même heure, l’heure de pointe du bâtiment trouvée à la station T6 : ${EX.h} h solaires pour le bâtiment d’exemple. Chaque local est compté plein : tous ses occupants, son éclairage et ses appareils. Le tableau montre les trois locaux de l’exemple. Les parois opaques, c’est-à-dire tout sauf les fenêtres et les portes-fenêtres, y pèsent ${EX.tot.opaques} W. Leur part dans le sensible se calcule ainsi : parois opaques ÷ sensible × 100, au pour cent : ${EX.tot.opaques} ÷ ${EX.tot.sens} × 100 = ${EX.tot.partOpq} %.`,
      prompt: "Suivez la ligne de la salle de réunion, puis continuez.",
      render: () => tableauLocaux()
        + tableauParois(REU, `Salle de réunion d’exemple : les parois à ${EX.h} h solaires`)
        + BE.alerte(`<strong>Piège.</strong> La colonne du latent (${EX.tot.lat} W) ne s’ajoute pas au sensible (${EX.tot.sens} W).`)
    }),

    BE.ecran({
      id: "ce-qui-ne-compte-pas", dossier: "methode", kicker: "La méthode, 7", title: "Ce qui ne compte pas à cette station", level: "comprendre",
      text: "Cette station compte les occupants, l’éclairage, les appareils et les parois, local par local. Le soleil qui traverse les vitrages est à la station T6 : les fenêtres ne prennent ici que l’écart de l’air. L’air neuf apporte aussi du sensible et du latent : il se compte à la station T8, qui fait la somme du bilan d’été. Chaque local est compté plein. Les occupants d’une maison ne sont pas tous dans chaque pièce au même moment : la station T8 dit ce qui arrive en même temps.",
      prompt: "Lisez les deux cartes, puis continuez.",
      render: () => BE.cartes([
        { title: "Compte à cette station", rows: [["Occupants :", "sensible et latent."], ["Éclairage et appareils :", "sensible."], ["Parois :", "murs, portes, plafonds, et les vitrages par l’écart de l’air."]] },
        { title: "Compte ailleurs", rows: [["Le soleil à travers les vitrages :", "station T6."], ["L’air neuf :", "station T8."], ["Ce qui arrive en même temps dans tout le bâtiment :", "station T8."], ["Le plancher sur terre-plein :", "il ne se compte pas en été."]] }
      ])
    }),

    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 8", title: "Ce que la note de calcul doit dire", level: "comprendre",
      text: "La note de calcul dit l’heure calculée, les températures, d’où viennent l’apport d’un occupant, la puissance d’éclairage, les appareils, αp et Rse, et elle donne le sensible et le latent séparés. Un autre technicien doit pouvoir refaire le calcul. Voici la note du bâtiment d’exemple.",
      prompt: "Lisez la note d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Note de calcul du bâtiment d’exemple"], [
        ["Objet", "Apports internes et apports par les parois en été, petit bâtiment de bureaux de plain-pied, trois locaux"],
        ["Données d’entrée", `Surfaces et U : stations T1 à T3 ; heure de pointe ${EX.h} h solaires et I : station T6 ; αp et Rse : Th-Bât, Parois opaques, p. 28`],
        ["Hypothèses", `θe ${EX.te} °C, θi ${EX.ti} °C, comble ${EX.comble} °C ; ${EX.act[1].S} W et ${EX.act[1].L} W par occupant ; éclairage ${EX.eclW} W/m² ; locaux comptés pleins (données de l’exercice)`],
        ["Méthode", "Occupants n × apport ; éclairage surface × W/m² ; parois U × A × écart, écart équivalent des murs au soleil"],
        ["Résultats", `Sensible ${EX.tot.sens} W, latent ${EX.tot.lat} W ; salle de réunion ${REU.sens} W et ${REU.lat} W`]
      ], "Note de calcul, bâtiment d’exemple")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});
