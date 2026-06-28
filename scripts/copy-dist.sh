#!/bin/bash
set -euo pipefail

rm -rf dist
mkdir dist

cp index.* \
  service-worker.js \
  manifest.json \
  forkme_right_darkblue_modified.svg \
  dist/
