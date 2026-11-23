import { useShortcutsEnabled } from '@lib/shortcuts-preference';
import { useTheme } from '@lib/use-theme';
import { useEffect, useRef, useState } from 'react';

const ANNOUNCEMENTS = {
  dark: 'Dark theme on',
  light: 'Light theme on',
} as const;

/**
 * A toggle button with a fixed name and `aria-pressed`, which screen readers
 * announce reliably ("Dark theme, toggle button, pressed"). Changes not made
 * via the focused button (the `t` shortcut, another tab, the OS) are announced
 * through a polite live region instead.
 *
 * Both icons are always rendered and CSS picks one from `<html data-theme>`,
 * so the server markup never needs to know the theme.
 */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const shortcutsEnabled = useShortcutsEnabled();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const previousTheme = useRef(theme);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const previous = previousTheme.current;
    previousTheme.current = theme;
    const changed = previous !== undefined && theme !== previous;
    if (theme && changed && document.activeElement !== buttonRef.current) {
      setAnnouncement(ANNOUNCEMENTS[theme]);
    }
  }, [theme]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleTheme}
        aria-label="Dark theme"
        // Unknown until hydrated; omitting it avoids a server/client mismatch.
        aria-pressed={theme === undefined ? undefined : theme === 'dark'}
        aria-keyshortcuts={shortcutsEnabled ? 't' : undefined}
        title={shortcutsEnabled ? 'Dark theme (t)' : 'Dark theme'}
        data-theme-toggle
        className="flex items-center justify-center w-8 h-8 rounded-full text-muted hover:text-link-hover focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-focus"
      >
        {/* Moon: shown in light mode. */}
        <svg
          aria-hidden="true"
          className="w-5 h-5 dark:hidden"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
        {/* Sun: shown in dark mode. */}
        <svg
          aria-hidden="true"
          className="hidden w-5 h-5 dark:block"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </button>
      <span role="status" className="sr-only">
        {announcement}
      </span>
    </>
  );
}

export default ThemeToggle;
