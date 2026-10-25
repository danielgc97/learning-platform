---
title: "Cómo darle contexto a un asistente de código"
---

# Cómo darle contexto a un asistente de código

Un asistente de IA **no conoce tu proyecto**: solo ve lo que le das. Cuanto mejor el contexto,
mejores los resultados.

## Qué darle

- **Qué construyes y para quién**, y con qué tecnología.
- **Un documento de especificación** (por ejemplo, un archivo `SPEC.md`) con las decisiones tomadas y sus límites.
- **Reglas de trabajo** en un archivo de instrucciones (en Claude Code se llama `CLAUDE.md`): cómo trabajar,
  qué no tocar, qué pedirte antes de actuar.
- **Un criterio de éxito:** cómo sabrás que está bien ("debe mostrar este resultado", "debe pasar esta prueba").

## Cómo pedir

Mejor **tareas pequeñas, una a la vez**, que un mensaje enorme.

- Pedido débil: *"hazme una plataforma de cursos"*.
- Pedido sólido: *"agrega una pantalla que liste los cursos desde esta API; debe mostrar título y descripción"*.

Las tareas chicas son más fáciles de revisar, de probar y de deshacer si algo sale mal.

Responde la pregunta de abajo para comprobarlo.
