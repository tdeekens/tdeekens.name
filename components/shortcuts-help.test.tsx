import {
  getShortcutsEnabled,
  SHORTCUTS_STORAGE_KEY,
} from '@lib/shortcuts-preference';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ShortcutsHelp from './shortcuts-help';

beforeEach(() => {
  localStorage.clear();
});

describe('ShortcutsHelp', () => {
  it('opens as a labelled dialog', () => {
    render(<ShortcutsHelp open pathname="/" onClose={() => {}} />);
    expect(
      screen.getByRole('dialog', { name: 'Keyboard shortcuts' }),
    ).toBeInTheDocument();
  });

  it('turns single-key shortcuts off and on again', async () => {
    const user = userEvent.setup();
    render(<ShortcutsHelp open pathname="/" onClose={() => {}} />);
    const checkbox = screen.getByRole('checkbox', {
      name: 'Enable single-key shortcuts',
    });

    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(localStorage.getItem(SHORTCUTS_STORAGE_KEY)).toBe('off');
    expect(getShortcutsEnabled()).toBe(false);

    await user.click(checkbox);
    expect(getShortcutsEnabled()).toBe(true);
  });

  it('lists page-specific shortcuts only on their page', () => {
    const { rerender } = render(
      <ShortcutsHelp open pathname="/" onClose={() => {}} />,
    );
    expect(screen.queryByText('Search the blogroll')).not.toBeInTheDocument();

    rerender(<ShortcutsHelp open pathname="/blogroll" onClose={() => {}} />);
    expect(screen.getByText('Search the blogroll')).toBeInTheDocument();
  });

  it('closes via the close button', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ShortcutsHelp open pathname="/" onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: 'Close (esc)' }));
    expect(onClose).toHaveBeenCalled();
  });
});
