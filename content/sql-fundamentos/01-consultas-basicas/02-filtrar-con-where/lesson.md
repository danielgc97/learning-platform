---
title: "Filtrar filas con WHERE"
---

# Filtrar filas con WHERE

Casi nunca quieres **todas** las filas de una tabla. Con `WHERE` te quedas solo con las que
cumplen una condición.

```sql
SELECT producto, precio
FROM ventas
WHERE precio > 100;
```

Puedes comparar con `=`, `>`, `<`, `>=`, `<=` y `<>` (distinto), y combinar condiciones con `AND` y `OR`.

Ahora te toca a ti: resuelve el ejercicio de abajo.
