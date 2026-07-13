type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * The single call-to-action button pattern shared by practice submission
 * and feedback screens. Uses the brand accent (link cyan) rather than a
 * loop-stage color, since it is a generic interactive element, not content
 * tied to a specific stage of the training loop.
 */
export function PrimaryButton({ className = "", children, ...props }: PrimaryButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full bg-link px-6 py-3 text-sm font-semibold text-bg-primary transition-colors duration-[120ms] ease-standard hover:bg-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
