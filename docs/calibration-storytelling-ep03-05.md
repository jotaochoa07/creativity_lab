# Calibración v1 — Storytelling contra guiones reales de HUMANOS (Ep. 03–05)

> Primera corrida real del Creative Evaluation Engine. Input: episodios 3 (James Dyson), 4 (Ricardo Semler) y 5 (Ehud Shabtai), borrador de Borges pre-refinamiento manual de Jota. Esto no es una demo — es la prueba de que la rúbrica sobrevive contra texto real, o la evidencia de dónde hay que arreglarla.

## Resultado en una línea

La rúbrica se sostiene. Y además encontró algo que no estaba buscando: **el mismo defecto de "nombrar en vez de mostrar" aparece con la misma construcción literal en los dos episodios** — "Su paradoja: X" — antes de que Jota lo refine manualmente. Eso es exactamente el tipo de señal que Creative DNA está diseñado para detectar, solo que apareció con 2 muestras en vez de esperar a 30.

---

## Episodio 03 — James Dyson

### Digest (lo que vería el usuario)

```
Tu mayor fortaleza     → setup_payoff (72) — la promesa de "succión" del hook se paga con el detalle exacto
Tu cuello de botella    → mostrar_vs_nombrar (18) — el más bajo, y el de mayor peso en este nivel de borrador
Tu siguiente práctica   → reescribir el párrafo de "su paradoja" mostrando la contradicción con una escena
                          concreta, sin usar la palabra "paradoja" ni nombrar la emoción directamente
```

### Scorecard completo (capa de verdad — todos los ejes)

| Eje | Score | Banda | Evidence |
|---|---|---|---|
| `hook` | 68 | 4 | `quote` — *"¿Sabías que una aspiradora puede tardar más de 15 años y 5.000 prototipos...?"* — dato específico fuerte, pero coincide con el patrón de cliché `pregunta_yes_no` |
| `tension_ritmo` | 38 | 2 | `pattern` — beats "Obsesionado con una idea..." y "Rechazado por todos" repiten información ya dada sin escalar — caída muerta de 2 beats seguidos |
| `economia` | 35 | 2 | `pattern` — "frustración/obsesión" se nombra en dos beats distintos; "dijeron NO" y "rechazado por todos" son la misma información repetida |
| `mostrar_vs_nombrar` | 18 | 1 | `quote` — *"Su paradoja: cientos de fracasos construyeron el éxito supremo"* — nombra la palabra "paradoja" en vez de mostrarla con una escena |
| `setup_payoff` | 72 | 4 | `quote` — hook promete succión, el cierre *"su máquina mantenía la succión"* paga con el detalle exacto |
| `especificidad_voz` | 52 | 3 | `quote` — los números (5.000, 15 años) son específicos; el lenguaje temático ("obsesión", "paradoja") es genérico |
| `cierre_cta` | 62 | 4 | `quote` — *"La industria no podía ignorarlo"* cierra bien pero sin la fuerza del dato inicial |

`cliche_detectado: true` — `pregunta_yes_no` en el hook (severidad: bajo)

### Hallazgo que la rúbrica no tenía diseñado para atrapar

El guion dice **"5.000 prototipos"** en el hook y **"5.127 prototipos"** más adelante. Ningún eje de los 7 mide esto — es un problema de consistencia factual, no de storytelling. Ver sección de huecos abajo.

---

## Episodio 04 — Ricardo Semler

### Digest

```
Tu mayor fortaleza     → cierre_cta (78) — la pregunta final conecta con la inversión de expectativa del hook
Tu cuello de botella    → mostrar_vs_nombrar (43) — inconsistente: tiene tu mejor beat de todo el corpus
                          calibrado (los 3 ejemplos concretos de Semco) y también tu peor recaída
Tu siguiente práctica   → identifica qué hiciste distinto en "los empleados eligieron a sus líderes / las
                          finanzas expuestas / cada uno proponía su salario" — ese beat sí muestra. Aplica
                          el mismo patrón donde hoy nombras ("Su paradoja...", "¿La premisa?...")
```

### Scorecard completo

| Eje | Score | Banda | Evidence |
|---|---|---|---|
| `hook` | 80 | 5 | `quote` — *"Imagina que tu jefe... te elige a tí. O que tú eliges a tu jefe."* — inversión real de expectativa, no solo curiosidad genérica |
| `tension_ritmo` | 52 | 3 | `pattern` — sube fuerte en "los empleados eligieron..." (banda 5) pero cae justo después en "¿La premisa?" que repite lo ya mostrado |
| `economia` | 58 | 3 | `quote` — *"Suena a locura, ¿verdad?"* y *"catalizador del cambio"* son relleno de validación/jerga, evitables |
| `mostrar_vs_nombrar` | 43 | 3 | `quote` (negativo) — *"Su paradoja: democratizar al extremo..."* / `quote` (positivo) — *"cada uno proponía su salario"* muestra sin nombrar nada |
| `setup_payoff` | 70 | 4 | `quote` — el hook invierte jerarquía, el cierre *"¿Cuánto control nos paraliza realmente?"* paga esa inversión con una pregunta que la extiende |
| `especificidad_voz` | 58 | 3 | `quote` — "Semco", "fábrica de ventiladores", "21 años" son específicos; *"la confianza radical libera el potencial humano"* es genérico de copy inspiracional |
| `cierre_cta` | 78 | 5 | `quote` — pregunta final abierta que reencuadra el hook, no un CTA pegado |

`cliche_detectado: false` (los seeds actuales no cubren "Imagina que..." ni "Suena a locura, ¿verdad?" — ver hallazgo de biblioteca abajo)

---

## El hallazgo cruzado — señal temprana de Creative DNA

Los dos episodios usan **la misma construcción literal** para nombrar en vez de mostrar:

> Ep. 03: *"Su paradoja: cientos de fracasos construyeron el éxito supremo."*
> Ep. 04: *"Su paradoja: democratizar al extremo una empresa para hacerla más rentable."*

No es un error aislado de un guion — es una plantilla que el proceso de Borges repite. Formalmente, `pattern_insight` necesita 3 de las últimas 5 prácticas (`rubric-engine.md`, sección Creative DNA) para activarse — con solo 2 muestras no se dispara todavía. Pero la señal ya es visible, y es exactamente el tipo de observación que un editor humano haría después de leer dos guiones seguidos: *"Estás anunciando la paradoja en vez de dejar que el lector la encuentre — y lo haces con la misma frase las dos veces."*

Dato a favor de la rúbrica: el episodio 4 también contiene la **mejor** demostración de "mostrar" de todo el corpus (*"Los empleados eligieron a sus líderes. Las finanzas de todos, públicamente expuestas... cada uno proponía su salario"*) — tres acciones concretas, sin nombrar ningún concepto abstracto. Eso demuestra que el problema no es capacidad, es hábito — que es exactamente la clase de insight que Creative DNA promete ("no es un error aislado, es tu patrón actual"), aplicado aquí a nivel de guion en vez de a nivel de usuario a través del tiempo.

---

## Huecos reales que esta calibración destapó (esto es lo que buscábamos)

1. **No existe eje de consistencia factual.** "5.000" vs "5.127" prototipos no lo atrapa ningún eje de Storytelling — es un problema de investigación/verificación, no de narrativa. Dado que HUMANOS ya tiene un agente Veritas para esto en su propio pipeline, probablemente no necesita ser un eje del motor de Creator Lab — pero si Creator Lab va a evaluar guiones de dominios como Investigación (fuera del MVP, pero en el roadmap), esto sí importaría. Queda anotado, no resuelto.
2. **La biblioteca de clichés está incompleta en un lugar predecible: aperturas de "invitación imaginativa".** *"Imagina que..."* y *"Suena a locura, ¿verdad?"* son patrones reconocibles que no estaban en el seed inicial (que solo cubría curiosity-gap y listicle). Candidatos nuevos para `cliche-library.md`.
3. **Las notas visuales `(Visual: ...)` no se evaluaron.** Correcto para el MVP (mentor de solo texto), pero hay que documentar explícitamente que estas líneas se excluyen del beat map, no que se ignoraron por descuido.
4. **La frase de cierre de marca ("Yo soy Jota y esto es HUMANOS...") no se penalizó** en `cierre_cta` a pesar de ser genérica — correcto, porque es un dispositivo de marca intencional y repetido a propósito, no un CTA débil. Vale la pena una regla explícita: el motor necesita poder distinguir "texto de marca fijo" de "CTA evaluable", o va a penalizar consistencia de marca como si fuera pereza creativa.

## Veredicto sobre si la rúbrica "aguanta"

Aguanta. Produjo evidencia específica y accionable en los 7 ejes, sin necesitar ningún ajuste de banda ni de escala para procesar texto real. Lo que no aguantó fue el **scope** — encontró un problema real (consistencia factual) que está fuera de lo que Storytelling debería medir, y una biblioteca de clichés más corta de lo que el mundo real necesita. Ambos son hallazgos baratos de corregir ahora.

## Episodio 05 — Ehud Shabtai

### Digest

```
Tu mayor fortaleza     → setup_payoff (78) — "mapas caros, controlados por pocos" se paga limpio con
                          "no tiene que venderse, se puede construir, juntos"
Tu cuello de botella    → hook (36) — el más débil de los tres episodios calibrados: es contexto expositivo,
                          no abre una pregunta ni una tensión real
Tu siguiente práctica   → la reveladora "los usuarios no solo seguían rutas, las creaban" (banda 4) podría
                          moverse casi al inicio y convertirse en el hook — ya tienes el mejor material del
                          guion, está en el lugar equivocado
```

### Scorecard completo

| Eje | Score | Banda | Evidence |
|---|---|---|---|
| `hook` | 36 | 2 | `omission` — no hay pregunta ni contradicción en la apertura, solo contexto ("los mapas eran caros, anticuados") |
| `tension_ritmo` | 60 | 3 | `pattern` — arranque plano (beats 1–5) pero la secuencia "diferencia esencial → la creaban → reportaban tráfico... → tiempo real → miles de personas" escala de verdad — la mejor racha de las tres muestras |
| `economia` | 56 | 3 | `quote` — *"Quería más que eso"* es la línea más prescindible de las tres muestras calibradas hasta ahora |
| `mostrar_vs_nombrar` | 42 | 3 | `quote` (negativo) — *"Su obsesión: un mundo donde cada conductor fuera un cartógrafo"* / `quote` (positivo) — *"Reportaban tráfico, accidentes, incluso la posición de radares"* — ver hallazgo abajo |
| `setup_payoff` | 78 | 5 | `quote` — el mejor payoff de las tres muestras: *"un mapa no tiene que venderse"* responde con la imagen exacta opuesta de "los mapas eran caros" |
| `especificidad_voz` | 62 | 4 | `quote` — "Ehud Shabtai, en Israel", "Waze", la lista de tráfico/accidentes/radares es concreta; bookended por frases genéricas ("un puñado de empresas", "los gigantes") |
| `cierre_cta` | 71 | 4 | `quote` — cierre temático fuerte, ligeramente más declarativo que la pregunta abierta del episodio 4 |

---

## El hallazgo que esta tercera muestra realmente entrega

No es "confirmamos el patrón" de forma limpia — es más interesante que eso, y hay que decirlo honesto.

**A nivel de técnica, el patrón se confirma con total claridad:**

> Ep. 03: *"Su paradoja: cientos de fracasos construyeron el éxito supremo."*
> Ep. 04: *"Su paradoja: democratizar al extremo una empresa para hacerla más rentable."*
> Ep. 05: *"Su obsesión: un mundo donde cada conductor fuera un cartógrafo."*

La misma plantilla — `"Su [tema]: [declaración]"` — usada tres veces, siempre para nombrar el núcleo emocional o temático en vez de mostrarlo. Además, "democratizó" (Ep. 04) y "democratizó la navegación" (Ep. 05) repiten casi la misma palabra clave como atajo temático en dos episodios distintos — un segundo hábito, a nivel de vocabulario, no de estructura.

**Pero a nivel de score, el umbral formal de `pattern_insight` (score < 41 en 3 de 5 prácticas) NO se cumple limpio:** Ep03 = 18 (sí), Ep04 = 43 (no, banda 3), Ep05 = 42 (no, banda 3). Solo 1 de 3 cae claramente bajo el umbral. Los episodios 4 y 5 tienen suficientes beats fuertes de "mostrar" en otras partes del texto (los ejemplos concretos de Semco, la lista de tráfico/accidentes/radares de Waze) para que el promedio del eje no caiga tan bajo, aunque la técnica problemática esté ahí, textualmente idéntica en su construcción.

**Esto es un hueco real en el diseño de Creative DNA, no un fallo de los guiones.** El umbral por score agregado puede no disparar aunque una técnica específica se repita palabra por palabra, porque el resto del texto compensa el promedio. La detección de patrón debería poder activarse también por **coincidencia de Evidence** (la misma construcción textual repetida), no solo por el score de banda del eje completo. Es exactamente el tipo de brecha que una calibración con texto real tiene que encontrar — y la encontró al tercer guion, no antes.

## Actualización de pendientes de este documento

- [x] Correr un tercer guion — hecho, episodio 5
- [ ] Ajustar la regla de `pattern_insight` en `rubric-engine.md` para que también dispare por coincidencia de Evidence repetida (misma construcción textual), no solo por umbral de score agregado
- [ ] Agregar `su_tema_dos_puntos` como patrón nuevo a `cliche-library.md`, vinculado a `mostrar_vs_nombrar` — primer patrón de la biblioteca que no es de `hook` ni `cierre_cta`, descubierto empíricamente por calibración, no adivinado de antemano
- [ ] Evaluar si "democratizar/democratizó" como atajo temático merece su propio registro (nivel de vocabulario, no de estructura)
