"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

// Only these two domains are selectable in this round (see wireframe note:
// "SOLO estos dos dominios en esta ronda"). The rest of the skill tree is
// intentionally not exposed on this screen.
const SELECTABLE_DOMAINS = ["Storytelling", "Escritura"] as const;
type Domain = (typeof SELECTABLE_DOMAINS)[number];

export default function NuevaPracticaPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [domain, setDomain] = useState<Domain>("Escritura");
  const [domainMenuOpen, setDomainMenuOpen] = useState(false);
  const [showEmptyError, setShowEmptyError] = useState(false);

  function handleSubmit() {
    if (text.trim() === "") {
      setShowEmptyError(true);
      return;
    }
    setShowEmptyError(false);
    // No backend/Supabase wiring yet — this is a UI-only prototype, so we
    // route straight to the (mocked) feedback digest.
    router.push("/feedback");
  }

  function selectDomain(next: Domain) {
    setDomain(next);
    setDomainMenuOpen(false);
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar: title + domain chip (mobile). Desktop adds the CTA here too. */}
      <header className="flex items-center justify-between border-b border-border px-4 py-3.5 md:px-8 md:py-4">
        <h1 className="font-heading text-base font-semibold md:text-lg">Nueva práctica</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Chip label={`${domain} ▾`} interactive onClick={() => setDomainMenuOpen((open) => !open)} />
            {domainMenuOpen && (
              <>
                <button
                  type="button"
                  aria-label="Cerrar selector de dominio"
                  className="fixed inset-0 z-10 cursor-default"
                  onClick={() => setDomainMenuOpen(false)}
                />
                <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-lg border border-border-strong bg-surface shadow-md">
                  {SELECTABLE_DOMAINS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => selectDomain(option)}
                      className={`block w-full px-4 py-2.5 text-left text-sm transition-colors duration-[120ms] hover:bg-surface-card-hover ${
                        option === domain ? "text-link" : "text-text-primary"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          {/* Wrapper (not the button itself) controls the responsive toggle, so it
              never competes with the button's own unconditional display utility. */}
          <div className="hidden md:block">
            <PrimaryButton className="md:px-5 md:py-2.5 md:text-[13px]" onClick={handleSubmit}>
              Enviar al mentor
            </PrimaryButton>
          </div>
        </div>
      </header>

      {/* Empty-submit error banner — only rendered after a failed submit attempt. */}
      {showEmptyError && (
        <p
          role="alert"
          className="mx-4 mt-3 rounded-md border border-state-error px-3 py-2.5 text-[11.5px] font-medium text-state-error md:mx-8"
        >
          Tu práctica está vacía. Escribe o pega tu texto antes de enviar.
        </p>
      )}

      {/* Real blank sheet: no toolbar, no formatting, no autocomplete/suggestions, no attachments. */}
      <div className="flex flex-1 justify-center px-4 py-4 md:px-8 md:py-7">
        <textarea
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            if (showEmptyError && event.target.value.trim() !== "") {
              setShowEmptyError(false);
            }
          }}
          placeholder="Escribe o pega tu práctica aquí…"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          className="w-full max-w-xl flex-1 resize-none bg-transparent font-body text-base leading-normal text-text-primary placeholder:text-text-muted focus:outline-none"
        />
      </div>

      {/* Mobile-only footer CTA (desktop puts the button in the top bar). */}
      <div className="border-t border-dashed border-border px-4 py-3.5 md:hidden">
        <PrimaryButton className="w-full" onClick={handleSubmit}>
          Enviar al mentor
        </PrimaryButton>
      </div>
    </div>
  );
}
