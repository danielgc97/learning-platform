---
title: "Listas de diccionarios: filtrar y calcular"
---

# Listas de diccionarios: filtrar y calcular

Cuando tu backend pida a la base de datos "todos los productos", recibirá una **lista de diccionarios**:
una lista con un diccionario por cada fila.

```python
productos = [
    {"nombre": "Mouse", "precio": 45.5, "stock": 10},
    {"nombre": "Silla", "precio": 400, "stock": 0},
    {"nombre": "Cable", "precio": 15, "stock": 0},
]
```

Combinas lo que ya sabes: un `for` para recorrerla y un `if` para decidir con los datos de cada uno.

**Filtrar** (quedarte con algunos):

```python
agotados = []
for p in productos:
    if p["stock"] == 0:
        agotados.append(p["nombre"])
```

**Calcular** (resumir todos):

```python
valor = 0
for p in productos:
    valor = valor + p["precio"] * p["stock"]
```

Fíjate en el patrón: una lista vacía o un acumulador antes del bucle, el `for` con un `if` si hace falta, y
el resultado al final.

Muchas de las reglas de tu negocio serán variaciones de esto: "citas de hoy", "productos con poco stock",
"total del pedido". Es el equivalente en Python de lo que `WHERE` y `SUM` hacen en SQL.

Ahora te toca a ti: resuelve los ejercicios de abajo.
