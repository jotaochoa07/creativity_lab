type ScoreBadgeProps = {
  score: number;
  max?: number;
  className?: string;
};

/** Compact 0-100 score badge shown at the top of the feedback digest. */
export function ScoreBadge({ score, max = 100, className = "" }: ScoreBadgeProps) {
  return (
    <span
      className={`inline-flex items-baseline gap-0.5 rounded-full border border-border-strong bg-surface px-4 py-2 font-heading text-xl font-semibold text-text-primary ${className}`}
    >
      {score}
      <small className="text-sm font-normal text-text-muted">/{max}</small>
    </span>
  );
}
