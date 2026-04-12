#!/bin/sh
set -e  # Exit on error

# Trap to ensure cleanup happens even if script is interrupted
cleanup() {
    EXIT_CODE=$?
    echo "Cleaning up..."
    cd "$(dirname "$0")/../.." && pnpm clearup-serve || true
    exit $EXIT_CODE
}

trap cleanup EXIT INT TERM

# Create the output directory
mkdir -p ${VREJI_PATH}/uencu

cd "$(dirname "$0")/../.."

echo "Generating PDFs (Typst; all book indices × locales; PDF_TYPUST_ONLY_LEARN_LOJBAN=1 for local learn-lojban-only)..."
# Large books + Mermaid + pandoc HTML can approach default ~4GiB heap; typst float patch is string-heavy.
NODE_OPTIONS="${NODE_OPTIONS:+${NODE_OPTIONS} }--max-old-space-size=8192" \
  pnpm exec tsx lib/typst-book/print-all-books.ts
PDF_EXIT_CODE=$?
if [ $PDF_EXIT_CODE -ne 0 ]; then
  echo "ERROR: Typst PDF generation failed with exit code $PDF_EXIT_CODE"
  exit $PDF_EXIT_CODE
fi

echo "Shrinking PDFs…"
bash lib/printer/shrink-pdf.sh
SHRINK_EXIT_CODE=$?
if [ $SHRINK_EXIT_CODE -ne 0 ]; then
  echo "ERROR: PDF shrinking failed with exit code $SHRINK_EXIT_CODE"
  exit $SHRINK_EXIT_CODE
fi

echo "PDF generation completed successfully"
exit 0
