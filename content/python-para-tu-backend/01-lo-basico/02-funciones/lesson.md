---
title: "Funciones: reutilizar lógica"
---

# Funciones: reutilizar lógica

Una **función** agrupa instrucciones bajo un nombre para poder reutilizarlas. Tu backend estará hecho
sobre todo de funciones: cada endpoint será una.

```python
def doble(numero):
    return numero * 2

resultado = doble(5)   # resultado vale 10
```

Cómo se lee:

- `def` crea la función; `doble` es su nombre.
- Lo que va entre paréntesis son los **parámetros**: los datos que recibe.
- La línea de abajo está **indentada** (con cuatro espacios): así Python sabe qué pertenece a la función.
- `return` entrega el resultado. Si una función no tiene `return`, devuelve `None` (es decir, nada).

Para usarla la **llamas** con sus datos: `doble(5)`.

Una función puede recibir varios parámetros, separados por comas, como en `def total(precio, cantidad):`.

Las variables creadas dentro de una función solo existen ahí. Por eso la forma de sacar un valor es siempre
`return`, no `print`: `print` solo lo muestra en pantalla, pero el resto del programa no puede usarlo.

El error más común de quien empieza es olvidar el `return`. Si tu función devuelve `None`, revisa eso primero.

Ahora te toca a ti: resuelve el ejercicio de abajo.
