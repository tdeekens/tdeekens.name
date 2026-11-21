import { shortcuts } from '@lib/shortcuts';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { tinykeys } from 'tinykeys';

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  return target.matches('input, textarea, select, [contenteditable="true"]');
}

export function useShortcuts(onHelp: () => void) {
  const router = useRouter();

  useEffect(() => {
    const map: Record<string, (e: KeyboardEvent) => void> = {
      'Shift+?': (e) => {
        if (isEditableTarget(e.target)) {
          return;
        }
        e.preventDefault();
        onHelp();
      },
    };

    for (const shortcut of shortcuts) {
      map[shortcut.keys] = (e) => {
        if (isEditableTarget(e.target)) {
          return;
        }
        if (shortcut.action) {
          shortcut.action();
          return;
        }
        router.push(shortcut.path);
      };
    }

    return tinykeys(window, map);
  }, [router, onHelp]);
}
