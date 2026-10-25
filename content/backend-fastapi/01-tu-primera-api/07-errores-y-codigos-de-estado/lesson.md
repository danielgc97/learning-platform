---
title: "Errores y códigos de estado"
---

# Errores y códigos de estado

Cada respuesta de tu API lleva un **código de estado**: un número que le cuenta al frontend cómo salió todo.
Los que más usarás:

| Código | Significa | Cuándo |
|--------|-----------|--------|
| `200` | Todo bien | Respuesta normal |
| `201` | Creado | Después de un `POST` exitoso |
| `404` | No encontrado | Piden algo que no existe |
| `422` | Datos inválidos | Lo envía FastAPI solo, al validar |
| `500` | Error del servidor | Falló algo inesperado en tu código |

## Práctica

Mejora tu API con dos cambios. Primero, el `POST` responde `201`:

```python
@app.post("/tareas", status_code=201)
def crear_tarea(tarea: TareaNueva):
    ...
```

Segundo, que `PUT` avise cuando la tarea no existe, usando `HTTPException`:

```python
from fastapi import HTTPException


@app.put("/tareas/{tarea_id}")
def actualizar_tarea(tarea_id: int, cambios: TareaNueva):
    respuesta = (
        supabase.table("tareas")
        .update(cambios.model_dump())
        .eq("id", tarea_id)
        .execute()
    )
    if not respuesta.data:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return respuesta.data[0]
```

`HTTPException` se **lanza** con `raise` (como los errores de Python) y detiene la función. El frontend
recibe el código y un JSON con el mensaje `detail`.

Prueba en `/docs` actualizar la tarea 99999: debe responder `404`.

Los mensajes de error son para personas: sé claro, pero no reveles detalles internos (rutas, claves, consultas).

Comprueba lo que entendiste con la pregunta de abajo.
