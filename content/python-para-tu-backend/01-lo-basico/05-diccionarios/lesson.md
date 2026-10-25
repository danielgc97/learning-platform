---
title: "Diccionarios: un registro con nombre"
---

# Diccionarios: un registro con nombre

Una lista guarda valores por posición. Pero un producto tiene varios datos con significado: nombre, precio,
stock. Para eso están los **diccionarios**: pares de **clave** y **valor**, entre llaves.

```python
producto = {"nombre": "Mouse", "precio": 45.5, "stock": 10}
```

Para leer un valor, usas su clave entre corchetes:

```python
producto["precio"]        # 45.5
```

Para cambiarlo o agregar uno nuevo:

```python
producto["stock"] = 8
producto["activo"] = True
```

Si pides una clave que no existe, Python da un `KeyError`. Cuando no estás seguro de que exista, usa `get`,
que devuelve un valor por defecto:

```python
producto.get("descuento", 0)   # 0 si no hay descuento
```

Un diccionario es exactamente la forma en que se ve **una fila de una tabla** y **un objeto JSON** (el
formato en que viajan los datos por una API). Cuando tu backend lea la base de datos, recibirá diccionarios.

```python
{"id": 7, "titulo": "Comprar pan", "hecha": False}
```

Las claves se escriben entre comillas, y los valores pueden ser de cualquier tipo: texto, número,
`True` o `False`, otra lista, otro diccionario.

Ahora te toca a ti: resuelve el ejercicio de abajo.
