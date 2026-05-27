import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { tinykeys } from 'tinykeys';
import { shortcuts } from '@lib/shortcuts';

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.matches('input, textarea, select, [contenteditable="true"]');
}

export function useShortcuts(onHelp: () => void) {
  const router = useRouter();

  useEffect(() => {
    const map: Record<string, (e: KeyboardEvent) => void> = {
      'Shift+?': (e) => {
        if (isEditableTarget(e.target)) return;
        e.preventDefault();
        onHelp();
      },
    };

    for (const { keys, path } of shortcuts) {
      map[keys] = (e) => {
        if (isEditableTarget(e.target)) return;
        router.push(path);
      };
    }

    return tinykeys(window, map);
  }, [router, onHelp]);
}
