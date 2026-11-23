import { shortcutsFor } from '@lib/shortcuts';
import {
  setShortcutsEnabled,
  useShortcutsEnabled,
} from '@lib/shortcuts-preference';
import { useEffect, useRef } from 'react';

type TShortcutsHelpProps = {
  open: boolean;
  onClose: () => void;
  /** Current route; page-specific shortcuts are listed only there. */
  pathname: string;
};

/**
 * Native modal `<dialog>`: the browser traps focus, makes the page inert,
 * closes on Escape and returns focus to the opener on close.
 */
function ShortcutsHelp(props: TShortcutsHelpProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const enabled = useShortcutsEnabled();
  const rows = [
    ...shortcutsFor(props.pathname).map((s) => ({
      keys: s.keys,
      label: s.label,
    })),
    { keys: '?', label: 'Show this help' },
  ];

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) {
      return;
    }
    if (props.open && !dialog.open) {
      dialog.showModal();
    } else if (!props.open && dialog.open) {
      dialog.close();
    }
  }, [props.open]);

  return (
    // Backdrop click is a mouse convenience; keyboard users have Escape
    // (native) and the Close button.
    // oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={ref}
      aria-labelledby="shortcuts-help-title"
      onClose={props.onClose}
      onClick={(event) => {
        // Clicks on the backdrop target the dialog element itself.
        if (event.target === event.currentTarget) {
          props.onClose();
        }
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-sm p-0 overflow-hidden bg-surface text-fg rounded-md shadow-2xl font-mono text-xs backdrop:bg-black/60 backdrop:backdrop-blur-sm print:hidden"
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-line-faint bg-surface-muted">
        <h2 id="shortcuts-help-title" className="font-semibold text-fg-soft">
          Keyboard shortcuts
        </h2>
        <button
          type="button"
          onClick={props.onClose}
          className="text-[10px] text-fg-soft hover:text-fg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-focus rounded px-1"
        >
          Close (esc)
        </button>
      </div>
      <ul
        className={`px-2 py-2 ${enabled ? '' : 'opacity-50'}`}
        aria-label={enabled ? undefined : 'Shortcuts (currently off)'}
      >
        {rows.map((row) => (
          <li
            key={row.keys}
            className="flex items-center justify-between px-2 py-1.5"
          >
            <span className="text-fg-soft">{row.label}</span>
            <span className="flex gap-1">
              {row.keys.split(' ').map((k, i) => (
                <kbd
                  key={i}
                  className="px-1.5 min-w-[1.5rem] text-center py-0.5 text-[11px] text-fg-soft bg-surface-2 border border-line-soft rounded shadow-[0_1px_0_0_rgba(0,0,0,0.08)]"
                >
                  {k}
                </kbd>
              ))}
            </span>
          </li>
        ))}
      </ul>
      <label className="flex items-center justify-between gap-4 px-4 py-2 border-t border-line-faint cursor-pointer">
        <span className="text-fg-soft">Enable single-key shortcuts</span>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(event) => setShortcutsEnabled(event.target.checked)}
          className="w-4 h-4 accent-focus focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-focus"
        />
      </label>
    </dialog>
  );
}

export default ShortcutsHelp;
