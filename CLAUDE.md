# Creativity Lab — CLAUDE.md

> Documento vivo. Versión 1 (boceto inicial). Se actualiza a medida que tomamos decisiones nuevas.

## 1. Qué es el proyecto

**Creativity Lab** es una plataforma de entrenamiento de habilidades creativas y profesionales, con la metáfora de un **gimnasio**: el usuario entra, practica, y un **mentor AI** lo asiste, lo evalúa y lo empuja a mejorar — igual que un coach de gimnasio revisa tu forma y ajusta tu rutina.

La plataforma está organizada en **verticales** (uno por habilidad/disciplina). El primer producto mínimo viable es:

### Creator Lab (MVP — primer vertical)

Enseña **storytelling y creación de contenido**. No se organiza como pipeline de producción (guion → edición → hooks) ni por herramienta — se organiza como **skill tree de dominios entrenables**, igual que un gimnasio organiza por capacidad (fuerza, resistencia, técnica) y no por máquina.

Mapa completo de dominios (20, del 0 al 19): [`docs/creator-lab-domains.md`](docs/creator-lab-domains.md).

**Dominios del MVP:** Entendimiento de Audiencia, Storytelling, Escritura, Edición, Analítica, Iteración. El resto del skill tree queda visible como "Próximamente" (bloqueado), estilo Duolingo.

Al final, cada usuario tiene un **portfolio/repositorio de proyectos** (tipo Notion) que le sirve para conseguir trabajo, mostrar su evolución o monetizar.

## 2. Para quién

- Solopreneurs que quieren posicionar marca personal
- Pequeñas empresas diseñando estrategia de contenido propia
- Jóvenes que quieren ser creadores de contenido / influencers

## 3. El loop central del producto

Esto es el corazón de Creativity Lab y debe mantenerse igual sin importar el vertical.

Cada **dominio entrenable** (ver `docs/creator-lab-domains.md`) sigue siempre el mismo ciclo de 8 pasos — es un motor genérico, no se reconstruye por dominio:

1. Fundamentos → 2. Demostraciones → 3. Prácticas guiadas → 4. Retos → 5. Feedback de IA → 6. Repetición deliberada → 7. Métricas de progreso → 8. Portafolio

- **Práctica deliberada**: se aprende haciendo, no viendo video pasivo
- **Mentor AI**: da feedback estructurado sobre el trabajo real del usuario (no charla genérica)
- **Gamificación tipo Duolingo**: streaks, XP, recompensas por sesiones de foco (ej: 60 min seguidos de trabajo), métricas de progreso por dominio
- **Sistema Operativo del Creador**: calendario editorial, revisión semanal, biblioteca de activos — vive dentro del portfolio, no es un dominio del skill tree
- **Portfolio final**: repositorio reutilizable para trabajo/monetización

Cuando llegue un vertical nuevo (ej: escultura — el usuario sube fotos y el mentor lo asesora), el motor de dominio entrenable, mentor, gamificación y portfolio **deben ser reutilizables**, no exclusivos de Creator Lab.

## 4. Decisiones tomadas

### Stack técnico

| Capa | Decisión |
|---|---|
| Plataforma | Web app **mobile-first** (no nativa en el MVP) |
| Frontend | Next.js (App Router) + TypeScript + Tailwind CSS |
| Backend/DB | Supabase (Postgres + Auth + Storage + Realtime) |
| Mentor AI | Claude vía Anthropic API — feedback estructurado con tool-use (rúbricas/scoring), no solo chat libre |
| Alcance del mentor en MVP | Feedback por **texto/chat únicamente**. Análisis de archivos (video/imagen) queda fuera del MVP, se agrega en un vertical futuro |
| Organización de código | Sin monorepo todavía. Un solo Next.js app con carpetas por feature. Se reevalúa monorepo (ej. Turborepo) recién cuando exista un segundo vertical real |

### Estructura de carpetas (propuesta inicial)

```
/core
  /auth
  /curriculum      → motor genérico de "dominio entrenable": fundamentos, demostraciones,
                      prácticas guiadas, retos, repetición deliberada (usa /mentor y /gamification)
  /mentor          → orquestación del mentor AI, rúbricas por dominio, feedback estructurado
  /gamification    → XP, streaks, rachas de foco, métricas de progreso, badges
  /portfolio       → repositorio de proyectos, "Sistema Operativo del Creador"
                      (calendario editorial, revisión semanal, biblioteca de activos)
/features
  /creator-lab
    /dominios      → configuración de cada dominio del MVP (audiencia, storytelling,
                      escritura, edición, analítica, iteración) sobre el motor /core/curriculum
```

### Convenciones de nombres

- Componentes React: `PascalCase`
- Funciones, variables, hooks: `camelCase`
- Archivos y rutas: `kebab-case`
- Identificadores, comentarios y nombres de archivo de código: **en inglés** (estándar, evita mezclar idiomas en el código)

### Colores y tipografía

**Pendiente de definir** — todavía no hay identidad de marca. Punto de partida sugerido para no bloquear el desarrollo del MVP (a revisar y reemplazar cuando definamos diseño en serio):

- Paleta neutra (grises/negro/blanco) + un solo color de acento
- Tipografía: system font stack o Inter, sin mezclar más de 2 familias
- Sin degradados hasta que se decida lo contrario (a confirmar como regla dura o no)

## 5. Reglas duras

- **Todo el copy/UI de la app en español** (neutro/profesional, no slang). Esto aplica a textos de interfaz, mensajes del mentor y contenido visible al usuario.
- **El código va en inglés** (identificadores, nombres de archivo, comentarios) — separado del punto anterior. El copy es español, el código es inglés.
- **Mobile-first**: todo diseño y layout se piensa primero para pantalla chica.
- Sin degradados: **por confirmar** (ver sección 4, pendiente).

## 6. Qué existe ya

Nada de código todavía. El proyecto arranca de cero. Lo que sí existe:

- `CLAUDE.md` (este archivo)
- `README.md` — presentación del repo y punto de entrada para quien lo abre por primera vez
- `docs/creator-lab-domains.md` — mapa completo de los 20 dominios del skill tree y estado de cada uno (MVP vs próximamente)
- `assets/design/paleta-colores.png` — referencia visual de paleta de colores (todavía no confirmada como decisión final, ver sección 4)
- `.atl/skill-registry.md` — registro de skills de una inicialización previa de SDD

Repositorio en GitHub: [jotaochoa07/creativity_lab](https://github.com/jotaochoa07/creativity_lab).

Esta sección se actualiza a medida que se creen páginas/secciones reales, para no reconstruir trabajo ya hecho.

## 7. Cómo trabajamos (Skills y Loops)

- Usamos **Skills** de Claude Code para tareas específicas del flujo (SDD: explore → propose → spec → design → tasks → apply → verify → archive) en vez de improvisar cada vez.
- Usamos **Loops** para trabajo recurrente/iterativo cuando aplique (ej: ciclos de mejora de UX progresiva).
- El ciclo SDD se usa para features no triviales; cambios chicos/mecánicos se hacen directo.

## 8. Pendiente (próxima iteración)

- [ ] Definir paleta de colores y tipografía reales
- [ ] Confirmar si "sin degradados" es regla dura definitiva
- [ ] Definir modelo de datos del motor `/core/curriculum` (dominio, paso del ciclo, reto, métrica)
- [ ] Definir rúbricas de feedback del mentor para cada uno de los 6 dominios del MVP
- [ ] Definir orden de progresión entre los 6 dominios del MVP (¿libre o guiado?)
