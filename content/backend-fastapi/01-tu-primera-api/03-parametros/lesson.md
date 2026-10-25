---
title: "Datos en la URL: parámetros"
---

# Datos en la URL: parámetros

Los endpoints necesitan recibir datos: "dame la tarea 3", "dame solo las pendientes". Hay dos formas de
pedirlos desde la URL.

**Parámetro de ruta**: es parte de la dirección y identifica un elemento. Va entre llaves en la ruta.

**Parámetro de consulta**: va después de un `?` y sirve para filtrar. Es opcional si le das un valor por defecto.

## Práctica

Reemplaza `listar_tareas` en `main.py` y agrega el segundo endpoint:

```python
TAREAS = [
    {"id": 1, "titulo": "Comprar pan", "hecha": False},
    {"id": 2, "titulo": "Pagar la luz", "hecha": True},
]


@app.get("/tareas")
def listar_tareas(hecha: bool | None = None):
    if hecha is None:
        return TAREAS
    resultado = []
    for t in TAREAS:
        if t["hecha"] == hecha:
            resultado.append(t)
    return resultado


@app.get("/tareas/{tarea_id}")
def obtener_tarea(tarea_id: int):
    for t in TAREAS:
        if t["id"] == tarea_id:
            return t
```

Pruébalo en `/docs` o en el navegador: `/tareas`, `/tareas?hecha=true` y `/tareas/2`.

Fíjate en `tarea_id: int`: esa anotación de tipo es una **validación**. Si visitas `/tareas/abc`, FastAPI
responde con un error `422` explicando que "abc" no es un número, sin ejecutar tu función.

(`TAREAS` es una lista en memoria, solo para practicar: se pierde al reiniciar. En dos lecciones la
reemplazarás por la base de datos.)

Comprueba lo que entendiste con la pregunta de abajo.
