export default {
  // Lint and apply safe fixes; allow non-lintable files (e.g. .md, .json)
  '*': [
    'oxlint --fix --no-error-on-unmatched-pattern',
    // Format and sort imports
    'oxfmt --write',
  ],
  // Type-check the whole project instead of only the staged files, because a
  // staged change can break the types of a file that is not part of the commit.
  // The function form stops lint-staged from appending the file list to `tsc`,
  // which would make it ignore `tsconfig.json`.
  '*.{ts,tsx}': () => 'tsc --noEmit --skipLibCheck',
};
