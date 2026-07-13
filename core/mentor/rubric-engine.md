# Creative Evaluation Engine

> Referenciado desde `CLAUDE.md` (`/core/mentor`). Este documento es la arquitectura del motor completo de evaluación — no una rúbrica, no una feature. `core/mentor/rubrics/storytelling.md` (y cada perfil de dominio futuro) es un consumidor de este motor, nunca al revés.

## Por qué "motor" y no "rúbrica"

Una rúbrica vive dentro de un dominio. Un motor no sabe que Storytelling existe.

El nombre importa porque fuerza la prueba de diseño correcta: si dentro de tres años Creator Lab enseña fotografía, negociación o programación, el trabajo no debería ser "reconstruir el sistema de evaluación" — debería ser "escribir un perfil de dominio de 40 líneas que selecciona ejes existentes". Storytelling no aparece en ninguna pieza del motor. Eso es intencional.

## Las 5 piezas

```
Rubric Axis  →  Evidence Extractor  →  Scoring Engine  →  Bottleneck Resolver  →  Practice Recommender
   (qué se        (qué prueba          (qué tan bien       (cuál importa más      (qué hacer
   evalúa)         hay)                 lo hizo)            resolver ahora)        al respecto)
```

Cada pieza consume la salida de la anterior. Ninguna pieza conoce el dominio que la está usando — solo conoce el eje.

---

## 1. Rubric Axis — el eje es la unidad, no el dominio

Antes: 7 criterios definidos *dentro* de Storytelling, sin relación formal con lo que usarían Escritura o Edición. Duplicación garantizada en cuanto se construyera el segundo dominio.

Ahora: existe un registro global de ejes. Un dominio no define ejes — **selecciona** ejes existentes (o propone uno nuevo si de verdad no existe) y define cómo pesan para él.

```
RubricAxis
├── id
├── key                      (ej. "economia_narrativa")
├── name
├── description
├── applicable_content_types (text | video | image — no todos los ejes aplican a todo)
├── evidence_types_expected  (qué tipos de Evidence puede producir este eje — ver sección 2)
├── related_axes             ([{axis_key, relation}] — co_occurs | root_cause_of | symptom_of)
├── version                  (para no romper histórico cuando se recalibra un descriptor)
└── level_descriptors[1..5]  ← diagnóstico genérico, reusable por cualquier dominio
```

**`related_axes` existe para que el Bottleneck Resolver no duplique trabajo.** Si "Tensión" y "Setup-Payoff" están marcados como relacionados (un payoff mal sembrado casi siempre se lee como caída de tensión), el motor puede reconocer que dos síntomas bajos vienen de la misma raíz y recomendar resolver la causa, no los dos síntomas por separado como si fueran problemas distintos.

Definiciones completas de los 8 ejes identificados hasta ahora en `core/mentor/rubric-axes-registry.md` — ese archivo es el que hay que dejar sólido antes de seguir (paso 1).

```
DomainAxis (tabla puente — la relación vive acá, no en el eje)
├── domain_id
├── axis_id
├── weight_by_level   (jsonb: qué tanto pesa este eje según el nivel del usuario en ese dominio)
└── context_note       (texto opcional, específico del dominio, que se añade al descriptor base)
```

---

## 2. Evidence Extractor — no hay score sin prueba

Un score sin evidencia es una opinión. Esta pieza es la que obliga al mentor a mostrar su trabajo antes de calificar.

```
Evidence
├── type       enum(quote, omission, cliche_match, pattern)
├── location   { beat: int } | { line_range: [start, end] } | null
├── text       string | null   ← solo quote y cliche_match. Cita textual del usuario, nunca reescrita.
├── reason     string           ← el diagnóstico: por qué esto sustenta el score
└── axis_key   fk → rubric_axes
```

**Los 4 tipos, y por qué no alcanza con "quote":**

- **`quote`** — el caso simple: hay una línea concreta que sustenta el score. `location` apunta al beat, `text` la cita, `reason` explica qué hace bien o mal.
- **`omission`** — el caso que un checklist no puede capturar: el problema es que **falta** algo, no que algo esté mal escrito. No hay `text` que citar. Ejemplo: eje Setup-Payoff, `location: {beat: 4}`, `text: null`, `reason: "Se siembra una promesa en el beat 1 que nunca se paga — no hay beat de resolución en todo el texto."` Sin este tipo, el motor no tiene forma honesta de explicar un score bajo por ausencia.
- **`cliche_match`** — conecta directo con la biblioteca de clichés (paso 2, ver `core/mentor/cliche-library.md`). `text` es la frase que coincidió, `reason` referencia qué patrón conocido es.
- **`pattern`** — **dentro de una sola práctica**, no confundir con `pattern_insights` (que es entre prácticas, a lo largo del tiempo — ver sección 5). Este tipo cubre un problema que se repite varias veces en el mismo texto (ej. nombrar la emoción en 3 beats distintos, no solo uno). `location` puede referenciar varios beats.

Cada score en `practice_axis_scores` lleva 1 o más `Evidence` (jsonb array). Un score sin al menos una evidencia asociada no es válido — es la garantía estructural de que el mentor no "opina", diagnostica con prueba.

---

## 3. Scoring Engine — escala y confianza

**Escala 0–100 al usuario, bandas 1–5 por dentro.** El usuario nunca ve "3/5". Las 5 bandas siguen existiendo *internamente* como ancla de diagnóstico (cada banda tiene el texto que explica qué significa estar ahí, definido por eje en `rubric-axes-registry.md`), pero el score final es continuo dentro de la banda:

```
Banda 1 → 0–20     Banda 2 → 21–40     Banda 3 → 41–60     Banda 4 → 61–80     Banda 5 → 81–100
```

Un texto que "casi" llega a banda 5 pero no del todo saca 78 (banda 4, alto) en vez de un genérico "4/5" indistinguible de otro que apenas entra en banda 4 con 62.

**Confianza — el mentor puede no estar seguro, y debe decirlo.** Cada score viene con `confidence` (0–100%).

Cuándo baja (criterios concretos, no "vibes"):
- La práctica es muy corta para evaluar el eje con solidez.
- Es la primera práctica del usuario en ese dominio — no hay baseline.
- El eje depende de contexto que el usuario no dio.
- Evidence contradictoria dentro del mismo texto.

Qué hace el sistema con confianza baja (<60%): el score se guarda igual (transparencia de datos), pero **no puede disparar** un cambio en `recommended_path` por sí solo — se necesita corroborar con al menos una práctica más.

---

## 4. Bottleneck Resolver — prioriza por impacto, no por el peor número

```
impact_score(eje, usuario) = (100 − score_actual_del_eje) × peso_meta(eje, meta_elegida) × peso_nivel(eje, nivel_usuario)
```

El eje con mayor `impact_score` (con confianza suficiente y, si tiene `related_axes` de tipo `symptom_of`, resuelto contra su causa raíz) es el que entra en `recommended_path` como prioridad 1.

**Sobre mostrar el número:** `impact_score` es interno, solo para ordenar. Al usuario se le muestra una etiqueta cualitativa (`Alto` / `Medio` / `Bajo` impacto esperado), no un porcentaje. Mostrar "+18%" como si fuera un dato medido cuando el MVP no tiene suficientes prácticas acumuladas entre usuarios para calcularlo de verdad es precisión inventada — y un mentor que inventa precisión pierde credibilidad rápido. Plan real, no renuncia a la idea:

- **Fase 1 (MVP):** `impact_score` heurístico, solo para ranking. Usuario ve etiqueta cualitativa.
- **Fase 2 (post-tracción, con datos de cohorte reales):** el heurístico se reemplaza por un valor aprendido de correlación real entre "mejora en eje X" y resultados medidos — ahí sí se muestra un porcentaje, porque va a estar respaldado.

---

## 5. Practice Recommender — del diagnóstico a la acción concreta

Esta es la pieza que todavía no está especificada a fondo (queda pendiente, ver abajo), pero su contrato de entrada/salida ya está claro:

```
Input:  bottleneck_axis + nivel_usuario + dominio_activo
Output: next_practice_suggestion (texto) + exercise_id (referencia opcional a un banco de ejercicios futuro)
```

No genera el ejercicio libremente cada vez desde cero (costoso, inconsistente) — selecciona o adapta desde un banco de ejercicios por eje/nivel, cuyo diseño de datos (`exercises`, `exercise_axis_map`) queda pendiente de especificar como su propio documento. Se conecta directamente con el paso "Retos" del loop de 8 pasos (`CLAUDE.md` sección 3).

---

## Revelación progresiva — el usuario ve 3 cosas, no 7

La tabla `practice_axis_scores` siempre guarda **todos** los ejes evaluados, con score, confianza y evidencia completa. Eso es para analítica, Creative DNA y para que el mentor tenga memoria completa.

Lo que se muestra al usuario después de una práctica es un digest — salida de las piezas 3 y 4 del motor, no la tabla completa:

```
Tu mayor fortaleza     → eje con score más alto (y confianza suficiente)
Tu cuello de botella    → salida del Bottleneck Resolver
Tu siguiente práctica   → salida del Practice Recommender
```

Un entrenador de gimnasio no te da 7 números después de cada serie — te dice qué hiciste bien y qué trabajar después.

---

## Creative DNA — la tecnología central del producto

No es una feature más del motor. Es la capa que convierte "evalué una práctica" en "estoy entrenando a una persona a lo largo del tiempo" — el activo más difícil de copiar, porque solo existe después de mucho uso real acumulado.

**Qué es:** un perfil vivo por usuario, por eje (no por dominio — un eje como "Economía" acumula señal sin importar en qué dominio se practicó), que guarda score actual y tendencia.

**Lo que la hace valiosa no es el número — es la detección de patrón entre prácticas.** Un score aislado dice "este texto tiene tensión débil". Treinta prácticas dicen "tu tensión siempre cae justo después del hook — ya no es un error de un texto, es tu patrón de escritura actual." Esto es distinto del `Evidence` tipo `pattern` (sección 2), que es intra-práctica — acá el patrón cruza prácticas distintas a lo largo del tiempo.

Regla concreta de activación (actualizada tras calibración v1, ver `docs/calibration-storytelling-ep03-05.md`):
- **Por score:** se activa cuando el mismo eje aparece por debajo de banda 3 (score < 41) en **3 o más prácticas de las últimas 5**, sin importar en qué dominio ocurrieron.
- **Por Evidence repetida (agregado tras calibración):** el umbral de score puede no dispararse si el resto del texto compensa el promedio, aunque una técnica problemática específica se repita textualmente. Por eso también se activa cuando la misma construcción/patrón de `Evidence` (mismo `reason` o mismo `cliche_match` de la biblioteca) aparece en **3 o más prácticas**, sin importar el score agregado del eje en cada una. Esta segunda vía existe precisamente porque la calibración v1 encontró la misma construcción ("Su [tema]: X") tres veces sin que el score agregado cruzara el umbral en 2 de los 3 casos.
- El mentor genera un `pattern_insight`, separado del feedback normal de práctica, citando las prácticas concretas como evidencia (nunca "confía en mí").

Visualización: barras por eje con tendencia — hoy / hace una semana / hace un mes — visibles en el perfil del usuario, no forzadas después de cada práctica.

## Pendiente de este documento

- [ ] Dejar sólido el registro de ejes en `core/mentor/rubric-axes-registry.md` (paso 1, en curso)
- [ ] Especificar `core/mentor/cliche-library.md` como capability transversal, no de Storytelling (paso 2)
- [ ] Especificar el banco de ejercicios que alimenta el Practice Recommender (`exercises`, `exercise_axis_map`)
- [ ] Definir el umbral exacto para pasar de Fase 1 (impact_score heurístico) a Fase 2 (impacto real medido)
- [ ] Definir si `pattern_insight` es visible inmediatamente al detectarse o se agrupa en revisión semanal
