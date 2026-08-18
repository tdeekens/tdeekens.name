import type { FormEvent, ReactNode, Ref } from 'react';
import {
  ASK_ABOUT_ME_VARIANTS,
  type AskVariant,
} from '@lib/ask-about-me/variants';

type TAskAboutMeShellProps = {
  variant: AskVariant;
  input: string;
  isBusy: boolean;
  showSuggestions: boolean;
  inputRef?: Ref<HTMLInputElement>;
  onInputChange: (value: string) => void;
  onInputFocus?: () => void;
  onSubmit: (text: string) => void;
  children?: ReactNode;
};

/**
 * Owns every pixel both `ask-about-me-lazy` and `ask-about-me` share, so the
 * hand-over from the placeholder to the streaming chat is invisible. Keep this
 * module free of `ai`/`react-markdown` imports: it ships in the page bundle.
 */
function AskAboutMeShell(props: TAskAboutMeShellProps) {
  const config = ASK_ABOUT_ME_VARIANTS[props.variant];

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(props.input);
  };

  return (
    <section
      className="my-8 w-full md:w-3/4 mx-auto print:hidden"
      data-no-markdown
      aria-label={config.sectionLabel}
    >
      <form
        onSubmit={onFormSubmit}
        aria-label="Ask Tobias a question"
        className="flex border border-black focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-1"
      >
        <input
          ref={props.inputRef}
          type="text"
          value={props.input}
          onChange={(event) => props.onInputChange(event.target.value)}
          onFocus={props.onInputFocus}
          placeholder={config.placeholder}
          maxLength={2000}
          disabled={props.isBusy}
          className="flex-1 px-4 py-2 outline-none disabled:opacity-50"
          aria-label={config.inputLabel}
        />
        <button
          type="submit"
          disabled={props.isBusy || props.input.trim().length === 0}
          className="px-4 py-2 border-l border-black hover:bg-black hover:text-white transition-colors focus-visible:outline-none focus-visible:bg-black focus-visible:text-white disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-current"
        >
          {props.isBusy ? 'Sending…' : 'Send'}
        </button>
      </form>

      {props.showSuggestions && (
        <ul className="mt-2 flex flex-wrap gap-2">
          {config.suggestions.map((suggestion) => (
            <li key={suggestion}>
              <button
                type="button"
                onClick={() => props.onSubmit(suggestion)}
                disabled={props.isBusy}
                className="px-2 py-1 text-sm border border-gray-400 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:opacity-50"
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}

      {props.children}

      <p className="mt-2 text-xs text-gray-500">{config.footnote}</p>
    </section>
  );
}

export default AskAboutMeShell;
