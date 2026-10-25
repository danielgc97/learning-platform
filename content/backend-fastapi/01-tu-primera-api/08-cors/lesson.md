---
title: "CORS: permitir que tu frontend te hable"
---

# CORS: permitir que tu frontend te hable

Cuando construyas tu frontend, verás un error que asusta a casi todo el mundo: **"blocked by CORS policy"**.
No es un fallo de tu código: es una protección del navegador.

Un **origen** es la combinación de protocolo, dominio y puerto. Tu frontend en desarrollo vive en
`http://localhost:5173` y tu API en `http://127.0.0.1:8000`: son **orígenes distintos**. Por defecto, el
navegador impide que una página llame a otro origen, a menos que ese otro origen lo **autorice**.

Quien autoriza es el backend. En FastAPI se hace con un *middleware*.

## Práctica

Agrega a `main.py`, justo después de `app = FastAPI()`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

`allow_origins` es la lista de direcciones de frontend que puedes aceptar. En desarrollo basta con la de Vite
(`5173` es su puerto habitual). Cuando publiques, agregarás la dirección real de tu frontend.

Evita `["*"]` (permitir cualquier origen) en un producto real, sobre todo si tu API usa inicio de sesión.

Guarda un commit: `git add .` y `git commit -m "API de tareas con Supabase y CORS"`.

## Con tu IA

Si ves un error de CORS, pégalo completo y añade: "Mi frontend corre en http://localhost:5173 y mi backend es
FastAPI". Pídele que revise el backend, no que desactive el navegador.

Comprueba lo que entendiste con la pregunta de abajo.
