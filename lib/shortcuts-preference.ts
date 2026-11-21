import { useSyncExternalStore } from 'react';

/**
 * Single-character shortcuts must be switchable off (WCAG 2.1.4), e.g. so
 * speech-input users don't trigger them by accident. On by default.
 */
export const SHORTCUTS_STORAGE_KEY = 'shortcuts';
const CHANGE_EVENT = 'shortcuts-preference-change';

export function getShortcutsEnabled(): boolean {
  try {
    return window.localStorage.getItem(SHORTCUTS_STORAGE_KEY) !== 'off';
  } catch {
    return true;
  }
}

export function setShortcutsEnabled(enabled: boolean) {
  try {
    if (enabled) {
      window.localStorage.removeItem(SHORTCUTS_STORAGE_KEY);
    } else {
      window.localStorage.setItem(SHORTCUTS_STORAGE_KEY, 'off');
    }
  } catch {
    // Storage unavailable: the choice lasts for this page only.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === SHORTCUTS_STORAGE_KEY || event.key === null) {
      onChange();
    }
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onStorage);
  };
}

const serverSnapshot = () => true;

export function useShortcutsEnabled(): boolean {
  return useSyncExternalStore(subscribe, getShortcutsEnabled, serverSnapshot);
}
