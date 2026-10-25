---
title: "LangGraph: estado, nodos y aristas"
---

# LangGraph: estado, nodos y aristas

LangGraph describe un agente como un **grafo**: un mapa de pasos conectados. Tiene tres piezas:

- **Estado**: la "libreta compartida" con los datos de la ejecución. Se declara como un diccionario tipado.
- **Nodos**: funciones de Python que reciben el estado y devuelven **solo lo que quieren cambiar**.
- **Aristas**: las flechas que dicen qué nodo va después.

`START` y `END` son los puntos de entrada y salida. Así se ve el grafo más simple (un nodo):

```python
from typing import TypedDict
from langgraph.graph import StateGraph, START, END


class Estado(TypedDict):
    pregunta: str
    respuesta: str


def responder(estado: Estado):
    return {"respuesta": f"Recibí: {estado['pregunta']}"}


constructor = StateGraph(Estado)
constructor.add_node("responder", responder)
constructor.add_edge(START, "responder")
constructor.add_edge("responder", END)

grafo = constructor.compile()
resultado = grafo.invoke({"pregunta": "Hola"})
```

Pasos: se crea el constructor con la forma del estado, se registran los nodos, se conectan con aristas y se
**compila** (es obligatorio antes de usarlo). `invoke` ejecuta el grafo con un estado inicial.

Un detalle clave: el nodo `responder` devuelve únicamente `{"respuesta": ...}`. LangGraph **combina** esa
actualización con el resto del estado, que conserva `pregunta`.

<!-- REVISAR: ejemplos verificados con LangGraph 1.2; la API puede cambiar en versiones futuras -->

Comprueba lo que entendiste con las preguntas de abajo.
