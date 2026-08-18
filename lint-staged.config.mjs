export default {
  // Lint and apply safe fixes; allow non-lintable files (e.g. .md, .json)
  '*': [
    'oxlint --fix --no-error-on-unmatched-pattern',
    // Format and sort imports
    'oxfmt --write',
  ],
  '*.{ts,tsx}': ['tsc-files --noEmit'],
};
