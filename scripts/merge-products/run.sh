#!/bin/bash -f

./node_modules/.bin/esbuild scripts/merge-products/script.ts --bundle --outfile=scripts/merge-products/script.js --platform=node --target=node18 --minify

node scripts/merge-products/script.js $@
