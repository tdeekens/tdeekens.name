import { useState, type FormEvent } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import Markdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MARKDOWN_COMPONENTS: Components = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-2 list-disc pl-5 last:mb-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-2 list-decimal pl-5 last:mb-0">{children}</ol>
  ),
  li: ({ children }) => <li className="mb-1 last:mb-0">{children}</li>,
  a: ({ href, children }) => (
    <a href={href} className="underline hover:no-underline">
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="px-1 py-0.5 bg-gray-100 text-sm">{children}</code>
  ),
  pre: ({ children }) => (
    <pre className="mb-2 p-2 bg-gray-100 text-sm overflow-x-auto">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-2 pl-3 border-l-2 border-gray-400 italic">
      {children}
    </blockquote>
  ),
};

const SUGGESTIONS = [
  "What's Tobias's current role?",
  'What books has Tobias read recently?',
  'What open-source work has Tobias done?',
] as const;

const renderMessageText = (message: UIMessage): string =>
  message.parts.map((part) => (part.type === 'text' ? part.text : '')).join('');

function AskAboutMe() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status, error, clearError } = useChat({
    transport: new DefaultChatTransport({ api: '/api/ask-about-me' }),
  });

  const isBusy = status === 'submitted' || status === 'streaming';
  const lastAssistantMessage = [...messages]
    .reverse()
    .find((message) => message.role === 'assistant');
  const lastAnswer = lastAssistantMessage
    ? renderMessageText(lastAssistantMessage)
    : '';

  const submit = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    setInput('');
    if (error) clearError();
    await sendMessage({ text: trimmed });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submit(input);
  };

  return (
    <section className="my-8 print:hidden" data-no-markdown>
      <form onSubmit={onSubmit} className="flex border border-black">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about Tobias…"
          maxLength={2000}
          disabled={isBusy}
          className="flex-1 px-4 py-2 outline-none disabled:opacity-50"
          aria-label="Ask about Tobias"
        />
        <button
          type="submit"
          disabled={isBusy || input.trim().length === 0}
          className="px-4 py-2 border-l border-black hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-current"
        >
          {isBusy ? 'Sending…' : 'Send'}
        </button>
      </form>

      {messages.length === 0 && (
        <ul className="mt-2 flex flex-wrap gap-2">
          {SUGGESTIONS.map((suggestion) => (
            <li key={suggestion}>
              <button
                type="button"
                onClick={() => void submit(suggestion)}
                disabled={isBusy}
                className="px-2 py-1 text-sm border border-gray-400 hover:bg-gray-100 disabled:opacity-50"
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}

      {status === 'submitted' && (
        <p className="mt-4 text-sm text-gray-500">Thinking…</p>
      )}

      {lastAnswer && (
        <div className="mt-4">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={MARKDOWN_COMPONENTS}
          >
            {lastAnswer}
          </Markdown>
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

      <p className="mt-2 text-xs text-gray-500">
        Answers come from Tobias&apos;s CV, bookshelf, blogroll, and writing.
        Replies stream live and may be wrong.
      </p>
    </section>
  );
}

export default AskAboutMe;
