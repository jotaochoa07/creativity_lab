# Perfil de dominio — Escritura

> Consume `core/mentor/rubric-engine.md` y `core/mentor/rubric-axes-registry.md`. Este archivo no define ejes ni bandas — selecciona ejes del registro global y agrega solo lo que es genuinamente específico de Escritura. Si alguna vez hay que tocar el motor o el registro para agregar Escritura, la abstracción está incompleta.
>
> Este perfil es la **prueba de fuego** del motor (ver `CLAUDE.md` sección 8): la pregunta que responde no es "¿qué evalúa Escritura?" sino "¿el motor construido para un solo dominio (Storytelling) generaliza sin tocarse a un segundo dominio con un alcance de contenido mucho más amplio (Guiones, Posts, Newsletter, Threads, Blogs, Carruseles, Shorts, Long Form, Emails, Landing Pages, Headlines — ver `docs/creator-lab-domains.md`, dominio 5)?"

## Veredicto de la prueba de fuego

**El motor aguantó sin tocarse.** No fue necesario modificar `rubric-engine.md` ni `rubric-axes-registry.md` para que Escritura encajara. De hecho, el registro **ya traía Escritura anticipada**: el eje `claridad` existe únicamente porque nació para este dominio (ver su descripción en `rubric-axes-registry.md`: *"Eje introducido para Escritura — no todo eje nace en Storytelling"*), y la "Matriz de reutilización por dominio" al final de ese mismo archivo ya listaba qué ejes aplican a Escritura antes de que este perfil se escribiera. Eso es una señal fuerte de que el diseño de "eje transversal + perfil que selecciona" funciona como se pensó.

Lo que sí aparece — y se documenta abajo como hallazgos, no como parches silenciosos — son puntos de fricción reales en piezas más finas del motor (el esquema de `location` de Evidence, la granularidad de `applicable_content_types`, y la cobertura de la biblioteca de clichés). Ninguno requiere romper el contrato del motor; todos son huecos de especificidad que el motor ya sabe que puede tener (ver "Pendiente" en `rubric-engine.md` y `rubric-axes-registry.md`).

## Ejes que usa (del registro `rubric_axes`, ver `rubric-axes-registry.md`)

`hook`, `economia`, `mostrar_vs_nombrar`, `especificidad_voz`, `claridad`, `cierre_cta`.

### Ejes que NO usa, y por qué

| Eje | Por qué se excluye |
|---|---|
| `tension_ritmo` | Es un eje de **diseño estructural** de la narrativa — escalada de intensidad beat a beat. Esa decisión ya se tomó en el dominio Storytelling antes de que la pieza llegue a Escritura. El trabajo de Escritura es ejecutar en prosa limpia una estructura que ya fue diseñada, no rediseñar el arco de tensión. |
| `setup_payoff` | Mismo argumento: sembrar y pagar una promesa narrativa es una decisión de estructura, no de ejecución de prosa. Pertenece a Storytelling (y, a futuro, a Edición vía callbacks visuales). |

Ambas exclusiones comparten una misma tesis de diseño de dominio: **Storytelling decide "qué se cuenta y en qué orden"; Escritura ejecuta "cómo queda escrito, formato por formato".** Esa tesis es la que hace que la fricción #1 de abajo importe — porque en la práctica esa línea no siempre es tan limpia (ver fricción 1).

## Peso por nivel del usuario (`weight_by_level` en `domain_axes`)

| Nivel del usuario | Eje de mayor peso | Razón |
|---|---|---|
| 1–3 (principiante) | `claridad` + `economia` | Antes de pulir voz o cierre, el texto tiene que poder leerse una sola vez sin relectura y sin relleno. Es más básico que `hook` — un texto puede tener un enganche fuerte y seguir siendo ilegible después. |
| 4–6 (intermedio) | `hook` + `mostrar_vs_nombrar` | Con la base clara, el foco pasa a enganchar en la apertura (título, subject, primera línea) y a demostrar en vez de declarar. |
| 7–10 (avanzado) | `especificidad_voz` + `cierre_cta` | El estándar sube, no se relaja: voz irremplazable y un cierre/CTA que se sienta consecuencia natural del texto, no un agregado. |

## Lo que sí es específico de este dominio (no ejes, mecánicas propias)

### No hay un mapa de beats único — hay una "unidad de apertura/cuerpo/cierre" que varía por formato

Storytelling evalúa `tension_ritmo` sobre un mapa de beats de un guion. Escritura no tiene un formato único que mapear: un post, un subject line de email, un hilo de Twitter, un blog largo y un headline de landing page no comparten estructura física. Lo que sí comparten — y es la mecánica propia de este perfil — es una función en tres partes que todo formato de Escritura tiene, aunque cambie de nombre:

| Función | Ejemplos según formato |
|---|---|
| Apertura (evaluada con `hook`) | primera línea de un post, subject de un email, título de un blog, primer tweet de un thread, headline de landing page |
| Cuerpo (evaluado con `economia`, `mostrar_vs_nombrar`, `especificidad_voz`, `claridad`) | el resto del post/email/blog/thread/carrusel |
| Cierre (evaluado con `cierre_cta`) | último párrafo de un blog, CTA de un email o landing page, último tweet de un thread |

Esto es intencional y barato: no exige un extractor de evidencia nuevo por formato, exige que el mentor identifique correctamente cuál fragmento del texto cumple qué función antes de puntuar. Es la razón por la que este perfil no necesita ejes nuevos — pero sí necesita que la extracción de evidencia (sección siguiente) sea explícita sobre "dónde" mirar en cada formato, cosa que Storytelling no necesitaba resolver porque solo tenía un formato (guion).

### Superposición deliberada con Storytelling

Cinco de los seis ejes de Escritura (`hook`, `economia`, `mostrar_vs_nombrar`, `especificidad_voz`, `cierre_cta`) también los usa Storytelling. Esto no es redundancia — es el diseño de Creative DNA funcionando como se documentó en `CLAUDE.md` sección 3.1 y `rubric-engine.md`: el perfil de "Economía" de un usuario es el mismo activo sin importar si practicó en Storytelling o en Escritura. Un usuario que practica exclusivamente Escritura sigue construyendo señal en `hook`, `economia`, etc. Ver fricción 2 abajo sobre la pregunta que esto sí abre.

## Extracción de evidencia por eje en Escritura

Guía concreta de qué debe buscar el mentor en una pieza de Escritura para puntuar cada eje aplicable. Mismo nivel de concreción que el motor documenta en `rubric-engine.md` y que la calibración real mostró en `docs/calibration-storytelling-ep03-05.md`.

### `hook`
Mirar la apertura literal del formato (primera línea del post, subject del email, título del blog, primer tweet del thread, headline de la landing). Evidence esperado:
- `quote` — la línea de apertura completa.
- `cliche_match` — si coincide con un patrón conocido de `cliche-library.md` (ver fricción 3: el seed actual está sesgado a hooks de video/redes cortas, no a subject lines o headlines de copywriting).

Ejemplo ilustrativo de banda baja: *"5 tips de productividad que cambiarán tu día"* (título genérico, intercambiable con miles de posts del mismo tema — banda 2). Ejemplo de banda alta: un subject line que abre una pregunta específica con una consecuencia clara para el lector si no la responde (banda 4–5).

### `economia`
Mirar el cuerpo completo del texto, oración por oración (o tweet por tweet en un thread, slide por slide en un carrusel). Evidence esperado:
- `quote` — la oración, párrafo o tweet prescindible.
- En Escritura este eje también debe capturar un problema propio del formato corto: **relleno de transición** ("Dicho esto...", "Sin más preámbulo...") que en un guion audiovisual pasa casi desapercibido pero en un post de texto ocupa espacio real y cuesta lectura.

### `mostrar_vs_nombrar`
Mirar si el texto declara una conclusión/beneficio/emoción directamente o la demuestra con un ejemplo, dato o caso concreto. En Escritura esto aparece muy seguido en copy de venta: nombrar es *"nuestro producto es innovador"*; mostrar es describir qué hace el producto que ningún otro hace. Evidence esperado:
- `quote` — la línea que nombra en vez de demostrar.
- `omission` — cuando el texto promete un beneficio y nunca lo sustenta con nada concreto en el resto del cuerpo.

### `especificidad_voz`
Mirar si el texto podría haberlo escrito cualquier cuenta/marca del mismo nicho, o si hay giros, ejemplos o anécdotas que solo esa persona/marca escribiría. Evidence esperado:
- `quote` — el fragmento genérico intercambiable ("en el mundo actual, la clave del éxito es...").
- `cliche_match` — jerga de nicho sobreusada (ver fricción 3, esto también necesita seed propio).

### `claridad`
El eje nativo de Escritura. Mirar si una sola lectura alcanza para entender el punto: oraciones largas con múltiples cláusulas, términos técnicos sin definir, ambigüedad sintáctica (a qué se refiere "esto" o "eso"). Evidence esperado:
- `quote` — la oración que exige relectura.
- Nota práctica: en formatos cortos (subject lines, headlines, primer tweet de un thread) la claridad pesa doble porque no hay una segunda oración que salve la ambigüedad de la primera — a diferencia de un blog largo, donde una oración densa aislada pesa menos sobre el total.

### `cierre_cta`
Mirar si el cierre responde lo que la apertura prometió, y si el CTA nace de esa lógica o se siente pegado. Evidence esperado:
- `quote` — el cierre y/o el CTA.
- `omission` — cuando el cierre no conecta con la apertura (el caso más común en copy apurado: CTA genérico tipo "compra ahora" sin relación con el argumento del cuerpo).

## Regla dura de salida (heredada de CLAUDE.md sección 5, aplica igual acá)

El mentor nunca reescribe la línea del usuario — tampoco en Escritura, aunque el formato (headline, subject line) tiente a "sugerir una versión mejor" porque parece un ajuste menor.

> Incorrecto: "Cambia tu subject line a: 'La razón por la que el 90% de los emails de venta no se abren'."
> Correcto: "Tu subject line describe el tema pero no abre una pregunta con consecuencia. ¿Qué le cuesta a tu lector si no abre este email hoy?"

## Hallazgos de la prueba de fuego (fricción real, no resuelta en silencio)

1. **La línea "Storytelling decide estructura, Escritura ejecuta prosa" no es tan limpia en todos los formatos.** Un thread de Twitter o un carrusel de Instagram sí tienen su propia micro-estructura de tensión/pago (el tweet 3 de 8 puede sembrar algo que el tweet 7 paga) que en la práctica es indistinguible de lo que `tension_ritmo`/`setup_payoff` miden en Storytelling — solo que a otra escala. Hoy ese caso queda sin cobertura: Escritura no lo mide (excluye esos ejes) y Storytelling tampoco lo ve (solo mira guiones). No es un bloqueo para el MVP (los formatos de Escritura priorizados no son threads largos), pero es una pregunta abierta real: ¿un thread/carrusel largo necesita eventualmente los ejes narrativos de Storytelling además de los de Escritura, en vez de ser puramente "ejecución"?
2. **La superposición de 5/6 ejes con Storytelling es intencional para Creative DNA, pero no hay todavía una señal de qué domain_id corresponde a qué práctica cuando el contenido es ambiguo.** Ej.: un guion corto para Reels ¿es una práctica de Storytelling o de Escritura? Hoy la única distinción formal es qué dominio eligió el usuario al subir la práctica — el motor no tiene una regla para sugerir el dominio correcto. Esto no rompe el motor (la elección la hace el usuario), pero sí es una decisión de producto pendiente, relacionada con el punto ya anotado en `CLAUDE.md` sección 8 sobre el diagnóstico inicial.
3. **La biblioteca de clichés (`cliche-library.md`) tiene sesgo de origen hacia hooks de video/redes cortas.** Los 16 patrones seed de `hook` (curiosity_vacio, listicle_numerado, pregunta_yes_no, etc.) fueron pensados para aperturas de video. Escritura necesita patrones propios de copywriting/headline de email y landing page (fórmulas tipo AIDA gastadas, "P.D." de venta genérico, urgencia falsa de carrito de compra) que hoy no existen en el seed. El propio `cliche-library.md` ya anota como pendiente poblar seeds de `economia`, `especificidad_voz` y `claridad` — este hallazgo confirma que ese pendiente es real y ahora tiene un dueño concreto (Escritura), no solo una nota genérica.
4. **El esquema `location` de Evidence (`{beat: int} | {line_range: [start, end]} | null`) no tiene una forma nativa para varios formatos de Escritura.** `line_range` funciona razonablemente para un blog o newsletter largos, pero es forzado para un subject line (una sola línea, no un rango), un thread (la unidad natural es el índice del tweet, no la línea) o un carrusel (índice de slide). Hoy este perfil resuelve el problema describiendo la ubicación en `reason` en vez de en `location` estructurado — funciona, pero es una solución de texto libre donde el motor ya tiene un campo estructurado para esto en otros dominios. Se anota como hallazgo para que un humano decida si vale la pena extender `location` con variantes tipo `{tweet_index: int}` / `{slide_index: int}` / `{segment: "subject" | "body" | "cta"}`, o si el campo `reason` en texto libre es suficiente para el volumen del MVP.
5. **`applicable_content_types` (text | video | image) no distingue formato dentro de "text".** Storytelling solo tenía un formato de texto (guion); Escritura tiene al menos ocho (post, thread, blog, newsletter, email, landing page, headline, carrusel-copy). El registro de ejes no necesitó tocarse para este perfil porque todos sus ejes de Escritura ya aplican a "text" en general — pero si más adelante un eje necesitara aplicar a unos formatos de texto y no a otros dentro de Escritura (ej. un eje de "estructura de hilo" que no aplique a landing pages), la granularidad actual no alcanzaría. No es un problema hoy; es una advertencia para cuando Escritura profundice más allá de los seis ejes actuales.

## Pendiente

- [ ] Decidir si los formatos largos de Escritura (threads extensos, carruseles narrativos) necesitan eventualmente acceso a `tension_ritmo`/`setup_payoff`, o si se mantienen fuera de alcance por diseño (ver hallazgo 1)
- [ ] Definir regla de asignación de dominio cuando una práctica es ambigua entre Storytelling y Escritura (ver hallazgo 2), posiblemente ligado al pendiente ya existente del diagnóstico inicial (`CLAUDE.md` sección 8)
- [ ] Poblar seed de clichés de copywriting/headline (email, landing page) en `cliche-library.md` para los ejes `hook`, `economia` y `especificidad_voz` en el contexto de Escritura (ver hallazgo 3)
- [ ] Evaluar con un humano si `Evidence.location` necesita variantes nuevas (`tweet_index`, `slide_index`, `segment`) o si `reason` en texto libre alcanza para el volumen del MVP (ver hallazgo 4)
- [ ] Calibrar `weight_by_level` y los descriptores heredados del registro contra piezas reales de Escritura (posts, emails, blogs), replicando la metodología de `docs/calibration-storytelling-ep03-05.md`
