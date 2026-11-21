import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const push = jest.fn();
jest.unstable_mockModule('next/router', () => ({
  useRouter: () => ({ push }),
}));

// Imported after the mock so the hook picks up the fake router.
const { useShortcuts } = await import('./use-shortcuts');

function Harness() {
  useShortcuts(() => {});
  return <input aria-label="field" />;
}

beforeEach(() => {
  push.mockClear();
  localStorage.clear();
  document.documentElement.dataset.theme = 'dark';
});

describe('useShortcuts', () => {
  it('toggles the theme with "t"', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.keyboard('t');
    expect(document.documentElement.dataset.theme).toBe('light');
    await user.keyboard('t');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('ignores "t" while typing in an input', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = render(<Harness />);

    await user.type(getByLabelText('field'), 't');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('still navigates with path shortcuts', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.keyboard('gb');
    expect(push).toHaveBeenCalledWith('/bookshelf');
  });
});
