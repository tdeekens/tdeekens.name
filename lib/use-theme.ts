import {
  getAppliedTheme,
  type TTheme,
  toggleTheme,
  syncThemeAcrossTabs,
} from '@lib/theme';
import { useEffect, useSyncExternalStore } from 'react';

// The `<html data-theme>` attribute is the single source of truth: the inline
// script in `_document` sets it before paint and `applyTheme` updates it.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  return () => observer.disconnect();
}

/** `undefined` during SSR and hydration, so server and client markup match. */
export function useTheme(): {
  theme: TTheme | undefined;
  toggleTheme: () => void;
} {
  const theme = useSyncExternalStore(subscribe, getAppliedTheme, () => {
    return undefined;
  });
  return { theme, toggleTheme };
}

/** Mount once (in `_app`) to mirror theme changes from other tabs. */
export function useThemeSync() {
  useEffect(() => syncThemeAcrossTabs(), []);
}
