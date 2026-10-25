---
title: "Las preguntas del dueño, en SQL"
---

# Las preguntas del dueño, en SQL

Un negocio no quiere tablas: quiere respuestas. Tu producto debe contestar preguntas como las de abajo. Todas
son combinaciones de lo que ya sabes.

| Pregunta del dueño | Herramienta |
|--------------------|-------------|
| ¿Qué productos se me están acabando? | `WHERE` comparando dos columnas |
| ¿Cuáles son mis más vendidos? | `JOIN` + `GROUP BY` + `ORDER BY` + `LIMIT` |
| ¿Cuánto vendí cada mes? | `JOIN` + `GROUP BY` con una suma |

Las tres consultas serán después **endpoints** de tu API y **pantallas** de tu frontend.

Para resolverlas, usa las tablas del ejercicio:

- `productos` (id, nombre, precio, stock, stock_minimo)
- `ventas` (id, mes)
- `items_venta` (id, venta_id, producto_id, cantidad, precio_unitario)

Un truco: puedes comparar **dos columnas** en el `WHERE`, por ejemplo `stock <= stock_minimo`. Y para el total
de una venta, el cálculo es `cantidad * precio_unitario` (usa el precio guardado en `items_venta`, no el del
producto).

Piensa siempre en tres pasos: ¿qué debe ser **una fila** de mi resultado? ¿qué tablas necesito unir? ¿qué
tengo que resumir?

Ahora te toca a ti: resuelve los tres ejercicios de abajo.
