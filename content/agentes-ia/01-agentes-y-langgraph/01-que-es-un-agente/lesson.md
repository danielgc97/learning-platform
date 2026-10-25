---
title: "¿Qué es un agente de IA?"
---

# ¿Qué es un agente de IA?

Este curso es **opcional**: puedes publicar tu producto sin agentes. Está pensado para cuando quieras que tu
producto "haga cosas" por el usuario, no solo responda. Aquí se aprende **leyendo y respondiendo preguntas**;
los ejemplos de código los verás, pero no se ejecutan en la plataforma.

Hay tres niveles, de menos a más autonomía:

| Nivel | Qué es | Ejemplo |
|-------|--------|---------|
| **Llamada simple** | Entra texto, sale texto | "Resume este correo" |
| **Workflow** (flujo) | Varios pasos en un orden que **tú defines** | Extraer datos, validarlos, guardarlos |
| **Agente** | Un modelo que **decide qué hacer** y repite hasta lograr un objetivo | Un asistente que busca un pedido, ve que está retrasado y propone una solución |

Un agente combina tres piezas:

- **Un modelo de lenguaje** que razona y decide el siguiente paso.
- **Herramientas**: funciones que el agente puede usar (buscar en tu base, enviar un correo).
- **Un bucle**: decidir, actuar, observar el resultado y volver a decidir, hasta terminar.

Más autonomía no es siempre mejor. Un agente es más flexible, pero también más impredecible, más lento y más
caro que un flujo fijo. Si ya conoces los pasos, usa un flujo.

Para construir esto, necesitas algo que organice los pasos, el estado y las decisiones. Esa es la tarea de
**LangGraph**, una librería de Python para orquestar agentes como grafos. La instalas con
`pip install -U langgraph`.

Comprueba lo que entendiste con las preguntas de abajo.
