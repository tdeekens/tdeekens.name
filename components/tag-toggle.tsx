type TTagToggleProps = {
  tag: string;
  pressed: boolean;
  onToggle: (tag: string) => void;
  /** Shown next to the tag in the filter bar; omitted on entries. */
  count?: number;
  /** Accessible name override, e.g. "Filter by tag: ai" on entries. */
  label?: string;
};

/**
 * A tag that toggles the blogroll filter. Unpressed tags are outlined;
 * pressed ones invert to text colour on background colour (the same pairing
 * as the Send button hover), so contrast is known-good in both themes.
 */
function TagToggle(props: TTagToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={props.pressed}
      aria-label={props.label}
      onClick={() => props.onToggle(props.tag)}
      className={[
        'inline-flex items-baseline gap-1 text-xs px-1.5 py-0.5 rounded-full border transition-colors',
        'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-focus',
        props.pressed
          ? 'bg-fg text-bg border-fg'
          : 'border-line-soft text-subtle hover:bg-surface-2',
      ].join(' ')}
    >
      <span>{props.tag}</span>
      {/* Separates tag and count in the accessible name ("ai 12 posts"); flex
        layout drops whitespace-only text, so nothing changes visually. */}
      {props.count !== undefined && ' '}
      {props.count !== undefined && (
        <span className="tabular-nums">
          {props.count} <span className="sr-only">posts</span>
        </span>
      )}
    </button>
  );
}

export default TagToggle;
