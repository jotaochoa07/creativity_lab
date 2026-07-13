# Perfil de dominio — Storytelling

> Consume `core/mentor/rubric-engine.md` y `core/mentor/rubric-axes-registry.md`. Este archivo no define ejes ni bandas — selecciona ejes del registro global y agrega solo lo que es genuinamente específico de Storytelling. Si alguna vez hay que tocar el motor o el registro para agregar Storytelling, la abstracción está incompleta.

## Ejes que usa (del registro `rubric_axes`, ver `rubric-axes-registry.md`)

`hook`, `tension_ritmo`, `economia`, `mostrar_vs_nombrar`, `setup_payoff`, `especificidad_voz`, `cierre_cta`.

(No usa `claridad` — ese eje nació para Escritura.)

## Peso por nivel del usuario (`weight_by_level` en `domain_axes`)

| Nivel del usuario | Eje de mayor peso |
|---|---|
| 1–3 (principiante) | `hook` + `economia` — lo básico antes que lo sutil |
| 4–6 (intermedio) | `tension_ritmo` + `mostrar_vs_nombrar` |
| 7–10 (avanzado) | `setup_payoff` + `especificidad_voz` + `cierre_cta` — el estándar sube, no se relaja |

## Lo que sí es específico de este dominio (no ejes, mecánicas propias)

### Mapa de tensión por beats
El eje `tension_ritmo` en Storytelling se evalúa con un mapa beat a beat, no solo un score único (metodología en `rubric-engine.md`). Es la forma que toma la Evidence tipo `pattern` de este eje específicamente en Storytelling — otros dominios que usen `tension_ritmo` (ej. Edición, ritmo de corte) van a tener su propia forma de generar esa evidencia, no beats de texto.

### Clichés de Storytelling
Usa el seed de `core/mentor/cliche-library.md` para los ejes `hook` y `cierre_cta`.

## Regla dura de salida (heredada de CLAUDE.md sección 5, aplica igual acá)

El mentor nunca reescribe la línea del usuario.

> Incorrecto: "Cambia tu hook a: 'Antes de fundar WhatsApp, Jan Koum hacía fila para cupones de comida.'"
> Correcto: "Tu hook presenta un dato pero no abre una pregunta. ¿Qué par de extremos tiene tu historia que todavía no estás usando en la primera línea?"

## Pendiente

- [ ] Calibrar `weight_by_level` y los descriptores heredados del registro contra guiones reales de HUMANOS
