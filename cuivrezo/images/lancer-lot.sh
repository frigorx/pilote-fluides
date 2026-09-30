#!/usr/bin/env bash
# Lance Codex sur chaque consigne passée en argument, l'une après l'autre, et copie l'image.
cd "$(dirname "$0")"
for k in "$@"; do
  codex exec --ignore-user-config -m gpt-6-astra -c model_reasoning_effort=low --skip-git-repo-check -s workspace-write --json - < "consignes/$k.txt" > "brut/$k.jsonl" 2> "brut/$k.err"
  T=$(grep -o '"thread_id":"[^"]*"' "brut/$k.jsonl" | head -1 | cut -d'"' -f4)
  F=$(ls ~/.codex/generated_images/$T/*.png 2>/dev/null | head -1)
  if [ -n "$F" ]; then cp "$F" "brut/$k.png"; echo "OK $k"; else echo "ÉCHEC $k"; fi
done
