export const ASK_VARIANTS = ['cv', 'general'] as const;

export type AskVariant = (typeof ASK_VARIANTS)[number];

type AskVariantConfig = {
  sectionLabel: string;
  inputLabel: string;
  placeholder: string;
  footnote: string;
  autoFocusOnDesktop: boolean;
  suggestions: readonly string[];
};

export const ASK_ABOUT_ME_VARIANTS: Record<AskVariant, AskVariantConfig> = {
  cv: {
    sectionLabel: "Ask about Tobias's career",
    inputLabel: "Ask about Tobias's career",
    placeholder: 'Ask about roles, companies, or skills…',
    footnote:
      "Answers come from Tobias's CV, with his bookshelf, blogroll, and writing as background. Replies stream live and may be wrong.",
    autoFocusOnDesktop: true,
    suggestions: [
      "What's Tobias's current role?",
      'Which companies has Tobias worked at?',
      'What does Tobias do at commercetools?',
    ],
  },
  general: {
    sectionLabel: 'Ask about Tobias',
    inputLabel: 'Ask about Tobias',
    placeholder: 'Ask anything about Tobias…',
    footnote:
      "Answers come from Tobias's CV, bookshelf, blogroll, and writing. Replies stream live and may be wrong.",
    autoFocusOnDesktop: false,
    suggestions: [
      'What does Tobias work on?',
      'What books has Tobias read recently?',
    ],
  },
};
