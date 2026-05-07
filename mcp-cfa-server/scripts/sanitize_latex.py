"""Limpa resíduos de LaTeX malformado em arquivos .md gerados por OCR.

Heurísticas aplicadas (idempotentes):
1. Remove fences vazios ou com whitespace puro.
2. Normaliza $$...$$ multilinha pra blocos com newline antes/depois.
3. Substitui \\backslash literal por \\.
4. Remove caracteres invisíveis comuns do OCR (zero-width, BOM).
5. Colapsa espaços triplos.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

INVISIBLE = "\u200b\u200c\u200d\ufeff\u00a0"


def sanitize(text: str) -> str:
    for ch in INVISIBLE:
        text = text.replace(ch, " " if ch == "\u00a0" else "")

    text = re.sub(r"\$\$\s*\$\$", "", text)
    text = re.sub(r"\$\s*\$", "", text)
    text = re.sub(r"\\\(\s*\\\)", "", text)

    def _normalize_display(m):
        body = m.group(1).strip()
        if not body:
            return ""
        return f"\n\n$$\n{body}\n$$\n\n"

    text = re.sub(r"\$\$([^$]+?)\$\$", _normalize_display, text, flags=re.DOTALL)

    text = text.replace("\\\\backslash", "\\")

    text = re.sub(r"\n{4,}", "\n\n\n", text)
    text = re.sub(r" +", " ", text)

    return text.strip() + "\n"


def main():
    if len(sys.argv) < 2:
        print("uso: sanitize_latex.py <file> [<file> ...]")
        sys.exit(1)

    for path_str in sys.argv[1:]:
        p = Path(path_str)
        if not p.exists():
            print(f"[skip] {p}: não existe")
            continue
        text = p.read_text(encoding="utf-8")
        cleaned = sanitize(text)
        if cleaned != text:
            p.write_text(cleaned, encoding="utf-8")
            print(f"[ok] {p}")
        else:
            print(f"[unchanged] {p}")


if __name__ == "__main__":
    main()
