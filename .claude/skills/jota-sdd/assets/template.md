# Plantilla — SDD vJota (12 secciones)

Copiar esta estructura completa en `docs/specs/YYYY-MM-DD-title.md`. No omitir secciones — si una no aplica, escribir "N/A" con una línea que explique por qué.

## 1. Resumen General

Máximo 10 líneas. Responde únicamente: ¿qué estamos construyendo?, ¿para quién?, ¿cuál es el resultado final? Sin detalle de implementación acá.

> Ejemplo:
> Construiremos una Skill para Claude capaz de transformar un tema de investigación en un guion documental corto. La Skill recibirá una investigación estructurada y devolverá un guion siguiendo la metodología HUMANOS. El sistema debe mantener consistencia narrativa, precisión histórica y ritmo audiovisual.

## 2. Objetivo del Usuario

No se habla del software, se habla del usuario. Responde: ¿qué frustración elimina?

> Ejemplo:
> Un creador de contenido necesita convertir horas de investigación en un guion de alta calidad sin perder precisión. Actualmente el proceso requiere múltiples iteraciones manuales. La Skill debe reducir ese trabajo a una sola interacción.

## 3. Alcance

Siempre dividido en dos bloques — nunca una sola lista mezclada. Evita el "ya que estamos...".

**Incluye:**
- Leer investigación
- Detectar hechos relevantes
- Organizar cronología
- Aplicar estructura narrativa HUMANOS
- Generar guion final

**No incluye:**
- Edición de video
- Búsqueda web
- Fact checking
- Creación de miniaturas
- Publicación

## 4. Entradas

¿Qué recibe? Tipo de input y campos concretos.

> Ejemplo:
> **Input:** markdown, texto, archivo, URL
> **Campos:** tema, investigación, objetivo, duración, tono

## 5. Salidas

¿Qué devuelve?

> Ejemplo:
> **Output:** guion, hook, CTA, lista de escenas, assets sugeridos

## 6. Flujo Principal

El happy path, paso por paso.

> Ejemplo:
> Usuario entrega investigación → Claude analiza → Extrae eventos → Detecta conflicto → Construye estructura narrativa → Genera guion → Entrega resultado

## 7. Casos de Uso

Distintos escenarios, cada uno con su resultado esperado.

> Ejemplo:
> **Caso 1** — Investigación completa → Generar guion.
> **Caso 2** — Investigación muy corta → Solicitar más contexto.
> **Caso 3** — Información contradictoria → Marcar inconsistencias.
> **Caso 4** — No existe suficiente evidencia → No inventar información.

## 8. Reglas

Restricciones duras, no negociables.

> Ejemplo:
> Nunca inventar datos. Nunca modificar citas. No asumir fechas. No eliminar nombres propios. No resumir si el usuario pide detalle. Respetar formato Markdown.

## 9. Manejo de Errores

Qué hacer ante cada falla de input, explícito.

> Ejemplo:
> Si el input está vacío → solicitar información.
> Si falta el tema → detener ejecución.
> Si el archivo no puede leerse → informar el error.
> Si existen contradicciones → generar lista de conflictos.
> Si falta contexto → pedir aclaración.

## 10. Criterios de Aceptación

Checklist verificable de "quedó bien". Todo ítem debe poder marcarse ✓ o ✗ sin ambigüedad.

> Ejemplo:
> ✓ El guion tiene hook. ✓ Tiene conflicto. ✓ Tiene resolución. ✓ Sigue la plantilla HUMANOS. ✓ No inventa hechos. ✓ Mantiene el tono solicitado. ✓ Está en Markdown.

## 11. Restricciones Técnicas

El contrato técnico de salida.

> Ejemplo:
> Formato: Markdown. Idioma: Español. Salida UTF-8. Compatible con Claude. Compatible con GPT. Sin HTML. Sin XML. Sin emojis.

## 12. Futuras Versiones (Fuera del alcance)

Lo que sí se pensó pero NO se construye ahora — para frenar scope creep. Todo lo tentador que no sea V1 va acá, no en la sección 3.

> Ejemplo:
> V2 — Fact checking automático. V3 — Integración con Obsidian. V4 — Búsqueda web. V5 — Generación de storyboard.
