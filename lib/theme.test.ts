import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';

import {
  applyTheme,
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

function mockMatchMedia(prefersLight: boolean) {
  const listeners = new Set<TListener>();
  const media = {
    matches: prefersLight,
    addEventListener: (_: string, l: TListener) => listeners.add(l),
    removeEventListener: (_: string, l: TListener) => listeners.delete(l),
  };
  window.matchMedia = (() => media) as unknown as typeof window.matchMedia;
  return {
    change(nextPrefersLight: boolean) {
      media.matches = nextPrefersLight;
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

describe('getSystemTheme', () => {
  it('is dark unless the OS prefers light', () => {
    mockMatchMedia(false);
    expect(getSystemTheme()).toBe('dark');
    mockMatchMedia(true);
    expect(getSystemTheme()).toBe('light');
  });
});

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
    setTheme('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(appliedTheme()).toBe('light');
  });

  it('toggles between the two themes', () => {
    applyTheme('dark');
    toggleTheme();
    expect(appliedTheme()).toBe('light');
    expect(getStoredTheme()).toBe('light');
    toggleTheme();
    expect(appliedTheme()).toBe('dark');
    expect(getStoredTheme()).toBe('dark');
  });

  it('ignores garbage in storage', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'sepia');
    expect(getStoredTheme()).toBeNull();
  });
});

describe('watchThemeSources', () => {
  it('follows OS changes until a choice is stored', () => {
    const media = mockMatchMedia(false);
    applyTheme('dark');
    const stop = watchThemeSources();

    media.change(true);
    expect(appliedTheme()).toBe('light');

    setTheme('dark');
    media.change(true);
    expect(appliedTheme()).toBe('dark');

    stop();
  });

  it('mirrors choices made in other tabs', () => {
    mockMatchMedia(false);
    applyTheme('dark');
    const stop = watchThemeSources();

    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    window.dispatchEvent(
      new StorageEvent('storage', { key: THEME_STORAGE_KEY }),
    );
    expect(appliedTheme()).toBe('light');

    stop();
  });
});

const run = () => new Function(themeInitScript)();

describe('themeInitScript', () => {
  it('prefers the stored choice', () => {
    mockMatchMedia(false);
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    run();
    expect(appliedTheme()).toBe('light');
    expect(metaColor()).toBe(THEME_COLORS.light);
  });

  it('falls back to the OS, defaulting to dark', () => {
    mockMatchMedia(false);
    run();
    expect(appliedTheme()).toBe('dark');
    expect(metaColor()).toBe(THEME_COLORS.dark);

    mockMatchMedia(true);
    run();
    expect(appliedTheme()).toBe('light');
  });
});
