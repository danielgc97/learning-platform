---
title: "Tu primer endpoint y la documentación automática"
---

# Tu primer endpoint y la documentación automática

Un endpoint en FastAPI es una función de Python con una etiqueta (un **decorador**) que dice su verbo y su
ruta.

## Práctica

1. Crea el archivo `main.py` con este código:

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def inicio():
    return {"mensaje": "Hola desde tu API"}


@app.get("/tareas")
def listar_tareas():
    return [{"id": 1, "titulo": "Comprar pan", "hecha": False}]
```

2. Arranca el servidor de desarrollo:

```
fastapi dev
```

3. Abre en el navegador `http://127.0.0.1:8000/tareas`. Verás el JSON de la lista.
4. Abre `http://127.0.0.1:8000/docs`. FastAPI generó una **página interactiva** con todos tus endpoints, donde puedes probarlos sin escribir nada más.

Cómo se lee `@app.get("/tareas")`: "cuando llegue un `GET` a `/tareas`, ejecuta la función de abajo". Lo que
la función devuelve (diccionarios, listas) FastAPI lo convierte a JSON.

El servidor se reinicia solo cada vez que guardas el archivo. Para detenerlo, pulsa `Ctrl + C`.

## Con tu IA

Cuando le pidas un endpoint nuevo, indícale el verbo, la ruta y qué debe devolver: "Agrega `GET /salud` que
devuelva `{"estado": "ok"}`".

Comprueba lo que entendiste con la pregunta de abajo.
