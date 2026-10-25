---
title: "WHERE: filtrar filas"
---

# WHERE: filtrar filas

Casi nunca quieres **todas** las filas de una tabla. Con `WHERE` te quedas solo con las que cumplen una
condición.

```sql
SELECT producto, precio
FROM ventas
WHERE precio > 100;
```

Para comparar puedes usar:

| Símbolo | Significa |
|---------|-----------|
| `=` | igual a |
| `<>` | distinto de |
| `>`  `<` | mayor, menor |
| `>=`  `<=` | mayor o igual, menor o igual |

Los **textos** van entre comillas simples: `WHERE categoria = 'Accesorios'`. Los números van sin comillas.

Puedes combinar condiciones:

- `AND`: se deben cumplir las dos. `WHERE categoria = 'Accesorios' AND precio < 100`
- `OR`: basta con que se cumpla una. `WHERE categoria = 'Muebles' OR precio > 3000`

Para buscar valores vacíos (`NULL`) no se usa `=`, sino `IS NULL`: `WHERE telefono IS NULL`.

`WHERE` siempre va después de `FROM`. La base primero filtra las filas y después te muestra las columnas
que pediste.

Ahora te toca a ti: resuelve el ejercicio de abajo.
