---
title: "Variables y tipos de datos"
---

# Variables y tipos de datos

Una **variable** es un nombre que guarda un valor. Se crea con el signo `=`:

```python
precio = 80
cantidad = 3
total = precio * cantidad
```

Cada valor tiene un **tipo**. Los cuatro básicos:

| Tipo | Qué guarda | Ejemplo |
|------|------------|---------|
| `int` | Número entero | `3` |
| `float` | Número con decimales | `45.5` |
| `str` | Texto, siempre entre comillas | `"Ana"` |
| `bool` | Verdadero o falso | `True`, `False` |

El tipo importa: `"3"` (texto) y `3` (número) son cosas distintas. Si intentas sumar un texto con un
número, Python da error.

Para mezclar texto y valores usa una **f-string**: una cadena con una `f` delante, donde lo que va entre
llaves se reemplaza por su valor.

```python
mensaje = f"Total: {total}"
print(mensaje)
```

`print(...)` muestra algo en pantalla. En los ejercicios lo verás debajo del editor.

Los comentarios empiezan con `#`. Python los ignora, y sirven para explicar tu código (a ti y a la IA).

Una advertencia: en Python `=` **asigna** (guarda un valor), mientras que `==` **compara**. Los verás los dos
muy pronto.

Ahora te toca a ti: resuelve el ejercicio de abajo.
