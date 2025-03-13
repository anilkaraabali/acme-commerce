module.exports = {
  '*.{js,jsx,ts,tsx}': ['pnpm prettier:check'],
  '!(.eslintrc|prettier.config|next.config|.lintstagedrc).{js,ts,tsx,mjs,mts}':
    ['pnpm lint'],
  '*.{ts,tsx}': [() => 'pnpm validate-types'],
};
