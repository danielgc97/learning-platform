---
title: "Las reglas del inventario en Python"
---

# Las reglas del inventario en Python

Algunas reglas no se resuelven con una consulta, sino con lógica. En tu tienda hay dos fundamentales:

1. **El stock nunca puede quedar negativo.** Al registrar una venta, si falta stock, la venta se rechaza.
2. **El total de la venta se calcula en el backend**, aplicando el descuento si corresponde.

Son funciones puras de Python (reciben datos y devuelven un resultado), así que puedes escribirlas y
probarlas sin base de datos. Después tu API las llamará.

Dos ideas que necesitarás:

- Para trabajar sobre una **copia** sin tocar el original, usa `nuevo = dict(inventario)` (o `inventario.copy()`). Así, si una venta falla a la mitad, el inventario original queda intacto.
- Si recorres una lista de pares, puedes desempaquetarlos en el `for`: `for nombre, cantidad in items:`.

Y una consideración de diseño: validar **antes** de guardar. Primero se comprueba todo, y solo si es válido se
modifica el stock. Una venta guardada a medias es peor que una rechazada.

Para redondear dinero a dos decimales usa `round(valor, 2)`.

Ahora te toca a ti: resuelve los dos ejercicios de abajo.
