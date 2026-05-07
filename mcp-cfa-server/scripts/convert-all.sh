#!/bin/bash
# Converts all CFA PDFs organized by level.
# Usage: cd mcp-cfa-server && bash scripts/convert-all.sh

set -e
DIR="pdfs-to-convert/2025 level 2 e 3"

echo "=== LEVEL 1: Schweser Books ==="
for f in \
  "$DIR/level 1/CFA 2025 Level I - Quants, Eco, CI.PDF.pdf" \
  "$DIR/level 1/CFA 2025 Level I - FSA, Equity.PDF.pdf" \
  "$DIR/level 1/CFA 2025 Level I - FI, Derivatives.PDF.pdf" \
  "$DIR/level 1/CFA 2025 Level I - AI, PM, Ethics.PDF.pdf" \
  "$DIR/level 1/2024 SS CFA L1 (1) (2).PDF.pdf" \
  "$DIR/level 1/L1_2024_Formula_Sheet.PDF.pdf"; do
  [ -f "$f" ] && python3 scripts/convert_pdfs.py "$f" --category level-1/books || echo "[skip] $f"
done

echo "=== LEVEL 1: Schweser QBank ==="
find "$DIR/level 1/SCHWESER Question Bank 2024" -name "*.pdf" | sort | while read f; do
  python3 scripts/convert_pdfs.py "$f" --category level-1/qbank || echo "[skip] $f"
done

echo "=== LEVEL 1: Kaplan Mocks ==="
find "$DIR/level 1/Kaplan 2024 Mocks" -name "*.pdf" | sort | while read f; do
  python3 scripts/convert_pdfs.py "$f" --category level-1/mocks || echo "[skip] $f"
done

echo "=== LEVEL 1: AnalystPrep Notes ==="
find "$DIR/level 1/Samples - CFA L1 AnalystPrep 2025" -name "*.pdf" | sort | while read f; do
  python3 scripts/convert_pdfs.py "$f" --category level-1/notes || echo "[skip] $f"
done

echo "=== LEVEL 2: Schweser Books ==="
for f in \
  "$DIR/Book 1.PDF" \
  "$DIR/Book 2.PDF" \
  "$DIR/Book 3.PDF" \
  "$DIR/Book 4.PDF" \
  "$DIR/Book 5.PDF" \
  "$DIR/Book 4 Portfolio Management.PDF" \
  "$DIR/Book 4 Private Market.PDF"; do
  [ -f "$f" ] && python3 scripts/convert_pdfs.py "$f" --category level-2/books || echo "[skip] $f"
done

echo "=== LEVEL 3: Schweser Books ==="
for f in \
  "$DIR/CFA 2025 L3 Schweser_s Notes Book 1.PDF" \
  "$DIR/CFA 2025 L3 Schweser_s Notes Book 2.PDF" \
  "$DIR/CFA 2025 L3 Schweser_s Notes Book 3.PDF" \
  "$DIR/CFA 2025 L3 Pathway 3 - Private Wealth.PDF"; do
  [ -f "$f" ] && python3 scripts/convert_pdfs.py "$f" --category level-3/books || echo "[skip] $f"
done

echo "=== DONE ==="
echo "All PDFs converted. Check docs/ for results."
