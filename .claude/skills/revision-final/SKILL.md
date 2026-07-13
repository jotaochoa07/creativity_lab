---
name: revision-final
description: Use when the user asks for a final pre-launch or pre-demo review of the Creativity Lab site — a full checklist pass driving a real browser against a running URL (mobile viewport, links, placeholder copy, images, tone). Reports a prioritized issue list only; does not fix anything until the user approves.
triggers: [revision final, revisar el sitio, checklist final, pre-launch review, antes de publicar]
---

## When to use

Trigger when the user asks for a final review of the site before sharing, demoing, or launching it — phrases like "revisá el sitio", "hacé la revisión final", "checklist antes de publicar".

Requires a URL to a running instance of the site (local dev server or a deploy). If the user doesn't give one, ask for it before proceeding — do not guess a URL.

## What this skill does NOT do

- Does not fix anything automatically. Report findings and stop.
- Does not touch code, config, or content.
- Does not treat desktop-only issues as blocking — the mobile viewport is the primary target per this project's mobile-first rule (see `CLAUDE.md` section 5).

## Procedure

1. Open the target URL in the Claude Browser at the mobile preset (375x812).
2. Walk every page/route reachable from the main navigation and any CTAs. For each page, run the checklist below.
3. Only after finishing the crawl, produce the prioritized report described in "Output format". Do not fix issues in this pass.

### Checklist (per page)

1. **Mobile layout** — take a screenshot at 375x812. Flag: overflow/horizontal scroll, overlapping elements, text or buttons cut off, tap targets too small to hit reliably.
2. **Navigation and buttons** — click every visible button/link once. Confirm it lands on the expected destination (not a 404, not a dead `#`, not the wrong page). Use `read_network_requests` to catch failed navigations.
3. **Placeholder copy** — scan visible text (`get_page_text`) for filler content: "lorem ipsum", "TODO", "texto de ejemplo", "coming soon" left in a spot that should have real copy, obviously repeated/duplicated placeholder blocks.
4. **Images** — check every `<img>` actually rendered (not broken/blank) via `read_network_requests` filtered to image requests, looking for 404s or failed loads. Also flag missing `alt` text as a lower-priority accessibility note.
5. **Tone of copy** — compare visible UI copy against the hard rule in `CLAUDE.md` section 5: all UI/mentor copy must be in **neutral, professional Spanish**, no slang. Flag copy that is in English, uses slang, or reads inconsistently with the rest of the app.

## Output format

A single prioritized list, most severe first. No fixes, no code changes — just the list.

```
## Revisión final — <url>

### 🔴 Crítico (bloquea publicar)
- [página] descripción del problema — evidencia (screenshot / request / texto encontrado)

### 🟡 Importante (deberías arreglarlo antes de publicar)
- ...

### 🟢 Menor (nice-to-have, no bloquea)
- ...
```

Priority guide:
- 🔴 Critical: broken navigation, 404 images, layout that makes content unusable on mobile, real placeholder text left in production copy.
- 🟡 Important: tone inconsistencies, awkward-but-usable mobile layout, minor broken links (e.g. footer social icons).
- 🟢 Minor: missing alt text, cosmetic nitpicks that don't affect usability or credibility.

If a checklist item finds nothing wrong on a page, don't list it — the report only contains problems found.
