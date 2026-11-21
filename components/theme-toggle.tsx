import { useTheme } from '@lib/use-theme';

/**
 * Fixed top-right switch. Both icons are always rendered and CSS picks one
 * from `<html data-theme>`, so the server markup never needs to know the theme.
 */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const label =
    theme === 'dark'
      ? 'Switch to light theme'
      : theme === 'light'
        ? 'Switch to dark theme'
        : 'Toggle colour theme';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={`${label} (t)`}
      data-theme-toggle
      className="fixed top-4 right-4 z-40 flex items-center justify-center w-8 h-8 rounded-full text-muted hover:text-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus print:hidden"
    >
      {/* Moon: shown in light mode (switches to dark). */}
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
      {/* Sun: shown in dark mode (switches to light). */}
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
  );
}

export default ThemeToggle;
