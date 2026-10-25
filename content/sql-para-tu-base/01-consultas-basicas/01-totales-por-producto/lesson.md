---
title: "Totales por producto"
---

# Totales por producto

Con `SELECT` eliges qué columnas quieres ver. También puedes **calcular** valores nuevos
a partir de las columnas existentes y darles un nombre con `AS`.

```sql
SELECT producto, cantidad * precio AS total
FROM ventas;
```

Para ordenar el resultado usa `ORDER BY`; con `DESC` el orden es de mayor a menor.

Ahora te toca a ti: resuelve el ejercicio de abajo.
