---
title: "Decisiones y ciclos: aristas condicionales"
---

# Decisiones y ciclos: aristas condicionales

Una arista fija siempre va al mismo lugar. Una **arista condicional** usa una función que mira el estado y
**decide a cuál nodo ir**. Ahí es donde el grafo se vuelve un agente.

```python
class Borrador(TypedDict):
    texto: str
    intentos: int
    aprobado: bool


def decidir(estado: Borrador):
    if estado["aprobado"] or estado["intentos"] >= 3:
        return END
    return "escribir"


constructor = StateGraph(Borrador)
constructor.add_node("escribir", escribir)
constructor.add_node("revisar", revisar)
constructor.add_edge(START, "escribir")
constructor.add_edge("escribir", "revisar")
constructor.add_conditional_edges("revisar", decidir)
```

(`escribir` y `revisar` son nodos, funciones como la de la lección anterior: la primera agrega texto y suma un intento; la segunda marca `aprobado`.)

Lectura: se escribe, se revisa, y `decidir` responde: si ya está aprobado (o se agotaron los intentos), termina;
si no, **vuelve** al nodo `escribir`. Ese regreso forma un **ciclo**.

El agente con herramientas funciona igual:

```
START → modelo ─ ¿pidió una herramienta? ─ sí → herramientas → modelo
                                          └ no → END
```

El modelo decide; si pide una herramienta, se ejecuta y el resultado vuelve al modelo, hasta que responde sin
pedir más.

## Frena los ciclos

Un ciclo sin salida gasta dinero sin parar. Por eso siempre: (1) pon una condición de término clara,
(2) lleva un **contador** en el estado, como `intentos`, y (3) revisa el límite de pasos que LangGraph
permite configurar. <!-- REVISAR: confirmar el nombre y valor por defecto de recursion_limit en la documentación actual -->

Comprueba lo que entendiste con las preguntas de abajo.
