import { useState, type FormEvent } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SUGGESTIONS = [
  "What's Tobias's current role?",
  'What books has Tobias read recently?',
  'What open-source work has Tobias done?',
] as const;

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

const renderMessageText = (message: UIMessage): string =>
  message.parts.map((part) => (part.type === 'text' ? part.text : '')).join('');

function AskAboutMe() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status, error, clearError } = useChat({
    transport: new DefaultChatTransport({ api: '/api/ask-about-me' }),
  });

  const isBusy = status === 'submitted' || status === 'streaming';
  const lastAssistantMessage = messages.findLast(
    (message) => message.role === 'assistant',
  );
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
        <div className={`mt-4 ${MARKDOWN_CLASSES}`}>
          <Markdown remarkPlugins={[remarkGfm]}>{lastAnswer}</Markdown>
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
