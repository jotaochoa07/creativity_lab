# Registro de ejes — `rubric_axes`

> Consumido por `core/mentor/rubric-engine.md`. Este es el contenido real que puebla la tabla `rubric_axes` — la fuente de verdad versionada, no la base de datos misma. Cada eje se define **una vez** acá; los dominios solo pesan y agregan contexto (`domain_axes`).

Todos los ejes están en `version: 1`. Si se recalibra un descriptor de banda, sube la versión — los scores históricos quedan asociados a la versión con la que fueron evaluados, para no invalidar retroactivamente el Creative DNA de un usuario cuando se afina un eje.

---

## `hook` — Apertura

**Descripción:** ¿La apertura crea una pregunta específica y escalante, o solo curiosidad vaga?

**Aplica a:** text, video
**Evidence esperada:** `quote` (la línea/toma de apertura), `cliche_match` (si coincide con un patrón conocido)
**Relacionado con:** `tension_ritmo` (co_occurs — un hook fuerte sin escalada de tensión se percibe como promesa incumplida)

| Banda | Rango | Diagnóstico |
|---|---|---|
| 1 | 0–20 | No hay pregunta. Es una afirmación plana o una presentación ("Hoy les voy a hablar de..."). |
| 2 | 21–40 | Hay intento de gancho pero es genérico — cabría en cualquier historia de este tema. |
| 3 | 41–60 | La pregunta es específica pero de bajo riesgo — el lector tiene curiosidad, no urgencia. |
| 4 | 61–80 | La pregunta es específica y tiene consecuencia clara (algo se gana o se pierde). |
| 5 | 81–100 | La pregunta es específica, tiene consecuencia, y contradice una expectativa previa del lector. |

---

## `tension_ritmo` — Tensión / Ritmo

**Descripción:** ¿La intensidad narrativa escala de forma diseñada, o se aplana/es errática?

**Aplica a:** text (vía mapa de beats), video (vía ritmo de corte — pipeline pendiente)
**Evidence esperada:** `pattern` (caídas muertas de 2+ beats seguidos), `omission` (ausencia de escalada)
**Relacionado con:** `hook` (co_occurs), `setup_payoff` (root_cause_of — un payoff mal sembrado casi siempre se lee como caída de tensión)

| Banda | Rango | Diagnóstico |
|---|---|---|
| 1 | 0–20 | Tensión plana desde el inicio, nunca escala. |
| 2 | 21–40 | Sube una vez al principio y luego se aplana el resto del texto. |
| 3 | 41–60 | Sube y baja pero de forma errática — no hay diseño, es ruido. |
| 4 | 61–80 | Escalada consistente con 1 caída muerta identificable. |
| 5 | 81–100 | Escalada consistente, sin caídas muertas, con al menos un quiebre de expectativa a mitad de texto. |

---

## `economia` — Economía

**Descripción:** ¿Cada unidad (oración, plano) hace algo — avanza, profundiza o siembra — o hay relleno?

**Aplica a:** text, video (economía de plano)
**Evidence esperada:** `quote` (la oración/plano redundante), `omission` (rara vez aplica acá — el problema suele ser exceso, no ausencia)
**Relacionado con:** ninguno formal — es el eje más independiente

| Banda | Rango | Diagnóstico |
|---|---|---|
| 1 | 0–20 | Más del 40% del texto es relleno (repite lo ya dicho, explica lo obvio). |
| 2 | 21–40 | Relleno frecuente, rompe el ritmo de lectura. |
| 3 | 41–60 | Relleno ocasional, detectable pero no dominante. |
| 4 | 61–80 | Casi todo funcional, 1–2 oraciones prescindibles. |
| 5 | 81–100 | Cada oración es funcional. Quitar una pierde información real. |

---

## `mostrar_vs_nombrar` — Mostrar vs. Nombrar

**Descripción:** ¿El texto declara la emoción/conclusión directamente, o la demuestra mediante detalle o yuxtaposición? Regla editorial central heredada del método de HUMANOS.

**Aplica a:** text
**Evidence esperada:** `quote` (la línea que nombra en vez de mostrar) — este eje casi siempre produce evidencia de tipo `quote`, rara vez `omission`
**Relacionado con:** `especificidad_voz` (co_occurs — nombrar genérico y voz genérica suelen aparecer juntos)

| Banda | Rango | Diagnóstico |
|---|---|---|
| 1 | 0–20 | Nombra todo. El lector nunca tiene que inferir nada. |
| 2 | 21–40 | Nombra la mayoría de las emociones/conclusiones, muestra solo lo secundario. |
| 3 | 41–60 | Mezcla — muestra algunas cosas, nombra las más importantes (justo las que no debería nombrar). |
| 4 | 61–80 | Muestra lo importante, nombra solo lo secundario o de transición. |
| 5 | 81–100 | No nombra ninguna emoción o conclusión central. Todo se infiere del detalle o la yuxtaposición. |

---

## `setup_payoff` — Setup-Payoff

**Descripción:** ¿Lo que se siembra se paga, con el detalle exacto sembrado?

**Aplica a:** text, video (callbacks visuales)
**Evidence esperada:** `omission` (el caso más común — una siembra que nunca se paga), `quote` (cuando el pago existe pero es genérico, no usa el detalle sembrado)
**Relacionado con:** `tension_ritmo` (es causa raíz de caídas de tensión percibidas)

| Banda | Rango | Diagnóstico |
|---|---|---|
| 1 | 0–20 | No hay siembras identificables, o las que hay nunca se pagan. |
| 2 | 21–40 | Se siembra pero la mayoría de los pagos faltan o son irreconocibles. |
| 3 | 41–60 | Se pagan las siembras obvias; se pierden las sutiles. |
| 4 | 61–80 | Casi todas las siembras se pagan, alguna con detalle genérico en vez del exacto. |
| 5 | 81–100 | Cada siembra se paga, y el pago usa el detalle exacto sembrado. |

---

## `especificidad_voz` — Especificidad de voz

**Descripción:** ¿El texto podría pertenecer a cualquier historia similar, o solo podría ser esta?

**Aplica a:** text
**Evidence esperada:** `quote` (fragmento genérico intercambiable), `cliche_match`
**Relacionado con:** `mostrar_vs_nombrar` (co_occurs)

| Banda | Rango | Diagnóstico |
|---|---|---|
| 1 | 0–20 | Lenguaje genérico, intercambiable con cualquier otro guion del mismo tema. |
| 2 | 21–40 | Algún detalle específico aislado, rodeado de lenguaje genérico. |
| 3 | 41–60 | Hay momentos específicos pero no en los puntos de mayor peso narrativo. |
| 4 | 61–80 | Especificidad presente en la mayoría de los puntos de peso, con algún tramo genérico. |
| 5 | 81–100 | El detalle específico está exactamente en los puntos de mayor peso narrativo. |

---

## `claridad` — Claridad

**Descripción:** ¿El texto comunica su punto sin exigir relectura? (Eje introducido para Escritura — no todo eje nace en Storytelling.)

**Aplica a:** text
**Evidence esperada:** `quote` (la oración ambigua o sobrecargada)
**Relacionado con:** `economia` (co_occurs — el relleno suele generar ambigüedad)

| Banda | Rango | Diagnóstico |
|---|---|---|
| 1 | 0–20 | Confuso, exige releer cada oración, términos sin definir. |
| 2 | 21–40 | Se entiende con esfuerzo notable, varios tramos ambiguos. |
| 3 | 41–60 | Se entiende en una lectura pero 1–2 puntos exigen relectura. |
| 4 | 61–80 | Claro en una lectura, con alguna oración densa aislada. |
| 5 | 81–100 | Claro de principio a fin sin sacrificar profundidad — ninguna oración exige relectura. |

---

## `cierre_cta` — Cierre / CTA

**Descripción:** ¿El final resuelve lo que la promesa del hook abrió? ¿El CTA nace de la lógica de la pieza o interrumpe?

**Aplica a:** text, video
**Evidence esperada:** `quote` (el cierre y/o el CTA), `omission` (cuando el cierre no responde la pregunta del hook — evidencia por ausencia de resolución)
**Relacionado con:** `hook` (root_cause_of inverso — el cierre solo puede evaluarse bien en relación al hook que abrió)

| Banda | Rango | Diagnóstico |
|---|---|---|
| 1 | 0–20 | El final no responde la pregunta del hook. El CTA es genérico y desconectado. |
| 2 | 21–40 | Responde parcialmente la pregunta, el CTA sigue sintiéndose pegado. |
| 3 | 41–60 | Responde la pregunta pero sin resonancia — cierra el círculo sin peso emocional. |
| 4 | 61–80 | Responde con algo de resonancia, el CTA se siente casi natural. |
| 5 | 81–100 | El final reencuadra el hook inicial. El CTA es una consecuencia natural, no una interrupción. |

---

## Matriz de reutilización por dominio (actualizada)

| Eje | Storytelling | Escritura | Edición (futuro) |
|---|---|---|---|
| `hook` | ✅ | ✅ | — |
| `tension_ritmo` | ✅ | — | ✅ (ritmo de corte) |
| `economia` | ✅ | ✅ | ✅ (economía de plano) |
| `mostrar_vs_nombrar` | ✅ | ✅ | — |
| `setup_payoff` | ✅ | — | ✅ (callbacks visuales) |
| `especificidad_voz` | ✅ | ✅ | — |
| `claridad` | — | ✅ | — |
| `cierre_cta` | ✅ | ✅ | — |

## Pendiente

- [ ] Calibrar las 5 bandas de cada eje contra guiones reales de HUMANOS antes de considerar `version: 1` lista para producción
- [ ] Definir `weight_by_level` real (no solo "eje de mayor peso") por dominio en `domain_axes` — hoy Storytelling solo tiene el ranking cualitativo de `rubrics/storytelling.md`
- [ ] Evaluar si `tension_ritmo` necesita dos variantes de evidencia formalmente distintas (beat map de texto vs. ritmo de corte de video) o si un solo eje con `applicable_content_types` alcanza
