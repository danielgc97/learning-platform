---
title: "ORDER BY y LIMIT: ordenar y recortar"
---

# ORDER BY y LIMIT: ordenar y recortar

Una base de datos no garantiza ningún orden si no se lo pides. Con `ORDER BY` decides cómo se ordenan las
filas, y con `LIMIT` cuántas quieres ver.

```sql
SELECT producto, precio
FROM ventas
ORDER BY precio DESC
LIMIT 3;
```

Esta consulta muestra los **3 productos más caros**:

- `ORDER BY precio` ordena de menor a mayor (es el orden por defecto, o `ASC`).
- `ORDER BY precio DESC` ordena de mayor a menor.
- `LIMIT 3` corta el resultado después de tres filas.

Puedes ordenar por varias columnas: `ORDER BY categoria, precio DESC` ordena primero por categoría y,
dentro de cada una, por precio de mayor a menor.

También puedes ordenar por una columna calculada si le pusiste nombre con `AS`:

```sql
SELECT producto, cantidad * precio AS total
FROM ventas
ORDER BY total DESC;
```

El orden de las partes de una consulta es siempre este: `SELECT`, `FROM`, `WHERE`, `ORDER BY`, `LIMIT`.

Preguntas como "los más vendidos", "los últimos pedidos" o "los clientes con más compras" son casi siempre
un `ORDER BY` con un `LIMIT`.

Ahora te toca a ti: resuelve el ejercicio de abajo.
