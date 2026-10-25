---
title: "Clases y tipos: moldes de datos"
---

# Clases y tipos: moldes de datos

Un diccionario puede tener cualquier clave, y eso a veces trae errores: escribes `"presio"` en vez de
`"precio"` y nadie te avisa. Una **clase** es un molde que define qué datos tiene algo y qué sabe hacer.

```python
class Producto:
    def __init__(self, nombre, precio, stock):
        self.nombre = nombre
        self.precio = precio
        self.stock = stock

    def valor_total(self):
        return self.precio * self.stock

mouse = Producto("Mouse", 45.5, 10)
print(mouse.valor_total())   # 455.0
```

- `class Producto` define el molde.
- `__init__` se ejecuta al crear uno y guarda sus datos. `self` es "este producto en particular".
- Una función dentro de la clase se llama **método**. Se usa con un punto: `mouse.valor_total()`.
- Cada dato se lee con un punto: `mouse.precio`.

Python también permite indicar el **tipo** que se espera, con **anotaciones**:

```python
def descuento(precio: float, porcentaje: int) -> float:
    return precio * (100 - porcentaje) / 100
```

Python no las exige al ejecutar, pero las herramientas (y FastAPI) las usan para validar datos. En el curso
de FastAPI verás clases parecidas, con anotaciones, que comprueban automáticamente lo que llega a tu API.

Ahora te toca a ti: resuelve el ejercicio de abajo.
