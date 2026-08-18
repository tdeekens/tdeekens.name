import { useEffect, useMemo, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AskAboutMeShell from '@components/ask-about-me-shell';
import type { AskVariant } from '@lib/ask-about-me/variants';

const MARKDOWN_CLASSES = [
  '[&_p]:mb-2 [&_p:last-child]:mb-0',
  '[&_ul]:mb-2 [&_ul]:list-disc [&_ul]:pl-5',
  '[&_ol]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5',
  '[&_li]:mb-1',
  '[&_a]:underline hover:[&_a]:no-underline',
  '[&_strong]:font-semibold',
  '[&_code]:px-1 [&_code]:py-0.5 [&_code]:bg-gray-100 [&_code]:text-sm',
  '[&_pre]:p-2 [&_pre]:bg-gray-100 [&_pre]:overflow-x-auto [&_pre]:mb-2',
  '[&_blockquote]:pl-3 [&_blockquote]:border-l-2 [&_blockquote]:border-gray-400 [&_blockquote]:italic [&_blockquote]:mb-2',
].join(' ');

const STREAMING_CARET_CLASSES =
  "[&>*:last-child]:after:content-['▍'] [&>*:last-child]:after:ml-1 motion-safe:[&>*:last-child]:after:animate-pulse [&>*:last-child]:after:text-gray-500";

const renderMessageText = (message: UIMessage): string =>
  message.parts.map((part) => (part.type === 'text' ? part.text : '')).join('');

export type TAskAboutMeProps = {
  variant: AskVariant;
  /** Carried over from the placeholder so in-flight typing survives the swap. */
  initialInput?: string;
  /** Sent on mount when the visitor submitted before this chunk had loaded. */
  initialQuestion?: string;
  /** Restores focus after the placeholder's input is replaced by this one. */
  shouldFocusOnMount?: boolean;
};

function AskAboutMe(props: TAskAboutMeProps) {
  const [input, setInput] = useState(props.initialInput ?? '');
  const inputRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/ask-about-me',
        body: { variant: props.variant },
      }),
    [props.variant],
  );
  const { messages, sendMessage, status, error, clearError } = useChat({
    transport,
  });

  const isBusy = status === 'submitted' || status === 'streaming';
  const isStreaming = status === 'streaming';
  const lastAssistantMessage = messages.findLast(
    (message) => message.role === 'assistant',
  );
  const lastAnswer = lastAssistantMessage
    ? renderMessageText(lastAssistantMessage)
    : '';
  const lastUserMessage = messages.findLast(
    (message) => message.role === 'user',
  );
  const lastQuestion = lastUserMessage
    ? renderMessageText(lastUserMessage)
    : '';
  const hasFirstTokens = lastAnswer.length > 0;

  const submit = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    setInput('');
    if (error) clearError();
    await sendMessage({ text: trimmed });
  };

  const hasMountedRef = useRef(false);
  useEffect(() => {
    if (hasMountedRef.current) return;
    hasMountedRef.current = true;

    if (props.shouldFocusOnMount) {
      const element = inputRef.current;
      element?.focus();
      element?.setSelectionRange(element.value.length, element.value.length);
    }
    if (props.initialQuestion) void submit(props.initialQuestion);
    // Mount-only hand-over. Re-running would resubmit the initial question.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasFirstTokens) {
      answerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [hasFirstTokens]);

  return (
    <AskAboutMeShell
      variant={props.variant}
      input={input}
      isBusy={isBusy}
      showSuggestions={messages.length === 0}
      inputRef={inputRef}
      onInputChange={setInput}
      onSubmit={(text) => void submit(text)}
    >
      {status === 'submitted' && (
        <p
          role="status"
          aria-live="polite"
          className="mt-4 flex items-center gap-0.5 text-sm text-gray-500"
        >
          <span aria-hidden="true" className="motion-safe:animate-pulse">
            Thinking
          </span>
          <span
            aria-hidden="true"
            className="motion-safe:animate-pulse [animation-delay:200ms]"
          >
            .
          </span>
          <span
            aria-hidden="true"
            className="motion-safe:animate-pulse [animation-delay:400ms]"
          >
            .
          </span>
          <span
            aria-hidden="true"
            className="motion-safe:animate-pulse [animation-delay:600ms]"
          >
            .
          </span>
          <span className="sr-only">Loading answer</span>
        </p>
      )}

      {hasFirstTokens && (
        <div
          ref={answerRef}
          className="mt-4"
          aria-live="polite"
          aria-atomic="false"
          aria-busy={isStreaming}
        >
          {lastQuestion && (
            <p className="mb-2 text-xs uppercase tracking-wide text-gray-500">
              {lastQuestion}
            </p>
          )}
          <div
            className={`${MARKDOWN_CLASSES} ${
              isStreaming ? STREAMING_CARET_CLASSES : ''
            }`}
          >
            <Markdown remarkPlugins={[remarkGfm]}>{lastAnswer}</Markdown>
          </div>
        </div>
      )}

      {error && (
        <p
          role="alert"
          className="mt-2 px-3 py-2 text-sm border border-red-500 text-red-700"
        >
          {error.message || 'Something went wrong. Please try again.'}
        </p>
      )}
    </AskAboutMeShell>
  );
}

export default AskAboutMe;
