#!/bin/bash -f

./node_modules/.bin/esbuild scripts/merge-all-products/script.ts --bundle --outfile=scripts/merge-all-products/script.js --platform=node --target=node18 --minify

node scripts/merge-all-products/script.js $@
