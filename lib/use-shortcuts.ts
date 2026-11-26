import { shortcutsFor } from '@lib/shortcuts';
import { useShortcutsEnabled } from '@lib/shortcuts-preference';
import { useEffect } from 'react';
import { tinykeys } from 'tinykeys';

import { navigate } from './navigate';

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  return target.matches('input, textarea, select, [contenteditable="true"]');
}

/** `pathname` scopes page-specific shortcuts, e.g. `/` on the blogroll. */
export function useShortcuts(pathname: string, onHelp: () => void) {
  const enabled = useShortcutsEnabled();

  useEffect(() => {
    // All of these are character-key shortcuts (WCAG 2.1.4), so the off
    // switch disables every one of them, including `?`. The visible keyboard
    // button in the page controls remains the way back to the dialog.
    if (!enabled) {
      return;
    }

    const map: Record<string, (e: KeyboardEvent) => void> = {
      'Shift+?': (e) => {
        if (isEditableTarget(e.target)) {
          return;
        }
        e.preventDefault();
        onHelp();
      },
    };

    for (const shortcut of shortcutsFor(pathname)) {
      map[shortcut.keys] = (e) => {
        if (isEditableTarget(e.target)) {
          return;
        }
        if (shortcut.action) {
          // Keeps e.g. `/` from being typed into the field it focuses, and
          // from opening Firefox's quick find.
          e.preventDefault();
          shortcut.action();
          return;
        }
        navigate(shortcut.path);
      };
    }

    return tinykeys(window, map);
  }, [pathname, onHelp, enabled]);
}
