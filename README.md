# Creativity Lab

Plataforma de entrenamiento de habilidades creativas y profesionales, con la metáfora de un **gimnasio**: el usuario entra, practica, y un **mentor AI** lo asiste, lo evalúa y lo empuja a mejorar.

La documentación completa del proyecto (visión, decisiones tomadas, stack, convenciones y pendientes) vive en [CLAUDE.md](./CLAUDE.md) — es el documento vivo que guía el desarrollo.

## Primer vertical: Creator Lab

Enseña storytelling y creación de contenido, organizado como skill tree de dominios entrenables (no como pipeline de producción). Ver el mapa completo de dominios en [docs/creator-lab-domains.md](./docs/creator-lab-domains.md).

## Estructura del repositorio

```
/CLAUDE.md              → documento vivo con la visión, decisiones y convenciones del proyecto
/docs                   → documentación de producto (mapa de dominios, specs, etc.)
/assets/design          → recursos visuales (paletas, referencias de diseño)
/.atl                    → registro de skills de Spec-Driven Development (SDD)
```

A medida que arranque el código, se suman `/core` (motor genérico: auth, curriculum, mentor, gamification, portfolio) y `/features` (verticales concretos, empezando por `creator-lab`) — ver la sección de estructura de carpetas en [CLAUDE.md](./CLAUDE.md).

## Stack técnico

- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS
- **Backend/DB**: Supabase (Postgres + Auth + Storage + Realtime)
- **Mentor AI**: Claude vía Anthropic API, con feedback estructurado (tool-use / rúbricas)

## Estado actual

Proyecto en etapa de definición (sin código todavía). Ver la sección "Pendiente" en [CLAUDE.md](./CLAUDE.md) para las próximas decisiones.
