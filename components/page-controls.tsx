import ThemeToggle from '@components/theme-toggle';
import { useShortcutsEnabled } from '@lib/shortcuts-preference';

type TPageControlsProps = {
  onOpenShortcuts: () => void;
};

/**
 * Top-right controls. Positioned against the page (scrolls away) rather than
 * the viewport so they never float over content. Hidden without JavaScript via
 * `[data-page-controls]` in tailwind.css, since neither control works then.
 */
function PageControls(props: TPageControlsProps) {
  const shortcutsEnabled = useShortcutsEnabled();

  return (
    <div
      data-page-controls
      className="absolute top-4 right-4 z-40 flex items-center gap-1 print:hidden"
    >
      <button
        type="button"
        onClick={props.onOpenShortcuts}
        aria-label="Keyboard shortcuts"
        aria-haspopup="dialog"
        aria-keyshortcuts={shortcutsEnabled ? '?' : undefined}
        title={
          shortcutsEnabled ? 'Keyboard shortcuts (?)' : 'Keyboard shortcuts'
        }
        className="flex items-center justify-center w-8 h-8 rounded-full text-muted hover:text-link-hover focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-focus"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" />
        </svg>
      </button>
      <ThemeToggle />
    </div>
  );
}

export default PageControls;
