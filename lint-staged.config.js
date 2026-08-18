module.exports = {
  '*.md': ['prettier --write --parser markdown'],
  '*.yaml': ['prettier --write --parser yaml'],
  '*.json': ['prettier --write --parser json'],
  '*.js?(x)': ['prettier --write'],
  // # Not released yet https://github.com/vercel/next.js/pull/28042
  //'*.{js?(x), ts?(x)}': lint,
  // tsc-files is gone: it resolved tsc through a path pnpm does not create,
  // so spawnSync failed, status was null and it always exited 0. TypeScript 7
  // typechecks the whole project in well under a second, so check everything
  // rather than the staged subset.
  '*.{ts,tsx}': ['pnpm prettier --write', () => 'pnpm typecheck'],
};
