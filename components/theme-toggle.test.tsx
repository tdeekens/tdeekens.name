import { beforeEach, describe, expect, it } from '@jest/globals';
import { THEME_STORAGE_KEY } from '@lib/theme';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ThemeToggle from './theme-toggle';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.dataset.theme = 'dark';
});

describe('ThemeToggle', () => {
  it('labels itself with the theme it switches to', () => {
    render(<ThemeToggle />);
    expect(
      screen.getByRole('button', { name: 'Switch to light theme' }),
    ).toBeInTheDocument();
  });

  it('toggles and persists the theme on click', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole('button'));
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(
      await screen.findByRole('button', { name: 'Switch to dark theme' }),
    ).toBeInTheDocument();
  });
});
