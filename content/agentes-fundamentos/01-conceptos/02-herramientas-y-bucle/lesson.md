---
title: "Herramientas y el bucle del agente"
---

# Herramientas y el bucle del agente

Una **herramienta** es una función normal de tu programa que el agente puede pedir que se ejecute,
por ejemplo `buscar_precio(producto)`.

El modelo **no ejecuta nada por sí mismo**. Lo que hace es responder con una *solicitud* estructurada:
"quiero usar `buscar_precio` con `producto="Laptop"`". Tu código ejecuta la función, entrega el resultado
al modelo y este decide qué hacer después.

El ciclo completo es:

1. El modelo recibe el objetivo y el historial.
2. Decide: responder al usuario o pedir una herramienta.
3. Si pidió una herramienta, tu código la ejecuta y devuelve el resultado.
4. Se repite desde el paso 1 hasta que el modelo da la respuesta final.

Responde la pregunta de abajo para comprobarlo.
