module.exports = {
  '*.md': ['prettier --write --parser markdown'],
  '*.yaml': ['prettier --write --parser yaml'],
  '*.json': ['prettier --write --parser json'],
  '*.js?(x)': ['prettier --write'],
  // # Not released yet https://github.com/vercel/next.js/pull/28042
  //'*.{js?(x), ts?(x)}': lint,
  '*.{ts,tsx}': ['pnpm prettier --write', 'tsc-files --noEmit'],
};
