import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">Creativity Lab</h1>
        <p className="text-text-secondary">Gimnasio para creadores.</p>
      </div>
      <nav className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/practica/nueva"
          className="rounded-full border border-border-strong bg-surface px-6 py-3 text-sm font-medium text-text-primary transition-colors duration-[120ms] hover:bg-surface-card-hover"
        >
          Nueva práctica
        </Link>
        <Link
          href="/feedback"
          className="rounded-full border border-border-strong bg-surface px-6 py-3 text-sm font-medium text-text-primary transition-colors duration-[120ms] hover:bg-surface-card-hover"
        >
          Ver feedback de ejemplo
        </Link>
      </nav>
    </div>
  );
}
