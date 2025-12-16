#!/bin/sh
set -e  # Exit on error

# Trap to ensure cleanup happens even if script is interrupted
cleanup() {
    EXIT_CODE=$?
    echo "Cleaning up..."
    
    # Kill the server process if it's still running
    if [ ! -z "$SERVER_PID" ] && kill -0 "$SERVER_PID" 2>/dev/null; then
        echo "Killing server process $SERVER_PID"
        kill "$SERVER_PID" 2>/dev/null || true
        wait "$SERVER_PID" 2>/dev/null || true
    fi
    
    # Also run the clearup-serve to catch any other processes
    cd "$(dirname "$0")/../.." && pnpm clearup-serve || true
    
    exit $EXIT_CODE
}

trap cleanup EXIT INT TERM

# Create the output directory
mkdir -p ${VREJI_PATH}/uencu

# Start the server in the background
cd "$(dirname "$0")/../.."
pnpm start &
SERVER_PID=$!
echo "Started server with PID: $SERVER_PID"

# Wait for the server to be ready
node lib/printer/wait-for-server.js

# Generate PDFs
echo "Generating PDFs..."
node lib/printer/index.js
PDF_EXIT_CODE=$?

if [ $PDF_EXIT_CODE -ne 0 ]; then
    echo "ERROR: PDF generation failed with exit code $PDF_EXIT_CODE"
    exit $PDF_EXIT_CODE
fi

# Shrink PDFs
echo "Shrinking PDFs..."
sh ./lib/printer/shrink-pdf.sh
SHRINK_EXIT_CODE=$?

if [ $SHRINK_EXIT_CODE -ne 0 ]; then
    echo "ERROR: PDF shrinking failed with exit code $SHRINK_EXIT_CODE"
    exit $SHRINK_EXIT_CODE
fi

echo "PDF generation and shrinking completed successfully"
exit 0
