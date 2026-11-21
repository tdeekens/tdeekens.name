export type TTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

/** Matches `--color-bg` per theme; used for `<meta name="theme-color">`. */
export const THEME_COLORS: Record<TTheme, string> = {
  light: '#ffffff',
  dark: '#1f1f28',
};

/** Shown until the visitor picks a theme. The OS preference is ignored. */
export const DEFAULT_THEME: TTheme = 'light';

function isTheme(value: unknown): value is TTheme {
  return value === 'light' || value === 'dark';
}

export function getStoredTheme(): TTheme | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
}

export function getAppliedTheme(): TTheme | undefined {
  const value = document.documentElement.dataset.theme;
  return isTheme(value) ? value : undefined;
}

/**
 * Applies a theme to the document without persisting it. Transitions are
 * suppressed for a frame so nothing animates half-way between palettes.
 */
export function applyTheme(theme: TTheme) {
  const root = document.documentElement;
  if (root.dataset.theme === theme) {
    return;
  }

  const style = document.createElement('style');
  style.textContent = '*,*::before,*::after{transition:none!important}';
  document.head.append(style);

  root.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLORS[theme]);

  // Force a style recalc with transitions disabled, then re-enable them.
  window.getComputedStyle(root).getPropertyValue('color');
  window.requestAnimationFrame(() => style.remove());
}

/** Applies and persists an explicit choice. */
export function setTheme(theme: TTheme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode or storage disabled: the choice lasts for this page only.
  }
  applyTheme(theme);
}

export function toggleTheme() {
  setTheme(getAppliedTheme() === 'dark' ? 'light' : 'dark');
}

function onStorage(event: StorageEvent) {
  if (event.key === THEME_STORAGE_KEY || event.key === null) {
    applyTheme(getStoredTheme() ?? DEFAULT_THEME);
  }
}

/** Mirrors choices made in other tabs. Returns a cleanup function. */
export function syncThemeAcrossTabs(): () => void {
  window.addEventListener('storage', onStorage);
  return () => window.removeEventListener('storage', onStorage);
}

/**
 * Inlined into `<head>` by `_document` so the theme is set before first paint.
 * Must stay dependency-free and ES5-safe.
 */
export const themeInitScript = `(function(){var t;try{t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})}catch(e){}if(t!=="light"&&t!=="dark"){t=${JSON.stringify(DEFAULT_THEME)}}document.documentElement.setAttribute("data-theme",t);var m=document.querySelector('meta[name="theme-color"]');if(m){m.setAttribute("content",t==="dark"?${JSON.stringify(
  THEME_COLORS.dark,
)}:${JSON.stringify(THEME_COLORS.light)})}})();`;
