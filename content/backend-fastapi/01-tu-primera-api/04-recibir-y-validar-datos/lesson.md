---
title: "Recibir datos con POST y validarlos"
---

# Recibir datos con POST y validarlos

Para **crear** algo, el frontend envía los datos en el cuerpo (*body*) de una petición `POST`, en formato JSON.
En FastAPI describes cómo debe verse ese cuerpo con una clase de **Pydantic**, igual a las que viste en el
curso de Python.

## Práctica

Agrega a `main.py`:

```python
from pydantic import BaseModel


class TareaNueva(BaseModel):
    titulo: str
    hecha: bool = False


@app.post("/tareas")
def crear_tarea(tarea: TareaNueva):
    nueva = {"id": len(TAREAS) + 1, "titulo": tarea.titulo, "hecha": tarea.hecha}
    TAREAS.append(nueva)
    return nueva
```

(Pon el `import` al inicio del archivo, junto al de FastAPI.)

En `/docs`, abre `POST /tareas`, pulsa **Try it out**, escribe `{"titulo": "Llamar al dentista"}` y ejecuta.
Después consulta `GET /tareas`: debe aparecer.

Ahora prueba enviar `{"hecha": true}` sin título: recibirás un `422` que dice exactamente qué falta.

Las reglas son: un campo **sin valor por defecto es obligatorio** (`titulo`), y uno **con valor por defecto es
opcional** (`hecha`). Pydantic también comprueba los tipos.

## Con tu IA

"Agrega `POST /tareas` que reciba `titulo` (texto obligatorio) y `hecha` (opcional, por defecto false) con un
modelo de Pydantic. No cambies los otros endpoints."

Comprueba lo que entendiste con la pregunta de abajo.
