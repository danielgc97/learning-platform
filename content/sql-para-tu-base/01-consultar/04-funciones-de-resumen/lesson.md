---
title: "COUNT, SUM y AVG: resumir muchas filas"
---

# COUNT, SUM y AVG: resumir muchas filas

A veces no quieres ver filas, sino **una respuesta**: ¿cuántos productos hay?, ¿cuánto vendí en total?
Para eso están las funciones de resumen:

| Función | Devuelve |
|---------|----------|
| `COUNT(*)` | Cuántas filas hay |
| `SUM(columna)` | La suma de los valores |
| `AVG(columna)` | El promedio |
| `MIN(columna)` | El valor más pequeño |
| `MAX(columna)` | El valor más grande |

```sql
SELECT COUNT(*) AS productos, MAX(precio) AS el_mas_caro
FROM ventas;
```

El resultado es **una sola fila**, porque la base resume toda la tabla.

Puedes calcular dentro de la función: `SUM(cantidad * precio)` suma el total vendido de cada producto.

Y puedes filtrar antes de resumir con `WHERE`. Esta consulta cuenta solo los accesorios:

```sql
SELECT COUNT(*) AS accesorios
FROM ventas
WHERE categoria = 'Accesorios';
```

Una regla importante: si usas una función de resumen, no puedes mezclar con una columna normal en el mismo
`SELECT`, a menos que agrupes. Eso es justo lo que verás en la siguiente lección.

Ahora te toca a ti: resuelve el ejercicio de abajo.
