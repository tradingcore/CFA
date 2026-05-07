"""Converte PDFs em markdown via Mistral OCR API.

Pipeline:
 PDF -> Mistral OCR (mistral-ocr-latest) -> raw markdown -> sanitize_latex
 -> docs/{category}/{slug}.md (com YAML frontmatter)

Uso:
 python scripts/convert_pdfs.py <pdf> [<pdf> ...] [--category books|methodologies]
 [--output path/custom.md] [--overwrite]

Requer MISTRAL_API_KEY no ambiente (ou no .env na raiz do mcp-cfa-server).
"""
from __future__ import annotations

import argparse
import os
import re
import sys
import unicodedata
import subprocess
from datetime import datetime, timezone
from pathlib import Path

try:
    from mistralai import Mistral
except ImportError:
    print("[erro] mistralai não instalado. Rode: pip install mistralai")
    sys.exit(2)

ROOT = Path(__file__).resolve().parents[1]


def _load_dotenv():
    env_file = ROOT / ".env"
    if not env_file.exists():
        return
    for line in env_file.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, val = line.partition("=")
        key = key.strip()
        val = val.strip().strip('"').strip("'")
        os.environ.setdefault(key, val)


def slugify(name: str) -> str:
    name = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode("ascii")
    name = re.sub(r"[^\w\s-]", " ", name).strip().lower()
    name = re.sub(r"[\s_]+", "-", name)
    name = re.sub(r"-+", "-", name)
    return name[:120].strip("-")


def derive_title(pdf_path: Path) -> str:
    raw = pdf_path.stem
    raw = re.sub(r"\(\d{4}\)|\(ISBN[^)]*\)|\(\d+s\)|_FD_|_FC_|\(Z[^)]+\)", " ", raw)
    raw = re.sub(r"\s+\d+(st|nd|rd|th|ed)\.?", " ", raw, flags=re.IGNORECASE)
    raw = re.sub(r"\(\d+ed[.,]?\s*\w*\)", " ", raw, flags=re.IGNORECASE)
    raw = re.sub(r"\b(Wiley|Springer|Pearson)\b", " ", raw, flags=re.IGNORECASE)
    raw = re.sub(r"[_\.]+", " ", raw)
    raw = re.sub(r"\s{2,}", " ", raw).strip(" -,.")
    return raw or pdf_path.stem


def upload_and_ocr(client: Mistral, pdf_path: Path) -> dict:
    print(f"  -> uploading {pdf_path.name} ({pdf_path.stat().st_size / 1e6:.1f} MB)...")
    with pdf_path.open("rb") as fh:
        uploaded = client.files.upload(
            file={"file_name": pdf_path.name, "content": fh.read()},
            purpose="ocr",
        )
    print(f"  -> file_id={uploaded.id}, requesting signed URL...")
    signed = client.files.get_signed_url(file_id=uploaded.id)
    print(f"  -> running OCR (mistral-ocr-latest)...")
    response = client.ocr.process(
        model="mistral-ocr-latest",
        document={"type": "document_url", "document_url": signed.url},
        include_image_base64=False,
    )
    return response.model_dump() if hasattr(response, "model_dump") else dict(response)


def assemble_markdown(ocr_result: dict, pdf_path: Path, category: str) -> str:
    pages = ocr_result.get("pages", [])
    title = derive_title(pdf_path)
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    parts = [
        "---",
        f'title: "{title}"',
        f'source_pdf: "{pdf_path.name}"',
        'converter: "mistral-ocr-latest"',
        f'date_converted: "{now}"',
        f"pages: {len(pages)}",
        f'category: "{category}"',
        "sanitized: true",
        "reviewed: false",
        "---",
    ]
    for p in pages:
        md = (p.get("markdown") or "").strip()
        if md:
            parts.append(md)
    return "\n".join(parts) + "\n"


def main():
    _load_dotenv()
    api_key = os.environ.get("MISTRAL_API_KEY")
    if not api_key:
        print("[erro] MISTRAL_API_KEY não definida (verifique .env)")
        sys.exit(2)

    ap = argparse.ArgumentParser(description="PDF -> Markdown via Mistral OCR")
    ap.add_argument("pdfs", nargs="+", help="PDFs para converter")
    ap.add_argument("--category", default="books", help="Category subfolder under docs/ (e.g. books, level-1/books, level-2/books)")
    ap.add_argument("--output", help="Caminho explícito do .md (só para 1 PDF)")
    ap.add_argument("--overwrite", action="store_true")
    args = ap.parse_args()

    if args.output and len(args.pdfs) > 1:
        print("[erro] --output só funciona com 1 PDF")
        sys.exit(2)

    client = Mistral(api_key=api_key)
    docs_dir = ROOT / "docs" / args.category
    docs_dir.mkdir(parents=True, exist_ok=True)
    sanitize_script = ROOT / "scripts" / "sanitize_latex.py"

    for pdf_str in args.pdfs:
        pdf_path = Path(pdf_str).expanduser().resolve()
        if not pdf_path.exists():
            print(f"[skip] {pdf_path} não existe")
            continue

        out_path = Path(args.output).resolve() if args.output else docs_dir / f"{slugify(pdf_path.stem)}.md"
        if out_path.exists() and not args.overwrite:
            print(f"[skip] {out_path} já existe (use --overwrite)")
            continue

        print(f"[run] {pdf_path.name} -> {out_path.relative_to(ROOT)}")
        try:
            ocr_result = upload_and_ocr(client, pdf_path)
        except Exception as e:
            print(f"  [erro OCR] {e}")
            continue

        md = assemble_markdown(ocr_result, pdf_path, args.category)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(md, encoding="utf-8")
        print(f"  [ok] {len(md):,} bytes escritos")

        if sanitize_script.exists():
            try:
                subprocess.run(
                    [sys.executable, str(sanitize_script), str(out_path)],
                    check=True,
                )
            except subprocess.CalledProcessError as e:
                print(f"  [aviso] sanitize_latex falhou: {e}")


if __name__ == "__main__":
    main()
