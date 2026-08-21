# -*- coding: utf-8 -*-
"""Fabrique des narrations avec edge-tts et les fusionne dans moteur/voix-index.js.

Même contrat que generer-audios-piper.py : mêmes clés (corpus.json), même
fonction oraliser() pour la prononciation métier, même dossier de sortie
(packs/fluides/res/voix/audio). Seul le maillon de synthèse change, et deux
voix sont affectées par RÔLE au lieu d'une seule :

- la voix qui EXPLIQUE  : narrations, fiches, compositions, étapes guidées ;
- la voix qui INTERROGE : questions, corrections, phrases d'interface.

⚠️ CE SCRIPT ENVOIE LE TEXTE DES NARRATIONS À MICROSOFT — c'est là que se
fait la synthèse edge-tts. Ce sont des textes de cours, sans donnée
nominative, mais la règle reste : ne le lancer qu'avec un feu vert explicite
de F. Henninot, station par station. Rien ne part tant que --confirmer
n'est pas passé. Aucun appel réseau n'a lieu ensuite, en séance ou chez le
stagiaire : les MP3 produits sont statiques.

La fusion dans l'index ne touche QUE les entrées des stations demandées ;
les entrées Piper des autres stations restent intactes, y compris leurs
champs "voix"/"moteur" au niveau racine du fichier.
"""
import argparse
import hashlib
import io
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.abspath(os.path.join(ICI, "..", ".."))
CORPUS_DEFAUT = os.path.join(ICI, "corpus.json")
AUDIO_DEFAUT = os.path.join(RACINE, "packs", "fluides", "res", "voix", "audio")
INDEX_DEFAUT = os.path.join(RACINE, "moteur", "voix-index.js")

# types portant une explication suivie (phrases longues) — le reste (choix,
# feedback, interface) va à la voix qui interroge et corrige.
LONGUES = {"fiche", "capture", "composition", "speak", "voiceStep",
           "narration", "data-narration", "s", "frise", "dynamique"}


def oraliser(text):
    """Reprise mot pour mot de generer-audios-piper.py — même prononciation
    métier des deux côtés du lot mixte."""
    replacements = (
        (r"\bF[\s‑-]?Gas\b", "F gaz"),
        (r"\bkg\s*CO[₂2][eé]q?\b", "kilogrammes équivalent dioxyde de carbone"),
        (r"\bCO[₂2][eé]q?\b", "équivalent dioxyde de carbone"),
        (r"\bCO[₂2]\b", "dioxyde de carbone"),
        (r"\bNH[₃3]\b", "ammoniac"),
        (r"\bA[\s‑-]?1\b", "A un"),
        (r"\bA[\s‑-]?2[\s‑-]?L\b", "A deux L"),
        (r"\bA[\s‑-]?2\b", "A deux"),
        (r"\bA[\s‑-]?3\b", "A trois"),
        (r"\bB[\s‑-]?1\b", "B un"),
        (r"\bB[\s‑-]?2[\s‑-]?L\b", "B deux L"),
        (r"\bB[\s‑-]?2\b", "B deux"),
        (r"\bB[\s‑-]?3\b", "B trois"),
        (r"\bHP\b", "haute pression"),
        (r"\bBP\b", "basse pression"),
        (r"\bPRP\b", "potentiel de réchauffement planétaire"),
        (r"\bGWP\b", "potentiel de réchauffement planétaire"),
        (r"\bEPI\b", "équipements de protection individuelle"),
        (r"\bQCM\b", "Q C M"),
        (r"\bR[\s‑-]?(\d+[A-Za-z]*)\b", r"R \1"),
        (r"°\s*C\b", " degrés Celsius"),
        (r"\bkWh\b", "kilowattheures"),
        (r"\bkW\b", "kilowatts"),
        (r"\bkg\b", "kilogrammes"),
        (r"\bW\b", "watts"),
        (r"%", " pour cent"),
        (r"→", " vers "),
        (r"↔", " en relation avec "),
    )
    result = text
    for pattern, value in replacements:
        drapeau = re.IGNORECASE if "Gas" in pattern else 0
        result = re.sub(pattern, value, result, flags=drapeau)
    return re.sub(r"\s+", " ", result).strip()


def module_de(source):
    txt = str(source).replace("\\", "/")
    m = re.search(r"res/([^/]+)/", txt)
    return m.group(1) if m else ""


def dire(texte, voix, cible, debit):
    """Un appel edge-tts. Retourne True si le MP3 est écrit."""
    fd, tmp = tempfile.mkstemp(suffix=".txt")
    os.close(fd)
    try:
        with io.open(tmp, "w", encoding="utf-8") as f:
            f.write(texte)
        commande = [sys.executable, "-m", "edge_tts", "--voice", voix,
                    "--file", tmp, "--write-media", cible]
        if debit:
            commande += ["--rate", debit]
        subprocess.run(commande, check=True, stdout=subprocess.DEVNULL,
                       stderr=subprocess.DEVNULL, timeout=90)
        return os.path.exists(cible) and os.path.getsize(cible) > 500
    except Exception:
        return False
    finally:
        try:
            os.unlink(tmp)
        except OSError:
            pass


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--modules", required=True,
                    help="dossiers de station à couvrir, séparés par des virgules")
    ap.add_argument("--corpus", default=CORPUS_DEFAUT)
    ap.add_argument("--audio", default=AUDIO_DEFAUT,
                    help="dossier des MP3 du pack (par défaut : le fonds central)")
    ap.add_argument("--index", default=INDEX_DEFAUT)
    ap.add_argument("--voix-explique", default="fr-FR-RemyMultilingualNeural")
    ap.add_argument("--voix-interroge", default="fr-FR-VivienneMultilingualNeural")
    ap.add_argument("--debit", default="-4%",
                    help="réglage de vitesse edge-tts, ex. -4%% pour ralentir un peu")
    ap.add_argument("--confirmer", action="store_true",
                    help="obligatoire : sans cette option, rien n'est envoyé à Microsoft")
    ap.add_argument("--force", action="store_true",
                    help="refabrique même une clé déjà en edge-tts avec la bonne voix")
    args = ap.parse_args()

    if not args.confirmer:
        raise SystemExit(
            "Rien n'a été fait. Ce script envoie le texte des narrations à Microsoft "
            "(edge-tts) : relancer avec --confirmer une fois le feu vert donné."
        )

    modules = [m.strip() for m in args.modules.split(",") if m.strip()]
    os.makedirs(args.audio, exist_ok=True)

    with io.open(args.corpus, encoding="utf-8") as f:
        narrations = json.load(f)["narrations"]

    retenues = []
    for it in narrations:
        for s in (it.get("sources") or []):
            if module_de(s) in modules:
                retenues.append(it)
                break

    print("%d narrations à fabriquer pour : %s" % (len(retenues), ", ".join(modules)))
    print("  explique  : %s" % args.voix_explique)
    print("  interroge : %s" % args.voix_interroge)
    print("  débit     : %s" % args.debit)
    print("")

    # index chargé AVANT la fabrication : une clé qui porte déjà un fichier
    # Piper (pas d'attribut "voix") doit être refabriquée, sinon l'index la
    # marquerait edge-tts en gardant l'ancien audio Piper — mélange silencieux.
    with io.open(args.index, encoding="utf-8") as f:
        brut = f.read()
    m = re.search(r"window\.PILOTE_VOIX_INDEX\s*=\s*(\{.*\});\s*$", brut, re.S)
    if not m:
        raise SystemExit("format d'index inattendu dans %s" % args.index)
    payload = json.loads(m.group(1))

    entrees_lot = {}
    faits = rates = 0
    for position, it in enumerate(retenues, 1):
        cle = it["cle"]
        role = "explique" if it.get("type") in LONGUES else "interroge"
        voix = args.voix_explique if role == "explique" else args.voix_interroge
        cible = os.path.join(args.audio, cle + ".mp3")
        deja_bonne_voix = payload["entrees"].get(cle, {}).get("voix") == voix
        pret = os.path.exists(cible) and os.path.getsize(cible) > 500
        if args.force or not (deja_bonne_voix and pret):
            texte = oraliser(it.get("texte", ""))
            if not texte:
                continue
            if not dire(texte, voix, cible, args.debit):
                rates += 1
                print("  RATÉ %s" % cle)
                continue
        faits += 1
        with open(cible, "rb") as f:
            donnees = f.read()
        entrees_lot[cle] = {
            "fichier": "audio/%s.mp3" % cle,
            "sha256": hashlib.sha256(donnees).hexdigest()[:16],
            "octets": len(donnees),
            "voix": voix,
        }
        if position % 25 == 0:
            print("  %d / %d" % (position, len(retenues)))

    # fusion : seules les entrées du lot sont touchées, le reste de l'index
    # (Piper et lots edge-tts precedents) reste inchange.
    payload["entrees"].update(entrees_lot)

    edge = payload.setdefault("moteurEdgeTts", {
        "note": "lot mixte : les entrées sans attribut \"voix\" restent Piper "
                "fr_FR-siwis-medium ; celles qui portent \"voix\" sont fabriquées "
                "avec edge-tts (Microsoft Neural), fabrication locale en atelier, "
                "aucun appel réseau en séance",
        "voixExplique": args.voix_explique,
        "voixInterroge": args.voix_interroge,
        "debit": args.debit,
        "modulesCouverts": [],
    })
    for mod in modules:
        if mod not in edge["modulesCouverts"]:
            edge["modulesCouverts"].append(mod)

    with io.open(args.index, "w", encoding="utf-8") as f:
        f.write(
            "/* Fichier généré — voir generer-audios-piper.py pour le fonds "
            "Piper et generer-audios-edge-tts.py pour le lot Microsoft Neural. */\n"
            "window.PILOTE_VOIX_INDEX = %s;\n"
            % json.dumps(payload, ensure_ascii=False, indent=2)
        )

    poids = sum(v["octets"] for v in entrees_lot.values())
    print("")
    print("fabriquées : %d · ratées : %d · %.1f Mio" % (faits, rates, poids / 1048576))
    print("index mis à jour : %s (%d entrées au total)" % (args.index, len(payload["entrees"])))


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
