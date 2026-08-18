import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const sendMessage = jest.fn();
// Only the real chat calls useChat, so this doubles as the "chunk swapped in"
// signal. Without it the hand-over tests would pass on the placeholder alone.
const useChat = jest.fn(() => ({
  messages: [],
  status: 'ready' as const,
  sendMessage,
  clearError: jest.fn(),
}));

jest.unstable_mockModule('@ai-sdk/react', () => ({ useChat }));

const { default: AskAboutMeLazy } = await import('./ask-about-me-lazy');

beforeEach(() => {
  sendMessage.mockClear();
  useChat.mockClear();
});

describe('AskAboutMeLazy', () => {
  it('renders an interactive placeholder before the chat chunk loads', () => {
    render(<AskAboutMeLazy variant="general" />);

    expect(
      screen.getByRole('textbox', { name: 'Ask about Tobias' }),
    ).toBeEnabled();
    expect(
      screen.getByRole('button', { name: 'What does Tobias work on?' }),
    ).toBeInTheDocument();
    expect(useChat).not.toHaveBeenCalled();
    expect(sendMessage).not.toHaveBeenCalled();
  });

  // The placeholder keeps accepting keystrokes while the chunk is in flight, so
  // nothing typed during the swap may be dropped.
  it('carries typed input across the hand-over', async () => {
    render(<AskAboutMeLazy variant="general" />);

    await userEvent.type(
      screen.getByRole('textbox', { name: 'Ask about Tobias' }),
      'Where does he work?',
    );

    await waitFor(() => {
      expect(useChat).toHaveBeenCalled();
    });
    expect(
      screen.getByRole('textbox', { name: 'Ask about Tobias' }),
    ).toHaveValue('Where does he work?');
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('submits a suggestion clicked before the chat chunk loaded', async () => {
    render(<AskAboutMeLazy variant="general" />);

    await userEvent.click(
      screen.getByRole('button', { name: 'What does Tobias work on?' }),
    );

    await waitFor(() => {
      expect(sendMessage).toHaveBeenCalledWith({
        text: 'What does Tobias work on?',
      });
    });
  });

  it('uses the variant copy in the placeholder', () => {
    render(<AskAboutMeLazy variant="cv" />);

    expect(useChat).not.toHaveBeenCalled();
    expect(
      screen.getByRole('textbox', { name: "Ask about Tobias's career" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: "What's Tobias's current role?" }),
    ).toBeInTheDocument();
  });
});
