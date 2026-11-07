#!/usr/bin/env bash
# Builds the site and publishes dist/ to the gh-pages branch, which GitHub Pages serves.
set -euo pipefail
cd "$(dirname "$0")/.."

# Use the Node version from .nvmrc when nvm is installed.
if [ -s "${NVM_DIR:-$HOME/.nvm}/nvm.sh" ]; then
  # shellcheck disable=SC1091
  . "${NVM_DIR:-$HOME/.nvm}/nvm.sh"
  nvm use --silent >/dev/null
fi

npm run build

sha=$(git rev-parse --short HEAD)
out=$(mktemp -d)
trap 'rm -rf "$out"' EXIT
cp -r dist/. "$out"
touch "$out/.nojekyll"

git -C "$out" init -q -b gh-pages
git -C "$out" add -A
git -C "$out" -c user.name="$(git config user.name)" -c user.email="$(git config user.email)" commit -q -m "Deploy $sha"
git -C "$out" push -q -f "$(git remote get-url origin)" gh-pages

echo "Deployed $sha to https://tasnint.github.io/portfolio-1/ (live in about a minute)"
