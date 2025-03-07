module.exports = {
  '*.{js,jsx,ts,tsx}': ['pnpm prettier:check'],
  '!(.eslintrc|prettier.config|next.config|.lintstagedrc).{js,ts,tsx,mjs}': [
    'pnpm lint',
  ],
  '*.{ts,tsx}': [() => 'pnpm validate-types'],
};
