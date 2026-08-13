/* =====================================================================
   CAPSULE — moteur unique des capsules narrées.
   ---------------------------------------------------------------------
   CONTRAT : script classique (pas un module ES : les capsules doivent
   s'ouvrir aussi en file://, où les modules sont bloqués). Il lit
   `?c=<id>` dans l'adresse, injecte `donnees/<id>.js`, et ce fichier
   appelle `CAPSULE.declarer({...})`. Le moteur ne connaît AUCUN contenu.

   Ce qu'il fournit à toutes les capsules d'un coup :
     · narration `speechSynthesis` (voix de la machine, jamais de fichier
       son à télécharger) avec quatre vitesses mémorisées ;
     · écrans avec visuel animé (ANIM), texte, points à retenir, piège ;
     · contrôle de compréhension à correction expliquée ;
     · progression mémorisée (localStorage) et lien profond `&e=<n>` ;
     · mode PROJECTION pour la salle, et livret imprimable à plat.

   ADRESSES : index.html?c=g0 · &e=3 (écran 3) · &mode=projection
   PIÈGES : `speechSynthesis.cancel()` avant chaque prise de parole,
   sinon Chrome empile les phrases ; le SVG est réinjecté à chaque
   affichage pour que l'animation reparte du début.
   ===================================================================== */
"use strict";

const CAPSULE = (() => {
  const $ = (s, r = document) => r.querySelector(s);
  const params = new URLSearchParams(location.search);

  const VITESSES = [0.8, 0.95, 1.1, 1.25];
  const CLE_VITESSE = "capsule_vitesse";
  const CLE_PROJECTION = "capsule_projection";

  let data = null;
  let ecrans = [];
  let index = 0;
  let vus = new Set();
  let parle = false;
  let suivi = false;          // lecture d'affilée
  let tour = 0;               // invalide les prises de parole périmées
  let iVitesse = 1;
  let minuteurMessage = 0;

  /* ------------------------------------------------------------ utilitaires */
  const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function sansBalises(html) {
    const d = document.createElement("div");
    d.innerHTML = html || "";
    return (d.textContent || "").replace(/\s+/g, " ").trim();
  }

  function litReglage(cle, defaut) {
    try { const v = localStorage.getItem(cle); return v == null ? defaut : v; } catch (_) { return defaut; }
  }
  function ecritReglage(cle, valeur) {
    try { localStorage.setItem(cle, valeur); } catch (_) { /* navigation privée */ }
  }

  function message(texte) {
    clearTimeout(minuteurMessage);
    $("#message").textContent = texte || "";
    if (texte) minuteurMessage = setTimeout(() => { $("#message").textContent = ""; }, 3200);
  }

  /* ------------------------------------------------------------ narration */
  function voixFrancaise() {
    const voix = window.speechSynthesis ? speechSynthesis.getVoices() : [];
    return voix.find((v) => /fr[-_]FR/i.test(v.lang)) || voix.find((v) => /^fr/i.test(v.lang)) || null;
  }

  function taire() {
    tour += 1;
    parle = false;
    suivi = false;
    if (window.speechSynthesis) speechSynthesis.cancel();
    majBoutonsVoix();
  }

  function majBoutonsVoix() {
    const b = $("#btn-ecouter");
    b.classList.toggle("parle", parle);
    b.querySelector(".etiquette").textContent = parle ? "En cours" : "Écouter";
    b.firstElementChild.textContent = parle ? "❙❙" : "▶";
    $("#btn-stop").disabled = !parle;
  }

  function dire(texte, alorsQue) {
    if (!window.speechSynthesis || !texte) { if (alorsQue) alorsQue(); return; }
    speechSynthesis.cancel();
    const mien = ++tour;
    const u = new SpeechSynthesisUtterance(texte);
    const v = voixFrancaise();
    if (v) u.voice = v;
    u.lang = "fr-FR";
    u.rate = VITESSES[iVitesse];
    u.pitch = 1;
    u.onend = () => {
      if (mien !== tour) return;
      parle = false;
      majBoutonsVoix();
      if (alorsQue) alorsQue();
    };
    u.onerror = () => { if (mien === tour) { parle = false; majBoutonsVoix(); } };
    parle = true;
    majBoutonsVoix();
    speechSynthesis.speak(u);
  }

  function texteADire(e) {
    if (e.dire) return e.dire;
    const morceaux = [e.titre, sansBalises(e.texte)];
    if (e.retenir && e.retenir.length) morceaux.push("À retenir. " + e.retenir.join(". "));
    if (e.piege) morceaux.push("Attention. " + sansBalises(e.piege));
    return morceaux.filter(Boolean).join(". ");
  }

  function lireEcranCourant() {
    dire(texteADire(ecrans[index]), () => {
      if (!suivi) return;
      if (index < ecrans.length - 1) { aller(index + 1); setTimeout(lireEcranCourant, 350); }
      else { suivi = false; terminer(); }
    });
  }

  /* ------------------------------------------------------------ visuels */
  function htmlVisuel(v) {
    if (!v) return "";
    if (v.motif) return window.ANIM ? ANIM.rendre(v) : "";
    if (v.svg) return `<img src="../svg/${esc(v.svg)}" alt="${esc(v.alt || "Schéma du chapitre.")}">`;
    if (v.img) return `<img src="${esc(v.img)}" alt="${esc(v.alt || "Illustration du chapitre.")}">`;
    return "";
  }

  function poseVisuel(cible, v, legende) {
    cible.innerHTML = htmlVisuel(v) + (legende ? `<figcaption>${esc(legende)}</figcaption>` : "");
  }

  /* ------------------------------------------------------------ rendu */
  function rendreAccueil() {
    document.title = data.titre + " | Capsule narrée";
    $("#pack-titre").textContent = data.surtitre || "Habilitation fluides · capsule narrée";
    $("#accueil-surtitre").textContent = data.surtitre || "HABILITATION FLUIDES";
    $("#accueil-titre").textContent = data.titre;
    $("#accueil-intro").innerHTML = data.intro || "";
    $("#accueil-compte").textContent =
      `${ecrans.length} écran${ecrans.length > 1 ? "s" : ""} · ${data.duree || "quelques minutes"} · voix de la machine, réglable`;
    $("#accueil-codes").innerHTML = (data.codes || [])
      .map((c) => `<li><b>${esc(c.code)}</b> · ${esc(c.libelle)}</li>`).join("");
    poseVisuel($("#accueil-visuel"), data.visuelAccueil || (ecrans[0] && ecrans[0].visuel));
    if (data.fiche) {
      const url = `../../../../index.html#${encodeURIComponent(data.fiche)}`;
      $("#btn-retour").href = url;
      $("#btn-fiche").href = url;
    }
  }

  function rendreRail() {
    $("#rail-points").innerHTML = ecrans.map((e, i) =>
      `<li class="${i === index ? "actif" : ""} ${vus.has(e.id) ? "vu" : ""}">
         <button type="button" data-i="${i}">${i + 1}. ${esc(e.titre)}</button>
       </li>`).join("");
    $("#rail-points").querySelectorAll("button").forEach((b) =>
      b.addEventListener("click", () => aller(Number(b.dataset.i))));
    $("#rail-compte").textContent = `${index + 1} / ${ecrans.length}`;
    $("#rail-barre").style.width = `${((index + 1) / ecrans.length) * 100}%`;
    $("#rail-note").textContent = ecrans[index].note || (index === 0 ? "Début de la capsule" : "");
  }

  function rendreControle(e) {
    const zone = $("#controle");
    if (!e.controle) { zone.hidden = true; zone.innerHTML = ""; return; }
    const q = e.controle;
    zone.hidden = false;
    zone.innerHTML =
      `<p class="enonce">${esc(q.enonce)}</p>
       <div class="choix">${q.choix.map((c, i) => `<button type="button" data-i="${i}">${esc(c)}</button>`).join("")}</div>
       <div class="verdict" hidden></div>`;
    const verdict = zone.querySelector(".verdict");
    zone.querySelectorAll(".choix button").forEach((b) => b.addEventListener("click", () => {
      const i = Number(b.dataset.i);
      const juste = i === q.bonne;
      zone.querySelectorAll(".choix button").forEach((autre, j) => {
        autre.disabled = true;
        if (j === q.bonne) autre.classList.add("juste");
        else if (j === i) autre.classList.add("faux");
      });
      verdict.hidden = false;
      verdict.innerHTML = (juste ? "<b>C'est juste.</b> " : "<b>Pas tout à fait.</b> ") + (q.explication || "");
      message(juste ? "Bonne réponse." : "Relisez l'explication, puis continuez.");
      if (!parle) dire((juste ? "C'est juste. " : "Pas tout à fait. ") + sansBalises(q.explication));
    }));
  }

  function rendreEcran() {
    const e = ecrans[index];
    vus.add(e.id);
    $("#ecran-surtitre").textContent = e.surtitre || data.surtitre || "";
    $("#ecran-titre").textContent = e.titre;
    $("#ecran-texte").innerHTML = e.texte || "";
    poseVisuel($("#visuel"), e.visuel, e.legende);

    const bloc = $("#ecran-retenir");
    const morceaux = [];
    if (e.retenir && e.retenir.length) {
      morceaux.push(`<span class="t">À retenir</span><ul>${e.retenir.map((r) => `<li>${r}</li>`).join("")}</ul>`);
    }
    bloc.innerHTML = morceaux.join("");
    bloc.hidden = morceaux.length === 0;

    const ancienPiege = $(".alerte-piege", $("#ecran-texte").parentElement);
    if (ancienPiege) ancienPiege.remove();
    if (e.piege) {
      const p = document.createElement("aside");
      p.className = "alerte-piege";
      p.innerHTML = `<span class="t">⚠ L'erreur classique</span>${e.piege}`;
      bloc.insertAdjacentElement("afterend", p);
    }

    rendreControle(e);
    $("#ecran-reference").textContent = e.reference || "";
    $("#btn-precedent").disabled = index === 0;
    $("#btn-suivant").textContent = index === ecrans.length - 1 ? "Terminer ✓" : "Suivant →";
    rendreRail();

    const url = new URL(location.href);
    url.searchParams.set("e", String(index + 1));
    history.replaceState(null, "", url);
    ecritReglage("capsule_pos_" + data.id, String(index));
  }

  function aller(i) {
    if (i < 0 || i >= ecrans.length) return;
    if (!suivi) taire();
    index = i;
    rendreEcran();
    $("#ecran-titre").focus();
  }

  function commencer(avecVoix) {
    $("#accueil").hidden = true;
    $("#fin").hidden = true;
    $("#parcours").hidden = false;
    rendreEcran();
    if (avecVoix) { suivi = true; lireEcranCourant(); }
  }

  function terminer() {
    taire();
    $("#parcours").hidden = true;
    $("#fin").hidden = false;
    const points = ecrans.flatMap((e) => e.retenir || []);
    $("#fin-bilan").innerHTML =
      `<p>${esc(data.titre)} — ${ecrans.length} écrans parcourus.</p>` +
      (points.length ? `<p><b>Ce qu'il faut retenir de toute la capsule :</b></p><ul>${points.map((p) => `<li>${p}</li>`).join("")}</ul>` : "") +
      (data.motFin ? `<p>${data.motFin}</p>` : "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ------------------------------------------------------------ livret imprimé */
  function rendreLivret() {
    const bloc = (e, i) =>
      `<section>
         <h2>${i + 1}. ${esc(e.titre)}</h2>
         <div class="duo">
           <div>${htmlVisuel(e.visuel)}</div>
           <div>${e.texte || ""}
             ${e.retenir && e.retenir.length ? `<div class="retenir"><b>À retenir</b><ul>${e.retenir.map((r) => `<li>${r}</li>`).join("")}</ul></div>` : ""}
             ${e.piege ? `<p><b>⚠ L'erreur classique :</b> ${sansBalises(e.piege)}</p>` : ""}
           </div>
         </div>
       </section>`;
    $("#livret").innerHTML =
      `<h1>${esc(data.titre)}</h1>
       <p class="sous">${esc(data.surtitre || "")} — capsule narrée, version papier. ${esc(data.duree || "")}</p>` +
      ecrans.map(bloc).join("");
  }

  /* ------------------------------------------------------------ commandes */
  function majVitesse() {
    $("#vitesse-valeur").textContent = String(VITESSES[iVitesse]).replace(".", ",") + "×";
    ecritReglage(CLE_VITESSE, String(iVitesse));
  }

  function basculeProjection(force) {
    const actif = force == null ? !document.body.classList.contains("projection") : force;
    document.body.classList.toggle("projection", actif);
    $("#btn-projection").setAttribute("aria-pressed", String(actif));
    ecritReglage(CLE_PROJECTION, actif ? "1" : "0");
  }

  function brancher() {
    $("#btn-commencer").addEventListener("click", () => commencer(false));
    $("#btn-suivi").addEventListener("click", () => commencer(true));
    $("#btn-precedent").addEventListener("click", () => aller(index - 1));
    $("#btn-suivant").addEventListener("click", () => {
      if (index === ecrans.length - 1) terminer(); else aller(index + 1);
    });
    $("#btn-recommencer").addEventListener("click", () => { index = 0; commencer(false); });
    $("#btn-ecouter").addEventListener("click", () => {
      if (parle) { taire(); return; }
      suivi = false;
      lireEcranCourant();
    });
    $("#btn-stop").addEventListener("click", taire);
    $("#btn-rejouer").addEventListener("click", () => {
      poseVisuel($("#visuel"), ecrans[index].visuel, ecrans[index].legende);
      message("Animation rejouée.");
    });
    $("#btn-lent").addEventListener("click", () => { iVitesse = Math.max(0, iVitesse - 1); majVitesse(); if (parle) lireEcranCourant(); });
    $("#btn-vite").addEventListener("click", () => { iVitesse = Math.min(VITESSES.length - 1, iVitesse + 1); majVitesse(); if (parle) lireEcranCourant(); });
    $("#btn-projection").addEventListener("click", () => basculeProjection());
    $("#btn-imprimer").addEventListener("click", () => { taire(); window.print(); });

    document.addEventListener("keydown", (ev) => {
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(ev.target.tagName)) return;
      if ($("#parcours").hidden) return;
      if (ev.key === "ArrowRight") { ev.preventDefault(); index === ecrans.length - 1 ? terminer() : aller(index + 1); }
      else if (ev.key === "ArrowLeft") { ev.preventDefault(); aller(index - 1); }
      else if (ev.key === " ") { ev.preventDefault(); parle ? taire() : (suivi = false, lireEcranCourant()); }
      else if (ev.key.toLowerCase() === "p") basculeProjection();
    });

    window.addEventListener("beforeunload", () => { if (window.speechSynthesis) speechSynthesis.cancel(); });
    if (window.speechSynthesis) speechSynthesis.onvoiceschanged = () => { /* réveille la liste des voix */ };
  }

  /* ------------------------------------------------------------ démarrage */
  function declarer(capsule) {
    data = capsule;
    ecrans = capsule.ecrans || [];
    if (!ecrans.length) { $("#accueil-intro").textContent = "Cette capsule n'a pas encore d'écran."; return; }

    iVitesse = Number(litReglage(CLE_VITESSE, "1"));
    if (!(iVitesse >= 0 && iVitesse < VITESSES.length)) iVitesse = 1;
    majVitesse();
    if (litReglage(CLE_PROJECTION, "0") === "1" || params.get("mode") === "projection") basculeProjection(true);

    rendreAccueil();
    rendreLivret();
    brancher();

    const e = Number(params.get("e"));
    if (e >= 1 && e <= ecrans.length) { index = e - 1; commencer(false); }
  }

  function amorcer() {
    const id = (params.get("c") || "").replace(/[^a-z0-9-]/gi, "");
    if (!id) {
      $("#accueil-titre").textContent = "Aucune capsule demandée";
      $("#accueil-intro").innerHTML = "Cette page s'ouvre depuis une fiche du pack : elle attend une adresse du type <code>index.html?c=g0</code>.";
      return;
    }
    const s = document.createElement("script");
    s.src = "donnees/" + id + ".js?v=20260813-1";
    s.onerror = () => {
      $("#accueil-titre").textContent = "Capsule introuvable";
      $("#accueil-intro").textContent = `Le fichier donnees/${id}.js n'a pas été trouvé.`;
    };
    document.head.appendChild(s);
  }

  document.addEventListener("DOMContentLoaded", amorcer);
  return { declarer };
})();

if (typeof window !== "undefined") window.CAPSULE = CAPSULE;
