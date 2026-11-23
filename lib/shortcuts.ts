import { BLOGROLL_SEARCH_ID } from '@lib/blogroll-search';
import { toggleTheme } from '@lib/theme';

type TShortcutBase = {
  keys: string;
  label: string;
  /** Only active (and listed in the help) on this route, e.g. '/blogroll'. */
  onlyOn?: string;
};

/** Either navigates to `path` or runs `action`. */
export type TShortcut = TShortcutBase &
  ({ path: string; action?: never } | { action: () => void; path?: never });

export const shortcuts: TShortcut[] = [
  { keys: 'g h', path: '/', label: 'Home' },
  { keys: 'g c', path: '/curriculum-vitae', label: 'Curriculum vitae' },
  { keys: 'g b', path: '/bookshelf', label: 'Bookshelf' },
  { keys: 'g r', path: '/blogroll', label: 'Blogroll' },
  { keys: 'g j', path: '/jukebox', label: 'Jukebox' },
  { keys: 'g d', path: '/cooking-diary', label: 'Cooking diary' },
  { keys: 'g n', path: '/nonsense', label: 'Nonsense' },
  { keys: 't', action: toggleTheme, label: 'Toggle dark / light theme' },
  {
    keys: '/',
    action: () => document.getElementById(BLOGROLL_SEARCH_ID)?.focus(),
    label: 'Search the blogroll',
    onlyOn: '/blogroll',
  },
];

/** Shortcuts that apply on `pathname`. */
export function shortcutsFor(pathname: string): TShortcut[] {
  return shortcuts.filter(
    (shortcut) => !shortcut.onlyOn || shortcut.onlyOn === pathname,
  );
}
