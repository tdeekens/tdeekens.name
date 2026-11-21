import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';

import {
  applyTheme,
  DEFAULT_THEME,
  getStoredTheme,
  setTheme,
  syncThemeAcrossTabs,
  THEME_COLORS,
  THEME_STORAGE_KEY,
  themeInitScript,
  toggleTheme,
} from './theme';

function mockPrefersDark(prefersDark: boolean) {
  window.matchMedia = ((query: string) => ({
    matches: query.includes('dark') ? prefersDark : !prefersDark,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
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

describe('syncThemeAcrossTabs', () => {
  it('mirrors choices made in other tabs', () => {
    applyTheme('light');
    const stop = syncThemeAcrossTabs();

    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    fireStorage();
    expect(appliedTheme()).toBe('dark');

    stop();
  });

  it('falls back to the default when another tab clears the choice', () => {
    applyTheme('dark');
    const stop = syncThemeAcrossTabs();

    fireStorage();
    expect(appliedTheme()).toBe(DEFAULT_THEME);

    stop();
  });
});

describe('themeInitScript', () => {
  it('defaults to light', () => {
    expect(DEFAULT_THEME).toBe('light');
    run();
    expect(appliedTheme()).toBe('light');
    expect(metaColor()).toBe(THEME_COLORS.light);
  });

  it('ignores the OS preference', () => {
    mockPrefersDark(true);
    run();
    expect(appliedTheme()).toBe('light');
  });

  it('applies a stored choice', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    run();
    expect(appliedTheme()).toBe('dark');
    expect(metaColor()).toBe(THEME_COLORS.dark);
  });
});
