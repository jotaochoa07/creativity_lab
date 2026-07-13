# Creativity Lab — CLAUDE.md

> Documento vivo. Versión 3. Se actualiza a medida que tomamos decisiones nuevas.
> Cambios desde v2: se cerró la identidad visual (colores, tipografía, tagline).

## 1. Qué es el proyecto

**Creativity Lab** es una plataforma de entrenamiento de habilidades creativas y profesionales, con la metáfora de un **gimnasio**: el usuario entra, practica, y un **mentor AI** lo asiste, lo evalúa y lo empuja a mejorar — igual que un coach de gimnasio revisa tu forma y ajusta tu rutina.

La plataforma está organizada en **verticales** (uno por habilidad/disciplina). El primer producto mínimo viable es:

### Creator Lab (MVP — primer vertical)

Enseña **storytelling y creación de contenido**. No se organiza como pipeline de producción (guion → edición → hooks) ni por herramienta — se organiza como **skill tree de dominios entrenables**, igual que un gimnasio organiza por capacidad (fuerza, resistencia, técnica) y no por máquina.

Mapa completo de dominios (20, del 0 al 19): [`docs/creator-lab-domains.md`](docs/creator-lab-domains.md).

**Dominios del MVP:** Entendimiento de Audiencia, Storytelling, Escritura, Edición, Analítica, Iteración. El resto del skill tree queda visible como "Próximamente" (bloqueado), estilo Duolingo.

**Progresión entre dominios:** mixta, con detección de cuello de botella. El usuario entra a cualquier dominio libremente — nada está bloqueado por nivel — pero el mentor mantiene una ruta recomendada activa (ej. "hoy no necesitas Edición, necesitas Hooks") que se recalcula cada vez que una práctica revela un cuello de botella nuevo. El "nivel" es por dominio, no global — se visualiza como mapa de habilidades / constelación, no como barra de progreso única. Esquema completo en [`docs/data-model-mvp.md`](docs/data-model-mvp.md).

**Tagline:** *"Gimnasio para creadores."*

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

## 3.1 Creative DNA — el activo central del producto

No es una feature del sistema de rúbricas. Es lo que convierte "evalué una práctica" en "estoy entrenando a una persona a lo largo del tiempo" — y es el activo más difícil de copiar, porque solo existe después de uso real acumulado.

Cada práctica deja huella en un **eje** (Hook, Economía, Tensión...), no en un dominio — los ejes son transversales, el motor completo vive en `core/mentor/rubric-engine.md`. Con suficientes prácticas, el mentor deja de evaluar textos sueltos y empieza a detectar **patrones de estilo**: *"Tus últimos 18 ejercicios muestran el mismo patrón: investigas muy bien, escribes bien, pero pierdes tensión justo después del hook. Ya no es un error aislado; es tu estilo actual."*

Ese tipo de observación es el diagnóstico de un editor que te conoce, no el feedback de una herramienta que analiza texto aislado. Es también, en términos de negocio, el moat real de Creativity Lab (ver Documento de Visión v1, sección 9): no se construye con una demo, se construye con retención acumulada.

## 4. Decisiones tomadas

### Stack técnico

| Capa | Decisión |
|---|---|
| Plataforma | Web app **mobile-first** (no nativa en el MVP) |
| Frontend | Next.js (App Router) + TypeScript + Tailwind CSS |
| Backend/DB | Supabase (Postgres + Auth + Storage + Realtime) |
| Mentor AI | Claude vía Anthropic API — feedback estructurado con tool-use (rúbricas/scoring), no solo chat libre |
| Alcance del mentor en MVP | **Multimodal desde el día uno.** Texto/chat para Audiencia, Storytelling, Escritura, Iteración. Análisis de archivo (video/imagen) para Edición. Datos de plataforma (retención, CTR, hook rate) para Analítica. Ver implicaciones técnicas abajo. |
| Organización de código | Sin monorepo todavía. Un solo Next.js app con carpetas por feature. Se reevalúa monorepo (ej. Turborepo) recién cuando exista un segundo vertical real |

### Implicaciones técnicas de Edición y Analítica en el MVP

Decisión confirmada: **Edición y Analítica se quedan en el MVP**, aceptando que el mentor necesita análisis de archivo/datos desde el día uno, no solo texto. Esto agranda el MVP en dos frentes concretos que hay que resolver antes del Día 4 (Spec-Driven Development):

- **Edición (dominio 9):** el mentor necesita "ver" el video del usuario, no solo leer una descripción. Claude puede analizar imágenes/frames extraídos, pero no procesa video nativamente — hay que definir un pipeline (ej. extracción de frames clave + análisis por Claude, o un servicio externo de análisis de video) antes de poder dar feedback real sobre ritmo, B-roll o color.
- **Analítica (dominio 15):** CTR, Hook Rate y Retención no existen sin conectar con la plataforma real (TikTok, YouTube, Instagram). Esto implica integraciones OAuth por plataforma, manejo de rate limits y, probablemente, aprobación de acceso a APIs de terceros — no es un feature que se activa con un toggle.

Ninguno de los dos es imposible, pero ambos son bloques de trabajo propios que hay que especificar aparte (no van a salir "gratis" del mismo motor de texto que usan Storytelling o Escritura). Quedan anotados como pendientes en la sección 8.

### Estructura de carpetas (propuesta inicial)

```
/core
  /auth
  /curriculum      → motor genérico de "dominio entrenable": fundamentos, demostraciones,
                      prácticas guiadas, retos, repetición deliberada (usa /mentor y /gamification)
  /mentor          → orquestación del mentor AI, rúbricas por dominio, feedback estructurado
                      (incluye adaptadores: texto, análisis de archivo, datos de plataforma)
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

**Identidad visual cerrada (v3).** Dark-mode primero, acentos vibrantes, sin degradados.

**Sistema cromático — por etapa del proceso, no por dominio.** Decisión clave: el color NO identifica en qué dominio del skill tree estás (Storytelling, Escritura, etc.) — identifica en qué momento del ciclo de entrenamiento estás. Es intencional: el mismo sistema de 6 colores sirve para cualquier dominio y cualquier vertical futura, sin inventar un color nuevo por cada skill que se agregue.

| Etapa | Hex | Relación con el motor de 8 pasos (sección 3) |
|---|---|---|
| Inspiración | `#FFC83D` | Fundamentos + Demostraciones |
| Investigación | `#14D8E7` | Prácticas guiadas |
| Creación | `#FF6B6B` | Retos |
| Producción | `#2563EB` | Ejecución/entrega del reto (pulido antes de pasar a feedback) |
| Feedback IA | `#8B5CF6` | Feedback de IA |
| Mejora | `#BCFF6A` | Repetición deliberada + Métricas de progreso + Portafolio |

> Nota: "Mejora" pasó de verde esmeralda (`#34D399`, colisionaba con el color de estado "Éxito") a rosa (`#F472B6`), y finalmente se fijó en verde lima (`#BCFF6A`) — suficientemente distinto de Éxito para no generar ambigüedad, y con más energía visual acorde al tono "despertar creatividad".

**Cuidado — colisión de nombres:** "Investigación" y "Producción" ya existen como nombres de **dominios** en `docs/creator-lab-domains.md` (dominios 1 y 8, ambos 🔒 Próximamente, fuera del MVP). Acá son nombres de **etapas del loop de color**, un concepto distinto. Van a convivir en el producto con significados diferentes — no bloquea nada ahora, pero hay que evitar mezclar los dos sentidos en el copy. Si en la práctica genera confusión real (ej. un usuario pregunta "¿por qué Investigación está bloqueado si lo veo en el loop?"), se revisita el nombre de uno de los dos entonces.

**Neutros:**

| Uso | Hex |
|---|---|
| Fondo primario | `#0F172A` |
| Fondo secundario | `#111827` |
| Superficies | `#1E293B` |
| Bordes / divisores | `#334155` |
| Texto secundario | `#CBD5E1` |
| Texto primario | `#F8FAFC` |

**Estados de UI (separados de la identidad de etapa — validaciones, toasts, alertas):**

| Estado | Hex |
|---|---|
| Éxito | `#34D399` |
| Advertencia | `#FBBF24` |
| Error | `#EF4444` |
| Información | `#3B82F6` |

**Tipografía:**

- Títulos/headings: **Space Grotesk**
- Texto/UI: **Inter**
- Código/datos técnicos: **JetBrains Mono** — excepción a la regla de "máximo 2 familias": reservada solo para bloques de código o datos, nunca para copy de producto.

## 5. Reglas duras

- **El mentor critica, pregunta y compara — nunca genera el trabajo final en nombre del usuario.** Puede señalar el problema y sugerir dirección, pero no reescribe el guion, no edita el video, no responde el hook por él. Esta es la línea que separa a Creativity Lab de un asistente de productividad, y aplica a los seis dominios del MVP por igual, incluidos Edición y Analítica (el mentor interpreta los datos y sugiere qué probar — no ejecuta el cambio).
- **Todo el copy/UI de la app en español** (neutro/profesional, no slang). Esto aplica a textos de interfaz, mensajes del mentor y contenido visible al usuario.
- **El código va en inglés** (identificadores, nombres de archivo, comentarios) — separado del punto anterior. El copy es español, el código es inglés.
- **Mobile-first**: todo diseño y layout se piensa primero para pantalla chica.
- **Sin degradados**: todos los colores van sólidos. Regla dura confirmada.
- **El color identifica la etapa del proceso (loop), no el dominio.** No se crean colores nuevos por dominio del skill tree — el sistema de 6 colores de la sección 4 se reutiliza para todos los dominios y verticales futuras.

## 6. Qué existe ya

Nada de código todavía. El proyecto arranca de cero. Lo que sí existe:

- `CLAUDE.md` (este archivo)
- `README.md` — presentación del repo y punto de entrada para quien lo abre por primera vez
- `docs/creator-lab-domains.md` — mapa completo de los 20 dominios del skill tree y estado de cada uno (MVP vs próximamente)
- `docs/data-model-mvp.md` — esquema de datos completo: dominios, etapas de color, prácticas, Creative Evaluation Engine, Creative DNA, ruta recomendada
- `core/mentor/rubric-engine.md` — arquitectura del Creative Evaluation Engine (Rubric Axis → Evidence Extractor → Scoring Engine → Bottleneck Resolver → Practice Recommender)
- `core/mentor/rubric-axes-registry.md` — los 8 ejes reutilizables, completos: bandas, evidencia esperada, metadatos, relaciones
- `core/mentor/cliche-library.md` — biblioteca de clichés transversal al motor, vinculada a ejes
- `core/mentor/rubrics/storytelling.md` — primer perfil de dominio sobre el motor
- `docs/calibration-storytelling-ep03-05.md` — calibración real contra 3 episodios de HUMANOS; confirmó que el motor aguanta y encontró el primer patrón real (`su_tema_dos_puntos`)
- `assets/design/paleta-colores.png` — referencia visual de la paleta de colores real
- `.claude/skills/revision-final/SKILL.md` — skill de Claude Code para la revisión final pre-lanzamiento del sitio (checklist de móvil, navegación, copy, imágenes y tono)
- `.atl/skill-registry.md` — registro de skills de una inicialización previa de SDD

Repositorio en GitHub: [jotaochoa07/creativity_lab](https://github.com/jotaochoa07/creativity_lab).

Esta sección se actualiza a medida que se creen páginas/secciones reales, para no reconstruir trabajo ya hecho.

## 7. Cómo trabajamos (Skills y Loops)

- Usamos **Skills** de Claude Code para tareas específicas del flujo (SDD: explore → propose → spec → design → tasks → apply → verify → archive) en vez de improvisar cada vez.
- Usamos **Loops** para trabajo recurrente/iterativo cuando aplique (ej: ciclos de mejora de UX progresiva).
- El ciclo SDD se usa para features no triviales; cambios chicos/mecánicos se hacen directo.

## 8. Pendiente (próxima iteración)

- [ ] Definir si consistencia factual (hallazgo de calibración: "5.000" vs "5.127" prototipos en Ep. 03) necesita eje propio, capa de QA aparte, o espera al dominio Investigación
- [ ] Definir cómo el motor distingue texto de marca fijo (sign-off) de contenido evaluable, para no penalizarlo en `cierre_cta`
- [ ] Replicar el patrón de perfil de dominio a Escritura — la prueba de fuego es si el motor necesita tocarse o no
- [ ] Especificar `exercises` / `exercise_axis_map` para el Practice Recommender (pieza 5 del Creative Evaluation Engine)
- [ ] Definir el umbral exacto para pasar de Fase 1 (impact_score heurístico) a Fase 2 (impacto real medido con datos de cohorte)
- [ ] Definir el set fijo de 6 opciones del diagnóstico inicial y su mapeo a dominios recomendados
- [ ] Definir fórmula de "nivel" por dominio (XP, cantidad de prácticas, calidad promedio, o combinación)
- [ ] Definir pipeline de análisis de video para Edición (extracción de frames + Claude vision vs. servicio externo)
- [ ] Definir alcance real de integraciones de plataforma para Analítica (qué plataformas primero, qué métricas mínimas, manejo de OAuth)
- [ ] Vigilar si la colisión de nombres Investigación/Producción (dominio vs. etapa de color) genera confusión real una vez haya UI construida
