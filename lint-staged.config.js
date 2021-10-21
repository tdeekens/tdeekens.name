function lint(filenames) {
  return `next lint --fix --file ${filenames
    .map((file) => file.split(process.cwd())[1])
    .join(' --file ')}`;
}

module.exports = {
  '*.md': ['prettier --write --parser markdown'],
  '*.yaml': ['prettier --write --parser yaml'],
  '*.json': ['prettier --write --parser json'],
  '*.js?(x)': ['prettier --write'],
  // # Not released yet https://github.com/vercel/next.js/pull/28042
  //'*.{js?(x), ts?(x)}': lint,
  '*.{ts,tsx}': ['yarn prettier --write', 'tsc-files --noEmit'],
};
