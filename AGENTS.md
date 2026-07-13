# AGENTS.md — Creativity Lab

Registro de skills de Claude Code específicos de este repo. Ver cada `SKILL.md` para el contrato completo (activation, hard rules, execution steps).

## Skills del proyecto

| Skill | Path | Trigger | Qué hace |
|---|---|---|---|
| `revision-final` | `.claude/skills/revision-final/SKILL.md` | revisión final, revisar el sitio, checklist final, pre-launch review | Checklist de revisión pre-lanzamiento del sitio en un browser real (mobile viewport, navegación, copy, imágenes, tono). Solo reporta — no fixea. |
| `jota-sdd` | `.claude/skills/jota-sdd/SKILL.md` | jota-sdd, spec completa, brief técnico, especificación de 12 secciones | Arma una spec de 12 secciones (resumen, objetivo, alcance, entradas/salidas, flujo, casos de uso, reglas, errores, criterios de aceptación, restricciones técnicas, futuras versiones) en `docs/specs/YYYY-MM-DD-title.md`. |
| `verify-after-changes` | `.claude/skills/verify-after-changes/SKILL.md` | implementación terminada, probar cambios, verificar en el navegador | Después de implementar un plan/spec: levanta el server, prueba 5 casos clave en un browser real contra el spec/plan, arregla lo que falle y repite el pase completo antes de dar luz verde. |

## Convención

- Skills nuevos van en `.claude/skills/{nombre}/SKILL.md`.
- Si un skill deja de ser específico de este proyecto y sirve para reutilizar en otros, se copia a `C:\Users\Jota Ochoa\Claude_Cowork\skills\` (ver README ahí).
- Actualizar esta tabla cada vez que se cree, renombre o elimine un skill del proyecto.
