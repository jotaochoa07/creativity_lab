"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { StepMarker } from "@/components/ui/StepMarker";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

// UI-only prototype: no backend/Supabase wiring exists yet, so a single
// realistic practice is hardcoded here instead of fetched.
const MOCK_PRACTICE = {
  domain: "Escritura",
  score: 72,
  submittedText: `Llegué tarde, como siempre, y el bar ya olía a cigarrillo viejo y café requemado. Ella estaba en la barra, con las manos alrededor de la taza como si tuviera frío en pleno verano.

Nos sentamos. Hablamos de trabajo, de la familia, de nada en particular. Y entonces pasaron varias cosas que no vienen al caso… De repente ya era de noche y yo caminaba solo hacia casa con las manos en los bolsillos.

Todavía no sé bien qué fue lo que cambió esa noche. Pero cambió.`,
  strength: {
    title: "Especificidad de voz.",
    body: "Nombras objetos y gestos, no emociones abstractas.",
  },
  bottleneck: {
    title: "Tensión / Ritmo.",
    body: "La tensión cae después del hook: resumes en vez de mostrar.",
    quote: "Y entonces pasaron varias cosas que no vienen al caso…",
  },
  nextPractice: {
    title: "Practica economía de escena.",
    body: "Tu siguiente ejercicio: toma ese mismo momento y contalo sin resumir — una sola escena, en tiempo real, sin saltos.",
  },
} as const;

/** Splits text around a verbatim quote and highlights the matched span in context. */
function renderWithHighlight(fullText: string, quote: string): ReactNode {
  const index = fullText.indexOf(quote);
  if (index === -1) return fullText;

  const before = fullText.slice(0, index);
  const after = fullText.slice(index + quote.length);

  return (
    <>
      {before}
      <mark className="rounded bg-loop-feedback-ia/25 px-0.5 text-text-primary">{quote}</mark>
      {after}
    </>
  );
}

export default function FeedbackPage() {
  const [step3Revealed, setStep3Revealed] = useState(false);
  const [textOpen, setTextOpen] = useState(false);
  const step3Ref = useRef<HTMLDivElement>(null);

  // Progressive reveal: step 3 unlocks when the user scrolls it into view
  // (or taps it directly — handled via onClick on the locked block).
  useEffect(() => {
    const node = step3Ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStep3Revealed(true);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const { domain, score, submittedText, strength, bottleneck, nextPractice } = MOCK_PRACTICE;

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-5 py-6 md:px-8 md:py-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl font-semibold md:text-2xl">Tu feedback</h1>
          <span className="text-sm text-text-secondary">{domain}</span>
        </div>
        <ScoreBadge score={score} />
      </header>

      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        {/* Mentor's thread: strength -> bottleneck -> next practice */}
        <div className="flex flex-col gap-6 md:flex-[1.3]">
          <div className="flex gap-3">
            <StepMarker number={1} status="done" />
            <div className="flex flex-col gap-1 pt-0.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-loop-mejora">Fortaleza</span>
              <p className="text-sm leading-normal text-text-secondary">
                <strong className="font-semibold text-text-primary">{strength.title}</strong> {strength.body}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <StepMarker number={2} status="current" />
            <div className="flex flex-col gap-2 pt-0.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-loop-feedback-ia">Cuello de botella</span>
              <p className="text-sm leading-normal text-text-secondary">
                <strong className="font-semibold text-text-primary">{bottleneck.title}</strong> {bottleneck.body}
              </p>
              <blockquote className="rounded-md border-l-2 border-loop-feedback-ia bg-surface px-3 py-2 font-body text-sm italic text-text-secondary">
                «{bottleneck.quote}»
              </blockquote>
            </div>
          </div>

          <div ref={step3Ref} className="flex gap-3">
            <StepMarker number={3} status={step3Revealed ? "current" : "locked"} />
            {step3Revealed ? (
              <div className="flex flex-col gap-1 pt-0.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Siguiente práctica</span>
                <p className="text-sm leading-normal text-text-secondary">
                  <strong className="font-semibold text-text-primary">{nextPractice.title}</strong> {nextPractice.body}
                </p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setStep3Revealed(true)}
                className="flex flex-col items-start gap-1 pt-0.5 text-left"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">Siguiente práctica</span>
                <span className="text-sm text-text-muted">Toca para revelar ▸</span>
              </button>
            )}
          </div>

          {/* Submitted text — collapsed accordion on mobile, closed by default */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setTextOpen((open) => !open)}
              aria-expanded={textOpen}
              className="text-sm font-medium text-link"
            >
              {textOpen ? "Ocultar el texto que subí ▾" : "Ver el texto que subí ▸"}
            </button>
            {textOpen && (
              <p className="mt-3 whitespace-pre-line rounded-lg border border-border bg-surface p-4 text-sm leading-normal text-text-secondary">
                {renderWithHighlight(submittedText, bottleneck.quote)}
              </p>
            )}
          </div>

          <p className="flex items-center gap-2 text-sm text-text-secondary">
            <span className="h-2 w-2 rounded-full bg-state-success" aria-hidden="true" />
            Práctica guardada en tu portfolio
          </p>

          <PrimaryButton className="w-full md:w-fit">Empezar siguiente práctica</PrimaryButton>
        </div>

        {/* Submitted text — always visible side column on desktop */}
        <div className="hidden md:block md:flex-1">
          <h2 className="mb-3 text-sm font-medium text-text-secondary">Tu práctica</h2>
          <p className="whitespace-pre-line rounded-lg border border-border bg-surface p-5 text-sm leading-normal text-text-secondary">
            {renderWithHighlight(submittedText, bottleneck.quote)}
          </p>
        </div>
      </div>
    </div>
  );
}
