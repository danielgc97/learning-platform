---
title: "Listas y bucles for"
---

# Listas y bucles for

Una **lista** guarda varios valores en orden, entre corchetes:

```python
precios = [10, 45.5, 120]
```

Lo que necesitarás de las listas:

- `len(precios)` dice cuántos elementos tiene (3).
- `precios[0]` obtiene el primero: se empieza a contar desde **0**.
- `precios.append(30)` agrega un elemento al final.

Para repetir algo con cada elemento se usa un **bucle `for`**:

```python
total = 0
for precio in precios:
    total = total + precio
```

Se lee: "para cada `precio` en `precios`, haz lo que está indentado". Al terminar, `total` tiene la suma.

Este patrón se llama **acumulador**: empiezas con un valor inicial (`0`), lo actualizas en cada vuelta y al
final tienes el resultado. Sirve para sumar, contar o armar listas.

Puedes combinar el bucle con un `if` para contar solo lo que cumpla algo:

```python
cantidad = 0
for precio in precios:
    if precio > 100:
        cantidad = cantidad + 1
```

Python también tiene `sum(precios)` para sumar directamente, pero entender el bucle te permite resolver
cualquier variante: contar, filtrar, buscar el mayor.

Ahora te toca a ti: resuelve el ejercicio de abajo.
