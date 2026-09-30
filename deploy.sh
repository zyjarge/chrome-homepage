#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "[1/4] git pull"
git pull origin main

echo "[2/4] npm install"
if [ ! -d tools/node_modules ]; then
  npm install --prefix tools
fi

echo "[3/4] minify"
node tools/minify.mjs

echo "[4/4] docker compose up -d"
docker compose up -d --force-recreate

echo "Done. http://localhost:4000"