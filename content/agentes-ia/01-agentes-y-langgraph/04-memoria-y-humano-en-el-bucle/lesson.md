---
title: "Memoria y humano en el bucle"
---

# Memoria y humano en el bucle

Un grafo normal "olvida" todo al terminar. Para recordar una conversación, o para **pausar y esperar a una
persona**, LangGraph usa un **checkpointer**: guarda una foto del estado después de cada paso.

Las fotos se organizan en **hilos** (*threads*). Cada conversación o caso tiene su propio `thread_id`:

```python
from langgraph.checkpoint.memory import InMemorySaver

grafo = constructor.compile(checkpointer=InMemorySaver())
config = {"configurable": {"thread_id": "caso-1"}}

grafo.invoke(entrada, config)
```

Con el mismo `thread_id` el grafo continúa donde se quedó; con otro, empieza de cero. `InMemorySaver` guarda en
la memoria del programa y se pierde al reiniciar: en un producto real se usa un guardado persistente (por
ejemplo, en PostgreSQL).

## Pedir aprobación antes de actuar

Para acciones delicadas (reembolsar, borrar, enviar un correo), el nodo puede **pausar** con `interrupt()` y
esperar una decisión humana:

```python
from langgraph.types import interrupt, Command


def pedir_aprobacion(estado):
    aprobado = interrupt(f"¿Apruebas reembolsar {estado['monto']}?")
    return {"estado": "reembolsado" if aprobado else "rechazado"}


# Más tarde, cuando la persona decide:
grafo.invoke(Command(resume=True), config)
```

La primera llamada se detiene en `interrupt` y devuelve la pregunta. Al reanudar con `Command(resume=True)`, ese
valor se convierte en la respuesta de `interrupt`. Es imprescindible tener un checkpointer y usar **el mismo
`thread_id`**.

<!-- REVISAR: ejemplos verificados con LangGraph 1.2 -->

Comprueba lo que entendiste con las preguntas de abajo.
