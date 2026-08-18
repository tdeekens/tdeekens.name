import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UIMessage } from 'ai';

type ChatState = {
  messages: UIMessage[];
  status: 'ready' | 'submitted' | 'streaming' | 'error';
  error?: Error;
};

const sendMessage = jest.fn();
const clearError = jest.fn();
let chatState: ChatState;

jest.unstable_mockModule('@ai-sdk/react', () => ({
  useChat: () => ({ ...chatState, sendMessage, clearError }),
}));

const { default: AskAboutMe } = await import('./ask-about-me');

const textMessage = (role: 'user' | 'assistant', text: string): UIMessage => ({
  id: `${role}-1`,
  role,
  parts: [{ type: 'text', text }],
});

beforeEach(() => {
  chatState = { messages: [], status: 'ready' };
  sendMessage.mockClear();
  clearError.mockClear();
});

describe('AskAboutMe', () => {
  it('offers suggestions until a question is asked', () => {
    render(<AskAboutMe />);

    expect(
      screen.getByRole('button', { name: "What's Tobias's current role?" }),
    ).toBeInTheDocument();
  });

  it('sends the typed question and clears the input', async () => {
    render(<AskAboutMe />);

    await userEvent.type(
      screen.getByRole('textbox', { name: 'Ask about Tobias' }),
      'Where does he work?',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(sendMessage).toHaveBeenCalledWith({ text: 'Where does he work?' });
    expect(
      screen.getByRole('textbox', { name: 'Ask about Tobias' }),
    ).toHaveValue('');
  });

  it('disables input while a request is in flight', () => {
    chatState = { messages: [], status: 'submitted' };
    render(<AskAboutMe />);

    expect(
      screen.getByRole('textbox', { name: 'Ask about Tobias' }),
    ).toBeDisabled();
    expect(screen.getByRole('button', { name: /Sending/ })).toBeDisabled();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders the assistant answer as markdown', () => {
    chatState = {
      messages: [
        textMessage('user', 'Where does he work?'),
        textMessage('assistant', 'He works at **commercetools**.'),
      ],
      status: 'ready',
    };
    render(<AskAboutMe />);

    expect(screen.getByText('commercetools').tagName).toBe('STRONG');
    expect(
      screen.queryByRole('button', { name: "What's Tobias's current role?" }),
    ).not.toBeInTheDocument();
  });
});
