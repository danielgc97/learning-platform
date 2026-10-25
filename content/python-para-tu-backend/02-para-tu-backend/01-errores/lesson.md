---
title: "Errores: raise y try/except"
---

# Errores: raise y try/except

Las cosas fallan: alguien intenta comprar más unidades de las que hay, o escribe "abc" donde iba un número.
Python maneja esto con **excepciones**, y tu backend las usará para decirle al usuario qué salió mal.

**Provocar un error a propósito** con `raise` cuando algo no tiene sentido:

```python
def descontar(stock, cantidad):
    if cantidad > stock:
        raise ValueError("No hay stock suficiente")
    return stock - cantidad
```

`ValueError` es el tipo de error para "el valor recibido no es válido". El texto entre paréntesis es el
mensaje.

**Capturar un error** con `try` y `except`, para que el programa no se caiga:

```python
try:
    numero = int("abc")
except ValueError:
    numero = None
```

Python intenta lo que está en `try`; si ocurre un `ValueError`, salta al `except` y sigue desde ahí.

La idea que debes llevarte: **valida antes de actuar**. Una función que recibe datos dudosos debe revisar
que sean correctos y, si no lo son, lanzar un error con un mensaje claro. En FastAPI, esos errores se
convertirán en respuestas que el frontend podrá mostrar.

Captura solo los errores que esperas (`except ValueError`), no todos. Si tapas un error que no conocías,
luego será muy difícil descubrir qué falló.

Ahora te toca a ti: resuelve los ejercicios de abajo.
