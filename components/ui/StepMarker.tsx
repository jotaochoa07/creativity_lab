export type StepStatus = "done" | "current" | "locked";

type StepMarkerProps = {
  number: number;
  status: StepStatus;
  className?: string;
};

const STATUS_CLASSES: Record<StepStatus, string> = {
  done: "border-loop-mejora text-loop-mejora",
  current: "border-loop-feedback-ia text-loop-feedback-ia",
  locked: "border-border text-text-muted",
};

/** Numbered circle marking a step in the mentor's feedback thread (done / current / locked). */
export function StepMarker({ number, status, className = "" }: StepMarkerProps) {
  return (
    <span
      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 font-heading text-sm font-semibold ${STATUS_CLASSES[status]} ${className}`}
    >
      {number}
    </span>
  );
}
