# Modelo de datos — motor `/core/curriculum` (MVP)

> Referenciado desde `CLAUDE.md`. Traduce a esquema real la decisión de progresión tomada y el motor de rúbricas (`core/mentor/rubric-engine.md`).

## Decisión de progresión (confirmada)

**Mixta, con detección de cuello de botella.** No es un menú de módulos ni un camino fijo con desbloqueos. Es:

1. Diagnóstico inicial (goal picker: "¿qué quieres mejorar hoy?").
2. El mentor genera una ruta recomendada inicial, priorizada.
3. El usuario puede entrar a **cualquier** dominio libremente — nada está bloqueado.
4. Pero el mentor siempre señala una recomendación activa ("Hoy no necesitas Edición, necesitas Hooks").
5. Cada práctica que el usuario sube puede revelar un cuello de botella nuevo y **recalcula** la recomendación, priorizando por impacto esperado, no por el peor puntaje (ver `rubric-engine.md` sección 6).
6. El "nivel" de cada dominio es individual y visible — un mapa de habilidades, no una barra de progreso única.

Esto es lo que separa a Creator Lab de una plataforma de cursos: el sistema no pregunta "¿qué módulo sigue?", pregunta "¿qué práctica te va a mejorar más esta semana?".

## Flujo del producto (loop completo)

```
Perfil → Diagnóstico inicial → Fortalezas/debilidades detectadas → Ruta personalizada
   → Usuario elige libremente cualquier dominio → Mentor recomienda el siguiente entrenamiento
   → Cada práctica actualiza el mapa de habilidades y el Creative DNA → La ruta evoluciona
```

## Tablas

### `users`
| Columna | Tipo | Nota |
|---|---|---|
| id | uuid pk | |
| email | text | |
| name | text | |
| created_at | timestamptz | |

### `domains`
| Columna | Tipo | Nota |
|---|---|---|
| id | uuid pk | |
| key | text unique | ej. `storytelling` |
| name | text | |
| description | text | |
| status | enum(mvp, proximamente, workspace) | ver `creator-lab-domains.md` |
| order_index | int | orden narrativo del skill tree, **no** implica progresión obligatoria |

### `loop_stages` (las 6 etapas de color del sistema cromático)
| Columna | Tipo | Nota |
|---|---|---|
| id | uuid pk | |
| key | text unique | inspiracion, investigacion, creacion, produccion, feedback_ia, mejora |
| name | text | |
| color_hex | text | ver CLAUDE.md sección 4 |
| loop_step_ref | text | mapeo a los 8 pasos del motor genérico (sección 3) |

### `onboarding_responses`
| Columna | Tipo | Nota |
|---|---|---|
| id | uuid pk | |
| user_id | fk → users | |
| goal | text | una de las 6 opciones fijas del diagnóstico inicial |
| created_at | timestamptz | |

### `user_domain_levels` — el mapa de habilidades / constelación (por dominio)
| Columna | Tipo | Nota |
|---|---|---|
| id | uuid pk | |
| user_id | fk → users | |
| domain_id | fk → domains | |
| level | int | 1–10, derivado de xp |
| xp | int | |
| last_practiced_at | timestamptz | |
| updated_at | timestamptz | |
| — | unique(user_id, domain_id) | un nivel por usuario por dominio |

### `recommended_path` — la ruta activa (se regenera, no es estática)
| Columna | Tipo | Nota |
|---|---|---|
| id | uuid pk | |
| user_id | fk → users | |
| domain_id | fk → domains | |
| priority_rank | int | 1 = más urgente |
| reason | text | ej. "cuello de botella: retención baja en los primeros 12s" |
| impact_score | numeric | heurística interna, solo para ordenar — nunca se muestra directo al usuario (ver `rubric-engine.md` sección 5) |
| impact_label | enum(alto, medio, bajo) | lo que sí ve el usuario, en vez de un % inventado |
| status | enum(active, completed, dismissed) | |
| generated_at | timestamptz | |

### `practices` — la "Práctica", objeto atómico (de la Visión v1)
| Columna | Tipo | Nota |
|---|---|---|
| id | uuid pk | |
| user_id | fk → users | |
| domain_id | fk → domains | |
| loop_stage_id | fk → loop_stages | |
| content_type | enum(text, video, image) | |
| content_ref | text | texto plano o path en Supabase Storage |
| submitted_at | timestamptz | |
| status | enum(submitted, reviewed) | |

### `rubric_axes` — registro global de ejes evaluables (motor, no por dominio)
| Columna | Tipo | Nota |
|---|---|---|
| id | uuid pk | |
| key | text unique | ej. `economia_narrativa` |
| name | text | |
| description | text | |
| applicable_content_types | text[] | text, video, image — no todos los ejes aplican a todo |
| evidence_types_expected | text[] | quote, omission, cliche_match, pattern |
| related_axes | jsonb | `[{axis_key, relation}]` — co_occurs, root_cause_of, symptom_of |
| version | int | sube al recalibrar un descriptor, para no invalidar histórico |
| level_descriptors | jsonb | diagnóstico de cada banda 1–5, reusable por cualquier dominio |

Contenido real (los 8 ejes completos, con bandas y evidencia esperada) en `core/mentor/rubric-axes-registry.md`.

### `cliche_patterns` — capability transversal, vinculada a ejes
| Columna | Tipo | Nota |
|---|---|---|
| id | uuid pk | |
| key | text unique | |
| axis_id | fk → rubric_axes | a qué eje aplica |
| description | text | |
| example_generic | text | ilustrativo, nunca cita real de un creador |
| severity | enum(bajo, medio, alto) | hereda a la Evidence tipo `cliche_match` que lo detecta |

Seed inicial en `core/mentor/cliche-library.md`.

### `domain_axes` — qué ejes usa cada dominio y cómo pesan
| Columna | Tipo | Nota |
|---|---|---|
| id | uuid pk | |
| domain_id | fk → domains | |
| axis_id | fk → rubric_axes | |
| weight_by_level | jsonb | peso del eje según rango de nivel del usuario |
| context_note | text, nullable | texto adicional específico del dominio, no reemplaza el descriptor base |

### `practice_axis_scores` — la capa de verdad (reemplaza el `rubric_scores` jsonb plano de v2)
| Columna | Tipo | Nota |
|---|---|---|
| id | uuid pk | |
| practice_id | fk → practices | |
| axis_id | fk → rubric_axes | |
| score | int (0–100) | granular dentro de la banda 1–5 |
| confidence | int (0–100) | condiciona si puede disparar cambios en `recommended_path` (umbral 60%) |
| evidence | jsonb (array) | `[{type, location, text, reason}]` — un score sin evidencia no es válido |
| created_at | timestamptz | |

Normalizado (no jsonb plano de todo el feedback) a propósito: es lo que permite las consultas de tendencia histórica por eje que alimentan Creative DNA. Siempre se guardan los 7-8 ejes completos con su evidencia, aunque el usuario solo vea un digest de 3 (ver `feedback` abajo).

### `user_axis_profile` — caché de Creative DNA (por eje, no por dominio)
| Columna | Tipo | Nota |
|---|---|---|
| user_id | fk → users | |
| axis_id | fk → rubric_axes | |
| current_score | int | |
| rolling_avg_10 | int | promedio de las últimas 10 prácticas donde se evaluó este eje |
| trend | enum(up, down, flat) | |
| practice_count | int | |
| updated_at | timestamptz | |
| — | unique(user_id, axis_id) | |

Se recalcula cada vez que entra una fila nueva en `practice_axis_scores`. Alimenta las barras "Hook / Storytelling / Narrativa Visual..." del perfil del usuario (hoy / hace una semana / hace un mes).

### `feedback` — el digest que ve el usuario (revelación progresiva, no los 7 ejes)
| Columna | Tipo | Nota |
|---|---|---|
| id | uuid pk | |
| practice_id | fk → practices | 1:1 |
| top_strength_axis_id | fk → rubric_axes | mayor score con confianza suficiente |
| bottleneck_axis_id | fk → rubric_axes, nullable | priorizado por `impact_score`, no por el score más bajo |
| bottleneck_reason | text | ej. "Nombras la emoción en la línea 4 en vez de mostrarla" |
| bottleneck_evidence | jsonb | Evidence completa del eje cuello de botella (ver `rubric-engine.md` pieza 2) |
| next_practice_suggestion | text | una recomendación concreta, no un menú |
| summary | text | crítica del mentor, nunca contenido final generado (regla dura CLAUDE.md sección 5) |
| cliche_detectado | boolean, nullable | flag transversal, solo aplica a dominios con detector de clichés (ej. Storytelling) |
| beat_map | jsonb, nullable | solo Storytelling por ahora — ver perfil de dominio |
| created_at | timestamptz | |

### `pattern_insights` — observaciones de nivel superior, no feedback de una práctica puntual
| Columna | Tipo | Nota |
|---|---|---|
| id | uuid pk | |
| user_id | fk → users | |
| axis_id | fk → rubric_axes | |
| description | text | ej. "Tus últimos 18 ejercicios muestran el mismo patrón..." |
| evidence_practice_ids | jsonb (array) | nunca "confía en mí" — siempre cita prácticas concretas |
| detected_at | timestamptz | |
| status | enum(active, acknowledged) | |

Se activa cuando el mismo eje aparece por debajo de banda 3 en 3 o más de las últimas 5 prácticas (ver `rubric-engine.md` sección 7). Se entrega separado del feedback normal de práctica.

### `portfolio_items`
| Columna | Tipo | Nota |
|---|---|---|
| id | uuid pk | |
| user_id | fk → users | |
| practice_id | fk → practices | |
| is_featured | boolean | |
| created_at | timestamptz | |

### `gamification_state`
| Columna | Tipo | Nota |
|---|---|---|
| user_id | fk → users, pk | |
| current_streak | int | |
| longest_streak | int | |
| last_active_date | date | |
| xp_total | int | |

## Notas de diseño importantes

- **El nivel de dominio y el perfil de eje son cosas distintas.** `user_domain_levels` mide progreso por dominio (Storytelling nivel 5). `user_axis_profile` mide progreso por eje transversal a dominios (Economía narrativa 74, sin importar si se practicó en Storytelling o Escritura). Ambos coexisten — el primero organiza el skill tree, el segundo es el Creative DNA.
- **`recommended_path` se regenera, no es estática.** Cada vez que `feedback` trae un `bottleneck_axis_id` con confianza suficiente, se recalcula/inserta una fila en `recommended_path`.
- **`impact_score` es interno; `impact_label` es lo único que ve el usuario.** No se muestra un porcentaje inventado tipo "+18%" sin datos reales que lo respalden — ver el plan de dos fases completo en `rubric-engine.md` sección 5.
- **El diagnóstico inicial determina el primer `recommended_path`**, antes de que exista ninguna `practice`. El mapeo "goal elegido → dominios recomendados iniciales" puede ser una configuración estática en código, no necesita tabla propia para el MVP.

## Pendiente de esto en adelante

- [ ] Calibrar las 5 bandas de cada eje contra guiones reales de HUMANOS (ver `rubric-axes-registry.md`)
- [ ] Poblar seed de clichés para los ejes restantes (ver `cliche-library.md`)
- [ ] Definir el umbral exacto para pasar de Fase 1 (impact_score heurístico) a Fase 2 (impacto real medido)
- [ ] Definir el set fijo de 6 opciones del diagnóstico inicial y su mapeo a dominios recomendados
- [ ] Definir fórmula de "nivel" por dominio (¿XP acumulado, cantidad de prácticas, calidad promedio, o combinación?)
- [ ] Especificar `exercises` / `exercise_axis_map` para el Practice Recommender (pieza 5 del motor)
