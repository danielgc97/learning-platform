---
title: "GROUP BY: totales por categoría"
---

# GROUP BY: totales por categoría

En la lección anterior, `SUM` te dio **un solo número** para toda la tabla. Pero un negocio pregunta
otras cosas: "¿cuánto vendí **en cada categoría**?". Para eso existe `GROUP BY`: junta las filas que
comparten un valor y calcula una respuesta por cada grupo.

```sql
SELECT categoria, COUNT(*) AS productos
FROM ventas
GROUP BY categoria;
```

Si la tabla tiene tres productos de "Accesorios" y dos de "Cómputo", el resultado es:

| categoria  | productos |
|------------|-----------|
| Accesorios | 3         |
| Cómputo    | 2         |

Tres cosas que debes recordar:

- Cada fila del resultado es **un grupo**, no un producto.
- Todo lo que pongas en el `SELECT` y no sea un cálculo (`SUM`, `COUNT`, `AVG`...) debe aparecer también en el `GROUP BY`. Si no, la base no sabe qué valor mostrar y da error.
- Dentro de la función puedes hacer cuentas, por ejemplo `SUM(cantidad * precio)`.

El orden de las palabras es siempre: `SELECT`, `FROM`, `WHERE`, `GROUP BY`, `ORDER BY`.

Ahora te toca a ti: resuelve el ejercicio de abajo.
