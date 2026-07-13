---
name: verify-after-changes
description: "Trigger: implementación terminada, probar cambios, verificar en el navegador, listo para probar. After finishing a plan's implementation, launch the app, test 5 key cases in a real browser against the spec/plan, fix gaps, and re-verify."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
triggers: [implementación terminada, probar cambios, verificar en el navegador, listo para probar, terminé el plan]
---

## Activation Contract

Trigger when Claude Code judges that a plan/spec's implementation is functionally complete and the next step is verification, not more code. Also trigger on explicit requests: "probá los cambios", "verificá en el navegador", "¿ya está listo?". Skip when the change has no runtime surface (docs-only, config-only, pure refactor with no behavior change) — there's nothing to observe in a browser.

## Hard Rules

- Test against a REAL running instance — start the dev server and drive an actual browser. Type-checking, unit tests, or reading the diff do not substitute for this.
- Never declare the work done without having exercised the actual behavior described in the spec/plan.
- Pick exactly 5 test cases, prioritized by what the plan/spec calls the core behavior — not 5 arbitrary clicks. If the spec/plan describes fewer than 5 meaningful cases, add edge/error cases to reach 5.
- Compare every observed result explicitly against the spec (`docs/specs/*.md`, if one exists for this change) and the plan — not against a general "looks fine."
- If any of the 5 cases fails or falls short of the stated goal, fix it and re-run the FULL 5-case pass again before giving a green light — do not spot-check only the fixed case.
- Only declare green light after a complete passing browser pass, not right after applying a fix.

## Decision Gates

| Situation | Action |
|---|---|
| A matching `docs/specs/*.md` exists | Compare results against its "Comportamiento esperado" and "Posibles errores y mitigaciones" sections |
| No spec file, only a plan/conversation | Compare results against the plan's stated goal directly |
| All 5 cases pass | Green light, report done |
| Any case fails | Fix, then re-run all 5 cases before re-declaring |

## Execution Steps

1. Identify the relevant artifact: check `docs/specs/` for a matching file; otherwise use the plan discussed in-conversation.
2. Start the dev server (check `.claude/launch.json`; create it if missing).
3. From the plan/spec, pick the 5 most important test cases — the core golden path plus the highest-risk edge cases.
4. Drive each case in a real browser (Claude Browser tools): navigate, interact, observe actual behavior, screenshot when the result isn't obvious from text alone.
5. For each case, record expected (from spec/plan) vs. observed. Flag mismatches.
6. If all 5 pass: report green light with a one-line summary per case.
7. If any fail: fix the code, then re-run the full 5-case pass again (not just the failed case) before reporting.

## Output Contract

Return:
- Server/URL used to test.
- The 5 test cases chosen and why they're the most important.
- Pass/fail per case, mapped to the spec/plan section it verifies.
- If fixes were applied: what changed, and confirmation the full 5-case pass was re-run afterward.
- Final verdict: green light, or still blocked (with what's blocking).

## References

- `docs/specs/*.md` — spec files from the `design-spec` skill, used as the comparison baseline when one exists for this change.
- `.claude/launch.json` — dev server config consumed by the Claude Browser preview tools.
