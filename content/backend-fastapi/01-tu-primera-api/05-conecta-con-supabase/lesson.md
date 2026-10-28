---
title: "Conecta tu API con Supabase"
---

# Conecta tu API con Supabase

Ya es hora de reemplazar la lista en memoria por la base de datos real. Necesitas la tabla `tareas` que
creaste en Supabase en el curso de SQL.

## Práctica

1. Instala los paquetes: `pip install supabase python-dotenv` y vuelve a ejecutar `pip freeze > requirements.txt`.
2. En Supabase abre **Project Settings → API Keys** y copia tu **Secret key** (empieza con `sb_secret_`).
3. Abre **Project Settings → Data API** y copia la **API URL**, pero **quítale el `/rest/v1/` del final**: debe quedar como `https://tu-proyecto.supabase.co`.
4. Crea un archivo `.env` (ya está en `.gitignore`):

```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu-clave-secreta
```

5. En `main.py`, crea el cliente y reescribe el listado:

```python
import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()
supabase = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_KEY"])


@app.get("/tareas")
def listar_tareas():
    respuesta = supabase.table("tareas").select("*").order("id").execute()
    return respuesta.data
```

Reinicia el servidor y abre `/tareas`: verás las filas de tu tabla.

`supabase.table("tareas").select("*")` es el `SELECT * FROM tareas` que ya conoces. El resultado está en
`respuesta.data`, como una **lista de diccionarios**.

## Cuidado con la clave

La clave secreta se salta las reglas de acceso de la base de datos: solo vive en el `.env` de tu backend.
**Nunca** va en el frontend, en Git ni en un chat con la IA.

Comprueba lo que entendiste con la pregunta de abajo.
