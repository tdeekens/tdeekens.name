import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  applyTheme,
  FALLBACK_THEME,
  getStoredTheme,
  getSystemTheme,
  setTheme,
  THEME_COLORS,
  THEME_STORAGE_KEY,
  themeInitScript,
  toggleTheme,
  watchThemeSources,
} from './theme';

type TListener = () => void;

/** `null` models a device without a colour-scheme preference. */
function mockPrefersDark(prefersDark: boolean | null) {
  const listeners = new Set<TListener>();
  let current = prefersDark;
  window.matchMedia = ((query: string) => ({
    get matches() {
      if (current === null) {
        return false;
      }
      return query.includes('dark') ? current : !current;
    },
    media: query,
    addEventListener: (_: string, l: TListener) => listeners.add(l),
    removeEventListener: (_: string, l: TListener) => listeners.delete(l),
  })) as unknown as typeof window.matchMedia;
  return {
    change(next: boolean) {
      current = next;
      for (const l of listeners) {
        l();
      }
    },
  };
}

const originalMatchMedia = window.matchMedia;

beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
  document.head.innerHTML = '<meta name="theme-color" content="#ffffff">';
});

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

const appliedTheme = () => document.documentElement.dataset.theme;
const metaColor = () =>
  document.querySelector('meta[name="theme-color"]')?.getAttribute('content');
const run = () => new Function(themeInitScript)();

describe('applyTheme', () => {
  it('sets data-theme and theme-color without persisting', () => {
    applyTheme('dark');
    expect(appliedTheme()).toBe('dark');
    expect(metaColor()).toBe(THEME_COLORS.dark);
    expect(getStoredTheme()).toBeNull();
  });
});

describe('setTheme / toggleTheme', () => {
  it('persists the explicit choice', () => {
    setTheme('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(appliedTheme()).toBe('dark');
  });

  it('toggles between the two themes', () => {
    applyTheme('light');
    toggleTheme();
    expect(appliedTheme()).toBe('dark');
    expect(getStoredTheme()).toBe('dark');
    toggleTheme();
    expect(appliedTheme()).toBe('light');
    expect(getStoredTheme()).toBe('light');
  });

  it('ignores garbage in storage', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'sepia');
    expect(getStoredTheme()).toBeNull();
  });
});

const fireStorage = () =>
  window.dispatchEvent(new StorageEvent('storage', { key: THEME_STORAGE_KEY }));

describe('getSystemTheme', () => {
  it('follows the device preference, falling back to light', () => {
    mockPrefersDark(true);
    expect(getSystemTheme()).toBe('dark');
    mockPrefersDark(false);
    expect(getSystemTheme()).toBe('light');
    mockPrefersDark(null);
    expect(getSystemTheme()).toBe(FALLBACK_THEME);
    expect(FALLBACK_THEME).toBe('light');
  });
});

describe('watchThemeSources', () => {
  it('follows OS changes until a choice is stored', () => {
    const media = mockPrefersDark(false);
    applyTheme('light');
    const stop = watchThemeSources();

    media.change(true);
    expect(appliedTheme()).toBe('dark');

    setTheme('light');
    media.change(true);
    expect(appliedTheme()).toBe('light');

    stop();
  });

  it('mirrors choices made in other tabs', () => {
    mockPrefersDark(false);
    applyTheme('light');
    const stop = watchThemeSources();

    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    fireStorage();
    expect(appliedTheme()).toBe('dark');

    stop();
  });

  it('falls back to the OS when another tab clears the choice', () => {
    mockPrefersDark(true);
    applyTheme('light');
    const stop = watchThemeSources();

    fireStorage();
    expect(appliedTheme()).toBe('dark');

    stop();
  });
});

describe('themeInitScript', () => {
  it('follows a dark device preference', () => {
    mockPrefersDark(true);
    run();
    expect(appliedTheme()).toBe('dark');
    expect(metaColor()).toBe(THEME_COLORS.dark);
  });

  it('follows a light device preference', () => {
    mockPrefersDark(false);
    run();
    expect(appliedTheme()).toBe('light');
    expect(metaColor()).toBe(THEME_COLORS.light);
  });

  it('falls back to light without a device preference', () => {
    mockPrefersDark(null);
    run();
    expect(appliedTheme()).toBe('light');
  });

  it('prefers a stored choice over the device', () => {
    mockPrefersDark(true);
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    run();
    expect(appliedTheme()).toBe('light');
  });
});
