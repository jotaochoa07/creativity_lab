---
name: jota-sdd
description: "Trigger: jota-sdd, spec completa, brief técnico, especificación de 12 secciones. Draft a full 12-section spec (resumen, objetivo, alcance, entradas/salidas, flujo, casos de uso, reglas, errores, criterios de aceptación, restricciones técnicas, futuras versiones) before implementation starts."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
triggers: [jota-sdd, spec completa, brief técnico, especificación completa, 12 secciones]
---

## Activation Contract

Trigger before starting a feature/change substantial enough to need a full product+technical contract — real inputs/outputs, multiple use cases, or error states worth documenting up front. Also trigger on explicit requests: "hacé la spec completa", "SDD vJota", "brief técnico". Skip for trivial fixes with no real contract to define — there this is overkill.

## Hard Rules

- Output is documentation only — never touch code.
- Follow the exact 12-section structure in `assets/template.md`, in that order. Never skip a section; write "N/A" with a one-line reason if it truly doesn't apply.
- Section 1 (Resumen) is capped at 10 lines and answers only: qué se construye, para quién, resultado final — no implementation detail.
- Section 3 (Alcance) MUST be split into "Incluye" / "No incluye" as two separate blocks — never one merged list. This is what stops "ya que estamos..." scope creep.
- Sections 8 (Reglas), 9 (Manejo de errores) and 10 (Criterios de aceptación) must be concrete and checkable — no vague statements.
- Section 12 (Futuras versiones) exists to catch tempting-but-not-V1 ideas — anything that doesn't belong in section 3's "Incluye" goes here instead of getting silently dropped.
- Never invent facts, inputs, or error cases the user hasn't confirmed — ask instead of guessing.
- Write the document in neutral, professional Spanish — this repo's `docs/` convention (see `CLAUDE.md` section 5).

## Decision Gates

| Situation | Action |
|---|---|
| Change has real inputs/outputs, multiple use cases, error states worth planning | Use this skill |
| Change is a quick one-off tweak with no real contract | Skip — no spec needed |
| Unsure whether a section applies | Draft all 12; mark not-applicable ones explicitly rather than omitting them |

## Execution Steps

1. Read `assets/template.md` for the exact section skeleton and worked examples.
2. Confirm with the user (one question at a time) whatever is still missing among: qué se construye, para quién, qué entra, qué sale, y el límite del alcance V1.
3. Draft `docs/specs/YYYY-MM-DD-title.md` following the 12 sections in order, using today's date and a kebab-case title.
4. Before presenting: verify Alcance is split Incluye/No incluye, Manejo de errores covers at minimum empty input / missing required field / unreadable source / contradictory data, and every Criterio de aceptación is a checkable ✓/✗ item.
5. Present the draft for review — it isn't final until the user confirms it.

## Output Contract

Return:
- Path to the created file.
- One-line summary: qué se construye / para quién / resultado final.
- Any section marked N/A, and why.
- Any open questions still unresolved before implementation can start.

## References

- `assets/template.md` — full 12-section skeleton with a worked example per section.
- `CLAUDE.md` section 5 — Spanish copy convention for product-facing docs.
