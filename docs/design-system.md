# Creator Lab — Design System (fuente para Claude Design)

> Documento derivado de `CLAUDE.md` sección 4 y del manual de marca personal (Jota Ochoa). `CLAUDE.md` sigue siendo la fuente de verdad — este archivo existe para que Claude Design (u otra herramienta que lea el repo) tenga el sistema en un solo lugar, sin tener que parsear todo `CLAUDE.md`. Los tokens machine-readable viven en `design-tokens.json`, en la raíz del repo.

## Filosofía visual

Creator Lab hereda la filosofía de marca de Jota Ochoa: limpia, minimalista, premium, tecnológica. Dark-mode primero. Mucho espacio en blanco. Tarjetas oscuras, bordes suaves, animaciones discretas. El color es un acento, nunca el protagonista — el contenido manda.

Evitar siempre: sombras exageradas, degradados, iconografía infantil, efectos brillantes, estética gamer.

## Sistema cromático — por etapa del proceso, no por dominio

El color identifica en qué momento del ciclo de entrenamiento de 8 pasos está el usuario — nunca qué dominio del skill tree está practicando (Storytelling, Escritura, etc. no tienen color propio). Este es el mismo sistema de 6 colores para cualquier dominio actual o futuro.

| Etapa | Hex | Paso del ciclo de 8 |
|---|---|---|
| Inspiración | `#FFC83D` | Fundamentos + Demostraciones |
| Investigación | `#14D8E7` | Prácticas guiadas |
| Creación | `#FF6B6B` | Retos |
| Producción | `#2563EB` | Ejecución/entrega del reto |
| Feedback IA | `#8B5CF6` | Feedback de IA |
| Mejora | `#BCFF6A` | Repetición deliberada + Métricas + Portafolio |

**Neutros**

| Uso | Hex |
|---|---|
| Fondo primario | `#0F172A` |
| Fondo secundario | `#111827` |
| Superficies | `#1E293B` |
| Bordes / divisores | `#334155` |
| Texto secundario | `#CBD5E1` |
| Texto primario | `#F8FAFC` |

**Estados de UI** (validaciones, toasts, alertas — separados de la identidad de etapa)

| Estado | Hex |
|---|---|
| Éxito | `#34D399` |
| Advertencia | `#FBBF24` |
| Error | `#EF4444` |
| Información | `#3B82F6` |

## Tipografía

- **Títulos/headings:** Space Grotesk
- **Texto/UI:** Inter
- **Código/datos técnicos:** JetBrains Mono — excepción reservada solo para bloques de código o datos, nunca para copy de producto.

## Reglas duras (no negociables)

- Sin degradados. Todos los colores van sólidos.
- Mobile-first: todo diseño se piensa primero para pantalla chica.
- Dark-mode primero.
- El color identifica la etapa del loop, no el dominio. No se crean colores nuevos por dominio del skill tree.
- Todo copy visible al usuario en español neutro/profesional — nunca slang.

## Qué NO está definido todavía (marcarlo, no inventarlo)

- Escala de espaciado (padding, gaps entre elementos).
- Radios de borde.
- Breakpoints responsive.
- Librería de componentes (botones, cards, inputs) y su sizing.

Si Claude Design necesita alguno de estos valores para producir un diseño, debe proponerlos de forma explícita y consistente con esta identidad (dark, minimalista, Space Grotesk + Inter) — no asumirlos en silencio. Una vez usados en un primer diseño validado, se cierran acá y en `design-tokens.json`.

## Referencias

- `CLAUDE.md` sección 4 — fuente de verdad original de estas decisiones.
- `design-tokens.json` — versión machine-readable de esta paleta y tipografía.
- `assets/design/paleta-colores.png` — referencia visual.
