import type { TAskAboutMeProps } from '@components/ask-about-me';
import AskAboutMeShell from '@components/ask-about-me-shell';
import {
  ASK_ABOUT_ME_VARIANTS,
  type AskVariant,
} from '@lib/ask-about-me/variants';
import { useEffect, useRef, useState, type ComponentType } from 'react';

type TAskAboutMeLazyProps = {
  variant: AskVariant;
};

/**
 * Keeps `ai`, `@ai-sdk/react` and `react-markdown` out of the page bundle until
 * a visitor actually wants to ask something. Focusing the input warms the chunk;
 * typing or submitting commits to it. The shell stays mounted while the chunk
 * loads, so no keystroke is ever dropped.
 */
function AskAboutMeLazy(props: TAskAboutMeLazyProps) {
  const [Chat, setChat] = useState<ComponentType<TAskAboutMeProps> | null>(
    null,
  );
  const [isActive, setIsActive] = useState(false);
  const [input, setInput] = useState('');
  const [pendingQuestion, setPendingQuestion] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const importRef = useRef<Promise<void> | null>(null);
  const isProgrammaticFocusRef = useRef(false);

  const config = ASK_ABOUT_ME_VARIANTS[props.variant];

  const load = () => {
    importRef.current ??= import('@components/ask-about-me').then((module) => {
      setChat(() => module.default);
    });
  };

  useEffect(() => {
    if (!config.autoFocusOnDesktop) {
      return;
    }
    if (!window.matchMedia('(min-width: 768px)').matches) {
      return;
    }
    // Flagged so the autofocus below does not count as intent and warm the chunk.
    isProgrammaticFocusRef.current = true;
    inputRef.current?.focus();
  }, [config.autoFocusOnDesktop]);

  const onInputFocus = () => {
    if (isProgrammaticFocusRef.current) {
      isProgrammaticFocusRef.current = false;
      return;
    }
    load();
  };

  const onInputChange = (value: string) => {
    setInput(value);
    load();
    setIsActive(true);
  };

  const onSubmit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    setInput('');
    setPendingQuestion(trimmed);
    load();
    setIsActive(true);
  };

  if (Chat && isActive) {
    return (
      <Chat
        variant={props.variant}
        initialInput={input}
        initialQuestion={pendingQuestion}
        shouldFocusOnMount
      />
    );
  }

  return (
    <AskAboutMeShell
      variant={props.variant}
      input={input}
      isBusy={false}
      showSuggestions
      inputRef={inputRef}
      onInputChange={onInputChange}
      onInputFocus={onInputFocus}
      onSubmit={onSubmit}
    />
  );
}

export default AskAboutMeLazy;
