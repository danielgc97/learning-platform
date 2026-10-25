---
title: "Proteger tu API con el token"
---

# Proteger tu API con el token

Al iniciar sesión, Supabase entrega al frontend un **token de acceso**. Ahora hay que enviarlo en cada
petición, y que tu backend lo valide.

## Práctica en el frontend

Cuando llames a tu API, agrega el token en la cabecera `Authorization`:

```js
const respuesta = await fetch(`${API}/tareas`, {
  headers: { Authorization: `Bearer ${sesion.access_token}` },
})
```

## Práctica en el backend

Crea en `main.py` una función que lea el token, lo valide con Supabase y devuelva el usuario. Los endpoints
que la pidan quedan protegidos:

```python
from fastapi import Depends, Header, HTTPException


def usuario_actual(authorization: str | None = Header(default=None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Inicia sesión para continuar")
    token = authorization.removeprefix("Bearer ")
    try:
        usuario = supabase.auth.get_user(token).user
    except Exception:  # cualquier fallo al validar significa "no autenticado"
        usuario = None
    if usuario is None:
        raise HTTPException(status_code=401, detail="Sesión inválida o vencida")
    return usuario


@app.get("/tareas")
def listar_tareas(usuario=Depends(usuario_actual)):
    respuesta = (
        supabase.table("tareas").select("*").eq("user_id", usuario.id).order("id").execute()
    )
    return respuesta.data
```

`Depends(usuario_actual)` hace que FastAPI ejecute esa función **antes** y rechace con `401` si falla. Sin
token válido, el endpoint ni se ejecuta. <!-- REVISAR: probar con un token real; la forma de la respuesta de get_user puede variar según la versión de supabase-py -->

Fíjate en `.eq("user_id", usuario.id)`: filtra por el usuario **que sale del token**, nunca por un dato que
mande el frontend. Haz lo mismo en crear (guarda `user_id`), actualizar y borrar. Para la columna `user_id`,
sigue la siguiente lección.

Comprueba lo que entendiste con la pregunta de abajo.
