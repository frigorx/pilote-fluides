# SPDX-License-Identifier: GPL-3.0-or-later
from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path

import lameenc
import numpy as np
from piper import PiperVoice, SynthesisConfig


def oraliser(text: str) -> str:
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
        result = re.sub(pattern, value, result, flags=re.IGNORECASE if "Gas" in pattern else 0)
    return re.sub(r"\s+", " ", result).strip()


def decouper_pour_voix(text: str, max_chars: int) -> list[str]:
    phrases = re.split(r"(?<=[.!?;:])\s+", text)
    unites: list[str] = []
    for phrase in phrases:
        sous_partie = ""
        for mot in phrase.strip().split():
            candidat = f"{sous_partie} {mot}".strip()
            if sous_partie and len(candidat) > max_chars:
                unites.append(sous_partie)
                sous_partie = mot
            else:
                sous_partie = candidat
        if sous_partie:
            unites.append(sous_partie)

    morceaux: list[str] = []
    courant = ""
    for unite in unites:
        candidat = f"{courant} {unite}".strip()
        if courant and len(candidat) > max_chars:
            morceaux.append(courant)
            courant = unite
        else:
            courant = candidat
    if courant:
        morceaux.append(courant)
    return morceaux or [text]


def encode_mp3(samples: np.ndarray, sample_rate: int, bitrate: int) -> bytes:
    pcm = np.clip(samples, -1.0, 1.0)
    pcm = (pcm * 32767.0).astype("<i2", copy=False).tobytes()
    encoder = lameenc.Encoder()
    encoder.set_bit_rate(bitrate)
    encoder.set_in_sample_rate(sample_rate)
    encoder.set_channels(1)
    encoder.set_quality(2)
    return encoder.encode(pcm) + encoder.flush()


def produire_audio(
    voice: PiperVoice,
    text: str,
    synthesis: SynthesisConfig,
    max_chars: int,
) -> tuple[np.ndarray, int]:
    sorties: list[np.ndarray] = []
    sample_rate = voice.config.sample_rate
    morceaux = decouper_pour_voix(text, max_chars)
    for position, morceau in enumerate(morceaux):
        chunks = list(voice.synthesize(morceau, syn_config=synthesis))
        for chunk_position, chunk in enumerate(chunks):
            sample_rate = chunk.sample_rate
            sorties.append(np.asarray(chunk.audio_float_array, dtype=np.float32))
            if chunk_position < len(chunks) - 1:
                sorties.append(np.zeros(int(sample_rate * 0.10), dtype=np.float32))
        if position < len(morceaux) - 1:
            sorties.append(np.zeros(int(sample_rate * 0.16), dtype=np.float32))
    if not sorties:
        raise ValueError("Piper n'a produit aucun échantillon audio")
    return np.concatenate(sorties), sample_rate


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Génère les narrations locales avec Piper.")
    parser.add_argument("--model", required=True, type=Path)
    parser.add_argument("--config", type=Path)
    parser.add_argument("--corpus", type=Path, default=Path(__file__).with_name("corpus.json"))
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--index", type=Path, required=True)
    parser.add_argument("--voice", default="fr_FR-siwis-medium")
    parser.add_argument("--length-scale", type=float, default=1.0)
    parser.add_argument("--bitrate", type=int, default=48)
    parser.add_argument("--max-chars", type=int, default=380)
    parser.add_argument("--offset", type=int, default=0)
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--key", action="append", default=[], help="Clé précise à régénérer (répétable).")
    parser.add_argument("--force", action="store_true")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    corpus = json.loads(args.corpus.read_text(encoding="utf-8"))
    toutes_les_narrations = corpus["narrations"]
    fin = args.offset + args.limit if args.limit else None
    narrations = toutes_les_narrations[args.offset:fin]
    if args.key:
        keys = set(args.key)
        narrations = [item for item in toutes_les_narrations if item["cle"] in keys]
        absentes = keys - {item["cle"] for item in narrations}
        if absentes:
            raise ValueError(f"Clés absentes du corpus : {', '.join(sorted(absentes))}")
    args.output.mkdir(parents=True, exist_ok=True)

    voice = PiperVoice.load(args.model, config_path=args.config)
    synthesis = SynthesisConfig(length_scale=args.length_scale, normalize_audio=True)

    for position, item in enumerate(narrations, start=1):
        key = item["cle"]
        target = args.output / f"{key}.mp3"
        spoken = oraliser(item["texte"])
        if args.force or not target.exists():
            samples, sample_rate = produire_audio(voice, spoken, synthesis, args.max_chars)
            target.write_bytes(encode_mp3(samples, sample_rate, args.bitrate))
        print(f"[{position}/{len(narrations)}] {key} — {len(spoken)} caractères", flush=True)

    entries: dict[str, dict[str, object]] = {}
    for item in toutes_les_narrations:
        key = item["cle"]
        target = args.output / f"{key}.mp3"
        if not target.exists():
            continue
        entries[key] = {
            "fichier": f"audio/{target.name}",
            "sha256": hashlib.sha256(target.read_bytes()).hexdigest()[:16],
            "octets": target.stat().st_size,
        }

    payload = {
        "version": "1",
        "voix": args.voice,
        "moteur": "Piper 1.4.1 / VITS",
        "modeleFabrication": args.model.name,
        "empreinteCorpus": hashlib.sha256(args.corpus.read_bytes()).hexdigest()[:16],
        "narrationsAttendues": len(toutes_les_narrations),
        "frequenceHz": voice.config.sample_rate,
        "debitKbps": args.bitrate,
        "vitesse": args.length_scale,
        "entrees": entries,
    }
    args.index.parent.mkdir(parents=True, exist_ok=True)
    args.index.write_text(
        "/* Fichier généré par build/voix/generer-audios-piper.py — ne pas modifier à la main. */\n"
        f"window.PILOTE_VOIX_INDEX = {json.dumps(payload, ensure_ascii=False, indent=2)};\n",
        encoding="utf-8",
    )
    print(f"{len(entries)} narrations indexées dans {args.index}", flush=True)


if __name__ == "__main__":
    main()
