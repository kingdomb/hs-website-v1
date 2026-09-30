#!/usr/bin/env bash
# Build the site and publish dist/ to the gh-pages branch (GitHub Pages serves that branch).
# Usage: npm run deploy   (needs push access to the origin remote)
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build
remote="$(git remote get-url origin)"
tmp="$(mktemp -d)"
cp -R dist/. "$tmp"
touch "$tmp/.nojekyll"
cd "$tmp"
git init -q -b gh-pages
git add -A
git commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push -f "$remote" gh-pages
cd - >/dev/null
rm -rf "$tmp"
