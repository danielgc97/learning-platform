---
title: "CRUD completo: crear, leer, actualizar y borrar"
---

# CRUD completo: crear, leer, actualizar y borrar

Con la base conectada, completa los cuatro verbos. Cada uno se corresponde con una instrucción SQL que ya
conoces.

| Endpoint | SQL | supabase-py |
|----------|-----|-------------|
| `POST /tareas` | `INSERT` | `.insert({...})` |
| `GET /tareas` | `SELECT` | `.select("*")` |
| `PUT /tareas/{id}` | `UPDATE ... WHERE` | `.update({...}).eq("id", id)` |
| `DELETE /tareas/{id}` | `DELETE ... WHERE` | `.delete().eq("id", id)` |

## Práctica

Reemplaza los endpoints de crear y obtener, y agrega actualizar y borrar:

```python
@app.post("/tareas")
def crear_tarea(tarea: TareaNueva):
    respuesta = supabase.table("tareas").insert(tarea.model_dump()).execute()
    return respuesta.data[0]


@app.put("/tareas/{tarea_id}")
def actualizar_tarea(tarea_id: int, cambios: TareaNueva):
    respuesta = (
        supabase.table("tareas")
        .update(cambios.model_dump())
        .eq("id", tarea_id)
        .execute()
    )
    return respuesta.data


@app.delete("/tareas/{tarea_id}")
def borrar_tarea(tarea_id: int):
    supabase.table("tareas").delete().eq("id", tarea_id).execute()
    return {"ok": True}
```

`.eq("id", tarea_id)` es el `WHERE id = ...`. **Nunca lo olvides** en `update` y `delete`: sin él, se
afectaría toda la tabla.

Prueba los cuatro desde `/docs`: crea una tarea, cámbiala, mírala en el **Table Editor** de Supabase y bórrala.

Comprueba lo que entendiste con la pregunta de abajo.
