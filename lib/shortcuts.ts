import { toggleTheme } from '@lib/theme';

type TShortcutBase = {
  keys: string;
  label: string;
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
];
