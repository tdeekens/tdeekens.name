import { useEffect } from 'react';
import { shortcuts } from '@lib/shortcuts';

type TShortcutsHelpProps = {
  open: boolean;
  onClose: () => void;
};

function ShortcutsHelp(props: TShortcutsHelpProps) {
  useEffect(() => {
    if (!props.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') props.onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [props.open, props.onClose]);

  if (!props.open) return null;

  const allRows = [
    ...shortcuts.map((s) => ({ keys: s.keys, label: s.label })),
    { keys: '?', label: 'Show this help' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm print:hidden"
      onClick={props.onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
    >
      <div
        className="w-full max-w-sm mx-4 overflow-hidden bg-white rounded-md shadow-2xl font-mono text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
          <h2 className="font-semibold text-gray-700">Keyboard shortcuts</h2>
          <span className="text-[10px] text-gray-400">esc to close</span>
        </div>
        <ul className="px-2 py-2">
          {allRows.map((row) => (
            <li
              key={row.keys}
              className="flex items-center justify-between px-2 py-1.5"
            >
              <span className="text-gray-700">{row.label}</span>
              <span className="flex gap-1">
                {row.keys.split(' ').map((k, i) => (
                  <kbd
                    key={i}
                    className="px-1.5 min-w-[1.5rem] text-center py-0.5 text-[11px] text-gray-700 bg-gray-100 border border-gray-300 rounded shadow-[0_1px_0_0_rgba(0,0,0,0.08)]"
                  >
                    {k}
                  </kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ShortcutsHelp;
