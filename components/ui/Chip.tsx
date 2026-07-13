type ChipBaseProps = {
  label: string;
  className?: string;
};

type ChipProps =
  | (ChipBaseProps & { interactive: true; onClick: () => void })
  | (ChipBaseProps & { interactive?: false; onClick?: never });

const BASE_CLASSES =
  "inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface px-4 py-1.5 text-sm font-medium text-text-primary";

/** Small pill used both as a static tag and as an interactive dropdown trigger (e.g. domain selector). */
export function Chip(props: ChipProps) {
  const { label, className = "" } = props;

  if (props.interactive) {
    return (
      <button
        type="button"
        onClick={props.onClick}
        className={`${BASE_CLASSES} cursor-pointer transition-colors duration-[120ms] hover:bg-surface-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${className}`}
      >
        {label}
        <ChevronIcon />
      </button>
    );
  }

  return <span className={`${BASE_CLASSES} ${className}`}>{label}</span>;
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" className="h-3 w-3 stroke-text-secondary" fill="none" strokeWidth="1.5">
      <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
