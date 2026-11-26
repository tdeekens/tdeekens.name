import { setShortcutsEnabled } from '@lib/shortcuts-preference';
import { THEME_STORAGE_KEY, toggleTheme } from '@lib/theme';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import ThemeToggle from './theme-toggle';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.dataset.theme = 'dark';
});

describe('ThemeToggle', () => {
  it('is a toggle button with a fixed name and pressed state', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: 'Dark theme' });
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('aria-keyshortcuts', 't');
  });

  it('toggles, persists and updates the pressed state on click', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: 'Dark theme' });

    await user.click(button);
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    // The focused button already conveys the change; no double announcement.
    expect(screen.getByRole('status')).toHaveTextContent('');
  });

  it('announces changes made elsewhere, e.g. via the shortcut', async () => {
    render(<ThemeToggle />);
    act(() => toggleTheme());
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Light theme on',
    );
  });

  it('drops aria-keyshortcuts when shortcuts are off', () => {
    render(<ThemeToggle />);
    act(() => setShortcutsEnabled(false));
    expect(
      screen.getByRole('button', { name: 'Dark theme' }),
    ).not.toHaveAttribute('aria-keyshortcuts');
  });
});
