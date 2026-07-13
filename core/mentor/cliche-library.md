# Biblioteca de clichés

> Consumido por `core/mentor/rubric-engine.md` (pieza 2, Evidence Extractor, tipo `cliche_match`). Es una capability del motor, no de Storytelling — cualquier eje de cualquier dominio puede tener patrones de cliché asociados.

## Por qué esto no vive dentro de Storytelling

Un cliché de hook ("no vas a creer lo que pasó después") es un patrón de ejecución sobreusado, evaluado contra el eje `hook` — el mismo eje que ya usa Escritura. El día que Escritura evalúe headlines, va a necesitar su propia lista de clichés de headline contra el mismo mecanismo. Edición eventualmente va a tener clichés de transición (zoom bruscos, whooshes genéricos) contra `tension_ritmo`. Construir esto una sola vez, vinculado a ejes y no a dominios, evita reconstruir el detector cada vez.

## Schema

```
ClichePattern
├── id
├── key                (ej. "reveal_delay_generico")
├── axis_key           fk → rubric_axes (a qué eje aplica este patrón)
├── domains_seen_in     [array — dónde se ha detectado en la práctica, informativo, no restrictivo]
├── description        (qué hace que este patrón sea reconocible como fórmula)
├── example_generic     (ejemplo ilustrativo escrito para este documento, no una cita real de ningún creador)
└── severity            enum(bajo, medio, alto)   ← qué tanto penaliza si aparece, no todos los clichés pesan igual
```

`severity` importa porque no todo cliché es igual de grave: un CTA ligeramente genérico no es lo mismo que un hook que es literalmente la fórmula más reconocible de la plataforma. El `cliche_match` de Evidence hereda la `severity` del patrón que coincidió.

## Cómo se usa (integración con el motor)

Un texto puede sacar score alto en el eje `hook` estructuralmente (banda 4-5 por diseño de la pregunta) y aun así estar marcado por cliché — son evaluaciones independientes. El `feedback.cliche_detectado` (ver modelo de datos) se activa si **cualquier** Evidence de tipo `cliche_match` con `severity` medio o alto aparece en la práctica, sin importar el score del eje asociado.

## Seed inicial — eje `hook` (16 patrones)

| key | Descripción del patrón | Ejemplo genérico (ilustrativo) | Severidad |
|---|---|---|---|
| curiosity_vacio | Promete revelación sin dar ningún dato concreto | "No vas vas a creer lo que pasó..." | alto |
| listicle_numerado | Formato "N cosas que nadie te dice sobre X" sin ángulo propio | "5 cosas que nadie te dice sobre..." | medio |
| pregunta_retorica_vacia | Pregunta que no abre tensión real, solo introduce el tema | "¿Alguna vez te has preguntado sobre...?" | medio |
| dato_sin_pregunta | Presenta un dato o estadística sin convertirlo en pregunta | Afirmación seguida de una cifra, sin gancho | medio |
| falsa_urgencia | Urgencia genérica sin razón específica | "Esto puede cambiar tu vida para siempre" | alto |
| pero_eso_no_es_lo_peor | Escalada de sorpresa usada como muletilla, no como estructura real | "...pero eso no es lo peor" repetido sin nueva información | medio |
| pregunta_yes_no | Pregunta que se responde con sí/no, sin escalar curiosidad | "¿Sabías que...?" | bajo |
| secreto_de_industria | Apela a "lo que la industria no quiere que sepas" sin evidencia | "Lo que nadie de [industria] te va a decir" | medio |
| historia_generica_de_exito | Abre con "esta es la historia de alguien que lo logró todo" sin especificidad | Apertura de biografía sin dato distintivo temprano | medio |
| amenaza_vaga | Advierte una consecuencia negativa sin especificarla | "Si no haces esto, vas a arrepentirte" | alto |

## Seed inicial — eje `cierre_cta` (6 patrones)

| key | Descripción del patrón | Ejemplo genérico (ilustrativo) | Severidad |
|---|---|---|---|
| sigueme_generico | CTA desconectado del contenido, aplicable a cualquier video | "Sígueme para más contenido como este" | medio |
| comenta_si | Pide comentario sin dar razón específica para hacerlo | "Comenta 'sí' si te pasó esto" | bajo |
| link_biografia_seco | Remite al link en bio sin conectar con la promesa del hook | "Link en mi bio" sin contexto | bajo |
| pregunta_cierre_vacia | Cierra con pregunta que no invita a responder algo específico | "¿Y tú qué opinas?" | bajo |

## Seed inicial — eje `mostrar_vs_nombrar` (1 patrón, descubierto por calibración, no adivinado)

| key | Descripción del patrón | Ejemplo genérico (ilustrativo) | Severidad |
|---|---|---|---|
| su_tema_dos_puntos | Anuncia el núcleo emocional/temático con la construcción "Su [tema]: [declaración]" en vez de mostrarlo con una escena | "Su obsesión: cambiar el mundo." | alto |

Este es el primer patrón de la biblioteca que no vive en `hook` ni `cierre_cta` — se encontró corriendo la calibración de `core/mentor/rubric-engine.md` contra 3 episodios reales de HUMANOS (ver `docs/calibration-storytelling-ep03-05.md`), donde apareció con la misma construcción literal 3 veces. Es la prueba de que el mecanismo "¿quién agrega un patrón nuevo?" (ver pendiente abajo) sí funciona: se agrega cuando la evidencia real lo confirma, no por adivinanza previa.

## Pendiente

- [ ] Poblar seed de `economia`, `especificidad_voz`, `claridad` (bajo — menos propensos a fórmulas reconocibles que hook/CTA, pero vale revisar)
- [ ] Definir mecanismo de actualización: ¿quién agrega un patrón nuevo cuando el mentor detecta uno recurrente que no está en la lista? (probablemente: se registra como `pattern_insight` a nivel de producto, no de usuario individual, cuando el mismo texto aparece repetido entre múltiples usuarios distintos)
- [ ] Confirmar que ningún ejemplo de esta lista se acerque demasiado a un caso real específico — deben quedar como patrones genéricos, no casos de un creador identificable
